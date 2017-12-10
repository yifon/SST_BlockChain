# SST_BlockChain

Something you should remember:  A!c102345
<br><br><br>


For sequence diagram, please refer to https://github.com/yifon/SST_BlockChain/blob/master/diagram.xlsx 
<br><br>

Please call http://119.23.12.79:6101/balances to get the following information (in JSON format):
1. contract address and ABI.
2. all banks and ATMs' account address, and balances. Pls note that "BTM" = the central bank, which should not have any ATM.
<br><br>

Please call http://120.79.43.12:6101/blocktx?startBlock=500 to get the blockchain transaction records  (in JSON format).
"startBlock=500" means to check all records from the 500th block until the latest block.

<br><br>


http://119.23.12.79:6101/Index.htm is a page to display the blockchain account balances and transaction records. It's actually a view of the data of http://119.23.12.79:6101/balances and http://120.79.43.12:6101/blocktx?startBlock=550

<br><br>

For the blockchain network information, including each ATM nodes' IP and ports, please refer to : https://github.com/yifon/SST_BlockChain/blob/master/Port_usage


