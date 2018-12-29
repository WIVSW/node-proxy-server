const modifyResponse = require('http-proxy-response-rewrite');

module.exports = (proxyRes, req, res) => {
    modifyResponse(res, proxyRes.headers['content-encoding'], (body) => {
        if (body) {
            console.log(req.url);
        }
        return body;
    });
};
