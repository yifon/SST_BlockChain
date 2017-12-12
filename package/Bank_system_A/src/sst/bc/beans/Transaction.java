package sst.bc.beans;

public class Transaction {
	//from_cardNumber,to_cardNumber+pin+amount+type+trxHash+balance+result
	private String from_cardNumber;
	private String to_cardNumber;
	private int pin;
	private int amount;
	private String type;
	private String trxHash;
	private String balance;
	private String tfrtype;
	private String aqbank;
	private String atmid;
	public String getAqbank() {
		return aqbank;
	}
	public void setAqbank(String aqbank) {
		this.aqbank = aqbank;
	}
	public String getTfrtype() {
		return tfrtype;
	}
	public void setTfrtype(String tfrtype) {
		this.tfrtype = tfrtype;
	}
	public Transaction() {
		super();
	}
	public String toResponse() {
		return  from_cardNumber + "|" + 
	            to_cardNumber + "|" + 
				pin +  "|" +
	            amount +  "|" + 
				type +  "|" +
	            trxHash +  "|" +
				balance +  "|" +
	            result +  "|" + 
				fee+"|"+
	            tfrtype+"|"+
				aqbank+"|"+
	            atmid;
	}
	public Transaction(String from_cardNumber, String to_cardNumber, int pin, int amount, String type, String trxHash,
			String balance, int result, int fee,String tfrtype, String aqbank, String atmid ) {
		super();
		this.from_cardNumber = from_cardNumber;
		this.to_cardNumber = to_cardNumber;
		this.pin = pin;
		this.amount = amount;
		this.type = type;
		this.trxHash = trxHash;
		this.balance = balance;
		this.tfrtype = tfrtype;
		this.aqbank = aqbank;
		this.atmid = atmid;
		this.result = result;
		this.fee = fee;
	}
	@Override
	public String toString() {
		return "Transaction [from_cardNumber=" + from_cardNumber + ", to_cardNumber=" + to_cardNumber + ", pin=" + pin
				+ ", amount=" + amount + ", type=" + type + ", trxHash=" + trxHash + ", balance=" + balance
				+ ", tfrtype=" + tfrtype + ", aqbank=" + aqbank + ", atmid=" + atmid + ", result=" + result + ", fee="
				+ fee + "]";
	}
	public String getAtmid() {
		return atmid;
	}
	public void setAtmid(String atmid) {
		this.atmid = atmid;
	}
	public String getFrom_cardNumber() {
		return from_cardNumber;
	}
	public void setFrom_cardNumber(String from_cardNumber) {
		this.from_cardNumber = from_cardNumber;
	}
	public String getTo_cardNumber() {
		return to_cardNumber;
	}
	public void setTo_cardNumber(String to_cardNumber) {
		this.to_cardNumber = to_cardNumber;
	}
	public int getPin() {
		return pin;
	}
	public void setPin(int pin) {
		this.pin = pin;
	}
	public int getAmount() {
		return amount;
	}
	public void setAmount(int amount) {
		this.amount = amount;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getTrxHash() {
		return trxHash;
	}
	public void setTrxHash(String trxHash) {
		this.trxHash = trxHash;
	}
	public String getBalance() {
		return balance;
	}
	public void setBalance(String balance) {
		this.balance = balance;
	}
	public int getResult() {
		return result;
	}
	public void setResult(int result) {
		this.result = result;
	}
	private int result;
	
	private int fee;
	public int getFee() {
		return fee;
	}
	public void setFee(int fee) {
		this.fee = fee;
	}

}
