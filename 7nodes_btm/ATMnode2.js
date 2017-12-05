ContractNode = {
  //init the node contract
  //contractfile - name prefix of .ABI and .bin file
  //web3http - the web3 http link
  //add - the contract address
  //callback - the callback when contract is inited
  //authorisedCallback - the callback when authorisation completes

  initContract : function(contractfile, web3http, add, initCallback, checkDebitCallback, checkCreditCallback, commitCallback ){
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
        //fs.readFile(contractfile+".txt", 'utf8',function(err,data2){//contractAdd.txt contain the contrain address
         // console.log(data2);

          var nodeContract = web3.eth.contract(abi).at(add);
          //the CheckDebit event handling
          nodeContract.CheckDebit().watch(function(err,res){
            if(!err){
              //need to check whether this node really needs to handle this event by checking the 
              console.log("CheckDebit arrived from contract："+res.address);
              console.log(res.args);
              checkDebitCallback(nodeContract, res.args);

            }else{
              console.log(err);
            }
                
            
          });

          nodeContract.CheckCredit().watch(function(err,res){
            if(!err){
              console.log("CheckCredit arrived from contract："+res.address);
              console.log(res.args);
              checkCreditCallback(nodeContract, res.args);

            }else{
              console.log(err);
            }
                
            
          });

          nodeContract.Commit().watch(function(err,res){
            if(!err){
              console.log("Commit arrived from contract："+res.address);
              console.log(res.args);
              commitCallback(nodeContract, res.args);

            }else{
              console.log(err);
            }
                
            
          });




          initCallback(nodeContract,web3);
         

    
        

      //});// end of read bin file

      

    });//end of read abi file

  }//end of initContract
  
}




//testing code start here

//testing one ATM from bank A
var ownerBank = "0x8bdce7b955646a7c620565be1117edb77c101e9b";
var atmAdd = "0x9186eb3d20cbd1f5f992a950d808c4495153abd5";


//start node 1 and start a withdrawal
new ContractNode.initContract("BTM", "http://localhost:7101", "0x10e5ac94df610a5ff6a812160a5067fd845a2da1", 
  // the callback when init is done
  function(contract,web3){
  
    console.log(contract);
    /*
Bank1: 0x01751f1b5a22aaee0824d68b888f2190a663d768
Bank2: 0x8bdce7b955646a7c620565be1117edb77c101e9b
Bank3: 0xed9d02e382b34818e88b88a309c7fe71e65f419d


BTM contract add: 0x10e5ac94df610a5ff6a812160a5067fd845a2da1


Bank1:
ATM1: 0x44b9a0b0f244be1375f907118be1751f8e0bb0cf

Bank2:
ATM1: 0x9186eb3d20cbd1f5f992a950d808c4495153abd5
ATM2: 0x0638e1574728b6d862dd5d3a3e0942c3be47d996
    */
    //startTrx(address _fromAtm, address _debitBank, address _creditBank,string _trxHash, int256 _amount, int256 _fee)
    // start a cwd, from bank A ATM01, customer is from bank B
    //contract.startTrx("0x44b9a0b0f244be1375f907118be1751f8e0bb0cf", "0x8bdce7b955646a7c620565be1117edb77c101e9b", "0x01751f1b5a22aaee0824d68b888f2190a663d768","12345", 100, 2, {from: web3.eth.coinbase, gas: 0x47b760});
  //console.log(contract.get());
  //console.log(contract.btm);

//node 1 to start cwd - node 2 just route
  //startWithdraw(address _fromATM, string trxHash,  address _issueBank, string _account, string _pwd, int _amount)
 //var hash = contract.startWithdraw("0x341ed42cdfb13b897a198cd1c87ddf070e25e6a1","12345","0x7d755eb627014f2d45f7805301937a2eefb97a84","4001","123456",100, {from: web3.eth.coinbase, gas: 0x47b760});
  //  console.log("start cwd: "+hash);
 //   console.log(web3.eth.getTransactionReceipt(hash));

  },
  //checkDebitCallback, checkCreditCallback, commitCallback
  //checkDebitCallback
  
 function(contract, args){  
  if(args._debitBank == ownerBank){// only if this node belongs to the _debitBank, it has to handle this event
    console.log(atmAdd + ": handling checkDebitCallback");
    //simulate a response 1000 here from the debit account ATMP
    //confirmDebit(address _fromAtm, address _debitBank, address _creditBank, string _trxHash, int256 _amount, int256 _fee, int _status)  
    contract.confirmDebit(args._fromAtm, args._debitBank, args._creditBank, args._trxHash, parseInt(args._amount.toString()), parseInt(args._fee.toString()), 1000, {from: web3.eth.coinbase, gas: 0x47b760});  
  }//else just ignore the event
  else{
    console.log(atmAdd + ": do not need to handle checkDebitCallback");
  }
  
 },
 //checkCreditCallbak
 function(contract, args){
  if(args._creditBank == ownerBank){
    console.log(atmAdd + ": handling checkCreditCallbak");
    //confirmCredit(address _fromAtm, address _debitBank, address _creditBank,  string _trxHash, int256 _amount, int256 _fee, int _status)
    //simulate a response 1000 here from the credit account ATMP
    contract.confirmCredit(args._fromAtm, args._debitBank, args._creditBank,  args._trxHash, parseInt(args._amount.toString()), parseInt(args._fee.toString()), 1000, {from: web3.eth.coinbase, gas: 0x47b760});
  }//else just ignore the event
  else{
    console.log(atmAdd + ": do not need to handle checkCreditCallbak");


  }
 },
 //commitCallback
 function(contract, args){
  if(args._fromAtm == atmAdd){
    console.log(atmAdd + ": handling commitCallback");
    
  }else{
      console.log(atmAdd + ": do not need to handle commitCallback");

  }
  

 }
  //,
  //function (args){//to handle authorise complete thing:
  //  console.log("ATM node1: authorised callback:");
  //  //to dispense money
  //  console.log(args);

  //}

);//from ATM1



















  



