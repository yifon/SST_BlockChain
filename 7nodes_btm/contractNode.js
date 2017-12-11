
function contractNode(){}

//the init function - which returns a BTM contract instance. Pls call this function only once
contractNode.initContract = function(vars, checkDebitCallback, checkCreditCallbak, commitCallback){
  
  console.log("initContract");

  var Web3 = require('web3');
  var fs=require('fs');
  var web3 = new Web3(new Web3.providers.HttpProvider(vars.web3http));//pls note the port to be deployed, one port = one instance, different nodes may have different behaviors   
  web3.personal.unlockAccount(web3.eth.accounts[0],'',0);

  
  var abi = vars.contractABI;
  var contract = web3.eth.contract(abi).at(vars.contractAdd);
  //the CheckDebit event handling
  contract.CheckDebit().watch(function(err,res){
    if(!err){
      //need to check whether this node really needs to handle this event by checking the 
      console.log("CheckDebit arrived from contract："+res.address);
      console.log(res.args);
      if(res.args._debitBankAtm == vars.atmAdd){// only if this node belongs to the _debitBank, it has to handle this event
        console.log(vars.atmAdd + ": handling checkDebitCallback");
        checkDebitCallback(res.args);
        
      }//else just ignore the event
      else{
        console.log(vars.atmAdd + ": do not need to handle checkDebitCallback");
      }      

    }else{
      console.log(err);
    }
        
    
  });

  contract.CheckCredit().watch(function(err,res){
    if(!err){
      console.log("CheckCredit arrived from contract："+res.address);
      console.log(res.args);
      if(res.args._creditBankAtm == vars.atmAdd){
          console.log(vars.atmAdd + ": handling checkCreditCallbak");
          checkCreditCallbak(res.args);
        }//else just ignore the event
        else{
          console.log(vars.atmAdd + ": do not need to handle checkCreditCallbak");
        }

    }else{
      console.log(err);
    }
        
    
  });

  contract.Commit().watch(function(err,res){
    if(!err){
      console.log("Commit arrived from contract："+res.address);
      console.log(res.args);
      if(res.args._fromAtm == vars.atmAdd){
          console.log(vars.atmAdd + ": handling commitCallback");
          commitCallback(res.args);
          
        }else{
            console.log(vars.atmAdd + ": do not need to handle commitCallback");

        }

    }else{
      console.log(err);
    }
        
    
  });
        
  return contract;

};


module.exports=contractNode;



















  



