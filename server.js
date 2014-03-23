var express = require('express'),
    http = require('http'),
    path = require('path'),
    utils = require('./utils'),
    routes = require('./app/routes'),
    exphbs = require('express3-handlebars'),
    mongoose = require('mongoose'),
    app = express();

app.set('port', process.env.PORT || 3300);
app.set('views', __dirname + '/views');
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: app.get('views') + '/layouts'
}));
app.set('view engine', 'handlebars');

app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('potato-eleven-origin-delta'));
app.use(app.router);
app.use('/', express.static(path.join(__dirname, 'public')));

// DEV
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

// DB connect
mongoose.connect('mongodb://localhost/CommunityMapping');
mongoose.connection.on('open', function() {
    utils.log.info("Connected to Mongoose");
});

// Routes
routes.initialize(app);

// Start server
http.createServer(app).listen(app.get('port'), function() {
    utils.log.info('Server up: http://localhost:' + app.get('port'));
});