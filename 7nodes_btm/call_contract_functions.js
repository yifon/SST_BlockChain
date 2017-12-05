
console.log("hey");
var http = require('http');
var Web3 = require('web3');
var fs=require('fs');
var contractfile = "SimpleStorage";

//console.log(Web3);
console.log("########################");

if(typeof web3 !== 'undefined'){
	web3 = new Web3(web3.currentProvider);
}else{
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:22000"));//pls note the port to be deployed, one port = one instance, different nodes may have different behaviors

}




fs.readFile(contractfile+".abi", 'utf8',function(err,data){//contractAdd.txt contain the contract address
  console.log(data);
  var abi = JSON.parse(data);
  fs.readFile(contractfile+".bin", 'utf8',function(err1,data1){//contractAdd.txt contain the contract address
    console.log(data1);
    var bytecode = "0x"+data1;    
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
    fs.readFile('contractAdd.txt', 'utf8',function(err,data2){//contractAdd.txt contain the contrain address
      console.log(data2);

      var simpleContract = web3.eth.contract(abi).at(data2);
      web3.eth.defaultAccount = web3.eth.coinbase;
      //try the get() method
      console.log("first call get function");
      console.log("get result: "+simpleContract.get());
      console.log("call set");
      simpleContract.set(1234,{from: web3.eth.coinbase});
      console.log("get result after set function : "+simpleContract.get());
      console.log("getA : "+simpleContract.getA("0xa38e9CBd5f7ACc5cE3790C1558d0D50669AeB577"));

 });
    

  });

  

});













  



