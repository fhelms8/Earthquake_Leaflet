// Creating the map object
var myMap = L.map("map", {
    center: [39.82, -98.58],
    zoom: 5
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Use this link to get the GeoJSON data.
var url = "https://earthquake.usgs.gov/fdsnws/event/1/query.geojson?starttime=2000-09-29%2000:00:00&endtime=2021-10-06%2023:59:59&maxlatitude=50&minlatitude=24.6&maxlongitude=-65&minlongitude=-125&minmagnitude=4.5&orderby=time";

// Getting our GeoJSON data
d3.json(url).then(function(data) {
    // Add markers to data/map
    L.geoJson(data, {


    }).addTo(myMap);

    var features = data.features;

    features.forEach(earthquake => {
        // Set Variables for each item needed.
        var mag = earthquake.properties.mag
        

        var depth = earthquake.geometry.coordinates[2];
        

        var title = earthquake.properties.title
        

        var lat = earthquake.geometry.coordinates[0];

        var lon = earthquake.geometry.coordinates[1];

        console.log(earthquake);
    

    var onecircle =  L.circle(earthquake, {
      color: mag,
      fillColor: depth,
      fillOpacity: 0.5,
      radius: mag
    }).addTo(myMap);
      features.push(onecircle);
    });   
        // for (var i = 0; i < mag.length; i++) {
        //   L.circle(earthquake[i], {
        //     fillOpacity: 0.75,
        //     color: mag,
        //     fillColor: depth,
        //     radius: mag
        //   }).bindPopup(`<h1>${title[i]}</h1>`).addTo(myMap);
        
        //   // .bindPopup("<h3>" + title + "<h3><h3>Depth:" + depth);

        //   // console.log(eqMarker);  
        // }
        
      
    
    // for (var i = 0; i < data.length; i++) {
    //   var earthquake = data[i];
    //   var mag = earthquake.properties.mag;
    //   var depth = earthquake.geometry.coordinates[2];
    //   console.log('for loop', mag, depth);

    //   if (mag) {
    //       markers.addLayer(L.marker([mag.coordinates[1], mag.coordinates[0]])
    //       .bindPopup(data[i].descriptor));
    //   }
    //   myMap.addLayer(markers);
  // });
  // });

  // Create marker cluster group
  // var markers = L.markerClusterGroup();

//   Create for loop through the data collected
//   for (var i = 0; i < data.length; i++) {
//       var mag = data[i].mag;
//       console.log('test2', mag);

//       if (mag) {
//           markers.addLayer(L.marker([mag.coordinates[1], mag.coordinates[0]])
//           .bindPopup(data[i].descriptor));
//       }
//       myMap.addLayer(markers);
//   }

});
