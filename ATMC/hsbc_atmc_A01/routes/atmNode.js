
var constant_add = '0xb6d55e2e50e8cfbaf87ad6f0e29fbf663104a590'; //hsbc address
var card_issue_bank = "0xed9d02e382b34818e88b88a309c7fe71e65f419d"; //hase card//TODO 
var this_bank_address = '0x353c1c4aa32e54ae8278403d27e287c4b43ffdf1 ';  //play as node2;  for incoming address
var this_atm_address = '0xb6d55e2e50e8cfbaf87ad6f0e29fbf663104a590'; //play as node1
var nodeContract;
var createhashcode = require('./createhashcode');
var trxHash ;
function contractNode() {

	
}
contractNode.cwdrequest = function(vars, authorisedCallback) {
	console.log(vars.cardNumber);
	console.log(vars.trxHash);
	console.log(vars.pin);
	console.log(vars.amount);
	nodeContract = this.web3.eth.contract(constant_abi).at(constant_add);
    createhashcode.gethashCode(Date.now().toString(),function(str){
		
		trxHash = str;
	});
	//startWithdraw(address _fromATM, string trxHash,  address _issueBank, string _account, string _pwd, int _amount)
	nodeContract.startWithdraw(
			this_atm_address, trxHash,
			card_issue_bank, vars.cardNumber, vars.pin,
			vars.amount, {
				from : web3.eth.coinbase,
				gas : 0x47b760
			});
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
contractNode.inqrequest = function(vars, authorisedCallback) {
	//startWithdraw(address _fromATM, string trxHash,  address _issueBank, string _account, string _pwd, int _amount)
	console.log(vars.cardNumber);
	console.log(vars.trxHash);
	console.log(vars.pin);
	console.log(vars.amount);
	nodeContract = this.web3.eth.contract(constant_abi).at(constant_add);
	
	
	nodeContract.startWithdraw(
			"0xb6d55e2e50e8cfbaf87ad6f0e29fbf663104a590", vars.trxHash,
			"0xed9d02e382b34818e88b88a309c7fe71e65f419d", vars.cardNumber, vars.pin,
			vars.amount, {
				from : web3.eth.coinbase,
				gas : 0x47b760
			});
	var event = nodeContract.WithdrawalAuthorisation();
	event.watch(function(err, res) {
		if (!err) {
			console.log("WithdrawalAuthorisation arrived at contract："+ res.address);
			console.log(res.args);
			authorisedCallback(res.args);

		} else {
			console.log(err);
		}

	});
};
contractNode.cdprequest = function(vars, authorisedCallback) {
	//startWithdraw(address _fromATM, string trxHash,  address _issueBank, string _account, string _pwd, int _amount)
	console.log(vars.cardNumber);
	console.log(vars.trxHash);
	console.log(vars.pin);
	console.log(vars.amount);
	nodeContract = this.web3.eth.contract(constant_abi).at(constant_add);
	
	
	nodeContract.startWithdraw(
			"0xb6d55e2e50e8cfbaf87ad6f0e29fbf663104a590", vars.trxHash,
			"0xed9d02e382b34818e88b88a309c7fe71e65f419d", vars.cardNumber, vars.pin,
			vars.amount, {
				from : web3.eth.coinbase,
				gas : 0x47b760
			});
	var event = nodeContract.WithdrawalAuthorisation();
	event.watch(function(err, res) {
		if (!err) {
			console.log("WithdrawalAuthorisation arrived at contract："+ res.address);
			console.log(res.args);
			authorisedCallback(res.args);

		} else {
			console.log(err);
		}

	});
};

contractNode.cwdlistener = function() {
	//startWithdraw(address _fromATM, string trxHash,  address _issueBank, string _account, string _pwd, int _amount)
	//startWithdraw(address _fromATM, string trxHash,  address _issueBank, string _account, string _pwd, int _amount)
	
	nodeContract = this.web3.eth.contract(constant_abi).at(constant_add);
	
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
contractNode.inqlistener = function(vars, authorisedCallback) {
	//startWithdraw(address _fromATM, string trxHash,  address _issueBank, string _account, string _pwd, int _amount)
	console.log(vars.cardNumber);
	console.log(vars.trxHash);
	console.log(vars.pin);
	console.log(vars.amount);
	nodeContract = this.web3.eth.contract(constant_abi).at(constant_add);
	
	
	nodeContract.startWithdraw(
			"0xb6d55e2e50e8cfbaf87ad6f0e29fbf663104a590", vars.trxHash,
			"0xed9d02e382b34818e88b88a309c7fe71e65f419d", vars.cardNumber, vars.pin,
			vars.amount, {
				from : web3.eth.coinbase,
				gas : 0x47b760
			});
	var event = nodeContract.WithdrawalAuthorisation();
	event.watch(function(err, res) {
		if (!err) {
			console.log("WithdrawalAuthorisation arrived at contract："+ res.address);
			console.log(res.args);
			authorisedCallback(res.args);

		} else {
			console.log(err);
		}

	});
};
//not in use
contractNode.cdplistener = function(vars, authorisedCallback) {
	//startWithdraw(address _fromATM, string trxHash,  address _issueBank, string _account, string _pwd, int _amount)
	console.log(vars.cardNumber);
	console.log(vars.trxHash);
	console.log(vars.pin);
	console.log(vars.amount);
	nodeContract = this.web3.eth.contract(constant_abi).at(constant_add);
	
	
	nodeContract.startWithdraw(
			"0xb6d55e2e50e8cfbaf87ad6f0e29fbf663104a590", vars.trxHash,
			"0xed9d02e382b34818e88b88a309c7fe71e65f419d", vars.cardNumber, vars.pin,
			vars.amount, {
				from : web3.eth.coinbase,
				gas : 0x47b760
			});
	var event = nodeContract.WithdrawalAuthorisation();
	event.watch(function(err, res) {
		if (!err) {
			console.log("WithdrawalAuthorisation arrived at contract："+ res.address);
			console.log(res.args);
			authorisedCallback(res.args);

		} else {
			console.log(err);
		}

	});
};
module.exports=contractNode;