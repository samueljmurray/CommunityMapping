var Marionette = require('backbone.marionette');

module.exports = Router = Marionette.AppRouter.extend({
    appRoutes: {
        ''  : 'home',
        'map/interact/:id' : 'mapInteract',
        'map/view/:id' : 'mapView',
        'map/timeline/:id' : 'mapTimeline',
        'map/edit/:id' : 'mapEdit',
        'map/add' : 'mapAdd',
        'map' : 'mapIndex',
        'map/:page' : 'mapIndex',
        '*notFound' : 'notFound'
    }
});
