window.onload = function()
{
	var like = document.getElementById("like-button");
	var unlike = document.getElementById("unlike-button");
	like.onclick = show;
	unlike.onmouseover = change;
}

function show()
{
	alert("我也喜欢你呀(๑′ᴗ‵๑)");
}

function change()
{
	var unlike = document.getElementById("unlike-button");
	var x = String(parseInt(Math.random() * (document.body.clientWidth - 90))) + "px";
	var y = String(parseInt(Math.random() * (document.body.clientHeight - 25))) + "px";
	unlike.style.position = "relative";
	unlike.style.left = x;
	unlike.style.top = y;
}


window.onbeforeunload = function(event) 
{ 
	alert("哼"); 
}