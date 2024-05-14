import React, { useState, useEffect, useRef } from 'react';
import { initializeMap } from './Map/map'; // Import the map initialization function
import './mapComponents.css';

function MapComponent() {
    const mapRef = useRef(null); // Reference to the map container element
    const [directions, setDirections] = useState([]); // State to hold the directions instructions

    useEffect(() => {
        if (mapRef.current) {
            // Initialize the map and set up an event listener for route found events
            const map = initializeMap(mapRef.current);
            map.on('routesfound', (event) => {
                // Update directions state with the route instructions when a route is found
                setDirections(event.routes[0].instructions);
            });
        }
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts

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