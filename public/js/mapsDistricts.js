let districtString

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
    this._div.innerHTML = (props ? 'District: <b>' + props.DName2019 + '</b><br/>' +
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
        "fillOpacity": 0
    });
}

//adding the districts geojson
function geojsonpolygonOptions(feature) {
    return {
        "fillColor": "#fff",
        "weight": 0.7,
        "opacity": 1,
        "color": '#000',
        "fillOpacity": 0
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
    if (check == undefined) {
        mymap.fitBounds(e.target.getBounds());
        var selectedDistrict = e.target.feature.properties.DName2019;
    } else {
        mymap.fitBounds(e.getBounds());
        var selectedDistrict = e.feature.properties.DName2019;
    }

    let letterD = selectedDistrict.charAt(0);
    let remainingD = selectedDistrict.substr(1);

    let districtStringD = letterD + remainingD

    if (mymap.hasLayer(schoolsJson)) {
        mymap.removeLayer(schoolsJson)
    }

    schoolCount = 0;

    schoolsJson = L.geoJson(schools, {
        pointToLayer: function (feature, latlng) {
            var geojsonMarkerOptions = {
                radius: 6,
                fillColor: getColour(feature.properties.Grade),
                color: "#000",
                weight: 0.6,
                opacity: 1,
                fillOpacity: 1
            };
            if (districtStringD === feature.properties.District.toUpperCase()) {
                schoolCount++;
                return L.circleMarker(latlng, geojsonMarkerOptions);
            }
        }
    }).addTo(mymap);

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
                " <td class='attrib-value'><b>" + l.feature.properties.Ranking + "</b> Out of " + schoolCount + " schools in " + l.feature.properties.District + "</td>" +
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



    ake(districtStringD, "2019")

}

let allDistricts = ["KALIRO", "IBANDA", "GULU", "TORORO", "SOROTI", "MOYO", "KWEEN", "BUKWO", "SIRONKO", "OBONGI", "ARUA", "ARUA M.C", "KAPCHORWA M.C", "MARACHA", "MADI-OKOLLO", "JINJA", "KAMPALA", "RAKAI", "KAPCHORWA", "MOROTO", "MBARARA", "KAKUMIRO", "IGANGA", "LIRA", "KABALE", "HOIMA", "BUDUDA", "SHEEMA", "ADJUMANI", "MBALE", "NTOROKO", "LWENGO", "BUVUMA", "YUMBE", "MASINDI", "KIBAALE", "MANAFWA", "APAC", "AMURU", "DOKOLO", "BUTALEJA"]

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
        if (l.feature.properties.DName2019 === $(this).val()) {
            zoomToFeature(l, false);
            // l.setStyle({
            //     "fillColor": "#0f0",
            //     "weight": 0.7,
            //     "opacity": 1,
            //     "color": '#0f0',
            //     "fillOpacity": 0.3
            // })
        }
    }

    let letter = $(this).val().charAt(0);
    let remaining = $(this).val().substr(1);

    districtString = letter + remaining;


    ake(districtString, "2019")
})



var info1 = L.control({ position: 'bottomright' });

info1.onAdd = function (mymap) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info1.update = function (props) {
    this._div.innerHTML =
        "<div id='legend' style='display: none'>" +
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




axios.get("/years").then(response => {

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
        console.log(year_select.value)
        ake(districtString, year_select.value)
    }
    
    year_select.addEventListener('change', updateYear, false);

})