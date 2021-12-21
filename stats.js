
//Initialise map
//-------------------------------------------------------------------------------------------------------------
// https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio (if youhave to work wit canvas)
var pixel_ratio = parseInt(window.devicePixelRatio) || 1;
// leaflet max zoom
var max_zoom = 16;
// Width and height of tiles (reduce number of tiles and increase tile size)
var tile_size = 512;
// zoom to italy (lat,lon, zoom)
var map = L.map('map', {
  zoomControl: false
}).setView([0, 10], 4);


var busy_tabs ={ spinner: "pulsar",color:'#ff5722',background:'#111314c4'};

var busy_wdpa ={ color:'#0a6519',background:'#111314c4'};

// Define basemaps
// choose one from https://leaflet-extras.github.io/leaflet-providers/preview/
var WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
 attribution: ''
}).addTo(map);

var light  =  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
  subdomains: 'abcd',
  opacity: 0.8,
	maxZoom: 19
}).addTo(map);


// Lable pane (no additional library required)
var topPane = map.createPane('leaflet-top-pane', map.getPanes().mapPane);
var topLayer =  L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_only_labels/{z}/{x}/{y}.png', {
	subdomains: 'abcd',
  opacity: 1,
	maxZoom: 19
}).addTo(map);

var mask = L.tileLayer('https://geospatial.jrc.ec.europa.eu/geoserver/gwc/service/tms/1.0.0/africa_platform:world_flat_no_africa_no_eez_@EPSG:900913@png/{z}/{x}/{y}.png', {tms: true,zIndex: 40, opacity: 1}).addTo(map)
  topPane.appendChild(topLayer.getContainer());
  topLayer.setZIndex(2);
  topPane.appendChild(mask.getContainer());
  mask.setZIndex(3);
topLayer.setZIndex(2);
var url = 'https://geospatial.jrc.ec.europa.eu/geoserver/africa_platform/wms';
var country_mask=L.tileLayer.wms(url, {
  layers: 'africa_platform:gaul_eez_dissolved',
  transparent: true,
  format: 'image/png',
  opacity:'0.7',
  styles:'africa_platform_mask_country2',
  zIndex: 9
}).addTo(map);









// 	oilpalm 

var oil_palm = L.tileLayer('https://geospatial.jrc.ec.europa.eu/geoserver/gwc/service/tms/1.0.0/oilpalm:oilpalm@EPSG:900913@png/{z}/{x}/{y}.png', {tms: true,zIndex: 32, opacity: 0.9});
oil_palm.on("load",function() {$(".card-image_oil_palm").busyLoad("hide", {animation: "fade"});});

$('.add_oil_palm').click(function(event) {
  if (map.hasLayer(oil_palm)) {
    map.removeLayer(oil_palm);
    $( ".oil_palm_main" ).find( "#show_pa" ).hide();
    $(".card-image_oil_palm").busyLoad("hide", {animation: "fade"});
    $(this).css("color", "#ffffff");
   
}else{
  oil_palm.addTo(map);
  $(".card-image_oil_palm").busyLoad("show", busy_tabs);
  $( ".oil_palm_main" ).find( "#show_pa" ).show();
  $(this).css("color", "#b2610e");
}
});



// 	oilpalm PROB

var oil_palm_p = L.tileLayer('https://geospatial.jrc.ec.europa.eu/geoserver/gwc/service/tms/1.0.0/oilpalm:oilpalm_probability@EPSG:900913@png/{z}/{x}/{y}.png', {tms: true,zIndex: 32, opacity: 0.9});
oil_palm_p.on("load",function() {$(".card-image_oil_palm_p").busyLoad("hide", {animation: "fade"});});

$('.add_oil_palm_p').click(function(event) {
  if (map.hasLayer(oil_palm_p)) {
    map.removeLayer(oil_palm_p);
    $( ".oil_palm_p_main" ).find( "#show_pa" ).hide();
    $(".card-image_oil_palm_p").busyLoad("hide", {animation: "fade"});
    $(this).css("color", "#ffffff");
   
}else{
  oil_palm_p.addTo(map);
  $(".card-image_oil_palm_p").busyLoad("show", busy_tabs);
  $( ".oil_palm_p_main" ).find( "#show_pa" ).show();
  $(this).css("color", "#b2610e");
}
});

// 	oilpalm

var oil_palm_vp = L.tileLayer('https://geospatial.jrc.ec.europa.eu/geoserver/gwc/service/tms/1.0.0/oilpalm:oilpalm_val_points@EPSG:900913@png/{z}/{x}/{y}.png', {tms: true,zIndex: 32, opacity: 0.9});
oil_palm_vp.on("load",function() {$(".card-image_oil_palm_vp").busyLoad("hide", {animation: "fade"});});

$('.add_oil_palm_vp').click(function(event) {
  if (map.hasLayer(oil_palm_vp)) {
    map.removeLayer(oil_palm_vp);
    $( ".oil_palm_vp_main" ).find( "#show_pa" ).hide();
    $(".card-image_oil_palm_vp").busyLoad("hide", {animation: "fade"});
    $(this).css("color", "#ffffff");
   
}else{
  oil_palm_vp.addTo(map);
  $(".card-image_oil_palm_vp").busyLoad("show", busy_tabs);
  $( ".oil_palm_vp_main" ).find( "#show_pa" ).show();
  $(this).css("color", "#b2610e");
}
});

// WDPA WMS GEOSERVER LAYER - SETUP
var url = 'https://geospatial.jrc.ec.europa.eu/geoserver/dopa_explorer_3/wms';
var wdpa=L.tileLayer.wms(url, {layers: 'dopa_explorer_3:dopa_geoserver_wdpa_master_201905',transparent: true,format: 'image/png',
featureInfoFormat: 'text/javascript',opacity:'0.2', makeLayerQueryable: true,zIndex: 33});
wdpa.on("load",function() {$(".nav-wrapper").busyLoad("hide", {animation: "fade"});});
// WDPA filter
wdpa.setParams({CQL_FILTER:"marine <> 2"});

var wdpa_marine=L.tileLayer.wms(url, {layers: 'dopa_explorer_3:dopa_geoserver_wdpa_master_201905',transparent: true,format: 'image/png',
featureInfoFormat: 'text/javascript',opacity:'0.4', makeLayerQueryable: true,zIndex: 33});
wdpa_marine.on("load",function() {$(".nav-wrapper").busyLoad("hide", {animation: "fade"});});
// WDPA filter
wdpa_marine.setParams({CQL_FILTER:"marine = 2"});
$( ".card-content" ).find( "#show_pa" ).click(function(event) {
  if (map.hasLayer(wdpa)) {
    map.removeLayer(wdpa);

}else{
  wdpa.addTo(map);
  $(".nav-wrapper").busyLoad("show", busy_wdpa);
}
});

$( ".card-content" ).find( "#show_pa_marine" ).click(function(event) {
  if (map.hasLayer(wdpa_marine)) {
    map.removeLayer(wdpa_marine);

}else{
  wdpa_marine.addTo(map);
  $(".nav-wrapper").busyLoad("show", busy_wdpa);
}
});


//Available Layers
var baseMaps = {"White" : light, "WorldImagery":WorldImagery};



