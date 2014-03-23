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

        models.Shape.find({}, null, options, function(err, shapes) {
            res.json(shapes);
        });
    },
    getById: function(req, res) {
        models.Shape.findOne({ _id: req.params.id }, function(err, shape) {
            if (err) {
                if (err.name === 'CastError' && err.type === 'ObjectId') {
                    utils.log.warn('Shape.getById 404', err.message, err);
                    res.send(404);
                } else {
                    utils.log.error('Shape.getById 500', err.message, err);
                    res.send(500);
                }
            } else {
                res.json(shape);
            }
        });
    },
    getByTimerange: function(req, res) {
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

        models.Shape.find({ 
                timestamp: { $gte: req.params.start }, 
                timestamp: { $lte: req.params.end } 
            }, null, options, function(err, shapes) {
                res.json(shapes);
        });
    },
    add: function(req, res) {
        var newShape = new models.Shape(req.body);
        newShape.save(function(err, shape) {
            if (err) {
                res.json({err: 'Error adding shape'});
            } else {
                res.json(shape);
            }
        });
    }
    // update: function(req, res) {

    // },
    //delete: function(req, res) {

    //}
};