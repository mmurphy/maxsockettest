# maxSockets demo app

This is simple app to demonstrate the slowdown of when with default maxsockets value

The serviceapp.js is similar to a service app, return some data after a delay of 1 second

The proxy.js app is similar to a cloud app that might call a service app, it call the above service app and returns the data received.

The servers.sh script starts the service app, and 2 proxy apps (one with the default maxsoxkets setting and one with maxSockets set to 1000), thes three servers are started on different ports locally.

once the servers are running the do_test.sh script can be run, it uses apache ab to make 400 requests with a concuerrency of 40.
It will, in turn, call the service app directly, then the proxy with the default max sockets, and then the proxy with the maxsockets set to 1000

It will be seen from the output in the results folder, that the proxy with 1000 maxSockets is similar to calling the service directly, but when calling the proxy with the default maxsockets (at least on node 0.10.30) the responses are much slower. (on my machine ~1 second, versus ~8 seconds)
