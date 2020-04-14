
let name_of_school_;
let geojson;
let schools = [];
let groupBy = function(data, key) {
        return data.reduce(function(storage, item) {
            var group = item[key];
            storage[group] = storage[group] || [];
            storage[group].push(item);
            return storage; 
        }, {});
    };


axios.get('/dashboard/allCoordinates/2019')
    .then(function (response) {
        // handle success
        let sorted_schools = groupBy(response.data.school, 'district')
        let total_schools_in_district = {};
        for (let [key, school_collection] of Object.entries(sorted_schools)) {
            school_collection.sort((a, b) => {
                if (a.Total < b.Total) { return -1 }
                if (a.Total > b.Total) { return 1 }
                return 0
            })
            school_collection = school_collection.reverse()
            school_collection.forEach((collection_, i) => {
                collection_.Total = i + 1
                schools.push(collection_)
            })
            total_schools_in_district[key] = school_collection.length

        };

        var jsonFeatures = [];

        schools.forEach(function (point) {
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
                    fillColor: getColour(
                        feature.properties.Total, total_schools_in_district[feature.properties.district]
                    ),
                    color: "#000",
                    weight: 0.6,
                    opacity: 1,
                    fillOpacity: 1
                };
                return L.circleMarker(latlng, geojsonMarkerOptions);
            },
            onEachFeature: function (feature, featureLayer) {

                var popup_html = "<h4>School Information</h4>" +
                    "<table class='popup-table'>" +
                    "<tr>" +
                    "<td class='attrib-name'>School Name:</td>" +
                    "<td class='attrib-value'>" + feature.properties['name'] + "</td>" +
                    "</tr>" +
                    "<tr>" +
                    "<td class='attrib-name'>EMIS Code:</td>" +
                    "<td class='attrib-value'>" + feature.properties['emis_number'] + "</td>" +
                    " </tr>" +
                    "<tr>" +
                    "<td class='attrib-name'>Ranking:</td>" +
                    " <td class='attrib-value'>Rank: <b>" + feature.properties.Total + "</b> in " + feature.properties.district + "</td>" +
                    "</tr>" +
                    "<tr>" +
                    "<td class='attrib-name'>District:</td>" +
                    " <td class='attrib-value'>" + feature.properties.district + "</td>" +
                    "</tr>" +
                    "<tr>" +
                    "<td class='attrib-name'>Subcounty:</td>" +
                    " <td class='attrib-value'>" + feature.properties.sub_county + "</td>" +
                    "</tr>" +
                    "<tr>" +
                    "<td class='attrib-name'>Parish/Ward:</td>" +
                    " <td class='attrib-value'>" + feature.properties.parish_ward + "</td>" +
                    "</tr>" +
                    " </table>";
                featureLayer.bindPopup(popup_html);
                featureLayer.on('click', function (e) {
                    mymap.setView(e.latlng, 15.5)
                    name_of_school_ = feature.properties['name']
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

function getColour(d, total_schools) {
    let school_position = (d/total_schools) * 100;
    if (school_position <= 25) {
        return "#008000"
    } else if (school_position <= 50 && school_position > 25) {
        return "#FFFF00"
    } else if (school_position <= 75 && school_position > 50) {
        return "#FFA500"
    } else if (school_position <= 100 && school_position > 75) {
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
        "<text class='legend-text' x='25' y='25' dy='0.8em' style='color: white;'>A - (1% - 25%)</text>" +
        "<text class='legend-text' x='25' y='45' dy='0.8em' style='color: white;'>B - (25% - 50%)</text>" +
        "<text class='legend-text' x='25' y='65' dy='0.8em' style='color: white;'>C - (50% - 75%)</text>" +
        "<text class='legend-text' x='25' y='85' dy='0.8em' style='color: white;'>D - (75% - 100%)</text>" +
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
