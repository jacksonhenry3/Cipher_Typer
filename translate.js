window.addEventListener('load', init, false);

function init() {
	try {
	// Fix up for prefixing
	window.AudioContext = window.AudioContext||window.webkitAudioContext;
		context = new AudioContext();
	}
	catch(e) {
		alert('Sorry, your browser doesnt support the "play" button :(');
	}

	initial_val = document.getElementById("english").value
	if (window.location.hash !='')
	{
		initial_val = window.location.hash.replace('#','').replace(/_/g, ' ').replace(/%0A/g, '\n');
		document.getElementById("english").value = initial_val
	}

	window.currentCipher = englishToMorse

	listenForChanges(currentCipher,'encode')
}


function listenForChanges(cipher,direction){
	window.iterator =setInterval(function(){displayResult(cipher,direction)},50);
}

function changeCipher(cipher,direction){
	window.clearInterval(window.iterator)
	listenForChanges(cipher,direction)
}

// ----- ciphers -----
	// predifined library of english characters
	english = [" ", "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","1","2","3","4","5","6","7","8","9","0","`","-","=","~","!","@","#","$","%","^","&","*","(",")","_","+","[","]","\\","{","}","|",";","'","\"",",",".","/","<",">","?"]

	// Proceaduraly generated ciphers
		function shiftCipher(n)
		{
			newCipher = {}
			l = english.length
			for (var i = 0; i < l; i++) {
				newCipher[english[i]] = english[(i+n)%l]
			};

			return(newCipher)
		};

	// predefined ciphers
	englishToMorse = {" ":"\\ ","A":".- ","B":"-... ","C":"-.-. ","D":"-.. ","E":". ","F":"..-. ","G":"--. ","H":".... ","I":".. ","J":".--- ","K":"-.- ","L":".-.. ","M":"-- ","N":"-. ","O":"--- ","P":".--. ","Q":"--.- ","R":".-. ","S":"... ","T":"- ","U":"..- ","V":"...- ","W":".-- ","X":"-..- ","Y":"-.-- ","Z":"--.. ","0":"----- ","1":".---- ","2":"..--- ","3":"...-- ","4":"....- ","5":"..... ","6":"-.... ","7":"--... ","8":"---.. ","9":"----. ",".":".-.-.- ", ",":"--..-- ",":":"---... ","?":"..--.. ","'":".----. ","-":"-....- ","/":"-..-. ","|":"-.--.- ","\"":".-..-. ","@":".--.-. ","=":"-...- ","\n":"\n ","!":"!"};

	function invertCipher(cipher)
	{
		inverse = {}
		for(var letter in cipher){
			inverse[cipher[letter]] = letter;
		}

		return(inverse)
	}


// shows the results in the output box
function displayResult(cipher,direction)
{	
	if (direction === 'encode') {
		text = document.getElementById("english").value
		code = ''
		window.location.hash = "#"+text.replace(/ /g, '_');
		text =  text.toUpperCase()
		for (var i = 0; i < text.length; i++) {
			code = code+cipher[text[i]]
		};
		document.getElementById("code").value = code
	};

	if (direction === 'decode') {

		cipher = invertCipher(cipher)
		text = document.getElementById("code").value
		english = ''
		text =  text.toUpperCase()
		for (var i = 0; i < text.length; i++) {
			english = english+cipher[text[i]]
		};
		document.getElementById("english").value = english
		window.location.hash = "#"+english.replace(/ /g, '_');
	};
};


// ----- functions to listen to morse code -----
	// function to play a tone
	function note(start,length,freq){
		oscillator = context.createOscillator();
		oscillator.frequency.value = freq;
		oscillator.connect(context.destination);
		oscillator.start(start);
		oscillator.stop(start+length)
		}

	//this function will play morse code as audio
	function listen(){
		var listenButton = document.getElementById("listenButton");
		if (listenButton.innerHTML == 'Listen'){
			document.getElementById("listenButton").innerHTML = 'playing';
			Morse = document.getElementById("code").value
			Begining = context.currentTime;
			n=1
			for (var i = 0; i < Morse.length; i++) {
				if (Morse[i] === '.')
				{
					note(Begining+i*.13*n,.03*n,440)
				};
				if (Morse[i] === '-')
				{
					note(Begining+i*.13*n,.09*n,440)
				};
				if (Morse[i] === ' ')
				{
					note(Begining+i*.13*n,.03*n,0)
				};
				if (Morse[i] === '\\')
				{
					note(Begining+i*.1*n,.09*n,0)
				};
			};
			window.setTimeout(function(){document.getElementById("listen").innerHTML = 'Listen'},Morse.length*.13*n*1000)
			}
		}


setInterval(
	function()
	{
		var textBox = document.getElementById ("english");
			if (textBox.addEventListener) {
			textBox.addEventListener
				(
					"DOMActivate",
					function(){changeCipher(window.currentCipher,'encode')},
					false
				);
		}

		
			var textBox = document.getElementById ("code");
			if (textBox.addEventListener) 
			{
				textBox.addEventListener 
					(
						"DOMActivate", 
						function(){changeCipher(window.currentCipher,'decode')},
		 				false
		 			);
			}
	},
	100
)