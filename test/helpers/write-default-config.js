const fse = require('fs-extra');
const {pathes, defaultConfig} = require('../../common/const');

module.exports = () => {
	return fse
		.ensureFile(pathes.testConfig)
		.then(() => fse.writeJson(pathes.testConfig, defaultConfig, { spaces: '\t' }));
};