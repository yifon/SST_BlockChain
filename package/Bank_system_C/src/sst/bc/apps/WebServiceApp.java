package sst.bc.apps;


import javax.xml.ws.Endpoint;

import sst.bc.service.GetBankAccountInfo;
import sst.bc.serviceimp.GetBankAccountInfoImp;

public class WebServiceApp {
	
	public static void main(String[] args) {
		System.out.println("web server is starting");
		GetBankAccountInfo getBankAccountInfo = new GetBankAccountInfoImp();
		String address ="http://localhost:8080/GetBankAccountInfo";
		Endpoint.publish(address, getBankAccountInfo);
	}

}
