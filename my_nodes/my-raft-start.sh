#!/bin/bash
set -u
set -e

GLOBAL_ARGS="--raft --rpc --rpcaddr 0.0.0.0 --rpcapi admin,db,eth,debug,miner,net,shh,txpool,personal,web3,quorum --emitcheckpoints"



sleep 1

echo "[*] Starting node 1"
 nohup geth --datadir qdata/dd1 $GLOBAL_ARGS --raftport 50401 --rpcport 22000 --port 21000 --unlock 0 --password cen123.txt 2>>qdata/logs/1.log &

echo "[*] Starting node 2"
nohup geth --datadir qdata/dd2 $GLOBAL_ARGS --raftport 50402 --rpcport 22001 --port 21001 --unlock 0 --password passwords.txt 2>>qdata/logs/2.log &

echo "[*] Starting node 3"
 nohup geth --datadir qdata/dd3 $GLOBAL_ARGS --raftport 50403 --rpcport 22002 --port 21002 --unlock 0 --password cen123.txt 2>>qdata/logs/3.log &



echo "[*] Waiting for nodes to start"
sleep 10
echo "[*] Sending first transaction"
 geth --exec 'loadScript("my-script1.js")' attach ipc:qdata/dd1/geth.ipc

echo "All nodes configured. See 'qdata/logs' for logs, and run e.g. 'geth attach qdata/dd1/geth.ipc' to attach to the first Geth node"
