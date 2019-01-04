const fse = require('fs-extra');
const Response = require('./models/response');

class ResponsesProvider {
	
	constructor(responsesPath, configPath) {
		this._responsesPath = responsesPath;
		this._configPath = configPath;

		this._uriToPath = new Map();
	}

	load() {
		let responses, config;
		return fse
			.readJson(this._configPath)
			.then((configJson) => {
				config = configJson;
				responses = config.responses && config.responses
					.map((response) => new Response(response.uri, response.path, this._responsesPath));
				
				if (!responses && !responses.length) {
					throw `Responses not specified.`;
				}

				return Promise.all(responses.map((response) => response.load()));
			})
			.then(() => {
				responses = responses.filter((response) => response.isValid());
				const diff = config.responses.length - responses.length;
				
				if (diff) {
					console.warn(`The ${diff} responses was ignore in ${this._configPath}`);
				}

				this._uriToPath.clear();

				responses.forEach((response) => this._uriToPath.set(response.uri, response.content));

				return this._uriToPath;
			})
			.catch((err) => {
				throw new Error(`Failed read config file ${this._configPath}: \n\t${typeof err === 'string' ? err : err.toString()}`);
			})
	}

	has(uri) {
		return this._uriToPath.has(uri);
	}

	get(uri) {
		return this._uriToPath.get(uri);
	}

	size() {
		return this._uriToPath.size;
	}
}

module.exports = ResponsesProvider;
