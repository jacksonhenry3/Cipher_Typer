/* javascript goes here */
ab = document.getElementById("1");

ab.onclick = openClose

function openClose(){
	if (ab.className.indexOf("down") == -1)
	{
		ab.className += ' down'
	}

	else if (ab.className.indexOf("down") != -1)
	{
		ab.className = ab.className.replace(/ down/g, '')
	}
}