var models = require('../app/models'),
    utils = require('../utils');

module.exports = {
    getById: function(req, res) {
        models.Canvas.findOne({ _id: req.params.id }, function(err, canvas) {
            if (err) {
                if (err.name === 'CastError' && err.type === 'ObjectId') {
                    utils.log.warn('Canvas.getById 404', err.message, err);
                    res.send(404);
                } else {
                    utils.log.error('Canvas.getById 500', err.message, err);
                    res.send(500);
                }
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