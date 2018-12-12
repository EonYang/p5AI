var size = 0;
var buttonValue1;
var buttonValue2;
var buttonValue3;
var joyValue1;
var joyValue2;
var joyValue3;
var joyValue4;
var quantity, inString;
let api_key = "api_key=59GZx8ykG5JMCrU1TJVKIUP08BjXWMYO"
let searchq = "&q="
let limit = "&limit=100"
let endURL = "&offset=0&rating=G&lang=en"
let gifs = [];
let full_qURL = api + api_key + searchq + limit + endURL;
var findV;
var executed = false;
function setup() {
}
function draw() {
}
for (var i = 0; i < portList.length; i++) {
}
}
if (inString.length > 0) {
buttonValue1 = sensors[0];
buttonValue2 = sensors[1];
buttonValue3 = sensors[2];
joyValue1 = sensors[3];
joyValue2 = sensors[4];
joyValue3 = sensors[5];
joyValue4 = sensors[6];
console.log("sensors =" + sensors);
if (buttonValue1 == '1') {
findV = 'sky'
find(findV);
}
if (buttonValue2 == '1') {
findV = 'earth'
find(findV);
}
if (buttonValue3 == '1') {
findV = 'ocean'
find(findV);
}
if (joyValue1 == '1') {
findV = 'Elmo'
find(findV);
}
if (joyValue2 == '1') {
findV = 'Big bird'
find(findV);
}
if (joyValue3 == '1') {
findV = 'Cookie Monster'
find(findV);
}
if (joyValue4 == '1') {
findV = 'monkey business'
find(findV);
}
}
}
}
function find(quantity) {
full_qURL = api + api_key + searchq + findV + limit + endURL;
gifData = loadJSON(full_qURL, gotData);
}
function gotData(unicorn) {
gifs = [];
for (let i = 0; i < 100; i++) {
gifs.push(unicorn.data[i].images.original.url);
}
if (gifs.length > 0) {
img = createImg(random(gifs));
img.style('width','100%')
}
var size = 0;
var buttonValue1;
var buttonValue2;
var buttonValue3;
var quantity, inString;
let api_key = "api_key=59GZx8ykG5JMCrU1TJVKIUP08BjXWMYO"
let searchq = "&q="
let limit = "&limit=100"
let endURL = "&offset=0&rating=G&lang=en"
let gifs = [];
let full_qURL = api + api_key + searchq + limit + endURL;
var findV;
var executed = false;
function setup() {
createCanvas(windowWidth,windowHeight);
}
function draw() {
}
for (var i = 0; i < portList.length; i++) {
}
}
if (inString.length > 0) {
buttonValue1 = sensors[0];
buttonValue2 = sensors[1];
buttonValue3 = sensors[2];
console.log("sensors =" + sensors);
if (buttonValue1 == '1') {
findV = 'sky'
find(findV);
}
if (buttonValue2 == '1') {
findV = 'earth'
find(findV);
}
if (buttonValue3 == '1') {
findV = 'ocean'
find(findV);
}
}
}
}
function find(quantity) {
full_qURL = api + api_key + searchq + findV + limit + endURL;
gifData = loadJSON(full_qURL, gotData);
}
function gotData(unicorn) {
gifs = [];
for (let i = 0; i < 100; i++) {
gifs.push(unicorn.data[i].images.original.url);
}
if (gifs.length > 0) {
img = createImg(random(gifs));
}
var size = 0;
var buttonValue1;
var buttonValue2;
var buttonValue3;
var quantity, inString;
let api_key = "api_key=59GZx8ykG5JMCrU1TJVKIUP08BjXWMYO"
let searchq = "&q="
let limit = "&limit=100"
let endURL = "&offset=0&rating=G&lang=en"
let gifs = [];
let full_qURL = api + api_key + searchq + limit + endURL;
var findV;
var executed = false;
function setup() {
}
function draw() {
}
for (var i = 0; i < portList.length; i++) {
}
}
if (inString.length > 0) {
buttonValue1 = sensors[0];
buttonValue2 = sensors[1];
buttonValue3 = sensors[2];
console.log("sensors =" + sensors);
if (buttonValue1 == '1') {
findV = 'sky'
find(findV);
}
if (buttonValue2 == '1') {
findV = 'earth'
find(findV);
}
if (buttonValue3 == '1') {
findV = 'ocean'
find(findV);
}
}
}
}
function find(quantity) {
full_qURL = api + api_key + searchq + findV + limit + endURL;
gifData = loadJSON(full_qURL, gotData);
}
function gotData(unicorn) {
gifs = [];
for (let i = 0; i < 100; i++) {
gifs.push(unicorn.data[i].images.original.url);
}
if (gifs.length > 0) {
img = createImg(random(gifs));
img.style('width','100%')
}
var size = 0;
var buttonValue1;
var buttonValue2;
var buttonValue3;
let api_key = "api_key=59GZx8ykG5JMCrU1TJVKIUP08BjXWMYO"
let searchq = "&q="
let limit = "&limit=100"
let endURL = "&offset=0&rating=G&lang=en"
let gifs = [];
let full_qURL = api + api_key + searchq + limit + endURL ;
var findV;
var executed = false;
function setup() {
noCanvas()
}
function draw() {
}
for (var i = 0; i < portList.length; i++) {
}
}
if(sensors[1]==1){
findV = "sky"
find(findV);
}
}
function find (quantity){
full_qURL = api + api_key + searchq + findV + limit + endURL ;
gifData = loadJSON (full_qURL, gotData);
}
function gotData (unicorn) {
for (let i = 0; i < 100; i++){
gifs.push(unicorn.data[i].images.original.url);
}
if (gifs.length > 0) {
img=createImg(random(gifs));
}     
}
var size = 0;
var buttonValue1;
var buttonValue2;
var buttonValue3;
let api_key = "api_key=59GZx8ykG5JMCrU1TJVKIUP08BjXWMYO"
let searchq = "&q="
let limit = "&limit=100"
let endURL = "&offset=0&rating=G&lang=en"
let gifs = [];
let full_qURL = api + api_key + searchq + limit + endURL ;
var findV;
var executed = false;
function setup() {
noCanvas()
}
function draw() {
}
for (var i = 0; i < portList.length; i++) {
}
}
if (inString.length > 0 ) {
if (sensors.length > 2){
buttonValue1 = sensors[0];
buttonValue2 = sensors[1];
buttonValue3 = sensors[2];
console.log("sensors ="+sensors);
}
}
}
function find (quantity){
full_qURL = api + api_key + searchq + findV + limit + endURL ;
gifData = loadJSON (full_qURL, gotData);
}
function gotData (unicorn) {
for (let i = 0; i < 100; i++){
gifs.push(unicorn.data[i].images.original.url);
}
if (gifs.length > 0) {
img=createImg(random(gifs));
}     
}
var size = 0;
let api_key = "api_key=59GZx8ykG5JMCrU1TJVKIUP08BjXWMYO"
let searchq = "&q="
let limit = "&limit=100"
let endURL = "&offset=0&rating=G&lang=en"
let gifs = [];
let full_qURL = api + api_key + searchq + limit + endURL ;
var findV;
var executed = false;
function setup() {
noCanvas()
}
function draw() {
}
for (var i = 0; i < portList.length; i++) {
}
}
if (quantity < 15) {
if (!executed) {
executed = true;
findV = "sky"
find(findV);
}
if (!executed) {
executed = true;
findV = "earth"
find(findV);
}
if (!executed) {
executed = true;
findV = "ocean"
find(findV);
}
} else {
if (!executed) {
executed = true;
findV = ""
find(findV);
}
}
}
function find (quantity){
full_qURL = api + api_key + searchq + findV + limit + endURL ;
gifData = loadJSON (full_qURL, gotData);
}
function gotData (unicorn) {
for (let i = 0; i < 100; i++){
gifs.push(unicorn.data[i].images.original.url);
}
if (gifs.length > 0) {
img=createImg(random(gifs));
}     
}
var size = 0;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
stroke(1);
ellipse(200,200,size,size)
}
for (var i = 0; i < portList.length; i++) {
}
}
}
var inData;
function setup() {
createCanvas (400,300);
}
function draw() {
background(0);
fill(255)
text("sensor value: " + inData, 30, 30);
}
function serverConnected() {
}
function portOpen() {
}
}
}
function portClose() {
var nums = [10,20,30,40]
var color = [40,50,60,50]
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
for (i = 0; i<4; i++){
stroke(255)
ellipse (i*100+100, 150, nums[i], nums[i])
}
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
let bubble1 
let bubble2
function setup() {
createCanvas(400, 400);
bubble1 = new bubble();
bubble2 = new bubble();
}
function draw() {
background(0);
bubble1.move();
bubble1.show();
bubble2.move();
bubble2.show();
}
class bubble {
constructor() {
this.x = 100
this.y = 200
}
move() {
this.x = this.x + random(-5,5);
this.y = this.y + random(-5,5);
}
show() {
stroke(255);
ellipse (this.x, this.y, 24, 24)
}
}var weather;
var cathead;
var apiKey = "&APPID=55685e36d4913f761d5359206df0b999";
var units = '&units=metric';
function preload() {
cathead = loadImage('cathead.png');
}
function setup() {
createCanvas(600, 600);
var button = select('#submit');
button.mousePressed(weatherAsk);
input = select('#city');
}
function draw() {
background(250);
image(cathead,200,200,200,200);
}
function weatherAsk() {
var url = api + input.value() + apiKey + units;
loadJSON(url, gotData);
}
function gotData(data) {
weather = data;
console.log(data.main.temp);}
function catjiggle () {
}let lines = [];
let i = 0;
function setup() {
createCanvas(400, 400);
loadStrings("test.txt", doText);
i = document.cookie;
}
function doText(data) {
console.log(data);
lines = data;
} 
function draw() {
background(255,255,255);
text(lines[i], 5, 20*i+20);
text(i, 20, 20, 20);
}
function mousePressed() {
i++; 
console.log(lines[i]);
document.cookie("i="+i);
let api_key = "api_key=59GZx8ykG5JMCrU1TJVKIUP08BjXWMYO"
let searchq = "&q="
let limit = "&limit=100"
let endURL = "&offset=0&rating=G&lang=en"
let gifs = [];
let full_qURL = api + api_key + searchq + limit + endURL ;
function setup() {
noCanvas();
p = createP('What is on your mind?');
input = createInput('...');
button = createButton('keep thinking');
button.mousePressed(find);
}
function draw() {
background(220);
}
function find (){
let findV = input.value();
full_qURL = api + api_key + searchq + findV + limit + endURL ;
gifData = loadJSON (full_qURL, gotData);
}
function gotData (unicorn) {
for (let i = 0; i < 100; i++){
gifs.push(unicorn.data[i].images.original.url);
}
if (gifs.length > 0) {
img=createImg(random(gifs));
} 
}var size = 0;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
stroke(1);
ellipse(200,200,size,size)
}
for (var i = 0; i < portList.length; i++) {
}
}
}
let input;
function setup() {
createCanvas(400, 400);
h1 = createElement ("h1","Here is a headline");
h1.mousePressed(h1Callback);
two = select('#two');
input = select('#textInput');
}
function inputCallback() {
alert(input.value());
}
function draw() {
background(220)
}
function h1Callback(){
alert("Hey Stop");
}
function mousePressed() {
two.html("New Stuff");
}let Tom;
let Midori
function setup() {
createCanvas(400, 400);
Tom = new ITPer("Professor","Tom Igoe", "1997","pcomp", "male");
Midori = new ITPer ("Staff","Midori Yasuda","2000","management","female");
Tom.tellMeYourName();
Midori.tellMeYourName();
Tom.tellMeYourRole();
Midori.tellMeYourRole();
}
function draw() {
background(220);
}
class ITPer {
this.role = role;
this.name = name;
this.classYear = classYear;
this.skill = skill;
this.sex = sex;
}
console.log("name",this.name);
}
tellMeYourRole() {
console.log("role",this.role);         
}
}
function setup() {
createCanvas(400, 400);
}
function draw() {
background(mouseX,mouseY/mouseX,mouseX-mouseY);
rectMode(CENTER);
drawSomething(mouseX, mouseY, mouseY);
for (var i = mouseY; i>0; i--){
fill(0,0,i);
stroke(i);
rect(mouseX+50,mouseY+50,i,i);
}
}
function drawSomething(x,y,s) {
fill(s,0,0);
noStroke();
rect(x,y,s,s);
if (s>10) {
drawSomething(x,y,s-10);
}
}
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
rectMode(CENTER);
drawSomething(mouseX, mouseY, mouseY);
}
function drawSomething(x,y,s) {
fill(s,0,0);
noStroke();
rect(x,y,s,s);
if (s>10) {
drawSomething(x,y,s-10);
}
}
class ball {
constructor(x, y, s, xdir, ydir) {
this.x = x
this.y = y
this.s = s
this.xdir = xdir
this.ydir = ydir
}
display() {
strokeWeight(0);
r = random(0, 255);
g = random(0, 255);
b = random(0, 255);
fill(r, g, b)
ellipse(this.x, this.y, this.s, this.s)
}
goalkeepermove() { 
frameRate(5)
fill(210, 180, 140)
this.x = 200 + 100 * sin(this.x + 2 * PI / 360);
}
footballmove() {
this.xdir = this.xdir + random(-2, 2)
this.ydir = this.ydir - random(100, 30)
this.x =this.x +this.xdir
this.y =this.y +this.ydir
}
}
let football = new ball(100, 350, 40, 1, 1)
let goalkeeperClass = new ball(200, 140, 50)
let yspeed =10;
let goalkeeper;
var x = 200;
var y = 350;
var r;
var g;
var b;
function setup() {
createCanvas(400, 400);
goalkeeper = PI;
}
function mouseReleased() {
football.footballmove(); 
}
function draw() {
line(110, 50, 280, 50);
line(105, 50, 105, 90);
line(280, 50, 280, 90);
stroke(255, 255, 255);
football.display()
goalkeeperClass.display()
goalkeeperClass.goalkeepermove()
textSize(20);
fill(0)
text('Kick!', mouseX, mouseY);
fill(0, 102, 153, 51);
text('', 10, 90);
}
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
rectMode(CENTER);
drawSomething(mouseX, mouseY, 200);
}
function drawSomething(x,y,s) {
rect(x,y,s,s);
if (s>10) {
drawSomething(x,y,s-10);
}
}
class Ball {
constructor(xx, yy, xxdir, yydir, rr) {
this.y = yy;
this.xdir = xxdir;
this.ydir = yydir;
this.r = rr;
}
move() {
this.x = this.x + this.xdir;
this.y = this.y + this.ydir;
}
if (this.x <= 0 || this.x >= width) {
this.xdir = this.xdir * -1;
}
if (this.y <= 0 || this.y >= height) {
this.ydir = this.ydir * -1;
}
}
display() {
ellipse(this.x, this.y, this.r, this.r);
}
stop() {
this.stopped = true;
}
start() {
this.stopped = false;
}
}
let b, b1;
function setup() {
createCanvas(400, 400);
b = new Ball(50, 50, 1, 2, 50);
b1 = new Ball(90, 80, 2, 1, 40);
}
function draw() {
background(220);
b.move();
b1.move();
b.display();
b1.display();
if (mouseIsPressed) {
b.stop();
} else {
b.start()
}
}let ball = {
x:100,
y:100,
d:50,
xspeed:1,
yspeed:1
}
let beachBall = {
x:100,
y:100,
d:50,
xspeed:1,
yspeed:1
}
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
displayBall();
moveBall();
bounceBall();
}
function displayBall(){
ellipse(ball.x,ball.y,ball.d,ball.d);
}
function moveBall() {
ball.x = ball.x +ball.xspeed;
ball.y = ball.y +ball.yspeed;
}
function bounceBall(){
if (ball.x<=0 || ball.x >=width) {
ball.xspeed = ball.xspeed*-1;
}
if (ball.y<=0 || ball.y>=height){
ball.yspeed = ball.yspeed*-1;
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
drawCircle();
drawCircle(10,50);
drawCircle(0,60);
drawCircle(100,70);
drawCircle(75,80);
for (let i= 0; i<8; i++){
drawCircle(random(0,100),random(0,100));
}
}
function drawCircle(offset,diameter) {
fill(random(0,100), random(0,255), random(0,255));
ellipse(mouseX+offset, mouseY+offset, diameter, diameter)
function myDist (x1, y1, x2,y2) {
return sqrt(pow(x2-x1),2+pow(y2-y1),2));
}
}var slider;
function setup() {
createCanvas(400, 400);
slider = createSlider(0, 255, 0);
slider.position(10, 10);
slider.style('width', '80px');
}
function draw() {
var val = slider.value();
background(val);
fill(180, 50, 80);
rect(val, 250, 100, 50);
for (var i = 0; i < 400; i += 30) {
for (var m = 0; m < 400; m += 10) {
line(i, m, i * .5, m * .5);
line(val, val, i * val, m * i);
rect(i, val, 100, 50);
rect(val, i, 100, 50);
stroke(255, val, 25);
}
if (mouseIsPressed) {
ellipse(200, 200, mouseX, mouseX)
}
}
}var slider;
function setup() {
createCanvas(400, 400);
slider = createSlider(0, 255, 100);
slider.position(10, 10);
slider.style('width', '80px');
}
function draw() {
var val = slider.value();
background(val);
fill(180, 50, 80);
rect(175, 250, 100, 50);
if (mouseIsPressed && mouseX > 175 && mouseX < 275 && mouseY > 250 && mouseY < 300) {
}
for (var i = 0; i < 400; i += val) {
for (var m = 0; m < 400; m += 10) {
line(0,0,i,m * val)
stroke(255, val, 25)
}
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(30,200,220);
crosshairs();
}
function crosshairs() {
var x3 = map(mouseX, 0, width, 0, 400);
var x4 = map(mouseX, 0, width, 0, 400);
strokeWeight(5);
var x3 = map(mouseX, 0, width, 0, 400);
line(x3, 0, x3, 600);
var x4 = map(mouseX, 0, width, 0, 400);
line(0, x4, 400, x4)
noFill()
ellipse (x3,x4,100,100)
}
function bird() {
noStroke();
for (var i = 0; i < 10; i ++) {
ellipse(0, 30, 20, 80);
rotate(PI/15);
}
}
let x,y;
let xdir = 1;
let ydir = 1;
function setup() {
createCanvas(400, 400);
x =10;
y=10;
}
function draw() {
background(220);
ellipse(x,y,20,20);
if (mouseX >200 && mouseX <300 && mouseY<300 && mouseY>200) {
xdir = 0;
ydir =0 ;
}
} 
x=x + xdir;
y=y + ydir;
if (y ==height){
ydir = -1;
}
if (x==width) {
xdir = -1;
}
if (x<=0) {
xdir = 1;
}
if (y<=0) {
ydir = 1;
}
}
let goalkeeper;
var x = 200;
var y = 350;
var r;
var g;
var b;
function setup() {
createCanvas(400, 400);
goalkeeper = PI;
}
function draw() {
r = random (0,255);
g = random (0,255);
b = random (0,255);
fill(210, 180, 140)
ellipse( 200 + 100*sin(goalkeeper), 140, 50, 50);
goalkeeper= goalkeeper+ 2*PI/360;
line(110, 50, 280, 50);
line(105, 50, 105, 90);
line(280, 50, 280, 90);
stroke(255, 255, 255);
fill (r,g,b)
ellipse(x, y, 40, 40)  
textSize(20);
fill(0)
text('Kick!', mouseX, mouseY);
fill(0, 102, 153, 51);
text('', 10, 90);
}
x = x + random(-20,20)
y = y - random(100,30)
}
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
}function setup() {
createCanvas(400, 400);
}
carriesijiawang@gmail.com
function draw() {
background(220);
let ball;
function setup() {
createCanvas(400, 400);
ball = {
x:10,
y:100,
width:50
};
}
function draw() {
background(220);
fill(mouseX);
ellipse (ball.x, ball.y, ball.width, ball.width);
ball.x = mouseY;
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(255, 204, 0);
fill(250,250,170);
ellipse(200, 200, 380,380);
fill(100,200,100)
ellipse(125,100,50,50);
fill(150,200,100)
ellipse(275,100,50,50);
fill(255,100,100)
arc(180, 300, 70, 70, 0, PI + QUARTER_PI, OPEN);
fill(350,250,350)
ellipse(190,180,100,100)
push();
fill(200,250,255)
translate(150,0);
triangle(30, 75, 58, 20, 86, 75);
pop();
textSize(32);
text('Pizza', 10, 30);
fill(0, 102, 153);
text('', 10, 60);
fill(0, 102, 153, 51);
text('Media', 10, 90);
textSize(25);
text('Paper', 330, 350);
fill(0, 102, 153);
text('Plates', 330, 380);
fill(0, 102, 153, 51);
text('', 330, 410);
}let s = ""
let p;
function setup() {
createCanvas(400, 400);
p =createP("");
frameRate (1);
}
function draw() {
let x = random (width);
let y = random (height);
ellipse(x,y,50,50);
let c = random (96,127);
c = round(c);
c = char(c);
s = s +c;
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(255, 204, 0);
fill(250,250,170);
ellipse(200, 200, 380,380);
fill(100,200,100)
ellipse(125,100,50,50);
fill(150,200,100)
ellipse(275,100,50,50);
fill(255,100,100)
arc(180, 300, 70, 70, 0, PI + QUARTER_PI, OPEN);
fill(350,250,350)
ellipse(190,180,100,100)
push();
fill(200,250,255)
translate(150,0);
triangle(30, 75, 58, 20, 86, 75);
pop();
textSize(32);
text('Pizza', 10, 30);
fill(0, 102, 153);
text('', 10, 60);
fill(0, 102, 153, 51);
text('Media', 10, 90);
textSize(25);
text('Paper', 330, 350);
fill(0, 102, 153);
text('Plates', 330, 380);
fill(0, 102, 153, 51);
text('', 330, 410);
}function setup() {
createCanvas(400, 400);
background(600)
fill(0,0,200)
stroke (255,0,0);
ellipse(200,200,300,300);
stroke(0);
strokeWeight(1);
rect(250,10,50,50);
stroke(0);
strokeWeight(1);
rect(100,10,50,50);
line(30, 20, 85, 75);
createP("My name is Bilal");
}
function draw() {
}