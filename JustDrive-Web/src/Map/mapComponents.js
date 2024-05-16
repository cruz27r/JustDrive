// MapComponent.js
import React, { useState, useEffect, useRef } from 'react';
import { initializeMap } from './Map/map'; // Import your map initialization function if separated
import './MapComponent.css'; // Optional: if you have specific styles for this component

function MapComponent() {
    const mapRef = useRef(null);
    const [directions, setDirections] = useState([]);

    useEffect(() => {
        if (mapRef.current) {
            const map = initializeMap(mapRef.current);

            map.on('routesfound', (event) => {
                const route = event.routes[0]; // Assuming first route is desired
                //const instructions = route.instructions.map(instr => instr.text);
                setDirections(route.instructions); // Assuming first route is desired
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
s
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
