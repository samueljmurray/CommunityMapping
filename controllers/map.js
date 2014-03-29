var models = require('../app/models'),
    utils = require('../utils'),
    _ = require('underscore');

module.exports = {
	index: function(req, res) {
        models.Map.find({}, null, null, function(err, maps) {
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