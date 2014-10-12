/**
 * canvas.js
 *
 * Client app Canvas model
 */

/* Includes */
var Backbone = require('backbone');

/* Exports */
module.exports = MapModel = Backbone.Model.extend({
    idAttribute: '_id',
    urlRoot: 'api/canvas' // Connect to Canvas API endpoint
});