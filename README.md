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
Charles[20171205] Deployed 7 nodes in Aliyun:

119.23.12.79 for BTM contract owner:
Node1: representing contract owner, or the card association
Folder: qdata/dd1
RPC port: 7101
Raftport: 7201
Port: 7301

119.23.28.88 for Bank A ATMs:
Node2: repsenting ATM1 of BankA
Folder: qdata/dd2 (this node currently cannot be started due to unknown issue)
RPC port: 7101
Raftport: 7201
Port: 7301

Node3: representing ATM2 of BankA
Folder: qdata/dd3
RPC port: 7102
Raftport: 7202
Port: 7302

120.79.43.12 for Bank B ATMs:
Node4: representing ATM1 of BankB
Folder: qdata/dd4
RPC port: 7101
Raftport: 7201
Port: 7301

Node5: representing ATM2 of BankB
Folder: qdata/dd5
RPC port: 7102
Raftport: 7202
Port: 7302

120.79.41.102 for Bank C ATMs:
Node6: representing ATM1 of BankC
Folder: qdata/dd6
RPC port: 7101
Raftport: 7201
Port: 7301

Node7: representing ATM2 of BankC
Folder: qdata/dd7
RPC port: 7102
Raftport: 7202
Port: 7302
<br><br>

Acccount addresses (on Node1):
BTM (representing central bank): "0x8c632e1968c26ecc1f8fa82ac5cf9c4e1ea5884a"
Bank1: 0x01751f1b5a22aaee0824d68b888f2190a663d768
Bank2: 0x8bdce7b955646a7c620565be1117edb77c101e9b
Bank3: 0xed9d02e382b34818e88b88a309c7fe71e65f419d
<br><br>

BTM contract add: 0x10e5ac94df610a5ff6a812160a5067fd845a2da1 - It's created on Node1
<br>

Bank1:
ATM1: cannot be started so far
ATM2: 0x44b9a0b0f244be1375f907118be1751f8e0bb0cf - It's created on Node3

Bank2:
ATM1: 0x9186eb3d20cbd1f5f992a950d808c4495153abd5 - created on Node4
ATM2: 0x0638e1574728b6d862dd5d3a3e0942c3be47d996 - created on Node5

Bank3:
ATM1: 0xfc1cb1978f2435c8f2564d2c801f399d11479d0f - created on Node6
ATM2: 0xc2376f4675a774f120ea688c4756ae49a7020ccd - created on Node7




