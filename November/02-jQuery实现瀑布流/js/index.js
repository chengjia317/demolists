$(function(){
    //1.瀑布流布局
    waterFull();
    //2.动态加载图片
    var time1=null;
    $(window).on('scroll',function(){
        clearTimeout(time1);
        time1=setInterval(function(){
            if(loadImg()){
            //2.1创建数据
            var imgData=[
                {'src':'images/1.jpg'},
                {'src':'images/10.jpg'},
                {'src':'images/17.jpg'},
                {'src':'images/16.jpg'},
                {'src':'images/30.jpg'},
                {'src':'images/21.jpg'}
            ];
            //2.2不断加载数据
            $.each(imgData,function(index,value){
              var newBox=$('<div></div>').addClass('box').appendTo('#main');
              var newPic=$('<div></div>').addClass('pic').appendTo(newBox);
              $('<img/>').attr('src',$(value).attr('src')).appendTo(newPic);
            })
            //2.3重新布局
            waterFull();
        }
       },200);
     });
   });
/**
 * 实现瀑布流的布局
*/
function waterFull(){
    //1.让父盒子居中显示
        //1.1获取所有的子盒子
    var allBox=$('#main>.box');
        //1.2获取子盒子宽度
    var boxWidth=allBox.eq(0).outerWidth();
        //1.3获取屏幕的宽度
    var screenX=$(window).width();
        //1.4获取列数
    var cols=parseInt(screenX/boxWidth);
        //1.5父盒子宽度确定并居中显示
    $('#main').css({
      width:cols*boxWidth+'px',
      margin:'0 auto'
    })
    //2.子盒子定位
        //2.1定义各种变量
        var heightArr=[],boxHeight=0,minBoxHeight=0,minBoxIndex=0;
        //2.2遍历所有图片
        $.each(allBox,function(index,value){
          boxHeight=$(value).outerHeight();
          if(index<cols){//处理第一行图片
              heightArr.push(boxHeight);
          }else{//其余图片的处理
              //2.2.2确定最小图片的高度
              minBoxHeight=Math.min.apply(this,heightArr);
              //2.2.3确定最小盒子的索引
              minBoxIndex=$.inArray(minBoxHeight,heightArr);
              //2.2.4定位子盒子
                //2.2.1获取每个图片的高度
              $(value).css({
                position:'absolute',
                left:minBoxIndex*boxWidth+'px',
                top:minBoxHeight+'px'
              })
              //2.2.5重新定义高度
              heightArr[minBoxIndex]+=boxHeight;
          }
        });
        }
function loadImg(){
    //1.获取最后盒子
    var lastBox=$('#main>.box').last();
    //2.计算出最后盒子的高度
    var lastBoxH=lastBox.outerHeight()+lastBox.offset().top*0.5;
    //2.1计算屏幕高度
    var screenH=$(window).height();
    //2.2计算滚动高度
    var scrollH=$(window).scrollTop();
    //2.3返回对比结果
    return lastBoxH<=screenH+scrollH;
}
