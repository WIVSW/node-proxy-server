const prompt = require('prompt');
const {promisify} = require('util');
const get = promisify(prompt.get);
const PROMPTS = {
	properties: {
		'Proxy domain (default localhost)': {
			pattern: /^[localhost|(\d+.\d+.\d+.\d+)]+$/,
			message: 'Should be localhost or IP address',
			required: false
		}
	}
};

const getUserConfig = () => {
	prompt.start();
	
	get(PROMPTS)
		.then((result) => console.log(result));
};

getUserConfig();

//module.exports = getUserConfig;
