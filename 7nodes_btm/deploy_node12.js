

Deployer ={


  deploy: function(contractfile, web3http, btmadd){
    console.log("deploy contract："+contractfile);
    var http = require('http');
    var Web3 = require('web3');

    var fs=require('fs');
    

    //console.log(Web3);
    console.log("########################");


    web3 = new Web3(new Web3.providers.HttpProvider(web3http));//pls note the port to be deployed, one port = one instance


    //the abi and bytecode is generated from SimpleStorage.sol by using 'solcjs --abi --bin' command
    fs.readFile(contractfile+".abi", 'utf8',function(err,data){//contractAdd.txt contain the contract address
      console.log("f:"+data);
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

        console.log(web3.eth.accounts[0]);

          var simple = simpleContract.new(btmadd, {from:web3.eth.accounts[0], data: bytecode, gas: 0x47b760}, function(e, contract) {

            

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

        



        
        

      });

      

    });

  }


  

}







Deployer.deploy("ATMNode", "http://localhost:7101","0x1932c48b2bf8102ba33b4a6b545c32236e342f34");//atm 1

setTimeout(function(){
  Deployer.deploy("ATMNode", "http://localhost:7102","0x1932c48b2bf8102ba33b4a6b545c32236e342f34");//atm 2
},2000);




//Deployer.deploy("ATMNode", "http://localhost:22002");//atm 2









