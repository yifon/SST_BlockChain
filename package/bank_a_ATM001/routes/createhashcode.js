/**
 * http://usejsdoc.org/
 */
var sha1 = require('sha1');
function createhashcode(){
	
}
createhashcode.gethashCode = function (str,callback){
	
	var hash = sha1(str);
	callback(hash);
};
module.exports=createhashcode;