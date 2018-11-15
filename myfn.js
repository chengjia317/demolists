/**
 * 根据id获取标签
 * @param {string}id
 * @returns {any}
 */
function $(id){
    return typeof  id==='string'?document.getElementById(id):null;
}

/**
 * 获取scroll家族头部和左边的滚动的长度
 * @returns {{top: number, left: number}}
 */
function scroll(){
    if(window.pageYOffset){//IE9 以上以及新版浏览器
        return{
            'top':window.pageYOffset,
            'left':window.pageXOffset
        }
    }else if(document.compatMode==='CSS1Compat'){//判断是否符合w3c标准
        return{
            'top':document.documentElement.scrollTop,
            'left':document.documentElement.scrollLeft
        }
    }
    return {   //怪异模式
        'top':document.body.scrollTop,
        'left':document.body.scrollLeft
    }
}

/**
 * 获取clinet家族头部和左边的滚动的长度
 * @returns {{width: number, height: number}}
 */
function client(){
    if(window.innerWidth){//IE9以上
        return {
            'width':window.innerWidth,
            'height':window.innerHeight
        }
    }else if(document.CompatMode==='CSS1Compat'){//标准模式
        return {
            'width':document.documentElement.clientWidth,
            'height':document.documentElement.clientHeight
        }
    }
    return {//怪异模式
        'width':document.body.clientWidth,
        'height':document.body.clientHeight
    }
}

/**
 * 阻止冒泡
 * @returns {{width: number, height: number}}
 */
    function cancelbubble(event){
       
        if(event&&event.stopPropagation){//w3c标准
            event.stopPropagation();
        }else{ //IE
            event.cancelBubble=true;
        }
    }

/**
 * 获取CSS样式
 * @returns {{width: number, height: number}}
 */
    function cssStyle(obj,attr) {
        if(obj.currentStyle){
            return obj.currentStyle[attr];//IE.opera
        }else{
           return window.getComputedStyle(obj,null)[attr];//
        }
    }

/**
 * 匀速动画函数
 * @param {object}obj
 * @param {number}target
 * @param {number}speed
 */
    function constantMove(obj,target,speed){
        clearInterval(obj.time);
        obj.time=setInterval(function(){
            var speed=target-obj.offsetLeft;
            speed=speed>0?Math.ceil(speed):Math.floor(speed);
            obj.style.left=obj.offsetLeft+speed+'px';
            if(Math.abs(target-obj.offsetLeft)<=Math.abs(speed)){
                obj.style.left=target+'px';
                clearInterval(obj.time);
            }
        })
    }

/**
 * 缓动动画函数
 * @param {object}obj
 * @param {object}json
 * @param {function}fn
 */
    function move(obj,json,fn){
        clearInterval(obj.timer);
        var begin=0,speed=0,target=0;
        obj.timer=setInterval(function(){
            var flag=true;//标识作用，所有动画完成后再清除定时器
            for(var key in json){
            	if('scrollTop'===key){
            		begin=Math.ceil(obj.scrollTop);
            		target=parseInt(json[key]);
            	}else{
            		begin=parseInt(cssStyle(obj,key));
                	target=parseInt(json[key]);
            	}
                
                speed=(target-begin)*0.2;
                speed=speed>0?Math.ceil(speed):Math.floor(speed);
                if('scrollTop'===key){
                	obj.scrollTop=begin+speed;
                }else{
                	obj.style[key]=begin+speed+'px';
                }
                if(begin!==target){
                    flag=false;
                }
            }
            if(flag){
                    clearInterval(obj.timer);
                    if(fn){
                        fn();
                    }
                }
        },50);
    }