/* jshint -W030 */
var proxyquire = require('proxyquire'),
    modelsStub = {},
    shape = proxyquire('../../controllers/shape', {
    	'../app/models': modelsStub
    });

var res = {},
	req = {};

describe('Shape Controller', function() {

	// Setup
	beforeEach(function() {
		res = {
			json: sinon.spy()
		};

		modelsStub.Shape = {
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
		expect(shape).to.exist;
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
			expect(shape.index).to.be.a('function');
		});

		it('should return json', function() {
			shape.index(req,res);
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
			expect(shape.getById).to.be.a('function');
		});

		it('should return json on success', function() {
			shape.getById(req, res);
			expect(res.json).calledOnce;
		});

		it('should return json error on error', function() {
			modelsStub.Shape = {
				findOne: function(query, callback) {
					callback(null, {err: 'Shape not found'})
				}
			};
			shape.getById(req, res);
			expect(res.json).calledWith({err: 'Shape not found'})
		});

	});

	describe('getByTimerange', function() {

		beforeEach(function() {
			req = {
				params: {
					start: 1395306023878,
					end: 1395306034983,
					page: 1,
					max: undefined
				}
			};
		});

		it('should be defined', function() {
			expect(shape.getByTimerange).to.be.a('function');
		});

		it('should return json on success', function() {
			shape.getByTimerange(req, res);
			expect(res.json).calledOnce;
		});

	});

	describe('add', function() {

		beforeEach(function() {
			req.body = {
				data: {
					order: 1,
			        tailSize: 2,
			        points: [{
			            x: 3,
			            y: 4,
			            size: 5,
			            color: '#000000'
			        }, {
			            x: 6,
			            y: 7,
			            size: 8,
			            color: '#A3E7F2'
			        }, {
			            x: 9,
			            y: 10,
			            size: 11,
			            color: '#FF0000'
			        }]
				},
				timestamp: 1395306034983
			};
		});

		it('should be defined', function() {
			expect(shape.add).to.be.a('function');
		});

		it('should return json on save', function() {

			modelsStub.Shape = sinon.spy(function() {
                modelsStub.Shape.prototype.save = function(callback) {
                    callback(null, req.body);
                };
                return;
            });

            shape.add(req, res);
            expect(res.json).calledWith(req.body);

		});

		it('should return error on failed save', function() {

			modelsStub.Shape = sinon.spy(function() {
                modelsStub.Shape.prototype.save = function(callback) {
                    callback({}, req.body);
                };
                return;
            });

            shape.add(req, res);
            expect(res.json).calledWith({err: 'Error adding shape'});

		});

	});

});