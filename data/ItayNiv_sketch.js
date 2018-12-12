function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
}var currColor = 0;
var nextColor = 0;
var limit = true;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(nextColor);
if ((currColor >= 1) && (limit=true)){
nextColor ++;
if (nextColor >= 200){
nextColor = 200;
limit = false;
console.log(nextColor);
}
}
}
function keyPressed() {
if (keyCode === UP_ARROW) {
if (limit=true){
currColor = currColor + 6;
}
}
if (keyCode === DOWN_ARROW) {
if (limit=true){
currColor --;
}
}
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
var rain = [];
var rainCount = 100;
var raindir = 0;
function setup() { 
createCanvas(600, 400);
for (var i = 0; i < rainCount; i++) {
rain.push(new Rain(random(width), random(height)));	
}
} 
function draw() { 
background(0,0,0,90);
raindir = mouseX;
for (var i = 0; i < rainCount; i++) {
rain[i].update();
rain[i].draw();
}
}
function Rain(x, y) {
this.x = x;
this.y = y;
this.velocity = 0.1;
this.len = 3;
this.r = raindir;
this.opacity = 200;
this.margin = 50;
this.update = function() {
this.y += this.len;
this.x += -this.len * sin(radians(this.r));
if (this.y >= height + random(this.margin))
this.y -= height + this.margin;
if (this.x < -random(this.margin))
this.x += width + this.margin;
};
this.draw = function() {
stroke(255);
push();
translate(this.x, this.y);
rotate(radians(this.r));
line(0, 0, 0, this.len);
pop();
};
}
var animinstance;
function setup() { 
createCanvas(400, 400);
animinstance = new Animator(0,0,width,1,1.1);
} 
function draw() { 
background(255);
animinstance.displayRect();
}var xsize = 20;
var ysize = 5;
var animspeed = 1.05;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(255);
translate(width/2, height/2);
rotate(1x0);
push();
fill(40,255,90);
rect(0,200,width,ysize);
ysize = ysize *= animspeed;
console.log(ysize);
pop();
if (ysize > 200){
animspeed = 0.95;
}
if (ysize < 4){
animspeed = 1.05;
}
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
}var x = 200;
var y = 200;
var currX = 0;
var currY = 0;
var DimX = 30;
var DimY = 30;
var gravity = .08;
var wind = 0;
var speedY = 1;
var speedX = 0;
var particles = [];
function setup() { 
createCanvas(400, 400);
background(0);
} 
function draw() { 
background(0,0,0,255);
noStroke();
ellipse(x,y,DimX);
speedY = speedY + gravity;
speedX = speedX + wind;
y = y + speedY;
x = x + speedX;
if (y >= height-DimX/2){
speedY = -speedY;
}
if (y <= 0DimX/2){
speedY = -speedY;
}
if (x >= width - DimX/2){
speedX = -speedX;
}
if (x <= 0+DimX/2){
speedX = -speedX;
}
}
function keyPressed() {
if (keyCode === UP_ARROW) {
gravity = gravity + .05;
} else if (keyCode === DOWN_ARROW) {
gravity = gravity - .05;
} else if (keyCode === LEFT_ARROW) {
wind = wind - .05;
}
else if (keyCode === RIGHT_ARROW) {
wind = wind + .05;
}
}
var curY = 100;
var speedY = 0;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
ellipse(30,curY,30);
curY = curY / gravity;
speedY = speedY + gravity;
}
var m, n;
var spiral;
var usingColor = true;
function setup() 
{
createCanvas(800, 800);
smooth();
colorMode(HSB);
restart();
}
function restart()
{
m = 10;    
n = 10;
while (m*n > 99 || m*n < 16) {
m = floor(random(2, 10));
n = floor(random(2, 10));
}
spiral = new Spiral();
}
function draw()
{
fill(255);
noStroke();
text("new one", 5, 16);
text("toggle color", 5, 38);
var t1x = map(noise(0.01*frameCount,20), 0, 1, -300, 300);
var t1y = map(noise(0.01*frameCount,30), 0, 1, -300, 300);
var t2x = map(noise(0.01*frameCount,40), 0, 1, -300, 300);
var t2y = map(noise(0.01*frameCount,50), 0, 1, -300, 300);
push();
fill(0, 125);
rect(0, 0, width, height);
pop();
translate(width/2, height/2);
for (var i = 0; i < m; i++)
{
push();
rotate(map(i, 0, m, 0, TWO_PI));
translate(t1x, t1y);
for (var j = 0; j < n; j++)
{
push();
rotate(map(j, 0, n, 0, TWO_PI));
translate(t2x, t2y);
spiral.draw();
pop();
}
pop();
}  
}
function keyPressed() { 
if (key==' ') restart();
if (key=='c') usingColor = !usingColor;
}
function mousePressed() {
if (mouseX < 50 && mouseY < 20) restart();
if (mouseX < 75 && mouseY > 20 && mouseY < 40) usingColor = !usingColor;
}
function Spiral()
{
this.h = random(255);
this.angleNoiseFactor = random(0.005);
this.n = floor(random(6, 12));
this.angleBoundary1 = 0;
this.angleBoundary2 = 0;
while (abs(this.angleBoundary1-this.angleBoundary2) < 12*PI) {
this.angleBoundary1 = random(-24*PI, 24*PI);
this.angleBoundary2 = random(-24*PI, 24*PI);
}
this.draw = function()
{    
strokeWeight(3);
if (usingColor) {
fill(this.h, 255, 255, 25);
stroke((this.h + 127) % 255, 255, 255, 60);
} else {
fill(255, 15);
stroke(120, 50);
}
var marginX = map(noise(0.01*frameCount,70), 0, 1, -350, 350);
var marginY = map(noise(0.01*frameCount,80), 0, 1, -350, 350);
var maxAngle = lerp(this.angleBoundary1, this.angleBoundary2, noise(frameCount * this.angleNoiseFactor));
push();
beginShape();
for (var i = 0; i < n; i++) {
var ang = map(i, 0, n, 0, maxAngle);
var mx = map(i, 0, n, 0, marginX);
var my = map(i, 0, n, 0, marginY);
var x = mx * cos(ang);
var y = my * sin(ang);
curveVertex(x, y);
}
endShape();
pop();
}
}
function setup(){
createCanvas(600, 600)
}
function draw(){
background(20);
var recta = new rectangle(80,89,90,60,255);
console.log(work"
}
var tinycircles = [];
var smallcircles = [];
var mediumcircles = [];
var largecircles = [];
var diagonal = [];
var capture_video;
var w = 0;
var h = 0;
var absoluteWhite = 255;
var lightGrey = 213;
var darkGrey = 170;
var grey = 127;
var lightBlack = 86;
var midBlack = 43
var absoluteBlack = 10;
var matX = 40;
var matY = 20;
var echo=0;
var winddirectionX = 0;
var winddirectionY = 10;
function setup() {
w = windowHeight*1.3;
h = windowHeight;
createCanvas(matX, matY);
capture_video = createCapture(VIDEO);
capture_video.size(matX, matY);
capture_video.hide();
createCanvas(w, h);
noStroke();
background(0);
}
function draw() {
echo ++;
if (echo >= 50){
echo=50;
}
if (mouseIsPressed){
echo=0;
}
background(0);
var hr = h / capture_video.height
var wr = w / capture_video.width
for (var i = 0; i < tinycircles.length; i++) {
tinycircles[i].display();
if (tinycircles[i].fill <= 0) {
tinycircles.splice(i,1);
}
}
for (var i = 0; i < smallcircles.length; i++) {
smallcircles[i].display();
if (smallcircles[i].fill <= 0) {
smallcircles.splice(i,1);
}
}
for (var i = 0; i < mediumcircles.length; i++) {
mediumcircles[i].display();
if (mediumcircles[i].fill <= 0) {
mediumcircles.splice(i,1);
}
}
for (var i = 0; i < largecircles.length; i++) {
largecircles[i].display();
if (largecircles[i].fill <= 0) {
largecircles.splice(i,1);
}
}
for (var i = 0; i < capture_video.width; i++) {
for (var c = 0; c < capture_video.height; c++) {
var pixel = capture_video.get(i,c)[0];
if (pixel < midBlack)  {
var nc = new smallCircle(i * wr,c * hr,1,random((-pixel/8),(pixel/8)),random(0,pixel/2));
smallcircles.push(nc);
}
if ((pixel < lightBlack) && (pixel > midBlack )) {
var mc = new mediumCircle(i * wr,c * hr,2,random((-pixel/8),(pixel/8)),random(0,pixel/2));
mediumcircles.push(mc);
}
if ((pixel < lightGrey) && (pixel > darkGrey )) {
var lc = new largeCircle(i * wr,c * hr,3,random(-1,1),random(0,pixel/2));
largecircles.push(lc);
}
if ((pixel < absoluteWhite) && (pixel > lightGrey )) {
var tc = new tinyCircle(i * wr,c * hr,.5,random((-pixel/8),(pixel/8)),random(0,pixel/2));
tinycircles.push(tc);
}
}
}
}
var capture_video;
var w = 700;
var h = 500;
var absoluteWhite = 255;
var lightGrey = 213;
var darkGrey = 170;
var grey = 127;
var lightBlack = 86; 
var midBlack = 43
var absoluteBlack = 10;
var matX = 65;
var matY = 45;
var echo=0;
function setup() {
createCanvas(matX, matY);
capture_video = createCapture(VIDEO);
capture_video.size(matX, matY);
capture_video.hide();
createCanvas(w, h);
noStroke();
background(0);
}
function draw() { 
echo ++;
if (echo >= 100){
echo=100;
}
if (mouseIsPressed){
echo=0;
}
console.log(255-echo);
background(0,0,0,255-echo);
var hr = h / capture_video.height
var wr = w / capture_video.width
for (var i = 0; i < capture_video.width; i++) {
for (var c = 0; c < capture_video.height; c++) {
var pixel = capture_video.get(i,c)[0];
if(pixel >= 0) {
}
if((pixel < absoluteWhite) && (pixel > darkGrey )) {
fill(90,90,90,90);
rect(i * wr, c * hr, wr / 3, hr / 3);
}
if((pixel < darkGrey) && (pixel > lightGrey )) {
rect(i * wr, c * hr, wr / 6, hr / 6);
}
if((pixel < absoluteWhite) && (pixel > lightGrey )) {
fill(255,255,255);
rect(i * wr, c * hr, wr / 2, hr / 2);      
}
else if ((pixel < grey) && (pixel > lightBlack )) {
fill(255);
ellipse(i * wr + wr / 2, c * hr + hr / 2, wr / 4.5 , hr / 4.5);
}
else if ((pixel > absoluteBlack) && (pixel < midBlack )) {
stroke(255);
line( i * wr + wr / 2  ,  c * hr + hr / 2  ,i * wr  , c * hr);
}
else if (pixel > absoluteBlack) {
stroke(255);
point(i * wr + wr / 2, c * hr + hr / 2);
}
else if ((pixel > midBlack) && (pixel < lightBlack )) {
stroke(255);
line( i * wr - wr / 2  ,  c * hr + hr / 2  ,i * wr  , c * hr);
}
else if ((pixel > 10) && (pixel < 250 )) {
stroke(255);
line( i * wr + wr / 2  ,  c * hr + hr / 2  ,i * wr  , c * hr);
}
}
}
}var sqSize = 30;
var sqX = 0;
var sqY = 0;
var currX = 0;
var currY = 0;
function setup() {
createCanvas(windowWidth, windowHeight);
background(255);
frameRate(60);
sqX = width/2;
sqY = height/2;
currX = width/2;
currY = height/2;
}
function draw() {
background(255);
noStroke();
fill(60);
fill(25);
if  (( mouseX < (currX + sqSize/2)) &&
( mouseX > (currX - sqSize/2)) &&
( mouseY < (currY + sqSize/2)) &&
( mouseY > (currY - sqSize/2)) &&
(mouseIsPressed)
){
fill(20,240,1);
noStroke();
ellipse(currX,currY, sqSize);
}
else {
rectMode(CENTER);
rect(sqX,sqY,sqSize,sqSize);
}
if ( ( mouseX < (currX + sqSize/2)) &&
( mouseX > (currX - sqSize/2)) &&
( mouseY < (currY + sqSize/2)) &&
( mouseY > (currY - sqSize/2)))
{
fill(20,240,1);
noStroke();
}
if (mouseIsPressed){
sqX = mouseX;
sqY = mouseY;
currY = mouseY;
currX = mouseX;
}
}
var a = 0;
var r = 2;
var sqSize = 50;
var sqX = 0;
var sqY = 0;
var currX = 0;
var currY = 0;
var doesHover = false;
var spiral = [];
var spiralcircle = [];
var spiraltriangle = [];
function setup() {
createCanvas(windowWidth, windowHeight);
background(255);
frameRate(50);
sqX = 100;
sqY = 100;
currX = 100;
currY = 100;
}
function draw() {
background(255);
fill(20);
noStroke();
var x = r * cos(a);
var y = r * sin(a);
a += map(mouseX,0,width,0,.7)  ;
r += map(mouseY,0,height,0,.4) ;
var trans = 50;
var line = new Line(x,y,r, sqX, sqY);
spiral.push(line);
var circles = new  Circle(x,y,r, sqX, sqY);
spiralcircle.push(circles);
var triangles = new Triangle(x,y,r, sqX, sqY);
spiraltriangle.push(triangles);
x = round(map(mouseX,0, width, 20 ,40));
for (var  i = 0 ; i < spiral.length; i++){
color(map(mouseX,0,width,5,255));
spiralcircle[i].draw();
spiraltriangle[i].draw();
spiral[i].draw();
}
noStroke();
fill(60);
fill(100);
rectMode(CENTER);
rect(sqX,sqY,sqSize,sqSize);
if    (( mouseX < (currX + sqSize/2)) &&
( mouseX > (currX - sqSize/2)) &&
( mouseY < (currY + sqSize/2)) &&
( mouseY > (currY - sqSize/2))
) {
fill(200);
rectMode(CENTER);
rect(sqX,sqY,sqSize,sqSize);
}else{
}
if    (( mouseX < (currX + sqSize/2)) &&
( mouseX > (currX - sqSize/2)) &&
( mouseY < (currY + sqSize/2)) &&
( mouseY > (currY - sqSize/2)) &&
(mouseIsPressed)
){
fill(60);
text("Xpos - " + currX + ", Ypos - " + currY, (currX-(sqSize)), (currY+sqSize));
fill(255,65,50);
noStroke();
rectMode(CENTER);
rect(sqX,sqY,sqSize,sqSize);
sqX = mouseX;
sqY = mouseY;
currY = mouseY;
currX = mouseX;
}
if ( ( mouseX < (currX + sqSize/2)) &&
( mouseX > (currX - sqSize/2)) &&
( mouseY < (currY + sqSize/2)) &&
( mouseY > (currY - sqSize/2))
)
{
fill(255,255,50);
noStroke();
}
}
var colorWhite = 255;
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
var colorWhite = 255;
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
quad (xcanvas+offsetX, ycanvas, xcanvas,(ycanvas+sqWidth),(xcanvas+sqWidth),
(ycanvas+sqWidth),(xcanvas+(sqWidth+offsetX)),ycanvas);
}
if (counter%2==1){ 
fill(90);
quad (xcanvas+offsetX, ycanvas, 
xcanvas,(ycanvas+sqWidth),\(xcanvas+sqWidth),
(ycanvas+sqWidth),(xcanvas+(sqWidth+offsetX)),ycanvas);      
}
}
}
}
}
var colorWhite = 255;
var colorGrey = 155;
var sqWidth = 50;
var xPos = 0;
var yPos = 0;
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
rect(xcanvas, ycanvas,sqWidth,sqWidth);
}
if (counter%2==1){ 
fill(129,0,0);
rect(xcanvas, ycanvas,sqWidth,sqWidth);
}
}
}
}
}
var colorWhite = 255;
var colorGrey = 155;
var sqWidth = 50;
var xPos = 0;
var yPos = 0;
var count = 0;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
var counter =0;
if (count <= 1){
for (var xcanvas = 0; xcanvas < width; xcanvas += sqWidth) {
counter++;
for(var ycanvas = 0; ycanvas < height; ycanvas += sqWidth){
counter++;
if (counter%2==0){ 
}
if (xcanvas%2==1){ 
white
fill(0);
rect(xcanvas, ycanvas,sqWidth,sqWidth);
"      }
}
}
}
}
var dimm = 100;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
}var positionX = 0;
function setup() { 
createCanvas(400, 400);
positionX=0;
} 
function draw() { 
var xc = constrain(positionX, 0, 100);
background(0);
positionX ++;
fill(255);
noStroke();
rect(xc,30,30,30);
} var grade = 0;
function setup() { 
createCanvas(400, 400);
grade = random(0, 100)
fill(255);
} 
function draw() { 
background(0);
if (grade > 90){
text("Grade: A", width/2, height/2);  
}
if ((grade >= 80) && (grade <= 90)){
text("Grade: b", width/2, height/2);  
}
if ((grade >= 70) && (grade <= 80)){
text("Grade: C", width/2, height/2);  
}
if ((grade >= 60) && (grade <= 70)){
text("Grade: D", width/2, height/2);  
}
if ((grade >= 50) && (grade <= 60)){
text("Grade: E", width/2, height/2);  
}
if ( (grade < 50)){
text("Grade: F", width/2, height/2);  
}
}
var colorWhite = 255;
var colorGrey = 155;
var sqWidth = 50;
var count = 0;
var x = 0;	
var y = 0;
function setup() { 
createCanvas(400, 400);
background(0);
} 
function draw() { 
if (count <= 1){
for (var i = 0; i < 6; i++) {
x=x+sqWidth*2;
}
for (var r = 0; r < 6; r++) {
rect((x+sqWidth), y, sqWidth, sqWidth);	
x=x+sqWidth*2;
count ++;
}
count ++;
}
}
var colorWhite = 255;
var colorGrey = 155;
var sqWidth = 50;
var count = 0;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(0);
}
if (count <= 1){
for (var i = 0; i < 6; i++) {
count ++;
rect(0, 0, sqWidth, sqWidth);
}
}
var z = 150;
var x1 = z;
var x2 = z;
var x3 = z+120;
var x4 = z+120;
var y1 =z;
var y2 =z+80;
var y3 =z;
var y4 =z-80;
var count = 0;
function setup() { 
createCanvas(800, 400);
background(0);
} 
function draw() { 
fill(150);  
fill(200);  
fill(150);  
if (count <= 1){
for (var i = 0; i < 6; i++) {
quad(x1,y1,x2,y2,x3,y3,x4,y4);
x1 = x1 + 80;
x2 = x2 + 80;
x3 = x3 + 80;
x4 = x4 + 80;  
count ++;
}
}
function setup() {
createCanvas(710, 400);
for (var i=0; i<50; i++) {
ballArray.push(new Jitter());
}
}
function draw() {
background(50, 89, 100);
for (var i=0; i<ballArray.length; i++) {
ballArray[i].move();
ballArray[i].display();
}
}
function Jitter() {
this.x = random(width);
this.y = random(height);
this.diameter = random(10, 30);
this.speed = 1;
this.move = function() {
this.x += random(-this.speed, this.speed);
this.y += random(-this.speed, this.speed);
};
this.display = function() {
ellipse(this.x, this.y, this.diameter, this.diameter);
};
}
var wind = 0;
var gravity = .1;
var speedY = 0;
var speedX = 0;
function setup() {
createCanvas(710, 400);
}
function draw() {
background(0);
for (var i=0; i<bugs.length; i++) {
bugs[i].move();
bugs[i].display();
}
function mousePressed(){
bugs.push(new circle());
console.log("
}
}
function circle() {
this.x = mouseX;
this.y = mouseY;
this.diameter = 15;
this.speedY = 1;
;
this.display = function() {
fill(255,255,255,100);
ellipse(this.x, this.y, this.diameter, this.diameter);
noStroke();
};
this.move = function() {
this.speedY = this.speedY + gravity;
this.x = this.x + 1;
this.y = this.y + 1;
}
}
var wind = 0;
var gravity = .1;
var speedY = 0;
var speedX = 0;
function setup() {
createCanvas(710, 400);
}
function draw() {
background(0);
for (var i=0; i<bugs.length; i++) {
bugs[i].move();
bugs[i].display();
}
function mousePressed(){
bugs.push(new circle());
console.log("
}
}
function circle() {
this.x = mouseX;
this.y = mouseY;
this.diameter = 15;
this.speedY = 1;
;
this.display = function() {
fill(255,255,255,100);
ellipse(this.x, this.y, this.diameter, this.diameter);
noStroke();
};
this.move = function() {
this.speedY = this.speedY + gravity;
this.x = this.x + 1;
this.y = this.y + 1;
}
}
var wind = 0;
var gravity = .1;
var speedY = 0;
var speedX = 0;
function setup() {
createCanvas(710, 400);
}
function draw() {
background(0);
for (var i=0; i<bugs.length; i++) {
bugs[i].move();
bugs[i].display();
}
function mousePressed(){
bugs.push(new circle());
console.log("
}
}
function circle() {
this.x = mouseX;
this.y = mouseY;
this.diameter = 15;
this.speedY = 1;
;
this.display = function() {
fill(255,255,255,100);
ellipse(this.x, this.y, this.diameter, this.diameter);
noStroke();
};
this.move = function() {
this.speedY = this.speedY + gravity;
this.x = this.x + 1;
this.y = this.y + 1;
}
}
var wind = 0;
var gravity = .1;
var speedY = 0;
var speedX = 0;
function setup() {
createCanvas(710, 400);
}
function draw() {
background(0);
for (var i=0; i<bugs.length; i++) {
bugs[i].move();
bugs[i].display();
}
function mousePressed(){
bugs.push(new circle());
console.log("
}
}
function circle() {
this.x = mouseX;
this.y = mouseY;
this.diameter = 15;
this.speedY = 1;
;
this.display = function() {
fill(255,255,255,100);
ellipse(this.x, this.y, this.diameter, this.diameter);
noStroke();
};
this.move = function() {
this.speedY = this.speedY + gravity;
this.x = this.x + 1;
this.y = this.y + 1;
}
}var capture_video;
var w = 700;
var h = 500;
var timer = 0;
var absoluteWhite = 255;
var lightGrey = 213;
var darkGrey = 170;
var grey = 127;
var lightBlack = 86; 
var midBlack = 43
var absoluteBlack = 10;
var matX = 60;
var matY = 40;
var echo=0;
var count = false;
function setup() {
createCanvas(matX, matY);
capture_video = createCapture(VIDEO);
capture_video.size(matX, matY);
capture_video.hide();
createCanvas(w, h);
noStroke();
background(0);
}
function draw() { 
if (count == false){
timer = timer + 6;
if (timer >= 255){
count = true;
}
}
if (count == true){
timer = timer - 6;
if (timer <= 0){
count = false;
}
}
console.log(timer);
echo ++;
if (echo >= 255){
echo=255;
}
if (mouseIsPressed){
echo=0;
}
background(0,0,0,255-echo);
var hr = h / capture_video.height
var wr = w / capture_video.width
for (var i = 0; i < capture_video.width; i++) {
for (var c = 0; c < capture_video.height; c++) {
var pixel = capture_video.get(i,c)[0];
if(pixel >= 0) {
}
if((pixel < absoluteWhite) && (pixel > darkGrey )) {
fill(255-timer,timer,90);
rect(i * wr, c * hr, wr / 3, hr / 3);
}
if((pixel < darkGrey) && (pixel > lightGrey )) {
fill(255, timer-255, timer);
rect(i * wr, c * hr, wr / 6, hr / 6);
}
if((pixel < absoluteWhite) && (pixel > lightGrey )) {
fill(round(timer/6), 80, 255-timer);
rect(i * wr, c * hr, wr / 2, hr / 2);      
}
else if ((pixel < grey) && (pixel > lightBlack )) {
fill(round(timer/39),255-timer, timer);
ellipse(i * wr + wr / 2, c * hr + hr / 2, wr / 4.5 , hr / 4.5);
}
else if ((pixel > absoluteBlack) && (pixel < midBlack )) {
stroke(timer, (255 - round(timer/3)), timer);
line( i * wr + wr / 2  ,  c * hr + hr / 2  ,i * wr  , c * hr);
}
else if (pixel > absoluteBlack) {
stroke(timer, (255 - (round(timer/3))), timer);
point(i * wr + wr / 2, c * hr + hr / 2);
}
else if ((pixel > midBlack) && (pixel < lightBlack )) {
stroke(round(time/2), round(timer/3), round(timer/6));
line( i * wr - wr / 2  ,  c * hr + hr / 2  ,i * wr  , c * hr);
}
else if ((pixel > 10) && (pixel < 250 )) {
stroke(255-timer, 255, 255-timer);
line( i * wr + wr / 2  ,  c * hr + hr / 2  ,i * wr  , c * hr);
}
}
}
}
var wind = 0;
var gravity = .1;
var speedY = 0;
var speedX = 0;
function setup() {
createCanvas(710, 400);
}
function draw() {
background(0);
for (var i=0; i<bugs.length; i++) {
bugs[i].move();
bugs[i].display();
}
if (mouseIsPressed){
bugs.push(new circle());
}
}
function circle() {
this.x = mouseX;
this.y = mouseY;
this.diameter = 15;
this.speedY = 1;
;
this.display = function() {
fill(255,255,255,100);
ellipse(this.x, this.y, this.diameter, this.diameter);
noStroke();
};
this.move = function() {
this.speedY = this.speedY + gravity;
this.x = this.x;
this.y = this.y +1 ;
}
}
var wind = 0;
var gravity = .1;
var speedY = 0;
var speedX = 0;
function setup() {
createCanvas(710, 400);
}
function draw() {
background(0);
for (var i=0; i<bugs.length; i++) {
bugs[i].move();
bugs[i].display();
}
function mousePressed(){
bugs.push(new circle());
console.log("
}
}
function circle() {
this.x = mouseX;
this.y = mouseY;
this.diameter = 15;
this.speedY = 1;
;
this.display = function() {
fill(255,255,255,100);
ellipse(this.x, this.y, this.diameter, this.diameter);
noStroke();
};
this.move = function() {
this.speedY = this.speedY + gravity;
this.x = this.x + 1;
this.y = this.y + 1;
}
var x, y;
var particle = [];
function setup() {
createCanvas(720, 400);
x = width / 2;
y = height;
}
function draw() {
background(0);
if (mouseIsPressed){
stroke(50);
fill(100);
ellipse(x, y, 24, 24);
}
x = x + 0;
y = y + 2;
if (y >= height) {
y = 0;
}
}
var x = 200;
var y = 200;
var currX = 0;
var currY = 0;
var DimX = 10;
var DimY = 10;
var gravity = .08;
var wind = 0;
var speedY = 1;
var speedX = 0;
var particles = [];
function setup() { 
createCanvas(400, 400);
background(0);
} 
function draw() { 
background(0,0,0,255);
noStroke();
ellipse(x,y,DimX,DimY);
speedY = speedY + gravity;
speedX = speedX + wind;
y = y + speedY;
x = x + speedX;
if (y >= height){
speedY = -speedY;
}
if (y <= 0){
speedY = -speedY;
}
if (x >= width){
speedX = -speedX;
}
if (x <= 0){
speedX = -speedX;
}
}
function keyPressed() {
if (keyCode === UP_ARROW) {
gravity = gravity + .05;
} else if (keyCode === DOWN_ARROW) {
gravity = gravity - .05;
} else if (keyCode === LEFT_ARROW) {
wind = wind - .05;
}
else if (keyCode === RIGHT_ARROW) {
wind = wind + .05;
}
}
function mousePressed(){
currX = mouseX;
currY = mouseY;
}
var y = 20;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
noStroke();
ellipse(x,y,20,20);
y++;
}
function mousePressed(){
console.log(mouseX '+ mouseY); 
}var x = 20;
var y = 20;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
noStroke();
ellipse(x,y,20,20);
y++;
}
function mousePressed(){
console.log(mouseX '+ mouseY); 
}var capture_video;
var w = 700;
var h = 500;
var timer = 0;
var absoluteWhite = 255;
var lightGrey = 213;
var darkGrey = 170;
var grey = 127;
var lightBlack = 86; 
var midBlack = 43
var absoluteBlack = 10;
var matX = 60;
var matY = 40;
var echo=0;
var count = false;
function setup() {
createCanvas(matX, matY);
capture_video = createCapture(VIDEO);
capture_video.size(matX, matY);
capture_video.hide();
createCanvas(w, h);
noStroke();
background(0);
}
function draw() { 
if (count == false){
timer = timer + 6;
if (timer >= 255){
count = true;
}
}
if (count == true){
timer = timer - 6;
if (timer <= 0){
count = false;
}
}
console.log(timer);
echo ++;
if (echo >= 255){
echo=255;
}
if (mouseIsPressed){
echo=0;
}
background(0,0,0,255-echo);
var hr = h / capture_video.height
var wr = w / capture_video.width
for (var i = 0; i < capture_video.width; i++) {
for (var c = 0; c < capture_video.height; c++) {
var pixel = capture_video.get(i,c)[0];
if(pixel >= 0) {
}
if((pixel < absoluteWhite) && (pixel > darkGrey )) {
fill(255-timer,timer,90);
rect(i * wr, c * hr, wr / 3, hr / 3);
}
if((pixel < darkGrey) && (pixel > lightGrey )) {
fill(255, timer-255, timer);
rect(i * wr, c * hr, wr / 6, hr / 6);
}
if((pixel < absoluteWhite) && (pixel > lightGrey )) {
fill(round(timer/6), 80, 255-timer);
rect(i * wr, c * hr, wr / 2, hr / 2);      
}
else if ((pixel < grey) && (pixel > lightBlack )) {
fill(round(timer/39),255-timer, timer);
ellipse(i * wr + wr / 2, c * hr + hr / 2, wr / 4.5 , hr / 4.5);
}
else if ((pixel > absoluteBlack) && (pixel < midBlack )) {
stroke(timer, 255 - round(timer/3), timer);
line( i * wr + wr / 2  ,  c * hr + hr / 2  ,i * wr  , c * hr);
}
else if (pixel > absoluteBlack) {
stroke(timer, (255 - (round(timer/3))), timer);
point(i * wr + wr / 2, c * hr + hr / 2);
}
else if ((pixel > midBlack) && (pixel < lightBlack )) {
stroke(2round(time/2), round(timer/3), round(timer/6));
line( i * wr - wr / 2  ,  c * hr + hr / 2  ,i * wr  , c * hr);
}
else if ((pixel > 10) && (pixel < 250 )) {
stroke(255-timer, 255, 255-timer);
line( i * wr + wr / 2  ,  c * hr + hr / 2  ,i * wr  , c * hr);
}
}
}
}
var system;
var dimX = 2;
var dimY = 2;
function setup() {
createCanvas(720, 400);
system = new ParticleSystem(createVector(width/2, 50));
}
function draw() {
background(0);
system.addParticle();
system.run();
}
var Particle = function(position) {
this.acceleration = createVector(0, 0.05);
this.velocity = createVector(random(-1, 1), random(-1, 0));
this.position = position.copy();
this.lifespan = 255.0;
};
Particle.prototype.run = function() {
this.update();
this.display();
};
Particle.prototype.update = function(){
this.velocity.add(this.acceleration);
this.position.add(this.velocity);
this.lifespan -= 1;
};
Particle.prototype.display = function() {
noStroke();
fill(255, this.lifespan);
ellipse(this.position.x, this.position.y, dimX, dimY);
};
Particle.prototype.isDead = function(){
if (this.lifespan < 0) {
return true;
} else {
return false;
}
};
var ParticleSystem = function(position) {
this.origin = position.copy();
this.particles = [];
};
ParticleSystem.prototype.addParticle = function() {
this.particles.push(new Particle(this.origin));
};
ParticleSystem.prototype.run = function() {
for (var i = this.particles.length-1; i >= 0; i--) {
var p = this.particles[i];
p.run();
if (p.isDead()) {
this.particles.splice(i, 1);
}
}
};var capture_video;
var w = 700;
var h = 500;
var absoluteWhite = 255;
var lightGrey = 213;
var darkGrey = 170;
var grey = 127;
var lightBlack = 86; 
var midBlack = 43
var absoluteBlack = 10;
var matX = 60;
var matY = 40;
var echo=0;
function setup() {
createCanvas(matX, matY);
capture_video = createCapture(VIDEO);
capture_video.size(matX, matY);
capture_video.hide();
createCanvas(w, h);
noStroke();
background(0);
}
function draw() { 
echo ++;
if (echo >= 100){
echo=100;
}
if (mouseIsPressed){
echo=0;
}
console.log(255-echo);
background(0,0,0,255-echo);
var hr = h / capture_video.height
var wr = w / capture_video.width
for (var i = 0; i < capture_video.width; i++) {
for (var c = 0; c < capture_video.height; c++) {
var pixel = capture_video.get(i,c)[0];
if(pixel >= 0) {
}
if((pixel < absoluteWhite) && (pixel > darkGrey )) {
fill(90,90,90,90);
rect(i * wr, c * hr, wr / 3, hr / 3);
}
if((pixel < darkGrey) && (pixel > lightGrey )) {
rect(i * wr, c * hr, wr / 6, hr / 6);
}
if((pixel < absoluteWhite) && (pixel > lightGrey )) {
fill(255,255,255);
rect(i * wr, c * hr, wr / 2, hr / 2);      
}
else if ((pixel < grey) && (pixel > lightBlack )) {
fill(255);
ellipse(i * wr + wr / 2, c * hr + hr / 2, wr / 4.5 , hr / 4.5);
}
else if ((pixel > absoluteBlack) && (pixel < midBlack )) {
stroke(255);
line( i * wr + wr / 2  ,  c * hr + hr / 2  ,i * wr  , c * hr);
}
else if (pixel > absoluteBlack) {
stroke(255);
point(i * wr + wr / 2, c * hr + hr / 2);
}
else if ((pixel > midBlack) && (pixel < lightBlack )) {
stroke(255);
line( i * wr - wr / 2  ,  c * hr + hr / 2  ,i * wr  , c * hr);
}
else if ((pixel > 10) && (pixel < 250 )) {
stroke(255);
line( i * wr + wr / 2  ,  c * hr + hr / 2  ,i * wr  , c * hr);
}
}
}
}var capture_video;
var w = 700;
var h = 500;
var absoluteWhite = 255;
var lightGrey = 213;
var darkGrey = 170;
var grey = 127;
var lightBlack = 86; 
var midBlack = 43
var absoluteBlack = 10;
var currXpos;
var currYpos;
var matX = 60;
var matY = 40;
var echo = 0;
function setup() {
createCanvas(matX, matY);
capture_video = createCapture(VIDEO);
capture_video.size(matX, matY);
capture_video.hide();
createCanvas(w, h);
noStroke();
background(0);
}
function draw() { 
currXpos = round(map(mouseX, 0, width, 0, 255));
currYpos = round(map(mouseY, 0, height, 0, 255));
echo ++;
if (echo >= 255){
echo=255;
}
if (mouseIsPressed){
echo=0;
}
background(0,0,0,255-echo);
var hr = h / capture_video.height
var wr = w / capture_video.width
for (var i = 0; i < capture_video.width; i++) {
for (var c = 0; c < capture_video.height; c++) {
var pixelid = capture_video.get(i,c)[0];
if((pixelid < absoluteWhite) && (pixelid > darkGrey )) {
fill(90,90,90,90);
rect(i * wr, c * hr, wr / 3, hr / 3);
}
if((pixelid < darkGrey) && (pixelid > lightGrey )) {
rect(i * wr, c * hr, wr / 6, hr / 6);
noStroke(); 
}
if((pixelid < absoluteWhite) && (pixelid > lightGrey )) {
fill(random(200,currXpos),255-currXpos,255-currXpos);
noStroke();
rect(i * wr, c * hr, wr / 2, hr / 2);      
}
else if ((pixelid < grey) && (pixelid > lightBlack )) {
fill(currXpos, random(0,currYpos),currXpos);
noStroke();
ellipse(i * wr + wr / 2, c * hr + hr / 2, wr / 4 , hr / 4);
}
else if ((pixelid > absoluteBlack) && (pixelid < midBlack )) {
stroke(255-currXpos,random(currXpos,255),random(50,currYpos));
line( i * wr + wr / 2  ,  c * hr + hr / 2  ,i * wr  , c * hr);
}
else if (pixelid > absoluteBlack) {
stroke(random(100,currYpos),currXpos,random(200,currXpos));
point(i * wr + wr / 2, c * hr + hr / 2);
}
else if ((pixelid > midBlack) && (pixelid < lightBlack )) {
stroke(random(currYpos,currXpos),random(10,currXpos),random(currXpos,currYpos));
line( i * wr - wr / 2  ,  c * hr + hr / 2  ,i * wr  , c * hr);
}
else if ((pixelid > 10) && (pixelid < 250 )) {
stroke(random(currYpos,255),currXpos,random(currYpos,255));
line( i * wr + wr / 2  ,  c * hr + hr / 2  ,i * wr  , c * hr);
}
}
}
}var capture_video;
var w = 700;
var h = 500;
var absoluteWhite = 255;
var lightGrey = 213;
var darkGrey = 170;
var grey = 127;
var lightBlack = 86; 
var midBlack = 43
var absoluteBlack = 10;
var matX = 60;
var matY = 40;
var echo=0;
function setup() {
createCanvas(matX, matY);
capture_video = createCapture(VIDEO);
capture_video.size(matX, matY);
capture_video.hide();
createCanvas(w, h);
noStroke();
background(0);
}
function draw() { 
echo ++;
if (echo >= 255){
echo=255;
}
if (mouseIsPressed){
echo=0;
}
background(0,0,0,255-echo);
var hr = h / capture_video.height
var wr = w / capture_video.width
for (var i = 0; i < capture_video.width; i++) {
for (var c = 0; c < capture_video.height; c++) {
var pixelid = capture_video.get(i,c)[0];
if((pixelid < absoluteWhite) && (pixelid > darkGrey )) {
fill(90,90,90,90);
rect(i * wr, c * hr, wr / 3, hr / 3);
}
if((pixelid < darkGrey) && (pixelid > lightGrey )) {
rect(i * wr, c * hr, wr / 6, hr / 6);
noStroke(); 
}
if((pixelid < absoluteWhite) && (pixelid > lightGrey )) {
fill(random(0,255),255,255);
noStroke();
rect(i * wr, c * hr, wr / 2, hr / 2);      
}
else if ((pixelid < grey) && (pixelid > lightBlack )) {
fill(255, random(0,255),255);
noStroke();
ellipse(i * wr + wr / 2, c * hr + hr / 2, wr / 4 , hr / 4);
}
else if ((pixelid > absoluteBlack) && (pixelid < midBlack )) {
stroke(255,random(0,255),random(50,180));
line( i * wr + wr / 2  ,  c * hr + hr / 2  ,i * wr  , c * hr);
}
else if (pixelid > absoluteBlack) {
stroke(random(100,255),255,random(200,255));
point(i * wr + wr / 2, c * hr + hr / 2);
}
else if ((pixelid > midBlack) && (pixelid < lightBlack )) {
stroke(random(100,255),random(10,90),random(200,255));
line( i * wr - wr / 2  ,  c * hr + hr / 2  ,i * wr  , c * hr);
}
else if ((pixelid > 10) && (pixelid < 250 )) {
stroke(random(230,255),255,random(200,255));
line( i * wr + wr / 2  ,  c * hr + hr / 2  ,i * wr  , c * hr);
}
}
}
}
var w = 650;
var h = 650;
function preload() {
img = loadImage("/img/lior.jpg");
img1 = loadImage("/img/peter.jpg");
img2 = loadImage("/img/barak.jpg");
img3 = loadImage("/img/peter1.jpg");
}
function setup() {
createCanvas(w, h);
noStroke();
background(0);
}
function draw() { 
if ((mouseX >= 0) && (mouseX <= width/3){
console.log("
}
background(0);
var hr = h / img.height
var wr = w / img.width
for (var i = 0; i < img.width; i++) {
for (var c = 0; c < img.height; c++) {
var pixel = img.get(i,c)[0];
if(pixel >= 0) {
}
if((pixel < 175) && (pixel > 120 )) {
fill(90,90,90,90);
rect(i * wr, c * hr, wr / 4, hr / 4);
}
if((pixel < 145) && (pixel > 75 )) {
rect(i * wr, c * hr, wr / 6, hr / 6);
}
if((pixel < 255) && (pixel > 180 )) {
fill(255,255,255);
rect(i * wr, c * hr, wr / 2, hr / 2);      
}
else if ((pixel < 155) && (pixel > 85 )) {
fill(255);
ellipse(i * wr + wr / 2, c * hr + hr / 2, wr / 4.5 , hr / 4.5);
}
else if ((pixel > 8) && (pixel < 35 )) {
stroke(255);
line( i * wr + wr / 2  ,  c * hr + hr / 2  ,i * wr  , c * hr);
}
else if (pixel > 25) {
stroke(255);
point(i * wr + wr / 2, c * hr + hr / 2);
}
else if ((pixel > 6) && (pixel < 35 )) {
stroke(255);
line( i * wr - wr / 2  ,  c * hr + hr / 2  ,i * wr  , c * hr);
}
else if ((pixel > 10) && (pixel < 250 )) {
stroke(255);
}
}
}
var w = 650;
var h = 650;
function setup() {
createCanvas(w, h);
noStroke();
background(0);
}
function draw() { 
background(0);
var hr = h / img.height
var wr = w / img.width
for (var i = 0; i < img.width; i++) {
for (var c = 0; c < img.height; c++) {
var pixel = img.get(i,c)[0];
if(pixel >= 0) {
}
if((pixel < 175) && (pixel > 120 )) {
fill(90,90,90,90);
rect(i * wr, c * hr, wr / 4, hr / 4);
}
if((pixel < 145) && (pixel > 75 )) {
rect(i * wr, c * hr, wr / 6, hr / 6);
}
if((pixel < 255) && (pixel > 180 )) {
fill(255,255,255);
rect(i * wr, c * hr, wr / 2, hr / 2);      
}
else if ((pixel < 155) && (pixel > 85 )) {
fill(255);
ellipse(i * wr + wr / 2, c * hr + hr / 2, wr / 4.5 , hr / 4.5);
}
else if ((pixel > 8) && (pixel < 35 )) {
stroke(255);
line( i * wr + wr / 2  ,  c * hr + hr / 2  ,i * wr  , c * hr);
}
else if (pixel > 25) {
stroke(255);
point(i * wr + wr / 2, c * hr + hr / 2);
}
else if ((pixel > 6) && (pixel < 35 )) {
stroke(255);
line( i * wr - wr / 2  ,  c * hr + hr / 2  ,i * wr  , c * hr);
}
else if ((pixel > 10) && (pixel < 250 )) {
stroke(255);
}
}
}
var w = 650;
var h = 650;
function setup() {
createCanvas(w, h);
noStroke();
background(0);
}
function draw() { 
background(0);
var hr = h / img.height
var wr = w / img.width
for (var i = 0; i < img.width; i++) {
for (var c = 0; c < img.height; c++) {
var pixel = img.get(i,c)[0];
if(pixel >= 0) {
}
if((pixel < 175) && (pixel > 120 )) {
fill(90,90,90,90);
rect(i * wr, c * hr, wr / 4, hr / 4);
}
if((pixel < 145) && (pixel > 75 )) {
rect(i * wr, c * hr, wr / 6, hr / 6);
}
if((pixel < 255) && (pixel > 180 )) {
fill(255,255,255);
rect(i * wr, c * hr, wr / 2, hr / 2);      
}
else if ((pixel < 155) && (pixel > 85 )) {
fill(255);
ellipse(i * wr + wr / 2, c * hr + hr / 2, wr / 4.5 , hr / 4.5);
}
else if ((pixel > 8) && (pixel < 35 )) {
stroke(255);
line( i * wr + wr / 2  ,  c * hr + hr / 2  ,i * wr  , c * hr);
}
else if (pixel > 25) {
stroke(255);
point(i * wr + wr / 2, c * hr + hr / 2);
}
else if ((pixel > 6) && (pixel < 35 )) {
stroke(255);
line( i * wr - wr / 2  ,  c * hr + hr / 2  ,i * wr  , c * hr);
}
else if ((pixel > 10) && (pixel < 250 )) {
stroke(255);
}
}
}
var w = 650;
var h = 650;
function setup() {
frameRate(1);
createCanvas(w, h);
noStroke();
background(0);
}
function draw() { 
background(0);
var hr = h / img.height
var wr = w / img.width
for (var i = 0; i < img.width; i++) {
for (var c = 0; c < img.height; c++) {
var pixel = img.get(i,c)[0];
if(pixel >= 0) {
}
if((pixel < 175) && (pixel > 120 )) {
fill(90,90,90,90);
rect(i * wr, c * hr, wr / 4, hr / 4);
}
if((pixel < 145) && (pixel > 75 )) {
rect(i * wr, c * hr, wr / 6, hr / 6);
}
if((pixel < 255) && (pixel > 180 )) {
fill(255,255,255);
rect(i * wr, c * hr, wr / 2, hr / 2);      
}
else if ((pixel < 155) && (pixel > 85 )) {
fill(255);
ellipse(i * wr + wr / 2, c * hr + hr / 2, wr / 4.5 , hr / 4.5);
}
else if ((pixel > 8) && (pixel < 35 )) {
stroke(255);
line( i * wr + wr / 2  ,  c * hr + hr / 2  ,i * wr  , c * hr);
}
else if (pixel > 25) {
stroke(255);
point(i * wr + wr / 2, c * hr + hr / 2);
}
else if ((pixel > 6) && (pixel < 35 )) {
stroke(255);
line( i * wr - wr / 2  ,  c * hr + hr / 2  ,i * wr  , c * hr);
}
else if ((pixel > 10) && (pixel < 250 )) {
stroke(255);
}
}
}
var w = 650;
var h = 650;
function setup() {
createCanvas(w, h);
noStroke();
background(0);
}
function draw() { 
background(0);
var hr = h / img.height
var wr = w / img.width
for (var i = 0; i < img.width; i++) {
for (var c = 0; c < img.height; c++) {
var pixel = img.get(i,c)[0];
if(pixel >= 0) {
}
if((pixel < 175) && (pixel > 120 )) {
fill(90,90,90,90);
rect(i * wr, c * hr, wr / 4, hr / 4);
}
if((pixel < 145) && (pixel > 75 )) {
rect(i * wr, c * hr, wr / 6, hr / 6);
}
if((pixel < 255) && (pixel > 180 )) {
fill(255,255,255);
rect(i * wr, c * hr, wr / 2, hr / 2);      
}
else if ((pixel < 155) && (pixel > 85 )) {
fill(255);
ellipse(i * wr + wr / 2, c * hr + hr / 2, wr / 4.5 , hr / 4.5);
}
else if ((pixel > 8) && (pixel < 35 )) {
stroke(255);
line( i * wr + wr / 2  ,  c * hr + hr / 2  ,i * wr  , c * hr);
}
else if (pixel > 25) {
stroke(255);
point(i * wr + wr / 2, c * hr + hr / 2);
}
else if ((pixel > 6) && (pixel < 35 )) {
stroke(255);
line( i * wr - wr / 2  ,  c * hr + hr / 2  ,i * wr  , c * hr);
}
else if ((pixel > 10) && (pixel < 250 )) {
stroke(255);
}
}
}
var w = 650;
var h = 650;
function setup() {
createCanvas(w, h);
noStroke();
background(0);
}
function draw() { 
background(0);
var hr = h / img.height
var wr = w / img.width
for (var i = 0; i < img.width; i++) {
for (var c = 0; c < img.height; c++) {
var pixel = img.get(i,c)[0];
if(pixel >= 0) {
}
if((pixel < 175) && (pixel > 120 )) {
fill(90,90,90,90);
rect(i * wr, c * hr, wr / 4, hr / 4);
}
if((pixel < 145) && (pixel > 75 )) {
rect(i * wr, c * hr, wr / 6, hr / 6);
}
if((pixel < 255) && (pixel > 180 )) {
fill(255,255,255);
rect(i * wr, c * hr, wr / 2, hr / 2);      
}
else if ((pixel < 155) && (pixel > 85 )) {
fill(255);
ellipse(i * wr + wr / 2, c * hr + hr / 2, wr / 4.5 , hr / 4.5);
}
else if ((pixel > 8) && (pixel < 35 )) {
stroke(255);
line( i * wr + wr / 2  ,  c * hr + hr / 2  ,i * wr  , c * hr);
}
else if (pixel > 25) {
stroke(255);
point(i * wr + wr / 2, c * hr + hr / 2);
}
else if ((pixel > 6) && (pixel < 35 )) {
stroke(255);
line( i * wr - wr / 2  ,  c * hr + hr / 2  ,i * wr  , c * hr);
}
else if ((pixel > 10) && (pixel < 250 )) {
stroke(255);
}
}
}
}
var w = 650;
var h = 650;
function preload() {
img = loadImage("/img/barak.jpg");
}
function setup() {
createCanvas(w, h);
noStroke();
background(0);
}
function draw() { 
if (mouseX > (width/3)){
}
background(0);
var hr = h / img.height
var wr = w / img.width
for (var i = 0; i < img.width; i++) {
for (var c = 0; c < img.height; c++) {
var pixel = img.get(i,c)[0];
if(pixel >= 0) {
}
if((pixel < 175) && (pixel > 120 )) {
fill(90,90,90,90);
rect(i * wr, c * hr, wr / 4, hr / 4);
}
if((pixel < 145) && (pixel > 75 )) {
rect(i * wr, c * hr, wr / 6, hr / 6);
}
if((pixel < 255) && (pixel > 180 )) {
fill(255,255,255);
rect(i * wr, c * hr, wr / 2, hr / 2);      
}
else if ((pixel < 155) && (pixel > 85 )) {
fill(255);
ellipse(i * wr + wr / 2, c * hr + hr / 2, wr / 4.5 , hr / 4.5);
}
else if ((pixel > 8) && (pixel < 35 )) {
stroke(255);
line( i * wr + wr / 2  ,  c * hr + hr / 2  ,i * wr  , c * hr);
}
else if (pixel > 25) {
stroke(255);
point(i * wr + wr / 2, c * hr + hr / 2);
}
else if ((pixel > 6) && (pixel < 35 )) {
stroke(255);
line( i * wr - wr / 2  ,  c * hr + hr / 2  ,i * wr  , c * hr);
}
else if ((pixel > 10) && (pixel < 250 )) {
stroke(255);
}
}
}
var w = 650;
var h = 650;
function setup() {
frameRate(1);
createCanvas(w, h);
noStroke();
background(0);
}
function draw() { 
background(0);
var hr = h / img.height
var wr = w / img.width
for (var i = 0; i < img.width; i++) {
for (var c = 0; c < img.height; c++) {
var pixel = img.get(i,c)[0];
if(pixel >= 0) {
}
if((pixel < 175) && (pixel > 160 )) {
fill(90,90,90,90);
rect(i * wr, c * hr, wr / 4, hr / 4);
}
if((pixel < 145) && (pixel > 75 )) {
rect(i * wr, c * hr, wr / 6, hr / 6);
}
if((pixel < 255) && (pixel > 180 )) {
fill(255,255,255);
rect(i * wr, c * hr, wr / 2, hr / 2);      
}
else if ((pixel < 155) && (pixel > 85 )) {
fill(255);
ellipse(i * wr + wr / 2, c * hr + hr / 2, wr / 4.5 , hr / 4.5);
}
else if ((pixel > 8) && (pixel < 35 )) {
stroke(255);
line( i * wr + wr / 2  ,  c * hr + hr / 2  ,i * wr  , c * hr);
}
else if (pixel > 25) {
stroke(255);
point(i * wr + wr / 2, c * hr + hr / 2);
}
else if ((pixel > 6) && (pixel < 35 )) {
stroke(255);
line( i * wr - wr / 2  ,  c * hr + hr / 2  ,i * wr  , c * hr);
}
else if ((pixel > 10) && (pixel < 250 )) {
stroke(255);
}
}
}
var w = 650;
var h = 650;
function setup() {
createCanvas(w, h);
noStroke();
background(0);
}
function draw() { 
background(0);
var hr = h / img.height
var wr = w / img.width
for (var i = 0; i < img.width; i++) {
for (var c = 0; c < img.height; c++) {
var pixel = img.get(i,c)[0];
if(pixel >= 0) {
}
if((pixel < 175) && (pixel > 160 )) {
fill(90,90,90,90);
rect(i * wr, c * hr, wr / 4, hr / 4);
}
if((pixel < 145) && (pixel > 75 )) {
rect(i * wr, c * hr, wr / 6, hr / 6);
}
if((pixel < 255) && (pixel > 180 )) {
fill(255,255,255);
rect(i * wr, c * hr, wr / 2, hr / 2);      
}
else if ((pixel < 155) && (pixel > 85 )) {
fill(255);
ellipse(i * wr + wr / 2, c * hr + hr / 2, wr / 4.5 , hr / 4.5);
}
else if ((pixel > 8) && (pixel < 35 )) {
stroke(255);
line( i * wr + wr / 2  ,  c * hr + hr / 2  ,i * wr  , c * hr);
}
else if (pixel > 25) {
stroke(255);
point(i * wr + wr / 2, c * hr + hr / 2);
}
else if ((pixel > 6) && (pixel < 35 )) {
stroke(255);
line( i * wr - wr / 2  ,  c * hr + hr / 2  ,i * wr  , c * hr);
}
else if ((pixel > 10) && (pixel < 250 )) {
stroke(255);
}
}
}
var w = 650;
var h = 650;
function setup() {
createCanvas(w, h);
noStroke();
background(0);
}
function draw() { 
background(0);
var hr = h / img.height
var wr = w / img.width
for (var i = 0; i < img.width; i++) {
for (var c = 0; c < img.height; c++) {
var pixel = img.get(i,c)[0];
if(pixel >= 0) {
}
if((pixel < 175) && (pixel > 120 )) {
fill(90,90,90,90);
rect(i * wr, c * hr, wr / 4, hr / 4);
}
if((pixel < 145) && (pixel > 75 )) {
rect(i * wr, c * hr, wr / 6, hr / 6);
}
if((pixel < 255) && (pixel > 180 )) {
fill(255,255,255);
rect(i * wr, c * hr, wr / 2, hr / 2);      
}
else if ((pixel < 155) && (pixel > 85 )) {
fill(255);
ellipse(i * wr + wr / 2, c * hr + hr / 2, wr / 4.5 , hr / 4.5);
}
else if ((pixel > 8) && (pixel < 35 )) {
stroke(255);
line( i * wr + wr / 2  ,  c * hr + hr / 2  ,i * wr  , c * hr);
}
else if (pixel > 25) {
stroke(255);
point(i * wr + wr / 2, c * hr + hr / 2);
}
else if ((pixel > 6) && (pixel < 35 )) {
stroke(255);
line( i * wr - wr / 2  ,  c * hr + hr / 2  ,i * wr  , c * hr);
}
else if ((pixel > 10) && (pixel < 250 )) {
stroke(255);
}
}
}
var w = 650;
var h = 650;
function setup() {
createCanvas(w, h);
noStroke();
background(0);
}
function draw() { 
background(0);
var hr = h / img.height
var wr = w / img.width
for (var i = 0; i < img.width; i++) {
for (var c = 0; c < img.height; c++) {
var pixel = img.get(i,c)[0];
if(pixel >= 0) {
}
if((pixel < 175) && (pixel > 120 )) {
fill(90,90,90,90);
rect(i * wr, c * hr, wr / 4, hr / 4);
}
if((pixel < 145) && (pixel > 75 )) {
rect(i * wr, c * hr, wr / 6, hr / 6);
}
if((pixel < 255) && (pixel > 180 )) {
fill(255,255,255);
rect(i * wr, c * hr, wr / 2, hr / 2);      
}
else if ((pixel < 155) && (pixel > 85 )) {
fill(255);
ellipse(i * wr + wr / 2, c * hr + hr / 2, wr / 4.5 , hr / 4.5);
}
else if ((pixel > 8) && (pixel < 35 )) {
stroke(255);
line( i * wr + wr / 2  ,  c * hr + hr / 2  ,i * wr  , c * hr);
}
else if (pixel > 25) {
stroke(255);
point(i * wr + wr / 2, c * hr + hr / 2);
}
else if ((pixel > 6) && (pixel < 35 )) {
stroke(255);
line( i * wr - wr / 2  ,  c * hr + hr / 2  ,i * wr  , c * hr);
}
else if ((pixel > 10) && (pixel < 250 )) {
stroke(255);
}
}
}
function setup() {
createCanvas(900, 900);
}
function draw() {
image(img, 0, 0, img.width/2, img.height/2);
}
var squares =[];
function setup() { 
createCanvas(500, 500);
} 
function draw() {
var Black = color(14);
var lightBlack = color(61);
var darkGrey = color(82);
var midGrey = color(111);
var grey = color(137);
var lightGrey = color(168);
var white = color(253);
var sqWidth = 9;
var sqHeight = 9;
for (var i = 0; i < width; i+=10) {
for (var c = 0; c < width; c+=10) {
noStroke();
fill(Black);
rect(i,c,sqWidth,sqHeight);
}
}
noStroke();
fill(lightBlack);
rect((23*10),0,sqWidth,sqHeight)
rect((27*10),0,sqWidth,sqHeight)
rect((38*10),0,sqWidth,sqHeight)
rect((41*10),0,sqWidth,sqHeight)
rect((43*10),0,sqWidth,sqHeight)
rect((44*10),0,sqWidth,sqHeight)
noStroke();
fill(midGrey);
rect((28*10),0,sqWidth,sqHeight)
rect((29*10),0,sqWidth,sqHeight)
rect((31*10),0,sqWidth,sqHeight)
rect((42*10),0,sqWidth,sqHeight)
noStroke();
fill(grey);
rect((30*10),0,sqWidth,sqHeight)
rect((31*10),0,sqWidth,sqHeight)
rect((36*10),0,sqWidth,sqHeight)
rect((37*10),0,sqWidth,sqHeight)
noStroke();
fill(lightGrey);
rect((33*10),0,sqWidth,sqHeight)
rect((34*10),0,sqWidth,sqHeight)
rect((35*10),0,sqWidth,sqHeight)
noStroke();
fill(white);
rect((32*10),0,sqWidth,sqHeight)
noStroke();
fill(lightBlack);
rect((28*10),10,sqWidth,sqHeight)
rect((42*10),10,sqWidth,sqHeight)
noStroke();
fill(darkGrey);
rect((29*10),10,sqWidth,sqHeight)
noStroke();
fill(midGrey);
rect((30*10),10,sqWidth,sqHeight)
rect((37*10),10,sqWidth,sqHeight)
noStroke();
fill(grey);
rect((32*10),10,sqWidth,sqHeight)
rect((33*10),10,sqWidth,sqHeight)
rect((34*10),10,sqWidth,sqHeight)
rect((35*10),10,sqWidth,sqHeight)
rect((41*10),10,sqWidth,sqHeight)
noStroke();
fill(lightGrey);
rect((31*10),10,sqWidth,sqHeight)
rect((36*10),10,sqWidth,sqHeight)
rect((38*10),10,sqWidth,sqHeight)
noStroke();
fill(Black);
noStroke();
fill(lightBlack);
rect((24*10),20,sqWidth,sqHeight)
rect((28*10),20,sqWidth,sqHeight)
noStroke();
fill(lightBlack);
noStroke();
fill(darkGrey);
noStroke();
fill(midGrey);
rect((29*10),20,sqWidth,sqHeight)
rect((39*10),20,sqWidth,sqHeight)
rect((37*10),20,sqWidth,sqHeight)
noStroke();
fill(grey);
rect((34*10),20,sqWidth,sqHeight)
rect((35*10),20,sqWidth,sqHeight)
noStroke();
fill(lightGrey);
rect((30*10),20,sqWidth,sqHeight)
rect((31*10),20,sqWidth,sqHeight)
rect((32*10),20,sqWidth,sqHeight)
rect((33*10),20,sqWidth,sqHeight)
rect((36*10),20,sqWidth,sqHeight)
rect((38*10),20,sqWidth,sqHeight)
noStroke();
fill(white);
}
function setup() { 
createCanvas(500, 500);  
background(225);
var Black = color(14);
var lightBlack = color(61);
var darkGrey = color(82);
var midGrey = color(111);
var grey = color(137);
var lightGrey = color(168);
var white = color(253);
var Black = color(0,0,0);
var Black = color(0,0,0);
var Black = color(0,0,0);
var Black = color(0,0,0);
var Black = color(0,0,0);
var Black = color(0,0,0);
var Black = color(0,0,0);
var Black = color(0,0,0);
fill(grey);  
rect(300, 0, 10, 10);  
fill(grey);  
rect(310, 0, 10, 10);  
fill(lightGrey);
fill(lightGrey);
var Black = color(0,0,0);
var Black = color(0,0,0);
var Black = color(0,0,0);
var Black = color(0,0,0);
var Black = color(0,0,0);
var Black = color(0,0,0);
var Black = color(0,0,0);
var Black = color(0,0,0);
var Black = color(0,0,0);
var Black = color(0,0,0);
var Black = color(0,0,0);
var Black = color(0,0,0);
var Black = color(0,0,0);
var Black = color(0,0,0);
fill(grey);  
rect(300, 0, 10, 10);  
fill(grey);  
rect(310, 0, 10, 10);  
fill(lightGrey);
fill(lightGrey);
var Black = color(0,0,0);
var Black = color(0,0,0);
var Black = color(0,0,0);
var Black = color(0,0,0);
var Black = color(0,0,0);
var Black = color(0,0,0);
} 
function setup() {
createCanvas(200, 200);
background(225,0,0);
var a = color(240,240,240);
var b = color(0,0,190);
var c = color(244, 223, 66);
var d = color(40, 40, 40);
}