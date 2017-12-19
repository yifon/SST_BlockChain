package sst.bc.servlet;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import sst.bc.beans.TransactionRecord;
import sst.bc.service.GetBankStransactionRecordService;
import sst.bc.serviceimp.GetTransactionRecordServiceImp;

/**
 * Servlet implementation class BankTransactionRecord
 */
@WebServlet("/BankTransactionRecord")
public class BankTransactionRecordServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
    public GetBankStransactionRecordService  getBankStransactionRecordService;
    /**
     * @see HttpServlet#HttpServlet()
     */
    public BankTransactionRecordServlet() {
        super();
        // TODO Auto-generated constructor stub
    }
    
	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
		
		response.setContentType("text/html;charset=UTF-8");
		request.setCharacterEncoding("UTF-8");
		getBankStransactionRecordService = new GetTransactionRecordServiceImp();
		List<TransactionRecord> transactionRecords = getBankStransactionRecordService.getTransactionRecordsAll();
		HttpSession session=request.getSession();
		if (transactionRecords!=null) {
			    session = request.getSession();
			    request.setAttribute("message", "find recode");
				session.setAttribute("transactionRecords", transactionRecords);
				response.sendRedirect("./records_list.jsp");
		}else{
			request.setAttribute("message", "no recode find");
			response.sendRedirect("./records_list.jsp");
		}
		
		
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
