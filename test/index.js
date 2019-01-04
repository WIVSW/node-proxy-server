const checkModels = require('./models/');
const checkResponsesProvider = require('./responses-provider');

describe('Models should work correctly', () => {
	checkModels();
});

describe('Providers should work correctly', () => {
	checkResponsesProvider();
});
