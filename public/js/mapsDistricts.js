//leaflet js
var mymap = L.map('mapid').setView([1.44, 32.49], 7);


var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);


var info = L.control();

info.onAdd = function (mymap) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = (props ? 'District: <b>' + props.DNAME2014 + '</b><br/>' +
        'Region: <b>' + props.REGION + '</b>'
        : 'Hover over a district');
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
        "fillOpacity": 0.3
    });
}

//adding the districts geojson
function geojsonpolygonOptions(feature) {
    return {
        "fillColor": "#fff",
        "weight": 0.7,
        "opacity": 1,
        "color": '#000',
        "fillOpacity": 0.5
    };
}

var geojsonMarkerOptions = {
    radius: 6,
    fillColor: "#fe9929",
    color: "#000",
    weight: 0.6,
    opacity: 1,
    fillOpacity: 1
};

var schoolsJson;

function zoomToFeature(e) {
    mymap.fitBounds(e.target.getBounds());
    let selectedDistrict = e.target.feature.properties.DNAME2014;

    let letterD = selectedDistrict.charAt(0);
    let remainingD = selectedDistrict.substr(1);

    let districtStringD = letterD + remainingD

    // ake(districtStringD)


    if (mymap.hasLayer(schoolsJson)) {
        mymap.removeLayer(schoolsJson)
    }

    schoolsJson = L.geoJson(schools, {
        pointToLayer: function (feature, latlng) {
            console.log(districtStringD);
            console.log(feature.properties.District.toUpperCase());

            if (districtStringD === feature.properties.District.toUpperCase()) {
                console.log(true)
                return L.circleMarker(latlng, geojsonMarkerOptions);
            }
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

}

let allDistricts = ["KALIRO", "IBANDA", "GULU", "TORORO", "SOROTI", "JINJA", "KAMPALA", "RAKAI", "KAPCHORWA", "MOROTO", "MBARARA", "KAKUMIRO", "IGANGA", "LIRA", "KABALE", "HOIMA", "BUDUDA", "SHEEMA", "ADJUMANI", "MBALE", "NTOROKO", "LWENGO", "BUVUMA", "YUMBE", "MASINDI", "KIBAALE", "MANAFWA", "APAC", "AMURU", "DOKOLO", "BUTALEJA"]

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = L.geoJson(districts, {
    style: geojsonpolygonOptions,
    onEachFeature: onEachFeature
}).addTo(mymap);

var select = $('<select name="options" id="options" style="width: 100%;"><option value="KAMPALA">KAMPALA</option></select>');
$.each(allDistricts, function (index, value) {
    if (value.key !== "KAMPALA") {
        var option = $('<option></option>');
        option.attr('value', value);
        option.text(value);
        select.append(option);
    }

});
$('#districtDropdown').empty().append(select);

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
        if (l.feature.properties.DNAME2014 === $(this).val()) {
            mymap.fitBounds(l.getBounds());
            l.setStyle({
                "fillColor": "#0f0",
                "weight": 0.7,
                "opacity": 1,
                "color": '#0f0',
                "fillOpacity": 0.3
            })
        }
    }

    let letter = $(this).val().charAt(0);
    let remaining = $(this).val().substr(1);

    let districtString = letter + remaining

    ake(districtString)
})