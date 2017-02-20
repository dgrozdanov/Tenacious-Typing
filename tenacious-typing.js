//TODO:
//Alert user when spelling error has occured!
//Add game component to this - maybe telling a story from Tarheel Reader and pick random words to spell
//Give ability to spell out a word
//Make a voice menu of possible commands
//Rewrite in React

//Pixi.js canvas elemnents
var app;
var style;
//database
var db;
//Music
var backgroundMusic;
//Array
var word;
var soundArray;
//Strings
var prompt;
var text;
var letter;
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
//Update parameters for width, height, and font
var deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var deviceHeight = (window.innerHeight > 0) ? window.innerHeight : screen.height;
var primaryFont = (deviceWidth/1920 * 50);//As a ratio of 50px font on 1920 screen
var secondaryFont = (deviceWidth/1920 * 25);//As a ratio of 25px font on 1920 screen
var mediumFont = (deviceWidth/1920 * 75);//As a ratio of 25px font on 1920 screen
var largeFont = (deviceWidth/1920 * 100);//As a ratio of 100px font on 1920 screen
var superFont = (deviceWidth/1920 * 200);//As a ratio of 200px font on 1920 screen
var canvasWidth = deviceWidth;//100% of screen width
var canvasHeight = deviceHeight*.6;//75% of screen height

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
		// Leave the lines as is for the providers you want to offer your users.
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

			/*function writeUserData(userId, name, email, imageUrl) {
				firebase.database().ref('users/' + userId).set({
					username: displayName,
					email: email,
					profile_picture : photoUrl,
					uid: uid
				});
			}*/

			db = firebase.database();

			var postsRef = db.ref().child("users");

			/*var newPostRef = postsRef.push();
			newPostRef.set({
				uDisplayName: displayName,
				uEmail: email,
				uEmailVerified: emailVerified,
				uPhotoURL: photoURL,
				uUID: uid,
				uProviderData: providerData
			});*/

			// we can also chain the two calls together
			postsRef.push().set({
				uDisplayName: displayName,
				uEmail: email,
				uEmailVerified: emailVerified,
				uPhotoURL: photoURL,
				uUID: uid,
				uProviderData: providerData
			});

			/*firebase.database().ref('/users').set({
				"name": displayName,
				"email": email,
				"uid": uid
			});*/

			/*$.post('loginInfo.php', {variable: displayName});
			$.post('loginInfo.php', {variable: email});
			$.post('loginInfo.php', {variable: uid});*/

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
		console.log('Signed Out');
	}, function(error) {
		console.error('Sign Out Error', error);
	});
});
$('#loginDescription').html("<span class='glyphicon glyphicon-log-in'></span> Login");

/*var firebase = require('firebase');
var firebaseui = require('firebaseui');

var provider = new firebase.auth.GoogleAuthProvider();*/

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

	//document.getElementById("splashImage").width = deviceWidth*.98;
	//document.getElementById("splashImage").height = deviceHeight*.8;
	//document.getElementById("navImage").width = deviceWidth*.05;
	//document.getElementById("navImage").height = deviceHeight*.05;
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

	$('form').on('submit', function (e) {

		e.preventDefault();//Prevents the webpage from reloading

		$.ajax({
			type: 'POST',
			url: 'user-comment.php',//PHP form validation link
			data: $('form').serialize(),
			success: function () {
				alert('You have successfully submitted your comment!');//If PHP form successfully submitted, this alert statement will execute
			}
		});
	});

	//Sequence of commands to launch voice command software and listen for key words
	artyom.initialize({

		lang:"en-GB",
		continuous:true,
		debug:false,
		listen:true
	});
/*
	artyom.addCommands({
		{
			indexes:["New York","Big Apple","NYC"],
			action: function(i) {

					artyom.say("I love New York");
			}
		}
		{
			indexes:["Boston"],
			action: function(i) {

					artyom.say("I love Boston");
			}
		}
		{
			indexes:["Houston"],
			action: function(i) {

					artyom.say("I love Houston");
			}
		}
	});
*/

artyom.addCommands({

	indexes:["Microphone"],
	action: function(i) {

			hasMic = true;
			artyom.say("Voice recognition mode selected");
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


			//	artyom.say("Skipping");
			//	skipQuestion();
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

	artyom.say("Loading");

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

		src: ["media/TTTheme.wav"],
		loop: true,
		volume: 0.2,
		onload: function() {

			//Game canvas loaded, launching the game
			$('#splashScreen').fadeOut(10);

			app.stage.removeChild(logo);

			var gameText = new PIXI.Text('Welcome to Tenacious Typing!', style);
			gameText.x = canvasWidth/2;
			gameText.y = canvasHeight/2;
			//app.stage.addChild(gameText);

			//****************************

			// // Load them google fonts before starting...!
			window.WebFontConfig = {
			    google: {
			        families: ['Snippet', 'Arvo:700italic', 'Podkova:700']
			    },

			    active: function() {
			        // do something
			        init();
			    }
			};

			// include the web-font loader script
			/* jshint ignore:start */
			(function() {
			    var wf = document.createElement('script');
			    wf.src = ('https:' === document.location.protocol ? 'https' : 'http') +
			        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
			    wf.type = 'text/javascript';
			    wf.async = 'true';
			    var s = document.getElementsByTagName('script')[0];
			    s.parentNode.insertBefore(wf, s);
			})();
			/* jshint ignore:end */

			function init()
			{
			    PIXI.loader
			        //.add('desyrel', 'required/assets/desyrel.xml')
			        .load(onAssetsLoaded);

			    function onAssetsLoaded() {
			        var bitmapFontText = new PIXI.extras.BitmapText('bitmap fonts are\n now supported!', { font: '35px Desyrel', align: 'right' });

			        bitmapFontText.x = app.renderer.width - bitmapFontText.textWidth - 20;
			        bitmapFontText.y = 20;

			        app.stage.addChild(bitmapFontText);
			    }

			    // add a shiny background...
			    var background = PIXI.Sprite.fromImage('../maze-day/media/backgroundPic.jpg');
			    background.width = app.renderer.width;
			    background.height = app.renderer.height;
			    app.stage.addChild(background);

			    // create a text object with a nice stroke
			    var spinningText = new PIXI.Text('Welcome to Tenacious Typing!', {
			        fontWeight: 'bold',
			        fontFamily: 'Arial',
							fontSize: 60,
			        fill: '#cc00ff',
			        align: 'center',
			        stroke: '#FFFFFF',
			        strokeThickness: 6
			    });

			    // create a text object that will be updated...
			    var countingText = new PIXI.Text('Score: 0', {
						fontWeight: 'bold',
						fontFamily: 'Snippet',
						fontSize: 35,
						fill: '#cc00ff',
						align: 'left',
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

					// setting the anchor point to 0.5 will center align the text... great for spinning!
			    spinningText.anchor.set(0.5);
			    spinningText.x = app.renderer.width / 2;
			    spinningText.y = app.renderer.height / 2 * .5;

					countingText.position.set(20);

					firstText.anchor.set(0.5);
			    firstText.x = app.renderer.width / 2;
			    firstText.y = app.renderer.height / 2;

					secondText.anchor.set(0.5);
			    secondText.x = app.renderer.width / 2;
			    secondText.y = app.renderer.height / 2 * 1.25;

					thirdText.anchor.set(0.5);
			    thirdText.x = app.renderer.width / 2;
			    thirdText.y = app.renderer.height / 2 * 1.5;

					app.stage.addChild(spinningText, countingText, firstText, secondText, thirdText);

			    app.ticker.add(function() {

			        // update the text with a new string
			        countingText.text = 'Score: ' + points;

							//spinningText.fontSize += 1;

			        // let's spin the spinning text
			        //spinningText.rotation += 0.03;


							/*if (choosingMode) {

								spinningText = "Welcome to Tenacious Typing!";


								ctx.fillText("Select your game mode:", canvasWidth/2, canvasHeight/2);

								if (optionInc == 0) {

									ctx.fillText("Spelling", canvasWidth/2, canvasHeight/2 + 2*primaryFont);
								}

								else {

									ctx.fillText("Guided", canvasWidth/2, canvasHeight/2 + 2*primaryFont);
								}

								ctx.fillText("Press enter to start!", canvasWidth/2, canvasHeight/2 + 5*primaryFont);
							}

							else if (gameOver) {

								if (fontInc % 2 == 0) {

									ctx.font = "bold " + mediumFont + "px Arial";
								}

								else if (fontInc % 2 == 1) {

									ctx.font = "bold " + primaryFont + "px Arial";
								}

								fontInc++;

								ctx.fillText("Awesome, you win!", canvasWidth/2, canvasHeight/2 - 3*primaryFont);
								ctx.font = primaryFont + "px Arial";
								ctx.fillText("Wanna play again? Press enter!", canvasWidth/2, canvasHeight/2);
							}

							else {

								ctx.font = superFont + "px Arial";

								if (correct) {

									text = "Good job!";
								}

								else {

									instruction = "Your word is";
									text = "\"" + getPrompt() + "\"";
								}

								ctx.fillText(instruction, canvasWidth/2, canvasHeight/2);
								ctx.fillText(text, canvasWidth/2, canvasHeight/2 + superFont);

								if (incorrect) {

									ctx.fillStyle = "red";
									ctx.fillText("try again", canvasWidth/2, canvasHeight/2 + superFont*2);
								}

								if (spellingErrorAt != null) {

									var correctPart = word.join("").substring(0, spellingErrorAt);

									ctx.fillStyle = "green";
									ctx.fillText(correctPart, canvasWidth/2, canvasHeight/2 + superFont*2);

									var incorrectPartOffset = ctx.measureText(correctPart).width;

									var incorrectPart = word.join("").substring(spellingErrorAt, word.join("").length);

									ctx.textAlign = "left";

									ctx.fillStyle = "red";
									ctx.fillText(incorrectPart, canvasWidth/2 + incorrectPartOffset, canvasHeight/2 + superFont*2);
								}

								else {

									ctx.fillStyle = "green";
									ctx.fillText(word.join(""), canvasWidth/2, canvasHeight/2 + superFont*1.5);
								}

								ctx.font = largeFont + "px Arial";
								ctx.fillStyle = "white";
								ctx.textAlign = "left";
								ctx.fillText("Score: " + points + "/30", canvasWidth*.03, canvasHeight*.14);
							}*/
			    });
			}

			//****************************


			loaded = true;
			//gameMap.start();
			//updateGameMap();
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

	//artyom.say("Do you have a microphone? Say yeah if you do, or press enter if you don't.");



	/*setTimeout(function() {

		choosingMode = false;
	}, 5000);*/
}

function playPrompt() {

	var sound = new Howl({

		src: ["media/prompt.mp3"],
		volume: 1,
		onend: function() {

			var utterancePrompt = new SpeechSynthesisUtterance(prompt[promptInc]);
			window.speechSynthesis.speak(utterancePrompt);
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
	//updateGameMap();
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

	//return updateGameMap();
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

	utteranceStatus = new SpeechSynthesisUtterance("You have " + points + " points.");
	window.speechSynthesis.speak(utteranceStatus);
}

function checkAnswer() {

	//document.getElementById("gameInput").value = "";

	var utteranceWord = new SpeechSynthesisUtterance(word.join(""));

	window.speechSynthesis.speak(utteranceWord);

	if (getPrompt() == word.join("")) {

		addPoints();
		correct = true;

		setTimeout(function() {

			correct = false;
			updateGameMap();
		}, 3000);

		playGood();
		return updateGameMap();
	}

	incorrect = true;

	setTimeout(function() {

		incorrect = false;
		updateGameMap();
	}, 1500);

	wrongInc++;

	if (wrongInc == 5) {

		var utteranceStatus = new SpeechSynthesisUtterance("Remember: you can skip this question by saying skip.");
		window.speechSynthesis.speak(utteranceStatus);
	}

	else {

		var utteranceStatus = new SpeechSynthesisUtterance("try again");
		window.speechSynthesis.speak(utteranceStatus);
	}
}

function winGame() {

	gameOver = true;
	updateGameMap();

	utteranceWin = new SpeechSynthesisUtterance("Awesome, you win! Press or say enter to play again.");
	window.speechSynthesis.speak(utteranceWin);
}

function resetGame() {

		backgroundMusic.stop();
		launchGame();
}

window.onkeydown = function(e) {

	letter = "";

	if (keyPressed) {

		return;
	}

	keyPressed = true;

	if (e.keyCode == 8) {

		letter = "backspace";
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

			letter = "enter";
		}
	}

	else if (e.keyCode == 16) {

		letter = "shift";
	}

	else if (e.keyCode == 32) {

		letter = "space";
	}

	else if (e.keyCode == 37) {

		letter = "left";

		if (choosingMode) {

			optionLeft();
		}
	}

	else if (e.keyCode == 38) {

		letter = "up";
	}

	else if (e.keyCode == 39) {

		letter = "right";

		if (choosingMode) {

			optionRight();
		}
	}

	else if (e.keyCode == 40) {

		letter = "down";
	}

	else if (e.keyCode == 48) {

		//letter = "0";
		artyom.say("Voice control menu: Say mute to mute the music, say skip to skip a question, say restart to restart the game");
	}

	else if (e.keyCode == 49) {

		//letter = "1";
		return speakPrompt();
	}

	else if (e.keyCode == 50) {

		//letter  = "2";
		return speakPoints();
	}

	else if (e.keyCode == 51) {

		letter = "3";
	}

	else if (e.keyCode == 52) {

		letter = "4";
	}

	else if (e.keyCode == 53) {

		letter = "5";
	}

	else if (e.keyCode == 54) {

		letter = "6";
	}

	else if (e.keyCode == 55) {

		letter = "7";
	}

	else if (e.keyCode == 56) {

		letter = "8";
	}

	else if (e.keyCode == 57) {

		//letter = "9";
		artyom.say("Keyboard control menu: Press 1 to heat the prompt, press 2 to skip a question, press 3 to restart the game.");
	}

	else if (e.keyCode == 65) {

		letter = "a";
	}

	else if (e.keyCode == 66) {

		letter = "b";
	}

	else if (e.keyCode == 67) {

		letter = "c";
	}

	else if (e.keyCode == 68) {

		letter = "d";
	}

	else if (e.keyCode == 69) {

		letter = "e";
	}

	else if (e.keyCode == 70) {

		letter = "f";
	}

	else if (e.keyCode == 71) {

		letter = "g";
	}

	else if (e.keyCode == 72) {

		letter = "h";
	}

	else if (e.keyCode == 73) {

		letter = "i";
	}

	else if (e.keyCode == 74) {

		letter = "j";
	}

	else if (e.keyCode == 75) {

		letter = "k";
	}

	else if (e.keyCode == 76) {

		letter = "l";
	}

	else if (e.keyCode == 77) {

		letter = "m";
	}

	else if (e.keyCode == 78) {

		letter = "n";
	}

	else if (e.keyCode == 79) {

		letter = "o";
	}

	else if (e.keyCode == 80) {

		letter = "p";
	}

	else if (e.keyCode == 81) {

		letter = "q";
	}

	else if (e.keyCode == 82) {

		letter = "r";
	}

	else if (e.keyCode == 83) {

		letter = "s";
	}

	else if (e.keyCode == 84) {

		letter = "t";
	}

	else if (e.keyCode == 85) {

		letter = "u";
	}

	else if (e.keyCode == 86) {

		letter = "v";
	}

	else if (e.keyCode == 87) {

		letter = "w";
	}

	else if (e.keyCode == 88) {

		letter = "x";
	}

	else if (e.keyCode == 89) {

		letter = "y";
	}

	else if (e.keyCode == 90) {

		letter = "z";
	}

	else if (letter.length == 0) {

		letter = "";
	}

	if (letter != "") {

		utterance = new SpeechSynthesisUtterance(letter);
		window.speechSynthesis.speak(utterance);
	}

	wordMaker(letter);

	return updateGameMap();
}

function wordMaker(newLetter) {

	if (newLetter == "enter") {

		checkAnswer(newLetter);

		word = new Array();
		return;
	}

	if (newLetter == "backspace") {

		word.pop();
		return;
	}

	if (newLetter == "space") {

		newLetter = " ";
	}

	if (newLetter.length != 1) {

		return;
	}

	word[word.length] = newLetter;

	if (word.length < spellingErrorAt+1) {

		spellingErrorAt = null;
	}

	if ((spellingErrorAt != null) && (word[spellingErrorAt] == getPrompt().charAt(spellingErrorAt))) {

		spellingErrorAt = null;
	}

	else if ((spellingErrorAt != null) && (word[spellingErrorAt] != getPrompt().charAt(spellingErrorAt))) {

		return;
	}

	else if (word[word.length-1] != getPrompt().charAt(word.length-1)) {

		spellingErrorAt = (word.length-1);
	}

	else {

		return;
	}
}

window.onkeyup = function() {

	keyPressed = false;
}
