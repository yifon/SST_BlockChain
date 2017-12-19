/**
 * http://usejsdoc.org/
 */
var io = require('socket.io-client');
function socket_client(){}
socket_client.init = function(){
var socket = io("ws://39.108.142.194:7004");
console.log("init socket_client");
return socket;
};


module.exports=socket_client;