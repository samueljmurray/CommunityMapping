var winston = require('winston');

module.exports = {
	constants: {
		pagelength: 10
	},
	log: new (winston.Logger)({
		transports: [
			new (winston.transports.Console)(),
			new (winston.transports.File)({ filename: 'error.log' })
		]
	})
};