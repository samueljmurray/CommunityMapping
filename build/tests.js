;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var App = require('../src/app.js'),
    Marionette = require('backbone.marionette');

describe('App', function() {
    var app = new App();
    it('should have a start function', function() {
        expect(app.start).toBeDefined();
    });

    describe('app.start', function() {
        beforeEach(function() {
            app.start();
        });

        it('should define a core Marionette application', function() {
            var marionetteApp = new Marionette.Application();
            expect(typeof(App.core)).toEqual(typeof(marionetteApp));
        });

        it('should have a views object', function() {
            expect(App.views).toBeDefined();
        });

        it('should have a data object', function() {
            expect(App.data).toBeDefined();
        });
    });
});
},{"../src/app.js":2}],2:[function(require,module,exports){
var Marionette = require('backbone.marionette'),
	utils = require('./utils'),
    Controller = require('./controller'),
    Router = require('./router'),
    MapModel = require('./models/map'),
    MapCollection = require('./collections/maps');

// Define and export App
module.exports = App = function App() {};

App.prototype.start = function() {
	App.core = new Marionette.Application();

	App.core.on("initialize:before", function (options) {
        utils.log.info('App: Initializing');

        App.views = {};
        App.data = {};

        // Load maps
        var maps = new MapsCollection();
        maps.fetch({
            success: function() {
                App.data.maps = maps;
                App.core.vent.trigger('app:start');
            }
        });

    });

    App.core.vent.bind('app:start', function(options){
        utils.log.info('App: Starting');
        if (Backbone.history) {
            App.controller = new Controller();
            App.router = new Router({ controller: App.controller });
            utils.log.info('App: Backbone.history starting');
            Backbone.history.start();
        } else {
            utils.log.error('Backbone.history not defined');
        }

        //new up and views and render for base app here...
        utils.log.info('App: Done starting and running!');
    });

    App.core.start();
};
},{"./collections/maps":3,"./controller":4,"./models/map":5,"./router":6,"./utils":7}],3:[function(require,module,exports){
var Backbone = require('backbone'),
    ContactModel = require('../models/map');

module.exports = MapsCollection = Backbone.Collection.extend({
	initialize: function(page) {
		this.url = '/api/map/index';
	},
	model: MapModel
});
},{"../models/map":5}],4:[function(require,module,exports){
var Backbone = require('backbone'),
	Marionette = require('backbone.marionette'),
    utils = require('./utils'),
    NotFoundView = require('./views/notfound'),
    HomeView = require('./views/home'),
    MapsView = require('./views/maps'),
    MapAddView = require('./views/mapadd');

module.exports = Controller = Marionette.Controller.extend({
    initialize: function() {
        utils.log.info('Controller: Initializing');
        window.App.views.homeView = new HomeView();
    },
    home: function() {
        var view = window.App.views.homeView;
        this.renderView(view);
        // Ensure the URL is correct
        window.App.router.navigate('#/');
    },
    mapIndex: function(page) {
    	if (!page) {
    		page = '1';
    	}
        var view = null;
        window.App.controller.page = page;

        // Get map range
        var start = (parseInt(page) - 1) * utils.mapIndexLength;
        var end = start + utils.mapIndexLength;
        var maps = new Backbone.Collection(window.App.data.maps.slice(start, end));

        if (maps.length  > 0) {
            view = new MapsView({ collection: maps});
        } else {
            view = new NotFoundView();
        }
        this.renderView(view);
        window.App.router.navigate('#/map/' + page);
    },
    mapInteract: function(id) {

    },
    mapView: function(id) {

    },
    mapTimeline: function(id) {

    },
    mapEdit: function(id) {

    },
    mapAdd: function() {
    	var view = new MapAddView();
    	this.renderView(view);
        window.App.router.navigate('#/map/add');
    },
    renderView: function(view) {
        this.destroyCurrentView(view);
        $('#communitymapping-container').html(view.render().el);
    },
    destroyCurrentView: function(view) {
    	if (!_.isUndefined(window.App.views.currentView)) {
            window.App.views.currentView.close();
        }
        window.App.views.currentView = view;
    }
});
},{"./utils":7,"./views/home":8,"./views/mapadd":9,"./views/maps":10,"./views/notfound":11}],5:[function(require,module,exports){
var Backbone = require('backbone');

module.exports = MapModel = Backbone.Model.extend({
    idAttribute: '_id',
    urlRoot: 'api/map'
});
},{}],6:[function(require,module,exports){
var Marionette = require('backbone.marionette');

module.exports = Router = Marionette.AppRouter.extend({
    appRoutes: {
        ''  : 'home',
        'map/interact/:id' : 'mapInteract',
        'map/view/:id' : 'mapView',
        'map/timeline/:id' : 'mapTimeline',
        'map/edit/:id' : 'mapEdit',
        'map/add' : 'mapAdd',
        'map' : 'mapIndex',
        'map/:page' : 'mapIndex'
    }
});

},{}],7:[function(require,module,exports){
module.exports = {
	log: {
		info: function(msg) {
			console.log('INFO ' + msg);
		},
		warn: function(msg) {
			console.log('WARN ' + msg);
		},
		error: function(msg) {
			console.log('ERROR ' + msg);
		}
	},
	mapIndexLength: 1
};
},{}],8:[function(require,module,exports){
var Marionette = require('backbone.marionette');

module.exports = HomeView = Marionette.ItemView.extend({
	template: require('../../templates/home.hbs')
});
},{"../../templates/home.hbs":12}],9:[function(require,module,exports){
var Marionette = require('backbone.marionette'),
    utils = require('../utils');

module.exports = ItemView = Marionette.ItemView.extend({
    template: require('../../templates/map_add.hbs'),
    tagName: 'div',
    className: 'container',
    // Submit click
    //events: {
    //    'click': 'showDetails'
    //},

    onRender: function(el) {
        console.log('ehllo');
    }
});
},{"../../templates/map_add.hbs":13,"../utils":7}],10:[function(require,module,exports){
var Marionette = require('backbone.marionette'),
    utils = require('../utils');

var itemView = Marionette.ItemView.extend({
    template: require('../../templates/map_small.hbs'),
    tagName: 'div',
    className: 'col-sm-6 col-md-4 map-small-item',
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
    },
    //events: {
    //    'click': 'showDetails'
    //},

    onRender: function(el) {
        // Temporarily add the map to the DOM so that it can be sized properly
        $(el.el).addClass('temp-render');
        $('body').append($(el.el));
        
        var mapOptions = {
          center: new google.maps.LatLng(el.model.attributes.coordinates.lat, el.model.attributes.coordinates.lng),
          zoom: 14
        };
        var map = new google.maps.Map($(el.el).find(".map-canvas")[0],
            mapOptions);

        $(el.el).remove();
        $(el.el).removeClass('temp-render');
    }
});

module.exports = CompositeView = Marionette.CompositeView.extend({
    template: require('../../templates/map_index.hbs'),
    tagName: 'div',
    className: 'container',
    initialize: function() {
        this.listenTo(this.collection, 'change', this.render);
    },

    onRender: function(el) {
        var page = window.App.controller.page;
        if (page === '1') {
            $(el.el).find('.pagination-btn-group .prev').addClass('disabled');
        } else {
            $(el.el).find('.pagination-btn-group .prev').attr('href', '#/map/' + (parseInt(page, 10) - 1));
        }

        var remaining = window.App.data.maps.length - (page * utils.mapIndexLength);
        if (remaining < 1) {
            $(el.el).find('.pagination-btn-group .next').addClass('disabled');
        } else {
            $(el.el).find('.pagination-btn-group .next').attr('href', '#/map/' + (parseInt(page, 10) + 1));
        }
    },
    itemView: itemView,
    itemViewContainer: '.map-index-item-container'
});
},{"../../templates/map_index.hbs":14,"../../templates/map_small.hbs":15,"../utils":7}],11:[function(require,module,exports){
var Marionette = require('backbone.marionette');

module.exports = NotFoundView = Marionette.ItemView.extend({
    template: require('../../templates/not_found.hbs'),
    tagName: 'div',
    className: 'container'
});
},{"../../templates/not_found.hbs":16}],12:[function(require,module,exports){
// hbsfy compiled Handlebars template
var Handlebars = require('hbsfy/runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"admin-container\">\n	<h1 id=\"logo\">Community Mapping</h1>\n	<h2>API</h2>\n		<h3>Map</h3>\n		<dl>\n			<dt><strong>(GET) Index:</strong> Get all maps</dt>\n			<dd class=\"code\">/api/map/index/&lt;<em>page</em>&gt;[/&lt;<em>max</em>&gt;]</dd>\n\n			<dt><strong>(GET) Get by ID:</strong> Get a single map by its ID number</dt>\n			<dd class=\"code\">/api/map/&lt;<em>id</em>&gt;</dd>\n		</dl>\n\n		<h3>Canvas</h3>\n		<dl>\n			<dt><strong>(GET) Index:</strong> Get all canvases</dt>\n			<dd class=\"code\">/api/canvas/index/&lt;<em>page</em>&gt;[/&lt;<em>max</em>&gt;]</dd>\n\n			<dt><strong>(GET) Get by ID:</strong> Get a single canvas by its ID number</dt>\n			<dd class=\"code\">/api/canvas/&lt;<em>id</em>&gt;</dd>\n		</dl>\n\n		<h3>Shape</h3>\n		<dl>\n			<dt><strong>(GET) Index:</strong> Get all shapes</dt>\n			<dd class=\"code\">/api/shape/index/&lt;<em>page</em>&gt;[/&lt;<em>max</em>&gt;]</dd>\n\n			<dt><strong>(GET) Get by ID:</strong> Get a single shape by its ID number</dt>\n			<dd class=\"code\">/api/shape/&lt;<em>id</em>&gt;</dd>\n\n			<dt><strong>(GET) Get by timerange:</strong> Get all shapes created between a given timerange</dt>\n			<dd class=\"code\">/api/shape/timerange/&lt;<em>start</em>&gt;/&lt;<em>end</em>&gt;/&lt;<em>page</em>&gt;[/&lt;<em>max</em>&gt;]</dd>\n\n			<dt><strong>(POST) Add:</strong> Add a shape</dt>\n			<dd class=\"code\">/api/shape</dd>\n		</dl>\n\n		<h3>Story</h3>\n		<dl>\n			<dt><strong>(GET) Index:</strong> Get all stories</dt>\n			<dd class=\"code\">/api/story/index/&lt;<em>page</em>&gt;[/&lt;<em>max</em>&gt;]</dd>\n\n			<dt><strong>(GET) Get by ID:</strong> Get a single story by its ID number</dt>\n			<dd class=\"code\">/api/story/&lt;<em>id</em>&gt;</dd>\n\n			<dt><strong>(GET) Get by spacerange:</strong> Get all stories with coordinates between a given range</dt>\n			<dd class=\"code\">/api/story/spacerange/&lt;<em>lat1</em>&gt;/&lt;<em>lng1</em>&gt;/&lt;<em>lat2</em>&gt;/&lt;<em>lng2</em>&gt;/&lt;<em>page</em>&gt;[/&lt;<em>max</em>&gt;]</dd>\n\n			<dt><strong>(POST) Add:</strong> Add a story</dt>\n			<dd class=\"code\">/api/story</dd>\n		</dl>\n</div>";
  });

},{"hbsfy/runtime":20}],13:[function(require,module,exports){
// hbsfy compiled Handlebars template
var Handlebars = require('hbsfy/runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"row\">\n	<div class=\"col-sm-12\">\n		<h1>Add Map</h1>\n	</div>\n</div>\n\n<div class=\"row\">\n	<div class=\"col-sm-12\">\n		<form role=\"form\">\n			<div class=\"form-group\">\n				<label for=\"inputName\">Map name</label>\n				<input type=\"email\" class=\"form-control\" id=\"inputName\" placeholder=\"Map name\">\n			</div>\n			<button type=\"submit\" class=\"btn btn-default\">Submit</button>\n		</form>\n	</div>\n</div>";
  });

},{"hbsfy/runtime":20}],14:[function(require,module,exports){
// hbsfy compiled Handlebars template
var Handlebars = require('hbsfy/runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"row\">\n	<div class=\"col-sm-12\">\n		<h1>Maps <a href=\"#/map/add\" class=\"btn btn-default add-map\" role=\"button\">+ Add Map</a></h1>\n	</div>\n</div>\n<div class=\"row map-index-item-container\"></div>\n<div class=\"row\">\n	<div class=\"col-sm-12 pagination-btn-group\">\n		<a href=\"#\" class=\"btn btn-default prev\" role=\"button\">&larr; Prev</a><a href=\"#\" class=\"btn btn-default next\" role=\"button\">Next &rarr;</a>\n	</div>\n</div>";
  });

},{"hbsfy/runtime":20}],15:[function(require,module,exports){
// hbsfy compiled Handlebars template
var Handlebars = require('hbsfy/runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"thumbnail\">\n  <div class=\"map-canvas map-item-small-canvas-";
  if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" style=\"width:100%;height:200px\"></div>\n  <div class=\"caption\">\n    <h3>";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h3>\n    <div class=\"btn-group\">\n    	<a href=\"#/map/view/";
  if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"btn btn-primary\" role=\"button\">View</a>\n    	<a href=\"#/map/interact/";
  if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"btn btn-primary\" role=\"button\">Interact</a>\n    	<a href=\"#/map/timeline/";
  if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"btn btn-primary\" role=\"button\">Timeline</a>\n    	<a href=\"#/map/edit/";
  if (stack1 = helpers._id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0._id; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"btn btn-default\" role=\"button\">Edit</a>\n    </div>\n  </div>\n</div>";
  return buffer;
  });

},{"hbsfy/runtime":20}],16:[function(require,module,exports){
// hbsfy compiled Handlebars template
var Handlebars = require('hbsfy/runtime');
module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<h1>Page not found</h1>";
  });

},{"hbsfy/runtime":20}],17:[function(require,module,exports){
/*jshint eqnull: true */

module.exports.create = function() {

var Handlebars = {};

// BEGIN(BROWSER)

Handlebars.VERSION = "1.0.0";
Handlebars.COMPILER_REVISION = 4;

Handlebars.REVISION_CHANGES = {
  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
  2: '== 1.0.0-rc.3',
  3: '== 1.0.0-rc.4',
  4: '>= 1.0.0'
};

Handlebars.helpers  = {};
Handlebars.partials = {};

var toString = Object.prototype.toString,
    functionType = '[object Function]',
    objectType = '[object Object]';

Handlebars.registerHelper = function(name, fn, inverse) {
  if (toString.call(name) === objectType) {
    if (inverse || fn) { throw new Handlebars.Exception('Arg not supported with multiple helpers'); }
    Handlebars.Utils.extend(this.helpers, name);
  } else {
    if (inverse) { fn.not = inverse; }
    this.helpers[name] = fn;
  }
};

Handlebars.registerPartial = function(name, str) {
  if (toString.call(name) === objectType) {
    Handlebars.Utils.extend(this.partials,  name);
  } else {
    this.partials[name] = str;
  }
};

Handlebars.registerHelper('helperMissing', function(arg) {
  if(arguments.length === 2) {
    return undefined;
  } else {
    throw new Error("Missing helper: '" + arg + "'");
  }
});

Handlebars.registerHelper('blockHelperMissing', function(context, options) {
  var inverse = options.inverse || function() {}, fn = options.fn;

  var type = toString.call(context);

  if(type === functionType) { context = context.call(this); }

  if(context === true) {
    return fn(this);
  } else if(context === false || context == null) {
    return inverse(this);
  } else if(type === "[object Array]") {
    if(context.length > 0) {
      return Handlebars.helpers.each(context, options);
    } else {
      return inverse(this);
    }
  } else {
    return fn(context);
  }
});

Handlebars.K = function() {};

Handlebars.createFrame = Object.create || function(object) {
  Handlebars.K.prototype = object;
  var obj = new Handlebars.K();
  Handlebars.K.prototype = null;
  return obj;
};

Handlebars.logger = {
  DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3, level: 3,

  methodMap: {0: 'debug', 1: 'info', 2: 'warn', 3: 'error'},

  // can be overridden in the host environment
  log: function(level, obj) {
    if (Handlebars.logger.level <= level) {
      var method = Handlebars.logger.methodMap[level];
      if (typeof console !== 'undefined' && console[method]) {
        console[method].call(console, obj);
      }
    }
  }
};

Handlebars.log = function(level, obj) { Handlebars.logger.log(level, obj); };

Handlebars.registerHelper('each', function(context, options) {
  var fn = options.fn, inverse = options.inverse;
  var i = 0, ret = "", data;

  var type = toString.call(context);
  if(type === functionType) { context = context.call(this); }

  if (options.data) {
    data = Handlebars.createFrame(options.data);
  }

  if(context && typeof context === 'object') {
    if(context instanceof Array){
      for(var j = context.length; i<j; i++) {
        if (data) { data.index = i; }
        ret = ret + fn(context[i], { data: data });
      }
    } else {
      for(var key in context) {
        if(context.hasOwnProperty(key)) {
          if(data) { data.key = key; }
          ret = ret + fn(context[key], {data: data});
          i++;
        }
      }
    }
  }

  if(i === 0){
    ret = inverse(this);
  }

  return ret;
});

Handlebars.registerHelper('if', function(conditional, options) {
  var type = toString.call(conditional);
  if(type === functionType) { conditional = conditional.call(this); }

  if(!conditional || Handlebars.Utils.isEmpty(conditional)) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
});

Handlebars.registerHelper('unless', function(conditional, options) {
  return Handlebars.helpers['if'].call(this, conditional, {fn: options.inverse, inverse: options.fn});
});

Handlebars.registerHelper('with', function(context, options) {
  var type = toString.call(context);
  if(type === functionType) { context = context.call(this); }

  if (!Handlebars.Utils.isEmpty(context)) return options.fn(context);
});

Handlebars.registerHelper('log', function(context, options) {
  var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
  Handlebars.log(level, context);
});

// END(BROWSER)

return Handlebars;
};

},{}],18:[function(require,module,exports){
exports.attach = function(Handlebars) {

// BEGIN(BROWSER)

Handlebars.VM = {
  template: function(templateSpec) {
    // Just add water
    var container = {
      escapeExpression: Handlebars.Utils.escapeExpression,
      invokePartial: Handlebars.VM.invokePartial,
      programs: [],
      program: function(i, fn, data) {
        var programWrapper = this.programs[i];
        if(data) {
          programWrapper = Handlebars.VM.program(i, fn, data);
        } else if (!programWrapper) {
          programWrapper = this.programs[i] = Handlebars.VM.program(i, fn);
        }
        return programWrapper;
      },
      merge: function(param, common) {
        var ret = param || common;

        if (param && common) {
          ret = {};
          Handlebars.Utils.extend(ret, common);
          Handlebars.Utils.extend(ret, param);
        }
        return ret;
      },
      programWithDepth: Handlebars.VM.programWithDepth,
      noop: Handlebars.VM.noop,
      compilerInfo: null
    };

    return function(context, options) {
      options = options || {};
      var result = templateSpec.call(container, Handlebars, context, options.helpers, options.partials, options.data);

      var compilerInfo = container.compilerInfo || [],
          compilerRevision = compilerInfo[0] || 1,
          currentRevision = Handlebars.COMPILER_REVISION;

      if (compilerRevision !== currentRevision) {
        if (compilerRevision < currentRevision) {
          var runtimeVersions = Handlebars.REVISION_CHANGES[currentRevision],
              compilerVersions = Handlebars.REVISION_CHANGES[compilerRevision];
          throw "Template was precompiled with an older version of Handlebars than the current runtime. "+
                "Please update your precompiler to a newer version ("+runtimeVersions+") or downgrade your runtime to an older version ("+compilerVersions+").";
        } else {
          // Use the embedded version info since the runtime doesn't know about this revision yet
          throw "Template was precompiled with a newer version of Handlebars than the current runtime. "+
                "Please update your runtime to a newer version ("+compilerInfo[1]+").";
        }
      }

      return result;
    };
  },

  programWithDepth: function(i, fn, data /*, $depth */) {
    var args = Array.prototype.slice.call(arguments, 3);

    var program = function(context, options) {
      options = options || {};

      return fn.apply(this, [context, options.data || data].concat(args));
    };
    program.program = i;
    program.depth = args.length;
    return program;
  },
  program: function(i, fn, data) {
    var program = function(context, options) {
      options = options || {};

      return fn(context, options.data || data);
    };
    program.program = i;
    program.depth = 0;
    return program;
  },
  noop: function() { return ""; },
  invokePartial: function(partial, name, context, helpers, partials, data) {
    var options = { helpers: helpers, partials: partials, data: data };

    if(partial === undefined) {
      throw new Handlebars.Exception("The partial " + name + " could not be found");
    } else if(partial instanceof Function) {
      return partial(context, options);
    } else if (!Handlebars.compile) {
      throw new Handlebars.Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
    } else {
      partials[name] = Handlebars.compile(partial, {data: data !== undefined});
      return partials[name](context, options);
    }
  }
};

Handlebars.template = Handlebars.VM.template;

// END(BROWSER)

return Handlebars;

};

},{}],19:[function(require,module,exports){
exports.attach = function(Handlebars) {

var toString = Object.prototype.toString;

// BEGIN(BROWSER)

var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

Handlebars.Exception = function(message) {
  var tmp = Error.prototype.constructor.apply(this, arguments);

  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
  for (var idx = 0; idx < errorProps.length; idx++) {
    this[errorProps[idx]] = tmp[errorProps[idx]];
  }
};
Handlebars.Exception.prototype = new Error();

// Build out our basic SafeString type
Handlebars.SafeString = function(string) {
  this.string = string;
};
Handlebars.SafeString.prototype.toString = function() {
  return this.string.toString();
};

var escape = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
};

var badChars = /[&<>"'`]/g;
var possible = /[&<>"'`]/;

var escapeChar = function(chr) {
  return escape[chr] || "&amp;";
};

Handlebars.Utils = {
  extend: function(obj, value) {
    for(var key in value) {
      if(value.hasOwnProperty(key)) {
        obj[key] = value[key];
      }
    }
  },

  escapeExpression: function(string) {
    // don't escape SafeStrings, since they're already safe
    if (string instanceof Handlebars.SafeString) {
      return string.toString();
    } else if (string == null || string === false) {
      return "";
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = string.toString();

    if(!possible.test(string)) { return string; }
    return string.replace(badChars, escapeChar);
  },

  isEmpty: function(value) {
    if (!value && value !== 0) {
      return true;
    } else if(toString.call(value) === "[object Array]" && value.length === 0) {
      return true;
    } else {
      return false;
    }
  }
};

// END(BROWSER)

return Handlebars;
};

},{}],20:[function(require,module,exports){
var hbsBase = require("handlebars/lib/handlebars/base");
var hbsUtils = require("handlebars/lib/handlebars/utils");
var hbsRuntime = require("handlebars/lib/handlebars/runtime");

var Handlebars = hbsBase.create();
hbsUtils.attach(Handlebars);
hbsRuntime.attach(Handlebars);

module.exports = Handlebars;

},{"handlebars/lib/handlebars/base":17,"handlebars/lib/handlebars/runtime":18,"handlebars/lib/handlebars/utils":19}]},{},[1])
;