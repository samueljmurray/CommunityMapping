/**
 * models.js
 *
 * Defines the data models for the Express app
 */

/* Includes */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

/* Models */

// MAP Model
// Describes a single map project
// - Timestamp: the date/time that the Map was created
// - Name: human-readable name for the Map
// - Coordinates: The bounding box coordinates of the map.
//   The latitude and longitude of the South-West and
//   North-East corners of the map.
// - canvasId: the ID of the canvas which will be overlaid on the map.
//   @TODO: make this a multi-value field so that multiple map overlays are supported
var Map = new Schema({
    timestamp: { type: Date, 'default': Date.now },
    name: String,
    coordinates: {
        sw: {
            lat: String,
            lng: String
        },
        ne: {
            lat: String,
            lng: String
        }
    },
    canvasId: Schema.ObjectId
});

// CANVAS Model
// Describes a single Canvas which is overlaid on a Map
// - Shapes: an array of Shape objects to be drawn onto the Canvas
// - Stories: an array of Story objects to be placed onto the Canvas
var Canvas = new Schema({
    shapes: { type: [Schema.ObjectId], default: [] },
    stories: { type: [Schema.ObjectId], default: [] }
});

// SHAPE Model
// Describes a single Shape that has been drawn onto a Canvas
// - Data: information about a Shape that is exported by the
//   LiterallyCanvas.js library (http://literallycanvas.com/api/index.html)
// - Timestamp: the date/time that the Shape was created
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

// STORY Model
// Describes a single Story that has been placed onto a Canvas
// - Title: the title of the Story
// - Story: the main body of the Story
// - Timestamp: the data/time that the Story was created
// - Coordinates: the position on the Canvas at which the Story was pinned
var Story = new Schema({
    title: String,
    story: String,
    timestamp: { type: Date, 'default': Date.now },
    coordinates: {
        lat: String,
        lng: String
    }
});

/* Exports */
module.exports = {
    Map: mongoose.model('Map', Map),
    Canvas: mongoose.model('Canvas', Canvas),
    Shape: mongoose.model('Shape', Shape),
    Story: mongoose.model('Story', Story)
};
