import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import './TripComfortComponent.css';
import PropTypes from 'prop-types';

const TripComfortComponent = ({ map, showTripComfortDetails}) => {
    const [comfort, setComfort] = useState(0);

    // Checks if needed 'props' are passed
    TripComfortComponent.propTypes = {
        // map props!!
        map: PropTypes.shape({
            getCenter: PropTypes.func,
            on: PropTypes.func,
            off: PropTypes.func,
        }).isRequired,
        showTripComfortDetails: PropTypes.bool.isRequired,
    };

    useEffect(() => {
        if (map) {
            // Listen for clicks on map (waypoint generation by user)
            const onClick = (e) => {
                // Calculate comfort arbitrarily :)
                const center = map.getCenter();
                const distance = center.distanceTo([e.latlng.lat, e.latlng.lng], [center.lat, center.lng]);
                setComfort(Math.round(distance / 1000));
            };
            map.on('click', onClick);
            console.log("Comfort: ", comfort); 
            return () => map.off('click', onClick);
        }
    }, [map]);

    return (
        <div className="trip-comfort-details" style={{display: showTripComfortDetails ? 'block' : 'none' }}> 
            <form id="trip-end-details-form">
                <p>Destination</p>
                <p>Duration</p>
                <h2>Comfort Level</h2>
                <p>{comfort}</p>
                <button type="submit" className="end-trip-button">End Trip</button>
            </form>
        </div>
    );
} 

export default TripComfortComponent; 