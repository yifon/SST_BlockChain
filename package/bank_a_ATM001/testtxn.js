/**
 * http://usejsdoc.org/
 */
/*
 * GET home page.
 */
var accounts = require('./routes/accounts');
//var terminal = require('./terminal');
var account = new accounts();
var soap = require('soap');
var url = 'http://localhost:8080/Bank_system_hsbc/services/GetBankAccountInfoImp?wsdl';

account = {
	card_number : '6227467436550860',
	pin : 123456,
	transaction_type : 'inq',
	issue_bank : 'hsbc',
	amount :500,
	status :false
};
console.log(this.account);
var inq = {
	cardNumber : account.card_number,
	pin : account.pin
};
//var cwd = {
//		cardNumber : this.account.card_number,
//		pin : this.account.pin,
//		amount:this.account.amount
//	};
//var cdp = {
//		cardNumber : this.account.card_number,
//		amount:this.account.amount
//	};
//var pin = {
//		cardNumber : this.account.card_number,
//		pin : this.account.pin
//	};
soap.createClient(url, function(err, client) {
	//call server method 
	// client.getAllcards( function(err, result) {
	//client.pinVerify(pin, function(err, result) {
	// client.pinVerify(pin, function(err, result) {
	//client.cashDeposit(cdp, function(err, result) {
	client.getAccountBalance(inq, function(err, result) {
		// client.cashWithdrawal(cwd, function(err, result) {
		if (err) {
			console.log(err);
		} else {
			console.log(result);
			var statuss = result.getAccountBalanceReturn.split('|');
			//this.account.status = statuss[0];
			//this.account.balance = statuss[1];
			console.log(inq);
			console.log(account.issue_bank);
			
		}
	});
});
