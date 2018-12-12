function preload() {
acrylicSound = loadSound("acrylic.mp3");
woodSound = loadSound("wood.mp3");
stoneSound = loadSound("Synth.mp3");
metalSound = loadSound("metal.mp3");
}
function setup() {
createCanvas(800, 800);
fftAcrylicSound = new p5.FFT();
fftAcrylicSound.setInput(acrylicSound);
fftWoodSound = new p5.FFT();
fftWoodSound.setInput(woodSound);
fftStoneSound = new p5.FFT();
fftStoneSound.setInput(stoneSound);
fftMetalSound = new p5.FFT();
fftMetalSound.setInput(metalSound);
fftAcrylicSound.analyze();
acrylicSoundLowMidVal = (int)(fftAcrylicSound.getEnergy("lowMid"));
acrylicSoundHighMidVal = (int)(fftAcrylicSound.getEnergy("highMid"));
fftWoodSound.analyze();
woodSoundLowMidVal = (int)(fftWoodSound.getEnergy("lowMid"));
woodSoundHighMidVal = (int)(fftWoodSound.getEnergy("highMid"));
fftStoneSound.analyze();
stoneSoundLowMidVal = (int)(fftStoneSound.getEnergy("lowMid"));
stoneSoundHighMidVal = (int)(fftStoneSound.getEnergy("highMid"));
fftMetalSound.analyze();
metalSoundLowMidVal = (int)(fftMetalSound.getEnergy("lowMid"));
metalSoundHighMidVal = (int)(fftMetalSound.getEnergy("highMid"));
acrylicBezier = new Bezier(100, 250, acrylicSoundLowMidVal, acrylicSoundHighMidVal,2,5);
woodBezier = new Bezier(250, 400, woodSoundLowMidVal, woodSoundHighMidVal,1,7);
stoneBezier = new Bezier(400, 550, stoneSoundLowMidVal, stoneSoundHighMidVal,-2,10);
metalBezier = new Bezier(550, 700, metalSoundLowMidVal, metalSoundHighMidVal,3,6);
}
function draw() {
background(0, 0, 0);
fftAcrylicSound.analyze();
acrylicSoundLowMidVal = (int)(fftAcrylicSound.getEnergy("lowMid"));
acrylicSoundHighMidVal = (int)(fftAcrylicSound.getEnergy("highMid"));
fftWoodSound.analyze();
woodSoundLowMidVal = (int)(fftWoodSound.getEnergy("lowMid"));
woodSoundHighMidVal = (int)(fftWoodSound.getEnergy("highMid"));
fftStoneSound.analyze();
stoneSoundLowMidVal = (int)(fftStoneSound.getEnergy("lowMid"));
stoneSoundHighMidVal = (int)(fftStoneSound.getEnergy("highMid"));
fftMetalSound.analyze();
metalSoundLowMidVal = (int)(fftMetalSound.getEnergy("lowMid"));
metalSoundHighMidVal = (int)(fftMetalSound.getEnergy("highMid"));
acrylicBezier.drawBezier();
woodBezier.drawBezier();
stoneBezier.drawBezier();
metalBezier.drawBezier();
}var r;
var x = 0;
var rain_mids;
var analyzer_wood;
var vol_wood;
function setup() {
createCanvas(400, 400);
analyzer_wood = new p5.Amplitude();
analyzer_wood.setInput(rain_mids);
rain_mids.loop();
}
function draw() {
background(0,50);
noFill();
stroke(255);
strokeWeight(2);
vol_wood = analyzer_wood.getLevel();
r = vol_wood * 200;
if(x<100){
x = r++;} else {x = 0;}
ellipse(200,200,x);
}
function preload() {
rain_mids = loadSound('rain-mids.m4a');
}let system;
let angle = 0;
let rain_mids;
let analyzer;
let vol;
let counter = 0;
let v1_r = 100;
function setup() {
createCanvas(640,640);
frameRate(20);
rain_mids.loop();
analyzer = new p5.Amplitude();
analyzer.setInput(rain_mids);
system = new ParticleSystem(
createVector(0.3),
createVector(0,0),
255,
220);   
}
function draw() { 
background(0);
vol = analyzer.getLevel();  
lifepan_ = constrain(vol*650, 0, 100)
var v0 = createVector(width/2, height/2);
var v1 = createVector(v1_r, 0);
for ( var i = 0; i<55; i++ ) { 
drawEllipse(v0, v1.rotate(angle-=0.8));
angle += 0.8;
}
}
function drawEllipse(base, vec) {
push();
translate(base.x, base.y); 
rotate(vec.heading());
translate(vec.mag(), 0);
system.addParticle();
system.run(); 
pop();
fill(220);
noStroke();
ellipse (width/2, height/2,200);
}
function preload() {
rain_mids = loadSound('rain-mids.m4a');
}
function mousePressed() {
if(counter == 0 ) {
rain_mids.amp(0, 0.8);
setTimeout(function volmin() {v1_r=0},500);
counter = 1;} 
else if (counter == 1) {
rain_mids.amp(1, 0.8);
counter = 0;
v1_r = 100;
}
}
var systems = [];
function setup() {
createCanvas(640,360);
}
function draw() {
background(255);
for (i = 0; i < systems.length; i++) {
systems[i].run();
systems[i].addParticle();
}  
}
function mouseDragged() {
this.p = new ParticleSystem(createVector(0.1),createVector(mouseX,mouseY),205);
systems.push(p);
}
var system;
var radius ;
function setup() {
createCanvas(640,360);
system = new ParticleSystem(
createVector(0),
createVector(0,0),
255); 
}
function draw() {
background(255);
push();
translate(width/2,height/2);
rotate(radius);
radius+=0.5;
system.addParticle();
system.run();
pop();
}let current = [];
let previous = [];
let cols;
let rows;
let dampening = 0;
let ellipse_x;
let ellipse_y;
let rain_mids;
let analyzer;
let vol;
let counter = 0;
function setup() {
rain_mids.loop();
analyzer = new p5.Amplitude();
analyzer.setInput(rain_mids);
pixelDensity(1);
createCanvas(400, 400);
cols = width;
rows = height;
for ( let i = 0; i < cols; i++) {
current[i] = [];
previous[i] = [];
for (let j = 0; j < rows; j++) {
current[i][j] = 0;
previous[i][j]= 0;
}
}
}
function mousePressed() {
if(counter == 0 ) {
rain_mids.amp(0, 0.5);
counter = 1;} 
else if (counter == 1) {
rain_mids.amp(1, 0.5);
counter = 0;
}
}
function pulsing() {
previous[width/2][width/2] = 255;
}
function draw() {
background(0);
vol = analyzer.getLevel();
dampening = vol*6.5;
if (dampening < 0.95) {
loadPixels();
setTimeout (pulsing,1000);
waterRipple();
} else {
dampening = 0.95;
loadPixels();
setTimeout (pulsing,1000);
waterRipple();
}
}
function waterRipple() {
for ( let i = 20; i < cols -1; i++) {
for (let j = 20; j < rows - 1; j++) {
current[i][j] = (
previous[i - 1][j] + 
previous[i + 1][j] +
previous[i][j - 1] + 
previous[i][j + 1] +
previous[i - 1][j - 1] + 
previous[i - 1][j + 1] +
previous[i + 1][j - 1] + 
previous[i + 1][j + 1]) / 4 - 
current[i][j];
current[i][j] = current[i][j] * dampening;
let index = (i + j * cols) * 4;
pixels[index + 0] = current[i][j] * 255
pixels[index + 1] = current[i][j] * 255
pixels[index + 2] = current[i][j] * 255
pixels[index + 3] = 255
}
}
updatePixels();  
fill(0);
noStroke();
ellipse (200,200,34);
var temp = previous;
previous = current;
current = temp;
}
function preload() {
rain_mids = loadSound('rain-mids.m4a');
var mic;
function setup() {
createCanvas(200, 200);
mic = new p5.AudioIn();
mic.start();
}
function draw() {
background(0);
let vol = mic.getLevel();
stroke(255);
fill(175);
ellipse(100, 100, 200, 1 + vol * 200);
}var mic;
var p_x,p_x2,p_x3,p_x4;
var p_y,p_y2,p_y3,p_y4;
var c_x,c_x2,c_x3,c_x4;
var c_y,c_y2,c_y3,c_y4;
var alp;
var img;
function setup() {
createCanvas(400, 400);
mic = new p5.AudioIn();
mic.start();
}
function draw() {
let vol = mic.getLevel();
alp = vol*400;
background(255);
noStroke();
fill(200,100,100);
c_x = 150*vol;
c_y = height-150*vol;
p_x = 100;
p_y = 0;
if(c_x<=p_x) {
image(img,c_x, c_y, 300,300);
} else {
strokeWeight(10);
stroke(0);
fill(255,0,0,150);
image(img,p_x, p_y, 300,300);
rect(p_x, p_y, 300,300);
}
c_x2 = width-600*vol;
c_y2 = 600*vol;
p_x2 = 0;
p_y2 = 300;
if(c_x2>=p_x2) {  
image(img,c_x2, c_y2, 100,100);
} else {
strokeWeight(10);
stroke(0);
fill(0,0,255,100);
image(img,p_x2, p_y2, 100,100);
rect(p_x2, p_y2, 100,100);
}
c_x3 = 400*vol;
c_y3 = 400*vol;
p_x3 = 350;
p_y3 = 300;
if(c_x3<=p_x3) {  
image(img,c_x3, c_y3, 50,100);
} else {
strokeWeight(10);
stroke(0);
fill(255,255,0,100);
image(img,p_x3, p_y3, 50,100);
rect(p_x3, p_y3, 50,100);
}
c_x4 = width-600*vol;
c_y4 = height-600*vol;
p_x4 = 0;
p_y4 = 0;
if(c_x4>=p_x4) {  
image(img,c_x4, c_y4, 100,150);
} else {
strokeWeight(10);
stroke(0);
fill(255,255,255,230);
image(img,p_x4, p_y4, 100,150);
rect(p_x4, p_y4, 100,150);
}
}
function preload() {
img = loadImage('nyt.jpg');
}var rain_noise;
var rain_bass;
var rain_mids;
var rain_treble;
var rain_drum;
var button1,button2,button3,button4;
var playing = true;
var playing_drum = false;
var col_rect = 255;
var slider1,slider2,slider3,slider4;
function setup() {
createCanvas(400, 400);
rain_noise = new p5.Noise();
rain_noise.setType('brown');
rain_noise.start();
rain_bass.loop();
rain_mids.loop();
rain_treble.loop();
rain_drum.amp(0);
rain_drum.loop();
}
function draw() {
background(255);
slider_bg();
drawSlider1();
drawSlider2();
drawSlider3();
drawSlider4();
button1 = map (slider_y,400/9*7,400/9*2,0,0.5);
button2 = map (slider_y2,400/9*6.5,400/9*2.5,0,0.5);
button3 = map (slider_y3,400/9*6,400/9*3,0,0.5);
button4 = map (slider_y4,400/9*5.5,400/9*3.5,0,0.5);
if(playing) {
rain_treble.amp(button3);
rain_mids.amp(button2);
rain_bass.amp(button1);
rain_noise.amp(button4);
}
if(playing_drum) {
rain_drum.amp(0.2);
}
fill(col_rect);
push();
rectMode(CENTER);
translate(400/9*8,400/9*4.5);
rotate(PI/4);
rect(0,0,26,26);
pop();
fill(130);
ellipse(400/9,400/9*8,26,26);
ellipse(400/9,400/9,26,26);
}
function mouseClicked() {
if (mouseX > 400/9 - 26 && mouseX < 400/9 + 26 && mouseY < 400/9+26 && mouseY > 400/9 -26) {
slider_y = 400/9*7;
slider_y2 = 400/9*6.5;
slider_y3 = 400/9*6;
slider_y4 = 400/9*5.5; 
rain_drum.amp(0,0.2);
playing_drum = false;
col_rect = 255;
}
if (mouseX > 400/9 - 26 && mouseX < 400/9 + 26 && mouseY < 400/9*8+26 && mouseY > 400/9*8 -26) {
if (playing || playing_drum){
playing = false;
playing_drum = false;
rain_treble.amp(0,0.5);
rain_mids.amp(0,0.5);
rain_bass.amp(0,0.5);
rain_noise.amp(0,0.5);
rain_drum.amp(0,0.5); col_rect = 255;
} else {
playing = true;
playing_drum = true; col_rect = 130;
}
}
if (mouseX > 400/9*8 - 26 && mouseX < 400/9*8 + 26 && mouseY < 400/9*4.5+26 && mouseY > 400/9*4.5 -26) {
if (!playing_drum){
playing_drum = true;
rain_drum.amp(0.2,0.05);
col_rect = 130;
} else {
rain_drum.amp(0,0.5);  
playing_drum = false;
col_rect = 255;
}
}
}
function preload() {
rain_bass = loadSound('rain-bass.m4a');
rain_mids = loadSound('rain-mids.m4a');
rain_treble = loadSound('rain-treble.m4a');
rain_drum = loadSound('drum.m4a');
}
function slider_bg() {
fill(255);
noStroke();
rect(0,0,400,400);
noFill();
stroke(130);
strokeWeight(1.5);
rect(400/9,400/9,400/9*7,400/9*7);
fill(255);
noStroke();
rect(-3,400/9*1.8,400/9*7,400/9*5.4);
fill(255);
stroke(130);
strokeWeight(2);
rect(-3,400/9*2,400/9*7,400/9*5);
rect(-3,400/9*2.5,400/9*6,400/9*4);
rect(-3,400/9*3,400/9*5,400/9*3);
rect(-3,400/9*3.5,400/9*4,400/9*2);
noFill();
stroke(130);
strokeWeight(1.5);
line(400/9,400/9*3.8,400/9,400/9*5.3)
stroke(130);
strokeWeight(2);
line(400/9*7-7,400/9*2,400/9*7-7,400/9*7);
line(400/9*7-11,400/9*2,400/9*7-11,400/9*7);
line(400/9*7-15,400/9*2,400/9*7-15,400/9*7);
line(400/9*7-19,400/9*2,400/9*7-19,400/9*7);
line(400/9*6-7,400/9*2.5,400/9*6-7,400/9*6.5);
line(400/9*6-11,400/9*2.5,400/9*6-11,400/9*6.5);
line(400/9*6-15,400/9*2.5,400/9*6-15,400/9*6.5);
line(400/9*6-19,400/9*2.5,400/9*6-19,400/9*6.5);
line(400/9*5-7,400/9*3,400/9*5-7,400/9*6);
line(400/9*5-11,400/9*3,400/9*5-11,400/9*6);
line(400/9*5-15,400/9*3,400/9*5-15,400/9*6);
line(400/9*5-19,400/9*3,400/9*5-19,400/9*6);
line(400/9*4-7,400/9*3.5,400/9*4-7,400/9*5.5);
line(400/9*4-11,400/9*3.5,400/9*4-11,400/9*5.5);
line(400/9*4-15,400/9*3.5,400/9*4-15,400/9*5.5);
line(400/9*4-19,400/9*3.5,400/9*4-19,400/9*5.5);
}
var query_date = 'date='
var query_time = '&time=';
var date_year = 2018;
var date_month = 12;
var date_day;
var time_h = 11;
var time_m = 30;
var url;
var col;
var slider;
function setup() {
noCanvas();
slider = createSlider(1, 30, 1);
slider.position(10, 10);
slider.style('width', '80px');
}
function gotImg() {
createImg(url);
}
function draw() {
loadJSON (url,gotImg);
url = api + query_date + date_month + '/' + date_day + '/' + date_year + query_time + time_h + ':' + time_m;
date_day = floor(slider.value());
console.log(url);
}
var canvas;
var angle1 = 0;
var angle2 = 0;
var tracksOffset;
var resizeImgW = 0;
var resizeImgH = 0;
var tracks = [];
var circles = [];
function preload() {
imgEarth = loadImage("planets/Earth.png");
imgNeptune = loadImage("planets/Neptune.png");
imgJupiter = loadImage("planets/Jupiter.png");
imgMars = loadImage("planets/Mars.png");
imgMercury = loadImage("planets/Mercury.png");
imgPluto = loadImage("planets/Pluto.png");
imgSaturn = loadImage("planets/Saturn.png");
imgSky = loadImage("planets/sky2.jpg");
imgSun = loadImage("planets/Sun.png");
imgVenus = loadImage("planets/Venus.png");
imgUranus = loadImage("planets/Uranus.png");
}
function setup() {
canvas = createCanvas(windowWidth, windowHeight);
canvas.position(0, 0);
}
function windowResized() {
resizeCanvas (windowWidth, windowHeight);
}
function draw() {
var resizeImgW = 0;
var resizeImgH = 0;
resizeImgW = resizeImgS(1920, 1080, width, height)[0];
resizeImgH = resizeImgS(1920, 1080, width, height)[1];
imageMode(CORNER);
image(imgSky, 0, 0,  resizeImgW,  resizeImgH);
resizeImgW = resizeImgS(1042, 1042, width*0.07, height*0.07)[0];
resizeImgH = resizeImgS(1042, 1042, width*0.07, height*0.07)[1];
imageMode(CENTER);
image(imgSun, width/2, height/2,  resizeImgW,  resizeImgH);
for (i = 1; i <= 8; i++) {
drawTracks (i);
}
v0 = createVector(width/2, height/2);
v1 = createVector(1000 * tracksOffset * 1, 0);
drawPlanet(v0, v1.rotate(angle1), imgMercury, 888, 888, 0.02);
angle1 += 0.01;
v0 = createVector(width/2, height/2);
v1 = createVector(1000 * tracksOffset * 1.5, 0);
var x = mousePressed();
if (x) {
drawPlanet(v0, v1.rotate(angle2), imgVenus, 938, 938, 0.02);
angle2 += 0.01;
}
var cirX = 100;
var cirY = 100;
fill(200,100,100);
ellipse (cirX,cirY,30,30);
let d = dist (mouseX, mouseY,cirX,cirY);
if (mouseIsPressed && dist < 100) {
circles = ellipse (mouseX,mouseY,100,100);}
}
function mousePressed() {
if ((mouseX-width/2) * (mouseX-width/2) + (mouseY-height/2) * (mouseY-height/2) <= 1.5 * 1.5 * 1000 * tracksOffset *1000 * tracksOffset) {
return (true);
} else {
return (false);
}
}
function drawTracks (num){
resizeImgW = resizeImgS(1042, 1042, width*0.07, height*0.07)[0];
resizeImgH = resizeImgS(1042, 1042, width*0.07, height*0.07)[1];
tracksOffset = resizeImgS(1042, 1042, width*0.07, height*0.07)[2];
noFill();
stroke(255,50);
ellipse(width/2, height/2, resizeImgW + num * 1000 * tracksOffset, resizeImgH + num * 1000 * tracksOffset);
}
function drawPlanet(base, vec, myImg,imgW,imgH, sca) {
push();
translate(base.x, base.y);
rotate(vec.heading());
resizeImgW = resizeImgS(imgW, imgH, width*sca, height*sca)[0];
resizeImgH = resizeImgS(imgW, imgH, width*sca, height*sca)[1];
image(myImg, vec.x, vec.y, resizeImgW, resizeImgH);
pop();
}
function resizeImgL(imgW, imgH, currentW, currentH) {
var ratio = 0;
if (imgW / imgH >= currentW / currentH) {
ratio = currentW / imgW;
return ([imgW * ratio, imgH * ratio, ratio]);
} else if (imgW / imgH < currentW / currentH) {
ratio = currentH / imgH;
return ([imgW * ratio, imgH * ratio, ratio]);
}
}
function resizeImgS(imgW, imgH, currentW, currentH) {
var ratio = 0;
if (imgW / imgH >= currentW / currentH) {
ratio = currentH / imgH;
return ([imgW * ratio, imgH * ratio, ratio]);
} else if (imgW / imgH < currentW / currentH) {
ratio = currentW / imgW;
return ([imgW * ratio, imgH * ratio, ratio]);
}
let portName = "/dev/cu.usbmodem132";
function setup() {
createCanvas(600, 600);
setInterval(function() {
console.log("HELLO");
}, 1000);
noFill();
strokeWeight(10);
}
function gotData() {
}
function draw() {
background(127, 0, 127);
var v = map(latestData,0,190,600,0); 
ellipse(width*0.4, height*0.4, v*0.25 + 10, v*0.25 + 10);
ellipse(width*0.6, height*0.4, (2500/v) + 10, (2500/v) + 10);
bezier(width*0.3, v*0.6 + height/2, width*0.4, height*0.8, width*0.6, height*0.8, width*0.7, v*0.55 + height/2);
v+=random(-5, 5);
bezier(width*0.5, height*0.5, v*0.6, height*0.6, v*0.6, height*0.8, width*0.45, height*0.67);
createCanvas(400, 400);
}
function draw() {
background(220);
var inData;
function setup() {
createCanvas(400, 300);
}
function draw() {
background(0);
fill(255);
text("sensor value: " + inData, 30, 30);
}
function serverConnected() {
}
function portOpen() {
}
}
}
function portClose() {
function setup() {
}
for (var i = 0; i <= portList.length; i++) {
}
let video;
let poseNet;
let poses = [];
let mouseWidth = 0, mouseHeight = 0;
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
background (220);
drawKeypoints();
}
function drawKeypoints()  {
for (let i = 0; i < poses.length; i++) {
let pose = poses[i].pose;
let nose;
let leftEye;
let rightEye;
let leftShoulder;
let rightShoulder;
for (let j = 0; j < pose.keypoints.length; j++) {
let keypoint = pose.keypoints[j];
if (keypoint.score > 0.2) {
switch (j) {
case 0:
nose = keypoint;
break;
case 1:
leftEye = keypoint;
break;
case 2:
rightEye = keypoint;
break;
case 5:
leftShoulder = keypoint;
break;
case 6:
rightShoulder = keypoint;
break;
}
if (nose && leftShoulder && rightShoulder) {
fill(206,122,33);
noStroke();
beginShape();
curveVertex(rightShoulder.position.x ,rightShoulder.position.y);
curveVertex(rightShoulder.position.x ,rightShoulder.position.y);
curveVertex(nose.position.x - 100 ,nose.position.y - 110);
curveVertex(nose.position.x + 80 ,nose.position.y - 110);
curveVertex(leftShoulder.position.x ,leftShoulder.position.y);
curveVertex(leftShoulder.position.x,leftShoulder.position.y);
endShape();
fill(238,179,72);
beginShape();
curveVertex(rightShoulder.position.x + 30,rightShoulder.position.y);
curveVertex(rightShoulder.position.x + 30,rightShoulder.position.y);
curveVertex(nose.position.x - 80 ,nose.position.y - 110);
curveVertex(nose.position.x + 80 ,nose.position.y - 110);
curveVertex(leftShoulder.position.x ,leftShoulder.position.y);
curveVertex(leftShoulder.position.x,leftShoulder.position.y);
endShape();
noFill();
stroke(0);
strokeWeight(3);
arc(nose.position.x ,nose.position.y, 30 + mouseWidth, 20 + mouseHeight, 0, PI);
mouseWidth +=0.5; mouseHeight-= 0.01;
if (mouseWidth >= 55) {
mouseWidth = 0;
mouseHeight = 0;
} 
}
}
else if (nose && !leftShoulder && !rightShoulder) {
drawShoulder(nose.position.x ,nose.position.y);
noFill();
stroke(0);
strokeWeight(3);
arc(nose.position.x ,nose.position.y, 30 + mouseWidth, 20 + mouseHeight, 0, PI);
mouseWidth +=0.5; mouseHeight-= 0.01;
if (mouseWidth >= 55) {
mouseWidth = 0;
mouseHeight = 0;
}
}  
if (leftEye) {
fill(255);
noStroke();  
ellipse(leftEye.position.x, leftEye.position.y, 30, 30);
fill(0);
ellipse(leftEye.position.x, leftEye.position.y, 10, 13);
rect (leftEye.position.x - 10, leftEye.position.y - 40, 15, 3);
}
if (rightEye) {
fill(255);
noStroke();  
ellipse(rightEye.position.x, rightEye.position.y, 30, 30);
fill(0);
ellipse(rightEye.position.x, rightEye.position.y, 10, 13);
rect (rightEye.position.x - 10, rightEye.position.y - 40, 15, 3);
}
}
}
}
function drawShoulder(x,y) {
this.x = x;
this.y = y;
fill(206,122,33);
noStroke();
beginShape();
curveVertex(this.x - 150  ,this.y + 150);
curveVertex(this.x - 150,this.y + 150);
curveVertex(this.x - 100 ,this.y - 110);
curveVertex(this.x + 80 ,this.y - 110);
curveVertex(this.x + 150 ,this.y + 150);
curveVertex(this.x + 150 ,this.y + 150);
endShape();
fill(238,179,72);
beginShape();
curveVertex(this.x - 130,this.y + 150);
curveVertex(this.x - 130,this.y +150);
curveVertex(this.x - 80 ,this.y - 110);
curveVertex(this.x + 80 ,this.y - 110);
curveVertex(this.x + 150 ,this.y + 150);
curveVertex(this.x + 150,this.y + 150);
endShape();
}
function drawSkeleton() {
for (let i = 0; i < poses.length; i++) {
let skeleton = poses[i].skeleton;
for (let j = 0; j < skeleton.length; j++) {
let partA = skeleton[j][0];
let partB = skeleton[j][1];
stroke(0);
line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
}
}
}let balls = [];
let i;
function setup() {
createCanvas(600, 600);
for (i = 0 ; i<100; i++) {
let ball = new Balls(random(0,width),random(0,height),random(10,20),random(-2,2),random(-2,2),random(0,150));
balls.push(ball);
}
}
function draw() {
background(220);
for (i = 0; i < balls.length; i++) {
balls[i].createBall();
balls[i].moveBall(); }
for (i = 0; i < balls.length; i++) {
for (j = i+1; j < balls.length; j++) {
if (balls[i].collideBall(balls[j])) {
balls.splice(j,1);
balls.splice(i,1)
}
}
}
}let balls = [];
let d;
function setup() {
createCanvas(600, 600);
for (i = 0; i < 100; i++) {
let ball = new Balls(random(0,width),random(0,height),random(10,20),random(-1,1),random(-1,1),random(0,170));
balls.push(ball);
}
}
function draw() {
background(220);
for (i = 0; i < balls.length; i++) {
balls[i].createBall();
balls[i].moveBall();
hover();
}
}
function hover() {
for (let i = balls.length - 1; i >= 0; i--) {
if(balls[i].hoverBall(mouseX,mouseY)) {
balls.splice(i,1);
}
}
}let balls = []
let i;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
for ( i = 0; i < balls.length; i++) {
balls[i].createBall();
balls[i].moveBall();
}
}
function mousePressed() {
this.b = new Balls(mouseX,mouseY,random(10,30),random(-3,3),random(-3,3),random(0,155));
balls.push(b);
}class Balls {
constructor (_x,_y,_r,_xspeed,_yspeed,_col) {
this.x = _x;
this.y = _y;
this.r = _r;
this.xspeed = _xspeed;
this.yspeed = _yspeed;
this.col = _col;
}
createBall() {
fill(this.col);
noStroke();
ellipse (this.x,this.y,this.r*2,this.r*2);
}
moveBall() {
this.x = this.x+ this.xspeed;
this.y = this.y+ this.yspeed;
if (this.x >= width || this.x <= 0) {
this.xspeed = this.xspeed*-1;
}
if (this.y <= 0 || this.y >= height) {
this.yspeed = this.yspeed*-1;
}
}
}let a,b,c;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
add(10,20);
display();
}
function add(a,b) {
c = a + b;
}
function display() {
textStyle(BOLD);
textSize(18);
text(c,width/2,height/2);
noLoop();
}let ball = {
x: 100,
y: 100,
d: 25,
xspeed: 1,
yspeed: 2
}
let beachBall = {
x: 50,
y: 50,
d: 50,
xspeed: 1,
yspeed: 1
}
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
displayBall(ball);
displayBall(beachBall);
moveBall(ball);
moveBall(beachBall);
bounceBall(ball);
bounceBall(beachBall);
}
function displayBall(whichBall) {
ellipse(whichBall.x, whichBall.y, whichBall.d, whichBall.d); 
}
function moveBall(whichBall) {
whichBall.x = whichBall.x + whichBall.xspeed;
whichBall.y = whichBall.y + whichBall.yspeed;
}
function bounceBall(whichBall) {
if (whichBall.x <= 0 || whichBall.x >= width) {
whichBall.xspeed = whichBall.xspeed * -1;  
}
if (whichBall.y <= 0 || whichBall.y >= height) {
whichBall.yspeed = whichBall.yspeed * -1; 
}
}
let stars = [];
let i;
let bullets = [];
let meteorites = {x:200,y:0,r:50};
let counter = 0;
let d;
let count = 0;
let count2 = 0;
function setup() {
createCanvas(900, 600);
}
function draw() {
background(20,35,50,160);
let s = new Star(random (0,width), random (0,height/2), random (2,4), random (2,7), 5, 250, 250, 200);
for (i = 0; i < random(3); i+=1) {
stars.push(s);}
for (let star of stars) {
star.moveStar();
star.createStar();
}
astro();
spaceShip();
let p = new Bullet(mouseX,mouseY);
bullets.push(p);
for (let bullet of bullets) {
bullet.moveBullet();
bullet.createBullet();
}
}
class Star {
constructor(_x,_y,_r1,_r2,_npoints,_colr,_colg,_colb) {
this.x = _x;
this.y = _y;
this.r1 = _r1;
this.r2 = _r2;
this.npoints = _npoints;
this.colr = _colr;
this.colg = _colg;
this.colb = _colb;
this.sx = 0;
this.sy = 0;
this.angle = TWO_PI / _npoints;
this.halfAngle = TWO_PI / _npoints / 2;
}
createStar() {
noStroke();
fill(this.colr,this.colg,this.colb);
beginShape();
for (let j = 0; j < TWO_PI; j += this.angle) {
this.sx = this.x + cos(j) * this.r2;
this.sy = this.y + sin(j) * this.r2;
vertex(this.sx, this.sy);
this.sx = this.x + cos(j+this.halfAngle) * this.r1;
this.sy = this.y + sin(j+this.halfAngle) * this.r1;
vertex(this.sx, this.sy);
}
endShape(CLOSE);
}
moveStar() {
this.y += pow(this.r1, 0.9);
if (this.y > height) {
let index = stars.indexOf(this);
stars.splice(index, 1);
}
} 
} 
class Bullet {
constructor (_x,_y) {
this.x = _x;
this.y = _y;
}
createBullet() {
fill(155, 200, 200);
noStroke();
rect(this.x,this.y-80,3,50);
}
moveBullet() {
this.y = this.y - 20;
}
}
function astro(x,y,r) {
noStroke();
fill(200);
meteorites.y += pow(meteorites.r, 0.2);
if(meteorites.y >= height) {
counter = 0;
meteorites.y = 0;
meteorites.x = random(40,width-40);
meteorites.r = random(40,70);
}
if (meteorites.y <= mouseY && meteorites.x <= mouseX + meteorites.r && meteorites.x >= mouseX - meteorites.r) {
counter++;}
if (counter >=140) {
count2 = count2 + 1;
if (count2 == 1) {
count = count + 1}
} else {
count2 = 0;}
if (counter >= 50 && counter <= 110) {
fill(random(150,200));
ellipse (meteorites.x,meteorites.y,meteorites.r);
fill(200,100,100);
ellipse (meteorites.x-9,meteorites.y-6,meteorites.r/5);
ellipse (meteorites.x-7,meteorites.y+7,meteorites.r/6);
ellipse (meteorites.x+10,meteorites.y+3,meteorites.r/7);
} else if (counter < 50) {
fill(220);
ellipse (meteorites.x,meteorites.y,meteorites.r);
fill(180);
ellipse (meteorites.x-9,meteorites.y-6,meteorites.r/5);
ellipse (meteorites.x-7,meteorites.y+7,meteorites.r/6);
ellipse (meteorites.x+10,meteorites.y+3,meteorites.r/7); }
textSize(18);
fill(255);
textStyle(BOLD);
text ("You got:", width - 200, 50);
fill(100,200,200);
text (count, width - 115, 50);
fill(255);
text ("points", width - 80, 50);
}
function mouseDragged() {
stars.push(new Star(mouseX,mouseY,random (4,6), random (7,12), 5, 155, 200, 200));
} 
function spaceShip() {
beginShape();
fill(205,60,60);
curveVertex(mouseX+15, mouseY-33);
curveVertex(mouseX+15, mouseY-33);
curveVertex(mouseX, mouseY-50);
curveVertex(mouseX-15, mouseY-33);
curveVertex(mouseX-15, mouseY-33);
endShape();
fill(220);
rectMode(CENTER);
rect (mouseX,mouseY,30,60);
fill(0);
ellipse (mouseX,mouseY-15,15,15);
fill(205,60,60);
ellipse (mouseX,mouseY-15,10,10);
fill(250,150,10);
triangle(mouseX-15,mouseY+35,mouseX-20,mouseY+50,mouseX-5,mouseY+35);
triangle(mouseX+15,mouseY+35,mouseX+20,mouseY+50,mouseX+5,mouseY+35)
}let ball1;
let ball2;
function setup() {
createCanvas(400, 400);
ball1 = new Balls(200,200,27,7,5,50);
ball2 = new Balls(100,300,17,3,2,250);
}
function draw() {
background(220);
ball1.createBall();
ball1.moveBall();
ball2.createBall();
ball2.moveBall();
}
class Balls {
constructor (_x,_y,_r,_xspeed,_yspeed,_col) {
this.x = _x;
this.y = _y;
this.r = _r;
this.xspeed = _xspeed;
this.yspeed = _yspeed;
this.col = _col;
}
createBall() {
fill(this.col);
noStroke();
ellipse (this.x,this.y,this.r*2,this.r*2);
}
moveBall() {
this.x = this.x+ this.xspeed;
this.y = this.y+ this.yspeed;
if (this.x >= width || this.x <= 0) {
this.xspeed = this.xspeed*-1;
}
if (this.y <= 0 || this.y >= height) {
this.yspeed = this.yspeed*-1;
}
}
}let ball = {
x:200,
y:200, 
r:27,
xspeed:7,
yspeed:5
}
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
createBall();
moveBall();
}
function mousePresssed() {
ball.x = mouseX;
ball.y = mouseY;
}
function createBall(x,y,r) {
fill(200,100,100);
noStroke();
ellipse (ball.x,ball.y,ball.r,ball.r);
}
function moveBall(){
ball.x = ball.x+ball.xspeed;
ball.y = ball.y+ball.yspeed;
if (ball.x >= width || ball.x <= 0) {
ball.xspeed = ball.xspeed*-1;
}
if (ball.y <= 0 || ball.y >= height) {
ball.yspeed = ball.yspeed*-1;
}
}let x,y;
let fillCol, alp;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
drawGrid();
changeCol()
}
function drawGrid() {
stroke(255);
noFill();
for (let i = 0; i < 10; i++) {
for (let j = 0; j < 5; j++) {
x = 0 + i*width/10;
y = 0 + j*height/5;
rect(x,y,width/10,height/5);
}
}
}
function changeCol() {
fillCol = map (mouseX,0, width,0,255);
alp = map (mouseY,0,height,150,255);
for (let i = 0; i < 10; i++) {
for (let j = 0; j < 5; j++) {
x = 0 + i*width/10;
y = 0 + j*height/5;
if (mouseX > x && mouseX < x +width/10 && mouseY > y && mouseY < y+height/5) {
fill (fillCol,alp);
rect(x,y,width/10,height/5);} else {noFill();}
}
}
}let xMove;
let yMove;
let pointX = [];
let pointY = [];
let r,g,b,strokeCol;
let D,d;
let x;
let y;
let w;
let dragging = false;
let sliderStart;
let sliderEnd;
function setup() {
createCanvas(600, 600);
x = 50;
y = height - 20;
w = 10;
sliderStart = 50;
sliderEnd = width - 50;
}
function draw() {
r = map(mouseX,0,width,200,100);
b = map(mouseX,0,width,100,20);
g = map(mouseY,0,height,100,20);
backCol = map(mouseX,0,width,0,255);
strokeCol = map(mouseX,0,width,255,0);
background(r,g,b);
stroke(255);
linePoints();
slider();
}
function linePoints() {
length = width/8;
xMove = map(mouseX,0,width,0,length);
yMove = map(mouseY,0,height,0,length);
for (i = 0; i <= 8; i++) {
for (let j = 0; j <= 8; j++) {
pointX[i] = i * length;
pointY[i] = i * length;
pointX[j] = j * length;
pointY[j] = j * length;
d = dist(pointX[i]+xMove,pointX[j]+yMove,mouseX,mouseY);
strokeWeight(2);
line (pointX[i]+xMove,pointX[j]+yMove,pointY[i+1],pointY[j]);
line (pointX[i]+xMove,pointX[j]+yMove,pointY[i],pointY[j+1]);
if(d<D){
if(d<D/2){
push();
strokeWeight(5);
stroke(r,g,b);
line (pointX[i]+xMove,pointX[j]+yMove,pointY[i+1],pointY[j]);
line (pointX[i]+xMove,pointX[j]+yMove,pointY[i],pointY[j+1]);
strokeWeight(18);
stroke(255);
point(pointX[i]+xMove,pointX[j]+yMove,pointY[i]+xMove,pointY[j]+yMove)
pop();
}else{
push();
strokeWeight(2);
stroke(255);
line (pointX[i]+xMove,pointX[j]+yMove,pointY[i+1],pointY[j]);
line (pointX[i]+xMove,pointX[j]+yMove,pointY[i],pointY[j+1]);
strokeWeight(10);
point(pointX[i]+xMove,pointX[j]+yMove,pointY[i]+xMove,pointY[j]+yMove);
pop();
}
}
}
}
}
function slider(){
if (dragging) {
x = mouseX ;
}
x = constrain(x, sliderStart, sliderEnd);
if (dragging) {
fill (0,170,238);
} else {
fill(248,231,28);
}
stroke(255);
line(sliderStart,y, sliderEnd, y);
ellipse(x,y,1.5*w,1.5*w);
D = map (x,sliderStart,sliderEnd-w,40,180);
}
function mousePressed() {
if (mouseX > x-w && mouseX < x + w && mouseY > y-w && mouseY < y + w) {
dragging = true;
}
}
function mouseReleased() {
dragging = false;
}
let lineA = {x:0,y:0};
let num = 8;
let space;
let i;
let points = [];
function setup() {
createCanvas(400, 400);
space = width/num;
for (i=0; i< num - 1; i++) {
lineA.x = random(space/2 + i*space, space/2 + space+ i*space);
lineA.y = 0;
points[i] = point(lineA.x, lineA.y);}
}
function draw() {
background(220);
outline();
drawPoint();
}
function outline() {
strokeWeight(10);
for (i = 0; i <= num+1; i++) {
point (0,space*(i-1));
point (width,space*(i-1));
point (space*(i-1),0);
point (space*(i-1),height);
}
}  
function drawPoint() {
strokeWeight(10);
for (i=0; i< num - 1; i++) {
for (j=0; j< num - 1; j++) {
lineA.x = random(space/2 + i*space, space/2 + space+ i*space);
lineA.y = random(space/2 + j*space, space/2 + space+ j*space);
point(lineA.x, lineA.y);
}noLoop();
} 
}
let pA = [];
let pB = [];
let pC = [];
let i;
let q;
let xA;
let yA;
let num=4;
function setup() {
createCanvas(200, 200);
for (i=1; i<num; i++) {
xA = random (i*width/num-width/num+width/num/2,i*width/num+width/num/2);
yA = random (0,height/num);
pA[0] = createVector(0,0);
pA[4] = createVector(width,0);
pA[i] = createVector(xA,0);
}
}
function draw() {
background(220);
noStroke();
strokeWeight(1);
strokeWeight(1);
for (i=0; i<num+1; i++) {
point(pA[i].x,pA[i].y);
point(pB[i].x,pB[i].y);
}
for (i=0; i<5; i++) {
triangle(pA[i].x,pA[i].y,pA[i+1].x,pA[i+1].y,pB[i].x,pB[i].y);
triangle(pB[i].x,pB[i].y,pB[i+1].x,pB[i+1].y,pC[i].x,pC[i].y);
}
let i,x;
let area;
let length;
let trans;
let dir;
let stay = false;
let light = false;
function setup() {
createCanvas(400, 400);
area = 3;
length = width / area;
}
function draw() {
background(200);
stroke(255);
challenge();
for(i = 0; i < area; i++) {
x = i * length;
if (mouseX > x && mouseX < x+length) {
dir = 1;
} 
else {
dir = 0;   
}
trans = dir * 255;
fill(200,100,100,trans)
rect (x,0,length,height);
}
}
function mousePressed() {
for(i = 0; i < area; i++) {
x = i * length;
if (mouseX > 400/3*2 && mouseX < x+length) {
stay = !stay;
light = !light;
}
}
}
function challenge() {
if(light) {
dir =1;
trans = dir * 255;
fill(200,100,100,trans)
rect (x,0,length,height);} 
if (mouseX < x || mouseX > x+length && stay) {
stay = false;}
if (mouseX > x && mouseX < x+length && !stay) {
light = false;
}
}
let i;
let x1=0,y1=0,x2=0,y2=0;
let length;
let lineNum = 0;
function setup() {
createCanvas(400, 400);
background(255);
}
function draw() {
noStroke();
length = width /10;
for (i = 0; i < 10; i++) {
for (lineNum = 0; lineNum <10; lineNum++) {
if (lineNum%2 == 1) {
fill(0);
x1 = (i + lineNum) * length;
y1 = i * length;
rect(x1,y1,length,length);
x2 = i * length;
y2 = (i + lineNum) * length;
rect(x2,y2,length,length);
}
}
}
}let i,x;
let area;
let length;
let trans;
let dir;
function setup() {
createCanvas(400, 400);
area = 3;
length = width / area;
}
function draw() {
background(200);
stroke(255);
for(i = 0; i < area; i++) {
x = i * length;
if (mouseX > x && mouseX < x+length) {
dir = 1;
} 
else {
dir = 0;   
}
trans = dir * 255;
fill(200,100,100,trans)
rect (x,0,length,height);
}
}
function mousePressed() {
if (trans == 0) {
dir = 1;
} else {
dir = 0;
}
trans = dir * 255;
fill(200,100,100,trans)
rect (x,0,length,height);
}let i;
let x,y;
let length;
function setup() {
createCanvas(400, 400);
background(200);
}
function draw() {
stroke(255);
length = width /10;
noFill();
for (i = 0; i < 10; i++) {
x = i * length;
y = i * length;
line (x,0,x,height);
line (0,y,width,y);
}
}let i,x;
let area;
let length;
function setup() {
createCanvas(400, 400);
area = 10;
length = width / area;
}
function draw() {
background(200);
stroke(255);
for(i = 0; i < area; i++) {
x = i * length;
if (mouseX > x && mouseX < x+length) {
fill(200 + i*7,100 + i*17,100 + i*17);
} 
else {
noFill(); 
}
rect (x,0,length,height);
}
}
let i,x;
let area;
let length;
function setup() {
createCanvas(400, 400);
area = 10;
length = width / area;
}
function draw() {
background(200);
stroke(255);
for(i = 0; i < area; i++) {
x = i * length;
if (mouseX > x && mouseX < x+length && i < 5) {
fill(200,100,100);
} else if (mouseX > x && mouseX < x+length && i >= 5) {
fill(50,50,100);
}
else {
noFill(); 
}
rect (x,0,length,height);
}
}
let i,x;
let area;
let length;
function setup() {
createCanvas(400, 400);
area = 10;
length = width / area;
}
function draw() {
background(200);
stroke(255);
for(i = 0; i < area; i++) {
x = i * length;
if (mouseX > x && mouseX < x+length && i%2 == 0) {
fill(200,100,100);
} else if (mouseX > x && mouseX < x+length && i%2 == 1) {
fill(50,50,100);
}
else {
noFill(); 
}
rect (x,0,length,height);
}
}
let i,x;
let area;
let length;
function setup() {
createCanvas(400, 400);
area = 10;
length = width / area;
}
function draw() {
background(200);
stroke(255);
for(i = 0; i < area; i++) {
x = i * length;
if (mouseX > x && mouseX < x+length && i != 6) {
fill(200,100,100);
} else {
noFill(); 
}
rect (x,0,length,height);
}
}
let i,x;
let area;
let length;
let trans;
let dir;
function setup() {
createCanvas(400, 400);
area = 3;
length = width / area;
}
function draw() {
background(200);
stroke(255);
for(i = 0; i < area; i++) {
x = i * length;
if (mouseX > x && mouseX < x+length) {
dir = 1;
} else {
dir = 0;   
}
trans = dir * 255;
fill(200,100,100,trans)
rect (x,0,length,height);
}
}
function stayred() {
dir = 1;}
let i,x;
let area;
let length;
function setup() {
createCanvas(400, 400);
area = 10;
length = width / area;
}
function draw() {
background(200);
stroke(255);
for(i = 0; i < area; i++) {
x = i * length;
if (mouseX > x && mouseX < x+length) {
fill(200,100,100);
} else {
noFill(); 
}
rect (x,0,length,height);
}
}
let i,x;
let area;
let length;
function setup() {
createCanvas(400, 400);
area = 3;
length = width / area;
}
function draw() {
background(200);
stroke(255);
for(i = 0; i < area; i++) {
x = i * length;
if (mouseX > x && mouseX < x+length) {
fill(200,100,100);
} else {
noFill(); 
}
rect (x,0,length,height);
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
if (true){
let x = 10;
}
ellipse(x,10,20,20);
}
createCanvas(600, 500);
}
function draw() {
background(33,255,255);
noStroke();
push();
rotate(-PI / 3.6);
fill(255,0,0);
rect(-20,0,30,800);
pop();
fill(0,205,10);
ellipse(width/2,height/2,300,200);
fill(0,0,150);
rectMode(CORNERS);
rect(450,250,400,200);
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(230);
fill(21,169,155);
noStroke();
ellipse(200,200,150,150);
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
}let angle = 0;
let scalar = 100;
let rabbit = {x:0, y:0};
let mouth = {x:0, y:0};
let ears = {x:20,y:40};
let eyemove;
let mouthmove;
let eye = {w:10, h:10};
let carrot = {x:0, y:0};
let a = 15;
let star = {x:270, y:150};
let count = 0;
let counter = 0;
function setup() {
createCanvas(400, 400);
rabbit.x = width/2;
rabbit.y = height/2;
mouth.x = width/2;
mouth.y = height/2; 
}
function draw() {
background(230);
translate(0,-30);
movingball();
rabbitface();
carrotmouse();
carrotCount();
carrotIcon();
carrot.x = mouseX;
carrot.y = mouseY;
if(mouseIsPressed){
drawStar();
star.x = 270;
star.y = 150;}
}
function movingball() {
noStroke();
let ang = radians(angle);
let x = width/2 + (scalar * cos(ang));
fill(200,100,100);
ellipse(x, 360, 5, 5);
angle += 2; 
}
function rabbitface() {
push();
push();
translate(200,200);
noStroke();
fill(0);
ellipse(-ears.x,-ears.y,20,120);
ellipse(ears.x,-ears.y,20,120);  
fill(255);
ellipse(-ears.x,-ears.y,10,100);
ellipse(ears.x,-ears.y,10,100);
pop();
fill(0);
noStroke();
ellipse(rabbit.x,rabbit.y,100,100);
mouthmove = atan2(mouseY-200,mouseX-200);
mouth.x = 200 + 2*cos(mouthmove);
mouth.y = 200 + 2*sin(mouthmove);
if((mouseX-200) * (mouseX-200) + (mouseY-180) * (mouseY-180) <= 50*50 && mouseY>=180) {
fill(255);
rect(mouth.x-5,mouth.y+random(20,25),10,10);
stroke(0);
strokeWeight(1);
line(mouth.x-1,mouth.y+random(20,28),mouth.x-1,mouth.y+random(30,40)); 
} else {
fill(255);
rect(mouth.x-5,mouth.y+20,10,10);
stroke(0);
strokeWeight(1);
line(mouth.x-1,mouth.y+20,mouth.x-1,mouth.y+30);
}
eyemove = atan2(mouseY-200,mouseX-200);
eye.x = 200 + 4*cos(eyemove);
eye.y = 200 + 4*sin(eyemove);
if((mouseX-200) * (mouseX-200) + (mouseY-180) * (mouseY-180) <= 50*50 && mouseY>=180) {
fill(200,100,100);
noStroke();
ellipse(eye.x-20,eye.y,10,3);
ellipse(eye.x+20,eye.y,10,3)} else{
fill(200,100,100);
noStroke();
ellipse(eye.x-20,eye.y,10,10);
ellipse(eye.x+20,eye.y,eye.w,eye.h);}
fill(0);
stroke(255);
arc(mouth.x-5,mouth.y+20,8,8,0, PI);
arc(mouth.x+5,mouth.y+20,-8,8,0, PI);
noStroke();
fill(210);
triangle(mouth.x-5,mouth.y+10,mouth.x+5,mouth.y+10,mouth.x,mouth.y+20);
pop();
}
function carrotmouse() {
if((mouseX-200) * (mouseX-200) + (mouseY-180) * (mouseY-180) <= 50*50 && mouseY>=180) {
fill(235,80,20);
noStroke();
beginShape();
vertex(carrot.x-10,carrot.y);
bezierVertex(carrot.x-random(8,12), carrot.y-random(8,20), carrot.x+random(8,12), carrot.y-random(8,20), carrot.x+10, carrot.y);
vertex(carrot.x,carrot.y+random(15,25));
endShape();
stroke(235,180,200);
strokeWeight(2);
line(carrot.x-9,carrot.y,carrot.x,carrot.y);
line(carrot.x-7,carrot.y+5,carrot.x+2,carrot.y+5);
} else{
fill(235,80,20);
noStroke();
beginShape();
vertex(carrot.x-10,carrot.y);
bezierVertex(carrot.x-10, carrot.y-20, carrot.x+10, carrot.y-20, carrot.x+10, carrot.y);
vertex(carrot.x,carrot.y+30);
endShape();
stroke(235,180,200);
strokeWeight(2);
line(carrot.x-9,carrot.y,carrot.x,carrot.y);
line(carrot.x-7,carrot.y+5,carrot.x+2,carrot.y+5);
}
if((mouseX-200) * (mouseX-200) + (mouseY-180) * (mouseY-180) <= 50*50 && mouseY>=180) {
noStroke();
fill(0,190,0);
ellipse(carrot.x,carrot.y-random(25,35),random(9,11),random(18,22));
push();
translate(carrot.x,carrot.y-random(25,35));
rotate(PI / 12);
ellipse(15,5,10,20);
rotate(-PI/6);
ellipse(-15,5,10,20);
pop();} else {
noStroke();
fill(0,190,0);
ellipse(carrot.x,carrot.y-30,10,20);
push();
translate(carrot.x,carrot.y-30);
rotate(PI / 12);
ellipse(15,5,10,20);
rotate(-PI/6);
ellipse(-15,5,10,20);
pop();}
}
function drawStar(){
push();
noStroke();
fill(random(0,255),random(0,255),random(0,255));
translate(star.x,star.y);
beginShape();
vertex(0,a);
vertex(-cos(18)*a,sin(18)*a);
vertex(-cos(54)*a,-sin(54)*a);
vertex(cos(54)*a,-sin(54)*a);
vertex(cos(18)*a,sin(18)*a);
vertex(0,a);
endShape();
pop();
}
function movee() {
push();
if(mouseIsPressed){
star.x = star.x - 35;
star.y = star.y + 35;
}
pop();
}
function mousePressed() {
eye.h = eye.h-8;
movee();
count=0;
}
function mouseReleased() {
eye.h = eye.h+8;
}
function carrotCount(){
if ((mouseX-200) * (mouseX-200) + (mouseY-180) * (mouseY-180) <= 50*50 && mouseY>=180) {
counter = counter + 1;
if (counter == 1) {
count = count + 1}
} else {
counter = 0;
}
textSize(16);
fill(200,100,100);
textStyle(BOLD);
text (count,210,310);
}
function carrotIcon(){
push();
translate(70,180);
scale(0.6);
fill(235,80,20);
noStroke();
beginShape();
vertex(190,200);
bezierVertex(190, 180, 210, 180, 210, 200);
vertex(200,230);
endShape();
stroke(235,180,200);
strokeWeight(2);
line(191,200,200,200);
line(193,205,202,205);
noStroke();
fill(0,190,0);
ellipse(200,170,10,20);
push();
translate(200,170);
rotate(PI / 12);
ellipse(15,5,10,20);
rotate(-PI/6);
ellipse(-15,5,10,20);
pop();
pop();
fill(200,100,100);
text('Thanks for your carrots!',109,350);
}