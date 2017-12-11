/**
 * 
 * @param {*} stepId 
 * @param {*} startNode
 * @param {*} endNode 
 * 添加的event的html：
 * <li class="right_li">
 *      <span class="ic_events png"></span>
 *      <p class="txt_events"><strong>xxxxx</strong></p>
 * </li>
 * <li class="left_li">
 *      <span class="ic_events"><i class="png"></i></span>
 *      <p class="txt_events"><strong>xxxxx</strong></p>
 * </li>
 * 如果index
 */

function addEvent(stepId, startNode, endNode) {
    var right="<li class='right_li' id='event"+stepId+"'><span class='ic_events png'></span><p class='txt_events'><strong></strong></p>";
    var left="<li class='left_li' id='event"+stepId+"'><span class='ic_events'><i class='png'></i></span><p class='txt_events'><strong></strong></p>";

    if(stepId%2==0){
        $(right).appendTo("#event_ul");//添加到ul中
    }
    else{
        $(left).appendTo("#event_ul");//添加到ul中
    }
    $("#event"+stepId+ " strong").html("事件"+stepId+":交易由"+startNode+"到达"+endNode);
}
