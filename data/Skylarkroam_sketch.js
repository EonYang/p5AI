var rain = [];
var sun = [];
var snowflakes = []; 
var nDrops = 800;
var wSpeed =0.08;
var angle = 0.0;
var scalar = 8;
var imgWave;
var windspeed;
var humidity;
var temp; 
var weather;
var icon;
var offset = 220;
var speed = 0.02;
let y; 
var apiKey = '&appid=c3769564cbbc64204e7b3b4bfdd5969a'; 
var units = '&units=';
var windspeed;
var humidity;
var temp; 
var weather;
var icon;
function preload() {
clouds = loadImage ("Icons/cloud.png");
sunny = loadImage ("Icons/sun.png");
mist = loadImage ("Icons/mist.png");
lightsun = loadImage ("Icons/lightsun.png");
sky = loadImage ("Icons/sky.png");
fog = loadImage("Icon/fog.png");
intro = loadImage ("Icons/weatherInJar.png");
}
function setup() {
createCanvas(400,600);
background (0);
imageMode(CENTER);
var button = select ('#submit');
button.mousePressed(weatherAsk);
input = select ('#city');
for (i = 0 ; i < nDrops; i ++ ) {
rain.push(new Rain(nDrops,wSpeed));
}
sun.push(new Clear(wSpeed,imgWave))
}
function weatherAsk () {
var url = api + input.value() + apiKey + units; 
loadJSON(url,gotData);
}
function gotData(data) { 
weather = data; 
}
function draw() {
background(0);
image(intro,width/2,height/2,400,500);
if (weather) {
clear();
background(0);
imageMode(CENTER)
var wSpeed = weather.wind.speed*speed;
angle += wSpeed;
var imgWave = sin(angle)*scalar;
let t = frameCount / 60;
var icon = weather.weather[0].main;
if (icon =="Clear") { 
sun[0].display(wSpeed,imgWave);
sun[0].light(wSpeed,imgWave);
} else if (icon == "Rain") {
rain.forEach(function(d) {
d.drawAndDrop();
});
image(clouds,width/2,height/2.5+imgWave,width/2,height/2.2);
} else if (icon == "Snow"){
for (var i = 0; i < random(7); i++) {
}
for (let flake of snowflakes) {
}
image(clouds,width/2,height/2.5+imgWave,width/1.8,height/2);
} else if (icon == "Mist"){
image(lightsun,width/2,height/2.2+imgWave,300,400);
image(mist,width/2,height/2,width,height);
} else if (icon == "Fog"){
image(lightsun,width/2,height/2.2+imgWave,300,400);
image(fog,width/2,height/2,width,height);
} else if (icon == "Clouds"){
image(sunny,width/2,height/2.2,300,400);
image(clouds,width/2,height/2.5+imgWave,width/2,height/2.2);
} 
else {
image(intro,width/2,height/2-10+imgWave,300,400);
}
}
var apiKey = '&appid=c3769564cbbc64204e7b3b4bfdd5969a'; 
var units = '&units=';
var rain = [];
var sun = [];
var snowflakes = []; 
var nDrops = 800;
var wSpeed =0.08;
var angle = 0.0;
var scalar = 8;
var imgWave;
function preload() {
clouds = loadImage ("Icons/cloud.png");
sunny = loadImage ("Icons/sun.png");
}
function setup() {
createCanvas(400,600);
background (0);
var button = select ('#submit');
button.mousePressed(weatherAsk);
input = select ('#city');
for (i = 0 ; i < nDrops; i ++ ) {
rain.push(new Rain(nDrops,wSpeed));
}
var imgWave = sin(angle)*scalar;
sun.push(new Clear(wSpeed,imgWave))
}
function draw() {
background(0);
for (var i = 0; i < random(7); i++) {
}
for (let flake of snowflakes) {
}
rain.forEach(function(d) {
d.drawAndDrop();
});
var imgWave = sin(angle)*scalar;
angle += wSpeed;
sun[0].display(wSpeed,imgWave)
sun[0].light(wSpeed,imgWave)
image(clouds,width/4,height*1/12-10+imgWave,width/2,height/2.2);
}
var rain = [];
var sun = [];
var nDrops = 800;
var wSpeed =0.08;
var angle = 0.0;
var scalar = 8;
var imgWave;
var windspeed;
var humidity;
var temp; 
var weather;
var icon;
var angle = 0.0;
var offset = 220;
var speed = 0.04;
let y; 
var apiKey = '&appid=c3769564cbbc64204e7b3b4bfdd5969a'; 
var units = '&units=';
var windspeed;
var humidity;
var temp; 
var weather;
var icon;
function preload() {
clouds = loadImage ("weather icons/cloud.png");
sunny = loadImage ("weather icons/sun.png");
}
function setup() {
createCanvas(400,600);
background (0);
var button = select ('#submit');
button.mousePressed(weatherAsk);
input = select ('#city');
for (i = 0 ; i < nDrops; i ++ ) {
rain.push(new Rain(nDrops,wSpeed));
}
}
function weatherAsk () {
var url = api + input.value() + apiKey + units; 
loadJSON(url,gotData);
}
function gotData(data) { 
weather = data; 
}
function draw() {
background(0);
rain.forEach(function(d) {
d.drawAndDrop();
});
if (weather) {
var wSpeed = weather.wind.speed*0.4;
angle += wSpeed;
var imgWave = sin(angle)*scalar;
var icon = weather.weather[0].main;
if (icon =="Clear") { 
var weatherShow=image(sunny,width/7,height*1/12-10+imgWave,300,400);
} else if (icon == "Rain") {
rain.forEach(function(d) {
d.drawAndDrop();
});
image(clouds,width/4,height*1/12-10+imgWave,width/2,height/2.2);
} else {
rain.forEach(function(d) {
d.drawAndDrop();
});
}
}
var rain = [];
var sun = [];
var nDrops = 800;
var wSpeed =0.08;
var angle = 0.0;
var scalar = 8;
var imgWave;
var windspeed;
var humidity;
var temp; 
var weather;
var icon;
var angle = 0.0;
var offset = 220;
var speed = 0.04;
let y; 
var apiKey = '&appid=c3769564cbbc64204e7b3b4bfdd5969a'; 
var units = '&units=';
var windspeed;
var humidity;
var temp; 
var weather;
var icon;
function preload() {
clouds = loadImage ("weather icons/cloud.png");
sunny = loadImage ("weather icons/sun.png");
}
function setup() {
createCanvas(400,600);
background (0);
var button = select ('#submit');
button.mousePressed(weatherAsk);
input = select ('#city');
for (i = 0 ; i < nDrops; i ++ ) {
rain.push(new Rain(nDrops,wSpeed));
}
}
function weatherAsk () {
var url = api + input.value() + apiKey + units; 
loadJSON(url,gotData);
}
function gotData(data) { 
weather = data; 
}
function draw() {
background(0);
rain.forEach(function(d) {
d.drawAndDrop();
});
if (weather) {
var wSpeed = weather.wind.speed*0.4;
angle += wSpeed;
var imgWave = sin(angle)*scalar;
var icon = weather.weather[0].main;
if (icon =="Clear") { 
var weatherShow=image(sunny,width/7,height*1/12-10+imgWave,300,400);
} else if (icon == "Rain") {
rain.forEach(function(d) {
d.drawAndDrop();
});
image(clouds,width/4,height*1/12-10+imgWave,width/2,height/2.2);
} else {
rain.forEach(function(d) {
d.drawAndDrop();
});
}
}
let apiKey = '&appid=c3769564cbbc64204e7b3b4bfdd5969a'; 
let units = '&units=';
var rain = [];
var sun = [];
var nDrops = 800;
var wSpeed =0.08;
var angle = 0.0;
var scalar = 8;
var imgWave;
function preload() {
clouds = loadImage ("Icons/cloud.png");
sunny = loadImage ("Icons/sun.png");
}
function setup() {
createCanvas(400,600);
background (0);
var button = select ('#submit');
button.mousePressed(weatherAsk);
input = select ('#city');
for (i = 0 ; i < nDrops; i ++ ) {
rain.push(new Rain(nDrops,wSpeed));
}
}
function draw() {
background(0);
rain.forEach(function(d) {
d.drawAndDrop();
});
var imgWave = sin(angle)*scalar;
angle += wSpeed;
image(clouds,width/4,height*1/12-10+imgWave,width/2,height/2.2);
image(sunny,width/7,height*1/12-10+imgWave,300,400);
}
let apiKey = '&appid=c3769564cbbc64204e7b3b4bfdd5969a'; 
let units = '&units=';
var rain = [];
var nDrops = 800;
var wSpeed 
function preload() {
clouds = loadImage ("Icons/cloud.png");
sunny = loadImage ("Icons/sun.png");
}
function setup() {
createCanvas(600,1000);
background (0);
var button = select ('#submit');
button.mousePressed(weatherAsk);
input = select ('#city');
for (i = 0 ; i < nDrops; i ++ ) {
rain.push(new Rain(nDrops,wSpeed));
}
}
function weatherAsk () {
var url = api + input.value() + apiKey + units;
loadJSON(url.gotData);
}
function gotData(data) {
weather = data;
}
function draw() {
background(0);
rain.forEach(function(d) {
d.drawAndDrop();
});
}
let innerR = 50;
let outterR = 90;
let outterR2 = 110;
let innerR2 = 50
let innerXs = [];
let innerYs = [];
let innerXs2 = [];
let innerYs2 = [];
let outterXs = [];
let outterYs = [];
let outterXs2 = [];
let outterYs2 = [];
let speed = 0.001;
var offsetx = 0;
var sunDegree = 0.0;
function preload() {
sun = loadImage("sun.png");
}
function setup() {
frameRate (30);
createCanvas(400, 400);
let centerX = width/2;
let centerY = height/2;
outterR = 100 + random (-8,8)
for (let i=0; i<720; i+=2){
innerXs.push(centerX + innerR * cos(i));
innerYs.push(centerY + innerR * sin(i));
}
for (let i=0; i<720; i+=1){
outterXs.push(centerX + outterR * cos(i));
outterYs.push(centerY + outterR * sin(i));
}
for (let i=0; i<720; i+=4){
innerXs2.push(centerX + innerR * cos(i));
innerYs2.push(centerY + innerR * sin(i));
}
for (let i=0; i<720; i+=2){
outterXs2.push(centerX + outterR2 * cos(i));
outterYs2.push(centerY + outterR2 * sin(i));
}
}
function draw() {
sunDegree+=0.1;
background(0);
image(sun,100,100,width/2+2,height/2);
offsetx += sin(sunDegree)*8 ;
for (let i=0;i<180;i++){
let outterXIndex = i*2 + speed*(floor(random(0,2)))
let outterYIndex = i*2 + speed*(floor(random(0,2)));
strokeWeight(1)
stroke(255,245,125,20)
line(innerXs[i], innerYs[i], outterXs[outterXIndex], outterYs[outterYIndex]);
stroke(255,245,125,50)
strokeWeight(1);
line(innerXs2[i]+offsetx, innerYs2[i], outterXs2[outterXIndex]+offsetx, outterYs2[outterYIndex]);
}
fill(255,245,125,10); 
fill(255,245,125,20); 
ellipse(width/2+0.5, height/2+0.5, 100, 100)
}let shine = [];
function setup() {
createCanvas(400, 400);
background(255, 255, 255);
stroke(255, 204, 0);
}
function draw() {
for (let i = 0; i < 300; i++) {
let i=new shiny();
shine.push(i);
}
}
class shiny {
constructor (xpos1,ypos1,xpos2,ypos2) {
this.n = random(1, 2);
this.xpos1 =200+40 * sin(x++);
this.ypos1 =200+40 * sin(n);
this.xpos2 =200+80 * cos(n);
this.ypos2 =200+80 * sin(n);
}
show(){
line(xpos1,ypos1,xpos2,ypos2);
}
}
var noise1 = 0
var noise2 = 10
var noise3 = 230
var noise4 = 4260
let x1;
let x2;
let x3;
let y2;
let x
let y 
function setup() {
createCanvas(800, 500);
colorMode(HSB, 360);
let n1 = noise(100);
console.log(n1);
x= width/2
y = height/2
}
function draw() {
background(50);
for (let i = 0; i < 1000; i++) {
x1 = map(noise(noise1), 0, 1, 150, 650);
y1 = map(noise(noise2), 0, 1, 0, height);
noise1 += 0.01;
noise2 += 0.01;
stroke(map(noise(noise1), 0, 1, 0, 360), map(noise(noise2), 0, 1, 0, 360), random(330, 360));
strokeWeight(1);
if(mouseX>0&&mouseY>0&&mouseX<width&&mouseY<height){
x= mouseX;
y=mouseY;
}else{
x= width/2
y = height/2  
}
line(x, y, x1, y1);
}
frameRate(30);      
}
var acceleration = 0.02;
var nDrops = 1000;
var rain = [];
var angle = 0.0;
var offset = 220;
var speed = 0.04;
let y; 
var windspeed;
var humidity;
var temp; 
var weather;
function preload() {
cloud = loadImage("weatherIcons/clouds.png");
}
function setup() {
createCanvas(480, 640);
for (i = 0; i < nDrops; i++) {
rain.push(new Drop());
}
}
function draw() {
background(0);
var y = -90 + sin(angle) * scalar;
angle +=  0.08;
rain.forEach(function(d) {
d.drawAndDrop();
});
image(cloud,width/6,y,width/1.5,height/1.5);
}
function Drop() {
this.initX = function() {
this.x = random() * width/3+width/3;
};
this.initY = function() {
};
this.initX();
this.y = random() * height+height/2;
this.length = random() * 10;
this.speed = random();
this.drawAndDrop = function() {
this.draw();
this.drop();
};
this.draw = function() {
stroke(255,255,255,90);
strokeWeight(2);
line(this.x, this.y, this.x, this.y + this.length);
};
this.drop = function() {
if (this.y < height) {
this.y += this.speed;
this.speed += acceleration;
} else {
this.speed = random();
this.initY();
this.initX();
}
}
}var x = 1;
var y = 1;
var x2 = 1;
var y2 = 1 ; 
var easing = 0.03;
var crew = [];
var count = 300;
var dx;
let txts = []
var words= [''];
var eyeColor=200;
function setup() {
createCanvas(800, 800);
noStroke();
for (var i = 0; i<count; i++)
{
let i = new folk();
crew.push(i);
}
for (let i = 0; i < 30; i++) {
txts.push(
new Txt(random(0, 800), random(0, 800))
)
}
}
function draw()
{
background(237,217,180);
var targetX = mouseX;
var targetY = mouseY;
if (pmouseX - mouseX === 0) {
eyeColor = 0;
} else {
eyeColor = 200;
} 
for (let i = 0; i<count; i++) {
crew[i].display(targetX, targetY);
fill(255);
textSize(50);
}
for (let i = 0; i < txts.length; i++) {
let txt = txts[i]
for (let i2 = 0; i2 < crew.length; i2++) {
let person = crew[i2]
if (person.x > txt.x - 20 && person.x < txt.x + 20 && person.y > txt.y - 20 && person.y < txt.y) {
txts.splice(i, 1)
}
}
}
for (let i = 0; i < txts.length; i++) {
txts[i].show()
}
}
var x = 1;
var y = 1;
var x2 = 1;
var y2 = 1 ; 
var easing = 0.03;
var crew = [];
var count = 150;
var dx;
let txts = []
var words= [''];
var eyeColor;
function setup() {
createCanvas(1800, 1200);
stroke(0);
for (var i = 0; i<count; i++)
{
let i = new folk();
crew.push(i);
}
for (let i = 0; i < 80; i++) {
txts.push(
new Txt(random(0, 1800), random(0, 1200))
)
}
}
function draw()
{
background(237,217,180);
var targetX = mouseX;
var targetY = mouseY;
if (pmouseX - mouseX === 0) {
eyeColor = 0;
} else {
eyeColor = 200;
}  
for (let i = 0; i<count; i++) {
crew[i].display(targetX, targetY);
fill(0);
textSize(50);
}
for (let i = 0; i < txts.length; i++) {
let txt = txts[i]
for (let i2 = 0; i2 < crew.length; i2++) {
let person = crew[i2]
if (person.x > txt.x - 20 && person.x < txt.x + 20 && person.y > txt.y - 5 && person.y < txt.y) {
txts.splice(i, 1);
}
}
}
for (let i = 0; i < txts.length; i++) {
txts[i].show()
}
}
function folk()
{
var outX = random(-2,2)
var outY = random(-2,2)
var easing1 = random(0.01,0.2)
this.x = 1
this.y = 1
this.display = function(tempX, tempY,eyeColor)
{
this.tempX = mouseX;
this.tempY = mouseY;
this.eyeColor = eyeColor;
this.dx = tempX - this.x;
this.dy = tempY -this.y;
this.x += (this.dx) * easing1 + outX;
this.y += (this.dy) * easing1 + outY;  	
fill(200,0,0);
ellipse(this.x, this.y,12,12);
ellipse(this.x, this.y+12,15,20);	
fill(this.eyeColor,0,0);
ellipse(this.x+3, this.y,2,3);
ellipse(this.x-3, this.y,4,4); 
}  
}
var x = 1;
var y = 1;
var x2 = 1;
var y2 = 1 ; 
var easing = 0.03;
var crew = [];
var count = 300;
var dx;
function setup() {
createCanvas(1200, 1200);
noStroke();
for (var i = 0; i<count; i++)
{
let i = new folk();
crew.push(i);
}
}
function draw()
{
background(200,0,0);
var targetX = mouseX;
var targetY = mouseY;
for (var i = 0; i<count; i++)
{
crew[i].display(targetX, targetY);
}
if (mouseX > 200) {
crew.eyes
}
}
function folk()
{
var outX = random(-1,1)
var outY = random(-1,1)
var easing1 = random(0.01,0.2)
this.x = 1
this.y = 1
this.display = function(tempX, tempY)
{
this.tempX = mouseX;
this.tempY = mouseY;
this.dx = tempX - this.x;
this.dy = tempY -this.y;
this.x += (this.dx) * easing1 + outX;
this.y += (this.dy) * easing1 + outY;  	
fill(255);
ellipse(this.x, this.y,12,12);
ellipse(this.x, this.y+12,15,20);	
}  
this.eyes = funtion();
fill(200,0,0);
ellipse(this.x+3, this.y,2,3);
ellipse(this.x-3, this.y,4,4);
}
var font, r, g, b, wordIndex, system, fontsize = 60
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
ml5 Example
PoseNet example using p5.js
let video;
let poseNet;
let poses = [];
function setup() {
createCanvas(640, 480);
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
drawKeypoints();
drawSkeleton();
}
function drawKeypoints()  {
for (let i = 0; i < poses.length; i++) {
let pose = poses[i].pose;
for (let j = 0; j < pose.keypoints.length; j++) {
let keypoint = pose.keypoints[j];
if (keypoint.score > 0.2) {
fill(255, 0, 0);
noStroke();
ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
}
}
}
}
function drawSkeleton() {
for (let i = 0; i < poses.length; i++) {
let skeleton = poses[i].skeleton;
for (let j = 0; j < skeleton.length; j++) {
let partA = skeleton[j][0];
let partB = skeleton[j][1];
stroke(255, 0, 0);
line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
}
}
}var system;
function setup() {
createCanvas(720, 400);
system = new ParticleSystem(createVector(width/2, 100));
}
function draw() {
background(51);
system.addParticle();
system.run();
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
Particle.prototype.update = function(){
this.velocity.add(this.acceleration);
this.position.add(this.velocity);
this.lifespan -= 2;
};
Particle.prototype.display = function() {
stroke(200, this.lifespan);
noStroke();
fire(this.position.x, this.position.y,this.lifespan);
};
Particle.prototype.isDead = function(){
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
for (var i = this.particles.length-1; i >= 0; i--) {
var p = this.particles[i];
p.run();
if (p.isDead()) {
this.particles.splice(i, 1);
}
}
};
function fire(firex,firey,lifespan) {
fill (255, 164, 7,lifespan-120);
ellipse ( firex+random(5),firey, 21,23);
fill (255, 126, 7,lifespan-80);
ellipse ( firex+random(2),firey, 14,16);
fill (255, 160, 28,lifespan-50);
ellipse ( firex,firey, 6,8);
fill (255, 75, 48,lifespan-40);
ellipse ( firex+random(2),firey, 4,6);
fill (255, 58, 28,lifespan-20);
ellipse ( firex,firey+random(2), 3,5+random(2));
}
ml5 Example
PoseNet example using p5.js
let video;
let poseNet;
let poses = [];
function setup() {
createCanvas(640, 480);
video = createCapture(VIDEO);
video.size(width, height);
system = new ParticleSystem(createVector(keypoint.position.x,keypoint.position.y);
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
system.addParticle();
system.run();
for (let i = 0; i < poses.length; i++) {
let pose = poses[i].pose;
let keypoint = pose.keypoints[0];
fill(255, 0, 0);
noStroke();
ellipse(keypoint.position.x, keypoint.position.y, 300, 300);
}
}var video;
var snore;
var vScale = 18;
var button;
var amp;
var vol;
var dark;
function setup() {
createCanvas(640, 480);
pixelDensity(1);
video = createCapture(VIDEO);
video.size(width/vScale, height/vScale);
song = loadSound("snore.mp3",loaded);
button = createButton("I'm from ITP");
button.mousePressed(togglePlaying);
amp = new p5.Amplitude();
}
function loaded() {
}
function togglePlaying() {
song.play();
if (!song.stop()){
song.play();  
}
}
function draw() {
colorMode(HSL);
var vol = amp.getLevel();
var dark = map (vol,0,0.3,30,0)
background(224,74,dark);
video.loadPixels();
loadPixels();
for (var y = 0; y < video.height; y++) {
for (var x = 0; x < video.width; x++) {
var index = (video.width - x + 1 + (y * video.width))*4;
var r = video.pixels[index+0];
var g = video.pixels[index+1];
var b = video.pixels[index+2];
var bright = (r+g+b)/3;
var w = map(bright, 0, 255, 0, vScale);
noStroke();
colorMode(RGB);
fill(r*2,g*2,b);
rectMode(CENTER);
ellipse(x*vScale, y*vScale, w, w);
}
}
}
var video;
var vScale = 16;
function setup() {
createCanvas(640, 480);
pixelDensity(1);
video = createCapture(VIDEO);
video.size(width/vScale,height/vScale);
}
function draw() {
background(51);
video.loadPixels();
loadPixels();
for (var y = 0 ; y < video.height; y ++) {
for (var x = 0 ; x < video.width; x ++) {
var index = ( x + y * video.width)*4;
var r = video.pixels[index+0];
var g = video.pixels[index+1];
var b = video.pixels[index+2];
var bright = (r+g+b)/3;
fill(bright);
rect(x*vScale,y*vScale,vScale,vScale);
}
}
var angle = 0.0;
var offset = 220;
var speed = 0.04;
let y; 
var apiKey = '&appid=c3769564cbbc64204e7b3b4bfdd5969a'; 
var units = '&units=';
var windspeed;
var humidity;
var temp; 
var weather;
var icon;
function preload() {  
Bottle = loadImage( "bottle.png" )
Clouds = loadImage("weather icons/cloud.png");
Clear = loadImage("weather icons/sun.png");
Rain = loadImage("weather icons/rain.png");
Snow = loadImage("weather icons/snow.png");
Mist = loadImage("weather icons/haze.png");
Haze = loadImage("weather icons/foggy.png");
}
function setup() {
createCanvas(400, 600);
var button = select ('#submit');
button.mousePressed(weatherAsk);
input = select ('#city');
}
function weatherAsk () {
var url = api + input.value() + apiKey + units; 
loadJSON(url,gotData);
}
function gotData(data) { 
weather = data; 
}
function draw() {
background(255);
var y = 240 + sin(angle) * scalar;
if(weather) {
var windspeed = weather.wind.speed*0.04;
angle += windspeed;
if (icon=="Clear") {
var imageShow = Clear;
}
if (icon=="Snow") {
var imageShow = Snow;
}
if (icon=="Clouds") {
var imageShow = Clouds;
}
if (icon=="Rain") {
var imageShow = Rain;
}
if (icon=="Mist") {
var imageShow = Mist;
}
if (icon=="Haze") {
var imageShow = Haze;
}
console.log(windspeed,icon);
image(imageShow,130, y, 120, 120);
} 
image(Bottle,90, 170, 200,240);
Introduction to Physical Computing
ITP
This sketch will send one value in ascii from arduino to P5
let array = [],
count = 0,
total = 0,
avg = 0;
function setup() {
createCanvas(320, 240);
}
function draw() {
background(255);
total = 0;
count = ((count++)+5)%5;
if (count < 5) {
for (let i = 0; i < array.length; i++) {
total += array[i];
}
avg = total / array.length;
console.log(avg);
}
textSize(avg);
text(avg, 0, height / 2);
console.log(array);
}
for (var i = 0; i < portList.length; i++) {
}
}
}
}
void setup() {
}
void loop() {
int analogValue = analogRead(A0);
delay(50);
}
var angle = 0.0;
var offset = 220;
var speed = 0.06;
var speedWave1 = 0.01;
var speedWave2 = 0.03;
var boatrace = 1;
var y1;
var x = 0;
var cx;
var welcomeText;
var snowOn = false;
function preload() {  
imgBoat = loadImage("IMG_7256.png");
imgNami = loadImage("nami_back.png");
imgNami2 = loadImage("nami_front.png");
imgSky = loadImage("sky.png");
imgHogwarts = loadImage("Hogwarts.png");
}
function setup() {
winText = createP();
var canvas = createCanvas(windowWidth, windowHeight);
offset = height * 3/5;
}
function draw() {
cx = constrain(x , 0 , width*4/5);
image(imgSky, 0, 0, width, height);
image(imgHogwarts, width*3/5, height*1/3, width*0.3, height*0.6);
var y1 = offset + sin(angle) * scalar;
var y2 = offset - sin(angle) * 10;
var y3 = offset + sin(angle) * 5;
angle += speed;
x++;
x--;
hurryUp();
}
if (x >= width * 4/5) {
winSlogan ();
} 
image(imgNami,0, y3+50, width, height*2/5);
image(imgBoat,cx, y1+60, width*1/7, height*1/6);
image(imgNami2,0, y2+40, width, height*2/5);
if (snowOn == true) {
fill(240);
let t = frameCount / snowSpeed;
for (let i = 0; i <= random(3); i++) {
}
for (let thisFlake of snowFlakes) {
thisFlake.reFresh(t);
thisFlake.draw();
}
}
}
function snowFlake() {
this.x = random(width / 2, width);
this.y = 0;
this.size = random(2, 5);
this.originalAngle = random(0, 2 * PI);
this.transparency = 255;
this.wSpeed = random(0, 2 * PI);
this.radius = random(width / 200);
this.reFresh = function(currentTime) {
this.x = this.x + this.radius * sin(currentTime * this.wSpeed + this.originalAngle);
this.y = this.y + sqrt(this.size);
if (this.y > height) {
let thisIndex = snowFlakes.indexOf(this);
snowFlakes.splice(thisIndex, 1);
}
};
this.draw = function() {
noStroke();
ellipse(this.x, this.y, this.size, this.size);
}
}
function winSlogan () {
fill(255);
textSize(36);
textFont('Righteous');
text("Now You've Proved Your Magic Power, Welcome to Hogwarts!",width*1/8,height*1/5,width*3/8,height*3/5);
snowOn = true;
}
function hurryUp () {
fill(255);
textSize(36);
textFont('Righteous');
text("You have to swing faster to get into Hogwarts",width*1/8,height*1/5,width*3/8,height*3/5);
snowOn = false;
}
for (var i = 0; i < portList.length; i++) {
}
}
}
var angle = 0.0;
var offset = 220;
var speed = 0.05;
var boatrace = 1;
var y1;
var x = 0;
var Lgt = 210;
var LgtDirection;
function preload() {  
imgBoat = loadImage("IMG_7256.png");
}
function setup() {
colorMode(HSB);
createCanvas(600, 400);
LgtDirection = 1;
}
function draw() {
background(190, 40, Lgt);
Lgt += LgtDirection;
if (Lgt <= 20 || Lgt >= 250) {
LgtDirection = -LgtDirection;
}
var y1 = offset + sin(angle) * scalar;
image(imgBoat,x, y1, 120, 100);
angle += speed;
}
for (var i = 0; i < portList.length; i++) {
}
}
}
}
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_ADXL345_U.h>
Adafruit_ADXL345_Unified accel = Adafruit_ADXL345_Unified(12345);
void displaySensorDetails(void)
{
sensor_t sensor;
accel.getSensor(&sensor);
delay(500);
}
void displayDataRate(void)
{
switch(accel.getDataRate())
{
case ADXL345_DATARATE_3200_HZ:
break;
case ADXL345_DATARATE_1600_HZ:
break;
case ADXL345_DATARATE_800_HZ:
break;
case ADXL345_DATARATE_400_HZ:
break;
case ADXL345_DATARATE_200_HZ:
break;
case ADXL345_DATARATE_100_HZ:
break;
case ADXL345_DATARATE_50_HZ:
break;
case ADXL345_DATARATE_25_HZ:
break;
case ADXL345_DATARATE_12_5_HZ:
break;
case ADXL345_DATARATE_6_25HZ:
break;
case ADXL345_DATARATE_3_13_HZ:
break;
case ADXL345_DATARATE_1_56_HZ:
break;
case ADXL345_DATARATE_0_78_HZ:
break;
case ADXL345_DATARATE_0_39_HZ:
break;
case ADXL345_DATARATE_0_20_HZ:
break;
case ADXL345_DATARATE_0_10_HZ:
break;
default:
break;
}  
}
void displayRange(void)
{
switch(accel.getRange())
{
case ADXL345_RANGE_16_G:
break;
case ADXL345_RANGE_8_G:
break;
case ADXL345_RANGE_4_G:
break;
case ADXL345_RANGE_2_G:
break;
default:
break;
}  
}
void setup(void) 
{
#ifndef ESP8266
#endif
if(!accel.begin())
{
while(1);
}
accel.setRange(ADXL345_RANGE_8_G);
displaySensorDetails();
displayDataRate();
displayRange();
}
void loop(void) 
{
sensors_event_t event; 
accel.getEvent(&event);
delay(100);
}
var angle = 0.0;
var offset = 220;
var speed = 0.02;
var boatrace = 0.06;
var y1;
var x =100;
var portName;
var xValue = 0;
var yValue = 0;
var switchState = 0;
var boatLocX0, boatLocY0;
var boatLocX, boatLocY;
var inputBox;
var button;
var welcomeText;
var snowOn = false;
function preload() {
imgHogwarts = loadImage("images/Hogwarts.png");
imgSky = loadImage("images/sky_small.png");
imgNamiBG1 = loadImage("images/nami_1_background1.png");
imgNamiBG2 = loadImage("images/nami_1_background2.png");
imgWave1 = loadImage("images/nami_1_0006.png");
imgWave2 = loadImage("images/nami_1_0003.png");
imgBoat = loadImage("images/IMG_7256.png");
imgMoon= loadImage("images/moon.png");
}
function setup() {
var canvas = createCanvas(windowWidth, windowHeight);
canvas.position(0, 0);
inputBox = createInput("Type your name");
button = createButton("Go 9 3/4");
welcomeText = createP();
wave1 = new movingWave(imgWave1, 310, 280, wavePercentage,
0.35 * width, height - 280 * 1.1 * wavePercentage, -0.035, 100 * wavePercentage, 30 * wavePercentage);
wave2 = new movingWave(imgWave2, 329, 199, wavePercentage,
0.8 * width, height - 280 * 0.8 * wavePercentage,
0.015, 70 * wavePercentage, 15 * wavePercentage);
boatLocX0 = 0.01 * width;
boatLocY0 = height - 1.1 * 385 * 0.7 * wavePercentage;
boatLocX = boatLocX0;
boatLocY = boatLocY0;
noStroke();
}
function welcomeSlogan() {
if (inputBox.value() != "Type your name" && inputBox.value() != '') {
welcomeText.html("Welcome to Hogwarts, " + inputBox.value() + "!");
welcomeText.class('welcometext');
}
snowOn = true;
}
function keyPressed() {
if (keyCode === ESCAPE) {
welcomeText.html('');
snowOn = false;
snowFlakes = [];
}
}
function draw() {
var calImgW = 0;
var calImgH = 0;
calImgW = calImgSizeMax(1730, 1243, width, height)[0];
calImgH = calImgSizeMax(1730, 1243, width, height)[1];
image(imgSky, width - calImgW, height - calImgH, calImgW, calImgH);
calImgW = calImgSizeMin(564, 662, 0.7 * width, height)[0];
calImgH = calImgSizeMin(564, 662, 0.7 * width, height)[1];
image(imgHogwarts, width - calImgW, height - calImgH, calImgW, calImgH);
calImgW = calImgSizeMin(1741, 511, width, height)[0];
calImgH = calImgSizeMin(1741, 511, width, height)[1];
image(imgNamiBG2, 0, height - 3 * calImgH / 4, calImgW, calImgH);
wave1.update();
wave1.display();
wave2.update();
wave2.display();
calImgW = 547 * 0.8 * wavePercentage;
calImgH = 385 * 0.8 * wavePercentage;
var y1 = offset + sin(angle) * scalar;
boatLocX = map(xValue, 1023, 0, boatLocX0 - 50 * wavePercentage, boatLocX0 + 50 * wavePercentage);
image(imgBoat, boatLocX, y1, calImgW, calImgH);
angle += speed;
calImgW = calImgSizeMin(1698, 490, width, height)[0];
calImgH = calImgSizeMin(1698, 490, width, height)[1];
image(imgNamiBG1, 0, height - 3 * calImgH / 4, calImgW, calImgH);
inputBox.changed(welcomeSlogan);
calImgH = calImgSizeMax (400,400, 0.3*width, 0.3*height)[1];
image(imgMoon,100, 100, calImgW, calImgH);
if (snowOn == true) {
fill(240);
let t = frameCount / snowSpeed;
for (let i = 0; i <= random(3); i++) {
}
for (let thisFlake of snowFlakes) {
thisFlake.reFresh(t);
thisFlake.draw();
}
}
}
class movingWave {
constructor(imgName, imgW, imgH, percentage, locX0, locY0, speed, xRadius, yRadius) {
this.imgName = imgName;
this.imgW = imgW;
this.imgH = imgH;
this.percentage = percentage;
this.locX0 = locX0;
this.locY0 = locY0;
this.xRadius = xRadius;
this.yRadius = yRadius;
this.Angle = 0;
this.locX = this.locX0;
this.locY = this.locY0;
}
display() {
image(this.imgName, this.locX, this.locY, this.imgW * this.percentage, this.imgH * this.percentage);
}
update() {
this.locX = this.locX0 + cos(this.Angle) * this.xRadius;
this.locY = this.locY0 + sin(this.Angle) * this.yRadius;
this.Angle += this.speed;
}
}
function snowFlake() {
this.x = random(width / 2, width);
this.y = 0;
this.size = random(2, 5);
this.originalAngle = random(0, 2 * PI);
this.transparency = 255;
this.wSpeed = random(0, 2 * PI);
this.radius = random(width / 200);
this.reFresh = function(currentTime) {
this.x = this.x + this.radius * sin(currentTime * this.wSpeed + this.originalAngle);
this.y = this.y + sqrt(this.size);
if (this.y > height) {
let thisIndex = snowFlakes.indexOf(this);
snowFlakes.splice(thisIndex, 1);
}
};
this.draw = function() {
ellipse(this.x, this.y, this.size, this.size);
}
}
function calImgSizeMin(imgW, imgH, newW, newH) {
var percentage = 0;
if (imgW / imgH >= newW / newH) {
percentage = newW / imgW;
return ([imgW * percentage, imgH * percentage, percentage]);
} else if (imgW / imgH < newW / newH) {
percentage = newH / imgH;
return ([imgW * percentage, imgH * percentage, percentage]);
}
}
function calImgSizeMax(imgW, imgH, newW, newH) {
var percentage = 0;
if (imgW / imgH >= newW / newH) {
percentage = newH / imgH;
return ([imgW * percentage, imgH * percentage, percentage]);
} else if (imgW / imgH < newW / newH) {
percentage = newW / imgW;
return ([imgW * percentage, imgH * percentage, percentage]);
}
}
function gotData() {
var output = map(mouseX,0,width,0,255);
for (var i = 0; i < portList.length; i++) {
console.log(i + " " + portList[i]);
if (portList[i].indexOf('usbmodem') >= 0) {
portName = portList[i];
baudrate: 9600
});
}
}
}
function serverConnected() {
console.log('connected to server.');
}
function portOpen() {
}
if (inString.length > 0) {
if (inString != "Waiting Data") {
var sensors = split(inString, ", ");
console.log(sensors);
if (sensors.length >= 3) {
xValue = Number(sensors[0]);
yValue = Number(sensors[1]);
switchState = Number(sensors[2]);
}
}
}
}
}
function portClose() {
}function setup() {
createCanvas(400, 400);
myButton = createButton("Press");
myButton.position(100,100);
myButton.mousePressed(heHitMe);
}
function draw() {
}
function heHitMe(){
ellipse(random(width),random(height),20,20);
}
function setup() {
createCanvas(500, 300);
}
function gotData() {
var output = map(mouseX,0,width,0,255);
}
function draw() {
background(255,255,255);
fill(0,0,0);
var data = map(latestData, 0, 1023, 0, height);
ellipse(mouseX, data, 50, 50);
text(data, 10, 10);
}let waveballs = [];
function setup() {
createCanvas(710, 400);
wave1 = new waveBalls(174,215,254,25,-100,-80,95,400);
wave2 = new waveBalls(18,255,79,5,0,40,95,400);
wave3 = new waveBalls(255,255,255,255,0,-70,160,90);
wave4 = new waveBalls(255,255,255,30,-100,90,400);
}
function draw() {
background(255);
wave1.calcWave();
wave1.renderWave();
wave2.calcWave();
wave2.renderWave();
wave3.calcWave();
wave3.rounderWave();
wave4.calcWave();
wave4.renderWave();
}
class waveBalls {
constructor(H, S, B, transparency,wchange, hchange, locx, locy) {
this.theta = 3.0;
this.dx = (TWO_PI / this.period) * this.xspacing;
this.H = H;
this.S = S;
this.B = B;
this.transparency = transparency;
this.wchange = wchange;
this.hchange = hchange;
this.locx = locx;
this.locy = locy;
}
calcWave() {
this.theta += 0.02;
var x = this.theta;
for (var i = 0; i < this.yvalues.length; i++) {
this.yvalues[i] = sin(x) * this.amplitude;
x += this.dx;
}
}
renderWave() {
noStroke();
fill(this.H,this.S,this.B,this.transparency);
for (var x = 0; x < this.yvalues.length; x++) {
rect(x * this.xspacing+ this.wchange, height / 2 + this.yvalues[x] +this.hchange, this.locx, this.locy);
}
}
rounderWave() {
noStroke();
fill(this.H,this.S,this.B,this.transparency);
for (var x = 0; x < this.yvalues.length; x++) {
ellipse(x * this.xspacing+ this.wchange, height / 2 + this.yvalues[x] +this.hchange, this.locx, this.locy);
}
}
}
var thisWaveBall;
function setup() {
createCanvas(800, 600);
thisWaveBall = new waveballs();
waveBalls.push(thisWaveBall);
}
function draw() {
background(255);
thisWaveBall.setWave();
thisWaveBall.calWave(0.0);
thisWaveBall.renderWave(222, 244, 95, 95, 400);
}
class waveballs {
constructor(wofwave, theta, hofwave, period, dx, yvalues, c1, c2, positionY, rx, ry) {
this.spacingx = 20;
this.wofwave = wofwave;
this.theta = theta;
this.hofwave = 40.0;
this.period = 800.0;
this.dx = dx;
this.yvalues = yvalues;
this.c1 = c1;
this.c2 = c2;
this.positionY = positionY;
this.rx = rx;
this.ry = ry;
}
setWave() {
this.wofwave = width + 20;
this.dx = (TWO_PI / this.period) * this.xspacing;
this.yvalues = new Array(floor(this.wofwave / this.spacingx));
}
calWave(theta) {
}
renderWave(c1, c2, positionY, rx, ry) {
this.theta += 0.02;
for (var i = 0; i < this.yvalues.length; i++) {
this.yvalues[i] = sin(x) * this.hofwave;
x += this.dx;
noStroke();
fill(222, 232, 244);
for (var x = this.theta; x < this.yvalues.length; x++) {
ellipse(x * this.xspacing, height / 2 + this.yvalues[x] + this.positionY, this.rx, this.ry);
}
}
}
drawWave() {
calcWave();
renderWave();
}
Introduction to Physical Computing
ITP
This sketch will send one binary byte from P5 to arduino
See arduino code in bottom, have LED connected to pin 3
var capture;
function setup() {
createCanvas(320, 240);
capture = createCapture(VIDEO);
capture.size(320, 240);
capture.hide();
}
function draw() {
image(capture, 0, 0, 320, 240);
var ourColor=get (mouseX,mouseY);
var ourBrightness = brightness(ourColor);
}
for (var i = 0; i < portList.length; i++) {
}
}
}
void setup() {
}
void loop() {
}
}
let num1;
let num2;
let sum;
function setup() {
createCanvas(400, 400);
textFont("Source Code Pro");
textSize(20);
}
function draw() {
background(250)
add(66, 66);
show();
}
function add(num1, num2) {
sum = num1 + num2;
}
function show() {
text("66+66=" + sum, 100, 100)
}
background(220);
show();
}
function add (mouseIsPressed) { 
this.num1=random (20,60);
this.num2=random (40,90);
this.sum=this.num1+this.num2;
}
function show () {
text("=", 100,100);
text(this.sum, 103,100);
}
var Bubbles = [];
var BackgroundColor;
var Hue = 0;
var Lgt = 210;
var LgtDirection;
function setup() {
colorMode(HSB);
createCanvas(600, 400);
LgtDirection = 1;
for (var i = 0; i < 300; i++) {
let b = new Bubble(90*i,(10)*i) ;
Bubbles.push(b);
}
}
function draw() {
background(190, 40, Lgt);
Lgt += LgtDirection;
if (Lgt <= 20 || Lgt >= 250) {
LgtDirection = -LgtDirection;
}
Hue += 1;
for (var i = 0; i < Bubbles.length; i++){
Bubbles[i].waveline(10);
Bubbles[i].waveline(20);
}
var y2 = offset + sin(angle + 0.4) * scalar;
var y3 = offset + sin(angle + 0.8) * scalar;
ellipse(80, y1, 40, 40);
ellipse(120, y2, 40, 40);
ellipse(160, y3, 40, 40);
}
class Bubble {
constructor(angle,x) {
this.angle = angle;
this.offset = 200;
this.speed = 0.05;
this.y = 1;
this.x =x;
}
waveline() {
noStroke();
fill(255,0,60,5);
ellipse(this.x, this.y, 10, 10);
this.angle += this.speed;
}
wavebo() {
this.x = this.x+10;
}
}let waveballs = [];
let drops = [];
var theta = 3.0;
var dx;
function setup() {
createCanvas(710, 400);
this.xspacing = 31.5;
w = width+20;
dx = (TWO_PI / period) * this.xspacing;
yvalues = new Array(floor(w/xspacing));
}
function draw() {
background(255);
calcWave();
renderWave();
renderWave2();
moreWave();
}
function calcWave() {
theta += 0.02;
theta2 += 0.02;
var x = theta;
var x2 = theta2;
for (var i = 0; i < yvalues.length; i++) {
yvalues[i] = sin(x)*amplitude;
x+=dx; 
x2+=dx;}
}
function renderWave() {
noStroke();
fill(240,243,254,55);
for (var x = 0; x < yvalues.length; x++) {
rect(x*xspacing-100, height/2+yvalues[x]-80, 95, 400);
}
}
function renderWave2() {
noStroke();
fill(0,232,244,5);
for (var x2 = 0; x2 < yvalues.length; x2++) {
rect(x2*xspacing, height/2+yvalues[x2]+40, 200, 400);
}  
}
function moreWave() {
noStroke();
fill(255);
for (var x = 0; x < yvalues.length; x++) {
ellipse(x*xspacing, height/2+yvalues[x]-90, 120, 80);
}
}
var myCircles = [];
function setup() {
createCanvas(600, 400);
for (var i = 0; i < 1000; i++) {
myCircles.push(new Circle());
}
}
function draw() {
background(0);
for (var i = 0; i < 400; i++) {
myCircles[i].displayIt();
}
}
class Circle {
constructor() {
this.radius = random(30);
this.x = random(width);
this.y = random(height);
}
displayIt() {
ellipse(this.x, this.y, this.radius, this.radius);
this.x += random(-2, 2);
this.y += random(-2, 2);
}
}var myCircles=[];
function setup() {
createCanvas(400, 400);
for (var i = 0 ; i <1000; i++) {
}
}
function draw() {
background(220);
for (var i =0 ; i < 400; i++) {
myCircles[i].displayIt();
}
}
class Circle { 
constructor() {
this.radius=random (30); 
this.x = random (width);
this.y = random (300);
this.angle;
}  
displayIt() {
ellipse (this.x, this.y, this.radius, this.radius);
this.x += sin(this.angle);
this.x += random (-2,2);
this.angle += .1
}
}
let columns = 10;
let rows = 5;
let wColumns;
let hRows;
let add;
function setup() {
createCanvas(400, 200);
wColumns = width / columns;
hRows= height / rows;
stroke(255);
}
function draw() {
background(225);
for(r = 0; r<=columns; r++) {
for (d = 0; d<=rows; d++) {  
let x = r*wColumns;
let y = d*hRows;
let spotColor = dist(mouseX, mouseY, x, y);
spotColor = map(spotColor, 0, dist(0, 0, width, height), 255, 0);
fill(spotColor);
rect(x,y,wColumns,hRows);
}
}
} var button;
var x;
function setup() {
createCanvas(400, 400);
x = 10;
button = createButton("YooooLOO");
button.position(10,10);
button.mousePressed(theyPressedMe);
}
function draw() {
background(220);
}
function theyPressedMe(){
x = x + 10;
button.position(x,10);
}var myButton;
var mySlider;
function setup() {
createCanvas(400, 400);
myButton=createButton("Don't Press Me");
myButton.position(20,20);
myButton.mousePressed(ICantBelieveYouPressedIt);
mySlider=createSlider("YOOOOOOOO");
mySlider.position(20,70,100,1);
mySlider.mouseReleased(YOOOOOOOO);
}
function draw() {
background(220);
}
function ICantBelieveYouPressedIt () {
}
function YOOOOOOOO () {
}var x = 35;
var y = 35;
var radius=6;
var drop=1;
var c=359;
function setup() {
createCanvas(400, 800);
colorMode(HSB, c, 68, 100);  
ellipseMode (RADIUS);
noStroke();
background(255);
}
function draw() {
if (mouseIsPressed) {x=mouseX,y=mouseY};
c = c/2;
var d = dist(mouseX, mouseY, x, y);
if (d>radius){
radius = radius + 0.25;
fill(mouseY/1.5,68,100);
}else{ 
radius--;
fill(255);
}
ellipse(x,y,radius, radius)
}
var px=0;
function setup() {
createCanvas(400, 400);
y1 = 100;
x2 = 200;
y2 = 200;
frameRate()
}
function draw() {
px = random (0.1, 5);
strokeWeight(px);
line(200, 200, x1, y1);
line(200, 200, x2, y2);
y1 = 200 + 100 * sin(frameCount/30);
x2 = 200 + 80 * cos(frameCount/100);
x1 = 200 + 100 * cos(map(mouseX, 0, 700, 0, 30 * PI));
y1 = 200 + 100 * sin(map(mouseX, 0, 900, 0, 30 * PI));
}let img;
let RabbitBody1;
let RabbitBody2;
let RabbitHead1;
let RabbitHead2;
let Tree=1;
let Tree2=1;
let Tree3=1;
let PosX2=332;
let PosX3=460;
function preload(){
img=loadImage("carrot.png");
img2=loadImage("cloud.png");
head=loadImage("RHead.png");
body=loadImage("RBody.png");
}
function setup() {
createCanvas(600, 400);  
}
function draw() {
RabbitHead1=288+random(-3,3);
RabbitBody1=300-random(-5,5);
RabbitHead2=307+random(-3,3);
RabbitBody2=330-random(-5,5);
Tree=Tree+1;
Tree2=Tree2+1;
Tree3=Tree3+1;
background(204,236,170);
noStroke();
fill(205,233,247);
rect(0,0,600,300);
strokeWeight(3);
stroke(102,165,33)
image(img2,320,180);
image(img2,450,110);
image(img2,40,60);
fill(151,118,101);
stroke(110,97,78);
if(620-Tree<0){PosX1=620;
rect(PosX1-Tree,210,10,90);
if(620-Tree<0){Tree=1};
fill(102,165,33);
stroke(12,124,66);
ellipse(PosX1+5-Tree,200,60,100);
fill(151,118,101);
stroke(110,97,78);
if(PosX2-Tree2<-20){PoX2=620;
Tree2=1}
rect(PosX2-Tree2,210,6,90);
fill(102,165,33);
stroke(12,124,66);
ellipse(PosX2+3-Tree2,232,55,73);
if(620-Tree2<0){Tree2=1};
fill(151,118,101);
stroke(110,97,78);
if(PosX3-Tree3<-20){PosX3=620
rect(PosX3-Tree3,210,12,90);
fill(102,165,33);
stroke(12,124,66);
ellipse(PosX3+6-Tree3,200,90,120);
image(body,134,RabbitBody2);
image(head,120,RabbitHead2);
image(body,70,RabbitBody1);
image(head,60,RabbitHead1);
image(img,mouseX, mouseY);
}let w;
let h;
function setup() {
createCanvas(400, 400);
w= width/2;
h= height/2;
}
function draw() {
background(220);
ellipse(w,h,10,10);
}let w;
let h;
function setup() {
createCanvas(400, 400);
w= width/2;
h= height/2;
}
function draw() {
background(220);
ellipse(w,h,10,10);
}
function setup() {
createCanvas(200, 200);
}
function draw() {
background(220);
rect(width/4,height/4,width/2,height/2); 
}let img;
let RabbitBody1;
let RabbitBody2;
let RabbitHead1;
let RabbitHead2;
let Tree=1;
let Tree2=1;
let Tree3=1;
function preload(){
img=loadImage("carrot.png");
img2=loadImage("cloud.png");
head=loadImage("RHead.png");
body=loadImage("RBody.png");
}
function setup() {
createCanvas(600, 400);
}
function draw() {
RabbitHead1=288+random(-3,3);
RabbitBody1=300-random(-5,5);
RabbitHead2=307+random(-3,3);
RabbitBody2=330-random(-5,5);
Tree=Tree+1;
Tree2=Tree2+1;
Tree3=Tree3+1;
background(204,236,170);
noStroke();
fill(205,233,247);
rect(0,0,600,300);
strokeWeight(3);
stroke(102,165,33)
image(img2,320,180);
image(img2,450,110);
image(img2,40,60);
fill(151,118,101);
stroke(110,97,78);
rect(595-Tree,210,10,90);
if(595-Tree<-5){Tree=1}
fill(102,165,33);
stroke(12,124,66);
ellipse(600-Tree,200,60,100);
if(600-Tree<0){Tree=1};
fill(151,118,101);
stroke(110,97,78);
rect(832-Tree2,210,6,90);
if(832-Tree2<-3){Tree2=1};
fill(102,165,33);
stroke(12,124,66);
ellipse(835-Tree2,232,55,73);
if(835-Tree2<0){Tree2=1};
fill(151,118,101);
stroke(110,97,78);
rect(1000-Tree3,210,12,90);
if(1000-Tree3<0){Tree3=1};
fill(102,165,33);
stroke(12,124,66);
ellipse(1006-Tree3,200,90,120);
if(1006-Tree3<0){Tree3=1};
image(body,134,RabbitBody2);
image(head,120,RabbitHead2);
image(body,70,RabbitBody1);
image(head,60,RabbitHead1);
image(img,mouseX, mouseY);
}function setup() {
createCanvas(600,600);
}
function draw() {
background(245);
noStroke();
ellipse(100, 23, 100, 100);
noStroke();	
fill(75,100,255);
ellipse(150,300,80,80);
fill(75,100,255);
ellipse(600,600,600,600);
fill(225);
ellipse(310, 323, 100, 100);
fill(255,11,0);
triangle(330,329,130,498,411,580);
triangle(276,198,252,211,270,215);
triangle(173,194,164,207,179,211);
triangle(295,223,262,238,284,245);
triangle(300,159,165,60,390,100);	
triangle(220,373,122,395,184,430);
fill(75,100,255);
bezier(560,262,554,122,389,240,309,114);
fill(255,11,0);
triangle(478,212,485,127,556,155);
noFill();
strokeWeight(2);
strokeCap(round);
stroke(0)
bezier(296,181,267,171,251,173,230,184);
bezier(187,183,182,170,168,164,146,167);
bezier(322,177,322,107,269,87,233,90);
noStroke();
fill(56,218,108);
stroke(0)
ellipse(325, 242, 25, 25);
noStroke();	
fill(255,190,190);
ellipse(70,450,50,50);
ellipse(580,-10,240,240);
fill(225);
ellipse(100, 23, 100, 100);
ellipse(500, 320, 200, 200);
ellipse(60, 590, 190, 196);
fill(56,218,108);
ellipse(350,-10,50,50);
bezier(600,372,521,568,120,371,-5,596);
fill(0);
textSize(18);
text('TIANYI XIE', 10, 30);
stroke(0)
strokeWeight(2)
line(11,36,101,36)
}