/**
 * http://usejsdoc.org/
 */

var soap = require('soap');
//var url = 'http://119.23.12.79:8080/Bank_system_hsbc/services/GetBankAccountInfoImp?wsdl';
var url = 'http://119.23.12.79:8080/Bank_system_B/services/GetBankAccountInfoImp?wsdl';
function txn_request_atmp_incoming(){
	
}
//from_cardNumber,to_cardNumber+pin+amount+type+trxHash+balance+result+fee+tfrtype+aqbank+atmid
//vars = {data: '4227476428571352|6227497208154181|123456|100|cwd|jhfjfhjs|0|2000|0'};
txn_request_atmp_incoming.request_debit = function (contractOutput,postDebitATMPResponse){
	
	//if for cwd transaction need cost amount form the card number 
	var check = contractOutput._trxHash.split('|');
	if(check[4]==='cwd'||check[4]==='inq'||check[4]==='tfr'){
	var data = {data:contractOutput._trxHash};
	soap.createClient(url, function(err, client) {		
	    client.request_transaction(data, function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
				var statuss = result.request_transactionReturn.split('|');
				contractOutput._trxHash = result.request_transactionReturn;
				postDebitATMPResponse(statuss[7],contractOutput);
				
			}
		});
	});
	}else if(check[4]==='cdp'){
		postDebitATMPResponse(1000,contractOutput);
	}
};
txn_request_atmp_incoming.request_credit = function (contractOutput,postCreditATMPResponse){
	var check = contractOutput._trxHash.split('|');
	if(check[4]==='cdp'){
	var data = {data:contractOutput._trxHash};
	soap.createClient(url, function(err, client) {		
	    client.request_transaction(data, function(err, result) {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
				var statuss = result.request_transactionReturn.split('|');
				contractOutput._trxHash = result.request_transactionReturn;
				contractOutput._feeFrDebitBank = false;
				postCreditATMPResponse(statuss[7],contractOutput);
				
			}
		});
	});
	}else if(check[4]==='tfr'){
		//from_cardNumber,to_cardNumber+pin+amount+type+trxHash+balance+result+fee+tfrtype+aqbank+atmid
		//tfr credit no fee will cost from debit 
       var tfr = {data:check[0]+'|'+check[1]+'|'+check[2]+'|'+check[3]+'|'+check[4]+'|'+check[5]+'|'+check[6]+'|'+check[7]+'|'+0+'|'+'credit'+'|'+check[10]+'|'+check[11]};
       soap.createClient(url, function(err, client) {		
   	    client.request_transaction(tfr, function(err, result) {
   			if (err) {
   				console.log(err);
   			} else {
   				console.log(result);
   				var statuss = result.request_transactionReturn.split('|');
				contractOutput._trxHash = statuss[0]+'|'+statuss[1]+'|'+statuss[2]+'|'+statuss[3]+'|'+check[4]+'|'+statuss[5]+'|'+statuss[6]+'|'+statuss[7]+'|'+2+'|'+'credited'+'|'+check[10]+'|'+check[11];//add back the fee for record
				contractOutput._feeFrDebitBank = true;
				postCreditATMPResponse(statuss[7],contractOutput);
   				
   			}
   		});
   	});
	}
};


module.exports=txn_request_atmp_incoming;
