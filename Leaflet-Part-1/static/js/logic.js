// Create the base tile layer (background map)
let baseMap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");

// Initialize the map
let myMap = L.map("map", {
    center: [37.09, -95.71], // Center on the USA
    zoom: 4,
    layers: [baseMap]
});

// Function to determine marker color based on depth
function getColor(depth) {
    return depth > 90 ? "#ff5f65" :
           depth > 70 ? "#fca35d" :
           depth > 50 ? "#fdb72a" :
           depth > 30 ? "#f7db11" :
           depth > 10 ? "#dcf400" :
                        "#a3f600";
}

// Function to determine marker size based on magnitude
function getRadius(magnitude) {
    return magnitude ? magnitude * 4 : 1;
}

// Fetch earthquake data from USGS
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson").then(function(data) {
    // Create a GeoJSON layer
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

    earthquakes.addTo(myMap);

    // Create a legend
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
});

// (Optional) Load tectonic plate data
d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function(plateData) {
    let tectonicPlates = L.geoJSON(plateData, {
        color: "orange",
        weight: 2
    });

    tectonicPlates.addTo(myMap);
});
