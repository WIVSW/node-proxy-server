const {resolve} = require('path');
const fs = require('fs');
const {promisify} = require('util');
const readFile = promisify(fs.readFile);

class Response {

	constructor(uri, filePath) {
		this.PATH = resolve(__dirname, '../../place-for-your-responses/');

		this.uri = uri;
		this.path = typeof filePath === 'string' ?
			resolve(this.PATH, filePath) : null;
		this._content = null;
	}

	get content() {
		return this._content;
	}

	load() {
		if (!this.path) {
			return Promise.resolve();
		}
		
		return readFile(this.path)
			.then((string) => this._content = string)
			.catch((err) => console.log(err));
	}

	isValid() {
		return Boolean(this.uri && this.path && this._content);
	}
}

module.exports = Response;
