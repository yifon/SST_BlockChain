package sst.bc.utility;


import sst.bc.beans.CardToken;
import sst.bc.beans.Transaction;
import sst.bc.dao.AccountDao;

public class TransactionHandler {
	
	public Transaction transaction;
	public AccountDao accountDao;
	public TransactionRecordHandler transactionRecordHandler;
	public String handleRequest(String data){
		String response = data;
		String[] requestdata =data.split("\\|");
	//	from_cardNumber,to_cardNumber+pin+amount+type+trxHash+balance+result+fee+tfrtype+aqbank+atmid
		transaction = new Transaction(requestdata[0], requestdata[1], Integer.valueOf(requestdata[2]), Integer.valueOf(requestdata[3]), requestdata[4], requestdata[5] ,requestdata[6], Integer.valueOf(requestdata[7]), Integer.valueOf(requestdata[8]),requestdata[9],requestdata[10],requestdata[11]);
        System.out.println(transaction.getType());
		switch (transaction.getType()) {
		case "cwd":
			response= this.cashWithdrawal(transaction);
			break;
		case "cdp":
			response= this.cashDeposit(transaction);
			break;
		case "tfr":
			if (transaction.getTfrtype().equals("internal")) {
				response= this.transfer(transaction);
			}else if (transaction.getTfrtype().equals("debit")) {
				response= this.transferDebit(transaction);
			}else if (transaction.getTfrtype().equals("credit")) {
				response= this.transferCredit(transaction);
			}else {
				response= this.transfer(transaction);
			}
			
			break;
		case "inq":
			response= this.getAccountBalance(transaction);
			break;

		default:
			break;
		}
		System.out.println(response);
		return response;
	}
	public String getAccountBalance(Transaction transaction) {
	    CardToken cardToken;
	    Transaction transaction2 = transaction;
	    //1000 accept
	    int result = 2000;
		int balance = 0;
		String reason ="";
		boolean  save = false;
		accountDao = new AccountDao();
		// TODO Auto-generated method stub
		System.out.println("cardNumber="+transaction2.getFrom_cardNumber());
		if (AccountValidation.cardNumberValidation(transaction2.getFrom_cardNumber())) {
			cardToken = accountDao.getCardTokenInfo(transaction2.getFrom_cardNumber());
			if (cardToken!=null) {
				if (AccountValidation.pinMatch(transaction2.getPin(), cardToken)) {
					balance = cardToken.getBalance();
					result = 1000;
					transaction2.setBalance(Formator.formatBlance(balance));
					
				}else {
					reason ="Pin Incorrect";
				}
				
			}else {
				reason ="Card not find";
			}
		}else {
			reason ="Incorrect Card";
		}
		transaction2.setResult(result);
		System.out.println(transaction2.toResponse());
		transactionRecordHandler = new TransactionRecordHandler();
		save = transactionRecordHandler.saveTransactionRecord(transaction2);
		System.out.println(save);
		System.out.println(transaction2.toResponse());
		return transaction2.toResponse();
	}

	public String getAccountRecords(String cardNumber) {
		// TODO Auto-generated method stub
		return "";
	}

	public String accountOpen(String cardHolder ,int pin) {
		// TODO Auto-generated method stub
		return "";
	}

	public String cashWithdrawal(Transaction transaction) {
		// TODO Auto-generated method stub
		CardToken cardToken;
		Transaction transaction2 = transaction;
		int responsecode = 2000;
		int balance = 0;
		boolean result = false;
		String reason ="";
		accountDao = new AccountDao();
		// TODO Auto-generated method stub
		System.out.println("cardNumber="+transaction2.getFrom_cardNumber());
		System.out.println("amount="+transaction2.getAmount());
		if (AccountValidation.cardNumberValidation(transaction2.getFrom_cardNumber())&&AccountValidation.amountValidation(transaction2.getAmount())) {
			cardToken = accountDao.getCardTokenInfo(transaction2.getFrom_cardNumber());
			if (cardToken!=null) {
				if (AccountValidation.pinMatch(transaction2.getPin(), cardToken)) {
					if (AccountValidation.cashWithdrawalValidation(transaction2.getAmount(), cardToken)) {
						cardToken.setBalance(cardToken.getBalance()-transaction2.getAmount()-transaction2.getFee());
						System.out.println(cardToken);
						result = accountDao.updateBalance(cardToken);
						if (result) {
							responsecode=1000;
							balance = cardToken.getBalance();
							transaction2.setBalance(Formator.formatBlance(balance));
							
						}
					}else {
						reason ="not sufficient funds";
					}
					
				}else {
					reason ="Pin Incorrect";
				}
				
			}else {
				reason ="Card not find";
			}
		}else {
			 reason ="Incorrect Card number or amount";
		}
		transaction2.setResult(responsecode);
		transactionRecordHandler = new TransactionRecordHandler();
		transactionRecordHandler.saveTransactionRecord(transaction2);
		return transaction2.toResponse();
	}

	public String cashDeposit(Transaction transaction) {
		// TODO Auto-generated method stub
		CardToken cardToken;
		Transaction transaction2 = transaction;
		int responsecode = 2000;
		int balance = 0;
		boolean result = false;
		String reason ="";
		accountDao = new AccountDao();
		// TODO Auto-generated method stub
		System.out.println("cardNumber="+transaction2.getFrom_cardNumber());
		System.out.println("amount="+transaction2.getAmount());
		if (AccountValidation.cardNumberValidation(transaction2.getFrom_cardNumber())&&AccountValidation.amountValidation(transaction2.getAmount())) {
			cardToken = accountDao.getCardTokenInfo(transaction2.getFrom_cardNumber());
			if (cardToken!=null) {
				cardToken.setBalance(cardToken.getBalance()+transaction2.getAmount()-transaction2.getFee());
				System.out.println(cardToken);
				result = accountDao.updateBalance(cardToken);
				if (result) {
					balance = cardToken.getBalance();
					responsecode=1000;
					transaction2.setBalance(Formator.formatBlance(balance));
					
				}
			}else {
				reason ="Card not find";
			}
		}else {
			 reason ="Incorrect Card number or amount";
		}
		transaction2.setResult(responsecode);
		transactionRecordHandler = new TransactionRecordHandler();
		transactionRecordHandler.saveTransactionRecord(transaction2);
		return transaction2.toResponse();
	}




	
	public String transfer(Transaction transaction) {
		// TODO Auto-generated method stub
		CardToken cardToken;
		CardToken cardToken_to;
		Transaction transaction2 = transaction;
		int responsecode = 2000;
		int balance = 0;
		boolean result = false;
		boolean result2 = false;
		String reason ="";
		accountDao = new AccountDao();
		// TODO Auto-generated method stub
		System.out.println("cardNumber_from="+transaction2.getFrom_cardNumber());
		System.out.println("cardNumber_to="+transaction2.getTo_cardNumber());
		System.out.println("amount="+transaction2.getAmount());
		if (AccountValidation.cardNumberValidation(transaction2.getFrom_cardNumber())&&AccountValidation.amountValidation(transaction2.getAmount())&&AccountValidation.cardNumberValidation(transaction2.getTo_cardNumber())) {
			cardToken = accountDao.getCardTokenInfo(transaction2.getFrom_cardNumber());
			if (cardToken!=null) {
				if (AccountValidation.pinMatch(transaction2.getPin(), cardToken)) {
					if (AccountValidation.cashWithdrawalValidation(transaction2.getAmount(), cardToken)) {
						
						cardToken_to = accountDao.getCardTokenInfo(transaction2.getTo_cardNumber());
						if (cardToken_to!=null) {
							cardToken.setBalance(cardToken.getBalance()-transaction2.getAmount()-transaction2.getFee());
							cardToken_to.setBalance(cardToken_to.getBalance()+transaction2.getAmount());
							
							result = accountDao.updateBalance(cardToken);
							result2 = accountDao.updateBalance(cardToken_to);
							if (result&result2) {
								balance = cardToken.getBalance();
								responsecode=1000;
								transaction2.setBalance(Formator.formatBlance(balance));
								
							}
						}
							
						
					}else {
						reason ="not sufficient funds";
					}
					
				}else {
					reason ="Pin Incorrect";
				}
				
			}else {
				reason ="Card not find";
			}
		}else {
			 reason ="Incorrect Card number or amount";
		}
		transaction2.setResult(responsecode);
		transactionRecordHandler = new TransactionRecordHandler();
		transactionRecordHandler.saveTransactionRecord(transaction2);
		return transaction2.toResponse();
	}
	public String transferDebit(Transaction transaction) {
		// TODO Auto-generated method stub
		CardToken cardToken;
		Transaction transaction2 = transaction;
		int responsecode = 2000;
		int balance = 0;
		boolean result = false;
		String reason ="";
		accountDao = new AccountDao();
		// TODO Auto-generated method stub
		System.out.println("cardNumber_from="+transaction2.getFrom_cardNumber());
		System.out.println("amount="+transaction2.getAmount());
		if (AccountValidation.cardNumberValidation(transaction2.getFrom_cardNumber())&&AccountValidation.amountValidation(transaction2.getAmount())) {
			cardToken = accountDao.getCardTokenInfo(transaction2.getFrom_cardNumber());
			if (cardToken!=null) {
				if (AccountValidation.pinMatch(transaction2.getPin(), cardToken)) {
					if (AccountValidation.cashWithdrawalValidation(transaction2.getAmount(), cardToken)) {
						
							cardToken.setBalance(cardToken.getBalance()-transaction2.getAmount()-transaction2.getFee());
							
							result = accountDao.updateBalance(cardToken);
							if (result) {
								balance = cardToken.getBalance();
								responsecode=1000;
								transaction2.setBalance(Formator.formatBlance(balance));
								
							}
						}else {
						reason ="not sufficient funds";
					}
					
				}else {
					reason ="Pin Incorrect";
				}
				
			}else {
				reason ="Card not find";
			}
		}else {
			 reason ="Incorrect Card number or amount";
		}
		transaction2.setResult(responsecode);
		transactionRecordHandler = new TransactionRecordHandler();
		transactionRecordHandler.saveTransactionRecord(transaction2);
		return transaction2.toResponse();
	}

	public String transferCredit(Transaction transaction) {
		// TODO Auto-generated method stub
		CardToken cardToken_to;
		Transaction transaction2 = transaction;
		int responsecode = 2000;
		boolean result = false;
		String reason = "";
		accountDao = new AccountDao();
		// TODO Auto-generated method stub
		System.out.println("cardNumber_to=" + transaction2.getTo_cardNumber());
		System.out.println("amount=" + transaction2.getAmount());
		if (AccountValidation.amountValidation(transaction2.getAmount())
				&& AccountValidation.cardNumberValidation(transaction2.getTo_cardNumber())) {
			cardToken_to = accountDao.getCardTokenInfo(transaction2.getTo_cardNumber());
			if (cardToken_to != null) {

				cardToken_to.setBalance(cardToken_to.getBalance() + transaction2.getAmount());

				result = accountDao.updateBalance(cardToken_to);
				if (result) {
					responsecode = 1000;

				}
			} else {
				reason = "Card not find";
			}
		} else {
			reason = "Incorrect Card number or amount";
		}
		transaction2.setResult(responsecode);
		transactionRecordHandler = new TransactionRecordHandler();
		transactionRecordHandler.saveTransactionRecord(transaction2);
		return transaction2.toResponse();
	}
	public static void main(String[] args) {
		String[] aa = "aaa|bbb|ccc".split("\\|");
		for (int i = 0; i < aa.length; i++) {
			System.out.println(aa[i]);
		}
		
	}

}
