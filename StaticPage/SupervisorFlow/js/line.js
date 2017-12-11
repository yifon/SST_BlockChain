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
        startLeft = startX + startW / 2;
        startTop = startY + startH;
        endLeft = endX + endW / 2;
        endTop = endY;
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
        startLeft = startX + startH / 2;
        startTop = startY;
        endLeft = endX + endW / 2;
        endTop = endY + endH;
    }

    var line = "<line" + " id=line" + index + " xmlns='http://www.w3.org/2000/svg' stroke='#5bb75b' stroke-width='5' marker-end='url(#arrow)' stroke-dasharray='4,4'></line>";
    console.log("startX:" + startX);
    console.log("startY:" + startY);
    console.log("startW:" + startW);
    console.log("startH:" + startH);
    console.log("endX:" + endX);
    console.log("endY:" + endY);
    console.log("endW:" + endW);
    console.log("endH:" + endH);
    console.log("startLeft:" + startLeft);
    console.log("startTop:" + startTop);
    console.log("endLeft:" + endLeft);
    console.log("endTop:" + endTop);
    var svg = d3.select('#wrap')
    $(line).appendTo($("#wrap"));

    $('#line' + index).attr({
        x1: startLeft,
        y1: startTop,
        x2: endLeft,
        y2: endTop
    });
    svg.html(svg.html()); //需要重写父元素，否则html添加了，但是页面不显示
    // console.log(svg.html());

}


function addEvent(txnObj) {
    console.log($(!"#event" + txnObj.stepId).length > 0);
    var informContent = "步骤" + txnObj.stepId + ": 由" + txnObj.startNode + "到达" + txnObj.nextNode + ", ";
    if (txnObj.cardNumber != "" && txnObj.cardNumber != "undefined") {
        informContent += "交易卡号: " + txnObj.cardNumber + ", ";
    }
    //INQ不需要传交易数额
    if (txnObj.txnType != "" && txnObj.txnType != "undefined" && txnObj.txnType != "INQ") {
        informContent += "交易数额: " + txnObj.txnAmount + ", ";
    }
    if (txnObj.cardBank != "" && txnObj.cardBank != "undefined") {
        informContent += "交易卡所属银行: " + txnObj.cardBank + ", ";
    }
    if (txnObj.sourceATM != "" && txnObj.sourceATM != "undefined") {
        informContent += "操作ATM: " + txnObj.sourceATM + ", ";
    }
    if (txnObj.minerATM != "" && txnObj.minerATM != "undefined") {
        informContent += "代理ATM: " + txnObj.minerATM + ", ";
    }
    if (txnObj.fee != "" && txnObj.fee != "undefined") {
        informContent += "手续费: " + txnObj.fee + ", ";
    }
    //只有INQ传交易数额
    if (txnObj.balance != "" && txnObj.balance != "undefined" && txnObj.txnType == "INQ") {
        informContent += "余额: " + txnObj.balance + ", ";
    }
    console.log(txnObj.status);
    if (txnObj.status != "" && txnObj.status != "undefined") {
        if (txnObj.status == 1) {
            informContent += "<br>状态: 交易正在处理";
        }
        if (txnObj.status == 2) {
            informContent += "<br>状态: 交易成功！";
        }
        if (txnObj.status == 3) {
            informContent += "<br>状态: 交易失败！";
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

var socket = io("ws://localhost:7004");
socket.emit("userName", "supervisor");

//当ATMC通知开始交易时，应刷新页面
socket.on("startTx", function () {
    location.reload();
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
    console.log("交易类型：" + txnObj.txnType)
    console.log(txnObj.startNode);
    console.log(txnObj.nextNode);
    console.log(txnObj.status);
    if ((txnObj.txnType == "CWD" || txnObj.txnType == "INQ" || txnObj.txnType == "DEP")) {
        if ($.inArray(txnObj.startNode, nodeArray) != -1 && $.inArray(txnObj.nextNode, nodeArray) != -1) {
            addLine(txnObj.stepId, "#" + txnObj.startNode, "#" + txnObj.nextNode);
            addEvent(txnObj);
        }
    }
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
    console.log("交易类型：" + txnObj.txnType)
    if ($.inArray(txnObj.startNode, nodeArray) != -1 && $.inArray(txnObj.nextNode, nodeArray) != -1) {

    }
})

$("#test").on("click", function () {
    addLine(0, "#A001", "#Blockchain");
    addEvent(0, "A001", "Blockchain");
})
