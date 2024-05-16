import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';

let map; // This variable will hold your map instance globally.

const initializeMap = (mapContainer, directionsContainerId) => {
    if (!map && mapContainer) {
        // Initialize the map
        map = L.map(mapContainer).setView([42.3128542, -71.0383129], 15);

        // Add an OpenStreetMap tile layer to the map
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: 'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        var marker = L.marker([51.5, -0.09]).addTo(map);





        // Add click event handler to the map
        map.on('click', function (e) {
            // Add a marker at the clicked location
            var newMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);

            // Setup routing from a fixed start point to the clicked point
            var routeControl = L.Routing.control({
                waypoints: [
                    L.latLng(42.3128542, -71.0383129),
                    e.latlng
                ],
                routeWhileDragging: true,
                showAlternatives: true,
                geocoder: L.Control.Geocoder.nominatim({})
            }).addTo(map);

            // Event listener for when routes are found
            routeControl.on('routesfound', function(event) {
                var routes = event.routes;
                var instructions = routes[0].instructions;
                console.log(instructions);
                console.log(routes);
                instructions.forEach(function (instruction) {
                    var index = instruction.index;
                    var text = instruction.text;
                    console.log("Index:", index, "Instruction:", text);
                });
                var directionsPanel = document.getElementById(directionsContainerId);
                displayDirections(event.routes[0], directionsPanel);
            });
        });
    } else {
        console.log('Map is already initialized or container not found');
    }
};

function displayDirections(route, directionsPanel) {
    if (directionsPanel) {
        let directionsHtml = '<h4>Directions</h4><ol>';
        route.instructions.forEach((instruction) => {
            directionsHtml += `<li>${instruction.text} - ${instruction.distance} meters</li>`;
        });
        directionsHtml += '</ol>';
        directionsPanel.innerHTML = directionsHtml;
    }
}

export { initializeMap };
