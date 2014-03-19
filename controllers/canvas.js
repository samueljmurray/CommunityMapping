var models = require('../app/models');

module.exports = {
	//index: function(req, res) {

    //},
    getById: function(req, res) {
        models.Canvas.find({ _id: req.params.id }, function(err, map) {
            if (err) {
                res.json({err: 'Canvas not found'});
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