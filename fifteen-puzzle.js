var puzzle_list = []; /*存16个拼图块 pos代表它在拼图中的位置*/
var begin = false;/*是否开始游戏*/
var blank_pos = 15; /*存放空白块在的位置 初始值是15 即拼图的右下角*/
var clock; /*计时*/
var ifStop = false; /*游戏开始后的状态 暂停或正在进行*/
var timeCounter = 0; /*计时*/

window.onload = function()
{
	var puzzle = document.getElementById("the-puzzle");
	document.getElementById("start-button").onclick = start;
	for (var i = 0; i < 16; i++) {
		var puzzles = document.createElement("div");
		puzzle.appendChild(puzzles);
		puzzle_list.push(puzzles);
		puzzles.onclick = move;
	}
	initialize();
	document.onkeydown = keyevents;/*键盘输入*/
	getBlankPos();
	document.getElementById("stop-continue").onclick = currentstate;/*暂停或继续*/
}

function getBlankPos () /*获得空白块的位置*/
{
  for(var num = 0; num < 16; num++) 
  {
    if(puzzle_list[num].className == "blank")
    {
    	blank_pos = num;
    	break;
    }
  }
}

function initialize() 
{
  for (var i = 0; i <= 14; i++) 
  {
      puzzle_list[i].className = "puzzle-" + i;
  }
  puzzle_list[15].className = "blank";
  blank_pos = 15;
}

function start()
{
	begin = true;
	stop = false;
	this.innerText = "RESTART";
	random();
	clearInterval(clock);
	document.getElementById("show-time").innerText = "00:00:00";
	clock = window.setInterval(count, 1000);
	timeCounter = 0;
	document.getElementById("hide-div").className = "";
	document.getElementById("stop-continue").innerText = "STOP";
	ifStop = false;
}

function move(event)
{
	if(begin)
	{
		var num;
		getBlankPos();
		var thisOne = document.getElementsByClassName(this.className)[0];
		for(var i = 0; i < 16; i++) 
 	 {
  	  if(puzzle_list[i] == thisOne)
    	{
    		num = i;
    		break;
   	 }
  	}
		if(num - blank_pos == 1 || blank_pos - num == 1 || num - blank_pos == 4 || blank_pos - num == 4)/*判断是否相邻*/
		{
			if(num + 1 == blank_pos || num - 1 == blank_pos) 
			{
     		if(Math.floor(i/4) !== Math.floor(blank_pos / 4))
     		return false;
      }	
     	exchange(num); /*交换两个位置的类名*/
			win();
		}
	}
}

function win()
{
	if(begin)
	{
		for(var i = 0; i < 15; i++)
		{
			if(puzzle_list[i].className != "puzzle-" + i)
			{
				return;
			}
		}
		alert("You win!The time you used are " + timeCounter + "s");
		begin = false;
		stop = false;
		document.getElementById("button").innerText = "START";
	}
}

function keyevents(event)
{
	getBlankPos();
	if(ifStop == true || begin == false)
		return;
	var e = event || window.event || arguments.callee.caller.arguments[0];
	if(e.keyCode == 87 || e.keyCode == 38) // up-arrow or w
	{
		exchange(blank_pos + 4);
	}
	else if(e.keyCode == 83 || e.keyCode == 40) //down-arrow or s
	{
		exchange(blank_pos - 4);
	}
	else if(e.keyCode == 65 || e.keyCode == 37) //left-arrow or a
	{
		if(Math.floor((blank_pos + 1)/4) == Math.floor(blank_pos / 4))
   		exchange(blank_pos + 1);
	}
	else if(e.keyCode == 68 || e.keyCode == 39) //right-arrow or d
	{
		if(Math.floor((blank_pos - 1)/4) == Math.floor(blank_pos / 4))
			exchange(blank_pos - 1);
	}
	else
	{
		//
	}
	win();
}

function exchange(pos)
{
	if(pos < 0 || pos > 15) return;
	var temp = puzzle_list[blank_pos].className;
  puzzle_list[blank_pos].className = puzzle_list[pos].className;
  puzzle_list[pos].className = temp;
}

function random()
{
	puzzle_list[15].className = "blank";
	var list = new Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14);
	list = shuffle(list);
	for(var i = 0; i < 15; i++)
	{
		puzzle_list[i].className = "puzzle-" + list[i];
	}
	if(!canWin(list))
		random();
}


function shuffle(aArr) /*随机交换数组内各个位置的元素*/
{
	var iLength = aArr.length, i = iLength, mTemp, iRandom;
	while(i--)
	{
		if(i != (iRandom = Math.floor(Math.random() * iLength)))
		{
			mTemp = aArr[i];
			aArr[i] = aArr[iRandom];
			aArr[iRandom] = mTemp;
    }
  }
  return aArr;
}

function canWin(aArr) /*逆序对与初始状态相同为偶数即可获胜*/
{
	var inverseOrderPair = 0;
	for(var i = 0; i < 16; i++)
	{
		for(var j = i; j < 16; j++)
		{
			if(aArr[i] > aArr[j])
				inverseOrderPair++;
		}
	}
	if(inverseOrderPair === 0 || inverseOrderPair % 2 != 0)
		return false;
	else
		return true;
}

function count(element) /*计数*/
{
	timeCounter++;
	var h = Math.floor(timeCounter / 3600);
	var mins = Math.floor((timeCounter % 3600)/ 60);
	var secs = timeCounter % 60;
	document.getElementById("show-time").innerText = ((h < 10)?"0":"") + h + ((mins < 10)?":0":":") + mins + ((secs < 10)?":0":":") + secs;
}

function currentstate(element)/*暂停或继续*/
{
	if (ifStop == false && begin == true) 
	{
		ifStop = true;
		clearInterval(clock);
		document.getElementById("hide-div").className = "hide";
		document.getElementById("stop-continue").innerText = "GO ON";
	}
	else if( begin == true && ifStop == true)
	{
		ifStop = false;
		clock = window.setInterval(count, 1000);
		document.getElementById("hide-div").className = "";
		document.getElementById("stop-continue").innerText = "STOP";
	}
	else
	{
		alert("Before stop, you should start the game first");
	}
}