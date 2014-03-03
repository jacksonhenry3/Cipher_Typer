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