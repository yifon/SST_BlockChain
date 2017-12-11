//smartCycle version 1.0 - MHVDeveloper
!function(t) {
    //o为整个循环节点容器的对象
    var o = function(o, i) {
        this._defaults = {
            container_width: "420px",//指定目标的宽度
            container_height: "420px",
            radio: 160,//对象到中心到距离
            angle_ini: 0,//开始角度，单位弧度
            direction: "right",//箭头方向，可选值：'left'或'right'
            diameter_object: 100,//流程图节点对象的直径
            diameter_center: 100,//中心对象的直径
            font_size: "20px",//字体大小
            radio_arrows: 140,//箭头到中心到距离
            type_arrows: ["➡"],//箭头的类型（数组）
            arrows_size: "60px",//箭头的大小
            arrows_colors: [],//箭头的颜色（数组）
            colors: [],//循环流程图对象的颜色
            union: ["false", "#5bb75b", "10px"]//循环的组合属性：可见性、颜色和宽度
        },
        //.extend([deep],target,object1,[objectN]),返回被扩展的对象{}
        //合并this._defaults和i，并传递给{},返回合并后的对象
        this._options = t.extend(!0, {}, this._defaults, i),
        this.options = function(o) {
            //t.extend(!0,this._options,o)->合并this._options和o,修改并返回this._options
            //如果o为真，则返回修改后的this._options,否则返回默认的this._options
            return o ? t.extend(!0, this._options, o) : this._options
        }
        ,
        this.realign = function() {
            //0==""-->返回值为true,执行this._options.colors赋值
            0 == this._options.colors.length && (this._options.colors = ["#5bb75b", "#C0504D", "#9BBB59", "#8064A2", "#4BACC6", "#D0BE40", "#848058", "#95A39D"]),
            //this._options.arrows_colors=["#C0504D", "#9BBB59", "#8064A2", "#4BACC6", "#D0BE40", "#848058", "#95A39D"]
            0 == this._options.arrows_colors.length && (this._options.arrows_colors = ["#C0504D", "#9BBB59", "#8064A2", "#4BACC6", "#D0BE40", "#848058", "#95A39D"]);
            var i = this._options.radio
              , s = this._options.angle_ini//开始角度，单位弧度
              , e = o
              , r = e.children(".sc_object")//子节点
              , n = e.children(".sc_center");//中央节点
            e.css({
                width: this._options.container_width,
                height: this._options.container_height
            });
            var a = e.width()
              , h = e.height()
              , c = -(Math.PI / 2) + s;//逆时针旋转𝛑/2弧度(即90度)
            step = 2 * Math.PI / (2 * r.length),//2𝛑／2*子节点个数，一个圆共2𝛑弧度
            //处理中央节点的样式
            n.css({
                width: this._options.diameter_center +10+ "px",//宽度为中心节点的直径长度
                height: this._options.diameter_center +10+ "px",//高度为中心节点的直径长度
                background: this._options.colors[0],//#F79646
                "background-position": "center",
                "background-repeat": "no-repeat",
                position: "absolute",
                "text-align": "center",
                "font-size": this._options.font_size,
                // "font-size":"20px",//调小字体为16px
                "border-radius": "50%",
                "line-height": this._options.diameter_center + "px",
            });
            //下述为设置中心节点的坐标，当前设置为居中
            var p = e.css("position");
            if ("relative" == p || "static" == p)
                var d = e.offset().top
                  , l = e.offset().left;
            else
                var d = 0
                  , l = 0;
            var _ = Math.round(a / 2 - n.width() / 2) + l
              , u = Math.round(h / 2 - n.height() / 2) + d;
            n.css({
                left: _,
                top: u,
                display: "block"
            });
            //循环的组合属性［可见性、颜色、宽度］
            var f = this._options.union[0];//可见性，当前为false
            if ("true" == f) {
                e.prepend('<div class="sc_union"></div>');
                var g = e.children(".sc_union");
                g.css({
                    position: "relative",
                    "background-color": "transparent",
                    border: "solid " + this._options.union[2] + this._options.union[1],
                    "border-radius": "50%"
                });
                var w = parseInt(g.css("border-width"), 10)
                  , v = 2 * this._options.radio_arrows
                  , x = 2 * this._options.radio_arrows;
                g.css({
                    width: v + "px",
                    height: x + "px"
                });
                var b = e.width() / 2 - v / 2 - w
                  , m = e.width() / 2 - x / 2 - w;
                g.css({
                    left: b + "px",
                    top: m + "px"
                })
            }
            var y = 1
              , C = 0
              , M = 0
              , B = 0
              , k = this;
            e.children(".pointers").remove(),//箭头
            r.each(function() {
                var o = k._options.colors.length//8,_options.colors = ["#F79646", "#C0504D", "#9BBB59", "#8064A2", "#4BACC6", "#D0BE40", "#848058", "#95A39D"]),
                  , s = k._options.arrows_colors.length;//7,_options.arrows_colors=["#C0504D", "#9BBB59", "#8064A2", "#4BACC6", "#D0BE40", "#848058", "#95A39D"]
                y == o && (y = 1),//y=1
                C == s && (C = 0),//C=0
                t(this).css({
                    width: k._options.diameter_object + "px",
                    height: k._options.diameter_object + "px",
                    position: "absolute",
                    "border-radius": "50%",
                    "text-align": "center",
                    "font-size": k._options.font_size,//20px
                    background: k._options.colors[y],//#C0504D
                    "background-position": "center",
                    "background-repeat": "no-repeat",
                    "line-height": k._options.diameter_object + "px",
                    "opacity":"0.8"
                });
                var r = a / 2 + i * Math.cos(c) - t(this).width() / 2 + l //l-->offset().left
                  , n = h / 2 + i * Math.sin(c) - t(this).height() / 2 + d;//i+d-->160+offset().top
                // window.console && console.log(t(this).text(), r, n),
                t(this).css({
                    left: r + "px",
                    top: n + "px"
                }),
                c += step,//c=-𝛑/2+𝛑/node
                M += 1;//1
                var p = k._options.type_arrows.length;//7
                //动态添加箭头,[June]最后一个节点不闭合
                if(M!=e.children(".sc_object").length){
                B == p && (B = 0),
                    e.prepend('<div class="pointers arrow' + M + '">' + k._options.type_arrows[B] + "</div>"),
                    B += 1,
                    e.children(".arrow" + M).css({
                       // "font-size": k._options.arrows_size,//箭头大小为60px
                       "font-size": "40px",//箭头大小为20px
                        width: "100px",
                        height: "100px",
                        position: "absolute"
                    });
                    var _ = k._options.radio_arrows//140,箭头到中心的位置
                      , u = a / 2 + _ * Math.cos(c + 6.28319) + l//width/2+140*cos(-𝛑/2+𝛑/node+𝛑/4)-->width/2+140*cos(𝛑/node-4/𝛑)
                      , f = h / 2 + _ * Math.sin(c + 6.28319) + d
                      , g = c + Math.PI / 2//-𝛑/2+𝛑/node+𝛑/2-->𝛑/node
                      , w = k._options.direction;//箭头方向向右
                    "left" == w && (g = c - Math.PI / 2),
                    e.children(".arrow" + M).css({
                        left: u - t(".arrow" + M).width() / 2 + "px",
                        top: f - t(".arrow" + M).height() / 2 + "px",
                        transform: "rotate(" + g + "rad)",//顺时针旋转𝛑/node弧度，一个圆共2π弧度，90reg＝π/2rad
                        color: k._options.arrows_colors[C],//#C0504D
                        "text-align": "center"
                    }),
                    c += step,
                    y += 1,
                    C += 1
                }
            })
        }
    };
    t.fn.smartCycle = function(i) {
        function s() {
            var o = t(this)
              , i = o.data("smartCycle");
            a.push(i)
        }
        function e(t) {
            var o = a[t];
            if (!o)
                return console.warn("$.smartCycle not instantiated yet"),
                console.info(this),
                void c.push(void 0);
            if ("function" == typeof o[n]) {
                var i = o[n].apply(o, h);
                c.push(i)
            } else
                console.warn("Method '" + n + "' not defined in $.smartCycle")
        }
        function r() {
            var i = t(this)
              , s = new o(i,p);
            i.data("smartCycle", s),
            i.smartCycle("realign")
        }
        var n = "string" == typeof i ? i : void 0;
        if (n) {
            var a = [];
            this.each(s);
            var h = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : void 0
              , c = [];
            return this.each(e),
            c.length > 1 ? c : c[0]
        }
        var p = "object" == typeof i ? i : void 0;
        return this.each(r)
    }
}(jQuery);
