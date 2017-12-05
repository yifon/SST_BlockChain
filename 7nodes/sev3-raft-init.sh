#!/bin/bash
set -u
set -e

echo "[*] Cleaning up temporary data directories"
rm -rf qdata
mkdir -p qdata/logs





echo "[*] Configuring node 6"
mkdir -p qdata/dd6/{keystore,geth}
cp raft/static-nodes.json qdata/dd6
cp raft/nodekey6 qdata/dd6/geth/nodekey
geth --datadir qdata/dd6 init genesis.json

echo "[*] Configuring node 7"
mkdir -p qdata/dd7/{keystore,geth}
cp raft/static-nodes.json qdata/dd7
cp raft/nodekey7 qdata/dd7/geth/nodekey
geth --datadir qdata/dd7 init genesis.json

