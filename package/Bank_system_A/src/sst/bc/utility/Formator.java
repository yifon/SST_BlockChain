package sst.bc.utility;

import java.text.DecimalFormat;
import java.text.NumberFormat;

import sst.bc.beans.Transaction;

public class Formator {
	
	 
	public static String formatBlance(int balance) {
		NumberFormat nf = new DecimalFormat("$,###.##");
		
		return nf.format(balance);
		
	}
	public static String formatBlance(String balance) {
		NumberFormat nf = new DecimalFormat("$,###.##");
		
		return nf.format(balance);
		
	}
	public static String formatBlance(double balance) {
		NumberFormat nf = new DecimalFormat("$,###.##");
		
		return nf.format(balance);
		
	}
	public static void main(String[] args) {
		
		System.out.println(formatBlance(123456789.12));
	}
	


}
