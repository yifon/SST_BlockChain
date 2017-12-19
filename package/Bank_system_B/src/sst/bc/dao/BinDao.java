package sst.bc.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import sst.bc.beans.Bin;
import sst.bc.beans.CardToken;
import sst.bc.utility.GetJDBC;

public class BinDao {
	
	public GetJDBC jdbc;

	public BinDao() {
		super();
		jdbc = new GetJDBC();
	}
	public boolean binAdd(int bin) {
		Connection conn = null;
		PreparedStatement ps = null;
		boolean result = false;
		try {
			conn = jdbc.getConnection();
			String sql = "insert into hsbc_bins (bin) values(?)";
			ps = conn.prepareStatement(sql);
			ps.setInt(1, bin);
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
	public boolean deleteAdd(int bin) {
		Connection conn = null;
		PreparedStatement ps = null;
		boolean result = false;
		try {
			conn = jdbc.getConnection();
			String sql = "delete from hsbc_bins where bin = ?";
			ps = conn.prepareStatement(sql);
			ps.setInt(1, bin);
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
	public List<Bin> getAllBins() {
		Connection conn = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		List<Bin> bins = new ArrayList<Bin>();
		try {
			conn = jdbc.getConnection();
			String sql = "select * from hsbc_bins";
			ps = conn.prepareStatement(sql);
			rs = ps.executeQuery();
			while (rs.next()) {
				int id = rs.getInt("id");
				int binnumber = rs.getInt("bin");
				Bin bin = new Bin(id, binnumber);
				bins.add(bin);
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
		return bins;
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
		BinDao binDao = new BinDao();
		
		binDao.binAdd(622746);
		binDao.binAdd(622747);
		binDao.binAdd(622748);
		binDao.binAdd(622749);
		binDao.binAdd(622750);
		System.out.println(binDao.getAllBins());
	}
}
