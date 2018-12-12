- Turn on Sound
- Run the sketch
- Enter US state initials
- The number of chords represents
Native American tribes located in the state
- You can change states
let tribes = [];
let button;
let a = 0;
let c1 = 0;
let c2 = 0;
let c3 = 0;
let c4 = 0;
let speed1 = 1;
let speed2 = 2;
let speed3 = 1;
let speed4 = 2;
let op = false;
let col = 0;
let colSpeed = 1;
let song;
var amp;
var vol;
var fft;
var peakDetect;
let count = 0;
function setup() {
createCanvas(1080,608);
loadJSON('Tribes.json', stateCount);
stateInput = createInput('');
button = createButton('Enter');
button.mousePressed(use);
angleMode(DEGREES);
song = loadSound('Shaman.m4a');
amp = new p5.Amplitude();
fft = new p5.FFT();
peakDetect = new p5.PeakDetect(20, 20000, 0.08);
}
function stateCount(data) {
tribes = data;
}
function draw() {
background(0, 10);
translate(width/2, height/2);
vol = amp.getLevel();
fft.analyze();
peakDetect.update(fft);
if (op) {
noFill();
if (tribes.length > 0) {
a = 0;
for (let i = 0; i < tribes.length; i++) {
if (tribes[i].FIELD1 == stateInput.value()) {
a++;
}
}
}
for (let ang = 0; ang < 360; ang += (360 / a) / 2) {
rotate(ang);
stroke(0, 10);
fill(col, 10);
bezier(a, 0, c1, c2, c3, c4, 0,0);
}
c1 = c1 + speed1;
c2 = c2 + speed2;
c3 = c3 + speed3;
c4 = c4 + speed4;
if (peakDetect.isDetected) {
count++;
}
if (count % 2 == 0 || c1 < 0 || c1 > width) {
speed1 = -speed1;
}
if (count % 3 == 0 || c2 < 0 || c2 > height) {
speed2 = -speed2;
}
if (count % 5 == 0 || c3 < 0 || c3 > width) {
speed3 = -speed3;
}
if (count % 7 == 0 || c4 < 0 || c4 > height) {
speed4 = -speed4;
}
if (peakDetect.isDetected) {
col = [150, 20, 10, 70];
} else {
col = 255;
}
}
}
function use() {
op = !op
song.play();
}var videos = []
var vid1;
var vid2;
var dragging = false;
var rollover = false;
var offsetX, offsetY;
var x1 = 10;
var y1 = 10;
var x2 = 150;
var y2 = 150;
var w1 = 200;
var h1 = 100;
var w2 = 100;
var h2 = 50;
function setup() {
createCanvas(600,400);
vid1 = createVideo("pig.mp4");
vid2 = createVideo('running.mp4');
videos = [vid1,vid2]
vid1.hide().loop();
vid2.hide().loop();
rectMode(CENTER);
noStroke();
}
function draw(){
background(50);
fill(255);
vid.loadPixels();
for (var y = 0; y < height; y += 10) {
for (var x = 0; x < width; x += 5) {
var offset = ((y*width)+x)*4;
rect(x, y, 10,
10 * (vid.pixels[offset+1]/255));
}
}
}
var videos = []
var vid1;
var vid2;
var dragging = false;
var rollover = false;
var offsetX, offsetY;
var x1 = 10;
var y1 = 10;
var x2 = 150;
var y2 = 150;
var w1 = 200;
var h1 = 100;
var w2 = 100;
var w2 = 50;
function setup() {
createCanvas(600,400);
vid1 = createVideo("pig.mp4");
vid2 = createVideo('running.mp4');
videos = [vid1,vid2]
vid1.hide().loop();
vid2.hide().loop();
}
function draw(){
background(255);
if (mouseX > x1 && mouseX < x1 + w1 && mouseY > y1 && mouseY < y1 + h1) {
rollover = true;
} 
else {
rollover = false;
}
if (dragging) {
x1 = mouseX + offsetX;
y1 = mouseY + offsetY;
}
image(vid1,x1,y1,w1,h1);
}
function mousePressed() {
if (mouseX > x1 && mouseX < x1 + w1 && mouseY > y1 && mouseY < y1 + h1) {
dragging = true;
offsetX = x1-mouseX;
offsetY = y1-mouseY;
}
}
function mouseReleased() {
dragging = false;
}
var x1 = 0;
var y1 = 0;
var x2 = 0;
var y2 = 0;
var op = false;
function setup() {
createCanvas(400, 400);
loadJSON('word_count_year_nouns.json', stateCount);
wordInput1 = createInput('');
wordInput2 = createInput('');
button = createButton('Enter');
button.mousePressed(use);
}
function stateCount(data) {
years = data;
}
function draw() {
background(220);
if (op) {
if (years.length > 0) {
for (var i = 0; i < years['2018'].length; i++) {
if (wordInput1.value() == years['2018'][i][0]) {
var count18 = years['2018'][i][1];
}
break;
}
}
}
}
function use() {
op = !op
DDF 2018
need to have p5.svg.js in project and in index.html
this will save an SVG file in your download folder
let x1 = 0;
let y1 = 0;
let y3 = 0;
let x4 = 0;
let x2 = 200;
let y2 = 200;
let x3 = 200;
let y4 = 200;
let speed1 = 5
let speed2 = 10
let speed3 = 10
let speed4 = 10
let a = 0;
function setup() {
}
function draw() {
for(let i=0; i<100; i++){
noFill();
stroke(0);
line(x1,y1, x2, y2);
line(x3, y3, x4, y4);
stroke(0);
x1 += speed1;
x4 += speed1;
}
}
let x1 = 0;
let y1 = 0;
let y3 = 0;
let x4 = 0;
let x2 = 200;
let y2 = 200;
let x3 = 200;
let y4 = 200;
let speed1 = 5
let speed2 = 10
let speed3 = 10
let speed4 = 10
let a = 0;
function setup() {
createCanvas(400, 200);
background(255);
angleMode(DEGREES);
}
function draw() {
for(let i=0; i<100; i++){
noFill();
stroke(0);
line(x1,y1, x2, y2);
line(x3, y3, x4, y4);
stroke(0);
x1 += speed1;
x4 += speed1;
}
noLoop();
}
- Turn on Sound
- Run the sketch
- Enter US state initials
- The number of chords represents
Native American tribes located in the state
- You can change states
let tribes = [];
let button;
let a = 0;
let c1 = 0;
let c2 = 0;
let c3 = 0;
let c4 = 0;
let speed1 = 1;
let speed2 = 2;
let speed3 = 1;
let speed4 = 2;
let op = false;
let col = 0;
let colSpeed = 1;
let song;
var amp;
var vol;
var fft;
var peakDetect;
let count = 0;
function setup() {
createCanvas(1080,608);
loadJSON('Tribes.json', stateCount);
stateInput = createInput('');
button = createButton('Enter');
button.mousePressed(use);
angleMode(DEGREES);
song = loadSound('Shaman.m4a');
amp = new p5.Amplitude();
fft = new p5.FFT();
peakDetect = new p5.PeakDetect(20, 20000, 0.08);
}
function stateCount(data) {
tribes = data;
}
function draw() {
background(0, 10);
translate(width/2, height/2);
vol = amp.getLevel();
fft.analyze();
peakDetect.update(fft);
if (op) {
noFill();
if (tribes.length > 0) {
a = 0;
for (let i = 0; i < tribes.length; i++) {
if (tribes[i].FIELD1 == stateInput.value()) {
a++;
}
}
}
for (let ang = 0; ang < 360; ang += (360 / a) / 2) {
rotate(ang);
stroke(0, 10);
fill(col, 10);
bezier(a, 0, c1, c2, c3, c4, 0,0);
}
c1 = c1 + speed1;
c2 = c2 + speed2;
c3 = c3 + speed3;
c4 = c4 + speed4;
if (peakDetect.isDetected) {
count++;
}
if (count % 2 == 0 || c1 < 0 || c1 > width) {
speed1 = -speed1;
}
if (count % 3 == 0 || c2 < 0 || c2 > height) {
speed2 = -speed2;
}
if (count % 5 == 0 || c3 < 0 || c3 > width) {
speed3 = -speed3;
}
if (count % 7 == 0 || c4 < 0 || c4 > height) {
speed4 = -speed4;
}
if (peakDetect.isDetected) {
col = [150, 20, 10, 70];
} else {
col = 255;
}
}
}
function use() {
op = !op
song.play();
}let populations;
let objArray = [];
let wid = window.innerWidth;
let hei = window.innerHeight;
let bouncers = [];
let gravity = 0.4;
let startTime = 0;
let countries = [];
let col = 0;
function preload() {
}
function setup() {
createCanvas(wid,hei);
loadJSON('simpleData_noRegions.json', callback);
}
function callback(data) {
console.log('done loading data');
console.log(data);
populations = data;
if (populations) {
for (let i = 0; i < populations.length; i++) {
let name = populations[i].country;
countries.push(name);
let population = populations[i].estimate;
let popMap = map(population,0,2000000,0,200)
let error = populations[i].marginOfError;
let errorFraction =  populations[i].marginOfError / population;
let r = random(wid);
bouncers[i] = new Ball(r,popMap);
}
}
}
let x = 0;
function draw() {
let currentTime = millis()-startTime;
let currentSeconds = currentTime/1000;
fill(col);
textSize(30);
text(countries[x],wid/4,100);
background(220,30);
fill(0);
if (frameCount % 50 == 0){
if (x < bouncers.length){
x++;
}
}
for (let i = 0; i < x; i++) {
bouncers[i].move();
bouncers[i].show();
bouncers[i].color();
}
}
let populations;
let objArray = [];
let wid = window.innerWidth;
let hei = window.innerHeight;
let bouncers = [];
let gravity = 0.4;
let startTime = 0;
let countries = [];
let col = 0;
function preload() {
}
function setup() {
createCanvas(wid,hei);
loadJSON('../simpleData_noRegions.json', callback);
}
function callback(data) {
console.log('done loading data');
console.log(data);
populations = data;
if (populations) {
for (let i = 0; i < populations.length; i++) {
let name = populations[i].country;
countries.push(name);
let population = populations[i].estimate;
let popMap = map(population,0,2000000,0,200)
let error = populations[i].marginOfError;
let errorFraction =  populations[i].marginOfError / population;
let r = random(wid);
bouncers[i] = new Ball(r,popMap);
}
}
}
let x = 0;
function draw() {
let currentTime = millis()-startTime;
let currentSeconds = currentTime/1000;
fill(col);
textSize(30);
text(countries[x],wid/4,100,);
background(220,30);
fill(0);
if (frameCount % 50 == 0){
if (x < bouncers.length){
x++;
}
}
for (let i = 0; i < x; i++) {
bouncers[i].move();
bouncers[i].show();
bouncers[i].color();
}
}
let button;
let word = ["I'm","just","mad","about","Saffron","Saffron's","mad","about","me","I'm","just","mad","about","Saffron","she's","just","mad","about","me","they","call","me","mellow","yellow","they","call","me","mellow","yellow","they","call","me","mellow","yellow","I'm","just","mad","about","fourteen","fourteen's","mad","about","me","I'm","just","mad","about","fourteen","she's","just","mad","about","me","they","call","me","mellow","yellow","they","call","me","mellow","yellow","they","call","me","mellow","yellow"];
let i=0;
let counter = 0;
function setup() { 
createCanvas(400, 400);
pattern = new Lines();
background(220);
button = createButton(word[i]);
button.mousePressed(testFunc);
} 
function testFunc() {
pattern.changeState();
i = i+1;
button.remove();
button = createButton(word[i]);
button.mousePressed(testFunc);
}
function draw() { 
pattern.display();
if (i>0){
pattern.move();
}
}
let bouncers = [];
let gravity = 0.1;
function setup() {
createCanvas(400, 400);
angleMode(DEGREES);
for (let i = 0; i < 50; i++) {
bouncers[i] = new Ball((width-i),100);
}
function draw() {
background(220,70);
fill(0);
for (let i = 0; i < bouncers.length; i++) {
bouncers[i].move();
bouncers[i].show();
bouncers[i].color();
}
}
var x1 ;
var y1 ;
var x2;
var y2;
var a = 0;
var speed1x = 0;
var speed1y = 0;
var wid = window.innerWidth;
var hei = window.innerHeight;
var m = 10;
var speedm = 0.05
function setup() {
createCanvas(wid, hei);
background(0);
angleMode(DEGREES);
x1 = wid/4;	
y1 = hei/8;
}
function draw() {
translate(0, 0, 0, 0); 
stroke(255);
fill(0);
if (x1 < mouseX && y1 < mouseY) {
speed1x += 0.01;
speed1y += 0.01;
} else if (x1 > mouseX && y1 < mouseY) {
speed1x -= 0.01;
speed1y += 0.01;
} else if (x1 > mouseX && y1 > mouseY) {
speed1x -= 0.01;
speed1y -= 0.01;
} else if (x1 < mouseX && y1 > mouseY) {
speed1x += 0.01;
speed1y -= 0.01;
}
x1 += speed1x;
y1 += speed1y;
if (x1>width+20 || x1 < -20){
speed1x = - speed1x;
}
if (y1>height+20 || y1 < -20){
speed1y = - speed1y;
}
ellipse(x1, y1, 20);
translate(x1, y1, 0, 0);
x2 = m* sin(a*15);
y2 = m * cos(a*15);
stroke(255);
fill(0);
ellipse(x2, y2, 10)
a++;
wid += 0.001;
hei += 0.005;
}function setup() {
createCanvas(window.innerWidth, window.innerHeight);
}
function draw() {
background(240);
noStroke();
fill(200);
triangle(225,300,100,500,500,500);
triangle(1000,400,800,500,1500,500);
triangle(600,100,200,500,1000,500);
fill(100);
rect(350,450,500,50)
fill(255);
stroke(0);
strokeWeight(4);
ellipse(600,450,500,20);
fill(0);
strokeWeight(1);
ellipse(500,450,10);
ellipse(540,455,10);
ellipse(750,445,10);
ellipse(450,450,10);
ellipse(800,448,10);
ellipse(600,445,10);
var col = 255;
function setup() {
createCanvas(710, 400);
background(0);
for (var i=0; i<100; i++) {
bugs.push(new Jitter());
}
}
function draw() {
fill(col);
for (var j=0; j<bugs.length; j++) {
bugs[j].move();
bugs[j].display();
}
}
function Jitter() {
this.x = width/2;
this.y = 0;
this.diameter = 10;
this.speedx = random(-5,5);
this.speedy = random(8);
this.a = 255;
this.move = function() {   
this.x += random(0.5*this.speedx,2*this.speedx);
this.y += random(0.2*this.speedy,1.2*this.speedy);
this.speedx = 0.999*this.speedx;
this.speedy = 0.999*this.speedy;
};
this.display = function() {
noStroke();
this.a -= 2;
fill(col,this.a);
ellipse(this.x, this.y, this.diameter, this.diameter);
};
}var x1 ;
var y1 ;
var x2;
var y2;
var a = 0;
var speed1x = 0;
var speed1y = 0;
var wid = window.innerWidth;
var hei = window.innerHeight;
var m = 10;
var speedm = 0.05
function setup() {
createCanvas(wid, hei);
background(0);
angleMode(DEGREES);
x1 = wid/16;	
y1 = hei/8;
}
function draw() {
translate(0, 0, 0, 0); 
stroke(255);
fill(0);
if (x1 < wid/2 && y1 < hei/2) {
speed1x += 0.01;
speed1y += 0.01;
} else if (x1 > wid/2 && y1 < hei/2) {
speed1x -= 0.01;
speed1y += 0.01;
} else if (x1 > wid/2 && y1 > hei/2) {
speed1x -= 0.01;
speed1y -= 0.01;
} else if (x1 < wid/2 && y1 > hei/2) {
speed1x += 0.01;
speed1y -= 0.01;
}
x1 += speed1x;
y1 += speed1y;
if (x1>width-10 || x1 < 10){
speed1x = - speed1x;
}
if (y1>height-10 || y1 < 10){
speed1y = - speed1y;
}
ellipse(x1, y1, 20);
translate(x1, y1, 0, 0);
x2 = m* sin(a*15);
y2 = m * cos(a*15);
stroke(255);
fill(0);
ellipse(x2, y2, 10)
a++;
}var x1 ;
var y1 ;
var x2;
var y2;
var a = 0;
var speed1x = 0;
var speed1y = 0;
var wid = window.innerWidth;
var hei = window.innerHeight;
var m = 10;
var speedm = 0.01
function setup() {
createCanvas(wid, hei);
angleMode(DEGREES);
background(255);
x1 = wid/16;	
y1 = hei/8;
}
function draw() {
translate(0, 0, 0, 0); 
stroke(255);
fill(0,0,255);
if (x1 < wid/2 && y1 < hei/2) {
speed1x += speedm;
speed1y += 0.01;
} else if (x1 > wid/2 && y1 < hei/2) {
speed1x -= speedm;
speed1y += speedm;
} else if (x1 > wid/2 && y1 > hei/2) {
speed1x -= speedm;
speed1y -= speedm;
} else if (x1 < wid/2 && y1 > hei/2) {
speed1x += speedm;
speed1y -= speedm;
}
x1 += speed1x;
y1 += speed1y;
if (x1>width-10 || x1 < 10){
speed1x = - speed1x;
}
if (y1>height-10 || y1 < 10){
speed1y = - speed1y;
}
ellipse(x1, y1, 20);
translate(x1, y1, 0, 0);
x2 = 10 * sin(a * m);
y2 = 10 * cos(a * m);
stroke(0);
fill(255);
ellipse(x2, y2, 10)
a++;
}var x1 ;
var y1 ;
var x2;
var y2;
var a = 0;
var speed1x = 0;
var speed1y = 0;
var wid = window.innerWidth;
var hei = window.innerHeight;
var m = 10;
var speedm = 0.01
var r ;
var g ;
var b ;
var rSpeed;
var gSpeed;
var bSpeed;
function setup() {
createCanvas(wid, hei);
angleMode(DEGREES);
background(240);
x1 = wid/16;	
y1 = hei/8;
r = random(255);
g = random(255);
b = random(255);
rSpeed = random(5);
gSpeed = random(5);
bSpeed = random(5);
}
function draw() {
translate(0, 0, 0, 0); 
stroke(255);
fill(r,g,b);
if (x1 < wid/2 && y1 < hei/2) {
speed1x += speedm;
speed1y += 0.01;
} else if (x1 > wid/2 && y1 < hei/2) {
speed1x -= speedm;
speed1y += speedm;
} else if (x1 > wid/2 && y1 > hei/2) {
speed1x -= speedm;
speed1y -= speedm;
} else if (x1 < wid/2 && y1 > hei/2) {
speed1x += speedm;
speed1y -= speedm;
}
x1 += speed1x;
y1 += speed1y;
if (x1>width-10 || x1 < 10){
speed1x = - speed1x;
}
if (y1>height-10 || y1 < 10){
speed1y = - speed1y;
}
ellipse(x1, y1, 20);
translate(x1, y1, 0, 0);
x2 = 10 * sin(a * m);
y2 = 10 * cos(a * m);
stroke(0);
fill(255);
ellipse(x2, y2, 10)
a++;
if (r>255 || r < 0){
rSpeed = -rSpeed;
}
if (g>255 || g < 0){
gSpeed = -gSpeed;
}
if (b>255 || b < 0){
bSpeed = -bSpeed;
}
r+=rSpeed;
g+=gSpeed;
b+=bSpeed;
}var x1 = 200;
var y1 = 200;
var x2;
var y2;
var a = 0;
var speed2 = 1.8;
var speed1x;
var speed1y;
var speedm = 0.001
var m = 0.01;
var wid = window.innerWidth;
var hei = window.innerHeight;
var d;
function setup() {
createCanvas(400, 400);
angleMode(DEGREES);
background(220, 20);
}
function draw() {
if (keyIsDown(LEFT_ARROW)) {
x1 -= 5;
}
if (keyIsDown(RIGHT_ARROW)) {
x1 += 5;
}
if (keyIsDown(UP_ARROW)) {
y1 -= 5;
}
if (keyIsDown(DOWN_ARROW)) {
y1 += 5;
}
clear();
fill(255);
ellipse(x1, y1, 20);
}
var y1;
var x2;
var y2;
var a = 0;
var speed2 = 1.8;
var speed1x;
var speed1y;
var speedm = 0.001
var m = 0.01;
var wid = window.innerWidth;
var hei = window.innerHeight;
var d;
function setup() {
createCanvas(wid, hei);
x1 = width/2;
y1 = height/2;
speed1x = random([-1, 1]);
speed1y = random([-1, 1]);
angleMode(DEGREES);
background(220, 20);
}
function draw() {
translate(0, 0, 0, 0);
fill(255);
ellipse(x1, y1, 20)
x1 +=speed1x - cos(a);
y1 += speed1y + sin(a);
if (x1 < 0 || x1 > width) {
speed1x = -speed1x;
}
if (y1 < 0 || y1 > height) {
speed1y = -speed1y;
}
translate(x1, y1, 0, 0);
x2 = 10 * sin(a * 10);
y2 = 10 * cos(a * 10);
fill(200);
ellipse(x2, y2, 10)
a++;
m += speedm;
if (m<0 || m>2){
speedm = -speedm;
}
}var bg;
var img;
function preload(){
img = loadImage('finalWorld.png');
}
function setup() {
createCanvas(wid,hei);
background(img);
}
function draw() {
noStroke();
fill(random([0,255]));
ellipse(random(0,wid),random(0,hei),10);
}var bg;
var img;
function preload() {
img = loadImage('finalWorld.png');
}
function setup() {
background(img);
createCanvas(wid, hei);
for (var i=0; i<300; i++) {
bugs.push(new Jitter());
}
background(img);
}
function draw() {
for (var i=0; i<bugs.length; i++) {
bugs[i].move();
bugs[i].display();
}
}
function Jitter() {
this.x = random(width);
this.y = random(height);
this.diameter = 2;
this.speed = 1;
this.move = function() {
this.x += random(-this.speed, this.speed);
this.y += random(-this.speed, this.speed);
};
this.display = function() {
noStroke();
fill(0);
ellipse(this.x, this.y, this.diameter, this.diameter);
};
}var rect_y = 55;
var rect_h = 290;
var r = 0;
var g = 255;
var b = 0;
var wid = window.innerWidth;
var hei = window.innerHeight;
speed = 0.03;
function setup() {
createCanvas(wid,hei);
}
function draw() {
background(0);
textSize(32);
fill(255);
text('OXYGEN',400,300);
noFill();
stroke(255);
strokeWeight(4);
rect(100,50,200,300);
if (rect_y > 200 && rect_y < 250){
r = 255;
g = 255;
} else if(rect_y > 250 && rect_y < 345){
g = 0;	
} else if(rect_y > 345 ){
speed = 0 ;
}
noStroke();
fill(r,g,0);
rect(110,rect_y,180,rect_h)
rect_y += speed;
rect_h -= speed;
}var kinectron;
function setup() {
myCanvas = createCanvas(400, 400);
kinectron = new Kinectron('172.22.152.79');
kinectron.makeConnection();
kinectron.startTrackedBodies(drawBody);
}
function draw() {
}
function drawBody(body){
background(0);
for (var i = 0; i < body.joints.length; i++){
fill(100);
ellipse(body.joints[i].depthX * myCanvas.width,body.joints[i].depthY * myCanvas.height,10,10);
}
}var kinectron;
var img = createImage(width,height)
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
var x = random(width);
var y = random(height);
var z = 0;
var diameter = 30;
var speed = 10;
function setup() {
createCanvas(600, 400, WEBGL);
}
function draw() {
background(50, 89, 100);
for (var i=0; i<100; i++) {
move();
display();
}
}
function move() {
z += this.speed;
if (z > 200) {
z = 0;
}
}
function display() {
translate(x,y,z);
push();
fill(255);
sphere(10);
pop();
var length = 100
function setup() {
createCanvas(710, 400);
for (var i = 0; i < length; i++) {
bugs.push(new Jitter());
} 
}
function draw() {
background(0);
for (var i = 0; i < bugs.length; i++) {
bugs[i].move();
bugs[i].display();
}
}
function Jitter() {
this.x = random(width);
this.y = random(height);
this.diameter = random(2, 50);
this.speed = 4;
this.col = (255,0,0);
this.alpha = 100;
this.speedA = 1;
this.multi = [0.2,1.8];
this.alphaMax = 50;
this.move = function() {
this.x += random(-this.speed*random(this.multi), this.speed);
this.y += random(-this.speed, this.speed*random(this.multi));
if (this.x > width || this.x < 0) {
this.x = random(width);
}
if (this.y > height || this.y < 0) {
this.y = random(height);
}
};
this.display = function() {
if (this.alpha > this.alphaMax || this.alpha < 10) {
this.speedA = -this.speedA;
}
noStroke();
fill(255,0,0,this.alpha);
ellipse(this.x, this.y, this.diameter, this.diameter);
this.alpha += this.speedA;
if (frameCount % 100 == 0){
this.alphaMax += 2;
this.speedA += 1;
}
};
}
var x = 30;
var y = 30;
var r;
function setup() {
createCanvas(400, 400);
background(220);
}
function draw() {
fill(random([0,'blue']));
ellipse(x,y,100);
if (x>=y){
x += random([4,-4]);
}else if (y>=x){
y += random([-4,4]);
} else if ( x<0 || x> width){
x = y;
} else if (y<0||y>height){
y=x;
}
}
var video;
var sound;
var fft;
var peakDetect;
var t = 1;
function preload(){
video = createVideo('Short.mp4');
sound = loadSound('Shaman.m4a')
}
function setup() { 
createCanvas(400, 400);
background(220);
image(video,width,height);
sound.play();
fft = new p5.FFT();
peakDetect = new p5.PeakDetect(20, 20000, 0.08);
video.loop();
} 
function draw() { 
fft.analyze();
peakDetect.update(fft);
if (peakDetect.isDetected){
t = t * -1;  
}
if (frameCount % 500 == 0){
}  
video.speed(t);
}var c=[],c1=[],c2=[],c3 = [],c4 = [];
var kick;
var shaker;
var snare;
var tom;
var button1;
var button2;
var x = 75;
var bpm = 200;
function preload() {
kick = loadSound('Kick.wav');
shaker = loadSound('shaker.wav');
snare = loadSound('snare.wav');
tom = loadSound('Tom.wav');
}
function setup() {
createCanvas(600, 300);
background(255);
}
if (data.length > 0) {
var sensors = split(data, ",");
c = [int(sensors[0]),int(sensors[1]),int(sensors[2]),int(sensors[3])];
console.log(c);
if(c[0] == 1) {
kick.play();
}
if(c[1] == 1) {
shaker.play();
}
if(c[2] == 1) {
snare.play();
}
if(c[3] == 1) {
tom.play();
}
}
}
function setup() {
createCanvas( windowWidth, windowHeight )
drums = EDrums('o*o*x*o-')
follow = Follow( drums )
}
function draw() {
background( follow.getValue() * 255 )
}
var c=[],c1=[],c2=[],c3 = [],c4 = [];
var kick;
var shaker;
var snare;
var button1;
var button2;
var x = 75;
var bpm = 200;
function preload() {
kick = loadSound('Kick.wav');
shaker = loadSound('shaker.wav');
snare = loadSound('snare.wav');
}
function setup() {
createCanvas(600, 300);
background(255);
run();
}
function run() {
setTimeout(playColumn4,0);  
setTimeout(playColumn3,bpm*1);
setTimeout(playColumn2,bpm*2);
setTimeout(playColumn1,bpm*3);
}
if (data.length > 0) {
var sensors = split(data, ",");
c1 = [int(sensors[0]),0];
c2 = [int(sensors[1]),int(sensors[2])];
c3 = [int(sensors[3]),int(sensors[4])];
c4 = [int(sensors[5]),int(sensors[6])];
}
}
function playColumn1(){
if (c1[0] != 0){
kick.play();
} 
if (c1[1] != 0){
shaker.play();
}
setTimeout(playColumn1,bpm*4);   
}
function playColumn2(){
if (c2[0] != 0){
kick.play();
} 
if (c2[1] != 0){
shaker.play();
}
setTimeout(playColumn2,bpm*4);   
}
function playColumn4(){
if (c4[0] != 0){
kick.play();
} 
if (c4[1] != 0){
shaker.play();
}
setTimeout(playColumn4,bpm*4);   
}
function playColumn3(){
console.log(c3);
if (c3[0] != 0){
kick.play();
} 
if (c3[1] != 0){
shaker.play();
}
setTimeout(playColumn3,bpm*4);   
}
let a = 0;
let z = -50;
let zspeed=10;
function setup() { 
createCanvas(400, 400,WEBGL);
} 
function draw() { 
background(255,10);
ambientMaterial(5);
rotateX(a);
sphere(50);
a += 0.02;
z += zspeed;
if (z > 100 || z < -100){
zspeed = -zspeed;
}
}var red1 = ['255', '0', '0', '255'];
var blue1 = ['0', '0', '255','255'];
var green1 = ['0', '255', '0','255'];
var yellow1 = ['255', '255', '0','255'];
var img1;
var img2;
var kick;
var shaker;
var snare;
var button1;
var button2;
var x = 75;
function preload() {
img1 = loadImage('pattern1.png');
img2 = loadImage('pattern2.png');
kick = loadSound('Kick.wav');
shaker = loadSound('shaker.wav');
snare = loadSound('snare.wav');
}
function setup() {
createCanvas(600, 300);
background(255);
image(img2, 0, 0, 600, 300);
var bpm = 200;
setTimeout(run,bpm);
}
function checkColor(c){
if (c[0] < 100 && c[1] < 100 && c[2] > 220 ){
snare.play();
}else if (c[0] < 50 && c[1] > 220 && c[2] < 50 ){
shaker.play();
}else if (c[0] > 220 && c[1] > 220 && c[2] < 50 ){
kick.play();
}else{
}
}
function runColumn(){
for (let j = 150; j > 0; j -= 100){
let c = get(x,j);
checkColor(c);
}
}
function run() {
runColumn();
x = x + 150;
if (x>600){ x=75;}
setTimeout(run,bpm);   
}
if (data.length > 0) {
var sensors = split(data, ",");
console.log(sensors);
bpm = int(sensors[0]);
}
}
function draw() {
}
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
}var kinectron = null;
var lightImage;
function preload(){
lightImage = loadImage("light.jpg");
}
function setup() {
createCanvas(500, 500);
var address = {host: '172.16.219.19', port: 9001, path: '/'};
kinectron = new Kinectron('kinectron',address);
kinectron.makeConnection();
kinectron.startTrackedBodies(trackBody);
}
function draw() {
}
function trackBody(body) {
background(255);
var val = body.joints[kinectron.HANDLEFT].depthX;
var leftX =  map(val,0,1,0,width);
val = body.joints[kinectron.HANDLEFT].depthY;
var leftY = map(val,0,1,0,height);
val = body.joints[kinectron.HANDRIGHT].depthX;
var rightX = map(val,0,1,0,width);
val = body.joints[kinectron.HANDRIGHT].depthY;
var rightY = map(val,0,1,0,height);
imageMode(CORNERS);
image(lightImage,leftX,leftY,rightX,rightY);
- Turn on Sound
- Run the sketch
- Enter US state initials
- The number of chords represents
Native American tribes located in the state
- You can change states
let tribes = [];
let button;
let a = 0;
let c1 = 0;
let c2 = 0;
let c3 = 0;
let c4 = 0;
let speed1 = 1;
let speed2 = 2;
let speed3 = 1;
let speed4 = 2;
let op = false;
let col = 0;
let colSpeed = 1;
let song;
var amp;
var vol;
var fft;
var peakDetect;
let count = 0;
function setup() {
createCanvas(1080,608);
loadJSON('Tribes.json', stateCount);
stateInput = createInput('');
button = createButton('Enter');
button.mousePressed(use);
angleMode(DEGREES);
song = loadSound('Shaman.m4a');
amp = new p5.Amplitude();
fft = new p5.FFT();
peakDetect = new p5.PeakDetect(20, 20000, 0.08);
}
function stateCount(data) {
tribes = data;
}
function draw() {
background(0, 10);
translate(width/2, height/2);
vol = amp.getLevel();
fft.analyze();
peakDetect.update(fft);
if (op) {
noFill();
if (tribes.length > 0) {
a = 0;
for (let i = 0; i < tribes.length; i++) {
if (tribes[i].FIELD1 == stateInput.value()) {
a++;
}
}
}
for (let ang = 0; ang < 360; ang += (360 / a) / 2) {
rotate(ang);
stroke(0, 10);
fill(col, 10);
bezier(a, 0, c1, c2, c3, c4, 0,0);
}
c1 = c1 + speed1;
c2 = c2 + speed2;
c3 = c3 + speed3;
c4 = c4 + speed4;
if (peakDetect.isDetected) {
count++;
}
if (count % 2 == 0 || c1 < 0 || c1 > width) {
speed1 = -speed1;
}
if (count % 3 == 0 || c2 < 0 || c2 > height) {
speed2 = -speed2;
}
if (count % 5 == 0 || c3 < 0 || c3 > width) {
speed3 = -speed3;
}
if (count % 7 == 0 || c4 < 0 || c4 > height) {
speed4 = -speed4;
}
if (peakDetect.isDetected) {
col = [150, 20, 10, 70];
} else {
col = 255;
}
}
}
function use() {
op = !op
song.play();
}let shark;
let panda;
let weasel;
let x;
let y;
let a;
function preload(){
shark = loadImage('shark2.jpg');
panda = loadImage('panda1.jpg');
weasel = loadImage('weasel3.jpg');
}
function setup() { 
createCanvas(600, 400);
} 
function draw() { 
background(220);
image(shark, 20, 300, 100, 70);
image(panda, 250, 300, 100, 70);
image(weasel, 480, 300, 100, 70);
strokeWeight(5);
stroke(48, 29, 9, x);
fill(84, 53, 19, x);
ellipse(100,50,30,50);
line(100, 25, 100, 75);
strokeWeight(5);
stroke(135, 73, 9, y);
fill(209, 126, 39, y);
ellipse(250,50,60,80);
line(250, 10, 250, 90);
strokeWeight(5);
stroke(48, 29, 9, a);
fill(35, 21, 7, a);
ellipse(400,50,40,90);
line(400, 5, 400, 95);
if(mouseX>20 && mouseX<120 && mouseY>300 && mouseY< 370){
fill(220);
noStroke();
rect(250, 300, 100, 70);
rect(480, 300, 100, 70);
}
if(mouseX>250 && mouseX<350 && mouseY>300 && mouseY< 370){
fill(220);
noStroke();
rect(20, 300, 100, 70);
rect(480, 300, 100, 70);
}
if(mouseX>480 && mouseX<580 && mouseY>300 && mouseY< 370){
fill(220);
noStroke();
rect(20, 300, 100, 70);
rect(250, 300, 100, 70);
}
}
function mousePressed() {
if (mouseX>85 && mouseX<115 && mouseY>25 && mouseY<75) {
x=500;
y=0;
a=0;
}
if (mouseX>220 && mouseX<280 && mouseY>20 && mouseY<80) {
x=0;
y=500;
a=0;
}
if (mouseX>380 && mouseX<420 && mouseY>5 && mouseY<95) {
x=0;
y=0;
a=500;
}
}
- Enter state initials
- Each point on the edge represents
a Native American tribe located in the state
let tribes = [];
let button;
let a = 0;
let c1 = 0;
let c2 = 0;
let c3 = 0;
let c4 = 0;
let speed1 = 1;
let speed2 = 2;
let speed3 = 1;
let speed4 = 2;
let op = false;
let col = 0;
let colSpeed = 1;
function setup() {
createCanvas(600, 400);
loadJSON('Tribes.json', stateCount);
stateInput = createInput('');
button = createButton('Enter');
button.mousePressed(use);
angleMode(DEGREES);
}
function draw() {
background(150, 20, 10,10); 
if (op){
}
translate(300, 200);
if (op) {
inState();
display();
}
}
function stateCount(data) {
tribes = data;
}
function inState() {
noFill();
if (tribes.length > 0) {
a = 0;
for (let i = 0; i < tribes.length; i++) {
if (tribes[i].FIELD1 == stateInput.value()) {
a++;
}
}
}
}
function display(){
for (let ang = 0; ang < 360; ang +=360/a) {
rotate(ang);
stroke(col, 200);
bezier(a, 0, c1, c2, c3, c4, 0, a);
}
c1 = c1 + speed1;
c2 = c2 + speed2;
c3 = c3 + speed3;
c4 = c4 + speed4;
if (c1 < 0 || c1 > width) {
speed1 = - speed1;
speed1 = random([1.1, 0.9]) * speed1;
}
if (c2 < 0 || c2 > height) {
speed2 = - speed2;
speed2 = 0.95 * speed2
}
if (c3 < 0 || c3 > width) {
speed3 = - speed3;
speed3 = random([1.05, 0.95]) * speed3;
}
if (c4 < 0 || c4 > height) {
speed4 = -speed4;
speed4 = 1.05 * speed4
}
col = col+colSpeed;
if (col>=255||col<=0){
colSpeed=-colSpeed; 
}
}
function use() {
op = !op
}let button;
function preload(){
data = loadJSON('dinosaurs.json');
}
function setup() { 
createCanvas(400,400);
background(220);
button = createButton('Today I am a'); 
button.mousePressed(chooseDino);
}
function chooseDino(){
background(220);
textSize(15);
let i = floor(random(data.dinosaurs.length));
text(data.dinosaurs[i],150,200);
}
function draw() { 
}
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
}
var h = 30;
var bg = 0;
var switchState=1;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(bg);
fill(40);
rect(175,0, 50, h);
}
if (data.length > 0) {
var sensors = split(data, ",");
console.log(sensors);
h = int(sensors[0]);
switchState = int(sensors[1]);
if (switchState == 1){
bg = 'red';
}else{
bg = 'blue';
}
}
}
let button;
let word = ["I'm","just","mad","about","Saffron","Saffron's","mad","about","me","I'm","just","mad","about","Saffron","she's","just","mad","about","me","they","call","me","mellow","yellow","they","call","me","mellow","yellow","they","call","me","mellow","yellow","I'm","just","mad","about","fourteen","fourteen's","mad","about","me","I'm","just","mad","about","fourteen","she's","just","mad","about","me","they","call","me","mellow","yellow","they","call","me","mellow","yellow","they","call","me","mellow","yellow"];
let i=0;
let counter = 0;
function setup() { 
createCanvas(400, 400);
pattern = new Lines();
background(220);
button = createButton(word[i]);
button.mousePressed(testFunc);
} 
function testFunc() {
pattern.changeState();
i = i+1;
button.remove();
button = createButton(word[i]);
button.mousePressed(testFunc);
}
function draw() { 
pattern.display();
if (i>0){
pattern.move();
}
}
let fliks=[];
function setup() {
createCanvas(400, 400);
angleMode(DEGREES);
for (let i = 0; i < 100; i++) {
fliks[i] = new Drot();
}
}
function draw() {
background(220);
for (let i = 0; i < fliks.length; i++) {
fliks[i].color();
fliks[i].display();
}
function setup() { 
createCanvas(400, 400);
flik = new Ant();
angleMode(DEGREES);
} 
function draw() { 
background(220);
flik.display();
flik.move();
let bouncers = [];
let gravity = 0.1;
function setup() {
createCanvas(400, 400);
for (let i = 0; i < 50; i++) {
bouncers[i] = new Ball(30,random(30, 70));
}
function mouseDragged(){
bouncers.push (new Ball(mouseX,mouseY,random(50,20)));
}
function draw() {
background(220,30);
fill(0);
for (let i = 0; i < bouncers.length; i++) {
bouncers[i].move();
bouncers[i].show();
bouncers[i].color();
}
}
let rect1x = 250;
let rect2x = 250;
let rect2y = 200;
let rect1Col=255;
let rect2Col=255;
let balld = 27;
let ball1Speed = 5;
let ball2Speed= -6
let ball1x=50;
let ball2x=400;
let bally = 385;
let isErased = false;
let noRect = false;
function setup() { 
createCanvas(600, 400);
ball1Speed = ball1Speed*random([1,-1]);
ball2Speed = ball2Speed*random([1,-1]);
} 
function draw() { 
background(0,200,255);
stroke(0);
strokeWeight(4);
eat();
rectErase();
fill(rect1Col);
rect(rect1x,300,100,100);
eat();
fill(rect2Col);
rect(rect2x,rect2y,100,100);
whenItsDone(); 
ballsMove(); 
}
function eat() {
if(ball1x>235 || ball2x<365) {
if(rect2y<300) {
rect1Col=rect1Col-10; 
} else if (rect2y>=300) {
rect2Col= rect2Col-25;
}
}
}
function rectErase() {
if (rect1Col<=0){
isErased=true;
rect1x=700;
rect2y=300;
rect1Col=255;
}else if(rect2Col<=0){
rect2x=700;
}
}  
function whenItsDone() {
if (rect1x>600 && rect2x>600){
noRect = true;
}
if(!noRect) {
fill(0);
}else {
ball1Speed = 0;
ball2Speed = 0;
fill(0);
strokeWeight(1);
textSize(25);
text("People of Earth!",50,50);
textSize(17);
text("Our work here is done, now press anywhere and let us go free...",50,80);	
fill(random(255),random(255),random(255));
if (mouseIsPressed){
bally=bally-2;
}
}
}
function ballsMove() {
strokeWeight(1);
ellipse(ball1x,bally,balld);
ellipse(ball2x,bally,balld);
ball1x=ball1x+ball1Speed;
ball2x=ball2x+ball2Speed;
if (!noRect) {
if (ball1x<15 || ball1x>235) {
ball1Speed = -ball1Speed;
}
if (ball2x<365 || ball2x>585) {
ball2Speed = -ball2Speed;
} 
} else {
if (ball1x<15 || ball1x>585) {
ball1Speed = -ball1Speed;
}  
if (ball2x<15 || ball2x>585) {
ball2Speed = -ball2Speed;
}
}
}  
the height of the chamber by clicking and dragging the floor. 
let floor;
let floorHeight =0;
let y = 0;
let ballSpeed=5;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
fill(255,200,30);
floor = rect(0, mouseY, width, 30);
fill(random(255),0,random(255));
ellipse (width/2,y,20,20);
y = y + ballSpeed;
if (y > mouseY-10 || y > mouseY) {
ballSpeed = - ballSpeed;
}
if (y<0) {
ballSpeed = - ballSpeed;
} 
if (y>mouseY-5) {
textSize(15);
fill(0);
text("You are overloading the system, please stop that!",20,20)
}
let	y1 = 0;
let x2 = 400;
let	y2 = 400; 
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(0);
fill(0);
stroke(255);
line(x1,y1,x2,y2);
line(x1,y2,x2,y1);
x1 = x1 + speed;
y1 = y1 + speed;
x2 = x2 - speed;
y2 = y2 - speed;
} else {
fill(255);
}
x1 = x1-speed;
x2 = x2 +speed;
y1 = y1 - speed ;
y2 = y2 + speed;
speed = - speed+1;
} 
noStroke()
if (button1 && frameCount % 10 == 0) {
speed = speed + 2
fill(random(255),0,255);
triangle(0,0,200,200,400,0);
}
if (button1 && frameCount % 15 == 0) {
speed = speed -3;
fill(0,random(255),255);
triangle(0,0,200,200,0,400);    
}
if (button1 && frameCount % 20 == 0) {
speed= speed+4;
fill(random(255),255,0);
triangle(0,400,200,200,400,400);
}
if (button1 && frameCount % 30 == 0) {
speed=speed-5;
fill(random(255),0,255);
triangle(400,0,200,200,400,400);
}
fill(255);
ellipse(200, 200, 50, 50);
}
function mousePressed() { 
let d = dist(200, 200, mouseX, mouseY);
if (d < 25) {
button1 = true;
} else {
button1 = false;
}
and then press to enter...
let x;
let y;
let d = 100;
function setup() {
createCanvas(600, 400);
frameRate(40);
x = 300; 
y = 200;
}
function draw() {
background(0);
if (dist(mouseX, mouseY, x, y) < d/2) {
roll = true;
} else {
roll = false;
}
if (roll) {
stroke(255);
fill(random(255), random(255), random(255)); 
} else {
stroke(0);
fill(0);
}
ellipse(x,y,d);
if (mouseIsPressed && roll) {
for (x=mouseX; x<mouseX-d/10; x=x+5) {
ellipse(x,y,d);
}
d=d+100;
}
if (d>600) {
background(0);
d=100;
}
function mouseReleased() {
var currX = mouseX; 
var currY = mouseY;
currX =+ currX;
fill(30,255,255);
rect(currX, currY, 20,20);
}
}  
let ballY = 0;
let speed = 0;
let accel = 0.2;
let bouncing=false;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
ellipse(200,ballY,20,20);
function mousepress(){
bouncing = !bouncing;
}
if (bouncing) {
ballY=ballY+speed;
speed = speed+accel;
if (ballY > 395 || ballY< 0) {
speed=0.95 * (speed*-1);
}
}
}let col=0;
let ellipseCol=
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
col = map(mouseX,0,400,0,255);
background(col);
ellipse(mouseX,mouseY,50);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
}let h=66;
let s=100;
let win1b=0;
let win2b=0;
let win3b=0;
let win4b=0;
let win5b=0;
let win6b=0;
let sirenH=360;
let roof1Y=40;
let roof2Y=50;
let isParty = true;
let carCounter = 150;
let speed = 4;
function setup() { 
createCanvas(600, 400);
colorMode(HSB,360,100,100)
win1b = (round(random(0,1)))*100;
win2b = (round(random(0,1)))*100;
win3b = (round(random(0,1)))*100;
win4b = (round(random(0,1)))*100;
win5b = (round(random(0,1)))*100;
win6b = (round(random(0,1)))*100;
if (win1b==0) {
win1b=win1b+20;
}
if (win2b==0) {
win2b=win2b+20;
}
if (win3b==0) {
win3b=win3b+20;
}
if (win4b==0) {
win4b=win4b+20;
}
if (win5b==0) {
win5b=win5b+20;
}
if (win6b==0) {
win6b=win6b+20;
}
}
function draw() { 
if (carCounter < -600) {
carCounter = 150;
}
else {
carCounter = carCounter - speed;
}
background(234,80,20);
fill(100);
textSize(20);
text ("02:00 AM",500,20);
fill(140,45,20);
noStroke();
rect(0,200,600,200);
fill(346,100,39);
stroke(0);
rect(30,50,200,250);
fill(0,0,45);
rect(10,roof1Y,240,10);
fill(0,0,40);
rect(20,roof2Y,220,10);
if(isParty){
if ((frameCount % 10) ==0) {
roof1Y=roof1Y-10
}
else {
(roof1Y=40)
}
if ((frameCount % 10) ==0) {
roof2Y=roof2Y-5
}
else {
(roof2Y=50)
}
}
fill(66,100,win1b);
rect(55,210,30,50);
fill(66,100,win2b);
rect(115,210,30,50);
fill(66,100,win3b);
rect(175,210,30,50);
line(70,210,70,260);
line(55,235,85,235);
line(130,210,130,260);
line(115,235,145,235);
line(190,210,190,260);
line(175,235,205,235);
fill(66,100,win4b);
rect(55,140,30,50);
fill(66,100,win5b);
rect(115,140,30,50);
fill(66,100,win6b);
rect(175,140,30,50);
line(70,140,70,190);
line(55,165,85,165);
line(130,140,130,190);
line(115,165,145,165);
line(190,140,190,190);
line(175,165,205,165);
if (isParty){
}
else {
fill(20);
}
rect(35,70,190,50);
line(70,70,70,120);
line(130,70,130,120);
line(190,70,190,120);
line(35,80,225,80);
line(35,100,225,100);
h=h+10
if (h>360) {
h=0;
}
fill(0,0,40);
rect(0,320,600,60);
fill(66,100,100);
rect(10,348,10,5);
rect(30,348,10,5);  
rect(50,348,10,5);
rect(70,348,10,5);
rect(90,348,10,5);
rect(110,348,10,5);
rect(130,348,10,5);
rect(150,348,10,5);
rect(170,348,10,5);
rect(190,348,10,5);
rect(210,348,10,5);
rect(230,348,10,5);
rect(250,348,10,5);
rect(270,348,10,5);
rect(290,348,10,5);
rect(310,348,10,5);
rect(330,348,10,5);
rect(350,348,10,5);
rect(370,348,10,5);
rect(390,348,10,5);
rect(410,348,10,5);
rect(430,348,10,5);
rect(450,348,10,5);
rect(470,348,10,5);
rect(490,348,10,5);
rect(510,348,10,5);
rect(530,348,10,5);
rect(550,348,10,5);
rect(570,348,10,5);
rect(590,348,10,5);
if(carCounter < -230 && carCounter > -550){
isParty = false;
} else {
if(!isParty) isParty = true;
}
push();
translate(carCounter,0);
fill(268,100,82);
strokeWeight(3);
strokeCap(ROUND);
stroke(30)
rect(470,320,105,15);
strokeCap();
fill(70);
beginShape();
vertex(490,320);
vertex(515,305);
vertex(550,305);
vertex(565,320);
endShape(close);
strokeWeight(1);
line(515,305,515,320);
line(550,305,550,320);
fill(20);
ellipse(495,335,20);
ellipse(560,335,20);
fill(50,100,100);
stroke(0);
fill(100);
textSize(12);
text("NYUPD",505,330)
ellipse(469,327,6,10);
frameRate(15);
fill(sirenH,100,100);
ellipse(527,301,14,9);
if ((frameCount % 3) == 0) {
sirenH = 246
}
else {
(sirenH=360);
}
pop();
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(0,220,240)
noStroke()
fill(250,0,0)
ellipse(200,150,160,70)
fill(0,255,0)
ellipse(200,150,140,60)
fill(255)
ellipse(200,150,120,50)
fill(255,204,0)
ellipse(200,150,100,40)
fill(200,100,0)
ellipse(200,150,80,30)
fill(0)
rect(195,90,10,60)
fill(0)
ellipse(200,150,20,10)
fill(255,204,0)
arc(200,40,60,60,14,20,OPEN)
fill(0)
rect(195,184,10,57)
arc(210,65,60,60,120,PI+QUARTER_PI,OPEN)
stroke(0)
line(0,240,400,240)
noStroke()
fill(55,55,55)
quad(195,241,165,370,235,370,205,241)
ellipse(200,300,200,50)
arc(240,400,200,100,3/4*PI,3/4*PI)
}