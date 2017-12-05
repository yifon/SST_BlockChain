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

contract ATMNode is owned{

    BTM btm;
    // the event to tell Node of the transaction authorisation result
    //trxHash - the unique trx id
    //status - the response status
    event WithdrawalAuthorisation(string trxHash, int status, int fee);
    //the event to tell node to start a CWD authorisation with ATMP
    event WithdrawalRequest(address _fromAtm, string trxHash, string _account, string _pwd, int _amount);
  

    //the constrcutor with a BTM contract address
    function ATMNode(address _btm) {
        btm = BTM(_btm);
    }

    //the start point of a CWD, just call BTM contract to start
    function startWithdraw(address _fromATM, string trxHash,  address _issueBank, string _account, string _pwd, int _amount) external  onlyOwner{
        btm.withdraw(_fromATM, trxHash, _issueBank,_account, _pwd, _amount);//also carry the fromATM information
        //msg.sender = the address who calling this function, i.e. the ATMnode js coinbase
    }

    //to be called by the BTM, to notify the node to start authorisation with ATMP
    function receiveWithdrawal(address _fromAtm, string trxHash, string _account, string _pwd, int _amount) external{
       // require(msg.sender == btm.address);
        
        WithdrawalRequest(_fromAtm, trxHash, _account,_pwd,_amount);
    }

    //called by the owner node after atmp authorisation. just call BTM contract to startAuthorise
    function startAuthorise(address _fromAtm, address _issueBank, string trxHash, int status, int _amount,int fee) external onlyOwner{
        btm.startAuthorise(_fromAtm, _issueBank, trxHash,status,_amount, fee); 
    }

    //called by the BTM, to notify the fromATM node of the authorisation result
    function postAuthorise(string trxHash, int status, int fee)external{
       // require(msg.sender == btm.address);
        WithdrawalAuthorisation(trxHash, status, fee);
    }
    
    function get() constant returns (int  x){
        return 123;
        
    }
    function getA() constant returns (int x){
        return btm.get();
    }
}

contract BTM is owned{
    mapping (address => int256) private balanceOf;//cg: represent balance of each account
    mapping (address => string) public nameOf;//bank address - bank name
    mapping (address => address[]) atmsOf;//bank address - the atms[] of the bank
    event Withdrawal(string _issueBank, string _account, string _pwd, int _amount);
    int constant STATUS_OK = 1000;
    //event to notify the specific debit bank ATM node to check whether the transaction can be debitted from the debit bank account.
    //the debit bank has the right to know all transaction information
    event CheckDebit(address _fromAtm, address _debitBank, address _creditBank,  string _trxHash, int256 _amount, int256 _fee);
    
    //event to notify the specific credit bank ATM node to check whether the transaction can be creditted to the credit bank account.
    //the credit bank has the right to know all transaction information
    event CheckCredit(address _fromAtm, address _debitBank, address _creditBank,  string _trxHash, int256 _amount, int256 _fee);//the debit bank has the right to know all transaction information
    //event to notify the _fromAtm node to commit the transaction
    event Commit(address _fromAtm, address _debitBank, address _creditBank,  string _trxHash, int256 _amount, int256 _fee, int _status);
    function BTM(){       
        
    }
    //the function to be called by an ATM node to start the transaction
    //_debitBank and _debitAccount must be valid, otherwise it has no point for transaction come to blockchain
    // the fee is defined by the _fromAtm because it's the _fromAtm to receive the fee
    function startTrx(address _fromAtm, address _debitBank, address _creditBank,string _trxHash, int256 _amount, int256 _fee) external{
        var debitNode = getDestNode(_debitBank);//find an ATM node from the _debitBank
        CheckDebit( _fromAtm,  _debitBank,  _creditBank,  _trxHash,   _amount,  _fee);
    }
    //to be called by the credit bank ATM node to confirm that it's ok to be creditted for the transaction
    function confirmDebit(address _fromAtm, address _debitBank, address _creditBank, string _trxHash, int256 _amount, int256 _fee, int _status) external{

        if(_status == STATUS_OK){
            //do nth but wait to check credit information
        }else{//no need to check credit, can commit transaction now (rejection)
            confirmCredit( _fromAtm,  _debitBank,  _creditBank,  _trxHash,   _amount,  _fee, _status);
        }

        if(_creditBank == 0x0){//no credit bank - like CWD, just to start confirmCredit
            confirmCredit( _fromAtm,  _debitBank,  _creditBank,  _trxHash,   _amount,  _fee, _status);
        }else{
            var creditNode = getDestNode(_creditBank);//find an ATM node from the _creditBank
            CheckCredit( _fromAtm,  _debitBank,  _creditBank,  _trxHash,   _amount,  _fee);
        }
        

    }
    function confirmCredit(address _fromAtm, address _debitBank, address _creditBank,  string _trxHash, int256 _amount, int256 _fee, int _status) public{
        if(_status == STATUS_OK){
            balanceOf[_debitBank] -= (_amount+_fee);
            balanceOf[_creditBank] += _amount;
            balanceOf[_fromAtm] += _fee;
        }        
        Commit( _fromAtm,  _debitBank,  _creditBank,  _trxHash,   _amount,  _fee, _status);

    }
    //struct BankAtms{
    //   mapping (address =>int256) balanceOf;
    //}
    //mapping (address=>BankAtms) bankAtmList;//mapping of bankName - ATMList
    function addBank(address _bankAdd, string _bankName) external onlyOwner{
        balanceOf[_bankAdd] = 0;
        nameOf[_bankAdd] = _bankName;
    }
    function addATM(address _bankAdd, address _atmAdd) external onlyOwner{
        //if(bankAtmList[_bankAdd] == 0){
        //    bankAtmList[_bankAdd] = BankAtms();//assign a new BankAtms 
        //}else{
        // //do nth   
        //}
        //atmsOf[_bankName];
        balanceOf[_atmAdd] = 0;
        uint oldLength = atmsOf[_bankAdd].length;
        address[] memory newAdds = new address[](oldLength+1);
        for(uint i = 0; i < oldLength; i ++){
            newAdds[i] = atmsOf[_bankAdd][i];
        }
        newAdds[oldLength] = _atmAdd;
        atmsOf[_bankAdd] = newAdds;
    }
    function getBankAtms(address _bankAdd) external view returns(address[] s){
        return atmsOf[_bankAdd];
    }
    
    //this function must be only called by the aquiring ATM
    //it will find an dest ATM for authorisation
    function withdraw(address _fromAtm, string trxHash, address _issueBank, string _account, string _pwd, int _amount) external {
        var destAtm = getDestNode(_issueBank);
        var destAtmNode = ATMNode(destAtm);
        destAtmNode.receiveWithdrawal(_fromAtm,trxHash,_account,_pwd,_amount);
    }
    //return an ATM node of the selected bank, randomly or load-balanced
    function getDestNode(address _issueBank) internal returns (address dest){
        return atmsOf[_issueBank][0];//TODO - need to randomly return a node
    }

    
    // this function can only be called by the destAtmNode
    // it will debit/credit, and then ask the fromATMNode to complete the trx
    function startAuthorise(address _fromAtm, address _issueBank, string trxHash, int status, int _amount, int fee) external{
        if(status == STATUS_OK){
            balanceOf[_issueBank]-= (_amount + fee);//note!!!! debit must be done before credit
            balanceOf[_fromAtm] += (_amount + fee);
        }
        var fromATMNode = ATMNode(_fromAtm);
        fromATMNode.postAuthorise(trxHash, status, fee);
    }



    
    
    //get balance of any account - can only be called by owner
    function getBalance(address _add) external view onlyOwner returns (int256) {
        return balanceOf[_add];
    }
    
    //return myself's balance who call's this
    function myBalance() external view returns (int256){
        return balanceOf[msg.sender];
    }
    function get() pure returns (int a){
        return 456;
    }
    
    
}
