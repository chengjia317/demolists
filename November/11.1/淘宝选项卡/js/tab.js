function Tabs() {}
Tabs.prototype={
	constructor:Tabs,
	init:function(){
		this.bindEvent();
	},
	bindEvent:function(){
		$('#top li').hover(function(){
			$(this).addClass('active').siblings().removeClass('active');
			var index=$(this).index();
			var domIndex=$('.content').eq(index);
			domIndex.css('display','block').siblings().css('display','none');
		})
	}
};


