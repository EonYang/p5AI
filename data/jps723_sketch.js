let outputP;
function setup() { 
noCanvas();
background(255);
textAlign(LEFT, TOP);
textSize(24);
outputP = createP("Click to generate");
} 
function draw() { 
}
function keyPressed() {
mousePressed();
}
function mousePressed() {
var grammar = tracery.createGrammar(grammarSource);
grammar.addModifiers(tracery.baseEngModifiers);
var output = grammar.flatten("#origin#");
outputP.html(output);
}
var grammarSource = {
"origin": [
"#malenoun.capitalize#, at the #agetype# age of #age#, #adjectiveleaving# about the impending changes in his life, decided to #leavingpast# to his #hisadjective# #nounplace#. This wasn't like him.  He'd rather be at home with his #artwork.s# than #timesuck# his #valuable# time with #otherpeople#;  Today felt #feeling#. Upon #leavingpast#ing, he couldn't quite put his #bodypart# on it, but something was #eeryadjective# in the air.  It was as if the #naturenoun.s# were #eeryverb#ing at his #followbodypart#, #askverb#ing for a subtle #glancenoun#.  #nonsequitur.capitalize#, #femalenoun.capitalize#, a recent transplant from #usstate#, felt a similar #eeryverb#ing at her #followbodypart#. #age.capitalize# long years in her homestate, and nothing but a #adjectiveleaving# feeling at her core to remember it by. More #speedwalk#ly she #walktype#.  She didn't have many friends, but her #valuable# #artwork.s# held her truth. Today felt #feeling#. #nonsequitur.capitalize#, a man in the distance, rose from the #streettype# ahead. Probably a #usstate# local.  Everyone else was.  Her eyes to the #naturenoun.s# above, she #walktype#. Nevertheless, a swift approach, and soon awkward conversation ensued, right there on the #streettype# of the early morning.  Both determined to #exitverb#, they simply could not.  For once, each recognizing a #persontype# person to #timesuck# time with.  Today felt #feeling#. Over the next years their bond over #artwork.s# and #artwork.s# and even #artwork.s# grew.  New jobs took them to #usstate#, #usstate#, and #usstate#, but not before a quick detour to #usstate#.  #age.capitalize# years passed, and so did their youth.  The #artwork.s# fading alongside.  Conversation less #valuable#.  Today, today felt #feeling#.  And as they approached the #streettype# to their future, 'I am so #adjective#...' he said, 'but does that #command# that you are #mood#? she asked.  They laughed.  'What a way to #timesuck# time'."
],
"bodypart": [
"finger"
],
"agetype": [
"oppressive", 
"tender", 
"careful", 
"carefree", 
"cautious", 
"ripe"
],
"streettype": [
"sidewalk", 
"pavement", 
"grasses", 
"horizon",
"curviture", 
"path"
],
"exitverb": [
"exit", 
"escape", 
"get away"
],
"persontype": [
"clever", 
"smart", 
"compatible" 
],
"timesuck": [
"waste", 
"kill", 
"spend", 
"misuse", 
"lose",
"misplace",
"abandon", 
"disrespect",
"misdirect"
],
"feeling": [
"different", 
"hopeful", 
"contrasting",
"disparate", 
"peculiar"
],
"valuable": [
"valuable", 
"precious", 
"adored",
"beloved",
"cherished"
],
"otherpeople": [
"strangers", 
"others", 
"outsiders"
],
"askverb": [
"ask",
"yearn",
"pray",
"beseech",
"petition", 
"canvass", 
"call"
],  
"speedwalk": [
"quick", 
"brisk", 
"commanding", 
"faint", 
"delicate", 
"cautioning", 
"light"
],
"walktype": [
"tread", 
"walked",
"ran", 
"ventured on", 
"traveled forth"
],
"artwork": [
"sculpture", 
"painting",
"photo", 
"sketch", 
"animation",
"film",
"song"
],
"age": [
"eighteen", 
"nineteen",
"twenty", 
"twenty one",
"twenty two", 
"twenty three",
"twenty four",
"twenty five",
"twenty six",
"twenty seven",
"twenty eight",
"twenty nine",
"thirty", 
"thirty one", 
"thirty two",
"thirty three",
"thirty one",
"thirty four",
"thirty five",
"thirty six",
"thirty seven",
"thirty eight",
"thirty nine",
"forty", 
"forty one" 
],
"usstate": [
"Alabama", 
"Alaska", 
"American Samoa", 
"Arizona", 
"Arkansas", 
"California", 
"Colorado", 
"Connecticut", 
"Delaware", 
"The District Of Columbia", 
"The Federated States Of Micronesia", 
"Florida", 
"Georgia", 
"Guam", 
"Hawaii", 
"Idaho", 
"Illinois", 
"Indiana", 
"Iowa", 
"Kansas", 
"Kentucky", 
"Louisiana", 
"Maine", 
"The Marshall Islands", 
"Maryland", 
"Massachusetts", 
"Michigan", 
"Minnesota", 
"Mississippi", 
"Missouri", 
"Montana", 
"Nebraska", 
"Nevada", 
"New Hampshire", 
"New Jersey", 
"New Mexico", 
"New York", 
"North Carolina", 
"North Dakota", 
"Northern Mariana Islands", 
"Ohio", 
"Oklahoma", 
"Oregon", 
"Palau", 
"Pennsylvania", 
"Puerto Rico", 
"Rhode Island", 
"South Carolina", 
"South Dakota", 
"Tennessee", 
"Texas", 
"Utah", 
"Vermont", 
"The U.S. Virgin Islands", 
"Virginia", 
"Washington", 
"West Virginia", 
"Wisconsin", 
"Wyoming"
],
"nonsequitur": [
"just then",
"meanwhile",
"concurrently",
"in the meantime",
"suddenly",
"in that same moment", 
"precisely then"
],
"glancenoun": [
"glance",
"look",
"acknowledgement",
"reference",
"gesture",
"validation"
],
"followbodypart": [
"back",
"heels",
"side",
"ear",
"coattail"
],
"eeryadjective": [
"awry",
"not right", 
"aloof", 
"present"
],
"eeryverb": [
"skulk",
"whisper", 
"lurk", 
"follow",
"nipp"
],
"malenoun": [
"john",
"peter",
"carl",
"steven",
"jerry",
"patrick",
"harold", 
"arnold", 
"bartholomew", 
"willy", 
"edgar", 
"richard", 
"lawrence", 
"justin", 
"gregory", 
"vincent", 
"bernard", 
"michael"
],
"femalenoun": [
"gertrude",
"kerry",
"jessica",
"kathleen",
"annamarie",
"beth",
"laurie",
"laurel", 
"deb",
"darlene",
"rhoda",
"susan", 
"trish", 
"corrine", 
"bella", 
"jackeline"
],
"leavingpast": [
"leave",
"bolt",
"run",
"depart",
"rouse"
],
"people": [
"i am",
"he is",
"she is",
"we are",
"they are",
"you are"
],
"adjectiveleaving": [
"restless",
"anxious",
"fidgety",
"troubled",
"hungry"
],
"adjective": [
"sleepy",
"with me",
"busy",
"interested",
"hungry",
"human"
],
"mood": [
"awake",
"not alone",
"not lazy",
"interesting",
"not full"
],
"hisadjective": [
"favorite",
"local",
"least favorite",
"preferred",
"exclusive"
],
"nounplace": [
"ocean",
"park",
"lake",
"store",
"market",
"museum",
"gallery",
"cafe",
"restaurant"
],
"naturenoun": [
"cloud",
"animal",
"plant",
"tree",
"wind",
"planet"
],
"command": [
"imply",
"convey",
"require",
"describe",
"mean",
"justify",
"command",
"signify",
"void",
"compel"
]
};var audiograb;
function setup(){
audioGrab = new p5.AudioIn();
audioGrab.getSources(function(deviceList) {
console.log(deviceList);
audioGrab.setSource(0);
console.log(deviceList.length)
});
let debug = false;
let img;
let flowfield = new FlowField(res);
let vehicles = [];
function setup() {
createCanvas(1334, 988);
img = loadImage("river.png");
flowfield = new FlowField(16);
vehicles.push(new Vehicle(createVector(random(width), height), 5, 1));
}
function draw() {
background(255);
image(img, 0, 0);
if (debug) flowfield.display();
for (let v = 0; v < vehicles.length; v++) {
    vehicles[v].follow(flowfield);
    vehicles[v].run();
  }
for (let i = vehicles.length-1; i >= 0; i--) {
if (vehicles[i].isDead()) {
vehicles.remove(i);
}
}
fill(0);
text("Hit space bar to toggle debugging lines. Click the mouse to generate a new flow field.", 10, height-20);
if (random(1) < 0.5) {
vehicles.push(new Vehicle(createVector(random(width), height), 5, random(0.5)));
}
}
function keyPressed() {
if (key == ' ') {
debug = !debug;
}
}
function mouseDragged() {
vehicles.push(new Vehicle(createVector(mouseX, mouseY), 5, random(0.5)));
var inc = 0.1;
var scl = 10;
var cols, rows;
var zoff = 0;
var fr;
var particles = [];
var flowfield;
function setup() {
createCanvas(400, 400);
createCapture(VIDEO);
colorMode(HSB, 255);
cols = floor(width / scl);
rows = floor(height / scl);
fr = createP('');
flowfield = new Array(cols * rows);
for (var i = 0; i < 300; i++) {
particles[i] = new Particle();
}
background(51);
}
function draw() {
var yoff = 0;
for (var y = 0; y < rows; y++) {
var xoff = 0;
for (var x = 0; x < cols; x++) {
var index = x + y * cols;
var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
var v = p5.Vector.fromAngle(angle);
v.setMag(1);
flowfield[index] = v;
xoff += inc;
stroke(0, 50);
}
yoff += inc;
zoff += 0.0003;
}
for (var i = 0; i < particles.length; i++) {
particles[i].follow(flowfield);
particles[i].update();
particles[i].edges();
particles[i].show();
}
fr.html(floor(frameRate()));
let world;
let particles = [];
let surface;
function setup() {
createCanvas(640, 360);
world = createWorld();
surface = new Surface();
}
function draw() {
background(51);
let timeStep = 1.0 / 30;
world.Step(timeStep, 10, 10);
if (random(1) < 0.5) {
let sz = random(4, 8);
particles.push(new Particle(width / 2, 10, sz));
}
surface.display();
for (let i = particles.length - 1; i >= 0; i--) {
particles[i].display();
if (particles[i].done()) {
particles.splice(i, 1);
}
}
let mover;
let attractor;
function setup() {
createCanvas(640, 360);
mover = new Mover();
attractor = new Attractor();
}
function draw() {
background(200);
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
An array of double pendulums 'Y' anchor values travel along a sine wave with
varying amplitude
let pendulums = [];
let ampGrowth = 1;
function setup() {
createCanvas(700, 700);
slider = createSlider(0, 100, 200);
slider2 = createSlider(0, 100, 500);
w = width + 16;
dx = (TWO_PI / period) * xspacing;
yvalues = new Array(floor(w / xspacing));
createPendulums();
}
function draw() {
background(0);
calcWave();
renderWave();
let a = slider.value();
amplitude = a;
let p = slider2.value();
period = p;
}
function calcWave() {
theta += 0.02;
var x = theta;
for (let i = 0; i < yvalues.length; i++) {
yvalues[i] = sin(x) * amplitude;
x += dx;
}
}
  
for (let x = 0; x < yvalues.length; x++) {    
pendulums[x].updatePend();    
  
}
}
  
theta += 0.02;
  
var x = theta;  
for (let i = 0; i < yvalues.length; i++) {    
yvalues[i] = sin(x) * amplitude;    
x += dx;
pendulums[i] = new Pendulum(x, yvalues[i]);  
}
let wid = 0;
let pendulums = [];
function setup() {
createCanvas(700, 700);
wid = width/2;
w = width+16;
dx = (TWO_PI / period) * xspacing;
yvalues = new Array(floor(w/xspacing));
createPendulums();
}
function draw() {
background(0);
calcWave();
renderWave();
}
function calcWave() {
theta += 0.02;
var x = theta;
for (let i = 0; i < yvalues.length; i++) {
yvalues[i] = sin(x)*amplitude;
x+=dx;
}
}
function renderWave() {
noStroke();
for (let x = 0; x < yvalues.length; x++) {
for (let y = 0; y < pendulums.length; y++){
pendulums[y].updatePend(); 
pendulums[y].drawPend(); 
}
}
}
function createPendulums(){
  theta += 0.02;
  var x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x)*amplitude;
    x+=dx;
pendulums[i] = new Pendulum(x,yvalues[i]);
  }
}
An array of double pendulums create the illusion of flowing along a sign wave
let wid = 0;
let pendulums = [];
function setup() {
createCanvas(700, 700);
wid = width/2;
w = width+16;
dx = (TWO_PI / period) * xspacing;
yvalues = new Array(floor(w/xspacing));
createPendulums();
}
function draw() {
background(0);
calcWave();
renderWave();
}
function calcWave() {
theta += 0.02;
var x = theta;
for (let i = 0; i < yvalues.length; i++) {
yvalues[i] = sin(x)*amplitude;
x+=dx;
}
}
function renderWave() {
  noStroke();
  
  for (let x = 0; x < yvalues.length; x++) {
   
    
    pendulums[x].updatePend(); 
    pendulums[x].drawPend(x*xspacing, height/2+yvalues[x]); 
    
  }
}
function createPendulums(){
  theta += 0.02;
  var x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x)*amplitude;
    x+=dx;
pendulums[i] = new Pendulum(x,yvalues[i]);
  }
}
****************************************************************
Based on Examples from the Nature of Code 
by Dan Shiffman
Perlin walkers attract a particle system.
*  LFT CLICK ADDS WALKER 
*  'a' KEY ADDS PARTICLE 
*  'r' KEY REMOVES WALKERS
****************************************************************
let walkers = [];
let particles = [];
let noff = 0;
function setup() {
createCanvas(640, 480);
for (let i = 0; i < walkers.length; i++) {
walkers[i] = new Walker();
console.log(frameRate);
}
}
function draw() {
background(0);
if (particles.length > 10) {
particles.splice(0, 1);
}
if (walkers.length > 10) {
walkers.splice(0, 1);
}
if(walkers.length === 0){
particles.length = 0;
}
for (let i = 0; i < walkers.length; i++) {
walkers[i].render();
walkers[i].move();
stroke(0, 255, 0);
for (let j = 0; j < particles.length; j++) {
var particle= particles[j];
for (let k = 0; k < walkers.length; k++) {
particle.attracted(walkers[k].pos);
}
particle.update();
particle.show();
walkers[i].render();
}
}
}
function mousePressed() {
walkers.push(new Walker(mouseX, mouseY));
}
function keyPressed() {
}
function keyTyped() {
if (key === 'r') {
if(walkers.length>=2){
walkers.splice(0, 1);
}
} 
if (key === 'a') {
particles.push(new Particle(mouseX, mouseY));
}
****************************************************************
Based on Examples from the Nature of Code 
by Dan Shiffman
Uses the p5.sound library to play tones from an array across two oscillators 
at every large step via a levy flight model.  
****************************************************************
let walkers = [];
let attractors = [];
let particles = [];
let noff = 0;
let oscMult = 2;
let oscVal = [130.81 * oscMult, 146.83 * oscMult, 155.56 * oscMult, 174.61 * oscMult, 196.00 * oscMult, 207.65 * oscMult, 233.08 * oscMult];
let oscType = ["sine", "triangle"];
function setup() {
createCanvas(640, 480);
osc = new p5.Oscillator();
osc2 = new p5.Oscillator();
filter = new p5.Filter();
env = new p5.Env(0.1, 1.2, 1.2, 0.1);
env.setADSR(5.9, 0.25, 0.1, 0.0);
for (let i = 0; i < walkers.length; i++) {
walkers[i] = new Walker();
}
}
function draw() {
background(0);
particles.push(new Particle(random(width), random(height)));
if (particles.length > 100) {
particles.splice(0, 1);
}
for (let i = 0; i < walkers.length; i++) {
walkers[i].render();
walkers[i].move();
stroke(0, 255, 0);
point(walkers[i].x, walkers[i].y);
for (let j = 0; j < particles.length; j++) {
var particle = particles[j];
for (let k = 0; k < walkers.length; k++) {
particle.attracted(walkers[k].pos);
}
particle.update();
particle.show();
walkers[i].render();
}
}
}
function mousePressed() {
walkers.push(new Walker(this.pos));
osc.start();
osc.freq(random(oscVal));
osc.amp(0.5, 10);
}
function keyPressed() {
walkers.push(new Walker(this.pos));
osc.start();
osc.freq(random(oscVal));
osc.amp(0.5, 10);
****************************************************************
Based on Examples from the Nature of Code 
by Dan Shiffman
Uses the p5.sound library to play tones from an array across two oscillators 
at every large step via a levy flight model.  
****************************************************************
let walkers = [];
let attractors = [];
let particles = [];
let xoff = 0;
let oscMult = 2;
let oscVal = [130.81 * oscMult, 146.83 * oscMult, 155.56 * oscMult, 174.61 * oscMult, 196.00 * oscMult, 207.65 * oscMult, 233.08 * oscMult];
let oscType = ["sine", "triangle"];
function setup() {
createCanvas(640, 480);
osc = new p5.Oscillator();
osc2 = new p5.Oscillator();
filter = new p5.Filter();
env = new p5.Env(0.1, 1.2, 1.2, 0.1);
env.setADSR(5.9, 0.25, 0.1, 0.0);
for (let i = 0; i < walkers.length; i++) {
walkers[i] = new Walker();
}
}
function draw() {
background(0);
particles.push(new Particle(random(width), random(height)));
if (particles.length > 100) {
particles.splice(0, 1);
}
for (let i = 0; i < walkers.length; i++) {
walkers[i].render();
walkers[i].step();
stroke(0, 255, 0);
point(walkers[i].x, walkers[i].y);
for (let j = 0; j < particles.length; j++) {
var particle = particles[j];
for (let k = 0; k < walkers.length; k++) {
particle.attracted(walkers[k].pos);
}
particle.update();
particle.show();
walkers[i].render();
}
}
}
function mousePressed() {
stroke(0, 255, 255);
walkers.push(new Walker(this.pos));
osc.start();
osc.freq(random(oscVal));
osc.amp(0.5, 10);
}
function keyPressed() {
stroke(255, 255, 255);
walkers.push(new Walker(this.pos));
osc.start();
osc.freq(random(oscVal));
osc.amp(0.5, 10);
****************************************************************
Based on Examples from the Nature of Code 
by Dan Shiffman
Uses the p5.sound library to play tones from an array across two oscillators 
at every large step via a levy flight model.  
****************************************************************
let walkers = [];
let attractors = [];
let particles = [];
let xoff = 0;
let oscMult = 2;
let oscVal = [130.81 * oscMult, 146.83 * oscMult, 155.56 * oscMult, 174.61 * oscMult, 196.00 * oscMult, 207.65 * oscMult, 233.08 * oscMult];
let oscType = ["sine", "triangle"];
function setup() {
createCanvas(640, 480);
background(0);
osc = new p5.Oscillator();
osc2 = new p5.Oscillator();
filter = new p5.Filter();
env = new p5.Env(0.1, 1.2, 1.2, 0.1);
env.setADSR(5.9, 0.25, 0.1, 0.0);
for (let i = 0; i < walkers.length; i++) {
walkers[i] = new Walker();
}
}
function draw() {
particles.push(new Particle(random(width), random(height)));
if (particles.length > 100) {
particles.splice(0, 1);
}
for (let i = 0; i < walkers.length; i++) {
walkers[i].render();
walkers[i].step();
point(walkers[i].x, walkers[i].y);
}
for (let j = 0; j < particles.length; j++) {
var particle = particles[j];
for (let j = 0; j < attractors.length; j++) {
particle.attracted(attractors[j]);
}
particle.update();
particle.show();
}
}
function mousePressed() {
stroke(0, 255, 255);
walkers.push(new Walker(this.pos));
osc.start();
osc.freq(random(oscVal));
osc.amp(0.5, 10);
}
function keyPressed() {
stroke(255, 255, 255);
walkers.push(new Walker(this.pos));
osc.start();
osc.freq(random(oscVal));
osc.amp(0.5, 10);
let attractors = [];
let particles = [];
let xoff = 0;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(51);
stroke(255);
strokeWeight(4);
particles.push(new Particle(random(width), random(height)));
if (particles.length > 100) {
particles.splice(0, 1);
}
for (var k = 0; k < attractors.length; k++) {
stroke(0, 255, 0);
point(attractors[k].x, attractors[k].y);
}
for (var i = 0; i < particles.length; i++) {
var particle = particles[i];
for (let j = 0; j < attractors.length; j++) {
particle.attracted(attractors[j]);
}
particle.update();
particle.show();
}
}
function mousePressed() {
attractors.push(createVector(mouseX, mouseY));
let mover =[];
function setup() {
createCanvas(420, 320);
mover = new Mover();
background(0);
}
function draw() {
let gravity = createVector(0, 0.2);
mover.applyForce(gravity);
if (mouseIsPressed) {
let wind = createVector(1, 0);
mover.applyForce(wind);
}
mover.update();
mover.checkEdges();
mover.display();
****************************************************************
Based on Examples from the Nature of Code 
by Dan Shiffman
Uses the p5.sound library to play tones from an array across two oscillators 
at every large step via a levy flight model.  
****************************************************************
let walkers = [];
let xoff = 0;
let oscMult = 2;
let oscVal = [130.81 * oscMult, 146.83 * oscMult, 155.56 * oscMult, 174.61 * oscMult, 196.00 * oscMult, 207.65 * oscMult, 233.08 * oscMult];
let oscType = ["sine", "triangle"];
function setup() {
createCanvas(640, 480);
background(0);
osc = new p5.Oscillator();
osc2 = new p5.Oscillator();
filter = new p5.Filter();
env = new p5.Env(0.1, 1.2, 1.2, 0.1);
env.setADSR(5.9, 0.25, 0.1, 0.0);
for (let i = 0; i < walkers.length; i++) {
walkers[i] = new Walker();
}
}
function draw() {
for (let i = 0; i < walkers.length; i++) {
walkers[i].render();
walkers[i].step();
walkers[i].checkEdges();
}
}
function mousePressed() {
stroke(255, 255, 255);
walkers.push(new Walker(this.pos));
osc.start();
osc.freq(random(oscVal));
osc.amp(0.5, 10);
}
function keyPressed() {
let wind = createVector(1, 0);
walkers.applyForce(wind);
}
let amp;
let speed;
let dur;
let oscMult = 2;
let oscVal = [130.81*oscMult, 146.83*oscMult, 155.56*oscMult, 174.61*oscMult, 196.00*oscMult, 207.65*oscMult, 233.08*oscMult];
let pluckType = [1, 6];
function setup() {
for (let i = 0; i < 100; i++) {
speed = 0.25;
dur = random(4, 7);
amp = random(0.2, 0.5);
freq = random(oscVal);
console.log("i 1 " + i + " " + 5 + " " + 6 + " " + freq + " " + freq); 
console.log("i3 " + i + " " + dur + " " + freq*2 + " " + amp);
console.log("i 4 " + i + " " + (random(0.4, 3)) + " " + freq + " " + freq);
}
****************************************************************
Based on Examples from the Nature of Code 
by Dan Shiffman
Uses the p5.sound library to play tones from an array across two oscillators 
at every large step via a levy flight model.  
****************************************************************
let walkers = [];
let xoff = 0;
let oscMult = 2;
let oscVal = [130.81*oscMult, 146.83*oscMult, 155.56*oscMult, 174.61*oscMult, 196.00*oscMult, 207.65*oscMult, 233.08*oscMult];
let oscType = ["sine", "triangle"];
function setup() {
createCanvas(640, 480);
background(0);
osc = new p5.Oscillator();
osc2 = new p5.Oscillator();
filter = new p5.Filter();
env = new p5.Env(0.1, 1.2, 1.2, 0.1);
env.setADSR(5.9, 0.25, 0.1, 0.0);
for (let i = 0; i < walkers.length; i++) {
walkers[i] = new Walker();
}
}
function draw() {
for (let i = 0; i < walkers.length; i++) {
walkers[i].render();
walkers[i].step();
}
console.log(xoff);
}
function mousePressed() {
stroke(255, 255, 255);
walkers.push(new Walker(this.pos));
osc.start();
osc.freq(random(oscVal));
osc.amp(0.5, 10);
}
function keyPressed() {
stroke(255, 100, 0);
walkers.push(new Walker(this.pos));
osc.start();
osc.freq(random(oscVal));
osc.amp(0.5, 10);
}
let freq;
let amp;
let speed;
let dur;
let xoff = 0;
let yoff = 130.81;
let oscMult = 1;
let oscVal = [130.81 * oscMult, 146.83 * oscMult, 155.56 * oscMult, 174.61 * oscMult, 196.00 * oscMult, 207.65 * oscMult, 233.08 * oscMult];
let pluckType = [1, 6];
let oscVal2 = [];
function setup() {
for (let i = 0; i < 1000; i++) {
let j = abs(i - 3);
xoff = xoff + 0.01;
yoff = yoff+noise(xoff);
let noiseAmp = noise(xoff) + 0.3;
let noiseFreq = noise(yoff)+yoff;
decAmp = 0.01;
speed = 0.25;
dur = random(0.2, 5);
amp = random(0.2, 0.5);
freq = random(oscVal);
if (xoff > 0.49) {
xoff = 0.3;
}
if (yoff > 520) {
xoff = 130.81;
}
if (i > 30) {
freq = random(oscVal) * ceil(random(2));
amp = 0.5;
}
let randHats = random(0.21, 0.27);
let randHatLength = random(0.02, 0.07)
if(i >100){
}
if (i == 20 || i == 40 || i == 80 || i == 120){
}
if (i > 120) {
}
}
****************************************************************
Based on Examples from the Nature of Code 
by Dan Shiffman
Uses the p5.sound library to play tones from an array across two oscillators 
at every large step via a levy flight model.  
****************************************************************
let walkers = [];
let xoff = 0;
let oscMult = 2;
let oscVal = [130.81*oscMult, 146.83*oscMult, 155.56*oscMult, 174.61*oscMult, 196.00*oscMult, 207.65*oscMult, 233.08*oscMult];
let oscType = ["sine", "triangle"];
function setup() {
createCanvas(640, 480);
background(0);
osc = new p5.Oscillator();
osc2 = new p5.Oscillator();
filter = new p5.Filter();
env = new p5.Env(0.1, 1.2, 1.2, 0.1);
env.setADSR(5.9, 0.25, 0.1, 0.0);
cVerb = createConvolver('assets/bx-spring');
for (let i = 0; i < walkers.length; i++) {
walkers[i] = new Walker();
}
}
function draw() {
for (let i = 0; i < walkers.length; i++) {
walkers[i].render();
walkers[i].step();
}
console.log(oscMult);
}
function mousePressed() {
stroke(255, 255, 255);
walkers.push(new Walker(this.pos));
osc.start();
osc.freq(random(oscVal));
osc.amp(0.5, 10);
}
****************************************************************
Based on Examples from the Nature of Code 
by Dan Shiffman
Uses the p5.sound library to play tones from an array across two oscillators 
at every large step via a levy flight model.  
****************************************************************
let walkers = [];
let xoff = 0;
let oscMult = 2;
let oscVal = [130.81*oscMult, 146.83*oscMult, 155.56*oscMult, 174.61*oscMult, 196.00*oscMult, 207.65*oscMult, 233.08*oscMult];
let oscType = ["sine", "triangle"];
function setup() {
createCanvas(640, 480);
background(0);
osc = new p5.Oscillator();
osc2 = new p5.Oscillator();
filter = new p5.Filter();
env = new p5.Env(0.1, 1.2, 1.2, 0.1);
env.setADSR(5.9, 0.25, 0.1, 0.0);
for (let i = 0; i < walkers.length; i++) {
walkers[i] = new Walker();
}
}
function draw() {
for (let i = 0; i < walkers.length; i++) {
walkers[i].render();
walkers[i].step();
}
console.log(xoff);
}
function mousePressed() {
stroke(255, 255, 255);
walkers.push(new Walker(this.pos));
osc.start();
osc.freq(random(oscVal));
osc.amp(0.5, 10);
}
function keyPressed() {
stroke(255, 100, 0);
walkers.push(new Walker(this.pos));
osc.start();
osc.freq(random(oscVal));
osc.amp(0.5, 10);
}
****************************************************************
Based on Examples from the Nature of Code 
by Dan Shiffman
Uses the p5.sound library to play tones from an array across two oscillators 
at every large step via a levy flight model.  
****************************************************************
let walkers = [];
let xoff = 0;
let oscMult = 2;
let oscVal = [130.81*oscMult, 146.83*oscMult, 155.56*oscMult, 174.61*oscMult, 196.00*oscMult, 207.65*oscMult, 233.08*oscMult];
let oscType = ["sine", "triangle"];
function setup() {
createCanvas(640, 480);
background(0);
osc = new p5.Oscillator();
osc2 = new p5.Oscillator();
filter = new p5.Filter();
env = new p5.Env(0.1, 1.2, 1.2, 0.1);
env.setADSR(5.9, 0.25, 0.1, 0.0);
for (let i = 0; i < walkers.length; i++) {
walkers[i] = new Walker();
}
}
function draw() {
for (let i = 0; i < walkers.length; i++) {
walkers[i].render();
walkers[i].step();
}
console.log(xoff);
}
function mousePressed() {
walkers.push(new Walker(this.pos));
****************************************************************
Based on Examples from the Nature of Code 
by Dan Shiffman
****************************************************************
let walkers = [];
let xoff = 0;
let walker;
let oscMult = 2;
let oscVal = [130.81*oscMult, 146.83*oscMult, 155.56*oscMult, 174.61*oscMult, 196.00*oscMult, 207.65*oscMult, 233.08*oscMult];
let oscType = ["sine", "triangle"];
let foci = 5;
function setup() {
createCanvas(640, 480);
background(160);
osc = new p5.Oscillator();
osc2 = new p5.Oscillator();
filter = new p5.Filter();
env = new p5.Env(0.1, 1.2, 1.2, 0.1);
env.setADSR(5.9, 0.25, 0.1, 0.0);
for (let i = 0; i < 10; i++) {
walkers[i] = new Walker();
}
}
function draw() {
for (let i = 0; i < walkers.length; i++) {
walkers[i].render();
walkers[i].step();
}
let walker;
let oscMult = 2;
let oscVal = [130.81*oscMult, 146.83*oscMult, 155.56*oscMult, 174.61*oscMult, 196.00*oscMult, 207.65*oscMult, 233.08*oscMult];
let oscType = ["sine", "triangle", "sawtooth"];
function setup() {
createCanvas(640, 480);
walker = new Walker();
walker2 = new Walker();
walker3 = new Walker();
walker4 = new Walker();
background(160);
osc = new p5.Oscillator();
osc2 = new p5.Oscillator();
filter = new p5.Filter();
env = new p5.Env(0.1, 1.2, 1.2, 0.1);
env.setADSR(5.9, 0.25, 0.1, 0.0);
}
function draw() {
for (let i = 0; i < 1; i++) {
walker.render();
walker.step();
walker2.render();
walker2.step();
}
let walker;
function setup() {
createCanvas(640, 480);
walker = new Walker();
walker2 = new Walker();
background(255);
}
function draw() { 
for (let i = 0; i < 10; i++) {
walker.step();
walker.render();
walker2.step(); 
walker2.render(); 
}
}let osc, fft;
let reverb;
function setup() {
createCanvas(720, 256);
osc.amp(0.5);
reverb = new p5.Reverb();
fft = new p5.FFT();
osc.start();
reverb.process(osc, 3, 2);
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
var freq = map(mouseX, 0, width, 40, 880);
osc.freq(freq);
var amp = map(mouseY, 0, height, 1, 0.01);
osc.amp(amp);
}
var osc1, osc2, osc3, osc4, osc5, osc6, osc7, osc8;
var oscFreqSlider1,oscFreqSlider2, oscFreqSlider3, oscFreqSlider4, oscFreqSlider5, oscFreqSlider6, oscFreqSlider7, oscFreqSlider8;
var oscAmpSlider1,oscAmpSlider2, oscAmpSlider3, oscAmpSlider4, oscAmpSlider5, oscAmpSlider6, oscAmpSlider7, oscAmpSlider8;
var filterQslider, filterFreqResponseSlider;
var lpFilter;
var button1;
var freqLabel, filterQLabel, filterFreqResLabel, ampLabel, freqLabel,tit;
var waveformMASTER;
var waveform;
var filter1;
var filterQslider, filterFreqResponseSlider;
var mainLabel, frequenciesLabel, amplitudesLabel;
var filterParmLabel;
function setup() {
var filterResStart = 3;
createCanvas(1100, 550);
var sliderFREQpos = 35;
var sliderFREQvert = 25;
oscFreqSlider1 = createSlider(0, 4700, 47);
oscFreqSlider1.position(sliderFREQpos, 20+sliderFREQvert);
oscFreqSlider2 = createSlider(0, 4700, 113);
oscFreqSlider2.position(sliderFREQpos, 45+sliderFREQvert);
oscFreqSlider3 = createSlider(0, 4700, 8);
oscFreqSlider3.position(sliderFREQpos, 70+sliderFREQvert);
oscFreqSlider4 = createSlider(0, 4700, 13);
oscFreqSlider4.position(sliderFREQpos, 95+sliderFREQvert);
oscFreqSlider5 = createSlider(0, 4700, 147);
oscFreqSlider5.position(sliderFREQpos, 120+sliderFREQvert);
oscFreqSlider6 = createSlider(0, 4700, 226);
oscFreqSlider6.position(sliderFREQpos, 145+sliderFREQvert);
oscFreqSlider7 = createSlider(0, 4700, 194);
oscFreqSlider7.position(sliderFREQpos, 170+sliderFREQvert);
oscFreqSlider8 = createSlider(0, 4700, 147);
oscFreqSlider8.position(sliderFREQpos, 195+sliderFREQvert);
frequenciesLabel = createDiv('<div style="color:#FFFFFF"> <p>frequencies</p></div>');
frequenciesLabel.position(15, -5);
one = createDiv('<div style="color:#FFFFFF"> <h5>#1</h5></div>');
one.position(15, 25);  
two = createDiv('<div style="color:#FFFFFF"> <h5>#2</h5></div>');
two.position(15, 50);
three = createDiv('<div style="color:#FFFFFF"> <h5>#3</h5></div>');
three.position(15, 75);  
four = createDiv('<div style="color:#FFFFFF"> <h5>#4</h5></div>');
four.position(15, 100);
five = createDiv('<div style="color:#FFFFFF"> <h5>#5</h5></div>');
five.position(15, 125);  
six = createDiv('<div style="color:#FFFFFF"> <h5>#6</h5></div>');
six.position(15, 150);
seven = createDiv('<div style="color:#FFFFFF"> <h5>#7</h5></div>');
seven.position(15, 175);  
eight = createDiv('<div style="color:#FFFFFF"> <h5>#8</h5></div>');
eight.position(15, 200);
var sliderAMPpos = 200;
var sliderAMPvert = 25;
var ampStart = 0.1;
oscAmpSlider1 = createSlider(0, 255, 128);
oscAmpSlider1.position(sliderAMPpos, 20+sliderAMPvert);
oscAmpSlider2 = createSlider(0, 255, ampStart);
oscAmpSlider2.position(sliderAMPpos, 45+sliderAMPvert);
oscAmpSlider3 = createSlider(0, 255, ampStart);
oscAmpSlider3.position(sliderAMPpos, 70+sliderAMPvert);
oscAmpSlider4 = createSlider(0, 255, ampStart);
oscAmpSlider4.position(sliderAMPpos, 95+sliderAMPvert);
oscAmpSlider5 = createSlider(0, 255, ampStart);
oscAmpSlider5.position(sliderAMPpos, 120+sliderAMPvert);
oscAmpSlider6 = createSlider(0, 255, ampStart);
oscAmpSlider6.position(sliderAMPpos, 145+sliderAMPvert);
oscAmpSlider7 = createSlider(0, 255, ampStart);
oscAmpSlider7.position(sliderAMPpos, 170+sliderAMPvert);
oscAmpSlider8 = createSlider(0, 255, ampStart);
oscAmpSlider8.position(sliderAMPpos, 195+sliderAMPvert);
amplitudesLabel = createDiv('<div style="color:#FFFFFF"> <p>amplitudes</p></div>');
amplitudesLabel.position(180, -5);
one2 = createDiv('<div style="color:#FFFFFF"> <h5>#1</h5></div>');
one2.position(180, 25);  
two2 =  createDiv('<div style="color:#FFFFFF"> <h5>#2</h5></div>');  
two2.position(180, 50);
three2 = createDiv('<div style="color:#FFFFFF"> <h5>#3</h5></div>');
three2.position(180, 75);  
four2 = createDiv('<div style="color:#FFFFFF"> <h5>#4</h5></div>');
four2.position(180, 100);
five2 = createDiv('<div style="color:#FFFFFF"> <h5>#5</h5></div>');
five2.position(180, 125);  
six2 = createDiv('<div style="color:#FFFFFF"> <h5>#6</h5></div>');
six2.position(180, 150);
seven2 = createDiv('<div style="color:#FFFFFF"> <h5>#7</h5></div>');
seven2.position(180, 175);  
eight2 = createDiv('<div style="color:#FFFFFF"> <h5>#8</h5></div>');
eight2.position(180, 200);
filterParmLabel = createDiv('<div style="color:#FFFFFF"> <p>filter parameters</p></div>');
filterParmLabel.position(345, -5);
filterQLabel = createDiv('<div style="color:#FFFFFF"> <h5>cuttoff</h5></div>');
filterQLabel.position(345, 25);
filterQslider = createSlider(0, 5000, 255);
filterQslider.position(410, 45);  
filterFreqResLabel =createDiv('<div style="color:#FFFFFF"> <h5>resonance</h5></div>');
filterFreqResLabel.position(345, 50);
filterFreqResponseSlider = createSlider(0, 25, filterResStart);
filterFreqResponseSlider.position(410, 70);  
waveformMASTER = [
{
"waveform": ['sine', 'sawtooth', 'triangle', 'square']} 
];
waveform = waveformMASTER[0].waveform[0];
osc1 = new p5.Oscillator(waveform);
osc1.amp(.2);
osc1.start();
osc2 = new p5.Oscillator(waveform);
osc2.amp(.2);
osc2.start();
osc3 = new p5.Oscillator(waveform);
osc3.amp(.2);
osc3.start();
osc4 = new p5.Oscillator(waveform);
osc4.amp(.2);
osc4.start();
osc5 = new p5.Oscillator(waveform);
osc5.amp(.2);
osc5.start();
osc6 = new p5.Oscillator(waveform);
osc6.amp(.2);
osc6.start();
osc7 = new p5.Oscillator(waveform);
osc7.amp(.2);
osc7.start();
osc8 = new p5.Oscillator(waveform);
osc8.amp(.2);
osc8.start(); 
osc1.freq(osc2.add(),osc3.add(), osc4.add(),osc5.add(),osc6.add(), osc7.add(), osc8.add());
filter1 = new p5.LowPass();   
osc1.disconnect();
osc1.connect(filter1);
osc2.disconnect();
osc2.connect(filter1);
osc3.disconnect();
osc3.connect(filter1);
osc4.disconnect();
osc4.connect(filter1);
osc5.disconnect();
osc5.connect(filter1);
osc6.disconnect();
osc6.connect(filter1);
osc7.disconnect();
osc7.connect(filter1);
osc8.disconnect();
osc8.connect(filter1);         
fft = new p5.FFT();
}
function draw() {
background(12,58,24);
var spectrum = fft.analyze();
var oscFreq1 = oscFreqSlider1.value();
var oscFreq2 = oscFreqSlider2.value();
var oscFreq3 = oscFreqSlider3.value();
var oscFreq4 = oscFreqSlider4.value();
var oscFreq5 = oscFreqSlider5.value();
var oscFreq6 = oscFreqSlider6.value();
var oscFreq7 = oscFreqSlider7.value();
var oscFreq8 = oscFreqSlider8.value();
var oscAmp1 = oscAmpSlider1.value();
var oscAmp2 = oscAmpSlider2.value();
var oscAmp3 = oscAmpSlider3.value();
var oscAmp4 = oscAmpSlider4.value();
var oscAmp5 = oscAmpSlider5.value();
var oscAmp6 = oscAmpSlider6.value();
var oscAmp7 = oscAmpSlider7.value();
var oscAmp8 = oscAmpSlider8.value();
var filterQ = filterQslider.value();
var filterFreqResponse = filterFreqResponseSlider.value();    
var amplitudeBias = 0.13;
oscAmp1 = map(oscAmp1, 0, 255, 0, 1);
osc1.amp(oscAmp1*amplitudeBias); 
osc1.freq(oscFreq1);
oscAmp2 = map(oscAmp2, 0, 255, 0, 1);
osc2.amp(oscAmp2*amplitudeBias); 
osc2.freq(oscFreq2);
oscAmp3 = map(oscAmp3, 0, 255, 0, 1);
osc3.amp(oscAmp3*amplitudeBias); 
osc3.freq(oscFreq3);
oscAmp4 = map(oscAmp4, 0, 255, 0, 1);      
osc4.amp(oscAmp4*amplitudeBias); 
osc4.freq(oscFreq4);
oscAmp5 = map(oscAmp5, 0, 255, 0, 1);       
osc5.amp(oscAmp5*amplitudeBias);
osc5.freq(oscFreq5);
oscAmp6 = map(oscAmp6, 0, 255, 0, 1);         
osc6.amp(oscAmp6*amplitudeBias); 
osc6.freq(oscFreq6);
oscAmp7 = map(oscAmp7, 0, 255, 0, 1);   
osc7.amp(oscAmp7*amplitudeBias); 
osc7.freq(oscFreq7);
oscAmp8 = map(oscAmp8, 0, 255, 0, 1);     
osc8.amp(oscAmp8*amplitudeBias);
osc8.freq(oscFreq8);
filter1.set(filterQ, filterFreqResponse);
beginShape();
for (i = 0; i<spectrum.length; i++) {
stroke(255,120,200);
fill(0);
var x = map(i, 0, spectrum.length, 0, 5000);
var y = map(spectrum[i], 0, 512, height, 0);
vertex(x, y);
}
endShape(); 
**************** **************** **************** **************** **************** 
Question: Switch states confuse me.  I'm trying to have the background set to either white 
or black depending on the state as being controlled by the button. I've tried all combinations
of what I have in the code and I think I am close but maybe have my operations in the wrong
part(s) of my program. 
**************** **************** **************** **************** **************** 
let video;
let vScale = 16;
let slider;
let button;
let switched;
function setup() {
createCanvas(640, 480);
video = createCapture(VIDEO);
video.size(width / vScale, height / vScale);
rectMode(CENTER);
pixelDensity(1);
slider = createSlider(0, 25, 0);
slider.position(0, height);
button = createButton('pos/neg');
button.position(0, height + 30);
button.mousePressed(switchBG);
switched = false;
}
function draw() {
video.loadPixels();
sliderOps();
for (let y = 0; y < video.height; y++) {
for (let x = 0; x < video.width; x++) {
let index = (x + y * video.width) * 4;
let r = video.pixels[index + 0];
let g = video.pixels[index + 1];
let b = video.pixels[index + 2];
let a = video.pixels[index + 3];
let w = map(r, 0, 255, 0, vScale);
let s = map(r, 0, 255, 0, 5);
stroke(s);
strokeWeight(s);
fill(r, g, b, random(a, a + 20));
if (slider.value() >= 0 && slider.value() <= 5) {
w = map(r, 0, 255, 0, vScale / 2);
}
if (slider.value() >= 6 && slider.value() <= 10) {
w = map(r, 0, 255, 0, vScale)
}
if (slider.value() >= 11 && slider.value() <= 15) {
w = map(r, 0, 255, 0, vScale * 2)
}
if (slider.value() >= 16 && slider.value() <= 20) {
w = map(r, 0, 255, 0, vScale * 4)
}
if (slider.value() >= 21 && slider.value() <= 25) {
w = map(r, 0, 255, 0, vScale * 8)
}
rect(x * vScale, y * vScale, w, w);
if (switched) {
switched = !switched;
}
}
}
}
function switchBG() {
if (switched) {
background(0, 0, 0);
} else {
background(255, 255, 255);
}
}let video;
let vScale = 16;
let slider;
let button;
let blackOn;
function setup() {
createCanvas(640, 480);
video = createCapture(VIDEO);
video.size(width / vScale, height / vScale);
rectMode(CENTER);
pixelDensity(1);
slider = createSlider(0, 25, 0);
slider.position(0, height);
button = createButton('blk/wht BG');
button.position(0, height + 30);
button.mousePressed(switchBG);
blackOn = true;
}
function draw() {
if (blackOn) {
background(0, 0, 0);
} else {
background(255, 255, 255);
}
video.loadPixels();
for (let y = 0; y < video.height; y++) {
for (let x = 0; x < video.width; x++) {
let index = (x + y * video.width) * 4;
let r = video.pixels[index + 0];
let g = video.pixels[index + 1];
let b = video.pixels[index + 2];
let a = video.pixels[index + 3];
let w = map(r, 0, 255, 0, vScale);
let s = map(r, 0, 255, 0, 5);
stroke(s);
strokeWeight(s);
fill(r, g, b);
if (slider.value() >= 0 && slider.value() <= 5) {
w = map(r, 0, 255, 0, vScale / 2);
}
if (slider.value() >= 6 && slider.value() <= 10) {
w = map(r, 0, 255, 0, vScale)
}
if (slider.value() >= 11 && slider.value() <= 15) {
w = map(r, 0, 255, 0, vScale * 2)
}
if (slider.value() >= 16 && slider.value() <= 20) {
w = map(r, 0, 255, 0, vScale * 4)
}
if (slider.value() >= 21 && slider.value() <= 25) {
w = map(r, 0, 255, 0, vScale * 8)
}
rect(x * vScale, y * vScale, w, w);
}
}
}
function switchBG() {
blackOn = !blackOn;
}let video;
let vScale = 16;
let slider;
let button;
function setup() {
createCanvas(640, 480);
video = createCapture(VIDEO);
video.size(width / vScale, height / vScale);
rectMode(CENTER);
pixelDensity(1);
slider = createSlider(0, 25, 0);
slider.position (0, height);
text('height+2)
}
function draw() {
background(0);
video.loadPixels();
loadPixels();
for (let y = 0; y < video.height; y++) {
for (let x = 0; x < video.width; x++) {
let index = (x + y * video.width) * 4;
let r = video.pixels[index + 0];
let g = video.pixels[index + 1];
let b = video.pixels[index + 2];
let a = video.pixels[index + 3];
let w = map(r, 0, 255, 0, vScale);
fill(r, g, b, random(a, a+20));
if (slider.value() >= 0 && slider.value() <= 5) {
w = map(r, 0, 255, 0, vScale);
}
if (slider.value() >= 6 && slider.value() <= 10) {
w = map(g, 0, 255, 0, vScale * 2)
}
if (slider.value() >= 11 && slider.value() <= 15) {
w = map(b, 0, 255, 0, vScale * 4)
}
if (slider.value() >= 16 && slider.value() <= 20) {
w = map(b, 0, 255, 0, vScale * 8)
}
if (slider.value() >= 21 && slider.value() <= 25) {
w = map(b, 0, 255, 0, vScale * 16)
}
rect(x * vScale, y * vScale, w, w);
}
}
}
let video;
let pics2 = [];
let picW = [44, 86, 122, 160, 200];
let counter = 0;
let button;
function setup() {
createCanvas(800, 400);
video = createCapture(VIDEO, ready);
video.size(400, 300);
button = createButton('Take Pic!');
button.mousePressed(takePic);
}
let go = false;
function ready() {
go = true;
}
function draw() {
scale(pics2);
cycle();
pics2[counter] = video.get();
counter++;
if (counter == 100){
counter = 0;
}
}
function cycle() {
let x = 0;
let y = 0;
let w = 40;
let h = 40;
let z = 0;
for (let i = 0; i < pics2.length; i++) {
image(pics2[i], x, y, w, h);
x = x + w;
if (x >= width) {
x = 0;
y = y + h;
}
if (y >= height) {
y = 0;
}
w = int((picW[z]));
z++;
if (z >= picW.length) {
z = 0;
}
}
}
function takePic() {
}function setup() { 
createCanvas(400, 400);
pixelDensity(1);
} 
function draw() { 
background(0);
loadPixels();
for (let y = 0; y < height; y++){
for (let x = 0; x < width; x++){
let index = (x + y * width) * 4;
pixels[index + 0] = x;
pixels[index + 1] = random(50, 100);
pixels[index + 2] = y;
pixels[index + 3] = 255;
}
}
updatePixels();
}let video;
let pics2 = [];
let picW = [44, 86, 122, 160, 200];
let counter = 0;
let button;
function setup() {
createCanvas(800, 400);
video = createCapture(VIDEO, ready);
video.size(400, 300);
button = createButton('Take Pic!');
button.mousePressed(takePic);
}
let go = false;
function ready() {
go = true;
}
function draw() {
scale(pics2);
cycle();
pics2[counter] = video.get();
counter++;
if (counter == 100){
counter = 0;
}
}
function cycle() {
let x = 0;
let y = 0;
let w = 40;
let h = 40;
let z = 0;
for (let i = 0; i < pics2.length; i++) {
image(pics2[i], x, y, w, h);
x = x + w;
if (x >= width) {
x = 0;
y = y + h;
}
if (y >= height) {
y = 0;
}
w = int((picW[z]));
z++;
if (z >= picW.length) {
z = 0;
}
}
}
function takePic() {
}var slider;
var catspring;
var catsummer;
var catwinter;
var catfall;
var csv;
catspring = loadImage('assets/catspring.png');
catsummer = loadImage('assets/catsummer.png');
catwinter = loadImage('assets/catwinter.png');
catfall = loadImage('assets/catfall.png');
csv = loadTable("lalala.csv", "csv", "header");
font = loadFont('Font.otf'); 
}
function setup() {
createCanvas(windowWidth, windowHeight);
console.log(csv.getRowCount() + " total rows in table");
console.log(csv.getColumnCount() + " total columns in table");
slider = createSlider(0, 12, 0);
slider.style('width', '300px');
slider.position(50, height - 300);
frameRate(5);
}
function draw() {
background(255);
if (slider.value() >= 0 && slider.value() < 3 || slider.value() == 12) {
var x = 10;
var y = 50;
var r = int(random(0,60));
image(catwinter, x, y);
text("Winter temp: " + int(csv.getString(r,"TEMP")) + " celcius", x, y);
textFont(font);
text("Winter is here! Time to hug a snowman!", x, 30);
}
if (slider.value() >= 3 && slider.value() < 5) {
var x = 10;
var y = 50;
var r = int(random(61,130));
image(catspring, x, y);
text("Spring temp: "+int(csv.getString(r, "TEMP")) + " celcius", x, y);
text("Spring! YES! Time to pick graduate and SMELL AWESOME flowers!", x, 30);
}
if (slider.value() >= 5 && slider.value() < 8) {
var x = 10;
var y = 50;
var r = int(random(131,215));
image(catsummer, x, y);
text("Summer temp: "+int(csv.getString(r, "TEMP")) + " celcius", x, y);
text("SUMMER! Time to just be a cat at the beach!", x, 30);
}
if (slider.value() >= 8 && slider.value() < 12) {
var x = 10;
var y = 50;
var r = int(random(216,270));
image(catfall, x, y);
text("Fall temp: "+int(csv.getString(r, "TEMP")) + " celcius", x, y);
text("Fall! Grow more fur! Don't get scared... you're a cat!", x, 30);
}
text("Jan", 30, height-250);
text("Feb", 60, height-250);
text("Mar", 90, height-250);
text("Apr", 120, height-250);
text("May", 150, height-250);
text("Jun", 180, height-250);
text("Jul", 210, height-250);
text("Aug", 240, height-250);
text("Sep", 270, height-250);
text("Oct", 300, height-250);
text("Nov", 330, height-250);
text("Dec", 360, height-250);
}let csv;
let x;
let x2;
function preload() {
csv = loadTable("lalala.csv", "csv", "header");
}
function setup() { 
createCanvas(400, 400);
console.log(csv.getRowCount() + " total rows in table");
console.log(csv.getColumnCount() + " total columns in table");
} 
function draw() { 
background(220);
for (let r = 0; r < 336; r++) {
rect(width/2, height/2, 5, int(csv.getString(r, "TEMP")));
console.log(int(csv.getString(r, "TEMP")));
}  
}
*************************************************************************
This sketch showcases responses to a survey in Somerville, MA where 
participants were asked (among other things) on a scale of 1-10 how 
happy they felt on the day of the survey, and how satisifed they 
were with their lives in general.  The responses for each participant are 
overlaid on top of one another in different colors.  
*************************************************************************
let csv;
let x;
let x2;
function preload() {
csv = loadTable("Somerville_Happiness_Survey_responses_-_2011__2013__2015.csv", "csv", "header");
}
function setup() {
createCanvas(800, 700);
background(255);
callText();
console.log(csv.getRowCount() + " total rows in table");
console.log(csv.getColumnCount() + " total columns in table");
x = 0;
x2 = 0;
happyNow();
happyInGeneral();
}
function happyNow(){
strokeWeight(0.5);
stroke(255);
fill(0, 0, 255);
for (let r = 0; r < 400; r++) {
rect(x, height, 2, int(csv.getString(r, "How.happy.do.you.feel.right.now.")) * -50);
x += 2;
}  
}
function happyInGeneral(){
stroke(255);
fill(0, 255, 0, 160);
for (let r2 = 0; r2 < 400; r2++) {
rect(x2, height, 2, int(csv.getString(r2, "How.satisfied.are.you.with.your.life.in.general.")) * -50);
x2 += 2;
}
}
function callText() {
push();
fill(0);
textSize(30);
textAlign(CENTER);
text("How Happy in Somerville?", width / 2, 70);
pop();
push();
textSize(20);
fill(0, 0, 255);
textAlign(CENTER);
text("Blue data represents happiness with life in general.", width / 2, 120);
pop();
push();
textSize(20);
textAlign(CENTER);
fill(0, 255, 0);
text("Green data represents happiness on day of survey", width / 2, 160);
pop();
}
let csv;
function preload() {
createCanvas(400, 400);
csv = loadTable("Somerville_Happiness_Survey_responses_-_2011__2013__2015.csv", "csv", "header");
}
function draw() { 
background(220);
ellipse(30,30,int(csv.getString(3, "How.happy.do.you.feel.right.now.")));
*************************************************************************
This sketch showcases responses to a survey in Somerville, MA where 
participants were asked (among other things) on a scale of 1-10 how 
happy they felt on the day of the survey, and how satisifed they 
were with their lives in general.  The responses for each participant are 
overlaid on top of one another in different colors.  
*************************************************************************
let csv;
let x;
let x2;
function preload() {
csv = loadTable("Somerville_Happiness_Survey_responses_-_2011__2013__2015.csv", "csv", "header");
}
function setup() {
createCanvas(800, 700);
background(255);
callText();
console.log(csv.getRowCount() + " total rows in table");
console.log(csv.getColumnCount() + " total columns in table");
x = 0;
x2 = 0;
happyNow();
happyInGeneral();
}
function happyNow(){
strokeWeight(0.5);
stroke(255);
fill(0, 0, 255);
for (let r = 0; r < 400; r++) {
rect(x, height, 2, int(csv.getString(r, "How.happy.do.you.feel.right.now.")) * -50);
x += 2;
}  
}
function happyInGeneral(){
stroke(255);
fill(0, 255, 0, 160);
for (let r2 = 0; r2 < 400; r2++) {
rect(x2, height, 2, int(csv.getString(r2, "How.satisfied.are.you.with.your.life.in.general.")) * -50);
x2 += 2;
}
}
function callText() {
push();
fill(0);
textSize(30);
textAlign(CENTER);
text("How Happy in Somerville?", width / 2, 70);
pop();
push();
textSize(20);
fill(0, 0, 255);
textAlign(CENTER);
text("Blue data represents happiness with life in general.", width / 2, 120);
pop();
push();
textSize(20);
textAlign(CENTER);
fill(0, 255, 0);
text("Green data represents happiness on day of survey", width / 2, 160);
pop();
}
let data;
function preload(){
data = loadJSON("adjectives.json");
}
function setup() { 
createCanvas(400, 400);
let adjective = data.descriptions;  
createP("I most enjoy people who are" + " " + random(adjective));
} 
function draw() { 
background(220);
}let data;
function preload(){
data = loadJSON("recipes.json");
}
function setup() { 
createCanvas(400, 400);
let recipe = data.recipes[2].name;  
let steps = data.recipes[2].steps; 
createP(recipe);
createP(steps);
} 
function draw() { 
background(220);
if (data.recipes > 0){
ellipse(50, 50, 50, 50);
}
}let test; 
function preload(){
test = loadJSON("test.json");
}
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
fill(0, 0, 0);
text(test.name, 10, 50);
let portName = '/dev/cu.usbmodem1441';
function setup() {
createCanvas(400, 400);
background(0, 100, 200);
}
function draw() {
graphData(inData);
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
if (inString.length > 0 ) {
inData = Number(inString);
}
}
}
function portClose() {
}
function graphData(newData) {
let yPos = map(newData, 0, 255, 0, height);
stroke(0xA8, 0xD9, 0xA7);
line(xPos, height, xPos, height - yPos);
if (xPos >= width) {
xPos = 0;
background(0x08, 0x16, 0x40);
} else {
xPos++;
}
}
let portName = '/dev/cu.usbmodem1441'
let x, y;
let whichAxis;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
ellipse(width / 2, height / 2, x, y);
}
function portOpen() {
}
}
if (whichAxis === 88){
}
function keyReleased() {
console.log(
whichAxis = key;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(0);
fill(255);
text("sensor value: " + inData, 30, 30);
}
for (var i = 0; i < portList.length; i++) {
}
function serverConnected() {
}
function portOpen() {
}
}
}
function portClose() {
}
}function setup() { 
createCanvas(400, 400);
let a= -5;
let b = 9;
let s = sum(a, b);
console.log(a, "+", b, "=", s);
} 
function draw() { 
background(220);
}
function sum(a, b){
let s = a+b; 
return s;
function setup() {
createCanvas(windowWidth, windowHeight);
}
function gotData() {
}
function draw() {
background(255, 255, 255);
noFill();
strokeWeight(10);
background(127, 0, 127);
var mappedVar = map(latestData, 0, 255, 0, width);
console.log(latestData);
let v = mappedVar; 
let origV = v;
ellipse(width*0.4, height*0.4, v*0.25 + 10, v*0.25 + 10);
ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
v+=random(-5, 5);
bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);
bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
}
whereas the paragraph under canvas is created within p5.  Both are
possible but doing it in p5 allows for changes, rather than static
text, images, etc.
let bgColor;
let button;
let button2; 
let button3;
let button4; 
let button5;
let x = 200;
let y = 200;
let slider;
let input;
function setup() { 
canvas = createCanvas(400, 400);
bgColor = color(0, 0, 0);
button = createButton('Change BG Color');
button2 = createButton('Move Right');
button3 = createButton('Move Down');
button4 = createButton('Move Left');
button5 = createButton('Move Up');
button.mousePressed(changeColor);
button2.mousePressed(moveRight);
button3.mousePressed(moveDown);
button4.mousePressed(moveLeft);
button5.mousePressed(moveUp);
slider = createSlider(10, 100, 50);
}
function moveLeft(){
x = x-10;
}
function moveUp(){
y = y-10;
}
function moveRight(){
x = x+10;
}
function moveDown(){
y = y+10;
}
function changeColor(){
bgColor = color(0, random(100), random(255));
}
function draw() { 
background(bgColor);
fill(255, 0, 0);
ellipse(x, y, slider.value(), slider.value());
if(x>width){
x=0;
}
if(y>height){
y=0;
}
if(x<0){
x=width;
}
if(y<0){
y=height;
}
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(255, 0, 0);
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
ellipse(200, 200, 50, 50);
}
canvas = createCanvas(400, 400);
canvas.position(150, 200);
document.getElementById("stuff").animate([
{
transform: 'translateX(-100px)'
},
{
transform: 'translateY(3000px)'
}
], {
duration: 7000,
iterations: Infinity
});
}
function draw() {
background(220);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
whereas the paragraph under canvas is created within p5.  Both are
possible but doing it in p5 allows for changes, rather than static
text, images, etc.
let bgColor;
let button;
let button2; 
let button3;
let button4; 
let button5;
let txt;
let x = 200;
let y = 200;
let slider;
let nameInput;
let nameP;
function setup() { 
canvas = createCanvas(400, 400);
bgColor = color(0, 0, 0);
button = createButton('Change BG Color');
button2 = createButton('Move Right');
button3 = createButton('Move Down');
button4 = createButton('Move Left');
button5 = createButton('Move Up');
button.mousePressed(changeColor);
button2.mousePressed(moveRight);
button3.mousePressed(moveDown);
button4.mousePressed(moveLeft);
button5.mousePressed(moveUp);
slider = createSlider(10, 100, 50);
nameInput = createInput('Type Your Name');
nameP = createP('Your Name!')
nameP.mouseOver(overPara);
nameP.mouseOut(outPara);
canvas.mousePressed(changeColor);
nameInput.input(updateText);
}
function updateText(){
nameP.html(nameInput.value()); 
}
function overPara() {
nameP.html('Your Mouse is Over Me!!!');
}
function outPara() {
nameP.html('Your Mouse is NOT Over Me!!!');
}
function moveLeft(){
x = x-5;
}
function moveUp(){
y = y-5;
}
function moveRight(){
x = x+5;
}
function moveDown(){
y = y+5;
}
function changeColor(){
bgColor = color(random(255), 100, 0);
}
function draw() { 
background(bgColor);
fill(255, 0, 0);
ellipse(x, y, slider.value(), slider.value());
text('hello:  ' + nameInput.value(), 10, 20);
}let textbox; 
let slider; 
let paragraph;
function setup() { 
noCanvas();
paragraph = createP('Starting text');
textbox = createInput('enter text');
slider = createSlider(10, 64, 16);
textbox.input(updateText);
slider.input(updateFontSize);
} 
function updateText(){
paragraph.html(textbox.value());
}
function updateFontSize(){
paragraph.style("font-size", slider.value() + "pt");
whereas the paragraph under canvas is created within p5.  Both are
possible but doing it in p5 allows for changes, rather than static
text, images, etc.
let bgColor;
let button;
let button2; 
let button3;
let button4; 
let button5;
let txt;
let x = 200;
let y = 200;
let slider;
let nameInput;
let nameP;
function setup() { 
canvas = createCanvas(400, 400);
bgColor = color(0, 0, 0);
button = createButton('Change BG Color');
button2 = createButton('Move Right');
button3 = createButton('Move Down');
button4 = createButton('Move Left');
button5 = createButton('Move Up');
button.mousePressed(changeColor);
button2.mousePressed(moveRight);
button3.mousePressed(moveDown);
button4.mousePressed(moveLeft);
button5.mousePressed(moveUp);
slider = createSlider(10, 100, 50);
nameInput = createInput('Type Your Name');
nameP = createP('Your Name!')
nameP.mouseOver(overPara);
nameP.mouseOut(outPara);
canvas.mousePressed(changeColor);
nameInput.input(updateText);
}
function updateText(){
nameP.html(nameInput.value()); 
}
function overPara() {
nameP.html('Your Mouse is Over Me!!!');
}
function outPara() {
nameP.html('Your Mouse is NOT Over Me!!!');
}
function moveLeft(){
x = x-5;
}
function moveUp(){
y = y-5;
}
function moveRight(){
x = x+5;
}
function moveDown(){
y = y+5;
}
function changeColor(){
bgColor = color(random(255), 100, 0);
}
function draw() { 
background(bgColor);
fill(255, 0, 0);
ellipse(x, y, slider.value(), slider.value());
text('hello:  ' + nameInput.value(), 10, 20);
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
whereas the paragraph under canvas is created within p5.  Both are
possible but doing it in p5 allows for changes, rather than static
text, images, etc.
let bgColor;
let button;
let button2; 
let button3;
let button4; 
let button5;
let x = 200;
let y = 200;
let slider;
let nameInput;
let nameP;
function setup() { 
canvas = createCanvas(400, 400);
bgColor = color(0, 0, 0);
button = createButton('Change BG Color');
button2 = createButton('Move Right');
button3 = createButton('Move Down');
button4 = createButton('Move Left');
button5 = createButton('Move Up');
button.mousePressed(changeColor);
button2.mousePressed(moveRight);
button3.mousePressed(moveDown);
button4.mousePressed(moveLeft);
button5.mousePressed(moveUp);
slider = createSlider(10, 100, 50);
nameInput = createInput('Type Your Name');
nameP = createP('Your Name!')
nameP.mouseOver(overPara);
nameP.mouseOut(outPara);
canvas.mousePressed(changeColor);
nameInput.input(updateText);
}
function updateText(){
nameP.html(nameInput.value()); 
}
function overPara() {
nameP.html('Your Mouse is Over Me!!!');
}
function outPara() {
nameP.html('Your Mouse is NOT Over Me!!!');
}
function moveLeft(){
x = x-5;
}
function moveUp(){
y = y-5;
}
function moveRight(){
x = x+5;
}
function moveDown(){
y = y+5;
}
function changeColor(){
bgColor = color(random(255), 100, 0);
}
function draw() { 
background(bgColor);
fill(255, 0, 0);
ellipse(x, y, slider.value(), slider.value());
text('hello:  ' + nameInput.value(), 10, 20);
whereas the paragraph under canvas is created within p5.  Both are
possible but doing it in p5 allows for changes, rather than static
text, images, etc.
let bgColor;
let button;
let button2; 
let button3;
let button4; 
let button5;
let x = 200;
let y = 200;
let slider;
let input;
function setup() { 
canvas = createCanvas(400, 400);
bgColor = color(0, 0, 0);
button = createButton('Change BG Color');
button2 = createButton('Move Right');
button3 = createButton('Move Down');
button4 = createButton('Move Left');
button5 = createButton('Move Up');
button.mousePressed(changeColor);
button2.mousePressed(moveRight);
button3.mousePressed(moveDown);
button4.mousePressed(moveLeft);
button5.mousePressed(moveUp);
slider = createSlider(10, 100, 50);
input = createInput('Type Your Name');
}
function moveLeft(){
x = x-5;
}
function moveUp(){
y = y-5;
}
function moveRight(){
x = x+5;
}
function moveDown(){
y = y+5;
}
function changeColor(){
bgColor = color(random(255), 100, 0);
}
function draw() { 
background(bgColor);
fill(255, 0, 0);
ellipse(x, y, slider.value(), slider.value());
text('hello:  ' + input.value(), 10, 20);
if(x>width){
x=0;
}
if(y>height){
y=0;
}
if(x<0){
x=width;
}
if(y<0){
y=height;
}
whereas the paragraph under canvas is created within p5.  Both are
possible but doing it in p5 allows for changes, rather than static
text, images, etc.
let bgColor;
let button;
let button2; 
let button3;
let button4; 
let button5;
let x = 200;
let y = 200;
function setup() { 
canvas = createCanvas(400, 400);
bgColor = color(0, 0, 0);
button = createButton('Change BG Color');
button2 = createButton('Move Right');
button3 = createButton('Move Down');
button4 = createButton('Move Left');
button5 = createButton('Move Up');
button.mousePressed(changeColor);
button2.mousePressed(moveRight);
button3.mousePressed(moveDown);
button4.mousePressed(moveLeft);
button5.mousePressed(moveUp);
}
function moveLeft(){
x = x-5;
}
function moveUp(){
y = y-5;
}
function moveRight(){
x = x+5;
}
function moveDown(){
y = y+5;
}
function changeColor(){
bgColor = color(random(255), 100, 0);
}
function draw() { 
background(bgColor);
fill(255, 0, 0);
ellipse(x, y, 50, 50);
whereas the paragraph under canvas is created within p5.  Both are
possible but doing it in p5 allows for changes, rather than static
text, images, etc.
let canvas;
let h1;
let x = 200;
let y = 200;
function setup() { 
canvas = createCanvas(400, 400);
canvas.position(0, 220);
h1 = createElement('h1', 'My Favorite Numbers Are...');
h1.position(0, 620);
}
function mousePressed(){
createP("my favorite number is " + floor(random(1, 10)));
} 
function draw() { 
clear();
ellipse(x, y, 50, 50);
h1.position(x, y);
x = x + random(-5, 5);
whereas the paragraph under canvas is created within p5.  Both are
possible but doing it in p5 allows for changes, rather than static
text, images, etc.
function setup() { 
createCanvas(400, 400);
createElement('h1', 'My Favorite Numbers Are...');
}
function mousePressed(){
createP("my favorite number is " + floor(random(1, 10)));
} 
function draw() { 
background(220);
ellipse(width/2, height/2, 50, 50);
***********************************************************************************
This program creates waveform objects that when bounced off of one another 
generate a random waveform (weighted toward sine wave).  The images are assigned 
randomly based on a dataset of four images.  The frequency is assigned randomly
based on a dataset of assigned frequencies.  
mouseX is mapped to the feedback in a delay method from the p5.sound library.
mouseY is reverse mapped to the lowpass frequency in a filter method from the 
p5.sound library.
***********************************************************************************
let waveForms = [];
let waveImage = [];
let freqArray = [240, 480, 720, 960, 1200, 1800];
let oscType = ["sine", "sine", "square", "triangle", "sawtooth"];
let showText = 0;
let y = 300;
playing = true;
function preload() {
waveImage[0] = loadImage('wave1.png');
waveImage[1] = loadImage('wave2.png');
waveImage[2] = loadImage('wave3.png');
waveImage[3] = loadImage('wave4.png');
}
function setup() {
createCanvas(400, 700);
Methods from p5.sound relating to creating the oscillator, delay, and filter
osc = new p5.Oscillator();
delay = new p5.Delay();
env = new p5.Env(0.1, 1.2, 1.2, 0.1);
env.setADSR(5.9, 0.25, 0.1, 0.1);
filter = new p5.LowPass();
osc.connect(filter);
showText = new Showtext();
for (let i = 0; i < 4; i++) {
let r = floor(random(0, waveImage.length));
waveForms[i] = new WaveForm(width / 2, y, waveImage[r]);
y = y + 75;
}
}
function draw() {
background(0);
showText.callText();
let freq = map(mouseY, 0, height, 500, 2000);
filter.freq(freq);
filter.res(50);
for (let i = 0; i < waveForms.length; i++) {
waveForms[i].display();
waveForms[i].move();
waveForms[i].bounce();
for (let j = 0; j < waveForms.length; j++) {
if (i != j && waveForms[i].intersects(waveForms[j])) {
waveForms[i].changeDirectionOnCollision(waveForms[j]);
waveForms[i].slowDownWave(waveForms[j]);
waveForms[i].setOscType(waveForms[j]);
waveForms[i].changePitch(waveForms[j]);
waveForms[i].setFeedbackAmount(waveForms[j]);
}
}
}
}let waveForms = [];
let waveImage = [];
let osc = [];
playing = true;
function preload() {
waveImage[0] = loadImage('wave1.png');
waveImage[1] = loadImage('wave2.png');
waveImage[2] = loadImage('wave3.png');
waveImage[3] = loadImage('wave4.png');
}
function setup() {
createCanvas(600, 600);
osc = new p5.Oscillator();
osc.setType('sawtooth');
osc.amp(0);
osc.start();
for (let i = 0; i < 5; i++) {
let r = floor(random(0, waveImage.length));
waveForms[i] = new WaveForm(random(width), random(height), waveImage[r], osc, osc.freq);
}
}
function draw() {
background(255);
for (let i = 0; i < waveForms.length; i++) {
waveForms[i].display();
waveForms[i].move();
waveForms[i].bounce();
for (let j = 0; j < waveForms.length; j++) {
if (i != j && waveForms[i].intersects(waveForms[j])) {
waveForms[i].changeDirection(waveForms[j]);
}
}
}
}let bubbles = [];
function setup() {
createCanvas(600, 600);
for (let i = 0; i < 20; i++) {
bubbles[i] = new Bubble(random(width), random(height), 4, color(255, 255, 255));
}
}
function draw() {
background(0);
for (let i = bubbles.length -1 ; i > 0; i--) {
if(!bubbles[i]) continue;
bubbles[i].move();
bubbles[i].display();
bubbles[i].bounce();
for (let j = bubbles.length - 1; j > 0; j--) {
if (i == j) continue;
if (i != j && bubbles[i].intersects(bubbles[j])) {
bubbles[i].switched = !bubbles[i].switched;
bubbles.splice(i, 1);
bubbles.splice(j, 1);
bubbles[i].changeColor();
}
}
}
}let bubbles = [];
function setup() {
createCanvas(600, 600);
for (let i = 0; i < 20; i++) {
bubbles[i] = new Bubble(random(width), random(height), 5, color(255, 255, 255));
}
}
function draw() {
background(0);
for (let i = 0; i < bubbles.length; i++) {
bubbles[i].move();
bubbles[i].display();
bubbles[i].bounce();
for (let j = 0; j < bubbles.length; j++) {
if (i != j && bubbles[i].intersects(bubbles[j])) {
bubbles[i].switched = !bubbles[i].switched;
bubbles[i].changeColor();
}
}
}
}let bubble;
function setup() {
createCanvas(600, 600);
bubble = new Bubble(200, 300, 40, 255);
bubble2 = new Bubble(400, 100, 20, 255);
}
function draw() {
background(0);
bubble.move();
bubble.display();
bubble.bounce();
bubble.grow();
bubble2.move();
bubble2.display();
bubble2.bounce();
bubble2.grow();
if (bubble.intersects(bubble2)) {
bubble.changeDirection();
bubble2.changeDirection();
bubble.changeColor();
bubble2.changeColor();
}
}let ball1;
let ball2;
let ball3;
function setup() {
createCanvas(400, 400);
ball1 = new Ball(random(width) / 2, height / 2, 25, 3, 2);
ball2 = new Ball(width, random(height), 25, 3, 2);
ball3 = new Ball(width, random(height), 25, 3, 2);
}
function draw() {
background(0);
ball1.run();
ball2.run();
ball3.run();
ball1.collisionCheck(ball2);
ball1.collisionCheck(ball3);
ball1.colorRed();
ball1.isEntering(ball2);
ball1.isEntering(ball3);
ball2.collisionCheck(ball1, ball3);
ball2.colorRed();
ball2.isEntering(ball1, ball3);
ball3.collisionCheck(ball1, ball2);
ball3.colorRed();
ball3.isEntering(ball1, ball2);
}
function bounce(pos, speed, min, max) {
if (pos < min || pos > max) {
speed *= -1;
}
return speed;
}let ball1;
let ball2;
function setup() {
createCanvas(400, 400);
ball1 = new Ball(random(width) / 2, height / 2, 25, 3, 2);
ball2 = new Ball(width, random(height), 25, 3, 2);
}
function draw() {
background(0);
ball1.run();
ball2.run();
}
function bounce(pos, speed, min, max) {
if (pos < min || pos > max) {
speed *= -1;
}
return speed;
}
function setup() {
createCanvas(400, 400);
x = width / 2;
y = height / 2;
xspeed = 1;
yspeed = 3;
}
function draw() {
background(220);
display();
update();
}
function display() {
ellipse(x, y, 50, 50);
}
function update() {
if (x < 0 || x > width) {
xspeed *= -1;
}
if (y < 0 || y > height) {
yspeed *= -1;
}
x += xspeed;
y += yspeed;
let balls = [];
function setup() {
createCanvas(400, 400);
for (let i = 0; i < 20; i++) {
balls.push(new Ball(random(width), random(height), 3, 2));
}
}
function draw() {
background(0);
for (let i = 0; i < balls.length; i++) {
for (let j = 0; j < balls.length; j++) {
balls[i].isNear(balls[j]);
}
balls[i].run();
}
}
function bounce(pos, speed, min, max) {
if (pos < min || pos > max) {
speed *= -1;
}
return speed;
}let ball1;
let ball2;
function setup() {
createCanvas(400, 400);
ball1 = new Ball(random(width) / 2, height / 2, 25, 3, 2);
ball2 = new Ball(width, random(height), 25, 3, 2);
}
function draw() {
background(0);
ball1.run();
ball2.run();
}
function bounce(pos, speed, min, max) {
if (pos < min || pos > max) {
speed *= -1;
}
return speed;
}
let bubbles = [];
function setup() {
createCanvas(400, 400);
}
function mousePressed() {
for (let i = 0; i < bubbles.length; i++) {
bubbles[i].clicked();
}
}
function mouseDragged() {
bubbles.push(new Bubble(mouseX, mouseY));
}
function draw() {
background(0);
for (let i = bubbles.length - 1; i > 0; i--) {
bubbles[i].update();
bubbles[i].display();
if (bubbles[i].lifespan < 0) {
bubbles.splice(i, 1);
}
}
let bubbles = [];
function setup() {
createCanvas(400, 400);
}
function mousePressed() {
for (let i = 0; i < bubbles.length; i++) {
bubbles[i].clicked();
}
}
function mouseDragged() {
bubbles.push(new Bubble(mouseX, mouseY));
}
function draw() {
background(0);
for (let i = bubbles.length - 1; i > 0; i--) {
bubbles[i].update();
bubbles[i].display();
if (bubbles[i].lifespan < 0) {
bubbles.splice(i, 1);
}
}
let bubbles = [];
function setup() {
createCanvas(400, 400);
}
function mousePressed(){
for (let i = 0; i < bubbles.length; i++) {
bubbles[i].clicked();
}
}
function mouseDragged(){
bubbles.push(new Bubble(mouseX, mouseY));
}
function draw() {
background(0);
for (let i = 0; i < bubbles.length; i++) {
bubbles[i].move();
bubbles[i].display();
}
if (bubbles.length > 50){
bubbles.splice(0, 1);
}
}
let bubbles = [];
function setup() {
createCanvas(400, 400);
}
function mouseDragged(){
bubbles.push(new Bubble(mouseX, mouseY));
}
function draw() {
background(0);
for (let i = 0; i < bubbles.length; i++) {
bubbles[i].move();
bubbles[i].display();
}
if (bubbles.length > 50){
bubbles.splice(0, 1);
}
}
let bubbles = [];
function setup() {
createCanvas(400, 400);
}
function mouseDragged(){
bubbles.push(new Bubble(mouseX, mouseY));
}
function draw() {
background(0);
for (let i = 0; i < bubbles.length; i++) {
bubbles[i].move();
bubbles[i].display();
}
if (bubbles.length > 50){
bubbles.splice(0, 1);
}
}
function Bubble(x, y) {
this.x = mouseX;
this.y = mouseY;
this.display = function() {
stroke(255);
noFill();
ellipse(this.x, this.y, 24, 24);
}
this.move = function() {
this.x = this.x + random(-1, 1);
this.y = this.y + random(-1, 1);
}
}
x: random(width),
y: random(height),
display: function() {
stroke(255);
noFill();
ellipse(this.x, this.y, 24, 24);
},
move: function() {
this.x = this.x + random(-1, 1);
this.y = this.y + random(-1, 1);
}
}
}
let bubbles = [];
function setup() {
createCanvas(400, 400);
for (let i = 0; i < 400; i++) {
bubbles[i] = new Bubble();
}
}
function draw() {
background(0);
for (let i = 0; i < bubbles.length; i++) {
bubbles[i].move();
bubbles[i].display();
}
}
function Bubble() {
this.x = random(width);
this.y = random(height);
this.display = function() {
stroke(255);
noFill();
ellipse(this.x, this.y, 24, 24);
}
this.move = function() {
this.x = this.x + random(-1, 1);
this.y = this.y + random(-1, 1);
}
}
x: random(width),
y: random(height),
display: function() {
stroke(255);
noFill();
ellipse(this.x, this.y, 24, 24);
},
move: function() {
this.x = this.x + random(-1, 1);
this.y = this.y + random(-1, 1);
}
}
}
let bubbles = [];
function setup() {
createCanvas(400, 400);
for( let i = 0; i <400; i++){
bubbles[i] = {
x: random(width),
y: random(height),
display: function() {
stroke(255);
noFill();
ellipse(this.x, this.y, 24, 24);
},
move: function() {
this.x = this.x + random(-1, 1);
this.y = this.y + random(-1, 1);
}
}
}
}
function draw() {
background(0);
for (let i = 0; i < bubbles.length; i++) {
bubbles[i].move();
bubbles[i].display();
}
}let bubble ={
x: 300, 
y: 200, 
display: function(){
stroke(255);
noFill();
ellipse(this.x, this.y, 24, 24);
},
move: function(){
this.x = this.x +random (-1, 1);
this.y = this.y + random(-1, 1);
}
}
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(0);
bubble.move();
bubble.display();
}let nums = [100, 25, 46, 72];
function setup() { 
createCanvas(500, 400);
} 
function draw() { 
background(0);
stroke(255);
noFill();
for(let i = 0; i < 4; i++){
ellipse(i * 100 +100, 200, nums[i], nums[i]);
}
}
let words = ["happy", "sad", "ecstatic", "confused"];
index = 0;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(0);
fill(255); 
stroke(255);
textSize(32);
text(words[random(0, words.length)], 12, 200);
}
function mousePressed(){
index = index+1;
let xCoord;
let yCoord;
let speedX;
let speedY;
console.log(speedX, " , ", speedY);
let rad;
let on = true;
xCoord = 600;
yCoord = 300;
speedX = 0.005;
speedY = 0.007;
rad = 25;
function setup() {
createCanvas(600, 600);
background(0);
}
function draw() {
button(25, 25, 50);
grid(0, 0, 25, 25);
}
function grid(x, y, colWidth, colHeight) {
strokeWeight(2);
let r = 0;
let g = 0;
let b = 0;
for (let x = 0; x <= width; x = x + colWidth) {
for (let y = 100; y <= height; y = y + colHeight) {
r = map(x, 0, width, 0, 255);
g = map(y, 0, height, 0, 255);
b = map(mouseX, 0, width, 0, 128);
c = dist(x, y, xCoord, yCoord);
push();
fill(r, g, b, c);
stroke(c);
rect(x, y, rad, rad);
stroke(c, c);
ellipse(x + rad / 2, y + rad / 2, rad, rad);
pop();
xCoord = xCoord + speedX;
yCoord = yCoord + speedY;
if ((xCoord < 0) || (xCoord > width)) {
speedX = -speedX;
}
if ((yCoord < 100) || (yCoord >= height)) {
speedY = -speedY;
}
if (on) {
fill(0, 255, 0);
} else {
fill(255, 0, 0);
}
}
}
}
function button(xLoc, yLoc, rad) {
fill(0, 255, 0);
stroke(255);
rect(xLoc, yLoc, rad, rad);
}
function mousePressed() {
if (mouseX > 25 && mouseX < 75 && mouseY > 25 && mouseY < 75) {
on = !on;
}
if (on) {
colorMode(HSB);
} else {
colorMode(RGB);
}
let xCoord;
let yCoord;
let speedX;
let speedY;
let rad;
let on = true;
function setup() {
createCanvas(600, 600);
background(0);
xCoord = random(width);
yCoord = random(height);
speedX = 0.005;
speedY = 0.005;
rad = 25;
}
function draw() {
console.log(speedX, " ", speedY);
fill(255, 0, 0);
button(25, 25, 50);
if (on) {
colorMode(HSB);
} else {
colorMode(RGB);
}
grid(0, 0, 25, 25);
}
function mousePressed(buttonX, buttonY, buttonWidth, buttonHeight) {
if (mouseX > 25 && mouseX < 75 && mouseY > 25 && mouseY < 75) {
on = !on;
}
}
function grid(x, y, colWidth, colHeight){
strokeWeight(2);
let r = 0;
let g = 0;
let b = 0;
for (let x = 0; x <= width; x = x + colWidth) {
for (let y = 100; y <= height; y = y + colHeight) {
r = map(x, 0, width, 0, 255);
g = map(y, 0, height, 0, 255);
b = map(mouseX, 0, width, 0, 128);
c = dist(x, y, xCoord, yCoord);
push();
fill(r, g, b, c);
stroke(c);
rect(x, y, rad, rad);
stroke(c, c);
ellipse(x+rad/2, y+rad/2, rad, rad);
pop();
xCoord = xCoord + speedX;
yCoord = yCoord + speedY;
if ((xCoord < 0) || (xCoord > width)) {
speedX = -speedX;
}
if ((yCoord < 100) || (yCoord >= height)) {
speedY = -speedY;
}
if (on) {
fill(0, 255, 0);
} else {
fill(255, 0, 0);
}
}
}
}
function button(xLoc, yLoc, rad){
stroke(255);
rect(xLoc, yLoc, rad, rad);
}
let x = 50;
let xSpeed; 
let y = 50; 
let ySpeed;
function setup() { 
createCanvas(400, 400);
xSpeed = 1; 
ySpeed = 1.4;
} 
function draw() { 
background(220);
ellipse(x, y, 50, 50);
x = x + xSpeed;
y = y + ySpeed;
xSpeed = bounce(x, xSpeed, 0, width);
ySpeed = bounce(y, ySpeed, 0, height);
}
function bounce(loc, speed, bottom, top){
if(loc<bottom || loc>top) {
}
return speed;
}
let x = 50;
let xSpeed; 
let y = 50; 
let ySpeed;
let x2 = 50;
let xSpeed2; 
let y2 = 50; 
let ySpeed2;
function setup() { 
createCanvas(400, 400);
xSpeed = 1; 
ySpeed = 1.4;
xSpeed2 = 4;
ySpeed2 = 1.6;
} 
function draw() { 
background(220);
ellipse(x, y, 50, 50);
ellipse(x2, y2, 30, 30);
x = x + xSpeed;
y = y + ySpeed;
x2 = x2 + xSpeed2;
y2 = y2 + ySpeed2; 
xSpeed = bounce(x, xSpeed, 0, width);
ySpeed = bounce(y, ySpeed, 0, height);
xSpeed2 = bounce(x2, xSpeed2, 0, width);
ySpeed2 = bounce(y2, ySpeed2, 0, height); 
}
function bounce(loc, speed, bottom, top){
if(loc<bottom || loc>top) {
}
return speed;
}
let w;
let h;
let cw;
let ch;
let cols = 10;
let rw;
let rh;
let rows = 5;
function setup() {
createCanvas(400, 400);
}
function draw() {
cw = width / cols;
ch = height;
rw = width;
rh = height / rows;
stroke(0);
for (let cn = 0; cn < cols; cn++) {
let x = cn * cw;
for (let rn = 0; rn < rows; rn++) {
let y = rn * rh;
rect(x, y, cw, rh);
}
}
let bubble = {
x: 300,
y: 200,
display: function () {
stroke(255);
strokeWeight(2);
noFill();
ellipse(this.x, this.y, 25, 25);
}, move: function () {
this.x = this.x + random(-1, 1);
this.y = this.y + random(-1, 1);
}
}
let bubble2 = {
x: 100,
y: 200,
display: function () {
stroke(255);
strokeWeight(2);
noFill();
ellipse(this.x, this.y, 25, 25);
}, move: function () {
this.x = this.x + random(-1, 1);
this.y = this.y + random(-1, 1);
}
}
function setup() {
createCanvas(400, 400);
}
function draw() {
background(0);
bubble.move();
bubble.display();
bubble2.move();
bubble2.display();
}
let bubble = {
x: 300,
y: 200,
}
function setup() {
createCanvas(400, 400);
}
function draw() {
background(0);
move();
display();
}
function move() {
bubble.x = bubble.x + random(-1, 1);
bubble.y = bubble.y + random(-1, 1);
}
function display() {
stroke(255);
strokeWeight(0.8);
noFill();
ellipse(bubble.x, bubble.y, 25, 25);
}
var x = 20; 
function setup() { 
createCanvas(400, 400);
ellipseMode(CENTER);
frameRate(8);
} 
function draw() { 
stroke(0);
strokeWeight(1.5);
background(0, 255, 0);
fill(255);
alien(width/2, height/2, 50);
alien(width/4, height/2, 50);
}
function alien(xLoc, yLoc, diameter){
rect(xLoc, yLoc, diameter, diameter);
}
function setup() {
createCanvas(400, 400);
noStroke();
}
function draw() {
stroke(0);
background(220);
for (let x = 0; x < width; x = x + 25) {
for (let y = 0; y < height; y = y + 25) {
rect(x, y, 25, 25);
}
}
}function setup() {
createCanvas(600, 400);
}
function draw() {
background(220);
for (let i = 0; i < 10; i++) {
if (mouseX >= i * width / 10 && mouseX < (i + 1) * width / 10 && i<5)  {
stroke(0);   
fill(0, 0, 255);
} else if(mouseX >= i * width / 10 && mouseX < (i + 1) * width / 10 && i>=5){
stroke(0); 
fill(255,0,0);
} else {
stroke(0); 
fill(255);
}
rect(i / 10 * width, 0, width / 10, height);
}
}
VARIABLES FOR THE FRACTAL
JESSE'S VARIABLES
let btn3;
let opt;
VARIABLES FOR UI ELEMENTS
let btn1;
let btn2;
let sldr1;
let dragging;
let temp;
function setup() {
createCanvas(600, 600);
angleMode(DEGREES);
colorMode(HSB, 100);
rad = 200;
n = 8;
c = 90;
colorSpd = 1;
opt = 2
btn2 = new Button(70, 50, 30, 30, 5, "-");
btn3 = new Button(50, 100, 30, 30, 5, "rnd");
dragging = false;
}
function draw() {
push();
noFill();
fractal(n, rad, c);
pop();
textAlign(LEFT, TOP);
fill(0, 0, 80);
text("Recursion: " + n, 30, 30);
btn1.display();
btn2.display();
btn3.display();
textAlign(LEFT, TOP);
fill(0, 0, 80);
text("Color", 350, 30);
sldr1.display();
for (i = 0; i < 220; i++) {
push();
stroke(map(i, 0, 219, 90, 10), 100, 100);
line(350 + i, 65, 350 + i, 75);
pop();
}
console.log(mouseX, " ", mouseY, " ", rad);
}
VISUAL DESIGN PART
function fractal(i, r, h) {
stroke(h, 100, map(i, 1, 8, 90, 10));
ellipse(0, 0, r, r);
if (i > 1) {
push();
translate(-(r / 2) - (r / 4), 0);
rotate(-90);
fractal(i - 1, r / 2, h);
pop();
push();
translate(r / 2 + r / 4, 0);
rotate(90);
fractal(i - 1, r / 2, h);
pop();
push();
translate(0, -(r / 2) - (r / 4));
fractal(i - 1, r / 2, h);
pop();
}
}
UI PART
function Button(paraX, paraY, paraW, paraH, paraR, paraLabel) {
this.display = function() {
noStroke();
if (mouseX >= this.x && mouseX <= (this.x + this.w) && mouseY >= this.y && mouseY <= (this.y + this.h))
fill(this.rollOverBtnColor);
else
fill(this.btnColor);
rect(this.x, this.y, this.w, this.h, this.r);
textAlign(CENTER, CENTER);
if (mouseX >= this.x && mouseX <= (this.x + this.w) && mouseY >= this.y && mouseY <= (this.y + this.h))
fill(this.rollOverTxtColor);
else
fill(this.labelColor);
text(this.label, this.textX, this.textY);
}
}
function Slider(paraRailX, paraRailY, paraRailL, paraHandleW, paraHandleH, paraHandleR) {
this.railX = paraRailX;
this.railY = paraRailY;
this.railL = paraRailL;
this.handleW = paraHandleW;
this.handleH = paraHandleH;
this.handleR = paraHandleR;
this.handleX = this.railX;
this.handleY = this.railY;
this.handleRightBoundary = this.railX + this.railL - this.handleW;
this.railColor = color(0, 0, 80);
this.handleColor = color(0, 0, 50);
this.display = function() {
noStroke();
fill(this.railColor);
rect(this.railX, this.railY, this.railL, this.handleH, this.handleR);
fill(this.handleColor);
rect(this.handleX, this.handleY, this.handleW, this.handleH, this.handleR);
if (dragging) {
this.handleX += (mouseX - pmouseX);
this.handleX = constrain(this.handleX, this.railX, this.handleRightBoundary);
c = floor(map(this.handleX, this.railX, this.handleRightBoundary, 90, 10));
}
MOUSE EVENT HANDLING
function mouseClicked() {
if (mouseX >= btn1.x && mouseX <= (btn1.x + btn1.w) && mouseY >= btn1.y && mouseY <= (btn1.y + btn1.h))
if (n < 8) n++;
if (mouseX >= btn2.x && mouseX <= (btn2.x + btn2.w) && mouseY >= btn2.y && mouseY <= (btn2.y + btn2.h))
if (n > 1) n--;
if (mouseX >= btn3.x && mouseX <= (btn3.x + btn3.w) && mouseY >= btn3.y && mouseY <= (btn3.y + btn3.h))
if (opt > 1) n = round(random(1, 8));
if (mouseX >= btn3.x && mouseX <= (btn3.x + btn3.w) && mouseY >= btn3.y && mouseY <= (btn3.y + btn3.h))
if (opt > 1) rad = round(random(150, 200));
if (mouseX >= btn3.x && mouseX <= (btn3.x + btn3.w) && mouseY >= btn3.y && mouseY <= (btn3.y + btn3.h))
if (opt > 1) c = random(255);
}
function mousePressed() {
if (mouseX >= sldr1.handleX && mouseX <= (sldr1.handleX + sldr1.handleW) && mouseY >= sldr1.handleY && mouseY <= (sldr1.handleY + sldr1.handleH))
dragging = true;
}
function mouseReleased() {
dragging = false;
function setup() { 
createCanvas(400, 400);
background(0, 0, 0);
} 
function draw() { 
strokeWeight(.1);
let r=0;
let g=0;
for(let x=10; x<=width; x+=40){
for(let y=10; y<=height; y+=40){
r = map(x, 0, width, 0, 255);
g = map(y, 0, height, 0, 255);
b = map(mouseX, 0, width, 0, 255);
fill(r, g, b);
stroke(255);
rect(x, y, 25, 25);
}
}
}
let a = 0;
function setup() {
createCanvas(400, 400);
angleMode(DEGREES);
}
function draw() {
background(220);
push();
translate(200, 200);
rotate(a++);
rect(0, 0, 50, 50);
pop(0);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
for( i = 0; i < 10; i++){
rect(i*width/10, 0, width/10, height);
console.log(i);
}
}let r1 = false;
let r2 = false; 
let r3 = false;
let isOn = false;
function setup() { 
createCanvas(400, 400);
background(220);
} 
function draw() { 
fill(255, 0, 0);
if(mouseX < width/3){
r1 = !r1;
} else if(mouseX < 2*width/3){
r2=!r2;
} else {
r3=!r3;
}
if(r1){
rect(0, 0, width/3, height);
}
if(r2){
rect(width/3, 0, width/3, height);
}
if(r3){
rect(2*width/3, 0, width/3, height);
}
let xCoord;
let yCoord;
let speedX;
let speedY;
function setup() { 
createCanvas(600, 400);
background(0, 0, 0);
xCoord = random(width);
yCoord = random(height);
speedX = random(.0001,.01);
speedY = random(.0001,.01);
} 
function draw() { 
strokeWeight(2);
let r=0;
let g=0;
for(let x=0; x<=width; x=x+25){
for(let y=0; y<=height; y=y+25){
r = map(x, 0, width, 0, 255);
g = map(y, 0, height, 0, 255);
b = map(mouseX, 0, width, 0, 255);
c = dist(x, y, xCoord, yCoord);
fill(r, g, b, c);
stroke(c);
ellipse(x, y, 25, 25);
xCoord = xCoord + speedX;
yCoord = yCoord + speedY;
if((xCoord < 0) || (xCoord > width)){
speedX = -speedX;
}
if((yCoord < 0) || (yCoord > height)){
speedY = -speedY;
}
}
}
}
let xCoord;
let yCoord;
let speedX;
let speedY;
let rad;
let on = true;
function setup() {
createCanvas(600, 600);
background(0);
xCoord = random(width);
yCoord = random(height);
speedX = 0.005;
speedY = 0.005;
rad = 25;
}
function draw() {
console.log(speedX, " ", speedY);
fill(255, 0, 0);
stroke(255);
rect(25, 25, 50, 50);
if (on) {
colorMode(HSB);
} else {
colorMode(RGB);
}
strokeWeight(2);
let r = 0;
let g = 0;
let b = 0;
for (let x = 0; x <= width; x = x + 25) {
for (let y = 100; y <= height; y = y + 25) {
r = map(x, 0, width, 0, 255);
g = map(y, 0, height, 0, 255);
b = map(mouseX, 0, width, 0, 128);
c = dist(x, y, xCoord, yCoord);
push();
fill(r, g, b, c);
stroke(c);
rect(x, y, rad, rad);
stroke(c, c);
ellipse(x+rad/2, y+rad/2, rad, rad);
pop();
xCoord = xCoord + speedX;
yCoord = yCoord + speedY;
if ((xCoord < 0) || (xCoord > width)) {
speedX = -speedX;
}
if ((yCoord < 100) || (yCoord >= height)) {
speedY = -speedY;
}
if (on) {
fill(0, 255, 0);
} else {
fill(255, 0, 0);
}
}
}
}
function mousePressed() {
if (mouseX > 25 && mouseX < 75 && mouseY > 25 && mouseY < 75) {
on = !on;
}
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
noFill();
if(mouseX>200 && mouseX<300 && mouseY > 200 && mouseY<300){
fill(255, 0, 0);
}
rect(200, 200, 100, 100);
}let x;
let y;
let diam = 50;
let randCol = 255;
let speed = 3;
function setup() { 
createCanvas(600, 600);
x = random(width);
y = random(height);
background(0);
} 
function draw() { 
fill(random(220, randCol), random(40,randCol), 0);
ellipse(x, y, diam, diam);
if(x > width){
speed=-3;
y=y+random(50);
}
if(x < 0){
speed=3;
y=y-random(50);
}
if(y > height){
speed=-3;
x=x+random(50);
}
if(y < 0){
speed=3;
x=x+random(50);
}
if(x>300){
background(0, 150, 150, 30);
}
if(x<300){
background(150, 0, 0, 30);
}
x=x+speed;
y=y+speed;
}
function setup() { 
createCanvas(400, 400);
rectMode(CENTER);
} 
function draw() { 
background(220);
rect(width/2, height/2, width/2, height/2);
}var x = 0;
var y = 25;
var diam = 50;
function setup() { 
createCanvas(400, 400);
background(0);
} 
function draw() { 
ellipse(x, y, diam, diam);
if(x < width+diam+1) {
x= x+5;
} 
if(x > width+diam){
x=0;
y=y+50;
}
if(y > height+diam+1){
y=diam/2;
}
}var x = 20; 
function setup() { 
createCanvas(400, 400);
ellipseMode(CENTER);
frameRate(8);
} 
function draw() { 
stroke(0);
strokeWeight(1.5);
background(0, 255, 0);
fill(0, 129, 255);
rect(100, 200, 200, 100);
rect(175, 300, 50, 50);
fill(0, 0, 0);
ellipse(150, 250, random(15, 20), random(15, 20))
ellipse(250, 250, random(15, 20), random(15, 20))
noFill();
rect(225, 225, 50, 50);
rect(125, 225, 50, 50);
line(175, 250, 225, 250);
line(125, 225, 100, 200);
line(275, 225, 300, 200);
fill(0, 0, 0);
line(250, 200, 250, 100);
line(150, 200, 150, 100);
ellipse(150, 90, x, x);
ellipse(250, 90, x, x);
fill(255);
rect(180, 285, 10, random(10, 40));
rect(210, 285, 10, random(10, 40));
line(175, 310, 150, 340);
line(225, 310, 250, 340);
line(190, 350, 175, 370)
line(210, 350, 195, 370)
stroke(255, 0, 0);
line(120, 285, 280, 285);
fill(255, 255, 0);
noStroke();
arc(0, 0, 100, 100, 0, HALF_PI);
if(x<60){
x++;
}
if(x>59){
x=0;
}
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
fill(100, 0, 0);
rect(225, 225, 50, 50);
rect(125, 225, 50, 50);
fill(100, 200, 200, 20);
rect(200, 200, 100, 100);
rect(100, 200, 100, 100);
line(width/2, height/2m
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
fill(100, 0, 0);
rect(225, 225, 50, 50);
rect(125, 225, 50, 50);
fill(100, 200, 200, 20);
rect(200, 200, random(95,100_, 100);
rect(100, 200, 100, 100);
line(width/2, height/2);
fill(255);
fill(45, random(45), 145, 45);
arc(random(width), random(height), 25, 25, HALF_PI, HALF_PI);
}
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(0, 255, 255);
fill(255, 0, 0);
strokeWeight(30);
stroke(255, 0, 0);
line(0, 0, width, height);
strokeWeight();
fill(0, 200, 50);
ellipse(width/2, height/2, 250, 200); 
fill(0, 0, 255);
rect(280, 150, 45, 45);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
fill(0, 255, 255);
ellipse(200,200, 255, 255);
}