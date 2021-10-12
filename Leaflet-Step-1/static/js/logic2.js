

// Create a map object.
var myMap = L.map("map", {
    center: [39.82, -98.58],
    zoom: 5
});

// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

var url = "https://earthquake.usgs.gov/fdsnws/event/1/query.geojson?starttime=2000-09-29%2000:00:00&endtime=2021-10-06%2023:59:59&maxlatitude=50&minlatitude=24.6&maxlongitude=-65&minlongitude=-125&minmagnitude=4.5&orderby=time";

// Define a markerSize() function that will give each earthquake a different radius based on mag size.
function markerSize(earthquakes) {
    return Math.sqrt(earthquakes) * 50;
}

// Each city object contains the city's name, location, and population.
d3.json(url).then(function (earthquakes) {
    L.geojson(earthquakes, {
        style: function(features) {
            return {
                color: "white",
                fillColor: chooseColor(features.properties.mag),
                weight: 1.5
            };
        },
        // This is called on each feature.
        onEachFeature: function(feature, layer) {
        // Set the mouse events to change the map styling.
         layer.on({
          // When a user's mouse cursor touches a map feature, the mouseover event calls this function, which makes that feature's opacity change to 90% so that it stands out.
          mouseover: function(event) {
            layer = event.target;
            layer.setStyle({
              fillOpacity: 0.9
            });
          },
          // When the cursor no longer hovers over a map feature (that is, when the mouseout event occurs), the feature's opacity reverts back to 50%.
          mouseout: function(event) {
            layer = event.target;
            layer.setStyle({
              fillOpacity: 0.5
            });
          },
          // When a feature (neighborhood) is clicked, it enlarges to fit the screen.
          click: function(event) {
            myMap.fitBounds(event.target.getBounds());
          }
        });
        // Giving each feature a popup with information that's relevant to it
        layer.bindPopup("<h1>" + feature.properties.title + "</h1> <hr> <h2>" + feature.properties.time + "</h2>");
  
        } 
    }).addTo(myMap);
});


