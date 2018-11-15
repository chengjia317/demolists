window.onload=function(){
	function $(id){
	return typeof id==='string'?document.getElementById(id):null;

};
	var oLi=$('top').getElementsByTagName('li');
	var content=$('bottom').getElementsByClassName('content');
	for(var i=0;i<oLi.length;i++){
		oLi[i].index=i;
		oLi[i].onmouseover=function(){
			for(var j=0;j<oLi.length;j++){
				oLi[j].className='';
				content[j].style.display='none';
			}
			this.className='active';
			content[this.index].style.display='block';

		}
	}
};

