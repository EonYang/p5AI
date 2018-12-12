var DC;
let snowflakes = [];
function preload() {
DC = loadImage("/DC8DaysofChristmas.jpg");
}
var value = 0
var day1 = new Tone.Player('Tracks/day1.mp3').toMaster()
var day2 = new Tone.Player('Tracks/day2.mp3').toMaster()
var day3 = new Tone.Player('Tracks/day3.mp3').toMaster()
var day4 = new Tone.Player('Tracks/day4.mp3').toMaster()
var day5 = new Tone.Player('Tracks/day5.mp3').toMaster()
var day6 = new Tone.Player('Tracks/day6.mp3').toMaster()
var day7 = new Tone.Player('Tracks/day7.mp3').toMaster()
var day8 = new Tone.Player('Tracks/day8.mp3').toMaster()
var Christmas = new Tone.Player('Tracks/FeelLikeChristmas.mp3').toMaster()
var bgColor = 0
Tone.Buffer.on('load', function() {
bgColor = img
})
function setup() {
createCanvas(1000, 800);
}
function draw() {
background(DC);
cursor(CROSS)
for (var i = 0; i < random(10); i++) {
}
for (let flake of snowflakes) {
}
function snowflake() {
this.posX = 0;
this.posY = random(-50, 0);
this.initialangle = random(0, 2 * PI);
this.size = random(2, 8);
this.radius = sqrt(random(pow(width / 2, 2)));
this.update = function(time) {
let angle = w * time + this.initialangle;
this.posX = width / 2 + this.radius * sin(angle);
this.posY += pow(this.size, 0.5);
if (this.posY > height) {
let index = snowflakes.indexOf(this);
snowflakes.splice(index, 1);
}
};
this.display = function() {
ellipse(this.posX, this.posY, this.size);
};
}
}
function mousePressed() {
var d9 = dist(mouseX, mouseY, 455, 320);
var d1 = dist(mouseX, mouseY, 80, 720);
var d2 = dist(mouseX, mouseY, 190, 720);
var d3 = dist(mouseX, mouseY, 310, 720);
var d4 = dist(mouseX, mouseY, 435, 720);
var d5 = dist(mouseX, mouseY, 555, 720);
var d6 = dist(mouseX, mouseY, 685, 720);
var d7 = dist(mouseX, mouseY, 810, 720);
var d8 = dist(mouseX, mouseY, 935, 720);
if (d9 < 300){
Christmas.start()
}
if (d1 < 90) {
day8.start()
}
if (d2 < 90) {
day7.start()
}
if (d3 < 90) {
day6.start()
}
if (d4 < 90) {
day5.start()
}
if (d5 < 90) {
day4.start()
}
if (d6 < 90) {
day3.start()
}
if (d7 < 90) {
day2.start()
}
if (d8 < 90) {
day1.start()
}
}var DC;
function preload() {
DC = loadImage("/DC8Days.jpg");
}
var value = 0
var day1 = new Tone.Player('Tracks/day1.mp3').toMaster()
var day2 = new Tone.Player('Tracks/day2.mp3').toMaster()
var day3 = new Tone.Player('Tracks/day3.mp3').toMaster()
var day4 = new Tone.Player('Tracks/day4.mp3').toMaster()
var day5 = new Tone.Player('Tracks/day5.mp3').toMaster()
var day6 = new Tone.Player('Tracks/day6.mp3').toMaster()
var day7 = new Tone.Player('Tracks/day7.mp3').toMaster()
var day8 = new Tone.Player('Tracks/day8.mp3').toMaster()
var bgColor = 0
Tone.Buffer.on('load', function() {
bgColor = img
})
function setup() {
createCanvas(1000, 800);
}
function draw() {
background(DC);
}
function keyPressed() {
console.log('pressed', keyCode)
day8.start();
day2.start();
day1.start()
day7.start()
day6.start()
day5.start()
day4.start()
day3.start()
}var four;
function preload() {
four = loadImage("assets/four.jpg");
}
let unity = new Tone.Player("samples/Unity.mp3").toMaster()
let auntSarah = new Tone.Player('samples/AuntSarah.mp3').toMaster()
let peaches = new Tone.Player('samples/Peaches.mp3').toMaster()
let sweetThing = new Tone.Player('samples/SweetThing.mp3').toMaster()
let saffronia = new Tone.Player('samples/Saffronia.mp3').toMaster()
function setup() {
console.log("Press (A)unt sarah, (S)affronia, s(W)eet thing, (P)eaches to hear their individual stories. Press (U) for Unity amongst them.");
createCanvas(1500, 1500);
image(four, mouseX, mouseY);
}
function draw() {
}
function keyPressed() {
console.log('pressed', keyCode)
auntSarah.start()
saffronia.start()
sweetThing.start()
peaches.start()
unity.start()
}
}
function keyReleased() {
console.log('released', keyCode)
auntSarah.stop()
saffronia.stop()
sweetThing.stop()
peaches.stop()
unity.stop()
}
}var four;
function preload(){
four = loadImage("assets/four.jpg");
}
let player = new Tone.Player("samples/women.wav");
playbackRate: 1;
player.loop = true;
player.retrigger = true;
player.toMaster();
function setup() {
console.log("Play spacebar to start/stop. Mouse left and right to change speed.");
createCanvas(1000, 1000);
image(four, mouseX, mouseY);
}
function draw() {
player.playbackRate = map(mouseX, 0, width, .02, 2);
}
function keyPressed() {
if (key == ' ') {
if (player.state == "stopped") {
player.start();
} else {
player.stop();
}
}
var track1 = new Tone.Player('Tracks/Killmonger1.mp3').toMaster()
var track2 = new Tone.Player('Tracks/Killmonger2.mp3').toMaster()
var track3 = new Tone.Player('Tracks/Killmonger3.mp3').toMaster()
var track4 = new Tone.Player('Tracks/Killmonger4.mp3').toMaster()
var track5 = new Tone.Player('Tracks/Killmonger5.mp3').toMaster()
var track6 = new Tone.Player('Tracks/Killmonger6.mp3').toMaster()
var track7 = new Tone.Player('Tracks/Killmonger7.mp3').toMaster()
var track8 = new Tone.Player('Tracks/Killmonger8.mp3').toMaster()
var track9 = new Tone.Player('Tracks/Killmonger9.mp3').toMaster()
var track10 = new Tone.Player('Tracks/Killmonger10.mp3').toMaster()
var bgColor = 0
Tone.Buffer.on('load', function() {
bgColor = gif
})
function setup() {
createCanvas(360, windowHeight);
}
function keyPressed() {
console.log('pressed', keyCode)
track1.start()
track2.start()
track3.start()
track4.start()
track5.start()
track6.start()
track7.start()
track8.start()
track9.start()
track10.start()
}
}
function keyReleased() {
console.log('released', keyCode)
track1.stop()
track2.stop()
track3.stop()
track4.stop()
track5.stop()
track6.stop()
track7.stop()
track8.stop()
track9.stop()
track10.stop()
}
}
function draw() {
background(gif);
var nSteps = 5;
var nTracks = 5;
var cells = [];
var playButton;
var beats = 0;
var currentStep = 0;
var notes = ["A2", "B2", "F2", "G2", "E3"];
var synth = new Tone.PolySynth({
"oscillator" : {
"type" : "sine"
},
"envelope" : {
"attack" : 0.8,
"sustain" : 0.2,
"release" : 0.1
}
}).toMaster();
synth.toMaster();
Tone.Transport.scheduleRepeat(onBeat, 0.2);
var col = {
r:250,
g:230,
b:240,
}
var cellWidth, cellHeight;
function setup() {  	
createCanvas(500, 300);
cellWidth = width / nSteps;
cellHeight = height / nTracks;
for(var track = 0; track < nTracks; track++){
cells[track] = [];
for(var step = 0; step < nSteps; step++){
cells[track][step] = -1;
}
}
playButton = createButton('play');
playButton.position(0, 310);
playButton.mouseClicked(togglePlay);
}
function onBeat(time){
for(var track = 0; track < nTracks; track++){
if(cells[track][currentStep] == 1){
var synthloop = synth.get(notes[track]);
synth.triggerAttackRelease(notes[track], time);
}
}
beats++;
currentStep = beats % nSteps;
}
function draw(){
background(col.r,col.g,col.b);
frameRate(2);
noStroke();
var vol = new Tone.Volume();
if(0<mouseX&&mouseX<width){
col.r = random(222,213);
col.g = random(132,143);
col.b = random(132,254);
}
for(var step = 0; step < nSteps; step++){
for(var track = 0; track < nTracks; track++){
if(cells[track][step] == 1){
fill(0, 0, 0);
rect(step*cellWidth, track*cellHeight, cellWidth, cellHeight);
}
}
}
var highlight = (beats - 1)% nSteps;
fill(100, 100, 100);
noStroke();
rect(highlight*cellWidth, 0, cellWidth, height)
}
function mousePressed(){
if(	0 < mouseX && mouseX < width &&
0 < mouseY && mouseY < height){
var s = floor(mouseX / cellWidth);
var p = floor(mouseY / cellHeight);
cells[p][s] = -cells[p][s];
}
}
function togglePlay(){
if(Tone.Transport.state == "started"){
Tone.Transport.stop();
playButton.html('play');
}
else{
Tone.Transport.start();
playButton.html('stop');
}
button = ! button;
var nSteps = 10;
var nTracks = 10;
var cells = [];
var playButton;
var beats = 0;
var currentStep = 0;
var notes = ["A2", "B2", "F2", "A2", "E3", "A3", "E2", "G3", "A4", "E4"];
var synth = new Tone.PolySynth({
"oscillator" : {
"type" : "sawtooth"
},
"envelope" : {
"attack" : 0.8,
"sustain" : 0.2,
"release" : 0.1
}
}).toMaster();
synth.toMaster();
Tone.Transport.scheduleRepeat(onBeat, 0.2);
var col = {
r:250,
g:230,
b:240,
}
var cellWidth, cellHeight;
function setup() {
for(var track = 0; track < nTracks; track++){
cells[track] = [];
for(var step = 0; step < nSteps; step++){
cells[track][step] = -1;
}
}
playButton = createButton('play');
playButton.position(0, 310);
playButton.mouseClicked(togglePlay);
createCanvas(500, 300);
cellWidth = width / nSteps;
cellHeight = height / nTracks;
}
function onBeat(time){
for(var track = 0; track < nTracks; track++){
if(cells[track][currentStep] == 1){
var synthloop = synth.get(notes[track]);
synth.triggerAttackRelease(notes[track], time);
}
}
beats++;
currentStep = beats % nSteps;
}
function draw(){
background(col.r,col.g,col.b);
frameRate(2);
noStroke();
var vol = new Tone.Volume();
if(0<mouseX&&mouseX<width){
col.r = random(222,213);
col.g = random(132,143);
col.b = random(132,254);
}
for(var step = 0; step < nSteps; step++){
for(var track = 0; track < nTracks; track++){
if(cells[track][step] == 1){
fill(0, 0, 0);
rect(step*cellWidth, track*cellHeight, cellWidth, cellHeight);
}
}
}
var highlight = (beats - 1)% nSteps;
fill(100, 100, 100);
noStroke();
rect(highlight*cellWidth, 0, cellWidth, height)
}
function mousePressed(){
if(	0 < mouseX && mouseX < width &&
0 < mouseY && mouseY < height){
var s = floor(mouseX / cellWidth);
var p = floor(mouseY / cellHeight);
cells[p][s] = -cells[p][s];
}
}
function togglePlay(){
if(Tone.Transport.state == "started"){
Tone.Transport.stop();
playButton.html('play');
}
else{
Tone.Transport.start();
playButton.html('stop');
}
button = ! button;
var osc;
var ampEnv;
var aFilter;
var filterEnv;
var lfo;
var x, y;
function setup() {
createCanvas(720, 400);
x = width / 2;
y = height;
aFilter = new Tone.Filter(150, "lowpass");
aFilter.toMaster();
ampEnv = new Tone.AmplitudeEnvelope({
"attack": 0,
"decay": 0,
"sustain": 1,
"release": 0
});
ampEnv.releaseCurve = "linear";
ampEnv.connect(aFilter);
osc = new Tone.Oscillator(100, "square");
osc.connect(ampEnv);
osc.start();
filterEnv = new Tone.ScaledEnvelope({
"attack": 0.5,
"min": 100,
"max": 300
});
filterEnv.connect(aFilter.frequency);
}
function keyPressed() {
ampEnv.triggerAttack();
filterEnv.triggerAttack();
}
function keyReleased() {
ampEnv.triggerRelease();
filterEnv.triggerRelease();
}
function draw() {
background(200);
stroke(50);
fill(100);
ellipse(x, y, 24, 24);
x = x + random(-2, 2);
y = y - 2;
if (y < 0) {
y = height;
}
else if (x > width) {
x = width;
}
var notes = [ 72 , 74, 75, 76, 77, 78, 79, 81, 82, 83, 84, 73];
var index = 0;
var song = [
{ note: 7, duration: 600},
{ note: 10, duration: 800},
{ note: 7, duration: 300},
{ note: 10, duration: 300},
{ note: 7, duration: 600},
{ note: 11, duration: 600},
{ note: 10, duration: 800},
{ note: 6, duration: 1000},
{ note: 7, duration: 600},
{ note: 10, duration: 300},
{ note: 9, duration: 300},
{ note: 3, duration: 600},
{ note: 4, duration: 800},
{ note: 10, duration: 800},
{ note: 7, duration: 600},
{ note: 10, duration: 800},
{ note: 7, duration: 300},
{ note: 10, duration: 300},
{ note: 7, duration: 600},
{ note: 11, duration: 600},
{ note: 10, duration: 800},
{ note: 6, duration: 1000},
{ note: 7, duration: 600},
{ note: 10, duration: 300},
{ note: 9, duration: 300},
{ note: 3, duration: 600},
{ note: 4, duration: 800},
{ note: 10, duration: 800},
{ note: 1, duration: 800},
];
var trigger = 0;
var autoplay = false;
var osc;
function setup() {
createCanvas(720, 400);
var div = createDiv("Click to play notes or ")
div.id("instructions");
var button = createButton("play !theme song");
button.parent("instructions");
button.mousePressed(function() {
if (!autoplay) {
index = 0;
autoplay = true;
}
});
osc = new p5.Oscillator('Triangle');
osc.start();
frameRate(2);
osc.amp(0);
}
function playNote(note, duration){
osc.freq(midiToFreq(note));
osc.fade(0.02, 0.02)
if (duration) {
setTimeout(function() {
osc.fade(0,0.05);
}, duration-50);
}
}
function draw() {
if (autoplay && millis() > trigger){
playNote(notes[song[index].note], song[index].duration);
trigger = millis() + song[index].duration;
index ++;
} else if (index >= song.length) {
autoplay = false;
}
var w = width / notes.length;
for (var i = 0; i < notes.length; i++) {
var x = i * w;
if (mouseX > x && mouseX < x + w && mouseY < height) {
if (mouseIsPressed) {
fill(100,255,200);
} else {
fill(127,8,127);
}
} else {
fill(127,8,213);
}
if (autoplay && i === song[index-1].note) {
fill(100,255,200);
}
rect(x, 0, w-1, height-1);
}
}
function mousePressed() {
var key = floor(map(mouseX, 0, width, 0, notes.length));
playNote(notes[key]);
}
function mouseReleased() {
osc.fade(0,0.5);
}
var kit = new Tone.Players({
"kick": "samples/505/kick.mp3",
"snare":"samples/505/snare.mp3"
});
kit.toMaster();
Tone.Transport.bpm.value = 120;
Tone.Transport.scheduleRepeat(playBeat, "4n");
Tone.Transport.start();
function playBeat() {
if (kit.loaded) {
let beat = Tone.Transport.position.split(":")[1];
console.log(beat);
if(beat == 0){
kit.get("kick").start();
}
else{
kit.get("snare").start();
}
}
}
function setup() {
}
function draw() {
}var kick = new Tone.Player("sounds/kick.wav").toMaster();
var synth = new Tone.Player("sounds/synth.wav").toMaster();
var hihat = new Tone.Player("sounds/hihat.wav").toMaster();
Tone.Transport.bpm.value = 120;
Tone.Transport.scheduleRepeat(playkick, "4n");
Tone.Transport.scheduleRepeat(playhihat, "16n");
Tone.Transport.start();
function setup() {
createCanvas(400,400);
background(0);
frameRate(60);
}
function draw() {
textSize(30);
fill(255);
text('YESSSSSSS!',width/4,height/2);
}
function playkick() {
if (kick.loaded) {
kick.start();
}
}
function playsynth() {
if (synth.loaded) {
var beat = Tone.Transport.position.split(":")[1];
var sixteenth = Tone.Transport.position.split(":")[2] | 0;
if (beat == 0 || beat == 2) {
if (sixteenth == 1 || sixteenth == 3) {
synth.start();
}
} else {
if (sixteenth == 2) {
synth.start();
}
}
}
}
function playhihat() {
if (hihat.loaded) {
var beat = Tone.Transport.position.split(":")[1];
var sixteenth = Tone.Transport.position.split(":")[2] | 0;
if (beat == 0) {
if (sixteenth == 2) {
hihat.start();
}
} else if (beat == 1 || beat == 3) {
if (sixteenth == 1 || sixteenth == 2) {
hihat.start();
}
} else {
if (sixteenth == 2 || sixteenth == 3) {
hihat.start();
}
}
}
}
var currentStep = 0;
var cells = [
];
var nSteps = 4;
var nTracks = 4;
var cellWidth, cellHeight;
var kit;
var drumNames = ["kick", "snare", "hh", "hho"];
kit = new Tone.Players(
{
"kick" : "/samples/505/kick.mp3",
"snare" : "/samples/505/snare.mp3",
"hh" : "/samples/505/hh.mp3",
"hho" : "/samples/505/hho.mp3",
}
);
kit.toMaster();
Tone.Transport.scheduleRepeat(onBeat, "16n");
Tone.Transport.start();
function setup() {
createCanvas(600, 300);
cellWidth = width / nSteps;
cellHeight = height / nTracks;
}
function onBeat(time){
for(var track = 0; track < nTracks; track++){
if(cells[track][currentStep] == 1){
if (kit.loaded) {
var hh = kit.get(drumNames[track]);
hh.start(time);
}
}
}
currentStep = (currentStep + 1) % nSteps;
}
function draw(){
background(255);
stroke(0);
for(var step = 0; step < nSteps; step++){
for(var track = 0; track < nTracks; track++){
if(cells[track][step] == 1){
fill(0);
rect(step*cellWidth, track*cellHeight, cellWidth, cellHeight);
}
}
}
for(var i = 0; i <= nTracks; i++){
var y = i*cellHeight;
line(0, y, width, y);
}
for(var i = 0; i <= nSteps; i++){
stroke(0);
line(i*cellWidth, 0, i*cellWidth, height);
if(i == currentStep){
fill(178, 223, 247, 50);
noStroke();
rect(i*cellWidth, 0, cellWidth, height)
}
}
}
var totalBeats = 0;
var kickPattern = [1, -1];
var snarePattern = [-1, 1];
var kit = new Tone.Players({
"kick": "samples/505/kick.mp3",
"snare":"samples/505/snare.mp3"
});
kit.toMaster();
Tone.Transport.timeSignature = [2, 4];
Tone.Transport.scheduleRepeat(playBeat, "0.5s");
Tone.Transport.start();
function setup() {
}
function draw() {
}
function playBeat() {
if (kit.loaded) {
var step = totalBeats % 2;
if(kickPattern [step] == 1){
kit.get("kick").start();
}
else if(kickPattern [step] == 1){
kit.get("snare").start();
}
totalBeats ++;
}
var busy = new Tone.Player("samples/busy.mp3").toMaster()
var rain = new Tone.Player("samples/rain.mp3").toMaster()
var sos = new Tone.Player("samples/sos.mp3").toMaster()
var hyena = new Tone.Player("samples/hyena.mp3").toMaster()
console.log('pressed', keyCode)
busy.start()
track2.start()
track3.start()
track4.start()
Tone.Transport.bpm.value = 120;
Tone.Transport.timeSignature = [4,4];
let audioLoop0 = Tone.Transport.scheduleRepeat(playkit0, "16n");
let audioLoop1 = Tone.Transport.scheduleRepeat(playkit1, "16n");
let audioLoop2 = Tone.Transport.scheduleRepeat(playkit2, "16n");
let audioLoop3 = Tone.Transport.scheduleRepeat(playkit3, "16n");
Tone.Transport.start();
busy.toMaster();
Tone.Transport.scheduleRepeat(playBeat, "1s");
Tone.Transport.start();
function setup() {
}
function draw() {
}
var kick = new Tone.Player("samples/505/kick.mp3");
kick.toMaster();
Tone.Transport.scheduleRepeat(playBeat, "0.5s");
Tone.Transport.start();
function setup() {
}
function draw() {
}
function playBeat(){
if(kick.loaded){
kick.start();
}
}
var kick = new Tone.Player("samples/505/kick.mp3");
kick.toMaster();
function setup() {
}
function draw() {
}
function mousePressed(){
if(kick.loaded){
kick.start();
}
}var kick;
var lastTime;
function preload(){
kick = loadSound('sounds/kick.mp3');
}
function setup() {
createCanvas(600, 400);
background(100, 233, 100);
lastTime = 0;
}
function draw(){
if(millis() - lastTime > 500){
kick.play();
lastTime = millis();
}
}
var track1 = new Tone.Player('Tracks/Killmonger1.mp3').toMaster()
var track2 = new Tone.Player('Tracks/Killmonger2.mp3').toMaster()
var track3 = new Tone.Player('Tracks/Killmonger3.mp3').toMaster()
var track4 = new Tone.Player('Tracks/Killmonger4.mp3').toMaster()
var track5 = new Tone.Player('Tracks/Killmonger5.mp3').toMaster()
var track6 = new Tone.Player('Tracks/Killmonger6.mp3').toMaster()
var track7 = new Tone.Player('Tracks/Killmonger7.mp3').toMaster()
var track8 = new Tone.Player('Tracks/Killmonger8.mp3').toMaster()
var track9 = new Tone.Player('Tracks/Killmonger9.mp3').toMaster()
var track10 = new Tone.Player('Tracks/Killmonger10.mp3').toMaster()
var bgColor = 0
function setup() {
createCanvas(windowWidth,windowHeight);
background(255);
noStroke();
}
function keyPressed() {
background(255);
from = color(255, 0.1, 255, 0.1 * 255);
to = color(0.1, 255, 255, 0.1 * 255);
c1 = lerpColor(from, to, .33);
c2 = lerpColor(from, to, .66);
for (var i = 0; i < 15; i++) {
fill(from);
quad(random(-40, 220), random(height),
random(-40, 220), random(height),
random(-40, 220), random(height),
random(-40, 220), random(height));
fill(c1);
quad(random(140, 380), random(height),
random(140, 380), random(height),
random(140, 380), random(height), 
random(140, 380), random(height));
fill(c2);
quad(random(320, 580), random(height), 
random(320, 580), random(height),
random(320, 580), random(height), 
random(320, 580), random(height));
fill(to);
quad(random(500, 760), random(height), 
random(500, 760), random(height),
random(500, 760), random(height), 
random(500, 760), random(height));
}
frameRate(5);
console.log('pressed', keyCode)
track1.start()
track2.start()
track3.start()
track4.start()
track5.start()
track6.start()
track7.start()
track8.start()
track9.start()
track10.start()
}
}
function keyReleased() {
background(255);
console.log('released', keyCode)
track1.stop()
track2.stop()
track3.stop()
track4.stop()
track5.stop()
track6.stop()
track7.stop()
track8.stop()
track9.stop()
track10.stop()
}
}
function draw() {
}let sound;
function preload(){
sound = loadSound('sounds/blip.wav');}
function setup() {
createCanvas(400, 400);
sound.play();
}
function draw() {
background(220);
let angle = map(sound.currentTime(), 0, sound.duration(), 0, TWO_PI);
push();
translate(width/2, height/2);
rotate(angle);
rect(0, 0, 100, 100);
pop();
}
function keyPressed(){
sound.play(); 
}
function keyReleased(){
sound.stop(); 
}
var kinectron;
function setup() {
createCanvas(960, 540);
background(0);
noStroke();
kinectron = new Kinectron('172.16.224.110');
kinectron.makeConnection();
kinectron.startKey(gotData);
}
function draw() {
}
function gotData(data){
loadImage(data.src,gotImage);
}
function gotImage(img){
image(img,0,0);
}
var track1 = new Tone.Player('Tracks/Killmonger1.mp3').toMaster()
var track2 = new Tone.Player('Tracks/Killmonger2.mp3').toMaster()
var track3 = new Tone.Player('Tracks/Killmonger3.mp3').toMaster()
var track4 = new Tone.Player('Tracks/Killmonger4.mp3').toMaster()
var track5 = new Tone.Player('Tracks/Killmonger5.mp3').toMaster()
var track6 = new Tone.Player('Tracks/Killmonger6.mp3').toMaster()
var track7 = new Tone.Player('Tracks/Killmonger7.mp3').toMaster()
var track8 = new Tone.Player('Tracks/Killmonger8.mp3').toMaster()
var track9 = new Tone.Player('Tracks/Killmonger9.mp3').toMaster()
var track10 = new Tone.Player('Tracks/Killmonger10.mp3').toMaster()
var bgColor = 0
Tone.Buffer.on('load', function() {
bgColor = gif
})
function setup() {
createCanvas(360, windowHeight);
}
function keyPressed() {
console.log('pressed', keyCode)
track1.start()
track2.start()
track3.start()
track4.start()
track5.start()
track6.start()
track7.start()
track8.start()
track9.start()
track10.start()
}
}
function keyReleased() {
console.log('released', keyCode)
track1.stop()
track2.stop()
track3.stop()
track4.stop()
track5.stop()
track6.stop()
track7.stop()
track8.stop()
track9.stop()
track10.stop()
}
}
function draw() {
background(gif);
var track1 = new Tone.Player('Tracks/Killmonger1.mp3').toMaster()
var track2 = new Tone.Player('Tracks/Killmonger2.mp3').toMaster()
var track3 = new Tone.Player('Tracks/Killmonger3.mp3').toMaster()
var track4 = new Tone.Player('Tracks/Killmonger4.mp3').toMaster()
var track5 = new Tone.Player('Tracks/Killmonger5.mp3').toMaster()
var track6 = new Tone.Player('Tracks/Killmonger6.mp3').toMaster()
var track7 = new Tone.Player('Tracks/Killmonger7.mp3').toMaster()
var track8 = new Tone.Player('Tracks/Killmonger8.mp3').toMaster()
var track9 = new Tone.Player('Tracks/Killmonger9.mp3').toMaster()
var track10 = new Tone.Player('Tracks/Killmonger10.mp3').toMaster()
var bgColor = 0
Tone.Buffer.on('load', function(){
bgColor = 255
})
var img;
function preload() {
img = loadImage('PlaylistCover.png');
}
function setup() { 
createCanvas(displayWidth, displayHeight);
}
function keyPressed(){
console.log('pressed', keyCode) 
track1.start()
track2.start()
track3.start()
track4.start()
track5.start()
track6.start()
track7.start()
track8.start()
track9.start()
track10.start()
}
}
function keyReleased(){
console.log('released', keyCode) 
track1.stop()
track2.stop()
track3.stop()
track4.stop()
track5.stop()
track6.stop()
track7.stop()
track8.stop()
track9.stop()
track10.stop()
}
}
function draw() { 
background(img);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(0);
}`function setup() { 
createCanvas(400, 400);
var h = hour();
} 
function draw() { 
background(255, 228, 196)
fill (120, 55, 120)
textSize(50)
m = month()
d = day()
y = year()
h = hour()
mi = minute()
se = second()
text(m + '.' + d + ',' + y, 100, 250)
textSize(30)
text(h + ':' + mi + ':' + se, 100, 350)
}
if (window.performance) {
console.info("window.performance work's fine on this browser");
}
if (performance.navigation.type == 1) {
console.info( "This page is reloaded" );
} else {
console.info( "This page is not reloaded");
}
function setup() {
createCanvas(500,500);
}
function draw() { 
background(255);
let port = process.env.PORT || 8000;
http.createServer(function (req, res) {
console.log(req);
res.writeHead(200);
res.end('Loading...', req);
}).listen(port);
if (window.performance) {
console.info("window.performance work's fine on this browser");
}
if (performance.navigation.type == 1) {
console.info( "This page is reloaded" );
} else {
console.info( "This page is not reloaded");
}
console.log('Server listening on port: ', port);
function spots(){
frameRate(4);
spot.x = random(0,width);
spot.y = random(height, 0);
noStroke();
fill(col.r,col.g,col.b);
ellipse (spot.x,spot.y,30,30);
}
var spot = {
x:100,
y:50,
}
var col = {
r:250,
g:230,
b:240,
}
function setup() { 
createCanvas(windowWidth, windowHeight);
} 
function draw() { 
background(254,143,132);
spots();
spots(1);
spots(2);
spots(3);
spots(4);
spots(5);
spots(6);
spots(7);
spots(8);
col.r = random(254,143);
col.g = random(132,143);
col.b = random(132,254);
}function setup() { 
} 
function draw() { 
let audio;
var img1;
let clickCounter = 0;
function preload() {
img1 = loadImage("strangerthings1.jpg");
img2 = loadImage("strangerthings2.jpg");
soundFormats('mp3');
audio = loadSound("strangerThingsRing.mp3");
}
function setup() {
createCanvas(400, 400);
image(img1, 0, 0, 400 * 0.8, 400);
}
function mousePressed() {
clickCounter++;
if (clickCounter == 0) {
image(img1, 0, 0, 400 * 0.8, 400);
document.getElementById("gif").setAttribute("style", "visibility: hidden;");
}
else if (clickCounter == 1) {
audio.play();
image(img2, 0, 0, 400 * 0.8, 400);
}
else if (clickCounter == 2) {
document.getElementById("gif").setAttribute("style", "visibility: visible;");
}
if (clickCounter == 2) {
clickCounter = -1;
}
}
function preload() {
img = loadImage("strangerthings1.jpg");
}
function setup() {
image(img, 0, 0);
}
function draw() { 
function setup() {
canvas = createCanvas(0);
canvas.position(0,0);
}
function draw() {
}
var apiKey = "&api_key=sGx5R5VRbdrCnCNfx9yDAoOs3sGx7vbG";
function setup() {
canvas = createCanvas(1200, 1200);
canvas.position(0, 0);
var url = api + apiKey + query;
loadJSON(url, gotData);
}
function draw() {
}
function gotData(giphy) {
for (var i = 0; i < giphy.data.length; i++) {
var img = createImg(giphy.data[i].images.original.url);
img.size(140, 140);
}
}let lion1;
let lion2;
lion1 = new lion(150, 100);
lion2 = new lion(300, 100);
function setup() {
createCanvas(600, 400);
}
function draw() {
background(172, 235, 255);
fill(172, 205, 164);
rect(0, 265, 600, 200);
lion1.display();
lion2.display();
lion1.move();
lion2.move();
}
var movies;
function preload() {
}
function setup() {
createCanvas(400, 400);
}
function draw() {
background(255);
for (var i = 0; i < movies.results.length; i++) {
text(movies.results[i].title, 10, 50+i*20);
}
let hedgie1;
let inData;
hedgie1 = new Hedgie(150, 100);
function setup() {
createCanvas(600, 400);
}
for (var i = 0; i < portList.length; i++) {
console.log(i + " " + portList[i]);
}
}
function serverConnected() {
console.log('connected to server.');
}
function portOpen() {
}
console.log("the value is " + data);
hedgie1.moveTo(data);
}
}
function portClose() {
}
function draw() {
background(172, 205, 164);
fill(223, 216, 178);
rect(0, 270, 600, 200);
hedgie1.display();
}
let lion1;
let lion2;
let inData;
lion1 = new lion(150, 100);
lion2 = new lion(300, 100);
function setup() {
createCanvas(600, 400);
}
for (var i = 0; i < portList.length; i++) {
console.log(i + " " + portList[i]);
}
}
function serverConnected() {
console.log('connected to server.');
}
function portOpen() {
}
console.log("the value is " + data);
lion1.moveTo(data);
}
}
function portClose() {
}
function draw() {
background(172, 235, 255);
fill(172, 205, 164);
rect(0, 265, 600, 200);
lion1.display();
lion2.display();
lion1.move();
lion2.move();
}
var buttons = new Array(6);
var bubbles = [];
function setup() {
createCanvas(600, 600);
for (var i = 0; i < buttons.length; i++) {
buttons[i] = new Button(i*100+25, height/2-25, 60, 60);
}
function mousePressed() {
bubbles.push(new Bubble(mouseX, mouseY));
}
}
function draw() {
background(30,150,180);
for (var i = 0; i < buttons.length; i++) {
buttons[i].display();
}
}
function mousePressed() {
for (var i = 0; i < buttons.length; i++) {
buttons[i].click(mouseX, mouseY);
}
for (var h = 0; h < bubbles.length; i++) {
bubbles[h].move();
bubbles[h].display();
}
}
function Bubble(x, y) {
that.x = x;
that.y = y;
that.display = function() {
stroke(255);
fill(255, 0, 150, 50);
ellipse(that.x, that.y, 24, 24);
}
that.move = function() {
that.x = that.x + random(-1, 1);
that.y = that.y + random(-1, 1);
}
}
var buttons = new Array(6);
function setup() {
createCanvas(600, 600);
for (var i = 0; i < buttons.length; i++) {
buttons[i] = new Button(i*100+25, height/2-25, 60, 60);
}
}
function draw() {
background(30,150,180);
for (var i = 0; i < buttons.length; i++) {
buttons[i].display();
}
}
function mousePressed() {
for (var i = 0; i < buttons.length; i++) {
buttons[i].click(mouseX, mouseY);
}
function confettiParty(){
textSize(27);
stroke(0);
strokeWeight(5);
textFont("Georgia");
textStyle("italic");
text("Confetti Party!", height/2, width/2);
}
function spots(){
frameRate(20);
spot.x = random(0,width);
spot.y = random(0, height);
noStroke();
fill(col.r,col.g,col.b);
ellipse (spot.x,spot.y,10,10);
}
var spot = {
x:100,
y:50,
}
function sprinkles(){
frameRate(20);
sprinkles.x = random(0,width);
sprinkles.y = random(0, height);
noStroke();
fill(col.r,col.g,col.b);
ellipse (sprinkles.x,sprinkles.y,20,10);
}
var sprinkles = {
x:100,
y:50,
}
var col = {
r:250,
g:230,
b:240,
}
function setup() { 
createCanvas(400, 400);
} 
function draw() {
confettiParty();
spots();
spots(1);
spots(2);
spots(3);
spots(4);
spots(5);
sprinkles();
col.r = random(220,255);
col.g = random(0,220);
col.b = random(255);
var x = 0;
var y = 10;
var w = 10;
var h = 10;
var sliderStart = 100;
var sliderEnd = 130;
var offsetX = 0; 
function setup() { 
createCanvas(700, 700);
} 
function draw() { 
background(255);
fill(219,217,208);
noStroke();
rect(30, 20, 400, 650, 20, 20, 100, 20);
stroke(180);
strokeWeight(5);
line(32,50,426,50);
line(70,22,70,50);
line(390,22,390,50);
fill(219,217,208);
line(100,19,115,19);
fill(85,87,120);
noStroke();
rect(70, 70, 320, 250, 20, 20, 60, 20);
fill(17,28,118);
textSize(18);
textFont("Arial");
textStyle("bold");
text("Nintendo", 70, 350);
fill(17,28,118);
textSize(24);
textFont("Arial");
textStyle("italic");
text("GAME BOY", 152, 350);
fill(17,28,118);
textSize(8);
textFont("Arial");
textStyle("bold");
text("TM", 280, 350);
push();
translate(70, 400);
rotate(-44.4);
stroke(140);
strokeWeight(1);
noFill();
rect(98, 250, 10, 70, 20, 20, 20, 20);
rect(122, 250, 10, 70, 20, 20, 20, 20);
rect(146, 250, 10, 70, 20, 20, 20, 20);
rect(168, 250, 10, 70, 20, 20, 20, 20);
rect(192, 250, 10, 70, 20, 20, 20, 20);
rect(216, 250, 10, 70, 20, 20, 20, 20);
fill(140);
noStroke();
textSize(15);
rect(0, 150, 60, 12, 20, 20, 20, 20);
rect(60, 190, 60, 12, 20, 20, 20, 20);
fill(17,28,118);
text("SELECT", 2, 178);
text("START", 66, 218);
fill(140, 27, 79);
ellipse(260,150, 50, 50);
ellipse(190,150, 50, 50);
fill(17,28,118);
text("A", 255,190);
text("B", 185,192);
pop();
fill(0);
rect( 70, 425, 85, 35, 5, 5, 5, 5);
rect( 95, 400, 35, 85, 5, 5, 5, 5);
if ( mouseIsPressed && sliderEnd == 130) {
fill(0,frameCount%260, 0);
rect(130, 100, 200, 180);
} 
strokeWeight(1);
stroke(0);
stroke(44);
strokeWeight(2);
rect(0, -100, 150, 100);
if (dragging) {
x = mouseX + offsetX;
}
x = constrain(x, sliderStart, sliderEnd-w);
stroke(0);
stroke(0);
if (dragging) {
fill (50);
} else {
fill(175);
}
rect(x, y, w, h);
var b = map(x,sliderStart,sliderEnd-w,0,255);
}
function mousePressed() {
if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
dragging = true;
offsetX = x-mouseX;
}
}
function mouseReleased() {
dragging = false;
var ball = {
x: 0,
y: 0,
d: 0,
xspeed: 10,
yspeed: 10
};
var button = {
x: 0,
y: 0,
d: 100
};
function setup() { 
createCanvas(400, 400);
ball.x = random(0, width);
ball.y = random(0, height);
ball.d = random(10, 30);
button.x = width - button.d;
button.y = height - button.d;
} 
function draw() { 
background(220);
}
rect(button.x, button.y, button.d, button.d);
if (mouseIsPressed && mouseX > button.x && mouseX < button.x + button.d &&
mouseY > button.y && mouseY < button.y + button.d) {
fill(0);
} else {
fill(255);
}
ellipse(ball.x, ball.y, ball.d);
ball.x = ball.x + ball.xspeed;
ball.y = ball.y + ball.yspeed; 
if (ball.x > width || ball.x < 0) {
ball.xspeed = ball.xspeed * -1;
}
if (ball.y > height || ball.y < 0) {
ball.yspeed = ball.yspeed * -1;
}
var boat = {
x1: -210,
y1: 196,
r: 0,
}
var waves = {
x2: -20,
y2: 410,
}
function setup() {
createCanvas(800, 600);
frameRate(random(10, 120));
}
function draw() {
background(0, 0, 70);
noStroke();
fill(random(255), random(255), 0);
ellipse(mouseX, mouseY, 100);
fill(0, random(100, 255), random(100, 255));
noStroke();
triangle(boat.x1, boat.y1, boat.x1, boat.y1 + 137, boat.x1 + 86, boat.y1 + 98);
fill(0, random(100, 255), random(100, 255));
triangle(boat.x1, boat.y1, boat.x1, boat.y1 + 137, boat.x1 - 87, boat.y1 + 98);
fill(0, random(100, 255), random(100, 255));
triangle(boat.x1 - 210, boat.y1 + 42, boat.x1, boat.y1 + 137, boat.x1 - 124, boat.y1 + 208);
fill(0, random(100, 255), random(100, 255));
triangle(boat.x1 + 210, boat.y1 + 42, boat.x1, boat.y1 + 137, boat.x1 + 123, boat.y1 + 208);
fill(0, random(100, 255), random(100, 255));
triangle(boat.x1, boat.y1 + 137, boat.x1 - 124, boat.y1 + 208, boat.x1 + 123, boat.y1 + 208);
fill(0, random(100, 255), random(100, 255));
triangle(boat.x1 - 210, boat.y1 + 42, boat.x1 - 67, boat.y1 + 75, boat.x1 - 87, boat.y1 + 98);
fill(0, random(100, 255), random(100, 255));
triangle(boat.x1 + 210, boat.y1 + 42, boat.x1 + 86, boat.y1 + 98, boat.x1 + 66, boat.y1 + 75);
boat.x1 = boat.x1 + 1;
if (boat.x1 > width + 210) {
boat.x1 = -210;
}
waves.x2=-20;
for(waves.x2=-20; waves.x2<width; waves.x2+=150){
for(waves.y2=410; waves.y2<height; waves.y2+=50){
noFill();
stroke(0, 0, random(150, 255));
strokeWeight(15);
bezier(waves.x2, waves.y2, waves.x2 + 50, waves.y2 + 50, waves.x2 + 100, waves.y2 - 50, waves.x2 + 150, waves.y2);
}
}
bezier(waves.x2, waves.y2, waves.x2 + 50, waves.y2 + 50, waves.x2 + 100, waves.y2 - 50, waves.x2 + 150, waves.y2);
bezier(waves.x2, waves.y2 + 50, waves.x2 + 50, waves.y2 + 100, waves.x2 + 100, waves.y2, waves.x2 + 150, waves.y2 + 50);
bezier(waves.x2, waves.y2 + 100, waves.x2 + 50, waves.y2 + 150, waves.x2 + 100, waves.y2 + 50, waves.x2 + 150, waves.y2 + 100);
bezier(waves.x2, waves.y2 + 150, waves.x2 + 50, waves.y2 + 200, waves.x2 + 100, waves.y2 + 100, waves.x2 + 150, waves.y2 + 150);
bezier(waves.x2 + 150, waves.y2, waves.x2 + 200, waves.y2 + 50, waves.x2 + 250, waves.y2 - 50, waves.x2 + 300, waves.y2);
bezier(waves.x2 + 150, waves.y2 + 50, waves.x2 + 200, waves.y2 + 100, waves.x2 + 250, waves.y2, waves.x2 + 300, waves.y2 + 50);
bezier(waves.x2 + 150, waves.y2 + 100, waves.x2 + 200, waves.y2 + 150, waves.x2 + 250, waves.y2 + 50, waves.x2 + 300, waves.y2 + 100);
bezier(waves.x2 + 150, waves.y2 + 150, waves.x2 + 200, waves.y2 + 200, waves.x2 + 250, waves.y2 + 100, waves.x2 + 300, waves.y2 + 150);
bezier(waves.x2 + 300, waves.y2, waves.x2 + 350, waves.y2 + 50, waves.x2 + 400, waves.y2 - 50, waves.x2 + 450, waves.y2);
bezier(waves.x2 + 300, waves.y2 + 50, waves.x2 + 350, waves.y2 + 100, waves.x2 + 400, waves.y2, waves.x2 + 450, waves.y2 + 50);
bezier(waves.x2 + 300, waves.y2 + 100, waves.x2 + 350, waves.y2 + 150, waves.x2 + 400, waves.y2 + 50, waves.x2 + 450, waves.y2 + 100);
bezier(waves.x2 + 300, waves.y2 + 150, waves.x2 + 350, waves.y2 + 200, waves.x2 + 400, waves.y2 + 100, waves.x2 + 450, waves.y2 + 150);
bezier(waves.x2 + 450, waves.y2, waves.x2 + 500, waves.y2 + 50, waves.x2 + 550, waves.y2 - 50, waves.x2 + 600, waves.y2);
bezier(waves.x2 + 450, waves.y2 + 50, waves.x2 + 500, waves.y2 + 100, waves.x2 + 550, waves.y2, waves.x2 + 600, waves.y2 + 50);
bezier(waves.x2 + 450, waves.y2 + 100, waves.x2 + 500, waves.y2 + 150, waves.x2 + 550, waves.y2 + 50, waves.x2 + 600, waves.y2 + 100);
bezier(waves.x2 + 450, waves.y2 + 150, waves.x2 + 500, waves.y2 + 200, waves.x2 + 550, waves.y2 + 100, waves.x2 + 600, waves.y2 + 150);
bezier(waves.x2 + 600, waves.y2, waves.x2 + 650, waves.y2 + 50, waves.x2 + 700, waves.y2 - 50, waves.x2 + 750, waves.y2);
bezier(waves.x2 + 600, waves.y2 + 50, waves.x2 + 650, waves.y2 + 100, waves.x2 + 700, waves.y2, waves.x2 + 750, waves.y2 + 50);
bezier(waves.x2 + 600, waves.y2 + 100, waves.x2 + 650, waves.y2 + 150, waves.x2 + 700, waves.y2 + 50, waves.x2 + 750, waves.y2 + 100);
bezier(waves.x2 + 600, waves.y2 + 150, waves.x2 + 650, waves.y2 + 200, waves.x2 + 700, waves.y2 + 100, waves.x2 + 750, waves.y2 + 150);
bezier(waves.x2 + 750, waves.y2, waves.x2 + 800, waves.y2 + 50, waves.x2 + 850, waves.y2 - 50, waves.x2 + 900, waves.y2);
bezier(waves.x2 + 750, waves.y2 + 50, waves.x2 + 800, waves.y2 + 100, waves.x2 + 850, waves.y2, waves.x2 + 900, waves.y2 + 50);
bezier(waves.x2 + 750, waves.y2 + 100, waves.x2 + 800, waves.y2 + 150, waves.x2 + 850, waves.y2 + 50, waves.x2 + 900, waves.y2 + 100);
bezier(waves.x2 + 750, waves.y2 + 150, waves.x2 + 800, waves.y2 + 200, waves.x2 + 850, waves.y2 + 100, waves.x2 + 900, waves.y2 + 150);
function spots(){
frameRate(2);
spot.x = random(0,width);
spot.y = random(180, 220);
noStroke();
fill(col.r,col.g,col.b);
ellipse (spot.x,spot.y,30,30);
}
var spot = {
x:100,
y:50,
}
var col = {
r:250,
g:230,
b:240,
}
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(0);
spots();
spots(1);
spots(2);
spots(3);
spots(4);
col.r = random(100,240);
col.g = random(204,255);
col.b = random(0,204);
var speed = 3;
var movementDir = 1;
var diameterPacman = 180;
var posX = diameterPacman/2;
var isPacmanLeft = false;
var floorY;
var spot = {
x: posX,
y: floorY,
}
var col = {
r:255,
g:0,
b:0,
}
function setup() { 
createCanvas(800, 400);
floorY = height/2
} 
function draw() { 
background(0,100);
line(0,floorY,width,floorY);
fill(255);
ellipse (mouseX, floorY-diameterPacman/2, 30, 30);
col.r = random(100,255);
col.g = random(204,255);
col.b = random(204,220);
frameRate(50);
spot.x = random(0,width);
spot.y = random(floorY,floorY*2);
noStroke();
fill(col.r,col.g,col.b);
ellipse (spot.x,spot.y,30,30);
fill(200,random(100,180),random(180,255));
if (isPacmanLeft) {
arc(posX, floorY-diameterPacman/2, diameterPacman, diameterPacman, PI+QUARTER_PI/2, PI+(QUARTER_PI/2+ PI+3*QUARTER_PI), PIE);
}
else {
arc(posX, floorY-diameterPacman/2, diameterPacman, diameterPacman, QUARTER_PI/2, QUARTER_PI/2+ PI+3*QUARTER_PI, PIE);
}
if (posX > width - diameterPacman/2) {
movementDir = movementDir * (-1);
console.log("now go to the left");
isPacmanLeft = true;
}
if (posX < 0 + diameterPacman/2) {
movementDir = movementDir * (-1);
console.log("now go to the right");
isPacmanLeft = false; 
}
posX = posX + movementDir * speed;
var speed = 3;
var movementDir = 1;
var diameterPacman = 180;
var posX = diameterPacman/2;
var floorY;
var isPacmanLeft = false;
function setup() { 
createCanvas(800, 800);
floorY = height/2
} 
function draw() { 
background(250, 204, 0);
line(0,floorY,width,floorY);
fill(255);
ellipse (mouseX, floorY-diameterPacman/2, 10, 10);
ellipse (mouseX+20, floorY-diameterPacman/2, 10, 10);
ellipse (mouseX+40, floorY-diameterPacman/2, 10, 10);
ellipse (mouseX+60, floorY-diameterPacman/2, 10, 10);
fill(200,random(100,180),random(180,255));
if (isPacmanLeft) {
arc(posX, floorY-diameterPacman/2, diameterPacman, diameterPacman, PI+QUARTER_PI/2, PI+(QUARTER_PI/2+ PI+3*QUARTER_PI), PIE);
}
else {
arc(posX, floorY-diameterPacman/2, diameterPacman, diameterPacman, QUARTER_PI/2, QUARTER_PI/2+ PI+3*QUARTER_PI, PIE);
}
if (posX > width - diameterPacman/2) {
movementDir = movementDir * (-1);
console.log("now go to the left");
isPacmanLeft = true;
}
if (posX < 0 + diameterPacman/2) {
movementDir = movementDir * (-1);
console.log("now go to the right");
isPacmanLeft = false; 
}
posX = posX + movementDir * speed;
var speed = 3;
var movementDir = 1;
var diameterPacman = 180;
var posX = diameterPacman/2;
var floorY;
var isPacmanLeft = false;
function setup() { 
createCanvas(800, 800);
floorY = height/2
} 
function draw() { 
background(220);
line(0,floorY,width,floorY);
fill(200,random(100,180),random(180,255));
if (isPacmanLeft) {
arc(posX, floorY-diameterPacman/2, diameterPacman, diameterPacman, PI+QUARTER_PI/2, PI+(QUARTER_PI/2+ PI+3*QUARTER_PI), PIE);
}
else {
arc(posX, floorY-diameterPacman/2, diameterPacman, diameterPacman, QUARTER_PI/2, QUARTER_PI/2+ PI+3*QUARTER_PI, PIE);
}
if (posX > width - diameterPacman/2) {
movementDir = movementDir * (-1);
console.log("now go to the left");
isPacmanLeft = true;
}
if (posX < 0 + diameterPacman/2) {
movementDir = movementDir * (-1);
console.log("now go to the right");
isPacmanLeft = false; 
}
posX = posX + movementDir * speed;
}var square;
var other;
function setup() { 
createCanvas(400, 400);
square = {
x:10,
y:100,
w:50,
h:50
};
other = {
x:100,
y:50,
w:random(0,100),
h:random(0,50)
};
}
function draw() { 
background(220);
square.x++;
other.y++;
rect(square.x, square.y, square.w, square.h);
rect(other.x,other.y, other.w, other.h);
}function setup() { 
createCanvas(400, 400);
frameRate(4);
} 
var x, y;
function draw() { 
background(220);
rect(x,y,20,50);
fill(random(200,250));
rect(50, 50, 52, 52);
fill(mouseX);
rect(75, 75, 52, 52);
fill(mouseX, mouseY, random(200-255));
rect(mouseX, mouseY,20,50);
fill(255,0,0);
rect(random(0,width),random(0,height),20,50);
}
createCanvas(400, 400);
} 
function draw() { 
background(255);
fill(230,255,20);
triangle(30, 75, 80, 15, 130, 75);
line(30,75,30,125)
triangle(30,125, 80, 185, 130, 125);
fill(0);
fill(255,255,20);
arc(300, 300, 180, 180, 80, PI+QUARTER_PI, PIE);
fill(0);
ellipse(240, 265, 15, 8);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(185,0,25);
line(10,105,180,80);
noFill();
ellipse(205,80, 50);
}