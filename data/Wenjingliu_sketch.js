var body, leg, LHand, RHand, face;
var bandaid, hair, spike, dot;
var bodyX, bodyY, bodyW, bodyH;
let happiness = [];
let sadness = [];
let angers = [];
let surprises = [];
let happyRatio = 1;
let angryRatio = 1.78;
let sadRatio = 1;
let surpriseRatio = 1;
let eyesRatio = 1.78;
let ex, ey, ew, eh;
let xs = [];
let ys = [];
let f1x, f1y, f2x, f2y, c;
let cx1, cx2, cy1, cy2;
let scale = 0.5;
let bellyInflate = 1;
let happyData, sadData, angryData, surpriseData;
let happyObject, sadObject, angryObject, surpriseObject;
let happyCount, sadCount, angryCount, surpriseCount;
let boxX,boxY;
function preload() {
body = loadImage('body.png');
leg = loadImage('leg.png');
LHand = loadImage('handL.png');
RHand = loadImage('handR.png');
face = loadImage('face.png');
dialogBox = loadImage('dialogueBox.png');
bandage = loadImage('bandage.png');
hair = loadImage('hair.png');
spike = loadImage('spike.png');
dot = loadImage('dot.png');
}
function setup() {
createCanvas(windowWidth, windowHeight);
happyObject = happyData;
sadObject = sadData;
angryObject = angryData;
surpriseObject = surpriseData;
happyCount = Object.keys(happyObject).length;
sadCount = Object.keys(sadObject).length;
angryCount = Object.keys(angryObject).length;
surpriseCount = Object.keys(surpriseObject).length;
console.log("done");
boxX = 0.6*windowWidth;
boxY = 0.4*windowHeight;
image(dialogBox, boxX, boxY);
let totalCount = happyCount + sadCount + angryCount + surpriseCount;
let scale = map(totalCount,0,50,0.2,0.8);
let bellyInflate = map(happyCount,0,25,1,2);
for (var i = 0; i < happyCount; i++) {  
$( "#memories" ).append( "<p id=\"happy"+i+"\">"+happyData[i].happy+"</p>" );
}
for (var j = 0; j < sadCount; j++) {  
$( "#memories" ).append( "<p id=\"sad"+j+"\">"+sadData[j].sad+"</p>" );
}
for (var k = 0; k < angryCount; k++) {  
$( "#memories" ).append( "<p id=\"angry"+k+"\">"+angryData[k].angry+"</p>" );
}
for (var l = 0; l < surpriseCount; l++) {  
$( "#memories" ).append( "<p id=\"surprise"+l+"\">"+surpriseData[l].surprised+"</p>" );
}
imageMode(CENTER);
bodyX = width / 3;
bodyY = height / 2;
bodyW = 966 *scale;
bodyH = 1189 *scale;
ex = bodyX * 1.03;
ey = bodyY * 0.95;
ew = round(bodyW / 1.75);
eh = round(bodyH / 1.15);
c =  round(sqrt(sq(eh / 2) - sq(ew / 2)));
f1x = ex;
f1y = ey - c;
f2x = ex;
f2y = ey + c;
for (let x = floor(ex - ew / 2); x < floor(ex + ew / 2); x += 1) {
for (let y = floor(ey - eh / 2); y < floor(ey + eh / 2); y += 1) {
let d = round(dist(x, y, f1x, f1y) + dist(x, y, f2x, f2y));
if (d == eh) {
xs.push(x);
ys.push(y);
}
}
}
cx1 = -bodyW / 5;
cx2 = bodyW / 4;
cy1 = -bodyH / 12;
cy2 = bodyH / 3.5;
background(220);
drawMonster();
createHappy();
createSad();
createAnger();
createSurprise();
}
function draw() {
hover();
}
function createHappy(){
while (happiness.length < happyCount){
var newHappy = {
x:bodyX+random(cx1,cx2),
y:bodyY+random(cy1,cy2),
w:bodyW/random(20,30),
h:bodyW/random(20,30)
}
let overlapping = false;
for (let j = 0; j <happiness.length; j++){
let other = happiness[j];
let d = dist (newHappy.x,newHappy.y,other.x,other.y);
if (d < newHappy.w/2 + other.w/2){
overlapping = true; 
}
}
for (let j = 0; j <sadness.length; j++){
let other = sadness[j];
let d = dist (newHappy.x,newHappy.y,other.x,other.y);
if (d < newHappy.w/2 + other.w/2){
overlapping = true; 
} 
}
if (!overlapping){
happiness.push(newHappy); 
}
}
for (let i =0; i <happiness.length; i ++){
image(dot, happiness[i].x,happiness[i].y,happiness[i].w,happiness[i].h);
}
}
function createSad(){
while (sadness.length < sadCount){
var newSad = {
x:bodyX + random(-bodyW / 6, bodyW / 5),
y:bodyY + random(-bodyH / 12, bodyH / 5),
w:bodyW / random(4, 10),
h:(bodyW / random(4, 10))* sadRatio,
s: 1, 
angle:random(-45, 45)
}
let overlapping = false;
for (let j = 0; j <sadness.length; j++){
let other = sadness[j];
let d = dist (newSad.x,newSad.y,other.x,other.y);
if (d < newSad.w/2 + other.w/2){
overlapping = true; 
} 
}
for (let k = 0; k <happiness.length; k++){
let other = happiness[k];
let d = dist (newSad.x,newSad.y,other.x,other.y);
if (d < newSad.w/2 + other.w/2){
overlapping = true; 
} 
}
if (!overlapping){
sadness.push(newSad); 
}
}
for (let i =0; i <sadness.length; i ++){
push();
translate(sadness[i].x, sadness[i].y);
angleMode(DEGREES);
rotate(sadness[i].angle);
let pw = sadness[i].w * sadness[i].s;
let ph = sadness[i].h * sadness[i].s;
image(bandage, 0, 0, pw, ph);
pop();
}
}
function createAnger(){
while (angers.length < angryCount){
let index = int(random(0, xs.length));
var newAnger = {  
x:xs[index],
y:ys[index],
w:bodyW / random(4, 10),
h:(bodyW / random(4, 10)) * angryRatio,
angle: atan((xs[index] - ex) / (ey - ys[index])),
s: 1
}
let overlapping = false;
for (let j = 0; j <angers.length; j++){
let other = angers[j];
let d = dist (newAnger.x,newAnger.y,other.x,other.y);
if (d < newAnger.w/2 + other.w/2){
overlapping = true; 
} 
}
for (let j = 0; j <surprises.length; j++){
let other = surprises[j];
let d = dist (newAnger.x,newAnger.y,other.x,other.y);
if (d < newAnger.w + other.w){
overlapping = true; 
} 
}
if (!overlapping){
angers.push(newAnger); 
}
}
for (let i = 0; i < angers.length; i ++){
push();
translate(angers[i].x, angers[i].y);
if (angers[i].y <= ey) {
rotate(angers[i].angle);
} else if (angers[i].y >= ey) {
rotate(angers[i].angle+180);
}
let pw = angers[i].w * angers[i].s;
let ph = angers[i].h * angers[i].s;
image(spike, 0, 0, pw, ph);
pop();
}
}
function createSurprise(){
while (surprises.length < surpriseCount){
let index = floor(random(1, xs.length));
var newSurprise = {  
x:xs[index],
y:ys[index],
w:bodyW / random(4, 8),
h: (bodyW / random(4, 8)) * surpriseRatio,
angle: atan((xs[index] - ex) / (ey - ys[index])),
s: 1    
}
let overlapping = false;
for (let j = 0; j <surprises.length; j++){
let other = surprises[j];
let d = dist (newSurprise.x,newSurprise.y,other.x,other.y);
if (d < newSurprise.w/2 + other.w/2){
overlapping = true; 
} 
}
for (let j = 0; j <angers.length; j++){
let other = angers[j];
let d = dist (surprises.x,surprises.y,other.x,other.y);
if (d < newSurprise.w + other.w){
overlapping = true; 
} 
}
if (!overlapping){
surprises.push(newSurprise); 
}
}
for (let i = 0; i < surprises.length; i ++){
push();
translate(surprises[i].x, surprises[i].y)
if (surprises[i].y < ey) {
rotate(surprises[i].angle);
} else if (surprises[i].y >= ey) {
rotate(surprises[i].angle + 180);
}
let pw = surprises[i].w * surprises[i].s;
let ph = surprises[i].h * surprises[i].s;
image(hair, 0, 0, pw, ph);    
pop();
}
}
function hover() {
for (let i =0; i <happiness.length; i ++){
let d = dist (mouseX,mouseY,happiness[i].x,happiness[i].y)
if (d < happiness[i].w/2){
$("#happy"+i).css("opacity","1");
} else{
$("#happy"+i).css("opacity","0");
}
}
for (let j =0; j <sadness.length; j ++){
let d = dist (mouseX,mouseY,sadness[j].x,sadness[j].y)
if (d < sadness[j].w/2){
$("#sad"+j).css("opacity","1");
} else{
$("#sad"+j).css("opacity","0");
}
}
for (let j =0; j <angers.length; j ++){
let d = dist (mouseX,mouseY,angers[j].x,angers[j].y)
if (d < angers[j].w/2){
$("#angry"+j).css("opacity","1");
} else{
$("#angry"+j).css("opacity","0");
}
}
for (let j =0; j < surprises.length; j ++){
let d = dist (mouseX,mouseY,surprises[j].x,surprises[j].y)
if (d < surprises[j].w/2){
$("#surprise"+j).css("opacity","1");
} else{
$("#surprise"+j).css("opacity","0");
}
}
}
function drawMonster() {
bodyW = body.width * scale;
bodyH = body.height * scale;
image(body, bodyX, bodyY, bodyW * bellyInflate, bodyH);
image(leg, bodyX + bodyW / 4.4, bodyY + bodyH / 2.97, leg.width * scale, leg.height * scale);
image(leg, bodyX - bodyW / 19.32, bodyY + bodyH / 2.77, leg.width * scale, leg.height * scale);
push();
translate(bodyX + bodyW / 2.9, bodyY + bodyH / 7.43);
rotate(-0.2);
image(LHand, 20 * sq(bellyInflate), 0, LHand.width * scale, LHand.height * scale);
pop();
push();
translate(bodyX - bodyW / 4.39, bodyY + bodyH / 5.95);
rotate(0.1);
image(RHand, -20 * (bellyInflate), 0, RHand.width * scale, RHand.height * scale);
pop();
image(bandage, bodyX - bodyW / 12, bodyY + bodyH / 10, bandage.width * scale, bandage.height * scale);
stroke(255);
strokeWeight(8);
point(bodyX - bodyW / 15, bodyY - bodyH / 4);
point(bodyX + bodyW / 9, bodyY - bodyH / 3.8);
let adjust = 0;
let ankley = 0;
let adjustLx = 0;
let adjustLy = 0;
let adjustRx = 0;
let adjustRy = 0;
let mouthX = bodyX + bodyW / 25;
let mouthY = bodyY / 1.4;
noFill();
stroke(255);
strokeWeight(2);
beginShape();
curveVertex(mouthX - bodyW / 500 + adjust, mouthY + adjust / 4);
curveVertex(mouthX - bodyW / 60, mouthY);
curveVertex(mouthX, mouthY - adjust);
curveVertex(mouthX + bodyW / 60, mouthY);
curveVertex(mouthX + bodyW / 500 - adjust, mouthY + adjust / 4);
endShape();
}
function showGuide() {
noFill();
stroke(255);
let lx1 = bodyX + cx1;
let lx2 = bodyX + cx2;
let lx3 = bodyY + cy1;
let lx4 = bodyY + cy2;
line(lx1, 0, lx1, height);
line(lx2, 0, lx2, height);
line(0, lx3, width, lx3);
line(0, lx4, width, lx4);
ellipse(ex, ey, ew, eh);
ellipse(f1x, f1y, 5, 5);
ellipse(f2x, f2y, 5, 5);
ellipse(bodyX + 105, bodyY + 200, 60, 180);
ellipse(bodyX - 35, bodyY + 235, 60, 150);
}var body, leg, LHand, RHand, face;
var bandaid, hair, spike, dot;
var bodyX, bodyY, bodyW, bodyH;
let happiness = [];
let sadness = [];
let angers = [];
let surprises = [];
let happyRatio = 1;
let angryRatio = 1.78;
let sadRatio = 1;
let surpriseRatio = 1;
let eyesRatio = 1.78;
let ex, ey, ew, eh;
let xs = [];
let ys = [];
let f1x, f1y, f2x, f2y, c;
let cx1, cx2, cy1, cy2;
let scale = 0.5;
let bellyInflate = 1;
let happyData, sadData, angryData, surpriseData;
let happyObject, sadObject, angryObject, surpriseObject;
let happyCount, sadCount, angryCount, surpriseCount;
let database = [];
let databaseCount=0;
let loading = true;
var loadingAnimation;
var loadedBkg;
function loadData(url){
loadJSON(url,gotData);
function gotData(data){
database.push(data);
databaseCount++;
if (databaseCount == 4){
loading = false;
}
}
}
function preload() {
body = loadImage('body.png');
leg = loadImage('leg.png');
LHand = loadImage('handL.png');
RHand = loadImage('handR.png');
face = loadImage('face.png');
bandage = loadImage('bandage.png');
hair = loadImage('hair.png');
spike = loadImage('spike.png');
dot = loadImage('dot.png');
}
function setup() {
createCanvas(windowWidth, windowHeight);
clear();
for (let i =0 ; i<4; i++){
loadData(urls[i]);    
} 
loadingAnimation = select('.bubbles-wrapper');
loadedBkg = select('.danBkg');
happyObject = database[0];
sadObject = database[1];
angryObject = database[2];
surpriseObject = database[3];
happyCount = Object.keys(happyObject).length;
sadCount = Object.keys(sadObject).length;
angryCount = Object.keys(angryObject).length;
surpriseCount = Object.keys(surpriseObject).length;
let totalCount = happyCount + sadCount + angryCount + surpriseCount;
let scale = map(totalCount,0,50,0.2,0.8);
let bellyInflate = map(happyCount,0,25,1,2);
for (var i = 0; i < happyCount; i++) {  
$( "#memories" ).append( "<p id=\"happy"+i+"\">"+happyData[i].happy+"</p>" );
}
for (var j = 0; j < sadCount; j++) {  
$( "#memories" ).append( "<p id=\"sad"+j+"\">"+sadData[j].sad+"</p>" );
}
for (var k = 0; k < angryCount; k++) {  
$( "#memories" ).append( "<p id=\"angry"+k+"\">"+angryData[k].angry+"</p>" );
}
for (var l = 0; l < surpriseCount; l++) {  
$( "#memories" ).append( "<p id=\"surprise"+l+"\">"+surpriseData[l].surprised+"</p>" );
}
imageMode(CENTER);
bodyX = width / 3;
bodyY = height / 2;
bodyW = 966 *scale;
bodyH = 1189 *scale;
ex = bodyX * 1.03;
ey = bodyY * 0.95;
ew = round(bodyW / 1.75);
eh = round(bodyH / 1.15);
c =  round(sqrt(sq(eh / 2) - sq(ew / 2)));
f1x = ex;
f1y = ey - c;
f2x = ex;
f2y = ey + c;
for (let x = floor(ex - ew / 2); x < floor(ex + ew / 2); x += 1) {
for (let y = floor(ey - eh / 2); y < floor(ey + eh / 2); y += 1) {
let d = round(dist(x, y, f1x, f1y) + dist(x, y, f2x, f2y));
if (d == eh) {
xs.push(x);
ys.push(y);
}
}
}
cx1 = -bodyW / 5;
cx2 = bodyW / 4;
cy1 = -bodyH / 12;
cy2 = bodyH / 3.5;  
}
function draw() {
background(220);
drawMonster();
createHappy();
createSad();
createAnger();
createSurprise();
hover();
}
function createHappy(){
while (happiness.length < happyCount){
var newHappy = {
x:bodyX+random(cx1,cx2),
y:bodyY+random(cy1,cy2),
w:bodyW/random(20,30),
h:bodyW/random(20,30)
}
let overlapping = false;
for (let j = 0; j <happiness.length; j++){
let other = happiness[j];
let d = dist (newHappy.x,newHappy.y,other.x,other.y);
if (d < newHappy.w/2 + other.w/2){
overlapping = true; 
}
}
for (let j = 0; j <sadness.length; j++){
let other = sadness[j];
let d = dist (newHappy.x,newHappy.y,other.x,other.y);
if (d < newHappy.w/2 + other.w/2){
overlapping = true; 
} 
}
if (!overlapping){
happiness.push(newHappy); 
}
}
for (let i =0; i <happiness.length; i ++){
image(dot, happiness[i].x,happiness[i].y,happiness[i].w,happiness[i].h);
}
}
function createSad(){
while (sadness.length < sadCount){
var newSad = {
x:bodyX + random(-bodyW / 6, bodyW / 5),
y:bodyY + random(-bodyH / 12, bodyH / 5),
w:bodyW / random(4, 10),
h:(bodyW / random(4, 10))* sadRatio,
s: 1, 
angle:random(-45, 45)
}
let overlapping = false;
for (let j = 0; j <sadness.length; j++){
let other = sadness[j];
let d = dist (newSad.x,newSad.y,other.x,other.y);
if (d < newSad.w/2 + other.w/2){
overlapping = true; 
} 
}
for (let k = 0; k <happiness.length; k++){
let other = happiness[k];
let d = dist (newSad.x,newSad.y,other.x,other.y);
if (d < newSad.w/2 + other.w/2){
overlapping = true; 
} 
}
if (!overlapping){
sadness.push(newSad); 
}
}
for (let i =0; i <sadness.length; i ++){
push();
translate(sadness[i].x, sadness[i].y);
angleMode(DEGREES);
rotate(sadness[i].angle);
let pw = sadness[i].w * sadness[i].s;
let ph = sadness[i].h * sadness[i].s;
image(bandage, 0, 0, pw, ph);
pop();
}
}
function createAnger(){
while (angers.length < angryCount){
let index = int(random(0, xs.length));
var newAnger = {  
x:xs[index],
y:ys[index],
w:bodyW / random(4, 10),
h:(bodyW / random(4, 10)) * angryRatio,
angle: atan((xs[index] - ex) / (ey - ys[index])),
s: 1
}
let overlapping = false;
for (let j = 0; j <angers.length; j++){
let other = angers[j];
let d = dist (newAnger.x,newAnger.y,other.x,other.y);
if (d < newAnger.w/2 + other.w/2){
overlapping = true; 
} 
}
for (let j = 0; j <surprises.length; j++){
let other = surprises[j];
let d = dist (newAnger.x,newAnger.y,other.x,other.y);
if (d < newAnger.w + other.w){
overlapping = true; 
} 
}
if (!overlapping){
angers.push(newAnger); 
}
}
for (let i = 0; i < angers.length; i ++){
push();
translate(angers[i].x, angers[i].y);
if (angers[i].y <= ey) {
rotate(angers[i].angle);
} else if (angers[i].y >= ey) {
rotate(angers[i].angle+180);
}
let pw = angers[i].w * angers[i].s;
let ph = angers[i].h * angers[i].s;
image(spike, 0, 0, pw, ph);
pop();
}
}
function createSurprise(){
while (surprises.length < surpriseCount){
let index = floor(random(1, xs.length));
var newSurprise = {  
x:xs[index],
y:ys[index],
w:bodyW / random(4, 8),
h: (bodyW / random(4, 8)) * surpriseRatio,
angle: atan((xs[index] - ex) / (ey - ys[index])),
s: 1    
}
let overlapping = false;
for (let j = 0; j <surprises.length; j++){
let other = surprises[j];
let d = dist (newSurprise.x,newSurprise.y,other.x,other.y);
if (d < newSurprise.w/2 + other.w/2){
overlapping = true; 
} 
}
for (let j = 0; j <angers.length; j++){
let other = angers[j];
let d = dist (surprises.x,surprises.y,other.x,other.y);
if (d < newSurprise.w + other.w){
overlapping = true; 
} 
}
if (!overlapping){
surprises.push(newSurprise); 
}
}
for (let i = 0; i < surprises.length; i ++){
push();
translate(surprises[i].x, surprises[i].y)
if (surprises[i].y < ey) {
rotate(surprises[i].angle);
} else if (surprises[i].y >= ey) {
rotate(surprises[i].angle + 180);
}
let pw = surprises[i].w * surprises[i].s;
let ph = surprises[i].h * surprises[i].s;
image(hair, 0, 0, pw, ph);    
pop();
}
}
function hover() {
for (let i =0; i <happiness.length; i ++){
let d = dist (mouseX,mouseY,happiness[i].x,happiness[i].y)
if (d < happiness[i].w/2){
$("#happy"+i).css("opacity","1");
} else{
$("#happy"+i).css("opacity","0");
}
}
for (let j =0; j <sadness.length; j ++){
let d = dist (mouseX,mouseY,sadness[j].x,sadness[j].y)
if (d < sadness[j].w/2){
$("#sad"+j).css("opacity","1");
} else{
$("#sad"+j).css("opacity","0");
}
}
for (let j =0; j <angers.length; j ++){
let d = dist (mouseX,mouseY,angers[j].x,angers[j].y)
if (d < angers[j].w/2){
$("#angry"+j).css("opacity","1");
} else{
$("#angry"+j).css("opacity","0");
}
}
for (let j =0; j < surprises.length; j ++){
let d = dist (mouseX,mouseY,surprises[j].x,surprises[j].y)
if (d < surprises[j].w/2){
$("#surprise"+j).css("opacity","1");
} else{
$("#surprise"+j).css("opacity","0");
}
}
}
function drawMonster() {
bodyW = body.width * scale;
bodyH = body.height * scale;
image(body, bodyX, bodyY, bodyW * bellyInflate, bodyH);
image(leg, bodyX + bodyW / 4.4, bodyY + bodyH / 2.97, leg.width * scale, leg.height * scale);
image(leg, bodyX - bodyW / 19.32, bodyY + bodyH / 2.77, leg.width * scale, leg.height * scale);
push();
translate(bodyX + bodyW / 2.9, bodyY + bodyH / 7.43);
rotate(-0.2);
image(LHand, 20 * sq(bellyInflate), 0, LHand.width * scale, LHand.height * scale);
pop();
push();
translate(bodyX - bodyW / 4.39, bodyY + bodyH / 5.95);
rotate(0.1);
image(RHand, -20 * (bellyInflate), 0, RHand.width * scale, RHand.height * scale);
pop();
image(bandage, bodyX - bodyW / 12, bodyY + bodyH / 10, bandage.width * scale, bandage.height * scale);
stroke(255);
strokeWeight(8);
point(bodyX - bodyW / 15, bodyY - bodyH / 4);
point(bodyX + bodyW / 9, bodyY - bodyH / 3.8);
let adjust = 0;
let ankley = 0;
let adjustLx = 0;
let adjustLy = 0;
let adjustRx = 0;
let adjustRy = 0;
let mouthX = bodyX + bodyW / 25;
let mouthY = bodyY / 1.4;
noFill();
stroke(255);
strokeWeight(2);
beginShape();
curveVertex(mouthX - bodyW / 500 + adjust, mouthY + adjust / 4);
curveVertex(mouthX - bodyW / 60, mouthY);
curveVertex(mouthX, mouthY - adjust);
curveVertex(mouthX + bodyW / 60, mouthY);
curveVertex(mouthX + bodyW / 500 - adjust, mouthY + adjust / 4);
endShape();
}
function showGuide() {
noFill();
stroke(255);
let lx1 = bodyX + cx1;
let lx2 = bodyX + cx2;
let lx3 = bodyY + cy1;
let lx4 = bodyY + cy2;
line(lx1, 0, lx1, height);
line(lx2, 0, lx2, height);
line(0, lx3, width, lx3);
line(0, lx4, width, lx4);
ellipse(ex, ey, ew, eh);
ellipse(f1x, f1y, 5, 5);
ellipse(f2x, f2y, 5, 5);
ellipse(bodyX + 105, bodyY + 200, 60, 180);
ellipse(bodyX - 35, bodyY + 235, 60, 150);
}var body, leg, LHand, RHand, face;
var bandaid, hair, spike, dot;
var bodyX, bodyY, bodyW, bodyH;
let happiness = [];
let sadness = [];
let angers = [];
let surprises = [];
let happyRatio = 1;
let angryRatio = 1.78;
let sadRatio = 1;
let surpriseRatio = 1;
let eyesRatio = 1.78;
let ex, ey, ew, eh;
let xs = [];
let ys = [];
let f1x, f1y, f2x, f2y, c;
let cx1, cx2, cy1, cy2;
let scale = 0.5;
let bellyInflate = 1;
let happyData, sadData, angryData, surpriseData;
let happyObject, sadObject, angryObject, surpriseObject;
let happyCount, sadCount, angryCount, surpriseCount;
let database = [];
let databaseCount=0;
let loading = true;
var loadingAnimation;
var loadedBkg;
function preload() {
body = loadImage('assets/body.png');
leg = loadImage('assets/leg.png');
LHand = loadImage('assets/Hand L.png');
RHand = loadImage('assets/Hand R.png');
face = loadImage('assets/face.png');
bandage = loadImage('assets/bandage.png');
hair = loadImage('assets/hair.png');
spike = loadImage('assets/Sting.png');
dot = loadImage('assets/Happy.png');
}
function loadData(url){
loadJSON(url,gotData);
function gotData(data){
console.log(data);
database.push(data);
databaseCount++;
if (databaseCount == 4){
loading = false;
}
}
}
function setup() {
createCanvas(windowWidth, windowHeight);
clear();
for (let i =0 ; i<4; i++){
loadData(urls[i]);
}
loadingAnimation = select('.bubbles-wrapper');
loadedBkg = select('.danBkg');
happyObject = database[0];
sadObject = database[1];
angryObject = database[2];
surpriseObject = database[3];
happyCount = Object.keys(happyObject).length;
sadCount = Object.keys(sadObject).length;
angryCount = Object.keys(angryObject).length;
surpriseCount = Object.keys(surpriseObject).length;
let totalCount = happyCount + sadCount + angryCount + surpriseCount;
let scale = map(totalCount,0,50,0.2,0.8);
let bellyInflate = map(happyCount,0,25,1,2);
for (var i = 0; i < happyCount; i++) {
$( "#memories" ).append( "<p id=\"happy"+i+"\">"+happyData[i].happy+"</p>" );
}
for (var j = 0; j < sadCount; j++) {
$( "#memories" ).append( "<p id=\"sad"+j+"\">"+sadData[j].sad+"</p>" );
}
for (var k = 0; k < angryCount; k++) {
$( "#memories" ).append( "<p id=\"angry"+k+"\">"+angryData[k].angry+"</p>" );
}
for (var l = 0; l < surpriseCount; l++) {
$( "#memories" ).append( "<p id=\"surprise"+l+"\">"+surpriseData[l].surprised+"</p>" );
}
imageMode(CENTER);
bodyX = width / 3;
bodyY = height / 2;
bodyW = 966 *scale;
bodyH = 1189 *scale;
ex = bodyX * 1.03;
ey = bodyY * 0.95;
ew = round(bodyW / 1.75);
eh = round(bodyH / 1.15);
c =  round(sqrt(sq(eh / 2) - sq(ew / 2)));
f1x = ex;
f1y = ey - c;
f2x = ex;
f2y = ey + c;
for (let x = floor(ex - ew / 2); x < floor(ex + ew / 2); x += 1) {
for (let y = floor(ey - eh / 2); y < floor(ey + eh / 2); y += 1) {
let d = round(dist(x, y, f1x, f1y) + dist(x, y, f2x, f2y));
if (d == eh) {
xs.push(x);
ys.push(y);
}
}
}
cx1 = -bodyW / 5;
cx2 = bodyW / 4;
cy1 = -bodyH / 12;
cy2 = bodyH / 3.5;
if (!loading){}
background(220);
drawMonster();
createHappy();
createSad();
createAnger();
createSurprise();
}
}
function draw() {
hover();
}
function createHappy(){
while (happiness.length < happyCount){
var newHappy = {
x:bodyX+random(cx1,cx2),
y:bodyY+random(cy1,cy2),
w:bodyW/random(20,30),
h:bodyW/random(20,30)
}
let overlapping = false;
for (let j = 0; j <happiness.length; j++){
let other = happiness[j];
let d = dist (newHappy.x,newHappy.y,other.x,other.y);
if (d < newHappy.w/2 + other.w/2){
overlapping = true;
}
}
for (let j = 0; j <sadness.length; j++){
let other = sadness[j];
let d = dist (newHappy.x,newHappy.y,other.x,other.y);
if (d < newHappy.w/2 + other.w/2){
overlapping = true;
}
}
if (!overlapping){
happiness.push(newHappy);
}
}
for (let i =0; i <happiness.length; i ++){
image(dot, happiness[i].x,happiness[i].y,happiness[i].w,happiness[i].h);
}
}
function createSad(){
while (sadness.length < sadCount){
var newSad = {
x:bodyX + random(-bodyW / 6, bodyW / 5),
y:bodyY + random(-bodyH / 12, bodyH / 5),
w:bodyW / random(4, 10),
h:(bodyW / random(4, 10))* sadRatio,
s: 1,
angle:random(-45, 45)
}
let overlapping = false;
for (let j = 0; j <sadness.length; j++){
let other = sadness[j];
let d = dist (newSad.x,newSad.y,other.x,other.y);
if (d < newSad.w/2 + other.w/2){
overlapping = true;
}
}
for (let k = 0; k <happiness.length; k++){
let other = happiness[k];
let d = dist (newSad.x,newSad.y,other.x,other.y);
if (d < newSad.w/2 + other.w/2){
overlapping = true;
}
}
if (!overlapping){
sadness.push(newSad);
}
}
for (let i =0; i <sadness.length; i ++){
push();
translate(sadness[i].x, sadness[i].y);
angleMode(DEGREES);
rotate(sadness[i].angle);
let pw = sadness[i].w * sadness[i].s;
let ph = sadness[i].h * sadness[i].s;
image(bandage, 0, 0, pw, ph);
pop();
}
}
function createAnger(){
while (angers.length < angryCount){
let index = int(random(0, xs.length));
var newAnger = {
x:xs[index],
y:ys[index],
w:bodyW / random(4, 10),
h:(bodyW / random(4, 10)) * angryRatio,
angle: atan((xs[index] - ex) / (ey - ys[index])),
s: 1
}
let overlapping = false;
for (let j = 0; j <angers.length; j++){
let other = angers[j];
let d = dist (newAnger.x,newAnger.y,other.x,other.y);
if (d < newAnger.w/2 + other.w/2){
overlapping = true;
}
}
for (let j = 0; j <surprises.length; j++){
let other = surprises[j];
let d = dist (newAnger.x,newAnger.y,other.x,other.y);
if (d < newAnger.w + other.w){
overlapping = true;
}
}
if (!overlapping){
angers.push(newAnger);
}
}
for (let i = 0; i < angers.length; i ++){
push();
translate(angers[i].x, angers[i].y);
if (angers[i].y <= ey) {
rotate(angers[i].angle);
} else if (angers[i].y >= ey) {
rotate(angers[i].angle+180);
}
let pw = angers[i].w * angers[i].s;
let ph = angers[i].h * angers[i].s;
image(spike, 0, 0, pw, ph);
pop();
}
}
function createSurprise(){
while (surprises.length < surpriseCount){
let index = floor(random(1, xs.length));
var newSurprise = {
x:xs[index],
y:ys[index],
w:bodyW / random(4, 8),
h: (bodyW / random(4, 8)) * surpriseRatio,
angle: atan((xs[index] - ex) / (ey - ys[index])),
s: 1
}
let overlapping = false;
for (let j = 0; j <surprises.length; j++){
let other = surprises[j];
let d = dist (newSurprise.x,newSurprise.y,other.x,other.y);
if (d < newSurprise.w/2 + other.w/2){
overlapping = true;
}
}
for (let j = 0; j <angers.length; j++){
let other = angers[j];
let d = dist (surprises.x,surprises.y,other.x,other.y);
if (d < newSurprise.w + other.w){
overlapping = true;
}
}
if (!overlapping){
surprises.push(newSurprise);
}
}
for (let i = 0; i < surprises.length; i ++){
push();
translate(surprises[i].x, surprises[i].y)
if (surprises[i].y < ey) {
rotate(surprises[i].angle);
} else if (surprises[i].y >= ey) {
rotate(surprises[i].angle + 180);
}
let pw = surprises[i].w * surprises[i].s;
let ph = surprises[i].h * surprises[i].s;
image(hair, 0, 0, pw, ph);
pop();
}
}
function hover() {
for (let i =0; i <happiness.length; i ++){
let d = dist (mouseX,mouseY,happiness[i].x,happiness[i].y)
if (d < happiness[i].w/2){
$("#happy"+i).css("opacity","1");
} else{
$("#happy"+i).css("opacity","0");
}
}
for (let j =0; j <sadness.length; j ++){
let d = dist (mouseX,mouseY,sadness[j].x,sadness[j].y)
if (d < sadness[j].w/2){
$("#sad"+j).css("opacity","1");
} else{
$("#sad"+j).css("opacity","0");
}
}
for (let j =0; j <angers.length; j ++){
let d = dist (mouseX,mouseY,angers[j].x,angers[j].y)
if (d < angers[j].w/2){
$("#angry"+j).css("opacity","1");
} else{
$("#angry"+j).css("opacity","0");
}
}
for (let j =0; j < surprises.length; j ++){
let d = dist (mouseX,mouseY,surprises[j].x,surprises[j].y)
if (d < surprises[j].w/2){
$("#surprise"+j).css("opacity","1");
} else{
$("#surprise"+j).css("opacity","0");
}
}
}
function drawMonster() {
bodyW = body.width * scale;
bodyH = body.height * scale;
image(body, bodyX, bodyY, bodyW * bellyInflate, bodyH);
image(leg, bodyX + bodyW / 4.4, bodyY + bodyH / 2.97, leg.width * scale, leg.height * scale);
image(leg, bodyX - bodyW / 19.32, bodyY + bodyH / 2.77, leg.width * scale, leg.height * scale);
push();
translate(bodyX + bodyW / 2.9, bodyY + bodyH / 7.43);
rotate(-0.2);
image(LHand, 20 * sq(bellyInflate), 0, LHand.width * scale, LHand.height * scale);
pop();
push();
translate(bodyX - bodyW / 4.39, bodyY + bodyH / 5.95);
rotate(0.1);
image(RHand, -20 * (bellyInflate), 0, RHand.width * scale, RHand.height * scale);
pop();
image(bandage, bodyX - bodyW / 12, bodyY + bodyH / 10, bandage.width * scale, bandage.height * scale);
stroke(255);
strokeWeight(8);
point(bodyX - bodyW / 15, bodyY - bodyH / 4);
point(bodyX + bodyW / 9, bodyY - bodyH / 3.8);
let adjust = 0;
let ankley = 0;
let adjustLx = 0;
let adjustLy = 0;
let adjustRx = 0;
let adjustRy = 0;
let mouthX = bodyX + bodyW / 25;
let mouthY = bodyY / 1.4;
noFill();
stroke(255);
strokeWeight(2);
beginShape();
curveVertex(mouthX - bodyW / 500 + adjust, mouthY + adjust / 4);
curveVertex(mouthX - bodyW / 60, mouthY);
curveVertex(mouthX, mouthY - adjust);
curveVertex(mouthX + bodyW / 60, mouthY);
curveVertex(mouthX + bodyW / 500 - adjust, mouthY + adjust / 4);
endShape();
}
function showGuide() {
noFill();
stroke(255);
let lx1 = bodyX + cx1;
let lx2 = bodyX + cx2;
let lx3 = bodyY + cy1;
let lx4 = bodyY + cy2;
line(lx1, 0, lx1, height);
line(lx2, 0, lx2, height);
line(0, lx3, width, lx3);
line(0, lx4, width, lx4);
ellipse(ex, ey, ew, eh);
ellipse(f1x, f1y, 5, 5);
ellipse(f2x, f2y, 5, 5);
ellipse(bodyX + 105, bodyY + 200, 60, 180);
ellipse(bodyX - 35, bodyY + 235, 60, 150);
}
let database = [];
let databaseCount=0;
let loading = true;
var loadingAnimation;
var loadedBkg;
function loadData(url){
loadJSON(url,gotData);
function gotData(data){
console.log(data);
database.push(data);
databaseCount++;
if (databaseCount == 4){
loading = false;
}
}
}
function setup() {
createCanvas(400, 400);
clear();
for (let i =0 ; i<4; i++){
loadData(urls[i]);    
} 
loadingAnimation = select('.bubbles-wrapper');
loadedBkg = select('.danBkg');
}
function draw() {
background(220);
}let database = [];
let databaseCount=0;
let loading = true;
let happyObject,sadObject,angryObject,surpriseObject;
var loadingAnimation;
var loadedBkg;
function gotData1(data){
happyData=data;
databaseCount ++;
loading = false;
}
function gotData2(data){
sadData=data;
databaseCount ++;
}
function gotData3(data){
angryData=data;
databaseCount ++;
}
function gotData4(data){
surpriseData=data;
databaseCount ++;
}
function setup() {
createCanvas(windowWidth, windowHeight);
clear();
if (databaseCount == 4){
loading = false; 
}
loadingAnimation = select('.bubbles-wrapper');
loadedBkg = select('.danBkg');
}
function draw() {
if (!loading) {
clear();
loadingAnimation.addClass('display-none');
loadedBkg.removeClass('display-none');
textAlign(CENTER, CENTER);
textSize(120);
textStyle(BOLD);
fill("#8861A4");
text("SUCCESS!!", width / 2, height / 2);
}
}
function windowResized() {
resizeCanvas(windowWidth, windowHeight);
}function setup() {
createCanvas(400, 400);
}
function draw() {
}var body, leg, LHand, RHand, face;
var bandaid, hair, spike, dot;
var bodyX, bodyY, bodyW, bodyH;
let happiness = [];
let sadness = [];
let angers = [];
let surprises = [];
let happyRatio = 1;
let angryRatio = 1.78;
let sadRatio = 1;
let surpriseRatio = 1;
let eyesRatio = 1.78;
let ex, ey, ew, eh;
let xs = [];
let ys = [];
let f1x, f1y, f2x, f2y, c;
let cx1, cx2, cy1, cy2;
let scale = 0.5;
let bellyInflate = 1;
let happyData, sadData, angryData, surpriseData;
let happyObject, sadObject, angryObject, surpriseObject;
let happyCount, sadCount, angryCount, surpriseCount;
function preload() {
body = loadImage('body.png');
leg = loadImage('leg.png');
LHand = loadImage('handL.png');
RHand = loadImage('handR.png');
face = loadImage('face.png');
bandage = loadImage('bandage.png');
hair = loadImage('hair.png');
spike = loadImage('spike.png');
dot = loadImage('dot.png');
}
function setup() {
createCanvas(windowWidth, windowHeight);
happyObject = happyData;
sadObject = sadData;
angryObject = angryData;
surpriseObject = surpriseData;
happyCount = Object.keys(happyObject).length;
sadCount = Object.keys(sadObject).length;
angryCount = Object.keys(angryObject).length;
surpriseCount = Object.keys(surpriseObject).length;
let totalCount = happyCount + sadCount + angryCount + surpriseCount;
let scale = map(totalCount,0,50,0.2,0.8);
let bellyInflate = map(happyCount,0,25,1,2);
for (var i = 0; i < happyCount; i++) {  
$( "#memories" ).append( "<p id=\"happy"+i+"\">"+happyData[i].happy+"</p>" );
}
for (var j = 0; j < sadCount; j++) {  
$( "#memories" ).append( "<p id=\"sad"+j+"\">"+sadData[j].sad+"</p>" );
}
for (var k = 0; k < angryCount; k++) {  
$( "#memories" ).append( "<p id=\"angry"+k+"\">"+angryData[k].angry+"</p>" );
}
for (var l = 0; l < surpriseCount; l++) {  
$( "#memories" ).append( "<p id=\"surprise"+l+"\">"+surpriseData[l].surprised+"</p>" );
}
imageMode(CENTER);
bodyX = width / 3;
bodyY = height / 2;
bodyW = 966 *scale;
bodyH = 1189 *scale;
ex = bodyX * 1.03;
ey = bodyY * 0.95;
ew = round(bodyW / 1.75);
eh = round(bodyH / 1.15);
c =  round(sqrt(sq(eh / 2) - sq(ew / 2)));
f1x = ex;
f1y = ey - c;
f2x = ex;
f2y = ey + c;
for (let x = floor(ex - ew / 2); x < floor(ex + ew / 2); x += 1) {
for (let y = floor(ey - eh / 2); y < floor(ey + eh / 2); y += 1) {
let d = round(dist(x, y, f1x, f1y) + dist(x, y, f2x, f2y));
if (d == eh) {
xs.push(x);
ys.push(y);
}
}
}
cx1 = -bodyW / 5;
cx2 = bodyW / 4;
cy1 = -bodyH / 12;
cy2 = bodyH / 3.5;
background(220);
createHappy();
createSad();
createAnger();
createSurprise();
}
function draw() {
hover();
}
function createHappy(){
while (happiness.length < happyCount){
var newHappy = {
x:bodyX+random(cx1,cx2),
y:bodyY+random(cy1,cy2),
w:bodyW/random(20,30),
h:bodyW/random(20,30)
}
let overlapping = false;
for (let j = 0; j <happiness.length; j++){
let other = happiness[j];
let d = dist (newHappy.x,newHappy.y,other.x,other.y);
if (d < newHappy.w/2 + other.w/2){
overlapping = true; 
}
}
for (let j = 0; j <sadness.length; j++){
let other = sadness[j];
let d = dist (newHappy.x,newHappy.y,other.x,other.y);
if (d < newHappy.w/2 + other.w/2){
overlapping = true; 
} 
}
if (!overlapping){
happiness.push(newHappy); 
}
}
for (let i =0; i <happiness.length; i ++){
image(dot, happiness[i].x,happiness[i].y,happiness[i].w,happiness[i].h);
}
}
function createSad(){
while (sadness.length < sadCount){
var newSad = {
x:bodyX + random(-bodyW / 6, bodyW / 5),
y:bodyY + random(-bodyH / 12, bodyH / 5),
w:bodyW / random(4, 10),
h:(bodyW / random(4, 10))* sadRatio,
s: 1, 
angle:random(-45, 45)
}
let overlapping = false;
for (let j = 0; j <sadness.length; j++){
let other = sadness[j];
let d = dist (newSad.x,newSad.y,other.x,other.y);
if (d < newSad.w/2 + other.w/2){
overlapping = true; 
} 
}
for (let k = 0; k <happiness.length; k++){
let other = happiness[k];
let d = dist (newSad.x,newSad.y,other.x,other.y);
if (d < newSad.w/2 + other.w/2){
overlapping = true; 
} 
}
if (!overlapping){
sadness.push(newSad); 
}
}
for (let i =0; i <sadness.length; i ++){
push();
translate(sadness[i].x, sadness[i].y);
angleMode(DEGREES);
rotate(sadness[i].angle);
let pw = sadness[i].w * sadness[i].s;
let ph = sadness[i].h * sadness[i].s;
image(bandage, 0, 0, pw, ph);
pop();
}
}
function createAnger(){
while (angers.length < angryCount){
let index = int(random(0, xs.length));
var newAnger = {  
x:xs[index],
y:ys[index],
w:bodyW / random(4, 10),
h:(bodyW / random(4, 10)) * angryRatio,
angle: atan((xs[index] - ex) / (ey - ys[index])),
s: 1
}
let overlapping = false;
for (let j = 0; j <angers.length; j++){
let other = angers[j];
let d = dist (newAnger.x,newAnger.y,other.x,other.y);
if (d < newAnger.w/2 + other.w/2){
overlapping = true; 
} 
}
for (let j = 0; j <surprises.length; j++){
let other = surprises[j];
let d = dist (newAnger.x,newAnger.y,other.x,other.y);
if (d < newAnger.w + other.w){
overlapping = true; 
} 
}
if (!overlapping){
angers.push(newAnger); 
}
}
for (let i = 0; i < angers.length; i ++){
push();
translate(angers[i].x, angers[i].y);
if (angers[i].y <= ey) {
rotate(angers[i].angle);
} else if (angers[i].y >= ey) {
rotate(angers[i].angle+180);
}
let pw = angers[i].w * angers[i].s;
let ph = angers[i].h * angers[i].s;
image(spike, 0, 0, pw, ph);
pop();
}
}
function createSurprise(){
while (surprises.length < surpriseCount){
let index = floor(random(1, xs.length));
var newSurprise = {  
x:xs[index],
y:ys[index],
w:bodyW / random(4, 8),
h: (bodyW / random(4, 8)) * surpriseRatio,
angle: atan((xs[index] - ex) / (ey - ys[index])),
s: 1    
}
let overlapping = false;
for (let j = 0; j <surprises.length; j++){
let other = surprises[j];
let d = dist (newSurprise.x,newSurprise.y,other.x,other.y);
if (d < newSurprise.w/2 + other.w/2){
overlapping = true; 
} 
}
for (let j = 0; j <angers.length; j++){
let other = angers[j];
let d = dist (surprises.x,surprises.y,other.x,other.y);
if (d < newSurprise.w + other.w){
overlapping = true; 
} 
}
if (!overlapping){
surprises.push(newSurprise); 
}
}
for (let i = 0; i < surprises.length; i ++){
push();
translate(surprises[i].x, surprises[i].y)
if (surprises[i].y < ey) {
rotate(surprises[i].angle);
} else if (surprises[i].y >= ey) {
rotate(surprises[i].angle + 180);
}
let pw = surprises[i].w * surprises[i].s;
let ph = surprises[i].h * surprises[i].s;
image(hair, 0, 0, pw, ph);    
pop();
}
}
function hover() {
for (let i =0; i <happiness.length; i ++){
let d = dist (mouseX,mouseY,happiness[i].x,happiness[i].y)
if (d < happiness[i].w/2){
$("#happy"+i).css("opacity","1");
} else{
$("#happy"+i).css("opacity","0");
}
}
for (let j =0; j <sadness.length; j ++){
let d = dist (mouseX,mouseY,sadness[j].x,sadness[j].y)
if (d < sadness[j].w/2){
$("#sad"+j).css("opacity","1");
} else{
$("#sad"+j).css("opacity","0");
}
}
for (let j =0; j <angers.length; j ++){
let d = dist (mouseX,mouseY,angers[j].x,angers[j].y)
if (d < angers[j].w/2){
$("#angry"+j).css("opacity","1");
} else{
$("#angry"+j).css("opacity","0");
}
}
for (let j =0; j < surprises.length; j ++){
let d = dist (mouseX,mouseY,surprises[j].x,surprises[j].y)
if (d < surprises[j].w/2){
$("#surprise"+j).css("opacity","1");
} else{
$("#surprise"+j).css("opacity","0");
}
}
}
function drawMonster() {
bodyW = body.width * scale;
bodyH = body.height * scale;
image(body, bodyX, bodyY, bodyW * bellyInflate, bodyH);
image(leg, bodyX + bodyW / 4.4, bodyY + bodyH / 2.97, leg.width * scale, leg.height * scale);
image(leg, bodyX - bodyW / 19.32, bodyY + bodyH / 2.77, leg.width * scale, leg.height * scale);
push();
translate(bodyX + bodyW / 2.9, bodyY + bodyH / 7.43);
rotate(-0.2);
image(LHand, 20 * sq(bellyInflate), 0, LHand.width * scale, LHand.height * scale);
pop();
push();
translate(bodyX - bodyW / 4.39, bodyY + bodyH / 5.95);
rotate(0.1);
image(RHand, -20 * (bellyInflate), 0, RHand.width * scale, RHand.height * scale);
pop();
image(bandage, bodyX - bodyW / 12, bodyY + bodyH / 10, bandage.width * scale, bandage.height * scale);
stroke(255);
strokeWeight(8);
point(bodyX - bodyW / 15, bodyY - bodyH / 4);
point(bodyX + bodyW / 9, bodyY - bodyH / 3.8);
let adjust = 0;
let ankley = 0;
let adjustLx = 0;
let adjustLy = 0;
let adjustRx = 0;
let adjustRy = 0;
let mouthX = bodyX + bodyW / 25;
let mouthY = bodyY / 1.4;
noFill();
stroke(255);
strokeWeight(2);
beginShape();
curveVertex(mouthX - bodyW / 500 + adjust, mouthY + adjust / 4);
curveVertex(mouthX - bodyW / 60, mouthY);
curveVertex(mouthX, mouthY - adjust);
curveVertex(mouthX + bodyW / 60, mouthY);
curveVertex(mouthX + bodyW / 500 - adjust, mouthY + adjust / 4);
endShape();
}
function showGuide() {
noFill();
stroke(255);
let lx1 = bodyX + cx1;
let lx2 = bodyX + cx2;
let lx3 = bodyY + cy1;
let lx4 = bodyY + cy2;
line(lx1, 0, lx1, height);
line(lx2, 0, lx2, height);
line(0, lx3, width, lx3);
line(0, lx4, width, lx4);
ellipse(ex, ey, ew, eh);
ellipse(f1x, f1y, 5, 5);
ellipse(f2x, f2y, 5, 5);
ellipse(bodyX + 105, bodyY + 200, 60, 180);
ellipse(bodyX - 35, bodyY + 235, 60, 150);
}var body, leg, LHand, RHand, face;
var bandaid, hair, spike, dot;
var bodyX, bodyY, bodyW, bodyH;
let happiness = [];
let sadness = [];
let angers = [];
let surprises = [];
let happyRatio = 1;
let angryRatio = 1.78;
let sadRatio = 1;
let surpriseRatio = 1;
let eyesRatio = 1.78;
let ex, ey, ew, eh;
let xs = [];
let ys = [];
let f1x, f1y, f2x, f2y, c;
let cx1, cx2, cy1, cy2;
let scale = 0.5;
let bellyInflate = 1;
let data=[];
let happyData, sadData, angryData, surpriseData;
let happyObject, sadObject, angryObject, surpriseObject;
let happyCount, sadCount, angryCount, surpriseCount;
let trans = 0;
let loading = true;
let loadAngle = 0;
function preload() {
body = loadImage('body.png');
leg = loadImage('leg.png');
LHand = loadImage('handL.png');
RHand = loadImage('handR.png');
face = loadImage('face.png');
bandage = loadImage('bandage.png');
hair = loadImage('hair.png');
spike = loadImage('spike.png');
dot = loadImage('dot.png');
}
function gotdata(happyData){
happyObject = happyData;
loading = false;
}
function setup() {
createCanvas(windowWidth, windowHeight);
let totalCount = happyCount + sadCount + angryCount + surpriseCount;
let scale = map(totalCount,0,50,0.2,0.8);
let bellyInflate = map(happyCount,0,25,1,2);
for (var i = 0; i < happyCount; i++) {  
$( "#memories" ).append( "<p id=\"happy"+i+"\">"+happyData[i].happy+"</p>" );
}
for (var j = 0; j < sadCount; j++) {  
$( "#memories" ).append( "<p id=\"sad"+j+"\">"+sadData[j].sad+"</p>" );
}
for (var k = 0; k < angryCount; k++) {  
$( "#memories" ).append( "<p id=\"angry"+k+"\">"+angryData[k].angry+"</p>" );
}
for (var l = 0; l < surpriseCount; l++) {  
$( "#memories" ).append( "<p id=\"surprise"+l+"\">"+surpriseData[l].surprised+"</p>" );
}
imageMode(CENTER);
bodyX = width / 3;
bodyY = height / 2;
bodyW = 966 *scale;
bodyH = 1189 *scale;
ex = bodyX * 1.03;
ey = bodyY * 0.95;
ew = round(bodyW / 1.75);
eh = round(bodyH / 1.15);
c =  round(sqrt(sq(eh / 2) - sq(ew / 2)));
f1x = ex;
f1y = ey - c;
f2x = ex;
f2y = ey + c;
for (let x = floor(ex - ew / 2); x < floor(ex + ew / 2); x += 1) {
for (let y = floor(ey - eh / 2); y < floor(ey + eh / 2); y += 1) {
let d = round(dist(x, y, f1x, f1y) + dist(x, y, f2x, f2y));
if (d == eh) {
xs.push(x);
ys.push(y);
}
}
}
cx1 = -bodyW / 5;
cx2 = bodyW / 4;
cy1 = -bodyH / 12;
cy2 = bodyH / 3.5;
background(220,trans);
drawMonster();
createHappy();
createSad();
createAnger();
createSurprise();
}
function draw() {
hover();
}
function createHappy(){
while (happiness.length < happyCount){
var newHappy = {
x:bodyX+random(cx1,cx2),
y:bodyY+random(cy1,cy2),
w:bodyW/random(20,30),
h:bodyW/random(20,30)
}
let overlapping = false;
for (let j = 0; j <happiness.length; j++){
let other = happiness[j];
let d = dist (newHappy.x,newHappy.y,other.x,other.y);
if (d < newHappy.w/2 + other.w/2){
overlapping = true; 
}
}
for (let j = 0; j <sadness.length; j++){
let other = sadness[j];
let d = dist (newHappy.x,newHappy.y,other.x,other.y);
if (d < newHappy.w/2 + other.w/2){
overlapping = true; 
} 
}
if (!overlapping){
happiness.push(newHappy); 
}
}
for (let i =0; i <happiness.length; i ++){
image(dot, happiness[i].x,happiness[i].y,happiness[i].w,happiness[i].h);
}
}
function createSad(){
while (sadness.length < sadCount){
var newSad = {
x:bodyX + random(-bodyW / 6, bodyW / 5),
y:bodyY + random(-bodyH / 12, bodyH / 5),
w:bodyW / random(4, 10),
h:(bodyW / random(4, 10))* sadRatio,
s: 1, 
angle:random(-45, 45)
}
let overlapping = false;
for (let j = 0; j <sadness.length; j++){
let other = sadness[j];
let d = dist (newSad.x,newSad.y,other.x,other.y);
if (d < newSad.w/2 + other.w/2){
overlapping = true; 
} 
}
for (let k = 0; k <happiness.length; k++){
let other = happiness[k];
let d = dist (newSad.x,newSad.y,other.x,other.y);
if (d < newSad.w/2 + other.w/2){
overlapping = true; 
} 
}
if (!overlapping){
sadness.push(newSad); 
}
}
for (let i =0; i <sadness.length; i ++){
push();
translate(sadness[i].x, sadness[i].y);
angleMode(DEGREES);
rotate(sadness[i].angle);
let pw = sadness[i].w * sadness[i].s;
let ph = sadness[i].h * sadness[i].s;
image(bandage, 0, 0, pw, ph);
pop();
}
}
function createAnger(){
while (angers.length < angryCount){
let index = int(random(0, xs.length));
var newAnger = {  
x:xs[index],
y:ys[index],
w:bodyW / random(4, 10),
h:(bodyW / random(4, 10)) * angryRatio,
angle: atan((xs[index] - ex) / (ey - ys[index])),
s: 1
}
let overlapping = false;
for (let j = 0; j <angers.length; j++){
let other = angers[j];
let d = dist (newAnger.x,newAnger.y,other.x,other.y);
if (d < newAnger.w/2 + other.w/2){
overlapping = true; 
} 
}
if (!overlapping){
angers.push(newAnger); 
}
}
for (let i = 0; i < angers.length; i ++){
push();
translate(angers[i].x, angers[i].y);
if (angers[i].y <= ey) {
rotate(angers[i].angle);
} else if (angers[i].y >= ey) {
rotate(angers[i].angle+180);
}
let pw = angers[i].w * angers[i].s;
let ph = angers[i].h * angers[i].s;
image(spike, 0, 0, pw, ph);
pop();
}
}
function createSurprise(){
while (surprises.length < surpriseCount){
let index = floor(random(1, xs.length));
var newSurprise = {  
x:xs[index],
y:ys[index],
w:bodyW / random(4, 8),
h: (bodyW / random(4, 8)) * surpriseRatio,
angle: atan((xs[index] - ex) / (ey - ys[index])),
s: 1    
}
let overlapping = false;
for (let j = 0; j <surprises.length; j++){
let other = surprises[j];
let d = dist (newSurprise.x,newSurprise.y,other.x,other.y);
if (d < newSurprise.w/2 + other.w/2){
overlapping = true; 
} 
}
if (!overlapping){
surprises.push(newSurprise); 
}
}
for (let i = 0; i < surprises.length; i ++){
push();
translate(surprises[i].x, surprises[i].y)
if (surprises[i].y < ey) {
rotate(surprises[i].angle);
} else if (surprises[i].y >= ey) {
rotate(surprises[i].angle + 180);
}
let pw = surprises[i].w * surprises[i].s;
let ph = surprises[i].h * surprises[i].s;
image(hair, 0, 0, pw, ph);    
pop();
}
}
function hover() {
for (let i =0; i <happiness.length; i ++){
let d = dist (mouseX,mouseY,happiness[i].x,happiness[i].y)
if (d < happiness[i].w/2){
console.log("is hovering happy"+ i);
$("#happy"+i).css("opacity","1");
} else{
$("#happy"+i).css("opacity","0");
}
}
for (let j =0; j <sadness.length; j ++){
let d = dist (mouseX,mouseY,sadness[j].x,sadness[j].y)
if (d < sadness[j].w/2){
$("#sad"+j).css("opacity","1");
} else{
$("#sad"+j).css("opacity","0");
}
}
for (let j =0; j <angers.length; j ++){
let d = dist (mouseX,mouseY,angers[j].x,angers[j].y)
if (d < angers[j].w/2){
$("#angry"+j).css("opacity","1");
} else{
$("#angry"+j).css("opacity","0");
}
}
for (let j =0; j < surprises.length; j ++){
let d = dist (mouseX,mouseY,surprises[j].x,surprises[j].y)
if (d < surprises[j].w/2){
$("#surprise"+j).css("opacity","1");
} else{
$("#surprise"+j).css("opacity","0");
}
}
}
function drawMonster() {
bodyW = body.width * scale;
bodyH = body.height * scale;
image(body, bodyX, bodyY, bodyW * bellyInflate, bodyH);
image(leg, bodyX + bodyW / 4.4, bodyY + bodyH / 2.97, leg.width * scale, leg.height * scale);
image(leg, bodyX - bodyW / 19.32, bodyY + bodyH / 2.77, leg.width * scale, leg.height * scale);
push();
translate(bodyX + bodyW / 2.9, bodyY + bodyH / 7.43);
rotate(-0.2);
image(LHand, 20 * sq(bellyInflate), 0, LHand.width * scale, LHand.height * scale);
pop();
push();
translate(bodyX - bodyW / 4.39, bodyY + bodyH / 5.95);
rotate(0.1);
image(RHand, -20 * (bellyInflate), 0, RHand.width * scale, RHand.height * scale);
pop();
image(bandage, bodyX - bodyW / 12, bodyY + bodyH / 10, bandage.width * scale, bandage.height * scale);
stroke(255);
strokeWeight(8);
point(bodyX - bodyW / 15, bodyY - bodyH / 4);
point(bodyX + bodyW / 9, bodyY - bodyH / 3.8);
let adjust = 0;
let ankley = 0;
let adjustLx = 0;
let adjustLy = 0;
let adjustRx = 0;
let adjustRy = 0;
let mouthX = bodyX + bodyW / 25;
let mouthY = bodyY / 1.4;
noFill();
stroke(255);
strokeWeight(2);
beginShape();
curveVertex(mouthX - bodyW / 500 + adjust, mouthY + adjust / 4);
curveVertex(mouthX - bodyW / 60, mouthY);
curveVertex(mouthX, mouthY - adjust);
curveVertex(mouthX + bodyW / 60, mouthY);
curveVertex(mouthX + bodyW / 500 - adjust, mouthY + adjust / 4);
endShape();
}
function showGuide() {
noFill();
stroke(255);
let lx1 = bodyX + cx1;
let lx2 = bodyX + cx2;
let lx3 = bodyY + cy1;
let lx4 = bodyY + cy2;
line(lx1, 0, lx1, height);
line(lx2, 0, lx2, height);
line(0, lx3, width, lx3);
line(0, lx4, width, lx4);
ellipse(ex, ey, ew, eh);
ellipse(f1x, f1y, 5, 5);
ellipse(f2x, f2y, 5, 5);
ellipse(bodyX + 105, bodyY + 200, 60, 180);
ellipse(bodyX - 35, bodyY + 235, 60, 150);
}var body, leg, LHand, RHand, face;
var bandaid, hair, spike, dot;
var bodyX, bodyY, bodyW, bodyH;
let happiness = [];
let sadness = [];
let angers = [];
let surprises = [];
let happyRatio = 1;
let angryRatio = 1.78;
let sadRatio = 1;
let surpriseRatio = 1;
let eyesRatio = 1.78;
let ex, ey, ew, eh;
let xs = [];
let ys = [];
let f1x, f1y, f2x, f2y, c;
let cx1, cx2, cy1, cy2;
let scale = 0.5;
let bellyInflate = 1;
let happyData, sadData, angryData, surpriseData;
let happyObject, sadObject, angryObject, surpriseObject;
let happyCount, sadCount, angryCount, surpriseCount;
let loading = true;
let trans = 0;
function preload() {
body = loadImage('body.png');
leg = loadImage('leg.png');
LHand = loadImage('handL.png');
RHand = loadImage('handR.png');
face = loadImage('face.png');
bandage = loadImage('bandage.png');
hair = loadImage('hair.png');
spike = loadImage('spike.png');
dot = loadImage('dot.png');
}
function gotData(data){
console.log(data);
loading = false; 
}
function setup() {
createCanvas(windowWidth, windowHeight);
happyObject = happyData;
sadObject = sadData;
angryObject = angryData;
surpriseObject = surpriseData;
happyCount = Object.keys(happyObject).length;
sadCount = Object.keys(sadObject).length;
angryCount = Object.keys(angryObject).length;
surpriseCount = Object.keys(surpriseObject).length;
let totalCount = happyCount + sadCount + angryCount + surpriseCount;
let scale = map(totalCount,0,50,0.2,0.8);
let bellyInflate = map(happyCount,0,25,1,2);
for (var i = 0; i < happyCount; i++) {  
$( "#memories" ).append( "<p id=\"happy"+i+"\">"+happyData[i].happy+"</p>" );
}
for (var j = 0; j < sadCount; j++) {  
$( "#memories" ).append( "<p id=\"sad"+j+"\">"+sadData[j].sad+"</p>" );
}
for (var k = 0; k < angryCount; k++) {  
$( "#memories" ).append( "<p id=\"angry"+k+"\">"+angryData[k].angry+"</p>" );
}
for (var l = 0; l < surpriseCount; l++) {  
$( "#memories" ).append( "<p id=\"surprise"+l+"\">"+surpriseData[l].surprised+"</p>" );
}
imageMode(CENTER);
bodyX = width / 3;
bodyY = height / 2;
bodyW = 966 *scale;
bodyH = 1189 *scale;
ex = bodyX * 1.03;
ey = bodyY * 0.95;
ew = round(bodyW / 1.75);
eh = round(bodyH / 1.15);
c =  round(sqrt(sq(eh / 2) - sq(ew / 2)));
f1x = ex;
f1y = ey - c;
f2x = ex;
f2y = ey + c;
for (let x = floor(ex - ew / 2); x < floor(ex + ew / 2); x += 1) {
for (let y = floor(ey - eh / 2); y < floor(ey + eh / 2); y += 1) {
let d = round(dist(x, y, f1x, f1y) + dist(x, y, f2x, f2y));
if (d == eh) {
xs.push(x);
ys.push(y);
}
}
}
cx1 = -bodyW / 5;
cx2 = bodyW / 4;
cy1 = -bodyH / 12;
cy2 = bodyH / 3.5;  
createHappy();
createSad();
createAnger();
createSurprise();
}
function draw() {
if (loading){
fill(255);
textSize(24);
text("loading") 
}
hover();
}
function createHappy(){
while (happiness.length < happyCount){
var newHappy = {
x:bodyX+random(cx1,cx2),
y:bodyY+random(cy1,cy2),
w:bodyW/random(20,30),
h:bodyW/random(20,30)
}
let overlapping = false;
for (let j = 0; j <happiness.length; j++){
let other = happiness[j];
let d = dist (newHappy.x,newHappy.y,other.x,other.y);
if (d < newHappy.w/2 + other.w/2){
overlapping = true; 
}
}
for (let j = 0; j <sadness.length; j++){
let other = sadness[j];
let d = dist (newHappy.x,newHappy.y,other.x,other.y);
if (d < newHappy.w/2 + other.w/2){
overlapping = true; 
} 
}
if (!overlapping){
happiness.push(newHappy); 
}
}
for (let i =0; i <happiness.length; i ++){
image(dot, happiness[i].x,happiness[i].y,happiness[i].w,happiness[i].h);
}
}
function createSad(){
while (sadness.length < sadCount){
var newSad = {
x:bodyX + random(-bodyW / 6, bodyW / 5),
y:bodyY + random(-bodyH / 12, bodyH / 5),
w:bodyW / random(4, 10),
h:(bodyW / random(4, 10))* sadRatio,
s: 1, 
angle:random(-45, 45)
}
let overlapping = false;
for (let j = 0; j <sadness.length; j++){
let other = sadness[j];
let d = dist (newSad.x,newSad.y,other.x,other.y);
if (d < newSad.w/2 + other.w/2){
overlapping = true; 
} 
}
for (let k = 0; k <happiness.length; k++){
let other = happiness[k];
let d = dist (newSad.x,newSad.y,other.x,other.y);
if (d < newSad.w/2 + other.w/2){
overlapping = true; 
} 
}
if (!overlapping){
sadness.push(newSad); 
}
}
for (let i =0; i <sadness.length; i ++){
push();
translate(sadness[i].x, sadness[i].y);
angleMode(DEGREES);
rotate(sadness[i].angle);
let pw = sadness[i].w * sadness[i].s;
let ph = sadness[i].h * sadness[i].s;
image(bandage, 0, 0, pw, ph);
pop();
}
}
function createAnger(){
while (angers.length < angryCount){
let index = int(random(0, xs.length));
var newAnger = {  
x:xs[index],
y:ys[index],
w:bodyW / random(4, 10),
h:(bodyW / random(4, 10)) * angryRatio,
angle: atan((xs[index] - ex) / (ey - ys[index])),
s: 1
}
let overlapping = false;
for (let j = 0; j <angers.length; j++){
let other = angers[j];
let d = dist (newAnger.x,newAnger.y,other.x,other.y);
if (d < newAnger.w/2 + other.w/2){
overlapping = true; 
} 
}
if (!overlapping){
angers.push(newAnger); 
}
}
for (let i = 0; i < angers.length; i ++){
push();
translate(angers[i].x, angers[i].y);
if (angers[i].y <= ey) {
rotate(angers[i].angle);
} else if (angers[i].y >= ey) {
rotate(angers[i].angle+180);
}
let pw = angers[i].w * angers[i].s;
let ph = angers[i].h * angers[i].s;
image(spike, 0, 0, pw, ph);
pop();
}
}
function createSurprise(){
while (surprises.length < surpriseCount){
let index = floor(random(1, xs.length));
var newSurprise = {  
x:xs[index],
y:ys[index],
w:bodyW / random(4, 8),
h: (bodyW / random(4, 8)) * surpriseRatio,
angle: atan((xs[index] - ex) / (ey - ys[index])),
s: 1    
}
let overlapping = false;
for (let j = 0; j <surprises.length; j++){
let other = surprises[j];
let d = dist (newSurprise.x,newSurprise.y,other.x,other.y);
if (d < newSurprise.w/2 + other.w/2){
overlapping = true; 
} 
}
if (!overlapping){
surprises.push(newSurprise); 
}
}
for (let i = 0; i < surprises.length; i ++){
push();
translate(surprises[i].x, surprises[i].y)
if (surprises[i].y < ey) {
rotate(surprises[i].angle);
} else if (surprises[i].y >= ey) {
rotate(surprises[i].angle + 180);
}
let pw = surprises[i].w * surprises[i].s;
let ph = surprises[i].h * surprises[i].s;
image(hair, 0, 0, pw, ph);    
pop();
}
}
function hover() {
for (let i =0; i <happiness.length; i ++){
let d = dist (mouseX,mouseY,happiness[i].x,happiness[i].y)
if (d < happiness[i].w/2){
console.log("is hovering happy"+ i);
} else{
}
}
for (let j =0; j <sadness.length; j ++){
let d = dist (mouseX,mouseY,sadness[j].x,sadness[j].y)
if (d < sadness[j].w/2){
console.log("is hovering sad"+ j);
} else{
}
}
for (let j =0; j <angers.length; j ++){
let d = dist (mouseX,mouseY,angers[j].x,angers[j].y)
if (d < angers[j].w/2){
console.log("is hovering anger"+ j);
} else{
}
}
for (let j =0; j < surprises.length; j ++){
let d = dist (mouseX,mouseY,surprises[j].x,surprises[j].y)
if (d < surprises[j].w/2){
console.log("is hovering surprise "+ j);
} else{
}
}
}
function drawMonster() {
bodyW = body.width * scale;
bodyH = body.height * scale;
image(body, bodyX, bodyY, bodyW * bellyInflate, bodyH);
image(leg, bodyX + bodyW / 4.4, bodyY + bodyH / 2.97, leg.width * scale, leg.height * scale);
image(leg, bodyX - bodyW / 19.32, bodyY + bodyH / 2.77, leg.width * scale, leg.height * scale);
push();
translate(bodyX + bodyW / 2.9, bodyY + bodyH / 7.43);
rotate(-0.2);
image(LHand, 20 * sq(bellyInflate), 0, LHand.width * scale, LHand.height * scale);
pop();
push();
translate(bodyX - bodyW / 4.39, bodyY + bodyH / 5.95);
rotate(0.1);
image(RHand, -20 * (bellyInflate), 0, RHand.width * scale, RHand.height * scale);
pop();
image(bandage, bodyX - bodyW / 12, bodyY + bodyH / 10, bandage.width * scale, bandage.height * scale);
stroke(255);
strokeWeight(8);
point(bodyX - bodyW / 15, bodyY - bodyH / 4);
point(bodyX + bodyW / 9, bodyY - bodyH / 3.8);
let adjust = 0;
let ankley = 0;
let adjustLx = 0;
let adjustLy = 0;
let adjustRx = 0;
let adjustRy = 0;
let mouthX = bodyX + bodyW / 25;
let mouthY = bodyY / 1.4;
noFill();
stroke(255);
strokeWeight(2);
beginShape();
curveVertex(mouthX - bodyW / 500 + adjust, mouthY + adjust / 4);
curveVertex(mouthX - bodyW / 60, mouthY);
curveVertex(mouthX, mouthY - adjust);
curveVertex(mouthX + bodyW / 60, mouthY);
curveVertex(mouthX + bodyW / 500 - adjust, mouthY + adjust / 4);
endShape();
}
var bandaid, hair, spike, dot;
var bodyX, bodyY, bodyW, bodyH;
let happiness = [];
let sadness = [];
let angers = [];
let surprises = [];
let happyRatio = 1;
let angryRatio = 1.78;
let sadRatio = 1;
let surpriseRatio = 1;
let eyesRatio = 1.78;
let ex, ey, ew, eh;
let xs = [];
let ys = [];
let f1x, f1y, f2x, f2y, c;
let cx1, cx2, cy1, cy2;
let scale = 0.3;
let bellyInflate = 1;
let happyData, sadData, angryData, surpriseData;
let happyObject, sadObject, angryObject, surpriseObject;
let happyCount, sadCount, angryCount, surpriseCount;
function preload() {
body = loadImage('body.png');
leg = loadImage('leg.png');
LHand = loadImage('handL.png');
RHand = loadImage('handR.png');
face = loadImage('face.png');
bandage = loadImage('bandage.png');
hair = loadImage('hair.png');
spike = loadImage('spike.png');
dot = loadImage('dot.png');
}
function setup() {
createCanvas(windowWidth, windowHeight);
happyObject = happyData;
sadObject = sadData;
angryObject = angryData;
surpriseObject = surpriseData;
happyCount = Object.keys(happyObject).length;
sadCount = Object.keys(sadObject).length;
angryCount = Object.keys(angryObject).length;
surpriseCount = Object.keys(surpriseObject).length;
let totalCount = happyCount + sadCount + angryCount + surpriseCount;
let scale = map(totalCount, 0, 50, 0.2, 0.8);
let bellyInflate = map(happyCount, 0, 25, 1, 2);
imageMode(CENTER);
bodyX = width / 3;
bodyY = height / 2;
bodyW = 966 * scale;
bodyH = 1189 * scale;
ex = bodyX * 1.03;
ey = bodyY * 0.95;
ew = round(bodyW / 1.95);
eh = round(bodyH / 1.35);
c = round(sqrt(sq(eh / 2) - sq(ew / 2)));
f1x = ex;
f1y = ey - c;
f2x = ex;
f2y = ey + c;
for (let x = floor(ex - ew / 2); x < floor(ex + ew / 2); x += 1) {
for (let y = floor(ey - eh / 2); y < floor(ey + eh / 2); y += 1) {
let d = round(dist(x, y, f1x, f1y) + dist(x, y, f2x, f2y));
if (d == eh) {
xs.push(x);
ys.push(y);
}
}
}
cx1 = -bodyW / 5;
cx2 = bodyW / 4;
cy1 = -bodyH / 12;
cy2 = bodyH / 3.5;
for (let i = 0; i < happyCount; i++) {
createHappy(i);
}
for (let i = 0; i < sadCount; i++) {
createSad(i);
}
}
function draw() {
background(220);
drawMonster();
for (let i of happiness) {
i.show();
i.hover(mouseX, mouseY);
i.fade();
if (i.count > 13) {
happiness.splice(i, 1);
}
}
for (let i of sadness) {
i.show();
i.hover(mouseX, mouseY);
i.fade();
if (i.count > 13) {
sadness.splice(i, 1);
}
}
}
function createHappy(no) {
while (happiness.length<happyCount) {
let x, y, w, h;
x = bodyX + random(cx1, cx2);
y = bodyY + random(cy1, cy2);
w = bodyW / random(20, 30);
h = w * happyRatio;
let overlap= false;
for (let h of happiness) {
let d = dist(x, y, h.x, h.y);
if (d < w / 2 + h.w / 2) {
overlap1 = true;
break;
}
}
for (let i of sadness) {
let d = dist(x, y, i.x, i.y);
if (d < w / 2 + i.w / 2) {
overlap2 = true;
break;
}
}
if (!overlap) {
let newEmotion = new Happy(no, x, y, w, h);
happiness.push(newEmotion);
for (let h of happiness) {
h.count++;
}
}
}
}
function createSad(no) {
let valid = false;
while (!valid) {
let x, y, w, h;
x = bodyX + random(-bodyW / 6, bodyW / 5);
y = bodyY + random(-bodyH / 12, bodyH / 5);
w = bodyW / random(4, 10);
h = w * sadRatio;
let overlap = false;
for (let i of sadness) {
let d = dist(x, y, i.x, i.y);
if (d < w / 1.5 + i.w / 1.5) {
overlap = true;
break;
}
}
let overlap2 = false;
for (let h of happiness) {
let d = dist(x, y, h.x, h.y);
if (d < w / 2 + h.w / 2) {
overlap = true;
break;
}
}
if (!overlap) {
valid = true;
}
if (valid) {
let newEmotion = new Sad(no,x, y, w, h);
sadness.push(newEmotion);
for (let s of sadness) {
s.count++;
}
}
}
}
function drawMonster() {
bodyW = body.width * scale;
bodyH = body.height * scale;
image(body, bodyX, bodyY, bodyW * bellyInflate, bodyH);
image(leg, bodyX + bodyW / 4.4, bodyY + bodyH / 2.97, leg.width * scale, leg.height * scale);
image(leg, bodyX - bodyW / 19.32, bodyY + bodyH / 2.77, leg.width * scale, leg.height * scale);
push();
translate(bodyX + bodyW / 2.9, bodyY + bodyH / 7.43);
rotate(-0.2);
image(LHand, 20 * sq(bellyInflate), 0, LHand.width * scale, LHand.height * scale);
pop();
push();
translate(bodyX - bodyW / 4.39, bodyY + bodyH / 5.95);
rotate(0.1);
image(RHand, -20 * (bellyInflate), 0, RHand.width * scale, RHand.height * scale);
pop();
image(bandage, bodyX - bodyW / 12, bodyY + bodyH / 10, bandage.width * scale, bandage.height * scale);
stroke(255);
strokeWeight(8);
point(bodyX - bodyW / 15, bodyY - bodyH / 4);
point(bodyX + bodyW / 9, bodyY - bodyH / 3.8);
let adjust = slider.value();
let ankley = 0;
let adjustLx = 0;
let adjustLy = 0;
let adjustRx = 0;
let adjustRy = 0;
let mouthX = bodyX + bodyW / 25;
let mouthY = bodyY / 1.4;
noFill();
stroke(255);
strokeWeight(2);
beginShape();
curveVertex(mouthX - bodyW / 500 + adjust, mouthY + adjust / 4);
curveVertex(mouthX - bodyW / 60, mouthY);
curveVertex(mouthX, mouthY - adjust);
curveVertex(mouthX + bodyW / 60, mouthY);
curveVertex(mouthX + bodyW / 500 - adjust, mouthY + adjust / 4);
endShape();
}
var bandaid, hair, spike, dot;
var bodyX, bodyY, bodyW, bodyH;
let happiness = [];
let sadness = [];
let angers = [];
let surprises = [];
let happyRatio = 1;
let angryRatio = 1.78;
let sadRatio = 1;
let surpriseRatio = 1;
let eyesRatio = 1.78;
let ex, ey, ew, eh;
let xs = [];
let ys = [];
let f1x, f1y, f2x, f2y, c;
let cx1, cx2, cy1, cy2;
let happyData, sadData, angryData, surpriseData, happyCo, sadCo, angryCo, surpriseCo;
let pcountHappy, pcountSad, pcountAngry, pcountSurprise;
let happyObject, sadObject, angryObject, surpriseObject;
let happyCount, sadCount, angryCount, surpriseCount;
function preload() {
body = loadImage('body.png');
leg = loadImage('leg.png');
LHand = loadImage('handL.png');
RHand = loadImage('handR.png');
face = loadImage('face.png');
bandage = loadImage('bandage.png');
hair = loadImage('hair.png');
spike = loadImage('spike.png');
dot = loadImage('dot.png');
}
function setup() {
createCanvas(windowWidth, windowHeight);
var happyObject = happyData;
var sadObject = sadData;
var angryObject = angryData;
var surpriseObject = surpriseData;
var happyCount = Object.keys(happyObject).length;
var sadCount = Object.keys(sadObject).length;
var angryCount = Object.keys(angryObject).length;
var surpriseCount = Object.keys(surpriseObject).length;
for (let i =0; i < happyCount; i++){
createHappy(i);
}
imageMode(CENTER);
bodyX = width / 3;
bodyY = height / 2;
bodyW = 966 / 2;
bodyH = 1189 / 2;
ex = bodyX * 1.03;
ey = bodyY * 0.95;
ew = round(bodyW / 1.95);
eh = round(bodyH / 1.35);
c = round(sqrt(sq(eh / 2) - sq(ew / 2)));
f1x = ex;
f1y = ey - c;
f2x = ex;
f2y = ey + c;
for (let x = floor(ex - ew / 2); x < floor(ex + ew / 2); x += 1) {
for (let y = floor(ey - eh / 2); y < floor(ey + eh / 2); y += 1) {
let d = round(dist(x, y, f1x, f1y) + dist(x, y, f2x, f2y));
if (d == eh) {
xs.push(x);
ys.push(y);
}
}
}
cx1 = -bodyW / 5;
cx2 = bodyW / 4;
cy1 = -bodyH / 12;
cy2 = bodyH / 3.5;
createP("Emotion Level");
slider = createSlider(-5,5,0);
}
function draw() {
background(220);
happyCount = Object.keys(happyObject).length;
sadCount = Object.keys(sadObject).length;
angryCount = Object.keys(angryObject).length;
surpriseCount = Object.keys(surpriseObject).length;
for (let i of angers) {
i.add();
i.hover(mouseX, mouseY);
i.fade();
if (i.count > 13) {
angers.splice(i, 1);
}
}
for (let i of surprises) {
i.add();
i.hover(mouseX, mouseY);
i.fade();
if (i.count > 13) {
surprises.splice(i, 1);
}
}
drawMonster();
for (let i of happiness) {
i.add(bodyX, bodyY, bodyW);
i.hover(mouseX, mouseY);
i.fade();
if (i.count > 13) {
happiness.splice(i, 1);
}
}
for (let i of sadness) {
i.add(bodyX, bodyY, bodyW);
i.hover(mouseX, mouseY);
i.fade();
if (i.count > 13) {
sadness.splice(i, 1);
}
}
}
function createEmotion() {
while (pcountHappy < countHappy) {
createHappy();
let this_x = happiness[happiness.length - 1].x;
let this_y = happiness[happiness.length - 1].y;
let this_w = happiness[happiness.length - 1].w;
let this_h = happiness[happiness.length - 1].h;
var data = {
x: this_x,
y: this_y,
w: this_w,
h: this_h
};
pcountHappy++;
}
}
function createHappy(no) {
let valid = false;
while (!valid) {
let x, y, w, h;
x = bodyX + random(cx1, cx2);
y = bodyY + random(cy1, cy2);
w = bodyW / random(20, 30);
h = w * happyRatio;
let overlap1 = false;
for (let h of happiness) {
let d = dist(x, y, h.x, h.y);
if (d < w / 2 + h.w / 2) {
overlap1 = true;
break;
}
}
let overlap2 = false;
for (let i of sadness) {
let d = dist(x, y, i.x, i.y);
if (d < w / 2 + i.w / 2) {
overlap2 = true;
break;
}
}
if (!overlap1 && !overlap2) {
valid = true;
}
if (valid) {
let newEmotion = new Happy(no,x, y, w, h);
happiness.push(newEmotion);
for (let h of happiness) {
h.count++;
}
}
}
}
function createSad() {
let valid = false;
while (!valid) {
let x, y, w, h;
x = bodyX + random(-bodyW / 6, bodyW / 5);
y = bodyY + random(-bodyH / 12, bodyH / 5);
w = bodyW / random(4, 10);
h = w * sadRatio;
let overlap1 = false;
for (let i of sadness) {
let d = dist(x, y, i.x, i.y);
if (d < w / 1.5 + i.w / 1.5) {
overlap1 = true;
break;
}
}
let overlap2 = false;
for (let h of happiness) {
let d = dist(x, y, h.x, h.y);
if (d < w / 2 + h.w / 2) {
overlap2 = true;
break;
}
}
if (!overlap1 && !overlap2) {
valid = true;
}
if (valid) {
let newEmotion = new Sad(x, y, w, h);
sadness.push(newEmotion);
for (let s of sadness) {
s.count++;
}
}
}
}
function createAngry() {
let valid = false;
while (!valid) {
let index = floor(random(0, xs.length));
let x, y, w, h;
x = xs[index];
y = ys[index];
w = bodyW / random(4, 10);
h = w * angryRatio;
let overlap = false;
for (let a of angers) {
let d = dist(x, y, a.x, a.y);
if (d < w * 1.2) {
overlap = true;
break;
}
}
if (!overlap) {
valid = true;
}
if (valid) {
let newEmotion = new Angry(x, y, w, h);
angers.push(newEmotion);
for (let a of angers) {
a.count++;
}
}
}
}
function createSurprise() {
let valid = false;
while (!valid) {
let index = floor(random(1, xs.length));
let x, y, w, h;
x = xs[index];
y = ys[index];
w = bodyW / random(4, 8);
h = w * surpriseRatio;
let overlap = false;
for (let i of surprises) {
let d = dist(x, y, i.x, i.y);
if (d < w * 1.2) {
overlap = true;
break;
}
}
if (!overlap) {
valid = true;
}
if (valid) {
let newEmotion = new Surprise(x, y, w, h);
surprises.push(newEmotion);
for (let i of surprises) {
i.count++;
}
}
}
}
function drawMonster() {
let scale = 0.5;
let bellyInflate = 1;
let bodyW = body.width *scale;
let bodyH = body.height*scale;
image(body, bodyX, bodyY, bodyW*bellyInflate, bodyH);
image(leg, bodyX + bodyW/4.4, bodyY + bodyH/2.97, leg.width *scale, leg.height *scale);
image(leg, bodyX - bodyW/19.32, bodyY + bodyH/2.77, leg.width *scale, leg.height *scale);
push();
translate(bodyX + bodyW/2.9, bodyY + bodyH/7.43);
rotate(-0.2);
image(LHand, 20*sq(bellyInflate), 0, LHand.width * scale, LHand.height * scale);
pop();
push();
translate(bodyX - bodyW/4.39, bodyY + bodyH/5.95);
rotate(0.1);
image(RHand, -20*(bellyInflate), 0, RHand.width * scale, RHand.height * scale);
pop();
image(bandage, bodyX - bodyW/12, bodyY + bodyH/10, bandage.width * scale, bandage.height * scale);
stroke(255);
strokeWeight(8);
point(bodyX-bodyW/15,bodyY-bodyH/4);
point(bodyX+bodyW/9,bodyY-bodyH/3.8);
let adjust = slider.value();
let ankley = 0;
let adjustLx=0;
let adjustLy=0;
let adjustRx=0;
let adjustRy = 0;
let mouthX = bodyX+bodyW/25;
let mouthY = bodyY/1.4;
noFill();
stroke(255);
strokeWeight(2);
beginShape();
curveVertex(mouthX-bodyW/500+adjust,mouthY+adjust/4);
curveVertex(mouthX-bodyW/60,mouthY);
curveVertex(mouthX,mouthY-adjust);
curveVertex(mouthX+bodyW/60,mouthY);
curveVertex(mouthX+bodyW/500-adjust,mouthY+adjust/4);
endShape();
}
function showGuide() {
noFill();
stroke(255);
let lx1 = bodyX + cx1;
let lx2 = bodyX + cx2;
let lx3 = bodyY + cy1;
let lx4 = bodyY + cy2;
line(lx1, 0, lx1, height);
line(lx2, 0, lx2, height);
line(0, lx3, width, lx3);
line(0, lx4, width, lx4);
ellipse(ex, ey, ew, eh);
ellipse(f1x, f1y, 5, 5);
ellipse(f2x, f2y, 5, 5);
ellipse(bodyX + 105, bodyY + 200, 60, 180);
ellipse(bodyX - 35, bodyY + 235, 60, 150);
}var happyData;
var sadData;
var angryData;
var surpriseData;
function preload() {
}
function setup() {
var happyObject = happyData;
var happyCount = Object.keys(happyObject).length;
var sadObject = sadData;
var sadCount = Object.keys(sadObject).length;
var angryObject = angryData;
var angryCount = Object.keys(angryObject).length;
var surpriseObject = surpriseData;
var surpriseCount = Object.keys(surpriseObject).length;
for (var i = 0; i < happyCount; i++) {  
$('#happy').append( "<p>"+happyData[i].happy+"</p>" );
$('#happy').css("color", "red" );
}
for (var j = 0; j < sadCount; j++) {  
$('#sad').append( "<p>"+sadData[j].sad+"</p>" );
$('#sad').css("color", "blue" );
}
for (var k = 0; k < angryCount; k++) {  
$('#angry').append( "<p>"+angryData[k].angry+"</p>" );
}
for (var l = 0; l < surpriseCount; l++) {  
$('#surprise').append( "<p>"+surpriseData[l].surprise+"</p>" );
$('#surprise').css("color", "green" );
}
}
function draw() {
}
function feedMemory() {   
var mem = document.getElementById("memoryInput").value;
if (mem == "") {
alert("Please insert a piece of memory.");
return false;
};
var isHappy, isSad,isAngry, isSurprised;
isSad = $("#sadtag").hasClass("tag selected");
isAngry = $("#angrytag").hasClass("tag selected");
isSurprised = $("#surprisetag").hasClass("tag selected");
if (!isHappy && !isSad && !isAngry && !isSurprised){
alert("Please select at least one emotion tag for this memory.");
return false;
} 
if (isHappy){
var happyMem = {happy:mem};
}
if (isSad){
var sadMem = {sad:mem};
}
if (isAngry){
var angryMem = {angry:mem};
}
if (isSurprised){
var surprisedMem = {surprised:mem};
}
}
function loadHappyData(){
}
function loadSadData(){
}
function loadAngryData(){
}
function loadSurprisedData(){
}
function updateHappyMem(data) {
var hapObj = happyData;
var lastinput = Object.keys(hapObj).length-1;
$('#happy').append( "<p>"+happyData[lastInput].happy+"</p>" );
} 
function updateSadMem(data) {
var sadObj = sadData;
var lastinput = Object.keys(sadObj).length-1;
$('#sad').append( "<p>"+sadData[lastInput].sad+"</p>" );
} 
function updateAngryMem(data) {
var angryObj = angryData;
var lastinput = Object.keys(angryObj).length-1;
$('#angry').append( "<p>"+angryData[lastInput].angry+"</p>" );
} 
function updateSurprisedMem(data) {
var surprisedObj = surprisedData;
var lastinput = Object.keys(surprisedObj).length-1;
$('#surprised').append( "<p>"+surprisedData[lastInput].surprised+"</p>" );
} 
$(document).ready(function(){
$('.tag').click(function(){
$(this).toggleClass('selected');
});
});var body, leg, LHand, RHand, face;
var bandaid, hair, spike, dot;
var bodyX, bodyY, bodyW, bodyH;
let happiness = [];
let sadness = [];
let angers = [];
let surprises = [];
let happyRatio = 1;
let angryRatio = 1.78;
let sadRatio = 1;
let surpriseRatio = 1;
let eyesRatio = 1.78;
let ex, ey, ew, eh;
let xs = [];
let ys = [];
let f1x, f1y, f2x, f2y, c;
let cx1, cx2, cy1, cy2;
let happyData, sadData, angryData, surpriseData, happyCo, sadCo, angryCo, surpriseCo;
let pcountHappy, pcountSad, pcountAngry, pcountSurprise;
let happyObject, sadObject, angryObject, surpriseObject;
let happyCount, sadCount, angryCount, surpriseCount;
function preload() {
body = loadImage('body.png');
leg = loadImage('leg.png');
LHand = loadImage('handL.png');
RHand = loadImage('handR.png');
face = loadImage('face.png');
bandage = loadImage('bandage.png');
hair = loadImage('hair.png');
spike = loadImage('spike.png');
dot = loadImage('dot.png');
}
function setup() {
createCanvas(windowWidth, windowHeight);
imageMode(CENTER);
bodyX = width / 3;
bodyY = height / 2;
bodyW = 966 / 2;
bodyH = 1189 / 2;
ex = bodyX * 1.03;
ey = bodyY * 0.95;
ew = round(bodyW / 1.95);
eh = round(bodyH / 1.35);
c = round(sqrt(sq(eh / 2) - sq(ew / 2)));
f1x = ex;
f1y = ey - c;
f2x = ex;
f2y = ey + c;
for (let x = floor(ex - ew / 2); x < floor(ex + ew / 2); x += 1) {
for (let y = floor(ey - eh / 2); y < floor(ey + eh / 2); y += 1) {
let d = round(dist(x, y, f1x, f1y) + dist(x, y, f2x, f2y));
if (d == eh) {
xs.push(x);
ys.push(y);
}
}
}
cx1 = -bodyW / 5;
cx2 = bodyW / 4;
cy1 = -bodyH / 12;
cy2 = bodyH / 3.5;
createP("Emotion Level");
slider = createSlider(-5,5,0);
}
function draw() {
background(220);
for (let i of angers) {
i.add();
i.hover(mouseX, mouseY);
i.fade();
if (i.count > 13) {
angers.splice(i, 1);
}
}
for (let i of surprises) {
i.add();
i.hover(mouseX, mouseY);
i.fade();
if (i.count > 13) {
surprises.splice(i, 1);
}
}
drawMonster();
for (let i of happiness) {
i.add(bodyX, bodyY, bodyW);
i.hover(mouseX, mouseY);
i.fade();
if (i.count > 13) {
happiness.splice(i, 1);
}
}
for (let i of sadness) {
i.add(bodyX, bodyY, bodyW);
i.hover(mouseX, mouseY);
i.fade();
if (i.count > 13) {
sadness.splice(i, 1);
}
}
showGuide();
}
function createEmotion() {
while (pcountHappy < countHappy) {
createHappy();
let this_x = happiness[happiness.length - 1].x;
let this_y = happiness[happiness.length - 1].y;
let this_w = happiness[happiness.length - 1].w;
let this_h = happiness[happiness.length - 1].h;
var data = {
x: this_x,
y: this_y,
w: this_w,
h: this_h
};
pcountHappy++;
}
}
function createHappy() {
let valid = false;
while (!valid) {
let x, y, w, h;
x = bodyX + random(cx1, cx2);
y = bodyY + random(cy1, cy2);
w = bodyW / random(20, 30);
h = w * happyRatio;
let overlap1 = false;
for (let h of happiness) {
let d = dist(x, y, h.x, h.y);
if (d < w / 2 + h.w / 2) {
overlap1 = true;
break;
}
}
let overlap2 = false;
for (let i of sadness) {
let d = dist(x, y, i.x, i.y);
if (d < w / 2 + i.w / 2) {
overlap2 = true;
break;
}
}
if (!overlap1 && !overlap2) {
valid = true;
}
if (valid) {
let newEmotion = new Happy(x, y, w, h);
happiness.push(newEmotion);
for (let h of happiness) {
h.count++;
}
}
}
}
function createSad() {
let valid = false;
while (!valid) {
let x, y, w, h;
x = bodyX + random(-bodyW / 6, bodyW / 5);
y = bodyY + random(-bodyH / 12, bodyH / 5);
w = bodyW / random(4, 10);
h = w * sadRatio;
let overlap1 = false;
for (let i of sadness) {
let d = dist(x, y, i.x, i.y);
if (d < w / 1.5 + i.w / 1.5) {
overlap1 = true;
break;
}
}
let overlap2 = false;
for (let h of happiness) {
let d = dist(x, y, h.x, h.y);
if (d < w / 2 + h.w / 2) {
overlap2 = true;
break;
}
}
if (!overlap1 && !overlap2) {
valid = true;
}
if (valid) {
let newEmotion = new Sad(x, y, w, h);
sadness.push(newEmotion);
for (let s of sadness) {
s.count++;
}
}
}
}
function createAngry() {
let valid = false;
while (!valid) {
let index = floor(random(0, xs.length));
let x, y, w, h;
x = xs[index];
y = ys[index];
w = bodyW / random(4, 10);
h = w * angryRatio;
let overlap = false;
for (let a of angers) {
let d = dist(x, y, a.x, a.y);
if (d < w * 1.2) {
overlap = true;
break;
}
}
if (!overlap) {
valid = true;
}
if (valid) {
let newEmotion = new Angry(x, y, w, h);
angers.push(newEmotion);
for (let a of angers) {
a.count++;
}
}
}
}
function createSurprise() {
let valid = false;
while (!valid) {
let index = floor(random(1, xs.length));
let x, y, w, h;
x = xs[index];
y = ys[index];
w = bodyW / random(4, 8);
h = w * surpriseRatio;
let overlap = false;
for (let i of surprises) {
let d = dist(x, y, i.x, i.y);
if (d < w * 1.2) {
overlap = true;
break;
}
}
if (!overlap) {
valid = true;
}
if (valid) {
let newEmotion = new Surprise(x, y, w, h);
surprises.push(newEmotion);
for (let i of surprises) {
i.count++;
}
}
}
}
function drawMonster() {
let scale = 0.5;
let bellyInflate = 1;
let bodyW = body.width *scale;
let bodyH = body.height*scale;
image(body, bodyX, bodyY, bodyW*bellyInflate, bodyH);
image(leg, bodyX + bodyW/4.4, bodyY + bodyH/2.97, leg.width *scale, leg.height *scale);
image(leg, bodyX - bodyW/19.32, bodyY + bodyH/2.77, leg.width *scale, leg.height *scale);
push();
translate(bodyX + bodyW/2.9, bodyY + bodyH/7.43);
rotate(-0.2);
image(LHand, 20*sq(bellyInflate), 0, LHand.width * scale, LHand.height * scale);
pop();
push();
translate(bodyX - bodyW/4.39, bodyY + bodyH/5.95);
rotate(0.1);
image(RHand, -20*(bellyInflate), 0, RHand.width * scale, RHand.height * scale);
pop();
image(bandage, bodyX - bodyW/12, bodyY + bodyH/10, bandage.width * scale, bandage.height * scale);
stroke(255);
strokeWeight(8);
point(bodyX-bodyW/15,bodyY-bodyH/4);
point(bodyX+bodyW/9,bodyY-bodyH/3.8);
let adjust = slider.value();
let ankley = 0;
let adjustLx=0;
let adjustLy=0;
let adjustRx=0;
let adjustRy = 0;
let mouthX = bodyX+bodyW/25;
let mouthY = bodyY/1.4;
noFill();
stroke(255);
strokeWeight(2);
beginShape();
curveVertex(mouthX-bodyW/500+adjust,mouthY+adjust/4);
curveVertex(mouthX-bodyW/60,mouthY);
curveVertex(mouthX,mouthY-adjust);
curveVertex(mouthX+bodyW/60,mouthY);
curveVertex(mouthX+bodyW/500-adjust,mouthY+adjust/4);
endShape();
}
function showGuide() {
noFill();
stroke(255);
let lx1 = bodyX + cx1;
let lx2 = bodyX + cx2;
let lx3 = bodyY + cy1;
let lx4 = bodyY + cy2;
line(lx1, 0, lx1, height);
line(lx2, 0, lx2, height);
line(0, lx3, width, lx3);
line(0, lx4, width, lx4);
ellipse(ex, ey, ew, eh);
ellipse(f1x, f1y, 5, 5);
ellipse(f2x, f2y, 5, 5);
ellipse(bodyX + 105, bodyY + 200, 60, 180);
ellipse(bodyX - 35, bodyY + 235, 60, 150);
}function setup() {
createCanvas(400, 400);
var config = {
apiKey: "AIzaSyB5HhL0ApCoMIHp1BhdoDQTEMTD0pbPqlE",
authDomain: "memory-monster.firebaseapp.com",
projectId: "memory-monster",
storageBucket: "memory-monster.appspot.com",
messagingSenderId: "765406665170"
};
firebase.initializeApp(config);
console.log(firebase);
}
function draw() {
background(220);
}
var data;
function preload() {
}
function setup() { 
createCanvas(400, 400);
var myObject = data;
var count = Object.keys(myObject).length;
for (var i = 0; i < count; i++) {  
$( "#inputedmemory" ).append( "<p>"+data[i].happy+"</p>" );   
}
} 
function draw(){
var count = Object.keys(data).length;
console.log(count);
for (var i = 0; i < count; i++) {  
if(data[i].happy == "I'm sad"){
fill(0, 0, 255);
ellipse(width/2, height/2, 50, 50);
}
else if(data[i].happy == "I'm meh"){
fill(255, 0, 0);
rect(100, 200, randomx, 10);
}
}
}
function feedMemory() {   
var mem = document.getElementById("memoryInput").value;
var d = {happy: mem};
$( "#inputedmemory" ).append( "<p>"+mem+"</p>" );  
}
function loadData(){
}
function updateMem(data) {
var myObject = data;
var lastinput = Object.keys(myObject).length-1;
} 
var body, leg, LHand, RHand, face;
var bandaid, hair, spike, dot;
var bodyX, bodyY, bodyW, bodyH;
let happiness = [];
let sadness = [];
let angers = [];
let surprises = [];
let happyRatio = 1;
let angryRatio = 1.78;
let sadRatio = 1;
let surpriseRatio = 1;
let eyesRatio = 1.78;
let ex, ey, ew, eh;
let xs = [];
let ys = [];
let f1x, f1y, f2x, f2y, c;
let cx1, cx2, cy1, cy2;
let happyData,sadData,angryData,surpriseData,happyCo,sadCo,angryCo,surpriseCo;
function preload() {
body = loadImage('body.png');
leg = loadImage('leg.png');
LHand = loadImage('handL.png');
RHand = loadImage('handR.png');
face = loadImage('face.png');
bandage = loadImage('bandage.png');
hair = loadImage('hair.png');
spike = loadImage('spike.png');
dot = loadImage('dot.png');
}
function setup() {
createCanvas(windowWidth, windowHeight);
var happyObject = happyData;
var happyCount = Object.keys(happyObject).length;
var sadObject = sadData;
var sadCount = Object.keys(sadObject).length;
var angryObject = angryData;
var angryCount = Object.keys(angryObject).length;
var surpriseObject = surpriseData;
var surpriseCount = Object.keys(surpriseObject).length;
imageMode(CENTER);
bodyX = width / 3;
bodyY = height / 2;
bodyW = 966 / 2;
bodyH = 1189 / 2;
ex = bodyX * 1.03;
ey = bodyY * 0.95;
ew = round(bodyW / 1.95);
eh = round(bodyH / 1.35);
c = round(sqrt(sq(eh / 2) - sq(ew / 2)));
f1x = ex;
f1y = ey - c;
f2x = ex;
f2y = ey + c;
for (let x = floor(ex - ew / 2); x < floor(ex + ew / 2); x += 1) {
for (let y = floor(ey - eh / 2); y < floor(ey + eh / 2); y += 1) {
let d = round(dist(x, y, f1x, f1y) + dist(x, y, f2x, f2y));
if (d == eh) {
xs.push(x);
ys.push(y);
}
}
}
cx1 = -bodyW / 5;
cx2 = bodyW / 4;
cy1 = -bodyH / 12;
cy2 = bodyH / 3.5;
}
function draw() {
background(220);
for (let i of angers) {
i.add();
i.hover(mouseX, mouseY);
i.fade();
if (i.count > 13) {
angers.splice(i, 1);
}
}
for (let i of surprises) {
i.add();
i.hover(mouseX, mouseY);
i.fade();
if (i.count > 13) {
surprises.splice(i, 1);
}
}
drawMonster();
for (let i of happiness) {
i.add(bodyX, bodyY, bodyW);
i.hover(mouseX, mouseY);
i.fade();
if (i.count > 13) {
happiness.splice(i, 1);
}
}
for (let i of sadness) {
i.add(bodyX, bodyY, bodyW);
i.hover(mouseX, mouseY);
i.fade();
if (i.count > 13) {
sadness.splice(i, 1);
}
}
}
function createHappy() {
let valid = false;
while (!valid) {
let x, y, w, h;
x = bodyX + random(cx1, cx2);
y = bodyY + random(cy1, cy2);
w = bodyW / random(20, 30);
h = w * happyRatio;
let overlap1 = false;
for (let h of happiness) {
let d = dist(x, y, h.x, h.y);
if (d < w / 2 + h.w / 2) {
overlap1 = true;
break;
}
}
let overlap2 = false;
for (let i of sadness) {
let d = dist(x, y, i.x, i.y);
if (d < w / 2 + i.w / 2) {
overlap2 = true;
break;
}
}
if (!overlap1 && !overlap2) {
valid = true;
}
if (valid) {
let newEmotion = new Happy(x, y, w, h);
happiness.push(newEmotion);
for (let h of happiness) {
h.count++;
}
}
}
}
function createSad() {
let valid = false;
while (!valid) {
let x, y, w, h;
x = bodyX + random(-bodyW / 6, bodyW / 5);
y = bodyY + random(-bodyH / 12, bodyH / 5);
w = bodyW / random(4, 10);
h = w * sadRatio;
let overlap1 = false;
for (let i of sadness) {
let d = dist(x, y, i.x, i.y);
if (d < w / 1.5 + i.w / 1.5) {
overlap1 = true;
break;
}
}
let overlap2 = false;
for (let h of happiness) {
let d = dist(x, y, h.x, h.y);
if (d < w / 2 + h.w / 2) {
overlap2 = true;
break;
}
}
if (!overlap1 && !overlap2) {
valid = true;
}
if (valid) {
let newEmotion = new Sad(x, y, w, h);
sadness.push(newEmotion);
for (let s of sadness) {
s.count++;
}
}
}
}
function createAngry() {
let valid = false;
while (!valid) {
let index = floor(random(0, xs.length));
let x, y, w, h;
x = xs[index];
y = ys[index];
w = bodyW / random(4, 10);
h = w * angryRatio;
let overlap = false;
for (let a of angers) {
let d = dist(x, y, a.x, a.y);
if (d < w * 1.2) {
overlap = true;
break;
}
}
if (!overlap) {
valid = true;
}
if (valid) {
let newEmotion = new Angry(x, y, w, h);
angers.push(newEmotion);
for (let a of angers) {
a.count++;
}
}
}
}
function createSurprise() {
let valid = false;
while (!valid) {
let index = floor(random(1, xs.length));
let x, y, w, h;
x = xs[index];
y = ys[index];
w = bodyW / random(4, 8);
h = w * surpriseRatio;
let overlap = false;
for (let i of surprises) {
let d = dist(x, y, i.x, i.y);
if (d < w * 1.2) {
overlap = true;
break;
}
}
if (!overlap) {
valid = true;
}
if (valid) {
let newEmotion = new Surprise(x, y, w, h);
surprises.push(newEmotion);
for (let i of surprises) {
i.count++;
}
}
}
}
function drawMonster() {
image(body, bodyX, bodyY, body.width / 2, body.height / 2);
image(leg, bodyX + 110, bodyY + 200, leg.width / 2.1, leg.height / 2.1);
image(leg, bodyX - 25, bodyY + 215, leg.width / 2.1, leg.height / 2.1);
push();
translate(bodyX + 185, bodyY + 80);
rotate(-0.2);
image(LHand, 0, 0, LHand.width / 2, LHand.height / 2);
pop();
push();
translate(bodyX - 110, bodyY + 100);
rotate(0.1);
image(RHand, 0, 0, RHand.width / 2, RHand.height / 2);
pop();
image(face, bodyX + 10, bodyY - 120, face.width / 2.1, face.height / 2.1);
image(bandage, bodyX - 40, bodyY + 60, bandage.width / 2, bandage.height / 2);
}
function showGuide() {
noFill();
stroke(255);
let lx1 = bodyX + cx1;
let lx2 = bodyX + cx2;
let lx3 = bodyY + cy1;
let lx4 = bodyY + cy2;
line(lx1, 0, lx1, height);
line(lx2, 0, lx2, height);
line(0, lx3, width, lx3);
line(0, lx4, width, lx4);
ellipse(ex, ey, ew, eh);
ellipse(f1x, f1y, 5, 5);
ellipse(f2x, f2y, 5, 5);
ellipse(bodyX + 105, bodyY + 200, 60, 180);
ellipse(bodyX - 35, bodyY + 235, 60, 150);
}var body, leg, LHand, RHand, face;
var bandaid, hair, spike, dot;
var bodyX, bodyY, bodyW, bodyH;
let happiness = [];
let sadness = [];
let angers = [];
let surprises = [];
let happyRatio = 1;
let angryRatio = 1.78;
let sadRatio = 1;
let surpriseRatio = 1;
let eyesRatio = 1.78;
let ex, ey, ew, eh;
let xs = [];
let ys = [];
let f1x, f1y, f2x, f2y, c1, c2, c3;
let cx1, cx2, cy1, cy2;
let l1x1,l1y1,l1x2,l1y2,l2x1, l2y1, l2x2, l2y2, l3x1, l3y1, l3x2, l3y2, l4x1, l4y1, l4x2, l4y2;
let lineXs = [];
let lineYs = [];
function preload() {
body = loadImage('body.png');
leg = loadImage('leg.png');
LHand = loadImage('handL.png');
RHand = loadImage('handR.png');
face = loadImage('face.png');
bandage = loadImage('bandage.png');
hair = loadImage('hair.png');
spike = loadImage('spike.png');
dot = loadImage('dot.png');
}
function setup() {
createCanvas(windowWidth, windowHeight);
imageMode(CENTER);
bodyX = width / 3;
bodyY = height / 2;
bodyW = 966 / 2;
bodyH = 1189 / 2;
ex = bodyX * 1.03;
ey = bodyY * 0.95;
ew = round(bodyW / 1.95);
eh = round(bodyH / 1.35);
c1 = round(sqrt(sq(eh / 2) - sq(ew / 2)));
f1x = ex;
f1y = ey - c1;
f2x = ex;
f2y = ey + c1;
for (let x = floor(ex - ew / 2); x < floor(ex + ew / 2); x += 1) {
for (let y = floor(ey - eh / 2); y < floor(ey + eh / 2); y += 1) {
let d = round(dist(x, y, f1x, f1y) + dist(x, y, f2x, f2y));
if (d == eh) {
xs.push(x);
ys.push(y);
}
}
}
cx1 = -bodyW / 5;
cx2 = bodyW / 4;
cy1 = -bodyH / 12;
cy2 = bodyH / 3.5;
l1x1 = bodyX - 75;
l1y1 = bodyY + 195;
l1x2 = bodyX -50;
l1y2 = bodyY+320;
l2x1 = bodyX +5;
l2y1 = bodyY + 195;
l2x2 = bodyX -35;
l2y2 = bodyY+320;
l3x1 = bodyX + 75;
l3y1 = bodyY + 195;
l3x2 = bodyX +90;
l3y2 = bodyY+300;
l4x1 = bodyX + 135;
l4y1 = bodyY +150;
l4x2 = bodyX +120;
l4y2 = bodyY+275;
for (let x = l1x2; x < l4x1; x++){
for (let y = l4y2; y<l1y2;y++){
if ((l1y2-y)/(l1x2-x)==(l1y2-l1y1)/(l1x2-l1x1) || (l2y2-y)/(l2x2-x)==(l2y2-l2y1)/(l2x2-l2x1) || (l3y2-y)/(l3x2-x)==(l3y2-l3y1)/(l3x2-l3x1) || (l4y2-y)/(l4x2-x)==(l4y2-l4y1)/(l4x2-l4x1)){
lineXs.push(x);
lineYs.push(y);
}
}
}
let happyB = createButton("happy");
let sadB = createButton("sad");
let surpriseB = createButton("surprise");
let angryB = createButton("angry");
createP("Emotion Level");
slider = createSlider(-5, 5, 0);
happyB.mousePressed(createHappy);
sadB.mousePressed(createSad);
surpriseB.mousePressed(createSurprise);
angryB.mousePressed(createAngry);
}
function draw() {
background(220);
console.log(surprises.length);
for (let i of angers) {
i.add();
i.fade();
i.hover(mouseX, mouseY);
if (i.count > 13) {
angers.splice(i, 1);
}
}
for (let i of surprises) {
i.add();
i.fade();
i.hover(mouseX, mouseY);
if (i.count > 13) {
surprises.splice(i, 1);
}
}
drawMonster();
for (let i of happiness) {
i.add(bodyX, bodyY, bodyW);
i.fade();
i.hover(mouseX, mouseY);
if (i.count > 13) {
happiness.splice(i, 1);
}
}
for (let i of sadness) {
i.add(bodyX, bodyY, bodyW);
i.fade();
i.hover(mouseX, mouseY);
if (i.count > 13) {
sadness.splice(i, 1);
}
}
}
function createHappy() {
let valid = false;
while (!valid) {
let x, y, w, h;
x = bodyX + random(cx1, cx2);
y = bodyY + random(cy1, cy2);
w = bodyW / random(20, 30);
h = w * happyRatio;
let overlap1 = false;
for (let h of happiness) {
let d = dist(x, y, h.x, h.y);
if (d < w / 2 + h.w / 2) {
overlap1 = true;
break;
}
}
let overlap2 = false;
for (let i of sadness) {
let d = dist(x, y, i.x, i.y);
if (d < w / 2 + i.w / 2) {
overlap2 = true;
break;
}
}
if (!overlap1 && !overlap2) {
valid = true;
}
if (valid) {
let newEmotion = new Happy(x, y, w, h);
happiness.push(newEmotion);
for (let h of happiness) {
h.count++;
}
}
}
}
function createSad() {
let valid = false;
while (!valid) {
let x, y, w, h;
x = bodyX + random(-bodyW / 6, bodyW / 5);
y = bodyY + random(-bodyH / 12, bodyH / 5);
w = bodyW / random(4, 10);
h = w * sadRatio;
let overlap1 = false;
for (let i of sadness) {
let d = dist(x, y, i.x, i.y);
if (d < w / 1.5 + i.w / 1.5) {
overlap1 = true;
break;
}
}
let overlap2 = false;
for (let h of happiness) {
let d = dist(x, y, h.x, h.y);
if (d < w / 2 + h.w / 2) {
overlap2 = true;
break;
}
}
if (!overlap1 && !overlap2) {
valid = true;
}
if (valid) {
let newEmotion = new Sad(x, y, w, h);
sadness.push(newEmotion);
for (let s of sadness) {
s.count++;
}
}
}
}
function createAngry() {
let valid = false;
while (!valid) {
let index = floor(random(0, xs.length));
let x, y, w, h;
x = xs[index];
y = ys[index];
w = bodyW / random(4, 10);
h = w * angryRatio;
let overlap = false;
for (let a of angers) {
let d = dist(x, y, a.x, a.y);
if (d < w * 1.2) {
overlap = true;
break;
}
}
if (!overlap) {
valid = true;
}
if (valid) {
let newEmotion = new Angry(x, y, w, h);
angers.push(newEmotion);
for (let a of angers) {
a.count++;
}
}
}
}
function createSurprise() {
let valid = false;
while (!valid) {
let index = floor(random(1, lineXs.length));
let x, y, w, h;
x = lineXs[index];
y = lineYs[index];
w = bodyW / random(6, 12);
h = w * surpriseRatio;
let overlap = false;
for (let i of surprises) {
let d = dist(x, y, i.x, i.y);
if (d < w * 1.2) {
overlap = true;
break;
}
}
if (!overlap) {
valid = true;
}
if (valid) {
let newEmotion = new Surprise(x, y, w, h);
surprises.push(newEmotion);
for (let i of surprises) {
i.count++;
}
}
}
}
function drawMonster() {
image(body, bodyX, bodyY, body.width / 2, body.height / 2);
image(leg, bodyX + 110, bodyY + 200, leg.width / 2.1, leg.height / 2.1);
image(leg, bodyX - 25, bodyY + 215, leg.width / 2.1, leg.height / 2.1);
push();
translate(bodyX + 185, bodyY + 80);
rotate(-0.2);
image(LHand, 0, 0, LHand.width / 2, LHand.height / 2);
pop();
push();
translate(bodyX - 110, bodyY + 100);
rotate(0.1);
image(RHand, 0, 0, RHand.width / 2, RHand.height / 2);
pop();
image(face, bodyX + 10, bodyY - 120, face.width / 2.1, face.height / 2.1);
image(bandage, bodyX - 40, bodyY + 60, bandage.width / 2, bandage.height / 2);
}
var bandaid, hair, spike, dot;
var bodyX, bodyY, bodyW, bodyH;
let happiness = [];
let sadness = [];
let angers = [];
let surprises = [];
let happyRatio = 1;
let angryRatio = 1.78;
let sadRatio = 1;
let surpriseRatio = 1;
let eyesRatio = 1.78;
let ex, ey, ew, eh;
let xs = [];
let ys = [];
let f1x, f1y, f2x, f2y, c;
let cx1, cx2, cy1, cy2;
let data;
function preload() {
body = loadImage('body.png');
leg = loadImage('leg.png');
LHand = loadImage('handL.png');
RHand = loadImage('handR.png');
face = loadImage('face.png');
bandage = loadImage('bandage.png');
hair = loadImage('hair.png');
spike = loadImage('spike.png');
dot = loadImage('dot.png');
}
function setup() {
createCanvas(windowWidth, windowHeight);
imageMode(CENTER);
bodyX = width / 3;
bodyY = height / 2;
bodyW = 966 / 2;
bodyH = 1189 / 2;
ex = bodyX * 1.03;
ey = bodyY * 0.95;
ew = round(bodyW / 1.95);
eh = round(bodyH / 1.35);
c = round(sqrt(sq(eh / 2) - sq(ew / 2)));
f1x = ex;
f1y = ey - c;
f2x = ex;
f2y = ey + c;
for (let x = floor(ex - ew / 2); x < floor(ex + ew / 2); x += 1) {
for (let y = floor(ey - eh / 2); y < floor(ey + eh / 2); y += 1) {
let d = round(dist(x, y, f1x, f1y) + dist(x, y, f2x, f2y));
if (d == eh) {
xs.push(x);
ys.push(y);
}
}
}
let happyB = createButton("happy");
let sadB = createButton("sad");
let surpriseB = createButton("surprise");
let angryB = createButton("angry");
createP("Emotion Level");
slider = createSlider(-5, 5, 0);
happyB.mousePressed(createHappy);
sadB.mousePressed(createSad);
surpriseB.mousePressed(createSurprise);
angryB.mousePressed(createAngry);
cx1 = -bodyW / 5;
cx2 = bodyW / 4;
cy1 = -bodyH / 12;
cy2 = bodyH / 3.5;
}
function draw() {
background(220);
for (let i of angers) {
i.add();
i.fade();
i.hover(mouseX, mouseY);
if (i.count > 13) {
angers.splice(i, 1);
}
}
for (let i of surprises) {
i.add();
i.fade();
i.hover(mouseX, mouseY);
if (i.count > 13) {
surprises.splice(i, 1);
}
}
drawMonster();
for (let i of happiness) {
i.add(bodyX, bodyY, bodyW);
i.fade();
i.hover(mouseX, mouseY);
if (i.count > 13) {
happiness.splice(i, 1);
}
}
for (let i of sadness) {
i.add(bodyX, bodyY, bodyW);
i.fade();
i.hover(mouseX, mouseY);
if (i.count > 13) {
sadness.splice(i, 1);
}
}
showGuide();
}
function createHappy() {
let valid = false;
while (!valid) {
let x, y, w, h;
x = bodyX + random(cx1, cx2);
y = bodyY + random(cy1, cy2);
w = bodyW / random(20, 30);
h = w * happyRatio;
let overlap1 = false;
for (let h of happiness) {
let d = dist(x, y, h.x, h.y);
if (d < w / 2 + h.w / 2) {
overlap1 = true;
break;
}
}
let overlap2 = false;
for (let i of sadness) {
let d = dist(x, y, i.x, i.y);
if (d < w / 2 + i.w / 2) {
overlap2 = true;
break;
}
}
if (!overlap1 && !overlap2) {
valid = true;
}
if (valid) {
let newEmotion = new Happy(x, y, w, h);
happiness.push(newEmotion);
for (let h of happiness) {
h.count++;
}
}
}
}
function createSad() {
let valid = false;
while (!valid) {
let x, y, w, h;
x = bodyX + random(-bodyW / 6, bodyW / 5);
y = bodyY + random(-bodyH / 12, bodyH / 5);
w = bodyW / random(4, 10);
h = w * sadRatio;
let overlap1 = false;
for (let i of sadness) {
let d = dist(x, y, i.x, i.y);
if (d < w / 1.5 + i.w / 1.5) {
overlap1 = true;
break;
}
}
let overlap2 = false;
for (let h of happiness) {
let d = dist(x, y, h.x, h.y);
if (d < w / 2 + h.w / 2) {
overlap2 = true;
break;
}
}
if (!overlap1 && !overlap2) {
valid = true;
}
if (valid) {
let newEmotion = new Sad(x, y, w, h);
sadness.push(newEmotion);
for (let s of sadness) {
s.count++;
}
}
}
}
function createAngry() {
let valid = false;
while (!valid) {
let index = floor(random(0, xs.length));
let x, y, w, h;
x = xs[index];
y = ys[index];
w = bodyW / random(4, 10);
h = w * angryRatio;
let overlap = false;
for (let a of angers) {
let d = dist(x, y, a.x, a.y);
if (d < w * 1.2) {
overlap = true;
break;
}
}
if (!overlap) {
valid = true;
}
if (valid) {
let newEmotion = new Angry(x, y, w, h);
angers.push(newEmotion);
for (let a of angers) {
a.count++;
}
}
}
}
function createSurprise() {
let valid = false;
while (!valid) {
let index = floor(random(1, xs.length));
let x, y, w, h;
x = xs[index];
y = ys[index];
w = bodyW / random(4, 8);
h = w * surpriseRatio;
let overlap = false;
for (let i of surprises) {
let d = dist(x, y, i.x, i.y);
if (d < w * 1.2) {
overlap = true;
break;
}
}
if (!overlap) {
valid = true;
}
if (valid) {
let newEmotion = new Surprise(x, y, w, h);
surprises.push(newEmotion);
for (let i of surprises) {
i.count++;
}
}
}
}
function drawMonster() {
image(body, bodyX, bodyY, body.width / 2, body.height / 2);
image(leg, bodyX + 110, bodyY + 200, leg.width / 2.1, leg.height / 2.1);
image(leg, bodyX - 25, bodyY + 215, leg.width / 2.1, leg.height / 2.1);
push();
translate(bodyX + 185, bodyY + 80);
rotate(-0.2);
image(LHand, 0, 0, LHand.width / 2, LHand.height / 2);
pop();
push();
translate(bodyX - 110, bodyY + 100);
rotate(0.1);
image(RHand, 0, 0, RHand.width / 2, RHand.height / 2);
pop();
image(face, bodyX + 10, bodyY - 120, face.width / 2.1, face.height / 2.1);
image(bandage, bodyX - 40, bodyY + 60, bandage.width / 2, bandage.height / 2);
}
function showGuide() {
noFill();
stroke(255);
let lx1 = bodyX + cx1;
let lx2 = bodyX + cx2;
let lx3 = bodyY + cy1;
let lx4 = bodyY + cy2;
line(lx1, 0, lx1, height);
line(lx2, 0, lx2, height);
line(0, lx3, width, lx3);
line(0, lx4, width, lx4);
ellipse(ex, ey, ew, eh);
ellipse(f1x, f1y, 5, 5);
ellipse(f2x, f2y, 5, 5);
ellipse(bodyX + 105, bodyY + 200, 60, 180);
ellipse(bodyX - 35, bodyY + 235, 60, 150);
}let face,body,handL,handR,footL,footR,eyes,happy,sad,angry,shock;
let faceX, faceY, faceW, faceH, bodyX, bodyY, bodyH, bodyW;
let handLX, handLY, handLW, handLH, handRX, handRY, handRW, handRH;
let footLX, footLY, footLW, footLH, footRX, footRY, footRW, footRH;
let eyesX,eyesY,eyesW,eyesH;
let bodyRatio = 1.25;
let faceRatio = 1;
let handRatio = 1.78
let footRatio = 1.78;
let happyRatio = 1;
let angryRatio = 1.78;
let sadRatio = 1;
let shockRatio = 1;
let eyesRatio = 1.78;
let happiness = [];
let sadness = [];
let anger = [];
let shocks = [];
let ex, ey, ew, eh;
let xs = [];
let ys = [];
let f1x, f1y, f2x, f2y, c;
let lx1, lx2, lx3, lx4;
let slider
function preload() {
eyes = loadImage('eyes.png');
}
function setup() {
createCanvas(windowWidth, windowHeight);
imageMode(CENTER);
let happyB = createButton("happy");
let sadB = createButton("sad");
let shockB = createButton("shock");
let angryB = createButton("angry");
createP("Emotion Level");
slider = createSlider(-5,5,0);
happyB.mousePressed(createHappy);
sadB.mousePressed(createSad);
shockB.mousePressed(createShock);
angryB.mousePressed(createAngry);
bodyX = width / 3;
bodyY = height / 2;
bodyW = width/2;
bodyH = bodyW * bodyRatio;
ex = bodyX * 1.03;
ey = bodyY * 0.95;
ew = round(bodyW / 1.75);
eh = round(bodyH / 1.25);
c = round(sqrt(sq(eh / 2) - sq(ew / 2)));
f1x = ex;
f1y = ey - c;
f2x = ex;
f2y = ey + c;
for (let x = floor(ex - ew / 2); x < floor(ex + ew / 2); x += 1) {
for (let y = floor(ey - eh / 2); y < floor(ey + eh / 2); y += 1) {
let d = round(dist(x, y, f1x, f1y) + dist(x, y, f2x, f2y));
if (d == eh) {
xs.push(x);
ys.push(y);
}
}
}
}
function draw() {
background(200);
for (let i of anger) {
i.add();
i.fade();
i.hover(mouseX,mouseY);
if (i.count > 13) {
anger.splice(i, 1);
}
}
for (let i of shocks) {
i.add();
i.fade();
i.hover(mouseX,mouseY);
if (i.count > 13) {
shocks.splice(i, 1);
}
}
drawMonster();
for (let i of happiness) {
i.add(bodyX, bodyY, bodyW);
i.fade();
i.hover(mouseX,mouseY);
if (i.count > 13) {
happiness.splice(i, 1);
}
}
for (let i of sadness) {
i.add(bodyX, bodyY, bodyW);
i.fade();
i.hover(mouseX,mouseY);
if (i.count > 13) {
sadness.splice(i, 1);
}
}
}
function createHappy() {
let valid = false;
while (!valid) {
let x, y, w, h;
x = bodyX + random(-bodyW / 5, bodyW / 4);
y = bodyY + random(-bodyH / 12, bodyH / 3.5);
w = bodyW / random(20, 30);
h = w * happyRatio;
let overlap1 = false;
for (let h of happiness) {
let d = dist(x, y, h.x, h.y);
if (d < w / 2 + h.w / 2) {
overlap1 = true;
break;
}
}
let overlap2 = false;
for (let i of sadness) {
let d = dist(x, y, i.x, i.y);
if (d < w / 2 + i.w / 2) {
overlap2 = true;
break;
}
}
if (!overlap1 && !overlap2) {
valid = true;
}
if (valid) {
let newEmotion = new Happy(x, y, w, h);
happiness.push(newEmotion);
for (let h of happiness) {
h.count++;
}
}
}
}
function createSad() {
let valid = false;
while (!valid) {
let x, y, w, h;
x = bodyX + random(-bodyW / 6, bodyW / 5);
y = bodyY + random(-bodyH / 12, bodyH / 5);
w = bodyW / random(10, 20);
h = w * sadRatio;
let overlap1 = false;
for (let i of sadness) {
let d = dist(x, y, i.x, i.y);
if (d < w / 1.5 + i.w / 1.5) {
overlap1 = true;
break;
}
}
let overlap2 = false;
for (let h of happiness) {
let d = dist(x, y, h.x, h.y);
if (d < w / 2 + h.w / 2) {
overlap2 = true;
break;
}
}
if (!overlap1 && !overlap2) {
valid = true;
}
if (valid) {
let newEmotion = new Sad(x, y, w, h);
sadness.push(newEmotion);
for (let s of sadness) {
s.count++;
}
}
}
}
function createAngry() {
let valid = false;
while (!valid) {
let index = floor(random(0, xs.length));
let x, y, w, h;
x = xs[index];
y = ys[index];
w = bodyW / random(4, 10);
h = w * angryRatio;
let overlap = false;
for (let a of anger) {
let d = dist(x, y, a.x, a.y);
if (d < w * 1.2) {
overlap = true;
break;
}
}
if (!overlap) {
valid = true;
}
if (valid) {
let newEmotion = new Angry(x, y, w, h);
anger.push(newEmotion);
for (let a of anger) {
a.count++;
}
}
}
}
function createShock() {
let valid = false;
while (!valid) {
let index = floor(random(1, xs.length));
let x, y, w, h;
x = xs[index];
y = ys[index];
w = bodyW / random(4, 8);
h = w * shockRatio;
let overlap = false;
for (let i of shocks) {
let d = dist(x, y, i.x, i.y);
if (d < w * 1.2) {
overlap = true;
break;
}
}
if (!overlap) {
valid = true;
}
if (valid) {
let newEmotion = new Shock(x, y, w, h);
shocks.push(newEmotion);
for (let i of shocks) {
i.count++;
}
}
}
}
function drawMonster() {
angleMode(DEGREES);
eyesX = bodyX;
eyesY = bodyY / 1.7;
eyesW = bodyW / 5;
eyesH = eyesW / eyesRatio;
handLX = bodyX + 80;
handLY = bodyY + 10;
handLW = bodyW / 2;
handLH = handLW * handRatio;
handRX = bodyX - 70;
handRY = bodyY + 20;
handRW = bodyW / 2;
handRH = handRW * handRatio;
footLX = bodyX - 20;
footLY = bodyY + 120;
footLW = bodyW / 2;
foolLH = footLW * footRatio;
footRX = bodyX + 55;
footRY = bodyY + 120;
footRW = bodyW / 2;
foolRH = footRW * footRatio;
push();
translate(handLX, handLY);
rotate(-30);
image(handL, 0, 0, handLW, handLH);
pop();
push();
translate(handRX, handRY);
rotate(0);
image(handR, 0, 0, handRW, handRH);
pop();
image(footL, footLX, footLY, footLW, footLH);
image(footR, footRX, footRY, footRW, footRH);
image(body, bodyX, bodyY, bodyW, bodyH);
image(eyes,eyesX,eyesY,eyesW,eyesH);
let adjust = slider.value();
let ankley = 20+adjust;
let adjustLx=-1;
let adjustLy=20-adjust;
let adjustRx=1;
let adjustRy = 20-adjust;
noFill();
stroke(255);
beginShape();
curveVertex(eyesX+adjustLx,eyesY+adjustLy);
curveVertex(eyesX-5,eyesY+20);
curveVertex(eyesX,eyesY+ankley);
curveVertex(eyesX+5,eyesY+20);
curveVertex(eyesX+adjustRx,eyesY+adjustRy);
endShape();
}
function showGuide() {
}let face;
let body;
let handL;
let handR;
let footL;
let footR;
let happy;
let sad;
let angry;
let shock;
let bodyRatio = 1.25;
let faceRatio = 1;
let handRatio = 1.78
let footRatio = 1.78;
let happyRatio = 1;
let angryRatio = 1.78;
let sadRatio = 1;
let shockRatio = 1;
let faceX, faceY, faceW, faceH, bodyX, bodyY, bodyH, bodyW;
let handLX, handLY, handLW, handLH, handRX, handRY, handRW, handRH;
let footLX, footLY, footLW, footLH, footRX, footRY, footRW, footRH;
let happiness = [];
let sadness = [];
let anger = [];
let shocks = [];
let ex, ey, ew, eh;
let xs = [];
let ys = [];
let f1x, f1y, f2x, f2y, c;
let lx1, lx2, lx3, lx4;
function preload() {
}
function setup() {
createCanvas(800, 450);
let happyB = createButton("happy");
let sadB = createButton("sad");
let shockB = createButton("shock");
let angryB = createButton("angry");
happyB.mousePressed(createHappy);
sadB.mousePressed(createSad);
shockB.mousePressed(createShock);
angryB.mousePressed(createAngry);
bodyX = width / 4;
bodyY = height / 2.5;
bodyW = width / 3;
bodyH = bodyW * bodyRatio;
ex = bodyX * 1.03;
ey = bodyY * 0.95;
ew = round(bodyW / 1.75);
eh = round(bodyH / 1.25);
c = round(sqrt(sq(eh / 2) - sq(ew / 2)));
f1x = ex;
f1y = ey - c;
f2x = ex;
f2y = ey + c;
for (let x = floor(ex - ew / 2); x < floor(ex + ew / 2); x += 1) {
for (let y = floor(ey - eh / 2); y < floor(ey + eh / 2); y += 1) {
let d = round(dist(x, y, f1x, f1y) + dist(x, y, f2x, f2y));
if (d == eh) {
xs.push(x);
ys.push(y);
}
}
}
imageMode(CENTER);
}
function draw() {
background(200);
for (let i of anger) {
i.add();
i.fade();
if (i.count > 13) {
anger.splice(i, 1);
}
}
for (let i of shocks) {
i.add();
i.fade();
if (i.count > 13) {
shocks.splice(i, 1);
}
}
drawMonster();
for (let i of happiness) {
i.add(bodyX, bodyY, bodyW);
i.fade();
if (i.count > 13) {
happiness.splice(i, 1);
}
}
for (let i of sadness) {
i.add(bodyX, bodyY, bodyW);
i.fade();
if (i.count > 13) {
sadness.splice(i, 1);
}
}
}
function createHappy() {
let valid = false;
while (!valid) {
let x, y, w, h;
x = bodyX + random(-bodyW / 5, bodyW / 4);
y = bodyY + random(-bodyH / 12, bodyH / 3.5);
w = bodyW / random(20, 30);
h = w * happyRatio;
let overlap1 = false;
for (let h of happiness) {
let d = dist(x, y, h.x, h.y);
if (d < w / 2 + h.w / 2) {
overlap1 = true;
break;
}
}
let overlap2 = false;
for (let i of sadness) {
let d = dist(x, y, i.x, i.y);
if (d < w / 2 + i.w / 2) {
overlap2 = true;
break;
}
}
if (!overlap1 && !overlap2) {
valid = true;
}
if (valid) {
let newEmotion = new Happy(x, y, w, h);
happiness.push(newEmotion);
for (let h of happiness) {
h.count++;
}
}
}
}
function createSad() {
let valid = false;
while (!valid) {
let x, y, w, h;
x = bodyX + random(-bodyW / 6, bodyW / 5);
y = bodyY + random(-bodyH / 12, bodyH / 5);
w = bodyW / random(10, 20);
h = w * sadRatio;
let overlap1 = false;
for (let i of sadness) {
let d = dist(x, y, i.x, i.y);
if (d < w / 1.5 + i.w / 1.5) {
overlap1 = true;
break;
}
}
let overlap2 = false;
for (let h of happiness) {
let d = dist(x, y, h.x, h.y);
if (d < w / 2 + h.w / 2) {
overlap2 = true;
break;
}
}
if (!overlap1 && !overlap2) {
valid = true;
}
if (valid) {
let newEmotion = new Sad(x, y, w, h);
sadness.push(newEmotion);
for (let s of sadness) {
s.count++;
}
}
}
}
function createAngry() {
let valid = false;
while (!valid) {
let index = floor(random(1, xs.length));
let x, y, w, h;
x = xs[index];
y = ys[index];
w = bodyW / random(4, 10);
h = w * angryRatio;
let overlap = false;
for (let a of anger) {
let d = dist(x, y, a.x, a.y);
if (d < w * 1.2) {
overlap = true;
break;
}
}
if (!overlap) {
valid = true;
}
if (valid) {
let newEmotion = new Angry(x, y, w, h);
anger.push(newEmotion);
for (let a of anger) {
a.count++;
}
}
}
}
function createShock() {
let valid = false;
while (!valid) {
let index = floor(random(1, xs.length));
let x, y, w, h;
x = xs[index];
y = ys[index];
w = bodyW / random(4, 8);
h = w * shockRatio;
let overlap = false;
for (let i of shocks) {
let d = dist(x, y, i.x, i.y);
if (d < w * 1.2) {
overlap = true;
break;
}
}
if (!overlap) {
valid = true;
}
if (valid) {
let newEmotion = new Shock(x, y, w, h);
shocks.push(newEmotion);
for (let i of shocks) {
i.count++;
}
}
}
}
function drawMonster() {
angleMode(DEGREES);
faceX = bodyX;
faceY = bodyY / 1.5;
faceW = bodyW / 5;
faceH = faceW * faceRatio;
handLX = bodyX + 80;
handLY = bodyY + 10;
handLW = bodyW / 2;
handLH = handLW * handRatio;
handRX = bodyX - 70;
handRY = bodyY + 20;
handRW = bodyW / 2;
handRH = handRW * handRatio;
footLX = bodyX - 20;
footLY = bodyY + 120;
footLW = bodyW / 2;
foolLH = footLW * footRatio;
footRX = bodyX + 55;
footRY = bodyY + 120;
footRW = bodyW / 2;
foolRH = footRW * footRatio;
push();
translate(handLX, handLY);
rotate(-30);
image(handL, 0, 0, handLW, handLH);
pop();
push();
translate(handRX, handRY);
rotate(0);
image(handR, 0, 0, handRW, handRH);
pop();
image(footL, footLX, footLY, footLW, footLH);
image(footR, footRX, footRY, footRW, footRH);
image(body, bodyX, bodyY, bodyW, bodyH);
image(face, faceX, faceY, faceW, faceH);
}
function showGuide() {
}let xs = [];
let ys = [];
let x2s = [];
let y2s = [];
let f1x, f1y, f2x, f2y;
let c;
let angry;
let anger = [];
let surprises = [];
let x1 = 500;
let y1 = 100;
let x2 = 520;
let y2 = 300;
function preload(){
}
function setup() {
createCanvas(600, 400);
ex = 200;
ey = 200;
ew = 200;
eh = 300;
c = sqrt(sq(eh / 2) - sq(ew / 2));
f1x = ex;
f1y = ey - c;
f2x = ex;
f2y = ey + c;
for (let x = floor(ex - ew / 2); x < floor(ex + ew / 2); x += 1) {
for (let y = floor(ey - eh / 2); y < floor(ey + eh / 2); y += 1) {
let d = round(dist(x, y, f1x, f1y) + dist(x, y, f2x, f2y));
if (d == eh) {
xs.push(x);
ys.push(y);
}
}
}
for (let x = x1; x < x2; x++){
for (let y = y1; y<y2;y++){
if ((y2-y)/(x2-x)==(y2-y1)/(x2-x1)){
x2s.push(x);
y2s.push(y);
}
}
}
angerB = createButton("angry");
angerB.mousePressed(createAnger);
surpriseB = createButton("surprise");
surpriseB.mousePressed(createSurprise);
}
function createAnger(){
let index = floor(random(0, xs.length));
let newEmotion = new Angry(xs[index],ys[index]);
anger.push(newEmotion);
}
function createSurprise(){
let index = floor(random(0, x2s.length));
let newEmotion = new Surprise(x2s[index],y2s[index]);
surprises.push(newEmotion);
}
function draw() {
background(220);
imageMode(CENTER);
for (let a of anger){
a.add();
}
for (let a of surprises){
a.add(); 
}
noFill();
stroke(255);
ellipse(ex, ey, ew, eh);
fill('red');
ellipse(f1x, f1y, 5, 5);
ellipse(f2x, f2y, 5, 5);
stroke('red');
strokeWeight(2);
for (let i = 0; i < xs.length - 1; i = i + 1) {
point(xs[i], ys[i]);
}
noFill();
stroke(255);
line(x1,y1,x2,y2);
}let face;
let body;
let handL;
let handR;
let footL;
let footR;
let happy;
let sad;
let angry;
let shock;
let bodyRatio = 1.25;
let faceRatio = 1;
let handRatio = 1.78
let footRatio = 1.78;
let happyRatio = 1;
let angryRatio = 1.78;
let sadRatio = 1;
let faceX, faceY, faceW, faceH, bodyX, bodyY, bodyH, bodyW;
let handLX, handLY, handLW, handLH, handRX, handRY, handRW, handRH;
let footLX, footLY, footLW, footLH, footRX, footRY, footRW, footRH;
let happiness = [];
let sadness = [];
let anger = [];
let shocks = [];
let ex, ey, ew, eh;
let xs = [];
let ys = [];
let f1x, f1y, f2x, f2y, c;
let lx1, lx2, lx3, lx4;
function preload() {
}
function setup() {
createCanvas(800, 450);
let happyB = createButton("happy");
let sadB = createButton("sad");
let shockB = createButton("shock");
let angryB = createButton("angry");
happyB.mousePressed(createHappy);
sadB.mousePressed(createSad);
angryB.mousePressed(createAngry);
bodyX = width / 4;
bodyY = height / 2.5;
bodyW = width / 3;
bodyH = bodyW * bodyRatio;
ex = bodyX * 1.03;
ey = bodyY * 0.95;
ew = round(bodyW / 1.75);
eh = round(bodyH / 1.25);
c = round(sqrt(sq(eh / 2) - sq(ew / 2)));
f1x = ex;
f1y = ey - c;
f2x = ex;
f2y = ey + c;
for (let x = floor(ex - ew / 2); x < floor(ex + ew / 2); x += 1) {
for (let y = floor(ey - eh / 2); y < floor(ey + eh / 2); y += 1) {
let d = round(dist(x, y, f1x, f1y) + dist(x, y, f2x, f2y));
if (d == eh) {
xs.push(x);
ys.push(y);
}
}
}
imageMode(CENTER);
}
function draw() {
background(200);
for (let i of anger) {
i.add();
i.fade();
if (i.count > 13) {
anger.splice(i, 1);
}
}
drawMonster();
for (let i of happiness) {
i.add(bodyX, bodyY, bodyW);
i.fade();
if (i.count > 13) {
happiness.splice(i, 1);
}
}
for (let i of sadness) {
i.add(bodyX, bodyY, bodyW);
i.fade();
if (i.count > 13) {
sadness.splice(i, 1);
}
}
}
function createHappy() {
let valid = false;
while (!valid) {
let x, y, w, h;
x = bodyX + random(-bodyW / 4, bodyW / 4);
y = bodyY + random(-bodyH / 7, bodyH / 3.5);
w = bodyW / random(10, 20);
h = w * happyRatio;
let overlap = false;
for (let h of happiness) {
let d = dist(x, y, h.x, h.y);
if (d < w / 2 + h.w / 2) {
overlap = true;
break;
}
}
if (!overlap) {
valid = true;
}
if (valid) {
let newEmotion = new Happy(x, y, w, h);
happiness.push(newEmotion);
for (let h of happiness) {
h.count++;
}
}
}
}
function createSad() {
let valid = false;
while (!valid) {
let x, y, w, h;
x = bodyX + random(-bodyW / 4, bodyW / 4);
y = bodyY + random(-bodyH / 7, bodyH / 3.5);
w = bodyW / random(10, 20);
h = w * sadRatio;
let overlap = false;
for (let s of sadness) {
let d = dist(x, y, h.x, h.y);
if (d < w / 2 + h.w / 2) {
overlap = true;
break;
}
}
if (!overlap) {
valid = true;
}
if (valid) {
let newEmotion = new Sad(x, y, w, h);
sadness.push(newEmotion);
for (let s of sadness) {
s.count++;
}
}
}
}
function createAngry() {
let valid = false;
while (!valid) {
let index = floor(random(1, xs.length));
let x, y, w, h;
x = xs[index];
y = ys[index];
w = bodyW / random(4, 10);
h = w * angryRatio;
let overlap = false;
for (let a of anger) {
let d = dist(x, y, a.x, a.y);
if (d < w * 1.2) {
overlap = true;
break;
}
}
if (!overlap) {
valid = true;
}
if (valid) {
let newEmotion = new Angry(x, y, w, h);
anger.push(newEmotion);
for (let a of anger) {
a.count++;
}
}
}
}
function drawMonster() {
angleMode(DEGREES);
faceX = bodyX;
faceY = bodyY / 1.5;
faceW = bodyW / 5;
faceH = faceW * faceRatio;
handLX = bodyX + 80;
handLY = bodyY + 10;
handLW = bodyW / 2;
handLH = handLW * handRatio;
handRX = bodyX - 70;
handRY = bodyY + 20;
handRW = bodyW / 2;
handRH = handRW * handRatio;
footLX = bodyX - 20;
footLY = bodyY + 120;
footLW = bodyW / 2;
foolLH = footLW * footRatio;
footRX = bodyX + 55;
footRY = bodyY + 120;
footRW = bodyW / 2;
foolRH = footRW * footRatio;
push();
translate(handLX, handLY);
rotate(-30);
image(handL, 0, 0, handLW, handLH);
pop();
push();
translate(handRX, handRY);
rotate(0);
image(handR, 0, 0, handRW, handRH);
pop();
image(footL, footLX, footLY, footLW, footLH);
image(footR, footRX, footRY, footRW, footRH);
image(body, bodyX, bodyY, bodyW, bodyH);
image(face, faceX, faceY, faceW, faceH);
}
function showGuide() {
}let face;
let body;
let handL;
let handR;
let footL;
let footR;
let happy;
let sad;
let angry;
let shock;
let bodyRatio = 1.25;
let faceRatio = 1;
let handRatio = 1.78
let footRatio = 1.78;
let happyRatio = 1;
let angryRatio = 1.78;
let faceX, faceY, faceW, faceH, bodyX, bodyY, bodyH, bodyW;
let handLX, handLY, handLW, handLH, handRX, handRY, handRW, handRH;
let footLX, footLY, footLW, footLH, footRX, footRY, footRW, footRH;
let happiness = [];
let sadness = [];
let anger = [];
let shocks = [];
let lx1, lx2, lx3, lx4;
let mouseCount = 0;
function preload() {
}
function setup() {
createCanvas(800, 450);
let happyB = createButton("happy");
let sadB = createButton("sad");
let shockB = createButton("shock");
let angryB = createButton("angry");
happyB.mousePressed(createHappy);
angryB.mousePressed(createAngry);
}
function mousePressed(){
mouseCount ++; 
}
function draw() {
background(200);
imageMode(CENTER);
angleMode(DEGREES);
bodyX = width / 4;
bodyY = height / 2.5;
bodyW = width / 3;
bodyH = bodyW * bodyRatio;
faceX = bodyX;
faceY = bodyY / 1.5;
faceW = bodyW / 5;
faceH = faceW * faceRatio;
handLX = bodyX + 80;
handLY = bodyY + 10;
handLW = bodyW / 2;
handLH = handLW * handRatio;
handRX = bodyX - 70;
handRY = bodyY + 20;
handRW = bodyW / 2;
handRH = handRW * handRatio;
footLX = bodyX - 20;
footLY = bodyY + 120;
footLW = bodyW / 2;
foolLH = footLW * footRatio;
footRX = bodyX + 55;
footRY = bodyY + 120;
footRW = bodyW / 2;
foolRH = footRW * footRatio;
push();
translate(handLX, handLY);
rotate(-30);
image(handL, 0, 0, handLW, handLH);
pop();
push();
translate(handRX, handRY);
rotate(0);
image(handR, 0, 0, handRW, handRH);
pop();
image(footL, footLX, footLY, footLW, footLH);
image(footR, footRX, footRY, footRW, footRH);
image(body, bodyX, bodyY, bodyW, bodyH);
image(face, faceX, faceY, faceW, faceH);
for (let h of happiness) {
h.add(bodyX, bodyY, bodyW);
if (h.count > 13) {
happiness.splice(h, 1);
}
}
for (let a of anger) {
a.add(bodyX, bodyY, bodyW);
}
console.log(anger.length);
console.log("array: "+ happiness.length + " clicks: " + mouseCount);
}
function createHappy() {
let valid = false;
while (!valid) {
let x, y, w, h;
x = bodyX + random(-bodyW / 4, bodyW / 4);
y = bodyY + random(-bodyH / 7, bodyH / 3.5);
w = bodyW / random(10, 20);
h = w * happyRatio;
let overlap = false;
for (let h of happiness) {
let d = dist(x, y, h.x, h.y);
if (d < w / 2 + h.w / 2) {
overlap = true
break
}
}
if (!overlap) { valid = true }
if (valid) {
let newEmotion = new Happy(x, y, w, h);
happiness.push(newEmotion);
for (let h of happiness) {
h.count++;
}
}
}
}
function createAngry() {
let x, y, w, h;
x = bodyX + random(-bodyW / 4, bodyW / 4);
y = bodyY + random(-bodyH / 7, bodyH / 3.5);
w = bodyW / random(4,10);
h = w * angryRatio;
let newEmotion = new Angry(x,y,w,h);
anger.push(newEmotion);
}
let face;
let body;
let handL;
let handR;
let footL;
let footR;
let happy;
let sad;
let angry;
let shock;
let bodyRatio = 1.25;
let faceRatio = 1;
let handRatio = 1.78
let footRatio = 1.78;
let happyRatio = 1;
let angryRatio = 1.78;
let faceX, faceY, faceW, faceH, bodyX, bodyY, bodyH, bodyW;
let handLX, handLY, handLW, handLH, handRX, handRY, handRW, handRH;
let footLX, footLY, footLW, footLH, footRX, footRY, footRW, footRH;
let happiness = [];
let sadness = [];
let anger = [];
let shocks = [];
let lx1, lx2, lx3, lx4;
let mouseCount = 0;
function preload() {
}
function setup() {
createCanvas(800, 450);
let happyB = createButton("happy");
let sadB = createButton("sad");
let shockB = createButton("shock");
let angryB = createButton("angry");
happyB.mousePressed(createHappy);
angryB.mousePressed(createAngry);
}
function mousePressed(){
mouseCount ++; 
}
function draw() {
background(200);
imageMode(CENTER);
angleMode(DEGREES);
bodyX = width / 4;
bodyY = height / 2.5;
bodyW = width / 3;
bodyH = bodyW * bodyRatio;
faceX = bodyX;
faceY = bodyY / 1.5;
faceW = bodyW / 5;
faceH = faceW * faceRatio;
handLX = bodyX + 80;
handLY = bodyY + 10;
handLW = bodyW / 2;
handLH = handLW * handRatio;
handRX = bodyX - 70;
handRY = bodyY + 20;
handRW = bodyW / 2;
handRH = handRW * handRatio;
footLX = bodyX - 20;
footLY = bodyY + 120;
footLW = bodyW / 2;
foolLH = footLW * footRatio;
footRX = bodyX + 55;
footRY = bodyY + 120;
footRW = bodyW / 2;
foolRH = footRW * footRatio;
push();
translate(handLX, handLY);
rotate(-30);
image(handL, 0, 0, handLW, handLH);
pop();
push();
translate(handRX, handRY);
rotate(0);
image(handR, 0, 0, handRW, handRH);
pop();
image(footL, footLX, footLY, footLW, footLH);
image(footR, footRX, footRY, footRW, footRH);
image(body, bodyX, bodyY, bodyW, bodyH);
image(face, faceX, faceY, faceW, faceH);
for (let h of happiness) {
h.add(bodyX, bodyY, bodyW);
if (h.count > 13) {
happiness.splice(h, 1);
}
}
for (let a of anger) {
a.add(bodyX, bodyY, bodyW);
}
}
function createHappy() {
let valid = false;
let overlap = false;
let attempt = 0;
while (!valid) {
let x, y, w, h;
x = bodyX + random(-bodyW / 4, bodyW / 4);
y = bodyY + random(-bodyH / 7, bodyH / 3.5);
w = bodyW / random(10, 20);
h = w * happyRatio;
for (let h of happiness) {
let d = dist(x, y, h.x, h.y);
if (d < w / 2 + h.w / 2) {
overlap = true
break
}
}
if (!overlap) { valid = true }
if (valid) {
let newEmotion = new Happy(x, y, w, h);
happiness.push(newEmotion);
for (let h of happiness) {
h.count++;
}
}
}
}
function createAngry() {
let x, y, w, h;
x = bodyX + random(-bodyW / 4, bodyW / 4);
y = bodyY + random(-bodyH / 7, bodyH / 3.5);
w = bodyW / random(4,10);
h = w * angryRatio;
let newEmotion = new Angry(x,y,w,h);
anger.push(newEmotion);
}
let face;
let body;
let handL;
let handR;
let footL;
let footR;
let happy;
let sad;
let angry;
let shock;
function preload(){
face = loadImage ('face.png'); 
body = loadImage ('body.png'); 
}
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
imageMode(CENTER);
image (body,width/2,height/2,200,200);
image(face,width/2,height/2,200,200);
}
let face;
let body;
let handL;
let handR;
let footL;
let footR;
let happy;
let sad;
let angry;
let shock;
let bodyRatio = 1.25;
let faceRatio = 1;
let handRatio = 1.78
let footRatio = 1.78;
let faceX, faceY, faceW, faceH, bodyX, bodyY, bodyH, bodyW;
let handLX, handLY, handLW, handLH, handRX, handRY, handRW, handRH;
let footLX, footLY, footLW, footLH, footRX, footRY, footRW, footRH;
let happiness = [];
let sadness = [];
let anger = [];
let shocks = [];
function preload() {
}
function setup() {
createCanvas(800, 450);
let happyB = createButton("happy");
let sadB = createButton("sad");
let shockB = createButton("shock");
let angryB = createButton("angry");
happyB.mousePressed(createHappy);
sadB.mousePressed(createSad);
shockB.mousePressed(createShock);
angryB.mousePressed(createAngry);
}
function createHappy() {
let x = 
let valid = true;
for (let h of happiness){
}
let newEmotion = new Happy();
happiness.push(newEmotion);
for (let h of happiness){
h.count++; 
}
}
function draw() {
background(220);
imageMode(CENTER);
angleMode(DEGREES);
bodyX = width / 4;
bodyY = height / 2.5;
bodyW = width / 3;
bodyH = bodyW * bodyRatio;
faceX = bodyX;
faceY = bodyY / 1.5;
faceW = bodyW / 5;
faceH = faceW * faceRatio;
handLX = bodyX + 80;
handLY = bodyY + 10;
handLW = bodyW / 2;
handLH = handLW * handRatio;
handRX = bodyX - 70;
handRY = bodyY + 20;
handRW = bodyW / 2;
handRH = handRW * handRatio;
footLX = bodyX - 20;
footLY = bodyY + 120;
footLW = bodyW / 2;
foolLH = footLW * footRatio;
footRX = bodyX + 55;
footRY = bodyY + 120;
footRW = bodyW / 2;
foolRH = footRW * footRatio;
push();
translate(handLX, handLY);
rotate(-30);
image(handL, 0, 0, handLW, handLH);
pop();
push();
translate(handRX, handRY);
rotate(0);
image(handR, 0, 0, handRW, handRH);
pop();
image(footL, footLX, footLY, footLW, footLH);
image(footR, footRX, footRY, footRW, footRH);
image(body, bodyX, bodyY, bodyW, bodyH);
image(face, faceX, faceY, faceW, faceH);
for (let h of happiness) {
h.add(bodyX, bodyY, bodyW);
if (h.count > 13){
happiness.splice(h,1); 
}
}
for (let s of sadness) {
s.add(bodyX, bodyY, bodyW);
}
console.log(happiness.length);
}let balls = [];
let num = 300;
let attempt = 0;
let img;
function preload() {
img = loadImage('pic.jpg');
}
function setup() {
createCanvas(400, 400);
background(img);
}
function draw() {
newBall();
runBall();
console.log(balls.length);
}
function newBall() {
let x = random(width);
let y = random(height);
let valid = true;
attempt ++;
if (attempt > 800){
noLoop();
console.log("FINISHED");
}
for (let b of balls) {
let d = dist(x, y, b.x, b.y);
if (d < b.r) {
valid = false;
}
}
if (valid == true) {
let b = new Ball(x, y);
balls.push(b);
}
}
function runBall() {
for (let b of balls) {
let valid = true;
if (b.onEdge() == true) {
valid = false;
}
for (let other of balls) {
if (b != other) {
let d = dist (b.x,b.y,other.x,other.y)
if (d-2 <(b.r+other.r)) {
valid = false;
}
}
}
b.show();
if (valid == true) {
b.grow();
}
}
Introduction to Physical Computing
ITP
This sketch will send one value in ascii from arduino to P5
function setup() {
createCanvas(320, 240);
}
function draw() {
background(255);
textSize(24);
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
let xoff2 = 50;
let x,y;
let noiseScale=0.02;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(20);
noFill();
for (let i = 0; i <width; i++){
let noiseVal = noise((mouseX+i)*noiseScale,(mouseY+i)*noiseScale);
x=map(noise(xoff1),0,1,0,width);
y=map(noise(xoff2),0,1,0,height);
stroke(noiseVal*255,120,180,150);
ellipse(x,y,i/2,height/2);
stroke(150,noiseVal*255,150,150);
rect(x,y,i/2,height/3);
triangle(x,y,i/2,height/3,width/3,i/3);
xoff1+=0.0001;
xoff2+=0.0002;
}
}let video;
let poseNet;
let poses = [];
let mouseWidth = 0;
let mouseHeight = 0;
let type = 'single';
function setup() {
createCanvas(640, 480);
video = createCapture(VIDEO);
video.size(width, height);
poseNet = ml5.poseNet(video, type, modelReady);
poseNet.on('pose', function(results) {
poses = results;
});
}
function modelReady() {
select('#status').html('Model Loaded');
}
function drawKeypoints() {
if (poses.length > 0) {
let pose = poses[0].pose;
let nose;
let leftEye;
let rightEye;
let leftShoulder;
let rightShoulder;
let leftElbow;
let rightElbow;
let leftWrist;
let rightWrist;
let vector1;
let vector2;
let vector3;
let vector4;
let baseVector;
let referenceVector;
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
case 7:
leftElbow = keypoint;
break;
case 8:
rightElbow = keypoint;
break;
case 9:
leftWrist = keypoint;
break;
case 10:
rightWrist = keypoint;
break;
}
if (leftWrist && leftElbow && leftShoulder) {
}
if (leftEye && rightEye && nose) {
let averageX = (leftEye.position.x + rightEye.position.x) / 2;
let averageY = (leftEye.position.x + rightEye.position.x) / 2;
noStroke();
fill(200, 0, 55, 10);
triangle(leftEye.position.x, leftEye.position.y, rightEye.position.x, rightEye.position.y, nose.position.x, nose.position.y);
baseVector = createVector(averageX, averageY);
referenceVector = createVector(nose.position.x, nose.position.y);
line();
}
if (leftElbow && rightShoulder && leftShoulder && rightElbow) {
noStroke();
fill(55, 0, 200, 10);
quad(rightShoulder.position.x, rightShoulder.position.y, leftShoulder.position.x, leftShoulder.position.y, leftElbow.position.x, leftElbow.position.y, rightElbow.position.x, rightElbow.position.y);
vector1 = createVector(rightShoulder.position.x, rightShoulder.position.y);
vector2 = createVector(rightElbow.position.x, rightElbow.position.y);
}
}
}
}
}
function draw() {
background(220);
image(video, 0, 0, width, height);
drawKeypoints();
}let balls = [];
let newBalls = [];
let num = 20;
let r = 50;
let d;
let draggable = true;
let pressed = false;
let hand;
function preload() {
hand = loadImage('hand.png');
}
function setup() {
createCanvas(400, 400);
let protection = 0;
while (balls.length < num) {
let ball = new Ball(random(r, width - r), random(r, height - r));
let overlapping = false;
for (let i = 0; i < balls.length; i++) {
let other = balls[i];
d = dist(ball.x, ball.y, balls[i].x, balls[i].y);
if (d <= r) {
overlapping = true;
}
}
if (!overlapping) {
balls.push(ball);
}
protection++;
if (protection > 10000) {
break;
}
}
}
function draw() {
background(80);
for (let b = 0; b < balls.length; b++) {
balls[b].show();
balls[b].move();
for (let c = b + 1; c < balls.length; c++) {
balls[b].collide(balls[c]);
}
}
let n =0;
for (let i = 0; i < balls.length; i++) {
if (balls[i].rollover(mouseX, mouseY)){
n++;
}
}
if (mouseIsPressed && n>=1){
pressed = true;}
else{
pressed = false;
}
console.log(pressed);
imageMode(CENTER);
image(hand,mouseX,mouseY,30,30);
fill(0);
randomSeed(1);
ellipse(random(width),random(height),50);
}
ml5 Example
PoseNet example using p5.js
let video;
let poseNet;
let poses = [];
let balls = [];
let num = 5;
function setup() {
createCanvas(windowWidth, windowHeight);
video = createCapture(VIDEO);
video.size(width, height);
video.hide();
poseNet = ml5.poseNet(video, modelReady);
for (let i = 0; i < num; i++){
balls[i] = new Ball(random(width), random(height));
}
}
function modelReady() {
select('#status').html('Model Loaded');
poseNet.on('pose', function(results) {
poses = results;
});
}
function draw() {
background(80);
for (let b of balls){
b.show();
b.move();
drawKeypoints();
drawSkeleton();
}
}
function drawKeypoints()  {
for (let i = 0; i < poses.length; i++) {
let pose = poses[i].pose;
for (let j = 0; j < pose.keypoints.length; j++) {
let keypoint = pose.keypoints[j];
if (keypoint.score > 0.01) {
fill(255);
noStroke();
ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
}
for (let b of balls){
if (b.rollover(keypoint.position.x, keypoint.position.y)){
b.changeCol();
}else{
b.changeBack(); 
}
}
}
}
}
function drawSkeleton() {
for (let i = 0; i < poses.length; i++) {
let skeleton = poses[i].skeleton;
console.log(skeleton);
for (let j = 0; j < skeleton.length; j++) {
let partA = skeleton[j][0];
let partB = skeleton[j][1];
stroke(255);
line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
}
}
}
Introduction to Physical Computing
ITP
This sketch will send one value in ascii from arduino to P5
function preload() {
sound1 = loadSound('Assets/sound1.m4a');
sound2 = loadSound('Assets/sound2.m4a');
sound3 = loadSound('Assets/sound3.m4a');
}
function setup() {
createCanvas(320, 240);
}
function draw() {
background(255);
textSize(12);
sound1.play();}
sound1.stop();
}
sound2.play();}
sound2.stop();
}
sound3.play();}
sound3.stop();
}
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
Introduction to Physical Computing
ITP
This sketch will send one binary byte from arduino to P5
var posX=0,posY=0, step = 10;
function setup() {
createCanvas(320, 240);
}
function draw() {
posX+=step;
if (posX> width){
posX= 0;
posY+=step;
if (posY> height)posY=0;
}
rect(posX,posY, step, step);
}
for (var i = 0; i < portList.length; i++) {
}
}
}
void setup() {
}
void loop() {
int analogValue = analogRead(A0);
byte byteToSend = map (analogValue, 0, 1023, 0, 255);
delay(50);
}
sound1 = loadSound('walker.mp3');
sound2 = loadSound('blow.wav');
}
function setup() {
createCanvas(400,400);
play2 = createButton("BLOW");
play2.mousePressed(playSound);
}
function playSound(){
sound2.play();
var notes = [60, 62, 64, 65, 67, 69, 71];
var index = 0;
var trigger = 0;
var osc;
let images = []
let pics =[];
let movingPics = [];
let imgH1;
let key;
let px,py;
function preload(){
for(let i = 0; i < 7; i++) {
pics.push(loadImage('assets/' + i + '.jpg'));
}
imgH1 = loadImage('assets/1818.png');
imgH2 = loadImage("assets/1860.png");
imgH3 = loadImage("assets/1869.png");
imgH4 = loadImage("assets/1870.png");
imgH5 = loadImage("assets/1890.png");
imgH6 = loadImage("assets/1960.png");
imgH7 = loadImage("assets/1970.png");
mySound = loadSound('sound.mp3');
}
function setup() {
createCanvas(800, 550);
background(123)
images = [imgH1,imgH2,imgH3,imgH4,imgH5,imgH6,imgH7];
osc = new p5.TriOsc();
osc.start();
osc.amp(0);
}
function playNote(note, duration) {
osc.freq(midiToFreq(note));
osc.fade(2, 0.2);
if (duration) {
setTimeout(function() {
osc.fade(0, 0.2);
}, duration - 50);
}
}
function draw() {
var w = width / notes.length;
for (var i = 0; i < notes.length; i++) {
var x = i * w;
if (mouseX > x && mouseX < x + w && mouseY>((height-1)/5*4)) {
if (mouseIsPressed) {
fill(255, 100, 100);
} else {
fill(127);
}
} else {
fill(200);
}
rect(x, height-(w-1), w - 1, (height - 1)/3);
}
for ( let i=0; i<images.length; i++){
let picx = i * w+w/10;
let picy = height-(w-1);
image(images[i],picx,picy,width/9,width/9);
}
let px = 0;
let py = 0;
for (let p = 0; p <movingPics.length; p++){
movingPics[p].move();
movingPics[p].bounce();
}
}
function mousePressed() {
key = floor(map(mouseX, 0, width, 0, notes.length));
playNote(notes[key]);
let p = new Pic(key);
movingPics.push(p);
movingPics[p].show();
mySound.play();
}
function mouseReleased() {
osc.fade(0, 0.5);
var notes = [60, 62, 64, 65, 67, 69, 71];
var index = 0;
var trigger = 0;
var osc;
let images = []
let pics =[];
let movingPics = [];
let imgH1;
let key;
let px,py;
function preload(){
for(let i = 0; i < 7; i++) {
pics.push(loadImage('assets/' + i + '.jpg'));
}
imgH1 = loadImage('assets/1818.png');
imgH2 = loadImage("assets/1860.png");
imgH3 = loadImage("assets/1869.png");
imgH4 = loadImage("assets/1870.png");
imgH5 = loadImage("assets/1890.png");
imgH6 = loadImage("assets/1960.png");
imgH7 = loadImage("assets/1970.png");
mySound = loadSound('sound.mp3');
}
function setup() {
createCanvas(800, 550);
background(123)
images = [imgH1,imgH2,imgH3,imgH4,imgH5,imgH6,imgH7];
osc = new p5.TriOsc();
osc.start();
osc.amp(0);
}
function playNote(note, duration) {
osc.freq(midiToFreq(note));
osc.fade(2, 0.2);
if (duration) {
setTimeout(function() {
osc.fade(0, 0.2);
}, duration - 50);
}
}
function draw() {
var w = width / notes.length;
for (var i = 0; i < notes.length; i++) {
var x = i * w;
if (mouseX > x && mouseX < x + w && mouseY>((height-1)/5*4)) {
if (mouseIsPressed) {
fill(255, 100, 100);
} else {
fill(127);
}
} else {
fill(200);
}
rect(x, height-(w-1), w - 1, (height - 1)/3);
}
for ( let i=0; i<images.length; i++){
let picx = i * w+w/10;
let picy = height-(w-1);
image(images[i],picx,picy,width/9,width/9);
}
let px = 0;
let py = 0;
for (let p = 0; p <movingPics.length; p++){
movingPics[p].px+=1;
movingPics[p].py+=1;
}
}
function mousePressed() {
key = floor(map(mouseX, 0, width, 0, notes.length));
playNote(notes[key]);
let px = random(0,width/2);
let py =random(0,height/2);
image(pics[key],px,py,400,400);
console.log(key);
mySound.setVolume(1.5);
mySound.play();
}
function mouseReleased() {
osc.fade(0, 0.5);
let smokes = [];
let video;
let song;
let slider;
let amp,fft;
let spectrum = [];
let noiseScale = 0.01;
let a,b,c;
function setup() {
createCanvas(600, 400);
video = createCapture(VIDEO);
video.size(600,400);
pixelDensity(1);
song = loadSound("YMO.mp3",loaded);
amp = new p5.Amplitude();
fft = new p5.FFT();
}
function loaded(){
song.play();  
}
function draw() {
background(180,100,100,110);
let vol = amp.getLevel();
for (let i = 0; i < 10; i++) {
let p = new Smoke(mouseX,mouseY);
smokes.push(p);
}
for (let i = smokes.length - 1; i >= 0; i--) {
smokes[i].update();
smokes[i].show(video,vol);
if (smokes[i].finished()) {
smokes.splice(i, 1);
}
}
video.hide();
let h = map(vol,0,0.5,height-30,0);
for (let x=0; x < width; x++) {
noiseVal = noise((mouseX+x)*noiseScale, h*noiseScale);
stroke(noiseVal*255,250,250,50);
line(x, h+noiseVal*80, x, height);
}
let h2 = map(vol,0,0.5,height-80,0);
for (let x=0; x < width; x++) {
let noiseVal2 = noise((mouseX+x)*noiseScale, h2*noiseScale);
stroke(noiseVal2*255,250,250,50);
line(x, h2+noiseVal2*80, x, height);
}
}
let smokes = [];
let video;
function setup() {
createCanvas(600, 400);
video = createCapture(VIDEO);
video.size(600,400);
pixelDensity(1);
}
function draw() {
background(20);
for (let i = 0; i < 10; i++) {
let p = new Smoke(mouseX,mouseY);
smokes.push(p);
}
for (let i = smokes.length - 1; i >= 0; i--) {
smokes[i].update();
smokes[i].show(video);
if (smokes[i].finished()) {
smokes.splice(i, 1);
}
}
video.hide();
}
let smokes = [];
let video;
function setup() {
createCanvas(600, 400);
video = createCapture(VIDEO);
video.size(600,400);
pixelDensity(1);
}
function draw() {
background(20);
for (let i = 0; i < 10; i++) {
let p = new Smoke(mouseX,mouseY);
smokes.push(p);
}
for (let i = smokes.length - 1; i >= 0; i--) {
smokes[i].update();
smokes[i].show(video);
if (smokes[i].finished()) {
smokes.splice(i, 1);
}
}
video.hide();
}
let particles = [];
let video;
let vScale = 16;
function setup() {
createCanvas(400, 400);
pixelDensity(1);
background(220);
for (let i = 0; i <50; i++){
particles[i] = new Particle(random(0,width),random(0,height),20);
}
video=createCapture(VIDEO);
video.size(width/vScale,height/vScale);
}
function draw() {
video.loadPixels();
for ( let i=0;i<particles.length;i++){
particles[i].show();
particles[i].shake();
}
video.hide();
}let video;
let button;
let vScale = 8;
function setup() {
createCanvas(600, 400);
pixelDensity(1);
video = createCapture(VIDEO);
video.size(width/vScale,height/vScale);
}
function draw() {
background(255);
video.loadPixels();
loadPixels();
for (let y = 0; y < video.height; y++){
for (let x = 0; x < video.width; x++){
let index = (x + y * video.width)*4;
let r = video.pixels[index+0];
let g = video.pixels[index+1];
let b = video.pixels[index+2];
let brightness = (r+b+g)/3;
tint(250,50);
stroke(r,180,b);
w = map(brightness,0,255,0,vScale);
l = map(brightness,0,255,0,width);
h = map(brightness,0,255,0,height);
line(x*vScale,y*vScale,l,h);
ellipse(x*vScale,y*vScale,w);
}
}
video.hide();
}
let video;
let button;
let vScale = 16;
function setup() {
createCanvas(320, 240);
pixelDensity(1);
video = createCapture(VIDEO);
video.size(320,240);
}
function draw() {
background(80);
video.loadPixels();
loadPixels();
for (let y = 0; y < height; y++){
for (let x = 0; x < width; x++){
let index = (x + y * width)*4;
console.log(video.pixels[1]);
pixels[index+3] = 255;
}
}
updatePixels();
}
function setup() {
createCanvas(400, 400);
video = createCapture(VIDEO);
video.size(600,600);
}
function draw() {
background(220);
image(video,0,0);
}function setup() {
createCanvas(400, 400,WEBGL);
}
function draw() {
background(220);
rotateX(50);
rotateY(millis()/500);
rotateZ(50);
box(30,30,30);
}
let clat = 0;
let clon=0;
let zoom = 0;
let apiKey = ',0,0/1024x512?access_token=sk.eyJ1Ijoid2hpc2t5b3FpIiwiYSI6ImNqbmtoOHl4YzE4eWgza3F4Nmw5N3FzNHYifQ.sd0yH7tajxbGDboMKkCupQ';
let mapimg;
let lat, lon, mag, depth, earthquakes,x,y;
let z = 0;
let ww = 512;
let hh = 512;
let buttonZoomIn,buttonZoomOut;
function preload(){
let url = api + clat +','+clon+','+zoom+apiKey;
mapimg = loadImage(url);
bg = loadImage("map.png")
}
function setup() {
createCanvas(ww, hh,WEBGL);
buttonZoomIn = createButton("Zoom In");
buttonZoomOut = createButton("Zoom Out");
buttonZoomIn.mousePressed(zoomIn);
buttonZoomOut.mousePressed(zoomOut);
}
function gotData(data){
earthquakes = data;
}
function draw(){
background(80);
push();
texture(bg);
box(ww,hh);
pop();
if (earthquakes){
for (let i =0; i<earthquakes.features.length;i++){
lon = earthquakes.features[i].geometry.coordinates[0];
lat = earthquakes.features[i].geometry.coordinates[1];
x = mercX(lon);
y = mercY(lat);
mag = earthquakes.features[i].properties.mag;
mag = sqrt(pow(10, mag));
let magmax = sqrt(pow(10, 10));
let d = map(mag, 0, magmax, 0, 800);
depth = earthquakes.features[i].geometry.coordinates[3];
fill(89,169,170,150);
noStroke();
push();
translate(x,y,z);
rotateX(50);
rotateY(millis()/500);
rotateZ(50);
box(d,d,d);
pop();
}
}
if (zoom < 0){
zoom = 0;
}
if (zoom > 5){
zoom = 5;
}
}
function mercX(lon){
return (map(lon,-180,180,0,width));
}
function mercY(lat){
return (map(lat,90,-90,0,height));
}
function zoomIn(){
zoom = zoom + 1;
}
function zoomOut(){
zoom = zoom - 1;
}
let angle;
let globe;
function setup() {
createCanvas(400, 400,WEBGL);
frameRate(10);
}
function draw() {
background(220);
sphere(50);
rotateY(millis() / 1000);
angle += 1;
}
let clat = 0;
let clon=0;
let zoom = 0;
let apiKey = ',0,0/1024x512?access_token=sk.eyJ1Ijoid2hpc2t5b3FpIiwiYSI6ImNqbmtoOHl4YzE4eWgza3F4Nmw5N3FzNHYifQ.sd0yH7tajxbGDboMKkCupQ';
let mapimg;
let lat, lon, mag, depth, earthquakes,x,y;
let ww = 512;
let hh = 512;
let buttonZoomIn,buttonZoomOut;
function preload(){
let url = api + clat +','+clon+','+zoom+apiKey;
mapimg = loadImage(url);
}
function setup() {
createCanvas(ww, hh);
buttonZoomIn = createButton("Zoom In");
buttonZoomOut = createButton("Zoom Out");
buttonZoomIn.mousePressed(zoomIn);
buttonZoomOut.mousePressed(zoomOut);
}
function gotData(data){
earthquakes = data;
}
function draw(){
image(mapimg,0,0);
if (earthquakes){
for (let i =0; i<earthquakes.features.length;i++){
lon = earthquakes.features[i].geometry.coordinates[0];
lat = earthquakes.features[i].geometry.coordinates[1];
x = mercX(lon);
y = mercY(lat);
mag = earthquakes.features[i].properties.mag;
mag = sqrt(pow(10, mag));
let magmax = sqrt(pow(10, 10));
let d = map(mag, 0, magmax, 0, 600);
depth = earthquakes.features[i].geometry.coordinates[3];
fill(89,169,170,150);
noStroke();
ellipse(x,y,d,d);
}
}
if (zoom < 0){
zoom = 0;
}
if (zoom > 5){
zoom = 5;
}
}
function mercX(lon){
return (map(lon,-180,180,0,width));
}
function mercY(lat){
return (map(lat,90,-90,0,height));
}
function zoomIn(){
zoom = zoom + 1;
}
function zoomOut(){
zoom = zoom - 1;
}
var apikey = 'DepNPcaKwPTr98eYL';
var lattext = 'lat=';
var lontext = '&lon=';
var latinput = 34.0669; 
var loninput = -118.2417;
var url;
var weatherData, windDir;
var inc = 0.1;
var start = 0;
var scl = 80;
var cols, rows; 
var particles = [];
var zoff = 0;
var flowfield;
var windMag;
var mousePosX;
var mousePosY;
function setup() { 
createCanvas(windowWidth, windowWidth/2);
background(255);
colorMode(HSB,360,100,100,100);
url = query + lattext + latinput + lontext + loninput + apikey;
cols = floor (width / scl);
rows = floor (height / scl);
flowfield1 = new Array(cols * rows);
flowfield2 = new Array(cols * rows);
loadJSON(url,gotData);
} 
function gotData(data) {
var countryname = select('#country');
countryname.html(data.data.country); 
var statename = select('#state');
statename.html(data.data.state); 
var cityname = select('#city');
cityname.html(data.data.city);
var dataoutput = select('#d');
dataoutput.html('temprature:&nbsp'+ data.data.current.weather.tp + '&nbsp atmospheric pressure:&nbsp' + data.data.current.weather.pr + '&nbsp windspeed:&nbsp' + data.data.current.weather.ws + '&nbsp wind direction:&nbsp' +  data.data.current.weather.wd + '&nbsp pollution aqi index:&nbsp' +  data.data.current.pollution.aqius);
weatherData = data;
windMag = map(weatherData.data.current.weather.ws,0,7,0.1,1);
windDir = weatherData.data.current.weather.wd;
fill(10,200);
ellipse(map(loninput,-180,180,0,width),map(latinput,90,-90,0,width/2),5,5);
for (var i = 0; i < data.data.current.weather.pr*2; i ++){
particles[i] = new Particle();  
}
console.log(data.data.current.weather);
}
function draw() { 
mousePosX = map(mouseX, 0, windowWidth,-180,180);
mousePosY = map(mouseY, 0, windowWidth/2, 90, -90);
if (mousePosY > -90.01 && mousePosY < 90.01){
latinput = mousePosY;
loninput = mousePosX;
}
createFlowfield();
moveParticles();
}
function mousePressed() {
url = query + lattext + latinput + lontext + loninput + apikey;
loadJSON(url,gotData);
background(255);
}
function createFlowfield() {
var yoff = start;
for (var y = 0; y < rows; y++){
var xoff = start;
for (var x = 0; x < cols; x++){
var index = x * rows + y * cols; 
var r = noise(xoff, yoff) * 255;
var angle1 =  radians(windDir-90 * noise(xoff) * 1.5);
var angle2 =  noise(xoff, yoff, zoff) * TWO_PI * 4 ;
var v1 = p5.Vector.fromAngle(angle1);
var v2 = p5.Vector.fromAngle(angle2);
v1.setMag(windMag);
v2.setMag(0.5);
flowfield1[index] = v1;
flowfield2[index] = v2;
xoff += inc;
}
yoff += inc;
start += inc;
zoff += 0.0005;
}
}
function moveParticles(){
for (var i = 0; i < particles.length; i ++){
particles[i].update();
particles[i].edges(); 
particles[i].wind();
particles[i].follow(flowfield2);
}
for (var i2 = 0; i2 < particles.length/2; i2 ++){
particles[i2].follow(flowfield1);
}
for (var j = particles.length -1; j >= 0; j --){
if (particles[j].lifespan < 0.0) {
particles.splice(j,1);
}
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
}function setup() {
}
function gotData(data){
}let sliders = [];
let angle = 0;
function setup() {
noCanvas();
for (let i=0; i<50;i++){
sliders[i] = createSlider(0,100,0); 
}
}
function draw() {
offset = 0;
for( let i=1; i<sliders.length;i++){
let x = map(sin(angle+offset),-1,1,0,100);
sliders[i].value(sliders[0].value()+x); 
offset += 0.125;
}
angle+=0.1;
}let paragraph, button, slider,textBox;
let crazySlider;
let angle = 0;
function setup() {
createCanvas(400, 400);
paragraph = createP("Your name please");
button = createButton ("button");
slider = createSlider("0","200","100");
textBox = createInput("input your name");
crazySlider = createSlider(0,300,0);
}
function draw() {
background(0);
paragraph.style("font-size",slider.value() + "pt");
let x = 100+500*sin(angle);
let y = 100+5*cos(angle);
angle += 0.1;
ellipse(x,100,20,20);
console.log(x);
}
function updateText(){
paragraph.html(textBox.value());
}let lightGreen;
let gold1;
let gold2;
let darkGreen;
let hillImg;
let moonImg;
let blowSlider;
let blowStrength;
function preload(){
hillImg = loadImage('hill.png');
ghostImg = loadImage('ghost_v1.png');
ghost2Img = loadImage('ghost2.png');
moonImg = loadImage('moon.png');
}
function setup() {
createCanvas(windowWidth, windowHeight)
angleMode(DEGREES);
lightGreen = color(198, 230, 137);
gold2 = color(193, 158, 86);
darkGreen = color(38, 56, 31);
cloudSizeHigh = 150;
cloudDirectionX = 1;
cloudDirectionY = 1;
puffNum = 150;
ghostNum = 10;
for (let i = 0; i < cloudNum; i++) {
clouds[i] = new Cloud();
}
for(let i = 0; i<puffNum;i++){
puffs[i] = new Puff();
}
ghostAng = 0;
for(let i = 0;i<ghostNum;i++){
ghosts1[i] = new Ghost(ghostAng+random(360),random(75,700),random(0.5,1),255);
}
blowSlider = createSlider(0,(3*height/8),0);
blowSlider.position(10,10);
}
function draw() {
background(darkGreen);
noStroke();
blowStrength = inputValue;
image(moonImg,2/3*width,1/5*height,150,150);
fill(gold2);
for (let i = 0; i < clouds.length; i++) {
clouds[i].displayIt();
clouds[i].moveIt();
clouds[i].checkCloudCollide();
}
for (let i = 0; i < puffs.length; i++) {
puffs[i].drawPuff();
puffs[i].puffCollide();
puffs[i].movePuff();
}
push();
imageMode(CORNERS);
image(hillImg,0,4/5*windowHeight,windowWidth,windowHeight);
pop();
ghostAng-=0.1;
}
for (var i = 0; i < portList.length; i++) {
}
}
}
let breadUps = [];
let breadDns =[];
let hams = [];
let lettuses = [];
let cheeses = [];
let caughts = [];
let bread = 5;
let fat = 5; 
let vegie = 3;
let colW,colH,h,score,cal, calBread, calHam,calCheese,calLettus;
function setup(){
createCanvas(800, 600);
colW = 50;
colH = 50;
h = 535;
score = 0;
cal = 0;
let button = createButton('PLAY');
button.mousePressed(resetSketch);
button.position(380,620);
}
function resetSketch(){
for (let i = bread; i > 0; i--){
breadUps[i] = new BreadUp(random(width), random(-height,height/2));
breadDns[i] = new BreadDn(random(width), random(-height,height/2));
}
for (let i = fat; i > 0; i--){
hams[i] = new Ham(random(width), random(-height,height));}
for (let i = fat; i>0; i--){
cheeses[i] = new Cheese(random(width), random(-height,height));
}
for (let i = vegie; i > 0 ; i--){
lettuses[i] = new Lettus(random(width), random(-height,height));
}
cal = 0;
score = 0;
}
function draw() {
background(238,222,203);
for (let col = 0; col < width/colW; col++) {
for(row=0; row<height/colH; row++){
let x = col * colW;
let y = row * colH;
noFill();
stroke(190,119,87);
strokeWeight(2);
rect(x, y, colW, colH);
}
noStroke();
fill(230);
textFont('Helvetica');
}
fill(190, 119, 87);
stroke(200, 150, 120);
strokeWeight(5);
rect(-15,35,150,150,10);
noStroke();
fill(230);
textSize(18);
text('Move the tray to collect your burger!',10,65,120);
text('Burgers: ' + score,10,145);
text('Calorie: ' + cal, 10,165);
push();
fill(190, 119, 87);
rect(25, 555, 750, 80,10);
noStroke();
fill(185, 43, 62);
rect(inputX - 50, 535, 100, 20, 10)
fill(244,197,61);
textSize(12);
text('VALUE PACK',inputX - 36,550)
pop();
for (let i in hams){
hams[i].run();
if (hams[i].isCaught(inputX,h)){
h = h - hams[i].a;
hams[i].stop(inputX);
}
}
for (let i in cheeses){
cheeses[i].run();
if (cheeses[i].isCaught(inputX,h)){
h = h - cheeses[i].a;
cheeses[i].stop(inputX);
}
}
for (let i in lettuses){
lettuses[i].run();
if (lettuses[i].isCaught(inputX,h)){
h = h - lettuses[i].a;
lettuses[i].stop(inputX);
}
}
for (let b in breadUps){
for ( let i = bread; i>=0; i--){
if(breadDns[i].isCaught(inputX,h)){
breadDns.splice(i,1);
cal = cal + 50;
}
}
for ( let i = fat; i>=0; i--){
if(hams[i].isCaught(inputX,h)){
hams.splice(i,1);
cal = cal + 180;
}  
}
for ( let i = veggie; i>=0; i--){
if(lettuses[i].isCaught(inputX,h)){
lettuses.splice(i,1);
cal = cal + 30;
}
}
for ( let i = fat; i>=0; i--){
if(cheeses[i].isCaught(inputX,h)){
cheeses.splice(i,1);
cal = cal + 360;
}
}
}
}
for (let b in breadDns){
breadDns[b].run();
if (breadDns[b].isCaught(inputX,h)){
h = h - breadDns[b].a;
breadDns[b].stop(inputX);
}
}
let breadUpsNum = breadUps.length;
let breadDnsNum = breadDns.length;
push();
if (breadUpsNum == 1 && breadDnsNum == 1){
fill(185, 43, 62); 
rect(0,0,width,height);
fill(254,192,65);
textSize(38);
text('Wow. You got ' + score + ' hamburgers in total.',110, height/2-150);
text('That is ' + cal + ' calorie!',250, height/2-60);
stroke(255);
line(150,height/2+30, 650,height/2-10);  	
let r = 200;
let ex = width/2;
let ey = height/2 +150;
line(ex,ey,ex,height);
fill(254,192,65);
noStroke();
strokeWeight(2);
ellipse(ex,ey,r,r);
fill(255);
text('   EAT AGAIN?', width/2-67, height/2 +135,150);
pop();  
}
}
for (var i = 0; i < portList.length; i++) {
console.log(i + " " + portList[i]);
}
}
}
}
let breadUps = [];
let breadDns = [];
let hams = [];
let lettuses = [];
let cheeses = [];
let bread = 2;
let fat = 5;
let vegie = 3;
let colW, colH, h, score, cal, calBread, calHam, calCheese, calLettus;
function setup() {
createCanvas(800, 600);
colW = 50;
colH = 50;
h = 535;
score = 0;
cal = 0;
let button = createButton('I WANNA PLAY');
button.mousePressed(resetSketch);
button.position(350, 610);
}
function resetSketch() {
for (let i = bread; i > 0; i--) {
breadUps[i] = new BreadUp(random(width), random(-height, height / 2));
breadDns[i] = new BreadDn(random(width), random(-height, height / 2));
}
for (let i = fat; i > 0; i--) {
hams[i] = new Ham(random(width), random(-height, height));
}
for (let i = fat; i > 0; i--) {
cheeses[i] = new Cheese(random(width), random(-height, height));
}
cal = 0;
score = 0;
}
function draw() {
background(238, 222, 203);
for (let col = 0; col < width / colW; col++) {
for (row = 0; row < height / colH; row++) {
let x = col * colW;
let y = row * colH;
noFill();
stroke(190, 119, 87);
strokeWeight(2);
rect(x, y, colW, colH);
}
noStroke();
fill(230);
textFont('Helvetica');
}
fill(190, 119, 87);
stroke(200, 150, 120);
strokeWeight(5);
rect(-15, 35, 150, 150, 10);
noStroke();
fill(230);
textSize(18);
text('Move the tray to collect your burger!', 10, 65, 120);
text('Burgers: ' + score, 10, 145);
text('Calorie: ' + cal, 10, 165);
push();
fill(190, 119, 87);
rect(25, 555, 750, 80, 10);
noStroke();
fill(185, 43, 62);
rect(mouseX - 50, 535, 100, 20, 10)
fill(244, 197, 61);
textSize(12);
text('VALUE PACK', mouseX - 36, 550)
pop();
for (let i in hams) {
hams[i].run();
if (hams[i].isCaught(mouseX, h)) {
h = h - hams[i].a;
hams[i].stop(mouseX);
}
}
for (let i in cheeses) {
cheeses[i].run();
if (cheeses[i].isCaught(mouseX, h)) {
h = h - cheeses[i].a;
cheeses[i].stop(mouseX);
}
}
for (let b in breadUps) {
h = 535;
if (breadDns[i].isCaught(mouseX, h)) {
breadDns.splice(i, 1);
cal = cal + 50;
}
}
if (hams[j].isCaught(mouseX, h)) {
hams.splice(j, 1);
cal = cal + 180;
}
}
if (lettuses[q].isCaught(mouseX, h)) {
lettuses.splice(q, 1);
cal = cal + 30;
}
}
if (cheeses[k].isCaught(mouseX, h)) {
cheeses.splice(k, 1);
cal = cal + 360;
}
}
}
}
}
let caughtNum = 0;
for (let b in breadDns) {
breadDns[b].run();
if (breadDns[b].isCaught(mouseX, h)) {
caughtNum += 1;
}
}
if (caugthNum = 1) {
for (let b in breadDns) {
for (let i in hams) {
if (hams[i].isCaught(mouseX, h)) {
hams.splice(i, 1);
}
}
if (lettuses[q].isCaught(mouseX, h)) {
lettuses.splice(q, 1);
}
}
if (cheeses[k].isCaught(mouseX, h)) {
cheeses.splice(k, 1);
}
}
h = h - breadDns[b].l;
breadDns[b].stop(mouseX);
}
}
}
for (let b in breadDns) {
if (breadDns[b].y < 535 - breadDns[b].l) {
breadDns.splice(b, 1);
}
}
for (let i in hams) {
if (hams[i].isCaught(mouseX, h)) {
hams.splice(i, 1);
}
}
if (lettuses[q].isCaught(mouseX, h)) {
lettuses.splice(q, 1);
}
}
if (cheeses[k].isCaught(mouseX, h)) {
cheeses.splice(k, 1);
}
}
}
let breadUpsNum = breadUps.length;
let breadDnsNum = breadDns.length;
push();
if (breadUpsNum == 1 && breadDnsNum == 1) {
fill(185, 43, 62);
rect(0, 0, width, height);
fill(254, 192, 65);
textSize(38);
text('Wow. You got ' + score + ' hamburgers in total.', 110, height / 2 - 150);
text('That is ' + cal + ' calorie!', 250, height / 2 - 60);
stroke(255);
line(150, height / 2 + 30, 650, height / 2 - 10);
let r = 200;
let ex = width / 2;
let ey = height / 2 + 150;
line(ex, ey, ex, height);
fill(254, 192, 65);
noStroke();
strokeWeight(2);
ellipse(ex, ey, r, r);
fill(255);
text('   EAT AGAIN?', width / 2 - 67, height / 2 + 135, 150);
pop();
}
let x,y;
function setup() {
createCanvas(400, 400);
x = 0;
y = height/2;
}
function draw() {
background(220);
ellipse(lo,y,20,20);
}
for (var i = 0; i < portList.length; i++) {
console.log(i + " " + portList[i]);
}
}
}
}
let words, dog1,dog2,dogbark1, dogbark2, poem1,poem2,button1,button2,sound;
let poemread1 = false;
let poemread2 = false;
function preload(){
dogbark1 = loadSound('Doggie 1.mp3');
dogbark2 = loadSound('Doggie 2.mp3');
poem1 = loadImage('Poem 1.jpg');
poem2 = loadImage('Poem 2.jpg');
dog1 = loadImage('dog read 1.jpg');
dog2 = loadImage('dog read 1.jpg');
sound = loadImage('sound.png');
}
function setup() {
let canvas = createCanvas(300, 400);
canvas.position(200,120);
button1 = createButton("Mr. Wolfgang");
button1.position(40,350);
button2 = createButton("Miss. Yo");
button2.position (50,510);
par = createP("this is some text");
}
function draw() {
background(255);
strokeWeight(5);
rect (0,0,width,height);
button1.mousePressed(showPoem1);
button2.mousePressed(showPoem2);
if (poemread1){
image(poem1,0,0,width,height);
}
if(poemread2){
image(poem2,0,0,width,height); 
}
}
function showPoem1(){
poemread1=!poemread1;
}
function showPoem2(){
poemread2=!poemread2;
}
function setup() {
createCanvas(windowWidth, windowHeight);
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
var v = map(latestData,0,1023,0,width); 
ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);
ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
v+=random(-5, 5);
bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);
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
}let frog;
let h1;
let canvas;
function setup() {
canvas = createCanvas(400, 400);
canvas.position(50,50);
h1 = createElement('h1','heading');
h1.position(80,100);
createElement('p','paragraph');
createDiv('div');
createP('Paragraphhhh');
createButton('button');
frog = createImg('sadFrog.jpg');
frog.size(50,50);
}
function mousePressed(){
let text = createElement('p','dalskdjfasdnc');
text.position(random(500),random(300));
}
function draw() {
background(220);
fill(255,255,255);
rect(width/2+random(5),height/2,100,300);
frog.position(100+random(3),500+random(3));
Introduction to Physical Computing
ITP
This sketch will send one binary byte from P5 to arduino
See arduino code in bottom, have LED connected to pin 3
function setup() {
createCanvas(255, 255);
}
function draw() {
background(255,0,0);
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
let g = 0;
let b = 0;
let latestData = "waiting for data"; 
function setup() {
createCanvas(400, 400);
rectMode(CENTER);
}
function draw() {
background(220);
fill(r,g,b);
rect(width/2,height/2,100,100);
console.log(latestData);
}
function gotData() {
Introduction to Physical Computing
ITP
This sketch will send one binary byte from P5 to arduino
See arduino code in bottom, have LED connected to pin 3
var capture;
function setup() {
createCanvas(320, 240);
capture = createCapture(VIDEO);
capture.size(320, 240);
}
function draw() {
background(255,0,0);
image(capture,0,0,320,240);
var ourColor = get(mouseX,mouseY);
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
Introduction to Physical Computing
ITP
This sketch will send one value in ascii from arduino to P5
function setup() {
createCanvas(320, 240);
}
function draw() {
background(255);
textSize(40);
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
Introduction to Physical Computing
ITP
This sketch will send one binary byte from arduino to P5
var posX=0, posY=0, step = 10;
function setup() {
createCanvas(320, 240);
}
function draw() {
background(255);
noFill();
textSize(40);
}
for (var i = 0; i < portList.length; i++) {
}
}
}
void setup() {
}
void loop() {
int analogValue = analogRead(A0);
byte byteToSend = map (analogValue, 0, 1023, 0, 255);
delay(50);
}
let breadUps = [];
let breadDns =[];
let hams = [];
let lettuses = [];
let cheeses = [];
let bread = 2;
let fat = 5; 
let vegie = 3;
let colW,colH,h,score,cal, calBread, calHam,calCheese,calLettus;
function setup(){
createCanvas(800, 600);
colW = 50;
colH = 50;
h = 535;
score = 0;
cal = 0;
let button = createButton('PLAY');
button.mousePressed(resetSketch);
button.position(380,620);
}
function resetSketch(){
for (let i = bread; i > 0; i--){
breadUps[i] = new BreadUp(random(width), random(-height,height/2));
breadDns[i] = new BreadDn(random(width), random(-height,height/2));
}
for (let i = fat; i > 0; i--){
hams[i] = new Ham(random(width), random(-height,height));}
for (let i = fat; i>0; i--){
cheeses[i] = new Cheese(random(width), random(-height,height));
}
for (let i = vegie; i > 0 ; i--){
lettuses[i] = new Lettus(random(width), random(-height,height));
}
cal = 0;
score = 0;
}
function draw() {
background(238,222,203);
for (let col = 0; col < width/colW; col++) {
for(row=0; row<height/colH; row++){
let x = col * colW;
let y = row * colH;
noFill();
stroke(190,119,87);
strokeWeight(2);
rect(x, y, colW, colH);
}
noStroke();
fill(230);
textFont('Helvetica');
}
fill(190, 119, 87);
stroke(200, 150, 120);
strokeWeight(5);
rect(-15,35,150,150,10);
noStroke();
fill(230);
textSize(18);
text('Move the tray to collect your burger!',10,65,120);
text('Burgers: ' + score,10,145);
text('Calorie: ' + cal, 10,165);
push();
fill(190, 119, 87);
rect(25, 555, 750, 80,10);
noStroke();
fill(185, 43, 62);
rect(mouseX - 50, 535, 100, 20, 10)
fill(244,197,61);
textSize(12);
text('VALUE PACK',mouseX - 36,550)
pop();
for (let i in hams){
hams[i].run();
if (hams[i].isCaught(mouseX,h)){
h = h - hams[i].a;
hams[i].stop(mouseX);
}
}
for (let i in cheeses){
cheeses[i].run();
if (cheeses[i].isCaught(mouseX,h)){
h = h - cheeses[i].a;
cheeses[i].stop(mouseX);
}
}
for (let i in lettuses){
lettuses[i].run();
if (lettuses[i].isCaught(mouseX,h)){
h = h - lettuses[i].a;
lettuses[i].stop(mouseX);
}
}
for (let b in breadUps){
h = 535;
}
if(breadDns[i].isCaught(mouseX,h)){
breadDns.splice(i,1);
cal = cal + 50;
}
}
if(hams[j].isCaught(mouseX,h)){
hams.splice(j,1);
cal = cal + 180;
}
}
if(lettuses[q].isCaught(mouseX,h)){
lettuses.splice(q,1);
cal = cal + 30;
}
}
if(cheeses[k].isCaught(mouseX,h)){
cheeses.splice(k,1);
cal = cal + 360;
}
}
}
}
}
for (let b in breadDns){
breadDns[b].run();
if (breadDns[b].isCaught(mouseX,h)){
h = h - breadDns[b].a;
breadDns[b].stop(mouseX);
}
}
let breadUpsNum = breadUps.length;
let breadDnsNum = breadDns.length;
push();
if (breadUpsNum == 1 && breadDnsNum == 1){
fill(185, 43, 62); 
rect(0,0,width,height);
fill(254,192,65);
textSize(38);
text('Wow. You got ' + score + ' hamburgers in total.',110, height/2-150);
text('That is ' + cal + ' calorie!',250, height/2-60);
stroke(255);
line(150,height/2+30, 650,height/2-10);  	
let r = 200;
let ex = width/2;
let ey = height/2 +150;
line(ex,ey,ex,height);
fill(254,192,65);
noStroke();
strokeWeight(2);
ellipse(ex,ey,r,r);
fill(255);
text('   EAT AGAIN?', width/2-67, height/2 +135,150);
pop();  
}
}let balls = [];
let num = 100;
function setup() {
createCanvas(600, 600);
for (let i = 0; i < num; i++){
balls[i] = new Ball(random(width), random(height));
}
}
function draw() {
background(150);
for (let b of balls){
b.show();
b.move();
for (let other of balls){
if (b.intersect(other) && b != other){      
balls.splice(b,1);
balls.splice(other,1);
}
}
}
}let balls = [];
let num = 100;
function setup() {
createCanvas(400, 400);
for (let i = 0; i < num; i++){
balls[i] = new Ball(random(width), random(height));
}
}
function draw() {
background(80);
for (let b of balls){
b.show();
b.move();
if (b.rollover(mouseX,mouseY)){
balls.splice(b,1);
}
}
}
function setup() {
createCanvas(400, 400);
}
function mousePressed(){
let b = new Ball(mouseX, mouseY);
}
function draw() {
background(80);
for (let i = 0; i < balls.length; i++){
balls[i].show();
balls[i].move();
}
}
function setup() {
createCanvas(400, 400);
}
function draw() {
background(80);
add(26,10);
}
function add(num1,num2){
fill(255);
textSize(32);
text(num1,80, height/2);
text('+', 140, height/2);
text(num2, 180, height/2);
text('=', 240, height/2);
let x = num1 + num2;
text(x,290, height/2);
}let balls = [];
function setup() {
createCanvas(400, 400);
for ( let i = 0; i < 20; i++){
balls[i] = new Ball(random(width),random(height),random(-3,3),random(-3,4));
}
}
function draw() {
background(220);
stroke(255);
for (let b in balls) {
balls[b].run();
for (let other in balls){
if (balls[b].isNear(balls[other].x,balls[other].y) && balls[b] != balls[other]) {
background(80);}
}
}
}
class Ball{
constructor (x, y, xspeed,yspeed,r=40){
this.x = x;
this.y = y;
this.xspeed = xspeed;
this.yspeed = yspeed;
this.r = r;
}
run(){
this.show();
this.move();
this.bounce();
}
show (){
noFill();
strokeWeight(5);
ellipse(this.x, this.y, this.r, this.r);
}
move(){
this.x+=this.xspeed;
this.y+=this.yspeed;
}
bounce(){
if(this.x > width || this.x < 0 ) this.xspeed *=-1;
if(this.y > height || this.y <0) this.yspeed *= -1;
}
isNear(px,py){
let d = dist (this.x, this.y, px, py);
return ( d <= this.r/2);
}
}let breadUps = [];
let breadDns = [];
let hams = [];
let tomatos = [];
let lettuses = [];
let cheeses = [];
let bread = 4;
let meat = 5;
let vegie = 3;
let x, y, colW, colH;
function setup() {
createCanvas(800, 600);
colW = 50;
colH = 50;
for (let i = 0; i < bread; i++) {
breadUps[i] = new BreadUp(random(width), random(-height, height));
breadDns[i] = new BreadDn(random(width), random(-height, height));
}
for (let i = 0; i < meat; i++) {
hams[i] = new Ham(random(width), random(-height, height));
cheeses[i] = new Cheese(random(width), random(-height, height));
}
for (let i = 0; i < vegie; i++) {
tomatos[i] = new Tomato(random(width), random(-height, height));
lettuses[i] = new Lettus(random(width), random(-height, height));
}
}
function draw() {
background(238, 222, 203);
for (let col = 0; col < width / colW; col++) {
for (row = 0; row < height / colH; row++) {
let x = col * colW;
let y = row * colH;
noFill();
stroke(190, 119, 87);
strokeWeight(2);
rect(x, y, colW, colH);
}
}
push();
fill(190, 119, 87);
rect(20, 555, 750, 20);
pop();
push();
noStroke();
fill(235, 187, 145);
rect(mouseX - 50, 535, 100, 20, 10)
pop();
for (b of breadUps) {
b.show();
b.move();
b.reset();
b.collect(mouseX);
}
for (b of breadDns) {
b.show();
b.move();
b.reset();
b.collect(mouseX);
}
for (b of hams) {
b.show();
b.move();
b.reset();
b.collect(mouseX);
}
for (b of cheeses) {
b.show();
b.move();
b.reset();
b.collect(mouseX);
}
for (b of tomatos) {
b.show();
b.move();
b.reset();
b.collect(mouseX);
}
for (b of lettuses) {
b.show();
b.move();
b.reset();
b.collect(mouseX);
}
}
let breadUps = [];
let breadDns = [];
let hams = [];
let lettuses = [];
let cheeses = [];
let bread = 2;
let fat = 5;
let vegie = 3;
let colW, colH, h, score, cal, calBread, calHam, calCheese, calLettus;
function setup() {
createCanvas(800, 600);
colW = 50;
colH = 50;
h = 535;
score = 0;
cal = 0;
let button = createButton('I WANNA PLAY');
button.mousePressed(resetSketch);
button.position(350, 610);
}
function resetSketch() {
for (let i = bread; i > 0; i--) {
breadUps[i] = new BreadUp(random(width), random(-height, height / 2));
breadDns[i] = new BreadDn(random(width), random(-height, height / 2));
}
for (let i = fat; i > 0; i--) {
hams[i] = new Ham(random(width), random(-height, height));
}
for (let i = fat; i > 0; i--) {
cheeses[i] = new Cheese(random(width), random(-height, height));
}
cal = 0;
score = 0;
}
function draw() {
background(238, 222, 203);
for (let col = 0; col < width / colW; col++) {
for (row = 0; row < height / colH; row++) {
let x = col * colW;
let y = row * colH;
noFill();
stroke(190, 119, 87);
strokeWeight(2);
rect(x, y, colW, colH);
}
noStroke();
fill(230);
textFont('Helvetica');
}
fill(190, 119, 87);
stroke(200, 150, 120);
strokeWeight(5);
rect(-15, 35, 150, 150, 10);
noStroke();
fill(230);
textSize(18);
text('Move the tray to collect your burger!', 10, 65, 120);
text('Burgers: ' + score, 10, 145);
text('Calorie: ' + cal, 10, 165);
push();
fill(190, 119, 87);
rect(25, 555, 750, 80, 10);
noStroke();
fill(185, 43, 62);
rect(mouseX - 50, 535, 100, 20, 10)
fill(244, 197, 61);
textSize(12);
text('VALUE PACK', mouseX - 36, 550)
pop();
for (let i in hams) {
hams[i].run();
if (hams[i].isCaught(mouseX, h)) {
h = h - hams[i].a;
hams[i].stop(mouseX);
}
}
for (let i in cheeses) {
cheeses[i].run();
if (cheeses[i].isCaught(mouseX, h)) {
h = h - cheeses[i].a;
cheeses[i].stop(mouseX);
}
}
for (let b in breadUps) {
h = 535;
if (breadDns[i].isCaught(mouseX, h)) {
breadDns.splice(i, 1);
cal = cal + 50;
}
}
if (hams[j].isCaught(mouseX, h)) {
hams.splice(j, 1);
cal = cal + 180;
}
}
if (lettuses[q].isCaught(mouseX, h)) {
lettuses.splice(q, 1);
cal = cal + 30;
}
}
if (cheeses[k].isCaught(mouseX, h)) {
cheeses.splice(k, 1);
cal = cal + 360;
}
}
}
}
}
let caughtNum = 0;
for (let b in breadDns) {
breadDns[b].run();
if (breadDns[b].isCaught(mouseX, h)) {
caughtNum += 1;
}
}
if (caugthNum = 1) {
for (let b in breadDns) {
for (let i in hams) {
if (hams[i].isCaught(mouseX, h)) {
hams.splice(i, 1);
}
}
if (lettuses[q].isCaught(mouseX, h)) {
lettuses.splice(q, 1);
}
}
if (cheeses[k].isCaught(mouseX, h)) {
cheeses.splice(k, 1);
}
}
h = h - breadDns[b].l;
breadDns[b].stop(mouseX);
}
}
}
for (let b in breadDns) {
if (breadDns[b].y < 535 - breadDns[b].l) {
breadDns.splice(b, 1);
}
}
for (let i in hams) {
if (hams[i].isCaught(mouseX, h)) {
hams.splice(i, 1);
}
}
if (lettuses[q].isCaught(mouseX, h)) {
lettuses.splice(q, 1);
}
}
if (cheeses[k].isCaught(mouseX, h)) {
cheeses.splice(k, 1);
}
}
}
let breadUpsNum = breadUps.length;
let breadDnsNum = breadDns.length;
push();
if (breadUpsNum == 1 && breadDnsNum == 1) {
fill(185, 43, 62);
rect(0, 0, width, height);
fill(254, 192, 65);
textSize(38);
text('Wow. You got ' + score + ' hamburgers in total.', 110, height / 2 - 150);
text('That is ' + cal + ' calorie!', 250, height / 2 - 60);
stroke(255);
line(150, height / 2 + 30, 650, height / 2 - 10);
let r = 200;
let ex = width / 2;
let ey = height / 2 + 150;
line(ex, ey, ex, height);
fill(254, 192, 65);
noStroke();
strokeWeight(2);
ellipse(ex, ey, r, r);
fill(255);
text('   EAT AGAIN?', width / 2 - 67, height / 2 + 135, 150);
pop();
}
}let bubbles = [];
let bubbleNum = 20;
function setup() {
createCanvas(400, 400);
for ( let i = 0; i < bubbleNum; i++){
bubbles[i] = new Bubble(random(width), random(height), random (20,50)); 
}
}
function draw() {
background(80);
for (b of bubbles){
b.show();
b.move();
let overlapping = false;
for (let other of bubbles){
if (b !==other && b.intersects(other)){
overlapping = true;
}
if (overlapping) {
b.changeColor(255);}
else{ b.changeColor(0);
}
}
}
}
class Bubble{
constructor(_x,_y,_r){
this.x = _x;
this.y = _y;
this.r = _r;
this.brightness = 0;
}
show(){
fill(255,this.brightness);
stroke(255);
strokeWeight(5);
ellipse(this.x,this.y, this.r);
}
move(){
this.x = this.x + random (-2,2);
this.y = this.y + random (-2,2);
}
changeColor(brightness){
this.brightness = brightness;
}
intersects(other) {
let d = dist (this.x, this.y, other.x, other.y);
return ( d < (this.r+other.r)/2);
}
}let bubble1, bubble2;
function setup() {
createCanvas(400, 400);
bubble1 = new Bubble(100,200);
bubble2 = new Bubble(mouseX,mouseY,80);
}
function draw() {  
if (bubble1.intersects(bubble2)){
background(125,50,80);}
else {
background(50);}
bubble1.show();
bubble1.move();
bubble2.show();
bubble2.move();
bubble2.x = mouseX;
bubble2.y = mouseY;
}
class Bubble{
constructor(_x,_y,_r=50){
this.x = _x;
this.y = _y;
this.r = _r;
this.brightness = 0;
}
show(){
fill(255,this.brightness);
stroke(255,125);
strokeWeight(5);
ellipse(this.x,this.y,this.r);
}
move(){
this.x = this.x + random(-1,1);
this.y = this.y + random(-1,1);
}
intersects(other){
let d = dist(bubble1.x,bubble1.y,other.x, other.y);
return (d<(bubble1.r+other.r)/2);
}
}let bubbles=[];
function setup() {
createCanvas(400, 400);
for (let i = 0; i<10; i++){
let x = random (width);
let y = random (height);
let r = random (50,80);
let b = new Bubble(x,y,r);
bubbles.push(b);
}
}
function mousePressed(){
for (let i = 0; i<bubbles.length; i++){
if (bubbles[i].rollover(mouseX,mouseY)){
bubbles.splice(i,1); 
}
}
}
function mouseDragged(){
let r = random(10,20);
let b = new Bubble (mouseX,mouseY,r);
bubbles.push(b);  
}
function draw() {
background(0);
for (let i = 0; i<bubbles.length; i++){
bubbles[i].create(); 
bubbles[i].shake();
}
if (bubbles.length>100) {
bubbles.splice(0,1); 
}
}
class Bubble {
constructor(_x,_y,_r){
this.x = _x;
this.y = _y;
this.r = _r;
this.light = 255;
}
create (){
fill(255,this.light);
noStroke();
ellipse (this.x, this.y, this.r); 
}
shake (){
this.x = this.x + random (-1,1);
this.y = this.y + random (-1,1);
}
clicked(px,py){
let d = dist(px,py,this.x,this.y);
if (d <= this.r) {
console.log("Welcom!"); 
this.bt = !this.bt;
}
}
changeCol(brightness){
this.light = brightness;
}
rollover(px,py){
let d=dist(px,py,this.x,this.y);
if (d < this.r){
return true;} else{
return false;
}
}
let ball = [];
let mouseBall = [];
function setup() {
createCanvas(400, 400);
for (let i =0; i<500; i++){
let x = random(0,width);
let y = random(0,height);
let xspeed = random (-2,2);
let yspeed = random (-2,2);
let r = random (50,255);
let g = random (0,150);
let b = random (0,250);
ball [i] = new balls (x,y,xspeed,yspeed,2,255,g,b); 
}
}
function draw() {
background(0,20);
for (let i = 0; i<500; i++){
ball[i].run();
}
}
let x, y, xspeed, yspeed, acspeed,r;
function setup() {
createCanvas(400, 400);
x = random(0,width);
y = random (0,height);
xspeed = 4;
yspeed = 3;
acspeed = -1;
r= 20;
}
function draw() {
background(24,159,122);
noStroke();
ellipse(x,y,r);
x = x + xspeed;
y = y + yspeed;
if (x>width || x<0){
xspeed = xspeed * acspeed; 
}
if (y>height || y <0){
yspeed = yspeed * acspeed; 
}
}
let i=0;
let colNum = 10;
let rowNum = 5;
let rectWidth, rectHeight;
let x,y;
function setup() {
createCanvas(400, 400);
rectWidth = width/colNum;
rectHeight = height/rowNum;
}
function draw() {
background(255);
for (let rowNum=0; rowNum <=5; rowNum ++){
for (let colNum =0; colNum <=10; colNum ++){
x = rectWidth * colNum;
y = rectHeight * rowNum;     
if(mouseX >x && mouseX<(x+rectWidth) && mouseY>y && mouseY<(y+rectHeight)){
fill(x,y,255); 
}else{
fill(255);}
rect(x,y,rectWidth,rectHeight);
}
}
}let ball1 = new Ball(50,100,0,0,50);
let ball2 = new Ball(250,350,0,0,80);
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
ball1.show();
ball2.show();
}
let col,row;
let colNum=50;
let rowNum=50;
let x,y;
let light = false;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(255);
noStroke();
let length=width/colNum;
for(col=0; col<colNum; col++){
for(row=0; row<rowNum; row++){
if((row%2==0 && col%2==0) || (row%2!=0 && col%2!=0)){
}else{
fill('white');}
x=col*length;
y=row*length;
rect(x,y,length,length);
}
}
}
var xoff1 = 0.0;
var yoff2 = 0.0;
var xoff2 = 0.0;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(255);
noStroke();
fill(147,177,200,150);
beginShape(); 
var xoff1 = 0;
for (var x = 0; x <= width; x += 10) {
var y = map(noise(xoff1, yoff1), 0, 1, 200,300);
vertex(x, y); 
xoff1 += 0.01;
}
yoff1 += map(mouseX,0,width,0,0.03);
vertex(width, height);
vertex(0, height);
endShape(CLOSE);
beginShape(); 
var xoff2 = 0;
for (var x = 0; x <= width; x += 10) {
var y = map(noise(xoff2, yoff2), 0, 1, 100,200);
vertex(x, y); 
xoff2 += 0.03;
}
yoff2 += map(mouseX,0,width,0,0.09);
vertex(width, height);
vertex(0, height);
endShape(CLOSE);
}var noiseScale = 0.05;
var level;
var wave;
var start = 50;
var end = 350;
var controlX = 50;
var controlY = 60;
var r = 50;
var dragging = false;
var offsetX = 0;
var starX = 0;
var starY = 0;
var starR = 3;
var x1, x2, x3, x4, x5, x6, y1, y2, y3, y4, y5, y6;
function setup() {
createCanvas(400, 400);
x1 = random(100, width);
x2 = random(100, width);
x3 = random(100, width);
x4 = random(100, width);
x5 = random(100, width);
x6 = random(100, width);
y1 = random(50, 200);
y1 = random(50, 200);
y2 = random(50, 200);
y3 = random(50, 200);
y4 = random(50, 200);
y5 = random(50, 200);
y6 = random(50, 200);
}
function draw() {
background('#040404');
fill(0, 10);
rect(0, 0, width, height);
noFill();
stroke(255, 100);
beginShape();
vertex(x1, y1);
vertex(x2, y2);
vertex(x3, y3);
vertex(x4, y4);
vertex(x5, y5);
vertex(x6, y6);
endShape();
fill(255);
ellipse(x1, y1, starR, starR);
ellipse(x2, y2, starR, starR);
ellipse(x3, y3, starR, starR);
ellipse(x4, y4, starR, starR);
ellipse(x5, y5, starR, starR);
ellipse(x6, y6, starR, starR);
fill(255);
stroke('#51C8D8');
for (var x = 0; x < width * 10; x = x + 0.7) {
var noiseVal = noise(wave * noiseScale, level * noiseScale);
if (random(1) > 0.5) {
fill('#88D5E1');
} else {
fill('white');
}
ellipse(x, level + noiseVal * 80, 400, 400);
wave = random(0, width * 2);
}
level = map(controlX, start, end, 550, 450);
noStroke();
fill('#FFD72C');
ellipse(controlX, controlY, r, r);
if (dragging = true) {
controlX = mouseX - offsetX;
}
controlX = constrain(controlX, start, end);
fill(255);
textSize(10);
textFont('Georgia');
text('Happy Mid-Autumn Festival',140,200);
}
function mousePressed() {
if (dist(mouseX, mouseY, controlX, controlY) < r) {
dragging = true;
offsetX = mouseX - controlX;
}
}
function mouseReleased() {
dragging = false;
}var angle = 0;
var r1 = 100;
var r2 = 100;
frameRate = 5;
var angle2 = 0;
var r = 20;
var index = 0;
var x1,x2,y1,y2;
var w = 20;
var h = 20;
function setup() {
createCanvas(400, 400);
background(0);
}
function draw() {
noFill();
stroke(148,80+mouseX,187+mouseY,50);
translate(width/2,height/2);
rotate(angle);
rect(0,0,map(mouseX,0,width,0,200),200);
r1 = r1+5;
angle = angle + 5;
ellipse(50,50,r,r);
r++;
}var x = 0;
var y = 0;
var i = 1;
var r = 5;
var angle = 0;
var r1 = 100;
var r2 = 100;
function setup() {
createCanvas(600, 600);
background(255);
frameRate = 2;
}
function draw() {
noFill();
stroke(148,80+mouseX,187+mouseY,50);
translate(width/2,height/2);
rotate(angle);
ellipse(0,0,r1,r2);
r1 = r1+5;
angle = angle + 5;
noStroke();
fill(map(mouseX,0,width,0,255),map(mouseY,0,360,0,255),230,150);
if (random(1) > 0.5) {
ellipse(x, y, r, r);
} 
else {
ellipse(x+r, y+r, r, r);
}
x += r;
if (x > width) {
x = 0;
y += r;
}
if (y > height) {
background(255);
x = 0;
y = 0;
}
}
function mousePressed(){
background(0); 
}let i=1;
let section =3;
let x=0; 
let mouseP = 0;
let t =0;
let span;
let light = false;
let hover = false;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(255);
span = width/section;
for(i=0; i <= width/span; i++) {
x = i * span;
line (x,0,x,height);
}
if (light){
t=255;
fill(255,0,0,t);
rect(2*span,0,span, height);
}
if ( (light) && (abs(mouseP-mouseX)>abs(mouseP-2*span) ) ){
hover = true; 
}
if((hover) && (mouseX>2*span && mouseX<width)){
t=0;
hover = false;
light=!light;
}
}
function mousePressed(){
if (mouseX > 2*span){
light = !light; 
}
mouseP = mouseX;
}
var bright0 = 0;
var bright1 = 0;
var bright2 = 0;
var bright3 = 0;
function setup() { 
createCanvas(640,360); 
} 
function draw() { 
background(0); 
if (mouseX < 320 && mouseY < 180) { 
bright0 = 255;
} 
else if (mouseX > 320 && mouseY < 180) { 
bright1 = 255;
} 
else if (mouseX < 320 && mouseY > 180) { 
bright2 = 255;
} 
else if (mouseX > 320 && mouseY > 180) { 
bright3 = 255;
} 
bright0 = bright0 - 2;
bright1 = bright1 - 2;
bright2 = bright2 - 2;
bright3 = bright3 - 2;
noStroke(); 
fill(bright0);
rect(0,0,320,180); 
fill(bright1);
rect(320,0,320,180); 
fill(bright2);
rect(0,180,320,180); 
fill(bright3);
rect(320,180,320,180); 
stroke(255); 
line(320,0,320,360); 
line(0,180,640,180); 
} let i=1;
let section =3;
let span;
let x=0; 
let light = false;
let hover = false;
let mouseP = 0;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(255);
let span = width/section;
for(i=0; i <= width/span; i++) {
x = i * span;
line (x,0,x,height);
}
if (light==true){
fill('red');
rect(2*span,0,span, height);
}
}
function mousePressed(){
if (mouseX > 2*span){
light = !light; 
}
mouseP = mouseX;
}
let leftIsOn = false;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(150);
noStroke();
if (leftIsOn=true) {
fill('red');
rect(0, 0, width / 3, height);
}
}
function mousePressed() {
if (mouseX < width / 3) {
leftIsOn = !leftIsOn;
}
}
let h=1;
let v=1;
let space = 400/10;
let x=0; 
let y=0;
function setup() {
createCanvas(400, 400);
background(255);
}
function draw() {
noStroke();
for(v=0;v<=height/space;v++){
for(h=0; h <= width/space; h++) {
x = h * space;
if((v+1)%2==0){
if((h+1)%2==0){
fill(0);}else{
fill(255);
}
}else if((h+1)%2!=0){
fill(0);}else{
fill(255);
}
rect (x,y,space, space);
}
y=v*space;
}
}let h=1;
let v=1;
let space = 400/10;
let x=0; 
let y=0;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(255);
for(v=0;v<=height/space;v++){
for(h=0; h <= width/space; h++) {
x = h * space;
rect (x,y,space, space);
}
y=v*space;
}
}let h=1;
let v=1;
let space = 400/10;
let x=0; 
let y=0;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(255);
for(v=0;v<=height/space;v++){
for(h=0; h <= width/space; h++) {
x = h * space;
rect (x,y,space, space);
}
y=v*space;
}
}let h=0;
let v=0;
let space = 400/10;
let x=0;
let y=0;
function setup() {
createCanvas(400, 400);
background(255);
}
function draw() {
for (h=0; h<=width/10;h++){
x=x+h*space;
rect(x,y,width/10,height/10); 
}
y=y+v*space;
}let i=1;
let v=1;
let space = 400/10;
let x=0; 
let y=0;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(255);
for (v=0; v<=height/space;v++) {
for(i=0; i <= width/space; i++) {
x = i * space;
rect (x,y,space, space);
}
y=v*space;
}
}let i=1;
let v=0;
let space = 400/10;
let x=0; 
let y=0;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(255);
for(v=0; v<=height/space; v+=) {
for(i=0; i <= width/space; i++) {
rect(x,y,40,40);
x = i * space;
}
y= v*space;
}
}
}let i=1;
let space = 400/10;
let x=0; 
function setup() {
createCanvas(400, 400);
}
function draw() {
background(255);
for(i=0; i <= width/space; i++) {
x = i * space;
line (x,0,x,height);
if (mouseX>x && mouseX<(x+space)){
fill(140,20+i*map(x,0,width,0,10),map(x,0,width,0,255));
rect (x,0,space, height);
}         
}
}
let i=1;
let space = 400/10;
let x=0; 
function setup() {
createCanvas(400, 400);
}
function draw() {
background(255);
for(i=0; i <= width/space; i++) {
x = i * space;
line (x,0,x,height);
if (mouseX>x && mouseX<(x+space)){
if (i%2==0){
fill('blue');}else{
fill(255,0,0);}
rect (x,0,space, height);
}
}
}
let i=1;
let space = 400/10;
let x=0; 
function setup() {
createCanvas(400, 400);
}
function draw() {
background(255);
for(i=0; i <= width/space; i++) {
x = i * space;
line (x,0,x,height);
if (mouseX>x && mouseX<(x+space)){
if (i<=5){
fill('blue');}else{
fill(255,0,0);}
rect (x,0,space, height);
}
}
}
let i=1;
let space = 400/10;
let x=0; 
function setup() {
createCanvas(400, 400);
}
function draw() {
background(255);
for(i=0; i <= width/space; i++) {
x = i * space;
line (x,0,x,height);
if (mouseX>x && mouseX<(x+space)){
fill(255,0,0);
rect (x,0,space, height);
}  
}
}
let i=1;
let space = 400/3;
let x=0; 
function setup() {
createCanvas(400, 400);
}
function draw() {
background(255);
for(i=0; i <= width/space; i++) {
x = i * space;
line (x,0,x,height);
if (mouseX>x && mouseX<(x+space)){
fill(255,0,0);
rect (x,0,space, height);
}  
}
}
let i=1;
let space = 400/10;
let x=0;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(255);
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(255);
}let i=1;
let space = 400/10;
let x=0; 
function setup() {
createCanvas(400, 400);
}
function draw() {
background(255);
for(i=0; i <= width/space; i++) {
x = i * space;
line (x,0,x,height);
if (mouseX>x && mouseX<(x+space)){
if (i==7){
fill(255);}else{
fill(255,0,0);}
rect (x,0,space, height);
}
}
}
if (i==7) {
if (mouseX> x && mouseX<x+space){
fill(255);}
}else{
if (mouseX> x && mouseX<x+space){
fill(255,0,0);
}
line(x,0,x,height); 
push();
noStroke();
fill(map(x,0,width,0,255),random(255),random(255));
ellipse (x,height/2, 10,10);
pop();
let x = 0;
let xspeed = 2;
let y = 0;
let yspeed = 3;
let bg=20;
let bgspeed = 2;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(bg);
ball();
bg += bgspeed;
x = x + xspeed;
y = y + yspeed;
}
function ball() {
fill(0);
noStroke();
ellipse(x,y,40,40);
}
function move(){
x = x + xspeed;
y = y + yspeed;
}
function bounce(state,low,high,speed){
if (state>high || state<low){
speed *= -1;}
return speed;
}let y=600;
let yspeed = 0;
let x= 200;
let xspeed =0;
function setup() {
createCanvas(400, 600);
}
function draw() {
background(255);
ellipse(x+random(-5,5),y+random(-5,5),20,20);
y -= yspeed;
yspeed = (y-mouseY)/100;
x -= xspeed;
xspeed = (x-mouseX)/100;
console.log(y);
}let x=0;
let y=0;
let dx=0;
let dy=0;
var circle = {
x:0,
y:100,
d:50
};
function setup() { 
createCanvas(600, 600);
rectMode(CENTER);
x=width/2;
y=height/2;
} 
function draw() {
background(220);
rect(x, y, width/4, height/4); 
dx=x-mouseX;
dy=y-mouseY;
x=x-dx*0.05;
y=y-dy*0.05;
line(x,y,mouseX,mouseY);
}var a=-5;
var achange=0.1;
var r=0;
var g=0;
var b=0;
function setup() {
createCanvas(400, 400);
r = random (255);
g = random (255);
b = random (255);
}
function draw() {
background(51,51,51);   
noStroke();
fill(r,g,b);
push();
angleMode(DEGREES);
translate(200,0);
rotate(a);
a = a + achange;
if (a>5){
achange = achange * -1
}
if (a<-5){
achange = achange *-1
}
fill(255,g,b);
triangle(0,0,-350,500,500,500);
pop();
stroke(0);
fill(0);
x=0;
while(x<400){
x=x+50;
line(x,0,x,500);
text(x,x,20);
}
y=0;
while(y<500){
y=y+50;
line(0,y,400,y);
text(y,20,y);
}  
fill(225,44,33);
noStroke();
p1x=56;
p1y=311;
p2x=60;
p2y=260;
p3x=110;
p3y=214;
p4x=163;
p4y=239;
beginShape();
curveVertex(150, 350);
curveVertex(p1x, p1y);
curveVertex(p2x,p2y);
curveVertex(p3x, p3y);
curveVertex(p4x, p4y);
curveVertex(110, 300);
endShape();
push();
stroke(0);
strokeWeight(5);
point(p1x,p1y);
point(p2x,p2y);
point(p3x,p3y);
point(p4x,p4y);
pop();
fill(84,93,79);
noStroke();
beginShape();
vertex(198,315);
vertex(185,325);
vertex(168,332);
vertex(152,361);
vertex(120,347);
vertex(142,310);
endShape();
fill(0);
noStroke();
beginShape();
vertex(153,360);
vertex(147,373);
vertex(89,355.5);
vertex(120,346);
endShape();
fill(171,171,169);
noStroke();
beginShape();
vertex(146.92,373);
vertex(159,400);
vertex(147,400);
vertex(112,357);
endShape();
fill(17,16,16);
noStroke();
beginShape();
vertex(108.4,352);
vertex(138.66,383.12);
vertex(147,400);
vertex(41,400);
vertex(51,387);
vertex(68,373);
endShape();
fill(38,38,38);
noStroke();
beginShape();
vertex(56,311);
vertex(57,353);
vertex(68,373);
vertex(162,326);
vertex(146,312);
vertex(136,278);
vertex(139,255)
endShape();
fill(216,216,216);
noStroke();
beginShape();
vertex(139,255);
vertex(163,239);
vertex(170,251);
vertex(169,259);
vertex(192,273);
vertex(192,278);
vertex(188,283);
vertex(193,291);
vertex(192,294);
vertex(194,294);
vertex(194,301);
vertex(198,307);
vertex(198,315);
vertex(165,319);
vertex(146,312);
vertex(136,276);
endShape();
fill(216);
noStroke();
beginShape();
vertex(184,127);
vertex(184,131);
vertex(190,141);
vertex(192,152);
vertex(197,162);
vertex(195,189);
vertex(210,191);
vertex(218,197);
vertex(221,197);
vertex(225,201);
vertex(233,205);
vertex(233,212);
vertex(240,221);
vertex(254,222);
vertex(261,216);
vertex(266,216);
vertex(273,233);
vertex(344,175);
vertex(313,131);
vertex(300,95);
endShape();
fill(33,31,33);
noStroke();
beginShape();
vertex(216,116);
vertex(239,137);
vertex(249,107);
vertex(271,112);
vertex(282,128);
vertex(298,125);
vertex(306,128);
vertex(313,130);
vertex(307,94);
endShape();
fill(0);
noStroke();
beginShape();
vertex(183,131);
vertex(176,131);
vertex(176,122);
vertex(299,78);
vertex(308,84);
vertex(308,94);
endShape();
beginShape();
curveVertex(180,250);
curveVertex(176,122);
curveVertex(200,62);
curveVertex(260,48);
curveVertex(299,78);
curveVertex(300,150);
endShape();
fill(32);
noStroke();
beginShape();
vertex(271,235);
vertex(343,166);
vertex(381,191);
vertex(400,214);
vertex(400,400);
vertex(199,400);
endShape();
push();
fill(map(mouseX,0,400,0,255));
noStroke();
translate(195,158);
angleMode(DEGREES);
rotate(-37);
ellipse(0,0,6,20);
pop();
fill(255);
textSize(10);
if (mouseX>250 && mouseX<500) {
ellipse(325,45,150,60);
fill(51,51,51);
text('and stop saying "OKAY"',270,45);
text('all the time, okay?',290,60);
}
if (mouseX<250 && mouseX>0){
ellipse(60,230,60,40);
fill(51,51,51);
text('Okay',50,233);
}
}