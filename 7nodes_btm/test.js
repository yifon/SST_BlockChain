var Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:22000"));
console.log(web3);
//

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












