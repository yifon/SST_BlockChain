#!/bin/bash
set -u
set -e

GLOBAL_ARGS="--raft --rpc --rpcaddr localhost --rpcapi admin,db,eth,debug,miner,net,shh,txpool,personal,web3,quorum --emitcheckpoints"


sleep 1



echo "[*] Starting node 6"
nohup geth --datadir qdata/dd6 $GLOBAL_ARGS --raftport 7201 --rpcport 7101 --port 7301 2>>qdata/logs/6.log &

echo "[*] Starting node 7"
nohup geth --datadir qdata/dd7 $GLOBAL_ARGS --raftport 7202 --rpcport 7102 --port 7302 2>>qdata/logs/7.log &


echo "[*] Waiting for nodes to start"
sleep 10


echo "All nodes configured. See 'qdata/logs' for logs, and run e.g. 'geth attach qdata/dd1/geth.ipc' to attach to the first Geth node"
