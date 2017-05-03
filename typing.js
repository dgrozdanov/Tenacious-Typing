//Pixi.js canvas elements
var app;
var style;
var background;
var scoreText, mainText, namePromptText, nameInputText, correctText, incorrectText, firstText, secondText, thirdText;
//Database
var db;
var promptRef;
//Music
var backgroundMusic;
//Array
var word;
var soundArray;
//Strings
var displayName;
var suggestedPrompt;
var prompt;
var text;
var keyValue;
//Integers
var userRating;
var points;
var wrongInc;
var fontInc;
var optionInc;
var soundInc;
var suggestedPromptInc;
var promptInc;
var spellingErrorAt;
//Booleans
var hasPlayAgain;
var isModalOpen;
var hasInput;
var hasMic;
var musicPause;
var loaded;
var choosingName;
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

//good
var aMap = new Map();
aMap.set('a', 'correct');
aMap.set('b', 'left 4, 1 above to the left');
aMap.set('c', 'left 2, 1 above to the left');
aMap.set('d', 'left 2');
aMap.set('e', 'left 2, 1 below');
aMap.set('f', 'left 3');
aMap.set('g', 'left 4');
aMap.set('h', 'left 5');
aMap.set('i', 'left 7, 1 below');
aMap.set('j', 'left 6');
aMap.set('k', 'left 7');
aMap.set('l', 'left 8');
aMap.set('m', 'left 6, 1 above to the left');
aMap.set('n', 'left 5, 1 above to the left');
aMap.set('o', 'left 8, 1 below');
aMap.set('p', 'left 9, 1 below');
aMap.set('q', '1 below');
aMap.set('r', 'left 3, 1 below');
aMap.set('s', 'left 1');
aMap.set('t', 'left 4, 1 below');
aMap.set('u', 'left 6, 1 below');
aMap.set('v', 'left 3, 1 above to the left');
aMap.set('w', 'left 1, 1 below');
aMap.set('x', 'left 1, 1 above to the left');
aMap.set('y', 'left 5, 1 below');
aMap.set('z', '1 above to the left');

//good
var bMap = new Map();
bMap.set('a', 'right 4, 1 below to the right');
bMap.set('b', 'correct');
bMap.set('c', 'right 2');
bMap.set('d', 'right 2, 1 below to the right');
bMap.set('e', 'right 2, 2 below to the right');
bMap.set('f', 'right 1, 1 below to the right');
bMap.set('g', '1 below to the right');
bMap.set('h', '1 below to the left');
bMap.set('i', 'left 3, 2 below to the right');
bMap.set('j', 'left 2, 1 below to the right');
bMap.set('k', 'left 3, 1 below to the right');
bMap.set('l', 'left 4, 1 below to the right');
bMap.set('m', 'left 2');
bMap.set('n', 'left 1');
bMap.set('o', 'left 4, 2 below to the right');
bMap.set('p', 'left 5, 2 below to the right');
bMap.set('q', 'right 4, 2 below to the right');
bMap.set('r', 'right 1, 2 below to the right');
bMap.set('s', 'right 3, 1 below to the right');
bMap.set('t', '2 below to the right');
bMap.set('u', 'left 2, 2 below to the right');
bMap.set('v', 'right 1');
bMap.set('w', 'right 3, 2 below to the right');
bMap.set('x', 'right 3');
bMap.set('y', 'left 1, 2 below to the right');
bMap.set('z', 'right 4');

//good
var cMap = new Map();
cMap.set('a', 'right 2, 1 below to the right');
cMap.set('b', 'left 2');
cMap.set('c', 'correct');
cMap.set('d', '1 below to the right');
cMap.set('e', '2 below to the right');
cMap.set('f', 'left 1, 1 below to the right');
cMap.set('g', 'left 2, 1 below to the right');
cMap.set('h', 'left 3, 1 below to the right');
cMap.set('i', 'left 5, 2 below to the right');
cMap.set('j', 'left 4, 1 below to the right');
cMap.set('k', 'left 5, 1 below to the right');
cMap.set('l', 'left 6, 1 below to the right');
cMap.set('m', 'left 4');
cMap.set('n', 'left 3');
cMap.set('o', 'left 6, 2 below to the right');
cMap.set('p', 'left 7, 2 below to the right');
cMap.set('q', 'right 2, 2 below to the right');
cMap.set('r', 'left 1, 2 below to the right');
cMap.set('s', 'right 1, 1 below to the right');
cMap.set('t', 'left 2, 2 below to the right');
cMap.set('u', 'left 4, 2 below to the right');
cMap.set('v', 'left 1');
cMap.set('w', 'right 1, 2 below to the right');
cMap.set('x', 'right 1');
cMap.set('y', 'left 3, 2 below to the right');
cMap.set('z', 'right 2');

//good
var dMap = new Map();
dMap.set('a', 'right 2');
dMap.set('b', 'left 2, 1 above to the left');
dMap.set('c', '1 above to the left');
dMap.set('d', 'correct');
dMap.set('e', '1 below');
dMap.set('f', 'left 1');
dMap.set('g', 'left 2');
dMap.set('h', 'left 3');
dMap.set('i', 'left 5, 1 below');
dMap.set('j', 'left 4');
dMap.set('k', 'left 5');
dMap.set('l', 'left 6');
dMap.set('m', 'left 4, 1 above to the left');
dMap.set('n', 'left 3, 1 above to the left');
dMap.set('o', 'left 6, 1 below');
dMap.set('p', 'left 7, 1 below');
dMap.set('q', 'right 2, 1 below');
dMap.set('r', 'left 1, 1 below');
dMap.set('s', 'right 1');
dMap.set('t', 'left 2, 1 below');
dMap.set('u', 'left 4, 1 below');
dMap.set('v', 'left 1, 1 above to the left');
dMap.set('w', 'right 1, 1 below');
dMap.set('x', 'right 1, 1 above to the left');
dMap.set('y', 'left 3, 1 below');
dMap.set('z', 'right 2, 1 above to the left');

//good
var eMap = new Map();
eMap.set('a', 'right 2, 1 above');
eMap.set('b', 'left 2, 2 above to the left');
eMap.set('c', '2 above to the left');
eMap.set('d', '1 above');
eMap.set('e', 'correct');
eMap.set('f', 'left 1, 1 above');
eMap.set('g', 'left 2, 1 above');
eMap.set('h', 'left 3, 1 above');
eMap.set('i', 'left 5');
eMap.set('j', 'left 4, 1 above');
eMap.set('k', 'left 5, 1 above');
eMap.set('l', 'left 6, 1 above');
eMap.set('m', 'left 4, 2 above to the left');
eMap.set('n', 'left 3, 2 above to the left');
eMap.set('o', 'left 6');
eMap.set('p', 'left 7');
eMap.set('q', 'right 2');
eMap.set('r', 'left 1');
eMap.set('s', 'right 1, 1 above');
eMap.set('t', 'left 2');
eMap.set('u', 'left 4');
eMap.set('v', 'left 1, 2 above to the left');
eMap.set('w', 'right 1');
eMap.set('x', 'right 1, 2 above to the left');
eMap.set('y', 'left 3');
eMap.set('z', 'right 2, 2 above to the left');

//good
var fMap = new Map();
fMap.set('a', 'right 3');
fMap.set('b', 'left 1, 1 above to the left');
fMap.set('c', 'right 1, 1 above to the left');
fMap.set('d', 'right 1');
fMap.set('e', 'right 1, 1 below');
fMap.set('f', 'correct');
fMap.set('g', 'left 1');
fMap.set('h', 'left 2');
fMap.set('i', 'left 4, 1 below');
fMap.set('j', 'left 3');
fMap.set('k', 'left 4');
fMap.set('l', 'left 5');
fMap.set('m', 'left 3, 1 above to the left');
fMap.set('n', 'left 2, 1 above to the left');
fMap.set('o', 'left 5, 1 below');
fMap.set('p', 'left 6, 1 below');
fMap.set('q', 'right 3, 1 below');
fMap.set('r', '1 below');
fMap.set('s', 'right 2');
fMap.set('t', 'left 1, 1 below');
fMap.set('u', 'left 3, 1 below');
fMap.set('v', '1 above to the left');
fMap.set('w', 'right 2, 1 below');
fMap.set('x', 'right 2, 1 above to the left');
fMap.set('y', 'left 2, 1 below');
fMap.set('z', 'right 3, 1 above to the left');

//good
var gMap = new Map();
gMap.set('a', 'right 4');
gMap.set('b', '1 above to the left');
gMap.set('c', 'right 2, 1 above to the left');
gMap.set('d', 'right 2');
gMap.set('e', 'right 2, 1 below');
gMap.set('f', 'right 1');
gMap.set('g', 'correct');
gMap.set('h', 'left 1');
gMap.set('i', 'left 3, 1 below');
gMap.set('j', 'left 2');
gMap.set('k', 'left 3');
gMap.set('l', 'left 4');
gMap.set('m', 'left 2, 1 above to the left');
gMap.set('n', 'left 1, 1 above to the left');
gMap.set('o', 'left 4, 1 below');
gMap.set('p', 'left 5, 1 below');
gMap.set('q', 'right 4, 1 below');
gMap.set('r', 'right 1, 1 below');
gMap.set('s', 'right 3');
gMap.set('t', '1 below');
gMap.set('u', 'left 2, 1 below');
gMap.set('v', 'right 1, 1 above to the left');
gMap.set('w', 'right 3, 1 below');
gMap.set('x', 'right 3, 1 above to the left');
gMap.set('y', 'left 1, 1 below');
gMap.set('z', 'right 4, 1 above to the left');

//good
var hMap = new Map();
hMap.set('a', 'right 5');
hMap.set('b', 'right 1, 1 above to the left');
hMap.set('c', 'right 3, 1 above to the left');
hMap.set('d', 'right 3');
hMap.set('e', 'right 3, 1 below');
hMap.set('f', 'right 2');
hMap.set('g', 'right 1');
hMap.set('h', 'correct');
hMap.set('i', 'left 2, 1 below');
hMap.set('j', 'left 1');
hMap.set('k', 'left 2');
hMap.set('l', 'left 3');
hMap.set('m', 'left 1, 1 above to the left');
hMap.set('n', '1 above to the left');
hMap.set('o', 'left 3, 1 below');
hMap.set('p', 'left 4, 1 below');
hMap.set('q', 'right 5, 1 below');
hMap.set('r', 'right 2, 1 below');
hMap.set('s', 'right 4');
hMap.set('t', 'right 1, 1 below');
hMap.set('u', 'left 1, 1 below');
hMap.set('v', 'right 2, 1 above to the left');
hMap.set('w', 'right 4, 1 below');
hMap.set('x', 'right 4, 1 above to the left');
hMap.set('y', '1 below');
hMap.set('z', 'right 5, 1 above to the left');

//good
var iMap = new Map();
iMap.set('a', 'right 7, 1 above');
iMap.set('b', 'right 3, 2 above to the left');
iMap.set('c', 'right 5, 2 above to the left');
iMap.set('d', 'right 5, 1 above');
iMap.set('e', 'right 5');
iMap.set('f', 'right 4, 1 above');
iMap.set('g', 'right 3, 1 above');
iMap.set('h', 'right 2, 1 above');
iMap.set('i', 'correct');
iMap.set('j', 'right 1, 1 above');
iMap.set('k', '1 above');
iMap.set('l', 'left 1, 1 above');
iMap.set('m', 'right 1, 2 above to the left');
iMap.set('n', 'right 2, 2 above to the left');
iMap.set('o', 'left 1');
iMap.set('p', 'left 2');
iMap.set('q', 'right 7');
iMap.set('r', 'right 4');
iMap.set('s', 'right 6, 1 above');
iMap.set('t', 'right 3');
iMap.set('u', 'right 1');
iMap.set('v', 'right 4, 2 above to the left');
iMap.set('w', 'right 6');
iMap.set('x', 'right 6, 2 above to the left');
iMap.set('y', 'right 2');
iMap.set('z', 'right 7, 2 above to the left');

//good
var jMap = new Map();
jMap.set('a', 'right 6');
jMap.set('b', 'right 2, 1 above to the left');
jMap.set('c', 'right 4, 1 above to the left');
jMap.set('d', 'right 4');
jMap.set('e', 'right 4, 1 below');
jMap.set('f', 'right 3');
jMap.set('g', 'right 2');
jMap.set('h', 'right 1');
jMap.set('i', 'left 1, 1 below');
jMap.set('j', 'correct');
jMap.set('k', 'left 1');
jMap.set('l', 'left 2');
jMap.set('m', '1 above to the left');
jMap.set('n', 'right 1, 1 above to the left');
jMap.set('o', 'left 2, 1 below');
jMap.set('p', 'left 3, 1 below');
jMap.set('q', 'right 6, 1 below');
jMap.set('r', 'right 3, 1 below');
jMap.set('s', 'right 5');
jMap.set('t', 'right 2, 1 below');
jMap.set('u', '1 below');
jMap.set('v', 'right 3, 1 above to the left');
jMap.set('w', 'right 5, 1 below');
jMap.set('x', 'right 5, 1 above to the left');
jMap.set('y', 'right 1, 1 below');
jMap.set('z', 'right 6, 1 above to the left');

//good
var kMap = new Map();
kMap.set('a', 'right 7');
kMap.set('b', 'right 3, 1 above to the left');
kMap.set('c', 'right 5, 1 above to the left');
kMap.set('d', 'right 5');
kMap.set('e', 'right 5, 1 below');
kMap.set('f', 'right 4');
kMap.set('g', 'right 3');
kMap.set('h', 'right 2');
kMap.set('i', '1 below');
kMap.set('j', 'right 1');
kMap.set('k', 'correct');
kMap.set('l', 'left 1');
kMap.set('m', 'right 1, 1 above to the left');
kMap.set('n', 'right 2, 1 above to the left');
kMap.set('o', 'left 1, 1 below');
kMap.set('p', 'left 2, 1 below');
kMap.set('q', 'right 7, 1 below');
kMap.set('r', 'right 4, 1 below');
kMap.set('s', 'right 7, left 1');
kMap.set('t', 'right 3, 1 below');
kMap.set('u', 'right 1, 1 below');
kMap.set('v', 'right 4, 1 above to the left');
kMap.set('w', 'right 6, 1 below');
kMap.set('x', 'right 6, 1 above to the left');
kMap.set('y', 'right 2, 1 below');
kMap.set('z', 'right 7, 1 above to the left');

//good
var lMap = new Map();
lMap.set('a', 'right 8');
lMap.set('b', 'right 4, 1 above to the left');
lMap.set('c', 'right 6, 1 above to the left');
lMap.set('d', 'right 6');
lMap.set('e', 'right 6, 1 below');
lMap.set('f', 'right 5');
lMap.set('g', 'right 4');
lMap.set('h', 'right 3');
lMap.set('i', 'right 1, 1 below');
lMap.set('j', 'right 2');
lMap.set('k', 'right 1');
lMap.set('l', 'correct');
lMap.set('m', 'right 2, 1 above to the left');
lMap.set('n', 'right 3, 1 above to the left');
lMap.set('o', '1 below');
lMap.set('p', 'left 1, 1 below');
lMap.set('q', 'right 8, 1 below');
lMap.set('r', 'right 5, 1 below');
lMap.set('s', 'right 7');
lMap.set('t', 'right 4, 1 below');
lMap.set('u', 'right 2, 1 below');
lMap.set('v', 'right 5, 1 above to the left');
lMap.set('w', 'right 7, 1 below');
lMap.set('x', 'right 7, 1 above to the left');
lMap.set('y', 'right 3, 1 below');
lMap.set('z', 'right 8, 1 above to the left');

//good
var mMap = new Map();
mMap.set('a', 'right 6, 1 below to the right');
mMap.set('b', 'right 2');
mMap.set('c', 'right 4');
mMap.set('d', 'right 4, 1 below to the right');
mMap.set('e', 'right 4, 2 below to the right');
mMap.set('f', 'right 3, 1 below to the right');
mMap.set('g', 'right 2, 1 below to the right');
mMap.set('h', 'right 1, 1 below to the right');
mMap.set('i', 'left 1, 2 below to the right');
mMap.set('j', '1 below to the right');
mMap.set('k', 'left 1, 1 below to the right');
mMap.set('l', 'left 2, 1 below to the right');
mMap.set('m', 'correct');
mMap.set('n', 'right 1');
mMap.set('o', 'left 2, 2 below to the right');
mMap.set('p', 'left 3, 2 below to the right');
mMap.set('q', 'right 6, 2 below to the right');
mMap.set('r', 'right 3, 2 below to the right');
mMap.set('s', 'right 5, 1 below to the right');
mMap.set('t', 'right 2, 2 below to the right');
mMap.set('u', '2 below to the right');
mMap.set('v', 'right 3');
mMap.set('w', 'right 5, 2 below to the right');
mMap.set('x', 'right 5');
mMap.set('y', 'right 1, 2 below to the right');
mMap.set('z', 'right 6');

//good
var nMap = new Map();
nMap.set('a', 'right 5, 1 below to the right');
nMap.set('b', 'right 1');
nMap.set('c', 'right 3');
nMap.set('d', 'right 3, 1 below to the right');
nMap.set('e', 'right 3, 2 below to the right');
nMap.set('f', 'right 2, 1 below to the right');
nMap.set('g', 'right 1, 1 below to the right');
nMap.set('h', '1 below to the right');
nMap.set('i', 'left 2, 2 below to the right');
nMap.set('j', 'left 1, 1 below to the right');
nMap.set('k', 'left 2, 1 below to the right');
nMap.set('l', 'left 3, 1 below to the right');
nMap.set('m', 'left 1');
nMap.set('n', 'correct');
nMap.set('o', 'left 3, 2 below to the right');
nMap.set('p', 'left 4, 2 below to the right');
nMap.set('q', 'right 5, 2 below to the right');
nMap.set('r', 'right 2, 2 below to the right');
nMap.set('s', 'right 4, 1 below to the right');
nMap.set('t', 'right 1, 2 below to the right');
nMap.set('u', 'left 1, 2 below to the right');
nMap.set('v', 'right 2');
nMap.set('w', 'right 4, 2 below to the right');
nMap.set('x', 'right 4');
nMap.set('y', '2 below to the right');
nMap.set('z', 'right 5');

//good
var oMap = new Map();
oMap.set('a', 'right 8, 1 above');
oMap.set('b', 'right 4, 2 above to the left');
oMap.set('c', 'right 6, 2 above to the left');
oMap.set('d', 'right 6, 1 above');
oMap.set('e', 'right 6');
oMap.set('f', 'right 5, 1 above');
oMap.set('g', 'right 4, 1 above');
oMap.set('h', 'right 3, 1 above');
oMap.set('i', 'right 1');
oMap.set('j', 'right 2, 1 above');
oMap.set('k', 'right 1, 1 above');
oMap.set('l', '1 above');
oMap.set('m', 'right 2, 2 above to the left');
oMap.set('n', 'right 3, 2 above to the left');
oMap.set('o', 'correct');
oMap.set('p', 'left 1');
oMap.set('q', 'right 8');
oMap.set('r', 'right 5');
oMap.set('s', 'right 7, 1 above');
oMap.set('t', 'right 4');
oMap.set('u', 'right 2');
oMap.set('v', 'right 5, 2 above to the left');
oMap.set('w', 'right 7');
oMap.set('x', 'right 7, 2 above to the left');
oMap.set('y', 'right 3');
oMap.set('z', 'right 8, 2 above to the left');

//good
var pMap = new Map();
pMap.set('a', 'left 9, 1 above');
pMap.set('b', 'right 5, 2 above to the left');
pMap.set('c', 'right 7, 2 above to the left');
pMap.set('d', 'right 7, 1 above');
pMap.set('e', 'right 7');
pMap.set('f', 'right 6, 1 above');
pMap.set('g', 'right 5, 1 above');
pMap.set('h', 'right 4, 1 above');
pMap.set('i', 'right 2');
pMap.set('j', 'right 3, 1 above');
pMap.set('k', 'right 2, 1 above');
pMap.set('l', 'right 1, 1 above');
pMap.set('m', 'right 3, 2 above to the left');
pMap.set('n', 'right 4, 2 above to the left');
pMap.set('o', 'right 1');
pMap.set('p', 'correct');
pMap.set('q', 'right 9');
pMap.set('r', 'right 6');
pMap.set('s', 'right 8, 1 above');
pMap.set('t', 'right 5');
pMap.set('u', 'right 3');
pMap.set('v', 'right 6, 2 above to the left');
pMap.set('w', 'right 8');
pMap.set('x', 'right 8, 2 above to the left');
pMap.set('y', 'right 4');
pMap.set('z', 'right 9, 2 above to the left');

//good
var qMap = new Map();
qMap.set('a', '1 above');
qMap.set('b', 'left 4, 2 above to the left');
qMap.set('c', 'left 2, 2 above to the left');
qMap.set('d', 'left 2, 1 above');
qMap.set('e', 'left 2');
qMap.set('f', 'left 3, 1 above');
qMap.set('g', 'left 4, 1 above');
qMap.set('h', 'left 5, 1 above');
qMap.set('i', 'left 7');
qMap.set('j', 'left 6, 1 above');
qMap.set('k', 'left 7, 1 above');
qMap.set('l', 'left 8, 1 above');
qMap.set('m', 'left 6, 2 above to the left');
qMap.set('n', 'left 5, 2 above to the left');
qMap.set('o', 'left 8');
qMap.set('p', 'left 9');
qMap.set('q', 'correct');
qMap.set('r', 'left 3');
qMap.set('s', 'left 1, 1 above');
qMap.set('t', 'left 4');
qMap.set('u', 'left 6');
qMap.set('v', 'left 3, 2 above to the left');
qMap.set('w', 'left 1');
qMap.set('x', 'left 1, 2 above to the left');
qMap.set('y', 'left 5');
qMap.set('z', '2 above to the left');

//good
var rMap = new Map();
rMap.set('a', 'right 3, 1 above');
rMap.set('b', 'left 1, 2 above to the left');
rMap.set('c', 'right 1, 2 above to the left');
rMap.set('d', 'right 1, 1 above');
rMap.set('e', 'right 1');
rMap.set('f', '1 above');
rMap.set('g', 'left 1, 1 above');
rMap.set('h', 'left 2, 1 above');
rMap.set('i', 'left 4');
rMap.set('j', 'left 3, 1 above');
rMap.set('k', 'left 4, 1 above');
rMap.set('l', 'left 5, 1 above');
rMap.set('m', 'left 3, 2 above to the left');
rMap.set('n', 'left 2, 2 above to the left');
rMap.set('o', 'left 5');
rMap.set('p', 'left 6');
rMap.set('q', 'right 3');
rMap.set('r', 'correct');
rMap.set('s', 'right 2, 1 above');
rMap.set('t', 'left 1');
rMap.set('u', 'left 3');
rMap.set('v', '2 above to the left');
rMap.set('w', 'right 2');
rMap.set('x', 'right 2, 2 above to the left');
rMap.set('y', 'left 2');
rMap.set('z', 'right 3, 2 above to the left');

//good
var sMap = new Map();
sMap.set('a', '1 right');
sMap.set('b', 'left 3, 1 above to the left');
sMap.set('c', 'left 1, 1 above to the left');
sMap.set('d', 'left 1');
sMap.set('e', 'left 1, 1 below');
sMap.set('f', 'left 2');
sMap.set('g', 'left 3');
sMap.set('h', 'left 4');
sMap.set('i', 'left 6, 1 below');
sMap.set('j', 'left 5');
sMap.set('k', 'left 6');
sMap.set('l', 'left 7');
sMap.set('m', 'left 6, 1 above to the left');
sMap.set('n', 'left 4, 1 above to the left');
sMap.set('o', 'left 7, 1 below');
sMap.set('p', 'left 8, 1 below');
sMap.set('q', 'right 1, 1 below');
sMap.set('r', 'left 2, 1 below');
sMap.set('s', 'correct');
sMap.set('t', 'left 3, 1 below');
sMap.set('u', 'left 5, 1 below');
sMap.set('v', 'left 2, 1 above to the left');
sMap.set('w', '1 below');
sMap.set('x', '1 above to the left');
sMap.set('y', 'left 4, 1 below');
sMap.set('z', 'right 1, 1 above to the left');

//good
var tMap = new Map();
tMap.set('a', 'right 4, 1 above');
tMap.set('b', '2 above to the left');
tMap.set('c', 'right 2, 2 above to the left');
tMap.set('d', 'right 2, 1 above');
tMap.set('e', 'right 2');
tMap.set('f', 'right 1, 1 above');
tMap.set('g', '1 above');
tMap.set('h', 'left 1, 1 above');
tMap.set('i', 'left 3');
tMap.set('j', 'left 2, 1 above');
tMap.set('k', 'left 3, 1 above');
tMap.set('l', 'left 4, 1 above');
tMap.set('m', 'left 2, 2 above to the left');
tMap.set('n', 'left 1, 2 above to the left');
tMap.set('o', 'left 4');
tMap.set('p', 'left 5');
tMap.set('q', 'right 4');
tMap.set('r', 'right 1');
tMap.set('s', 'right 3, 1 above');
tMap.set('t', 'correct');
tMap.set('u', 'left 2');
tMap.set('v', 'right 1, 2 above to the left');
tMap.set('w', 'right 3');
tMap.set('x', 'right 3, 2 above to the left');
tMap.set('y', 'left 1');
tMap.set('z', 'right 4, 2 above to the left');

//good
var uMap = new Map();
uMap.set('a', 'right 6, 1 above');
uMap.set('b', 'right 2, 2 above to the left');
uMap.set('c', 'right 4, 2 above to the left');
uMap.set('d', 'right 4, 1 above');
uMap.set('e', 'right 4');
uMap.set('f', 'right 3, 1 above');
uMap.set('g', 'right 2, 1 above');
uMap.set('h', 'right 1, 1 above');
uMap.set('i', 'left 1');
uMap.set('j', '1 above');
uMap.set('k', 'left 1, 1 above');
uMap.set('l', 'left 2, 1 above');
uMap.set('m', '2 above to the left');
uMap.set('n', 'right 1, 2 above to the left');
uMap.set('o', 'left 2');
uMap.set('p', 'left 3');
uMap.set('q', 'right 6');
uMap.set('r', 'right 3');
uMap.set('s', 'right 5, 1 above');
uMap.set('t', 'right 2');
uMap.set('u', 'correct');
uMap.set('v', 'right 3, 2 above to the left');
uMap.set('w', 'right 5');
uMap.set('x', 'right 5, 2 above to the left');
uMap.set('y', 'right 1');
uMap.set('z', 'right 6, 2 above to the left');

//correct
var vMap = new Map();
vMap.set('a', 'right 3, 1 below to the right');
vMap.set('b', 'left 1');
vMap.set('c', 'right 1');
vMap.set('d', 'right 1, 1 below to the right');
vMap.set('e', 'right 1, 2 below to the right');
vMap.set('f', '1 below to the right');
vMap.set('g', 'left 1, 1 below to the right');
vMap.set('h', 'left 2, 1 below to the right');
vMap.set('i', 'left 4, 2 below to the right');
vMap.set('j', 'left 3, 1 below to the right');
vMap.set('k', 'left 4, 1 below to the right');
vMap.set('l', 'left 5, 1 below to the right');
vMap.set('m', 'left 3');
vMap.set('n', 'left 2');
vMap.set('o', 'left 5, 2 below to the right');
vMap.set('p', 'left 6, 2 below to the right');
vMap.set('q', 'right 3, 2 below to the right');
vMap.set('r', '2 below to the right');
vMap.set('s', 'right 2, 1 below to the right');
vMap.set('t', 'left 1, 2 below to the right');
vMap.set('u', 'left 3, 2 below to the right');
vMap.set('v', 'correct');
vMap.set('w', 'right 2, 2 below to the right');
vMap.set('x', 'right 2');
vMap.set('y', 'left 2, 2 below to the right');
vMap.set('z', 'right 3');

//good
var wMap = new Map();
wMap.set('a', 'right 1, 1 above');
wMap.set('b', 'left 3, 2 above to the left');
wMap.set('c', 'left 1, 2 above to the left');
wMap.set('d', 'left 1, 1 above');
wMap.set('e', 'left 1');
wMap.set('f', 'left 2, 1 above');
wMap.set('g', 'left 3, 1 above');
wMap.set('h', 'left 4, 1 above');
wMap.set('i', 'left 6');
wMap.set('j', 'left 5, 1 above');
wMap.set('k', 'left 6, 1 above');
wMap.set('l', 'left 7, 1 above');
wMap.set('m', 'left 5, 2 above to the left');
wMap.set('n', 'left 4, 2 above to the left');
wMap.set('o', 'left 7');
wMap.set('p', 'left 8');
wMap.set('q', 'right 1');
wMap.set('r', 'left 2');
wMap.set('s', '1 above');
wMap.set('t', 'left 3');
wMap.set('u', 'left 5');
wMap.set('v', 'left 2, 2 above to the left');
wMap.set('w', 'correct');
wMap.set('x', '2 above to the left');
wMap.set('y', 'left 4');
wMap.set('z', 'right 1, 2 above to the left');

//good
var xMap = new Map();
xMap.set('a', 'right 1, 1 below to the right');
xMap.set('b', 'left 3');
xMap.set('c', 'left 1');
xMap.set('d', 'left 1, 1 below to the right');
xMap.set('e', 'left 1, 2 below to the right');
xMap.set('f', 'left 2, 1 below to the right');
xMap.set('g', 'left 3, 1 below to the right');
xMap.set('h', 'left 4, 1 below to the right');
xMap.set('i', 'left 6, 2 below to the right');
xMap.set('j', 'left 5, 1 below to the right');
xMap.set('k', 'left 6, 1 below to the right');
xMap.set('l', 'left 7, 1 below to the right');
xMap.set('m', 'left 5');
xMap.set('n', 'left 4');
xMap.set('o', 'left 7, 2 below to the right');
xMap.set('p', 'left 8, 2 below to the right');
xMap.set('q', 'right 1, 2 below to the right');
xMap.set('r', 'left 2, 2 below to the right');
xMap.set('s', '1 below to the right');
xMap.set('t', 'left 3, 2 below to the right');
xMap.set('u', 'left 5, 2 below to the right');
xMap.set('v', 'left 2');
xMap.set('w', '2 below to the right');
xMap.set('x', 'correct');
xMap.set('y', 'left 4, 2 below to the right');
xMap.set('z', 'right 1');

//good
var yMap = new Map();
yMap.set('a', 'right 5, 1 above');
yMap.set('b', 'right 1, 2 above to the left');
yMap.set('c', 'right 3, 2 above to the left');
yMap.set('d', 'right 3, 1 above');
yMap.set('e', 'right 3');
yMap.set('f', 'right 2, 1 above');
yMap.set('g', 'right 1, 1 above');
yMap.set('h', '1 above');
yMap.set('i', 'left 2');
yMap.set('j', 'left 1, 1 above');
yMap.set('k', 'left 2, 1 above');
yMap.set('l', 'left 3, 1 above');
yMap.set('m', 'left 1, 2 above to the left');
yMap.set('n', '2 above to the left');
yMap.set('o', 'left 3');
yMap.set('p', 'left 4');
yMap.set('q', 'right 5');
yMap.set('r', 'right 2');
yMap.set('s', 'right 4, 1 above');
yMap.set('t', 'right 1');
yMap.set('u', 'left 1');
yMap.set('v', 'right 2, 2 above to the left');
yMap.set('w', 'right 4');
yMap.set('x', 'right 4, 2 above to the left');
yMap.set('y', 'correct');
yMap.set('z', 'right 5, 2 above to the left');

//good
var zMap = new Map();
zMap.set('a', '1 below to the right');
zMap.set('b', 'left 4');
zMap.set('c', 'left 2');
zMap.set('d', 'left 2, 1 below to the right');
zMap.set('e', 'left 2, 2 below to the right');
zMap.set('f', 'left 3, 1 below to the right');
zMap.set('g', 'left 4, 1 below to the right');
zMap.set('h', 'left 5, 1 below to the right');
zMap.set('i', 'left 7, 2 below to the right');
zMap.set('j', 'left 6, 1 below to the right');
zMap.set('k', 'left 7, 1 below to the right');
zMap.set('l', 'left 8, 1 below to the right');
zMap.set('m', 'left 6');
zMap.set('n', 'left 5');
zMap.set('o', 'left 8, 2 below to the right');
zMap.set('p', 'left 9, 2 below to the right');
zMap.set('q', '2 below to the right');
zMap.set('r', 'left 3, 2 below to the right');
zMap.set('s', 'left 1, 1 below to the right');
zMap.set('t', 'left 4, 2 below to the right');
zMap.set('u', 'left 6, 2 below to the right');
zMap.set('v', 'left 3');
zMap.set('w', 'left 1, 2 below to the right');
zMap.set('x', 'left 1');
zMap.set('y', 'left 5, 2 below to the right');
zMap.set('z', 'correct');


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
	signInFlow: 'popup',
	signInSuccessUrl: 'typing.html',
	signInOptions: [
		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		firebase.auth.FacebookAuthProvider.PROVIDER_ID,
		//firebase.auth.TwitterAuthProvider.PROVIDER_ID,
		//firebase.auth.GithubAuthProvider.PROVIDER_ID,
		firebase.auth.EmailAuthProvider.PROVIDER_ID
	],
	// Terms of service url.
	tosUrl: '../terms.html'
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

//var database = Firebase.database();

initApp = function() {
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {

      $('#firebaseui-auth-container').hide();
      $('#signOutButton').show();
			// User is signed in.
			displayName = user.displayName;
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
	initApp();
});

function resetValues() {
	word = new Array();
	//Variables initialized to default values
	if (!hasPlayAgain) {
		displayName = "";
		choosingName = true;
		choosingMode = false;
	}

	else {
		choosingName = false;
		choosingMode = true;
	}
	
	//displayName = "";
	points = 0;
	wrongInc = 0;
	fontInc = 0;
	optionInc = 0;
	soundInc = 0;
	promptInc = 0;
	userRating = 0;
	//Booleans set to default false values
	isModalOpen = false;
	hasMic = false;
	hasInput = false;
	musicPause = false;
	loaded = false;
	keyPressed = false;
	gameOver = false;
	correct = false;
	incorrect = false;

	suggestedPrompt = [];
	suggestedPromptInc = 0;
	prompt = [];

	//Retrieves new posts as they are added to the database
	promptRef.on("child_added", function(snapshot, prevChildKey) {
		var newPost = snapshot.val();
		//secondText.setText(secondText.text());
		//pushSecondText(newPost.uTitle);
		console.log(snapshot.key);
		suggestedPrompt.push(snapshot.key);
	});
}

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

	//var profanity = require('profanity-util');

	//console.log(profanity.check('Lorem ipsum foo bar poop test poop damn dolor sit..'));

	db = firebase.database();

	promptRef = db.ref().child("suggestions");

	hasPlayAgain = false;
	resetValues();

	$('#commentModal').on('shown.bs.modal', function (event) {
		isModalOpen = true;
	});

	$('#commentModal').on('hidden.bs.modal', function (event) {
		isModalOpen = false;
	});

	$('#loginButton').on('click', function (event) {
		signInWithPopup();
	});

	$('#loginModal').on('shown.bs.modal', function (event) {
		$('#loginModal').focus();
	});

	$('#loginModal').on('hidden.bs.modal', function (event) {
		setTimeout(function () {
			$('#loginButton').blur();
		}, 10);
	});
	
	$('#suggestionModal').on('shown.bs.modal', function (event) {
		$('#suggestionModal').focus();
	});

	$('#suggestionModal').on('hidden.bs.modal', function (event) {
		setTimeout(function () {
			$('#promptButton').blur();
		}, 10);
	});

	$('#commentModal').on('shown.bs.modal', function (event) {
		$('#commentModal').focus();
	});

	$('#commentModal').on('hidden.bs.modal', function (event) {
		setTimeout(function () {
			$('#commentButton').blur();
		}, 10);
	});

	$('#scoreModal').on('shown.bs.modal', function (event) {
		$('scoreModal').focus();
	});

	$('#scoreModal').on('hidden.bs.modal', function (event) {
		setTimeout(function () {
			$('#scoreButton').blur();
		}, 10);
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
			indexes:["microphone"],
			action: function(i) {
					hasMic = true;
					hasInput = true;
					artyom.say("Voice recognition mode activated");
			}
		});

		artyom.addCommands({
			indexes:["restart"],
			action: function(i) {
					resetGame();
			}
		});

		artyom.addCommands({
			indexes:["left"],
			action: function(i) {
				if (suggestedPromptInc > 0) {
					cyclePrompt(-1);
				}
				else {
					computerSpeak(suggestedPrompt[suggestedPromptInc] + " is the first word", true);
				}
			}
		});

		artyom.addCommands({
			indexes:["right"],
			action: function(i) {
				if (suggestedPromptInc < suggestedPrompt.length-1) {
					cyclePrompt(1);
				}
				else {
					computerSpeak(suggestedPrompt[suggestedPromptInc] + " is the last word", true);
				}
			}
		});

		artyom.addCommands({
			indexes:["next"],
			action: function(i) {
				if (choosingName) {
					nameChosen();
				}
				else {
					computerSpeak("Next can only be used while choosing your name", true);
				}
			}
		});

		artyom.addCommands({
			indexes:["play"],
			action: function(i) {
				if (choosingMode) {
					modeChosen();
				}
				else {
					computerSpeak("Play can only be used while choosing your mode", true);
				}
			}
		});

		artyom.addCommands({
			indexes:["skip"],
			action: function(i) {
					skipQuestion();
					artyom.say("Skipping");
			}
		});

		artyom.addCommands({
			indexes:["mute"],
			action: function(i) {
					muteMusic();
					artyom.say("Muted");
			}
		});

		artyom.addCommands({
			indexes:["music"],
			action: function(i) {
					backgroundMusic.play();
					artyom.say("Playing");
			}
		});

		artyom.addCommands({
			indexes:["repeat"],
			action: function(i) {
					speakPrompt();
			}
		});
	}

	$('#submitComment').on('click', function(event) {

		$('#snackbar').html("Thanks for leaving your comment!");
		displaySnackbar();

		var displayName;
		if (displayName == null) {
		displayName = $("#nameInput").val();
		}
		var comment = $("#commentInput").val();

		var commentPush = db.ref().child("comments");

		commentPush.push().set({
		uName: xssFilters.inHTMLData(displayName),
		uRating: userRating,
		uComment: xssFilters.inHTMLData(comment)
		});
	});

	db = firebase.database();
	var commentsRef = db.ref().child("comments");

	//Retrieves new posts as they are added to the database
	commentsRef.on("child_added", function(snapshot, prevChildKey) {
		var newPost = snapshot.val();
		//console.log("Previous Post ID: " + prevChildKey);
		//$('#commentList').append('<li>Name: ' + newPost.uName + /*'<br>Rating: ' + newPost.uRating +*/ '<br>Comment: ' + newPost.uComment + '<hr></li>');
		$('#commentList').append(newPost.uName + ', who left a ' + newPost.uRating + ' star rating, says:<br><q>' + newPost.uComment + '</q><hr>');
	});
	
	$('#promptButton, #commentButton, #scoreButton, #skipButton, #muteButton, #resetButton, #loginButton').mouseover(function() {
		setTimeout(function() {
			isSpeaking = true;
		}, 5000);
  	});

  $('#promptButton').focus(function() {
    computerSpeak("Submit a prompt", true);
  });
  $('#promptButton').mouseover(function() {
    computerSpeak("Submit a prompt", true);
  });

  $('#commentButton').focus(function() {
    computerSpeak("Leave a comment", true);
  });
  $('#commentButton').mouseover(function() {
    computerSpeak("Leave a comment", true);
  });

  $('#scoreButton').focus(function() {
    computerSpeak("High scores", true);
  });
  $('#scoreButton').mouseover(function() {
    computerSpeak("High scores", true);
  });

  $('#skipButton').focus(function() {
    computerSpeak("Skip this question", true);
  });
  $('#skipButton').mouseover(function() {
    computerSpeak("Skip this question", true);
  });

  $('#muteButton').focus(function() {
    computerSpeak("Mute the music", true);
  });
  $('#muteButton').mouseover(function() {
    computerSpeak("Mute the music", true);
  });

  $('#resetButton').focus(function() {
    computerSpeak("Reset the game", true);
  });
  $('#resetButton').mouseover(function() {
    computerSpeak("Reset the game", true);
  });

  $('#loginButton').focus(function() {
    computerSpeak("Login to the website", true);
  });
  $('#loginButton').mouseover(function() {
    computerSpeak("Login to the website", true);
  });

  $('#changeBackground').focus(function() {
    computerSpeak("Change background", true);
  });
  $('#changeBackground').mouseover(function() {
    computerSpeak("Change background", true);
  });

  $('#changeColor').focus(function() {
    computerSpeak("Change color", true);
  });
  $('#changeColor').mouseover(function() {
    computerSpeak("Change color", true);
  });

  $('#colorRed').focus(function() {
    computerSpeak("Red", true);
  });
  $('#colorRed').mouseover(function() {
    computerSpeak("Red", true);
  });

  $('#colorYellow').focus(function() {
    computerSpeak("Yellow", true);
  });
  $('#colorYellow').mouseover(function() {
    computerSpeak("Yellow", true);
  });

  $('#colorBlue').focus(function() {
    computerSpeak("Blue", true);
  });
  $('#colorBlue').mouseover(function() {
    computerSpeak("Blue", true);
  });

  $('#colorGreen').focus(function() {
    computerSpeak("Green", true);
  });
  $('#colorGreen').mouseover(function() {
    computerSpeak("Green", true);
  });

  $('#colorOrange').focus(function() {
    computerSpeak("Orange", true);
  });
  $('#colorOrange').mouseover(function() {
    computerSpeak("Orange", true);
  });

  $('#colorPurple').focus(function() {
    computerSpeak("Purple", true);
  });
  $('#colorPurple').mouseover(function() {
    computerSpeak("Purple", true);
  });

  $('#colorPink').focus(function() {
    computerSpeak("Pink", true);
  });
  $('#colorPink').mouseover(function() {
    computerSpeak("Pink", true);
  });

  $('#Ronda').focus(function() {
    computerSpeak("Ronda", true);
  });
  $('#Ronda').mouseover(function() {
    computerSpeak("Ronda", true);
  });

  $('#Carmona').focus(function() {
    computerSpeak("Carmona", true);
  });
  $('#Carmona').mouseover(function() {
    computerSpeak("Carmona", true);
  });

  $('#Gibraltar').focus(function() {
    computerSpeak("Gibraltar", true);
  });
  $('#Gibraltar').mouseover(function() {
    computerSpeak("Gibraltar", true);
  });

  $('#Mediterranean').focus(function() {
    computerSpeak("Mediterranean", true);
  });
  $('#Mediterranean').mouseover(function() {
    computerSpeak("Mediterranean", true);
  });

  $('#Paris').focus(function() {
    computerSpeak("Paris", true);
  });
  $('#Paris').mouseover(function() {
    computerSpeak("Paris", true);
  });

  $('#EiffelTower').focus(function() {
    computerSpeak("Eiffel Tower", true);
  });
  $('#EiffelTower').mouseover(function() {
    computerSpeak("Eiffel Tower", true);
  });

  $('#Granada').focus(function() {
    computerSpeak("Granada", true);
  });
  $('#Granada').mouseover(function() {
    computerSpeak("Granada", true);
  });

  $('#Cordoba').focus(function() {
    computerSpeak("Cordoba", true);
  });
  $('#Cordoba').mouseover(function() {
    computerSpeak("Cordoba", true);
  });

  $('#StVincent').focus(function() {
    computerSpeak("Saint Vincent", true);
  });
  $('#StVincent').mouseover(function() {
    computerSpeak("Saint Vincent", true);
  });

  $('#Lagos').focus(function() {
    computerSpeak("Lagos", true);
  });
  $('#Lagos').mouseover(function() {
    computerSpeak("Lagos", true);
  });


	$('#unsupportedBrowser').fadeOut(10);

	computerSpeak("Loading", true);

	//*************************************PIXI**************************
	app = new PIXI.Application(deviceWidth, deviceHeight*0.93, {backgroundColor : 0x1099bb});
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
	var logo = PIXI.Sprite.fromImage('../media/images/logo-borderless.png');

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

		src: ["media/sounds/Closer_To_Jazz.mp3"],
		loop: true,
		volume: 0.1,
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
			    background = PIXI.Sprite.fromImage('media/images/bg1.jpg');
			    background.width = app.renderer.width;
			    background.height = app.renderer.height;
			    app.stage.addChild(background);

			    createText('red');


			    app.ticker.add(function() {

			        // update the text with a new string
              //scoreText.text = 'Navbar height: ' + $('navDiv').height() + ' footer height: ' + $('footer').height();
							//mainText.fontSize += 1;
			        // let's spin the spinning text
			        //mainText.rotation += 0.03;

							if (gameOver) {
								mainText.setText("Awesome, you win!");
								firstText.setText("Wanna play again? Press enter!");
								correctText.setText("");
								//scoreText.text = 'Score: ' + points;
								scoreText.setText("Score: " + points);
							}

							else if (choosingName) {
								nameInputText.setText(word.join(""));
								displayName = word.join("");
							}

							else if (choosingMode) {
								while (word.length > 0) { //clears array to be used for displaying spelling progress
									word.pop();
								}
								nameInputText.setText("");
								namePromptText.setText("");
								firstText.setText("Choose your game mode!");
								secondText.setText(suggestedPrompt[suggestedPromptInc]);
								//secondText.setText("Spelling Showdown");
							}

							else if (correct) {
								mainText.setText("Good job!");
							}

							else if (incorrect) {
								mainText.setText("Please try again!");
							}

							else if (!choosingMode) {

								//scoreText.text = 'Score: ' + points;
								scoreText.setText("Score: " + points);
								mainText.setText("Hey, " + displayName + ", please spell " + "\"" + getPrompt() + "\"");
								firstText.setText("");

								correctText.setText(word.join(""));
								incorrectText.setText("");

								/*if (spellingErrorAt != null) {
									correctText.setText(word.join("").substring(0, spellingErrorAt));
									incorrectText.setText(word.join(""));
								}
								else {
									correctText.setText(word.join(""));
									incorrectText.setText("");
								}*/
								secondText.setText("");
								thirdText.setText("");
							}
			    });
			}

			loaded = true;
      computerSpeak("Hi there! My name is Artyom. Welcome to Tenacious Typing!", true);//howlerSpeak(onIntro);
      computerSpeak("What is your name?", false);
	  //computerSpeak("Do you have a microphone?");//howlerSpeak(onMic);
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

function pushSecondText(textToPush) {
	secondText.setText(textToPush);
	/*app.stage.removeChild(secondText);

	secondText = new PIXI.Text(textToPush, {
			fontWeight: 'bold',
			fontFamily: 'Snippet',
			fontSize: 35,
			fill: color,
			align: 'left',
			stroke: '#FFFFFF',
			strokeThickness: 6
	});

	//If optionInc == 0, spelling, else if 1, guided
	secondText.anchor.set(0.5);
	secondText.x = app.renderer.width / 2;
	secondText.y = app.renderer.height / 2 * 1.25;

	app.stage.addChild(secondText);*/
}

function computerSpeak(toSay, isShutUp) {
	if (isChrome) {
		if (isShutUp) {
			artyom.shutUp();
		}
		artyom.say(toSay);
	}
	else {
		window.speechSynthesis.speak(new SpeechSynthesisUtterance(toSay));
	}
}

function synthesisSpeak(toSay) {
	window.speechSynthesis.speak(new SpeechSynthesisUtterance(toSay));
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

function howlerSpeak(toSpeak) {
  var sound = new Howl({
		src: [toSpeak],
		volume: 1
	});
	sound.play();
}

function skipQuestion() {
	if (!choosingMode) {
		nextPrompt();
	}
}

function speakPrompt() {
	synthesisSpeak(getPrompt());
}

function getPrompt() {
	return prompt[promptInc];
}

function addPoints() {
	points += 100;
}

function getPoints() {
	return points;
}

function speakPoints() {
	computerSpeak("You have " + points + " points.", true);
}

function nextPrompt() {
	promptInc++;
	computerSpeak("Hey, " + displayName + ", please spell"/* + getPrompt()*/, false);
	speakPrompt();
}

function checkAnswer() {

	computerSpeak(word.join(""), true);

	if (getPrompt().toLowerCase() == word.join("")) {

		addPoints();
		correct = true;

		setTimeout(function() {
			correct = false;
		}, 3000);

		//Random number gen random compliments
    	computerSpeak("Awesome, " + displayName + "! You got it right!", true);//howlerSpeak(onCorrect);
		if (getPoints() >= (prompt.length * 100)) {
			return winGame();
		}

		nextPrompt();
		return;
	}

	incorrect = true;

	setTimeout(function() {
		incorrect = false;
	}, 1500);

	wrongInc++;

	if (wrongInc == 3) {
		computerSpeak("Remember: you can skip this question by saying skip.", false);
	}

	else {
		computerSpeak("try again", true);
	}
}

function setRating(rating) {
	userRating = rating;
	computerSpeak(rating + " stars selected", true);
}

function createText(color) {
	// Creating text sprites to be displayed on the PIXI canvas
	scoreText = new PIXI.Text('', {
		fontWeight: 'bold',
		fontFamily: 'Snippet',
		fontSize: 35,
		fill: color,
		align: 'left',
		stroke: '#FFFFFF',
		strokeThickness: 6
	});
	mainText = new PIXI.Text('Welcome to Tenacious Typing!', {
		fontWeight: 'bold',
        fontFamily: 'Arial',
		fontSize: 60,
        fill: color,
		align: 'center',
		stroke: '#FFFFFF',
		strokeThickness: 6
	});
	namePromptText = new PIXI.Text('What is your name?', {
		fontWeight: 'bold',
		fontFamily: 'Snippet',
		fontSize: 35,
		fill: color,
		align: 'left',
		stroke: '#FFFFFF',
		strokeThickness: 6
	});
	nameInputText = new PIXI.Text('', {
			fontWeight: 'bold',
			fontFamily: 'Snippet',
			fontSize: 35,
			fill: color,
			align: 'left',
			stroke: '#FFFFFF',
			strokeThickness: 6
	});
	correctText = new PIXI.Text('', {
			fontWeight: 'bold',
			fontFamily: 'Arial',
			fontSize: 60,
			fill: 'green',
			align: 'center',
			stroke: '#FFFFFF',
			strokeThickness: 6
	});
	incorrectText = new PIXI.Text('', {
			fontWeight: 'bold',
			fontFamily: 'Arial',
			fontSize: 60,
			fill: color,
			align: 'center',
			stroke: '#FFFFFF',
			strokeThickness: 6
	});
	firstText = new PIXI.Text('', {
			fontWeight: 'bold',
			fontFamily: 'Snippet',
			fontSize: 35,
			fill: color,
			align: 'left',
			stroke: '#FFFFFF',
			strokeThickness: 6
	});
	secondText = new PIXI.Text('', {
			fontWeight: 'bold',
			fontFamily: 'Snippet',
			fontSize: 35,
			fill: color,
			align: 'left',
			stroke: '#FFFFFF',
			strokeThickness: 6
	});
	thirdText = new PIXI.Text('Press enter to begin!', {
			fontWeight: 'bold',
			fontFamily: 'Snippet',
			fontSize: 35,
			fill: color,
			align: 'left',
			stroke: '#FFFFFF',
			strokeThickness: 6
	});

	scoreText.position.set(20);

	// Setting the anchor point to 0.5 to center align the text
	mainText.anchor.set(0.5);
	mainText.x = app.renderer.width / 2;
	mainText.y = app.renderer.height / 2 * .5;

	namePromptText.anchor.set(0.5);
	namePromptText.x = app.renderer.width / 2;
	namePromptText.y = app.renderer.height / 2 * 1;

	nameInputText.anchor.set(0.5);
	nameInputText.x = app.renderer.width / 2;
	nameInputText.y = app.renderer.height / 2 * 1.25;

	correctText.anchor.set(0.5);
	correctText.x = app.renderer.width / 2;
	correctText.y = app.renderer.height / 2 * 1;

	incorrectText.anchor.set(0.5);
	incorrectText.x = app.renderer.width / 2;
	incorrectText.y = app.renderer.height / 2 * 1;

	firstText.anchor.set(0.5);
	firstText.x = app.renderer.width / 2;
	firstText.y = app.renderer.height / 2 * 1;

	//If optionInc == 0, spelling, else if 1, guided
	secondText.anchor.set(0.5);
	secondText.x = app.renderer.width / 2;
	secondText.y = app.renderer.height / 2 * 1.25;

	thirdText.anchor.set(0.5);
	thirdText.x = app.renderer.width / 2;
	thirdText.y = app.renderer.height / 2 * 1.5;

	app.stage.addChild(scoreText, mainText, namePromptText, nameInputText, correctText, incorrectText, firstText, secondText, thirdText);	
}

function winGame() {
	gameOver = true;
	computerSpeak("Awesome, " + displayName + ", you win! To submit your score to the high scores table, press the spacebar. Otherwise, press enter or say restart to play again.", true);
}

function changeBG(i) {
	app.stage.removeChild(background);
	background = PIXI.Sprite.fromImage('media/images/bg' + i + '.jpg');
	background.width = app.renderer.width;
	background.height = app.renderer.height;
	app.stage.addChild(background);
	app.stage.addChild(scoreText, mainText, namePromptText, nameInputText, correctText, incorrectText, firstText, secondText, thirdText);
}

function changeColor(color) {
    app.stage.removeChild(scoreText, mainText, namePromptText, nameInputText, correctText, incorrectText, firstText, secondText, thirdText);
    createText(color);
}

function resetGame() {
	//backgroundMusic.stop();
	hasPlayAgain = true;
	resetValues();
	changeBG(1);
	changeColor("red");
	computerSpeak("Welcome back, " + displayName + "! Which game mode would you like to play next? Use your arrow keys to select!", true);
    //computerSpeak("What is your name?", false);
}

function nameChosen() {
	choosingName = false;
	if (!hasPlayAgain) {
		computerSpeak("Nice to meet you", true);
	}
	computerSpeak(displayName + ", select your game mode by using the arrow keys and then pressing enter", false);
	choosingMode = true;
}

function modeChosen() {
	choosingMode = false;

	//var promptLocation = suggestedPrompt[suggestedPromptInc];
	
	var promptRef = db.ref().child("suggestions/" + suggestedPrompt[suggestedPromptInc]);

	//Retrieves new posts as they are added to the database
	promptRef.on("child_added", function(snapshot, prevChildKey) {
		var newPost = snapshot.val();
		console.log(newPost.uSuggestion);
		prompt.push(newPost.uSuggestion);
	});

	computerSpeak("Hey, " + displayName + ", please spell", true);
	speakPrompt();
}

function cyclePrompt(direction) {
		suggestedPromptInc = suggestedPromptInc + direction;
		pushSecondText(suggestedPrompt[suggestedPromptInc]);
		console.log(suggestedPrompt[suggestedPromptInc]);
		computerSpeak(suggestedPrompt[suggestedPromptInc], true);
		//for (var i = 0; i < prompt.length(); i++) {
		//}
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

		if (isModalOpen) {
			return;
		}

		else if (choosingName) {
			nameChosen();
		}

		else if (choosingMode) {
			modeChosen();
		}

		else if (gameOver) {
			//hasPlayAgain = true;
			return resetGame();
		}

		else {
			keyValue = "enter";
		}
	}

	else if (e.keyCode == 16) {
		//keyValue = "shift";
	}

	else if (e.keyCode == 32) {
		if (gameOver) {
			displaySnackbar();
			computerSpeak("Thank you, " + displayName + ", for submitting your high score!", true);

			if (displayName == "") {
				displayName = $("#nameInput").val();
			}
			var score = points;

			var scorePush = db.ref().child("scores");

			scorePush.push().set({
			uName: xssFilters.inHTMLData(displayName),
			//uRating: rating,
			uScore: xssFilters.inHTMLData(score)
			});
		}
		else if (!choosingName && !choosingMode) {
			speakPrompt();
		}
		//keyValue = "space";
	}

	else if (e.keyCode == 37) {
		//keyValue = "left";

		if (choosingMode && (suggestedPromptInc > 0)) {
			cyclePrompt(-1);
			//suggestedPromptInc--;
		}
		else {
			computerSpeak(suggestedPrompt[suggestedPromptInc] + " is the first word", true);
		}
	}

	else if (e.keyCode == 38) {
		//keyValue = "up";
	}

	else if (e.keyCode == 39) {
		//keyValue = "right";

		if (choosingMode && (suggestedPromptInc < suggestedPrompt.length-1)) {
			cyclePrompt(1);
			//suggestedPromptInc++;
		}
		else {
			computerSpeak(suggestedPrompt[suggestedPromptInc] + " is the last word", true);
		}
	}

	else if (e.keyCode == 40) {
		//keyValue = "down";
	}

	else if (e.keyCode == 48) {//1
		//keyValue = "0";
		computerSpeak("Voice control menu: Say mute to mute the music, say skip to skip a question, say restart to restart the game", true);
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
		computerSpeak("Keyboard control menu: Press 1 to heat the prompt, press 2 to skip a question, press 3 to restart the game.", true);
	}

	else if ((e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 97 && e.keyCode <= 122)) {
		//keyValue is A-Z or a-z
		keyValue = String.fromCharCode(event.keyCode).toLowerCase();// Converts Unicode value into a character
	}

	else {
		//invalid key
	}

	if (keyValue != "") {
		computerSpeak(keyValue, true);
	}

	if (!isModalOpen) {
		wordMaker(keyValue);
	}
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

	if (!choosingName && !choosingMode && !gameOver) {

		var lastCharacter = false;
		if (word.length == getPrompt().length-1) {
			lastCharacter = true;
		}

		if (newKeyValue != getPrompt().charAt(word.length).toLowerCase()) {
			spellingErrorAt = (word.length);
			//computerSpeak("Spelling error at location " + spellingErrorAt, true);
			//computerSpeak("You selected " + newKeyValue + ". The correct letter is " + getPrompt().charAt(word.length).toLowerCase(), true);

			var correctMap = getPrompt().charAt(word.length).toLowerCase() + "Map";
			computerSpeak("Try " + window[correctMap].get(newKeyValue) + ". The correct letter is " + getPrompt().charAt(word.length).toLowerCase(), true);
		}
		else {
			word[word.length] = newKeyValue;
			setTimeout(function(){ 
				if (lastCharacter) {
					checkAnswer();
					word = new Array();
				} 
			}, 50);
			/*if (lastCharacter) {
				checkAnswer();
				word = new Array();
			}*/
			return;
		}
	}
	else {
		word[word.length] = newKeyValue;
	}

	/*if (word.length < spellingErrorAt+1) {
		spellingErrorAt = null;
	}

	if ((spellingErrorAt != null) && (word[spellingErrorAt] == getPrompt().charAt(spellingErrorAt))) {
		spellingErrorAt = null;
	}

	else if ((spellingErrorAt != null) && (word[spellingErrorAt] != getPrompt().charAt(spellingErrorAt))) {
		return;
	}

	else if (!choosingName && !choosingMode && (word[word.length-1] != getPrompt().charAt(word.length-1).toLowerCase())) {
		spellingErrorAt = (word.length-1);
		computerSpeak("Spelling error at location " + spellingErrorAt, true);
	}

	else {
		return;
	}*/
}

window.onkeyup = function() {
	keyPressed = false;
}
