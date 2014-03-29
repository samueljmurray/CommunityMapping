var Marionette = require('backbone.marionette'),
    utils = require('../utils');

module.exports = ItemView = Marionette.ItemView.extend({
    template: require('../../templates/map_add.hbs'),
    tagName: 'div',
    className: 'container',
    // Submit click
    //events: {
    //    'click': 'showDetails'
    //},

    onRender: function(el) {
        console.log('ehllo');
    }
});