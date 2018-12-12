var c;
function setup() { 
var inpW = createInput('width');
var inpH = createInput('height');
inpH.input(callEventH);
var inpC = createInput('width+height');
inpH.input(callEventC);
createCanvas(windowWidth, windowHeight);
} 
function draw() { 
background(220);
}
function callEventW() {
a = this.value();
console.log('A: ', a);
}
function callEventH() {
b = this.value();
console.log('B: ', b);
}
function callEventC() {
c = this.value(a+b);
console.log('C: ', c);
function setup() { 
var inpW = createInput('width');
var inpH = createInput('height');
inpH.input(callEventH);
button = createButton("Click");
createCanvas(windowWidth, windowHeight);
w = 100;
h = 100;
} 
function draw() { 
background(220);
}
w =a;
h =b;
}
function callEventW() {
a = this.value();
console.log('A: ', a);
}
function callEventH() {
b = this.value();
console.log('B: ', b);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(160, 200, 200);
noFill();
strokeWeight(2);
ellipse(width/7,height/4*1,20,20)
strokeWeight(2);
ellipse(width/7,height/4*1,28,28)
strokeWeight(2);
ellipse(width/7,height/4*1,35,35)
strokeWeight(1);
ellipse(width/7,height/4*1,40,40)
strokeWeight(1);
ellipse(width/7,height/4*1,45,45)
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
let img;
let x, y;
function setup() {
createCanvas(640, 480);
x = width / 2;
y = height / 2;
background(0);
img = createCapture(VIDEO);
}
function draw() {
for (let i = 0; i < 50; i++) {
let x = floor(random(width));
let y = floor(random(height));
let col = img.get(x, y);
col[3] = 100;
fill(col);
noStroke();
ellipse(x, y, 30);
}
}let img;
function setup() { 
createCanvas(640, 440);
background(0);
img = createCapture(VIDEO);
} 
function draw() { 
let col = img.get(mouseX, mouseY);
col
fill(col);
noStroke();
ellipse(mouseX, mouseY, 10);
}var img;
var fortunes = [];
function preload() {
img = loadImage("images/FT.jpg");
}
function setup() { 
createCanvas(600, 400);
button = createButton("Get your fortune!");
button.mousePressed(getFortune);
myDiv = createDiv('');
myDiv.style("position", 255, 274);
myDiv.style("width", '150px');
myDiv.style("font-size", '11px');
}
function draw() { 
image(img, 0, 0);
textAlign(CENTER);
}
function gotData(data){
for (var i = 0; i < data['tarot_interpretations'].length; i++){
fortunes.push(data['tarot_interpretations'][i]['fortune_telling'].join('. '));
}
}
function getFortune(){
var fortune = random(fortunes);
myDiv.html(fortune);
}var img;
var button;
function preload() {
img = loadImage("images/FT.jpg");
}
function setup() { 
createCanvas(600, 400);
button = createButton("Get your fortune!");
button.mousePressed(getFortune);
myDiv = createDiv('');
myDiv.style("position", 255, 274);
myDiv.style("width", '150px');
myDiv.style("font-size", '11px');
}
function draw() { 
image(img, 0, 0);
textAlign(CENTER);
}
function gotData(data){
for (var i = 0; i < data['tarot_interpretations'].length; i++){
fortunes.push(data['tarot_interpretations'][i]['fortune_telling'].join('. '));
}
}
function getFortune(){
var fortune = random(fortunes);
myDiv.html(fortune);
}var myMap;
var canvas;
var mappa = new Mappa('Leaflet');
var options = {
lat: 0,
lng: 0,
zoom: 4,
}
function setup(){
canvas = createCanvas(640,640);
myMap = mappa.tileMap(options); 
myMap.overlay(canvas) 
meteorites = loadTable('Meteorite_Landings.csv', 'csv', 'header');
myMap.onChange(drawMeteorites);
fill(70, 203,31);	
stroke(100);
}
function draw(){
}
function drawMeteorites() {
clear();
for (var i = 0; i < meteorites.getRowCount(); i++) {
var latitude = Number(meteorites.getString(i, 'reclat'));
var longitude = Number(meteorites.getString(i, 'reclong'));
if (myMap.map.getBounds().contains({lat: latitude, lng: longitude})) {
var pos = myMap.latLngToPixel(latitude, longitude);
var size = meteorites.getString(i, 'mass (g)');
size = map(size, 558, 60000000, 1, 25) + myMap.zoom();
ellipse(pos.x, pos.y, size, size);
}
}
}let img;
let stars = [];
let fireflies = [];
function preload() {
img = loadImage("images/nightfield.png");
}
function setup() {
createCanvas(600, 338);
preload();
for (let i = 0; i < 200; i++) {
fireflies[i] = new Fireflies(random(width), random(height));
}
for (let i = 0; i < 50; i++){
stars[i] = new Star(random(width), random(height-110), int(random(5, 10)), random(1,8), random(2,12), random(-100, 100));
}
}
function draw() {
noStroke();
image(img, 0, 0);
fill(255,200);
ellipse(513,42,60,60);
fill(255,30);
ellipse(520,37,115,115);
ellipse(515,40,143,143);
for(let i = 0; i < stars.length; i++){
stars[i].show();
}
for (let i = 0; i < fireflies.length; i++) {
fireflies[i].update();
fireflies[i].display();
for (let j = 0; j < fireflies.length; j++) {
if (i != j && fireflies[i].intersects(fireflies[j])) {
}
}
}
}
var img;
var data;
var i = 0;
var button;
var fortunes = [];
var myDiv;
function preload() {
img = loadImage("images/FT.jpg");
}
function setup() { 
createCanvas(600, 400);
button = createButton("Get your fortune!");
button.mousePressed(getFortune);
myDiv = createDiv('');
myDiv.style("position", 255, 274);
myDiv.style("width", '150px');
myDiv.style("font-size", '11px');
}
function draw() { 
image(img, 0, 0);
textAlign(CENTER);
}
function gotData(data){
for (var i = 0; i < data['tarot_interpretations'].length; i++){
fortunes.push(data['tarot_interpretations'][i]['fortune_telling'].join('. '));
}
}
function getFortune(){
var fortune = random(fortunes);
myDiv.html(fortune);
}let data;
function preload() { 
} 
function setup() { 
createCanvas(500, 500);
background(0);
createP(data.description);
createA(data.source,'source');
for (let i = 0; i < data.pokemon.length; i++) {
fill(255);
textAlign(CENTER);
text(data.tarot_interpretations[i].fortune_telling,random(width), random(height-100));
}
console.log(data);
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
}let data;
function preload() { 
} 
function setup() { 
createCanvas(500, 500);
background(0);
createP(data.tarot_interpretations);
createA(data.source,'source');
for (let i = 0; i < data.pokemon.length; i++) {
fill(255);
textAlign(CENTER);
text(data.tarot_interpretations[i].fortune_telling,random(width), random(height-100));
}
console.log(data);
var bgValue = 0;
function setup() {
createCanvas(640, 480);
}
for (var i = 0; i < portList.length; i++) {
portName = portList[i];
}
}
}
if (inData.length>0) {
console.log("Got data: " + inData);
var d = split(inData, ',');
console.log(d);
if (d.length == 4) {
bgValue = parseInt(d[0]);
switchState = parseInt(d[1]);
console.log("bgValue = " + bgValue);
console.log("switchState = " + switchState);      
}
}
}
function draw() {
if (switchState == 1) { 
background(bgValue/4);
} else {
background(255, 0, bgValue/4);
}
textSize(32);
fill(0);
stroke(0);
fill(255, 0, 0);
ellipse(100, 300, 50, 50);
fill(0, 255, 0);
ellipse(200, 300, 50, 50);
}
function mousePressed() {
if (mouseX < width/2) {
} else {
}
}
function keyPressed() {
if (key>=0 && key<=9) {
}
}
function setup() {
createCanvas(500, 300);
}
function gotData() {
}
function draw() {
background(255, 255, 255);
fill(0, 0, 0);
var data = map(latestData, 0, 1023, 0, height);
ellipse(100, 100, data, data);
text(data, 10, 10);
function setup() {
createCanvas(500, 300);
}
function gotData() {
}
function draw() {
background(255, 255, 255);
fill(0, 0, 0);
var data = map(latestData, 0, 1023, 0, height);
ellipse(50, data, 50, 50);
text(data, 10, 10);
function setup() {
createCanvas(500, 300);
}
function gotData() {
}
function draw() {
background(255, 255, 255);
fill(0, 0, 0);
var data = map(latestData, 0, 1023, 0, height);
ellipse(50, data, 50, 50);
text(data, 10, 10);
}let img;
let stars = [];
let fireflies = [];
function preload() {
img = loadImage("images/nightfield.png");
}
function setup() {
createCanvas(600, 338);
preload();
for (let i = 0; i < 200; i++) {
fireflies[i] = new Fireflies(random(width), random(height));
}
for (let i = 0; i < 50; i++){
stars[i] = new Star(random(width), random(height-110), int(random(5, 10)), random(1,8), random(2,12), random(-100, 100));
}
}
function draw() {
noStroke();
image(img, 0, 0);
fill(255,200);
ellipse(513,42,60,60);
fill(255,30);
ellipse(520,37,115,115);
ellipse(515,40,143,143);
for(let i = 0; i < stars.length; i++){
stars[i].show();
}
for (let i = 0; i < fireflies.length; i++) {
fireflies[i].update();
fireflies[i].display();
for (let j = 0; j < fireflies.length; j++) {
if (i != j && fireflies[i].intersects(fireflies[j])) {
}
}
}
}
class Sheep {
constructor(x, y){
this.x = x;
this.y = y;
this.original_y = y;
this.speed = 5;
}
move(){
this.x += this.speed;
if(this.x > width || this.x < 0){
this.speed = this.speed * -1; 
}
var mapped_x_pos = map( this.x, 0, width, PI, 2*PI);
this.y = this.original_y + sin(mapped_x_pos) * 170;
}
show(){
noStroke();
fill(255);
ellipse(this.x, this.y, 50, 50);  
}
}
var the_one_sheep_copy;
function setup() { 
createCanvas(400, 400);
the_one_sheep_copy = new Sheep(20, 350);
} 
function draw() { 
background(0);
the_one_sheep_copy.show();
the_one_sheep_copy.move();
}class Star {
constructor(x, y, npoints, radius1, radius2, rotation_speed) {
this.x = x;
this.y = y;
this.radius1 = radius1;
this.radius2 = radius2;
this.npoints = npoints;
this.rotation_speed = rotation_speed;
}
show() {
push();
translate(this.x, this.y);
rotate(frameCount / this.rotation_speed);
var angle = TWO_PI / this.npoints;
var halfAngle = angle/2.0;
beginShape();
for (var a = 0; a < TWO_PI; a += angle) {
var sx = 0 + cos(a) * this.radius2;
var sy = 0 + sin(a) * this.radius2;
vertex(sx, sy);
sx = 0 + cos(a+halfAngle) * this.radius1;
sy = 0 + sin(a+halfAngle) * this.radius1;
vertex(sx, sy);
}
endShape(CLOSE);
pop();
}
}
var all_our_star_copies = [];
var num_stars = 10;
function setup() { 
createCanvas(400, 400);
for(var i = 0; i < num_stars; i++){
var x = random(width);
var y = random(height);
var n_points = int(random(5, 10));
var r1 = random(1,8);
var r2 = random(2,12);
var rotation_speed = random(-100, 100);
all_our_star_copies.push(  new Star(x, y, n_points, r1, r2, rotation_speed )  ); 
}
} 
function draw() { 
background(220);
for(var i = 0; i < all_our_star_copies.length; i++){
all_our_star_copies[i].show();
}
}function setup() { 
createCanvas(400, 400);
for (let i = 0; i < 200; i++) {
star[i] = new Stars(random(width), random(height));
}
} 
function draw() { 
background(0);
push();
noFill();
stroke(random(255));
translate(width*0.8, height*0.5);
rotate(frameCount / -100.0);
ellipse(0, 0, 20, 20, 20);
fill('yellow');
star(0, 0, 10, 5, 5); 
pop();
}
function star(x, y, radius1, radius2, npoints) {
var angle = TWO_PI / npoints;
var halfAngle = angle/2.0;
beginShape();
for (var a = 0; a < TWO_PI; a += angle) {
var sx = x + cos(a) * radius2;
var sy = y + sin(a) * radius2;
vertex(sx, sy);
sx = x + cos(a+halfAngle) * radius1;
sy = y + sin(a+halfAngle) * radius1;
vertex(sx, sy);
}
endShape(CLOSE);
}let img;
let all_our_star_copies = [];
let num_stars = 50;
let fireflies = [];
function preload() {
img = loadImage("images/nightfield.png");
}
function setup() {
createCanvas(600, 338);
preload();
for (let i = 0; i < 200; i++) {
fireflies[i] = new Fireflies(random(width), random(height));
}
for (let i = 0; i < num_stars; i++){
let x = random(width);
let y = random(height-110);
let n_points = int(random(5, 10));
let r1 = random(1,8);
let r2 = random(2,12);
let rotation_speed = random(-100, 100);
all_our_star_copies.push(new Star(x, y, n_points, r1, r2, rotation_speed )  ); 
}
}
function draw() {
noStroke();
image(img, 0, 0);
for(let i = 0; i < all_our_star_copies.length; i++){
all_our_star_copies[i].show();
}
for (let i = 0; i < fireflies.length; i++) {
fireflies[i].update();
fireflies[i].display();
for (let j = 0; j < fireflies.length; j++) {
if (i != j && fireflies[i].intersects(fireflies[j])) {
}
}
}
}
let img;
let bubbles = [];
function preload() {
img = loadImage("images/nightfield1.png");
}
function setup() { 
createCanvas(600, 338);
preload();
for (let i = 0; i < 230; i++) {
bubbles[i] = new Bubble(random(width), random(height-110));
}
} 
function draw() { 
background(220);
image(img, 0, 0);
for (var i = 0; i < bubbles.length; i++) {
bubbles[i].update();
bubbles[i].display();
for (var j = 0; j < bubbles.length; j++) {
if (i != j && bubbles[i].intersects(bubbles[j])) {
bubbles[i].changeColor();
bubbles[j].changeColor();
}let img;
let fireflies = [];
function preload() {
img = loadImage("images/nightfield.png");
}
function setup() {
createCanvas(600, 338);
preload();
for (let i = 0; i < 200; i++) {
fireflies[i] = new Fireflies(random(width), random(height));
}
}
function draw() {
noStroke();
image(img, 0, 0);
for (let i = 0; i < fireflies.length; i++) {
fireflies[i].update();
fireflies[i].display();
for (let j = 0; j < fireflies.length; j++) {
if (i != j && fireflies[i].intersects(fireflies[j])) {
}
}
}
6.10 p5.js checking objects intersection part 2 (part 1 is in video 6.9)
var bubbles = [];
function setup() {
createCanvas(600, 400);
for (var i = 0; i < 50; i++) {
bubbles[i] = new Bubble(random(width), random(height));
}
}
function draw() {
background(0);
for (var i = 0; i < bubbles.length; i++) {
bubbles[i].update();
bubbles[i].display();
for (var j = 0; j < bubbles.length; j++) {
if (i != j && bubbles[i].intersects(bubbles[j])) {
bubbles[i].changeColor();
bubbles[j].changeColor();
}
}
}
6.10 p5.js checking objects intersection part 2 (part 1 is in video 6.9)
var bubbles = [];
function setup() {
createCanvas(600, 400);
for (var i = 0; i < 15; i++) {
bubbles[i] = new Bubble(random(width), random(height));
}
}
function draw() {
background(0);
for (var i = 0; i < bubbles.length; i++) {
bubbles[i].update();
bubbles[i].display();
for (var j = 0; j < bubbles.length; j++) {
if (i != j && bubbles[i].intersects(bubbles[j])) {
bubbles[i].changeColor();
bubbles[j].changeColor();
}
}
}
}function setup() { 
createCanvas(600, 400);
} 
function draw() { 
background(0,0,51);
noStroke();
fill(34, 51, 0)
arc(200, 350, 600, 375, PI+QUARTER_PI,TWO_PI);
fill(34, 51, 0);
arc(500, 350, 800, 300, PI+QUARTER_PI,TWO_PI);
rect(0, 163, 200, 187);
rect(0, 350, 600, 50);
stroke(51, 26, 0);
strokeWeight(24);
noFill();
arc(0, 510, 900, 700, PI+QUARTER_PI,TWO_PI);
arc(-75, 530, 900, 700, PI+QUARTER_PI,TWO_PI);
strokeCap(SQUARE);
line(65,140,55,220);
strokeWeight(28);
line(170,153,150,260);
strokeWeight(32);
line(288,192,254,325);
strokeWeight(35);
line(400,260,350,400);
noStroke();
fill('yellow');
ellipse(500, 80, 80, 80);
fill(0,0,51);
ellipse(475, 80, 75, 75);
}let bouncer1;
let bouncer2;
let gravity = 0.1;
function setup() {
createCanvas(400, 400);
bouncer1 = new Ball(100,100);
bouncer2 = new Ball(300,300);
}
function draw() {
background(255);
bouncer1.render();
bouncer1.update();
bouncer2.render();
bouncer2.update();
}
let x = 145;
let y = 365;
let w = 100;
let h = 10;
let value = 0;
let sliderStart = 114;
let sliderEnd = 287;
let offsetX = 0;
let buttonWasClicked = false;
function setup() {
createCanvas(400, 500);
}
function draw() {
background.hide();
iPhone();
StartButton();
Screen();
LockScreen();
SlideToUnlock();
}
function iPhone(){
strokeWeight(3);
stroke("silver");
fill("white");
rect(100, 60, 200, 380, 23);
rect(99, 110, 0, 14)
rect(99, 135, 0, 23)
rect(99, 166, 0, 23)
noStroke();
fill(0)
ellipse(204, 75, 5, 5);
ellipse(176, 87, 6, 6);
rect(189, 85, 32, 2.75, 3)
}
function StartButton() {
stroke("grey");
strokeWeight(2);
fill(255)
ellipse(201, 413, 29, 29);
}
function Screen() {
stroke("grey");
strokeWeight(1);
image(background, 115, 111, 172, 280);
}
function LockScreen() { 
if (dragging) {
x = mouseX + offsetX;
}
x = constrain(x, sliderStart, sliderEnd - w);
let b = map(x, sliderStart, sliderEnd - w, 0, 0);
let fill_opacity = map(x, 144, 188, 255, 0);
fill(b,fill_opacity);
rect(sliderStart, 111, sliderEnd - sliderStart, 280);
}
function SlideToUnlock() {
noStroke();
line(sliderStart, y + h / 2, sliderEnd, y + h / 2);
if(buttonWasClicked == true){
textSize(12);
let text_opacity = map(x, 144, 188, 255, 0);
fill(random(255),text_opacity);
text("> slide to unlock", x + 9, y + 9);
}
}
function mousePressed() {
if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
dragging = true;
offsetX = x - mouseX;
}
if (dist(mouseX,mouseY,201, 413)  < 29/2) {
buttonWasClicked = true;
}
let x = 145;
let y = 365;
let w = 100;
let h = 10;
let value = 0;
let sliderStart = 114;
let sliderEnd = 287;
let offsetX = 0;
let buttonWasClicked = false;
function setup() {
createCanvas(400, 500);
}
function draw() {
background.hide();
strokeWeight(3);
stroke("silver");
fill("white");
rect(100, 60, 200, 380, 23);
rect(99, 110, 0, 14)
rect(99, 135, 0, 23)
rect(99, 166, 0, 23)
noStroke();
fill(0)
ellipse(204, 75, 5, 5);
ellipse(176, 87, 6, 6);
rect(189, 85, 32, 2.75, 3)
stroke("grey");
strokeWeight(2);
fill(255)
ellipse(201, 413, 29, 29);
stroke("grey");
strokeWeight(1);
image(background, sliderStart, 111, 172, 280);
if (dragging) {
x = mouseX + offsetX;
}
x = constrain(x, sliderStart, sliderEnd - w);
let b = map(x, sliderStart, sliderEnd - w, 0, 0);
let fill_opacity = map(x, 144, 188, 255, 0);
fill(b,fill_opacity);
rect(sliderStart, 111, sliderEnd - sliderStart, 280);
noStroke();
line(sliderStart, y + h / 2, sliderEnd, y + h / 2);
if(buttonWasClicked == true){
textSize(12);
let text_opacity = map(x, 144, 188, 255, 0);
fill(random(255),text_opacity);
text("> slide to unlock", x + 9, y + 9);
}
}
function mousePressed() {
if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
dragging = true;
offsetX = x - mouseX;
}
if (dist(mouseX,mouseY,201, 413)  < 29/2) {
buttonWasClicked = true;
}
let x = 145;
let y = 365;
let w = 100;
let h = 10;
let value = 0;
let speed = 1;
let on = true;
let r = 0;
let g = 45;
let b = 0;
let sliderStart = 114;
let sliderEnd = 288;
let offsetX = 0;
let buttonWasClicked = false;
function setup() {
createCanvas(400, 500);
}
function draw() {
background(255);
strokeWeight(3);
stroke("silver");
fill("white");
rect(100, 60, 200, 380, 23);
rect(99, 110, 0, 14)
rect(99, 135, 0, 23)
rect(99, 166, 0, 23)
noStroke();
fill(0)
ellipse(204, 75, 5, 5);
ellipse(176, 87, 6, 6);
rect(189, 85, 32, 2.75, 3)
stroke("grey");
strokeWeight(2);
fill(255)
ellipse(201, 413, 29, 29);
stroke("grey");
strokeWeight(1);
fill(value);
rect(113, 110, 175, 280);
if (dragging) {
x = mouseX + offsetX;
}
x = constrain(x, sliderStart, sliderEnd - w);
noStroke();
line(sliderStart, y + h / 2, sliderEnd, y + h / 2);
if (dragging) {
fill(0);
} else {
fill(0);
}
if(buttonWasClicked == true){
textSize(12);
let text_opacity = map(x, 144, 188, 255,0);
fill(random(255),text_opacity );
text("> slide to unlock", x + 9, y + 9);
}
let b = map(x, sliderStart, sliderEnd - w, 0, 255);
fill(b, 130);
rect(sliderStart, 111, sliderEnd - sliderStart, 279);
}
function mousePressed() {
if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
dragging = true;
offsetX = x - mouseX;
}
if (dist(mouseX,mouseY,201, 413)  < 29/2) {
buttonWasClicked = true;
}
let x = 145;
let y = 365;
let w = 100;
let h = 10;
let value = 0;
let sliderStart = 114;
let sliderEnd = 288;
let offsetX = 0;
let buttonWasClicked = false;
function setup() {
createCanvas(400, 500);
}
function draw() {
background(255);
strokeWeight(3);
stroke("silver");
fill("white");
rect(100, 60, 200, 380, 23);
rect(99, 110, 0, 14)
rect(99, 135, 0, 23)
rect(99, 166, 0, 23)
noStroke();
fill(0)
ellipse(204, 75, 5, 5);
ellipse(176, 87, 6, 6);
rect(189, 85, 32, 2.75, 3)
stroke("grey");
strokeWeight(2);
fill(255)
ellipse(201, 413, 29, 29);
stroke("grey");
strokeWeight(1);
fill(value);
rect(113, 110, 175, 280);
if (dragging) {
x = mouseX + offsetX;
}
x = constrain(x, sliderStart, sliderEnd - w);
noStroke();
line(sliderStart, y + h / 2, sliderEnd, y + h / 2);
if (dragging) {
fill(0);
} else {
fill(0);
}
if(buttonWasClicked == true){
textSize(12);
let text_opacity = map(x, 144, 188, 255,0);
fill(random(255),text_opacity );
text("> slide to unlock", x + 9, y + 9);
}
let b = map(x, sliderStart, sliderEnd - w, 0, 255);
fill(b, 130);
rect(sliderStart, 111, sliderEnd - sliderStart, 279);
}
function mousePressed() {
if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
dragging = true;
offsetX = x - mouseX;
}
if (dist(mouseX,mouseY,201, 413)  < 29/2) {
buttonWasClicked = true;
}
let x = 145;
let y = 365;
let w = 100;
let h = 10;
let value = 0;
let sliderStart = 114;
let sliderEnd = 288;
let offsetX = 0;
let buttonWasClicked = false;
function setup() {
createCanvas(400, 500);
}
function draw() {
background(255);
strokeWeight(3);
stroke("silver");
fill("white");
rect(100, 60, 200, 380, 23);
rect(99, 110, 0, 14)
rect(99, 135, 0, 23)
rect(99, 166, 0, 23)
noStroke();
fill(0)
ellipse(204, 75, 5, 5);
ellipse(176, 87, 6, 6);
rect(189, 85, 32, 2.75, 3)
stroke("grey");
strokeWeight(2);
fill(255)
ellipse(201, 413, 29, 29);
stroke("grey");
strokeWeight(1);
fill(value);
rect(113, 110, 175, 280);
if (dragging) {
x = mouseX + offsetX;
}
x = constrain(x, sliderStart, sliderEnd - w);
noStroke();
line(sliderStart, y + h / 2, sliderEnd, y + h / 2);
if (dragging) {
fill(0);
} else {
fill(0);
}
if(buttonWasClicked == true){
textSize(12);
let text_opacity = map(x, 144, 188, 255,0);
fill(random(255),text_opacity );
text("> slide to unlock", x + 9, y + 9);
}
let b = map(x, sliderStart, sliderEnd - w, 0, 255);
fill(b, 130);
rect(sliderStart, 111, sliderEnd - sliderStart, 278);
}
function mousePressed() {
if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
dragging = true;
offsetX = x - mouseX;
}
if (dist(mouseX,mouseY,201, 413)  < 29/2) {
buttonWasClicked = true;
}
let x = 145;
let y = 365;
let w = 100;
let h = 10;
let sliderStart = 114;
let sliderEnd = 288;
let offsetX = 0;
function setup() {
createCanvas(400, 500);
}
function draw() {
background(255);
strokeWeight(3);
stroke("silver");
fill("white");
rect(100, 60, 200, 380, 23);
rect(99, 110, 0, 14)
rect(99, 135, 0, 23)
rect(99, 166, 0, 23)
stroke("grey");
strokeWeight(2);
ellipse(201, 413, 29, 29);
noStroke();
fill(0)
ellipse(204, 75, 5, 5);
ellipse(176, 87, 6, 6);
rect(189, 85, 32, 2.75, 3)
stroke("grey");
strokeWeight(1);
fill(0);
rect(113, 110, 175, 280);
if (dragging) {
x = mouseX + offsetX;
}
x = constrain(x, sliderStart, sliderEnd - w);
noStroke();
line(sliderStart, y + h / 2, sliderEnd, y + h / 2);
if (dragging) {
fill(0);
} else {
fill(0);
}
rect(x, y, w, h);
textSize(12);
fill(random(255));
text("> slide to unlock", x + 9, y + 9);
var b = map(x, sliderStart, sliderEnd - w, 0, 255);
fill(b, 130);
rect(sliderStart, 111, sliderEnd - sliderStart, 278);
}
function mousePressed() {
if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
dragging = true;
offsetX = x - mouseX;
}
let x = 145;
let y = 365;
let w = 100;
let h = 10;
let value = 0;
let sliderStart = 114;
let sliderEnd = 288;
let offsetX = 0;
let buttonWasClicked = false;
function setup() {
createCanvas(400, 500);
}
function draw() {
background(255);
strokeWeight(3);
stroke("silver");
fill("white");
rect(100, 60, 200, 380, 23);
rect(99, 110, 0, 14)
rect(99, 135, 0, 23)
rect(99, 166, 0, 23)
noStroke();
fill(0)
ellipse(204, 75, 5, 5);
ellipse(176, 87, 6, 6);
rect(189, 85, 32, 2.75, 3)
stroke("grey");
strokeWeight(2);
fill(255)
ellipse(201, 413, 29, 29);
stroke("grey");
strokeWeight(1);
fill(value);
rect(113, 110, 175, 280);
ellipse(
if (dragging) {
x = mouseX + offsetX;
}
x = constrain(x, sliderStart, sliderEnd - w);
noStroke();
line(sliderStart, y + h / 2, sliderEnd, y + h / 2);
if (dragging) {
fill(0);
} else {
fill(0);
}
if(buttonWasClicked == true){
textSize(12);
let text_opacity = map(x, 144, 188, 255, 0);
fill(random(255),text_opacity );
text("> slide to unlock", x + 9, y + 9);
}
let b = map(x, sliderStart, sliderEnd - w, 0, 255);
fill(b, 130);
rect(sliderStart, 111, sliderEnd - sliderStart, 278);
}
function mousePressed() {
if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
dragging = true;
offsetX = x - mouseX;
}
if (dist(mouseX,mouseY,201, 413)  < 29/2) {
buttonWasClicked = true;
}
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
colorMode(RGB);
noStroke();
background(frameCount%360,80,100);
from = color(218, 165, 32,100);
to = color(72, 61, 139,100);
colorMode(RGB);  
interA = lerpColor(from, to, .33);
interB = lerpColor(from, to, .66);
fill(from);
rect(50, 68, 300, 300);
fill(interA);
rect(85, 123, 230, 225);
fill(interB);
rect(120, 167, 160, 160);
fill(to);
rect(mouseX, mouseY, 110, 110);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
colorMode(RGB);
noStroke();
background(frameCount%360,80,100);
from = color(218, 165, 32);
to = color(72, 61, 139);
colorMode(RGB);  
interA = lerpColor(from, to, .33);
interB = lerpColor(from, to, .66);
fill(from);
rect(50, 68, 300, 300);
fill(interA);
rect(85, 123, 230, 225);
fill(interB);
rect(120, 167, 160, 160);
fill(to);
rect(mouseX, mouseY, 110, 110);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(255);
fill (225,255, 0)
arc (200, 200, 225, 225, PI/4, 1.75*PI, PIE);
fill (
arc (200, 200, 225, 225, radians(45), radians (-45), PIE);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(255);
fill(255,0,0);
stroke(255,0,0)
strokeWeight(2.3);
line(130, 120, 210, 120);
line(210, 120, 230, 110);
line(300, 120, 235, 120);
line(300, 120, 300, 141);
line(130, 120, 130, 146);
line(130, 120, 160, 120);
line(109, 146, 150, 146);
line(116, 154, 143, 154);
line(109, 161, 150, 161);
line(116, 168, 143, 168);
line(130, 168, 130, 195);
line(130, 195, 300, 195);
line(300, 195, 300, 168);
triangle(300, 165, 287, 149, 312, 149);
arc(292, 147, 12, 12, PI, PI+QUARTER_PI);
arc(292, 147, 12, 12, PI+QUARTER_PI, TWO_PI);
arc(307, 147, 12, 12, PI, PI+QUARTER_PI);
arc(307, 147, 12, 12, PI+QUARTER_PI, TWO_PI);
line(287, 147, 312, 147);
ellipse(235, 120, 4, 4);
ellipse(210, 120, 4, 4);
}function setup() { 
createCanvas(500, 500);
} 
function draw() { 
background(203,200,220);
noStroke();	
fill(91,81,146,130);
rect(150, 120, 130, 250);
translate(width/2, height/2);
rotate(PI/7.5);
noStroke();
rect(-43, -94, 130, 245);
rotate(PI/-4);
noStroke();
rect(-137, -183, 120, 260);
}