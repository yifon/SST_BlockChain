package sst.bc.beans;

import java.text.DecimalFormat;

public class CardToken {
	private int id;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	private String cardNumber;
	private String cardHolder;
	private int balance;
	private int pin;
	DecimalFormat df= new DecimalFormat("#");
	public CardToken(String cardNumber, String cardHolder, int balance, int pin) {
		super();
		this.cardNumber = cardNumber;
		this.cardHolder = cardHolder;
		this.balance = balance;
		this.pin = pin;
	}
	public CardToken(int id, String cardNumber, String cardHolder, int balance, int pin) {
		super();
		this.id = id;
		this.cardNumber = cardNumber;
		this.cardHolder = cardHolder;
		this.balance = balance;
		this.pin = pin;
	}
	public CardToken() {
		super();
	}
	public String getCardNumber() {
		return cardNumber;
	}
	public void setCardNumber(String cardNumber) {
		this.cardNumber = cardNumber;
	}
	public String getCardHolder() {
		return cardHolder;
	}
	public void setCardHolder(String cardHolder) {
		this.cardHolder = cardHolder;
	}
	public int getBalance() {
		return balance;
	}
	public void setBalance(int balance) {
		this.balance = balance;
	}
	public int getPin() {
		return pin;
	}
	public void setPin(int pin) {
		this.pin = pin;
	}
	@Override
	public String toString() {
		return "CardToken [id=" + id + ", cardNumber=" + cardNumber + ", cardHolder=" + cardHolder + ", balance="
				+ balance + ", pin=" + pin + "]";
	}
	

}
