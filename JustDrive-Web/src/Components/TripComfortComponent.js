import React from 'react';
import './TripComfortComponent.css';
import PropTypes from 'prop-types';

const TripComfortComponent = ({ map, showTripComfortDetails, tripDetails }) => {
    // Define the expected prop types for this component
    TripComfortComponent.propTypes = {
        map: PropTypes.object.isRequired, // The map object
        showTripComfortDetails: PropTypes.bool.isRequired, // Boolean to show/hide the component
        tripDetails: PropTypes.shape({
            destination: PropTypes.string, // Destination name
            distance: PropTypes.string, // Trip distance
            duration: PropTypes.string // Trip duration
        }).isRequired
    };

    return (
        <div className="trip-comfort-details" style={{ display: showTripComfortDetails ? 'block' : 'none' }}>
            {/* Display the trip details */}
            <form id="trip-end-details-form">
                <p>Destination: {tripDetails.destination}</p>
                <p>Distance: {tripDetails.distance}</p>
                <p>Duration: {tripDetails.duration}</p>
                <h2>Comfort Level</h2>
                <p>0</p>
                <button type="submit" className="end-trip-button">End Trip</button>
            </form>
        </div>
    );
}

export default TripComfortComponent;