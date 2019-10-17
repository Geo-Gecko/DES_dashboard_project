//leaflet js
var mymap = L.map('mapid').setView([1.44, 32.49], 7);


var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);


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

function highlightPolygonFeature(e) {
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
    this.openPopup();
}

function resetHighlight(e) {
    var layer = e.target;

	layer.setStyle({
		"fillColor": "#fff",
        "weight": 0.7, 
        "opacity": 1, 
        "color": '#000', 
        "fillOpacity": 0.3
    });
    this.closePopup();
}


function zoomToFeature(e) {
    
    mymap.fitBounds(e.target.getBounds());
    let selectedRegion = e.target.feature.properties.REGION;

    let letterD = selectedRegion.charAt(0);
    let remainingD = selectedRegion.substr(1);

    let RegionStringD = letterD+remainingD

    ake(RegionStringD)
}

let allRegions = [];

function onEachFeature(feature, layer) {
    // console.log(layer)
    allRegions.push(layer.feature.properties.REGION);
    layer.on({
        mouseover: highlightPolygonFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
    layer.bindPopup(feature.properties.REGION);
}

geojson = L.geoJson(regions,{
        style: geojsonpolygonOptions,
        onEachFeature: onEachFeature
}).addTo(mymap);

var select = $('<select name="options" id="options" style="width: 100%;"></select>');
$.each(allRegions, function (index, value) {
    if (value.key !== "CENTRAL") {
        var option = $('<option></option>');
        option.attr('value', value);
        option.text(value);
        select.append(option);
    }

});
$('#regionDropdown').empty().append(select);

$('#options').change(function () {

    for(key in geojson['_layers']) {
        let l = geojson['_layers'][key]
        l.setStyle({
            "fillColor": "#fff",
            "weight": 0.7, 
            "opacity": 1, 
            "color": '#000', 
            "fillOpacity": 0.3
        })
        if(l.feature.properties.REGION === $(this).val()){
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

    let RegionString = letter+remaining

    ake(RegionString)
})


