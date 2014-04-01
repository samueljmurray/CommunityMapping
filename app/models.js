var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Map = new Schema({
    timestamp: { type: Date, 'default': Date.now },
    name: String,
    coordinates: {
        lat: String,
        lng: String
    },
    canvasId: Schema.ObjectId,
    style: String
});

var Canvas = new Schema({
    shapes: { type: [Schema.ObjectId], default: [] },
    stories: { type: [Schema.ObjectId], default: [] }
});

var Shape = new Schema({
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
    title: String,
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
