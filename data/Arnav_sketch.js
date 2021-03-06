var hrs = [];
var hrsTrail = [];
var th = "01 02 03 04 05 06 07 08 09 10 11 12 ";
var tm = "01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 ";
var ts = "01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 ";
var tst = "01 "
function setup() {
createCanvas(800, 300);
for (i = 0; i < 12; i++) {
hrs[i] = {
x: 0,
y: height/2,
display: function() {
textSize(50)
noStroke();
fill(0);
textAlign(CENTER,CENTER);
for (j = 0; j < 9; j++) {
text([j + 1], this.x + j * 50 + 50, this.y);
}
for(k = 9; k < 12; k++){
text([k + 1], this.x + k * 70-120, this.y);
}
},
move: function() {
this.x--;
}
}
}
}
function draw() {
background(220);
stroke(2)
fill(0)
line(500,0,500,500)
for (i = 0; i < hrs.length; i++) {
hrs[i].display();
hrs[i].move();
}
}var ax = 0;
var bx = 1329;
var tt = "01 02 03 04 05 06 07 08 09 10 11 12 ";
var wait = true;
function setup() { 
createCanvas(1500, 500);
} 
function waitAX(){
ax=500;
}
function startAX(){
ax--;
}
function waitBX(){
bx=500;
}
function startBX(){
bx--;
}
function draw() { 
background(220);
stroke(2)
fill(0)
line(500,0,500,500)
fill(230,0,0)
textSize(80)
textAlign(LEFT)
text("01 02 03 04 05 06 07 08 09 10 11 12 ",ax,height/2)
fill(0,0,0)
textSize(80)
textAlign(LEFT)
text("01 02 03 04 05 06 07 08 09 10 11 12 ",bx,height/2)
if(ax+textWidth(tt)<0){
wait=true;;
waitAX();
}
if(bx+textWidth(tt)<width){
startAX();
wait=false;
}
if(bx+textWidth(tt)<0){
waitBX();
wait=true;
}
if(ax+textWidth(tt)<width){
startBX();
wait=false;
}
}kickOn = false;
snareOn = false;
pianoOn = false;
bassOn = false;
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
var flex1 = 0,
flex2 = 0,
flex3 = 0;
var pianoAnimation = false;
var kick = new Tone.MembraneSynth({
"envelope": {
"sustain": 0,
"attack": 0.02,
"decay": 0.8
},
"octaves": 10
}).toMaster();
var kickPart = new Tone.Loop(function(time) {
kick.triggerAttack("C2");
}, "2n");
var spectrumT = new Tone.Waveform(32);
var snareFilter = new Tone.AutoFilter({
frequency: 1,
type: "sine",
depth: 1,
baseFrequency: 400,
octaves: 2.6,
filter: {
type: "bandpass",
rolloff: -12,
Q: 1
}
}).connect(spectrumT).toMaster();
var snare = new Tone.MetalSynth({
volume: -10,
frequency: 60,
envelope: {
attack: 0.001,
decay: 0.4,
release: 0.2
},
harmonicity: 5.1,
modulationIndex: 1,
resonance: 800,
octaves: 1.5
}).connect(snareFilter);
var snarePart = new Tone.Sequence(function(time, freq) {
snare.frequency.setValueAtTime(freq, time, Math.random() * 0.5 + 0.5);
snare.triggerAttack(time);
}, [null, 350, null, 350], "2n");
var pianoDelay = new Tone.PingPongDelay({
"delayTime": "4t",
"maxDelayTime": 2,
"wet": .3,
"feedback": .1
}).toMaster();
var piano = new Tone.MonoSynth(4, Tone.Synth, {
"volume": -7,
"oscillator": {
"partials": [1, 2, 1],
},
"envelope": {
"attack": 0.001,
"decay": 0.1,
"sustain": 0.3,
"release": 1
},
"portamento": 0.001
}).connect(pianoDelay);
var cChord = ["C4", "E4", "G4"];
var gChord = ["B3", "D4", "G4"];
var amChord = ["C4", "E4", "A4"];
var fChord = ["C4", "F4", "A4"];
var ellipseCoord = {};
var pianoPart = new Tone.Sequence(function(time, note) {
piano.triggerAttackRelease(note, "16n", time);
}, [cChord]);
var fft = new Tone.FFT(32);
var spectrum = new Tone.Waveform(1024);
var bassDist = new Tone.Distortion({
"distortion": 0.4,
"oversample": '2x'
}).connect(spectrum).toMaster();
var bass = new Tone.MonoSynth({
"volume": -10,
"envelope": {
"attack": 0.1,
"decay": 0.3,
"release": 2,
},
"filterEnvelope": {
"attack": 0.001,
"decay": 0.01,
"sustain": 0.5,
"baseFrequency": 200,
"octaves": 2.6
}
}).connect(bassDist);
var bassPart = new Tone.Sequence(function(time, note) {
bass.triggerAttackRelease(note, "16n", time);
}, ["C2"]);
var leadDelay = new Tone.PingPongDelay({
"delayTime": "8n",
"maxDelayTime": 1,
"feedback": 0.82,
"wet": .40
}).toMaster();
var leadPaint = new Tone.PolySynth({
"volume": -5,
"oscillator": {
"type": "square"
},
"envelope": {
"attack": 0.2
},
"portamento": 0.05
}).connect(leadDelay);
var delayKickSend = kick.send("delayKick", -Infinity);
var delaySnareSend = snare.send("delaySnare", -Infinity);
var crushSend = piano.send("crush", -Infinity);
var chebySend = bass.send("cheby", -Infinity);
var delayKick = new Tone.FeedbackDelay("4t", 0.38)
.receive("delayKick")
.toMaster();
var delaySnare = new Tone.FeedbackDelay("8t", 0.25)
.receive("delaySnare")
.toMaster();
var crushPiano = new Tone.BitCrusher(4)
.receive("crush")
.toMaster();
var chebyBass = new Tone.Chebyshev(10)
.receive("cheby")
.toMaster();
Tone.Transport.bpm.value = 60;
Tone.Transport.start();
function setup() {
createCanvas(windowWidth, windowWidth/2);
background(230);
sliderKick = createSlider(1, 6, 2);
sliderKick.position(5, height + 20);
sliderKick.size(width / 4 - 10, 10);
sliderBass = createSlider(1, 4, 1);
sliderBass.position(width / 4 + 5, height + 40);
sliderBass.size(width / 4 - 10, 10);
sliderPiano = createSlider(1, 4, 1);
sliderPiano.position(width / 4 + 5, height + 20);
sliderPiano.size(width / 4 - 10, 10);
sliderSnare = createSlider(1, 6, 2);
sliderSnare.position(5, height + 40);
sliderSnare.size(width / 4 - 10, 10);
sliderFX1 = createSlider(-100,0,-100);
sliderFX1.position(5, height+60);
sliderFX1.size(width/4-10, 10);  
sliderFX2 = createSlider(-100,0,-100);
sliderFX2.position(5, height+80);
sliderFX2.size(width/4-10, 10);  
sliderFX3 = createSlider(-100,0,-100);
sliderFX3.position(5, height+100);
sliderFX3.size(width/4-10, 10);  
sliderFX4 = createSlider(-100,0,-100);
sliderFX4.position(5, height+120);
sliderFX4.size(width/4-10, 10);  
ellipseCoord.c = [width/16, (height/2)*0.2, width/8, (height/2)*0.2, width/5.33, (height/2)*0.2];
ellipseCoord.g = [width/16, (height/2)*0.4, width/8, (height/2)*0.4, width/5.33, (height/2)*0.4];
ellipseCoord.am = [width/16, (height/2)*0.6, width/8, (height/2)*0.6, width/5.33, (height/2)*0.6];
ellipseCoord.f = [width/16, (height/2)*0.8, width/8, (height/2)*0.8, width/5.33, (height/2)*0.8];
}
function draw() {
var kickPulse = kickPart.progress;
var snarePulse = snarePart.progress;
var pianoPulse = pianoPart.progress;
var bassPulse = bassPart.progress;
var loopstate = pianoPart.state;
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
var pt = map(snarePulse, 0, 0.3, 1, 1.2);
var pg = map(snarePulse, 0, 1, 1, 0.5);
var pf = map(snarePulse, 0, 1, 1, 0.2);
kickSwellOuter = map(kickPulse, 0, 1, 0, (width / 4.57)/35);
kickSwellMiddle = map(kickPulse, 0, 1, 0, (width / 5.33)/9);
kickSwellInner = map(kickPulse, 0, 1, 0, (width / 6.66)/3);
alphaOuter = map(kickSwellOuter, 0, 5, 50, 20);
alphaMiddle = map(kickSwellMiddle, 0, 16.7, 90, 30);
var wave = spectrum.getValue();
var waveT = spectrumT.getValue();
var fftwave = fft.getValue();
push();
translate(0, 0);
fill(225);
noStroke();
rect(0, 0, width / 4, height / 2);
noFill();
ellipseMode(CENTER);
stroke(135, 206, 250, alphaOuter);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 4.57 + (kickSwellOuter * -1));
stroke(135, 206, 250, alphaMiddle);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 5.33 + (kickSwellMiddle * -1));
stroke(5, 106, 255);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 6.66 + (kickSwellInner * -1));
pop();
beginShape();
push();
translate(width * 3 / 8, height * 3 / 4);
noStroke();
fill(225);
rect(0 - (width / 8), 0 - (height / 4), width / 4, height / 2)
beginShape();
noFill();
rectMode(CENTER)
for (var i = 0; i < wave.length; i += 600) {
var b = map(wave[i], -1, 1, -40, 40);
var c = map(wave[i], -1, 1, 50, 100);
strokeWeight(2);
rect(0, 0, width / 6.15 + b, height / 3.07 + b);
}
pop();
endShape();
push();
translate(width * 1 / 8, height/1.25);
noStroke();
fill(225);
rect(0 - (width / 8), 0 - (height*0.25+height*0.05), width / 4, height / 2)
for (var j = 0; j < waveT.length; j+=20) {
var d = map(waveT[j], -1, 1, -1, 1);	
stroke(0,210,0);
rotate(d);
noFill();
strokeWeight(2);
triangle(width/-11.42, height/9.83, 0, height/-4.917, width/11.42, height/9.83);
}
pop();
kickPart.playbackRate = sliderKick.value();
snarePart.playbackRate = sliderSnare.value();
push();
translate(width*0.25,0);
fill(225);
noStroke(0);
rect(0,0,width*0.25,height/2);
pop();
if (pianoAnimation == true) {
animateEllipseC(pianoPulse);
}
if (pianoAnimation == true) {
animateEllipseG(pianoPulse);
}
if (pianoAnimation == true) {
animateEllipseAM(pianoPulse);
}
if (pianoAnimation == true) {
animateEllipseF(pianoPulse);
}
if (sliderPiano.value() == 1) {
if (cChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, cChord);
cChordPlaying = true;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 2) {
if (fChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, fChord);
cChordPlaying = false;
fChordPlaying = true;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 3) {
if (gChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, gChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = true;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 4) {
if (amChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, amChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = true;
}
}
if (sliderBass.value() == 1) {
if (cBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "C2");
cBassPlaying = true;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
}
} else if (sliderBass.value() == 2) {
if (fBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "F2");
cBassBassPlaying = false;
fBassBassPlaying = true;
gBassBassPlaying = false;
amBassBassPlaying = false;
}
} else if (sliderBass.value() == 3) {
if (gBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "G1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = true;
amBassPlaying = false;
}
} else if (sliderBass.value() == 4) {
if (amBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "A1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = true;
}
}
delayKickSend.gain.value = sliderFX1.value();
delaySnareSend.gain.value = sliderFX2.value();
crushSend.gain.value = sliderFX3.value();
chebySend.gain.value = sliderFX4.value();
if (mouseX > width / 2 && mouseX < width &&
mouseY > 0 && mouseY < width) {
if (mouseIsPressed) {
for (i = 0; i < 15; i++) {
noStroke();
fill(255, 0, 0);
ellipse(mouseX, mouseY, i, i);
}
}
fill(230,15);
noStroke();
rect(width / 2, 0, width / 2, height);
if (keyIsPressed) {
fill(230);
rect(width / 2, 0, width / 2, height);
leadPaint.triggerRelease();
}
}
}
function animateEllipseC(pianoPulse) {
if (sliderPiano.value() == 1) {
var coord = ellipseCoord.c;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(200, 50)
fill(124, 225, 0, 200);
noStroke();
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
ellipse(coord[index], coord[index + 1], pp*60, pp*60);
pop();
}
}
function animateEllipseF(pianoPulse) {
if (sliderPiano.value() == 2) {
var coord = ellipseCoord.f;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(200, 50)
fill(140, 180, 121, 200);
noStroke();
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
ellipse(coord[index], coord[index + 1], pp*80, pp*80);
pop();
}
}
function animateEllipseG(pianoPulse) {
if (sliderPiano.value() == 3) {
var coord = ellipseCoord.g;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(200, 50)
fill(100, 120, 190, 200);
noStroke();
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
ellipse(coord[index], coord[index + 1], pp*40, pp*40);
pop();
}
}
function animateEllipseAM(pianoPulse) {
if (sliderPiano.value() == 4) {
var coord = ellipseCoord.am;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(200, 50)
fill(90, 100, 60, 200);
noStroke();
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
ellipse(coord[index], coord[index + 1], pp*50, pp*50);
pop();
}
}
function touchMoved() {
var paintNote = ["C4", "E4", "G4", "A4", "C5", "E5", "G5", "A5", "C6"]
if (mouseX > width / 2 && mouseX < width &&
mouseY > 0 && mouseY < height) {
if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[0], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height / 2 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[6], "8n");
}
}
}
function mousePressed() {
if (mouseX > 0 && mouseX < width / 4 &&
mouseY > 0 && mouseY < height / 2) {
loopKick();
} else if (mouseX > width / 4 && mouseX < width / 2 &&
mouseY > 0 && mouseY < height / 2) {
loopPiano();
pianoAnimation = true;
} else if (mouseX > 0 && mouseX < width / 4 &&
mouseY > height / 2 && mouseY < height) {
loopSnare();
} else if (mouseX > width / 4 && mouseX < width / 2 &&
mouseY > height / 2 && mouseY < height) {
loopBass();
}
}
function loopKick() {
if (!kickOn) {
kickPart.start(0);
kickOn = !kickOn;
} else {
kickPart.stop();
kickOn = !kickOn;
}
}
function loopSnare() {
if (!snareOn) {
snarePart.start(0);
snarePart.loop = true;
snareOn = !snareOn;
} else {
snarePart.loop = false;
snareOn = !snareOn;
}
}
function loopPiano() {
if (!pianoOn) {
pianoPart.start(0);
pianoPart.loop = true;
pianoOn = !pianoOn;
} else {
pianoPart.loop = false;
pianoOn = !pianoOn;
}
}
function loopBass() {
if (!bassOn) {
bassPart.start(0);
bassPart.loop = true;
bassOn = !bassOn;
} else {
bassPart.loop = false;
bassOn = !bassOn;
}
}
document.ontouchmove = function(event){
event.preventDefault();
}
var ex = 0
var bx = 500
var tt = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", ]
var move = 0;
function setup() {
createCanvas(500, 500);
ex = width / 2
function move() {
if ((ex + textWidth(tt)) <= 0) {
ex = textWidth(tt)
} else {
ex -= 70
}
}
setInterval(move, 1000);
}
function draw() {
background(220);
var sc = second();
textSize(80)
textAlign(LEFT)
fill(0);
for (i = 0; i < tt.length; i++) {
text(tt.join(" "), ex, height / 1.2)
}
rectMode(CENTER);
noFill();
rect(width / 2, (height / 1.2) - 25, 80, 100);
}
var ex = 0
var bx = 500
var tt = "1 2 3 4 5 6 7 8 9 10 "
var move = 0;
function setup() { 
createCanvas(500, 500);
var sc = second();
function sx() {
move = move - 50
}
} 
function draw() {
background(220);
textSize(80)
textAlign(LEFT)
text("1 2 3 4 5 6 7 8 9 10 ", ex, height/2)
if( (ex+ textWidth(tt)) <=0){
ex = textWidth(tt)
}
else {
ex--;
}
if( (bx+ textWidth(tt)) <=0){
bx = 500
}
else {
if ( (ex+textWidth(tt) )< 500  || (bx <= 499)) {
bx-- 
}
}
text("1 2 3 4 5 6 7 8 9 10 ", bx, height/2)
}kickOn = false;
snareOn = false;
pianoOn = false;
bassOn = false;
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
var flex1 = 0,
flex2 = 0,
flex3 = 0;
var pianoAnimation = false;
var kick = new Tone.MembraneSynth({
"envelope": {
"sustain": 0,
"attack": 0.02,
"decay": 0.8
},
"octaves": 10
}).toMaster();
var kickPart = new Tone.Loop(function(time) {
kick.triggerAttack("C2");
}, "2n");
var spectrumT = new Tone.Waveform(32);
var snareFilter = new Tone.AutoFilter({
frequency: 1,
type: "sine",
depth: 1,
baseFrequency: 400,
octaves: 2.6,
filter: {
type: "bandpass",
rolloff: -12,
Q: 1
}
}).connect(spectrumT).toMaster();
var snare = new Tone.MetalSynth({
volume: -10,
frequency: 60,
envelope: {
attack: 0.001,
decay: 0.4,
release: 0.2
},
harmonicity: 5.1,
modulationIndex: 1,
resonance: 800,
octaves: 1.5
}).connect(snareFilter);
var snarePart = new Tone.Sequence(function(time, freq) {
snare.frequency.setValueAtTime(freq, time, Math.random() * 0.5 + 0.5);
snare.triggerAttack(time);
}, [null, 350, null, 350], "2n");
var pianoDelay = new Tone.PingPongDelay({
"delayTime": "4t",
"maxDelayTime": 2,
"wet": .3,
"feedback": .1
}).toMaster();
var piano = new Tone.MonoSynth(4, Tone.Synth, {
"volume": -7,
"oscillator": {
"partials": [1, 2, 1],
},
"envelope": {
"attack": 0.001,
"decay": 0.1,
"sustain": 0.3,
"release": 1
},
"portamento": 0.001
}).connect(pianoDelay);
var cChord = ["C4", "E4", "G4"];
var gChord = ["B3", "D4", "G4"];
var amChord = ["C4", "E4", "A4"];
var fChord = ["C4", "F4", "A4"];
var ellipseCoord = {};
var pianoPart = new Tone.Sequence(function(time, note) {
piano.triggerAttackRelease(note, "16n", time);
}, [cChord]);
var fft = new Tone.FFT(32);
var spectrum = new Tone.Waveform(1024);
var bassDist = new Tone.Distortion({
"distortion": 0.4,
"oversample": '2x'
}).connect(spectrum).toMaster();
var bass = new Tone.MonoSynth({
"volume": -10,
"envelope": {
"attack": 0.1,
"decay": 0.3,
"release": 2,
},
"filterEnvelope": {
"attack": 0.001,
"decay": 0.01,
"sustain": 0.5,
"baseFrequency": 200,
"octaves": 2.6
}
}).connect(bassDist);
var bassPart = new Tone.Sequence(function(time, note) {
bass.triggerAttackRelease(note, "16n", time);
}, ["C2"]);
var leadDelay = new Tone.PingPongDelay({
"delayTime": "8n",
"maxDelayTime": 1,
"feedback": 0.82,
"wet": .40
}).toMaster();
var leadPaint = new Tone.PolySynth({
"volume": -10,
"oscillator": {
"type": "square"
},
"envelope": {
"attack": 0.2
},
"portamento": 0.05
}).connect(leadDelay);
var delayKickSend = kick.send("delayKick", -Infinity);
var delaySnareSend = snare.send("delaySnare", -Infinity);
var crushSend = piano.send("crush", -Infinity);
var chebySend = bass.send("cheby", -Infinity);
var delayKick = new Tone.FeedbackDelay("4t", 0.38)
.receive("delayKick")
.toMaster();
var delaySnare = new Tone.FeedbackDelay("8t", 0.25)
.receive("delaySnare")
.toMaster();
var crushPiano = new Tone.BitCrusher(4)
.receive("crush")
.toMaster();
var chebyBass = new Tone.Chebyshev(10)
.receive("cheby")
.toMaster();
Tone.Transport.bpm.value = 60;
Tone.Transport.start();
function setup() {
createCanvas(windowWidth, windowWidth/2);
background(230);
sliderKick = createSlider(1, 6, 2);
sliderKick.position(5, height + 20);
sliderKick.size(width / 4 - 10, 10);
sliderBass = createSlider(1, 4, 1);
sliderBass.position(width / 4 + 5, height + 40);
sliderBass.size(width / 4 - 10, 10);
sliderPiano = createSlider(1, 4, 1);
sliderPiano.position(width / 4 + 5, height + 20);
sliderPiano.size(width / 4 - 10, 10);
sliderSnare = createSlider(1, 6, 2);
sliderSnare.position(5, height + 40);
sliderSnare.size(width / 4 - 10, 10);
sliderFX1 = createSlider(-100,0,-100);
sliderFX1.position(5, height+60);
sliderFX1.size(width/4-10, 10);  
sliderFX2 = createSlider(-100,0,-100);
sliderFX2.position(5, height+80);
sliderFX2.size(width/4-10, 10);  
sliderFX3 = createSlider(-100,0,-100);
sliderFX3.position(5, height+100);
sliderFX3.size(width/4-10, 10);  
sliderFX4 = createSlider(-100,0,-100);
sliderFX4.position(5, height+120);
sliderFX4.size(width/4-10, 10);  
ellipseCoord.c = [width/16, (height/2)*0.2, width/8, (height/2)*0.2, width/5.33, (height/2)*0.2];
ellipseCoord.g = [width/16, (height/2)*0.4, width/8, (height/2)*0.4, width/5.33, (height/2)*0.4];
ellipseCoord.am = [width/16, (height/2)*0.6, width/8, (height/2)*0.6, width/5.33, (height/2)*0.6];
ellipseCoord.f = [width/16, (height/2)*0.8, width/8, (height/2)*0.8, width/5.33, (height/2)*0.8];
}
function draw() {
var kickPulse = kickPart.progress;
var snarePulse = snarePart.progress;
var pianoPulse = pianoPart.progress;
var bassPulse = bassPart.progress;
var loopstate = pianoPart.state;
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
var pt = map(snarePulse, 0, 0.3, 1, 1.2);
var pg = map(snarePulse, 0, 1, 1, 0.5);
var pf = map(snarePulse, 0, 1, 1, 0.2);
kickSwellOuter = map(kickPulse, 0, 1, 0, (width / 4.57)/35);
kickSwellMiddle = map(kickPulse, 0, 1, 0, (width / 5.33)/9);
kickSwellInner = map(kickPulse, 0, 1, 0, (width / 6.66)/3);
alphaOuter = map(kickSwellOuter, 0, 5, 50, 20);
alphaMiddle = map(kickSwellMiddle, 0, 16.7, 90, 30);
var wave = spectrum.getValue();
var waveT = spectrumT.getValue();
var fftwave = fft.getValue();
push();
translate(0, 0);
fill(225);
noStroke();
rect(0, 0, width / 4, height / 2);
noFill();
ellipseMode(CENTER);
stroke(135, 206, 250, alphaOuter);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 4.57 + (kickSwellOuter * -1));
stroke(135, 206, 250, alphaMiddle);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 5.33 + (kickSwellMiddle * -1));
stroke(5, 106, 255);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 6.66 + (kickSwellInner * -1));
pop();
beginShape();
push();
translate(width * 3 / 8, height * 3 / 4);
noStroke();
fill(225);
rect(0 - (width / 8), 0 - (height / 4), width / 4, height / 2)
beginShape();
noFill();
rectMode(CENTER)
for (var i = 0; i < wave.length; i += 600) {
var b = map(wave[i], -1, 1, -40, 40);
var c = map(wave[i], -1, 1, 50, 100);
strokeWeight(2);
rect(0, 0, width / 6.15 + b, height / 3.07 + b);
}
pop();
endShape();
push();
translate(width * 1 / 8, height/1.25);
noStroke();
fill(225);
rect(0 - (width / 8), 0 - (height*0.25+height*0.05), width / 4, height / 2)
for (var j = 0; j < waveT.length; j+=20) {
var d = map(waveT[j], -1, 1, -1, 1);	
stroke(0,210,0);
rotate(d);
noFill();
strokeWeight(2);
triangle(width/-11.42, height/9.83, 0, height/-4.917, width/11.42, height/9.83);
}
pop();
kickPart.playbackRate = sliderKick.value();
snarePart.playbackRate = sliderSnare.value();
push();
translate(width*0.25,0);
fill(225);
noStroke(0);
rect(0,0,width*0.25,height/2);
pop();
if (pianoAnimation == true) {
animateEllipseC(pianoPulse);
}
if (pianoAnimation == true) {
animateEllipseG(pianoPulse);
}
if (pianoAnimation == true) {
animateEllipseAM(pianoPulse);
}
if (pianoAnimation == true) {
animateEllipseF(pianoPulse);
}
if (sliderPiano.value() == 1) {
if (cChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, cChord);
cChordPlaying = true;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 2) {
if (fChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, fChord);
cChordPlaying = false;
fChordPlaying = true;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 3) {
if (gChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, gChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = true;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 4) {
if (amChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, amChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = true;
}
}
if (sliderBass.value() == 1) {
if (cBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "C2");
cBassPlaying = true;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
}
} else if (sliderBass.value() == 2) {
if (fBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "F2");
cBassBassPlaying = false;
fBassBassPlaying = true;
gBassBassPlaying = false;
amBassBassPlaying = false;
}
} else if (sliderBass.value() == 3) {
if (gBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "G1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = true;
amBassPlaying = false;
}
} else if (sliderBass.value() == 4) {
if (amBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "A1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = true;
}
}
delayKickSend.gain.value = sliderFX1.value();
delaySnareSend.gain.value = sliderFX2.value();
crushSend.gain.value = sliderFX3.value();
chebySend.gain.value = sliderFX4.value();
if (mouseX > width / 2 && mouseX < width &&
mouseY > 0 && mouseY < width) {
if (mouseIsPressed) {
for (i = 0; i < 15; i++) {
noStroke();
fill(255, 0, 0);
ellipse(mouseX, mouseY, i, i);
}
}
fill(230,15);
noStroke();
rect(width / 2, 0, width / 2, height);
if (keyIsPressed) {
fill(230);
rect(width / 2, 0, width / 2, height);
leadPaint.triggerRelease();
}
}
}
function animateEllipseC(pianoPulse) {
if (sliderPiano.value() == 1) {
var coord = ellipseCoord.c;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(200, 50)
fill(124, 225, 0, 200);
noStroke();
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
ellipse(coord[index], coord[index + 1], pp*60, pp*60);
pop();
}
}
function animateEllipseF(pianoPulse) {
if (sliderPiano.value() == 2) {
var coord = ellipseCoord.f;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(200, 50)
fill(140, 180, 121, 200);
noStroke();
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
ellipse(coord[index], coord[index + 1], pp*80, pp*80);
pop();
}
}
function animateEllipseG(pianoPulse) {
if (sliderPiano.value() == 3) {
var coord = ellipseCoord.g;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(200, 50)
fill(100, 120, 190, 200);
noStroke();
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
ellipse(coord[index], coord[index + 1], pp*40, pp*40);
pop();
}
}
function animateEllipseAM(pianoPulse) {
if (sliderPiano.value() == 4) {
var coord = ellipseCoord.am;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(200, 50)
fill(90, 100, 60, 200);
noStroke();
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
ellipse(coord[index], coord[index + 1], pp*50, pp*50);
pop();
}
}
function touchMoved() {
var paintNote = ["C4", "E4", "G4", "A4", "C5", "E5", "G5"]
if (mouseX > width / 2 && mouseX < width &&
mouseY > 0 && mouseY < height) {
if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[0], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height / 2 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[6], "8n");
}
}
for (var t = 0; t < touches.length; t++) {
leadPaint.triggerAttackRelease(paintNote[t], "8n")
fill(255,0,0)
ellipse(touches[t].x, touches[t].y, 15, 15);
}
}
function touchStarted() {
if (mouseX > 0 && mouseX < width / 4 &&
mouseY > 0 && mouseY < height / 2) {
loopKick();
} else if (mouseX > width / 4 && mouseX < width / 2 &&
mouseY > 0 && mouseY < height / 2) {
loopPiano();
pianoAnimation = true;
} else if (mouseX > 0 && mouseX < width / 4 &&
mouseY > height / 2 && mouseY < height) {
loopSnare();
} else if (mouseX > width / 4 && mouseX < width / 2 &&
mouseY > height / 2 && mouseY < height) {
loopBass();
}
}
function loopKick() {
if (!kickOn) {
kickPart.start(0);
kickOn = !kickOn;
} else {
kickPart.stop();
kickOn = !kickOn;
}
}
function loopSnare() {
if (!snareOn) {
snarePart.start(0);
snarePart.loop = true;
snareOn = !snareOn;
} else {
snarePart.loop = false;
snareOn = !snareOn;
}
}
function loopPiano() {
if (!pianoOn) {
pianoPart.start(0);
pianoPart.loop = true;
pianoOn = !pianoOn;
} else {
pianoPart.loop = false;
pianoOn = !pianoOn;
}
}
function loopBass() {
if (!bassOn) {
bassPart.start(0);
bassPart.loop = true;
bassOn = !bassOn;
} else {
bassPart.loop = false;
bassOn = !bassOn;
}
}
document.ontouchmove = function(event){
event.preventDefault();
}
kickOn = false;
snareOn = false;
pianoOn = false;
bassOn = false;
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
var flex1 = 0,
flex2 = 0,
flex3 = 0;
var pianoAnimation = false;
var kick = new Tone.MembraneSynth({
"envelope": {
"sustain": 0,
"attack": 0.02,
"decay": 0.8
},
"octaves": 10
}).toMaster();
var kickPart = new Tone.Loop(function(time) {
kick.triggerAttack("C2");
}, "2n");
var spectrumT = new Tone.Waveform(32);
var snareFilter = new Tone.AutoFilter({
frequency: 1,
type: "sine",
depth: 1,
baseFrequency: 400,
octaves: 2.6,
filter: {
type: "bandpass",
rolloff: -12,
Q: 1
}
}).connect(spectrumT).toMaster();
var snare = new Tone.MetalSynth({
volume: -10,
frequency: 60,
envelope: {
attack: 0.001,
decay: 0.4,
release: 0.2
},
harmonicity: 5.1,
modulationIndex: 1,
resonance: 800,
octaves: 1.5
}).connect(snareFilter);
var snarePart = new Tone.Sequence(function(time, freq) {
snare.frequency.setValueAtTime(freq, time, Math.random() * 0.5 + 0.5);
snare.triggerAttack(time);
}, [null, 350, null, 350], "2n");
var pianoDelay = new Tone.PingPongDelay({
"delayTime": "4t",
"maxDelayTime": 2,
"wet": .3,
"feedback": .1
}).toMaster();
var piano = new Tone.MonoSynth(4, Tone.Synth, {
"volume": -7,
"oscillator": {
"partials": [1, 2, 1],
},
"envelope": {
"attack": 0.001,
"decay": 0.1,
"sustain": 0.3,
"release": 1
},
"portamento": 0.001
}).connect(pianoDelay);
var cChord = ["C4", "E4", "G4"];
var gChord = ["B3", "D4", "G4"];
var amChord = ["C4", "E4", "A4"];
var fChord = ["C4", "F4", "A4"];
var ellipseCoord = {};
var pianoPart = new Tone.Sequence(function(time, note) {
piano.triggerAttackRelease(note, "16n", time);
}, [cChord]);
var fft = new Tone.FFT(32);
var spectrum = new Tone.Waveform(1024);
var bassDist = new Tone.Distortion({
"distortion": 0.4,
"oversample": '2x'
}).connect(spectrum).toMaster();
var bass = new Tone.MonoSynth({
"volume": -10,
"envelope": {
"attack": 0.1,
"decay": 0.3,
"release": 2,
},
"filterEnvelope": {
"attack": 0.001,
"decay": 0.01,
"sustain": 0.5,
"baseFrequency": 200,
"octaves": 2.6
}
}).connect(bassDist);
var bassPart = new Tone.Sequence(function(time, note) {
bass.triggerAttackRelease(note, "16n", time);
}, ["C2"]);
var leadDelay = new Tone.PingPongDelay({
"delayTime": "8n",
"maxDelayTime": 1,
"feedback": 0.82,
"wet": .40
}).toMaster();
var leadPaint = new Tone.PolySynth({
"volume": -10,
"oscillator": {
"type": "square"
},
"envelope": {
"attack": 0.2
},
"portamento": 0.05
}).connect(leadDelay);
var delayKickSend = kick.send("delayKick", -Infinity);
var delaySnareSend = snare.send("delaySnare", -Infinity);
var crushSend = piano.send("crush", -Infinity);
var chebySend = bass.send("cheby", -Infinity);
var delayKick = new Tone.FeedbackDelay("4t", 0.38)
.receive("delayKick")
.toMaster();
var delaySnare = new Tone.FeedbackDelay("8t", 0.25)
.receive("delaySnare")
.toMaster();
var crushPiano = new Tone.BitCrusher(4)
.receive("crush")
.toMaster();
var chebyBass = new Tone.Chebyshev(10)
.receive("cheby")
.toMaster();
Tone.Transport.bpm.value = 60;
Tone.Transport.start();
function setup() {
createCanvas(windowWidth, windowWidth/2);
background(230);
sliderKick = createSlider(1, 6, 2);
sliderKick.position(5, height + 20);
sliderKick.size(width / 4 - 10, 10);
sliderBass = createSlider(1, 4, 1);
sliderBass.position(width / 4 + 5, height + 40);
sliderBass.size(width / 4 - 10, 10);
sliderPiano = createSlider(1, 4, 1);
sliderPiano.position(width / 4 + 5, height + 20);
sliderPiano.size(width / 4 - 10, 10);
sliderSnare = createSlider(1, 6, 2);
sliderSnare.position(5, height + 40);
sliderSnare.size(width / 4 - 10, 10);
sliderFX1 = createSlider(-100,0,-100);
sliderFX1.position(5, height+60);
sliderFX1.size(width/4-10, 10);  
sliderFX2 = createSlider(-100,0,-100);
sliderFX2.position(5, height+80);
sliderFX2.size(width/4-10, 10);  
sliderFX3 = createSlider(-100,0,-100);
sliderFX3.position(5, height+100);
sliderFX3.size(width/4-10, 10);  
sliderFX4 = createSlider(-100,0,-100);
sliderFX4.position(5, height+120);
sliderFX4.size(width/4-10, 10);  
ellipseCoord.c = [width/16, (height/2)*0.2, width/8, (height/2)*0.2, width/5.33, (height/2)*0.2];
ellipseCoord.g = [width/16, (height/2)*0.4, width/8, (height/2)*0.4, width/5.33, (height/2)*0.4];
ellipseCoord.am = [width/16, (height/2)*0.6, width/8, (height/2)*0.6, width/5.33, (height/2)*0.6];
ellipseCoord.f = [width/16, (height/2)*0.8, width/8, (height/2)*0.8, width/5.33, (height/2)*0.8];
}
function draw() {
var kickPulse = kickPart.progress;
var snarePulse = snarePart.progress;
var pianoPulse = pianoPart.progress;
var bassPulse = bassPart.progress;
var loopstate = pianoPart.state;
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
var pt = map(snarePulse, 0, 0.3, 1, 1.2);
var pg = map(snarePulse, 0, 1, 1, 0.5);
var pf = map(snarePulse, 0, 1, 1, 0.2);
kickSwellOuter = map(kickPulse, 0, 1, 0, (width / 4.57)/35);
kickSwellMiddle = map(kickPulse, 0, 1, 0, (width / 5.33)/9);
kickSwellInner = map(kickPulse, 0, 1, 0, (width / 6.66)/3);
alphaOuter = map(kickSwellOuter, 0, 5, 50, 20);
alphaMiddle = map(kickSwellMiddle, 0, 16.7, 90, 30);
var wave = spectrum.getValue();
var waveT = spectrumT.getValue();
var fftwave = fft.getValue();
push();
translate(0, 0);
fill(225);
noStroke();
rect(0, 0, width / 4, height / 2);
noFill();
ellipseMode(CENTER);
stroke(135, 206, 250, alphaOuter);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 4.57 + (kickSwellOuter * -1));
stroke(135, 206, 250, alphaMiddle);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 5.33 + (kickSwellMiddle * -1));
stroke(5, 106, 255);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 6.66 + (kickSwellInner * -1));
pop();
beginShape();
push();
translate(width * 3 / 8, height * 3 / 4);
noStroke();
fill(225);
rect(0 - (width / 8), 0 - (height / 4), width / 4, height / 2)
beginShape();
noFill();
rectMode(CENTER)
for (var i = 0; i < wave.length; i += 600) {
var b = map(wave[i], -1, 1, -40, 40);
var c = map(wave[i], -1, 1, 50, 100);
strokeWeight(2);
rect(0, 0, width / 6.15 + b, height / 3.07 + b);
}
pop();
endShape();
push();
translate(width * 1 / 8, height/1.25);
noStroke();
fill(225);
rect(0 - (width / 8), 0 - (height*0.25+height*0.05), width / 4, height / 2)
for (var j = 0; j < waveT.length; j+=20) {
var d = map(waveT[j], -1, 1, -1, 1);	
stroke(0,210,0);
rotate(d);
noFill();
strokeWeight(2);
triangle(width/-11.42, height/9.83, 0, height/-4.917, width/11.42, height/9.83);
}
pop();
kickPart.playbackRate = sliderKick.value();
snarePart.playbackRate = sliderSnare.value();
push();
translate(width*0.25,0);
fill(225);
noStroke(0);
rect(0,0,width*0.25,height/2);
pop();
if (pianoAnimation == true) {
animateEllipseC(pianoPulse);
}
if (pianoAnimation == true) {
animateEllipseG(pianoPulse);
}
if (pianoAnimation == true) {
animateEllipseAM(pianoPulse);
}
if (pianoAnimation == true) {
animateEllipseF(pianoPulse);
}
if (sliderPiano.value() == 1) {
if (cChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, cChord);
cChordPlaying = true;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 2) {
if (fChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, fChord);
cChordPlaying = false;
fChordPlaying = true;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 3) {
if (gChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, gChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = true;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 4) {
if (amChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, amChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = true;
}
}
if (sliderBass.value() == 1) {
if (cBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "C2");
cBassPlaying = true;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
}
} else if (sliderBass.value() == 2) {
if (fBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "F2");
cBassBassPlaying = false;
fBassBassPlaying = true;
gBassBassPlaying = false;
amBassBassPlaying = false;
}
} else if (sliderBass.value() == 3) {
if (gBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "G1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = true;
amBassPlaying = false;
}
} else if (sliderBass.value() == 4) {
if (amBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "A1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = true;
}
}
delayKickSend.gain.value = sliderFX1.value();
delaySnareSend.gain.value = sliderFX2.value();
crushSend.gain.value = sliderFX3.value();
chebySend.gain.value = sliderFX4.value();
if (mouseX > width / 2 && mouseX < width &&
mouseY > 0 && mouseY < width) {
if (mouseIsPressed) {
for (i = 0; i < 15; i++) {
noStroke();
fill(255, 0, 0);
ellipse(mouseX, mouseY, i, i);
}
}
fill(230,15);
noStroke();
rect(width / 2, 0, width / 2, height);
if (keyIsPressed) {
fill(230);
rect(width / 2, 0, width / 2, height);
leadPaint.triggerRelease();
}
}
}
function animateEllipseC(pianoPulse) {
if (sliderPiano.value() == 1) {
var coord = ellipseCoord.c;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(200, 50)
fill(124, 225, 0, 200);
noStroke();
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
ellipse(coord[index], coord[index + 1], pp*60, pp*60);
pop();
}
}
function animateEllipseF(pianoPulse) {
if (sliderPiano.value() == 2) {
var coord = ellipseCoord.f;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(200, 50)
fill(140, 180, 121, 200);
noStroke();
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
ellipse(coord[index], coord[index + 1], pp*80, pp*80);
pop();
}
}
function animateEllipseG(pianoPulse) {
if (sliderPiano.value() == 3) {
var coord = ellipseCoord.g;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(200, 50)
fill(100, 120, 190, 200);
noStroke();
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
ellipse(coord[index], coord[index + 1], pp*40, pp*40);
pop();
}
}
function animateEllipseAM(pianoPulse) {
if (sliderPiano.value() == 4) {
var coord = ellipseCoord.am;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(200, 50)
fill(90, 100, 60, 200);
noStroke();
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
ellipse(coord[index], coord[index + 1], pp*50, pp*50);
pop();
}
}
function touchMoved() {
var paintNote = ["C4", "E4", "G4", "A4", "C5", "E5", "G5", "A5", "C6"]
if (mouseX > width / 2 && mouseX < width &&
mouseY > 0 && mouseY < height) {
if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[0], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height / 2 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[6], "8n");
}
}
}
function mousePressed() {
if (mouseX > 0 && mouseX < width / 4 &&
mouseY > 0 && mouseY < height / 2) {
loopKick();
} else if (mouseX > width / 4 && mouseX < width / 2 &&
mouseY > 0 && mouseY < height / 2) {
loopPiano();
pianoAnimation = true;
} else if (mouseX > 0 && mouseX < width / 4 &&
mouseY > height / 2 && mouseY < height) {
loopSnare();
} else if (mouseX > width / 4 && mouseX < width / 2 &&
mouseY > height / 2 && mouseY < height) {
loopBass();
}
}
function loopKick() {
if (!kickOn) {
kickPart.start(0);
kickOn = !kickOn;
} else {
kickPart.stop();
kickOn = !kickOn;
}
}
function loopSnare() {
if (!snareOn) {
snarePart.start(0);
snarePart.loop = true;
snareOn = !snareOn;
} else {
snarePart.loop = false;
snareOn = !snareOn;
}
}
function loopPiano() {
if (!pianoOn) {
pianoPart.start(0);
pianoPart.loop = true;
pianoOn = !pianoOn;
} else {
pianoPart.loop = false;
pianoOn = !pianoOn;
}
}
function loopBass() {
if (!bassOn) {
bassPart.start(0);
bassPart.loop = true;
bassOn = !bassOn;
} else {
bassPart.loop = false;
bassOn = !bassOn;
}
}
document.ontouchmove = function(event){
event.preventDefault();
}
kickOn = false;
snareOn = false;
pianoOn = false;
bassOn = false;
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
var flex1 = 0,
flex2 = 0,
flex3 = 0;
var pianoAnimation = false;
var kick = new Tone.MembraneSynth({
"envelope": {
"sustain": 0,
"attack": 0.02,
"decay": 0.8
},
"octaves": 10
}).toMaster();
var kickPart = new Tone.Loop(function(time) {
kick.triggerAttack("C2");
}, "2n");
var spectrumT = new Tone.Waveform(32);
var snareFilter = new Tone.AutoFilter({
frequency: 1,
type: "sine",
depth: 1,
baseFrequency: 400,
octaves: 2.6,
filter: {
type: "bandpass",
rolloff: -12,
Q: 1
}
}).toMaster();
var snare = new Tone.MetalSynth({
volume: -10,
frequency: 60,
envelope: {
attack: 0.001,
decay: 0.4,
release: 0.2
},
harmonicity: 5.1,
modulationIndex: 1,
resonance: 800,
octaves: 1.5
}).connect(snareFilter);
var snarePart = new Tone.Sequence(function(time, freq) {
snare.frequency.setValueAtTime(freq, time, Math.random() * 0.5 + 0.5);
snare.triggerAttack(time);
}, [null, 350, null, 350], "2n");
var pianoDelay = new Tone.PingPongDelay({
"delayTime": "4t",
"maxDelayTime": 2,
"wet": .3,
"feedback": .1
}).toMaster();
var piano = new Tone.MonoSynth(4, Tone.Synth, {
"volume": -7,
"oscillator": {
"partials": [1, 2, 1],
},
"envelope": {
"attack": 0.001,
"decay": 0.1,
"sustain": 0.3,
"release": 1
},
"portamento": 0.001
}).connect(pianoDelay);
var cChord = ["C4", "E4", "G4"];
var gChord = ["B3", "D4", "G4"];
var amChord = ["C4", "E4", "A4"];
var fChord = ["C4", "F4", "A4"];
var ellipseCoord = {};
var pianoPart = new Tone.Sequence(function(time, note) {
piano.triggerAttackRelease(note, "16n", time);
}, [cChord]);
var fft = new Tone.FFT(32);
var spectrum = new Tone.Waveform(1024);
var bassDist = new Tone.Distortion({
"distortion": 0.4,
"oversample": '2x'
}).connect(spectrum).toMaster();
var bass = new Tone.MonoSynth({
"volume": -10,
"envelope": {
"attack": 0.1,
"decay": 0.3,
"release": 2,
},
"filterEnvelope": {
"attack": 0.001,
"decay": 0.01,
"sustain": 0.5,
"baseFrequency": 200,
"octaves": 2.6
}
}).connect(bassDist);
var bassPart = new Tone.Sequence(function(time, note) {
bass.triggerAttackRelease(note, "16n", time);
}, ["C2"]);
var leadDelay = new Tone.PingPongDelay({
"delayTime": "8n",
"maxDelayTime": 1,
"feedback": 0.82,
"wet": .40
}).toMaster();
var leadPaint = new Tone.PolySynth({
"volume": -10,
"oscillator": {
"type": "square"
},
"envelope": {
"attack": 0.2
},
"portamento": 0.05
}).connect(leadDelay);
var delayKickSend = kick.send("delayKick", -Infinity);
var delaySnareSend = snare.send("delaySnare", -Infinity);
var crushSend = piano.send("crush", -Infinity);
var chebySend = bass.send("cheby", -Infinity);
var delayKick = new Tone.FeedbackDelay("4t", 0.38)
.receive("delayKick")
.toMaster();
var delaySnare = new Tone.FeedbackDelay("8t", 0.25)
.receive("delaySnare")
.toMaster();
var crushPiano = new Tone.BitCrusher(4)
.receive("crush")
.toMaster();
var chebyBass = new Tone.Chebyshev(10)
.receive("cheby")
.toMaster();
Tone.Transport.bpm.value = 60;
Tone.Transport.start();
function setup() {
createCanvas(windowWidth, windowWidth/2);
background(230);
sliderKick = createSlider(1, 6, 2);
sliderKick.position(5, height + 20);
sliderKick.size(width / 4 - 10, 10);
sliderBass = createSlider(1, 4, 1);
sliderBass.position(width / 4 + 5, height + 40);
sliderBass.size(width / 4 - 10, 10);
sliderPiano = createSlider(1, 4, 1);
sliderPiano.position(width / 4 + 5, height + 20);
sliderPiano.size(width / 4 - 10, 10);
sliderSnare = createSlider(1, 6, 2);
sliderSnare.position(5, height + 40);
sliderSnare.size(width / 4 - 10, 10);
sliderFX1 = createSlider(-100,0,-100);
sliderFX1.position(5, height+60);
sliderFX1.size(width/4-10, 10);  
sliderFX2 = createSlider(-100,0,-100);
sliderFX2.position(5, height+80);
sliderFX2.size(width/4-10, 10);  
sliderFX3 = createSlider(-100,0,-100);
sliderFX3.position(5, height+100);
sliderFX3.size(width/4-10, 10);  
sliderFX4 = createSlider(-100,0,-100);
sliderFX4.position(5, height+120);
sliderFX4.size(width/4-10, 10);  
ellipseCoord.c = [width/16, (height/2)*0.2, width/8, (height/2)*0.2, width/5.33, (height/2)*0.2];
ellipseCoord.g = [width/16, (height/2)*0.4, width/8, (height/2)*0.4, width/5.33, (height/2)*0.4];
ellipseCoord.am = [width/16, (height/2)*0.6, width/8, (height/2)*0.6, width/5.33, (height/2)*0.6];
ellipseCoord.f = [width/16, (height/2)*0.8, width/8, (height/2)*0.8, width/5.33, (height/2)*0.8];
}
function draw() {
var kickPulse = kickPart.progress;
var snarePulse = snarePart.progress;
var pianoPulse = pianoPart.progress;
var bassPulse = bassPart.progress;
var loopstate = pianoPart.state;
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
var pt = map(snarePulse, 0, 0.3, 1, 1.2);
var pg = map(snarePulse, 0, 1, 1, 0.5);
var pf = map(snarePulse, 0, 1, 1, 0.2);
kickSwellOuter = map(kickPulse, 0, 1, 0, (width / 4.57)/35);
kickSwellMiddle = map(kickPulse, 0, 1, 0, (width / 5.33)/9);
kickSwellInner = map(kickPulse, 0, 1, 0, (width / 6.66)/3);
alphaOuter = map(kickSwellOuter, 0, 5, 50, 20);
alphaMiddle = map(kickSwellMiddle, 0, 16.7, 90, 30);
var wave = spectrum.getValue();
var fftwave = fft.getValue();
push();
translate(0, 0);
fill(225);
noStroke();
rect(0, 0, width / 4, height / 2);
noFill();
ellipseMode(CENTER);
stroke(135, 206, 250, alphaOuter);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 4.57 + (kickSwellOuter * -1));
stroke(135, 206, 250, alphaMiddle);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 5.33 + (kickSwellMiddle * -1));
stroke(5, 106, 255);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 6.66 + (kickSwellInner * -1));
pop();
beginShape();
push();
translate(width * 3 / 8, height * 3 / 4);
noStroke();
fill(225);
rect(0 - (width / 8), 0 - (height / 4), width / 4, height / 2)
beginShape();
noFill();
rectMode(CENTER)
for (var i = 0; i < wave.length; i += 600) {
var b = map(wave[i], -1, 1, -40, 40);
var c = map(wave[i], -1, 1, 50, 100);
strokeWeight(2);
rect(0, 0, width / 6.15 + b, height / 3.07 + b);
}
pop();
endShape();
push();
translate(width * 1 / 8, height/1.25);
noStroke();
fill(225);
rect(0 - (width / 8), 0 - (height*0.25+height*0.05), width / 4, height / 2)
scale(pg);
stroke(255);
point(0, 0)
noFill();
strokeWeight(1);
triangle(width/-11.42, height/9.83, 0, height/-4.917, width/11.42, height/9.83);
pop();
kickPart.playbackRate = sliderKick.value();
snarePart.playbackRate = sliderSnare.value();
push();
translate(width*0.25,0);
fill(225);
noStroke(0);
rect(0,0,width*0.25,height/2);
pop();
if (pianoAnimation == true) {
animateEllipseC(pianoPulse);
}
if (pianoAnimation == true) {
animateEllipseG(pianoPulse);
}
if (pianoAnimation == true) {
animateEllipseAM(pianoPulse);
}
if (pianoAnimation == true) {
animateEllipseF(pianoPulse);
}
if (sliderPiano.value() == 1) {
if (cChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, cChord);
cChordPlaying = true;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 2) {
if (fChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, fChord);
cChordPlaying = false;
fChordPlaying = true;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 3) {
if (gChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, gChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = true;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 4) {
if (amChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, amChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = true;
}
}
if (sliderBass.value() == 1) {
if (cBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "C2");
cBassPlaying = true;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
}
} else if (sliderBass.value() == 2) {
if (fBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "F2");
cBassBassPlaying = false;
fBassBassPlaying = true;
gBassBassPlaying = false;
amBassBassPlaying = false;
}
} else if (sliderBass.value() == 3) {
if (gBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "G1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = true;
amBassPlaying = false;
}
} else if (sliderBass.value() == 4) {
if (amBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "A1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = true;
}
}
delayKickSend.gain.value = sliderFX1.value();
delaySnareSend.gain.value = sliderFX2.value();
crushSend.gain.value = sliderFX3.value();
chebySend.gain.value = sliderFX4.value();
if (mouseX > width / 2 && mouseX < width &&
mouseY > 0 && mouseY < width) {
if (mouseIsPressed) {
for (i = 0; i < 15; i++) {
noStroke();
fill(255, 0, 0);
ellipse(mouseX, mouseY, i, i);
}
}
fill(230,15);
noStroke();
rect(width / 2, 0, width / 2, height);
if (keyIsPressed) {
fill(230);
rect(width / 2, 0, width / 2, height);
leadPaint.triggerRelease();
}
}
}
function animateEllipseC(pianoPulse) {
if (sliderPiano.value() == 1) {
var coord = ellipseCoord.c;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(200, 50)
fill(124, 225, 0, 200);
noStroke();
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
ellipse(coord[index], coord[index + 1], pp*60, pp*60);
pop();
}
}
function animateEllipseF(pianoPulse) {
if (sliderPiano.value() == 2) {
var coord = ellipseCoord.f;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(200, 50)
fill(140, 180, 121, 200);
noStroke();
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
ellipse(coord[index], coord[index + 1], pp*80, pp*80);
pop();
}
}
function animateEllipseG(pianoPulse) {
if (sliderPiano.value() == 3) {
var coord = ellipseCoord.g;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(200, 50)
fill(100, 120, 190, 200);
noStroke();
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
ellipse(coord[index], coord[index + 1], pp*40, pp*40);
pop();
}
}
function animateEllipseAM(pianoPulse) {
if (sliderPiano.value() == 4) {
var coord = ellipseCoord.am;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(200, 50)
fill(90, 100, 60, 200);
noStroke();
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
ellipse(coord[index], coord[index + 1], pp*50, pp*50);
pop();
}
}
function touchMoved() {
var paintNote = ["C4", "E4", "G4", "A4", "C5", "E5", "G5", "A5", "C6"]
if (mouseX > width / 2 && mouseX < width &&
mouseY > 0 && mouseY < height) {
if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[0], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height / 2 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[6], "8n");
}
}
}
function mousePressed() {
if (mouseX > 0 && mouseX < width / 4 &&
mouseY > 0 && mouseY < height / 2) {
loopKick();
} else if (mouseX > width / 4 && mouseX < width / 2 &&
mouseY > 0 && mouseY < height / 2) {
loopPiano();
pianoAnimation = true;
} else if (mouseX > 0 && mouseX < width / 4 &&
mouseY > height / 2 && mouseY < height) {
loopSnare();
} else if (mouseX > width / 4 && mouseX < width / 2 &&
mouseY > height / 2 && mouseY < height) {
loopBass();
}
}
function loopKick() {
if (!kickOn) {
kickPart.start(0);
kickOn = !kickOn;
} else {
kickPart.stop();
kickOn = !kickOn;
}
}
function loopSnare() {
if (!snareOn) {
snarePart.start(0);
snarePart.loop = true;
snareOn = !snareOn;
} else {
snarePart.loop = false;
snareOn = !snareOn;
}
}
function loopPiano() {
if (!pianoOn) {
pianoPart.start(0);
pianoPart.loop = true;
pianoOn = !pianoOn;
} else {
pianoPart.loop = false;
pianoOn = !pianoOn;
}
}
function loopBass() {
if (!bassOn) {
bassPart.start(0);
bassPart.loop = true;
bassOn = !bassOn;
} else {
bassPart.loop = false;
bassOn = !bassOn;
}
}
document.ontouchmove = function(event){
event.preventDefault();
}
kickOn = false;
snareOn = false;
pianoOn = false;
bassOn = false;
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
var flex1 = 0,
flex2 = 0,
flex3 = 0;
var pianoAnimation = false;
var kick = new Tone.MembraneSynth({
"envelope": {
"sustain": 0,
"attack": 0.02,
"decay": 0.8
},
"octaves": 10
}).toMaster();
var kickPart = new Tone.Loop(function(time) {
kick.triggerAttack("C2");
}, "2n");
var snareFilter = new Tone.AutoFilter({
frequency: 1,
type: "sine",
depth: 1,
baseFrequency: 400,
octaves: 2.6,
filter: {
type: "bandpass",
rolloff: -12,
Q: 1
}
}).toMaster();
var snare = new Tone.MetalSynth({
volume: -10,
frequency: 60,
envelope: {
attack: 0.001,
decay: 0.4,
release: 0.2
},
harmonicity: 5.1,
modulationIndex: 1,
resonance: 800,
octaves: 1.5
}).connect(snareFilter);
var snarePart = new Tone.Sequence(function(time, freq) {
snare.frequency.setValueAtTime(freq, time, Math.random() * 0.5 + 0.5);
snare.triggerAttack(time);
}, [null, 350, null, 350], "2n");
var pianoDelay = new Tone.PingPongDelay({
"delayTime": "4t",
"maxDelayTime": 2,
"wet": .3,
"feedback": .1
}).toMaster();
var piano = new Tone.MonoSynth(4, Tone.Synth, {
"volume": -7,
"oscillator": {
"partials": [1, 2, 1],
},
"envelope": {
"attack": 0.001,
"decay": 0.1,
"sustain": 0.3,
"release": 1
},
"portamento": 0.001
}).connect(pianoDelay);
var cChord = ["C4", ["E4", "G4"]];
var gChord = [["B3", "D4"], "G4"];
var amChord = [["C4", "E4"], "A4"];
var fChord = [["C4"], "F4", ["A4"]];
var cChord = ["C4", "E4", "G4"];
var gChord = ["B3", "D4", "G4"];
var amChord = ["C4", "E4", "A4"];
var fChord = ["C4", "F4", "A4"];
var ellipseCoord = {};
var pianoPart = new Tone.Sequence(function(time, note) {
piano.triggerAttackRelease(note, "16n", time);
}, [cChord]);
var fft = new Tone.FFT(32);
var spectrum = new Tone.Waveform(1024);
var bassDist = new Tone.Distortion({
"distortion": 0.4,
"oversample": '2x'
}).connect(spectrum).toMaster();
var bass = new Tone.MonoSynth({
"volume": -10,
"envelope": {
"attack": 0.1,
"decay": 0.3,
"release": 2,
},
"filterEnvelope": {
"attack": 0.001,
"decay": 0.01,
"sustain": 0.5,
"baseFrequency": 200,
"octaves": 2.6
}
}).connect(bassDist);
var bassPart = new Tone.Sequence(function(time, note) {
bass.triggerAttackRelease(note, "16n", time);
}, ["C2"]);
var leadDelay = new Tone.PingPongDelay({
"delayTime": "8n",
"maxDelayTime": 1,
"feedback": 0.82,
"wet": .40
}).toMaster();
var leadPaint = new Tone.PolySynth({
"volume": -10,
"oscillator": {
"type": "square"
},
"envelope": {
"attack": 0.2
},
"portamento": 0.05
}).connect(leadDelay);
Tone.Transport.bpm.value = 60;
Tone.Transport.start();
function setup() {
createCanvas(windowWidth, windowWidth/2);
background(230);
sliderKick = createSlider(1, 6, 2);
sliderKick.position(5, height + 20);
sliderKick.size(width / 4 - 10, 10);
sliderBass = createSlider(1, 4, 1);
sliderBass.position(width / 4 + 5, height + 40);
sliderBass.size(width / 4 - 10, 10);
sliderPiano = createSlider(1, 4, 1);
sliderPiano.position(width / 4 + 5, height + 20);
sliderPiano.size(width / 4 - 10, 10);
sliderSnare = createSlider(1, 6, 2);
sliderSnare.position(5, height + 40);
sliderSnare.size(width / 4 - 10, 10);
ellipseCoord.c = [width/16, (height/2)*0.2, width/8, (height/2)*0.2, width/5.33, (height/2)*0.2];
ellipseCoord.g = [width/16, (height/2)*0.4, width/8, (height/2)*0.4, width/5.33, (height/2)*0.4];
ellipseCoord.am = [width/16, (height/2)*0.6, width/8, (height/2)*0.6, width/5.33, (height/2)*0.6];
ellipseCoord.f = [width/16, (height/2)*0.8, width/8, (height/2)*0.8, width/5.33, (height/2)*0.8];
}
function draw() {
var kickPulse = kickPart.progress;
var snarePulse = snarePart.progress;
var pianoPulse = pianoPart.progress;
var bassPulse = bassPart.progress;
var loopstate = pianoPart.state;
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
var pt = map(snarePulse, 0, 0.3, 1, 1.2);
var pg = map(snarePulse, 0, 1, 1, 0.5);
var pf = map(snarePulse, 0, 1, 1, 0.2);
kickSwellOuter = map(kickPulse, 0, 1, 0, (width / 4.57)/35);
kickSwellMiddle = map(kickPulse, 0, 1, 0, (width / 5.33)/9);
kickSwellInner = map(kickPulse, 0, 1, 0, (width / 6.66)/3);
alphaOuter = map(kickSwellOuter, 0, 5, 50, 20);
alphaMiddle = map(kickSwellMiddle, 0, 16.7, 120, 30);
var wave = spectrum.getValue();
var fftwave = fft.getValue();
push();
translate(0, 0);
fill(225);
noStroke();
rect(0, 0, width / 4, height / 2);
noFill();
ellipseMode(CENTER);
stroke(135, 206, 250, alphaOuter);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 4.57 + (kickSwellOuter * -1));
stroke(135, 206, 250, alphaMiddle);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 5.33 + (kickSwellMiddle * -1));
stroke(5, 106, 255);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 6.66 + (kickSwellInner * -1));
pop();
beginShape();
push();
translate(width * 3 / 8, height * 3 / 4);
noStroke();
fill(225);
rect(0 - (width / 8), 0 - (height / 4), width / 4, height / 2)
beginShape();
noFill();
rectMode(CENTER)
for (var i = 0; i < wave.length; i += 600) {
var b = map(wave[i], -1, 1, -40, 40);
var c = map(wave[i], -1, 1, 50, 100);
strokeWeight(2);
rect(0, 0, width / 6.15 + b, height / 3.07 + b);
}
pop();
endShape();
push();
translate(width * 1 / 8, height/1.25);
noStroke();
fill(225);
rect(0 - (width / 8), 0 - (height*0.25+height*0.05), width / 4, height / 2)
scale(pg);
stroke(255);
point(0, 0)
noFill();
strokeWeight(1);
triangle(width/-11.42, height/9.83, 0, height/-4.917, width/11.42, height/9.83);
pop();
kickPart.playbackRate = sliderKick.value();
snarePart.playbackRate = sliderSnare.value();
push();
translate(width*0.25,0);
fill(225);
noStroke(0);
rect(0,0,width*0.25,height/2);
pop();
if (pianoAnimation == true) {
animateEllipseC(pianoPulse);
}
if (pianoAnimation == true) {
animateEllipseG(pianoPulse);
}
if (pianoAnimation == true) {
animateEllipseAM(pianoPulse);
}
if (pianoAnimation == true) {
animateEllipseF(pianoPulse);
}
if (sliderPiano.value() == 1) {
if (cChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, cChord);
cChordPlaying = true;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 2) {
if (fChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, fChord);
cChordPlaying = false;
fChordPlaying = true;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 3) {
if (gChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, gChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = true;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 4) {
if (amChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, amChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = true;
}
}
if (sliderBass.value() == 1) {
if (cBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "C2");
cBassPlaying = true;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
}
} else if (sliderBass.value() == 2) {
if (fBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "F2");
cBassBassPlaying = false;
fBassBassPlaying = true;
gBassBassPlaying = false;
amBassBassPlaying = false;
}
} else if (sliderBass.value() == 3) {
if (gBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "G1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = true;
amBassPlaying = false;
}
} else if (sliderBass.value() == 4) {
if (amBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "A1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = true;
}
}
if (mouseX > width / 2 && mouseX < width &&
mouseY > 0 && mouseY < width) {
if (mouseIsPressed) {
for (i = 0; i < 15; i++) {
noStroke();
fill(255, 0, 0);
ellipse(mouseX, mouseY, i, i);
}
}
fill(230,15);
noStroke();
rect(width / 2, 0, width / 2, height);
if (keyIsPressed) {
fill(230);
rect(width / 2, 0, width / 2, height);
leadPaint.triggerRelease();
}
}
}
function animateEllipseC(pianoPulse) {
if (sliderPiano.value() == 1) {
var coord = ellipseCoord.c;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(200, 50)
fill(124, 225, 0, 200);
noStroke();
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
ellipse(coord[index], coord[index + 1], pp*60, pp*60);
pop();
}
}
function animateEllipseF(pianoPulse) {
if (sliderPiano.value() == 2) {
var coord = ellipseCoord.f;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(200, 50)
fill(140, 180, 121, 200);
noStroke();
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
ellipse(coord[index], coord[index + 1], pp*80, pp*80);
pop();
}
}
function animateEllipseG(pianoPulse) {
if (sliderPiano.value() == 3) {
var coord = ellipseCoord.g;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(200, 50)
fill(100, 120, 190, 200);
noStroke();
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
ellipse(coord[index], coord[index + 1], pp*40, pp*40);
pop();
}
}
function animateEllipseAM(pianoPulse) {
if (sliderPiano.value() == 4) {
var coord = ellipseCoord.am;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(200, 50)
fill(90, 100, 60, 200);
noStroke();
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
ellipse(coord[index], coord[index + 1], pp*50, pp*50);
pop();
}
}
function touchMoved() {
var paintNote = ["C4", "E4", "G4", "A4", "C5", "E5", "G5", "A5", "C6"]
if (mouseX > width / 2 && mouseX < width &&
mouseY > 0 && mouseY < height) {
if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[0], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height / 2 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[6], "8n");
}
}
}
function mousePressed() {
if (mouseX > 0 && mouseX < width / 4 &&
mouseY > 0 && mouseY < height / 2) {
loopKick();
} else if (mouseX > width / 4 && mouseX < width / 2 &&
mouseY > 0 && mouseY < height / 2) {
loopPiano();
pianoAnimation = true;
} else if (mouseX > 0 && mouseX < width / 4 &&
mouseY > height / 2 && mouseY < height) {
loopSnare();
} else if (mouseX > width / 4 && mouseX < width / 2 &&
mouseY > height / 2 && mouseY < height) {
loopBass();
}
}
function loopKick() {
if (!kickOn) {
kickPart.start(0);
kickOn = !kickOn;
} else {
kickPart.stop();
kickOn = !kickOn;
}
}
function loopSnare() {
if (!snareOn) {
snarePart.start(0);
snarePart.loop = true;
snareOn = !snareOn;
} else {
snarePart.loop = false;
snareOn = !snareOn;
}
}
function loopPiano() {
if (!pianoOn) {
pianoPart.start(0);
pianoPart.loop = true;
pianoOn = !pianoOn;
} else {
pianoPart.loop = false;
pianoOn = !pianoOn;
}
}
function loopBass() {
if (!bassOn) {
bassPart.start(0);
bassPart.loop = true;
bassOn = !bassOn;
} else {
bassPart.loop = false;
bassOn = !bassOn;
}
}
document.ontouchmove = function(event){
event.preventDefault();
}
kickOn = false;
snareOn = false;
pianoOn = false;
bassOn = false;
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
var flex1 = 0,
flex2 = 0,
flex3 = 0;
var pianoAnimation = false;
var kick = new Tone.MembraneSynth({
"envelope": {
"sustain": 0,
"attack": 0.02,
"decay": 0.8
},
"octaves": 10
}).toMaster();
var kickPart = new Tone.Loop(function(time) {
kick.triggerAttack("C2");
}, "2n");
var snareFilter = new Tone.AutoFilter({
frequency: 1,
type: "sine",
depth: 1,
baseFrequency: 400,
octaves: 2.6,
filter: {
type: "bandpass",
rolloff: -12,
Q: 1
}
}).toMaster();
var snare = new Tone.MetalSynth({
volume: -10,
frequency: 60,
envelope: {
attack: 0.001,
decay: 1.4,
release: 0.2
},
harmonicity: 5.1,
modulationIndex: 32,
resonance: 4000,
octaves: 1.5
}).connect(snareFilter);
var snarePart = new Tone.Sequence(function(time, freq) {
snare.frequency.setValueAtTime(freq, time, Math.random() * 0.5 + 0.5);
snare.triggerAttack(time);
}, [null, 200, null, 200], "1n");
var pianoDelay = new Tone.PingPongDelay({
"delayTime": "4t",
"maxDelayTime": 2,
"wet": .3,
"feedback": .1
}).toMaster();
var piano = new Tone.MonoSynth(4, Tone.Synth, {
"volume": -7,
"oscillator": {
"partials": [1, 2, 1],
},
"envelope": {
"attack": 0.001,
"decay": 0.1,
"sustain": 0.3,
"release": 1
},
"portamento": 0.001
}).connect(pianoDelay);
var cChord = ["C4", ["E4", "G4"]];
var gChord = [["B3", "D4"], "G4"];
var amChord = [["C4", "E4"], "A4"];
var fChord = [["C4"], "F4", ["A4"]];
var cChord = ["C4", "E4", "G4"];
var gChord = ["B3", "D4", "G4"];
var amChord = ["C4", "E4", "A4"];
var fChord = ["C4", "F4", "A4"];
var ellipseCoord = {};
var pianoPart = new Tone.Sequence(function(time, note) {
piano.triggerAttackRelease(note, "16n", time);
}, [cChord]);
var fft = new Tone.FFT(32);
var spectrum = new Tone.Waveform(1024);
var bassDist = new Tone.Distortion({
"distortion": 0.4,
"oversample": '2x'
}).connect(spectrum).toMaster();
var bass = new Tone.MonoSynth({
"volume": -10,
"envelope": {
"attack": 0.1,
"decay": 0.3,
"release": 2,
},
"filterEnvelope": {
"attack": 0.001,
"decay": 0.01,
"sustain": 0.5,
"baseFrequency": 200,
"octaves": 2.6
}
}).connect(bassDist);
var bassPart = new Tone.Sequence(function(time, note) {
bass.triggerAttackRelease(note, "16n", time);
}, ["C2"]);
var leadDelay = new Tone.PingPongDelay({
"delayTime": "8n",
"maxDelayTime": 1,
"feedback": 0.82,
"wet": .40
}).toMaster();
var leadPaint = new Tone.PolySynth({
"volume": -10,
"oscillator": {
"type": "square"
},
"envelope": {
"attack": 0.2
},
"portamento": 0.05
}).connect(leadDelay);
Tone.Transport.bpm.value = 60;
Tone.Transport.start();
function setup() {
createCanvas(windowWidth, windowWidth/2);
background(0);
sliderKick = createSlider(1, 6, 2);
sliderKick.position(5, height + 20);
sliderKick.size(width / 4 - 10, 10);
sliderBass = createSlider(1, 4, 1);
sliderBass.position(width / 4 + 5, height + 40);
sliderBass.size(width / 4 - 10, 10);
sliderPiano = createSlider(1, 4, 1);
sliderPiano.position(width / 4 + 5, height + 20);
sliderPiano.size(width / 4 - 10, 10);
sliderSnare = createSlider(1, 6, 2);
sliderSnare.position(5, height + 40);
sliderSnare.size(width / 4 - 10, 10);
ellipseCoord.c = [width/16, (height/2)*0.2, width/8, (height/2)*0.2, width/5.33, (height/2)*0.2];
ellipseCoord.g = [width/16, (height/2)*0.4, width/8, (height/2)*0.4, width/5.33, (height/2)*0.4];
ellipseCoord.am = [width/16, (height/2)*0.6, width/8, (height/2)*0.6, width/5.33, (height/2)*0.6];
ellipseCoord.f = [width/16, (height/2)*0.8, width/8, (height/2)*0.8, width/5.33, (height/2)*0.8];
}
function draw() {
var kickPulse = kickPart.progress;
var snarePulse = snarePart.progress;
var pianoPulse = pianoPart.progress;
var bassPulse = bassPart.progress;
var loopstate = pianoPart.state;
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
var pt = map(snarePulse, 0, 0.3, 1, 1.2);
var pg = map(snarePulse, 0, 1, 1, 0.5);
var pf = map(snarePulse, 0, 1, 1, 0.2);
kickSwellOuter = map(kickPulse, 0, 1, 0, (width / 4.57)/35);
kickSwellMiddle = map(kickPulse, 0, 1, 0, (width / 5.33)/9);
kickSwellInner = map(kickPulse, 0, 1, 0, (width / 6.66)/3);
alphaOuter = map(kickSwellOuter, 0, 5, 50, 20);
alphaMiddle = map(kickSwellMiddle, 0, 16.7, 90, 30);
var wave = spectrum.getValue();
var fftwave = fft.getValue();
fill(0,20);
strokeWeight(2)
rect(width / 4, 0, width / 4, height / 2);
rect(0,width/4,height/2,height);
push();
translate(0, 0);
fill(0);
rect(0, 0, width / 4, height / 2);
noFill();
ellipseMode(CENTER);
stroke(135, 206, 250, alphaOuter);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 4.57 + (kickSwellOuter * -1));
stroke(135, 206, 250, alphaMiddle);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 5.33 + (kickSwellMiddle * -1));
stroke(135, 206, 250);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 6.66 + (kickSwellInner * -1));
pop();
beginShape();
push();
translate(width * 3 / 8, height * 3 / 4);
fill(0);
rect(0 - (width / 8), 0 - (height / 4), width / 4, height / 2)
beginShape();
noFill();
strokeWeight(2);
rectMode(CENTER)
for (var i = 0; i < wave.length; i += 600) {
var b = map(wave[i], -1, 1, -40, 40);
rect(0, 0, width / 6.15 + b, height / 3.07 + b);
}
pop();
endShape();
push();
translate(width * 1 / 8, height/1.25);
scale(pg);
stroke(255);
point(0, 0)
noFill();
strokeWeight(1);
triangle(width/-11.42, height/9.83, 0, height/-4.917, width/11.42, height/9.83);
pop();
kickPart.playbackRate = sliderKick.value();
snarePart.playbackRate = sliderSnare.value();
if (pianoAnimation == true) {
animateEllipseC(pianoPulse);
}
if (pianoAnimation == true) {
animateEllipseG(pianoPulse);
}
if (pianoAnimation == true) {
animateEllipseAM(pianoPulse);
}
if (pianoAnimation == true) {
animateEllipseF(pianoPulse);
}
if (sliderPiano.value() == 1) {
if (cChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, cChord);
cChordPlaying = true;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 2) {
if (fChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, fChord);
cChordPlaying = false;
fChordPlaying = true;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 3) {
if (gChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, gChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = true;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 4) {
if (amChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, amChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = true;
}
}
if (sliderBass.value() == 1) {
if (cBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "C2");
cBassPlaying = true;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
}
} else if (sliderBass.value() == 2) {
if (fBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "F2");
cBassBassPlaying = false;
fBassBassPlaying = true;
gBassBassPlaying = false;
amBassBassPlaying = false;
}
} else if (sliderBass.value() == 3) {
if (gBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "G1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = true;
amBassPlaying = false;
}
} else if (sliderBass.value() == 4) {
if (amBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "A1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = true;
}
}
if (mouseX > width / 2 && mouseX < width &&
mouseY > 0 && mouseY < width) {
if (mouseIsPressed) {
for (i = 0; i < 25; i++) {
noStroke();
fill(255, 100 + i * 3, 100 + i * 5, 255 / i);
ellipse(mouseX, mouseY, i, i);
}
}
fill(0, 2);
rect(width / 2, 0, width / 2, height);
if (keyIsPressed) {
fill(0);
rect(width / 2, 0, width / 2, height);
leadPaint.triggerRelease();
}
}
}
function animateEllipseC(pianoPulse) {
if (sliderPiano.value() == 1) {
var coord = ellipseCoord.c;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(124, 225, 0, 200);
noStroke();
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
ellipse(coord[index], coord[index + 1], pp*60, pp*60);
pop();
}
}
function animateEllipseF(pianoPulse) {
if (sliderPiano.value() == 2) {
var coord = ellipseCoord.f;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(140, 180, 121, 200);
noStroke();
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
ellipse(coord[index], coord[index + 1], pp*80, pp*80);
pop();
}
}
function animateEllipseG(pianoPulse) {
if (sliderPiano.value() == 3) {
var coord = ellipseCoord.g;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(100, 120, 190, 200);
noStroke();
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
ellipse(coord[index], coord[index + 1], pp*40, pp*40);
pop();
}
}
function animateEllipseAM(pianoPulse) {
if (sliderPiano.value() == 4) {
var coord = ellipseCoord.am;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(0, 50)
fill(90, 100, 60, 200);
noStroke();
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
ellipse(coord[index], coord[index + 1], pp*50, pp*50);
pop();
}
}
function touchMoved() {
var paintNote = ["C4", "E4", "G4", "A4", "C5", "E5", "G5", "A5", "C6"]
if (mouseX > width / 2 && mouseX < width &&
mouseY > 0 && mouseY < height) {
if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[0], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height / 2 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[6], "8n");
}
}
}
function mousePressed() {
if (mouseX > 0 && mouseX < width / 4 &&
mouseY > 0 && mouseY < height / 2) {
loopKick();
} else if (mouseX > width / 4 && mouseX < width / 2 &&
mouseY > 0 && mouseY < height / 2) {
loopPiano();
pianoAnimation = true;
} else if (mouseX > 0 && mouseX < width / 4 &&
mouseY > height / 2 && mouseY < height) {
loopSnare();
} else if (mouseX > width / 4 && mouseX < width / 2 &&
mouseY > height / 2 && mouseY < height) {
loopBass();
}
}
function loopKick() {
if (!kickOn) {
kickPart.start(0);
kickOn = !kickOn;
} else {
kickPart.stop();
kickOn = !kickOn;
}
}
function loopSnare() {
if (!snareOn) {
snarePart.start(0);
snarePart.loop = true;
snareOn = !snareOn;
} else {
snarePart.loop = false;
snareOn = !snareOn;
}
}
function loopPiano() {
if (!pianoOn) {
pianoPart.start(0);
pianoPart.loop = true;
pianoOn = !pianoOn;
} else {
pianoPart.loop = false;
pianoOn = !pianoOn;
}
}
function loopBass() {
if (!bassOn) {
bassPart.start(0);
bassPart.loop = true;
bassOn = !bassOn;
} else {
bassPart.loop = false;
bassOn = !bassOn;
}
}
document.ontouchmove = function(event){
event.preventDefault();
}
kickOn = false;
snareOn = false;
pianoOn = false;
bassOn = false;
var a;
var p = 0;
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
var flex1 = 0,
flex2 = 0,
flex3 = 0;
var pianoAnimation = false;
var kick = new Tone.MembraneSynth({
"envelope": {
"sustain": 0,
"attack": 0.02,
"decay": 0.8
},
"octaves": 10
}).toMaster();
var kickPart = new Tone.Loop(function(time) {
kick.triggerAttack("C2");
}, "2n");
var snareFilter = new Tone.AutoFilter({
frequency: 1,
type: "sine",
depth: 1,
baseFrequency: 400,
octaves: 2.6,
filter: {
type: "bandpass",
rolloff: -12,
Q: 1
}
}).toMaster();
var snare = new Tone.MetalSynth({
volume: -10,
frequency: 60,
envelope: {
attack: 0.001,
decay: 1.4,
release: 0.2
},
harmonicity: 5.1,
modulationIndex: 32,
resonance: 4000,
octaves: 1.5
}).connect(snareFilter);
var snarePart = new Tone.Sequence(function(time, freq) {
snare.frequency.setValueAtTime(freq, time, Math.random() * 0.5 + 0.5);
snare.triggerAttack(time);
}, [null, 200, null, 200], "1n");
var pianoDelay = new Tone.PingPongDelay({
"delayTime": "4t",
"maxDelayTime": 2,
"wet": .3,
"feedback": .1
}).toMaster();
var piano = new Tone.MonoSynth(4, Tone.Synth, {
"volume": -7,
"oscillator": {
"partials": [1, 2, 1],
},
"envelope": {
"attack": 0.001,
"decay": 0.1,
"sustain": 0.3,
"release": 1
},
"portamento": 0.001
}).connect(pianoDelay);
var cChord = ["C4", ["E4", "G4"]];
var gChord = [["B3", "D4"], "G4"];
var amChord = [["C4", "E4"], "A4"];
var fChord = [["C4"], "F4", ["A4"]];
var cChord = ["C4", "E4", "G4"];
var gChord = ["B3", "D4", "G4"];
var amChord = ["C4", "E4", "A4"];
var fChord = ["C4", "F4", "A4"];
var ellipseCoord = {};
var pianoPart = new Tone.Sequence(function(time, note) {
piano.triggerAttackRelease(note, "16n", time);
}, [cChord]);
var fft = new Tone.FFT(32);
var spectrum = new Tone.Waveform(1024);
var bassDist = new Tone.Distortion({
"distortion": 0.4,
"oversample": '2x'
}).connect(spectrum).toMaster();
var bass = new Tone.MonoSynth({
"volume": -10,
"envelope": {
"attack": 0.1,
"decay": 0.3,
"release": 2,
},
"filterEnvelope": {
"attack": 0.001,
"decay": 0.01,
"sustain": 0.5,
"baseFrequency": 200,
"octaves": 2.6
}
}).connect(bassDist);
var bassPart = new Tone.Sequence(function(time, note) {
bass.triggerAttackRelease(note, "16n", time);
}, ["C2"]);
var leadDelay = new Tone.PingPongDelay({
"delayTime": "8n",
"maxDelayTime": 1,
"feedback": a,
"wet": .40
}).toMaster();
var leadPaint = new Tone.PolySynth({
"volume": -10,
"oscillator": {
"type": "square"
},
"envelope": {
"attack": 0.2
},
"portamento": 0.05
}).connect(leadDelay);
Tone.Transport.bpm.value = 60;
Tone.Transport.start();
var time = 0;
var scaleValue = 1;
var sliderPiano;
function setup() {
createCanvas(windowWidth, windowWidth / 2);
background(0);
sliderKick = createSlider(1, 6, 2);
sliderKick.position(5, height + 20);
sliderKick.size(width / 4 - 10, 10);
sliderBass = createSlider(1, 4, 1);
sliderBass.position(width / 4 + 5, height + 40);
sliderBass.size(width / 4 - 10, 10);
sliderPiano = createSlider(1, 4, 1);
sliderPiano.position(width / 4 + 5, height + 20);
sliderPiano.size(width / 4 - 10, 10);
sliderSnare = createSlider(1, 6, 2);
sliderSnare.position(5, height + 40);
sliderSnare.size(width / 4 - 10, 10);
ellipseCoord.c = [80, 80, 160, 80, 240, 80];
ellipseCoord.g = [80, 80 + 55, 160, 80 + 55, 240, 80 + 55];
ellipseCoord.am = [80, 80 + 110, 160, 80 + 110, 240, 80 + 110];
ellipseCoord.f = [80, 80 + 165, 160, 80 + 165, 240, 80 + 165];
}
function draw() {
var kickPulse = kickPart.progress;
var snarePulse = snarePart.progress;
var pianoPulse = pianoPart.progress;
var bassPulse = bassPart.progress;
var loopstate = pianoPart.state;
var wh = (windowWidth/(windowWidth/2)/100)
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
var pt = map(snarePulse, 0, 0.3, 1, 1.2);
var pg = map(snarePulse, 0, 1, 1, 0.5);
var pf = map(snarePulse, 0, 1, 1, 0.2);
kickSwellOuter = map(kickPulse, 0, 1, 0, 5);
kickSwellMiddle = map(kickPulse, 0, 1, 0, 15);
kickSwellInner = map(kickPulse, 0, 1, 0, 40);
alphaOuter = map(kickSwellOuter, 0, 5, 50, 20);
alphaMiddle = map(kickSwellMiddle, 0, 20, 90, 30);
var wave = spectrum.getValue();
var fftwave = fft.getValue();
fill(0,20);
strokeWeight(2)
rect(width / 4, 0, width / 4, height / 2);
rect(0,width/4,height/2,height);
push();
translate(0, 0);
fill(0);
rect(0, 0, width / 4, height / 2);
noFill();
ellipseMode(CENTER);
stroke(135, 206, 250, alphaOuter);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 4 - 25 + (kickSwellOuter * -1), height / 2 - 25 + (kickSwellOuter * -1));
stroke(135, 206, 250, alphaMiddle);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 4 - 50 + (kickSwellMiddle * -1), height / 2 - 50 + (kickSwellMiddle * -1));
stroke(135, 206, 250);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 4 - 80 + (kickSwellInner * -1), height / 2 - 80 + (kickSwellInner * -1));
pop();
beginShape();
push();
translate(width * 3 / 8, height * 3 / 4);
fill(0);
rect(0 - (width / 8), 0 - (height / 4), width / 4, height / 2)
beginShape();
noFill();
strokeWeight(2);
rectMode(CENTER)
for (var i = 0; i < wave.length; i += 600) {
var b = map(wave[i], -1, 1, -40, 40);
rect(0, 0, width / 4 - 70 + b, height / 2 - 70 + b);
}
pop();
endShape();
push();
translate((width * 1 / 8), height * 3 / 4 + 61 / 3);
scale(pg);
stroke(255);
point(0, 0)
noFill();
strokeWeight(1);
triangle(-70, 40.67, 0, -81.35, 70, 40.67);
pop();
kickPart.playbackRate = sliderKick.value();
snarePart.playbackRate = sliderSnare.value();
if (pianoAnimation == true) {
animateEllipseC(pianoPulse);
}
if (pianoAnimation == true) {
animateEllipseG(pianoPulse);
}
if (pianoAnimation == true) {
animateEllipseAM(pianoPulse);
}
if (pianoAnimation == true) {
animateEllipseF(pianoPulse);
}
if (sliderPiano.value() == 1) {
if (cChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, cChord);
cChordPlaying = true;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 2) {
if (fChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, fChord);
cChordPlaying = false;
fChordPlaying = true;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 3) {
if (gChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, gChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = true;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 4) {
if (amChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, amChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = true;
}
}
if (sliderBass.value() == 1) {
if (cBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "C2");
cBassPlaying = true;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
}
} else if (sliderBass.value() == 2) {
if (fBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "F2");
cBassBassPlaying = false;
fBassBassPlaying = true;
gBassBassPlaying = false;
amBassBassPlaying = false;
}
} else if (sliderBass.value() == 3) {
if (gBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "G1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = true;
amBassPlaying = false;
}
} else if (sliderBass.value() == 4) {
if (amBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "A1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = true;
}
}
if (mouseX > width / 2 && mouseX < width &&
mouseY > 0 && mouseY < width) {
if (mouseIsPressed) {
for (i = 0; i < 25; i++) {
noStroke();
fill(255, 100 + i * 3, 100 + i * 5, 255 / i);
ellipse(mouseX, mouseY, i, i);
}
}
fill(0, 2);
rect(width / 2, 0, width / 2, height);
if (keyIsPressed) {
fill(0);
rect(width / 2, 0, width / 2, height);
leadPaint.triggerRelease();
}
}
}
function animateEllipseC(pianoPulse) {
if (sliderPiano.value() == 1) {
var coord = ellipseCoord.c;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(124, 225, 0, 200);
noStroke();
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
ellipse(coord[index], coord[index + 1], pp*60, pp*60);
pop();
}
}
function animateEllipseF(pianoPulse) {
if (sliderPiano.value() == 2) {
var coord = ellipseCoord.f;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(140, 180, 121, 200);
noStroke();
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
ellipse(coord[index], coord[index + 1], pp*80, pp*80);
pop();
}
}
function animateEllipseG(pianoPulse) {
if (sliderPiano.value() == 3) {
var coord = ellipseCoord.g;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(100, 120, 190, 200);
noStroke();
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
ellipse(coord[index], coord[index + 1], pp*40, pp*40);
pop();
}
}
function animateEllipseAM(pianoPulse) {
if (sliderPiano.value() == 4) {
var coord = ellipseCoord.am;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(0, 50)
fill(90, 100, 60, 200);
noStroke();
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
ellipse(coord[index], coord[index + 1], pp*50, pp*50);
pop();
}
}
function mouseDragged() {
var paintNote = ["C4", "E4", "G4", "A4", "C5", "E5", "G5", "A5", "C6"]
if (mouseX > width / 2 && mouseX < width &&
mouseY > 0 && mouseY < height) {
if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[0], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height / 2 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[6], "8n");
}
}
}
function mousePressed() {
if (mouseX > 0 && mouseX < width / 4 &&
mouseY > 0 && mouseY < height / 2) {
loopKick();
} else if (mouseX > width / 4 && mouseX < width / 2 &&
mouseY > 0 && mouseY < height / 2) {
loopPiano();
pianoAnimation = true;
} else if (mouseX > 0 && mouseX < width / 4 &&
mouseY > height / 2 && mouseY < height) {
loopSnare();
} else if (mouseX > width / 4 && mouseX < width / 2 &&
mouseY > height / 2 && mouseY < height) {
loopBass();
}
}
function loopKick() {
if (!kickOn) {
kickPart.start(0);
kickOn = !kickOn;
} else {
kickPart.stop();
kickOn = !kickOn;
}
}
function loopSnare() {
if (!snareOn) {
snarePart.start(0);
snarePart.loop = true;
snareOn = !snareOn;
} else {
snarePart.loop = false;
snareOn = !snareOn;
}
}
function loopPiano() {
if (!pianoOn) {
pianoPart.start(0);
pianoPart.loop = true;
pianoOn = !pianoOn;
} else {
pianoPart.loop = false;
pianoOn = !pianoOn;
}
}
function loopBass() {
if (!bassOn) {
bassPart.start(0);
bassPart.loop = true;
bassOn = !bassOn;
} else {
bassPart.loop = false;
bassOn = !bassOn;
}
}
kickOn = false;
snareOn = false;
pianoOn = false;
bassOn = false;
var a;
var p = 0;
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
var flex1 = 0,
flex2 = 0,
flex3 = 0;
var pianoAnimation = false;
var kick = new Tone.MembraneSynth({
"envelope": {
"sustain": 0,
"attack": 0.02,
"decay": 0.8
},
"octaves": 10
}).toMaster();
var kickPart = new Tone.Loop(function(time) {
kick.triggerAttack("C2");
}, "2n");
var snareFilter = new Tone.AutoFilter({
frequency: 1,
type: "sine",
depth: 1,
baseFrequency: 400,
octaves: 2.6,
filter: {
type: "bandpass",
rolloff: -12,
Q: 1
}
}).toMaster();
var snare = new Tone.MetalSynth({
volume: -10,
frequency: 60,
envelope: {
attack: 0.001,
decay: 1.4,
release: 0.2
},
harmonicity: 5.1,
modulationIndex: 32,
resonance: 4000,
octaves: 1.5
}).connect(snareFilter);
var snarePart = new Tone.Sequence(function(time, freq) {
snare.frequency.setValueAtTime(freq, time, Math.random() * 0.5 + 0.5);
snare.triggerAttack(time);
}, [null, 200, null, 200], "1n");
var pianoDelay = new Tone.PingPongDelay({
"delayTime": "4t",
"maxDelayTime": 2,
"wet": .3,
"feedback": .1
}).toMaster();
var piano = new Tone.MonoSynth(4, Tone.Synth, {
"volume": -7,
"oscillator": {
"partials": [1, 2, 1],
},
"envelope": {
"attack": 0.001,
"decay": 0.1,
"sustain": 0.3,
"release": 1
},
"portamento": 0.001
}).connect(pianoDelay);
var cChord = ["C4", ["E4", "G4"]];
var gChord = [["B3", "D4"], "G4"];
var amChord = [["C4", "E4"], "A4"];
var fChord = [["C4"], "F4", ["A4"]];
var cChord = ["C4", "E4", "G4"];
var gChord = ["B3", "D4", "G4"];
var amChord = ["C4", "E4", "A4"];
var fChord = ["C4", "F4", "A4"];
var ellipseCoord = {};
var pianoPart = new Tone.Sequence(function(time, note) {
piano.triggerAttackRelease(note, "16n", time);
}, [cChord]);
var fft = new Tone.FFT(32);
var spectrum = new Tone.Waveform(1024);
var bassDist = new Tone.Distortion({
"distortion": 0.4,
"oversample": '2x'
}).connect(spectrum).toMaster();
var bass = new Tone.MonoSynth({
"volume": -10,
"envelope": {
"attack": 0.1,
"decay": 0.3,
"release": 2,
},
"filterEnvelope": {
"attack": 0.001,
"decay": 0.01,
"sustain": 0.5,
"baseFrequency": 200,
"octaves": 2.6
}
}).connect(bassDist);
var bassPart = new Tone.Sequence(function(time, note) {
bass.triggerAttackRelease(note, "16n", time);
}, ["C2"]);
var leadDelay = new Tone.PingPongDelay({
"delayTime": "8n",
"maxDelayTime": 1,
"feedback": a,
"wet": .40
}).toMaster();
var leadPaint = new Tone.PolySynth({
"volume": -20,
"oscillator": {
"type": "square"
},
"envelope": {
"attack": 0.2
},
"portamento": 0.05
}).connect(leadDelay);
Tone.Transport.bpm.value = 60;
Tone.Transport.start();
var time = 0;
var scaleValue = 1;
var sliderPiano;
function setup() {
createCanvas(windowWidth, windowWidth / 2);
background(0);
sliderKick = createSlider(1, 6, 2);
sliderKick.position(5, height + 20);
sliderKick.size(width / 4 - 10, 10);
sliderBass = createSlider(1, 4, 1);
sliderBass.position(width / 4 + 5, height + 40);
sliderBass.size(width / 4 - 10, 10);
sliderPiano = createSlider(1, 4, 1);
sliderPiano.position(width / 4 + 5, height + 20);
sliderPiano.size(width / 4 - 10, 10);
sliderSnare = createSlider(1, 6, 2);
sliderSnare.position(5, height + 40);
sliderSnare.size(width / 4 - 10, 10);
ellipseCoord.c = [80, 80, 160, 80, 240, 80];
ellipseCoord.g = [80, 80 + 55, 160, 80 + 55, 240, 80 + 55];
ellipseCoord.am = [80, 80 + 110, 160, 80 + 110, 240, 80 + 110];
ellipseCoord.f = [80, 80 + 165, 160, 80 + 165, 240, 80 + 165];
}
function draw() {
var kickPulse = kickPart.progress;
var snarePulse = snarePart.progress;
var pianoPulse = pianoPart.progress;
var bassPulse = bassPart.progress;
var loopstate = pianoPart.state;
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
var pt = map(pianoPulse, 0, 1, 1, 1.2);
var pg = map(pianoPulse, 0, 1, 1, 0.5);
var pf = map(pianoPulse, 0, 1, 1, 0.2);
kickSwellOuter = map(kickPulse, 0, 1, 0, 5);
kickSwellMiddle = map(kickPulse, 0, 1, 0, 15);
kickSwellInner = map(kickPulse, 0, 1, 0, 40);
alphaOuter = map(kickSwellOuter, 0, 5, 50, 20);
alphaMiddle = map(kickSwellMiddle, 0, 20, 90, 30);
var wave = spectrum.getValue();
var fftwave = fft.getValue();
fill(0,20);
strokeWeight(2)
rect(width / 4, 0, width / 4, height / 2);
rect(0,width/4,height/2,height);
push();
translate(0, 0);
fill(0);
rect(0, 0, width / 4, height / 2);
noFill();
ellipseMode(CENTER);
stroke(135, 206, 250, alphaOuter);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 4 - 25 + (kickSwellOuter * -1), height / 2 - 25 + (kickSwellOuter * -1));
stroke(135, 206, 250, alphaMiddle);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 4 - 50 + (kickSwellMiddle * -1), height / 2 - 50 + (kickSwellMiddle * -1));
stroke(135, 206, 250);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 4 - 80 + (kickSwellInner * -1), height / 2 - 80 + (kickSwellInner * -1));
pop();
beginShape();
push();
translate(width * 3 / 8, height * 3 / 4);
fill(0);
rect(0 - (width / 8), 0 - (height / 4), width / 4, height / 2)
beginShape();
noFill();
strokeWeight(2);
rectMode(CENTER)
for (var i = 0; i < wave.length; i += 600) {
var b = map(wave[i], -1, 1, -40, 40);
rect(0, 0, width / 4 - 70 + b, height / 2 - 70 + b);
}
pop();
endShape();
push();
var move = 0;
if (snarePulse > 0 && snarePulse < 0.5) {
move = -4;
} else if (snarePulse > 0.5 && snarePulse < 0.9) {
move = 4;
}
translate((width * 1 / 8)+move, height * 3 / 4 + 61 / 3);
scale(1);
stroke(255);
point(0, 0)
noFill();
strokeWeight(1);
triangle(-70, 40.67, 0, -81.35, 70, 40.67);
pop();
kickPart.playbackRate = sliderKick.value();
snarePart.playbackRate = sliderSnare.value();
if (pianoAnimation == true) {
animateEllipseC(pianoPulse);
}
if (pianoAnimation == true) {
animateEllipseG(pianoPulse);
}
if (pianoAnimation == true) {
animateEllipseAM(pianoPulse);
}
if (pianoAnimation == true) {
animateEllipseF(pianoPulse);
}
if (sliderPiano.value() == 1) {
if (cChordPlaying == false) {
console.log("inside value 1");
pianoPart.removeAll();
pianoPart.add(0, cChord);
cChordPlaying = true;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 2) {
if (fChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, fChord);
cChordPlaying = false;
fChordPlaying = true;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 3) {
if (gChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, gChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = true;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 4) {
if (amChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, amChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = true;
}
}
if (sliderBass.value() == 1) {
if (cBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "C2");
cBassPlaying = true;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
}
} else if (sliderBass.value() == 2) {
if (fBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "F2");
cBassBassPlaying = false;
fBassBassPlaying = true;
gBassBassPlaying = false;
amBassBassPlaying = false;
}
} else if (sliderBass.value() == 3) {
if (gBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "G1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = true;
amBassPlaying = false;
}
} else if (sliderBass.value() == 4) {
if (amBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "A1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = true;
}
}
if (mouseX > width / 2 && mouseX < width &&
mouseY > 0 && mouseY < width) {
if (mouseIsPressed) {
for (i = 0; i < 25; i++) {
noStroke();
fill(255, 100 + i * 3, 100 + i * 5, 255 / i);
ellipse(mouseX, mouseY, i, i);
}
}
fill(0, 2);
rect(width / 2, 0, width / 2, height);
if (keyIsPressed) {
fill(0);
rect(width / 2, 0, width / 2, height);
leadPaint.triggerRelease();
}
}
}
function animateEllipseC(pianoPulse) {
if (sliderPiano.value() == 1) {
var coord = ellipseCoord.c;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(124, 225, 0, 200);
noStroke();
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
ellipse(coord[index], coord[index + 1], pp*60, pp*60);
pop();
}
}
function animateEllipseF(pianoPulse) {
if (sliderPiano.value() == 2) {
var coord = ellipseCoord.f;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(140, 180, 121, 200);
noStroke();
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
ellipse(coord[index], coord[index + 1], pp*80, pp*80);
pop();
}
}
function animateEllipseG(pianoPulse) {
if (sliderPiano.value() == 3) {
var coord = ellipseCoord.g;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(100, 120, 190, 200);
noStroke();
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
ellipse(coord[index], coord[index + 1], pp*40, pp*40);
pop();
}
}
function animateEllipseAM(pianoPulse) {
if (sliderPiano.value() == 4) {
var coord = ellipseCoord.am;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(0, 50)
fill(90, 100, 60, 200);
noStroke();
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
ellipse(coord[index], coord[index + 1], pp*50, pp*50);
pop();
}
}
function mouseDragged() {
var paintNote = ["C4", "E4", "G4", "A4", "C5", "E5", "G5", "A5", "C6"]
if (mouseX > width / 2 && mouseX < width &&
mouseY > 0 && mouseY < height) {
if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[0], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height / 2 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[6], "8n");
}
}
}
function mousePressed() {
if (mouseX > 0 && mouseX < width / 4 &&
mouseY > 0 && mouseY < height / 2) {
loopKick();
} else if (mouseX > width / 4 && mouseX < width / 2 &&
mouseY > 0 && mouseY < height / 2) {
loopPiano();
pianoAnimation = true;
} else if (mouseX > 0 && mouseX < width / 4 &&
mouseY > height / 2 && mouseY < height) {
loopSnare();
} else if (mouseX > width / 4 && mouseX < width / 2 &&
mouseY > height / 2 && mouseY < height) {
loopBass();
}
}
function loopKick() {
if (!kickOn) {
kickPart.start(0);
kickOn = !kickOn;
} else {
kickPart.stop();
kickOn = !kickOn;
}
}
function loopSnare() {
if (!snareOn) {
snarePart.start(0);
snarePart.loop = true;
snareOn = !snareOn;
} else {
snarePart.loop = false;
snareOn = !snareOn;
}
}
function loopPiano() {
if (!pianoOn) {
pianoPart.start(0);
pianoPart.loop = true;
pianoOn = !pianoOn;
} else {
pianoPart.loop = false;
pianoOn = !pianoOn;
}
}
function loopBass() {
if (!bassOn) {
bassPart.start(0);
bassPart.loop = true;
bassOn = !bassOn;
} else {
bassPart.loop = false;
bassOn = !bassOn;
}
}
kickOn = false;
snareOn = false;
pianoOn = false;
bassOn = false;
var a;
var p = 0;
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
var flex1 = 0,
flex2 = 0,
flex3 = 0;
var pianoAnimation = false;
var kick = new Tone.MembraneSynth({
"envelope": {
"sustain": 0,
"attack": 0.02,
"decay": 0.8
},
"octaves": 10
}).toMaster();
var kickPart = new Tone.Loop(function(time) {
kick.triggerAttack("C2");
}, "2n");
var snareFilter = new Tone.AutoFilter({
frequency: 1,
type: "sine",
depth: 1,
baseFrequency: 400,
octaves: 2.6,
filter: {
type: "bandpass",
rolloff: -12,
Q: 1
}
}).toMaster();
var snare = new Tone.MetalSynth({
volume: -10,
frequency: 60,
envelope: {
attack: 0.001,
decay: 1.4,
release: 0.2
},
harmonicity: 5.1,
modulationIndex: 32,
resonance: 4000,
octaves: 1.5
}).connect(snareFilter);
var snarePart = new Tone.Sequence(function(time, freq) {
snare.frequency.setValueAtTime(freq, time, Math.random() * 0.5 + 0.5);
snare.triggerAttack(time);
}, [null, 200, null, 200], "1n");
var pianoDelay = new Tone.PingPongDelay({
"delayTime": "4t",
"maxDelayTime": 2,
"wet": .3,
"feedback": .1
}).toMaster();
var piano = new Tone.MonoSynth(4, Tone.Synth, {
"volume": -7,
"oscillator": {
"partials": [1, 2, 1],
},
"envelope": {
"attack": 0.001,
"decay": 0.1,
"sustain": 0.3,
"release": 1
},
"portamento": 0.001
}).connect(pianoDelay);
var cChord = ["C4", ["E4", "G4"]];
var gChord = [["B3", "D4"], "G4"];
var amChord = [["C4", "E4"], "A4"];
var fChord = [["C4"], "F4", ["A4"]];
var cChord = ["C4", "E4", "G4"];
var gChord = ["B3", "D4", "G4"];
var amChord = ["C4", "E4", "A4"];
var fChord = ["C4", "F4", "A4"];
var ellipseCoord = {};
var pianoPart = new Tone.Sequence(function(time, note) {
piano.triggerAttackRelease(note, "16n", time);
}, [cChord]);
var fft = new Tone.FFT(32);
var spectrum = new Tone.Waveform(1024);
var bassDist = new Tone.Distortion({
"distortion": 0.4,
"oversample": '2x'
}).connect(spectrum).toMaster();
var bass = new Tone.MonoSynth({
"volume": -10,
"envelope": {
"attack": 0.1,
"decay": 0.3,
"release": 2,
},
"filterEnvelope": {
"attack": 0.001,
"decay": 0.01,
"sustain": 0.5,
"baseFrequency": 200,
"octaves": 2.6
}
}).connect(bassDist);
var bassPart = new Tone.Sequence(function(time, note) {
bass.triggerAttackRelease(note, "16n", time);
}, ["C2"]);
var leadDelay = new Tone.PingPongDelay({
"delayTime": "8n",
"maxDelayTime": 1,
"feedback": a,
"wet": .40
}).toMaster();
var leadPaint = new Tone.PolySynth({
"volume": -20,
"oscillator": {
"type": "square"
},
"envelope": {
"attack": 0.2
},
"portamento": 0.05
}).connect(leadDelay);
Tone.Transport.bpm.value = 60;
Tone.Transport.start();
var time = 0;
var scaleValue = 1;
var sliderPiano;
function setup() {
createCanvas(windowWidth, windowWidth / 2);
background(0);
sliderKick = createSlider(1, 6, 2);
sliderKick.position(5, height + 20);
sliderKick.size(width / 4 - 10, 10);
sliderBass = createSlider(1, 4, 1);
sliderBass.position(width / 4 + 5, height + 40);
sliderBass.size(width / 4 - 10, 10);
sliderPiano = createSlider(1, 4, 1);
sliderPiano.position(width / 4 + 5, height + 20);
sliderPiano.size(width / 4 - 10, 10);
sliderSnare = createSlider(1, 6, 2);
sliderSnare.position(5, height + 40);
sliderSnare.size(width / 4 - 10, 10);
ellipseCoord.c = [80, 80, 160, 80, 240, 80];
ellipseCoord.g = [80, 80 + 55, 160, 80 + 55, 240, 80 + 55];
ellipseCoord.am = [80, 80 + 110, 160, 80 + 110, 240, 80 + 110];
ellipseCoord.f = [80, 80 + 165, 160, 80 + 165, 240, 80 + 165];
}
function draw() {
var kickPulse = kickPart.progress;
var snarePulse = snarePart.progress;
var pianoPulse = pianoPart.progress;
var bassPulse = bassPart.progress;
var loopstate = pianoPart.state;
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
var pt = map(pianoPulse, 0, 1, 1, 1.2);
var pg = map(pianoPulse, 0, 1, 1, 0.5);
var pf = map(pianoPulse, 0, 1, 1, 0.2);
kickSwellOuter = map(kickPulse, 0, 1, 0, 5);
kickSwellMiddle = map(kickPulse, 0, 1, 0, 15);
kickSwellInner = map(kickPulse, 0, 1, 0, 40);
alphaOuter = map(kickSwellOuter, 0, 5, 50, 20);
alphaMiddle = map(kickSwellMiddle, 0, 20, 90, 30);
var wave = spectrum.getValue();
var fftwave = fft.getValue();
fill(0,20);
strokeWeight(2)
rect(width / 4, 0, width / 4, height / 2);
push();
translate(0, 0);
fill(0);
rect(0, 0, width / 4, height / 2);
noFill();
ellipseMode(CENTER);
stroke(135, 206, 250, alphaOuter);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 4 - 25 + (kickSwellOuter * -1), height / 2 - 25 + (kickSwellOuter * -1));
stroke(135, 206, 250, alphaMiddle);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 4 - 50 + (kickSwellMiddle * -1), height / 2 - 50 + (kickSwellMiddle * -1));
stroke(135, 206, 250);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 4 - 80 + (kickSwellInner * -1), height / 2 - 80 + (kickSwellInner * -1));
pop();
beginShape();
push();
translate(width * 3 / 8, height * 3 / 4);
fill(0);
rect(0 - (width / 8), 0 - (height / 4), width / 4, height / 2)
beginShape();
noFill();
strokeWeight(2);
rectMode(CENTER)
for (var i = 0; i < wave.length; i += 600) {
var b = map(wave[i], -1, 1, -40, 40);
rect(0, 0, width / 4 - 70 + b, height / 2 - 70 + b);
}
pop();
endShape();
push();
var move = 0;
translate(width * 1 / 8, height * 3 / 4 + 61 / 3);
scale(1);
stroke(255);
point(0, 0)
noFill();
strokeWeight(1);
triangle(-70, 40.67, 0, -81.35, 70, 40.67);
pop();
kickPart.playbackRate = sliderKick.value();
snarePart.playbackRate = sliderSnare.value();
if (pianoAnimation == true) {
animateEllipseC(pianoPulse);
}
if (pianoAnimation == true) {
animateEllipseG(pianoPulse);
}
if (pianoAnimation == true) {
animateEllipseAM(pianoPulse);
}
if (pianoAnimation == true) {
animateEllipseF(pianoPulse);
}
if (sliderPiano.value() == 1) {
if (cChordPlaying == false) {
console.log("inside value 1");
pianoPart.removeAll();
pianoPart.add(0, cChord);
cChordPlaying = true;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 2) {
if (fChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, fChord);
cChordPlaying = false;
fChordPlaying = true;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 3) {
if (gChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, gChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = true;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 4) {
if (amChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, amChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = true;
}
}
if (sliderBass.value() == 1) {
if (cBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "C2");
cBassPlaying = true;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
}
} else if (sliderBass.value() == 2) {
if (fBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "F2");
cBassBassPlaying = false;
fBassBassPlaying = true;
gBassBassPlaying = false;
amBassBassPlaying = false;
}
} else if (sliderBass.value() == 3) {
if (gBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "G1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = true;
amBassPlaying = false;
}
} else if (sliderBass.value() == 4) {
if (amBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "A1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = true;
}
}
if (mouseX > width / 2 && mouseX < width &&
mouseY > 0 && mouseY < width) {
if (mouseIsPressed) {
for (i = 0; i < 25; i++) {
noStroke();
fill(255, 100 + i * 3, 100 + i * 5, 255 / i);
ellipse(mouseX, mouseY, i, i);
}
}
fill(0, 2);
rect(width / 2, 0, width / 2, height);
if (keyIsPressed) {
fill(0);
rect(width / 2, 0, width / 2, height);
leadPaint.triggerRelease();
}
}
}
function animateEllipseC(pianoPulse) {
if (sliderPiano.value() == 1) {
var coord = ellipseCoord.c;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(124, 225, 0, 200);
noStroke();
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
ellipse(coord[index], coord[index + 1], pp*60, pp*60);
pop();
}
}
function animateEllipseF(pianoPulse) {
if (sliderPiano.value() == 2) {
var coord = ellipseCoord.f;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(140, 180, 121, 200);
noStroke();
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
ellipse(coord[index], coord[index + 1], pp*80, pp*80);
pop();
}
}
function animateEllipseG(pianoPulse) {
if (sliderPiano.value() == 3) {
var coord = ellipseCoord.g;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(100, 120, 190, 200);
noStroke();
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
ellipse(coord[index], coord[index + 1], pp*40, pp*40);
pop();
}
}
function animateEllipseAM(pianoPulse) {
if (sliderPiano.value() == 4) {
var coord = ellipseCoord.am;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(0, 50)
fill(90, 100, 60, 200);
noStroke();
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
ellipse(coord[index], coord[index + 1], pp*50, pp*50);
pop();
}
}
function mouseDragged() {
var paintNote = ["C4", "E4", "G4", "A4", "C5", "E5", "G5", "A5", "C6"]
if (mouseX > width / 2 && mouseX < width &&
mouseY > 0 && mouseY < height) {
if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[0], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height / 2 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[6], "8n");
}
}
}
function mousePressed() {
if (mouseX > 0 && mouseX < width / 4 &&
mouseY > 0 && mouseY < height / 2) {
loopKick();
} else if (mouseX > width / 4 && mouseX < width / 2 &&
mouseY > 0 && mouseY < height / 2) {
loopPiano();
pianoAnimation = true;
} else if (mouseX > 0 && mouseX < width / 4 &&
mouseY > height / 2 && mouseY < height) {
loopSnare();
} else if (mouseX > width / 4 && mouseX < width / 2 &&
mouseY > height / 2 && mouseY < height) {
loopBass();
}
}
function loopKick() {
if (!kickOn) {
kickPart.start(0);
kickOn = !kickOn;
} else {
kickPart.stop();
kickOn = !kickOn;
}
}
function loopSnare() {
if (!snareOn) {
snarePart.start(0);
snarePart.loop = true;
snareOn = !snareOn;
} else {
snarePart.loop = false;
snareOn = !snareOn;
}
}
function loopPiano() {
if (!pianoOn) {
pianoPart.start(0);
pianoPart.loop = true;
pianoOn = !pianoOn;
} else {
pianoPart.loop = false;
pianoOn = !pianoOn;
}
}
function loopBass() {
if (!bassOn) {
bassPart.start(0);
bassPart.loop = true;
bassOn = !bassOn;
} else {
bassPart.loop = false;
bassOn = !bassOn;
}
}
kickOn = false;
snareOn = false;
pianoOn = false;
bassOn = false;
var a;
var p = 0;
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
var flex1 = 0,
flex2 = 0,
flex3 = 0;
var pianoAnimation = false;
var kick = new Tone.MembraneSynth({
"envelope": {
"sustain": 0,
"attack": 0.02,
"decay": 0.8
},
"octaves": 10
}).toMaster();
var kickPart = new Tone.Loop(function(time) {
kick.triggerAttack("C2");
}, "2n");
var snareFilter = new Tone.AutoFilter({
frequency: 1,
type: "sine",
depth: 1,
baseFrequency: 400,
octaves: 2.6,
filter: {
type: "bandpass",
rolloff: -12,
Q: 1
}
}).toMaster();
var snare = new Tone.MetalSynth({
volume: -10,
frequency: 60,
envelope: {
attack: 0.001,
decay: 1.4,
release: 0.2
},
harmonicity: 5.1,
modulationIndex: 32,
resonance: 4000,
octaves: 1.5
}).connect(snareFilter);
var snarePart = new Tone.Sequence(function(time, freq) {
snare.frequency.setValueAtTime(freq, time, Math.random() * 0.5 + 0.5);
snare.triggerAttack(time);
}, [null, 200, null, 200], "1n");
var pianoDelay = new Tone.PingPongDelay({
"delayTime": "4t",
"maxDelayTime": 2,
"wet": .3,
"feedback": .1
}).toMaster();
var piano = new Tone.MonoSynth(4, Tone.Synth, {
"volume": -7,
"oscillator": {
"partials": [1, 2, 1],
},
"envelope": {
"attack": 0.001,
"decay": 0.1,
"sustain": 0.3,
"release": 1
},
"portamento": 0.001
}).connect(pianoDelay);
var cChord = ["C4", ["E4", "G4"]];
var gChord = [["B3", "D4"], "G4"];
var amChord = [["C4", "E4"], "A4"];
var fChord = [["C4"], "F4", ["A4"]];
var cChord = ["C4", "E4", "G4"];
var gChord = ["B3", "D4", "G4"];
var amChord = ["C4", "E4", "A4"];
var fChord = ["C4", "F4", "A4"];
var ellipseCoord = {};
var pianoPart = new Tone.Sequence(function(time, note) {
piano.triggerAttackRelease(note, "16n", time);
}, [cChord]);
var fft = new Tone.FFT(32);
var spectrum = new Tone.Waveform(1024);
var bassDist = new Tone.Distortion({
"distortion": 0.4,
"oversample": '2x'
}).connect(spectrum).toMaster();
var bass = new Tone.MonoSynth({
"volume": -10,
"envelope": {
"attack": 0.1,
"decay": 0.3,
"release": 2,
},
"filterEnvelope": {
"attack": 0.001,
"decay": 0.01,
"sustain": 0.5,
"baseFrequency": 200,
"octaves": 2.6
}
}).connect(bassDist);
var bassPart = new Tone.Sequence(function(time, note) {
bass.triggerAttackRelease(note, "16n", time);
}, ["C2"]);
var leadDelay = new Tone.PingPongDelay({
"delayTime": "8n",
"maxDelayTime": 1,
"feedback": a,
"wet": .40
}).toMaster();
var leadPaint = new Tone.PolySynth({
"volume": -20,
"oscillator": {
"type": "square"
},
"envelope": {
"attack": 0.2
},
"portamento": 0.05
}).connect(leadDelay);
Tone.Transport.bpm.value = 60;
Tone.Transport.start();
var time = 0;
var scaleValue = 1;
var sliderPiano;
function setup() {
createCanvas(windowWidth, windowWidth / 2);
background(0);
sliderKick = createSlider(1, 6, 2);
sliderKick.position(5, height + 20);
sliderKick.size(width / 4 - 10, 10);
sliderBass = createSlider(1, 4, 1);
sliderBass.position(width / 4 + 5, height + 40);
sliderBass.size(width / 4 - 10, 10);
sliderPiano = createSlider(1, 4, 1);
sliderPiano.position(width / 4 + 5, height + 20);
sliderPiano.size(width / 4 - 10, 10);
sliderSnare = createSlider(1, 6, 2);
sliderSnare.position(5, height + 40);
sliderSnare.size(width / 4 - 10, 10);
ellipseCoord.c = [80, 80, 160, 80, 240, 80];
ellipseCoord.g = [80, 80 + 55, 160, 80 + 55, 240, 80 + 55];
ellipseCoord.am = [80, 80 + 110, 160, 80 + 110, 240, 80 + 110];
ellipseCoord.f = [80, 80 + 165, 160, 80 + 165, 240, 80 + 165];
}
function draw() {
var kickPulse = kickPart.progress;
var snarePulse = snarePart.progress;
var pianoPulse = pianoPart.progress;
var bassPulse = bassPart.progress;
var loopstate = pianoPart.state;
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
var pt = map(pianoPulse, 0, 1, 1, 1.2);
var pg = map(pianoPulse, 0, 1, 1, 0.5);
var pf = map(pianoPulse, 0, 1, 1, 0.2);
kickSwellOuter = map(kickPulse, 0, 1, 0, 5);
kickSwellMiddle = map(kickPulse, 0, 1, 0, 15);
kickSwellInner = map(kickPulse, 0, 1, 0, 40);
alphaOuter = map(kickSwellOuter, 0, 5, 50, 20);
alphaMiddle = map(kickSwellMiddle, 0, 20, 90, 30);
var wave = spectrum.getValue();
var fftwave = fft.getValue();
fill(0,20);
strokeWeight(2)
rect(width / 4, 0, width / 4, height / 2);
push();
translate(0, 0);
fill(0);
rect(0, 0, width / 4, height / 2);
noFill();
ellipseMode(CENTER);
stroke(135, 206, 250, alphaOuter);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 4 - 25 + (kickSwellOuter * -1), height / 2 - 25 + (kickSwellOuter * -1));
stroke(135, 206, 250, alphaMiddle);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 4 - 50 + (kickSwellMiddle * -1), height / 2 - 50 + (kickSwellMiddle * -1));
stroke(135, 206, 250);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 4 - 80 + (kickSwellInner * -1), height / 2 - 80 + (kickSwellInner * -1));
pop();
beginShape();
push();
translate(width * 3 / 8, height * 3 / 4);
fill(0);
rect(0 - (width / 8), 0 - (height / 4), width / 4, height / 2)
beginShape();
noFill();
strokeWeight(2);
rectMode(CENTER)
for (var i = 0; i < wave.length; i += 600) {
var b = map(wave[i], -1, 1, -40, 40);
rect(0, 0, width / 4 - 70 + b, height / 2 - 70 + b);
}
pop();
endShape();
push();
translate(width * 1 / 8, height * 3 / 4 + 61 / 3);
scale(1);
stroke(255);
point(0, 0)
noFill();
strokeWeight(1);
triangle(-70, 40.67, 0, -81.35, 70, 40.67);
pop();
kickPart.playbackRate = sliderKick.value();
snarePart.playbackRate = sliderSnare.value();
if (pianoAnimation == true) {
animateEllipseC(pianoPulse);
}
if (pianoAnimation == true) {
animateEllipseG(pianoPulse);
}
if (pianoAnimation == true) {
animateEllipseAM(pianoPulse);
}
if (pianoAnimation == true) {
animateEllipseF(pianoPulse);
}
if (sliderPiano.value() == 1) {
if (cChordPlaying == false) {
console.log("inside value 1");
pianoPart.removeAll();
pianoPart.add(0, cChord);
cChordPlaying = true;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 2) {
if (fChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, fChord);
cChordPlaying = false;
fChordPlaying = true;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 3) {
if (gChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, gChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = true;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 4) {
if (amChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, amChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = true;
}
}
if (sliderBass.value() == 1) {
if (cBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "C2");
cBassPlaying = true;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
}
} else if (sliderBass.value() == 2) {
if (fBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "F2");
cBassBassPlaying = false;
fBassBassPlaying = true;
gBassBassPlaying = false;
amBassBassPlaying = false;
}
} else if (sliderBass.value() == 3) {
if (gBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "G1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = true;
amBassPlaying = false;
}
} else if (sliderBass.value() == 4) {
if (amBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "A1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = true;
}
}
if (mouseX > width / 2 && mouseX < width &&
mouseY > 0 && mouseY < width) {
if (mouseIsPressed) {
for (i = 0; i < 25; i++) {
noStroke();
fill(255, 100 + i * 3, 100 + i * 5, 255 / i);
ellipse(mouseX, mouseY, i, i);
}
}
fill(0, 2);
rect(width / 2, 0, width / 2, height);
if (keyIsPressed) {
fill(0);
rect(width / 2, 0, width / 2, height);
leadPaint.triggerRelease();
}
}
}
function animateEllipseC(pianoPulse) {
if (sliderPiano.value() == 1) {
var coord = ellipseCoord.c;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(124, 225, 0, 200);
noStroke();
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
ellipse(coord[index], coord[index + 1], pp*60, pp*60);
pop();
}
}
function animateEllipseF(pianoPulse) {
if (sliderPiano.value() == 2) {
var coord = ellipseCoord.f;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(140, 180, 121, 200);
noStroke();
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
ellipse(coord[index], coord[index + 1], pp*80, pp*80);
pop();
}
}
function animateEllipseG(pianoPulse) {
if (sliderPiano.value() == 3) {
var coord = ellipseCoord.g;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(100, 120, 190, 200);
noStroke();
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
ellipse(coord[index], coord[index + 1], pp*40, pp*40);
pop();
}
}
function animateEllipseAM(pianoPulse) {
if (sliderPiano.value() == 4) {
var coord = ellipseCoord.am;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(0, 50)
fill(90, 100, 60, 200);
noStroke();
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
ellipse(coord[index], coord[index + 1], pp*50, pp*50);
pop();
}
}
function mouseDragged() {
var paintNote = ["C4", "E4", "G4", "A4", "C5", "E5", "G5", "A5", "C6"]
if (mouseX > width / 2 && mouseX < width &&
mouseY > 0 && mouseY < height) {
if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[0], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height / 2 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[6], "8n");
}
}
}
function mousePressed() {
if (mouseX > 0 && mouseX < width / 4 &&
mouseY > 0 && mouseY < height / 2) {
loopKick();
} else if (mouseX > width / 4 && mouseX < width / 2 &&
mouseY > 0 && mouseY < height / 2) {
loopPiano();
pianoAnimation = true;
} else if (mouseX > 0 && mouseX < width / 4 &&
mouseY > height / 2 && mouseY < height) {
loopSnare();
} else if (mouseX > width / 4 && mouseX < width / 2 &&
mouseY > height / 2 && mouseY < height) {
loopBass();
}
}
function loopKick() {
if (!kickOn) {
kickPart.start(0);
kickOn = !kickOn;
} else {
kickPart.stop();
kickOn = !kickOn;
}
}
function loopSnare() {
if (!snareOn) {
snarePart.start(0);
snarePart.loop = true;
snareOn = !snareOn;
} else {
snarePart.loop = false;
snareOn = !snareOn;
}
}
function loopPiano() {
if (!pianoOn) {
pianoPart.start(0);
pianoPart.loop = true;
pianoOn = !pianoOn;
} else {
pianoPart.loop = false;
pianoOn = !pianoOn;
}
}
function loopBass() {
if (!bassOn) {
bassPart.start(0);
bassPart.loop = true;
bassOn = !bassOn;
} else {
bassPart.loop = false;
bassOn = !bassOn;
}
}
kickOn = false;
snareOn = false;
pianoOn = false;
bassOn = false;
var a;
var p = 0;
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
var flex1 = 0,
flex2 = 0,
flex3 = 0;
var pianoAnimation = false;
var kick = new Tone.MembraneSynth({
"envelope": {
"sustain": 0,
"attack": 0.02,
"decay": 0.8
},
"octaves": 10
}).toMaster();
var kickPart = new Tone.Loop(function(time) {
kick.triggerAttack("C2");
}, "2n");
var snareFilter = new Tone.AutoFilter({
frequency: 1,
type: "sine",
depth: 1,
baseFrequency: 400,
octaves: 2.6,
filter: {
type: "bandpass",
rolloff: -12,
Q: 1
}
}).toMaster();
var snare = new Tone.MetalSynth({
volume: -10,
frequency: 60,
envelope: {
attack: 0.001,
decay: 1.4,
release: 0.2
},
harmonicity: 5.1,
modulationIndex: 32,
resonance: 4000,
octaves: 1.5
}).connect(snareFilter);
var snarePart = new Tone.Sequence(function(time, freq) {
snare.frequency.setValueAtTime(freq, time, Math.random() * 0.5 + 0.5);
snare.triggerAttack(time);
}, [null, 200, null, 200], "1n");
var pianoDelay = new Tone.PingPongDelay({
"delayTime": "4t",
"maxDelayTime": 2,
"wet": .3,
"feedback": .1
}).toMaster();
var piano = new Tone.MonoSynth(4, Tone.Synth, {
"volume": -7,
"oscillator": {
"partials": [1, 2, 1],
},
"envelope": {
"attack": 0.001,
"decay": 0.1,
"sustain": 0.3,
"release": 1
},
"portamento": 0.001
}).connect(pianoDelay);
var cChord = ["C4", ["E4", "G4"]];
var gChord = [["B3", "D4"], "G4"];
var amChord = [["C4", "E4"], "A4"];
var fChord = [["C4"], "F4", ["A4"]];
var cChord = ["C4", "E4", "G4"];
var gChord = ["B3", "D4", "G4"];
var amChord = ["C4", "E4", "A4"];
var fChord = ["C4", "F4", "A4"];
var ellipseCoord = {};
var pianoPart = new Tone.Sequence(function(time, note) {
piano.triggerAttackRelease(note, "16n", time);
}, [cChord]);
var fft = new Tone.FFT(32);
var spectrum = new Tone.Waveform(1024);
var bassDist = new Tone.Distortion({
"distortion": 0.4,
"oversample": '2x'
}).connect(spectrum).toMaster();
var bass = new Tone.MonoSynth({
"volume": -10,
"envelope": {
"attack": 0.1,
"decay": 0.3,
"release": 2,
},
"filterEnvelope": {
"attack": 0.001,
"decay": 0.01,
"sustain": 0.5,
"baseFrequency": 200,
"octaves": 2.6
}
}).connect(bassDist);
var bassPart = new Tone.Sequence(function(time, note) {
bass.triggerAttackRelease(note, "16n", time);
}, ["C2"]);
var leadDelay = new Tone.PingPongDelay({
"delayTime": "8n",
"maxDelayTime": 1,
"feedback": a,
"wet": .40
}).toMaster();
var leadPaint = new Tone.PolySynth({
"volume": -20,
"oscillator": {
"type": "square"
},
"envelope": {
"attack": 0.2
},
"portamento": 0.05
}).connect(leadDelay);
Tone.Transport.bpm.value = 60;
Tone.Transport.start();
var time = 0;
var scaleValue = 1;
var sliderPiano;
function setup() {
createCanvas(windowWidth, windowWidth / 2);
background(0);
sliderKick = createSlider(1, 6, 2);
sliderKick.position(5, height + 20);
sliderKick.size(width / 4 - 10, 10);
sliderBass = createSlider(1, 4, 1);
sliderBass.position(width / 4 + 5, height + 40);
sliderBass.size(width / 4 - 10, 10);
sliderPiano = createSlider(1, 4, 1);
sliderPiano.position(width / 4 + 5, height + 20);
sliderPiano.size(width / 4 - 10, 10);
sliderSnare = createSlider(1, 6, 2);
sliderSnare.position(5, height + 40);
sliderSnare.size(width / 4 - 10, 10);
ellipseCoord.c = [80, 80, 160, 80, 240, 80];
ellipseCoord.g = [80, 80 + 55, 160, 80 + 55, 240, 80 + 55];
ellipseCoord.am = [80, 80 + 110, 160, 80 + 110, 240, 80 + 110];
ellipseCoord.f = [80, 80 + 165, 160, 80 + 165, 240, 80 + 165];
}
function draw() {
var kickPulse = kickPart.progress;
var snarePulse = snarePart.progress;
var pianoPulse = pianoPart.progress;
var bassPulse = bassPart.progress;
var loopstate = pianoPart.state;
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
var pt = map(pianoPulse, 0, 1, 1, 1.2);
var pg = map(pianoPulse, 0, 1, 1, 0.5);
var pf = map(pianoPulse, 0, 1, 1, 0.2);
var pp = floor(map(pianoPulse,0,1,1,3));
if(pp == 1 && pianoOn){
time++;
}else if(pp == 2 || !pianoOn){
time=0
}
if(time <= 15 && pianoOn){
scaleValue++;
}else if(time >= 15 && pianoOn){
scaleValue--;
}
if(!pianoOn){
scaleValue = 1
}
kickSwellOuter = map(kickPulse, 0, 1, 0, 5);
kickSwellMiddle = map(kickPulse, 0, 1, 0, 15);
kickSwellInner = map(kickPulse, 0, 1, 0, 40);
alphaOuter = map(kickSwellOuter, 0, 5, 50, 20);
alphaMiddle = map(kickSwellMiddle, 0, 20, 90, 30);
var wave = spectrum.getValue();
var fftwave = fft.getValue();
fill(0,20);
strokeWeight(2)
rect(width / 4, 0, width / 4, height / 2);
push();
translate(0, 0);
fill(0);
rect(0, 0, width / 4, height / 2);
noFill();
ellipseMode(CENTER);
stroke(135, 206, 250, alphaOuter);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 4 - 25 + (kickSwellOuter * -1), height / 2 - 25 + (kickSwellOuter * -1));
stroke(135, 206, 250, alphaMiddle);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 4 - 50 + (kickSwellMiddle * -1), height / 2 - 50 + (kickSwellMiddle * -1));
stroke(135, 206, 250);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 4 - 80 + (kickSwellInner * -1), height / 2 - 80 + (kickSwellInner * -1));
pop();
beginShape();
push();
translate(width * 3 / 8, height * 3 / 4);
fill(0);
rect(0 - (width / 8), 0 - (height / 4), width / 4, height / 2)
beginShape();
noFill();
strokeWeight(2);
rectMode(CENTER)
for (var i = 0; i < wave.length; i += 600) {
var b = map(wave[i], -1, 1, -40, 40);
rect(0, 0, width / 4 - 70 + b, height / 2 - 70 + b);
}
pop();
endShape();
push();
translate(width * 1 / 8, height * 3 / 4 + 61 / 3);
scale(1);
stroke(255);
point(0, 0)
noFill();
strokeWeight(1);
triangle(-70, 40.67, 0, -81.35, 70, 40.67);
pop();
kickPart.playbackRate = sliderKick.value();
snarePart.playbackRate = sliderSnare.value();
sliderKick.value(map(flex1, 0, 250, 1, 6));
sliderSnare.value(map(flex1, 0, 250, 1, 6));
sliderPiano.value(map(flex2, 0, 250, 1, 4));
sliderBass.value(map(flex2, 0, 250, 1, 4));
a = map(flex3, 0, 250, 0.1, 0.9);
if (pianoAnimation == true) {
animateEllipseC(pianoPulse);
}
if (pianoAnimation == true) {
animateEllipseG(pianoPulse);
}
if (pianoAnimation == true) {
animateEllipseAM(pianoPulse);
}
if (pianoAnimation == true) {
animateEllipseF(pianoPulse);
}
if (sliderPiano.value() == 1) {
if (cChordPlaying == false) {
console.log("inside value 1");
pianoPart.removeAll();
pianoPart.add(0, cChord);
cChordPlaying = true;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 2) {
if (fChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, fChord);
cChordPlaying = false;
fChordPlaying = true;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 3) {
if (gChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, gChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = true;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 4) {
if (amChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, amChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = true;
}
}
if (sliderBass.value() == 1) {
if (cBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "C2");
cBassPlaying = true;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
}
} else if (sliderBass.value() == 2) {
if (fBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "F2");
cBassBassPlaying = false;
fBassBassPlaying = true;
gBassBassPlaying = false;
amBassBassPlaying = false;
}
} else if (sliderBass.value() == 3) {
if (gBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "G1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = true;
amBassPlaying = false;
}
} else if (sliderBass.value() == 4) {
if (amBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "A1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = true;
}
}
if (mouseX > width / 2 && mouseX < width &&
mouseY > 0 && mouseY < width) {
if (mouseIsPressed) {
for (i = 0; i < 25; i++) {
noStroke();
fill(255, 100 + i * 3, 100 + i * 5, 255 / i);
ellipse(mouseX, mouseY, i, i);
}
}
fill(0, 2);
rect(width / 2, 0, width / 2, height);
if (keyIsPressed) {
fill(0);
rect(width / 2, 0, width / 2, height);
leadPaint.triggerRelease();
}
}
}
function animateEllipseC(pianoPulse) {
if (sliderPiano.value() == 1) {
var coord = ellipseCoord.c;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(124, 225, 0, 200);
noStroke();
var pp = map(pianoPulse, 0, 1, 0.5, 1.1);
ellipse(coord[index], coord[index + 1], pp*60, pp*60);
pop();
}
}
function animateEllipseF(pianoPulse) {
if (sliderPiano.value() == 2) {
var coord = ellipseCoord.f;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(140, 180, 121, 200);
noStroke();
ellipse(coord[index], coord[index + 1], 30, 30);
pop();
}
}
function animateEllipseG(pianoPulse) {
if (sliderPiano.value() == 3) {
var coord = ellipseCoord.g;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(100, 120, 190, 200);
noStroke();
ellipse(coord[index], coord[index + 1], 30, 30);
pop();
}
}
function animateEllipseAM(pianoPulse) {
if (sliderPiano.value() == 4) {
var coord = ellipseCoord.am;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(0, 50)
fill(90, 100, 60, 200);
noStroke();
ellipse(coord[index], coord[index + 1], 30, 30);
pop();
}
}
function mouseDragged() {
var paintNote = ["C4", "E4", "G4", "A4", "C5", "E5", "G5", "A5", "C6"]
if (mouseX > width / 2 && mouseX < width &&
mouseY > 0 && mouseY < height) {
if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[0], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height / 2 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[6], "8n");
}
}
}
function mousePressed() {
if (mouseX > 0 && mouseX < width / 4 &&
mouseY > 0 && mouseY < height / 2) {
loopKick();
} else if (mouseX > width / 4 && mouseX < width / 2 &&
mouseY > 0 && mouseY < height / 2) {
loopPiano();
pianoAnimation = true;
} else if (mouseX > 0 && mouseX < width / 4 &&
mouseY > height / 2 && mouseY < height) {
loopSnare();
} else if (mouseX > width / 4 && mouseX < width / 2 &&
mouseY > height / 2 && mouseY < height) {
loopBass();
}
}
function loopKick() {
if (!kickOn) {
kickPart.start(0);
kickOn = !kickOn;
} else {
kickPart.stop();
kickOn = !kickOn;
}
}
function loopSnare() {
if (!snareOn) {
snarePart.start(0);
snarePart.loop = true;
snareOn = !snareOn;
} else {
snarePart.loop = false;
snareOn = !snareOn;
}
}
function loopPiano() {
if (!pianoOn) {
pianoPart.start(0);
pianoPart.loop = true;
pianoOn = !pianoOn;
} else {
pianoPart.loop = false;
pianoOn = !pianoOn;
}
}
function loopBass() {
if (!bassOn) {
bassPart.start(0);
bassPart.loop = true;
bassOn = !bassOn;
} else {
bassPart.loop = false;
bassOn = !bassOn;
}
}
for (var i = 0; i < portList.length; i++) {
}
}
var myArray = split(trimmedString, ",")
flex1 = Number(myArray[0]);
flex2 = Number(myArray[1]);
flex3 = Number(myArray[2]);
}
}
kickOn = false;
snareOn = false;
pianoOn = false;
bassOn = false;
var a;
var p = 0;
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
var flex1 = 0,
flex2 = 0,
flex3 = 0;
var pianoAnimation = false;
var kick = new Tone.MembraneSynth({
"envelope": {
"sustain": 0,
"attack": 0.02,
"decay": 0.8
},
"octaves": 10
}).toMaster();
var kickPart = new Tone.Loop(function(time) {
kick.triggerAttack("C2");
}, "2n");
var snareFilter = new Tone.AutoFilter({
frequency: 1,
type: "sine",
depth: 1,
baseFrequency: 400,
octaves: 2.6,
filter: {
type: "bandpass",
rolloff: -12,
Q: 1
}
}).toMaster();
var snare = new Tone.MetalSynth({
volume: -10,
frequency: 60,
envelope: {
attack: 0.001,
decay: 1.4,
release: 0.2
},
harmonicity: 5.1,
modulationIndex: 32,
resonance: 4000,
octaves: 1.5
}).connect(snareFilter);
var snarePart = new Tone.Sequence(function(time, freq) {
snare.frequency.setValueAtTime(freq, time, Math.random() * 0.5 + 0.5);
snare.triggerAttack(time);
}, [null, 200, null, 200], "1n");
var pianoDelay = new Tone.PingPongDelay({
"delayTime": "4t",
"maxDelayTime": 2,
"wet": .3,
"feedback": .1
}).toMaster();
var piano = new Tone.MonoSynth(4, Tone.Synth, {
"volume": -7,
"oscillator": {
"partials": [1, 2, 1],
},
"envelope": {
"attack": 0.001,
"decay": 0.1,
"sustain": 0.3,
"release": 1
},
"portamento": 0.001
}).connect(pianoDelay);
var cChord = ["C4", ["E4", "G4"]];
var gChord = [["B3", "D4"], "G4"];
var amChord = [["C4", "E4"], "A4"];
var fChord = [["C4"], "F4", ["A4"]];
var cChord = ["C4", "E4", "G4"];
var gChord = ["B3", "D4", "G4"];
var amChord = ["C4", "E4", "A4"];
var fChord = ["C4", "F4", "A4"];
var ellipseCoord = {};
var pianoPart = new Tone.Sequence(function(time, note) {
piano.triggerAttackRelease(note, "16n", time);
}, [cChord]);
var fft = new Tone.FFT(32);
var spectrum = new Tone.Waveform(1024);
var bassDist = new Tone.Distortion({
"distortion": 0.4,
"oversample": '2x'
}).connect(spectrum).toMaster();
var bass = new Tone.MonoSynth({
"volume": -10,
"envelope": {
"attack": 0.1,
"decay": 0.3,
"release": 2,
},
"filterEnvelope": {
"attack": 0.001,
"decay": 0.01,
"sustain": 0.5,
"baseFrequency": 200,
"octaves": 2.6
}
}).connect(bassDist);
var bassPart = new Tone.Sequence(function(time, note) {
bass.triggerAttackRelease(note, "16n", time);
}, ["C2"]);
var leadDelay = new Tone.PingPongDelay({
"delayTime": "8n",
"maxDelayTime": 1,
"feedback": a,
"wet": .40
}).toMaster();
var leadPaint = new Tone.PolySynth({
"volume": -20,
"oscillator": {
"type": "square"
},
"envelope": {
"attack": 0.2
},
"portamento": 0.05
}).connect(leadDelay);
Tone.Transport.bpm.value = 60;
Tone.Transport.start();
var time = 0;
var scaleValue = 1;
var sliderPiano;
function setup() {
createCanvas(windowWidth, windowWidth / 2);
background(0);
sliderKick = createSlider(1, 6, 2);
sliderKick.position(5, height + 20);
sliderKick.size(width / 4 - 10, 10);
sliderBass = createSlider(1, 4, 1);
sliderBass.position(width / 4 + 5, height + 40);
sliderBass.size(width / 4 - 10, 10);
sliderPiano = createSlider(1, 4, 1);
sliderPiano.position(width / 4 + 5, height + 20);
sliderPiano.size(width / 4 - 10, 10);
sliderSnare = createSlider(1, 6, 2);
sliderSnare.position(5, height + 40);
sliderSnare.size(width / 4 - 10, 10);
ellipseCoord.c = [80, 80, 160, 80, 240, 80];
ellipseCoord.g = [80, 80 + 55, 160, 80 + 55, 240, 80 + 55];
ellipseCoord.am = [80, 80 + 110, 160, 80 + 110, 240, 80 + 110];
ellipseCoord.f = [80, 80 + 165, 160, 80 + 165, 240, 80 + 165];
}
function draw() {
var kickPulse = kickPart.progress;
var snarePulse = snarePart.progress;
var pianoPulse = pianoPart.progress;
var bassPulse = bassPart.progress;
var loopstate = pianoPart.state;
var pp = map(pianoPulse, 0, 1, 1, 1.5);
var pt = map(pianoPulse, 0, 1, 1, 1.2);
var pg = map(pianoPulse, 0, 1, 1, 0.5);
var pf = map(pianoPulse, 0, 1, 1, 0.2);
var pp = floor(map(pianoPulse,0,1,1,3));
if(pp == 1 && pianoOn){
time++;
}else if(pp == 2 || !pianoOn){
time=0
}
if(time <= 15 && pianoOn){
scaleValue++;
}else if(time >= 15 && pianoOn){
scaleValue--;
}
if(!pianoOn){
scaleValue = 1
}
kickSwellOuter = map(kickPulse, 0, 1, 0, 5);
kickSwellMiddle = map(kickPulse, 0, 1, 0, 15);
kickSwellInner = map(kickPulse, 0, 1, 0, 40);
alphaOuter = map(kickSwellOuter, 0, 5, 50, 20);
alphaMiddle = map(kickSwellMiddle, 0, 20, 90, 30);
var wave = spectrum.getValue();
var fftwave = fft.getValue();
push();
translate(0, 0);
fill(0);
rect(0, 0, width / 4, height / 2);
noFill();
ellipseMode(CENTER);
stroke(135, 206, 250, alphaOuter);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 4 - 25 + (kickSwellOuter * -1), height / 2 - 25 + (kickSwellOuter * -1));
stroke(135, 206, 250, alphaMiddle);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 4 - 50 + (kickSwellMiddle * -1), height / 2 - 50 + (kickSwellMiddle * -1));
stroke(135, 206, 250);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 4 - 80 + (kickSwellInner * -1), height / 2 - 80 + (kickSwellInner * -1));
pop();
beginShape();
push();
translate(width * 3 / 8, height * 3 / 4);
fill(0);
rect(0 - (width / 8), 0 - (height / 4), width / 4, height / 2)
beginShape();
noFill();
strokeWeight(2);
rectMode(CENTER)
for (var i = 0; i < wave.length; i += 600) {
var b = map(wave[i], -1, 1, -40, 40);
rect(0, 0, width / 4 - 70 + b, height / 2 - 70 + b);
}
pop();
endShape();
push();
translate(width * 1 / 8, height * 3 / 4 + 61 / 3);
scale(1);
stroke(255);
point(0, 0)
noFill();
strokeWeight(1);
triangle(-70, 40.67, 0, -81.35, 70, 40.67);
pop();
kickPart.playbackRate = sliderKick.value();
snarePart.playbackRate = sliderSnare.value();
sliderKick.value(map(flex1, 0, 250, 1, 6));
sliderSnare.value(map(flex1, 0, 250, 1, 6));
sliderPiano.value(map(flex2, 0, 250, 1, 4));
sliderBass.value(map(flex2, 0, 250, 1, 4));
a = map(flex3, 0, 250, 0.1, 0.9);
if (pianoAnimation == true) {
animateEllipseC(pianoPulse);
}
if (pianoAnimation == true) {
animateEllipseG(pianoPulse);
}
if (pianoAnimation == true) {
animateEllipseAM(pianoPulse);
}
if (pianoAnimation == true) {
animateEllipseF(pianoPulse);
}
if (sliderPiano.value() == 1) {
if (cChordPlaying == false) {
console.log("inside value 1");
pianoPart.removeAll();
pianoPart.add(0, cChord);
cChordPlaying = true;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 2) {
if (fChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, fChord);
cChordPlaying = false;
fChordPlaying = true;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 3) {
if (gChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, gChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = true;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 4) {
if (amChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, amChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = true;
}
}
if (sliderBass.value() == 1) {
if (cBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "C2");
cBassPlaying = true;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
}
} else if (sliderBass.value() == 2) {
if (fBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "F2");
cBassBassPlaying = false;
fBassBassPlaying = true;
gBassBassPlaying = false;
amBassBassPlaying = false;
}
} else if (sliderBass.value() == 3) {
if (gBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "G1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = true;
amBassPlaying = false;
}
} else if (sliderBass.value() == 4) {
if (amBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "A1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = true;
}
}
if (mouseX > width / 2 && mouseX < width &&
mouseY > 0 && mouseY < width) {
if (mouseIsPressed) {
for (i = 0; i < 25; i++) {
noStroke();
fill(255, 100 + i * 3, 100 + i * 5, 255 / i);
ellipse(mouseX, mouseY, i, i);
}
}
fill(0, 2);
rect(width / 2, 0, width / 2, height);
if (keyIsPressed) {
fill(0);
rect(width / 2, 0, width / 2, height);
leadPaint.triggerRelease();
}
fill(255);
rect(width / 4, 0, width / 2, height / 2);
}
}
function animateEllipseC(pianoPulse) {
if (sliderPiano.value() == 1) {
var coord = ellipseCoord.c;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(124, 225, 0, 200);
noStroke();
ellipse(coord[index], coord[index + 1], 30, 30);
pop();
}
}
function animateEllipseF(pianoPulse) {
if (sliderPiano.value() == 2) {
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(140, 180, 121, 200);
noStroke();
ellipse(coord[index], coord[index + 1], 30, 30);
pop();
}
}
function animateEllipseG(pianoPulse) {
if (sliderPiano.value() == 3) {
var coord = ellipseCoord.am;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(100, 120, 190, 200);
noStroke();
ellipse(coord[index], coord[index + 1], 30, 30);
pop();
}
}
function animateEllipseAM(pianoPulse) {
if (sliderPiano.value() == 4) {
var coord = ellipseCoord.f;
var index = 0;
if (pianoPulse > 0 && pianoPulse < 0.3) {
index = 0;
} else if (pianoPulse > 0.3 && pianoPulse < 0.6) {
index = 2;
} else if (pianoPulse > 0.6) {
index = 4;
}
push();
translate(width / 4, 0)
point(0, 0)
fill(0, 50)
fill(90, 100, 60, 200);
noStroke();
ellipse(coord[index], coord[index + 1], 30, 30);
pop();
}
}
function mouseDragged() {
var paintNote = ["C4", "E4", "G4", "A4", "C5", "E5", "G5", "A5", "C6"]
if (mouseX > width / 2 && mouseX < width &&
mouseY > 0 && mouseY < height) {
if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[0], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height / 2 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[6], "8n");
}
}
}
function mousePressed() {
if (mouseX > 0 && mouseX < width / 4 &&
mouseY > 0 && mouseY < height / 2) {
loopKick();
} else if (mouseX > width / 4 && mouseX < width / 2 &&
mouseY > 0 && mouseY < height / 2) {
loopPiano();
pianoAnimation = true;
} else if (mouseX > 0 && mouseX < width / 4 &&
mouseY > height / 2 && mouseY < height) {
loopSnare();
} else if (mouseX > width / 4 && mouseX < width / 2 &&
mouseY > height / 2 && mouseY < height) {
loopBass();
}
}
function loopKick() {
if (!kickOn) {
kickPart.start(0);
kickOn = !kickOn;
} else {
kickPart.stop();
kickOn = !kickOn;
}
}
function loopSnare() {
if (!snareOn) {
snarePart.start(0);
snarePart.loop = true;
snareOn = !snareOn;
} else {
snarePart.loop = false;
snareOn = !snareOn;
}
}
function loopPiano() {
if (!pianoOn) {
pianoPart.start(0);
pianoPart.loop = true;
pianoOn = !pianoOn;
} else {
pianoPart.loop = false;
pianoOn = !pianoOn;
}
}
function loopBass() {
if (!bassOn) {
bassPart.start(0);
bassPart.loop = true;
bassOn = !bassOn;
} else {
bassPart.loop = false;
bassOn = !bassOn;
}
}
for (var i = 0; i < portList.length; i++) {
}
}
var myArray = split(trimmedString, ",")
flex1 = Number(myArray[0]);
flex2 = Number(myArray[1]);
flex3 = Number(myArray[2]);
}
}
kickOn = false;
snareOn = false;
pianoOn = false;
bassOn = false;
var a;
var p = 0;
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
var flex1 = 0,
flex2 = 0,
flex3 = 0;
var pianoAnimation=false;
var kick = new Tone.MembraneSynth({
"envelope": {
"sustain": 0,
"attack": 0.02,
"decay": 0.8
},
"octaves": 10
}).toMaster();
var kickPart = new Tone.Loop(function(time) {
kick.triggerAttack("C2");
}, "2n");
var snareFilter = new Tone.AutoFilter({
frequency: 1,
type: "sine",
depth: 1,
baseFrequency: 400,
octaves: 2.6,
filter: {
type: "bandpass",
rolloff: -12,
Q: 1
}
}).toMaster();
var snare = new Tone.MetalSynth({
volume: -10,
frequency: 60,
envelope: {
attack: 0.001,
decay: 1.4,
release: 0.2
},
harmonicity: 5.1,
modulationIndex: 32,
resonance: 4000,
octaves: 1.5
}).connect(snareFilter);
var snarePart = new Tone.Sequence(function(time, freq) {
snare.frequency.setValueAtTime(freq, time, Math.random() * 0.5 + 0.5);
snare.triggerAttack(time);
}, [null, 200, null, 200], "1n");
var pianoDelay = new Tone.PingPongDelay({
"delayTime": "4t",
"maxDelayTime": 2,
"wet": .3,
"feedback": .1
}).toMaster();
var piano = new Tone.MonoSynth(4, Tone.Synth, {
"volume": -7,
"oscillator": {
"partials": [1, 2, 1],
},
"envelope": {
"attack": 0.001,
"decay": 0.1,
"sustain": 0.3,
"release": 1
},
"portamento": 0.001
}).connect(pianoDelay);
var cChord = ["C4", ["E4", "G4"]];
var gChord = [["B3", "D4"], "G4"];
var amChord = [["C4", "E4"], "A4"];
var fChord = [["C4"], "F4", ["A4"]];
var cChord = ["C4", "E4", "G4"];
var gChord = ["B3", "D4", "G4"];
var amChord = ["C4", "E4", "A4"];
var fChord = ["C4", "F4", "A4"];
var ellipseCoord = {};
var pianoPart = new Tone.Sequence(function(time, note) {
piano.triggerAttackRelease(note, "16n", time);
}, [cChord]);
var fft = new Tone.FFT(32);
var spectrum = new Tone.Waveform(1024);
var bassDist = new Tone.Distortion({
"distortion": 0.4,
"oversample": '2x'
}).connect(spectrum).toMaster();
var bass = new Tone.MonoSynth({
"volume": -10,
"envelope": {
"attack": 0.1,
"decay": 0.3,
"release": 2,
},
"filterEnvelope": {
"attack": 0.001,
"decay": 0.01,
"sustain": 0.5,
"baseFrequency": 200,
"octaves": 2.6
}
}).connect(bassDist);
var bassPart = new Tone.Sequence(function(time, note) {
bass.triggerAttackRelease(note, "16n", time);
}, ["C2"]);
var leadDelay = new Tone.PingPongDelay({
"delayTime": "8n",
"maxDelayTime": 1,
"feedback": a,
"wet": .40
}).toMaster();
var leadPaint = new Tone.PolySynth({
"volume": -20,
"oscillator": {
"type": "square"
},
"envelope": {
"attack": 0.2
},
"portamento": 0.05
}).connect(leadDelay);
Tone.Transport.bpm.value = 60;
Tone.Transport.start();
var time = 0;
var scaleValue = 1;
var sliderPiano;
function setup() {
createCanvas(windowWidth, windowWidth / 2);
background(0);
sliderKick = createSlider(1, 6, 2);
sliderKick.position(5, height + 20);
sliderKick.size(width / 4 - 10, 10);
sliderBass = createSlider(1, 4, 1);
sliderBass.position(width / 4 + 5, height + 40);
sliderBass.size(width / 4 - 10, 10);
sliderPiano = createSlider(1, 4, 1);
sliderPiano.position(width / 4 + 5, height + 20);
sliderPiano.size(width / 4 - 10, 10);
sliderSnare = createSlider(1, 6, 2);
sliderSnare.position(5, height + 40);
sliderSnare.size(width / 4 - 10, 10);
ellipseCoord.c = [80, 80, 160, 80, 240, 80];
ellipseCoord.g = [80, 80+55, 160, 80+55, 240, 80+55];
ellipseCoord.am = [80, 80+110, 160, 80+110, 240, 80+110];
ellipseCoord.f = [80, 80+165, 160, 80+165, 240, 80+165];
}
function draw() {
var kickPulse = kickPart.progress;
var snarePulse = snarePart.progress;
var pianoPulse = pianoPart.progress;
var bassPulse = bassPart.progress;
var loopstate = pianoPart.state;
var pp = map(pianoPulse, 0, 1, 1, 1.5);
var pt = map(pianoPulse, 0, 1, 1, 1.2);
var pg = map(pianoPulse, 0, 1, 1, 0.5);
var pf = map(pianoPulse, 0, 1, 1, 0.2);
var pp = floor(map(pianoPulse,0,1,1,3));
if(pp == 1 && pianoOn){
time++;
}else if(pp == 2 || !pianoOn){
time=0
}
if(time <= 15 && pianoOn){
scaleValue++;
}else if(time >= 15 && pianoOn){
scaleValue--;
}
if(!pianoOn){
scaleValue = 1
}
kickSwellOuter = map(kickPulse, 0, 1, 0, 5);
kickSwellMiddle = map(kickPulse, 0, 1, 0, 15);
kickSwellInner = map(kickPulse, 0, 1, 0, 40);
alphaOuter = map(kickSwellOuter, 0, 5, 50, 20);
alphaMiddle = map(kickSwellMiddle, 0, 20, 90, 30);
var wave = spectrum.getValue();
var fftwave = fft.getValue();
push();
translate(0, 0);
fill(0);
rect(0,0,width/4,height/2);
noFill();
ellipseMode(CENTER);
stroke(135, 206, 250, alphaOuter);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 4 - 25 + (kickSwellOuter * -1), height / 2 - 25 + (kickSwellOuter * -1));
stroke(135, 206, 250, alphaMiddle);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 4 - 50 + (kickSwellMiddle * -1), height / 2 - 50 + (kickSwellMiddle * -1));
stroke(135, 206, 250);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 4 - 80 + (kickSwellInner * -1), height / 2 - 80 + (kickSwellInner * -1));
pop();
beginShape();
push();
translate(width * 3 / 8, height * 3 / 4);
fill(0);
rect(0-(width/8),0-(height/4),width/4,height/2)
beginShape();
noFill();
strokeWeight(2);
rectMode(CENTER)
for (var i = 0; i < wave.length; i += 600) {
var b = map(wave[i], -1, 1, -40, 40);
rect(0, 0, width / 4 - 70 + b, height / 2 - 70 + b);
}
pop();
endShape();
push();
translate(width * 1 / 8, height*3/4 + 61 / 3);
scale(1);
stroke(255);
point(0, 0)
noFill();
strokeWeight(1);
triangle(-70, 40.67, 0, -81.35, 70, 40.67);
pop();
kickPart.playbackRate = sliderKick.value();
snarePart.playbackRate = sliderSnare.value();
sliderKick.value(map(flex1, 0, 250, 1, 6));
sliderSnare.value(map(flex1, 0, 250, 1, 6));
sliderPiano.value(map(flex2, 0, 250, 1, 4));
sliderBass.value(map(flex2, 0, 250, 1, 4));
a = map(flex3, 0, 250, 0.1, 0.9);
if(pianoAnimation==true) {
animateEllipseC(pianoPulse);
}
if(pianoAnimation==true) {
animateEllipseG(pianoPulse);
}
if(pianoAnimation==true) {
animateEllipseAM(pianoPulse);
}
if(pianoAnimation==true) {
animateEllipseF(pianoPulse);
}
if (sliderPiano.value() == 1) {
if (cChordPlaying == false) {
console.log("inside value 1");
pianoPart.removeAll();
pianoPart.add(0, cChord);
cChordPlaying = true;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 2) {
if (fChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, fChord);
cChordPlaying = false;
fChordPlaying = true;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 3) {
if (gChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, gChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = true;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 4) {
if (amChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, amChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = true;
}
}
if (sliderBass.value() == 1) {
if (cBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "C2");
cBassPlaying = true;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
}
} else if (sliderBass.value() == 2) {
if (fBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "F2");
cBassBassPlaying = false;
fBassBassPlaying = true;
gBassBassPlaying = false;
amBassBassPlaying = false;
}
} else if (sliderBass.value() == 3) {
if (gBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "G1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = true;
amBassPlaying = false;
}
} else if (sliderBass.value() == 4) {
if (amBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "A1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = true;
}
}
if (mouseX > width / 2 && mouseX < width &&
mouseY > 0 && mouseY < width) {
if (mouseIsPressed) {
for (i = 0; i < 25; i++) {
noStroke();
fill(255, 100 + i * 3, 100 + i * 5, 255 / i);
ellipse(mouseX, mouseY, i, i);
}
}
fill(0,2);
rect(width / 2, 0, width / 2, height);
if (keyIsPressed) {
fill(0);
rect(width / 2, 0, width / 2, height);
leadPaint.triggerRelease();
}
}
}
function animateEllipseC(pianoPulse) {
if (sliderPiano.value() == 1) {
var coord = ellipseCoord.c;
var index = 0;
if(pianoPulse >0 && pianoPulse < 0.3){
index =0;
}else if(pianoPulse >0.3 && pianoPulse < 0.6){
index = 2;
}else if(pianoPulse > 0.6){
index = 4;
}
push();
translate(width/4,0)
point(0,0)
fill(0, 50)
rect(0,0,width/4,height/2)
fill(124,225,0, 200);
noStroke();
ellipse(coord[index], coord[index + 1], 30, 30);
pop();
}
}
function animateEllipseF(pianoPulse) {
if (sliderPiano.value() == 2) {
var index = 0;
if(pianoPulse >0 && pianoPulse < 0.3){
index =0;
}else if(pianoPulse >0.3 && pianoPulse < 0.6){
index = 2;
}else if(pianoPulse > 0.6){
index = 4;
}
push();
translate(width/4,0)
point(0,0)
fill(0, 50)
rect(0,0,width/4,height/2)
fill(140,180,121, 200);
noStroke();
ellipse(coord[index], coord[index + 1], 30, 30);
pop();
}
}
function animateEllipseG(pianoPulse) {
console.log("inside chordAnimation");
if (sliderPiano.value() == 3) {
var coord = ellipseCoord.am;
var index = 0;
if(pianoPulse >0 && pianoPulse < 0.3){
index =0;
}else if(pianoPulse >0.3 && pianoPulse < 0.6){
index = 2;
}else if(pianoPulse > 0.6){
index = 4;
}
push();
translate(width/4,0)
point(0,0)
fill(0, 50)
rect(0,0,width/4,height/2)
fill(100,120,190, 200);
noStroke();
ellipse(coord[index], coord[index + 1], 30, 30);
pop();
}
}
function animateEllipseAM(pianoPulse) {
console.log("inside chordAnimation");
if (sliderPiano.value() == 4) {
var coord = ellipseCoord.f;
var index = 0;
if(pianoPulse >0 && pianoPulse < 0.3){
index =0;
}else if(pianoPulse >0.3 && pianoPulse < 0.6){
index = 2;
}else if(pianoPulse > 0.6){
index = 4;
}
push();
translate(width/4,0)
point(0,0)
fill(0, 50)
rect(0,0,width/4,height/2)
fill(90,100,60, 200);
noStroke();
ellipse(coord[index], coord[index + 1], 30, 30);
pop();
}
}
function mouseDragged() {
var paintNote = ["C4", "E4", "G4", "A4", "C5", "E5", "G5", "A5", "C6"]
if (mouseX > width / 2 && mouseX < width &&
mouseY > 0 && mouseY < height) {
if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[0], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height / 2 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[6], "8n");
}
}
}
function mousePressed() {
if (mouseX > 0 && mouseX < width / 4 &&
mouseY > 0 && mouseY < height / 2) {
loopKick();
} else if (mouseX > width / 4 && mouseX < width / 2 &&
mouseY > 0 && mouseY < height / 2) {
loopPiano();
pianoAnimation=true;
} else if (mouseX > 0 && mouseX < width / 4 &&
mouseY > height / 2 && mouseY < height) {
loopSnare();
} else if (mouseX > width / 4 && mouseX < width / 2 &&
mouseY > height / 2 && mouseY < height) {
loopBass();
}
}
function loopKick() {
if (!kickOn) {
kickPart.start(0);
kickOn = !kickOn;
} else {
kickPart.stop();
kickOn = !kickOn;
}
}
function loopSnare() {
if (!snareOn) {
snarePart.start(0);
snarePart.loop = true;
snareOn = !snareOn;
} else {
snarePart.loop = false;
snareOn = !snareOn;
}
}
function loopPiano() {
if (!pianoOn) {
pianoPart.start(0);
pianoPart.loop = true;
pianoOn = !pianoOn;
} else {
pianoPart.loop = false;
pianoOn = !pianoOn;
}
}
function loopBass() {
if (!bassOn) {
bassPart.start(0);
bassPart.loop = true;
bassOn = !bassOn;
} else {
bassPart.loop = false;
bassOn = !bassOn;
}
}
for (var i = 0; i < portList.length; i++) {
}
}
var myArray = split(trimmedString, ",")
flex1 = Number(myArray[0]);
flex2 = Number(myArray[1]);
flex3 = Number(myArray[2]);
}
}kickOn = false;
snareOn = false;
pianoOn = false;
bassOn = false;
var a;
var p = 0;
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
var flex1 = 0,
flex2 = 0,
flex3 = 0;
var pianoAnimation=false;
var kick = new Tone.MembraneSynth({
"envelope": {
"sustain": 0,
"attack": 0.02,
"decay": 0.8
},
"octaves": 10
}).toMaster();
var kickPart = new Tone.Loop(function(time) {
kick.triggerAttack("C2");
}, "2n");
var snareFilter = new Tone.AutoFilter({
frequency: 1,
type: "sine",
depth: 1,
baseFrequency: 400,
octaves: 2.6,
filter: {
type: "bandpass",
rolloff: -12,
Q: 1
}
}).toMaster();
var snare = new Tone.MetalSynth({
volume: -10,
frequency: 60,
envelope: {
attack: 0.001,
decay: 1.4,
release: 0.2
},
harmonicity: 5.1,
modulationIndex: 32,
resonance: 4000,
octaves: 1.5
}).connect(snareFilter);
var snarePart = new Tone.Sequence(function(time, freq) {
snare.frequency.setValueAtTime(freq, time, Math.random() * 0.5 + 0.5);
snare.triggerAttack(time);
}, [null, 200, null, 200], "1n");
var pianoDelay = new Tone.PingPongDelay({
"delayTime": "4t",
"maxDelayTime": 2,
"wet": .3,
"feedback": .1
}).toMaster();
var piano = new Tone.MonoSynth(4, Tone.Synth, {
"volume": -7,
"oscillator": {
"partials": [1, 2, 1],
},
"envelope": {
"attack": 0.001,
"decay": 0.1,
"sustain": 0.3,
"release": 1
},
"portamento": 0.001
}).connect(pianoDelay);
var cChord = ["C4", ["E4", "G4"]];
var gChord = [["B3", "D4"], "G4"];
var amChord = [["C4", "E4"], "A4"];
var fChord = [["C4"], "F4", ["A4"]];
var cChord = ["C4", "E4", "G4"];
var gChord = ["B3", "D4", "G4"];
var amChord = ["C4", "E4", "A4"];
var fChord = ["C4", "F4", "A4"];
var ellipseCoord = {};
var pianoPart = new Tone.Sequence(function(time, note) {
piano.triggerAttackRelease(note, "16n", time);
}, [cChord]);
var fft = new Tone.FFT(32);
var spectrum = new Tone.Waveform(1024);
var bassDist = new Tone.Distortion({
"distortion": 0.4,
"oversample": '2x'
}).connect(spectrum).toMaster();
var bass = new Tone.MonoSynth({
"volume": -10,
"envelope": {
"attack": 0.1,
"decay": 0.3,
"release": 2,
},
"filterEnvelope": {
"attack": 0.001,
"decay": 0.01,
"sustain": 0.5,
"baseFrequency": 200,
"octaves": 2.6
}
}).connect(bassDist);
var bassPart = new Tone.Sequence(function(time, note) {
bass.triggerAttackRelease(note, "16n", time);
}, ["C2"]);
var leadDelay = new Tone.PingPongDelay({
"delayTime": "8n",
"maxDelayTime": 1,
"feedback": a,
"wet": .40
}).toMaster();
var leadPaint = new Tone.PolySynth({
"volume": -20,
"oscillator": {
"type": "square"
},
"envelope": {
"attack": 0.2
},
"portamento": 0.05
}).connect(leadDelay);
Tone.Transport.bpm.value = 60;
Tone.Transport.start();
var time = 0;
var scaleValue = 1;
var sliderPiano;
function setup() {
createCanvas(windowWidth, windowWidth / 2);
background(0);
sliderKick = createSlider(1, 6, 2);
sliderKick.position(5, height + 20);
sliderKick.size(width / 4 - 10, 10);
sliderBass = createSlider(1, 4, 1);
sliderBass.position(width / 4 + 5, height + 40);
sliderBass.size(width / 4 - 10, 10);
sliderPiano = createSlider(1, 4, 1);
sliderPiano.position(width / 4 + 5, height + 20);
sliderPiano.size(width / 4 - 10, 10);
sliderSnare = createSlider(1, 6, 2);
sliderSnare.position(5, height + 40);
sliderSnare.size(width / 4 - 10, 10);
ellipseCoord.c = [80, 80, 160, 80, 240, 80];
ellipseCoord.g = [80, 80+55, 160, 80+55, 240, 80+55];
ellipseCoord.am = [80, 80+110, 160, 80+110, 240, 80+110];
ellipseCoord.f = [80, 80+165, 160, 80+165, 240, 80+165];
}
function draw() {
var kickPulse = kickPart.progress;
var snarePulse = snarePart.progress;
var pianoPulse = pianoPart.progress;
var bassPulse = bassPart.progress;
var loopstate = pianoPart.state;
var pp = map(pianoPulse, 0, 1, 1, 1.5);
var pt = map(pianoPulse, 0, 1, 1, 1.2);
var pg = map(pianoPulse, 0, 1, 1, 0.5);
var pf = map(pianoPulse, 0, 1, 1, 0.2);
var pp = floor(map(pianoPulse,0,1,1,3));
if(pp == 1 && pianoOn){
time++;
}else if(pp == 2 || !pianoOn){
time=0
}
if(time <= 15 && pianoOn){
scaleValue++;
}else if(time >= 15 && pianoOn){
scaleValue--;
}
if(!pianoOn){
scaleValue = 1
}
kickSwellOuter = map(kickPulse, 0, 1, 0, 5);
kickSwellMiddle = map(kickPulse, 0, 1, 0, 15);
kickSwellInner = map(kickPulse, 0, 1, 0, 40);
alphaOuter = map(kickSwellOuter, 0, 5, 50, 20);
alphaMiddle = map(kickSwellMiddle, 0, 20, 90, 30);
var wave = spectrum.getValue();
var fftwave = fft.getValue();
push();
translate(0, 0);
fill(0);
rect(0,0,width/4,height/2);
noFill();
ellipseMode(CENTER);
stroke(135, 206, 250, alphaOuter);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 4 - 25 + (kickSwellOuter * -1), height / 2 - 25 + (kickSwellOuter * -1));
stroke(135, 206, 250, alphaMiddle);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 4 - 50 + (kickSwellMiddle * -1), height / 2 - 50 + (kickSwellMiddle * -1));
stroke(135, 206, 250);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 4 - 80 + (kickSwellInner * -1), height / 2 - 80 + (kickSwellInner * -1));
pop();
beginShape();
push();
translate(width * 3 / 8, height * 3 / 4);
fill(0);
rect(0-(width/8),0-(height/4),width/4,height/2)
beginShape();
noFill();
strokeWeight(2);
rectMode(CENTER)
for (var i = 0; i < wave.length; i += 600) {
var b = map(wave[i], -1, 1, -40, 40);
rect(0, 0, width / 4 - 70 + b, height / 2 - 70 + b);
}
pop();
endShape();
push();
translate(width * 1 / 8, height*3/4 + 61 / 3);
scale(1);
stroke(255);
point(0, 0)
noFill();
strokeWeight(1);
triangle(-70, 40.67, 0, -81.35, 70, 40.67);
pop();
kickPart.playbackRate = sliderKick.value();
snarePart.playbackRate = sliderSnare.value();
sliderKick.value(map(flex1, 0, 250, 1, 6));
sliderSnare.value(map(flex1, 0, 250, 1, 6));
sliderPiano.value(map(flex2, 0, 250, 1, 4));
sliderBass.value(map(flex2, 0, 250, 1, 4));
a = map(flex3, 0, 250, 0.1, 0.9);
if(pianoAnimation==true) {
animateEllipseG(pianoPulse);
}
if (sliderPiano.value() == 1) {
if (cChordPlaying == false) {
console.log("inside value 1");
pianoPart.removeAll();
pianoPart.add(0, cChord);
cChordPlaying = true;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 2) {
if (fChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, fChord);
cChordPlaying = false;
fChordPlaying = true;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 3) {
if (gChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, gChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = true;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 4) {
if (amChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, amChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = true;
}
}
if (sliderBass.value() == 1) {
if (cBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "C2");
cBassPlaying = true;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
}
} else if (sliderBass.value() == 2) {
if (fBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "F2");
cBassBassPlaying = false;
fBassBassPlaying = true;
gBassBassPlaying = false;
amBassBassPlaying = false;
}
} else if (sliderBass.value() == 3) {
if (gBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "G1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = true;
amBassPlaying = false;
}
} else if (sliderBass.value() == 4) {
if (amBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "A1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = true;
}
}
if (mouseX > width / 2 && mouseX < width &&
mouseY > 0 && mouseY < width) {
if (mouseIsPressed) {
for (i = 0; i < 25; i++) {
noStroke();
fill(255, 100 + i * 3, 100 + i * 5, 255 / i);
ellipse(mouseX, mouseY, i, i);
}
}
fill(0,2);
rect(width / 2, 0, width / 2, height);
if (keyIsPressed) {
fill(0);
rect(width / 2, 0, width / 2, height);
leadPaint.triggerRelease();
}
}
}
function animateEllipseG(pianoPulse) {
console.log("inside chordAnimation");
if (sliderPiano.value() == 1) {
var coord = ellipseCoord.c;
console.log(coord);
var index = 0;
if(pianoPulse >0 && pianoPulse < 0.3){
index =0;
}else if(pianoPulse >0.3 && pianoPulse < 0.6){
index = 2;
}else if(pianoPulse > 0.6){
index = 4;
}
push();
translate(width/4,0)
point(0,0)
fill(0, 50)
rect(0,0,width/4,height/2)
fill(124,225,0, 200);
noStroke();
ellipse(coord[index], coord[index + 1], 30, 30);
pop();
}
}
function animateEllipse(pianoPulse) {
console.log("inside chordAnimation");
if (sliderPiano.value() == 1) {
var coord = ellipseCoord.c;
console.log(coord);
var index = 0;
if(pianoPulse >0 && pianoPulse < 0.3){
index =0;
}else if(pianoPulse >0.3 && pianoPulse < 0.6){
index = 2;
}else if(pianoPulse > 0.6){
index = 4;
}
push();
translate(width/4,0)
point(0,0)
fill(0, 50)
rect(0,0,width/4,height/2)
fill(124,225,0, 200);
noStroke();
ellipse(coord[index], coord[index + 1], 30, 30);
pop();
}
}
function mouseDragged() {
var paintNote = ["C4", "E4", "G4", "A4", "C5", "E5", "G5", "A5", "C6"]
if (mouseX > width / 2 && mouseX < width &&
mouseY > 0 && mouseY < height) {
if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[0], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height / 2 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[6], "8n");
}
}
}
function mousePressed() {
if (mouseX > 0 && mouseX < width / 4 &&
mouseY > 0 && mouseY < height / 2) {
loopKick();
} else if (mouseX > width / 4 && mouseX < width / 2 &&
mouseY > 0 && mouseY < height / 2) {
loopPiano();
pianoAnimation=true;
} else if (mouseX > 0 && mouseX < width / 4 &&
mouseY > height / 2 && mouseY < height) {
loopSnare();
} else if (mouseX > width / 4 && mouseX < width / 2 &&
mouseY > height / 2 && mouseY < height) {
loopBass();
}
}
function loopKick() {
if (!kickOn) {
kickPart.start(0);
kickOn = !kickOn;
} else {
kickPart.stop();
kickOn = !kickOn;
}
}
function loopSnare() {
if (!snareOn) {
snarePart.start(0);
snarePart.loop = true;
snareOn = !snareOn;
} else {
snarePart.loop = false;
snareOn = !snareOn;
}
}
function loopPiano() {
if (!pianoOn) {
pianoPart.start(0);
pianoPart.loop = true;
pianoOn = !pianoOn;
} else {
pianoPart.loop = false;
pianoOn = !pianoOn;
}
}
function loopBass() {
if (!bassOn) {
bassPart.start(0);
bassPart.loop = true;
bassOn = !bassOn;
} else {
bassPart.loop = false;
bassOn = !bassOn;
}
}
for (var i = 0; i < portList.length; i++) {
}
}
var myArray = split(trimmedString, ",")
flex1 = Number(myArray[0]);
flex2 = Number(myArray[1]);
flex3 = Number(myArray[2]);
}
}kickOn = false;
snareOn = false;
pianoOn = false;
bassOn = false;
var a;
var p = 0;
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
var flex1 = 0,
flex2 = 0,
flex3 = 0;
var pianoAnimation=false;
var kick = new Tone.MembraneSynth({
"envelope": {
"sustain": 0,
"attack": 0.02,
"decay": 0.8
},
"octaves": 10
}).toMaster();
var kickPart = new Tone.Loop(function(time) {
kick.triggerAttack("C2");
}, "2n");
var snareFilter = new Tone.AutoFilter({
frequency: 1,
type: "sine",
depth: 1,
baseFrequency: 400,
octaves: 2.6,
filter: {
type: "bandpass",
rolloff: -12,
Q: 1
}
}).toMaster();
var snare = new Tone.MetalSynth({
volume: -10,
frequency: 60,
envelope: {
attack: 0.001,
decay: 1.4,
release: 0.2
},
harmonicity: 5.1,
modulationIndex: 32,
resonance: 4000,
octaves: 1.5
}).connect(snareFilter);
var snarePart = new Tone.Sequence(function(time, freq) {
snare.frequency.setValueAtTime(freq, time, Math.random() * 0.5 + 0.5);
snare.triggerAttack(time);
}, [null, 200, null, 200], "1n");
var pianoDelay = new Tone.PingPongDelay({
"delayTime": "4t",
"maxDelayTime": 2,
"wet": .3,
"feedback": .1
}).toMaster();
var piano = new Tone.MonoSynth(4, Tone.Synth, {
"volume": -7,
"oscillator": {
"partials": [1, 2, 1],
},
"envelope": {
"attack": 0.001,
"decay": 0.1,
"sustain": 0.3,
"release": 1
},
"portamento": 0.001
}).connect(pianoDelay);
var cChord = ["C4", ["E4", "G4"]];
var gChord = [["B3", "D4"], "G4"];
var amChord = [["C4", "E4"], "A4"];
var fChord = [["C4"], "F4", ["A4"]];
var cChord = ["C4", "E4", "G4"];
var gChord = ["B3", "D4", "G4"];
var amChord = ["C4", "E4", "A4"];
var fChord = ["C4", "F4", "A4"];
var ellipseCoord = {};
var pianoPart = new Tone.Sequence(function(time, note) {
piano.triggerAttackRelease(note, "16n", time);
}, [cChord]);
var fft = new Tone.FFT(32);
var spectrum = new Tone.Waveform(1024);
var bassDist = new Tone.Distortion({
"distortion": 0.4,
"oversample": '2x'
}).connect(spectrum).toMaster();
var bass = new Tone.MonoSynth({
"volume": -10,
"envelope": {
"attack": 0.1,
"decay": 0.3,
"release": 2,
},
"filterEnvelope": {
"attack": 0.001,
"decay": 0.01,
"sustain": 0.5,
"baseFrequency": 200,
"octaves": 2.6
}
}).connect(bassDist);
var bassPart = new Tone.Sequence(function(time, note) {
bass.triggerAttackRelease(note, "16n", time);
}, ["C2"]);
var leadDelay = new Tone.PingPongDelay({
"delayTime": "8n",
"maxDelayTime": 1,
"feedback": a,
"wet": .40
}).toMaster();
var leadPaint = new Tone.PolySynth({
"volume": -20,
"oscillator": {
"type": "square"
},
"envelope": {
"attack": 0.2
},
"portamento": 0.05
}).connect(leadDelay);
Tone.Transport.bpm.value = 60;
Tone.Transport.start();
var time = 0;
var scaleValue = 1;
var sliderPiano;
function setup() {
createCanvas(windowWidth, windowWidth / 2);
background(0);
sliderKick = createSlider(1, 6, 2);
sliderKick.position(5, height + 20);
sliderKick.size(width / 4 - 10, 10);
sliderBass = createSlider(1, 4, 1);
sliderBass.position(width / 4 + 5, height + 40);
sliderBass.size(width / 4 - 10, 10);
sliderPiano = createSlider(1, 4, 1);
sliderPiano.position(width / 4 + 5, height + 20);
sliderPiano.size(width / 4 - 10, 10);
sliderSnare = createSlider(1, 6, 2);
sliderSnare.position(5, height + 40);
sliderSnare.size(width / 4 - 10, 10);
ellipseCoord.c = [80, 80, 160, 80, 240, 80];
ellipseCoord.g = [80, 80+55, 160, 80+55, 240, 80+55];
ellipseCoord.am = [80, 80+110, 160, 80+110, 240, 80+110];
ellipseCoord.f = [80, 80+165, 160, 80+165, 240, 80+165];
}
function draw() {
var kickPulse = kickPart.progress;
var snarePulse = snarePart.progress;
var pianoPulse = pianoPart.progress;
var bassPulse = bassPart.progress;
var loopstate = pianoPart.state;
var pp = map(pianoPulse, 0, 1, 1, 1.5);
var pt = map(pianoPulse, 0, 1, 1, 1.2);
var pg = map(pianoPulse, 0, 1, 1, 0.5);
var pf = map(pianoPulse, 0, 1, 1, 0.2);
var pp = floor(map(pianoPulse,0,1,1,3));
if(pp == 1 && pianoOn){
time++;
}else if(pp == 2 || !pianoOn){
time=0
}
if(time <= 15 && pianoOn){
scaleValue++;
}else if(time >= 15 && pianoOn){
scaleValue--;
}
if(!pianoOn){
scaleValue = 1
}
kickSwellOuter = map(kickPulse, 0, 1, 0, 5);
kickSwellMiddle = map(kickPulse, 0, 1, 0, 15);
kickSwellInner = map(kickPulse, 0, 1, 0, 40);
alphaOuter = map(kickSwellOuter, 0, 5, 50, 20);
alphaMiddle = map(kickSwellMiddle, 0, 20, 90, 30);
var wave = spectrum.getValue();
var fftwave = fft.getValue();
push();
translate(0, 0);
noFill();
ellipseMode(CENTER);
stroke(135, 206, 250, alphaOuter);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 4 - 25 + (kickSwellOuter * -1), height / 2 - 25 + (kickSwellOuter * -1));
stroke(135, 206, 250, alphaMiddle);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 4 - 50 + (kickSwellMiddle * -1), height / 2 - 50 + (kickSwellMiddle * -1));
stroke(135, 206, 250);
strokeWeight(2);
ellipse(width / 8, height / 4, width / 4 - 80 + (kickSwellInner * -1), height / 2 - 80 + (kickSwellInner * -1));
pop();
beginShape();
push();
translate(width * 3 / 8, height * 3 / 4);
beginShape();
noFill();
strokeWeight(2);
rectMode(CENTER)
for (var i = 0; i < wave.length; i += 600) {
var b = map(wave[i], -1, 1, -40, 40);
rect(0, 0, width / 4 - 70 + b, height / 2 - 70 + b);
}
pop();
endShape();
push();
translate(width * 1 / 8, height*3/4 + 61 / 3);
scale(1);
stroke(255);
point(0, 0)
noFill();
strokeWeight(1);
triangle(-70, 40.67, 0, -81.35, 70, 40.67);
pop();
kickPart.playbackRate = sliderKick.value();
snarePart.playbackRate = sliderSnare.value();
sliderKick.value(map(flex1, 0, 250, 1, 6));
sliderSnare.value(map(flex1, 0, 250, 1, 6));
sliderPiano.value(map(flex2, 0, 250, 1, 4));
sliderBass.value(map(flex2, 0, 250, 1, 4));
a = map(flex3, 0, 250, 0.1, 0.9);
if(pianoAnimation==true) {
animateEllipseG(pianoPulse);
}
if (sliderPiano.value() == 1) {
if (cChordPlaying == false) {
console.log("inside value 1");
pianoPart.removeAll();
pianoPart.add(0, cChord);
cChordPlaying = true;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 2) {
if (fChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, fChord);
cChordPlaying = false;
fChordPlaying = true;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 3) {
if (gChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, gChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = true;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 4) {
if (amChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, amChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = true;
}
}
if (sliderBass.value() == 1) {
if (cBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "C2");
cBassPlaying = true;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
}
} else if (sliderBass.value() == 2) {
if (fBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "F2");
cBassBassPlaying = false;
fBassBassPlaying = true;
gBassBassPlaying = false;
amBassBassPlaying = false;
}
} else if (sliderBass.value() == 3) {
if (gBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "G1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = true;
amBassPlaying = false;
}
} else if (sliderBass.value() == 4) {
if (amBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "A1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = true;
}
}
if (mouseX > width / 2 && mouseX < width &&
mouseY > 0 && mouseY < width) {
if (mouseIsPressed) {
for (i = 0; i < 25; i++) {
noStroke();
fill(255, 100 + i * 3, 100 + i * 5, 255 / i);
ellipse(mouseX, mouseY, i, i);
}
}
fill(0, 2);
rect(width / 2, 0, width / 2, height);
if (keyIsPressed) {
fill(0);
rect(width / 2, 0, width / 2, height);
leadPaint.triggerRelease();
}
}
}
function animateEllipseG(pianoPulse) {
console.log("inside chordAnimation");
if (sliderPiano.value() == 1) {
var coord = ellipseCoord.c;
console.log(coord);
var index = 0;
if(pianoPulse >0 && pianoPulse < 0.3){
index =0;
}else if(pianoPulse >0.3 && pianoPulse < 0.6){
index = 2;
}else if(pianoPulse > 0.6){
index = 4;
}
push();
translate(width/4,0)
point(0,0)
fill(0, 50)
rect(0,0,width/4,height/2)
fill(124,225,0, 200);
noStroke();
ellipse(coord[index], coord[index + 1], 30, 30);
pop();
}
}
function animateEllipse(pianoPulse) {
console.log("inside chordAnimation");
if (sliderPiano.value() == 1) {
var coord = ellipseCoord.c;
console.log(coord);
var index = 0;
if(pianoPulse >0 && pianoPulse < 0.3){
index =0;
}else if(pianoPulse >0.3 && pianoPulse < 0.6){
index = 2;
}else if(pianoPulse > 0.6){
index = 4;
}
push();
translate(width/4,0)
point(0,0)
fill(0, 50)
rect(0,0,width/4,height/2)
fill(124,225,0, 200);
noStroke();
ellipse(coord[index], coord[index + 1], 30, 30);
pop();
}
}
function mouseDragged() {
var paintNote = ["C4", "E4", "G4", "A4", "C5", "E5", "G5", "A5", "C6"]
if (mouseX > width / 2 && mouseX < width &&
mouseY > 0 && mouseY < height) {
if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[0], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width / 2 && mouseX < width * 5 / 8 &&
mouseY < height / 2 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 5 / 8 && mouseX < width * 3 / 4 &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 3 / 4 && mouseX < width * 7 / 8 &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height && mouseY > height * 3 / 4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height * 3 / 4 && mouseY > height / 2) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height / 2 && mouseY > height / 4) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width * 7 / 8 && mouseX < width &&
mouseY < height / 4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[6], "8n");
}
}
}
function mousePressed() {
if (mouseX > 0 && mouseX < width / 4 &&
mouseY > 0 && mouseY < height / 2) {
loopKick();
} else if (mouseX > width / 4 && mouseX < width / 2 &&
mouseY > 0 && mouseY < height / 2) {
loopPiano();
pianoAnimation=true;
} else if (mouseX > 0 && mouseX < width / 4 &&
mouseY > height / 2 && mouseY < height) {
loopSnare();
} else if (mouseX > width / 4 && mouseX < width / 2 &&
mouseY > height / 2 && mouseY < height) {
loopBass();
}
}
function loopKick() {
if (!kickOn) {
kickPart.start(0);
kickOn = !kickOn;
} else {
kickPart.stop();
kickOn = !kickOn;
}
}
function loopSnare() {
if (!snareOn) {
snarePart.start(0);
snarePart.loop = true;
snareOn = !snareOn;
} else {
snarePart.loop = false;
snareOn = !snareOn;
}
}
function loopPiano() {
if (!pianoOn) {
pianoPart.start(0);
pianoPart.loop = true;
pianoOn = !pianoOn;
} else {
pianoPart.loop = false;
pianoOn = !pianoOn;
}
}
function loopBass() {
if (!bassOn) {
bassPart.start(0);
bassPart.loop = true;
bassOn = !bassOn;
} else {
bassPart.loop = false;
bassOn = !bassOn;
}
}
for (var i = 0; i < portList.length; i++) {
}
}
var myArray = split(trimmedString, ",")
flex1 = Number(myArray[0]);
flex2 = Number(myArray[1]);
flex3 = Number(myArray[2]);
}
}kickOn = false;
snareOn = false;
pianoOn = false;
bassOn = false;
var a;
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
var flex1 = 0,flex2 = 0,flex3=0;
var kick = new Tone.MembraneSynth({
"envelope" : {
"sustain" : 0,
"attack" : 0.02,
"decay" : 0.8
},
"octaves" : 10
}).toMaster();
var kickPart = new Tone.Loop(function(time){
kick.triggerAttack("C2");
}, "2n");
var snareFilter = new Tone.AutoFilter({
frequency  : 1 ,
type  : "sine" ,
depth  : 1 ,
baseFrequency  : 400 ,
octaves  : 2.6 ,
filter  : {
type  : "bandpass" ,
rolloff  : -12 ,
Q  : 1
}}).toMaster();
var snare = new Tone.MetalSynth({
volume : -10,
frequency  : 200 ,
envelope  : {
attack  : 0.001 ,
decay  : 1.4 ,
release  : 0.2
}  ,
harmonicity  : 5.1 ,
modulationIndex  : 32 ,
resonance  : 4000 ,
octaves  : 1.5		
}).connect(snareFilter);
var snarePart = new Tone.Sequence(function(time, freq){
snare.frequency.setValueAtTime(freq, time, Math.random()*0.5 + 0.5);
snare.triggerAttack(time);
}, [null, 200, null, 200], "1n");
var pianoDelay = new Tone.PingPongDelay({
"delayTime"  : "4t" ,
"maxDelayTime"  : 2,
"wet" : .3,
"feedback" : .1
}).toMaster();
var piano = new Tone.MonoSynth(4, Tone.Synth, {
"volume" : -7,
"oscillator" : {
"partials" : [1, 2, 1],
},
"envelope"  : {
"attack"  : 0.001 ,
"decay"  : 0.1 ,
"sustain"  : 0.3 ,
"release"  : 1
},
"portamento" : 0.001
}).connect(pianoDelay);
var cChord = ["C4", ["E4", "G4"]];
var gChord = [["B3", "D4"], "G4"];
var amChord = [["C4", "E4"], "A4"];
var fChord = [["C4"], "F4", ["A4"]];
var cChord = ["C4", "E4", "G4"];
var gChord = ["B3", "D4", "G4"];
var amChord = ["C4", "E4", "A4"];
var fChord = ["C4", "F4", "A4"];
var pianoPart = new Tone.Sequence(function(time, note){
piano.triggerAttackRelease(note, "16n", time);
}, [cChord]);
var fft = new Tone.FFT(32);
var spectrum = new Tone.Waveform(1024);
var bassDist = new Tone.Distortion(
{
"distortion"  : 0.4 ,
"oversample"  : '2x'
}).connect(spectrum).toMaster();
var bass = new Tone.MonoSynth({
"volume" : -10,
"envelope" : {
"attack" : 0.1,
"decay" : 0.3,
"release" : 2,
},
"filterEnvelope" : {
"attack" : 0.001,
"decay" : 0.01,
"sustain" : 0.5,
"baseFrequency" : 200,
"octaves" : 2.6
}
}).connect(bassDist);
var bassPart = new Tone.Sequence(function(time, note){
bass.triggerAttackRelease(note, "16n", time);
}, ["C2"]);
var leadDelay = new Tone.PingPongDelay({
"delayTime" : "8n", 
"maxDelayTime"  : 1,
"feedback" : a,
"wet" : .40
}).toMaster();
var leadPaint = new Tone.PolySynth({
"volume" : -20,
"oscillator" : {
"type" : "square"
},
"envelope" : {
"attack" : 0.2
},
"portamento" : 0.05
}).connect(leadDelay);
Tone.Transport.bpm.value = 60;
Tone.Transport.start();
var time=0;
var scaleValue = 1;
function setup() { 
createCanvas(windowWidth, windowWidth/2);
background(0);
sliderKick = createSlider(1,6,2);
sliderKick.position(5, height+20);
sliderKick.size(width/4-10, 10);
sliderBass = createSlider(1,4,1);
sliderBass.position(width/4+5, height+40);
sliderBass.size(width/4-10, 10);
sliderPiano = createSlider(1,4,1);
sliderPiano.position(width/4+5, height+20);
sliderPiano.size(width/4-10, 10);
sliderSnare = createSlider(1,6,2);
sliderSnare.position(5, height+40);
sliderSnare.size(width/4-10, 10);
}
function draw() {
var kickPulse = kickPart.progress;
var snarePulse = snarePart.progress;
var pianoPulse = pianoPart.progress;
var bassPulse = bassPart.progress;
var loopstate = pianoPart.state;
var pp = map(pianoPulse,0,1,1,1.5);
var pt = map(pianoPulse,0,1,1,1.2);
var pg = map(pianoPulse,0,1,1,0.5);
var pf = map(pianoPulse,0,1,1,0.2);
var pp = floor(map(pianoPulse,0,1,1,3));
if(pp == 1 && pianoOn){
time++;
}else if(pp == 2 || !pianoOn){
time=0
}
if(time <= 15 && pianoOn){
scaleValue++;
}else if(time >= 15 && pianoOn){
scaleValue--;
}
if(!pianoOn){
scaleValue = 1
}
kickSwellOuter = map(kickPulse, 0, 1, 0, 5);
kickSwellMiddle = map(kickPulse, 0, 1, 0, 15);
kickSwellInner = map(kickPulse, 0, 1, 0, 40);
alphaOuter = map(kickSwellOuter, 0, 5, 50, 20);
alphaMiddle = map(kickSwellMiddle, 0, 20, 90, 30);
var wave = spectrum.getValue();
var fftwave = fft.getValue();
noStroke();
fill(0);
rect(0, 0, width/2, height);
push();
translate(0,0);
noFill();
ellipseMode(CENTER);
stroke(135, 206, 250, alphaOuter);
strokeWeight(2);
ellipse(width/8, height/4, width/4-25+(kickSwellOuter*-1), height/2-25+(kickSwellOuter*-1));
stroke(135, 206, 250, alphaMiddle);
strokeWeight(2);
ellipse(width/8, height/4, width/4-50+(kickSwellMiddle*-1), height/2-50+(kickSwellMiddle*-1));
stroke(135, 206, 250);
strokeWeight(2);
ellipse(width/8, height/4, width/4-80+(kickSwellInner*-1), height/2-80+(kickSwellInner*-1));
pop();
beginShape();
push();
translate(width*3/8, height*3/4);
beginShape();
noFill();
strokeWeight(2);
rectMode(CENTER)
for (var i = 0; i< wave.length; i+=600){
var b = map( wave[i], -1, 1, -40, 40);
rect(0, 0, width/4-70+b, height/2-70+b);
}
pop();
endShape();
push();
translate(width*3/8, height/4+61/3);
scale(pp);
stroke(255);
point(0,0)
noFill();
strokeWeight(1);
triangle(-70,40.67,0,-81.35,70,40.67);
pop();
push();
translate(width*3/8, height/4+61/3);
scale(pt);
stroke(255);
point(0,0)
noFill();
strokeWeight(1);
triangle(-70,40.67,0,-81.35,70,40.67);
pop();
push();
translate(width*3/8, height/4+61/3);
scale(pg);
stroke(255);
point(0,0)
noFill();
strokeWeight(1);
triangle(-70,40.67,0,-81.35,70,40.67);
pop();
push();
translate(width*3/8, height/4+61/3);
scale(pf);
stroke(255);
point(0,0)
noFill();
strokeWeight(1);
triangle(-70,40.67,0,-81.35,70,40.67);
pop();
push();
translate(0, height/2);
scale(0.25, 0.5);
for (var x=0; x < width; x++) {
var noiseVal = noise(snarePulse*x, snarePulse);
stroke(0, noiseVal*255, noiseVal*255);
line(x, noiseVal, x, height);
}
pop();
kickPart.playbackRate = sliderKick.value();
snarePart.playbackRate = sliderSnare.value();  
sliderKick.value(map(flex1, 0, 250, 1, 6));
sliderSnare.value(map(flex1, 0, 250, 1, 6));
sliderPiano.value(map(flex2 ,0, 250, 1, 4));
sliderBass.value(map(flex2 ,0, 250, 1, 4));
a = map(flex3,0,250,0.1,0.9);
if (sliderPiano.value() == 1) {
if (cChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, cChord);
cChordPlaying = true;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 2) {
if (fChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, fChord);
cChordPlaying = false;
fChordPlaying = true;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 3) {
if (gChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, gChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = true;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 4) {
if (amChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, amChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = true;
}
}
if (sliderBass.value() == 1) {
if (cBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "C2");
cBassPlaying = true;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
}
} else if (sliderBass.value() == 2) {
if (fBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "F2");
cBassBassPlaying = false;
fBassBassPlaying = true;
gBassBassPlaying = false;
amBassBassPlaying = false;
}
} else if (sliderBass.value() == 3) {
if (gBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "G1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = true;
amBassPlaying = false;
}
} else if (sliderBass.value() == 4) {
if (amBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "A1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = true;
}
}
if (mouseX > 0 && mouseX < width/4 && 
mouseY > 0 && mouseY < height/2) {
fill(100, 100, 220, 128);
rect(0, 0, width/4, height/2)
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > 0 && mouseY < height/2) {
fill(100, 100, 220, 128);
rect(width/4, 0, width/4, height/2);
} else if (mouseX > 0 && mouseX < width/4 && 
mouseY > height/2 && mouseY < height) {
fill(100, 100, 220, 128);
rect(0, height/2, width/4, height/2)
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > height/2 && mouseY < height) {
fill(100, 100, 220, 128);
rect(width/4, height/2, width/4, height/2);
}
if (mouseX > width/2 && mouseX < width &&
mouseY > 0 && mouseY < width) {
if (mouseIsPressed) {
for (i=0; i<25; i++) {
noStroke();
fill(255, 100+i*3, 100+i*5, 255/i);
ellipse(mouseX, mouseY, i, i);
}
}
fill(0, 2);
rect(width/2, 0, width/2, height);
if (keyIsPressed) {
fill(0);
rect(width/2, 0, width/2, height);
leadPaint.triggerRelease();
}
}
}
function mouseDragged() {
var paintNote = ["C4", "E4", "G4", "A4", "C5", "E5", "G5", "A5", "C6"]
if (mouseX > width/2 && mouseX < width && 
mouseY > 0 && mouseY < height) {
if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[0], "8n");
} else if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height/2 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height/4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height/4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height/4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[6], "8n");          
}
}
}    
function mousePressed() {
if (mouseX > 0 && mouseX < width/4 && 
mouseY > 0 && mouseY < height/2) {
loopKick();	
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > 0 && mouseY < height/2) {
loopPiano();
} else if (mouseX > 0 && mouseX < width/4 && 
mouseY > height/2 && mouseY < height) {
loopSnare();
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > height/2 && mouseY < height) {
loopBass();
} 
}
function loopKick() {
if (!kickOn) {
kickPart.start(0);
kickOn = !kickOn;
} else {
kickPart.stop();
kickOn = !kickOn;
}
}
function loopSnare() {
if (!snareOn) {
snarePart.start(0);
snarePart.loop = true;
snareOn = !snareOn;
} else {
snarePart.loop = false;
snareOn = !snareOn;
}
}
function loopPiano() {
if (!pianoOn) {
pianoPart.start(0);
pianoPart.loop = true;
pianoOn = !pianoOn;
} else {
pianoPart.loop = false;
pianoOn = !pianoOn;
}
}
function loopBass() {
if (!bassOn) {
bassPart.start(0);
bassPart.loop = true;
bassOn = !bassOn;
} else {
bassPart.loop = false;
bassOn = !bassOn;
}
}
for (var i = 0; i < portList.length; i++) {
}
}
var myArray = split(trimmedString, ",")      
flex1 = Number(myArray[0]);             
flex2 = Number(myArray[1]);
flex3 = Number(myArray[2]);
}
}
kickOn = false;
snareOn = false;
pianoOn = false;
bassOn = false;
var a;
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
var flex1 = 0,flex2 = 0;
var kick = new Tone.MembraneSynth({
"envelope" : {
"sustain" : 0,
"attack" : 0.02,
"decay" : 0.8
},
"octaves" : 10
}).toMaster();
var kickPart = new Tone.Loop(function(time){
kick.triggerAttack("C2");
}, "2n");
var snareFilter = new Tone.AutoFilter({
frequency  : 1 ,
type  : "sine" ,
depth  : 1 ,
baseFrequency  : 400 ,
octaves  : 2.6 ,
filter  : {
type  : "bandpass" ,
rolloff  : -12 ,
Q  : 1
}}).toMaster();
var snare = new Tone.MetalSynth({
volume : -10,
frequency  : 200 ,
envelope  : {
attack  : 0.001 ,
decay  : 1.4 ,
release  : 0.2
}  ,
harmonicity  : 5.1 ,
modulationIndex  : 32 ,
resonance  : 4000 ,
octaves  : 1.5		
}).connect(snareFilter);
var snarePart = new Tone.Sequence(function(time, freq){
snare.frequency.setValueAtTime(freq, time, Math.random()*0.5 + 0.5);
snare.triggerAttack(time);
}, [null, 200, null, 200], "1n");
var pianoDelay = new Tone.PingPongDelay({
"delayTime"  : "4t" ,
"maxDelayTime"  : 2,
"wet" : .3,
"feedback" : .1
}).toMaster();
var piano = new Tone.MonoSynth(4, Tone.Synth, {
"volume" : -7,
"oscillator" : {
"partials" : [1, 2, 1],
},
"envelope"  : {
"attack"  : 0.001 ,
"decay"  : 0.1 ,
"sustain"  : 0.3 ,
"release"  : 1
},
"portamento" : 0.001
}).connect(pianoDelay);
var cChord = ["C4", ["E4", "G4"]];
var gChord = [["B3", "D4"], "G4"];
var amChord = [["C4", "E4"], "A4"];
var fChord = [["C4"], "F4", ["A4"]];
var cChord = ["C4", "E4", "G4"];
var gChord = ["B3", "D4", "G4"];
var amChord = ["C4", "E4", "A4"];
var fChord = ["C4", "F4", "A4"];
var pianoPart = new Tone.Sequence(function(time, note){
piano.triggerAttackRelease(note, "16n", time);
}, [cChord]);
var fft = new Tone.FFT(32);
var spectrum = new Tone.Waveform(1024);
var bassDist = new Tone.Distortion(
{
"distortion"  : 0.4 ,
"oversample"  : '2x'
}).connect(spectrum).toMaster();
var bass = new Tone.MonoSynth({
"volume" : -10,
"envelope" : {
"attack" : 0.1,
"decay" : 0.3,
"release" : 2,
},
"filterEnvelope" : {
"attack" : 0.001,
"decay" : 0.01,
"sustain" : 0.5,
"baseFrequency" : 200,
"octaves" : 2.6
}
}).connect(bassDist);
var bassPart = new Tone.Sequence(function(time, note){
bass.triggerAttackRelease(note, "16n", time);
}, ["C2"]);
var leadDelay = new Tone.PingPongDelay({
"delayTime" : "8n", 
"maxDelayTime"  : 1,
"feedback" : 0.82,
"wet" : .40
}).toMaster();
var leadPaint = new Tone.PolySynth({
"volume" : -20,
"oscillator" : {
"type" : "square"
},
"envelope" : {
"attack" : 0.2
},
"portamento" : 0.05
}).connect(leadDelay);
Tone.Transport.bpm.value = 60;
Tone.Transport.start();
var time=0;
var scaleValue = 1;
function setup() { 
createCanvas(windowWidth, windowWidth/2);
background(0);
sliderKick = createSlider(1,6,2);
sliderKick.position(5, height+20);
sliderKick.size(width/4-10, 10);
sliderBass = createSlider(1,4,1);
sliderBass.position(width/4+5, height+40);
sliderBass.size(width/4-10, 10);
sliderPiano = createSlider(1,4,1);
sliderPiano.position(width/4+5, height+20);
sliderPiano.size(width/4-10, 10);
sliderSnare = createSlider(1,6,2);
sliderSnare.position(5, height+40);
sliderSnare.size(width/4-10, 10);  
}
function draw() {
var kickPulse = kickPart.progress;
var snarePulse = snarePart.progress;
var pianoPulse = pianoPart.progress;
var bassPulse = bassPart.progress;
var loopstate = pianoPart.state;
var pp = map(pianoPulse,0,1,1,1.5);
var pt = map(pianoPulse,0,1,1,1.2);
var pg = map(pianoPulse,0,1,1,0.5);
var pf = map(pianoPulse,0,1,1,0.2);
var pp = floor(map(pianoPulse,0,1,1,3));
if(pp == 1 && pianoOn){
time++;
}else if(pp == 2 || !pianoOn){
time=0
}
if(time <= 15 && pianoOn){
scaleValue++;
}else if(time >= 15 && pianoOn){
scaleValue--;
}
if(!pianoOn){
scaleValue = 1
}
kickSwellOuter = map(kickPulse, 0, 1, 0, 5);
kickSwellMiddle = map(kickPulse, 0, 1, 0, 15);
kickSwellInner = map(kickPulse, 0, 1, 0, 40);
alphaOuter = map(kickSwellOuter, 0, 5, 50, 20);
alphaMiddle = map(kickSwellMiddle, 0, 20, 90, 30);
var wave = spectrum.getValue();
var fftwave = fft.getValue();
noStroke();
fill(0);
rect(0, 0, width/2, height);
push();
translate(0,0);
noFill();
ellipseMode(CENTER);
stroke(135, 206, 250, alphaOuter);
strokeWeight(2);
ellipse(width/8, height/4, width/4-25+(kickSwellOuter*-1), height/2-25+(kickSwellOuter*-1));
stroke(135, 206, 250, alphaMiddle);
strokeWeight(2);
ellipse(width/8, height/4, width/4-50+(kickSwellMiddle*-1), height/2-50+(kickSwellMiddle*-1));
stroke(135, 206, 250);
strokeWeight(2);
ellipse(width/8, height/4, width/4-80+(kickSwellInner*-1), height/2-80+(kickSwellInner*-1));
pop();
beginShape();
push();
translate(width*3/8, height*3/4);
beginShape();
noFill();
strokeWeight(2);
rectMode(CENTER)
for (var i = 0; i< wave.length; i+=600){
var b = map( wave[i], -1, 1, -40, 40);
rect(0, 0, width/4-70+b, height/2-70+b);
}
pop();
endShape();
push();
translate(width*3/8, height/4+61/3);
scale(pp);
stroke(255);
point(0,0)
noFill();
strokeWeight(1);
triangle(-70,40.67,0,-81.35,70,40.67);
pop();
push();
translate(width*3/8, height/4+61/3);
scale(pt);
stroke(255);
point(0,0)
noFill();
strokeWeight(1);
triangle(-70,40.67,0,-81.35,70,40.67);
pop();
push();
translate(width*3/8, height/4+61/3);
scale(pg);
stroke(255);
point(0,0)
noFill();
strokeWeight(1);
triangle(-70,40.67,0,-81.35,70,40.67);
pop();
push();
translate(width*3/8, height/4+61/3);
scale(pf);
stroke(255);
point(0,0)
noFill();
strokeWeight(1);
triangle(-70,40.67,0,-81.35,70,40.67);
pop();
push();
translate(0, height/2);
scale(0.25, 0.5);
for (var x=0; x < width; x++) {
var noiseVal = noise(snarePulse*x, snarePulse);
stroke(0, noiseVal*255, noiseVal*255);
line(x, noiseVal, x, height);
}
pop();
kickPart.playbackRate = sliderKick.value();
snarePart.playbackRate = sliderSnare.value();  
sliderKick.value(map(flex1, 0, 250, 1, 6));
sliderSnare.value(map(flex1, 0, 250, 1, 6));
sliderPiano.value(map(flex2 ,0, 250, 1, 4));
sliderBass.value(map(flex2 ,0, 250, 1, 4));
if (sliderPiano.value() == 1) {
if (cChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, cChord);
cChordPlaying = true;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 2) {
if (fChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, fChord);
cChordPlaying = false;
fChordPlaying = true;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 3) {
if (gChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, gChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = true;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 4) {
if (amChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, amChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = true;
}
}
if (sliderBass.value() == 1) {
if (cBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "C2");
cBassPlaying = true;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
}
} else if (sliderBass.value() == 2) {
if (fBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "F2");
cBassBassPlaying = false;
fBassBassPlaying = true;
gBassBassPlaying = false;
amBassBassPlaying = false;
}
} else if (sliderBass.value() == 3) {
if (gBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "G1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = true;
amBassPlaying = false;
}
} else if (sliderBass.value() == 4) {
if (amBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "A1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = true;
}
}
if (mouseX > 0 && mouseX < width/4 && 
mouseY > 0 && mouseY < height/2) {
fill(100, 100, 220, 128);
rect(0, 0, width/4, height/2)
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > 0 && mouseY < height/2) {
fill(100, 100, 220, 128);
rect(width/4, 0, width/4, height/2);
} else if (mouseX > 0 && mouseX < width/4 && 
mouseY > height/2 && mouseY < height) {
fill(100, 100, 220, 128);
rect(0, height/2, width/4, height/2)
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > height/2 && mouseY < height) {
fill(100, 100, 220, 128);
rect(width/4, height/2, width/4, height/2);
}
if (mouseX > width/2 && mouseX < width &&
mouseY > 0 && mouseY < width) {
if (mouseIsPressed) {
for (i=0; i<25; i++) {
noStroke();
fill(255, 100+i*3, 100+i*5, 255/i);
ellipse(mouseX, mouseY, i, i);
}
}
fill(0, 2);
rect(width/2, 0, width/2, height);
if (keyIsPressed) {
fill(0);
rect(width/2, 0, width/2, height);
leadPaint.triggerRelease();
}
}
}
function mouseDragged() {
var paintNote = ["C4", "E4", "G4", "A4", "C5", "E5", "G5", "A5", "C6"]
if (mouseX > width/2 && mouseX < width && 
mouseY > 0 && mouseY < height) {
if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[0], "8n");
} else if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height/2 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height/4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height/4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height/4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[6], "8n");          
}
}
}    
function mousePressed() {
if (mouseX > 0 && mouseX < width/4 && 
mouseY > 0 && mouseY < height/2) {
loopKick();	
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > 0 && mouseY < height/2) {
loopPiano();
} else if (mouseX > 0 && mouseX < width/4 && 
mouseY > height/2 && mouseY < height) {
loopSnare();
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > height/2 && mouseY < height) {
loopBass();
} 
}
function loopKick() {
if (!kickOn) {
kickPart.start(0);
kickOn = !kickOn;
} else {
kickPart.stop();
kickOn = !kickOn;
}
}
function loopSnare() {
if (!snareOn) {
snarePart.start(0);
snarePart.loop = true;
snareOn = !snareOn;
} else {
snarePart.loop = false;
snareOn = !snareOn;
}
}
function loopPiano() {
if (!pianoOn) {
pianoPart.start(0);
pianoPart.loop = true;
pianoOn = !pianoOn;
} else {
pianoPart.loop = false;
pianoOn = !pianoOn;
}
}
function loopBass() {
if (!bassOn) {
bassPart.start(0);
bassPart.loop = true;
bassOn = !bassOn;
} else {
bassPart.loop = false;
bassOn = !bassOn;
}
}
for (var i = 0; i < portList.length; i++) {
}
}
var myArray = split(trimmedString, ",")      
flex1 = Number(myArray[0]);             
flex2 = Number(myArray[1]); 	
}
}
kickOn = false;
snareOn = false;
pianoOn = false;
bassOn = false;
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
var flex1 = 0,flex2 = 0;
var kick = new Tone.MembraneSynth({
"envelope" : {
"sustain" : 0,
"attack" : 0.02,
"decay" : 0.8
},
"octaves" : 10
}).toMaster();
var kickPart = new Tone.Loop(function(time){
kick.triggerAttack("C2");
}, "2n");
var snareFilter = new Tone.AutoFilter({
frequency  : 1 ,
type  : "sine" ,
depth  : 1 ,
baseFrequency  : 400 ,
octaves  : 2.6 ,
filter  : {
type  : "bandpass" ,
rolloff  : -12 ,
Q  : 1
}}).toMaster();
var snare = new Tone.MetalSynth({
volume : -10,
frequency  : 200 ,
envelope  : {
attack  : 0.001 ,
decay  : 1.4 ,
release  : 0.2
}  ,
harmonicity  : 5.1 ,
modulationIndex  : 32 ,
resonance  : 4000 ,
octaves  : 1.5		
}).connect(snareFilter);
var snarePart = new Tone.Sequence(function(time, freq){
snare.frequency.setValueAtTime(freq, time, Math.random()*0.5 + 0.5);
snare.triggerAttack(time);
}, [null, 200, null, 200], "1n");
var pianoDelay = new Tone.PingPongDelay({
"delayTime"  : "4t" ,
"maxDelayTime"  : 2,
"wet" : .3,
"feedback" : .1
}).toMaster();
var piano = new Tone.MonoSynth(4, Tone.Synth, {
"volume" : -7,
"oscillator" : {
"partials" : [1, 2, 1],
},
"envelope"  : {
"attack"  : 0.001 ,
"decay"  : 0.1 ,
"sustain"  : 0.3 ,
"release"  : 1
},
"portamento" : 0.001
}).connect(pianoDelay);
var cChord = ["C4", ["E4", "G4"]];
var gChord = [["B3", "D4"], "G4"];
var amChord = [["C4", "E4"], "A4"];
var fChord = [["C4"], "F4", ["A4"]];
var cChord = ["C4", "E4", "G4"];
var gChord = ["B3", "D4", "G4"];
var amChord = ["C4", "E4", "A4"];
var fChord = ["C4", "F4", "A4"];
var pianoPart = new Tone.Sequence(function(time, note){
piano.triggerAttackRelease(note, "16n", time);
}, [cChord]);
var fft = new Tone.FFT(32);
var spectrum = new Tone.Waveform(1024);
var bassDist = new Tone.Distortion(
{
"distortion"  : 0.4 ,
"oversample"  : '2x'
}).connect(spectrum).toMaster();
var bass = new Tone.MonoSynth({
"volume" : -10,
"envelope" : {
"attack" : 0.1,
"decay" : 0.3,
"release" : 2,
},
"filterEnvelope" : {
"attack" : 0.001,
"decay" : 0.01,
"sustain" : 0.5,
"baseFrequency" : 200,
"octaves" : 2.6
}
}).connect(bassDist);
var bassPart = new Tone.Sequence(function(time, note){
bass.triggerAttackRelease(note, "16n", time);
}, ["C2"]);
var leadDelay = new Tone.PingPongDelay({
"delayTime" : "8n", 
"maxDelayTime"  : 1,
"feedback" : 0.82,
"wet" : .40
}).toMaster();
var leadPaint = new Tone.PolySynth({
"volume" : -20,
"oscillator" : {
"type" : "square"
},
"envelope" : {
"attack" : 0.2
},
"portamento" : 0.05
}).connect(leadDelay);
Tone.Transport.bpm.value = 60;
Tone.Transport.start();
var time=0;
var scaleValue = 1;
function setup() { 
createCanvas(windowWidth, windowWidth/2);
background(0);
sliderKick = createSlider(1,6,2);
sliderKick.position(5, height+20);
sliderKick.size(width/4-10, 10);
sliderBass = createSlider(1,4,1);
sliderBass.position(width/4+5, height+40);
sliderBass.size(width/4-10, 10);
sliderPiano = createSlider(1,4,1);
sliderPiano.position(width/4+5, height+20);
sliderPiano.size(width/4-10, 10);
sliderSnare = createSlider(1,6,2);
sliderSnare.position(5, height+40);
sliderSnare.size(width/4-10, 10);  
}
function draw() {
var kickPulse = kickPart.progress;
var snarePulse = snarePart.progress;
var pianoPulse = pianoPart.progress;
var bassPulse = bassPart.progress;
var loopstate = pianoPart.state;
var pp = map(pianoPulse,0,1,1,1.5);
var pt = map(pianoPulse,0,1,1,1.2);
var pg = map(pianoPulse,0,1,1,0.5);
var pf = map(pianoPulse,0,1,1,0.2);
var pp = floor(map(pianoPulse,0,1,1,3));
if(pp == 1 && pianoOn){
time++;
}else if(pp == 2 || !pianoOn){
time=0
}
if(time <= 15 && pianoOn){
scaleValue++;
}else if(time >= 15 && pianoOn){
scaleValue--;
}
if(!pianoOn){
scaleValue = 1
}
kickSwellOuter = map(kickPulse, 0, 1, 0, 5);
kickSwellMiddle = map(kickPulse, 0, 1, 0, 15);
kickSwellInner = map(kickPulse, 0, 1, 0, 40);
alphaOuter = map(kickSwellOuter, 0, 5, 50, 20);
alphaMiddle = map(kickSwellMiddle, 0, 20, 90, 30);
var wave = spectrum.getValue();
var fftwave = fft.getValue();
noStroke();
fill(0);
rect(0, 0, width/2, height);
push();
translate(0,0);
noFill();
ellipseMode(CENTER);
stroke(135, 206, 250, alphaOuter);
strokeWeight(2);
ellipse(width/8, height/4, width/4-25+(kickSwellOuter*-1), height/2-25+(kickSwellOuter*-1));
stroke(135, 206, 250, alphaMiddle);
strokeWeight(2);
ellipse(width/8, height/4, width/4-50+(kickSwellMiddle*-1), height/2-50+(kickSwellMiddle*-1));
stroke(135, 206, 250);
strokeWeight(2);
ellipse(width/8, height/4, width/4-80+(kickSwellInner*-1), height/2-80+(kickSwellInner*-1));
pop();
beginShape();
push();
translate(width*3/8, height*3/4);
beginShape();
noFill();
strokeWeight(2);
rectMode(CENTER)
for (var i = 0; i< wave.length; i+=600){
var b = map( wave[i], -1, 1, -40, 40);
rect(0, 0, width/4-70+b, height/2-70+b);
}
pop();
endShape();
push();
translate(width*3/8, height/4+61/3);
scale(pp);
stroke(255);
point(0,0)
noFill();
strokeWeight(1);
triangle(-70,40.67,0,-81.35,70,40.67);
pop();
push();
translate(width*3/8, height/4+61/3);
scale(pt);
stroke(255);
point(0,0)
noFill();
strokeWeight(1);
triangle(-70,40.67,0,-81.35,70,40.67);
pop();
push();
translate(width*3/8, height/4+61/3);
scale(pg);
stroke(255);
point(0,0)
noFill();
strokeWeight(1);
triangle(-70,40.67,0,-81.35,70,40.67);
pop();
push();
translate(width*3/8, height/4+61/3);
scale(pf);
stroke(255);
point(0,0)
noFill();
strokeWeight(1);
triangle(-70,40.67,0,-81.35,70,40.67);
pop();
push();
translate(0, height/2);
scale(0.25, 0.5);
for (var x=0; x < width; x++) {
var noiseVal = noise(snarePulse*x, snarePulse);
stroke(0, noiseVal*255, noiseVal*255);
line(x, noiseVal, x, height);
}
pop();
kickPart.playbackRate = sliderKick.value();
snarePart.playbackRate = sliderSnare.value();  
sliderKick.value(map(flex1, 0, 250, 1, 6));
sliderSnare.value(map(flex1, 0, 250, 1, 6));
sliderPiano.value(map(flex2 ,0, 250, 1, 4));
sliderBass.value(map(flex2 ,0, 250, 1, 4));
if (sliderPiano.value() == 1) {
if (cChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, cChord);
cChordPlaying = true;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 2) {
if (fChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, fChord);
cChordPlaying = false;
fChordPlaying = true;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 3) {
if (gChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, gChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = true;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 4) {
if (amChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, amChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = true;
}
}
if (sliderBass.value() == 1) {
if (cBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "C2");
cBassPlaying = true;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
}
} else if (sliderBass.value() == 2) {
if (fBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "F2");
cBassBassPlaying = false;
fBassBassPlaying = true;
gBassBassPlaying = false;
amBassBassPlaying = false;
}
} else if (sliderBass.value() == 3) {
if (gBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "G1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = true;
amBassPlaying = false;
}
} else if (sliderBass.value() == 4) {
if (amBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "A1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = true;
}
}
if (mouseX > 0 && mouseX < width/4 && 
mouseY > 0 && mouseY < height/2) {
fill(100, 100, 220, 128);
rect(0, 0, width/4, height/2)
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > 0 && mouseY < height/2) {
fill(100, 100, 220, 128);
rect(width/4, 0, width/4, height/2);
} else if (mouseX > 0 && mouseX < width/4 && 
mouseY > height/2 && mouseY < height) {
fill(100, 100, 220, 128);
rect(0, height/2, width/4, height/2)
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > height/2 && mouseY < height) {
fill(100, 100, 220, 128);
rect(width/4, height/2, width/4, height/2);
}
if (mouseX > width/2 && mouseX < width &&
mouseY > 0 && mouseY < width) {
if (mouseIsPressed) {
for (i=0; i<25; i++) {
noStroke();
fill(255, 100+i*3, 100+i*5, 255/i);
ellipse(mouseX, mouseY, i, i);
}
}
fill(0, 2);
rect(width/2, 0, width/2, height);
if (keyIsPressed) {
fill(0);
rect(width/2, 0, width/2, height);
leadPaint.triggerRelease();
}
}
}
function mouseDragged() {
var paintNote = ["C4", "E4", "G4", "A4", "C5", "E5", "G5", "A5", "C6"]
if (mouseX > width/2 && mouseX < width && 
mouseY > 0 && mouseY < height) {
if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[0], "8n");
} else if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height/2 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height/4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height/4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height/4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[6], "8n");          
}
}
}    
function mousePressed() {
if (mouseX > 0 && mouseX < width/4 && 
mouseY > 0 && mouseY < height/2) {
loopKick();	
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > 0 && mouseY < height/2) {
loopPiano();
} else if (mouseX > 0 && mouseX < width/4 && 
mouseY > height/2 && mouseY < height) {
loopSnare();
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > height/2 && mouseY < height) {
loopBass();
} 
}
function loopKick() {
if (!kickOn) {
kickPart.start(0);
kickOn = !kickOn;
} else {
kickPart.stop();
kickOn = !kickOn;
}
}
function loopSnare() {
if (!snareOn) {
snarePart.start(0);
snarePart.loop = true;
snareOn = !snareOn;
} else {
snarePart.loop = false;
snareOn = !snareOn;
}
}
function loopPiano() {
if (!pianoOn) {
pianoPart.start(0);
pianoPart.loop = true;
pianoOn = !pianoOn;
} else {
pianoPart.loop = false;
pianoOn = !pianoOn;
}
}
function loopBass() {
if (!bassOn) {
bassPart.start(0);
bassPart.loop = true;
bassOn = !bassOn;
} else {
bassPart.loop = false;
bassOn = !bassOn;
}
}
for (var i = 0; i < portList.length; i++) {
}
}
var myArray = split(trimmedString, ",")      
flex1 = Number(myArray[0]);             
flex2 = Number(myArray[1]); 	
}
}
kickOn = false;
snareOn = false;
pianoOn = false;
bassOn = false;
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
var kick = new Tone.MembraneSynth({
"envelope" : {
"sustain" : 0,
"attack" : 0.02,
"decay" : 0.8
},
"octaves" : 10
}).toMaster();
var kickPart = new Tone.Loop(function(time){
kick.triggerAttack("C2");
}, "2n");
var snareFilter = new Tone.AutoFilter({
frequency  : 1 ,
type  : "sine" ,
depth  : 1 ,
baseFrequency  : 400 ,
octaves  : 2.6 ,
filter  : {
type  : "bandpass" ,
rolloff  : -12 ,
Q  : 1
}}).toMaster();
var snare = new Tone.MetalSynth({
volume : -10,
frequency  : 200 ,
envelope  : {
attack  : 0.001 ,
decay  : 1.4 ,
release  : 0.2
}  ,
harmonicity  : 5.1 ,
modulationIndex  : 32 ,
resonance  : 4000 ,
octaves  : 1.5		
}).connect(snareFilter);
var snarePart = new Tone.Loop(function(time){
snare.triggerAttack("2n", .4);
}, "2n");
var meter = new Tone.Meter(0.8);
var pianoDelay = new Tone.PingPongDelay({
"delayTime"  : "4t" ,
"maxDelayTime"  : 2,
"wet" : .3,
"feedback" : .1
}).connect(meter).toMaster();
var piano = new Tone.MonoSynth(4, Tone.Synth, {
"volume" : -7,
"oscillator" : {
"partials" : [1, 2, 1],
},
"envelope"  : {
"attack"  : 0.001 ,
"decay"  : 0.1 ,
"sustain"  : 0.3 ,
"release"  : 1
},
"portamento" : 0.001
}).connect(pianoDelay);
var cChord = ["C4", ["E4", "G4"]];
var gChord = [["B3", "D4"], "G4"];
var amChord = [["C4", "E4"], "A4"];
var fChord = [["C4"], "F4", ["A4"]];
var cChord = ["C4", "E4", "G4"];
var gChord = ["B3", "D4", "G4"];
var amChord = ["C4", "E4", "A4"];
var fChord = ["C4", "F4", "A4"];
var pianoPart = new Tone.Sequence(function(time, note){
piano.triggerAttackRelease(note, "16n", time);
}, [cChord]);
var spectrum = new Tone.Waveform(1024);
var bassDist = new Tone.Distortion(
{
"distortion"  : 0.4 ,
"oversample"  : '2x'
}).connect(spectrum).toMaster();
var bass = new Tone.MonoSynth({
"volume" : -10,
"envelope" : {
"attack" : 0.1,
"decay" : 0.3,
"release" : 2,
},
"filterEnvelope" : {
"attack" : 0.001,
"decay" : 0.01,
"sustain" : 0.5,
"baseFrequency" : 200,
"octaves" : 2.6
}
}).connect(bassDist);
var bassPart = new Tone.Sequence(function(time, note){
bass.triggerAttackRelease(note, "16n", time);
}, ["C2"]);
var leadDelay = new Tone.PingPongDelay({
"delayTime" : "8n", 
"maxDelayTime"  : 1,
"feedback" : 0.82,
"wet" : .40
}).toMaster();
var leadPaint = new Tone.PolySynth({
"volume" : -20,
"oscillator" : {
"type" : "square"
},
"envelope" : {
"attack" : 0.2
},
"portamento" : 0.05
}).connect(leadDelay);
Tone.Transport.bpm.value = 60;
Tone.Transport.start();
function setup() { 
createCanvas(windowWidth, windowWidth/2);
background(0);
sliderKick = createSlider(1,6,2);
sliderKick.position(5, height+20);
sliderKick.size(width/4-10, 10);
sliderBass = createSlider(1,4,1);
sliderBass.position(width/4+5, height+40);
sliderBass.size(width/4-10, 10);
sliderPiano = createSlider(1,4,1);
sliderPiano.position(width/4+5, height+20);
sliderPiano.size(width/4-10, 10);
sliderSnare = createSlider(1,6,2);
sliderSnare.position(5, height+40);
sliderSnare.size(width/4-10, 10);  
}
function draw() {
var kickPulse = kickPart.progress;
var snarePulse = snarePart.progress;
var pianoPulse = pianoPart.progress;
var bassPulse = bassPart.progress;
var pp = map(pianoPulse,0,1,1,1.2);
kickSwellOuter = map(kickPulse, 0, 1, 0, 5);
kickSwellMiddle = map(kickPulse, 0, 1, 0, 15);
kickSwellInner = map(kickPulse, 0, 1, 0, 40);
alphaOuter = map(kickSwellOuter, 0, 5, 50, 20);
alphaMiddle = map(kickSwellMiddle, 0, 20, 90, 30);
var wave = spectrum.getValue();
noStroke();
fill(0);
rect(0, 0, width/2, height);
push();
translate(0,0);
noFill();
ellipseMode(CENTER);
stroke(135, 206, 250, alphaOuter);
strokeWeight(2);
ellipse(width/8, height/4, width/4-25+(kickSwellOuter*-1), height/2-25+(kickSwellOuter*-1));
stroke(135, 206, 250, alphaMiddle);
strokeWeight(2);
ellipse(width/8, height/4, width/4-50+(kickSwellMiddle*-1), height/2-50+(kickSwellMiddle*-1));
stroke(135, 206, 250);
strokeWeight(2);
ellipse(width/8, height/4, width/4-80+(kickSwellInner*-1), height/2-80+(kickSwellInner*-1));
pop();
beginShape();
push();
translate(width*3/8, height*3/4);
beginShape();
noFill();
strokeWeight(2);
rectMode(CENTER)
for (var i = 0; i< wave.length; i+=600){
var b = map( wave[i], -1, 1, -40, 40);
rect(0, 0, width/4-70+b, height/2-70+b);
}
pop();
endShape();
push();
translate(width*3/8, height/4+61/3);
scale(pp);
stroke(255);
point(0,0)
noFill();
strokeWeight(2);
triangle(-70,40.67,0,-81.35,70,40.67);
pop();
push();
translate(width*3/8, height/4+61/3);
scale(pp);
stroke(255);
point(0,0)
noFill();
strokeWeight(2);
triangle(-70,40.67,0,-81.35,70,40.67)
pop();
push();
translate(0, height/2);
scale(0.25, 0.5);
for (var x=0; x < width; x++) {
var noiseVal = noise(snarePulse*x, snarePulse);
stroke(0, noiseVal*255, noiseVal*255);
line(x, noiseVal, x, height);
}
pop();
kickPart.playbackRate = sliderKick.value();
snarePart.playbackRate = sliderSnare.value();  
if (sliderPiano.value() == 1) {
if (cChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, cChord);
cChordPlaying = true;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 2) {
if (fChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, fChord);
cChordPlaying = false;
fChordPlaying = true;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 3) {
if (gChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, gChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = true;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 4) {
if (amChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, amChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = true;
}
}
if (sliderBass.value() == 1) {
if (cBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "C2");
cBassPlaying = true;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
}
} else if (sliderBass.value() == 2) {
if (fBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "F2");
cBassBassPlaying = false;
fBassBassPlaying = true;
gBassBassPlaying = false;
amBassBassPlaying = false;
}
} else if (sliderBass.value() == 3) {
if (gBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "G1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = true;
amBassPlaying = false;
}
} else if (sliderBass.value() == 4) {
if (amBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "A1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = true;
}
}
if (mouseX > 0 && mouseX < width/4 && 
mouseY > 0 && mouseY < height/2) {
fill(100, 100, 220, 128);
rect(0, 0, width/4, height/2)
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > 0 && mouseY < height/2) {
fill(100, 100, 220, 128);
rect(width/4, 0, width/4, height/2);
} else if (mouseX > 0 && mouseX < width/4 && 
mouseY > height/2 && mouseY < height) {
fill(100, 100, 220, 128);
rect(0, height/2, width/4, height/2)
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > height/2 && mouseY < height) {
fill(100, 100, 220, 128);
rect(width/4, height/2, width/4, height/2);
}
if (mouseX > width/2 && mouseX < width &&
mouseY > 0 && mouseY < width) {
if (mouseIsPressed) {
for (i=0; i<25; i++) {
noStroke();
fill(255, 100+i*3, 100+i*5, 255/i);
ellipse(mouseX, mouseY, i, i);
}
}
fill(0, 2);
rect(width/2, 0, width/2, height);
if (keyIsPressed) {
fill(0);
rect(width/2, 0, width/2, height);
leadPaint.triggerRelease();
}
}
}
function mouseDragged() {
var paintNote = ["C4", "E4", "G4", "A4", "C5", "E5", "G5", "A5", "C6"]
if (mouseX > width/2 && mouseX < width && 
mouseY > 0 && mouseY < height) {
if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[0], "8n");
} else if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height/2 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height/4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height/4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height/4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[6], "8n");          
}
}
}    
function mousePressed() {
if (mouseX > 0 && mouseX < width/4 && 
mouseY > 0 && mouseY < height/2) {
loopKick();	
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > 0 && mouseY < height/2) {
loopPiano();
} else if (mouseX > 0 && mouseX < width/4 && 
mouseY > height/2 && mouseY < height) {
loopSnare();
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > height/2 && mouseY < height) {
loopBass();
} 
}
function loopKick() {
if (!kickOn) {
kickPart.start(0);
kickOn = !kickOn;
} else {
kickPart.stop();
kickOn = !kickOn;
}
}
function loopSnare() {
if (!snareOn) {
snarePart.start("4n");
snareOn = !snareOn;
} else {
snarePart.stop();
snareOn = !snareOn;
}
}
function loopPiano() {
if (!pianoOn) {
pianoPart.start(0);
pianoPart.loop = true;
pianoOn = !pianoOn;
} else {
pianoPart.loop = false;
pianoOn = !pianoOn;
}
}
function loopBass() {
if (!bassOn) {
bassPart.start(0);
bassPart.loop = true;
bassOn = !bassOn;
} else {
bassPart.loop = false;
bassOn = !bassOn;
}
}
var data, val;
kickOn = false;
snareOn = false;
pianoOn = false;
bassOn = false;
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
var kick = new Tone.MembraneSynth({
"envelope" : {
"sustain" : 0,
"attack" : 0.02,
"decay" : 0.8
},
"octaves" : 10
}).toMaster();
var kickPart = new Tone.Loop(function(time){
kick.triggerAttack("C2");
}, "2n");
var snareFilter = new Tone.AutoFilter({
frequency  : 1 ,
type  : "sine" ,
depth  : 1 ,
baseFrequency  : 400 ,
octaves  : 2.6 ,
filter  : {
type  : "bandpass" ,
rolloff  : -12 ,
Q  : 1
}}).toMaster();
var snare = new Tone.MetalSynth({
volume : -10,
frequency  : 200 ,
envelope  : {
attack  : 0.001 ,
decay  : 1.4 ,
release  : 0.2
}  ,
harmonicity  : 5.1 ,
modulationIndex  : 32 ,
resonance  : 4000 ,
octaves  : 1.5		
}).connect(snareFilter);
var snarePart = new Tone.Loop(function(time){
snare.triggerAttack("2n", .4);
}, "2n");
var pianoDelay = new Tone.PingPongDelay({
"delayTime"  : "4t" ,
"maxDelayTime"  : 2,
"wet" : .3,
"feedback" : .1
}).toMaster();
var piano = new Tone.MonoSynth(4, Tone.Synth, {
"volume" : -7,
"oscillator" : {
"partials" : [1, 2, 1],
},
"envelope"  : {
"attack"  : 0.001 ,
"decay"  : 0.1 ,
"sustain"  : 0.3 ,
"release"  : 1
},
"portamento" : 0.001
}).connect(pianoDelay);
var cChord = ["C4", ["E4", "G4"]];
var gChord = [["B3", "D4"], "G4"];
var amChord = [["C4", "E4"], "A4"];
var fChord = [["C4"], "F4", ["A4"]];
var cChord = ["C4", "E4", "G4"];
var gChord = ["B3", "D4", "G4"];
var amChord = ["C4", "E4", "A4"];
var fChord = ["C4", "F4", "A4"];
var pianoPart = new Tone.Sequence(function(time, note){
piano.triggerAttackRelease(note, "16n", time);
}, [cChord]);
var fft = new Tone.FFT(32);
var spectrum = new Tone.Waveform(32);
var bassDist = new Tone.Distortion(
{
"distortion"  : 0.4 ,
"oversample"  : '2x'
}).connect(spectrum).toMaster();
var bass = new Tone.MonoSynth({
"volume" : -10,
"envelope" : {
"attack" : 0.1,
"decay" : 0.3,
"release" : 2,
},
"filterEnvelope" : {
"attack" : 0.001,
"decay" : 0.01,
"sustain" : 0.5,
"baseFrequency" : 200,
"octaves" : 2.6
}
}).connect(bassDist);
var bassPart = new Tone.Sequence(function(time, note){
bass.triggerAttackRelease(note, "16n", time);
}, ["C2"]);
var leadDelay = new Tone.PingPongDelay({
"delayTime" : "2n", 
"maxDelayTime"  : 1,
"feedback" : 0.82,
"wet" : .40
}).toMaster();
var leadPaint = new Tone.MonoSynth({
"volume" : -20,
"oscillator" : {
"type" : "square"
},
"envelope" : {
"attack" : 0.2
},
"portamento" : 0.05
}).connect(leadDelay);
Tone.Transport.bpm.value = 60;
Tone.Transport.start();
function setup() { 
createCanvas(windowWidth, windowWidth/2);
background(0);
function serverConnected() {
}
function portOpen() {
}
var val = floor(map(data,0,254,1,4));
}
}
function portClose() {
}
sliderKick = createSlider(1,6,2);
sliderKick.position(5, height+20);
sliderKick.size(width/4-10, 10);
sliderBass = createSlider(1,4,1);
sliderBass.position(width/4+5, height+40);
sliderBass.size(width/4-10, 10);
sliderPiano = createSlider(1,4,1);
sliderPiano.position(width/4+5, height+20);
sliderPiano.size(width/4-10, 10);
sliderSnare = createSlider(1,6,2);
sliderSnare.position(5, height+40);
sliderSnare.size(width/4-10, 10);  
}
function draw() {
var kickPulse = kickPart.progress;
var snarePulse = snarePart.progress;
var pianoPulse = pianoPart.progress;
var bassPulse = bassPart.progress;
kickSwellOuter = map(kickPulse, 0, 1, 0, 5);
kickSwellMiddle = map(kickPulse, 0, 1, 0, 15);
kickSwellInner = map(kickPulse, 0, 1, 0, 40);
alphaOuter = map(kickSwellOuter, 0, 5, 50, 20);
alphaMiddle = map(kickSwellMiddle, 0, 20, 90, 30);
var wave = spectrum.getValue();
fill(0);
rect(0, 0, width/2, height);
push();
translate(0,0);
noFill();
ellipseMode(CENTER);
stroke(135, 206, 250, alphaOuter);
strokeWeight(2);
ellipse(width/8, height/4, width/4-25+(kickSwellOuter*-1), height/2-25+(kickSwellOuter*-1));
stroke(135, 206, 250, alphaMiddle);
strokeWeight(2);
ellipse(width/8, height/4, width/4-50+(kickSwellMiddle*-1), height/2-50+(kickSwellMiddle*-1));
stroke(135, 206, 250);
strokeWeight(2);
ellipse(width/8, height/4, width/4-80+(kickSwellInner*-1), height/2-80+(kickSwellInner*-1));
pop();
beginShape();
push();
translate(width*3/8, height*3/4);
beginShape();
noFill();
strokeWeight(2);
rectMode(CENTER)
for (var i = 0; i< wave.length; i++){
var b = map( wave[i], -1, 1, -40, 40);
rect(0, 0, width/4-70+b, height/2-70+b);
}
pop();
endShape();
push();
translate(width/4, 0);
scale(.25, .5);
stroke(pianoPulse*255);
strokeWeight(pianoPulse*10);
triangle(width/2, 0, width, height, 0, height);
pop();
push();
translate(0, height/2);
scale(0.25, 0.5);
for (var x=0; x < width; x++) {
var noiseVal = noise(snarePulse*x, snarePulse);
stroke(0, noiseVal*255, noiseVal*255);
line(x, noiseVal, x, height);
}
pop();
kickPart.playbackRate = sliderKick.value();
snarePart.playbackRate = sliderSnare.value();  
if (sliderPiano.value(val) == 1) {
if (cChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, cChord);
cChordPlaying = true;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value(val) == 2) {
if (fChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, fChord);
cChordPlaying = false;
fChordPlaying = true;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value(val) == 3) {
if (gChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, gChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = true;
amChordPlaying = false;
}
} else if (sliderPiano.value(val) == 4) {
if (amChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, amChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = true;
}
}
if (sliderBass.value(val) == 1) {
if (cBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "C2");
cBassPlaying = true;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
}
} else if (sliderBass.value(val) == 2) {
if (fBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "F2");
cBassBassPlaying = false;
fBassBassPlaying = true;
gBassBassPlaying = false;
amBassBassPlaying = false;
}
} else if (sliderBass.value(val) == 3) {
if (gBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "G1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = true;
amBassPlaying = false;
}
} else if (sliderBass.value(val) == 4) {
if (amBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "A1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = true;
}
}
if (mouseX > 0 && mouseX < width/4 && 
mouseY > 0 && mouseY < height/2) {
fill(100, 100, 220, 128);
rect(0, 0, width/4, height/2)
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > 0 && mouseY < height/2) {
fill(100, 100, 220, 128);
rect(width/4, 0, width/4, height/2);
} else if (mouseX > 0 && mouseX < width/4 && 
mouseY > height/2 && mouseY < height) {
fill(100, 100, 220, 128);
rect(0, height/2, width/4, height/2)
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > height/2 && mouseY < height) {
fill(100, 100, 220, 128);
rect(width/4, height/2, width/4, height/2);
}
if (mouseX > width/2 && mouseX < width &&
mouseY > 0 && mouseY < width) {
if (mouseIsPressed) {
for (i=0; i<25; i++) {
noStroke();
fill(255, 100+i*3, 100+i*5, 255/i);
ellipse(mouseX, mouseY, i, i);
}
}
fill(0, 2);
rect(width/2, 0, width/2, height);
if (keyIsPressed) {
fill(0);
rect(width/2, 0, width/2, height);
leadPaint.triggerRelease();
}
}
}
function mouseDragged() {
var paintNote = ["C4", "E4", "G4", "A4", "C5", "E5", "G5", "A5", "C6"]
if (mouseX > width/2 && mouseX < width && 
mouseY > 0 && mouseY < height) {
if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[0], "8n");
} else if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height/2 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height/4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height/4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height/4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[6], "8n");          
}
}
}    
function mousePressed() {
if (mouseX > 0 && mouseX < width/4 && 
mouseY > 0 && mouseY < height/2) {
loopKick();	
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > 0 && mouseY < height/2) {
loopPiano();
} else if (mouseX > 0 && mouseX < width/4 && 
mouseY > height/2 && mouseY < height) {
loopSnare();
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > height/2 && mouseY < height) {
loopBass();
} 
}
function loopKick() {
if (!kickOn) {
kickPart.start(0);
kickOn = !kickOn;
} else {
kickPart.stop();
kickOn = !kickOn;
}
}
function loopSnare() {
if (!snareOn) {
snarePart.start("4n");
snareOn = !snareOn;
} else {
snarePart.stop();
snareOn = !snareOn;
}
}
function loopPiano() {
if (!pianoOn) {
pianoPart.start(0);
pianoPart.loop = true;
pianoOn = !pianoOn;
} else {
pianoPart.loop = false;
pianoOn = !pianoOn;
}
}
function loopBass() {
if (!bassOn) {
bassPart.start(0);
bassPart.loop = true;
bassOn = !bassOn;
} else {
bassPart.loop = false;
bassOn = !bassOn;
}
}
kickOn = false;
snareOn = false;
pianoOn = false;
bassOn = false;
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
var kick = new Tone.MembraneSynth({
"envelope" : {
"sustain" : 0,
"attack" : 0.02,
"decay" : 0.8
},
"octaves" : 10
}).toMaster();
var kickPart = new Tone.Loop(function(time){
kick.triggerAttack("C2");
}, "2n");
var snareFilter = new Tone.AutoFilter({
frequency  : 1 ,
type  : "sine" ,
depth  : 1 ,
baseFrequency  : 400 ,
octaves  : 2.6 ,
filter  : {
type  : "bandpass" ,
rolloff  : -12 ,
Q  : 1
}}).toMaster();
var snare = new Tone.MetalSynth({
volume : -10,
frequency  : 200 ,
envelope  : {
attack  : 0.001 ,
decay  : 1.4 ,
release  : 0.2
}  ,
harmonicity  : 5.1 ,
modulationIndex  : 32 ,
resonance  : 4000 ,
octaves  : 1.5		
}).connect(snareFilter);
var snarePart = new Tone.Loop(function(time){
snare.triggerAttack("2n", .4);
}, "2n");
var pianoDelay = new Tone.PingPongDelay({
"delayTime"  : "4t" ,
"maxDelayTime"  : 2,
"wet" : .3,
"feedback" : .1
}).toMaster();
var piano = new Tone.MonoSynth(4, Tone.Synth, {
"volume" : -7,
"oscillator" : {
"partials" : [1, 2, 1],
},
"envelope"  : {
"attack"  : 0.001 ,
"decay"  : 0.1 ,
"sustain"  : 0.3 ,
"release"  : 1
},
"portamento" : 0.001
}).connect(pianoDelay);
var cChord = ["C4", ["E4", "G4"]];
var gChord = [["B3", "D4"], "G4"];
var amChord = [["C4", "E4"], "A4"];
var fChord = [["C4"], "F4", ["A4"]];
var cChord = ["C4", "E4", "G4"];
var gChord = ["B3", "D4", "G4"];
var amChord = ["C4", "E4", "A4"];
var fChord = ["C4", "F4", "A4"];
var pianoPart = new Tone.Sequence(function(time, note){
piano.triggerAttackRelease(note, "16n", time);
}, [cChord]);
var fft = new Tone.FFT(32);
var spectrum = new Tone.Waveform(1024);
var bassDist = new Tone.Distortion(
{
"distortion"  : 0.4 ,
"oversample"  : '2x'
}).connect(spectrum).toMaster();
var bass = new Tone.MonoSynth({
"volume" : -10,
"envelope" : {
"attack" : 0.1,
"decay" : 0.3,
"release" : 2,
},
"filterEnvelope" : {
"attack" : 0.001,
"decay" : 0.01,
"sustain" : 0.5,
"baseFrequency" : 200,
"octaves" : 2.6
}
}).connect(bassDist);
var bassPart = new Tone.Sequence(function(time, note){
bass.triggerAttackRelease(note, "16n", time);
}, ["C2"]);
var leadDelay = new Tone.PingPongDelay({
"delayTime" : "8n", 
"maxDelayTime"  : 1,
"feedback" : 0.82,
"wet" : .40
}).toMaster();
var leadPaint = new Tone.PolySynth({
"volume" : -20,
"oscillator" : {
"type" : "square"
},
"envelope" : {
"attack" : 0.2
},
"portamento" : 0.05
}).connect(leadDelay);
Tone.Transport.bpm.value = 60;
Tone.Transport.start();
function setup() { 
createCanvas(windowWidth, windowWidth/2);
background(0);
sliderKick = createSlider(1,6,2);
sliderKick.position(5, height+20);
sliderKick.size(width/4-10, 10);
sliderBass = createSlider(1,4,1);
sliderBass.position(width/4+5, height+40);
sliderBass.size(width/4-10, 10);
sliderPiano = createSlider(1,4,1);
sliderPiano.position(width/4+5, height+20);
sliderPiano.size(width/4-10, 10);
sliderSnare = createSlider(1,6,2);
sliderSnare.position(5, height+40);
sliderSnare.size(width/4-10, 10);  
}
function draw() {
var kickPulse = kickPart.progress;
var snarePulse = snarePart.progress;
var pianoPulse = pianoPart.progress;
var bassPulse = bassPart.progress;
var pp = map(pianoPulse,0,1,1,1.1);
kickSwellOuter = map(kickPulse, 0, 1, 0, 5);
kickSwellMiddle = map(kickPulse, 0, 1, 0, 15);
kickSwellInner = map(kickPulse, 0, 1, 0, 40);
alphaOuter = map(kickSwellOuter, 0, 5, 50, 20);
alphaMiddle = map(kickSwellMiddle, 0, 20, 90, 30);
var wave = spectrum.getValue();
var fftwave = fft.getValue();
noStroke();
fill(0);
rect(0, 0, width/2, height);
push();
translate(0,0);
noFill();
ellipseMode(CENTER);
stroke(135, 206, 250, alphaOuter);
strokeWeight(2);
ellipse(width/8, height/4, width/4-25+(kickSwellOuter*-1), height/2-25+(kickSwellOuter*-1));
stroke(135, 206, 250, alphaMiddle);
strokeWeight(2);
ellipse(width/8, height/4, width/4-50+(kickSwellMiddle*-1), height/2-50+(kickSwellMiddle*-1));
stroke(135, 206, 250);
strokeWeight(2);
ellipse(width/8, height/4, width/4-80+(kickSwellInner*-1), height/2-80+(kickSwellInner*-1));
pop();
beginShape();
push();
translate(width*3/8, height*3/4);
beginShape();
noFill();
strokeWeight(2);
rectMode(CENTER)
for (var i = 0; i< wave.length; i+=600){
var b = map( wave[i], -1, 1, -40, 40);
rect(0, 0, width/4-70+b, height/2-70+b);
}
pop();
endShape();
push();
translate(width*3/8, height/4+61/3);
scale(pp);
stroke(255);
point(0,0)
noFill();
strokeWeight(1);
triangle(-70,40.67,0,-81.35,70,40.67);
pop();
push();
translate(0, height/2);
scale(0.25, 0.5);
for (var x=0; x < width; x++) {
var noiseVal = noise(snarePulse*x, snarePulse);
stroke(0, noiseVal*255, noiseVal*255);
line(x, noiseVal, x, height);
}
pop();
kickPart.playbackRate = sliderKick.value();
snarePart.playbackRate = sliderSnare.value();  
if (sliderPiano.value() == 1) {
if (cChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, cChord);
cChordPlaying = true;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 2) {
if (fChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, fChord);
cChordPlaying = false;
fChordPlaying = true;
gChordPlaying = false;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 3) {
if (gChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, gChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = true;
amChordPlaying = false;
}
} else if (sliderPiano.value() == 4) {
if (amChordPlaying == false) {
pianoPart.removeAll();
pianoPart.add(0, amChord);
cChordPlaying = false;
fChordPlaying = false;
gChordPlaying = false;
amChordPlaying = true;
}
}
if (sliderBass.value() == 1) {
if (cBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "C2");
cBassPlaying = true;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = false;
}
} else if (sliderBass.value() == 2) {
if (fBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "F2");
cBassBassPlaying = false;
fBassBassPlaying = true;
gBassBassPlaying = false;
amBassBassPlaying = false;
}
} else if (sliderBass.value() == 3) {
if (gBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "G1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = true;
amBassPlaying = false;
}
} else if (sliderBass.value() == 4) {
if (amBassPlaying == false) {
bassPart.remove(0);
bassPart.add(0, "A1");
cBassPlaying = false;
fBassPlaying = false;
gBassPlaying = false;
amBassPlaying = true;
}
}
if (mouseX > 0 && mouseX < width/4 && 
mouseY > 0 && mouseY < height/2) {
fill(100, 100, 220, 128);
rect(0, 0, width/4, height/2)
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > 0 && mouseY < height/2) {
fill(100, 100, 220, 128);
rect(width/4, 0, width/4, height/2);
} else if (mouseX > 0 && mouseX < width/4 && 
mouseY > height/2 && mouseY < height) {
fill(100, 100, 220, 128);
rect(0, height/2, width/4, height/2)
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > height/2 && mouseY < height) {
fill(100, 100, 220, 128);
rect(width/4, height/2, width/4, height/2);
}
if (mouseX > width/2 && mouseX < width &&
mouseY > 0 && mouseY < width) {
if (mouseIsPressed) {
for (i=0; i<25; i++) {
noStroke();
fill(255, 100+i*3, 100+i*5, 255/i);
ellipse(mouseX, mouseY, i, i);
}
}
fill(0, 2);
rect(width/2, 0, width/2, height);
if (keyIsPressed) {
fill(0);
rect(width/2, 0, width/2, height);
leadPaint.triggerRelease();
}
}
}
function mouseDragged() {
var paintNote = ["C4", "E4", "G4", "A4", "C5", "E5", "G5", "A5", "C6"]
if (mouseX > width/2 && mouseX < width && 
mouseY > 0 && mouseY < height) {
if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[0], "8n");
} else if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height/2 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height/4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height/4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height/4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[6], "8n");          
}
}
}    
function mousePressed() {
if (mouseX > 0 && mouseX < width/4 && 
mouseY > 0 && mouseY < height/2) {
loopKick();	
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > 0 && mouseY < height/2) {
loopPiano();
} else if (mouseX > 0 && mouseX < width/4 && 
mouseY > height/2 && mouseY < height) {
loopSnare();
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > height/2 && mouseY < height) {
loopBass();
} 
}
function loopKick() {
if (!kickOn) {
kickPart.start(0);
kickOn = !kickOn;
} else {
kickPart.stop();
kickOn = !kickOn;
}
}
function loopSnare() {
if (!snareOn) {
snarePart.start("4n");
snareOn = !snareOn;
} else {
snarePart.stop();
snareOn = !snareOn;
}
}
function loopPiano() {
if (!pianoOn) {
pianoPart.start(0);
pianoPart.loop = true;
pianoOn = !pianoOn;
} else {
pianoPart.loop = false;
pianoOn = !pianoOn;
}
}
function loopBass() {
if (!bassOn) {
bassPart.start(0);
bassPart.loop = true;
bassOn = !bassOn;
} else {
bassPart.loop = false;
bassOn = !bassOn;
}
}
kickOn = false;
snareOn = false;
pianoOn = false;
bassOn = false;
var kick = new Tone.MembraneSynth({
"envelope" : {
"sustain" : 0,
"attack" : 0.02,
"decay" : 0.8
},
"octaves" : 10
}).toMaster();
var kickPart = new Tone.Loop(function(time){
kick.triggerAttack("C2");
}, "2n");
var snareFilter = new Tone.AutoFilter({
frequency  : 1 ,
type  : "sine" ,
depth  : 1 ,
baseFrequency  : 400 ,
octaves  : 2.6 ,
filter  : {
type  : "bandpass" ,
rolloff  : -12 ,
Q  : 1
}}).toMaster();
var snare = new Tone.MetalSynth({
volume : -10,
frequency  : 200 ,
envelope  : {
attack  : 0.001 ,
decay  : 1.4 ,
release  : 0.2
}  ,
harmonicity  : 5.1 ,
modulationIndex  : 32 ,
resonance  : 4000 ,
octaves  : 1.5		
}).connect(snareFilter);
var snarePart = new Tone.Loop(function(time){
snare.triggerAttack("2n", .4);
}, "2n");
var pianoDelay = new Tone.PingPongDelay({
"delayTime"  : "4t" ,
"maxDelayTime"  : 2,
"wet" : .3,
"feedback" : .1
}).toMaster();
var pianovib = new Tone.Vibrato({
"maxDelay"  : 0.005 ,
"frequency"  : 5 ,
"depth"  : 0.1 ,
"type"  : 'sine'
}).toMaster();
var piano = new Tone.PolySynth(4, Tone.Synth, {
"volume" : -7,
"oscillator" : {
"partials" : [1, 2, 1],
},
"envelope"  : {
"attack"  : 0.001 ,
"decay"  : 0.1 ,
"sustain"  : 0.3 ,
"release"  : 1
},
"portamento" : 0.001
}).connect(pianovib);
var cChord = ["C4", ["E4", "G4"]];
var gChord = [["B3", "D4"], "G4"];
var amChord = [["C4", "E4"], "A4"];
var fChord = [["C4"], "F4", ["A4"]];
var pianoPart = new Tone.Sequence(function(time, note){
piano.triggerAttackRelease(note, "16n", time);
}, [cChord, gChord, amChord, fChord]);
pianoPart.probability = 0.5;
var fft = new Tone.FFT(32);
var spectrum = new Tone.Waveform(32);
var bassDist = new Tone.Distortion(
{
"distortion"  : 0.4 ,
"oversample"  : '2x'
}).connect(spectrum).toMaster();
var bass = new Tone.MonoSynth({
"volume" : -10,
"envelope" : {
"attack" : 0.1,
"decay" : 0.3,
"release" : 2,
},
"filterEnvelope" : {
"attack" : 0.001,
"decay" : 0.01,
"sustain" : 0.9,
"baseFrequency" : 90,
"octaves" : 1
}
}).connect(bassDist);
var bassPart = new Tone.Sequence(function(time, note){
bass.triggerAttackRelease(note, "16n", time);
}, ["C2", "G1","E2", "G2"]);
bassPart.probability = 0.5;
var leadDelay = new Tone.PingPongDelay({
"delayTime" : "8n", 
"maxDelayTime"  : 1,
"feedback" : 0.82,
"wet" : .40
}).toMaster();
var leadPaint = new Tone.PolySynth({
"volume" : -20,
"oscillator" : {
"type" : "square"
},
"envelope" : {
"attack" : 0.2
},
"portamento" : 0.05
}).connect(leadDelay);
Tone.Transport.bpm.value = 90;
Tone.Transport.start();
function setup() { 
createCanvas(600, 300);
background(0);
sliderKick = createSlider(1,6,1);
sliderKick.position(5, height+20);
sliderKick.size(width/4-10, 10);
sliderSnare = createSlider(1,6,1);
sliderSnare.position(width/4+5, height+40);
sliderSnare.size(width/4-10, 10);
sliderPiano = createSlider(1,6,1);
sliderPiano.position(width/4+5, height+20);
sliderPiano.size(width/4-10, 10);
sliderBass = createSlider(1,6,1);
sliderBass.position(5, height+40);
sliderBass.size(width/4-10, 10);
frameRate(60%200);
}
function draw() {
var kickPulse = kickPart.progress;
var snarePulse = snarePart.progress;
var pianoPulse = pianoPart.progress;
var bassPulse = bassPart.progress;
var wave = spectrum.getValue();
var fftwave = fft.getValue();
kickSwell = map(kickPulse, 0, 1, 5, 0);
kickSwell1 = map(kickPulse, 0, 1, 20, 0);
kickSwell2 = map(kickPulse, 0, 1, 30, 0);
kickFade = map(kickSwell, 5, 0, 100, 20);
kickFade1 = map(kickSwell1, 15, 0, 160, 40);
fill(0);
rect(0, 0, width/2, height);
push();
translate(0,0);
noFill();
ellipseMode(CENTER);
stroke(135, 206, 250, kickFade);
strokeWeight(2);
ellipse(width/8, height/4, width/4-25+kickSwell, height/2-25+kickSwell);
stroke(135, 206, 250, kickFade1);
strokeWeight(2);
ellipse(width/8, height/4, width/4-50+kickSwell1, height/2-50+kickSwell1);
stroke(135, 206, 250);
strokeWeight(2);
ellipse(width/8, height/4, width/4-80+kickSwell2, height/2-80+kickSwell2);
pop();
beginShape();
push();
translate(width/8, height*3/4);
beginShape();
noFill();
strokeWeight(2);
rectMode(CENTER)
for (var i = 0; i< wave.length; i++){
var a = map(i, 0, wave.length, -3, 3);
var b = map( wave[i], -1, 1, -40, 40);
rect(0, 0, width/4-70+b, height/2-70+b);
}
pop();
endShape();
push();
translate(width/8, height*3/4);
beginShape();
noFill();
strokeWeight(2);
rectMode(CENTER)
for (var i = 0; i< fftwave.length; i++){
var a = map(i, 0, wave.length, -3, 3);
var b = map( fftwave[i], -1, 1, -40, 40);
rect(0, 0, width/4-70+b, height/2-70+b);
}
pop();
push();
translate(0, height/2);
scale(.25, .5);
rectMode(CENTER);
noFill();
stroke(255, 0, 0);
strokeWeight(1);
rect(width/2, height/2, width-1, height-1);
strokeWeight(bassPulse*10);
rect(width/2, height/2, width, height);
strokeWeight(bassPulse*5);
rect(width/2, height/2, width, height);
strokeWeight(bassPulse*2);
rect(width/2, height/2, width*basstemp, height*basstemp);
strokeWeight(bassPulse*1);
rect(width/2, height/2, width*basstemp, height*basstemp);
pop();
push();
translate(width/4, 0);
scale(0.25, 0.5);
stroke(pianoPulse*255);
strokeWeight(pianoPulse*10);
triangle(width/2, 0, width, height, 0, height);
pop();
push();
translate(width/4, height/2);
scale(0.25, 0.5);
for (var x=0; x < width; x++) {
var noiseVal = noise(snarePulse*x, snarePulse);
stroke(0, noiseVal*255, noiseVal*255);
line(x, noiseVal, x, height);
}
pop();
kickPart.playbackRate = sliderKick.value();
snarePart.playbackRate = sliderSnare.value();
pianoPart.playbackRate = sliderPiano.value();
bassPart.playbackRate = sliderBass.value();
if (mouseX > 0 && mouseX < width/4 && 
mouseY > 0 && mouseY < height/2) {
fill(100, 100, 220, 128);
rect(0, 0, width/4, height/2)
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > 0 && mouseY < height/2) {
fill(100, 100, 220, 128);
rect(width/4, 0, width/4, height/2);
} else if (mouseX > 0 && mouseX < width/4 && 
mouseY > height/2 && mouseY < height) {
fill(100, 100, 220, 128);
rect(0, height/2, width/4, height/2)
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > height/2 && mouseY < height) {
fill(100, 100, 220, 128);
rect(width/4, height/2, width/4, height/2);
}
if (mouseX > width/2 && mouseX < width &&
mouseY > 0 && mouseY < width) {
if (mouseIsPressed) {
for (i=0; i<25; i++) {
noStroke();
fill(255, 100+i*3, 100+i*5, 255/i);
ellipse(mouseX, mouseY, i, i);
}
}
fill(0, 2);
rect(width/2, 0, width/2, height);
if (keyIsPressed) {
fill(0);
rect(width/2, 0, width/2, height);
leadPaint.triggerRelease();
}
}
}
function mouseDragged() {
var paintNote = ["C4", "E4", "G4", "A4", "C5", "E5", "G5", "A5", "C6"]
if (mouseX > width/2 && mouseX < width && 
mouseY > 0 && mouseY < height) {
if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[0], "8n");
} else if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height/2 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height/4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height/4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height/4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[6], "8n");
}
}
}    
function mousePressed() {
if (mouseX > 0 && mouseX < width/4 && 
mouseY > 0 && mouseY < height/2) {
loopKick();	
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > 0 && mouseY < height/2) {
loopPiano();
} else if (mouseX > 0 && mouseX < width/4 && 
mouseY > height/2 && mouseY < height) {
loopBass();
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > height/2 && mouseY < height) {
loopSnare();
} 
}
function loopKick() {
if (!kickOn) {
kickPart.start(0);
kickOn = !kickOn;
} else {
kickPart.stop();
kickOn = !kickOn;
}
}
function loopSnare() {
if (!snareOn) {
snarePart.start("4n");
snareOn = !snareOn;
} else {
snarePart.stop();
snareOn = !snareOn;
}
}
function loopPiano() {
if (!pianoOn) {
pianoPart.start(0);
pianoPart.loop = true;
pianoOn = !pianoOn;
} else {
pianoPart.loop = false;
pianoOn = !pianoOn;
}
}
function loopBass() {
if (!bassOn) {
bassPart.start(0);
bassPart.loop = true;
bassOn = !bassOn;
} else {
bassPart.loop = false;
bassOn = !bassOn;
}
}
kickOn = false;
snareOn = false;
pianoOn = false;
bassOn = false;
var col = 8;
var row = 8;
var paintNote = ["C4", "E4", "G4", "A4", "C5", "E5", "G5", "A5", "C6"];
var paintgrid = [];
var waveform = new Tone.Waveform(1024)
var kick = new Tone.MembraneSynth({
"envelope" : {
"sustain" : 0,
"attack" : 0.02,
"decay" : 0.8
},
"octaves" : 10
}).toMaster();
var kickPart = new Tone.Loop(function(time){
kick.triggerAttack("C2");
}, "2n");
var snareFilter = new Tone.AutoFilter({
frequency  : 1 ,
type  : "sine" ,
depth  : 1 ,
baseFrequency  : 400 ,
octaves  : 2.6 ,
filter  : {
type  : "bandpass" ,
rolloff  : -12 ,
Q  : 1
}}).toMaster();
var snare = new Tone.MetalSynth({
volume : -10,
frequency  : 200 ,
envelope  : {
attack  : 0.001 ,
decay  : 1.4 ,
release  : 0.2
}  ,
harmonicity  : 5.1 ,
modulationIndex  : 32 ,
resonance  : 4000 ,
octaves  : 1.5		
}).connect(snareFilter);
var snarePart = new Tone.Loop(function(time){
snare.triggerAttack("2n", .4);
}, "2n");
var pianoDelay = new Tone.PingPongDelay({
"delayTime"  : "4t" ,
"maxDelayTime"  : 2,
"wet" : .3,
"feedback" : .1
}).toMaster();
var pianovib = new Tone.Vibrato({
"maxDelay"  : 0.005 ,
"frequency"  : 5 ,
"depth"  : 0.1 ,
"type"  : 'sine'
}).toMaster();
var piano = new Tone.PolySynth(4, Tone.Synth, {
"volume" : -7,
"oscillator" : {
"partials" : [1, 2, 1],
},
"envelope"  : {
"attack"  : 0.001 ,
"decay"  : 0.1 ,
"sustain"  : 0.3 ,
"release"  : 1
},
"portamento" : 0.001
}).connect(pianovib);
var cChord = ["C4", ["E4", "G4"]];
var gChord = [["B3", "D4"], "G4"];
var amChord = [["C4", "E4"], "A4"];
var fChord = [["C4"], "F4", ["A4"]];
var pianoPart = new Tone.Sequence(function(time, note){
piano.triggerAttackRelease(note, "16n", time);
}, [cChord, gChord, amChord, fChord]);
pianoPart.probability = 0.5;
var bassDist = new Tone.Distortion(
{
"distortion"  : 0.4 ,
"oversample"  : '2x'
}).toMaster();
var bass = new Tone.MonoSynth({
"volume" : -10,
"envelope" : {
"attack" : 0.1,
"decay" : 0.3,
"release" : 2,
},
"filterEnvelope" : {
"attack" : 0.001,
"decay" : 0.01,
"sustain" : 0.9,
"baseFrequency" : 90,
"octaves" : 1
}
}).connect(bassDist);
var bassPart = new Tone.Sequence(function(time, note){
bass.triggerAttackRelease(note, "16n", time);
bassPart.probability = 0.5;
var leadDelay = new Tone.PingPongDelay({
"delayTime" : "8n", 
"maxDelayTime"  : 1,
"feedback" : 0.82,
"wet" : .40
}).toMaster();
var leadPaint = new Tone.PolySynth({
"volume" : -20,
"oscillator" : {
"type" : "square"
},
"envelope" : {
"attack" : 0.2
},
"portamento" : 0.05
}).connect(leadDelay);
Tone.Transport.bpm.value = 90;
Tone.Transport.start();
function setup() { 
createCanvas(600, 300);
background(0);
sliderKick = createSlider(1,6,1);
sliderKick.position(5, height+20);
sliderKick.size(width/4-10, 10);
sliderSnare = createSlider(1,6,1);
sliderSnare.position(width/4+5, height+40);
sliderSnare.size(width/4-10, 10);
sliderPiano = createSlider(1,6,1);
sliderPiano.position(width/4+5, height+20);
sliderPiano.size(width/4-10, 10);
sliderBass = createSlider(1,6,1);
sliderBass.position(5, height+40);
sliderBass.size(width/4-10, 10);
}
function draw() {
var kickPulse = kickPart.progress;
var snarePulse = snarePart.progress;
var pianoPulse = pianoPart.progress;
var bassPulse = bassPart.progress;
kickSwell = map(kickPulse, 0, 1, 5, 0);
kickSwell1 = map(kickPulse, 0, 1, 20, 0);
kickSwell2 = map(kickPulse, 0, 1, 30, 0);
kickFade = map(kickSwell, 5, 0, 100, 20);
kickFade1 = map(kickSwell1, 15, 0, 160, 40);
fill(0);
rect(0, 0, width/2, height);
push();
translate(0,0);
noFill();
ellipseMode(CENTER);
stroke(135, 206, 250, kickFade);
strokeWeight(2);
ellipse(width/8, height/4, width/4-25+kickSwell, height/2-25+kickSwell);
stroke(135, 206, 250, kickFade1);
strokeWeight(2);
ellipse(width/8, height/4, width/4-50+kickSwell1, height/2-50+kickSwell1);
stroke(135, 206, 250);
strokeWeight(2);
ellipse(width/8, height/4, width/4-80+kickSwell2, height/2-80+kickSwell2);
pop();
push();
translate(0, height/2);
scale(.25, .5);
rectMode(CENTER);
noFill();
stroke(255, 0, 0);
strokeWeight(1);
rect(width/2, height/2, width-1, height-1);
strokeWeight(bassPulse*10);
rect(width/2, height/2, width, height);
strokeWeight(bassPulse*5);
rect(width/2, height/2, width, height);
strokeWeight(bassPulse*2);
rect(width/2, height/2, width*basstemp, height*basstemp);
strokeWeight(bassPulse*1);
rect(width/2, height/2, width*basstemp, height*basstemp);
pop();
push();
translate(width/4, 0);
scale(.25, .5);
stroke(pianoPulse*255);
strokeWeight(pianoPulse*10);
triangle(width/2, 0, width, height, 0, height);
pop();
push();
translate(width/4, height/2);
scale(.25, .5);
for (var x=0; x < width; x++) {
var noiseVal = noise(snarePulse*x, snarePulse);
stroke(0, noiseVal*255, noiseVal*255);
line(x, noiseVal, x, height);
}
pop();
kickPart.playbackRate = sliderKick.value();
snarePart.playbackRate = sliderSnare.value();
pianoPart.playbackRate = sliderPiano.value();
bassPart.playbackRate = sliderBass.value();
if (mouseX > 0 && mouseX < width/4 && 
mouseY > 0 && mouseY < height/2) {
fill(100, 100, 220, 128);
rect(0, 0, width/4, height/2)
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > 0 && mouseY < height/2) {
fill(100, 100, 220, 128);
rect(width/4, 0, width/4, height/2);
} else if (mouseX > 0 && mouseX < width/4 && 
mouseY > height/2 && mouseY < height) {
fill(100, 100, 220, 128);
rect(0, height/2, width/4, height/2)
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > height/2 && mouseY < height) {
fill(100, 100, 220, 128);
rect(width/4, height/2, width/4, height/2);
}
if (mouseX > width/2 && mouseX < width &&
mouseY > 0 && mouseY < width) {
if (mouseIsPressed) {
for (i=0; i<10; i++) {
noStroke();
fill(255, 0, 0);
ellipse(mouseX, mouseY, i, i);
}
}
fill(0, 15);
rect(width/2, 0, width, height);
if (keyIsPressed) {
fill(0);
rect(width/2, 0, width, height);
leadPaint.triggerRelease();
}
}
}
function mouseDragged(){
if (mouseX > width/2 && mouseX < width && 
mouseY > 0 && mouseY < height) {
for(i=0; i<col; i++){
paintNote[i]=[]
for(j=0; j<row; j++){
paintgrid[i]=
}
}
}
}
if (mouseX > width/2 && mouseX < width && 
mouseY > 0 && mouseY < height) {
if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[0], "8n");
} else if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height/2 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height/4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height/4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height/4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[6], "8n");
}
}
}    
function mousePressed() {
if (mouseX > 0 && mouseX < width/4 && 
mouseY > 0 && mouseY < height/2) {
loopKick();	
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > 0 && mouseY < height/2) {
loopPiano();
} else if (mouseX > 0 && mouseX < width/4 && 
mouseY > height/2 && mouseY < height) {
loopBass();
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > height/2 && mouseY < height) {
loopSnare();
} 
}
function loopKick() {
if (!kickOn) {
kickPart.start(0);
kickOn = !kickOn;
} else {
kickPart.stop();
kickOn = !kickOn;
}
}
function loopSnare() {
if (!snareOn) {
snarePart.start("4n");
snareOn = !snareOn;
} else {
snarePart.stop();
snareOn = !snareOn;
}
}
function loopPiano() {
if (!pianoOn) {
pianoPart.start(0);
pianoPart.loop = true;
pianoOn = !pianoOn;
} else {
pianoPart.loop = false;
pianoOn = !pianoOn;
}
}
function loopBass() {
if (!bassOn) {
bassPart.start(0);
bassPart.loop = true;
bassOn = !bassOn;
} else {
bassPart.loop = false;
bassOn = !bassOn;
}
}
kickOn = false;
snareOn = false;
pianoOn = false;
bassOn = false;
var kick = new Tone.MembraneSynth({
"envelope" : {
"sustain" : 0,
"attack" : 0.02,
"decay" : 0.8
},
"octaves" : 10
}).toMaster();
var kickPart = new Tone.Loop(function(time){
kick.triggerAttack("C2");
}, "2n");
var snareFilter = new Tone.AutoFilter({
frequency  : 1 ,
type  : "sine" ,
depth  : 1 ,
baseFrequency  : 400 ,
octaves  : 2.6 ,
filter  : {
type  : "bandpass" ,
rolloff  : -12 ,
Q  : 1
}}).toMaster();
var snare = new Tone.MetalSynth({
volume : -10,
frequency  : 200 ,
envelope  : {
attack  : 0.001 ,
decay  : 1.4 ,
release  : 0.2
}  ,
harmonicity  : 5.1 ,
modulationIndex  : 32 ,
resonance  : 4000 ,
octaves  : 1.5		
}).connect(snareFilter);
var snarePart = new Tone.Loop(function(time){
snare.triggerAttack("2n", .4);
}, "2n");
var pianoDelay = new Tone.PingPongDelay({
"delayTime"  : "4t" ,
"maxDelayTime"  : 2,
"wet" : .3,
"feedback" : .1
}).toMaster();
var pianovib = new Tone.Vibrato({
"maxDelay"  : 0.005 ,
"frequency"  : 5 ,
"depth"  : 0.1 ,
"type"  : 'sine'
}).toMaster();
var piano = new Tone.PolySynth(4, Tone.Synth, {
"volume" : -7,
"oscillator" : {
"partials" : [1, 2, 1],
},
"envelope"  : {
"attack"  : 0.001 ,
"decay"  : 0.1 ,
"sustain"  : 0.3 ,
"release"  : 1
},
"portamento" : 0.001
}).connect(pianovib);
var cChord = ["C4", ["E4", "G4"]];
var gChord = [["B3", "D4"], "G4"];
var amChord = [["C4", "E4"], "A4"];
var fChord = [["C4"], "F4", ["A4"]];
var pianoPart = new Tone.Sequence(function(time, note){
piano.triggerAttackRelease(note, "16n", time);
}, [cChord, gChord, amChord, fChord]);
pianoPart.probability = 0.5;
var fft = new Tone.FFT(32);
var spectrum = new Tone.Waveform(32);
var bassDist = new Tone.Distortion(
{
"distortion"  : 0.4 ,
"oversample"  : '2x'
}).connect(spectrum).toMaster();
var bass = new Tone.MonoSynth({
"volume" : -10,
"envelope" : {
"attack" : 0.1,
"decay" : 0.3,
"release" : 2,
},
"filterEnvelope" : {
"attack" : 0.001,
"decay" : 0.01,
"sustain" : 0.9,
"baseFrequency" : 90,
"octaves" : 1
}
}).connect(bassDist);
var bassPart = new Tone.Sequence(function(time, note){
bass.triggerAttackRelease(note, "16n", time);
bassPart.probability = 0.5;
var leadDelay = new Tone.PingPongDelay({
"delayTime" : "8n", 
"maxDelayTime"  : 1,
"feedback" : 0.82,
"wet" : .40
}).toMaster();
var leadPaint = new Tone.PolySynth({
"volume" : -20,
"oscillator" : {
"type" : "square"
},
"envelope" : {
"attack" : 0.2
},
"portamento" : 0.05
}).connect(leadDelay);
Tone.Transport.bpm.value = 90;
Tone.Transport.start();
function setup() { 
createCanvas(600, 300);
background(0);
sliderKick = createSlider(1,6,1);
sliderKick.position(5, height+20);
sliderKick.size(width/4-10, 10);
sliderSnare = createSlider(1,6,1);
sliderSnare.position(width/4+5, height+40);
sliderSnare.size(width/4-10, 10);
sliderPiano = createSlider(1,6,1);
sliderPiano.position(width/4+5, height+20);
sliderPiano.size(width/4-10, 10);
sliderBass = createSlider(1,6,1);
sliderBass.position(5, height+40);
sliderBass.size(width/4-10, 10);
}
function draw() {
var kickPulse = kickPart.progress;
var snarePulse = snarePart.progress;
var pianoPulse = pianoPart.progress;
var bassPulse = bassPart.progress;
var wave = spectrum.getValue();
console.log("freq_",wave);
kickSwell = map(kickPulse, 0, 1, 5, 0);
kickSwell1 = map(kickPulse, 0, 1, 20, 0);
kickSwell2 = map(kickPulse, 0, 1, 30, 0);
kickFade = map(kickSwell, 5, 0, 100, 20);
kickFade1 = map(kickSwell1, 15, 0, 160, 40);
fill(0);
rect(0, 0, width/2, height);
push();
translate(0,0);
noFill();
ellipseMode(CENTER);
stroke(135, 206, 250, kickFade);
strokeWeight(2);
ellipse(width/8, height/4, width/4-25+kickSwell, height/2-25+kickSwell);
stroke(135, 206, 250, kickFade1);
strokeWeight(2);
ellipse(width/8, height/4, width/4-50+kickSwell1, height/2-50+kickSwell1);
stroke(135, 206, 250);
strokeWeight(2);
ellipse(width/8, height/4, width/4-80+kickSwell2, height/2-80+kickSwell2);
pop();
push();
translate(0, height*3/4);
noFill();
beginShape();
strokeWeight(2);
for (var i = 0; i< wave.length; i++){
var x = map(i, 0, wave.length, 0, width/4);
var y = map( wave[i], -1, 1, 0, height/10);
vertex(x,y);
}
endShape();
pop();
push();
translate(0, height/2);
scale(.25, .5);
rectMode(CENTER);
noFill();
stroke(255, 0, 0);
strokeWeight(1);
rect(width/2, height/2, width-1, height-1);
strokeWeight(bassPulse*10);
rect(width/2, height/2, width, height);
strokeWeight(bassPulse*5);
rect(width/2, height/2, width, height);
strokeWeight(bassPulse*2);
rect(width/2, height/2, width*basstemp, height*basstemp);
strokeWeight(bassPulse*1);
rect(width/2, height/2, width*basstemp, height*basstemp);
pop();
push();
translate(width/4, 0);
scale(0.25, 0.5);
stroke(pianoPulse*255);
strokeWeight(pianoPulse*10);
triangle(width/2, 0, width, height, 0, height);
pop();
push();
translate(width/4, height/2);
scale(0.25, 0.5);
for (var x=0; x < width; x++) {
var noiseVal = noise(snarePulse*x, snarePulse);
stroke(0, noiseVal*255, noiseVal*255);
line(x, noiseVal, x, height);
}
pop();
kickPart.playbackRate = sliderKick.value();
snarePart.playbackRate = sliderSnare.value();
pianoPart.playbackRate = sliderPiano.value();
bassPart.playbackRate = sliderBass.value();
if (mouseX > 0 && mouseX < width/4 && 
mouseY > 0 && mouseY < height/2) {
fill(100, 100, 220, 128);
rect(0, 0, width/4, height/2)
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > 0 && mouseY < height/2) {
fill(100, 100, 220, 128);
rect(width/4, 0, width/4, height/2);
} else if (mouseX > 0 && mouseX < width/4 && 
mouseY > height/2 && mouseY < height) {
fill(100, 100, 220, 128);
rect(0, height/2, width/4, height/2)
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > height/2 && mouseY < height) {
fill(100, 100, 220, 128);
rect(width/4, height/2, width/4, height/2);
}
if (mouseX > width/2 && mouseX < width &&
mouseY > 0 && mouseY < width) {
if (mouseIsPressed) {
for (i=0; i<25; i++) {
noStroke();
fill(255, 100+i*3, 100+i*5, 255/i);
ellipse(mouseX, mouseY, i, i);
}
}
fill(0, 2);
rect(width/2, 0, width/2, height);
if (keyIsPressed) {
fill(0);
rect(width/2, 0, width/2, height);
leadPaint.triggerRelease();
}
}
}
function mouseDragged() {
var paintNote = ["C4", "E4", "G4", "A4", "C5", "E5", "G5", "A5", "C6"]
if (mouseX > width/2 && mouseX < width && 
mouseY > 0 && mouseY < height) {
if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[0], "8n");
} else if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height/2 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height/4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height/4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height/4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[6], "8n");
}
}
}    
function mousePressed() {
if (mouseX > 0 && mouseX < width/4 && 
mouseY > 0 && mouseY < height/2) {
loopKick();	
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > 0 && mouseY < height/2) {
loopPiano();
} else if (mouseX > 0 && mouseX < width/4 && 
mouseY > height/2 && mouseY < height) {
loopBass();
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > height/2 && mouseY < height) {
loopSnare();
} 
}
function loopKick() {
if (!kickOn) {
kickPart.start(0);
kickOn = !kickOn;
} else {
kickPart.stop();
kickOn = !kickOn;
}
}
function loopSnare() {
if (!snareOn) {
snarePart.start("4n");
snareOn = !snareOn;
} else {
snarePart.stop();
snareOn = !snareOn;
}
}
function loopPiano() {
if (!pianoOn) {
pianoPart.start(0);
pianoPart.loop = true;
pianoOn = !pianoOn;
} else {
pianoPart.loop = false;
pianoOn = !pianoOn;
}
}
function loopBass() {
if (!bassOn) {
bassPart.start(0);
bassPart.loop = true;
bassOn = !bassOn;
} else {
bassPart.loop = false;
bassOn = !bassOn;
}
}
kickOn = false;
snareOn = false;
pianoOn = false;
bassOn = false;
var kick = new Tone.MembraneSynth({
"envelope" : {
"sustain" : 0,
"attack" : 0.02,
"decay" : 0.8
},
"octaves" : 10
}).toMaster();
var kickPart = new Tone.Loop(function(time){
kick.triggerAttack("C2");
}, "2n");
var snareFilter = new Tone.AutoFilter({
frequency  : 1 ,
type  : "sine" ,
depth  : 1 ,
baseFrequency  : 400 ,
octaves  : 2.6 ,
filter  : {
type  : "bandpass" ,
rolloff  : -12 ,
Q  : 1
}}).toMaster();
var snare = new Tone.MetalSynth({
volume : -10,
frequency  : 200 ,
envelope  : {
attack  : 0.001 ,
decay  : 1.4 ,
release  : 0.2
}  ,
harmonicity  : 5.1 ,
modulationIndex  : 32 ,
resonance  : 4000 ,
octaves  : 1.5		
}).connect(snareFilter);
var snarePart = new Tone.Loop(function(time){
snare.triggerAttack("2n", .4);
}, "2n");
var pianoDelay = new Tone.PingPongDelay({
"delayTime"  : "4t" ,
"maxDelayTime"  : 2,
"wet" : .3,
"feedback" : .1
}).toMaster();
var pianovib = new Tone.Vibrato({
"maxDelay"  : 0.005 ,
"frequency"  : 5 ,
"depth"  : 0.1 ,
"type"  : 'sine'
}).toMaster();
var piano = new Tone.PolySynth(4, Tone.Synth, {
"volume" : -7,
"oscillator" : {
"partials" : [1, 2, 1],
},
"envelope"  : {
"attack"  : 0.001 ,
"decay"  : 0.1 ,
"sustain"  : 0.3 ,
"release"  : 1
},
"portamento" : 0.001
}).connect(pianovib);
var cChord = ["C4", ["E4", "G4"]];
var gChord = [["B3", "D4"], "G4"];
var amChord = [["C4", "E4"], "A4"];
var fChord = [["C4"], "F4", ["A4"]];
var pianoPart = new Tone.Sequence(function(time, note){
piano.triggerAttackRelease(note, "16n", time);
}, [cChord, gChord, amChord, fChord]);
pianoPart.probability = 0.5;
var fft = new Tone.FFT(32);
var spectrum = new Tone.Waveform(32);
var bassDist = new Tone.Distortion(
{
"distortion"  : 0.4 ,
"oversample"  : '2x'
}).connect(spectrum).toMaster();
var bass = new Tone.MonoSynth({
"volume" : -10,
"envelope" : {
"attack" : 0.1,
"decay" : 0.3,
"release" : 2,
},
"filterEnvelope" : {
"attack" : 0.001,
"decay" : 0.01,
"sustain" : 0.9,
"baseFrequency" : 90,
"octaves" : 1
}
}).connect(bassDist);
var bassPart = new Tone.Sequence(function(time, note){
bass.triggerAttackRelease(note, "16n", time);
bassPart.probability = 0.5;
var leadDelay = new Tone.PingPongDelay({
"delayTime" : "8n", 
"maxDelayTime"  : 1,
"feedback" : 0.82,
"wet" : .40
}).toMaster();
var leadPaint = new Tone.PolySynth({
"volume" : -20,
"oscillator" : {
"type" : "square"
},
"envelope" : {
"attack" : 0.2
},
"portamento" : 0.05
}).connect(leadDelay);
Tone.Transport.bpm.value = 90;
Tone.Transport.start();
function setup() { 
createCanvas(600, 300);
background(0);
sliderKick = createSlider(1,6,1);
sliderKick.position(5, height+20);
sliderKick.size(width/4-10, 10);
sliderSnare = createSlider(1,6,1);
sliderSnare.position(width/4+5, height+40);
sliderSnare.size(width/4-10, 10);
sliderPiano = createSlider(1,6,1);
sliderPiano.position(width/4+5, height+20);
sliderPiano.size(width/4-10, 10);
sliderBass = createSlider(1,6,1);
sliderBass.position(5, height+40);
sliderBass.size(width/4-10, 10);
}
function draw() {
var kickPulse = kickPart.progress;
var snarePulse = snarePart.progress;
var pianoPulse = pianoPart.progress;
var bassPulse = bassPart.progress;
var wave = spectrum.getValue();
console.log("freq_",wave);
kickSwell = map(kickPulse, 0, 1, 5, 0);
kickSwell1 = map(kickPulse, 0, 1, 20, 0);
kickSwell2 = map(kickPulse, 0, 1, 30, 0);
kickFade = map(kickSwell, 5, 0, 100, 20);
kickFade1 = map(kickSwell1, 15, 0, 160, 40);
fill(0);
rect(0, 0, width/2, height);
push();
translate(0,0);
noFill();
ellipseMode(CENTER);
stroke(135, 206, 250, kickFade);
strokeWeight(2);
ellipse(width/8, height/4, width/4-25+kickSwell, height/2-25+kickSwell);
stroke(135, 206, 250, kickFade1);
strokeWeight(2);
ellipse(width/8, height/4, width/4-50+kickSwell1, height/2-50+kickSwell1);
stroke(135, 206, 250);
strokeWeight(2);
ellipse(width/8, height/4, width/4-80+kickSwell2, height/2-80+kickSwell2);
pop();
push();
translate(0, height/2);
scale(0.25, 0.5);
noFill();
beginShape();
strokeWeight(2);
var x = map(i, 0, waveform.length, 0, width);
var y = map( waveform[i], -1, 1, 0, height);
vertex(x,y);
}
pop();
push();
translate(0, height/2);
scale(.25, .5);
rectMode(CENTER);
noFill();
stroke(255, 0, 0);
strokeWeight(1);
rect(width/2, height/2, width-1, height-1);
strokeWeight(bassPulse*10);
rect(width/2, height/2, width, height);
strokeWeight(bassPulse*5);
rect(width/2, height/2, width, height);
strokeWeight(bassPulse*2);
rect(width/2, height/2, width*basstemp, height*basstemp);
strokeWeight(bassPulse*1);
rect(width/2, height/2, width*basstemp, height*basstemp);
pop();
push();
translate(width/4, 0);
scale(0.25, 0.5);
stroke(pianoPulse*255);
strokeWeight(pianoPulse*10);
triangle(width/2, 0, width, height, 0, height);
pop();
push();
translate(width/4, height/2);
scale(0.25, 0.5);
for (var x=0; x < width; x++) {
var noiseVal = noise(snarePulse*x, snarePulse);
stroke(0, noiseVal*255, noiseVal*255);
line(x, noiseVal, x, height);
}
pop();
kickPart.playbackRate = sliderKick.value();
snarePart.playbackRate = sliderSnare.value();
pianoPart.playbackRate = sliderPiano.value();
bassPart.playbackRate = sliderBass.value();
if (mouseX > 0 && mouseX < width/4 && 
mouseY > 0 && mouseY < height/2) {
fill(100, 100, 220, 128);
rect(0, 0, width/4, height/2)
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > 0 && mouseY < height/2) {
fill(100, 100, 220, 128);
rect(width/4, 0, width/4, height/2);
} else if (mouseX > 0 && mouseX < width/4 && 
mouseY > height/2 && mouseY < height) {
fill(100, 100, 220, 128);
rect(0, height/2, width/4, height/2)
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > height/2 && mouseY < height) {
fill(100, 100, 220, 128);
rect(width/4, height/2, width/4, height/2);
}
if (mouseX > width/2 && mouseX < width &&
mouseY > 0 && mouseY < width) {
if (mouseIsPressed) {
for (i=0; i<25; i++) {
noStroke();
fill(255, 100+i*3, 100+i*5, 255/i);
ellipse(mouseX, mouseY, i, i);
}
}
fill(0, 2);
rect(width/2, 0, width/2, height);
if (keyIsPressed) {
fill(0);
rect(width/2, 0, width/2, height);
leadPaint.triggerRelease();
}
}
}
function mouseDragged() {
var paintNote = ["C4", "E4", "G4", "A4", "C5", "E5", "G5", "A5", "C6"]
if (mouseX > width/2 && mouseX < width && 
mouseY > 0 && mouseY < height) {
if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[0], "8n");
} else if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height/2 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height/4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height/4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height/4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[6], "8n");
}
}
}    
function mousePressed() {
if (mouseX > 0 && mouseX < width/4 && 
mouseY > 0 && mouseY < height/2) {
loopKick();	
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > 0 && mouseY < height/2) {
loopPiano();
} else if (mouseX > 0 && mouseX < width/4 && 
mouseY > height/2 && mouseY < height) {
loopBass();
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > height/2 && mouseY < height) {
loopSnare();
} 
}
function loopKick() {
if (!kickOn) {
kickPart.start(0);
kickOn = !kickOn;
} else {
kickPart.stop();
kickOn = !kickOn;
}
}
function loopSnare() {
if (!snareOn) {
snarePart.start("4n");
snareOn = !snareOn;
} else {
snarePart.stop();
snareOn = !snareOn;
}
}
function loopPiano() {
if (!pianoOn) {
pianoPart.start(0);
pianoPart.loop = true;
pianoOn = !pianoOn;
} else {
pianoPart.loop = false;
pianoOn = !pianoOn;
}
}
function loopBass() {
if (!bassOn) {
bassPart.start(0);
bassPart.loop = true;
bassOn = !bassOn;
} else {
bassPart.loop = false;
bassOn = !bassOn;
}
}
kickOn = false;
snareOn = false;
pianoOn = false;
bassOn = false;
var col = 8;
var row = 8;
var paintNote = ["C4", "E4", "G4", "A4", "C5", "E5", "G5", "A5", "C6"];
var paintgrid = [];
var waveform = new Tone.Waveform(1024)
var kick = new Tone.MembraneSynth({
"envelope" : {
"sustain" : 0,
"attack" : 0.02,
"decay" : 0.8
},
"octaves" : 10
}).toMaster();
var kickPart = new Tone.Loop(function(time){
kick.triggerAttack("C2");
}, "2n");
var snareFilter = new Tone.AutoFilter({
frequency  : 1 ,
type  : "sine" ,
depth  : 1 ,
baseFrequency  : 400 ,
octaves  : 2.6 ,
filter  : {
type  : "bandpass" ,
rolloff  : -12 ,
Q  : 1
}}).toMaster();
var snare = new Tone.MetalSynth({
volume : -10,
frequency  : 200 ,
envelope  : {
attack  : 0.001 ,
decay  : 1.4 ,
release  : 0.2
}  ,
harmonicity  : 5.1 ,
modulationIndex  : 32 ,
resonance  : 4000 ,
octaves  : 1.5		
}).connect(snareFilter);
var snarePart = new Tone.Loop(function(time){
snare.triggerAttack("2n", .4);
}, "2n");
var pianoDelay = new Tone.PingPongDelay({
"delayTime"  : "4t" ,
"maxDelayTime"  : 2,
"wet" : .3,
"feedback" : .1
}).toMaster();
var pianovib = new Tone.Vibrato({
"maxDelay"  : 0.005 ,
"frequency"  : 5 ,
"depth"  : 0.1 ,
"type"  : 'sine'
}).toMaster();
var piano = new Tone.PolySynth(4, Tone.Synth, {
"volume" : -7,
"oscillator" : {
"partials" : [1, 2, 1],
},
"envelope"  : {
"attack"  : 0.001 ,
"decay"  : 0.1 ,
"sustain"  : 0.3 ,
"release"  : 1
},
"portamento" : 0.001
}).connect(pianovib);
var cChord = ["C4", ["E4", "G4"]];
var gChord = [["B3", "D4"], "G4"];
var amChord = [["C4", "E4"], "A4"];
var fChord = [["C4"], "F4", ["A4"]];
var pianoPart = new Tone.Sequence(function(time, note){
piano.triggerAttackRelease(note, "16n", time);
}, [cChord, gChord, amChord, fChord]);
pianoPart.probability = 0.5;
var bassDist = new Tone.Distortion(
{
"distortion"  : 0.4 ,
"oversample"  : '2x'
}).toMaster();
var bass = new Tone.MonoSynth({
"volume" : -10,
"envelope" : {
"attack" : 0.1,
"decay" : 0.3,
"release" : 2,
},
"filterEnvelope" : {
"attack" : 0.001,
"decay" : 0.01,
"sustain" : 0.9,
"baseFrequency" : 90,
"octaves" : 1
}
}).connect(bassDist);
var bassPart = new Tone.Sequence(function(time, note){
bass.triggerAttackRelease(note, "16n", time);
bassPart.probability = 0.5;
var leadDelay = new Tone.PingPongDelay({
"delayTime" : "8n", 
"maxDelayTime"  : 1,
"feedback" : 0.82,
"wet" : .40
}).toMaster();
var leadPaint = new Tone.PolySynth({
"volume" : -20,
"oscillator" : {
"type" : "square"
},
"envelope" : {
"attack" : 0.2
},
"portamento" : 0.05
}).connect(leadDelay);
Tone.Transport.bpm.value = 90;
Tone.Transport.start();
function setup() { 
createCanvas(600, 300);
background(0);
sliderKick = createSlider(1,6,1);
sliderKick.position(5, height+20);
sliderKick.size(width/4-10, 10);
sliderSnare = createSlider(1,6,1);
sliderSnare.position(width/4+5, height+40);
sliderSnare.size(width/4-10, 10);
sliderPiano = createSlider(1,6,1);
sliderPiano.position(width/4+5, height+20);
sliderPiano.size(width/4-10, 10);
sliderBass = createSlider(1,6,1);
sliderBass.position(5, height+40);
sliderBass.size(width/4-10, 10);
}
function draw() {
var kickPulse = kickPart.progress;
var snarePulse = snarePart.progress;
var pianoPulse = pianoPart.progress;
var bassPulse = bassPart.progress;
kickSwell = map(kickPulse, 0, 1, 5, 0);
kickSwell1 = map(kickPulse, 0, 1, 20, 0);
kickSwell2 = map(kickPulse, 0, 1, 30, 0);
kickFade = map(kickSwell, 5, 0, 100, 20);
kickFade1 = map(kickSwell1, 15, 0, 160, 40);
fill(0);
rect(0, 0, width/2, height);
push();
translate(0,0);
noFill();
ellipseMode(CENTER);
stroke(135, 206, 250, kickFade);
strokeWeight(2);
ellipse(width/8, height/4, width/4-25+kickSwell, height/2-25+kickSwell);
stroke(135, 206, 250, kickFade1);
strokeWeight(2);
ellipse(width/8, height/4, width/4-50+kickSwell1, height/2-50+kickSwell1);
stroke(135, 206, 250);
strokeWeight(2);
ellipse(width/8, height/4, width/4-80+kickSwell2, height/2-80+kickSwell2);
pop();
push();
translate(0, height/2);
scale(.25, .5);
rectMode(CENTER);
noFill();
stroke(255, 0, 0);
strokeWeight(1);
rect(width/2, height/2, width-1, height-1);
strokeWeight(bassPulse*10);
rect(width/2, height/2, width, height);
strokeWeight(bassPulse*5);
rect(width/2, height/2, width, height);
strokeWeight(bassPulse*2);
rect(width/2, height/2, width*basstemp, height*basstemp);
strokeWeight(bassPulse*1);
rect(width/2, height/2, width*basstemp, height*basstemp);
pop();
push();
translate(width/4, 0);
scale(.25, .5);
stroke(pianoPulse*255);
strokeWeight(pianoPulse*10);
triangle(width/2, 0, width, height, 0, height);
pop();
push();
translate(width/4, height/2);
scale(.25, .5);
for (var x=0; x < width; x++) {
var noiseVal = noise(snarePulse*x, snarePulse);
stroke(0, noiseVal*255, noiseVal*255);
line(x, noiseVal, x, height);
}
pop();
kickPart.playbackRate = sliderKick.value();
snarePart.playbackRate = sliderSnare.value();
pianoPart.playbackRate = sliderPiano.value();
bassPart.playbackRate = sliderBass.value();
if (mouseX > 0 && mouseX < width/4 && 
mouseY > 0 && mouseY < height/2) {
fill(100, 100, 220, 128);
rect(0, 0, width/4, height/2)
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > 0 && mouseY < height/2) {
fill(100, 100, 220, 128);
rect(width/4, 0, width/4, height/2);
} else if (mouseX > 0 && mouseX < width/4 && 
mouseY > height/2 && mouseY < height) {
fill(100, 100, 220, 128);
rect(0, height/2, width/4, height/2)
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > height/2 && mouseY < height) {
fill(100, 100, 220, 128);
rect(width/4, height/2, width/4, height/2);
}
if (mouseX > width/2 && mouseX < width &&
mouseY > 0 && mouseY < width) {
if (mouseIsPressed) {
for (i=0; i<10; i++) {
noStroke();
fill(255, 0, 0);
ellipse(mouseX, mouseY, i, i);
}
}
fill(0, 15);
rect(width/2, 0, width, height);
if (keyIsPressed) {
fill(0);
rect(width/2, 0, width, height);
leadPaint.triggerRelease();
}
}
}
function mouseDragged(){
if (mouseX > width/2 && mouseX < width && 
mouseY > 0 && mouseY < height) {
for(i=0; i<col; i++){
leadPaint.triggerAttackRelease(paintNote[i], "8n");
for(j=0; j<row; j++){
leadPaint.triggerAttackRelease(paintNote[j+1], "8n");
}
}
}
}
if (mouseX > width/2 && mouseX < width && 
mouseY > 0 && mouseY < height) {
if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[0], "8n");
} else if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height/2 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height/4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height/4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height/4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[6], "8n");
}
}
}    
function mousePressed() {
if (mouseX > 0 && mouseX < width/4 && 
mouseY > 0 && mouseY < height/2) {
loopKick();	
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > 0 && mouseY < height/2) {
loopPiano();
} else if (mouseX > 0 && mouseX < width/4 && 
mouseY > height/2 && mouseY < height) {
loopBass();
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > height/2 && mouseY < height) {
loopSnare();
} 
}
function loopKick() {
if (!kickOn) {
kickPart.start(0);
kickOn = !kickOn;
} else {
kickPart.stop();
kickOn = !kickOn;
}
}
function loopSnare() {
if (!snareOn) {
snarePart.start("4n");
snareOn = !snareOn;
} else {
snarePart.stop();
snareOn = !snareOn;
}
}
function loopPiano() {
if (!pianoOn) {
pianoPart.start(0);
pianoPart.loop = true;
pianoOn = !pianoOn;
} else {
pianoPart.loop = false;
pianoOn = !pianoOn;
}
}
function loopBass() {
if (!bassOn) {
bassPart.start(0);
bassPart.loop = true;
bassOn = !bassOn;
} else {
bassPart.loop = false;
bassOn = !bassOn;
}
}
kickOn = false;
snareOn = false;
pianoOn = false;
bassOn = false;
var kick = new Tone.MembraneSynth({
"envelope" : {
"sustain" : 0,
"attack" : 0.02,
"decay" : 0.8
},
"octaves" : 10
}).toMaster();
var kickPart = new Tone.Loop(function(time){
kick.triggerAttack("C2");
}, "2n");
var snareFilter = new Tone.AutoFilter({
frequency  : 1 ,
type  : "sine" ,
depth  : 1 ,
baseFrequency  : 400 ,
octaves  : 2.6 ,
filter  : {
type  : "bandpass" ,
rolloff  : -12 ,
Q  : 1
}}).toMaster();
var snare = new Tone.MetalSynth({
volume : -10,
frequency  : 200 ,
envelope  : {
attack  : 0.001 ,
decay  : 1.4 ,
release  : 0.2
}  ,
harmonicity  : 5.1 ,
modulationIndex  : 32 ,
resonance  : 4000 ,
octaves  : 1.5		
}).connect(snareFilter);
var snarePart = new Tone.Loop(function(time){
snare.triggerAttack("2n", .4);
}, "2n");
var pianoDelay = new Tone.PingPongDelay({
"delayTime"  : "4t" ,
"maxDelayTime"  : 2,
"wet" : .3,
"feedback" : .1
}).toMaster();
var piano = new Tone.PolySynth(4, Tone.Synth, {
"volume" : -7,
"oscillator" : {
"partials" : [1, 2, 1],
},
"envelope"  : {
"attack"  : 0.001 ,
"decay"  : 0.1 ,
"sustain"  : 0.3 ,
"release"  : 1
},
"portamento" : 0.001
}).connect(pianoDelay);
var cChord = ["C4", ["E4", "G4"]];
var gChord = [["B3", "D4"], "G4"];
var amChord = [["C4", "E4"], "A4"];
var fChord = [["C4"], "F4", ["A4"]];
var pianoPart = new Tone.Sequence(function(time, note){
piano.triggerAttackRelease(note, "16n", time);
}, [cChord, gChord, amChord, fChord]);
pianoPart.probability = 0.5;
var bass = new Tone.MonoSynth({
"volume" : -10,
"envelope" : {
"attack" : 0.1,
"decay" : 0.3,
"release" : 2,
},
"filterEnvelope" : {
"attack" : 0.001,
"decay" : 0.01,
"sustain" : 0.5,
"baseFrequency" : 200,
"octaves" : 2.6
}
}).toMaster();
var bassPart = new Tone.Sequence(function(time, note){
bass.triggerAttackRelease(note, "16n", time);
}, ["C2", "G1", "A1", "F2"]);
bassPart.probability = 0.5;
var leadDelay = new Tone.PingPongDelay({
"delayTime" : "8n", 
"maxDelayTime"  : 1,
"feedback" : 0.82,
"wet" : .40
}).toMaster();
var leadPaint = new Tone.PolySynth({
"volume" : -20,
"oscillator" : {
"type" : "square"
},
"envelope" : {
"attack" : 0.2
},
"portamento" : 0.05
}).connect(leadDelay);
Tone.Transport.bpm.value = 90;
Tone.Transport.start();
function setup() { 
createCanvas(600, 300);
background(0);
sliderKick = createSlider(1,6,1);
sliderKick.position(5, height+20);
sliderKick.size(width/4-10, 10);
sliderSnare = createSlider(1,6,1);
sliderSnare.position(width/4+5, height+40);
sliderSnare.size(width/4-10, 10);
sliderPiano = createSlider(1,6,1);
sliderPiano.position(width/4+5, height+20);
sliderPiano.size(width/4-10, 10);
sliderBass = createSlider(1,6,1);
sliderBass.position(5, height+40);
sliderBass.size(width/4-10, 10);
}
function draw() {
var kickPulse = kickPart.progress;
var snarePulse = snarePart.progress;
var pianoPulse = pianoPart.progress;
var bassPulse = bassPart.progress;
kickSwell = map(kickPulse, 0, 1, 1, 25);
kickFade = map(kickPulse, 0, 1, 255, 0);
fill(0);
rect(0, 0, width/2, height);
push();
translate(0,0);
noFill();
ellipseMode(CENTER);
stroke(135, 206, 250, kickFade);
strokeWeight(kickSwell);
ellipse(width/8, height/4, width/4-20, height/2-20);
stroke(135, 206, 250, kickFade/2);
strokeWeight(kickSwell/2);
ellipse(width/8, height/4, width/4-50, height/2-50);
stroke(135, 206, 250, kickFade/4);
strokeWeight(kickSwell/4);
ellipse(width/8, height/4, width/4-80, height/2-80);
pop();
push();
translate(0, height/2);
scale(.25, .5);
rectMode(CENTER);
noFill();
stroke(255, 0, 0);
strokeWeight(1);
rect(width/2, height/2, width-1, height-1);
strokeWeight(bassPulse*10);
rect(width/2, height/2, width*bassPulse, height*bassPulse);
strokeWeight(bassPulse*5);
rect(width/2, height/2, width*bassPulse/1.1, height*bassPulse/1.1);
strokeWeight(bassPulse*2);
rect(width/2, height/2, width*bassPulse/1.2, height*bassPulse/1.2);
strokeWeight(bassPulse*1);
rect(width/2, height/2, width*bassPulse/1.25, height*bassPulse/1.25);
pop();
push();
translate(width/4, 0);
scale(.25, .5);
stroke(pianoPulse*255);
strokeWeight(pianoPulse*10);
triangle(width/2, 0, width, height, 0, height);
pop();
push();
translate(width/4, height/2);
scale(.25, .5);
for (var x=0; x < width; x++) {
var noiseVal = noise(snarePulse*x, snarePulse);
stroke(0, noiseVal*255, noiseVal*255);
line(x, noiseVal, x, height);
}
pop();
kickPart.playbackRate = sliderKick.value();
snarePart.playbackRate = sliderSnare.value();
pianoPart.playbackRate = sliderPiano.value();
bassPart.playbackRate = sliderBass.value();
if (mouseX > 0 && mouseX < width/4 && 
mouseY > 0 && mouseY < height/2) {
fill(100, 100, 220, 128);
rect(0, 0, width/4, height/2)
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > 0 && mouseY < height/2) {
fill(100, 100, 220, 128);
rect(width/4, 0, width/4, height/2);
} else if (mouseX > 0 && mouseX < width/4 && 
mouseY > height/2 && mouseY < height) {
fill(100, 100, 220, 128);
rect(0, height/2, width/4, height/2)
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > height/2 && mouseY < height) {
fill(100, 100, 220, 128);
rect(width/4, height/2, width/4, height/2);
}
if (mouseX > width/2 && mouseX < width &&
mouseY > 0 && mouseY < width) {
if (mouseIsPressed) {
for (i=0; i<25; i++) {
noStroke();
fill(255, 100+i*3, 100+i*5, 255/i);
ellipse(mouseX, mouseY, i, i);
}
}
fill(0, 2);
rect(width/2, 0, width/2, height);
if (keyIsPressed) {
fill(0);
rect(width/2, 0, width/2, height);
leadPaint.triggerRelease();
}
}
}
function mouseDragged() {
var paintNote = ["C4", "E4", "G4", "A4", "C5", "E5", "G5", "A5", "C6"]
if (mouseX > width/2 && mouseX < width && 
mouseY > 0 && mouseY < height) {
if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[0], "8n");
} else if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width/2 && mouseX < width*5/8 &&
mouseY < height/2 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[1], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*5/8 && mouseX < width*3/4 &&
mouseY < height/4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[2], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width*3/4 && mouseX < width*7/8 &&
mouseY < height/4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height && mouseY > height*3/4) {
leadPaint.triggerAttackRelease(paintNote[3], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height*3/4 && mouseY > height/2) {
leadPaint.triggerAttackRelease(paintNote[4], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height/2 && mouseY > height/4) {
leadPaint.triggerAttackRelease(paintNote[5], "8n");
} else if (mouseX > width*7/8 && mouseX < width &&
mouseY < height/4 && mouseY > 0) {
leadPaint.triggerAttackRelease(paintNote[6], "8n");
}
}
}    
function mousePressed() {
if (mouseX > 0 && mouseX < width/4 && 
mouseY > 0 && mouseY < height/2) {
loopKick();	
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > 0 && mouseY < height/2) {
loopPiano();
} else if (mouseX > 0 && mouseX < width/4 && 
mouseY > height/2 && mouseY < height) {
loopBass();
} else if (mouseX > width/4 && mouseX < width/2 && 
mouseY > height/2 && mouseY < height) {
loopSnare();
} 
}
function loopKick() {
if (!kickOn) {
kickPart.start(0);
kickOn = !kickOn;
} else {
kickPart.stop();
kickOn = !kickOn;
}
}
function loopSnare() {
if (!snareOn) {
snarePart.start("4n");
snareOn = !snareOn;
} else {
snarePart.stop();
snareOn = !snareOn;
}
}
function loopPiano() {
if (!pianoOn) {
pianoPart.start(0);
pianoPart.loop = true;
pianoOn = !pianoOn;
} else {
pianoPart.loop = false;
pianoOn = !pianoOn;
}
}
function loopBass() {
if (!bassOn) {
bassPart.start(0);
bassPart.loop = true;
bassOn = !bassOn;
} else {
bassPart.loop = false;
bassOn = !bassOn;
}
}
var kick = new Tone.MembraneSynth({
"envelope" : {
"sustain" : 0,
"attack" : 0.02,
"decay" : 0.8
},
"octaves" : 10
}).toMaster();
var feedbackDelay = new Tone.PingPongDelay({
"delayTime" : "8t",
"feedback" : 0.25,
"wet" : 0.25
}).toMaster();
var snare = new Tone.NoiseSynth({
"volume" : -5,
"envelope" : {
"attack" : 0.0001,
"decay" : 0.5,
"sustain" : 0
},
"filterEnvelope" : {
"attack" : 0.001,
"decay" : 0.1,
"sustain" : 0
}
}).connect(feedbackDelay);
var autoWah = new Tone.AutoWah(120, 10, -20).toMaster();
var bass = new Tone.MonoSynth({
"volume" : -10,
"envelope" : {
"attack" : 0.1,
"decay" : 0.3,
"release" : 2,
},
"filterEnvelope" : {
"attack" : 0.001,
"decay" : 0.01,
"sustain" : 0.5,
"baseFrequency" : 60,
"octaves" : 2.6
}
}).connect(autoWah);
var chord;
var feedbackDelay = new Tone.PingPongDelay({
"delayTime" : "16n",
"feedback" : 0.9,
"wet" : 0.1,
}).toMaster();
var synth = new Tone.PolySynth(6, Tone.Synth, {
"oscillator" : {
"partials" : [0, 2, 3, 4],
}
}).connect(feedbackDelay);
var x = 0;
var y = 0;
var mx2 = 30;
var my2 = 410+30;
var mx3 = 30;
var my3 = 410+30+30;
var sliderStart = 30;
var sliderEnd = 470;
var dragging2 = false;
var dragging3 = false;
var cc1 = function createCanvas()
var cc2 = function createCanvas()
function setup() {
cc1(500,500);
cc2(500,500);
background(255);
reverb = new p5.Reverb();
fr = frameRate(1);
}
function draw() {
if (dragging2) {
mx2 = mouseX; 
}
if (dragging3) {
mx3 = mouseX;
}
mx2 = constrain(mx2, sliderStart, sliderEnd);
mx3 = constrain(mx3, sliderStart, sliderEnd);
fr = map(mx2,sliderStart,sliderEnd,1,11);
noStroke();
strokeWeight(1)
if (random(3) < 1) {
fill(0,0,0);
triangle(x+10, y+3, x+3, y+17,x+17,y+17 );
kick.triggerAttackRelease('A1','4n');
}else if (random(3) > 1 && random(3) < 2 ) {
fill(0,0,0)
ellipseMode(CENTER)
ellipse(x+10, y+10, 14);
kick.triggerAttackRelease('G2', '8n');
} else  {
rectMode(CENTER)
fill(0,0,0)
rect(x+10,y+10,14,14) 
kick.triggerAttackRelease('E6', '8n');
}
if(random(2)<1){
stroke(0,0,255)
strokeWeight(1)
line(x,y+22,x+14,y+14+20)
bass.triggerAttackRelease('E2', '8n');
}else{
stroke(0,0,255)
strokeWeight(1)
line(x+14,y+22,x,y+14+20)
bass.triggerAttackRelease('C1', '8n');
}
x+=20
if (x > width) {
x = 0;
y += 40;
}
if (y > height-100) {
background(255,255,255,252);
x = 0;
y = 0;
}
noStroke()
fill(255)
rectMode(CORNER)
rect(0,380,500,120)
stroke(100)
strokeWeight(1)
line(0+30,380+30+30,width-30,380+30+30)
strokeWeight(1)
line(0+30,380+30+30+30,width-30,380+30+30+30)
if (dragging2) {
fill('#2d600f')
} else {
fill('#81B463');
frameRate(fr);
}
ellipseMode(CENTER)
ellipse(mx2, my2, 15,15,5)
if (dragging3) {
fill('#0a4961')
} else {
fill('#458DA8');
}
ellipseMode(CENTER)
ellipse(mx3, my3,15, 15,5)
}
function mousePressed() {
if (mouseX > mx2 - 10 && mouseX < mx2 + 10 && mouseY > my2 - 7.5 && mouseY < my2 + 7.5) {
dragging2 = true;
}
if (mouseX > mx3 - 10 && mouseX < mx3 + 10 && mouseY > my3 - 7.5 && mouseY < my3 + 7.5) {
dragging3 = true;
}
}
function mouseReleased() {
dragging2 = false;
dragging3 = false;
var data;
var kick = new Tone.MembraneSynth({
"envelope" : {
"sustain" : 0,
"attack" : 0.02,
"decay" : 0.8
},
"octaves" : 10
}).toMaster();
var feedbackDelay = new Tone.PingPongDelay({
"delayTime" : "8t",
"feedback" : 0.25,
"wet" : 0.25
}).toMaster();
var snare = new Tone.NoiseSynth({
"volume" : -5,
"envelope" : {
"attack" : 0.0001,
"decay" : 0.5,
"sustain" : 0
},
"filterEnvelope" : {
"attack" : 0.001,
"decay" : 0.1,
"sustain" : 0
}
}).connect(feedbackDelay);
var autoWah = new Tone.AutoWah(120, 10, -20).toMaster();
var bass = new Tone.MonoSynth({
"volume" : -10,
"envelope" : {
"attack" : 0.1,
"decay" : 0.3,
"release" : 2,
},
"filterEnvelope" : {
"attack" : 0.001,
"decay" : 0.01,
"sustain" : 0.5,
"baseFrequency" : 60,
"octaves" : 2.6
}
}).connect(autoWah);
var chord;
var feedbackDelay = new Tone.PingPongDelay({
"delayTime" : "16n",
"feedback" : 0.9,
"wet" : 0.1,
}).toMaster();
var synth = new Tone.PolySynth(6, Tone.Synth, {
"oscillator" : {
"partials" : [0, 2, 3, 4],
}
}).connect(feedbackDelay);
var fr;
var x = 0;
var y = 0;
var my2 = 410+30;
var mx3 = 30;
var my3 = 410+30+30;
var sliderStart = 30;
var sliderEnd = 470;
var dragging2 = false;
var dragging3 = false;
var fdata;
function setup() {
createCanvas(500, 500);
background(255);
frameRate(fr);
}
function serverConnected() {
}
function portOpen() {
}
var dr = floor(map(data,0,255,0,12));
fr = floor(map(dr,0,12,1,4));
}
}
function portClose() {
}
function draw() {
if (dragging3) {
mx3 = mouseX;
frameRate(fr);
noStroke();
strokeWeight(1)
if (random(3) < 1) {
fill(0,0,0);
triangle(x+10, y+3, x+3, y+17,x+17,y+17 );
kick.triggerAttackRelease('A1','4n');
}else if (random(3) > 1 && random(3) < 2 ) {
fill(0,0,0)
ellipseMode(CENTER)
ellipse(x+10, y+10, 14);
kick.triggerAttackRelease('G2', '8n');
} else  {
rectMode(CENTER)
fill(0,0,0)
rect(x+10,y+10,14,14) 
kick.triggerAttackRelease('E6', '8n');
}
if(random(2)<1){
stroke(0,0,255)
strokeWeight(1)
line(x,y+22,x+14,y+14+20)
bass.triggerAttackRelease('E2', '8n');
}else{
stroke(0,0,255)
strokeWeight(1)
line(x+14,y+22,x,y+14+20)
bass.triggerAttackRelease('C1', '8n');
}
x+=20
if (x > width) {
x = 0;
y += 40;
}
if (y > height-100) {
background(255,255,255,252);
x = 0;
y = 0;
}
noStroke()
fill(255)
rectMode(CORNER)
rect(0,380,500,120)
stroke(100)
strokeWeight(1)
line(0+30,380+30+30,width-30,380+30+30)
strokeWeight(1)
line(0+30,380+30+30+30,width-30,380+30+30+30)
fill('#2d600f')
} else {
fill('#81B463');
frameRate(fr);
fill(0)
ellipseMode(CENTER);
ellipse(30, my2, 15,15);
fill('#0a4961')
} else {
fill('#458DA8');
ellipseMode(CENTER);
ellipse(30, my3,15, 15,5);
}
function mousePressed() {
if (mouseX > mx2 - 10 && mouseX < mx2 + 10 && mouseY > my2 - 7.5 && mouseY < my2 + 7.5) {
dragging2 = true;
}
if (mouseX > mx3 - 10 && mouseX < mx3 + 10 && mouseY > my3 - 7.5 && mouseY < my3 + 7.5) {
dragging3 = true;
}
}
function mouseReleased() {
dragging2 = false;
dragging3 = false;
var kick = new Tone.MembraneSynth({
"envelope" : {
"sustain" : 0,
"attack" : 0.02,
"decay" : 0.8
},
"octaves" : 10
}).toMaster();
var feedbackDelay = new Tone.PingPongDelay({
"delayTime" : "8t",
"feedback" : 0.25,
"wet" : 0.25
}).toMaster();
var snare = new Tone.NoiseSynth({
"volume" : -5,
"envelope" : {
"attack" : 0.0001,
"decay" : 0.5,
"sustain" : 0
},
"filterEnvelope" : {
"attack" : 0.001,
"decay" : 0.1,
"sustain" : 0
}
}).connect(feedbackDelay);
var autoWah = new Tone.AutoWah(120, 10, -20).toMaster();
var bass = new Tone.MonoSynth({
"volume" : -10,
"envelope" : {
"attack" : 0.1,
"decay" : 0.3,
"release" : 2,
},
"filterEnvelope" : {
"attack" : 0.001,
"decay" : 0.01,
"sustain" : 0.5,
"baseFrequency" : 60,
"octaves" : 2.6
}
}).connect(autoWah);
var chord;
var feedbackDelay = new Tone.PingPongDelay({
"delayTime" : "16n",
"feedback" : 0.9,
"wet" : 0.1,
}).toMaster();
var synth = new Tone.PolySynth(6, Tone.Synth, {
"oscillator" : {
"partials" : [0, 2, 3, 4],
}
}).connect(feedbackDelay);
var x = 0;
var y = 0;
var mx2 = 30;
var my2 = 410+30;
var mx3 = 30;
var my3 = 410+30+30;
var sliderStart = 30;
var sliderEnd = 470;
var dragging2 = false;
var dragging3 = false;
function setup() {
createCanvas(500, 500);
background(255);
reverb = new p5.Reverb();
fr = frameRate(1);
}
function draw() {
if (dragging2) {
mx2 = mouseX; 
}
if (dragging3) {
mx3 = mouseX;
}
mx2 = constrain(mx2, sliderStart, sliderEnd);
mx3 = constrain(mx3, sliderStart, sliderEnd);
fr = map(mx2,sliderStart,sliderEnd,1,11);
noStroke();
strokeWeight(1)
if (random(3) < 1) {
fill(0,0,0);
triangle(x+10, y+3, x+3, y+17,x+17,y+17 );
kick.triggerAttackRelease('A1','24n');
}else if (random(3) > 1 && random(3) < 2 ) {
fill(0,0,0)
ellipseMode(CENTER)
ellipse(x+10, y+10, 14);
kick.triggerAttackRelease('G2', '8n');
} else  {
rectMode(CENTER)
fill(0,0,0)
rect(x+10,y+10,14,14) 
kick.triggerAttackRelease('E4', '16n');
}
if(random(2)<1){
stroke(0,0,255)
strokeWeight(1)
line(x,y+22,x+14,y+14+20)
bass.triggerAttackRelease('E2', '8n');
}else{
stroke(0,0,255)
strokeWeight(1)
line(x+14,y+22,x,y+14+20)
bass.triggerAttackRelease('C1', '8n');
}
x+=20
if (x > width) {
x = 0;
y += 40;
}
if (y > height-100) {
background(255,255,255,252);
x = 0;
y = 0;
}
noStroke()
fill(255)
rectMode(CORNER)
rect(0,380,500,120)
stroke(100)
strokeWeight(1)
line(0+30,380+30+30,width-30,380+30+30)
strokeWeight(1)
line(0+30,380+30+30+30,width-30,380+30+30+30)
if (dragging2) {
fill('#2d600f')
} else {
fill('#81B463');
frameRate(fr);
}
ellipseMode(CENTER)
ellipse(mx2, my2, 15,15,5)
if (dragging3) {
fill('#0a4961')
} else {
fill('#458DA8');
}
ellipseMode(CENTER)
ellipse(mx3, my3,15, 15,5)
}
function mousePressed() {
if (mouseX > mx2 - 10 && mouseX < mx2 + 10 && mouseY > my2 - 7.5 && mouseY < my2 + 7.5) {
dragging2 = true;
}
if (mouseX > mx3 - 10 && mouseX < mx3 + 10 && mouseY > my3 - 7.5 && mouseY < my3 + 7.5) {
dragging3 = true;
}
}
function mouseReleased() {
dragging2 = false;
dragging3 = false;
var kick = new Tone.MembraneSynth({
"envelope" : {
"sustain" : 0,
"attack" : 0.02,
"decay" : 0.8
},
"octaves" : 10
}).toMaster();
var feedbackDelay = new Tone.PingPongDelay({
"delayTime" : "8t",
"feedback" : 0.25,
"wet" : 0.25
}).toMaster();
var snare = new Tone.NoiseSynth({
"volume" : -5,
"envelope" : {
"attack" : 0.0001,
"decay" : 0.5,
"sustain" : 0
},
"filterEnvelope" : {
"attack" : 0.001,
"decay" : 0.1,
"sustain" : 0
}
}).connect(feedbackDelay);
var autoWah = new Tone.AutoWah(120, 10, -20).toMaster();
var bass = new Tone.MonoSynth({
"volume" : -10,
"envelope" : {
"attack" : 0.1,
"decay" : 0.3,
"release" : 2,
},
"filterEnvelope" : {
"attack" : 0.001,
"decay" : 0.01,
"sustain" : 0.5,
"baseFrequency" : 60,
"octaves" : 2.6
}
}).connect(autoWah);
var chord;
var feedbackDelay = new Tone.PingPongDelay({
"delayTime" : "16n",
"feedback" : 0.9,
"wet" : 0.1,
}).toMaster();
var synth = new Tone.PolySynth(6, Tone.Synth, {
"oscillator" : {
"partials" : [0, 2, 3, 4],
}
}).connect(feedbackDelay);
var x = 0;
var y = 0;
var mx2 = 30;
var my2 = 410+30;
var mx3 = 30;
var my3 = 410+30+30;
var sliderStart = 30;
var sliderEnd = 470;
var dragging2 = false;
var dragging3 = false;
function setup() {
createCanvas(500, 500);
background(255);
reverb = new p5.Reverb();
fr = frameRate(1);
}
function draw() {
if (dragging2) {
mx2 = mouseX; 
}
if (dragging3) {
mx3 = mouseX;
}
mx2 = constrain(mx2, sliderStart, sliderEnd);
mx3 = constrain(mx3, sliderStart, sliderEnd);
fr = map(mx2,sliderStart,sliderEnd,1,20);
noStroke();
strokeWeight(1)
if (random(3) < 1) {
fill(0,0,0);
triangle(x+10, y+3, x+3, y+17,x+17,y+17 );
kick.triggerAttackRelease('A1','4n');
}else if (random(3) > 1 && random(3) < 2 ) {
fill(0,0,0)
ellipseMode(CENTER)
ellipse(x+10, y+10, 14);
kick.triggerAttackRelease('G2', '8n');
} else  {
rectMode(CENTER)
fill(0,0,0)
rect(x+10,y+10,14,14) 
kick.triggerAttackRelease('E6', '8n');
}
x+=20
if (x > width) {
x = 0;
y += 40;
}
if (y > height-40) {
background(255,255,255,252);
x = 0;
y = 0;
}
noStroke()
fill(255)
rectMode(CORNER)
rect(0,380,500,120)
stroke(100)
strokeWeight(1)
line(0+30,380+30+30,width-30,380+30+30)
strokeWeight(1)
line(0+30,380+30+30+30,width-30,380+30+30+30)
if (dragging2) {
fill('#2d600f')
} else {
fill('#81B463');
frameRate(fr);
}
ellipseMode(CENTER)
ellipse(mx2, my2, 15,15,5)
if (dragging3) {
fill('#0a4961')
} else {
fill('#458DA8');
}
ellipseMode(CENTER)
ellipse(mx3, my3,15, 15,5)
}
function mousePressed() {
if (mouseX > mx2 - 10 && mouseX < mx2 + 10 && mouseY > my2 - 7.5 && mouseY < my2 + 7.5) {
dragging2 = true;
}
if (mouseX > mx3 - 10 && mouseX < mx3 + 10 && mouseY > my3 - 7.5 && mouseY < my3 + 7.5) {
dragging3 = true;
}
}
function mouseReleased() {
dragging1 = false;
dragging2 = false;
dragging3 = false;
var kick = new Tone.MembraneSynth({
"envelope" : {
"sustain" : 0,
"attack" : 0.02,
"decay" : 0.8
},
"octaves" : 10
}).toMaster();
var feedbackDelay = new Tone.PingPongDelay({
"delayTime" : "8t",
"feedback" : 0.25,
"wet" : 0.25
}).toMaster();
var snare = new Tone.NoiseSynth({
"volume" : -5,
"envelope" : {
"attack" : 0.0001,
"decay" : 0.5,
"sustain" : 0
},
"filterEnvelope" : {
"attack" : 0.001,
"decay" : 0.1,
"sustain" : 0
}
}).connect(feedbackDelay);
var autoWah = new Tone.AutoWah(120, 10, -20).toMaster();
var bass = new Tone.MonoSynth({
"volume" : -10,
"envelope" : {
"attack" : 0.1,
"decay" : 0.3,
"release" : 2,
},
"filterEnvelope" : {
"attack" : 0.001,
"decay" : 0.01,
"sustain" : 0.5,
"baseFrequency" : 60,
"octaves" : 2.6
}
}).connect(autoWah);
var chord;
var feedbackDelay = new Tone.PingPongDelay({
"delayTime" : "16n",
"feedback" : 0.9,
"wet" : 0.1,
}).toMaster();
var synth = new Tone.PolySynth(6, Tone.Synth, {
"oscillator" : {
"partials" : [0, 2, 3, 4],
}
}).connect(feedbackDelay);
var reverb;
var x = 0;
var y = 0;
var mx1 = 30;
var my1 = 403;
var mx2 = 30;
var my2 = 410+30;
var mx3 = 30;
var my3 = 410+30+30;
var sliderStart = 30;
var sliderEnd = 470;
var dragging1 = false;
var dragging2 = false;
var dragging3 = false;
var r = 0;
var g = 0;
var b = 0;
function setup() {
createCanvas(500, 500);
background(255);
reverb = new p5.Reverb();
fr = frameRate(1);
}
function draw() {
if (dragging1) {
mx1 = mouseX;
}
if (dragging2) {
mx2 = mouseX; 
}
if (dragging3) {
mx3 = mouseX;
}
mx1 = constrain(mx1, sliderStart, sliderEnd);
mx2 = constrain(mx2, sliderStart, sliderEnd);
mx3 = constrain(mx3, sliderStart, sliderEnd);
var r = map(mx1,sliderStart,sliderEnd,0,255);
var g = map(mx2,sliderStart,sliderEnd,0,255);
var b = map(mx3,sliderStart,sliderEnd,0,255);
fr = map(mx2,sliderStart,sliderEnd,1,11);
noStroke();
strokeWeight(1)
if (random(3) < 1) {
fill(r,0,0);
triangle(x+10, y+3, x+3, y+17,x+17,y+17 );
kick.triggerAttackRelease('A1','4n');
}else if (random(3) > 1 && random(3) < 2 ) {
fill(0,g,0)
ellipseMode(CENTER)
ellipse(x+10, y+10, 14);
kick.triggerAttackRelease('G2', '8n');
frameRate(fr);
} else  {
rectMode(CENTER)
fill(0,0,b)
rect(x+10,y+10,14,14) 
kick.triggerAttackRelease('E6', '8n');
}
x+=20
if (x > width) {
x = 0;
y += 20;
}
if (y > 300) {
background(255,255,255,252);
x = 0;
y = 0;
}
noStroke()
fill(255)
rectMode(CORNER)
rect(0,380,500,120)
stroke(100)
strokeWeight(1)
line(0+30,380+30,width-30,380+30)
strokeWeight(1)
line(0+30,380+30+30,width-30,380+30+30)
strokeWeight(1)
line(0+30,380+30+30+30,width-30,380+30+30+30)
noStroke()
if (dragging1) {
fill('#a01700')
} else {
fill('#DC615F');
}
triangle(mx1, my1,mx1-8,my1+15,mx1+8,my1+15)
if (dragging2) {
fill('#2d600f')
} else {
fill('#81B463');
}
ellipseMode(CENTER)
ellipse(mx2, my2, 15,15,5)
if (dragging3) {
fill('#0a4961')
} else {
fill('#458DA8');
}
rectMode(CENTER)
rect(mx3, my3,15, 15,5)
}
function mousePressed() {
if (mouseX > mx1 -10 && mouseX < mx1 + 10 && mouseY > my1-7.5 && mouseY < my1 + 7.5) {
dragging1 = true;
}
if (mouseX > mx2 - 10 && mouseX < mx2 + 10 && mouseY > my2 - 7.5 && mouseY < my2 + 7.5) {
dragging2 = true;
}
if (mouseX > mx3 - 10 && mouseX < mx3 + 10 && mouseY > my3 - 7.5 && mouseY < my3 + 7.5) {
dragging3 = true;
}
}
function mouseReleased() {
dragging1 = false;
dragging2 = false;
dragging3 = false;
}var reverb;
var x = 0;
var y = 0;
var mx1 = 30;
var my1 = 403;
var mx2 = 30;
var my2 = 410+30;
var mx3 = 30;
var my3 = 410+30+30;
var sliderStart = 30;
var sliderEnd = 470;
var dragging1 = false;
var dragging2 = false;
var dragging3 = false;
var r = 0;
var g = 0;
var b = 0;
function setup() {
createCanvas(500, 500);
background(255);
reverb = new p5.Reverb();
osc1 = new p5.Oscillator();
osc1.setType('triangle');
osc1.freq(random(1000,2000));
osc1.amp(0);
osc1.start();
osc1.phase(0)
reverb.process(osc1,3,2)
osc2 = new p5.Oscillator();
osc2.setType('triangle');
osc2.freq(random(500,1000));
osc2.amp(0);
osc2.start();
reverb.process(osc2,6,3)
osc3 = new p5.Oscillator();
osc3.setType('triangle');
osc3.freq(random(90,500));
osc3.amp(0);
osc3.start();
fr = frameRate(1);
}
function draw() {
if (dragging1) {
mx1 = mouseX;
}
if (dragging2) {
mx2 = mouseX; 
}
if (dragging3) {
mx3 = mouseX;
}
mx1 = constrain(mx1, sliderStart, sliderEnd);
mx2 = constrain(mx2, sliderStart, sliderEnd);
mx3 = constrain(mx3, sliderStart, sliderEnd);
var r = map(mx1,sliderStart,sliderEnd,0,255);
var g = map(mx2,sliderStart,sliderEnd,0,255);
var b = map(mx3,sliderStart,sliderEnd,0,255);
fr = map(mx2,sliderStart,sliderEnd,1,11);
noStroke();
strokeWeight(1)
if (random(3) < 1) {
fill(r,0,0);
triangle(x+10, y+3, x+3, y+17,x+17,y+17 );
osc1.amp(1, 0.02);
osc1.start();
osc1.stop(0.1);
} 
else if (random(3) > 1 && random(3) < 2 ) {
fill(0,g,0)
ellipseMode(CENTER)
ellipse(x+10, y+10, 14);
osc2.amp(1, 0.02);
osc2.start();
osc2.stop(0.1);
frameRate(fr)
} else  {
rectMode(CENTER)
fill(0,0,b)
rect(x+10,y+10,14,14) 
osc3.amp(1, 0.02);
osc3.start();
osc3.stop(0.1);
}
x+=20
if (x > width) {
x = 0;
y += 20;
}
if (y > 380) {
background(255,255,255,252);
x = 0;
y = 0;
}
noStroke()
fill(255)
rectMode(CORNER)
rect(0,380,500,120)
stroke(100)
strokeWeight(1)
line(0+30,380+30,width-30,380+30)
strokeWeight(1)
line(0+30,380+30+30,width-30,380+30+30)
strokeWeight(1)
line(0+30,380+30+30+30,width-30,380+30+30+30)
noStroke()
if (dragging1) {
fill('#a01700')
} else {
fill('#DC615F');
}
triangle(mx1, my1,mx1-8,my1+15,mx1+8,my1+15)
if (dragging2) {
fill('#2d600f')
} else {
fill('#81B463');
}
ellipseMode(CENTER)
ellipse(mx2, my2, 15,15,5)
if (dragging3) {
fill('#0a4961')
} else {
fill('#458DA8');
}
rectMode(CENTER)
rect(mx3, my3,15, 15,5)
}
function mousePressed() {
if (mouseX > mx1 -10 && mouseX < mx1 + 10 && mouseY > my1-7.5 && mouseY < my1 + 7.5) {
dragging1 = true;
}
if (mouseX > mx2 - 10 && mouseX < mx2 + 10 && mouseY > my2 - 7.5 && mouseY < my2 + 7.5) {
dragging2 = true;
}
if (mouseX > mx3 - 10 && mouseX < mx3 + 10 && mouseY > my3 - 7.5 && mouseY < my3 + 7.5) {
dragging3 = true;
}
}
function mouseReleased() {
dragging1 = false;
dragging2 = false;
dragging3 = false;
}var reverb;
var x = 0;
var y = 0;
var mx1 = 30;
var my1 = 403;
var mx2 = 30;
var my2 = 410+30;
var mx3 = 30;
var my3 = 410+30+30;
var sliderStart = 30;
var sliderEnd = 470;
var dragging1 = false;
var dragging2 = false;
var dragging3 = false;
var r = 0;
var g = 0;
var b = 0;
function setup() {
createCanvas(500, 500);
background(255);
reverb = new p5.Reverb();
osc1 = new p5.Oscillator();
osc1.setType('triangle');
osc1.freq(random(1000,2000));
osc1.amp(0);
osc1.start();
osc1.phase(0)
reverb.process(osc1,3,2)
osc2 = new p5.Oscillator();
osc2.setType('triangle');
osc2.freq(random(500,1000));
osc2.amp(0);
osc2.start();
reverb.process(osc2,6,3)
osc3 = new p5.Oscillator();
osc3.setType('triangle');
osc3.freq(random(90,500));
osc3.amp(0);
osc3.start();
fr = frameRate(1);
}
function draw() {
if (dragging1) {
mx1 = mouseX;
}
if (dragging2) {
mx2 = mouseX; 
}
if (dragging3) {
mx3 = mouseX;
}
mx1 = constrain(mx1, sliderStart, sliderEnd);
mx2 = constrain(mx2, sliderStart, sliderEnd);
mx3 = constrain(mx3, sliderStart, sliderEnd);
var r = map(mx1,sliderStart,sliderEnd,0,255);
var g = map(mx2,sliderStart,sliderEnd,0,255);
var b = map(mx3,sliderStart,sliderEnd,0,255);
fr = map(mx2,sliderStart,sliderEnd,1,11);
noStroke();
strokeWeight(1)
if (random(3) < 1) {
fill(r,0,0);
triangle(x+10, y+3, x+3, y+17,x+17,y+17 );
osc1.amp(1, 0.02);
osc1.start();
osc1.stop(0.1);
} 
else if (random(3) > 1 && random(3) < 2 ) {
fill(0,g,0)
ellipseMode(CENTER)
ellipse(x+10, y+10, 14);
osc2.amp(1, 0.02);
osc2.start();
osc2.stop(0.1);
frameRate(fr)
} else  {
rectMode(CENTER)
fill(0,0,b)
rect(x+10,y+10,14,14) 
osc3.amp(1, 0.02);
osc3.start();
osc3.stop(0.1);
}
x+=20
if (x > width) {
x = 0;
y += 20;
}
if (y > 380) {
background(255,255,255,252);
x = 0;
y = 0;
}
noStroke()
fill(255)
rectMode(CORNER)
rect(0,380,500,120)
stroke(100)
strokeWeight(1)
line(0+30,380+30,width-30,380+30)
strokeWeight(1)
line(0+30,380+30+30,width-30,380+30+30)
strokeWeight(1)
line(0+30,380+30+30+30,width-30,380+30+30+30)
noStroke()
if (dragging1) {
fill('#a01700')
} else {
fill('#DC615F');
}
triangle(mx1, my1,mx1-8,my1+15,mx1+8,my1+15)
if (dragging2) {
fill('#2d600f')
} else {
fill('#81B463');
}
ellipseMode(CENTER)
ellipse(mx2, my2, 15,15,5)
if (dragging3) {
fill('#0a4961')
} else {
fill('#458DA8');
}
rectMode(CENTER)
rect(mx3, my3,15, 15,5)
}
function mousePressed() {
if (mouseX > mx1 -10 && mouseX < mx1 + 10 && mouseY > my1-7.5 && mouseY < my1 + 7.5) {
dragging1 = true;
}
if (mouseX > mx2 - 10 && mouseX < mx2 + 10 && mouseY > my2 - 7.5 && mouseY < my2 + 7.5) {
dragging2 = true;
}
if (mouseX > mx3 - 10 && mouseX < mx3 + 10 && mouseY > my3 - 7.5 && mouseY < my3 + 7.5) {
dragging3 = true;
}
}
function mouseReleased() {
dragging1 = false;
dragging2 = false;
dragging3 = false;
var kick = new Tone.MembraneSynth({
"envelope" : {
"sustain" : 0,
"attack" : 0.02,
"decay" : 0.8
},
"octaves" : 10
}).toMaster();
var feedbackDelay = new Tone.PingPongDelay({
"delayTime" : "8t",
"feedback" : 0.25,
"wet" : 0.25
}).toMaster();
var snare = new Tone.NoiseSynth({
"volume" : -5,
"envelope" : {
"attack" : 0.001,
"decay" : 0.2,
"sustain" : 0
},
"filterEnvelope" : {
"attack" : 0.001,
"decay" : 0.1,
"sustain" : 0
}
}).connect(feedbackDelay);
var autoWah = new Tone.AutoWah(120, 10, -20).toMaster();
var bass = new Tone.MonoSynth({
"volume" : -10,
"envelope" : {
"attack" : 0.1,
"decay" : 0.3,
"release" : 2,
},
"filterEnvelope" : {
"attack" : 0.001,
"decay" : 0.01,
"sustain" : 0.5,
"baseFrequency" : 200,
"octaves" : 2.6
}
}).connect(autoWah);
var chord;
var feedbackDelay = new Tone.PingPongDelay({
"delayTime" : "16n",
"feedback" : 0.9,
"wet" : 0.1,
}).toMaster();
var synth = new Tone.PolySynth(6, Tone.Synth, {
"oscillator" : {
"partials" : [0, 2, 3, 4],
}
}).connect(feedbackDelay);
var leadDelay = new Tone.PingPongDelay("4n", 0.2).toMaster();
var tremolo = new Tone.Tremolo(2, 0.75).connect(leadDelay);
var lead = new Tone.MonoSynth({
detune  : 0 ,
oscillator  : {
type  : 'square'
}  ,
filter  : {
Q  : 6 ,
type  : 'lowpass' ,
rolloff  : -24
}  ,
envelope  : {
attack  : 0.1 ,
decay  : 0.1 ,
sustain  : 0.5 ,
release  : 1
}  ,
filterEnvelope  : {
attack  : 0.6 ,
decay  : 0.2 ,
sustain  : 0.5 ,
release  : 2 ,
baseFrequency  : 200 ,
octaves  : 7 ,
exponent  : 2
}
}).connect(tremolo);
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
noFill();
rect(0, 0, width, height/4);
rect(0, height/2, width, height/4);
rect(width/4, 0, width/4, height);
rect(width/2, 0, width/4, height);
}
function mousePressed() {
var  xPos = map(mouseX, 0, width, 0, 4);
var  yPos = map(mouseY, 0, height, 0, 4);
if (xPos < 1) {
if (yPos < 1) {
snare.triggerAttackRelease();
} else if (yPos > 1 && yPos < 2) {
kick.triggerAttackRelease('C3', '8n');
} else if (yPos > 2 && yPos < 3) {
kick.triggerAttackRelease('G2', '8n');
} else {
kick.triggerAttackRelease('C1', '8n');
}
} else if (xPos > 1 && xPos < 2) {
if (yPos < 1) {
bass.triggerAttackRelease('E2', '8n');
} else if (yPos > 1 && yPos < 2) {
bass.triggerAttackRelease('C2', '8n');
} else if (yPos > 2 && yPos < 3) {
bass.triggerAttackRelease('G1', '8n');
} else {
bass.triggerAttackRelease('C1', '8n');
}
} else if (xPos > 2 && xPos < 3) {
if (yPos < 1) {
chord = ['C4', 'E4', 'G4'];
} else if (yPos > 1 && yPos < 2) {
chord = ['G3', 'C4', 'E4'];
} else if (yPos > 2 && yPos < 3) {
chord = ['E3', 'G3', 'C4'];
} else {
chord = ['C3', 'E3', 'G3'];
}
synth.triggerAttackRelease(chord, '8n');
} else {
if (yPos < 1) {
lead.triggerAttackRelease('A4', '4n');
} else if (yPos > 1 && yPos < 2) {
lead.triggerAttackRelease('G4', '4n');
} else if (yPos > 2 && yPos < 3) {
lead.triggerAttackRelease('E4', '4n');
} else {
lead.triggerAttackRelease('C4', '4n');
}
}
}
var x = 0;
var y = 0;
var mx1 = 30;
var my1 = 403;
var mx2 = 30;
var my2 = 410+30;
var mx3 = 30;
var my3 = 410+30+30;
var sliderStart = 30;
var sliderEnd = 470;
var dragging1 = false;
var dragging2 = false;
var dragging3 = false;
var r = 0;
var g = 0;
var b = 0;
function setup() {
createCanvas(500, 500);
background(255);
osc1 = new p5.Oscillator();
osc1.setType('triangle');
osc1.freq(random(1000,2000));
osc1.amp(0);
osc1.start();
osc2 = new p5.Oscillator();
osc2.setType('triangle');
osc2.freq(random(500,1000));
osc2.amp(0);
osc2.start();
osc3 = new p5.Oscillator();
osc3.setType('triangle');
osc3.freq(random(90,500));
osc3.amp(0);
osc3.start();
fr = frameRate(1);
}
function draw() {
if (dragging1) {
mx1 = mouseX;
}
if (dragging2) {
mx2 = mouseX; 
}
if (dragging3) {
mx3 = mouseX;
}
mx1 = constrain(mx1, sliderStart, sliderEnd);
mx2 = constrain(mx2, sliderStart, sliderEnd);
mx3 = constrain(mx3, sliderStart, sliderEnd);
var r = map(mx1,sliderStart,sliderEnd,0,255);
var g = map(mx2,sliderStart,sliderEnd,0,255);
var b = map(mx3,sliderStart,sliderEnd,0,255);
fr = map(mx2,sliderStart,sliderEnd,1,11);
noStroke();
strokeWeight(1)
if (random(3) < 1) {
fill(r,0,0);
triangle(x+10, y+3, x+3, y+17,x+17,y+17 );
osc1.amp(1, 0.02);
osc1.start();
osc1.stop(0.1);
} 
else if (random(3) > 1 && random(3) < 2 ) {
fill(0,g,0)
ellipseMode(CENTER)
ellipse(x+10, y+10, 14);
osc2.amp(1, 0.02);
osc2.start();
osc2.stop(0.1);
frameRate(fr)
} else  {
rectMode(CENTER)
fill(0,0,b)
rect(x+10,y+10,14,14) 
osc3.amp(1, 0.02);
osc3.start();
osc3.stop(0.1);
}
x+=20
if (x > width) {
x = 0;
y += 20;
}
if (y > 380) {
background(255,255,255,252);
x = 0;
y = 0;
}
noStroke()
fill(255)
rectMode(CORNER)
rect(0,380,500,120)
stroke(100)
strokeWeight(1)
line(0+30,380+30,width-30,380+30)
strokeWeight(1)
line(0+30,380+30+30,width-30,380+30+30)
strokeWeight(1)
line(0+30,380+30+30+30,width-30,380+30+30+30)
noStroke()
if (dragging1) {
fill('#a01700')
} else {
fill('#DC615F');
}
triangle(mx1, my1,mx1-8,my1+15,mx1+8,my1+15)
if (dragging2) {
fill('#2d600f')
} else {
fill('#81B463');
}
ellipseMode(CENTER)
ellipse(mx2, my2, 15,15,5)
if (dragging3) {
fill('#0a4961')
} else {
fill('#458DA8');
}
rectMode(CENTER)
rect(mx3, my3,15, 15,5)
}
function mousePressed() {
if (mouseX > mx1 -10 && mouseX < mx1 + 10 && mouseY > my1-7.5 && mouseY < my1 + 7.5) {
dragging1 = true;
}
if (mouseX > mx2 - 10 && mouseX < mx2 + 10 && mouseY > my2 - 7.5 && mouseY < my2 + 7.5) {
dragging2 = true;
}
if (mouseX > mx3 - 10 && mouseX < mx3 + 10 && mouseY > my3 - 7.5 && mouseY < my3 + 7.5) {
dragging3 = true;
}
}
function mouseReleased() {
dragging1 = false;
dragging2 = false;
dragging3 = false;
}function setup(){
createCanvas(600,600);
}
function draw(){
stroke(2);
line(width*0.25,0,height*0.25,height)
stroke(2);
line(width*0.25*2,0,height*0.25*2,height)
stroke(2);
line(width*0.25*3,0,height*0.25*3,height)
stroke(2);
line(0,height*0.25,width,height*0.25)
stroke(2);
line(0,height*0.25*2,width,height*0.25*2)
stroke(2);
line(0,height*0.25*3,width,height*0.25*3)
circle();
}
function circle(){
var xPos = map(mouseX,0,width,0,4);
var yPos = map(mouseY,0,height,0,4);
if(mouseIsPressed){
if (xPos < 1) {
if (yPos < 1) {
noStroke();
fill(255,0,0)
ellipse(width*0.25/2, height*0.25/2,70,70)
} else if (yPos > 1 && yPos < 2) {
noStroke();
fill(255,0,0)
ellipse(width*0.25/2, (height/2)*0.75,70,70)
} else if (yPos > 2 && yPos < 3) {
noStroke();
fill(255,0,0)
ellipse(width*0.25/2,height/2+height*0.25/2,70,70)
} else {
noStroke();
fill(255,0,0)
ellipse(width*0.25/2,height/2+height*0.25/2+height/4,70,70)
}
} else if (xPos > 1 && xPos < 2) {
if (yPos < 1) {
noStroke();
fill(255,0,0)
ellipse(width/2*0.75, height*0.25/2,70,70)
} else if (yPos > 1 && yPos < 2) {
noStroke();
fill(255,0,0)
ellipse(width/2*0.75, (height/2)*0.75,70,70)
} else if (yPos > 2 && yPos < 3) {
noStroke();
fill(255,0,0)
ellipse(width/2*0.75,height/2+height*0.25/2,70,70)
} else {
noStroke();
fill(255,0,0)
ellipse(width/2*0.75,height/2+height*0.25/2+height/4,70,70)
} 
}else if (xPos > 2 && xPos < 3) {
if (yPos < 1) {
noStroke();
fill(255,0,0)
ellipse(width/2+width*0.25/2, height*0.25/2,70,70)
} else if (yPos > 1 && yPos < 2) {
noStroke();
fill(255,0,0)
ellipse(width/2+width*0.25/2, (height/2)*0.75,70,70)
} else if (yPos > 2 && yPos < 3) {
noStroke();
fill(255,0,0)
ellipse(width/2+width*0.25/2,height/2+height*0.25/2,70,70)
} else {
noStroke();
fill(255,0,0)
ellipse(width/2+width*0.25/2,height/2+height*0.25/2+height/4,70,70)
}
}else if (xPos > 3) {
if (yPos < 1) {
noStroke();
fill(255,0,0)
ellipse(width/2+width*0.25/2+width/4, height*0.25/2,70,70)
} else if (yPos > 1 && yPos < 2) {
noStroke();
fill(255,0,0)
ellipse(width/2+width*0.25/2+width/4, (height/2)*0.75,70,70)
} else if (yPos > 2 && yPos < 3) {
noStroke();
fill(255,0,0)
ellipse(width/2+width*0.25/2+width/4,height/2+height*0.25/2,70,70)
} else {
noStroke();
fill(255,0,0)
ellipse(width/2+width*0.25/2+width/4,height/2+height*0.25/2+height/4,70,70)
}
}
}
}
var osc1;
var osc2;
var playing = false;
var m;
var n;
function setup() {
createCanvas(600,600);
osc1= new p5.Oscillator();
osc1.setType('sine');
osc1.freq(60,180);
osc1.amp(0);
osc1.start();
osc2= new p5.Oscillator();
osc2.setType('sine');
osc2.freq(60,180);
osc2.amp(0);
osc2.start();
}
function draw() {
background(0,20);
}
function mouseDragged() {
fill(255,0,0);
noStroke();
ellipse(mouseX,mouseY, 20,20);
var m = map(mouseY, height, 0, 60, 180)
osc1.freq(m);
var n = map(mouseX,0,width, 181, 600)
osc2.freq(n);
if (!playing) {
osc1.amp(1, 0.05);
osc2.amp(1, 0.05);
playing = true;
} else {
osc1.amp(0, 0.5);
osc2.amp(0, 0.5);
playing = false;
} 
}function setup(){
createCanvas(600,600);
}
function draw(){
stroke(2);
line(width*0.25,0,height*0.25,height)
stroke(2);
line(width*0.25*2,0,height*0.25*2,height)
stroke(2);
line(width*0.25*3,0,height*0.25*3,height)
stroke(2);
line(0,height*0.25,width,height*0.25)
stroke(2);
line(0,height*0.25*2,width,height*0.25*2)
stroke(2);
line(0,height*0.25*3,width,height*0.25*3)
circle();
}
function circle(){
var xPos = map(mouseX,0,width,0,4);
var yPos = map(mouseY,0,height,0,4);
if(mouseIsPressed){
if (xPos < 1) {
if (yPos < 1) {
noStroke();
fill(255,0,0)
ellipse(width*0.25/2, height*0.25/2,70,70)
} else if (yPos > 1 && yPos < 2) {
} else if (yPos > 2 && yPos < 3) {
} else {
}
} else if (xPos > 1 && xPos < 2) {
}
}
}	var chord;
var feedbackDelay = new Tone.PingPongDelay({
"delayTime" : "4t",
"feedback" : 0.6,
"wet" : 0.3,
}).toMaster();
var synth = new Tone.PolySynth(6, Tone.Synth, {
"oscillator" : {
"partials" : [0, 2, 3, 4],
}
}).connect(feedbackDelay);
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
noStroke();
fill(255);
rect(0, 0, width, height/4);
rect(0, height/2, width, height/4)
}
function mousePressed() {
var  yPos = map(mouseY, 0, height, 0, 4);
if (yPos < 1) {
chord = ['C4', 'E4', 'G4'];
} else if (yPos > 1 && yPos < 2) {
chord = ['G3', 'C4', 'E4'];
} else if (yPos > 2 && yPos < 3) {
chord = ['E3', 'G3', 'C4'];
} else {
chord = ['C3', 'E3', 'G3'];
}
synth.triggerAttackRelease(chord, '8n');
} 
var kinectron = null;
var x = 0;
var y = 0;
var bx = 0;
var by = 0;
var bxdir = 1;
var bydir = 1;
function setup() { 
createCanvas(400, 400);
kinectron = new Kinectron("172.16.231.35");
kinectron.makeConnection();
kinectron.startTrackedJoint(kinectron.HANDRIGHT, gotRightHand);
} 
function gotRightHand(hand) {
console.log(hand);
x = hand.depthX * width;
y = hand.depthY * height;
}
function draw() { 
background(220);
ellipse(x, y, 50, 50);
rectMode(CENTER);
push()
translate(bx,by);
rotate(radians(25+frameCount));
rect(0, 0, 50, 50);
pop();
bx = bx + bxdir;
by = by + bydir;
if (bx > width || bx < 0) {
bxdir = bxdir * -1; 
}
if (by > height || by < 0) {
bydir = bydir * -1; 
}
if (dist(bx, by, x, y) < 50) {
fill(random(255),random(255),random(255));
bx = x;
by = y;
}
}
var x = 0;
var y = 0;
var vx = 0;
var vy = 0;
var ax = 0;
var ay = 0;
function setup() {
createCanvas(windowWidth, windowHeight);
console.log('gravity');
}
function draw() {
background(255);
ax = map(rotationY, -90, 90, -1, 1);
ay = map(rotationX, -90, 90, -1, 1);
vx = vx + ax;
vy = vy + ay;
y = y + vy;
x = x + vx;
vx = vx * 0.99;
vy = vy * 0.99;
if (x < 0) {
x = 0;
vx = -vx;
}
if (y < 0) {
y = 0;
vy = -vy;
}
if (x > width) {
x = width;
vx = -vx;
}
if (y > height) {
y = height;
vy = -vy;
}
ellipse(x, y, 30, 30);
}let audio;
let level;
function preload() {
audio = loadSound("test.mp3"); 
}
function setup() { 
createCanvas(400, 400);
level = new p5.Amplitude();
} 
function draw() { 
background(220);
var speed = map(mouseY, 0, height, 0, 4);
audio.rate(speed);  
var vol = map(mouseY, 0, height, 0, 1);
audio.amp(vol);
if (!audio.isPlaying()) {
audio.play(); 
}
fill(0,5);
ellipse(width/2, height/2, level.getLevel()*1000, level.getLevel()*1000);
}
function mousePressed() {
audio.play(); 
}let audio;
let button;
function preload() {
audio=loadSound("background.MP3");
}
function setup() { 
createCanvas(400, 400);
button = createButton('toggle');
button.mousePressed(toggleSong);
audio.play;
} 
function draw() { 
background(220);
}
function toggleSong(){
if(audio.isPlaying()){
audio.pause();
} else {
audio.play();
}
var skull, song;
var rms, rmsMapped;
var ghostReleased = false;
var ghostCatched = false;
var data, previousSendValue, currentSendValue;
var ghostReleasedAction = false;
var ghostCatchedAction = false;
var button;
function preload(){
skull = loadModel('assets/skull_lowPoly.obj');
song = loadSound('assets/POL-children-of-shadows-short.wav');
fortunetellings = loadStrings("assets/wish.txt");
}
function setup() {
createCanvas(1440, 800,WEBGL);
analyzer = new p5.Amplitude();
analyzer.setInput(song);
currentSendValue = previousSendValue;
}
function draw() {
background(0);
pointLight(140, 140, 140, 500-mouseX , 500-mouseY, 500-mouseY);
pointLight(140, 140, 140,0,0,-100);
rms = analyzer.getLevel();
rmsMapped = map(rms,-0.3,0.3,0,255);
if(ghostReleased){
button = createButton(fortunetellings[fortuneLine]);
button.position(width/2 - width/3, height*7/9);
button.size(width*2/3,height/8);
button.style("color","#fff");
button.style("background-color","#000");
button.style("border","0");
button.style("font-size","30px");
push();
translate(0,-5,400 + rms*500);
rotateY(frameCount * -0.001);
rotateX(50);
model(skull);
pop();
}
if(ghostCatched){
button = createButton("");
button.position(width/2 - width/3, height*7/9);
button.size(width*2/3,height/8);
button.style("color","#fff");
button.style("background-color","#000");
button.style("border","0");
}
}
function showGhost(){
ghostReleased = true;
ghostCatched = false;
song.loop();
fortuneLine = int(random(0,28));
}
function stopGhost(){
ghostReleased = false;
ghostCatched = true;
song.stop();
}
for (var i = 0; i < portList.length; i++) {}}
previousSendValue = currentSendValue;
currentSendValue = parseInt(data);
console.log(currentSendValue);
if( currentSendValue - previousSendValue == 1)
ghostReleasedAction = true;
else if( currentSendValue - previousSendValue == -1)
ghostCatchedAction = true;
else if( currentSendValue - previousSendValue == 9)
ghostCatchedAction = true;
if(ghostReleasedAction){
showGhost();
} else if (ghostCatchedAction)
stopGhost();
ghostReleasedAction = false;
ghostCatchedAction = false;
}
function serverConnected() {console.log('connected to server.');}
var bgColor;
function setup() { 
createCanvas(windowWidth, windowHeight);
bgColor = color(255,255,255)
} 
function deviceMoved(){
var r = random(255);
var g = random(255);
var b = random(255);
bgColor = (r, g, b)
}
function draw() { 
background(bgColor);
fill(0);
for(var i; i < touches.length; i++){
ellipse(touches[i].x,touches[i].y,100,100);
}
}
function windowResized(){
resizeCanvas(windowWidth, windowHeight)
}
var weather, temp, humidity, i;
var sf=[];
var s=[];
var apiKey = '&APPID=001b0f58045147663b1ea518d34d88b4';
var units = '&units=metric';
var input;
function setup() {
createCanvas(400, 400);
var button = select('#submit');
button.mousePressed(result);
input = select('#city');
}
function result() {
var url = api + input.value() + apiKey + units;
loadJSON(url, gotData);
}
function gotData(info) {
weather = info;
temp = weather.main.temp;
humidity = weather.main.humidity;
for (var j = 0; j < humidity*10; j++) {
sf[j] = new Snowflake(random(width),random(height/2,height),2,2);
}
for (var h = 0; h < 50; h++) {
s[h] = new Snowflake(random(width),random(height),2,2);
}
}
function draw() {
if(temp>-10 && temp <1){
for (var h = 0; h < s.length; h++) {
s.display(2);
s.move2();
}
fill('#faf9ff');
} else if (temp>1 && temp <= 5){
fill('#DFF6FF');
} else if (temp > 5 && temp <=10){
fill('#94C3EC');
}else if(temp >10 && temp <=20){
fill('#46FF6B');
}else if(temp > 20 && temp <=30){
fill('#E1FF46');
}else if(temp > 30 && temp <=40){
fill('#FFAB00');
}else if(temp>40){
fill('#FF3C00');
}
rect(0,0,width,height)
noStroke();
if(temp){
fill(0)
textSize(30);
text("TEMPERATURE", 20, 70);
textSize(20)
text(temp, 20, 100)
}
for (var j = 0; j < sf.length; j++) {
sf[j].display();
sf[j].move();
}
if(humidity){
fill(0)
textSize(30);
text("HUMIDITY", 20, height/2+70);
textSize(20)
text(humidity, 20, height/2+100)
}   
}
let bgm;
let scream;
var img1;
var img2;
var apiKey = "&api_key=dc6zaTOxFJmzC";
var query = "&q=scream munch edvard";
var url = api + apiKey + query;
function setup() {
noCanvas();
loadSound('background.MP3', loaded);
loadSound('scream.mp3', loaded2);
loadJSON(url, gotData);
if (bgm){
bgm.setVolume(0.001);
}
}
function loaded(sound){
bgm = sound;
}
function loaded2(sound){
scream = sound;
}
function gotData(giphy) {
for (var i = 0; i < 1; i++) {
img1 = createImg(giphy.data[0].images.original.url);
img1.size(400, 500);
}
}
function draw() {
if (bgm){
if (bgm.isPlaying() == false) {
bgm.play()
}
}
}
function mousePressed() {
loadJSON(url,updateImage);
scream.play();
}
function updateImage(giphy){
img2 = createImg(giphy.data[1].images.original.url);
img2.size(400, 500);
img1.hide();
}
let bgm;
let scream;
let level;
function preload() {
bgm=loadSound('background.MP3');
scream=loadSound('scream.mp3');
}
function setup() { 
createCanvas(400, 400);
bgm.setVolume(0.001);
} 
function draw() { 
background(220);
audio.pan(panValue);
if (audio.isPlaying()){
}else{
audio.play();
if (bgm.isPlaying()==false){
bgm.play()
}
var apiKey = "&api_key=dc6zaTOxFJmzC";
var query = "&q=scream munch edvard";
var img;
var img2;
var url = api + apiKey + query;
function setup() {
noCanvas();
loadJSON(url, gotData);
} 
function mousePressed(){
loadJSON(url, updateImage);
}
function gotData(giphy) {
for (var i = 0; i < 1; i++) {
img = createImg(giphy.data[0].images.original.url);
img.size(200,200);
}
}
function updateImage(giphy){
img2 = createImg(giphy.data[1].images.original.url);
img2.size(200,200);
img.hide()
}
let video;
function setup() { 
createCanvas(400, 400);
video = createCapture(VIDEO);
video.hide();
} 
function draw() { 
background(220);
image(video,0,0,width,height);
loadPixel();
for (var w=0; w<width; w++){
for (var h= 0; h<height; h++){
var r = pixels[4*(h*width) + w];
set(w,h,[r,r,r,0]);
}
}
}
let audio;
let level;
function preload() {
audio=loadsound("test.mp3");
}
function setup() { 
createCanvas(400, 400);
level = new p5.Amplitude();
var input = new p5.Audioin();
} 
function draw() { 
background(220);
var panValue = map(mousex,0,width,-1,1);
audio.pan(panValue);
if (audio.isPlaying()){
}else{
audio.play();
}
if (audio.isPlaying()==false){
audio.play()
}
}
function mousePressed(){
audio.play();
}var weather, temp, humidity, i;
var sf=[];
var apiKey = '&APPID=001b0f58045147663b1ea518d34d88b4';
var units = '&units=metric';
var input;
function setup() {
createCanvas(400, 400);
var button = select('#submit');
button.mousePressed(result);
input = select('#city');
}
function result() {
var url = api + input.value() + apiKey + units;
loadJSON(url, gotData);
}
function gotData(info) {
weather = info;
temp = weather.main.temp;
humidity = weather.main.humidity;
for (var j = 0; j < humidity*10; j++) {
sf[j] = new Snowflake(random(width),random(height/2,height),2,2);
}
}
function draw() {
if(temp>-10 && temp <1){
fill('#faf9ff');
} else if (temp>1 && temp <= 5){
fill('#DFF6FF');
} else if (temp > 5 && temp <=10){
fill('#94C3EC');
}else if(temp >10 && temp <=20){
fill('#46FF6B');
}else if(temp > 20 && temp <=30){
fill('#E1FF46');
}else if(temp > 30 && temp <=40){
fill('#FFAB00');
}else if(temp>40){
fill('#FF3C00');
}
rect(0,0,width,height)
noStroke();
if(temp){
fill(0)
textSize(30);
text("TEMPERATURE", 20, 70);
textSize(20)
text(temp, 20, 100)
}
for (var j = 0; j < sf.length; j++) {
sf[j].display();
sf[j].move();
}
if(humidity){
fill(0)
textSize(30);
text("HUMIDITY", 20, height/2+70);
textSize(20)
text(humidity, 20, height/2+100)
}   
}
var weather, temp, humidity;
var apiKey = '&APPID=001b0f58045147663b1ea518d34d88b4';
var units = '&units=metric';
var input;
function setup() {
createCanvas(400, 400);
var button = select('#submit');
button.mousePressed(result);
input = select('#city');
}
function result() {
var url = api + input.value() + apiKey + units;
loadJSON(url, gotData);
}
function gotData(info) {
weather = info;
temp = weather.main.temp;
humidity = weather.main.humidity;
}
function draw() {
if(temp>-10 && temp <1){
fill('#faf9ff');
} else if (temp>1 && temp <= 5){
fill('#DFF6FF');
} else if (temp > 5 && temp <=10){
fill('#94C3EC');
}else if(temp >10 && temp <=20){
fill('#46FF6B');
}else if(temp > 20 && temp <=30){
fill('#E1FF46');
}else if(temp > 30 && temp <=40){
fill('#FFAB00');
}else if(temp>40){
fill('#FF3C00');
}
rect(0,0,width,height)
noStroke();
console.log(temp);
fill(0)
textSize(30);
text("Temperature", 20, 70);
if(temp){
textSize(20)
text(temp, 20, 100)
}
}
var fortunetellings;
function preload() {
fortunetellings = loadStrings("fortunestrings.txt");
}
function setup() { 
createCanvas(400, 400);
} 
var counter = 0;
function draw() { 
background(220);
textAlign(CENTER)
text(fortunetellings[counter], width/2,370);  
}
function mousePressed() {
counter++;
function setup() {
}
function serverConnected() {
}
function portOpen() {
}
console.log(data);
}
}
function portClose() {
}
function setup() {
createCanvas(640, 480);
}var recta=[];
function setup(){
createCanvas(600, 600)
var i = 0;
for(var x = 0; x < width; x+=60){
for(var y = 0; y < height; y+=60){
}
}
}
recta[i] = new Rectangle(x,y,60,60,0)
i++;
function draw(){
background(20)
for(var i=0;i<recta.length; i++){
push();
recta[i].display();
pop();
}
}var r;
function setup(){
createCanvas(600, 600)
recta[i] = new Rectangle(0,0,60,60,0)
r = new Rectangle(0,0,60,60,0)
}
function draw(){
background(10)
r.display();
r.move();
}var recta=[];
function setup(){
createCanvas(600, 600)
for(var i=0; i<11; i++){
recta[i] = new Rectangle(0,0,60,60,0)
}
}
function draw(){
background(10)
for(var i=0; i<11; i++){
push();
translate (30,30);
recta[i].display();
pop();
recta[i].move();
}
}var recta=[];
function setup(){
createCanvas(600, 600)
for(var i=0; i<11; i++){
recta[i] = new Rectangle(0,0,60,60,0)
}
}
function draw(){
background(10)
for(var i=0; i<11; i++){
recta[i].display();
recta[i].move();
}
}var ex =0;
var bx = 0;
var tt = "1 2 3 4 5 6 7 8 9 10 ";
function setup() { 
createCanvas(500, 500);
} 
function draw() { 
background(220);
fill(230,0,0)
textSize(80)
textAlign(LEFT)
text("1 2 3 4 5 6 7 8 9 10 ",ex,height/2)
fill(0,0,0)
textSize(80)
textAlign(LEFT)
text("1 2 3 4 5 6 7 8 9 10 ",bx+textWidth(tt),height/2)
ex--;
bx--;
if (ex+textWidth(tt)<0){
ex=bx+textWidth(tt)
}
}
var ex = 499
var bx = 500
var tt = "1 2 3 4 5 6 7 8 9 10 "
function setup() { 
createCanvas(500, 500);
} 
function draw() {
background(220);
textSize(80)
textAlign(LEFT)
text("1 2 3 4 5 6 7 8 9 10 ", ex, height/2)
if( (ex+ textWidth(tt)) <=0){
ex = textWidth(tt)
}
else {
ex--
}
if( (bx+ textWidth(tt)) <=0){
bx = 500
}
else {
if ( (ex+textWidth(tt) )< 500  || (bx <= 499)) {
bx-- 
}
}
text("1 2 3 4 5 6 7 8 9 10 ", bx, height/2)
}
var r={
x: 0,
y: 0,
w: 60,
h: 80,
angle: 0
}
function setup() { 
createCanvas(500, 500);
angleMode(degrees)
rectMode(CENTER)
} 
function displayRect(){
push();
translate (r.w,r.y);
noFill ()
stroke(200,0,0)
strokeWeight (3)
rotate(r.angle)
rect(r.x,r.y,r.w,r.h)
pop();
}
function moveRect(){
r.angle = r.angle + 0.01
}
function draw() { 
background(16,0,0)
displayRect();
moveRect();
}
var r={
x: 0,
y: 0,
w: 60,
h: 80,
angle: 0
}
function setup() { 
createCanvas(500, 500);
angleMode(degrees)
rectMode(CENTER)
} 
function displayRect(){
push();
translate (r.w,r.y);
noFill ()
stroke(200,0,0)
strokeWeight (3)
rotate(r.angle)
rect(r.x,r.y,r.w,r.h)
pop();
}
function moveRect(){
r.angle = r.angle + 0.01
}
function draw() { 
background(16,0,0)
displayRect();
moveRect();
}
var x2;
var y2;
var w;
var h;
var lx1=640;
var lx2=670;
var l1y=300;
var l2y=350;
var l3y=400;
var l4y=450;
var img;
function setup() { 
createCanvas(800, 700);
img =loadImage("/Users/huiyi/Desktop/hbo.jpeg");
} 
var d = 50;
var state = false;
var channel1 =false;
var channel2=false;
function draw() {
background(253, 237, 236);
image = (img, 0, 0);
frameRate(15);
strokeWeight(10);
fill(212, 230, 241)
rect(200, 200, 500, 400, 50);
x2=225;
y2=240;
w=390;
h=320;
if (state) {
stroke(10);
fill(213, 216, 220);
rect(x2,y2,w,h,50);
} 
else if (channel1){
stroke(10);
fill(87,45,136);
rect(x2,y2,w,h,50);
push();
translate(width/2,height/2);
noStroke();
fill(255);
textSize(128);
text("ITP",-75,50);
textSize(32);
fill(0);
text("NYU | TISCH",-70,100);
pop();
}
else if (channel2){
image(img,x2,y2,390,320);
}
else{
push();
translate(x2,y2);
var delta=random(55,60);
for (var y1=0+random(-2,2);y1<h;y1=y1+0.5){
for (var x1=5+random(-10,10);x1<(w-30);x1=x1+delta+5){
stroke((x1+2),(255-x1*3),random(150,255),50);
strokeWeight(2);
line(x1,y1,x1+delta,y1);
}
}
pop();
}
strokeCap(ROUND);
fill(212, 230, 241  );
rect(290, 600, 250, 20, 20, 15, 10, 5);
strokeWeight(10);
fill(212, 230, 241  )
arc(420, 204, 90, 80, 135, 135, OPEN);
fill(230)
line(520, 120, 415, 164);
line(370, 120, 415, 164);
line(lx1, l1y, lx2, l1y);
line(lx1, l2y, lx2, l2y);
line(lx1, l3y, lx2, l3y);
line(lx1, l4y, lx2, l4y);
fill(213, 216, 220)
ellipse(655, 530, d, d);
}
function mousePressed() {
if (dist(mouseX, mouseY, 655, 530) < d/2) {
state = !state;
}
else if (mouseX>=lx1&&mouseX<=lx2&&mouseY<=(l1y+5)&&mouseY>=(l1y-5)){
channel1 = !channel1;
}
else if (mouseX>=lx1&&mouseX<=lx2&&mouseY<=(l2y+5)&&mouseY>=(l2y-5)){
channel2=!channel2;
}
}
var x = 0;
var y = 0;
var mx1 = 30;
var my1 = 403;
var mx2 = 30;
var my2 = 410+30;
var mx3 = 30;
var my3 = 410+30+30;
var sliderStart = 30;
var sliderEnd = 470;
var dragging1 = false;
var dragging2 = false;
var dragging3 = false;
var r = 0;
var g = 0;
var b = 0;
function setup() {
createCanvas(500, 500);
background(255);
}
function draw() {
if (dragging1) {
mx1 = mouseX;
}
if (dragging2) {
mx2 = mouseX; 
}
if (dragging3) {
mx3 = mouseX;
}
mx1 = constrain(mx1, sliderStart, sliderEnd);
mx2 = constrain(mx2, sliderStart, sliderEnd);
mx3 = constrain(mx3, sliderStart, sliderEnd);
var r = map(mx1,sliderStart,sliderEnd,0,255);
var g = map(mx2,sliderStart,sliderEnd,0,255);
var b = map(mx3,sliderStart,sliderEnd,0,255);
noStroke();
strokeWeight(1)
if (random(3) < 1) {
fill(r,0,0);
triangle(x+10, y+3, x+3, y+17,x+17,y+17 );
} 
else if (random(3) > 1 && random(3) < 2 ) {
fill(0,g,0)
ellipseMode(CENTER)
ellipse(x+10, y+10, 14);
} else  {
rectMode(CENTER)
fill(0,0,b)
rect(x+10,y+10,14,14)  
}
frameRate(20)
x+=20
if (x > width) {
x = 0;
y += 20;
}
if (y > 380) {
background(255,255,255,252);
x = 0;
y = 0;
}
noStroke()
fill(255)
rectMode(CORNER)
rect(0,380,500,120)
stroke(100)
strokeWeight(1)
line(0+30,380+30,width-30,380+30)
strokeWeight(1)
line(0+30,380+30+30,width-30,380+30+30)
strokeWeight(1)
line(0+30,380+30+30+30,width-30,380+30+30+30)
noStroke()
if (dragging1) {
fill('#a01700')
} else {
fill('#DC615F');
}
triangle(mx1, my1,mx1-8,my1+15,mx1+8,my1+15)
if (dragging2) {
fill('#2d600f')
} else {
fill('#81B463');
}
ellipseMode(CENTER)
ellipse(mx2, my2, 15,15,5)
if (dragging3) {
fill('#0a4961')
} else {
fill('#458DA8');
}
rectMode(CENTER)
rect(mx3, my3,15, 15,5)
}
function mousePressed() {
if (mouseX > mx1 -10 && mouseX < mx1 + 10 && mouseY > my1-7.5 && mouseY < my1 + 7.5) {
dragging1 = true;
}
if (mouseX > mx2 - 10 && mouseX < mx2 + 10 && mouseY > my2 - 7.5 && mouseY < my2 + 7.5) {
dragging2 = true;
}
if (mouseX > mx3 - 10 && mouseX < mx3 + 10 && mouseY > my3 - 7.5 && mouseY < my3 + 7.5) {
dragging3 = true;
}
}
function mouseReleased() {
dragging1 = false;
dragging2 = false;
dragging3 = false;
}
var ex = 0;
var bx = 0;
var rx = 0;
var nx = 0;
var tx = 0;
var mx = 0;
var th = "01 02 03 04 05 06 07 08 09 10 11 12 ";
var tm = "01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 ";
var ts = "01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 ";
var tst = "01 "
var xread;
function setup() { 
createCanvas(500, 500);
} 
function draw() { 
background(220);
ex = width;  
} else {
if (bx + textWidth(th) < width || ex!=width){
ex=ex-0.002
}
}
textSize(50)
noStroke();
fill(0)
textAlign(LEFT)
text("01 02 03 04 05 06 07 08 09 10 11 12 ",ex,height/2)
text("01 02 03 04 05 06 07 08 09 10 11 12 ",bx,height/2);
bx = width;
} else {
bx=bx-0.002
}
}
noFill();
stroke(0);
rectMode(CENTER);
rect(width/2,height/2-20,60,60);
rx = width;  
} else {
if (nx + textWidth(tm) < width || rx!=width){
rx-=0.02
}
}
textSize(50)
noStroke();
fill(0)
textAlign(LEFT)
text("01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 ",rx,height/2+50)
text("01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 ", nx,height/2);
nx = width;
} else {
nx-=0.02
}
}
noFill();
stroke(0);
rectMode(CENTER);
rect(width/2,height/2-20,60,60);
var x = 0;
var y = 0;
var mx1 = 30;
var my1 = 410
var mx2 = 30;
var my2 = 410+30;
var mx3 = 30;
var my3 = 410+30+30;
var sliderR;
var sliderG;
var sliderB;
function setup() {
createCanvas(500, 500);
background(150);
sliderR = createSlider(0,100,0)
sliderG = createSlider(0,100,0)
sliderB = createSlider(0,100,0)
}
function draw() {
valueR = sliderR.value()
valueG = sliderG.value()
valueB = sliderB.value()
noFill()
strokeWeight(1)
if (random(3) < 1) {
fill(valueR,0,0);
triangle(x+10, y+3, x+3, y+17,x+17,y+17 );
} 
else if (random(3) > 1 && random(3) < 2 ) {
fill(0,valueG,0)
ellipseMode(CENTER)
ellipse(x+10, y+10, 14);
} else  {
rectMode(CENTER)
fill(0,0,valueB)
rect(x+10,y+10,14,14)  
}
frameRate(10)
x+=20
if (x > width) {
x = 0;
y += 20;
}
if (y > 380) {
background(150);
x = 0;
y = 0;
}
noStroke()
fill(30)
rectMode(CORNER)
rect(0,380,500,120)
stroke(100)
strokeWeight(1)
line(0+30,380+30,width-30,380+30)
strokeWeight(1)
line(0+30,380+30+30,width-30,380+30+30)
strokeWeight(1)
line(0+30,380+30+30+30,width-30,380+30+30+30)
noStroke()
fill(255,0,0)
rectMode(CENTER)
rect(mx1, my1,5, 20,10)
fill(0,255,0)
rectMode(CENTER)
rect(mx2, my2, 5, 20,10)
fill(0,0,255)
rectMode(CENTER)
rect(mx3, my3,5, 20,10)
}
var t1, t2, xpos, ypos;
function setup() { 
createCanvas(400, 400);
xpos= width;
ypos = height/2;
} 
function draw() {
background(220);
t2 = second();
text("1", xpos--, ypos);
console.log(t1);
}
function NumObj {
this.xpos
this.ypos
this.content = "1";
}var ex =250;
var bx = 500;
var tt = "1 2 3 4 5 6 7 8 9 10 ";
function setup() { 
createCanvas(500, 500);
} 
function draw() { 
background(220);
ex = width;  
} else {
if (bx + textWidth(tt) < width || ex != width){
ex--
}
}
textSize(80)
textAlign(LEFT)
text("1 2 3 4 5 6 7 8 9 10 ",ex,height/2)
text("1 2 3 4 5 6 7 8 9 10 ",bx,height/2);
bx = width;
} else {
bx--
}
}
}var ball = {
x: 0,
y: 0,
d: 0,
xspeed: 1
}
var button = {
x: 0,
y: 0,
d: 100
}
function setup() { 
createCanvas(400, 400);
ball.x = random(0, width);
ball.y = random(0, height);
ball.d = random(10,30);
button.x=width-button.d;
button.y=height-button.d;
} 
function draw() { 
background(220);
rect(button.x,button.y,button.d,button.d);
if (mouseIsPressed && 
mouseX > button.x &&
mouseX < button.x + button.d &&
mouseY > button.y && mouseY < button.y + button.d){
fill(0);
}
else {
fill(255);
}
ellipse(ball.x,ball.y,ball.d);
ball.x = ball.x + ball.xspeed;
if (ball.x > width || ball.x <0){
ball.xspeed=ball.xspeed * -1
}
}var middle = 0
function setup() { 
createCanvas(500, 500);
} 
function draw() { 
background(220);
textSize(20)
textAlign(LEFT)
text("1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60",middle,height/2)
middle=middle - 1
}var angleOne=0
var angleTwo=0
var angleThree=0
var angleFour=0
var angleFive=0
var angleSix=12
var angleSeven=0
var angleEight=0
var angleNine=0
function setup() { 
createCanvas(500, 500);
angleMode(degrees)
} 
function draw() { 
background(16,0,0)
push()
translate (120,120)
rotate(angleOne)
rectMode (CENTER)
noFill ()
stroke(170,0,0)
strokeWeight (4)
rect (0,0,200,70)	
pop()
angleOne=angleOne + 0.01
push()
translate (30,30)
rotate(angleTwo)
rectMode (CENTER)
noFill ()
stroke(250,0,0)
strokeWeight (4)
rect (0,0,30,15)	
pop()
angleTwo=angleTwo - 0.07
push()
translate (160,257)
rotate(angleThree)
rectMode (CENTER)
noFill ()
stroke(255,0,0)
strokeWeight (4)
rect (0,0,70,45)	
pop()
angleThree=angleThree - 0.04
push()
translate (-30,270)
rotate(angleFour)
rectMode (CENTER)
noFill ()
stroke(220,0,0)
strokeWeight (4)
rect (0,0,170,138)	
pop()
angleFour=angleFour - 0.02
push()
translate (100,251)
rotate(angleFive)
rectMode (CENTER)
noFill ()
stroke(255,255,0)
strokeWeight (4)
rect (0,0,33,33)	
pop()
angleFive=angleFive + 0.09
push()
translate (360,100)
rotate(angleSix)
rectMode (CENTER)
noFill ()
stroke(130,0,0)
strokeWeight (4)
rect (0,0,200,200)	
pop()
angleSix=angleSix - 0.006
push()
translate (450,380)
rotate(angleSeven)
rectMode (CENTER)
noFill ()
stroke(100,0,0)
strokeWeight (4)
rect (0,0,300,210)	
pop()
angleSeven=angleSeven + 0.004
push()
translate (210,380)
rotate(angleEight)
rectMode (CENTER)
noFill ()
stroke(80,0,0)
strokeWeight (4)
rect (0,0,80,80)	
pop()
angleEight=angleEight - 0.06
push()
translate (140,430)
rotate(angleNine)
rectMode (CENTER)
noFill ()
stroke(60,0,0)
strokeWeight (4)
rect (0,0,40,40)	
pop()
angleNine=angleNine + 0.17
}	
var eonefifty = 150
var ethreefifty = 350
var eoneeightyfive = 185
var ethreefifteen = 315
var etwofifty = 250
var eNonefifty = 150
var eNthreefifty = 350
var eNoneeightyfive = 185
var eNthreefifteen = 315
var eNtwofifty = 250
function setup() { 
createCanvas(500, 500);
} 
function draw() { 
background(0);
fill(100,12,174);
ellipse ( 250,eNonefifty,20);
fill(150,14,35);
ellipse ( 250,ethreefifty,20);
fill(100,54,65);
ellipse ( eNonefifty,250,20);
fill(10,12,45);
ellipse ( ethreefifty,250,20);
fill(55,13,12);
ellipse ( eNoneeightyfive,eNoneeightyfive,20);
fill(11,34,12);
ellipse ( ethreefifteen,ethreefifteen,20);
fill(17,24,56);
ellipse ( eNoneeightyfive,ethreefifteen,20);
fill(9,23,78)
ellipse ( ethreefifteen,eNoneeightyfive,20);
}
function mousePressed(){
eonefifty++;
ethreefifty++ 
eoneeightyfive++ 
ethreefifteen++ 
etwofifty++ 
eNonefifty = eNonefifty - 100
eNthreefifty--
eNoneeightyfive--
eNthreefifteen--
eNtwofifty--
}function setup() { 
createCanvas(430,450);
var x=random(0,430)
} 
function draw() { 
background(30);
noFill();
stroke('#00bfff');
strokeWeight(6);
quad(70,20,260,20,260,210,70,210);
stroke('#007299');
strokeWeight(12);
triangle(210,120,380,280,50,280);
stroke('#004c66');
strokeWeight(20);
ellipse(220,340,180);
stroke(255,165,0);
strokeWeight(3);
line(mouseX,mouseY+71,mouseX,mouseY-71);
line(210,130,210,272);
stroke('#00bfff');
strokeWeight(6);
line(260,20,260,210);
stroke('#007299');
strokeWeight(12);
line(200,280,100,280);
strokeWeight(2)
ellipse(mouseX,mouseY,50,50)
}