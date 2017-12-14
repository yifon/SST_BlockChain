package sst.bc.utility;

import java.util.Random;

public class GetAccout {
	
	
	public static String getAccout(){
	StringBuilder str=new StringBuilder();
	Random random=new Random();
	for(int i=0;i<10;i++){
	    str.append(random.nextInt(10));
	}
	
	return str.toString();
	}
	public static void main(String[] args) {
	
		System.out.println(	GetAccout.getAccout());
		System.out.println(	GetAccout.getAccout());
		System.out.println(	GetAccout.getAccout());
	}

}
