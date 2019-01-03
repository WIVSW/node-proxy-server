const config = require('../config/config.json');

const http = require('http');
const httpProxy = require('http-proxy');

const {pathes} = require('../common/const');
const ResponseProvider = require('./reponses-provider');

const provider = new ResponseProvider(pathes.placeForYourResponses, pathes.config);

const rewrite = (proxyRes, req, res) => {
    if (provider.has(req.url)) {
        res.write(provider.get(req.url));
	    res.write = () => {};
    }
};

provider
    .load()
    .then(() => {
	    // Create a proxy server
	    const proxy = httpProxy.createProxyServer({
		    target: `http://${config.target.domain}/`
	    });

        // Listen for the `proxyRes` event on `proxy`.
	    proxy.on('proxyRes', rewrite);

        // Create your server and then proxies the request
	    const server = http.createServer( (req, res) => {
		    proxy.web(req, res);
	    }).listen({...config.proxy});
    });
