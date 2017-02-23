//TODO:
//Alert user when spelling error has occured!
//Add game component to this - maybe telling a story from Tarheel Reader and pick random words to spell
//Give ability to spell out a word
//Make a voice menu of possible commands
//Rewrite in React

//Pixi.js canvas elemnents
var app;
var style;
//Database
var db;
//Music
var backgroundMusic;
//Array
var word;
var soundArray;
//Strings
var prompt;
var text;
var keyValue;
//Integers
var points;
var wrongInc;
var fontInc;
var optionInc;
var soundInc;
var promptInc;
var spellingErrorAt;
//Booleans
var hasInput;
var hasMic;
var musicPause;
var loaded;
var choosingMode;
var keyPressed;
var gameOver;
var correct;
var incorrect;
//Speech synthesis
var utterance;
//Web browser
var isChrome = !!window.chrome && !!window.chrome.webstore;
//Update parameters for width, height, and font
var deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var deviceHeight = (window.innerHeight > 0) ? window.innerHeight : screen.height;

function displaySnackbar() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar")
    // Add the "show" class to DIV
    x.className = "show";
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

// Initialize Firebase
var config = {
	apiKey: "AIzaSyBQPqOMwkOwBF2pK2t1xLfkxh1SXQiUMyk",
	authDomain: "tenacious-typing.firebaseapp.com",
	databaseURL: "https://tenacious-typing.firebaseio.com",
	storageBucket: "tenacious-typing.appspot.com",
	messagingSenderId: "145496713404"
};
firebase.initializeApp(config);

// FirebaseUI config.
var uiConfig = {
	signInSuccessUrl: 'tenacious-typing.html',
	signInOptions: [
		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		firebase.auth.FacebookAuthProvider.PROVIDER_ID,
		//firebase.auth.TwitterAuthProvider.PROVIDER_ID,
		//firebase.auth.GithubAuthProvider.PROVIDER_ID,
		firebase.auth.EmailAuthProvider.PROVIDER_ID
	],
	// Terms of service url.
	tosUrl: '<your-tos-url>'
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

//var database = Firebase.database();

initApp = function() {
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			// User is signed in.
			var displayName = user.displayName;
			var email = user.email;
			var emailVerified = user.emailVerified;
			var photoURL = user.photoURL;
			var uid = user.uid;
			var providerData = user.providerData;

			db = firebase.database();

			var postsRef = db.ref().child("users");

			postsRef.push().set({
				uDisplayName: displayName,
				uEmail: email,
				uEmailVerified: emailVerified,
				uPhotoURL: photoURL,
				uUID: uid,
				uProviderData: providerData
			});

			$('#loginDescription').html("<span class = 'glyphicon glyphicon-user'></span> Welcome, " + displayName + "!");

			user.getToken().then(function(accessToken) {
				/*document.getElementById('sign-in-status').textContent = 'Signed in';
				document.getElementById('sign-in').textContent = 'Sign out';
				document.getElementById('account-details').textContent = JSON.stringify({
					displayName: displayName,
					email: email,
					emailVerified: emailVerified,
					photoURL: photoURL,
					uid: uid,
					accessToken: accessToken,
					providerData: providerData
				}, null, '  ');*/
			});
		} else {
			// User is signed out.
			/*document.getElementById('sign-in-status').textContent = 'Signed out';
			document.getElementById('sign-in').textContent = 'Sign in';
			document.getElementById('account-details').textContent = 'null';*/
		}
	}, function(error) {
		console.log(error);
	});
};

window.addEventListener('load', function() {
	initApp()
});

$('#signOutButton').on('click', function(event) {
	firebase.auth().signOut().then(function() {
		$('#loginDescription').html("<span class='glyphicon glyphicon-log-in'></span> Login");
		console.log('Signed Out');
	}, function(error) {
		console.error('Sign Out Error', error);
	});
});

function launchGame() {

	/*firebase.auth().signInWithPopup(provider).then(function(result) {
	  // This gives you a Google Access Token. You can use it to access the Google API.
	  var token = result.credential.accessToken;
	  // The signed-in user info.
	  var user = result.user;
	  // ...
	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
	  // ...
	});*/

	db = firebase.database();
	word = new Array();
	//Variables initialized to default values
	prompt = ["maze", "day", "fun"];
	points = 0;
	wrongInc = 0;
	fontInc = 0;
	optionInc = 0;
	soundInc = 0;
	promptInc = 0;
	//Booleans set to default false values
	hasMic = false;
	hasInput = false;
	musicPause = false;
	loaded = false;
	choosingMode = true;
	keyPressed = false;
	gameOver = false;
	correct = false;
	incorrect = false;
	//Speech synthesis initialized
	utterance = new SpeechSynthesisUtterance();
	utterance.rate = 3;
	utterance.volume = 1;

	$('#loginButton').on('click', function (event) {
		signInWithPopup();
	});

	$('#skipButton').on('click', function(event) {
		skipQuestion();
	});

	$('#muteButton').on('click', function(event) {
		muteMusic();
	});

	$('#resetButton').on('click', function(event) {
		resetGame();
	});

	//If using the Chrome browser, launches a equence of commands to initialize voice command software and listen for key words
	if (isChrome) {
		artyom.initialize({
			lang:"en-GB",
			continuous:true,
			debug:false,
			listen:true
		});

		artyom.addCommands({
			indexes:["Microphone"],
			action: function(i) {
					hasMic = true;
					artyom.say("Voice recognition mode activated");
			}
		});

		artyom.addCommands({
			indexes:["Restart"],
			action: function(i) {
					resetGame();
			}
		});

		artyom.addCommands({
			indexes:["Left"],
			action: function(i) {
					optionLeft();
			}
		});

		artyom.addCommands({
			indexes:["Right"],
			action: function(i) {
					optionRight();
			}
		});

		artyom.addCommands({
			indexes:["Play"],
			action: function(i) {
					choosingMode = false;
			}
		});

		artyom.addCommands({
			indexes:["Skip"],
			action: function(i) {
					artyom.say("Are you sure you want to skip this question?");
					artyom.addCommands({
						indexes:["Yes","Please"],
						action: function(i) {
								artyom.say("Skipping");
								skipQuestion();
						}
					});
			}
		});

		artyom.addCommands({
			indexes:["Mute"],
			action: function(i) {
					muteMusic();
					artyom.say("Muted");
			}
		});

		artyom.addCommands({
			indexes:["Play music"],
			action: function(i) {
					backgroundMusic.play();
					artyom.say("Playing");
			}
		});

		artyom.addCommands({
			indexes:["Microphone"],
			action: function(i) {
					hasMic = true;
					hasInput = true;
			}
		});
	}

	$('#unsupportedBrowser').fadeOut(10);

	computerSpeak("Loading");

	//*************************************PIXI**************************
	app = new PIXI.Application(deviceWidth, deviceHeight*0.88, {backgroundColor : 0x1099bb});
	document.body.appendChild(app.view);

	style = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: ['#ffffff', '#00ff99'], // gradient
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: 600
	});

	// create a new Sprite from an image path
	var logo = PIXI.Sprite.fromImage('../maze-day/media/logo-borderless.png');

	// center the sprite's anchor point
	logo.anchor.set(0.5);
	// move the sprite to the center of the screen
	logo.x = app.renderer.width / 2;
	logo.y = app.renderer.height / 2;
	app.stage.addChild(logo);

	// Listen for animate update
	app.ticker.add(function(delta) {
			// just for fun, let's rotate mr rabbit a little
			// delta is 1 if running at 100% performance
			// creates frame-independent tranformation
			logo.rotation += 0.1 / delta;
	});

	//Background music played on loop with queue for other game sounds
	backgroundMusic = new Howl({

		src: ["media/background.wav"],
		loop: true,
		volume: 0.2,
		onload: function() {

			//Game resources loaded
			app.stage.removeChild(logo);
			//Loads Google fonts before initiating
			window.WebFontConfig = {
			    google: {
			        families: ['Snippet', 'Arvo:700italic', 'Podkova:700']
			    },

			    active: function() {
			        // do something
			        init();
			    }
			};

			(function() {
			    var wf = document.createElement('script');
			    wf.src = ('https:' === document.location.protocol ? 'https' : 'http') +
			        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
			    wf.type = 'text/javascript';
			    wf.async = 'true';
			    var s = document.getElementsByTagName('script')[0];
			    s.parentNode.insertBefore(wf, s);
			})();

			function init()
			{
			    PIXI.loader
			        .load(onAssetsLoaded);

			    function onAssetsLoaded() {
			        var bitmapFontText = new PIXI.extras.BitmapText('bitmap fonts are\n now supported!', { font: '35px Desyrel', align: 'right' });
			        bitmapFontText.x = app.renderer.width - bitmapFontText.textWidth - 20;
			        bitmapFontText.y = 20;
			        app.stage.addChild(bitmapFontText);
			    }

			    // Adds a background image
			    var background = PIXI.Sprite.fromImage('../maze-day/media/backgroundPic.jpg');
			    background.width = app.renderer.width;
			    background.height = app.renderer.height;
			    app.stage.addChild(background);

			    // Creating text sprites to be displayed on the PIXI canvas
					var scoreText = new PIXI.Text('Score: 0', {
						fontWeight: 'bold',
						fontFamily: 'Snippet',
						fontSize: 35,
						fill: '#cc00ff',
						align: 'left',
						stroke: '#FFFFFF',
						strokeThickness: 6
			    });
			    var mainText = new PIXI.Text('Welcome to Tenacious Typing!', {
			        fontWeight: 'bold',
			        fontFamily: 'Arial',
							fontSize: 60,
			        fill: '#cc00ff',
			        align: 'center',
			        stroke: '#FFFFFF',
			        strokeThickness: 6
			    });
					var correctText = new PIXI.Text('', {
						fontWeight: 'bold',
						fontFamily: 'Arial',
						fontSize: 60,
						fill: '#00ff00',
						align: 'center',
						stroke: '#FFFFFF',
						strokeThickness: 6
			    });
					var incorrectText = new PIXI.Text('', {
						fontWeight: 'bold',
						fontFamily: 'Arial',
						fontSize: 60,
						fill: '#ff0000',
						align: 'center',
						stroke: '#FFFFFF',
						strokeThickness: 6
			    });
					var firstText = new PIXI.Text('Select your game mode:', {
						fontWeight: 'bold',
						fontFamily: 'Snippet',
						fontSize: 35,
						fill: '#cc00ff',
						align: 'left',
						stroke: '#FFFFFF',
						strokeThickness: 6
			    });
					var secondText = new PIXI.Text('Spelling Mode', {
						fontWeight: 'bold',
						fontFamily: 'Snippet',
						fontSize: 35,
						fill: '#cc00ff',
						align: 'left',
						stroke: '#FFFFFF',
						strokeThickness: 6
			    });
					var thirdText = new PIXI.Text('Press enter to begin!', {
						fontWeight: 'bold',
						fontFamily: 'Snippet',
						fontSize: 35,
						fill: '#cc00ff',
						align: 'left',
						stroke: '#FFFFFF',
						strokeThickness: 6
			    });

					scoreText.position.set(20);

					// Setting the anchor point to 0.5 to center align the text
			    mainText.anchor.set(0.5);
			    mainText.x = app.renderer.width / 2;
			    mainText.y = app.renderer.height / 2 * .5;

					//correctText.anchor.set(0.5);
			    correctText.x = app.renderer.width / 2;
			    correctText.y = app.renderer.height / 2;

					//incorrectText.anchor.set(0.5);
			    incorrectText.x = app.renderer.width / 2;
			    incorrectText.y = app.renderer.height / 2;

					firstText.anchor.set(0.5);
			    firstText.x = app.renderer.width / 2;
			    firstText.y = app.renderer.height / 2;

					//If optionInc == 0, spelling, else if 1, guided
					secondText.anchor.set(0.5);
			    secondText.x = app.renderer.width / 2;
			    secondText.y = app.renderer.height / 2 * 1.25;

					thirdText.anchor.set(0.5);
			    thirdText.x = app.renderer.width / 2;
			    thirdText.y = app.renderer.height / 2 * 1.5;

					app.stage.addChild(scoreText, mainText, correctText, incorrectText, firstText, secondText, thirdText);

			    app.ticker.add(function() {

			        // update the text with a new string
			        scoreText.text = 'Score: ' + points;
							//mainText.fontSize += 1;
			        // let's spin the spinning text
			        //mainText.rotation += 0.03;

							if (gameOver) {
								mainText.setText("Awesome, you win!");
								firstText.setText("Wanna play again? Press enter!");
							}

							else if (correct) {
								mainText.setText("Good job!");
							}

							else if (incorrect) {
								mainText.setText("Please try again!");
							}

							else if (!choosingMode) {
								mainText.setText("Please spell: " + "\"" + getPrompt() + "\"");
								firstText.setText("");

								if (spellingErrorAt != null) {
									correctText.setText(word.join("").substring(0, spellingErrorAt));
									incorrectText.setText(word.join(""));
								}
								else {
									correctText.setText(word.join(""));
									incorrectText.setText("");
								}
								secondText.setText("");
								thirdText.setText("");
							}
			    });
			}

			loaded = true;
			playWelcome();
		},
		onplay: function() {

			musicPause = false;
		},
		onpause: function() {

			musicPause = true;
		}
	});

	backgroundMusic.play();
}

function computerSpeak(toSay) {
	if (isChrome) {
		artyom.say(toSay);
	}
	else {
		window.speechSynthesis.speak(new SpeechSynthesisUtterance(toSay));
	}
}

function muteMusic() {
	if (musicPause == true) {
		backgroundMusic.play();
	}
	else {
		backgroundMusic.pause();
	}
}

function selectMode(optionInc) {
	if (optionInc == 1) {
		//Method: lets you continue to type, even if you are wrong
		//loadSpell();
	}
	else {
		//Method: if wrong, prevents you from typing further
		//loadGuided();
	}
}

function optionLeft() {
	if (optionInc != 0) {
		optionInc--;
	}
}

function optionRight() {
	if (optionInc != 1) {
		optionInc++;
	}
}

function playWelcome() {
	var sound = new Howl({
		src: ["media/welcome.mp3"],
		volume: 1
	});
	sound.play();

	/*computerSpeak("Do you have a microphone? Say yeah if you do, or press enter if you don't.");
	if (isChrome) {
		setTimeout(function() {
			choosingMode = false;
		}, 5000);
	}*/
}

function playPrompt() {
	var sound = new Howl({
		src: ["media/prompt.mp3"],
		volume: 1,
		onend: function() {
			computerSpeak(prompt[promptInc]);
		}
	});
	sound.play();
}

function playGood() {
	var sound = new Howl({
		src: ["media/good.mp3"],
		volume: 1,
		onend: function() {
			nextPrompt();
		}
	});

	sound.play();
}

function skipQuestion() {
	if (!choosingMode) {
		nextPrompt();
	}
}

function nextPrompt() {
	if (getPoints() >= (prompt.length * 10)) {
		//return winGame();
	}

	promptInc++;

	if (promptInc == prompt.length) {
		//return winGame();
	}

	playPrompt();
}

function getPrompt() {
	return prompt[promptInc];
}

function addPoints() {
	points += 10;
}

function getPoints() {
	return points;
}

function speakPoints() {
	computerSpeak("You have " + points + " points.");
}

function checkAnswer() {

	computerSpeak(word.join(""));

	if (getPrompt().toLowerCase() == word.join("")) {

		addPoints();
		correct = true;

		setTimeout(function() {
			correct = false;
		}, 3000);

		playGood();
		return;
	}

	incorrect = true;

	setTimeout(function() {
		incorrect = false;
	}, 1500);

	wrongInc++;

	if (wrongInc == 5) {
		computerSpeak("Remember: you can skip this question by saying skip.");
	}

	else {
		computerSpeak("try again");
	}
}

function winGame() {
	gameOver = true;
	computerSpeak("Awesome, you win! Press or say enter to play again.");
}

function resetGame() {
	backgroundMusic.stop();
	launchGame();
}

window.onkeydown = function(e) {

	keyValue = "";

	if (keyPressed) {
		return;
	}

	keyPressed = true;

	if (e.keyCode == 8) {
		keyValue = "backspace";
	}

	else if (e.keyCode == 13) {
		if (choosingMode) {
			choosingMode = false;
			playPrompt();
		}

		else if (gameOver) {
			return resetGame();
		}

		else {
			keyValue = "enter";
		}
	}

	else if (e.keyCode == 16) {
		keyValue = "shift";
	}

	else if (e.keyCode == 32) {
		keyValue = "space";
	}

	else if (e.keyCode == 37) {
		keyValue = "left";

		if (choosingMode) {
			optionLeft();
		}
	}

	else if (e.keyCode == 38) {
		keyValue = "up";
	}

	else if (e.keyCode == 39) {
		keyValue = "right";

		if (choosingMode) {
			optionRight();
		}
	}

	else if (e.keyCode == 40) {
		keyValue = "down";
	}

	else if (e.keyCode == 48) {//1
		//keyValue = "0";
		computerSpeak("Voice control menu: Say mute to mute the music, say skip to skip a question, say restart to restart the game");
	}

	else if (e.keyCode == 49) {//2
		//keyValue = "1";
		return speakPrompt();
	}

	else if (e.keyCode == 50) {
		//keyValue  = "2";
		return speakPoints();
	}

	else if (e.keyCode == 57) {
		//keyValue = "9";
		computerSpeak("Keyboard control menu: Press 1 to heat the prompt, press 2 to skip a question, press 3 to restart the game.");
	}

	/*else if (keyValue.length == 0) {

		keyValue = "";
	}*/

	else {
		keyValue = String.fromCharCode(event.keyCode).toLowerCase();// Converts Unicode value into a character
	}

	if (keyValue != "") {
		computerSpeak(keyValue);
	}

	wordMaker(keyValue);
}

function wordMaker(newKeyValue) {

	if (newKeyValue == "enter") {
		checkAnswer();
		word = new Array();
		return;
	}

	if (newKeyValue == "backspace") {
		word.pop();
		return;
	}

	if (newKeyValue == "space") {
		newKeyValue = " ";
	}

	if (newKeyValue.length != 1) {
		return;
	}

	word[word.length] = newKeyValue;

	if (word.length < spellingErrorAt+1) {
		spellingErrorAt = null;
	}

	if ((spellingErrorAt != null) && (word[spellingErrorAt] == getPrompt().charAt(spellingErrorAt))) {
		spellingErrorAt = null;
	}

	else if ((spellingErrorAt != null) && (word[spellingErrorAt] != getPrompt().charAt(spellingErrorAt))) {
		return;
	}

	else if (word[word.length-1] != getPrompt().charAt(word.length-1).toLowerCase()) {
		spellingErrorAt = (word.length-1);
		computerSpeak("Spelling error at location " + spellingErrorAt);
	}

	else {
		return;
	}
}

window.onkeyup = function() {
	keyPressed = false;
}
