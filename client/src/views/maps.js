var Marionette = require('backbone.marionette'),
    utils = require('../utils');

var itemView = Marionette.ItemView.extend({
    template: require('../../templates/map_small.hbs'),
    tagName: 'div',
    className: 'col-sm-6 col-md-4 map-small-item',
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
    },

    onRender: function(el) {
        // Temporarily add the map to the DOM so that it can be sized properly
        this.$el.addClass('temp-render');
        $('body').append(this.$el);
        window.mapLastPos = null;

        var swLat = parseFloat(this.model.attributes.coordinates.sw.lat);
        var swLng = parseFloat(this.model.attributes.coordinates.sw.lng);
        var neLat = parseFloat(this.model.attributes.coordinates.ne.lat);
        var neLng = parseFloat(this.model.attributes.coordinates.ne.lng);

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
        var map = new google.maps.Map(this.$el.find(".map-canvas")[0], mapOptions);

        // Zoom to bounds
        map.fitBounds(mapBounds);

        // Add map boundary
        map = utils.addMapBoundary(map, swLat, swLng, neLat, neLng);

        // Center on window resize
        google.maps.event.addDomListener(window, 'resize', function() {
            var center = map.getCenter();
            google.maps.event.trigger(map, "resize");
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

module.exports = CompositeView = Marionette.CompositeView.extend({
    template: require('../../templates/map_index.hbs'),
    tagName: 'div',
    className: 'container',
    itemView: itemView,
    itemViewContainer: '.map-index-item-container',
    initialize: function() {
        if (this.collection) {
            this.listenTo(this.collection, 'change', this.render);
        }
    },

    onRender: function() {
        if (!this.collection) {
            console.log('No collection');
            this.$el.find('.map-index-item-container').append('<div class="col-sm-12"><p>No maps found. <a href="#/map/add">Click here to add one</a></p></div>');
        }
        var page = window.App.controller.page;
        if (page === '1') {
            this.$el.find('.pagination-btn-group .prev').addClass('disabled');
        } else {
            this.$el.find('.pagination-btn-group .prev').attr('href', '#/map/' + (parseInt(page, 10) - 1));
        }

        var remaining = window.App.data.maps.length - (page * utils.mapIndexLength);
        if (remaining < 1) {
            this.$el.find('.pagination-btn-group .next').addClass('disabled');
        } else {
            this.$el.find('.pagination-btn-group .next').attr('href', '#/map/' + (parseInt(page, 10) + 1));
        }
    }
});