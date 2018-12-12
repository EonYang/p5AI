var ctx;
function setup() { 
c = createCanvas(400, 400);
ctx = c.drawingContext;
} 
function draw() { 
background(220);
drawIndicator();
drawGradient();
}
function drawGradient(i){
push();
translate(width / 2, height / 2);
var gradX=400*cos(radians(90+15*i*(-1)));
var gradY=400*sin(radians(90+15*i*(-1)));
var gradient = ctx.createRadialGradient(0, 0, 400, gradX, gradY, 0);
gradient.addColorStop(0, "black");
gradient.addColorStop(1, "orange");
ctx.fillStyle = gradient;
ellipse(0, 0, 800, 800);
rotate(radians(180 + i * (-1) * 15));
scale(2);
colorMode(HSL);
stroke(360, 100, frameCount % 360, 1);
strokeWeight(1);
line(0, 0, 0, -180);
pop();
}
function drawIndicator(i) {
push();
translate(width / 2, height / 2);
rotate(radians(180 + i * (-1) * 15));
scale(2);
colorMode(HSL);
h = 0;
s = 0;
l = 70;
noFill();
stroke(h, s, l);
strokeWeight(1);
stroke(360, 100, frameCount % 360, 1);
strokeWeight(2);
line(0, 0, 0, -150);
var cnv;
var data, previousSendValue, currentSendValue;
var buttonReleasedAction = false;
var buttonPressedAction = false;
var buttonAllowed = true;
var button;
var countingStart, countingStop, showImgStop;
var countingTime = 7000;
var showImg = false;
var showImgStart, showImgStop;
var imgShown;
var showImgTime = 4000;
var loadingBarWidth, loadingPercentage, rectWidth;
var waitText, waitTextLine;
var ip, img;
var snapShots = [];
function preload(){
waitText = loadStrings("wait.txt");
waitTextLine = int(random(0,16));
}
function setup() {
cnv = createCanvas(1024, 703);
cnv.id("mycanvas");
rectMode(CENTER);
textAlign(CENTER,CENTER);
loadingBarWidth = 4 * width/5;
img = createCapture(VIDEO);
}
function draw() { 
if(showImg && millis() >= showImgStart){
imgShown = image(snapShots[snapShots.length-1], -(height*width/height - width)/2, 0, height*width/height, height);
console.log(showImgStop);
console.log(millis());
if (millis() >= showImgStop -100) {
showImg = false;
console.log(showImg);
img = createCapture(VIDEO);
}
} else if( !showImg ){
image(img, -(height*width/height - width)/2, 0, height*width/height, height);  
console.log(0);
}
if (buttonPressedAction){
background(0);
fill(255);
textSize(32);
rectWidth = loadingBarWidth - (countingStop-millis())/countingTime * loadingBarWidth;
rect( width/2, height/2 + 20, rectWidth, 5);
loadingPercentage = int(map(rectWidth,0, loadingBarWidth, 0, 100)) + 1;
waitTextLine = int(random(0,16));
waitTextShown();
waitTextShown();
buttonPressedAction = false;
loadingPercentage = 0;
buttonAllowed = true;
showImg = true;
showImgStart = millis();
showImgStop = showImgStart + showImgTime;
console.log(showImgStop);
waitPercentageShown();
}
}
}
}
function mousePressed(){
if(buttonAllowed){
buttonPressedAction = true;
countingStart = millis();
countingStop = countingStart + countingTime;
snapShots.push(img.get());
save('camerobot');
}
}
function waitTextShown(){
text(waitText[waitTextLine], width/2, height/2 - 20);
}
function waitPercentageShown(){
text(loadingPercentage + "%", width/2, height/2 - 20);
}
for (var i = 0; i < portList.length; i++) {}}
previousSendValue = currentSendValue;
currentSendValue = parseInt(data);
if((currentSendValue - previousSendValue) == 1 && buttonAllowed){
buttonPressedAction = true;
countingStart = millis();
countingStop = countingStart + countingTime;
snapShots.push(img.get());
save();
var canvas = document.getElementById('mycanvas');
var dataURL = canvas.toDataURL("image/png");
console.log(dataURL);
imageSaved = new Image();
imageSaved.src = dataURL;
}
}
function serverConnected() {console.log('connected to server.');}
var cnv;
var data, previousSendValue, currentSendValue;
var buttonReleasedAction = false;
var buttonPressedAction = false;
var buttonAllowed = true;
var button;
var countingStart, countingStop, showImgStop;
var countingTime = 2000;
var showImg = false;
var showImgStart, showImgStop;
var imgShown;
var showImgTime = 2000;
var loadingBarWidth, loadingPercentage, rectWidth;
var waitText, waitTextLine;
var ip, img;
var snapShots = [];
function preload(){
waitText = loadStrings("wait.txt");
waitTextLine = int(random(0,16));
}
function setup() {
cnv = createCanvas(1024, 703);
cnv.id("mycanvas");
rectMode(CENTER);
textAlign(CENTER,CENTER);
loadingBarWidth = 4 * width/5;
img = createCapture(VIDEO);
}
function draw() { 
if(showImg && millis() >= showImgStart){
imgShown = image(snapShots[snapShots.length-1], -(height*width/height - width)/2, 0, height*width/height, height);
console.log(showImgStop);
console.log(millis());
if (millis() >= showImgStop -100) {
showImg = false;
console.log(showImg);
img = createCapture(VIDEO);
}
} else if( !showImg ){
image(img, -(height*width/height - width)/2, 0, height*width/height, height);  
console.log(0);
}
if (buttonPressedAction){
background(0);
fill(255);
textSize(32);
rectWidth = loadingBarWidth - (countingStop-millis())/countingTime * loadingBarWidth;
rect( width/2, height/2 + 20, rectWidth, 5);
loadingPercentage = int(map(rectWidth,0, loadingBarWidth, 0, 100)) + 1;
waitTextLine = int(random(0,16));
waitTextShown();
waitTextShown();
buttonPressedAction = false;
loadingPercentage = 0;
buttonAllowed = true;
showImg = true;
showImgStart = millis();
showImgStop = showImgStart + showImgTime;
console.log(showImgStop);
waitPercentageShown();
}
}
}
}
function mousePressed(){
buttonPressedAction = true;
countingStart = millis();
countingStop = countingStart + countingTime;
snapShots.push(img.get());
save('camerobot');
}
function waitTextShown(){
text(waitText[waitTextLine], width/2, height/2 - 20);
}
function waitPercentageShown(){
text(loadingPercentage + "%", width/2, height/2 - 20);
}
for (var i = 0; i < portList.length; i++) {}}
previousSendValue = currentSendValue;
currentSendValue = parseInt(data);
if((currentSendValue - previousSendValue) == 1 && buttonAllowed){
buttonPressedAction = true;
countingStart = millis();
countingStop = countingStart + countingTime;
snapShots.push(img.get());
save();
var canvas = document.getElementById('mycanvas');
var dataURL = canvas.toDataURL("image/png");
console.log(dataURL);
imageSaved = new Image();
imageSaved.src = dataURL;
}
}
function serverConnected() {console.log('connected to server.');}
var canvas;
var ctx;
var i= 24;
var ipt;
var timeTest;
function setup() {
ipt=createInput();
var canvas = createCanvas(windowWidth, windowHeight);
ctx = canvas.drawingContext;
noStroke();
}
function draw() {
timeTest=ipt.value();
push();
translate(width / 2, height / 2);
var gradX=400*cos(radians(90+15*timeTest*(-1)))-100;
var gradY=400*sin(radians(90+15*timeTest*(-1)))-100;
var gradient = ctx.createRadialGradient(0, 0, 200, gradX, gradY, 0);
gradient.addColorStop(0, "black");
gradient.addColorStop(1, "orange");
ctx.fillStyle = gradient;
ellipse(0, 0, 400, 400);
pop();
}var canvas;
var ctx;
function setup() {
canvas = createCanvas(200, 200);
ctx = canvas.drawingContext;
noStroke();
}
function draw() {
background(0,3);
push();
translate(width / 2, height / 2);
var gradX = mouseX - width / 2;
var gradY = mouseY - height / 2;
var gradient = ctx.createRadialGradient(0, 0, 50, gradX, gradY, 0);
gradient.addColorStop(0, "black");
gradient.addColorStop(1, "white");
ctx.fillStyle = gradient;
ellipse(0, 0, 100, 100);
pop();
}let x1;
let y1;
let h;
let s;
let l;
let ipt;
function setup() { 
createCanvas(400, 400);
x1 = 0;
y1 = 0;
} 
function draw() { 
background(0, 95);
push();
translate(width / 2, height / 2);
rotate(radians(frameCount%360)));
scale(2);
colorMode(HSL);
fill(47,100,70,0.04);
noStroke();
ellipse(x1,y1,50);
h = 0;
s = 0;
l = 70;
noFill();
stroke(h, s, l);
triangle(x1,y1,-80,80,60,80);
stroke(255);
line(x1,y1,x2,y2);
strokeWeight(1);
fill(360,100,100,random(0.5,0.95));
stroke(360, 100, frameCount % 360, 1);
strokeWeight(2);
line(0, 0, frameCount%360, -150);
x1 = x1 + random(-2, 2);
y1 = y1 + random(-2, 2);
pop();
}var kinectron = null;
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
var img; 
function setup() { 
createCanvas(400, 400);
loadI();
} 
function loadI() {
if (img) {
}
setTimeout(loadI, 3000);
}
function draw() { 
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
var videoScale = 16;
var cols, rows;
function setup() {
createCanvas(640, 480);
cols = width/videoScale;
rows = height/videoScale;
pixelDensity(1);
video = createCapture(VIDEO);
video.size(cols, rows);
}
function mousePressed() {
}
function draw() {
background(0);
video.loadPixels();
for (var i = 0; i < cols; i++) {
for (var j = 0; j < rows; j++) {
var loc = ((cols - i - 1) + j * cols) * 4;
var r = video.pixels[loc   ]; 
var g = video.pixels[loc + 1];
var b = video.pixels[loc + 2];
var sz = map((r+g+b)/3, 0, 255, 0, videoScale);
rectMode(CENTER);
fill(255);
noStroke();
var x = i*videoScale;
var y = j*videoScale;
rect(x + videoScale/2, y + videoScale/2, sz, sz);
}
}
}
var apiKey = "&api_key=dc6zaTOxFJmzC";
var query = "&q=scream munch edvard";
var img;
var img2;
var url = api + apiKey + query;
function setup() {
loadJSON(url, gotData);
}
function mousePressed() {
loadJSON(url, updateImage);
}
function gotData(giphy) {
img = createImg(giphy.data[0].images.original.url);
img.size(400, 400);
}
function updateImage(giphy) {
img2 = createImg(giphy.data[1].images.original.url);
img2.size(400, 400);
img.hide()
}
function setup() { 
createCanvas(400, 400);
wave = new p5.Oscillator();
wave.start();
wave.freq(440);
button=createButton('play/pause');
button.mousePressed(toggle);
} 
function draw() { 
if (playing){
background(255,0,255);
}else{
background(51); 
}
}
function toggle(){
if(!playing){
playing=true;
}else{
playing=false;
}
var apiKey = "&api_key=dc6zaTOxFJmzC";
var query = "&q=scream munch edvard";
var img;
var img2;
var url = api + apiKey + query;
function setup() {
loadJSON(url, gotData);
} 
function mousePressed(){
loadJSON(url, updateImage);
}
function gotData(giphy) {
for (var i = 0; i < 1; i++) {
img = createImg(giphy.data[0].images.original.url);
img.size(400,400);
}
}
function updateImage(giphy){
img2 = createImg(giphy.data[1].images.original.url);
img2.size(400,400);
img.hide()
}var xdir = 0;
var x = 0;
var thedata;
var inputBox;
var inputButton;
function preload() {
}
function inputWasInput() {
var city = inputBox.value();
}
function jsonNotLoaded(er) {
console.log(er);
}
function jsonLoaded(newdata) {
console.log(newdata);
console.log("New Wind Speed: " + newdata.wind.speed);
thedata = newdata;
xdir = thedata.wind.speed;
}
function setup() { 
createCanvas(400, 400);
inputButton = createButton('load');
inputButton.mouseClicked(inputWasInput);
inputButton.position(150, 10);
inputBox = createInput('New York');
inputBox.position(10, 10);  
xdir = thedata.wind.speed;
} 
function draw() { 
background(220);
ellipse(x, 100, 50, 50);
x = x + xdir;
if (x > width) { x = 0; }
}
var weather;
function setup(){
createCanvas(400,400);
}
function gotData(data){
weather=data;
console.log(data);
}
function draw(){
background(0);
if(weather){
var temp=weather.main.temp;
var humidity=weather.main.humidity;
ellipse(250,200,weather.main.temp,weather.main.temp);
ellipse(250,200,weather.main.humidity,weather.main.humidity);
}
var spaceData;
function setup(){
createCanvas(400,400);
}
function gotData(data){
console.log(data);
}
bricks=[];
function setup() {
createCanvas(600,600);
ball=new Ball();  
for(var _x = 0; _x < width / brickW; _x++) {
for(var _y = 0; _y < (height / 2) / brickH; _y++) {
bricks[_x] = bricks[_x] || [];
bricks[_x][_y] = new Brick(_x, _y, brickW, brickH);
}
}
}
function draw(){
background(0,90);
drawPaddle();
ball.display();
ball.move();
ball.bounce()
for(var _x = 0; _x < width / brickW; _x++) {
for(var _y = 0; _y < (height / 2) / brickH; _y++) {
if (dist(ball.x, ball.y, bricks[_x][_y].x, bricks[_x][_y].y) < 40) {
bricks[_x][_y].show = false;
ball.dobounce();
}
bricks[_x][_y].display();
}
}
if (ball.y>height){
gameOver();
}
}
function drawPaddle(){
paddleY=height-paddleH;
fill(255,150,9);
noStroke();
rect(paddleX,paddleY,paddleW,paddleH);
}
function gameOver(){
background(0);
textSize(32);
textAlign(CENTER);
fill(255,80,80);
text("GAME OVER",width/2,height/2);
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
}
function setup() { 
createCanvas(400, 400);
} 
for (var i = 0; i<portList.length;i++){
console.log(i+""+portList[i]);
}
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
let paddleW=60;
let paddleH=15;
let paddleX;
let paddleY;
let brickW=50;
let brickH=40;
bricks=[];
function setup() { 
createCanvas(400, 400);
ball=new Ball();  
for(var _x = 0; _x < width / brickW; _x++) {
for(var _y = 0; _y < (height / 2) / brickH; _y++) {
bricks[_x] = bricks[_x] || [];
bricks[_x][_y] = new Brick(_x, _y, brickW, brickH);
}
}
}
function draw() { 
background(0,90);
drawPaddle();
ball.display();
ball.move();
ball.bounce()
for(var _x = 0; _x < width / brickW; _x++) {
for(var _y = 0; _y < (height / 2) / brickH; _y++) {
if (dist(ball.x, ball.y, bricks[_x][_y].x, bricks[_x][_y].y) < 40) {
bricks[_x][_y].show = false;
ball.dobounce();
}
bricks[_x][_y].display();
}
}
if (ball.y>height){
gameOver();
}
}
function drawPaddle(){
paddleX=mouseX;
paddleY=height-paddleH;
fill(255,150,9);
noStroke();
rect(paddleX,paddleY,paddleW,paddleH);
}
function drawBrick(){
for (x=0;x<width;x=x+50){
for (y=0;y<width/2;y=y+40){
stroke(255);
strokeWeight(6);
fill(255,random(100,250),random(0,100));
rect(x,y,brickW,brickH);
}
}
}
function gameOver(){
background(0);
textSize(32);
textAlign(CENTER);
fill(255,80,80);
text("GAME OVER",width/2,height/2);
}
let paddleW = 60;
let paddleH = 15;
let paddleX;
let paddleY;
let brickW = 50;
let brickH = 40;
let button;
let resetButton;
let move = false;
bricks = [];
function setup() {
button = createButton('start');
button.mousePressed(ballMove);
button.class('start-button');
resetButton = createButton('restart');
resetButton.mousePressed(resetGame);
button.class('start-button');
createCanvas(400,400);
slider = createSlider(0, 10, 1);
slider.class('slider');
let sliderValue = slider.value();
ball = new Ball(1, 1);
for (var _x = 0; _x < width / brickW; _x++) {
for (var _y = 0; _y < (height / 2) / brickH; _y++) {
bricks[_x] = bricks[_x] || [];
bricks[_x][_y] = new Brick(_x, _y, brickW, brickH);
}
}
}
function resetGame() {
ball = new Ball(1, 1);
for (var _x = 0; _x < width / brickW; _x++) {
for (var _y = 0; _y < (height / 2) / brickH; _y++) {
bricks[_x] = bricks[_x] || [];
bricks[_x][_y] = new Brick(_x, _y, brickW, brickH);
}
}
}
function ballMove() {
move = true;
}
function draw() {
ball.updateSpeed(slider.value());
background(0, 90);
drawPaddle();
if (move == true) {
ball.display();
ball.move();
ball.bounce()
}
for (var _x = 0; _x < width / brickW; _x++) {
for (var _y = 0; _y < (height / 2) / brickH; _y++) {
if (dist(ball.x, ball.y, bricks[_x][_y].x, bricks[_x][_y].y) < 40) {
bricks[_x][_y].show = false;
ball.dobounce();
}
bricks[_x][_y].display();
}
}
if (ball.y > height) {
gameOver();
move=false;
}
}
function drawPaddle() {
paddleY = height - paddleH;
fill(255, 150, 9);
noStroke();
rect(paddleX, paddleY, paddleW, paddleH);
}
function drawBrick() {
for (x = 0; x < width; x = x + 50) {
for (y = 0; y < width / 2; y = y + 40) {
stroke(255);
strokeWeight(6);
fill(255, random(100, 250), random(0, 100));
rect(x, y, brickW, brickH);
}
}
}
function gameOver() {
background(0);
textSize(32);
textAlign(CENTER);
fill(255, 80, 80);
text("GAME OVER", width / 2, height / 2);
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
}
let paddleW=60;
let paddleH=15;
let paddleX;
let paddleY;
let brickW=50;
let brickH=40;
let slider;
let easy;
let hard;
bricks=[];
function setup() { 
createCanvas(500, 500);
createButton('start');
slider.style('width','250px');
easy=createP('
ball=new Ball();  
for(var _x = 0; _x < width / brickW; _x++) {
for(var _y = 0; _y < (height / 2) / brickH; _y++) {
bricks[_x] = bricks[_x] || [];
bricks[_x][_y] = new Brick(_x, _y, brickW, brickH);
}
}
}
function draw() { 
background(0,90);
drawPaddle();
ball.display();
ball.move();
ball.bounce()
for(var _x = 0; _x < width / brickW; _x++) {
for(var _y = 0; _y < (height / 2) / brickH; _y++) {
if (dist(ball.x, ball.y, bricks[_x][_y].x, bricks[_x][_y].y) < 40) {
bricks[_x][_y].show = false;
ball.dobounce();
}
bricks[_x][_y].display();
}
}
if (ball.y>height){
gameOver();
}
}
function drawPaddle(){
paddleX=mouseX;
paddleY=height-paddleH;
fill(255,150,9);
noStroke();
rect(paddleX,paddleY,paddleW,paddleH);
}
function drawBrick(){
for (x=0;x<width;x=x+50){
for (y=0;y<width/2;y=y+40){
stroke(255);
strokeWeight(6);
fill(255,random(100,250),random(0,100));
rect(x,y,brickW,brickH);
}
}
}
function gameOver(){
background(0);
textSize(32);
textAlign(CENTER);
fill(255,80,80);
text("GAME OVER",width/2,height/2);
}
var coolDiv;
var button;
var x = 0;
function setup() { 
canvas = createCanvas(500, 500);
canvas.position(0,0);
button = createButton('click me');
button.position(200, 19);
button.mousePressed(buttonClicked);
} 
function buttonClicked() {
coolDiv = select('#first');
coolDiv.style("background-color","green");
coolDiv.position(0,200);
var otherDiv = select("#first");
otherDiv.hide();
x = x + 10;
}
function draw() { 
background(0,0,0);
fill(50);
rect(x,0,100,100);
}let paddleW=60;
let paddleH=15;
let paddleX;
let paddleY;
let brickW=50;
let brickH=40;
let slider;
let easy;
let hard;
bricks=[];
function setup() { 
createCanvas(500, 500);
createButton('start');
slider.style('width','250px');
easy=createP('
ball=new Ball();  
for(var _x = 0; _x < width / brickW; _x++) {
for(var _y = 0; _y < (height / 2) / brickH; _y++) {
bricks[_x] = bricks[_x] || [];
bricks[_x][_y] = new Brick(_x, _y, brickW, brickH);
}
}
}
function draw() { 
background(0,90);
drawPaddle();
ball.display();
ball.move();
ball.bounce()
for(var _x = 0; _x < width / brickW; _x++) {
for(var _y = 0; _y < (height / 2) / brickH; _y++) {
if (dist(ball.x, ball.y, bricks[_x][_y].x, bricks[_x][_y].y) < 40) {
bricks[_x][_y].show = false;
ball.dobounce();
}
bricks[_x][_y].display();
}
}
if (ball.y>height){
gameOver();
}
}
function drawPaddle(){
paddleX=mouseX;
paddleY=height-paddleH;
fill(255,150,9);
noStroke();
rect(paddleX,paddleY,paddleW,paddleH);
}
function drawBrick(){
for (x=0;x<width;x=x+50){
for (y=0;y<width/2;y=y+40){
stroke(255);
strokeWeight(6);
fill(255,random(100,250),random(0,100));
rect(x,y,brickW,brickH);
}
}
}
function gameOver(){
background(0);
textSize(32);
textAlign(CENTER);
fill(255,80,80);
text("GAME OVER",width/2,height/2);
}
var circleSize = 10;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(0); 
fill(255,200,5);
noStroke();
ellipse(width/2,height/2,circleSize,circleSize);
}
for (var i = 0; i<portList.length;i++){
console.log(i+""+portList[i]);
}
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
var circleSize = 10;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(0); 
fill(255,200,5);
noStroke();
ellipse(width/2,height/2,circleSize,circleSize);
}
for (var i = 0; i<portList.length;i++){
console.log(i+""+portList[i]);
}
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
function setup() {
createCanvas(500,500);
background(0);
}
function draw(){
fill(255, 10);
noStroke();
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
}
var cols=8;
var rows=5;
bricks=create2dArray(cols,rows);
function setup() { 
createCanvas(400, 400);
for (var i=0;i<cols;i++){
for (var j=0;j<rows;j++){
var x=i*50;
var y=j*40;
bricks.push(new Brick(x,y));
}
}
}
function draw() { 
background(0);
for (var i=0;i<cols;i++){
for (var j=0;j<rows;j++){
var x=i*50;
var y=j*40;
bricks[cols][rows].display();
}
function create2dArray(col,row){
var arr = new Array(col);
for (var i=0;i<arr.length;i++){
arr[i]=new Array(row);
}
return arr;
}let paddleW=60;
let paddleH=15;
let paddleX;
let paddleY;
let brickW=50;
let brickH=40;
bricks=[];
function setup() { 
createCanvas(400, 400);
ball=new Ball();  
for(var _x = 0; _x < width / brickW; _x++) {
for(var _y = 0; _y < (height / 2) / brickH; _y++) {
bricks[_x] = bricks[_x] || [];
bricks[_x][_y] = new Brick(_x, _y, brickW, brickH);
}
}
}
function draw() { 
background(0,90);
drawPaddle();
ball.display();
ball.move();
ball.bounce()
for(var _x = 0; _x < width / brickW; _x++) {
for(var _y = 0; _y < (height / 2) / brickH; _y++) {
bricks[_x][_y].display();
}
}
if (ball.y>height){
gameOver();
}
}
function drawPaddle(){
paddleX=mouseX;
paddleY=height-paddleH;
fill(255,150,9);
noStroke();
rect(paddleX,paddleY,paddleW,paddleH);
}
function drawBrick(){
for (x=0;x<width;x=x+50){
for (y=0;y<width/2;y=y+40){
stroke(255);
strokeWeight(6);
fill(255,random(100,250),random(0,100));
rect(x,y,brickW,brickH);
}
}
}
function gameOver(){
background(0);
textSize(32);
textAlign(CENTER);
fill(255,80,80);
text("GAME OVER",width/2,height/2);
}
x: 0,
y: 0,
d: 0,
xspeed: 10,
yspeed: 10
};
var ball2 = {
x: 0,
y: 0,
d: 0,
xspeed: 10,
yspeed: 10
};
var ball3 = {
x: 0,
y: 0,
d: 0,
xspeed: 10,
yspeed: 10
};
var ball4 = {
x: 0,
y: 0,
d: 0,
xspeed: 10,
yspeed: 10
};
var circles = [];
function setup() { 
createCanvas(400, 400);
initBall(ball1);
initBall(ball2);  
initBall(ball3);
circles[0] = ball1;
circles[1] = ball2;
circles[2] = ball3;
initBall(ball4);
circles[3] = ball4;
} 
function initBall(ball) {
ball.x = random(0, width);
ball.y = random(0, height);
ball.d = random(10, 30); 
}
function displayBall(ball) {
ellipse(ball.x, ball.y, ball.d);
}
function moveBall(ball) {
ball.x += ball.xspeed;
ball.y += ball.yspeed;
}
function checkBounds(ball) {
if (ball.x > width || ball.x < 0) {
ball.xspeed *= -1;
}
if (ball.y > height || ball.y < 0) {
ball.yspeed *= -1;
}	
}
function draw() { 
background(220);
for (var i = 0; i < circles.length; i++) {
displayBall(circles[i]);
moveBall(circles[i]);
checkBounds(circles[i]);
}
}let paddleW=60;
let paddleH=15;
let paddleX;
let paddleY;
let brickW=50;
let brickH=40;
bricks=[];
function setup() { 
createCanvas(400, 400);
ball=new Ball();
for (var i=0; i<30;i++){
for (var _x=0;_x<width;_x=_x+brickW){
for (var _y=0;_y<width/2;_y=_y+brickH){
bricks[i]=new Brick(_x,_y);
}
}
}
}
function draw() { 
background(0,90);
drawPaddle();
ball.display();
ball.move();
ball.bounce()
drawBrick();
if (ball.y>height){
gameOver();
}
}
function drawPaddle(){
paddleX=mouseX;
paddleY=height-paddleH;
fill(242,255,125);
noStroke();
rect(paddleX,paddleY,paddleW,paddleH);
}
function drawBrick(){
for (x=0;x<width;x=x+50){
for (y=0;y<width/2;y=y+40){
stroke(255);
strokeWeight(6);
fill(80,random(125,200),random(10,255));
rect(x,y,brickW,brickH);
}
}
}
function gameOver(){
background(0);
textSize(32);
textAlign(CENTER);
fill(255,80,80);
text("GAME OVER",width/2,height/2);
}
var paddleH=15;
var brick=[];
function setup() { 
createCanvas(400, 400);
for (var i = 0; i < 10; i++) {
brick.push(new Brick());
}
}
} 
function draw() { 
background(0,70);
drawPaddle();
for (i=0;i<width;i++){
for (j=0;i<width/2;j++){
drawBrick();
}
}
}
function drawPaddle(){
fill(255,150,100);
noStroke();
rect(mouseX,height-paddleH,paddleW,paddleH);
}
function drawBrick(){
for (x=0;y<width;x++){
for (y=0;y<width/2;y++){
rect(x,y,50,40);
}
var r;
var r1;
var r2;
var c;
var circles = [];
function setup() { 
createCanvas(500, 500);
for (var i = 0; i < 10; i++) {
circles[i] = new Circle(random(width),random(height),10,random(2),random(2));
}
r = new Rectangle(0,0,60,80,0);
r1 = new Rectangle(100,0,60,80,0);  
r2 = new Rectangle(0,100,60,80,0);
angleMode(degrees)
rectMode(CENTER)
}   
function draw() { 
background(16,0,0)
if (mouseIsPressed) {
var nc = new Circle(mouseX,mouseY,10,random(-2,2),random(-2,2));
circles.push(nc);
}
for (var i = 0; i < circles.length; i++) {
circles[i].display();
if (circles[i].fill <= 0) {
circles.splice(i,1);
}
}
r.displayRect();
r.moveRect();
r1.displayRect();
r1.moveRect();
r2.displayRect();
r2.moveRect();
}
var ball1;
var ball2;
var gravity = 0.1;
function setup() {
createCanvas(480, 270);
ball1 = new Ball(150, 0, 16);
ball2 = new Ball(350, 50, 32);
}
function draw() {
background(51);
ball1.display();
ball2.display();
ball1.update();
ball2.update();
}var nums=[100,25,46,72];
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(0);
stroke(255);
for (i=0;i<4;i++){
fill(random(0,255),random(100,255),255);
ellipse((50+100*i),200,nums[i],nums[i]);
}
}
function setup() {
createCanvas(windowWidth, windowHeight);
background(100);
}
function show(){
for(circleX=50;circleX<=width;circleX+=50){
noStroke();
fill(0);
ellipse(circleX,height/2,10,10);
}
}
function disappear(){
for(circleX=50;circleX<width;circleX+=50){
noStroke();
fill(255);
ellipse(circleX,height/2,10,10);
}
}
function draw(){
background(100);
character(mouseX);
if(mouseX<circleX){
show();
}
else{
disappear();
}
}
function character(posX) {
push();
translate(posX,height/2);
rotate(radians(25));
fill(255,240,0);
arc(0,0, 80, 80, 0, PI+3*QUARTER_PI, PIE)
pop();
fill(0);
ellipse(posX+10, 19*height/40, 8, 8);
}let canvas = {
x: 400,
y:400
};
function setup() { 
createCanvas(canvas.x, canvas.y);
colorMode(HSB);
background(30);
} 
function draw() { 
fill(frameCount%360,50,128,0.03);
push();
translate(canvas.x/2, canvas.y/2); 
rotate(map(mouseX,0,canvas.x,0,PI*5));
scale(map(mouseY,0,canvas.x,0,5));
rect(-25, -25, 50,50,5);
pop();
}var x2=225;
var y2=240;
var w=390;
var h=320;
var lx1=640;
var lx2=670;
var l1y=300;
var l2y=350;
var l3y=400;
var l4y=450;
var img1;
var d = 50;
var state = true;
var channel1 =false;
var channel2=false;
var channel3 = false;
function preload() {
img1 = loadImage("hbo.jpeg");
img2 = loadImage("Gabe.jpeg");
}
function setup() { 
createCanvas(800, 700);
} 
function drawtv(){
strokeWeight(10);
fill(212, 230, 241)
rect(200, 200, 500, 400, 50);
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
function turnoff(){
stroke(10);
fill(213, 216, 220);
rect(x2,y2,w,h,50);
}
function turnon(){
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
function itpchannel(){
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
function hbochannel(){
image(img1,x2,y2,390,300);
}
function GabeChannel(){
image(img2,x2,y2,380,300);
}
function draw() {
background(253, 237, 236);
frameRate(15);
drawtv();
if (state) {
turnon();
} 
else if (channel1){
itpchannel();
}
else if (channel2){
hbochannel();
}
else if (channel3){
GabeChannel();
}
else{
turnoff();
}
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
else if (mouseX>=lx1&&mouseX<=lx2&&mouseY<=(l3y+5)&&mouseY>=(l3y-5)){
channel3=!channel3;
}
}
var x2=225;
var y2=240;
var w=390;
var h=320;
var lx1=640;
var lx2=670;
var l1y=300;
var l2y=350;
var l3y=400;
var l4y=450;
var img1;
var d = 50;
var state = false;
var channel1 =false;
var channel2=false;
var channel3 = false;
var channel4 = false;
function preload() {
img1 = loadImage("hbo.jpeg");
img2 = loadImage("Gabe.jpeg");
img3 = loadImage("pcom.jpg");
}
function setup() { 
createCanvas(800, 700);
} 
function drawtv(){
strokeWeight(10);
fill(212, 230, 241)
rect(200, 200, 500, 400, 50);
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
function turnoff(){
stroke(10);
fill(213, 216, 220);
rect(x2,y2,w,h,50);
}
function turnon(){
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
function itpchannel(){
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
function hbochannel(){
image(img1,x2,y2,390,300);
}
function GabeChannel(){
image(img2,x2,y2,370,320);
}
function pcomChannel(){
image(img3,x2,y2,390,300);
}
function draw() {
background(253, 237, 236);
frameRate(15);
drawtv();
if (state) {
turnoff();
} 
else if (channel1){
itpchannel();
}
else if (channel2){
hbochannel();
}
else if (channel3){
GabeChannel();
}
else if (channel4){
pcomChannel();
}
else{
turnon();
}
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
else if (mouseX>=lx1&&mouseX<=lx2&&mouseY<=(l3y+5)&&mouseY>=(l3y-5)){
channel3=!channel3;
}
else if (mouseX>=lx1&&mouseX<=lx2&&mouseY<=(l4y+5)&&mouseY>=(l4y-5)){
channel4=!channel4;
}
}
var numCircles = 0;
function setup() { 
createCanvas(400, 400);
} 
function mousePressed() {
numCircles++; 
}
function draw() { 
background(220);
if (frameCount < 600) {
var numCirclesDrawn = 0;
for (var x = 0; x < width; x=x+50) {
for (var y = 0; y < height; y=y+50) {
if (numCirclesDrawn < numCircles) {
fill(x,y,frameCount%256);
ellipse(x, y, 50, 50);
numCirclesDrawn++;
}
}
}
} else {
fill(0);
rectMode(CENTER);
rect(width/2, height/2, 100, 100);
}
}
function setup() { 
createCanvas(800, 700);
} 
var d = 50;
var state = false;
function draw() {
background('rgba(0,200,100, 0.60)');
fill(300)
rect(200, 200, 500, 400, 50);
if (state) {
fill(50)
rect(225, 240, 390, 320, 50);
} else {
fill(200)
rect(225, 240, 390, 320, 50);
}
fill(300)
rect(290, 600, 250, 20, 20, 15, 10, 5);
fill(300)
arc(420, 204, 90, 80, 135, 135, OPEN);
line(520, 120, 415, 164);
line(370, 120, 415, 164);
line(640, 300, 670, 300);
line(640, 350, 670, 350);
line(640, 400, 670, 400);
line(640, 450, 670, 450);
strokeWeight(12.0);
strokeCap(ROUND);
fill(300)
ellipse(655, 530, d, d);
}
function mousePressed() {
if (dist(mouseX, mouseY, 655, 530) < d/2) {
state = !state;
}
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
function setup() { 
createCanvas(800, 700);
} 
var d = 50;
var state = false;
function draw() {
background(125,156,150,50);
frameRate(15);
strokeWeight(4);
fill(240)
rect(200, 200, 500, 400, 50);
x2=225;
y2=240;
w=390;
h=320;
if (state) {
stroke(2);
fill(50);
rect(x2,y2,w,h,50);
} 
else {
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
fill(200,80);
rect(290, 600, 250, 20, 20, 15, 10, 5);
strokeWeight(4);
fill(200)
arc(420, 204, 90, 80, 135, 135, OPEN);
fill(230)
line(520, 120, 415, 164);
line(370, 120, 415, 164);
line(lx1, l1y, lx2, l1y);
line(lx1, l2y, lx2, l2y);
line(lx1, l3y, lx2, l3y);
line(lx1, l4y, lx2, l4y);
fill(100)
ellipse(655, 530, d, d);
}
function mousePressed() {
if (dist(mouseX, mouseY, 655, 530) < d/2) {
state = !state;
}
}
function setup(){ 
createCanvas(400, 400);
} 
function draw() { 
background(220);
frameRate(15);
var delta=random(55,60);
for (var y1=0+random(-1,1);y1<height;y1=y1+0.5){
for (var x1=0+random(-10,10);x1<width;x1=x1+delta+5){
if(x1< width/2){
stroke(255,(255-x1*3),random(150,255),50);
}else{
stroke(random(150,255),255,random(150,255),50);
}
strokeWeight(2);
line(x1,y1,x1+delta,y1);
}
}
}
function mousePressed(){
background(100);
}var bgcolor;
var button;
var slider;
var input;
var nameP
function setup(){ 
createCanvas(400, 400);
bgcolor=color(255,255,100);
nameP=createP("Your name");
var button = createButton('Power');
button.mousePressed(changeColor);
slider=createSlider(10,100,4);
input=createInput('type your name')
} 
function changeColor(){
bgcolor=color(random(255),random(255),random(255),20);
}
function drawlines(){
var delta=random(55,60);
for (var y1=0+random(-10,10);y1<height;y1=y1+0.5){
for (var x1=0+random(-10,10);x1<width;x1=x1+delta+5){
stroke((x1+2),(255-x1*3),random(150,255),50);
strokeWeight(2);
line(x1,y1,x1+delta,y1);
}
}
}
function draw() { 
background(bgcolor);
frameRate(15);
nameP.html(input.value());
}var colors = ['#00FFFF','#FFFF00','#FF00FF','#00FF00','FF00FF','#FF0000'];
function setup(){ 
createCanvas(400, 400);
} 
function draw() { 
background(220);
frameRate(15);
var delta=random(45,50);
for (var y1=0+random(-10,10);y1<height;y1=y1+0.5){
for (var x1=0+random(-10,10);x1<width;x1=x1+delta+5){
stroke(random(colors));
strokeWeight(2);
line(x1,y1,x1+delta,y1);
}
}
}var colors = ['#00FFFF','#FFFF00','#FF00FF','#00FF00','FF00FF','#FF0000'];
function setup(){ 
createCanvas(400, 400);
} 
function draw() { 
background(220);
frameRate(15);
var delta=random(45,50);
for (var y1=0+random(-10,10);y1<height;y1=y1+0.5){
for (var x1=0+random(-10,10);x1<width;x1=x1+delta+5){
stroke(random(colors));
strokeWeight(2);
line(x1,y1,x1+delta,y1);
}
}
}var color = [];
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
frameRate(15);
var delta=random(45,50);
for (var y1=0+random(-10,10);y1<height;y1=y1+0.5){
for (var x1=0+random(-10,10);x1<width;x1=x1+delta+5){
／／var stretch = map(mouseX,0,width,0,2);
stroke(x1,0,x1+random(0,255));
strokeWeight(2);
line(x1+stretch*y1,y1,x1+delta+stretch*y1,y1);
}
}
}
stroke(160);
strokeWeight(1);
}
else {
stroke(0,255,255);
strokeWeight(2);
}
line(x1,y1,x2,y1);
delta2=random(10,20);
line(x,y,x+delta1,delta2)
x=x+delta1;
var numCircles = 0;
function setup() { 
createCanvas(400, 400);
} 
function mousePressed() {
numCircles++; 
}
function draw() { 
background(220);
if (frameCount < 600) {
var numCirclesDrawn = 0;
for (var x = 0; x < width; x=x+50) {
for (var y = 0; y < height; y=y+50) {
if (numCirclesDrawn < numCircles) {
fill(x,y,frameCount%256);
ellipse(x, y, 50, 50);
numCirclesDrawn++;
}
}
}
} else {
fill(0);
rectMode(CENTER);
rect(width/2, height/2, 100, 100);
}
}var ball = {
x:0,
y:0,
d:0,
xSpeed:10,
ySpeed:10,
};
function setup() { 
createCanvas(400, 400);
ball.x=random(0,width);
ball.y=random(0,height);
ball.d=random(10,30);
} 
function draw() { 
background(220);
ellipse(ball.x,ball.y,ball.d)
ball.x+=ball.xSpeed;
ball.y=ball.y+ball.ySpeed;
if (ball.x>=width || ball.x <0){
ball.xSpeed *=-1;
}
if (ball.y>=width || ball.y <0){
ball.ySpeed = ball.ySpeed*-1;
}
if (ball.y>height ||ball.y<0)
ball.ySpeed=ball.ySpeed+random(1,-1)
ball.xSpeed = ball.xSpeed*-1;
}var ball = {
x:0,
y:0,
d:0,
xSpeed:10,
ySpeed:10,
};
function setup() { 
createCanvas(400, 400);
ball.x=random(0,width);
ball.y=random(0,height);
ball.d=random(10,30);
} 
function draw() { 
background(220);
ellipse(ball.x,ball.y,ball.d)
ball.x+=ball.xSpeed;
ball.y=ball.y+ball.ySpeed;
if (ball.x>=width || ball.x <0){
ball.xSpeed *=-1;
}
if (ball.y>=width || ball.y <0){
ball.ySpeed = ball.ySpeed*-1;
}
if (ball.y>height ||ball.y<0)
ball.ySpeed=ball.ySpeed+random(1,-1)
ball.xSpeed = ball.xSpeed*-1;
}let x1;
let y1;
let h;
let s;let l;
function setup() { 
createCanvas(windowWidth, windowHeight);
x1=0;
y1=0;
} 
function draw() { 
frameRate(10);
background(0,3);
push();
translate(width/2,height/2);
rotate(frameCount%360/30);
scale(map(mouseY,0,width,0,2));
colorMode(HSL);
fill(0,100,70,0.04);
noStroke();
ellipse(x1,y1,50);
h=map(mouseX,0,width,0,90);
s=map(mouseX,0,width,40,80);
l=70;
noFill();
stroke(h,s,l)
triangle(x1,y1,-80,80,60,80);
stroke(255);
strokeWeight(1);
fill(360,100,100,random(0.5,0.95));
stroke(360,100,frameCount%360,random(0.5,0.95))
line(0,-20,0,random(-120,-160));
x1=x1+random(-2,2);
y1=y1+random(-2,2);
x1=20
pop();
}let x1;
let x2;
let x3;
let y1;
let y2;
let y3;
function setup() { 
createCanvas(600,600);
} 
function draw() { 
colorMode(HSL);
push();
h=random(0,300);
s=random(10,50);
l=50;
noFill();
stroke(h,s,l,0.1);
x1=mouseX;
y1=mouseY;
x2=300;
y2=500;
x3=400;
y3=450;
x3=x3+random(-10,10);
y3=y3+random(-5,5);
triangle(x1,y1,x2,y2,x3,y3);
rotate(radians(frameCount%360));
}
var centerX;
var centerY;
var eyesY;
var X;
var Y;
var randomMove;
var ballonX;
var ballonY;
var b1;
var z1;
function setup() { 
createCanvas(400, 400);
background(255,mouseY,mouseX);
centerX=width/2;
centerY=height/2+30;
eyesY=centerY-50;
x: 50,
y: 50,
w:30,
h:38,
triX1:mouseX,
triY1:mouseY+18,
triX2:mouseX-6,
triY2:mouseY+18+10,
triX3:mouseX+6,
triY3:mouseY+18+10
} 
function draw() { 
bgr=250;
bgg=map(mouseX,0,400,160,220);
bgb=map(mouseY,0,400,100,140);
background(bgr,bgg,bgb,80);
stroke(255,10,0,70);
fill(255,255,255,random(20,80));
ellipse(random(10,390),random(50,250),30,30)
stroke(255,10,0,70);
fill(255,255,255,random(20,80));
ellipse(random(10,390),random(50,250),30,30)
stroke(255,10,0,70);
fill(255,255,255,random(20,80));
ellipse(random(10,390),random(50,250),30,30)
stroke(255,10,0,70);
fill(255,255,255,random(20,80))
ellipse(random(10,390),random(50,250),30,30)
stroke(255,10,0,70);
fill(255,255,255,random(20,80))
ellipse(random(10,390),random(50,250),30,30)
noStroke();
fill(255,109,85);
balloonX=mouseX;
balloonY=mouseY;
triangle(balloonX,balloonY+18,balloonX-6,balloonY+16+8,balloonX+6,balloonY+24);
ellipse(balloonX,balloonY,35,40);
noFill()
stroke(255,109,85)
b1=balloonX;
z1=balloonY+24;
bezier(b1,z1,b1-56,z1+38,b1+20,z1+91,b1-33,z1+126)
strokeWeight(1);
stroke(0);
fill(2,160,234);
ellipse(centerX,centerY,250);
fill(240);
ellipse(centerX,centerY+30,220,180);
randomMove=random(-180,180);
fill(255);
ellipse(centerX-30,eyesY,60,65);
fill(255);	
ellipse(centerX+30,eyesY,60,65);
fill(0);
frameRate(5);
push();
translate(centerX-30,eyesY);
rotate(radians(frameCount*60));
ellipse(15,5,18);
fill(255);
ellipse(18,5,6)
pop()
push();
translate(centerX+30,eyesY);
rotate(radians(frameCount*60));
fill(0);
ellipse(15,5,18)
fill(255);
ellipse(18,5,6);
pop();
fill(255,0,0);
ellipse(centerX,eyesY+36,30);
line(centerX,centerY,centerX,centerY+70);
fill(255);
noStroke();
ellipse(centerX+5,eyesY+35,10);
noFill();
stroke(1);
arc(centerX,centerY,190,150,0,radians(170));
line(centerX-250/2+15,centerY-15,centerX-20,centerY+10);
line(centerX-250/2+15-10,centerY+10+10,centerX-20,centerY+10+10);
line(centerX-250/2+15,centerY+60,centerX-20,centerY+30)
line(centerX+250/2-15,centerY-15,centerX+20,centerY+10);
line(centerX+250/2-15+10,centerY+10+10,centerX+20,centerY+10+10);
line(centerX+250/2-15,centerY+60,centerX+20,centerY+30);
fill(231,0,50);
noStroke();
rectMode(CENTER);
rect(centerX,centerY+125,250,12,10);
stroke(0.5);
fill(255,221,2);
ellipse(centerX,centerY+125,30)
rect(centerX,centerY+125,35,8,10);
Everything here is a comment
and not code 
}
function mousePressed(){
background(255,200,random(120,240));
}function setup() {
createCanvas(500, 600);
background(0);
}
function draw() {
background(0);
drawCircle(frameCount*2, 100);
}
function drawCircle(angle, distance) {
push();
translate(width / 2, height / 2);
rotate(radians(angle));
ellipse(distance, 0, 50, 50);
pop();
}
function mousePressed(){
}var square;
var other;
function setup() { 
createCanvas(400, 400);
square={
x:10,
y:100,
w:50,
h:50
} 
function draw() { 
background(220);
square.x++;
other.x--;
rect(square.x,square.y,square.w,square.h);
}
function setup() { 
createCanvas(400, 400);
frameRate();
x=random(0,width);
y=random(0,height);
} 
function draw() { 
background(220);
rect(x,y,20,40);
x=map(mouseX,0,50,0,width);
y=mouseY;
}
function setup() { 
createCanvas(400, 400);
var x = width/2;
var y = height/2;
var w =50;
var h = 50;
noFill();
ellipse(x,y,w,h);
y=y-h/2;
ellipse(x,y,w,h);
y=y+h/2;
/ellipse(x,y,w,h);
} 
function draw() { 
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
push();
translate(100,100);
rotate(radians(-45));
line(-100,0,100,0);
rect(20,20,50,50);
pop();
}var centerX;
var centerY;
var eyesY;
var X;
var Y;
var randomMove;
function setup() { 
createCanvas(400, 400);
background(255,255,230);
centerX=width/2;
centerY=height/2+30;
eyesY=centerY-50;
} 
function draw() { 
frameRate(100)
background(255,190,random(120,220));
textSize(64);
fill(255);
rectMode(CENTER);
frameRate(1);
text("Doraemon",random(70,80),80);
stroke(0);
fill(2,160,234);
ellipse(centerX,centerY,250);
fill(240);
ellipse(centerX,centerY+30,220,180);
randomMove=random(-180,180);
fill(255);
ellipse(centerX-30,eyesY,60,65);
fill(255);	
ellipse(centerX+30,eyesY,60,65);
fill(0);
frameRate(5);
push();
translate(centerX-30,eyesY);
rotate(radians(frameCount*60));
ellipse(15,5,18);
fill(255);
ellipse(18,5,6)
pop()
push();
translate(centerX+30,eyesY);
rotate(radians(frameCount*60));
fill(0);
ellipse(15,5,18)
fill(255);
ellipse(18,5,6);
pop();
fill(255,0,0);
ellipse(centerX,eyesY+36,30);
line(centerX,centerY,centerX,centerY+70);
fill(255);
noStroke();
ellipse(centerX+5,eyesY+35,10);
noFill();
stroke(1);
arc(centerX,centerY,190,150,0,radians(170));
line(centerX-250/2+15,centerY-15,centerX-20,centerY+10);
line(centerX-250/2+15-10,centerY+10+10,centerX-20,centerY+10+10);
line(centerX-250/2+15,centerY+60,centerX-20,centerY+30)
line(centerX+250/2-15,centerY-15,centerX+20,centerY+10);
line(centerX+250/2-15+10,centerY+10+10,centerX+20,centerY+10+10);
line(centerX+250/2-15,centerY+60,centerX+20,centerY+30)
fill(231,0,50);
rectMode(CENTER);
rect(centerX,centerY+125,250,12,10);
fill(255,221,2);
ellipse(centerX,centerY+125,30)
rect(centerX,centerY+125,35,8,10);
Everything here is a comment
and not code 
}
function mousePressed(){
}var centerX;
var centerY'
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(255,255,230);
stroke(0);
fill(2,160,234);
ellipse(center,height/2,250);
fill(255);
ellipse(200,230,220,180);
fill(255);
ellipse(170,150,60,65);
fill(255);	
ellipse(230,150,60,65);
fill(0);
ellipse(185,155,15,20);
ellipse(215,155,15,20);
fill(255,0,0);
ellipse(200,185.5,30);
line(200,200.5,200,270);
noFill();
arc(200,200,190,150,0,PI);
line(90,180,180,210);
line(80,220,180,220);
line(90,260,180,230)
line(310,180,220,210);
line(320,220,220,220);
line(310,260,220,230);
fill(231,0,50);
rect(75,315,250,12,10);
fill(255,221,2);
ellipse(200,325,30)
rect(182,320,35,8,10);
Everything here is a comment
and not code 
}