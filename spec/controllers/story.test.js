/* jshint -W030 */
var proxyquire = require('proxyquire'),
	modelsStub = {},
	story = proxyquire('../../controllers/story', {
		'../app/models': modelsStub
	});

var res = {},
	req = {};

describe('Story Controller', function() {

	// Setup
	beforeEach(function() {
		res = {
			json: sinon.spy()
		};

		modelsStub.Story = {
			find: function(query, fields, options, callback) {
				callback(null, story);
			},
			findOne: function(query, callback) {
				callback(null, story);
			},
			save: function(err, callback) {
				callback(null ,req.body);
			}
		};
	});

	// Controller exists
	it('should exist', function() {
		expect(story).to.exist;
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

		it('should exist', function() {
			expect(story.index).to.be.a('function');
		});

		it('should return json', function() {
			story.index(req, res);
			expect(res.json).calledOnce;
		});

	});

	// GetById
	describe('getById', function() {

		beforeEach(function() {
			req = {
				params: {
					id: 1234
				}
			};
		});

		it('should exist', function() {
			expect(story.getById).to.be.a('function');
		});

		it('should return json', function() {
			story.getById(req, res);
			expect(res.json).calledWith(story);
		});

		it('should return json error on error', function() {
			modelsStub.Story = {
				findOne: function(query, callback) {
					callback({err: 'Story not found'});
				}
			};
			story.getById(req, res);
			expect(res.json).calledWith({err: 'Story not found'});
		});

	});

	// GetBySpacerange
	describe('getBySpacerange', function() {

		beforeEach(function() {
			req = {
				params: {
					lat1: 87.238,
					lng1: -20.449,
					lat2: 86.199,
					lng2: -20.264,
					page: 1,
					max: undefined
				}
			};
		});

		it('should exist', function() {
			expect(story.getBySpacerange).to.be.a('function');
		});

		it('should return json', function() {
			story.getBySpacerange(req, res);
			expect(res.json).calledWith(story);
		});

	});

	// Add
	describe('add', function() {

		beforeEach(function() {
			req.body = {
				title: 'A title, lorem ipsum...',
				story: 'A story lorem ipsum...',
				timestamp: 1395306034983,
				coordinates: {
					lat: 86.839,
					lng: 20.301
				}
			};
		});

		it('should exist', function() {
			expect(story.add).to.be.a('function');
		});

		it('should return json on save', function() {
			modelsStub.Story = sinon.spy(function() {
				modelsStub.Story.prototype.save = function(callback) {
					callback(null, req.body);
					return;
				}
			});
			story.add(req, res);
			expect(res.json).calledWith(req.body);
		});

		it('should return json error on error', function() {
			modelsStub.Story = sinon.spy(function() {
				modelsStub.Story.prototype.save = function(callback) {
					callback({}, req.body);
				}
			});
			story.add(req, res);
			expect(res.json).calledWith({err: 'Error adding story'})
		});

	});

});