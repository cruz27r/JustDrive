import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import logo from './logo.svg';
import './App.css';

function App() {
  useEffect(() => {
    // Creating map options
    var mapOptions = {
      center: [42.3128542, -71.0383129],
      zoom: 10
    };

    // Creating a map object
    var map = L.map('map', mapOptions);

    // Creating a Layer object
    var layer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');

    // Adding layer to the map
    map.addLayer(layer);

    // Clean up the map when the component unmounts
    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div id="map" style={{ width: '100%', height: '500px' }}></div>
    </div>
  );
}

export default App;