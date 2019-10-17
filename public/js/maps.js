//leaflet js
var mymap = L.map('mapid').setView([1.44, 32.49], 7);


var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);


var geojsonMarkerOptions = {
    radius: 6,
    fillColor: "#fe9929",
    color: "#000",
    weight: 0.6,
    opacity: 1,
    fillOpacity: 1
};



geojson = L.geoJson(schools, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions);},
    onEachFeature: function(features, featureLayer) {
            featureLayer.bindPopup(features.properties.Name);
            featureLayer.on('click', function (e) {
                mymap.setView(e.latlng, 8)
                ake(features.properties.Name);
             });
  
            }
}).addTo(mymap);


var searchControl = new L.Control.Search({
    layer: geojson, 
    container: 'findBox', 
    propertyName: 'Name', 
    circleLocation:false,
  moveToLocation: null
      });
      searchControl.on('search:locationfound', function(e) {
      ake(e.text);
      e.layer.setStyle({fillColor: '#3f0', color: '#0f0'});
      if(e.layer._popup)
          e.layer.openPopup();
  }).on('search_collapsed', function(e) {
      geojson.eachLayer(function(layer) {
          geojson.resetStyle(layer);
      });
  });
  mymap.addControl( searchControl );

