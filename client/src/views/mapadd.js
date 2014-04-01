var Marionette = require('backbone.marionette'),
    utils = require('../utils'),
    canvasModel = require('../models/canvas');

module.exports = ItemView = Marionette.ItemView.extend({
    template: require('../../templates/map_add.hbs'),
    tagName: 'div',
    className: 'container',
    events: {
        'click .btn-submit': 'validateField',
        'click .back-to-maps': 'backToMaps'
    },

    validateField: function(e) {
        // Suppress normal form submission behaviour
        e.preventDefault();

        var map = {};
        map.coordinates = {};

        var errors = [];

        // Validate name
        if (this.$el.find('form #inputName').val() === "") {
            this.$el.find('form #inputName').parent('.form-group').addClass('has-error');
            errors.push('Invalid map name.');
        } else {
            this.$el.find('form #inputName').parent('.form-group').removeClass('has-error');
            map.name = this.$el.find('form #inputName').val();
        }

        // Validate latitude
        if (isNaN(parseFloat(this.$el.find('form #inputLatitude').val()).toFixed(3))) {
            this.$el.find('form #inputLatitude').parent('.form-group').addClass('has-error');
            errors.push('Invalid latitude.');
        } else {
            this.$el.find('form #inputLatitude').parent('.form-group').removeClass('has-error');
            map.coordinates.lat = parseFloat(parseFloat(this.$el.find('form #inputLatitude').val()).toFixed(3));
        }

        // Validate longitude
        if (isNaN(parseFloat(this.$el.find('form #inputLongitude').val()).toFixed(3))) {
            this.$el.find('form #inputLongitude').parent('.form-group').addClass('has-error');
            errors.push('Invalid longitude.');
        } else {
            this.$el.find('form #inputLongitude').parent('.form-group').removeClass('has-error');
            map.coordinates.lng = parseFloat(parseFloat(this.$el.find('form #inputLongitude').val()).toFixed(3));
        }

        if (errors.length === 0) {
            this.addMap(map);
        } else {
            $('.messages').empty();
            $('.messages').append('<div class="alert alert-danger">' + errors.join('<BR/>') + '</div>');
        }
    },
    addMap: function(map) {
        var canvas = new canvasModel();
        canvas.save(null, {success: function(model, response) {
            map.canvasId = model.id;
            map = window.App.data.maps.create(map);
            console.log(map);
            $('.messages').empty();
            $('.form-container').empty();
            $('.messages').append('<div class="alert alert-success">Map <strong>' + map.attributes.name + '</strong> added successfully.</div>');
        }});
    },
    backToMaps: function() {
        window.history.back();
    }
});