/**
 * maps.js
 *
 * Maps controller for Express app
 */

/* Includes */
var models = require('../app/models'),
    utils = require('../utils'),
    _ = require('underscore');

/* Exports */
module.exports = {

    // Return all Maps
	index: function(req, res) {
        models.Map.find({}, null, null, function(err, maps) {
            res.json(maps);
        });
    },

    // Return a single Map based on its ID
    getById: function(req, res) {
        models.Map.findOne({ _id: req.params.id }, function(err, map) {
            // If there are errors, handle them
            if (err) {
                // Handle 404
                if (err.name === 'CastError' && err.type === 'ObjectId') {
                    utils.log.warn('Map.getById 404', err.message, err);
                    res.send(404);
                // Handle 500
                } else {
                    utils.log.error('Map.getById 500', err.message, err);
                    res.send(500);
                }
            // If there are no errors, return the Manvas
            } else {
                res.json(map);
            }
        });
    },

    // Add a Map to the DB
    add: function(req, res) {

        var newMap = new models.Map(req.body);

        // Attempt to save Map to DB
        newMap.save(function(err, map) {
            // If there are errors, handle them
            if (err) {
                res.json({err: 'Error adding map'});
            // If there are no errors, return the Map
            } else {
                res.json(map);
            }
        });
    },

    // @TODO Update Map
    // update: function(req, res) {

    // },

    // @TODO Update Delete
    //delete: function(req, res) {

    //}
};