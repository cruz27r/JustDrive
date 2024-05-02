// Import Leaflet into the script
import L from 'leaflet';
import 'leaflet-routing-machine';  // Ensure Leaflet Routing Machine is imported if it's installed via NPM

const initializeMap = () => {
    // Create the map
    const map = L.map('map').setView([42.3128542, -71.0383129], 15);

    // Add an OpenStreetMap tile layer to the map
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add click event handler to the map
    map.on('click', function (e) {
        console.log('Map clicked at:', e.latlng);

        // Add a marker at the clicked location
        var newMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);

        // Setup routing from a fixed start point to the clicked point
        var routeControl = L.Routing.control({
            waypoints: [
                L.latLng(42.3128542, -71.0383129), // Fixed start point
                e.latlng // Dynamic endpoint based on where the map was clicked
            ],
            routeWhileDragging: true,
            showAlternatives: true
        }).addTo(map);

        // Event listener for when routes are found
        routeControl.on('routesfound', function(event) {
            var routes = event.routes;
            console.log('Routes found:', routes);
        });
    });
};

// Export the initializeMap function to be used in other parts of the application
export { initializeMap };
