d3.json(url).then(function(data) {
    L.geoJson(data).addTo(myMap)
    function styleInfo(feature) {
        var layers = {
            mag_1: new L.LayerGroup(),
            mag_2: new L.LayerGroup(),
            mag_3: new L.LayerGroup(),
            mag_4: new L.LayerGroup(),
            mag_over_5: new L.LayerGroup()
        };

        var layers2 = L.map("map-id", {
            layers: [
                layers.mag_1,
                layers.mag_2,
                layers.mag_3,
                layers.mag_4,
                layers.mag_over_5
            ]
        });layers2.addTo(myMap);
    }
  
    function getColor(depth) {
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
    }
  
    function getRadius(magnitude) {
      ...
    }
  
  
    L.geoJson(data, {
      pointToLayer: layers2,
      style: ...,
      onEachFeature: function(feature, layer{
        ...
      }
    }).addTo(map);


/// from logic 8 on 63
    L.geoJson(EqData, {
        style: mapStyle,
        onEachFeature: function(feature, layer) {
            layer.on({
                mouseover: function(event) {
                    layer = event.target;
                    layer.setStyle({
                        fillOpacity: 0.9
                    });
                },
                mouseout: function(event) {
                    layer = event.target;
                    layer.setStyle({
                        fillOpacity: 0.5
                    });
                },
                click: function(event) {
                    myMap.fitBounds(event.target.getBounds());
                }
            });
            // layer.bindPopup(`<h1>` +  `</h1>` );
        }
    }).addTo(myMap);