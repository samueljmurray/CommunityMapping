var models = require('../app/models'),
    utils = require('../utils');

module.exports = {
	index: function(req, res) {
        if (typeof req.params.max !== 'undefined') {
            if (req.params.max === 0) {
                var options = null;
            } else {
                var options = {
                    skip: (req.params.page * req.params.max) - req.params.max,
                    limit: req.params.max
                };
            }
        } else {
            var options = {
                skip: (req.params.page * utils.constants.pagelength) - utils.constants.pagelength,
                limit: utils.constants.pagelength
            };
        }

        models.Story.find({}, null, options, function(err, stories) {
            res.json(stories);
        });
    },
    getById: function(req, res) {
        models.Story.findOne({ _id: req.params.id }, function(err, story) {
            if (err) {
                res.json({err: 'Story not found'})
            } else {
                res.json(story);
            }
        });
    },
    getBySpacerange: function(req, res) {
        if (typeof req.params.max !== 'undefined') {
            if (req.params.max === 0) {
                var options = null;
            } else {
                var options = {
                    skip: (req.params.page * req.params.max) - req.params.max,
                    limit: req.params.max
                };
            }
        } else {
            var options = {
                skip: (req.params.page * utils.constants.pagelength) - utils.constants.pagelength,
                limit: utils.constants.pagelength
            };
        }

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
    add: function(req, res) {
        var newStory = new models.Story(req.body);
        newStory.save(function(err, story) {
            if (err) {
                res.json({err: 'Error adding story'});
            } else {
                res.json(story);
            }
        });
    }
    // update: function(req, res) {

    // },
    //delete: function(req, res) {

    //}
};