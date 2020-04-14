let RegionString
//leaflet js
var mymap = L.map('mapid', {
    renderer: L.canvas()
}).setView([1.44, 32.49], 7);


var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

mymap.createPane('schools');

mymap.getPane('schools').style.zIndex = 650;


var info = L.control();

info.onAdd = function (mymap) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = (props ? 'Region: <b>' + props.REGION + '</b>'
        : 'Hover over a region');
};

info.addTo(mymap);


function highlightFeature(e) {

    var layer = e.target;
    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
}


function resetHighlight(e) {
    info.update();
    var layer = e.target;
    layer.setStyle({
        "fillColor": "#fff",
        "weight": 0.7,
        "opacity": 1,
        "color": '#000',
        "fillOpacity": 0
    });
}

//adding the regions geojson
function geojsonpolygonOptions(feature) {
    return {
        "fillColor": "#fff",
        "weight": 0.7,
        "opacity": 1,
        "color": '#000',
        "fillOpacity": 0.5
    };
}

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

var schoolsJson;

var schoolCount = 0;

function zoomToFeature(e, check) {

    let schools, geojson;
    if (check == undefined) {
        mymap.fitBounds(e.target.getBounds());
        var selectedRegion = e.target.feature.properties.REGION;
    } else {
        mymap.fitBounds(e.getBounds());
        var selectedRegion = e.feature.properties.REGION;
    }

    let letterD = selectedRegion.charAt(0);
    let remainingD = selectedRegion.substr(1);

    let RegionStringD = letterD + remainingD

    if (mymap.hasLayer(geojson)) {
        mymap.removeLayer(geojson)
    }

    axios.get(`/nationals/allCoordinates/${selectedRegion}`)
        .then(function (response) {
            // handle success
            schools = response.data.school;

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

            for (key in mymap['_layers']) {
                let l = mymap['_layers'][key]
                if (l.feature) {
                    if (l.feature.geometry.type == "Point") {
                        mymap.removeLayer(l);
                    }
                }
            }

            geojsonSchools = L.geoJson(schoolsGeoJson, {
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

                    var randomScalingFactor = function () {
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
                        " <td class='attrib-value'>Rank: <b>" + randomScalingFactor() + "</b> in " + features.properties.District + "</td>" +
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
                        ake(features.properties['name'], "2019");
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

    $('#legend').show();

    for (key in mymap['_layers']) {
        if (typeof mymap['_layers'][key]['feature'] !== 'undefined' && mymap['_layers'][key]['feature']['geometry']['type'] !== 'MultiPolygon') {
            var l = mymap['_layers'][key];
            var popup_html = "<h4>School Information</h4>" +
                "<table class='popup-table'>" +
                "<tr>" +
                "<td class='attrib-name'>School Name:</td>" +
                "<td class='attrib-value'>" + l.feature.properties['School Name'] + "</td>" +
                "</tr>" +
                "<tr>" +
                "<td class='attrib-name'>EMIS Code:</td>" +
                "<td class='attrib-value'>" + l.feature.properties['EMIS NO'] + "</td>" +
                " </tr>" +
                "<tr>" +
                "<td class='attrib-name'>Ranking:</td>" +
                " <td class='attrib-value'><b>" + l.feature.properties.Ranking + "</b> Out of " + schoolCount + " schools in the " + l.feature.properties.Region + " Region</td>" +
                "</tr>" +
                "<tr>" +
                "<td class='attrib-name'>District:</td>" +
                " <td class='attrib-value'>" + l.feature.properties.District + "</td>" +
                "</tr>" +
                "<tr>" +
                "<td class='attrib-name'>Subcounty:</td>" +
                " <td class='attrib-value'>" + l.feature.properties.Subcounty + "</td>" +
                "</tr>" +
                "<tr>" +
                "<td class='attrib-name'>Parish/Ward:</td>" +
                " <td class='attrib-value'>" + l.feature.properties['Parish\/Ward'] + "</td>" +
                "</tr>" +
                " </table>";
            l.bindPopup(popup_html)
        }
    }

    ake(RegionStringD, "2019")
}


axios.get("/nationals/allRegions")
    .then(function (response) {
        // handle success
        var allR = response.data.region;

        var select = $('<select name="options" id="options" style="width: 100%;"><option value="Select Region">Select Region</option></select>');
        $.each(allR, function (index, value) {
            var option = $('<option></option>');
            option.attr('value', value.region);
            option.text(value.region);
            select.append(option);
        });
        $('#regionDropdown').empty().append(select);

        $('#options').change(function () {

            for (key in geojson['_layers']) {
                let l = geojson['_layers'][key]
                l.setStyle({
                    "fillColor": "#fff",
                    "weight": 0.7,
                    "opacity": 1,
                    "color": '#000',
                    "fillOpacity": 0.3
                })
                if (l.feature.properties.REGION == $(this).val()) {
                    zoomToFeature(l, false);
                }
            }

            let letter = $(this).val().charAt(0);
            let remaining = $(this).val().substr(1);

            let RegionString = letter + remaining

            ake(RegionString, "2019")
        })

    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
    });

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = L.geoJson(regions, {
    style: geojsonpolygonOptions,
    onEachFeature: onEachFeature
}).addTo(mymap);

var info1 = L.control({ position: 'bottomright' });

info1.onAdd = function (mymap) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info1.update = function (props) {
    this._div.innerHTML = "<div id='legend' style='display: none'>" +
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
        if (year_ >= "2019") {
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
        ake(RegionString, year_select.value)
    }

    year_select.addEventListener('change', updateYear, false);

})
