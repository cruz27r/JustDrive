import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';

let map;

// Comfort modifier coordinates
let comfortModifiers = [
    {
        coordinates: [42.329835, -71.0489529],
        comfortValue: 7,
        reason: 'ocean',
        dist: 700
    },
    {
        coordinates: [42.3494976, -71.0413898],
        comfortValue: 7,
        reason: 'ocean',
        dist: 700
    },
    {
        coordinates: [42.3731379, -71.0518143],
        comfortValue: 7,
        reason: 'ocean',
        dist: 700
    },
    {
        coordinates: [42.3135976, -71.0450596],
        comfortValue: 10,
        reason: 'ocean',
        dist: 700
    },
    {
        coordinates: [42.3464594, -71.0603566],
        comfortValue: -50,
        reason: 'highway',
        dist: 500
    },
    {
        coordinates: [42.3217309, -71.0513558],
        comfortValue: -500,
        reason: 'rotary',
        dist: 100
    },
];

// Hardcoded favorite places of interest from professor
const favoritePlaces = [
    { name: 'Dunkin', coordinates: [42.335794505171414, -71.05603849540067] },
    { name: 'Beach', coordinates: [42.32633311357259, -71.04751104856862] },
    { name: 'BeaconSt', coordinates: [42.35617141358264, -71.07250599673633] },
    { name: 'JFKLib', coordinates: [42.31658384819062, -71.0342390256396] },
    { name: 'FanPark', coordinates: [42.354880844528964, -71.04635016334034] },
    { name: 'Drawbridge', coordinates: [42.30401376889333, -71.04768745928939] },
    { name: 'Starway', coordinates: [42.31881506644686, -71.0505238921386] },
    { name: 'Boathouse', coordinates: [42.311701730075924, -71.03977490530909] },
];

const initializeMap = (mapContainer, directionsContainerId) => {
    if (!map && mapContainer) {
        
        // Initialize the map.
        map = L.map(mapContainer).setView([42.3128542, -71.0383129], 15);

        // Add an OpenStreetMap tile layer to the map.
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: 'Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Add favorite places to the map.
        favoritePlaces.forEach(place => {
            const marker = L.marker(place.coordinates).addTo(map);
            marker.bindPopup(`<b>Favorited</b><br>${place.name}`).openPopup();
        });

        return map;
    } else {
        console.log('Map is already initialized or container not found');
        return map; // ensure we return the map instance even if already initialized to avoid errors
    }
};

function displayDirections(route, directionsPanel) {
    if (directionsPanel) {
        let directionsHtml = '<h4>Directions</h4><ol>';
        route.instructions.forEach((instruction, index) => {
            
            // Calculate comfort.
            let comfort = 0;
            
            // Modify comfort by applicable comfort modifiers.
            try {
                comfortModifiers.forEach((modifier) => {
                    let startCoordinates = route.coordinates[instruction.index];
                    let endCoordinates = route.coordinates[instruction.index + 1];
                    if (endCoordinates) {
                        let middleCoordinates = [(startCoordinates.lat + endCoordinates.lat) / 2, (startCoordinates.lng + endCoordinates.lng) / 2];
                        let distStart = L.latLng(modifier.coordinates).distanceTo(startCoordinates);
                        let distMiddle = L.latLng(modifier.coordinates).distanceTo(middleCoordinates);
                        if (distStart < modifier.dist || distMiddle < modifier.dist) {
                            comfort += modifier.comfortValue;
                        }
                    }
                });
            } catch (e) {
                console.log(e);
            }

            // Randomize slightly :)
            if (comfort < 1 && comfort > -1) {
                comfort = (Math.random() * 8) - 4 + comfort;
            }
            // Fix comfort precision.
            comfort = Math.round(comfort * 10) / 10; // this is dirty :(
            directionsHtml += `<li>${instruction.text} - ${instruction.distance} meters, ${comfort} comfort</li>`;
        });
        directionsHtml += '</ol>';
        directionsPanel.innerHTML = directionsHtml;
    }
}

function getRandomPlaces(places, min, max) {
    const shuffled = places.sort(() => 0.5 - Math.random());
    const count = Math.floor(Math.random() * (max - min + 1) + min);
    return shuffled.slice(0, count);
}

export { initializeMap, displayDirections, getRandomPlaces };