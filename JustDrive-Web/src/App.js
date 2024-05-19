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
    const markerRef = useRef({ from: null, to: null });

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

            const waypoints = [
                L.latLng(from.lat, from.lng),
                ...randomPlaces.map(place => L.latLng(place.coordinates)),
                L.latLng(to.lat, to.lng)
            ];

            if (routeControl) { // update route control with new waypoints
                routeControl.setWaypoints(waypoints);
            } else { // create new route control
                const control = L.Routing.control({
                    waypoints: waypoints,
                    routeWhileDragging: true,
                    showAlternatives: true,
                    geocoder: L.Control.Geocoder.nominatim({}),
                    createMarker: function () { return null; },
                    show: false
                }).addTo(map);
                setRouteControl(control); // update state with new route control

                control.on('routesfound', function (event) {
                    const route = event.routes[0];
                    const directionsPanel = document.getElementById('directions-panel');
                    displayDirections(route, directionsPanel, randomPlaces);
                });
            }
        }
    }, [map, routeControl]);

    // Initialize map.
    useEffect(() => {
        if (mapRef.current && !map) { // wait for map container to be available
            const newMap = initializeMap(mapRef.current, 'directions-panel');
            setMap(newMap);
        }
    }, [map]);

    // Add click event listener to map to set locations.
    useEffect(() => {
        if (map) { // wait for map to be initialized
            const onClick = (e) => {
                if (clickToggle) {
                    setLocations(prev => ({ ...prev, from: e.latlng })); // update state with the new location
                    setLocationNames(prev => ({ ...prev, fromName: `(${e.latlng.lat.toFixed(3)}, ${e.latlng.lng.toFixed(3)})` })); // update location name
                    if (markerRef.current.from) { // remove old marker
                        map.removeLayer(markerRef.current.from);
                    }
                    markerRef.current.from = L.marker(e.latlng).addTo(map); // add new marker
                } else {
                    setLocations(prev => ({ ...prev, to: e.latlng })); // update state with the new location
                    setLocationNames(prev => ({ ...prev, toName: `(${e.latlng.lat.toFixed(3)}, ${e.latlng.lng.toFixed(3)})` })); // update location name
                    if (markerRef.current.to) { // remove old marker
                        map.removeLayer(markerRef.current.to);
                    }
                    markerRef.current.to = L.marker(e.latlng).addTo(map); // add new marker
                }
                setClickToggle(!clickToggle); // toggle click
            };

            map.on('click', onClick);
            return () => {
                map.off('click', onClick);
            };
        }
    }, [map, clickToggle]);

    // Setup route when both locations are set.
    useEffect(() => {
        if (locations.from && locations.to) {
            setupRoute(locations.from, locations.to, locationNames.fromName, locationNames.toName);
        }
    }, [locations, locationNames, setupRoute]);

    return ( // JSX code consisting of a map container, logo container, directions panel, and search component.
        <div className="App" style={{ position: 'relative', width: '100%', height: '100vh' }}>
            <div className="map-container">
                <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>
            </div>
            <div className="logo-container">
                <img src={`${process.env.PUBLIC_URL}/images/JustDrive.png`} alt="App Logo" className="logo" />
            </div>
            <div id="directions-panel"></div>
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