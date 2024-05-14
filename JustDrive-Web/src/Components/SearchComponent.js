import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';
import './SearchComponent.css';

const SearchComponent = ({ map, setLocations, setupRoute, setLocationNames, locations }) => {
    const [from, setFrom] = useState(''); // State to hold the 'from' input value
    const [to, setTo] = useState(''); // State to hold the 'to' input value

    const geocoder = L.Control.Geocoder.nominatim(); // Initialize the geocoder

    // Handles the search action
    const handleSearch = async () => {
        // Resolves coordinates from the input (either lat,lng or address)
        const resolveCoordinates = async (input) => {
            if (input.match(/^[\d-.]+,\s*[\d-.]+$/)) {
                // If input is in lat,lng format
                const [lat, lng] = input.split(',').map(Number);
                return { latLng: L.latLng(lat, lng), name: input };
            } else {
                // If input is an address, use geocoder to get coordinates
                return new Promise((resolve, reject) => {
                    geocoder.geocode(input, (results) => {
                        if (results.length > 0) {
                            resolve({ latLng: L.latLng(results[0].center.lat, results[0].center.lng), name: results[0].name });
                        } else {
                            reject("Geocoding failed");
                        }
                    });
                });
            }
        };

        try {
            // Get coordinates for 'from' and 'to' inputs
            const fromCoords = await resolveCoordinates(from);
            const toCoords = await resolveCoordinates(to);
            if (fromCoords && toCoords) {
                // Update locations and location names
                setLocations({ from: fromCoords.latLng, to: toCoords.latLng });
                setLocationNames({ fromName: fromCoords.name, toName: toCoords.name });
                // Setup the route on the map
                setupRoute(fromCoords.latLng, toCoords.latLng, fromCoords.name, toCoords.name);
            }
        } catch (error) {
            console.error('Geocode failure:', error);
        }
    };

    // Update input fields when locations state changes
    useEffect(() => {
        if (locations.from) setFrom(`${locations.from.lat.toFixed(3)}, ${locations.from.lng.toFixed(3)}`);
        if (locations.to) setTo(`${locations.to.lat.toFixed(3)}, ${locations.to.lng.toFixed(3)}`);
    }, [locations]);

    return (
        <div className="search-overlay">
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    className="search-input"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="From"
                />
                <input
                    type="text"
                    className="search-input"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="To"
                />
                <button type="button" onClick={handleSearch} className="search-button">Search Route</button>
            </form>
        </div>
    );
};

export default SearchComponent;