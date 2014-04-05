var Backbone = require('backbone'),
    MapModel = require('../models/map');

module.exports = MapCollection = Backbone.Collection.extend({
	initialize: function() {
		this.url = '/api/map/index';
	},
	model: MapModel
});