/**
 * home.js
 *
 * Home view
 */

/* Includes */
var Marionette = require('backbone.marionette');

/* Exports */
module.exports = HomeView = Marionette.ItemView.extend({
	template: require('../../templates/home.hbs')
});