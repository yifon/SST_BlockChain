

var initCallback= function(jsonRes){

  var Web3 = require('web3');
  var fs=require('fs');
  const abiDec=require('abi-decoder');  
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7101"));
  
  abiDec.addABI(jsonRes.contractABI);
  console.log("block no:"+web3.eth.blockNumber);
  
  
  var express = require('express');
  var app = express();
  var url = require('url');

  app.get('/blocktx', function (req, res){
  	 res.header("Access-Control-Allow-Origin", "*");
  	 var data = url.parse(req.url, true).query;

	var trxRecords = [];

	for(var i=parseInt(data.startBlock);i<=web3.eth.blockNumber;i++){
	  var block = web3.eth.getBlock(i);  
	  
	  var trxs = block.transactions;
	  for (var trxI = 0;    trxI < trxs.length; trxI++) {
	    console.log("tx:"+trxs[trxI]);

	    console.log("################")
	    var receipt = web3.eth.getTransactionReceipt(trxs[trxI]);//, function(e, receipt){
	      /*
	      console.log("receipt");
	      console.log(receipt);
	      console.log("receipt.logs");
	      console.log(receipt.logs);
	      */
	    var logs = abiDec.decodeLogs(receipt.logs);
	    console.log("checking:"+logs[0]);
	    try{
	    	if(logs[0]!=undefined && logs[0].name == "Commit" && logs[0].address ==jsonRes.contractAdd) {// this is a Commit action, and from the BTM contract
	    	var aRecord = {blockNumber: i, timeStamp: block.timestamp, log: logs[0]};
	    	trxRecords.push(aRecord);
	    }
	    }catch(err){//just ignore any error due to e.g. undefined event
	    	console.log(err);
	    }
	        
	  }
	}	
  	res.json(trxRecords);


  });//return balance of an account

  app.listen(6101, ()=>console.log("started server"));

  

}

var http = require('http');
var initConig= function(initCallback){
  http.get({
    hostname: '119.23.12.79', port: 6101,
    path: '/balances'
    }, (res)=>{
      var result ='';
      res.on('data',function(chunk){
        result += chunk;
      });
      res.on('end', function(){
        //completed request
        var jsonRes = JSON.parse(result);

        initCallback(jsonRes);

      });
    }
    

   );
}


initConig(initCallback);








