
console.log("hey");
var http = require('http');
var Web3 = require('web3');

var fs=require('fs');

//console.log(Web3);
console.log("########################");

if(typeof web3 !== 'undefined'){
	web3 = new Web3(web3.currentProvider);
}else{
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:22000"));//pls note the port to be deployed, one port = one instance

}

//the abi and bytecode is generated from SimpleStorage.sol by using 'solcjs --abi --bin' command
var abi = [{"constant":false,"inputs":[{"name":"x","type":"uint256"}],"name":"set","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"retVal","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"a","type":"uint256"}],"name":"multiply","outputs":[{"name":"d","type":"uint256"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"}],"name":"TestEvent","type":"event"}];

var bytecode = "0x606060405234610000575b610130806100186000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806360fe47b11461004e5780636d4ce63c1461006b578063c6888fa11461008e575b610000565b346100005761006960048080359060200190919050506100bf565b005b3461000057610078610117565b6040518082815260200191505060405180910390f35b34610000576100a96004808035906020019091905050610122565b6040518082815260200191505060405180910390f35b806000819055507fab77f9000c19702a713e62164a239e3764dde2ba5265c7551f9a49e0d304530d33604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a15b50565b600060005490505b90565b60006007820290505b91905056";

var simpleContract = web3.eth.contract(abi);
var cMined = false;

/*
var updateContractAdd = function (_add){
    fs.writeFile("contractAdd.txt",_add, 'utf8',function(err){
          if(err){
            return console.log(err);
          }
          console.log("success write");
        });
  };

*/
var simple = simpleContract.new({from:web3.eth.accounts[0], data: bytecode, gas: 0x47b760}, function(e, contract) {

  

  if (e) {
    console.log("err creating contract", e);
  } else {
    if (!contract.address) {
      console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
      
    } else {
      cMined = true;
      console.log("Contract mined! Address: " + contract.address);
      //console.log(contract);
      //updateContractAdd(contract.address);     //sometimes cannot mined, and don't know how to wait for mining completion, need to manually update contract add on contractAdd.txt

    }
  }

/*
  var waitMine = function (){
      cMined = contract.address != null;
      
      console.log("wait: ");
      console.log(cMined);
      console.log(contract.address);
      setMineTime();
      
    };



    var setMineTime = function (){
      if (!cMined) {
        setTimeout(waitMine,1000);
      }
      else{
        console.log("contract mined:"+contract.address);
        updateContractAdd(contract.address);

      }
      
        
    };
    
    waitMine();
*/

});












