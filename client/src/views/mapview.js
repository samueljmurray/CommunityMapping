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
        console.log($('body'));
        $('body').append(this.$el);

        console.log('Map View appended');

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
          zoom: 1
        };
        var map = new google.maps.Map(this.$el.find(".map-canvas")[0],
            mapOptions);

        map.fitBounds(mapBounds);

        var rectangle = new google.maps.Rectangle();

        var rectOptions = {
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 1,
          fillColor: '#FFFFFF',
          fillOpacity: 0,
          map: map,
          bounds: mapBounds
        };
        rectangle.setOptions(rectOptions);

		google.maps.event.addDomListener(window, 'resize', function() {
			var center = map.getCenter();
			google.maps.event.trigger(map, 'resize');
			map.setCenter(center);
		});

        this.$el.remove();
        this.$el.removeClass('temp-render');
	}
});