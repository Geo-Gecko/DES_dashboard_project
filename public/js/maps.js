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
        return L.circleMarker(latlng, geojsonMarkerOptions);
    },
    onEachFeature: function (features, featureLayer) {
        var popup_html = "<h4>School Info</h4>" +
            "<table class='popup-table'>" +
            "<tr>" +
            "<td class='attrib-name'>School Name:</td>" +
            "<td class='attrib-value'>" + features.properties['School Name'] + "</td>" +
            "</tr>" +
            "<tr>" +
            "<td class='attrib-name'>EMIS Code:</td>" +
            "<td class='attrib-value'>" + features.properties['EMIS NO'] + "</td>" +
            " </tr>" +
            "<tr>" +
            "<td class='attrib-name'>Location:</td>" +
            " <td class='attrib-value'>" + features.properties.District + " | " + features.properties.Subcounty + " | " + features.properties['Parish\/Ward'] + "</td>" +
            "</tr>" +
            " </table>";
        featureLayer.bindPopup(popup_html);
        featureLayer.on('click', function (e) {
            mymap.setView(e.latlng, 8)
            ake(features.properties['EMIS NO']);
        });

    }
}).addTo(mymap);


var searchControl = new L.Control.Search({
    layer: geojson,
    container: 'findBox',
    propertyName: 'Name',
    circleLocation: false,
    moveToLocation: null
});
searchControl.on('search:locationfound', function (e) {
    ake(e.text);
    e.layer.setStyle({ fillColor: '#3f0', color: '#0f0' });
    if (e.layer._popup)
        e.layer.openPopup();
}).on('search_collapsed', function (e) {
    geojson.eachLayer(function (layer) {
        geojson.resetStyle(layer);
    });
});
mymap.addControl(searchControl);

