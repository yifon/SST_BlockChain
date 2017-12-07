/**
 * http://usejsdoc.org/
 */
var soap = require('soap');
// var url = 'http://119.23.12.79:8080/Bank_system_hsbc/services/GetBankAccountInfoImp?wsdl';
  var url = 'http://119.23.12.79:8080/Bank_system_C/services/GetBankAccountInfoImp?wsdl';
  //var url = 'http://localhost:8080/Bank_system_b/services/GetBankAccountInfoImp?wsdl';
  //from_cardNumber,to_cardNumber+pin+amount+type+trxHash+balance+result+fee
  var inq = {data: '4227476428571352|6227497208154181|123456|100|cwd|jhfjfhjs|0|2000|0'};
  var cwd = '6227467436550860|4227476428571352|123456|500|cwd|jhfjfhjs|0|2000|2';
  var cdp = '6227467436550860|4227476428571352|123456|500|cwd|jhfjfhjs|0|2000|2';
  var tfr = '6227467436550860|4227476428571352|123456|500|cwd|jhfjfhjs|0|2000|2';
  //create client
  soap.createClient(url, function(err, client) {
	  //call server method 
	 client.request_transaction(inq, function(err, result) {

      if (err) {
        console.log(err);
      }else {
    	  console.log(result.request_transactionReturn);
    		var statuss = result.request_transactionReturn.split('|');
    		console.log(statuss);
      }  
    });
  });