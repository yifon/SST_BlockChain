# SST_BlockChain

Charles [20171203]: I have setup a private quorum chain with 3 nodes at /home/charles/quorum-examples/examples/7nodes. <br>
You can start the 3 nodes by calling /home/charles/quorum-examples/examples/7nodes/my-raft-start.sh. Please remember to unlock all nodes' coinbase account before using the contracts.
<br><br>

I have also setup 2 bank and 2 ATM accounts, addresses:<br>


bank1: 0xce47a89d676d891b7adbc6812749c73fcf600484<br>
bank2: 0xed9d02e382b34818e88b88a309c7fe71e65f419d<br>

BTM contract add: 0xf1d8A2906F215d31f7D46A430D1b1A4Ddf05F1E6<br>

ATM node1 contract add: 0x341ed42cdfb13b897a198cd1c87ddf070e25e6a1<br>
ATM node2 contract add: 0xd04a44f8b502fcfd5cd6d131b7d1b298b9501966<br>



ATM1 belongs to bank1; ATM2 belongs to bank2<br>



BTM contract is the central contract that connect all node contracts<br><br>

I have writted a test script to test a bank2 customer perform CWD on ATM1. Pls use:<br>
/home/charles/quorum-examples/examples/7nodes/ATMnode2.js to start the node2 contract;<br>
/home/charles/quorum-examples/examples/7nodes/ATMnode1.js to start the node1 contract<br>
<br><br>

Please refer to diagram.xlsx for the sequence diagram of withdrawal transaction.

A!c102345
<br><br><br>
Charles[20171205]
Deployed 7 nodes:




