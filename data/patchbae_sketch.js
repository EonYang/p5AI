function setup() {
createCanvas(500, 500);
}
function draw() {
background(0, 0, 0);
fill(0);
spacedCircles();
}
function spacedCircles() {
fill(255, 0, 0);
var maxD = 1100;
for (i = 11; i > 0; i--) {
if (i % 2 == 0) {
fill(0, 255, 0);
ellipse(width/2 + (maxD/TWO_PI) + PI, height / 2, maxD, maxD);
} else {
fill(0, 0, 255);
ellipse(width / 2 - (maxD / TWO_PI), height / 2, maxD, maxD);
}
maxD = maxD / 2;
}
}let i = 400;
let initial_i = i;
let offset = -1;
let init_r = 255;
let init_g = 0;
let init_b = 255;
let opac;
let new_fill;
let fill2;
let rand_opac;
function setup() {
background(0, 0, 0, 255);
new_fill = color(init_r, init_g, init_b, 255);
fill2 = color(random(255), random(255), random(255), 255);
noFill();
createCanvas(800, 800);
rectMode(CENTER);
}
function draw() {
opac = random(50) + 50;
circles1(random(38));
if (i < 5) {
i = 400;
new_fill = color(random(255), random(255), random(255), 255);
fill2 = color(random(255), random(255), random(255), 255);
}
i=i-25;
}
function circles1(size) {
stroke(new_fill);
var rando = random(i);
strokeWeight(1);
rect(sin(rando)*width, i, size, size);
rect(width - sin(rando)*width, i, size, size);
stroke(fill2);
var rando1 = random(i);
rect(cos(rando1)*(width-size), height-i, size, size)
rect((width) - cos(rando1)*(width-size), height-i, size, size)
}
function circles2() {
if (i>1) {  
ellipse(i*6, sin(i)*height, i, i)
ellipse(i*6, height - sin(i)*height, i, i)
}
}
function circles3() {
if (i>1) {	
ellipse(width/2, cos(i)*height, i, i)
}
}
function circles4(size) {		
fill(fill2);
var rando1 = random(20);
ellipse(cos(i)*(width-size), height-i, size, size)
ellipse((width) - cos(i)*(width-size), height-i, size, size)
}var value = 0;
function setup() {
createCanvas(displayWidth, displayHeight);
}
function draw() {
background(0);
if (mouseIsPressed) {
value = 255;
fill (value);
rect(0, 0, displayWidth, displayHeight);
}
else {
value = 0;}
}
function touchStarted() {
value = 255;
fill (value);
rect(0, 0, displayWidth, displayHeight);
}
function touchEnded() {
value = 0;
fill (value);
rect(0, 0, displayWidth, displayHeight);
}
var osc;
var playing = false;
var posX;
var posY;
var frequency;
var volume;
function setup() {
createCanvas(displayWidth, displayHeight);
textAlign(CENTER);
osc = new p5.Oscillator();
osc.setType('sine');
osc.freq(240);
osc.amp(0);
osc.start();
}
function draw() {
background(0);
if (rotationX <= 90 && rotationX >= -90){
posY = map(rotationX, -90, 90, 0, height);
}
else if (rotationX > 90) {
posY = height; 
}
else if (rotationX < -90) {
posY = 0;	
}
if (rotationY <= 90 && rotationY >= -90){
posX = map(rotationY, -90, 90, 0, width);
}
else if (rotationY > 90) {
posX = width; 
}
else if (rotationY < -90) {
posX = 0;	
}
fill(255)
ellipse(posX, posY, 10, 10);
text("Please lock your device's orientation.", width/2, 20);
text("Tap the screen to start.", width/2, 40);
text("Move your device to control the tone!", width/2, 60);
text(frequency, width/2, 80);
stroke(255);
}
function deviceMoved() {   
frequency = map(rotationY, -90, 90, 110, 1760);
osc.freq(frequency);
var volume = map(rotationX, -65, 65, 1, 0);
osc.amp(volume, 0.05);
}var canvasWidth = 400;
var canvasHeight = 400;
var cowloopi = 0;
var cowloopcolor;
cowloopdraw = false;
var kick1i = 0;
var kick1color;
kick1draw = false;
var snare1i = canvasWidth / 2;
var snare1color;
snare1draw = false;
var hati = 1;
var hatcolor;
hatdraw = false;
var hit1i = canvasWidth / 2;
var hit1color;
hit1draw = false;
var hit2i = canvasWidth / 2;
var hit2color;
hit2draw = false;
var hit3i = canvasWidth / 2;
var hit3color;
hit3draw = false;
var hit4i = 0;
var hit4color;
hit4draw = false;
var hit5i = canvasHeight / 2;
var hit5color;
hit5draw = false;
var hit6i = canvasHeight / 2;
var hit6color;
hit6draw = false;
var laseri = canvasHeight;
var lasercolor;
laserdraw = false;
var triggeri = 1;
var triggercolor;
triggerdraw = false;
function preload() {
soundFormats('wav');
beep = loadSound('assets/beep.wav');
clap = loadSound('assets/clap.wav');
click = loadSound('assets/click.wav');
cowloop = loadSound('assets/cowloop.wav');
hat = loadSound('assets/hat.wav');
hit1 = loadSound('assets/hit1.wav');
hit2 = loadSound('assets/hit2.wav');
hit3 = loadSound('assets/hit3.wav');
hit4 = loadSound('assets/hit4.wav');
hit5 = loadSound('assets/hit5.wav');
hit6 = loadSound('assets/hit6.wav');
laser = loadSound('assets/laser.wav');
kick1 = loadSound('assets/kick1.wav');
kick2 = loadSound('assets/kick2.wav');
snare1 = loadSound('assets/snare1.wav');
snare2 = loadSound('assets/snare2.wav');
trigger = loadSound('assets/trigger.wav');
shake = loadSound('assets/shake.wav');
snap = loadSound('assets/snap.wav');
}
function setup() {
background(0);
createCanvas(canvasWidth, canvasHeight);
kick1.setVolume(1);
hit2.setVolume(0.5);
}
function draw() {
background(0);
if (cowloopdraw == true) {
cowloop_anim();
}
if (kick1draw == true) {
kick1_anim();
}
if (snare1draw == true) {
snare1_anim();
}
if (hatdraw == true) {
hat_anim();
}
if (hit1draw == true) {
hit1_anim();
}
if (hit2draw == true) {
hit2_anim();
}
if (hit3draw == true) {
hit3_anim();
}
if (hit4draw == true) {
hit4_anim();
}
if (hit5draw == true) {
hit5_anim();
}
if (hit6draw == true) {
hit6_anim();
}
if (laserdraw == true) {
laser_anim();
}
if (triggerdraw == true) {
trigger_anim();
}
}
function keyTyped() {
switch (key) {
case 'q':
kick1.play();
kick1draw = true;
kick1color = color(random(100) + 155, 0, random(88) + 50, 200);
break;
case 'w':
snare1.play();
snare1draw = true;
snare1color = color(random(100) + 155, random(88) + 50, 0, 200);
break;
case 'r':
hat.play();
hatdraw = true;
hatcolor = color(255, 0, 0, 200);
break;
case 't':
hit1.play();
hit1draw = true;
hit1color = color(88, random(88) + 50, random(100) + 155, 255);
break;
case 'y':
hit2.play();
hit2draw = true;
hit2color = color(188, 0, 188, 200);
break;
case 'u':
hit3.play();
hit3draw = true;
hit3color = color(188, 188, 0, 200);
break;
case 'i':
laser.play();
laserdraw = true;
lasercolor = color(0, 255, 0, 200);
break;
case 'o':
trigger.play();
triggerdraw = true;
triggercolor = color(255, 255, 255, 200);
break;
case 'p':
cowloop.play();
cowloopdraw = true;
cowloopcolor = color(255, 255, 0, 200);
break;
case 'g':
hit4.play();
hit4draw = true;
hit4color = color(255, 88, 0, 200);
break;
case 'h':
hit5.play();
hit5draw = true;
hit5color = color(0, 0, 255, 200);
break;
case 'j':
hit6.play();
hit6draw = true;
hit6color = color(0, 255, 255, 200);
break;
case 'p':
value1 = 255;
break;
default:
value = 255;
}
}
function hit1_anim() {
if (hit1draw == true) {
fill(hit1color);
rect(0, hit1i, width, 10);
hit1i = hit1i - 10;
if (hit1i < 0) {
hit1draw = false;
background(0);
hit1i = canvasWidth / 2;
}
}
}
function hit2_anim() {
if (hit2draw == true) {
fill(hit2color);
rect(0, hit2i, width, 10);
hit2i = hit2i - 10;
if (hit2i < 0) {
hit2draw = false;
background(0);
hit2i = canvasWidth / 2;
}
}
}
function hit3_anim() {
if (hit3draw == true) {
fill(hit3color);
rect(0, hit3i, width, 10);
hit3i = hit3i - 10;
if (hit3i < 0) {
hit3draw = false;
background(0);
hit3i = canvasWidth / 2;
}
}
}
function hit4_anim() {
if (hit4draw == true) {
fill(hit4color);
rect(0, hit4i, width, 10);
hit4i = hit4i + 2.6;
if (hit4i > canvasHeight) {
hit4draw = false;
background(0);
hit4i = 0;
}
}
}
function hit5_anim() {
if (hit5draw == true) {
fill(hit5color);
rect(0, hit5i, width, 10);
hit5i = hit5i + 10;
if (hit5i > canvasHeight) {
hit5draw = false;
background(0);
hit5i = canvasHeight / 2;
}
}
}
function hit6_anim() {
if (hit6draw == true) {
fill(hit6color);
rect(0, hit6i, width, 10);
hit6i = hit6i + 2;
if (hit6i > canvasHeight) {
hit6draw = false;
background(0);
hit6i = canvasHeight / 2;
}
}
}
function laser_anim() {
if (laserdraw == true) {
fill(lasercolor);
rect(0, laseri, width, 25);
laseri = laseri - 1.8;
if (laseri < 0) {
laserdraw = false;
background(0);
laseri = canvasHeight;
}
}
}
function trigger_anim() {
if (triggerdraw == true) {
fill(triggercolor);
rect(width / 2 - 25, random(height), 50, 50);
triggeri = triggeri + 1;
if (triggeri > 50) {
triggerdraw = false;
background(0);
triggeri = 1;
}
}
}
function cowloop_anim() {
if (cowloopdraw == true) {
fill(cowloopcolor);
rect(width / 4, height / 4, width / 2, random(100));
cowloopi = cowloopi + 1;
if (cowloopi > 100) {
cowloopdraw = false;
background(0);
cowloopi = 0;
}
}
}
function kick1_anim() {
if (kick1draw == true) {
fill(kick1color);
rect(width / 4, 0, width / 2, kick1i);
kick1i = kick1i + 20;
if (kick1i > height) {
kick1draw = false;
background(0);
kick1i = 0;
}
}
}
function snare1_anim() {
if (snare1draw == true) {
fill(snare1color);
rect(0, 0, snare1i, height);
snare1i = snare1i - 10;
if (snare1i < 0) {
snare1draw = false;
background(0);
snare1i = canvasWidth / 2;
}
}
}
function hat_anim() {
if (hatdraw == true) {
fill(hatcolor);
ellipse(random(width), random(height), 50, hati);
hati = hati + 5;
if (hati > 50) {
hatdraw = false;
background(0);
hati = 1;
}
}
}let populations;
let objArray = [];
var up;
var textcolor;
var barcolor;
var opac;
function preload() {
populations = loadTable("assets/simpleData_noRegions.csv", "csv", "header");
}
function setup() {
createCanvas(1064, 640);
console.log(populations.getRowCount() + " total rows in table");
console.log(populations.getColumnCount() + " total columns in table");
console.log(populations.getObject());
console.log(populations.getArray());
console.log(populations.getRows());
for (let i = 0; i < populations.getRowCount(); i++) {
let oldObj = populations.getRow(i).obj;
let newObj = {};
newObj.country = oldObj.country;
newObj.estimate = parseInt(oldObj.estimate);
newObj.error = parseInt(oldObj.marginOfError);
objArray.push(newObj);
}
console.log(objArray);
}
function draw() {
background(0);
noStroke();
for (let i = 0; i < populations.getRowCount(); i++) {
up = map(objArray[i].estimate, 0, 11643298, 0, 640);
wide = map(objArray[i].estimate, 0, 7000000, 0, 1064);
opac = map(objArray[i].estimate, 0, 11643298, 120, 70);
if (i >= 0 && i < 8) {
barcolor = color(128, 200, 255, opac);
}
if (i >= 8 && i < 15) {
barcolor = color(0, 0, 255, opac);
}
if (i >= 15 && i < 21) {
barcolor = color(128, 0, 255, opac);
}
if (i >= 21 && i < 38) {
barcolor = color(255, 12, 0, opac);
}
if (i >= 38 && i < 44) {
barcolor = color(0, 255, 0, opac);
}
if (i >= 44 && i < 54) {
barcolor = color(255, 128, 0, opac);
}
if (i >= 54 && i < 64) {
barcolor = color(255, 255, 0, opac);
}
if (i >= 64 && i < 75) {
barcolor = color(255, 128, 255, opac);
}
if (i >= 75 && i < 80) {
barcolor = color(128, 255, 0, opac);
}
if (i >= 80 && i < 83) {
barcolor = color(255, 255, 128, opac);
}
if (i >= 83 && i < 87) {
barcolor = color(255, 0, 255, opac);
}
if (i >= 87 && i < 89) {
barcolor = color(0, 90, 255, opac);
}
if (i >= 89 && i < 95) {
barcolor = color(255, 89, 90, opac);
}
if (i >= 95 && i < 98) {
barcolor = color(0, 255, 255, opac);
}
if (i >= 98 && i < 111) {
barcolor = color(90, 255, 128, opac);
}
if (i >= 111 && i < 120) {
barcolor = color(90, 0, 90, opac);
}
if (i >= 120 && i < 131) {
barcolor = color(90, 0, 255, opac);
}
if (i >= 131 && i < 133) {
barcolor = color(255, 255, 255, opac);
}
fill(barcolor);
rectMode(CENTER);
rect(532, i*5, wide, up);
fill(0);
ellipse(532-wide/2, i*5, 10, up);
ellipse(532+wide/2, i*5, 10, up);
}
var mousedivisor = int(mouseX / 8);
if (mousedivisor <= 132) {
}
}let populations;
let objArray = [];
var up;
var textcolor;
var barcolor;
var opac;
function preload() {
populations = loadTable("assets/simpleData_noRegions.csv", "csv", "header");
}
function setup() {
createCanvas(1064, 640);
console.log(populations.getRowCount() + " total rows in table");
console.log(populations.getColumnCount() + " total columns in table");
console.log(populations.getObject());
console.log(populations.getArray());
console.log(populations.getRows());
for (let i = 0; i < populations.getRowCount(); i++) {
let oldObj = populations.getRow(i).obj;
let newObj = {};
newObj.country = oldObj.country;
newObj.estimate = parseInt(oldObj.estimate);
newObj.error = parseInt(oldObj.marginOfError);
objArray.push(newObj);
}
console.log(objArray);
}
function draw() {
background(0);
noStroke();
for (let i = 0; i < populations.getRowCount(); i++) {
up = map(objArray[i].estimate, 0, 11643298, 0, 640);
wide = map(objArray[i].estimate, 0, 7000000, 0, 1064);
opac = map(objArray[i].estimate, 0, 11643298, 80, 30);
fill(i, 255, 255, opac);
rectMode(CENTER);
rect(532, i*5, wide, up);
colorMode(HSB, 133);
fill(i, 255, 0);
ellipse(532-wide/2, i*5, 10, up);
ellipse(532+wide/2, i*5, 10, up);
}
var mousedivisor = int(mouseX / 8);
if (mousedivisor <= 132) {
}
}let populations;
let objArray = [];
var up;
var textcolor;
var barcolor;
var opac;
function preload() {
populations = loadTable("assets/simpleData_noRegions.csv", "csv", "header");
}
function setup() {
createCanvas(1064, 640);
console.log(populations.getRowCount() + " total rows in table");
console.log(populations.getColumnCount() + " total columns in table");
console.log(populations.getObject());
console.log(populations.getArray());
console.log(populations.getRows());
for (let i = 0; i < populations.getRowCount(); i++) {
let oldObj = populations.getRow(i).obj;
let newObj = {};
newObj.country = oldObj.country;
newObj.estimate = parseInt(oldObj.estimate);
newObj.error = parseInt(oldObj.marginOfError);
objArray.push(newObj);
}
console.log(objArray);
}
function draw() {
background(0);
noStroke();
for (let i = 0; i < populations.getRowCount(); i++) {
up = map(objArray[i].estimate, 0, 11643298, 0, 640);
wide = map(objArray[i].estimate, 0, 7000000, 0, 1064);
opac = map(objArray[i].estimate, 0, 11643298, 80, 30);
colorMode(HSB, 133)
fill(i, 255, 255, opac);
ellipse(8 * i, 640-(up/1.05), wide, up);
colorMode(HSB, 133)
fill(255, 0, 255)
ellipse(8 * i, 640-(up/1.05), 2, 2);
}
var mousedivisor = int(mouseX / 8);
if (mousedivisor <= 132) {
fill(mousedivisor, 255, 255, 280-opac);
textSize(32)
var current_country = objArray[mousedivisor].country;
text(current_country, 2, 32);
var current_estimate = objArray[mousedivisor].estimate;
var current_error = objArray[mousedivisor].error;
text(current_estimate + " ± " + current_error, 2, 64);
}
}let populations;
let objArray = [];
var up;
var textcolor;
var barcolor;
function preload() {
populations = loadTable("assets/simpleData_noRegions.csv", "csv", "header");
}
function setup() {
createCanvas(1064, 640);
console.log(populations.getRowCount() + " total rows in table");
console.log(populations.getColumnCount() + " total columns in table");
console.log(populations.getObject());
console.log(populations.getArray());
console.log(populations.getRows());
for (let i = 0; i < populations.getRowCount(); i++) {
let oldObj = populations.getRow(i).obj;
let newObj = {};
newObj.country = oldObj.country;
newObj.estimate = parseInt(oldObj.estimate);
newObj.error = parseInt(oldObj.marginOfError);
objArray.push(newObj);
}
console.log(objArray);
}
function draw() {
background(128);
noStroke();
for (let i = 0; i < populations.getRowCount(); i++) {
up = map(objArray[i].estimate, 0, 11643298, 0, windowHeight);
if (i >= 0 && i < 8) {
barcolor = color(128, 200, 255);
}
if (i >= 8 && i < 15) {
barcolor = color(0, 0, 255);
}
if (i >= 15 && i < 21) {
barcolor = color(128, 0, 255);
}
if (i >= 21 && i < 38) {
barcolor = color(255, 12, 0);
}
if (i >= 38 && i < 44) {
barcolor = color(0, 255, 0);
}
if (i >= 44 && i < 54) {
barcolor = color(255, 128, 0);
}
if (i >= 54 && i < 64) {
barcolor = color(255, 255, 0);
}
if (i >= 64 && i < 75) {
barcolor = color(255, 128, 255);
}
if (i >= 75 && i < 80) {
barcolor = color(128, 255, 0);
}
if (i >= 80 && i < 83) {
barcolor = color(255, 255, 128);
}
if (i >= 83 && i < 87) {
barcolor = color(255, 0, 255);
}
if (i >= 87 && i < 89) {
barcolor = color(0, 90, 255);
}
if (i >= 89 && i < 95) {
barcolor = color(255, 89, 90);
}
if (i >= 95 && i < 98) {
barcolor = color(0, 255, 255);
}
if (i >= 98 && i < 111) {
barcolor = color(90, 255, 128);
}
if (i >= 111 && i < 120) {
barcolor = color(90, 0, 90);
}
if (i >= 120 && i < 131) {
barcolor = color(90, 0, 255);
}
if (i >= 131 && i < 133) {
barcolor = color(255, 255, 255);
}
fill(barcolor);
ellipse(8 * i, 640-up/2, 8, up);
}
var mousedivisor = int(mouseX / 8);
if (mousedivisor <= 132) {
if (mousedivisor >= 0 && mousedivisor < 8) {
textcolor = color(128, 200, 255);
}
if (mousedivisor >= 8 && mousedivisor < 15) {
textcolor = color(0, 0, 255);
}
if (mousedivisor >= 15 && mousedivisor < 21) {
textcolor = color(128, 0, 255);
}
if (mousedivisor >= 21 && mousedivisor < 38) {
textcolor = color(255, 12, 0);
}
if (mousedivisor >= 38 && mousedivisor < 44) {
textcolor = color(0, 255, 0);
}
if (mousedivisor >= 44 && mousedivisor < 54) {
textcolor = color(255, 128, 0);
}
if (mousedivisor >= 54 && mousedivisor < 64) {
textcolor = color(255, 255, 0);
}
if (mousedivisor >= 64 && mousedivisor < 75) {
textcolor = color(255, 128, 255);
}
if (mousedivisor >= 75 && mousedivisor < 80) {
textcolor = color(128, 255, 0);
}
if (mousedivisor >= 80 && mousedivisor < 83) {
textcolor = color(255, 255, 128);
}
if (mousedivisor >= 83 && mousedivisor < 87) {
textcolor = color(255, 0, 255);
}
if (mousedivisor >= 87 && mousedivisor < 89) {
textcolor = color(0, 90, 255);
}
if (mousedivisor >= 89 && mousedivisor < 95) {
textcolor = color(255, 89, 90);
}
if (mousedivisor >= 95 && mousedivisor < 98) {
textcolor = color(0, 255, 255);
}
if (mousedivisor >= 98 && mousedivisor < 111) {
textcolor = color(90, 255, 128);
}
if (mousedivisor >= 111 && mousedivisor < 120) {
textcolor = color(90, 0, 90);
}
if (mousedivisor >= 120 && mousedivisor < 131) {
textcolor = color(90, 0, 255);
}
if (mousedivisor >= 131 && mousedivisor < 133) {
textcolor = color(255, 255, 255);
}
fill(textcolor);
textSize(32)
var current_country = objArray[mousedivisor].country;
text(current_country, 2, 32);
var current_estimate = objArray[mousedivisor].estimate;
var current_error = objArray[mousedivisor].error;
text(current_estimate + " ± " + current_error, 2, 64);
}
}let populations;
let objArray = [];
function preload() {
table = loadTable("assets/simpleData_noRegions.csv", "csv", "header");
}
function setup() {
for (var r = 0; r < table.getRowCount(); r++)
for (var c = 0; c < table.getColumnCount(); c++) {
}
}
let populations;
let objArray = [];
var up;
var textcolor;
var barcolor;
function preload() {
populations = loadTable("simpleData_noRegions.csv", "csv", "header");
}
function setup() {
createCanvas(1064, 640);
console.log(populations.getRowCount() + " total rows in table");
console.log(populations.getColumnCount() + " total columns in table");
console.log(populations.getObject());
console.log(populations.getArray());
console.log(populations.getRows());
for (let i = 0; i < populations.getRowCount(); i++) {
let oldObj = populations.getRow(i).obj;
let newObj = {};
newObj.country = oldObj.country;
newObj.estimate = parseInt(oldObj.estimate);
newObj.error = parseInt(oldObj.marginOfError);
objArray.push(newObj);
}
console.log(objArray);
}
function draw() {
background(0);
noStroke();
for (let i = 0; i < populations.getRowCount(); i++) {
up = map(objArray[i].estimate, 0, 11643298, 0, 640);
if (i >= 0 && i < 8) {
barcolor = color(128, 200, 255);
}
if (i >= 8 && i < 15) {
barcolor = color(0, 0, 255);
}
if (i >= 15 && i < 21) {
barcolor = color(128, 0, 255);
}
if (i >= 21 && i < 38) {
barcolor = color(255, 12, 0);
}
if (i >= 38 && i < 44) {
barcolor = color(0, 255, 0);
}
if (i >= 44 && i < 54) {
barcolor = color(255, 128, 0);
}
if (i >= 54 && i < 64) {
barcolor = color(255, 255, 0);
}
if (i >= 64 && i < 75) {
barcolor = color(255, 128, 255);
}
if (i >= 75 && i < 80) {
barcolor = color(128, 255, 0);
}
if (i >= 80 && i < 83) {
barcolor = color(255, 255, 128);
}
if (i >= 83 && i < 87) {
barcolor = color(255, 0, 255);
}
if (i >= 87 && i < 89) {
barcolor = color(0, 90, 255);
}
if (i >= 89 && i < 95) {
barcolor = color(255, 89, 90);
}
if (i >= 95 && i < 98) {
barcolor = color(0, 255, 255);
}
if (i >= 98 && i < 111) {
barcolor = color(90, 255, 128);
}
if (i >= 111 && i < 120) {
barcolor = color(90, 0, 90);
}
if (i >= 120 && i < 131) {
barcolor = color(90, 0, 255);
}
if (i >= 131 && i < 133) {
barcolor = color(255, 255, 255);
}
fill(barcolor);
rect(8 * i, 640, 6, -up);
}
var mousedivisor = int(mouseX / 8);
if (mousedivisor <= 132) {
if (mousedivisor >= 0 && mousedivisor < 8) {
textcolor = color(128, 200, 255);
}
if (mousedivisor >= 8 && mousedivisor < 15) {
textcolor = color(0, 0, 255);
}
if (mousedivisor >= 15 && mousedivisor < 21) {
textcolor = color(128, 0, 255);
}
if (mousedivisor >= 21 && mousedivisor < 38) {
textcolor = color(255, 12, 0);
}
if (mousedivisor >= 38 && mousedivisor < 44) {
textcolor = color(0, 255, 0);
}
if (mousedivisor >= 44 && mousedivisor < 54) {
textcolor = color(255, 128, 0);
}
if (mousedivisor >= 54 && mousedivisor < 64) {
textcolor = color(255, 255, 0);
}
if (mousedivisor >= 64 && mousedivisor < 75) {
textcolor = color(255, 128, 255);
}
if (mousedivisor >= 75 && mousedivisor < 80) {
textcolor = color(128, 255, 0);
}
if (mousedivisor >= 80 && mousedivisor < 83) {
textcolor = color(255, 255, 128);
}
if (mousedivisor >= 83 && mousedivisor < 87) {
textcolor = color(255, 0, 255);
}
if (mousedivisor >= 87 && mousedivisor < 89) {
textcolor = color(0, 90, 255);
}
if (mousedivisor >= 89 && mousedivisor < 95) {
textcolor = color(255, 89, 90);
}
if (mousedivisor >= 95 && mousedivisor < 98) {
textcolor = color(0, 255, 255);
}
if (mousedivisor >= 98 && mousedivisor < 111) {
textcolor = color(90, 255, 128);
}
if (mousedivisor >= 111 && mousedivisor < 120) {
textcolor = color(90, 0, 90);
}
if (mousedivisor >= 120 && mousedivisor < 131) {
textcolor = color(90, 0, 255);
}
if (mousedivisor >= 131 && mousedivisor < 133) {
textcolor = color(255, 255, 255);
}
fill(textcolor);
textSize(32)
var current_country = objArray[mousedivisor].country;
text(current_country, 0, 32);
var current_estimate = objArray[mousedivisor].estimate;
var current_error = objArray[mousedivisor].error;
text(current_estimate + " ± " + current_error, 0, 64);
}
}var osc, fft, freq, amp;
function setup() {
createCanvas(720, 256);
osc.amp(0.5);
fft = new p5.FFT();
osc.start();
freq = 200;
amp = 0.5;
}
function draw() {
background(255);
beginShape();
strokeWeight(5);
for (var i = 0; i < waveform.length; i++){
var x = map(i, 0, waveform.length, 0, width);
var y = map(waveform[i], -1, 1, height, 0);
vertex(x, y);
}
endShape();
osc.freq(freq);
osc.amp(amp);
console.log(rotationY);
}
function deviceMoved() {
freq = map(rotationX, -90.0, 90.0, 88.0, 888.0, true);
amp = map(rotationY, -90.0, 90.0, 0.0, 0.9, true);
function setup() {
createCanvas(640, 360);
background(255);
lifetime = 300;
lifecycle = 0;
recordtime = lifetime;
target = new Target(random(width), random(height / 4), 12, 12);
let mutationRate = 0.25;
population = new Population(mutationRate, 50);
obstacles = [];
obstacles.push(new Obstacle(random(width), random(height), 25, 5));
}
function draw() {
target.display();
if (lifecycle < lifetime) {
population.live(obstacles);
if ((population.targetReached()) && (lifecycle < recordtime)) {
recordtime = lifecycle;
}
lifecycle++;
} else {
lifecycle = 0;
population.calcFitness();
population.selection();
population.reproduction();
}
for (let i = 0; i < obstacles.length; i++) {
obstacles[i].display();
}
if (population.targetReached()) {
strokeWeight(4);
stroke(255);
fill(255);
rectMode(CORNER);
rect(target.position.x, target.position.y, target.w, target.h);
target.position.x = random(640);
target.position.y = random(320/2);
obstacles.push(new Obstacle(random(width), random(height), 25, 5));
lifecycle = 300;
background(255);
}
}
let pnt2 = [40, 80];
let pnt3 = [180, 15];
let pnt4 = [80, 200];
let pnt5 = [300, 80];
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
ellipse(pnt1[0], pnt1[1], 20, 20);
ellipse(pnt2[0], pnt2[1], 20, 20);
ellipse(pnt3[0], pnt3[1], 20, 20);
ellipse(pnt4[0], pnt4[1], 20, 20);
ellipse(pnt5[0], pnt5[1], 20, 20);
for (i = 0; i < 6; i++) {
var point1 = "pnt" + i;
var point2 = "pnt" + i + 1;
line(point1[i], point1[i+1], point2[i], point2[i+1]);
}
}var painters = [];
var inital = 1;
var maxHist;
function setup() {
createCanvas(displayWidth, displayHeight
);
for (var i = 0; i < inital; i++) {
painters.push(new Liner());
}
background(0);
frameRate(30);
}
function draw() {
background(0);
for (var i = painters.length - 1; i >= 0; i--) {
if (painters[i].opacity > 0){
painters[i].update();
}
painters[i].show();
painters[i].check();
if (painters[i].maxHist < 0) {
painters.splice(i, 1);
}
}
var ms = Math.floor(millis() % 5000);
if (ms > 4900){
painters.push(new Liner());
}
}
function keyPressed() {
if (keyCode === ENTER) {
painters.push(new Liner());
}
}
var myNickname = "HarmonicMotion";
var nFramesInLoop = 240;
var bEnableExport = true;
var nElapsedFrames;
var bRecording;
var theCanvas;
var circles = [];
var percentCompleteFraction = 0;
var offset = 0;
function setup() {
frameRate(24);
theCanvas = createCanvas(displayWidth, displayHeight);
bRecording = false;
nElapsedFrames = 0;
for(i = 0; i < 10; i++){
circles.push(new Circle());
}
}
function keyTyped() {
if (bEnableExport) {
if ((key === 'f') || (key === 'F')) {
bRecording = true;
nElapsedFrames = 0;
}
}
}
function draw() {
if (bRecording) {
percentCompleteFraction = float(nElapsedFrames) / float(nFramesInLoop);
} else {
percentCompleteFraction = float(frameCount % nFramesInLoop) / float(nFramesInLoop);
}
renderMyDesign (percentCompleteFraction);
if (bRecording && bEnableExport) {
var frameOutputFilename = myNickname + "_frame_" + nf(nElapsedFrames, 4) + ".png";
saveCanvas(theCanvas, frameOutputFilename, 'png');
nElapsedFrames++;
if (nElapsedFrames >= nFramesInLoop) {
bRecording = false;
}
}
}
function renderMyDesign (percent) {
background(0);
strokeWeight(2);
var cx = 100;
var cy = 100;
for (i = circles.length - 1; i >= 0; i--){
circles[i].update();
circles[i].show();
offset += 1;
}
fill(255, 255, 255, 0);
noStroke();
var percentDisplayString = "" + nf(percent, 1, 3);
text(percentDisplayString, 5, 15);
}
var myNickname = "HarmonicMotion";
var nFramesInLoop = 240;
var bEnableExport = true;
var nElapsedFrames;
var bRecording;
var theCanvas;
var circles = [];
var percentCompleteFraction = 0;
var offset = 0;
function setup() {
frameRate(24);
theCanvas = createCanvas(displayWidth, displayHeight);
bRecording = false;
nElapsedFrames = 0;
for(i = 0; i < 20; i++){
circles.push(new Circle());
}
}
function keyTyped() {
if (bEnableExport) {
if ((key === 'f') || (key === 'F')) {
bRecording = true;
nElapsedFrames = 0;
}
}
}
function draw() {
if (bRecording) {
percentCompleteFraction = float(nElapsedFrames) / float(nFramesInLoop);
} else {
percentCompleteFraction = float(frameCount % nFramesInLoop) / float(nFramesInLoop);
}
renderMyDesign (percentCompleteFraction);
if (bRecording && bEnableExport) {
var frameOutputFilename = myNickname + "_frame_" + nf(nElapsedFrames, 4) + ".png";
saveCanvas(theCanvas, frameOutputFilename, 'png');
nElapsedFrames++;
if (nElapsedFrames >= nFramesInLoop) {
bRecording = false;
}
}
}
function renderMyDesign (percent) {
background(0);
strokeWeight(2);
var cx = 100;
var cy = 100;
for (i = circles.length - 1; i >= 0; i--){
circles[i].update();
circles[i].show();
offset += 1;
}
fill(255, 255, 255, 0);
noStroke();
var percentDisplayString = "" + nf(percent, 1, 3);
text(percentDisplayString, 5, 15);
}
var myNickname = "HarmonicMotion";
var nFramesInLoop = 240;
var bEnableExport = true;
var nElapsedFrames;
var bRecording;
var theCanvas;
var circles = [];
var percentCompleteFraction = 0;
var offset = 0;
var start = 100;
function setup() {
frameRate(30);
theCanvas = createCanvas(displayWidth, displayHeight);
bRecording = false;
nElapsedFrames = 0;
for(i = 0; i < start; i++){
circles.push(new Circle());
}
}
function keyTyped() {
if (bEnableExport) {
if ((key === 'f') || (key === 'F')) {
bRecording = true;
nElapsedFrames = 0;
}
}
}
function draw() {
if (bRecording) {
percentCompleteFraction = float(nElapsedFrames) / float(nFramesInLoop);
} else {
percentCompleteFraction = float(frameCount % nFramesInLoop) / float(nFramesInLoop);
}
renderMyDesign (percentCompleteFraction);
if (bRecording && bEnableExport) {
var frameOutputFilename = myNickname + "_frame_" + nf(nElapsedFrames, 4) + ".png";
saveCanvas(theCanvas, frameOutputFilename, 'png');
nElapsedFrames++;
if (nElapsedFrames >= nFramesInLoop) {
bRecording = false;
}
}
}
function renderMyDesign (percent) {
background(0);
strokeWeight(2);
var cx = 100;
var cy = 100;
for (i = circles.length - 1; i >= 0; i--){
circles[i].update();
circles[i].show();
offset += 1;
}
fill(255, 255, 255, 0);
noStroke();
var percentDisplayString = "" + nf(percent, 1, 3);
text(percentDisplayString, 5, 15);
var resultDiv;
var clr1, clr2, clr3;
var blbs = [25, 39, 33, 26, 36];
function setup() {
frameRate(1);
off = createButton('Off');
off.position(10, 10);
off.mousePressed(offGo);
on = createButton('On');
on.position(50, 10);
on.mousePressed(onGo);
sineU = createButton('Sweep Down');
sineU.position(90, 10);
sineU.mousePressed(sinWaveDown);
sineD = createButton('Sweep Up');
sineD.position(180, 10);
sineD.mousePressed(sinWaveUp);
redS = createButton('Red Sweep');
redS.position(90, 40);
redS.mousePressed(redSweep);
blueS = createButton('Blue Sweep');
blueS.position(170, 40);
blueS.mousePressed(blueSweep);
alertS = createButton('Alert Sweep');
alertS.position(10, 40);
alertS.mousePressed(alertSweep);
full = createButton('Full');
full.position(255, 10);
full.mousePressed(atFull);
hslider = createSlider(0, 65280, 0);
hslider.position(250, 40);
hslider.changed(hueSlider);
}
function connect() {
httpDo(url, 'GET', getLights);
}
function getLights(result) {
resultDiv.html(result);
}
function offGo() {
var state = {
on: false
}
for (i = 0; i < 5; i++) {
go(blbs[i], state);
}
}
function onGo() {
var state = {
on: true
}
for (i = 0; i < 5; i++) {
go(blbs[i], state);
}
}
function sinWaveDown() {
var dim = 0;
for (i = 0; i < 5; i++) {
var time = i*10 + 8;
var state = {
bri: dim,
transitiontime: time
}
go(blbs[i], state);
}
}
function sinWaveUp() {
var dim = 255;
for (i = 0; i < 5; i++) {
var time = i*15 + 4;
var state = {
bri: dim,
transitiontime: time
}
go(blbs[i], state);
}
}
function redSweep() {
var huey = 0;
for (i = 0; i < 5; i++) {
var time = i*4+1;
var state = {
hue: huey,
transitiontime: time
}
go(blbs[i], state);
}
}
function blueSweep() {
var huey = 46920;
for (i = 0; i <= 4; i++) {
var time = i*4+1;
var state = {
hue: huey,
transitiontime: time
}
go(blbs[i], state);
}
}
function hueSlider() {
var huey = hslider.value();
for (i = 5; i >= 0; i--) {
var time = i*2+1;
var state = {
hue: huey,
transitiontime: time, 
sat: 254
}
go(blbs[i], state);
}
}
function alertSweep() {
for (i = 0; i < 5; i++) {
var time = i*4+1;
var state = {
alert: "select",
transitiontime: time
}
go(blbs[i], state);
}
}
function atFull() {
var dim = 255;
for (i = 0; i < 5; i++) {
var state = {
bri: dim
}
go(blbs[i], state);
}
}
function go(blb, msg) {
var path = url + blb + '/state/';
var fnc = JSON.stringify(msg);
httpDo(path, 'PUT', fnc, 'text', getLights);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
var resultDiv;
var clr1, clr2, clr3;
var blbs = [25, 39, 33, 26, 36];
function setup() {
frameRate(1);
off = createButton('Off');
off.position(10, 10);
off.mousePressed(offGo);
on = createButton('On');
on.position(50, 10);
on.mousePressed(onGo);
sineU = createButton('Sweep Down');
sineU.position(90, 10);
sineU.mousePressed(sinWaveDown);
sineD = createButton('Sweep Up');
sineD.position(180, 10);
sineD.mousePressed(sinWaveUp);
redS = createButton('Red Sweep');
redS.position(90, 40);
redS.mousePressed(redSweep);
blueS = createButton('Blue Sweep');
blueS.position(170, 40);
blueS.mousePressed(blueSweep);
alertS = createButton('Alert Sweep');
alertS.position(10, 40);
alertS.mousePressed(alertSweep);
full = createButton('Full');
full.position(255, 10);
full.mousePressed(atFull);
hslider = createSlider(0, 65280, 0);
hslider.position(250, 40);
hslider.changed(hueSlider);
}
function connect() {
httpDo(url, 'GET', getLights);
}
function getLights(result) {
resultDiv.html(result);
}
function offGo() {
var state = {
on: false
}
for (i = 0; i < 5; i++) {
go(blbs[i], state);
}
}
function onGo() {
var state = {
on: true
}
for (i = 0; i < 5; i++) {
go(blbs[i], state);
}
}
function sinWaveDown() {
var dim = 0;
for (i = 0; i < 5; i++) {
var time = i*10 + 8;
var state = {
bri: dim,
transitiontime: time
}
go(blbs[i], state);
}
}
function sinWaveUp() {
var dim = 255;
for (i = 0; i < 5; i++) {
var time = i*15 + 4;
var state = {
bri: dim,
transitiontime: time
}
go(blbs[i], state);
}
}
function redSweep() {
var huey = 0;
for (i = 0; i < 5; i++) {
var time = i*4+1;
var state = {
hue: huey,
transitiontime: time
}
go(blbs[i], state);
}
}
function blueSweep() {
var huey = 46920;
for (i = 0; i <= 4; i++) {
var time = i*4+1;
var state = {
hue: huey,
transitiontime: time
}
go(blbs[i], state);
}
}
function hueSlider() {
var huey = hslider.value();
for (i = 5; i >= 0; i--) {
var time = i*2+1;
var state = {
hue: huey,
transitiontime: time, 
sat: 254
}
go(blbs[i], state);
}
}
function alertSweep() {
for (i = 0; i < 5; i++) {
var time = i*4+1;
var state = {
alert: "select",
transitiontime: time
}
go(blbs[i], state);
}
}
function atFull() {
var dim = 255;
for (i = 0; i < 5; i++) {
var state = {
bri: dim
}
go(blbs[i], state);
}
}
function go(blb, msg) {
var path = url + blb + '/state/';
var fnc = JSON.stringify(msg);
httpDo(path, 'PUT', fnc, 'text', getLights);
}var user = 'nM7kpbw91SlF8bixC-Ei1nKqG7O7S9CyIqpbY8WG';
var url = '10.0.1.183';
function setup() { 
offB = createButton('Off');
offB.position(10, 10);
offB.mousePressed(off);
connect();
} 
function connect() {
httpDo(url, 'GET', getLights);
}
function getLights(result) {
resultDiv.html(result);
}
function off() {
on: false
}
go(blb3, state);
}
function go(blb, msg){
var path = url + blb + '/state/';
var fnc = JSON.stringify(msg);
}
var painters = [];
var inital = 1;
var maxHist;
function setup() {
createCanvas(1080, 720);
for (var i = 0; i < inital; i++) {
painters.push(new Liner());
}
background(0);
frameRate(30);
}
function draw() {
background(0);
for (var i = painters.length - 1; i >= 0; i--) {
if (painters[i].opacity > 0){
painters[i].update();
}
painters[i].show();
painters[i].check();
if (painters[i].maxHist < 0) {
painters.splice(i, 1);
}
}
}
function keyPressed() {
if (keyCode === ENTER) {
painters.push(new Liner());
}
}var painters = [];
var inital = 1;
var maxHist;
function setup() {
createCanvas(1080, 720);
for (var i = 0; i < inital; i++) {
painters.push(new Liner());
}
background(0);
frameRate(30);
}
function draw() {
background(0);
for (var i = painters.length - 1; i >= 0; i--) {
if (painters[i].opacity > 0){
painters[i].update();
}
painters[i].show();
painters[i].check();
if (painters[i].maxHist < 0) {
painters.splice(i, 1);
}
}
}
function keyPressed() {
if (keyCode === ENTER) {
painters.push(new Liner());
}
}var painters = [];
var inital = 1;
var maxHist;
function setup() {
createCanvas(1080, displayHeight);
for (var i = 0; i < inital; i++) {
painters.push(new Liner());
}
background(0);
frameRate(30);
}
function draw() {
background(0);
for (var i = painters.length - 1; i >= 0; i--) {
if (painters[i].opacity > 0){
painters[i].update();
}
painters[i].show();
painters[i].check();
if (painters[i].maxHist < 0) {
painters.splice(i, 1);
}
}
}
function keyPressed() {
if (keyCode === ENTER) {
painters.push(new Liner());
}
}var painters = [];
var inital = 1;
var maxHist;
function setup() {
createCanvas(1080, 720);
for (var i = 0; i < inital; i++) {
painters.push(new Liner());
}
background(0);
frameRate(30);
}
function draw() {
background(0);
for (var i = painters.length - 1; i >= 0; i--) {
painters[i].check();
if (painters[i].opacity > 0){
painters[i].update();
}
painters[i].show();
if (painters[i].maxHist < 0) {
painters.splice(i, 1);
}
}
}
function keyPressed() {
if (keyCode === ENTER) {
painters.push(new Liner());
}
}var painters = [];
var inital = 1;
var maxHist;
function setup() {
createCanvas(1080, 720);
for (var i=0; i < inital; i++){
painters.push(new Liner());
}
background(0);
frameRate(120);
dSlider = createSlider(0, 400, );
dSlider.position(20, 20);
}
function draw () {
background(0);
for (var i=0; i<painters.length; i++) {
painters[i].update();
painters[i].show();
}
}
function mouseClicked() {
painters.push(new Liner());
}var liner;
function setup() {
createCanvas(400, 400);
liner = new Liner();
background(0);
}
function draw () {
background(0);
liner.update();
liner.show();
}let liner;
function setup() {
createCanvas(displayHeight, displayWidth);
liner = new Liner();
}
function draw () {
background (0);
Liner.update();
Liner.show();
let walker;
var r, g, b;
let step = 5;
function setup() {
createCanvas(640, 360);
walker = new Walker();
background(127);
}
function draw() {
walker.walk();
walker.display();
walker.randomColor();
}
class Walker {
constructor() {
this.position = createVector(width / 2, height / 2);
this.noff = createVector(random(1000), random(1000));
this.r = random(127);
this.g = random(127);
this.b = random(127);
}
display() {
strokeWeight(2);
fill(this.r, this.g, this.b);
noStroke();
ellipse(this.position.x, this.position.y, 48, 48);
}
walk() {
this.position.x = map(noise(this.noff.x), 0, 1, 0, width);
this.position.y = map(noise(this.noff.y), 0, 1, 0, height);
this.noff.add(0.01, 0.01, 0);
}
randomColor() {
var count = floor(random(2));
switch (count) {
case 0:
if (this.r > -1 && this.r < 256) {
this.r = this.r + floor(random(step));
} else if (this.r <= 0) {
this.r = this.r + floor(random(step));
} else if (this.r >= 256) {
this.r = this.r - floor(random(step));
}
if (this.g > -1 && this.g < 256) {
this.g = this.g + floor(random(step));
} else if (this.g <= 0) {
this.g = this.g + floor(random(step));
} else if (this.g >= 256) {
this.g = this.g - floor(random(step));
}
if (this.b > -1 && this.b < 256) {
this.b = this.b + floor(random(step));
} else if (this.b <= 0) {
this.b = this.b + floor(random(step));
} else if (this.b >= 256) {
this.b = this.b - floor(random(step));
}
break;
case 1:
if (this.r > -1 && this.r < 256) {
this.r = this.r - floor(random(step));
} else if (this.r <= 0) {
this.r = this.r + floor(random(step));
} else if (this.r >= 256) {
this.r = this.r - floor(random(step));
}
if (this.g > -1 && this.g < 256) {
this.g = this.g - floor(random(step));
} else if (this.g <= 0) {
this.g = this.g + floor(random(step));
} else if (this.g >= 256) {
this.g = this.g - floor(random(step));
}
if (this.b > -1 && this.b < 256) {
this.b = this.b - floor(random(step));
} else if (this.b <= 0) {
this.b = this.b + floor(random(step));
} else if (this.b >= 256) {
this.b = this.b - floor(random(step));
}
break;
}
}
}
let walker;
let upticker = 0;
let dir = true;
function setup() {
noStroke();
createCanvas(640, 360);
walker = new Walker();
walker2 = new Walker();
background(0);
smooth();
}
function uptick() {
if (dir == true) {
upticker++;
}
if (dir == false) {
upticker--;
}
if (upticker == 255) {
dir = !dir;}
if (upticker == 0) {
dir = !dir;}
}
function draw() {
noStroke();
uptick();
walker.walk();
walker.display(255-upticker);
walker2.walk();
walker2.display(upticker);
}
class Walker {
constructor() {
this.position = createVector(width / 2, height / 2);
this.noff = createVector(random(1000), random(1000));
}
display(colorz) {
strokeWeight(2);
fill(colorz);
ellipse(this.position.x, this.position.y, 48, 48);
}
walk() {
this.position.x = map(noise(this.noff.x), 0, 1, 0, width);
this.position.y = map(noise(this.noff.y), 0, 1, 0, height);
this.noff.add(0.01, 0.01, 0);
}
}
var painters = []; 
var r, g, b;
let step = 5;
function setup() {
for (var i=0; i < 9; i++){
painters.push(new Walker());
}
createCanvas(1080, 720);
background(0);
smooth();
}
function draw() {
for (var i=0; i<painters.length; i++) {
painters[i].display();
painters[i].walk();
}
}
function mouseClicked(){
painters.push(new Walker());
}
class Walker {
constructor() {
this.position1 = createVector(width/2, height/2);
this.position2 = createVector(width/2, height/2);
this.noff1 = createVector(random(1000), random(1000));
this.noff2 = createVector(random(1000), random(1000));
this.r = random(127);
this.g = 0;
this.b = random(127);
}
display() {
strokeWeight(1);
fill(this.r, this.g, this.b, 127);
stroke(this.r, 0, this.b, 88);
line(this.position1.x, this.position1.y, this.position2.x, this.position2.y);
}
walk() {
this.position1.x = map(noise(this.noff1.x), 0, 1, 0, width);
this.position1.y = map(noise(this.noff1.y), 0, 1, 0, height);
this.position2.x = map(noise(this.noff2.x), 0, 1, 0, width);
this.position2.y = map(noise(this.noff2.y), 0, 1, 0, height);
this.noff1.add(0.001, 0.001, 0);
this.noff2.add(0.001, 0.001, 0);
}
randomColor() {
var count = floor(random(2));
switch (count) {
case 0:
if (this.r > -1 && this.r < 256) {
this.r = this.r + floor(random(step));
} else if (this.r <= 0) {
this.r = this.r + floor(random(step));
} else if (this.r >= 256) {
this.r = this.r - floor(random(step));
}
if (this.g > -1 && this.g < 256) {
this.g = this.g + floor(random(step));
} else if (this.g <= 0) {
this.g = this.g + floor(random(step));
} else if (this.g >= 256) {
this.g = this.g - floor(random(step));
}
if (this.b > -1 && this.b < 256) {
this.b = this.b + floor(random(step));
} else if (this.b <= 0) {
this.b = this.b + floor(random(step));
} else if (this.b >= 256) {
this.b = this.b - floor(random(step));
}
break;
case 1:
if (this.r > -1 && this.r < 256) {
this.r = this.r - floor(random(step));
} else if (this.r <= 0) {
this.r = this.r + floor(random(step));
} else if (this.r >= 256) {
this.r = this.r - floor(random(step));
}
if (this.g > -1 && this.g < 256) {
this.g = this.g - floor(random(step));
} else if (this.g <= 0) {
this.g = this.g + floor(random(step));
} else if (this.g >= 256) {
this.g = this.g - floor(random(step));
}
if (this.b > -1 && this.b < 256) {
this.b = this.b - floor(random(step));
} else if (this.b <= 0) {
this.b = this.b + floor(random(step));
} else if (this.b >= 256) {
this.b = this.b - floor(random(step));
}
break;
}
}
}var liner;
function setup() {
createCanvas(displayHeight, displayWidth);
liner = new Liner();
background(0);
}
function draw () {
background(0);
liner.update();
liner.show();
var painters = []; 
var r, g, b;
let step = 5;
function setup() {
createCanvas(1080, 720);
for (var i=0; i < 9; i++){
painters.push(new Walker());
}
background(0);
smooth();
frameRate(60);
}
function draw() {
for (var i=0; i<painters.length; i++) {
painters[i].walk();
painters[i].randomColor();
painters[i].display();
}
}
function mouseClicked(){
painters.push(new Walker());
}
class Walker {
constructor() {
this.position1 = createVector(width, height);
this.position2 = createVector(width, height);
this.noff = createVector(random(1000), random(1000));
this.r = random(127);
this.g = 0;
this.b = random(127);
}
display() {
strokeWeight(1);
stroke(this.r, 0, this.b, 38);
line(this.position1.x, this.position1.y, this.position2.x, this.position2.y);
}
walk() {
this.position1.x = map(noise(this.noff.x), 0, 1, 0, width);
this.position1.y = map(noise(this.noff.y), 0, 1, 0, height);
this.position2.x = map(noise(this.noff.x), 1, 0, 0, width);
this.position2.y = map(noise(this.noff.y), 1, 0, 0, height); 
this.noff.add(0.001, 0.001, 0);
}
randomColor() {
var count = floor(random(2));
switch (count) {
case 0:
if (this.r > -1 && this.r < 256) {
this.r = this.r + floor(random(step));
} else if (this.r <= 0) {
this.r = this.r + floor(random(step));
} else if (this.r >= 256) {
this.r = this.r - floor(random(step));
}
if (this.g > -1 && this.g < 256) {
this.g = this.g + floor(random(step));
} else if (this.g <= 0) {
this.g = this.g + floor(random(step));
} else if (this.g >= 256) {
this.g = this.g - floor(random(step));
}
if (this.b > -1 && this.b < 256) {
this.b = this.b + floor(random(step));
} else if (this.b <= 0) {
this.b = this.b + floor(random(step));
} else if (this.b >= 256) {
this.b = this.b - floor(random(step));
}
break;
case 1:
if (this.r > -1 && this.r < 256) {
this.r = this.r - floor(random(step));
} else if (this.r <= 0) {
this.r = this.r + floor(random(step));
} else if (this.r >= 256) {
this.r = this.r - floor(random(step));
}
if (this.g > -1 && this.g < 256) {
this.g = this.g - floor(random(step));
} else if (this.g <= 0) {
this.g = this.g + floor(random(step));
} else if (this.g >= 256) {
this.g = this.g - floor(random(step));
}
if (this.b > -1 && this.b < 256) {
this.b = this.b - floor(random(step));
} else if (this.b <= 0) {
this.b = this.b + floor(random(step));
} else if (this.b >= 256) {
this.b = this.b - floor(random(step));
}
break;
}
}
var painters = []; 
var r, g, b;
let step = 5;
function setup() {
for (var i=0; i < 22; i++){
painters.push(new Walker());
}
createCanvas(displayWidth, displayHeight);
background(0);
smooth();
}
function draw() {
for (var i=0; i<painters.length; i++) {
painters[i].display();
painters[i].walk();
}
}
function mouseClicked(){
painters.push(new Walker());
}
class Walker {
constructor() {
this.position1 = createVector(width/2, height/2);
this.position2 = createVector(width/2, height/2);
this.noff1 = createVector(random(1000), random(1000));
this.noff2 = createVector(random(1000), random(1000));
this.r = random(127);
this.g = 0;
this.b = random(127);
}
display() {
strokeWeight(1);
fill(this.r, this.g, this.b, 127);
stroke(this.r, 0, this.b, 88);
line(this.position1.x, this.position1.y, this.position2.x, this.position2.y);
}
walk() {
this.position1.x = map(noise(this.noff1.x), 0, 1, 0, width);
this.position1.y = map(noise(this.noff1.y), 0, 1, 0, height);
this.position2.x = map(noise(this.noff2.x), 0, 1, 0, width);
this.position2.y = map(noise(this.noff2.y), 0, 1, 0, height);
this.noff1.add(0.001, 0.001, 0);
this.noff2.add(0.001, 0.001, 0);
}
randomColor() {
var count = floor(random(2));
switch (count) {
case 0:
if (this.r > -1 && this.r < 256) {
this.r = this.r + floor(random(step));
} else if (this.r <= 0) {
this.r = this.r + floor(random(step));
} else if (this.r >= 256) {
this.r = this.r - floor(random(step));
}
if (this.g > -1 && this.g < 256) {
this.g = this.g + floor(random(step));
} else if (this.g <= 0) {
this.g = this.g + floor(random(step));
} else if (this.g >= 256) {
this.g = this.g - floor(random(step));
}
if (this.b > -1 && this.b < 256) {
this.b = this.b + floor(random(step));
} else if (this.b <= 0) {
this.b = this.b + floor(random(step));
} else if (this.b >= 256) {
this.b = this.b - floor(random(step));
}
break;
case 1:
if (this.r > -1 && this.r < 256) {
this.r = this.r - floor(random(step));
} else if (this.r <= 0) {
this.r = this.r + floor(random(step));
} else if (this.r >= 256) {
this.r = this.r - floor(random(step));
}
if (this.g > -1 && this.g < 256) {
this.g = this.g - floor(random(step));
} else if (this.g <= 0) {
this.g = this.g + floor(random(step));
} else if (this.g >= 256) {
this.g = this.g - floor(random(step));
}
if (this.b > -1 && this.b < 256) {
this.b = this.b - floor(random(step));
} else if (this.b <= 0) {
this.b = this.b + floor(random(step));
} else if (this.b >= 256) {
this.b = this.b - floor(random(step));
}
break;
}
}
}var input, button, greeting, pixel;
function setup() { 
createCanvas(displayWidth, displayHeight);
colorMode(HSB, 360, 100, 100);
frameRate(14);
input = createInput();
input.position(20, 65);
button = createButton('submit');
button.position(input.x + input.width, 65);
button.mousePressed(greet);
greeting = createElement('h2', 'What pixel are you?');
greeting.position(20, 5);
textAlign(CENTER);
textSize(50);
} 
function draw(){
background(0);
fill(counter(pixel)*12, 100, 100);
rect(0, 0, width, height);
}
function greet(){
pixel = int(input.value());  
}
function counter(x) {
var count = (frameCount + x) % 30;
return count;
}
var video;
var x = 0;
var lastx = -1;
var dir;
function setup() {
createCanvas(320, 240);
pixelDensity(1);
video = createCapture(VIDEO);
video.size(160, 120);
background(51);
}
function draw() {
translate(160, 120);
rotate(x);
image(video, 0, 0);
push();
translate(video.width,0);
scale(-1,1); 
copy(video, 0, 0, 160, 240, 0, 0, 160, 240);
pop();
push();
translate(video.width,video.height);
scale(-1,-1); 
copy(video, 0, 120, 160, 240, 0, 120, 160, 240);
pop();
push();
translate(0,video.height);
scale(1,-1); 
copy(video, 120, 120, 160, 240, 0, 120, 160, 240);
pop();
translate(video.width/2, video.height/2);
rotate(x);
if (x < 0){
dir = 1;
}
if (x <= (PI*16) && lastx < x){
dir = 1;
}
if (x > (PI*16)){
dir = 2;
}
if (dir == 1){
x = x + (PI/64);
}
if (dir == 2){
x = x - (PI/64);
}
lastx = x;
}
var video;
function setup() {
createCanvas(320, 240);
pixelDensity(1);
video = createCapture(VIDEO);
video.size(320, 240);
background(51);
}
function draw() {
video.loadPixels();
image(video, 0, 0);
push();
translate(video.width,0);
scale(-1,1); 
copy(video, 0, 0, 160, 240, 0, 0, 160, 240);
pop();
push();
translate(video.width,video.height);
scale(-1,-1); 
copy(video, 0, 120, 160, 240, 0, 120, 160, 240);
pop();
push();
translate(0,video.height);
scale(1,-1); 
copy(video, 0, 120, 160, 240, 0, 120, 160, 240);
pop();
}
var video;
var x = 0;
function setup() {
createCanvas(320, 240);
pixelDensity(1);
video = createCapture(VIDEO);
video.size(320, 240);
background(51);
video.hide();
}
function draw() {
image(video, 0, 0);
push();
translate(video.width,0);
scale(-1,1); 
copy(video, 0, 0, 160, 240, 0, 0, 160, 240);
pop();
push();
translate(video.width,video.height);
scale(-1,-1); 
copy(video, 0, 120, 160, 240, 0, 120, 160, 240);
pop();
push();
translate(0,video.height);
scale(1,-1); 
copy(video, 0, 120, 160, 240, 0, 120, 160, 240);
pop();
translate(video.width/2, video.height/2);
rotate(x);
x = (x + PI/64);
}
var start, end, time;
var gif;
function setup(){
}
function draw(){
time = end-start;
var mapped = map(mouseX, 0, 390, 0, 1);
scary.style("opacity", mapped);
scary.position(0,0);
}
function mousePressed(){
start = millis();
clear();
}
function mouseReleased() {
end = millis();
var key = 'AIzaSyDuOOomp8GhKBNEk3MPjspdYcWpN5iSOn4'
var mappa = new Mappa('Google', key);
var myMap;
var canvas;
var table;
let x1, y1, x2, y2, n;
var img;
function preload() {
}
function setup() {
colorMode(HSB, 50);
canvas = createCanvas(800, 700);
myMap.overlay(canvas)
input = createInput();
input.position(20, 65);
button = createButton('Submit');
button.position(input.x + input.width, 65);
greeting = createElement('h2', 'Which Trip?');
greeting.position(20, 5);
textAlign(CENTER);
textSize(50);
}
function draw() {
clear();
for (var i = 0; i < table.getRowCount(); i++) {
var row = table.getRow(i);
x1 = row.get("start station latitude");
y1 = row.get("start station longitude");
x2 = row.get("end station latitude");
y2 = row.get("end station longitude");
var pos1 = myMap.latLngToPixel(x1, y1);
var pos2 = myMap.latLngToPixel(x2, y2);
fill(i, 100, 100);
ellipse(pos1.x, pos1.y, 8, 8);
ellipse(pos2.x, pos2.y, 8, 8);
line(pos1.x, pos1.y, pos2.x, pos2.y);
}
}
function loadData() {
var row = table.getRow();
x1 = row.get("start station latitude");
y1 = row.get("start station longitude");
x2 = row.get("end station latitude");
y2 = row.get("end station longitude");
}
function Bubble(x, y, diameter, s) {
this.x = Number(x);
this.y = Number(y);
this.diameter = Number(diameter);
this.name = s;
this.over = false;
this.rollover = function(px, py) {
var d = dist(px, py, this.x, this.y);
if (d < diameter/2) {
this.over = true; 
} else {
this.over = false;
}
}
this.display = function() {
stroke(0);
strokeWeight(2);
noFill();
ellipse(this.x, this.y, this.diameter, this.diameter);
if (this.over) {
textAlign(CENTER);
noStroke();
fill(0);
text(this.name, this.x, this.y + this.diameter/2 + 20);
}
}
}
function callPage(){
var origin = str("&origin=" + x1 + "," + y1);
var destination = str("&destination=" + x2 + "," + y2);
window.open(URL);
}
var table;
let x1, y1, x2, y2, n;
function preload() {
}
function setup() {
createCanvas(480, 900);
input = createInput();
input.position(20, 65);
button = createButton('Submit');
button.position(input.x + input.width, 65);
greeting = createElement('h2', 'Which Trip?');
greeting.position(20, 5);
textAlign(CENTER);
textSize(50);
}
function draw() {
background(255);
n = input.value();
if (n) {
loadData(n-1);
}
button.mousePressed(callPage);
for (var i = 0; i < table.getRowCount(); i++) {
var row = table.getRow(i);
var x = row.get("start station name");
var y = row.get("end station name");
textSize(10);
text(x + " to " + y, 150, i*14 + 100);
}
}
function loadData(n) {
var row = table.getRow(n);
x1 = row.get("start station latitude");
y1 = row.get("start station longitude");
x2 = row.get("end station latitude");
y2 = row.get("end station longitude");
}
function Bubble(x, y, diameter, s) {
this.x = Number(x);
this.y = Number(y);
this.diameter = Number(diameter);
this.name = s;
this.over = false;
this.rollover = function(px, py) {
var d = dist(px, py, this.x, this.y);
if (d < diameter/2) {
this.over = true; 
} else {
this.over = false;
}
}
this.display = function() {
stroke(0);
strokeWeight(2);
noFill();
ellipse(this.x, this.y, this.diameter, this.diameter);
if (this.over) {
textAlign(CENTER);
noStroke();
fill(0);
text(this.name, this.x, this.y + this.diameter/2 + 20);
}
}
}
function callPage(){
var origin = str("&origin=" + x1 + "," + y1);
var destination = str("&destination=" + x2 + "," + y2);
window.open(URL);
}
var table;
function preload() {
"csv", "header");
}
function setup() {
var startStationName = new Array(table.getColumn("start station name"));
for (var r = 0; r < table.getRowCount(); r++)
for (var c = 0; c < table.getColumnCount(); c++) {
}
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
var r, g, b;
var x = 50;
var x1 = 250;
var x2 = 450;
function setup() { 
createCanvas(600, 400);
redslider = createSlider(0, 255, 0);
greenslider = createSlider(0, 255, 0);
blueslider = createSlider(0, 255, 0);
redslider.position(30, 100);
greenslider.position(230, 100);
blueslider.position(430, 100);
} 
function draw() { 
background(r, g, b);
r = redslider.value();
g = greenslider.value();
b = blueslider.value();
fill(0, g, b);
rect(x, 150, 10, 88);
fill(32, g, b);
rect(x+10, 150, 10, 88);
fill(64, g, b);
rect(x+20, 150, 10, 88);
fill(96, g, b);
rect(x+30, 150, 10, 88);
fill(128, g, b);
rect(x+40, 150, 10, 88);
fill(160, g, b);
rect(x+50, 150, 10, 88);
fill(192, g, b);
rect(x+60, 150, 10, 88);
fill(224, g, b);
rect(x+70, 150, 10, 88);
fill(255, g, b);
rect(x+80, 150, 10, 88);
fill(r, 0, b);
rect(x1, 150, 10, 88);
fill(r, 32, b);
rect(x1+10, 150, 10, 88);
fill(r, 64, b);
rect(x1+20, 150, 10, 88);
fill(r, 96, b);
rect(x1+30, 150, 10, 88);
fill(r, 128, b);
rect(x1+40, 150, 10, 88);
fill(r, 160, b);
rect(x1+50, 150, 10, 88);
fill(r, 192, b);
rect(x1+60, 150, 10, 88);
fill(r, 224, b);
rect(x1+70, 150, 10, 88);
fill(r, 255, b);
rect(x1+80, 150, 10, 88);
fill(r, g, 0);
rect(x2, 150, 10, 88);
fill(r, g, 32);
rect(x2+10, 150, 10, 88);
fill(r, g, 64);
rect(x2+20, 150, 10, 88);
fill(r, g, 96);
rect(x2+30, 150, 10, 88);
fill(r, g, 128);
rect(x2+40, 150, 10, 88);
fill(r, g, 160);
rect(x2+50, 150, 10, 88);
fill(r, g, 192);
rect(x2+60, 150, 10, 88);
fill(r, g, 224);
rect(x2+70, 150, 10, 88);
fill(r, g, 255);
rect(x2+80, 150, 10, 88);
fill(0);
rect(50, 285, 490, 20)
fill(255);
text("R: " + Math.round(r),80, 300); 
fill(255);
text("G: " + Math.round(g), 280, 300);
fill(255);
text("B: " + Math.round(b), 480, 300);
}
function serverConnected() {
}
function portOpen() {
}
if (inString.length > 0 ) {
}
}
}
}
function portClose() {
}
for (var i = 0; i < portList.length; i++) {
}
}
var r, g, b;
var x = 45;
var x1 = 240;
var x2 = 440;
function setup() { 
createCanvas(600, 400);
redslider = createSlider(0, 255, 0);
greenslider = createSlider(0, 255, 0);
blueslider = createSlider(0, 255, 0);
redslider.position(30, 100);
greenslider.position(220, 100);
blueslider.position(430, 100);
} 
function draw() { 
background(r, g, b);
redslider.value(r);
greenslider.value(g);
blueslider.value(b);
fill(0, g, b);
rect(x, 150, 10, 88);
fill(32, g, b);
rect(x+10, 150, 10, 88);
fill(64, g, b);
rect(x+20, 150, 10, 88);
fill(96, g, b);
rect(x+30, 150, 10, 88);
fill(128, g, b);
rect(x+40, 150, 10, 88);
fill(160, g, b);
rect(x+50, 150, 10, 88);
fill(192, g, b);
rect(x+60, 150, 10, 88);
fill(224, g, b);
rect(x+70, 150, 10, 88);
fill(255, g, b);
rect(x+80, 150, 10, 88);
fill(r, 0, b);
rect(x1, 150, 10, 88);
fill(r, 32, b);
rect(x1+10, 150, 10, 88);
fill(r, 64, b);
rect(x1+20, 150, 10, 88);
fill(r, 96, b);
rect(x1+30, 150, 10, 88);
fill(r, 128, b);
rect(x1+40, 150, 10, 88);
fill(r, 160, b);
rect(x1+50, 150, 10, 88);
fill(r, 192, b);
rect(x1+60, 150, 10, 88);
fill(r, 224, b);
rect(x1+70, 150, 10, 88);
fill(r, 255, b);
rect(x1+80, 150, 10, 88);
fill(r, g, 0);
rect(x2, 150, 10, 88);
fill(r, g, 32);
rect(x2+10, 150, 10, 88);
fill(r, g, 64);
rect(x2+20, 150, 10, 88);
fill(r, g, 96);
rect(x2+30, 150, 10, 88);
fill(r, g, 128);
rect(x2+40, 150, 10, 88);
fill(r, g, 160);
rect(x2+50, 150, 10, 88);
fill(r, g, 192);
rect(x2+60, 150, 10, 88);
fill(r, g, 224);
rect(x2+70, 150, 10, 88);
fill(r, g, 255);
rect(x2+80, 150, 10, 88);
fill(0);
rect(60, 285, 460, 20)
fill(255);
text("R: " + Math.round(r),80, 300); 
fill(255);
text("G: " + Math.round(g), 270, 300);
fill(255);
text("B: " + Math.round(b), 470, 300);
}
function serverConnected() {
}
function portOpen() {
}
if (inString.length > 0 ) {
}
}
}
}
function portClose() {
}
for (var i = 0; i < portList.length; i++) {
}
}
var speed = 0; 
var myButton;
var counter;
var state = 0;
var time = 100;
function setup() { 
createCanvas(displayWidth, displayHeight-95);
myButton = createButton("Strobe");
myButton.position((width/2-20), height-24);
myButton.mousePressed(strobeON);
myButton.mouseReleased(strobeOFF);
} 
function draw() { 
if (state == 1){
strobe();
}
else{
background(0);
}
}
function strobe(){
if (counter() < (time/2 - 1)){
background(0);
}
if (counter() > time/2){
background(255);
}
}
function counter(){
return millis() % time;
}
function strobeON(){
state = 1;
}
function strobeOFF(){
state = 0;
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
function setup() {
}
function draw() {
}
for (var i = 0; i < portList.length; i++) {
}
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
var xPos = 0; 
var yPos = 150;
function setup() {
createCanvas(400, 300);
background(0x08, 0x16, 0x40);
}
function serverConnected() {
}
function portOpen() {
}
function draw() {
graphData(inData)
}
}
}
function portClose() {
}
for (var i = 0; i < portList.length; i++) {
}
}
function graphData() {
point(xPos, yPos);
}
var speed = 0; 
var myButton;
var counter;
var state = 0;
var start, end, time;
var gif, scary, scary1;
var bright, mapped;
function setup() { 
createCanvas(windowWidth, windowHeight);
scary.style("opacity", 0);
dead.style("opacity", 0);
} 
function draw() { 
background(0, 0, 0, 255);
if (mapped > 0.4){
textSize(100);
fill(255, 0, 0);
text("STAY IN THE LIGHT!", 50, 100);
dead.style("opacity", 0);
scary.style("opacity", mapped);
scary.position(windowWidth/2 - 200, windowHeight/2 - 200);
} 
if (mapped < 0.4) {
scary.style("opacity", 0);
dead.style("opacity", 1);
dead.position(windowWidth/2 + 150, windowHeight/2 - 300);
textSize(200);
fill(255, 0, 0);
text("You Died", 150, 450);
}
}
function serverConnected() {
}
function portOpen() {
}
mapped = map(bright, 60 , 220, 0, 1);
}
}
function portClose() {
}
for (var i = 0; i < portList.length; i++) {
}
}
var myButton;
var counter;
var state = 0;
var time = 100;
function setup() { 
createCanvas(displayWidth, displayHeight-95);
myButton = createButton("Strobe");
myButton.position((width/2-20), height-20);
myButton.mousePressed(strobeON);
myButton.mouseReleased(strobeOFF);
} 
function draw() { 
if (state == 1){
strobe();
}
else{
background(0);
}
}
function strobe(){
if (counter() < (time/2 - 1)){
background(0);
}
if (counter() > time/2){
background(255);
}
}
function counter(){
return millis() % time;
}
function strobeON(){
state = 1;
}
function strobeOFF(){
state = 0;
}
var circles = [];
function setup() { 
createCanvas(400, 400);
smooth();
frameRate(30);
smooth();
background(0);
} 
function draw() { 
background(0);
click();
for (var i=0; i<circles.length;i++){
circles[i].fall();
circles[i].display();
circles[i].bounce();
}
for (var j=0; j<balls.length;j++){
balls[j].drawball();
balls[j].bounce();
}
lengthCheck();
}
class circle{
constructor() {
this.x = mouseX;
this.y = mouseY;
this.diameter = random(1,10);
this.speedy = random(-5,5);
this.color = color(random(255), random(255), random(255));
}
fall(){
this.y += this.speedy;
}
display(){
fill(this.color);
stroke(this.color);
ellipse(this.x, this.y, this.diameter);
}
bounce(){
if(this.y > height){
this.speedy = this.speedy*(-1);
}
if(this.y < 0){
this.speedy = this.speedy*(-1);
}
if(this.x > width){
this.speedx = this.speedx*(-1);
}
if(this.x < 0){
this.speedx = this.speedx*(-1);
}
}
}
function click() {
if (mouseIsPressed){
circles.push(new circle());
}
}
function lengthCheck() {
if (circles.length > 200) {
circles.splice(0, 1) ;
}
}
class ball {
constructor() {
this.x = width/2;
this.y = height;
}
drawball () {
noStroke();
fill(0,0,0);
rect(this.x,this.y,10,10);
this.x = this.x - this.angle;
}
}
function setup() { 
background(0);
createCanvas(400, 400);
smooth();
frameRate(30);
smooth();
background(0);
} 
function draw() { 
background(0);
click();
for (var i=0; i<circles.length;i++){
circles[i].fall();
circles[i].display();
circles[i].bounce();
}
for (var j=0; j<balls.length;j++){
balls[j].drawball();
balls[j].bounce();
}
lengthCheck();
}
class circle{
constructor() {
this.x = mouseX;
this.y = mouseY;
this.diameter = random(1,10);
this.speedx = random(-5,5);
this.speedy = random(-5,5);
this.color = color(random(255), random(255), random(255));
}
fall(){
this.x += this.speedx
this.y += this.speedy;
}
display(){
fill(this.color);
stroke(this.color);
ellipse(this.x, this.y, this.diameter);
}
bounce(){
if(this.y > height){
this.speedy = this.speedy*(-1);
}
if(this.y < 0){
this.speedy = this.speedy*(-1);
}
if(this.x > width){
this.speedx = this.speedx*(-1);
}
if(this.x < 0){
this.speedx = this.speedx*(-1);
}
}
}
function click() {
if (mouseIsPressed){
circles.push(new circle());
}
}
function lengthCheck() {
if (circles.length > 200) {
circles.splice(0, 1) ;
}
}
class ball {
constructor() {
this.x = width/2;
this.y = height;
}
drawball () {
noStroke();
fill(0,0,0);
rect(this.x,this.y,10,10);
this.x = this.x - this.angle;
}
}
var xPos = 0; 
function setup() {
createCanvas(400, 300);
background(0x08, 0x16, 0x40);
}
function serverConnected() {
}
function portOpen() {
}
function draw() {
graphData(inData)
}
}
}
function portClose() {
}
for (var i = 0; i < portList.length; i++) {
}
}
function graphData(newData) {
var yPos = map(newData, 0, 255, 0, height);
stroke(0xA8, 0xD9, 0xA7);
line(xPos, height, xPos, height - yPos);
if (xPos >= width) {
xPos = 0;
background(0x08, 0x16, 0x40);
} else {
xPos++;
}
}
var circles = [];
var balls = [];
function setup() { 
createCanvas(400, 400);
smooth();
frameRate(30);
smooth();
background(0);
} 
function draw() { 
click();
for (var i=0; i<circles.length;i++){
circles[i].fall();
circles[i].display();
circles[i].bounce();
}
for (var j=0; j<balls.length;j++){
balls[j].drawball();
balls[j].bounce();
}
lengthCheck();
}
class circle{
constructor() {
this.x = mouseX;
this.y = mouseY;
this.diameter = random(1,10);
this.speedx = random(-5,5);
this.speedy = random(-5,5);
this.color = color(random(255), random(255), random(255));
}
fall(){
this.x += this.speedx
this.y += this.speedy;
}
display(){
fill(this.color);
stroke(this.color);
ellipse(this.x, this.y, this.diameter);
}
bounce(){
if(this.y > height){
this.speedy = this.speedy*(-1);
}
if(this.y < 0){
this.speedy = this.speedy*(-1);
}
if(this.x > width){
this.speedx = this.speedx*(-1);
}
if(this.x < 0){
this.speedx = this.speedx*(-1);
}
}
}
function click() {
if (mouseIsPressed){
circles.push(new circle());
balls.push(new ball());
}
}
function lengthCheck() {
if (circles.length > 25) {
circles.splice(0, 1) ;
}
}
class ball {
constructor() {
this.x = width/2;
this.y = height;
}
drawball () {
noStroke();
fill(0,0,0);
rect(this.x,this.y,10,10);
this.x = this.x - this.angle;
}
bounce(){
if(this.y > height){
this.speedy = this.speedy*(-1);
}
if(this.y < 0){
this.speedy = this.speedy*(-1);
}
if(this.x > width){
this.speedx = this.speedx*(-1);
}
if(this.x < 0){
this.speedx = this.speedx*(-1);
}
}
}
var count = 0;
var posY = [];
var faders = 3;
function setup() {
createCanvas(400, 400);
frameRate(30);
generate(faders);
}
function draw() {
background(posYMap(25), posYMap(75), posYMap(125));
for (i = 25; i < faders ; i += 50) {
Fader(i, 50, 350);
}
}
function colorPicker(r,g,b){
rect(280,85,110,60);
textAlign(CENTER);
textStyle(BOLD);
text("Color Picker",335,100);
textStyle(NORMAL);
text("R: " + Math.round(r),335,112); 
text("G: " + Math.round(g),335,125);
text("B: " + Math.round(b),335,138);
}
function Fader(x, y1, y2) {
strokeWeight(4);
line(x, y1, x, y2);
var flagX, flagY;
if (mouseX > x - 22 && mouseX < x + 22) {
flagX = true;
}
if (mouseY > y1-1  && mouseY < y2+1) {
flagY = true;
}
if (flagY && flagX && mouseIsPressed) {
posY[i] = mouseY;
count = i;
}
ellipse(x, posY[i], 40, 40);
}
function generate(x){
faders = x * 50;
for (i = 25; i < faders; i += 50) {
posY[i]=350;
}
}
function posYMap(i){
var pos_y = posY[i];
return map(pos_y, 350, 50, 0, 255);
}
class slider{
constructor(x,,,){
this.x = x;
}
slide(){
}
}
var chicken = {
x: -30,
y: (Math.random() * 200) + 70,
}
var tinyChicken = {
x: chicken.x - 100,
y: chicken.y + 60,
}
var eggX;
var eggY;
var eggW;
var eggH;
var isChickHatched;
var eggCounter;
var chickenSpeed;
var randomNestPos;
function preload() {
plopSound = loadSound('plop.mp3');
chickSound = loadSound('chicken.wav');
chickSoundShort = loadSound('chickenshort.wav');
grass = loadImage("grass.jpg");
}
function setup() {
createCanvas(400, 400);
chickSound.setVolume(0.2);
chickSound.play();
chicken.x = -30;
chicken.y = (Math.random() * 200) + 70;
isEgg = 0;
hatchedEgg = 0;
isChickHatched = 0;
eggCounter = 0;
chickenSpeed = 8;
randomNestPos = (Math.random() * 200) + 70;
eggW = 20;
eggH = 30;
}
function draw() {
frameRate(chickenSpeed);
background(26, 148, 49);
drawTinyChicken();
laidEgg();
nest();
drawChicken();
chickenWalking();
checkIfEggHitNest();
}
function nest() {
fill(170, 107, 51);
ellipseMode(CENTER);
fill(255, 215, 0);
fill(0);
strokeWeight(0);
textSize(20);
textAlign(CENTER);
text(eggCounter, randomNestPos, 365);
}
function checkIfEggHitNest() {
if ((eggX < randomNestPos + 25) && (eggX > randomNestPos - 25)) {
if (eggY > 420) {
eggCounter++;
randomNestPos = (Math.random() * 200) + 70;
chickenSpeed = chickenSpeed + 1;
}
}
}
function laidEgg() {
if (eggY >= 430) {
isEgg = 0;
hatchedEgg = 0;
}
if (isEgg == 1) {
if (hatchedEgg == 0) {
drawEgg();
eggY = eggY + 8;
}
else if (hatchedEgg == 1) {
drawEgg();
eggY = eggY + 8;
}
}
}
function drawEgg() {
if (hatchedEgg == 0) {
fill(255, 215, 0);
ellipse(eggX, eggY, eggW, eggH);
} else if (hatchedEgg == 1) {
strokeWeight(2);
fill(255, 215, 0);
arc(eggX, eggY, eggW, eggH, 6.3, 3.1, CLOSE);
line(eggX - (eggW / 2), eggY, eggX - eggW / 5, eggY + (eggH / 6));
line(eggX - eggW / 5, eggY + (eggH / 6), eggX, eggY);
line(eggX, eggY, eggX + eggW / 5, eggY + (eggH / 6));
line(eggX + eggW / 5, eggY + (eggH / 6), eggX + (eggW / 2) - 1, eggY);
noStroke();
fill(26, 148, 49);
triangle(eggX - (eggW / 2) + 2, eggY, eggX - (eggW / 5), eggY + (eggH / 6), eggX - 2, eggY);
triangle(eggX + 2, eggY, eggX + eggW / 5, eggY + (eggH / 6), eggX + (eggW / 2) - 2, eggY);
stroke(0);
}
}
function mousePressed() {
if (mouseX <= chicken.x + 33 && mouseX >= chicken.x - 33 && mouseY <= chicken.y + 40 && mouseY >= chicken.y - 40) {
plopSound.setVolume(0.5);
plopSound.play();
hatchedEgg = 0;
drawEgg();
eggX = chicken.x;
eggY = chicken.y + 80;
isEgg = 1;
chicken.x += 15;
chickSoundShort.setVolume(0.5);
chickSoundShort.play();
} else if (mouseX <= eggX + 10 && mouseX >= eggX - 10 && mouseY <= eggY + 15 && mouseY >= eggY - 15) {
hatchedEgg = 1;
isChickHatched = 1;
drawTinyChicken();
}
}
function chickenWalking() {
if (chicken.x == -30) {
chicken.x = chicken.x + chickenSpeed;
} else if (chicken.x > 450 || chicken.y > 300) {
chicken.x = -30;
chicken.y = (Math.random() * 200) + 70;
} else if (chicken.x >= -29) {
chicken.x = chicken.x + chickenSpeed;
}
}
function drawChicken() {
ellipseMode(CENTER);
strokeWeight(2);
fill(255, 40, 0);
ellipse(chicken.x + 20, chicken.y - 35, 10, 15);
arc(chicken.x + 15, chicken.y - 40, 8, 25, 2, 6.5, OPEN);
fill(255, 255, 0);
arc(chicken.x + 32, chicken.y - 12, 8, 15, 6.3, 2);
line(chicken.x + 32, chicken.y - 12, chicken.x + 36, chicken.y - 12);
fill(255);
ellipse(chicken.x, chicken.y, 66, 80);
line(chicken.x, chicken.y, chicken.x - 10, chicken.y - 10);
line(chicken.x - 10, chicken.y - 10, chicken.x - 10, chicken.y);
fill(0);
ellipse(chicken.x + 10, chicken.y - 10, 5, 10);
line(chicken.x, chicken.y + 40, chicken.x, chicken.y + 45);
line(chicken.x, chicken.y + 45, chicken.x + 3, chicken.y + 45);
line(chicken.x, chicken.y + 40, chicken.x, chicken.y + 45);
line(chicken.x, chicken.y + 45, chicken.x + 3, chicken.y + 45);
}
function drawTinyChicken() {
if (isChickHatched == 1) {
ellipseMode(CENTER);
strokeWeight(2);
fill(255, 40, 0);
ellipse(tinyChicken.x + 3, tinyChicken.y - 8, 8, 15);
fill(255, 255, 0);
arc(tinyChicken.x + 8, tinyChicken.y - 1, 6, 10, 6.3, 2);
line(tinyChicken.x + 8, tinyChicken.y - 1, tinyChicken.x + 11, tinyChicken.y - 1);
fill(255);
ellipse(tinyChicken.x, tinyChicken.y, 15, 20);
line(tinyChicken.x, tinyChicken.y, tinyChicken.x - 3, tinyChicken.y - 3);
line(tinyChicken.x - 3, tinyChicken.y - 3, tinyChicken.x - 3, tinyChicken.y);
fill(0);
ellipse(tinyChicken.x + 3, tinyChicken.y - 3, 2, 4);
line(tinyChicken.x, tinyChicken.y + 10, tinyChicken.x, tinyChicken.y + 15);
line(tinyChicken.x, tinyChicken.y + 15, tinyChicken.x + 2, tinyChicken.y + 15)
tinyChicken.x = chicken.x - 40;
tinyChicken.y = chicken.y + 30;
}
}
var angle, rot;
function setup() {
createCanvas(400, 400);
frameRate(30);
rectMode(CENTER);
textAlign(CENTER);
}
function draw() {
Fader(200, 20, 380);
angler();
}
function Fader(x, y1, y2) {
strokeWeight(4);
line(x, y1, x, y2);
var flagX, flagY;
flagY = true;
}
flagX = true;
}
}
rot = map(posY, 20, 380, 0, TWO_PI);
translate(200, posY);
rotate(rot);
rect(0, 0, 80, 40);
}
function angler() {
rotate(0 - rot);
angle = abs(round(180 - degrees(rot)));
fill(posY-50, 100, 100, 1)
text(angle, 0, 5);
}
var chicken = {
x: -30,
y: (Math.random() * 200) + 70,
}
var eggX;
var eggY;
var eggCounter;
var chickenSpeed;
var randomx;
function preload() {
plopSound = loadSound('plop.mp3');
chickSound = loadSound('chicken.wav');
chickSoundShort = loadSound('chickenshort.wav');
grass = loadImage("grass.jpg");
}
function setup() {
createCanvas(400, 400);
chickSound.setVolume(0.2);
chickSound.play();
chicken.x = -30;
chicken.y = (Math.random() * 200) + 70;
isEgg = 0;
eggCounter = 0;
chickenSpeed = 10;
randomx = random(400);
}
function draw() {
frameRate(chickenSpeed);
background(26, 148, 49);
nest();
laidEgg();
drawChicken();
chickenWalking();
check();
}
function nest() {
fill(170, 107, 51);
ellipseMode(CENTER);
ellipse(randomx, 385, 70, 30);
fill(255, 215, 0);
ellipse(randomx, 360, 40, 60);
fill(0);
textSize(20);
textAlign(CENTER);
text(eggCounter, randomx, 365);
}
function check() {
if ((eggX < randomx + 15) && (eggX > randomx - 15)){
if(eggY > 420){
eggCounter++;
randomx = random(400)
chickenSpeed = chickenSpeed + 1;
}
}
}
function laidEgg() {
if (isEgg == 1) {
fill(255, 215, 0);
ellipse(eggX, eggY, 20, 30);
eggY = eggY + 8;
}
}
function mousePressed() {
if (mouseX <= chicken.x + 33 && mouseX >= chicken.x - 33 && mouseY <= chicken.y + 40 && mouseY >= chicken.y - 40) {
plopSound.setVolume(0.5);
plopSound.play();
fill(255, 215, 0);
ellipse(chicken.x, chicken.y + 35, 20, 30);
eggX = chicken.x;
eggY = chicken.y + 80;
isEgg = 1;
chicken.x += 15;
chickSoundShort.setVolume(0.5);
chickSoundShort.play();
}
}
function chickenWalking() {
if (chicken.x == -30) {
chicken.x = chicken.x + chickenSpeed;
} else if (chicken.x > 450 || chicken.y > 300) {
chicken.x = -30;
chicken.y = (Math.random() * 200) + 70;
} else if (chicken.x >= -29) {
chicken.x = chicken.x + chickenSpeed;
}
}
function drawChicken() {
ellipseMode(CENTER);
strokeWeight(2);
fill(255, 40, 0);
ellipse(chicken.x + 20, chicken.y - 35, 10, 15);
arc(chicken.x + 15, chicken.y - 40, 8, 25, 2, 6.5, OPEN);
fill(255, 255, 0);
arc(chicken.x + 32, chicken.y - 12, 8, 15, 6.3, 2);
line(chicken.x + 32, chicken.y - 12, chicken.x + 36, chicken.y - 12);
fill(255);
ellipse(chicken.x, chicken.y, 66, 80);
line(chicken.x, chicken.y, chicken.x - 10, chicken.y - 10);
line(chicken.x - 10, chicken.y - 10, chicken.x - 10, chicken.y);
fill(0);
ellipse(chicken.x + 10, chicken.y - 10, 5, 10);
line(chicken.x, chicken.y + 40, chicken.x, chicken.y + 45);
line(chicken.x, chicken.y + 45, chicken.x + 3, chicken.y + 45);
line(chicken.x, chicken.y + 40, chicken.x, chicken.y + 45);
line(chicken.x, chicken.y + 45, chicken.x + 3, chicken.y + 45);
}
var posY = [];
var faders = 3;
var Red, Green, Blue;
var colour = [];
function setup() {
createCanvas(400, 400);
frameRate(30);
generate(faders);
}
function draw() {
background(posYMap(25), posYMap(75), posYMap(125));
for (i = 25; i < faders ; i += 50) {
Fader(i, 50, 350);
}
}
function Fader(x, y1, y2, colour) {
strokeWeight(4);
line(x, y1, x, y2);
var flagX, flagY;
if (mouseX > x - 22 && mouseX < x + 22) {
flagX = true;
}
if (mouseY > y1  && mouseY < y2) {
flagY = true;
}
if (flagY && flagX && mouseIsPressed) {
posY[i] = mouseY;
count = i;
}
ellipse(x, posY[i], 40, 40);
}
function generate(x){
faders = x * 50;
for (i = 25; i < faders; i += 50) {
posY[i]=350;
}
}
function posYMap(i){
var pos_y = posY[i];
return map(pos_y, 350, 50, 0, 255);
}
class slider{
constructor(x,,,){
this.x = x;
}
slide(){
}
}
function setup() {
createCanvas(720,640); 
frameRate(30);
smooth();
rectMode(CENTER);
}
function draw() {
background(0);
var size = countsize(frameCount, 1800);
drawCircle(width/2, height/2, size); 
}
function drawCircle(x,y,r) {
noFill();
stroke(countsize2(r, 255));
ellipse(x, y, r, r);
ellipse(x, y+r/PI, r, r);
ellipse(x, y-r/PI, r, r);
ellipse(x+r/PI, y, r, r);
ellipse(x-r/PI, y, r, r);
var twor = PI*r;
if(r > 2) {
drawCircle(x, y, r - 8);
}
}
function countsize(x, y){
if (x%y < 0.5*y){
return x%y;
}
else {
return y-(x%y);
}
}
function countsize2(x, y){
if (x%y < y/2){
return x%y;
}
else {
return y-(x%y);
}
}function setup() {
createCanvas(400, 400);
frameRate(18);
noStroke();
smooth();
}
function draw() {
var eX = random(50, 350);
var eY = random(50, 350);
var eSize = random(25, 100);
if (frameCount % 2) {
background(128);
fill(0);
rect(eX-50, eY, eSize, eSize);
}
else {
background(0);
fill(255);
ellipse(eX, eY, eSize);
}
function setup() {
createCanvas(400, 400);
frameRate(30);
rectMode(CENTER);
}
function draw() {
Fader(200, 50, 350);
}
function Fader(x, y1, y2) {
strokeWeight(4);
line(x, y1, x, y2);
var flagX, flagY;
flagY = true;
}
flagX = true;
}
}
var rot = map(posY, 50, 350, 0, TWO_PI);
translate(200, posY);
rotate(rot);
rect(0, 0, 80, 40);
}
var count = 0;
var posY = 350;
var posY1 = 350;
function setup() {
createCanvas(400, 400);
frameRate(30);
}
function draw() {
background(128);
for (i = 25; i < 100; i += 50) {
Fader(i, 50, 350);
}
}
function Fader(x, y1, y2) {
strokeWeight(4);
line(x, y1, x, y2);
var flagX, flagY;
if (mouseX > x - 20 && mouseX < x + 20) {
flagX = true;
}
if (mouseY > y1 && mouseY < y2) {
flagY = true;
}
if (flagY && flagX && mouseIsPressed) {
posY = mouseY;
count = i;
}
if (count == i) {
ellipse(x, posY, 40, 40)
}
else {
ellipse(x, posY1, 40, 40)
}
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
for (var i = 0; i < 21; i++) {
for (var j = 0; j < 21; j++) {
var yForThisDot = j * 21;
var distance = dist(mouseX, mouseY, xForThisDot, yForThisDot);
county = j;
}
}
else { 
}
}
}
}var posY = 350;
var posY1, bg;
function setup() {
createCanvas(400, 400);
frameRate(30);
colorMode(HSB, 300, 100, 100, 1);
}
function draw() {
background(posY-50, 100, 100, 1);
Fader(200, 50, 350);
}
function Fader(x, y1, y2) {
strokeWeight(4);
line(x, y1, x, y2);
var flagX, flagY;
if (mouseY > y1 - 20 && mouseY < y2 ) {
flagY = true;
}
if (mouseX > x - 30 && mouseX < x + 30) {
flagX = true;
}
if ((flagY && flagX) && mouseIsPressed) {
posY = mouseY;
}
var inverse = (posY+100)%300;
fill(inverse, 100, 100, 1);
rect(x - 30, posY, 60, 20);
}
function setup() {
createCanvas(400, 400);
frameRate(30);
}
function draw() {
var bgcolor = map(mouseX,0, 400, 0, 255);
background(bgcolor);
strokeWeight(4);
noStroke();
rect(0, 347.5, 400, 5);
}
}
}
var eX = random(50, 300);
var eY = random(50, 300);
var eSize = random(1, 100);
fill(255-bgcolor);
ellipse(eX, eY, eSize);
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
strokeWeight(4);
line(0, 350, 400, 350);
}
}
}
}var speedx, speedx1;
var speedy, speedy1;
var r, g, b;
var dirx, diry;
function setup() {
createCanvas(600, 400);
x = width / 2;
y = height / 2;
background(0);
smooth();
speedx = random(-5, 5);
speedy = random(-5, 5);
frameRate(30);
frames = 240;
colorMode(HSB);
}
function draw() {
if (floor((frameCount % frames) / (frames/2)) % 2 == 0) {
b = floor(((frameCount % frames) / frames) * 255);
} else {
b = floor(255 - ((frameCount % frames) / frames) * 255);
}
if (floor((frameCount % frames) / (frames/2)) % 2 == 0) {
h = floor(((frameCount % frames) / frames) * 720);
} else {
h = floor(720 - ((frameCount % frames) / frames) * 720);
}
stroke(h, 100, 100);
fill(0, 0, 0, 0);
sizex = map(x, 0, width, -50, 50);
rectMode(CENTER);
rect(x, y, sizex, sizex);
speedx1 = random(1, 5);
speedy1 = random(1, 5);
if (x > width) {
dirx = -1;
speedx = dirx * speedx1;
}
if (x < 0) {
dirx = 1;
speedx = dirx * speedx1;
}
if (y > height) {
diry = -1;
speedy = diry * speedy1;
}
if (y < 0) {
diry = 1;
speedy = diry * speedy1;
}
x = x + speedx;
y = y + speedy;
}var img;
function preload() {
img = loadImage("puggo.JPG");
}
function setup() {
createCanvas(1080, 1080);
}
function draw() {
image(img, 0, 0);
}var speedx, speedx1;
var speedy, speedy1;
var r, g, b;
var dirx, diry;
function setup() {
createCanvas(600, 400);
x = width / 2;
y = height / 2;
background(0);
smooth();
speedx = random(-5, 5);
speedy = random(-5, 5);
frameRate(120);
frames = 240;
}
function draw() {
r = map(x, 0, width, 0, 255);
g = map(y, 0, height, 0, 255);
b = map(speedx + speedy, -5, 5, 0, 255);
if (floor((frameCount % frames) / (frames/2)) % 2 == 0) {
a = floor(((frameCount % frames) / frames) * 255);
} else {
a = floor(255 - ((frameCount % frames) / frames) * 255);
}
stroke(r, g, b, a);
fill(0, 0, 0, 0);
sizex = map(x, 0, width, -50, 50);
rectMode(CENTER);
rect(x, y, sizex, sizex);
speedx1 = random(1, 5);
speedy1 = random(1, 5);
if (x > width) {
dirx = -1;
speedx = dirx * speedx1;
}
if (x < 0) {
dirx = 1;
speedx = dirx * speedx1;
}
if (y > height) {
diry = -1;
speedy = diry * speedy1;
}
if (y < 0) {
diry = 1;
speedy = diry * speedy1;
}
x = x + speedx;
y = y + speedy;
}var speedx;
var speedy;
var r, g, b;
function setup() { 
createCanvas(600, 400);
x = width/2;
y = height/2;
background(0);
smooth();
speedx = random(-5, 5);
speedy = random(-5, 5);
} 
function draw() { 
r = map(x, 0, width, 0, 255);
g = map(y, 0, height, 0, 255);
b = map(speedx + speedy, -5, 5, 0, 255);
a = 88
sizex = map(x, 0, width, -50, 50);
sizey =  map(y, 0, height, -50, 50);
fill(0, 0, 0, 0);
stroke(r, g, b, 188);
ellipseMode(CENTER);
ellipse(x, y, sizex, sizey);
if (x > width) {
speedx = random(-1, -5);
}
if (x < 1) {
speedx = random(1, 5);
}
if (y > height) {
speedy = random(-1, -5);
}
if (y < 1) {
speedy = random(1, 5);
}
x = x + speedx;
y = y + speedy;
}var speedx;
var r, g, b;
var startwidth = 300;
var startheight = 200;
function setup() { 
createCanvas(600, 400);
x = startwidth;
y = startheight;
background(0);
smooth();
speedx = random(-5, 5);
} 
function draw() { 
r = map(x, 0, width, 0, 255);
g = map(y, 0, height, 0, 255);
b = map(speedx, -5, 5, 0, 255);
a = 88
size = map(x, 0, width, 0, 100);
fill(r, g, b, a);
stroke(r, g, b, 188);
ellipseMode(CENTER);
ellipse(x, y, size);
if (x > width) {
speedx = random(-1, -5);
}
if (x < 1) {
speedx = random(1, 5);
}
x = x + speedx;
}var speedx;
var speedy;
var r, g, b;
function setup() { 
createCanvas(600, 400);
x = width/2;
y = height/2;
background(0);
smooth();
speedx = random(-5, 5);
speedy = random(-5, 5);
} 
function draw() { 
r = map(x, 0, width, 0, 255);
g = map(y, 0, height, 0, 255);
b = map(speedx + speedy, -5, 5, 0, 255);
a = 88
size = map(x, 0, width, -50, 50);
fill(r, g, b, a);
stroke(r, g, b, 188);
ellipseMode(CENTER);
ellipse(x, y, size);
if (x > width) {
speedx = random(-1, -5);
}
if (x < 1) {
speedx = random(1, 5);
}
if (y > height) {
speedy = random(-1, -5);
}
if (y < 1) {
speedy = random(1, 5);
}
x = x + speedx;
y = y + speedy;
}var speedx;
var speedy;
var r, g, b;
function setup() { 
createCanvas(600, 400);
x = width/2;
y = height/2;
background(0);
smooth();
speedx = random(-5, 5);
speedy = random(-5, 5);
} 
function draw() { 
r = map(x, 0, width, 0, 255);
g = map(y, 0, height, 0, 255);
b = map(speedx + speedy, -5, 5, 0, 255);
a = 88
size = map(x, 0, width, 0, 100);
fill(r, g, b, a);
stroke(r, g, b, 188);
ellipseMode(CENTER);
ellipse(x, y, size);
if (x > width) {
speedx = random(-1, -5);
}
if (x < 1) {
speedx = random(1, 5);
}
if (y > height) {
speedy = random(-1, -5);
}
if (y < 1) {
speedy = random(1, 5);
}
x = x + speedx;
y = y + speedy;
}var x = 15;
var colour = 6;
function setup() { 
createCanvas(400, 400);
colorMode(HSB, 12, 100, 100)
background(220);
} 
function draw() { 
fill(colour, 100, 100);
if (mouseIsPressed)
ellipse(mouseX, mouseY, x, x)
}
function keyPressed () {
if (keyCode == BACKSPACE)
background(220);
if (keyCode == UP_ARROW)
x = x + 5;
if (keyCode == DOWN_ARROW)
if (x > 5)
x = x - 5;
if (keyCode == LEFT_ARROW)
if (colour > -2)
colour = colour - 1;
if (colour == -1)
colour = 12;
if (keyCode == RIGHT_ARROW)
if (colour < 12)	
colour = (colour + 1) % 12;
return false
function setup() { 
createCanvas(600, 400);
} 
function draw() { 
var size = 50;
var vert = 1.7;
}
function drawCube(x) {
}
function setup() { 
createCanvas(600, 400);
} 
function draw() { 
drawCube(size); 
}
function drawCube(xx) {
}
function setup() { 
createCanvas(600, 400);
colorMode(HSB, 360, 100, 100);
frameRate(18);
} 
function draw() { 
background(0);
var size = 40;
var count = frameCount;
translate(0, -3*size);
drawCube(size, counter(0), counter(1), counter(2));
translate(-size, 1.7*size);
drawCube(size, counter(3), counter(5), counter(4));
translate(2*size, 0);
drawCube(size, counter(7), counter(8), counter(6));
translate(size, 1.7*size);
drawCube(size, counter(9), counter(10), counter(11));
translate(-2*size, 0);
drawCube(size, counter(13), counter(12), counter(14));
translate(-2*size, 0);
drawCube(size, counter(16), counter(15), counter(17));
translate(-size, 1.7*size);
drawCube(size, counter(18), counter(20), counter(19));
translate(2*size, 0);
drawCube(size, counter(22), counter(23), counter(21));
translate(2*size, 0);
drawCube(size, counter(25), counter(26), counter(24));
translate(2*size, 0);
drawCube(size, counter(28), counter(29), counter(27));
}
function drawCube(xx, s1, s2, s3) {
var dW = 600;
var dH = 400;
var cW = dW/2;
var cH = dH/2;
var yy = xx/2;
fill(s1*12, 100, 100);
quad (cW, cH, cW + xx, cH - yy, cW, cH - xx, cW - xx, cH - yy);
fill(s2*12, 100, 100);
quad (cW, cH, cW + xx, cH - yy, cW + xx, cH + 1.414*yy, cW, cH+yy+1.414*yy);
fill(s3*12, 100, 100);
quad (cW, cH, cW, cH+yy+1.414*yy, cW - xx, cH + 1.414*yy, cW - xx, cH - yy);
}
function counter(x) {
var count = (frameCount + x) % 30;
return count;
}
function setup() { 
createCanvas(600, 400);
} 
function draw() { 
var size = 50;
}
function drawCube(xx) {
}