/* jshint -W030 */
var models = require('../../app/models');

describe('Models', function() {

    describe('Map', function() {
        var schema = models.Map.schema.paths;

        it('should exist', function() {
            expect(models.Map).to.exist;
        });

        it('should have a _id string', function() {
            expect(schema._id).to.exist;
            expect(schema._id.instance).to.equal('ObjectID');
        });

        it('should have a coordiates object', function() {
            expect(schema['coordinates.lat']).to.exist;
            expect(schema['coordinates.lat'].instance).to.equal('String');
            expect(schema['coordinates.lng']).to.exist;
            expect(schema['coordinates.lng'].instance).to.equal('String');
        });

        it('should have a canvas ID string', function() {
            expect(schema.canvasID).to.exist;
            expect(schema.canvasID.instance).to.equal('String');
        });

        it('should have a style object', function() {
            expect(schema['style.bgcolor']).to.exist;
            expect(schema['style.bgcolor'].instance).to.equal('String');
            expect(schema['style.fgcolor']).to.exist;
            expect(schema['style.fgcolor'].instance).to.equal('String');
        });
    });

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

    });

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

    describe('StoryBoard', function() {
        var schema = models.Storyboard.schema.paths;

        it('should exist', function() {
            expect(models.Storyboard).to.exist;
        });

        it('should have a _id string', function() {
            expect(schema._id).to.exist;
            expect(schema._id.instance).to.equal('ObjectID');
        });

        it('should have a name string', function() {
            expect(schema.name).to.exist;
            expect(schema.name.instance).to.equal('String');
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
