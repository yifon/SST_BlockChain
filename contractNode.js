/**
 * http://usejsdoc.org/
 */

var http = require('http');
var Web3 = require('web3');
var fs = require('fs');
var txn_request_hsbc = require('./txn_request_hsbc');
var HttpProvider = 'http://localhost:22002';  //endpoint address
//constant abi 
var constant_abi = [
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
                            "name": "trxHash",
                            "type": "string"
                          },
                          {
                            "name": "status",
                            "type": "int256"
                          },
                          {
                            "name": "fee",
                            "type": "int256"
                          }
                        ],
                        "name": "postAuthorise",
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
                            "name": "x",
                            "type": "int256"
                          }
                        ],
                        "payable": false,
                        "stateMutability": "view",
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
                        "inputs": [],
                        "name": "getA",
                        "outputs": [
                          {
                            "name": "x",
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
                            "name": "_fromATM",
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
                        "name": "startWithdraw",
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
                            "name": "trxHash",
                            "type": "string"
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
                        "name": "receiveWithdrawal",
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
                        "inputs": [
                          {
                            "name": "_btm",
                            "type": "address"
                          }
                        ],
                        "payable": false,
                        "stateMutability": "nonpayable",
                        "type": "constructor"
                      },
                      {
                        "anonymous": false,
                        "inputs": [
                          {
                            "indexed": false,
                            "name": "trxHash",
                            "type": "string"
                          },
                          {
                            "indexed": false,
                            "name": "status",
                            "type": "int256"
                          },
                          {
                            "indexed": false,
                            "name": "fee",
                            "type": "int256"
                          }
                        ],
                        "name": "WithdrawalAuthorisation",
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
                            "name": "trxHash",
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
                        "name": "WithdrawalRequest",
                        "type": "event"
                      }
                    ];
//add
var constant_add = '0xf1d8A2906F215d31f7D46A430D1b1A4Ddf05F1E6'; //BTM
var card_issue_bank = '0xed9d02e382b34818e88b88a309c7fe71e65f419d'; //BANK2 
var this_bank_address = '0xce47a89d676d891b7adbc6812749c73fcf600484';  //BANK1 play as node2;  for incoming address
var this_atm_address = '0x341ed42cdfb13b897a198cd1c87ddf070e25e6a1'; //play as node1
var nodeContract;
var createhashcode = require('./createhashcode');
var trxHash ;
function contractNode() {

	
}
contractNode.cwdrequest = function(vars, authorisedCallback) {
	console.log(vars.cardNumber);
//	console.log(vars.trxHash);
	console.log(vars.pin);
	console.log(vars.amount);
	var web3 = new Web3(new Web3.providers.HttpProvider(HttpProvider));
	console.log(web3.eth.accounts);
	console.log('atm address='+this_atm_address);
	nodeContract = web3.eth.contract(constant_abi).at(this_atm_address);
    createhashcode.gethashCode(Date.now().toString(),function(str){
		
		trxHash = str;
	});
	//startWithdraw(address _fromATM, string trxHash,  address _issueBank, string _account, string _pwd, int _amount)
	var hash = nodeContract.startWithdraw(
			this_atm_address, trxHash,
			card_issue_bank, vars.cardNumber, vars.pin,
			vars.amount, {
				from : web3.eth.coinbase,
				gas : 0x47b760
			});
	  console.log("start cwd hash=: "+hash);
	  console.log(web3.eth.getTransactionReceipt(hash));
	var event = nodeContract.WithdrawalAuthorisation();
	event.watch(function(err, res) {
		if (!err) {
			console.log("WithdrawalAuthorisation arrived at contract："+ res.address);
			console.log(res.args);
			if(vars.trxHash===res.trxHash){
			  authorisedCallback(res.args);
			}
			

		} else {
			console.log(err);
		}

	});
};
//contractNode.inqrequest = function(vars, authorisedCallback) {
//	//startWithdraw(address _fromATM, string trxHash,  address _issueBank, string _account, string _pwd, int _amount)
//	console.log(vars.cardNumber);
//	console.log(vars.trxHash);
//	console.log(vars.pin);
//	console.log(vars.amount);
//	nodeContract = this.web3.eth.contract(constant_abi).at(constant_add);
//	
//	
//	nodeContract.startWithdraw(
//			"0xb6d55e2e50e8cfbaf87ad6f0e29fbf663104a590", vars.trxHash,
//			"0xed9d02e382b34818e88b88a309c7fe71e65f419d", vars.cardNumber, vars.pin,
//			vars.amount, {
//				from : web3.eth.coinbase,
//				gas : 0x47b760
//			});
//	var event = nodeContract.WithdrawalAuthorisation();
//	event.watch(function(err, res) {
//		if (!err) {
//			console.log("WithdrawalAuthorisation arrived at contract："+ res.address);
//			console.log(res.args);
//			authorisedCallback(res.args);
//
//		} else {
//			console.log(err);
//		}
//
//	});
//};
//contractNode.cdprequest = function(vars, authorisedCallback) {
//	//startWithdraw(address _fromATM, string trxHash,  address _issueBank, string _account, string _pwd, int _amount)
//	console.log(vars.cardNumber);
//	console.log(vars.trxHash);
//	console.log(vars.pin);
//	console.log(vars.amount);
//	nodeContract = this.web3.eth.contract(constant_abi).at(constant_add);
//	
//	
//	nodeContract.startWithdraw(
//			"0xb6d55e2e50e8cfbaf87ad6f0e29fbf663104a590", vars.trxHash,
//			"0xed9d02e382b34818e88b88a309c7fe71e65f419d", vars.cardNumber, vars.pin,
//			vars.amount, {
//				from : web3.eth.coinbase,
//				gas : 0x47b760
//			});
//	var event = nodeContract.WithdrawalAuthorisation();
//	event.watch(function(err, res) {
//		if (!err) {
//			console.log("WithdrawalAuthorisation arrived at contract："+ res.address);
//			console.log(res.args);
//			authorisedCallback(res.args);
//
//		} else {
//			console.log(err);
//		}
//
//	});
//};

contractNode.cwdlistener = function() {
	//startWithdraw(address _fromATM, string trxHash,  address _issueBank, string _account, string _pwd, int _amount)
	//startWithdraw(address _fromATM, string trxHash,  address _issueBank, string _account, string _pwd, int _amount)
	var web3 = new Web3(new Web3.providers.HttpProvider(HttpProvider));
	console.log(web3.eth.accounts);
	nodeContract = web3.eth.contract(constant_abi).at(this_atm_address);
	
	var event = nodeContract.WithdrawalAuthorisation();
	
	   event.watch(function(err,res){
           if(!err){
             console.log("WithdrawalRequest arrived at contract："+res.address);
             console.log(res.args);
             //to call atmp 
             //authorised: function(_fromAtm, _issueBank, trxHash, status, _amount,int fee)
             //authorised();//to simulate atmp response
            var cwd = {cardNumber: res.args._account, pin: res.args._pwd,amount:res.args._amount};
         	txn_request_hsbc.cwdrequest(cwd, function(err, statuss){
        		if (err) {
        			console.log(err);
        		}else{
        			var status = statuss[0];
        			var balance = statuss[1];
        			var responseCode = "2000";  // accept 1000
        			if(status==="true"){
        				responseCode = "1000";
        			}
        			setTimeout(function(){
        				//authorised: function(_fromAtm, _issueBank, trxHash, status, _amount,int fee)
        	          var hash=nodeContract.startAuthorise(res.args._fromAtm,this_atm_address,res.args.trxHash,responseCode,res.args._amount,2, {from: web3.eth.coinbase, gas: 0x47b760});
        	               console.log("start auth:"+hash);
        	             },1000);
        		}
        		
        	});
             //nodeContract.startAuthorise(address _fromAtm, address _issueBank, string trxHash, int status, int _amount,int fee);
           //  nodeContract.startAuthorise(address _fromAtm, address _issueBank, string trxHash, int status, int _amount,int fee) 
           }else{
             console.log(err);
           }
           
         });
};

//not in use
//contractNode.inqlistener = function(vars, authorisedCallback) {
//	//startWithdraw(address _fromATM, string trxHash,  address _issueBank, string _account, string _pwd, int _amount)
//	console.log(vars.cardNumber);
//	console.log(vars.trxHash);
//	console.log(vars.pin);
//	console.log(vars.amount);
//	nodeContract = this.web3.eth.contract(constant_abi).at(constant_add);
//	
//	
//	nodeContract.startWithdraw(
//			"0xb6d55e2e50e8cfbaf87ad6f0e29fbf663104a590", vars.trxHash,
//			"0xed9d02e382b34818e88b88a309c7fe71e65f419d", vars.cardNumber, vars.pin,
//			vars.amount, {
//				from : web3.eth.coinbase,
//				gas : 0x47b760
//			});
//	var event = nodeContract.WithdrawalAuthorisation();
//	event.watch(function(err, res) {
//		if (!err) {
//			console.log("WithdrawalAuthorisation arrived at contract："+ res.address);
//			console.log(res.args);
//			authorisedCallback(res.args);
//
//		} else {
//			console.log(err);
//		}
//
//	});
//};
////not in use
//contractNode.cdplistener = function(vars, authorisedCallback) {
//	//startWithdraw(address _fromATM, string trxHash,  address _issueBank, string _account, string _pwd, int _amount)
//	console.log(vars.cardNumber);
//	console.log(vars.trxHash);
//	console.log(vars.pin);
//	console.log(vars.amount);
//	nodeContract = this.web3.eth.contract(constant_abi).at(constant_add);
//	
//	
//	nodeContract.startWithdraw(
//			"0xb6d55e2e50e8cfbaf87ad6f0e29fbf663104a590", vars.trxHash,
//			"0xed9d02e382b34818e88b88a309c7fe71e65f419d", vars.cardNumber, vars.pin,
//			vars.amount, {
//				from : web3.eth.coinbase,
//				gas : 0x47b760
//			});
//	var event = nodeContract.WithdrawalAuthorisation();
//	event.watch(function(err, res) {
//		if (!err) {
//			console.log("WithdrawalAuthorisation arrived at contract："+ res.address);
//			console.log(res.args);
//			authorisedCallback(res.args);
//
//		} else {
//			console.log(err);
//		}
//
//	});
//};
module.exports=contractNode;