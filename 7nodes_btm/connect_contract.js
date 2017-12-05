

Deployer ={




 

  initContract : function(contractfile, web3http, address, callback){
    console.log("initContract");

    var http = require('http');
    var Web3 = require('web3');
    var fs=require('fs');

    var bank = "";//TODO 



    
    web3 = new Web3(new Web3.providers.HttpProvider(web3http));//pls note the port to be deployed, one port = one instance, different nodes may have different behaviors   


    fs.readFile(contractfile+".json", 'utf8',function(err,data){//contractAdd.txt contain the contract address
      var json = JSON.parse(data);
      var abi = json.abi;
      //fs.readFile(contractfile+".bin", 'utf8',function(err1,data1){//contractAdd.txt contain the contract address
        //console.log(data1);
        var bytecode = json.bytecode;   
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
var node3Contract;
var node4Contract;
var btm;
var ownerWeb3;

Deployer.initContract("BTM", "http://localhost:7101","0x10e5ac94df610a5ff6a812160a5067fd845a2da1", function(theContract, web3){//node1 contract
  btm = theContract;///
  ownerWeb3 = web3;

});
/*
Deployer.initContract("ATMNode", "http://119.23.28.88:7101", "0x341ed42cdfb13b897a198cd1c87ddf070e25e6a1", function(theContract, web3){//node1 contract
  node1Contract = theContract;///


});
Deployer.initContract("ATMNode", "http://119.23.28.88:7102", "0x6ca20ec5e6c9f2af6f179743c4e8f0389065caf2", function(theContract, web3){//node1 contract
  node2Contract = theContract;///

});

Deployer.initContract("ATMNode", "http://120.79.43.12:7101", "0x180893a0ec847fa8c92786791348d7d65916acbb", function(theContract, web3){//node1 contract
  node3Contract = theContract;///


});
Deployer.initContract("ATMNode", "http://120.79.43.12:7102", "0x3f217e1fe69d1b188385b761a2b17827616b9bdb", function(theContract, web3){//node1 contract
  node4Contract = theContract;///

});

*/

function start(){
  console.log(ownerWeb3);
  console.log("coinbase: "+ownerWeb3.eth.coinbase);
//  BTM coinbase: "0x8c632e1968c26ecc1f8fa82ac5cf9c4e1ea5884a"
//Bank1: 0x01751f1b5a22aaee0824d68b888f2190a663d768
//Bank2: 0x8bdce7b955646a7c620565be1117edb77c101e9b
//Bank3: 0xed9d02e382b34818e88b88a309c7fe71e65f419d
//BTM contract add: 0x10e5ac94df610a5ff6a812160a5067fd845a2da1

  btm.addBank("0x01751f1b5a22aaee0824d68b888f2190a663d768", "BankA", {from: ownerWeb3.eth.accounts[0]});//must from the owner node
  btm.addBank("0x8bdce7b955646a7c620565be1117edb77c101e9b", "BankB", {from: ownerWeb3.eth.accounts[0]});//must from the owner node
  btm.addBank("0xed9d02e382b34818e88b88a309c7fe71e65f419d", "BankB", {from: ownerWeb3.eth.accounts[0]});//must from the owner node

/*
ATM1: 0x44b9a0b0f244be1375f907118be1751f8e0bb0cf

Bank2:
ATM1: 0x9186eb3d20cbd1f5f992a950d808c4495153abd5
ATM2: 0x0638e1574728b6d862dd5d3a3e0942c3be47d996

Bank3:
ATM1: 0xfc1cb1978f2435c8f2564d2c801f399d11479d0f
ATM2: 0xc2376f4675a774f120ea688c4756ae49a7020ccd
*/

//bank 1 add an ATM
  btm.addATM("0x01751f1b5a22aaee0824d68b888f2190a663d768", "0x44b9a0b0f244be1375f907118be1751f8e0bb0cf", {from: ownerWeb3.eth.accounts[0]});//must from the owner node
  

//bank2
  btm.addATM("0x8bdce7b955646a7c620565be1117edb77c101e9b", "0x9186eb3d20cbd1f5f992a950d808c4495153abd5", {from: ownerWeb3.eth.accounts[0]});//must from the owner node
  btm.addATM("0x8bdce7b955646a7c620565be1117edb77c101e9b", "0x0638e1574728b6d862dd5d3a3e0942c3be47d996", {from: ownerWeb3.eth.accounts[0]});//must from the owner node
//bank3
  btm.addATM("0xed9d02e382b34818e88b88a309c7fe71e65f419d", "0xfc1cb1978f2435c8f2564d2c801f399d11479d0f", {from: ownerWeb3.eth.accounts[0]});//must from the owner node
  btm.addATM("0xed9d02e382b34818e88b88a309c7fe71e65f419d", "0xc2376f4675a774f120ea688c4756ae49a7020ccd", {from: ownerWeb3.eth.accounts[0]});//must from the owner node


//BTM contract add: 0xdc9ea98de223db81143c50287dad58b10197ba73

//ATM node1 contract add: 0xb6d55e2e50e8cfbaf87ad6f0e29fbf663104a590
//ATM node2 contract add: 0x30a5b162f0c946384d503c1f786f5c04f1b83f79



}

setTimeout(start,5000);











