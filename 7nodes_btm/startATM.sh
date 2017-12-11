cd /root/nodes
nohup node network.js 2>network.log &

echo "started network monitor"

cd /ATMC/bank_a_ATM001

nohup node app.js 2>atmc1.log &

echo "started ATMC1"

cd /ATMC/bank_a_ATM002

nohup node app.js 2>atmc2.log &

echo "started ATMC2"

