import React, { useEffect, useRef, useState, useCallback } from 'react';
import './App.css';
import { initializeMap, displayDirections, getRandomPlaces } from './Map/map.js';
import SearchComponent from './Components/SearchComponent';
import L from 'leaflet';

function App() {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const [locations, setLocations] = useState({ from: null, to: null });
    const [routeControl, setRouteControl] = useState(null);
    const [locationNames, setLocationNames] = useState({ fromName: '', toName: '' });
    const [clickToggle, setClickToggle] = useState(true);
    const [suggestedPoints, setSuggestedPoints] = useState([]);
    const markerRef = useRef({ from: null, to: null });

    // Set up route with random places to visit.
    const setupRoute = useCallback((from, to, fromName = '', toName = '') => {
        if (map) {
            const randomPlaces = getRandomPlaces([
                { name: 'Dunkin', coordinates: [42.335794505171414, -71.05603849540067] },
                { name: 'Beach', coordinates: [42.32633311357259, -71.04751104856862] },
                { name: 'BeaconSt', coordinates: [42.35617141358264, -71.07250599673633] },
                { name: 'JFKLib', coordinates: [42.31658384819062, -71.0342390256396] },
                { name: 'FanPark', coordinates: [42.354880844528964, -71.04635016334034] },
                { name: 'Drawbridge', coordinates: [42.30401376889333, -71.04768745928939] },
                { name: 'Starway', coordinates: [42.31881506644686, -71.0505238921386] },
                { name: 'Boathouse', coordinates: [42.311701730075924, -71.03977490530909] }
            ], 2, 3);

            setSuggestedPoints(randomPlaces); // update suggested points

            // Create waypoints array with 'from' location, random places, and 'to' location.
            const waypoints = [
                L.latLng(from.lat, from.lng),
                ...randomPlaces.map(place => L.latLng(place.coordinates)),
                L.latLng(to.lat, to.lng)
            ];

            // Set up route control with waypoints.
            if (routeControl) {
                routeControl.setWaypoints(waypoints);
            } else {
                const control = L.Routing.control({
                    waypoints: waypoints,
                    routeWhileDragging: true,
                    showAlternatives: true,
                    geocoder: L.Control.Geocoder.nominatim({}),
                    createMarker: function () { return null; }, // disable default markers
                    show: false
                }).addTo(map);
                setRouteControl(control); // save route control for future updates

                control.on('routesfound', function (event) {
                    const route = event.routes[0];
                    const directionsPanel = document.getElementById('directions-panel');
                    displayDirections(route, directionsPanel); // display route directions in panel
                });
            }
        }
    }, [map, routeControl]);

    // Initialize map when the component mounts.
    useEffect(() => {
        if (mapRef.current && !map) {
            const newMap = initializeMap(mapRef.current, 'directions-panel');
            setMap(newMap);
        }
    }, [map]);

    // Add click event listener to map to set 'from' and 'to' locations.
    useEffect(() => {
        if (map) {
            const onClick = (e) => {
                if (clickToggle) {
                    setLocations(prev => ({ ...prev, from: e.latlng }));
                    setLocationNames(prev => ({ ...prev, fromName: `(${e.latlng.lat.toFixed(3)}, ${e.latlng.lng.toFixed(3)})` }));
                    
                    // Replace old 'from' marker with new marker.
                    if (markerRef.current.from) {
                        map.removeLayer(markerRef.current.from);
                    }
                    markerRef.current.from = L.marker(e.latlng).addTo(map);
                } else {
                    setLocations(prev => ({ ...prev, to: e.latlng }));
                    setLocationNames(prev => ({ ...prev, toName: `(${e.latlng.lat.toFixed(3)}, ${e.latlng.lng.toFixed(3)})` }));

                    // Replace old 'to' marker with new marker.
                    if (markerRef.current.to) {
                        map.removeLayer(markerRef.current.to);
                    }
                    markerRef.current.to = L.marker(e.latlng).addTo(map);
                }
                setClickToggle(!clickToggle); // toggle click event target between 'from' and 'to'
            };

            // Add click event listener to map for setting 'from' and 'to' locations.
            map.on('click', onClick);
            return () => {
                map.off('click', onClick);
            };
        }
    }, [map, clickToggle]);

    // Set up route when 'from' and 'to' locations are set.
    useEffect(() => {
        if (locations.from && locations.to) {
            setupRoute(locations.from, locations.to, locationNames.fromName, locationNames.toName);
        }
    }, [locations, locationNames, setupRoute]);

    return ( // JSX code consisting of a map container, logo container, directions panel, suggested points panel, and search component.
        <div className="App" style={{ position: 'relative', width: '100%', height: '100vh' }}>
            <div className="map-container">
                <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>
            </div>
            <div className="logo-container">
                <img src={`${process.env.PUBLIC_URL}/images/JustDrive.png`} alt="App Logo" className="logo" />
            </div>
            <div id="directions-panel"></div>
            {suggestedPoints.length > 0 && (
                <div id="suggested-points-panel">
                    <h4>Suggested Points to Visit</h4>
                    <div>
                        {suggestedPoints.map((place, index) => (
                            <div key={index} className="suggested-point">
                                {place.name} ({place.coordinates[0].toFixed(5)}, {place.coordinates[1].toFixed(5)})
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <SearchComponent
                map={map}
                setLocations={setLocations}
                setupRoute={setupRoute}
                setLocationNames={setLocationNames}
                locations={locations}
                markerRef={markerRef}
            />
        </div>
    );
}

export default App;