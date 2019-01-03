const path = require('path');

module.exports = {
	pathes: {
		placeForYourResponses: path.resolve(__dirname, '../place-for-your-responses'),
		config: path.resolve(__dirname, '../config/config.json'),
		testConfig: path.resolve(__dirname, '../config/config-test.json')
	},
	defaultConfig: {
		proxy: {
			host: 'localhost',
			port: 5000
		},
		target: {
			domain: "example.com"
		},
		responses: []
	}
};
