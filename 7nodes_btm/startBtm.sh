#!/bin/bash
set -u
set -e

cd /root/nodes

nohup node getInfo.js >/root/btm.log 2>&1&
echo "started btm"