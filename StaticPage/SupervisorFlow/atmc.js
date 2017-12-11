var socket = io("ws://localhost:7004")
socket.emit("userName", "ATMC");
var txnObj = {
    // txnType: "",
    // stepId: "",
    // startNode: "",
    // nextNode: "",
    // cardNumber: "",
    // txnAmount: "",
    // cardBank: "",
    // sourceATM: "",
    // minerATM: "",
    // fee: "",
    // balance: "",
    // status: ""
};
var txnObjTFR = {
    // txnType: "",
    // stepId: "",
    // startNode: "",
    // nextNode: "",
    // debitAmount: "",
    // debitAccount: "",
    // debitBank: "",
    // creditAccount: "",
    // creditBank: "",
    // sourceATM: "",
    // debitATM: "",
    // creditATM: "",
    // fee: "",
    // status: ""
}

//开始交易时，要让supervisor页面刷新
$("#startTx").on("click", function () {
    socket.emit("startTx");
})

//INQ:本行卡在本行机 ---start
//此处假设：A bank客人在A001上查询余额: A001->aBank->A001
$("#INQ_I_1").on("click", function () {
    txnObj={};
    txnObj.txnType = "INQ";
    txnObj.stepId = 1;
    txnObj.startNode = "A001";
    txnObj.nextNode = "aBank";
    txnObj.cardNumber = "6222222,111111,333333";
    //txnObj.txnAmount="";INQ不需要传交易数额
    txnObj.cardBank = "A";
    txnObj.sourceATM = "A001";
    //txnObj.minerATM="A001";//可不传或者传sourceATM
    txnObj.fee="";//本行卡不需要手续费，可不传或传空
    txnObj.balance="";//此时还不知道余额，可不传，或者传空;
    txnObj.status = 1;//交易进行中
    socket.emit('informSupervisor', txnObj);
})
$("#INQ_I_2").on("click", function () {
    txnObj={};
    txnObj.txnType = "INQ";
    txnObj.stepId = 2;
    txnObj.startNode = "aBank";
    txnObj.nextNode = "A001";
    txnObj.cardNumber = "6222222,111111,333333";
    //txnObj.txnAmount="";INQ不需要传交易数额
    txnObj.cardBank = "A";
    txnObj.sourceATM = "A001";
    //txnObj.minerATM="A001";//可不传或者传sourceATM
    txnObj.fee="";
    txnObj.balance = "987,100.00";//需要传余额
    txnObj.status = 2;//成功
    socket.emit('informSupervisor', txnObj);
})
//INQ:本行卡在本行机 ---end

//INQ:它行卡在本行机 ---start
//此处假设：B bank客人在A001上查询余额：A001->Blockchain->B002->bBank->B002->Blockchain->A001
$("#INQ_O_1").on("click", function () {
    txnObj={};
    txnObj.txnType = "INQ";
    txnObj.stepId = 1;
    txnObj.startNode = "A001";
    txnObj.nextNode = "Blockchain";
    txnObj.cardNumber = "6222222,111111,333333";
    //txnObj.txnAmount="";INQ不需要传交易数额
    txnObj.cardBank = "B";
    txnObj.sourceATM = "A001";
    txnObj.minerATM="";//可不传或传空，此处还未获取minerATM
    txnObj.fee="";//可不传或传空
    txnObj.balance = "";//可不传或传空
    txnObj.status = 1;//交易进行中
    socket.emit('informSupervisor', txnObj);
})
$("#INQ_O_2").on("click", function () {
    txnObj={};
    txnObj.txnType = "INQ";
    txnObj.stepId = 2;
    txnObj.startNode = "Blockchain";
    txnObj.nextNode = "B002";
    txnObj.cardNumber = "6222222,111111,333333";
    //txnObj.txnAmount="";INQ不需要传交易数额
    txnObj.cardBank = "B";
    txnObj.sourceATM = "A001";
    txnObj.minerATM="B002";
    txnObj.fee = "0.5";//跨行可定义个手续费，此处为blockchain设置，可视实际获取时间而定
    txnObj.balance="";
    txnObj.status = 1;
    socket.emit('informSupervisor', txnObj);
})
$("#INQ_O_3").on("click", function () {
    txnObj={};
    txnObj.txnType = "INQ";
    txnObj.stepId = 3;
    txnObj.startNode = "B002";
    txnObj.nextNode = "bBank";
    txnObj.cardNumber = "6222222,111111,333333";
    //txnObj.txnAmount="";INQ不需要传交易数额
    txnObj.cardBank = "B";
    txnObj.sourceATM = "A001";
    txnObj.minerATM="B002";
    txnObj.fee = "0.5";//跨行可定义个手续费
    txnObj.balance="";
    txnObj.status = 1;//
    socket.emit('informSupervisor', txnObj);
})
$("#INQ_O_4").on("click", function () {
    txnObj={};
    txnObj.txnType = "INQ";
    txnObj.stepId = 4;
    txnObj.startNode = "bBank";
    txnObj.nextNode = "B002";
    txnObj.cardNumber = "6222222,111111,333333";
    //txnObj.txnAmount="";INQ不需要传交易数额
    txnObj.cardBank = "B";
    txnObj.sourceATM = "A001";
    txnObj.minerATM="B002";
    txnObj.fee = "0.5";//跨行可定义个手续费
    txnObj.balance = "987,100.00";
    txnObj.status = 1;//
    socket.emit('informSupervisor', txnObj);
})
$("#INQ_O_5").on("click", function () {
    txnObj={};
    txnObj.txnType = "INQ";
    txnObj.stepId = 5;
    txnObj.startNode = "B002";
    txnObj.nextNode = "Blockchain";
    txnObj.cardNumber = "6222222,111111,333333";
    //txnObj.txnAmount="";INQ不需要传交易数额
    txnObj.cardBank = "B";
    txnObj.sourceATM = "A001";
    txnObj.minerATM="B002";
    txnObj.fee = "0.5";//跨行可定义个手续费
    txnObj.balance = "987,100.00";
    txnObj.status = 1;//
    socket.emit('informSupervisor', txnObj);
})
$("#INQ_O_6").on("click", function () {
    txnObj={};
    txnObj.txnType = "INQ";
    txnObj.stepId = 6;
    txnObj.startNode = "Blockchain";
    txnObj.nextNode = "A001";
    txnObj.cardNumber = "6222222,111111,333333";
    //txnObj.txnAmount="";INQ不需要传交易数额
    txnObj.cardBank = "B";
    txnObj.sourceATM = "A001";
    txnObj.minerATM="B002";
    txnObj.fee = "0.5";//跨行可定义个手续费
    txnObj.balance = "987,100.00";
    txnObj.status = 2;//成功
    socket.emit('informSupervisor', txnObj);
})
//INQ:它行卡在本行机 ---end

//CWD:本行卡在本行机 ---start
//此处假设：C bank客人在C002上取款: C002->cBank->C002
$("#CWD_I_1").on("click", function () {
    txnObj={};
    txnObj.txnType = "CWD";
    txnObj.stepId = 1;
    txnObj.startNode = "C002";
    txnObj.nextNode = "cBank";
    txnObj.cardNumber = "6222222,111111,333333";
    txnObj.txnAmount="1000";
    txnObj.cardBank = "C";
    txnObj.sourceATM = "C002";
    //txnObj.minerATM="C002";可不传或者传sourceATM
    txnObj.fee="";//本行卡不需要手续费，可不传或传空
    //txnObj.balance="";//只有INQ有余额;
    txnObj.status = 1;//交易进行中
    socket.emit('informSupervisor', txnObj);
})
$("#CWD_I_2").on("click", function () {
    txnObj={};
    txnObj.txnType = "CWD";
    txnObj.stepId = 2;
    txnObj.startNode = "cBank";
    txnObj.nextNode = "C002";
    txnObj.cardNumber = "6222222,111111,333333";
    txnObj.txnAmount="1000";
    txnObj.cardBank = "A";
    txnObj.sourceATM = "C002";
    //txnObj.minerATM="C002";可不传或者传sourceATM
    txnObj.fee="";
    //txnObj.balance = "";//只有INQ有余额;
    txnObj.status = 2;//成功
    socket.emit('informSupervisor', txnObj);
})
//CWD:本行卡在本行机 ---end

//CWD:它行卡在本行机 ---start
//此处假设：A bank客人在C002上取款：C002->Blockchain->A002->aBank->A002->Blockchain->C002
$("#CWD_O_1").on("click", function () {
    txnObj={};
    txnObj.txnType = "CWD";
    txnObj.stepId = 1;
    txnObj.startNode = "C002";
    txnObj.nextNode = "Blockchain";
    txnObj.cardNumber = "6222222,111111,333333";
    txnObj.txnAmount="1000";
    txnObj.cardBank = "A";
    txnObj.sourceATM = "C002";
    //txnObj.minerATM="";//此处还未获取minerATM,可不传或者传空
    txnObj.fee="";
    //txnObj.balance = "";//只有INQ有余额;
    txnObj.status = 1;//交易进行中
    socket.emit('informSupervisor', txnObj);
})
$("#CWD_O_2").on("click", function () {
    txnObj={};
    txnObj.txnType = "CWD";
    txnObj.stepId = 2;
    txnObj.startNode = "Blockchain";
    txnObj.nextNode = "A002";
    txnObj.cardNumber = "6222222,111111,333333";
    txnObj.txnAmount="1000";
    txnObj.cardBank = "A";
    txnObj.sourceATM = "C002";
    txnObj.minerATM="A002";//此处假设指定了A002
    txnObj.fee="0.5";//此处假设为 0.5
    //txnObj.balance = "";//只有INQ有余额;
    txnObj.status = 1;//交易进行中
    socket.emit('informSupervisor', txnObj);
})
$("#CWD_O_3").on("click", function () {
    txnObj={};
    txnObj.txnType = "CWD";
    txnObj.stepId = 3;
    txnObj.startNode = "A002";
    txnObj.nextNode = "aBank";
    txnObj.cardNumber = "6222222,111111,333333";
    txnObj.txnAmount="1000";
    txnObj.cardBank = "A";
    txnObj.sourceATM = "C002";
    txnObj.minerATM="A002";//此处假设指定了A002
    txnObj.fee="0.5";//此处假设为 0.5
    //txnObj.balance = "";//只有INQ有余额;
    txnObj.status = 1;//交易进行中
    socket.emit('informSupervisor', txnObj);
})
$("#CWD_O_4").on("click", function () {
    txnObj={};
    txnObj.txnType = "CWD";
    txnObj.stepId = 4;
    txnObj.startNode = "aBank";
    txnObj.nextNode = "A002";
    txnObj.cardNumber = "6222222,111111,333333";
    txnObj.txnAmount="1000";
    txnObj.cardBank = "A";
    txnObj.sourceATM = "C002";
    txnObj.minerATM="A002";//此处假设指定了A002
    txnObj.fee="0.5";//此处假设为 0.5
    //txnObj.balance = "";//只有INQ有余额;
    txnObj.status = 1;//交易进行中
    socket.emit('informSupervisor', txnObj);
})
$("#CWD_O_5").on("click", function () {
    txnObj={};
    txnObj.txnType = "CWD";
    txnObj.stepId = 5;
    txnObj.startNode = "A002";
    txnObj.nextNode = "Blockchain";
    txnObj.cardNumber = "6222222,111111,333333";
    txnObj.txnAmount="1000";
    txnObj.cardBank = "A";
    txnObj.sourceATM = "C002";
    txnObj.minerATM="A002";//此处假设指定了A002
    txnObj.fee="0.5";//此处假设为 0.5
    //txnObj.balance = "";//只有INQ有余额;
    txnObj.status = 1;//交易进行中
    socket.emit('informSupervisor', txnObj);
})
$("#CWD_O_6").on("click", function () {
    txnObj={};
    txnObj.txnType = "CWD";
    txnObj.stepId = 6;
    txnObj.startNode = "Blockchain";
    txnObj.nextNode = "C002";
    txnObj.cardNumber = "6222222,111111,333333";
    txnObj.txnAmount="1000";
    txnObj.cardBank = "A";
    txnObj.sourceATM = "C002";
    txnObj.minerATM="A002";//此处假设指定了A002
    txnObj.fee="0.5";//此处假设为 0.5
    //txnObj.balance = "";//只有INQ有余额;
    txnObj.status = 2;//交易成功
    socket.emit('informSupervisor', txnObj);
})
//CWD:它行卡在本行机 ---end


//DEP:本行卡在本行机 ---start
//此处假设：C bank客人在C001上存款: C001->cBank->C001
$("#DEP_I_1").on("click", function () {
    txnObj={};
    txnObj.txnType = "DEP";
    txnObj.stepId = 1;
    txnObj.startNode = "C001";
    txnObj.nextNode = "cBank";
    txnObj.cardNumber = "6222222,111111,333333";
    txnObj.txnAmount="1000";
    txnObj.cardBank = "C";
    txnObj.sourceATM = "C001";
    //txnObj.minerATM="C002";可不传或者传sourceATM
    txnObj.fee="";//本行卡不需要手续费，可不传或传空
    //txnObj.balance="";//只有INQ有余额;
    txnObj.status = 1;//交易进行中
    socket.emit('informSupervisor', txnObj);
})
$("#DEP_I_2").on("click", function () {
    txnObj={};
    txnObj.txnType = "DEP";
    txnObj.stepId = 2;
    txnObj.startNode = "cBank";
    txnObj.nextNode = "C001";
    txnObj.cardNumber = "6222222,111111,333333";
    txnObj.txnAmount="1000";
    txnObj.cardBank = "A";
    txnObj.sourceATM = "C001";
    //txnObj.minerATM="C002";可不传或者传sourceATM
    txnObj.fee="";
    //txnObj.balance = "";//只有INQ有余额;
    txnObj.status = 2;//成功
    socket.emit('informSupervisor', txnObj);
})
//DEP:本行卡在本行机 ---end

//DEP:它行卡在本行机 ---start
//此处假设：A bank客人在C001上存款：C001->Blockchain->A002->aBank->A002->Blockchain->C001
$("#DEP_O_1").on("click", function () {
    txnObj={};
    txnObj.txnType = "DEP";
    txnObj.stepId = 1;
    txnObj.startNode = "C001";
    txnObj.nextNode = "Blockchain";
    txnObj.cardNumber = "6222222,111111,333333";
    txnObj.txnAmount="1000";
    txnObj.cardBank = "A";
    txnObj.sourceATM = "C001";
    //txnObj.minerATM="";//此处还未获取minerATM,可不传或者传空
    txnObj.fee="";
    //txnObj.balance = "";//只有INQ有余额;
    txnObj.status = 1;//交易进行中
    socket.emit('informSupervisor', txnObj);
})
$("#DEP_O_2").on("click", function () {
    txnObj={};
    txnObj.txnType = "DEP";
    txnObj.stepId = 2;
    txnObj.startNode = "Blockchain";
    txnObj.nextNode = "A002";
    txnObj.cardNumber = "6222222,111111,333333";
    txnObj.txnAmount="1000";
    txnObj.cardBank = "A";
    txnObj.sourceATM = "C001";
    txnObj.minerATM="A002";//此处假设指定了A002
    txnObj.fee="0.5";//此处假设为 0.5
    //txnObj.balance = "";//只有INQ有余额;
    txnObj.status = 1;//交易进行中
    socket.emit('informSupervisor', txnObj);
})
$("#DEP_O_3").on("click", function () {
    txnObj={};
    txnObj.txnType = "DEP";
    txnObj.stepId = 3;
    txnObj.startNode = "A002";
    txnObj.nextNode = "aBank";
    txnObj.cardNumber = "6222222,111111,333333";
    txnObj.txnAmount="1000";
    txnObj.cardBank = "A";
    txnObj.sourceATM = "C001";
    txnObj.minerATM="A002";//此处假设指定了A002
    txnObj.fee="0.5";//此处假设为 0.5
    //txnObj.balance = "";//只有INQ有余额;
    txnObj.status = 1;//交易进行中
    socket.emit('informSupervisor', txnObj);
})
$("#DEP_O_4").on("click", function () {
    txnObj={};
    txnObj.txnType = "DEP";
    txnObj.stepId = 4;
    txnObj.startNode = "aBank";
    txnObj.nextNode = "A002";
    txnObj.cardNumber = "6222222,111111,333333";
    txnObj.txnAmount="1000";
    txnObj.cardBank = "A";
    txnObj.sourceATM = "C001";
    txnObj.minerATM="A002";//此处假设指定了A002
    txnObj.fee="0.5";//此处假设为 0.5
    //txnObj.balance = "";//只有INQ有余额;
    txnObj.status = 1;//交易进行中
    socket.emit('informSupervisor', txnObj);
})
$("#DEP_O_5").on("click", function () {
    txnObj={};
    txnObj.txnType = "DEP";
    txnObj.stepId = 5;
    txnObj.startNode = "A002";
    txnObj.nextNode = "Blockchain";
    txnObj.cardNumber = "6222222,111111,333333";
    txnObj.txnAmount="1000";
    txnObj.cardBank = "A";
    txnObj.sourceATM = "C001";
    txnObj.minerATM="A002";//此处假设指定了A002
    txnObj.fee="0.5";//此处假设为 0.5
    //txnObj.balance = "";//只有INQ有余额;
    txnObj.status = 1;//交易进行中
    socket.emit('informSupervisor', txnObj);
})
$("#DEP_O_6").on("click", function () {
    txnObj={};
    txnObj.txnType = "DEP";
    txnObj.stepId = 6;
    txnObj.startNode = "Blockchain";
    txnObj.nextNode = "C001";
    txnObj.cardNumber = "6222222,111111,333333";
    txnObj.txnAmount="1000";
    txnObj.cardBank = "A";
    txnObj.sourceATM = "C001";
    txnObj.minerATM="A002";//此处假设指定了A002
    txnObj.fee="0.5";//此处假设为 0.5
    //txnObj.balance = "";//只有INQ有余额;
    txnObj.status = 2;//交易成功
    socket.emit('informSupervisor', txnObj);
})
//DEP:它行卡在本行机 ---end

//TFR:本行卡在本行机转本行卡 ---start
//此处假设：A bank客人(6222222,111111,222222)在A001上转账给A bank其它客人(6222222,111111,333222): A001->aBank->A001
$("#TFR_I_1").on("click", function () {
    txnObjTFR={};
    txnObjTFR.txnType = "TFR";
    txnObjTFR.stepId = 1;
    txnObjTFR.startNode = "A001";
    txnObjTFR.nextNode = "aBank";
    txnObjTFR.debitAmount="1000";//转出数额
    txnObjTFR.debitAccount="6222222,111111,222222";
    txnObjTFR.debitBank="A";
    txnObjTFR.creditAccount = "6222222,111111,333222";
    txnObjTFR.creditBank="A";
    txnObjTFR.sourceATM = "A001";
    txnObjTFR.debitATM = "A001";//代理扣款ATM,可不传或者传sourceATM
    txnObjTFR.creditATM="A001";//代理收款ATM
    txnObjTFR.fee="";//本行卡不需要手续费，可不传或传空
    txnObjTFR.status = 1;//交易进行中
    socket.emit('informSupervisor', txnObjTFR);
})
$("#TFR_I_2").on("click", function () {
    txnObjTFR={};
    txnObjTFR.txnType = "TFR";
    txnObjTFR.stepId = 2;
    txnObjTFR.startNode = "aBank";
    txnObjTFR.nextNode = "A001";
    txnObjTFR.debitAmount="1000";//转出数额
    txnObjTFR.debitAccount="6222222,111111,222222";
    txnObjTFR.debitBank="A";
    txnObjTFR.creditAccount = "6222222,111111,333222";
    txnObjTFR.creditBank="A";
    txnObjTFR.sourceATM = "A001";
    txnObjTFR.debitATM = "A001";//代理扣款ATM,可不传或者传sourceATM
    txnObjTFR.creditATM="A001";//代理收款ATM
    txnObjTFR.fee="";//本行卡不需要手续费，可不传或传空
    txnObjTFR.status = 2;//交易进行中
    socket.emit('informSupervisor', txnObjTFR);
})
//TFR:本行卡在本行机转本行卡 ---end


//TFR:本行卡在本行机转它行卡 ---start
//此处假设：B bank客人（6222222,111111,222222）在B001上转账给A bank客人（6222222,111111,333222）：B001->Blockchain->B002->bBank->B002->Blockchain->A002->aBank->A002->Blockchain->B001
$("#TFR_O_1").on("click", function () {
    txnObjTFR={};
    txnObjTFR.txnType = "TFR";
    txnObjTFR.stepId = 1;
    txnObjTFR.startNode = "B001";
    txnObjTFR.nextNode = "Blockchain";//此处传给Blockchain是为了找到代理扣款的ATM
    txnObjTFR.debitAmount="1000";//转出数额
    txnObjTFR.debitAccount="6222222,111111,222222";
    txnObjTFR.debitBank="b";
    txnObjTFR.creditAccount = "6222222,111111,333222";
    txnObjTFR.creditBank="A";
    txnObjTFR.sourceATM = "B001";
    txnObjTFR.debitATM = "";//此处是由Blockchain随机分配但，未知，可不传或传空
    txnObjTFR.creditATM="";//未知，可不传或传空
    txnObjTFR.fee="";//本行卡不需要手续费，可不传或传空
    txnObjTFR.status = 1;//交易进行中
    socket.emit('informSupervisor', txnObjTFR);
})
$("#TFR_O_2").on("click", function () {
    txnObjTFR={};
    txnObjTFR.txnType = "TFR";
    txnObjTFR.stepId = 2;
    txnObjTFR.startNode = "Blockchain";
    txnObjTFR.nextNode = "B002";//假设随机分配了B002
    txnObjTFR.debitAmount="1000";//转出数额
    txnObjTFR.debitAccount="6222222,111111,222222";
    txnObjTFR.debitBank="B";
    txnObjTFR.creditAccount = "6222222,111111,333222";
    txnObjTFR.creditBank="A";
    txnObjTFR.sourceATM = "B001";
    txnObjTFR.debitATM = "B002";//代理扣款ATM
    txnObjTFR.creditATM="";//未知，可不传或传空
    txnObjTFR.fee="";//未知，可不传或传空
    txnObjTFR.status = 1;//交易进行中
    socket.emit('informSupervisor', txnObjTFR);
})
$("#TFR_O_3").on("click", function () {
    txnObjTFR={};
    txnObjTFR.txnType = "TFR";
    txnObjTFR.stepId = 3;
    txnObjTFR.startNode = "B002";
    txnObjTFR.nextNode = "bBank";//通知bBank进行扣款
    txnObjTFR.debitAmount="1000";//转出数额
    txnObjTFR.debitAccount="6222222,111111,222222";
    txnObjTFR.debitBank="B";
    txnObjTFR.creditAccount = "6222222,111111,333222";
    txnObjTFR.creditBank="A";
    txnObjTFR.sourceATM = "B001";
    txnObjTFR.debitATM = "B002";
    txnObjTFR.creditATM="";//代理收款ATM,未知，可不传或传空
    txnObjTFR.fee="";//未知，可不传或传空
    txnObjTFR.status = 1;//交易进行中
    socket.emit('informSupervisor', txnObjTFR);
})
$("#TFR_O_2").on("click", function () {
    txnObjTFR={};
    txnObjTFR.txnType = "TFR";
    txnObjTFR.stepId = 2;
    txnObjTFR.startNode = "bBank";
    txnObjTFR.nextNode = "B002";
    txnObjTFR.debitAmount="1000";//转出数额
    txnObjTFR.debitAccount="6222222,111111,222222";
    txnObjTFR.debitBank="A";
    txnObjTFR.creditAccount = "6222222,111111,333222";
    txnObjTFR.creditBank="A";
    txnObjTFR.sourceATM = "B001";
    txnObjTFR.debitATM = "B002";//代理扣款ATM,可不传或者传sourceATM
    txnObjTFR.creditATM="";//未知，可不传或传空
    txnObjTFR.fee="1";//假设B bank扣取客人1元手续费
    txnObjTFR.status = 2;//交易进行中
    socket.emit('informSupervisor', txnObjTFR);
})
$("#TFR_O_1").on("click", function () {
    txnObjTFR={};
    txnObjTFR.txnType = "TFR";
    txnObjTFR.stepId = 1;
    txnObjTFR.startNode = "A001";
    txnObjTFR.nextNode = "aBank";
    txnObjTFR.debitAmount="1000";//转出数额
    txnObjTFR.debitAccount="6222222,111111,222222";
    txnObjTFR.debitBank="A";
    txnObjTFR.creditAccount = "6222222,111111,333222";
    txnObjTFR.creditBank="A";
    txnObjTFR.sourceATM = "A001";
    txnObjTFR.debitATM = "A001";//代理扣款ATM,可不传或者传sourceATM
    txnObjTFR.creditATM="A001";//代理收款ATM
    txnObjTFR.fee="";//本行卡不需要手续费，可不传或传空
    txnObjTFR.status = 1;//交易进行中
    socket.emit('informSupervisor', txnObjTFR);
})
$("#TFR_O_2").on("click", function () {
    txnObjTFR={};
    txnObjTFR.txnType = "TFR";
    txnObjTFR.stepId = 2;
    txnObjTFR.startNode = "aBank";
    txnObjTFR.nextNode = "A001";
    txnObjTFR.debitAmount="1000";//转出数额
    txnObjTFR.debitAccount="6222222,111111,222222";
    txnObjTFR.debitBank="A";
    txnObjTFR.creditAccount = "6222222,111111,333222";
    txnObjTFR.creditBank="A";
    txnObjTFR.sourceATM = "A001";
    txnObjTFR.debitATM = "A001";//代理扣款ATM,可不传或者传sourceATM
    txnObjTFR.creditATM="A001";//代理收款ATM
    txnObjTFR.fee="";//本行卡不需要手续费，可不传或传空
    txnObjTFR.status = 2;//交易进行中
    socket.emit('informSupervisor', txnObjTFR);
})
$("#TFR_O_1").on("click", function () {
    txnObjTFR={};
    txnObjTFR.txnType = "TFR";
    txnObjTFR.stepId = 1;
    txnObjTFR.startNode = "A001";
    txnObjTFR.nextNode = "aBank";
    txnObjTFR.debitAmount="1000";//转出数额
    txnObjTFR.debitAccount="6222222,111111,222222";
    txnObjTFR.debitBank="A";
    txnObjTFR.creditAccount = "6222222,111111,333222";
    txnObjTFR.creditBank="A";
    txnObjTFR.sourceATM = "A001";
    txnObjTFR.debitATM = "A001";//代理扣款ATM,可不传或者传sourceATM
    txnObjTFR.creditATM="A001";//代理收款ATM
    txnObjTFR.fee="";//本行卡不需要手续费，可不传或传空
    txnObjTFR.status = 1;//交易进行中
    socket.emit('informSupervisor', txnObjTFR);
})
$("#TFR_O_2").on("click", function () {
    txnObjTFR={};
    txnObjTFR.txnType = "TFR";
    txnObjTFR.stepId = 2;
    txnObjTFR.startNode = "aBank";
    txnObjTFR.nextNode = "A001";
    txnObjTFR.debitAmount="1000";//转出数额
    txnObjTFR.debitAccount="6222222,111111,222222";
    txnObjTFR.debitBank="A";
    txnObjTFR.creditAccount = "6222222,111111,333222";
    txnObjTFR.creditBank="A";
    txnObjTFR.sourceATM = "A001";
    txnObjTFR.debitATM = "A001";//代理扣款ATM,可不传或者传sourceATM
    txnObjTFR.creditATM="A001";//代理收款ATM
    txnObjTFR.fee="";//本行卡不需要手续费，可不传或传空
    txnObjTFR.status = 2;//交易进行中
    socket.emit('informSupervisor', txnObjTFR);
})
$("#TFR_O_1").on("click", function () {
    txnObjTFR={};
    txnObjTFR.txnType = "TFR";
    txnObjTFR.stepId = 1;
    txnObjTFR.startNode = "A001";
    txnObjTFR.nextNode = "aBank";
    txnObjTFR.debitAmount="1000";//转出数额
    txnObjTFR.debitAccount="6222222,111111,222222";
    txnObjTFR.debitBank="A";
    txnObjTFR.creditAccount = "6222222,111111,333222";
    txnObjTFR.creditBank="A";
    txnObjTFR.sourceATM = "A001";
    txnObjTFR.debitATM = "A001";//代理扣款ATM,可不传或者传sourceATM
    txnObjTFR.creditATM="A001";//代理收款ATM
    txnObjTFR.fee="";//本行卡不需要手续费，可不传或传空
    txnObjTFR.status = 1;//交易进行中
    socket.emit('informSupervisor', txnObjTFR);
})
$("#TFR_O_2").on("click", function () {
    txnObjTFR={};
    txnObjTFR.txnType = "TFR";
    txnObjTFR.stepId = 2;
    txnObjTFR.startNode = "aBank";
    txnObjTFR.nextNode = "A001";
    txnObjTFR.debitAmount="1000";//转出数额
    txnObjTFR.debitAccount="6222222,111111,222222";
    txnObjTFR.debitBank="A";
    txnObjTFR.creditAccount = "6222222,111111,333222";
    txnObjTFR.creditBank="A";
    txnObjTFR.sourceATM = "A001";
    txnObjTFR.debitATM = "A001";//代理扣款ATM,可不传或者传sourceATM
    txnObjTFR.creditATM="A001";//代理收款ATM
    txnObjTFR.fee="";//本行卡不需要手续费，可不传或传空
    txnObjTFR.status = 2;//交易进行中
    socket.emit('informSupervisor', txnObjTFR);
})
//TFR:本行卡在本行机转它行卡 ---end