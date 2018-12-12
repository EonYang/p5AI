var brick = {
x: 0,
y: 20,
sizeY: 10,
sizeX: 30 
}
var array = []
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
drawGrid();
}
function drawPlatform(){
rect(brick.x + mouseX, brick.y, brick.sizeX, brick.sizeY); 
}
function drawGrid(){
for (i=mouseX/100; i<10; i++){
fill(203*i, 100*i, 50*i);
rect(brick.x+(brick.sizeX*i), brick.y, brick.sizeX, brick.sizeY);
for (j=mouseY/50; j<10; j++){
fill(203*j, 100*j, 50*j);
rect(brick.x, brick.y+(brick.sizeY*j*10), brick.sizeX, brick.sizeY); 
}
}
}
var ball = {
x : 200,
y: 330 ,
size: 10 ,
xspeed: 4 ,
yspeed: 3
}
var platform = {
x:0,
y: 340,
xsize: 40,
ysize: 10,
control : false,
visible : true
}
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
drawPlatform();
drawBall();
bounceBall();
if ((ball.x < (platform.x +platform.xsize)  && 
ball.y > platform.y) && 
ball.x ) {
ball.xspeed = ball.xspeed * -1;
ball.yspeed = ball.yspeed * -1;
}
}
function drawBall(){
ellipseMode(RADIUS);
ellipse ( ball.x , ball.y, ball.size, ball.size);
}
function drawPlatform(){
if (platform.visible != false){
rectMode(CENTER); 
rect(platform.x, platform.y, platform.xsize, platform.ysize);
}
function bounceBall(){
if (ball.x >= width || ball.x <= 0){
ball.xspeed = ball.xspeed * -1;
} 
if (ball.y >= height || ball.y <=0){
ball.yspeed = ball.yspeed * -1;
}
ball.x = ball.x + ball.xspeed;
ball.y = ball.y + ball.yspeed; 
}
}
var circle= {
x: 0,
y: 100,
diameter: 50  
};
var col = 0;
var speed = +5;
function setup() {
createCanvas(400, 400);
background(col);
}
function draw() {
col = map( mouseX, 0, 600, 0, 255)*1.2;
ellipse(circle.x, mouseY, circle.diameter, circle.diameter );
fill(random(0,255)/2, random(0,255)/2,random(0,255)/2, 255);
var Rectangle01 = new Rectangle(random(10,100), mouseY,(mouseX/4),(mouseY/100));
circle.x = circle.x +speed;
if(circle.x > width || circle.x<0){
speed = speed*-1; 
} 
rect(building.x, building.y, building.height, building.width);
mousePress();
}
var building = {
x: 300,
y: 300,
height: 40,
width: 100,
};
function Rectangle(x, y, w, h){
this.x = "x";
this.y = "y";
this.w = "w";
this.h = "h";
this.rect = rect(x,y,w,h);
}
function mousePress(){
if(mouseX <=300 && mouseY <=300){
if(mouseIsPressed){
background(0,244,120); 
} else {
background(0); 
}
}
}
let flower; 
function preload(){
flower = loadJSON("flower.json"); 
}
function setup() {
createCanvas(400,400);
}
function draw() {
background(0);
fill(flower[0].r, flower[0].g, flower[0].b);
text(flower[0].name, 10, 50);
fill(0,0,0);
text(fighter[0], 10, 50);
let snapshots = [];
let img;
let i;
let clear;
function setup() {
createCanvas(400, 400);
background(51);
video = createCapture(VIDEO);
video.size(320, 280);
button2 = createButton('last');
button2.mousePressed(lastCapture);
clear = clearArray();
}
function takeCapture() {
for (i = 0; i < snapshots.length; i++) {
image(snapshots[i], 0,0);
}
}
function lastCapture() {
tint(random(50,255), 0, random(25,255));
image(snapshots[i-2], 0, 90, 320, 50, 0, 90, 320,50);
}
function draw() {
setTimeout(takeCapture,1000);
setTimeout(lastCapture,2000);
}
function clearArray(){
if (i>30){
snapshots.splice(0,snapshots.length)
}
let button;
let snapshots = [];
let img;
let i;
function setup() {
createCanvas(400, 400);
background(51);
video = createCapture(VIDEO);
video.size(320, 240);
button = createButton('capture');
button.mousePressed(takecapture);
button2 = createButton('last');
button2.mousePressed(lastcapture);
}
function takecapture() {
for (i = 0; i < snapshots.length; i++) {
image(snapshots[i], 0,0);
}
}
function lastcapture() {
tint(random(50,255), 0, random(25,255));
image(snapshots[i-2], 0, 90, 320, 50, 0, 90, 320,50);
}
function draw() {
for (w =0; w < (snapshots.length); w++){
setTimeout(lastcapture,2000);
setTimeout(takecapture,1000);
}
let button;
let snapshots = [];
let img;
let i;
function setup() {
createCanvas(400, 400);
background(51);
video = createCapture(VIDEO);
video.size(320, 240);
/button = createButton('capture');
button.mousePressed(takecapture);
button2 = createButton('last');
button2.mousePressed(lastcapture);
}
function takecapture() {
for (i = 0; i < snapshots.length; i++) {
image(snapshots[i], 0,0);
}
}
function lastcapture() {
tint(random(50,255), 0, random(50,255));
image(snapshots[i-2], 0, 90, 320, 50, 0, 90, 320,50);
}
function draw() {
let button;
let snapshots = [];
let img;
let i;
function setup() {
createCanvas(400, 400);
background(51);
video = createCapture(VIDEO);
video.size(320, 240);
/button = createButton('capture');
button.mousePressed(takecapture);
button2 = createButton('last');
button2.mousePressed(lastcapture);
}
function takecapture() {
for (i = 0; i < snapshots.length; i++) {
image(snapshots[i], 0,0);
}
}
function lastcapture() {
tint(random(50,255), 0, random(50,255));
image(snapshots[i-2], 0, 90, 320, 50, 0, 90, 320,50);
}
function draw() {
let button;
let snapshots = [];
let img;
let i;
function setup() {
createCanvas(400, 400);
background(51);
video = createCapture(VIDEO);
video.size(320, 240);
button = createButton('capture');
button.mousePressed(takecapture);
button2 = createButton('last');
button2.mousePressed(lastcapture);
}
function takecapture() {
for (i = 0; i < snapshots.length; i++) {
image(snapshots[i], 0,0);
}
}
function lastcapture() {
tint(random(50,255),0,random(50,255));
image(snapshots[i-2], 0, 90, 320, 50, 0, 90, 320,50);
}
function draw() {
let button;
let snapshots = [];
let img;
let i;
function setup() {
createCanvas(400, 400);
background(51);
video = createCapture(VIDEO);
video.size(320, 240);
button = createButton('capture');
button.mousePressed(takecapture);
button2 = createButton('last');
button2.mousePressed(lastcapture);
}
function takecapture() {
for (i = 0; i < snapshots.length; i++) {
image(snapshots[i], 0,0);
}
}
function lastcapture() {
image(snapshots[i-2], 0, 90, 320, 50, 0, 90, 320,50);
}
function draw() {
let button;
let snapshots = [] ;
let img=[];
function setup() { 
createCanvas(400, 400);
background(51);
video = createCapture(VIDEO);
video.size(320, 240);
button = createButton('capture');
button.mousePressed(takecapture); 
} 
function takecapture(){
}
function draw() { 
for (var i = 0; i < snapshots.length; i++){
tint(255,50);
img[i] = createImg(snapshots[i], 0,0);
img[i].position(0,0);
}
}
let button;
let snapshots = [];
let img;
let i;
function setup() {
createCanvas(400, 400);
background(51);
video = createCapture(VIDEO);
video.size(320, 240);
button = createButton('capture');
button.mousePressed(takecapture);
button2 = createButton('last');
button2.mousePressed(lastcapture);
}
function takecapture() {
for (i = 0; i < snapshots.length; i++) {
image(snapshots[i], 0,0);
}
}
function lastcapture() {
image(snapshots[i-3], 0, 150, 320, 80, 0, 150, 50, 50);
}
function draw() {
var button;
function setup() { 
createCanvas(400, 400);
background(51);
video = createCapture(VIDEO);
video.size(320, 240);
button = createButton('capture');
button.mousePressed(takecapture); 
} 
function takecapture(){
image(video, 0,0);
}
function draw() { 
}
function setup() { 
createCanvas(400, 400);
background(220);
video = createCapture(VIDEO);
video.size(320, 240);
} 
function draw() { 
tint(255,mouseX,mouseY);
function setup() { 
createCanvas(400, 400);
background(220);
video = createCapture(VIDEO);
video.size(320, 240);
} 
function draw() { 
tint(255,mouseX,mouseY);
}
let  list=[100,200,300];
let listY=[2,50,80,50];
let dataA=0;
let dataB=0;
function setup() {
frameRate(1);
myGraph = new graph(20,20);
createCanvas(400, 400);
} 
function draw() { 
background(220);
myGraph.show()
if (dataA<list.length){
dataA = dataA+1
}else{
dataA=0;
}
if (dataB<listY.length){
dataB = dataB+1
}else{
dataB=0;
}
test((list[dataA]),(listY[dataB]));
}
function test(myData,otherData){
for (let i=0; i<1; i++){
x = myData;
y=otherData;
fill(x*1,x*3,x*10);
ellipse(x,y,20,20) 
}
}
let  list=[100,200,300];
let listY=[2,50,80,50];
let dataA=0;
let dataB=0;
function setup() {
frameRate(1);
myGraph = new graph(20,20);
createCanvas(400, 400);
} 
function draw() { 
background(220);
myGraph.show()
if (dataA<list.length){
dataA = dataA+1
}else{
dataA=0;
}
if (dataB<listY.length){
dataB = dataB+1
}else{
dataB=0;
}
test((list[dataA]),(listY[dataB]));
}
function test(myData,otherData){
for (let i=0; i<1; i++){
x = myData;
y=otherData;
fill(x*1,x*3,x*10);
ellipse(x,y,20,20) 
}
}
let  list=[2,4,8,16];
function setup() {
data = 10;
myGraph = new graph(20,data);
createCanvas(400, 400);
} 
function draw() { 
background(220);
for (let j=0; j > list.length; j++){
let w = j+10;
}
test([2]);
myGraph.show();
}
function test(myData){
for (let i=0; i< 17; i++){
y = myData;
ellipse(20+i*20,300,20+i,y+i) 
}
}
function setup() {
let data = 0;
myGraph = new graph(20,data);
createCanvas(400, 400);
} 
function mousePressed(){
data = data + 10;
}
function draw() { 
background(220);
write("data
myGraph.show();
}
let size =0;
function setup() {
myGraph = new graph(20,20);
createCanvas(400, 400);
} 
function draw() { 
background(220);
myGraph.show();
let portName = 'COM3';
let data;
function setup() {
createCanvas(400, 400);
Capture= createCapture(VIDEO);
Capture.size(320,240);
Capture.hide();
}
function draw() {
image(Capture,0,0);
background(234);
fill(255);
noStroke();
fill(data,data/2,data/5 +10)
ellipse(width/2, height/2,data,data);
fill(255,0,0);
beginShape(line);
vertex(width/2, width/2);
vertex(2*data+85, 20);
vertex(85, 75);
vertex(30, data +75);
endShape();
}
for (var i = 0; i < portList.length; i++) {
console.log(i + " " + portList[i]);
}
}
function serverConnected() {
}
function portOpen() {
}
}
}
function portClose() {
let portName = 'COM3';
let data;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(234);
fill(255);
noStroke();
fill(data,data/2,data/5 +10)
ellipse(width/2, height/2,data,data);
fill(255,0,0);
beginShape(line);
vertex(width/2, width/2);
vertex(2*data+85, 20);
vertex(85, 75);
vertex(30, data +75);
endShape();
}
for (var i = 0; i < portList.length; i++) {
console.log(i + " " + portList[i]);
}
}
function serverConnected() {
}
function portOpen() {
}
}
}
function portClose() {
let portName = 'COM3';
let data;
function setup() {
createCanvas(400, 400);
}
}
function draw() {
background(220);
background(0);
fill(255);
text("sensor value: " + data, 30, 30);
}
for (var i = 0; i < portList.length; i++) {
console.log(i + " " + portList[i]);
}
}
function serverConnected() {
}
function portOpen() {
}
}
}
function portClose() {
}let pokeData;
function preload(){
data = loadJSON('pokemon.json');
}
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
let i=frameCount%data.pokemon.length;
textSize(15);
text(data.pokemon[i].name,200,200);
textSize(random(100));
text(data.pokemon[i].name_jp,10,300);
mousePressed();
}
function mousePressed(){
text("POKEMON",100,50);
}let words = [red, blue, "farofa", "caxumba", "caramelo", "travesseiro" ];
let index=0;
let
words[0][2];
function setup() { 
createCanvas(400, 400);
colors = [color(255,0,0),color(0,255,0)];
} 
function draw() { 
background(220);
text(words[index],12,200);
}
function mousePressed(){
index = index + 1;
if (index == words.length){
index = 0;
}
}
let words = ["patati", "farofa", "caxumba", "caramelo", "travesseiro" ];
let index=0;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
text(words[index],12,200);
}
function mousePressed(){
index = index + 1;
if (index == words.length){
index = 0;
}
}
function setup() { 
createCanvas(400, 400);
ball = new Ball()
ball2 =new Ball()
ball3 =new Ball()
} 
function draw() { 
background(220);
ball.show(100,40);
ball.move(mouseY/2);
ball.bounce();
ball2.show(200,20);
ball2.move(mouseY/5);
ball2.bounce();
ball3.show(250,2);
ball3.move(mouseY/10);
ball3.bounce();
}
class Ball{
constructor(){
this.x=100;
this.y=100;
this.vector=1;
}
show(posY,size){
ellipse(this.x,posY,size,size);
}
move(speed){
this.x =this.x +speed*this.vector; 
}
bounce(){
if ((this.x>400) || (this.x<0)){
this.vector = this.vector*-1;
}
}
}function setup() { 
createCanvas(400, 400);
ball = new Ball()
} 
function draw() { 
background(220);
ball.show(40);
ball.move(10);
ball.bounce();
ball.show(3);
ball.move(10);
ball.bounce();
}
class Ball{
constructor(){
this.x=100;
this.y=100;
this.vector=1;
}
show(size){
ellipse(this.x,this.y,size,size);
}
move(speed){
this.x =this.x +speed*this.vector; 
}
bounce(){
if ((this.x>400) || (this.x<0)){
this.vector = this.vector*-1;
}
}
}let offset=0;
let x=0;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
BouncingBall(10, 10, 255, 10);
BouncingBall(20, 1, 100, 100);
BouncingBall(10, 50, 0, 200);
}
function BouncingBall(ballPos, ballSpeed, ballColor, ballSize) {
fill(ballColor);
let x = 0;
ellipse(x +offset , ballSize + ballPos, ballSize, ballSize);
offset = offset + ballSpeed/10;
if ((x<0) || (x>width)){
x = offset *-1;
offset = offset + ballSpeed/10;
} 
}let ball = {
x: 300,
y: 200,
xSpeed: 4,
ySpeed: -3
}
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
fill (random(255), 0, random(255));
noStroke();
ellipse(100, 200, 24, 24);
display();
move();
bounce();
}
function display(){
fill (random(145), 50, random(125));
noStroke();
ellipse(ball.x, ball.y, 24, 24);
}
function bounce(){
if (ball.x < 0 || ball.x > width) {	
ball.xSpeed = ball.xSpeed * -1;
}
if (ball.y < 0 || ball.y > height) {
ball.ySpeed = ball.ySpeed * -1;
}
}
function move(){
ball.x = ball.x + ball.xSpeed;
ball.y = ball.y + ball.ySpeed;
}
let startX = 0;
let move = 1;
let moveY=0;
let timeStart=0;
let timeDif=timeEnd - timeStart;
function setup() { 
createCanvas(400, 600);
} 
function draw() { 
background(0);
for (var x = startX; x<=600;  x+= 25){
for (var y=0; y<=25;y+=25){
fill(random(255), 0 , random(255));
ellipse(x ,y*moveY,25,25); 
startX = startX +move;
}
if((startX<=0) || (startX>=length)){
move=move *-1;
moveY+=1;
}
}
}let offset=0;
let x=0;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
BouncingBall(offset,200, 1,200, 50);
function BouncingBall(ballPosX,ballPosY, ballSpeed, ballColor, ballSize) {
noStroke;
fill(random(), ballColor, random());
ellipse(ballPosX , ballPosY, ballSize, ballSize);
offset = offset + ballSpeed;
if ((offset<0) || (offset>400));{
offset =  offset * -1;
}
}
let sliderMax =40;
let sliderMin =350;
let pressed = false;
function setup() { 
createCanvas(400, 400);
x = width/2;
} 
function draw() { 
background(220);
line (40,40,sliderMax, sliderMin);
sliderControl = mouseY;
rect (20,mouseY,40,20);
fill (255);
if (pressed){
fill (40,20,255);
}
if (mouseX >= 20 && mouseX<=60) {
pressed = !pressed;
}
speed = (mouseY/100 * bounce);
y = y + speed;
ellipse (x,y ,20,20);
if (y <=0 || y >= height){
bounce = bounce *-1;
}
}let on = false;
function setup() { 
createCanvas(600, 400);
} 
function draw() { 
if(on){
background (40,150,40);
} else {
background (0);
}
}
function mousePressed() {
on = !on;
}
let sliderMax =40;
let sliderMin =350;
function setup() { 
createCanvas(400, 400);
x = width/2;
} 
function draw() { 
background(220);
line (40,40,sliderMax, sliderMin);
sliderControl = mouseY;
slider = rect (20,sliderControl,40,20);
/speed = map(mouseY,0,height,sliderMax,sliderMin);
speed = (mouseY/10 * bounce)* -1;
y= y + speed;
ellipse (x,y ,20,20);
if (y <=0 || y >= height){
bounce = bounce *-1;
}
function setup() { 
createCanvas(400, 400);
x = width/2;
} 
function draw() { 
background(220);
speed = mouseX/10 * bounce;
y= y + speed;
ellipse (x,y ,20,20);
if (y <=0 || y >= height){
bounce = bounce *-1;
}
}let x = 0;
let y = 0;
let speedY = 1;
let speedX = 1;
let rectY =0
function setup() { 
createCanvas(600, 400);
x = width/2;
} 
function draw() { 
background(220);
ellipse (x, y , 20, 20);
ellipse (x + 20, y + 10 , 40, 10);
y = y + speedY;
x = x + speedX;
noStroke();
if (y <=0 || y >= rectY){
speedY = speedY * -1;
speedX = speedX + random(-0.1,0.5);
}
if (x <=0 || x >=width){
speedX = speedX * -1;
}
rectY = mouseY;
fill (40, y, x);
for (var i =20; i <100; i +=60){
fill (255, i+20, i + mouseY);
}
}let positionX = 0;
let positionY = 200;
let speed = 5;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
positionX = positionX + speed;
positionY = positionY + speed +5;
ellipse (positionY, positionX ,20,20);
if (positionX <0 || positionX > height){
speed = speed * -1;
}
if (positionY <0 || positionY > width){
speed = speed * -1;
}
}var ballPos = 0;
var ballSpeed = 5;
var acceleration = 0.8;
function setup() { 
createCanvas(600, 600);
} 
function draw() { 
background(220);
stroke(100);
ellipse (width/2,ballPos +20,80,80);
ballPos = ballPos + ballSpeed;
if (ballPos >= height -40   || ballPos <= 0){
ballSpeed = ballSpeed * -1;
}
the height of the chamber by clicking and dragging the floor. 
let floor;
let floorHeight =0;
let ball;
let ballSpeed = 0;
let ballPos = 100
function setup() { 
createCanvas(400, 400);
floorHeight = mouseY;
ballSpeed = 0;
ballPos = width/2;
} 
function draw() { 
background(220);
floor = rect(0, mouseY, width -1, height);
fill (20,20,20,20)
ellipse (ballPos  ,ballSpeed +10 ,20,20);
ballSpeed = ballSpeed +5;
if (ballspeed > height){
ballspeed = balspeed -3;
}
ellipse
the height of the chamber by clicking and dragging the floor. 
let floor;
let floorHeight = 200;
let ball;
let ballSpeed;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
rect(0, height/2, width -1, floorHeight);
floorHeight = floorHeight -4;
the height of the chamber by clicking and dragging the floor. 
let floor;
let floorHeight = 200;
let ball;
let ballSpeed;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
rect(0, height/2, width -1, floorHeight);
floorHeight = floorHeight -4;
}var angle = 0.0;
var offset = 60;
var scalar = 50;
var speed = 0.05;
function setup() { 
createCanvas(400, 400);
background(220);
} 
function draw() { 
noStroke();
var x = offset + cos(angle) * scalar;
var y = offset + sin(angle) * scalar;
fill (x,y+ random(10,200),y+100);
ellipse (x , y+ random (40, 40), x, 50);
angle += speed;
if (mouseIsPressed){
scalar = x; 
offset = random (20, 80);
}
}function setup() { 
createCanvas(400, 400);
rectMode(CENTER);
background(0);
} 
function draw() { 
stroke (20,20,20,0);
}
fill (25,255,100)
fill(mouseY, mouseX, 20, mouseX/mouseY +10);
} else {
fill(mouseX, mouseY, mouseY/2, mouseX);
}
ellipse(mouseX, mouseY, 80, 80);
function mouseIsPressed (){
fill(20,20,20);
rect (mouseX,mouseY,50,50);
}
function setup() { 
createCanvas(400, 400);
background(220);
} 
function draw() { 
fill(mouseX);
line(mouseY, mouseX, 10, 10);
noStroke();
for (var i = 20; i < 400; i += 20) {
rect(i, 20, i + 20, 20); 
}
translate (mouseX, mouseY);
rect(0, 0, 30, 30);
translate(35, 10);
if (mouseIsPressed) {
fill(mouseY, mouseX, 20, mouseX/mouseY +10);
} else {
fill(mouseX, mouseY, mouseY/2, mouseX);
}
ellipse(mouseX, mouseY, 80, 80);
}function setup() { 
createCanvas(400, 400);
rectMode(CENTER);
background(220);
} 
function draw() { 
stroke (20,20,20,0);
fill (25,255,100)
rect(200,200,20,20);
if (mouseIsPressed) {
fill(mouseY, mouseX, 20, mouseX/mouseY +10);
} else {
fill(mouseX, mouseY, mouseY/2, mouseX);
}
ellipse(mouseX, mouseY, 80, 80);
}function setup() { 
createCanvas(320, 320);
} 
function draw() { 
background(220);
ellipseMode(RADIUS);
ellipse (175,118,20,5)
}