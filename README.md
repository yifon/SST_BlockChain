# SST_BlockChain

Charles [20171203]: I have setup a private quorum chain with 3 nodes at /home/charles/quorum-examples/examples/7nodes. <br>
You can start the 3 nodes by calling /home/charles/quorum-examples/examples/7nodes/my-raft-start.sh
<br><br>

I have also setup 2 bank and 2 ATM accounts, addresses:<br>
bank1: 0x353c1c4aa32e54ae8278403d27e287c4b43ffdf1 <br>
bank2: 0xed9d02e382b34818e88b88a309c7fe71e65f419d <br>
ATM1: 0xb6d55e2e50e8cfbaf87ad6f0e29fbf663104a590 <br>
ATM2: 0x30a5b162f0c946384d503c1f786f5c04f1b83f79 <br>

ATM1 belongs to bank1; ATM2 belongs to bank2<br>

The 3 contracts address: <br>
BTM contract add: 0xdc9ea98de223db81143c50287dad58b10197ba73 <br>
ATM node1 contract add: 0xb6d55e2e50e8cfbaf87ad6f0e29fbf663104a590 <br>
ATM node2 contract add: 0x30a5b162f0c946384d503c1f786f5c04f1b83f79 <br>

BTM contract is the central contract that connect all node contracts<br><br>

I have writted a test script to test a bank2 customer perform CWD on ATM1. Pls use:<br>
/home/charles/quorum-examples/examples/7nodes/ATMnode2.js to start the node2 contract;<br>
/home/charles/quorum-examples/examples/7nodes/ATMnode1.js to start the node2 contract<br>



