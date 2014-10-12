/**
 * mapadd.js
 *
 * Map Add view
 */

/* Exports */
var Marionette = require('backbone.marionette'),
    utils = require('../utils'),
    canvasModel = require('../models/canvas');

/* Exports */
module.exports = ItemView = Marionette.ItemView.extend({
    template: require('../../templates/map_add.hbs'),
    tagName: 'div',
    className: 'container',
    events: {
        'click .btn-submit': 'validateField',
        'click .to-maps': 'toMaps',
        'click .back': 'back'
    },

    // Form validation
    validateField: function(e) {
        // Suppress normal form submission behaviour
        e.preventDefault();

        var map = {
            coordinates: {
                sw: {},
                ne: {}
            }
        };

        var errors = [];

        // Validate name
        if (this.$el.find('form #inputName').val() === "") {
            this.$el.find('form #inputName').parent('.form-group').addClass('has-error');
            errors.push('Invalid map name');
        } else {
            this.$el.find('form #inputName').parent('.form-group').removeClass('has-error');
        }

        // Validate coordinate fields
        var coordFields = {
            'inputSWLatitude': 'SW Latitude',
            'inputSWLongitude': 'SW Longitude',
            'inputNELatitude': 'NE Latitude',
            'inputNELongitude': 'NE Longitude'
        };
        var that = this;
        $.each(coordFields, function(fieldName, fieldLabel) {
            if (isNaN(parseFloat(that.$el.find('form #' + fieldName).val()).toFixed(3))) {
                that.$el.find('form #' + fieldName).parent('.form-group').addClass('has-error');
                errors.push('Invalid: ' + fieldLabel);
            } else {
                that.$el.find('form #' + fieldName).parent('.form-group').removeClass('has-error');
            }
        });

        // If there are no errors, continue with form processing
        if (errors.length === 0) {
            map.name = this.$el.find('form #inputName').val();
            map.coordinates.sw.lat = parseFloat(this.$el.find('form #inputSWLatitude').val());
            map.coordinates.sw.lng = parseFloat(this.$el.find('form #inputSWLongitude').val());
            map.coordinates.ne.lat = parseFloat(this.$el.find('form #inputNELatitude').val());
            map.coordinates.ne.lng = parseFloat(this.$el.find('form #inputNELongitude').val());
            this.addMap(map);
        // If there are form errors, display them to the user
        } else {
            $('.messages').empty();
            $('.messages').append('<div class="alert alert-danger">' + errors.join('<BR/>') + '</div>');
        }
    },

    // Send request for new map addition to API
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

    // Route user to map index view
    toMaps: function() {
        window.App.router.navigate('#/map');
    },

    // Route user back one page
    back: function() {
        window.history.back();
    }
});