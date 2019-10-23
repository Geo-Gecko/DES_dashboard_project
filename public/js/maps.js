//leaflet js
var mymap = L.map('mapid', {
    zoomDelta: 0.25,
    zoomSnap: 0.25
}).setView([1.44, 32.49], 6.5);

var southWest = new L.LatLng(-1.9126224937624325, 28.364710751121848),
    northEast = new L.LatLng(4.614535174441986, 37.13133888527889),
    bounds = new L.LatLngBounds(southWest, northEast);

mymap.fitBounds(bounds);


var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

function getColour(d) {
    if (d === "A") {
        return "#008000"
    } else if (d === "B") {
        return "#FFFF00"
    } else if (d === "C") {
        return "#FFA500"
    } else if (d === "D") {
        return "#FF0000"
    }
}



geojson = L.geoJson(schools, {
    pointToLayer: function (feature, latlng) {
        var geojsonMarkerOptions = {
            radius: 6,
            fillColor: getColour(feature.properties.Grade),
            color: "#000",
            weight: 0.6,
            opacity: 1,
            fillOpacity: 1
        };
        return L.circleMarker(latlng, geojsonMarkerOptions);
    },
    onEachFeature: function (features, featureLayer) {
        var popup_html = "<h4>School Information</h4>" +
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
                "<td class='attrib-name'>Ranking:</td>" +
                " <td class='attrib-value'>Rank: <b>" + features.properties.Ranking + "</b> in " + features.properties.District + "</td>" +
                "</tr>" +
                "<tr>" +
                "<td class='attrib-name'>District:</td>" +
                " <td class='attrib-value'>" + features.properties.District + "</td>" +
                "</tr>" +
                "<tr>" +
                "<td class='attrib-name'>Subcounty:</td>" +
                " <td class='attrib-value'>" + features.properties.Subcounty + "</td>" +
                "</tr>" +
                "<tr>" +
                "<td class='attrib-name'>Parish/Ward:</td>" +
                " <td class='attrib-value'>" + features.properties['Parish\/Ward'] + "</td>" +
                "</tr>" +
                " </table>";
        featureLayer.bindPopup(popup_html);
        featureLayer.on('click', function (e) {
            mymap.setView(e.latlng, 15.5)
            // ake(features.properties['EMIS NO']);
        });

    }
}).addTo(mymap);



var searchControl = new L.Control.Search({
    layer: geojson,
    container: 'findBox',
    propertyName: 'School Name',
    circleLocation: false,
    moveToLocation: null
});
searchControl.on('search:locationfound', function (e) {
    ake(e.text);
    mymap.setView(e.latlng, 15.5)
    e.layer.setStyle({ fillColor: '#3f0', color: '#0f0' });
    if (e.layer._popup)
        e.layer.openPopup();
}).on('search_collapsed', function (e) {
    geojson.eachLayer(function (layer) {
        geojson.resetStyle(layer);
    });
});
mymap.addControl(searchControl);



