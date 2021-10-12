// Create the tile layer that will be the background of our map.
var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Initialize all the LayerGroups that we'll use.
var layers = {
    mag_1: new L.LayerGroup(),
    mag_2: new L.LayerGroup(),
    mag_3: new L.LayerGroup(),
    mag_4: new L.LayerGroup(),
    mag_over_5: new L.LayerGroup()
};

// Create the map with our layers.
var myMap = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 5,
    layers: [
        layers.mag_1,
        layers.mag_2,
        layers.mag_3,
        layers.mag_4,
        layers.mag_over_5
    ]
});

// Add our "streetmap" tile layer to the map.
streetmap.addTo(myMap);

// Create an overlays object to add to the layer control.
var overlays = {
    "Magnitude lvl 1": layers.mag_1,
    "Magnitude lvl 2": layers.mag_2,
    "Magnitude lvl 3": layers.mag_3,
    "Magnitude lvl 4": layers.mag_4,
    "Magnitude lvl 5+": layers.mag_over_5
};

// Create a control for our layers, and add our overlays to it.
L.control.layers(layers, overlays).addTo(map);

// Create a legend to display information about our map.
var info = L.control({
    position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend".
info.onAdd = function () {
    var div = L.DomUtil.create("div", "legend");
    return div;
};

// Add the info legend to the map.
info.addTo(map);

// Initialize an object that contains icons for each layer group.
var icons = {
    mag_1: L.ExtraMarkers.icon({
        iconColor: "green",
        markerColor: "green",
        shape: "circle"
    }),
    mag_2: L.ExtraMarkers.icon({
        iconColor: "yellow",
        markerColor: "yellow",
        shape: "circle"
    }),
    mag_3: L.ExtraMarkers.icon({
        iconColor: "orange",
        markerColor: "orange",
        shape: "circle"
    }),
    mag_4: L.ExtraMarkers.icon({
        iconColor: "pink",
        markerColor: "pink",
        shape: "circle"
    }),
    mag_over_5: L.ExtraMarkers.icon({
        iconColor: "red",
        markerColor: "red",
        shape: "circle"
    })
};

// Store URL location
var url = "https://earthquake.usgs.gov/fdsnws/event/1/query.geojson?starttime=2000-09-29%2000:00:00&endtime=2021-10-06%2023:59:59&maxlatitude=50&minlatitude=24.6&maxlongitude=-65&minlongitude=-125&minmagnitude=4.5&orderby=time";

// Perform a GET response to the query URL
d3.json(url).then(function (data) {
    var mag = data(features.properties.mag);
    var title = data(features.properties.title);
    var depth = data(features.geometry.coordinates[2]);

    // Create an object to keep the number of markers in each layer.
    var EQcounts = {
        mag_1: 0,
        mag_2: 0,
        mag_3: 0,
        mag_4: 0,
        mag_over_5: 0
    };

    // Loop through the earthquakes
    var earthquakes;

    // For loop
    for (var i = 0; mag.length; i++) {

        var EQ = Object.assign({}, mag[i], title[i], depth[i]);

        if (mag_1 <= 1) {
            EQcounts = "mag_1";
        }
        if (mag_2 <= 2) {
            EQcounts = "mag_2";
        }
        if (mag_3 <= 3) {
            EQcounts = "mag_3";
        }
        if (mag_4 <= 4) {
            EQcounts = "mag_4";
        }
        if (mag_over_5 >= 5) {
            EQcounts = "mag_over_5"
        }

        // Create a new marker with the appropriate icon and coordinates.
        var newMarker = L.circle([mag], {
            icon: icons[earthquakes]
        });

        // Add the new marker to the appropriate layer.
        newMarker.addTo(layers[earthquakes]);

        // Bind a popup to the marker that will  display on being clicked. This will be rendered as HTML.
        newMarker.bindPopup(title + "<br> Capacity: " + depth);

        // Call the updateLegend function, which will update the legend!
        updateLegend(updatedAt, EQcounts);
    };
});

// Update the legend's innerHTML with the last updated time and station count.
function updateLegend(time, stationCount) {
    document.querySelector(".legend").innerHTML = [
        "<p>Updated: " + moment.unix(time).format("h:mm:ss A") + "</p>",
        "<p class='out-of-order'>Out of Order Stations: " + stationCount.OUT_OF_ORDER + "</p>",
        "<p class='coming-soon'>Stations Coming Soon: " + stationCount.COMING_SOON + "</p>",
        "<p class='empty'>Empty Stations: " + stationCount.EMPTY + "</p>",
        "<p class='low'>Low Stations: " + stationCount.LOW + "</p>",
        "<p class='healthy'>Healthy Stations: " + stationCount.NORMAL + "</p>"
    ].join("");
}
