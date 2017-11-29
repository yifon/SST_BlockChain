
console.log("hey");
var http = require('http');
var Web3 = require('web3');
var fs=require('fs');

var bank = "";//TODO 



//console.log(Web3);
console.log("########################");

if(typeof web3 !== 'undefined'){
	web3 = new Web3(web3.currentProvider);
}else{
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:22001"));//pls note the port to be deployed, one port = one instance, different nodes may have different behaviors

}


var abi = [{"constant":false,"inputs":[{"name":"x","type":"uint256"}],"name":"set","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"retVal","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"a","type":"uint256"}],"name":"multiply","outputs":[{"name":"d","type":"uint256"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"}],"name":"TestEvent","type":"event"}];

var bytecode = "0x606060405234610000575b610130806100186000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806360fe47b11461004e5780636d4ce63c1461006b578063c6888fa11461008e575b610000565b346100005761006960048080359060200190919050506100bf565b005b3461000057610078610117565b6040518082815260200191505060405180910390f35b34610000576100a96004808035906020019091905050610122565b6040518082815260200191505060405180910390f35b806000819055507fab77f9000c19702a713e62164a239e3764dde2ba5265c7551f9a49e0d304530d33604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a15b50565b600060005490505b90565b60006007820290505b91905056";


fs.readFile('contractAdd.txt', 'utf8',function(err,data){//contractAdd.txt contain the contrain address
  console.log(data);

  var btmContract = web3.eth.contract(abi).at(data);

  //start to handle the CWD event from contract
  var cwdEvent = btmContract.Withdrawal();
  event.watch(function(err,res){
    if(!err){
      console.log("event come");
      if(res.args._issueBank == bank){//only if bank name matches the event
        var cwdData = {
          "eventHash" : res.transactionHash,
          "account": res.args._account,
          "pwd": res.args._pwd,
          "amount": res.args._amount
        };
        authorise(cwdData);
        
      }      
      
    }else{
      console.log(err);
    }
    
  });

  //to send the CWD data to ATMP for authorisation
  var authorise = function(_cwdData){
  console.log("authorise");

  }

  //the callback when transaction is authorized by atmp
  var postAuthorised = function(_response){
    console.log("postAuthorise");
    btmContract.confirmWithdraw();
  }

});










  



