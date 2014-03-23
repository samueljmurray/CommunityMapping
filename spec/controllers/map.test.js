/* jshint -W030 */
var proxyquire = require('proxyquire'),
    modelsStub = {},
    map = proxyquire('../../controllers/map', {
    	'../app/models': modelsStub
    });

var res = {},
	req = {};

describe('Map Controller', function() {

	// Setup
	beforeEach(function() {
		res = {
			json: sinon.spy()
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

		it('should return json error on error', function() {
			modelsStub.Map = {
				findOne: function(query, callback) {
					callback(null, {err: 'Map not found'})
				}
			};
			map.getById(req, res);
			expect(res.json).calledWith({err: 'Map not found'})
		});

	});

});