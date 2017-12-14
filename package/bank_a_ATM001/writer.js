/**
 * http://usejsdoc.org/
 */
var fs = require('fs');
fs.readFile('de67bab5d3863d011dd1310cff42e8e720b2846e.txt','utf-8', function(err,data){
    console.log(data);
    var statuss = data.split('|');
   console.log(statuss);
	//console.log(statuss[0]);
	//console.log(statuss[1]);
	//console.log('routers_url='+routers_url);
//	this.account.status = statuss[0];
//	this.account.balance = statuss[1];
	//res.redirect(routers_url+'cwd_result?cardNumber='+this.account.card_number+'&pin='+this.account.pin+'&transactionType='+this.account.transaction_type+'&bankName=HSBC&atmId=A001'+'&status='+this.account.status+'&balance='+this.account.balance+'&amount='+this.account.amount);
});