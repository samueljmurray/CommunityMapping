/**
 * story.js
 *
 * Story controller for Express app
 */

/* Includes */
var models = require('../app/models'),
    utils = require('../utils');

/* Exports */
module.exports = {

    // Return a single Story based on its ID
    getById: function(req, res) {
        models.Story.findOne({ _id: req.params.id }, function(err, story) {
            // If there are errors, handle them
            if (err) {
                // Handle 404
                if (err.name === 'CastError' && err.type === 'ObjectId') {
                    utils.log.warn('Story.getById 404', err.message, err);
                    res.send(404);
                // Handle 500
                } else {
                    utils.log.error('Story.getById 500', err.message, err);
                    res.send(500);
                }
            // If there are no errors, return the Story
            } else {
                res.json(story);
            }
        });
    },

    // Return a single Story based on a space range
    getBySpacerange: function(req, res) {

        // If a maximum number of stories has been passed in
        if (typeof req.params.max !== 'undefined') {
            // If maximum number of shapes to return passed in is > 1, set no options
            if (req.params.max < 1) {
                var options = null;
            // If maximum number of stories to return passed in is 1 or more,
            // set no options to be passed in method call which queries DB
            } else {
                var options = {
                    skip: (req.params.page * req.params.max) - req.params.max,
                    limit: req.params.max
                };
            }
        // If no maximum number of stories to return has been passed in,
        // set no options to be passed in method call which queries DB,
        // setting the number of stories to return to the app default
        } else {
            var options = {
                skip: (req.params.page * utils.constants.pagelength) - utils.constants.pagelength,
                limit: utils.constants.pagelength
            };
        }

        // Query DB
        models.Story.find({ coordinates: {
                lat: {
                    $gte: req.params.lat1,
                    $lte: req.params.lat2
                }
            },
            coordinates: {
                lng: {
                    $lte: req.params.lng1,
                    $gte: req.params.lng2
                }
            }
        }, null, options, function(err, stories) {
            res.json(stories);
        });
    },

    // Add a Story to the DB
    add: function(req, res) {

        var newStory = new models.Story(req.body);

        // Attempt to save Story to DB
        newStory.save(function(err, story) {
            // If there are errors, handle them
            if (err) {
                res.json({err: 'Error adding story'});
            // If there are no errors, return the Story
            } else {
                res.json(story);
            }
        });
    }

    // @TODO Update Story
    // update: function(req, res) {

    // },

    // @TODO Delete Story
    //delete: function(req, res) {

    //}
};