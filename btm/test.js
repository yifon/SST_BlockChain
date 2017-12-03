

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

//BTM contract add: 0x8011dF885A30b515f5EFfd9F4993090930a43679
//ATM node1 contract add: 0x81845481fd51efd88fd44e8983a60cecf3886552
//ATM node2 contract add: 0x253ff19cb98563c939e7aafd19bbf64a3627a1e9
Deployer.initContract("ATMNode", "http://localhost:22001", "0x986328359e6ce90a98b89b4b6f19aa6ea527f1b7", function(theContract, web3){//node1 contract
  node1Contract = theContract;///


});
Deployer.initContract("ATMNode", "http://localhost:22002", "0x7da901f9a280904eafb3463ad53cc330952a56b8", function(theContract, web3){//node1 contract
  node2Contract = theContract;///

});
Deployer.initContract("BTM", "http://localhost:22000","0x0cbc08f58bd9791aa6ccaf2f8e030d1cc3c6161a", function(theContract, web3){//node1 contract
  btm = theContract;///
  ownerWeb3 = web3;

});


function start(){
  console.log("coinbase: "+ownerWeb3.eth.coinbase);
  console.log(btm.getBankAtms("0xed9d02e382b34818e88b88a309c7fe71e65f419d"));



}

setTimeout(start,5000);











