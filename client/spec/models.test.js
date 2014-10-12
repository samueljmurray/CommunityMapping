/**
 * models.test.js
 *
 * Test specification for the client app models
 */

/* Includes */
var MapModel = require('../src/models/map'),
	CanvasModel = require('../src/models/canvas');

/* Tests */
describe('Map Model', function() {

	var map = new MapModel();
	it('should have the correct URL root', function() {
		expect(map.urlRoot).toEqual('api/map');
	});

	var canvas = new CanvasModel();
	it('should have the correct URL root', function() {
		expect(canvas.urlRoot).toEqual('api/canvas');
	});

});