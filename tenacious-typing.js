var prompt;
var promptInc = 0;
var points = 0;
var letter;
var keyPressed = false;
var prompt = ["maze", "day", "fun"];

var winner = false;
var text;
var correct = false;
var incorrect = false;
var spellingErrorAt;

var deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
var deviceHeight = (window.innerHeight > 0) ? window.innerHeight : screen.height;

var width;
var height;

function launchGame() {

	var intro = new SpeechSynthesisUtterance
	("Welcome to Tenacious Typing!");
	window.speechSynthesis.speak(intro);

	gameMap.start();
}

var gameMap = {

	canvas : document.createElement("canvas"),
	start : function() {

		getPrompt();
		speakPrompt();

		var div = document.getElementById("divLaunchGame");

		var cs = getComputedStyle(div);
		width = parseInt(cs.getPropertyValue('width'), 10);
		height = deviceHeight*.6;//60% of screen height
		//var height = parseInt(cs.getPropertyValue('height'), 10);

		this.canvas.width = width;
		this.canvas.height = height;
		this.context = this.canvas.getContext("2d");
		div.appendChild(this.canvas);
		this.interval = setInterval(updateGameMap, 20);
	},

	clear : function() {

		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

function updateGameMap() {

	gameMap.clear();

	var primaryFont = (deviceWidth/1920 * 50);//As a ratio of 50px font on 1920 screen
	var secondaryFont = (deviceWidth/1920 * 25);//As a ratio of 25px font on 1920 screen
	var largeFont = (deviceWidth/1920 * 100);//As a ratio of 100px font on 1920 screen

	ctx = gameMap.context;
	ctx.fillStyle = "black";
	ctx.font = primaryFont + "px Arial";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";

	var instruction = "";

	if (winner == true) {

		text = "Awesome! You win!";
		ctx.fillStyle = "purple";
		ctx.font = largeFont + "px Arial";
	}

	else if (correct == true) {

		text = "Good job!";
	}

	else {

		instruction = "Your word is";
		text = "\"" + getPrompt() + "\"";
	}

	ctx.fillText(instruction, width/2, height/2 - 1.5*primaryFont);
	ctx.fillText(text, width/2, height/2);

	if (incorrect) {

		ctx.fillStyle = "red";
		ctx.fillText("Try again", width/2, height/2 + primaryFont);
	}

	if (spellingErrorAt != null) {

		var correctPart = word.join("").substring(0, spellingErrorAt);

		ctx.fillStyle = "green";
		ctx.fillText(correctPart, width/2, height/2 + primaryFont);

		var incorrectPartOffset = ctx.measureText(correctPart).width;

		var incorrectPart = word.join("").substring(spellingErrorAt, word.join("").length);

		ctx.textAlign = "left";

		ctx.fillStyle = "red";
		ctx.fillText(incorrectPart, width/2 + incorrectPartOffset, height/2 + primaryFont);
	}

	else {

		ctx.fillStyle = "green";
		ctx.fillText(word.join(""), width/2, height/2 + primaryFont);
	}

	ctx.font = secondaryFont + "px Arial";
	ctx.fillStyle = "black";
	ctx.textAlign = "left";
	ctx.fillText("Points: " + points, 30, 30);
	ctx.fillText("Win at 30 points ", 30, 30 + secondaryFont);
}

function nextPrompt() {

	var utteranceCongrat = new SpeechSynthesisUtterance("Good job!");
	window.speechSynthesis.speak(utteranceCongrat);

	if (getPoints() >= (prompt.length * 10)) {

		return winGame();
	}

	promptInc++;

	speakPrompt();
}

function getPrompt() {

	return prompt[promptInc];
}

function speakPrompt() {

	var utterancePrompt = new SpeechSynthesisUtterance("The prompt is " + prompt[promptInc]);
	window.speechSynthesis.speak(utterancePrompt);
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

	document.getElementById("gameInput").value = "";

	var utteranceWord = new SpeechSynthesisUtterance(word.join(""));

	window.speechSynthesis.speak(utteranceWord);

	if (getPrompt() == word.join("")) {

		addPoints();
		correct = true;

		setTimeout(function() {

			correct = false;
		}, 3000);

		return nextPrompt();
	}

	incorrect = true;

	setTimeout(function() {

		incorrect = false;
	}, 1500);

	var utteranceStatus = new SpeechSynthesisUtterance("try again");
	window.speechSynthesis.speak(utteranceStatus);
}

function winGame() {

	winner = true;

	utteranceWin = new SpeechSynthesisUtterance("Awesome, you win! Press the backspace key to play again.");
	window.speechSynthesis.speak(utteranceWin);
}

function resetGame() {

		location.reload();
}

window.onkeydown = function(e) {

	letter = "";

	if (keyPressed) {

		return;
	}

	keyPressed = true;

	if (e.keyCode == 8) {

		if (winner) {

			return resetGame();
		}

		letter = "backspace";
	}

	else if (e.keyCode == 13) {

		letter = "enter";
	}

	else if (e.keyCode == 16) {

		letter = "shift";
	}

	else if (e.keyCode == 32) {

		letter = "space";
	}

	else if (e.keyCode == 37) {

		letter = "left";
	}

	else if (e.keyCode == 38) {

		letter = "up";
	}

	else if (e.keyCode == 39) {

		letter = "right";
	}

	else if (e.keyCode == 40) {

		letter = "down";
	}

	else if (e.keyCode == 48) {

		letter = "0";
	}

	else if (e.keyCode == 49) {

		letter = "1";
		return speakPrompt();
	}

	else if (e.keyCode == 50) {

		letter  = "2";
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

		letter = "9";
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

		letter = "try again";
	}

	var utteranceLetter = new SpeechSynthesisUtterance(letter);
	utteranceLetter.rate = 3;
	utteranceLetter.volume = 1;
	window.speechSynthesis.speak(utteranceLetter);

	return wordMaker(letter);
}

var word = new Array();

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
