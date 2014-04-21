var Marionette = require('backbone.marionette'),
    utils = require('../utils');

module.exports = itemView = Marionette.ItemView.extend({
    template: require('../../templates/map_view.hbs'),
    tagName: 'div',
    className: 'fullscreen-container',
    initialize: function() {
        // Listening to map model rather than canvas model
        // Should it re-render the whole view?
        // Should it even be listening?
        // What causes the model to change?
        this.listenTo(this.model, 'change', this.render);
    },

    onRender: function() {
        // Temporarily add the map to the DOM so that it can be sized properly
        this.$el.addClass('temp-render');
        this.$el.css('width','inherit');
        $('body').append(this.$el);
        window.mapLastPos = null;

        var swLat = parseFloat(this.model.attributes.attributes.coordinates.sw.lat);
        var swLng = parseFloat(this.model.attributes.attributes.coordinates.sw.lng);
        var neLat = parseFloat(this.model.attributes.attributes.coordinates.ne.lat);
        var neLng = parseFloat(this.model.attributes.attributes.coordinates.ne.lng);

        var swCoords = new google.maps.LatLng(swLat, swLng);
        var neCoords = new google.maps.LatLng(neLat, neLng);

        var mapBounds = new google.maps.LatLngBounds(swCoords, neCoords);

        var mapCenter = new google.maps.LatLng(
            swLat + ((neLat - swLat) / 2),
            swLng + ((neLng - swLng) / 2)
        );
        
        var mapOptions = {
            center: mapCenter,
            zoom: 1,
            styles: utils.mapStyles,
            panControl: false,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            overviewMapControl: false
        };
        var map = new google.maps.Map(this.$el.find(".map-canvas")[0],
            mapOptions);

        // Zoom to bounds
        map.fitBounds(mapBounds);

        zoomChangeBoundsListener = google.maps.event.addListenerOnce(map, 'bounds_changed', function(event) {
            if (this.getZoom()){
                mapOptions.minZoom = this.getZoom();
                map.setOptions(mapOptions);
            }
        });

        // Add map boundary
        map = utils.addMapBoundary(map, swLat, swLng, neLat, neLng);

        // Center on window resize
        google.maps.event.addDomListener(window, 'resize', function() {
            var center = map.getCenter();
            google.maps.event.trigger(map, 'resize');
            map.setCenter(center);
        });

        // Store center on mousedown - will revert back to this position if user pans out of bounds
        google.maps.event.addDomListener(window, 'mousedown', function() {
            window.mapLastPos = map.getCenter();
        });

        // Store center on mousedown - will revert back to this position if user pans out of bounds
        google.maps.event.addDomListener(window, 'mouseup', function() {
            if (!map.getBounds().intersects(mapBounds) && window.mapLastPos) {
                map.panTo(window.mapLastPos);
                window.mapLastPos = null;
            }
        });

        this.$el.remove();
        this.$el.removeClass('temp-render');
    }
});