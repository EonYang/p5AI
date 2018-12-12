let data;
function preload() {
data = loadTable(
'PRSA-adapted-aparrish.csv',
'csv',
'header');
}
function colValsMinMax(tab, colName) {
let vals = data.getColumn(colName);
let obj = {
values: vals,
min: min(vals),
max: max(vals),
}
return obj;
}
function setup() {
createCanvas(640, 480);
console.log(data.getRowCount());
console.log(data.columns);
background(50);
let pm = colValsMinMax(data, "pm2.5");
console.log(pm.min);
console.log(pm.max);
let temps = colValsMinMax(data, "TEMP");
console.log(temps.min);
console.log(temps.max);
for (var i = 0; i < data.getRowCount(); i++) {
stroke(255, 128, 128);
let pmXpos = map(i, 0, data.getRowCount(), 0, width);
let pmYpos = map(pm.values[i], pm.min, pm.max, height, 0);
point(pmXpos, pmYpos);
stroke(128, 128, 255);
let tempXpos = map(i, 0, data.getRowCount(), 0, width);
let tempYpos = map(temps.values[i], temps.min, temps.max,
height, 0);
point(tempXpos, tempYpos);
}
}function setup() {
var data = [105, 212, 158, 31, 98, 54];
height = 350,
margin = 20,
h = height - 2 * margin;
createCanvas(width, height);
textSize(14);
push();
for(var i=0; i<data.length; i++) {
push();
fill('steelblue');
noStroke();
fill('#FFF');
pop();
}
pop();
}var font, r, g, b, wordIndex, system, fontsize = 60
let video;
let poseNet;
let poses = [];
let FearPool = [
"Expectations",
"Financial Responsibility",
"Student Loan",
"Failing P Comp ",
"Looking dumb in front of the class",
"GLOBAL WARMING",
"Finials in 4 weeks",
"Unplanned Pregnancy",
"Can’t find a job",
"Loneliness",
"Losing family",
"Breakups",
"Long-distance relationship",
"Competition",
"Hangover",
"Bored in life",
"Violence",
"Intolerance",
"Fascism",
"Having a stalker",
"Pizza with Pineapples",
"Warm beer",
"Hatred",
"PTSD",
"Sleep Paralysis",
"Street food with strang looking meat",
"Paralyzed by fear",
]
function setup() {
createCanvas(640, 480);
textSize(fontsize);
textAlign(CENTER, CENTER);
r = random(0, 255);
g = random(0, 255);
b = random(0, 255);
wordIndex = floor(random(0, 26));
createCanvas(640, 480);
system = new ParticleSystem(createVector(200, 200));
video = createCapture(VIDEO);
video.size(width, height);
poseNet = ml5.poseNet(video, modelReady);
poseNet.on('pose', function(results) {
poses = results;
});
video.hide();
}
function modelReady() {
select('#status').html('Model Loaded');
}
function draw() {
image(video, 0, 0, width, height);
drawExpectations();
for (let i = 0; i < poses.length; i++) {
let pose = poses[i].pose;
let nose = pose.keypoints[0];
let leftEar = pose.keypoints[3];
let sparkleRadius = dist(nose.position.x, nose.position.y, leftEar.position.x, leftEar.position.y);
if (nose.score > 0.2) {
system.origin.x = nose.position.x;
system.origin.y = nose.position.y;
system.addParticle();
system.run();
}
}
console.log(poses.length);
}
var Particle = function(position) {
this.acceleration = createVector(0, 0.05);
this.velocity = createVector(random(-1.5, 1.5), random(-2, 2));
this.position = position.copy();
this.lifespan = 190;
};
Particle.prototype.run = function() {
this.update();
this.display();
};
Particle.prototype.update = function() {
this.velocity.add(this.acceleration);
this.position.add(this.velocity);
this.lifespan -= 2;
};
Particle.prototype.display = function() {
stroke(200, this.lifespan);
noStroke();
fire(this.position.x, this.position.y, this.lifespan);
};
Particle.prototype.isDead = function() {
return this.lifespan < 0;
};
var ParticleSystem = function(position) {
this.origin = position.copy();
this.particles = [];
};
ParticleSystem.prototype.addParticle = function() {
this.particles.push(new Particle(this.origin));
};
ParticleSystem.prototype.run = function() {
for (var i = this.particles.length - 1; i >= 0; i--) {
var p = this.particles[i];
p.run();
if (p.isDead()) {
this.particles.splice(i, 1);
}
}
};
function fire(firex, firey, lifespan) {
fill(255, 164, 7, lifespan - 120);
ellipse(firex + random(5), firey, 21, 23);
fill(255, 126, 7, lifespan - 80);
ellipse(firex + random(2), firey, 14, 16);
fill(255, 160, 28, lifespan - 50);
ellipse(firex, firey, 6, 8);
fill(255, 75, 48, lifespan - 40);
ellipse(firex + random(2), firey, 4, 6);
fill(255, 58, 28, lifespan - 20);
ellipse(firex, firey + random(2), 3, 5 + random(2));
}
function drawExpectations() {
for (let i = 0; i < poses.length; i++) {
let pose = poses[i].pose;
let leftShoulder = pose.keypoints[5];
let rightShoulder = pose.keypoints[6];
let leftElbow = pose.keypoints[7];
let rightElbow = pose.keypoints[8];
let leftWrist = pose.keypoints[9];
let rightWrist = pose.keypoints[10];
let leftHip = pose.keypoints[11];
let rightHip = pose.keypoints[12];
strokeWeight(3);
stroke(255);
noFill();
let shoulderDist = dist(leftShoulder.position.x, leftShoulder.position.y, rightShoulder.position.x, rightShoulder.position.y) / 2;
let hipDist = dist(leftHip.position.x, leftHip.position.y, rightHip.position.x, rightHip.position.y) / 2;
let topX = rightShoulder.position.x + shoulderDist;
let topY = rightShoulder.position.y;
let bottomX = rightHip.position.x + hipDist;
let bottomY = rightHip.position.y;
wordIndex=floor(random(0,26));
fill(r, g, b);
textAlign(CENTER,CENTER);
text(FearPool[wordIndex], random(topX, bottomX), random(topY, bottomY));
}
}var mic;
var screen_factor = 3500
var balloon_value  
function setup() {
createCanvas(windowWidth, windowHeight);
mic = new p5.AudioIn();
mic.start()
}
function draw() {
background(255);
var vol;
vol = mic.getLevel();
var r = vol * screen_factor
var balloon = lerp(vol, r, 0.5);
console.log(balloon);
if (balloon < 100){
balloon = 100
}else{ 
balloon = balloon}
fill(100, 0, 0)
ellipse(width / 2, height / 2, balloon, balloon);
var inData;
var called = true;
var song_1;
var song_2;
var countdown = 0;
var delay = 3000;
function preload() {
song_2 = loadSound('assets/Winter_Lantern_Song.mp3');
song_1 = loadSound('assets/STE-001.wav')
}
function setup() {
createCanvas(400, 400);
background(0x08, 0x16, 0x40);
}
function draw() {
}
for (var i = 0; i < portList.length; i++) {
console.log(i + " " + portList[i]);
}
}
function serverConnected() {
console.log('connected to server.');
}
function portOpen() {
}
if (dataString.length > 0) {
inData = JSON.parse(dataString);
var A_cm = (inData.A_duration / 2) * 0.0343;
A_cm = constrain(A_cm, 0, 500);
var volume_1 = map(A_cm, 100, 10, 0, 1, true);
var volume_2 = map(A_cm, 10, 500, 0, 1, true);
song_1.amp(1);
song_2.amp(1);
if (A_cm < 85 && !called && millis() - countdown > delay) {
song_2.pause();
song_1.loop();
called = true;
countdown = millis();
} else if (A_cm > 100 && called && millis() - countdown > delay) {
song_1.pause();
song_2.loop();
called = false;
countdown = millis();
}
}
}
}
function portClose() {
var inData;
var outByte = 0;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(0);
fill(255);
text("incoming value: " + inData, 30, 30);
}
function keyPressed() {
}
}
for (var i = 0; i < portList.length; i++) {
console.log(i + " " + portList[i]);
}
}
function serverConnected() {
console.log('connected to server.');
}
function portOpen() {
}
inData = inByte
}
}
function portClose() {
var inData;
var xPos = 0;
function setup() {
createCanvas(400, 400);
background(0x08, 0x16, 0x40);
}
function draw() {
graphData(inData);
}
function graphData(newData){
var yPos = map (newData, 0,255,0,height)
stroke(0xA8,0xD9,0xA7);
line(xPos,height,xPos,height - yPos)
if (xPos >= width) {
xPos = 0;
background(0x08, 0x16, 0x40);
} else {
xPos++;
}
}
for (var i = 0; i < portList.length; i++) {
console.log(i + " " + portList[i]);
}
}
function serverConnected() {
console.log('connected to server.');
}
function portOpen() {
}
if (inString.length > 0){
inData = Number (inString);
}
}
}
function portClose() {
}var unit = 2;
var count;
var spirals = [];
class Spiral {
constructor() {
this.r = random(1, 20);
this.R = random(1, 10);
this.dR = random(0, 2);
this.t = random(1, PI);
this.dt = random(0, 2)
}
growth() {
this.osf = 10
this.gbf = this.osf - 0.3
this.x = cos(this.t) * this.R;
this.y = sin(this.t) * this.R;
this.xOffset = (width / this.osf);
this.yOffset = (height / this.osf)
if (abs(this.x) > (width - this.xOffset * this.gbf) && abs(this.y) > (height - this.yOffset * this.gbf)) {
this.dR = this.dR * -1
this.dt = this.dt * -1
} else {
this.dR = this.dR
this.dt = this.dt
}
this.R += this.dR
this.t += this.dt
}
display() {
push();
let r = random(255);
let g = random(255);
let b = random(255);
fill(r, g, b);
stroke(r, g, b);
ellipse(this.x + this.xOffset, this.y + this.yOffset, this.r, this.r)
pop();
}
}
function setup() {
createCanvas(windowWidth, windowHeight);
background(5);
for (var x = 0; x < width; x = x + width / unit) {
for (var y = 0; y < height; y = y + height / unit) {
spirals.push(new Spiral());
}
}
}
function draw() {
background(5, 20);
for (var i = 0; i < count; i++) {
spirals[i].growth();
spirals[i].display();
}
}var unit = 200;
var sprial=[];
class Sprial {
constructor() {
this.x;
this.y;
this.xOffset;
this.yOffset;
this.r = random(1, 20);
this.R = random(1, 10);
this.dR = random(0, 2);
this.t = random(0, 2 * PI);
this.dt = random(0, 2)
}
growth() {
sprial.osf = unit
sprial.gbf = sprial.osf - 0.3
sprial.x = cos(sprial.t) * sprial.R;
sprial.y = sin(sprial.t) * sprial.R;
sprial.xOffset = (windowWidth / sprial.osf);
sprial.yOffset = (windowHeight / sprial.osf)
if (abs(sprial.x) > (windowWidth - sprial.xOffset * sprial.gbf) && abs(sprial.y) > (windowHeight - sprial.yOffset * sprial.gbf)) {
sprial.dR = sprial.dR * -1
sprial.dt = sprial.dt * -1
} else {
sprial.dR = sprial.dR
sprial.dt = sprial.dt
}
sprial.R += sprial.dR
sprial.t += sprial.dt
}
display() {
push();
let r = random(255);
let g = random(255);
let b = random(255);
fill(r, g, b);
stroke(r, g, b);
ellipse(sprial.x + sprial.xOffset, sprial.y + sprial.yOffset, sprial.r, sprial.r)
pop();
}
}
function setup() {
createCanvas(windowWidth, windowHeight);
background(5);
var wideCount = width / unit;
var highCount = height / unit;
count = wideCount * highCount;
for (var y = 0; y < highCount; y++) {
for (var x = 0; x < wideCount; x++) {
sprial.push (new Sprial(windowWidth / unit, windowWidth / unit, windowWidth / unit, windowWidth / unit, unit));
}
}
}
function draw() {
background(5, 20);
for (var i = 0; i < sprial.length; i++) {
sprial[i].growth();
sprial[i].display();
}
}let t = 0;
let R = 10;
let dt;
let dR;
function setup() {
createCanvas(windowWidth-100, windowHeight-100);
sliderdR = createSlider (-3,3,0,0.1)
sliderdt = createSlider (-1,1,0,0.05)
background(5);
}
function draw() {
generateSprial()
sprialAnimation()
dR = sliderdR.value();
dt = sliderdt.value();
}
function sprialPopulate() {
for (var x = 0; x <= width; x += 50) {
for (var y = 0; y <= height; y += 50) {
generateSprial(x,y)
}
}
}
function generateSprial (x,y){
{this.x=x;
this.y=y;
}
push();
let r = random(255);
let g = random(255);
let b = random(255);
fill(r, g, b);
stroke(r, g, b);
this.x = R * cos(t);
this.y = R * sin(t);
ellipse (this.x,this.y,10,10);
pop();
}
function sprialAnimation(){
t+=dt;
R+=dR;
}
let t = 0;
let R = 10;
let dt = 3;
let dr = 0.1;
function setup() {
createCanvas(windowWidth, windowHeight);
background(5);
}
function mousePressed() {
background(5);
}
function draw() {
generateSprial()
sprialAnimation ()
}
function generateSprial(){
push();
translate(width / 2, height / 2);
let r = random(255);
let g = random(255);
let b = random(255);
fill(r, g, b);
stroke(r, g, b);
var x = R * cos(t)
var y = R * sin(t)
if (mouseIsPressed) {
ellipse(x, y, 10, 10)
} else {
ellipse(x, y, 10, 10)
pop();
}
}
function sprialAnimation (){
if (windowWidth / 2 - mouseX < 0) {
} else {
}
}
var t = 0
let R = 10;
let dt = 10;
let dr = 10;
let x;
let y;
var xOffset;
var yOffset;
function setup() {
createCanvas(windowWidth, windowHeight);
background(5);
}
function draw() {
background(5, 10);
x = cos(t)*R/10
y = sin(t)*R/10
xOffset = (windowWidth / 2);
yOffset = (windowHeight / 2)
if (abs(x) > (windowWidth -xOffset) && abs(y) > (windowHeight-yOffset)) {
x = 0
y = 0
dr = -dr
dt = -dt
} else {
dr = dr
dt = dt
}
push();
let r = random(255);
let g = random(255);
let b = random(255);
fill(r, g, b);
stroke(r, g, b);
R += dr
t += dt
if (mouseIsPressed) {
ellipse(x + xOffset, y + yOffset, 10, 10)
} else {
ellipse(x + xOffset, y + yOffset, 10, 10)
}
pop();
}function draw() {
createCanvas(800, 600);
background(250);
noStroke();
fill(135,206,250);
if (mouseIsPressed) {
if (mouseButton === LEFT) {
ellipse(width,height/2, 300, 300);
}
if (mouseButton === RIGHT) {
ellipse(0,height/2, 300, 300);
}
if (mouseButton === CENTER) {
fill(139,0,0);
textSize (13 + (mouseX/width)*13);
text ("wHAt kInD of pErSoN cliCks tHe mIdDlE bUtTon aNYwAys !!!",100, height/2,);
}
}  
}