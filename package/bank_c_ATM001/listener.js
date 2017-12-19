/**
 * http://usejsdoc.org/
 */
var contractNode = require('./routes/contractNode');

contractNode.cwdlistener();
contractNode.Commitlistener();
//contractNode.inqrequest("", function(statuss){
//	console.log(statuss);
//	//this.account.status = statuss[0];
//	//this.account.balance = statuss[1];
//	//res.redirect(routers_url+'cdp_result?cardNumber='+this.account.card_number+'&pin='+this.account.pin+'&transactionType='+this.account.transaction_type+'&bankName=HSBC&atmId=A001'+'&status='+this.account.status+'&balance='+this.account.balance+'&amount='+this.account.amount);
//
//});