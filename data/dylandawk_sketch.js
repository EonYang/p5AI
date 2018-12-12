let oceansideID = "664";
let steamerID = "163";
let spotID = oceansideID;
let units = "&units=us";
let url = api + spotID + units;
function setup() {
createCanvas(400, 400);
fill(120,204,204);
noStroke();
scene = new wave(20,6,1,1);
let buttonO = select("#Oceanside");
let buttonS = select("#Steamer Lane");
buttonO.mousePressed(spotCheckOceanside);  
buttonS.mousePressed(spotCheckSteamer);
}
function gotData(data) {
spotData = data;
}
function spotCheckOceanside(){
spotID = oceansideID;
url = api + spotID + units;
loadJSON(url, gotData);
}
function spotCheckSteamer(){
spotID = steamerID;
url = api + spotID + units;
loadJSON(url,gotData)
}
function draw() {
let tempSlider = document.getElementById("tempSlider");
let output = document.getElementById("temp");
output.innerHTML = tempSlider.value;
let perSlider = document.getElementById("perSlider");
let perOutput = document.getElementById("per");
perOutput.innerHTML = perSlider.value;
let htSlider = document.getElementById("htSlider");
let htOutput = document.getElementById("ht");
htOutput.innerHTML = htSlider.value;
background(0);
scene.createArrays(perSlider.value,htSlider.value);
scene.drawWaves(tempSlider.value);
let portName = "/dev/cu.usbmodem162";
let video;
let poseNet;
let poses = [];
let mouseWidth = 0, mouseHeight = 0;
let leftEyeX;
let rightEyeX;
let avgEyeX;
let type = 'single';
let isPlaying = 0;
let laugh;
let distance;
let counter=0;
let jawAngle = 90;
let headAngle = 0;
let jawArray = [20,20,10,10];
let outData = [];
function preload() {
soundFormats('mp3', 'ogg');
laugh = loadSound('/Assets/ScaryLaughShort.mp3')
}
function setup() {
createCanvas(400, 400);
video =   createCapture(VIDEO);
video.size(width, height);
poseNet = ml5.poseNet(video, type, modelReady);
poseNet.on('pose', function(results) {
poses = results;
});
}
function modelReady() {
select('#status').html('Model Loaded');
}
function drawKeypoints()  {
if (poses.length > 0){
let pose = poses[0].pose;
let nose;
let leftEye;
let rightEye;
let leftShoulder;
let rightShoulder;
for (let j = 0; j < pose.keypoints.length; j++) {
let keypoint = pose.keypoints[j];
if (keypoint.score > 0.2) {
switch (j) {
case 0:
nose = keypoint;
break;
case 1:
leftEye = keypoint;
break;
case 2:
rightEye = keypoint;
break;
case 5:
leftShoulder = keypoint;
break;
case 6:
rightShoulder = keypoint;
break;
}
if (leftEye) {
leftEyeX = leftEye.position.x;
fill(255);
noStroke();  
ellipse(leftEye.position.x, leftEye.position.y, 30, 30);
fill(0);
ellipse(leftEye.position.x, leftEye.position.y, 10, 13);
}
if (rightEye) {
rightEyeX = rightEye.position.x;
fill(255);
noStroke();  
ellipse(rightEye.position.x, rightEye.position.y, 30, 30);
fill(0);
ellipse(rightEye.position.x, rightEye.position.y, 10, 13);
}
if (leftEye && rightEye)   avgEyeX = int((rightEyeX + leftEyeX)/2);
headAngle = avgEyeX;
}
}
}
}
function serverConnected() {
}
function gotList(thelist) {
for (var i = 0; i < thelist.length; i++) {
}
}
function gotOpen() {
}
function gotError(theerror) {
}
function gotData() {
console.log(currentString);
}
outData = [jawAngle, headAngle];
if (inString.length > 0) {
distance = inString;
}
}
laugh.play();
let i = 0;
if(counter < jawArray[i]) {
if( i %2 ==0) {
jawAngle =0;
} else jawAngle = 90;
counter++;
} else if (counter == jawArray[i]) {
i++;
counter = 0;
}
}
}
function draw() {
background(220);
drawKeypoints();
if (avgEyeX > 0) {
}
function setup() {
createCanvas(400, 400);
}
function drawWeather(data){
console.log(data.main.temp)
}
function draw() {
let oceansideID = "664";
let steamerID = "163";
let spotID = oceansideID;
let units = "&units=us";
let fields = "&fields=timestamp,swell.components.combined.*,condition.temperature";
let spotData;
let url = api + spotID + fields;
let temp = 10;
let ht = 10;
let period = 10;
htScale = 4;
function setup() {
createCanvas(windowWidth, windowHeight);
fill(120,204,204);
noStroke();
scene = new wave(20,6,1,1);
let buttonO = select("#Oceanside");
let buttonS = select("#Steamer Lane");
buttonO.mousePressed(spotCheckOceanside);  
buttonS.mousePressed(spotCheckSteamer);
}
function gotData(data) {
spotData = data;
}
function spotCheckOceanside(){
spotID = oceansideID;
url = api + spotID + fields;
loadJSON(url, gotData);
}
function spotCheckSteamer(){
spotID = steamerID;
url = api + spotID + fields;
loadJSON(url,gotData);
}
function draw() {
background(0);
if(spotData){
ht = spotData[0].swell.components.combined.height * htScale;
period = spotData[0].swell.components.combined.period;
}
scene.createArrays(period,ht);
scene.drawWaves(temp);
let portName = "/dev/cu.usbmodem14641";
let inData;
function setup() {
createCanvas(windowWidth,windowHeight);
scene = new wave(20,6,1,1);
fill(120,204,204);
noStroke()
}
function modelReady() {
select('#status').html('Model Loaded');
}
function draw() {
background (220);
drawKeypoints();
}
function serverConnected() {
}
function gotList(thelist) {
for (var i = 0; i < thelist.length; i++) {
}
}
function gotOpen() {
}
function gotError(theerror) {
}
function gotData() {
console.log(currentString);
}
}
function draw() {
background(0);
fill(255);
let tempSlider = document.getElementById("tempSlider");
let output = document.getElementById("temp");
output.innerHTML = tempSlider.value;
let perSlider = document.getElementById("perSlider");
let perOutput = document.getElementById("per");
perOutput.innerHTML = perSlider.value;
background(0);
scene.createArrays(perSlider.value,potMapped);
scene.drawWaves(tempSlider.value);
}let x=0;
let y=0;
let theta = 0;
let r=10;
let array = [1,2,3];
let bigA = [];
function setup() {
createCanvas(400, 400);
for(let j = 0; j<5; j++){
array.unshift(array[array.length-1]);
array.pop();
bigA[j] =  new Array(3);
for(i=0;i<array.length;i++){
bigA[j][i] = array[i];
}
}
}
function draw() {
}let dis = 60;
function setup() {
createCanvas(500, 500);
frameRate(60);
scene=new circle(width/2,100,0,0,2*PI/5,20);
scene2 =new circle(width/2+dis,100,0,0,PI/5,10);
scene3 =new circle(width/2+dis*2,100,0,0,0,0);
scene4 =new circle(width/2-dis,100,0,0,3*PI/5,30);
scene5 =new circle(width/2-dis*2,100,0,0,4*PI/5,40);
scene.storeCircles();
}
function draw() {
background(51,48,71);
scene.drawCircles();
scene2.drawCircles();
scene3.drawCircles();
scene4.drawCircles();
scene5.drawCircles();
}let maxDS=50;
let counter =0;
let cArray =[];
class circle {
constructor(xx, yy, xxCtr, yyCtr) {
this.x = xx;
this.y = yy;
this.xCtr = xxCtr;
this.yCtr = yyCtr;
}
storeCircles(){
noStroke();
let scaleOne = 2; 
for(i = 1; i <= maxDS; i++){
deltaS = deltaS + 1 / i;
size = deltaS*deltaS*scaleOne;
cArray.push(size);
}
}
drawCircles(){
this.x = this.xCtr+(r*Math.sin(theta));
this.y = this.yCtr+(r*Math.cos(theta));
fill(255,255,238);
ellipse(x,y,cArray[counter]);
if(counter >= maxDS-1){
if(big){
big = false;
}
}
if(counter <= 0){
if(!big){
big = true;
}
}
if(big){
counter++;
} else if (!big){
counter--;
}
theta += 0.1;
}
}
let myArray= [];
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
if(mouseIsPressed){
for(let i = 20; i>=0 ;i--){
myArray[i] = i;
}
}
if(keyIsPressed){
var newLength = myArray.unshift(myArray[20])
newLength = myArray.pop()
}
}class bg {
constructor(xx, yy, xxdir, yydir) {
this.x = xx;
this.y = yy;
this.xdir = xxdir;
this.ydir = yydir;
}
sky() {
let h = 25;
noStroke();
fill(56, 43, 117);
rect(width / 2, h, width, h*2);
fill(76, 44, 123);
rect(width / 2, h*3, width, h*2);
fill(128, 52, 144);
rect(width / 2, h*5, width, h*2);
fill(148, 60, 146);
rect(width / 2, h*7, width, h*2);
fill(165, 65, 127);
rect(width / 2, h*9, width, h*2);
fill(114, 62, 95);
rect(width / 2, height-h*3, width, h*6);
}
}
function setup() {
createCanvas(500, 400);
rectMode(CENTER)
background(0);
scene = new bg(1,0,0,0);
scene.starData();
scene.buildingsData();
}
function draw() {
scene.sky();
scene.stars();
scene.buildings();
scene.move();
let up = 'w';
let down = 's' ;
let left = 'a';
let right = 'd';
function keyTyped() {
nkey = key;
}
class Car {
constructor(xx,yy,xxdir, yydir, rr){
this.x = xx;
this.y = yy;
this.xdir = xxdir;
this.ydir = yydir;
this.r = rr;
}
start(){
fill(255);
text('Click anywhere on the the canvas to start', 10,20,100);
if(mouseIsPressed && mouseX>=0 && mouseX<=width && mouseY>=0 && mouseY<=height){
background(0);
}
}
display(){
ellipse(this.x,this.y,this.r)
}
move() {
let movement =[nkey];
if(nkey == up){
this.y-=1.5;
}
if(nkey == down){
this.y+=1.5;
}
if(nkey == left){
this.x-=1.5;
}
if(nkey == right){
this.x+=1.5;
}
}
}
function setup() {
createCanvas(400, 400);
background(0);
car = new Car(width/2, height-100,1,1, 20);
}
function draw() {
background(0)
car.display();
car.move();
}
let mx;
let my;
let r,g,b;
let counter;
function setup() {
createCanvas(windowWidth, windowHeight);
rectMode(CENTER);
background(0);
noStroke();
frameRate(30);
}
function draw() {
background(0);
if (mouseIsPressed) {
my = mouseY;
r = random(0,255);
g = random(0,255);
b = random(0,255);
}
for (let x = 0; x < width; x += 10) {
for (let y = 0; y < height; y += 10) {
let itR= r/4;
let itG= g/4;
let itB= b/4;
fill(r,g,b);
ellipse(x, y, 5, 5);
}else if(10 < d && d < 20 && counter >= 2) {
fill(r,g,b);
ellipse(x, y, 5, 5);
}else if(20 < d && d < 40 && counter >=4) {
fill(r-itR,g-itG,b-itB);
ellipse(x, y, 5, 5);
}else if(40 < d && d < 60 && counter>=6) {
fill(r-itR*2,g-itG*2,b-itB*2);
ellipse(x, y, 5, 5);
}else if(60 < d && d < 80 && counter>=8) {
fill(r-itR*3,g-itG*3,b-itB*3);
ellipse(x, y, 5, 5);
}
}
}
counter++;
r-=4;
g-=4;
b-=4;
r=0;
} else if(g<=0) {
g=0;
}else if(b <=0) {
b=0;
}
}
let circles = [];
function setup() {
createCanvas(400, 400);
}
function draw() {
background(0);
for(let x = 0; x<=400;x+=10){
for(let y=0; y<=400; y+=10){
ellipse(x,y,5);
}
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
var circle1 = {radius: 20, x: 5, y: 5};
var circle2 = {radius: 12, x: 10, y: 5};
ellipse(circle1.x,circle1.y,circle1.radius,circle1.radius);
var dx = circle1.x - circle2.x;
var dy = circle1.y - circle2.y;
var distance = Math.sqrt(dx * dx + dy * dy);
if (distance < circle1.radius + circle2.radius) {
}
}  let p1 = {x: 10, y:10, ht:20, wd:80, s:0};
let p2 = {x: 570, y:10, ht:20, wd:80, s:0};
let ball = {x:100, y:100, r: 12, v: 4};
let dirX;
let dirY;
function setup() {
createCanvas(600, 400);
noStroke();
ball.x = width/2;
ball.y = height/2;
dirY = random(-2,2);
dirX = sqrt((ball.v*ball.v)-(dirY*dirY));
if (dirY<0) dirX = -dirX;
}
function draw() {
background(0);
let player01 = rect(p1.x, p1.y, p1.ht,p1.wd);
if (mouseY >= (p1.wd/2) && mouseY <= height-(p1.wd/2)) {
p1.y = mouseY-(p1.wd/2);
} else if (mouseY < p1.wd/2) {
p1.y = 0;
} else if (mouseY >height-(p1.wd/2)) {
p1.y = height-(p1.wd);
}
let player02 = rect(p2.x,p2.y,p1.ht,p2.wd);
let up = keyIsDown(UP_ARROW);
let down = keyIsDown(DOWN_ARROW);
if (up && p2.y > 0) {
} else if (down && p2.y < height-p2.wd) {
}
ellipse(ball.x, ball.y, ball.r*2,ball.r*2);
if (ball.x+ball.r >= 0 && ball.x-ball.r <= width){
ball.x += dirX;
ball.y +=dirY;
}
if (ball.y+(ball.r) >= height || ball.y-(ball.r) <= 0) {
dirY = -dirY;
}
if (ball.x-ball.r <= p1.x+p1.ht && ball.x > p1.x) {
if(ball.y >= p1.y && ball.y <= p1.y+(p1.wd) ){
ball.x = p1.x+p1.ht+ball.r;
dirX = -dirX;
} else if (ball.y > p1.y && p1.y == height-(p1.wd)){
ball.x = p1.x+p1.ht+ball.r;
dirX = -dirX;
}
} 
dirY = -dirY;
if (ball.x+ball.r >= p2.x && ball.y >= p2.y && ball.y <= p2.y+p2.wd) {
ball.x= p2.x-ball.r; 
dirX = -dirX;
}
if (frameCount%200 == 0) {
dirX = dirX*1.1;
dirY = dirY*1.2;
}
fill(255)
text(p2.s, width/2 -20, 20);
text(p1.s, width/2 +20, 20);
if(ball.x <= 0 || ball.x >= width) {
if (ball.x <= 0) {
p1.s += 1;
} else if (ball.x >= width) p2.s += 1;
ball.x = width/2;
ball.y = height/2;
dirY = random(-2,2);
dirX = sqrt((ball.v*ball.v)-(dirY*dirY));
if (dirY<0) dirX = -dirX;
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
fill(64,224,208);
noStroke();
ellipse(width/2,width/2,100,100);
}function setup() {
createCanvas(400, 400);
}
function draw() {
}function setup() {
createCanvas(400, 400);
}
function draw() {
var hair = color(66,63,50);
var s01 = color(188,136,59);
var s02 = color(153,112,58);
var s03 = color(216,171,100);
var s04 = color(232,188,197);
var j01 = color(181);
var j02 = color(204);
var j03 = color(228);
var j04 = color(102);
var j05 = color(153);
var p01 = color(109,47,59);
var p02 = color(71,31,41);
var sh01 = color(255,0,0);
var sh02 = color(201,0,0);
var sh03 = color(255,159,159);
var sh04 = color(237);
var eyeL = rect(192.7, 70.1, 2.8,3.4,1.4);
var eyeR = rect(208.7, 70.1, 2.8,3.4,1.4);
var eyeLX = 192.7;
var eyeRX = 208.7;
if (mouseX >= 200 && mouseX <=400) {
eyeLX = (mouseX-200)/74 + 192.7;
} else if (mouseX <=200 && mouseX > 10) {
eyeLX = 192.7 - (200-mouseX)/66.7;
} else eyeLX = 192.7;
if (mouseX >= 200 && mouseX <=400) {
eyeRX = (mouseX-200)/74 + 208.7;
} else if (mouseX <=200 && mouseX >10) {
eyeRX = 208.7 - (200-mouseX)/66.7;
} else eyeRX = 208.7;
angleMode(DEGREES);
background(255);
noStroke();
fill(hair);
ellipse(200,362,158,24);
rectMode(CENTER);
fill(j02);
rect(202,99,58,18,8);
rectMode(CENTER);
fill(j04);
rect(200,100,51,16,8)
fill(hair);
ellipse(200,60,39,39);
fill(s02);
rect(200,98,12,11);
rect(217,70,4,8,1.7);
triangle(200,96,173,117,227,117);
fill(s01);
rect(200,74.7,32,35,12);
rect(200,61,32,19,9.37);
fill(hair);
ellipse(177,67,20,20);
ellipse(176,50,20,20);
ellipse(186,38,20,20);
ellipse(200,35,20,20);
ellipse(211,38,20,20);
fill(hair);
rect(192.7,66.5, 10.2,3.4,1.7);
rect(208.6,66.5, 10.2,3.4,1.7);
rect(eyeLX, 70.1, 2.8,3.4,1.4);
rect(eyeRX, 70.1, 2.8,3.4,1.4);
rect(200,92.3,23,3.4,1.7);
fill(hair);
push();
translate(198,80.5);
rotate(-30);
rect(0,0,4.9,1.4,0.7);
pop();
push();
translate(202,80.5);
rotate(30);
rect(0,0,4.9,1.4,0.7);
pop();
fill(s02);
ellipse(198,76.4,4,4);
ellipse(202,76.4,4,4);
ellipse(200,75.5, 5.7,5.7);
rect(200,83.4,7.4,2,1);
fill(s04);
rect(200, 85.4,9.5,2.5,1.25);
fill(s03);
rect(205,57.5,12,3,1.5);
fill(p01);
rect(182,261,13.3,140,3.7);
rect(218,261,13.3,140,3.7);
fill(p02);
rect(185.5,261,7,140,3.5);
fill(p01);
rect(200,195,50,38,11.5);
fill(p02);
rect(200,204.5,50,3);
fill(j05);
push();
translate(164.5,139.5);
rotate(9);
rect(0,0,19,61,12);
pop();
push();
translate(147.5,143.5);
rotate(-206);
rect(0,0,19,61,12);
pop();
fill(j01);
rect(200,153,70,96,12);
rect(200,190,83,26,12);
fill(j04);
rect(191.5,119,3,28,1.5);
rect(208.5,119,3,28,1.5);
fill(s01);
push();
translate(133,115);
rotate(-26.7);
rect(0,0,11,20);
pop();
fill(s02);
push();
translate(136.5,113.5);
rotate(-26.7);
rect(0,0,5.5,20);
pop();
fill(s01);
push();
translate(127,100);
rect(0,0,18,20,5.5);
pop();
rect(132.5,83.5,5,21,2.5);
push();
translate(126.5,83.5);
rotate(-13.4);
rect(0,0,5,21,2.5);
pop();
push();
translate(221.5,181.7);
rotate(-296);
rect(0,0,10,12.2);
pop();
fill(j02);
push();
translate(233.5,133.5);
rotate(-206);
rect(0,0,19,61,12);
pop();
fill(j02);
push();
translate(239,166);
rotate(-45);
rect(0,0,40,18,7.6);
pop();
fill(j03);
push();
translate(233.2,120.7);
rotate(-206);
rect(0,0,4.7,22.5,2.3);
pop();
fill(j04);
push();
translate(183.5,183.5)
rotate(12);
rect(0,0,7,21);
pop();
push();
translate(218.5,183.5)
rotate(-12);
rect(0,0,7,21);
pop();
push();
translate(200,342);
fill(sh01);
rect(-18,.5,12,27);
rect(18,.5,12,27);
triangle(12,8,34,8,24,-10);
triangle(-12,8,-34,8,-24,-10);
rect(34.5,13,45,10,3);
rect(-34.5,13,45,10,3);
fill(sh02);
rect(-15,.5,6,27);
fill(j03);
rect(-34.5,20,50,6);
rect(34.5,20,50,6);
pop();
push();
fill(j03);
translate(225,339);
rotate(-30);
rect(0,0,10,2,1);
pop();
push();
fill(j03);
translate(227,341);
rotate(-30);
rect(0,0,10,2,1);
pop();
push();
fill(j03);
translate(229,343);
rotate(-30);
rect(0,0,10,2,1);
pop();
push();
fill(j03);
translate(176,339);
rotate(30);
rect(0,0,10,2,1);
pop();
push();
fill(j03);
translate(174,341);
rotate(30);
rect(0,0,10,2,1);
pop();
push();
fill(j03);
translate(172,343);
rotate(30);
rect(0,0,10,2,1);
pop();
}