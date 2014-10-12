/**
 * canvas.js
 *
 * Canvas controller for Express app
 */

/* Includes */
var models = require('../app/models'),
    utils = require('../utils');

/* Exports */
module.exports = {

    // Return a single Canvas based on its ID
    getById: function(req, res) {
        models.Canvas.findOne({ _id: req.params.id }, function(err, canvas) {
            // If there are errors, handle them
            if (err) {
                // Handle 404
                if (err.name === 'CastError' && err.type === 'ObjectId') {
                    utils.log.warn('Canvas.getById 404', err.message, err);
                    res.send(404);
                // Handle 500
                } else {
                    utils.log.error('Canvas.getById 500', err.message, err);
                    res.send(500);
                }
            // If there are no errors, return the Canvas
            } else {
                res.json(canvas);
            }

        });
    },

    // Add a Canvas to the DB
    add: function(req, res) {

        var newCanvas = new models.Canvas(req.body);

        // Attempt to save Canvas to DB
        newCanvas.save(function(err, canvas) {
            // If there are errors, handle them
            if (err) {
                res.json({err: 'Error adding canvas'});
            // If there are no errors, return the Canvas
            } else {
                res.json(canvas);
            }
        });
    },

    // @TODO Update Canvas
    // update: function(req, res) {

    // },

    // @TODO Delete Canvas
    //delete: function(req, res) {

    //}
};