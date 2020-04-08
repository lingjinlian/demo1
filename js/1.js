 <script type="text/javascript">
      window.onload = function() {
    var oDiv = document.getElementById('oDiv'),
        aList = oDiv.getElementsByTagName('a');
    //alert(aList.length);
    for (var i = 0; i < aList.length; i++) {
        aList[i].onmouseenter = function() {
            //alert('1');
            var _i = this.getElementsByTagName('i')[0]; //此处没有【0】不能完成
            //var _i=aList.getElementsByTagName('i')
            starMove(_i, {
                top: -100,
                opacity: 0
            }, function() {
                _i.style.top = 140 + 'px';

                starMove(_i, {
                    top: 0,
                    opacity: 100
                }); //注意这里的opacity为百分制！！！
                //alert('hello');
            });
        }
    }



    function getStyle(obj, sty) {
        if (obj.currentStyle) {
            return obj.currentStyle[sty]; //ie
        } else {
            return getComputedStyle(obj, false)[sty]; //ff获取元素的样式的函数
        }
    }
    //starMove(obj,{stty1:iTarget1,stty2:iTarget2})
    function starMove(obj, json, fn) {



        clearInterval(obj.timer);

        obj.timer = setInterval(function() {

            var flag = true; //判读运动是是否都达到目标//为什么一定要放在function下面！！才能执行回调函数！！

            for (var stty in json) {
                //1.取当前的值
                var icur = 0; //stty=style='height'或者其他
                if (stty === 'opacity') {
                    icur = Math.round(parseFloat(getStyle(obj, stty)) * 100); //四舍五入

                } else {
                    icur = parseInt(getStyle(obj, stty));
                }
                //2.算速度      
                var speed = (json[stty] - icur) / 2;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);


                //3.监测停止     //alert(obj.style.width)为什么这里第一次加载显示不出来width所以parseInt(obj.style.width)=NaN
                if (icur !== json[stty]) {
                    flag = false; //判断是否全部完成目标！！！
                }

                if (stty === 'opacity') {
                    obj.style[stty] = (icur + speed) / 100;
                } else {
                    obj.style[stty] = icur + speed + 'px';
                } //icur=parseInt(getStyle(obj,'width'))===obj.offsetWidth,但是这里的后者有bug 所以被替代

            } //json终止处

            if (flag) {


                clearInterval(obj.timer);

                if (flag) {
                    fn();
                }
            }
        }, 50);

    }






}