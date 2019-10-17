//leaflet js
var mymap = L.map('mapid').setView([1.44, 32.49], 7);


var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);


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

function highlightPolygonFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0
    });

    this.openPopup();

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
}

function resetHighlight(e) {
    var layer = e.target;
    this.closePopup();
    layer.setStyle({
        "fillColor": "#fff",
        "weight": 0.7,
        "opacity": 1,
        "color": '#000',
        "fillOpacity": 0.3
    });
}


function zoomToFeature(e) {
    mymap.fitBounds(e.target.getBounds());
    let selectedDistrict = e.target.feature.properties.DNAME2014;

    let letterD = selectedDistrict.charAt(0);
    let remainingD = selectedDistrict.substr(1);

    let districtStringD = letterD + remainingD

    ake(districtStringD)

}

let allDistricts = ["KALIRO", "IBANDA", "GULU", "TORORO", "SOROTI", "JINJA", "KAMPALA", "RAKAI", "KAPCHORWA", "MOROTO", "MBARARA", "KAKUMIRO", "IGANGA", "LIRA", "KABALE", "HOIMA", "BUDUDA", "SHEEMA", "ADJUMANI", "MBALE", "NTOROKO", "LWENGO", "BUVUMA", "YUMBE", "MASINDI", "KIBAALE", "MANAFWA", "APAC", "AMURU", "DOKOLO", "BUTALEJA"]

function onEachFeature(feature, layer) {
     layer.on({
        mouseover: highlightPolygonFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
    layer.bindPopup(feature.properties.DNAME2014);
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