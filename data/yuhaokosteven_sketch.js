function setup() {
createCanvas(400, 400);
fetch(url)
.then(response => response.json())
.then(data => {
console.log(data)
createP(data.scientists[3])
})
.catch(error => console.log(error));
}
function draw() {
background(220);
}function setup() {
noCanvas();
createP("Hello");
}
function draw() {
background(220);
let r, g, b;
let brain;
let which = "black";
let wButton;
let bButton;
function pickColor() {
r = random(255);
g = random(255);
b = random(255);
redraw();
}
function setup() {
createCanvas(600, 300);
noLoop();
brain = new NeuralNetwork(3, 3, 2);
for (let i = 0; i < 10000; i++) {
let r = random(255);
let g = random(255);
let b = random(255);
let targets = trainColor(r, g, b);
let inputs = [r / 255, g / 255, b / 255];
brain.train(inputs, targets);
}
pickColor();
}
function mousePressed() {
pickColor();
}
function colorPredictor(r, g, b) {
let inputs = [r / 255, g / 255, b / 255];
let outputs = brain.predict(inputs);
if (outputs[0] > outputs[1]) {
return "complement"
} else {
return "original"
}
}
function trainColor(r, g, b) {
if ((r + g + b > 0) && (r + g + b > (255 * 3) / 2)) {
return [1, 0];
} else {
return [0, 1];
}
}
function draw() {
background(r, g, b);
strokeWeight(4);
stroke(0);
line(width / 2, 0, width / 2, height);
textSize(32);
noStroke();
fill(0);
textAlign(CENTER, CENTER);
text("black", 150, 100);
fill(255);
text("white", 450, 100);
let which = colorPredictor(r, g, b);
if (which === "complement") {
fill(255 - r, 255 - g, 255 - b);
rect(300, 0, width / 2, height);
fill(0);
ellipse(150, 200, 60);
} else {
fill(255 - r, 255 - g, 255 - b);
rect(0, 0, width / 2, height);
fill(255);
ellipse(450, 200, 60);
}
}
function setup() {
createCanvas(640, 360);
lifetime = 400;
lifecycle = 0;
recordtime = lifetime;
target = new Obstacle(width / 2 - 12, 24, 24, 24);
let mutationRate = 0.01;
population = new Population(mutationRate, 50);
obstacles = [];
obstacles.push(new Obstacle(width / 2 - 100, height / 2, 10, 200));
obstacles.push(new Obstacle(width / 2 - 100, height / 2, 200, 10));
}
function draw() {
background(127);
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
fill(0);
noStroke();
text("Generation #: " + population.getGenerations(), 10, 18);
text("Cycles left: " + (lifetime - lifecycle), 10, 36);
text("Record cycles: " + recordtime, 10, 54);
}
function mousePressed() {
target.position.x = mouseX;
target.position.y = mouseY;
recordtime = lifetime;
}let i = 0;
let a = 1;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
i = i + a;
if (i > 255) {
a = -1;
} else if (i < 0) {
a = 1;
}
fill(i);
ellipse(width / 2, height / 2, 50, 50);
console.log(i);
let ps;
var Engine = Matter.Engine,
World = Matter.World,
Bodies = Matter.Bodies;
var engine;
var world;
var circles = [];
var boundaries = [];
var ground;
var img;
function preload() {
img = loadImage('eye.png');
}
function setup() {
createCanvas(400, 700);
engine = Engine.create();
world = engine.world;
Engine.run(engine);
for (var i = 0; i < circles.length; i++) {
circles[i].show();
if (circles[i].isOffScreen()) {
circles[i].removeFromWorld();
circles.splice(i, 1);
i--;
}
}
boundaries.push(new Boundary(60, height * 0.5, 200, 20, 0.5));
boundaries.push(new Boundary(width - 60, height * 0.5, 200, 20, -0.5));
boundaries.push(new Boundary(0, height * 0.9, 20, 300, 0));
boundaries.push(new Boundary(width, height * 0.9, 20, 300, 0));
boundaries.push(new Boundary(width / 2, height + 30, width, 50, 0));
img.loadPixels();
for (let x = 0; x < img.width; x += 10) {
for (let y = 0; y < img.height; y += 10) {
let index = (x + y * img.width) * 4;
let c = img.pixels[index];
let r = img.pixels[index];
let g = img.pixels[index + 1];
let b = img.pixels[index + 2];
let col = color(r, g, b);
let br = brightness(col);
if (br > 1) {
circles.push(new Circle(x, y, 10, col));
}
}
}
}
function mousePressed() {
for (let i = 0; i < circles.length; i++) {
circles[i].drop();
}
}
function draw() {
background(0);
Engine.update(engine);
for (let i = 0; i < circles.length; i++) {
circles[i].show();
}
for (let i = 0; i < boundaries.length; i++) {
boundaries[i].show();
}
}
let v;
function setup() {
createCanvas(640, 360);
v = new Vehicle(width / 2, height / 2);
}
function draw() {
background(51);
let mouse = createVector(mouseX, mouseY);
fill(127);
stroke(200);
strokeWeight(2);
ellipse(mouse.x, mouse.y, 48, 48);
v.arrive(mouse);
v.update();
v.display();
let v;
function setup() {
createCanvas(640, 360);
v = new Vehicle(width / 2, height / 2);
}
function draw() {
background(51);
let mouse = createVector(mouseX, mouseY);
fill(127);
stroke(200);
strokeWeight(2);
ellipse(mouse.x, mouse.y, 48, 48);
v.seek(mouse);
v.update();
v.display();
let mover;
let attractor;
function setup() {
createCanvas(640, 360);
mover = new Mover();
attractor = new Attractor();
}
function draw() {
background(51);
let force = attractor.calculateAttraction(mover);
mover.applyForce(force);
mover.update();
attractor.display();
mover.display();
}
function mouseMoved() {
attractor.handleHover(mouseX, mouseY);
}
function mousePressed() {
attractor.handlePress(mouseX, mouseY);
}
function mouseDragged() {
attractor.handleHover(mouseX, mouseY);
attractor.handleDrag(mouseX, mouseY);
}
function mouseReleased() {
attractor.stopDragging();
}var font;
var vehicles = [];
function preload() {
font = loadFont('Lovely Madness.ttf');
}
function setup() {
createCanvas(800, 300);
fill(255);
textSize(100);
noStroke();
var points = font.textToPoints('PARTICLES', 50, 180);
for (let i = 0; i < points.length; i++) {
let pt = points[i];
vehicles.push(new Vehicle(pt.x, pt.y));
}
}
function draw() {
background(0);
if (mouseIsPressed) {
for (let i = 0; i < vehicles.length; i++) {
var v = vehicles[i];
v.shatter();
}
} else {
for (let i = 0; i < vehicles.length; i++) {
var v = vehicles[i];
v.update();
v.show();
v.behaviors();
}
}
}
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
}let angle_pos = 0;
let angle_vel = 0.5;
let angle_acc = 0;
let slider;
function setup() { 
createCanvas(400, 400);
slider = createSlider(-0.01, 0.01,0, 0.001);
} 
function draw() { 
background(220);
translate(200,200);
rotate(angle_acc);
ellipse(0,0,200);
line(0,0,100,0);
angle_acc = slider;
angle_pos += angle_vel;
angle_vel += angle_acc;
let walker = [];
function setup() {
createCanvas(400, 400);
background(0);
for(var i = 0; i<2; i++){
walker [i]= new Walker();
}
}
function draw() {
var gravity = createVector(random(-1,1), random(-1,1));
for( var i = 0; i<walker.length; i++){
walker[i].applyForce(gravity);
walker[i].step();
walker[i].render();
walker[i].update();
walker[i].border();
}
}
function mousePressed(){
walker.push(new Walker(mouseX,mouseY));
var mover;
function setup() {
createCanvas(420, 320);
mover = new Mover();
}
function draw() {
background(0);
let gravity = createVector(0, 0.2);
mover.applyForce(gravity);
if(mouseIsPressed){
let wind = createVector(1,0);
mover.applyForce(wind);
}
mover.update();
mover.checkEdges();
mover.display();
let walker1, walker2;
function setup() {
createCanvas(320, 240);
walker1 = new Walker(100,100);
let s =JSON.stringify(walker1);
console.log(s);
walker2= JSON.parse(s);
background(127);
}
function draw() {
walker1.step();
walker1.render();
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
let walker = [];
function setup() {
createCanvas(400, 400);
background(0);
for(var i = 0; i<2; i++){
walker [i]= new Walker();
}
}
function draw() {
for( var i = 0; i<walker.length; i++){
walker[i].step();
walker[i].render();
}
}
function mousePressed(){
walker.push(new Walker(mouseX,mouseY));
let walker;
function setup() {
createCanvas(320, 240);
walker = new Walker();
}
function draw() {
background(127);
walker.step();
walker.render();
}
function mousePressed(){
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
}function setup() {
createCanvas(200, 200);
}
function draw() {
background(220);
translate(100,100);
noFill();
bezier(85, 20, 10, 10, 90, 90, 15, 80);
bezier(-85, 20, -10, 10, -90, 90, -15, 80);
}let audio;
let level;
var fft, filter;
function preload() {
soundFormats('mp3');
mySound = loadSound('tree-2.mp3'); 
mySound2 = loadSound('bird.mp3');
mySound3 = loadSound('water.mp3');
}
function setup() { 
createCanvas(640, 360);
filter =new p5.LowPass();
mySound3.disconnect();
mySound3.connect(filter);
fft= new p5.FFT();
level = new p5.Amplitude();
} 
function draw() { 
background(220,230,233);
line(200,0,200,250);
line(0,250,640,250);
var freq = map(mouseX, 0, width, 20, 10000);
filter.freq(freq);
filter.res(10);
}
function isMouseOverCanvas() {
var mX = mouseX, mY = mouseY;
if (mX > 0 && mX < width && mY < height && mY > 0) {
mySound3.amp(0.5, 0.2);
} else {
mySound3.amp(0, 0.2);
}
}
function mouseMoved() {
if(mouseX > 0 && 
mouseX < 200 &&
mouseY > 0 &&
mouseY < 250){
if(mySound.isPlaying() == true){
mySound.pause();
}else{
mySound.play();
}
} else {
if(mouseX > 200 && 
mouseX < 640 &&
mouseY > 0 &&
mouseY < 250){
var panValue = map(mouseX, 0, width, -1, 1);
mySound2.pan(panValue);
var speed = map(mouseY, 0, height, 0, 4);
mySound2.rate(speed);  
var vol = map(mouseY, 0, height, 0, 1);
mySound2.amp(vol);
if(mySound2.isPlaying() == true){
mySound2.stop();
}else{
mySound2.play();
}
}else{
if(mouseX > 0 && 
mouseX < 640 &&
mouseY > 250 &&
mouseY < 360){
filterFreq = map(mouseX, 0, width, 20, 20000);
filterRes = map( mouseY, 710, height, 15, 5)
if(mySound3.isPlaying() == true){
mySound3.pause();
}else{
mySound3.play();
} 
}
}
}
}
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
}var stars = [];
var speed = 4;
function setup() {
createCanvas(600, 380);
background(0);
noStroke();
for (var i = 0; i < 600; i++) {
stars[i] = new Star();
}
}
function draw() {
rect(0,0,width,height);
translate(width / 2, height / 2);
for (var i = 0; i < stars.length; i++) {
stars[i].update();
stars[i].show();
stroke(255);
strokeWeight(0.1);
}
}
function Star() {
this.position=createVector(random(-width,width),random(-height,height),random(600));
this.velocity=createVector(0,0,-1);
this.acceleration=createVector(0,0,-0.001);
this.update = function() {
this.velocity.add(this.acceleration);
this.position.add(this.velocity);
if (this.position.z <1) {
this.position.z =600;
this.position.x = random(-width,width);
this.position.y = random(-height,height);
}
}
this.show = function() {
fill(255);
stroke(255,150);
strokeWeight(random(2));
var sx = map(this.position.x / this.position.z, 0, 1, 0, width);
var sy = map(this.position.y/this.position.z, 0, 1, 0, height);
var r = map(this.position.z, 0, width, 10, 0);
ellipse(sx, sy, r, r);
}
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
}var fft, noise, filter, soundFile;
function preload() {
soundFile = loadSound();
}
function setup() {
fill(255, 40, 255);
filter = new p5.BandPass();
noise = new p5.Noise();
noise.disconnect();
noise.connect(filter);
noise.start(soundFile);
fft = new p5.FFT();
}
function draw() {
background(30);
var freq = map(mouseX, 0, width, 20, 10000);
filter.freq(freq);
filter.res(50);
var spectrum = fft.analyze();
noStroke();
for (var i = 0; i < spectrum.length; i++) {
var x = map(i, 0, spectrum.length, 0, width);
var h = -height + map(spectrum[i], 0, 255, height, 0);
rect(x, height, width / spectrum.length, h);
}
isMouseOverCanvas();
}
function isMouseOverCanvas() {
var mX = mouseX, mY = mouseY;
if (mX > 0 && mX < width && mY < height && mY > 0) {
noise.amp(0.5, 0.2);
} else {
noise.amp(0, 0.2);
}
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
var particleSystem;
var separationWeight = 1.5;
var cohesionWeight = 0.2;
var alignmentWeight = 1.3;
var maxSpeed = 3.0;
var maxForce = 0.05;
function setup() {
createCanvas(windowWidth, windowHeight);
stroke('#e4eefd');
strokeWeight(0.5);
particleSystem = new ParticleSystem();
var startPosition = createVector(windowWidth/2, windowHeight/2)
for (var i = 0; i < 100; i++) {
particleSystem.addParticle(new Particle(startPosition));
}
}
function draw() {
background('#0f5bc2');
particleSystem.run();
}
$(document).ready(function () {
$('#separationSlider').on('change', function() {
separationWeight = this.value;
});
$('#cohesionSlider').on('change', function() {
cohesionWeight = this.value;
});
$('#alignmentSlider').on('change', function() {
alignmentWeight = this.value;
});
$('#maxSpeedSlider').on('change', function() {
maxSpeed = this.value;
});
$('#maxForceSlider').on('change', function() {
maxForce = this.value;
});
$('.menu-toggle').on('click', function() {
if ($(this).hasClass('open')) {
$(this).removeClass('open');
$('#menu').animate({marginLeft: '-200px'}, 500);
} else {
$(this).addClass('open');
$('#menu').animate({marginLeft: '0px'}, 500);
}
});
});
var Particle = function(position) {
this.position = position.copy();
this.velocity = createVector(random(-1, 1), random(-1, 1));
this.acceleration = createVector(0, 0);
this.r = 10;
}
Particle.prototype.run = function(boids) {
this.flock(boids);
this.update();
this.borders();
this.display();
}
Particle.prototype.flock = function(boids) {
var separation = this.aggregateSeparation(boids);
var alignment = this.aggregateAlignment(boids);
var cohesion = this.aggregateCohesion(boids);
separation.mult(separationWeight);
alignment.mult(alignmentWeight);
cohesion.mult(cohesionWeight);
this.acceleration.add(separation);
this.acceleration.add(alignment);
this.acceleration.add(cohesion);
}
Particle.prototype.update = function() {
this.velocity.add(this.acceleration);
this.velocity.limit(maxSpeed);
this.position.add(this.velocity);
this.acceleration.mult(0);
}
Particle.prototype.borders = function() {
if (this.position.x < -this.r) this.position.x = windowWidth + this.r;
if (this.position.y < -this.r) this.position.y = windowHeight + this.r;
if (this.position.x > windowWidth + this.r) this.position.x = -this.r;
if (this.position.y > windowHeight + this.r) this.position.y = -this.r;
}
Particle.prototype.display = function() {
push();
translate(this.position.x, this.position.y);
rotate(this.velocity.heading() + radians(180));
beginShape();
fill(175);
stroke(255);
strokeWeight(1);
vertex(0, 0);
vertex(16, -6);
vertex(13, 0);
vertex(16, 6);
scale(0.75);
endShape(CLOSE);
pop();
}
Particle.prototype.aggregateSeparation = function(boids) {
var neighbourDistance = 25.0;
var steer = createVector(0, 0);
var count = 0.0;
var numberOfBoids = boids.length;
var currentPosition = this.position.copy();
for (var i = 0; i < numberOfBoids; i++) {
var distance = currentPosition.dist(boids[i].position);
if (distance > 0 && distance < neighbourDistance) {
var diff = currentPosition.sub(boids[i].position);
diff.normalize();
diff.div(distance);
steer.add(diff);
count++;
}
}
if (count > 0) {
steer.div(count);
}
if (steer.mag() > 0) {
steer.normalize();
steer.mult(maxSpeed);
steer.sub(this.velocity);
steer.limit(maxForce);
}
return steer;
}
Particle.prototype.aggregateAlignment = function(boids) {
var neighbourDistance = 25;
var sum = new createVector(0, 0);
var count = 0;
var numberOfBoids = boids.length;
var currentPosition = this.position.copy();
for (var i = 0; i < numberOfBoids; i++) {
var distance = currentPosition.dist(boids[i].position);
if (distance > 0 && distance < neighbourDistance) {
sum.add(boids[i].velocity);
count++;
}
}
if (count > 0) {
sum.div(count);
sum.normalize();
sum.mult(maxSpeed);
var steer = sum.sub(this.velocity);
steer.limit(maxForce);
return steer;
}
return createVector(0,0);
}
Particle.prototype.aggregateCohesion = function(boids) {
var neighbourDistance = 100;
var sum = createVector(0, 0);
var count = 0;
var numberOfBoids = boids.length;
var currentPosition = this.position.copy();
for (var i = 0; i < numberOfBoids; i++) {
var distance = currentPosition.dist(boids[i].position);
if (distance > 0 && distance < neighbourDistance) {
sum.add(boids[i].position);
count++;
}
}
if (count > 0) {
sum.div(count);
return this.seek(sum);
}
return createVector(0,0);
}
Particle.prototype.seek = function(target) {
var desired = target.sub(location);
desired.normalize();
desired.mult(maxSpeed);
var steer = desired.sub(this.velocity);
steer.limit(maxForce);
return steer;
}
var ParticleSystem = function() {
this.particles = [];
}
ParticleSystem.prototype.addParticle = function(b) {
this.particles.push(b);
}
ParticleSystem.prototype.run = function() {
var numberOfBoids = this.particles.length;
for (var i = 0; i < numberOfBoids; i++) {
this.particles[i].run(this.particles);
}
}function setup() { 
createCanvas(400, 400);
background(220);
} 
function touchMoved() { 
ellipse(mouseX, mouseY, 20, 20);
}var circle = [];
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
for (var a = 0; a < circle.length; a++) {
circle[a].show();
}
}
function mousePressed() {
let c = new Circle(mouseX, mouseY);
circle.push(c);
}
class Circle{
constructor(x,y){
this.x = x;
this.y = y;
}  
show(){
fill(255);
ellipse(this.x, this.y, 10, 10);
}
var video;
var balls = [];
var trackColor;
function setup() {
createCanvas(640, 480);
pixelDensity(1);
video = createCapture(VIDEO);
video.size(width, height);
video.hide();
angleMode(DEGREES);
trackColor = [255, 255, 255];
}
function draw() {
video.loadPixels();
image(video,0,0);
var worldRecord = 500;
var closestX = 0;
var closestY = 0;
for (var y = 0; y < video.height; y++) {
for (var x = 0; x < video.width; x++) {
var loc =( x +y * video.width) * 4;
var r1 = video.pixels[loc];
var g1 = video.pixels[loc + 1];
var b1 = video.pixels[loc + 2];
var r2 = trackColor[0];
var g2 = trackColor[1];
var b2 = trackColor[2];
if (d < worldRecord) {
worldRecord = d;
closestX = x;
closestY = y;
}
}
}
if (worldRecord < 50) {
for (var i = 0; i < balls.length; i++) {
balls[i].update();
balls[i].render();
if (balls[i].ballisFinished()) {
balls.splice(i, 1);
}
}
for(var a = 0; a<10; a++){
balls.push(new Ball((closestX + random(-30, 30)), closestY + random(-30, 30), closestX, closestY));
}
}
}var balls = [];
var slider;
function setup() {
createCanvas(600, 600);
slider = createSlider(0, 360, 180, 40);
slider.position(260, 610);
slider.style('width', '80px');
}
function draw() {
background(0);
for (var i = 0; i < balls.length; i++) {
balls[i].update();
balls[i].render();
if (balls[i].ballisFinished()) {
balls.splice(i, 1);
}
}
}
function mousePressed() {
if (mouseY < 600) {
for (var i = 0; i < slider.value(); i++) {
balls.push(new Ball((mouseX + random(-30, 30)), mouseY + random(-30, 30)));
}
}
}var video;
var vScale  = 16; 
var slider;
function setup(){
createCanvas(640, 480);
video = createCapture(VIDEO);
video.size (width/ vScale, height/ vScale);
pixelDensity(1);
}
function draw(){
background(51);
video.loadPixels(); 
loadPixels();
for(var y= 0; y<video.height; y++){
for(var x = 0; x<video. width; x++){
var index = (x + y*video.width)*4;
var r = video.pixels[index+0];
var g = video.pixels[index+1];
var b = video.pixels[index+2];
var threshold = slider.value();
if(bright > threshold){
fill(255);
}else{
fill(0);
}
var w = map(bright, 0, 255, 0, vScale);
noStroke();
rectMode(CENTER); 
rect(x*vScale, y*vScale, vScale, vScale);
}
}
}
let img;
let song;
let sliderRate;
let sliderPan;
let button;
let amp;
let mic;
var dragging = false;
var mini = [];
function preload() {
song = loadSound("banana.mp3");
img = loadImage("minion.png")
}
function setup() {
createCanvas(1000, 800);
mic = new p5.AudioIn();
mic.start();
sliderRate = createSlider(0, 2, 1, 0.01);
sliderPan = createSlider(-1, 1, 0, 0.01);
button = createButton("Banana");
button.mousePressed(togglePlaying);
amp = new p5.Amplitude();
}
function togglePlaying() {
if (!song.isPlaying()) {
song.play();
button.html("NoBanana")
} else {
song.pause();
button.html("Banana")
}
}
function loaded() {
}
function draw() {
background(255);
if (dragging) {
for( var i = 0; i< mini.length; i++){
mini.push(drawMini(mouseX, mouseY));
console.log(mini);
}
}
song.rate(sliderRate.value());
song.pan(sliderPan.value());
}
function mousePressed() {
dragging = true;
}
function mouseReleased() {
dragging = false;
}
function drawMini(x, y) {
var vol = mic.getLevel();
image(img, x, y);
noStroke();
fill(63, 8, 8);
ellipse(x, y, 100, vol * 200);
}let img;
let song;
let sliderRate;
let sliderPan;
let button;
let amp;
let mic;
var dragging = false;
var mini = [];
function preload() {
song = loadSound("banana.mp3");
img = loadImage("minion.png")
}
function setup() {
createCanvas(1000, 800);
mic = new p5.AudioIn();
mic.start();
sliderRate = createSlider(0, 2, 1, 0.01);
sliderPan = createSlider(-1, 1, 0, 0.01);
button = createButton("Banana");
button.mousePressed(togglePlaying);
amp = new p5.Amplitude();
}
function togglePlaying() {
if (!song.isPlaying()) {
song.play();
button.html("NoBanana")
} else {
song.pause();
button.html("Banana")
}
}
function loaded() {
}
function draw() {
background(255);
if(dragging){
mini.push(drawMini(mouseX,mouseY));
}
song.rate(sliderRate.value());
song.pan(sliderPan.value());
}
function mousePressed() {
dragging = true;
}
function mouseReleased() {
dragging = false;
}
function drawMini(x, y) {
var vol = mic.getLevel();
image(img, x, y);
noStroke();
fill(63, 8, 8);
ellipse(935, 630, 100, vol * 200);
var rotateangle = 0;
var rotateangle1 = 0;
function setup() {
createCanvas(800, 600);
}
function draw() {
background(139, 201, 224);
push();
noStroke();
fill(255);
ellipse(400, 200, 200, 200);
ellipse(280, 250, 160, 160);
ellipse(520, 240, 150, 150);
ellipse(460, 320, 210, 170);
ellipse(300, 330, 150, 150);
ellipse(190, 290, 120, 120);
ellipse(580, 300, 120, 110);
noStroke();
fill(0);
ellipse(310, 260, 22, 22);
ellipse(460, 260, 22, 22);
fill(230, 144, 143);
ellipse(280, 280, 35, 15);
ellipse(490, 280, 35, 15);
pop();
push();
noFill();
strokeWeight(4);
arc(375, 270, 20, 20, 0, PI, OPEN);
arc(395, 270, 20, 20, 0, PI, OPEN);
noFill();
stroke(255);
strokeWeight(5);
curve(100, 310, 600, 300, 680, 400, 520, 350);
ellipse(670, 416, 40, 30);
push();
var t = map(mouseX, 0, width, -5, 5);
curveTightness(t);
drawarm();
pop();
pop();
push();
noFill();
stroke(255);
strokeWeight(5);
curve(500, 510, 350, 380, 350, 520, 520, 550);
curve(400, 910, 450, 380, 450, 520, 220, 550);
ellipse(330, 528, 50, 30)
ellipse(470, 528, 50, 30)
pop();
}
function drawarm(){
curve(500, 310, 150, 300, 100, 200, 220, 350);
ellipse(110, 186, 40, 30);
}
function setup(){
createCanvas(320, 240);
video = createCapture(VIDEO);
video.size (320, 240);
pixelDensity(1);
}
function draw(){
background(51);
video.loadPixels(); 
loadPixels();
for(var y= 0; y<height; y++){
for(var x = 0; x<width; x++){
var index = (x+y*width)*4;
var r = video.pixels[index+0];
var g = video.pixels[index+1];
var b = video.pixels[index+2];
var bright = (r+g+b)/3  ;
pixels[index] = bright;
pixels[index+1] = bright;
pixels[index+2] = bright;
pixels[index+3] = 255;
}
}
updatePixels();
}
function setup(){
createCanvas(320, 240);
pixelDensity(1);
}
function draw(){
background(51);
loadPixels();
for(var y= 0; y<height; y++){
for(var x = 0; x<width; x++){
var index = (x+y*width)*4;
pixels[index] = x;
pixels[index+1] = random(255) ;
pixels[index+2] = y; 
pixels[index+3] = 255;
}
}
updatePixels();
}var mic;
function setup() {
createCanvas(200, 200);
mic = new p5.AudioIn();
mic.start();
}
function draw() {
background(0);
var vol = mic.getLevel(); 
console.log(vol);
stroke(255);
fill(175);
ellipse(100, 100, 200, 1 + vol * 200);
}var balls = [];
var mic;
var index = -1;
var pastSecond = 0;
var lyrics = ['HAPPY', 'Birthday', 'ICM',
'WE', 'ARE', 'HERE', 'this', 'FRIDAY',
'CELEBRATING', 'DANIEL', 'SHIFFMAN',
'MAKING', 'VIDEOS', 'ALL', 'DAY'
];
function setup() {
createCanvas(windowWidth, windowHeight);
mic = new p5.AudioIn();
mic.start();
}
function draw() {
background(0);
var vol = mic.getLevel();
var lyric = song();
textSize(100);
text(lyrics[index], width/2, height/2);
for (var i = 0; i < balls.length; i++) {
balls[i].update();
balls[i].render();
if (balls[i].ballisFinished()) {
balls.splice(i, 1);
}
}
balls.push(new Ball((random(0, width)), random(0, height), vol));
push();
stroke(255);
fill(249, 212, 35);
ellipse(250, 250, 280, 280);
fill(255, 78, 80);
strokeWeight(2);
ellipse(250, 300, 80, 1 + vol * 400);
fill(0);
stroke(0)
strokeWeight(8);
ellipse(210, 210, 25, 1 + vol * 250);
ellipse(290, 210, 25, 1 + vol * 250);
noFill(0);
ellipse(290, 210, 25, 1 + vol * 300);
strokeWeight(5);
ellipse(210, 220, 70, 60);
ellipse(290, 220, 70, 60);
line(115, 195, 390, 200);
pop();
}
function song() {
var currentSecond = second();
if (currentSecond > pastSecond + 0.5) {
index++;
pastSecond = currentSecond;
}
}var video;
var button;
var snapshots = [];
var counter = 0;
var total = 43;
function setup(){
createCanvas(800,240);
background(51);
video = createCapture(VIDEO, ready );
video.size(320, 240);
}
var go = false;
function ready(){
go = true; 
}
function draw(){
if(go){
snapshots[counter] = video.get();
counter++;
if(counter == total){
counter = 0;
}
}
var w = 80;
var h = 60;
var x= 0;
var y = 0;
for(var i = 0; i<snapshots.length; i++){
var index = (i+ frameCount) % snapshots.length ;
image(snapshots[index],  x, y, w, h);
x = x+w ;
if(x > width){
x=0;
y=y+h; 
}
}
}let img;
let x, y;
function setup() {
createCanvas(640, 480);
x = width / 2;
y = height / 2;
background(0);
img = createCapture(VIDEO);
}
function draw() {
for (let i = 0; i < 25; i++) {
let x = floor(random(width));
let y = floor(random(height));
let col = img.get(x, y);
col[3] = 50;
fill(col);
noStroke();
ellipse(x, y, 30);
}
}let img;
let x, y;
function setup() {
createCanvas(640, 480);
background(0);
x = width / 2;
y = height / 2;
img = createCapture(VIDEO);
}
function draw() {
let col = img.get(x, y);
col[3] = 100;
fill(col);
noStroke();
ellipse(x, y, 60);
x += random(-50, 50);
y += random(-50, 50);
x = constrain(x, 0, width);
y = constrain(y, 0, height);
}let img;
let x, y;
function setup() {
createCanvas(640, 480);
background(0);
x = width / 2;
y = height / 2;
img = createCapture(VIDEO);
}
function draw() {
let col = img.get(x, y);
col[3] = 100;
fill(col);
noStroke();
ellipse(x, y, 60);
x += random(-50, 50);
y += random(-50, 50);
x = constrain(x, 0, width);
y = constrain(y, 0, height);
}let img;
function preload(){
}
function setup() { 
createCanvas(736, 736);
background(0);
} 
function draw() { 
image(img, 0, 0);
}let weather;
let x = 36;
let y = 36;
let xdirection = 1;
let ydirection = 1;
let input;
let button;
let apiKey = '&APPID=3a6c728f7ad54686e4fda6ce19821184';
let units = '&units=metric';
function preload() {
leaf = loadImage("images/leaf.png");
}
function setup() {
createCanvas(600, 400);
input = createInput('New York');
button = createButton('submit');
button.mousePressed(weatherAsk);
weatherAsk();
}
function weatherAsk() {
let url = api + apiKey + units;
loadJSON(encodeURI(url), gotData);
}
function gotData(data) {
weather = data;
}
function draw() {
background(207, 242, 255);
image(leaf, x, y, 70, 70);
if (weather) {
let windspeed = weather.wind.speed;
console.log(windspeed);
x += windspeed * xdirection;
y += windspeed * ydirection;
if (x > width - 70 || x < 0) {
xdirection *= -1;
}
if (y > height - 70 || y < 0) {
ydirection *= -1;
}
}
}let data;
function preload() {
}
function setup() {
createCanvas(400, 400);
background(0);
createP(data.description);
createA(data.source, 'source');
for(let i = 0; i<data.gemstones.length; i++){
fill(255);
textAlign(CENTER);
text(data.gemstones[i], random(width), random(height));
}
console.log(data);
}
function draw() {
}function setup() { 
createCanvas(400, 400);
let button = createButton('test');
let input = createInput('name');
button.mousePressed(press);
function press(){
button.html('set' + int(random(10)));
input.html('name');
}
} 
function draw() { 
background(220);
}let p;
function setup() {
let canvas = createCanvas(400, 400);
particle = new Particle();
background(0);
canvas.mousePressed(addCircle);
particle.show();
canvas.mousePressed(function showParticle() {
particle.show();
});
}
function addCircle() {
fill(255);
}
class Particle {
constructor() {
this.x = 100;
this.y = 100;
}
show() {
ellipse(this.x, this.y, 64);
}
}
var portName= '/dev/cu.usbmodem1441';
var circles=[];
var inData;
var inDatap5;
var outByte = 0;
function setup() { 
createCanvas(400, 500);
angleMode(DEGREES);
for(let i = 1; i < 13; i++)
{
let direction = "right";
{
direction = "left";
}
let c = new Circle(30*i, 20*i, direction);
circles.push(c);
}
slider = new Slider();
} 
function parseData(){
if(inString.length > 0 )
{
inData = Number(inString);
}
inDatap5 = inByte;
}
function draw() { 
push(); 
background(200);
translate(200, 200);
for(let i = 0; i < circles.length; i++)
{
circles[i].show(); 
}
pop();
push();
pop();
}
function mouseDragged(){
outByte = int(map(mouseX, 0, width, 0, 255));
}
function mousePressed() {
if (mouseX > slider.x && mouseX < slider.x + slider.w && mouseY > slider.y && mouseY < slider.y + slider.h) {
slider.dragging = true;
slider.offsetX = slider.x - mouseX;
}
}
function mouseReleased() {
slider.dragging = false;
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
}
var portName= '/dev/cu.usbmodem1441';
var circles=[];
var inData;
function setup() { 
createCanvas(400, 500);
angleMode(DEGREES);
for(let i = 1; i < 13; i++)
{
let direction = "right";
{
direction = "left";
}
let c = new Circle(30*i, 20*i, direction);
circles.push(c);
}
slider = new Slider();
} 
function parseData(){
if(inString.length > 0 )
{
inData = Number(inString);
}
}
function draw() { 
push();
background(200);
translate(200, 200);
for(let i = 0; i < circles.length; i++)
{
circles[i].show(); 
}
pop();
push();
pop();
}
function mousePressed() {
if (mouseX > slider.x && mouseX < slider.x + slider.w && mouseY > slider.y && mouseY < slider.y + slider.h) {
slider.dragging = true;
slider.offsetX = slider.x - mouseX;
}
}
function mouseReleased() {
slider.dragging = false;
}
var portName= '/dev/cu.usbmodem1441';
var circles=[];
var inData;
function setup() { 
createCanvas(400, 500);
angleMode(DEGREES);
for(let i = 1; i < 13; i++)
{
let direction = "right";
{
direction = "left";
}
let c = new Circle(30*i, 20*i, direction);
circles.push(c);
}
slider = new Slider();
} 
function parseData(){
if(inData.length > 0 )
{
inData = int(inData);
}
}
function draw() { 
push();
background(200);
translate(200, 200);
for(let i = 0; i < circles.length; i++)
{
circles[i].drawLines(); 
circles[i].updateRotation(); 
}
pop();
push();
slider.move();
pop();
}
function mousePressed() {
if (mouseX > slider.x && mouseX < slider.x + slider.w && mouseY > slider.y && mouseY < slider.y + slider.h) {
slider.dragging = true;
slider.offsetX = slider.x - mouseX;
}
}
function mouseReleased() {
slider.dragging = false;
}var circles = [];
var portName = '/dev/cu.usbmodem1441';
function setup() {
createCanvas(400, 500);
angleMode(DEGREES);
for (let i = 1; i < 13; i++) {
let direction = "right";
{
direction = "left";
}
let c = new Circle(30 * i, 20 * i, direction);
circles.push(c);
}
slider = new Slider();
}
function draw() {
push();
background(200);
translate(200, 200);
for (let i = 0; i < circles.length; i++) {
circles[i].show();
}
pop();
push();
pop();
}
function mousePressed() {
if (mouseX > slider.x && mouseX < slider.x + slider.w && mouseY > slider.y && mouseY < slider.y + slider.h) {
slider.dragging = true;
slider.offsetX = slider.x - mouseX;
}
}
function mouseReleased() {
slider.dragging = false;
}var circles = [];
var portName = '/dev/cu.usbmodem1441';
function setup() {
createCanvas(400, 500);
angleMode(DEGREES);
for (let i = 1; i < 13; i++) {
let direction = "right";
{
direction = "left";
}
let c = new Circle(30 * i, 20 * i, direction);
circles.push(c);
}
slider = new Slider();
}
function draw() {
push();
background(200);
translate(200, 200);
for (let i = 0; i < circles.length; i++) {
circles[i].show();
}
pop();
push();
slider.move();
pop();
}
function mousePressed() {
if (mouseX > slider.x && mouseX < slider.x + slider.w && mouseY > slider.y && mouseY < slider.y + slider.h) {
slider.dragging = true;
slider.offsetX = slider.x - mouseX;
}
}
function mouseReleased() {
slider.dragging = false;
var portName= '/dev/cu.usbmodem1441';
var bg = 0;
var col = 255;
var button = 1;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(bg);
}
function parseData(){
if(inData.length > 0 )
{
var values = inData.split(',');
bg = int(values[0]);
}
}function setup() { 
createCanvas(400, 400);
createP('Hello');
createButton("submit");
} 
function draw() { 
background(220);
}var circles=[];
function setup() { 
createCanvas(400, 500);
angleMode(DEGREES);
for(let i = 1; i < 13; i++)
{
let direction = "right";
{
direction = "left";
}
let c = new Circle(30*i, 20*i, direction);
circles.push(c);
}
slider = new Slider();
} 
function draw() { 
push();
background(200);
translate(200, 200);
for(let i = 0; i < circles.length; i++)
{
circles[i].show(); 
}
pop();
push();
slider.move();
pop();
}
function mousePressed() {
if (mouseX > slider.x && mouseX < slider.x + slider.w && mouseY > slider.y && mouseY < slider.y + slider.h) {
slider.dragging = true;
slider.offsetX = slider.x - mouseX;
}
}
function mouseReleased() {
slider.dragging = false;
function setup() {
}
for (var i = 0; i < portList.length; i++) {
}
}
function draw() { 
background(220);
}let x = 300;
let y = 300;
let lifespan = 255;
function setup() { 
createCanvas(400, 400);
} 
function draw() {     
background(220);
fade();
stroke(0,lifespan);
line(0,0,x, y);
x=x-0.1;
y=y-0.1;
}
function fade(){
lifespan = lifespan - 0.1;
}let circle;
let rotline;
let slider;
let R = [];
let arraySizes = [20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240];
function setup() {
createCanvas(400, 500);
circle = new Circle();
slider = new Slider();
angleMode(DEGREES);
for (let a = 0; a < arraySizes.length; a++) {
R[a] = [];
for (let b = 0; b < arraySizes[a]; b++) {
R[a][b] = random(0, 360);
}
}
}
function draw() {
background(220);
push();
pop();
translate(200, 200);
rotate(slider.leftrotate);
drawline(R[2]);
pop();
slider.move();
}
function drawline() {
let y1 = -16;
let y2 = -30;
for (let a = 0; a < arraySizes.length; a++) {
for (let b = 0; b < arraySizes[a]; b++) {
rotate(R[a][b]);
line(0, y1 - 15 * a, 0, y2 - 15 * a);
}
}
return R;
}
function mousePressed() {
if (mouseX > slider.x && mouseX < slider.x + slider.w && mouseY > slider.y && mouseY < slider.y + slider.h) {
slider.dragging = true;
slider.offsetX = slider.x - mouseX;
}
}
function mouseReleased() {
slider.dragging = false;
let circle;
let rotline;
let slider;
let R = [];
let arraySizes = [20, 40, 60, 80, 100, 120, 140, 160, 180, 200];
function setup() {
createCanvas(400, 500);
circle = new Circle();
slider = new Slider();
angleMode(DEGREES);
for (let a = 0; a < arraySizes.length; a++) {
R[a] = [];
for (let b = 0; b < arraySizes[a]; b++) {
R[a][b] = random(0, 360);
}
}
}
function draw() {
background(220);
push();
pop();
translate(200, 200);
rotate(slider.leftrotate);
drawline1();
pop();
slider.move();
}
function drawline1() {
let y1 = -16;
let y2 = -30;
for (let a = 0; a < arraySizes.length; a++) {
for (let b = 0; b < arraySizes[a]; b++) {
for (let l = 0; l < 150; l += 15) {
rotate(R[a][b]);
line(0, y1 - l, 0, y2 - l);
}
}
}
}
function mousePressed() {
if (mouseX > slider.x && mouseX < slider.x + slider.w && mouseY > slider.y && mouseY < slider.y + slider.h) {
slider.dragging = true;
slider.offsetX = slider.x - mouseX;
}
}
function mouseReleased() {
slider.dragging = false;
}let bubble1;
let bubble2;
function setup() {
createCanvas(400, 400);
bubble1 = new Bubble(400, 200, 24);
bubble2 = new Bubble(200, 200, 24);
}
function draw() {
background(0);
bubble1.move();
bubble1.show();
bubble2.move();
bubble2.show();
}
class Bubble {
constructor(unicorn, y, r) {
this.unicorn = unicorn;
this.y = y;
this.r = r;
}
move(){
this.unicorn = this.unicorn + random(-3,3);
this.y = this.y + random(-3,3);
}
show(){
stroke(255);
strokeWeight(4);
noFill();
ellipse(this.unicorn, this.y, this.r*2, this.r*2);
}
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
let bouncer;
let bouncer1;
let bouncer2 = [];
let gravity = 0.1;
function setup() {
createCanvas(400, 400);
for (let i = 0; i < 200; i++) {
let x = random(width);
let r = random(12, 38);
let y = random(height);
bouncer2.push(new Ball(x, y, r));
}
}
function draw() {
background(255);
for (let i = 0; i < bouncer2.length; i++) {
bouncer2[i].render();
bouncer2[i].update();
}
}
createCanvas(400, 400);
} 
function draw() { 
background(220);
let r2 = [];
let r3 = [];
let r4 = [];
let r5 = [];
let r6 = [];
let r7 = [];
let r8 = [];
let r9 = [];
let r10 = [];
let r1_1 = [];
var x = 50;
var y = 430;
var w = 10;
var h = 50;
var sliderStart = 50;
var sliderEnd = 350;
var offsetX = 0;
function setup() {
createCanvas(400, 500);
angleMode(DEGREES);
for (let i = 0; i < 20; i++) {
r1[i] = random(0, 360);
}
for (let i = 0; i < 40; i++) {
r2[i] = random(0, 360);
}
for (let i = 0; i < 60; i++) {
r3[i] = random(0, 360);
}
for (let i = 0; i < 80; i++) {
r4[i] = random(0, 360);
}
for (let i = 0; i < 100; i++) {
r5[i] = random(0, 360);
}
for (let i = 0; i < 120; i++) {
r6[i] = random(0, 360);
}
for (let i = 0; i < 140; i++) {
r7[i] = random(0, 360);
}
for (let i = 0; i < 160; i++) {
r8[i] = random(0, 360);
}
for (let i = 0; i < 180; i++) {
r9[i] = random(0, 360);
}
for (let i = 0; i < 200; i++) {
r10[i] = random(0, 360);
}
}
function draw() {
background(220);
circle();
pop();
var leftrotate = map(x, sliderStart, sliderEnd - w, 0, 360);
var rightrotate = map(x, sliderStart, sliderEnd - w, 0, -360);
translate(200, 200);
rotate(leftrotate);
drawline1();
pop();
translate(200, 200);
rotate(rightrotate);
drawline2();
pop();
translate(200, 200);
rotate(leftrotate);
drawline3();
pop();
translate(200, 200);
rotate(rightrotate);
drawline4();
pop();
translate(200, 200);
rotate(leftrotate);
drawline5();
pop();
translate(200, 200);
rotate(rightrotate);
drawline6();
pop();
translate(200, 200);
rotate(leftrotate);
drawline7();
pop();
translate(200, 200);
rotate(rightrotate);
drawline8();
pop();
translate(200, 200);
rotate(leftrotate);
drawline9();
pop();
translate(200, 200);
rotate(rightrotate);
drawline10();
pop();
rotatelines();
}
function circle() {
translate(200, 200);
for (let circle = 1; circle <= 11; circle++) {
noFill();
ellipse(0, 0, circle * 30, circle * 30);
}
}
function rotatelines(){
if (dragging) {
x = mouseX + offsetX;
}
x = constrain(x, sliderStart, sliderEnd - w);
stroke(0);
line(sliderStart, y + h / 2, sliderEnd, y + h / 2);
stroke(0);
if (dragging) {
fill(50);
} else {
fill(175);
}
rect(x, y, w, h);
}
function drawline1() {
for (var a = 0; a < r1.length; a++) {
rotate(r1[a]);
line(0, -16, 0, -30);
}
}
function drawline2() {
for (var a = 0; a < r2.length; a++) {
rotate(r2[a]);
line(0, -31, 0, -45);
}
}
function drawline3() {
for (var a = 0; a < r3.length; a++) {
rotate(r3[a]);
line(0, -46, 0, -60);
}
}
function drawline4() {
for (var a = 0; a < r4.length; a++) {
rotate(r4[a]);
line(0, -61, 0, -75);
}
}
function drawline5() {
for (var a = 0; a < r5.length; a++) {
rotate(r5[a]);
line(0, -76, 0, -90);
}
}
function drawline6() {
for (var a = 0; a < r6.length; a++) {
rotate(r6[a]);
line(0, -91, 0, -105);
}
}
function drawline7() {
for (var a = 0; a < r7.length; a++) {
rotate(r7[a]);
line(0, -106, 0, -120);
}
}
function drawline8() {
for (var a = 0; a < r8.length; a++) {
rotate(r8[a]);
line(0, -121, 0, -135);
}
}
function drawline9() {
for (var a = 0; a < r9.length; a++) {
rotate(r9[a]);
line(0, -136, 0, -150);
}
}
function drawline10() {
for (var a = 0; a < r10.length; a++) {
rotate(r10[a]);
line(0, -151, 0, -165);
}
}
function mousePressed() {
if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
dragging = true;
offsetX = x - mouseX;
}
}
function mouseReleased() {
dragging = false;
}
var boxes1 = [];
var boxes2 = [];
var boxes3 = [];
var x = 100;
var y = 25;
var w = 10;
var h = 50;
var sliderStart = 50;
var sliderEnd = 350;
var offsetX = 0;
function setup() {
createCanvas(400, 400);
angleMode(DEGREES);
for (var i = 0; i < 20; i++) {
boxes[i] = random(0, 360);
for (var i = 0; i < 20; i++) {
boxes1[i] = random(0, 360);
for (var i = 0; i < 50; i++) {
boxes2[i] = random(0, 360);
for (var i = 0; i < 7\0; i++) {
boxes3[i] = random(0, 360);
}
function draw() {
background(220);
if (dragging) {
x = mouseX + offsetX;
}
x = constrain(x, sliderStart, sliderEnd - w);
stroke(0);
line(sliderStart, y + h / 2, sliderEnd, y + h / 2);
stroke(0);
if (dragging) {
fill(50);
} else {
fill(175);
}
rect(x, y, w, h);
push();
translate(200, 200);
noFill();
ellipse(0, 0, 30, 30);
rotate(r1);
for (var a = 0; a < boxes.length; a++) {
rotate(boxes[a]);
line(0, -16, 0, -30);
}
pop();
push();
translate(200, 200);
noFill();
ellipse(0, 0, 60, 60);
var r2 = map(x, sliderStart, sliderEnd - w, -360, 0);
rotate(r2);
for (var a = 0; a < boxes1.length; a++) {
rotate(boxes1[a]);
line(0, -31, 0, -45);
}
pop();
push();
translate(200, 200);
noFill();
ellipse(0, 0, 90, 90);
var r2 = map(x, sliderStart, sliderEnd - w, 360, 0);
rotate(r2);
for (var a = 0; a < boxes2.length; a++) {
rotate(boxes2[a]);
line(0, -46, 0, -60);
}
pop();
push();
translate(200, 200);
noFill();
ellipse(0, 0, 120, 120);
var r3 = map(x, sliderStart, sliderEnd - w, -360, 0);
rotate(r3);
for (var a = 0; a < boxes2.length; a++) {
rotate(boxes3[a]);
line(0, -60, 0, -75);
}
pop();
}
function mousePressed() {
if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
dragging = true;
offsetX = x - mouseX;
}
}
function mouseReleased() {
dragging = false;
var boxes1 = [];
var boxes2 = [];
var boxes3 = [];
var x = 100;
var y = 25;
var w = 10;
var h = 50;
var sliderStart = 50;
var sliderEnd = 350;
var offsetX = 0;
function setup() {
createCanvas(400, 400);
angleMode(DEGREES);
for (var i = 0; i < 20; i++) {
boxes[i] = random(0, 360);
for (var i = 0; i < 20; i++) {
boxes1[i] = random(0, 360);
for (var i = 0; i < 50; i++) {
boxes2[i] = random(0, 360);
for (var i = 0; i < 80; i++) {
boxes3[i] = random(0, 360);
}
function draw() {
background(220);
if (dragging) {
x = mouseX + offsetX;
}
x = constrain(x, sliderStart, sliderEnd - w);
stroke(0);
line(sliderStart, y + h / 2, sliderEnd, y + h / 2);
stroke(0);
if (dragging) {
fill(50);
} else {
fill(175);
}
rect(x, y, w, h);
push();
translate(200, 200);
noFill();
ellipse(0, 0, 30, 30);
rotate(r1);
for (var a = 0; a < boxes.length; a++) {
rotate(boxes[a]);
line(0, -16, 0, -30);
}
pop();
push();
translate(200, 200);
noFill();
ellipse(0, 0, 60, 60);
var r2 = map(x, sliderStart, sliderEnd - w, -360, 0);
rotate(r2);
for (var a = 0; a < boxes1.length; a++) {
rotate(boxes1[a]);
line(0, -31, 0, -45);
}
pop();
push();
translate(200, 200);
noFill();
ellipse(0, 0, 90, 90);
var r2 = map(x, sliderStart, sliderEnd - w, 360, 0);
rotate(r2);
for (var a = 0; a < boxes2.length; a++) {
rotate(boxes2[a]);
line(0, -46, 0, -60);
}
pop();
push();
translate(200, 200);
noFill();
ellipse(0, 0, 120, 120);
var r3 = map(x, sliderStart, sliderEnd - w, -360, 0);
rotate(r3);
for (var a = 0; a < boxes2.length; a++) {
rotate(boxes3[a]);
line(0, -60, 0, -75);
}
pop();
}
function mousePressed() {
if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
dragging = true;
offsetX = x - mouseX;
}
}
function mouseReleased() {
dragging = false;
var x = 100;
var y = 25;
var w = 10;
var h = 50;
var sliderStart = 100;
var sliderEnd = 400;
var offsetX = 0;
function setup() {
createCanvas(400, 400);
angleMode(DEGREES);
for(var i=0; i<5 ; i++){
boxes[i]=random(0, 360);
}
}
function draw() {
background(220);
if (dragging) {
x = mouseX + offsetX;
}
x = constrain(x, sliderStart, sliderEnd-w);
stroke(0);
line(sliderStart, y+h/2, sliderEnd, y+h/2);
stroke(0);
if (dragging) {
fill (50);
} else {
fill(175);
}
rect(x, y, w, h);
push();
translate(200, 200);
noFill();
ellipse(0, 0, 30, 30);
rotate(b);
for (var a=0; a<boxes.length; a++){
rotate(ab\);
line(0, -16, 0, -30); 
}
pop();
push();
translate(200, 200);
noFill();
ellipse(0, 0, 60, 60);
strokeWeight(4);
line(0, -31, 0, -45);
rotate(45)
rotate(45)
pop();
}
function mousePressed() {
if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
dragging = true;
offsetX = x-mouseX;
}
}
function mouseReleased() {
dragging = false;
}
var boxes = [];
function setup() {
createCanvas(400, 400);
angleMode(DEGREES);
for (var i = 0; i < 5; i++) {
boxes.push(new Jitter());
}
}
function draw() {
background(220);
}
function Jitter(){
push();
translate(200, 200);
noFill();
ellipse(0, 0, 30, 30);
for(var i = random(0,360); i<=boxes.length; i++){
rotate(boxed[i]);
line(0, -16, 0, -30);
}
}
function setup() {
createCanvas(400, 400);
angleMode(DEGREES);
}
function draw() {
background(220);
push();
translate(200, 200);
noFill();
ellipse(0, 0, 30, 30);
if(frameCount%60==5){
for(var i=0; i<5 ; i++){
boxes[i]=random(0, 360);
}
}
for (var a=0; a<boxes.length; a++){
rotate(boxes[a]);
line(0, -16, 0, -30);
}
pop();
push();
translate(200, 200);
noFill();
ellipse(0, 0, 60, 60);
strokeWeight(4);
line(0, -31, 0, -45);
rotate(45)
rotate(45)
pop();
}function setup() {
createCanvas(400, 400);
angleMode(DEGREES);
}
function draw() {
background(220);
translate(200, 200);
noFill();
ellipse(0, 0, 30, 30);
line(0, -16, 0, -30);
rotate(45)
line(0, -16, 0, -30);
rotate(45)
line(0, -16, 0, -30);
}function setup() {
pixelDensity(1);
createCanvas(600, 400);
}
function draw() {
background(220);
drawCircle(300, 200, 300);
}
function drawCircle(x, y, d) {
stroke(0);
noFill();
ellipse(x, y, d);
if (d > 2) {
drawCircle(x + d / 2, y, d / 2);
drawCircle(x - d / 2 , y, d / 2);
}
}function setup() { 
pixelDensity(1);
createCanvas(600, 400);
} 
function draw() { 
background(220);
drawCircle(300,200,300);
}
function drawCircle(x,y,d){
stroke(0);
noFill();
ellipse(x,y,d);
÷
}let pg;
let x = 0;
function setup() { 
createCanvas(400, 400);
pg = createGraphics(100,100);
pg.background(255,0,255);
} 
function draw() { 
background(0);
pg.fill(255);
pg.ellipse(mouseX,mouseY,20,20);
for (let x=0; x<width; x +=150){
image(pg,x,0);
}
}let pg;
let x = 0;
function setup() { 
createCanvas(400, 400);
pg = createGraphics(400,400);
pg.background(0);
} 
function draw() { 
background(0);
pg.fill(255);
pg.ellipse(mouseX,mouseY,20,20);
if(mouseIsPressed){
image(pg,0,0);
}
}let x=0;
let x1=0;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
rect(x1, 20, 10, 10);
x=x+5;
ellipse(x,100,50,50);
for (let i=0; i< width; i=i+10){
fill(random(0,255));
rect(i,0,10,10);
}
}var boxes = [];
function setup() { 
createCanvas(400, 400);
frameRate(30);
for (var i = 0; i < 250; i++) {
boxes.push(new Jitter());
}
} 
function draw() { 
background(0);
for (var i = 0; i < boxes.length; i++) {
boxes[i].move();
boxes[i].display();
noFill();
ellipse(mouseX, mouseY, 60, 60);
}
}
function Jitter() {
this.x = random(0, width);
this.y = random(0, height);
this.away = 75;
this.display = function() {
stroke(255);
var r = random(0,255);
var g = random(0,255);
var b = random(0,255);
fill(r,g,b);
if (dist(mouseX, mouseY, this.x, this.y) <= 70)
{
ellipse(this.x - this.away, this.y - this.away, 20, 20);
} else {
ellipse(this.x, this.y, 20, 20);
}
};
this.move = function() {
this.x = this.x + random(-1, 1);
this.y = this.y + random(-1, 1);
};
}var boxes = [];
function setup() {
createCanvas(400, 400);
for (var i = 0; i < 200; i++) {
boxes.push(new Jitter());
}
}
function draw() {
background(220);
for (var i = 0; i < boxes.length; i++) {
boxes[i].move();
boxes[i].display();
ellipse(mouseX, mouseY, 40, 40);
}
}
function Jitter() {
this.x = random(0, width);
this.y = random(0, height);
this.away = 40;
this.move = function() {
this.x = this.x + random(-1, 1);
this.y = this.y + random(-1, 1);
};
this.display = function() {
noStroke();
fill(random(0m);
if(dist(mouseX, mouseY,this.x, this.y) <= 30)
{   
ellipse(this.x+-this.away, this.y+-this.away, 20, 20);
}else{
ellipse(this.x, this.y, 20, 20);
} };
}
function setup() {
createCanvas(400, 400);
for (var i = 0; i < 200; i++) {
boxes.push(new Jitter());
}
}
function draw() {
background(220);
for (var i = 0; i < boxes.length; i++) {
boxes[i].move();
boxes[i].display();
ellipse(mouseX, mouseY, 40, 40);
}
}
function Jitter() {
this.x = random(0, width);
this.y = random(0, height);
this.away = 40;
this.move = function() {
this.x = this.x + random(-1, 1);
this.y = this.y + random(-1, 1);
};
this.display = function() {
noStroke();
fill(random(0m);
if(dist(mouseX, mouseY,this.x, this.y) <= 30)
{   
ellipse(this.x+-this.away, this.y+-this.away, 20, 20);
}else{
ellipse(this.x, this.y, 20, 20);
} };
}
function setup() {
createCanvas(400, 400);
for (var i = 0; i < 200; i++) {
boxes.push(new Jitter());
}
}
function draw() {
background(220);
for (var i = 0; i < boxes.length; i++) {
boxes[i].move();
boxes[i].display();
ellipse(mouseX, mouseY, 40, 40);
}
}
function Jitter() {
this.x = random(0, width);
this.y = random(0, height);
this.away = 40;
this.move = function() {
this.x = this.x + random(-1, 1);
this.y = this.y + random(-1, 1);
};
this.display = function() {
noStroke();
fill(random(0m);
if(dist(mouseX, mouseY,this.x, this.y) <= 30)
{   
ellipse(this.x+-this.away, this.y+-this.away, 20, 20);
}else{
ellipse(this.x, this.y, 20, 20);
} };
}
function setup() {
createCanvas(400, 400);
for (var i = 0; i < 30; i++) {
boxes[i] = {
x : random(0,width),
y : random(0,height),
display: function() {
noStroke();
fill(random(0,255));
ellipse(this.x, this.y, 20, 20);
},
move: function() {
this.x = this.x + random(-1, 1);
this.y = this.y + random(-1, 1);
}
}
}
}
function draw() {
background(220);
for(var i =0; i<boxes.length; i++){
boxes[i].move();
boxes[i].display();
if(dist(mouseX, mouseY, this.x, this.y) < 30){
this.x = this.x+30;
this.y = this.y +30;
}
}
}var boxes = [];
function setup() {
createCanvas(400, 400);
for (var i = 0; i < 200; i++) {
boxes[i] = {
for(var a=0l)
x : 
y : 0,
display: function() {
noStroke();
fill(0);
ellipse(this.x+30, this.y+30, 20, 20);
},
move: function() {
this.x = this.x + random(-1, 1);
this.y = this.y + random(-1, 1);
}
}
}
}
function draw() {
background(220);
for(var i =0; i<boxes.length; i++){
boxes[i].move();
boxes[i].display();
}
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
}var boxes = [];
function setup() {
createCanvas(400, 400);
for (var i = 0; i < 30; i++) {
boxes[i] = {
x : random(0,width),
y : random(0,height),
display: function() {
noStroke();
fill(random(0,255));
ellipse(this.x, this.y, 20, 20);
},
move: function() {
this.x = this.x + random(-1, 1);
this.y = this.y + random(-1, 1);
}
}
}
}
function draw() {
background(220);
for(var i =0; i<boxes.length; i++){
boxes[i].move();
boxes[i].display();
if(dist(mouseX, mouseY, this.x, this.y) < 30){
this.x = this.x+30;
this.y = this.y +30;
}
}
}var box1 = [];
var box2= [];
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
fill(0);
for(var x=0; x<400; x++){
for(var y=0; y<400; y++){
rect(box1[x], box2[y], 20,20);
}
}
} 
let box1 = [];
let box2= [];
function setup() { 
createCanvas(400, 400);
for(var x=0; x<400; x+=20){
box1[x] = [];
}
for(var y=0; y<400; y+=20){
box2[y] = [];
}
} 
function draw() { 
background(220);
for(var x=0; x<400; x+=20){'
box1[x] = [];
rect(box1, box2, 20,20);
for(var y=0; y<400;y+=20){
box1[y] = [];
}
} 
}let box1 = [];
let box2= [];
function setup() { 
createCanvas(400, 400);
for(var x=0; x<400; x+=20){
box1[x] = [];
}
for(var y=0; y<400; y+=20){
box2[y] = [];
}
} 
function draw() { 
background(220);
for(var x=0; x<400; x+=20){'
box1[x] = [];
rect(box1, box2, 20,20);
for(var y=0; y<400;y+=20){
box1[y] = [];
}
} 
}let box1 = [];
let box2= [];
function setup() { 
createCanvas(400, 400);
for(var x=0; x<400; x+=20){
box1[x] = [];
}
for(var y=0; y<400; y+=20){
box2[y] = [];
}
} 
function draw() { 
background(220);
for(var x=0; x<400; x+=20){'
box1[x] = [];
rect(box1, box2, 20,20);
for(var y=0; y<400;y+=20){
box1[y] = [];
}
} 
}let box1 = [];
let box2= [];
function setup() { 
createCanvas(400, 400);
for(var x=0; x<400; x+=20){
box1[x] = [];
}
for(var y=0; y<400; y+=20){
box2[y] = [];
}
} 
function draw() { 
background(220);
for(var x=0; x<400; x+=20){'
box1[x] = [];
rect(box1, box2, 20,20);
for(var y=0; y<400;y+=20){
box1[y] = [];
}
} 
}let box1 = [];
let box2= [];
function setup() { 
createCanvas(400, 400);
for(var x=0; x<400; x+=20){
box1[x] = [];
}
for(var y=0; y<400; y+=20){
box2[y] = [];
}
} 
function draw() { 
background(220);
for(var x=0; x<400; x+=20){'
box1[x] = [];
rect(box1, box2, 20,20);
for(var y=0; y<400;y+=20){
box1[y] = [];
}
} 
let x = 0;
let y = 0;
let box=[]'
var a = 100;
var b = 25;
var w = 10;
var h = 50;
var sliderStart = 100;
var sliderEnd = 400;
var offsetX = 0;
function setup() {
createCanvas(640, 360);
}
function draw() {
background(175);
if (dragging) {
a = mouseX + offsetX;
}
a = constrain(a, sliderStart, sliderEnd-w);
stroke(0);
line(sliderStart, b+h/2, sliderEnd, b+h/2);
stroke(0);
if (dragging) {
fill (50);
} else {
fill(175);
}
rect(a, b, w, h);
noStroke();
let colorbox = random(0,255)
fill(colorbox);
rect(x,100,20,20);
x = x + 20;
}
function mousePressed() {
if (mouseX > a && mouseX < a + w && mouseY > b && mouseY < b + h) {
dragging = true;
offsetX = a-mouseX;
}
}
function mouseReleased() {
dragging = false;
}let x = 0;
let y = 0;
var dragging = false;
var rollover = false;
var a = 50;
var b = 25;
var w = 10;
var h = 50;
var sliderStart = 50;
var sliderEnd = 350;
var offsetX = 0;
var speed=0;
function setup() {
createCanvas(400, 400);
background(255);
noStroke();
}
function draw() {
if (dragging) {
a = mouseX + offsetX;
}
a = constrain(a, sliderStart, sliderEnd-w);
line(sliderStart, b+h/2, sliderEnd, b+h/2);
rect(a, b, w, h);
let r = random(1);
stroke(0);
if (r < 0.5) {
noStroke();
let colorbox = random(0,255)
fill(colorbox);
rect(x,y,20,20);
x = x + 20;
}
if (x == width) {
x = 0;
y = y + 20;
}
}
let y = 0;
let speed = 0;
let bouncing = false;
function setup() {
createCanvas(400, 400);
}
function mousePressed() {
bouncing = !bouncing;
if (bouncing) {
bouncing = false;
} else {
bouncing = true;
}
if (bouncing == true) {
bouncing = false;
} else if (bouncing == false) {
bouncing = true;
}
}
function draw() {
background(0);
fill(255);
ellipse(200, y, 20, 20);
if(bouncing){
speed = speed + 0.2;
}
if (y > height) {
y = height;
if (abs(speed) < 1) {
speed = 0;
}
}
}let x = 0;
let y = 0;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(255);
noStroke();
if (r < 0.5) {
for(var i=0; i<400; i+=20){
fill(random(0,255));
rect(i, i, 20, 20);
/} else {
}
}let canvas = {
x: 400,
y: 400
};
let hourHandRotate;
let minuteHandRotate;
let hourHandColor;
let minuteHandColor;
let word;
let size;
let sizeNumber;
let calendar = "MON";
let calendarDate;
function setup() {
createCanvas(canvas.x, canvas.y);
colorMode(HSB);
}
function draw() {
background(219, 8, 94);
stroke("black");
strokeWeight(3);
stroke("black");
fill(212, 78, 31);
rect(0, 280, 400, 200);
strokeWeight(1);
stroke("silver");
fill("black");
rect(65, 123, 259, 180, 5);
fill(frameCount % 360, 40, 70);
rect(75, 130, 240, 168);
textSize(12);
word = "  All work and no play makes Jack a dull boy";
fill(05);
sizeNumber = random(0, 150);
text(word, 75, 145 + sizeNumber, 240, 155);
stroke("black");
rect(20, 40, 105, 50, 5);
strokeWeight(5);
line(10, 60, 135, 60);
calendarDate = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
if (frameCount%30 == 0) {
calendar = random(calendarDate); 
}
stroke(351, 73, 89);
strokeWeight(4);
fill(351, 73, 89);
textSize(40);
text(calendar, 30, 80);
p1 = {
x: 240,
y: 338
}, p2 = {
x: 208,
y: 338
}
p3 = {
x: 212,
y: 366
}, p4 = {
x: 238,
y: 353
}
noFill();
stroke(0);
strokeWeight(5);
curve(p1.x, p1.y, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y)
curve(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y)
curve(p2.x, p2.y, p3.x, p3.y, p4.x, p4.y, p4.x, p4.y)
stroke("black");
strokeWeight(5);
fill(44, 62, 100);
rect(230, 320, 55, 40, 0, 0, 15, 15);
fill(30, 96, 36);
ellipse(260, 340, 15, 20);
stroke("black");
strokeWeight(7);
fill("white");
bezier(153, 286, 201, 212, 284, 319, 169, 330);
bezier(10, 422, -112, 174, 278, 126, 181, 422);
bezier(167, 358, 249, 338, 231, 361, 173, 383);
fill("black");
ellipse(155, 255, 5, 5);
push();
hourHandRotate = map(mouseX, 0, canvas.x, 0, 2 * PI);
minuteHandRotate = map(mouseX, 0, canvas.x, 0, 24 * PI);
hourHandColor = map(mouseY, 0, canvas.y, 0, 360);
minuteHandColor = 360 - map(mouseY, 0, canvas.y, 0, 360);
translate(canvas.x / 2 + 70, canvas.y / 2 - 140);
fill("white")
ellipse(0, 0, 100, 100);
rotate(hourHandRotate);
stroke(hourHandColor, 100, 100);
strokeWeight(3);
line(0, 0, 0, -30);
rotate(minuteHandRotate - hourHandRotate);
stroke(minuteHandColor, 100, 100);
strokeWeight(1);
line(0, 0, 0, -40);
pop();
var angle = 0;
function setup() {
createCanvas(640, 360);
frameRate(20);
background(255);
angleMode(DEGREES);
rectMode(CENTER);
}
function mousePressed() {
background(255);
}
function draw() {
var r = random(0, 255);
var x = random(0, 100);
var a = random(0, 255);
var angle = random(0, 360);
noStroke();
translate(mouseX, mouseY);
rotate(angle);
fill(r, a);
rect(0, 0, x, x);
}function setup() {
createCanvas(640, 360);
background(255);
}
function mousePressed() {
background(255);
}
function draw() {
var r = random(0,255);
var a;
var b;
var x = random(0,100);
fill(r,200);
ellipse, b, x, x);
a = mouseX + random(-1, 1); 
b = mouseY + random(-1, 1);
}var x;
function setup() { 
createCanvas(400, 400);
x=0;
} 
function draw() { 
background(220);
ellipse(x,200,50,50);
x=x+2;
}function setup() { 
createCanvas(400, 600);
} 
function draw() { 
background(169,73,85);
fill(121,21,44);
quad(270,90,400,226,400,517,172,292);
fill(121,21,44);
quad(228,357,400,526,400,658,172,432);
noStroke();
fill(249,183,72);
quad(135,90,135,170,184,144,176,75);
quad(135,170,127,196,171,277,184,267);
quad(184,267,203,267,203,147,184,144);
triangle(135,170,184,144,184,267);
quad(166,251,162,272,172,292,184,251);
quad(172,292,203,287,203,267,184,251);
noStroke();
fill(243,154,31);
quad(229,75,270,90,270,170,222,144);
quad(222,144,203,147,203,267,222,267);
quad(222,267,234,277,279,196,270,170);
triangle(222,144,270,170,222,267);
quad(203,287,233,292,222,251,203,267);
quad(222,251,240,251,243,272,233,292);
noStroke();
fill(255);
quad(146,174,144,186,153,198,161,184);
quad(161,184,153,198,183,205,189,194);
noStroke();
fill(255);
quad(215,195,222,205,252,198,243,184);
quad(243,184,258,174,261,186,252,198);
}function setup() { 
createCanvas(400, 600);
} 
function draw() { 
background(169,73,85);
fill(121,21,44);
quad(270,90,400,226,400,517,172,292);
fill(121,21,44);
quad(228,357,400,526,400,658,172,432);
noStroke();
fill(249,183,72);
quad(135,90,135,170,184,144,176,75);
quad(135,170,127,196,171,277,184,267);
quad(184,267,203,267,203,147,184,144);
triangle(135,170,184,144,184,267);
quad(166,251,162,272,172,292,184,251);
quad(172,292,203,287,203,267,184,251);
noStroke();
fill(243,154,31);
quad(229,75,270,90,270,170,222,144);
quad(222,144,203,147,203,267,222,267);
quad(222,267,234,277,279,196,270,170);
triangle(222,144,270,170,222,267);
quad(203,287,233,292,222,251,203,267);
quad(222,251,240,251,243,272,233,292);
noStroke();
fill(255);
quad(146,174,144,186,153,198,161,184);
quad(161,184,153,198,183,205,189,194);
noStroke();
fill(255);
quad(215,195,222,205,252,198,243,184);
quad(243,184,258,174,261,186,252,198);
}