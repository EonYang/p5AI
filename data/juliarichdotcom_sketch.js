function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
}
function mousePressed() {
}let canvas, bgcanvas, button;
function windowResized(){
resizeCanvas(windowWidth, windowHeight);
}
function setup() {
canvas = createCanvas(windowWidth, windowHeight);
bgcanvas = color(200, 100, 100)
canvas.position(0,0);
canvas.style('z-index', '-1');
button = createButton('switch');
button.id("myButton");
button.position(windowWidth/2, height/2);
button.mousePressed(changeColor);
}
function changeColor(){
bgcanvas = color(random(255), random(255), random(255));
}
function draw() {
background(bgcanvas);
}let sliderr, sliderg, sliderb;
let valr, valg, valb;
function setup() {
createCanvas(600, 400);
sliderr = createSlider(0, 255, 0);
sliderr.position(width/2-100, height/2-20);
sliderr.style('width', '200px');
sliderg = createSlider(0, 255, 0);
sliderg.position(width/2-100, height/2);
sliderg.style('width', '200px');
sliderb = createSlider(0, 255, 0);
sliderb.position(width/2-100, height/2+20);
sliderb.style('width', '200px');
}
function draw() {
valr = sliderr.value();
valg = sliderg.value();
valb = sliderb.value();
background(valr, valg, valb);
}let bubbles = [];
function setup() {
createCanvas(400, 400);
}
function mousePressed(){
let b = new Bubble(mouseX, mouseY, 50, 2);
bubbles.push(b);
}
function draw() {
background(0);
for (let i = 0; i < bubbles.length; i++){
bubbles[i].move();
bubbles[i].show();
}
}let bubbles = [];
let i = 0;
let dinos = [];
function preload() {
for (let i = 0; i < 7; i++) {
dinos[i] = loadImage('images/' + i + '.jpg');
}
}
function setup() {
createCanvas(800, 800);
background(0);
dino = dinos[i];
i = 1;
b = new Bubble(300, 200, 20, 2, dino);
bubbles[i] = b;
bubbles[i].show();
}
function mousePressed() {
background(0);
dino = dinos[i];
b = new Bubble(300, 200, 20, 2, dino);
bubbles[i] = b;
bubbles[i].show();
i++;
i = i % 7;
}
function draw() {
let img;
var gravity = 0.1;
function preLoad(){
img = loadImage('images/0.png');
}
function setup() {
createCanvas(480, 240);
balls.push(new Ball(50,0,32));
}
function draw() {
background(255);
balls[i].update();
balls[i].display();
}
}
function mousePressed() {
balls.push(b);
}let randomImageLocation
let img = []
function preload(){
for (let i = 0; i < 5; i++) {
img[i] = i + '.png'
}
}
function setup() {
createCanvas(600, 600)
background(200, 255,255 )
randomImageLocation = img[Math.floor(Math.random() * img.length)]; 
}
function draw() {
}
function mouseClicked() {
let randomImage = loadImage(randomImageLocation)
image(randomImage,200, 200, 50, 50)
}let b = [];
function setup() {
createCanvas(displayWidth, displayHeight);
for (let i = 0; i < 1000; i++) {
let ball = new Ball(random(0, width), random(0, height), random(-1, 1), random(-1, 1), random(1, 50));
b.push(ball);
}
}
function draw() {
background(255, 255, 0);
for (let i = 0; i < b.length; i++) {
b[i].move();
b[i].display();
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
ballDisplay(width / 2, height / 2);
}
function ballDisplay(x, y) {
ellipseMode(CENTER);
ellipse(x, y, 50);
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(255);
ball(0, 0, 50);
move(1, 2);
}
function ball(x, y, size) {
fill(0);
ellipse(x, y, size, size);
}
function move(xspeed,yspeed){
if (x >= width) {
xspeed*=-1;
if (y>= height){
yspeek*=-1;
}
}
x += xspeed;
y += yspeed;
}function setup() {
createCanvas(600, 600);
}
function draw() {
background(220);
grid();
}
function grid() {
for (let i = 60; i <= width - 60; i += 60) {
stroke(0);
line(i, 0, i, height);
}
for (let j = 120; j <= height - 120; j += 120) {
stroke(0);
line(0, j, width, j);
}
}function setup() {
createCanvas(500, 400);
}
function draw() {
background(220);
text("GAME", width/2 - 20, 50);
text("OVER", width/2 - 20, 350);
face(0, 400);
face(100, 400);
face(200, 400);
face(300, 400);
face(400, 400);
face(600, 400);
face(700, 400);
face(800, 400);
face(900, 400);
face(1000, 400);
face(500, 400);
}
function face(i, j) {
let x = width;
let y = height;
ellipseMode(CENTER);
strokeWeight(1);
stroke(0);
fill(66, 191, 244);
ellipse(i / 2, j / 2, x / 3, x / 3);
noStroke();
fill(255);
ellipse((i / 3) + (i / 36), (j / 2) - (j / 10), x / 15, x / 50);
ellipse(((i / 3) + (i / 36) + (i / 10)), (j / 2) - (j / 10), x / 15, x / 50);
fill(0);
ellipse((i / 3) + (i / 36), (j / 2) - (j / 10), x / 60, x / 60);
ellipse(((i / 3) + (i / 36) + (i / 10)), (j / 2) - (j / 10), x / 60, x / 60);
stroke(0, 119, 255);
noFill();
strokeWeight(5);
stroke(255, 0, 135);
fill(0);
ellipse(((i / 3) + (i / 36) + (i / 30)), ((j / 2) + (j / 7)), width / 10, (width / 30) - (width / 80));
angleMode(DEGREES);
noFill();
stroke(0, 119, 255);
strokeWeight(1);
arc((i / 2) - (i / 10), (j / 2) - (j / 100), x / 40, (x / 40) + (x / 50), 0, -120);
}let dw = 600;
let dh = 600;
let l = 10;
let c = 255;
let randomArray = [];
let color;
let x1;
let x2;
let y1;
let y2;
let p = 1;
function setup() {
createCanvas(dw, dh);
let idx = 0;
for (let w = 0; w < dw; w += l) {
for (let h = 0; h < dh; h += l) {
randomArray[idx] = random(1);
idx++;
}
}
}
function draw() {
color = {
r: map(mouseX, 0, dw, 0, 255),
g: 0,
b: map(mouseY, 0, dh, 0, 255),
}
background(0);
let idx = 0;
for (let w = 0; w < dw; w += l) {
for (let h = 0; h < dh; h += l) {
if (randomArray[idx] < 0.5) {
x1 = w;
x2 = w + 5;
y1 = h;
y2 = h + 3;
stroke(color.r, color.g, color.b);
line(x1, y1, x2, y2)
x1 = w + 5;
x2 = w + l;
y1 = h + 3;
y2 = h + l;
stroke(color.r, color.g, color.b);
line(x1, y1, x2, y2)
p = p * -1;
} else {
x1 = w + l;
x2 = w;
y1 = h;
y2 = h + l;
stroke(color.r, color.g, color.b);
line(x1, y1, x2, y2)
p = p * -1;
}
idx++;
}
}
}let dw;
let dh;
let l = 20;
let c = 255;
let randomArray = [];
let color;
let x1;
let x2;
let y1;
let y2;
let p = 1;
function setup() {
noCursor();
dw = displayWidth;
dh = displayHeight;
createCanvas(dw, dh);
let idx = 0;
for (let w = 0; w < dw; w += l) {
for (let h = 0; h < dh; h += l) {
randomArray[idx] = random(1);
idx++;
}
}
}
function draw() {
color = {
r: 0,
g: map(mouseX, 0, dw, 50, 150),
b: map(mouseY, 0, dh, 50, 200),
}
background(0);
let idx = 0;
for (let w = 0; w < dw; w += l) {
for (let h = 0; h < dh; h += l) {
if (randomArray[idx] < 0.5) {
x1 = w;
x2 = w + 3;
y1 = h;
y2 = h + 10;
stroke(color.r, color.g, color.b);
line(x1, y1, x2, y2)
p = p * -1;
x1 = w + 3;
x2 = w + l;
y1 = h + 10;
y2 = h + l;
stroke(color.r, color.g, color.b);
line(x1, y1, x2, y2)
p = p * -1;
} else {
x1 = w + l;
x2 = w + 12;
y1 = h;
y2 = h + 12;
stroke(color.r, color.g, color.b);
line(x1, y1, x2, y2)
x1 = w + 12;
x2 = w;
y1 = h + 12;
y2 = h + l;
stroke(color.r, color.g, color.b);
line(x1, y1, x2, y2)
p = p * -1;
}
idx++;
}
}
noStroke();
fill(255, 5);
ellipse(mouseX, mouseY, 200, 200);
}let dw = 600;
let dh = 600;
let l = 10;
let c = 255;
let randomArray = [];
let color;
let x1;
let x2;
let y1;
let y2;
let p = 1;
function setup() {
createCanvas(dw, dh);
color = {
r: map(mouseX, 0, dw, 0, 255),
g: 0,
}
background(0);
for (let w = 0; w < dw; w += l) {
for (let h = 0; h < dh; h += l) {
let idx = 0;
randomArray[idx] = random(1);
idx++;
}
}
}
function draw() {
stroke(color.r, color.g, color.b);
line(x1, y1, x2, y2)
} else {
stroke(color.r, color.g, color.b);
line(x1, y1, x2, y2)
p = p*-1;
for (let w = 0; w < dw; w += l) {
for (let h = 0; h < dh; h += l) {
let idx = 0;
if (randomArray[idx] < 0.5) {
x1 = w;
x2 = w + l;
y1 = h;
y2 = h + l;
stroke(color.r, color.g, color.b);
line(x1, y1, x2, y2)
p = p*-1;
} else {
x1 = w + l;
x2 = w;
y1 = h;
y2 = h + l;
stroke(color.r, color.g, color.b);
line(x1, y1, x2, y2)
p = p*-1;
}
idx++;
}
}
}let dw = 400;
let dh = 400;
let l = 10;
let c = 255;
let x1;
let x2;
let y1;
let y2;
function setup() {
createCanvas(dw, dh);
}
function draw() {
background(0);
for (let w = 0; w < dw; w += l) {
for (let h = 0; h < dh; h += l) {
if ((mouseX) < 20 && (mouseX) > -20 &&
(mouseY) < 20 && (mouseY) > -20) {
push();
angleMode(DEGREES);
translate(mouseX, mouseY);
stroke(255, 0, 0);
rotate(45);
for (let i = 0; i < 40; i += l) {
for (let j = 0; j < 40; j += l) {
line(i, j, i + l, j + l);
}
}
pop();
}
else if ((w - mouseX) < 60 && (w - mouseX) >= 20 &&
(h - mouseY) < 60 && (h - mouseY) >= 20) {
push();
angleMode(DEGREES);
translate(mouseX, mouseY);
stroke(255, 0, 0);
rotate(90);
for (let i = 0; i < 40; i += l) {
for (let j = 0; j < 40; j += l) {
line(i, j, i + l, j + l);
}
}
pop();
}
else if ((w - mouseX) < 80 && (w - mouseX) >= 40 &&
(h - mouseY) < 80 && (h - mouseY) >= 40) {
push();
angleMode(DEGREES);
translate(mouseX, mouseY);
stroke(255, 0, 0);
rotate(135);
for (let i = 0; i < 40; i += l) {
for (let j = 0; j < 40; j += l) {
line(i, j, i + l, j + l);
}
}
pop();
}
else {
x1 = w;
x2 = w + l;
y1 = h;
y2 = h + l;
stroke(c);
line(x1, y1, x2, y2)
}
}
}
}let dw = 600;
let dh = 600;
let l = 10;
let c = 255;
let randomArray = [];
let color;
let x1;
let x2;
let y1;
let y2;
let p = 1;
function setup() {
createCanvas(dw, dh);
color = {
r: map(mouseX, 0, dw, 0, 255),
g: 0,
}
background(0);
for (let w = 0; w < dw; w += l) {
for (let h = 0; h < dh; h += l) {
if (random(1) > 0.5) {
x1 = w;
x2 = w + l;
y1 = h;
y2 = h + l;
stroke(color.r, color.g, color.b);
line(x1, y1, x2, y2)
p = p*-1;
} else {
x1 = w + l;
x2 = w;
y1 = h;
y2 = h + l;
stroke(color.r, color.g, color.b);
line(x1, y1, x2, y2)
p = p*-1;
}
}
}
}
function draw() {
stroke(color.r, color.g, color.b);
line(x1, y1, x2, y2)
} else {
stroke(color.r, color.g, color.b);
line(x1, y1, x2, y2)
p = p*-1;
}let hair = {
r: 0,
g: 255,
b: 0,
};
let bgnd
let smile = 400;
let rectx = 400;
let lengthrect = 600;
let length = 600;
function setup() {
createCanvas(800, 1000);
bgnd = {
r: random(0, 100),
g: random(100, 255),
b: random(100, 150),
}
}
function draw() {
background(bgnd.r, bgnd.g, bgnd.b);
angleMode(DEGREES);
stroke(255);
fill(hair.r, hair.g, hair.b);
arc(0, 0, 600, length, 180, 0, CHORD);
if (mouseY >= 600 && mouseY < 900 && mouseX >= 620 && mouseX <= 635 && mouseIsPressed) {
length = map(mouseY, 0, 800, 600, 900);
lengthrect = mouseY;
} else {
if (length > 600 && length < 900) {
length = length - 1;
lengthrect = length;
}
}
stroke(255);
strokeWeight(3);
fill(186, 140, 255);
textSize(20);
text('tap to change hair color!', 225, 600);
text('length of hair', 565, 570);
stroke(255)
strokeWeight(2);
fill(186, 140, 255);
line(627, 600, 627, 900);
rectMode(CENTER);
rect(627, lengthrect, 20, 20)
ellipseMode(CENTER);
fill(70, 300, 220);
strokeWeight(5);
stroke(255);
ellipse(300, 300, 500, 500);
ellipseMode(CORNER);
strokeWeight(40);
stroke(255);
fill(0);
ellipse(350, 180, 50, 50);
ellipseMode(CORNER);
strokeWeight(40);
stroke(255);
fill(0);
ellipse(200, 180, 50, 50);
if (mouseY >= 400 && mouseY < 500 && mouseX >= 620 && mouseX <= 635 && mouseIsPressed) {
smile = map(mouseY, 0, 800, 450, 500);
rectx = mouseY;
} else {
if (smile > 400 && smile < 500) {
smile = smile - 1;
rectx = smile;
}
}
strokeWeight(5);
noFill();
stroke(255, 0, 0, 150);
bezier(200, 450, 400, smile, 400, 450, 400, smile,);
strokeWeight(20)
fill(0);
stroke(255)
strokeWeight(2);
fill(186, 140, 255);
line(627, 400, 627, 500);
rectMode(CENTER);
rect(627, rectx, 20, 20)
stroke(255);
strokeWeight(3);
fill(186, 140, 255);
textSize(20);
text('smile!', 600, 385);
noStroke();
fill(0, 255, 0);
triangle(300, 230, 250, 350, 350, 350)
}
function mousePressed() {
hair.r = random(0, 200)
hair.g = random(100, 255);
hair.b = random(30, 200);
}function setup() {
createCanvas(650, 450);
background(44, 255, 243);
stroke(252, 13, 27);
strokeWeight(40);
line(0, 0, 650, 450);
noStroke();
fill(30, 198, 34);
ellipse(325, 235, 300, 225);
fill(2, 12, 126);
rect(435, 200, 40, 40);
}
function draw() {
}function setup() {
createCanvas(400, 400);
background(255);
noStroke();
fill(0, 255, 242);
ellipse(200,200,400,400);
}
function draw() {
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
}
function setup() {
createCanvas(600, 600);
createP('hi my name is julia rich, last night I dreampt that I had to eat a thousand peaches');
}
function draw() {
var y = mouseY;
background(180,200,255); 
fill(70,300,220);
strokeWeight(5);
stroke(255);
ellipse(300, 300,500, 500);
if (mouseIsPressed) {
ellipseMode(CORNER);
noStroke();
fill(70,300,220);
ellipse(350,180,50,50);
ellipseMode(CORNER);
noStroke();
fill(70,300,220);
ellipse(200,180,50,50);
} else {
ellipseMode(CORNER);
strokeWeight(40);
stroke(255);
fill(0);
ellipse(350,180,50,50);
ellipseMode(CORNER);
strokeWeight(40);
stroke(255);
fill(0);
ellipse(200,180,50,50);
}
ellipseMode(CENTER);
strokeWeight(20);
stroke(255,0,0);
fill(0);
ellipse(300,450,150,50);
arc(300, 400, 150, 150, 0, PI, CHORD);
noStroke();
fill(0,255,0);
triangle(300, 230, 250, 350, 350, 350)
ellipseMode(CENTER);
strokeWeight(20);
stroke(255,0,0);
fill(0);
ellipse(300,450,150,50);
}