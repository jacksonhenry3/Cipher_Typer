
	englishToMorse = {" ":"\\","A":".-","B":"-...","C":"-.-.","D":"-..","E":".","F":"..-.","G":"--.","H":"....","I":"..","J":".---","K":"-.-","L":".-..","M":"--","N":"-.","O":"---","P":".--.","Q":"--.-","R":".-.","S":"...","T":"-","U":"..-","V":"...-","W":".--","X":"-..-","Y":"-.--","Z":"--..","0":"-----","1":".----","2":"..---","3":"...--","4":"....-","5":".....","6":"-....","7":"--...","8":"---..","9":"----.",".":".-.-.-",",":"--..--",":":"---...","?":"..--..","'":".----.","-":"-....-","/":"-..-.","|":"-.--.-","\"":".-..-.","@":".--.-.","=":"-...-","\n":"\n","!":"!"};

	var morseToEnglish = {};
	for(var letter in englishToMorse){
		morseToEnglish[englishToMorse[letter]] = letter;
	}

	function displayResult()
	{
		a = document.getElementById("englishToMorse").value
		if (window.location.hash !='')
		{
			a = window.location.hash.replace('#','');
			document.getElementById("englishToMorse").value = a
		}
		b = ''
		a =  a.toUpperCase()
		for (var i = 0; i < a.length; i++) {
			b = b+englishToMorse[a[i]]+' '
		};
		document.getElementById("morseToEnglish").innerHTML = b
	};
	setInterval(displayResult,50);
	
	var context;
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
	}


	
	
	function note(start,length,freq){
		oscillator = context.createOscillator();
		gainNode = context.createGainNode();
		oscillator.frequency.value = freq;
		oscillator.connect(gainNode);
		oscillator.connect(context.destination);

		oscillator.start(start);
		oscillator.stop(start+length)
		}

	function listen(){
		var listenButton = document.getElementById("listen");
		if (listenButton.innerHTML == 'Listen'){
			document.getElementById("listen").innerHTML = 'playing';
			Morse = document.getElementById("morseToEnglish").innerHTML
			Begining = context.currentTime;
			n=1
			for (var i = 0; i < Morse.length; i++) {
				if (Morse[i] === '.')
				{
					note(Begining+i*.09*n,.03*n,700)
				};
				if (Morse[i] === '-')
				{
					note(Begining+i*.09*n,.09*n,700)
				};
				if (Morse[i] === ' ')
				{
					note(Begining+i*.09*n,.03*n,0)
				};
				if (Morse[i] === '\\')
				{
					note(Begining+i*.09*n,.09*n,0)
				};
			};
			window.setTimeout(function(){document.getElementById("listen").innerHTML = 'Listen'},Morse.length*.09*n*1000)
			}
		}
	





// http://patorjk.com/blog/2012/07/22/tone-playing-experiment-with-html5s-web-audio-api/



 // function Init () {
 //        var textBox = document.getElementById ("englishToMorse");
 //        if (textBox.addEventListener) {
 //            textBox.addEventListener ("DOMActivate", function(){Morse_id = setInterval(translateToMorse,50)}, false);
 //        }

 //        var textBox = document.getElementById ("morseToEnglish");
 //        if (textBox.addEventListener) {
 //            textBox.addEventListener ("DOMActivate", function(){setInterval(translateToEnglish,50)}, false);
 //        }
 //    }