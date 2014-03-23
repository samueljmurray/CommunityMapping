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

        models.Canvas.find({}, null, options, function(err, canvases) {
            res.json(canvases);
        });
    },
    getById: function(req, res) {
        models.Canvas.findOne({ _id: req.params.id }, function(err, canvas) {
            if (err) {
                res.json({err: 'Canvas not found'});
            } else {
                res.json(canvas);
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