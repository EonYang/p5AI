var value1 = 220;
var scary_song;
var spider_mad;
var explosion;
var portName = '/dev/cu.usbmodem1411';
var inData;
var see;
var played= false;
function setup() {
createCanvas(windowWidth, windowHeight);
scary_song = loadSound("ft_song.mp3", loaded);
spider_mad = loadSound("spider_mad.mp3", loaded);
explosion = createVideo("explosion.mp4")
see = loadImage('kanye.png');
}
function serverConnected() {
}
function portOpen() {
}
}
}
function portClose() {
}
for (var i = 0; i < portList.length; i++) {
}
}
function loaded() {
scary_song.play();
}
function draw() {
background(value1);
imageMode(CENTER);
value1 = 0;
played = false;
see = loadImage('kanye.png');
see = explosion.play();
explosion.play();
scary_song.stop();
if (played==false){
spider_mad.play(10);
played =true;
}
}
var value1 = 220;
var scary_song;
var spider_mad;
var explosion;
var portName = '/dev/cu.usbmodem1411';
var inData;
var see;
function setup() {
createCanvas(windowWidth, windowHeight);
scary_song = loadSound("ft_song.mp3", loaded);
explosion = createVideo("explosion.mp4")
see = loadImage('kanye.png');
explosion.hide();
}
function serverConnected() {
}
function portOpen() {
}
}
}
function portClose() {
}
for (var i = 0; i < portList.length; i++) {
}
}
function loaded() {
scary_song.play();
}
function draw() {
background(value1);
imageMode(CENTER);
value1 = 0;
see = loadImage('kanye.png');
see = explosion.play();
scary_song.stop();
} 
}
var value1 = 220;
var scary_song;
var spider_mad;
var explosion;
var portName = '/dev/cu.usbmodem1411';
var inData;
var see;
function setup() {
createCanvas(windowWidth, windowHeight);
scary_song = loadSound("ft_song.mp3", loaded);
explosion = createVideo("explosion.mp4")
see = loadImage('kanye.png');
explosion.hide();
}
function serverConnected() {
}
function portOpen() {
}
}
}
function portClose() {
}
for (var i = 0; i < portList.length; i++) {
}
}
function loaded() {
scary_song.play();
}
function draw() {
background(value1);
imageMode(CENTER);
value1 = 0;
see = loadImage('kanye.png');
see = explosion.play();
scary_song.stop();
} 
}
var portName = '/dev/cu.usbmodem1411';
var inData;  
var circleSize = 30;
function setup() {
createCanvas(400, 300);
}
function draw() {
background("#004488");
fill("#44AAFF");
noStroke();
ellipse(width/2, height/2, circleSize, circleSize);
}
function serverConnected() {
}
function portOpen() {
}
circleSize = inData; 
}
}
function portClose() {
}
for (var i = 0; i < portList.length; i++) {
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
var value1 = 220;
var scary_song;
var spider_mad;
var explosion;
var portName = '/dev/cu.usbmodem1411';
var inData;
var see;
function setup() {
createCanvas(windowWidth, windowHeight);
kanye = loadImage('kanye.png');
scary_song = loadSound("ft_song.mp3", loaded);
explosion = createVideo("explosion.mp4")
see = loadImage('kanye.png');
}
function serverConnected() {
}
function portOpen() {
}
}
}
function portClose() {
}
for (var i = 0; i < portList.length; i++) {
}
}
function loaded() {
scary_song.play();
}
function draw() {
background(value1);
imageMode(CENTER);
image(see, windowWidth/2, windowHeight/2, mouseX, mouseX, );
text("sensor value: " + inData, 30, 30);
if (mouseX <= 450) {
value1 = 0;
see = loadImage('kanye.png');
} else if (mouseX >= 450) {
see = explosion.play();
scary_song.stop();
} 
}
var kanye;
var value1 = 220;
var scary_song;
var spider_mad;
var explosion;
var portName = '/dev/cu.usbmodem1411';
var inData;
function setup() {
createCanvas(windowWidth, windowHeight);
kanye = loadImage('kanye.png');
scary_song = loadSound("ft_song.mp3", loaded);
explosion = createVideo("explosion.mp4")
}
function serverConnected() {
}
function portOpen() {
}
}
}
function portClose() {
}
for (var i = 0; i < portList.length; i++) {
}
}
function loaded() {
scary_song.play();
}
function draw() {
background(value1);
imageMode(CENTER);
image(kanye, 300, 200, mouseX, mouseX, );
text("sensor value: " + inData, 30, 30);
}
if (mouseX <= 500) {
value1 = 0;
} else {
explosion.play();
scary_song.stop();
}
}
var value1 = 220;
function preload() {
hugs = loadImage('hugs.png');
}
function setup() {
createCanvas(400, 400);
}
function draw() {
background(value1);
imageMode(CENTER);
image(hugs, 200, 200,mouseX,mouseX);
if (mouseX <= 294) {
value1 = 0;
} else { 
value1 = 255;
}
}
function setup() {
}
for (var i = 0; i < portList.length; i++) {
}
function setup() {
}
function serverConnected() {
}
function portOpen() {
}
}
}
function portClose() {
}
}
var kanye, explosion, explosion2;
var value1 = 220;
function preload() {
kanye = loadImage('kanye.png');
explosion = loadImage('explosion.gif');
explosion2 = createImage('explosion.gif');
}
function setup() {
createCanvas(400, 400);
}
function draw() {
background(value1);
imageMode(CENTER);
image(kanye, 200, 200,mouseX,mouseX);
if (mouseX <= 294) {
value1 = 0;
} else { 
value1 = 255;
}
}
var kanye, explosion, explosion2;
var value1 = 220;
function preload() {
kanye = loadImage('kanye.png');
explosion = loadImage('explosion.gif');
explosion2 = createImage('explosion.gif');
}
function setup() {
createCanvas(400, 400);
}
function draw() {
background(value1);
imageMode(CENTER);
image(kanye, 200, 200,mouseX,mouseX);
if (mouseX <= 294) {
value1 = 0;
} else { 
value1 = 255;
}
}
var hugs;
var value1 = 220;
function preload() {
hugs = loadImage('hugs.png');
}
function setup() {
createCanvas(400, 400);
}
function draw() {
background(value1);
imageMode(CENTER);
image(hugs, 200, 200,mouseX,mouseX);
if (mouseX <= 294) {
value1 = 0;
} else { 
value1 = 255;
}
}
var txt = "This rainbow has a unicorn flying over it.";
function setup(){
noCanvas();
var ngrams = [];
for (var i = 0; i < txt.length; i++) {
var gram = txt.substring(i, i + 3);
ngrams.push(gram);
}
console.log(ngrams);
}var ball = {
x: 100,
y: 300,
xspeed: 2,
yspeed: -3
}
let ball2= {
x: 300,
y: 100,
xspeed: 2,
yspeed: -3
}
function setup() {
createCanvas(450, 400);
}
function draw() {
background(0);
move();
bounce();
display();
}
function bounce() {
if (ball.x > width || ball.x < 0) {
ball.xspeed = ball.xspeed * -1;
}
if (ball.y > height || ball.y < 0) {
ball.yspeed = ball.yspeed * -1;
}
}
if (ball2.x > width || ball2.x < 0) {
ball2.xspeed = ball2.xspeed * -1;
}
if (ball2.y > height || ball2.y < 0) {
ball2.yspeed = ball2.yspeed * -1;
}
function display() {
stroke(255);
strokeWeight(4);
fill(200, 0, 200);
ellipse(ball.x, ball.y, 80, 80);
fill(249, 231, 159, 75);
ellipse(ball.x, ball.y, 25, 26);
}
function move() {
ball.x = ball.x + ball.xspeed;
ball.y = ball.y + ball.yspeed;
ball2.x = ball2.x + ball2.xspeed;
ball2.y = ball2.y + ball2.yspeed;
var x = 0;
var speed = 3; 
function setup() {
createCanvas(600, 400);
}
function draw() {
background(0);
stroke(255);
strokeWeight(4);
noFill();
ellipse(x, 200, 100, 100);
if (x > width) {
speed = -3;
}
x = x + speed; 
I'd like to know how to change this to random colors. 
var spot = {
x: 100,
y: 50
}
var col = {
r: 255,
g: 0,
b: 0
}
var size = {
a: 25,
b: 25
}
function setup() {
createCanvas(600, 400);
background(0);
}
function draw() {
col.r = random(100,255);
col.g = 0;
col.b = random(100,190);
spot.x = random(0, width);
spot.y = random(0, height);
size.a = random(0, width);
size.b = random(0, height);
noStroke();
fill(col.r, col.g, col.b, 100);
ellipse(spot.x, spot.y, size.a, size.b);
var r = 0;
var b = 225;
function setup() {
createCanvas(600, 400);  
}
function draw() {
r = map(mouseX, 0, 600, 0, 255);
b = map(mouseX, 0, 600, 255, 0);
background(r, 0, b);
fill(250, 118, 222);
rect(mouseX, 200, 64, 64);
This is an object. Always needs a semi-colon
to close. Was able to condense the code below 
using object:
var x = 0;
var y = 200;
var diameter = 50; 
let circle = {
x: 0,
y: 100,
diameter: 150
};
let circlecolor = {
r: 218,
g: 160,
b: 221
};
let bigbox = {
x: 2,
y: 100,
size:150
};
function setup() {
createCanvas(600, 400);
}
function draw() {
background(circlecolor.r, circlecolor.g, circlecolor.b);
fill(250, 200, 200);
ellipse(circle.x, circle.y, circle.diameter, circle.diameter);
fill(255,0,255, 75, 125);
rect(bigbox.x, bigbox.y, bigbox.size, bigbox.size);
circle.x = circle.x + 1;
bigbox.x = bigbox.x + 1;
}let beat;
let radius = 130;
let yay;
let welcome;
let bubbles;
let prevMouseY = 0;
let millisCount = 0;
let textImg;
function preload() {
beat = loadSound("beat.mp3");
yay = loadSound("yay.mp3");
bubbles = loadSound("bubbles.mp3");
}
function setup() {
createCanvas(innerWidth, innerHeight, WEBGL);
noStroke();
fill(100);
beat.setLoop(true);
}
function draw() {
noStroke();
background(0);
let dirY = (mouseY / height - 0.5) * 4;
let dirX = (mouseX / width - 0.5) * 4;
directionalLight(304, 204, 304, dirX, dirY, 1);
translate(-1.5 * radius, 0, 0);
sphere(radius);
translate(3 * radius, 0, 0);
sphere(radius);
if(abs(mouseY - prevMouseY) > mouseMoveThreshold ){
console.log("yes");
let speed = map((mouseY - prevMouseY), -height, height,-3, 3);
console.log(int(speed));   
beat.jump(abs(beat.currentTime()-int(speed)));
millisCount = millis();
} else console.log("no");
prevMouseY = mouseY;
let speed = map(mouseY, 0.1, height, 0, 2);
speed = constrain(speed, 0.01, 4);
beat.rate(speed);
}
function mousePressed() {
if (beat.isPlaying()) {
beat.stop();
} else {
beat.play();
}
if (yay.isPlaying()) {
} else {
yay.play();
yay.setVolume(0.1);
}
}
function keyPressed() {
yay.stop();
bubbles.stop();
if (keyCode === LEFT_ARROW) {
if (yay.isPlaying()) {
yay.play();
} else {
yay.play();
}
} else if (keyCode === RIGHT_ARROW) {
if (bubbles.isPlaying()) {
bubbles.play();
} else {
bubbles.play();
}
}else if (keyCode === DOWN_ARROW) {
}
}let beat;
let radius = 130;
let yay;
let welcome;
let bubbles;
let prevMouseY = 0;
let millisCount = 0;
let textImg;
function preload() {
beat = loadSound("beat.mp3");
yay = loadSound("yay.mp3");
bubbles = loadSound("bubbles.mp3");
}
function setup() {
createCanvas(innerWidth, innerHeight, WEBGL);
noStroke();
fill(100);
beat.setLoop(true);
}
function draw() {
noStroke();
background(0);
let dirY = (mouseY / height - 0.5) * 4;
let dirX = (mouseX / width - 0.5) * 4;
directionalLight(304, 204, 304, dirX, dirY, 1);
translate(-1.5 * radius, 0, 0);
sphere(radius);
translate(3 * radius, 0, 0);
sphere(radius);
if(abs(mouseY - prevMouseY) > mouseMoveThreshold ){
console.log("yes");
let speed = map((mouseY - prevMouseY), -height, height,-3, 3);
console.log(int(speed));   
beat.jump(abs(beat.currentTime()-int(speed)));
millisCount = millis();
} else console.log("no");
prevMouseY = mouseY;
let speed = map(mouseY, 0.1, height, 0, 2);
speed = constrain(speed, 0.01, 4);
beat.rate(speed);
}
function mousePressed() {
if (beat.isPlaying()) {
beat.stop();
} else {
beat.play();
}
if (yay.isPlaying()) {
} else {
yay.play();
yay.setVolume(0.1);
}
}
function keyPressed() {
yay.stop();
bubbles.stop();
if (keyCode === LEFT_ARROW) {
if (yay.isPlaying()) {
yay.play();
} else {
yay.play();
}
} else if (keyCode === RIGHT_ARROW) {
if (bubbles.isPlaying()) {
bubbles.play();
} else {
bubbles.play();
}
}else if (keyCode === DOWN_ARROW) {
}
}let song;
let radius = 130;
let yay;
let welcome;
let bubbles;
function setup() {
createCanvas(innerWidth, innerHeight, WEBGL);
song = loadSound("beat.mp3", loaded);
yay = loadSound("yay.mp3", loaded);
noStroke();
fill(100);
}
function loaded() {
song.play();
}
function draw() {
noStroke();
background(0);
let dirY = (mouseY / height - 0.5) * 4;
let dirX = (mouseX / width - 0.5) * 4;
directionalLight(304, 204, 304, dirX, dirY, 1);
translate(-1.5 * radius, 0, 0);
sphere(radius);
translate(3 * radius, 0, 0);
sphere(radius);
let speed = map(mouseY, 0.1, height, 0, 2);
speed = constrain(speed, 0.01, 4);
song.rate(speed);
}
function mousePressed() {
if (yay.isPlaying()) {
yay.stop();
} else {
yay.play();
yay.setVolume(0.1);
function keyPressed() {
if (keyCode === LEFT_ARROW) {
yay = loadSound("yay.mp3", loaded);
} else if (keyCode === RIGHT_ARROW) {
mood.play();
}
}
}
}let song;
let radius = 130;
let Yaaaay;
let Mood;
let Bubbles;
function setup() {
createCanvas(innerWidth, innerHeight, WEBGL);
song = loadSound("beat.mp3", loaded);
Yaaaay = loadSound("Yaaaay.mp3", loaded);
noStroke();
fill(100);
}
function loaded() {
song.play();
}
function draw() {
noStroke();
background(0);
let dirY = (mouseY / height - 0.5) * 4;
let dirX = (mouseX / width - 0.5) * 4;
directionalLight(304, 204, 304, dirX, dirY, 1);
translate(-1.5 * radius, 0, 0);
sphere(radius);
translate(3 * radius, 0, 0);
sphere(radius);
let speed = map(mouseY, 0.1, height, 0, 2);
speed = constrain(speed, 0.01, 4);
song.rate(speed);
}
function mousePressed() {
if (Yaaaay.isPlaying()) {
Yaaaay.stop();
} else {
Yaaaay.play();
Yaaaay.setVolume(0.1);
function keyPressed() {
if (keyCode === LEFT_ARROW) {
Yaaaay = loadSound("Yaaaay.mp3", loaded);
} else if (keyCode === RIGHT_ARROW) {
Mood.play();
}
}
}
}let song;
let radius = 130;
let Yaaaay;
let Mood;
let Bubbles;
function setup() {
createCanvas(innerWidth, innerHeight, WEBGL);
song = loadSound("dance.mp3", loaded);
Yaaaay = loadSound("Yaaaay.mp3", loaded);
noStroke();
fill(100);
}
function loaded() {
song.play();
}
function draw() {
noStroke();
background(0);
let dirY = (mouseY / height - 0.5) * 4;
let dirX = (mouseX / width - 0.5) * 4;
directionalLight(304, 204, 304, dirX, dirY, 1);
translate(-1.5 * radius, 0, 0);
sphere(radius);
translate(3 * radius, 0, 0);
sphere(radius);
let speed = map(mouseY, 0.1, height, 0, 2);
speed = constrain(speed, 0.01, 4);
song.rate(speed);
}
function mousePressed() {
if (Yaaaay.isPlaying()) {
Yaaaay.stop();
} else {
Yaaaay.play();
Yaaaay.setVolume(0.1);
function keyPressed() {
if (keyCode === LEFT_ARROW) {
Yaaaay = loadSound("Yaaaay.mp3", loaded);
} else if (keyCode === RIGHT_ARROW) {
Mood.play();
}
}
}
}let radius = 130;
let beat;
let yaay;
let mood;
let bubbles;
function preload() {
beat = loadSound("beat.mp3");
yay = loadSound("yay.mp3");
mood = loadSound("mood.mp3");
bubbles = loadSound("bubbles.mp3");
}
function setup() {
createCanvas(innerWidth, innerHeight, WEBGL);
noStroke();
fill(100);
}
function draw() {
noStroke();
background(0);
let dirY = (mouseY / height - 0.5) * 4;
let dirX = (mouseX / width - 0.5) * 4;
directionalLight(304, 204, 304, dirX, dirY, 1);
translate(-1.5 * radius, 0, 0);
sphere(radius);
translate(3 * radius, 0, 0);
sphere(radius);
let speed = map(mouseY, 0.1, height, 0, 2);
speed = constrain(speed, 0.01, 4);
song.rate(speed);
}
function mousePressed() {
if (Yaaaay.isPlaying()) {
Yaaaay.stop();
} else {
Yaaaay.play();
Yaaaay.setVolume(0.2);
function keyPressed() {
if (keyCode === LEFT_ARROW) {
Yaaaay = loadSound("Yaaaay.mp3", loaded);
} else if (keyCode === RIGHT_ARROW) {
Mood.play();
}
}
}
}let song;
let radius = 130;
let Yaaaay;
let Mood;
let Bubbles;
function setup() {
createCanvas(innerWidth, innerHeight, WEBGL);
song = loadSound("beat.mp3", loaded);
Yaaaay = loadSound("Yaaaay.mp3", loaded);
noStroke();
fill(100);
}
function loaded() {
song.play();
}
function draw() {
noStroke();
background(0);
let dirY = (mouseY / height - 0.5) * 4;
let dirX = (mouseX / width - 0.5) * 4;
directionalLight(304, 204, 304, dirX, dirY, 1);
translate(-1.5 * radius, 0, 0);
sphere(radius);
translate(3 * radius, 0, 0);
sphere(radius);
let speed = map(mouseY, 0.1, height, 0, 2);
speed = constrain(speed, 0.01, 4);
song.rate(speed);
}
function mousePressed() {
if (Yaaaay.isPlaying()) {
Yaaaay.stop();
} else {
Yaaaay.play();
Yaaaay.setVolume(0.1);
function keyPressed() {
if (keyCode === LEFT_ARROW) {
Yaaaay = loadSound("Yaaaay.mp3", loaded);
} else if (keyCode === RIGHT_ARROW) {
Mood.play();
}
}
}
}let song;
let radius = 130;
let Yaaaay;
let Mood;
let Bubbles;
function setup() {
createCanvas(innerWidth, innerHeight,WEBGL);
song = loadSound("beat.mp3", loaded);
Yaaaay = loadSound("Yaaaay.mp3", loaded);
Mood = loadSound("Mood.mp3", loaded);
Bubbles = loadSound("Bubbles.mp3", loaded);
noStroke();
fill(100);
}
function loaded() {
song.play();
}
function draw() {
noStroke();
background(0);
let dirY = (mouseY / height - 0.5) * 4;
let dirX = (mouseX / width - 0.5) * 4;
directionalLight(304, 204, 304, dirX, dirY, 1);
translate(-1.5 * radius, 0, 0);
sphere(radius);
translate(3 * radius, 0, 0);
sphere(radius);
}
function mousePressed() {
if ( Yaaaay.isPlaying() ) {
Yaaaay.stop();
} else {
Yaaaay.play();
Yaaaay.setVolume(0.3);
}
function keyPressed() {
if (keyCode === LEFT_ARROW) {
Mood.play();
} else if (keyCode === RIGHT_ARROW) {
Bubbles.play();
}
}
}
let video;
let button;
let snapshot;
function setup() {
createCanvas(320, 240);
background(51);
video = createCapture(VIDEO);
video.size(320, 240);
button = createButton('snap');
button.mousePressed(takesnap);
}
function takesnap() {
snapshot = video.get();
}
function draw() {
if (snapshot) {
image(snapshot,0,0);
}
}let video;
let button;
let snapshot;
function setup() {
createCanvas(320, 240);
background(51);
video = createCapture(VIDEO);
video.size(320, 240);
button = createButton('snap');
button.mousePressed(takesnap);
}
function takesnap() {
snapshot = video.get();
}
function draw() {
if (snapshot) {
image(snapshot,0,0);
}
}let song;
let radius = 130;
let Yaaaay;
let Mood;
let Bubbles;
function setup() {
createCanvas(innerWidth, innerHeight, WEBGL);
song = loadSound("beat.mp3", loaded);
Yaaaay = loadSound("Yaaaay.mp3", loaded);
noStroke();
fill(100);
}
function loaded() {
song.play();
}
function draw() {
noStroke();
background(0);
let dirY = (mouseY / height - 0.5) * 4;
let dirX = (mouseX / width - 0.5) * 4;
directionalLight(304, 204, 304, dirX, dirY, 1);
translate(-1.5 * radius, 0, 0);
sphere(radius);
translate(3 * radius, 0, 0);
sphere(radius);
}
function mousePressed() {
if (Yaaaay.isPlaying()) {
Yaaaay.stop();
} else {
Yaaaay.play();
Yaaaay.setVolume(0.2);
function keyPressed() {
if (keyCode === LEFT_ARROW) {
Yaaaay = loadSound("Yaaaay.mp3", loaded);
} else if (keyCode === RIGHT_ARROW) {
Mood.play();
}
}
}
}let song;
let radius = 130;
function setup() {
createCanvas(700, 400,WEBGL);
noStroke();
fill(100);
}
function loaded() {
song.play();
}
function draw() {
noStroke();
background(0);
let dirY = (mouseY / height - 0.5) * 4;
let dirX = (mouseX / width - 0.5) * 4;
directionalLight(304, 204, 304, dirX, dirY, 1);
translate(-1.5 * radius, 0, 0);
sphere(radius);
translate(3 * radius, 0, 0);
sphere(radius);
}
let song;
let amp;
function preload(){
song = loadSound("PodingtonBear.mp3");
}
function setup() { 
createCanvas(600, 400);
song.play();
amp = new p5.Amplitude();
} 
function draw() { 
background(0);
let vol = amp.getLevel();
let diachanger = map(vol, 0.1, 1, 0, 100)*50;
stroke(255);
noFill();
drawCircle(300,200,diachanger);
}
function drawCircle(x,y,d){
ellipse(x,y,d);
if (d>1) {
drawCircle(x+d*0.5,y,d*0.5);
drawCircle(x-d*0.5,y,d*0.5);
}
}
let radius = 130;
function setup() {
createCanvas(700, 400,WEBGL);
noStroke();
fill(100);
}
function draw() {
noStroke();
background(0);
let dirY = (mouseY / height - 0.5) * 4;
let dirX = (mouseX / width - 0.5) * 4;
directionalLight(304, 204, 304, dirX, dirY, 1);
translate(-1.5 * radius, 0, 0);
sphere(radius);
translate(3 * radius, 0, 0);
sphere(radius);
}
let radius = 130;
function setup() {
createCanvas(700, 400,WEBGL);
noStroke();
fill(100);
}
function draw() {
noStroke();
background(0);
let dirY = (mouseY / height - 0.5) * 4;
let dirX = (mouseX / width - 0.5) * 4;
directionalLight(304, 204, 304, dirX, dirY, 1);
translate(-1.5 * radius, 0, 0);
sphere(radius);
translate(3 * radius, 0, 0);
sphere(radius);
}
var song;
var fft;
var button;
function toggleSong() {
if (song.isPlaying()) {
song.pause();
} else {
song.play();
}
}
function preload() {
song = loadSound('beat.mp3');
}
function setup() {
createCanvas(512, 256);
colorMode(HSB);
angleMode(DEGREES);
button = createButton('toggle');
button.mousePressed(toggleSong);
song.play();
fft = new p5.FFT(0.9, 64);
}
function draw() {
background(0);
var spectrum = fft.analyze();
var w = width / spectrum.length;
for (var i = 0; i < spectrum.length; i++) {
var amp = spectrum[i];
fill(i, 255, 255);
stroke(i, 255, 255);
var x = i*w;
var y = map(amp, 0, 256, height, 0);
rect(x, y, w - 2, height - y);
}
}
var ball = {
x: 100,
y: 300,
xspeed: 2,
yspeed: -3
}
let box = {
a: 100,
b: 300,
aspeed: 2,
bspeed: -3
}
function setup() {
createCanvas(450, 400);
}
function draw() {
background(0);
move();
bounce();
display();
}
function bounce() {
if (ball.x > width || ball.x < 0) {
ball.xspeed = ball.xspeed * -1;
}
if (ball.y > height || ball.y < 0) {
ball.yspeed = ball.yspeed * -1;
}
}
if (box.a > width || box.a < 0) {
box.aspeed = box.aspeed * -1;
}
if (box.b > height || box.b < 0) {
box.bspeed = box.bspeed * -1;
}
function display() {
stroke(255);
strokeWeight(4);
fill(200, 0, 200);
ellipse(ball.x, ball.y, 80, 80);
fill(249, 231, 159, 75);
rect(box.a, box.b, 100, 100);
}
function move() {
ball.x = ball.x + ball.xspeed;
ball.y = ball.y + ball.yspeed;
box.a = box.a + box.aspeed;
box.b = box.b + box.bspeed;
}var on = false;
function setup() {
createCanvas(600, 400);
}
function draw() {
if (on) {
background(0, 255, 0);
} else {
background(0);
}
stroke(30, 136, 229);
strokeWeight(10);
noFill();
if (mouseX > 250 && mouseX < 350 && mouseY > 150 && mouseY < 250) {
fill(255, 0, 200);
}
rectMode(CENTER);
rect(300, 200, 100, 100);
}
function mousePressed() {
if (mouseX > 250 && mouseX < 350 && mouseY > 150 && mouseY < 250) {
on = !on;
}
}
function setup() {
createCanvas(600, 400);
}
function draw() {
background(0);
stroke(255);
strokeWeight(5);
noFill();
if (mouseX > 200) {
ellipse(300, 200, 100, 100);
} else{
rect(300, 200,100,100);
}
}var x = 0;
var speed = 3;
function setup() { 
createCanvas(600, 400);
} 
function draw() { 
background(0);
stroke(255);
strokeWeight(5);
noFill();
ellipse(x, 200, 100, 100);
if (x > width || x < 0) {
speed = speed * -1;
}
x = x + speed;
}
let img;
let x, y;
function setup() {
createCanvas(640, 480);
x = width / 2;
y = height / 2;
background(0);
img = createCapture(VIDEO);
}
function draw() {
for (let i = 0; i < 25; i++) {
let x = floor(random(width));
let y = floor(random(height));
let col = img.get(x, y);
col[3] = 50;
fill(col);
noStroke();
ellipse(x, y, 30);
}
}let artist; 
function setup() { 
createCanvas(400, 400);
} 
function gotData(data) {
artist = data;
}
function draw() { 
background(10);
if (artist) {
ellipse(artist.name)
}
}var heady = [];
var upsethead = [];
function preload() {
upsethead[0] = loadImage("images/kanye1.png"); 
upsethead[1] = loadImage("images/kanye2.png");
upsethead[2] = loadImage("images/kanye3.png");
upsethead[3] = loadImage("images/kanye4.png");
upsethead[4] = loadImage("images/kanye5.png");
upsethead[5] = loadImage("images/kanye6.png");
upsethead[6] = loadImage("images/kanye7.png");
upsethead[7] = loadImage("images/kanye8.png");
}
function setup() {
cnv = createCanvas(600, 400);   
}
function mouseDragged() {
var r = floor(random(0, upsethead.length));
var b = new Bouncy(mouseX, mouseY, upsethead[r]);
heady.push(b);
}
function mousePressed() {
var r = floor(random(0, upsethead.length));
var b = new Bouncy(mouseX, mouseY, upsethead[r]);
heady.push(b);
}
function draw() {
background(0);
for (var i = heady.length-1; i >= 0; i--) {
heady[i].update();
heady[i].display(); 
}
}
var heady = [];
var upsethead = [];
function preload() {
upsethead[0] = loadImage("images/kanye1.png"); 
upsethead[1] = loadImage("images/kanye2.png");
upsethead[2] = loadImage("images/kanye3.png");
upsethead[3] = loadImage("images/kanye4.png");
upsethead[4] = loadImage("images/kanye5.png");
upsethead[5] = loadImage("images/kanye6.png");
upsethead[6] = loadImage("images/kanye7.png");
upsethead[7] = loadImage("images/kanye8.png");
}
function setup() {
cnv = createCanvas(600, 400);   
}
function mouseDragged() {
var r = floor(random(0, upsethead.length));
var b = new Bouncy(mouseX, mouseY, upsethead[r]);
heady.push(b);
}
function mousePressed() {
var r = floor(random(0, upsethead.length));
var b = new Bouncy(mouseX, mouseY, upsethead[r]);
heady.push(b);
}
function mouseWheel() {
var r = floor(random(0, upsethead.length));
var b = new Bouncy(mouseX, mouseY, upsethead[r]);
heady.push(b);
}
function draw() {
background(0);
for (var i = heady.length-1; i >= 0; i--) {
heady[i].update();
heady[i].display(); 
}
}
var heady = [];
var upsethead = [];
function preload() {
upsethead[0] = loadImage("images/kanye1.png"); 
upsethead[1] = loadImage("images/kanye2.png");
upsethead[2] = loadImage("images/kanye3.png");
upsethead[3] = loadImage("images/kanye4.png");
}
function setup() {
cnv = createCanvas(600, 400);   
}
function mousePressed() {
var r = floor(random(0, upsethead.length));
var b = new Bouncy(mouseX, mouseY, upsethead[r]);
heady.push(b);
}
function draw() {
background(253, 254, 254);
for (var i = heady.length-1; i >= 0; i--) {
heady[i].update();
heady[i].display(); 
}
}
var heady = [];
var upsethead = [];
function preload() {
upsethead[0] = loadImage("images/emoji0.png"); 
upsethead[1] = loadImage("images/emoji1.png");
}
function setup() {
cnv = createCanvas(600, 400);   
}
function mousePressed() {
var r = floor(random(0, upsethead.length));
var b = new Bouncy(mouseX, mouseY, upsethead[r]);
heady.push(b);
}
function draw() {
background(253, 254, 254);
for (var i = heady.length-1; i >= 0; i--) {
heady[i].update();
heady[i].display(); 
}
}
let bouncer1;
let bouncer2;
let bouncer3;
let gravity = 0.1;
function setup() {
createCanvas(400, 400);
bouncer1 = new Ball(100,100);
bouncer2 = new Ball(125,125);
bouncer3 = new Ball(300,100);
}
function draw() {
background(220);
bouncer1.render();
bouncer2.render();
bouncer3.render();
bouncer1.update();
bouncer2.update();
bouncer3.update();
}
var hand = {
x: 200, 
y: 200, 
xspeed: 4, 
yspeed: -3
}
function setup() {
createCanvas(500,400);
strokeWeight(4);
ellipseMode(RADIUS);
}
function draw() {
background(204);   
handsmove();
handspeed();
showhands();
jordanrobot();
function jordanrobot(){
fill(0, 102, 153);
fill(255, 0, 0); 
triangle(260,314,288,314,272,283);
}
function handspeed() {
if (hand.x > width || hand.x < 0) {
hand.xspeed = hand.xspeed * -1;
} 
if (hand.y > height || hand.y < 0) {
hand.yspeed = hand.yspeed * -1;
}
}
function showhands() {
stroke(255);
strokeWeight(4);
fill(255, 0, 0);
triangle(hand.x,hand.y,288,314,272,283);
triangle(hand.y,hand.x,288,314,272,283);
}
function handsmove() {
hand.x = hand.x + hand.xspeed;
hand.y = hand.y + hand.yspeed;
}
Why doesn' this function work?
function hand() {
x = 100; 
y = 200; 
xspeed = 4; 
yspeed = 3;
}
 
var ball = {
x: 300, 
y: 200, 
xspeed: 4, 
yspeed: -3
}
function setup() {
createCanvas(600, 400);
strokeWeight(4);
ellipseMode(RADIUS);
}
function draw() {
background(0);
move();
bounce();
display();
}
function bounce() {
if (ball.x > width || ball.x < 0) {
ball.xspeed = ball.xspeed * -1;
} 
if (ball.y > height || ball.y < 0) {
ball.yspeed = ball.yspeed * -1;
}
}
function display() {
stroke(255);
strokeWeight(4);
fill(200, 0, 200);
ellipse(ball.x, ball.y, 24, 24);
}
function move() {
ball.x = ball.x + ball.xspeed;
ball.y = ball.y + ball.yspeed;
}
function setup() {
createCanvas(600,600);
strokeWeight(4);
ellipseMode(RADIUS);
}
function draw() {
background(204);
if (mouseX > 260 && mouseX < 400 && mouseY > 300 && mouseY < 310) {
if (mouseIsPressed) {
background(0, 255, 0);
}
fill(255, 0, 200);
}
textSize(25);
text("Touch Ma Heart...",355, 180);
fill(0, 102, 153);
fill(255, 0, 0); 
triangle(260,314,288,314,272,283);
}
let x = 0;
let y = 0;
let snowx, snowy;
let snowstate = false;
let textcolor = 220;
let redc, snowc ;
let size = 10; 
let r = 255;
g = 255;
b = 255;
let xx = 100;
let yo = 340;
let d = 20;
function setup() {
createCanvas(600, 400);
background(230);
redx = width / 2;
redy = height / 2;
snowx = width / 3 * 2.8;
snowy = height / 1 * 0.85;
}
function draw() {
fill(230, 0, 0);
textSize(15);
text("Winter Wonderland", snowx-110, snowy+30);
if(mouseX>snowx-25 && mouseX<snowx+25 && mouseY>snowy-50 && mouseY<snowy+50) {
snowc = 255 ;    
} else { 
snowc = 180; 
}
fill(0, 153, 0);
noStroke()
ellipse(snowx, snowy, 20, 20);
if (snowstate) {
if (random(1) > 0.5) {
fill(217, 217, 217);
} else {
fill(217);
text("*", x, y);
}
y += 20;
if (x > width) {
background(0);
x = 0;
y = 0;
}
if (y > height) {
x += 20;
y = 0;
}
}
}
function mousePressed() {
if (mouseX>snowx-25 && mouseX<snowx+25 && mouseY>snowy-50 && mouseY<snowy+50) {
background(30);
fill(150);
snowstate = true;
}
if (dist(mouseX, mouseY, xx, yo) < d/2) {
background(26, 35, 126);
} else {
background(0);
}
ellipse(xx, yo, d, d);
}
let abc = 550;
let def = 300;
let ghi = 40;
let state = false;
function setup() {
createCanvas(600, 400);
}
function draw() {
if (state) {
background(133, 193, 233);
} else {
background(0);
}
ellipse(abc, def, ghi, ghi);
}
function mousePressed() {
if (dist(mouseX, mouseY, abc, def) < ghi/2) {
state = !state;
}
}let r = 255; 
let g = 255; 
let b = 100; 
let y = 0;
let speed = 5;
let bouncing = false;
let x1 = 0;
let x2 = 100;
let recty;
let speedRect;
function setup() {
createCanvas(600, 400);
recty = height / 1.1;
speedRect = 3;
}
function mousePressed() {
bouncing = !bouncing;
}
function draw() {
fill(255);
background(200);
var r = random(255);
var g = random(255);
var b = random(255);
fill(r, g, b)
rect(x1, recty,10,50);
rect(x2, recty,10,50);
noStroke(0)
x1 += speedRect;
x2 += speedRect;
if(x1<=0 || (x2+10) >=width)
fill(255, 0, 0)
ellipse(300, y, 40, 40);
if (bouncing) {
y = y + speed;
speed = speed + 0;
if (y > height || y < 0) {
speed = speed * -1;
}
}
if (mouseIsPressed) {
let x = random(width);
let y = random(height);
fill(r, g, b);
rect(x, y, 50, 50);
}
}
function setup() {
createCanvas(600, 400);
}
function draw() {
background(0);
stroke(255);
strokeWeight(4);
noFill();
if (mouseX > 300 && mouseX < 400 && mouseY > 200 && mouseY < 300) {
if (mouseIsPressed) {
background(0, 255, 0);
}
fill(255, 0, 200);
}
rect(300, 200, 100, 100);
}var on = false;
function setup() {
createCanvas(600, 400);
}
function draw() {
if (on) {
background(0, 255, 0);
} else {
background(0);
}
stroke(255);
strokeWeight(4);
noFill();
if (mouseX > 250 && mouseX < 350 && mouseY > 150 && mouseY < 250) {
fill(255, 0, 200);
}
rectMode(CENTER);
rect(300, 200, 100, 100);
}
function mousePressed() {
if (mouseX > 250 && mouseX < 350 && mouseY > 150 && mouseY < 250) {
on = !on;
}
}function setup() {
createCanvas(600, 400);
}
function draw() {
background(0);
stroke(255);
strokeWeight(4);
noFill();
if (mouseX > 300 && mouseX < 400) {
fill(255, 0, 200);
}
rect(300, 200, 100, 100);
}var x = 0;
var speed = 3; 
function setup() {
createCanvas(600, 400);
}
function draw() {
background(0);
stroke(255);
strokeWeight(4);
noFill();
ellipse(x, 200, 100, 100);
if (x > width) {
speed = -3;
}
x = x + speed; 
}function setup() {
createCanvas(600, 400);
}
function draw() {
background(0);
stroke(255);
strokeWeight(4);
noFill();
if (mouseX > 300) {
fill(255, 0, 200);
}
ellipse(300, 200, 100, 100);
}
var spot = {
x: 100,
y: 50
}
var col = {
r: 255,
g: 0,
b: 0
}
function setup() {
createCanvas(600, 400);
background(0);
}
function draw() {
col.r = random(100, 255);
col.g = 0;
col.b = random(100, 190);
spot.x = random(0, width);
spot.y = random(0, height);
noStroke();
fill(col.r, col.g, col.b, 100);
ellipse(spot.x, spot.y, 24, 24);
var r = 0;
var b = 225;
function setup() {
createCanvas(600, 400);  
}
function draw() {
r = map(mouseX, 0, 600, 0, 255);
b = map(mouseX, 0, 600, 255, 0);
background(r, 0, b);
fill(250, 118, 222);
ellipse(mouseX, 200, 64, 64);
}var circleX = 50;
function setup() {
createCanvas(600, 400);
}
function draw() {
background(250, 250, 100);
fill(250, 200, 200);
ellipse(circleX, 200, 80, 80);
circleX = circleX + 1;
}function setup() {
createCanvas(600, 400);
background(250, 250, 100);
}
function draw() {
fill(250, 200, 200);
ellipse(mouseX, mouseY, 100, 100);
}
function mousePressed() {
background(250, 250, 100);
}function setup() {
createCanvas(600, 400);  
}
function draw() {
background(150, 150, 200);
ellipseMode(CENTER);
rectMode(CENTER);
fill(255, 0, 0);
rect(240, 145, 20, 100);
fill(0, 0, 255);
ellipse(240, 115, 60, 60);
fill(0, 255, 0);
ellipse(221, 115, 16, 32);
ellipse(259, 115, 16, 32);
line(230, 195, 220, 205);
line(250, 195, 260, 205);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
}function setup() { 
createCanvas(600, 400);
} 
function draw() { 
background(0);
stroke(255);
strokeWeight(4);
noFill();
if (mouseX > 300 && mouseX < 400){
fill(255, 0, 200);  
}
rect(300, 200, 100, 100);
}function setup() { 
createCanvas(600, 400);
} 
function draw() { 
background(0);
stroke(255);
strokeWeight(4);
noFill();
if (mouseX > 250) {
ellipse(300, 200, 100,100);
} else if (mouseX > 150){
rect(300, 200, 100, 100);
}	else if (mouseX > 50) {
line(0,0, width, height);
}else	{
point(300, 200);
}
}
var x = 0;
var speed = 3;
function setup() {
createCanvas(600,400);
}
function draw(){
background(0);
stroke(0);
strokeWeight(15);
fill(255, 241, 118);
ellipse(200, x, 50, 50);
if (x > height || x < 0) {
speed = speed * -1;
}
x = x + speed;
}
function setup() { 
createCanvas(600, 400);
} 
function draw() { 
background(0);
stroke(255);
strokeWeight(4);
noFill();
if (mouseX > 300){
fill(255, 0, 200);
}
if (mouseX < 100){
rect(200, 200, 50,50);
}
ellipse(300, 200, 100, 100);
}var spot = {
x: 100,
y: 50
};
var col = {
r: 255,
g: 0,
b:0
};
function setup() { 
createCanvas(600, 400);
background(0);
} 
function draw() { 
spot.x = random(0, width);
spot.y = random(0, height);
col.r = random(100, 255);
col.g = 0;
col.b = random(100, 190);
noStroke();
fill (col.r, col.g, col.b, 100);
rect(spot.x, spot.y, 50, 50);
}var col = 0;
function setup() {
createCanvas(600, 400);
}
function draw() {
col = map(mouseX, mouseY, 600, 0, 255);
background(col);
fill(100, 10, 222);
ellipse(mouseX, mouseY, 50, 50);
}var circle = {
x: 0,
y: 200,
diameter: 50
};
var square = {
x: 0,
y: 200,
center: 50
};
var r = 100;
var g = 160;
var b = 221;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(r, g, b);
fill(250, 200, 200);
ellipse(circle.x, circle.y, circle.diameter, circle.diameter);
rect(square.x, square.y, square.center, square.center);
circle.x = circle.x + 1;
square.x = square.x +2;
}var circleX = 0;
var circleY = 0;
function setup() { 
createCanvas(600, 400);
} 
function draw() { 
background(250, 250, 100);
fill(250,30,200);
rect(circleX, circleY, 180, 80);
rect(200, circleY, 200, 200);
circleX = circleX + 1;
circleY = circleY + 5;
}
function setup() { 
createCanvas(400, 400);
background(51);
} 
function draw() { 
var y = color(255, 204, 0);  
fill(y);  
ellipse(mouseX, mouseY, 200, 200);
arc(mouseX, mouseY, 100, 60, 25, PI);
var b = color(0);  
fill(b); 
ellipse(mouseX - 50, mouseY - 50, 30, 50);
ellipse(mouseX + 50, mouseY - 50, 30, 50);
}
function mousePressed() {
background(0)
}
function setup() {
createCanvas(450, 300);
}
function draw() {
background(255, 150, 150);
line(100, 200, 100, 100);
strokeWeight(3); 
fill(255, 255,0);
arc(400, 35, 80, 80, 0, PI+QUARTER_PI, OPEN);
fill(0, 255, 255);
quad(38, 31, 86, 20, 100, 100, 30, 80);
quad(80, 30, 100, 100, 20, 86, 31, 38);
rect(100, 150, 300, 55);
fill(0, 255, 0);
rect(150, 150, 50, 25);
rect(100, 200, 300, 10);
line(100, 100, 200, 100);
line(300, 200, 200, 100);
fill(0,0,0)
ellipse(375, 200, 55, 55);
ellipse(100, 200, 55, 55);
fill(255,255,255)
ellipse(100, 200, 20, 20);
fill(255,255,255)
ellipse(375, 200, 20, 20);
}	function setup() {
}
function draw() {
background(204);
ellipse(50, 50, 80, 80);
}