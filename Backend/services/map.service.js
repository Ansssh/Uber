import axios from 'axios';
import captainModel from '../models/captain.model.js';

async function getAddressCoordinates(address) {
    if (!address) {
        throw new Error('Address query parameter is required.');
    }
    try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
                q: address,
                format: 'json',
                limit: 1
            },
            headers: {
                'User-Agent': 'UBER-Clone-App/1.0 (your@email.com)'
            }
        });
        if (response.data && response.data.length > 0) {
            const { lat, lon } = response.data[0];
            return { lat, lon };
        } else {
            throw new Error('No coordinates found for the given address.');
        }
    } catch (error) {
        throw new Error('Failed to fetch coordinates.');
    }
}


// New: getDistanceTime using OSRM public API
// async function getDistanceTime(originAddress, destinationAddress) {
//     if (!originAddress || !destinationAddress) {
//         throw new Error('Origin and destination are required.');
//     }
//     try {
//         // Convert addresses to coordinates
//         const originCoords = await getAddressCoordinates(originAddress);
//         const destinationCoords = await getAddressCoordinates(destinationAddress);

//         // Format as lon,lat for OSRM
//         const origin = `${originCoords.lon},${originCoords.lat}`;
//         const destination = `${destinationCoords.lon},${destinationCoords.lat}`;

//         // Call OSRM API
//         const response = await axios.get(`https://router.project-osrm.org/route/v1/driving/${origin};${destination}`, {
//             params: {
//                 overview: 'false',
//                 alternatives: false,
//                 steps: false
//             }
//         });
//         if (response.data && response.data.routes && response.data.routes.length > 0) {
//             const { distance, duration } = response.data.routes[0];
//             return { distance, duration };
//         } else {
//             throw new Error('No distance or time found for the given locations.');
//         }
//     } catch (error) {
//         throw new Error('Failed to fetch distance and time.');
//     }
// }

async function getDistanceTime(originAddress, destinationAddress) {
    if (!originAddress || !destinationAddress) {
        throw new Error('Origin and destination are required.');
    }
    try {
        // Convert addresses to coordinates
        const originCoords = await getAddressCoordinates(originAddress);
        const destinationCoords = await getAddressCoordinates(destinationAddress);

        console.log('Origin Coordinates:', originCoords);
        console.log('Destination Coordinates:', destinationCoords);

        // Format as lon,lat for OSRM
        const origin = `${originCoords.lon},${originCoords.lat}`;
        const destination = `${destinationCoords.lon},${destinationCoords.lat}`;

        // Call OSRM API
        const response = await axios.get(`https://router.project-osrm.org/route/v1/driving/${origin};${destination}`, {
            params: {
                overview: 'false',
                alternatives: false,
                steps: false
            }
        });

        // console.log('OSRM API Response:', response.data);
        

        if (!response.data || !response.data.routes || response.data.routes.length === 0) {
            console.error('OSRM API Error:', response.data);
            throw new Error('No distance or time found for the given locations.');
        }

        const { distance, duration } = response.data.routes[0];
        return { distance, duration };
    } catch (error) {
        console.error('Failed to fetch distance and time:', error.message);
        throw new Error('Failed to fetch distance and time.');
    }
}

// Service for address suggestions
async function getSuggestions(q) {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
            q,
            format: 'json',
            addressdetails: 1,
            limit: 5
        },
        headers: {
            'User-Agent': 'UBER-Clone-App/1.0 (your@email.com)'
        }
    });
    // Only return suggestions that have a display_name and coordinates
    return (response.data || []).filter(item => item.display_name && item.lat && item.lon).map(item => ({
        display_name: item.display_name,
        lat: item.lat,
        lon: item.lon
    }));
}

async function getCaptainsInRadius(lat, lon, rad) {
    // console.log('Latitude:', lat, 'Longitude:', lon, 'Radius:', rad);
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [[lon, lat], rad / 6378.1] // Radius in kilometers
            }
        }
    });
    return captains;
}

export { getAddressCoordinates, getDistanceTime, getSuggestions, getCaptainsInRadius };