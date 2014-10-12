/**
 * utils.js
 *
 * Utility variables and methods
 */

/* Exports */
module.exports = {
    // Custom logging methods
    log: {
        info: function(msg) {
            console.log('INFO ' + msg);
        },
        warn: function(msg) {
            console.log('WARN ' + msg);
        },
        error: function(msg) {
            console.log('ERROR ' + msg);
        }
    },

    // Number of maps to display per page on map index view
    mapIndexLength: 12,

    // Google Maps API styles
    // https://developers.google.com/maps/documentation/javascript/styling
    mapStyles: [{
      "elementType": "labels.icon",
      "stylers": [
        { "visibility": "off" }
      ]
    },{
      "featureType": "landscape.man_made",
      "stylers": [
        { "visibility": "off" }
      ]
    },{
      "featureType": "poi",
      "stylers": [
        { "visibility": "off" }
      ]
    },{
      "elementType": "geometry.fill",
      "stylers": [
        { "visibility": "on" },
        { "color": "#FFFFFF" }
      ]
    },{
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
        { "weight": 0.6 }
      ]
    },{
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
        { "color": "#808080" }
      ]
    },{
      "elementType": "labels",
      "stylers": [
        { "lightness": 25 },
        { "saturation": -100 }
      ]
    },{
      "featureType": "transit.line",
      "elementType": "geometry.fill",
      "stylers": [
        { "color": "#808080" },
        { "weight": 0.5 }
      ]
    },{
      "featureType": "transit.station",
      "stylers": [
        { "visibility": "off" }
      ]
    },{
      "featureType": "administrative.country",
      "elementType": "all",
      "stylers": [
        { "weight": 0.6 }
      ]
    },{
      "featureType": "administrative.country",
      "elementType": "all",
      "stylers": [
        { "color": "#808080" }
      ]
    },{
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        { "color": "#F1F1F6" }
      ]
    }],

    // Add bounding boxes in negative space around defined map space
    addMapBoundary: function(map, swLat, swLng, neLat, neLng) {
        var rectOptions = {
          strokeColor: '#FFFFFF',
          strokeOpacity: 0,
          strokeWeight: 0,
          fillColor: '#444444',
          fillOpacity: 0.5,
          bounds: null,
          map: map,
        };

        var swCoords, neCoords, mapBounds;

        // Add boundary box 1
        swCoords = new google.maps.LatLng(-90, -180);
        neCoords = new google.maps.LatLng(swLat, neLng);
        rectOptions.bounds = new google.maps.LatLngBounds(swCoords, neCoords);
        var rectangle1 = new google.maps.Rectangle();
        rectangle1.setOptions(rectOptions);

        // Add boundary box 2
        swCoords = new google.maps.LatLng(swLat, -180);
        neCoords = new google.maps.LatLng(90, swLng);
        rectOptions.bounds = new google.maps.LatLngBounds(swCoords, neCoords);
        var rectangle2 = new google.maps.Rectangle();
        rectangle2.setOptions(rectOptions);

        // Add boundary box 3
        swCoords = new google.maps.LatLng(neLat, swLng);
        neCoords = new google.maps.LatLng(90, 180);
        rectOptions.bounds = new google.maps.LatLngBounds(swCoords, neCoords);
        var rectangle3 = new google.maps.Rectangle();
        rectangle3.setOptions(rectOptions);

        // Add boundary box 4
        swCoords = new google.maps.LatLng(-90, neLng);
        neCoords = new google.maps.LatLng(neLat, 180);
        rectOptions.bounds = new google.maps.LatLngBounds(swCoords, neCoords);
        var rectangle4 = new google.maps.Rectangle();
        rectangle4.setOptions(rectOptions);

        return map;
    }
};