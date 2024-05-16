import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';

let map; // This variable will hold your map instance globally.

// Hardcoded favorite places of interest from professor
const favoritePlaces = [
    { name: 'Dunkin', coordinates: [42.335794505171414, -71.05603849540067] },
    { name: 'Beach', coordinates: [42.32633311357259, -71.04751104856862] },
    { name: 'BeaconSt', coordinates: [42.35617141358264, -71.07250599673633] },
    { name: 'JFKLib', coordinates: [42.31658384819062, -71.0342390256396] },
    { name: 'FanPark', coordinates: [42.354880844528964, -71.04635016334034] },
    { name: 'Drawbridge', coordinates: [42.30401376889333, -71.04768745928939] },
    { name: 'Starway', coordinates: [42.31881506644686, -71.0505238921386] },
    { name: 'Boathouse', coordinates: [42.311701730075924, -71.03977490530909] }
];

const initializeMap = (mapContainer, directionsContainerId) => {
    if (!map && mapContainer) {
        // Initialize the map
        map = L.map(mapContainer).setView([42.3128542, -71.0383129], 15);

        // Add an OpenStreetMap tile layer to the map
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: 'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Add favorite places to the map
        favoritePlaces.forEach(place => {
            const marker = L.marker(place.coordinates).addTo(map);
            marker.bindPopup(`<b>Favorited</b><br>${place.name}`).openPopup();
        });

        // Add click event handler to the map
        map.on('click', function (e) {
            // Add a marker at the clicked location
            var newMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);

            // Get two or three random favorite places
            let randomPlaces = getRandomPlaces(favoritePlaces, 2, 3);
            let waypoints = [
                L.latLng(42.3128542, -71.0383129),
                ...randomPlaces.map(place => L.latLng(place.coordinates)),
                e.latlng
            ];

            // Setup routing from a fixed start point to the clicked point
            var routeControl = L.Routing.control({
                waypoints: waypoints,
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
                displayDirections(event.routes[0], directionsPanel, randomPlaces);
            });
        });
    } else {
        console.log('Map is already initialized or container not found');
    }
};

function displayDirections(route, directionsPanel, randomPlaces) {
    if (directionsPanel) {
        let directionsHtml = '<h4>Directions</h4><ol>';
        route.instructions.forEach((instruction) => {
            directionsHtml += `<li>${instruction.text} - ${instruction.distance} meters</li>`;
        });
        directionsHtml += '</ol>';
        directionsPanel.innerHTML = directionsHtml;

        // Display suggested points to visit
        let pointsHtml = '<h4>Suggested Points to Visit</h4><div>';
        randomPlaces.forEach(place => {
            pointsHtml += `<div class="suggested-point">${place.name} (${place.coordinates[0].toFixed(5)}, ${place.coordinates[1].toFixed(5)})</div>`;
        });
        pointsHtml += '</div>';
        directionsPanel.innerHTML += pointsHtml;
    }
}

function getRandomPlaces(places, min, max) {
    const shuffled = places.sort(() => 0.5 - Math.random());
    const count = Math.floor(Math.random() * (max - min + 1) + min);
    return shuffled.slice(0, count);
}

export { initializeMap };
