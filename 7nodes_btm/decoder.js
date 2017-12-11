ContractNode = {
  //init the node contract
  //contractfile - name prefix of .ABI and .bin file
  //web3http - the web3 http link
  //add - the contract address
  //callback - the callback when contract is inited
  //authorisedCallback - the callback when authorisation completes

  initContract : function(contractfile, web3http){
    console.log("initContract");

    var http = require('http');
    var Web3 = require('web3');
    var fs=require('fs');
    const abiDec=require('abi-decoder');

    var bank = "";//TODO 



    
    web3 = new Web3(new Web3.providers.HttpProvider(web3http));//pls note the port to be deployed, one port = one instance, different nodes may have different behaviors   



    fs.readFile(contractfile+".json", 'utf8',function(err,data){//contractAdd.txt contain the contract address
      var json = JSON.parse(data);
      var abi = json.abi;
      abiDec.addABI(abi);
      console.log(abiDec);
      console.log("----------------");
      const dd = "0x000000000000000000000000ca843569e3427144cead5e4d5999a3d0ccf92b8e0000000000000000000000008bdce7b955646a7c620565be1117edb77c101e9b000000000000000000000000ed9d02e382b34818e88b88a309c7fe71e65f419d00000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000064000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000003e800000000000000000000000000000000000000000000000000000000000000187b746f203a2027313233272c66726f6d3a2027343536277d0000000000000000";
      console.log(abiDec.decodeMethod(dd));

      const txRc ="0x688817b6b357a9cbd783408a1ee2453e65a75de8b8f9c8b14dd8e0ad4c055877";
      console.log("################")
      web3.eth.getTransactionReceipt(txRc, function(e, receipt){
        console.log("receipt");
        console.log(receipt);
        console.log("receipt.logs");
        console.log(receipt.logs);

        const logs = abiDec.decodeLogs(receipt.logs);
        console.log("logs");
        console.log(logs);
        console.log(logs[0]);
        console.log(logs[0].events);
      });
         

    
        

      //});// end of read bin file

      

    });//end of read abi file

  }//end of initContract
  
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


var initCallback= function(jsonRes){

  var Web3 = require('web3');
  var fs=require('fs');
  const abiDec=require('abi-decoder');  
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7101"));
  
  abiDec.addABI(jsonRes.contractABI);
  console.log("block no:"+web3.eth.blockNumber);
  for(var i=580;i<=web3.eth.blockNumber;i++){
    var block = web3.eth.getBlock(i);  
    console.log(i);
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
        console.log("logs 0:"+logs.length);
        
        console.log(logs[0]);
        
      //});
    
    }
  }
  

  
  

}





initConig(initCallback);














  



