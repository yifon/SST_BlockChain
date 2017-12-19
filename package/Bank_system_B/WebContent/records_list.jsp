<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html> 
<head><link rel="stylesheet" type="text/css" href="<%=path %>/admin.css">
    <link rel="stylesheet" type="text/css" href="<%=path %>/css.css"></head> 
  <body>
  
    <table width="1120" border="0" cellspacing="0" cellpadding="0" background="<%=path%>/img/all_bg.jpg" height="1000">
  <tr>
    <td class="border_left border_right border_bottom" height="400" valign="top" align="center">
        <table width="98%" border="0" cellspacing="0" cellpadding="0" bgcolor="#999999" id="text">
        <tr class="tabletop">
        <a href="/Bank_system_B/BankTransactionRecordServlet?method=list" >Get Bank B Transaction Record</a>
            <td height="40" colspan="15" align="center">Bank B Transaction List </td>
		  </tr>
          <tr class="tablemenu">
            <td align="center">Transaction type</td> 
            <td align="center">Account</td> 
            <td align="center">From Account</td> 
            <td align="center">To Account</td>
            <td align="center">Amount</td>  
            <td align="center">Fee</td>  
            <td align="center">Date</td>  
            <td align="center">Operate Bank</td> 
            <td align="center">Terminal ID</td>
          </tr>
 <c:forEach items="${transactionRecords}" var="obj" varStatus="status">
          <tr class="tabletd${status.index%2+1}">
            <td height="25" align="center">${obj.txnType}</td>
            <td height="25" align="center">${obj.account}</td>
            <td height="25" align="center">${obj.fromAccount}</td>
            <td height="25" align="center">${obj.toAccount}</td>   
            <td height="25" align="center">${obj.amount}</td>            
            <td height="25" align="center">${obj.fee}</td>      
            <td height="25" align="center">${obj.date}</td>
            <td height="25" align="center">${obj.aqbank}</td>   
            <td height="25" align="center">${obj.atmid}</td>            
          </tr>
          </c:forEach>
		</table>
      </td>
  </tr>
</table>

  </body>
</html>

