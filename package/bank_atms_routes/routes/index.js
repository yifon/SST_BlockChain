/*
 * GET home page.
 */
var Client = require('./socket_client');
var client = Client.init();
client.emit("userName", "screen contorl Connected");
var accounts = require('./accounts');
var terminal = require('./terminal');
var account = new accounts();
//need change to the real server once in prod
//var BankA001_url ='http://localhost:6100/';
var BankA001_url ='http://119.23.28.88:6100/';
var BankA002_url ='http://119.23.28.88:6200/';
//var BankA002_url ='http://localhost:6100/';
var BankB001_url ='http://120.79.43.12:6100/';
//var BankB001_url ='http://localhost:6200/';
var BankB002_url ='http://120.79.43.12:6200/';
var BankC001_url ='http://120.79.41.102:6100/';
var BankC002_url ='http://120.79.41.102:6200/';

var r = /^\+?[1-9][0-9]*$/;

var callclientStart = function(){
	console.log('startTx');
	client.emit('startTx');
	
};
var callclientSelectATM = function(atmid){
	console.log('chooseATM');
	client.emit('chooseATM',atmid);
	
};
exports.index = function(req, res) {
	callclientStart();
	res.render('index', {
		title : 'Select terminal',
		message : 'welcome to SST block chain system',
		
	});
};


exports.selectTerminalDone = function(req, res) {
	
	this.terminal = {atm_id:req.query.terminalId};
	req.session.terminal=this.terminal;
	//req.session.terminalId=req.query.terminalId;
	console.log(req.session.terminal.atm_id);
	switch (req.session.terminal.atm_id) {
	case 'BankA001':
		req.session.atmurl = BankA001_url;
		callclientSelectATM('A001');
		break;
	case 'BankA002':
		req.session.atmurl = BankA002_url;
		callclientSelectATM('A002');
		break;
	case 'BankB001':
		req.session.atmurl = BankB001_url;
		callclientSelectATM('B001');
		break;
	case 'BankB002':
		req.session.atmurl = BankB002_url;
		callclientSelectATM('B002');
		break;
	case 'BankC001':
		req.session.atmurl = BankC001_url;
		callclientSelectATM('C001');
		break;
	case 'BankC002':
		req.session.atmurl = BankC002_url;
		callclientSelectATM('C002');
		break;
	default:
		req.session.atmurl = BankA002_url;
	}
	console.log('selectTerminalDone  success');
	console.log(req.session.atmurl);
	res.render('insert_card', {
		title: 'Insert Card', 
	   // bankName: req.session.terminal.bank_name, 
		terminalId:req.session.terminal.atm_id 
		});
	
};
exports.insertCardDone = function(req, res) {
	    
		console.log('insertCardDone  success');
		
		this.account={card_number: req.query.cardNumber,issue_bank: req.query.issueBank};
		
		req.session.Account=this.account;
		console.log(this.account);
		//return account;
		res.render('enter_pin', {
			title: 'Enter pin', 
		//    bankName: req.session.terminal.bank_name, 
			//terminalId:req.session.terminal.atm_id,
			cardNumber:req.session.Account.card_number
			});
		
	
};
exports.enterPinDone = function(req, res) {
	
	console.log('enterPinDone  success');
	console.log(r.test(req.query.pin));
	if(r.test(req.query.pin)){
	this.account.pin = req.query.pin;
	
	req.session.Account=this.account;
	console.log(this.account);
	//return account;
	
	res.render('transaction_select', {
		title: 'transaction_select', 
	 //   bankName: req.session.terminal.bank_name, 
		//terminalId:req.session.terminal.atm_id,
		cardNumber:req.session.Account.card_number
		});
    }else{
    	res.render('enter_pin', {
			title: 'Enter pin', 
		//    bankName: req.session.terminal.bank_name, 
			//terminalId:req.session.terminal.atm_id,
			cardNumber:req.session.Account.card_number
			});
    	
    }
};
exports.transactionSelectDone = function(req, res) {
	
	console.log('transactionSelectDone  success');
	
	this.account.transaction_type = req.query.transaction_type;
	
	req.session.Account=this.account;
	console.log(this.account);
	//return account;
	


		switch (this.account.transaction_type) {
	case 'cwd':
		res.render('enter_amount', {
			title: 'Enter Amount', 
	//	    bankName: req.session.terminal.bank_name, 
		//	terminalId:req.session.terminal.atm_id,
			cardNumber:req.session.Account.card_number
			});
		break;
	case 'inq':
		res.redirect(req.session.atmurl+'inq?card_number='+this.account.card_number+'&pin='+this.account.pin+'&transaction_type='+this.account.transaction_type+'&issue_bank='+this.account.issue_bank);
		break;
	case 'tfr':
		res.render('enter_account', {
			title: 'Enter account', 
	//	    bankName: req.session.terminal.bank_name, 
		//	terminalId:req.session.terminal.atm_id,
			cardNumber:req.session.Account.card_number
			});
		break;
	case 'cdp':
		   res.render('insert_cash', {
			title: 'Insert Cash', 
		//    bankName: req.session.terminal.bank_name, 
		//	terminalId:req.session.terminal.atm_id,
			cardNumber:req.session.Account.card_number
			});

		break;
	default:
		res.render('transaction_select', {
			title: 'transaction_select', 
		 //   bankName: req.session.terminal.bank_name, 
			//terminalId:req.session.terminal.atm_id,
			cardNumber:req.session.Account.card_number
			});
	}
	
};
exports.enterAmountDone = function(req, res) {
	
	console.log('enterAmountDone  success');
	if(r.test(req.query.amount)){
	this.account.amount = req.query.amount;
	
	req.session.Account=this.account;
	console.log(this.account);
	//return account;
	res.redirect(req.session.atmurl+'cwd?card_number='+
			this.account.card_number+
			'&pin='+this.account.pin+
			'&transaction_type='+req.session.Account.transaction_type+
			'&issue_bank='+req.session.Account.issue_bank+
			'&amount='+req.session.Account.amount);
	}else{
		
		res.render('enter_amount', {
			title: 'Enter Amount', 
	//	    bankName: req.session.terminal.bank_name, 
		//	terminalId:req.session.terminal.atm_id,
			cardNumber:req.session.Account.card_number
			});
	}
};
exports.enterAccounDone = function(req, res) {
	
	console.log('enter Account Done  success');
	
	this.account.to_account = req.query.to_card_number;
	this.account.to_issue_bank = req.query.to_issue_bank;
	req.session.Account=this.account;
	console.log(this.account);
	//return account;
	res.render('enter_amount_tfr', {
		title: 'Enter Amount', 
//	    bankName: req.session.terminal.bank_name, 
	//	terminalId:req.session.terminal.atm_id,
		cardNumber:req.session.Account.card_number
		});
};

exports.enterTFRAmountDone = function(req, res) {
	
	console.log('enterTFRAmountDone  success');
	if(r.test(req.query.amount)){
	this.account.amount = req.query.amount;
	
	req.session.Account=this.account;
	console.log(this.account);
	//return account;
	res.redirect(req.session.atmurl+'tfr?from_card_number='+
			this.account.card_number+
			'&to_card_number='+this.account.to_account+
			'&pin='+this.account.pin+
			'&transaction_type='+req.session.Account.transaction_type+
			'&from_issue_bank='+req.session.Account.issue_bank+
			'&to_issue_bank='+req.session.Account.to_issue_bank+
			'&amount='+req.session.Account.amount);
	}else{
		
		res.render('enter_amount_tfr', {
			title: 'Enter Amount', 
//		    bankName: req.session.terminal.bank_name, 
		//	terminalId:req.session.terminal.atm_id,
			cardNumber:req.session.Account.card_number
			});
	}
};

exports.insertCashDone = function(req, res) {
	
console.log('insertCashDone  success');
	
	this.account.amount = req.query.amount;
	
	req.session.Account=this.account;
	console.log(this.account);
	//return account;
	res.redirect(req.session.atmurl+'cdp?card_number='+
			this.account.card_number+
			'&pin='+this.account.pin+
			'&transaction_type='+req.session.Account.transaction_type+
			'&issue_bank='+req.session.Account.issue_bank+
			'&amount='+req.session.Account.amount);
};
exports.inqResult = function(req, res) {

	console.log('inqResult  success');

	//this.account.status = req.query.status;
	//this.account.balance = req.query.balance;
	this.account={
			    card_number: req.query.cardNumber,
			    balance: req.query.balance,
			    status: req.query.status};
	//req.session.Account = this.account;
	console.log(this.account);
	// return account;
	if (req.query.status==="1000") {

		res.render('inq_result', {
			title : 'inq_result',
			cardNumber : this.account.card_number,
			balance : this.account.balance
		});
		req.session.Account = null;
		this.account=null;
		
	} else {
		res.render('failed', {
			title : 'inq_result',
			cardNumber : this.account.card_number,
			balance : this.account.balance
		});
		req.session.Account = null;
		this.account=null;
	}
};
exports.cdpResult = function(req, res) {

	console.log('cdpResult  success');

	//this.account.status = req.query.status;
	//this.account.balance = req.query.balance;
	this.account={
		    card_number: req.query.cardNumber,
		    balance: req.query.balance,
		    amount: req.query.amount,
		    status: req.query.status};
	//req.session.Account = this.account;
	console.log(this.account);
	// return account;
	if (req.query.status==="1000") {

		res.render('cdp_result', {
			title : 'cdpresult',
		//	bankName : req.query.bankName,
			cardNumber : this.account.card_number,
			balance : this.account.balance,
			amount:this.account.amount,
		});
		req.session.Account = null;
		this.account=null;
		
	} else {
		res.render('failed', {
			title : 'cdrResult',
		//	bankName : req.query.bankName,
			cardNumber : this.account.card_number,
			balance : this.account.balance,
			amount: this.account.amount
		});
		req.session.Account = null;
		this.account=null;
	}
};
exports.cwdResult = function(req, res) {

	console.log('cwdResult  success');

	this.account={
		    card_number: req.query.cardNumber,
		    balance: req.query.balance,
		    amount: req.query.amount,
		    status: req.query.status};
	console.log(this.account);
	if (req.query.status==="1000") {

		res.render('cwd_result', {
			title : 'cwdresult',
			cardNumber : this.account.card_number,
			balance : this.account.balance,
			amount:this.account.amount
		});
		req.session.Account = null;
		this.account=null;
		
	} else {
		res.render('failed', {
			title : 'cwdresult',
			cardNumber : this.account.card_number,
			balance : this.account.balance,
			amount:this.account.amount
		});
		req.session.Account = null;
		this.account=null;
	}
};
exports.tfrResult = function(req, res) {

	console.log('tfrResult  success');

	this.account={
		    card_number: req.query.cardNumber,
		    balance: req.query.balance,
		    amount: req.query.amount,
		    status: req.query.status};
	console.log(this.account);
	if (req.query.status==="1000") {

		res.render('tfr_result', {
			title : 'tfrresult',
			cardNumber : this.account.card_number,
			balance : this.account.balance,
			amount:this.account.amount,
			to_cardNumber:req.query.to_cardNumber
		});
		req.session.Account = null;
		this.account=null;
		
	} else {
		res.render('failed', {
			title : 'tfrresult',
			cardNumber : this.account.card_number,
			balance : this.account.balance,
			amount:this.account.amount,
			to_cardNumber:req.query.to_cardNumber
		});
		req.session.Account = null;
		this.account=null;
	}
};




