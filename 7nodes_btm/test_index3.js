//test code start here:
var txn_request_out_going = require('./contractNode');
var txn_request_bank_a = require('./txn_request_bank_a');






//entryp point
//startTrx(address _fromAtm, address _debitBank, address _creditBank,string _trxHash, int256 _amount, int256 _fee)
//var contractInput ={};//this stands for the transaction input
//contract.startTrx(contractInput._fromAtm，contractInput._debitBank, contractInput._creditBank, contractInput._trxHash, contractInput._amount, contractInput._fee );

var http = require('http');






var url = require('url');

var initConig= function(initCallback){
	http.get({
	  hostname: '119.23.12.79', port: 6101,
	  path: '/balances'
	  }, (res)=>{
	    var result ='';
	    res.on('data',function(chunk){
	      result += chunk;
	    });
	    res.on('end', function(){
	      //completed request
	      var jsonRes = JSON.parse(result);

	      initCallback(jsonRes);

	    });
	  }
	  

	 );
}

var initCallback= function(jsonRes){
	var _httpRes ;

	var thisHash;

	//the callback for CheckDebit event
	var checkDebitCallback = function(contractOutput){
	  //confirmDebit(address _fromAtm, address _debitBank, address _creditBank, string _trxHash, int256 _amount, int256 _fee, int _status) 
	  //to send request to atmp here
	  
	  txn_request_bank_a.debitRequest(contractOutput, postDebitATMPResponse);
	  
	};
	//the callback for CheckCredit event
	var checkCreditCallbak = function(contractOutput){
		txn_request_bank_a.creditRequest(contractOutput, postCreditATMPResponse);
		
	};
	//the callback for Commit event
	var commitCallback = function(contractOutput){	
		//ending point
		console.log("commit");
		commit(contractOutput);

	};
	//"BTM", "http://localhost:7101", "0x02de28d224c23b5aeff3561fbdf7a6ef15212344"
	/*
	Bank1: 0x01751f1b5a22aaee0824d68b888f2190a663d768
	Bank2: 0x8bdce7b955646a7c620565be1117edb77c101e9b
	Bank3: 0xed9d02e382b34818e88b88a309c7fe71e65f419d





	Bank1:
	ATM1: 0xca843569e3427144cead5e4d5999a3d0ccf92b8e
	ATM2: 0x81743ae6efb798ae288fa724aace76dcf8835e37 

	Bank2:
	ATM1: 0x9186eb3d20cbd1f5f992a950d808c4495153abd5
	ATM2: 0x0638e1574728b6d862dd5d3a3e0942c3be47d996

	Bank3:
	ATM1: 0xfc1cb1978f2435c8f2564d2c801f399d11479d0f
	ATM2: 0xc2376f4675a774f120ea688c4756ae49a7020ccd
	*/

	//bankA - ATM1
	console.log(jsonRes);
	console.log("===");
	console.log(jsonRes.accounts);


		//console.log("account:"+contractInitVars.atmAdd);
	var contractInitVars = {contractABI:jsonRes.contractABI, web3http:"http://localhost:7101", atmAdd:jsonRes.accounts[2].atms[0].address, ownerBank:jsonRes.accounts[2].address, contractAdd:jsonRes.contractAdd};
	var contract = txn_request_out_going.initContract(contractInitVars, checkDebitCallback, checkCreditCallbak, commitCallback);




	//the function to be called when ATMP response is received
	//confirmDebit(address _fromAtm, address _debitBank, address _creditBank, string _trxHash, int256 _amount, int256 _fee, int _status)
	var postDebitATMPResponse = function(atmpRes, contractOutput){
		contract.confirmDebit(contractOutput._fromAtm, contractOutput._debitBank, contractOutput._creditBank, contractOutput._trxHash, parseInt(contractOutput._amount.toString()), parseInt(contractOutput._fee.toString()), atmpRes._status, {from: contractInitVars.atmAdd, gas: 0x47b760});  
	};
	//confirmCredit(address _fromAtm, address _debitBank, address _creditBank,  string _trxHash, int256 _amount, int256 _fee, bool _feeFrDebitBank, int _status)
	var postCreditATMPResponse = function(atmpRes, contractOutput){
		contract.confirmCredit(contractOutput._fromAtm, contractOutput._debitBank, contractOutput._creditBank, contractOutput._trxHash, parseInt(contractOutput._amount.toString()), parseInt(contractOutput._fee.toString()), isFeeFromDebit(contractOutput._trxHash), atmpRes._status, {from: contractInitVars.atmAdd, gas: 0x47b760});  
	};
	//only CDP the fee will be paid by credit bank, others - pay by debit bank
	var isFeeFromDebit = function(_trxHash){
		try{
			if(JSON.parse(_trxHash).trxType == "CDP"){
				return false;

			}else{
				return true;
			}
		}catch(err){//ignore json error
			console.log(err);
			return true;
		}
		
	}

	//handle the commit event - i.e. to respond the screen
	var commit = function(contractOutput){
		if(thisHash == contractOutput._trxHash){
			console.log("2:"+_httpRes);
			_httpRes.end("end:"+contractOutput._status+" "+contractOutput._amount);
		}else{
			console.log("ignore previous event");
		}
		
		//_httpRes.writeHead(200,{'Content-Type':'text/html'});
		//
	};

	var startTransaction = function(contractInput, httpRes){
		//_httpRes = httpRes;
		console.log("#############start trx");
		console.log(contractInput);
		console.log(contract.owner);
		var hash=contract.startTrx(contractInput._fromAtm, contractInput._debitBank, contractInput._creditBank, contractInput._trxHash, parseInt(contractInput._amount), parseInt(contractInput._fee), {from: contractInitVars.atmAdd, gas: 0x47b760});
		console.log(hash);

	};

	http.createServer(function (req,httpRes){
		console.log("request----");
		httpRes.writeHead(200,{'Content-Type':'text/html'});
		var data = url.parse(req.url, true).query;
		console.log(data);
		if(data.debitBank){//don't know why there is unknown call with empty data
				var contractInput ={
				_fromAtm: contractInitVars.atmAdd, 
				_debitBank:data.debitBank, 
				_creditBank:contractInitVars.ownerBank, 
				_trxHash: "{abc:'12345'}",
				_amount: parseInt(data.amount),
				_fee: parseInt(data.fee)};//this stands for the transaction input
				_httpRes = httpRes;
				console.log("1:"+_httpRes);
			thisHash = contractInput._trxHash;
			startTransaction(contractInput, httpRes);
		}else{
			console.log("input is empty");

			
		}
			


		
	}).listen("7775");
}

initConig(initCallback);

