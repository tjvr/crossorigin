const restify = require('restify');
var proxy = require('./proxy');

const server = restify.createServer({
    name: 'crossorigin.me'
});

const freeTier = restify.throttle({
    rate: 3,
    burst: 10,
    ip: true
});

// CORS configuration

server.opts('/', proxy.opts);

// Request handler configuration (for free tier)
server.get(/^\/(https?:\/\/.+)/, freeTier, proxy.get);
server.post(/^\/(http:\/\/.+)/, freeTier, proxy.post);
server.put(/^\/(http:\/\/.+)/, freeTier, proxy.put);

module.exports = server;
