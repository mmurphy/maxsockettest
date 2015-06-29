var http = require('http');
var winston = require('winston');
var request = require('request');
var logger = require('./logger.js');
var argv = require('minimist')(process.argv.slice(2));

// port to listen on
var myport = argv.port || 1338;

//service to connect to
var service = argv.service || 'http://127.0.0.1:1337/';

// get maxsocket if specified on commandline
var maxsocket = argv.maxsocket;
if (maxsocket) {
  // only update maxsockets if specified on command line, otherwise use defaults
  require('https').globalAgent.maxSockets = maxsocket;
  require('http').globalAgent.maxSockets = maxsocket;
}

var req_counter = 0; // just used for matching responses with requests in log output

// create a http server - like a cloud app
http.createServer(function (req, res) {
  var my_req_counter = req_counter++;
  logger.info('Received request:', my_req_counter);
  // make a request to the service app
  request(service, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      logger.info('Responding to request:', my_req_counter);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(body);    // pass the response from the service to the client
    } else {
      logger.error('got error: ' + JSON.stringify(error));
    }
  });
}).listen(myport, '0.0.0.0');

logger.info('Server running at http://0.0.0.0:' + myport + ' with service at: ' + service + ', maxsockets:' + (maxsocket?maxsocket:"default"));
