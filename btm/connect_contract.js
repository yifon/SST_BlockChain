

Deployer ={




 

  initContract : function(contractfile, web3http, address, callback){
    console.log("initContract");

    var http = require('http');
    var Web3 = require('web3');
    var fs=require('fs');

    var bank = "";//TODO 



    
    web3 = new Web3(new Web3.providers.HttpProvider(web3http));//pls note the port to be deployed, one port = one instance, different nodes may have different behaviors   


    fs.readFile(contractfile+".abi", 'utf8',function(err,data){//contractAdd.txt contain the contract address
      //console.log(data);
      var abi = JSON.parse(data);
      fs.readFile(contractfile+".bin", 'utf8',function(err1,data1){//contractAdd.txt contain the contract address
        //console.log(data1);
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
        nodeContract = web3.eth.contract(abi).at(address);
        //console.log(nodeContract);
        callback(nodeContract, web3);
        

      });// end of read bin file

      

    });//end of read abi file

  },//end of initContract

  addBank : function(btmContract, add,  name){
    //addBank(address _bankAdd, string _bankName)
    btmContract.addBank(add, name, {from: web3.eth.coinbase});
  },
  addATM : function(btmContract,  _bankAdd,  _atmAdd){
    //addATM(address _bankAdd, address _atmAdd)
    btmContract.addATM(_bankAdd, _atmAdd, {from: web3.eth.coinbase});
  }


  

}

var node1Contract;
var node2Contract;
var btm;
var ownerWeb3;


Deployer.initContract("ATMNode", "http://localhost:22001", "0xb6d55e2e50e8cfbaf87ad6f0e29fbf663104a590", function(theContract, web3){//node1 contract
  node1Contract = theContract;///


});
Deployer.initContract("ATMNode", "http://localhost:22002", "0x30a5b162f0c946384d503c1f786f5c04f1b83f79", function(theContract, web3){//node1 contract
  node2Contract = theContract;///

});
Deployer.initContract("BTM", "http://localhost:22000","0xdc9ea98de223db81143c50287dad58b10197ba73", function(theContract, web3){//node1 contract
  btm = theContract;///
  ownerWeb3 = web3;

});


function start(){
  console.log("coinbase: "+ownerWeb3.eth.coinbase);
  btm.addBank("0x353c1c4aa32e54ae8278403d27e287c4b43ffdf1", "BankA", {from: ownerWeb3.eth.coinbase});//must from the owner node
  btm.addBank("0xed9d02e382b34818e88b88a309c7fe71e65f419d", "BankB", {from: ownerWeb3.eth.coinbase});//must from the owner node

  btm.addATM("0x353c1c4aa32e54ae8278403d27e287c4b43ffdf1", "0xb6d55e2e50e8cfbaf87ad6f0e29fbf663104a590", {from: ownerWeb3.eth.coinbase});//must from the owner node
  btm.addATM("0xed9d02e382b34818e88b88a309c7fe71e65f419d", "0x30a5b162f0c946384d503c1f786f5c04f1b83f79", {from: ownerWeb3.eth.coinbase});//must from the owner node
//BTM contract add: 0xdc9ea98de223db81143c50287dad58b10197ba73

//ATM node1 contract add: 0xb6d55e2e50e8cfbaf87ad6f0e29fbf663104a590
//ATM node2 contract add: 0x30a5b162f0c946384d503c1f786f5c04f1b83f79



}

setTimeout(start,5000);











