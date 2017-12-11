
var express = require('express');
var app = express();
var Web3 = require('web3');
var cors = require('cors');
	
app.use(cors());

function checkConnection(port){
	var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:"+port));//pls note the port to be deployed, one port = one instance, different nodes may have different behaviors   
	
	return web3.isConnected();

}


app.get('/network', function (req, res){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, X-Codingpedia,Authorization");
	

	var headers = req.headers;
	var portstr = headers.port;

	res.json({port: portstr, isConnected: checkConnection(portstr)});

});//return balance of an account
app.listen(6102, ()=>console.log("started network monitor"));

