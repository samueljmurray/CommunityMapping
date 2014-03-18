var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Map = new Schema({
    _id: Schema.ObjectId,
    coordinates: {
        lat: String,
        lng: String
    },
    canvasID: String,
    style: {
        bgcolor: String,
        fgcolor: String
    }
});

var Canvas = new Schema({
    _id: Schema.ObjectId,
    shapes: { type: [Schema.ObjectId], default: [] },
    stories: { type: [Schema.ObjectId], default: [] }
});

var Shape = new Schema({
    _id: Schema.ObjectId,
    data: {
        order: Number,
        tailSize: Number,
        points: [{
            x: Number,
            y: Number,
            size: Number,
            color: String
        }]
    },
    timestamp: { type: Date, 'default': Date.now }
});

var Story = new Schema({
    _id: Schema.ObjectId,
    name: String,
    story: String,
    timestamp: { type: Date, 'default': Date.now },
    coordinates: {
        lat: String,
        lng: String
    }
});

module.exports = {
    Map: mongoose.model('Map', Map),
    Canvas: mongoose.model('Canvas', Canvas),
    Shape: mongoose.model('Shape', Shape),
    Story: mongoose.model('Story', Story)
};
