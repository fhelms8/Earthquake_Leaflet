// Creating the map object
var myMap = L.map("map", {
    center: [39.82, -98.58],
    zoom: 5
});

// Adding the tile layer
var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Use this link to get the GeoJSON data.
var url = "https://earthquake.usgs.gov/fdsnws/event/1/query.geojson?starttime=2000-09-29%2000:00:00&endtime=2021-10-06%2023:59:59&maxlatitude=50&minlatitude=24.6&maxlongitude=-65&minlongitude=-125&minmagnitude=4.5&orderby=time";

// Getting our GeoJSON data
d3.json(url).then(function(data) {
    function createLayers(feature) {
        // Add markers to data/map
        L.geoJson(data).addTo(myMap);

        var layers = {
            mag_1: new L.LayerGroup(),
            mag_2: new L.LayerGroup(),
            mag_3: new L.LayerGroup(),
            mag_4: new L.LayerGroup(),
            mag_over_5: new L.LayerGroup()
        };
        
        // Create the map with our layers.
        var layers2 = L.map("map-id", {
            layers: [
                layers.mag_1,
                layers.mag_2,
                layers.mag_3,
                layers.mag_4,
                layers.mag_over_5
            ]
        });
        layers2.addTo(myMap);
        
    createLayers(L.LayerGroup(feature));
    }
});