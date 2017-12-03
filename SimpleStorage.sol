pragma solidity ^0.4.0;

contract AA{

    function simple() returns(uint d){
        return 32;

    }
}


contract SimpleStorage {
    event TestEvent(address _from);
    uint storeddata;
    
    function set(uint x) {
        storeddata = x;
        TestEvent(msg.sender);
    }
    function get() constant returns(uint retVal)  {
        return storeddata;
    }
    function multiply(uint a) returns(uint d) {
        return a * 7;
    }
    function getA(address add) returns (uint a){
        return AA(add).simple();
    }
}
