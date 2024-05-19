import React from 'react';
import './TripComfortComponent.css';

const TripComfortComponent = ({ showTripComfortDetails }) => {
    return (
        <div className="trip-comfort-details" style={{ display: showTripComfortDetails ? 'block' : 'none' }}>
            {/* This component is no longer needed for destination, duration, and comfort level */}
        </div>
    );
};

export default TripComfortComponent;