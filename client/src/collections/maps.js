/**
 * maps.js
 *
 * The client app Map collection
 * http://backbonejs.org/#Collection
 */

/* Includes */
var Backbone = require('backbone'),
    MapModel = require('../models/map');

/* Exports */
module.exports = MapCollection = Backbone.Collection.extend({
	initialize: function() {
		this.url = '/api/map/index';
	},
	model: MapModel
});