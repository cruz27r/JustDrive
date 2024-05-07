import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import './TripComfortComponent.css';

const TripComfortComponent = ({ map, showTripComfortDetails}) => {
    const [comfort, setComfort] = useState(0);

    useEffect(() => {
        if (map) {
            // Listen for clicks on map (waypoint generation by user)
            const onClick = (e) => {
                // Calculate comfort arbitrarily :)
                const distance = map.distance([e.latlng.lat, e.latlng.lng], [map.getCenter().lat, map.getCenter().lng]);
                setComfort(Math.round(distance / 1000));
            };
            map.on('click', onClick);
            return () => map.off('click', onClick);
        }
    }, [map]);

    return (
        <div className="trip-comfort-details" style={{display: showTripComfortDetails ? 'block' : 'block' }}> 
            <form id="trip-end-details-form">
                <p for="trip-end-destination">Destination</p>
                <p for="">Duration</p>
                <h2>Comfort Level</h2>
                <p>{comfort}</p>
                <button type="submit" className="end-trip-button">End Trip</button>
            </form>
        </div>
    );
} 

export default TripComfortComponent; 