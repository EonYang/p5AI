let video;
let vScale=16;
var button;
var snapshots = [];
function setup() {
createCanvas(400, 400);
pixelDensity(1);
video = createCapture(VIDEO);
video.size(width/vScale, height/vScale);
button = createButton('TICKLE');
button.mousePressed(takesnap);
video.hide();
}
function takesnap() {
background(random(255),0,0);
vScale ++;
}
function draw() {
background(random(255), random(255), random(255),random(1,100));
video.loadPixels();
loadPixels();
for (let y = 0; y < video.height; y++) {
for (let x = 0; x < video.width; x++) {
let index = (x + y * video.width) * 4;
let r = video.pixels[index + 0];
let g = video.pixels[index + 1];
let b = video.pixels[index + 2];
let bright = (r+g+b)/2;
let w = map(bright,0,255,0,vScale);
noStroke();
fill(255);
rectMode(CENTER);
rect(x*vScale, y*vScale, w, w);
}
}
}let video;
let vScale=16;
function setup() {
createCanvas(640, 480);
pixelDensity(1);
video = createCapture(VIDEO);
video.size(width/vScale, height/vScale);
}
function draw() {
background(50);
video.loadPixels();
loadPixels();
for (let y = 0; y < video.height; y++) {
for (let x = 0; x < video.width; x++) {
let index = (x + y * video.width) * 4;
let r = video.pixels[index + 0];
let g = video.pixels[index + 1];
let b = video.pixels[index + 2];
let bright = (r+g+b)/3;
let w = map(bright,0,255,0,vScale);
noStroke();
fill(255);
rectMode(CENTER);
rect(x*vScale, y*vScale, w, w);
}
}
}function preload() {
data = loadJSON("mta.json");
}
function setup() { 
var lost = data.mta[1].accessories[2];
createP(mta);
} 
function draw() { 
}
var paragraphs;
function preload() {
data = loadJSON("collective.json");
}
function setup() { 
var collective = data.list; 
for(var i = 0; i<collective.length; i++) {
createElement('h1',collective[i].nouns);
}
}
var weather;
function setup() { 
createCanvas(400, 400);
} 
function gotData(data){
weather = data;
}
function draw() { 
background(0);
if (weather) {
ellipse(100,100,weather.main.temp);
}
var inData;
var slider;
let canvas = {
x: 400,
y: 400
};
let hourHandRotate;
let minutehandRotate;
let hourHandColor;
let minuteHandColor;
function setup() {
nameP = createP();  
createCanvas(canvas.x, canvas.y);
colorMode(HSB);
slider = createSlider(0,255,50);
input = createInput ("Taste the rainbow");
r = random(360);
g = random(360);
b = random(360);
}
function serverConnected() {
}
function portOpen() {
}
}
}
function portClose() {
}
function draw() {
background(slider.value(), 20, 80);
nameP.html(input.value());
text("Potentiometer Value:" + inData, 30, 30);
stroke(r, g, b);
strokeWeight(2);
noFill();
smooth();
ellipseMode(RADIUS);
ellipse(200, 100, 50, 50);
ellipse(200, 150, 50, 50);
ellipse(200, 200, 50, 50);
ellipse(200, 250, 50, 50);
ellipse(200, 300, 50, 50);
ellipse(245, 275, 50, 50);
ellipse(245, 225, 50, 50);
ellipse(245, 175, 50, 50);
ellipse(245, 125, 50, 50);
ellipse(155, 275, 50, 50);
ellipse(155, 225, 50, 50);
ellipse(155, 175, 50, 50);
ellipse(155, 125, 50, 50);
ellipse(290, 250, 50, 50);
ellipse(290, 200, 50, 50);
ellipse(290, 150, 50, 50);
ellipse(115, 250, 50, 50);
ellipse(115, 200, 50, 50);
ellipse(115, 150, 50, 50);
ellipse(202.5, 200, 150, 150);
push();
hourHandRotate = map(inData, 0, canvas.x, 0, 2 * PI);
minuteHandRotate = map(inData, 0, canvas.x, 0, 24 * PI);
hourHandColor = map(inData, 0, canvas.y, 180, 360);
minuteHandColor = map(inData, 0, canvas.y, 360, 180);
translate(canvas.x / 2, canvas.y / 2);
noFill();
rotate(hourHandRotate)
strokeWeight(6);
stroke(hourHandColor, 100, 100);
line(0, 0, 0, 85);
rotate(minuteHandRotate - hourHandRotate)
strokeWeight(6);
stroke(minuteHandColor, 100, 100);
line(0, 0, 0, 145)
pop();
var inData;
function setup() {
createCanvas(400,300);
background(0x08, 0x16, 0x40);
}
}
function serverConnected() {
}
function portOpen() {
}
}
}
function portClose() {
}
function graphData(newData) {
var yPos = map(newData, 0, 255, 0, height);
stroke(0xA8, 0xD9, 0xA7);
line(xPos, height, xPos, height - yPos);
if (xPos >= width) {
xPos = 0;
background(0x08, 0x16, 0x40);
} else {
xPos++;
}
}
function draw() {
graphData(inData);
}
function setup() {
}
for (var i = 0; i < portList.length; i++) {
}
}var bgcolor;
var button;
var slider;
var input;
var nameP;
function setup() { 
canvas = createCanvas(400, 400);
canvas.mouseOver(overpara);
canvas.mouseOut(outpara);
canvas.mousePressed(changeColor);
bgcolor = color(200);
nameP = createP('Your Name');
button = createButton( "go go go");
button.mousePressed(changeColor);
nameP.mouseOver(overpara);
nameP.mouseOut(outpara);
slider = createSlider(10,100,47);
input = createInput ("type your name");
} 
function overpara(){
nameP.html('Your mouse is over')
}
function outpara(){
nameP.html('Your mouse is OUT')
}
function changeColor() {
bgcolor = color(random(255));
}
function draw() { 
background(bgcolor);
fill(255,255,0);
rect(100,100,slider.value(),slider.value());
text(input.value(), 10,20);
}var canvas;
var h1;
var x = 100;
var y = 100;
function setup() { 
canvas = createCanvas(400, 200);
createP("rawr");
h1 = createElement('h1', "Test");
} 
function mousepressed() {
h1.html("Now I will show you my Favorite Numbers")
createP("Fav Numb is");
}
function draw() { 
clear();
background(200);
fill(255,255,0);
rect(x,y, 50,50);
h1.position(x,y);
x = x + random(-5,5);
}function setup() {
createCanvas(200, 200);
createP("rawr");
}
function draw() {
background(0);
fill(255, 0, 0);
rect(100, 100, 50, 50);
}function setup() {
createCanvas(400,400);  
}
function draw() {
background(200);
stroke(0);
noFill();
drawCircle(width/2,height/2,200); 
}
function drawCircle(x,y,rad) {
ellipse(x, y, rad, rad);
if(rad > 10) {
let newrad = rad/2
rad = newrad;
}
}function setup() { 
createCanvas(400, 400);
} 
var button = {
x: 0,
y: 0,
d: 100
}
function draw() { 
background(220);
rect(width - 100, height - 100, 100, 100)
}var ball = {
x: 0,
y: 0,
d: 0
};
function setup() { 
createCanvas(400, 400);
ball.x = random(0,width),
ball.y = random(0,height),
ball.d = random(10,30);
};
function draw() { 
background(220);
ellipse (ball.x,ball.y,ball.d);
ball.x =  ball.x + ball.xspeed;
if (ball.x > width) { 
ball.xspeed = balll.xspeed * -1
}let canvas = {
x: 400,
y: 400
};
let hourHandRotate;
let minutehandRotate;
let hourHandColor;
let minuteHandColor;
function setup() { 
createCanvas(canvas.x, canvas.y);
colorMode(HSB);
} 
function draw() { 
background(frameCount%360,40,70);
push();
hourHandRotate = map(mouseX,0,canvas.x,0,2*PI);
minuteHandRotate = map(mouseX,0,canvas.x,0,24*PI);
hourHandColor = map(mouseY,0, canvas.y, 0, 360);
minuteHandColor = map(mouseY, 0, canvas.y, 360, 0);
translate (canvas.x/2, canvas.y/2);
fill("white")
ellipse (0,0,200,200);
rotate(hourHandRotate)
strokeWeight(6);
stroke(hourHandColor,100,100);
line (0,0,0,50);
rotate(minuteHandRotate - hourHandRotate)
strokeWeight (6);
stroke (minuteHandColor,100,100);
line (0,0,0, 80)
pop ();
let canvas = {
x: 400,
y: 400
};
let hourHandRotate;
let minutehandRotate;
let hourHandColor;
let minuteHandColor;
function setup() { 
createCanvas(canvas.x, canvas.y);
colorMode(HSB);
r = random(360);
g = random(360);
b = random(360);  
} 
function draw() { 
background(frameCount%360,20,80);
stroke(r, g, b);
strokeWeight(2);
noFill();
smooth();
ellipseMode(RADIUS); 
ellipse(200, 100, 50, 50);
ellipse(200, 150, 50, 50);
ellipse(200, 200, 50, 50);
ellipse(200, 250, 50, 50);
ellipse(200, 300, 50, 50);
ellipse(245, 275, 50, 50);
ellipse(245, 225, 50, 50);
ellipse(245, 175, 50, 50);
ellipse(245, 125, 50, 50);
ellipse(155, 275, 50, 50);
ellipse(155, 225, 50, 50);
ellipse(155, 175, 50, 50);
ellipse(155, 125, 50, 50);
ellipse(290, 250, 50, 50);
ellipse(290, 200, 50, 50);
ellipse(290, 150, 50, 50);
ellipse(115, 250, 50, 50);
ellipse(115, 200, 50, 50);
ellipse(115, 150, 50, 50);
ellipse(202.5, 200, 150, 150); 
push();
hourHandRotate = map(mouseX,0,canvas.x,0,2*PI);
minuteHandRotate = map(mouseX,0,canvas.x,0,24*PI);
hourHandColor = map(mouseY,0, canvas.y, 180, 360);
minuteHandColor = map(mouseY, 0, canvas.y, 360, 180);
translate (canvas.x/2, canvas.y/2);
noFill();
rotate(hourHandRotate)
strokeWeight(6);
stroke(hourHandColor,100,100);
line (0,0,0,85);
rotate(minuteHandRotate - hourHandRotate)
strokeWeight (6);
stroke (minuteHandColor,100,100);
line (0,0,0,145)
pop ();
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
x = map(mouseX, 0, 50, 0, width);
y = mouseY;
rect (x,y, 20,50);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(255, 153, 51);
stroke(0, 0, 128);
strokeWeight(2);
noFill();
smooth();
ellipseMode(RADIUS); 
ellipse(200, 100, 50, 50);
ellipse(200, 150, 50, 50);
ellipse(200, 200, 50, 50);
ellipse(200, 250, 50, 50);
ellipse(200, 300, 50, 50);
ellipse(245, 275, 50, 50);
ellipse(245, 225, 50, 50);
ellipse(245, 175, 50, 50);
ellipse(245, 125, 50, 50);
ellipse(155, 275, 50, 50);
ellipse(155, 225, 50, 50);
ellipse(155, 175, 50, 50);
ellipse(155, 125, 50, 50);
ellipse(290, 250, 50, 50);
ellipse(290, 200, 50, 50);
ellipse(290, 150, 50, 50);
ellipse(115, 250, 50, 50);
ellipse(115, 200, 50, 50);
ellipse(115, 150, 50, 50);
ellipse(202.5, 200, 150, 150); 
}
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(255, 171, 45);
noFill()
ellipse(200, 100, 100, 100);
ellipse(200, 150, 100, 100);
ellipse(200, 200, 100, 100);
ellipse(200, 250, 100, 100);
ellipse(200, 300, 100, 100);
ellipse(250, 275, 100, 100);
ellipse(250, 225, 100, 100);
ellipse(250, 175, 100, 100);
ellipse(250, 125, 100, 100);
ellipse(150, 275, 100, 100);
ellipse(150, 225, 100, 100);
ellipse(150, 175, 100, 100);
ellipse(150, 125, 100, 100);
ellipse(300, 250, 100, 100);
ellipse(300, 200, 100, 100);
ellipse(300, 150, 100, 100);
ellipse(100, 250, 100, 100);
ellipse(100, 200, 100, 100);
ellipse(100, 150, 100, 100);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(120, 110, 234);
fill(200);
ellipse(200, 200, 100, 100);
rectMode(CENTER);
fill(255);
rect(167, 263, 33, 33);
rectMode(CENTER);
rect(233, 263, 33, 33);
fill(130);
triangle(150, 150, 250, 150, 200, 50);
Everything here is a comment and not code  
It was tricky getting the triangle to line up with the circle
}