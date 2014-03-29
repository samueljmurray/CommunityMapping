var mongoose = require('mongoose'),
    models = require('./models'),
    utils = require('../utils');

module.exports = {
    check: function() {
        models.Map.find({}, function(err, maps) {
            if (maps.length === 0) {
                utils.log.info('Seeding database...')

                // Story 1
                var story1 = new models.Story({
                    title: 'Story 1 title, lorem ipsum...',
                    story: 'Story 1 story lorem ipsum...',
                    coordinates: {
                        lat: 86.839,
                        lng: 20.301
                    }
                });

                // Story 2
                var story2 = new models.Story({
                    title: 'Story 2 title, lorem ipsum...',
                    story: 'Story 2 story lorem ipsum...',
                    coordinates: {
                        lat: 86.839,
                        lng: 20.301
                    }
                });

                // Shape 1
                var shape1 = new models.Shape({
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
                    }
                });

                // Shape 2
                var shape2 = new models.Shape({
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
                    }
                });

                story1.save(function(err, story) {
                    var story1Id = story._id;
                    utils.log.info('Successfully inserted story: ' + story1Id);

                    story2.save(function(err, story) {
                        var story2Id = story._id;
                        utils.log.info('Successfully inserted story: ' + story2Id);

                        shape1.save(function(err, shape) {
                            var shape1Id = shape._id;
                            utils.log.info('Successfully inserted shape: ' + shape1Id);

                            shape2.save(function(err, shape) {
                                var shape2Id = shape._id;
                                utils.log.info('Successfully inserted shape: ' + shape2Id);

                                // Canvas1
                                var canvas1 = new models.Canvas({
                                    shapes: [ shape1Id, shape2Id ],
                                    stories: [ story1Id, story2Id ]
                                });

                                canvas1.save(function(err, canvas) {
                                    canvas1Id = canvas._id;
                                    utils.log.info('Successfully inserted canvas: ' + canvas1Id);

                                    // Canvas2
                                    var canvas2 = new models.Canvas({
                                        shapes: [ shape1Id ],
                                        stories: [ story2Id ]
                                    });

                                    canvas2.save(function(err, canvas) {
                                        canvas2Id = canvas._id;
                                        utils.log.info('Successfully inserted canvas: ' + canvas2Id);

                                        // Map1
                                        var map1 = new models.Map({
                                            name: 'Near Wollongong',
                                            coordinates: {
                                                lat: -34.397,
                                                lng: 150.644
                                            },
                                            canvasId: canvas1Id,
                                            style: {
                                                bgcolor: '#FF0000',
                                                fgcolor: '#00FF00'
                                            }
                                        });

                                        map1.save(function(err, map) {
                                            utils.log.info('Successfully inserted map: ' + map1._id);

                                            // Map2
                                            var map2 = new models.Map({
                                                name: 'Brighton',
                                                coordinates: {
                                                    lat: 50.82253,
                                                    lng: -0.13716
                                                },
                                                canvasId: canvas2Id,
                                                style: {
                                                    bgcolor: '#FF0000',
                                                    fgcolor: '#00FF00'
                                                }
                                            });

                                            map2.save(function(err, map) {
                                                utils.log.info('Successfully inserted map: ' + map2._id);
                                            });
                                        });

                                    });

                                });

                            });

                        });

                    });

                });

            }

        });

    }

};
