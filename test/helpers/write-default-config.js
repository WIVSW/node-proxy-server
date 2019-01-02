const fse = require('fs-extra');
const {pathes} = require('../../src/common/const');

const config = {
	proxy: {
		host: 'localhost',
		port: 5000
	},
	target: {
		domain: "http://localhost:5001/"
	},
	responses: []
};

module.exports = () => {
	return fse
		.ensureFile(pathes.testConfig)
		.then(() => fse.writeJson(pathes.testConfig, config, { spaces: '\t' }));
};