const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const {promisify} = require('util');
const writeFile = promisify(fs.writeFile);

const Response = require('../../src/models/response');
const PLACE_RESPONSES = path.resolve(__dirname, '../../place-for-your-responses/');

const _prepare = () => {
	const testId = (Math.random() * 1000).toFixed(4);
	const NAME = `test-response-${testId}.txt`;
	const TEST_FILE = {
		NAME,
		PATH: path.resolve(PLACE_RESPONSES, NAME),
		TEXT: 'Hello world!'
	};
	
	const data = new Uint8Array(Buffer.from(TEST_FILE.TEXT));
	
	return fse
		.ensureFile(TEST_FILE.PATH)
		.then(() => writeFile(TEST_FILE.PATH, data))
		.then(() => TEST_FILE);
};

const _runTest = (testFile) => {
	const {NAME, TEXT} = testFile;
	const validResponse = new Response('assets/file', NAME);
	const invalidResponse = new Response('assets/image', null);
	
	return Promise
		.all([validResponse.load(), invalidResponse.load()])
		.then(() => {
			describe('Response Model tests', () => {
				it('Content of file should be equal', (done) => {
					if (validResponse.content.toString() !== TEXT) {
						done(new Error('Text not equal'));
					} else {
						done();
					}
				});
				
				it('Valid response should be valid', (done) => {
					if(!validResponse.isValid()) {
						done(new Error('Is not valid!'));
					} else {
						done();
					}
				});
				
				it('Content of file should not be equal', (done) => {
					if (invalidResponse.content && invalidResponse.content.toString() === TEXT) {
						done(new Error('Text is equal'));
					} else {
						done();
					}
				});
				
				it('Invalid response should not be valid', (done) => {
					if(invalidResponse.isValid()) {
						done(new Error('Is valid!'));
					} else {
						done();
					}
				})
			});
		});
};

const _cleanup = (testFile) => fse.remove(testFile.PATH);

module.exports = () => {
	it('Response model', (done) => {
		let testFile;
		_prepare()
			.then((file) => { testFile = file })
			.then(() => _runTest(testFile))
			.finally(done)
			.finally(() => _cleanup(testFile))
	});
};
