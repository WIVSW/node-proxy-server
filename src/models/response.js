const {resolve} = require('path');
const fs = require('fs');
const {promisify} = require('util');
const readFile = promisify(fs.readFile);

class Response {

	constructor(uri, filePath, responsePath) {
		this.uri = uri;
		this.path = typeof filePath === 'string' ?
			resolve(responsePath, filePath) : null;
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
			.catch((err) => {});
	}

	isValid() {
		return Boolean(this.uri && this.path && this._content);
	}
}

module.exports = Response;
