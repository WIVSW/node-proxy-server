const express = require('express');
const app = express();

const {pathes: {testConfig}} = require('../../src/common/const');

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(5001, () => {
});
