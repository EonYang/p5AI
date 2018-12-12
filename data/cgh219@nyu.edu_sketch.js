let portName = '/dev/cu.usbmodem1411';
let inData;
let soundFile 
let sensorValue
function preload() {
soundFormats('mp3', 'ogg');
soundFile = loadSound('assets/soundone.mp3');
}
function setup() {
createCanvas(400,400)
soundFile.setVolume(0.1);
distortion = new p5.Distortion(0.1, '2x');
}
function draw() {
}
if (inString.length > 0 ) {
inData = Number(inString);
console.log(inData);
}
}
function eqPlay() {
sensorValue = inData
if  (sensorValue >= 20) {
soundFile.play();
background(255,100,200)
console.log("play");
eq.process(soundFile);
env.setRange(1.0,0.1);
env.setADSR(0.5,0.8,5,8);
env.play(soundFile);
play = true
} else {
console.log("stop")
playing = false;
}
if (!playing) {
background(240,255,65)
mic.start(); 
delay.setType('pingpPong');
delay.delayTime(0.8);
playing = true;
} else {
mic.stop();
playing = false;
}
}
function disButton () {
if (!playing) {
background(255,20,255);
mic.start()
mic.connect(distortion);
console.log("play");
env.setADSR(0.01, 0.2, 0.1, 0.3);
env.setRange(1.0, 0.0);
mic.getLevel(env);
distortion.process(mic);
env.triggerAttack(mic);
playing = true
} else { 
env.triggerRelease(mic)
}
let soundFile
function preload () {
soundFile = loadSound('assets/soundone.mp3');
}
function setup() {
createCanvas(400,400)
distortion = new p5.Distortion(0.1, '2x');
}
function draw() {
}
function eqPlay() {
if (!playing) {
soundFile.disconnect()
background(255,100,200)
songOne.
console.log("play");
eq.process(soundFile);
play = true
} else {
console.log("stop")
mic.stop();
playing = false;
}
}
function delayButton() {
if (!playing) {
background(240,255,65)
mic.start(); 
delay.setType('pingpPong');
delay.delayTime(0.8);
playing = true;
} else {
mic.stop();
playing = false;
}
}
function disButton () {
if (!playing) {
background(255,20,255);
mic.start()
mic.connect(distortion);
console.log("play");
env.setADSR(0.01, 0.2, 0.1, 0.3);
env.setRange(1.0, 0.0);
mic.getLevel(env);
distortion.process(mic);
env.triggerAttack(mic);
playing = true
} else { 
env.triggerRelease(mic)
}
}
function setup() {
createCanvas(400,400)
mic = new p5.AudioIn();
distortion = new p5.Distortion(0.1, '2x');
}
function draw() {
}
function eqPlay() {
if (!playing) {
mic.start();
background(255,100,200)
console.log("play");
eq.process(mic);
env.setRange(1.0,0.1);
env.setADSR(0.5,0.8,5,8);
play = true
} else {
console.log("stop")
mic.stop();
playing = false;
}
}
function delayButton() {
if (!playing) {
background(240,255,65)
mic.start(); 
delay.setType('pingpPong');
delay.delayTime(0.8);
playing = true;
} else {
mic.stop();
playing = false;
}
}
function disButton () {
if (!playing) {
background(255,20,255);
mic.start()
mic.connect(distortion);
console.log("play");
env.setADSR(0.01, 0.2, 0.1, 0.3);
env.setRange(1.0, 0.0);
mic.getLevel(env);
distortion.process(mic);
env.triggerAttack(mic);
playing = true
} else { 
env.triggerRelease(mic)
}
}
<script src="lib/p5.js"></script>
<script src="lib/scenemanager.js"></script>
<script>
var mgr;
function setup()
{
createCanvas(600, 500);
mgr = new SceneManager();
mgr.addScene ( Animation1 );
mgr.addScene ( Animation2 );
mgr.addScene ( Animation3 );
mgr.showNextScene();
}
function draw()
{
mgr.draw();
}
function mousePressed()
{
mgr.handleEvent("mousePressed");
}
function keyPressed()
{
switch(key)
{
case '1':
mgr.showScene( Animation1 );
break;
case '2':
mgr.showScene( Animation2 );
break;
case '3':
mgr.showScene( Animation3 );
break;
}
mgr.handleEvent("keyPressed");
}
function Animation1()
{
var textX;
var textY;
this.enter = function()
{
textX = 10;
textY = 0;
background("teal");
textAlign(CENTER);
fill("black");
text("Press keys 1, 2, 3 to jump to a particular animation\n" + 
"... or mouse to advance animation.\n\n" +
"Press any other key to display it.", width / 2, height / 2);
}
this.keyPressed = function()
{
text(keyCode, textX, textY += 10);
if ( textY > height )
{
textX += 20;
textY = 0;
}
}
this.mousePressed = function()
{
this.sceneManager.showNextScene();
}
}
function Animation2()
{
this.y = 0;
this.draw = function()
{
background("teal");
line(0, this.y, width, this.y);
this.y++;
if ( this.y > height )
this.y = 0;
}
this.mousePressed = function()
{
this.sceneManager.showNextScene();
}
}
function Animation3( )
{
this.oAnim1 = null;
}
Animation3.prototype.setup = function()
{
oAnim1 = this.sceneManager.findScene( Animation2 );
}
Animation3.prototype.draw = function()
{
background("lightblue");
var r = sin( frameCount * 0.01 );
fill("white");
ellipse( width / 2, height / 2, map(r, 0, 1, 100, 200) );
if ( oAnim1 != null )
{
fill("black");
textAlign(LEFT);
text( "Scene1 y: " + oAnim1.oScene.y, 10, height - 20);
}
}
Animation3.prototype.mousePressed = function()
{
this.sceneManager.showNextScene();
}
</script>
© 2018 GitHub, Inc.
Terms
Privacy
Security
Status
Help
Contact GitHub
Pricing
API
Training
Blog
About
var fft;
let button
let playing = false 
function setup() {
createCanvas(windowWidth, windowHeight);
mic = new p5.AudioIn();
mic.start();
button = createButton('distortion');
button.mousePressed(disButton);
}
function draw() {
}
function disButton () {
if (!playing) {
mic.start()
console.log("play");
env = new p5.Envelope();
env.setADSR(0.01, 0.2, 0.1, 0.3);
env.setRange(1.0, 0.0);
mic.getLevel(env);
distortion = new p5.Distortion(0.1, '2x');
distortion.process(mic);
mic.connect(distortion);
env.triggerAttack();
playing = true
} else { env.triggerRelease(mic)
}
}
* @name Playback Rate
* @description <p>Load a SoundFile and map its playback rate to
* mouseY, volume to mouseX. Playback rate is the speed with
* which the web audio context processings the sound file information.
* Slower rates not only increase the duration of the sound, but also
* decrease the pitch because it is being played back at a slower frequency.</p>
* <p><em><span class="small"> To run this example locally, you will need the
let song;
function setup() {
createCanvas(710, 400);
}
function draw() {
background(200);
var volume = map(mouseX, 0, width, 0, 1);
volume = constrain(volume, 0, 1);
song.amp(volume);
var speed = map(mouseY, 0.1, height, 0, 2);
speed = constrain(speed, 0.01, 4);
song.rate(speed);
}var eq;
let band_index;
let mic;
let playing = false
function setup() {
createCanvas(600,800)
mic = new p5.AudioIn();
mic.start()
eq = new p5.EQ(3);
button = createButton('EQ');
button.mousePressed(eqPlay)
band_index = 0;
}
function draw() {
background(240,300,65);
}
function eqPlay() {
if (!playing) {
mic.start();
console.log("play");
eq.process(mic);
mic.disconnect();
mic.connect(eq)
play = true
} else {
mic.stop();
playing = false;
}
}
var soundFile, reverb;
function preload() {
soundFile = loadSound('doorbell.wav');
}
function setup() {
reverb = new p5.Reverb();
reverb.process(soundFile, 3, 2);
soundFile.play();
}let mic;
let button;
let amp
function setup() {
createCanvas(400, 400);
background(220);
amp = new p5.Amplitude();
mic = new p5.AudioIn();
mic.start();
}
function loaded() {
button = createButton("play");
button.mousePressed(togglePlaying);
}
function draw() {
background (51);
let vol = amp.getLevel();
let diam = map(vol, 0, 0.3, 10, 200);
fill(225, 0, 225);
ellipse(width/ 2, height / 2, diam, diam);
}
function togglePlaying () {
}
let button;
let playing = false
let slider;
let env;
let mic;
let delay;
function setup() {
createCanvas(400, 400);
mic = new p5.AudioIn();
mic.start()
delay = new p5.Delay();
env = new p5.Envelope(0.03, 0.2, 0.2, 0.1);
setASDR();
}
function draw() {
}
function delayButton() {
if (!playing) {
mic.start();
console.log("PLAY");
delay.process(mic, 0.04, 0.4, 2500)
delay.setType('pingpPong');
delay.delayTime();
playing = true;
} else {
mic.stop();
playing = false;
}
}
Analyze the frequency spectrum with FFT (Fast Fourier Transform)
Draw a 1024 particles system that represents bins of the FFT frequency spectrum. 
Example by Jason Sigal
var fft;
var particles =  new Array(binCount);
function setup() {
c = createCanvas(windowWidth, windowHeight);
noStroke();
mic = new p5.AudioIn();
mic.start();
fft = new p5.FFT(smoothing, binCount);
fft.setInput(mic);
for (var i = 0; i < particles.length; i++) {
var x = map(i, 0, binCount, 0, width * 2);
var y = random(0, height);
var position = createVector(x, y);
particles[i] = new Particle(position);
}
}
function draw() {
background(0, 0, 0, 100);
var spectrum = fft.analyze(binCount);
for (var i = 0; i < binCount; i++) {
var thisLevel = map(spectrum[i], 0, 255, 0, 1);
particles[i].update( thisLevel );
particles[i].draw();
particles[i].position.x = map(i, 0, binCount, 0, width * 2);
}
}
var Particle = function(position) {
this.position = position;
this.scale = random(0, 1);
this.speed = createVector(0, random(0, 10) );
this.color = [random(0, 255), random(0,255), random(0,255)];
}
var theyExpand = 1;
Particle.prototype.update = function(someLevel) {
this.position.y += this.speed.y / (someLevel*2);
if (this.position.y > height) {
this.position.y = 0;
}
this.diameter = map(someLevel, 0, 1, 0, 100) * this.scale * theyExpand;
}
Particle.prototype.draw = function() {
fill(this.color);
text(
this.position.x, this.position.y,
this.diameter, this.diameter
);
}
function windowResized() {
resizeCanvas(windowWidth, windowHeight);
background(0);
}
function keyPressed() {
if (key == 'T') {
toggleInput();
}
}
function toggleInput() {
if (soundFile.isPlaying() ) {
soundFile.pause();
mic.start();
fft.setInput(mic);
} else {
soundFile.play();
mic.stop();
fft.setInput(soundFile);
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
let inData;
var mic, fft;
let env
let smoothing = 0.8
let binCount = 1024
function setup() {
createCanvas(710,400);
noFill();
mic = new p5.AudioIn();
mic.start();
fft = new p5.FFT();
fft.setInput(mic); 
reverb = new p5.Reverb();
env = new p5.Envelope();
env.setADSR(0.5, 0.25, 0.5, 0.1);
env.setRange(0.8, 0);
}
function draw() {
background(200,40,205);
let spectrum = fft.analyze();
lowBase = (int)fft.getEnergy("base");
midRange = (int)fft.getEnergy("mid");
highRange = (int)fft.getEnergy("midHigh");
beginShape();
for (i = 0; i<spectrum.length; i++) {
vertex(i, map(spectrum[i], 0, 255, height, 0) );
console.log(spectrum.lenghth)  
}
endShape();
}
function micSound() {
} else { 
}
}
inData = inByte;
}
function playsound () {
env.play();
}
let video;
let button;
let snapshots = [];
function setup() {
createCanvas(800, 240);
background(51);
video = createCapture(VIDEO);
video.size(320,240);
button = createButton('snap');
button.mousePressed(takesnap);
}
let go = false;
function ready() {
go = true;
}
function takesnap () {
snapshots.push(video.get());
}
function draw() {
let w = 80
let h = 60
let x = 0
let y = 0
for (var i = 0; i < snapshots.length; i++) {
image(snapshots[i],x , y, w, h);
x = x + w;
if (x > w) {
x = x + w
}
}function setup() {
createCanvas(320, 240);
background(51);
video = createCapture(VIDEO, ready);
video.size(320,240);
button = createButton('snap');
button.mousePressed(takesnap);
}
let go = false;
function ready() {
go = true;
}
function takesnap () {
image(video, 0, 0)
}
function setup() {
createCanvas(640, 480);
background(51)
video = createCapture(VIDEO);
video.size(640, 480);
video.hide()
}
function draw() {
tint(255,0,150, width/2 ,height/2);
image(video, mouseX, mouseY);
}let video;
let button;
let snapshots = [];
function setup() {
background(51);
video = createCapture(VIDEO, ready);
video.size(320, 240);
button = createButton('snap');
button.mousePressed(takesnap); 
}
let go = false
function ready() {
go = true
}
function draw() {
snapshots.push(video.get());
}
if (go) {
let w = 80;
let h = 60;
let x = 0;
let y = 0;
for(let i = 0; i < snapshots.length; i++) { 
image(snapshots[i], x, y, w, h);
x = x + w;
if(x > w) {
x = 0
y = y + h;
}
}
}let video
function setup() {
canvas = createCanvas(640, 480, WEBGL);
canvas.id('p5canvas');
video = createCapture(VIDEO);
video.size(640,480);
video.id('p5video');
slider = createSlider(0, 1, 0.5, 0.01);
slider.id('blur-slider');
let seriously = new Seriously();
let src = seriously.source('#p5video');
let target = seriously.target('#p5canvas');
let blur = seriously.effect('blur');
blur.amount = '#blur-slider';
blur.source = src;
target.source = blur;
seriously.go()
}
function setup() {
createCanvas(320, 240);
pixelDensity(1);
video = createCaputure(VIDEO);
video.size(320, 240);
}
function draw() {
background(51);
video.loadPixels();
loadPixels();
for (var y = 0; y < height; y++) {
for (var x = 0; x < width; x++) {
var index = (x + y * width)*4;
pixels [index+0] = random(255);
pixels [index+1] = random(255);
pixels [index+x] = x;
pixels [index+3] = random(255);
}  
}
updatePixels()
}function setup() {
createCanvas(320, 240);
pixelDensity(1);
}
function draw() {
background(51);
loadPixels();
for (var y = 0; y < height; y++) {
for (var x = 0; x < width; x++) {
var index = (x + y * width)*4;
pixels [index+0] = random(255);
pixels [index+1] = random(255);
pixels [index+x] = x;
pixels [index+3] = random(255);
}  
}
updatePixels()
}let capture;
function setup() {
createCanvas(320, 240);
background(210);
capture = createCapture(VIDEO);
capture.size(320,240);
button = createButton('snap');
button.mousePressed(takesnap);
}
function takesnap() { 
image(capture, 0, 0);
}
function draw() {
tint(200,80,45)
background(220);
image(capture, 0, 0);
}let x = 0;
let spaceData;
function setup() {
createCanvas(200,200);
}
function gotData(data) {
spaceData = data;
}
function draw() {
background(0)
if (spaceData) {
randomSeed(4);
for (var i = 0; i < spaceData.number; i++) {
fill(255);
ellipse(random(width), random(height), 16, 16);  
}
let inData;
function setup() {
createCanvas(720, 200);
background(255,0,0);
}
}
let mic
let portName = '/dev/cu.usbmodem1411';
let inData;
let outByte = 0
let volOut
function setup() {
createCanvas(400, 400);
mic = new p5.AudioIn();
mic.start(); 
}
function draw() {
background(100,44,65);
let vol = mic.getLevel();
fill(65,70,12);
ellipse(200, 200, vol*1000, vol*1000);
volOut= vol*1000;
}
function micSound() {
console.log(H);
} else { 
}
}
inData = inByte;
}
let amp
let mic
function setup() {
createCanvas(400, 400);
mic = new p5.AudioIn();
mic.start();
}
function draw() {
background(51,36,70)
let vol = mic.getLevel();
fill(65,70,12)
ellipse(200, 200, vol*1000, vol*1000);
var song;
var sliderRate;
var sliderPan;
function setup() {
createCanvas(200, 200);
song = loadSound("rainbow.mp3", loaded);
song.setVolume(0.5);
sliderRate = createSlider(0, 1.5, 1, 0.01);
sliderPan = createSlider(-1, 1, 0, 0.01);
}
function loaded() {
song.play();
}
function draw() {
background(random(255));
song.pan(sliderPan.value());
song.rate(sliderRate.value());
}let song;
let sliderRate;
let sliderPan;
function setup() {
createCanvas(200, 200);
song = loadSound("songhot.mp3", loaded);
song.setVolume(0.5);
sliderRate = createSlider(0, 1.5, 1, 0.01);
sliderPan = createSlider(-1, 1, 0, 0.01);
}
function loaded() {
song.play();
}
function draw() {
background(random(255));
song.pan(sliderPan.value());
song.rate(sliderRate.value());
function setup() {
createCanvas(400, 400);
}
function draw() {
background(100,44,65);
fill(225)
text(mouseY, width / 2, height /2 );
}
function mouseDragged () {
function setup() {
createCanvas(400,400);
}
function draw() {
background("#004488");
fill("#44AAFF");
text("sensor value: " + inData, 30, 30);
noStroke();
ellipse(width/2, height/2, circleSize, circleSize);
}
function serverConnected() {
}
function portOpen() {
}
console.log(data);
circleSize = data;
}
}
function portClose() {
function setup() {
}
for (var i = 0; i < portList.length; i++) {
}
}let textbox;
let slider;
let paragraph;
function setup() {
noCanvas ();
paragraph = createP('starting text');
textbox = createInput ('enter text');
slider = createSlider ( 10, 64, 16);
textbox.input(updateText);
slider.input(updateSize);
}
function updateSize() {
paragraph.style("font-size", slider.value () + "pt");
}
function updateText() { 
paragraph.html(textbox.value());
}
let bgcolor;
let button;
let txt;
function setup() {
canvas = createCanvas(400, 400);
bgcolor = color(300);
nameP = createP("");
txt = createP ('some text');
txt.mouseOver(changeStyle);
txt.mouseOut(revertStyle);
txt.style("background-color", "pink");
button = createButton("go");
}
function colorChange () {
bgcolor = color (random (255));
}
function changeStyle() {
txt.style("background-color","yellow");
txt.style("padding", "24px");
}
function revertStyle () {
txt.style ("background-color", "purple");
txt.style ("padding", "24px");
}
let button;
let slider;
let input;
let nameP
function setup() {
canvas = createCanvas(400, 400);
bgcolor = color(300);
nameP = createP("");
button = createButton("enter");
button.mousePressed(colorChange);
slider = createSlider(10, 100, 10);
input = createInput('type here');
}
function colorChange () {
bgcolor = color (random (255));
}
function draw() {
background(bgcolor);
noStroke();
fill(100,35,16);
ellipse (200, 200, slider.value(), slider.value())
nameP.html(input.value());
text(input.value(), 10, 20);
}
var bubbles = [];
function setup() {
createCanvas(600, 400);
for (var i = 0; i < 20; i++) { 
bubbles[i] = new Bubble();
}
}
function draw() {
background(5, 55,54);
for (var i = 0; i < bubbles.length; i++) {
bubbles[i].move();
bubbles[i].display();
}
}
function Bubble () {
this.x = random(0, width);
this.y = random (0, height);
this.display = function() {
stroke (225);
noFill();
ellipse( this.x,this.y, 24, 24);
}
this.move = function() {
this.x = this.x + random (-1,1);
this.y = this.y + random (-1,1);
}
}
var bubbles = []
function setup() {
createCanvas(400, 400);
for (var i = 0; i < 4; i++) {
}
bubbles [i] = { 
x: random(0, width),
y: random(0, height),
display: function () {
stroke(255);
noFill();
ellipse(this.x, this.y, 24, 24);
},
move: function() { 
this.x = this.x + random(-1, 1);
this.y = this.y + random(-1, 1);
}
}
}
function draw() {
background(0);
bubbles[i].move();
bubbles[i].display();
}
var words = ["friendship", "hugs", "smiles", "warmth"];
function setup() {
createCanvas(400, 400);
}
function draw() {
background(20);
fill(34, 80, 16);
textSize(45);
text(words[index], 30, 300);
}
function mousePressed() { 
index = index + 1;
if (index == ) { 
index = 0;
}
}var nums = [30, 64, 35, 45];
function setup() {
createCanvas(600, 600);
}
function draw() {
background(20);
for (var i = 0; i < 4; i ++) {
ellipse(i*100 + 100, 200, nums[i], nums[i]);
}
}function setup() {
createCanvas(400, 400);
}
class Ball {
constructor (x,y,xSpeed, ySpeed) {
let this.x;
let this.x = x;
let this.y = y;
let this.xSpeed = xSpeed;
let this.ySpeed = ySpeed;
}
function move (xSpeed, ySpeed) {
function draw() {
background(220);
}
if (balls[b]. isNear (mouseX, mouseY) {balls.splice (b, 1);
function setup() {
createCanvas(600, 600);
}
function draw() {
background(200,60,200);
fill(2, 200,10);
rect(0,460,600,100);
clouds(100,100,50);
clouds(300,150, 75);
clouds(75,250,50);
fill (100,100,20)
flower (200,400,50)
if (mouseX = 200) {fill (200,45,200);
}
}
function clouds(x, y, size) {
fill (255);
strokeWeight (0);
ellipse (x, y, size);
ellipse (x+10, y, size);
ellipse (x+40, y-10, size);
ellipse (x+60, y,size);
ellipse (y-210, y-5,size);                           
}
function flower(x, y, size) {
strokeWeight (10)
ellipse (x-80,y+10,size);
ellipse (x-80,y+40,size);
ellipse (x-60,y+70,size);
ellipse (x-60,y-60,size);
ellipse (x-10, y-80,size);
ellipse (x+30, y-80,size);
ellipse (x+30, y-80,size);
ellipse (x+60, y-50,size);
ellipse (x-70, y-30,size);
ellipse (x+80, y-25,size);
ellipse (x+80, y-25,size);
ellipse (x+80, y+25,size);
ellipse (x+80, y,size);
ellipse (x+70, y+50,size);
fill (20,200,50);
rect (x-30,y ,80,150);
fill (230,30,150);
ellipse (x, y,size + 80);
}
let numCols;
let numRows;
let colw;
let rowH;
function setup() {
createCanvas(600, 600);
numCols = 10;
numRows = 5;
colW = width / numCols;
rowH = height / numRows;
}
function draw() {
background(230,70,150)
for ( let col = 0; col < numCols; col++) { for (let row = 0; row < numRows; row++)
let x = col * colW;
let y = row * rowH;
let d = dist(mouseX, mouseY, x , y);
d = map (d, 0, dist(0, 0, width, height), 255, 0);
fill(d);
rect(x, y, colW, rowH);                          
}function setup() {
createCanvas(600, 600);
}
function draw() {
background(200,60,200);
bloom (450, 300,150 );
bloom (150, 200, 150);
}
function bloom (x, y ) { 
ellipse (x-80,y+10,50);
ellipse (x-80,y+40,50);
ellipse (x-60,y+70,50);
ellipse (x-60,y-60,50);
ellipse (x-10, y-80,50);
ellipse (x+30, y-80,50);
ellipse (x+30, y-80,50);
ellipse (x+60, y-50,50);
ellipse (x-70, y-30,50);
ellipse (x+80, y-25,50);
ellipse (x+80, y-25,50);
ellipse (x+80, y+25,50);
ellipse (x+80, y,50);
ellipse (x+70, y+50,50);
fill (20,200,50);
rect (x-30,y ,80,150);
fill (230,30,150);
ellipse (x, y, 150);
strokeWeight (10);
if (mouseX > 400) { 
fill (100, 4, 20)
}
} 
function setup() {
createCanvas(600, 600);
}
function draw() {
background(0);
stroke(255)
strokeWeight (4);
noFill();
if (mouseX > 200 && mouseX < 400) {
fill (255);
}  
if (mouseY > 300 && mouseY < 500)
rect (300, 200, 100, 100);
}var x = 0;
var speed = 3;
function setup() {
createCanvas(600, 400);
}
function draw() {
background(0);
stroke (225);
strokeWeight (4);
noFill();
rect (x, 200, 100, 100);
if (x > width) {
speed = -3;   
}
x = x + speed;
}function setup() {
createCanvas(600, 400);
}
function draw() {
background(0);
stroke (255);
strokeWeight(4);
noFill ();
if (mouseX > 300) {
fill (255, 0, 200);
}
ellipse (300, 200, 100, 100); 
}var circlex = 5
var circlex2 = -70
var circlex3 = +60
var trianglex = 40
function setup() {
createCanvas(600, 600);
}
function draw() {
background(220,110,20);
fill(50, 150, 200)
ellipseMode(CENTER);
ellipse(100, 400, 100, 100);
ellipse(500, 400, 100, 100);
fill(200, 100, 200)
ellipse(circlex, 400, 400, 400);
fill(50, 50, 200)
ellipse(circlex2, 350, 50, 100);
ellipse(circlex3, 350, 50, 100);
fill(100, 200, 150)
triangle(trianglex, 440, 200, 550, 400, 500);
fill(150, 05, 200)
circlex = circlex +1
circlex2 = circlex2+1
circlex3 = circlex3+1
trianglex = trianglex+1
}
function mousePressed () {
ellipseMode(CENTER);
ellipse(300, 400, 400, 400);
fill(50, 50, 200);
}function setup() {
createCanvas(400, 400);
rectMode (CENTER, CENTER);
}
function draw() {
background(220);
stroke(200,180,120);
strokeWeight(20);
line(width/4,height/2, width/4+100,height/2);
}function setup() {
createCanvas(400, 400);
rectMode (CENTER, CENTER);
}
function draw() {
createCanvas(frameCount, frameCount);
background(220);
fill(200,180,120);
rect(width/2,height/2, 1*width,1*height);
}function setup() {
createCanvas(400, 400);
rectmode(CENTER, CENTER);
}
function draw() {
background(220);
Translate(200, 200);
Rotate(180);
rect (0, 0, 50, 50)
}	function setup() {
createCanvas(600, 600);
}
function draw() {
background(220);
fill(50, 150, 200)
ellipseMode(CENTER);
ellipse(100, 400, 100, 100);
ellipse(500, 400, 100, 100);
fill(200, 100, 200)
ellipse(300, 400, 400, 400);
fill(50, 50, 200)
ellipse(200, 350, 50, 100);
ellipse(370, 350, 50, 100);
fill(100, 200, 150)
triangle(400, 440, 200, 550, 400, 500);
fill(150, 05, 200)
}