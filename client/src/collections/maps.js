var Backbone = require('backbone'),
    MapModel = require('../models/map');

module.exports = MapsCollection = Backbone.Collection.extend({
	initialize: function(page) {
		this.url = '/api/map/index';
	},
	model: MapModel
});