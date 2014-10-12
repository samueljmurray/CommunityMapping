/**
 * server.js
 *
 * Main app file
 */

/* Includes */
var express = require('express'),
    http = require('http'),
    path = require('path'),
    utils = require('./utils'),
    seeder = require('./app/seeder'),
    routes = require('./app/routes'),
    exphbs = require('express3-handlebars'),
    mongoose = require('mongoose'),
    app = express();

// Set port on which to serve the app
app.set('port', process.env.PORT || 3300);

// Set the views directory
app.set('views', __dirname + '/views');

// Set handlebars as the view engine
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: app.get('views')
}));
app.set('view engine', 'handlebars');

// Set middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('potato-eleven-origin-delta'));
app.use(app.router);
app.use('/', express.static(path.join(__dirname, 'public')));

// DEV
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
    app.use(express.logger('dev'));
}

// DB connection
mongoose.connect('mongodb://localhost/CommunityMapping');
mongoose.connection.on('open', function() {
    utils.log.info("Connected to Mongoose");

    // Seeder disabled because not currently designed
    // to work with bounding coordinates
    // @TODO Modify seeder.js and re-enable here
    // seeder.check();
});

// Routes
routes.initialize(app);

// Start server
http.createServer(app).listen(app.get('port'), function() {
    utils.log.info('Server up: http://localhost:' + app.get('port'));
});