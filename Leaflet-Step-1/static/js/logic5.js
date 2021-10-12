// LOGIC 8 

// Add Streepmap layer
var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    container: 'map'
});

var myMap = L.map("map", {
    center: [39.82, -98.58],
    zoom: 5
});

streetmap.addTo(myMap);

// import url 
var url = "https://earthquake.usgs.gov/fdsnws/event/1/query.geojson?starttime=2000-09-29%2000:00:00&endtime=2021-10-06%2023:59:59&maxlatitude=50&minlatitude=24.6&maxlongitude=-65&minlongitude=-125&minmagnitude=4.5&orderby=time";

// Create a function to pull data from url 
d3.json(url).then(EqData => {
    var features = EqData.features;
    console.log(features);
    features.forEach(earthquake => {
        var mag = earthquake.properties.mag
        // var depth = earthquake.geometry.coordinates[2];
        // var title = earthquake.properties.title;
        // var time = earthquake.properties.time;
        // var lat = earthquake.geometry.coordinates[0];
        // var lon = earthquake.geometry.coordinates[1];

    
        // Create function to hold map style
        function mapStyle(earthquake) {
            return {
                opacity: 0.5,
                fillOpacity: 1,
                fillColor: getColor(earthquake.properties.mag),
                radius: getRadius(earthquake.properties.mag),
                weight: 0.5,
                
            };
        } 

        function getColor(mag) {
            if (mag <= 1)
            return "#00FF00"; 
            if (mag <= 2)
            return "#ffff00";
            if (mag <= 3)
            return "#ff9933";
            if (mag <= 4)
            return "#ff5050";
            if (mag >= 5)
            return "#990000"
        }

        function getRadius(mag) {
            if (mag === 0) {
                return 1;
            } 
            return mag;
            
        }

        L.geoJson(earthquake, {
            pointToLayer: function (features, latlng) {
                return L.circleMarker(latlng);
            },
            style: mapStyle,
            onEachFeature: function(feature, layer) {
                layer.bindPopup("Magnitude: " + earthquake.properties.time + "<br> Location: " + earthquake.properties.title);
            }
        }).addTo(myMap);
    })
});

