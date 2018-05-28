window.onload = function()
{
	var like = document.getElementById("like-button");
	var unlike = document.getElementById("unlike-button");
	like.onclick = show;
	unlike.onmousedown = convert;
	unlike.onmouseup = back;
	unlike.onmouseover = change;
	unlike.ontouchstart = change;
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

function convert()
{
	var unlike = document.getElementById("unlike-button");
	unlike.innerText = "喜欢";
}

function back()
{
	var unlike = document.getElementById("unlike-button");
	unlike.innerText = "不喜欢";
}

window.onunload = function() 
{ 
	alert("哼"); 
}