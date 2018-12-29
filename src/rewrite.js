const fse = require('fs-extra');
const path = require('path');

const config = require('./config/config.json');
const modifyResponse = require('http-proxy-response-rewrite');

const listFiles = config.responses;
const listsUrls = listFiles.map(file => file.url);

const PATH = path.resolve('./place-for-your-responses');

module.exports = (proxyRes, req, res) => {
    modifyResponse(res, proxyRes.headers['content-encoding'], (body) => {
        const index = listsUrls.indexOf(req.url);
        //if (index > -1 && body) {
        //    console.log(req.url, path.resolve(PATH, listFiles[index].filepath));
        //    //const json = fse.readJsonSync(path.resolve(PATH, listFiles[index].filepath));
        //    //console.log(JSON.stringify(json));
        //    //return JSON.stringify(json);
//
        //    let parsed = JSON.parse(body);
        //    parsed.status = parsed.status.slice(0,1);
        //    // console.log(JSON.stringify(parsed));
        //    return '{"result": 1, "status": []}';
        //}
        return '{"result": 1, "status": []}';
    });
};
