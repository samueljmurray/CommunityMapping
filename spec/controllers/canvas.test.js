/* jshint -W030 */
var proxyquire = require('proxyquire'),
    modelsStub = {},
    canvas = proxyquire('../../controllers/canvas', {
    	'../app/models': modelsStub
    });

var res = {},
	req = {};

describe('Canvas Controller', function() {

	// Setup
	beforeEach(function() {
		res = {
			json: sinon.spy()
		};

		modelsStub.Canvas = {
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
		expect(canvas).to.exist;
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
			expect(canvas.index).to.be.a('function');
		});

		it('should return json', function() {
			canvas.index(req,res);
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
			expect(canvas.getById).to.be.a('function');
		});

		it('should return json on success', function() {
			canvas.getById(req, res);
			expect(res.json).calledOnce;
		});

		it('should return json error on error', function() {
			modelsStub.Canvas = {
				findOne: function(query, callback) {
					callback(null, {err: 'Canvas not found'})
				}
			};
			canvas.getById(req, res);
			expect(res.json).calledWith({err: 'Canvas not found'})
		});

	});

});