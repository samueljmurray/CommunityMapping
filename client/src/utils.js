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
	mapIndexLength: 12
};