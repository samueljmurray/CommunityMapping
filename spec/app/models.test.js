/* jshint -W030 */
/**
 * models.test.js
 *
 * Test specification for the Express app models
 */

/* Includes */
var models = require('../../app/models');

/* Tests */
describe('Models', function() {

    // Map model
    describe('Map', function() {
        var schema = models.Map.schema.paths;

        it('should exist', function() {
            expect(models.Map).to.exist;
        });

        it('should have a _id string', function() {
            expect(schema._id).to.exist;
            expect(schema._id.instance).to.equal('ObjectID');
        });

        it('should have a name string', function() {
            expect(schema.name).to.exist;
            expect(schema.name.instance).to.equal('String');
        });

        it('should have a coordiates object', function() {
            expect(schema['coordinates.sw.lat']).to.exist;
            expect(schema['coordinates.sw.lat'].instance).to.equal('String');
            expect(schema['coordinates.sw.lng']).to.exist;
            expect(schema['coordinates.sw.lng'].instance).to.equal('String');
            expect(schema['coordinates.ne.lat']).to.exist;
            expect(schema['coordinates.ne.lat'].instance).to.equal('String');
            expect(schema['coordinates.ne.lng']).to.exist;
            expect(schema['coordinates.ne.lng'].instance).to.equal('String');
        });

        it('should have a canvas Id ObjectId', function() {
            expect(schema.canvasId).to.exist;
            expect(schema.canvasId.instance).to.equal('ObjectID');
        });

        it('should have a style object', function() {
            expect(schema.style).to.exist;
            expect(schema.style.instance).to.equal('String');
        });
    });

    // Canvas model
    describe('Canvas', function() {
        var schema = models.Canvas.schema.paths;

        it('should exist', function() {
            expect(models.Canvas).to.exist;
        });

        it('should have a _id string', function() {
            expect(schema._id).to.exist;
            expect(schema._id.instance).to.equal('ObjectID');
        });

        it('should have a shapes array of ids', function() {
            expect(schema.shapes).to.exist;
            expect(schema.shapes.caster.instance).to.equal('ObjectID');
        });

        it('should have a stories array of ids', function() {
            expect(schema.stories).to.exist;
            expect(schema.stories.caster.instance).to.equal('ObjectID');
        });

    });

    // Shape model
    describe('Shape', function() {
        var schema = models.Shape.schema.paths;

        it('should exist', function() {
            expect(models.Shape).to.exist;
        });

        it('should have a _id string', function() {
            expect(schema._id).to.exist;
            expect(schema._id.instance).to.equal('ObjectID');
        });

        it('should have a data object', function() {
            expect(schema['data.order']).to.exist;
            expect(schema['data.order'].instance).to.equal('Number');
            expect(schema['data.tailSize']).to.exist;
            expect(schema['data.tailSize'].instance).to.equal('Number');
            expect(schema['data.points']).to.exist;
        });

        it('should have a timestamp date', function() {
            expect(schema.timestamp).to.exist;
        });

    });

    // Story model
    describe('Story', function() {
        var schema = models.Story.schema.paths;

        it('should exist', function() {
            expect(models.Story).to.exist;
        });

        it('should have a _id string', function() {
            expect(schema._id).to.exist;
            expect(schema._id.instance).to.equal('ObjectID');
        });

        it('should have a title string', function() {
            expect(schema.title).to.exist;
            expect(schema.title.instance).to.equal('String');
        });

        it('should have a story string', function() {
            expect(schema.story).to.exist;
            expect(schema.story.instance).to.equal('String');
        });

        it('should have a timestamp date', function() {
            expect(schema.timestamp).to.exist;
        });

        it('should have a coordinates object', function() {
            expect(schema['coordinates.lat']).to.exist;
            expect(schema['coordinates.lat'].instance).to.equal('String');
            expect(schema['coordinates.lng']).to.exist;
            expect(schema['coordinates.lng'].instance).to.equal('String');
        });
    });
});
