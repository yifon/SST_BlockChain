//var soap = require('soap');
//var url = 'http://119.23.12.79:8080/Bank_system_A/services/GetBankAccountInfoImp?wsdl';
//var url = 'http://119.23.12.79:8080/Bank_system_habc/services/GetBankAccountInfoImp?wsdl';
function txn_request_bank_a(){
	
}

txn_request_bank_a.debitRequest = function (contractOutput, callback){
	//web request start here
	var atmpRes = {_status:1000};
	callback(atmpRes, contractOutput);
};

txn_request_bank_a.creditRequest = function (contractOutput, callback){
	//web request start here
	var atmpRes = {_status:1000};
	callback(atmpRes, contractOutput);
};



module.exports=txn_request_bank_a;