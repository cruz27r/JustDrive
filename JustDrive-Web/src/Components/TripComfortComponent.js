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


