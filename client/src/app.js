/**
 * app.js
 *
 * Client app
 */

/* Includes */
var Marionette = require('backbone.marionette'),
	utils = require('./utils'),
    Controller = require('./controller'),
    Router = require('./router'),
    MapModel = require('./models/map'),
    MapCollection = require('./collections/maps');

/* Exports */
module.exports = App = function App() {};

// Define app
App.prototype.start = function() {

    // App is a Marionette application
	App.core = new Marionette.Application();

    // initialize:before event handler
	App.core.on("initialize:before", function (options) {
        utils.log.info('App: Initializing');

        App.views = {};
        App.data = {};

        // Load maps
        var maps = new MapCollection();
        maps.fetch({
            success: function() {
                App.data.maps = maps;
                App.core.vent.trigger('app:start');
            }
        });

    });

    // app:start event handler
    App.core.vent.bind('app:start', function(options){
        utils.log.info('App: Starting');

        // Initialize backbone browser history control
        if (Backbone.history) {
            App.controller = new Controller();
            App.router = new Router({ controller: App.controller });
            utils.log.info('App: Backbone.history starting');
            Backbone.history.start();
        } else {
            utils.log.error('Backbone.history not defined');
        }

        utils.log.info('App: Done starting and running!');
    });

    App.core.start();
};