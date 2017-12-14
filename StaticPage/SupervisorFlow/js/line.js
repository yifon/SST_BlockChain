function addLine(index, startId, endId) {
    //获取起始节点和终止节点的连线坐标
    var startX = $(startId).offset().left;
    var startY = $(startId).offset().top;
    var startW = $(startId).width();
    var startH = $(startId).height();
    var endX = $(endId).offset().left;
    var endY = $(endId).offset().top;
    var endW = $(endId).width();
    var endH = $(endId).height();
    var startLeft = 0;
    var startTop = 0;
    var endLeft = 0;
    var endTop = 0;
    //下述考虑起点在终点上方
    if (startY < endY) {
        if (startY + startH >= endY) {
            //起点在终点右边
            if (startX > endX) {
                startLeft = startX;
                startTop = startY + startH / 2;
                endLeft = endX + endW;
                endTop = endY + startH / 2;
            }
            // 起点在终点左边
            else {
                startLeft = startX + startW;
                startTop = startY + startH / 2;
                endLeft = endX;
                endTop = endY + startH / 2;
            }
        } else {
            startLeft = startX + startW / 2;
            startTop = startY + startH;
            endLeft = endX + endW / 2;
            endTop = endY;
        }
    }
    //起点和终点在同一水平线上
    if (startY == endY) {
        startTop = endTop = startY + startH / 2;
        //如果起点在终点右边，则起始点需要left+width;终止点left
        if (startX > endX) {
            startLeft = startX;
            endLeft = endX + endW;
        }
        //如果起始点在终止点右边，则起始点需要left;终止点left+width
        if (startX < endX) {
            startLeft = startX + startW;
            endLeft = endX;
        }
    }
    //起点在终点下方
    if (startY > endY) {
        if (startY <= endH + endY) {
            //起点在终点右边
            if (startX > endX) {
                startLeft = startX;
                startTop = startY + startH / 2;
                endLeft = endX + endW;
                endTop = endY + endH / 2;
            }
            else {
                startLeft = startX + startW;
                startTop = startY + startH / 2;
                endLeft = endX;
                endTop = endY + endH / 2;
            }
        } else {
            startLeft = startX + startW / 2;
            startTop = startY;
            endLeft = endX + endW / 2;
            endTop = endY + endH - 2 + "px";
        }
    }

    var line = "<line" + " id=line" + index + " xmlns='http://www.w3.org/2000/svg' stroke='#193f19' stroke-width='3' marker-end='url(#arrow)' stroke-dasharray='10,10'></line>";
    // console.log("startX:" + startX);
    // console.log("startY:" + startY);
    // console.log("startW:" + startW);
    // console.log("startH:" + startH);
    // console.log("endX:" + endX);
    // console.log("endY:" + endY);
    // console.log("endW:" + endW);
    // console.log("endH:" + endH);
    // console.log("startLeft:" + startLeft);
    // console.log("startTop:" + startTop);
    // console.log("endLeft:" + endLeft);
    // console.log("endTop:" + endTop);
    var svg = d3.select('#wrap')
    $(line).appendTo($("#wrap"));

    $('#line' + index).attr({
        x1: startLeft,
        y1: startTop,
        x2: endLeft,
        y2: endTop
    });
    $('#line' + index).css("z-index", 99);
    svg.html(svg.html()); //需要重写父元素，否则html添加了，但是页面不显示
    // console.log(svg.html());

}

function addEvent(txnObj) {
    //console.log($(!"#event" + txnObj.stepId).length > 0);
    //步骤0是初始化
    if (txnObj.stepId == "0") {
        if (txnObj.atm != "" && typeof (txnObj.atm) != "undefined") {
            var informContent = "Customer chooses: " + txnObj.atm;
        }
    } else {

        var informContent = "Step" + txnObj.stepId + ": <br>From " + txnObj.startNode + " to " + txnObj.nextNode + ";<br>";
        if (txnObj.txnType != "" && typeof (txnObj.txnType) != "undefined" && txnObj.stepId == "1") {
            informContent += "Transaction type:";
            if (txnObj.txnType == "INQ")
                informContent += "Balance Inquiry<br>";
            if (txnObj.txnType == "CWD")
                informContent += "Cash Withdrawal<br>";
            if (txnObj.txnType == "DEP")
                informContent += "Cash Deposit<br>";
            if (txnObj.txnType == "TFR")
                informContent += "Transfer<br>";
        }
        if (txnObj.cardNumber != "" && typeof (txnObj.cardNumber) != "undefined") {
            // informContent += "Card Number: " + txnObj.cardNumber + "; ";
        }
        //INQ不需要传交易数额
        if (txnObj.txnType != "" && typeof (txnObj.txnType) != "undefined") {
            // informContent += "Amount: " + txnObj.txnAmount + "; ";
        }
        if (txnObj.cardBank != "" && typeof (txnObj.cardBank) != "undefined") {
            //informContent += "Card Issue Bank: " + txnObj.cardBank + "; ";
        }
        if (txnObj.sourceATM != "" && typeof (txnObj.sourceATM) != "undefined") {
            // informContent += "Perform ATM: " + txnObj.sourceATM + "; ";
        }
        if (txnObj.minerATM != "" && typeof (txnObj.minerATM) != "undefined") {
            // informContent += "Miner ATM: " + txnObj.minerATM + "; ";
        }
        if (txnObj.debitAccount != "" && typeof (txnObj.debitAccount) != "undefined") {
            //informContent += "Debit Account: " + txnObj.debitAccount + "; ";
        }
        if (txnObj.debitAmount != "" && typeof (txnObj.debitAmount) != "undefined") {
            //informContent += "Debit Amount: " + txnObj.debitAmount + "; ";
        }
        if (txnObj.debitBank != "" && typeof (txnObj.debitBank) != "undefined") {
            informContent += "Debit from: " + txnObj.debitBank + "; ";
        }
        if (txnObj.creditAccount != "" && typeof (txnObj.creditAccount) != "undefined") {
            //informContent += "Credit Account: " + txnObj.creditAccount + "; ";
        }
        if (txnObj.creditBank != "" && typeof (txnObj.creditBank) != "undefined") {
            informContent += "Credit to: " + txnObj.creditBank + "; ";
        }
        if (txnObj.debitATM != "" && typeof (txnObj.debitATM) != "undefined") {
            //informContent += "Debit ATM: " + txnObj.debitATM + "; ";
        }
        if (txnObj.creditATM != "" && typeof (txnObj.creditATM) != "undefined") {
            //informContent += "Credit ATM: " + txnObj.creditATM + "; ";
        }

        if (txnObj.fee != "" && typeof (txnObj.fee) != "undefined") {
            // informContent += "Transaction Fee: " + txnObj.fee + "; ";
        }
        if (txnObj.balance != "" && typeof (txnObj.balance) != "undefined") {
            //informContent += "Balance: " + txnObj.balance + "; ";
        }
        if (txnObj.status != "" && typeof (txnObj.status) != "undefined") {
            if (txnObj.status == 1) {
                informContent += "<br>Status: In Progress";
            }
            if (txnObj.status == 2) {
                informContent += "<br>Status: Success";
            }
            if (txnObj.status == 3) {
                informContent += "<br>Status: Fail";
            }
        }
    }
    var left = "<li class='left_li' id='event" + txnObj.stepId + "'><span class='ic_events'><i class='png'></i></span><p class='txt_events'><strong></strong></p>";
    var right = "<li class='right_li' id='event" + txnObj.stepId + "'><span class='ic_events png'></span><p class='txt_events'><strong></strong></p>";

    //避免同个事件多次添加
    if (!$("#event" + txnObj.stepId).length > 0) {
        if (txnObj.stepId % 2 == 0) {
            $(right).appendTo("#event_ul"); //添加到ul中
        } else {
            $(left).appendTo("#event_ul"); //添加到ul中
        }
        $("#event" + txnObj.stepId + " strong").html(informContent);
    }
}

//为nextNode添加flash效果
function addFlash(nextNode) {
    var nodeArray = ["A001", "A002", "B001", "B002", "C001", "C002", "Blockchain", "aBank", "bBank", "cBank"];
    //如果节点存在，则添加闪烁的效果，并且去除其它节点的闪烁效果
    if ($.inArray(nextNode, nodeArray) != -1) {
        //先去除其它节点的闪烁效果
        for (var i = 0; i < nodeArray.length; i++) {
            if ($("#" + nodeArray[i]).hasClass("flash")) {
                $("#" + nodeArray[i]).removeClass("flash");
            }
        }
        $("#" + nextNode).toggleClass("flash");
    }
}

var socket = io("ws://39.108.142.194:7004");
// var socket = io("ws://localhost:7004");
socket.emit("userName", "supervisor");

//回到首页时，应刷新页面
socket.on("startTx", function () {
    location.reload();
})
//当客人选择某台ATM时，对应的提示
socket.on("chooseATM", function (str) {
    addFlash(str);
    var init = {};
    init.stepId = 0;
    init.atm = str;
    addEvent(init);//初始节点
})

//startNode和endNode只能为[A001,A002,B001,B002,C001,C003,Blockchain,aBank,bBank,cBank]
var nodeArray = ["A001", "A002", "B001", "B002", "C001", "C002", "Blockchain", "aBank", "bBank", "cBank"];

/**
*var txnObj={
*    txnType="";
*    stepId="";
*    startNode="";
*    nextNode="";
*    cardNumber="";
*    txnAmount="";
*    cardBank="";
*    sourceATM="";
*    minerATM="";
*    fee="";
*    status="";
*}
*   CWD,INQ,DEP接口一样，监听informSupervisor
*/
socket.on("informSupervisor", function (txnObj) {
    // console.log("交易类型：" + txnObj.txnType)
    console.log(txnObj.startNode);
    console.log(txnObj.nextNode);
    setTimeout(function () {
        if ($.inArray(txnObj.startNode, nodeArray) != -1 && $.inArray(txnObj.nextNode, nodeArray) != -1) {
            addLine(txnObj.stepId, "#" + txnObj.startNode, "#" + txnObj.nextNode);
            addEvent(txnObj);
            addFlash(txnObj.nextNode);
        }
    }, 5000 * txnObj.stepId);

})

/**
*var txnObj={
*    txnType="";
*    stepId="";
*    startNode="";
*    nextNode="";
*    debitAmount="";
*    debitAccount="";
*    debitBank="";
*    creditAccount="";
*    creditBank="";
*    sourceATM="";
*    debitATM="";
*    creditATM="";
*    fee="";
*    status="";
*}
*   TFR监听informSupervisorTFR
*/
socket.on("informSupervisorTFR", function (txnObj) {
    // console.log("交易类型：" + txnObj.txnType)
    setTimeout(function () {
        if ($.inArray(txnObj.startNode, nodeArray) != -1 && $.inArray(txnObj.nextNode, nodeArray) != -1) {
            // if ((txnObj.txnType == "TFR")) {
            if ($.inArray(txnObj.startNode, nodeArray) != -1 && $.inArray(txnObj.nextNode, nodeArray) != -1) {
                addLine(txnObj.stepId, "#" + txnObj.startNode, "#" + txnObj.nextNode);
                addEvent(txnObj);
                addFlash(txnObj.nextNode);
            }
            // }
        }
    }, 5000 * txnObj.stepId);
})
