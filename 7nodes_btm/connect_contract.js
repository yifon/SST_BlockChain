

var http=require('http');
var fs=require('fs');


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

      var Web3 = require('web3');
      
      var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7101"));//pls note the port to be deployed, one port = one instance, different nodes may have different behaviors   
      web3.personal.unlockAccount(web3.eth.accounts[0],'',0);

      var abi = jsonRes.contractABI;
      console.log("contract:"+jsonRes.contractAdd);
      console.log("abi:"+abi);
      var contract = web3.eth.contract(abi).at(jsonRes.contractAdd);

      var banksInfo = JSON.parse(fs.readFileSync("banks.json"));
      console.log("loop bank info");
      //started from 1 to skip BTM
      for (var i = 1; i < banksInfo.accounts.length; i++) {
        console.log("i:"+banksInfo.accounts[i].address);
        var atms=[];
        for (var j = 0; j < banksInfo.accounts[i].atms.length; j++) {
          console.log("j:"+banksInfo.accounts[i].atms[j].address);
          atms.push(banksInfo.accounts[i].atms[j].address);
        }
        
        console.log(atms);
        console.log(contract.setBankATM(banksInfo.accounts[i].address, atms,{from: web3.eth.accounts[0]}));//must from the owner node       
        
      } 

        
       




    });
  }
  

  );


  









