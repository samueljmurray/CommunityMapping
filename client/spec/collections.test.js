/**
 * collections.test.js
 *
 * Test specification for the client app collections
 */

/* Includes */
var MapCollection = require('../src/collections/maps.js');

/* Tests */
describe('MapCollection', function() {

	var mapCollection = new MapCollection();
	it('should have the correct API URL', function() {
		expect(mapCollection.url).toEqual('/api/map/index');
	});

});