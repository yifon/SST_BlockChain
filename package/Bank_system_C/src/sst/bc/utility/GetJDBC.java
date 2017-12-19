package sst.bc.utility;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class GetJDBC {
	private final static String DRIVER = "com.mysql.jdbc.Driver";// load driver 
	private final static String URL = "jdbc:mysql://localhost:3306/sst_atm?useUnicode=true&charaterEncoding=UTF-8";// url
	private final static String DBNAME = "root";// user 
	private final static String DBPASS = "root";// password

	public Connection getConn() {
		try {
			Class.forName(DRIVER);
		} catch (ClassNotFoundException e) {
			System.out.println("driver load exception");
			e.printStackTrace();
		}
		Connection conn = null;
		try {
			conn = DriverManager.getConnection(URL, DBNAME, DBPASS);
		} catch (SQLException e) {
			System.out.println("connection exception");
			e.printStackTrace();
		}
		return conn;
	}

	// mind the execute order
	public void CloseAll(Connection conn, PreparedStatement pstmt, ResultSet rs) {
		if (rs != null) {
			try {
				rs.close();
			} catch (SQLException e) {
				System.out.println("rs close exception");
				e.printStackTrace();
			}
		}
		if (pstmt != null) {
			try {
				pstmt.close();
			} catch (SQLException e) {
				System.out.println("pstmt close exception");
				e.printStackTrace();
			}
		}
		if (conn != null) {
			try {
				conn.close();
			} catch (SQLException e) {
				System.out.println("conn close exception");
				e.printStackTrace();
			}
		}
	}

	// add delete update query
	public int executeSQL(String sql, String[] getValue) {
		int result = 0;
		Connection conn = null;
		PreparedStatement pstmt = null;
		try {
			conn = this.getConn();// get db connect
			pstmt = conn.prepareStatement(sql);
			for (int i = 0; i < getValue.length; i++) {
				pstmt.setString(i + 1, getValue[i]);
			}
			result = pstmt.executeUpdate();// execute SQL
		} catch (SQLException e) {
			System.out.println("executeSQL method exception");
			e.printStackTrace();
		}
		return result;
	}
	
	public Connection getConnection() {
	    String driver = "com.mysql.jdbc.Driver";
	  // String url = "jdbc:mysql://39.108.142.194:3306/sst_atm";
	    String url = "jdbc:mysql://localhost:3306/sst_atm";
	    String username = "root";
	    // String password = "root";
		String password = "2wsx@WSX";
	    Connection conn = null;
	    try {
	        Class.forName(driver); //classLoader,加载对应驱动
	        conn = (Connection) DriverManager.getConnection(url, username, password);
	    } catch (ClassNotFoundException e) {
	        e.printStackTrace();
	    } catch (SQLException e) {
	        e.printStackTrace();
	    }
	    return conn;
	}
	public void CloseConnection(Connection conn) {
		if (conn != null) {
			try {
				conn.close();
			} catch (SQLException e) {
				System.out.println("conn close exception");
				e.printStackTrace();
			}
		}
	}
}
