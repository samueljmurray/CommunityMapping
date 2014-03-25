var Backbone = require('backbone');

module.exports = MapModel = Backbone.Model.extend({
    idAttribute: '_id',
    urlRoot: 'api/map'
});