var oil;
var pic;
var firstClick = 0;
function preload() {
oil = loadImage('joil.jpg');
pic = loadImage('jpic.jpg');
opening = loadSound('opening.m4a');
turtle = loadSound('turtle.m4a');
wind = loadSound('window.m4a');
bracelet = loadSound('bracelet.m4a');
couch = loadSound('couch.m4a');
dog = loadSound('dog.m4a');
vase = loadSound('vase.m4a');
hair = loadSound('hair.m4a');
house = loadSound('house.m4a');
}
function setup() {
createCanvas(860,720);
info();
}
function info(){
noStroke();
fill(255,255,255);
ellipseMode(CORNER);
ellipse(10,10,10,10); 
textSize(30);
text("↖",20,50);
}
image(oil, 0, 0);
}
function drawDots(){
textSize(40);
text("JANE + JUNIOR",10,35);
firstClick = 1;
}
function allpause(){
opening.pause();
turtle.pause();
wind.pause();
bracelet.pause();
couch.pause();
dog.pause();
vase.pause();
hair.pause();
house.pause();
}
function mousePressed() {
if(mouseX >= 10 && mouseX <= 20 && mouseY >= 10 && mouseY <= 20){
opening.play();
drawDots();
}
if(firstClick == 1){
if(mouseX >= 500 && mouseX <= 510 && mouseY >= 50 && mouseY <= 60){ 
allpause();
wind.play();
} else if(mouseX >= 750 && mouseX <= 760 && mouseY >= 150 && mouseY <= 160){
allpause();
house.play();
} else if(mouseX >= 220 && mouseX <= 230 && mouseY >= 200 && mouseY <= 210){
allpause();
hair.play();
} else if(mouseX >= 200 && mouseX <= 210 && mouseY >= 400 && mouseY <= 410){
allpause();
turtle.play();
} else if(mouseX >= 220 && mouseX <= 230 && mouseY >= 620 && mouseY <= 630){
allpause();
couch.play();
} else if(mouseX >= 400 && mouseX <= 410 && mouseY >= 200 && mouseY <= 210){
allpause();
vase.play();
} else if(mouseX >= 790 && mouseX <= 800 && mouseY >= 420 && mouseY <= 430){
allpause();
dog.play();
} else if(mouseX >= 120 && mouseX <= 130 && mouseY >= 560 && mouseY <= 570){
allpause();
bracelet.play();
}
}
}
var counter = 0;
var lemonX = 70;
var lemonY = 70;
function preload() {
img = loadImage('lemon.jpg');
img2 = loadImage('feather.png');
sound = loadSound('giggle.wav');
}
function setup() { 
createCanvas(800, 600);
} 
function draw() { 
background(255);
fill(237, 166, 158);
noStroke();
imageMode(CORNER);
image(img,lemonX,lemonY);
imageMode(CENTER);
image(img2,mouseX-40,mouseY+40);
if (counter >= 1){
textSize(16);
if(counter == 1){
text("when life gives you lemons, make lemonade",30,30);
} if(counter == 2){
text("We must accept finite disappointment, but never lose infinite hope.",30,30);
}	if(counter == 3){
text("Try to be a rainbow in someone's cloud.",30,30);
}	if(counter >= 4){
text("Out of advice, see you tomorrow.",30,30);
}
}
}
function mouseClicked() {
tickled();
}
function tickled(){
if(mouseX >= 90 && mouseX <= 270 && 
mouseY >= 80 && mouseY <= 230){
sound.play();
counter++;
}
}class Dot {
constructor() {
this.dotX = x-16;
this.dotY = random((height/2)-11.5, (height/2)+11.5);
}
drawDot() {
stroke(113, 244, 66);
point(this.dotX,this.dotY);
}
dotCrawl() {
this.dotX++;
}
dotLocationX() {
return this.dotX;
}
dotLocationY() {
return this.dotY;
}
}
var dotColony = [];
var s;
var currentS;
var x;
var y;
function setup() { 
createCanvas(400, 400);
drawComp();
} 
function draw() { 
loadingComp();
dotTimer();
}
function drawComp(){
x = width/2;
y = height/2;
rectMode(CENTER);
fill(150);
quad(x-20,y+23,x+21,y+23,x+23,y+30,x-22,y+30);
line(x-18,y+26,x+19,y+26);
fill(0);
}
function loadingComp(){
for (var i = 0; i < dotColony.length; i++) {
dotColony[i].drawDot();
dotColony[i].dotCrawl();
if (dotColony[i].dotLocationX() > x + 16) {
dotColony.shift();
}
}
}
function dotTimer() {
s = second();
if (s % 2 == 1) {
var dot = new Dot();
dotColony.push(dot);
currentS = s;
}
}
}var nina, zeniba, juliana, amelia, 
daun, jessica, jae, ellie,
sally, miguel, cheyenne, xinxin;
var linesN, linesB, linesZ, linesJu, 
linesD, linesA, linesE, linesJa,
linesJe, linesS, linesM, linesC, linesX;
var markov;
var currentText, dialogue, stageDirections;
var myFont;
function preload() {
juliana = loadStrings('Juliana.txt');
nina = loadStrings('Nina.txt');
zeniba = loadStrings('Zeniba.txt');
daun = loadStrings('Daun.txt');
amelia = loadStrings('Amelia.txt');
ellie = loadStrings('Ellie.txt');
jae = loadStrings('Jae.txt');
jessica = loadStrings('Jessica.txt');
sally = loadStrings('Sally.txt');
miguel = loadStrings('Miguel.txt');
cheyenne = loadStrings('Cheyenne.txt');
xinxin = loadStrings('Xinxin.txt');
}
function requestData(url, selector, host){
return loadJSON(currentURL);
}
function setup() {
createCanvas(600, 3200);
linesN = iterate(nina);
linesZ = iterate(zeniba);
linesJu = iterate(juliana);
linesD = iterate(daun);
linesA = iterate(amelia);
linesE = iterate(ellie);
linesJa = iterate(jae);
linesJe = iterate(jessica);
linesS = iterate(sally);
linesM = iterate(miguel);
linesC = iterate(cheyenne);
linesX = iterate(xinxin);
drawText();
}
function iterate(object) {
markov = new RiMarkov(2);
for (var key in object) {
currentText = object[key].toString();
markov.loadText(currentText);
}
lines = markov.generateSentences(3);
return lines;
}
function drawText() {
background(255);
textFont('COURIER NEW');
textSize(13);
textAlign(CENTER);
text('Decontextualized Web Text in Conversation: a Play', 50, 30, 500, 500);
textSize(10);
text('by Blair Simmons', 50, 45, 500, 500);
textAlign(LEFT);
textStyle(BOLD);
textSize(27);
text('[A FEW SCENES]', 45, 80, 500, 500);
textStyle(NORMAL);
dialogue = createDialogue();
textSize(17);
text(dialogue, 50, 90, 500, 3100);
}
function createDialogue(){
var d = '';
for (var i = 0; i < 3; i++) {
d = d + 
}
d = d + '\n\n\t\t\t\t(they exit)';
for (var j = 0; j < 3; j++) {
d = d +
}
d = d + '\n\n\t\t\t\t(they exit)';
for (var k = 0; k < 2; k++) {
d = d +
}
d = d + '\n\n\t\t\t\t(they exit)';
for (var m = 0; m < 3; m++) {
d = d + 
}
d = d + '\n\n\t\t\t\t(they exit)\n';
return d;
}
var y = 90;
function setup() { 
createCanvas(600, 650);
drawLines();
} 
function drawLines() { 
background(240);
stroke(242, 130, 136);
line(70, 0, 70, height);
for(var i = 0; i < height/29; i++){
line(0, y, width, y);
stroke(131, 177, 252);
y = y + 25;
}
y = 90;
stroke(196, 194, 194);
fill(196, 194, 194);
for(var j = 0; j < 3; j++){
ellipse(35, y, 20, 20);
y = y + (height/3);
}
}class Dot {
constructor() {
this.dotX = x-16;
this.dotY = random((height/2)-11.5, (height/2)+11.5);
}
drawDot() {
stroke(113, 244, 66);
point(this.dotX,this.dotY);
}
dotCrawl() {
this.dotX++;
}
dotLocationX() {
return this.dotX;
}
dotLocationY() {
return this.dotY;
}
}
var dotColony = [];
var s;
var currentS;
var x;
var y;
var bioLines, tweetLines,tweet2Lines, 
markov, currentText, bio, 
tweets2, tweets, dialogue = "", myFont, counter = 0;
function preload() {
}
function requestData(url, selector, host){
return loadJSON(currentURL);
}
function setup() {
createCanvas(600, 750);
drawComp();
tweetLines = iterate(tweets);
bioLines = iterate(bio);
tweetLines2 = iterate(tweets2);
}
function draw() { 
if(counter >= 5){
drawText();
return;
}
loadingComp();
dotTimer();
}
function drawComp(){
x = width/2;
y = height/2;
rectMode(CENTER);
fill(150);
quad(x-20,y+23,x+21,y+23,x+23,y+30,x-22,y+30);
line(x-18,y+26,x+19,y+26);
fill(0);
}
function loadingComp(){
for (var i = 0; i < dotColony.length; i++) {
dotColony[i].drawDot();
dotColony[i].dotCrawl();
if (dotColony[i].dotLocationX() > x + 16) {
dotColony.shift();
}
}
}
function dotTimer() {
s = second();
if (s % 2 == 1) {
var dot = new Dot();
dotColony.push(dot);
currentS = s;
counter++;
}
}
}
function iterate(object) {
markov = new RiMarkov(2);
for (var key in object) {
currentText = object[key].toString();
markov.loadText(currentText);
}
lines = markov.generateSentences(4);
return lines;
}
function drawText() {
background(222);
noStroke();
rectMode(CORNER);
textFont('COURIER NEW');
textSize(13);
textAlign(CENTER);
text('Decontextualized Web Text in Conversation: a Play', 50, 30, 500, 500);
textSize(10);
text('by Blair Simmons', 50, 45, 500, 500);
textAlign(LEFT);
textStyle(BOLD);
textSize(27);
text('[PROLOGUE]', 50, 80, 500, 500);
textSize(10);
textStyle(ITALIC);
text('to a larger project', 210, 95, 500, 500);
textStyle(NORMAL);
for (var i = 0; i < 3; i++) {
dialogue = dialogue + '\nCharacter1:\t\t' + bioLines[i] + '\n\nCharacter2:\t\t' + tweetLines[i] + '\n\nCharacter3:\t\t' + tweetLines2[i] +'\n';
}
textSize(17);
text(dialogue, 50, 90, 500, 500);
}
var stuff = "sup sup sup";
function setup() {
$.get(url, function(response) {
console.log(response);
});
}
function giveMeTextBetween(s, before, after) {
console.log("i am running giveMeTextBetween");
var found = "";
console.log(start);
if (start == -1) {
}
if (end == -1) {
}
}
function setup() {
console.log("i am loading data");
var lines = []
lines = loadStrings(url);
console.log(lines);
var html = join(lines,"");
var start = "<p>";
var end = "</p>";
var language = giveMeTextBetween(html,start,end);
console.log(language + "hiiiiii");
}
function giveMeTextBetween(s, before, after){
console.log("i am running giveMeTextBetween");
var found = "";
console.log(start);
if (start == -1){
}
if (end == -1){
}
}
var currentWord;
var url;
var data;
var txt;
var nouns;
var articles;
var adjectives;
var adverbs;
var prepositions;
var pronouns;
var verbs;
var tags;
function preload() {
txt = loadStrings('text.txt');
}
function setup() {
noCanvas();
var allWords = txt.join("/n");
var tokens = allWords.toLowerCase().split(/\W+/);
for (var i = 0; i < allWords.length; i++) {
currentWord = tokens[i];
tags = RiTa.getPosTags(currentWord);
if (tags[0] == 'nn') {
nouns.push(currentWord);
} 
}
}var currentWord;
var url;
var data;
var txt;
var nouns;
var articles;
var adjectives;
var adverbs;
var prepositions;
var pronouns;
var verbs;
var tags;
function preload() {
txt = loadStrings('text.txt');
}
function setup() {
noCanvas();
var allWords = txt.join("/n");
var tokens = allWords.toLowerCase().split(/\W+/);
for (var i = 0; i < allWords.length; i++) {
currentWord = tokens[i];
tags = RiTa.getPosTags(currentWord);
if (tags[0] == 'nn') {
nouns.push(currentWord);
} 
}
}var lines, markov, data1, data2, x = 160, y = 240;
function preload() {
data1 = loadStrings('caryl.txt');
data2 = loadStrings('FAact2.txt');
}
function setup() {
createCanvas(500, 500);
textFont('times', 16);
textAlign(LEFT);
lines = ["click to (re)generate!"];
markov = new RiMarkov(4);
markov.loadText(data1.join(' '));
markov.loadText(data2.join(' '));
drawText();
}
function drawText() {
background(250);
text(lines.join(' '), x, y, 400, 400);
}
function mouseClicked() {
x = y = 50;
lines = markov.generateSentences(2);
drawText();
}var capture;
var button;
var filterButton;
var blackWhite;
function setup() {
createCanvas(320, 240);
background(51);
capture = createCapture(VIDEO);
capture.size(320, 240);
capture.hide();
button = createButton('PIC');
filterButton = createButton('INVERT');
blackWhite = createButton('B&W');
button.mousePressed(takesnap);
filterButton.mousePressed(changeFilter);
blackWhite.mousePressed(blackAndWhite);
}
function takesnap(){
image(capture, 0, 0, width, width * capture.height / capture.width);
}
function changeFilter(){
filter(INVERT);
}
function blackAndWhite(){
filter("gray");
}
var field;
var button;
function setup() {
createCanvas(400, 300);
field = createInput();
button = createButton("Tag, you're it!");
button.mousePressed(tagText);
background(50);
textSize(24);
fill(255);
noStroke();
}
function draw() {
}
function tagText() {
background(50);
var tags = RiTa.getPosTags(field.value());
var tagStr = tags.join(" ");
text(tagStr, 10, 10, width-20, height-20);
}var data;
function preload() {
}
function setup() { 
noCanvas();
createP(data[1].text);
} var currentWord;
var url;
var data;
var txt;
var nouns;
var articles;
var adjectives;
var adverbs;
var prepositions;
var pronouns;
var verbs;
var tags;
function preload() {
txt = loadStrings('text.txt');
}
function setup() {
noCanvas();
var allWords = txt.join("/n");
var tokens = allWords.toLowerCase().split(/\W+/);
for (var i = 0; i < allWords.length; i++) {
currentWord = tokens[i];
tags = RiTa.getPosTags(currentWord);
if (tags[0] == 'nn') {
nouns.push(currentWord);
} 
}
}var txt;
var nouns;
var articles;
var adjectives;
var adverbs;
var prepositions;
var pronouns;
var verbs;
var currentWord;
function preload() {
txt = loadStrings('roastbeef.txt');
}
function setup() {
var allWords = txt.join("/n");
var tokens = allWords.toLowerCase().split(/\W+/);
httpDo(url, {
method: 'GET',
headers: {
"Accept": "application/json",
"app_id": "bf762b18",
"app_key": "8a3b432f042a3bb30f6b7de2e22b1c78"}
},
function(res){
currentWord = res;
});
noCanvas();
}
var txt = [];
var counts = {};
var keys = [];
var files = ['ROOMS.txt', 'OBJECTS.txt', 'FOOD.txt'];
var allWords = [];
function preload() {
for (var i = 0; i < files.length; i++) {
txt[i] = loadStrings(files[i]);
}
}
function setup() {
for (var n = 0; n < txt.length; n++) {
allWords[n] = txt[n].join("\n");
}
var tokens = allWords.split(/\W+/);
console.log(tokens);
for (var m = 0; m <= tokens.length; m++) {
var word = tokens[m];
if (!/\d+/.test(word)) {
if (counts[word] === undefined) {
counts[word] = 1;
keys.push(word);
} else {
counts[word]++;
}
}
}
keys.sort();
}
noCanvas();
console.log(counts);
}
1 .toLowerCase()
createCanvas(400, 400);
} 
function draw() { 
background(220);
var currentString;
function setup() {
createCanvas(windowWidth, windowHeight);
}
function gotData() {
console.log(currentString);
}
function draw() {
background(0);
fill(255);
textSize(10);
if (currentString == 1){
textSize(60);
textAlign(CENTER);
text("LANGUAGE",windowWidth/2, windowHeight/2);
}
}
function setup() {
createCanvas(500, 300);
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
background(255,255,255);
fill(0,0,0);
var data = map(latestData, 0, 1023, 0, height);
ellipse(50, data, 50, 50);
text(data, 10, 10);
}class Ant {
constructor() {
this.antX = 0;
this.antY = random(0, height);
this.antL = this.antC * (2 / 3);
this.whichLeg = 0;
}
drawAnt() {
ellipseMode(CENTER);
fill(0);
stroke(0);
line(this.antX - (this.antC * 2), this.antY + this.antC, this.antX - (this.antC * 2), this.antY - this.antC);
line(this.antX - this.antC, this.antY + this.antC, this.antX - this.antC, this.antY - this.antC);
noFill();
arc(this.antX, this.antY - (this.antC / 2), this.antC * 1.5, this.antC, 5.5, 1);
arc(this.antX, this.antY + (this.antC / 2), this.antC * 1.5, this.antC, 5.5, 0.6);
}
antCrawl() {
this.antX++;
}
antLocationX() {
return this.antX;
}
antLocationY() {
return this.antY;
}
}
class Bite {
constructor(x, y) {
this.x = x;
this.y = y;
this.c = 4;
}
drawBite() {
ellipseMode(CENTER);
fill(255);
stroke(255);
ellipse(this.x, this.y, this.c, this.c);
}
}
var antColony = [];
var bites = [];
var s;
var currentS;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(255);
creamsicle();
drawAllAnts();
antTimer();
}
function creamsicle() {
fill(255, 181, 63);
noStroke();
ellipseMode(CENTER);
rectMode(CENTER);
ellipse(200, 150, 100, 100);
rect(200, 200, 100, 100);
fill(255, 211, 145);
ellipse(240, 150, 5, 5);
fill(255);
rect(200, 240, 80, 10);
fill(204, 167, 110);
rect(200, 275, 20, 70);
ellipse(200, 310, 20, 20);
}
function antTimer() {
s = second();
if (s == 0 || s == 4 || s == 5 || s == 8 || s == 10 || s == 13 || s == 15 || s == 20 || s == 25 || s == 27 || s == 30 || s == 33 || s == 35 || s == 40 || s == 45 || s == 50 || s == 55) {
var ant = new Ant();
antColony.push(ant);
currentS = s;
}
}
}
function onCreamsicle(x, y) {
if (x >= 150 && x <= 250 && y >= 100 && y <= 250) {
var bite = new Bite(x, y);
bites.push(bite);
}
}
function drawAllAnts() {
for (var j = 0; j < bites.length; j++) {
bites[j].drawBite();
}
for (var i = 0; i < antColony.length; i++) {
antColony[i].drawAnt();
antColony[i].antCrawl();
onCreamsicle(antColony[i].antLocationX(), antColony[i].antLocationY());
if (antColony[i].antLocationX() > width + 100) {
antColony.shift();
}
}
}
function mousePressed() {
var ant = new Ant();
antColony.push(ant);
for (var i =antColony.length-1; i >-1; i--) {
var x = antColony[i].antLocationX();
var y = antColony[i].antLocationY();
if (mouseX <= x + 5 && mouseX >= x - 20 && mouseY <= y + 5 && mouseY >= y - 5) {
antColony.splice(i, 1);
}
}
}var antX = 300;
var antY = 200;
var antL = antC * (2/3);
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
ellipseMode(CENTER);
fill(0);
noFill();
arc(antX,antY-(antC/2),antC*1.5,antC,5.5,1);
arc(antX,antY+(antC/2),antC*1.5,antC,5.5,0.6);
line(antX-(antC*2),antY+antC,antX-(antC*2),antY-antC);
line(antX-(antC*2)-(antC/2),antY+antC,antX-(antC*2)+(antC/2),antY-antC);
line(antX-(antC*2)-(antC/2),antY-antC,antX-(antC*2)+(antC/2),antY+antC);
line(antX-(antC/2),antY+antC,antX-(antC*2)+(antC/2),antY-antC);
line(antX-(antC*2)+(antC/2),antY+antC,antX-antC+(antC/2),antY-antC);
}let allRays = [];
let angle = 0;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
for (var i = 0; i < allRays.length; i++) {
allRays[i].move();
allRays[i].check();
allRays[i].show();
}
translate(width / 2, height / 2);
rotate(angle);
ellipse(0, 0, 40, 20);
}
class Ray {
constructor(x, y, startAngle) {
this.origin = x;
this.origin = y;
this.distance = 0;
this.angle = startAngle;
this.stillOnScreen = true;
this.speed = 1;
}
move() {
this.distance = this.distance + this.speed;
this.speed = this.speed + this.distance / 100;
}
check() {
this.stillOnScreen = (this.distance < width / 2);
}
show() {
fill(255, 0, 0, 255 - this.distance * 2);
stroke(255, 0, 0, 255 - this.distance * 2);
if (this.stillOnScreen) {
for (var i = 0; i < 10; i++) {
var x = this.origin + (this.distance + i * 10) * cos(this.angle);
var y = this.origin + (this.distance + i * 10) * sin(this.angle);
ellipse(x, y, 2 + i * 2, 2 + i * 2);
}
}
}
}
function keyPressed() {
if (keyCode == LEFT_ARROW) {
angle = angle + 0.1;
} else if (keyCode == RIGHT_ARROW) {
angle = angle - 0.1;
} else if (keyCode == UP_ARROW) {
allRays.push(new Ray(width / 2, height / 2, angle));
}
}let allRays = [];
let angle = 0;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
for (var i = 0; i < allRays.length; i++) {
allRays[i].move();
allRays[i].check();
allRays[i].show();
}
translate(width / 2, height / 2);
rotate(angle);
ellipse(0, 0, 40, 20);
}
class Ray {
constructor(x, y, startAngle) {
this.origin = x;
this.origin = y;
this.distance = 0;
this.angle = startAngle;
this.stillOnScreen = true;
this.speed = 1;
}
move() {
this.distance = this.distance + this.speed;
this.speed = this.speed + this.distance / 100;
}
check() {
this.stillOnScreen = (this.distance < width / 2);
}
show() {
fill(255, 0, 0, 255 - this.distance * 2);
stroke(255, 0, 0, 255 - this.distance * 2);
if (this.stillOnScreen) {
for (var i = 0; i < 10; i++) {
var x = this.origin + (this.distance + i * 10) * cos(this.angle);
var y = this.origin + (this.distance + i * 10) * sin(this.angle);
ellipse(x, y, 2 + i * 2, 2 + i * 2);
}
}
}
}
function keyPressed() {
if (keyCode == LEFT_ARROW) {
angle = angle + 0.1;
} else if (keyCode == RIGHT_ARROW) {
angle = angle - 0.1;
} else if (keyCode == UP_ARROW) {
allRays.push(new Ray(width / 2, height / 2, angle));
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
constructor(x, y) {
this.x = x;
this.y = y;
this.len = random(10, 100);
this.wid = random(10, 100);
this.r = random(0, 255);
this.g = random(0, 255);
this.b = random(0, 255);
}
drawSquare() {
rectMode(CENTER);
fill(this.r, this.g, this.b);
noStroke();
rect(this.x, this.y, this.len, this.wid);
}
}
var squares = [];
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
drawAllSquares();
}
function drawAllSquares() {
for (var i = 0; i < squares.length; i++) {
squares[i].drawSquare();
}
}
function mousePressed() {
var square = new Square(mouseX, mouseY);
squares.push(square);
}var count = 0;
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
function Fader(x, y1, y2, colour) {
strokeWeight(4);
line(x, y1, x, y2);
var flagX, flagY;
if (mouseX > x - 22 && mouseX < x + 22) {
flagX = true;
}
if (mouseY > y1 - 1  && mouseY < y2 + 1) {
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
Slide the circle back and forth until the game is over
Object of the game? Slide until the slider disapears
into the background....
The fact that the slider is a slider is a 'red herring' 
of sorts
var slideX;
var fixedSlideY;
var col = {
r: 59,
g: 99,
b: 122
}
var isEnd;
function setup() {
createCanvas(400, 400);
isEnd = 0;
}
function draw() {
drawSlider(100, 300);
isItTheEnd();
}
function drawSlider(x, y) {
background(col.r, col.g, col.b);
ellipseMode(CENTER);
strokeWeight(2);
stroke(255);
fill(255);
line(x, 200, y, 200);
ellipse(slideX, fixedSlideY, 30, 30);
}
function isItTheEnd() {
if (isEnd == 1) {
fill(0);
textSize(40);
text("THE END", 110, 220);
}
}
function mouseDragged() {
if (mouseX <= (slideX + 15) && mouseX >= (slideX - 15) && mouseY <= (fixedSlideY + 15) && mouseY >= (fixedSlideY - 15)) {
slideX = mouseX;
col.r += 0.5;
col.g += 0.5;
col.b += 0.5;
if (slideX <= 100) {
slideX = 100;
} else if (slideX >= 300) {
slideX = 300;
}
}
if (col.r >= 255 && col.r >= 255 && col.b >= 255) {
isEnd = 1;
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(255);
ellipseMode(CENTER);
var mouseXdraw = mouseX;
var mouseYdraw = mouseY;
noStroke();
fill(66, 134, 244,100); 
for (let i = 0; i <= width; i += 40) {
ellipse(mouseXdraw, i, 30, 30);
mouseXdraw += 40;
for (let j = 0; j <= width; j += 40) {
ellipse(mouseXdraw-40, j, 30, 30);
}
}
fill(244, 65, 163,100);
for (let i = 0; i <= height; i += 40) {
ellipse(i, mouseYdraw, 30, 30);
mouseYdraw += 40;
for (let j = 0; j <= height; j += 40) {
ellipse(j, mouseYdraw-40, 30, 30);
}
}
}var eggW = 20;
var eggH = 30;
var eggX = 300;
var eggY = 300;
function setup() {
createCanvas(400, 400);
}
function draw() {
strokeWeight(1);
fill(255, 215, 0);
arc(eggX, eggY, eggW, eggH,6.3,3.1,CLOSE);
line(eggX-(eggW/2),eggY,eggX-eggW/5,eggY+(eggH/6));   
line(eggX-eggW/5,eggY+(eggH/6),eggX,eggY);
line(eggX,eggY,eggX+eggW/5,eggY+(eggH/6));
line(eggX+eggW/5,eggY+(eggH/6),eggX+(eggW/2)-1,eggY);
noStroke();
fill(255);
triangle(eggX-(eggW/2),eggY,eggX-eggW/5,eggY+(eggH/6),eggX,eggY);
triangle(eggX,eggY,eggX+eggW/5,eggY+(eggH/6),eggX+(eggW/2),eggY);
stroke();
strokeWeight(2);
fill(0);
}var col;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
col = map(mouseX,0,400,0,255);
fill(col);
ellipse(mouseX-20,mouseY+20,50,50);
var chicken = {
x: -30,
y: (Math.random() * 200) + 70,
}
var eggX;
var eggY;
var eggCounter;
var chickenSpeed;
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
}
function draw() {
frameRate(chickenSpeed);
background(26, 148, 49);
nest();
laidEgg();
drawChicken();
chickenWalking();
}
function nest() {
fill(170, 107, 51);
ellipseMode(CENTER);
ellipse(200, 385, 70, 30);
fill(255, 215, 0);
ellipse(200, 360, 40, 60);
fill(0);
textSize(20);
textAlign(CENTER);
text(eggCounter, 200, 365);
}
function laidEgg() {
if (isEgg == 1) {
fill(255, 215, 0);
ellipse(eggX, eggY, 20, 30);
eggY++;
}
}
function mousePressed() {
if (mouseX <= chicken.x + 33 && mouseX >= chicken.x - 33 && mouseY <= chicken.y + 40 && mouseY >= chicken.y - 40) {
plopSound.setVolume(0.5);
plopSound.play();
fill(255, 215, 0);
ellipse(chicken.x, chicken.y + 35, 20, 30);
eggX = chicken.x;
eggY = chicken.y + 35;
isEgg = 1;
eggCounter++;
chickenSpeed = chickenSpeed + 10;
chicken.x += 15;
chickSoundShort.setVolume(0.5);
chickSoundShort.play();
}
}
function chickenWalking() {
if (chicken.x == -30) {
chicken.x++;
} else if (chicken.x == 450 || chicken.y == 300) {
chicken.x = -30;
chicken.y = (Math.random() * 200) + 70;
} else if (chicken.x >= -29) {
chicken.x++;
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
function setup() { 
createCanvas(400, 400);
myColor = 0;
} 
function draw() { 
fill(myColor);
ellipse(mouseX,mouseY,mouseX,mouseY);
myColor = myColor + 1; 
if(mouseX == 300){
myColor = 0;
}
}function setup() {
createCanvas(400, 400);
smooth();
}
function draw() {
background(91, 219, 153);
noFill();
stroke(230);
strokeWeight(1);
line(180, 100, 196, 160);
line(196, 160, 197, 170);
line(197, 170, 199, 180);
line(199, 180, 209, 205);
line(209, 205, 219, 235);
arc(202, 289, 50, 150, 5, 6.7);
arc(203, 320, 50, 150, 5.6, 7.5);
arc(59, 250, 150, 195, 1, 1.75);
arc(180, 300, 170, 100, 2, 3.14159);
line(106, 325, 108, 370);
line(92, 250, 94, 300);
arc(310, 330, 10, 5, 3.5, 1);
line(309, 330, 307, 340);
line(313, 334, 312, 339);
arc(319, 337.5, 5, 6, 1, 5);
triangle(323, 340, 324.5, 335, 326, 340);
arc(331, 336, 6, 3.5, 1, 6);
arc(331, 339, 6, 3.5, 5.5, 3);
arc(338, 336, 6, 3.5, 1, 6);
arc(338, 339, 6, 3.5, 5.5, 3);
ellipse(346, 337.5, 6, 6);
}