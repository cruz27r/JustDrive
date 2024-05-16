// import React, { useState, useEffect } from 'react';
// import L from 'leaflet';
// import './TripComfortComponent.css';
// import PropTypes from 'prop-types';

// const TripComfortComponent = ({ map, showTripComfortDetails}) => {
//     const [comfort, setComfort] = useState(0);

//     // // Checks if needed 'props' are passed
//     // TripComfortComponent.propTypes = {
//     //     // map props!!
//     //     map: PropTypes.shape({
//     //         getCenter: PropTypes.func,
//     //         on: PropTypes.func,
//     //         off: PropTypes.func,
//     //     }).isRequired,
//     //     showTripComfortDetails: PropTypes.bool.isRequired,
//     // };

//     useEffect(() => {
//         console.log("Map is not initialized");

//         if (map) {
//             // Listen for clicks on the map to create new waypoints
//             const onClick = (e) => {
//                 setComfort(Math.floor(Math.random() * 5) + 1);
//             };
//             //window.addEventListener('click', onClick);

//             map.on('click', onClick);
//             return () => map.off('click', onClick);
//         }
//         else {
//             console.log("Map is not initialized");
//         }
//     }, [map]); 

//     return (
//         <div className="trip-comfort-details" style={{display: showTripComfortDetails ? 'block' : 'none'}}> 
//             <form id="trip-end-details-form">
//                 <p>Destination</p>
//                 <p>Duration</p>
//                 <h2>Comfort Level</h2>
//                 <p>{comfort}</p>
//                 <button type="submit" className="end-trip-button">End Trip</button>
//             </form>
//         </div>
//     );
// } 

// export default TripComfortComponent; 

import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import './SearchComponent.css';

const TripComfortComponent = ({ map, showTripComfortDetails }) => {
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
            </form>
        </div>
    );
};

export default TripComfortComponent;
