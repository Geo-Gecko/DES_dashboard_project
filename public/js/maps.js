let name_of_school_;
let schools, geojson;
axios.get('/dashboard/allCoordinates/2019')
    .then(function (response) {
        // handle success
        console.log(response)
        schools = response.data.school;

        var jsonFeatures = [];

        schools.forEach(function (point) {
            // console.log(point)
            var lat = point.latitude;
            var lon = point.longitude;

            var feature = {
                type: 'Feature',
                properties: point,
                geometry: {
                    type: 'Point',
                    coordinates: [lon, lat]
                }
            };

            jsonFeatures.push(feature);
        });

        var schoolsGeoJson = { type: 'FeatureCollection', features: jsonFeatures };

        geojson = L.geoJson(schoolsGeoJson, {
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

                var randomScalingFactor = function() {
                    return Math.ceil(Math.random() * 1.0) * Math.pow(10, Math.ceil(Math.random() * 4));
                };

                var popup_html = "<h4>School Information</h4>" +
                    "<table class='popup-table'>" +
                    "<tr>" +
                    "<td class='attrib-name'>School Name:</td>" +
                    "<td class='attrib-value'>" + features.properties['name'] + "</td>" +
                    "</tr>" +
                    "<tr>" +
                    "<td class='attrib-name'>EMIS Code:</td>" +
                    "<td class='attrib-value'>" + features.properties['emis_number'] + "</td>" +
                    " </tr>" +
                    "<tr>" +
                    "<td class='attrib-name'>Ranking:</td>" +
                    " <td class='attrib-value'>Rank: <b>" + randomScalingFactor() + "</b> in " + features.properties.district + "</td>" +
                    "</tr>" +
                    "<tr>" +
                    "<td class='attrib-name'>District:</td>" +
                    " <td class='attrib-value'>" + features.properties.district + "</td>" +
                    "</tr>" +
                    "<tr>" +
                    "<td class='attrib-name'>Subcounty:</td>" +
                    " <td class='attrib-value'>" + features.properties.sub_county + "</td>" +
                    "</tr>" +
                    "<tr>" +
                    "<td class='attrib-name'>Parish/Ward:</td>" +
                    " <td class='attrib-value'>" + features.properties.parish_ward + "</td>" +
                    "</tr>" +
                    " </table>";
                featureLayer.bindPopup(popup_html);
                featureLayer.on('click', function (e) {
                    mymap.setView(e.latlng, 15.5)
                    name_of_school_ = features.properties['name']
                    ake(name_of_school_, "2019");
                });

            }
        }).addTo(mymap);



    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
    });

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

var searchControl = new L.Control.Search({
    layer: geojson,
    container: 'findBox',
    propertyName: 'name',
    circleLocation: false,
    moveToLocation: null
});
searchControl.on('search:locationfound', function (e) {
    
    name_of_school_ = e.layer.feature.properties["name"]
    ake(name_of_school_, "2019");
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

var info1 = L.control({ position: 'bottomright' });

info1.onAdd = function (mymap) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info1.update = function (props) {
    this._div.innerHTML =
        "<div id='legend' style=''>" +
        "<svg class='head' width='150' height='100'>" +
        "<circle cy='30' cx='10' r='0.4em' style='fill: #008000;'></circle>" +
        "<circle cy='50' cx='10' r='0.4em' style='fill: #FFFF00;'></circle>" +
        "<circle cy='70' cx='10' r='0.4em' style='fill: #FFA500;'></circle>" +
        "<circle cy='90' cx='10' r='0.4em' style='fill: #FF0000;'></circle>" +
        "<text class='legend-text' x='25' y='25' dy='0.8em' style='color: white;'>A - (81% - 100%)</text>" +
        "<text class='legend-text' x='25' y='45' dy='0.8em' style='color: white;'>B - (61% - 80%)</text>" +
        "<text class='legend-text' x='25' y='65' dy='0.8em' style='color: white;'>C - (41% - 60%)</text>" +
        "<text class='legend-text' x='25' y='85' dy='0.8em' style='color: white;'>D - (25% - 40%)</text>" +
        "<text class='legend-title' x='0' y='0' font-weight='bold' dy='0.8em'>Legend</text>" +
        "</svg>" +
        "</div>";
};

info1.addTo(mymap);




axios.get("/dashboard/years").then(response => {

    var year_select = document.getElementById("select-year");
    let years_ = response.data["years"]
    years_ = years_.filter(year_ => {
        if (year_ >= "2019"){
            return true
        }
        return false
    })

    years_.forEach(year_ => {
        let option_ = document.createElement("option")
        option_.textContent = year_
        year_select.append(option_)
    })

    let updateYear = () => {
        ake(name_of_school_, year_select.value)
    }
    
    year_select.addEventListener('change', updateYear, false);

})
