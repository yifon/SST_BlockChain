pragma solidity ^0.4.0;
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
}
