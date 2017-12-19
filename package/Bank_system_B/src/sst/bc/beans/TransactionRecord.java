package sst.bc.beans;

public class TransactionRecord {
	
	private String txnType; //inq cwd cdp tfr 
	private String account;
	private String fromAccount;
	private String toAccount;
	private int amount;
	private int fee;
	private String date;
	private String aqbank ;
	private String atmid ;
	public String getAtmid() {
		return atmid;
	}
	public void setAtmid(String atmid) {
		this.atmid = atmid;
	}
	public String getTxnType() {
		return txnType;
	}
	public void setTxnType(String txnType) {
		this.txnType = txnType;
	}
	public String getAccount() {
		return account;
	}
	public void setAccount(String account) {
		this.account = account;
	}
	public TransactionRecord(String txnType, String account, String fromAccount, String toAccount, int amount, int fee,
			String date, String aqbank, String atmid) {
		super();
		this.txnType = txnType;
		this.account = account;
		this.fromAccount = fromAccount;
		this.toAccount = toAccount;
		this.amount = amount;
		this.fee = fee;
		this.date = date;
		this.aqbank = aqbank;
		this.atmid = atmid;
	}
	@Override
	public String toString() {
		return "TransactionRecord [txnType=" + txnType + ", account=" + account + ", fromAccount=" + fromAccount
				+ ", toAccount=" + toAccount + ", amount=" + amount + ", fee=" + fee + ", date=" + date + ", aqbank="
				+ aqbank + ", atmid=" + atmid + "]";
	}
	public String getFromAccount() {
		return fromAccount;
	}
	public void setFromAccount(String fromAccount) {
		this.fromAccount = fromAccount;
	}
	public String getToAccount() {
		return toAccount;
	}
	public void setToAccount(String toAccount) {
		this.toAccount = toAccount;
	}
	public int getAmount() {
		return amount;
	}
	public void setAmount(int amount) {
		this.amount = amount;
	}
	public int getFee() {
		return fee;
	}
	public void setFee(int fee) {
		this.fee = fee;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getAqbank() {
		return aqbank;
	}
	public void setAqbank(String aqbank) {
		this.aqbank = aqbank;
	}
	

}
