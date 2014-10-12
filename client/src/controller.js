/**
 * controller.js
 *
 * View controller for the client app
 * http://backbonejs.org/#View
 */

/* Includes */
var Backbone = require('backbone'),
    Marionette = require('backbone.marionette'),
    utils = require('./utils'),
    NotFoundView = require('./views/notfound'),
    HomeView = require('./views/home'),
    MapsView = require('./views/maps'),
    MapViewView = require('./views/mapview'),
    MapAddView = require('./views/mapadd');

/* Exports */
module.exports = Controller = Marionette.Controller.extend({
    initialize: function() {
        utils.log.info('Controller: Initializing');

        // Display home view as default app view
        window.App.views.homeView = new HomeView();
    },

    // Home view
    home: function() {
        var view = window.App.views.homeView;
        this.renderView(view);
    },

    // Map Index view
    mapIndex: function(page) {
        // Display page 1 if no page specified
        if (!page || page === "") {
            page = '1';
        }
        var view = null;
        window.App.controller.page = page;

        // Get set of maps based on the page number
        var start = (parseInt(page) - 1) * utils.mapIndexLength;
        var end = start + utils.mapIndexLength;
        var maps = new Backbone.Collection(window.App.data.maps.slice(start, end));

        // If there are no maps and displaying page 1,
        // render map view with no map data
        if (maps.length === 0 && page === '1') {
            view = new MapsView();
        // If there are maps, render view with map data
        } else if (maps.length  > 0) {
            view = new MapsView({ collection: maps});
        // If there are no maps and not page 1,
        // display page not found view
        } else {
            view = new NotFoundView();
        }

        this.renderView(view);
    },

    // Single Map view
    mapView: function(id) {
        var map = new Backbone.Model(window.App.data.maps.get(id));
        if (map.id == id) {
            view = new MapViewView({model: map});
        } else {
            view = new NotFoundView();
        }
        this.renderView(view);
    },

    // @TODO Single Map interaction mode view
    mapInteract: function(id) {

    },

    // @TODO Single Map timeline mode view
    mapTimeline: function(id) {

    },

    // @TODO Admin: Single Map edit view
    mapEdit: function(id) {

    },

    // Admin: Single Map add view
    mapAdd: function() {
        var view = new MapAddView();
        this.renderView(view);
        window.App.router.navigate('#/map/add');
    },

    // Page not found view
    notFound: function() {
        view = new NotFoundView();
        this.renderView(view);
    },

    // Render view by replacing page container element with new view elements
    renderView: function(view) {
        this.destroyCurrentView(view);
        $('#communitymapping-container').html(view.render().el);
    },

    // Destroy the currently displayed view
    destroyCurrentView: function(view) {
        if (!_.isUndefined(window.App.views.currentView)) {
            window.App.views.currentView.close();
        }
        window.App.views.currentView = view;
    }
});