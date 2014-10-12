/* jshint -W030 */
/**
 * map.test.js
 *
 * Test specification for the Express app map view controller
 */

/* Includes */
var proxyquire = require('proxyquire'),
    modelsStub = {},
    map = proxyquire('../../controllers/map', {
    	'../app/models': modelsStub
    });

var res = {},
	req = {};

/* Tests */
describe('Map Controller', function() {

	// Setup
	beforeEach(function() {
		res = {
			json: sinon.spy(),
			send: sinon.spy()
		};

		modelsStub.Map = {
			find: function(query, fields, options, callback) {
				callback(null, {});
			},
			findOne: function(query, callback) {
				callback(null, {});
			},
			save: function(err, callback) {
				callback(null, req.body);
			}
		};
	});

	// Controller exists
	it('should exist', function() {
		expect(map).to.exist;
	});

	// Index
	describe('index', function() {

		beforeEach(function() {
			req = {
				params: {
					page: 1,
					max: undefined
				}
			};
		});

		it('should be defined', function() {
			expect(map.index).to.be.a('function');
		});

		it('should return json', function() {
			map.index(req, res);
			expect(res.json).calledOnce;
		});

	});

	// Get ID
	describe('getById', function() {

		beforeEach(function() {
			req = {
				params: {
					id: 1234
				}
			};
		});

		it('should be defined', function() {
			expect(map.getById).to.be.a('function');
		});

		it('should return json on success', function() {
			map.getById(req, res);
			expect(res.json).calledOnce;
		});

		it('should return 404 when map not found', function() {
			modelsStub.Map = {
				findOne: function(query, callback) {
					callback({
						name: 'CastError',
						type: 'ObjectId'
					}, null)
				}
			};
			map.getById(req, res);
			expect(res.send).calledWith(404);
		});

		it('should return 500 on other error', function() {
			modelsStub.Map = {
				findOne: function(query, callback) {
					callback({}, null)
				}
			};
			map.getById(req, res);
			expect(res.send).calledWith(500);
		});

	});

	// Add
	describe('add', function() {

		beforeEach(function() {
			req.body = {
				name: 'A title, lorem ipsum...',
				coordinates: {
					lat: 86.839,
					lng: 20.301
				},
				style: '{ ... }'
			};
		});

		it('should exist', function() {
			expect(map.add).to.be.a('function');
		});

		it('should return json on save', function() {
			modelsStub.Map = sinon.spy(function() {
				modelsStub.Map.prototype.save = function(callback) {
					callback(null, req.body);
					return;
				}
			});
			map.add(req, res);
			expect(res.json).calledWith(req.body);
		});

		it('should return json error on error', function() {
			modelsStub.Map = sinon.spy(function() {
				modelsStub.Map.prototype.save = function(callback) {
					callback({}, req.body);
				}
			});
			map.add(req, res);
			expect(res.json).calledWith({err: 'Error adding map'})
		});

	});

});