import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { initializeMap } from './Map/map.js';
import SearchComponent from './Components/SearchComponent';

function App() {
    const mapRef = useRef(null);
    const directionsRef = useRef(null); // Reference for the directions container
    const [map, setMap] = useState(null);

    useEffect(() => {
        if (mapRef.current && !map) {
            // Pass the map container and the directions container ID
            const newMap = initializeMap(mapRef.current, 'directions-panel');
            setMap(newMap);
        }
    }, [map]);

    return (
        <div className="App" style={{ position: 'relative', width: '100%', height: '100vh' }}>
            <div ref={mapRef} className='map-container'></div>
            <div ref={directionsRef} id="directions-panel" >
                {/* Directions will appear here */}
            </div>
            <SearchComponent map={map} />
        </div>
    );
}

export default App;
