ContractNode = {



  initContract : function(contractfile, web3http, add,callback,web3){
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
       // console.log(data1);
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
        //fs.readFile(contractfile+".txt", 'utf8',function(err,data2){//contractAdd.txt contain the contrain address
         // console.log(data2);

          var nodeContract = web3.eth.contract(abi).at(add);
          //event WithdrawalAuthorisation(string trxHash, int status, int fee);
          //the event to tell Node of the transaction authorisation result
          var event = nodeContract.WithdrawalAuthorisation();
          event.watch(function(err,res){
            if(!err){
              console.log("WithdrawalAuthorisation："+res.address);
              console.log(res.args);
            }else{
              console.log(err);
            }
            
          });

          //the event to tell node to start a CWD authorisation with ATMP
          //event WithdrawalRequest(address _fromAtm, string trxHash, string _account, string _pwd, int _amount);
          var event = nodeContract.WithdrawalRequest();
          event.watch(function(err,res){
            if(!err){
              console.log("WithdrawalRequest："+res.address);
              console.log(res.args);
              //to call atmp 
              //authorised: function(_fromAtm, _issueBank, trxHash, status, _amount,int fee)
              //authorised();//to simulate atmp response
              var hash=nodeContract.startAuthorise(res.args._fromAtm,"0xed9d02e382b34818e88b88a309c7fe71e65f419d",res.args.trxHash,"1000",res.args._amount,2, {from: web3.eth.coinbase, gas: 0x47b760});
              console.log(hash);
              //startAuthorise(address _fromAtm, address _issueBank, string trxHash, int status, int _amount,int fee) 
            }else{
              console.log(err);
            }
            
          });

          callback(nodeContract,web3);
         

    
        

      });// end of read bin file

      

    });//end of read abi file

  },//end of initContract

  withdraw : function (trxHash,  _issueBank,  _account,  _pwd,  _amount){
    

  },//end of withdraw

  authorised: function(_fromAtm, _issueBank, trxHash, status, _amount, fee){
    //atmp response
    
    

  } //end authorised


  
}

ContractNode.initContract("ATMNode", "http://localhost:22002", "0x30a5b162f0c946384d503c1f786f5c04f1b83f79", function(contract,web3){
  console.log(contract.get());
  console.log(contract.btm);



});//from ATM1

















  



