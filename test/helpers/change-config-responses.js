const fse = require('fs-extra');
const {pathes} = require('../../src/common/const');

module.exports = (responses) => {
	return fse
		.readJson(pathes.testConfig)
		.then((config) => {
			config.responses = responses;
			return config;
		})
		.then((data) => fse.writeJson(pathes.testConfig, data, { spaces: '\t' }))
};
