
/*
BTM (representing central bank): "0x8c632e1968c26ecc1f8fa82ac5cf9c4e1ea5884a"
Bank1: 0x01751f1b5a22aaee0824d68b888f2190a663d768
Bank2: 0x8bdce7b955646a7c620565be1117edb77c101e9b
Bank3: 0xed9d02e382b34818e88b88a309c7fe71e65f419d 


BTM contract add: 0x02de28d224c23b5aeff3561fbdf7a6ef15212344 - It's created on Node1 

Bank1:
ATM1: 0xca843569e3427144cead5e4d5999a3d0ccf92b8e - Node2
ATM2: 0x81743ae6efb798ae288fa724aace76dcf8835e37 - It's created on Node3

Bank2:
ATM1: 0x9186eb3d20cbd1f5f992a950d808c4495153abd5 - created on Node4
ATM2: 0x0638e1574728b6d862dd5d3a3e0942c3be47d996 - created on Node5


Bank3:
ATM1: 0xfc1cb1978f2435c8f2564d2c801f399d11479d0f - created on Node6
ATM2: 0xc2376f4675a774f120ea688c4756ae49a7020ccd - created on Node7
*/
var fs=require('fs');
var cors = require('cors');

var contractInitVars = {contractfile:"/root/nodes/BTM.json",web3http:"http://localhost:7101", contractAdd:"0x8182dd293942ff6839e6e8c8a71981bb8ad655e5"};

	var Web3 = require('web3');
	
	var web3 = new Web3(new Web3.providers.HttpProvider(contractInitVars.web3http));//pls note the port to be deployed, one port = one instance, different nodes may have different behaviors   
	web3.personal.unlockAccount(web3.eth.accounts[0],'',0);

	var json = JSON.parse(fs.readFileSync(contractInitVars.contractfile));
	var abi = json.abi;
	var contract = web3.eth.contract(abi).at(contractInitVars.contractAdd);



var express = require('express');
var app = express();
app.use(cors());
var http = require('http');
var banksInfo = JSON.parse(fs.readFileSync("banks.json"));






//return a new json with the following structure
/*[
{'name':'abc', 'address'："0x", 'balance': 10000,
	'atms': [
		{'name':'A001', 'address'："0x", 'balance': 100},
		{'name':'A002', 'address'："0x", 'balance': 100},...
	]
},...
]

*/
app.get('/balances', function (req, res){
	res.header("Access-Control-Allow-Origin", "*");
	
	
	console.log("get balances："+contract.getBalance("0xca843569e3427144cead5e4d5999a3d0ccf92b8e"));
	for (var i = 0; i < banksInfo.accounts.length; i++) {
		banksInfo.accounts[i].balance = contract.getBalance(banksInfo.accounts[i].address);
		console.log(banksInfo.accounts[i].address+":"+banksInfo.accounts[i].balance);
		console.log(banksInfo.accounts[i].atms.length);
		for (var j = 0; j < banksInfo.accounts[i].atms.length; j++) {

			banksInfo.accounts[i].atms[j].balance = contract.getBalance(banksInfo.accounts[i].atms[j].address);
			console.log(banksInfo.accounts[i].atms[j].address+"："+banksInfo.accounts[i].atms[j].balance);
		}
		
	}	

	res.json(banksInfo);


});//return balance of an account



app.get('/updateBalance', function (req, res){
	res.header("Access-Control-Allow-Origin", "*");
	
	var headers = req.headers;
	var account = headers.account;


	var balance = headers.balance;
	console.log("update bal:"+account+":"+balance);
	contract.changeBalance(account, parseInt(balance), {from:web3.eth.accounts[0],  gas: 0x47b760});
	res.sendStatus(200);
	res.end();


});//return balance of an account




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

/*

  app.get('/netstatus', function (req, res){
  	//res.header("Access-Control-Allow-Origin", "*");
  	for (var i = 0; i < banksInfo.accounts.length; i++) {
  		
  		for (var j = 0; j < banksInfo.accounts[i].atms.length; j++) {
  		 			
  			checkConnection(i, j, function(){
  				res.json(banksInfo);
  			});
  		}
  		
  	}
  	


  });//return balance of an account
*/
app.use(express.static('static'));

app.listen(6101, ()=>console.log("started server"));


