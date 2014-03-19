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

		req = {
			params: {
				id: 1234
			}
		};

		modelsStub.Canvas = {
			find: function(query, callback) {
				callback(null, canvas);
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

	// Get ID

	describe('getById', function() {

		it('should be defined', function() {
			expect(canvas.getById).to.be.a('function');
		});

		it('should return json on success', function() {
			canvas.getById(req, res);
			expect(res.json).calledWith(canvas);
		});

		it('should return json error on error', function() {
			modelsStub.Canvas = {
				find: function(query, callback) {
					callback(null, {err: 'Canvas not found'})
				}
			};
			canvas.getById(req, res);
			expect(res.json).calledWith({err: 'Canvas not found'})
		});

	});

});