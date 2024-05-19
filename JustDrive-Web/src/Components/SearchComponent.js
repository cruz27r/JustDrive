import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import './SearchComponent.css';

const SearchComponent = ({ map, setLocations, setupRoute, setLocationNames, locations, markerRef }) => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const geocoder = L.Control.Geocoder.nominatim();

    const handleSearch = async () => { // geocode search input and set locations
        const resolveCoordinates = async (input) => {
            if (input.match(/^[\d-.]+,\s*[\d-.]+$/)) {
                const [lat, lng] = input.split(',').map(Number);
                return { latLng: L.latLng(lat, lng), name: input };
            } else {
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
            const fromCoords = await resolveCoordinates(from);
            const toCoords = await resolveCoordinates(to);
            if (fromCoords && toCoords) {
                setLocations({ from: fromCoords.latLng, to: toCoords.latLng });
                setLocationNames({ fromName: fromCoords.name, toName: toCoords.name });

                // Add markers for search results.
                if (markerRef.current.from) {
                    map.removeLayer(markerRef.current.from); // remove old marker
                }
                markerRef.current.from = L.marker(fromCoords.latLng).addTo(map); // add new marker

                if (markerRef.current.to) {
                    map.removeLayer(markerRef.current.to); // remove old marker
                }
                markerRef.current.to = L.marker(toCoords.latLng).addTo(map); // add new marker
            }
        } catch (error) {
            console.error('Geocode failure:', error);
        }
    };

    // Update search input fields when locations are set.
    useEffect(() => {
        if (locations.from) setFrom(`${locations.from.lat.toFixed(3)}, ${locations.from.lng.toFixed(3)}`);
        if (locations.to) setTo(`${locations.to.lat.toFixed(3)}, ${locations.to.lng.toFixed(3)}`);
    }, [locations]);

    return ( // JSX code consisting of a search overlay with input fields for from and to locations.
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