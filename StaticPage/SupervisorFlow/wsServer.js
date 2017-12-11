var app = require("http").createServer();
var io = require("socket.io")(app);

var PORT = 7004;

app.listen(PORT);

io.on("connection", function (socket) {
    socket.nickname = "";
    socket.on("userName", function (str) {
        socket.nickname = str;
        console.log(socket.nickname + " comes!");
    })

    //回到首页时，要通知supervisor刷新页面
    socket.on("startTx", function () {
        io.emit("startTx");
    })
    //客人选择ATM
    socket.on("chooseATM", function (str) {
        io.emit("chooseATM",str);
    })

    //CWD,INQ,DEP接口一样，监听informSupervisor
    socket.on("informSupervisor", function (txnObj) {
        if (txnObj.txnType == "CWD" || txnObj.txnType == "INQ" || txnObj.txnType == "DEP") {
            console.log("收到ATMC发来的信息如下：");
            console.log("txnType: " + txnObj.txnType);
            console.log("stepId: " + txnObj.stepId);
            console.log("startNode: " + txnObj.startNode);
            console.log("nextNode: " + txnObj.nextNode);
            console.log("cardNumber: " + txnObj.cardNumber);
            console.log("txnAmount: " + txnObj.txnAmount);
            console.log("cardBank: " + txnObj.cardBank);
            console.log("sourceATM: " + txnObj.sourceATM);
            console.log("minerATM: " + txnObj.minerATM);
            console.log("fee: " + txnObj.fee);
            console.log("balance: " + txnObj.balance);
            console.log("status: " + txnObj.status);
            io.emit("informSupervisor", txnObj);
        }
    })
    //TFR监听informSupervisorTFR
    socket.on("informSupervisorTFR", function (txnObjTFR) {
        if (txnObjTFR.txnType == "TFR") {
            console.log("收到ATMC发来的信息如下：");
            console.log("txnType: " + txnObjTFR.txnType);
            console.log("stepId: " + txnObjTFR.stepId);
            console.log("startNode: " + txnObjTFR.startNode);
            console.log("nextNode: " + txnObjTFR.nextNode);
            console.log("debitAmount: " + txnObjTFR.debitAmount);
            console.log("debitAccount: " + txnObjTFR.debitAccount);
            console.log("debitBank: " + txnObjTFR.debitBank);
            console.log("creditAccount: " + txnObjTFR.creditAccount);
            console.log("creditBank: " + txnObjTFR.creditBank);
            console.log("sourceATM: " + txnObjTFR.sourceATM);
            console.log("debitATM: " + txnObjTFR.debitATM);
            console.log("creditATM: " + txnObjTFR.creditATM);
            console.log("fee: " + txnObjTFR.fee);
            console.log("status: " + txnObjTFR.status);
            io.emit("informSupervisorTFR", txnObjTFR);
        }

    })
    socket.on("disconnnect", function () {
        console.log(socket.name + " left!");
    })
})
console.log("websocket server listening on port:" + PORT);
