var http = require('http');
var logger = require('./logger.js');
var argv = require('minimist')(process.argv.slice(2));

var myport = argv.port || 1337;  // port to listen on

var req_counter = 0;  // just used to match responses with requests in log output

// create a HTTP server, like a service app
http.createServer(function (req, res) {
  var my_req_counter = req_counter++;
  logger.info('Received request:', my_req_counter);
  setTimeout(function() {  // respond after a delay
    logger.info('Responding to request:', my_req_counter);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
  }, 1000);
}).listen(myport, '0.0.0.0');
logger.info('Server running at http://0.0.0.0:' + myport);
