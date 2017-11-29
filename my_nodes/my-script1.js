a = eth.accounts[0]
web3.eth.defaultAccount = a;

// abi and bytecode generated from simplestorage.sol:
// > solcjs --bin --abi simplestorage.sol
var abi = [{"constant":false,"inputs":[{"name":"x","type":"uint256"}],"name":"set","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"retVal","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"a","type":"uint256"}],"name":"multiply","outputs":[{"name":"d","type":"uint256"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_from","type":"address"}],"name":"TestEvent","type":"event"}];

var bytecode = "0x606060405234610000575b610130806100186000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806360fe47b11461004e5780636d4ce63c1461006b578063c6888fa11461008e575b610000565b346100005761006960048080359060200190919050506100bf565b005b3461000057610078610117565b6040518082815260200191505060405180910390f35b34610000576100a96004808035906020019091905050610122565b6040518082815260200191505060405180910390f35b806000819055507fab77f9000c19702a713e62164a239e3764dde2ba5265c7551f9a49e0d304530d33604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390a15b50565b600060005490505b90565b60006007820290505b91905056";

var simpleContract = web3.eth.contract(abi);
var simple = simpleContract.new({from:web3.eth.accounts[0], data: bytecode, gas: 0x47b760}, function(e, contract) {
	if (e) {
		console.log("err creating contract", e);
	} else {
		if (!contract.address) {
			console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
		} else {
			console.log("Contract mined! Address: " + contract.address);
			console.log(contract);
		}
	}
});



