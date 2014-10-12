/**
 * notfound.js
 *
 * Page not found view
 */

/* Includes */
var Marionette = require('backbone.marionette');

/* Exports */
module.exports = NotFoundView = Marionette.ItemView.extend({
    template: require('../../templates/not_found.hbs'),
    tagName: 'div',
    className: 'container'
});