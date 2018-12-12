let outputP;
function setup() { 
noCanvas();
background(255);
textAlign(LEFT, TOP);
textSize(32);
outputP = createP("Click to generate");
} 
function draw() { 
}
function keyPressed() {
mousePressed();
}
function mousePressed() {
var grammar = tracery.createGrammar(grammarSource);
grammar.addModifiers(tracery.baseEngModifiers);
var output = grammar.flatten("#origin#");
outputP.html(output);
}
var grammarSource = {
"story": ["#hero.capitalize# always wanted to be a  #occupation#, but being a dwarf was  #heroTheir# eternal misery. #hero.capitalize# wanted to #didStuff#, then #didStuff#,and then #heroThey# just stopped dreaming and went back to be a slave of Snow White forever."]
,	"name": ["Dopy","Bashful","Sneezy","Sleepy","Happy","Grumpy"]
,	"activity": ["make coffee","arrange schedules","prepare lunch for #heroTheirs# boss","wear fancy clothes","be smart"]
, "setPronouns": ["[heroThey:their][heroThem:them][heroTheir:their][heroTheirs:theirs]","[heroThey:she][heroThem:her][heroTheir:her][heroTheirs:hers]","[heroThey:he][heroThem:him][heroTheir:his][heroTheirs:his]"]
,	"setOccupation": ["[occupation: ophthamologist][didStuff: operate eyes,help people,save lifes,feel important]","[occupation:secretary][didStuff: #activity#, #activity#, #activity#]"]
, "origin": ["#[#setPronouns#][#setOccupation#][hero:#name#]story#"]
};let outputP;
function setup() { 
noCanvas();
background(255);
textAlign(LEFT, TOP);
textSize(24);
outputP = createP("Click to generate");
} 
function draw() { 
}
function keyPressed() {
mousePressed();
}
function mousePressed() {
var grammar = tracery.createGrammar(grammarSource);
grammar.addModifiers(tracery.baseEngModifiers);
var output = grammar.flatten("#origin#");
outputP.html(output);
}
var grammarSource = {
"name": ["Arjun","Yuuma","Darcy","Mia","Chiaki","Izzi","Azra","Lina"]
,	"animal": ["unicorn","raven","sparrow","scorpion","coyote","eagle","owl","lizard","zebra","duck","kitten"]
,	"occupationBase": ["wizard","witch","detective","ballerina","criminal","pirate","lumberjack","spy","doctor","scientist","captain","priest"]
,	"occupationMod": ["occult ","space ","professional ","gentleman ","erotic ","time ","cyber","paleo","techno","super"]
,	"strange": ["mysterious","portentous","enchanting","strange","eerie"]
,	"tale": ["story","saga","tale","legend"]
,	"occupation": ["#occupationMod##occupationBase#"]
,	"mood": ["vexed","indignant","impassioned","wistful","astute","courteous"]
,	"setPronouns": ["[heroThey:they][heroThem:them][heroTheir:their][heroTheirs:theirs]","[heroThey:she][heroThem:her][heroTheir:her][heroTheirs:hers]","[heroThey:he][heroThem:him][heroTheir:his][heroTheirs:his]"]
,	"setSailForAdventure": ["set sail for adventure","left #heroTheir# home","set out for adventure","went to seek #heroTheir# forture"]
,	"setCharacter": ["[#setPronouns#][hero:#name#][heroJob:#occupation#]"]
,	"openBook": ["An old #occupation# told #hero# a story. 'Listen well' she said to #hero#, 'to this #strange# #tale#. ' #origin#'","#hero# went home.","#hero# found an ancient book and opened it.  As #hero# read, the book told #strange.a# #tale#: #origin#"]
,	"story": ["#hero# the #heroJob# #setSailForAdventure#. #openBook#"]
,	"origin": ["Once upon a time, #[#setCharacter#]story#"]
}
};let outputP;
function setup() { 
noCanvas();
background(255);
textAlign(LEFT, TOP);
textSize(24);
outputP = createP("Click to generate");
} 
function draw() { 
}
function keyPressed() {
mousePressed();
}
function mousePressed() {
var grammar = tracery.createGrammar(grammarSource);
grammar.addModifiers(tracery.baseEngModifiers);
var output = grammar.flatten("#origin#");
outputP.html(output);
}
var grammarSource = {
"origin": "#interjection.capitalize#, #name#! I'm #profession.a#, not #profession.a#!",
"interjection": ["alas", "congratulations", "eureka", "fiddlesticks",
"good grief", "hallelujah", "oops", "rats", "thanks", "whoa", "yes"],
"name": ["Jim", "John", "Tom", "Steve", "Kevin", "Gary", "George", "Larry"],
"profession": [
"accountant",
"actor",
"archeologist",
"astronomer",
"audiologist",
"bartender",
"butcher",
"carpenter",
"composer",
"crossing guard",
"curator",
"detective",
"economist",
"editor",
"engineer",
"epidemiologist",
"farmer",
"flight attendant",
"forest fire prevention specialist",
"graphic designer",
"hydrologist",
"librarian",
"lifeguard",
"locksmith",
"mathematician",
"middle school teacher",
"nutritionist",
"painter",
"physical therapist",
"priest",
"proofreader",
"rancher",
"referee",
"reporter",
"sailor",
"sculptor",
"singer",
"sociologist",
"stonemason",
"surgeon",
"tailor",
"taxi driver",
"teacher assistant",
"teacher",
"teller",
"therapist",
"tour guide",
"translator",
"travel agent",
"umpire",
"undertaker",
"urban planner",
"veterinarian",
"web developer",
"weigher",
"welder",
"woodworker",
"writer",
"zoologist"
]
};var yoff = 0.0;
var muse = 2.5;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(0);
translate(width / 2, height / 2);
var radius = 150;
beginShape();
var xoff = 0;
for (var a = 0; a < TWO_PI; a += 0.1) {
var r = radius + offset;
var x = r * cos(a);
var y = r * sin(a);
ellipse(x,y,4,4);
xoff += 0.1;
}
endShape();
yoff += 0.01;
}var yoff = 0.0;
var muse = 2.5;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(0);
translate(width / 2, height / 2);
var radius = 150;
beginShape();
var xoff = 0;
for (var a = 0; a < TWO_PI; a += 0.1) {
var r = radius + offset;
var x = r * cos(a);
var y = r * sin(a);
ellipse(x,y,4,4);
xoff += 0.1;
}
endShape();
yoff += 0.01;
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
}function setup() { 
createCanvas(400, 400);
} 
function touchMoved() { 
strokeWeight(10);
console.log(mouseX);
fill(0,255,0);
return false;
}var mic, recorder, soundFile;
let start, stop, play;
function setup() {
background(0);
mic = new p5.AudioIn();
mic.start();
console.log(mic);
recorder = new p5.SoundRecorder();
recorder.setInput(mic);
soundFile = new p5.SoundFile();
createCanvas(200, 400);
start = createButton('Start');
start.mousePressed(startRec);
stop = createButton('Stop');
stop.mousePressed(stopRec);
play = createButton('play');
play.mousePressed(playit);
stop = createButton('stop');
stop.mousePressed(stopit);
}
function startRec() {
recorder.record(soundFile);
}
function stopRec() {
recorder.stop();
}
function playit() {
soundFile.loop();
}
function stopit() {
soundFile.stop();
}var mic, recorder, soundFile;
let start, stop, play;
function setup() {
background(0);
mic = new p5.AudioIn();
mic.start();
console.log(mic);
recorder = new p5.SoundRecorder();
recorder.setInput(mic);
soundFile = new p5.SoundFile();
createCanvas(200, 400);
start = createButton('Start');
start.mousePressed(startRec);
stop = createButton('Stop');
stop.mousePressed(stopRec);
play = createButton('play');
play.mousePressed(playit);
stop = createButton('stop');
stop.mousePressed(stopit);
}
function startRec() {
recorder.record(soundFile);
}
function stopRec() {
recorder.stop();
}
function playit() {
soundFile.loop();
}
function stopit() {
soundFile.stop();
}var mic, recorder, soundFile;
let start, stop, play;
var song;
var button;
var silence;
var video;
var trackColor;
function preload() {
silence = loadImage("silence2.png");
}
function setup() {
createCanvas(320, 240);
pixelDensity(1);
video = createCapture(VIDEO);
video.size(width, height);
video.hide();
trackColor = [153, 0, 0];
mic = new p5.AudioIn();
mic.start();
console.log(mic);
recorder = new p5.SoundRecorder();
recorder.setInput(mic);
soundFile = new p5.SoundFile();
start = createButton('Startrecord');
start.mousePressed(startRec);
stop = createButton('Stoprecord');
stop.mousePressed(stopRec);
play = createButton('play or add');
play.mousePressed(playit);
stop = createButton('stop the whole thing');
stop.mousePressed(stopit);
}
function startRec() {
recorder.record(soundFile);
}
function shutup(){
if (isTracking == 1 && soundFile.isPlaying) {
soundFile.stop();
}
}
function stopRec() {
recorder.stop();
}
function playit() {
soundFile.loop();
}
function stopit() {
soundFile.stop();
}
function draw() {
image(video, 0, 0);
video.loadPixels();
var worldRecord = 500;
var closestX = 0;
var closestY = 0;
for (var y = 0; y < video.height; y++) {
for (var x = 0; x < video.width; x++) {
var loc = (x + y * video.width) * 4;
var r1 = video.pixels[loc];
var g1 = video.pixels[loc + 1];
var b1 = video.pixels[loc + 2];
var r2 = trackColor[0];
var g2 = trackColor[1];
var b2 = trackColor[2];
if (d < worldRecord) {
worldRecord = d;
closestX = x;
closestY = y;
}
}
}
if (worldRecord < 50) {
isTracking = 1;
image(silence, closestX - 50, closestY - 60);
strokeWeight(4.0);
stroke(0);
} else {
isTracking = 0;
}
shutup();
}
var recorder;
var soundFile;
var mic;
var song;
var button;
var jumpButton;
var silence;
var video;
var trackColor;
function preload() {
silence = loadImage("silence2.png");
}
function setup() {
createCanvas(320, 240);
pixelDensity(1);
video = createCapture(VIDEO);
video.size(width, height);
video.hide();
trackColor = [255, 0, 0];
song = loadSound("native.mp3", loaded);
button = createButton("play");
button.mousePressed(togglePlaying);
jumpButton = createButton("jump");
jumpButton.mousePressed(jumpSong);
mic.start();
recorder = new p5.SoundRecorder();
recorder.setInput(mic);
soundFile = new p5.SoundFile();
if (state === 0 && mic.enabled) {
recorder.record(soundFile);
} else if (state === 1) {
recorder.stop(); 
state++;
} else if (state === 2) {
state++;
}
}
}
function loaded() {
console.log("loaded");
song.play();
}
function togglePlaying() {
song.play();
song.setVolume(0.6);
}
function jumpSong() {
var len = song.duration();
var t = random(len);
console.log(t);
song.jump(t);
}
function draw() {
image(video, 0, 0);
video.loadPixels();
var worldRecord = 500;
var closestX = 0;
var closestY = 0;
for (var y = 0; y < video.height; y++) {
for (var x = 0; x < video.width; x++) {
var loc = (x + y * video.width) * 4;
var r1 = video.pixels[loc];
var g1 = video.pixels[loc + 1];
var b1 = video.pixels[loc + 2];
var r2 = trackColor[0];
var g2 = trackColor[1];
var b2 = trackColor[2];
if (d < worldRecord) {
worldRecord = d;
closestX = x;
closestY = y;
}
}
}
if (worldRecord < 120) {
fill(trackColor);
image(silence, closestX - 50, closestY - 60);
strokeWeight(4.0);
stroke(0);
ellipse(closestX, closestY, 16, 16);
}
}
function mousePressed() {
trackColor = video.get(mouseX, mouseY);
console.log(trackColor);
function preload() {
ear = loadImage("ear2.png");
}
var mic;
var video;
function setup() {
createCanvas(windowWidth, windowHeight);
video = createCapture(VIDEO);
video.hide();
mic = new p5.AudioIn();
mic.start();
setupeye();
angleMode(DEGREES);
}
function draw() {
background(51, 204, 204);
img = createCapture(VIDEO);
var vol = mic.getLevel(); 
fill(255);
ellipse(300, 300, vol * 6000, vol * 5000);
let col = video.get( mouseX,mouseY);
fill(col);
ellipse(mouseX,mouseY,60);
}
var song;
var button;
var amp;
function setup() {
createCanvas(200, 200);
song = loadSound("rainbow.mp3", loaded);
amp = new p5.Amplitude();
background(51);
}
function loaded() {
button = createButton("play");
button.mousePressed(togglePlaying);
}
function draw() {
background(51);
var vol = amp.getLevel();
var diam = map(vol, 0, 0.3, 10, 200);
fill(255, 0, 255);
ellipse(width / 2, height / 2, diam, diam);
}
function togglePlaying() {
if (!song.isPlaying()) {
song.play();
song.setVolume(0.3);
button.html("pause");
} else {
song.stop();
button.html("play");
}
let lineX = 0;
let issX = 0;
let issY = 0;
function preload() {
}
function setup() {
createCanvas(600, 600);
setInterval(askISS, 1000);
}
function askISS () {
loadJSON(url, gotData, 'jsonp');
}
let lat = data.iss_position.latitude;
let long = data.iss_position.longitude;
issX = map(lat, 25, 30, 0, windowWidth);
}
function draw() {
background(0, 153, 204);
image(brain, issX, issY, brain.width/5, brain.height/5);
stroke(255);
line( lineX,0,lineX,height);
lineX = lineX +5;
if (lineX > width) {
lineX = 0
}
}
let img;
function setup() { 
createCanvas(400, 400);
background(0);
img = createCapture(VIDEO);
} 
function draw () {
let x = floor(random(width));
let y = floor(random(height));
let col = img.get( x,y);
fill(col);
rect(x,y,20,20);
x += random(-50,50);
y += random(-50,50);
x = constrain(x, 0, width);
y = constrain(y, 0, height);
}let img;
function preload(){
img  = loadImage ('orwellcool.png');
}
function setup() { 
createCanvas(400, 400);
background(0);
} 
function draw () {
let col = img.get( mouseX,mouseY);
fill(col);
ellipse(mouseX,mouseY,60);
}function preload() {
plant = loadImage("plant.png");
}
var button1;
function mousePressed () {
}
function setup() {
createCanvas(windowWidth, windowHeight);
background(204, 204, 204);
button1 = createButton('Yes. It is green.');
button1.id("button1");
button1.position(1200, 400);
button2 = createButton('I am not quite sure.');
button2.position(1200, 500);
button3_box = createDiv('   ');
button3_box.id("blueButtonHolder");
button3 = createButton('No. It is blue.');
button3.id("button3");
button3.position(1200, 600);
}
function button2Pressed() {
background(255, 0,0);
textStyle(BOLD);
fill(0, 0, 255);
textSize(32);
text(' Incorrect. Thought criminal detected. ', 720, 500);
}
function button1Pressed() {
background(0, 0, 255);
textStyle(BOLD);
fill(255, 0, 0);
textSize(32);
text(' Correct. Go back to work. ', 720, 500);
}
var valueToSend;
function changeBG() {
var val = random(255);
valueToSend = int(map(val, 0, 255, 0, 180));
}
function draw() {
draweye();
img.resize(200, 200);
image(img, width / 2, 60);
image(plant, 310, 0);
textStyle(BOLD);
noStroke();
fill(204, 51, 0);
textSize(32);
text(' BIG BROTHER SAYS THIS PLANT IS GREEN. \n DO YOU AGREE? ', width / 2 +100 , 300);
}
for (var i = 0; i < portList.length; i++) {
}
}
}
function onError(err) {
var button1;
function mousePressed () {
}
function setup() {
createCanvas(windowWidth, windowHeight);
background(204, 204, 204);
button1 = createButton('Yes. It is green.');
button1.id("button1");
button1.position(1200, 400);
button2 = createButton('I am not quite sure.');
button2.position(12, 500);
button3_box = createDiv('   ');
button3_box.id("blueButtonHolder");
button3 = createButton('No. It is blue.');
button3.id("button3");
button3.position(1200, 600);
}
function button2Pressed() {
background(255, 0,0);
textStyle(BOLD);
fill(0, 0, 255);
textSize(32);
text(' Incorrect. Thought criminal detected. ', 500, 500);
}
function button1Pressed() {
background(0, 0, 255);
textStyle(BOLD);
fill(255, 0, 0);
textSize(32);
text(' Correct. Go back to work. ', 500, 500);
}
var valueToSend;
function changeBG() {
var val = random(255);
valueToSend = int(map(val, 0, 255, 0, 180));
}
function draw() {
draweye();
img.resize(200, 200);
image(img, width / 2, 60);
textStyle(BOLD);
noStroke();
fill(204, 51, 0);
textSize(32);
text(' BIG BROTHER SAYS THIS PLANT IS GREEN. \n DO YOU AGREE? ', width / 2, 300);
}
for (var i = 0; i < portList.length; i++) {
}
}
}
function onError(err) {
var button1;
function mousePressed () {
}
function setup() {
createCanvas(windowWidth, windowHeight);
background(204, 204, 204);
button1 = createButton('Yes. It is green.');
button1.id("button1");
button1.position(1200, 400);
button2 = createButton('I am not quite sure.');
button2.position(12, 500);
button3_box = createDiv('   ');
button3_box.id("blueButtonHolder");
button3 = createButton('No. It is blue.');
button3.id("button3");
button3.position(1200, 600);
}
function button2Pressed() {
background(255, 0,0);
textStyle(BOLD);
fill(0, 0, 255);
textSize(32);
text(' Incorrect. Thought criminal detected. ', 500, 500);
}
function button1Pressed() {
background(0, 0, 255);
textStyle(BOLD);
fill(255, 0, 0);
textSize(32);
text(' Correct. Go back to work. ', 500, 500);
}
var valueToSend;
function changeBG() {
var val = random(255);
valueToSend = int(map(val, 0, 255, 0, 180));
}
function draw() {
draweye();
img.resize(200, 200);
image(img, width / 2, 60);
textStyle(BOLD);
noStroke();
fill(204, 51, 0);
textSize(32);
text(' BIG BROTHER SAYS THIS PLANT IS GREEN. \n DO YOU AGREE? ', width / 2, 300);
}
for (var i = 0; i < portList.length; i++) {
}
}
}
function onError(err) {
var button1;
function mousePressed () {
}
function setup() {
createCanvas(windowWidth, windowHeight);
background(204, 204, 204);
button1 = createButton('Yes. It is green.');
button1.id("button1");
button1.position(1200, 400);
button2 = createButton('I am not quite sure.');
button2.position(12, 500);
button3_box = createDiv('   ');
button3_box.id("blueButtonHolder");
button3 = createButton('No. It is blue.');
button3.id("button3");
button3.position(1200, 600);
}
function button2Pressed() {
background(255, 0,0);
textStyle(BOLD);
fill(0, 0, 255);
textSize(32);
text(' Incorrect. Thought criminal detected. ', 500, 500);
}
function button1Pressed() {
background(0, 0, 255);
textStyle(BOLD);
fill(255, 0, 0);
textSize(32);
text(' Correct. Go back to work. ', 500, 500);
}
var valueToSend;
function changeBG() {
var val = random(255);
valueToSend = int(map(val, 0, 255, 0, 180));
}
function draw() {
draweye();
img.resize(200, 200);
image(img, width / 2, 60);
textStyle(BOLD);
noStroke();
fill(204, 51, 0);
textSize(32);
text(' BIG BROTHER SAYS THIS PLANT IS GREEN. \n DO YOU AGREE? ', width / 2, 300);
}
for (var i = 0; i < portList.length; i++) {
}
}
}
function onError(err) {
var button1;
function setup() {
createCanvas(windowWidth, windowHeight);
background(204, 204, 204);
button1 = createButton('Yes. It is green.');
button1.id("button1");
button1.position(1200, 400);
button2 = createButton('I am not quite sure.');
button2.position(1200, 500);
button3_box = createDiv('   ');
button3_box.id("blueButtonHolder");
button3 = createButton('No. It is blue.');
button3.id("button3");
button3.position(1200, 600);
}
function button2Pressed() {
background(255, 0,0);
textStyle(BOLD);
fill(0, 0, 255);
textSize(32);
text(' Incorrect. Thought criminal detected. ', 500, 500);
}
function button1Pressed() {
background(0, 0, 255);
textStyle(BOLD);
fill(255, 0, 0);
textSize(32);
text(' Correct. Go back to work. ', 500, 500);
}
var valueToSend;
function changeBG() {
var val = random(255);
valueToSend = int(map(val, 0, 255, 0, 180));
}
function draw() {
draweye();
img.resize(200, 200);
image(img, width / 2, 60);
textStyle(BOLD);
noStroke();
fill(204, 51, 0);
textSize(32);
text(' BIG BROTHER SAYS THIS PLANT IS GREEN. \n DO YOU AGREE? ', width / 2, 300);
}
for (var i = 0; i < portList.length; i++) {
}
}
}
function onError(err) {
var button1;
function setup() {
createCanvas(windowWidth, windowHeight);
background(0);
button1 = createButton('Yes. It is green.');
button1.id("button1");
button1.position(1200, 400);
button2 = createButton('I am not quite sure.');
button2.position(1200, 500);
button3_box = createDiv('   ');
button3_box.id("blueButtonHolder");
button3 = createButton('No. It is blue.');
button3.position(1200, 600);
}
function button2Pressed() {
}
function button1Pressed() {
background(0, 0, 255);
textStyle(BOLD);
fill(255, 0, 0);
textSize(32);
text(' Correct. Go back to work. ', 500, 500);
}
var valueToSend;
function changeBG() {
var val = random(255);
valueToSend = int(map(val, 0, 255, 0, 180));
}
function draw() {
draweye();
img.resize(200, 200);
image(img, width / 2, 60);
textStyle(BOLD);
noStroke();
fill(102, 153, 0);
textSize(32);
text(' Big Brother says this plant is green. Do you agree? ', width / 2, 300);
}
for (var i = 0; i < portList.length; i++) {
}
}
}
function onError(err) {
var button1;
function setup() {
createCanvas(windowWidth, windowHeight);
setupeye();
background(0);
button1 = createButton('Yes. It is green.');
button1.position(20, 350);
button2 = createButton('I am not quite sure.');
button2.position(20, 300);
button3_box = createDiv('   ');
button3_box.id("blueButtonHolder");
button3 = createButton('No. It is blue.');
button3.id("button3");
}
function button2Pressed(){
}
function button1Pressed(){
background(0,0,255);
textSize(32);
text( ' blablabla', width/2, height/2);
}
var valueToSend;
function changeBG() {
var val = random(255);
valueToSend = int(map(val, 0, 255, 0, 180));
}
function draw() {
draweye();
}
for (var i = 0; i < portList.length; i++) {
}
}
}
function onError(err) {
}var bbs = [];
function setup() {
createCanvas(windowWidth, windowHeight);
for (let i = 0; i < 1; i++) {
bbs[i] = new Bb();
}
}
function draw() {
background(220);
for (let i = 0; i < bbs.length; i++) {
bbs[i].move();
bbs[i].display();
}
}
function Bb() {
this.y = random(0, height);
this.display = function() {
var xpupil = map(mouseX, 0, width, 240, 360);
var ypupil = map(mouseY, 0, height, 310, 380);
this.x = mouseX;
line(130, 200, 170, 220);
line(120, 234, 160, 250);
stroke(5);
strokeWeight(10);
fill(168, 200, 200, 100);
stroke(3);
noFill();
beginShape();
vertex(140, 142);
vertex(240, 90);
vertex(460, 205);
endShape(CLOSE);
}
this.move = function() {
}
}var bbs = [];
function setup() {
createCanvas(windowWidth, windowHeight);
for (let i = 0; i < 1; i++) {
bbs[i] = new Bb();
}
}
function draw() {
background(220);
for (let i = 0; i < bbs.length; i++) {
bbs[i].move();
bbs[i].display();
}
}
function Bb() {
this.y = random(0, height);
this.display = function() {
var xpupil = map(mouseX, 0, width, 240, 360);
var ypupil = map(mouseY, 0, height, 310, 380);
this.x = mouseX;
line(130, 200, 170, 220);
line(120, 234, 160, 250);
stroke(5);
strokeWeight(10);
fill(168, 200, 200, 100);
stroke(3);
noFill();
beginShape();
vertex(140, 142);
vertex(240, 90);
vertex(460, 205);
endShape(CLOSE);
}
this.move = function() {
}
var txt;
var textbox;
var eternalparagraph;
var paragraph;
function setup() {
createCanvas(windowWidth, windowHeight /2);
background(0);
button1 = createButton('Yes. It is green.');
button1.position(20, 350);
button2 = createButton('I am not quite sure.');
button2.position(20, 300);
button3_box = createDiv('   ');
button3_box.id("blueButtonHolder");
button3 = createButton('No. It is blue.');
button3.id("button3");
paragraph = createP (' Your name ' );
textbox = createInput( ' Write your name here ' );
}
function dosmthng () {
paragraph.html (textbox.value());
eternalparagraph = createP( ' have been compelled to ThoughCrime supervision ' );
}
function button1Pressed() {
s = "Correct. Now you can go back to work.";
background("blue");
fill("red");
textSize(70);
textStyle(BOLD);
text(s, 180, 500, windowWidth, windowHeight);
}
function button2Pressed() {
s2 = "Incorrect. !! Thought criminal detected!! ";
background("red");
fill("blue");
textSize(70);
textStyle(BOLD);
text(s2, 180, 500, windowWidth, windowHeight);
}
var valueToSend;
function changeBG() {
var val = random(255);
valueToSend = int(map(val, 0, 255, 0, 180));
}
function draw() {
}
for (var i = 0; i < portList.length; i++) {
}
}
}
function onError(err) {
var button1;
function setup() {
createCanvas(windowWidth, windowHeight);
background(0);
button1 = createButton('Yes. It is green.');
button1.position(20, 350);
button2 = createButton('I am not quite sure.');
button2.position(20, 300);
button3_box = createDiv('   ');
button3_box.id("blueButtonHolder");
button3 = createButton('No. It is blue.');
button3.id("button3");
}
function button3Pressed(){
}
var valueToSend;
function changeBG() {
var val = random(255);
valueToSend = int(map(val, 0, 255, 0, 180));
}
function draw() {
}
for (var i = 0; i < portList.length; i++) {
}
}
}
function onError(err) {
}
var button1;
function setup() {
createCanvas(400, 400);
background(0);
button1 = createButton('Yes. It is green.');
button1.position(20, 350);
button2 = createButton('I am not quite sure.'); 
button2.position(20, 300);
button3 = createButton('No. It is blue.'); 
button3.position(20, 250);
}
var valueToSend;
function changeBG() {
var val = random(255);
valueToSend = int(map(val,0,255,0,180));
}
function draw() {
}
for (var i = 0; i < portList.length; i++) {
}
}
}
function onError(err){
}
let data;
function preload() {
}
function setup() { 
createCanvas(400, 400);
background(0);
createP(data.description);
for ( let i = 0; i < data.dogs.length; i ++) {
fill (255);
textAlign(CENTER);
text(data.dogs[i], random(width), random(height));
} 
console.log(data);
}
var inData; 
var sun;
var slider;
var checkbox;
function setup() {
createCanvas(400, 400);
sun = new Sun();
slider = createSlider(0, 200, 100);
checkbox = createCheckbox('Where is the sun', false);
} 
function draw() { 
background(172, 205, 164);
angleMode(DEGREES);
noStroke();
fill(300, 216, 178);
if(checkbox.checked() == true){
sun.display(slider.value());
}
fill(96, 44, 2);
}
var sun;
var slider;
var checkbox;
function setup() {
createCanvas(400, 400);
sun = new Sun();
slider = createSlider(0, 200, 100);
checkbox = createCheckbox('Where is the sun', false);
} 
function draw() { 
background(172, 205, 164);
angleMode(DEGREES);
noStroke();
fill(300, 216, 178);
if(checkbox.checked() == true){
sun.display(slider.value());
}
fill(96, 44, 2);
}
}
}
var posX=0,posY=0, step = 10;
var sun;
var slider;
var checkbox;
function setup() {
createCanvas(320, 240);
sun = new Sun();
slider = createSlider(0, 200, 100);
checkbox = createCheckbox('Where is the sun', false);
} 
function draw() { 
background(172, 205, 164);
noStroke();
fill(300, 216, 178);
ellipse(200, 400, 600, 200);
if(checkbox.checked() == true){
sun.display(slider.value());
}
fill(96, 44, 2);
}
var inData;
var sun;
var slider;
var checkbox;
function setup() {
createCanvas(400, 400);
sun = new Sun();
slider = createSlider(0, 1024, 100);
checkbox = createCheckbox('Where is the sun', false);
}
function draw() {
background(172, 205, 164);
angleMode(DEGREES);
noStroke();
fill(300, 216, 178);
if (checkbox.checked() == true) {
sun.display(slider.value());
}
fill(96, 44, 2);
}
Introduction to Physical Computing
ITP
This sketch will send one binary byte from P5 to arduino
See arduino code in bottom, have LED connected to pin 3
function setup() {
createCanvas(255, 255);
}
function draw() {
background(255,0,0);
var byteToSend = mouseX;
byteToSend = map(byteToSend, 0, width, 0, 255);
}
for (var i = 0; i < portList.length; i++) {
}
}
}
void setup() {
}
void loop() {
}
}
Introduction to Physical Computing
ITP
This sketch will send one value in ascii from arduino to P5
function setup() {
createCanvas(320, 240);
}
function draw() {
background(255);
}
for (var i = 0; i < portList.length; i++) {
}
}
}
}
void setup() {
}
void loop() {
int analogValue = analogRead(A0);
delay(50);
}
var sun;
var slider;
var checkbox;
function setup() {
createCanvas(400, 400);
sun = new Sun();
slider = createSlider(0, 200, 100);
checkbox = createCheckbox('Where is the sun', false);
} 
function draw() { 
background(172, 205, 164);
noStroke();
fill(300, 216, 178);
ellipse(200, 400, 600, 200);
if(checkbox.checked() == true){
sun.display(slider.value());
}
fill(96, 44, 2);
}
}let bubble;
function setup() {
createCanvas(600, 500);
bubble = new Bubble();
}
function draw() {
background(0);
bubble.move();
bubble.show();
}
class Bubble {
constructor(x, y, r ) {
this.x = 44;
this.y = 44;
}
move() {
this.x = mouseX;
this.y = mouseY;
}
show() {
stroke(255);
strokeWeight(4);
noFill();
ellipse(this.x, this.y, 34);
}
}let hedgie1;
let slider;
function setup() {
createCanvas(600, 400);
slider = createSlider(0, 600, 86);
hedgie1 = new Hedgie(100, 100);
}
function draw() {
background(172, 205, 164);
fill(223, 216, 178);
rect(0, 270, 600, 200);
hedgie1.display();
hedgie1.move(slider.value());
}
function mousePressed() {
createP("Good job!");
}
var b1;
var b2;
function setup() {
createCanvas(600, 400);
b1 = new Bubble(250, 200);
b2 = new Bubble(350, 200);
}
function draw() {
background(0);
b1.update();
b2.update();
b1.display();
b2.display();
if (b1.intersects(b2)) {
b1.changeColor();
b2.changeColor();
}
}let bubble = [];
function setup() {
createCanvas(600, 500);
for ( let i = 0; i < 5; i++){
let x = random(width);
let y = random(height);
let r = random(42, 40);
let b = new Bubble(x, y, r);
bubble.push(b);
}
}
function mousePressed() {
for (let i = 0; i < bubble.length; i++) {
}
}
function draw() {
background(0);
for (let i = 0; i < bubble.length; i++) {
bubble[i].move();
bubble[i].show();
}
}
class Bubble {
constructor(x, y, r) {
this.x = 344;
this.y = 44;
this.brightness = 0;
}
clicked(px, py) {
this.brightness = 255;
}
}
move() {
this.x = this.x + random(-5, 5);
this.y = this.y + random(-5, 5);
}
show() {
stroke(255);
strokeWeight(4);
fill( this.brightness, 100);
ellipse(this.x, this.y, this.r * 2);
}
}let bubble = [];
function setup() {
createCanvas(600, 500);
}
function mousePressed() {
let r = random(10, 50);
let b = new Bubble(mouseX, mouseY, r);
bubble.push(b);
}
function draw() {
background(0);
for (let i = 0; i < bubble.length; i++) {
bubble[i].move();
bubble[i].show();
}
}
class Bubble {
constructor(x, y) {
this.x = 344;
this.y = 44;
}
move() {
this.x = this.x + random(-5, 5);
this.y = this.y + random(-5, 5);
}
show() {
stroke(255);
strokeWeight(4);
noFill();
ellipse(this.x, this.y, roo *2);
}
}var nums = [35, 58, 79, 90];
var index = 0;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(0);
for (var i = 0; i < 4; i++) {
stroke(255);
fill(51);
ellipse(i * 80 + 100, 200, nums[i], nums[i]);
}
}var words = ["egy", "kis", "malac", "roff", "rofff"," rofffff"];
var index = 0;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
fill ( 255);
textSize(34);
text(words[index],12,100);
}
function mousePressed() {
index = index + 1;
{
index = 0;
}
}let bubble;
function setup() {
createCanvas(600, 500);
bubble = new Bubble();
}
function draw() {
background(0);
bubble.move();
bubble.show();
}
class Bubble {
constructor(x, y, r ) {
this.x = 344;
this.y = 44;
}
move() {
this.x = this.x + random(-5, 5);
this.y = this.y + random(-5, 5);
}
show() {
stroke(255);
strokeWeight(4);
noFill();
ellipse(this.x, this.y, 34);
}
}function setup() { 
var km = milesToKm(26.3);
} 
function milesToKm (miles) {
var km = miles * 1.6;
return km;
let gravity = 0.1;
function setup() {
createCanvas(400, 400);
let button = createButton("submit");
button.mousePressed(addBall);
function addBall(){
bouncers.push(newBall(random(width),100));
}
}
function draw() {
background(220);
fill(30,20,30);
for (let i = 0; i < bouncers.length; i++) {
bouncers[i].render();
bouncers[i].update();
}
}
function mousePressed(){
bouncers.push(new Ball(mouseX, mouseY));
let gravity = 0.1;
function setup() {
createCanvas(400, 400);
for (let i = 0; i < 40; i++) {
bouncers[i] = new Ball(random(width), random(height), 5);
}
}
function draw() {
background(220);
fill(30,20,30);
for (let i = 0; i < bouncers.length; i++) {
bouncers[i].render();
bouncers[i].update();
}
}
function mouseDragged(){
bouncers.push(new Ball(mouseX, mouseY));
function setup() {
createCanvas(500,500);
}
function draw(){
}
function serverConnected() {
}
function portOpen() {
}
}
}
}
function portClose() {
}
for (var i = 0; i < portList.length; i++) {
}
}let img;
let kidsize = 1;
function setup() { 
createCanvas(400, 400);
background(0);
img = loadImage ('kid.jpg');
} 
function draw() { 
imageMode(CENTER);
tint (0,0,233);
image(img,200,200, kidsize, kidsize ++);
let gravity = 0.1;
function setup() {
createCanvas(400, 400);
bouncers[0]= new Ball (100,100);
bouncers[1] = new Ball(255,125);
}
function draw() {
background(220);
bouncers[0].render();
bouncers[1].render();
bouncers[0].update();
bouncers[1].update();
let x = 200;
let y = 20;
let speed = 0;
let gravity = 0.1;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
fill(0);
ellipse(x, y, 24, 24);
y = y + speed;
speed = speed + gravity;
if (y > height) {
y = height;
speed = -0.95 * speed;
}
}let movement = 0;
function setup() { 
createCanvas(400, 400);
background(20);
stroke(220);
noFill();
push();
translate(200,200);
rotate(movement);
lineFractal(0,0,200);
pop();
} 
function draw() { 
}
function lineFractal(x,y,diam){
if (diam > 5) {
ellipse( x, y, diam, diam );
lineFractal(x-diam/2,y,diam/2);
lineFractal(x+diam/2,y,diam/2);
}
}
let movement = 0;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(20);
stroke(220);
noFill();
movement= map (mouseX,0,width,0,2*PI);
push();
translate(200,200);
rotate(movement);
circleFractal(0,0,200);
pop();
}
function circleFractal(x,y,diam){
if (diam > 5) {
ellipse( x, y, diam, diam );
circleFractal(x-diam/2,y,diam/2);
circleFractal(x+diam/2,y,diam/2);
}
}
class Eye {
constructor(xPos, yPos){
this.x = xPos;
this.y = yPos;
this.speed = random(1, 10);
this.col = color(205, 255, 255);
}
display(){
fill(this.col);
ellipse(this.x, this.y, 10, 10); 
}
move(){
this.x = this.x + this.speed;
if(this.x > width || this.x < 0){
this.speed = this.speed * -1; 
}  
}
checkHowCloseTheMouseIs(){
var distance = dist(mouseX, mouseY, this.x, this.y);
if(distance < 100){
this.col = color(255,0,0);
}else{
this.col = color(255, 255, 255);
}
}
}
var all_our_copies = [];
function setup() { 
createCanvas(400, 400);
for(var i = 0; i < 500; i++){
all_our_copies.push( new Eye( random(width) , i * height/100)  );
}
} 
function draw() { 
background(220, 50);
for(var i = 0; i < 100; i++){
all_our_copies[i].display();
all_our_copies[i].move();
all_our_copies[i].checkHowCloseTheMouseIs();
}
function setup() {
createCanvas(700, 400);
angleMode(DEGREES);
}
function draw() {
background(220);
for (var row = 0; row < 3; row++) {
for (var column = 0; column < 3; column++) {
eye(100 + (column * 200), 70 + (row * 130), mouseX, mouseY);
}
}
}
function eye(x, y, pupil, eyeball) {
noStroke();
fill(255, 153, 153);
ellipse(x, y, 150, 100);
stroke(0);
for (var i = -5; i < 6; i++) {
push();
translate(x, y)
var lashlength = -77 + (abs_i * 2);
rotate(i * 15);
line(0, 0, 0, lashlength);
pop();
}
noStroke();
ellipse(x, y, 120, 70);
ellipse(x, y, map(pupil, 0, width, 0, 100), 42);
ellipse(x, y, map(eyeball, 0, height, 0, 100), 32);
fill("red");
if (mouseX > x - 50 && mouseX <= x + 50 && mouseY > y - 50 && mouseY < y + 50) {
ellipse(x, y, map(pupil, 0, width, 0, 100), 42);
ellipse(x, y, map(eyeball, 0, height, 0, 100), 32);
}
fill(255, 184, 122);
ellipse(x, y, 140, 120);
strokeWeight(23);
stroke(0);
point(mouseX, mouseY);
pop();
beginShape();
stroke(255);
noFill();
curveVertex(mouseX, mouseY);
curveVertex(x - 50, y);
curveVertex(x + 50, y);
curveVertex(mouseX, mouseY);
endShape();
}
}
createCanvas(200, 200);
background(255);
text('Temperature in °C: 25', 0, 50);
var temp = CtoF(35);
text('Temperature in °F: ' + temp, 0, 100);
}
function CtoF(celc) {
var fare = celc * 1.8 + 32;
return fare;
}function setup() {
createCanvas(200, 200);
background(255);
noStroke();
colorMode(HSB, 255);
for (var i= 50; i < 151; i +=50) {
iceCream( i ,100, random(30,45));
}
}
function iceCream(x, y, diameter) {
fill(random(360), 112, 331);
arc(x, y, diameter, diameter, -PI, 0);
fill('#d7c38e');
triangle(x - diameter / 2, y + 5, x + diameter / 2, y + 5, x, y + diameter * 1.3);
function setup() {
createCanvas(700, 400);
}
function draw() {
background(220);
eye(100, 70, mouseX, mouseY);
eye(100, 330, mouseX, mouseY);
function eye(x, y, pupil, eyeball) {
let eyebrow = y - eyeball;
noStroke();
fill(255, 153, 153);
ellipse(x, y, 150, 100);
ellipse(x, y, 120, 70);
ellipse(x, y, map(pupil, 0, width, 0, 100), 42);
ellipse(x, y, map(eyeball, 0, height, 0, 100), 32);
fill ("red");
if (mouseX > 30 && mouseX <= 170 && mouseY > 10 && mouseY < 100) {
ellipse(x, y, map(pupil, 0, width, 0, 100), 42);
ellipse(x, y, map(eyeball, 0, height, 0, 100), 32);
}
fill(255, 184, 122);
ellipse(x, y, 140, 120);
line(x, y, 140, 120);
strokeWeight(23);
point(mouseX, mouseY);
pop();
beginShape();
stroke(255);
noFill();
curveVertex(mouseX, mouseY);
curveVertex(x / 2, y);
curveVertex(x * 1.5, y);
curveVertex(mouseX, mouseY);
endShape();
}
}
}
function setup() {
createCanvas(700, 400);
}
function draw() {
background(220);
eye(100, 70, mouseX, mouseY);
eye(100, 330, mouseX, mouseY);
function eye(x, y, pupil, eyeball) {
let ny = y - pupil - eyeball;
noStroke();
fill(255, 153, 153);
ellipse(x, y, 140, 120);
ellipse(x, y, 120, 70);
ellipse(x, y, map(pupil, 0, width, 0, 100), 42);
ellipse(x, y, map(eyeball, 0, height, 0, 100), 32);
if (mouseX > 30 && mouseX <= 170 && mouseY > 10 && mouseY < 100) {
ellipse(x, y, map(pupil, 0, width, 0, 100), 42);
ellipse(x, y, map(eyeball, 0, height, 0, 100), 32);
}
fill(255, 184, 122);
ellipse(x, y, 140, 120);
line(x, y, 140, 120);
strokeWeight(23);
point(mouseX, mouseY);
pop();
beginShape();
stroke(255);
noFill();
curveVertex(mouseX, mouseY);
curveVertex(x / 2, y);
curveVertex(x * 1.5, y);
curveVertex(mouseX, mouseY);
endShape();
}
}
}
function setup() {
createCanvas(700, 400);
}
function draw() {
background(220);
eye( 100, 70, mouseX, mouseY);
eye( 100, 330, mouseX, mouseY);
eye( 260, 70, mouseX, mouseY);
eye( 260, 330, mouseX, mouseY);
eye( 420, 70, mouseX, mouseY);
eye( 420, 330, mouseX, mouseY);
eye( 580, 70, mouseX, mouseY);
eye( 580, 330, mouseX, mouseY);
function eye (x, y, pupil, eyeball) {
fill(255, 153, 153);
ellipse(x, y, 140, 120);
ellipse(x, y, 120, 70);
if (mouseX < x &&  mouseY > y ) {
ellipse(x, y, map (pupil, 0, width, 0,100) , 42);
ellipse(x, y, map (eyeball, 0 , height, 0 , 100) , 32);
}
}
function setup() {
createCanvas(700, 400);
}
function draw() {
background(220);
eye( 100, 70, mouseX, mouseY);
eye( 100, 330, mouseX, mouseY);
eye( 260, 70, mouseX, mouseY);
eye( 260, 330, mouseX, mouseY);
eye( 420, 70, mouseX, mouseY);
eye( 420, 330, mouseX, mouseY);
eye( 580, 70, mouseX, mouseY);
eye( 580, 330, mouseX, mouseY);
function eye (x, y, pupil, eyeball) {
fill(255, 153, 153);
ellipse(x, y, 140, 120);
ellipse(x, y, 120, 70);
ellipse(x, y, pupil%100, 42);
ellipse(x, y, eyeball%100 , 32);
}
function setup() {
createCanvas(700, 400);
}
function draw() {
background(220);
function eye (x, y, pupil, eyeball) {
fill(255, 153, 153);
ellipse(x, y, 140, 120);
ellipse(x, y, 120, 70);
ellipse(x, y, pupil, 42);
ellipse(x, y, eyeball, 32);
}
}
function setup() {
createCanvas(720, 480);
strokeWeight(2);
}
function draw() {
drawNyuszi(120, 420, 110, 140);
}
function drawNyuszi(x, y, bodyHeight, neckHeight) {
let radius = 55;
let lashes = 0;
line(x, lashes + 200, x - 18, lashes + 120);
line(x, lashes + 200, x - 42, lashes + 120);
line(x, lashes + 200,x - 78, lashes + 120);
push();
noStroke();
fill (255, 153, 153);
ellipse (x + 20,y - bodyHeight, x+ 20 , ny);
fill (255, 204, 204);
ellipse(x + 23, y - bodyHeight, x , ny/2);
pop();
noStroke();
fill(102);
ellipse(x, y - 33, 33, 33);
fill(0);
rect(x - 45, y - bodyHeight, 90, bodyHeight - 33);
fill(102);
rect(x - 45, y - bodyHeight + 17, 90, 6);
fill(0);
ellipse(x + 12, ny, radius, radius);
fill(255);
ellipse(x + 24, ny - 6, 14, 14);
fill(0);
ellipse(x + 24, ny - 6, 3, 3);
fill(153);
ellipse(x, ny - 8, 5, 5);
ellipse(x + 30, ny - 26, 4, 4);
ellipse(x + 41, ny + 6, 3, 3);
let r = 40;
let aVel = 0.0;
let aAcc = 0.001;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
translate (200,200);
let x = r * cos (a);
let y = r * sin (a);
fill(255);
stroke(2);
ellipse ( x , y, 60,60);
line ( 0,0,x, y );
a += aVel;
aVel += aAcc;
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
stroke(255);
noFill();
beginShape ();
for ( let a = 0; a < 360; a += 45) {
let x = 100 * cos (a) + 200;
let y = 100 * sin (a) + 200;
vertex(x, y);
endShape();
}
let angle = 0;
function setup() { 
createCanvas(400, 400);
angleMode (DEGREES);
} 
function draw() { 
background(220);
translate (60,60);
rotate(angle);
fill(0);
rectMode (CENTER);
rect (0, 0, 40, 40);
stroke (255);
line ( 0,0, 40,40);
translate (330,330);
scale (mouseX / 100, mouseY / 100);
fill(0);
rectMode (CENTER);
rect (0, 0, 40, 40);
stroke (255);
line ( 0,0, 40,40);
angle = angle + 1;
}
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(0);
strokeWeight(4);
stroke (255);
for (var x = 0; x <= width; x += 50) {
for (var y = 0; y <= height; y += 50) {
fill ( 233, 0, random(255)); 
ellipse ( x, y , 20, 20);
}
}
}var offset = 0;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(0);
strokeWeight(4);
stroke (255);
for (var x = 0; x <= width; x += 50) {
fill ( 233, 0, random(255)); 
ellipse ( x + offset, 200, 20, 20);
}
offset = offset + 1;
}
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(0);
strokeWeight(4);
stroke(255);
var x = 0;
while (x <= width) {
fill( 2, 3, 255);
ellipse ( x, 100, 20, 20);
x = x + 50;
}
for (var x = 0; x <= width; x += 50) {
fill ( 233, 55, 133);
ellipse ( x , 200, 20, 20);
}
}let x = 0;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
x = x + 5;
line (x, 0, x, height);
}
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
for (let x = 0; x < mouseX; x = x + 50) {
line(x, 0, x, height);
}
}
let offset = 20;
let tizes ={
x: 0,
y: 0
}
let slider = {
x: 10,
y: 365,
height: 20,
width: 20
}
let dragged = false;
var x = 0;
var y = 0;
function setup() {
createCanvas(400, 400);
background(255);
}
function draw() {
if (random(1 , 10) > tizes) {
line(x, y+20, x+20, y);
}
x += 20;
if (x > width) {
x = 0;
y += 20;
}
if (y > height) {
background(255);
x = 0;
y = 0;
}
if (dragged) {
slider.x = mouseX - offset;
}
fill(255);
rect(-5, height - 50, width + 5, 50);
tizes = map(slider.x, 35 ,365, 0, 9);
rect(slider.x, slider.y, slider.width, slider.height);
}
function mouseDragged() {
if (mouseX > slider.x &&
mouseX < (slider.x + slider.width) &&
mouseY > slider.y &&
mouseY < (slider.y + slider.height)) {
dragged = true;
}
}
function mouseReleased() {
dragged = false;
}
var x = 0;
var y = 0;
function setup() {
createCanvas(400, 400);
background(0);
}
function draw() {
if (random(1) > 0.5) {
line(x, y, x+20, y+20);
} 
else {
line(x, y+20, x+20, y);
}
x += 20;
if (x > width) {
x = 0;
y += 20;
}
if (y > height) {
background(255);
x = 0;
y += 20;
}
}
let canvas = {
x: 500,
y: 500
}
let offset = 5;
let tizes ={
x: 0,
y: 0
}
let slider = {
x: 20,
y: 240,
height: 20,
width: 20
}
let dragged = false;
function setup() {
createCanvas(canvas.x, canvas.y);
}
function draw() {
background(220);
rect(slider.x, slider.y, slider.width, slider.height);
tizes = map(slider.x, 10 , 480, 10, 35);
line(slider.x , tizes , slider.y ,tizes);
while (tizes.x > 480) {
line(tizes.x , 23 , 23 ,23);
tizes.x = tizes.x + 50; }
if (dragged) {
slider.x = mouseX - offset;
}
}
function mouseDragged() {
if (mouseX > slider.x &&
mouseX < (slider.x + slider.width) &&
mouseY > slider.y &&
mouseY < (slider.y + slider.height)) {
dragged = true;
}
}
function mouseReleased() {
dragged = false;
}var on = true;
var r = 0;
var g = 45;
var b = 0;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
if (on) {
background (220);
} else {
background (b,r,g);
}
r = map (mouseX, 0, 600,0,255);
fill(r,g,b);
rect (300,50, 122, 122 );
if ( mouseX > 200 && mouseX < 400);
fill (255);
b = b + 0.1
{
if (mouseY > 200) {
line (b , 200, r, mouseY);
} 
else if (mouseY > 0) {
rect ( r, mouseY, b , 55);
}
let count = 0;
function setup() { 
createCanvas(400, 400);
background(220);
} 
function draw() { 
}
function mousePressed () {
fill("red");
ellipse ( mouseX, mouseY, 40,40);
if(count == 5) {
fill("green");
ellipse(mouseX, mouseY, 30,30);
} else {
fill("black");
ellipse(mouseX, mouseY, 30,30);
}
}var on = true;
var r = 0;
var g = 45;
var b = 0;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
if (on) {
background (220);
}else {
background (b,r,g);
}
r = map (mouseX, 0, 600,0,255);
rectMode(CENTER);
fill(r,g,b);
rect (200,200, 122, 122 );
if ( mouseX > 200 && mouseX < 400);
fill (255);
b = b + 0.2
{
if (mouseY > 300) {
line (b , 55, r, mouseY);
} 
else if (mouseY > 100) {
rect ( r, mouseY, b, 55);
{
}
}
if ( mouseX > 200 && mouseX < 400);
on = !on
}}
let speed = 1;
var on = true;
var r = 0;
var g = 45;
var b = 0;
function setup() {
createCanvas(400, 400);
}
function draw() {
if (on) {
background(220);
} else {
background(b, r, g);
}
r = map(mouseX, 0, 600, 0, 255);
rectMode(CENTER);
fill(r, g, b);
rect(200, 200, 100, 100, 2);
if (mouseX > 200 && mouseX < 400);
fill(255);
rect(0, 80, 0, 80);
b = b + 2 * speed;
if (mouseX > 150 && mouseX < 250 && mouseY > 150 && mouseY < 250) {
line(b, 200, r, mouseY);
}
else if (mouseY > 0) {
rect(r, mouseY, b, 55);
}
if (b > 400) {
b = 0;
}
}
if (mouseX < 150 ||  mouseX > 250 || mouseY < 150 || mouseY > 250) {
}
}let nyuszika = false;
var x = 0;
var speed = 3;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(0);
stroke(255);
strokeWeight(4);
noFill();
if (mouseX > 200) { 
fill(255,2,133);
}
if (x >= width) {
speed = 1 * -speed;
} else if (x < 0) {
speed = 1 * -speed;
}
x = x + speed; 
ellipse( x, 200, 40, 40);
}  let r;
let g;
let b;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
if (mouseX > 100) { 
r = random(255);
g = random(255);
b = random(255);
let x = random(width);
let y = random(height);
fill (r,g,b);
ellipse(x,y,16,16);
}  
}
function mousePressed() {
background(122,45,44);
}
var baromira = 0;
var nyuszi = {
x:120,
y:120
}
var col= {
r: 0,
g: 255,
b: 22
}
function setup() { 
createCanvas(600, 400);
angleMode (DEGREES);
}
function draw() { 
baromira = baromira + 0.2
mak = random(1, baromira)
noStroke()
fill(11,baromira,4,66);
rect(mouseX, mak , 22, 120);
col.g = random(3,121);
nyuszi.x = random(0, 20);
nyuszi.y = random(0 ,40);
fill(col.r,col.g,col.b);
ellipse(300, 200, 166, 166);
col = map ( mouseX,0,600,0,255);
fill(col);
rect (50,50,20,20);
}
function mousePressed() {
background(baromira , 11, 33);
baromira = 0;
} var baromira = 0;
var nyuszi = {
x:120,
y:120
}
var col= {
r: 0,
g: 255,
b: 22
}
function setup() { 
createCanvas(600, 400);
background(222, 22, 33);
angleMode (DEGREES);
}
function draw() { 
baromira = baromira + 0.2;
let mn = minute();
strokeWeight(8);
stroke (255);
noFill();
ellipse (300,200,186,186);
strokeWeight (4);
stroke (255, 111, 133);
let end = map (mouseX, 0, width, 0, 360);
arc (300,200,186,186, 0, end);
noStroke()
fill(11,baromira,4,66);
rect(mouseX, mouseY, baromira, 26);
nyuszi.x = random(0, 20);
nyuszi.y = random(0 ,40);
fill(col.r,col.g,col.b);
ellipse(300, 200, 166, 166);
fill(col);
rect (50,50,20,20);
}
function mousePressed() {
background(222, 22, 33);
baromira = 0;
} var nyusziX = 0;
frameRate(fps)
function setup() { 
createCanvas(640, 360);
background(255, 153, 0);
} 
function draw() { 
nyusziX = nyusziX + 1;
noStroke()
fill (0,63,0);
arc(292, 182, 300, 89, 0, HALF_PI);
noStroke()
fill (80,33,93);
quad( 450 ,20, 510, 20, 410, 320, 480, 200);
noStroke()
fill (100,77,26);
triangle( 540, 111, 580, 115, 540, 90 );
fill (0,63,0);
stroke (6122);
line ( mouseX, 19 ,mouseX , mouseY);
noStroke()
fill (222,77,26, 85, 66);
rect (420, 90, 120, 120, 52, 5, 52, 5);
noStroke()
fill (0,133,26);
ellipse ( 505 , 120, 44);
}
function mousePressed() { 
background(23);
}var nyusziX = 0;
function setup() { 
createCanvas(640, 360);
background(23);
} 
function draw() { 
nyusziX = nyusziX + 1;
stroke ( 255 )
fill (222,55,26);
ellipse (mouseX, mouseY, 50);
noStroke()
fill (0,133,26);
ellipse ( 23 , 200, nyusziX);
noStroke()
fill (0,63,0);
arc(122, 300, 300, 89, 0, HALF_PI);
fill (0,122,0);
line(70, 20, 620, 20);
fill (0,122,0);
line(70, 20, 610, 75);
noStroke()
fill (80,33,93);
quad(580 ,20, 610, 20, 610, 320, 580, 200);
noStroke()
fill (222,77,26);
rect(420, 210, 120, 120, 52, 5, 52, 5);
noStroke()
fill (100,77,26);
triangle ( 11, 45, 570, 50, 90, 160 );
}
function mousePressed() { 
background(23);
}function setup() { 
createCanvas(640, 360);
} 
function draw() { 
background(23);
noStroke()
fill (222,55,26);
ellipse (100, 200, 50);
noStroke()
fill (0,133,26);
ellipse (160, 200, 50);
noStroke()
fill (0,63,0);
arc(122, 300, 300, 89, 0, HALF_PI);
fill (0,122,0);
line(70, 20, 620, 20);
fill (0,122,0);
line(70, 20, 610, 75);
noStroke()
fill (80,33,93);
quad(580 ,20, 610, 20, 610, 320, 580, 200);
noStroke()
fill (222,77,26);
rect(420, 210, 120, 120, 52, 5, 52, 5);
noStroke()
fill (100,77,26);
triangle ( 70, 45, 570, 50, 90, 160 );
}