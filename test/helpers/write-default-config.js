const fse = require('fs-extra');
const {pathes} = require('../../src/common/const');

const config = {
	proxy: {
		host: 'localhost',
		port: 5000
	},
	target: {
		domain: "http://google.com"
	},
	responses: []
};

module.exports = () => {
	return fse
		.ensureFile(pathes.testConfig)
		.then(() => fse.writeJson(pathes.testConfig, config, { spaces: '\t' }));
};