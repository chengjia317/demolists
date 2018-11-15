window.onload=function(){
    //1.瀑布流布局
    waterFull('all','box');
    //2.动态加载图片
    var time1=null;
    window.onscroll=function(){
        clearTimeout(time1);
        time1=setInterval(function(){
            if(loadImg()){
            //2.1创建数据
            var imgData=[
                {'src':'images/img01.jpg'},
                {'src':'images/img10.jpg'},
                {'src':'images/img17.jpg'},
                {'src':'images/img16.jpg'},
                {'src':'images/img30.jpg'},
                {'src':'images/img21.jpg'}
            ];
            //2.2不断加载数据
            for(var i=0;i<imgData.length;i++){
                var newBox=document.createElement('div');
                newBox.className='box';
                $('all').appendChild(newBox);

                var newImg=document.createElement('div');
                newImg.className='pic';
                newBox.appendChild(newImg);

                var newData=document.createElement('img');
                newData.src=imgData[i].src;
                newImg.appendChild(newData);
            }
            //2.3重新布局
            waterFull('all','box');
        }
       },200);
     };
            //2.4窗口大小变化
            var time2=null;
            window.onresize=function(){
                clearTimeout(time2);
                time2=setTimeout(function(){
                    waterFull('all','box');
                },200);
            }
}
function waterFull(parent,child){
    //1.让父盒子居中显示
        //1.1获取所有的子盒子
    var allBox=$(parent).getElementsByClassName(child);
        //1.2获取子盒子宽度
    var boxWidth=allBox[0].offsetWidth;
        //1.3获取屏幕的宽度
    var screenX=document.documentElement.clientWidth;
        //1.4获取列数
    var cols=parseInt(screenX/boxWidth);
        //1.5父盒子宽度确定并居中显示
    $(parent).style.width=cols*boxWidth+'px';
    $(parent).style.margin='0 auto';

    //2.子盒子定位
        //2.1定义各种变量
        var heightArr=[],boxHeight=0,minBoxHeight=0,minBoxIndex=0;
        //2.2遍历所有图片
        for(var i=0;i<allBox.length;i++){
            //2.2.1获取每个图片的高度
            boxHeight=allBox[i].offsetHeight;
            if(i<cols){//处理第一行图片
                heightArr.push(boxHeight);
            }else{//其余图片的处理
                //2.2.2确定最小图片的高度
                minBoxHeight=_.min(heightArr);
                //2.2.3确定最小盒子的索引
                minBoxIndex=getMinBoxIndex(heightArr,minBoxHeight);
                //2.2.4定位子盒子
                allBox[i].style.position='absolute';
                allBox[i].style.top=minBoxHeight+'px';
                allBox[i].style.left=minBoxIndex*boxWidth+'px';
                //2.2.5重新定义高度
                heightArr[minBoxIndex]+=boxHeight;
            }
        }
}
function loadImg(){
    //1.获取最后盒子
    var allBox=$('all').getElementsByClassName('box');
    var lastBox=allBox[allBox.length-1];
    //2.计算出最后盒子的高度
    var lastBoxH=lastBox.offsetTop+lastBox.offsetHeight*0.5;
    //2.1计算屏幕高度
    var screenH=document.documentElement.clientHeight;
    //2.2计算滚动高度
    var scrollH=scroll().top;
    //2.3返回对比结果
    return lastBoxH<=screenH+scrollH;
}

function $(id){
    return typeof  id==='string'?document.getElementById(id):null;
}
/**
 * 封装最小盒子的索引
 * @param {*} id 
 */
function getMinBoxIndex(arr,val){
    for(var i=0;i<arr.length;i++){
        if(arr[i]===val){
            return i;
        }
    }
}
/**
 * 获取scroll家族头部和左边的滚动的长度
 * @returns {{top: number, left: number}}
 */
function scroll(){
    if(window.pageYOffset){
        return{
            'top':window.pageYOffset,
            'left':window.pageXOffset
        }
    }else if(document.compatMode==='CSS1Compat'){
        return{
            'top':document.documentElement.scrollTop,
            'left':document.documentElement.scrollLeft
        }
    }
    return {
        'top':document.body.scrollTop,
        'left':document.body.scrollLeft
    }
}
