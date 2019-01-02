const path = require('path');
const fse = require('fs-extra');
const {pathes} = require('../src/common/const');
const writeDefaultConfig = require('./helpers/write-default-config');
const changeConfigResponses = require('./helpers/change-config-responses');

const ResponsesProvider = require('../src/reponses-provider');

const RESPONSES = [
	{uri: 'api/add', path: ''},
	{uri: '', path: ''},
	{uri: 'api/remove', path: ''},
	{uri: 'api/remove', path: ''}
];

const _createTestFile = (responsesPath) => {
	const testId = (Math.random() * 1000).toFixed(4);
	const NAME = `test-response-${testId}.txt`;
	return {
		NAME,
		PATH: path.resolve(responsesPath, NAME),
		TEXT: 'Hello world!'
	};
};

const _runTest = () => {
	const provider = new ResponsesProvider(pathes.placeForYourResponses, pathes.testConfig);
	return provider
		.load()
		.then(() => {
			describe('Provider loading', () => {
				it('Provider should have only one valid response', (done) => {
					if (provider.size() !== 1) {
						done(new Error(`Provider have ${provider.size()} responses`));
						resolve();
					} else {
						done();
						resolve();
					}
				});
			});
		});
};

const _cleanup = (testFile) => {
	return Promise.all([
		fse.remove(testFile.PATH),
		changeConfigResponses([])
	]);
};

module.exports = () => {
	it('Response Provider', (done) => {
		const testFile = _createTestFile(pathes.placeForYourResponses);
		RESPONSES[1].path = testFile.PATH;
		RESPONSES[2].path = testFile.PATH;
		RESPONSES[3].path = testFile.PATH;
		
		writeDefaultConfig()
			.then(() => changeConfigResponses(RESPONSES))
			.then(() => fse.writeJson(testFile.PATH, testFile.TEXT, { spaces: '\t' }))
			.then(() => _runTest())
			.finally(done)
			.finally(() => _cleanup(testFile));
	});
};
