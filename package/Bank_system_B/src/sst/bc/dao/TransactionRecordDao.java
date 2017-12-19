package sst.bc.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import sst.bc.beans.CardToken;
import sst.bc.beans.TransactionRecord;
import sst.bc.utility.GetJDBC;

public class TransactionRecordDao {
	public GetJDBC jdbc;

	public TransactionRecordDao() {
		super();
		jdbc = new GetJDBC();
	}
	
	public List<TransactionRecord> getRecordByAccount(String Account) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		TransactionRecord transactionRecord = null;
		List<TransactionRecord> transactionRecords = new ArrayList<TransactionRecord>();
		try {
			conn = jdbc.getConnection();
			String sql = "SELECT * FROM bank_b_transaction_record where Account = ?";
			System.out.println("conn="+conn);
			ps = conn.prepareStatement(sql);
			ps.setString(1, Account);
			rs = ps.executeQuery();
			while (rs.next()) {
				
				int id = rs.getInt("id");
				String txnType = rs.getString("txnType");
				String account = rs.getString("Account");
				String fromAccount = rs.getString("fromAccount");
				String toAccount = rs.getString("toAccount");
				int amount = rs.getInt("amount");
				int fee = rs.getInt("fee");
				String date = rs.getString("date");
				String aqbank = rs.getString("aqbank");
				String atmid = rs.getString("atmid");
				transactionRecord = new TransactionRecord(txnType, account, fromAccount, toAccount, amount, fee, date, aqbank,atmid);
				transactionRecords.add(transactionRecord);

			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (null != rs) {
					rs.close();
				}
				if (null != ps) {
					ps.close();
				}
				if (null != conn) {
					jdbc.CloseConnection(conn);
				}
			} catch (Exception e2) {
			}
		}
		return transactionRecords;
	}
	public List<TransactionRecord> getRecordByDate(String date) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		TransactionRecord transactionRecord = null;
		List<TransactionRecord> transactionRecords = new ArrayList<TransactionRecord>();
		try {
			conn = jdbc.getConnection();
			String sql = "SELECT * FROM bank_b_transaction_record where date = ?";
			System.out.println("conn="+conn);
			ps = conn.prepareStatement(sql);
			ps.setString(1, date);
			rs = ps.executeQuery();
			while (rs.next()) {
				
				int id = rs.getInt("id");
				String txnType = rs.getString("txnType");
				String account = rs.getString("Account");
				String fromAccount = rs.getString("fromAccount");
				String toAccount = rs.getString("toAccount");
				int amount = rs.getInt("amount");
				int fee = rs.getInt("fee");
				String date1 = rs.getString("date");
				String aqbank = rs.getString("aqbank");
				String atmid = rs.getString("atmid");
				transactionRecord = new TransactionRecord(txnType, account, fromAccount, toAccount, amount, fee, date, aqbank,atmid);
				transactionRecords.add(transactionRecord);

			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (null != rs) {
					rs.close();
				}
				if (null != ps) {
					ps.close();
				}
				if (null != conn) {
					jdbc.CloseConnection(conn);
				}
			} catch (Exception e2) {
			}
		}
		return transactionRecords;
	}
	public List<TransactionRecord> getRecordByAqbank(String aqbank) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		TransactionRecord transactionRecord = null;
		List<TransactionRecord> transactionRecords = new ArrayList<TransactionRecord>();
		try {
			conn = jdbc.getConnection();
			String sql = "SELECT * FROM bank_b_transaction_record where aqbank = ?";
			System.out.println("conn="+conn);
			ps = conn.prepareStatement(sql);
			ps.setString(1, aqbank);
			rs = ps.executeQuery();
			while (rs.next()) {
				
				int id = rs.getInt("id");
				String txnType = rs.getString("txnType");
				String account = rs.getString("Account");
				String fromAccount = rs.getString("fromAccount");
				String toAccount = rs.getString("toAccount");
				int amount = rs.getInt("amount");
				int fee = rs.getInt("fee");
				String date1 = rs.getString("date");
				String aqbank1 = rs.getString("aqbank");
				String atmid = rs.getString("atmid");
				transactionRecord = new TransactionRecord(txnType, account, fromAccount, toAccount, amount, fee, date1, aqbank,atmid);
				transactionRecords.add(transactionRecord);

			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (null != rs) {
					rs.close();
				}
				if (null != ps) {
					ps.close();
				}
				if (null != conn) {
					jdbc.CloseConnection(conn);
				}
			} catch (Exception e2) {
			}
		}
		return transactionRecords;
	}
	public List<TransactionRecord> getAllRecord() {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		TransactionRecord transactionRecord = null;
		List<TransactionRecord> transactionRecords = new ArrayList<TransactionRecord>();
		try {
			conn = jdbc.getConnection();
			String sql = "select * from bank_b_transaction_record";
			ps = conn.prepareStatement(sql);
			rs = ps.executeQuery();
			while (rs.next()) {
				int id = rs.getInt("id");
				String txnType = rs.getString("txnType");
				String account = rs.getString("Account");
				String fromAccount = rs.getString("fromAccount");
				String toAccount = rs.getString("toAccount");
				int amount = rs.getInt("amount");
				int fee = rs.getInt("fee");
				String date = rs.getString("date");
				String aqbank = rs.getString("aqbank");
				String atmid = rs.getString("atmid");
				transactionRecord = new TransactionRecord(txnType, account, fromAccount, toAccount, amount, fee, date, aqbank,atmid);
				transactionRecords.add(transactionRecord);

			}

		} catch (Exception e) {
			e.printStackTrace();
		} finally {

			try {
				if (null != rs) {
					rs.close();
				}
				if (null != ps) {
					ps.close();
				}
				if (null != conn) {
					jdbc.CloseConnection(conn);
				}
			} catch (SQLException e) {
				e.printStackTrace();
			}

		}
		return transactionRecords;
	}
	public boolean saveRecord(TransactionRecord transactionRecord) {
		System.out.println("saveRecord in ");
		Connection conn = null;
		PreparedStatement ps = null;
		boolean result = false;
		try {
			conn = jdbc.getConnection();
			String sql = "insert into bank_b_transaction_record (txnType,Account,fromAccount,toAccount,amount,fee,date,aqbank,atmid) values(?,?,?,?,?,?,?,?,?)";
			ps = conn.prepareStatement(sql);
			ps.setString(1, transactionRecord.getTxnType());
			ps.setString(2, transactionRecord.getAccount());
			ps.setString(3, transactionRecord.getFromAccount());
			ps.setString(4, transactionRecord.getToAccount());
			ps.setInt(5, transactionRecord.getAmount());
			ps.setInt(6, transactionRecord.getFee());
		
			ps.setString(7, transactionRecord.getDate());
			ps.setString(8, transactionRecord.getAqbank());
			ps.setString(9, transactionRecord.getAtmid());
			int insertCount = ps.executeUpdate();
			result = isSuccess(insertCount);
		} catch (Exception e) {
			e.printStackTrace();
			
		} finally {
			try {
				if (null != ps) {
					ps.close();
				}
				if (null != conn) {
					conn.close();
				}
			} catch (Exception e2) {
				e2.printStackTrace();
			}
		}
		System.out.println("saveRecord out ");
		return result;
	}
	public static boolean isSuccess(int count) {
		if (count > 0) {
			return true;
		} else {
			return false;
		}
	}
public static void main(String[] args) {
	TransactionRecordDao transactionRecordDao = new TransactionRecordDao();
	System.out.println(transactionRecordDao.getAllRecord());
}
	/**
	 * add
	 */




}
