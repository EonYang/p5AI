let sand;
let points;
let word = "SAND";
let x = 40;
let y = 200;
let size = 100;
function preload() {
sand = loadFont('AvenirNextLTPro-Demi.otf');
}
function setup() {
createCanvas(displayWidth, displayHeight);
points = sand.textToPoints(word, x, y, size);
noStroke();
fill(0);
}
function draw() {
background(224, 208, 158);
textFont(sand);
textSize(size);
fill(224, 208, 158);
text(word, x, y);
for (let i = 0; i < points.length; i++) {
fill(174, 158, 108);
let pt = points[i];
ellipse(pt.x, pt.y, 3);
if (accelerationX > 3) {
let nx = noise(i * accelerationX * 0.8 + frameCount * 0.01) * 10 - 5.0;
let ny = noise(i * 500 + frameCount * 0.1) * accelerationY * 0.15;
pt.x -= noise(i * 10.1 + frameCount * 0.01) * 2 - 1.0;
pt.y -= noise(i * 10.1 + frameCount * 0.01) * 2 - 1.0;
ellipse(pt.x - nx, pt.y + ny, 3)
}
}
}let sand;
let points;
let word = "SAND";
let x = 100;
let y = 450;
let size = 220;
let mic;
function preload(){
sand = loadFont('AvenirNextLTPro-Demi.otf');
}
function setup() {
createCanvas(800, 800);
points = sand.textToPoints(word, x, y, size);
noStroke();
fill(0);
mic = new p5.AudioIn();
mic.start();
}
function draw() {
background(224,208,158);
let micLevel=mic.getLevel();
console.log(micLevel);
textFont(sand);
textSize(size);
fill(224,208,158);
text(word, x, y);
for(let i = 0; i < points.length; i++){
let c = noise(i + micLevel*50 ) * 255;
fill(174, 158, 108);
let pt = points[i];
ellipse(pt.x, pt.y, 3);
if (micLevel>0.15){
let nx = noise(i * mic.getLevel()*100 + frameCount * 0.01) * 10 - 5.0;
let ny = noise(i * 500 + frameCount * 0.1) * mic.getLevel()*100;
pt.x += noise(i * 10.1 + frameCount * 0.01) * 2 - 1.0;
pt.y -= noise(i * 10.1 + frameCount * 0.01) * 2 - 1.0;
ellipse(pt.x+nx, pt.y, 3-micLevel*10)
}
}
let font;
let fontData;
let mic;
function drawPathOutline(cmds) {
let cx = 0;
let cy = 0;
let startX = 0;
let startY = 0;
for (let cmd of cmds) {
switch (cmd.type) {
case 'M':
startX = cmd.x;
startY = cmd.y;
cx = cmd.x;
cy = cmd.y;
break;
case 'L':
ellipse (cx, cy, 1) 
line(cx, cy, cmd.x, cmd.y);
cx = cmd.x;
cy = cmd.y;
break;
case 'C':
ellipse (cx, cy, 1) 
cx = cmd.x;
cy = cmd.y;
break;
case 'Q':
ellipse (cx+ mic.getLevel() * 550, cy, 1- mic.getLevel() * 50) 
beginShape();
vertex(cx, cy);
quadraticVertex(cmd.x1, cmd.y1, cmd.x, cmd.y);
endShape();
cx = cmd.x;
cy = cmd.y;
break;
case 'Z':
ellipse (cx, cy, 1) 
break;
}
}
}
function preload() {
fontData = loadBytes('Roboto-Black.ttf');
}
let path;
function setup() {
createCanvas(windowWidth, windowHeight);
font = opentype.parse(fontData.bytes.buffer);
path = font.getPath("SAND", 0, 0, 72);
mic = new p5.AudioIn();
mic.start();
}
function draw() {
background(255);
push();
fill(246);
stroke(246);
strokeWeight(2 - mic.getLevel() * 6000);
scale(1-mic.getLevel() );
translate(50 + mic.getLevel() * 100, 225 + mic.getLevel() * 50);
pop();
let font;
let fontData;
let mic;
function drawPathOutline(cmds) {
let cx = 0;
let cy = 0;
let startX = 0;
let startY = 0;
for (let cmd of cmds) {
switch (cmd.type) {
case 'M':
startX = cmd.x;
startY = cmd.y;
cx = cmd.x;
cy = cmd.y;
break;
case 'L':
line(cx, cy, cmd.x, cmd.y);
cx = cmd.x + mic.getLevel() * 150;
cy = cmd.y;
break;
case 'C':
bezier(cx, cy, cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
cx = cmd.x;
cy = cmd.y + mic.getLevel() * 150;
break;
case 'Q':
beginShape();
vertex(cx, cy);
quadraticVertex(cmd.x1, cmd.y1, cmd.x, cmd.y);
endShape();
cx = cmd.x;
cy = cmd.y;
break;
case 'Z':
line(cx, cy, startX, startY);
break;
}
}
}
function preload() {
fontData = loadBytes('Roboto-Black.ttf');
}
let path;
function setup() {
createCanvas(windowWidth, windowHeight);
font = opentype.parse(fontData.bytes.buffer);
path = font.getPath("STARTLE", 0, 0, 72);
mic = new p5.AudioIn();
mic.start();
}
function draw() {
background(255);
push();
noFill();
stroke(0);
strokeWeight(2 + mic.getLevel() * 10);
translate(50 + mic.getLevel() * 100, 225 + mic.getLevel() * 50);
pop();
}let mic;
function setup() {
createCanvas(250, 250);
mic = new p5.AudioIn();
mic.start();
}
function draw() {
background(220);
textAlign(CENTER, CENTER);
textSize(10 + mic.getLevel() * 1000);
text("word", width/2, height/2);
let font;
let fontData;
function preload() {
fontData = loadBytes('Roboto-Black.ttf');
}
let path;
let video;
function setup() {
createCanvas(400, 400);
font = opentype.parse(fontData.bytes.buffer);
path = font.getPath("REFLECT", 0, 0, 72);
video = createCapture(VIDEO);
}
function drawPathOutline(cmds) {
let cx = 0;
cy = 0;
for (let cmd of cmds) {
switch (cmd.type) {
case 'M':
image(video, cx, cy, cmd.x, cmd.y);
cx = cmd.x;
cy = cmd.y;
break;
case 'L':
image(video, cx, cy, 30, 10);
cx = cmd.x;
cy = cmd.y;
break;
case 'C':
image(video, cx, cy, 50, 50);
cx = cmd.x;
cy = cmd.y;
break;
case 'Q':
image(video, cx, cy, 5, 10);
cx = cmd.x;
cy = cmd.y;
break;
case 'Z':
image(video, cx, cy, 10, 10);
cx = cmd.x;
cy = cmd.y;
break;
}
}
}
function draw() {
background(255);
push();
translate(50, 125);
pop();
push();
noFill();
stroke(0);
strokeWeight(2);
translate(50, 225);
pop();
let font;
let fontData;
function drawPathOutline(cmds) {
let cx = 0; cy = 0;
for (let cmd of cmds) {
switch (cmd.type) {
case 'M':
cx = cmd.x;
cy = cmd.y;
break;
case 'L':
let radius = max(abs(cmd.x - cx), abs(cmd.y - cy));
ellipse((cx + cmd.x) / 2, (cy + cmd.y) / 2, radius);
cx = cmd.x;
cy = cmd.y;
break;
case 'C':
quad(cx, cy, cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.y, cmd.y);
cx = cmd.x;
cy = cmd.y;
break;
case 'Q':
line(cx, cy, cmd.x, cmd.y);
endShape();
cx = cmd.x;
cy = cmd.y;
break;
case 'Z':
break;
}
}
}
function preload() {
fontData = loadBytes('Roboto-Black.ttf');
}
let path;
function setup() {
createCanvas(400, 400);
font = opentype.parse(fontData.bytes.buffer);
path = font.getPath("Comptypo", 0, 0, 72);
}
function draw() {
background(255);
push();
translate(50, 125);
pop();
push();
noFill();
stroke(0);
strokeWeight(2);
translate(50, 225);
pop();
function setup() {
noCanvas();
select("body").style("perspective", "50px");
select("body").style("perspective-origin", "70%");
let gridSize = 40;
let spacing = windowWidth / gridSize;
for (let i = 0; i < 40; i++) {
for (let j = 0; j < 30; j++) {
let ch = 'o';
let ch2 = 'v';
let ch3 = 'i';
let ch4 = 'd';
let div = createDiv(ch);
let div2 = createDiv(ch2);
let div3 = createDiv(ch3);
let div4 = createDiv(ch4);
let zaxis = j * 5 * -1;
let zaxis2 = j * 6 * 1;
let zaxis3 = j * 6 * 1;
let zaxis4 = j * 6 * 1;
div.position(
(i % gridSize) * spacing,
int(i / gridSize) * spacing);
div.style("transform", "translateZ(" + zaxis + "px)");
div.style("font-family", "sans-serif");
div.style("font-size", "24px");
div2.position(
(i / gridSize) * spacing,
int(i % gridSize) * spacing);
div2.style("transform", "translateZ(" + zaxis + "px)");
div2.style("font-family", "sans-serif");
div2.style("font-size", "24px");
div2.style("perspective-origin", "bottom");
div3.position(
(gridSize) * spacing,
int(i % gridSize) * spacing);
div3.style("transform", "translateZ(" + zaxis + "px)");
div3.style("font-family", "sans-serif");
div3.style("font-size", "24px");
div3.style("perspective-origin", "bottom");
div4.position(
(i % gridSize) * spacing,
gridSize * spacing);
div4.style("transform", "translateZ(" + zaxis + "px)");
div4.style("font-family", "sans-serif");
div4.style("font-size", "24px");
div4.style("perspective-origin", "bottom");
}
}
}
function draw() {
background(220);
function setup() {
createCanvas(600,600);
select("body").style("perspective", "500px");
select("body").style("perspective-origin",
"center");
let gridSize =50;
let spacing = width/ gridSize;
for (let i = 0; i <100; i++) {
for (let j = 0; j < 10; j++) {
let ch = 'a';
let div = createDiv(ch);
let zaxis = j * 550 * -1;
div.position(
(i*spacing,
i*spacing));
div.style("transform", "translateZ("+zaxis+"px)");
div.style("font-family", "sans-serif");
div.style("font-size", "24px");
}
}
}
function draw() {
background(220);
function drawLetter() {
let pts = [];
for (let i = 0; i < int(random(0, 90)); i++) {
pts.push([int(random(0, 10) * 12), int(random(-7, random(0, 10))) * 40]);
}
beginShape();
for (let i = 0; i < pts.length; i++) {
curveVertex(pts[i][0], pts[i][1]);
}
endShape();
}
function stampLetter() {
stroke(255, 0, 0)
strokeWeight(3);
fill(255, 0, 0);
ellipse(560, 551, 30, 50)
beginShape();
stroke(255)
strokeWeight(2);
push()
translate(10, 0);
curveVertex(random(538, 558), random(540, 568));
curveVertex(random(538, 555), random(538, 560));
curveVertex(random(538, 560), random(540, 551));
curveVertex(random(540, 558), random(540, 550));
curveVertex(random(538, 558), random(540, 568));
curveVertex(random(538, 555), random(538, 560));
curveVertex(random(538, 560), random(540, 551));
curveVertex(random(540, 558), random(540, 550));
curveVertex(random(538, 558), random(540, 568));
curveVertex(random(538, 555), random(538, 560));
curveVertex(random(538, 560), random(540, 551));
curveVertex(random(540, 558), random(540, 550));
endShape();
pop();
}
function setup() {
createCanvas(600, 600);
}
function draw() {
background(220);
stampLetter();
push();
translate(width / 20, height / 20);
for (let i = 0; i < 10; i++) {
for (let j = 0; j < 10; j++) {
push();
translate(i * (width / 12), j * (height / 10));
scale(0.2);
strokeWeight(6);
stroke(0);
noFill();
drawLetter();
pop();
noLoop();
}
}
pop();
}
function mousePressed() {
draw();
}let ghostCol = 3;
function setup() {
noCanvas();
frameRate(40);
}
function draw() {
if (frameCount % 2 == 0) {
term.write(ansi.cursor.position(term.rows -2, ghostCol));
term.write(".......This is a message from GHOST");
ghostCol++;
}
else {
term.write(ansi.cursor.position(term.rows-2, ghostCol));
term.write(".......This is a message from GHOST \b\b");
ghostCol--;
}
}let img1;
let portName = '/dev/cu.usbmodem1411';
let p;
let b;
let sound1;
let sound2;
let showAnswer;
let startedShowing;
function setup() {
createCanvas(1920, 1280);
sound1 = loadSound('WrongBuzzer.mp3');
sound2 = loadSound('CorrectDingDing.mp3');
}
function preload() {
img1 = loadImage('Monkey.png');
img2 = loadImage('Brain.png');
img3 = loadImage('leaf.png');
img4 = loadImage('fruit.png');
img5 = loadImage('animal.png');
img6 = loadImage('insects.png');
img7 = loadImage('Wrong.jpg');
img8 = loadImage('CorrectSign.jpg');
}
for (var i = 0; i < portList.length; i++) {
}
}
function serverConnected() {
}
function portOpen() {
}
}
function portClose() {
}
console.log(inString);
if (inString.length > 0) {
console.log('hi');
p = ceil(map(sensors[1], 1023, 2, 35, 5));
b = map(sensors[0], 1, 0, 1, 0);
}
}
}
}
function draw() {
background(120, 200, 90);
image(img1, 200, 280);
fill(0, 120, 0);
rect(0, 0, 1920, 220);
fill(255);
ellipse(320, 150, 60);
textSize(60);
textStyle(BOLD);
text('Which brain requires the most energy to power?', 280, 100);
textSize(30);
text('Turn the Knob to Compare the Brains', 370, 160);
fill(255);
ellipse(1010, 150, 60);
text('Press the Button to Submit Your Answer', 1055, 160);
fill(0, 120, 0);
textSize(30);
text('1', 312, 160);
fill(0, 120, 0);
textSize(30);
text('2', 1003, 160);
push();
translate(-250, 10);
scale(1.2);
fill(0, 120, 0);
textSize(48);
text('Brain', 1150, 260);
text('-------', 1150, 290);
text('Body', 1150, 330);
text('-------', 1360, 290);
text('100g', 1360, 330);
text('=', 1300, 300);
fill(255, 200, 180)
textStyle(BOLD);
text(p + 'g', 1360, 260);
pop();
textSize(90);
fill(90, 200, 50);
rect(1120, 460, 500, 150, 20);
fill(80, 150, 0);
text('Folivore', 1150, 550);
textSize(30);
textStyle(NORMAL);
text('Leaf-eating animals', 1155, 590);
textSize(90);
fill(90, 200, 50);
rect(1120, 620, 500, 150, 20);
fill(80, 150, 0);
textStyle(BOLD);
text('Fruigivore', 1150, 710);
textSize(30);
textStyle(NORMAL);
text('Fruit-eating animals', 1155, 750);
textSize(90);
fill(90, 200, 50);
rect(1120, 780, 500, 150, 20);
fill(80, 150, 0);
textStyle(BOLD);
text('Omnivore', 1150, 870);
textSize(30);
textStyle(NORMAL);
text('Protein-eating animals', 1155, 910);
fill(255, 200, 200);
noStroke();
ellipse(850, 340, 5 + 1.6 * p);
ellipse(870, 340, 50);
ellipse(870, 355, 40);
ellipse(860, 355, 40 + p);
ellipse(880, 355, 40 + p);
ellipse(860, 325, 40 + p);
ellipse(880, 325, 40 + p);
ellipse(890, 340, 20 + 1.6 * p);
textStyle(BOLD);
fill(0, 120, 0);
textSize(90);
if (p < 15 && p >= 5) {
image(img3, 1650, 500);
textSize(90);
console.log("YOO PINK");
fill(255, 200, 200);
rect(1120, 460, 500, 150, 20);
fill(80, 150, 0);
text('Folivore', 1150, 550);
textSize(30);
textStyle(NORMAL);
text('Leaf-eating animals', 1155, 590);
if (b == 1) {
text('', 1250, 780);
} else if (b == 0) {
image(img7, 0, 0, 1920, 1080);
sound1.play();
}
}
if (p < 25 && p >= 15) {
textStyle(BOLD);
textSize(90);
console.log("YOO PINK 2");
fill(255, 200, 200);
rect(1120, 620, 500, 150, 20);
fill(80, 150, 0);
textStyle(BOLD);
text('Fruigivore', 1150, 710);
textSize(30);
textStyle(NORMAL);
text('Fruit-eating animals', 1155, 750);
image(img3, 1650, 670);
image(img4, 1750, 670);
if (b == 1) {
text('', 1250, 780);
} else if (b == 0) {
image(img7, 0, 0, 1920, 1080);
sound1.play();
}
}
else if (p <= 35 && p >= 25) {
textStyle(BOLD);
textSize(90);
fill(255, 200, 200);
rect(1120, 780, 500, 150, 20);
fill(80, 150, 0);
textStyle(BOLD);
text('Omnivore', 1150, 870);
textSize(30);
textStyle(NORMAL);
text('Protein-eating animals', 1155, 910);
image(img3, 1650, 780);
image(img4, 1750, 780);
image(img5, 1650, 860);
image(img6, 1750, 860);
if (b == 1) {
text('', 1250, 780);
} else if (b == 0) {
image(img8, 0, 0, 1920, 1080);
sound2.play();
}
}
}
function sound() {
if (mouseX >= width / 2 && mouseX <= 3 * width / 2 && mouseY >= height / 2 && mouseY <= height) {
if (!song.isPlaying()) {
song.play();
}
} else {
song.stop();
}
}let img1;
let portName = '/dev/cu.usbmodemFA121';
let p;
let b;
let sound1;
let sound2;
let showAnswer;
let startedShowing;
function setup() {
createCanvas(1920, 1080);
sound1 = loadSound('WrongBuzzer.mp3');
sound2 = loadSound('CorrectDingDing.mp3');
}
function preload() {
img1 = loadImage('Monkey.png');
img2 = loadImage('Brain.png');
img3 = loadImage('leaf.png');
img4 = loadImage('fruit.png');
img5 = loadImage('animal.png');
img6 = loadImage('insects.png');
img7 = loadImage('Wrong.jpg');
img8 = loadImage('CorrectSign.jpg');
}
for (var i = 0; i < portList.length; i++) {
}
}
function serverConnected() {
}
function portOpen() {
}
}
function portClose() {
}
console.log(inString);
if (inString.length > 0) {
console.log('hi');
p = ceil(map(sensors[1], 1023, 2, 35, 5));
b = map(sensors[0], 1, 0, 1, 0);
}
}
}
}
function draw() {
background(120, 200, 90);
image(img1, 200, 280);
fill(0, 120, 0);
rect(0, 0, 1920, 220);
fill(255);
ellipse(320, 150, 60);
textSize(60);
textStyle(BOLD);
text('Which brain requires the most energy to power?', 280, 100);
textSize(30);
text('Turn the Knob to Compare the Brains', 370, 160);
fill(255);
ellipse(1010, 150, 60);
text('Press the Button to Submit Your Answer', 1055, 160);
fill(0, 120, 0);
textSize(30);
text('1', 312, 160);
fill(0, 120, 0);
textSize(30);
text('2', 1003, 160);
push();
translate(-250, 10);
scale(1.2);
fill(0, 120, 0);
textSize(48);
text('Brain', 1150, 260);
text('-------', 1150, 290);
text('Body', 1150, 330);
text('-------', 1360, 290);
text('100g', 1360, 330);
text('=', 1300, 300);
fill(255, 200, 180)
textStyle(BOLD);
text(p + 'g', 1360, 260);
pop();
textSize(90);
fill(90, 200, 50);
rect(1120, 460, 500, 150, 20);
fill(80, 150, 0);
text('Folivore', 1150, 550);
textSize(30);
textStyle(NORMAL);
text('Leaf-eating animals', 1155, 590);
textSize(90);
fill(90, 200, 50);
rect(1120, 620, 500, 150, 20);
fill(80, 150, 0);
textStyle(BOLD);
text('Fruigivore', 1150, 710);
textSize(30);
textStyle(NORMAL);
text('Fruit-eating animals', 1155, 750);
textSize(90);
fill(90, 200, 50);
rect(1120, 780, 500, 150, 20);
fill(80, 150, 0);
textStyle(BOLD);
text('Omnivore', 1150, 870);
textSize(30);
textStyle(NORMAL);
text('Protein-eating animals', 1155, 910);
fill(255, 200, 200);
noStroke();
ellipse(850, 340, 5 + 1.6 * p);
ellipse(870, 340, 50);
ellipse(870, 355, 40);
ellipse(860, 355, 40 + p);
ellipse(880, 355, 40 + p);
ellipse(860, 325, 40 + p);
ellipse(880, 325, 40 + p);
ellipse(890, 340, 20 + 1.6 * p);
textStyle(BOLD);
fill(0, 120, 0);
textSize(90);
if (p < 15 && p >= 5) {
image(img3, 1650, 500);
textSize(90);
console.log("YOO PINK");
fill(255, 200, 200);
rect(1120, 460, 500, 150, 20);
fill(80, 150, 0);
text('Folivore', 1150, 550);
textSize(30);
textStyle(NORMAL);
text('Leaf-eating animals', 1155, 590);
if (b == 0) {
text('', 1250, 780);
} else if (b == 1) {
image(img7, 0, 0, 1920, 1080);
sound1.play();
}
}
if (p < 25 && p >= 15) {
textStyle(BOLD);
textSize(90);
console.log("YOO PINK 2");
fill(255, 200, 200);
rect(1120, 620, 500, 150, 20);
fill(80, 150, 0);
textStyle(BOLD);
text('Fruigivore', 1150, 710);
textSize(30);
textStyle(NORMAL);
text('Fruit-eating animals', 1155, 750);
image(img3, 1650, 670);
image(img4, 1750, 670);
if (b == 0) {
text('', 1250, 780);
} else if (b == 1) {
image(img7, 0, 0, 1920, 1080);
sound1.play();
}
}
else if (p <= 35 && p >= 25) {
textStyle(BOLD);
textSize(90);
fill(255, 200, 200);
rect(1120, 780, 500, 150, 20);
fill(80, 150, 0);
textStyle(BOLD);
text('Omnivore', 1150, 870);
textSize(30);
textStyle(NORMAL);
text('Protein-eating animals', 1155, 910);
image(img3, 1650, 780);
image(img4, 1750, 780);
image(img5, 1650, 860);
image(img6, 1750, 860);
if (b == 0) {
text('', 1250, 780);
} else if (b == 1) {
image(img8, 0, 0, 1920, 1080);
sound2.play();
}
}
}
function sound() {
if (mouseX >= width / 2 && mouseX <= 3 * width / 2 && mouseY >= height / 2 && mouseY <= height) {
if (!song.isPlaying()) {
song.play();
}
} else {
song.stop();
}
}let img1;
let portName = '/dev/cu.usbmodemFA121';
let p;
let b;
let sound1;
let sound2;
let showAnswer;
let startedShowing;
function setup() {
createCanvas(1920, 1080);
sound1 = loadSound('WrongBuzzer.mp3');
sound2 = loadSound('CorrectDingDing.mp3');
}
function preload() {
img1 = loadImage('Monkey.png');
img2 = loadImage('Brain.png');
img3 = loadImage('leaf.png');
img4 = loadImage('fruit.png');
img5 = loadImage('animal.png');
img6 = loadImage('insects.png');
img7 = loadImage('Wrong.jpg');
img8 = loadImage('CorrectSign.jpg');
}
for (var i = 0; i < portList.length; i++) {
}
}
function serverConnected() {
}
function portOpen() {
}
}
function portClose() {
}
console.log(inString);
if (inString.length > 0) {
console.log('hi');
p = ceil(map(sensors[1], 1023, 2, 35, 5));
b = map(sensors[0], 1, 0, 1, 0);
}
}
}
}
function draw() {
background(120, 200, 90);
image(img1, 200, 280);
fill(0, 120, 0);
rect(0, 0, 1920, 220);
fill(255);
ellipse(320, 150, 60);
textSize(60);
textStyle(BOLD);
text('Which brain requires the most energy to power?', 280, 100);
textSize(30);
text('Turn the Knob to Compare the Brains', 370, 160);
fill(255);
ellipse(1010, 150, 60);
text('Press the Button to Submit Your Answer', 1055, 160);
fill(0, 120, 0);
textSize(30);
text('1', 312, 160);
fill(0, 120, 0);
textSize(30);
text('2', 1003, 160);
push();
translate(-250, 10);
scale(1.2);
fill(0, 120, 0);
textSize(48);
text('Brain', 1150, 260);
text('-------', 1150, 290);
text('Body', 1150, 330);
text('-------', 1360, 290);
text('100g', 1360, 330);
text('=', 1300, 300);
fill(255, 200, 180)
textStyle(BOLD);
text(p + 'g', 1360, 260);
pop();
textSize(90);
fill(90, 200, 50);
rect(1120, 460, 500, 150, 20);
fill(80, 150, 0);
text('Folivore', 1150, 550);
textSize(30);
textStyle(NORMAL);
text('Leaf-eating animals', 1155, 590);
textSize(90);
fill(90, 200, 50);
rect(1120, 620, 500, 150, 20);
fill(80, 150, 0);
textStyle(BOLD);
text('Fruigivore', 1150, 710);
textSize(30);
textStyle(NORMAL);
text('Fruit-eating animals', 1155, 750);
textSize(90);
fill(90, 200, 50);
rect(1120, 780, 500, 150, 20);
fill(80, 150, 0);
textStyle(BOLD);
text('Omnivore', 1150, 870);
textSize(30);
textStyle(NORMAL);
text('Protein-eating animals', 1155, 910);
fill(255, 200, 200);
noStroke();
ellipse(850, 340, 5 + 1.6 * p);
ellipse(870, 340, 50);
ellipse(870, 355, 40);
ellipse(860, 355, 40 + p);
ellipse(880, 355, 40 + p);
ellipse(860, 325, 40 + p);
ellipse(880, 325, 40 + p);
ellipse(890, 340, 20 + 1.6 * p);
textStyle(BOLD);
fill(0, 120, 0);
textSize(90);
if (p < 15 && p >= 5) {
image(img3, 1650, 500);
textSize(90);
console.log("YOO PINK");
fill(255, 200, 200);
rect(1120, 460, 500, 150, 20);
fill(80, 150, 0);
text('Folivore', 1150, 550);
textSize(30);
textStyle(NORMAL);
text('Leaf-eating animals', 1155, 590);
if (b == 0) {
text('', 1250, 780);
} else if (b == 1) {
image(img7, 0, 0, 1920, 1080);
sound1.play();
}
}
if (p < 25 && p >= 15) {
textStyle(BOLD);
textSize(90);
console.log("YOO PINK 2");
fill(255, 200, 200);
rect(1120, 620, 500, 150, 20);
fill(80, 150, 0);
textStyle(BOLD);
text('Fruigivore', 1150, 710);
textSize(30);
textStyle(NORMAL);
text('Fruit-eating animals', 1155, 750);
image(img3, 1650, 670);
image(img4, 1750, 670);
if (b == 0) {
text('', 1250, 780);
} else if (b == 1) {
image(img7, 0, 0, 1920, 1080);
sound1.play();
}
}
else if (p <= 35 && p >= 25) {
textStyle(BOLD);
textSize(90);
fill(255, 200, 200);
rect(1120, 780, 500, 150, 20);
fill(80, 150, 0);
textStyle(BOLD);
text('Omnivore', 1150, 870);
textSize(30);
textStyle(NORMAL);
text('Protein-eating animals', 1155, 910);
image(img3, 1650, 780);
image(img4, 1750, 780);
image(img5, 1650, 860);
image(img6, 1750, 860);
if (b == 0) {
text('', 1250, 780);
} else if (b == 1) {
image(img8, 0, 0, 1920, 1080);
sound2.play();
}
}
}
function sound() {
if (mouseX >= width / 2 && mouseX <= 3 * width / 2 && mouseY >= height / 2 && mouseY <= height) {
if (!song.isPlaying()) {
song.play();
}
} else {
song.stop();
}
}let img1;
let portName = '/dev/cu.usbmodem1421';
let p;
let b;
let sound1;
let sound2;
let showAnswer;
let startedShowing;
function setup() {
createCanvas(1920, 1080);
sound1 = loadSound('WrongBuzzer.mp3');
sound2 = loadSound('CorrectDingDing.mp3');
}
function preload() {
img1 = loadImage('Monkey.png');
img2 = loadImage('Brain.png');
img3 = loadImage('leaf.png');
img4 = loadImage('fruit.png');
img5 = loadImage('animal.png');
img6 = loadImage('insects.png');
img7 = loadImage('Wrong.jpg');
img8 = loadImage('Correct.jpg');
}
for (var i = 0; i < portList.length; i++) {
}
}
function serverConnected() {
}
function portOpen() {
}
}
function portClose() {
}
console.log(inString);
if (inString.length > 0) {
console.log('hi');
p = ceil(map(sensors[1], 1023, 2, 35, 5));
b = map(sensors[0], 1, 0, 1, 0);
}
}
}
}
function draw() {
background(120, 200, 90);
image(img1, 200, 280);
fill(0, 120, 0);
rect(0, 0, 1920, 220);
fill(255);
ellipse(320, 150, 60);
textSize(60);
textStyle(BOLD);
text('Which brain requires the most energy to power?', 280, 100);
textSize(30);
text('Turn the Knob to Compare the Brains', 370, 160);
fill(255);
ellipse(1010, 150, 60);
text('Press the Button to Submit Your Answer', 1055, 160);
fill(0, 120, 0);
textSize(30);
text('1', 312, 160);
fill(0, 120, 0);
textSize(30);
text('2', 1003, 160);
push();
translate(-250, 10);
scale(1.2);
fill(0, 120, 0);
textSize(48);
text('Brain', 1150, 260);
text('-------', 1150, 290);
text('Body', 1150, 330);
text('-------', 1360, 290);
text('100g', 1360, 330);
text('=', 1300, 300);
fill(255, 200, 180)
textStyle(BOLD);
text(p + 'g', 1360, 260);
pop();
textSize(90);
fill(100, 180, 0);
rect(1120, 460, 500, 150, 20);
fill(80, 150, 0);
text('Folivore', 1150, 550);
textSize(30);
textStyle(NORMAL);
text('Leaf-eating animals', 1155, 590);
textSize(90);
fill(100, 180, 0);
rect(1120, 620, 500, 150, 20);
fill(80, 150, 0);
textStyle(BOLD);
text('Fruigivore', 1150, 710);
textSize(30);
textStyle(NORMAL);
text('Fruit-eating animals', 1155, 750);
textSize(90);
fill(100, 180, 0);
rect(1120, 780, 500, 150, 20);
fill(80, 150, 0);
textStyle(BOLD);
text('Omnivore', 1150, 870);
textSize(30);
textStyle(NORMAL);
text('Protein-eating animals', 1155, 910);
fill(255, 200, 200);
noStroke();
ellipse(850, 340, 5 + 1.6 * p);
ellipse(870, 340, 50);
ellipse(870, 355, 40);
ellipse(860, 355, 40 + p);
ellipse(880, 355, 40 + p);
ellipse(860, 325, 40 + p);
ellipse(880, 325, 40 + p);
ellipse(890, 340, 20 + 1.6 * p);
textStyle(BOLD);
fill(0, 120, 0);
textSize(90);
if (p < 15 && p >= 5) {
image(img3, 1650, 500);
textSize(90);
console.log("YOO PINK");
fill(255, 200, 200);
rect(1120, 460, 500, 150, 20);
fill(80, 150, 0);
text('Folivore', 1150, 550);
textSize(30);
textStyle(NORMAL);
text('Leaf-eating animals', 1155, 590);
if (b == 0) {
text('', 1250, 780);
} else if (b == 1) {
image(img7, 0, 0, 1920, 1080);
sound1.play();
}
}
if (p < 25 && p >= 15) {
textStyle(BOLD);
textSize(90);
console.log("YOO PINK 2");
fill(255, 200, 200);
rect(1120, 620, 500, 150, 20);
fill(80, 150, 0);
textStyle(BOLD);
text('Fruigivore', 1150, 710);
textSize(30);
textStyle(NORMAL);
text('Fruit-eating animals', 1155, 750);
image(img3, 1650, 670);
image(img4, 1750, 670);
if (b == 0) {
text('', 1250, 780);
} else if (b == 1) {
image(img7, 0, 0, 1920, 1080);
sound1.play();
}
}
else if (p <= 35 && p >= 25) {
textStyle(BOLD);
textSize(90);
fill(255, 200, 200);
rect(1120, 780, 500, 150, 20);
fill(80, 150, 0);
textStyle(BOLD);
text('Omnivore', 1150, 870);
textSize(30);
textStyle(NORMAL);
text('Protein-eating animals', 1155, 910);
image(img3, 1650, 780);
image(img4, 1750, 780);
image(img5, 1650, 860);
image(img6, 1750, 860);
if (b == 0) {
text('', 1250, 780);
} else if (b == 1) {
image(img8, 0, 0, 1920, 1080);
sound2.play();
}
}
}
function sound() {
if (mouseX >= width / 2 && mouseX <= 3 * width / 2 && mouseY >= height / 2 && mouseY <= height) {
if (!song.isPlaying()) {
song.play();
}
} else {
song.stop();
}
}let img1;
let portName = '/dev/cu.usbmodem1421';
let p;
let b;
let sound1;
let sound2;
let showAnswer;
let startedShowing;
function setup() {
createCanvas(1920, 1080);
sound1 = loadSound('WrongBuzzer.mp3');
sound2 = loadSound('CorrectDingDing.mp3');
}
function preload() {
img1 = loadImage('Monkey.png');
img2 = loadImage('Brain.png');
img3 = loadImage('leaf.png');
img4 = loadImage('fruit.png');
img5 = loadImage('animal.png');
img6 = loadImage('insects.png');
img7 = loadImage('Wrong.jpg');
img8 = loadImage('Correct.jpg');
}
for (var i = 0; i < portList.length; i++) {
}
}
function serverConnected() {
}
function portOpen() {
}
}
function portClose() {
}
console.log(inString);
if (inString.length > 0) {
console.log('hi');
p = ceil(map(sensors[1], 1023, 2, 35, 5));
b = map(sensors[0], 1, 0, 1, 0);
}
}
}
}
function draw() {
background(120, 200, 90);
image(img1, 200, 280);
fill(0, 120, 0);
rect(0, 0, 1920, 220);
fill(255);
ellipse(320, 150, 60);
textSize(60);
textStyle(BOLD);
text('Which brain requires the most energy to power?', 280, 100);
textSize(30);
text('Turn the Knob to Compare the Brains', 370, 160);
fill(255);
ellipse(1010, 150, 60);
text('Press the Button to Submit Your Answer', 1055, 160);
fill(0, 120, 0);
textSize(30);
text('1', 312, 160);
fill(0, 120, 0);
textSize(30);
text('2', 1003, 160);
push();
translate(-250, 10);
scale(1.2);
fill(0, 120, 0);
textSize(48);
text('Brain', 1150, 260);
text('-------', 1150, 290);
text('Body', 1150, 330);
text('-------', 1360, 290);
text('100g', 1360, 330);
text('=', 1300, 300);
fill(255, 200, 180)
textStyle(BOLD);
text(p + 'g', 1360, 260);
pop();
textSize(90);
fill(100, 180, 0);
rect(1120, 460, 500, 150, 20);
fill(80, 150, 0);
text('Folivore', 1150, 550);
textSize(30);
textStyle(NORMAL);
text('Leaf-eating animals', 1155, 590);
textSize(90);
fill(100, 180, 0);
rect(1120, 620, 500, 150, 20);
fill(80, 150, 0);
textStyle(BOLD);
text('Fruigivore', 1150, 710);
textSize(30);
textStyle(NORMAL);
text('Fruit-eating animals', 1155, 750);
textSize(90);
fill(100, 180, 0);
rect(1120, 780, 500, 150, 20);
fill(80, 150, 0);
textStyle(BOLD);
text('Omnivore', 1150, 870);
textSize(30);
textStyle(NORMAL);
text('Protein-eating animals', 1155, 910);
fill(255, 200, 200);
noStroke();
ellipse(850, 340, 5 + 1.6 * p);
ellipse(870, 340, 50);
ellipse(870, 355, 40);
ellipse(860, 355, 40 + p);
ellipse(880, 355, 40 + p);
ellipse(860, 325, 40 + p);
ellipse(880, 325, 40 + p);
ellipse(890, 340, 20 + 1.6 * p);
textStyle(BOLD);
fill(0, 120, 0);
textSize(90);
if (p < 15 && p >= 5) {
image(img3, 1650, 500);
textSize(90);
console.log("YOO PINK");
fill(255, 200, 200);
rect(1120, 460, 500, 150, 20);
fill(80, 150, 0);
text('Folivore', 1150, 550);
textSize(30);
textStyle(NORMAL);
text('Leaf-eating animals', 1155, 590);
if (b == 0) {
text('', 1250, 780);
} else if (b == 1) {
image(img7, 0, 0, 1920, 1080);
sound1.play();
}
}
if (p < 25 && p >= 15) {
textStyle(BOLD);
textSize(90);
console.log("YOO PINK 2");
fill(255, 200, 200);
rect(1120, 620, 500, 150, 20);
fill(80, 150, 0);
textStyle(BOLD);
text('Fruigivore', 1150, 710);
textSize(30);
textStyle(NORMAL);
text('Fruit-eating animals', 1155, 750);
image(img3, 1650, 670);
image(img4, 1750, 670);
if (b == 0) {
text('', 1250, 780);
} else if (b == 1) {
image(img7, 0, 0, 1920, 1080);
sound1.play();
}
}
else if (p <= 35 && p >= 25) {
textStyle(BOLD);
textSize(90);
fill(255, 200, 200);
rect(1120, 780, 500, 150, 20);
fill(80, 150, 0);
textStyle(BOLD);
text('Omnivore', 1150, 870);
textSize(30);
textStyle(NORMAL);
text('Protein-eating animals', 1155, 910);
image(img3, 1650, 780);
image(img4, 1750, 780);
image(img5, 1650, 860);
image(img6, 1750, 860);
if (b == 0) {
text('', 1250, 780);
} else if (b == 1) {
image(img8, 0, 0, 1920, 1080);
sound2.play();
}
}
}
function sound() {
if (mouseX >= width / 2 && mouseX <= 3 * width / 2 && mouseY >= height / 2 && mouseY <= height) {
if (!song.isPlaying()) {
song.play();
}
} else {
song.stop();
}
}let img1;
let portName = 'COM5';
let p;
let b;
let sound1;
let sound2;
let showAnswer;
let startedShowing;
function setup() {
createCanvas(1920, 1080);
sound1 = loadSound('WrongBuzzer.mp3');
sound2 = loadSound('CorrectDingDing.mp3');
}
function preload() {
img1 = loadImage('Monkey.png');
img2 = loadImage('Brain.png');
img3 = loadImage('leaf.png');
img4 = loadImage('fruit.png');
img5 = loadImage('animal.png');
img6 = loadImage('insects.png');
img7 = loadImage('Wrong.jpg');
img8 = loadImage('Correct.jpg');
}
for (var i = 0; i < portList.length; i++) {
}
}
function serverConnected() {
}
function portOpen() {
}
}
function portClose() {
}
if (inString.length > 0) {
console.log('hi');
p = ceil(map(sensors[1], 1023, 2, 5, 35));
b = map(sensors[0], 1, 0, 1, 0);
}
}
}
}
function draw() {
background(120, 200, 50);
image(img1, 200, 280);
image(img3, 1150, 820);
fill(0, 120, 0);
rect(0, 0, 1920, 220);
fill(255);
ellipse(320, 150, 60);
textSize(60);
textStyle(BOLD);
text('Which brain requires the most energy to power?', 280, 100);
textSize(30);
text('Turn the Knob to Compare the Brains', 370, 160);
fill(255);
ellipse(1010, 150, 60);
text('Press the Button to Submit Your Answer', 1055, 160);
fill(0, 120, 0);
textSize(30);
text('1', 312, 160);
fill(0, 120, 0);
textSize(30);
text('2', 1003, 160);
push();
translate(-250, 10);
scale(1.2);
fill(0, 120, 0);
textSize(48);
text('Brain', 1150, 260);
text('-------', 1150, 290);
text('Body', 1150, 330);
text('-------', 1360, 290);
text('100g', 1360, 330);
text('=', 1300, 300);
fill(255, 200, 180)
textStyle(BOLD);
text(p + 'g', 1360, 260);
pop();
textSize(90);
fill(100, 180, 0);
rect(1120, 460, 500, 150, 20);
fill(80, 150, 0);
text('Folivore', 1150, 550);
textSize(30);
textStyle(NORMAL);
text('Leaf-eating animals', 1155, 590);
textSize(90);
fill(100, 180, 0);
rect(1120, 620, 500, 150, 20);
fill(80, 150, 0);
textStyle(BOLD);
text('Fruigivore', 1150, 710);
textSize(30);
textStyle(NORMAL);
text('Fruit-eating animals', 1155, 750);
textSize(90);
fill(100, 180, 0);
rect(1120, 780, 500, 150, 20);
fill(80, 150, 0);
textStyle(BOLD);
text('Omnivore', 1150, 870);
textSize(30);
textStyle(NORMAL);
text('Protein-eating animals', 1155, 910);
fill(255, 200, 200);
noStroke();
ellipse(850, 340, 5 + 1.6 * p);
ellipse(870, 340, 50);
ellipse(870, 355, 40);
ellipse(860, 355, 40 + p);
ellipse(880, 355, 40 + p);
ellipse(860, 325, 40 + p);
ellipse(880, 325, 40 + p);
ellipse(890, 340, 20 + 1.6 * p);
textStyle(BOLD);
fill(0, 120, 0);
textSize(90);
if (p < 15 && p >= 5) {
textSize(90);
console.log("YOO PINK");
fill(255, 200, 200);
rect(1120, 460, 500, 150, 20);
fill(80, 150, 0);
text('Folivore', 1150, 550);
textSize(30);
textStyle(NORMAL);
text('Leaf-eating animals', 1155, 590);
if (b == 0) {
text('', 1250, 780);
} else if (b == 1) {
image(img7, 0, 0, 1920, 1080);
sound1.play();
}
}
if (p < 25 && p >= 15) {
textStyle(BOLD);
textSize(90);
console.log("YOO PINK 2");
fill(255, 200, 200);
rect(1120, 620, 500, 150, 20);
fill(80, 150, 0);
textStyle(BOLD);
text('Fruigivore', 1150, 710);
textSize(30);
textStyle(NORMAL);
text('Fruit-eating animals', 1155, 750);
image(img4, 1250, 820);
if (b == 0) {
text('', 1250, 780);
} else if (b == 1) {
image(img7, 0, 0, 1920, 1080);
sound1.play();
}
}
else if (p <= 35 && p >= 25) {
textStyle(BOLD);
textSize(90);
fill(255, 200, 200);
rect(1120, 780, 500, 150, 20);
fill(80, 150, 0);
textStyle(BOLD);
text('Omnivore', 1150, 870);
textSize(30);
textStyle(NORMAL);
text('Protein-eating animals', 1155, 910);
image(img4, 1250, 820);
image(img5, 1350, 820);
image(img6, 1450, 820);
if (b == 0) {
text('', 1250, 780);
} else if (b == 1) {
image(img8, 0, 0, 1920, 1080);
sound2.play();
}
}
}
function sound() {
if (mouseX >= width / 2 && mouseX <= 3 * width / 2 && mouseY >= height / 2 && mouseY <= height) {
if (!song.isPlaying()) {
song.play();
}
} else {
song.stop();
}
}let img1;
let portName = 'COM5';
let p;
let b;
let sound1;
let sound2;
function setup() {
createCanvas(1920, 1080);
sound1 = loadSound('WrongBuzzer.mp3');
sound2 = loadSound('CorrectDingDing.mp3');
}
function preload() {
img1 = loadImage('Monkey.png');
img2 = loadImage('Brain.png');
img3 = loadImage('leaf.png');
img4 = loadImage('fruit.png');
img5 = loadImage('animal.png');
img6 = loadImage('insects.png');
img7 = loadImage('Wrong.jpg');
img8 = loadImage('Correct.jpg');
}
for (var i = 0; i < portList.length; i++) {
}
}
function serverConnected() {
}
function portOpen() {
}
}
function portClose() {
}
if (inString.length > 0) {
console.log('hi');
p = ceil(map(sensors[1], 1023, 2, 5, 35));
b = map(sensors[0], 1, 0, 1, 0);
}
}
}
}
function draw() {
background(120, 200, 50);
image(img1, 200, 190);
image(img3, 1150, 820);
fill (0,120,0);
rect(1130, 390,620,210,20);
fill(255);
textSize(48);
textStyle(BOLD);
text('Which brain requires the', 1160, 450);
text('most energy to power?', 1160, 500);
textSize(24);
text('Turn the knob to compare the brains,', 1160, 540);
text('then hit the button to submit your answer.', 1160, 570);
fill(0,120,0);
textSize(48);
text('Brain', 1150, 260);
text('-------', 1150, 290);
text('Body', 1150, 330);
text('-------', 1360, 290);
text('100g', 1360, 330);
text('=', 1300, 300);
fill(255, 200, 180)
textStyle(BOLD);
text(p + 'g', 1360, 260);
fill(255, 200, 200);
noStroke();
ellipse(850, 250, 5 + 1.5 * p);
ellipse(870, 250, 50);
ellipse(870, 265, 30);
ellipse(860, 265, 25 + p);
ellipse(880, 265, 25 + p);
ellipse(860, 235, 25 + p);
ellipse(880, 235, 25 + p);
ellipse(890, 250, 5 + 1.5 * p);
textStyle(BOLD);
fill(0,120,0);
textSize(90);
if (p < 15 && p >= 5) {
text('Folivore', 1150, 710);
textSize(40);
textStyle(NORMAL);
text('Leaf-eating animals', 1160, 760);
if (b == 0) {
text('', 1250, 780);
} else if (b == 1) {
image(img7, 0, 0, 1920, 1080);
if (!sound1.isPlaying()) {
sound1.play();
} else {
sound1.stop();
}
}
}
if (p < 25 && p >= 15) {
text('Fruigivore', 1150, 710);
textSize(40);
textStyle(NORMAL);
text('Fruit-eating animals', 1160, 760);
image(img4, 1250, 820);
if (b == 0) {
text('', 1250, 780);
} else if (b == 1) {
image(img7, 0, 0, 1920, 1080);
if (!sound1.isPlaying()) {
sound1.play();
} else {
sound1.stop();
}
}
}
else if (p <= 35 && p >= 25) {
text('Omnivore', 1150, 710);
textSize(40);
textStyle(NORMAL);
text('Protein-eating animals', 1160, 760);
image(img4, 1250, 820);
image(img5, 1350, 820);
image(img6, 1450, 820);
if (b == 0) {
text('', 1250, 780);
} else if (b == 1) {
image(img8, 0, 0, 1920, 1080);
if (!sound2.isPlaying()) {
sound2.play();
} else {
sound2.stop();
}
}
}
}
function sound() {
if (mouseX >= width / 2 && mouseX <= 3 * width / 2 && mouseY >= height / 2 && mouseY <= height) {
if (!song.isPlaying()) {
song.play();
}
} else {
song.stop();
}
function setup() {
createCanvas(windowWidth, windowHeight);
img1 = loadImage("Brain1.jpg");
img2 = loadImage("Brain2.jpg");
img3 = loadImage("Brain3.jpg");
}
function gotData() {
}
function draw() {
background(255, 255, 255);
fill(0, 0, 0);
if(latestData>=0&&latestData<=341){
image(img3,0,0,width,height);
}
else if (latestData>341&&latestData<=682){
image(img2,0,0,width,height);
}
else if (latestData>682&&latestData<=1023){
image(img1,0,0,width,height);
}
text(latestData, 10, 10);
}var mic;
function setup(){
mic = new p5.AudioIn()
mic.start();
}
function draw(){
}var mic;
var vid1;
var vid2;
function setup(){
createCanvas(windowWidth, windowHeight);
vid1 = createVideo("Comp_1.mp4");
vid1.hide();
vid1.loop();
vid2 = createVideo("Comp_2.mp4");
vid2.hide();
mic = new p5.AudioIn()
mic.start();
}
let secondPlaying = false;
function draw(){
background(200);
micLevel = mic.getLevel();
console.log(micLevel);
if(micLevel>=0.2){
secondPlaying = true;
vid2.play();
}
if(secondPlaying){
image(vid2, 0, 0);
}
else{
image(vid1,0,0);
}
if(secondPlaying && vid2.ended){
secondPlaying = false;
}
}let x=100;
let y=180;
let xspeed = 9;
let yspeed = 10;
let diam=10;
function setup() {
createCanvas(windowWidth, windowHeight);
background(50,50,50);
}
function draw() {
display();
bounce();
}
function display() {
diam = dist(windowWidth, windowHeight, y, x);
col = dist(0, 255, mouseX,mouseY);
for(var i=0;i<50;i++){ 
fill(150,10,i+col);
}
noStroke();
ellipse(x, y, diam, diam);
xspeed = bounce(x, xspeed, 0, width);
x += xspeed*.1;
yspeed = bounce(y, yspeed, 0, height);
y += yspeed*.2;
}
function bounce(position, speed, min, max) {
if (position < min || position > max) {
speed *= -1;
}
return speed;
}
function mousePressed() {
background(141,205,245);
}let x = 80;
let y = 80;
let xspeed = 9;
let yspeed = 10;
let diam=180;
function setup() {
createCanvas(windowWidth, windowHeight);
background(141,205,245);
}
function draw() {
display();
bounce();
}
function display() {
diam = dist(windowWidth, windowHeight, x, y);
col = dist(0, 255, mouseX, mouseY);
for(var i=0; i<150; i++){ 
fill(100,col+i,col-i);
}
noStroke();
ellipse(x, y, diam, diam);
xspeed = bounce(x, xspeed, 0, width);
x += xspeed*.6;
yspeed = bounce(y, yspeed, 0, height);
y += yspeed*.1;
}
function bounce(position, speed, min, max) {
if (position < min || position > max) {
speed *= -1;
}
return speed;
}
function mousePressed() {
background(141,205,245);
}let img;
let a = 200;
let b = 70;
let song;
let amp;
function preload() {
img = loadImage('sketch sax.jpg');
}
function setup() {
createCanvas(windowWidth, windowHeight);
amp = new p5.Amplitude();
}
function backgroundLine() {
beginShape();
curveVertex(190, b);
curveVertex(250, b + 10);
curveVertex(a - 200, b + 30);
curveVertex(a - 100, b + 50);
curveVertex(300, b);
curveVertex(260, b + 30);
curveVertex(270, b + 60);
curveVertex(a - 100, b + 80);
curveVertex(190, b + 100);
curveVertex(240, b + 130);
curveVertex(a - 150, b + 140);
curveVertex(150, b + 150);
curveVertex(200, b + 60);
curveVertex(a + 110, b + 150);
curveVertex(200, b + 200);
curveVertex(250, b + 250);
curveVertex(190, b);
curveVertex(250, b - 10);
curveVertex(200, b + 30);
curveVertex(150, b + 100);
curveVertex(195, b);
curveVertex(196, b + 1);
curveVertex(197, b + 2);
curveVertex(198, b + 3);
curveVertex(199, b + 1);
curveVertex(200, b + 2);
curveVertex(192, b);
curveVertex(182, b - 1);
curveVertex(177, b - 2);
curveVertex(193, b + 3);
curveVertex(194, b - 1);
curveVertex(195, b - 2);
curveVertex(250, b + 10);
curveVertex(200, b + 5);
curveVertex(240, b - 2);
curveVertex(250, b - 13);
curveVertex(235, b + 11);
curveVertex(200, b + 2);
curveVertex(235, b);
curveVertex(230, b - 4);
curveVertex(235, b - 10);
curveVertex(229, b - 15);
curveVertex(200, b);
curveVertex(205, b - 4);
curveVertex(200, b - 10);
curveVertex(205, b - 15);
curveVertex(215, b);
curveVertex(210, b - 4);
curveVertex(215, b - 10);
curveVertex(210, b - 15);
curveVertex(217, b);
curveVertex(212, b - 4);
curveVertex(217, b - 10);
curveVertex(212, b - 15);
curveVertex(219, b);
curveVertex(214, b - 4);
curveVertex(219, b - 10);
curveVertex(214, b - 15);
curveVertex(221, b);
curveVertex(216, b - 4);
curveVertex(221, b - 10);
curveVertex(216, b - 15);
curveVertex(223, b);
curveVertex(218, b - 3);
curveVertex(223, b - 10);
curveVertex(218, b - 15);
curveVertex(225, b -10);
curveVertex(220, b - 15);
curveVertex(225, b - 10);
curveVertex(220, b - 15);
curveVertex(227, b -10);
curveVertex(222, b - 15);
curveVertex(227, b - 10);
curveVertex(222, b - 15);
curveVertex(229, b -10);
curveVertex(224, b - 15);
curveVertex(235, b - 10);
curveVertex(230, b - 15);
curveVertex(231, b -10);
curveVertex(226, b - 15);
curveVertex(237, b - 10);
curveVertex(232, b - 15);
endShape(CLOSE);
}
function draw() {
background(255);
translate(150, 150);
image(img, 30, 0, 297.6, 396.8);
stroke(250,0,0);
strokeWeight(.5);
noFill();
backgroundLine();
var latestData = "waiting for data";
let vid1;
let vid2;
function setup() {
createCanvas(windowWidth, windowHeight);
vid1 = createVideo("sample.mp4");
vid1.hide();
vid1.loop();
vid2 = createVideo("noodlebg.mp4");
vid2.hide();
vid2.loop();
}
function draw() {
background(220);
if (latestData==1) {
image(vid1, 0, 0);
} 
else if (latestData==2) {
image(vid2, 0, 0);
} 
else {
background(0);
}
} 
function gotData() {
latestData = currentString;
let vid1;
function setup() {
vid1 = createVideo(“sample.mp4”);
vid1.hide();
vid1.loop();
}
inData = inByte;
}
}
function draw() {
background(220);
if (inData < 800) {
image(vid1, 0, 0);
} else {
background(0);
}
var latestData = "waiting for data";
let vid1;
function setup() {
createCanvas(windowWidth, windowHeight);
vid1 = createVideo("sample.mp4");
vid1.hide();
vid1.loop();
}
function draw() {
background(220);
if (latestData < 800) {
image(vid1, 0, 0);
} else {
background(0);
}
}
function gotData() {
latestData = currentString;
let x;
let y;
let a = 100;
let diam1=50;
let audio;
let turtleNeckx=110;
let turtleNecky=-300;
let img;
let img2;
let img3;
function preload() {
img = loadImage('turtleneck.png');
img2= loadImage('turtleneckfront.png');
img3=loadImage('turtleneckbg.png');
}
function setup() {
createCanvas(windowWidth, windowHeight);
x = 150+450;
y = 200+50;
fillColor=color(75, 100, 75);
background(255);
audio= loadSound('Uh-oh-sound-effect.mp3');
}
function glasses() {
strokeWeight(4);
noFill();
rect(x - 10, y, a, a - 20, 20);
line(x + 40, y, x + 60, y);
rect(x + 110, y, a, a - 20, 20);
}
function eyes() {
strokeWeight(2);
fill(255);
ellipse(x, y - 15, diam1, diam1 - 20);
ellipse(x, y - 15, 5);
ellipse(x + 100, y - 15, diam1, diam1 - 20);
ellipse(x + 100, y - 15, 5);
}
function head() {
fill(255);
rect(x + 50, y, 200, 250, 150, 150, 70, 70);
}
function eyebrows() {
curve(x, y - 50, x, y - 55, x + 20, y - 60, x + 100, y - 50);
curve(x + 100, y - 50, x + 100, y - 55, x + 120, y - 60, x + 150, y + 50);
}
function mouth() {
strokeWeight(16);
curve(x + 30, y + 100, x + 30, y + 90, x + 50, y + 95, x + 130, y + 100);
}
function mousePressed(){
background(255);
for(var i = 0; i < 2; i++){
turtleNecky=turtleNecky+i;
image(img,turtleNeckx+120,turtleNecky,840,500);
}
}
function caption(){
noStroke();
fill(fillColor);
textSize(12);
text("CLICK and DRAG the sweater",mouseX,mouseY,200,30);
}
function draw() {
background(255);
image(img3,300,400);
ellipseMode(CENTER);
rectMode(CENTER);
stroke(fillColor);
head();
eyebrows();
eyes();
mouth();
if(turtleNecky>155){
glassesTilted();
}  else{
glasses();
caption();
}
if(turtleNecky>156&&turtleNecky<158){
if(!audio.isPlaying()){
audio.play();}
}
turtleNeck();
if(mouseIsPressed){
for(var i = 0; i < 2; i++){
turtleNecky=turtleNecky+i;
fill(fillColor);
image(img2,turtleNeckx+110,turtleNecky,860,500);
}
}
}
function glassesTilted(){
strokeWeight(4);
noFill();
push();
translate(608, 312);
console.log(width);
rotate(PI/2.5);
rect(-50, 0, a-20, a, 20);
pop();
push();
translate(712, 290);
rotate(PI/2.5);
rect(-55, -8, a-20, a, 20);
pop();
push();
translate(640, 305);
rotate(PI/2);
line(-50, 0, -55,-8);
pop();
}
function turtleNeck(){
fill(fillColor);
image(img2,turtleNeckx+110,turtleNecky,860,500);
}
let x;
let y;
let a = 100;
let s;
let diam1=50;
let bg;
let slider;
let browChange;
function preload() {
bg = loadImage("room.jpg");
}
function setup() {
createCanvas(windowWidth, windowHeight);
x = 150+400;
y = 200+50;
fillColor=color(75, 100, 75);
slider=createSlider(30, 45, 0);
slider.position(550,50);
background(bg);
let b=map(slider.value(),30,45,6,2);
filter(BLUR,b);
}
function glasses() {
strokeWeight(4);
noFill();
rect(x - 10, y, a, a - 20, 20);
line(x + 40, y, x + 60, y);
rect(x + 110, y, a, a - 20, 20);
}
function eyes() {
strokeWeight(2);
fill(255);
let s=slider.value();
ellipse(x+5, y - 14, diam1, diam1 - s);
ellipse(x+5, y - 15, 5);
ellipse(x + 95, y - 14, diam1, diam1 - s);
ellipse(x + 95, y - 15, 5);
}
function head() {
fill(255);
rect(x + 50, y, 200, 250, 150, 150, 70, 70);
}
function eyebrows() {
browChange=map(slider.value(),30,45,50,100);
curve(x + 150-100, y - 50-browChange, x + 120-100, y - 55, x + 100-100, y - 60, x + 100-100, y + 50);
curve(x + 100-20, y - 50-browChange, x + 100-20, y - 55, x + 120-20, y - 60, x + 150-20, y + 50);
}
function mouth() {
strokeWeight(16);
curve(x + 30, y + 100, x + 30, y + 90, x + 50, y + 95, x + 130, y + 100);
}
function draw() {
ellipseMode(CENTER);
rectMode(CENTER);
noStroke();
fill(fillColor);
textSize(32);
text("Squint",450,60,35,35);
stroke(fillColor);
head();
eyebrows();
eyes();
mouth();
strokeWeight(4);
}
function mousePressed() {
background(bg);
let b=map(slider.value(),30,45,6,2);
filter(BLUR,b);
var d = dist(mouseX, mouseY, 350, 450);
if (d < 50) {
noStroke();
fill(fillColor);
textSize(32);
text("Found It!",mouseX,mouseY,200,100);
} else {
if(mouseY>100){
noStroke();
fill(fillColor);
textSize(24);
text("It's Not Here",mouseX,mouseY,200,100);
}
}
}
let x;
let y;
let a = 100;
let diam1=50;
let turtleNeckx=110;
let turtleNecky=250;
function setup() {
createCanvas(windowWidth, windowHeight);
x = 150+450;
y = 200+50;
fillColor=color(75, 100, 75);
background(255);
}
function glasses() {
strokeWeight(4);
noFill();
rect(x - 10, y, a, a - 20, 20);
line(x + 40, y, x + 60, y);
rect(x + 110, y, a, a - 20, 20);
}
function eyes() {
strokeWeight(2);
fill(255);
ellipse(x, y - 15, diam1, diam1 - 20);
ellipse(x, y - 15, 5);
ellipse(x + 100, y - 15, diam1, diam1 - 20);
ellipse(x + 100, y - 15, 5);
}
function head() {
fill(255);
rect(x + 50, y, 200, 250, 150, 150, 70, 70);
}
function eyebrows() {
curve(x, y - 50, x, y - 55, x + 20, y - 60, x + 100, y - 50);
curve(x + 100, y - 50, x + 100, y - 55, x + 120, y - 60, x + 150, y + 50);
}
function mouth() {
strokeWeight(16);
curve(x + 30, y + 100, x + 30, y + 90, x + 50, y + 95, x + 130, y + 100);
}
function draw() {
background(255);
ellipseMode(CENTER);
rectMode(CENTER);
stroke(fillColor);
head();
eyebrows();
eyes();
mouth();
glasses();
turtleNeck();
}
function glassesTilted(){
push();
translate(width/1.4, height/1.9);
rotate(PI/2.5);
rect(-50, 0, a-20, a, 20);
pop();
push();
translate(width/1.2, height/2.1);
rotate(PI/2.5);
rect(-55, -8, a-20, a, 20);
pop();
push();
translate(width/1.33, height/2);
rotate(PI/2);
line(-50, 0, -55,-8);
pop();
}
function turtleNeck(){
fill(fillColor);
if(mouseIsPressed){
for(var i = 0; i <2; i++){
turtleNecky=turtleNecky+i;
rect(turtleNeckx+540,turtleNecky,220,200);
}
}
}
let x;
let y;
let a = 100;
let m;
let diam1 = 50;
let song;
let amp;
let img;
let vid;
let img1;
var drops = [];
let rainStain = [];
function setup() {
background(255);
createCanvas(windowWidth, windowHeight);
x = 150+450;
y = 200+50;
fillColor=color(75, 100, 75);
for (var i = 0; i < 200; i++) {
drops[i] = new Drop();
}
for (let j=0;j<200;j++){
rainStain[j]=new RainStain();
}
}
function glasses() {
strokeWeight(4);
stroke(fillColor);
noFill();
rect(x - 10, y, a, a - 20, 20);
line(x + 40, y, x + 60, y);
rect(x + 110, y, a, a - 20, 20);
}
function eyes() {
strokeWeight(2);
stroke(fillColor);
fill(255);
ellipse(x, y - 15, diam1, diam1 - 20);
ellipse(x, y - 15, 5);
ellipse(x + 100, y - 15, diam1, diam1 - 20);
ellipse(x + 100, y - 15, 5);
}
function head() {
fill(255);
rect(x + 50, y, 200, 250, 150, 150, 70, 70);
}
function eyebrows() {
stroke(fillColor);
curve(x, y - 50, x, y - 55, x + 20, y - 60, x + 100, y - 50);
curve(x + 100, y - 50, x + 100, y - 55, x + 120, y - 60, x + 150, y + 50);
}
function mouth() {
stroke(fillColor);
strokeWeight(15);
curve(x + 30, y + 100, x + 30, y + 90, x + 50, y + 95, x + 130, y + 100);
}
function pattern() {
fill(255);
stroke(255);
for (let i = 0; i <= 10; i++) {
let vol = amp.getLevel();
if (vol >= .05) {
fill(255, 0, 0);
} else {
fill(0, 0, 255);
}
rect(i * 1 / 10 * width, 200, width / 10, height);
}
}
function title() {
push();
scale(2);
noStroke();
s1 = "Problems People with Glasses Have";
fill(255);
text(s1, width / 2, 80, 2 * width / 3, 100);
s2 = "#1.Eating Hot Food";
fill(255);
text(s2, width / 2, 100, 3 * width / 5, 100);
pop();
}
function noodleBowl() {
imageMode(CENTER);
push();
scale(.8);
image(img, mouseX, mouseY);
pop();
}
function fog() {
strokeWeight(4);
tint(255, 128);
rect(x - 10, y, a, a - 20, 20);
line(x + 40, y, x + 60, y);
rect(x + 110, y, a, a - 20, 20);
}
function problem1() {
background(250);
head();
eyebrows();
eyes();
mouth();
glassesFog();
}
function keyTyped() {
if (key === 'e') {
strokeColor = 220;
}
}
function draw() {
ellipseMode(CENTER);
rectMode(CENTER);
stroke(fillColor);
problem1();
dropObject();
stainObject();
eraser();
strokeWeight(2);
}
function dropObject(){
for (var i = 0; i < drops.length; i++) {
drops[i].fall();
drops[i].show();
}
}
function stainObject(){
for (var j = 0; j < rainStain.length; j++) {
rainStain[j].show();
} 
}
function eraser(){
strokeWeight(50);
stroke(255);
if (mouseIsPressed) {
line(pmouseX, pmouseY, mouseX, mouseY);
}
}
function glassesFog() {
if (mouseX >= width /2 && mouseX <= 3*width / 2 && mouseY >= height / 2 && mouseY <= height) {
fog();
} else {
glasses();
}
}
function sound() {
if (mouseX >= width /2 && mouseX <= 3*width / 2 && mouseY >= height / 2 && mouseY <= height) {
if (!song.isPlaying()) {
song.play();
}
} else {
song.stop();
}
}
function problem2() {
background(0);
head();
eyebrows();
eyes();
mouth();
glassesFog();
}
let y;
let a = 100;
let m;
let diam1 = 50;
let img;
var button1,button2,button3,button4;
function preload() {
img = loadImage('bean face body.png');
}
function setup() {
createCanvas(windowWidth, windowHeight);
x = 150;
y = 200;
button1 = createButton('Stage 1');
button1.position(width/1.5, height/3);
button1.mousePressed(greet1);
}
function greet() {
image (img,width/2,height/2);
}
function glasses() {
strokeWeight(4);
stroke(x / 2, y / 2, x / 2);
noFill();
rect(x - 10, y, a, a - 20, 20);
line(x + 40, y, x + 60, y);
rect(x + 110, y, a, a - 20, 20);
}
function eyes() {
strokeWeight(2);
stroke(x / 2, y / 2, x / 2);
fill(255);
ellipse(x, y - 15, diam1, diam1 - 20);
ellipse(x, y - 15, 5);
ellipse(x + 100, y - 15, diam1, diam1 - 20);
ellipse(x + 100, y - 15, 5);
}
function head() {
fill(255);
stroke(x / 2, y / 2, x / 2);
strokeWeight(2);
rect(x + 50, y, 200, 250, 150, 150, 70, 70);
}
function eyebrows() {
stroke(x / 2, y / 2, x / 2);
curve(x, y - 50, x, y - 55, x + 20, y - 60, x + 100, y - 50);
curve(x + 100, y - 50, x + 100, y - 55, x + 120, y - 60, x + 150, y + 50);
}
function mouth() {
stroke(x / 2, y / 2, x / 2);
strokeWeight(20);
curve(x + 30, y + 100, x + 30, y + 90, x + 50, y + 95, x + 130, y + 100);
}
function problem1() {
push();
scale(0.8);
translate(width / 2, height / 5);
head();
eyebrows();
eyes();
mouth();
glasses();
pop();
}
function draw() {
ellipseMode(CENTER);
rectMode(CENTER);
stroke(x / 2, y / 2, x / 2);
}
let x;
let y;
let y1;
let y1Speed;
let a=100;
let m;
let diam1=50;
let song;
let amp;
let img;
let img2;
function preload(){
img=loadImage('finger.png');
img2=loadImage('gravity.png');
song = loadSound('Gravity By John Mayer w lyrics (1).mp3');
}
function setup() {
createCanvas(windowWidth, windowHeight);
x = 150+550;
y = 200+50;
y1=250;
y1Speed=.5;
fillColor=color(150 / 2, 200 / 2, 150 / 2);
song.loop();
amp = new p5.Amplitude();
}
function glasses() {
strokeWeight(4);
stroke(fillColor);
noFill();
rect(x - 10, y1, a, a - 20, 20);
line(x + 40, y1, x + 60, y1);
rect(x + 110, y1, a, a - 20, 20);
y1=y1+y1Speed;
if (y1>280){
y1Speed=0;
}else{
y1Speed=0.05;
}
}
function hand(){
fill(0);
stroke(2);
rectMode(CENTER);
if (y1>256){
fill(0);
noStroke();
textSize(16);
s="Hey! Help me push my glasses back up will you?"; 
text (s,mouseX+200, mouseY+70,200,100);
image(img,mouseX,mouseY,150,150);
}
if(mouseY<y+50&&mouseY>y&mouseX<x + 110&&mouseX>x - 10){
if (mouseY<=280&&mouseY>=250&&y1<280&&y1>240){
y1Speed=-1;
}
} else{
if (y1<230||y1>270){
y1Speed=0;
}else{
y1Speed=0.05;
}
}
}
function eyes() {
strokeWeight(2);
stroke(fillColor);
fill(255);
ellipse(x, y - 15, diam1, diam1 - 20);
ellipse(x, y - 15, 5);
ellipse(x + 100, y - 15, diam1, diam1 - 20);
ellipse(x + 100, y - 15, 5);
}
function head() {
fill(255);
rect(x + 50, y, 200, 250, 150, 150, 70, 70);
}
function eyebrows() {
stroke(x / 2, y / 2, x / 2);
curve(x, y - 50, x, y - 55, x + 20, y - 60, x + 100, y - 50);
curve(x + 100, y - 50, x + 100, y - 55, x + 120, y - 60, x + 150, y + 50);
}
function mouth() {
var vol = amp.getLevel();
var m = map(vol, 0, 0.3, 15, 50);
stroke(fillColor);
strokeWeight(m);
curve(x + 30, y + 100, x + 30, y + 90, x + 50, y + 95, x + 130, y + 100);
}
function pattern(){
fill(255);
stroke (255);
for (let i = 0; i <= 10; i++) {
let vol = amp.getLevel();
if (vol >= .05) {
fill(255, 0, 0);
} else {
fill(0,0,255);
}
rect(i * 1 / 10 * width, 200, width/10, height);
}
}
function draw() {
background(255);
image(img2,150,-50);
ellipseMode(CENTER);
rectMode(CENTER);
stroke(fillColor);
push();
scale(1);
head();
eyebrows();
eyes();
mouth();
glasses();
hand();
pop();
}
function mousePressed() {
} else {
song.play();
}
var latestData = "waiting for data";
let vid1;
function setup() {
createCanvas(windowWidth, windowHeight);
vid1 = createVideo("sample.mp4");
vid1.hide();
vid1.loop();
}
function draw() {
background(220);
if (latestData < 800) {
image(vid1, 0, 0);
} else {
background(0);
}
}
function gotData() {
latestData = currentString;
}let x;
let y;
let a = 100;
let m;
let diam1 = 50;
let posWeightY = 340;
let armLength = 150;
let lengthChange = 1;
let pwChange = 8;
let img;
let img2;
let w = 0;
let wChange = 5;
var input, button, greeting;
function preload() {
img = loadImage('bean face body.png');
img2 = loadImage('weight-1399281_1280.png');
}
function setup() {
createCanvas(windowWidth, windowHeight);
x = 150;
y = 200;
input = createInput();
input.position(20, 65);
button = createButton('submit');
button.position(input.x + input.width, 65);
button.mousePressed(greet);
button.mousePressed(update);
greeting = createElement('h2', 'what is your motivation for working out?');
greeting.position(20, 5);
textAlign(CENTER);
textSize(random(15, 30));
}
function greet() {
var name = input.value();
greeting.html(name + '!');
input.value('');
for (var i = 0; i < 200; i++) {
translate(random(width), random(height));
text(name, 0, 0);
}
}
function update() {
posWeightY = posWeightY - pwChange;
armLength = armLength + lengthChange;
w = w + wChange;
}
function glasses() {
strokeWeight(4);
stroke(x / 2, y / 2, x / 2);
noFill();
rect(x - 10, y, a, a - 20, 20);
line(x + 40, y, x + 60, y);
rect(x + 110, y, a, a - 20, 20);
}
function eyes() {
strokeWeight(2);
stroke(x / 2, y / 2, x / 2);
fill(255);
ellipse(x, y - 15, diam1, diam1 - 20);
ellipse(x, y - 15, 5);
ellipse(x + 100, y - 15, diam1, diam1 - 20);
ellipse(x + 100, y - 15, 5);
}
function head() {
fill(255);
stroke(x / 2, y / 2, x / 2);
strokeWeight(2);
rect(x + 50, y, 200, 250, 150, 150, 70, 70);
}
function eyebrows() {
stroke(x / 2, y / 2, x / 2);
curve(x, y - 50, x, y - 55, x + 20, y - 60, x + 100, y - 50);
curve(x + 100, y - 50, x + 100, y - 55, x + 120, y - 60, x + 150, y + 50);
}
function mouth() {
stroke(x / 2, y / 2, x / 2);
strokeWeight(20);
curve(x + 30, y + 100, x + 30, y + 90, x + 50, y + 95, x + 130, y + 100);
}
function body() {
push();
scale(.8);
image(img, 70, 340);
pop();
}
function weight() {
push();
scale(.7);
image(img2, -310, posWeightY);
pop();
}
function arms() {
strokeWeight(2);
fill(255);
ellipse(100, posWeightY + 150, 40, armLength);
ellipse(250, posWeightY + 150, 40, armLength);
}
function poopFace() {
push()
scale(.5);
translate(130, 260);
noFill();
strokeWeight(10);
beginShape();
curveVertex(x + 30, y + 100);
curveVertex(x + 40, y + 110);
curveVertex(x + 50, y + 120);
curveVertex(x + 60, y + 120);
curveVertex(x + 70, y + 110);
curveVertex(x + 80, y + 100);
curveVertex(x + 90, y + 100);
curveVertex(x + 100, y + 110);
curveVertex(x + 110, y + 120);
curveVertex(x + 120, y + 120);
curveVertex(x + 130, y + 110);
curveVertex(x + 140, y + 100);
curveVertex(x + 150, y + 100);
curveVertex(x + 160, y + 110);
curveVertex(x + 170, y + 120);
curveVertex(x + 180, y + 120);
curveVertex(x + 190, y + 110);
curveVertex(x + 200, y + 100);
endShape();
pop();
}
function problem1() {
push();
scale(0.8);
translate(width / 2, height / 5);
body();
head();
eyebrows();
eyes();
poopFace();
glasses();
weight();
arms();
pop();
}
function draw() {
ellipseMode(CENTER);
rectMode(CENTER);
stroke(x / 2, y / 2, x / 2);
textBackground();
weightText();
problem1();
}
function sum(w, wChange) {
return w + wChange;
}
function textBackground(){
fill(255);
noStroke();
rect(width/2,height/6,500,100);
}
function weightText(){
textSize(50);
fill(x / 2, y / 2, x / 2);
text("Weight Lifted:"+ sum(w, wChange)+"lb", width/3, height/5);
}
let x;
let y;
let a = 100;
let m;
let diam1 = 50;
let song;
let amp;
let img;
let vid;
let img1;
function preload() {
img = loadImage('hotramen.png');
img1 = loadImage('when.png');
}
function setup() {
createCanvas(windowWidth, windowHeight);
x = 150;
y = 200;
song = loadSound('Nina Simone-I Cant See Nobody-[AudioTrimmer.com]-[AudioTrimmer.com].mp3');
amp = new p5.Amplitude();
vid = createVideo("bg.mp4");
vid.loop();
vid.hide();
}
function glasses() {
strokeWeight(4);
stroke(x / 2, y / 2, x / 2);
noFill();
rect(x - 10, y, a, a - 20, 20);
line(x + 40, y, x + 60, y);
rect(x + 110, y, a, a - 20, 20);
}
function eyes() {
strokeWeight(2);
stroke(x / 2, y / 2, x / 2);
fill(255);
ellipse(x, y - 15, diam1, diam1 - 20);
ellipse(x, y - 15, 5);
ellipse(x + 100, y - 15, diam1, diam1 - 20);
ellipse(x + 100, y - 15, 5);
}
function head() {
fill(255);
rect(x + 50, y, 200, 250, 150, 150, 70, 70);
}
function eyebrows() {
stroke(x / 2, y / 2, x / 2);
curve(x, y - 50, x, y - 55, x + 20, y - 60, x + 100, y - 50);
curve(x + 100, y - 50, x + 100, y - 55, x + 120, y - 60, x + 150, y + 50);
}
function mouth() {
var vol = amp.getLevel();
var m = map(vol, 0, 0.3, 15, 80);
stroke(x / 2, y / 2, x / 2);
strokeWeight(m);
curve(x + 30, y + 100, x + 30, y + 90, x + 50, y + 95, x + 130, y + 100);
}
function pattern() {
fill(255);
stroke(255);
for (let i = 0; i <= 10; i++) {
let vol = amp.getLevel();
if (vol >= .05) {
fill(255, 0, 0);
} else {
fill(0, 0, 255);
}
rect(i * 1 / 10 * width, 200, width / 10, height);
}
}
function title() {
push();
scale(2);
noStroke();
s1 = "Problems People with Glasses Have";
fill(255);
text(s1, width / 2, 80, 2 * width / 3, 100);
s2 = "#1.Eating Hot Food";
fill(255);
text(s2, width / 2, 100, 3 * width / 5, 100);
pop();
}
function noodleBowl() {
imageMode(CENTER);
push();
scale(.8);
image(img, mouseX, mouseY);
pop();
}
function fog() {
strokeWeight(4);
tint(255, 128);
rect(x - 10, y, a, a - 20, 20);
line(x + 40, y, x + 60, y);
rect(x + 110, y, a, a - 20, 20);
}
function problem1() {
push();
scale(1.5);
translate(width / 4, height / 20);
head();
eyebrows();
eyes();
mouth();
glassesFog();
pop();
noodleBowl();
}
function draw() {
background(255);
push();
scale(1.5);
image(vid, 600, 200);
pop();
push();
scale(.5);
image(img1, 1000, 170);
pop();
ellipseMode(CENTER);
rectMode(CENTER);
stroke(x / 2, y / 2, x / 2);
problem1();
sound();
if (mouseIsPressed) {
problem2();
}
}
function glassesFog() {
if (mouseX >= width /2 && mouseX <= 3*width / 2 && mouseY >= height / 2 && mouseY <= height) {
fog();
} else {
glasses();
}
}
function sound() {
if (mouseX >= width /2 && mouseX <= 3*width / 2 && mouseY >= height / 2 && mouseY <= height) {
if (!song.isPlaying()) {
song.play();
}
} else {
song.stop();
}
}
function problem2() {
background(0);
head();
eyebrows();
eyes();
mouth();
glassesFog();
}
let x;
let y;
let a=100;
let m;
let diam1=50;
let song;
let button1;
let button2;
let button3;
let amp;
let img;
function preload(){
img=loadImage('ramen.png');
}
function setup() {
createCanvas(400, 400);
x = 150;
y = 200;
fillColor=color(x / 2, y / 2, x / 2);
button1=createButton("Eating Hot Food");
button1.position(400, 0);
button1.mousePressed(hotFood);
button2=createButton("Coming Out of A Building in Winter");
button2.position(400, 30);
button2.mousePressed(winter);
button3=createButton("Walking In Rain");
button3.position(400, 60);
button3.mousePressed(rain);
}
function glasses() {
strokeWeight(4);
stroke(x / 2, y / 2, x / 2);
noFill();
rect(x - 10, y, a, a - 20, 20);
line(x + 40, y, x + 60, y);
rect(x + 110, y, a, a - 20, 20);
}
function eyes() {
strokeWeight(2);
stroke(fillColor);
fill(255);
ellipse(x, y - 15, diam1, diam1 - 20);
ellipse(x, y - 15, 5);
ellipse(x + 100, y - 15, diam1, diam1 - 20);
ellipse(x + 100, y - 15, 5);
}
function head() {
fill(255);
rect(x + 50, y, 200, 250, 150, 150, 70, 70);
}
function eyebrows() {
stroke(x / 2, y / 2, x / 2);
curve(x, y - 50, x, y - 55, x + 20, y - 60, x + 100, y - 50);
curve(x + 100, y - 50, x + 100, y - 55, x + 120, y - 60, x + 150, y + 50);
}
function mouth() {
stroke(x / 2, y / 2, x / 2);
strokeWeight(20);
curve(x + 30, y + 100, x + 30, y + 90, x + 50, y + 95, x + 130, y + 100);
}
function pattern(){
fill(255);
stroke (255);
for (let i = 0; i <= 10; i++) {
let vol = amp.getLevel();
if (vol >= .05) {
fill(255, 0, 0);
} else {
fill(0,0,255);
}
rect(i * 1 / 10 * width, 200, width/10, height);
}
}
function draw() {
background(255);
ellipseMode(CENTER);
rectMode(CENTER);
stroke(x / 2, y / 2, x / 2);
push();
scale(.5);
translate (50,30);
head();
eyebrows();
eyes();
mouth();
glasses();
pop();
}
function hotFood (){
for (let f=0;f<=255;f++){
fillColor=color(f);
}
frameRate (30);
}
function winter (){
}
function rain (){
fill(x / 2, y / 2, x / 2);
ellipse (x, y+10,2);
}
let x;
let y;
let a;
let m;
let diam1;
let song;
let button;
let amp;
function setup() {
createCanvas(windowWidth, windowHeight);
x = 150+550;
y = 200+50;
song = loadSound("glasses.mp3", loaded);
amp = new p5.Amplitude();
fillColor=color(150 / 2, 200 / 2, 150 / 2);
}
function loaded() {
button = createButton("play");
button.mousePressed(togglePlaying);
button.position(0,0);
}
function togglePlaying() {
if (!song.isPlaying()) {
song.play();
song.setVolume(0.3);
button.html("pause");
} else {
song.stop();
button.html("play");
}
}
function glasses() {
strokeWeight(4);
noFill();
let vol = amp.getLevel();
let a = map(vol, 0, 0.3, 80, 160);
rect(x - 10, y, a, a - 20, 20);
line(x + 40, y, x + 60, y);
rect(x + 110, y, a, a - 20, 20);
}
function eyes() {
strokeWeight(2);
fill(255);
var vol = amp.getLevel();
var diam1 = map(vol, 0, 0.3, 40, 120);
ellipse(x, y - 15, diam1, diam1 - 20);
ellipse(x, y - 15, 5);
ellipse(x + 100, y - 15, diam1, diam1 - 20);
ellipse(x + 100, y - 15, 5);
}
function head() {
fill(255);
rect(x + 50, y, 200, 250, 150, 150, 70, 70);
}
function eyebrows() {
curve(x, y - 50, x, y - 55, x + 20, y - 60, x + 100, y - 50);
curve(x + 100, y - 50, x + 100, y - 55, x + 120, y - 60, x + 150, y + 50);
}
function mouth() {
var vol = amp.getLevel();
var m = map(vol, 0, 0.3, 15, 80);
strokeWeight(m);
curve(x + 30, y + 100, x + 30, y + 90, x + 50, y + 95, x + 130, y + 100);
}
function pattern(){
fill(255);
stroke (255);
for (let i = 0; i <= 10; i++) {
let vol = amp.getLevel();
if (vol >= .05) {
fill(255, 0, 0);
} else {
fill(0,0,255);
}
rect(i * 1 / 10 * width, 200, width/10, height);
}
}
function draw() {
background(255);
pattern();
ellipseMode(CENTER);
rectMode(CENTER);
stroke(fillColor);
head();
eyebrows();
eyes();
mouth();
glasses();
}var vid;
function setup() {
createCanvas(windowWidth, windowHeight);
vid = createVideo("IMG_2487.MOV");
vid.loop()
}var x = 300;
var y = 200;
var d = 100;
function setup() {
createCanvas(600, 400);
}
function draw() {
if (dist(mouseX, mouseY, x, y) < d/2) {
background(0);
} else {
background(255);
}
ellipse(x, y, d, d);
}function setup() {
createCanvas(640, 360);
background(255);
}
function mousePressed() {
background(255);
}
function draw() {
let r = random(255);
var g = random(255);
let b = random(255);
fill(r, g, b, 100);
ellipse(mouseX, mouseY, 50, 50);
let x;
let y;
let a;
let diam1;
let song;
let button;
let amp;
let video;
function setup() {
createCanvas(400, 400);
x = 150;
y = 200;
video = createCapture(VIDEO);
video.hide();
song = loadSound("glasses.mp3", loaded);
amp = new p5.Amplitude();
}
function loaded() {
button = createButton("play");
button.mousePressed(togglePlaying);
}
function togglePlaying() {
if (!song.isPlaying()) {
song.play();
song.setVolume(0.3);
button.html("pause");
} else {
song.stop();
button.html("play");
}
}
function glasses() {
strokeWeight(4);
noFill();
let vol = amp.getLevel();
let a = map(vol, 0, 0.3, 80, 160);
image(video, x - 10, y, a, a-20);
image(video, x + 110, y, a, a-20);
rect(x - 10, y, a, a - 20);
line(x + 40, y, x + 60, y);
rect(x + 110, y, a, a - 20);
}
function eyes() {
strokeWeight(2);
fill(255);
var vol = amp.getLevel();
var diam1 = map(vol, 0, 0.3, 40, 120);
ellipse(x, y - 15, diam1, diam1 - 20);
ellipse(x, y - 15, 5);
ellipse(x + 100, y - 15, diam1, diam1 - 20);
ellipse(x + 100, y - 15, 5);
}
function head() {
fill(255);
rect(x + 50, y, 200, 250, 150, 150, 70, 70);
}
function eyebrows() {
curve(x, y - 50, x, y - 55, x + 20, y - 60, x + 100, y - 50);
curve(x + 100, y - 50, x + 100, y - 55, x + 120, y - 60, x + 150, y + 50);
}
function mouth() {
strokeWeight(15);
curve(x + 30, y + 100, x + 30, y + 90, x + 50, y + 95, x + 130, y + 100);
}
function draw() {
background(255);
ellipseMode(CENTER);
imageMode(CENTER);
rectMode(CENTER);
stroke(x / 2, y / 2, x / 2);
head();
eyebrows();
eyes();
mouth();
glasses();
let x;
let y;
let a;
let m;
let diam1;
let song;
let button;
let amp;
function setup() {
createCanvas(400, 400);
x = 150;
y = 200;
song = loadSound("glasses.mp3", loaded);
amp = new p5.Amplitude();
}
function loaded() {
button = createButton("play");
button.mousePressed(togglePlaying);
}
function togglePlaying() {
if (!song.isPlaying()) {
song.play();
song.setVolume(0.3);
button.html("pause");
} else {
song.stop();
button.html("play");
}
}
function glasses() {
strokeWeight(4);
noFill();
let vol = amp.getLevel();
let a = map(vol, 0, 0.3, 80, 160);
rect(x - 10, y, a, a - 20, 20);
line(x + 40, y, x + 60, y);
rect(x + 110, y, a, a - 20, 20);
}
function eyes() {
strokeWeight(2);
fill(255);
var vol = amp.getLevel();
var diam1 = map(vol, 0, 0.3, 40, 120);
ellipse(x, y - 15, diam1, diam1 - 20);
ellipse(x, y - 15, 5);
ellipse(x + 100, y - 15, diam1, diam1 - 20);
ellipse(x + 100, y - 15, 5);
}
function head() {
fill(255);
rect(x + 50, y, 200, 250, 150, 150, 70, 70);
}
function eyebrows() {
curve(x, y - 50, x, y - 55, x + 20, y - 60, x + 100, y - 50);
curve(x + 100, y - 50, x + 100, y - 55, x + 120, y - 60, x + 150, y + 50);
}
function mouth() {
var vol = amp.getLevel();
var m = map(vol, 0, 0.3, 15, 80);
strokeWeight(m);
curve(x + 30, y + 100, x + 30, y + 90, x + 50, y + 95, x + 130, y + 100);
}
function draw() {
background(255);
ellipseMode(CENTER);
rectMode(CENTER);
stroke(x / 2, y / 2, x / 2);
head();
eyebrows();
eyes();
mouth();
glasses();
var song;
var button;
var amp;
function setup() {
createCanvas(200, 200);
song = loadSound("aha.mp3", loaded);
amp = new p5.Amplitude();
background(51);
}
function loaded() {
button = createButton("play");
button.mousePressed(togglePlaying);
}
function draw() {
background(51);
var vol = amp.getLevel();
var diam = map(vol, 0, 0.3, 10, 200);
fill(255, 0, 255);
ellipse(width / 2, height / 2, diam, diam);
}
function togglePlaying() {
if (!song.isPlaying()) {
song.play();
song.setVolume(0.3);
button.html("pause");
} else {
song.stop();
button.html("play");
}
var song;
var button;
var amp;
function setup() {
createCanvas(200, 200);
song = loadSound("aha.mp3", loaded);
amp = new p5.Amplitude();
background(51);
}
function loaded() {
button = createButton("play");
button.mousePressed(togglePlaying);
}
function draw() {
background(51);
var vol = amp.getLevel();
var diam = map(vol, 0, 0.3, 10, 200);
fill(255, 0, 255);
ellipse(width / 2, height / 2, diam, diam);
}
function togglePlaying() {
if (!song.isPlaying()) {
song.play();
song.setVolume(0.3);
button.html("pause");
} else {
song.stop();
button.html("play");
}
}function setup() { 
createCanvas(400, 400);
} 
function head() {
strokeWeight(15);
ellipseMode(CENTER);
rectMode(CENTER); 
fill (200,250,0);
rect(200,200,200,250, 150,150,70,70);
}
function eyebrow() {
strokeWeight(15);
ellipseMode(CENTER);
rectMode(CENTER); 
curve(150, 150, 150, 145, 170, 140, 250, 150);
}
function eyebrow1() {
push();
translate(420,0); 
scale(-1,1); 
strokeWeight(15);
ellipseMode(CENTER);
rectMode(CENTER); 
curve(150, 150, 150, 145, 170, 140, 250, 150);
pop();
}
function eyebrow2() {
strokeWeight(15);
curve(250, 150, 250, 145, 270, 140, 300, 250);
}
function eyes(){
ellipseMode(CENTER);
rectMode(CENTER); 
strokeWeight(2);
fill(255);
ellipse(150, 185, 40, 20);
ellipse(150,185,5);
ellipse(250, 185, 40, 20);
ellipse(250,185,5);
}
function mouth() {
ellipseMode(CENTER);
rectMode(CENTER); 
strokeWeight(15);
curve (180, 300, 180, 290, 200, 295, 280, 300); 
}
function glasses() {
ellipseMode(CENTER);
rectMode(CENTER); 
strokeWeight(4);
noFill();
rect(mouseX,mouseY,80,60,20);
line(mouseX+40,mouseY,mouseX+60,mouseY);
rect(mouseX+100,mouseY,80,60,20);
stroke(mouseX/2,mouseY/2, mouseX/2);
}
function draw() { 
background(255);
head();
eyebrow();
mouth();
eyesTrack();
glassesTrack();
eyebrowTrack();
}
function eyebrowTrack() {
if(mouseX >= width/3 && mouseX <= 2*width/3 && mouseY >= width/5 && mouseY <= 3*width/5) {
eyebrow2();
} else {
eyebrow1();
}
}
function glassesTrack() {
if(mouseX >= width/3 && mouseX <= 2*width/3 && mouseY >= width/5 && mouseY <= 3*width/5) {
push();
scale(2, 2);
translate(-100,-100);
glasses();
pop();
} else {
glasses();
}
}
function eyesTrack() {
if(mouseX >= width/3 && mouseX <= 2*width/3 && mouseY >= width/5 && mouseY <= 3*width/5) {
push();
scale(2, 2);
translate(-100,-100);
eyes();
pop();
} else {
eyes();
}
}
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(255);
ellipseMode(CENTER);
rectMode(CENTER); 
fill (200,250,0);
rect(200,200,200,250, 150,150,70,70);
curve(150, 150, 150, 145, 170, 140, 250, 150);
curve(250, 150, 250, 145, 270, 140, 300, 250);
strokeWeight(2);
fill(255);
ellipse(150, 185, 40, 20);
ellipse(150,185,5);
ellipse(250, 185, 40, 20);
ellipse(250,185,5);
strokeWeight(15);
curve (180, 300, 180, 290, 200, 295, 280, 300);
strokeWeight(4);
noFill();
rect(mouseX,mouseY,80,60,20);
line(mouseX+40,mouseY,mouseX+60,mouseY);
rect(mouseX+100,mouseY,80,60,20);
stroke(mouseX/2,mouseY/2, mouseX/2);
if 
}
let userInput
function setup() { 
noCanvas();
userInput=select('#userinput');
userInput.changed(goWiki);
goWiki();
} 
function goWiki(){
let term = userInput.value();
let url=searchUrl + term;
loadJSON(url,gotData, 'jsonp');
}
function gotData(data) {
console.log(data);
}
function draw() { 
background(220);
goWiki();
gotData();
textSize(10);
text(data, 10,10);
let userInput;
let counter = 0;
function setup() {
noCanvas();
userInput = select('#userinput');
userInput.changed(startSearch);
function startSearch() {
counter = 0;
goWiki(userInput.value());
}
function goWiki(term) {
counter = counter + 1;
if (counter < 10) {
let url = searchUrl + term;
loadJSON(url, gotSearch, 'jsonp');
}
}
function gotSearch(data) {
console.log(data);
let len = data[1].length;
let index = floor(random(len));
let title = data[1][index];
title = title.replace(/\s+/g, '_');
createDiv(title);
console.log('Querying: ' + title);
let url = contentUrl + title;
loadJSON(url, gotContent, 'jsonp');
}
function gotContent(data) {
let page = data.query.pages;
let pageId = Object.keys(data.query.pages)[0];
console.log(pageId);
let content = page[pageId].revisions[0]['*'];
console.log(content);
let wordRegex = /\b\w{4,}\b/g;
let words = content.match(wordRegex);
let word = random(words);
goWiki(word);
console.log(word);
}
let userInput
function setup() { 
noCanvas();
userInput=select('#userinput');
userInput.changed(goWiki);
goWiki();
function goWiki(){
let term = userInput.value();
let url=searchUrl + term;
loadJSON(url,gotData, 'jsonp');
}
function gotData(data) {
console.log(data);
}
} 
function draw() { 
background(220);
}let mapimg;
function preload (){
}
function setup() { 
createCanvas(600, 600);
image(mapimg,0,0);
} 
function draw() { 
background(220);
var latestData = "waiting for data";
let x = 180;
let y = 180;
let xspeed = 9;
let yspeed = 10;
let diam;
function setup() {
createCanvas(windowWidth, windowHeight);
background(255);
}
function draw() {
display();
bounce();
}
function display() {
let mappedData = map(latestData, 0,255,10,300);
var diam = mappedData; 
fill(random(10, 16), random(120, 250), random(115, 245));
noStroke();
ellipse(x, y, diam, diam);
xspeed = bounce(x, xspeed, 0, width);
x += xspeed;
yspeed = bounce(y, yspeed, 0, height);
y += yspeed;
}
function bounce(position, speed, min, max) {
if (position < min || position > max) {
speed *= -1;
}
return speed;
}
function mousePressed() {
background(255);
}
function gotData() {
var latestData = "waiting for data";
let x = 180;
let y = 180;
let xspeed = 9;
let yspeed = 10;
let diam;
function setup() {
createCanvas(windowWidth, windowHeight);
background(255);
}
function draw() {
display();
bounce();
}
function display() {
let mappedData = map(latestData, 0,255,10,300);
var diam = mappedData; 
fill(random(10, 16), random(120, 250), random(115, 245));
noStroke();
ellipse(x, y, diam, diam);
xspeed = bounce(x, xspeed, 0, width);
x += xspeed;
yspeed = bounce(y, yspeed, 0, height);
y += yspeed;
}
function bounce(position, speed, min, max) {
if (position < min || position > max) {
speed *= -1;
}
return speed;
}
function mousePressed() {
background(255);
}
function gotData() {
function setup() { 
createCanvas(600, 600);
noFill();
strokeWeight(10);
} 
function draw() { 
let latestCol = map(latestData,50,400,100,255);
background(latestCol, latestCol, 127);
let mappedData = map(latestData, 50,400,100,300);
var v = mappedData; 
var origV = v;
ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);
ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
v+=random(-5, 5);
bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);
bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
}
function gotData() {
}
function setup() {
createCanvas(windowWidth, windowHeight);
}
function gotData() {
}
function draw() {
background(255, 255, 255);
fill(0, 0, 0);
var mappedVar = map(latestData, 300, 400, 0, width);
ellipse(mappedVar, 100, 50, 50);
text(latestData, 10, 10);
function setup() { 
createCanvas(600, 600);
noFill();
strokeWeight(10);
} 
function draw() { 
let latestCol = map(latestData,50,400,100,255);
background(latestCol, latestCol, 127);
let mappedData = map(latestData, 50,400,100,300);
var v = mappedData; 
var origV = v;
ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);
ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
v+=random(-5, 5);
bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);
bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
}
function gotData() {
}
let x = 180;
let y = 180;
let xspeed = 9;
let yspeed = 10;
let diam;
function setup() {
createCanvas(windowWidth, windowHeight);
background(141,205,245);
}
function draw() {
display();
bounce();
}
function display() {
diam = dist(windowWidth, windowHeight, mouseX, mouseY);
fill(random(10, 16), random(120, 250), random(115, 245));
noStroke();
ellipse(x, y, diam, diam);
xspeed = bounce(x, xspeed, 0, width);
x += xspeed;
yspeed = bounce(y, yspeed, 0, height);
y += yspeed;
}
function bounce(position, speed, min, max) {
if (position < min || position > max) {
speed *= -1;
}
return speed;
}
function mousePressed() {
background(141,205,245);
}let str="blah. blah. blah";
let segments=[];
function setup() { 
createCanvas(400, 400);
segments=str.split(".");
segments=str.split("s");
} 
function draw() { 
background(220);
text (str, s
}let a;
let b;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
a = mouseX;
b = mouseY;
console.log(a + "+" + b + "=" + sum(a, b));
}
function sum(a, b) {
return a + b;
}let fall=[];
function setup() { 
createCanvas(400, 400);
for (let i=0;i<200;i++){
fall[i]=new Fall();
} 
}
function draw() { 
background(220);
for(let i=0;i<fall.length;i++){
fall[i].drop();
fall[i].display();
}
}
function mousePressed(){
fall.push(new Fall());
}let fall=[];
function setup() { 
createCanvas(400, 400);
for (let i=0;i<200;i++){
fall[i]=new Fall();
} 
}
function draw() { 
background(220);
for(let i=0;i<fall.length;i++){
fall[i].drop();
fall[i].display();
}
}let fall=[];
function setup() { 
createCanvas(400, 400);
for (let i=0;i<200;i++){
fall[i]=new Fall();
} 
}
function draw() { 
background(220);
for(let i=0;i<fall.length;i++){
fall[i].drop();
fall[i].display();
}
}var drops = [];
function setup() {
createCanvas(640, 360);
for (var i = 0; i < 200; i++) {
drops[i] = new Drop();
}
}
function draw() {
background(230, 230, 250);
for (var i = 0; i < drops.length; i++) {
drops[i].fall();
drops[i].show();
}
}let letters=[];
function setup() { 
createCanvas(400, 400);
for (let i=0;i<100;i++){
letters[i]=new Letter();
}
} 
function draw() { 
background(220);
for (let i=0;i<letters.length;i++){
letters[i].move();
letters[i].display();
}
}
function Letter(){
this.x=random(0,width);
this.y=random(0,height);
this.display=function(){
stroke(5);
fill(255,0,0);
textSize(32);
text("<3",this.x,this.y);
}
this.move=function(){
this.x=this.x+random(-1,1);
this.y=this.y+random(-1,1);
}
}let ball;
let balls=[];
function setup() { 
createCanvas(400, 400);
for(i=0;i<2;i++){
ball=new Ball(random(width),random(height),random(-5,5),random(-3,3));
balls.push(ball);
}
} 
function draw() { 
background(220);
for(i=0;i<=(balls.length - 1);i++){
balls[i].run();
}
}
function bounce(pos,speed,min,max){
if(pos<min||pos>max){
speed*=-1;
}
return speed;
}let x = 180;
let y = 180;
let xspeed = 9;
let yspeed = 10;
let diam = 100;
function setup() {
createCanvas(windowWidth, windowHeight);
}
function draw() {
background(25);
display();
bounce();
update();
}
function update() {
xspeed = bounce(x, xspeed, 0, width);
x += xspeed;
yspeed = bounce(y, yspeed, 0, height);
y += yspeed;
}
function display() {
fill(255);
ellipse(x, y, diam, diam);
}
function bounce(position, speed, min, max) {
if (position < min || position > max) {
speed *= -1;
}
return speed;
}let x = 180;
let y = 180;
let xspeed = 9;
let yspeed = 10;
let diam;
function setup() {
createCanvas(windowWidth, windowHeight);
background(141,205,245);
}
function draw() {
display();
bounce();
}
function display() {
diam = dist(windowWidth, windowHeight, mouseX, mouseY);
fill(random(10, 16), random(120, 250), random(115, 245));
noStroke();
ellipse(x, y, diam, diam);
xspeed = bounce(x, xspeed, 0, width);
x += xspeed;
yspeed = bounce(y, yspeed, 0, height);
y += yspeed;
}
function bounce(position, speed, min, max) {
if (position < min || position > max) {
speed *= -1;
}
return speed;
}
function mousePressed() {
background(141,205,245);
}let x = 180;
let y = 180;
let xspeed = 9;
let yspeed = 10;
let diam;
function setup() {
createCanvas(windowWidth, windowHeight);
background(218,214, 214);
}
function draw() {
display();
bounce();
}
function display() {
diam = dist(windowWidth, windowHeight, mouseX, mouseY);
fill(random(10, 16), random(120, 250), random(115, 245));
noStroke();
ellipse(x, y, diam, diam);
xspeed = bounce(x, xspeed, 0, width);
x += xspeed;
yspeed = bounce(y, yspeed, 0, height);
y += yspeed;
}
function bounce(position, speed, min, max) {
if (position < min || position > max) {
speed *= -1;
}
return speed;
}
function mousePressed() {
background(218,214, 214);
}let x = 180;
let y = 180;
let xspeed = 9;
let yspeed = 10;
let diam;
function setup() {
createCanvas(windowWidth, windowHeight);
background(255);
}
function draw() {
display();
bounce();
}
function display() {
diam = dist(windowWidth, windowHeight, mouseX, mouseY);
fill(random(10, 16), random(120, 250), random(115, 245));
noStroke();
ellipse(x, y, diam, diam);
xspeed = bounce(x, xspeed, 0, width);
x += xspeed;
yspeed = bounce(y, yspeed, 0, height);
y += yspeed;
}
function bounce(position, speed, min, max) {
if (position < min || position > max) {
speed *= -1;
}
return speed;
}
function mousePressed() {
background(255);
}let ball;
let balls=[];
function setup() { 
createCanvas(400, 400);
for(i=0;i<10;i++){
ball=new Ball(random(width),random(height),random(-5,5),random(-3,3));
balls.push(ball);
}
} 
function draw() { 
background(220);
for(i=0;i<=(balls.length - 1);i++){
balls[i].run();
}
}
function bounce(pos,speed,min,max){
if(pos<min||pos>max){
speed*=-1;
}
return speed;
}var x,y,xspeed,yspeed;
function setup() { 
createCanvas(400, 400);
x = width/2;
y = height/2;
xspeed = 1;
yspeed = 3;
} 
function draw() { 
background(220);
xspeed=bounce(x,xspeed,0,width);
yspeed=bounce(y,yspeed,0,height);
bounce();
x += xspeed;
y += yspeed;
ellipse(x,y, 50, 50);
}
function bounce(pos,speed,min,max){
if(pos<min||pos>max){
speed*=-1;
}
return speed;
}let x = 180;
let y = 180;
let xspeed = 9;
let yspeed = 10;
let diam = 100;
function setup() {
createCanvas(windowWidth, windowHeight);
background(25);
}
function draw() {
display();
bounce();
}
function display() {
fill(255);
ellipse(x, y, diam, diam);
xspeed = bounce(x, xspeed, 0, width);
x += xspeed;
yspeed = bounce(y, yspeed, 0, height);
y += yspeed;
}
function bounce(position, speed, min, max) {
if (position < min || position > max) {
speed *= -1;
}
return speed;
}let x = 180;
let y = 180;
let xspeed = 9;
let yspeed = 10;
let diam;
function setup() {
createCanvas(windowWidth, windowHeight);
background(25, 40, 78);
}
function draw() {
display();
bounce();
}
function display() {
diam = dist(windowWidth, windowHeight, mouseX, mouseY);
fill(random(100,155),random(200,255),random(250,255));
noStroke();
ellipse(x, y, diam, diam);
xspeed = bounce(x, xspeed, 0, width);
x += xspeed;
yspeed = bounce(y, yspeed, 0, height);
y += yspeed;
}
function bounce(position, speed, min, max) {
if (position < min || position > max) {
speed *= -1;
}
return speed;
}
function mousePressed(){
background(0);
}let x = 180;
let y = 180;
let xspeed = 9;
let yspeed = 10;
let diam = 100;
function setup() {
createCanvas(windowWidth, windowHeight);
background(25);
}
function draw() {
fill(255);
ellipse(x, y, diam, diam);
x = x + xspeed;
if (x > windowWidth || x < 0) {
xspeed = -xspeed;
}
y = y + yspeed;
if (y > windowHeight || y < 0) {
yspeed = -yspeed;
}
}let x = 180;
let y = 180;
let xspeed = 9;
let yspeed = 10;
let diam;
let col;
let r = (100, 250);
let g = (100, 250);
let b = (100, 250);
function setup() {
createCanvas(windowWidth, windowHeight);
background(25, 40, 78);
}
function draw() {
display();
bounce();
}
function display() {
diam = dist(windowWidth, windowHeight, mouseX, mouseY);
col = dist(random(r, g, b), random(r, g, b), mouseX, mouseY);
fill(col);
ellipse(x, y, diam, diam);
xspeed = bounce(x, xspeed, 0, width);
x += xspeed;
yspeed = bounce(y, yspeed, 0, height);
y += yspeed;
}
function bounce(position, speed, min, max) {
if (position < min || position > max) {
speed *= -1;
}
return speed;
}
function mousePressed(){
background(0);
}let max_distance;
function setup() { 
createCanvas(400, 400);
noStroke();
max_distance = dist(0, 0, width, height);
} 
function draw() { 
background(220);
for(let i = 0; i <= width; i+=20) {
for(let j = 0; j <= height; j+=20) {
let size = dist(mouseX, mouseY, i, j);
ellipse(i, j, size, size);
}
}
}let numCols=40;
let numRows=40;
let cn;
let rn;
let horDiam;
let verDiam;
let xspeed;
let yspeed;
function setup() { 
createCanvas(400, 400);
horDiam=width/numCols;
verDiam=height/numRows;
xspeed=10;
yspeed=xspeed/2;
} 
function draw() { 
background(220);
display();
}
function display() {
fill(255,0,0);
noStroke();
for(let cn=0; cn<numCols; cn++){
x=cn*horDiam;
xspeed = bounce(x, xspeed, 0, horDiam*numCols);
x+=xspeed;
for(let rn=0;rn<numRows;rn++){
y=rn*verDiam;
yspeed = bounce(y, yspeed, 0, verDiam*numCols);
y+=yspeed;
ellipse(x,y,horDiam,verDiam);
}
}
}
function bounce(position, speed, min, max){
if(position < min || position > max) {
speed *= -1; 
}
return speed; 
}
let xSpeed;
let ySpeed;
let xSpeed2;
let ySpeed2;
let x = 50;
let y = 50;
let x2 = 40;
let y2 = 40;
function setup() {
createCanvas(400, 400);
xSpeed = 3;
ySpeed = xSpeed / 2;
xSpeed2 = 4;
ySpeed2 = ySpeed / 3;
}
function draw() {
background(220);
fill(255);
ellipse(x, y, 50);
ellipse(x2, y2, 50);
x = x + xSpeed;
y = y + ySpeed;
x2 = x2 + xSpeed2;
y2 = y2 + ySpeed2;
xSpeed = bounce(x, xSpeed, 0, width);
ySpeed = bounce(y, ySpeed, 0, height);
xSpeed2 = bounce(x2, xSpeed2, 0, width);
ySpeed2 = bounce(y2, ySpeed2, 0, width);
}
function bounce(loc, speed, bottom, top) {
if (loc < bottom || loc > top) {
speed *= -1;
}
return speed;
}let xSpeed;
let ySpeed;
let x = 50;
let y = 50;
function setup() {
createCanvas(400, 400);
xSpeed = 3;
ySpeed = xSpeed / 2;
}
function draw() {
background(220);
fill(255);
x = x + xSpeed;
y = y + ySpeed;
xSpeed = bounce(x, xSpeed, 0, width);
ySpeed = bounce(y, ySpeed, 0, height);
ellipse(x, y, 50);
}
function bounce(loc, speed, bottom, top) {
if (loc < bottom || loc > top) {
speed *= -1;
}
return speed;
}let numCols = 10;
let numRows = 5;
let cn;
let cw;
let rn;
let rh;
function setup() {
createCanvas(400, 400);
cw = width / numCols;
rh = height / numRows;
}
function draw() {
background(220);
fill(255);
for (let cn = 0; cn < numCols; cn++) {
x = cn * cw;
for (let rn = 0; rn < numRows; rn++) {
y = rn * rh;
rect(x, y, cw, rh);
}
}
}
createCanvas(400, 400);
let	x = milesToKm(26.3);
console.log(x);
} 
function draw() { 
background(220);
}
function milesToKm(miles) {
let km = miles * 1.6;
return km;
}let x;
let y;
let cn;
let cw;
let ch;
let numCols=10;
let numRows=5;
let rh;
function setup() { 
createCanvas(400, 400);
cw=width/numCols;
rh=height/numRows;
} 
function draw() { 
background(220);
for(let x=0;cw<=width;cw++){
rect(x
for(let y=0;rh<=height;rh++){
stroke(5);
rect(x,y,
}
}
}let isOn = false;
let isEntered = false;
let r;
let g;
let b;
function setup() {
createCanvas(600, 400);
}
function draw() {
background(255);
noStroke();
fill(255);
for (i = 0; i < 8; i++) {
if (isOn) {
fill(255);
}
if (mouseX < i * (width / 7)) {
if (pmouseX > i * (width / 7) && pmouseX < i * (width / 7)) {
isOn = !isOn;
}
} else if (mouseX <= (i + 1) * width / 7 && mouseX > i * (width / 7)) {
fill(r, g, b);
isEntered = !isEntered;
r = mouseX / 2;
g = mouseY / 4;
b = mouseX / 6;
rect(i * (width / 7), i * (height / 7), width / 7, height / 7);
}
}
}
function mousePressed(){
background (255,0,0);
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
stroke(1);
for (i = 0; i < 10; i++) {
line(i * (width / 10), 0, i * (width / 10), height);
}
for (i = 0; i < 10; i++) {
line(0, i * (height / 10), width, i * (height / 10));
}
}let r;
let g;
let b;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
fill(255);
for (let i = 0; i < 10; i++) {
if (mouseX >= i * (width / 10)&&mouseX<(i+1)*(width/10)) {
fill(255);
}
else if (mouseX >= (i+1)* (width / 10)&&mouseX<(i+2)*(width/10)) {
fill(r, g, b);
r=mouseX/3;
g=mouseY/6;
b=mouseX/8;
}
rect(i * 1 / 10 * width, 0, width / 10, height);
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
for (let i = 0; i < 10; i++) {
if (mouseX >= (i) * (width / 10)&&mouseX<(i+1)*(width/10)&&i%2==0) {
fill(255, 0, 0);
} else if (mouseX >= i* (width / 10)&&mouseX<(i+1)*(width/10)&&i%2==1) {
fill(0, 0, 255);
} else {
fill(255);
}
rect(i * 1 / 10 * width, 0, width / 10, height);
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
for (let i = 0; i < 10; i++) {
if (mouseX >= i * width / 10 && i < 5) {
fill(255, 0, 0);
} else if (mouseX >= i * width / 10 && i >= 5) {
fill(0, 0, 255);
} else {
fill(255);
}
rect(i * 1 / 10 * width, 0, width / 10, height);
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
for (let i = 0; i < 10; i++) {
if (mouseX >= i * width / 10 && i != 7) {
fill(255, 0, 0);
} else {
fill(255);
}
rect(i * 1 / 10 * width, 0, width / 10, height);
}
}let rect1 = false;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
noStroke();
fill(255, 0, 0);
if (rect1) {
rect(0, 0, width / 3, height);
}
if (mouseX < width / 3) {
if (pmouseX >= width / 3) {
rect1 = !rect1;
}
}
if (mouseX > width / 3 && mouseX < 2 * width / 3) {
rect(width / 3, 0, width / 3, height);
} else if (mouseX > 2 * width / 3) {
rect(2 * width / 3, 0, width / 3, height);
}
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
noStroke();
fill(255,0,0);
if(mouseX<width/3){
rect(0,0,width/3,height);
}
else if (mouseX>width/3&&mouseX<2*width/3){
rect(width/3,0,width/3,height);
}
else if (mouseX>2*width/3){
rect(2*width/3,0,width/3,height);
}
}var bright0 = 0;
var bright1 = 0;
var bright2 = 0;
var bright3 = 0;
var bright4 = 0;
var bright5 = 0;
var bright6 = 0;
var bright7 = 0;
var bright8 = 0;
var bright9 = 0;
var bright10 = 0;
var d;
function setup() {
createCanvas(500, 360);
d = 25;
}
function draw() {
background(255);
if (mouseX <= width / 14) {
bright0 = 200;
} else if (mouseX > width / 14 && mouseX <= 2 * width / 14) {
bright1 = 200;
} else if (mouseX > 2 * width / 14 && mouseX <= 3 * width / 14) {
bright2 = 200;
} else if (mouseX > 3 * width / 14 && mouseX <= 4 * width / 14) {
bright3 = 200;
} else if (mouseX > 5 * width / 14 && mouseX <= 6 * width / 14) {
bright4 = 200;
} else if (mouseX > 6 * width / 14 && mouseX <= 7 * width / 14) {
bright5 = 200;
} else if (mouseX > 7 * width / 14 && mouseX <= 8 * width / 14) {
bright6 = 200;
} else if (mouseX > 9 * width / 14 && mouseX <= 10 * width / 14) {
bright7 = 200;
} else if (mouseX > 10 * width / 14 && mouseX <= 11 * width / 14) {
bright8 = 200;
} else if (mouseX > 11 * width / 14 && mouseX <= 12 * width / 14) {
bright9 = 200;
} else if (mouseX > 13 * width / 14 && mouseX <= 14 * width / 14) {
bright10 = 200;
}
bright0 = bright0 + 2;
bright1 = bright1 + 2;
bright2 = bright2 + 2;
bright3 = bright3 + 2;
bright4 = bright4 + 2;
bright5 = bright5 + 2;
bright6 = bright6 + 2;
bright7 = bright7 + 2;
bright8 = bright8 + 2;
bright9 = bright9 + 2;
bright10 = bright10 + 2;
for (var i = 0; i <= 10; i++) {
noStroke();
fill(bright0);
ellipse(0, i * 40, d);
fill(bright1);
ellipse(50, i * 40, d);
fill(bright2);
ellipse(100, i * 40, d);
fill(bright3);
ellipse(150, i * 40, d);
fill(bright4);
ellipse(200, i * 40, d);
fill(bright5);
ellipse(250, i * 40, d);
fill(bright6);
ellipse(300, i * 40, d);
fill(bright7);
ellipse(350, i * 40, d);
fill(bright8);
ellipse(400, i * 40, d);
fill(bright9);
ellipse(450, i * 40, d);
fill(bright10);
ellipse(500, i * 40, d);
}
}let x;
let y;
function setup() {
createCanvas(400, 400);
x = width / 6;
y = height / 2;
rectMode(CENTER);
}
function mousePressed() {
rect(x, y, width / 3, height)
fill(220);
}
function draw() {
background(220);
fill(255, 69, 0);
noStroke();
if (mouseX < width / 3) {
rect(0, y, mouseX, height);
}
else if (mouseX >= width / 3)
rect(x, y, width / 3, height);
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
for (let i = 0; i<10; i++) {
if(mouseX>=i*width/10){
fill(255,0,0);
}
else{
fill(255);
}
rect(i * 1 / 10 * width, 0, width / 10, height);
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
for (let i = 0; i <= width; i += 40) {
rect(i, 0, width / 10, height);
}
}let isOn = false;
let isEntered = false;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
fill(255, 0, 0)
noStroke();
if (isOn) {
rect(0, 0, width / 3, height);
}
if (mouseX < width / 3) {
if (pmouseX > width / 3) {
isEntered = true;
isOn = !isOn;
}
rect(0, 0, width / 3, height);
} else if (mouseX >= width / 3 && mouseX <= 2 * width / 3) {
rect(width / 3, 0, width / 3, height);
} else {
rect(2 * width / 3, 0, width / 3, height);
}
}let x;
let justHitRightWall
let xspeed;
function setup() { 
createCanvas(400, 400);
x=width/2;
xspeed=5;
} 
function draw() { 
background(220);
if (x>width || x<0) {
xspeed *=-1;}
x+=xspeed;
ellipse (x, height/2, 50, 50);
}let circle1={
x:150,
y:150,
diameter:10
}
let col;
let r;
let b;
let g;
function setup() { 
createCanvas(400, 400);
r=width/2;
b=width/2;
} 
function draw() {
noStroke;
strokeWeight(0);
col=map (mouseX,0,400,150,255);
background(col,r/4,b);
fill(col,r,b);
ellipse (mouseX,circle1.y,circle1.diameter,random(200));
ellipse (pmouseX,circle1.y,mouseX, circle1.diameter,random(50));
}let circle1={
x:150,
y:150,
diameter:10
}
let circle2={
x:0,
y:150,
diameter:15,
}
let circle3={
x:400,
y:150,
diameter:15,
}
let spot={
x: 50,
y: 60
}
let col;
let r;
let b;
let g;
function setup() { 
createCanvas(400, 400);
r=width/2;
b=width/2;
} 
function draw() {
noStroke;
strokeWeight(0);
col=map (mouseX,0,400,150,255);
background(col,r/4,b);
fill(col,r,b);
ellipse (mouseX,circle1.y,circle1.diameter,random(200));
ellipse (pmouseX,circle1.y,mouseX, circle1.diameter,random(50));
ellipse (circle2.x,circle2.y,random(59));
circle2.x=circle2.x+1;
circle2.y=circle2.x+1;
ellipse (circle3.x,circle3.y,random(59));
circle3.x=circle3.x-1;
circle3.y=circle3.x-1;
}let circle1={
x:150,
y:150,
diameter:10
}
let circle2={
x:0,
y:150,
diameter:15,
}
let circle3={
x:400,
y:150,
diameter:15,
}
let spot={
x: 50,
y: 60
}
let col;
let r;
let b;
let g;
function setup() { 
createCanvas(400, 400);
r=width/2;
b=width/2;
} 
function draw() {
noStroke;
strokeWeight(0);
col=map (mouseX,0,400,150,255);
background(col,r/4,b);
fill(col,r,b);
ellipse (mouseX,circle1.y,circle1.diameter,random(200));
ellipse (pmouseX,circle1.y,mouseX, circle1.diameter,random(50));
ellipse (circle2.x,circle2.y,random(59));
circle2.x=circle2.x+1;
circle2.y=circle2.x+1;
ellipse (circle3.x,circle3.y,random(59));
circle3.x=circle3.x-1;
circle3.y=circle3.x-1;
spot.x=random(10,width);
spot.y=random(10,height);
fill (col);
ellipse(spot.x,spot.y,random(10));
}let x;
let y;
let xspeed;
let yspeed;
function setup() { 
createCanvas(400, 400);
x=width/2;
y=height/2;
xspeed=-10;
yspeed=xspeed;
} 
function draw() { 
background(220);
ellipse(x-50,y-50,50);
x+=xspeed;
y+=yspeed;  
}let x;
let y;
let xspeed;
let yspeed;
function setup() { 
createCanvas(400, 400);
x=width/2;
y=height/2;
xspeed=-1;
yspeed=xspeed;
} 
function draw() { 
background(220);
ellipse(x-50,y-50,50);
x+=xspeed;
y+=yspeed;  
}let x;
let xspeed;
function setup() { 
createCanvas(400, 400);
x=width/2;
xspeed=-1;
} 
function draw() { 
background(220);
ellipse(x-50,50,50);
x+=xspeed;
}let x;
function setup() { 
createCanvas(400, 400);
x=width/2
} 
function draw() { 
background (220);
ellipse(x,200, 50, 50);
x++
}
function setup() { 
createCanvas(windowWidth, windowHeight);
rectMode (CENTER);
console.log(width,height);
} 
function draw() { 
background(220);
line(width/4,height/4,width*(3/4),height/4);
line(width*(3/4),height/4,width*(3/4),height*(3/4));
line(width*(3/4),height*(3/4),width/4,height*(3/4));
line(width/4,height*(3/4),width/4,height/4);
}  var x;
var y;
function setup() { 
createCanvas(800, 600);
background(220);
x = width/2;
y = height/2
rectMode(CENTER);
} 
function draw() {
rect(x, y, 100,100);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(255);
ellipseMode(CENTER);
rectMode(CENTER); 
fill (200,250,0);
rect(200,200,200,250, 150,150,70,70);
curve(150, 150, 150, 145, 170, 140, 250, 150);
curve(250, 150, 250, 145, 270, 140, 300, 250);
strokeWeight(2);
fill(255);
ellipse(150, 185, 40, 20);
ellipse(150,185,5);
ellipse(250, 185, 40, 20);
ellipse(250,185,5);
strokeWeight(15);
curve (180, 300, 180, 290, 200, 295, 280, 300);
strokeWeight(4);
noFill();
rect(mouseX,mouseY,80,60,20);
line(mouseX+40,mouseY,mouseX+60,mouseY);
rect(mouseX+100,mouseY,80,60,20);
stroke(mouseX/2,mouseY/2, mouseX/2);
}
function setup() {
createCanvas(500, 300);
background(255);
}
function draw (){
rectMode(CENTER);
noFill();
strokeWeight(2);
stroke(10);
rect(mouseX,mouseY,60,60);
line(mouseX+30,mouseY,mouseX+50,mouseY);
rect(mouseX+80,mouseY,60,60);
fill(0); 
ellipse(221, 115, 16, 32); 
ellipse(270, 115, 16, 32);
triangle(245,145,240,150,250,150); 
noFill();
beginShape();
curveVertex(225,  160);
curveVertex(230,  165);
curveVertex(235,  170);
curveVertex(240,  175);
curveVertex(245,  180);
curveVertex(250,  180);
curveVertex(255,  175);
curveVertex(260,  170);
curveVertex(265,  165);
curveVertex(270, 160);
endShape();
}
function keyPressed() {
background (255);
}function setup() {
createCanvas(500, 300);
background(255);
}
function draw (){
rectMode(CENTER);
noFill();
strokeWeight(2);
stroke(10);
rect(mouseX,mouseY,60,60,20,20);
line(mouseX+30,mouseY,mouseX+50,mouseY);
rect(mouseX+80,mouseY,60,60,20,20);
fill(0); 
ellipse(221, 115, 16, 32); 
ellipse(270, 115, 16, 32);
triangle(245,145,240,150,250,150); 
noFill();
beginShape();
curveVertex(225,  160);
curveVertex(230,  165);
curveVertex(235,  170);
curveVertex(240,  175);
curveVertex(245,  180);
curveVertex(250,  180);
curveVertex(255,  175);
curveVertex(260,  170);
curveVertex(265,  165);
curveVertex(270, 160);
endShape();
}
function keyPressed() {
background (255);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(64,224,208);
stroke (255,0,0);
strokeWeight(30);
line(0, 0, 400, 400);
fill(0,240,0);
stroke(0,240,0);
ellipse(200, 200, 300, 150);
fill(0,0,255);
strokeWeight(0);
rect(325,165,40,40);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
fill(0,240,0);
stroke(220);
ellipse(200, 200, 100, 100);
}function setup() { 
createCanvas(500,500);
} 
function draw() { 
background(220);
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
fill(255,0,0);
ellipse(200, 200, 100, 100);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
stroke(128,255,0);
strokeWeight(10);
rect(90,45,75,40);
ellipse(200,200,30,);
fill(255,0,0);
noFill();
stroke(255,0,0);
}