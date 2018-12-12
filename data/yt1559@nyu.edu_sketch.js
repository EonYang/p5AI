var portName = '/dev/cu.usbmodem145201';
var phoneOn = false;
var guys = [];
var time = 0;
var inData = 0;
var bgTransition = 0;
function setup() {
backgroundColorOff = 255;
backgroundColorOn = 0;
phoneColor = 0;
phoneHomeButtonColor = 255;
phoneY = 15;
phoneW = 200;
phoneH = 370;
guy0 = new Guy(0, 350, 150, 180, 300, guysColor);
guy1 = new Guy(1, 520, 375, 180, 300, guysColor);
guy2 = new Guy(2, 750, 550, 180, 300, guysColor);
guy3 = new Guy(3, 970, 374.9, 180, 300, guysColor);
guy4 = new Guy(4, 1150, 149.9, 180, 300, guysColor);
guys[0] = guy0;
guys[1] = guy1;
guys[2] = guy2;
guys[3] = guy3;
guys[4] = guy4;
for (var i = 5; i < 10; i++) {
guy = new Guy(i, phoneX + phoneW / 2, phoneY + phoneH / 2, guysColor);
guys[i] = guy;
}
pixelDensity(1.0);
createCanvas(2000, 2000);
}
  if (inData > threshold) {
phoneOn = true;
  } else {
phoneOn = false;
}
}
function mousePressed() {
phoneOn = !phoneOn;
}
function draw() {
time++;
normTime = time / 40 % (2 * PI);
if (!phoneOn) {
} else {
}
background(bgTransition);
if (!phoneOn) {
for (var i = 0; i < 5; i++) {
guys[i].displayBubble();
}
for (var i = 0; i < 5; i++) {
guys[i].display();
}
} else {
for (var i = 0; i < 10; i++) {
guys[i].displayBubble();
}
for (var i = 0; i < 10; i++) {
guys[i].display();
}
}
if (!phoneOn) {
stroke(borderColorOff);
} else {
stroke(borderColorOn);
}
strokeWeight(5);
fill(phoneColor);
rect(phoneX, phoneY, phoneW, phoneH, 20);
if (!phoneOn) {
noStroke();
fill(phoneHomeButtonColor);
ellipse(phoneX + phoneW / 2, phoneY + phoneW / 5, 20);
}
}
class Guy {
constructor(i, x, y, s, as, c) {
this.index = i;
this.x = x;
this.y = y;
this.size = s;
this.auraSize = as;
this.hasBubble = false;
this.bubble = null;
this.auras = [];
}
display() {
strokeWeight(5);
if (!phoneOn) {
stroke(borderColorOff);
} else {
stroke(borderColorOn);
}
fill(0);
ellipse(this.x, this.y, this.size);
}
displayBubble() {
if (!phoneOn) {
var randomTarget = random([0, 1, 2, 3, 4]);
while (randomTarget == this.index) {
randomTarget = random([0, 1, 2, 3, 4]);
}
if (!this.hasBubble) {
this.index,
randomTarget,
random(1, 5),
time);
this.hasBubble = true;
this.addAura(0, this.x, this.y, this.auraSize, auraColorOff.levels[0], auraColorOff.levels[1], auraColorOff.levels[2]);
setTimeout(this.addAura(1, this.x, this.y, this.auraSize * 1.25, auraColorOff.levels[0], auraColorOff.levels[1], auraColorOff.levels[2]), 0.1);
setTimeout(this.addAura(2, this.x, this.y, this.auraSize * 1.5, auraColorOff.levels[0], auraColorOff.levels[1], auraColorOff.levels[2]), 0.2);
} else {
var randomTargetGuys = random([0, 1, 2, 3, 4]);
while (randomTargetGuys == this.index) {
randomTargetGuys = random([0, 1, 2, 3, 4]);
}
var randomTargetPhone = random([5, 6, 7, 8, 9]);
while (randomTargetPhone == this.index) {
randomTargetPhone = random([5, 6, 7, 8, 9]);
}
if (!this.hasBubble) {
if (this.index < 5) {
this.index,
randomTargetPhone,
random(1, 5),
time);
this.hasBubble = true;
} else {
this.index,
randomTargetGuys,
random(1, 5),
time);
this.hasBubble = true;
}
this.addAura(0, this.x, this.y, this.auraSize, auraColorOn.levels[0], auraColorOn.levels[1], auraColorOn.levels[2]);
setTimeout(this.addAura(1, this.x, this.y, this.auraSize * 1.25, auraColorOn.levels[0], auraColorOn.levels[1], auraColorOn.levels[2]), 0.1);
setTimeout(this.addAura(2, this.x, this.y, this.auraSize * 1.5, auraColorOn.levels[0], auraColorOn.levels[1], auraColorOn.levels[2]), 0.2);
}
this.bubble.display();
for (var i = 0; i < this.auras.length; i++) {
if (this.auras[i].currentPhaseTime < 0.6* PI) {
this.auras[i].display();
} else {
this.auras.splice(i, 1);
i--;
}
}
}
addAura(i, x, y, s, r, g, b) {
var newAura = new Aura(x, y, s, r, g, b);
this.auras[i] = newAura;
}
}
class Aura {
constructor(x, y, s, r, g, b) {
this.x = x;
this.y = y;
this.size = s;
this.r = r;
this.g = g;
this.b = b;
this.startTime = normTime;
this.currentPhaseTime = normTime;
}
display() {
this.currentPhaseTime = normTime - this.startTime;
if (this.currentPhaseTime < 0.5 * PI) {
noStroke();
var transColor = color(this.r, this.g, this.b, 255 * (1 + sin(this.currentPhaseTime + PI)));
fill(transColor);
ellipse(this.x, this.y, this.size * sin(this.currentPhaseTime));
}
}
}
class Bubble {
constructor(s, si, ei, sp, t) {
this.size = s;
this.startGuyIndex = si;
this.endGuyIndex = ei;
this.speed = sp;
this.initTime = t;
var targetDistance = dist(guys[this.startGuyIndex].x,
guys[this.startGuyIndex].y,
guys[this.endGuyIndex].x,
guys[this.endGuyIndex].y);
this.speedX = (guys[this.endGuyIndex].x - guys[this.startGuyIndex].x) / targetDistance;
this.speedY = (guys[this.endGuyIndex].y - guys[this.startGuyIndex].y) / targetDistance;
this.x = 0;
this.y = 0;
this.particle = null;
}
display() {
noStroke();
if (!phoneOn) {
fill(borderColorOff);
} else {
fill(borderColorOn);
}
var targetTime = dist(guys[this.startGuyIndex].x,
guys[this.startGuyIndex].y,
guys[this.endGuyIndex].x,
guys[this.endGuyIndex].y) / this.speed;
this.x = map(time - this.initTime,
0,
targetTime,
guys[this.startGuyIndex].x,
guys[this.endGuyIndex].x) + 5 * sin(time * this.vibration);
this.y = map(time - this.initTime,
0,
targetTime,
guys[this.startGuyIndex].y,
guys[this.endGuyIndex].y) + 5 * sin(time * this.vibration);
ellipse(this.x, this.y, this.size);
var distance = dist(this.x, this.y, guys[this.endGuyIndex].x, guys[this.endGuyIndex].y);
if (distance < this.size) {
guys[this.startGuyIndex].hasBubble = false;
}
}
}
var t;
let t1="\"SOLVE PROBLEMS AND CREATE VALUES THROUGH DESIGN.\"".split('')
let t1t="";
t1l=0;
function setup() {
createCanvas(1000,96);
t = createElement("h1","")
t.style("text-align","center");
t.style("font-kerning","2px")
}
function draw() {
clear()
if (t1l<t1.length){
t1t=t1t+t1[t1l];
t1l++;
}
t.html("< "+t1t+ " />");
if (t1l>=t1.length){
noLoop()
}
frameRate(20);
}
var blobs = [];
var count;
function setup() {
createCanvas(400, 400);
}
function draw() {
count=frameCount;
if(blobs.length<=20){
blobs.push(new Blob(random(0, width), random(0, height),count));
}
}else{
for(i=0;i<blobs.length;i++){
blobs[i].r=count/2;
}
console.log(blobs.length);
loadPixels();
for(x=0; x<width; x++) {
let sum = 150;
for(i=0; i<blobs.length; i++) {
let xdif = x-blobs[i].x;
let ydif = y-blobs[i].y;
let d = sqrt((xdif*xdif) + (ydif*ydif));
sum += 10 * blobs[i].r/d;
}
}
}
updatePixels();
for(i=0; i<blobs.length; i++) {
blobs[i].update();
}
}
var blobs = []
function setup() {
createCanvas(400, 200);
for(i=0; i<10; i++) blobs.push(new Blob(random(0, width), random(0, height)));
}
function draw() {
background(51);
loadPixels();
for(x=0; x<width; x++) {
let sum = 0; 
for(i=0; i<blobs.length; i++) {
let xdif = x-blobs[i].x;
let ydif = y-blobs[i].y;
let d = sqrt((xdif*xdif) + (ydif*ydif));
sum += 10 * blobs[i].r/d;
}
}
}
updatePixels();
for(i=0; i<blobs.length; i++) {
blobs[i].update();
}
}
var blobs = [];
var time=0;
function setup() {
createCanvas(400, 400);
for(time=0;time<5;time++){
for(i=0; i<time; i++) blobs.push(new Blob(random(0, width), random(0, height)));
}
}
function draw() {
background(51);
loadPixels();
for(x=0; x<width; x++) {
let sum = 0; 
for(i=0; i<blobs.length; i++) {
let xdif = x-blobs[i].x;
let ydif = y-blobs[i].y;
let d = sqrt((xdif*xdif) + (ydif*ydif));
sum += 10 * blobs[i].r/d;
}
}
}
updatePixels();
for(i=0; i<blobs.length; i++) {
blobs[i].update();
}
ml5 Example
PoseNet example using p5.js
let video;
let poseNet;
let poses = [];
function setup() {
createCanvas(640, 480);
video = createCapture(VIDEO);
video.size(width, height);
video.hide();
poseNet = ml5.poseNet(video, modelReady);
}
function modelReady() {
select('#status').html('Model Loaded');
poseNet.on('pose', function(results) {
poses = results;
});
}
function draw() {
image(video, 0, 0, width, height);
drawKeypoints();
drawSkeleton();
}
function drawKeypoints()  {
for (let i = 0; i < poses.length; i++) {
let pose = poses[i].pose;
for (let j = 0; j < pose.keypoints.length; j++) {
let keypoint = pose.keypoints[j];
if (keypoint.score > 0.2) {
fill(255, 0, 0);
noStroke();
ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
}
}
}
}
function drawSkeleton() {
for (let i = 0; i < poses.length; i++) {
let skeleton = poses[i].skeleton;
console.log(skeleton);
for (let j = 0; j < skeleton.length; j++) {
let partA = skeleton[j][0];
let partB = skeleton[j][1];
stroke(255, 0, 0);
line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
}
}
}
var song;
var fft;
var button;
var w;
var volhistory = [];
function toggleSong() {
if (song.isPlaying()) {
song.pause();
} else {
song.play();
}
}
function preload() {
song = loadSound('M^Ji3C^L.mp3');
}	
function setup() { 
createCanvas(400, 400);
angleMode(DEGREES);
button = createButton('toggle');
button.mousePressed(toggleSong);
song.play();
fft = new p5.FFT(0.9, 64);
w = width / 64;
} 
function draw() { 
background(0);
var spectrum = fft.analyze();
stroke(255);
for (var i = 0; i < spectrum.length; i++) {
var amp = spectrum[i];
var y = map(amp, 0, 255, height, 0);
fill(i, 0, 0);
rect(i * w, y, i * w - 4,height - y);
}                      
console.log(spectrum.length);
stroke(255);
noFill();
}var vid;
var pixles;
var conj = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', ' x', 'y', 'z']
function preload() {
vid = createVideo('NYC timelapes.mp4');
vid.hide();
}
function setup() {
createCanvas(640, 360);
vid.loop();
frameRate(8);
}
function draw() {
background(100,80);
var c = get();
vid.loadPixels();
for (let y = 0; y < 360; y += 10) {
for (let x = 0; x < 640; x += 10) {
var index = (x + y * 640) * 4
var t = conj.length
t = floor(random(t));
pixels[index + 0] = vid.pixels[index + 0];
pixels[index + 1] = vid.pixels[index + 1];
pixels[index + 2] = vid.pixels[index + 2];
pixels[index + 3] = vid.pixels[index + 3];
fill(pixels[index + 0], pixels[index + 1], pixels[index + 2])
text(conj[t], x, y + 10);
}
}
}let osc;
let fft;
let mic;
function setup(){
createCanvas(400,400);
osc = new p5.Oscillator();
osc.setType('sine');
osc.freq(440);
fft = new p5.FFT();
mic = new p5.AudioIn();
mic.start();
fft.setInput(mic);
}
function draw(){
background(220);
let freq = map(mouseX,0,width,440,880);
osc.freq(freq);
text(freq,width/2,100);
var notes = [60, 62, 64, 65, 67, 69, 71];
var index = 0;
var trigger = 0;
var osc;
let images = []
let pics =[];
let imgH1;
let key;
let notePlay = false
function preload(){
for(let i = 0; i < 6; i++) {
pics.push(loadImage('assets/' + i + '.jpg'));
}
imgH1 = loadImage('assets/1818.png');
imgH2 = loadImage("assets/1860.png");
imgH3 = loadImage("assets/1869.png");
imgH4 = loadImage("assets/1870.png");
imgH5 = loadImage("assets/1890.png");
imgH6 = loadImage("assets/1960.png");
imgH7 = loadImage("assets/1970.png");
}
function setup() {
createCanvas(800, 550);
background(123)
images = [imgH1,imgH2,imgH3,imgH4,imgH5,imgH6,imgH7];
osc = new p5.TriOsc();
osc.start();
osc.amp(0);
}
function playNote(note, duration) {
osc.freq(midiToFreq(note));
osc.fade(2, 0.2);
if (duration) {
setTimeout(function() {
osc.fade(0, 0.2);
}, duration - 50);
}
}
function draw() {
var w = width / notes.length;
for (var i = 0; i < notes.length; i++) {
var x = i * w;
if (mouseX > x && mouseX < x + w && mouseY > (height - 1)/5*4) {
if (mouseIsPressed) {
fill(255, 100, 100);
} else {
fill(127);
}
} else {
fill(200);
}
rect(x, height-(w-1), w - 1, (height - 1)/3);
}
for ( let i=0; i<images.length; i++){
let picx = i * w+w/10;
let picy = height-(w-1);
image(images[i],picx,picy,width/9,width/9);
}
let px = 0;
let py = 0;
}
function mousePressed() {
key = floor(map(mouseX, 0, width, 0, notes.length));
playNote(notes[key]);
image(pics[key],0,0,50,50);
}
function mouseReleased() {
osc.fade(0, 0.5);
}var video;
var vScale = 16;
var slider;
var cols = 40;
var rows = 30;
function setup() {
createCanvas(640, 480);
pixelDensity(1);
video = createCapture(VIDEO);
video.size(cols, rows);
slider = createSlider(0, 255, 77)
song = loadSound("file.mp3",loaded);
amp = new p5.Amplitude();
}
function loaded() {
button = createButton("play");
button.position(19, 650);
button.mousePressed(togglePlaying);
console.log("loaded")
}
function draw() {
background(185,206,235,60);
video.loadPixels();
loadPixels();
for (var x = 0; x < video.width; x++) {
var index = (video.width - x - 1 + y * video.width) * 4;
var r = video.pixels[index + 0];
var g = video.pixels[index + 1];
var b = video.pixels[index + 2];
var bright = (r + g + b) / 3;
var threshold = slider.value();
if (bright > threshold) {
fill(r,g,b);
} else {
fill(100)
}
var vol = amp.getLevel();
noStroke();
ellipse(random(x * vScale-vScale,x * vScale), random(y * vScale-vScale,y * vScale), 100*wvol, 100*wvol);
ellipseMode(CENTER);
}
}
}
function togglePlaying() {
if (!song.isPlaying()) {
song.play();
song.setVolume(1);
button.html("pause");
} else {
song.stop();
button.html("play");
}
var song;
var amp;
var button;
var volhistory = [];
function toggleSong() {
if (song.isPlaying()) {
song.pause();
} else {
song.play();
}
}
function preload() {
song = loadSound('this-dot-kp.mp3');
}
function setup() {
createCanvas(200, 200);
button = createButton('toggle');
button.mousePressed(toggleSong);
song.play();
amp = new p5.Amplitude();
}
function draw() {
background(0);
var vol = amp.getLevel();
volhistory.push(vol);
stroke(255);
noFill();
push();
var currentY = map(vol, 0, 1, height, 0);
translate(0, height / 2 - currentY);
beginShape();
for (var i = 0; i < volhistory.length; i++) {
var y = map(volhistory[i], 0, 1, height, 0);
vertex(i, y);
}
endShape();
pop();
if (volhistory.length > width - 50) {
volhistory.splice(0, 1);
}
stroke(255, 0, 0);
line(volhistory.length, 0, volhistory.length, height);
}var video;
function setup() {
canvas = createCanvas(640, 480,WEBGL);
canvas.id('p5canvas')
canvas.id('p5canvas')
background(51);
video = createCapture(VIDEO);
video.size(640, 480);
video.id('p5video')
var seriously = new Seriously();
var target=seriously.target('#p5canvas')
var chroma = seriously.effect('chroma');
chroma.source = src;
target.source = chroma;
seriouly.go()
}
var video;
var vScale = 16;
var particles =[];
function setup() {
createCanvas(640, 480);
pixelDensity(1);
video = createCapture(VIDEO);
video.size(width / vScale, height / vScale);
for(var i=0;i<250;i++){
particles[i] = new Particle(320, 240);
}
background(51);
}
function draw() {
video.loadPixels();
for(var i=0;i<particles.length;i++){
particles[i].update();
particles[i].show();}
}var song;
var button;
var jumpButton;
function setup() {
createCanvas(200, 200);
song = loadSound("file.mp3", loaded);
button = createButton("play");
button.mousePressed(togglePlaying);
jumpButton=createButton("jump");
jumpButton.mousePressed(jumpSong);
background(51);
}
function loaded(){
console.log("loaded")
}
function jumpSong(){
var len = song.duration();
song.jump(random(len));
}
function togglePlaying() {
song.play();
song.setVolume(0.3);
button.html("pause")
}
else{
song.pause();
button.html("play")
}
}var song;
var button;
function setup() {
createCanvas(200, 200);
song = loadSound("file.mp3", loaded);
button = createButton("play");
button.mousePressed(togglePlaying);
song.setVolume(0.3);
background(51);
}
function loaded() {
console.log("loaded");
}
function togglePlaying() {
song.play();
song.setVolume(0.3);
button.html("pause")
}
else{
song.pause();
button.html("play")
}
}
var sliderVolume;
var sliderRate;
var sliderPan;
function setup() {  
createCanvas(200, 200);
song=loadSound("file.mp3")
sliderRate=createSlider(0,1.0,0.5,0.01);
sliderPan=createSlider(0,1.0,0.5,0.01);
}
function loaded(){
song.play();
}
function draw() {
background(random(255));
var apikey = '&appid=626e34c1366f366d03e92c75dbc9be98';
var tianqi;
var temp=[];
function preload() {
Sunny = loadImage("sunny.png");
Rainy = loadImage("rainy.png");
Snow = loadImage("snow.png");
Stormy = loadImage("stormy.png");
}
function setup() {
createCanvas(400, 400);
var button = select('#submit');
button.mousePressed(getWeather);
input = select('#city');
paragraph = createP(temp);
paragraph.position = (0,600)
}
function getWeather() {
var url = api + input.value() + apikey;
loadJSON(url, gotData);
}
function gotData(data) {
tianqi = data;
temp.push(tianqi.main.temp);
}
function draw() {
background(255);
console.log(temp);
fill(200,100,100);
noStroke();
for(let i=0;i<temp.length;i++){
rect(30,40+20*i,temp[i],10);
textSize(32);
text(`${temp[i]}`, 10, 30);
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(200);
let sinVal = sin(radians(frameCount));
let freq = sin(radians(frameCount))*10;
let speed = 0.5;
let amp=cos(radians(frameCount))*100;
for (let i = 0; i < width; i += 5) {
let y = sin(radians(i + frameCount*speed)*freq) * amp;
let absy =abs(y);
let dia = map(y,-amp,amp,10,3);
noStroke();
ellipse(i, height / 4 + absy, dia, dia);
ellipse(i, height / 2 + y, 5, 5);
}
line()
var apikey = '&appid=626e34c1366f366d03e92c75dbc9be98';
var units = '&units=metric';
var tianqi;
function preload() {
Sunny = loadImage("sunny.png");
Rainy = loadImage("rainy.png");
Snow = loadImage("snow.png");
Stormy = loadImage("stormy.png");
}
function setup() {
createCanvas(400, 400);
var button = select('#submit');
button.mousePressed(getWeather);
input = select('#city');
}
var rectArray = []
var xPos = 30;
var yPos = 40;
var rectObj = {
xPos: 30,
yPos: 40,
temp: 280
}
function getWeather() {
var url = api + input.value() + apikey + units;
loadJSON(url, gotData);
}
function gotData(data) {
tianqi = data;
if (tianqi) {
var temp = tianqi.main.temp;
var mode = tianqi.weather[0].main;
var img;
if(mode == "Clouds"  ){
console.log("yay!")
img = snow;
}
console.log(mode);
yPos += 40;
var rectObj = {
xPos: 30,
yPos: yPos,
temp: temp,
img: img,
}
rectArray.push(rectObj);
console.log(rectArray);
}
}
function draw() {
background(255);
if (tianqi) {
var temp = tianqi.main.temp;
}
fill(200, 100, 100);
noStroke();
for (var i = 0; i < rectArray.length; i++) {
var rectObj = rectArray[i];
rect(rectObj.xPos, rectObj.yPos, rectObj.temp, 10)
text(rectObj.temp, rectObj.xPos + rectObj.temp + 10, rectObj.yPos)
image(rectObj.img,0,0)
}
paragraph = createP(temp);
}var video;
var vScale = 16;
var slider;
var cols = 40;
var rows = 30;
function setup() {
createCanvas(640, 480);
pixelDensity(1);
video = createCapture(VIDEO);
video.size(cols, rows);
slider = createSlider(0, 255, 77)
for (var y = 0; y < rows; y++) {
for (var x = 0; x < cols; x++) {
var box = createCheckbox();
box.style('display','inline')
}
}
}
function draw() {
background(51);
video.loadPixels();
loadPixels();
for (var x = 0; x < video.width; x++) {
var index = (video.width - x - 1 + y * video.width) * 4;
var r = video.pixels[index + 0];
var g = video.pixels[index + 1];
var b = video.pixels[index + 2];
var bright = (r + g + b) / 3;
var threshold = slider.value();
if (bright > threshold) {
fill(255);
} else {
fill(0)
}
ellipse(x * vScale, y * vScale, w, w);
ellipseMode(CENTER);
}
}
}let img
let capture;
function preload() {
}
function setup() {
createCanvas(320, 240);
for(let i =0;i<img.pixels.length;i++){
if(i%4 ==3) img.pixels[i]=255;
console.log("\t"+img.pixels[i]); 
}
img.updatePixels();
image(img, 0, 0);
}
function draw() {
background(220);
image(capture,0,0);
}var video11;
var vScale = 16;
function setup() {
createCanvas(640, 480);
pixelDensity(1);
video11 = createCapture(VIDEO);
video11.size(width/vScale, height/vScale);
}
function draw() {
background(51);
video11.loadPixels();
loadPixels();
for (var y = 0; y < video11.height; y++) {
for (var x = 0; x < video11.width; x++) {
var index = (video11.width - x + 1 + (y * video11.width))*4;
var r = video11.pixels[index+0];
var g = video11.pixels[index+1];
var b = video11.pixels[index+2];
var bright = (r+g+b)/3;
var w = map(bright, 0, 255, 0, vScale);
noStroke();
fill(255);
rectMode(CENTER);
rect(x*vScale, y*vScale, w, w);
}
}
}var video;
var vScale = 16;
function setup() {
createCanvas(320, 240);
pixelDensity(1);
video = createCapture(VIDEO);
video.size(width / vScale, height / vScale);
}
function draw() {
background(51);
video.loadPixels();
loadPixels();
for (var x = 0; x < video.width; x++) {
var index = (video.width-x-1+y*video.width)*4;
var r = video.pixels[index + 0];
var g = video.pixels[index + 1];
var b = video.pixels[index + 2];
var bright = (r + g + b) / 3;
fill(bright);
ellipse(x * vScale, y * vScale, w, w);
ellipseMode(CENTER);
}
}
}var video;
var button;
var snapshots = [];
var counter = 0;
var total;
function setup() {
createCanvas(800, 240);
background(51);
video = createCapture(VIDEO)
video.size(320, 240);
}
function draw() {
var w = 80;
var h = 60;
var x = 0;
var y = 0;
total = floor(width / w) * floor(height / h);
snapshots[counter] = video.get();
counter++;
if (counter == total+2) {
counter = 0;
}
for (var i = 0; i < snapshots.length; i++) {
image(snapshots[index], x, y, 2*w, 2*h);
x = x + w;
if (x > width) {
x = 0;
y = y + h;
}
}
}{
"appetizers": {
"name":"fried mushrooms",
"sizes":[
"name":"large",
"prize":10},
"small": 8
]
}
}
"appetizers":[
"fried mushrooms":{
"large":10;
"small":8;
}
]
}var video;
var button;
var snapshots = [];
var counter = 0;
var total;
function setup() {
createCanvas(800, 240);
background(51);
video = createCapture(VIDEO)
video.size(320, 240);
}
function draw() {
var w = 80;
var h = 60;
var x = 0;
var y = 0;
total = floor(width / w) * floor(height / h);
snapshots[counter] = video.get();
counter++;
if (counter == total+2) {
counter = 0;
}
for (var i = 0; i < snapshots.length; i++) {
image(snapshots[index], x, y, 2*w, 2*h);
x = x + w;
if (x > width) {
x = 0;
y = y + h;
}
}
}var video;
var button;
var snapshots = [];
function setup() {
createCanvas(320, 240);
background(51);
video= createCapture(VIDEO)
video.size(320,240);
button = createButton('snap');
button.mousePressed(takesnap);
}
function takesnap(){
}
function draw() {
var w =80;
var h=60;
for(var i=0;i<snapshots.length;i++){
tint(255,50);
image(snapshots[i],x,y,80,60);
}
var apikey = '&appid=626e34c1366f366d03e92c75dbc9be98';
var tianqi;
function preload() {
Sunny = loadImage("sunny.png");
Rainy = loadImage("rainy.png");
Snow = loadImage("snow.png");
Stormy = loadImage("stormy.png");
}
function setup() {
createCanvas(400, 400);
var button = select('#submit');
button.mousePressed(getWeather);
input = select('#city');
}
function getWeather() {
var url = api + input.value() + apikey;
loadJSON(url, gotData);
}
function gotData(data) {
tianqi = data;
}
function draw() {
background(255);
if(tianqi){
var temp = tianqi.main.temp;
console.log(temp);
}
fill(200,100,100);
noStroke();
rect(30,40,temp,10)
paragraph = createP(temp);
var angle = 0.0;
var offset = 220;
var speed = 0.04;
let y;
var apiKey = '&appid=c3769564cbbc64204e7b3b4bfdd5969a';
var units = '&units=';
var windspeed;
var humidity;
var temp;
var weather;
var icon;
function preload() {
Bottle = loadImage("bottle.png")
Clouds = loadImage("weather icons/cloud.png");
Clear = loadImage("weather icons/sun.png");
Rain = loadImage("weather icons/rain.png");
Snow = loadImage("weather icons/snow.png");
Mist = loadImage("weather icons/haze.png");
Haze = loadImage("weather icons/foggy.png");
}
function setup() {
createCanvas(400, 600);
var button = select('#submit');
button.mousePressed(weatherAsk);
input = select('#city');
}
function weatherAsk() {
var url = api + input.value() + apiKey + units;
loadJSON(url, gotData);
}
function gotData(data) {
weather = data;
}
function draw() {
background(255);
var y = 240 + sin(angle) * scalar;
if (weather) {
var windspeed = weather.wind.speed * 0.04;
angle += windspeed;
if (icon == "Clear") {
var imageShow = Clear;
}
if (icon == "Snow") {
var imageShow = Snow;
}
if (icon == "Clouds") {
var imageShow = Clouds;
}
if (icon == "Rain") {
var imageShow = Rain;
}
if (icon == "Mist") {
var imageShow = Mist;
}
if (icon == "Haze") {
var imageShow = Haze;
}
console.log(windspeed, icon);
image(imageShow, 130, y, 120, 120);
}
image(Bottle, 90, 170, 200, 240);
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
function setup() {
createCanvas(400, 400);
loadJSON(url,gotData,'jsonp')
}
function gotData(data) {
}
function draw() {
background(220);
let allWords = [];
let ts = 16;
let i = 0;
function preload() {
}
function setup() {
}
function draw() {
text(allWords[floor(i)], random(width), random(height));
}
}
function processSnippets(data) {
console.log(data);
let putins = ["Putin", "Vladi", "Vlad", "Vova"];
let trumps = ["Trump", "president", "President"];
for (let doc of docs) {
for (let w in words) {
for (let trump of trumps) {
words[w] = putins[floor(random(putins.length))];
}
}
}
}
}
let txt
let tokens=[];
function preload(){
console.log(txt);
}
function setup() {
createCanvas(400, 400);
for(let l of txt){
console.log(tokens);
}
function draw() {
background(220);
let x =0;
let y =50;
for (let token of tokens)
{
text(token,x,y);
x=x+textWidth(token)+textWidth('a'); 
if(x>width-30){
y+=textAscent(token);
x=0;
}
}
}
let clat = 0;
let clon=0;
let zoom = 0;
let apiKey = ',0,0/1024x512?access_token=sk.eyJ1Ijoid2hpc2t5b3FpIiwiYSI6ImNqbmtoOHl4YzE4eWgza3F4Nmw5N3FzNHYifQ.sd0yH7tajxbGDboMKkCupQ';
let mapimg;
let lat, lon, mag, depth, earthquakes,x,y;
let ww = 512;
let hh = 512;
let buttonZoomIn,buttonZoomOut;
function preload(){
let url = api + clat +','+clon+','+zoom+apiKey;
mapimg = loadImage(url);
}
function setup() {
createCanvas(ww, hh);
buttonZoomIn = createButton("Zoom In");
buttonZoomOut = createButton("Zoom Out");
buttonZoomIn.mousePressed(zoomIn);
buttonZoomOut.mousePressed(zoomOut);
}
function gotData(data){
earthquakes = data;
}
function draw(){
image(mapimg,0,0);
if (earthquakes){
for (let i =0; i<earthquakes.features.length;i++){
lon = earthquakes.features[i].geometry.coordinates[0];
lat = earthquakes.features[i].geometry.coordinates[1];
x = mercX(lon);
y = mercY(lat);
mag = earthquakes.features[i].properties.mag;
mag = sqrt(pow(10, mag));
let magmax = sqrt(pow(10, 10));
let d = map(mag, 0, magmax, 0, 600);
depth = earthquakes.features[i].geometry.coordinates[3];
fill(89,169,170,150);
noStroke();
ellipse(x,y,d,d);
}
}
if (zoom < 0){
zoom = 0;
}
if (zoom > 5){
zoom = 5;
}
}
function mercX(lon){
return (map(lon,-180,180,0,width));
}
function mercY(lat){
return (map(lat,90,-90,0,height));
}
function zoomIn(){
zoom = zoom + 1;
}
function zoomOut(){
zoom = zoom - 1;
}
function setup() {
createCanvas(windowWidth, windowHeight);
let button1 = select('#submitFam');
button1.mousePressed(weatherInput);
let button2 = select('#submitUnit');
button2.mousePressed(weatherInput);
inputWeather = select('#city');
inputUnit = select('#units');
noStroke();
rectMode(CENTER);
}
function weatherInput() {
loadJSON("birds.json",gotData);
}
function gotData(data) {
weather = data;
console.log(data);
}
function draw() {
background(0);
if (weather) {
winds = weather.wind.speed
var temp = weather.main.temp;
var min = weather.main.temp_min;
var max = weather.main.temp_max;
var humidity = weather.main.humidity;
var clouds = weather.clouds.all;
console.log(temp);
console.log(min);
console.log(max);
fill(random(map(humidity, 0, humidity, 0, 255)), 0, random(map(humidity, 0, humidity, 0, 255)), random(humidity));
if (random(clouds) < clouds / 2) {
} else {
}
}
}
}
}
apiKey = '&APPID=60a2134d9e2827ec90778e0cd2b4463f',
units = '&units=',
inputWeather, weather, inputUnits;
function setup() {
createCanvas(windowWidth, windowHeight);
let button1 = select('#submitCity');
button1.mousePressed(weatherInput);
let button2 = select('#submitUnit');
button2.mousePressed(weatherInput);
inputWeather = select('#city');
inputUnit = select('#units');
noStroke();
rectMode(CENTER);
}
function weatherInput() {
var url = api + inputWeather.value() + apiKey + units + inputUnit.value();
loadJSON(url, gotData);
}
function gotData(data) {
weather = data;
console.log(data);
}
function draw() {
background(0);
if (weather) {
winds = weather.wind.speed
var temp = weather.main.temp;
var min = weather.main.temp_min;
var max = weather.main.temp_max;
var humidity = weather.main.humidity;
var clouds = weather.clouds.all;
console.log(temp);
console.log(min);
console.log(max);
fill(random(map(humidity, 0, humidity, 0, 255)), 0, random(map(humidity, 0, humidity, 0, 255)), random(humidity));
if (random(clouds) < clouds / 2) {
} else {
}
}
}
}
}var lineX = 0;
var issX = 0;
var issY = 0;
function setup() {
createCanvas(600, 400);
setInterval(askISS, 1000);
}
function askISS() {
loadJSON(url, gotData, 'jsonp');
}
function gotData(data) {
var lat = data.iss_position.latitude;
var long = data.iss_position.longitude;
issX = map(lat, -90, 90, 0, width);
issY = map(long, -180, 180, 0, height);
}
function draw() {
background(51);
fill(255);
ellipse(issX, issY, 24, 24);
stroke(255);
line(lineX, 0, lineX, height);
lineX = lineX + 5;
if (lineX > width) {
lineX = 0;
}
function setup() {
loadJSON("birds.json",gotData);
}
function gotData(data){
console.log(data);
}
function draw(){
}
var flower
function setup() {
createCanvas(400, 400);
}
function preload( ) {
flower = loadJSON("flower.json")
}
function draw() {
background(0);
fill(flower.r, flower.g, flower.b);
text(flower.name, 10, 50)
}var flower
function setup() {
createCanvas(400, 400);
}
function preload() {
flower = loadJSON("flower.json")
}
function draw() {
background(0);
fill(flower.r, flower.g, flower.b);
text(flower.name, 10, 50)
}let ghosts = [];
function setup() {
createCanvas(600, 600);
background(0);
for (let i = 0; i < 3; i++) {
ghosts.push(new Ghost(70 * i, 20, 20, 20));
}
}
function draw() {
for (var i = 0; i < 3; i++) {
ghosts[i].show();
ghosts[i].move();
}
if (mouseIsPressed) {
ghosts[1].w += 1;
ghosts[1].h += 1;
}
}
class Ghost {
constructor(x, y, w, h) {
this.x = x;
this.y = y;
this.w = w;
this.h = h;
}
show() {
fill(255);
beginShape();
translate(this.x, this.y);
curveVertex(this.x + this.w, this.y + this.h);
curveVertex(this.x + this.w, this.y + this.h);
curveVertex(this.x + 2 / 3 * this.w, this.y);
curveVertex(this.x, this.y - this.h);
curveVertex(this.x - 2 / 3 * this.w, this.y);
curveVertex(this.x - this.w, this.y + this.h);
curveVertex(this.x, this.y + 4/ 3 * this.h);
curveVertex(this.x + this.w, this.y + this.h);
curveVertex(this.x + this.w, this.y + this.h);
endShape();
ellipse(30, 30, 20, 20);
ellipse(50, 30, 20, 20);
fill(0);
ellipse(50, 60, 10, 20);
}
move() {
}
}let ghosts = [];
function setup() {
createCanvas(400, 400);
background(0);
for (let i = 0; i < ghosts.length; i++) {
ghosts.push(new Ghost(mouseX, mouseY));
}
}
function draw() {
for (var i = 0; i < ghosts.length; i++) {
ghosts[i].show();
}
}
class Ghost {
constructor(x, y) {
this.x = x;
this.y = y;
}
show() {
fill(255);
beginShape();
curveVertex(this.x + 84, this.y + 91);
curveVertex(this.x + 84, this.y + 91);
curveVertex(this.x + 68, this.y + 19);
curveVertex(this.x + 21, this.y + 17);
curveVertex(this.x + 32, this.y + 91);
curveVertex(this.x + 32, this.y + 91);
endShape();
}
let breadUps = [];
let breadDns =[];
let hams = [];
let lettuses = [];
let cheeses = [];
let bread = 2;
let fat = 5; 
let vegie = 3;
let colW,colH,h,score,cal, calBread, calHam,calCheese,calLettus;
function setup(){
createCanvas(800, 600);
colW = 50;
colH = 50;
h = 535;
score = 0;
cal = 0;
let button = createButton('PLAY');
button.mousePressed(resetSketch);
button.position(380,620);
}
function resetSketch(){
for (let i = bread; i > 0; i--){
breadUps[i] = new BreadUp(random(width), random(-height,height/2));
breadDns[i] = new BreadDn(random(width), random(-height,height/2));
}
for (let i = fat; i > 0; i--){
hams[i] = new Ham(random(width), random(-height,height));}
for (let i = fat; i>0; i--){
cheeses[i] = new Cheese(random(width), random(-height,height));
}
for (let i = vegie; i > 0 ; i--){
lettuses[i] = new Lettus(random(width), random(-height,height));
}
cal = 0;
score = 0;
}
function draw() {
background(238,222,203);
for (let col = 0; col < width/colW; col++) {
for(row=0; row<height/colH; row++){
let x = col * colW;
let y = row * colH;
noFill();
stroke(190,119,87);
strokeWeight(2);
rect(x, y, colW, colH);
}
noStroke();
fill(230);
textFont('Helvetica');
}
fill(190, 119, 87);
stroke(200, 150, 120);
strokeWeight(5);
rect(-15,35,150,150,10);
noStroke();
fill(230);
textSize(18);
text('Move the tray to collect your burger!',10,65,120);
text('Burgers: ' + score,10,145);
text('Calorie: ' + cal, 10,165);
push();
fill(190, 119, 87);
rect(25, 555, 750, 80,10);
noStroke();
fill(185, 43, 62);
rect(mouseX - 50, 535, 100, 20, 10)
fill(244,197,61);
textSize(12);
text('VALUE PACK',mouseX - 36,550)
pop();
for (let i in hams){
hams[i].run();
if (hams[i].isCaught(mouseX,h)){
h = h - hams[i].a;
hams[i].stop(mouseX);
}
}
for (let i in cheeses){
cheeses[i].run();
if (cheeses[i].isCaught(mouseX,h)){
h = h - cheeses[i].a;
cheeses[i].stop(mouseX);
}
}
for (let i in lettuses){
lettuses[i].run();
if (lettuses[i].isCaught(mouseX,h)){
h = h - lettuses[i].a;
lettuses[i].stop(mouseX);
}
}
for (let b in breadUps){
h = 535;
}
if(breadDns[i].isCaught(mouseX,h)){
breadDns.splice(i,1);
cal = cal + 50;
}
}
if(hams[j].isCaught(mouseX,h)){
hams.splice(j,1);
cal = cal + 180;
}
}
if(lettuses[q].isCaught(mouseX,h)){
lettuses.splice(q,1);
cal = cal + 30;
}
}
if(cheeses[k].isCaught(mouseX,h)){
cheeses.splice(k,1);
cal = cal + 360;
}
}
}
}
}
for (let b in breadDns){
breadDns[b].run();
if (breadDns[b].isCaught(mouseX,h)){
h = h - breadDns[b].a;
breadDns[b].stop(mouseX);
}
}
let breadUpsNum = breadUps.length;
let breadDnsNum = breadDns.length;
push();
if (breadUpsNum == 1 && breadDnsNum == 1){
fill(185, 43, 62); 
rect(0,0,width,height);
fill(254,192,65);
textSize(38);
text('Wow. You got ' + score + ' hamburgers in total.',110, height/2-150);
text('That is ' + cal + ' calorie!',250, height/2-60);
stroke(255);
line(150,height/2+30, 650,height/2-10);  	
let r = 200;
let ex = width/2;
let ey = height/2 +150;
line(ex,ey,ex,height);
fill(254,192,65);
noStroke();
strokeWeight(2);
ellipse(ex,ey,r,r);
fill(255);
text('   EAT AGAIN?', width/2-67, height/2 +135,150);
pop();  
}
let allWords = [];
let ts = 16;
let i = 0;
function preload() {
let q = "trump";
let apikey = "5fcc7b03d74d15972346cf84719ad5e5:13:68130021";
loadJSON(url, processSnippets);
}
function setup() {
createCanvas(800, 800);
fill(0);
}
function draw() {
background(255, 5);
ts++;
ts %= 48;
if (allWords.length > 0) {
i += 1;
i %= allWords.length;
textSize(ts);
let word = allWords[floor(i)];
text(allWords[floor(i)], random(width), random(height));
}
}
function processSnippets(data) {
let docs = data.response.docs;
console.log(data);
let putins = ["Putin", "Vladi", "Vlad", "Vova"];
let trumps = ["Trump", "president", "President"];
for (let doc of docs) {
let words = splitTokens(doc.snippet);
for (let w in words) {
let word = words[w];
for (let trump of trumps) {
if (match(word, trump)) {
words[w] = putins[floor(random(putins.length))];
break;
}
}
shuffle(words, true);
}
allWords = concat(allWords, words);
}
}let txt
let tokens=[];
function preload(){
console.log(txt);
}
function setup() {
createCanvas(400, 400);
for(let l of txt){
console.log(tokens);
}
function draw() {
background(220);
let x =0;
let y =50;
for (let token of tokens)
{
text(token,x,y);
x=x+textWidth(token)+textWidth('a'); 
if(x>width-30){
y+=textAscent(token);
x=0;
}
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
var s = "A string walks into a bar and orders a drink.The bartender says we don't serve strings in here and you're a string. Nope, I'm a frayed knot.";
fill(50);
text(s, 100, 100, 150, 150);
fill(200,100,50,40);
noStroke();
rect(100,100,150,150);
}let data;
function setup() {
createCanvas(600, 600);
noFill();
strokeWeight(10);
}
function processData() {
if (!inString) return
data = inString;
console.log(inString)
}
function draw() {
background(127, 0, 127);
var v = map(data, 0, 1023, 0, width);
ellipse(width * 0.4, height * 0.4, v * 0.25 + 10, v * 0.25 + 10);
ellipse(width * 0.6, height * 0.4, (2500 / v) + 10, (2500 / v) + 10);
bezier(width * 0.3, v * 0.6 + height / 2, width * 0.4, height * 0.8, width * 0.6, height * 0.8, width * 0.7, v * 0.55 + height / 2);
v += random(-5, 5);
bezier(width * 0.5, height * 0.5, v * 0.6, height * 0.6, v * 0.6, height * 0.8, width * 0.45, height * 0.67);
function setup() {
createCanvas(windowWidth, windowHeight);
}
function gotData() {
if(indata.length>0){
console.log(indata);
}
}
function draw() {
background(127, 0, 127);
var v = map(latestData,0,190,600,0); 
ellipse(width*0.4, height*0.4, v*0.25 + 10, v*0.25 + 10);
ellipse(width*0.6, height*0.4, (2500/v) + 10, (2500/v) + 10);
bezier(width*0.3, v*0.6 + height/2, width*0.4, height*0.8, width*0.6, height*0.8, width*0.7, v*0.55 + height/2);
v+=random(-5, 5);
bezier(width*0.5, height*0.5, v*0.6, height*0.6, v*0.6, height*0.8, width*0.45, height*0.67);
function setup() {
}
for (var i = 0; i < portList.length; i++) {
}
}function setup() {
var cnv = createCanvas(windowWidth,windowHeight);
cnv.style('display', 'block');
background(250, 150, 200);
input = createInput();
input.position(20, 65);
var button =createButton('press');
var slider=createSlider(0, 255);
slider.position(30, 5);
var s=slider.value;
button.position(input.x + input.width, 65);
button.mousePressed(greet);
greeting = createElement('h2', 'Type something?');
greeting.position(20, 5);
textAlign(CENTER);
textSize(50);
console.log(slider.value());
}
function windowResized() {
resizeCanvas(windowWidth, windowHeight);
}
function greet(){
var name = input.value();
greeting.html('hello '+name+'!');
input.value('');
for (var i=0; i<slider.value(); i++) {
push();
fill(random(200,255), 200, 200);
translate(random(width), random(height));
rotate(random(2*PI));
text(name, 0, 0);
pop();
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
}function setup() {
background(0);
createCanvas(200, 200);
dropzone = select('#dropzone');
dropzone.dragOver(highlight);
dropzone.dragLeave(unhighlight);
dropzone.drop(gotFile,unhighlight);
}
function highlight() {
dropzone.style('background-color','#ccc'); 
}
function unhighlight() {
dropzone.style('background-color','#fff'); 
}
function gotFile(file){
createP(file.name);
createP(file.type);
createP(file.size);
var img=createImg(file.data);
img.hide();
img.size(100,100);
image(img,0,0,200,height);
}var sliders=[];
var angle = 0;
function setup() {
noCanvas();
for (var i = 0; i < 50; i++) {
sliders[i] = createSlider(0, 255, 50);
}
sliders[0].input(adjustSliders);
}
function adjustSliders(){
var offset = 0;
for (var i = 0; i < sliders.length; i++) {
sliders[i].value(sliders[0].value());
}
}
Introduction to Physical Computing
ITP
This sketch will send one binary byte from arduino to P5
var posX=0,posY=0, step = 10;
function setup() {
createCanvas(320, 240);
}
function draw() {
background(255);
posX+=step;
if (posX> width){
posX= 0;
posY+=step;
if (posY> height)posY=0;
}
rect(posX,posY, step, step);
}
for (var i = 0; i < portList.length; i++) {
}
}
}
void setup() {
}
void loop() {
int analogValue = analogRead(A0);
byte byteToSend = map (analogValue, 0, 1023, 0, 255);
delay(50);
}
function setup() {
noCanvas();
var button = select('#button');
button.mousePressed(addItem);
}
function addItem(){
var li =createElement('li',happy[r]);
li.parent('happylist') 
createP(happy[r]);
}
Introduction to Physical Computing
ITP
This sketch will send one value as ascii from P5 to arduino
See arduino code in bottom, have LED connected to pin 3
function setup() {
createCanvas(255, 255);
}
function draw() {
background(0,0,255);
var valueToSend = mouseX;
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
This sketch will send one binary byte from P5 to arduino
See arduino code in bottom, have LED connected to pin 3
var capture;
function setup() {
createCanvas(255, 255);
createCanvas(390, 240);
capture = createCapture(VIDEO);
capture.size(320, 240);
}
function draw() {
image(capture, 0, 0, 320, 240);
var pixelColor=get(mouseX,mouseY);
var ourBrightness = brightness(pixelColor);
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
This sketch will send one binary byte from arduino to P5
var posX=0,posY=0, step = 10;
function setup() {
createCanvas(320, 240);
}
function draw() {
posX+=step;
if (posX> width){
posX= 0;
posY+=step;
if (posY> height)posY=0;
}
rect(posX,posY, step, step);
}
for (var i = 0; i < portList.length; i++) {
}
}
}
void setup() {
}
void loop() {
int analogValue = analogRead(A0);
byte byteToSend = map (analogValue, 0, 1023, 0, 255);
delay(50);
}
createCanvas(400, 400);
for (var i = 0; i < 100; i++) {
var p = createP('apples');
var x = floor(random(width));
var y = floor(random(height));
p.position(x,y);
p.class('apple');
p.mousePressed(becomeApple);
}
for (var j = 0; j < 100; j++) {
var q = createP('bananas');   
var px = floor(random(width));
var py = floor(random(height));
q.position(px,py);
q.class('bananas');
}
}
function draw() {
background(220);
}function setup() {
noCanvas();
}
function draw() {
background(220);
}var paragraphs;
var paragraph;
function setup() {
createCanvas(100, 100);
background(0);
paragraph = select('#unicorn');
for (var i = 0; i < paragraphs.length; i++) {
paragraphs[i].mouseOver(highlight);
paragraphs[i].mouseOut(unhighlight);
}
}
function highlight(){
this.style('padding','16pt');
this.style('background-color','#F0F');
}
function unhighlight(){
this.style('padding','0pt');
this.style('background-color','#FFF');
}
function canvasBg() {
background(random(255));
}
var paragraphs;
function setup() {
createCanvas(100, 100);
background(0);
createP("This is a paragraph made by me" + random(100));
for (var i=0;i<paragraphs.length;i++){
paragraphs[i].style('font-size','24pt');
}
button.mousePressed(canvasBg);
}
function canvasBg(){
background(random(255));
}
function changeBackground() {
paragraph.style('background-color', '#F0F');
}
var textbox;
var slider;
var paragraph;
var element = select('#unicorn')
function setup(){
noCanvas();
paragraph = createP('starting text');
textbox = createInput('enter text');
slider = createSlider(10,64,16);
textbox.input(updateText); 
slider.input(updateSize)
}
function updateSize(){
paragraph.style("font-size",slider.value() + "pt");
}
function updateText(){
paragraph.html(textbox.value());
}
var slider;
var paragraph;
function setup(){
noCanvas();
paragraph = createP('starting text');
textbox = createInput('enter text');
slider = createSlider(10,64,16);
textbox.input(updateText); 
slider.input(updateSize)
}
function updateSize(){
paragraph.style("font-size",slider.value() + "pt");
}
function updateText(){
paragraph.html(textbox.value());
}
var slider;
var paragraph;
function setup(){
noCanvas();
paragraph = createP('starting text');
textbox = createInput('enter text');
slider = createSlider(10,64,16);
textbox.input(updateText); 
slider.input(updateSize)
}
function updateSize(){
paragraph.style("font-size",slider.value() + "pt");
}
function updateText(){
paragraph.html(textbox.value());
}
var button;
var slider;
var input;
var nameP;
function setup() {
canvas = createCanvas(200, 200);
canvas.mouseOver(overpara);
canvas.mouseOut(outpara);
canvas.mousePressed(changeColor);
txt = createP('some text');
txt.mouseOver(changeStyle);
txt.mouseOut(revertStyle);
function changeStyle() {
txt.style("padding", "24px");
}
function revertStyle() {
txt.style("padding", "8px");
}
bgcolor = color(200);
nameP = createP('your name!');
button.mousePressed(changeColor);
slider = createSlider(10, 100, 86);
input = createInput('type your name');
nameP.mouseOver(overpara);
nameP.mouseOut(outpara);
input.changed(updateText);
}
function updateText() {
nameP.html(input.value());
}
function changeStyle() {
txt.style("background-color", "pink")
txt.style("padding", "24px")
}
function overpara() {
nameP.html('your name is over me')
}
function outpara() {
nameP.html('your mouse is out')
}
function changeColor() {
bgcolor = color(random(255));
}
function draw() {
background(bgcolor);
fill(255, 0, 175);
rect(100, 100, 50, 50);
ellipse(100, 100, slider.value(), slider.value())
text(input.value(), 10, 20);
}var bgcolor;
var button;
var slider;
var input;
var nameP;
function setup() {
canvas = createCanvas(200, 200);
canvas.mouseOver(overpara);
canvas.mouseOut(outpara);
canvas.mousePressed(changeColor);
bgcolor = color(200);
nameP = createP('your name!');
button.mousePressed(changeColor);
slider = createSlider(10, 100, 86);
input = createInput('type your name');
nameP.mouseOver(overpara);
nameP.mouseOut(outpara);
input.changed(updateText);
}
function updateText() {
nameP.html(input.value());
}
function overpara() {
nameP.html('your name is over me')
}
function outpara() {
nameP.html('your mouse is out')
}
function changeColor() {
bgcolor = color(random(255));
}
function draw() {
background(bgcolor);
fill(255, 0, 175);
rect(100, 100, 50, 50);
ellipse(100, 100, slider.value(), slider.value())
text(input.value(), 10, 20);
}
var bgcolor
var button;
var slider;
function setup() {
canvas=createCanvas(200, 200);
bgcolor= color(200);
button.mousePressed(changeColor);
nameP= createP('yourname')
slider=createSlider(10,100,5);
input=createInput('type your name');
}
function changeColor() {
bgcolor=color(random(255));
}
function draw() {
background(bgcolor);
fill(255,0,175);
rect(100,100,50,50);
ellipse(100,100,slider.value(),slider.value())
nameP.html(input.value());
text(input.value(),10,20);
console.log(slider.value());
let points = []; 
function setup() {
createCanvas(480, 270);
}
function draw() {
background(255);
let point = {
x: mouseX,
y: mouseY
};
if (points.length > 50) {
points.splice(0,1);
}
for (let i = 0; i < points.length; i++) {
noStroke();
fill(255-i*5);
ellipse(points[i].x,points[i].y,i,i);
}
}let bubbles = [];
let bubble;
function setup() {
createCanvas(600, 400);
for(let i = 0;i<5;i++){
let x =random(width);
let y =random(height);
let r =random(10,50);
let b = new Bubble(x,y,r);
bubbles.push(b); 
}
}
function draw() {
background(0);
for (let i = 0; i < bubbles.length; i++) {
bubbles[i].move();
bubbles[i].show();
}
}
function mousePressed(){
for (let i = 0; i < bubbles.length; i++) {
bubbles[i].clicked(mouseX,mouseY);
}
}
class Bubble {
constructor(x, y, r) {
this.x = x;
this.y = y;
this.r = r;
this.brightness=0;
}
clicked(px,py){
let d = dist(px,py,this.x, this.y);
if(d < this.r){
this.brightness=255;
console.log("CLICKED ON THE BUBBLE!")
}
}
move() {
this.x = this.x + random(-5, 5);
this.y = this.y + random(-5, 5);
}
show() {
stroke(255)
noFill()
strokeWeight(4)
fill(this.brightness,100)
ellipse(this.x, this.y, this.r * 2);
}
function setup() {
createCanvas(400, 400);
for (let i = 0; i < 100; i++) {
balls.push(new Ball(random(0, width), random(0, height), 5, random(0, 3), random(0, 3)));
}
}
function draw() {
background(220);
for (i = 0; i < balls.length; i++) {
balls[i].run();
if (balls[i].isNear(balls[other]) && balls[i] != balls[other]) {
balls.splice(other, 1);
balls.splice(i, 1);
}
}
}
}
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
for (let i = 0; i < balls.length; i++) {
balls[i].run();
}
}
function mousePressed() {
let b = new Ball(mouseX,mouseY,random(10,20),random(0,3),random(0,3));
balls.push(b);
function setup() {
createCanvas(400, 400);
for (let i = 0; i < 100; i++) {
balls.push(new Ball(random(width), random(height), random(10, 20), random(0, 3), random(0, 3)));
}
}
function draw() {
background(220);
for (let b in balls) {
balls[b].run(); 
if(balls[b].isNear(mouseX, mouseY)){
balls.splice(b, 1);
}
}
}
var bgcolor
var button;
var slider;
function setup() {
canvas=createCanvas(200, 200);
bgcolor= color(200);
button.mousePressed(changeColor);
slider=createSlider(10,100,5);
}
function changeColor() {
bgcolor=color(random(255));
}
function draw() {
background(bgcolor);
fill(255,0,175);
rect(100,100,50,50);
ellipse(100,100,slider.value(),slider.value())
}var canvas;
var h1;
function setup() {
canvas=createCanvas(200, 200);
canvas.position(400,500);
h1=createElement('hi','waiting')
}
function mousePressed(){
createP("My favorite color is purple"+random(1,10));
}
function draw() {
background(200);
fill(255,0,0);
rect(x,y,50,50);
h1.position(x,y);
x=x+random(-5,5);
}let bubbles = [];
let flower;
function preload(){
flower = loadImage('flower.png')
for (let i =0;i<5;i++){
kittens[1] = loadImage('flower'+i+'jpg');}
}
function setup() {
createCanvas(600, 400);
for (let i = 0; i < 20; i++) {
let x = random(width);
let y = random(height);
let r = random(10, 12);
bubbles[i] = new Bubble(x, y, r)
}
unicorn = new Bubble(400, 200, 10);
}
function draw() {
background(255);
for (let i = 0; i < bubbles.length; i++) {
bubbles[i].show();
bubbles[i].move();
}
for (var b of bubbles) {
b.show();
b.move();
let overlapping = false;
for (var other of bubbles) {
if (b !== other && b.intersects(other)) {
overlapping = true;
}
if (overlapping) {
b.changeColor(255)
} else {
b.changeColor(0);
}
}
}
}
function mousePressed() {
if (bubbles[i].contains(mouseX, mouseY)) {
bubbles.splice(i, 1);
}
}
}
class Bubble {
constructor(x, y, r = 50) {
this.x = x;
this.y = y;
this.r = r;
this.brightness = 0;
}
move() {
this.x = this.x + random(-5, 5);
this.y = this.y + random(-5, 5);
}
show() {
image(flower,this.x,this.y)
}
contains(px, py) {
let d = dist(px, py, this.x, this.y);
return d < this.r;
}
intersects(other) {
let d = dist(this.x, this.y, other.x, other.y);
return (d < this.r + other.r);
}
changeColor(bright) {
this.brightness = bright;
}
}let bubbles = [];
let unicorn;
function setup() {
createCanvas(600, 400);
for (let i = 0; i < 20; i++) {
let x = random(width);
let y = random(height);
let r = random(10, 12);
bubbles[i] = new Bubble(x, y, r)
}
unicorn = new Bubble(400, 200, 10);
}
function draw() {
background(0);
for (let i = 0; i < bubbles.length; i++) {
bubbles[i].show();
bubbles[i].move();
}
for (var b of bubbles) {
b.show();
b.move();
let overlapping = false;
for (var other of bubbles) {
if (b !== other && b.intersects(other)) {
overlapping = true;
}
if (overlapping) {
b.changeColor(255)
} else {
b.changeColor(0);
}
}
}
}
function mousePressed() {
if (bubbles[i].contains(mouseX, mouseY)) {
bubbles.splice(i, 1);
}
}
}
class Bubble {
constructor(x, y, r = 50) {
this.x = x;
this.y = y;
this.r = r;
this.brightness = 0;
}
move() {
this.x = this.x + random(-5, 5);
this.y = this.y + random(-5, 5);
}
show() {
stroke(255)
noFill()
strokeWeight(3)
fill(this.brightness, 100)
ellipse(this.x, this.y, this.r * 2);
}
contains(px, py) {
let d = dist(px, py, this.x, this.y);
return d < this.r;
}
intersects(other) {
let d = dist(this.x, this.y, other.x, other.y);
return (d < this.r + other.r);
}
changeColor(bright) {
this.brightness = bright;
}
}
let a=9;
let b=10;
let c;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
var c = add(a,b);
text('sum is'+c,170,200);
}
function add(num1,num2){
return num1+num2;
}
let bubble1;
let bubble2;
let bubbles = [];
function setup() {
createCanvas(600, 400);
bubble1 = new Bubble(200, 200);
bubble2 = new Bubble(400, 200, 100);
}
function draw() {
background(0);
if (bubble1.intersects(bubble2)) {
background(200, 0, 100);
}
bubble1.move();
bubble1.show();
bubble2.move();
bubble2.show();
bubble2.y=mouseY;
}
function mousePressed() {
if (bubbles[i].contains(mouseX, mouseY)) {
bubbles.splice(i, 1);
}
}
}
class Bubble {
constructor(x, y, r = 50) {
this.x = x;
this.y = y;
this.r = r;
this.brightness = 0;
}
move() {
this.x = this.x + random(-5, 5);
this.y = this.y + random(-5, 5);
}
show() {
stroke(255)
noFill()
strokeWeight(4)
fill(this.brightness, 100)
ellipse(this.x, this.y, this.r * 2);
}
contains(px, py) {
let d = dist(px, py, this.x, this.y);
return d < this.r;
}
intersects(other) {
let d = dist(this.x, this.y, other.x, other.y);
return(d<this.r+other.r);
}
changeColor(bright) {
this.brightness = bright;
}
}let bubbles = [];
function setup() {
createCanvas(600, 400);
}
function mouseDragged(){
let x = random(width);
let y = random(height);
let r = random(10, 50);
let b = new Bubble(mouseX, mouseY, r);
bubbles.push(b);
}
function draw() {
background(0);
for (let i = 0; i < bubbles.length; i++) {
if (bubbles[i].contains(mouseX, mouseY)) {
bubbles[i].changeColor(255);
}else{bubbles[i].changeColor(0);}
bubbles[i].move();
bubbles[i].show();
}
if(bubbles.length >10)
bubbles.splice(0,1);
}
function mousePressed() {
if (bubbles[i].contains(mouseX, mouseY)) {
bubbles.splice(i, 1);
}
}
}
class Bubble {
constructor(x, y, r) {
this.x = x;
this.y = y;
this.r = r;
this.brightness = 0;
}
move() {
this.x = this.x + random(-5, 5);
this.y = this.y + random(-5, 5);
}
show() {
stroke(255)
noFill()
strokeWeight(4)
fill(this.brightness, 100)
ellipse(this.x, this.y, this.r * 2);
}
contains(px, py) {
let d = dist(px, py, this.x, this.y);
return d < this.r;
}
changeColor(bright) {
this.brightness = bright;
}
}let bubbles = [];
function setup() {
createCanvas(600, 400);
for (let i = 0; i < 5; i++) {
let x = random(width);
let y = random(height);
let r = random(10, 50);
let b = new Bubble(x, y, r);
bubbles.push(b);
}
}
function draw() {
background(0);
for (let i = 0; i < bubbles.length; i++) {
if (bubbles[i].contains(mouseX, mouseY)) {
bubbles[i].changeColor(255);
}else{bubbles[i].changeColor(0);}
bubbles[i].move();
bubbles[i].show();
}
}
function mousePressed() {
for (let i = 0; i < bubbles.length; i++) {
if (bubbles[i].contains(mouseX, mouseY)) {
bubbles.splice(i, 1);
}
}
}
class Bubble {
constructor(x, y, r) {
this.x = x;
this.y = y;
this.r = r;
this.brightness = 0;
}
move() {
this.x = this.x + random(-5, 5);
this.y = this.y + random(-5, 5);
}
show() {
stroke(255)
noFill()
strokeWeight(4)
fill(this.brightness, 100)
ellipse(this.x, this.y, this.r * 2);
}
contains(px, py) {
let d = dist(px, py, this.x, this.y);
return d < this.r;
}
changeColor(bright) {
this.brightness = bright;
}
}let bubbles = [];
let bubble;
function setup() {
createCanvas(600, 400);
for(let i = 0;i<5;i++){
let x =random(width);
let y =random(height);
let r =random(10,50);
let b = new Bubble(x,y,r);
bubbles.push(b); 
}
}
function draw() {
background(0);
for (let i = 0; i < bubbles.length; i++) {
bubbles[i].move();
bubbles[i].show();
}
}
function mousePressed(){
for (let i = 0; i < bubbles.length; i++) {
bubbles[i].clicked(mouseX,mouseY);
}
}
class Bubble {
constructor(x, y, r) {
this.x = x;
this.y = y;
this.r = r;
this.brightness=0;
}
clicked(px,py){
let d = dist(px,py,this.x, this.y);
if(d < this.r){
this.brightness=255;
console.log("CLICKED ON THE BUBBLE!")
}
}
move() {
this.x = this.x + random(-5, 5);
this.y = this.y + random(-5, 5);
}
show() {
stroke(255)
noFill()
strokeWeight(4)
fill(this.brightness,100)
ellipse(this.x, this.y, this.r * 2);
}
}let bubbles = [];
function setup() {
createCanvas(600, 400);
frameRate(20);
}
function mouseDragged(){
let r =random(10,50);
let b =new Bubble(mouseX,mouseY,r)
bubbles.push(b);
}
function draw() {
background(0);
for (let i = 0; i < bubbles.length; i++) {
bubbles[i].move();
bubbles[i].show();
}
}
class Bubble {
constructor(x, y, r) {
this.x = x;
this.y = y;
this.r = r;
}
move() {
this.x = this.x + random(-5, 5);
this.y = this.y + random(-5, 5);
}
show() {
stroke(255)
noFill()
strokeWeight(0.1)
ellipse(this.x, this.y, this.r * 2);
}
}let balls = [];
function setup() {
createCanvas(400, 400);
for ( let i = 0; i < 100; i++){
balls[i] = new Ball(random(width),random(height),random(-3,3),random(-3,4));
}
}
function draw() {
background(220);
stroke(255);
for ( let i = 0; i < 20; i++){
balls[i].run();
}
}
class Ball{
constructor (x, y, xspeed,yspeed){
this.x = x;
this.y = y;
this.xspeed = xspeed;
this.yspeed = yspeed;
}
run(){
this.show();
this.move();
this.bounce();
}
show (){
ellipse(this.x, this.y, 5, 5);
}
move(){
this.x+=this.xspeed;
this.y+=this.yspeed;
}
bounce(){
if(this.x > width || this.x < 0 ) this.xspeed *=-1;
if(this.y > height || this.y <0) this.yspeed *= -1;
}
}let balls=[];
function setup() {
createCanvas(400, 400);
for (let i=0;i<5;i++){
balls.push(new Ball(random(width),random(height),1,1,30));
}
}
function draw() {
background(220);
for(let b in balls){
balls[b].run();
for(let other in balls){
if(balls[b].isNear(balls[other].x,balls[other].y)&&balls[b] != balls[other]){
background(80);}
}
if(balls[b].isNear(mouseX,mouseY)){
balls.splice(b,1);}
}
}
let ball2;
function setup() {
createCanvas(400, 400);
ball1 = new Bounce(2, 3, 4, 1);
ball2 = new Bounce(3, 4, 5, 3);
}
function draw() {
background(220);
ball1.show();
ball1.move();
ball2.move();
ball2.show();
}
class Bounce {
constructor(x, y, xspeed, yspeed) {
this.x = x;
this.y = y;
this.xspeed = xspeed;
this.yspeed = yspeed;
}
show() {
noFill();
strokeWeight(2);
stroke(0);
ellipse(this.x, this.y, 10);
}
move() {
this.x = this.x + this.xspeed;
this.y = this.y + this.yspeed;
if (this.x < 0 || this.x > width) {
this.xspeed *= -1;
}
if (this.y < 0 || this.y > height) {
this.yspeed *= -1;
}
}
}let x,y,xspeed=1,yspeed=1;
function setup() {
createCanvas(400, 400);
x=random(0,width);
y=random(0,height);
}
function draw() {
background(220);
noFill();
strokeWeight(4);
ellipse(x,y,10);
x=x+xspeed;
y=y+yspeed;
if(x<0||x>width){
xspeed*=-1;
}
if(y<0||y>height){
yspeed*=-1;
}
}
var x;
var y;
var xspeed;
var yspeed;
var r;
function setup() {
createCanvas(400, 400);
x = random(0, width);
y = random(0, height);
}
function draw() {
background(220);
bouncingBall(5, 5, 5, 3, 1);
}
function bouncingBall(x, y, r, xspeed, yspeed) {
noFill();
strokeWeight(1);
ellipseMode(CENTER);
ellipse(x, y, r, r);
console.log(x,y);
x = x + xspeed;
y = y + yspeed;
if (x < 0 || x > width) {
xspeed*=-1;
} 
if (y < 0 || y > height) {
yspeed*=-1;
}
}var x ;
var y ;
var xspeed ;
var yspeed ;
var r;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
bouncingBall(5,5,2,1,1)
}
function bouncingBall(x,y,r,xspeed,yspeed) {
noFill();
strokeWeight(3);
ellipseMode(CENTER);
ellipse(x, y, r, r);
if (x > r && y >  ) {
x = x + xspeed;
y = y + yspeed;
}
}let breadUps = [];
let breadDns = [];
let hams = [];
let tomatos = [];
let lettuses = [];
let cheeses = [];
let bread = 4;
let meat = 5;
let vegie = 3;
let x, y, colW, colH;
function setup() {
createCanvas(800, 600);
colW = 50;
colH = 50;
for (let i = 0; i < bread; i++) {
breadUps[i] = new BreadUp(random(width), random(-height, height));
breadDns[i] = new BreadDn(random(width), random(-height, height));
}
for (let i = 0; i < meat; i++) {
hams[i] = new Ham(random(width), random(-height, height));
cheeses[i] = new Cheese(random(width), random(-height, height));
}
for (let i = 0; i < vegie; i++) {
tomatos[i] = new Tomato(random(width), random(-height, height));
lettuses[i] = new Lettus(random(width), random(-height, height));
}
}
function draw() {
background(238, 222, 203);
for (let col = 0; col < width / colW; col++) {
for (row = 0; row < height / colH; row++) {
let x = col * colW;
let y = row * colH;
noFill();
stroke(190, 119, 87);
strokeWeight(2);
rect(x, y, colW, colH);
}
}
push();
fill(190, 119, 87);
rect(20, 555, 750, 20);
pop();
push();
noStroke();
fill(235, 187, 145);
rect(mouseX - 50, 535, 100, 20, 10)
pop();
for (b of breadUps) {
b.show();
b.move();
b.reset();
}
for (b of breadDns) {
b.show();
b.move();
b.reset();
b.addtotray();
}
for (b of hams) {
b.show();
b.move();
b.reset();
}
for (b of cheeses) {
b.show();
b.move();
b.reset();
}
for (b of tomatos) {
b.show();
b.move();
b.reset();
}
for (b of lettuses) {
b.show();
b.move();
b.reset();
}
}
var inc=0.008;
var whiteframe= 100;
function setup() {
createCanvas(600, 600);
fill(0);
noStroke();
rectMode(CENTER);
frameRate(24);
noiseDetail(3,0.5);
}
function draw() {
background(255);
for( let x= 10+whiteframe; x<width-whiteframe; x+=10) {
for( let y= 10+whiteframe; y<height-whiteframe; y+=10){
var n = noise(x*inc, y*inc, frameCount*0.05);
push();
translate(x,y);
rotate(TWO_PI*n);
scale(10*n);
rect(0,0,1,1);
pop();
}
}
}
function collapse () {
}
let bubbles = [];
function setup() {
createCanvas(600, 400);
frameRate(20);
}
function mouseDragged(){
let r =random(10,50);
let b =new Bubble(mouseX,mouseY,r)
bubbles.push(b);
}
function draw() {
background(0);
for (let i = 0; i < bubbles.length; i++) {
bubbles[i].move();
bubbles[i].show();
}
}
class Bubble {
constructor(x, y, r) {
this.x = x;
this.y = y;
this.r = r;
}
move() {
this.x = this.x + random(-5, 5);
this.y = this.y + random(-5, 5);
}
show() {
stroke(255)
noFill()
strokeWeight(0.1)
ellipse(this.x, this.y, this.r * 2);
}
}var nums = [100, 25, 46, 72];
function setup() {
createCanvas(500, 400);
}
function draw() {
background(0);
for(var i =0;i<4;i++){
noFill()
stroke(255);
ellipse(i*100+100,200,nums[i],nums[i]);}
var nums = [100,25,27,23];
var num = 23;
var index = 0;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(0);
ellipse(200,200,nums[2],nums[2]);
}
let bubble2;
function setup() {
createCanvas(600, 400);
bubble1 = new Bubble(200,200,20);
bubble2 = new Bubble(100,200,20);
}
function draw() {
background(0);
bubble1.move();
bubble1.show();
bubble2.move();
bubble2.show();
}
class Bubble {
constructor(x,y,r) {
this.x = x;
this.y = y;
this.r=r;
}
move() {
this.x = this.x + random(-5, 5);
this.y = this.y + random(-5, 5);
}
show() {
stroke(255);
strokeWeight(4);
noFill();
ellipse(this.x, this.y, this.r*2);
}
}
var y;
var w;
var h;
var i;
var j;
var col;
var opa;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
drawGrid(10, 5);
fillColor(10, 5);
}
function drawGrid(m, n) {
stroke(255);
for (i = 0; i < m; i++) {
for (j = 0; j < n; j++) {
w = width / m;
h = height / n;
x = i * width / m;
y = j * height / n;
rect(x, y, w, h);
}
}
}
function fillColor(m, n) {
for (i = 0; i < m; i++) {
for (j = 0; j < n; j++) {
w = width / m;
h = height / n;
x = i * width / m;
y = j * height / n;
var col = map(mouseX, 0, width, 0, 255);
var opa = map(mouseY, 0, height, 150, 255);
if (x < mouseX && mouseX < x + w && y < mouseY && mouseY < y + h) {
fill(col, opa);
rect(x, y, w, h);
} else {
}
console.log(col,opa);
}
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
for(i=0;i<10;i++){
for(j=0;j<5;j++){
rect(i*width/10,j*width/5,width/10,height/5);
}
}
if(mouseX>i*width/10){
rect(i*width/10,j*width/5,width/10,height/5);
fill(mouseX+mouseY/4);
}
}var bouncingy = 60;
var speed = 1;
var spot = 0.0
var k = 0;
var t = 1;
var rectY = 180;
var rspeed = 1;
var x;
var y;
function setup() {
createCanvas(400, 300);
frameRate(60);
angleMode(DEGREES);
}
function draw() {
background(241, 220, 230);
push();
for (var y = 20; y <= height - 20; y += 20) {
for (var x = 20; x <= width - 20; x += 20) {
noStroke();
fill(190,194,226);
ellipse(x, y, 4+(mouseX + mouseY) / 400, 4+(mouseX + mouseY) / 400);
stroke(250);
line(x,y,x+(mouseX + mouseY) / 400,y+(mouseX + mouseY) / 400);
}
}
pop();
push();
noFill();
stroke(228, 154, 193);
strokeWeight(2 + (mouseX + mouseY) / 400);
var shrinkingballR = map(mouseX + mouseY, 0, width, 50, 60);
ellipse(80, 100, shrinkingballR, shrinkingballR);
pop();
fill(243, 228, 109)
noStroke();
var bouncingsize = (mouseX + mouseY) / 200;
ellipse(300, bouncingy, 50 + bouncingsize, 50 + bouncingsize);
bouncingy = bouncingy + speed;
if (bouncingy < 70) {
speed = 1;
}
if (bouncingy > 100) {
speed *= -(1 + (mouseX + mouseY) / 800);
}
push();
translate(200, 100);
rotate(45);
rotate(angle);
noFill();
strokeWeight(2);
strokeJoin(ROUND);
stroke(214, 100, 72);
rectMode(CENTER);
rect(0, 0, 40, 40);
rect(0, 0, 30, 30);
rect(0, 0, 20, 20);
rect(0, 0, 10, 10);
angle = angle + (1 + (mouseX + mouseY) / 200);
push();
noFill();
strokeWeight(2);
translate(200, 200);
ellipse(0, 0, 60, 60);
rotate(angle);
noStroke();
ellipse(30, 0, 15, 15);
angle = angle + 1 + (mouseX + mouseY) / 200;
pop();
push();
fill(226, 115, 60);
jitter = random(-1, 1);
spot += k;
var c = 5*sin(spot) ;
if (mouseX>50&&mouseX<110&&mouseY<230&&mouseY>170){
k=100;  
}
else{
k=15
}
translate(80, 200);
rotate(c);
rectMode(CENTER);
rect(0, 0, 60, 60, 3);
pop();
push();
fill(219, 114, 103);
translate(310, rectY);
rotate(90);
rotate(angle);
angle = angle + 1;
rectMode(CENTER);
rect(0, 0, 50, 50, t);
if (rectY < 180) {
rspeed = 0.5;
}
rectY = rectY + rspeed;
t = map(rectY, 180, 200, 5, 25, true);
if (rectY > 200) {
rspeed = -1
}
if (rectY > 200) {
rspeed = -1
}
pop();
}  var BouncingballY = 0;
var randomcircle={
x:80,
y:160
}
var x = 160;
var y = 180;
var r = 40;
var a = 0.0;
var s = 0.0;
var spot = 0.0;
var jitter = 0.0;
var angleLinesoncircle=0;
function setup() {
createCanvas(400,400);
angleMode(DEGREES);
noStroke();
frameRate(1000);
xpos = width / 6;
ypos = height / 5;
}
function draw() {
background(255);
for(var y=20;y<=height-20;y+=10){
for(var x=20;x<=width-20;x+=10){ 
noStroke();
fill(240);
ellipse(x, y, 4, 4);
} }
stroke(0,0,250);
strokeWeight(2);
noFill();
var shrinkingballW= map(mouseY,0,width,20,35);
var shrinkingballH= map(mouseY,0,width,20,35);
ellipse(335,260,shrinkingballW,shrinkingballH);
fill(0,0,255);
ellipse(155, BouncingballY, 10, 10);
if (BouncingballY<60) {
speed=1;
}
BouncingballY = BouncingballY + speed;
if(BouncingballY>100){
speed=-1;
}
BouncingballY = BouncingballY + speed;
push();
translate(250,80)
rotate(45)
rotate(angle);
noFill()
stroke(0,0,255)
strokeWeight(1);
rectMode(CENTER);
rect(0,0,40,40);
rect(0,0,30,30);
rect(0,0,20,20);
rect(0,0,10,10);
angle=angle+1;
pop();
strokeCap(SQUARE);
strokeWeight(4);
stroke(0,0,255);
var lineX1 = map(mouseX,0,width,330,340);
line(lineX1,70,320,70);
var lineX2 = map(mouseX,0,width,320,330);
line(350,80,lineX2,80);
var lineX3 = map(mouseX,0,width,330,340);
line(lineX3,90,320,90);
noFill();
strokeWeight(2);
stroke(0,0,255);
ellipse(randomcircle.x,160,15,15);
fill(0,0,255);
ellipse(70,160,15,15);
randomcircle.x = randomcircle.x + random(-2, 2);
noFill();
strokeWeight(1);
stroke(0,0,255);
ellipse(250,160,random(20),20);
push();
noFill();
stroke(0,0,255);
translate(160,160);
ellipse(0,0,40,40);
rotate(90);
rotate(angle);
fill(0,0,255);
ellipse(13,13,15,15);
angle=angle+1;
pop();
push();
fill(0,0,255)
strokeWeight(8);
translate(335,160);
rotate(45)
rotate(angleCross);
line(-20,0,20,0);
line(0,-20,0,20);
angleCross=angleCross-1;
pop();
push();
fill(0,0,255);
noStroke();
translate(70,255);
rotate(45)
rotate(angleCross);
ellipse(0,20,10,10);
ellipse(0,-10,10,10);
pop();
push();
var eSize = 7;
var x1 = mouseY;
var y1 = 240;
translate(250,240);
rotate(90);
line(0, y1-240, 40, y1-240);
var x1=map(mouseY,0,width,240,250);
fill(0,0,255)
ellipse(x1-240, y1-240, eSize, eSize);
line(0,y1+20-240,40,y1+20-240);
ellipse(x1+10-240,y1+20-240,eSize,eSize) 
line(0,y1-20-240,40,y1-20-240)
ellipse(x1-240+20,y1-20-240,eSize,eSize) 
fill(0);
pop();
fill(bright);
noStroke();
ellipse(160,260,30,30);
if (mouseX < 200 && mouseY < 260) {
bright = 255;
}else{
fill(0,0,255);
ellipse(160,260,30,30);
bright=bright-30;
}
bright=bright-30;
push();
var a = (mouseY - height / 2, mouseX - width / 2);
translate(335,260);
push();
rotate(a);
strokeCap(ROUND);
pop();
pop();
xpos = xpos + xspeed * xdirection;
ypos = ypos + yspeed * ydirection;
if (xpos > 50|| xpos < 100) {
xdirection *= -1;
}
if (ypos > 200|| ypos < 200) {
ydirection *= -1;
}
ellipse(xpos, ypos, rad, rad);
a = a + 0.04;
push();
stroke(0,0,255);
noFill()
rectMode(CENTER);
translate(65, 335);
scale(s); 
rect(0, 0, 30, 30); 
pop();
push();
jitter = random(-1, 1);
}
spot = spot +5;
var c = sin(spot);
translate(320, 323);
rotate(c);
rect(0, 0, 65, 65); 
pop();
push();
translate(160,335);
rotate(90)
rotate(angleLinesoncircle)
strokeWeight(2);
stroke(0,0,255);
noFill();
ellipse(0,0,30,30);
fill(255);
stroke(255);
rect(-13,-10,26,1);
rect(-16,-5,34,1)
rect(-16,0,34,1);
rect(-16,5,34,1);
rect(-13,10,26,1);
angleLinesoncircle=angleLinesoncircle-1
pop();
noFill()
stroke(0,0,255)
translate(250,335)
rotate(angle)
ellipse(0,0,30,20)
rotate(5)
ellipse(0,0,20,30)
rotate(3)
ellipse(0,0,10,30)
rotate(3)
ellipse(0,0,30,10)
}
var speed = 1;
var drX = 260;
var drY = 355;
var drX2 = 248;
var drY2 = 363;
var drX3 = 239;
var drY3 = 359;
var eyes = {
x: 250,
y: 250,
sizeX: 10,
sizeY: 20
}
function setup() {
createCanvas(500, 500);
}
function draw() {
background(252, 199, 223);
noStroke();
fill(66, 62, 87);
ellipseMode(CENTER);
ellipse(250, 300, 200, 150);
triangle(153, 283, 185, 180, 253, 300);
triangle(347, 283, 315, 180, 247, 300);
fill(252, 199, 223);
triangle(173, 245, 187, 198, 200, 230);
triangle(327, 245, 314, 198, 300, 230);
fill(255, 245, 126);
ellipseMode(CENTER);
ellipse(250, 245, 25, 25);
fill(66, 62, 87);
ellipse(250, 240, 22, 18);
fill(252, 199, 223);
noStroke(0);
ellipseMode(CENTER);
ellipse(250, 320, 13, 7);
fill(120, 183, 224);
ellipse(drX, drY, 7, 12);
drY = drY + (speed + 0.3);
ellipse(drX2, drY2, 5, 10);
drY2 = drY2 + speed;
ellipse(drX3, drY3, 5, 10);
drY3 = drY3 + (speed + 0.5);
if (drY > 510) {
drY = 350;
drX = random(230,260);
}
if (drY2 > 510) {
drY2 = 350;
drX2 = random(230,260);
}
if (drY3 > 510) {
drY3 = 350;
drX3 = random(230,260);
}
if (mouseIsPressed) {
noStroke(0);
fill(255, 109, 133);
arc(250, 335, 15, 30, 0, PI);
noFill(0);
stroke(1, 70);
line(250, 335, 250, 350);
fill(0)
textSize(30);
text('一口ちょうだい', random(145, 155),random(120,130));
}
stroke(255);
strokeWeight(1)
fill(66, 62, 87);
curve(250, 300, 250, 335, 230, 335, 260, 280);
curve(250, 300, 250, 335, 270, 335, 260, 280);
stroke(0);
strokeWeight(1);
line(183, 277, 200, 280);
line(183, 295, 202, 290);
line(317, 277, 299, 280);
line(317, 295, 298, 290);
strokeWeight(2);
line(125, 300, 165, 310);
line(120, 320, 165, 320);
line(130, 340, 170, 330);
line(375, 300, 335, 310);
line(380, 320, 335, 320);
line(370, 340, 330, 330);
var eyesY = map(mouseY, 0, height, 280, 290);
var eyesX = map(mouseX, 0, width, 215, 225);
noStroke();
fill(255);
ellipse(220, 285, 35, 45);
ellipse(280, 285, 35, 45);
fill(66, 62, 87);
ellipse(eyesX, eyesY, eyes.sizeX + 15, eyes.sizeY + 15);
ellipse(eyesX + 60, eyesY, eyes.sizeX + 15, eyes.sizeY + 15);
fill(255);
ellipse(eyesX, eyesY, eyes.sizeX, eyes.sizeY);
ellipse(eyesX + 60, eyesY, eyes.sizeX, eyes.sizeY);
fill(120, 183, 224);
noStroke(0);
ellipseMode(CENTER);
ellipse(mouseX, mouseY, 60, 30);
triangle(mouseX + 20, mouseY, mouseX + 50, mouseY - 15, mouseX + 50, mouseY + 15);
if (mouseIsPressed) {
stroke(0)
line(mouseX - 10, mouseY - 7, mouseX - 20, mouseY + 3);
line(mouseX - 10, mouseY + 3, mouseX - 20, mouseY - 7);
speed = 4
} else {
fill(0)
ellipse(mouseX - 18, mouseY, 5, 5);
speed = 1
}
}let numCols;
let numRows;
let colW;
let rowH;
function setup() {
createCanvas(400, 400);
numCols=100;
numRows=100;
colW=width/numCols;
rowH=height/numRows;
}
function draw() {
background(255);
noStroke();
for(let col=0;col<numCols;col++){
for(let row=0;row<numRows;row++){
let x =col*colW;
let y =row*rowH;
let d=dist(mouseX,mouseY,x,y);
let speed =0.1;
d=map(d,0,dist(0,0,width,height),200,0);
fill(d,d,200);
rect(x,y,colW,rowH);
y=y-y*speed*(y-mouseY);
x=x-x*speed*(x-mouseX);
}
}
}
class Ball {
constructor(x, y, xspeed, yspeed) {
this.x = x;
this.y = y;
this.xspeed = xspeed;
this.yspeed = yspeed;
let bg = 128;
let bgspeed = 5;
function setup() {
createCanvas(400, 400);
}
run() {
this.update();
this.render()
}
function draw() {
background(bg);
update() {
this.xspeed = bounce(this.x, 0, width, this.xspeed);
this.yspeed = bounce(this.y, 0, height, this.yspeed);
this.x += this.xspeed;
this.y += this.yspeed;
}
}
ellipse(this.x, this.y, 50, 50);
}
}
function bounce(state, low, high, speed) {
if (state > high || state < low) speed *= -1;
return speed;
}
var on = false;
var cr = 250;
var cb = 200;
var cg = 200;
var spot = {
x: 100,
y: 50
};
var col = {
r: 0,
g: 25,
b: 9
}
var b=100;
var g=200;
var r=150;
var on = false;
function setup() {
createCanvas(600, 400);
}
function draw() {
fill(255);
rect(250,350,100,50)
if(mouseY>350){
cr = map(mouseY, 0, 600, 100, 26000);
cg = map(mouseX, 0, 600, 100, 200);
cb = map(mouseX, 0, 600, 100, 200);
}
if (on) {
background(300, 105, 150,50);
} else {
background(cr, cg, cb, 50);
}
b++;
b=b%300;
g++;
g=g%300;
noStroke();
var dot = {
locationX: random(width),
locationY: random(height),
size: random(1, 8)
}
ellipse(dot.locationX, dot.locationY, dot.size, dot.size);
spot.x = random(mouseX - 30, mouseX + 30);
spot.y = random(mouseY - 30, mouseY + 30);
col.r = random(100, 2600);
col.g = random(100, 250);
col.b = random(100, 150);
fill(col.r, col.g, col.b, 80);
ellipse(spot.x, spot.y, dot.size * 2, dot.size * 2);
}
function mousePressed() {
if (mouseX > 250 && mouseX < 350 && mouseY > 350 && mouseY < 400) {
fill(255);
rect(250,350,100,50)
on = !on;
}
}
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
for (i = 0; i < 10; i++) {
stroke(100, mouseX, mouseY);
strokeWeight(2);
line(i / 10 * width, 0, i / 10 * width, height);
for (k = 0; k < 10; k++) {
line(0,k / 10 * width, height, k / 10 * width);
fill(255);
rect((i)/10*width,(i)/10*width,1/10*height,1/10*height);
rect((i+2)/10*width,(i)/10*width,1/10*height,1/10*height);
rect((i+4)/10*width,(i)/10*width,1/10*height,1/10*height);
rect((i+6)/10*width,(i)/10*width,1/10*height,1/10*height);
rect((i+8)/10*width,(i)/10*width,1/10*height,1/10*height);
rect((i)/10*width,(i+2)/10*width,1/10*height,1/10*height);
rect((i)/10*width,(i+4)/10*width,1/10*height,1/10*height);
rect((i)/10*width,(i+6)/10*width,1/10*height,1/10*height);
rect((i)/10*width,(i+8)/10*width,1/10*height,1/10*height);
}
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
noStroke();
for (let i = 0; i < 10; i++) {
let x = i * width / 10;
if (mouseX > i / 10 * width && mouseX < (i + 1) / 10 * width) {
fill(255, i*10, i*20);
rect(i / 10 * width, 0, 1 / 10 * width, height);
}
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
noStroke();
for (let i = 0; i < 10; i++) {
let x = i*width/10;
if (mouseX > i / 10* width && mouseX < (i + 1) / 10* width) {
fill(255, 0, 0);
rect(i / 10 * width, 0, 1/10 * width , height);
if(i%2==0){
fill(0,0,255);
rect(i / 10 * width, 0, 1/10 * width , height);
}
}
}
1. divide 
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
noStroke();
for (let i = 0; i < 10; i++) {
let x = i*width/10;
if (mouseX > i / 10* width && mouseX < (i + 1) / 10* width) {
fill(255, 0, 0);
rect(i / 10* width, 0, 1/10*width , height);
if(i<5){
fill(0,0,255);
rect(i / 10* width, 0, 1/10*width , height);
}
}
}
1. divide 
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
noStroke();
for (let i = 0; i < 10; i++) {
let x = i*width/10;
if (mouseX > i / 10* width && mouseX < (i + 1) / 10* width) {
fill(255, 0, 0);
rect(i / 10* width, 0, 1/10*width , height);
if(i==7){
fill(220);
rect(7 / 10* width, 0, 1/10*width , height);
}
}
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
for (let i = 0; i < 10; i++) {
let x = i * width/10;
if (i == 7) fill('blue');
else fill('white');
line(x, 0, x, height);
}
line(0, 0, 0, height);
line(width/10, 0, width/10, height);
line(2*width/10, 0, 2*width/10, height);
line(3*width/10, 0, 3*width/10, height);
line(4*width/10, 0, 4*width/10, height);
line(5*width/10, 0, 5*width/10, height);
line(6*width/10, 0, 6*width/10, height);
line(7*width/10, 0, 7*width/10, height);
line(8*width/10, 0, 8*width/10, height);
line(9*width/10, 0, 9*width/10, height);  
1. divide 
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
noStroke();
for (let i = 0; i < 10; i++) {
let x = i*width/10;
if (mouseX > i / 10* width && mouseX < (i + 1) / 10* width) {
fill(255, 0, 0);
rect(i / 10* width, 0, 1/10*width , height);
if(i==7){
fill(220);
rect(7 / 10* width, 0, 1/10*width , height);
}
}
}
}let mouseIsOn = false;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
noStroke();
if (mouseX < 1 / 3 * width && mouseX > 0 && mouseIsOn==true) {
fill(255, 0, 0);
rect(0, 0, 1 / 3 * width, height);
} else if (mouseX > 1 / 3 * width && mouseX < 2 / 3 * width&&mouseIsOn==true) {
fill(255, 0, 0);
rect(1 / 3 * width, 0, 1 / 3 * width, height);
} else if (mouseX > 2 / 3 * width && mouseX < width&&mouseIsOn==true) {
fill(255, 0, 0);
rect(2 / 3 * width, 0, 1 / 3 * width, height);
}
}
function mousePressed(){
mouseIsOn =!mouseIsOn;
1. divide 
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
if (mouseX < 1 / 3 * width && mouseX > 0) {
fill(255, 0, 0);
rect(0, 0, 1 / 3 * width, height);}
else if (mouseX>1/3*width&&mouseX < 2 / 3 * width){
fill(255, 0, 0);
rect(1 / 3 * width, 0, 1 / 3 * width, height);
}
else if (mouseX>2/3*width&&mouseX < width){
fill(255, 0, 0);
rect(2 / 3 * width, 0, 1 / 3 * width, height);}
}
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
var on = false;
var cr = 250;
var cb = 200;
var cg = 200;
var spot = {
x: 100,
y: 50
};
var col = {
r: 0,
g: 25,
b: 9
}
var b=100;
var g=200;
var r=150;
var on = false;
function setup() {
createCanvas(600, 400);
}
function draw() {
fr = map (mouseY,0,600,48,6);
frameRate(fr);
if (on) {
background(300, 105, 150,50);
} else {
background(r, g, b, 50);
}
b++;
b=b%300;
g++;
g=g%300;
noStroke();
var dot = {
locationX: random(width),
locationY: random(height),
size: random(1, 8)
}
ellipse(dot.locationX, dot.locationY, dot.size, dot.size);
spot.x = random(mouseX - 30, mouseX + 30);
spot.y = random(mouseY - 30, mouseY + 30);
col.r = random(100, 2600);
col.g = random(100, 250);
col.b = random(100, 150);
fill(col.r, col.g, col.b, 80);
ellipse(spot.x, spot.y, dot.size * 2, dot.size * 2);
cr = map(mouseY, 0, 600, 100, 26000);
cg = map(mouseX, 0, 600, 100, 200);
cb = map(mouseX, 0, 600, 100, 200);
fill(cr, cg, cb);
console.log(cr, cg, cb)
rect(0, 0, 50, 400)
rect(0, 0, 600, 50)
rect(550, 0, 400, 400)
rect(0, 350, 600, 50)
}
function mousePressed() {
if (mouseX > 250 && mouseX < 350 && mouseY > 150 && mouseY < 250) {
on = !on;
}
}
var spot = {
x: 100,
y: 50
};
var col = { 
r: 0,
g: 25,
b: 9
}
function setup() {
createCanvas(600, 400);
background(245);
}
function draw() {
noStroke();
spot.x = random(0,600);
spot.y = random(0,400);
col.r = random(100,2600);
col.g = random(100,250);
col.b = random(100,250);
fill(col.r,col.g,col.b,100);
ellipse(spot.x,spot.y,24,24);
}var x = 95;
var y = 150;
var v=0.02;
var d;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(240);
stroke(0);
fill(0);
strokeJoin(ROUND);
strokeWeight(2);
beginShape();
vertex(30,80);
bezierVertex(80,50,165,65,240,100);
bezierVertex(145,70,70,75,20,110);
bezierVertex(30,80,30,80,30,80);
endShape();
noFill();
strokeWeight(3);
strokeJoin(ROUND);
beginShape();
vertex(30,170);
bezierVertex(65,115,120,125,155,145);
bezierVertex(162,150,180,150,190,150);
bezierVertex(135,180,95,222,30,170);
endShape();
strokeWeight(6);
strokeJoin(MITER);
beginShape();
vertex(30,170);
bezierVertex(65,125,120,125,155,145);
bezierVertex(162,150,180,150,190,150);
endShape();
fill(0);
x+=(mouseX-x)*v;
y+=(mouseY-y)*v;
fill(0);
ellipse(x,y,30+d*0.02,28+d*0.02);
d = dist(mouseX,mouseY,95,150)
if(d>60 && 0<d <10){
x = 95;
y=150;
}
}
var on = false;
var cr = 250;
var cb = 200;
var cg = 200;
var spot = {
x: 100,
y: 50
};
var col = { 
r: 0,
g: 25,
b: 9
}
var dr;
function setup() {
createCanvas(600, 400);
background(300,105,150,50);
}
function draw() {
noStroke();
spot.x = random(mouseX-30,mouseX+30);
spot.y = random(mouseY-30,mouseY+30);  
col.r = random(100,2600);
col.g = random(100,250);
col.b = random(100,150);
fill(col.r,col.g,col.b,70);
ellipse(spot.x,spot.y,24,24);
cr = map (mouseY,0,600,100,26000);
cg = map (mouseX,0,600,100,200);
cb = map (mouseX,0,600,100,200);
fill(cr,cg,cb);
console.log(cr,cg,cb)
rect(0,0,50,400)
rect(0,0,600,50)
rect(550,0,400,400)
rect(0,350,600,50)
function mousePressed(){
if  (mouseX > 200 && mouseX < 400 && mouseY>100 &&mouseY<300){
on=!on;
}
}
}
var on = false;
var cr = 250;
var cb = 200;
var cg = 200;
var spot = {
x: 100,
y: 50
};
var col = {
r: 0,
g: 25,
b: 9
}
var on = false;
function setup() {
createCanvas(600, 400);
}
function draw() {
fr = map (mouseY,0,600,48,6);
frameRate(fr);
if (on) {
background(300, 105, 150,50);
} else {
background(255, 255, 255, 50);
}
noStroke();
var dot = {
locationX: random(width),
locationY: random(height),
size: random(1, 8)
}
ellipse(dot.locationX, dot.locationY, dot.size, dot.size);
spot.x = random(mouseX - 30, mouseX + 30);
spot.y = random(mouseY - 30, mouseY + 30);
col.r = random(100, 2600);
col.g = random(100, 250);
col.b = random(100, 150);
fill(col.r, col.g, col.b, 80);
ellipse(spot.x, spot.y, dot.size * 2, dot.size * 2);
cr = map(mouseY, 0, 600, 100, 26000);
cg = map(mouseX, 0, 600, 100, 200);
cb = map(mouseX, 0, 600, 100, 200);
fill(cr, cg, cb);
console.log(cr, cg, cb)
rect(0, 0, 50, 400)
rect(0, 0, 600, 50)
rect(550, 0, 400, 400)
rect(0, 350, 600, 50)
}
function mousePressed() {
if (mouseX > 250 && mouseX < 350 && mouseY > 150 && mouseY < 250) {
on = !on;
}
}
let speed = 0.1;
let x;
let y;
let dx;
let dy;
function setup() {
createCanvas(600, 600);
x = width / 2;
y = height / 2;
}
function draw() {
background(220);
rectMode(CENTER);
dx = x - mouseX;
dy = mouseY - y;
x = x - dx * speed;
y = y + dy * speed;
rect(x, y, width / 2, height / 2);
}let speed = 0.1;
let x;
let y;
let dx;
let dy;
function setup() {
createCanvas(600, 600);
x = width / 2;
y = height / 2;
}
function draw() {
background(220);
rectMode(CENTER);
dx = x - mouseX;
dy = mouseY - y;
x = x - dx * speed;
y = y + dy * speed;
rect(x, y, width / 2, height / 2);
}function setup() {
createCanvas(600, 600);
}
function draw() {
background(220);
beginShape();
vertex(width / 4, height / 4);
vertex((3 * width) / 4, height / 4);
vertex((3 * width) / 4, (3 * height / 4));
vertex(width / 4, (3 * height / 4));
endShape(CLOSE);
}let x = 0;
let y = 0;
function setup() {
createCanvas(600, 600);
x = width / 2;
y = height / 2;
}
function draw() {
background(225);
ellipse(x, y, 20, 20);
x = x + 1;
y = y - 1;
}var on = false;
function setup() {
createCanvas(600, 400);
}
function draw() {
if (on) {
background(0, 255, 0);
}
else {
background(0);
}
stroke(255);
strokeWeight(4);
noFill();
if (mouseX > 250 && mouseX < 350 && mouseY>150 &&mouseY<250)
{
fill(255,0,200);
}
rectMode(CENTER);
rect(300, 200, 100, 100);
}
function mousePressed(){
if (mouseX > 250 && mouseX < 350 && mouseY>150 &&mouseY<250)
if (on) {
on = false;}
else {
on=true;}
}
x: 100,
y: 50
};
var col = { 
r: 0,
g: 25,
b: 9
}
function setup() {
createCanvas(600, 400);
background(245);
}
function draw() {
noStroke();
spot.x = random(0,600);
spot.y = random(0,400);
col.r = random(100,2600);
col.g = random(100,250);
col.b = random(100,250);
fill(col.r,col.g,col.b,1);
ellipse(spot.x,spot.y,24,24);
}
let x=0;
let y =0;
function setup() {
createCanvas(400, 400);
x=width/2;
y=height/2;
}
function draw() {
background(220);
x=x+1;
y=y+1;
ellipse(x,y,50,50);
}function setup() {
createCanvas(400, 400);
rectMode(CENTER,CENTER);
}
function draw() {
background(220);
push();
rect(0,0,50,50);
pop();
push();
translate(100,100);
rect(100,100,50,50)
pop();
}function setup() {
createCanvas(400, 250);
ellipseMode(CENTER);
rectMode(CENTER);
background(246, 245, 243);
strokeWeight(2);
stroke(104,189,225);
line(70,60,110,120);
line(10,30,40,90);
line(250,20,280,90);
line(140,30,170,90);
line(270,140,300,190);
line(70,160,90,190);
line(310,100,340,150);
fill(116, 45, 210);
noStroke();
ellipse(200, 105, 130, 150);
noStroke();
fill(255);
ellipse(200, 250, 100, 195);
fill(255, 232, 207);
noStroke();
arc(200, 100, 100, 120, 0, PI + QUARTER_PI, OPEN);
fill(79, 50, 59);
ellipse(180, 115, 6, 8);
ellipse(220, 115, 6, 8);
noFill();
stroke(79, 50, 59)
arc(180, 109, 8, 8, HALF_PI, PI);
arc(220, 109, 8, 8, 0, HALF_PI);
noFill();
curveVertex();
beginShape();
curveVertex(195,137);
curveVertex(195,137);
curveVertex(200,136);
curveVertex(205,137);
curveVertex(205,137);
curveVertex();
endShape();
}function setup() {
createCanvas(600, 400);
}
function draw() {
background(255, 0, 0);
fill(0, 255, 255);
noStroke();
triangle(0, 30, 0, 400, 565, 400);
triangle(35, 0, 600, 0, 600, 370);
push();
fill(29, 189, 32);
ellipse(300, 200, 300, 200);
pop();
push();
fill(2, 12, 126)
rect(420, 180, 30, 30);
pop();
}function setup() {
createCanvas(600, 400);
}
function draw() {
background(255, 0, 0);
fill(0, 255, 255);
noStroke();
triangle(0, 30, 0, 400, 565, 400);
triangle(35, 0, 600, 0, 600, 370);
fill(29, 189, 32);
ellipse(300, 200, 300, 200);
fill(2, 12, 126)
rect(420, 180, 30, 30);
}function setup() {
createCanvas(600, 400);
}
function draw() {
background(0, 255, 255);
noStroke();
line(0,30,570,400);
push();
fill(255, 0, 0);
line(30,0,600,370);
pop();
fill(29, 189, 32);
ellipse(300, 200, 300, 200);
rectMode(CORNER);
fill(2, 12, 126)
rect(420, 180, 30, 30);
}function setup() {
createCanvas(600, 400);
}
function draw() {
background(255, 0, 0);
fill(0, 255, 255);
noStroke();
triangle(0, 30, 0, 400, 565, 400);
triangle(35, 0, 600, 0, 600, 370);
fill(29, 189, 32);
ellipse(300, 200, 300, 200);
fill(2, 12, 126)
rect(420, 180, 30, 30);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
noStroke();
fill(8, 232,222);
ellipse(200, 200, 100, 100);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
fill(___, ___, ___);
ellipse(200, 200, 100, 100);
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
}