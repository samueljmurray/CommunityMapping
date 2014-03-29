var Marionette = require('backbone.marionette'),
    utils = require('../utils');

var itemView = Marionette.ItemView.extend({
    template: require('../../templates/map_small.hbs'),
    tagName: 'div',
    className: 'col-sm-6 col-md-4 map-small-item',
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
    },
    //events: {
    //    'click': 'showDetails'
    //},

    onRender: function(el) {
        // Temporarily add the map to the DOM so that it can be sized properly
        $(el.el).addClass('temp-render');
        $('body').append($(el.el));
        
        var mapOptions = {
          center: new google.maps.LatLng(el.model.attributes.coordinates.lat, el.model.attributes.coordinates.lng),
          zoom: 14
        };
        var map = new google.maps.Map($(el.el).find(".map-canvas")[0],
            mapOptions);

        $(el.el).remove();
        $(el.el).removeClass('temp-render');
    }
});

module.exports = CompositeView = Marionette.CompositeView.extend({
    template: require('../../templates/map_index.hbs'),
    tagName: 'div',
    className: 'container',
    initialize: function() {
        this.listenTo(this.collection, 'change', this.render);
    },

    onRender: function(el) {
        var page = window.App.controller.page;
        if (page === '1') {
            $(el.el).find('.pagination-btn-group .prev').addClass('disabled');
        } else {
            $(el.el).find('.pagination-btn-group .prev').attr('href', '#/map/' + (parseInt(page, 10) - 1));
        }

        var remaining = window.App.data.maps.length - (page * utils.mapIndexLength);
        if (remaining < 1) {
            $(el.el).find('.pagination-btn-group .next').addClass('disabled');
        } else {
            $(el.el).find('.pagination-btn-group .next').attr('href', '#/map/' + (parseInt(page, 10) + 1));
        }
    },
    itemView: itemView,
    itemViewContainer: '.map-index-item-container'
});