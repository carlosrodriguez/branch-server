var http = require('http');
var httpProxy = require('http-proxy');
var port = process.env.PORT || 9000
var sites = require('./config');

console.log(sites);

var proxy = httpProxy.createProxyServer();

var server = http.createServer(function(req, res) {
  var parts = req.headers.host.replace('.local','').split(".");
  var name = parts.pop();

  var port = sites[name];

  proxy.web(req, res, { target: 'http://127.0.0.1:' + port });
});

server.listen(port);

console.log('Proxy server started on port: ' + port);