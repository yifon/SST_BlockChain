/**
 *  transaction modules
 *  
 *  
 */

/**
 * @returns
 */
function terminal() {
    
	var bank_name ;
	var atm_id;
//	var pin;
//	var amount;
//	var transaction_type;
	//console.log("transaction");
	
	this.setBanK_name = function(_bank_name) {

		bank_name = _bank_name;
	};
	
	this.setAtm_id = function(_atm_id) {

		atm_id = _atm_id;
	};
//	this.setPin = function(_pin) {
//
//		pin = _pin;
//	};
//	
//	this.setAmount = function(_amount) {
//
//		amount = _amount;
//	};
//	
//	this.setTransactiontype = function(_transaction_type) {
//
//		transaction_type = _transaction_type;
//	};


}
module.exports = terminal;