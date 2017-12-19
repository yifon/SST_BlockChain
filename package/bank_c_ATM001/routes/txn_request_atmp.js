/**
 * http://usejsdoc.org/
 */

var soap = require('soap');
//var url = 'http://119.23.12.79:8080/Bank_system_hsbc/services/GetBankAccountInfoImp?wsdl';
var url = 'http://119.23.12.79:8080/Bank_system_C/services/GetBankAccountInfoImp?wsdl';
function txn_request_atmp(){
	
}
//from_cardNumber,to_cardNumber+pin+amount+type+trxHash+balance+result+fee+tfrtype+aqbank+atmid
//from_cardNumber,to_cardNumber+pin+amount+type+trxHash+balance+result+fee
//vars = {data: '4227476428571352|6227497208154181|123456|100|cwd|jhfjfhjs|0|2000|0'};
txn_request_atmp.request_transaction = function (vars,callback){
	soap.createClient(url, function(err, client) {		
	    client.request_transaction(vars, function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
				callback(result.request_transactionReturn);
				
			}
		});
	});
};


module.exports=txn_request_atmp;
