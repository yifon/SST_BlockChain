#!/bin/bash
set -u
set -e

GLOBAL_ARGS="--raft --rpc --rpcaddr localhost --rpcapi admin,db,eth,debug,miner,net,shh,txpool,personal,web3,quorum --emitcheckpoints"


sleep 1



echo "[*] Starting node 4"
nohup geth --datadir qdata/dd4 $GLOBAL_ARGS --raftport 7201 --rpcport 7101 --port 7301 2>>qdata/logs/4.log &

echo "[*] Starting node 5"
nohup geth --datadir qdata/dd5 $GLOBAL_ARGS --raftport 7202 --rpcport 7102 --port 7302 2>>qdata/logs/5.log &


echo "[*] Waiting for nodes to start"
sleep 10


echo "All nodes configured. See 'qdata/logs' for logs, and run e.g. 'geth attach qdata/dd1/geth.ipc' to attach to the first Geth node"
