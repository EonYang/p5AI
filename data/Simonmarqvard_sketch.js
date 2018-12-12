let word = "EERTMLAP"
let x = 0
function setup() {
createCanvas(500, 500);
for (let i = 0; i < word.length; i++) {
ch.push(word.charAt(i));
leaf.push(word.charAt(i));
}
}
let ch = []
let leaf = []
let counter = 0;
let adiff = 0;
let counter2 = 0 
function draw() {
background(0, 0,0);
for (let i = 0; i < ch.length; i++) {
fill("chocolate");
text(ch[i],width/2,height-i*counter )
}
if (counter > 40) {
counter = 40;
counter2 += 0.1
}
if (counter2 > 15) {
counter2 = 15
}
counter += 0.1
adiff += 0.1
}
function drawleaf(word, r, a, rot) {
push();
translate(width/2,height/2 + 30)
rotate(radians(rot));
for(let i = 0 ; i < word.length; i++) {
let ch = word.charAt(i);
rotate(radians(a));
fill("seagreen");
text(ch, r, 20);
}
pop();
}
let font;
let t = 0;
let vehicles = []
function preload() {
font = loadFont('Roboto-Regular.ttf')
}
function setup() {
createCanvas(400, 400);
var points = font.textToPoints('Word',25,150,150);
for(var i = 0; i < points.length; i++) {
let outline = points[i];
let vehicle = new Vehicle(outline.x,outline.y,noise(t))
vehicles.push(vehicle)
}
}
function draw() {
background(0)
for(var i = 0; i < vehicles.length; i++) { 
let v = vehicles[i]
v.show()
}
}
let word = "palmtree"
let numberOfLeaves = 7
let xpos;
let ypos;
function setup() {
let body = select('body');
body.style('backgroundColor', 'black')
noCanvas()
let span = 40
let xpos = windowWidth/2
let ypos = windowHeight/10
for( let i = 0; i < numberOfLeaves; i++) {
tree(word, random(xpos, xpos+span), random(ypos, ypos +span), random(150,300), random(10,20))
}
for( let i = 0; i < numberOfLeaves; i++) {
tree(word, random(xpos, xpos-span), random(ypos, ypos +span), random(150,300), random(-20, -10))
}
for(let i = 0 ; i < word.length; i++) {
let ch = word.charAt(i)
let l = createDiv(ch);
l.style("width", "20px")
l.style("height", "40px")
l.style('transform', 'rotateZ(45deg)')
l.style('fontSize', '20px')
l.style('color', 'chocolate')
}
}
function tree(word,x,y,h, a) {
for(let i = 0 ; i < word.length; i++) {
push()
let ch = word.charAt(i)
let l = createDiv(ch);
l.style("width", "20px")
l.style("height", h+"px")
l.position(x,y)
let theta = a * i
l.style("transform", "rotateZ("+theta+"deg)")
l.style('color', 'seaGreen')
pop()  
}
}let word = "palmtree"
function setup() {
noCanvas()
for(let i = 0 ; i < word.length; i++) {
let ch = word.charAt(i)
let l = createDiv(ch);
l.style("width", "20px")
l.style("height", "40px")
l.style('transform', 'rotateZ(45deg)')
}
}let word = "Palmtree"
function setup() {
noCanvas();
let xmiddle = windowWidth * 0.5;
let ymiddle = windowHeight * 0.5;
let body = select('body');
body.style('transform', 'rotateZ(90deg)' + "translateY(-100px)" + "translateX(+300px)");
for (let i = 0; i < word.length; i++) {	
let ch = word.charAt(i);
let d = createDiv(ch)
d.position(`${ymiddle}` * i/6 , `${xmiddle}`) 
d.style('transform', 'rotateZ(-45deg)')
}
}
let xStart = 0;
let yStart = 50;
let yloc = 0
let xmov = 0
let ymov = 0
let t;
let savedTime 
let totalTime = 3000
function setup() {
createCanvas(400, 400);
savedTime = millis()
t = 0
}
function draw() {
let passedTime = millis() - savedTime
if (passedTime > totalTime) {
console.log("happen")
xStart += 50
yStart = yStart
yloc = 0 
console.log(yStart)
savedTime = millis()
}
xmov = width/5 * noise(t);
ymov = height/5 * noise(t + 100);
ellipse(xStart + xmov, yStart + ymov,1)
t += 0.01
}
let xStart = 0;
let yStart = 50;
let yloc = 0
let xmov = 0
let ymov = 0
let t;
let savedTime 
let totalTime = 3000
function setup() {
createCanvas(400, 400);
savedTime = millis()
t = 0
}
function draw() {
let passedTime = millis() - savedTime
if (passedTime > totalTime) {
console.log("happen")
xStart += 50
yStart = yStart
yloc = 0 
console.log(yStart)
savedTime = millis()
}
xmov = width/5 * noise(t);
ymov = height/5 * noise(t + 100);
ellipse(xStart + xmov, yStart + ymov,1)
t += 0.01
}
let word = "hello"
let move = false;
let back = false;
function setup() {
noCanvas();
frameRate(4);
}
function draw() {
if (move == false && back == false) {
console.log("start")
for(let i = 0; i < word.length; i++) { 
term.write(word[i] + " ");	
}
}
if (frameCount > 15 && frameCount < 30) {
move = true
}
if (move == true && back == false) {
console.log("new15")	
for(let i = 0; i < word.length; i++) { 
term.write(word[i] + "\n");	
}
}
if (frameCount > 30 && frameCount < 45) {
back = true
move = false
}
if (move == false && back == true) {	
console.log("new30")
for(let i = 0; i < word.length; i++) { 
term.write(word[i]+ "\r\n");
}
}
if (frameCount > 45 && frameCount < 60) {
back = true
move = true
}
if (move == true && back == true) {	
console.log("new45")
for(let i = 0; i < word.length; i++) { 
term.write(word[i] + "\n");
term.write(word[i]+ " ");
}
}
if (frameCount > 60) {
console.log("new60");	
for(let i = 0; i < word.length; i++) { 
term.write(word[i] + "\n");	
}
}
if (frameCount > 75) {
console.log("new75");
term.write(word);	
}
if (frameCount > 90) {
console.log("new90");
term.write(word = "")
}
}let word = "hello"
let move = false;
let back = false;
function setup() {
noCanvas();
frameRate(4);
}
function draw() {
if (move == false && back == false) {
console.log("start")
for(let i = 0; i < word.length; i++) { 
term.write(word[i] + " ");	
}
}
if (frameCount > 15 && frameCount < 30) {
move = true
}
if (move == true && back == false) {
console.log("new15")	
for(let i = 0; i < word.length; i++) { 
term.write(word[i] + "\n");	
}
}
if (frameCount > 30 && frameCount < 45) {
back = true
move = false
}
if (move == false && back == true) {	
console.log("new30")
for(let i = 0; i < word.length; i++) { 
term.write(word[i]+ "\r\n");
}
}
if (frameCount > 45 && frameCount < 60) {
back = true
move = true
}
if (move == true && back == true) {	
console.log("new45")
for(let i = 0; i < word.length; i++) { 
term.write(word[i] + "\n");
term.write(word[i]+ " ");
}
}
if (frameCount > 60) {
console.log("new60");	
for(let i = 0; i < word.length; i++) { 
term.write(word[i] + "\n");	
}
}
if (frameCount > 75) {
console.log("new75");
term.write(word);	
}
if (frameCount > 90) {
console.log("new90");
term.write(word = "")
}
}let myMap;
let canvas;
const mappa = new Mappa('Leaflet');
const options = {
lat: 0,
lng: 0,
zoom: 4,
}
function setup(){
canvas = createCanvas(640,640);
myMap = mappa.tileMap(options); 
myMap.overlay(canvas) 
fill(200, 100, 100);
}
function draw(){
const nigeria = myMap.latLngToPixel(11.396396, 5.076543); 
ellipse(nigeria.x, nigeria.y, 20, 20);
}function setup() {
let testData = [{ 
"jump": "CounterMovementJump",
measurement: [2,2,2,2,2] 
}, {
"jump": "SquatJump",
measurement: [3,3,3,3,3]
}]
for (let i = 0 ; i < testData.length; i++) {
console.log(testData[i].measurement)
}
}
function setup() {
}
for (var i = 0; i < portList.length; i++) {
}
let info;
function setup() {
createCanvas(640, 360);
lifetime = height;
lifeCounter = 0;
target = createVector(width / 2, 24);
let mutationRate = 0.01;
population = new Population(mutationRate, 50);
info = createP("");
info.position(10, 380);
}
function draw() {
background(101);
fill(0);
stroke(0);
ellipse(target.x, target.y, 24, 24);
if (lifeCounter < lifetime) {
population.live();
lifeCounter++;
} else {
lifeCounter = 0;
population.fitness();
population.selection();
population.reproduction();
}
fill(0);
info.html("Generation #: " + population.getGenerations() + "<br>" + "Cycles left: " + (lifetime - lifeCounter));
}
function mousePressed() {
target.x = mouseX;
target.y = mouseY;
}var sim = ["k", "l" , "m"]
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
console.log(sim.join(""));
}  var array1 = [2, 3, 6];
function setup() {
createCanvas(400, 400);
array1.forEach(function(hi) {
console.log(hi * 20);
});
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
ellipse(200,200,300,200);
}function setup() {
createCanvas(400, 400, WEBGL);
}
function draw() {
background(220);
orbitControl();
translate(width/2,height/3);
beginShape()
vertex(0,30);
vertex(30,40);
vertex(60,200);
endShape();
}let letters = []
let keychar;
let fullText = [];
let word;
let updatedKey;
var keys = [];
function setup() {
createCanvas(400, 400);
let ListOfWords = ["ELEPHANT", "BASEBALL", "HOUSEPARTY"]
word = ListOfWords[Math.floor(Math.random() * ListOfWords.length)]
console.log(word);
}
function keyPressed(e) {
keys[e.keyCode] = e.keyCode - 1;
updatedKey = keys[e.keyCode]
keychar = String.fromCharCode(updatedKey);
console.log(keychar, key)
}
let index = 0
let combinedtext = "";
function draw() {
background(100);
if (keyIsPressed && keychar == word[index]) {
append(fullText, word[0 + index]);
index++
console.log("SWITCHPLAYER");
} else {
console.log("TRY AGAIN");
}
combinedtext = join(fullText, "");
textAlign(CENTER);
textSize(10);
text("Spell the word one letter at a time. Type one letter and wait for opponent: " + word, 200,100);
textSize(30);
text("You typed: " + keychar, 200, height - 50);
text(combinedtext, width / 2, height / 2);
}let updatedKey;
var keys = [];
function keyPressed(e) {
keys[e.keyCode] = e.keyCode - 1;
updatedKey = keys[e.keyCode]
}
function draw() {
background(100);
let keychar = String.fromCharCode(updatedKey);
fill(0);
textSize(14);
text(keychar, 20, 20);
}let x;
let y;
let speed = 2;
let speed2 = 2;
let x2;
let state = true;
let pstate = false;
function setup() {
createCanvas(400, 400);
x = width / 2;
y = height / 2;
x2 = width / 5
}
function draw() {
background(100);
ellipse(x, y, 50, 50);
ellipse(x2, y, 50, 50);
x = x + speed;
x2 = x2 + speed2;
if (x > width || x < 0) {
speed *= -1;
}
if (x2 > width || x2 < 0) {
speed2 *= -1;
}
let isOver = x == x2
if (isOver && state != pstate) {
background(200, 200, 200);
pstate = true;
}
}function setup() { 
createCanvas(400, 400,WEBGL);
} 
function draw() { 
background(220);
translate(-100,0);
rotateX(20);
fill(20);
plane(100,100);
}let al;
let b;
let angle
function setup() {
createCanvas(400, 400);
}
function draw() {
background(100);
let a = createVector(10, 2);
al = a.mult(100);
b = createVector(mouseX, mouseY);
let am = a.mag()
let bm = b.mag();
let dotp = a.dot(b)
angle = acos(a.dot(b) / (a.mag() * b.mag()));
let l = line(0, 0, a.x, a.y);
let bline = line(0, 0, b.x, b.y);
angle = angle * 180 / PI
text(angle, width / 2, height / 2);
}
var r = 6
let v;
let debug = true;
let d = 25;
function setup() {
createCanvas(640, 360);
v = new Vehicle(width / 2, height / 2);
}
function draw() {
background(51);
if (debug) {
stroke(175);
noFill();
rectMode(CENTER);
rect(width / 2, height / 2, width - d * 2, height - d * 2);
}
v.boundaries();
v.update();
v.display();
}
function mousePressed() {
debug = !debug;
}
class Vehicle {
constructor(x, y) {
this.acceleration = createVector(0, 0);
this.velocity = createVector(3, 4);
this.position = createVector(x, y);
this.r = 6;
this.maxspeed = 3;
this.maxforce = 0.15;
}
update() {
this.velocity.add(this.acceleration);
this.velocity.limit(this.maxspeed);
this.position.add(this.velocity);
this.acceleration.mult(0);
}
applyForce(force) {
this.acceleration.add(force);
}
boundaries() {
let desired = null;
if (this.position.x < d) {
desired = createVector(this.maxspeed, this.velocity.y);
} else if (this.position.x > width - d) {
desired = createVector(-this.maxspeed, this.velocity.y);
}
if (this.position.y < d) {
desired = createVector(this.velocity.x, this.maxspeed);
} else if (this.position.y > height - d) {
desired = createVector(this.velocity.x, -this.maxspeed);
}
if (desired !== null) {
desired.normalize();
desired.mult(this.maxspeed);
let steer = p5.Vector.sub(desired, this.velocity);
steer.limit(this.maxforce);
this.applyForce(steer);
}
}
display() {
let theta = this.velocity.heading() + PI / 2;
fill(127);
stroke(200);
strokeWeight(1);
push();
translate(this.position.x, this.position.y);
rotate(theta);
beginShape();
vertex(0, -this.r * 2);
vertex(-this.r, this.r * 2);
vertex(this.r, this.r * 2);
endShape(CLOSE);
pop();
}
}
function wrapValue(n) {
var localVariable = n;
return function() {return localVariable;};
}
var wrap1 = wrapValue(1);
console.log(wrap1());
function multiplier(factor) {
return function(number) {
return number * factor;
};
}
var twice = multiplier(2);
console.log(twice(5));
function setup() {
createCanvas 
}
function draw() {
}let state;
function setup() {
createCanvas(400,400); 
}
function draw() {
if (mouseIsPressed && state != 
}
function setup() {
createCanvas(600,600); 
textAlign(CENTER);
text("P5*JS",width/2,height/2); 
}
function draw() {
}let startAngle = 0.2;
let angleVel = 0.4;
function setup() {
createCanvas(400,400) 
}
function draw() {
var angle = angle + startAngle;
beginShape()
for (var x = 0; x < width; x+= 5) {
var y = map(sin(angle), -1, 1,0, height);
vertex(x,y);
endShape();  
angle += angleVel;
}
}
let angle = 0;
let r = 100;
function setup() {
createCanvas(400,400) 
}
function draw() {
let x = r * sin(angle);
let y = r * cos(angle);
ellipse(x + width/2, y + height/2,30,30);
angle += 0.1;
r += 0.1;  
console.log(angle);
}
let angle = 0;
let r = 100;
function setup() {
createCanvas(400,400) 
}
function draw() {
background(100);
let x = r * sin(angle);
let y = r * cos(angle);
ellipse(x + width/2, 100,30,30);
angle += 0.1;
console.log(angle);
}
let walker;
let walkers = []
let totalAmount = 20;
function setup() {
createCanvas(400, 400);
colorMode(HSB,255,255,255);
for (var i = 0; i < totalAmount; i++) {
walkers.push(new Walker(random(width),random(height)));
}
}
function draw() {
background(30,200,200)
for (var i = 0; i < totalAmount; i++) {
walkers[i].display();
walkers[i].update();
walkers[i].edges();
}
}
let walkers = [];
let totalWalkers = 40;
function setup() {
createCanvas(400, 400);
for (var i = 0; i < totalWalkers; i++) {
walkers.push(new Walker(random(width/3,width/3*2),random(height/3,height/3*2)));
}
}
function draw() {
background(220);
for (var i = 0; i < totalWalkers-1; i++) {
walkers[i].display();
walkers[i].update();
push();
beginShape(QUADS);
fill(255,255,255)
vertex(walkers[i+1].x+5,walkers[i+1].y)
vertex(walkers[i+1].x-5,walkers[i+1].y)
vertex(walkers[i].x-5,walkers[i].y)
vertex(walkers[i].x+5,walkers[i].y)
endShape(CLOSE);
pop();
}
}
let walker;
function setup() {
createCanvas(320, 240);
walker = new Walker();
background(127);
}
function draw() {
for (let i = 0; i < 500; i++) {
walker.render();
walker.step();
}
}let knn;
let video;
function preload() {
knn = new.p5ml.KNNImageClassifier(modelloaded, 2, 1); 
}
function modelloaded() {
console.log(loaded);
}
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
}let gameStart = false;
function setup() { 
createCanvas(400, 400); 
} 
function draw() { 
if (gameStart) {
moveBall();			
}		
}
function moveBall() {
ellipse(width/2,height/2,40,40);	
}
function mousePressed() {
gameStart = true;	
var sensor;
yVal = [];
var x = 0;
var y;
var data;
function setup() {
createCanvas(2000, 400);
y = height/2;
}
function draw() {
background(100);
ellipse(width/2,height/2,100+(y*10),100+(y*10));
}
}
function setup() { 
createCanvas(400, 400);
circles = new Bubble(width/2,height/2);
} 
function draw() { 
background(220);
circles.display();
circles.move();
}
class Bubble {
constructor(x,y) {
this.x = x;
this.y = y;
}
display() {
ellipse(this.x,this.y,20,20); 
}
move() {
let a = sin(PI);
PI = PI + 0.02;
this.y += a
this.x = this.x - 1;
}
let searchWord = "travel";
let ImagesFromTheWorld = [];
let loadImages;
function preload() {
loadImages = loadJSON(flickrAPI, showMeTheGoods);
}
function showMeTheGoods(jsonData){
for (var i = 0 ; i < 10 ; i++ ) {
let server = jsonData.photos.photo[i].server;
let secret = jsonData.photos.photo[i].secret;
let id = jsonData.photos.photo[i].id;
ImagesFromTheWorld.push(newUrl);
}
console.log(ImagesFromTheWorld);
}
function setup() {
createCanvas(800, 800);
}
function draw() {
background(255);
}
var xPos = 0;
var yPos = 0;
let dataArray = [];
let maxValues = 500;
let medium = 0;
let max = 0;
let min = 0;
let middle = 0;
function setup() {
createCanvas(windowWidth, 600);
}
function draw() {
background(0);
for(let i = 0; i < dataArray.length - 1; i++){
stroke(0,255,0);
let y = map(dataArray[i], min, max, (height/2) - 100, (height/2) + 100);
let y2 = map(dataArray[i+1], min, max, (height/2) - 100, (height/2) + 100);
line(i * (width/maxValues), y, (i+1) * (width/maxValues), y2)
}
}
let first = true;
let tempArray = [];
if (data.length > 0) {
if(tempArray.length > 10){
dataArray.push(d3.mean(tempArray));
console.log(tempArray);
medium = d3.mean(dataArray);
max = d3.max(dataArray);
min = d3.min(dataArray);
middle = (max-min)/2;
while(dataArray.length > maxValues){
dataArray.splice(0,1);
}
tempArray = [];
}
}
}
function mousePressed(){
dataArray=[];
}
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
}
var xPos = 0;
var yPos = 0;
function setup() {
createCanvas(800, 600);
}
function draw() {
background(240);
fill(40);
ellipse(xPos, yPos, 50, 50);
}
if (data.length > 0) {
var sensors = split(data, ",");
yPos = int(data);
}
}
let name;
let budget;
let currentLoc
let submitbutton
let profileImage;
let database;
let config = {
apiKey: "AIzaSyCNXWvMxraT7PTKKCLk4uzaQD-XNhzqw84",
authDomain: "windemere-44.firebaseapp.com",
projectId: "windemere-44",
storageBucket: "",
messagingSenderId: "115375595951"
};
function setup() {
createCanvas(600, 600);
name = createInput("Write Your Name");
name.position(width / 2, height / 4);
budget = createInput("Budget");
budget.position(width / 2, height / 3);
currentLoc = createInput("Current City");
currentLoc.position(width / 2, height / 2);
submitbutton = createButton("Submit");
submitbutton.position(width / 2, height / 3 * 2);
submitbutton.mousePressed(sendData);
profileImage = createCapture(VIDEO);
profileImage.size(320, 320);
firebase.initializeApp(config);
database = firebase.database();
userProfiles = database.ref('userProfiles');
userProfiles.on('value', gotData, gotErr);
}
function gotData(data) {
let allProfiles = data.val();
let allKeys = Object.keys(allProfiles);
for (let i = 0; i < allKeys.length; i++) {
let k = allKeys[i];
console.log(allProfiles[k])
}
}
function gotErr(err) {
console.log('Error!');
console.log(err);
}
function sendData() {
var data = {
"name": name.value(),
"budget": budget.value(),
"location": currentLoc.value()
}
userProfiles.push(data, finished);
}
function finished(error) {
if (error) {
console.log('Error!');
} else {
console.log('data saved!');
}
}
function draw() {
clear();
textAlign(CENTER);
text('CREATE PROFILE', width / 2, height / 8);
text('Name', width / 5, height / 4);
var sensor;
yVal = [];
var x = 0;
function setup() {
createCanvas(2000, 400);
}
function draw() {
line(x, height, x,map(average(),0,1000,h,height/2));
x = x + 1;
}
function average() {
var sum = 0;
for (var i = 0; i < yVal.length; i++) {
sum += yVal[i];
}
return sum / 10;
}
if (data.length > 0) {
yVal.push(int(data));
if (yVal.length > 25) {
yVal.splice(0, 1);
}
}
}
createCanvas(400, 400);
} 
function draw() { 
background(220);
}let video;
let scale = 10;
let micr = 2;
function setup() {
createCanvas(420, 340);
video = createCapture(VIDEO);
video.size(width / scale, height / scale);
micr = new p5.AudioIn();
micr.start();
}
function draw() {
background(100);
var vol = micr.getLevel();
video.loadPixels();
loadPixels();
for (var x = 0; x < video.width; x++) {
for (var y = 0; y < video.height; y++) {
var index = (x + y * video.width) * 4;
var r = video.pixels[index + 0];
var g = video.pixels[index + 1];
var b = video.pixels[index + 2];
var a = video.pixels[index + 3];
var size = map(vol, 0, 1, 0, 30);
stroke(r, g, b);
fill(r, g, b)
ellipse(x * scale, y * scale, size, size);
}
}
}let video;
let scale = 10;
let micr = 2;
function setup() {
createCanvas(420,340);
video = createCapture(VIDEO);
video.size(width/scale,height/scale);
micr = new p5.AudioIn();
micr.start();
}
function draw() {
background(100);
var vol = micr.getLevel();
video.loadPixels();
loadPixels();
for (var x =0; x < video.width; x++) {
for (var y=0; y < video.height; y++) {
var index = (x + y * video.width) * 4;     
var r = video.pixels[index+0];
var g  = video.pixels[index+1];
var b = video.pixels[index+2];
var a = video.pixels[index+3];
var size = map(vol,0,1,3,30); 
stroke(r,g,b);  
fill(r,g,b)
ellipse(x*scale,y*scale,size,size);
}
}
}
var img_names = ['fbook.jpg', 'sim.JPG'];
var img = [];
function setup() { 
createCanvas(400, 400);
for(let i = 0; i < img_names.length;  i++){
img.push( loadImage(img_names[i]) ); 
}
} 
function draw() { 
background(220);
scale(0.4);
image(img[1],0,0);
let tal;
let løb = [];
let ready = false;
function setup() {
createCanvas(500,500);
loadJSON(url, dataTable);
}
function dataTable(data) {
for (var i = 0; i < 24; i++) {
løb.push ({
lat : data.features[i].geometry.coordinates[0],
long: data.features[i].geometry.coordinates[1],
cond: data.features[i].properties.taellested
})
}
ready = true;
}
function draw() {
if(ready){
for (var i = 0; i < 24; i++) {
var xpos = løb[i].lat;
var ypos = løb[i].long; 
xPosMap = map(xpos,12.46,12.64,0,width)
yPosMap = map(ypos,55.6,55.78,0,height); 
push();
translate(yPosMap,height/2);
rotate(PI/2);
text(løb[i].cond,0,0);
pop();
}
}
}var balls;
var library;
var book;
function preload() {
library = loadImage('lib.jpg')
book = loadImage('fbook.jpg')
}
function setup() {
createCanvas(1200,900);
balls = new Ball(width/2,height/2);
}
function draw() {
image(library,0,0);
balls.move();
balls.display();
}
class Ball {
constructor(x,y) {
this.x = x; 
this.y = y;
this.xspeed = 3;
this.yspeed = 2.7;
}
move() {
this.x = this.x + this.xspeed;
this.y = this.y + this.yspeed;
if (this.x > width || this.x < 0) {
this.xspeed = this.xspeed * -1;
}
if (this.y > height || this.y < 0) {
this.yspeed = this.yspeed * -1;
}
}
display() {
image(book,this.x,this.y, 105, 136);
}
}var bgImage;
var books;
var flyingbook;
function preload(){
bgImage = loadImage('library.jpg');
flyingbook = loadImage('flyingbook.jpg');
}
function setup() { 
createCanvas(1200, 1200);
books = new Book(width/2,height/2);
} 
function draw() { 
background(bgImage); 
books.update();
books.display();
}
class Book {
constructor(x,y) {
this.x = x;
this.y = y;
this.xspeed = 2;
this.yspeed = 1.5;
}
display() {
scale(0.4);
image(flyingbook,this.x,this.y);
rect(this.x,this.y,20,20);
}
update() {
this.x = this.x + this.xspeed;
this.y = this.y + this.yspeed;
}
var sensor;
yVal = [];
var x = 0;
function setup() {
createCanvas(2000, 400);
}
function draw() {
line(x, height, x,map(average(),200,400,height/3,height/2));
x = x + 1;
}
function average() {
var sum = 0;
for (var i = 0; i < yVal.length; i++) {
sum += yVal[i];
}
return sum / 10;
}
if (data.length > 0) {
yVal.push(int(data));
if (yVal.length > 25) {
yVal.splice(0, 1);
}
}
}
function preload() {
img = loadImage("Larry.jpg");  
}
function setup() { 
createCanvas(img.width, img.height);
} 
function draw() { 
image(img,0,0)
}
var xPos = 0;
var yPos = 0;
var data = 0;
var values = [];
var valuesY = [];
var ball = new Ball();
function setup() {
createCanvas(windowWidth, windowHeight);
}
function draw() {
background(200);
line(width / 2 - 300, height / 2, width / 2, height / 2);
line(width / 2, height / 2, width / 2, height / 2 + 300);
fill(40);
var xmap = map(getAverageX(), 4, 37, width, 0);
var ymap = map(getAverageY(), 3, 31, 0, height);
ball.display(xmap,ymap);
}
function getAverageX() {
var sum = 0;
for (var i = 0; i < values.length; i++) {
sum += values[i];
}
return sum / values.length;
}
function getAverageY() {
var sum = 0;
for (var i = 0; i < valuesY.length; i++) {
sum += valuesY[i];
}
return sum / values.length;
}
if (data.length > 0) {
var sensors = split(data, ",");
xpos = sensors[0];
ypos = sensors[1];
if (xpos >= 4 && xpos < 37) {
values.push(int(sensors[0]));
if (values.length > 100) {
values.splice(0, 1);
}
}
if (ypos >= 3 && ypos < 31) {
valuesY.push(int(sensors[1]));
if (valuesY.length > 100) {
valuesY.splice(0, 1);
}
}
}
var xPos = 0;
var yPos = 0;
var data = 0;
var values = [];
var valuesY = [];
function setup() {
createCanvas(400, 400);
}
function draw() {
background(200);
fill(40);
ellipse(map(getAverageX(), 10, 50, 0, width), map(getAverageY(), 10, 50, 0, height), 20, 20);
}
function getAverageX() {
var sum = 0;
for (var i = 0; i < values.length; i++) {
sum += values[i];
}
return sum / values.length;
}
function getAverageY() {
var sum = 0;
for (var i = 0; i < valuesY.length; i++) {
sum += valuesY[i];
}
return sum / values.length;
}
if (data.length > 0) {
var sensors = split(data, ",");
xpos = sensors[0];
ypos = sensors[1];
if (xpos >= 10 && xpos < 50) {
values.push(int(sensors[0]));
if (values.length > 30) {
values.splice(0, 1);
}
}
if (ypos >= 10 && ypos < 50) {
valuesY.push(int(sensors[1]));
if (valuesY.length > 30) {
valuesY.splice(0, 1);
}
}
}
}function setup() { 
createCanvas(400, 400);
var ages = [12, 25, 59];
var doubleAges = ages.map(function(age) {
return age * 2;
});
console.log(doubleAges);
var affald = [];
var træer = [];
function preload() {
loadJSON(urlaffald, makeTable);
loadJSON(urltræer, makeTable2);
}
function makeTable(trash) {
for (i = 0; i < 500; i++) {
affald.push({
lat: trash.features[i].geometry.coordinates[0][0],
long: trash.features[i].geometry.coordinates[0][1],
condition: trash.features[i].properties.kurv_tilstand
})
}
}
function makeTable2(tree) {
for (m = 0; m < 4000; m++) {
træer.push({
lat: tree.features[m].geometry.coordinates[0],
long: tree.features[m].geometry.coordinates[1]
})
}
}
function setup() {
createCanvas(500, 500);
colorMode(HSB, 255, 255, 255);
}
function draw() {
background(160, 100, 200);
for (let i = 0; i < affald.length; i++) {
let tx = map(affald[i].lat, 12.50, 12.65, 0, width);
let ty = map(affald[i].long, 55.6, 55.75, 0, height);
let cond = affald[i].condition;
if (cond == "Rimelig/god stand") {
fill(0)
} else if (cond == "Slidt/grim") {
fill(255);
} else if (cond == "Ny/velholdt") {
fill(0, 200, 200);
}
ellipse(tx, ty, 4, 4);
}
for (let j = 0; j < træer.length; j++) {
let treex = map(træer[j].lat, 12.50, 12.65, 0, width);
let treey = map(træer[j].long, 55.6, 55.75, 0, height);
fill(100,200,200);  
ellipse(treex,treey,5,2);
}
}var data;
function preload() {
data = loadJSON(url);
}
function setup() {
createCanvas(700,700);
return x.geometry.coordinates;
})
var name = data.features.map(function(x) {
return x.properties.krydsets_navn;
})
for( var i = 0; i < coordinates.length;i++) {
noFill();
var w = map(coordinates[i][0],12.45,12.65,0,width)
var h = map(coordinates[i][1],55.6,55.75,0,height)
ellipse(w,h,5,5);
}
var affald = [];
function preload() {
loadJSON(url, makeTable);
}
function makeTable(trash) {
let lat = [];
let long = [];
for (i = 0; i < 400; i++) {
lat.push(trash.features[i].geometry.coordinates[0][0]);
long.push(trash.features[i].geometry.coordinates[0][1]);
}
affald.push(lat);
affald.push(long);
}
function setup() {
createCanvas(500, 500);
}
function draw() {
background(255,0,0);
for (let i = 0; i < affald[0].length; i++) {
let cx = map(affald[0][i], 12.45, 12.65, 0, width);
let cy = map(affald[1][i], 55.6, 55.75, 0, height);
fill(200);
ellipse(cx, cy, 5, 5);
}
}
var xPos = 0;
var yPos = 0;
function setup() {
createCanvas(800, 600);
}
function draw() {
background(240);
fill(40);
ellipse(xPos, yPos, 50, 50);
}
if (inString.length > 0) {
if (inString !== 'Hello'); {
sensorValue = int(inString);
}
}  else { 
}
}
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
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
}
var xPos = 0;
var yPos = 0;
var data = 0;
var values= [];
function setup() {
createCanvas(400, 400);
}
function draw() {
background(240);
fill(40);
ellipse(getAverage(), height/2, 20, 20);
}
function getAverage() {
var sum = 0;
for(var i = 0; i < values.length; i++) {
sum += values[i];
}
return sum / values.length;
}
if(data >= 10 && data < 50){
values.push(data);   
if(values.length > 10) {
values.splice(0, 1);
}
}
}
var xPos = 0;
var yPos = 0;
var data = 0;
var values= [];
function setup() {
createCanvas(400, 400);
}
function draw() {
background(200);
line(width/2,0,width/2,height);
fill(40);
ellipse(map(getAverage(),0,50,0,width), height/2, 20, 20);
}
function getAverage() {
var sum = 0;
for(var i = 0; i < values.length; i++) {
sum += values[i];
}
return sum / values.length;
}
if (data.length > 0) {
var sensors = split(data, ",");
xpos = sensors[0];
ypos = sensors[1];
if(data >= 10 && data < 50){
xpos.push(int(sensors[0]));   
ypos.push(int(sensors[1]));
if(xpos.length > 50) {
xpos.splice(0, 1);	  
}
}
}
var xPos = 0;
var yPos = 0;
var data = 0;
var mdata = 0;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(240);
fill(40);
ellipse(mdata, height/2, 20, 20);
}
if(data >= 10 && data < 50){
mdata = map(data,10,50,0,width);
}
}
var xPos = 0;
var yPos = 0;
var r =0;
function setup() {
createCanvas(710, 400, WEBGL);
}
if (data.length > 0) {
var sensors = split(data, ",");
xPos = float(sensors[0]);
yPos = float(sensors[1]);
}
}
function draw() {
background(100);
noStroke();
mappedx = map(xPos,-90,90,-2,2);
mappedy = map(yPos,-90,90,-2,2);
push();
translate(0, 0);
console.log(mappedx);
console.log(mappedy);
rotateY(mappedy);
rotateX(mappedx);
box(100);
pop();
}
function setup() { 
createCanvas(600, 600);
noFill();
strokeWeight(10);
}
function gotData() {
}
function draw() { 
background(127, 0, 127);
var v = latestData; 
var origV = v;
ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);
ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
v+=random(-5, 5);
bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);
bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
}
var isInside = false;
var outlineSpeed = 0.025;
var total = 8;
var circles = [];
var circlesClicked = [];
var CircleIsSelected = false;
var Canvas;
let button;
var bgColor = 0;
var frontColor = 255;
function setup() {
canvas = createCanvas(windowWidth, windowHeight);
canvas.position(0, 0);
canvas.style('z-index', '-1')
for (var i = 0; i < total; i++) {
circles.push(new Circle(random(width), random(height), 30));
circlesClicked.push(false);
}
button = createButton("colorshift");
button.mousePressed(colorChange);
button.position(0,height-100);
}
function draw() {
background(bgColor);
if (circles[0].outline > 3 || circles[0].outline < 0.2) {
outlineSpeed = outlineSpeed * -1;
}
for (var i = 0; i < total; i++) {
circles[i].outline = circles[i].outline + outlineSpeed;
}
beginShape();
strokeWeight(1);
fill(frontColor);
for ( i = 0; i < total; i++) {
vertex(circles[i].x, circles[i].y);
}
endShape(CLOSE);
fill(255);
for (i = 0; i < total; i++) {
circles[i].display();
}
for (i = 0; i < total; i++) {
if ((mouseIsPressed && circles[i].containsMouse() && CircleIsSelected == false) || circlesClicked[i] == true) {
circles[i].drag();
circlesClicked[i] = true;
CircleIsSelected = true;
}
}
}
function mouseReleased() {
for (var i = 0; i < total; i++) {
circlesClicked[i] = false;
}
CircleIsSelected = false;
}
function colorChange() {
bgColor = bgColor == 255 ? 0 : 255;
frontColor = frontColor == 255 ? 0 : 255;
}function setup() { 
noCanvas();
document.getElementById("format").animate([
{ transform: 'translateY(0px)' }, 
{ transform: 'translateY(-500px)' }
], { 
duration: 1000,
iterations: Infinity
});
}
function draw() { 
background(220);
}function setup() { 
noCanvas();
}
function draw() { 
background(220);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
}
var xPos = 0;
var yPos = 0;
let dataArray = [];
let maxValues = 500;
let max = 0;
let min = 0;
function setup() {
createCanvas(windowWidth, 600);
}
function draw() {
background(0);
for(let i = 0; i < dataArray.length - 1; i++){
stroke(0,255,0);
let x1 = i * (width/maxValues); 
let upperBound = (height/2) - 100;
let lowerBound = (height/2) + 100
let y1 = map(dataArray[i], min, max, upperBound, lowerBound);
let x2 = (i+1) * (width/maxValues);
let y2 = map(dataArray[i+1], min, max, upperBound, lowerBound);
line(x1, y1, x2, y2);
}
}
let tempArray = [];
if (data.length > 0) {
enough_values = 10;
if(tempArray.length > enough_values){
dataArray.push( d3.mean(tempArray) );
console.log(tempArray);
max = d3.max(dataArray);
min = d3.min(dataArray);
while(dataArray.length > maxValues){
dataArray.splice(0,1);
}
tempArray = [];
}
}
}
function mousePressed(){
dataArray=[];
}
function setup() {
createCanvas(400, 300);
}
function serverConnected() {
}
function portOpen() {
}
}
}
function portClose() {
}
for (var i = 0; i < portList.length; i++) {
}
}
function draw() {
background(0);
fill(255);
text("sensor value:" + inData, 30, 30)
created 9 Oct 2017
by Tom Igoe
var xPos = 0;
var yPos = 0;
function setup() {
createCanvas(800, 600);
}
for (var i = 0; i < portList.length; i++) {
console.log(i + " " + portList[i]);
}
}
function draw() {
ellipse(xPos, yPos, 50, 50);
}
function serverConnected() {
console.log('connected to server.');
}
function portOpen() {
}
if (data.length > 0) {
var sensors = split(data, ",");
console.log(sensors);
xPos = int(sensors[0]);
yPos = int(sensors[1]);
}
}
}
function portClose() {
}class Ball {
constructor(x, y, r) {
this.x = x;
this.y = y;
this.r = r;
this.xspeed = random(-1, 1);
this.yspeed = random(-1, 1);
this.grey = 255;
this.lastTouched = -1;
}
display() {
fill(this.grey);
ellipse(this.x, this.y, this.r);
}
move() {
this.x = this.x + this.xspeed;
this.y = this.y + this.yspeed;
}
borders() {
if (this.x > width || this.x < 0) {
this.xspeed *= -1
}
if (this.y > height || this.y < 0) {
this.yspeed *= -1;
}
}
collision(other, idx) {
var dis = dist(this.x, this.y, other.x, other.y);
if(idx == this.lastTouched){
if (dis > this.r/2 + other.r/2) {
this.lastTouched = -1;
}
return false;  
}
if (dis <= this.r/2 + other.r/2) {
this.lastTouched = idx;
return true;
} else {
return false;
}
}
changecolor() {
this.grey = abs( this.grey - 255);
}
}
var balls = [];
function setup() {
createCanvas(400, 400);
for (var i = 0; i < 50; i++) {
balls.push(new Ball(random(width), random(height), random(10, 20)));
}
}
function draw() {
background(200, 100, 200);
for (var i = 0; i < balls.length; i++) {
balls[i].display();
balls[i].move();
balls[i].borders();
for (var j = 0; j < balls.length; j++) {
if (i != j) {
if (balls[i].collision(balls[j], j)) {
balls[i].changecolor();
}
}
}
}
var squares = []
var x;
function setup() {
createCanvas(400, 400);
for (var i = 0; i < squares.length; i++) {
squares.push(new Square());
}
}
function draw() {
background(220, 100, 100);
for (var i = 0; i < squares.length; i++) {
squares[i].display();
squares[i].falling();
squares[i].collide(squares);
if (keyIsPressed) {
squares[i].removes();
}
}
}
function mousePressed() {
squares.push(new Square(mouseX, mouseY, 30, 30));
}var cars = [];
function setup() { 
createCanvas(400, 400);
cars = new Car((width/2),height/2);
} 
function draw() { 
cars.display();
cars.move();
cars.borders();
if(mouseX > width/2) {
mouseX = 0;
}
var squares = []
var x;
function setup() { 
createCanvas(400, 400);
for (var i = 0; i < squares.length; i++) {
squares.push(new Square()); 
}
} 
function draw() { 
background(220,100,100);
for (var i = 0; i < squares.length; i++) {
squares[i].display();
squares[i].falling();
squares[i].collide(squares); 
if(keyIsPressed) {
squares[i].removes();
}
}
}
function mousePressed() {
squares.push(new Square(mouseX, mouseY,30,30));
}
var balls = [];
var total = 15;
function setup() {
createCanvas(400, 400);
for (var i = 0; i < total; i++) {
balls.push(
new Ball(random(width), random(height), random(10, 20), random(3.5), random(1.5)));;
}
}
function draw() {
background(10);
for (var i = 0; i < total; i++) {
balls[i].run();
balls[i].bounce();
balls[i].collision(balls);
}
}var ball1;
var ball2;
function setup() {
createCanvas(400, 400);
ball1 = new Ball(width / 3, height / 2, 50, random(3.5), random(1.5));
ball2 = new Ball(width / 2, height / 2, 50, random(3.5), random(1.5));
}
function draw() {
background(10);
ball1.run();
ball2.run();
ball1.bounce();
ball2.bounce();
ball1.collision(ball2);
ball2.collision(ball1);
}class Sims {
constructor(x, y, w, h) {
this.x = y;
this.y = y;
this.w = w;
this.h = h;
}
display() {
rectMode(CENTER);
rect(this.x, this.y, this.w, this.h);
}
change() {
if (mouseX > this.x - this.w / 2 && mouseX < this.x + this.w / 2 && mouseY > this.y - this.h / 2 && mouseY < this.y + this.h / 2) {
return true
} else {
return false;
}
}
}
var rects;
var pState;
function setup() {
createCanvas(400, 400);
rects = new Sims(width / 2, height / 2, 50, 50);
}
function draw() {
background(220);
rects.display();
rects.change();
}
class Sims {
constructor(x, y, w, h) {
this.x = y;
this.y = y;
this.w = w;
this.h = h;
}
display() {
rectMode(CENTER);
rect(this.x, this.y, this.w, this.h);
}
change() {
if (mouseX > this.x - this.w / 2 && mouseX < this.x + this.w / 2 && mouseY > this.y - this.h / 2 && mouseY < this.y + this.h / 2) {
return true
} else {
return false;
}
}
}
var rects;
var pState;
function setup() {
createCanvas(400, 400);
rects = new Sims(width / 2, height / 2, 50, 50);
}
function draw() {
background(220);
rects.display();
rects.change();
}
function mousePressed() {  
}var ball1;
var ball2;
var state = false;
var on = false;
var pState = pState;
function setup() {
createCanvas(400, 400);
ball1 = new Ball(width / 3, height / 2, 50, random(3.5), random(1.5));
ball2 = new Ball(width / 2, height / 2, 50, random(3.5), random(1.5));
}
function draw() {
background(10);
ball1.run();
ball2.run();
ball1.bounce();
ball2.bounce();
ball1.collision(ball2);
if (ball1.collision(ball2)) {
}
}
var ball1;
var ball2;
var state = false;
var on = false;
var pState = pState;
function setup() {
createCanvas(400, 400);
ball1 = new Ball(width / 3, height / 2, 50, random(3.5), random(1.5));
ball2 = new Ball(width / 2, height / 2, 50, random(3.5), random(1.5));
}
function draw() {
background(10);
ball1.run();
ball2.run();
ball1.bounce();
ball2.bounce();
ball1.collision(ball2);
if (ball1.collision(ball2) && state != pState) {
on = !on;
}
pState= state;
if(on) {
fill(100); 
} else {
fill(200); 
}
}
let balls = [];
function setup() {
createCanvas(500, 500);
for (let i = 0; i < 50; i++) {
balls[i] = new Ball(random(width), random(height), 30, random(-1, 1), random(-1, 1));
}
}
function draw() {
background(255);
for (let i = 0; i < balls.length; i++) {
balls[i].display();
balls[i].update();
}
}
function mousePressed() {
balls.push(new Ball(mouseX, mouseY, 30, random(-1, 1), random(-1, 1)));
this.x = x;
this.y = y;
this.diameter = 60;
this.display = function() {
ellipse(this.x, this.y, this.diameter, this.diameter);
}
this.up = up;
this.down = down;
if (keyIsPressed && keyCode == this.up) {
this.y = this.y - 2;
} else if (keyIsPressed && keyCode == this.down) {
this.y = this.y + 2;
}
}
}
this.x = x;
this.y = y;
this.speedx = -1.5;
this.speedy = random(-1.4, 1.4);
this.diameter = 30
ellipse(this.x, this.y, this.diameter, this.diameter)
}
this.x = this.x + this.speedx;
this.y = this.y + this.speedy;
this.speedx = this.speedx + 0.001;
}
if (this.y > height || this.y < 0) {
this.speedy = this.speedy * -1;
}
}
var dis = dist(this.x, this.y, other.x, other.y);
if (dis < this.diameter / 2 + other.diameter / 2) {
return true;
} else {
return false;
}
this.changeDirection = function() {
this.speedx = this.speedx * -1;
this.speedy = this.speedy * -1;
}
}
function setup() {
createCanvas(500, 500);
brick = new Brick(0, height / 2);
brick2 = new Brick(width, height / 2);
ball = new Ball(width / 2, height / 2);
}
function draw() {
background(160, 100, 100);
push();
strokeWeight(10);
stroke(255);
line(width / 2, 0, width / 2, height);
pop();
push();
textAlign(CENTER);
text("Control player 1: arrowkeys \n \n \n player 2: SHIFT and OPTION", width / 2, height / 7);
pop();
brick.display();
brick.move(UP_ARROW, DOWN_ARROW);
brick2.display();
brick2.move(SHIFT, OPTION)
ball.display();
ball.move();
ball.borders();
if (ball.intersects(brick2)) {
ball.changeDirection();
}
if (ball.intersects(brick)) {
ball.changeDirection();
}
push();
if (ball.x < 0) {
stroke(255);
textAlign(CENTER);
textSize(50);
text("GAME OVER \nPLAYER 2 WINS", width / 2, height / 2)
}
if (ball.x > width) {
textAlign(CENTER);
textSize(50);
text("GAME OVER \nPLAYER 1 WINS", width / 2, height / 2)
}
pop();
this.x = x;
this.y = y;
this.diameter = 60;
this.display = function() {
ellipse(this.x, this.y, this.diameter, this.diameter);
}
this.up = up;
this.down = down;
if (keyIsPressed && keyCode == this.up) {
this.y = this.y - 2;
} else if (keyIsPressed && keyCode == this.down) {
this.y = this.y + 2;
}
}
}
this.x = x;
this.y = y;
this.speedx = -1.5;
this.speedy = random(-1.4, 1.4);
this.diameter = 30
ellipse(this.x, this.y, this.diameter, this.diameter)
}
this.x = this.x + this.speedx;
this.y = this.y + this.speedy;
this.speedx = this.speedx + 0.001;
}
if (this.y > height || this.y < 0) {
this.speedy = this.speedy * -1;
}
}
var dis = dist(this.x, this.y, other.x, other.y);
if (dis < this.diameter / 2 + other.diameter / 2) {
return true;
} else {
return false;
}
this.changeDirection = function() {
this.speedx = this.speedx * -1;
this.speedy = this.speedy * -1;
}
}
function setup() {
createCanvas(500, 500);
brick = new Brick(0, height / 2);
brick2 = new Brick(width, height / 2);
ball = new Ball(width / 2, height / 2);
}
function draw() {
background(160, 100, 100);
push();
strokeWeight(10);
stroke(255);
line(width / 2, 0, width / 2, height);
pop();
push();
textAlign(CENTER);
text("Control player 1: arrowkeys \n \n \n player 2: SHIFT and OPTION", width / 2, height / 7);
pop();
brick.display();
brick.move(UP_ARROW, DOWN_ARROW);
brick2.display();
brick2.move(SHIFT, OPTION)
ball.display();
ball.move();
ball.borders();
if (ball.intersects(brick2)) {
ball.changeDirection();
}
if (ball.intersects(brick)) {
ball.changeDirection();
}
push();
if (ball.x < 0) {
stroke(255);
textAlign(CENTER);
textSize(50);
text("GAME OVER \nPLAYER 2 WINS", width / 2, height / 2)
}
if (ball.x > width) {
textAlign(CENTER);
textSize(50);
text("GAME OVER \nPLAYER 1 WINS", width / 2, height / 2)
}
pop();
this.x = x;
this.y = y;
this.diameter = 60;
this.display = function() {
ellipse(this.x, this.y, this.diameter, this.diameter);
}
this.up = up;
this.down = down;
if (keyIsPressed && keyCode == this.up) {
this.y = this.y - 2;
} else if (keyIsPressed && keyCode == this.down) {
this.y = this.y + 2;
}
}
}
this.x = x;
this.y = y;
this.speedx = -1.5;
this.speedy = random(-1.4, 1.4);
this.diameter = 30
ellipse(this.x, this.y, this.diameter, this.diameter)
}
this.x = this.x + this.speedx;
this.y = this.y + this.speedy;
this.speedx = this.speedx + 0.001;
}
if (this.y > height || this.y < 0) {
this.speedy = this.speedy * -1;
}
}
var dis = dist(this.x, this.y, other.x, other.y);
if (dis < this.diameter / 2 + other.diameter / 2) {
return true;
} else {
return false;
}
this.changeDirection = function() {
this.speedx = this.speedx * -1;
this.speedy = this.speedy * -1;
}
}
function setup() {
createCanvas(500, 500);
brick = new Brick(0, height / 2);
brick2 = new Brick(width, height / 2);
ball = new Ball(width / 2, height / 2);
}
function draw() {
background(160, 100, 100);
push();
strokeWeight(10);
stroke(255);
line(width / 2, 0, width / 2, height);
pop();
push();
textAlign(CENTER);
text("Control player 1: arrowkeys \n \n \n player 2: SHIFT and OPTION", width / 2, height / 7);
pop();
brick.display();
brick.move(UP_ARROW, DOWN_ARROW);
brick2.display();
brick2.move(SHIFT, OPTION)
ball.display();
ball.move();
ball.borders();
if (ball.intersects(brick2)) {
ball.changeDirection();
}
if (ball.intersects(brick)) {
ball.changeDirection();
}
push();
if (ball.x < 0) {
stroke(255);
textAlign(CENTER);
textSize(50);
text("GAME OVER \nPLAYER 2 WINS", width / 2, height / 2)
}
if (ball.x > width) {
textAlign(CENTER);
textSize(50);
text("GAME OVER \nPLAYER 1 WINS", width / 2, height / 2)
}
pop();
this.x = x;
this.y = y;
this.diameter = 60;
this.display = function() {
ellipse(this.x, this.y, this.diameter, this.diameter);
}
this.up = up;
this.down = down;
if (keyIsPressed && keyCode == this.up) {
this.y = this.y - 2;
} else if (keyIsPressed && keyCode == this.down) {
this.y = this.y + 2;
}
}
}
this.x = x;
this.y = y;
this.speedx = random(-1.5, 1.5);
this.speedy = random(-1.4, 1.4);
this.diameter = 30
ellipse(this.x, this.y, this.diameter, this.diameter)
}
this.x = this.x + this.speedx;
this.y = this.y + this.speedy;
this.speedx = this.speedx + 0.001;
}
if (this.y > height || this.y < 0) {
this.speedy = this.speedy * -1;
}
}
var dis = dist(this.x, this.y, other.x, other.y);
if (dis < this.diameter / 2 + other.diameter / 2) {
return true;
} else {
return false;
}
this.changeDirection = function() {
this.speedx = this.speedx * -1;
this.speedy = this.speedy * -1;
}
}
function setup() {
createCanvas(500, 500);
brick = new Brick(0, height / 2);
brick2 = new Brick(width, height / 2);
ball = new Ball(width / 2, height / 2);
}
function draw() {
background(160, 100, 100);
push();
strokeWeight(10);
stroke(255);
line(width / 2, 0, width / 2, height);
pop();
push();
textAlign(CENTER);
text("Control player 1: arrowkeys \n \n \n player 2: SHIFT and OPTION", width / 2, height / 7);
pop();
brick.display();
brick.move(UP_ARROW, DOWN_ARROW);
brick2.display();
brick2.move(SHIFT, OPTION)
ball.display();
ball.move();
ball.borders();
if (ball.intersects(brick2)) {
ball.changeDirection();
}
if (ball.intersects(brick)) {
ball.changeDirection();
}
push();
if (ball.x < 0) {
stroke(255);
textAlign(CENTER);
textSize(50);
text("GAME OVER \nPLAYER 2 WINS", width / 2, height / 2)
}
if (ball.x > width) {
textAlign(CENTER);
textSize(50);
text("GAME OVER \nPLAYER 1 WINS", width / 2, height / 2)
}
pop();
this.x = x;
this.y = y;
this.diameter = 60;
this.display = function() {
ellipse(this.x, this.y, this.diameter, this.diameter);
}
this.up = up;
this.down = down;
if (keyIsPressed && keyCode == this.up) {
this.y = this.y - 2;
} else if (keyIsPressed && keyCode == this.down) {
this.y = this.y + 2;
}
}
}
this.x = x;
this.y = y;
this.speedx = random(-1.5, 1.5);
this.speedy = random(-1.4, 1.4);
this.diameter = 30
ellipse(this.x, this.y, this.diameter, this.diameter)
}
this.x = this.x + this.speedx;
this.y = this.y + this.speedy;
this.speedx = this.speedx + 0.001;
}
if (this.y > height || this.y < 0) {
this.speedy = this.speedy * -1;
}
}
var dis = dist(this.x, this.y, other.x, other.y);
if (dis < this.diameter / 2 + other.diameter / 2) {
return true;
} else {
return false;
}
this.changeDirection = function() {
this.speedx = this.speedx * -1;
this.speedy = this.speedy * -1;
}
}
function setup() {
createCanvas(500, 500);
brick = new Brick(0, height / 2);
brick2 = new Brick(width, height / 2);
ball = new Ball(width / 2, height / 2);
}
function draw() {
background(160, 100, 100);
push();
strokeWeight(10);
stroke(255);
line(width / 2, 0, width / 2, height);
pop();
push();
textAlign(CENTER);
text("Control player 1: arrowkeys \n \n \n player 2: SHIFT and OPTION", width / 2, height / 7);
pop();
brick.display();
brick.move(UP_ARROW, DOWN_ARROW);
brick2.display();
brick2.move(SHIFT, OPTION)
ball.display();
ball.move();
ball.borders();
if (ball.intersects(brick2)) {
ball.changeDirection();
}
if (ball.intersects(brick)) {
ball.changeDirection();
}
push();
if (ball.x < 0) {
stroke(255);
textAlign(CENTER);
textSize(50);
text("GAME OVER \nPLAYER 2 WINS", width / 2, height / 2)
}
if (ball.x > width) {
textAlign(CENTER);
textSize(50);
text("GAME OVER \nPLAYER 1 WINS", width / 2, height / 2)
}
pop();
} var ball = {
x: 0,
y: 0,
xspeed: 1,
yspeed: 2,
diameter: 20,
}
var ball2 = {
x: 0,
y: 0,
xspeed: -2,
yspeed: 1,
diameter: 7,
}
function setup() {
createCanvas(500, 500);
ball.x = width / 2;
ball.y = height / 2;
ball2.x = width / 2;
ball2.y = height / 2;
}
function draw() {
background(200);
move(ball);
move(ball2);
bounce(ball);
bounce(ball2);
ellipse(ball.x, ball.y, ball.diameter, ball.diameter);
ellipse(ball2.x, ball2.y, ball2.diameter, ball2.diameter)
}
function bounce(ball) {
if (ball.x > width || ball.x < 0) {
ball.xspeed = ball.xspeed * -1;
}
if (ball.y > height || ball.y < 0) {
ball.yspeed *= -1;
}
if (ball2.x > width || ball2.x < 0) {
ball2.xspeed = ball2.xspeed * -1;
}
if (ball2.y > height || ball2.y < 0) {
ball2.yspeed *= -1;
}
}
function move(ball) {
ball.x = ball.x + ball.xspeed;
ball.y = ball.y + ball.yspeed;
ball2.x = ball2.x + ball2.xspeed;
ball2.y = ball2.y + ball2.yspeed;
} var ball = {
x: 0,
y: 0,
xspeed: 1,
yspeed: 2,
diameter: 20,
}
var ball2 = {
x: 0,
y: 0,
xspeed: -2,
yspeed: 1,
diameter: 7,
}
function setup() {
createCanvas(500, 500);
ball.x = width / 2;
ball.y = height / 2;
ball2.x = width / 2;
ball2.y = height / 2;
}
function draw() {
background(200);
move(ball);
move(ball2);
bounce(ball);
bounce(ball2);
ellipse(ball.x, ball.y, ball.diameter, ball.diameter);
ellipse(ball2.x, ball2.y, ball2.diameter, ball2.diameter)
}
function bounce(ball) {
if (ball.x > width || ball.x < 0) {
ball.xspeed = ball.xspeed * -1;
}
if (ball.y > height || ball.y < 0) {
ball.yspeed *= -1;
}
if (ball2.x > width || ball2.x < 0) {
ball2.xspeed = ball2.xspeed * -1;
}
if (ball2.y > height || ball2.y < 0) {
ball2.yspeed *= -1;
}
}
function move(ball) {
ball.x = ball.x + ball.xspeed;
ball.y = ball.y + ball.yspeed;
ball2.x = ball2.x + ball2.xspeed;
ball2.y = ball2.y + ball2.yspeed;
}var Ball = function(x, y, r, speedX, speedY) {
this.x = x;
this.y = y;
this.r = r;
this.speedX = speedX;
this.speedY = speedY;
this.display = function() {
ellipse(this.x, this.y, this.r, this.r);
}
this.move = function() {
this.x = this.x + this.speedX;
this.y = this.y + this.speedY;
}
this.bounce = function() {
if (this.x > width || this.x < 0) {
this.speedX = this.speedX * -1;
}
if (this.y > height || this.y < 0) {
this.speedY = this.speedY * -1;
}
}
}
var totalballs = 15;
var balls = [];
function setup() {
createCanvas(500, 500);
for (var i = 0; i < totalballs; i++) {
balls[i] = new Ball(random(width), random(height), random(40), random(3), random(3));
}
}
function draw() {
background(30);
for (var i = 0; i < totalballs; i++) {
balls[i].move();
balls[i].bounce();
balls[i].display();
}
}var Ball = function(x, y, r, speedX, speedY) {
this.x = x;
this.y = y;
this.r = r;
this.speedX = speedX;
this.speedY = speedY;
this.display = function() {
ellipse(this.x, this.y, this.r, this.r);
}
this.move = function() {
this.x = this.x + this.speedX;
this.y = this.y + this.speedY;
}
this.bounce = function() {
if (this.x > width || this.x < 0) {
this.speedX = this.speedX * -1;
}
if (this.y > height || this.y < 0) {
this.speedY = this.speedY * -1;
}
}
}
var totalballs = 15;
var balls = [];
function setup() {
createCanvas(500, 500);
for (var i = 0; i < totalballs; i++) {
balls[i] = new Ball(random(width), random(height), random(40), random(3), random(3));
}
}
function draw() {
background(30);
for (var i = 0; i < totalballs; i++) {
balls[i].move();
balls[i].bounce();
balls[i].display();
}
}var rh;
var rw;
var xloc;
var yloc;
var totalcols = 10;
var totalrows = 5;
var colorSq = 0;
function setup() {
createCanvas(500,500);
rw = width/totalcols;
rh = height/totalrows;
}
function draw() {
for (var i = 0; i < totalcols; i++) {
xloc = i * rw;
for (var j = 0; j < totalrows; j++) {
yloc = j * rh;
if (((i*totalrows)+j) == colorSq) {
fill(0,0,255)
} else {
fill(100,100,100);
}
rect(xloc,yloc,rw,rh)
}
}
}
function mousePressed() {
colorSq = int(random(0,49))
}var rh;
var rw;
var xloc;
var yloc;
var totalcols = 10;
var totalrows = 5;
var colorSq = 0;
function setup() {
createCanvas(500,500);
rw = width/totalcols;
rh = height/totalrows;
}
function draw() {
for (var i = 0; i < totalcols; i++) {
xloc = i * rw;
for (var j = 0; j < totalrows; j++) {
yloc = j * rh;
if (((i*totalrows)+j) == colorSq) {
fill(0,0,255)
} else {
fill(100,100,100);
}
rect(xloc,yloc,rw,rh)
}
}
}
function mousePressed() {
colorSq = int(random(0,49))
}let x;
let y;
let w;
let h;
function setup() { 
createCanvas(400, 400);
x = width./1
} 
function draw() { 
background(220);
for ( let i = 0; i < width; i++) {
rect(i*x,y,width/10,h)
}
}let x;
let y;
let w;
let h;
function setup() { 
createCanvas(400, 400);
x = width./1
} 
function draw() { 
background(220);
for ( let i = 0; i < width; i++) {
rect(i*x,y,width/10,h)
}
}let x;
let y;
let col;
let a = 0;
let state = false;
let w;
let h;
let d;
let speed = 0.3;
let p;
function setup() {
createCanvas(windowWidth, windowHeight);
w=width/2;
h=height/2;
rectMode(CENTER);
background(220);
x = 0;
y = 0;
col = 0;
p = height/2;
}
function draw() {
push();
fill(200,200,100,50);
stroke(col);
strokeWeight(1);
translate(w, h);
rotate(a++);
rect(x, y, 15, 15);
x = x + speed
y = x + speed
if (x > 100 || x < 0) {
speed = speed * -1; 
}
if (col == 255) {
col -= 1;
} else {
col += 1;
}
pop();
fill(220);
strokeWeight(0.00005);
ellipse(w, h, 40, 40);
if (mouseX > (w - 20) && mouseX < (w + 20)) {
if (mouseY > (h - 20) && mouseY < (h + 20)) {
stroke(220);
strokeWeight(30); 
push();
ellipse(w, h, 40, 40);
fill(0);
pop();
}
}
}
function mousePressed() {
d = dist(mouseX, mouseY, w, h);
if (d < 20) {
background(random(0,255));
}      
}
let y;
let col;
let a = 0;
let state = false;
let w;
let h;
let d;
let speed = 0.3;
let p;
function setup() {
createCanvas(windowWidth, windowHeight);
w=width/2;
h=height/2;
rectMode(CENTER);
background(220);
x = 0;
y = 0;
col = 0;
p = height/2;
}
function draw() {
push();
fill(200,200,100,50);
stroke(col);
strokeWeight(1);
translate(w, h);
rotate(a++);
rect(x, y, 15, 15);
x = x + speed
y = x + speed
if (x > 100 || x < 0) {
speed = speed * -1; 
}
if (col == 255) {
col -= 1;
} else {
col += 1;
}
pop();
fill(220);
strokeWeight(0.00005);
ellipse(w, h, 40, 40);
if (mouseX > (w - 20) && mouseX < (w + 20)) {
if (mouseY > (h - 20) && mouseY < (h + 20)) {
stroke(220);
strokeWeight(30); 
push();
ellipse(w, h, 40, 40);
fill(0);
pop();
}
}
}
function mousePressed() {
d = dist(mouseX, mouseY, w, h);
if (d < 20) {
background(random(0,255));
}      
}
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
for (let i = 0; i < total; i++) {
for (let j = 0; j < total; j++) {
fill(20);
rect(i*(width/10), height/10 * j, 30, 30);
}
}
}let total = 10;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
for (let i = 0; i < total; i++) {
for (let j = 0; j < total; j++) {
fill(20);
rect(i*(width/10), height/10 * j, 30, 30);
}
}
}var Slider = function(x, y, buttonX, maxValue) {
this.x = x;
this.y = y;
this.l = 100;
this.buttonX = this.x + buttonX;
this.radius = 30;
this.maxValue = maxValue;
this.checkDragging = function() {
if (mouseIsPressed && this.contains()) {
this.buttonX = mouseX;
}
}
this.contains = function() {
var d = dist(mouseX, mouseY, this.buttonX, this.y);
if (d < this.radius / 2) {
return true;
} else {
return false;
}
}
this.display = function() {
this.buttonX = constrain(this.buttonX, this.x, this.x + this.l)
push();
strokeWeight(3);
line(this.x, this.y, this.x + this.l, this.y);
pop();
ellipse(this.buttonX, this.y, this.radius, this.radius);
}
this.getValue = function() {
var relX = this.buttonX - this.x;
return int(map(relX, 0, this.l, 0, this.maxValue));
}
}
var sliders;
function setup() {
createCanvas(500, 500);
colorMode(HSB, 255, 255, 255);
sliders = [
new Slider(width / 2 - (width / 4), height - 100, 50, 255),
new Slider(width / 2 + (width / 5), height - 100, 50, 10),
];
}
function draw() {
background(160, 160, 200);
for (var i = 0; i < sliders.length; i++) {
sliders[i].checkDragging()
sliders[i].display();
sliders[i].getValue();
}
for (i = 0; i < sliders[1].getValue(); i++) {
var margin = 400;
var offset = ((width - margin * 2) / sliders[1].getValue()) / 2;
xPos = margin + (((width - margin * 2) / sliders[1].getValue()) * i) + offset;
push()
fill(sliders[0].getValue(), 150, 255)
ellipse(xPos, height / 3, 50, 50)
pop();
}
}var Slider = function(x, y, buttonX, maxValue) {
this.x = x;
this.y = y;
this.l = 100;
this.buttonX = this.x + buttonX;
this.radius = 30;
this.maxValue = maxValue;
this.checkDragging = function() {
if (mouseIsPressed && this.contains()) {
this.buttonX = mouseX;
}
}
this.contains = function() {
var d = dist(mouseX, mouseY, this.buttonX, this.y);
if (d < this.radius / 2) {
return true;
} else {
return false;
}
}
this.display = function() {
this.buttonX = constrain(this.buttonX, this.x, this.x + this.l)
push();
strokeWeight(3);
line(this.x, this.y, this.x + this.l, this.y);
pop();
ellipse(this.buttonX, this.y, this.radius, this.radius);
}
this.getValue = function() {
var relX = this.buttonX - this.x;
return int(map(relX, 0, this.l, 0, this.maxValue));
}
}
var sliders;
function setup() {
createCanvas(500, 500);
colorMode(HSB, 255, 255, 255);
sliders = [
new Slider(width / 2 - (width / 4), height - 100, 50, 255),
new Slider(width / 2 + (width / 5), height - 100, 50, 10),
];
}
function draw() {
background(160, 160, 200);
for (var i = 0; i < sliders.length; i++) {
sliders[i].checkDragging()
sliders[i].display();
sliders[i].getValue();
}
for (i = 0; i < sliders[1].getValue(); i++) {
var margin = 400;
var offset = ((width - margin * 2) / sliders[1].getValue()) / 2;
xPos = margin + (((width - margin * 2) / sliders[1].getValue()) * i) + offset;
push()
fill(sliders[0].getValue(), 150, 255)
ellipse(xPos, height / 3, 50, 50)
pop();
}
}var sliderLength = 150;
var buttonX;
var buttonY;
var xSliderLocation
var radius = 20;
function setup() {
createCanvas(500, 500);
buttonX = width / 2;
buttonY = height / 2;
xSliderLocation = width / 2;
}
function draw() {
background(100);
strokeWeight(3);
var limit = constrain(buttonX, xSliderLocation, xSliderLocation + sliderLength)
function contains() {
var d = dist(mouseX, mouseY, limit, buttonY);
if (d < radius) {
return true;
} else {
return false;
}
}
if (mouseIsPressed && contains()) {
buttonX = mouseX;
}
line(xSliderLocation, height / 2, xSliderLocation + sliderLength, height / 2)
ellipse(limit, buttonY, radius, radius);
var value = map(limit, xSliderLocation, xSliderLocation + sliderLength, 0, 250);
var Circle = function(x, y, d) {
this.x = x;
this.y = y;
this.diameter = d;
this.time = 0;
this.outline = 1;
this.display = function() {
strokeWeight(this.outline);
fill(200,100,100,50);
ellipse(this.x, this.y, this.diameter, this.diameter);
}
this.isInside = function() {
var d = dist(mouseX, mouseY, this.x, this.y)
if (d < this.diameter / 2) {
return true;
} else {
return false;
}
}
this.drag = function() {
ellipse(mouseX, mouseY, this.diameter, this.diameter);
}
}
var isInside = false;
var time = 0;
var outlineSpeed = 0.025;
function setup() {
createCanvas(400, 400);
circle1 = new Circle(random(width / 2), random(height / 2), 30);
circle2 = new Circle(random(width / 2, width), random(0, height / 2), 30);
circle3 = new Circle(random(width / 2), random(height / 2, height), 30);
circle4 = new Circle(random(width / 2, width), random(height / 2, height), 30);
}
function draw() {
background(220, 200, 200);
time++;
circle1.outline = circle1.outline + outlineSpeed;
if (circle1.outline > 3 || circle1.outline < 0.2) {
outlineSpeed = outlineSpeed * -1;
}
circle2.outline = circle2.outline + outlineSpeed;
if (circle2.outline > 3 || circle2.outline < 0.2) {
outlineSpeed = outlineSpeed * -1;
}
circle3.outline = circle3.outline + outlineSpeed;
if (circle3.outline > 3 || circle3.outline < 0.2) {
outlineSpeed = outlineSpeed * -1;
}
circle4.outline = circle4.outline + outlineSpeed;
if (circle4.outline > 3 || circle4.outline < 0.2) {
outlineSpeed = outlineSpeed * -1;
}
beginShape(QUADS);
strokeWeight(1);
fill(200, 100, 100)
vertex(circle1.x, circle1.y)
vertex(circle2.x, circle2.y)
vertex(circle4.x, circle4.y)
vertex(circle3.x, circle3.y)
endShape(CLOSE);
fill(255);
circle1.display();
circle2.display();
circle3.display();
circle4.display();
strokeWeight(1);
if (mouseIsPressed && circle1.isInside()) {
circle1.x = mouseX;
circle1.y = mouseY;
text("Circle x:" + int(circle1.x) + " y:" + int(circle1.y), circle1.x + 20, circle1.y);
}
if (mouseIsPressed && circle2.isInside()) {
circle2.x = mouseX;
circle2.y = mouseY;
text("Circle x:" + int(circle2.x) + " y:" + int(circle2.y), circle2.x + 20, circle2.y);
}
if (mouseIsPressed && circle3.isInside()) {
circle3.x = mouseX;
circle3.y = mouseY;
text("Circle x:" + int(circle3.x) + " y:" + int(circle3.y), circle3.x + 20, circle3.y);
}
if (mouseIsPressed && circle4.isInside()) {
circle4.x = mouseX;
circle4.y = mouseY;
text("Circle x:" + int(circle4.x) + " y:" + int(circle4.y), circle4.x + 20, circle4.y);
}
var Circle = function(x, y, d) {
this.x = x;
this.y = y;
this.diameter = d;
this.time = 0;
this.outline = 1;
this.display = function() {
strokeWeight(this.outline);
fill(200,100,100,50);
ellipse(this.x, this.y, this.diameter, this.diameter);
}
this.isInside = function() {
var d = dist(mouseX, mouseY, this.x, this.y)
if (d < this.diameter / 2) {
return true;
} else {
return false;
}
}
this.drag = function() {
ellipse(mouseX, mouseY, this.diameter, this.diameter);
}
}
var isInside = false;
var time = 0;
var outlineSpeed = 0.025;
function setup() {
createCanvas(400, 400);
circle1 = new Circle(random(width / 2), random(height / 2), 30);
circle2 = new Circle(random(width / 2, width), random(0, height / 2), 30);
circle3 = new Circle(random(width / 2), random(height / 2, height), 30);
circle4 = new Circle(random(width / 2, width), random(height / 2, height), 30);
}
function draw() {
background(220, 200, 200);
time++;
circle1.outline = circle1.outline + outlineSpeed;
if (circle1.outline > 3 || circle1.outline < 0.2) {
outlineSpeed = outlineSpeed * -1;
}
circle2.outline = circle2.outline + outlineSpeed;
if (circle2.outline > 3 || circle2.outline < 0.2) {
outlineSpeed = outlineSpeed * -1;
}
circle3.outline = circle3.outline + outlineSpeed;
if (circle3.outline > 3 || circle3.outline < 0.2) {
outlineSpeed = outlineSpeed * -1;
}
circle4.outline = circle4.outline + outlineSpeed;
if (circle4.outline > 3 || circle4.outline < 0.2) {
outlineSpeed = outlineSpeed * -1;
}
beginShape(QUADS);
strokeWeight(1);
fill(200, 100, 100)
vertex(circle1.x, circle1.y)
vertex(circle2.x, circle2.y)
vertex(circle4.x, circle4.y)
vertex(circle3.x, circle3.y)
endShape(CLOSE);
fill(255);
circle1.display();
circle2.display();
circle3.display();
circle4.display();
strokeWeight(1);
if (mouseIsPressed && circle1.isInside()) {
circle1.x = mouseX;
circle1.y = mouseY;
text("Circle x:" + int(circle1.x) + " y:" + int(circle1.y), circle1.x + 20, circle1.y);
}
if (mouseIsPressed && circle2.isInside()) {
circle2.x = mouseX;
circle2.y = mouseY;
text("Circle x:" + int(circle2.x) + " y:" + int(circle2.y), circle2.x + 20, circle2.y);
}
if (mouseIsPressed && circle3.isInside()) {
circle3.x = mouseX;
circle3.y = mouseY;
text("Circle x:" + int(circle3.x) + " y:" + int(circle3.y), circle3.x + 20, circle3.y);
}
if (mouseIsPressed && circle4.isInside()) {
circle4.x = mouseX;
circle4.y = mouseY;
text("Circle x:" + int(circle4.x) + " y:" + int(circle4.y), circle4.x + 20, circle4.y);
}
var Circle = function(x, y, d) {
this.x = x;
this.y = y;
this.diameter = d;
this.time = 0;
this.outline = 1;
this.display = function() {
strokeWeight(this.outline);
fill(200,100,100,50);
ellipse(this.x, this.y, this.diameter, this.diameter);
}
this.isInside = function() {
var d = dist(mouseX, mouseY, this.x, this.y)
if (d < this.diameter / 2) {
return true;
} else {
return false;
}
}
this.drag = function() {
ellipse(mouseX, mouseY, this.diameter, this.diameter);
}
}
var isInside = false;
var time = 0;
var outlineSpeed = 0.025;
function setup() {
createCanvas(400, 400);
circle1 = new Circle(random(width / 2), random(height / 2), 30);
circle2 = new Circle(random(width / 2, width), random(0, height / 2), 30);
circle3 = new Circle(random(width / 2), random(height / 2, height), 30);
circle4 = new Circle(random(width / 2, width), random(height / 2, height), 30);
}
function draw() {
background(220, 200, 200);
time++;
circle1.outline = circle1.outline + outlineSpeed;
if (circle1.outline > 3 || circle1.outline < 0.2) {
outlineSpeed = outlineSpeed * -1;
}
circle2.outline = circle2.outline + outlineSpeed;
if (circle2.outline > 3 || circle2.outline < 0.2) {
outlineSpeed = outlineSpeed * -1;
}
circle3.outline = circle3.outline + outlineSpeed;
if (circle3.outline > 3 || circle3.outline < 0.2) {
outlineSpeed = outlineSpeed * -1;
}
circle4.outline = circle4.outline + outlineSpeed;
if (circle4.outline > 3 || circle4.outline < 0.2) {
outlineSpeed = outlineSpeed * -1;
}
beginShape(QUADS);
strokeWeight(1);
fill(200, 100, 100)
vertex(circle1.x, circle1.y)
vertex(circle2.x, circle2.y)
vertex(circle4.x, circle4.y)
vertex(circle3.x, circle3.y)
endShape(CLOSE);
fill(255);
circle1.display();
circle2.display();
circle3.display();
circle4.display();
strokeWeight(1);
if (mouseIsPressed && circle1.isInside()) {
circle1.x = mouseX;
circle1.y = mouseY;
text("Circle x:" + int(circle1.x) + " y:" + int(circle1.y), circle1.x + 20, circle1.y);
}
if (mouseIsPressed && circle2.isInside()) {
circle2.x = mouseX;
circle2.y = mouseY;
text("Circle x:" + int(circle2.x) + " y:" + int(circle2.y), circle2.x + 20, circle2.y);
}
if (mouseIsPressed && circle3.isInside()) {
circle3.x = mouseX;
circle3.y = mouseY;
text("Circle x:" + int(circle3.x) + " y:" + int(circle3.y), circle3.x + 20, circle3.y);
}
if (mouseIsPressed && circle4.isInside()) {
circle4.x = mouseX;
circle4.y = mouseY;
text("Circle x:" + int(circle4.x) + " y:" + int(circle4.y), circle4.x + 20, circle4.y);
}
var Circle = function(x, y, d) {
this.x = x;
this.y = y;
this.diameter = d;
this.time = 0;
this.outline = 1;
this.display = function() {
strokeWeight(this.outline);
fill(200,100,100,50);
ellipse(this.x, this.y, this.diameter, this.diameter);
}
this.isInside = function() {
var d = dist(mouseX, mouseY, this.x, this.y)
if (d < this.diameter / 2) {
return true;
} else {
return false;
}
}
this.drag = function() {
ellipse(mouseX, mouseY, this.diameter, this.diameter);
}
}
var isInside = false;
var time = 0;
var outlineSpeed = 0.025;
function setup() {
createCanvas(400, 400);
circle1 = new Circle(random(width / 2), random(height / 2), 30);
circle2 = new Circle(random(width / 2, width), random(0, height / 2), 30);
circle3 = new Circle(random(width / 2), random(height / 2, height), 30);
circle4 = new Circle(random(width / 2, width), random(height / 2, height), 30);
}
function draw() {
background(220, 200, 200);
time++;
circle1.outline = circle1.outline + outlineSpeed;
if (circle1.outline > 3 || circle1.outline < 0.2) {
outlineSpeed = outlineSpeed * -1;
}
circle2.outline = circle2.outline + outlineSpeed;
if (circle2.outline > 3 || circle2.outline < 0.2) {
outlineSpeed = outlineSpeed * -1;
}
circle3.outline = circle3.outline + outlineSpeed;
if (circle3.outline > 3 || circle3.outline < 0.2) {
outlineSpeed = outlineSpeed * -1;
}
circle4.outline = circle4.outline + outlineSpeed;
if (circle4.outline > 3 || circle4.outline < 0.2) {
outlineSpeed = outlineSpeed * -1;
}
beginShape(QUADS);
strokeWeight(1);
fill(200, 100, 100)
vertex(circle1.x, circle1.y)
vertex(circle2.x, circle2.y)
vertex(circle4.x, circle4.y)
vertex(circle3.x, circle3.y)
endShape(CLOSE);
fill(255);
circle1.display();
circle2.display();
circle3.display();
circle4.display();
strokeWeight(1);
if (mouseIsPressed && circle1.isInside()) {
circle1.x = mouseX;
circle1.y = mouseY;
text("Circle x:" + int(circle1.x) + " y:" + int(circle1.y), circle1.x + 20, circle1.y);
}
if (mouseIsPressed && circle2.isInside()) {
circle2.x = mouseX;
circle2.y = mouseY;
text("Circle x:" + int(circle2.x) + " y:" + int(circle2.y), circle2.x + 20, circle2.y);
}
if (mouseIsPressed && circle3.isInside()) {
circle3.x = mouseX;
circle3.y = mouseY;
text("Circle x:" + int(circle3.x) + " y:" + int(circle3.y), circle3.x + 20, circle3.y);
}
if (mouseIsPressed && circle4.isInside()) {
circle4.x = mouseX;
circle4.y = mouseY;
text("Circle x:" + int(circle4.x) + " y:" + int(circle4.y), circle4.x + 20, circle4.y);
}
var Circle = function(x, y, d) {
this.x = x;
this.y = y;
this.diameter = d;
this.time = 0;
this.outline = 1;
this.display = function() {
strokeWeight(this.outline);
fill(200,100,100,50);
ellipse(this.x, this.y, this.diameter, this.diameter);
}
this.isInside = function() {
var d = dist(mouseX, mouseY, this.x, this.y)
if (d < this.diameter / 2) {
return true;
} else {
return false;
}
}
this.drag = function() {
ellipse(mouseX, mouseY, this.diameter, this.diameter);
}
}
var isInside = false;
var time = 0;
var outlineSpeed = 0.025;
function setup() {
createCanvas(400, 400);
circle1 = new Circle(random(width / 2), random(height / 2), 30);
circle2 = new Circle(random(width / 2, width), random(0, height / 2), 30);
circle3 = new Circle(random(width / 2), random(height / 2, height), 30);
circle4 = new Circle(random(width / 2, width), random(height / 2, height), 30);
}
function draw() {
background(220, 200, 200);
time++;
circle1.outline = circle1.outline + outlineSpeed;
if (circle1.outline > 3 || circle1.outline < 0.2) {
outlineSpeed = outlineSpeed * -1;
}
circle2.outline = circle2.outline + outlineSpeed;
if (circle2.outline > 3 || circle2.outline < 0.2) {
outlineSpeed = outlineSpeed * -1;
}
circle3.outline = circle3.outline + outlineSpeed;
if (circle3.outline > 3 || circle3.outline < 0.2) {
outlineSpeed = outlineSpeed * -1;
}
circle4.outline = circle4.outline + outlineSpeed;
if (circle4.outline > 3 || circle4.outline < 0.2) {
outlineSpeed = outlineSpeed * -1;
}
beginShape(QUADS);
strokeWeight(1);
fill(200, 100, 100)
vertex(circle1.x, circle1.y)
vertex(circle2.x, circle2.y)
vertex(circle4.x, circle4.y)
vertex(circle3.x, circle3.y)
endShape(CLOSE);
fill(255);
circle1.display();
circle2.display();
circle3.display();
circle4.display();
strokeWeight(1);
if (mouseIsPressed && circle1.isInside()) {
circle1.x = mouseX;
circle1.y = mouseY;
text("Circle x:" + int(circle1.x) + " y:" + int(circle1.y), circle1.x + 20, circle1.y);
}
if (mouseIsPressed && circle2.isInside()) {
circle2.x = mouseX;
circle2.y = mouseY;
text("Circle x:" + int(circle2.x) + " y:" + int(circle2.y), circle2.x + 20, circle2.y);
}
if (mouseIsPressed && circle3.isInside()) {
circle3.x = mouseX;
circle3.y = mouseY;
text("Circle x:" + int(circle3.x) + " y:" + int(circle3.y), circle3.x + 20, circle3.y);
}
if (mouseIsPressed && circle4.isInside()) {
circle4.x = mouseX;
circle4.y = mouseY;
text("Circle x:" + int(circle4.x) + " y:" + int(circle4.y), circle4.x + 20, circle4.y);
}
var Ball = function(x, y) {
this.x = x;
this.y = y;
this.display = function() {
ellipse(this.x, this.y, 30, 30);
}
}
var speed = 0.1;
function setup() {
createCanvas(500, 500)
ball1 = new Ball(width / 2, height / 2);
}
function draw() {
background(150);
ball1.display();
var disX = mouseX - ball1.x;
var disY = mouseY - ball1.y;
ball1.x = ball1.x + disX * speed;
ball1.y = ball1.y + disY * speed;
var Circle = function(x,y,d) {
this.x = x;
this.y = y;
this.diameter = d;
this.display = function() {
ellipse(this.x,this.y,this.diameter,this.diameter);
}
this.isInside = function() {
var d = dist(mouseX,mouseY,this.x,this.y)
if (d < this.diameter/2) { 
return true; 
} else {
return false;
}
}
this.drag = function() {
ellipse(mouseX,mouseY,this.diameter,this.diameter);
}
}
var isInside = false;
var circles = [];
function setup() { 
createCanvas(400, 400);
for (var i = 0; i < 4; i++){ 
circles[i] = new Circle(random(width/2),random(height/2),50);
} 
}
function draw() { 
background(220);
for (var i = 0; i < 4; i++){  
circles[i].display();
vertex(circles[i].x,circles[i].y,circles[i+1].x,circles[i+1].y);
\
if(mouseIsPressed && circles[i].isInside()){
circles[i].x = mouseX;
circles[i].y = mouseY;
}
}
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
}
var 
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
}
function setup() {
createCanvas(500,500);
}
function draw() {
/function setup() {
createCanvas(500,600);
colorMode(HSB,255,255,255);
smooth();
}
function draw() {
background(230,150,200);
fill(100,100,100);
ellipse(width/2,height/2,100,200);
fill(255);
ellipse(width/2-25,height/2+25,20,20);
ellipse(width/2+25,height/2+25,20,20);
push();
strokeWeight(5);
point(width/2+30,height/2+20);
point(width/2-30,height/2+30);
pop();
fill(0);
ellipse(width/2,height/2+60,80,30);
rectMode(CENTER);
fill(100,100,100);
ellipse(width/2,height/2+125,50,50);
rect(width/2,height/2+175,30,50);
line(width/2-15,height/2+200,width/2-15,height/2+250);
line(width/2+15,height/2+200,width/2+15,height/2+250);
line(width/2-10,height/2+200,width/2-10,height/2+250);
line(width/2+10,height/2+200,width/2+10,height/2+250);
line(width/2,height/2+200,width/2,height/2+250);
}function setup() { 
createCanvas(400, 400);
colorMode(HSB,255,255,255);
} 
function draw() { 
background(220);
fill(128,200,255);
ellipse(200, 200, 100, 100);
}function setup() {
createCanvas(500,500);
} 
function draw() { 
background(220);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
}  bluerectw = 35;
bluerecth = 35; 
function setup() {
createCanvas(500,400);
colorMode(HSB,255,255,255);
}
function draw() {
background(128,255,255)
stroke(2,255,255)
strokeWeight(30)
line(-5,-5,width+5,height+5);
noStroke();
fill(100,225,230)
ellipse(width/2,height/2,300,225)
rectMode(CORNER)
fill(160,200,150)
rect(width/2+150-bluerectw,height/2-bluerecth,bluerectw,bluerecth)
}function setup() { 
createCanvas(400, 400);
colorMode(HSB,255,255,255);
} 
function draw() { 
background(128,255,255);
stroke(2m
line(-5,-5,width+5,height+5)
}function setup() { 
createCanvas(500, 400);
colorMode(HSB,255,255,255);
} 
function draw() { 
background(128,255,255);
strokeWeight(30);
stroke(2,255,255);
line(-5,-5,width+5,height+5);
/
noStroke()
fill(100,255,200);
ellipse(width/2,height/2,275,200);
}function setup() { 
createCanvas(500,500);
colorMode(HSB,255,255,255);
} 
function draw() { 
background(255);
fill(128,255,255);
noStroke();
ellipse(width/2,height/2,150,150);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(100);
ellipse(width/2,height/2,50,50);
}