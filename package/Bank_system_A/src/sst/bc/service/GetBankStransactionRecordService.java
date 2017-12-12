package sst.bc.service;

import java.util.List;


import sst.bc.beans.TransactionRecord;

public interface GetBankStransactionRecordService {
	
	public List<TransactionRecord> getTransactionRecordsAll();
	public List<TransactionRecord> getTransactionRecordsByAccount(String account);
	public List<TransactionRecord> getTransactionRecordsByDate(String date);

}
