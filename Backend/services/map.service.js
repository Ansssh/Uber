import axios from 'axios';

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
async function getDistanceTime(originAddress, destinationAddress) {
    if (!originAddress || !destinationAddress) {
        throw new Error('Origin and destination are required.');
    }
    try {
        // Convert addresses to coordinates
        const originCoords = await getAddressCoordinates(originAddress);
        const destinationCoords = await getAddressCoordinates(destinationAddress);

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
        if (response.data && response.data.routes && response.data.routes.length > 0) {
            const { distance, duration } = response.data.routes[0];
            return { distance, duration };
        } else {
            throw new Error('No distance or time found for the given locations.');
        }
    } catch (error) {
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

export { getAddressCoordinates, getDistanceTime, getSuggestions };