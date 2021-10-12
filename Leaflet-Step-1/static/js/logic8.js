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
        // var depth = earthquake.geometry.coordinates[2];
        // var title = earthquake.properties.title;
        // var time = earthquake.properties.time;
        // var lat = earthquake.geometry.coordinates[0];
        // var lon = earthquake.geometry.coordinates[1];

    
        // Create function to hold map style
        function mapStyle(features) {
            return {
            opacity: 0.8,
            fillOpacity: 0.5,
            fillColor: getColor(features.geometry.coordinates[2]),
            radius: getRadius(features.properties.mag),
            weight: 0.5,
                
            }; 
        }

        function getColor(depth) {
            if (depth <= 5) {
             return "#00FF00";   
            }
            if (depth <= 10) {
            return "#ffff00";
            }
            if (depth <= 15) {
            return "#ff9933";    
            }
            if (depth <= 20) {
            return "#ff5050";    
            }
            if (depth <= 25) {
             return "#800040";
            }
            if (depth > 25) {
            return "#990000"    
            }
            console.log('mag', depth > 7)
            return "#000000"
        }

        function getRadius(mag) {
            if (mag === 0) {
                return 1;
            } 
            return mag *3;
                
        }

    L.geoJson(EqData, {
        pointToLayer: function (features, latlng) {
            return L.circleMarker(latlng);
        },
        style: mapStyle,
        onEachFeature: function(features, layer) {
            layer.bindPopup("Magnitude Depth: " + features.geometry.coordinates[2] + "<br> Location: " + features.properties.title);
        }
    }).addTo(myMap);

    //Set up legend/box 
    var legend = L.control({ position: "bottomright"});
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var limits = ["<=5", "<=10", "  <=15", "  <=20", "  <=25", "  25+"];
        var colors = ["#00FF00", "#ffff00", "#ff9933", "#ff5050", "#800040", "#990000"];
        var labels = [];

        var legendInfo = "<h2> Earthquake Depth </h2>" +
        "<div class=\"labels\">" +
        limits 
        "</div>";

        div.innerHTML = legendInfo;

        for (let legendLabel = 0; legendLabel <limits.length; legendLabel++) {
            labels.push("<li style='background-color: " + colors[legendLabel] + "' ></li>");
        }

        div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        return div;
    };

    legend.addTo(myMap);
});