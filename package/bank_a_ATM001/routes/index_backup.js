/*
 * GET home page.
 */
var accounts = require('./accounts');
var txn_request_atmp = require('./txn_request_atmp');
var createhashcode = require('./createhashcode');
var txn_request_out_going = require('./contractNode');
//need change to the real server once in prod
var routers_url = 'http://39.108.142.194:3000/';
//var routers_url = 'http://localhost:3000/';
var account = new accounts();
var bank_b = 'bank_b';
var this_bank = 'bank_a';
var bank_c = 'bank_c';
var trxHash;
var fs = require('fs');
exports.index = function(req, res) {
	res.render('index', {
		title : 'express',
		//message : 'welcome to SST block chain system',
	});
};

exports.cwdtxn = function(req, res) {
	
	console.log('cwdtxn');
    this.account={card_number:req.query.card_number,pin:req.query.pin,transaction_type:req.query.transaction_type,issue_bank: req.query.issue_bank,amount:req.query.amount};
    createhashcode.gethashCode(Date.now().toString(),function(str){
		trxHash = str;
	});
    //from_cardNumber,to_cardNumber+pin+amount+type+trxHash+balance+result+fee
  //vars = {data: '4227476428571352|6227497208154181|123456|100|cwd|jhfjfhjs|0|2000|0'};
	if(this.account.issue_bank===this_bank){
		console.log('internal handling');
		var cwd = {data: this.account.card_number+'|'+'000000000'+'|'+this.account.pin+'|'+this.account.amount+'|'+'cwd'+'|'+trxHash+'|'+0+'|'+2000+'|'+0};
		console.log(cwd);
		txn_request_atmp.request_transaction(cwd, function(result){
		
			var statuss = result.split('|');
			this.account.status = statuss[7];
			this.account.balance = statuss[6];
			res.redirect(routers_url+'cwd_result?cardNumber='+this.account.card_number+'&status='+this.account.status+'&balance='+this.account.balance+'&amount='+this.account.amount);
		
		
	   });
	}else{
		//fee =2
	  var cwd_outgoing = {data: this.account.card_number+'|'+'000000000'+'|'+this.account.pin+'|'+this.account.amount+'|'+'cwd'+'|'+trxHash+'|'+0+'|'+2000+'|'+2};
		console.log('out going handling');
		console.log(cwd_outgoing);
		txn_request_out_going.request_transaction(cwd_outgoing ,function(trxHash){
		
//			function  myfunc(Interval){
//				fs.exists(trxHash+".txt", function(exists) {  
//				    console.log(trxHash+".txt :exists= "+exists); 
//				    if(exists){
//				    	stopInterval();
//				   	       fs.readFile(trxHash+".txt", 'utf-8',function(err,data){
//						    console.log(data);
//						    var statuss = data.split('|');
//						    console.log(statuss);
//							console.log('routers_url='+routers_url);
//							this.account.status = statuss[7];
//							this.account.balance = statuss[6];
//							res.redirect(routers_url+'cwd_result?cardNumber='+this.account.card_number+'&status='+this.account.status+'&balance='+this.account.balance+'&amount='+this.account.amount);
//					 });
//				    }
//				});
//			}
//			var myInterval=setInterval(myfunc,1000,"Interval");
//			function  stopInterval(){
//			    clearTimeout(myInterval);
//			}
//			setTimeout(stopInterval,5000);
			
		});
	}
	
};
exports.inqtxn = function(req, res) {
	    console.log('inqtxn');
	    this.account={card_number:req.query.card_number,pin:req.query.pin,transaction_type:req.query.transaction_type,issue_bank: req.query.issue_bank};
		console.log(this.account);
		
		if(this.account.issue_bank===this_bank){
			console.log('internal handling');
			var inq = {data: this.account.card_number+'|'+'000000000'+'|'+this.account.pin+'|'+0+'|'+'inq'+'|'+trxHash+'|'+0+'|'+2000+'|'+0};
			txn_request_atmp.request_transaction(inq,function(result){
			
				var statuss = result.split('|');
				this.account.status = statuss[7];
				this.account.balance = statuss[6];
			res.redirect(routers_url+'inq_result?cardNumber='+this.account.card_number+'&status='+this.account.status+'&balance='+this.account.balance+'&amount='+this.account.amount);
			});
		}else{
			console.log('out going handling');
			var inq_outgoing = {data: this.account.card_number+'|'+'000000000'+'|'+this.account.pin+'|'+0+'|'+'inq'+'|'+trxHash+'|'+0+'|'+2000+'|'+-2};
			txn_request_out_going.request_transaction(inq_outgoing, function(trxHash){
				
				function  myfunc(Interval){
					fs.exists(trxHash+".txt", function(exists) {  
					    console.log(trxHash+".txt :exists= "+exists); 
					    if(exists){
					    	stopInterval();
					   	       fs.readFile(trxHash+".txt", 'utf-8',function(err,data){
							    console.log(data);
							    var statuss = data.split('|');
							    console.log(statuss);
								console.log('routers_url='+routers_url);
								this.account.status = statuss[7];
								this.account.balance = statuss[6];
								res.redirect(routers_url+'cwd_result?cardNumber='+this.account.card_number+'&status='+this.account.status+'&balance='+this.account.balance+'&amount='+this.account.amount);
						 });
					    }
					});
				}
				var myInterval=setInterval(myfunc,1000,"Interval");
				function  stopInterval(){
				    clearTimeout(myInterval);
				}
				setTimeout(stopInterval,5000);
				
			});
			
			
		}
	
};

exports.cdptxn = function(req, res) {
	
	    console.log('cdptxn');
	    this.account={card_number:req.query.card_number,pin:req.query.pin,transaction_type:req.query.transaction_type,issue_bank: req.query.issue_bank,amount:req.query.amount};
		console.log(this.account);
		
		if(this.account.issue_bank===this_bank){
			console.log('internal handling');
			var cdp = {data: this.account.card_number+'|'+'000000000'+'|'+this.account.pin+'|'+this.account.amount+'|'+'cwd'+'|'+trxHash+'|'+0+'|'+2000+'|'+0};
			txn_request_atmp.request_transaction(cdp, function(result){
				var statuss = result.split('|');
				this.account.status = statuss[7];
				this.account.balance = statuss[6];
				res.redirect(routers_url+'cdp_result?cardNumber='+this.account.card_number+'&status='+this.account.status+'&balance='+this.account.balance+'&amount='+this.account.amount);
		});
		}else{
			
			console.log(this.account);
			console.log('out going handling');
			var cdp_outging = {data: this.account.card_number+'|'+'000000000'+'|'+this.account.pin+'|'+this.account.amount+'|'+'cwd'+'|'+trxHash+'|'+0+'|'+2000+'|'+0};
			txn_request_out_going.request_transaction(cdp_outging, function(trxHash){
				
				function  myfunc(Interval){
					fs.exists(trxHash+".txt", function(exists) {  
					    console.log(trxHash+".txt :exists= "+exists); 
					    if(exists){
					    	stopInterval();
					   	       fs.readFile(trxHash+".txt", 'utf-8',function(err,data){
							    console.log(data);
							    var statuss = data.split('|');
								console.log('routers_url='+routers_url);
								this.account.status = statuss[7];
								this.account.balance = statuss[6];
								res.redirect(routers_url+'cwd_result?cardNumber='+this.account.card_number+'&status='+this.account.status+'&balance='+this.account.balance+'&amount='+this.account.amount);
						 });
					    }
					});
				}
				var myInterval=setInterval(myfunc,1000,"Interval");
				function  stopInterval(){
				    clearTimeout(myInterval);
				}
				setTimeout(stopInterval,5000);
				
			});
			
		}
	
};
exports.tfrtxn = function(req, res) {
	
    console.log('cdptxn');
    this.account={from_card_number:req.query.from_card_number,to_card_number:req.query.to_card_number, pin:req.query.pin,transaction_type:req.query.transaction_type,from_issue_bank: req.query.from_issue_bank, to_issue_bank: req.query.to_issue_bank, amount:req.query.amount};
	console.log(this.account);
	
	if(this.account.from_issue_bank===this_bank&&this.account.to_issue_bank===this_bank){
		console.log('internal handling');
		var cdp = {data: this.account.from_card_number+'|'+this.account.to_card_number+'|'+this.account.pin+'|'+this.account.amount+'|'+'cwd'+'|'+trxHash+'|'+0+'|'+2000+'|'+0};
		txn_request_atmp.request_transaction(cdp, function(result){
			var statuss = result.split('|');
			this.account.status = statuss[7];
			this.account.balance = statuss[6];
			res.redirect(routers_url+'cdp_result?cardNumber='+this.account.from_card_number+'&status='+this.account.status+'&balance='+this.account.balance+'&amount='+this.account.amount);
	});
	}else{
		
		console.log(this.account);
		console.log('out going handling');
		var cdp_outging = {data: this.account.card_number+'|'+'000000000'+'|'+this.account.pin+'|'+this.account.amount+'|'+'cwd'+'|'+trxHash+'|'+0+'|'+2000+'|'+0};
		txn_request_out_going.request_transaction(cdp_outging, function(trxHash){
			
			function  myfunc(Interval){
				fs.exists(trxHash+".txt", function(exists) {  
				    console.log(trxHash+".txt :exists= "+exists); 
				    if(exists){
				    	stopInterval();
				   	       fs.readFile(trxHash+".txt", 'utf-8',function(err,data){
						    console.log(data);
						    var statuss = data.split('|');
							console.log('routers_url='+routers_url);
							this.account.status = statuss[7];
							this.account.balance = statuss[6];
							res.redirect(routers_url+'cwd_result?cardNumber='+this.account.card_number+'&status='+this.account.status+'&balance='+this.account.balance+'&amount='+this.account.amount);
					 });
				    }
				});
			}
			var myInterval=setInterval(myfunc,1000,"Interval");
			function  stopInterval(){
			    clearTimeout(myInterval);
			}
			setTimeout(stopInterval,5000);
			
		});
		
	}

};




