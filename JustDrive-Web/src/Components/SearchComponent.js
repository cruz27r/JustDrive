import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import './SearchComponent.css';

const SearchComponent = ({ map }) => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [routeControl, setRouteControl] = useState(null);

    useEffect(() => {
        if (map) {
            // Listen for clicks on the map to create new waypoints
            const onClick = (e) => {
                if (!from) {
                    setFrom(e.latlng);
                } else if (!to) {
                    setTo(e.latlng);
                    setupRoute(from, e.latlng);
                } else {
                    // Reset if both are set
                    setFrom(e.latlng);
                    setTo('');
                }
            };
            map.on('click', onClick);
            return () => map.off('click', onClick);
        }
    }, [map, from, to]);

    // Initialize or update the route
    const setupRoute = (start, end) => {
        try {
            if (routeControl) {
                routeControl.setWaypoints([L.latLng(start), L.latLng(end)]);
            } else {
                const control = L.Routing.control({
                    waypoints: [L.latLng(start), L.latLng(end)],
                    routeWhileDragging: true,
                    showAlternatives: false,
                    geocoder: L.Control.Geocoder.nominatim()
                }).addTo(map);
                setRouteControl(control);

                control.on('waypointschanged', (e) => {
                    setFrom(e.waypoints[0].latLng);
                    setTo(e.waypoints[1].latLng);
                });
            }
        } catch (error) {
            console.error('Error on setup route:', error)
        }
    };

    const showEndOfTripStats = () => {
        document.getElementById('trip-end-details').style.display = 'block';
    }

    return (
        <div className="search-overlay">
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    className="search-input"
                    value={typeof from === 'object' ? `${from.lat.toFixed(3)}, ${from.lng.toFixed(3)}` : from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="From"
                />
                <input
                    type="text"
                    className="search-input"
                    value={typeof to === 'object' ? `${to.lat.toFixed(3)}, ${to.lng.toFixed(3)}` : to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="To"
                />
                <button type="button" onClick={() => { setupRoute(from, to); showEndOfTripStats(); }} className="search-button">Search Route</button>
            </form>
        </div>
    );
};

export default SearchComponent;
