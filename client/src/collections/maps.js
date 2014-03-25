var Backbone = require('backbone'),
    ContactModel = require('../models/map');

module.exports = MapsCollection = Backbone.Collection.extend({
	model: MapModel,
	url: '/api/map'
});