// var searchControl = new L.Control.Search({
//   layer: geojson, 
//   // container: 'findbox', 
//   propertyName: 'SCHOOL_NAM', 
//   circleLocation:false,
// moveToLocation: null
// 	});
//     searchControl.on('search:locationfound', function(e) {
//     e.layer.setStyle({fillColor: '#3f0', color: '#0f0'});
//     if(e.layer._popup)
//         e.layer.openPopup();
// }).on('search_collapsed', function(e) {
//     geojson.eachLayer(function(layer) {
//         geojson.resetStyle(layer);
//     });
// });
// mymap.addControl( searchControl );



// CSS
// #findbox {
//     background: #eee;
//     border-radius:.125em;
//     border:2px solid #1978cf;
//     box-shadow: 0 0 8px #999;	
//     margin-bottom: 10px;
//     padding: 2px 0;
//     width: 100px;
//     height: 26px;
//   }
//   .search-tooltip {
//     width: 200px;
//   }
//   .leaflet-control-search .search-cancel {
//     position: static;
//     float: left;
//     margin-left: -22px;
//   }



//   links
//   <script src="vendor/leaflet-search-master/src/leaflet-search.js"></script>
//   <link rel="stylesheet" href="vendor/leaflet-search-master/src/leaflet-search.css" />