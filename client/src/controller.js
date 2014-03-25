var Marionette = require('backbone.marionette'),
	utils = require('./utils'),
	HomeView = require('./views/home');

module.exports = Controller = Marionette.Controller.extend({
	initialize: function() {
        utils.log.info('Controller: Initializing');
        window.App.views.homeView = new HomeView();
    },
    home: function() {
        var view = window.App.views.homeView;
        this.renderView(view);
        // Ensure the URL is correct
        window.App.router.navigate('#/');
    },
    mapIndex: function() {

    },
    mapInteract: function(id) {

    },
    mapView: function(id) {

    },
    mapTimeline: function(id) {

    },
    mapEdit: function(id) {

    },
    mapAdd: function() {

    },
    renderView: function(view) {
        this.destroyCurrentView(view);
        $('#communitymapping-container').html(view.render().el);
    },
    destroyCurrentView: function(view) {

    }
});