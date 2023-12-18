var buttonstart=document.getElementById('buttonstart')
var playOpacity=1.0/*透明度*/
var bg=document.getElementById('bg')
var handl
buttonstart.onclick=function(){
	handl=setInterval(playin,20)
}
function playin(){
	playOpacity-=0.02
	if(playOpacity>=0){
		bg.style.opacity=playOpacity
	}else{
		document.location='play.htm'
		clearInterval(handl)
	}
}

var buttonalert=document.getElementById('buttonalert') // 获取新的按钮
buttonalert.onclick=function(){
	alert('规则：\n1、使用WASD或方向键进行上下左右的移动。\n2、使用QE进行左上移动和右上移动。\n3、按下空格发射子弹。\n4、初始血量为3。')
}