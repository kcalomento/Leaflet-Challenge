// Define Base Maps
let streetMap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
let satelliteMap = L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png");
let darkMap = L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png");

// Create Layer Groups
let earthquakeLayer = L.layerGroup();
let tectonicLayer = L.layerGroup();

// Initialize Map
let myMap = L.map("map", {
    center: [37.09, -95.71], // USA Center
    zoom: 4,
    layers: [streetMap, earthquakeLayer] // Default layers on load
});

// Function to Determine Marker Color Based on Depth
function getColor(depth) {
    return depth > 90 ? "#ff5f65" :
           depth > 70 ? "#fca35d" :
           depth > 50 ? "#fdb72a" :
           depth > 30 ? "#f7db11" :
           depth > 10 ? "#dcf400" :
                        "#a3f600";
}

// Function to Determine Marker Size Based on Magnitude
function getRadius(magnitude) {
    return magnitude ? magnitude * 4 : 1;
}

// Fetch Earthquake Data from USGS
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson").then(function(data) {
    let earthquakes = L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        style: function(feature) {
            return {
                radius: getRadius(feature.properties.mag),
                fillColor: getColor(feature.geometry.coordinates[2]),
                color: "#000",
                weight: 0.5,
                opacity: 1,
                fillOpacity: 0.8
            };
        },
        onEachFeature: function(feature, layer) {
            layer.bindPopup(
                `<h3>${feature.properties.place}</h3><hr>
                 <p>Magnitude: ${feature.properties.mag}</p>
                 <p>Depth: ${feature.geometry.coordinates[2]} km</p>
                 <p>Time: ${new Date(feature.properties.time)}</p>`
            );
        }
    });

    earthquakes.addTo(earthquakeLayer);
});

// Fetch Tectonic Plate Data
d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function(plateData) {
    let tectonicPlates = L.geoJSON(plateData, {
        color: "orange",
        weight: 2
    });

    tectonicPlates.addTo(tectonicLayer);
});

// Define Layer Control Options
let baseMaps = {
    "Street Map": streetMap,
    "Satellite Map": satelliteMap,
    "Dark Map": darkMap
};

let overlayMaps = {
    "Earthquakes": earthquakeLayer,
    "Tectonic Plates": tectonicLayer
};

// Add Layer Control to Map
L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(myMap);

// Create and Add Legend
let legend = L.control({ position: "bottomright" });

legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");
    let depths = [-10, 10, 30, 50, 70, 90];
    let colors = ["#a3f600", "#dcf400", "#f7db11", "#fdb72a", "#fca35d", "#ff5f65"];

    for (let i = 0; i < depths.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colors[i] + '"></i> ' +
            depths[i] + (depths[i + 1] ? "&ndash;" + depths[i + 1] + "<br>" : "+");
    }

    return div;
};

legend.addTo(myMap);