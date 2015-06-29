# maxSockets demo app

This is simple app to demonstrate the slowdown of when with default maxsockets value

The serviceapp.js is similar to a service app, return some data after a delay of 1 second

The proxy.js app is similar to a cloud app that might call a service app, it call the above service app and returns the data received.

The servers.sh script starts the service app, and 2 proxy apps (one with the default maxsoxkets setting and one with maxSockets set to 1000), thes three servers are started on different ports locally.

once the servers are running the do_test.sh script can be run, it uses apache ab to make 400 requests with a concuerrency of 40.
It will, in turn, call the service app directly, then the proxy with the default max sockets, and then the proxy with the maxsockets set to 1000

It will be seen from the output in the results folder, that the proxy with 1000 maxSockets is similar to calling the service directly, but when calling the proxy with the default maxsockets (at least on node 0.10.30) the responses are much slower. (on my machine ~1 second, versus ~8 seconds)

##Sample Results

Call service directly|call service via proxy with default max sockets|call service via proxy with 1000 max sockets
---------------------| ---------------------| ---------------------
Server Port:            1337|Server Port:            1338|Server Port:            1339
Time per request:       1018.460 ms - mean|Time per request:       8045.401 ms - mean|Time per request:       1045.163 ms - mean
Percentage of the requests served within a certain time (ms)|Percentage of the requests served within a certain time (ms)|Percentage of the requests served within a certain time (ms)
  50%   1017|  50%   8040|  50%   1043
  66%   1019|  66%   8042|  66%   1049
  75%   1020|  75%   8044|  75%   1053
  80%   1021|  80%   8044|  80%   1055
  90%   1022|  90%   8047|  90%   1057
  95%   1023|  95%   8048|  95%   1062
  98%   1024|  98%   8050|  98%   1071
  99%   1025|  99%   8078|  99%   1073
 100%   1026 (longest request)| 100%   8081 (longest request)| 100%   1075 (longest request)
