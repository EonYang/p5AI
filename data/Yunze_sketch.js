let spaceship;
let spaceship_x = 500;
let spaceship_y = 500;
let xspeed = 0;
let yspeed = 0;
let spaceshipCount = 0;
let counter;
let clock;
let trash = [];
let trash_x;
let trash_y;
let trashNum = 6;
let i;
let trashking;
let trashking_x = 0;
let trashking_y = 0;
let trashkingCount = 0;
let health = [];
let health_x;
let health_y;
let load = 0;
let lives = 3;
let bgimg;
let shipimg;
let healthimg;
let junkimg;
let storyimg;
let failimg;
let winimg;
let trashkingimg;
let controlimg;
let gameScene = 0;
function preload() {
bgimg = loadImage('bg.png');
shipimg = loadImage('ship.png');
healthimg = loadImage('health.png');
junkimg = loadImage('junk.png');
storyimg = loadImage('story.png');
failimg = loadImage('fail.png');
winimg = loadImage('win.png');
trashkingimg = loadImage('trashking.png');
controlimg = loadImage('control.png');
}
function setup() {
createCanvas(600, 600);
loadPixels();
rectMode(CENTER);
spaceship = new Spaceship(spaceship_x, spaceship_y, xspeed, yspeed, load);
trashking = new Trashking(trashking_x, trashking_y)
for (i = 0; i < trashNum; i++) {
trash_x = random(20, width - 20);
trash_y = random(20, height - 20);
trash[i] = new Trash(trash_x, trash_y);
}
for (let j = 0; j < 3; j++) {
health_x = 135 - j * 45
health_y = 20;
health[j] = new Health(health_x, health_y);
}
}
function draw() {
if (gameScene == 0) {
image(bgimg, 0, 0, 600, 600);
noStroke();
fill(0, 100);
rect(295, 514, 80, 40);
image(storyimg, 0, 0, 600, 600);
if (mouseIsPressed && (mouseX > 255 && mouseX < 335) && (mouseY > 494 && mouseY < 534))
gameScene = 1;
}
if (gameScene == 1) {
image(bgimg, 0, 0, 600, 600);
noStroke();
fill(0, 100);
rect(295, 474, 80, 40);
image(controlimg, 0, 0, 600, 600);
if (mouseIsPressed && (mouseX > 255 && mouseX < 335) && (mouseY > 454 && mouseY < 494)) {
gameScene = 2;
}
}
if (gameScene == 2) {
counter = millis();
if (lives == 0 || trashkingCount == 3) {
gameScene = 3;
} else if (spaceshipCount == 4) {
gameScene = 4;
} else {
image(bgimg, 0, 0, 600, 600);
spaceship.run();
trashking.run();
fill(255);
text('King of the Junk', 50, 75);
text(trashkingCount, 160, 75);
text('JunkDestroyed', 50, 95);
text(spaceshipCount, 160, 95);
text('JunkLoad', 50, 115);
text(load, 160, 115);
for (let h in health) {
health[h].run();
if (trashking.isNear(spaceship)) {
health.splice(h, 1);
lives = lives - 1
spaceship.x = 500;
spaceship.y = 500;
trashking.x = 200;
trashking.y = 200;
}
}
for (let t in trash) {
trash[t].run();
if (trash[t].isNear(spaceship, 60)) {
trash.splice(t, 1);
trashNum = trashNum - 1;
load = load + 1;
} else if (trash[t].isNear(trashking, 250) && (trashNum > 1)) {
trash.splice(t, 1);
trashkingCount = trashkingCount + 1;
trashNum = trashNum - 1;
}
}
if (dist(spaceship.x, spaceship.y, trashking.x, trashking.y) < 300 || spaceshipCount == 2 || trashNum == 0) {
trashking.x += (spaceship.x - trashking.x) / 150
trashking.y += (spaceship.y - trashking.y) / 150
} else {
for (i = 0; i < trashNum; i++) {
trashking.x += (trash[0].x - trashking.x) / 4000
trashking.y += (trash[0].y - trashking.y) / 4000
}
}
if ((counter - clock) >= 3500) {
load = load - 1;
spaceshipCount = spaceshipCount + 1;
clock = counter;
}
}
}
if (gameScene == 3) {
image(bgimg, 0, 0, 600, 600);
noStroke();
fill(0, 100);
rect(295, 514, 80, 40);
image(failimg, 0, 0, 600, 600);
if (mouseIsPressed && (mouseX > 255 && mouseX < 335) && (mouseY > 494 && mouseY < 534)) {
window.location.reload();
}
}
if (gameScene == 4) {
image(bgimg, 0, 0, 600, 600);
image(winimg, 0, 0, 600, 600);
}
}
function keyPressed() {
if (keyCode === UP_ARROW) {
spaceship.yspeed = -3 + (load * 0.5);
}
if (keyCode === DOWN_ARROW) {
spaceship.yspeed = 3 - (load * 0.5);
}
if (keyCode === LEFT_ARROW) {
spaceship.xspeed = -3 + (load * 0.5);
}
if (keyCode === RIGHT_ARROW) {
spaceship.xspeed = 3 - (load * 0.5);
}
}let spaceship;
let spaceship_x = 300;
let spaceship_y = 300;
let xspeed = 0;
let yspeed = 0;
let spaceshipCount = 0;
let counter;
let clock;
let trash = [];
let trash_x;
let trash_y;
let trashNum = 6;
let i;
let trashking;
let trashking_x = - 50;
let trashking_y = - 50;
let trashkingCount = 0;
let health = [];
let health_x;
let health_y;
let load = 0;
let lives = 3;
let bgimg;
let shipimg;
let healthimg;
let junkimg;
let storyimg;
let failimg;
let winimg;
let trashkingimg;
let gameScene = 0;
function preload() {
bgimg = loadImage('bg.png');
shipimg = loadImage('ship.png');
healthimg = loadImage('health.png');
junkimg = loadImage('junk.png');
storyimg = loadImage('story.png');
failimg = loadImage('fail.png');
winimg = loadImage('win.png');
trashkingimg = loadImage('trashking.png');
}
function setup() {
createCanvas(600, 600);
loadPixels();
rectMode(CENTER);
spaceship = new Spaceship(spaceship_x, spaceship_y, xspeed, yspeed, load);
trashking = new Trashking(trashking_x, trashking_y)
for (i = 0; i < trashNum; i++) {
trash_x = random(20, width - 20);
trash_y = random(20, height - 20);
trash[i] = new Trash(trash_x, trash_y);
}
for (let j = 0; j < 3; j++) {
health_x = 135 - j * 45
health_y = 20;
health[j] = new Health(health_x, health_y);
}
}
function draw() {
if (gameScene == 0) {
image(bgimg, 0, 0, 600, 600);
noStroke();
fill(0, 100);
rect(295, 514, 80, 40);
image(storyimg, 0, 0, 600, 600);
if (mouseIsPressed && (mouseX > 255 && mouseX < 335) && (mouseY > 494 && mouseY < 534))
gameScene = 2;
}
if (gameScene == 2) {
if
counter = millis();
image(bgimg, 0, 0, 600, 600);
spaceship.run();
trashking.run();
fill(255);
text('King of the Junk', 50, 75);
text(trashkingCount, 160, 75);
text('JunkDestroyed', 50, 95);
text(spaceshipCount, 160, 95);
text('JunkLoad', 50, 115);
text(load, 160, 115);
for (let h in health) {
health[h].run();
if (trashking.isNear(spaceship)) {
health.splice(h, 1);
lives = lives - 1
spaceship.x = 500;
spaceship.y = 500;
}
}
for (let t in trash) {
trash[t].run();
if (trash[t].isNear(spaceship,50)) {
trash.splice(t, 1);
trashNum = trashNum - 1;
load = load + 1;
} else if (trash[t].isNear(trashking,250) && (trashNum > 1)) {
trash.splice(t, 1);
trashkingCount = trashkingCount + 1;
trashNum = trashNum - 1;
}
}
if (dist(spaceship.x, spaceship.y, trashking.x, trashking.y) < 200 || spaceshipCount == 2 || trashNum == 0) {
trashking.x += (spaceship.x - trashking.x) / 200
trashking.y += (spaceship.y - trashking.y) / 200
} else {
for (i = 0; i < trashNum; i++) {
trashking.x += (trash[0].x - trashking.x) / 5000
trashking.y += (trash[0].y - trashking.y) / 5000
}
if (lives == 0  || trashkingCount >= 3) {
gameScene = 3;
}
if (load > 0) {
if ((counter - clock) > 5000) {
load = load - 1;
spaceshipCount = spaceshipCount + 1;
clock = counter;
}
}
if (spaceshipCount > 3) {
gameScene = 4;
}
}
}
if (gameScene == 3) {
image(bgimg, 0, 0, 600, 600);
noStroke();
fill(0, 100);
rect(295, 514, 80, 40);
image(failimg, 0, 0, 600, 600);
if (mouseIsPressed && (mouseX > 255 && mouseX < 335) && (mouseY > 494 && mouseY < 534)) {
gameScene = 0;
}
}
if (gameScene == 4) {
image(bgimg, 0, 0, 600, 600);
image(winimg, 0, 0, 600, 600);
}
}
function keyPressed() {
if (keyCode === UP_ARROW) {
spaceship.yspeed = -3 + (load * 0.5);
}
if (keyCode === DOWN_ARROW) {
spaceship.yspeed = 3 - (load * 0.5);
}
if (keyCode === LEFT_ARROW) {
spaceship.xspeed = -3 + (load * 0.5);
}
if (keyCode === RIGHT_ARROW) {
spaceship.xspeed = 3 - (load * 0.5);
}
}let memes = [];
let tWidth;
let preCounter;
function setup() {
createCanvas(400, 400);
memes = ["POKEMON MASTER? WHY NOT POKEMON PHD?","YOU HAVE AN A-? YOUR A DISGRACE","LESS FACEBOOK MORE FACE IN BOOK","YOU SICK? GO STUDY TO BE DOCTOR. CURE YOURSELF.","AN A MINUS IS AN A  MINUS MY LOVE FOR YOU","IF AT FIRST YOU DON’T SUCCEED DONT COME BACK HOME","A-? THIS FAMILY IS ABOUT TO BE MINUS A SON","CALCULATOR? WHY NOT CALCUNOW?","YOU WATCH DOCTOR WHO? WHY NOT DOCTOR YOU?","OH,YOU WANT PS4? HOW ABOUT PHD?","YOU ARE 99%?WHY NOT 100%","TRY HARDER","WHAT IS DIFFERENCE BETWEEN A- AND A+? MY LOVE FOR YOU."]
}
function draw() {
background(220);
if (preCounter < counter-5){
preCounter = counter;
i = random(0,12);
tWidth = textWidth(memes[i]);
textbox = text(memes[i],imgX-tWidth/2,imgY+30);
}
}let data;
let input1;
let input2;
let ans;
let txt = '%';
let img;
let imgX = 0;
let imgY = 0;
function preload(){
img = loadImage('tryharder.png');
}
function setup() {
createCanvas(400, 400);
imgX = width/2;
imgY = height/2;
input1 = createInput(45);
input1.position(20, 10);
input2 = createInput(87);
input2.position(180, 10);
button = createButton('calculate!');
button.position(input2.x + input2.width+10, 10);
}
function draw() {
background(220);
text(txt, 160, 25);
button.mousePressed(calculate);
imageMode(CENTER);
image(img, imgX, imgY, 100, 100);
}
function calculate(){
let mod1 = input1.value();
let mod2 = input2.value();
ans = mod1%mod2;
input1.hide();
input2.hide();
button.hide();
txt = '';
}
function keyPressed(){
if (keyCode === LEFT_ARROW) {
imgX = imgX - 5;
}
if (keyCode === DOWN_ARROW) {
imgY = imgY + 5;
}
}
let video, stronger, fft, sliderCol, toggle;
let vScale = 21;
function preload() {
stronger = loadSound('kelly-clarkson-stronger-what-doesnt-kill-you.mp3');
}
function setup() {
createCanvas(640, 480);
toggle = createButton('Pause');
toggle.style('display', 'block');
toggle.style('margin-right', 'auto');
toggle.style('margin-left', 'auto');
toggle.mousePressed(musicToggle);
colorChange = createP('Change Color ');
sliderCol = createSlider(0, 255, 128);
sliderCol.parent(colorChange);
pixelDensity(1);
video = createCapture(VIDEO);
video.size(width / vScale, height / vScale);
video.hide();
fft = new p5.FFT();
stronger.amp(0.8);
stronger.play();
}
function draw() {
background(26, 26, 26);
video.loadPixels();
loadPixels();
fft.analyze();
let strongerHighMid = fft.getEnergy("treble");
let strongerBass = fft.getEnergy("bass");
let heartSize = map(strongerBass, 0, 255, 0, 26)
console.log(strongerHighMid);
for (let x = 0; x < video.width; x++) {
for (let y = 0; y < video.height; y++) {
let i = (video.width - x - 1 + (y * video.width)) * 4;
let r = video.pixels[i + 0];
let g = video.pixels[i + 1];
let b = video.pixels[i + 2];
let bright = (r + g + b) / 3;
let threshold = 90;
if (strongerHighMid < threshold) {
noStroke();
fill(r + sliderCol.value(), g, b, random(100, 200));
textSize(heartSize);
text('❤', x * vScale, y * vScale);
} else {
fill(r, g + 75, b + sliderCol.value(), random(100, 200));
textSize(heartSize);
text('❤', x * vScale, y * vScale);
}
}
}
}
function musicToggle() {
if (!stronger.isPlaying()) {
stronger.play();
toggle.html('Pause');
} else {
stronger.pause();
toggle.html('Play');
}
}let capture;
let vScale = 16;
function setup() {
createCanvas(640, 480)
capture = createCapture(VIDEO);
capture.size(width/vScale, height/vScale);
pixelDensity(1);
}
function draw() {
capture.loadPixels();
loadPixels();
for (let y = 0; y < capture.height; y++) {
for (let x = 0; x < capture.width; x++){
let index = (x + y * capture.width) * 4;
let r = capture.pixels[index + 0];
let g = capture.pixels[index + 1];
let b = capture.pixels[index + 2];
fill(r,g,b);
rect(x*vScale,y*vScale,vScale,vScale);
}
}
}let x;
let y;
let speed;
let rains = [];
let capture;
let vScale = 20;
function setup() {
createCanvas(640,480)
capture = createCapture(VIDEO);
capture.size(32, 24);
pixelDensity(1);
for (let i = 0; i < 200; i++) {
x = random(width);
y = random(-height, 0);
speed = random(1,5);
rains[i] = new Rain(x, y, speed, 1);
}
}
function draw() {
background(50, 30);
for (let i = 0; i < rains.length; i++) {
rains[i].move();
rains[i].show(capture);
}
}let x = 200;
let y = 200;
let xspeed = 4;
let yspeed = 5;
let bounce;
function preload(){
bounce = loadSound("bounce.mp3");
}
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
x += xspeed
y += yspeed
ellipse(x, y, 50, 50);
if (x > width || x < 0) {
xspeed *= -1
bounce.play();
}
if (y > height || y < 0) {
yspeed *= -1;
bounce.play();
}
let capture;
function setup() {
createCanvas(400, 400);
capture = createCapture(VIDEO);
}
function draw() {
loadPixels();
copy(capture, mouseX, mouseY, 20, 20, mouseX, mouseY, 20, 20)
}let dog;
let col;
function preload() {
dog = loadImage("dog.png");
}
function setup() {
createCanvas(400, 400);
pixelDensity(1);
}
function draw() {
background(220);
dog.loadPixels();
for (let y = 0; y < height; y += 10){
for (let x = 0; x < width; x += 10) { 
noStroke();
col = dog.get(x, y);
fill(col);
rect(x, y, 10, 10);
}
}
updatePixels();
}let img;
function setup() {
createCanvas(100, 100);
img = createImage(100,100);
img.loadPixels();
for(let i = 0; i < img.width; i++){
for(let j = 0; j < img.height; j++){
img.set(i,j, color(random(255), random(255), random(255),random(255)));
}
}
img.updatePixels();
}
function draw() {
image(img,0,0);
}var song, fft;
function preload() {
song = loadSound("icon.mp3");
}
function setup() {
createCanvas(800, 800);
fft = new p5.FFT();
song.play();
}
function draw() {
background(0, 0, 0);
fft.analyze();
bassVal = (int)(fft.getEnergy("bass"));
lMidVal = (int)(fft.getEnergy("lowMid"));
midVal = (int)(fft.getEnergy("mid"));
hMidVal = (int)(fft.getEnergy("highMid"));
trebVal = (int)(fft.getEnergy("treble"));
noStroke();
fill(255, 186, 73);
ellipse(width / 2, height / 2, bassVal * 4, bassVal * 4);
noStroke();
fill(32, 163, 158);
ellipse(width / 2, height / 2, lMidVal * 2, lMidVal * 2);
noStroke();
fill(135, 195, 143);
ellipse(width / 2, height / 2, midVal * 2, midVal * 2);
noStroke();
fill(239, 91, 91);
ellipse(width / 2, height / 2, hMidVal * 2, hMidVal * 2);
noStroke();
fill(79, 0, 75);
ellipse(width / 2, height / 2, trebVal * 2, trebVal * 2);
let q = 'london';
let apikey = '&APPID=22c1e19d364c6c17e5c0196ec5059c64';
let unit = '&units=metric';
let url;
let weather;
let input;
let button;
let windSpeed;
let windD;
let x;
let y;
let xl = 0;
let speed = 0;
let rains = [];
function setup() {
createCanvas(500, 500);
button = select('#button');
button.mousePressed(search);
input = select('#input');
}
function draw() {
background(100, 50);
rains[i].run();
}
}
function gotData(data) {
console.log(data);
weather = data;
if (weather) {
windSpeed = weather.list[0].wind.speed;
windD = weather.list[0].wind.deg;
speed = map(windSpeed, 0, 15, 5, 15);
xl = map(windD, 0, 360, 0, 5);
for (let i = 0; i < 100; i++) {
x = random(width);
y = random(-height, 0);
rains[i] = new Rain(x, y, speed, xl);
}
}
}
function search() {
url = api + input.value() + apikey + unit;
loadJSON(url, gotData);
}var weather;
var city ='Beijing';
var unit ='&units=metric';
var userkey = '&appid=8075f0f23a9fe47353466313848609c3';
var input;
function setup(){
createCanvas(600,250);
var button =select('#submit');
button.mousePressed(askWeather);
input=select('#city');
}
function askWeather(){
var url = api+input.value()+unit+userkey;
loadJSON(url, gotData);
}
function gotData(data){
weather=data;
}
function draw(){
background(0);
if(weather){
var temp = weather.list[0].main.temp;
var humidity = weather.list[0].main.humidity;
var pressure = weather.list[0].main.pressure;
var wind = weather.list[0].wind.speed;
comment =weather.list[0].weather.description;
push();
fill(255,162,10);
var tempbar = rect(40,50,temp*15,10,5);
pop();
push();
fill(69,251,0);
var humiditybar = rect(40,100,humidity*2,10,5);
pop();
push();
fill(0,219,216);
var pressurebar = rect(40,150,pressure/5,10,5);
pop();
push();
fill(248,231,28);
var windbar=rect(40,200,wind*20,10,5);
pop();
headtext();
}
}
function headtext(){
textSize(13);
fill(255);
text('Temperature', 40, 40);
text('Humidity', 40, 90);
text('Pressure', 40, 140);
text('WindSpeed', 40, 190);
}
function description(){
textSize(10);
fill(255);
text('temp', 200, 40);
text('Humidity', 40, 90);
text('Pressure', 40, 140);
}
let allWords = [];
let ts = 16;
let i = 0;
function preload() {
let q = "trump";
let apikey = "e41ef1c430064c37aab7ba229af4fb9c";
loadJSON(url, processSnippets);
}
function setup() {
createCanvas(800, 800);
fill(0);
}
function draw() {
background(255, 5);
ts++;
ts %= 48;
if (allWords.length > 0) {
i += 1;
i %= allWords.length;
textSize(ts);
let word = allWords[floor(i)];
text(allWords[floor(i)], random(width), random(height));
}
}
function processSnippets(data) {
let docs = data.response.docs;
console.log(data);
let putins = ["Putin", "Vladi", "Vlad", "Vova"];
let trumps = ["Trump", "president", "President"];
for (let doc of docs) {
let words = splitTokens(doc.snippet);
for (let w in words) {
let word = words[w];
for (let trump of trumps) {
if (match(word, trump)) {
words[w] = putins[floor(random(putins.length))];
break;
}
}
shuffle(words, true);
}
allWords = concat(allWords, words);
}
let q = 'london';
let apikey = '&APPID=22c1e19d364c6c17e5c0196ec5059c64';
let unit = '&units=metric';
let url;
let weather;
let input;
let button;
let ripples = [];
let r;
let s;
function setup() {
createCanvas(500, 500);
button = select('#button');
button.mousePressed(search);
input = select('#input');
}
function draw() {
background(100);
if (weather) {
let temp = weather.list[0].main.temp;
let windSpeed = weather.list[0].wind.speed;
r = map(temp,-30,40,100,255)
s = map(windSpeed,0,30,1,10)
ripples[i].run();
}
}
}
function gotData(data) {
console.log(data);
weather = data;
}
function search() {
url = api + input.value() + apikey + unit;
loadJSON(url, gotData);
for (let i = 0; i < 1; i++) {
let radius = 0;
ripples.push(new Ripple(r, 0, 30, radius,s));
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
}let txt;
let tokens = [];
let padding = 30;
function preload() {
txt = loadStrings("joke.txt");
}
function setup() {
createCanvas(400, 400);
for (let l of txt) {
tokens = concat(tokens, splitTokens(l));
}
}
function draw() {
background(220);
let y = padding;
let x = 0;
for (let i = 0; i < tokens.length; i++) {
text(tokens[i], x, y);
x += textWidth(tokens[i]) + textWidth(' ');
if (x > width - padding){
y +=textAscent() + textDescent();
x = 0;
}
}
let latestData = "waiting for data";
function gotData() {
}
function setup() { 
createCanvas(600, 600);
rectMode(CENTER);
setInterval(function() {
console.log("HELLO");
}, 1000);
} 
function draw() { 
background(55,63,71,25);
let radius = map(latestData,0,1023,1,54);
let r=random(0,255);
let g=random(0,255);
let b=random(0,255);
for (i = 0;i<15;i++){
for(j = 0; j < 15; j++){
push()
translate(300,300);
rotate(PI/4);
noFill()
strokeWeight(5)
stroke(r,g,b,100)
rect(-400 + i*60,-400 +j*60,radius,radius);
pop()
}
}
}
function gotData() {
}
let door;
let door2;
let trick;
let treat;
let distance = "waiting for data";
let state = "waiting for data";
let doorCanPlay = false;
let stateCanPlay = false;
function preload() {
door = loadSound('door.mp3');
door2 = loadSound('door2.mp3');
treat = loadSound('treat.mp3');
trick = loadSound('trick.mp3');
}
function setup() {
createCanvas(400, 400);
}
function draw() {
if (distance > 30) {
if (doorCanPlay) {
door.play();
doorCanPlay = false;
}
} else {
doorCanPlay = true;
}
if (distance < 30) {
door.pause();
}
if (state == 0) {
if (stateCanPlay) {
treat.loop();
stateCanPlay = false;
}
} else if (state == 1) {
if (stateCanPlay) {
trick.loop();
stateCanPlay = false;
}
} else if (state == 2) {
stateCanPlay = true;
treat.pause();
trick.pause();
}
console.log(state)
}
function gotData() {
var sensorReadings = split(currentString, ",");
if (sensorReadings.length > 1) {
state = int(sensorReadings[1]);
}
}let slider_r;
let slider_g;
let slider_b;
let r;
let g;
let b;
let button;
let ripples = [];
function setup() {
createCanvas(windowWidth, windowHeight);
button = createButton("start");
button.position(60, 140);
slider_r = createSlider(0, 255, 255);
slider_g = createSlider(0, 255, 255);
slider_b = createSlider(0, 255, 255);
slider_r.position(20, 20);
slider_g.position(20, 60);
slider_b.position(20, 100);
}
function draw() {
background(0, 0, 0, 25);
r = slider_r.value();
g = slider_g.value();
b = slider_b.value();
button.mousePressed(start);
ripples[i].run();
}
}
function start() {
for (let i = 0; i < 1; i++) {
let radius = 0;
ripples.push(new Ripple(r, g, b, radius));
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
}let a=0
x1=0
y1=0
x=300
y=300
o=20
let r=255
g=255
b=255
function setup() {
createCanvas(600, 600);
background(55,63,71);
}
function mouseClicked(){
background(55,63,71)
};
function draw() {
x1=mouseX-x;
y1=mouseY-y;
x=x+x1*.01;
y=y+y1*.01;
strokeWeight(0.1);
stroke(255,255,255);
noFill()
o=o+0.1
ellipse(x,y,o,o)
noStroke()
r=random(0,255)
g=random(0,255)
b=random(0,255)
fill(r,g,b,50);
a=random(0,200)
rect(0,mouseY-.5,a,1);
rect(width-a,mouseY-.5,a,1);
rect(mouseX-.5,0,1,a);
rect(mouseX-0.5,height-a,1,a);
noFill()
strokeWeight(5)
stroke(r,g,b,100)
rect(200,200,200,200)
let latestData = "waiting for data";
function gotData() {
}
function setup() { 
createCanvas(windowWidth, windowHeight);
setInterval(function() {
console.log("HELLO");
}, 1000);
} 
function draw() { 
background(127, 0, 127);
var v = map(latestData,0,1023,0,width);
ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);
ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
v+=random(-5, 5);
bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);
}
function gotData() {
}
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
function setup() {
createCanvas(windowWidth, windowHeight);
}
function serverConnected() {
}
function gotList(thelist) {
for (var i = 0; i < thelist.length; i++) {
}
}
function gotOpen() {
}
function gotError(theerror) {
}
function gotData() {
}
function gotRawData(thedata) {
}
function draw() {
}let planet = [];
let blackhole;
let radius = 20;
let starCount = 50;
let canvasSize = 500;
function setup() {
  createCanvas(canvasSize, canvasSize);
pixelDensity(1);
  renderBuffer = createGraphics(canvasSize, canvasSize);
renderBuffer.pixelDensity(1);
  blackhole = new Blackhole(radius);
  for (i = 0; i < starCount; i++) {
    let x = random(width);
    let y = random(height);
    let xspeed = random(-1, 1) / 2;
    let yspeed = random(-1, 1) / 2;
    let o = random(50, 800);
    let p = random(200, 800);
    let r = random(50, 255);
    let g = random(50, 255);
    let b = random(50, 255);
    planet[i] = new Planet(x, y, xspeed, yspeed, o, p, r, g, b, renderBuffer);
  }
}
function draw() {
  renderBuffer.background(bg);
  for (i = 0; i < planet.length; i++) {
    planet[i].run()
    if (i > planet.length / 4) {
      planet[i].showbelt()
      if (i > planet.length / 1.2) {
        planet[i].show2belt()
      }
    }
    if (planet[i].isNear(mouseX, mouseY, radius / 2.5)) {
      planet.splice(i, 1);
      radius += 2;
      blackhole.size += 2;
    }
  }
  loadPixels();
  renderBuffer.loadPixels();
  for (i = 0; i < canvasSize; i++) {
    for (j = 0; j < canvasSize; j++) {
      currentPixel = (i * canvasSize + j) * 4;
      distance = pixelMouseDist(j, i);
      if (distance < radius - 20) {
        pixels[currentPixel] = 0;
        pixels[currentPixel + 1] = 0;
        pixels[currentPixel + 2] = 0;
        pixels[currentPixel + 3] = 255;
      } else if (distance < radius) {
        let value = map(distance, radius, radius - 20, bg, 0);
        pixels[currentPixel] = value;
        pixels[currentPixel + 1] = value;
        pixels[currentPixel + 2] = value;
        pixels[currentPixel + 3] = 255;
      } else if (distance > radius + 20) {
        pixels[currentPixel] = renderBuffer.pixels[currentPixel];
        pixels[currentPixel + 1] = renderBuffer.pixels[currentPixel + 1];
        pixels[currentPixel + 2] = renderBuffer.pixels[currentPixel + 2];
        pixels[currentPixel + 3] = 255;
      } else {
        newVec = circularWarp(j, i, radius, 20);
        newPixel = (round(newVec.y) * canvasSize + round(newVec.x)) * 4;
        pixels[currentPixel] = renderBuffer.pixels[newPixel];
        pixels[currentPixel + 1] = renderBuffer.pixels[newPixel + 1];
        pixels[currentPixel + 2] = renderBuffer.pixels[newPixel + 2];
        pixels[currentPixel + 3] = 255;
      }
    }
  }
  updatePixels();
  blackhole.draw();
  if (radius >= 2 * starCount + 20) {
    text("Universe is Destroyed", width / 2, height / 2)
  }
}
function pixelMouseDist(x, y) {
  return sqrt((x - mouseX) * (x - mouseX) + (y - mouseY) * (y - mouseY));
}
function circularWarp(x, y, r, f) {
  O = createVector(mouseX, mouseY);
  X = createVector(x, y);
  R = p5.Vector.add(O, p5.Vector.mult(p5.Vector.sub(X, O), r / p5.Vector.mag(p5.Vector.sub(X, O))));
  return p5.Vector.add(p5.Vector.mult(p5.Vector.sub(X, R), 1.0 + r / f), O);
}let planet = [];
let blackhole;
let radius = 20;
let starCount = 50;
let canvasSize = 500;
function setup() {
  createCanvas(canvasSize, canvasSize);
pixelDensity(1);
  renderBuffer = createGraphics(canvasSize, canvasSize);
renderBuffer.pixelDensity(1);
  blackhole = new Blackhole(radius);
  for (i = 0; i < starCount; i++) {
    let x = random(width);
    let y = random(height);
    let xspeed = random(-1, 1) / 2;
    let yspeed = random(-1, 1) / 2;
    let o = random(50, 800);
    let p = random(200, 800);
    let r = random(50, 255);
    let g = random(50, 255);
    let b = random(50, 255);
    planet[i] = new Planet(x, y, xspeed, yspeed, o, p, r, g, b, renderBuffer);
  }
}
function draw() {
  renderBuffer.background(bg);
  for (i = 0; i < planet.length; i++) {
    planet[i].run()
    if (i > planet.length / 4) {
      planet[i].showbelt()
      if (i > planet.length / 1.2) {
        planet[i].show2belt()
      }
    }
    if (planet[i].isNear(mouseX, mouseY, radius / 2.5)) {
      planet.splice(i, 1);
      radius += 2;
      blackhole.size += 2;
    }
  }
  loadPixels();
  renderBuffer.loadPixels();
  for (i = 0; i < canvasSize; i++) {
    for (j = 0; j < canvasSize; j++) {
      currentPixel = (i * canvasSize + j) * 4;
      distance = pixelMouseDist(j, i);
      if (distance < radius - 20) {
        pixels[currentPixel] = 0;
        pixels[currentPixel + 1] = 0;
        pixels[currentPixel + 2] = 0;
        pixels[currentPixel + 3] = 255;
      } else if (distance < radius) {
        let value = map(distance, radius, radius - 20, bg, 0);
        pixels[currentPixel] = value;
        pixels[currentPixel + 1] = value;
        pixels[currentPixel + 2] = value;
        pixels[currentPixel + 3] = 255;
      } else if (distance > radius + 20) {
        pixels[currentPixel] = renderBuffer.pixels[currentPixel];
        pixels[currentPixel + 1] = renderBuffer.pixels[currentPixel + 1];
        pixels[currentPixel + 2] = renderBuffer.pixels[currentPixel + 2];
        pixels[currentPixel + 3] = 255;
      } else {
        newVec = circularWarp(j, i, radius, 20);
        newPixel = (round(newVec.y) * canvasSize + round(newVec.x)) * 4;
        pixels[currentPixel] = renderBuffer.pixels[newPixel];
        pixels[currentPixel + 1] = renderBuffer.pixels[newPixel + 1];
        pixels[currentPixel + 2] = renderBuffer.pixels[newPixel + 2];
        pixels[currentPixel + 3] = 255;
      }
    }
  }
  updatePixels();
  blackhole.draw();
  if (radius >= 2 * starCount + 20) {
    text("Universe is Destroyed", width / 2, height / 2)
  }
}
function pixelMouseDist(x, y) {
  return sqrt((x - mouseX) * (x - mouseX) + (y - mouseY) * (y - mouseY));
}
function circularWarp(x, y, r, f) {
  O = createVector(mouseX, mouseY);
  X = createVector(x, y);
  R = p5.Vector.add(O, p5.Vector.mult(p5.Vector.sub(X, O), r / p5.Vector.mag(p5.Vector.sub(X, O))));
  return p5.Vector.add(p5.Vector.mult(p5.Vector.sub(X, R), 1.0 + r / f), O);
}var r = 0;
var b = 255; 
let x = 0;
let y = 0;
function setup() {
createCanvas(600, 600);
}
function draw() {
background(255,237,225);
fill(169,221,214);
stroke(169,221,214);
strokeWeight(2);
ellipse(width/2,height/2,80,80);
noFill();
stroke(193,184,200);
r = map(sin(frameCount/100),-1,1,0,255);
b = map(sin(frameCount/100),-1,1,255,0);
push();
stroke(169,221,214);
ellipse(width/2,height/2,120,120);
translate(width/2,height/2);
translate(p5.Vector.fromAngle(millis() / 800, 60));
fill(169,221,214);
stroke(220);
ellipse(0,0,10,10);
pop();
push();
stroke(122,139,153);
ellipse(width/2,height/2,160,160);
translate(width/2,height/2);
translate(p5.Vector.fromAngle(millis() / 800, 80));
fill(122,139,153);
stroke(220);
ellipse(0,0,18,18);
pop();
push();
stroke(145,173,194);
ellipse(width/2,height/2,250,250)
translate(width/2,height/2);
translate(p5.Vector.fromAngle(millis() / 1200, 125));
fill(145,173,194);
ellipse(0,0,12,12);
pop();
push();
stroke(155,160,168);
ellipse(width/2,height/2,300,300);
translate(width/2,height/2);
translate(p5.Vector.fromAngle(millis() / 500, 150));
fill(155,160,168);
stroke(220);
ellipse(0,0,20,20);
pop();
push();
stroke(155,160,168);
ellipse(width/2,height/2,450,450)
translate(width/2,height/2);
translate(p5.Vector.fromAngle(millis() / 700, 225));
fill(155,160,168);
stroke(230);
ellipse(0,0,10,10);
pop();
push();
stroke(193,184,200);
ellipse(width/2,height/2,465,465)
translate(width/2,height/2);
translate(p5.Vector.fromAngle(millis() / 600, 233));
fill(193,184,200);
stroke(230);
ellipse(0,0,12,12);
pop();
fill(252,119,83);
noStroke();
textSize(9);
text('Click & Make a Wish : P',mouseX,mouseY);
push();
fill(252,119,83);
stroke(252,119,83);
ellipse(x, y, 7,7);
x = x+15;
y = y+15;
pop();
}
function mousePressed(){
x = random(0,600);
y = random(0,600);
}
let planet = [];
let blackhole;
function setup() {
createCanvas(600, 600);
blackhole = new Blackhole(mouseX, mouseY);
for (i = 0; i < 50; i++) {
let x = random(width);
let y = random(height);
let xspeed = random(-1, 1) / 2;
let yspeed = random(-1, 1) / 2;
let o = random(50, 800);
let p = random(200, 800);
let r = random(50, 255);
let g = random(50, 255);
let b = random(50, 255);
planet[i] = new Planet(x, y, xspeed, yspeed, o, p, r, g, b);
}
}
function draw() {
background(bg);
fill(255);
ellipse(mouseX, mouseY, radius);
for (i = 0; i < planet.length; i++) {
planet[i].run()
if (i > planet.length / 4) {
planet[i].showbelt()
if (i > planet.length / 1.2) {
planet[i].show2belt()
}
}
if (planet[i].isNear(mouseX, mouseY, radius / 2)) {
planet.splice(i, 1);
radius += 2
}
}
if (radius == 2 * 50 + 20) {
text("Universe is Destroyed", width / 2, height / 2)
}
function setup() {
createCanvas(600, 600);
let x = random(width);
let y = random(height);
let xspeed = random(0, 6);
let yspeed = random(0, 5);
let shade = 255;
balls.push(new Ball(x, y, xspeed, yspeed, shade));
}
}
function draw() {
background(30);
balls[i].run();
for (j = i+1; j < balls.length; j++) {
if (balls[i] !== balls[j] && balls[i].overlap(balls[j])) {
balls.splice(j, 1);
balls.splice(i, 1);
}
}
}
}
let i;
function setup() {
createCanvas(600, 600);
for (i = 0 ; i<100; i++) {
let ball = new Balls(random(0,width),random(0,height),random(10,20),random(-1,1),random(-1,1),random(0,150));
balls.push(ball);
}
}
function draw() {
background(220);
for (i = 0; i < balls.length; i++) {
balls[i].createBall();
balls[i].moveBall(); }
for (i = 0; i < balls.length; i++) {
for (j = 0; j < balls.length; j++) {
if (balls[i] !== balls[j] && balls[i].collideBall(balls[j])) {
balls.splice(i,1);
}
}
}
function setup() {
createCanvas(600, 600);
}
function draw() {
background(30);
balls[i].run();
}
}
function mousePressed() {
for (let i = 0; i < 1; i++) {
let xspeed = random(0, 7);
let yspeed = random(0, 7);
balls.push(new Ball(mouseX, mouseY, xspeed, yspeed));
}
function setup() {
createCanvas(600, 600);
let x = random(width);
let y = random(height);
let xspeed = random(0, 7);
let yspeed = random(0, 7);
let shade = random(255);
balls[i] = new Ball(x, y, xspeed, yspeed, shade);
}
}
function draw() {
background(30);
balls[i].run();
if (balls[i].isNear(mouseX, mouseY)) {
balls.splice(i, 1);
}
}
}
let num1;
let num2;
let answer;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
add(2,4);
}
function add(num1,num2){
answer = num1 + num2;
text("the answer is",20,30);
text(answer, 100,30)
}let x;
let y;
let l;
let h;
function setup() {
createCanvas(600, 600);
background(70, 70, 70);
rectMode(CENTER);
}
function draw() {
noStroke()
l = random(400)
push()
translate(0,250);
rotate(PI/4);
rect(0,0,l,l);
pop()
}
function chooseColor() {
if (random(1) > 0.8) {
fill(70, 70, 70);
} else if (random(1) > 0.6 && random(1) < 0.8) {
fill(235, 235, 235);
} else if (random(1) > 0.4 && random(1) < 0.6) {
fill(100, 140, 180);
} else if (random(1) > 0.2 && random(1) < 0.4) {
fill(255, 220, 110);
} else {
fill(255, 160, 160);
}
}let a=0
x1=0
y1=0
x=300
y=300
o=20
let r=255
g=255
b=255
function setup() {
createCanvas(600, 600);
background(55,63,71);
}
function mouseClicked(){
background(55,63,71)
};
function draw() {
x1=mouseX-x;
y1=mouseY-y;
x=x+x1*.01;
y=y+y1*.01;
strokeWeight(0.1);
stroke(255,255,255);
noFill()
o=o+0.1
ellipse(x,y,o,o)
noStroke()
r=random(0,255)
g=random(0,255)
b=random(0,255)
fill(r,g,b,50);
a=random(0,200)
rect(0,mouseY-.5,a,1);
rect(width-a,mouseY-.5,a,1);
rect(mouseX-.5,0,1,a);
rect(mouseX-0.5,height-a,1,a);
noFill()
strokeWeight(5)
stroke(r,g,b,100)
rect(200,200,200,200)
}let x;
let y;
let w;
let h;
function setup() {
createCanvas(1000, 1000);
background(70, 70, 70);
}
function draw() {
noStroke()
x = random(width);
y = random(height);
w = random(100);
h = random(100);
for (let i = 0; i < 10; i++) {
chooseColor()
rect(x, y, w, h);
}
}
function chooseColor() {
if (random(1) > 0.8) {
fill(70, 70, 70);
} else if (random(1) > 0.6 && random(1) < 0.8) {
fill(235, 235, 235);
} else if (random(1) > 0.4 && random(1) < 0.6) {
fill(100, 140, 180);
} else if (random(1) > 0.2 && random(1) < 0.4) {
fill(255, 220, 110);
} else {
fill(255, 160, 160);
}
}var x = 0;
var y = 0;
function setup() {
createCanvas(1000, 1000);
noStroke();
for (i = 0; i < 10; i++) {
for (y = 0; y < height; y += r) {
for (x = 0; x < windowWidth; x += r) {
drawPattern()
}
}
}
}
function draw() {}
function chooseColor() {
if (random(1) > 0.8) {
fill(70, 70, 70);
} else if (random(1) > 0.6 && random(1) < 0.8) {
fill(235, 235, 235);
} else if (random(1) > 0.4 && random(1) < 0.6) {
fill(100, 140, 180);
} else if (random(1) > 0.2 && random(1) < 0.4) {
fill(255, 220, 110);
} else {
fill(255, 160, 160);
}
}
function drawPattern() {
if (random(1) > 0.5) {
chooseColor()
arc(x + r / 2, y, r, r, 0, PI, CHORD);
chooseColor()
arc(x + r / 2, y + r, r, r, PI, 0, CHORD);
} else {
chooseColor()
arc(x, y + r / 2, r, r, PI + HALF_PI, HALF_PI, CHORD);
chooseColor()
arc(x + r, y + r / 2, r, r, HALF_PI, PI + HALF_PI, CHORD);
}
function setup() {
createCanvas(600, 600);
let x = random(width);
let y = random(height);
let xspeed = random(0, 7);
let yspeed = random(0, 7);
let shade = random(255);
balls[i] = new Ball(x, y, xspeed, yspeed, shade);
}
}
function draw() {
background(30);
balls[i].run();
if (dist(balls[i].x, balls[i].y, balls[i + 1].x, balls[i + 1].y) < 50) {
balls.splice(i, 1)
}
}
}
function mousePressed() {
function setup() {
createCanvas(600, 600);
let x = random(width);
let y = random(height);
let xspeed = random(0, 7);
let yspeed = random(0, 7);
let shade = random(255);
balls[i] = new Ball(x, y, xspeed, yspeed, shade);
}
}
function draw() {
background(30);
balls[i].run();
if (dist(balls[i].x, balls[i].y, balls[i + 1].x, balls[i + 1].y) < 50) {
balls.splice(i, 1)
}
}
}
function mousePressed() {
}let on = false;
let Pushbutton = new pushbutton(300, 650, 150, 50, 130, on);
let Pattern = new pattern(0, 0, 60);
function setup() {
createCanvas(600, 700);
noStroke();
fill(237, 236, 218);
rect(0, 0, width, height);
drawBG();
}
}
function draw() {
Pushbutton.run();
}
function drawBG() {
for (y = 0; y < 600; y += r) {
for (x = 0; x < windowWidth; x += r) {
Pattern.run();
}
}
}
function mousePressed() {
if (mouseX >= 225 && mouseX <= 375 && mouseY >= 625 && mouseY <= 675) {
on = !on;
}
}let refresh = true;
let Pushbutton = new pushbutton(225, 625, 150, 50, 0, refresh);
let Pattern = new pattern(0,0,60);
function setup() {
createCanvas(600, 700);
noStroke();
fill(237, 236, 218);
rect(0, 0, width, height);
drawBG();
}
}
function draw() {
frameRate(s);
Pushbutton.run();
}
function drawBG() {
for (y = 0; y < 600; y += r) {
for (x = 0; x < windowWidth; x += r) {
Pattern.run();
}
}
}
let x = 200;
let y = 200;
let xspeed = 4;
let yspeed = 5;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
x += xspeed
y += yspeed
ellipse(x, y, 50, 50);
if (x > width || x < 0) {
xspeed *= -1
}
if (y > height || y < 0) {
yspeed *= -1;
}
}let x = 0;
let y = 0;
let w = 40;
let h = 80;
let shade = 0;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
for (let col = 0; col <= 10; col++) {
for (let row = 0; row <= 5; row++) {
x = 0 + col * 40;
y = 0 + row * 80;
fill('white')
rect(x, y, w, h);
if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
shade = map(mouseX, 0, width, 100, 255);
fill(shade);
rect(x, y, w, h);
} else {
noFill()
}
}
}
}let refresh = true;
let Pushbutton = new pushbutton(225, 625, 150, 50, 0, refresh);
let Pattern = new pattern(0,0,60);
function setup() {
createCanvas(600, 700);
noStroke();
fill(237, 236, 218);
rect(0, 0, width, height);
drawBG();
}
}
function draw() {
frameRate(s);
Pushbutton.run();
}
function drawBG() {
for (y = 0; y < 600; y += r) {
for (x = 0; x < windowWidth; x += r) {
Pattern.run();
}
}
}
let ball_1 = new ball(100,200,4,6);
let ball_2 = new ball(300,100,6,4);
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
ball_1.run();
ball_2.run();
}
let x = 0;
let y = 0;
let gradient = 0;
function setup() {
createCanvas(400, 400);
}
function draw() {
noStroke();
background(220);
let w = width / 50;
for (let i = 0; i < 50; i++) {
for (let e = 0; e < 50; e++) {
x = i * w;
y = e * w;
let d=dist(mouseX,mouseY,x,y);
let gradient = map(d,0,dist(0,0,width,height)/3,255,0)
fill(gradient);
rect(x, y, w, w);  
}
}
}var x = 0
var y = 0
function setup() {
createCanvas(600, 600);
noStroke()
drawBG();
}
}
function draw() {
noStroke();
frameRate(s);
if (mouseIsPressed) {
if (mouseX > 0 && mouseX < 300) {
for (y = 0; y < windowHeight ; y += r) {
for (x = 0; x < 300; x += r) {
if (random(1) > 0.5) {
chooseColor()
arc(x + r / 2, y, r, r, 0, PI, CHORD);
chooseColor()
arc(x + r / 2, y + r, r, r, PI, 0, CHORD);
} else {
chooseColor()
arc(x, y + r / 2, r, r, PI + HALF_PI, HALF_PI, CHORD);
chooseColor()
arc(x + r, y + r / 2, r, r, HALF_PI, PI + HALF_PI, CHORD);
}
}
}
}
if (mouseX > 300 && mouseX < 600) {
for (y = 0; y < windowHeight ; y += r) {
for (x = 300; x < 600; x += r) {
if (random(1) > 0.5) {
chooseColor()
arc(x + r / 2, y, r, r, 0, PI, CHORD);
chooseColor()
arc(x + r / 2, y + r, r, r, PI, 0, CHORD);
} else {
chooseColor()
arc(x, y + r / 2, r, r, PI + HALF_PI, HALF_PI, CHORD);
chooseColor()
arc(x + r, y + r / 2, r, r, HALF_PI, PI + HALF_PI, CHORD);
}
}
}
}
}
}
function chooseColor() {
if (random(1) > 0.75) {
fill(237, 236, 218);
} else if (random(1) > 0.5 && random(1) < 0.75) {
fill(129, 197, 174);
} else if (random(1) > 0.25 && random(1) < 0.5) {
fill(73, 73, 73)
} else {
fill(229, 106, 95)
}
}
function drawBG() {
for (y = 0; y < windowHeight; y += r) {
for (x = 0; x < windowWidth; x += r) {
if (random(1) > 0.5) {
chooseColor()
arc(x + r / 2, y, r, r, 0, PI, CHORD);
chooseColor()
arc(x + r / 2, y + r, r, r, PI, 0, CHORD);
} else {
chooseColor()
arc(x, y + r / 2, r, r, PI + HALF_PI, HALF_PI, CHORD);
chooseColor()
arc(x + r, y + r / 2, r, r, HALF_PI, PI + HALF_PI, CHORD);
}
}
}
}var x = 0
var y = 0
function setup() {
createCanvas(600, 600);
noStroke()
drawBG();
}
}
function draw() {
noStroke();
frameRate(s);
if (mouseIsPressed) {
if (mouseX > 0 && mouseX < windowWidth / 2) {
for (y = 0; y < windowHeight ; y += r) {
for (x = 0; x <= windowWidth / 2; x += r) {
if (random(1) > 0.5) {
chooseColor()
arc(x + r / 2, y, r, r, 0, PI, CHORD);
chooseColor()
arc(x + r / 2, y + r, r, r, PI, 0, CHORD);
} else {
chooseColor()
arc(x, y + r / 2, r, r, PI + HALF_PI, HALF_PI, CHORD);
chooseColor()
arc(x + r, y + r / 2, r, r, HALF_PI, PI + HALF_PI, CHORD);
}
}
}
} else {
if (mouseX > windowWidth / 2 && mouseX < windowWidth) {
for (y = 0; y < windowHeight ; y += r) {
for (x = windowWidth / 2; x < windowWidth; x += r) {
if (random(1) > 0.5) {
chooseColor()
arc(x + r / 2, y, r, r, 0, PI, CHORD);
chooseColor()
arc(x + r / 2, y + r, r, r, PI, 0, CHORD);
} else {
chooseColor()
arc(x, y + r / 2, r, r, PI + HALF_PI, HALF_PI, CHORD);
chooseColor()
arc(x + r, y + r / 2, r, r, HALF_PI, PI + HALF_PI, CHORD);
}
}
}
}
}
}
function chooseColor() {
if (random(1) > 0.75) {
fill(237, 236, 218);
} else if (random(1) > 0.5 && random(1) < 0.75) {
fill(129, 197, 174);
} else if (random(1) > 0.25 && random(1) < 0.5) {
fill(73, 73, 73)
} else {
fill(229, 106, 95)
}
}
function drawBG() {
for (y = 0; y < windowHeight; y += r) {
for (x = 0; x < windowWidth; x += r) {
if (random(1) > 0.5) {
chooseColor()
arc(x + r / 2, y, r, r, 0, PI, CHORD);
chooseColor()
arc(x + r / 2, y + r, r, r, PI, 0, CHORD);
} else {
chooseColor()
arc(x, y + r / 2, r, r, PI + HALF_PI, HALF_PI, CHORD);
chooseColor()
arc(x + r, y + r / 2, r, r, HALF_PI, PI + HALF_PI, CHORD);
}
}
}
}var x = 0;
var y = 0;
var bright0 = 0;
var refresh = false;
function setup() {
createCanvas(600, 700);
noStroke();
drawBG();
}
}
function draw() {
noStroke();
frameRate(s);
if (refresh) {
drawSemicircle()
x += r;
if (x > windowWidth - r / 2) {
y += r;
x = 0;
}
if (y >= 600 - r / 2) {
y = 0
}
}
if (mouseIsPressed) {
if (mouseX > 0 && mouseX < 300 && mouseY < 600) {
for (y = 0; y < windowHeight; y += r) {
for (x = 0; x < 300; x += r) {
drawSemicircle()
}
}
}
if (mouseX > 300 && mouseX < 600 && mouseY < 600) {
for (y = 0; y < windowHeight; y += r) {
for (x = 300; x < 600; x += r) {
drawSemicircle()
}
}
}
}
bright0 = 180;
} else {
bright0 = 255;
}
noStroke();
fill(237, 236, 218);
rect(0, 600, 600, 100);
fill(73, 73, 73, bright0);
rect(225, 625, 150, 50);
noFill();
strokeWeight(2);
stroke(73, 73, 73);
}
function mousePressed() {
if (mouseX > 225 && mouseX < 375 && mouseY > 625 && mouseY < 675) {
fill(73, 73, 73);
rect(225, 625, 150, 50);
refresh = !refresh;
}
}
function chooseColor() {
if (random(1) > 0.75) {
fill(237, 236, 218);
} else if (random(1) > 0.5 && random(1) < 0.75) {
fill(129, 197, 174);
} else if (random(1) > 0.25 && random(1) < 0.5) {
fill(73, 73, 73);
} else {
fill(229, 106, 95);
}
}
function drawSemicircle() {
if (random(1) > 0.5) {
chooseColor()
arc(x + r / 2, y, r, r, 0, PI, CHORD);
chooseColor()
arc(x + r / 2, y + r, r, r, PI, 0, CHORD);
} else {
chooseColor()
arc(x, y + r / 2, r, r, PI + HALF_PI, HALF_PI, CHORD);
chooseColor()
arc(x + r, y + r / 2, r, r, HALF_PI, PI + HALF_PI, CHORD);
}
}
function drawBG() {
for (y = 0; y < 600; y += r) {
for (x = 0; x < windowWidth; x += r) {
drawSemicircle()
}
}
}var x = 0
var y = 0
function setup() {
createCanvas(windowWidth, windowHeight);
noStroke()
drawBG();
}
}
function draw() {
noStroke();
frameRate(s);
if (random(1) > 0.5) {
chooseColor()
arc(x + r / 2, y, r, r, 0, PI, CHORD);
chooseColor()
arc(x + r / 2, y + r, r, r, PI, 0, CHORD);
} else {
chooseColor()
arc(x + r, y + r / 2, r, r, HALF_PI, PI + HALF_PI, CHORD);
chooseColor()
arc(x, y + r / 2, r, r, PI + HALF_PI, HALF_PI, CHORD);
}
x += r;
if (x > windowWidth - r / 2) {
y += r;
x = 0;
}
if (y > windowHeight - r / 2) {
y = 0
}
}
function chooseColor() {
if (random(1) > 0.75) {
fill(237,236,218);
} else if (random(1) > 0.5 && random(1) < 0.75) {
fill(129,197,174);
} else if (random(1) > 0.25 && random(1) < 0.5) {
fill(73, 73, 73)
} else  {
fill(229,106,95)
} 
}
function drawBG() {
for (y = 0; y < windowHeight; y += r) {
for (x = 0; x < windowWidth; x += r) {
if (random(1) > 0.5) {
chooseColor()
arc(x + r / 2, y, r, r, 0, PI, CHORD);
chooseColor()
arc(x + r / 2, y + r, r, r, PI, 0, CHORD);
} else {
chooseColor()
arc(x, y + r / 2, r, r, PI + HALF_PI, HALF_PI, CHORD);
chooseColor()
arc(x + r, y + r / 2, r, r, HALF_PI, PI + HALF_PI, CHORD);
}
}
}
}var x = 0
var y = 0
function setup() {
createCanvas(windowWidth, windowHeight);
noStroke()
drawBG();
}
}
function draw() {
noStroke();
frameRate(s);
if (random(1) > 0.5) {
chooseColor()
arc(x + r / 2, y, r, r, 0, PI, CHORD);
chooseColor()
arc(x + r / 2, y + r, r, r, PI, 0, CHORD);
} else {
chooseColor()
arc(x + r, y + r / 2, r, r, HALF_PI, PI + HALF_PI, CHORD);
chooseColor()
arc(x, y + r / 2, r, r, PI + HALF_PI, HALF_PI, CHORD);
}
x += r;
if (x > windowWidth - r / 2) {
y += r;
x = 0;
}
if (y > windowHeight - r / 2) {
y = 0
}
}
function chooseColor() {
if (random(1) > 0.75) {
fill(237,236,218);
} else if (random(1) > 0.5 && random(1) < 0.75) {
fill(129,197,174);
} else if (random(1) > 0.25 && random(1) < 0.5) {
fill(73, 73, 73)
} else  {
fill(229,106,95)
} 
}
function drawBG() {
for (y = 0; y < windowHeight; y += r) {
for (x = 0; x < windowWidth; x += r) {
if (random(1) > 0.5) {
chooseColor()
arc(x + r / 2, y, r, r, 0, PI, CHORD);
chooseColor()
arc(x + r / 2, y + r, r, r, PI, 0, CHORD);
} else {
chooseColor()
arc(x, y + r / 2, r, r, PI + HALF_PI, HALF_PI, CHORD);
chooseColor()
arc(x + r, y + r / 2, r, r, HALF_PI, PI + HALF_PI, CHORD);
}
}
}
}let light = false;
s = false;
function setup() {
createCanvas(600, 600);
}
function draw() {
background(220);
if (light) {
fill("red");
rect(400, 0, 200, 600);
}
if (mouseX < (2 * width) / 3 && s) {
s = false;
}
if (mouseX > (2 * width) / 3 && !s) {
light = false;
} else if (mouseX > width / 3 && mouseX < (2 * width) / 3) {
noStroke();
fill("red");
rect(200, 0, 200, 600);
} else if (mouseX < width / 3) {
noStroke();
fill("red");
rect(0, 0, 200, 600);
}
}
function mousePressed() {
if (mouseX > (2 * width) / 3) {
s = true
light = true
}
}function setup() {
createCanvas(500, 500);
}
function draw() {
background(220);
for (var i = 0; i < 10; i++) {
for (var e = 0; e < 10; e++) {
var x = i * 50;
var y = e * 50
rect(x, y, 50, 50);
if ((e + i) % 2 == 0) {
fill('black');
rect(x, y, 50, 50)
} else {
fill('white')
rect(x, y, 50, 50)
}
}
}
}function setup() {
createCanvas(500, 500);
}
function draw() {
background(220);
for (var i = 0; i < 10; i++) {
for (var e = 0; e < 10; e++) {
var x = i * 50;
var y = e * 50
rect(x, y, 50, 50);
}
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
for (var i = 0; i < width; i++) {
var x = i * width / 10;
noFill();
rect(x, 0, width / 10, height);
if (mouseX > x && mouseX < x + width / 10) {
if (i<5) {
fill('blue');
rect(x, 0, width / 10, height);
} else {
fill('red');
rect(x, 0, width / 10, height);
}
}
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
for (var i = 0; i < width; i++) {
var x = i * width / 10;
noFill();
rect(x, 0, width / 10, height);
if (mouseX > x && mouseX < x + width / 10) {
fill(255-i*10,i*20,100);
rect(x, 0, width / 10, height);
}
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
for (var i = 0; i < width; i++) {
var x = i * width / 10;
noFill();
rect(x, 0, width / 10, height);
if (mouseX > x && mouseX < x + width / 10) {
if (i%2 == 0) {
fill('blue');
rect(x, 0, width / 10, height);
} else {
fill('red');
rect(x, 0, width / 10, height);
}
}
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
for (var i = 0; i < width; i++) {
var x = i * width / 10;
noFill();
rect(x, 0, width / 10, height);
if (mouseX > x && mouseX < x + width / 10) {
if (i == 6) {
fill(220);
rect(x, 0, width / 10, height)
} else
fill('red');
rect(x, 0, width / 10, height);
}
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
for (var i = 0; i < width; i++) {
var x = i * width / 10;
noFill();
rect(x, 0, width / 10, height);
if (mouseX > x && mouseX < x + width / 10) {
fill('red');
rect(x, 0, width / 10, height);
}
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
for (let i = 0; i < 10; i++) {
let x = i * width/10;
if (i == 7) fill('blue');
else fill('white');
line(x, 0, x, height);
}
line(0, 0, 0, height);
line(width/10, 0, width/10, height);
line(2*width/10, 0, 2*width/10, height);
line(3*width/10, 0, 3*width/10, height);
line(4*width/10, 0, 4*width/10, height);
line(5*width/10, 0, 5*width/10, height);
line(6*width/10, 0, 6*width/10, height);
line(7*width/10, 0, 7*width/10, height);
line(8*width/10, 0, 8*width/10, height);
line(9*width/10, 0, 9*width/10, height);  
}let light = false;
s = false;
function setup() {
createCanvas(600, 600);
}
function draw() {
background(220);
line (400,0,400,600)
if (light) {
fill("red");
rect(400, 0, 200, 600);
}
if (mouseX < (2 * width) / 3 && s) {
s = false;
}
if (mouseX > (2 * width) / 3 && !s)  {
light = false;
}
}
function mousePressed() {
if (mouseX > (2 * width) / 3) {
s = true
light = true
}
}let x = 200;
xspeed = 10;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
ellipse(x,200,50,50)
x+=xspeed
if (x > width || x < 0){
xspeed*=-1
}
}function setup() {
createCanvas(600, 600);
}
function draw() {
background(220);
if (mouseX > (2 * width) / 3) {
noStroke();
fill("red");
rect(400, 0, 200, 600);
} else if (mouseX > width / 3) {
noStroke();
fill("red");
rect(200, 0, 200, 600);
} else {
noStroke();
fill("red");
rect(0, 0, 200, 600);
}
}let x=0
y=0
xspeed=10
yspeed=10;
function setup() {
createCanvas(400, 400);
}
function draw() {
;
ellipse(x,y,50,50)
y+=
x+=xspeed;
if (x>width||x<0) xspeed*=-1;
}
let
xspeed=0
yspeed=0
x=300
y=300
function setup() {
createCanvas(600, 600);
background(55,63,71);
}
function mouseClicked(){
background(55,63,71)
};
function draw() {
xspeed=(mouseX-x)/100;
yspeed=(mouseY-y)/100;
x+=xspeed;
y+=yspeed;
strokeWeight(0.1);
stroke(255,255,255);
noFill()
ellipse(x,y,100,100)
}
let a=0
x1=0
y1=0
x=300
y=300
o=20
let r=255
g=255
b=255
function setup() {
createCanvas(600, 600);
background(55,63,71);
}
function mouseClicked(){
background(55,63,71)
};
function draw() {
x1=mouseX-x;
y1=mouseY-y;
x=x+x1*.01;
y=y+y1*.01;
strokeWeight(0.1);
stroke(255,255,255);
noFill()
o=o+0.1
ellipse(x,y,o,o)
noStroke()
r=random(0,255)
g=random(0,255)
b=random(0,255)
fill(r,g,b,50);
a=random(0,200)
rect(0,mouseY-.5,a,1);
rect(width-a,mouseY-.5,a,1);
rect(mouseX-.5,0,1,a);
rect(mouseX-0.5,height-a,1,a);
noFill()
strokeWeight(5)
stroke(r,g,b,100)
rect(200,200,200,200)
}let x,y,w,h
let x1,y1
function setup() {
createCanvas(500, 500);
rectMode(CENTER)
x=width/2
y=height/2
w=width/2
h=height/2
}
function draw() {
background(220);
x1=mouseX-x;
y1=mouseY-y;
x=x+x1*.01;
y=y+y1*.01;
rect(x,y,w,h);
}let x=200,y=200;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
ellipse(x,y,100,100);
x=x+10
}let x,y
let x1,y1,x2,y2
function setup() {
createCanvas(300, 500);
rectMode(CENTER)
x=width/2
y=height/2
}
function draw() {
background(220);
x1=width/4
y1=height/4
x2=width/2+width/4
y2=height/2+height/4
strokeWeight(5)
beginShape();
vertex(x1,y1);
vertex(x2,y1);
vertex(x2,y2);
vertex(x1,y2);
endShape(CLOSE);
}function setup() {
createCanvas(500, 500);
}
function draw() {
background(220);
fill(250,200,0);
noStroke();
ellipse(250,300,250,300);
stroke(0);
strokeWeight(8);
line(140,100,200,160);
ellipse(140,100,50,50);
stroke(0);
strokeWeight(8);
line(360,100,300,160);
ellipse(360,100,50,50);
fill(255);
noStroke();
triangle(235,340,255,340,245,400);
fill(255);
noStroke();
triangle(255,340,275,340,265,420);
fill(250,200,0,100);
noStroke();
ellipse(100,240,130,130);
fill(250,200,0,100);
noStroke();
ellipse(100,350,130,130);
fill(250,200,0,100);
noStroke();
ellipse(400,240,130,130);
fill(250,200,0,100);
noStroke();
ellipse(400,350,130,130);
fill(255);
ellipse(250,240,150,150);
fill(0);
ellipse(250,240,100,140);
}function setup() {
createCanvas(400, 300);
}
function draw() {
background(0,255,255);
stroke(255,0,0);
strokeWeight(25);
line(0,0,400,300);
fill(0,200,0);
noStroke();
ellipse(200,150,200,150)
fill(0,0,180)
noStroke()
rect(270,120,30,30)
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
fill(64,224,208);
ellipse(200, 200, 100, 100);
}function setup() { 
createCanvas(200,200)
} 
function draw() { 
background(220);
}