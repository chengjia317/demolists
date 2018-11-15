window.onload=function(){
	//获取所需标签
	var pic=$('main').children;
	var index=0;
	//动态添加span
	for(var i=0;i<pic.length;i++){
		var span=document.createElement('span');
		span.className='span';
		span.innerText=pic.length-i-1;
		$('bottom').insertBefore(span,$('bottom').children[1]);
	}
	//把第一个设为选中状态
	$('bottom').children[1].className='active';
	//第一张图片放在视图位置，其他图片放在右侧
	var screenW=pic[0].offsetWidth;
	for(var j=1;j<pic.length;j++){
		pic[j].style.left=screenW+'px';
	}
	//监听点击操作
	var allSpan=$('bottom').children;
	for(var k=0;k<allSpan.length;k++){
		allSpan[k].onmousedown=function(){
			//prev 只有点击prev和next时 index才会发生变化
			if(this.className==='prev'){
				move(pic[index],{'left':screenW});
				index--;
				if(index<0){
					index=pic.length-1;
				}
				pic[index].style.left=-screenW+'px';
				move(pic[index],{'left':0});
			}else if(this.className==='next'){//next
				move(pic[index],{'left':-screenW});
				index++;
				if(index>=pic.length){
					index=0;
				}
				pic[index].style.left=screenW+'px';
				move(pic[index],{'left':0});
			}else{//指用户手动点击的索引
				var spanIndex=parseInt(this.innerText);
				if(spanIndex>index){
					move(pic[index],{'left':-screenW});
					pic[spanIndex].style.left=screenW+'px';
				}else if(spanIndex<index){
					move(pic[index],{'left':screenW});
					pic[spanIndex].style.left=-screenW+'px';
				}
					index=spanIndex;
					move(pic[index],{'left':0});
			}
			changeColor();
		}
	}
	//改变索引的颜色
	function changeColor(){
		//排他
		for(var m=1;m<allSpan.length-1;m++){
			allSpan[m].className='span';
		}
		allSpan[index+1].className='span active';
	}
	//自动轮播
	var time=setInterval(auto,1000);
	function auto(){
		move(pic[index],{'left':-screenW});
		index++;
		if(index>=pic.length){
			index=0;
		}
		pic[index].style.left=screenW+'px';
		move(pic[index],{'left':0});
		changeColor();
	}
	//鼠标进入清除
	$('box').onmouseover=function(){
		clearInterval(time);
	}
	$('box').onmouseout=function(){
		time=setInterval(auto,1000);
	}
}