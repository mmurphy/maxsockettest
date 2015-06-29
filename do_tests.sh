ab -n 400 -c 40 'http://127.0.0.1:1337/' > results/direct.txt
ab -n 400 -c 40 'http://127.0.0.1:1338/' > results/proxy_default_sockets.txt
ab -n 400 -c 40 'http://127.0.0.1:1339/' > results/proxy_maxsockets_1000.txt
echo Finished. Check outputs in results directory.
