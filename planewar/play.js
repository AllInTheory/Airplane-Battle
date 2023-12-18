var health = 3; // 添加一个变量来跟踪血量
var healthElement = document.getElementById('health'); // 获取显示血量的元素

var score = 0; // 添加一个变量来跟踪分数
var scoreElement = document.getElementById('score'); // 获取显示分数的元素

var lastHitTime = null; // 添加一个变量来跟踪上次扣血的时间

/*地图移动*/
var game=document.getElementById('game');
var bg_m=-1036;
var player=document.getElementById('player')
setInterval(function(){
	bg_m+=2
	if(bg_m>=-200){
		bg_m=-1036;
	}
game.style.backgroundPosition="0px "+bg_m+"px";
},50);
/*飞机移动*/
window.document.onkeydown=function(ent){
	var event=ent||window.event/*兼容火狐和IE固定写法*/	
	/*event.keycode获取键盘assic代码*/
	/*alert(event.keyCode)*/
	switch(event.keyCode){
		case 87:/*w*/
		case 38:/*方向上*/
			/*player.offset获取飞机位置Math.max两个值之中取最大的一个*/
			player.style.top=Math.max(0,(player.offsetTop-10))+"px";
			break
		case 83:/*s*/
		case 40:/*方向下*/
			player.style.top=Math.min(420,(player.offsetTop+10))+'px'
			break
		case 65:/*a*/
		case 37:/*方向左*/
			player.style.left=Math.max(0,(player.offsetLeft-10))+'px'
			break
		case 68:/*d*/
		case 39:/*方向右*/
			player.style.left=Math.min(405,(player.offsetLeft+10))+'px'
			break
		case 81:/*q*/
			player.style.top=Math.max(0,(player.offsetTop-10))+"px";
			player.style.left=Math.max(0,(player.offsetLeft-10))+'px'
			break
		case 69:/*e*/
			player.style.top=Math.max(0,(player.offsetTop-10))+"px";
			player.style.left=Math.min(405,(player.offsetLeft+10))+'px'
			break
		case 90:/*z*/
			player.style.top=Math.min(420,(player.offsetTop+10))+'px'
			player.style.left=Math.max(0,(player.offsetLeft-10))+'px'
			break
		case 88:/*x*/
			player.style.top=Math.min(420,(player.offsetTop+10))+'px'
			player.style.left=Math.min(405,(player.offsetLeft+10))+'px'
			break
		/*炮弹发射*/
		/*获取飞机位置*/
		case 32:
			var x=player.offsetLeft+52;
			var y=player.offsetTop
			dofire(x,y)
		}
	}
	/*开火*/
	function dofire(x,y){
		/*alert(x)*/
		for(var i=0;i<8;i++){
			var eshot=document.getElementById("eshot"+i);
			if(eshot.style.display=='none'){
				eshot.style.left=x+'px'
				eshot.style.top=y+'px'
				eshot.style.display='block'
				return;
			}
		}
	}
//显示敌机
function doshow(){
	//随机0-5 Math.ceil小数取整Math.random随机0-1可以放大
	var i=Math.ceil(Math.random()*100)%6
	var ee=document.getElementById("e"+i)
	if(ee.style.display=='none'){
		ee.style.top=-82+"px"
		ee.style.left=(Math.ceil(Math.random()*10000)%396)+'px'
		ee.style.display='block'
	}
	setTimeout('doshow()',2000)
}	

/*游戏主线*/
function running(){
	/*游戏主线，敌机飞行*/
	for(var i=0;i<6;i++){
		var ee=document.getElementById('e'+i)
		if(ee.style.display=='block'){
			ee.style.top=(ee.offsetTop+5)+'px';
			if(ee.offsetTop>418){
				ee.style.display='none'
			}
		}
	}
	//子弹飞行
	for(var i=0;i<8;i++){
		var eshot=document.getElementById('eshot'+i)
		if(eshot.style.display=='block'){
			eshot.style.top=(eshot.offsetTop-5)+'px';
			docheck(eshot);//执行碰撞函数
			if(eshot.offsetTop<0){
				eshot.style.display='none'
			}
		}
	}
	//爆炸的循环
	for(var i=0;i<pplist.length;i++){
		pplist[i].num++;
		if(pplist[i].num>5){
			game.removeChild(pplist[i]); // 从 DOM 中移除图片元素
			pplist.splice(i, 1); // 从数组中移除元素
		}
	}
    checkPlayerCollision(); // 检测玩家飞机和敌机之间的碰撞
	setTimeout('running()',30)
}

//碰撞函数
//定义存放爆炸数组
var pplist=new Array();
function docheck(eshot){
	//y子弹和敌机一样和x子弹在敌机宽度内
	//循环所有敌机
	for(var i=0;i<6;i++){
		var ee=document.getElementById('e'+i)
		if(ee.style.display=='block'){
			var ex=ee.offsetLeft
			var ey=ee.offsetTop+15
			var px=eshot.offsetLeft
			var py=eshot.offsetTop
			//飞机满足下面条件
		if(py<ey && px>=ex && px<=ex+110){
			ee.style.display="none";
			eshot.style.display="none";
			//添加爆炸场面
			var pp=document.createElement("img");
			pp.src='./images/boom.gif';
			pp.style.position="absolute";
			pp.style.left=(ex-130)+'px';
			pp.style.top=(ey-130)+"px";
			pp.num=0;
			pplist.push(pp);
			game.appendChild(pp);

            score += 100; // 增加分数
		    scoreElement.innerText = '分数: ' + score; // 更新显示的分数
		}
		}
	}
}

function checkPlayerCollision() {
	for(var i=0;i<6;i++){
		var ee=document.getElementById('e'+i)
		if(ee.style.display=='block'){
			var ex=ee.offsetLeft
			var ey=ee.offsetTop
			var px=player.offsetLeft
			var py=player.offsetTop
			if(!(px+110<ex || py+82<ey || px>ex+110 || py>ey+82)){
				var currentTime = new Date().getTime(); // 获取当前时间
				if (lastHitTime === null || currentTime - lastHitTime >= 5000) { // 检查是否已经过了5秒
					health -= 1; // 减少血量
					healthElement.innerText = '血量: ' + health; // 更新显示的血量

					if (health <= 0) {
                        alert("游戏结束")
						window.location.href = 'index.htm'; // 返回到 index.htm
					}

					lastHitTime = currentTime; // 更新上次扣血的时间

					player.classList.add('blinking'); // 开始闪烁
					setTimeout(function() {
						player.classList.remove('blinking'); // 5秒后停止闪烁
					}, 5000);
				}
			}
		}
	}
}

running()
doshow()
