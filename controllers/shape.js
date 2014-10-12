/**
 * shape.js
 *
 * Shape controller for Express app
 */

/* Includes */
var models = require('../app/models'),
    utils = require('../utils');

/* Exports */
module.exports = {

    // Return a single Shape based on its ID
    getById: function(req, res) {
        models.Shape.findOne({ _id: req.params.id }, function(err, shape) {
            // If there are errors, handle them
            if (err) {
                // Handle 404
                if (err.name === 'CastError' && err.type === 'ObjectId') {
                    utils.log.warn('Shape.getById 404', err.message, err);
                    res.send(404);
                // Handle 500
                } else {
                    utils.log.error('Shape.getById 500', err.message, err);
                    res.send(500);
                }
            // If there are no errors, return the Shape
            } else {
                res.json(shape);
            }
        });
    },

    // Return a single Shape based on a time range
    getByTimerange: function(req, res) {

        // If a maximum number of shapes has been passed in
        if (typeof req.params.max !== 'undefined') {
            // If maximum number of shapes to return passed in is > 1, set no options
            if (req.params.max < 1) {
                var options = null;
            // If maximum number of shapes to return passed in is 1 or more,
            // set no options to be passed in method call which queries DB
            } else {
                var options = {
                    skip: (req.params.page * req.params.max) - req.params.max,
                    limit: req.params.max
                };
            }
        // If no maximum number of shapes to return has been passed in,
        // set no options to be passed in method call which queries DB,
        // setting the number of shapes to return to the app default
        } else {
            var options = {
                skip: (req.params.page * utils.constants.pagelength) - utils.constants.pagelength,
                limit: utils.constants.pagelength
            };
        }

        // Query DB
        models.Shape.find({ 
                timestamp: { $gte: req.params.start }, 
                timestamp: { $lte: req.params.end } 
            }, null, options, function(err, shapes) {
                res.json(shapes);
        });
    },

    // Add a Shape to the DB
    add: function(req, res) {

        var newShape = new models.Shape(req.body);

        // Attempt to save Shape to DB
        newShape.save(function(err, shape) {
            // If there are errors, handle them
            if (err) {
                res.json({err: 'Error adding shape'});
            // If there are no errors, return the Shape
            } else {
                res.json(shape);
            }
        });
    }

    // @TODO Update Shape
    // update: function(req, res) {

    // },

    // @TODO Delete Shape
    //delete: function(req, res) {

    //}
};