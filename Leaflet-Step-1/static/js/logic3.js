// Store URL link
var url = "https://earthquake.usgs.gov/fdsnws/event/1/query.geojson?starttime=2000-09-29%2000:00:00&endtime=2021-10-06%2023:59:59&maxlatitude=50&minlatitude=24.6&maxlongitude=-65&minlongitude=-125&minmagnitude=4.5&orderby=time";

var myMap = L.map("map", {
    center: [39.82, -98.58],
    zoom: 5
});

// Perform a GET response to the query URL
d3.json(url).then(function (data) {
    d3.json(url).then(function(data) {
        // Add markers to data/map
        L.geoJson(data).addTo(myMap);

    var mag = data.properties.mag;
    var title = data.features.properties.title;
    var depth = data.geometry.coordinates[2];
    console.log(mag);
    })


    L.circle(earthquakes, {
        fillOpacity: 0.75,
        color: mag,
        fillColor: depth,
        radius: markerSize(mag.depth)
    }).bindPopup(`<h1>${title}</h1> <hr> <h3>Depth: ${depth.toLocaleString()}</h3>`).addTo(myMap);
    


    function createFeatures(earthquakeData) {
        
    // Define a function that we want to run once for each feature in the features array.
    // Give each feature a popup that describes the place and time of the earthquake.
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.title}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
    }

    // Create a GeoJSON layer that contains the features array on the earthquakeData object.
    // Run the onEachFeature function once for each piece of data in the array.
    var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature
    });

    // Send our earthquakes layer to the createMap function/
    createMap(earthquakes);
    console.log(earthquakes);


        function createMap(earthquakes) {
            // Create the base layers
            var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            })

            var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        });

        // Create a baseMaps object.
        var baseMaps = {
            "Street Map": street,
            "Topographic Map": topo
        };

        // Create an overlay object to hold our overlay.
        var overlayMaps = {
            Earthquakes: earthquakes
        };
        

        // Create our map, giving it the streetmap and earthquakes layers to display on load.
        var myMap = L.map("map", {
            center: [
            39.82, -98.581
            ],
            zoom: 5,
            layers: [street, earthquakes]
        });
        

        // Create a layer control.
        // Pass it our baseMaps and overlayMaps.
        // Add the layer control to the map.
        L.control.layers(baseMaps, overlayMaps, {
            collapsed: false
        }).addTo(myMap);

        var mag = earthquakes.features.properties.mag;
        var title = earthquakes.features.properties.title;
        var depth = earthquakes.geometry.coordinates[2];

        L.circle(earthquakes, {
            fillOpacity: 0.75,
            color: mag,
            fillColor: depth,
            radius: markerSize(mag.depth)
        }).bindPopup(`<h1>${title}</h1> <hr> <h3>Depth: ${depth.toLocaleString()}</h3>`).addTo(myMap);
        }
    

      L.circle(earthquakes, {
            color: earthquakes.properties.mag,
            fillColor: "#f03",
            fillOpacity: 0.5,
            radius: 50.0
      }).addTo(myMap); 
    }
});
