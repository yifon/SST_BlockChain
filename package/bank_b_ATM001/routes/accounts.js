/**
 *  transaction modules
 *  
 *  
 */

/**
 * @returns
 */
function accounts() {
    
	var card_number ;
	var balance;
	var pin;
	var amount;
	var transaction_type;
	var status;
	var issue_bank;
	//console.log("transaction");
	
	this.setCard_number = function(_card_number) {

		card_number = _card_number;
	};
	
	this.setBalance = function(_balance) {

		balance = _balance;
	};
	this.setPin = function(_pin) {

		pin = _pin;
	};
	
	this.setAmount = function(_amount) {

		amount = _amount;
	};
	
	this.setTransaction_type = function(_transaction_type) {

		transaction_type = _transaction_type;
	};
	
	this.setStatus = function(_status) {

		status = _status;
	};
	this.setIssue_bank = function(_issue_bank) {

		issue_bank = _issue_bank;
	};
	


}
module.exports = accounts;