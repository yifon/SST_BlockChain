package sst.bc.serviceimp;

import java.util.List;

import sst.bc.beans.TransactionRecord;
import sst.bc.dao.TransactionRecordDao;
import sst.bc.service.GetBankStransactionRecordService;

public class GetTransactionRecordServiceImp implements GetBankStransactionRecordService{
	
	public TransactionRecordDao transactionRecordDao;
	@Override
	public List<TransactionRecord> getTransactionRecordsAll() {
		// TODO Auto-generated method stub
		transactionRecordDao = new TransactionRecordDao();
		
		return transactionRecordDao.getAllRecord();
	}

	@Override
	public List<TransactionRecord> getTransactionRecordsByAccount(String account) {
		// TODO Auto-generated method stub
		transactionRecordDao = new TransactionRecordDao();
		return transactionRecordDao.getRecordByAccount(account);
		
	}

	@Override
	public List<TransactionRecord> getTransactionRecordsByDate(String date) {
		// TODO Auto-generated method stub
		transactionRecordDao = new TransactionRecordDao();
		return transactionRecordDao.getRecordByAccount(date);	
		}

}
