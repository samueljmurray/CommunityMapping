var Backbone = require('backbone'),
    Marionette = require('backbone.marionette'),
    utils = require('./utils'),
    NotFoundView = require('./views/notfound'),
    HomeView = require('./views/home'),
    MapsView = require('./views/maps'),
    MapViewView = require('./views/mapview'),
    MapAddView = require('./views/mapadd');

module.exports = Controller = Marionette.Controller.extend({
    initialize: function() {
        utils.log.info('Controller: Initializing');
        window.App.views.homeView = new HomeView();
    },
    home: function() {
        var view = window.App.views.homeView;
        this.renderView(view);
    },
    mapIndex: function(page) {
        if (!page || page === "") {
            page = '1';
        }
        var view = null;
        window.App.controller.page = page;

        // Get map range
        var start = (parseInt(page) - 1) * utils.mapIndexLength;
        var end = start + utils.mapIndexLength;
        var maps = new Backbone.Collection(window.App.data.maps.slice(start, end));

        if (maps.length === 0 && page === '1') {
            view = new MapsView();
        } else if (maps.length  > 0) {
            view = new MapsView({ collection: maps});
        } else {
            view = new NotFoundView();
        }
        this.renderView(view);
    },
    mapView: function(id) {
        var map = new Backbone.Model(window.App.data.maps.get(id));
        if (map.id == id) {
            view = new MapViewView({model: map});
        } else {
            view = new NotFoundView();
        }
        this.renderView(view);
    },
    mapInteract: function(id) {

    },
    mapTimeline: function(id) {

    },
    mapEdit: function(id) {

    },
    mapAdd: function() {
        var view = new MapAddView();
        this.renderView(view);
        window.App.router.navigate('#/map/add');
    },
    notFound: function() {
        view = new NotFoundView();
        this.renderView(view);
    },
    renderView: function(view) {
        this.destroyCurrentView(view);
        $('#communitymapping-container').html(view.render().el);
    },
    destroyCurrentView: function(view) {
        if (!_.isUndefined(window.App.views.currentView)) {
            window.App.views.currentView.close();
        }
        window.App.views.currentView = view;
    }
});