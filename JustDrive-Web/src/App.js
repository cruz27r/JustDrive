import React, { useEffect, useRef, useState, useCallback } from 'react';
import './App.css';
import { initializeMap } from './Map/map.js';
import SearchComponent from './Components/SearchComponent';
import TripComfortComponent from './Components/TripComfortComponent';
import L from 'leaflet';

function App() {
    const mapRef = useRef(null); // Reference to the map container element
    const [map, setMap] = useState(null); // State to hold the map instance
    const [locations, setLocations] = useState({ from: null, to: null }); // State to hold the 'from' and 'to' locations
    const [routeControl, setRouteControl] = useState(null); // State to hold the routing control instance
    const [tripDetails, setTripDetails] = useState({
        destination: '',
        distance: '',
        duration: '',
    }); // State to hold trip details like destination, distance, and duration
    const [locationNames, setLocationNames] = useState({ fromName: '', toName: '' }); // State to hold the names of the 'from' and 'to' locations

    // Formats the duration into a more readable format
    const formatTime = (duration) => {
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''}, ${minutes} minute${minutes !== 1 ? 's' : ''}`;
        } else {
            return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
        }
    };

    // Sets up the route on the map
    const setupRoute = useCallback((from, to, fromName = '', toName = '') => {
        if (map) {
            if (routeControl) {
                // Update the waypoints if routeControl already exists
                routeControl.setWaypoints([L.latLng(from.lat, from.lng), L.latLng(to.lat, to.lng)]);
            } else {
                // Create a new routing control if it doesn't exist
                const control = L.Routing.control({
                    waypoints: [L.latLng(from.lat, from.lng), L.latLng(to.lat, to.lng)],
                    routeWhileDragging: true,
                    showAlternatives: false
                }).addTo(map);

                // Event listener for when routes are found
                control.on('routesfound', (event) => {
                    const route = event.routes[0];
                    const distance = route.summary.totalDistance * 0.000621371; // Convert meters to miles
                    const duration = route.summary.totalTime;

                    // Update trip details state with new values
                    setTripDetails({
                        destination: toName || 'Selected Location',
                        distance: distance.toFixed(2) + ' miles',
                        duration: formatTime(duration)
                    });

                    // Display the directions in the directions panel
                    const directionsPanel = document.getElementById('directions-panel');
                    let directionsHtml = '<h4>Directions</h4><ol>';
                    route.instructions.forEach((instruction) => {
                        directionsHtml += `<li>${instruction.text} - ${instruction.distance} meters</li>`;
                    });
                    directionsHtml += '</ol>';
                    directionsPanel.innerHTML = directionsHtml;
                });

                setRouteControl(control); // Save the new routing control instance
            }
        }
    }, [map, routeControl]);

    // Initialize the map when the component mounts
    useEffect(() => {
        if (mapRef.current && !map) {
            console.log('Initializing map...');
            const newMap = initializeMap(mapRef.current, 'directions-panel');
            setMap(newMap);

            // Event listener for clicks on the map
            newMap.on('click', (e) => {
                if (!locations.from) {
                    // Set the 'from' location
                    setLocations((prev) => ({ ...prev, from: e.latlng }));
                    setLocationNames((prev) => ({ ...prev, fromName: 'Selected Location' }));
                } else if (!locations.to) {
                    // Set the 'to' location
                    setLocations((prev) => ({ ...prev, to: e.latlng }));
                    setLocationNames((prev) => ({ ...prev, toName: 'Selected Location' }));
                } else {
                    // Reset the 'from' location and clear the 'to' location
                    setLocations({ from: e.latlng, to: null });
                    setLocationNames({ fromName: 'Selected Location', toName: '' });
                }
            });
        } else {
            console.log('Map is already initialized or container not found');
        }
    }, [map, locations]);

    // Update the route whenever the locations or location names change
    useEffect(() => {
        if (locations.from && locations.to) {
            setupRoute(locations.from, locations.to, locationNames.fromName, locationNames.toName);
        }
    }, [locations, locationNames, setupRoute]);

    return (
        <div className="App" style={{ position: 'relative', width: '100%', height: '100vh' }}>
            <div style={{ display: 'flex' }}>
                <div ref={mapRef} className='map-container'></div>
                {map && <TripComfortComponent map={map} showTripComfortDetails={true} tripDetails={tripDetails} />}
            </div>
            <div id="directions-panel">
                {/* Directions will appear here */}
            </div>
            {map && <SearchComponent map={map} setLocations={setLocations} setupRoute={setupRoute} setLocationNames={setLocationNames} locations={locations} />}
        </div>
    );
}

export default App;