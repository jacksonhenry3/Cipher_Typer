function openClose(el){
	console.log(el)
	el = document.getElementById(el)
	if (el.className.indexOf("down") == -1)
	{
		el.className += ' down'
	}

	else if (el.className.indexOf("down") != -1)
	{
		el.className = el.className.replace(/ down/g, '')
	}
}

function shiftClick()
{
	n = parseInt(document.getElementById('n').value)
	changeCipher(shiftCipher(n),'encode')
	shiftText = "<h2>Caesar cipher</h2><p>In cryptography, a Caesar cipher, also known as Caesar's cipher, the shift cipher, Caesar's code or Caesar shift, is one of the simplest and most widely known encryption techniques. It is a type of substitution cipher in which each letter in the plaintext is replaced by a letter some fixed number of positions down the alphabet.</p>"
	document.getElementById('cipherDesc').innerHTML = shiftText
}

function morseClick()
{
	changeCipher(englishToMorse,'encode')
	morseText = "<h2>Morse Code</h2><p>Morse code is a method of transmitting text information as a series of on-off tones, lights, or clicks that can be directly understood by a skilled listener or observer without special equipment<a href = 'http://en.wikipedia.org/wiki/Morse_code'>...</a></p>"
	document.getElementById('cipherDesc').innerHTML = morseText
}