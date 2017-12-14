package sst.bc.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import sst.bc.beans.CardToken;
import sst.bc.utility.GetJDBC;

public class AccountDao {

	public GetJDBC jdbc;

	public AccountDao() {
		super();
		jdbc = new GetJDBC();
	}

	public CardToken getCardTokenInfo(String card_Number) {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		CardToken cardToken = null;
		try {
			conn = jdbc.getConnection();
			String sql = "SELECT * FROM bank_a_accounts where cardNumber = ?";
			System.out.println("conn="+conn);
			ps = conn.prepareStatement(sql);
			ps.setString(1, card_Number);
			rs = ps.executeQuery();
			while (rs.next()) {
				int id = rs.getInt("id");
				String cardNumber = rs.getString("cardNumber");
				String cardHolder = rs.getString("cardHolder");
				int balance = rs.getInt("balance");
				int pin = rs.getInt("pin");
				cardToken = new CardToken(id, cardNumber, cardHolder, balance, pin);

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
		return cardToken;
	}

	public List<CardToken> getAllCards() {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		List<CardToken> cardTokens = new ArrayList<CardToken>();
		try {
			conn = jdbc.getConnection();
			String sql = "select * from bank_a_accounts";
			ps = conn.prepareStatement(sql);
			rs = ps.executeQuery();
			while (rs.next()) {
				int id = rs.getInt("id");
				String cardNumber = rs.getString("cardNumber");
				String cardHolder = rs.getString("cardHolder");
				int balance = rs.getInt("balance");
				int pin = rs.getInt("pin");
				CardToken cardToken = new CardToken(id, cardNumber, cardHolder, balance, pin);
				cardTokens.add(cardToken);
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
		return cardTokens;
	}

	/**
	 * add
	 */
	public boolean acocuntAdd(CardToken cardToken) {
		Connection conn = null;
		PreparedStatement ps = null;
		boolean result = false;
		try {
			conn = jdbc.getConnection();
			String sql = "insert into bank_a_accounts (cardNumber,cardHolder,balance,pin) values(?,?,?,?)";
			ps = conn.prepareStatement(sql);
			ps.setString(1, cardToken.getCardNumber());
			ps.setString(2, cardToken.getCardHolder());
			ps.setInt(3, cardToken.getBalance());
			ps.setInt(4, cardToken.getPin());
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
		return result;
	}

	/**
	 * delete
	 */
	public Boolean deleteCardToken(CardToken cardToken) {
		Connection conn = null;
		PreparedStatement ps = null;
		boolean result = false;
		try {
			conn = jdbc.getConnection();
			String sql = "delete from bank_a_accounts where id = ?";
			ps = conn.prepareStatement(sql);
			ps.setInt(1, cardToken.getId());
			int Count = ps.executeUpdate();
			result = isSuccess(Count);
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
		return result;
	}

	/**
	 * update pin
	 */
	public boolean updatePin(CardToken cardToken) {
		Connection conn = null;
		PreparedStatement ps = null;
		boolean result = false;
		int count;
		try {
			conn = jdbc.getConnection();
			// String sql = "SELECT * FROM hsbc_accounts where cardNumber = ?";
			// cardToken = new CardToken(id, cardNumber, cardHolder,balance,
			// pin);
			String sql = "update bank_a_accounts set pin = ? where id = ?";
			ps = conn.prepareStatement(sql);

			ps.setInt(1, cardToken.getPin());
			ps.setInt(2, cardToken.getId());

			count = ps.executeUpdate();
			System.out.println(isSuccess(count));
			result = isSuccess(count);
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
		return result;
	}

	/**
	 * update balance
	 */
	public boolean updateBalance(CardToken cardToken) {
		Connection conn = null;
		PreparedStatement ps = null;
		boolean result = false;
		int count;
		try {
			conn = jdbc.getConnection();
			// String sql = "SELECT * FROM hsbc_accounts where cardNumber = ?";
			// cardToken = new CardToken(id, cardNumber, cardHolder,balance,
			// pin);
			String sql = "update bank_a_accounts set balance = ? where id = ?";
			ps = conn.prepareStatement(sql);

			ps.setDouble(1, cardToken.getBalance());
			ps.setInt(2, cardToken.getId());

			count = ps.executeUpdate();
			System.out.println(isSuccess(count));
			result = isSuccess(count);
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
		return result;
	}

	/**
	 * is execute success
	 */
	public static boolean isSuccess(int count) {
		if (count > 0) {
			return true;
		} else {
			return false;
		}
	}

	public static void main(String[] args) {
		AccountDao accountDao = new AccountDao();
		// add
		// CardToken cardToken = new CardToken("1234567890123888", "Refly",
		// 99999999.99, 123456);
		// System.out.println( accountDao.updateBalance(cardToken));
		// --------------------find
		// CardToken cardToken =
		// accountDao.getCardTokenInfo("1234567890123888");
		// cardToken.setBalance(1999999999);
		// System.out.println(cardToken);
		// accountDao.updateBalance(cardToken);
		// update
//		CardToken cardToken = accountDao.getCardTokenInfo("1234567890123888");
//		cardToken.setBalance(cardToken.getBalance() - 800000);
//		System.out.println(accountDao.updateBalance(cardToken));
		//find all
//		List<CardToken> cardTokens = accountDao.getAllCards();
//		for (int i = 0; i < cardTokens.size(); i++) {
//			cardTokens.get(i).setBalance(10000000);
//			accountDao.updateBalance(cardTokens.get(i));
//			
//		}
//		 Object[] cardTokens = null;
//		 cardTokens = accountDao.getAllCards().toArray();
//		 for (int i = 0; i < cardTokens.length; i++) {
//			 System.out.println(cardTokens[i]);
//		}
	//	Random random = new Random();
		//random.nextInt(bound);
	//	accountDao.acocuntAdd(new CardToken());
		
//	    BinDao binDao = new BinDao();
//	    List<Bin> bins =binDao.getAllBins();
//	    
//	    for (int i = 0; i < bins.size(); i++) {
//	    	
//	    	System.out.println(bins.get(i).getBinNumber()+GetAccout.getAccout());
//			
//		}

	System.out.println(accountDao.getCardTokenInfo("6227467436550860").getPin()==123456);
		
	}
}
