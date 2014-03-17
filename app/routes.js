var home = require('../controllers/home'),
   map = require('../controllers/map'),
   canvas = require('../controllers/canvas'),
   shape = require('../controllers/shape'),
   storyboard = require('../controllers/storyboard');

module.exports.initialize = function(app) {
	// Home
    app.get('/', home.index);

    // Map routes
    //app.get('/api/maps', maps.index);
    app.get('/api/maps/:id', maps.getById);
    //app.post('/api/maps', maps.add);
    //app.put('/api/maps', maps.update);
    //app.delete('/api/maps/:id', maps.delete);

    // Canvas routes
    //app.get('/api/canvas', canvas.index);
    app.get('/api/canvas/:id', canvas.getById);
    //app.post('/api/canvas', canvas.add);
    //app.put('/api/canvas', canvas.update);
    //app.delete('/api/canvas/:id', canvas.delete);

    // Shape routes
    //app.get('/api/shape', shape.index);
    app.get('/api/shape/:id', shape.getById);
    app.get('/api/shape/timerange/:start/:end', shape.getByTimerange);
    app.post('/api/shape', shape.add);
    //app.put('/api/shape', shape.update);
    //app.delete('/api/shape/:id', shape.delete);

    // Storyboard routes
    //app.get('/api/storyboard', storyboard.index);
    app.get('/api/storyboard/:id', storyboard.getById);
    app.get('/api/storyboard/spacerange/:x1/:y1/:x2/:y2', storyboard.getBySpacerange);
    app.post('/api/storyboard', storyboard.add);
    //app.put('/api/storyboard', storyboard.update);
    //app.delete('/api/storyboard/:id', storyboard.delete);
};
