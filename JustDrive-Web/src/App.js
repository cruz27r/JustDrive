import React, { useEffect, useRef } from 'react';
import './css/App.css';
import { initializeMap } from './js/map.js';

function App() {
  const mapRef = useRef();  // Add this line
  useEffect(() => {
    if (mapRef.current) {
      initializeMap(mapRef.current);
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div ref={mapRef} style={{ width: '100%', height: '500px' }}></div> {
        /* Map container */
        
        }
    </div>
  );
}

export default App;