var myCanvas = null;
var myVideo;
var loopVid = false;
function preload() {
}
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
translate(width/2,height/2);
ellipse(x*width/2, y*height/2, 20, 20);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
translate(width/2,height/2);
ellipse(x*width/2, y*height/2, 10, 10);
var kinectron = null;
var myCanvas = null;
var myVideo;
var loopVid = false;
function preload() {
myVideo = createVideo('short.mp4', playVid);
}
function setup() {
myCanvas = createCanvas(512, 424);
background(0);
noStroke();
kinectron = new Kinectron(kinectronIpAddress);
kinectron.makeConnection();
kinectron.startTrackedJoint(kinectron.HANDRIGHT, drawRightHand);
}
function draw() {
}
function playVid() {
myVideo.loop();
loopVid = true; 
}
function drawRightHand(hand) {
let handX = hand.depthX * myCanvas.width;
let handY = hand.depthY * myCanvas.height;
playOrStopVid(handX, handY);
fill(255);
rect(handX, handY, 50, 50);
}
function playOrStopVid(inHandX, inHandY) {
if (inHandX > width / 2 && loopVid == true) {
console.log("here");
myVideo.stop();
loopVid = false;
} else if (inHandX < width /2 && loopVid == false) {
console.log("there");
myVideo.loop();
loopVid = true;
}
var kinectron = null;
var myCanvas = null;
function setup() {
myvideo = createVideo('short.mp4')
myvideo.play();
myCanvas = createCanvas(512, 424);
background(0);
noStroke();
kinectron = new Kinectron(kinectronIpAddress);
kinectron.makeConnection();
kinectron.startTrackedJoint(kinectron.HANDRIGHT, drawRightHand);
}
function draw() {
}
function drawRightHand(hand) {
background(0);
fill(255);
ellipse(hand.depthX * myCanvas.width, hand.depthY * myCanvas.height, 50, 50);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
}function setup() {
createCanvas(windowWidth, windowHeight);
}
function draw() {
background(0, 100, 200);
}
function windowResized() {
resizeCanvas(windowWidth, windowHeight);
}var name = "";
var myspeech;
let puffins = [];
let tempx = 0;
let tempy = 0;
let img_puffin;
function setup() {
createCanvas(480, 420);
myspeech = new p5.Speech();
}
var b = new myPuffins(mouseX, mouseY,  "my Puffin name is",data.name);
puffins.push(b);
myspeech.speak(data.name);
}
function mousePressed() {
var r = floor(random(0, puffins.length));
}
function draw() {
background(220);
for (var i = puffins.length - 1; i >= 0; i--) {
puffins[i].move();
puffins[i].show();
}
}
class myPuffins {
constructor(x, y, name) {
this.x = x;
this.y = y;
this.name = name;
}
move() {
this.x = this.x + random(-5, 5);
this.y = this.y + random(-5, 5);
}
show() {
push();
translate(this.x, this.y);
stroke(0);
strokeWeight(70);
line(0, -35, 0, -65);
noStroke();
fill(220);
ellipse(-17.5, -65, 35, 35);
ellipse(17.5, -65, 35, 35);
arc(0, -65, 70, 70, 0, PI);
fill(0);
ellipse(-14, -65, 8, 8);
ellipse(14, -65, 8, 8);
quad(0, -58, 4, -51, 0, -44, -4, -51);
fill(100, 20, 40)
text(this.name, 10, 10);
pop();
}
}var name = "";
var myspeech;
let puffins = [];
let tempx = 0;
let tempy = 0;
let img_puffin;
function setup() {
createCanvas(480, 420);
myspeech = new p5.Speech();
}
var b = new myPuffins(mouseX, mouseY, data.name);
puffins.push(b);
myspeech.speak(data.name);
}
function mousePressed() {
var r = floor(random(0, puffins.length));
}
function draw() {
background(220);
for (var i = puffins.length - 1; i >= 0; i--) {
puffins[i].move();
puffins[i].show();
}
}
class myPuffins {
constructor(x, y, name) {
this.x = x;
this.y = y;
this.name = name;
}
move() {
this.x = this.x + random(-5, 5);
this.y = this.y + random(-5, 5);
}
show() {
push();
translate(this.x, this.y);
stroke(0);
strokeWeight(70);
line(0, -35, 0, -65);
noStroke();
fill(220);
ellipse(-17.5, -65, 35, 35);
ellipse(17.5, -65, 35, 35);
arc(0, -65, 70, 70, 0, PI);
fill(0);
ellipse(-14, -65, 8, 8);
ellipse(14, -65, 8, 8);
quad(0, -58, 4, -51, 0, -44, -4, -51);
text(this.name, 10,10);
pop();
}
}var name = "";
var myspeech;
let myCircles = [];
let tempx = 0;
let tempy = 0;
function setup() { 
createCanvas(500, 500);
background(255,0,0);
myspeech = new p5.Speech();
} 
function draw() { 
for(let i =0;i<myCircles.length;i++)
{
myCircles[i].show();
}
}
name = data.name + " " + data.surname;
myCircles.push(new myCircle(tempx, tempy, name));
myspeech.speak(name);
}
function mousePressed() {
tempx = mouseX;
tempy = mouseY;
}
class myCircle {
constructor(x,y,name) {
this.x = x;
this.y = y;
this.name = name;
}
show() {
fill(255);
ellipse(this.x, this.y, 40,40);
stroke(0);
text(this.name, this.x, this.y);
}
}var puffin = [];
var images1 = [];
let mySound;
let mySound1;
let img_puffin;
function preload() {
soundFormats('mp3', 'ogg');
img_puffin = loadImage('images-1.jpg');
mySound = loadSound('puffin.mp3');
mySound1 = loadSound('puffin.mp3');
}
function setup() {
createCanvas(480, 420);
puffin1 = new Puffin();
puffin2 = new Puffin();
}
function mousePressed() {
var r = floor(random(0, puffin.length));
var b = new Puffin(mouseX, mouseY);
puffin.push(b);
mySound.play();
}
function draw() {
background(220);
for (var i = puffin.length - 1; i >= 0; i--) {
puffin[i].move();
puffin[i].show();
}
}
class Puffin {
constructor(x, y) {
this.x = x;
this.y = y;
}
move() {
this.x = this.x + random(-5, 5);
this.y = this.y + random(-5, 5);
}
show() {
push();
translate(this.x, this.y);
stroke(0);
strokeWeight(70);
line(0, -35, 0, -65);
noStroke();
fill(220);
ellipse(-17.5, -65, 35, 35);
ellipse(17.5, -65, 35, 35);
arc(0, -65, 70, 70, 0, PI);
fill(0);
ellipse(-14, -65, 8, 8);
ellipse(14, -65, 8, 8);
quad(0, -58, 4, -51, 0, -44, -4, -51);
pop();
}
}var puffin = [];
var images1 = [];
let mySound;
let mySound1;
let img_puffin;
function preload() {
soundFormats('mp3', 'ogg');
img_puffin = loadImage('images-1.jpg');
mySound = loadSound('puffin.mp3');
mySound1 = loadSound('puffin.mp3');
}
function setup() {
createCanvas(480, 420);
puffin1 = new Puffin();
puffin2 = new Puffin();
}
function mousePressed() {
var r = floor(random(0, puffin.length));
var b = new Puffin(mouseX, mouseY);
puffin.push(b);
mySound.play();
}
function draw() {
background(220);
for (var i = puffin.length - 1; i >= 0; i--) {
puffin[i].move();
puffin[i].show();
}
}
class Puffin {
constructor(x, y) {
this.x = x;
this.y = y;
}
move() {
this.x = this.x + random(-5, 5);
this.y = this.y + random(-5, 5);
}
show() {
push();
translate(this.x, this.y);
image(img_puffin, 0, 0, 20, 20);
pop();
}
}let video;
let colInfo;
let word = [];
function setup() { 
createCanvas(800, 600);
video = createCapture(VIDEO);
video.hide();
} 
function draw() { 
background(220);
image(video, 0,0,width,height);
var col = get(mouseX, mouseY);
noStroke();
fill(col[0], col[1], col[2]);
rectMode(CENTER);
rect(mouseX, mouseY, 100, 100);
if(word.length > 0){
for(var i = 0 ; i < word.length; i++){
word[i].size = (word[i].color[0] +word[i].color[1]+word[i].color[2])/6;
textSize(word[i].size);
fill(word[i].color[0], word[i].color[1], word[i].color[2]);
text(word[i].ascii, word[i].posX, word[i].posY);
}
}
}
function mouseMoved(){
colInfo = get(mouseX, mouseY);
var ascii = round(map(colInfo[0], 0, 255, 33, 122));
var letter = String.fromCharCode(ascii);
word.push(new Alphabets(colInfo, letter));
word[0].sizeCal();
}function setup() { 
createCanvas(400, 1000);
osc = new p5.Oscillator();
osc.setType('sin');
osc.freq(550);
osc.amp(1);
osc.start();
} 
function draw() { 
background(220);
osc.freq(mouseY*20);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
function setup() {
var bgValue = 10;
function setup() {
createCanvas(640, 480);
}
console.log("In list");
for (var i = 0; i < portList.length; i++) {
console.log(i + " " + portList[i]);
portName = portList[i];
}
}
}
if (inData.length>0) {
var d = split(inData, ',');
console.log(d);
if (d.length == 4) {
bgValue = parseInt(d[0]);
switchState = parseInt(d[1]);
console.log("bgValue = " + bgValue);
console.log("switchState = " + switchState);      
}
}
}
function draw() {
if (switchState == 1) { 
background(bgValue/4);
} else {
background(255, 0, bgValue/4);
}
textSize(32);
fill(0);
stroke(0);
fill(255, 0, 0);
ellipse(100, 300, 50, 50);
fill(0, 255, 0);
ellipse(200, 300, 50, 50);
}
function mousePressed() {
if (mouseX < width/2) {
} else {
}
}
function keyPressed() {
if (key>=0 && key<=9) {
}
}
function serverConnected() { console.log('connected to server.'); }
createCanvas(400, 400);
} 
function draw() { 
background(220);
}var puffin = [];
var images1 = [];
let mySound;
let mySound1;
let img_puffin;
function preload() {
soundFormats('mp3', 'ogg');
img_puffin = loadImage('images-1.jpg');
mySound = loadSound('puffin.mp3');
mySound1 = loadSound('puffin.mp3');
}
function setup() {
createCanvas(480, 420);
puffin1 = new Puffin();
puffin2 = new Puffin();
}
function mousePressed() {
var r = floor(random(0, puffin.length));
var b = new Puffin(mouseX, mouseY);
puffin.push(b);
mySound.play();
}
function draw() {
background(220);
for (var i = puffin.length - 1; i >= 0; i--) {
puffin[i].move();
puffin[i].show();
}
}
class Puffin {
constructor(x, y) {
this.x = x;
this.y = y;
}
move() {
this.x = this.x + random(-5, 5);
this.y = this.y + random(-5, 5);
}
show() {
push();
translate(this.x, this.y);
image(img_puffin, 0, 0, 20, 20);
pop();
}
}var bubbles = [];
var emojis = [];
function preload() {
emojis[0] = loadImage("images/emoji0.png"); 
}
function setup() {
cnv = createCanvas(600, 400);   
}
function mousePressed() {
var r = floor(random(0, emojis.length));
var b = new Bubble(mouseX, mouseY, emojis[r]);
bubbles.push(b);
}
function draw() {
background(220);
for (var i = bubbles.length-1; i >= 0; i--) {
bubbles[i].update();
bubbles[i].display(); 
}
}let puffin1;
let puffin2;
let mySound;
let mySound1;
function preload() {
mySound = loadSound('puffin.mp3');
mySound1 = loadSound('puffin.mp3');
}
function setup() {
createCanvas(480, 220);
puffin1 = new Puffin();
puffin2 = new Puffin();
mySound.play();
mySound.play();
}
function draw() {
background(220);
puffin1.move();
puffin1.show();
puffin2.move();
puffin2.show();
}
class Puffin {
constructor() {
this.x = 200;
this.y = 150;
}
move() {
this.x = this.x + random(-5, 5);
this.y = this.y + random(-5, 5);
}
show() {
push();
translate(this.x, this.y);
stroke(0);
strokeWeight(70);
line(0, -35, 0, -65);
noStroke();
fill(220);
ellipse(-17.5, -65, 35, 35);
ellipse(17.5, -65, 35, 35);
arc(0, -65, 70, 70, 0, PI);
fill(0);
ellipse(-14, -65, 8, 8);
ellipse(14, -65, 8, 8);
quad(0, -58, 4, -51, 0, -44, -4, -51);
pop();
}
}var puffin = [];
var images1 = [];
let mySound;
let mySound1;
let img_puffin;
function preload() {
soundFormats('mp3', 'ogg');
img_puffin = loadImage('images-1.jpg');
mySound = loadSound('puffin.mp3');
mySound1 = loadSound('puffin.mp3');
}
function setup() {
createCanvas(480, 420);
puffin1 = new Puffin();
puffin2 = new Puffin();
}
function mousePressed() {
var r = floor(random(0, puffin.length));
var b = new Puffin(mouseX, mouseY);
puffin.push(b);
mySound.play();
}
function draw() {
background(220);
for (var i = puffin.length - 1; i >= 0; i--) {
puffin[i].move();
puffin[i].show();
}
}
class Puffin {
constructor(x, y) {
this.x = x;
this.y = y;
}
move() {
this.x = this.x + random(-5, 5);
this.y = this.y + random(-5, 5);
}
show() {
push();
translate(this.x, this.y);
stroke(0);
strokeWeight(70);
line(0, -35, 0, -65);
noStroke();
fill(220);
ellipse(-17.5, -65, 35, 35);
ellipse(17.5, -65, 35, 35);
arc(0, -65, 70, 70, 0, PI);
fill(0);
ellipse(-14, -65, 8, 8);
ellipse(14, -65, 8, 8);
quad(0, -58, 4, -51, 0, -44, -4, -51);
pop();
}
}let puffin1;
let puffin2;
let mySound;
let mySound1;
function preload() {
mySound = loadSound('puffin.mp3');
mySound1 = loadSound('puffin.mp3');
}
function setup() {
createCanvas(480, 220);
puffin1 = new Puffin();
puffin2 = new Puffin();
mySound.play();
mySound.play();
}
function draw() {
background(220);
puffin1.move();
puffin1.show();
puffin2.move();
puffin2.show();
}
class Puffin {
constructor() {
this.x = 200;
this.y = 150;
}
move() {
this.x = this.x + random(-5, 5);
this.y = this.y + random(-5, 5);
}
show() {
push();
translate(this.x, this.y);
stroke(0);
strokeWeight(70);
line(0, -35, 0, -65);
noStroke();
fill(220);
ellipse(-17.5, -65, 35, 35);
ellipse(17.5, -65, 35, 35);
arc(0, -65, 70, 70, 0, PI);
fill(0);
ellipse(-14, -65, 8, 8);
ellipse(14, -65, 8, 8);
quad(0, -58, 4, -51, 0, -44, -4, -51);
pop();
}
}var puffin = [];
let mySound;
let mySound1;
function preload() {
soundFormats('mp3', 'ogg');
mySound = loadSound('puffin.mp3');
mySound1 = loadSound('puffin.mp3');
}
function setup() {
createCanvas(480, 420);
puffin1 = new Puffin();
puffin2 = new Puffin();
function mousePressed() {
var r = floor(random(0, puffin.length));
var b = new puffin(mouseX, mouseY, puffin[r]);
puffin.push(b);
}
}
function draw() {
background(220);
puffin1.move();
puffin1.show();
puffin2.move();
puffin2.show();
}
for (var i = puffin.length - 1; i >= 0; i--) {
puffin[i].update();
puffin[i].display();
}
class Puffin {
constructor() {
this.x = 200;
this.y = 150;
}
move() {
this.x = this.x + random(-5, 5);
this.y = this.y + random(-5, 5);
}
show() {
push();
translate(this.x, this.y);
stroke(0);
strokeWeight(70);
line(0, -35, 0, -65);
noStroke();
fill(220);
ellipse(-17.5, -65, 35, 35);
ellipse(17.5, -65, 35, 35);
arc(0, -65, 70, 70, 0, PI);
fill(0);
ellipse(-14, -65, 8, 8);
ellipse(14, -65, 8, 8);
quad(0, -58, 4, -51, 0, -44, -4, -51);
pop();
}
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
}let puffin1;
let puffin2;
function setup() {
createCanvas(480, 220);
puffin1 = new Puffin();
puffin2 = new Puffin();
}
function draw() {
background(220);
puffin1.move();
puffin1.show();
puffin2.move();
puffin2.show();
}
class Puffin {
constructor() {
this.x = 200;
this.y = 150;
}
move() {
this.x = this.x + random(-5, 5);
this.y = this.y + random(-5, 5);
}
show() {
push();
translate(this.x, this.y);
stroke(0);
strokeWeight(70);
line(0, -35, 0, -65);
noStroke();
fill(220);
ellipse(-17.5, -65, 35, 35);
ellipse(17.5, -65, 35, 35);
arc(0, -65, 70, 70, 0, PI);
fill(0);
ellipse(-14, -65, 8, 8);
ellipse(14, -65, 8, 8);
quad(0, -58, 4, -51, 0, -44, -4, -51);
pop();
}
}function setup() { 
createCanvas(400, 400);
bubblees.push(new Bubble(200,200));
} 
function draw() {
bubble.display();
background(220);
for(let i =0; 
class Bubble{
constructor(){
this.diameter = 20;
this.x=200;
this.y = 200;
this.color = 255;
}      
display() {
fill(255);
ellipse(this.x, this.y, this.diameter, this.diameter);
}
move() {
this.x+= this.speed;
this.y+= this.speed;}
}
class Circle{
constructor(_x, _y, _r, _xdir, _ydir){
this.x =_x;
this.y =_y;
this.r =_x;
this.x =_x;
this.x =_x;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
}function setup() { 
var angle = degrees(PI/2);
} 
function draw() { 
}var puffin = {
x: 0,
y: -35,
move: function() {
this.x = this.x + random(-1, 1);
this.y = this.y + random(-1, 1);
},
}
function setup() {
createCanvas(480, 220);
}
function draw() {
puffin.display();
background(220);
}
function puffin(x, y) {
push();
translate(x, y);
stroke(0);
strokeWeight(70);
line(0, -35, 0, -65);
noStroke();
fill(220);
ellipse(-17.5, -65, 35, 35);
ellipse(17.5, -65, 35, 35);
arc(0, -65, 70, 70, 0, PI);
fill(0);
ellipse(-14, -65, 8, 8);
ellipse(14, -65, 8, 8);
quad(0, -58, 4, -51, 0, -44, -4, -51);
pop();
puffin.move();
}
function setup() { 
createCanvas(500, 220);
} 
function draw() { 
background(204);
randomSeed(0);
for (var i = 35; i < width + 40; i += 40){
var gray = int(random(0, 102));
var scalar = random(0.25, 1.0);
puffin(i,110, gray, scalar);
}
{
}
}
function puffin(x, y, g, s) {
push();
translate(x,y);
scale(s);
stroke(g);
strokeWeight(70);
line(0, -35, 0, -65);
noStroke();
fill(255-g);
ellipse(-17.5, -65, 35, 35);
ellipse(17.5, -65, 35, 35);
arc(0, -65, 70, 70, 0, PI);
fill(g);
ellipse(-14, -65, 8, 8);
ellipse(14, -65, 8, 8);
quad(0, -58, 4, -51, 0, -44, -4, -51);
pop();
}
function setup() { 
createCanvas(500, 220);
} 
function draw() { 
background(204);
randomSeed(0);
for (var i = 35; i < width + 40; i += 40){
var gray = int(random(0, 102));
var scalar = random(0.25, 1.0);
puffin(i,110, gray, scalar);
}
{
}
}
function puffin(x, y, g, s) {
push();
translate(x,y);
scale(s);
stroke(g);
strokeWeight(70);
line(0, -35, 0, -65);
noStroke();
fill(255-g);
ellipse(-17.5, -65, 35, 35);
ellipse(17.5, -65, 35, 35);
arc(0, -65, 70, 70, 0, PI);
fill(g);
ellipse(-14, -65, 8, 8);
ellipse(14, -65, 8, 8);
quad(0, -58, 4, -51, 0, -44, -4, -51);
pop();
}
function setup() { 
createCanvas(480, 220);
} 
function draw() { 
background(204);
for (var x = 35; x< width + 70; x += 70)
for (var y = 35; y< height + 55; y += 55)
{
puffin(x, y);
}
}
function puffin(x, y) {
push();
translate(x,y);
stroke(0);
strokeWeight(70);
line(0, -35, 0, -65);
noStroke();
fill(220);
ellipse(-17.5, -65, 35, 35);
ellipse(17.5, -65, 35, 35);
arc(0, -65, 70, 70, 0, PI);
fill(0);
ellipse(-14, -65, 8, 8);
ellipse(14, -65, 8, 8);
quad(0, -58, 4, -51, 0, -44, -4, -51);
pop();
}var bubble = {
x: 300,
y: 200,
display: function() {
stroke(100,25,0);
strokeWeight(2);
fill(0,100,80);
ellipse(this.x, this.y, 24, 24);
},
move: function() {
bubble.x = bubble.x + random(-1,1);
bubble.y = bubble.y + random(-1,1);
}
}
function setup() { 
createCanvas(600, 400);
}
function draw() { 
background(0);
bubble.move();
bubble.display();
}
function setup() { 
createCanvas(480, 220);
} 
function draw() { 
background(204);
puffin(110, 210);
puffin(180, 165);
puffin(250, 110);
puffin(320, 165);
puffin(390, 210);
}
function puffin(x, y) {
push();
translate(x,y);
stroke(0);
strokeWeight(70);
line(0, -35, 0, -65);
noStroke();
fill(220);
ellipse(-17.5, -65, 35, 35);
ellipse(17.5, -65, 35, 35);
arc(0, -65, 70, 70, 0, PI);
fill(0);
ellipse(-14, -65, 8, 8);
ellipse(14, -65, 8, 8);
quad(0, -58, 4, -51, 0, -44, -4, -51);
pop();
function setup() { 
createCanvas(480, 220);
} 
function draw() { 
background(204);
translate(110,165);
stroke(0);
strokeWeight(70);
line(0, -35, 0, -65);
noStroke();
fill(220);
ellipse(-17.5, -65, 35, 35);
ellipse(17.5, -65, 35, 35);
arc(0, -65, 70, 70, 0, PI);
fill(0);
ellipse(-14, -65, 8, 8);
ellipse(14, -65, 8, 8);
quad(0, -58, 4, -51, 0, -44, -4, -51);
}var bubble = {
x: 300,
y: 200,
display: function() {
stroke(100,25,0);
strokeWeight(2);
fill(0,100,80);
ellipse(this.x, this.y, 24, 24);
},
move: function() {
this.x = this.x + random(-1,1);
this.y = this.y + random(-1,1);
}
}
function setup() { 
createCanvas(600, 400);
}
function draw() { 
background(0);
bubble.move();
bubble.display();
}function setup() {
createCanvas(600, 400);
}
function draw() {
background(50);
lollipop(100,100,50);
lollipop(300,200,150);
}
function lollipop(x, y, diameter) {
fill(0, 200, 255);
rect(x - 10, y, 20, 150);
fill(255, 0, 200);
ellipse(x, y, diameter, diameter);
}var ball = {
x: 300,
y: 200,
xspeed: 4,
yspeed: -3
}
function setup() { 
createCanvas(600, 400);
} 
function draw() { 
background(0);
move();
bounce();
display();
}
function move() {
ball.x = ball.x + ball.xspeed;
ball.y = ball.y + ball.yspeed;
}
function bounce() {
if (ball.y > height || ball.y < 0) {
ball.yspeed = ball.yspeed * -1;
}
if (ball.x > width || ball.x < 0) {
ball.xspeed = ball.xspeed * -1;
}
}
function display() {
stroke(155);
strokeWeight(2);
fill(255,50,0);
ellipse(ball.x, ball.y, 24,24);
}
var ball = {
x: 300,
y: 200,
xspeed: 4,
yspeed: -3
}
function setup() { 
createCanvas(600, 400);
} 
function draw() { 
background(0);
move();
bounce();
display();
}
function move() {
ball.x = ball.x + ball.xspeed;
ball.y = ball.y + ball.yspeed;
}
function bounce() {
if (ball.y > height || ball.y < 0) {
ball.yspeed = ball.yspeed * -1;
}
if (ball.x > width || ball.x < 0) {
ball.xspeed = ball.xspeed * -1;
}
}
function display() {
stroke(255);
strokeWeight(4);
fill(255,50,0);
ellipse(ball.x, ball.y, 24,24);
}
function myFunction(y){
stroke(255);
strokeWeight(4);
noFill();
ellipse(200,y,40);
}
function setup() { 
createCanvas(600, 400);
background(0);
} 
function draw() { 
myFunction(200);
myFunction(400);
myFunction(150);
if (mouseX > 300) {
fill(255,0,200);
}  
}var sqSize = 80;
var positionX = 0
var positionY = 0
function setup() { 
createCanvas(400, 400);
fill(255);
positionX = width/2;
positionY = height/2;
} 
function draw() { 
background(220);
rectMode(CENTER)
rect(positionX,positionY,sqSize,sqSize);
if (
(mouseX > (width/2 - sqSize/2))   &&
(mouseX < (height/2 + sqSize/2))  &&
(mouseY > (width/2 - sqSize/2))   &&
(mouseY < (height/2 + sqSize/2))  &&
(mouseIsPressed)
){
fill(160,20,0);  
positionX = mouseX;
positionY = mouseY;
}else{
fill(255); 
}
}function setup() { 
createCanvas(600, 400);
} 
function draw() { 
background(0);
stroke(255);
strokeWeight(4);
noFill();
if (mouseX > 300) {
fill(255,0,200);
}  
ellipse(300,200,100,100);
}var sqSize = 80;
var positionX = 0
var positionY = 0
function setup() { 
createCanvas(400, 400);
fill(255);
positionX = width/2;
positionY = height/2;
} 
function draw() { 
background(220);
rectMode(CENTER)
rect(positionX,positionY,sqSize,sqSize);
if (
(mouseX > (width/2 - sqSize/2))  &&
(mouseX < (width/2 + sqSize/2))  &&
(mouseY > (height/2 - sqSize/2)) &&
(mouseY < (height/2 + sqSize/2)) &&
(mouseIsPressed)
){
fill(160,20,0);  
positionX = mouseX;
positionY = mouseY;
}else{
fill(255); 
}
}var sqSize = 80;
var positionX = 0
var positionY = 0
function setup() { 
createCanvas(400, 400);
fill(255);
positionX = width/2;
positionY = height/2;
} 
function draw() { 
background(220);
rectMode(CENTER)
rect(positionX,positionY,sqSize,sqSize);
if (
(mouseX > (width/2 - sqSize/2))  &&
(mouseX < (width/2 + sqSize/2))  &&
(mouseY > (height/2 - sqSize/2)) &&
(mouseY < (height/2 + sqSize/2)) &&
(mouseIsPressed)
){
fill(160,20,0);  
positionX = mouseX;
positionY = mouseY;
}else{
fill(255); 
}
}var sqSize=20;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
rectMode(CENTER)
rect(width/2,height/2,sqSize,sqSize)
if (mouseX > (width/2-sqSize/2)){
}
}var colorWhite = 255;
var colorGrey = 155;
var sqWidth = 50;
var xPos = 0;
var yPos = 0;
var offsetX = 50;
var count = 0;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(0);
var counter =0;
if (count <= 1){
for (var xcanvas = 0; xcanvas < width; xcanvas += sqWidth) {
counter++;
for(var ycanvas = 0; ycanvas < height; ycanvas += sqWidth){
counter++;
if (counter%2==0){ 
fill(255);
quad (xcanvas+offsetX, ycanvas, 
xcanvas,(ycanvas+sqWidth),
(xcanvas+sqWidth),(ycanvas+sqWidth),
(xcanvas+(sqWidth+offsetX)),ycanvas);
}
if (counter%2==1){ 
fill(90);
quad  (xcanvas+offsetX, ycanvas, 
xcanvas,(ycanvas+sqWidth),
(xcanvas+sqWidth),(ycanvas+sqWidth),
(xcanvas+(sqWidth+offsetX)),ycanvas);      
}
}
}
}
}
var circle = {
x: 0,
y: 200,
diameter: 50
};
var r = 218;
var g = 160;
var b = 221;
function setup() { 
createCanvas(600, 400);
}
function draw() { 
background(r, g, b);
fill(250, 200, 200);
ellipse(circle.x, circle.y, circle.diamter,circle.diameter);  
circle.x = circle.x + 1;
}
var circleX = 0;
var circleY = 0;
function setup() { 
createCanvas(600, 400);
} 
function draw() { 
background(250,250,100);
fill(250, 200, 200);
ellipse(circleX,circleY,80,80);
circleX = circleX + 5; 
circleY = circleY + 5;
}
createCanvas(600, 400);
background(250,250,100);
} 
function draw() { 
noStroke();
fill(250,200,50);
ellipse(mouseX,mouseY,25,25);
}
function mousePressed(){
background(250,250,100);
}var colorWhite=255
var colorGrey=155
var sqWidth=50
var count=0
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(255);
fiil(colorWhite);
rect(0, 0, sqWidth, sqWidth);
}var ball={
x: 0,
function setup()  
createCanvas(400, 400);
} 
function draw() { 
bal.x=random(0,width);
bal.y=random(0,height);
bal.d=random(10,30);
if(mouseIsPressed && mouseX >button.x && mouseX < button.x + button.d &&
mouseY >button.y && 
background(220);
}var x = 10;
function setup() {
createCanvas(500, 400);
}
function draw() {
x=mouseX
background(120, 100, 0);
noFill();
push();
pop();
fill(0, 60, 100);
ellipse(x+73, 100, 70, 70);
fill(25, 140, 0);
ellipse(55, 85, 15, 15);
line(75, 100, 40, 100);
fill(125, 40, 12);
ellipse(x+256, 346, 55, 55);
ellipse(306, 346, 55, 55);
ellipse(356, 346, 55, 55);
ellipse(406, 346, 55, 55);
fill(125, 40, 12);
line(250, 300, 73, 135);
rect(250, 300, 155, 55);
rect(250, 200, 155, 55);
rect(300, 145, 55, 155);
fill(100, 10, 10);
triangle(45, 75, 73, 20, 101, 75);
push();
scale(0.25);
translate(75*3,135*3);
fill(0, 60, 100);
triangle(45, 75+115, 75, 20+115, 101, 75+115);
pop();
push();
translate(-40, 15);
noFill();
bezier(85-10, 20+200, 10+200, 10+200, 90-10, 90+50, 15+100, 80+50);
pop();
stroke(255, 102, 0);
stroke(0, 0, 0);
var offsetX = 0;
var offsetY = 0;
var stepX = -1;
var stepY = -1;
function setup() {
createCanvas(500, 400);
}
function draw() {
offsetX = offsetX + stepX;
offsetY = offsetY + stepY;
background(120, 100, 0);
noFill();
push();
pop();
fill(0, 60, 100);
ellipse(offsetX+73, 100, 70, 70);
fill(25, 140, 0);
ellipse(55, 85, 15, 15);
line(75, 100, 40, 100);
fill(125, 40, 12);
ellipse(offsetX+256, offsetY+346, 55, 55);
ellipse(306, 346, 55, 55);
ellipse(356, 346, 55, 55);
ellipse(406, 346, 55, 55);
fill(125, 40, 12);
line(250, 300, 73, 135);
rect(250, 300, 155, 55);
rect(250, 200, 155, 55);
rect(300, 145, 55, 155);
fill(100, 10, 10);
triangle(45, 75, 73, 20, 101, 75);
push();
scale(0.25);
translate(75*3,135*3);
fill(0, 60, 100);
triangle(45, 75+115, 75, 20+115, 101, 75+115);
pop();
push();
translate(-40, 15);
noFill();
bezier(85-10, 20+200, 10+200, 10+200, 90-10, 90+50, 15+100, 80+50);
pop();
stroke(255, 102, 0);
stroke(0, 0, 0);
var offsetX = 0;
var offsetY = 0;
var stepX = -1;
var stepY = -1;
function setup() {
createCanvas(500, 400);
}
function draw() {
offsetX = offsetX + stepX;
offsetY = offsetY + stepY;
background(120, 100, 0);
noFill();
push();
pop();
fill(0, 60, 100);
ellipse(offsetX+73, offsetY+100, 70, 70);
fill(25, 140, 0);
ellipse(offsetX+55, offsetY+85, 15, 15);
line(offsetX+75, offsetY+100, offsetX+40, offsetY+100);
fill(125, 40, 12);
ellipse(offsetX+256, offsetY+346, 55, 55);
ellipse(offsetX+306, offsetY+346, 55, 55);
ellipse(offsetX+356, offsetY+346, 55, 55);
ellipse(offsetX+406, offsetY+346, 55, 55);
fill(125, 40, 12);
line(offsetX+250, offsetY+300, offsetX+73, offsetY+135);
rect(offsetX+250, offsetY+300, 155, 55);
rect(offsetX+250, offsetY+200, 155, 55);
rect(offsetX+300, offsetY+145, 55, 155);
fill(100, 10, 10);
triangle(offsetX+45, offsetY+75, offsetX+73, offsetY+20, offsetX+101, offsetY+75);
push();
scale(0.25);
translate(75*3,135*3);
fill(0, 60, 100);
triangle(offsetX+45, offsetY+75+115, offsetX+75, offsetY+20+115, offsetX+101, offsetY+75+115);
pop();
push();
translate(-40, 15);
noFill();
bezier(offsetX+85-10, offsetY+20+200, 10+200, 10+200, 90-10, 90+50, offsetX+15+100, offsetY+80+50);
pop();
stroke(255, 102, 0);
stroke(0, 0, 0);
}var x = 10;
function setup() {
createCanvas(500, 400);
}
function draw() {
x=-mouseX
background(120, 100, 0);
noFill();
push();
pop();
fill(125, 40, 12);
ellipse(x+256, 346, 55, 55);
ellipse(x+306, 346, 55, 55);
ellipse(x+356, 346, 55, 55);
ellipse(x+406, 346, 55, 55);
fill(0, 60, 100);
ellipse(x+73, 100, 70, 70);
fill(125, 40, 12);
line(x+75, 100, x+40, 100);
line(x+250, 300, x+73, 135);
rect(x+250, 300, 155, 55);
rect(x+250, 200, 155, 55);
rect(x+300, 145, 55, 155);
fill(100, 10, 10);
triangle(x+45, 75, x+73, 20, x+101, 75);
fill(25, 140, 0);
ellipse(x+55, 85, 15, 15);
push();
scale(0.25);
translate(75*3,135*3);
fill(0, 60, 100);
triangle(x+45, 75+115, x+75, 20+115, x+101, 75+115);
pop();
push();
translate(-40, 15);
noFill();
bezier(x+85-10, 20+200, x+10+200, 10+200, 90-10, 90+50, x+15+100, 80+50);
pop();
stroke(255, 102, 0);
stroke(0, 0, 0);
}var x = 10;
function setup() {
createCanvas(500, 400);
}
function draw() {
x=mouseX
background(120, 100, 0);
noFill();
push();
pop();
fill(0, 60, 100);
ellipse(x+73, 100, 70, 70);
fill(25, 140, 0);
ellipse(55, 85, 15, 15);
line(75, 100, 40, 100);
fill(125, 40, 12);
ellipse(x+256, 346, 55, 55);
ellipse(306, 346, 55, 55);
ellipse(356, 346, 55, 55);
ellipse(406, 346, 55, 55);
fill(125, 40, 12);
line(250, 300, 73, 135);
rect(250, 300, 155, 55);
rect(250, 200, 155, 55);
rect(300, 145, 55, 155);
fill(100, 10, 10);
triangle(45, 75, 73, 20, 101, 75);
push();
scale(0.25);
translate(75*3,135*3);
fill(0, 60, 100);
triangle(45, 75+115, 75, 20+115, 101, 75+115);
pop();
push();
translate(-40, 15);
noFill();
bezier(85-10, 20+200, 10+200, 10+200, 90-10, 90+50, 15+100, 80+50);
pop();
stroke(255, 102, 0);
stroke(0, 0, 0);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
}var x = 10;
function setup() {
createCanvas(500, 400);
}
function draw() {
x=mouseX
background(120, 100, 0);
noFill();
push();
pop();
fill(0, 60, 100);
ellipse(x+73, 100, 70, 70);
fill(25, 140, 0);
ellipse(55, 85, 15, 15);
line(75, 100, 40, 100);
fill(125, 40, 12);
ellipse(x+256, 346, 55, 55);
ellipse(306, 346, 55, 55);
ellipse(356, 346, 55, 55);
ellipse(406, 346, 55, 55);
fill(125, 40, 12);
line(250, 300, 73, 135);
rect(250, 300, 155, 55);
rect(250, 200, 155, 55);
rect(300, 145, 55, 155);
fill(100, 10, 10);
triangle(45, 75, 73, 20, 101, 75);
push();
scale(0.25);
translate(75*3,135*3);
fill(0, 60, 100);
triangle(45, 75+115, 75, 20+115, 101, 75+115);
pop();
push();
translate(-40, 15);
noFill();
bezier(85-10, 20+200, 10+200, 10+200, 90-10, 90+50, 15+100, 80+50);
pop();
stroke(255, 102, 0);
stroke(0, 0, 0);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(255,128,255);
line(10, 10, 100, 100);
nofill
ellipse(100,100,40);
}
createCanvas(400, 400);
} 
function draw() { 
background(255,128,255);
line(10, 10, 100, 100);
nofill
ellipse(100,100,40);
}
createCanvas(400, 400);
} 
function draw() { 
background(255,128,255);
line(10, 10, 100, 100);
fill(0,255,0);
nofill
ellipse(100,100,40);
}
var yposition=200;
function setup() { 
rectMode(CENTER);
createCanvas(400, 400);
} 
function draw() { 
background(220);
rect(xposition,yposition,200,200);
}var xposition=200;
var yposition=200;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
triangle(120,60,360,60,xposition,yposition);
rect(xposition,yposition,40,40);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
}function setup() { 
createCanvas(600, 400);
} 
function draw() { 
background(0,255,255);
strokeWeight(40);
stroke(255,0,0);
line(0,0,600,400);
strokeWeight(0);
ellipse(300, 200, 300, 220);
fill(0,0,153);
rect(410,160,40,40);
strokeWeight(0);
fill(0,204,0);
}function setup() { 
createCanvas(600, 400);
} 
function draw() { 
background(0,255,255);
ellipse(300, 200, 300, 220);
fill(0,204,0);function setup() { 
createCanvas(600, 400);
} 
function draw() { 
background(0,255,255);
ellipse(300, 200, 300, 220);
fill(0,204,0);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
ellipse(200, 200, 200, 200);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
ellipse(200, 200, 200, 200);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(200);
ellipse(200, 200, 200, 200);
fill(0,255,255);
}