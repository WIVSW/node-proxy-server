const config = require('./config/config.json');

const http = require('http');
const httpProxy = require('http-proxy');
const modifyResponse = require('http-proxy-response-rewrite');

// Create a proxy server
const proxy = httpProxy.createProxyServer({
    target: `http://${config.target.domain}/`
});

// Listen for the `proxyRes` event on `proxy`.
proxy.on('proxyRes', function (proxyRes, req, res) {
    modifyResponse(res, proxyRes.headers['content-encoding'], (body) => {
        if (body) {
            console.log(proxyRes.headers['content-encoding']);
        }
        return body;
    });
});

// Create your server and then proxies the request
const server = http.createServer( (req, res) => {
    proxy.web(req, res);
}).listen({...config.proxy});
