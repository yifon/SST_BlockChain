package sst.bc.serviceimp;

import java.util.List;


import sst.bc.beans.CardToken;
import sst.bc.dao.AccountDao;
import sst.bc.service.GetBankAccountInfo;
import sst.bc.utility.AccountValidation;
import sst.bc.utility.Formator;
import sst.bc.utility.TransactionHandler;
//@WebService(endpointInterface="sst.bc.service.GetBankAccountInfo", serviceName = "GetBankAccountInfo")
public class GetBankAccountInfoImp implements GetBankAccountInfo {
	
	public AccountDao accountDao;

	@Override
	public String getAccountBalance(String cardNumber, int pin) {
	    CardToken cardToken;
	    boolean result = false;
		int balance = 0;
		String reason ="";
		accountDao = new AccountDao();
		// TODO Auto-generated method stub
		System.out.println("cardNumber="+cardNumber);
		if (AccountValidation.cardNumberValidation(cardNumber)) {
			cardToken = accountDao.getCardTokenInfo(cardNumber);
			if (cardToken!=null) {
				if (AccountValidation.pinMatch(pin, cardToken)) {
					balance = cardToken.getBalance();
					result = true;
				}else {
					reason ="Pin Incorrect";
				}
				
			}else {
				reason ="Card not find";
			}
		}else {
			reason ="Incorrect Card";
		}
		return result+"|"+Formator.formatBlance(balance)+"|"+reason;
	}

	@Override
	public String getAccountRecords(String cardNumber) {
		// TODO Auto-generated method stub
		return "";
	}

	@Override
	public String accountOpen(String cardHolder ,int pin) {
		// TODO Auto-generated method stub
		return "";
	}

	@Override
	public String cashWithdrawal(String cardNumber, int pin, int amount) {
		// TODO Auto-generated method stub
		CardToken cardToken;
		int balance = 0;
		boolean result = false;
		String reason ="";
		accountDao = new AccountDao();
		// TODO Auto-generated method stub
		System.out.println("cardNumber="+cardNumber);
		System.out.println("amount="+amount);
		if (AccountValidation.cardNumberValidation(cardNumber)&&AccountValidation.amountValidation(amount)) {
			cardToken = accountDao.getCardTokenInfo(cardNumber);
			if (cardToken!=null) {
				if (AccountValidation.pinMatch(pin, cardToken)) {
					if (AccountValidation.cashWithdrawalValidation(amount, cardToken)) {
						cardToken.setBalance(cardToken.getBalance()-amount);
						System.out.println(cardToken);
						result = accountDao.updateBalance(cardToken);
						if (result) {
							balance = cardToken.getBalance();
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
		return result+"|"+Formator.formatBlance(balance)+"|"+reason;
	}

	@Override
	public String cashDeposit(String cardNumber, int pin ,int amount) {
		// TODO Auto-generated method stub
		CardToken cardToken;
		int balance = 0;
		boolean result = false;
		String reason ="";
		accountDao = new AccountDao();
		// TODO Auto-generated method stub
		System.out.println("cardNumber="+cardNumber);
		System.out.println("amount="+amount);
		if (AccountValidation.cardNumberValidation(cardNumber)&&AccountValidation.amountValidation(amount)) {
			cardToken = accountDao.getCardTokenInfo(cardNumber);
			if (cardToken!=null) {
				cardToken.setBalance(cardToken.getBalance()+amount);
				System.out.println(cardToken);
				result = accountDao.updateBalance(cardToken);
				if (result) {
					balance = cardToken.getBalance();
				}
			}else {
				reason ="Card not find";
			}
		}else {
			 reason ="Incorrect Card number or amount";
		}
		
		return result+"|"+Formator.formatBlance(balance)+"|"+reason;
	}

	@Override
	public boolean pinVerify(String cardNumber, int pin) {
		// TODO Auto-generated method stub
		CardToken cardToken;
		boolean result = false;
		accountDao = new AccountDao();
		// TODO Auto-generated method stub
		System.out.println("cardNumber=" + cardNumber);
		if (AccountValidation.cardNumberValidation(cardNumber) & AccountValidation.pinValidation(pin)) {
			cardToken = accountDao.getCardTokenInfo(cardNumber);
			if (cardToken != null) {
				result = pin == cardToken.getPin();
			}
		}
		return result;
	}

	@Override
	public String getAllcards() {
		// TODO Auto-generated method stub
		String cardList =""; 
		accountDao = new AccountDao();
		List<CardToken> list = accountDao.getAllCards();
		for (CardToken cardToken : list) {
			cardList += cardToken.getCardNumber()+"|";
		}
		return cardList;
	}

	@Override
	public String[] downloadBins() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String deletedBin(String bin) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String addBins(String bin) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String transfer(String cardNumber_from, int pin, int amount, String cardNumber_to) {
		// TODO Auto-generated method stub
		CardToken cardToken;
		CardToken cardToken_to;
		int balance = 0;
		boolean result = false;
		boolean result2 = false;
		String reason ="";
		accountDao = new AccountDao();
		// TODO Auto-generated method stub
		System.out.println("cardNumber_from="+cardNumber_from);
		System.out.println("cardNumber_to="+cardNumber_to);
		System.out.println("amount="+amount);
		if (AccountValidation.cardNumberValidation(cardNumber_from)&&AccountValidation.amountValidation(amount)&&AccountValidation.cardNumberValidation(cardNumber_to)) {
			cardToken = accountDao.getCardTokenInfo(cardNumber_from);
			if (cardToken!=null) {
				if (AccountValidation.pinMatch(pin, cardToken)) {
					if (AccountValidation.cashWithdrawalValidation(amount, cardToken)) {
						
						cardToken_to = accountDao.getCardTokenInfo(cardNumber_to);
						if (cardToken_to!=null) {
							cardToken.setBalance(cardToken.getBalance()-amount);
							cardToken_to.setBalance(cardToken_to.getBalance()+amount);
							
							result = accountDao.updateBalance(cardToken);
							result2 = accountDao.updateBalance(cardToken_to);
							if (result&result2) {
								balance = cardToken.getBalance();
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
		return result+"|"+Formator.formatBlance(balance)+"|"+reason;
	}

	@Override
	public String request_transaction(String data) {
		// TODO Auto-generated method stub
		TransactionHandler transactionHandler = new TransactionHandler();
		System.out.println(data);
		return transactionHandler.handleRequest(data);
	}

	@Override
	public String request_account_records(String cardNumber) {
		// TODO Auto-generated method stub
		return null;
	}

}
