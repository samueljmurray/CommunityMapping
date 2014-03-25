var Marionette = require('backbone.marionette'),
	utils = require('./utils'),
    Controller = require('./controller'),
    Router = require('./router');
    //MapModel = require('./models/map'),
    //MapCollection = require('./collections/map');

// Define and export App
module.exports = App = function App() {};

App.prototype.start = function() {
	App.core = new Marionette.Application();

	App.core.on("initialize:before", function (options) {
        utils.log.info('App: Initializing');

        App.views = {};
        App.data = {};

        // load up some initial data:
        //var maps = new MapsCollection();
        //maps.fetch({
        //    success: function() {
        //        App.data.maps = maps;
        //        App.core.vent.trigger('app:start');
        //    }
        //});

		App.core.vent.trigger('app:start');

    });

    App.core.vent.bind('app:start', function(options){
        utils.log.info('App: Starting');
        if (Backbone.history) {
            App.controller = new Controller();
            App.router = new Router({ controller: App.controller });
            utils.log.info('App: Backbone.history starting');
            Backbone.history.start();
        } else {
            utils.log.error('Backbone.history not defined');
        }

        //new up and views and render for base app here...
        utils.log.info('App: Done starting and running!');
    });

    App.core.start();
};