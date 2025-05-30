import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const customIcon = new L.Icon({
    iconUrl: iconUrl,
    iconRetinaUrl: iconRetinaUrl,
    shadowUrl: shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMap();

    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                const newLatLng = [latitude, longitude];
                setPosition(newLatLng);
                map.flyTo(newLatLng, 15); // Explicitly set zoom level to 15
            },
            (err) => {
                console.error('Geolocation Error:', err);
                alert('Could not retrieve your location. Please enable location services and try again.');
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
        return () => navigator.geolocation.clearWatch(watchId);
    }, [map]);

    return position ? <Marker position={position} icon={customIcon} /> : null;
}

function LiveLocationMap({ height, width = '100vw', initialZoom = 15 }) {
    const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]); // Default to India's center
    const [zoomLevel, setZoomLevel] = useState(5); // Default zoom level for India

    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                const newLatLng = [latitude, longitude];
                setMapCenter(newLatLng);
                setZoomLevel(6); // Set zoom level to 6 when location is found
            },
            (err) => {
                console.error('Geolocation Error:', err);
                alert('Could not retrieve your location. Defaulting to India view.');
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    return (
        <div style={{ height, width }}>
            <MapContainer
                center={mapCenter}
                zoom={zoomLevel}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%' }}
                zoomControl={false} // Enable zoom control
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
                {/* <ZoomControl position="topright" /> */}
            </MapContainer>
        </div>
    );
}

export default LiveLocationMap;