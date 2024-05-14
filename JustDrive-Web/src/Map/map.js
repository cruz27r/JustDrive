import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';

let map;

const initializeMap = (mapContainer, directionsContainerId) => {
    if (map) {
        console.log('Map is already initialized.');
        return map;
    }

    if (mapContainer) {
        console.log('Initializing map...');
        map = L.map(mapContainer).setView([42.3128542, -71.0383129], 15);

        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: 'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        map.on('click', function (e) {
            console.log('Map clicked at:', e.latlng);

            var routeControl = L.Routing.control({
                waypoints: [
                    L.latLng(42.3128542, -71.0383129),
                    e.latlng
                ],
                routeWhileDragging: true,
                showAlternatives: true
            }).addTo(map);

            routeControl.on('routesfound', function(event) {
                var directionsPanel = document.getElementById(directionsContainerId);
                displayDirections(event.routes[0], directionsPanel);
            });
        });
        return map;
    } else {
        console.log('Container not found');
        return null;
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