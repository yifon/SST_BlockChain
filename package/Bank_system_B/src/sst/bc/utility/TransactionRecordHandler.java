package sst.bc.utility;


import java.text.SimpleDateFormat;
import java.util.Date;

import sst.bc.beans.Transaction;
import sst.bc.beans.TransactionRecord;
import sst.bc.dao.TransactionRecordDao;

public class TransactionRecordHandler {
	public static SimpleDateFormat sdf= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
	public Transaction transactiona;
	public TransactionRecord transactionRecord,transactionRecord2;
	public TransactionRecordDao transactionRecordDao;
	
	public boolean saveTransactionRecord(Transaction transaction){
		System.out.println("saveTransactionRecord in ");
		boolean result = false;
		switch (transaction.getType()) {
		case "cwd":
			result= this.saveTransactionRecordNormal(transaction);
			break;
		case "cdp":
			result= this.saveTransactionRecordNormal(transaction);
			break;
		case "tfr":
			if (transaction.getTfrtype().equals("internal")) {
				result= this.saveTransactionRecordNormal(transaction);
			}else if (transaction.getTfrtype().equals("debit")) {
				result= this.saveTransactionRecordNormalDebit(transaction);
			}else if (transaction.getTfrtype().equals("credit")) {
				result= this.saveTransactionRecordNormalCredit(transaction);
			}else {
				result= this.saveTransactionRecordNormal(transaction);
			}
			
			break;
		case "inq":
			result= this.saveTransactionRecordNormal(transaction);
			break;

		default:
			break;
		}
		 System.out.println("saveTransactionRecord out ");
		return result;
	}

	public boolean saveTransactionRecordNormal(Transaction transaction) {
		transactionRecordDao = new TransactionRecordDao();
		boolean result = false ;
		String txnType = "";
		transactiona = transaction;
		if (transaction.getType().equals("inq")) {
			txnType = "Balance Inquiry";
		}else if (transaction.getType().equals("cwd")) {
			txnType = "Cash Withdrawal";
		}else if (transaction.getType().equals("cdp")) {
			txnType = "Cash Deposit";
		}else if(transaction.getType().equals("tfr")){
			txnType = "Transfer(out)";
			transactionRecord2 = new TransactionRecord("Transfer(in)", transactiona.getTo_cardNumber(), transactiona.getFrom_cardNumber(),transactiona.getTo_cardNumber(), transactiona.getAmount(), transactiona.getFee(), sdf.format(new Date()), transactiona.getAqbank(), transactiona.getAtmid());
			result	= transactionRecordDao.saveRecord(transactionRecord2);
		}else {
			
		}
		
		transactionRecord = new TransactionRecord(txnType, transactiona.getFrom_cardNumber(), transactiona.getFrom_cardNumber(),transactiona.getTo_cardNumber(), transactiona.getAmount(), transactiona.getFee(), sdf.format(new Date()), transactiona.getAqbank(), transactiona.getAtmid());
		
		// TODO Auto-generated method stub
		
	    result	= transactionRecordDao.saveRecord(transactionRecord);
		return result;
	}
	public boolean saveTransactionRecordNormalDebit(Transaction transaction) {
		// TODO Auto-generated method stub
		boolean result = false ;
		String txnType = "Transfer(out)";
		transactiona = transaction;
		transactionRecord = new TransactionRecord(txnType, transactiona.getFrom_cardNumber(), transactiona.getFrom_cardNumber(),transactiona.getTo_cardNumber(), transactiona.getAmount(), transactiona.getFee(), sdf.format(new Date()), transactiona.getAqbank(), transactiona.getAtmid());
		// TODO Auto-generated method stub
		transactionRecordDao = new TransactionRecordDao();
	    result	= transactionRecordDao.saveRecord(transactionRecord);
		return result;
	}
	public boolean saveTransactionRecordNormalCredit(Transaction transaction) {
		// TODO Auto-generated method stub
		boolean result = false ;
		String txnType = "Transfer(in)";
		transactiona = transaction;
		transactionRecord = new TransactionRecord(txnType, transactiona.getTo_cardNumber(), transactiona.getFrom_cardNumber(),transactiona.getTo_cardNumber(), transactiona.getAmount(), 0, sdf.format(new Date()), transactiona.getAqbank(), transactiona.getAtmid());
		// TODO Auto-generated method stub
		transactionRecordDao = new TransactionRecordDao();
	    result	= transactionRecordDao.saveRecord(transactionRecord);
		return result;
	}
	public static void main(String[] args) {
		
	}

}
