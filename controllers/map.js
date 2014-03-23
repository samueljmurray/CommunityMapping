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

        models.Map.find({}, null, options, function(err, maps) {
            res.json(maps);
        });
    },
    getById: function(req, res) {
        models.Map.findOne({ _id: req.params.id }, function(err, map) {
            if (err) {
                if (err.name === 'CastError' && err.type === 'ObjectId') {
                    utils.log.warn('Map.getById 404', err.message, err);
                    res.send(404);
                } else {
                    utils.log.error('Map.getById 500', err.message, err);
                    res.send(500);
                }
            } else {
                res.json(map);
            }
        });
    }
    //add: function(req, res) {

    //},
    // update: function(req, res) {

    // },
    //delete: function(req, res) {

    //}
};