var winston = require('winston');

module.exports = {
	constants: {
		pagelength: 12
	},
	log: new (winston.Logger)({
		transports: [
			new (winston.transports.Console)(),
			new (winston.transports.File)({ filename: 'error.log' })
		]
	})
};