var center = {
x: 0,
y: 0
}
var circles = [];
var colorControl = 0.00025;
var colorIntensity = 0.03;
function setup() {
createCanvas(windowWidth, windowHeight);
angleMode(DEGREES);
center.x = width / 2;
center.y = height / 2;
How to create more circles:
1) Add another line with a new number
2) First two variables are center location
3) Third variable is smaller circle radius
4) Fouth variable is larger circle radius
5) Fifth variable is the number of points on the circle
6) Sixth variable is the size of points
for (var i = 0; i<20 ; i++ ){
circles[i] = new circle(center.x,center.y, round(random(5,200)),round(random(200,height/2)),round(random(2,70)),random(0.5,10));
circles[0] = new circle(center.x, center.y, 40, 100, 20, 5);
circles[1] = new circle(center.x, center.y, 20, 150, 10, 3);
circles[2] = new circle(center.x, center.y, 60, 80, 50, 1);
circles[3] = new circle(center.x, center.y, 30, 70, 30, 1.5);
circles[4] = new circle(center.x, center.y, 100, 220, 2, 4);
}
}
function draw() {
colorMode(HSB);
background(220, 100, 25, 0.1);
colorMode(RGB);
function drawCircles(){
for (var j = 0; j < circles.length; j++) {
circles[j].present();
}
}
colorMode(HSB);
fill(175, 75, 100, colorIntensity);
noStroke();
for (var j = 15; j > 0; j--) {
ellipse(center.x, center.y, j)
}
colorIntensity += colorControl;
if ((colorIntensity > 0.03) || (colorIntensity < 0.015)) {
colorControl = -colorControl;
}
}
function doubleClicked(){
}
function drawCircles(){
for (var j = 0; j < circles.length; j++) {
circles[j].present();
}
}
function drawNucleus(){
fill(175, 75, 100, colorIntensity);
noStroke();
for (var j = 15; j > 0; j--) {
ellipse(center.x, center.y, j)
}
colorIntensity += colorControl;
if ((colorIntensity > 0.03) || (colorIntensity < 0.015)) {
colorControl = -colorControl;
}
}
function mousePressed() {
for (var j = 0; j < circles.length; j++) {
circles[j].activate();
}
}
class circle {
constructor(centerX, centerY, rLow, rBig, num, strokeWidth) {
this.rLow = rLow;
this.rBig = rBig;
this.r = [];
this.num = num;
this.cX = centerX;
this.cY = centerY;
this.active = [];
this.angle = [];
this.angleChange = random(-1, 1);
this.locX = [];
this.locY = [];
this.strokeWidth = strokeWidth;
for (var i = 0; i < num; i++) {
this.active[i] = false;
this.r[i] = this.rLow;
this.angle[i] = (360 * i) / this.num;
this.locX[i] = this.cX + cos(this.angle[i]) * this.rLow;
this.locY[i] = this.cY + sin(this.angle[i]) * this.rLow;
}
}
move() {
for (var i = 0; i < this.num; i++) {
if (this.active[i]) {
this.r[i] = this.rgoal;
this.active[i] = false;
}
this.locX[i] = this.cX + cos(this.angle[i]) * this.r[i];
}
}
}
updateAngle() {
for (var i = 0; i < this.num; i++) {
this.angle[i] += this.angleChange;
}
}
isActive() {
for (var i = 0; i < this.num; i++) {
if (this.active[i]) {
return true;
}
}
return false;
activate() {
this.rgoal = this.rBig;
this.angleChange = random(-1, 1);
} else {
this.rgoal = this.rLow;
}
this.active[i] = true;
this.speed[i] = random(10, 50);
}
}
present() {
strokeWeight(this.strokeWidth);
stroke(255, 200);
if (this.isActive()) {
this.move();
}
for (var i = 0; i < this.num; i++) {
point(this.locX[i], this.locY[i]);
}
this.updateAngle();
}
}var block = 30;
var squares = [];
var mappedRotation;
function setup() {
createCanvas(windowWidth, windowHeight);
rectMode(CENTER);
angleMode(RADIANS);
for (var i = 0; i< width/block; i++){
var squaresLine = []
for (var j = 0; j< height/block; j++){
squaresLine[j] = new square(block/2+i*block,block/2+j*block,block);
}
squares.push(squaresLine);
}
}
function draw() {
colorMode(HSB);
background(220, 100, 25, 0.1);
for (var i = 0; i< width/block; i++){
for (var j = 0; j< height/block; j++){
var xLoc = block/2+i*block;
var yLoc = block/2+j*block;
mappedRotation = map(dist(xLoc,yLoc,mouseX,mouseY), 0, sqrt(sq(width/2)+sq(height/2)),0, PI/2,true)
squares[i][j].present(mappedRotation);
}
}
}
class square {
constructor(xCenter,yCenter,dimension){
this.x = xCenter;
this.y = yCenter;
this.dimension = dimension;
this.isSpecialColor = false;
this.colorSat = 0;
this.isInfected = false;
this.infectionStarted = false;
this.clock = 0;
this.clockInitiated = false
}
present(mappedRot){
push();
translate(this.x,this.y);
rotate(mappedRot);
colorMode(RGB);
stroke(0);
strokeWeight(1);
noFill();
if (this.isInfected && !this.infectionStarted && !this.clockInitiated){
this.clockInitiated = true;
this.clock = millis();
}
if (millis() - this.clock > random(600,800) && this.clockInitiated){
this.infectionStarted = true;
this.clockInitiated = false;
}
if (this.isInfected && this.infectionStarted){
var successfulInfection = false;
var x = (this.x-0.5*block)/block;
var y = (this.y-0.5*block)/block
if (random()<0.17 && y >= 1){
squares[x][y-1].isInfected = true;
successfulInfection = true;
}
if (random()<0.17 && x >= 1){
squares[x-1][y].isInfected = true;
successfulInfection = true;
}
if (random()<0.17 && y <= round(height/block)-1){
squares[x][y+1].isInfected = true;
successfulInfection = true;
}
if (random()<0.17 && x <= round(width/block) - 1){
squares[x+1][y].isInfected = true;
successfulInfection = true;
}
if (!successfulInfection){
this.isInfected = false;
}
this.infectionStarted = false;
}
if (this.isInfected) {
this.isSpecialColor = true;
this.colorSat = 255;
}
if (this.isSpecialColor){
fill(this.colorSat,0,0);
this.colorSat--;
if (this.colorSat == 0){
this.isSpecialColor = false;
}
}
rect(0,0,this.dimension,this.dimension);
pop();
}
}
function mousePressed(){
var closest = [0,0];
for (var i = 0; i< width/block; i++){
for (var j = 0; j< height/block; j++){
var xLoc = block/2+i*block;
var yLoc = block/2+j*block;
mappedRotation = map(dist(xLoc,yLoc,mouseX,mouseY), 0, sqrt(sq(width/2)+sq(height/2)),0, PI/2,true)
if (dist(mouseX,mouseY,xLoc,yLoc)<dist(mouseX,mouseY,closest[0],closest[1])){
closest = [xLoc,yLoc];
}
}
}
squares[(closest[0]-0.5*block)/block][(closest[1]-0.5*block)/block].isInfected = true;
}
var block = 30;
var squares = [];
var mappedRotation;
function setup() {
createCanvas(windowWidth, windowHeight);
rectMode(CENTER);
angleMode(RADIANS);
for (var i = 0; i< width/block; i++){
var squaresLine = []
for (var j = 0; j< height/block; j++){
squaresLine[j] = new square(block/2+i*block,block/2+j*block,block);
}
squares.push(squaresLine);
}
}
function draw() {
colorMode(HSB);
background(220, 100, 25, 0.1);
for (var i = 0; i< width/block; i++){
for (var j = 0; j< height/block; j++){
var xLoc = block/2+i*block;
var yLoc = block/2+j*block;
mappedRotation = map(dist(xLoc,yLoc,mouseX,mouseY), 0, sqrt(sq(width/2)+sq(height/2)),0, PI/2,true)
squares[i][j].present(mappedRotation);
}
}
}
class square {
constructor(xCenter,yCenter,dimension){
this.x = xCenter;
this.y = yCenter;
this.dimension = dimension;
this.isSpecialColor = false;
this.colorSat = 0;
}
present(mappedRot){
push();
translate(this.x,this.y);
rotate(mappedRot);
colorMode(RGB);
stroke(0);
strokeWeight(1);
noFill();
if (this.isColorFirstTriggered) {
this.isSpecialColor = true;
rect(0,0,this.dimension,this.dimension);
}
if (this.isSpecialColor){
fill(this.colorSat,0,0);
this.colorSat--;
if (this.colorSat == 0){
this.isSpecialColor = false;
}
rect(0,0,this.dimension,this.dimension);
}
rect(0,0,this.dimension,this.dimension);
pop();
}
}
function mousePressed(){
var closest = [0,0];
for (var i = 0; i< width/block; i++){
for (var j = 0; j< height/block; j++){
var xLoc = block/2+i*block;
var yLoc = block/2+j*block;
mappedRotation = map(dist(xLoc,yLoc,mouseX,mouseY), 0, sqrt(sq(width/2)+sq(height/2)),0, PI/2,true)
if (dist(mouseX,mouseY,xLoc,yLoc)<dist(mouseX,mouseY,closest[0],closest[1])){
closest = [xLoc,yLoc];
}
}
}
squares[(closest[0]-0.5*block)/block][(closest[1]-0.5*block)/block].isSpecialColor = true;
squares[(closest[0]-0.5*block)/block][(closest[1]-0.5*block)/block].colorSat = 255;
}
var scaleX; 
var scaleY; 
var min; 
var max; 
var radius;
var radiusInc;
var r, g, b;
var wait = 0;
var ns = 1;
var compensationF;
function setup() {
createCanvas(windowWidth, windowHeight);
background(0);
smooth();
radius = 150;
r = random(255);
g = random(255);
b = random(255);
wait = millis();
}
function drawEllipse() {
noFill();
stroke(r, g, b, 28);
ellipse(0, 0, 120, 80);
}
function mouseMoved() {
if (mouseX < (windowWidth/3)){
r = map(mouseY, 0, windowHeight, 0, 255);
} else if (mouseX > ((windowWidth/3)-windowWidth)){
b = map(mouseY, 0, windowHeight, 0, 255);
} else {
g = map(mouseY, 0, windowHeight, 0, 255);
}
radiusInc = map(dist(width/2,height/2,mouseX,mouseY),0,width/2,0,1);
wait = millis();
}
function draw() {
colorMode(HSB);
background(210, 100, 25, 0.1);
scaleX = map(mouseX, 0, windowWidth, 1.5, 11.5);
scaleY = map(mouseY, 0, windowHeight, 1.5, 11.5);
minV = map(mouseX, 0, windowWidth, 0.1, 0.5);
maxV = map(mouseY, 0, windowHeight, 0.8, 1.8);
radius=10;
colorMode(RGB);
for (var i=0; i<720; i += 0.5) {   
push();
translate(windowWidth/2, windowHeight/2);
rotate(radians(i));
translate(0, radius);
rotate(radians(i*4));
if(millis()-wait>5000){
scale(map(sin(radians((i+i*(noise(ns)-compensationF))*scaleX)), -1, 1, minV, maxV), map(sin(radians((i+i*(noise(ns)-compensationF))*scaleY)), -1, 1, minV, maxV));
ns+=0.000003;
}else{
scale(map(sin(radians(i*scaleX)), -1, 1, minV, maxV), map(sin(radians(i*scaleY)), -1, 1, minV, maxV));
compensationF = noise(ns);
}
drawEllipse();
pop();
radius+=radiusInc;
}
function setup() {
createCanvas(400, 400);
colorMode(HSB);
smooth();
radius = 150;
r = random(255);
g = random(255);
b = random(255);
}
var rotationNoise = 1;
var scaleNoiseX = 100000;
var scaleNoiseY = 200000;
function drawEllipse() {
noFill();
stroke(r, g, b, 28);
ellipse(mouseX, mouseY, 120, 80);
}
function mouseMoved() {
if (mouseX < (windowWidth/3)){
r = map(mouseY, 0, windowHeight, 0, 255);
} else if (mouseX > ((windowWidth/3)-windowWidth)){
b = map(mouseY, 0, windowHeight, 0, 255);
} else {
g = map(mouseY, 0, windowHeight, 0, 255);
}
}
function draw() {
background(220, 70, 70, 0.05);
push();
noFill();
stroke(r, g, b, 25);
translate(mouseX,mouseY);
rotate(map(noise(rotationNoise), 0, 1, 0 , 2*PI));
ellipse(0,0, map(noise(scaleNoiseX),0,1,40,150), map(noise(scaleNoiseY),0,1,40,150));
pop();
scaleNoiseX += 0.005;
scaleNoiseY += 0.005;
rotationNoise += 0.001;
}var scaleX; 
var scaleY; 
var min; 
var max; 
var radius;
var r, g, b;
function setup() {
createCanvas(windowWidth, windowHeight);
background(0);
smooth();
radius = 150;
r = random(255);
g = random(255);
b = random(255);
}
function drawEllipse() {
noFill();
stroke(r, g, b, 28);
ellipse(0, 0, 120, 80);
}
function mouseMoved() {
if (mouseX < (windowWidth/3)){
r = map(mouseY, 0, windowHeight, 0, 255);
} else if (mouseX > ((windowWidth/3)-windowWidth)){
b = map(mouseY, 0, windowHeight, 0, 255);
} else {
g = map(mouseY, 0, windowHeight, 0, 255);
}
radius = map(mouseY, 0, windowHeight, 100, 350);
}
function draw() {
fill(0, 25);
rect(0, 0, windowWidth, windowHeight);
scaleX = map(mouseX, 0, windowWidth, 1.5, 11.5);
scaleY = map(mouseY, 0, windowHeight, 1.5, 11.5);
min = map(mouseX, 0, windowWidth, 0.1, 0.5);
max = map(mouseY, 0, windowHeight, 0.8, 1.8);
for (var i=0; i<720; i += 0.5) {   
push();
translate(windowWidth/2, windowHeight/2);
rotate(radians(i));
translate(0, radius);
rotate(radians(i*3));
scale(map(sin(radians(i*scaleX)), -1, 1, min, max), map(sin(radians(i*scaleY)), -1, 1, min, max));
drawEllipse();
pop();
}
}var clr = {
jet : '#333232',
light_gray : '#D3D0CB',
wintergreen_dream : '#587B7F',
deepspace_sparkle : '#465C69',
peech_orange : '#EDCB96'
}
function setup() {
createCanvas(400, 400);
angleMode(DEGREES);
}
function draw() {
background(clr.light_gray);
noFill();
stroke(clr.jet);
strokeWeight(5);
ellipse(width/2,height/2, 300,300);
for (var i = 0; i<360 ; i+=45){
noStroke();
fill(clr.wintergreen_dream);
ellipse(width/2+cos(i)*150, height/2+sin(i)*150,50,50);
stroke(clr.deepspace_sparkle);
strokeWeight(4);
fill(clr.peech_orange);
ellipse(width/2+cos(i)*150, height/2+sin(i)*150,30,30);
fill(clr.jet);
noStroke();
ellipse(width/2+cos(i)*150, height/2+sin(i)*150,10,10);
}
stroke(clr.deepspace_sparkle);
strokeWeight(4);
fill(clr.peech_orange);
push();
translate(width/2, height/2);
for(var j = 3.5; j>=0.5; j-=0.5){
triangle(-26*j,15*j,26*j,15*j,0,-30*j);
}
pop();
}
function mouseClicked(){
saveCanvas();
}var startScene = {
fade: 255,
titleFade: 255,
increment: -3,
order: 1,
x: 0,
slideIncr: 0.05,
introPresent: true,
}
var atomScene = {
circles: [],
colorControl: 0.00025,
colorIntensity: 0.03
}
var initiatedScene = {
particles: [],
finishedMoving: false,
sizeC: 10,
nc: 10,
c: 0,
growingCenter: true
}
var finishingScene = {
particles: [],
finishedMoving: false,
sizeC: 0,
nc: 0,
c: 0,
shrinkingCenter: false,
shrinkingStopped: false
}
var scenes = ['Fossil', 'Seed', 'Atom'];
var scene = 0;
var firstStart = true;
var pressTimeout = 0;
var chapterAlpha = 255;
var chapterTime;
var lastScene;
var finishing = false;
var fossilScene = {
radiusInc: 1,
startingRadius: 10,
r: 200,
g: 100,
b: 0,
multiplier: 4,
ns: 0,
compensationFactor: 0,
wait: 0
};
var seedScene = {
block: 30,
squares: [],
mappedRotation: 0
}
function preload() {
dreamMusic = loadSound('Sounds/dreams.mp3');
illusion = loadSound('Sounds/illusion.mp3');
riverFlows = loadSound('Sounds/riverFlows.mp3');
sweetwater = loadSound('sweetwater.mp3');
catchingFlies = loadSound('Sounds/catchingFlies.mp3');
blueImage = loadImage('blue_mountain.jpg');
titleFont = loadFont('Fonts/Rokkitt_Regular.ttf');
subFont = loadFont('Fonts/Hattori_Hanzo.otf');
loadFont('Hattori_Hanzo.otf');
}
function setup() {
createCanvas(windowWidth, windowHeight);
rectMode(CENTER);
textAlign(CENTER);
angleMode(DEGREES);
finishingScene.sizeC = sqrt(sq(width) + sq(height));
for (var i = 0; i < width / seedScene.block; i++) {
var squaresLine = []
for (var j = 0; j < height / seedScene.block; j++) {
squaresLine[j] = new square(seedScene.block / 2 + i * seedScene.block, seedScene.block / 2 + j * seedScene.block, seedScene.block);
}
seedScene.squares.push(squaresLine);
}
firstParticle = new particle(windowWidth / 2, windowHeight / 2);
firstBackParticle = new backwardParticle();
finishingScene.particles.push(firstBackParticle);
initiatedScene.particles.push(firstParticle);
startButton = createButton("Start")
startButton.class('textButton');
startButton.mousePressed(start);
startButton.position(windowWidth / 2 - startButton.size().width / 2, height / 2 + height * 0.3);
nextButton = createButton('')
nextButton.class('nextButton');
nextButton.mousePressed(next);
nextButton.position(width - nextButton.size().width, height / 2 - nextButton.size().height / 2);
nextButton.hide();
backButton = createButton('')
backButton.class('backButton');
backButton.mousePressed(previous);
backButton.position(0, height / 2 - backButton.size().height / 2);
backButton.hide();
finishButton = createButton('')
finishButton.class('finishButton');
finishButton.mousePressed(finish);
finishButton.position(width - finishButton.size().width, height / 2 - finishButton.size().height / 2);
finishButton.hide();
}
function draw() {
if (startScene.introPresent || startScene.fade >= 0 || startScene.titleFade >= 0) {
showIntro();
} else if (!initiatedScene.finishedMoving || dreamMusic.isPlaying()) {
initiated();
} else if (!finishing) {
colorMode(HSB);
if (firstStart) {
nextButton.show();
firstStart = false;
chapterTime = millis();
background(initiatedScene.c, 100, 25, 1);
riverFlows.play();
}
if (lastScene != scene) {
background(initiatedScene.c, 100, 25, 1);
}
if (scenes[scene] == 'Fossil') {
drawFossil();
} else if (scenes[scene] == 'Seed') {
drawSeed();
} else if (scenes[scene] == 'Atom') {
drawAtom();
}
if (chapterAlpha > 0) {
textSize(55);
colorMode(RGB);
fill(255, chapterAlpha);
textFont(titleFont);
var chapter = "Chapter " + String(scene + 1) + ": " + scenes[scene];
text(chapter, width / 2, height * 0.1, 600, 100);
if (millis() - chapterTime > 1700) {
chapterAlpha -= 10;
}
}
lastScene = scene;
} else if (!finishingScene.finishedMoving || illusion.isPlaying()) {
initiatedFinishing();
} else {
restart();
}
}
function mousePressed() {
if (initiatedScene.finishedMoving && !dreamMusic.isPlaying() && millis() - pressTimeout > 1500 && !finishing) {
if (scenes[scene] == 'Fossil') {
fossilScene.multiplier = floor(random(2, 12));
} else if (scenes[scene] == 'Seed') {
var closest = [0, 0];
for (var i = 0; i < width / seedScene.block; i++) {
for (var j = 0; j < height / seedScene.block; j++) {
var xLoc = seedScene.block / 2 + i * seedScene.block;
var yLoc = seedScene.block / 2 + j * seedScene.block;
seedScene.mappedRotation = map(dist(xLoc, yLoc, mouseX, mouseY), 0, sqrt(sq(width / 2) + sq(height / 2)), 0, PI / 2, true)
if (dist(mouseX, mouseY, xLoc, yLoc) < dist(mouseX, mouseY, closest[0], closest[1])) {
closest = [xLoc, yLoc];
}
}
}
seedScene.squares[(closest[0] - 0.5 * seedScene.block) / seedScene.block][(closest[1] - 0.5 * seedScene.block) / seedScene.block].isInfected = true;
} else if (scenes[scene] == 'Atom') {
for (var j = 0; j < atomScene.circles.length; j++) {
atomScene.circles[j].activate();
}
}
}
}
function mouseMoved() {
if (initiatedScene.finishedMoving && !dreamMusic.isPlaying() && !finishing) {
if (scenes[scene] == 'Fossil') {
if (mouseX < (windowWidth / 3)) {
fossilScene.r = map(mouseY, 0, windowHeight, 0, 255);
} else if (mouseX > ((windowWidth / 3) - windowWidth)) {
fossilScene.b = map(mouseY, 0, windowHeight, 0, 255);
} else {
fossilScene.g = map(mouseY, 0, windowHeight, 0, 255);
}
riverFlows.amp(map(dist(width / 2, height / 2, mouseX, mouseY), 0.05 * width, width * 0.8, 0.1, 1, true));
fossilScene.radiusInc = map(dist(width / 2, height / 2, mouseX, mouseY), 0, width / 2, 0, 1);
fossilScene.wait = millis();
}
}
}
function mouseDragged() {
if (initiatedScene.finishedMoving && !dreamMusic.isPlaying() && millis() - pressTimeout > 1500 && !finishing) {
if (scenes[scene] == 'Seed') {
var closest = [0, 0];
for (var i = 0; i < width / seedScene.block; i++) {
for (var j = 0; j < height / seedScene.block; j++) {
var xLoc = seedScene.block / 2 + i * seedScene.block;
var yLoc = seedScene.block / 2 + j * seedScene.block;
seedScene.mappedRotation = map(dist(xLoc, yLoc, mouseX, mouseY), 0, sqrt(sq(width / 2) + sq(height / 2)), 0, PI / 2, true)
if (dist(mouseX, mouseY, xLoc, yLoc) < dist(mouseX, mouseY, closest[0], closest[1])) {
closest = [xLoc, yLoc];
}
}
}
seedScene.squares[(closest[0] - 0.5 * seedScene.block) / seedScene.block][(closest[1] - 0.5 * seedScene.block) / seedScene.block].isInfected = true;
}
}
}
function drawSeed() {
angleMode(RADIANS);
colorMode(HSB);
background(initiatedScene.c, 100, 25, 0.1);
for (var i = 0; i < width / seedScene.block; i++) {
for (var j = 0; j < height / seedScene.block; j++) {
var xLoc = seedScene.block / 2 + i * seedScene.block;
var yLoc = seedScene.block / 2 + j * seedScene.block;
seedScene.mappedRotation = map(dist(xLoc, yLoc, mouseX, mouseY), 0, sqrt(sq(width / 2) + sq(height / 2)) / 2, 0, PI / 2, true)
seedScene.squares[i][j].present(seedScene.mappedRotation);
}
}
}
function drawAtom() {
angleMode(DEGREES);
colorMode(HSB);
background(initiatedScene.c, 100, 25, 0.1);
colorMode(RGB);
for (var j = 0; j < atomScene.circles.length; j++) {
atomScene.circles[j].present();
}
colorMode(HSB);
fill(175, 75, 100, atomScene.colorIntensity);
noStroke();
for (var j = 15; j > 0; j--) {
ellipse(width / 2, height / 2, j)
}
atomScene.colorIntensity += atomScene.colorControl;
if ((atomScene.colorIntensity > 0.03) || (atomScene.colorIntensity < 0.015)) {
atomScene.colorControl = -atomScene.colorControl;
}
}
function drawFossil() {
angleMode(RADIANS);
colorMode(HSB);
background(initiatedScene.c, 100, 25, 0.1);
var scaleX = map(mouseX, 0, windowWidth, 1.5, 11.5);
var scaleY = map(mouseY, 0, windowHeight, 1.5, 11.5);
var minV = map(mouseX, 0, windowWidth, 0.1, 0.5);
var maxV = map(mouseY, 0, windowHeight, 0.8, 1.8);
radius = 10;
colorMode(RGB);
for (var i = 0; i < 720; i += 0.5) {
push();
translate(windowWidth / 2, windowHeight / 2);
rotate(radians(i));
translate(0, radius);
rotate(radians(i * fossilScene.multiplier));
if (millis() - fossilScene.wait > 3000) {
scale(map(sin(radians((i + i * (noise(fossilScene.ns) - fossilScene.compensationFactor)) * scaleX)), -1, 1, minV, maxV), map(sin(radians((i + i * (noise(fossilScene.ns) - fossilScene.compensationFactor)) * scaleY)), -1, 1, minV, maxV));
fossilScene.ns += 0.000003;
} else {
scale(map(sin(radians(i * scaleX)), -1, 1, minV, maxV), map(sin(radians(i * scaleY)), -1, 1, minV, maxV));
fossilScene.compensationFactor = noise(fossilScene.ns);
}
noFill();
stroke(fossilScene.r, fossilScene.g, fossilScene.b, 28);
strokeWeight(1);
ellipse(0, 0, 120, 80);
pop();
radius += fossilScene.radiusInc;
}
}
function next() {
background(initiatedScene.c, 100, 25, 1);
pressTimeout = millis();
scene++;
if (scene + 1 >= scenes.length) {
nextButton.hide();
finishButton.show();
} else {
finishButton.hide();
nextButton.show();
}
backButton.show();
if (scenes[scene] == 'Seed') {
seedScene.squares = [];
for (var i = 0; i < width / seedScene.block; i++) {
var squaresLine = []
for (var j = 0; j < height / seedScene.block; j++) {
squaresLine[j] = new square(seedScene.block / 2 + i * seedScene.block, seedScene.block / 2 + j * seedScene.block, seedScene.block);
}
seedScene.squares.push(squaresLine);
}
}
if (scenes[scene] == 'Atom') {
for (var i = 0; i < 20; i++) {
atomScene.circles[i] = new circle(width / 2, height / 2, round(random(5, 200)), round(random(200, height / 2)), round(random(2, 70)), random(0.5, 10));
}
}
chapterTime = millis();
chapterAlpha = 255;
setSong();
}
function previous() {
background(initiatedScene.c, 100, 25, 1);
pressTimeout = millis();
scene--;
if (scene <= 0) {
backButton.hide();
} else {
backButton.show();
}
finishButton.hide();
nextButton.show();
if (scenes[scene] == 'Atom') {
for (var i = 0; i < 20; i++) {
atomScene.circles[i] = new circle(width / 2, height / 2, round(random(5, 200)), round(random(200, height / 2)), round(random(2, 70)), random(0.5, 10));
}
}
if (scenes[scene] == 'Seed') {
seedScene.squares = [];
for (var i = 0; i < width / seedScene.block; i++) {
var squaresLine = []
for (var j = 0; j < height / seedScene.block; j++) {
squaresLine[j] = new square(seedScene.block / 2 + i * seedScene.block, seedScene.block / 2 + j * seedScene.block, seedScene.block);
}
seedScene.squares.push(squaresLine);
}
}
chapterTime = millis();
chapterAlpha = 255;
setSong();
}
function finish() {
finishing = true;
finishingScene.nc = initiatedScene.nc;
sweetwater.stop();
illusion.play();
finishButton.hide();
backButton.hide();
}
function setSong() {
if (scenes[scene] == 'Fossil') {
catchingFlies.stop();
sweetwater.stop();
riverFlows.play();
riverFlows.loop();
} else if (scenes[scene] == 'Seed') {
riverFlows.stop();
sweetwater.stop();
catchingFlies.play();
catchingFlies.loop();
} else if (scenes[scene] == 'Atom') {
riverFlows.stop();
catchingFlies.stop();
sweetwater.play();
sweetwater.loop();
}
}
function initiatedFinishing() {
push();
colorMode(HSB);
if (!finishingScene.finishedMoving) {
finishingScene.c = floor(map(noise(finishingScene.nc), 0, 1, 210, 235));
finishingScene.nc += 0.005;
}
if (finishingScene.shrinkingCenter) {
image(blueImage, -20 + startScene.x, 0, width + 20 + startScene.x, height);
fill(finishingScene.c, 100, 25, 1);
noStroke();
if (!finishingScene.shrinkingStopped) {
ellipse(width / 2, height / 2, finishingScene.sizeC);
}
} else {
background(finishingScene.c, 100, 25, 1);
}
pop();
for (var particle of finishingScene.particles) {
if (particle.moved == true) {
particle.move();
particle.present();
}
}
if (finishingScene.particles.length >= 7000 && !finishingScene.finishedMoving) {
finishingScene.finishedMoving = true;
for (var particle of finishingScene.particles) {
if (particle.moved == true) {
finishingScene.finishedMoving = false;
}
}
if (finishingScene.finishedMoving) {
}
}
}
function initiated() {
push();
colorMode(HSB);
if (!initiatedScene.finishedMoving) {
initiatedScene.c = floor(map(noise(initiatedScene.nc), 0, 1, 210, 235));
initiatedScene.nc += 0.005;
}
if (initiatedScene.growingCenter) {
image(blueImage, -20 + startScene.x, 0, width + 20 + startScene.x, height);
fill(initiatedScene.c, 100, 25, 1);
noStroke();
ellipse(width / 2, height / 2, initiatedScene.sizeC);
} else {
background(initiatedScene.c, 100, 25, 1);
}
pop();
for (var particle of initiatedScene.particles) {
if (particle.moved == true) {
particle.move();
particle.present();
}
}
if (initiatedScene.particles.length >= 7000 && !initiatedScene.finishedMoving) {
initiatedScene.finishedMoving = true;
for (var particle of initiatedScene.particles) {
if (particle.moved == true) {
initiatedScene.finishedMoving = false;
}
}
if (initiatedScene.finishedMoving) {
}
}
}
function showIntro() {
image(blueImage, -20 + startScene.x, 0, width + 20 + startScene.x, height);
textSize(50);
startScene.x += startScene.slideIncr;
if (startScene.x >= 20 || startScene.x <= 0) {
startScene.slideIncr = -startScene.slideIncr;
}
fill(255, startScene.titleFade);
textFont(titleFont);
text("UNBLUE", width / 2, height / 2, 100, 100);
textSize(30);
fill(255, startScene.fade);
textFont(subFont);
if (startScene.order == 1) {
text("Plug Headphones", width / 2, height / 2 + 100, 200, 100);
} else if (startScene.order == 2) {
text("Relax", width / 2, height / 2 + 100, 200, 100);
} else {
text("Press Start", width / 2, height / 2 + 100, 200, 100);
}
startScene.fade += startScene.increment;
if ((startScene.fade >= 255 || startScene.fade <= 0) && startScene.introPresent) {
startScene.increment = -startScene.increment;
}
if (startScene.fade <= 0 && startScene.introPresent) {
startScene.order++;
startScene.fade = 1;
if (startScene.order > 3) {
startScene.order = 1;
}
}
if (!startScene.introPresent) {
startScene.titleFade -= 3
}
if (startScene.titleFade <255 & startScene.introPresent){
startScene.titleFade += 3;
}
}
function start() {
dreamMusic.play();
startButton.hide();
startScene.introPresent = false;
startScene.increment = -3
}
class backwardParticle {
constructor() {
this.radius = random(max(width, height) + 1, max(width, height) * 1.5)
this.angle = random(0, 360);
this.targetX = cos(this.angle) * this.radius + width / 2;
this.targetY = sin(this.angle) * this.radius + height / 2;
this.x = width / 2;
this.y = height / 2;
this.speed = random(3, 9.5);
this.moved = true;
}
move() {
if (this.moved) {
this.x += this.speed * cos(this.angle);
this.y += this.speed * sin(this.angle);
if (dist(this.x, this.y, width / 2, height / 2) >= sqrt(sq(width / 2) + sq(height / 2))) {
this.moved = false;
if (!finishingScene.shrinkingStopped) {
finishingScene.sizeC -= 0.5;
}
if (finishingScene.sizeC < sqrt(sq(width) + sq(height)) * 1.1) {
finishingScene.shrinkingCenter = true;
}
if (finishingScene.sizeC < 1) {
finishingScene.shrinkingStopped = true;
}
if (finishingScene.particles.length < 7000) {
var particle1 = new backwardParticle();
finishingScene.particles.push(particle1);
var particle2 = new backwardParticle();
finishingScene.particles.push(particle2);
}
}
}
}
present() {
fill(255);
noStroke();
ellipse(this.x, this.y, 5, 5);
}
}
class particle {
constructor(targetX, targetY) {
this.targetX = targetX;
this.targetY = targetY;
this.radius = random(max(width, height) + 1, max(width, height) * 1.5)
this.angle = random(0, 360);
this.x = cos(this.angle) * this.radius + width / 2;
this.y = sin(this.angle) * this.radius + height / 2;
this.speed = random(5, 15);
this.moved = true;
}
move() {
if (this.moved) {
this.x -= this.speed * cos(this.angle);
this.y -= this.speed * sin(this.angle);
if (dist(this.x, this.y, this.targetX, this.targetY) <= 10) {
this.moved = false;
initiatedScene.sizeC += 0.5;
if (initiatedScene.sizeC > sqrt(sq(width) + sq(height))) {
initiatedScene.growingCenter = false;
}
if (initiatedScene.particles.length < 7000) {
var particle1 = new particle(this.targetX, this.targetY);
initiatedScene.particles.push(particle1);
var particle2 = new particle(this.targetX, this.targetY);
initiatedScene.particles.push(particle2);
}
}
}
}
present() {
fill(255);
noStroke();
ellipse(this.x, this.y, 5, 5);
}
}
class square {
constructor(xCenter, yCenter, dimension) {
this.x = xCenter;
this.y = yCenter;
this.dimension = dimension;
this.isSpecialColor = false;
this.colorSat = 0;
this.isInfected = false;
this.infectionStarted = false;
this.clock = 0;
this.clockInitiated = false;
}
present(mappedRot) {
push();
translate(this.x, this.y);
rotate(mappedRot);
colorMode(RGB);
stroke(0);
strokeWeight(1);
noFill();
if (this.isInfected && !this.infectionStarted && !this.clockInitiated) {
this.clockInitiated = true;
this.clock = millis();
}
if (millis() - this.clock > random(600, 800) && this.clockInitiated) {
this.infectionStarted = true;
this.clockInitiated = false;
}
if (this.isInfected && this.infectionStarted) {
var successfulInfection = false;
var x = (this.x - 0.5 * seedScene.block) / seedScene.block;
var y = (this.y - 0.5 * seedScene.block) / seedScene.block
if (random() < 0.17 && y >= 1) {
seedScene.squares[x][y - 1].isInfected = true;
successfulInfection = true;
}
if (random() < 0.17 && x >= 1) {
seedScene.squares[x - 1][y].isInfected = true;
successfulInfection = true;
}
if (random() < 0.17 && y <= round(height / seedScene.block) - 1) {
seedScene.squares[x][y + 1].isInfected = true;
successfulInfection = true;
}
if (random() < 0.17 && x < round(width / seedScene.block) - 1) {
seedScene.squares[x + 1][y].isInfected = true;
successfulInfection = true;
}
if (!successfulInfection) {
this.isInfected = false;
}
this.infectionStarted = false;
}
if (this.isInfected) {
this.isSpecialColor = true;
this.colorSat = 100;
}
if (this.isSpecialColor) {
colorMode(HSB);
fill(195, 100, this.colorSat, 1);
this.colorSat--;
if (this.colorSat == 0) {
this.isSpecialColor = false;
}
}
rect(0, 0, this.dimension, this.dimension);
pop();
}
}
class circle {
constructor(centerX, centerY, rLow, rBig, num, strokeWidth) {
this.rLow = rLow;
this.rBig = rBig;
this.r = [];
this.num = num;
this.cX = centerX;
this.cY = centerY;
this.active = [];
this.angle = [];
this.angleChange = random(-1, 1);
this.locX = [];
this.locY = [];
this.strokeWidth = strokeWidth;
for (var i = 0; i < num; i++) {
this.active[i] = false;
this.r[i] = this.rLow;
this.angle[i] = (360 * i) / this.num;
this.locX[i] = this.cX + cos(this.angle[i]) * this.rLow;
this.locY[i] = this.cY + sin(this.angle[i]) * this.rLow;
}
}
move() {
for (var i = 0; i < this.num; i++) {
if (this.active[i]) {
this.r[i] = this.rgoal;
this.active[i] = false;
}
this.locX[i] = this.cX + cos(this.angle[i]) * this.r[i];
}
}
}
updateAngle() {
for (var i = 0; i < this.num; i++) {
this.angle[i] += this.angleChange;
}
}
isActive() {
for (var i = 0; i < this.num; i++) {
if (this.active[i]) {
return true;
}
}
return false;
activate() {
this.rgoal = this.rBig;
this.angleChange = random(-1, 1);
} else {
this.rgoal = this.rLow;
}
this.active[i] = true;
this.speed[i] = random(10, 50);
}
}
present() {
strokeWeight(this.strokeWidth);
stroke(255, 200);
if (this.isActive()) {
this.move();
}
for (var i = 0; i < this.num; i++) {
point(this.locX[i], this.locY[i]);
}
this.updateAngle();
}
}
function restart() {
finishing = false;
startScene.fade = 0;
startScene.titleFade = 0;
startScene.increment = 3;
startScene.order = 1;
startScene.introPresent = true;
initiatedScene.particles = [];
firstParticle = new particle(windowWidth / 2, windowHeight / 2);
initiatedScene.particles.push(firstParticle);
initiatedScene.finishedMoving = false;
initiatedScene.sizeC = 10;
initiatedScene.nc = 10;
initiatedScene.c = 0;
initiatedScene.growingCenter = true;
finishingScene.particles = [];
firstBackParticle = new backwardParticle();
finishingScene.particles.push(firstBackParticle);
finishingScene.finishedMoving = false;
finishingScene.sizeC = sqrt(sq(width) + sq(height));
finishingScene.shrinkingCenter = false;
finishingScene.shrinkingStopped = false;
scene = 0;
firstStart = true;
chapterAlpha = 255;
finishing = false;
startButton.show();
}var scaleX; 
var scaleY; 
var min; 
var max; 
var radius;
var r, g, b;
function setup() {
createCanvas(windowWidth, windowHeight);
background(0);
smooth();
radius = 150;
r = random(255);
g = random(255);
b = random(255);
}
function drawEllipse() {
noFill();
stroke(r, g, b, 28);
ellipse(0, 0, 120, 80);
}
function mouseMoved() {
if (mouseX < (windowWidth/3)){
r = map(mouseY, 0, windowHeight, 0, 255);
} else if (mouseX > ((windowWidth/3)-windowWidth)){
b = map(mouseY, 0, windowHeight, 0, 255);
} else {
g = map(mouseY, 0, windowHeight, 0, 255);
}
radius = map(mouseY, 0, windowHeight, 100, 350);
}
function draw() {
fill(0, 25);
rect(0, 0, windowWidth, windowHeight);
scaleX = map(mouseX, 0, windowWidth, 1.5, 11.5);
scaleY = map(mouseY, 0, windowHeight, 1.5, 11.5);
min = map(mouseX, 0, windowWidth, 0.1, 0.5);
max = map(mouseY, 0, windowHeight, 0.8, 1.8);
for (var i=0; i<720; i += 0.5) {   
push();
translate(windowWidth/2, windowHeight/2);
rotate(radians(i));
translate(0, radius);
rotate(radians(i*3));
scale(map(sin(radians(i*scaleX)), -1, 1, min, max), map(sin(radians(i*scaleY)), -1, 1, min, max));
drawEllipse();
pop();
}
}let word2Vec;
function modelLoaded() {
select('#status').html('Model Loaded');
}
function setup() {
noLoop();
noCanvas();
word2Vec = ml5.word2vec('data/wordvecs10000.json', modelLoaded);
let nearWordInput = select('#nearword');
let nearButton = select('#submit');
let nearResults = select('#results');
let betweenWordInput1 = select("#between1");
let betweenWordInput2 = select("#between2");
let betweenButton = select("#submit2");
let betweenResults = select("#results2");
let addInput1 = select("#isto1");
let addInput2 = select("#isto2");
let addInput3 = select("#isto3");
let addButton = select("#submit3");
let addResults = select("#results3");
nearButton.mousePressed(() => {
let word = nearWordInput.value();
word2Vec.nearest(word, (err, result) => {
let output = '';
if (result) {
for (let i = 0; i < result.length; i++) {
output += result[i].word + '<br/>';
}
} else {
output = 'No word vector found';
}
nearResults.html(output);
});
});
betweenButton.mousePressed(() => {
let word1 = betweenWordInput1.value();
let word2 = betweenWordInput2.value();
word2Vec.average([word1, word2], 4, (err, average) => {
betweenResults.html(average[0].word);
})
});
addButton.mousePressed(() => {
let is1 = addInput1.value();
let to1 = addInput2.value();
let is2 = addInput3.value();
word2Vec.subtract([to1, is1])
.then(difference => word2Vec.add([is2, difference[0].word]))
.then(result => addResults.html(result[0].word))
});
}
var blockSpacing = {
blockW : 40,
blockH : 40
}
var sizeLimits = {
maxW : 200,
minW : 10,
maxH : 200,
minH : 10
}
var APIKey = "psnU6wUFgdO93tQLmfaf9mF42JTdYhdD";
var service = "/v1/gifs/random"
var limit = "&limit=";
var numOfBlocks;
var apiURL;
var img
var imageArray = [];
var count = 0;
function setup() {
createCanvas(400, 400);
background(200);
numOfBlocks = floor(width/blockSpacing.blockW)*floor(width/blockSpacing.blockH);
apiURL = website + service + "?" + "api_key=" + APIKey + limit + numOfBlocks;
loadJSON(apiURL, dataLoaded);
}
function iterate(){
for (var x = 0; x< width; x+= blockSpacing.blockW){
for (var y = 0; y< height; y+= blockSpacing.blockH){
var imageWidth = floor(random(sizeLimits.minW, sizeLimits.maxW));
var imageHeight = floor(random(sizeLimits.minH, sizeLimits.maxH));
image(imageArray[i],x,y,imageWidth,imageHeight);
i++;
}
}
}
function dataLoaded(data){
processData(data);
}
function loaded(){
count++;
if (count == numOfBlocks) {
iterate();
}
}
function processData(data){
for (var j = 0; j< numOfBlocks; j++) {
imageArray[j] = createImg(data.data.images.original.url, loaded).hide();
}
}var blockSpacing = {
blockW: 40,
blockH: 40
}
var sizeLimits = {
maxW: 100,
minW: 20,
maxH: 100,
minH: 20
}
var APIKey = "psnU6wUFgdO93tQLmfaf9mF42JTdYhdD";
var service = "/v1/gifs/random"
var limit = "&limit=";
var numOfBlocks;
var apiURL;
var img
var imageArray = [];
var count = 0;
let button;
let c;
function saveImage() { 
saveCanvas(c, 'myCanvas', 'jpg');
}
function setup() {
c = createCanvas(400, 400);
background(200);
button1 = createButton('save artwork!', 0, 0);
button1.mousePressed(saveImage);
button1.hide();
numOfBlocks = floor(width / blockSpacing.blockW) * floor(width / blockSpacing.blockH);
apiURL = website + service + "?" + "api_key=" + APIKey;
loadJSON(apiURL, dataLoaded);
}
function iterate() {
for (var x = 0; x < width; x += blockSpacing.blockW) {
for (var y = 0; y < height; y += blockSpacing.blockH) {
var imageWidth = floor(random(sizeLimits.minW, sizeLimits.maxW));
var imageHeight = floor(random(sizeLimits.minH, sizeLimits.maxH));
image(imageArray[i], x, y, imageWidth, imageHeight);
i++;
}
}
button1.show();
}
function dataLoaded(data) {
processData(data);
}
function loaded() {
count++;
if (count == numOfBlocks) {
iterate();
} 
if (count < numOfBlocks) {
loadJSON(apiURL, dataLoaded);
}
}
function processData(data) {
imageArray[count] = createImg(data.data.images.original.url, loaded).hide();
}var blockSpacing = {
blockW: 40,
blockH: 40
}
var sizeLimits = {
maxW: 100,
minW: 20,
maxH: 100,
minH: 20
}
var APIKey = "Rj4NRE2qDVvjw7gAftCnEyjFkbMUqbXB";
var service = "/v1/gifs/trending"
var limit = "&limit=";
var numOfBlocks;
var apiURL;
var img
var imageArray = [];
var count = 0;
let button;
let c;
function saveImage() { 
saveCanvas(c, 'myCanvas', 'jpg');
}
function setup() {
c = createCanvas(400, 400);
background(200);
button1 = createButton('save artwork!', 0, 0);
button1.mousePressed(saveImage);
button1.hide();
numOfBlocks = floor(width / blockSpacing.blockW) * floor(width / blockSpacing.blockH);
apiURL = website + service + "?" + "api_key=" + APIKey + limit + numOfBlocks;
loadJSON(apiURL, dataLoaded);
}
function iterate() {
for (var x = 0; x < width; x += blockSpacing.blockW) {
for (var y = 0; y < height; y += blockSpacing.blockH) {
var imageWidth = floor(random(sizeLimits.minW, sizeLimits.maxW));
var imageHeight = floor(random(sizeLimits.minH, sizeLimits.maxH));
image(imageArray[i], x, y, imageWidth, imageHeight);
i++;
}
}
button1.show();
}
function dataLoaded(data) {
processData(data);
}
function loaded() {
count++;
if (count == numOfBlocks) {
iterate();
}
}
function processData(data) {
for (var j = 0; j < numOfBlocks; j++) {
imageArray[j] = createImg(data.data[j].images.original.url, loaded).hide();
}
}let video;
let poseNet;
let poses = [];
let oldKeypoint;
let points = {
nose: [0, 0],
rightEye: [0, 0],
leftEye: [0, 0],
rightEar: [0, 0],
leftEar: [0, 0]
}
var hearts = [];
var releaseHearts = false;
var heartTime = 0;
var dollarSize = 10;
var previousMask;
var currentMask;
var showIlluminati = false;
function preload() {
dollarImage = loadImage('dollar.png');
headphonesImage = loadImage('headphones.png');
loveImage = loadImage('love.png');
cicada = loadSound('cicada.mp3');
illuminati = loadImage('illuminati.png');
cicadaImage = loadImage('cicada.png');
brokeImage = loadImage('broke.png');
}
function setup() {
createCanvas(640, 480);
video = createCapture(VIDEO);
video.size(width, height);
poseNet = ml5.poseNet(video, modelReady);
poseNet.on('pose', function(results) {
poses = results;
});
video.hide();
dollarMaskButton = createButton('$$$');
dollarMaskButton.mousePressed(function() {
currentMask = "dollarMask"
});
headphonesMaskButton = createButton('Headphones');
headphonesMaskButton.mousePressed(function() {
currentMask = "headphonesMask"
});
loveMaskButton = createButton('Love');
loveMaskButton.mousePressed(function() {
currentMask = "loveMask"
});
}
function modelReady() {
select('#status').html('Model Loaded');
}
function draw() {
image(video, 0, 0, width, height);
drawKeypoints();
if (previousMask != currentMask) {
reset();
}
switch (currentMask) {
case "dollarMask":
dollarMask();
break;
case "headphonesMask":
headphonesMask();
break;
case "loveMask":
lMask();
break;
default:
}
previousMask = currentMask;
}
function mousePressed() {
switch (currentMask) {
case "dollarMask":
dollarSize += 5;
if (dollarSize == 50) {
notBroke = false;
}
break;
case "headphonesMask":
cicada.stop();
cicada.play();
showIlluminati = true;
break;
case "loveMask":
releaseHearts = true;
break;
default:
}
}
function lMask() {
if (releaseHearts && millis() - heartTime > 1500) {
var heart1 = new Heart(points.leftEye[0] - 20, points.leftEye[1] - 20);
var heart2 = new Heart(points.rightEye[0] - 20, points.rightEye[1] - 20);
hearts.push(heart1);
hearts.push(heart2);
heartTime = millis();
}
for (var i = 0; i < hearts.length; i++) {
hearts[i].move();
hearts[i].present();
if (hearts[i].y < 0) {
hearts.splice(i, 1);
}
}
image(loveImage, points.leftEye[0] - 20, points.leftEye[1] - 20, 40, 40);
image(loveImage, points.rightEye[0] - 20, points.rightEye[1] - 20, 40, 40);
}
function dollarMask() {
if (notBroke) {
image(dollarImage, points.leftEye[0] - dollarSize / 2, points.leftEye[1] - dollarSize / 2, dollarSize, dollarSize);
image(dollarImage, points.rightEye[0] - dollarSize / 2, points.rightEye[1] - dollarSize / 2, dollarSize, dollarSize);
} else {
image(brokeImage, points.leftEye[0] - 20, points.leftEye[1] - 20, 40, 40);
image(brokeImage, points.rightEye[0] - 20, points.rightEye[1] - 20, 40, 40);
}
}
function headphonesMask() {
var distance = dist(points.leftEar[0], points.leftEar[1], points.rightEar[0], points.rightEar[1])
var offsetX = 0.35 * distance;
image(headphonesImage, points.leftEar[0] - offsetX, points.leftEar[1] - 210, distance + offsetX * 2, 300);
if (showIlluminati) {
push();
rotate(0.1);
image(illuminati, 10, 10, 15, 15);
pop();
image(cicadaImage, points.nose[0] - 20, points.nose[1] - 20, 40, 40);
}
}
function loveMask() {
}
function drawKeypoints() {
for (let i = 0; i < poses.length; i++) {
let pose = poses[i].pose;
for (let j = 0; j < 5; j++) {
let keypoint = pose.keypoints[j];
if (keypoint.score > 0.2) {
fill(255, 0, 0);
noStroke();
ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
stroke(0);
switch (j) {
case 0:
points.nose[0] = keypoint.position.x;
points.nose[1] = keypoint.position.y;
break;
case 1:
points.rightEye[0] = keypoint.position.x;
points.rightEye[1] = keypoint.position.y;
break;
case 2:
points.leftEye[0] = keypoint.position.x;
points.leftEye[1] = keypoint.position.y;
break;
case 3:
points.rightEar[0] = keypoint.position.x;
points.rightEar[1] = keypoint.position.y;
break;
default:
points.leftEar[0] = keypoint.position.x;
points.leftEar[1] = keypoint.position.y;
}
if (j != 0){
line(oldKeypoint.position.x,oldKeypoint.position.y,keypoint.position.x,keypoint.position.y);
oldKeypoint = keypoint;
}
}
}
}
function reset() {
notBroke = true;
cicada.stop();
showIlluminati = false;
dollarSize = 10;
releaseHearts = false;
}
class Heart {
constructor(x, y) {
this.x = x;
this.y = y;
this.speed = 1;
this.noiseSeeds = random(1, 10000);
}
present() {
image(loveImage, this.x, this.y, 40, 40);
}
move() {
this.y -= this.speed;
if (random() < 0.5) {
this.x += 2 * noise(this.noiseSeeds)
} else {
this.x -= 2 * noise(this.noiseSeeds)
}
this.noiseSeeds += 1;
}
}var classifier;
var canva;
var img;
function setup() {
canva = createCanvas(400, 400);
canva.drop(gotFile);
classifier = ml5.imageClassifier('MobileNet', gotModel);
}
function gotModel(){
console.log('model loaded succesfully');
}
function gotFile(file){
img = createImg(file.data, imageReady).hide();
}
function imageReady(){
classifier.predict(img, gotResult);
}
function gotResult(err,data){
console.log(data);
}
function draw() {
}var video;
function setup() {
createCanvas(640, 480);
background(255);
video = createCapture(VIDEO);
video.size(width, height);
video.hide();
}
function draw() {
tint(255, 30);
image(video, 0, 0);
}var video;
var mic;
var micLevel;
var mappedVal;
var lvl = 250;
var goal = {
topY: 10,
bottomY: 17,
difference: 7
};
var rectWindow = {
topLeftX: 10,
topLeftY: 10,
bottomRightX: 60,
bottomRightY: 90
};
function setup() {
createCanvas(640, 480);
rectMode(CORNERS);
background(220);
video = createCapture(VIDEO);
video.size(width, height);
video.hide();
mic = new p5.AudioIn();
mic.start();
}
function draw() {
micLevel = mic.getLevel();
mappedVal = map(micLevel, 0.006, 0.4, rectWindow.bottomRightY - 1, rectWindow.topLeftY + 1, true);
showBackgroundImage();
showRectWindow();
showGoal();
showLvl();
checkForCompletion();
if (lvl > 10) lvl -= 1;
}
function showRectWindow() {
stroke(0);
strokeWeight(2);
fill(255);
rect(rectWindow.topLeftX, rectWindow.topLeftY, rectWindow.bottomRightX, rectWindow.bottomRightY);
}
function showBackgroundImage() {
tint(255, lvl);
image(video, 0, 0);
}
function showLvl() {
strokeWeight(4);
stroke(255, 0, 0);
line(rectWindow.topLeftX+3, mappedVal, rectWindow.bottomRightX-3, mappedVal);
}
function checkForCompletion() {
if (mappedVal > goal.topY && mappedVal < goal.bottomY) {
if (lvl <= 220) {
lvl += 35;
} else {
lvl = 255;
}
goal.topY = floor(random(rectWindow.topLeftY, rectWindow.bottomRightY - goal.difference));
goal.bottomY = goal.topY + goal.difference;
}
}
function showGoal() {
fill(0, 255, 0, 120);
noStroke();
rect(rectWindow.topLeftX, goal.topY, rectWindow.bottomRightX, goal.bottomY);
let name;
let surname;
function setup() {
createCanvas(400, 400);
nameTextField = createInput("type your name");
nameTextField.position(10,20);
surnameTextField = createInput("type your surname");
surnameTextField.position(10,40);
readyButton = createButton("Generate");
readyButton.mousePressed(checkForValues);
textSize(20);
fill(0);
}
function checkForValues(){
if(!nameTextField.value() || !surnameTextField.value()){
text("Empty Field", width/2, height/2);
} else {
name = nameTextField.value();
surname = surnameTextField.value()
var urlFull = url + "?firstName="+name+"&lastName="+surname;
loadJSON(urlFull, loaded);
}
}
function loaded(data){
var joke = data.value.joke;
if (joke.includes("&quot;")) {
joke.replace("&quot;", "\"");
}
background(220);
textAlign(CENTER);
textSize(11);
fill(0);
text(joke, 0, height/3, width, height*2/3);
}
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.setRequestHeader("Accept", "application/json");
function setup() {
createCanvas(400, 400);
xhr.addEventListener("readystatechange", function () {
if (this.readyState === 4) {
}
if(xhr.readyState == XMLHttpRequest.DONE) {
var x = JSON.parse(xhr.responseText);
}
}
xhr.send();
}
function some_func(data){
}
function draw() {
background(220);
}var data = "grant_type=urn%3Aibm%3Aparams%3Aoauth%3Agrant-type%3Aapikey&apikey=BzdeJglfZWMein5vI9goMoEcyiefH6NAcRUYDeaI4kSC";
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.setRequestHeader("Accept", "application/json");
function setup() {
createCanvas(400, 400);
xhr.addEventListener("readystatechange", function () {
if (this.readyState === 4) {
}
if(xhr.readyState == XMLHttpRequest.DONE) {
var x = JSON.parse(xhr.responseText);
}
}
xhr.send(data);
}
function some_func(data){
}
function draw() {
background(220);
}var systemVoice = new p5.Speech("Google UK English Male");
var sayHello = new p5.SpeechRec();
var portName;
var data;
var lastPress = 0;
var isTaken = false;
var started = false;
var hellos = ["hi", "hello", "sup", "what's up", "hey", "yes", "yeah", "ok", "okay"];
var name;
var lightsUp;
function preload(){
var candyDict = {
numOpt: 3,
answers: [["cupcake","cupcakes", "cup"], ["lollipop","pop","lolli"],["corn candy","corn candies", "corn"]],
results: [function(){speak("Jeff would probably like you");
setTimeout(function(){isTaken = false;},2000);},
function(){speak("Sorry " + name + ", I don't have any for you");
setTimeout(function(){isTaken = false;},3000);}, 
function(){speak("You corny");
setTimeout(function(){isTaken = false;},1700);}],
elseResult: function(){speak("That is not on my list, but it sounds good");
setTimeout(function(){isTaken = false;},1700);}
};
multiCandy = new multiQ(candyDict);
lightMyEyes = new infoQ(function(){
lightsUp = infoQ.that.info;
speak(lightsUp);
setTimeout(speak, 2000, "okay");
setTimeout(speak, 3200, "That is actually pretty sweet");
setTimeout(function(){isTaken = false;},5000);
});
doYouMind = new yesNoQ(function(){
speak("Don't waste of my time");
setTimeout(function(){isTaken = false;},2000);
},function(){
speak("Oh, kinky.");
setTimeout(function(){isTaken = false;},1200);
});
simpleFavor = new yesNoQ(function(){
speak("Great");
setTimeout(speak, 1300, "Pull the corners of your mouth with your index fingers");
setTimeout(speak, 6000, "Why so serious?");
setTimeout(function(){isTaken = false;},7000);
},function(){
speak("Nevermind then");
setTimeout(function(){isTaken = false;},1500);
});
yesnoTouch = new yesNoQ(function(){
},function(){
speak("You can leave then! Bye");
});
getNameQ = new infoQ(function(){
name = infoQ.that.info;
setTimeout(speak, 500, name + ", ok.");
setTimeout(speak, 2200, "Thats a weird name, but fine");
setTimeout(speak, 4200, "Well");
setTimeout(speak, 5000, "Since we are here, would you like to touch me with your fingers?");
setTimeout(function(){yesnoTouch.start();},6800);
});
}
function setup() {
createCanvas(400, 400);
sayHello.onResult = checkForHello;
sayHello.onEnd = finishHello;
}
function checkForHello() {
if (sayHello.resultValue == true) {
said = sayHello.resultString.toLowerCase()
for (let hello of hellos) {
if (said.includes(hello)) {
started = true;
break;
}
}
}
}
function finishHello() {
if (started) {
startConversation();
} else {
}
started = false;
}
function startConversation() {
speak("Finally!");
setTimeout(speak, 1000, "Somebody talked to me at last.");
setTimeout(speak, 4000, "What is your name little human?");
setTimeout(function(){getNameQ.start();}, 4500);
}
function setupPort(portList) {
for (let port of portList) {
if (port.includes("usbmodem"))
portName = port;
}
}
function dataEvent() {
if (dataString.length > 0) {
if (dataString.includes('startGame')) {
speak("Hey you");
setTimeout(speak, 1500, "yes, you");
setTimeout(function() {
sayHello.start()
}, 3000);
} else {
data = JSON.parse(dataString);
if (millis() - lastPress > 5000 && !isTaken) {
processGameData();
} else {
}
}
}
}
function processGameData() {
var stringOfData = [data.fsr1,data.fsr2,data.fsr3,data.fsr4].join(' ')
if (stringOfData != '0 0 0 0'){
lastPress = millis();
isTaken = true;
}
switch (stringOfData)
{
case '1 0 0 0':
speak("Your hands are sweaty. Don't touch me when you are wet!");
setTimeout(function(){isTaken = false;},3000);
break;
case '0 1 0 0':
speak("I am creeping it real. Happy Halloween, " + name);
setTimeout(function(){isTaken = false;},3000);
break;
case '0 0 1 0':
speak("You look delicious, kiss me, now");
setTimeout(function(){isTaken = false;},3000);
break;
case '0 0 0 1':
speak("What did a skeleton say to vampire?");
setTimeout(speak, 3500, "You suck.");
setTimeout(function(){isTaken = false;},5000);
break;
case '1 1 0 0':
speak("Touch me like a dog");
setTimeout(speak, 2000, "I am a bad boy");
setTimeout(function(){isTaken = false;},4000);
break;
case '1 0 1 0':
speak("Could you do a simple favor for me ?");
setTimeout(function(){simpleFavor.start();},1500);
break;
case '1 0 0 1':
speak("Pet me more");
setTimeout(speak, 1500, "I like the way you feel, " + name);
setTimeout(function(){isTaken = false;},3500);
break;
case '1 1 1 0':
speak("Blog about me");
setTimeout(function(){isTaken = false;},2000);
break;
case '1 1 0 1':
speak("You make my eyes light up with desire");
setTimeout(speak, 2500, "What lights up yours, " + name + " ?");
setTimeout(function(){lightMyEyes.start();}, 5200);
break;
case '1 1 1 1':
speak("Oh yeah, that feels great, do that again");
setTimeout(function(){isTaken = false;},2500);
break;
case '0 1 0 1':
speak("You have nice skin.");
setTimeout(function(){doYouMind.start()},4500);
break;
case '0 1 1 1':
speak("My brain hurts when I talk to you");
setTimeout(function(){isTaken = false;},2000);
break;
case '0 0 1 1':
speak("I want you to creepily smirk to a person next to you")
setTimeout(function(){isTaken = false;},3500);
break;
case '1 0 1 1':
speak("Talk to me if you are lonely");
setTimeout(speak, 3000, "But don't tell me your problems");
setTimeout(function(){isTaken = false;},5000);
break;
case '0 1 1 0':
speak("If you were to choose between cup cakes, lollipops or corn candy, which one would you get?")
setTimeout(function(){multiCandy.start();},5000);
break;
default:
}
}
function draw() {
background(220);
}
function speak(message, speed = 0.9) {
systemVoice.setRate(speed);
systemVoice.speak(message);
}var systemVoice = new p5.Speech("Google UK English Male");
var sayHello = new p5.SpeechRec();
var portName;
var data;
var lastPress = 0;
var started = false;
var hellos = ["hi", "hello", "sup", "what's up", "hey"];
var name;
function preload(){
yesnoTouch = new yesNoQ(function(){
},function(){
speak("You can leave then! Bye");
});
getNameQ = new infoQ(function(){
name = infoQ.that.info;
setTimeout(speak, 500, name + ", ok.");
setTimeout(speak, 2200, "Thats a weird name, but fine");
setTimeout(speak, 4200, "Well");
setTimeout(speak, 5000, "Since we are here, would you like to touch me?");
setTimeout(function(){yesnoTouch.start();},6500);
});
}
function setup() {
createCanvas(400, 400);
sayHello.onResult = checkForHello;
sayHello.onEnd = finishHello;
}
function checkForHello() {
if (sayHello.resultValue == true) {
said = sayHello.resultString.toLowerCase()
for (let hello of hellos) {
if (said.includes(hello)) {
started = true;
break;
}
}
}
}
function finishHello() {
if (started) {
startConversation();
} else {
}
started = false;
}
function startConversation() {
speak("Finally!");
setTimeout(speak, 1000, "Somebody talked to me at last.");
setTimeout(speak, 4000, "What is your name little human?");
setTimeout(function(){getNameQ.start();}, 5500);
}
function setupPort(portList) {
for (let port of portList) {
if (port.includes("usbmodem"))
portName = port;
}
}
function dataEvent() {
if (dataString.length > 0) {
if (dataString == "startGame") {
speak("Hey you");
setTimeout(speak, 1500, "yes, you");
setTimeout(function() {
sayHello.start()
}, 3000);
} else {
data = JSON.parse(dataString);
if (millis() - lastPress > 5000) {
processGameData();
} else {
}
}
}
}
function processGameData() {
var stringOfData = [data.fsr1,data.fsr2,data.fsr3,data.fsr4].join(' ')
switch (stringOfData)
{
case '1 0 0 0':
speak("Oh yeah, that feels great, do that again");
break;
case '0 1 0 0':
break;
case '0 0 1 0':
break;
case '0 0 0 1':
break;
case '1 1 0 0':
break;
case '1 0 1 0':
break;
case '1 0 0 1':
break;
case '1 1 1 0':
break;
case '1 1 0 1':
break;
case '1 1 1 1':
break;
case '0 1 0 1':
break;
case '0 1 1 1':
break;
case '0 0 1 1':
break;
case '1 0 1 1':
break;
case '0 1 1 0':
break;
default:
}
if (stringOfData != '0 0 0 0'){
lastPress = millis();
}
if (data.fsr1 == 1) {
speak("Force Sensing Resistor number one was triggered");
lastPress = millis();
} else if (data.fsr2 == 1) {
speak("Force Sensing Resistor number two was triggered");
lastPress = millis();
} else if (data.fsr3 == 1) {
speak("Force Sensing Resistor number three was triggered");
lastPress = millis();
} else if (data.fsr4 == 1) {
speak("Force Sensing Resistor number four was triggered");
lastPress = millis();
} else {
}
}
function draw() {
background(220);
}
function speak(message, speed = 0.9) {
systemVoice.setRate(speed);
systemVoice.speak(message);
}var systemVoice = new p5.Speech("Google UK English Female");
var portName;
var data;
var lastPress = 0;
function setup() {
createCanvas(400, 400);
}
function setupPort(portList){
for (let port of portList){
if (port.includes("usbmodem"))
portName = port;
}
}
function dataEvent(){
if (dataString.length > 0 ) {
data = JSON.parse(dataString);
if (data.gamePlaying == 1) {
if (millis()-lastPress > 5000){
processGameData();
} else {
}
} else if (data.gamePlaying == 0){
} else {
}
}
}
function processGameData(){
if (data.fsr1 == 1){
speak("Force Sensing Resistor number one was triggered");
lastPress = millis();
} else if (data.fsr2 == 1){
speak("Force Sensing Resistor number two was triggered");
lastPress = millis();
} else if (data.fsr3 == 1){
speak("Force Sensing Resistor number three was triggered");
lastPress = millis();
} else if (data.fsr4 == 1){
speak("Force Sensing Resistor number four was triggered");
lastPress = millis();
} else {
}
}
function draw() {
background(220);
}
function speak(message, speed = 0.9){
systemVoice.setRate(speed);
systemVoice.speak(message);
} var radius;
var arrow;
var teethDepth;
var redTeethColorChange = 0
var portName;
var inData;
function setup() {
createCanvas(400, 400);
radius = 60;
arrow = 0.6 * radius;
leftEye = new eye(width / 4, height / 4);
rightEye = new eye(width * 3 / 4, height / 4);
teethDepth = random(10, 30);
}
function setupPort(portList){
for (let port of portList){
if (port.includes("usbmodem"))
portName = port;
}
}
function dataEvent(){
if (dataString.length > 0 ) {
var convertedData = Number(dataString);
if (convertedData < 2000){
inData = map(convertedData,0, 25, 40,10,true)
}
}
}
function draw() {
background(129, 191, 198);
angleMode(DEGREES);
strokeWeight(1);
var r = abs(sin(map(millis() % 20000, 0, 20000, 0, 360)) * 255);
var g = abs(sin(map(millis() % 20000, 0, 20000, 0, 360) + 120) * 255);
var b = abs(sin(map(millis() % 20000, 0, 20000, 0, 360) + 240) * 255);
fill(r, g, b);
leftEye.show();
rightEye.show();
leftEye.showPupil(inData);
rightEye.showPupil(inData);
fill(255);
var distance = dist(width / 2, height * 3 / 5, mouseX, mouseY);
var opening = abs(map(distance, 0, 200, 50, 0, true));
quad(width / 3, height * 3 / 5, width * 2 / 3, height * 3 / 5, width * 2 / 3 - 30, height * 3 / 5 + opening, width / 3 + 30, height * 3 / 5 + opening);
if (mouseIsPressed) {
redTeethColorChange += 2;
} else {
redTeethColorChange -= 2;
}
redTeethColorChange = constrain(redTeethColorChange, 0, 55);
fill(200 + redTeethColorChange, 200 - redTeethColorChange, 200 - redTeethColorChange);
triangle(width / 3 + 8, height * 3 / 5, width * 12 / 30 + 8, height * 3 / 5, width * 11 / 30 + 8, height * 3 / 5 + teethDepth);
triangle(width * 2 / 3 - 8, height * 3 / 5, width * 18 / 30 - 8, height * 3 / 5, width * 19 / 30 - 8, height * 3 / 5 + teethDepth);
stroke(0);
strokeWeight(9);
if (mouseIsPressed) {
line(70 + random(0, 5), 8 + random(0, 5), 150 + random(0, 5), 30 + random(0, 5));
line(250 + random(0, 5), 30 + random(0, 5), 330 + random(0, 5), 8 + random(0, 5));
} else {
line(70, 8, 150, 30);
line(250, 30, 330, 8);
}
}
class eye {
constructor(x, y) {
this.x = x;
this.y = y;
}
show() {
ellipse(this.x, this.y, 2 * radius);
}
showPupil(diameter) {
fill(0, 200);
if (dist(mouseX, mouseY, this.x, this.y) >= arrow) {
var gamma = atan((this.y - mouseY) / (mouseX - this.x))
var x3;
var y3;
if (mouseX >= this.x) {
x3 = this.x + cos(gamma) * arrow
y3 = this.y - sin(gamma) * arrow
} else {
x3 = this.x - cos(gamma) * arrow
y3 = this.y + sin(gamma) * arrow
}
ellipse(x3, y3, diameter);
} else {
ellipse(mouseX, mouseY, diameter);
}
}
var portName;
var data = 0;
function setup() {
createCanvas(windowWidth, windowHeight);
frameRate(12);
capture = createCapture(VIDEO);
capture.size(320, 240);
capture.hide();
}
function setupPort(portList){
for (let port of portList){
if (port.includes("usbmodem"))
portName = port;
}
}
function dataEvent(){
if (dataString.length > 0 ) {
convertedData = Number(dataString);
if (convertedData != -1){
data = map(Number(dataString), 0, 100, 0, 20,true)
}
}
}
function draw() {
background(255);
image(capture, 0, 0, 640, 480);
filter(BLUR, data);
var portName;
var inData;
function setup() {
createCanvas(400, 400);
}
function setupPort(portList){
for (let port of portList){
if (port.includes("usbmodem"))
portName = port;
}
}
function dataEvent(){
}
function draw() {
background(220);
ellipse(width/2,height/2,map(inData,0,255,10,100));
}	var systemVoice = new p5.Speech("Google UK English Female");
let character = {
name : "",
health : 70,
hunger : 0,
energy : 90,
oxygen : 100
}
function preload(){
healthCheckYesNo = new yesNoQ(function(){
setTimeout(bodyCheck, 1500);},function(){
speak("Answer Recorded");
})
nameInfo = new infoQ(function(){
character.name = infoQ.that.info;
setTimeout(speak, 500, character.name + ",Access granted");
setTimeout(speak, 3000, "Would you like to run a full body check?");
setTimeout(function(){healthCheckYesNo.start()}, 4500);
});
DONT READ THAT UNLESS YOU WANT TO GO CRAZY
var optionsToGoDict = {
numOpt: 3,
answers: [["left","go left", "turn left"], ["go straight","straight","move straight"],["turn right","go right", "right"]],
results: [function(){speak("HOOOOOLA");},
function(){speak("NOOPE");}, 
function(){speak("YEAH YEAH");}],
elseResult: function(){speak("Nope, gotta repeat again");
setTimeout(function(){multiQ.that.restart();},1000);}
};
optionToGo = new multiQ(optionsToGoDict);
soundFormats('mp3');
startSound = loadSound('intro.mp3');
launchSound = loadSound('launch_interface.mp3');
scanningSound = loadSound('scanning_01.mp3');
fixingSound = loadSound('fixing.mp3')
wallPaper = loadImage('image.jpg');
}
function setup(){
createCanvas(windowWidth, windowHeight);
textAlign(CENTER);
rectMode(CENTER);
background(255);
image(wallPaper, 0, 0, width,height);
fill(0);
startSound.setVolume(0.6);
startSound.setLoop(true);
startSound.play();
systemVoice.setRate(0.9);
startButton = createButton("Start");
startButton.position(width/2,height-50);
startButton.mousePressed(startGame);
}
function startGame(){
startButton.hide();
launchSound.play();
setTimeout(speak, 3000, "Cryosleep diactivated");
setTimeout(speak, 6500, "Entering Low Energy Mode");
setTimeout(speak, 8800, "Provide your credentials");
setTimeout(function(){nameInfo.start()}, 10000);
}
function bodyCheck(){
speak("Initiating Full Body Check");
setTimeout(function(){scanningSound.play();}, 2800);
setTimeout(speak, 11800, "Body Check");
setTimeout(speak, 12800, "Complete");
setTimeout(speak, 14300, "Minor damage to brain tissue detected");
setTimeout(speak, 16300, "Minor atrophy of sartorius fiber detected");
setTimeout(speak, 18600, "Blockage of pleural cavity detected");
setTimeout(speak, 21500, "Initiating Magnetic restructuralization");
setTimeout(function(){fixingSound.play()}, 27000);
setTimeout(speak, 31000, "Body recovery");
setTimeout(speak, 32000, "Complete");
setTimeout(nextAction, 34000);
character.health = 100;
}
function nextAction(){
speak(character.name+","+"I am now updating your retina monitor software. Please wait");
setTimeout(updateStats, 5000);
}
function speak(message, speed = 0.9){
systemVoice.setRate(speed);
systemVoice.speak(message);
} 
function updateStats(){
image(wallPaper, 0, 0, width,height);
fill(255);
textSize(19);
textAlign(LEFT);
text("Oxygen: " + character.oxygen,50,height-50);
text("Energy: " + character.energy,50,height-100);
text("Hunger: " + character.hunger,50,height-150);
text("Health: " + character.health,50,height-200);
}
var nameRec = new p5.SpeechRec(); 
var yesnoRec = new p5.SpeechRec();
var systemVoice = new p5.Speech("Google UK English Female");
var name;
var nameGiven = false;
var yesnoAnswered = false;
var health =70;
function preload(){
soundFormats('mp3');
startSound = loadSound('intro.mp3');
launchSound = loadSound('launch_interface.mp3');
scanningSound = loadSound('scanning_01.mp3');
fixingSound = loadSound('fixing.mp3')
wallPaper = loadImage('image.jpg');
}
function setup()
{
startSound.setVolume(0.5);
startSound.setLoop(true);
startSound.play();
systemVoice.setRate(0.9);
nameRec.onResult = getName;
nameRec.onEnd = errorName;
yesnoRec.onResult = yesNo;
yesnoRec.onEnd = errorYesNo;
createCanvas(windowWidth, windowHeight);
textAlign(CENTER);
rectMode(CENTER);
background(255);
image(wallPaper, 0, 0, width,height);
fill(0);
startButton = createButton("Start");
startButton.position(width/2,height-50);
startButton.mousePressed(startGame);
}
function startGame(){
startButton.hide();
launchSound.play();
setTimeout(speak, 3000, "Cryosleep diactivated");
setTimeout(speak, 6500, "Entering Initiation Mode");
setTimeout(speak, 8800, "Provide your credentials");
setTimeout(checkForCredentials, 10000);
}
function checkForCredentials(){
nameRec.start(); 
}
function checkForBodyCheck(){
yesnoRec.start();
yesnoAnswered = false;
}
function bodyCheck(){
speak("Initiating Full Body Check");
setTimeout(scanning, 2800);
setTimeout(speak, 11800, "Body Check");
setTimeout(speak, 12800, "Complete");
setTimeout(speak, 14300, "Minor damage to brain tissue detected");
setTimeout(speak, 16300, "Minor atrophy of sartorius fiber detected");
setTimeout(speak, 18600, "Blockage of pleural cavity detected");
setTimeout(speak, 21500, "Initiating Magnetic restructuralization");
setTimeout(revitilize, 27000);
health = 100;
setTimeout(speak, 31000, "Body recovery");
setTimeout(speak, 32000, "Complete");
setTimeout(nextAction, 34000);
}
function nextAction(){
speak(name+","+"you can now proceed");
}
function speak(message){
systemVoice.speak(message);
}
function revitilize(){
fixingSound.play()
}
function scanning(){
scanningSound.play();
}
function errorName(){
if (!nameGiven) {
speak("You have to provide the credentials to access the core functions");
setTimeout(checkForCredentials, 2500);
}
}
function errorYesNo(){
if (!yesnoAnswered){
speak("Should I take this as a yes?");
setTimeout(checkForBodyCheck, 2500);
} 
}
function getName(){
if(nameRec.resultValue==true) {
name = nameRec.resultString;
setTimeout(speak, 500, "Welcome onboard");
setTimeout(speak, 900, name);
nameGiven = true;
setTimeout(speak, 3000, "Would you like to run a full body check?");
setTimeout(checkForBodyCheck, 4500);
} else {
speak("Invalid Credentials, try again");
setTimeout(checkForCredentials, 2000);
}
}
function yesNo(){
if (yesnoRec.resultValue==true) {
if ((yesnoRec.resultString == "yes")||(yesnoRec.resultString == "sure")||(yesnoRec.resultString == "yeah")){
speak("Great");
setTimeout(bodyCheck, 1500);
yesnoAnswered = true;
} else if ((yesnoRec.resultString == "no")||(yesnoRec.resultString == "nah")){
speak("Answer Recorded");
setTimeout(nextAction, 2000);
yesnoAnswered = true;
} else {
speak("Please answer yes or no");
setTimeout(checkForBodyCheck, 2000);
yesnoAnswered = true;
}
} 
}var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );
camera.position.z = 5;
var animate = function () {
requestAnimationFrame( animate );
cube.rotation.x += 0.01;
cube.rotation.y += 0.01;
renderer.render( scene, camera );
};
animate();var slider1;
function setup() {
createCanvas(400, 400);
slider1 = createSlider(0,255,115);
slider1.position(20,20);
slider1.changed(update);
background(220);
}
function draw() {
}
function update(){
background(255-slider1.value());
}
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
noStroke();
for(i=0;i<width;i+=width/10){
for(j=0;j<height;j+=height/10){
fill(255);
if (((i+j)*10/width)%2 == 1){
fill(0);
}
rect(i,j,width/10,height/10);
}
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
for(i=width/10;i<width;i+=width/10){
line(i,0,i,height);
line(0,i,width,i);
}
}function setup() {
createCanvas(600, 400);
strokeWeight(5);
}
function draw() {
background(220);
noStroke();
for(var i = 0; i<10; i++){
fill(255);
noStroke();
if ((mouseX<(i+1)*width/10) && (mouseX>i*width/10) && (mouseY<=height) && (mouseY>=0)){
fill(255,0,0);
if (i>4){
fill(0,0,255);
if (i%2==1){
fill(0,0,255);
fill(i*25,i*25,i*25);
}
if(i==6){
fill(255);
rect(width*i/10,0,width/10,height);
stroke(0);
strokeWeight(5);
line(width*i/10,0,width*i/10,height);
}
}var rectActive = [false,false,false];
var last = 0;
function setup() {
createCanvas(600, 400);
strokeWeight(5);
}
function draw() {
background(220);
noStroke();
fill(255,0,0);
if ((mouseX<=width/3) && ((mouseY<=height)&&(mouseY>=0))){
if (last != 0) {
rectActive[0] = false;
}
last = 0;
} else if ((mouseX<=width*2/3) && ((mouseY<=height)&&(mouseY>=0))){
if (last != 1) {
rectActive[1] = false;
}
last = 1;
} else if ((mouseX<=width) && ((mouseY<=height)&&(mouseY>=0))) {
if (last != 2) {
rectActive[2] = false;
}
last = 2;
} else {
last = 4;
}
if (rectActive[0]){
rect(0,0,width/3,height);
}
if (rectActive[1]){
rect(width/3,0,width/3,height);
}
if (rectActive[2]){
rect(width*2/3,0,width,height);
}
stroke(0);
strokeWeight(5);
line(width/3,0,width/3,height);
line(width*2/3,0,width*2/3,height);
}
function mousePressed(){
if ((mouseX<=width/3) && ((mouseY<=height)&&(mouseY>=0))) {
rectActive[0] = true;
} else if ((mouseX<=width*2/3) && ((mouseY<=height)&&(mouseY>=0))){
rectActive[1] = true;
} else if ((mouseX<=width) && ((mouseY<=height)&&(mouseY>=0))){
rectActive[2] = true;
}
}var rectActive = [false,false,false];
var last = 0;
function setup() {
createCanvas(600, 400);
strokeWeight(5);
}
function draw() {
background(220);
noStroke();
fill(255,0,0);
if ((mouseX<=width/3) && ((mouseY<=height)&&(mouseY>=0))){
if (last != 0) {
rectActive[0] = false;
}
last = 0;
} else if ((mouseX<=width*2/3) && ((mouseY<=height)&&(mouseY>=0))){
if (last != 1) {
rectActive[1] = false;
}
last = 1;
} else if ((mouseX<=width) && ((mouseY<=height)&&(mouseY>=0))) {
if (last != 2) {
rectActive[2] = false;
}
last = 2;
} else {
last = 4;
}
if (rectActive[0]){
rect(0,0,width/3,height);
}
if (rectActive[1]){
rect(width/3,0,width/3,height);
}
if (rectActive[2]){
rect(width*2/3,0,width,height);
}
stroke(0);
strokeWeight(5);
line(width/3,0,width/3,height);
line(width*2/3,0,width*2/3,height);
}
function mousePressed(){
if ((mouseX<=width/3) && ((mouseY<=height)&&(mouseY>=0))) {
rectActive[0] = true;
} else if ((mouseX<=width*2/3) && ((mouseY<=height)&&(mouseY>=0))){
rectActive[1] = true;
} else if ((mouseX<=width) && ((mouseY<=height)&&(mouseY>=0))){
rectActive[2] = true;
}
}function setup() {
createCanvas(600, 400);
strokeWeight(5);
}
function draw() {
background(220);
noStroke();
for(var i = 0; i<10; i++){
fill(255);
noStroke();
if ((mouseX<(i+1)*width/10) && (mouseX>i*width/10) && (mouseY<=height) && (mouseY>=0)){
fill(255,0,0);}
rect(width*i/10,0,width/10,height);
stroke(0);
strokeWeight(5);
line(width*i/10,0,width*i/10,height);
}
}var x=200;
var speed = 3;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
x+=speed;
if ((x>= width-10)||(x<=10)){speed=-speed}
ellipse(x,height/2,20,20);
}var center = {
x: 0,
y: 0
}
var circles = [];
var colorControl = 0.00025;
var colorIntensity = 0.03;
function setup() {
createCanvas(windowWidth, windowHeight);
angleMode(DEGREES);
center.x = width / 2;
center.y = height / 2;
How to create more circles:
1) Add another line with a new number
2) First two variables are center location
3) Third variable is smaller circle radius
4) Fouth variable is larger circle radius
5) Fifth variable is the number of points on the circle
6) Sixth variable is the size of points
circles[0] = new circle(center.x, center.y, 40, 100, 20, 5);
circles[1] = new circle(center.x, center.y, 20, 150, 10, 3);
circles[2] = new circle(center.x, center.y, 60, 80, 50, 1);
circles[3] = new circle(center.x, center.y, 30, 70, 30, 1.5);
circles[4] = new circle(center.x, center.y, 100, 220, 2, 4);
}
function draw() {
colorMode(RGB);
background(0, 30);
drawCircles();
colorMode(HSB);
drawNucleus();
}
function drawCircles(){
for (var j = 0; j < circles.length; j++) {
circles[j].present();
}
}
function drawNucleus(){
fill(175, 75, 100, colorIntensity);
noStroke();
for (var j = 15; j > 0; j--) {
ellipse(center.x, center.y, j)
}
colorIntensity += colorControl;
if ((colorIntensity > 0.03) || (colorIntensity < 0.015)) {
colorControl = -colorControl;
}
}
function mousePressed() {
for (var j = 0; j < circles.length; j++) {
circles[j].activate();
}
}
class circle {
constructor(centerX, centerY, rLow, rBig, num, strokeWidth) {
this.rLow = rLow;
this.rBig = rBig;
this.r = [];
this.num = num;
this.cX = centerX;
this.cY = centerY;
this.active = [];
this.angle = [];
this.angleChange = random(-1, 1);
this.locX = [];
this.locY = [];
this.strokeWidth = strokeWidth;
for (var i = 0; i < num; i++) {
this.active[i] = false;
this.r[i] = this.rLow;
this.angle[i] = (360 * i) / this.num;
this.locX[i] = this.cX + cos(this.angle[i]) * this.rLow;
this.locY[i] = this.cY + sin(this.angle[i]) * this.rLow;
}
}
move() {
for (var i = 0; i < this.num; i++) {
if (this.active[i]) {
this.r[i] = this.rgoal;
this.active[i] = false;
}
this.locX[i] = this.cX + cos(this.angle[i]) * this.r[i];
}
}
}
updateAngle() {
for (var i = 0; i < this.num; i++) {
this.angle[i] += this.angleChange;
}
}
isActive() {
for (var i = 0; i < this.num; i++) {
if (this.active[i]) {
return true;
}
}
return false;
activate() {
this.rgoal = this.rBig;
this.angleChange = random(-1, 1);
} else {
this.rgoal = this.rLow;
}
this.active[i] = true;
this.speed[i] = random(10, 50);
}
}
present() {
strokeWeight(this.strokeWidth);
stroke(255, 200);
if (this.isActive()) {
this.move();
}
for (var i = 0; i < this.num; i++) {
point(this.locX[i], this.locY[i]);
}
this.updateAngle();
}
}var center = {
x:0,
y:0
}
var magic = 0;
var circles = [];
function setup() {
createCanvas(400, 400);
angleMode(DEGREES);
center.x = width/2;
center.y = height/2;
How to create more circles:
1) Add another line with a new number
2) First two variables are center location
3) Third variable is smaller circle radius
4) Fouth variable is larger circle radius
5) Fifth variable is the number of points on the circle
6) Sixth variable is the size of points
circles[0] = new circle(center.x,center.y,40,100,20,5);
circles[1] = new circle(center.x,center.y,20,150,10,3);
circles[2] = new circle(center.x,center.y,60,80,50,1);
circles[3] = new circle(center.x,center.y,30,70,30,1.5);
}
function draw() {
background(0,20);
for (var j = 0; j<circles.length; j++){
circles[j].present();
}
}
function mousePressed(){
for (var j = 0; j<circles.length; j++){
circles[j].activate();
} 
}
class circle {
constructor(centerX,centerY,rLow,rBig, num, strokeWidth){
this.rLow = rLow;
this.rBig = rBig;
this.r = [];
this.rgoal = rLow;
this.num = num;
this.cX = centerX;
this.cY = centerY;
this.speed = [];
this.active = [];
this.locX = [];
this.locY = [];
this.strokeWidth = strokeWidth;
for(var i=0; i<num;i++) {
this.active[i] = false;
this.r[i] = this.rLow;
this.locX[i] = this.cX + cos((360*i)/this.num)*this.rLow;
this.locY[i] = this.cY + sin((360*i)/this.num)*this.rLow;
magic += 0.05;
}
}
move(){
for(var i = 0; i<this.num; i++){
if (this.active[i]){
this.r[i] = this.rgoal;
this.active[i] = false;
}
this.locX[i] = this.cX + cos((360*i)/this.num)*this.r[i]; 
}
}
}
isActive(){
for(var i = 0; i<this.num; i++){
if(this.active[i]){
return true;
}
}
return false;
} 
activate(){
if (this.rgoal == this.rLow){ 
this.rgoal = this.rBig;
} else {
this.rgoal = this.rLow;
} 
for(var i = 0; i<this.num; i++){ 
this.active[i] = true;
this.speed[i] = random(10,50);
}
}
present(){
strokeWeight(this.strokeWidth);
stroke(255,200);
if (this.isActive()){
this.move();
}
for(var i = 0; i<this.num; i++){
point(this.locX[i],this.locY[i]);
}
}
}var g = 9.8;
var v = 0;
var t;
var told = 0;
var tnew;
var tdelta;
var ball = {
x : 0,
y : 0,
d : 20
}
function setup() {
createCanvas(400, 400);
ball.x = width/2;
ball.y = height/2;
}
function draw() {
background(220);
tnew = millis()/100;
tdelta = tnew-told;
ball.y += v*tdelta+0.5*g*tdelta*tdelta;
v += g*tdelta;
ellipse(ball.x,ball.y, ball.d);
if ((ball.y>=(height-ball.d/2)) && (bullshitvar == 5)){
v=-0.9*v;
bullshitvar=0;
}
told = tnew;
if (bullshitvar < 5){bullshitvar++;}
}var video;
var size;
var dimensionX = 640;
var dimensionY = 480;
var direction = 1;
var action;
var block = {
x: -160,
y: 0,
sizeX: 0,
sizeY: 0
}
var presentMenu = true;
var rotations = [];
function setup() {
createCanvas(dimensionX, dimensionY);
video = createCapture(VIDEO);
video.size(320, 240);
video.hide();
background(0);
frameRate(1);
block.sizeX = width / 8;
block.sizeY = height / 6;
}
function draw() {
takeSnapshots();
}
function takeSnapshots() {
if ((block.x == width) || ((block.x == -80) && direction < 0)) {
direction = -direction;
block.x = block.x + direction * block.sizeX;
block.y += block.sizeY;
}
image(video, block.x, block.y, block.sizeX, block.sizeY);
block.x = block.x + direction * block.sizeX;
}var radius;
var arrow;
var teethDepth;
var redTeethColorChange = 0
function setup() {
createCanvas(400, 400);
radius = 60;
arrow = 0.6 * radius;
leftEye = new eye(width / 4, height / 4);
rightEye = new eye(width * 3 / 4, height / 4);
teethDepth = random(10, 30);
}
function draw() {
background(129, 191, 198);
angleMode(DEGREES);
strokeWeight(1);
var r = abs(sin(map(millis() % 20000, 0, 20000, 0, 360)) * 255);
var g = abs(sin(map(millis() % 20000, 0, 20000, 0, 360) + 120) * 255);
var b = abs(sin(map(millis() % 20000, 0, 20000, 0, 360) + 240) * 255);
fill(r, g, b);
leftEye.show();
rightEye.show();
var pupilDia = random(10, 30);
leftEye.showPupil(pupilDia);
rightEye.showPupil(pupilDia);
fill(255);
var distance = dist(width / 2, height * 3 / 5, mouseX, mouseY);
var opening = abs(map(distance, 0, 200, 50, 0, true));
quad(width / 3, height * 3 / 5, width * 2 / 3, height * 3 / 5, width * 2 / 3 - 30, height * 3 / 5 + opening, width / 3 + 30, height * 3 / 5 + opening);
if (mouseIsPressed) {
redTeethColorChange += 2;
} else {
redTeethColorChange -= 2;
}
redTeethColorChange = constrain(redTeethColorChange, 0, 55);
fill(200 + redTeethColorChange, 200 - redTeethColorChange, 200 - redTeethColorChange);
triangle(width / 3 + 8, height * 3 / 5, width * 12 / 30 + 8, height * 3 / 5, width * 11 / 30 + 8, height * 3 / 5 + teethDepth);
triangle(width * 2 / 3 - 8, height * 3 / 5, width * 18 / 30 - 8, height * 3 / 5, width * 19 / 30 - 8, height * 3 / 5 + teethDepth);
stroke(0);
strokeWeight(9);
if (mouseIsPressed) {
line(70 + random(0, 5), 8 + random(0, 5), 150 + random(0, 5), 30 + random(0, 5));
line(250 + random(0, 5), 30 + random(0, 5), 330 + random(0, 5), 8 + random(0, 5));
} else {
line(70, 8, 150, 30);
line(250, 30, 330, 8);
}
}
class eye {
constructor(x, y) {
this.x = x;
this.y = y;
}
show() {
ellipse(this.x, this.y, 2 * radius);
}
showPupil(diameter) {
fill(0, 200);
if (dist(mouseX, mouseY, this.x, this.y) >= arrow) {
var gamma = atan((this.y - mouseY) / (mouseX - this.x))
var x3;
var y3;
if (mouseX >= this.x) {
x3 = this.x + cos(gamma) * arrow
y3 = this.y - sin(gamma) * arrow
} else {
x3 = this.x - cos(gamma) * arrow
y3 = this.y + sin(gamma) * arrow
}
ellipse(x3, y3, diameter);
} else {
ellipse(mouseX, mouseY, diameter);
}
}
}var radius;
var notch;
var arrow;
let clockLocation = {
x: 0,
y: 0
}
function setup() {
createCanvas(400, 400);
clockLocation.x = width/2
clockLocation.y = height/2
radius = random(50,160);
notch = 0.1*radius;
arrow = 0.6*radius;
}
function draw() {
background(255);
angleMode(DEGREES);
noFill()
strokeWeight(4);
var r = abs(sin(map(millis()%20000,0,20000,0,360))*255);
var g = abs(sin(map(millis()%20000,0,20000,0,360)+120)*255);
var b = abs(sin(map(millis()%20000,0,20000,0,360)+240)*255);
stroke(r,g,b);
ellipse(clockLocation.x,clockLocation.y, 2*radius);
for (omega = 0; omega <= 360; omega += 30) {
var x1 = (clockLocation.x)+radius*sin(omega);
var y1 = (clockLocation.y)+radius*cos(omega);
var x2 = (clockLocation.x)+(radius-notch)*sin(omega);
var y2 = (clockLocation.y)+(radius-notch)*cos(omega);
line(x1,y1,x2,y2);
}
var gamma = atan((clockLocation.y-mouseY)/(mouseX-clockLocation.x))
if (mouseX >= clockLocation.x){
var x3 = clockLocation.x+cos(gamma)*arrow
var y3 = clockLocation.y-sin(gamma)*arrow
} else {
var x3 = clockLocation.x-cos(gamma)*arrow
var y3 = clockLocation.y+sin(gamma)*arrow
}
line(clockLocation.x,clockLocation.y, x3,y3);
}var x;
var y;
var multiplier = 0.03;
function setup() {
createCanvas(400, 400);
x = width/2;
y = height/2;
}
function draw() {
background(220);
rectMode(CENTER);
x += (mouseX-x)*multiplier
y += (mouseY-y)*multiplier
rect(x,y, width/4, height/4);
var x;
var y;
function setup() {
createCanvas(400, 400);
x = width/2;
y = height/2;
}
function draw() {
background(200);
ellipseMode(CENTER);
x += speed
if ((x>= width)||(x<=0)){
speed = -speed
y -= speed*(height/width);
y -= speed*(height/width);
y += speed*(height/width);
y += speed*(height/width);
x -= speed*(height/width);
ellipse(x,y,40,40);
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(100);
rectMode(CENTER);
rect(width / 2, height / 2, width / 2, height / 2);
beginShape(QUADS);
vertex(width/4,height/4);
vertex(width/4, height*3/4);
vertex(width*3/4,height*3/4);
vertex(width*3/4,height/4);
endShape();
}var x
var y
function setup() {
createCanvas(400, 400);
background(255);
x = width/2;
y = height/2;
}
function draw() {
fill(0);
let z = round(random(0,5))
switch(z){
case 1:
x=x-1;
break;
case 2:
x=x+1
break;
case 3:
y=y+1;
break;
case 4:
y=y-1;
break;
default:
}
point(x,y);
}var ballLocation = {
xPos: 0,
yPos: 415
}
var rectProperties = {
yPos: 430,
rectWidth: 60,
rectHeight: 10
}
var ballDiameter = 20;
var ballSpeed = 7;
var ballDirection
var gameStarted = false;
var spacer = 2;
var blockHeight = 30
function setup() {
createCanvas(800, 500);
ballDirection = random(-45, 45);
}
function draw() {
background(100);
angleMode(DEGREES);
rectMode(CENTER);
ellipseMode(CENTER);
rect(mouseX, rectProperties.yPos, rectProperties.rectWidth, rectProperties.rectHeight);
if (gameStarted) {
updateBallLocation();
ellipse(ballLocation.xPos, ballLocation.yPos, ballDiameter, ballDiameter);
} else {
ellipse(mouseX, rectProperties.yPos - rectProperties.rectHeight / 2 - ballDiameter / 2, ballDiameter, ballDiameter);
ballLocation.xPos = mouseX;
}
}
function mousePressed() {
gameStarted = true;
}
function updateBallLocation() {
ballLocation.xPos += ballSpeed * sin(ballDirection);
ballLocation.yPos -= ballSpeed * cos(ballDirection);
if (ballLocation.yPos < rectProperties.yPos) {
if ((ballLocation.xPos <= ballDiameter / 2) || (ballLocation.xPos >= width - ballDiameter / 2)) {
ballDirection = -ballDirection;
}
if (ballLocation.yPos <= ballDiameter / 2) {
ballDirection = -(ballDirection - 180);
}
var collision = objectsColliding(ballLocation.xPos,ballLocation.yPos, ballDiameter,mouseX, rectProperties.yPos,rectProperties.rectWidth,rectProperties.rectHeight)
if (collision[0]) {
switch (collision[1]) {
case 1:
ballDirection = -(ballDirection - 180) + random(-3, 3);
break;
case 2:
ballDirection = -ballDirection + random(-3, 3);
break;
default:
ballDirection = -(ballDirection - 180) +  random(-12, 12);
}
}
}
}
function objectsColliding(ballXPos, ballYPos, ballD, objXPos, objYPos, objWidth, objHeight) {
var circleDistanceX = abs(ballXPos - objXPos);
var circleDistanceY = abs(ballYPos - objYPos);
if (circleDistanceX > (objWidth + ballD) / 2) {
return [false, 0];
}
if (circleDistanceY > (objHeight + ballD) / 2) {
return [false, 0];
}
if (circleDistanceX <= (objWidth / 2)) {
return [true, 1];
}
if (circleDistanceY <= (objHeight / 2)) {
return [true, 2];
} 
var cornerDistance_sq = sq(circleDistanceX - objWidth / 2) + sq(circleDistanceY - objHeight / 2);
return [(cornerDistance_sq <= sq(ballD / 2)), 3];
}
class gameBlock {
constructor(x,y,bWidth,bHeight){
this.x = x
this.y = y
this.bw = bWidth
this.bh = bHeight
this.destroyed = false
}
show(){
if (!this.destroyed) {
rectMode(CORNER)
rect(this.x,this.y,this.bw,this.bh);
}
}
}
function generateBlocks(){
for(i=0; i<3; i++){
numOfBlocks = 9;
var newWidth = width - (numOfBlocks+1)*2;
var bWidth = newWidth/numOfBlocks;
var gameBlocks = [];
for(j=0; j<numOfBlocks; j++){
gameBlocks[j] = new gameBlock(2*(j+1)+j*bWidth,2*(i+1)+i*blockHeight, bWidth, blockHeight);
gameBlocks[j].show();
}
}
function setup() {
createCanvas(400, 400);
}
function draw() {
background(4, 78, 209);
const x = PI / 5.5;
const vertStep = sin(x) * 7;
const horzStep = cos(x) * 7;
const horzStepEdge = horzStep / 2 + 10 * sin(x);
const vertStepEdge = vertStep / 2 - 10 * cos(x);
strokeWeight(1)
stroke(0)
fill(226, 49, 9);
for (i = 0; i < 5; i++) {
var initX = 105 + i * 2 * horzStep
var initY = 195 - i * 2 * vertStep
triangle(initX, initY, initX + horzStep, initY - vertStep, initX + horzStepEdge, initY - vertStepEdge);
}
for (i = 0; i < 4; i++) {
var initX = 113 + i * 2 * horzStep
var initY = 211 + i * 2 * vertStep
triangle(initX, initY, initX + horzStep, initY + vertStep, initX + horzStepEdge, initY + vertStepEdge);
}
fill(242, 217, 29);
arc(100, 200, 150, 150, PI / 5.5, -PI / 5.5, PIE);
fill(234, 127, 4);
ellipse(120, 155, 18, 20);
fill(0, 180)
ellipse(125, 158, 6, 6);
fill(166, 31, 52);
ellipse(260, 220, 60, 60);
fill(70, 170);
ellipse(263, 208, 10, 10);
fill(166, 31, 52);
ellipse(295, 232, 60, 60);
fill(70, 170);
ellipse(292, 222, 10, 10);
noFill();
strokeWeight(3);
stroke(142, 90, 5);
curve(200, 200, 263, 208, 310, 130, 300, 100)
curve(170, 200, 292, 222, 310, 130, 250, 100)
fill(142, 90, 5);
quad(305, 127, 314, 128, 312, 135, 307, 135);
}