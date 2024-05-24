import React, { useEffect, useRef, useState } from 'react';
import './App.css'; // Ensure you are importing the CSS file with the .logo class
import { initializeMap } from './Map/map.js';
import SearchComponent from './Components/SearchComponent';
import TripComfortComponent from './Components/TripComfortComponent';

function App() {
    const mapRef = useRef(null);
    const directionsRef = useRef(null); // Reference for the directions container
    const [map, setMap] = useState(null);
    const [showTripComfortDetails, setShowTripComfortDetails] = useState(false);

    useEffect(() => {
        if (mapRef.current && !map) {
            // Pass the map container and the directions container ID
            const newMap = initializeMap(mapRef.current, 'directions-panel');
            setMap(newMap);
        }
    }, [map]);

    return (
        <div className="App" style={{ position: 'relative', width: '100%', height: '100vh' }}>
    <div className="map-container">
        <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>
    </div>
    <div ref={directionsRef} id="directions-panel">
        {/* Directions will appear here */}
    </div>
    <SearchComponent map={map} setShowTripComfortDetails={setShowTripComfortDetails} />
    <div className="logo-container">
        <img src={`${process.env.PUBLIC_URL}/images/JustDrive.png`} alt="App Logo" className="logo" />
    </div>
</div>

    );
}

export default App;
