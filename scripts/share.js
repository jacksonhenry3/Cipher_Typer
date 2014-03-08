function share()
{
	url = document.getElementById('url')
	text = document.getElementById("english").value
	text =  "jacksonhenry3.github.io/cipherTyper/#"+text.replace(/ /g, '_');
	url.value = text
}