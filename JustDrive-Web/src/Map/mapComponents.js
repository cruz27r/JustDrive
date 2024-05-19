import React, { useState, useEffect, useRef } from 'react';
import { initializeMap } from './Map/map';
import './MapComponent.css';

function MapComponent() {
    const mapRef = useRef(null);
    const [directions, setDirections] = useState([]);

    useEffect(() => {
        if (mapRef.current) {
            const map = initializeMap(mapRef.current);

            map.on('routesfound', (event) => {
                const route = event.routes[0];
                setDirections(route.instructions);
            });
        }
    }, []);

    return (
        <div>
            <div ref={mapRef} style={{ height: '90vh', width: '100%' }}></div>
            <DirectionsPanel directions={directions} />
        </div>
    );
}
function DirectionsPanel({ directions }) {
    return (
        <div className="directions-panel">
            <h4>Directions</h4>
            <ol>
                {directions.map((instr, index) => (
                    <li key={index}>{instr.text}</li>
                ))}
            </ol>
        </div>
    );
}

export default MapComponent;
