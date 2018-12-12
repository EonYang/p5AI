var img;
var img2;
var cnv;
var change;
var isOverArea;
var myDiv;
var testPolygon;
var testPolygon2;
var testPolygon3;
var testPolygon4;
var testPolygon5;
var testPolygon6;
var testPolygon7;
var testPolygon8;
var testPolygon9;
var testPolygon10;
function preload() {
img = loadImage('free-negro2.jpg');
img2 = loadImage('original-dubois.jpg');
}
function setup() {
cnv = createCanvas(window.innerWidth, window.innerHeight);
testPolygon = new Polygon(color(0, 0, 0, .05),522,206,522,243,492,243,498,206, '.4% of Black people were in prison');
testPolygon2 = new Polygon(color(0, 0, 0, .05),522,243,522,282,490,283,492, 246, '.5% of Black people were in prison');
testPolygon3 = new Polygon(color(0, 0, 0, .05),522,282,522,318,491,318,491, 282, '.5% of Black people were in prison');
testPolygon4 = new Polygon(color(0, 0, 0, .05),522,318,522,358,489,358,491,318, '.61% of Black people were in prison');
testPolygon5 = new Polygon(color(0, 0, 0, .05),522,358,522,398,486,398,490, 358, '.67% of Black people were in prison');
testPolygon6 = new Polygon(color(0, 0, 0, .05),522,398,522,430,488,430,487,398, '.61% of Black people were in prison');
testPolygon7 = new Polygon(color(0, 0, 0, .05),522,430,522,467,484,467,488,430, '.7% of Black people were in prison');
testPolygon8 = new Polygon(color(0, 0, 0, .05),522,469,522,504,449,504,484,469, '1.7% of Black people were in prison');
testPolygon9 = new Polygon(color(0, 0, 0, .05),522,507,522,542,449,542,449,507, '1.7% of Black people were in prison');
testPolygon10 = new Polygon(color(0, 0, 0, .05),522,545,522,582,416,582,447, 545, '2.34% of Black people were in prison');
}
function draw() {
background (193, 180, 180);
image(img, 267, 125, img.width / 4, img.height / 4);
image(img2, 757, 125, img.width / 4, img.height / 4);
testPolygon.display();
testPolygon.checkForMouseOver(mouseX,mouseY);
testPolygon2.display();
testPolygon2.checkForMouseOver(mouseX,mouseY);
testPolygon3.display();
testPolygon3.checkForMouseOver(mouseX,mouseY);
testPolygon4.display();
testPolygon4.checkForMouseOver(mouseX,mouseY);
testPolygon5.display();
testPolygon5.checkForMouseOver(mouseX,mouseY);
testPolygon6.display();
testPolygon6.checkForMouseOver(mouseX,mouseY);
testPolygon7.display();
testPolygon7.checkForMouseOver(mouseX,mouseY);
testPolygon8.display();
testPolygon8.checkForMouseOver(mouseX,mouseY);
testPolygon9.display();
testPolygon9.checkForMouseOver(mouseX,mouseY);
testPolygon10.display();
testPolygon10.checkForMouseOver(mouseX,mouseY);
}
function Polygon(color,x1,y1,x2,y2,x3,y3,x4,y4,statement) {
this.color = color;
this.x1 = x1;
this.y1 = y1;
this.x2 = x2;
this.y2 = y2;
this.x3 = x3;
this.y3 = y3;
this.x4 = x4;
this.y4 = y4;
this.statement = statement;
this.isMouseOver = false;
this.textvisible = false;
this.display = function(){
fill(color);
strokeWeight(0);
beginShape();
vertex(x1, y1);
vertex(x2, y2);
vertex(x3, y3);
vertex(x4, y4);
endShape(CLOSE);
this.showtext();
}
this.showtext = function(){
if(!this.textvisible) return;
textSize(15);
fill('white');
text(this.statement || "add a statement!", mouseX, mouseY);
}
this.checkForMouseOver = function(currentMouseX, currentMouseY){
if(currentMouseX>=this.x3 && currentMouseX<=this.x1 && currentMouseY>=this.y4 && currentMouseY<=this.y2) {
this.textvisible = true;
} else {
this.textvisible = false; 
}
}
}
var img;
var cnv;
var change;
var isOverArea;
var myDiv;
var testPolygon;
var testPolygon2;
var testPolygon3;
var testPolygon4;
var testPolygon5;
var testPolygon6;
var testPolygon7;
var testPolygon8;
var testPolygon9;
var testPolygon10;
function preload() {
img = loadImage('free-negro2.jpg');
}
function setup() {
cnv = createCanvas(window.innerWidth, window.innerHeight);
testPolygon = new Polygon(color(0, 0, 0, .05),522,206,522,243,492,243,498,206);
testPolygon2 = new Polygon(color(0, 0, 0, .05),522,243,522,282,490,283,492,246);
testPolygon3 = new Polygon(color(0, 0, 0, .05),522,282,522,318,491,318,491,282);
testPolygon4 = new Polygon(color(0, 0, 0, .05),522,318,522,358,489,358,491,318);
testPolygon5 = new Polygon(color(0, 0, 0, .05),522,358,522,398,486,398,490, 358);
testPolygon6 = new Polygon(color(0, 0, 0, .05),522,398,522,430,488,430,487,398);
testPolygon7 = new Polygon(color(0, 0, 0, .05),522,430,522,476,484,467,488,430);
testPolygon8 = new Polygon(color(0, 0, 0, .05),522,469,522,504,449,504,484,469);
testPolygon9 = new Polygon(color(0, 0, 0, .05),522,507,522,542,449,542,449,507);
testPolygon10 = new Polygon(color(0, 0, 0, .05),522,545,522,582,416,582,447, 545);
}
function draw() {
background(241, 235, 233);
image(img, 267, 125, img.width / 4, img.height / 4);
testPolygon.display();
testPolygon.checkForMouseOver(mouseX,mouseY);
testPolygon2.display();
testPolygon2.checkForMouseOver(mouseX,mouseY);
testPolygon3.display();
testPolygon3.checkForMouseOver(mouseX,mouseY);
testPolygon4.display();
testPolygon4.checkForMouseOver(mouseX,mouseY);
testPolygon5.display();
testPolygon5.checkForMouseOver(mouseX,mouseY);
testPolygon6.display();
testPolygon6.checkForMouseOver(mouseX,mouseY);
testPolygon7.display();
testPolygon7.checkForMouseOver(mouseX,mouseY);
testPolygon8.display();
testPolygon8.checkForMouseOver(mouseX,mouseY);
testPolygon9.display();
testPolygon9.checkForMouseOver(mouseX,mouseY);
testPolygon10.display();
testPolygon10.checkForMouseOver(mouseX,mouseY);
}
function Polygon(color,x1,y1,x2,y2,x3,y3,x4,y4) {
this.color = color;
this.x1 = x1;
this.y1 = y1;
this.x2 = x2;
this.y2 = y2;
this.x3 = x3;
this.y3 = y3;
this.x4 = x4;
this.y4 = y4;
this.isMouseOver = false;
this.display = function(){
fill(color);
strokeWeight(0);
beginShape();
vertex(x1, y1);
vertex(x2, y2);
vertex(x3, y3);
vertex(x4, y4);
endShape(CLOSE);    
}
this.checkForMouseOver = function(currentMouseX, currentMouseY){
if(currentMouseX>=this.x3 && currentMouseX<=this.x1 && currentMouseY>=this.y4 && currentMouseY<=this.y2) {
}
}
}
var img;
var cnv;
var d;
var u;
var u2;
var count;
var mods = [];
function preload() {
img = loadImage('free-negro2.jpg');
}
function setup() {
cnv = createCanvas(windowWidth, windowHeight);
u = 100;
u2 = (u/2)*sqrt(3);
var highCount = (height/u)+3;
var wideCount = (width/u2)+3;
count = int(highCount * wideCount);
var index = 0;
for (var xc = 0; xc < wideCount*2; xc++) {
for (var yc = 0; yc < highCount*2; yc++) {
mods[index++] = new Module((int(xc)*u2*2),int(yc)*u);
}
}
}
function draw() {
background(241, 235, 233);
image(img, width/3, height/6, img.width/4, img.height/4);
noStroke();
for (var i = 0; i <= count; i++) {
mods[i].draw1();
}
translate(u2,u/2);
for (var i = 0; i <= count; i++) {
mods[i].draw3();
}
}
function mousePressed() {
for (var i = 0; i <= count; i++) {
mods[i].Pressed();
}
}
function Module(_x, _y) {
this.s = 40;
this.x1 = _x;
this.y1 = _y;
this.x3 = _x;
this.y3 = _y;
this.b1 = false;
this.b3 = false;
this.isOverCircle1 = false;
this.isOverCircle3 = false;
this.c1 = '#545861';
this.c3 = '#545861';
}
Module.prototype.draw1 = function() {
push();
translate(this.x1, this.y1);
rectMode(CENTER);
noStroke();
fill(0);
rect(0,0,this.s+1,this.s+1);
fill(this.c1);
rect(0,0,this.s,this.s);
this.px1 = mouseX;
this.py1 = mouseY;
this.nx1 = this.x1;
this.ny1 = this.y1;
this.isOverCircle1 = (this.px1>this.nx1-this.s/2 && this.px1<this.nx1+this.s/2 && this.py1>this.ny1-this.s/2 && this.py1<this.ny1+this.s/2);
if(this.isOverCircle1 === true)
{
fill('rgba(255, 255, 255, 0.2)');
rect(0,0,this.s,this.s);
} else {
noFill(); 
}
pop();
}
Module.prototype.draw3 = function() {
push();
translate(this.x3, this.y3);
rectMode(CENTER);
noStroke();
fill(0);
rect(0,0,this.s+1,this.s+1);
fill(this.c3);
rect(0,0,this.s,this.s);
this.px3 = mouseX;
this.py3 = mouseY;
this.nx3 = this.x3+u2;
this.ny3 = this.y3+(u/2);
this.isOverCircle3 = (this.px3>this.nx3-this.s/2 && this.px3<this.nx3+this.s/2 && this.py3>this.ny3-this.s/2 && this.py3<this.ny3+this.s/2);  
if(this.isOverCircle3 === true)
{
fill('rgba(255, 255, 255, 0.2)');
rect(0,0,this.s,this.s);
} else {
noFill(); 
}
pop();
}
Module.prototype.Pressed = function() {
if (this.isOverCircle1 === true){
if(this.b1 === false){
this.c1 = '#FFF0BD';
this.b1 = true;
} else {
this.c1 = '#545861';
this.b1 = false; 
}
}
if (this.isOverCircle3 === true){
if(this.b3 === false){
this.c3 = '#FFF0BD';
this.b3 = true;
} else {
this.c3 = '#545861';
this.b3 = false; 
}
}
}
var img;
var cnv;
var d2;
var d3;
var d4;
var d5;
var d6;
var d7;
var d8;
var d9;
var d10;
function preload() {
img = loadImage('free-negro2.jpg');
}
function setup() {
cnv = createCanvas(window.innerWidth, window.innerHeight);
}
function draw() {
background(241, 235, 233);
image(img, 267, 125, img.width/4, img.height/4);
for (var d1 = 0; d1 < 50; d1++) {
fill(82, 305, 49, 1);
beginShape();
vertex(522, 206);
vertex(522, 243);
vertex(492, 243);
vertex(498, 206);
endShape(CLOSE);
}
for (var d2 = 0; d2 < 50; d2++) {
fill(99, 30, 99, 2);
beginShape();
vertex(522, 243);
vertex(522, 282);
vertex(490, 283);
vertex(492, 246);
endShape(CLOSE);
}
for (var d3 = 0; d3 < 50; d3++) {
fill(82, 305, 49, 1);
beginShape();
vertex(522, 282);
vertex(522, 318);
vertex(491, 318);
vertex(491, 282);
endShape(CLOSE);
}
for (var d4 = 0; d4 < 50; d4++) {
fill(99, 30, 99, 2);
beginShape();
vertex(522, 318);
vertex(522, 358);
vertex(489, 358);
vertex(491, 318);
endShape(CLOSE);
}
for (var d5 = 0; d5 < 50; d5++) {
fill(82, 305, 49, 1);
beginShape();
vertex(522, 358);
vertex(522, 398);
vertex(486, 398);
vertex(490, 358);
endShape(CLOSE);
}
for (var d6 = 0; d6 < 50; d6++) {
fill(99, 30, 99, 2);
beginShape();
vertex(522, 398);
vertex(522, 430);
vertex(488, 430);
vertex(487, 398);
endShape(CLOSE);
}
for (var d7 = 0; d7 < 50; d7++) {
fill(82, 305, 49, 1);
beginShape();
vertex(522, 430);
vertex(522, 467);
vertex(484, 467);
vertex(488, 430);
endShape(CLOSE);
}
for (var d8 = 0; d8 < 50; d8++) {
fill(99, 30, 99, 2);
beginShape();
vertex(522, 469);
vertex(522, 504);
vertex(449, 504);
vertex(484, 469);
endShape(CLOSE);
}
for (var d9 = 0; d9 < 50; d9++) {
fill(82, 305, 49, 1);
beginShape();
vertex(522, 507);
vertex(522, 542);
vertex(449, 542);
vertex(449, 507);
endShape(CLOSE);
}
for (var d10 = 0; d10 < 50; d10++) {
fill(99, 30, 99, 2);
beginShape();
vertex(522, 545);
vertex(522, 582);
vertex(416, 582);
vertex(447, 545);
endShape(CLOSE);
}
}
var a;
var x;
var y;
var timee = 0;
var currentbpm = 120;
var previousAngle = -1
function setup() {
angleMode(DEGREES);
createCanvas(windowWidth,windowHeight);
Tone.Transport.start()
}
function draw() {
background(255, 240, 245);
if (mouseIsPressed) {
a = atan2(mouseY - height / 2, mouseX - width / 2);
Tone.Transport.bpm.value = map(a, -180, 180, 100, 260)
}
translate(width / 2, height / 2);
ellipse(0, 0, 400, 400)
push();
rotate(a);
fill(230, 230, 250);
stroke(230, 230, 20);
ellipse((cos(a) * 220), (sin(a) * 220) , 15, 15);
}
var a;
var x;
var y;
var timee = 0;
var old_pos =0;
var new_pos =0;
var changee =0;
var currentbpm = 120;
var previousAngle = -1;
function setup() {
angleMode(DEGREES);
createCanvas(windowWidth, windowHeight);
Tone.Transport.start()
}
var synth1 = new Tone.Synth({
oscillator: {
modulationType: 'sawtooth'
},
envelope: {
attack: 0.05,
decay: 0.01,
sustain: 5,
release: 0.8
}
}).toMaster()
var synth2 = new Tone.MembraneSynth({
pitchDecay  : 0.05 ,
octaves  : 3 ,
oscillator  : {
type  : "sine"
}  ,
envelope  : {
attack  : 0.001 ,
decay  : 0.4 ,
sustain  : 0.01 ,
release  : 0.4 ,
attackCurve  : "exponential"
}
}).toMaster()
var synth3 = new Tone.MembraneSynth({
pitchDecay  : 0.5 ,
octaves  : 3 ,
oscillator  : {
type  : "sine"
}  ,
envelope  : {
attack  : 0.001 ,
decay  : 0.4 ,
sustain  : 0.01 ,
release  : 0.4 ,
attackCurve  : "exponential"
}
}).toMaster()
var synth4 = new Tone.MembraneSynth({
pitchDecay  : 0.05 ,
octaves  : 10 ,
oscillator  : {
type  : "sine"
}  ,
envelope  : {
attack  : 0.001 ,
decay  : 0.4 ,
sustain  : 0.01 ,
release  : 1.4 ,
attackCurve  : "exponential"
}
}).toMaster()
var soundloop = new Tone.Sequence(function(time, note) {
synth1.triggerAttackRelease(note, '16t', time)
}, [
['A2', null, null],
['F#2', null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
['C2', null, null],
['C2', null, null],
['B1', null],
[null, null, null],
[null, null, null],
[null, null],
]).start(timee)
var soundloop = new Tone.Sequence(function(time, note) {
synth2.triggerAttackRelease(note, '16t', time)
}, [
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, 'A3', null],
[null, null, 'A3'],
['B3',  null],
['A2', 'A2', 'A2'],
[null, null, null],
[null, null],
[null, null, null],
['B2', 'B2', 'B2'],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, 'A3', null],
[null, null, 'A3'],
['B3', null],
['A2', 'A2', 'A2'],
[null, null, null],
[null, null],
[null, null, null],
['B2', 'B2', 'B2'],
['B2', 'B2', 'B2'],
['B2', 'B2', 'B2'],
[null, null, null],
[null, null],
[null, 'A3', null],
[null, null, 'A3'],
['B3',  null],
['A2', 'A2', 'A2'],
[null, null, null],
[null, null],
[null, null, null],
['B2', 'B2', 'B2'],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, 'A3', null],
[null, null, 'A3'],
['B3', null],
['A2', 'A2', 'A2'],
[null, null, null],
[null, null],
[null, null, null],
['B2', 'B2', 'B2'],
['B2', 'B2', 'B2'],
['B2', 'B2', 'B2'],
[null, null, null],
[null, null],
[null, 'A3', null],
[null, null, 'A3'],
['B3',  null],
['A2', 'A2', 'A2'],
[null, null, null],
[null, null],
[null, null, null],
['B2', 'B2', 'B2'],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, 'A3', null],
[null, null, 'A3'],
['B3', null],
['A2', 'A2', 'A2'],
[null, null, null],
[null, null],
[null, null, null],
['B2', 'B2', 'B2'],
['B2', 'B2', 'B2'],
['B2', 'B2', 'B2'],
[null, null, null],
[null, null],
]).start(timee)
var soundloop = new Tone.Sequence(function(time, note) {
synth3.triggerAttackRelease(note, '16t', time)
}, [
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
['F2', null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
['F2', null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
['F2', null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
['F2', null],
[null, 'A3', null],
[null, null, 'A3'],
['B3',  null],
['A2', 'A2', 'A2'],
[null, null, null],
[null, null],
[null, null, null],
['B2', 'B2', 'B2'],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, 'A3', null],
[null, null, 'A3'],
['B3', null],
['A2', 'A2', 'A2'],
[null, null, null],
[null, null],
[null, null, null],
['B2', 'B2', 'B2'],
['B2', 'B2', 'B2'],
['B2', 'B2', 'B2'],
[null, null, null],
[null, null],
[null, 'A3', null],
[null, null, 'A3'],
['B3',  null],
['A2', 'A2', 'A2'],
[null, null, null],
[null, null],
[null, null, null],
['B2', 'B2', 'B2'],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, 'A3', null],
[null, null, 'A3'],
['B3', null],
['A2', 'A2', 'A2'],
[null, null, null],
[null, null],
[null, null, null],
['B2', 'B2', 'B2'],
['B2', 'B2', 'B2'],
['B2', 'B2', 'B2'],
[null, null, null],
[null, null],
]).start(timee)
var soundLoop = new Tone.Sequence(function(time, note) {
synth4.triggerAttackRelease(note, '8n', time)
}, [
['C1', 'C1', 'C1'],
[null, null, null],
[null, null],
['C1', 'C1', 'C1'],
[null, null, null],
[null, null],
['C1', 'C1', 'C1'],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
['C1', 'C1', 'C1'],
[null, null, null],
[null, null],
['C1', 'C1', 'C1'],
[null, null, null],
[null, null],
['C1', 'C1', 'C1'],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
['C1', 'C1', 'C1'],
[null, null, null],
[null, null],
['C1', 'C1', 'C1'],
[null, null, null],
[null, null],
['C1', 'C1', 'C1'],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
]).start(timee)
var a;
var x;
var y;
var timee = 0;
var old_pos =0;
var new_pos =0;
var changee =0;
var currentBpm = 120;
var previousAngle = -1;
function setup() {
angleMode(DEGREES);
createCanvas(windowWidth, windowHeight);
Tone.Transport.start()
}
function draw() {
background(255, 240, 245);
if (mouseIsPressed) {
new_pos = atan2(mouseY - height / 2, mouseX - width / 2);
a= atan2(mouseY - height / 2, mouseX - width / 2);
changee = old_pos - new_pos;
changee = abs(changee);
Tone.Transport.bpm.value = map(changee, -180, 180, 6, 100);
old_pos = new_pos;
}
translate(width / 2, height / 2);
ellipse(0, 0, 350, 350);
push();
rotate(a);
fill(230, 230, 250);
stroke(230, 230, 20);
ellipse((cos(a) * 200), (sin(a) * 200), 15, 15);
}
var synth1 = new Tone.Synth({
oscillator: {
modulationType: 'sawtooth'
},
envelope: {
attack: 0.05,
decay: 0.01,
sustain: 5,
release: 0.8
}
}).toMaster()
var synth2 = new Tone.MembraneSynth({
pitchDecay  : 0.05 ,
octaves  : 3 ,
oscillator  : {
type  : "sine"
}  ,
envelope  : {
attack  : 0.001 ,
decay  : 0.4 ,
sustain  : 0.01 ,
release  : 0.4 ,
attackCurve  : "exponential"
}
}).toMaster()
var synth3 = new Tone.MembraneSynth({
pitchDecay  : 0.5 ,
octaves  : 3 ,
oscillator  : {
type  : "sine"
}  ,
envelope  : {
attack  : 0.001 ,
decay  : 0.4 ,
sustain  : 0.01 ,
release  : 0.4 ,
attackCurve  : "exponential"
}
}).toMaster()
var synth4 = new Tone.MembraneSynth({
pitchDecay  : 0.05 ,
octaves  : 10 ,
oscillator  : {
type  : "sine"
}  ,
envelope  : {
attack  : 0.001 ,
decay  : 0.4 ,
sustain  : 0.01 ,
release  : 1.4 ,
attackCurve  : "exponential"
}
}).toMaster()
var soundloop = new Tone.Sequence(function(time, note) {
synth1.triggerAttackRelease(note, '16t', time)
}, [
['A2', null, null],
['F#2', null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
['C2', null, null],
['C2', null, null],
['B1', null],
[null, null, null],
[null, null, null],
[null, null],
]).start(timee)
var soundloop = new Tone.Sequence(function(time, note) {
synth2.triggerAttackRelease(note, '16t', time)
}, [
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, 'A3', null],
[null, null, 'A3'],
['B3',  null],
['A2', 'A2', 'A2'],
[null, null, null],
[null, null],
[null, null, null],
['B2', 'B2', 'B2'],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, 'A3', null],
[null, null, 'A3'],
['B3', null],
['A2', 'A2', 'A2'],
[null, null, null],
[null, null],
[null, null, null],
['B2', 'B2', 'B2'],
['B2', 'B2', 'B2'],
['B2', 'B2', 'B2'],
[null, null, null],
[null, null],
[null, 'A3', null],
[null, null, 'A3'],
['B3',  null],
['A2', 'A2', 'A2'],
[null, null, null],
[null, null],
[null, null, null],
['B2', 'B2', 'B2'],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, 'A3', null],
[null, null, 'A3'],
['B3', null],
['A2', 'A2', 'A2'],
[null, null, null],
[null, null],
[null, null, null],
['B2', 'B2', 'B2'],
['B2', 'B2', 'B2'],
['B2', 'B2', 'B2'],
[null, null, null],
[null, null],
[null, 'A3', null],
[null, null, 'A3'],
['B3',  null],
['A2', 'A2', 'A2'],
[null, null, null],
[null, null],
[null, null, null],
['B2', 'B2', 'B2'],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, 'A3', null],
[null, null, 'A3'],
['B3', null],
['A2', 'A2', 'A2'],
[null, null, null],
[null, null],
[null, null, null],
['B2', 'B2', 'B2'],
['B2', 'B2', 'B2'],
['B2', 'B2', 'B2'],
[null, null, null],
[null, null],
]).start(timee)
var soundloop = new Tone.Sequence(function(time, note) {
synth3.triggerAttackRelease(note, '16t', time)
}, [
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
['F2', null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
['F2', null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
['F2', null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
['F2', null],
[null, 'A3', null],
[null, null, 'A3'],
['B3',  null],
['A2', 'A2', 'A2'],
[null, null, null],
[null, null],
[null, null, null],
['B2', 'B2', 'B2'],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, 'A3', null],
[null, null, 'A3'],
['B3', null],
['A2', 'A2', 'A2'],
[null, null, null],
[null, null],
[null, null, null],
['B2', 'B2', 'B2'],
['B2', 'B2', 'B2'],
['B2', 'B2', 'B2'],
[null, null, null],
[null, null],
[null, 'A3', null],
[null, null, 'A3'],
['B3',  null],
['A2', 'A2', 'A2'],
[null, null, null],
[null, null],
[null, null, null],
['B2', 'B2', 'B2'],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, 'A3', null],
[null, null, 'A3'],
['B3', null],
['A2', 'A2', 'A2'],
[null, null, null],
[null, null],
[null, null, null],
['B2', 'B2', 'B2'],
['B2', 'B2', 'B2'],
['B2', 'B2', 'B2'],
[null, null, null],
[null, null],
]).start(timee)
var soundLoop = new Tone.Sequence(function(time, note) {
synth4.triggerAttackRelease(note, '8n', time)
}, [
['C1', 'C1', 'C1'],
[null, null, null],
[null, null],
['C1', 'C1', 'C1'],
[null, null, null],
[null, null],
['C1', 'C1', 'C1'],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
['C1', 'C1', 'C1'],
[null, null, null],
[null, null],
['C1', 'C1', 'C1'],
[null, null, null],
[null, null],
['C1', 'C1', 'C1'],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
['C1', 'C1', 'C1'],
[null, null, null],
[null, null],
['C1', 'C1', 'C1'],
[null, null, null],
[null, null],
['C1', 'C1', 'C1'],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
]).start(timee)
var synth4 = new Tone.MembraneSynth({
pitchDecay  : 0.5 ,
octaves  : 3 ,
oscillator  : {
type  : "sine"
}  ,
envelope  : {
attack  : 0.001 ,
decay  : 0.4 ,
sustain  : 0.01 ,
release  : 0.4 ,
attackCurve  : "exponential"
}
}).toMaster()
synth4.triggerAttackRelease("F3", '8n')
var a;
var x;
var y;
var timee = 0;
var currentBpm = 120;
var previousAngle = -1
function setup() {
angleMode(DEGREES);
createCanvas(windowWidth, windowHeight);
Tone.Transport.start()
}
function draw() {
background(255, 240, 245);
if (mouseIsPressed) {
a = atan2(mouseY - height / 2, mouseX - width / 2);
Tone.Transport.bpm.value = map(a, -180, 180, 600, 2600)
console.log(Tone.Transport.bpm.value)
}
translate(width / 2, height / 2);
ellipse(0, 0, 350, 350)
push();
rotate(a);
fill(230, 230, 250);
stroke(230, 230, 20);
ellipse((cos(a) * 200), (sin(a) * 200), 15, 15);
}
var synth = new Tone.Synth({
oscillator: {
modulationType: 'sawtooth'
},
envelope: {
attack: 0.05,
decay: 0.01,
sustain: 5,
release: 0.8
}
}).toMaster()
var synth2 = new Tone.PolySynth({
oscillator: {
modulationType: 'triangle8'
},
envelope: {
attack: 0.005,
decay: 0.01,
sustain: 2,
release: 0.2
}
}).toMaster()
var synth3 = new Tone.MembraneSynth({
pitchDecay: 0.05,
octaves: 10,
envelope: {
attack: 0.001,
decay: 0.4,
sustain: 0.1,
release: 3.4,
}
}).toMaster()
var synth4 = new Tone.MembraneSynth({
pitchDecay: 0.05,
octaves: 10,
oscillator: {
type: "square"
},
envelope: {
attack: 0.001,
decay: 0.4,
sustain: 0.01,
release: 1.4,
}
}).toMaster()
var a;
var x;
var y;
var timee = 0;
var old_pos =0;
var new_pos =0;
var changee =0;
var currentBpm = 120;
var previousAngle = -1;
function setup() {
angleMode(DEGREES);
createCanvas(windowWidth, windowHeight);
Tone.Transport.start()
}
function draw() {
background(255, 240, 245);
if (mouseIsPressed) {
new_pos = atan2(mouseY - height / 2, mouseX - width / 2);
a= atan2(mouseY - height / 2, mouseX - width / 2);
changee = old_pos - new_pos;
changee = abs(changee);
Tone.Transport.bpm.value = map(changee, -180, 180, 6, 100);
old_pos = new_pos;
}
translate(width / 2, height / 2);
ellipse(0, 0, 350, 350);
push();
rotate(a);
fill(230, 230, 250);
stroke(230, 230, 20);
ellipse((cos(a) * 200), (sin(a) * 200), 15, 15);
}
var synth1 = new Tone.Synth({
oscillator: {
modulationType: 'sawtooth'
},
envelope: {
attack: 0.05,
decay: 0.01,
sustain: 5,
release: 0.8
}
}).toMaster()
var synth2 = new Tone.MembraneSynth({
pitchDecay  : 0.05 ,
octaves  : 3 ,
oscillator  : {
type  : "sine"
}  ,
envelope  : {
attack  : 0.001 ,
decay  : 0.4 ,
sustain  : 0.01 ,
release  : 0.4 ,
attackCurve  : "exponential"
}
}).toMaster()
var synth3 = new Tone.MembraneSynth({
pitchDecay  : 0.5 ,
octaves  : 3 ,
oscillator  : {
type  : "sine"
}  ,
envelope  : {
attack  : 0.001 ,
decay  : 0.4 ,
sustain  : 0.01 ,
release  : 0.4 ,
attackCurve  : "exponential"
}
}).toMaster()
var synth4 = new Tone.MembraneSynth({
pitchDecay  : 0.05 ,
octaves  : 10 ,
oscillator  : {
type  : "sine"
}  ,
envelope  : {
attack  : 0.001 ,
decay  : 0.4 ,
sustain  : 0.01 ,
release  : 1.4 ,
attackCurve  : "exponential"
}
}).toMaster()
var soundloop = new Tone.Sequence(function(time, note) {
synth1.triggerAttackRelease(note, '16t', time)
}, [
['A2', null, null],
['F#2', null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
['C2', null, null],
['C2', null, null],
['B1', null],
[null, null, null],
[null, null, null],
[null, null],
]).start(timee)
var soundloop = new Tone.Sequence(function(time, note) {
synth2.triggerAttackRelease(note, '16t', time)
}, [
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, 'A3', null],
[null, null, 'A3'],
['B3',  null],
['A2', 'A2', 'A2'],
[null, null, null],
[null, null],
[null, null, null],
['B2', 'B2', 'B2'],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, 'A3', null],
[null, null, 'A3'],
['B3', null],
['A2', 'A2', 'A2'],
[null, null, null],
[null, null],
[null, null, null],
['B2', 'B2', 'B2'],
['B2', 'B2', 'B2'],
['B2', 'B2', 'B2'],
[null, null, null],
[null, null],
[null, 'A3', null],
[null, null, 'A3'],
['B3',  null],
['A2', 'A2', 'A2'],
[null, null, null],
[null, null],
[null, null, null],
['B2', 'B2', 'B2'],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, 'A3', null],
[null, null, 'A3'],
['B3', null],
['A2', 'A2', 'A2'],
[null, null, null],
[null, null],
[null, null, null],
['B2', 'B2', 'B2'],
['B2', 'B2', 'B2'],
['B2', 'B2', 'B2'],
[null, null, null],
[null, null],
[null, 'A3', null],
[null, null, 'A3'],
['B3',  null],
['A2', 'A2', 'A2'],
[null, null, null],
[null, null],
[null, null, null],
['B2', 'B2', 'B2'],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, 'A3', null],
[null, null, 'A3'],
['B3', null],
['A2', 'A2', 'A2'],
[null, null, null],
[null, null],
[null, null, null],
['B2', 'B2', 'B2'],
['B2', 'B2', 'B2'],
['B2', 'B2', 'B2'],
[null, null, null],
[null, null],
]).start(timee)
var soundloop = new Tone.Sequence(function(time, note) {
synth3.triggerAttackRelease(note, '16t', time)
}, [
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
['F2', null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
['F2', null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
['F2', null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
['F2', null],
[null, 'A3', null],
[null, null, 'A3'],
['B3',  null],
['A2', 'A2', 'A2'],
[null, null, null],
[null, null],
[null, null, null],
['B2', 'B2', 'B2'],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, 'A3', null],
[null, null, 'A3'],
['B3', null],
['A2', 'A2', 'A2'],
[null, null, null],
[null, null],
[null, null, null],
['B2', 'B2', 'B2'],
['B2', 'B2', 'B2'],
['B2', 'B2', 'B2'],
[null, null, null],
[null, null],
[null, 'A3', null],
[null, null, 'A3'],
['B3',  null],
['A2', 'A2', 'A2'],
[null, null, null],
[null, null],
[null, null, null],
['B2', 'B2', 'B2'],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
[null, 'A3', null],
[null, null, 'A3'],
['B3', null],
['A2', 'A2', 'A2'],
[null, null, null],
[null, null],
[null, null, null],
['B2', 'B2', 'B2'],
['B2', 'B2', 'B2'],
['B2', 'B2', 'B2'],
[null, null, null],
[null, null],
]).start(timee)
var soundLoop = new Tone.Sequence(function(time, note) {
synth4.triggerAttackRelease(note, '8n', time)
}, [
['C1', 'C1', 'C1'],
[null, null, null],
[null, null],
['C1', 'C1', 'C1'],
[null, null, null],
[null, null],
['C1', 'C1', 'C1'],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
['C1', 'C1', 'C1'],
[null, null, null],
[null, null],
['C1', 'C1', 'C1'],
[null, null, null],
[null, null],
['C1', 'C1', 'C1'],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
['C1', 'C1', 'C1'],
[null, null, null],
[null, null],
['C1', 'C1', 'C1'],
[null, null, null],
[null, null],
['C1', 'C1', 'C1'],
[null, null, null],
[null, null],
[null, null, null],
[null, null, null],
[null, null],
]).start(timee)
var a;
var x;
var y;
var timee = 0;
var currentBpm = 120;
var previousAngle = -1
function setup() {
angleMode(DEGREES);
createCanvas(windowWidth,windowHeight);
Tone.Transport.start()
}
function draw() {
background(255, 240, 245);
ellipse(350, 335, 400, 400)
if (mouseIsPressed) {
a = atan2(mouseY - height / 2, mouseX - width / 2);
Tone.Transport.bpm.value = map(a, -180, 180, 60, 260)
console.log(Tone.Transport.bpm.value)
}
translate(width / 2, height / 2);
push();
rotate(a);
fill(230, 230, 250);
stroke(230, 230, 20);
ellipse((cos(a) * 220), (sin(a) * 220) , 15, 15);
}
var synth = new Tone.Synth({
oscillator: {
modulationType: 'sawtooth'
},
envelope: {
attack: 0.05,
decay: 0.01,
sustain: 5,
release: 0.8
}
}).toMaster()
var synth2 = new Tone.PolySynth({
oscillator: {
modulationType: 'triangle8'
},
envelope: {
attack: 0.005,
decay: 0.01,
sustain: 2,
release: 0.2
}
}).toMaster()
var synth3 = new Tone.MembraneSynth({
pitchDecay  : 0.05 ,
octaves  : 10 ,
envelope  : {
attack  : 0.001 ,
decay  : 0.4 ,
sustain  : 0.1 ,
release  : 3.4 ,
}
}).toMaster()
var soundLoop = new Tone.Sequence(function(time, note) {
synth.triggerAttackRelease(note, '16t', time)
}, [
['C2', null, null], ['C2', null, null], ['B1', null], [null, null, null], [null, null, null], [null, null],
['C2', null, null], ['C2', null, null], ['B1', null], [null, null, null], [null, null, null], [null, null], 
]).start(timee)
var soundLoop = new Tone.Sequence(function(time, note) {
synth2.triggerAttackRelease(note, '16t', time)
}, [
[null, null, null], [null, null, null], [null, null], [null, null, null], [null, null, null], [null, null],
[null, null, null], [null, null, null], [null, null], [null, null, null], [null, null, null], [null, null],
[null, 'A2', null], [null, null, 'A2'], ['B1', null], [null, null, null], [null, null, null], [null, null],
[null, null, null], [null, null, null], ['B1', null], [null, null, null], [null, null, null], [null, null], 
[null, 'A2', null], [null, null, 'A2'], ['B1', null], [null, null, null], [null, null, null], [null, null],
[null, null, null], [null, null, null], ['B1', null], [null, null, null], [null, null, null], [null, null], 
]).start(timee)
var soundLoop = new Tone.Sequence(function(time, note) {
synth3.triggerAttackRelease(note, '4n', time)
}, [
[null, null, null], [null, null, null], [null, null], [null, null, null], [null, null, null], [null, null],
[null, null, null], [null, null, null], [null, null], [null, null, null], [null, null, null], [null, null],
[null, null, null], [null, null, null], [null, null], [null, null, null], [null, null, null], [null, null],
[null, null, null], [null, null, null], [null, null], [null, null, null], [null, null, null], [null, null],
[null, null, null], [null, null, null], [null, null], [null, null, null], [null, null, null], [null, null],
[null, null, null], [null, null, null], [null, null], [null, null, null], [null, null, null], [null, null], 
[null, null, null], [null, null, null], [null, 'A2'], [null, null, null], [null, null, null], [null, null],
[null, null, null], [null, null, null], [null, null], [null, 'A3', null], [null, null, null], [null, null],
[null, null, null], [null, null, null], [null, 'A2'], [null, null, null], [null, null, null], [null, null],
[null, null, null], [null, null, null], [null, null], [null, 'A3', null], [null, null, null], [null, null],
[null, null, null], [null, null, null], [null, 'A2'], [null, null, null], [null, null, null], [null, null],
[null, null, null], [null, null, null], [null, null], [null, 'A3', null], [null, null, null], [null, null], 
]).start(timee)
var a;
var x;
var y;
var synth = new Tone.Synth({
oscillator: {
modulationType: 'sawtooth'
},
envelope: {
attack: 0.05,
decay: 0.01,
sustain: 5,
release: 0.8
}
}).toMaster()
function setup() {
angleMode(DEGREES);
createCanvas(400, 400);
}
function draw() {
background(255, 240, 245);
ellipse(200, 200, 150, 150)
if (mouseIsPressed) {
a = atan2(mouseY - height / 2, mouseX - width / 2);
}
translate(width / 2, height / 2);
push();
rotate(a);
fill(230, 230, 250);
ellipse(cos(a) * 100, sin(a) * 100, 25, 25);
document.querySelector('bpm').addEventListener('input', function(e) {
Tone.Transport.bpm.value = parseInt(e.target.value)
})
function triggerSynth(time) {
synth.triggerAttackRelease('8n', time)
}
Tone.Transport.schedule(triggerSynth, 0)
Tone.Transport.loopEnd = '1m'
Tone.Transport.loop = true
document.querySelector('.playToggle').addEventListener('change', function(e) {
if (e.target.checked) {
Tone.Transport.start('+0.1')
} else {
Tone.Transport.stop()
}
})
}var vid;
function setup() {
createCanvas(0, 0);
vid = createVideo("IMG_8973.MOV");
vid.loop()
}
var videoo;
var number1 = 0;
var number2 = 0;
var number3 = 0;
var number4 = 0;
var number5 = 0;
var number6 = 0;
function setup() {
createCanvas(windowWidth, windowHeight);
videoo = createVideo(['earth.mp4', 'earth.webm']);
videoo.hide(); 
videoo.volume([0]);
videoo.size(displayWidth, displayHeight);
}
function gotData() {
}
function draw() {
image(videoo); 
data = int(latestData);
if (data > 34 && data < 37){
background(70, 244, 66, 50);
}
if (data == 37){
background(88, 24, 66, 50);
}
if (data == 38){
background(66, 244, 8, 50);
}
if (data == 40){
background(244, 65, 65, 50);
}
if (data == 41){
background(65, 179, 255, 50);
}
if (data == 43){
background(24, 65, 5, 50);
}
text(latestData, 10, 10);
}
function mousePressed() {
}
let data;
let angles = [];
let locationx = [];
let locationy = [];
let ranonce = false;
class PersonBubble {
constructor(networth, index) {
this.r = (networth) * 6;
this.x = bubblearea * cos(bubbleangle) + 300;
this.y = bubblearea * sin(bubbleangle) + 300;
}
}
function preload() {
angleMode(degrees);
data = loadJSON("data1.json");
}
function setup() {
createCanvas(600, 600);
let sum = sum + data.corporations[n].networth;
for (let n = 0; n < 10; n++) {
angles.push(((data.corporations[n].networth)) / sum) * 360;
}
for (let i = 0; i < 7; i++) {
let overlapping = false;
for (let j = 0; j < bubbles.length; j++) {
let bubble2 = bubbles[j];
let d = dist(bubble1.x, bubble1.y, bubble2.x, bubble2.y);
if (d < bubble1.r + bubble2.r) {
overlapping = true;
break;
}
}
if (!overlapping) {
bubbles.push(bubble1);
}
counter++;
if (counter > 100000) {
break;
}
}
}
function draw() {
pieChart(500, angles);
stroke(300);
fill(300, 300, 300);
ellipse(width / 2, 300, 420, 420);
for (let j = 0; j < bubbles.length; j++) {
let bubble1 = bubbles[j];
if (dist(bubble1.x, bubble1.y, mouseX, mouseY) < bubble1.r) {
fill(200, 200, 300);
noStroke();
ellipse(bubble1.x, bubble1.y, bubble1.r * 3.5);
for (let i = 0; i < data.people[bubble1.index].affiliations.length; i++) {
for (let n = 0; n < 10; n++) {
angles.push(data.corporations[n].networth);
}
}
stroke(0);
}
makeThingAtBottom();
} else {
fill(200, 200, 300, 100);
noStroke();
ellipse(bubble1.x, bubble1.y, bubble1.r * 2);
}
}
}
function pieChart(diameter, data) {
var lastAngle = 0;
for (var i = 0; i < data.length; i++) {
var gray = map(i, 0, data.length, 0, 255);
fill(gray);
arc(width / 2, height / 2, diameter, diameter, lastAngle, lastAngle + (angles[i]));
if (ranonce == false) {
let percentage = lastAngle + (1 / 2) * angles[i];
locationx.push(cos(percentage) * 210 + 310);
locationy.push(sin(percentage) * 210 + 310);
}
lastAngle += (angles[i]);
}
ranonce = true;
}
rect(20, 550, 200, 20);
let data;
let angles = [];
let locationx = [];
let locationy = [];
let ranonce = false;
let companyDivs = [];
let individualDivs = [];
let pic;
class PersonBubble {
constructor(networth, index) {
this.r = (networth) * 6;
this.x = bubblearea * cos(bubbleangle) + 300;
this.y = bubblearea * sin(bubbleangle) + 300;
this.index = index;
}
}
function preload() {
angleMode(DEGREES);
data = loadJSON("data1.json");
pic = loadImage("photo-1.jpg");
}
function setup() {
createCanvas(600, 600);
for (let n = 0; n < data.corporations.length; n++) {
sum = sum + data.corporations[n].networth;
}
for (let n = 0; n < data.corporations.length; n++) {
companyDivs[n] = createDiv(data.corporations[n].name);
companyDivs[n].hide();
}
console.log(angles);
for (let i = 0; i < 7; i++) {
let overlapping = false;
individualDivs[i] = createDiv(data.people[i].name);
individualDivs[i].hide();
for (let j = 0; j < bubbles.length; j++) {
let bubble2 = bubbles[j];
let d = dist(bubble1.x, bubble1.y, bubble2.x, bubble2.y);
if (d < bubble1.r + bubble2.r) {
overlapping = true;
break;
}
}
if (!overlapping) {
bubbles.push(bubble1);
}
counter++;
if (counter > 100000) {
break;
}
}
}
function draw() {
pieChart(500, angles);
stroke(300);
fill(300, 300, 300);
ellipse(width / 2, 300, 420, 420);
drawBubbles();
}
function drawBubbles() {
for (let n = 0; n < data.corporations.length; n++) {
companyDivs[n].position(locationx[n], locationy[n]);
companyDivs[n].style("font-size", "18px");
companyDivs[n].style("font-size", "18px");
companyDivs[n].style("color", "#ff0000");
companyDivs[n].hide();
}
for (let j = 0; j < bubbles.length; j++) {
individualDivs[j].hide();
}
for (let j = 0; j < bubbles.length; j++) {
let bubble1 = bubbles[j];
if (dist(bubble1.x, bubble1.y, mouseX, mouseY) < bubble1.r) {
fill(200, 200, 300);
noStroke();
ellipse(bubble1.x, bubble1.y, bubble1.r * 3.5);
for (let i = 0; i < data.people[bubble1.index].affiliations.length; i++) {
for (let n = 0; n < data.corporations.length; n++) {
stroke(0);
line(bubble1.x, bubble1.y, locationx[n], locationy[n]);
companyDivs[n].show();
individualDivs[j].show();
}
}
}
} else {
fill(200, 200, 300, 100);
noStroke();
ellipse(bubble1.x, bubble1.y, bubble1.r * 2);
}
}
}
function pieChart(diameter, data) {
var lastAngle = 0;
let r = 20; let g = 50;
for (var i = 0; i < data.length; i++) {
var gray = map(i, 0 , data.length, 90, 255);
fill(gray, 105-gray,200);
arc(width / 2, height / 2, diameter, diameter, lastAngle, lastAngle + angles[i]);
if (ranonce == false) {
let percentage = lastAngle + (1 / 2) * angles[i];
locationx.push(width/2 + cos(percentage) * (diameter/2 - 40));
locationy.push(height/2 + sin(percentage) * (diameter/2 - 40));
}
lastAngle += angles[i];
}
ranonce = true;
}
let data;
function preload() {
angleMode (degrees);
var a = degrees(PI);
data = loadJSON("data1.json");
img1 = image("photo-1.jpg");
}
var angles = [200, 40, 506, 50, 1];
let k = [];
class PersonBubble {
constructor(net_worth) {
this.r = random(30);
this.x = bubblearea * cos(bubbleangle) + 300;
this.y = bubblearea * sin(bubbleangle) + 300;
}
}
function setup() {
createCanvas(600, 600);
let individuals = [];
for (let d = 0; d< 50; d++) {
individuals.push(data[d].NET_WORTH);
}
for (let i =0; i< 50; i++)  {
let overlapping = false;
let bubble1 = new PersonBubble(data[i].NET_WORTH);
for (let j = 0; j < bubbles.length; j++) {
let bubble2 = bubbles[j];
let d = dist(bubble1.x, bubble1.y, bubble2.x, bubble2.y);
if (d < bubble1.r + bubble2.r) {
overlapping = true;
break;
}
}
if (!overlapping) {
bubbles.push(bubble1);
}
counter++;
if (counter > 100000) {
break;
}
}
}
function draw() {
fill(300, 300, 300);
ellipse(width / 2, 300, 420, 420);
let individuals = data[1].NET_WORTH;
stroke(300);
rect(600, 380, 200, 20);
for (let j = 0; j < bubbles.length; j++) {
let bubble1 = bubbles[j];
if (dist(bubble1.x, bubble1.y, mouseX, mouseY) < bubble1.r) {
fill(200, 200, 300);
noStroke();
ellipse(bubble1.x, bubble1.y, bubble1.r * 3.5);
stroke(0);
line(mouseX, mouseY, 200, 150);
makeThingAtBottom();
} else {
fill(200, 200, 300, 100);
noStroke();
ellipse(bubble1.x, bubble1.y, bubble1.r * 2);
}
}
}
function pieChart(diameter, data) {
var lastAngle = 0;
for (var i = 0; i < data.length; i++) {
var gray = map(i, 0, data.length, 0, 255);
fill(gray);
arc(width / 2, height / 2, diameter, diameter, lastAngle, lastAngle + radians(angles[i]));
lastAngle += radians(angles[i]);
}
}
function makeThingAtBottom() {
rect(20, 550, 200, 20);
}
let song;
let amp;
let volumehistory =[];
function toggleSong() {
if (song.isPlaying()) {
song.pause();
} else {
song.play();
}
}
function preload() {
song = loadSound('ocean (1).mp3');
}
function setup() { 
createCanvas(400, 400);
angleMode(DEGREES);
song.play();
amp = new p5.Amplitude();
}
function draw() { 
background(300, 50, 100);
translate(20, length/(.5) + 200);
var vol = amp.getLevel()
volumehistory.push(vol);
stroke(150, 250, 1);
noFill();
beginShape();
for (var i=0; i < 360; i++) {
var r = map(volumehistory[i], 0, 1, 10, 500);
var x = r *(.2)*cos(i); 
var y = r *3*sin(i);         
vertex(i, y);  
} 
endShape();
beginShape();
for (var j=0; j < 360; j++) {
var r2 = map(volumehistory[j], 0, 1, 10, 400) -5 ;
var x2 = (r2 *(.2)*sin(j)); 
var y2 = r2 *3*cos(j);  
vertex(j, y2); 
}
endShape();
stroke(15, 250, 1);
noFill();
beginShape();
for (var i=0; i < 360; i++) {
var r = map(volumehistory[i], 0, 1/2, 10, 300) ;
var x = r *(.2)*cos(i); 
var y = r *3*sin(i);         
vertex(i, y);  
} 
endShape();
beginShape();
for (var j=0; j < 360; j++) {
var r2 = map(volumehistory[j], 0, 1/2, 10, 300) -5;
var x2 = (r2 *(.2)*sin(j)) +2; 
var y2 = r2 *3*cos(j);  
vertex(j, y2); 
}
endShape();
stroke(15, 250, 10);
noFill();
beginShape();
for (var i=0; i < 360; i++) {
var r = map(volumehistory[i], 0, 1/2, 10, 500);
var x = r *(.2)*cos(i); 
var y = r *3*sin(i);         
vertex(i, y);  
} 
endShape();
beginShape();
for (var j=0; j < 360; j++) {
var r2 = map(volumehistory[j], 0, 1/2, 10, 500) -5;
var x2 = (r2 *(.2)*sin(j)) +2; 
var y2 = r2 *3*cos(j);  
vertex(j, y2); 
}
endShape();
if(volumehistory.length > 360) {
volumehistory.splice(0,1);
}
let data;
function preload() {
data = loadJSON("data1.json"); 
img1 = image("photo-1.jpg");
}
let individuals;
var angles = [200, 40, 506, 50, 1];
let d= [0, 1, 2, 3];
let k = [];
let whitespot = {
x: 250,
y: 250,
}
class PersonBubble {
constructor(networth) {
this.r = random(30);
this.x = bubblearea * cos(bubbleangle) + 300;
this.y = bubblearea * sin(bubbleangle) + 300;
}
}
function setup() { 
createCanvas(400, 400);
for (let d = 0; d< data.length; d++) {
}
} 
function draw() { 
background(220);
let data;
function preload() {
angleMode (degrees);
var a = degrees(PI);
data = loadJSON("data1.json");
img1 = image("photo-1.jpg");
}
var angles = [200, 40, 506, 50, 1];
class PersonBubble {
constructor(net_worth) {
this.r = (networth) * 4;
this.x = bubblearea * cos(bubbleangle) + 300;
this.y = bubblearea * sin(bubbleangle) + 300;
}
}
function setup() {
createCanvas(600, 600);
let individuals = [];
for (let d = 0; d< 50; d++) {
individuals.push(data[d].people.networth);
}
let corporations = [];
for (let i=0; i<50; i++) {
corporations.push(data[d].corporations.networth);
}
for (let i =0; i< 50; i++)  {
let overlapping = false;
let bubble1 = new PersonBubble(data[i].people.networth);
for (let j = 0; j < bubbles.length; j++) {
let bubble2 = bubbles[j];
let d = dist(bubble1.x, bubble1.y, bubble2.x, bubble2.y);
if (d < bubble1.r + bubble2.r) {
overlapping = true;
break;
}
}
if (!overlapping) {
bubbles.push(bubble1);
}
counter++;
if (counter > 100000) {
break;
}
}
}
function draw() {
fill(300, 300, 300);
ellipse(width / 2, 300, 420, 420);
let individuals = data[1].people.networth;
stroke(300);
rect(600, 380, 200, 20);
for (let j = 0; j < bubbles.length; j++) {
let bubble1 = bubbles[j];
if (dist(bubble1.x, bubble1.y, mouseX, mouseY) < bubble1.r) {
fill(200, 200, 300);
noStroke();
ellipse(bubble1.x, bubble1.y, bubble1.r * 3.5);
stroke(0);
line(mouseX, mouseY, 200, 150);
makeThingAtBottom();
} else {
fill(200, 200, 300, 100);
noStroke();
ellipse(bubble1.x, bubble1.y, bubble1.r * 2);
}
}
}
function pieChart(diameter, data) {
var lastAngle = 0;
for (var i = 0; i < data.length; i++) {
var gray = map(i, 0, data.length, 0, 255);
fill(gray);
arc(width / 2, height / 2, diameter, diameter, lastAngle, lastAngle + radians(angles[i]));
lastAngle += radians(angles[i]);
}
}
function makeThingAtBottom() {
rect(20, 550, 200, 20);
}
function preload() {
data = loadJSON("data1.json");
}
var angles = [30, 10, 45, 350, 60, 38, 75, 67];
var whitecircle;
let whitespot = {
x: 250,
y: 250,
}
class PersonBubble {
constructor() {
this.r = random(12, 1);
this.x = bubblearea*cos(bubbleangle) + 300;
this.y = bubblearea*sin(bubbleangle) + 300;
}
}
function setup() {
createCanvas(600, 600);
while (bubbles.length < 1000) {
let overlapping = false;
let bubble1 = new PersonBubble;
for (let j = 0; j < bubbles.length; j++) {
let bubble2 = bubbles[j];
let d = dist(bubble1.x, bubble1.y, bubble2.x, bubble2.y);
if (d < bubble1.r + bubble2.r) {
overlapping = true;
break;
}
}
if (!overlapping) {			
bubbles.push(bubble1);
}
counter++;
if (counter > 100000) {
break;
}
}
}
function draw() { 
for (let j = 0; j < bubbles.length; j++) {
let bubble1 = bubbles[j];
if (dist(bubble1.x, bubble1.y, mouseX, mouseY) < bubble1.r) {
fill(200, 20, 20);
} else {
fill(200, 204, 300, 100);
}
noStroke();
ellipse(bubble1.x, bubble1.y, bubble1.r * 2);
console.log(angles);
}
}
function pieChart(diameter, data) {
var lastAngle = 0;
for (var i = 0; i < data.length; i++) {
var gray = map(i, 0, data.length, 0, 255);
fill(gray);
arc(width / 2, height / 2, diameter, diameter, lastAngle, lastAngle + radians(angles[i]));
lastAngle += radians(angles[i]);  
}
}
function Block() {
this.x = width / 2;
this.y = 300;
this.diameter = 420;
this.display = function() {
fill(300, 300, 300);
ellipse(this.x, this.y, this.diameter, this.diameter);
}
function preload() {
data = loadJSON("data1.json");
}
var angles = [30, 10, 45, 350, 60, 38, 75, 67];
var whitecircle;
let whitespot = {
x: 250,
y: 250,
}
class PersonBubble {
constructor() {
this.r = random(12, 1);
this.x = bubblearea*cos(bubbleangle) + 300;
this.y = bubblearea*sin(bubbleangle) + 300;
}
}
function setup() {
createCanvas(600, 600);
while (bubbles.length < 1000) {
let overlapping = false;
let bubble1 = new PersonBubble;
for (let j = 0; j < bubbles.length; j++) {
let bubble2 = bubbles[j];
let d = dist(bubble1.x, bubble1.y, bubble2.x, bubble2.y);
if (d < bubble1.r + bubble2.r) {
overlapping = true;
break;
}
}
if (!overlapping) {			
bubbles.push(bubble1);
}
counter++;
if (counter > 100000) {
break;
}
}
}
function draw() { 
for (let j = 0; j < bubbles.length; j++) {
let bubble1 = bubbles[j];
if (dist(bubble1.x, bubble1.y, mouseX, mouseY) < bubble1.r) {
fill(200, 20, 20);
} else {
fill(200, 204, 300, 100);
}
noStroke();
ellipse(bubble1.x, bubble1.y, bubble1.r * 2);
}
}
function pieChart(diameter, data) {
var lastAngle = 0;
for (var i = 0; i < data.length; i++) {
var gray = map(i, 0, data.length, 0, 255);
fill(gray);
arc(width / 2, height / 2, diameter, diameter, lastAngle, lastAngle + radians(angles[i]));
lastAngle += radians(angles[i]);  
}
}
function Block() {
this.x = width / 2;
this.y = 300;
this.diameter = 420;
this.display = function() {
fill(300, 300, 300);
ellipse(this.x, this.y, this.diameter, this.diameter);
}
function preload() {
data = loadJSON("data1.json");
}
var angles = [];
var whitecircle;
let whitespot = {
x: 250,
y: 250,
}
class PersonBubble {
constructor() {
this.x = random(100,width-100); 
this.r = random(12, 1);
}
}
function setup() {
createCanvas(600, 600);
anglesSum += data[i]["NET-WORTH"];
console.log(angles);
while (bubbles.length < 1000) {
let overlapping = false;
let bubble1 = new PersonBubble;
for (let j = 0; j < bubbles.length; j++) {
let bubble2 = bubbles[j];
let d = dist(bubble1.x, bubble1.y, bubble2.x, bubble2.y);
if (d < bubble1.r + bubble2.r) {
overlapping = true;
break;
}
}
if (!overlapping) {			
bubbles.push(bubble1);
}
counter++;
if (counter > 100000) {
break;
}
}
}
function draw() { 
for (let j = 0; j < bubbles.length; j++) {
let bubble1 = bubbles[j];
if (dist(bubble1.x, bubble1.y, mouseX, mouseY) < bubble1.r) {
fill(200, 20, 20);
} else {
fill(200, 204, 300, 100);
}
noStroke();
ellipse(bubble1.x, bubble1.y, bubble1.r * 2, bubble1.r * 2);
}
}
function pieChart(diameter, data) {
var lastAngle = 0;
for (var i = 0; i < data.length; i++) {
var gray = map(i, 0, data.length, 0, 255);
fill(gray);
arc(width / 2, height / 2, diameter, diameter, lastAngle, lastAngle + radians(angles[i]));
lastAngle += radians(angles[i]);  
}
}
function Block() {
this.x = width / 2;
this.y = 300;
this.diameter = 420;
this.display = function() {
fill(300, 300, 300);
ellipse(this.x, this.y, this.diameter, this.diameter);
}
}
var whitecircle;
function preload() {
data = loadJSON("data1.json");
}
function setup() {
createCanvas(600, 600);
noStroke();
anglesSum += data[i]["net-worth"]; 
console.log(angles);
}
function draw() {
background(300);
pieChart(500, angles);
}
function pieChart(diameter, data) {
var lastAngle = 0;
for (var i = 0; i < data.length; i++) {
var gray = map(i, 0, data.length, 0, 255);
fill(gray);
arc(width/2, height/2, diameter, diameter, lastAngle, lastAngle+radians(angles[i]));
lastAngle += radians(angles[i]);
}
}
function preload() {
data = loadJSON("data1.json");
}
var angles = [ 3, 10, 45, 350, 60, 38, 75, 67 ];
function setup() {
createCanvas(600, 600);
noStroke();
}
function draw() {
background(300);
pieChart(500, angles);
fill(300, 300, 300);
ellipse (width/2, 300, 420, 420);
}
function pieChart(diameter, data) {
var lastAngle = 0;
for (var i = 0; i < data.length; i++) {
var gray = map(i, 0, data.length, 0, 255);
fill(gray);
arc(width/2, height/2, diameter, diameter, lastAngle, lastAngle+radians(angles[i]));
lastAngle += radians(angles[i]);
}
function preload() {
data = loadJSON("data1.json");
}
var angles = [0, 1, 2, 3, 4, 5];
var whitecircle;
let whitespot = {
x: 250,
y: 250,
}
class PersonBubble {
constructor() {
this.r = random(12, 1);
this.x = bubblearea * cos(bubbleangle) + 300;
this.y = bubblearea * sin(bubbleangle) + 300;
}
}
function setup() {
createCanvas(600, 600);
while (bubbles.length < 1000) {
let overlapping = false;
let bubble1 = new PersonBubble;
for (let j = 0; j < bubbles.length; j++) {
let bubble2 = bubbles[j];
let d = dist(bubble1.x, bubble1.y, bubble2.x, bubble2.y);
if (d < bubble1.r + bubble2.r) {
overlapping = true;
break;
}
}
if (!overlapping) {
bubbles.push(bubble1);
}
counter++;
if (counter > 100000) {
break;
}
}
}
function draw() {
for (let j = 0; j < bubbles.length; j++) {
let bubble1 = bubbles[j];
if (dist(bubble1.x, bubble1.y, mouseX, mouseY) < bubble1.r) {
fill(200, 20, 20);
} else {
fill(200, 204, 300, 100);
}
noStroke();
ellipse(bubble1.x, bubble1.y, bubble1.r * 2);
}
console.log(angles);
}
function pieChart(diameter, data) {
var lastAngle = 0;
for (var i = 0; i < data.length; i++) {
var gray = map(i, 0, data.length, 0, 255);
fill(gray);
arc(width / 2, height / 2, diameter, diameter, lastAngle, lastAngle + radians(angles[i]));
lastAngle += radians(angles[i]);
}
}
function Block() {
this.x = width / 2;
this.y = 300;
this.diameter = 420;
this.display = function() {
fill(300, 300, 300);
ellipse(this.x, this.y, this.diameter, this.diameter);
}
function preload() {
data = loadJSON("data1.json");
}
var angles = [ 30, 10, 45, 350, 60, 38, 75, 67 ];
function setup() {
createCanvas(600, 600);
noStroke();
}
function draw() {
background(300);
pieChart(500, angles);
fill(300, 300, 300);
ellipse (width/2, 300, 420, 420);
}
function pieChart(diameter, data) {
var lastAngle = 0;
for (var i = 0; i < data.length; i++) {
var gray = map(i, 0, data.length, 0, 255);
fill(gray);
arc(width/2, height/2, diameter, diameter, lastAngle, lastAngle+radians(angles[i]));
lastAngle += radians(angles[i]);
}
}var wave;
var reverbbutton;
var reverb;
var button;
var slider;
var playing = false;
var on = false;
function setup() {
createCanvas(100, 100);
wave = new p5.Oscillator();
slider = createSlider(100, 1200, 440);
wave.setType('sine');
wave.start();
wave.freq(100);
wave.amp(0);
button = createButton('play/pause');
button.mousePressed(toggle);
reverbbutton = createButton("reverb");
reverbbutton.mousePressed(toggle2);
}
function draw() {
wave.freq(slider.value());
if (playing) {
background(255, 0, 255);
} else {
background(51);
}
}
function toggle() {
if (!playing) {
wave.amp(0.5, 1);
playing = true;
} else {
wave.amp(0, 1);
playing = false;
}
}
function toggle2() {
if(!on) {
reverb = new p5.Reverb();
reverbbutton.html("off");
}
else {
reverb.stop(wave, 0, 0);
reverbbutton.html("reverb");
}
}
var video;
var vScale = 10;
let px; 
let py;
let particle; 
function setup() {
createCanvas(400, 400);
pixelDensity(2);
video = createCapture(VIDEO);
video.size (width/vScale, height/vScale);
particle = new Particle(320, 240);
}
function draw() {
background(200, 200, 200);
video.loadPixels();
particle.update();
particle.show();
}
function Particle(x, y) {
this.x = x; 
this.y = y;
this.update = function() {
this.x += random(-1, 1);
this.y += random(-1, 1);
}
this.show = function() {
noStroke();
var px = this.x/ vScale;
var py = this.y / vScale;
var col = video.get(this.px, this.py);
console.log(col);
fill(244, 150);
ellpise(this.x, this.y, 24, 24);
}
}var song;
var button;
var reverbbutton;
var reverb;
var on = false;
function setup() {
noCanvas();
button = createButton("play");
song = loadSound("beat.mp3", loaded);
button.mousePressed(togglePlaying);
background(51);
reverbbutton = createButton("reverb");
reverbbutton.mousePressed(toggle);
}
function togglePlaying() {
if (!song.isPlaying()) {
song.play();
button.html("pause");
} else {
song.stop();
button.html("play");
}
}
function loaded() {
console.log("loaded");
}
function toggle() {
if(!on) {
reverb = new p5.Reverb();
reverbbutton.html("off");
}
else {
reverb.stop(song, 0, 0);
reverbbutton.html("reverb");
}
}var mic;
let volArray = [];
let avg = 0;
function setup() {
createCanvas(600, 600);
video = createVideo('hope-movie.mov');
video.play();
video.hide();
}
function draw() {
background(255);
image(video, 0, 0, width, height);
}
function mousePressed() {
}var mic;
let volArray = [];
let avg = 0;
function setup() {
createCanvas(600, 600);
mic = new p5.AudioIn();
mic.start();
}
function draw() {
background(255);
var vol = mic.getLevel();
volArray.push(vol);
if (volArray.length > 100) {
avg = 0;
for (let x = 0; x < volArray.length; x++) {
avg += volArray[x];
}
avg *= (1 / volArray.length);
console.log("avg: " + avg);
volArray.pop();
}
avg = map(avg, 0.001, 0.005, 255, 0);
console.log("avg mapped: " + avg);
stroke(255);
fill(0, 0, 0, avg);
rect(0, 0, 600, 600);
const PATH = 'mari_pr_pics', FILE = 'img_8733', EXT = '.jpg';
const IMAGES = 4, imgs = Array(IMAGES);
var idx = 0;
var data;
var time = 0;
var elem;
function preload() {
data = loadJSON('newdebt.json'); {
for (var idx = 0; idx < 8; idx++) 
imgs[idx] = loadImage(PATH + FILE + EXT));
}
}
function setup() {
createCanvas(600, 600);
noLoop();
elem = createDiv();
elem.position(40, 230);
elem.style('font-family', 'Avenir');
elem.style('font-size', '8px');
}
function mousePressed() {
time++;
}
if (inData) {
var trimmed = trim(inData);
var num = int(trimmed);
time = floor(map(num, 0, 1023, 0, 8));
}
}
}
function draw() {
background(imgs[idx]);
var net_change = data.debt[time].net_change;
var debt_change = data.debt[time].debt_change;
var rad1 = sqrt(debt_change * 1500 / PI);
var rad2 = sqrt(net_change * 1500 / PI);
fill(20, 60, 80);
ellipse(width / 2, height / 3, rad1 * 2);
fill(20, 0, 80);
ellipse(width / 10, height / 3, rad2 * 2);
elem.html("<h1>" + data.debt[time].month + "</h1>");
}
var data;
var time = 0;
var elem;
var elem2;
var elem3;
var  elem4;
var  elem5;
function preload() {
data = loadJSON('newdebt.json');
}
function setup() {
createCanvas(1000, 700);
bg = loadImage("assets/mari.jpg");
elem4 = createDiv();
elem4.position(130, 20);
elem4.style('font-family', 'Avenir');
elem4.style('font-size', '16px');
elem4.style('color', 'white');
elem5 = createDiv();
elem5.position(190, 60);
elem5.style('font-family', 'Avenir');
elem5.style('font-size', '16px');
elem5.style('color', 'white');
elem7 = createDiv();
elem7.position(532, 455);
elem7.style('font-family', 'Avenir');
elem7.style('font-size', '10px');
elem7.style('color', 'white');
elem8 = createDiv();
elem8.position(300, 400);
elem8.style('font-family', 'Avenir');
elem8.style('font-size', '10px');
elem8.style('color', 'white');
elem6 = createDiv();
elem6.position(320, 100);
elem6.style('font-family', 'Avenir');
elem6.style('font-size', '14px');
elem6.style('color', 'white');
elem = createDiv();
elem.position(40, 530);
elem.style('font-family', 'Avenir');
elem.style('font-size', '12px');
elem.style('color', 'white');
elem2 = createDiv();
elem2.position(620, 440);
elem2.style('font-family', 'Avenir');
elem2.style('font-size', '12px');
elem2.style('color', 'white');
elem3 = createDiv();
elem3.position(440, 380);
elem3.style('font-family', 'Avenir');
elem3.style('font-size', '12px');
elem3.style('color', 'white');
}
function mousePressed() {
time++;
}
if (inData) {
var trimmed = trim(inData);
var num = int(trimmed);
time = floor(map(num, 0, 1023, 8, 0));
}
}
}
function draw() {
background(bg);
var net_change = data.debt[time].net_change;
var debt_change = data.debt[time].debt_change;
var rad1 = sqrt(debt_change * 1500 / PI);
var rad2 = sqrt(net_change * 1500 / PI);
fill(140, 214, 255);
ellipse(width / 1.5, 400, rad1 * 5);
fill(255, 206, 213);
ellipse(width / 2, 400, rad2 * 5);
elem.html("<h1>" + data.debt[time].month + "</h1>");
elem2.html("<h2>" + data.debt[time].debt_change + "</h2>");
elem3.html("<h2>" + data.debt[time].net_change + "</h2>")
elem4.html("<h1>" + data.description + "</h1>");
elem5.html("<h1>" + data.description2 + "</h1>");
elem6.html("<h1>" + data.unit + "</h1>");
elem7.html("<h1>" + data.m2 + "</h1>");
elem8.html("<h1>" + data.m1 + "</h1>");
}
var data;
var time = 0;
var elem;
function preload() {
data = loadJSON('newdebt.json');
}
function setup() {
createCanvas(600, 600);
elem = createDiv();
}
function mousePressed() {
changeTime();
}
function draw() {
background(200);
var net_change = data.debt[time].net_change;
var debt_change = data.debt[time].debt_change;
var rad1 = sqrt(debt_change * 1500 / PI);
var rad2 = sqrt(net_change * 1500 / PI);
fill(20, 60, 80);
ellipse(width / 2, height / 3, rad1 * 2);
fill(20, 0, 80);
ellipse(width / 10, height / 3, rad2 * 2);
elem.html("<h1>" + data.debt[time].month + "</h1>");
}
function changeTime() {
time++;
}var data;
var i=0;
var j=0;
function preload() {
data = loadJSON('debt.json');
}
function setup() {
createCanvas(600, 600);
noLoop();
}
function mousePressed() {
redraw();
}
function draw() {
background(200);
var net_worth = data.debt[i].net_worth;
var debt_ammt = data.debt[j].debt_ammt;
var rad1 = sqrt(debt_ammt * 1500 / PI);
var rad2 = sqrt(net_worth * 1500 / PI);
fill(20, 60, 80);
ellipse(width / 2, height / 3, rad1*2);
fill(20, 0, 80);
ellipse(width / 10, height / 3, rad2* 2);
i++;
j++;
}let flower; 
function setup() { 
createCanvas(400, 400);
"
}
function draw() { 
background(220);
}let flower; 
function setup() { 
createCanvas(400, 400);
"
}
function draw() { 
background(220);
}let flower; 
function setup() { 
createCanvas(400, 400);
"
}
function draw() { 
background(220);
}let flower; 
function setup() { 
createCanvas(400, 400);
"
}
function draw() { 
background(220);
}var rSlider, gSlider, bSlider;
var h1; 
function setup() {
createCanvas(400, 400);
textSize(15);
noStroke();
rSlider = createSlider(0, 255, 100);
rSlider.position(20, 20);
h1 = createElement ('h1', 'red'); 
h1.style("position", 160, -6);
h1.style("font-size", "25px");
gSlider = createSlider(0, 255, 0);
gSlider.position(20, 50);
h1 = createElement ('h1', 'green');
h1.style("position", 160, 25);
h1.style("font-size", "25px");
bSlider = createSlider(0, 255, 255);
bSlider.position(20, 80);
h1 = createElement ('h1', 'blue');
h1.style("position", 160, 60);
h1.style("font-size", "25px");
}
function draw() {
var r = rSlider.value();
var g = gSlider.value();
var b = bSlider.value();
background(r, g, b);
text(rSlider.x * 2 + rSlider.width, 35);
text(gSlider.x * 2 + gSlider.width, 65);
text(bSlider.x * 2 + bSlider.width, 95);
}
function setup() {
createCanvas(windowWidth, windowHeight);
}
function gotData() {
}
function draw() {
background(255,255,255);
fill(0,0,0);
var mappedVar = map(latestData, 400,950,0,255);
fill(mappedVar , 205, 5);
ellipse(200, 200, 350, 350);
text(latestData, 10, 10);
var d = 150;
function setup() { 
createCanvas(500, 500);
}
function draw() { 
background(0, 60, 100);
push();
translate(0, d);
translate(165, 0);
drawWing();
translate(width-350,0);
scale(-1, 1);
drawWing();
pop();
}
if (inData.length > 0){
d = int(inData);
}
}
}
function drawWing() {
arc(150, 105, 200, 10, 5, PI/2); 
arc(200, 100, 200, 5, 5, PI/1); 
arc(140, 115, 200, 10, 5, PI/2); 
arc(190, 110, 160, 5, 5, PI/1); 
arc(130, 125, 200, 10, 5, PI/2); 
arc(180, 120, 150, 5, 5, PI/1); 
arc(120, 135, 200, 10, 5, PI/2); 
arc(170, 130, 140, 5, 5, PI/1); 
arc(110, 145, 200, 10, 5, PI/2); 
arc(160, 140, 120, 5, 5, PI/1); 
arc(100, 155, 200, 10, 5, PI/2); 
arc(150, 150, 100, 5, 5, PI/1); 
arc(100, 165, 160, 10, 5, PI/2); 
arc(140, 160, 80, 5, 5, PI/1); 
arc(100, 170,50, 50, 1, PI/1.8);
fill(200, 70, 20);
arc(100, 160,50, 50, 1, PI/1.8);
fill(200, 70, 20);
arc(100, 150,50, 50, 1, PI/1.8);
arc(100, 100, 80, 200, 0, PI/2);
fill(200, 20, 20);
}let portName = '/dev/cu.UEBoom-LWACP';
let bg = 0; 
let col = 255; 
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
bacgrkgound(bg); 
nostroke(); 
fill(col);
ellipse(200, 200, 100);
}
function parseData() {
if (inData.length > 0){
var values =inData.split(',');
}
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
arc(150, 105, 200, 10, 5, PI/2); 
arc(200, 100, 200, 5, 5, PI/1); 
arc(140, 115, 200, 10, 5, PI/2); 
arc(190, 110, 160, 5, 5, PI/1); 
arc(130, 125, 200, 10, 5, PI/2); 
arc(180, 120, 150, 5, 5, PI/1); 
arc(120, 135, 200, 10, 5, PI/2); 
arc(170, 130, 140, 5, 5, PI/1); 
arc(110, 145, 200, 10, 5, PI/2); 
arc(160, 140, 120, 5, 5, PI/1); 
arc(100, 155, 200, 10, 5, PI/2); 
arc(150, 150, 100, 5, 5, PI/1); 
arc(100, 165, 160, 10, 5, PI/2); 
arc(140, 160, 80, 5, 5, PI/1); 
arc(100, 170,50, 50, 1, PI/1.8);
fill(200, 70, 20);
arc(100, 160,50, 50, 1, PI/1.8);
fill(200, 70, 20);
arc(100, 150,50, 50, 1, PI/1.8);
arc(100, 100, 80, 200, 0, PI/2);
fill(200, 20, 20);
}
function setup() { 
createCanvas(400, 400);
angleMode(DEGREES);
}
function draw() { 
background(220);
bCircle.mainLogic();
}
constructor() {
this.x = 200;
this.y = 200;
this.speed = 10;
this.direction = random(0, 360);
this.isMoving = false;
this.stillOnScreen = true;
this.mouseTouching = false;
}
display () {
ellipse(200, 200, 100);
}
check() {
this.stillOnScreen = (this.x < width) &&
(this.y < height) &&
(this.x > 0) &&
(this.y > 0);
}
mouseInCircle() {
var dist = sqrt(pow(abs(200 - mouseX), 2) + pow(abs(200 - mouseY), 2));
this.mouseTouching = dist < 50;
}
updatePosition() {
this.y = this.y + sin(this.direction)*this.speed;
this.x = this.x + cos(this.direction)*this.speed;
}
mainLogic() {
bCircle.check();
if(bCircle.stillOnScreen) {
}
this.x = 200;
this.y = 200;  
this.speed = 10;
this.direction = random(0, 360);
this.isMoving = false;
this.stillOnScreen = true;
this.mouseTouching = false;
}
bCircle.updatePosition();
}
bCircle.mouseInCircle();
bCircle.isMoving = true;
}
else {
}
}
}
move() {
push();
var off_x = this.x - 200;
var off_y = this.y - 200;
translate(off_x, off_y);
this.display();
pop();
}
}let ball;
function setup() {
createCanvas(600, 400);
ball = new Ball(200, 300);
}
function draw() {
ball.show();
background();
}
class Ball {
constructor(cd, cy) {
this.x = cd;
this.y = cy;
}
show() {
stroke(255);
fill(random(255), random(243), random(21), 70);
ellipse(this.x, this.y, 25, 25);
}
}let Ball; 
function setup() {
createCanvas(600, 400);
\
}
function draw() {
background(0);
}
class Ball() {
constructor() {
this.x = 300; 
this.y =0;
}
}
changeradius();{
Ball.y = bubble.x +1;  
}
show (); {
fill(random(255), random(243), random(21), 70);
ellipse (ball.x, ball.y, mouseX, mouseY);
}
function setup() {
createCanvas(600, 400);
}
function draw() {
background(0);
stroke(66);
strokeWeight(2);
ball();
rain();
function ball() {
if (cd => 300, cd + 5) {
fill(random(255), random(243), random(21), 70);
ellipse(cd, cy, mouseX, mouseY);
}
}
function rain() {
for (var z = 0; z <= width; z += 10) {
fill(random(0), random(100), random(255), 10);
ellipse(random(z), random(f), fd, mouseY);
}
}
function setup() {
createCanvas(600, 400);
Ball1 = new Ball1();
}
function draw() {
background(0);
}
class Ball1() {
constructor() {
this.cd = 300; 
this.c3 = 20;
}
}
function setup() {
createCanvas(windowWidth, windowHeight);
}
function gotData() {
}
function draw() {
background(255,255,255);
fill(0,0,0);
var mappedVar = map(latestData, 400,950,0,255);
fill(mappedVar , 205, 5);
ellipse(200, 200, 350, 350);
text(latestData, 10, 10);
function setup() {
createCanvas(windowWidth, windowHeight);
}
function gotData() {
}
function draw() {
background(255,255,255);
fill(0,0,0);
var mappedVar = map(latestData, 400,950,0,width);
ellipse(mappedVar, 100, 50, 50);
text(latestData, 10, 10);
}var myButton; 
function setup () {
createCanvas (400, 500);
myButton =createButton("press to win");
myButton.mouseClicked(theyClicked);
myButton.style("name", " =createButton("press to win");
}
function draw () {
}
function theyClicked () {
background(random(255), random(255), random(255));
}let allRays = [];
let angle = 0;
let directionx = [];
let directiony = []
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
}var dots = [];
let angle = 0;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
for (var i = 0; i < dots.length; i++) {
dots[i].show(Circle)
}
for (var k = 0; k < allRays.length; k++) {
allRays[k].move();
allRays[k].check();
allRays[k].show();
}
translate(width / 2, height / 2);
rotate(angle);
ellipse(0, 0, 40, 20);
}
if (mouseIsPressed) {
dots.push(new Circle(mouseX, mouseY));
}\
}
class Circle {
constructor(x, y) {
this.x = x;
this.y = y;
}
show() {
fill(5, 6, 169);
ellipse(this.x, this.y, 50, 50);
}
function setup() {
createCanvas(400, 400);
circle = new movedcircle();
}
function draw() {
background(50, 89, 100);
circle.move();
circle.display();
circle.mousePressed();
}
class movedcircle {
constructor() {
this.x = 25;
this.y = 25;
this.diameter = random(10, 30);
this.speed = 10;
}
move () {
this.x += random(this.speed);
this.y += random(this.speed);
}
display () {
ellipse(this.x, this.y, this.diameter, this.diameter);
}
mousePressed () {
let d = dist(mouseX, mouseY, this.x, this.y);
if (d <50) {
}
}
function setup() {
createCanvas(400, 400);
circle = new movedcircle();
}
function draw() {
background(50, 89, 100);
circle.move();
}
function movedcircle() {
this.x = 25;
this.y = 25;
this.diameter = random(1, 3);
this.speed = 60;
function mousePressed() {
for (let i = 0; i < width; i++) {
/ circle[i].mousePressed();
}
}
this.move = function() {
this.x += random(this.speed);
this.y += random(this.speed);
};
this.display = function() {
ellipse(this.x, this.y, this.diameter, this.diameter);
}
mousePressed(); {
let d = dist(mouseX, mouseY, this.x, this.y);
if (d < 15) {
}
}
function setup() {
createCanvas(400, 400);
circle = new movedcircle();
}
function draw() {
background(50, 89, 100);
circle.move();
}
function movedcircle() {
this.x = 25;
this.y = 25;
this.diameter = random(1, 3);
this.speed = 60;
function mousePressed() {
for (let i = 0; i < width; i++) {
/ circle[i].mousePressed();
}
}
this.move = function() {
this.x += random(this.speed);
this.y += random(this.speed);
};
this.display = function() {
ellipse(this.x, this.y, this.diameter, this.diameter);
}
mousePressed(); {
let d = dist(mouseX, mouseY, this.x, this.y);
if (d < 15) {
}
}
function setup() {
createCanvas(400, 400);
circle = new movedcircle();
}
function draw() {
background(50, 89, 100);
circle.move();
}
function movedcircle() {
this.x = 25;
this.y = 25;
this.diameter = random(1, 3);
this.speed = 60;
function mousePressed() {
for (let i = 0; i < width; i++) {
/ circle[i].mousePressed();
}
}
this.move = function() {
this.x += random(this.speed);
this.y += random(this.speed);
};
this.display = function() {
ellipse(this.x, this.y, this.diameter, this.diameter);
}
mousePressed(); {
let d = dist(mouseX, mouseY, this.x, this.y);
if (d < 15) {
}
}
function setup() {
createCanvas(400, 400);
circle = new movedcircle();
}
function draw() {
background(50, 89, 100);
circle.move();
}
function movedcircle() {
this.x = 25;
this.y = 25;
this.diameter = random(1, 3);
this.speed = 60;
function mousePressed() {
for (let i = 0; i < width; i++) {
/ circle[i].mousePressed();
}
}
this.move = function() {
this.x += random(this.speed);
this.y += random(this.speed);
};
this.display = function() {
ellipse(this.x, this.y, this.diameter, this.diameter);
}
mousePressed(); {
let d = dist(mouseX, mouseY, this.x, this.y);
if (d < 15) {
}
}
}let pettle = [];
function setup() {
createCanvas(400, 400);
for (let i = 0; i < 10; i++) {
pettle[i] = new pettle();
}
}
function draw() {
background(255, 25, 16);
for (let i = 0; i < pettle.size; i++) {
pettle[i].show();
}
}
class pettle {
constructor() {
this.x = 
fill(25, 25, 25)'random(0, width);
this.y = random(0, height);
this.r = 30;
this.col = (200);
this.on = false;
}
show() {
noStroke();
fill(this.col);
ellipse(this.x, this.y, this.r, this.r);
}
move() {
if (this.on) {
this.x = this.x + random(-1, 1);
this.y = this.y + random(-1, 1);
this.col = color(200, 100, 50, 200);
}else{
this.col = (200);
}
}
mouseClicked() {
let d = dist(mouseX, mouseY, this.x, this.y);
if (d < 15) {
this.on = !this.on;
}
}
}let pettle = [];
function setup() {
createCanvas(400, 400);
for (let i = 0; i < 10; i++) {
pettle[i] = new pettle();
}
}
function draw() {
background(255, 25, 16);
for (let i = 0; i < pettle.size; i++) {
pettle[i].show();
}
}
class pettle {
constructor() {
this.x = 
fill(25, 25, 25)'random(0, width);
this.y = random(0, height);
this.r = 30;
this.col = (200);
this.on = false;
}
show() {
noStroke();
fill(this.col);
ellipse(this.x, this.y, this.r, this.r);
}
move() {
if (this.on) {
this.x = this.x + random(-1, 1);
this.y = this.y + random(-1, 1);
this.col = color(200, 100, 50, 200);
}else{
this.col = (200);
}
}
mouseClicked() {
let d = dist(mouseX, mouseY, this.x, this.y);
if (d < 15) {
this.on = !this.on;
}
}
}var dots=[];
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
for (var i=0; i< dots.length; i++){
dots[i].show(Circle)
}
if (mouseIsPressed) {
dots.push(new Circle(mouseX, mouseY));
}
}
class Circle {
constructor(x, y) {
this.x = x;
this.y = y;
}
show() {
fill(5, 6, 169);
ellipse(this.x, this.y, 50, 50);
}
}
function setup() {
createCanvas(600, 400);
}
function balloon() {
for (var x = 75; x <= width; x += 150) {
fill(random(255), random(128), random(255));
ellipse(x, cy, cd, cd);
}
for (var y = 75; y <= width; y += 150) {
rect(y, ry, rw, rh);
}
if (mouseX >= width / 4) {
fill(244, 212, 66);
ellipse(width / 4 - 75, cy, cd, cd);
}
if (mouseX >= width / 2) {
fill(156, 10, 188);
ellipse(width / 2 - 75, cy, cd, cd);
}
if (mouseX >= width / 3) {
fill(9, 140, 29);
ellipse(width / 3 + 175, cy, cd, cd);
if (mouseX >= width) {
fill(9, 140, 219);
ellipse(width - 75, cy, cd, cd);
}
}
}
function draw() {
background(0);
spiral(10, 36, 50, 222, 2)
}
function spiral(size, r, g, b, a) {
for (var i = 0; i <= 150; i++) {
fill(r, g, b, a)
ellipse
(i, i, i * size, i * size);
}
stroke(255);
strokeWeight(5);
balloon();
for (var z = 0; z <= width; z += 10) {
fill(192, 192, 193);
ellipse(random(z), random(f), fd, fd);
}
function setup() {
createCanvas(600, 400);
}
function balloon() {
for (var x = 75; x <= width; x += 150) {
fill(random(255), random(128), random(255));
ellipse(x, cy, cd, cd);
}
for (var y = 75; y <= width; y += 150) {
rect(y, ry, rw, rh);
}
}
function draw() {
background(0);
spiral(10, 36, 50, 222, 2)
}
function spiral(size, r, g, b, a) {
for (var i = 0; i <= 150; i++) {
fill(r, g, b, a)
ellipse
(i, i, i * size, i * size);
}
stroke(255);
strokeWeight(5);
balloon();
for (var z = 0; z <= width; z += 10) {
fill(192, 192, 193);
ellipse(random(z), random(f), fd, fd);
if (mouseX >= width / 4) {
fill(244, 212, 66);
ellipse(width / 4 - 75, cy, cd, cd);
}
if (mouseX >= width / 2) {
fill(156, 10, 188);
ellipse(width / 2 - 75, cy, cd, cd);
}
if (mouseX >= width / 3) {
fill(9, 140, 29);
ellipse(width / 3 + 175, cy, cd, cd);
if (mouseX >= width) {
fill(9, 140, 219);
ellipse(width - 75, cy, cd, cd);
}
}
}
}function setup() { 
createCanvas(600, 600, WEBGL);
} 
function draw(){
background(140,60,85);
rotateX(frameCount * 0.01);
rotateY(frameCount * 0.03);
fill(90, 90, 130);
box(200, 200, 200);
}
function (cubeA)
if (mouseHover cubeA) {then
var xStart = 0;
var direction = 5
function setup() {
createCanvas(400, 400);
}
function draw() {
background(250, 205, 200);
spiral(3, 222, 20, 56, 255);
spiral(5, 36, 50, 222, 2);
xStart++;
if(xStart > width/2) {
xStart = 100;
direction = -direction;
}
}
function spiral(size, r, g, b, a) {
for (var i = 0; i <= 150; i++) {
fill(r, g, b, a)
ellipse(xStart+ i * 4*direction, i * 5, i * size, i * size);
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(250, 205, 200);
spiral(3, 222, 20, 56, 255);
spiral(5, 36, 50, 222, 2)
}
function spiral(size, r, g, b, a) {
for (var i = 0; i <= 150; i++) {
fill(r, g, b, a)
ellipse(i * 4, i * 5, i * size, i * size);
}
}var rot = 0;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(20, 96, 184);
spherer(10,width/2,height/2);
/
}
function spherer(size,xr, yr) {
for (var i = 1; i < 25; i++) {
noFill;
ellipse (200, 185, 240, 10);
noFill(250, 50, 06);
ellipse (200, 235, 225, 10);
noFill();
stroke(255);
ellipse(xr, yr, i * size, 200);
}
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(20, 96, 184,67);
for (var i=0; i>100; i<=160; i++);
noFill;
ellipse (200, 200, i, 150);
/
noFill;
ellipse (200, 200, 1, 150);
noFill;
ellipse (200, 185, 149, 3);
noFill(250, 50, 06);
ellipse (200, 225, 142, 3);
}
var xStart = 0;
var direction = 5
function setup() {
createCanvas(400, 400);
}
function draw() {
background(250, 205, 200);
spiral(3, 222, 20, 56, 255);
spiral(5, 36, 50, 222, 2);
xStart++;
if(xStart > width/2) {
xStart = 100;
direction = -direction;
}
}
function spiral(size, r, g, b, a) {
for (var i = 0; i <= 150; i++) {
fill(r, g, b, a)
ellipse(xStart+ i * 4*direction, i * 5, i * size, i * size);
}
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220, 50, 80);
for (var x = 60; x<=4000; x = x+6)
line (0, 800, x, 65);
for (var y = 60; y<=2000; y = y+10)
line (0, y, 500, 65);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(250, 205, 250);
stroke (255);
for (var x = 0; x<=100; x++) {
noFill()
ellipse (x*4, 0+(x*5), x*5, x*5);
}
}var sun = 20; 
var boat = {
post: 20,
bottom: 20
};
var flag = {
p1: 100,
p2: 150,
p3: 100,
};
var ocean = {
wave: 400,
r: 86,
g: 204,
b: 190
};
function setup() {
createCanvas(400, 400);
}
function draw() {
background(201, 234, 237);
fill(252, 180, 126)
ellipse(sun, 25, 50, 50);
sun = sun +.3;
fill(232, 192, 180);
ellipse(mouseX, 150, 76, 90);
fill(232, 192, 180);
rect(mouseX, 24, 1, 80);
fill(232, 192, 180);
triangle(mouseX, 90, mouseX+80, 90, mouseX, 25);
fill(66, ocean.g, ocean.b);
arc(10, 160, 70, 80, 0, PI + QUARTER_PI, CHORD);
arc(80, 160, 70, 80, 0, PI + QUARTER_PI, CHORD);
arc(150, 160, 70, 80, 0, PI + QUARTER_PI, CHORD);
arc(220, 160, 70, 80, 0, PI + QUARTER_PI, CHORD);
arc(290, 160, 70, 80, 0, PI + QUARTER_PI, CHORD);
arc(360, 160, 70, 80, 0, PI + QUARTER_PI, CHORD);
fill(66, ocean.g, ocean.b);
ocean.r = ocean.r - .4;
ocean.g = ocean.g - .4;
ocean.b = ocean.b + .5;
rect(-1, 160, 401, 300);
}function setup() { 
createCanvas(400, 400);
background(191, 247, 223);
}
function draw() {
fill(255, 255, 230);
line(179, 65, 205, 15);
fill(150, 150, 230);
rect(191, 165, 50, 25);
fill(150, 150, 230);
rect(60, 165, 50, 25);
fill(255, 0, 0);
ellipse(150, 200, 90, 190);
fill(25, 20, 50);
triangle(100, 104, 155, 30, 205, 104);
fill(255, 255, 230);
ellipse(143, 70, 15, 15);
fill(255, 255, 230);
ellipse(168, 70, 15, 15);
fill(255, 255, 230);
line(130, 75, 80, 15);
fill(150, 230, 230);
ellipse(55, 178, 30, 30);
fill(150, 230, 230);
ellipse(250, 178, 30, 30);
fill(150, 230, 230);
ellipse(120, 295, 30, 30);
fill(150, 230, 230);
ellipse(180, 295, 30, 30);
}