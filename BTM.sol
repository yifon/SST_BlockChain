pragma solidity ^0.4.0;

contract owned {
    address public owner;

    function owned() public {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function transferOwnership(address newOwner) onlyOwner public {
        owner = newOwner;
    }
}

contract BTM is owned{
    mapping (address => int256) private balanceOf;//cg: represent balance of each account
    mapping (address => string) public nameOf;
    mapping (string => address[]) atmsOf;
    event Withdrawal(string _issueBank, string _account, string _pwd, int _amount);
    function BTM(){
        //init some testing data
        //init bank acc
        
        nameOf[0x100000]="hsbc";
        
        nameOf[0x200000]="hase";
        //init atm acc
        
        address[] memory newAdds1 = new address[](2);
        newAdds1[0] = 0x14723a09acff6d2a60dcdf7aa4aff308fddc160c;
        newAdds1[1] = 0x4b0897b0513fdc7c541b6d9d7e929c4e5364d2db;
        atmsOf["hsbc"] = newAdds1;
        
        address[] memory newAdds2 = new address[](2);
        newAdds2[0] = 0x583031d1113ad414f02576bd6afabfb302140225;
        newAdds2[1] = 0xdd870fa1b7c4700f2bd7f44238821c26f7392148;
        atmsOf["hase"] = newAdds2;
        
        
        
    }
    //struct BankAtms{
    //   mapping (address =>int256) balanceOf;
    //}
    //mapping (address=>BankAtms) bankAtmList;//mapping of bankName - ATMList
    function addBank(address _bankAdd, string _bankName) external onlyOwner{
        balanceOf[_bankAdd] = 0;
        nameOf[_bankAdd] = _bankName;
    }
    function addATM(string _bankName, address _atmAdd) external onlyOwner{
        //if(bankAtmList[_bankAdd] == 0){
        //    bankAtmList[_bankAdd] = BankAtms();//assign a new BankAtms 
        //}else{
        // //do nth   
        //}
        //atmsOf[_bankName];
        balanceOf[_atmAdd] = 0;
        uint oldLength = atmsOf[_bankName].length;
        address[] memory newAdds = new address[](oldLength+1);
        for(uint i = 0; i < oldLength; i ++){
            newAdds[i] = atmsOf[_bankName][i];
        }
        newAdds[oldLength] = _atmAdd;
        atmsOf[_bankName] = newAdds;
    }
    function getBankAtms(string _bankName) external view returns(address[] s){
        return atmsOf[_bankName];
    }
    
    //this function must be only called by the aquiring ATM
    //it broadcast event for an issuing bank ATM to pick the transaction for authorisation
    function withdraw(address _issueBank, string _account, string _pwd, int _amount) external {
        Withdrawal(nameOf[_issueBank],_account,_pwd,_amount);
    }
    
    
    //get balance of any account - can only be called by owner
    function getBalance(address _add) external view onlyOwner returns (int256) {
        return balanceOf[_add];
    }
    
    //return myself's balance who call's this
    function myBalance() external view returns (int256){
        return balanceOf[msg.sender];
    }
    
}
