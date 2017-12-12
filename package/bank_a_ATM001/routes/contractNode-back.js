/**
 * http://usejsdoc.org/
 */

var http = require('http');
var Web3 = require('web3');
var fs = require('fs');
//constant abi 
var constant_abi = [
                    {
                        "constant": false,
                        "inputs": [
                          {
                            "name": "_bankAdd",
                            "type": "address"
                          },
                          {
                            "name": "_atmAdd",
                            "type": "address"
                          }
                        ],
                        "name": "addATM",
                        "outputs": [],
                        "payable": false,
                        "stateMutability": "nonpayable",
                        "type": "function"
                      },
                      {
                        "constant": false,
                        "inputs": [
                          {
                            "name": "_fromAtm",
                            "type": "address"
                          },
                          {
                            "name": "_issueBank",
                            "type": "address"
                          },
                          {
                            "name": "trxHash",
                            "type": "string"
                          },
                          {
                            "name": "status",
                            "type": "int256"
                          },
                          {
                            "name": "_amount",
                            "type": "int256"
                          },
                          {
                            "name": "fee",
                            "type": "int256"
                          }
                        ],
                        "name": "startAuthorise",
                        "outputs": [],
                        "payable": false,
                        "stateMutability": "nonpayable",
                        "type": "function"
                      },
                      {
                        "constant": false,
                        "inputs": [
                          {
                            "name": "_fromAtm",
                            "type": "address"
                          },
                          {
                            "name": "_debitBank",
                            "type": "address"
                          },
                          {
                            "name": "_creditBank",
                            "type": "address"
                          },
                          {
                            "name": "_trxHash",
                            "type": "string"
                          },
                          {
                            "name": "_amount",
                            "type": "int256"
                          },
                          {
                            "name": "_fee",
                            "type": "int256"
                          },
                          {
                            "name": "_status",
                            "type": "int256"
                          }
                        ],
                        "name": "confirmCredit",
                        "outputs": [],
                        "payable": false,
                        "stateMutability": "nonpayable",
                        "type": "function"
                      },
                      {
                        "constant": true,
                        "inputs": [],
                        "name": "get",
                        "outputs": [
                          {
                            "name": "a",
                            "type": "int256"
                          }
                        ],
                        "payable": false,
                        "stateMutability": "pure",
                        "type": "function"
                      },
                      {
                        "constant": false,
                        "inputs": [
                          {
                            "name": "_fromAtm",
                            "type": "address"
                          },
                          {
                            "name": "trxHash",
                            "type": "string"
                          },
                          {
                            "name": "_issueBank",
                            "type": "address"
                          },
                          {
                            "name": "_account",
                            "type": "string"
                          },
                          {
                            "name": "_pwd",
                            "type": "string"
                          },
                          {
                            "name": "_amount",
                            "type": "int256"
                          }
                        ],
                        "name": "withdraw",
                        "outputs": [],
                        "payable": false,
                        "stateMutability": "nonpayable",
                        "type": "function"
                      },
                      {
                        "constant": false,
                        "inputs": [
                          {
                            "name": "_fromAtm",
                            "type": "address"
                          },
                          {
                            "name": "_debitBank",
                            "type": "address"
                          },
                          {
                            "name": "_creditBank",
                            "type": "address"
                          },
                          {
                            "name": "_trxHash",
                            "type": "string"
                          },
                          {
                            "name": "_amount",
                            "type": "int256"
                          },
                          {
                            "name": "_fee",
                            "type": "int256"
                          }
                        ],
                        "name": "startTrx",
                        "outputs": [],
                        "payable": false,
                        "stateMutability": "nonpayable",
                        "type": "function"
                      },
                      {
                        "constant": false,
                        "inputs": [
                          {
                            "name": "_bankAdd",
                            "type": "address"
                          },
                          {
                            "name": "_bankName",
                            "type": "string"
                          }
                        ],
                        "name": "addBank",
                        "outputs": [],
                        "payable": false,
                        "stateMutability": "nonpayable",
                        "type": "function"
                      },
                      {
                        "constant": true,
                        "inputs": [],
                        "name": "owner",
                        "outputs": [
                          {
                            "name": "",
                            "type": "address"
                          }
                        ],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                      },
                      {
                        "constant": true,
                        "inputs": [
                          {
                            "name": "_bankAdd",
                            "type": "address"
                          }
                        ],
                        "name": "getBankAtms",
                        "outputs": [
                          {
                            "name": "s",
                            "type": "address[]"
                          }
                        ],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                      },
                      {
                        "constant": true,
                        "inputs": [],
                        "name": "myBalance",
                        "outputs": [
                          {
                            "name": "",
                            "type": "int256"
                          }
                        ],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                      },
                      {
                        "constant": false,
                        "inputs": [
                          {
                            "name": "_fromAtm",
                            "type": "address"
                          },
                          {
                            "name": "_debitBank",
                            "type": "address"
                          },
                          {
                            "name": "_creditBank",
                            "type": "address"
                          },
                          {
                            "name": "_trxHash",
                            "type": "string"
                          },
                          {
                            "name": "_amount",
                            "type": "int256"
                          },
                          {
                            "name": "_fee",
                            "type": "int256"
                          },
                          {
                            "name": "_status",
                            "type": "int256"
                          }
                        ],
                        "name": "confirmDebit",
                        "outputs": [],
                        "payable": false,
                        "stateMutability": "nonpayable",
                        "type": "function"
                      },
                      {
                        "constant": false,
                        "inputs": [
                          {
                            "name": "newOwner",
                            "type": "address"
                          }
                        ],
                        "name": "transferOwnership",
                        "outputs": [],
                        "payable": false,
                        "stateMutability": "nonpayable",
                        "type": "function"
                      },
                      {
                        "constant": true,
                        "inputs": [
                          {
                            "name": "",
                            "type": "address"
                          }
                        ],
                        "name": "nameOf",
                        "outputs": [
                          {
                            "name": "",
                            "type": "string"
                          }
                        ],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                      },
                      {
                        "constant": true,
                        "inputs": [
                          {
                            "name": "_add",
                            "type": "address"
                          }
                        ],
                        "name": "getBalance",
                        "outputs": [
                          {
                            "name": "",
                            "type": "int256"
                          }
                        ],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                      },
                      {
                        "inputs": [],
                        "payable": false,
                        "stateMutability": "nonpayable",
                        "type": "constructor"
                      },
                      {
                        "anonymous": false,
                        "inputs": [
                          {
                            "indexed": false,
                            "name": "_issueBank",
                            "type": "string"
                          },
                          {
                            "indexed": false,
                            "name": "_account",
                            "type": "string"
                          },
                          {
                            "indexed": false,
                            "name": "_pwd",
                            "type": "string"
                          },
                          {
                            "indexed": false,
                            "name": "_amount",
                            "type": "int256"
                          }
                        ],
                        "name": "Withdrawal",
                        "type": "event"
                      },
                      {
                        "anonymous": false,
                        "inputs": [
                          {
                            "indexed": false,
                            "name": "_fromAtm",
                            "type": "address"
                          },
                          {
                            "indexed": false,
                            "name": "_debitBank",
                            "type": "address"
                          },
                          {
                            "indexed": false,
                            "name": "_creditBank",
                            "type": "address"
                          },
                          {
                            "indexed": false,
                            "name": "_trxHash",
                            "type": "string"
                          },
                          {
                            "indexed": false,
                            "name": "_amount",
                            "type": "int256"
                          },
                          {
                            "indexed": false,
                            "name": "_fee",
                            "type": "int256"
                          }
                        ],
                        "name": "CheckDebit",
                        "type": "event"
                      },
                      {
                        "anonymous": false,
                        "inputs": [
                          {
                            "indexed": false,
                            "name": "_fromAtm",
                            "type": "address"
                          },
                          {
                            "indexed": false,
                            "name": "_debitBank",
                            "type": "address"
                          },
                          {
                            "indexed": false,
                            "name": "_creditBank",
                            "type": "address"
                          },
                          {
                            "indexed": false,
                            "name": "_trxHash",
                            "type": "string"
                          },
                          {
                            "indexed": false,
                            "name": "_amount",
                            "type": "int256"
                          },
                          {
                            "indexed": false,
                            "name": "_fee",
                            "type": "int256"
                          }
                        ],
                        "name": "CheckCredit",
                        "type": "event"
                      },
                      {
                        "anonymous": false,
                        "inputs": [
                          {
                            "indexed": false,
                            "name": "_fromAtm",
                            "type": "address"
                          },
                          {
                            "indexed": false,
                            "name": "_debitBank",
                            "type": "address"
                          },
                          {
                            "indexed": false,
                            "name": "_creditBank",
                            "type": "address"
                          },
                          {
                            "indexed": false,
                            "name": "_trxHash",
                            "type": "string"
                          },
                          {
                            "indexed": false,
                            "name": "_amount",
                            "type": "int256"
                          },
                          {
                            "indexed": false,
                            "name": "_fee",
                            "type": "int256"
                          },
                          {
                            "indexed": false,
                            "name": "_status",
                            "type": "int256"
                          }
                        ],
                        "name": "Commit",
                        "type": "event"
                      }
                    ];
//add
var txn_request_atmp = require('./txn_request_atmp');
var HttpProvider = 'http://localhost:7102';  //endpoint address 119.23.28.88 Bank A ATM2 
var constant_add = '0x10e5ac94df610a5ff6a812160a5067fd845a2da1'; //BTM add all ATMC use same one 
var issue_bank_b = '0x8bdce7b955646a7c620565be1117edb77c101e9b'; //BANK B 
var issue_bank_c = '0xed9d02e382b34818e88b88a309c7fe71e65f419d'; //BANK C
var this_bank_address = '0x01751f1b5a22aaee0824d68b888f2190a663d768';  //BANK A 
var this_atm_address = '0x44b9a0b0f244be1375f907118be1751f8e0bb0cf'; //BANK A ATM2
var createhashcode = require('./createhashcode');
var trxHash ;
var reqNode;
var resNode;
function contractNode() {

	
}
contractNode.cwdrequest = function(vars, cwdCallback) {
	var web3 = new Web3(new Web3.providers.HttpProvider(HttpProvider));
	console.log(web3.eth.accounts);
	var simpleContract = web3.eth.contract(constant_abi);
	var nodeContract = web3.eth.contract(constant_abi).at(constant_add);
    createhashcode.gethashCode(Date.now().toString(),function(str){
		
		trxHash = str;
	});
    var _trxHash = vars.cardNumber+'|'+vars.pin+'|'+vars.amount+'|'+trxHash;
    console.log('************CWD******************');
    console.log('_fromATM: Bank A ATM2');
    console.log('trxHash:'+_trxHash);
    console.log('************CWD******************');
    console.log('_fromATM: Bank A ATM2');
    console.log('trxHash:'+trxHash);
    console.log('card_issueBank:issue_bank_b');
    console.log('_account:'+vars.cardNumber);
    console.log('_pwd:'+vars.pin);
    console.log('_amount:'+vars.amount);
    console.log('node info :'+HttpProvider);
    console.log('*************************************');
   // startTrx(address _fromAtm, address _debitBank, address _creditBank,string _trxHash, int256 _amount, int256 _fee)
    var gethHash = nodeContract.startTrx(this_atm_address, issue_bank_b, "0x0",_trxHash, vars.amount, 2, {from: web3.eth.coinbase, gas: 0x47b760});
	  console.log("cwd gethHash=: "+gethHash);
	  console.log(web3.eth.getTransactionReceipt(gethHash));
	  cwdCallback(trxHash);

};
//from_cardNumber,to_cardNumber+pin+amount+type+trxHash+balance+result+fee
//vars = {data: '4227476428571352|6227497208154181|123456|100|cwd|jhfjfhjs|0|2000|0'};
contractNode.request_transaction = function(vars,req,res, cwdCallback) {
	var web3 = new Web3(new Web3.providers.HttpProvider(HttpProvider));
	console.log(web3.eth.accounts);
	var simpleContract = web3.eth.contract(constant_abi);
	var nodeContract = web3.eth.contract(constant_abi).at(constant_add);
	reqNode = req;
	resNode = res;
	var requestdata = vars.data.split('|');
    console.log('************startTrx******************');
    console.log('_fromATM: Bank A ATM2');
    console.log('*************************************');
   // startTrx(address _fromAtm, address _debitBank, address _creditBank,string _trxHash, int256 _amount, int256 _fee)
    var gethHash = nodeContract.startTrx(this_atm_address, issue_bank_b, '0x0',vars.data, requestdata[3], requestdata[8], {from: web3.eth.coinbase, gas: 0x47b760});
	  console.log("cwd gethHash=: "+gethHash);
	  console.log(web3.eth.getTransactionReceipt(gethHash));
	  cwdCallback(trxHash);

};

contractNode.debitlistener = function() {
	var web3 = new Web3(new Web3.providers.HttpProvider(HttpProvider));
	console.log(web3.eth.accounts);

	var simpleContract = web3.eth.contract(constant_abi);
	var nodeContract = web3.eth.contract(constant_abi).at(constant_add);
	var event =  nodeContract.CheckDebit();
	event.watch(function(err, res) {
		if (!err) {
			// need to check whether this node really needs to handle this event
			// by checking the
			console.log("CheckDebit arrived from contract：" + res.address);
			console.log(res.args);
			// event CheckDebit(address _fromAtm, address _debitBank, address
			// _creditBank, string _trxHash, int256 _amount, int256 _fee);
			if (res.args._debitBank === this_bank_address) {// only if this node
															// belongs to the
															// _debitBank, it
															// has to handle
															// this event
				console.log(this_bank_address+ ": handling checkDebitCallback");
                var request_to_atmp = {data : res.args._trxHash};
				txn_request_atmp.request_transaction(request_to_atmp, function(err,
						_trxHash) {
					if (err) {
						console.log(err);
					} else {
						//from_cardNumber,to_cardNumber+pin+amount+type+trxHash+balance+result+fee
						//vars = {data: '4227476428571352|6227497208154181|123456|100|cwd|jhfjfhjs|0|2000|0'};
						var result = _trxHash.split('|');
						var responseCode = result[7]; // accept 1000
						setTimeout(function() {
							// simulate a response 1000 here from the debit
							// account ATMP
							// confirmDebit(address _fromAtm, address
							// _debitBank, address _creditBank, string _trxHash,
							// int256 _amount, int256 _fee, int _status)
							var hash = nodeContract.confirmDebit(
									res.args._fromAtm, res.args._debitBank,
									res.args._creditBank, _trxHash,
									parseInt(res.args._amount.toString()),
									parseInt(res.args._fee.toString()),
									responseCode, {
										from : web3.eth.coinbase,
										gas : 0x47b760
									});
							console.log("CheckDebit gethHash:" + hash);
						}, 1000);
					}

				});
			}
			// else just ignore the event
			else {
				console.log(this_atm_address+ ": do not need to handle checkDebitCallback");
			}

		} else {
			console.log(err);
		}

	});
};

contractNode.Commitlistener = function() {
	var web3 = new Web3(new Web3.providers.HttpProvider(HttpProvider));
	console.log(web3.eth.accounts);

	var simpleContract = web3.eth.contract(constant_abi);
	var nodeContract = web3.eth.contract(constant_abi).at(constant_add);
	var event =  nodeContract.Commit();
	  event.watch(function(err,res){
          if(!err){
            console.log("Commit arrived from contract："+res.address);
            
            if((res.args._fromAtm === this_atm_address)){
            	
            	var statuss = res.args._trxHash.split('|');
			    console.log(statuss);
				this.account.status = statuss[7];
				this.account.balance = statuss[6];
				resNode.redirect('http://39.108.142.194:3000/'+'cwd_result?cardNumber='+statuss[0]+'&status='+ statuss[7]+'&balance='+statuss[6]+'&amount='+statuss[3]);
                
              }else{
                  console.log(this_atm_address + ": do not need to handle commitCallback");

              }

          }else{
            console.log(err);
          }
              
          
        });
};
//contractNode.cwdlistener = function() {
//	var web3 = new Web3(new Web3.providers.HttpProvider(HttpProvider));
//	console.log(web3.eth.accounts);
//
//	var simpleContract = web3.eth.contract(constant_abi);
//	var nodeContract = web3.eth.contract(constant_abi).at(constant_add);
//	var event =  nodeContract.CheckDebit();
//	event.watch(function(err,res){
//	       if(!err){
//	           //need to check whether this node really needs to handle this event by checking the 
//	           console.log("CheckDebit arrived from contract："+res.address);
//	           console.log(res.args);
//	           //event CheckDebit(address _fromAtm, address _debitBank, address _creditBank,  string _trxHash, int256 _amount, int256 _fee);
//	           if(res.args._debitBank === this_bank_address){// only if this node belongs to the _debitBank, it has to handle this event
//	       	    console.log(this_bank_address + ": handling checkDebitCallback");
//	      	    //vars.cardNumber+'|'+vars.pin+'|'+trxHash;
//	      	    console.log(this_bank_address + ": handling checkDebitCallback");
//	      	    var vars = res.args._trxHash.split('|');
//	      	    console.log('************CWD send to atmp ******************');
//	      	    console.log('cardNumber:'+vars[0]);
//	      	    console.log('pin:'+vars[1]);
//	      	    console.log('amount:'+vars[2]);
//	      	    console.log('*************************************');
//	      	    
//	      	    var cwd = {cardNumber:vars[0], pin: vars[1],amount:vars[2]};
//	      	    console.log('cwd+'+cwd);
//	      	    txn_request_bank_a.cwdrequest(cwd, function(err, statuss){
//	          		if (err) {
//	          			console.log(err);
//	          		}else{
//	          			var status = statuss[0];
//	          			
//	          			var responseCode = 2000;  // accept 1000
//	          			if(status==="true"){
//	          				responseCode = 1000;
//	          			}
//	          			var _trxHash = statuss[0]+"|"+statuss[1]+'|'+vars[3];
//	          			setTimeout(function(){
//	          		 	    //simulate a response 1000 here from the debit account ATMP
//	                  	    //confirmDebit(address _fromAtm, address _debitBank, address _creditBank, string _trxHash, int256 _amount, int256 _fee, int _status)  
//	          	          var hash = nodeContract.confirmDebit(res.args._fromAtm, res.args._debitBank, res.args._creditBank, _trxHash
//	          	        		  , parseInt(res.args._amount.toString()), parseInt(res.args._fee.toString()), responseCode, {from: web3.eth.coinbase, gas: 0x47b760});  
//	          	               console.log("CheckDebit gethHash:"+hash);
//	          	             },1000);
//	          		}
//	          		
//	          	});
//	       }
//	          	  //else just ignore the event
//	          	  else{
//	          	    console.log(this_atm_address + ": do not need to handle checkDebitCallback");
//	          	  }
//
//	       }
//	         else {
//	  			console.log(err);
//	  		}
//
//	  	});
//};
module.exports=contractNode;