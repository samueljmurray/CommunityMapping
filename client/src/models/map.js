/**
 * maps.js
 *
 * Client app Map model
 */

/* Includes */
var Backbone = require('backbone');

/* Exports */
module.exports = MapModel = Backbone.Model.extend({
    idAttribute: '_id',
    urlRoot: 'api/map' // Connect to Map API endpoint
});