package sst.bc.utility;

import sst.bc.beans.CardToken;

public class AccountValidation {
	
	public static boolean cardNumberValidation(String cardnumber) {
		boolean result = true;
		if(cardnumber==null||"".equals(cardnumber)){
			
			result = false;
		}
		return result;
	}
	public static boolean pinValidation(int pin) {
		boolean result = true;
		if(String.valueOf(pin).length()!=6){
			
			result = false;
		}
		return result;
	}
	
	public static boolean pinMatch(int pin,CardToken cardToken) {
		boolean result = false;
		if(pin==cardToken.getPin()){
			result = true;
		}
		return result;
	}
	
	public static boolean cashWithdrawalValidation(int amount,CardToken cardToken) {
		boolean result = false;
		if(cardToken.getBalance()>amount){
			
			result = true;
		}
		return result;
	}
	
	public static boolean amountValidation(double amount) {
		boolean result = false;
		if(amount>0){
			
			result = true;
		}
		return result;
	}


}
