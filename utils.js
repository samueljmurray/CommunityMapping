/**
 * utils.js
 *
 * Utilities used by the Express app
 */

/* Includes */
var winston = require('winston');

module.exports = {
	constants: {
		// Default page length
		pagelength: 12
	},
	// Custom logging behaviour using Winston (https://github.com/flatiron/winston)
	log: new (winston.Logger)({
		transports: [
			new (winston.transports.Console)(),
			new (winston.transports.File)({ filename: 'error.log' })
		]
	})
};