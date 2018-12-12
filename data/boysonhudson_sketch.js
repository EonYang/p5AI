var kinectron;
var img2;
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
image(img2, 0, 0, 1280, 540);
image(img,0,0);
}
function preload() {
img2 = loadImage('pexels-photo-356830.jpg');
}
var vid_1;
var vid_2;
var vid_3;
var vid_4;
function setup() {  
vid_1=createVideo('images/sleep.mp4');
vid_2=createVideo('images/sleep_ball_bounce.mp4');
vid_3=createVideo('images/awake_1.mp4');
vid_4=createVideo('images/awake_2.mp4');
vid_1.position(0, 0);
vid_2.position(0, 0);
vid_3.position(0, 0);
vid_4.position(0, 0);
vid_1.loop();
vid_2.hide();
vid_3.hide();
vid_4.hide();
} 
function mouseClicked() {
vid_1.hide();
vid_2.show();
vid_2.play();
vid_2.onended(sayDone);
}
function sayDone(elt) {
elt.hide();
vid_3.show();
vid_3.play();
vid_3.onended(sayDone_2);
}
function sayDone_2(elt_2) {
elt_2.hide();
vid_4.show();
vid_4.loop();
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
var mic;
var analyzer;
var coef = 0.5;
var l = 300;
var branches = 1;
var steps = 6;
var angleSlider, coefSlider, lSlider, branchesSlider, stepsSlider;
function setup(){
createCanvas(800, 800);
mic = new p5.AudioIn()
mic.start();
textSize(20);
angleSlider.position(20, height-175);
coefSlider = createSlider(0, 0.75, 0.5, 0.05);
coefSlider.position(20, height-140);
lSlider = createSlider(50, 450, 300, 50);
lSlider.position(20, height-105);
branchesSlider = createSlider(1, 3, 1, 1);
branchesSlider.position(20, height-70);
stepsSlider = createSlider(1, 10, 6, 1);
stepsSlider.position(20, height-35);
}
function draw (){
background(0);
branches = branchesSlider.value();
micLevel = mic.getLevel();
var threshold = 0.1;
if (micLevel > threshold) {
fill('green');
rect(width/2, height, 50, micLevel*1000);
}
var y = map(micLevel, 0, 1, height, 0);
var ythreshold = map(threshold, 0, 1, height, 0);
noStroke();
fill(175);
rect(0, 0, 20, height);
fill(0);
rect(0, y, 20, y);
stroke(0);
line(0, ythreshold, 19, ythreshold);
angle = angleSlider.value();
coef = coefSlider.value();
l = lSlider.value();
branches = branchesSlider.value();
steps = stepsSlider.value();
stroke(0);
fill(255);
text("angle (" + round(degrees(angleSlider.value())) + ")", 165, height-155);
text("coeficient (" + coefSlider.value() + ")", 165, height-120);
text("length (" + lSlider.value() + ")", 165, height-85);
text("branches (" + branchesSlider.value() + ")", 165, height-50);
text("steps (" + stepsSlider.value() + ")", 165, height-15);
stroke(255);
translate(width/2, height);
branch(l, steps);
}
function branch(len, s) {
line(0, 0, 0, -len);
translate(0, -len);
if(s > 0) {
var bcoef = angle/branches;
for (var i = 1; i <= branches; i++) {
push();
rotate(i*bcoef);
branch(len*coef, s-1);
pop();
push();
rotate(-i*bcoef);
branch(len*coef, s-1);
pop();
}
}
}var inputBox;
var inputButton;
var celsius;
var fahrenheit;
var h = 0;
var t = 0;
var celsiusP;
var fahrenheitP;
var bg;
function preload() {
bg = loadImage('temp-meter-bg.png');
}
function inputWasInput() {
var city = inputBox.value();
t=0;
}
function jsonLoaded(newdata) {
console.log(newdata);
celsius = newdata.main.temp;
fahrenheit = celsius * 9/5 + 32
}
function setup() {
createCanvas(400, 400);
inputButton = createButton('load');
inputButton.mouseClicked(inputWasInput);
inputButton.position(150, 10);
inputBox = createInput('New York');
inputBox.position(10, 10);
celsiusP = createP(celsius + '&#x2103;');
celsiusP.position(240, 290);
fahrenheitP = createP(fahrenheit + '&#8457;');
fahrenheitP.position(240, 310);
}
function draw() {
image(bg, 0, 0);
h = map(celsius, -10, 100, 60, 300);
fill('#ff6000');
noStroke();
rect(192, 300, 16, t);
if (t >= -h) {
t--;
}
celsiusP.position(240, 290+t);
fahrenheitP.position(240, 310+t);
}
var inputBox;
var inputButton;
var xdir = 0;
var x = 0;
function inputWasInput() {
var city = inputBox.value();
}
function jsonNotLoaded(er) {
console.log(er);
}
function jsonLoaded(newdata) {
console.log(newdata);
xdir = newdata.wind.speed;
}
function setup() { 
createCanvas(400, 400);
inputButton = createButton('load');
inputButton.mouseClicked(inputWasInput);
inputButton.position(150, 10);
inputBox = createInput('New York');
inputBox.position(10, 10);  
} 
function draw() { 
background(220);
ellipse(x, 100, 50, 50);
x = x + xdir;
if (x > width) { x = 0; }
}
to your project folder and include it in 
your index.html.
app open.
Make sure you only have one program accessing
For a full tutorial:
var portName = '/dev/cu.usbmodem1421';
var bg = 0;
var col = 255;
var button = 1;
function setup() { 
createCanvas(400, 400);
Whenever data is received, the parseData()
function defined below will run.
} 
function draw() { 
background(bg);
if (button == 0){
noStroke();
fill(col);
ellipse(200,200,100);
}
}
function gotData(){
parseData() will run every time data
strings until p5 receives a carriage return
statement below filters these out and only
updates our variables when we receive a
complete batch of data - in our case, the
three sensor values. Uncomment the else
statement at the bottom to see how often
if (inData.length > 0){
Here I'm using the native js version of split.
Below that you can see the p5 version 
of split, which is commented out.
var values = inData.split(',');
Once we split the received data into
individual values, we still need to convert
them from strings to integers.
button = int(values[0]);
bg = int(map(values[1], 0, 1023, 0, 255));
col = int(map(values[2], 0, 1023, 0, 255));
}
}var button1;
var button2;
var button3;
var emojiBalls = [];
var img1;
var img2;
var img3;
function preload() {
img1 = loadImage('images/thumb-up.png');
img2 = loadImage('images/heart.png');
img3 = loadImage('images/rolling-eyes.png');
}
function setup() { 
createCanvas(600, 600);
imageMode(CENTER);
button1 = select('.button1');
button1.style("background","url(images/thumb-up.png) left top no-repeat");
button1.style("text-indent","-9999px");
button1.style("background-size","40px 40px");
button2 = select('.button2');
button2.style("background","url(images/heart.png) left top no-repeat");
button2.style("text-indent","-9999px");
button2.style("background-size","40px 40px");
button3 = select('.button3');
button3.style("background","url(images/rolling-eyes.png) left top no-repeat");
button3.style("text-indent","-9999px");
button3.style("background-size","40px 40px");
button1.mousePressed(emoji(img1));
button2.mousePressed(emoji(img2));
button3.mousePressed(emoji(img3));
} 
function draw() { 
background('#ececec');
if (emojiBalls.length > 0) {
for (var i = 0; i < emojiBalls.length; i++) {
emojiBalls[i].display();
emojiBalls[i].move();
if (emojiBalls[i].x < 0) {
emojiBalls.splice(i, 1);
}
}
}
}
function emoji (img) {
emojiBalls.push(new Emoji(img));
}
var button1;
var button2;
var button3;
var emojiBalls = [];
var img1;
var img2;
var img3;
function preload() {
img1 = loadImage('images/thumb-up.png');
img2 = loadImage('images/heart.png');
img3 = loadImage('images/rolling-eyes.png');
}
function setup() { 
createCanvas(600, 600);
imageMode(CENTER);
button1 = select('.button1');
button1.style("background","url(images/thumb-up.png) left top no-repeat");
button1.style("text-indent","-9999px");
button1.style("background-size","40px 40px");
button2 = select('.button2');
button2.style("background","url(images/heart.png) left top no-repeat");
button2.style("text-indent","-9999px");
button2.style("background-size","40px 40px");
button3 = select('.button3');
button3.style("background","url(images/rolling-eyes.png) left top no-repeat");
button3.style("text-indent","-9999px");
button3.style("background-size","40px 40px");
button1.mousePressed(emoji1);
button2.mousePressed(emoji2);
button3.mousePressed(emoji3);
} 
function draw() { 
background('#ececec');
if (emojiBalls.length > 0) {
for (var i = 0; i < emojiBalls.length; i++) {
emojiBalls[i].display();
emojiBalls[i].move();
if (emojiBalls[i].x < 0) {
emojiBalls.splice(i, 1);
}
}
}
}
function emoji1 () {
emojiBalls.push(new Emoji(img1));
}
function emoji2 () {
emojiBalls.push(new Emoji(img2));
}
function emoji3 () {
emojiBalls.push(new Emoji(img3));
var button1;
var button2;
var button3;
var emojiBalls = [];
var emojiNum = 0;
var img1;
var img2;
var img3;
function preload() {
img1 = loadImage('images/thumb-up.png');
img2 = loadImage('images/heart.png');
img3 = loadImage('images/rolling-eyes.png');
}
function setup() { 
createCanvas(600, 600);
imageMode(CENTER);
button1 = new Button(250, 540, 40, 40, img1);
button2 = new Button(300, 540, 40, 40, img2);
button3 = new Button(350, 540, 40, 40, img3);
} 
function draw() { 
background('#ececec');
button1.display();
button2.display();
button3.display();
if (emojiBalls.length > 0) {
for (var i = 0; i < emojiBalls.length; i++) {
emojiBalls[i].display();
emojiBalls[i].move();
if (emojiBalls[i].x < 0) {
emojiBalls.splice(i, 1);
}
}
}
}
function mouseClicked () {
if ((mouseX > button1.x-button1.sizeWidth/2) && (mouseX < button1.x + button1.sizeWidth/2) && (mouseY > button1.y-button1.sizeHeight/2) && (mouseY < button1.y + button1.sizeHeight/2)){
emojiNum++;
emojiBalls.push(new Emoji(img1));
}
else if ((mouseX > button2.x-button2.sizeWidth/2) && (mouseX < button2.x + button2.sizeWidth/2) && (mouseY > button2.y-button2.sizeHeight/2) && (mouseY < button2.y + button2.sizeHeight/2)){
emojiNum++;
emojiBalls.push(new Emoji(img2));
}
else if ((mouseX > button3.x-button3.sizeWidth/2) && (mouseX < button3.x + button3.sizeWidth/2) && (mouseY > button3.y-button3.sizeHeight/2) && (mouseY < button3.y + button3.sizeHeight/2)){
emojiNum++;
emojiBalls.push(new Emoji(img3));
}
}
var button1;
var button2;
var button3;
var emojiBalls = [];
var emojiNum = 0;
function setup() { 
createCanvas(600, 600);
button1 = new Button(230, 540, 40, 40, '#00a2ff', '#26b0ff', '#0089d7');
button2 = new Button(280, 540, 40, 40, '#ffb400', '#ffc029', '#e5a200');
button3 = new Button(330, 540, 40, 40, '#2ad466', '#4de181', '#21b154');
} 
function draw() { 
background(220);
button1.display();
button2.display();
button3.display();
if (emojiBalls.length > 0) {
for (var i = 0; i < emojiBalls.length; i++) {
emojiBalls[i].display();
emojiBalls[i].move();
if (emojiBalls[i].x < 0) {
emojiBalls.splice(i, 1);
}
}
}
}
function mouseClicked () {
if ((mouseX > button1.x) && (mouseX < button1.x + button1.sizeWidth) && (mouseY > button1.y) && (mouseY < button1.y + button1.sizeHeight)){
emojiNum++;
emojiBalls.push(new Emoji(button1.originalColor));
}
else if ((mouseX > button2.x) && (mouseX < button2.x + button2.sizeWidth) && (mouseY > button2.y) && (mouseY < button2.y + button2.sizeHeight)){
emojiNum++;
emojiBalls.push(new Emoji(button2.originalColor));
}
else if ((mouseX > button3.x) && (mouseX < button3.x + button3.sizeWidth) && (mouseY > button3.y) && (mouseY < button3.y + button3.sizeHeight)){
emojiNum++;
emojiBalls.push(new Emoji(button3.originalColor));
}
}
var stoneWidth, stoneHeight;
function setup() { 
createCanvas(600, 600);
background('#ececec');
frameRate(24);
}
function draw() { 
var w1 = 296;
var w2 = 398;
stoneWidth = 160;
stoneHeight = 540;
noStroke();
clear();
w1 = w1 + random(-20, 20);
w2 = w2 + random(-20, 20);
fill('#dbdbdb');
quad(0, w1, width, w2, width, height, 0, height);
fill('#bbbbbb');
beginShape();
curveVertex(262, 438);
curveVertex(338, 410);
curveVertex(372, 426);
curveVertex(356, 438);
curveVertex(286, 450);
endShape(CLOSE);
fill('#bbbbbb');
beginShape();
curveVertex(422, 298);
curveVertex(462, 300);
curveVertex(436, 304);
endShape(CLOSE);
fill('#04abfc');
beginShape();
curveVertex(208, 198);
curveVertex(244, 176);
curveVertex(312, 206);
curveVertex(368, 394);
curveVertex(336, 438);
curveVertex(264, 420);
endShape(CLOSE);
fill('#17e65d');
beginShape();
curveVertex(428, 258);
curveVertex(462, 260);
curveVertex(460, 296);
curveVertex(428, 296);
curveVertex(410, 278);
endShape(CLOSE);
fill('#ffffff');
ellipse(width/2-50, height/2-40, 36, 36);
ellipse(width/2, height/2-40, 36, 36);
ellipse(434, 274, 12, 12);
ellipse(456, 274, 12, 12);
eyeBalls();
}
function eyeBalls() {
xcLeft1 = constrain(mouseX, width/2-50-8, width/2-50+8);
xcRight1 = constrain(mouseX, width/2-8, width/2+8);
xcLeft2 = constrain(mouseX, 434-2, 434+2);
xcRight2 = constrain(mouseX, 456-2, 456+2);
yc1 = constrain(mouseY, height/2-40-8, height/2-40+8);
yc2 = constrain(mouseY, 274-2, 274+2);
fill('#000000');
ellipse(xcLeft1, yc1, 16, 16);
ellipse(xcRight1, yc1, 16, 16);
ellipse(xcLeft2, yc2, 4, 4);
ellipse(xcRight2, yc2, 4, 4);
}var ballVec = [];
var lineVec = [];
var ballNum = 5;
var lineCol;
var cnt = 0;
var button1 = {
x1: 200-55,
y1: 320,
w1: 50,
h1: 50,
}
var button2 = {
x2: 200+5,
y2: 320,
w2: 50,
h2: 50 
}
function setup() { 
createCanvas(400, 400);
for(var i = 0; i < ballNum; i++){
ballVec.push(new Ball());
}
} 
function draw() { 
background('#ececec');
if(frameCount%30 == 1){
lineVec = [];
for(var i = 0; i < ballNum; i++){
if(i == 1){
lineCol = color(random(0,255), random(0,255), random(0,255), random(20,100));
lineVec.push(lineCol);
}
else if(i > 1){
lineCol = color(random(0,255), random(0,255), random(0,255), random(20,100));
lineVec.push(lineCol);
lineCol = color(random(0,255), random(0,255), random(0,255), random(20,100));
lineVec.push(lineCol);
}
}
ballVec.shift();
ballVec.push(new Ball());
}
cnt = 0;
for(var i = 0; i < ballNum; i++){
if(i == 1){
stroke(lineVec[cnt]);
cnt++;
line(ballVec[i-1].posX, ballVec[i-1].posY, ballVec[i].posX, ballVec[i].posY); 
}
else if(i > 1){
stroke(lineVec[cnt]);
cnt++;
line(ballVec[i-1].posX, ballVec[i-1].posY, ballVec[i].posX, ballVec[i].posY);
stroke(lineVec[cnt]);
cnt++
line(ballVec[i-2].posX, ballVec[i-2].posY, ballVec[i].posX, ballVec[i].posY);
}
}
ellipseMode(CENTER);
for(var i = 0; i < ballNum; i++){  
stroke(ballVec[i].col);
ballVec[i].draw();
}
ellipseMode(CORNER);
((mouseX > button2.x2) && (mouseX < button2.x2 + button2.w2) && (mouseY > button2.y2) && (mouseY < button2.y2 + button2.h2))) &&
!mouseIsPressed) {
fill('#90c8f7');
} 
else if ((((mouseX > button1.x1) && (mouseX < button1.x1 + button1.w1) && (mouseY > button1.y1) && (mouseY < button1.y1 + button1.h1)) ||
((mouseX > button2.x2) && (mouseX < button2.x2 + button2.w2) && (mouseY > button2.y2) && (mouseY < button2.y2 + button2.h2))) &&
mouseIsPressed) {
fill('#cecece');
} else {
fill('#ffffff');
if (((mouseX > button1.x1) && (mouseX < button1.x1 + button1.w1) && (mouseY > button1.y1) && (mouseY < button1.y1 + button1.h1)) &&
!mouseIsPressed){
noStroke();
fill('#00a2ff');
ellipse(button1.x1, button1.y1, button1.w1, button1.h1);
fill('#ffffff');
rect(button1.x1+23, button1.y1+10, 4, 30);
rect(button1.x1+10, button1.y1+23, 30, 4);
}
else if(((mouseX > button1.x1) && (mouseX < button1.x1 + button1.w1) && (mouseY > button1.y1) && (mouseY < button1.y1 + button1.h1)) &&
mouseIsPressed){
noStroke();
fill('#cecece');
ellipse(button1.x1, button1.y1, button1.w1, button1.h1);
fill('#ffffff');
rect(button1.x1+23, button1.y1+10, 4, 30);
rect(button1.x1+10, button1.y1+23, 30, 4);
}
else{
noStroke();
fill('#ffffff');
ellipse(button1.x1, button1.y1, button1.w1, button1.h1);
fill('#333333');
rect(button1.x1+23, button1.y1+10, 4, 30);
rect(button1.x1+10, button1.y1+23, 30, 4);
}
if(((mouseX > button2.x2) && (mouseX < button2.x2 + button2.w2) && (mouseY > button2.y2) && (mouseY < button2.y2 + button2.h2)) &&
!mouseIsPressed){
noStroke();
fill('#ffb400');
ellipse(button2.x2, button2.y2, button2.w2, button2.h2);
fill('#ffffff');
rect(button2.x2+10, button2.y2+23, 30, 4);
}
else if(((mouseX > button2.x2) && (mouseX < button2.x2 + button2.w2) && (mouseY > button2.y2) && (mouseY < button2.y2 + button2.h2)) &&
mouseIsPressed){
noStroke();
fill('#cecece');
ellipse(button2.x2, button2.y2, button2.w2, button2.h2);
fill('#ffffff');
rect(button2.x2+10, button2.y2+23, 30, 4);
}
else{
noStroke();
fill('#ffffff');
ellipse(button2.x2, button2.y2, button2.w2, button2.h2);
fill('#333333');
rect(button2.x2+10, button2.y2+23, 30, 4);    
}
}
function Ball(){
this.posX = random(0,width);
this.posY = random(0,height);
this.dia = random(10,30);
this.col = color(random(0,255), random(0,255), random(0,255));
this.draw = function(){
fill(this.col);
ellipse(this.posX, this.posY, this.dia, this.dia);
}
}
function mousePressed(){
if ((mouseX > button1.x1) && (mouseX < button1.x1 + button1.w1) && (mouseY > button1.y1) && (mouseY < button1.y1 + button1.h1)){
ballNum++;
ballVec.push(new Ball());
lineCol = color(random(0,255), random(0,255), random(0,255), random(20,100));
lineVec.push(lineCol);
lineCol = color(random(0,255), random(0,255), random(0,255), random(20,100));
lineVec.push(lineCol);
}
if((mouseX > button2.x2) && (mouseX < button2.x2 + button2.w2) && (mouseY > button2.y2) && (mouseY < button2.y2 + button2.h2)){
ballNum--;
ballVec.pop();
lineVec.pop();
lineVec.pop();
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
}var ball = {
x: 0,
y: 0,
d: 0,
xspeed: 10,
yspeed: 10
};
function setup() { 
createCanvas(400, 400);
ball.x = random(0, width),
ball.y = random(0, height),
ball.d = random(10, 30)
} 
function draw() { 
background(220);
ellipse(ball.x, ball.y, ball.d);
ball.x = ball.x + ball.xspeed;
ball.y += ball.yspeed;
if (ball.x > width || ball.x < 0) {
ball.xspeed = ball.xspeed * -1;
}
if (ball.y > height || ball.y < 0) {
ball.yspeed = ball.yspeed * -1;
}
}var stoneWidth, stoneHeight, xm, xc, ym, yc;
function setup() { 
createCanvas(600, 600);
background('#ececec');
frameRate(24);
}
function draw() { 
var w1 = 296;
var w2 = 398;
stoneWidth = 160;
stoneHeight = 540;
xm = mouseX;
ym = mouseY;
xcLeft1 = constrain(mouseX, width/2-50-8, width/2-50+8);
xcRight1 = constrain(mouseX, width/2-8, width/2+8);
xcLeft2 = constrain(mouseX, 434-2, 434+2);
xcRight2 = constrain(mouseX, 456-2, 456+2);
yc1 = constrain(mouseY, height/2-40-8, height/2-40+8);
yc2 = constrain(mouseY, 274-2, 274+2);
noStroke();
clear();
w1 = w1 + random(-20, 20);
w2 = w2 + random(-20, 20);
fill('#dbdbdb');
quad(0, w1, width, w2, width, height, 0, height);
fill('#bbbbbb');
beginShape();
curveVertex(262, 438);
curveVertex(338, 410);
curveVertex(372, 426);
curveVertex(356, 438);
curveVertex(286, 450);
endShape(CLOSE);
fill('#bbbbbb');
beginShape();
curveVertex(422, 298);
curveVertex(462, 300);
curveVertex(436, 304);
endShape(CLOSE);
fill('#04abfc');
beginShape();
curveVertex(208, 198);
curveVertex(244, 176);
curveVertex(312, 206);
curveVertex(368, 394);
curveVertex(336, 438);
curveVertex(264, 420);
endShape(CLOSE);
fill('#17e65d');
beginShape();
curveVertex(428, 258);
curveVertex(462, 260);
curveVertex(460, 296);
curveVertex(428, 296);
curveVertex(410, 278);
endShape(CLOSE);
fill('#ffffff');
ellipse(width/2-50, height/2-40, 36, 36);
ellipse(width/2, height/2-40, 36, 36);
ellipse(434, 274, 12, 12);
ellipse(456, 274, 12, 12);
fill('#000000');
ellipse(xcLeft1, yc1, 16, 16);
ellipse(xcRight1, yc1, 16, 16);
ellipse(xcLeft2, yc2, 4, 4);
ellipse(xcRight2, yc2, 4, 4);
}
var r, s;  
function setup() { 
createCanvas(600, 600);
r = '#f72b3a'; 
s = 4;
noFill();
stroke(color(r));
strokeWeight(s);
strokeJoin(ROUND);
}
function draw() { 
x = mouseX;
y = mouseY;
clear();
triangle(x, y, width/3*2+50, height/2+60, width/3-60, height/2+30);
triangle(x, y, width/3*2, height/2+20, width/3, height/2);
quad(width/3, height/2, width/3*2, height/2+20, width/3*2+50, height/2+60, width/3-60, height/2+30);
}var r, s;  
function setup() { 
createCanvas(800, 480);
r = '#f72b3a'; 
s = 4;
noFill();
stroke(color(r));
strokeWeight(s);
strokeJoin(ROUND);
}
function draw() { 
x = mouseX/2;
y = mouseY/2;
clear();
quad(52, 172, 126+x, 208+y, 126, 338, 52, 300);
quad(52, 172, 176, 154, 248, 192, 126+x, 208+y);
quad(126+x, 208+y, 248, 192, 248, 320, 126, 338);
quad(176, 154, 248, 192, 248, 320, 176, 282);
quad(52, 300, 176, 282, 248, 320, 126, 338);
triangle(408+x, 126+y, 458, 344, 310, 332);
triangle(408+x, 126+y, 496, 302, 366, 292);
quad(366, 292, 496, 302, 458, 344, 310, 332);
quad(620+x, 148+y, 668+x, 122+y, 586, 234, 540, 264);
quad(620+x, 148+y, 668+x, 122+y, 746, 328, 698, 356);
quad(540, 264, 586, 234, 746, 328, 698, 356);
}var r, s;  
function setup() { 
createCanvas(800, 480);
background('#ececec');
r = '#f72b3a'; 
s = 4;
noFill();
stroke(color(r));
strokeWeight(s);
strokeJoin(ROUND);
frameRate(24);
p1= random(0, width);
p2= random(0, height);
p3= p1+50;
p4= p2+50;
p5= random(0, width);
p6=	random(0, height);
p7=	p5+random(0, width);
p8= p6+random(0, height);
}
function draw() { 
clear();
quad(random(p1, width)+1, p2, p3, p4, p5, p6, p7, p8);
}function setup() { 
createCanvas(400, 400);
x = random(0, width);
y = random(0, height)
} 
function draw() { 
background(220);
rect(x, y, 20, 50);
x++;
y++;
}function setup() { 
createCanvas(800, 480);
background('#ececec');
r = color('#f72b3a');
s = 4;
noFill();
stroke(r);
strokeWeight(s);
strokeJoin(ROUND);
quad(52, 172, 126, 208, 126, 338, 52, 300);
quad(52, 172, 176, 154, 248, 192, 126, 208);
quad(126, 208, 248, 192, 248, 320, 126, 338);
quad(176, 154, 248, 192, 248, 320, 176, 282);
quad(52, 300, 176, 282, 248, 320, 126, 338);
noFill();
stroke(r);
strokeWeight(s);
strokeJoin(ROUND);
triangle(408, 126, 458, 344, 310, 332);
triangle(408, 126, 496, 302, 366, 292);
quad(366, 292, 496, 302, 458, 344, 310, 332);
noFill();
stroke(r);
strokeWeight(s);
strokeJoin(ROUND);
quad(620, 148, 668, 122, 586, 234, 540, 264);
quad(620, 148, 668, 122, 746, 328, 698, 356);
quad(540, 264, 586, 234, 746, 328, 698, 356);
} function setup() {
createCanvas(600, 600);
background('#ffffff');
g = color('#6cb244');
s = 10;
noFill();
stroke(g);
strokeWeight(s);
rect(150, 400, 300, 60, 45);
stroke(g);
strokeWeight(s);
rect(150, 340, 300, 30, 45);
stroke(g);
strokeWeight(s);
arc(150, 290, 40, 40, 0, -30);
stroke(g);
strokeWeight(s);
arc(190, 290, 40, 40, PI, PI);
stroke(g);
strokeWeight(s);
arc(230, 290, 40, 40, QUARTER_PI, PI);
stroke(g);
strokeWeight(s);
arc(270, 290, 40, 40, PI, PI);
stroke(g);
strokeWeight(s);
arc(310, 290, 40, 40, QUARTER_PI, PI);
stroke(g);
strokeWeight(s);
arc(350, 290, 40, 40, PI, PI);
stroke(g);
strokeWeight(s);
arc(390, 290, 40, 40, QUARTER_PI, PI);
stroke(g);
strokeWeight(s);
arc(430, 290, 40, 40, PI, PI);
stroke(g);
strokeWeight(s);
arc(470, 290, 40, 40, QUARTER_PI, PI);
stroke(g);
strokeWeight(s);
arc(300, 240, 300, 240, PI, PI);
stroke(g);
strokeWeight(s);
line(150, 240, 450, 240);
} 