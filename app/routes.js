var home = require('../controllers/home'),
   map = require('../controllers/map'),
   canvas = require('../controllers/canvas'),
   shape = require('../controllers/shape'),
   story = require('../controllers/story');

module.exports.initialize = function(app) {
	// Home
    app.get('/', home.index);

    // Map routes
    app.get('/api/map/index', map.index);
    app.get('/api/map/:id', map.getById);
    app.post('/api/map', map.add);
    //app.put('/api/map', map.update);
    //app.delete('/api/map/:id', map.delete);

    // Canvas routes
    app.get('/api/canvas/:id', canvas.getById);
    app.post('/api/canvas', canvas.add);
    //app.put('/api/canvas', canvas.update);
    //app.delete('/api/canvas/:id', canvas.delete);

    // Shape routes
    app.get('/api/shape/:id', shape.getById);
    app.get('/api/shape/timerange/:start/:end/:page/:max?', shape.getByTimerange);
    app.post('/api/shape', shape.add);
    //app.put('/api/shape', shape.update);
    //app.delete('/api/shape/:id', shape.delete);

    // Storyboard routes
    app.get('/api/story/:id', story.getById);
    app.get('/api/story/spacerange/:lat1/:lng1/:lat2/:lng2/:page/:max?', story.getBySpacerange);
    app.post('/api/story', story.add);
    //app.put('/api/story', story.update);
    //app.delete('/api/story/:id', story.delete);
};
