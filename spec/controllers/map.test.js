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
			find: function(query, callback) {
				callback(null, map);
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
			expect(res.json).calledWith(map);
		});

		it('should return json error on error', function() {
			modelsStub.Map = {
				find: function(query, callback) {
					callback(null, {err: 'Map not found'})
				}
			};
			map.getById(req, res);
			expect(res.json).calledWith({err: 'Map not found'})
		});

	});

});