/*
 * GET home page.
 */
var Client = require('./socket_client');
var client = Client.init();
client.emit("userName", "Bank A A001 Connected");
var accounts = require('./accounts');
var txn_request_atmp = require('./txn_request_atmp');
var createhashcode = require('./createhashcode');
var txn_request_out_going = require('./contractNode');
//need change to the real server once in prod
var routers_url = 'http://39.108.142.194:3000/';
//var routers_url = 'http://localhost:3000/';
var account = new accounts();
//**********************//
var txnType = 'INQ';
var cardBank = '';
var sourceATM = 'A001';
var minerATM = 'A001';
//**********************//
var this_bank = 'bank_a';

var bank_a = 'bank_a';
var bank_b = 'bank_b';
var bank_c = 'bank_c';
var trxHash;
var fs = require('fs');

//**********************************//Bank A ATM02*************************************//
//**********************************deploy this package to 119.23.28.88*************************************//
//*****************************0xca843569e3427144cead5e4d5999a3d0ccf92b8e  ************************************//
//*****************************Node2 port 7101 ************************************//
var txn_request_atmp_incoming = require('./txn_request_atmp_incoming');
var BankA = '0x01751f1b5a22aaee0824d68b888f2190a663d768';
var BankB = '0x8bdce7b955646a7c620565be1117edb77c101e9b';
var BankC = '0xed9d02e382b34818e88b88a309c7fe71e65f419d'; 
var _httpRes ;
var thisHash;
var contractInitVars = {contractfile:"BTM",web3http:"http://localhost:7101", atmAdd:"0xca843569e3427144cead5e4d5999a3d0ccf92b8e", ownerBank:"0x01751f1b5a22aaee0824d68b888f2190a663d768", contractAdd:"0x8182dd293942ff6839e6e8c8a71981bb8ad655e5"};
//the callback for CheckDebit event
var checkDebitCallback = function(contractOutput){
//confirmDebit(address _fromAtm, address _debitBank, address _creditBank, string _trxHash, int256 _amount, int256 _fee, int _status) 
//to send request to atmp here
	//alert to supv
	 
    callclient({txnType:txnType,stepId:2,startNode:'Blockchain',nextNode:'A001',cardNumber:'',txnAmount:'0', cardBank:'Bank A',sourceATM:'', minerATM:minerATM,fee:'0',balance:'0',status:1});
    callclient({txnType:txnType,stepId:3,startNode:'A001',nextNode:'aBank',cardNumber:'',txnAmount:'0', cardBank:'Bank A',sourceATM:'', minerATM:minerATM,fee:'0',balance:'0',status:1});
	txn_request_atmp_incoming.request_debit(contractOutput, postDebitATMPResponse);

};
//the callback for CheckCredit event
var checkCreditCallbak = function(contractOutput){
	txn_request_atmp_incoming.request_credit(contractOutput, postCreditATMPResponse);
	
};
//the callback for Commit event
var commitCallback = function(contractOutput){	
	//ending point
	console.log("commit");
	commit(contractOutput);

};
var contract = txn_request_out_going.initContract(contractInitVars, checkDebitCallback, checkCreditCallbak, commitCallback);




//the function to be called when ATMP response is received
//confirmDebit(address _fromAtm, address _debitBank, address _creditBank, string _trxHash, int256 _amount, int256 _fee, int _status)
var postDebitATMPResponse = function(atmpRes, contractOutput){
	callclient({txnType:txnType,stepId:4,startNode:'aBank',nextNode:'A001',cardNumber:'',txnAmount:'0', cardBank:'Bank A',sourceATM:'', minerATM:minerATM,fee:'0',balance:'0',status:1});
	 callclient({txnType:txnType,stepId:5,startNode:'A001',nextNode:'Blockchain',cardNumber:'',txnAmount:'0', cardBank:'Bank A',sourceATM:'', minerATM:minerATM,fee:'0',balance:'0',status:1});
	contract.confirmDebit(contractOutput._fromAtm, contractOutput._debitBank, contractOutput._creditBank, contractOutput._trxHash, parseInt(contractOutput._amount.toString()), parseInt(contractOutput._fee.toString()), atmpRes, {from: contractInitVars.atmAdd, gas: 0x47b760});  
};
//confirmCredit(address _fromAtm, address _debitBank, address _creditBank,  string _trxHash, int256 _amount, int256 _fee, bool _feeFrDebitBank, int _status)
var postCreditATMPResponse = function(atmpRes, contractOutput){
	contract.confirmCredit(contractOutput._fromAtm, contractOutput._debitBank, contractOutput._creditBank, contractOutput._trxHash, parseInt(contractOutput._amount.toString()), parseInt(contractOutput._fee.toString()), contractOutput._feeFrDebitBank, atmpRes, {from: contractInitVars.atmAdd, gas: 0x47b760});  
};

//handle the commit event - i.e. to respond the screen
var commit = function(contractOutput){
	var statuss = contractOutput._trxHash.split('|');
	//from_cardNumber,to_cardNumber+pin+amount+type+trxHash+balance+result+fee
	console.log('thisHash ='+thisHash);
	console.log('event Hase = '+statuss[5]);
	if(thisHash === statuss[5]){
		thisHash = '0';
		console.log("2:"+_httpRes);
	//	_httpRes.end("end:"+contractOutput._status+" "+contractOutput._amount);
		this.account.status = statuss[7];
		this.account.balance = statuss[6];
		callclient({txnType:txnType,stepId:6,startNode:'Blockchain',nextNode:'A001',cardNumber:statuss[0],txnAmount:'0', cardBank:'Bank A',sourceATM:'', minerATM:minerATM,fee:'0',balance:statuss[6],status:2});
		_httpRes.redirect(routers_url+statuss[4]+'_result?cardNumber='+statuss[0]+'&status='+this.account.status+'&balance='+this.account.balance+'&amount='+this.account.amount+'&to_cardNumber='+statuss[1]);
	}else{
		console.log("ignore previous event");
	}
	
	//_httpRes.writeHead(200,{'Content-Type':'text/html'});
	//
};

var startTransaction = function(contractInput){
	//_httpRes = httpRes;
	console.log("#############start trx");
	console.log(contractInput);
	console.log(contract.owner);
	var hash=contract.startTrx(contractInput._fromAtm, contractInput._debitBank, contractInput._creditBank, contractInput._trxHash, parseInt(contractInput._amount), parseInt(contractInput._fee), {from: contractInitVars.atmAdd, gas: 0x47b760});
	console.log(hash);

};

var callclient = function(txnObj){
	
	console.log('callclient'+txnObj);
	
	client.emit('informSupervisor', txnObj);
	
};

var callclientStart = function(){
	console.log('startTx');
	client.emit('startTx');
	
};

//***********************************************************************//
exports.index = function(req, res) {
	res.render('index', {
		title : 'express',
		//message : 'welcome to SST block chain system',
	});
};

exports.cwdtxn = function(req, res) {
	console.log('cwdtxn');
	txnType = 'CWD';
    this.account={card_number:req.query.card_number,pin:req.query.pin,transaction_type:req.query.transaction_type,issue_bank: req.query.issue_bank,amount:req.query.amount};
    createhashcode.gethashCode(Date.now().toString(),function(str){
		trxHash = str;
	});
    thisHash = trxHash;
    //from_cardNumber,to_cardNumber+pin+amount+type+trxHash+balance+result+fee+tfrtype+aqbank+atmid
    //from_cardNumber,to_cardNumber+pin+amount+type+trxHash+balance+result+fee
  //vars = {data: '4227476428571352|6227497208154181|123456|100|cwd|jhfjfhjs|0|2000|0'};
	if(this.account.issue_bank===this_bank){
		console.log('internal handling');
		var cwd = {data: this.account.card_number+'|'+'N/A'+'|'+this.account.pin+'|'+this.account.amount+'|'+'cwd'+'|'+trxHash+'|'+0+'|'+2000+'|'+0+'|'+'internal'+'|'+'Bank A'+'|'+'A001'};
		//alert to supv
		//var txnType = '';
		cardBank = 'Bank A';
	    callclient({txnType: txnType,stepId:1,startNode:'A001',nextNode:'aBank',cardNumber:this.account.card_number,txnAmount:this.account.amount, cardBank:cardBank, sourceATM:sourceATM, minerATM:minerATM,fee:'0',balance:'0',status:1});
 
		console.log(cwd);
		
		    txn_request_atmp.request_transaction(cwd, function(result){
		
			var statuss = result.split('|');
			this.account.status = statuss[7];
			this.account.balance = statuss[6];
			//alert to supv
		    callclient({txnType:txnType,stepId:2,startNode:'aBank',nextNode:'A001',cardNumber:this.account.card_number,txnAmount:this.account.amount,cardBank:cardBank, sourceATM:sourceATM, minerATM:minerATM,fee:'0',balance:statuss[6],status:2});

			res.redirect(routers_url+'cwd_result?cardNumber='+this.account.card_number+'&status='+this.account.status+'&balance='+this.account.balance+'&amount='+this.account.amount);
		
		
	   });
	}else{
		_httpRes = res;
		//fee =2
	  var cwd_outgoing = {data: this.account.card_number+'|'+'N/A'+'|'+this.account.pin+'|'+this.account.amount+'|'+'cwd'+'|'+trxHash+'|'+0+'|'+2000+'|'+2+'|'+'internal'+'|'+'Bank A'+'|'+'A001'};
		console.log('out going handling');
		console.log(cwd_outgoing);
		var debitBank;
		if(this.account.issue_bank===bank_b){
			debitBank = BankB;
			cardBank = 'Bank B';
		}else if(this.account.issue_bank===bank_c){
			
			debitBank = BankC;
			cardBank = 'Bank C';
		}
		//alert to supv
	    callclient({txnType:txnType,stepId:1,startNode:'A001',nextNode:'Blockchain',cardNumber:this.account.card_number,txnAmount:'0', cardBank:cardBank,sourceATM:sourceATM,minerATM:minerATM,fee:'0',balance:'0',status:1});		 
		var contractInput ={
				_fromAtm: contractInitVars.atmAdd, 
				_debitBank:debitBank, 
				_creditBank:'0x0', //for cwd/inq is 0x0
				_trxHash: cwd_outgoing.data,
				_amount: parseInt(this.account.amount),
				_fee: 2};
		startTransaction(contractInput);
	}
	
};
exports.inqtxn = function(req, res) {
	    console.log('inqtxn');
	    txnType = 'INQ';
	    this.account={card_number:req.query.card_number,pin:req.query.pin,transaction_type:req.query.transaction_type,issue_bank: req.query.issue_bank};
		console.log(this.account);
		createhashcode.gethashCode(Date.now().toString(),function(str){
			trxHash = str;
		});
	    thisHash = trxHash;
		if(this.account.issue_bank===this_bank){
			console.log('internal handling');
			cardBank = 'Bank A';
			var inq = {data: this.account.card_number+'|'+'N/A'+'|'+this.account.pin+'|'+0+'|'+'inq'+'|'+trxHash+'|'+0+'|'+2000+'|'+0+'|'+'internal'+'|'+'Bank A'+'|'+'A001'};
			//alert to supv
		    callclient({txnType:txnType,stepId:1,startNode:'A001',nextNode:'aBank',cardNumber:this.account.card_number,txnAmount:'',cardBank:cardBank,sourceATM:sourceATM,minerATM:minerATM,fee:'0',balance:'0',status:1});
	 
			txn_request_atmp.request_transaction(inq,function(result){
			
				var statuss = result.split('|');
				this.account.status = statuss[7];
				this.account.balance = statuss[6];
				//alert to supv
			    callclient({txnType:txnType,stepId:2,startNode:'aBank',nextNode:'A001',cardNumber:this.account.card_number,txnAmount:'',cardBank:cardBank,sourceATM:sourceATM,minerATM:minerATM,fee:'0',balance:statuss[6],status:2});
			res.redirect(routers_url+'inq_result?cardNumber='+this.account.card_number+'&status='+this.account.status+'&balance='+this.account.balance+'&amount='+this.account.amount);
			});
		}else{
			_httpRes = res;
			console.log('out going handling');
			var inq_outgoing = {data: this.account.card_number+'|'+'N/A'+'|'+this.account.pin+'|'+0+'|'+'inq'+'|'+trxHash+'|'+0+'|'+2000+'|'+2+'|'+'internal'+'|'+'Bank A'+'|'+'A001'};
			var debitBank;
			if(this.account.issue_bank===bank_b){
				debitBank = BankB;
				cardBank = 'Bank B';
			}else if(this.account.issue_bank===bank_c){
				cardBank = 'Bank C';
				debitBank = BankC;
			}
			//alert to supv
		    callclient({txnType:txnType,stepId:1,startNode:'A001',nextNode:'Blockchain',cardNumber:this.account.card_number,txnAmount:'0', cardBank:cardBank,sourceATM:sourceATM,minerATM:minerATM,fee:'0',balance:'0',status:1});
		  
			var contractInput ={
					_fromAtm: contractInitVars.atmAdd, 
					_debitBank:debitBank, 
					_creditBank:'0x0', //for cwd/inq is 0x0
					_trxHash: inq_outgoing.data,
					_amount: 0,  //inq amount = 0
					_fee: 2};
			startTransaction(contractInput);
			
		}
	
};

exports.cdptxn = function(req, res) {
	    console.log('cdptxn');
	    txnType = 'DEP';
	    this.account={card_number:req.query.card_number,pin:req.query.pin,transaction_type:req.query.transaction_type,issue_bank: req.query.issue_bank,amount:req.query.amount};
		console.log(this.account);
		createhashcode.gethashCode(Date.now().toString(),function(str){
			trxHash = str;
		});
	    thisHash = trxHash;
		if(this.account.issue_bank===this_bank){
			console.log('internal handling');
			var cdp = {data: this.account.card_number+'|'+'N/A'+'|'+this.account.pin+'|'+this.account.amount+'|'+'cdp'+'|'+trxHash+'|'+0+'|'+2000+'|'+0+'|'+'internal'+'|'+'Bank A'+'|'+'A001'};
			
			callclient({txnType:txnType,stepId:1,startNode:'A001',nextNode:'aBank',cardNumber:this.account.card_number,txn:this.account.amount,cardBank:'Bank A',sourceATM:'A001',fee:'0',balance:'0',status:1});
		
			txn_request_atmp.request_transaction(cdp, function(result){
				var statuss = result.split('|');
				this.account.status = statuss[7];
				this.account.balance = statuss[6];
				//alert to supv
			    callclient({txnType:txnType,stepId:2,startNode:'aBank',nextNode:'A001',cardNumber:this.account.card_number,txn:this.account.amount,cardBank:'Bank A',sourceATM:'A001',fee:'0',balance:statuss[6],status:2});
	
				res.redirect(routers_url+'cdp_result?cardNumber='+this.account.card_number+'&status='+this.account.status+'&balance='+this.account.balance+'&amount='+this.account.amount);
		});
		}else{
			_httpRes = res;
			console.log(this.account);
			console.log('out going handling');
			var cdp_outging = {data: this.account.card_number+'|'+'N/A'+'|'+this.account.pin+'|'+this.account.amount+'|'+'cdp'+'|'+trxHash+'|'+0+'|'+2000+'|'+2+'|'+'internal'+'|'+'Bank A'+'|'+'A001'};//cdp fee =2
			var _creditBank;
			if(this.account.issue_bank===bank_b){
				_creditBank = BankB;
			}else if(this.account.issue_bank===bank_c){
				
				_creditBank = BankC;
			}
			var contractInput ={
					_fromAtm: contractInitVars.atmAdd, 
					_debitBank:contractInitVars.ownerBank, //cdp debit bank = owner bank
					_creditBank:_creditBank, //for cwd
					_trxHash: cdp_outging.data,
					_amount: parseInt(this.account.amount),
					_fee:2};
			startTransaction(contractInput);
		}
	
};
exports.tfrtxn = function(req, res) {
	
    console.log('tfrtxn');
    this.account={from_card_number:req.query.from_card_number,to_card_number:req.query.to_card_number, pin:req.query.pin,transaction_type:req.query.transaction_type,from_issue_bank: req.query.from_issue_bank, to_issue_bank: req.query.to_issue_bank, amount:req.query.amount};
	console.log(this.account);
	createhashcode.gethashCode(Date.now().toString(),function(str){
		trxHash = str;
	});
    thisHash = trxHash;
	if(this.account.from_issue_bank===this_bank&&this.account.to_issue_bank===this_bank){
		console.log('internal handling');
		var tfr = {data: this.account.from_card_number+'|'+this.account.to_card_number+'|'+this.account.pin+'|'+this.account.amount+'|'+'tfr'+'|'+trxHash+'|'+0+'|'+2000+'|'+0+'|'+'internal'+'|'+'Bank A'+'|'+'A001'};
		callclient({txnType:'TFR',stepId:1,startNode:'A001',nextNode:'aBank',cardNumber:this.account.card_number,cardBank:'Bank A',sourceATM:'A001',fee:'0',balance:'0',status:1});
		txn_request_atmp.request_transaction(tfr, function(result){
			var statuss = result.split('|');
			this.account.status = statuss[7];
			this.account.balance = statuss[6];
			//alert to supv
		    callclient({txnType:'TFR',stepId:2,startNode:'aBank',nextNode:'A001',cardNumber:this.account.card_number,cardBank:'Bank A',sourceATM:'A001',fee:'0',balance:statuss[6],status:2});

			res.redirect(routers_url+'tfr_result?cardNumber='+this.account.from_card_number+'&status='+this.account.status+'&balance='+this.account.balance+'&amount='+this.account.amount+'&to_cardNumber='+statuss[1]);
	});
	}else{
		_httpRes = res;
		console.log(this.account);
		console.log('out going handling');
		var tfr_outging = {data: this.account.from_card_number+'|'+this.account.to_card_number+'|'+this.account.pin+'|'+this.account.amount+'|'+'tfr'+'|'+trxHash+'|'+0+'|'+2000+'|'+3+'|'+'debit'+'|'+'Bank A'+'|'+'A001'};//tfr fee =3
		var _creditBank;
		var _debitBank;
		if(this.account.from_issue_bank===bank_a){
			_debitBank = BankA;
		}else if(this.account.from_issue_bank===bank_b){
			
			_debitBank = BankB;
		}else if(this.account.from_issue_bank===bank_c){
			_debitBank = BankC;
			
		}
		//****************credit bank*******************
		if(this.account.to_issue_bank===bank_a){
			_creditBank = BankA;
		}else if(this.account.to_issue_bank===bank_b){
			
			_creditBank = BankB;
		}else if(this.account.to_issue_bank===bank_c){
			_creditBank = BankC;
		}
		var contractInput ={
				_fromAtm: contractInitVars.atmAdd, 
				_debitBank:_debitBank, 
				_creditBank:_creditBank, //
				_trxHash: tfr_outging.data,
				_amount: parseInt(this.account.amount),
				_fee: 3};//tfr fee =3
		startTransaction(contractInput);
	}

};




