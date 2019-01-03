const fse = require('fs-extra');

const {pathes, defaultConfig} = require('../common/const');


const createDirs = () => {
	console.log('Creating directories and files for deploy.');
	return Promise
		.all([
			fse.ensureDir(pathes.placeForYourResponses),
			fse.ensureFile(pathes.config)
		])
		.then(() => console.log('Directories and files was created.'));
};

const writeDefaultConfig = () => {
	console.log('Generate default config');
	return fse
		.writeJson(pathes.config, defaultConfig, { spaces: '\t' })
		.then(() => console.log('Default config was generated'));
};

createDirs()
	.then(() => writeDefaultConfig())
	.then(() => console.log('Preparing is completed! \nNow you can launch the app by typing `npm run start`'));