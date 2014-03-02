/* javascript goes here */
a = document.getElementById("1");

b = document.getElementById("a");

a.onclick = function(){openClose(a)}
b.onclick = function(){openClose(b)}

function openClose(el){
	if (el.className.indexOf("down") == -1)
	{
		el.className += ' down'
	}

	else if (el.className.indexOf("down") != -1)
	{
		el.className = el.className.replace(/ down/g, '')
	}
}