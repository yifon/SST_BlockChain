package sst.bc.service;



public interface GetBankAccountInfo {
	
	public String getAccountBalance(String cardNumber,int pin);
	
	public String getAccountRecords(String cardNumber);
	
	public String accountOpen(String cardHolder, int pin);
	
	public String cashWithdrawal(String cardNumber, int pin, int amount);
	
	public String cashDeposit(String cardNumber, int pin, int amount);
	
	public boolean pinVerify(String cardNumber, int pin);
	
	public String getAllcards();
	
	public String[] downloadBins();
	
	public String deletedBin(String bin);
	
	public String addBins(String bin);
	//only for internal 
	public String transfer(String cardNumber_from, int pin, int amount,String cardNumber_to);
	
	public String request_transaction(String data);
	public String request_account_records(String cardNumber);
	
}
