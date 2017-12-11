
var express = require('express');
var app = express();
var Web3 = require('web3');
var fs =require('fs');
var http = require('http');

var banksInfo = JSON.parse(fs.readFileSync("banks.json"));
	


var checkConnection= function(bankI, atmJ, initCallback){
	console.log("checking:"+banksInfo.accounts[bankI].atms[atmJ].ip+":"+banksInfo.accounts[bankI].atms[atmJ].port);
  http.get({
    hostname: banksInfo.accounts[bankI].atms[atmJ].ip,
    port: 6102,
    path: '/network',
    headers: {
    	'port': banksInfo.accounts[bankI].atms[atmJ].port
    }
    }, (res)=>{
      var result ='';
      res.on('data',function(chunk){
        result += chunk;
      });
      res.on('end', function(){
        //completed request
        var jsonRes = JSON.parse(result);
        console.log(bankI+":"+atmJ);	
		banksInfo.accounts[bankI].atms[atmJ].isConnected = jsonRes.isConnected;

        initCallback();

      });
    }
    

   );
}



  app.get('/netstatus', function (req, res){
  	res.header("Access-Control-Allow-Origin", "*");
  	for (var i = 0; i < banksInfo.accounts.length; i++) {
  		
  		for (var j = 0; j < banksInfo.accounts[i].atms.length; j++) {

  			checkConnection(i, j, function(){
  				res.json(banksInfo);
  			});
  		}
  		
  	}
  	


  });//return balance of an account

  app.listen(6102, ()=>console.log("started netMon server"));





	




