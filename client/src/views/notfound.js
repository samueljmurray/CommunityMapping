var Marionette = require('backbone.marionette');

module.exports = NotFoundView = Marionette.ItemView.extend({
    template: require('../../templates/not_found.hbs'),
    tagName: 'div',
    className: 'container'
});