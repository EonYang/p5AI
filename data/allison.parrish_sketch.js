let font;
let fontData;
function groupByContour(cmds) {
contours = [];
current = [];
for (let cmd of cmds) {
current.push(cmd);
if (cmd.type == 'Z') {
contours.push(current);
current = [];
}
}
return contours;
}
function clockwise(cmds) {
let sum = 0;
for (let i = 0; i < cmds.length - 1; i++) {
let a = cmds[i];
let b = cmds[i+1];
if (!(a.hasOwnProperty('x') && b.hasOwnProperty('x'))) {
continue;
}
sum += (b.x - a.x) * (b.y + a.y);
}
return sum < 0;
}
function centeredBoundingBox(cmds) {
let maxx = max(cmds.filter(cmd => cmd.x).map(cmd => cmd.x));
let maxy = max(cmds.filter(cmd => cmd.y).map(cmd => cmd.y));
let minx = min(cmds.filter(cmd => cmd.x).map(cmd => cmd.x));
let miny = min(cmds.filter(cmd => cmd.y).map(cmd => cmd.y));
let center = [(minx + maxx) / 2, (miny + maxy) / 2];
let newCmds = [];
for (let cmd of cmds) {
let cmdp = {
type: cmd.type
};
for (let prop of ['x', 'x1', 'x2']) {
cmdp[prop] = cmd[prop] - center[0];
}
for (let prop of ['y', 'y1', 'y2']) {
cmdp[prop] = cmd[prop] - center[1];
}
newCmds.push(cmdp);
}
return [center, newCmds];
}
function drawContours(contours) {
let inShape = false;
for (let i = 0; i < contours.length; i++) {
if (clockwise(contours[i])) {
beginShape();
drawContour(contours[i]);
endShape(CLOSE);
}
else {
let [center, newCmds] = centeredBoundingBox(contours[i]);
push();
noStroke();
fill(240);
translate(center[0], center[1]);
rotate(mouthAngle + map(noise(i, frameCount*0.01), 0, 1, -0.25, 0.25));
scale(mouthWidth + map(noise(i, frameCount*0.01), 0, 1, -0.25, 0.25),
mouthHeight + map(noise(i, frameCount*0.01), 0, 1, -0.25, 0.25));
beginShape();
drawContour(newCmds);
endShape();
pop();
}
}
}
function drawContour(cmds) {
for (let i = 0; i < cmds.length; i++) {
cmd = cmds[i];
switch (cmd.type) {
case 'M':
case 'Z':
break;
case 'L':
vertex(cmd.x, cmd.y);
break;
case 'C':
bezierVertex(
cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
break;
case 'Q':
quadraticVertex(cmd.x1, cmd.y1, cmd.x, cmd.y);
break;
}    
}
}
function preload() {
fontData = loadBytes('Roboto-Black.ttf');
}
let path;
let videoInput;
let ctracker;
let fsize = 175;
function setup() {
createCanvas(800, 800);
font = opentype.parse(fontData.bytes.buffer);
path = font.getPath("Rapid", 0, 0, fsize);
path.commands = path.commands.concat(
font.getPath("foxes", 0, fsize * 0.9, fsize).commands);
path.commands = path.commands.concat(
font.getPath("quoted", 0, 2 * fsize * 0.9, fsize).commands);
path.commands = path.commands.concat(
font.getPath("Borges", 0, 3 * fsize * 0.9, fsize).commands);
videoInput = createCapture();
videoInput.size(400, 300);
videoInput.hide();
ctracker = new clm.tracker();
ctracker.init();
ctracker.start(videoInput.elt);
}
function commandTransform(cmds, callback) {
let transformed = [];
for (let cmd of cmds) {
let newCmd = {type: cmd.type}
for (let pair of [['x', 'y'], ['x1', 'y1'], ['x2', 'y2']]) {
if (cmd.hasOwnProperty(pair[0]) && cmd.hasOwnProperty(pair[1])) {
let result = callback(cmd[pair[0]], cmd[pair[1]]);
newCmd[pair[0]] = result[0];
newCmd[pair[1]] = result[1];
}
}
transformed.push(newCmd);
}
return transformed;
}
let mouthWidth = 0;
let mouthHeight = 0;
let mouthAngle = 0;
function draw() {
background(240);
fill(40);
noStroke();
push();
translate(25, fsize);
drawContours(
groupByContour(
commandTransform(path.commands, function(x, y) {
let newX = x;
let newY = y;
return [newX, newY];
})
)
);
pop();
let positions = ctracker.getCurrentPosition();
if (positions.length > 0) {
fill(255);
stroke(0);
mouthWidth = pow(map(
(positions[50][0] - positions[44][0]),
0, positions[32][0] - positions[27][0],
0, 1.5), 2);
mouthHeight = pow(abs(map(
(positions[57][1] - positions[60][1]),
0, positions[62][1] - positions[33][1],
0, 1.5)), 2);
let slope = (positions[50][1] - positions[44][1]) / 
(positions[50][0] - positions[44][0]);
mouthAngle = atan(slope) * -1;
}
translate(width,
height - 150);
scale(-0.5, 0.5);
image(videoInput, 0, 0);
if (positions.length > 0) {
fill(255, 128);
noStroke();
ellipse(positions[50][0], positions[50][1], 10, 10);
ellipse(positions[44][0], positions[44][1], 10, 10);
ellipse(positions[60][0], positions[60][1], 10, 10);
ellipse(positions[57][0], positions[57][1], 10, 10);
}
}class Tag {
constructor(x, y, shmorp) {
this.x = x;
this.y = y;
this.shmorp = shmorp;
}
meow() {
console.log("I got meowed!");
this.shmorp.increment();
}
}
class Counter {
constructor() {
this.count = 0;
}
increment() {
this.count++;
console.log("I got incremented!");
}
}
let tag;
let counter;
function setup() {
createCanvas(400, 400);
c1 = new Counter();
tag = new Tag(1, 2, c1);
tag.meow();
tag2 = new Tag(3, 4, c1);
tag2.meow();
console.log(c1.count);
}
function draw() {
background(220);
}let srcText = "In linguistics, a word is the smallest element that can be uttered in isolation with objective or practical meaning.";
let para;
let poemInOut = [
[4, 16],
[20, 24],
[12, 48],
[18, 24]
];
this is a test, <span>a</span>bso<span>fucking</span>lutely a test
function setup() {
noCanvas();
para = createP();
para.style('font-size', '72px');
para.style('margin', 0);
for (let i = 0; i < srcText.length; i++) {
let span = createSpan(srcText.charAt(i));
span.style('position: relative');
para.child(span);
}    
frameRate(4);
}
function parsepx(s) {
return float(s.replace(/px$/, ''));
}
function draw() {
let children = selectAll('span', para);
let inout = poemInOut[frameCount % poemInOut.length];
for (let i = 0; i < children.length; i++) {
if (i >= inout[0] && i < inout[1]) {
children[i].style('color: black');
}
else {
children[i].style('color: white');
}
}
}let gridX = 10;
let gridY = 10;
let grid = [];
function setup() {
createCanvas(400, 400);
for (let i = 0; i < gridX; i++) {
let thisRow = [];
for (let j = 0; j < gridY; j++) {
thisRow.push(0);
}
grid.push(thisRow);
}
console.log(grid);
}
function draw() {
background(220);
let rectSizeX = width/gridX;
let rectSizeY = height/gridY;
for (let i = 0; i < gridX; i++) {
for (let j = 0; j < gridY; j++) {
stroke(255);
fill(grid[i][j]);
rect(i * rectSizeX, j * rectSizeY,
rectSizeX, rectSizeY);
textAlign(CENTER, CENTER);
textSize(grid[i][j]);
text("a", i * rectSizeX, j * rectSizeY);
if (mouseX > i * rectSizeX && 
mouseX < (i * rectSizeX) + rectSizeX &&
mouseY > j * rectSizeY &&
mouseY < (j * rectSizeY) + rectSizeY) {
grid[i][j] = 255;
}
if (grid[i][j] > 0) {
grid[i][j]--;
}
}
}
}let srcText = "In linguistics, a word is the smallest element that can be uttered in isolation with objective or practical meaning.";
let para;
function setup() {
noCanvas();
para = createP();
para.style('font-size', '72px');
para.style('margin', 0);
let words = srcText.split(" ");
for (let i = 0; i < words.length; i++) {
let span = createSpan(words[i]);
span.style('position: relative');
para.child(span);
let space = createSpan(" ");
para.child(space);
}       
}
function parsepx(s) {
return float(s.replace(/px$/, ''));
}
function draw() {
let children = selectAll('span', para);
for (let span of children) {
span.style('font-size',
noise(span.html().length, frameCount*0.005)*100 + 'px');
}
}function setup() {
noCanvas();
let para = createP();
para.style('position', 'relative');
para.style('position: relative');
}let srcText = "In linguistics, a word is the smallest element that can be uttered in isolation with objective or practical meaning.";
let para;
function setup() {
noCanvas();
para = createP();
para.style('font-size', '72px');
para.style('margin', 0);
for (let i = 0; i < srcText.length; i++) {
let span = createSpan(srcText.charAt(i));
span.style('position: relative');
para.child(span);
}       
}
function parsepx(s) {
return float(s.replace(/px$/, ''));
}
function draw() {
let children = selectAll('span', para);
for (let span of children) {
span.style('top', parsepx(span.style('top')) + random(-0.5, 0.5) + 'px');
span.style('left', parsepx(span.style('left')) + random(-0.5, 0.5) + 'px');
}
}let video;
let poseNet;
let poses = [];
function setup() {
createCanvas(250, 250);
video = createCapture(VIDEO);
video.size(width, height);
poseNet = ml5.poseNet(video, function() {
console.log("model ready");
});
poseNet.on('pose', function(results) {
poses = results;
});
video.hide();
}
function draw() {
background(220);
tint(255, 64);
image(video, 0, 0, width, height);
if (poses.length > 0) {    
let nose = poses[0].pose.keypoints[0].position;
let leftEar = poses[0].pose.keypoints[3].position;
let rightEar = poses[0].pose.keypoints[4].position;
translate(
(leftEar.x + rightEar.x) / 2,
(leftEar.y + rightEar.y) / 2);
let slope = (leftEar.y - rightEar.y) / 
(leftEar.x - rightEar.x);
rotate(atan(slope));
fill(0);
textAlign(CENTER, CENTER);
textSize((leftEar.x - rightEar.x) * 0.5);
text("word", 0, 0);
}
}let mic;
function setup() {
createCanvas(250, 250);
mic = new p5.AudioIn();
mic.start();
}
function draw() {
background(220);
textAlign(CENTER, CENTER);
textSize(10 + mic.getLevel() * 1000);
text("word", width/2, height/2);
}function setup() {
createCanvas(250, 250);
}
function draw() {
background(220);
textAlign(LEFT, TOP);
textSize(48);
text("word",
constrain(mouseX, 0, width - textWidth("word")),
constrain(mouseY, 0, height - 48 + textDescent()));
}function setup() {
createCanvas(250, 250);
}
function draw() {
background(220);
translate(
width / 2 + (sin(frameCount * 0.1) * 75),
height / 2  + (cos(frameCount * 0.1) * 75));
textAlign(CENTER, CENTER);
textSize(48);
text("word", 0, 0);
}function setup() {
createCanvas(250, 250);
}
function draw() {
background(220);
translate(
width / 2 + (sin(frameCount * 0.1) * 75),
height / 2  + (cos(frameCount * 0.1) * 75));
textAlign(CENTER, CENTER);
textSize(48);
text("word", 0, 0);
}function setup() {
createCanvas(250, 250);
}
function draw() {
background(220);
translate(width/2, height/2);
rotate(frameCount * 0.1);
textAlign(CENTER, CENTER);
textSize(48);
text("word", 0, 0);
}function setup() {
createCanvas(250, 250);
}
function draw() {
background(220);
textSize(10 + (Math.pow((100 - (frameCount % 100)), 1.5)));
textAlign(CENTER, CENTER);
text("word", width/2, height/2);
}function setup() {
createCanvas(250, 250);
}
function draw() {
background(220);
textSize(10 + Math.pow(frameCount % 100, 1.5));
textAlign(CENTER, CENTER);
text("word", width/2, height/2);
}function setup() {
createCanvas(250, 250);
}
function draw() {
background(220);
textSize(48);
textAlign(CENTER, TOP);
text("word", width/2, height - frameCount % (width+48));
}function setup() {
createCanvas(250, 250);
}
function draw() {
background(220);
textSize(48);
textAlign(CENTER, BOTTOM);
text("word", width/2, frameCount % (width+48));
}function setup() {
createCanvas(250, 250);
}
function draw() {
background(220);
textSize(48);
textAlign(LEFT, CENTER);
text("word", width - frameCount % (width+textWidth("word")),
height/2);
}function setup() {
createCanvas(250, 250);
}
function draw() {
background(220);
textSize(48);
textAlign(RIGHT, CENTER);
text("word", frameCount % (width+textWidth("word")),
height/2);
let font;
let fontData;
function drawPathOutline(cmds) {
let cx = 0;
let cy = 0;
let startX = 0;
let startY = 0;
for (let cmd of cmds) {
if (cmd.hasOwnProperty('x')) {
stroke(128, 16);
line(cx, cy, 0, 100);
line(cmd.x, cmd.y, 0, 100);
}
stroke(0);
switch (cmd.type) {
case 'M':
startX = cmd.x;
startY = cmd.y;
cx = cmd.x;
cy = cmd.y;
break;
case 'L':
stroke(0);
line(cx, cy, cmd.x, cmd.y);
cx = cmd.x;
cy = cmd.y;
break;
case 'C':
stroke(0);
bezier(cx, cy, cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
cx = cmd.x;
cy = cmd.y;
break;
case 'Q':
beginShape();
vertex(cx, cy);
quadraticVertex(cmd.x1, cmd.y1, cmd.x, cmd.y);
endShape();
cx = cmd.x;
cy = cmd.y;
break;
case 'Z':
stroke(0);
line(cx, cy, startX, startY);
break;
}
}
}
function preload() {
fontData = loadBytes('NotoSansArabic-Regular.ttf');
}
let path;
let s = "الْحُرُوف الْعَرَبِيَّة";
function setup() {
createCanvas(400, 400);
font = opentype.parse(fontData.bytes.buffer);
path = font.getPath(s, 0, 0, 72);
}
function draw() {
background(255);
push();
translate(50, 125);
pop();
push();
noFill();
stroke(0);
strokeWeight(2);
translate(50, 225);
pop();
}let srcText = "Life is short and art long";
let words = srcText.split(" ");
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
for (let i = 0; i < words.length; i++) {
textSize(noise(i+frameCount*0.01+200) * 72);
text(words[i],
noise(i+frameCount*0.01)*width,
noise(i+frameCount*0.01+100)*height);
}
}let contents = "";
function setup() {
createCanvas(400, 400);
console.log("hello" + "there");
}
function draw() {
background(220);
textSize(24);
text(contents, 0, 0, width, height);
}
function keyTyped() {
contents += key;
console.log(contents);
}let someText = "Life is short and art long";
function setup() {
createCanvas(400, 400);
frameRate(10);
}
function draw() {
background(220);
textSize(250);
textAlign(CENTER, CENTER);
let currentIndex = frameCount % someText.length;
text(someText.substring(currentIndex, currentIndex+1),
width/2, height/2);
}let someText = "Life is short and art long";
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
textSize(32);
let lastIndex = int(map(mouseX, 0, width, 0, someText.length));
text(someText.substring(0, lastIndex), 0, height/2)
}let font;
let points;
function preload() {
font = loadFont("Sniglet Regular.otf")
}
function setup() {
createCanvas(600, 400);
points = font.textToPoints(
"Hello there", 0, 0, 72,
{sampleFactor: 0.9}
);
console.log(points);
}
function draw() {
background(0);
noStroke();
fill(255);
translate(0, 100);
for (let i = 0; i < points.length; i++) {
ellipse(points[i].x + map(noise(i+frameCount*0.01), 0, 1, -5, 5),
points[i].y + map(noise(i+frameCount*0.02, 100), 0, 1, -5, 5),
2, 2);
}
}let font;
function preload() {
font = loadFont("Sniglet Regular.otf")
}
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
if (mouseIsPressed) {
textFont("Bungee Shade");
}
else {
textFont(font);
}
textSize(map(sin(frameCount*0.01), -1, 1, 10, 72));
text("It was the best of times.", mouseX, mouseY)
}let srcText = "It was the best of times, it was the worst of times. Such good times.";
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
textSize(24);
rect(0, 24,  mouseX, mouseY);
textAlign(CENTER);
text(srcText, 0, 24, mouseX, mouseY);
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
fill(255, 0, 255);
stroke(0);
strokeWeight(5);
textSize(32);
textAlign(LEFT, XHEIGHT);
text("yummy éclaire 😧 猫", 200, 200);
strokeWeight(1);
ellipse(200, 200, 10, 10);
function pathCommands(s, offset) {
console.log(s, offset);
let instr = [];
let mode = '';
for (let t of s.split(' ')) {
if (t.charAt(0) == 'M' || t.charAt(0) == 'L') {
mode = t.charAt(0);
t = t.substr(1);
}
let coords = t.split(',');
if (mode == 'M') {
instr.push({type: 'M', 'x': int(coords[0])+offset, 'y': int(coords[1])});
}
else if (mode == 'L') {
instr.push({type: 'L', 'x': int(coords[0])+offset, 'y': int(coords[1])});
}
}
return instr;
}
function pathCommandsForText(font, s) {
console.log(font, s);
let commands = [];
let offset = 0;
for (let i = 0; i < s.length; i++) {
let cidx = s.charCodeAt(i) - 33;
if (cidx >= 0) {
Array.prototype.push.apply(
commands, pathCommands(font.chars[cidx].d, offset));
offset += int(font.chars[cidx].o) * 2;
}
else {
offset += 10;
}
}
return commands;
}
function drawPath(cmds) {
let cx = 0;
let cy = 0;
let startX = 0;
let startY = 0;
for (let cmd of cmds) {
switch (cmd.type) {
case 'M':
startX = cmd.x;
startY = cmd.y;
cx = cmd.x;
cy = cmd.y;
break;
case 'L':
line(cx, cy, cmd.x, cmd.y);
cx = cmd.x;
cy = cmd.y;
break;
}
}
}
let hershey;
function preload() {
hershey = loadJSON("hersheytext.json");
}
function setup() {
createCanvas(400, 400);
strokeWeight(3);
scale(2);
drawPath(pathCommandsForText(hershey.futural, "hello there"));
noLoop();
}
let pts = [];
let dragging = false;
function setup() {
createCanvas(400, 400);
pts = [
createVector(50, 50),
createVector(200, 300),
createVector(350, 50)
];
}
function draw() {
background(220);
noFill();
stroke(0);
strokeWeight(4);
beginShape();
vertex(pts[0].x, pts[0].y);
quadraticVertex(pts[1].x, pts[1].y, pts[2].x, pts[2].y);
endShape();
noStroke();
fill(255);
for (let pt of pts) {
ellipse(pt.x, pt.y, 20, 20);
}
if (mouseIsPressed) {
for (let pt of pts) {
if (dist(mouseX, mouseY, pt.x, pt.y) < 20) {
pt.x = mouseX;
pt.y = mouseY;
break;
}
}
}
noStroke();
fill(0);
textSize(12);
text("quadratic curve demo / drag the handles to change the curve", 4, height-4);
let pts = [];
function setup() {
createCanvas(400, 400);
pts = [
createVector(50, 50),
createVector(100, 300),
createVector(300, 300),
createVector(350, 50)
];
}
function draw() {
background(220);
noFill();
stroke(0);
strokeWeight(4);
bezier(pts[0].x, pts[0].y,
pts[1].x, pts[1].y,
pts[2].x, pts[2].y,
pts[3].x, pts[3].y);
noStroke();
fill(255);
for (let pt of pts) {
ellipse(pt.x, pt.y, 20, 20);
}
if (mouseIsPressed) {
for (let pt of pts) {
if (dist(mouseX, mouseY, pt.x, pt.y) < 20) {
pt.x = mouseX;
pt.y = mouseY;
break;
}
}
}
noStroke();
fill(0);
textSize(12);
text("bezier curve demo / drag the handles to change the curve", 4, height-4);
let font;
let fontData;
function drawGlyphPath(path, drawWidth) {
let cx = 0;
let cy = 0;
let vOffset = 0;
for (let cmd of path.commands) {
if (cmd.type == 'L') {
line(0, vOffset, dist(cx, cy, cmd.x, cmd.y), vOffset);
vOffset += 4;
}
else if (cmd.type == 'C') {
push();
translate(-cx, vOffset - cy);
bezier(cx, cy,
cmd.x1, cmd.y1,
cmd.x2, cmd.y2,
cmd.x, cmd.y);
pop();
vOffset += 4;
}
cx = cmd.x;
cy = cmd.y;
}
}
function preload() {
fontData = loadBytes('LeagueGothic-Regular.otf');
}
function setup() {
createCanvas(1400, 400);
let s = "abcdefghijklmnopqrstuvwxyz";
font = opentype.parse(fontData.bytes.buffer);
glyphs = font.stringToGlyphs(s);
push();
noFill();
strokeWeight(1);
translate(24, 72);
for (let i = 0; i < glyphs.length; i++) {
let path = glyphs[i].getPath(0, 0, 72);
path.draw(drawingContext);
push();
translate(0, 36);
drawGlyphPath(path, 72);
pop();
translate(48, 0);
}
pop();
noLoop();
}
function draw() {
let font;
let fontData;
function drawGlyphPath(path, drawWidth) {
let cx = 0;
let cy = 0;
let vOffset = 0;
for (let cmd of path.commands) {
if (cmd.type == 'L') {
line(0, vOffset, dist(cx, cy, cmd.x, cmd.y), vOffset);
vOffset += 4;
}
else if (cmd.type == 'C') {
push();
translate(-cx, vOffset - cy);
bezier(cx, cy,
cmd.x1, cmd.y1,
cmd.x2, cmd.y2,
cmd.x, cmd.y);
pop();
vOffset += 4;
}
cx = cmd.x;
cy = cmd.y;
}
}
function preload() {
fontData = loadBytes('LeagueGothic-Regular.otf');
}
function setup() {
createCanvas(400, 400);
let s = "comptypo";
font = opentype.parse(fontData.bytes.buffer);
glyphs = font.stringToGlyphs(s);
push();
noFill();
translate(24, 72);
for (let i = 0; i < glyphs.length; i++) {
let path = glyphs[i].getPath(0, 0, 72);
path.draw(drawingContext);
push();
translate(0, 36);
drawGlyphPath(path, 72);
pop();
translate(48, 0);
}
pop();
noLoop();
}
function draw() {
let font;
let fontData;
function drawPathOutline(cmds) {
let cx = 0;
let cy = 0;
let startX = 0;
let startY = 0;
for (let cmd of cmds) {
if (cmd.hasOwnProperty('x')) {
stroke(128, 16);
line(cx, cy, 0, 100);
line(cmd.x, cmd.y, 0, 100);
}
stroke(0);
switch (cmd.type) {
case 'M':
startX = cmd.x;
startY = cmd.y;
cx = cmd.x;
cy = cmd.y;
break;
case 'L':
stroke(0);
line(cx, cy, cmd.x, cmd.y);
cx = cmd.x;
cy = cmd.y;
break;
case 'C':
stroke(0);
bezier(cx, cy, cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
cx = cmd.x;
cy = cmd.y;
break;
case 'Q':
beginShape();
vertex(cx, cy);
quadraticVertex(cmd.x1, cmd.y1, cmd.x, cmd.y);
endShape();
cx = cmd.x;
cy = cmd.y;
break;
case 'Z':
stroke(0);
line(cx, cy, startX, startY);
break;
}
}
}
function preload() {
fontData = loadBytes('LeagueGothic-Regular.otf');
}
let path;
function setup() {
createCanvas(400, 400);
font = opentype.parse(fontData.bytes.buffer);
path = font.getPath("Comptypo", 0, 0, 72);
}
function draw() {
background(255);
push();
translate(50, 125);
pop();
push();
noFill();
stroke(0);
strokeWeight(2);
translate(50, 225);
pop();
let font;
let fontData;
function drawPathOutline(cmds) {
let cx = 0; cy = 0;
for (let cmd of cmds) {
switch (cmd.type) {
case 'M':
cx = cmd.x;
cy = cmd.y;
break;
case 'L':
let radius = max(abs(cmd.x - cx), abs(cmd.y - cy));
ellipse((cx + cmd.x) / 2, (cy + cmd.y) / 2, radius);
cx = cmd.x;
cy = cmd.y;
break;
case 'C':
quad(cx, cy, cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.y, cmd.y);
cx = cmd.x;
cy = cmd.y;
break;
case 'Q':
line(cx, cy, cmd.x, cmd.y);
endShape();
cx = cmd.x;
cy = cmd.y;
break;
case 'Z':
break;
}
}
}
function preload() {
fontData = loadBytes('Roboto-Black.ttf');
}
let path;
function setup() {
createCanvas(400, 400);
font = opentype.parse(fontData.bytes.buffer);
path = font.getPath("Comptypo", 0, 0, 72);
}
function draw() {
background(255);
push();
translate(50, 125);
pop();
push();
noFill();
stroke(0);
strokeWeight(2);
translate(50, 225);
pop();
let font;
let fontData;
function drawPathOutline(cmds) {
let cx = 0;
let cy = 0;
let startX = 0;
let startY = 0;
for (let cmd of cmds) {
switch (cmd.type) {
case 'M':
startX = cmd.x;
startY = cmd.y;
cx = cmd.x;
cy = cmd.y;
break;
case 'L':
line(cx, cy, cmd.x, cmd.y);
cx = cmd.x;
cy = cmd.y;
break;
case 'C':
bezier(cx, cy, cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
cx = cmd.x;
cy = cmd.y;
break;
case 'Q':
beginShape();
vertex(cx, cy);
quadraticVertex(cmd.x1, cmd.y1, cmd.x, cmd.y);
endShape();
cx = cmd.x;
cy = cmd.y;
break;
case 'Z':
line(cx, cy, startX, startY);
break;
}
}
}
function preload() {
fontData = loadBytes('Roboto-Black.ttf');
}
let path;
function setup() {
createCanvas(400, 400);
font = opentype.parse(fontData.bytes.buffer);
path = font.getPath("Comptypo", 0, 0, 72);
}
function draw() {
background(255);
push();
translate(50, 125);
pop();
push();
noFill();
stroke(0);
strokeWeight(2);
translate(50, 225);
pop();
let font;
let fontData;
let ctx;
function drawPathCommandsNoShape(cmds) {
let cx = 0; cy = 0;
let inContour = false;
let i = 0;
for (let cmd of cmds) {
console.log(cmd, cx, cy);
strokeWeight(1 + (i++)*0.25);
switch (cmd.type) {
case 'M':
cx = cmd.x;
cy = cmd.y;
break;
case 'L':
if (inContour) {
stroke(255, 0, 0, 128);
}
else {
stroke(0, 128);
}
line(cx, cy, cmd.x, cmd.y);
cx = cmd.x;
cy = cmd.y;
break;
case 'C':
stroke(0, 255, 0, 128);
bezier(cx, cy, cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
cx = cmd.x;
cy = cmd.y;
break;
case 'Q':
noFill();
stroke(0, 0, 255, 128);
beginShape();
vertex(cx, cy);
quadraticVertex(cmd.x1, cmd.y1, cmd.x, cmd.y);
endShape();
cx = cmd.x;
cy = cmd.y;
break;
case 'Z':
inContour = !inContour;
break;
}
}
}
function groupByContour(cmds) {
contours = [];
current = [];
for (let cmd of cmds) {
current.push(cmd);
if (cmd.type == 'Z') {
contours.push(current);
current = [];
}
}
return contours;
}
function clockwise(cmds) {
let sum = 0;
for (let i = 0; i < cmds.length - 1; i++) {
let a = cmds[i];
let b = cmds[i+1];
if (!(a.hasOwnProperty('x') && b.hasOwnProperty('x'))) {
continue;
}
sum += (b.x - a.x) * (b.y + a.y);
}
return sum < 0;
}
function drawContours(contours) {
let inShape = false;
console.log(contours);
for (let i = 0; i < contours.length; i++) {
if (clockwise(contours[i])) {
console.log("clockwise!");
if (inShape) {
endShape(CLOSE);
}
beginShape();
inShape = true;
drawContour(contours[i]);
}
else {
console.log("not clockwise");
beginContour();
drawContour(contours[i]);
endContour();
}
}
if (inShape) {
endShape(CLOSE);
}
}
function drawContour(cmds) {
for (let i = 0; i < cmds.length; i++) {
cmd = cmds[i];
console.log(cmd);
switch (cmd.type) {
case 'M':
case 'Z':
break;
case 'L':
vertex(cmd.x, cmd.y);
break;
case 'C':
console.log("hi");
bezierVertex(
10, 20, 30, 40, 50, 60);
console.log("bye");
break;
case 'Q':
quadraticVertex(cmd.x1, cmd.y1, cmd.x, cmd.y);
break;
}    
}
}
function preload() {
fontData = loadBytes('knewave.otf');
}
let path;
function setup() {
createCanvas(400, 400);
font = opentype.parse(fontData.bytes.buffer);
path = font.getPath("Allison", 100, 100, 100);
path.draw(drawingContext);
console.log(path);
}
function commandTransform(cmds, callback) {
let transformed = [];
for (let cmd of cmds) {
let newCmd = {type: cmd.type}
for (let pair of [['x', 'y'], ['x1', 'y1'], ['x2', 'y2']]) {
if (cmd.hasOwnProperty(pair[0]) && cmd.hasOwnProperty(pair[1])) {
let result = callback(cmd[pair[0]], cmd[pair[1]]);
newCmd[pair[0]] = result[0];
newCmd[pair[1]] = result[1];
}
}
transformed.push(newCmd);
}
return transformed;
}
function draw() {
fill(40);
stroke(128);
push();
translate(50, 125);
drawContours(
groupByContour(
commandTransform(path.commands, function(x, y) {
let newX = x + sin((x*0.15) + (frameCount*0.11));
let newY = y + cos((y*0.35) + (frameCount*0.17));
return [newX, newY];
})
)
);
pop();
push();
translate(50, 250);
drawContours(
groupByContour(
commandTransform(path.commands, function(x, y) {
let newX, newY;
newX = x;
if (y < map(sin(frameCount*0.04), -1, 1, 0, -100)) {
newY = y - 50;
}
else {
newY = y;
}
return [newX, newY];
})
)
);
pop();
push();
translate(50, 375);
drawContours(
groupByContour(
commandTransform(path.commands, function(x, y) {
let newX, newY;
newY = y;
newX = x * map(cos(map(x, 0, 500, 0, TWO_PI)), -1, 1, 1,
map(sin(frameCount*0.07), -1, 1, 0.1, 2));
return [newX, newY];
})
)
);
pop();
let font;
let fontData;
function preload() {
fontData = loadBytes('LeagueGothic-Regular.otf');
}
function modifyPath(p) {
let newCommands = [];
for (let cmd of p.commands) {    
let newC = Object.assign({}, cmd);
if (newC.hasOwnProperty('x')) {
newC.x += int(random(-50, 50));
newC.y += int(random(-50, 50));
}
newCommands.push(newC);
}
let newPath = new opentype.Path();
newPath.extend(newCommands);
return newPath;
} 
let path;
function setup() {
createCanvas(400, 400);
font = opentype.parse(fontData.bytes.buffer);
font.draw(drawingContext, "abcdefgABCDEFG", 0, 100, 48);
console.log("modifying glyphs");
for (let i = 0; i < font.glyphs.length; i++) {
let glyph = font.glyphs.glyphs[i];
glyph.path = modifyPath(glyph.path);
glyph.path.unitsPerEm = font.unitsPerEm;
}
console.log("done");
font.names.fontFamily.en = 'Messed up font nice';
font.draw(drawingContext, "abcdefgABCDEFG", 0, 200, 48);
font.download();
noLoop();
}
let sketchState = 0;
let button;
function setup() {
createCanvas(400, 400);
button = createButton("hello");
}
function draw() {
if (sketchState == 0) {
dataGatheringState();
}
else if (sketchState == 1) {
dataReportingState();
}
}
function mousePressed() {
if (sketchState == 0) {
sketchState = 1;
button.hide();
}
else if (sketchState == 1) {
sketchState = 0;
button.show();
}
}
function dataGatheringState() {
background(255, 0, 0);
}
function dataReportingState() {
background(40, 128, 40);
}
class SketchState {
constructor() {
}
display() {
}
tearDown() {
}
}let lastX = [];
let lastY = [];
function avg(t) {
let sum = 0;
for (let item of t) {
sum += item;
}
return sum / t.length;
}
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
lastX.push(mouseX);
lastY.push(mouseY);
fill(0);
ellipse(mouseX, mouseY, 50, 50);
fill(128);
ellipse(avg(lastX), avg(lastY), 50, 50);
lastX = lastX.slice(lastX.length-30);
lastY = lastY.slice(lastY.length-30);
let font;
let fontData;
let ctx;
function drawPathCommandsNoShape(cmds) {
let cx = 0; cy = 0;
let inContour = false;
let i = 0;
for (let cmd of cmds) {
console.log(cmd, cx, cy);
strokeWeight(1 + (i++)*0.25);
switch (cmd.type) {
case 'M':
cx = cmd.x;
cy = cmd.y;
break;
case 'L':
if (inContour) {
stroke(255, 0, 0, 128);
}
else {
stroke(0, 128);
}
line(cx, cy, cmd.x, cmd.y);
cx = cmd.x;
cy = cmd.y;
break;
case 'C':
stroke(0, 255, 0, 128);
bezier(cx, cy, cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
cx = cmd.x;
cy = cmd.y;
break;
case 'Q':
noFill();
stroke(0, 0, 255, 128);
beginShape();
vertex(cx, cy);
quadraticVertex(cmd.x1, cmd.y1, cmd.x, cmd.y);
endShape();
cx = cmd.x;
cy = cmd.y;
break;
case 'Z':
inContour = !inContour;
break;
}
}
}
function groupByContour(cmds) {
contours = [];
current = [];
for (let cmd of cmds) {
current.push(cmd);
if (cmd.type == 'Z') {
contours.push(current);
current = [];
}
}
return contours;
}
function clockwise(cmds) {
let sum = 0;
for (let i = 0; i < cmds.length - 1; i++) {
let a = cmds[i];
let b = cmds[i+1];
if (!(a.hasOwnProperty('x') && b.hasOwnProperty('x'))) {
continue;
}
sum += (b.x - a.x) * (b.y + a.y);
}
return sum < 0;
}
function drawContours(contours) {
let inShape = false;
console.log(contours);
for (let i = 0; i < contours.length; i++) {
if (clockwise(contours[i])) {
console.log("clockwise!");
if (inShape) {
endShape(CLOSE);
}
beginShape();
inShape = true;
drawContour(contours[i]);
}
else {
console.log("not clockwise");
beginContour();
drawContour(contours[i]);
endContour();
}
}
if (inShape) {
endShape(CLOSE);
}
}
function drawContour(cmds) {
for (let i = 0; i < cmds.length; i++) {
cmd = cmds[i];
console.log(cmd);
switch (cmd.type) {
case 'M':
case 'Z':
break;
case 'L':
vertex(cmd.x, cmd.y);
break;
case 'C':
console.log("hi");
bezierVertex(
10, 20, 30, 40, 50, 60);
console.log("bye");
break;
case 'Q':
quadraticVertex(cmd.x1, cmd.y1, cmd.x, cmd.y);
break;
}    
}
}
function preload() {
fontData = loadBytes('knewave.otf');
}
let path;
function setup() {
createCanvas(400, 400);
font = opentype.parse(fontData.bytes.buffer);
path = font.getPath("Allison", 100, 100, 100);
path.draw(drawingContext);
console.log(path);
}
function commandTransform(cmds, callback) {
let transformed = [];
for (let cmd of cmds) {
let newCmd = {type: cmd.type}
for (let pair of [['x', 'y'], ['x1', 'y1'], ['x2', 'y2']]) {
if (cmd.hasOwnProperty(pair[0]) && cmd.hasOwnProperty(pair[1])) {
let result = callback(cmd[pair[0]], cmd[pair[1]]);
newCmd[pair[0]] = result[0];
newCmd[pair[1]] = result[1];
}
}
transformed.push(newCmd);
}
return transformed;
}
function draw() {
fill(40);
stroke(128);
push();
translate(50, 125);
drawContours(
groupByContour(
commandTransform(path.commands, function(x, y) {
let newX = x + sin((x*0.15) + (frameCount*0.11));
let newY = y + cos((y*0.35) + (frameCount*0.17));
return [newX, newY];
})
)
);
pop();
push();
translate(50, 250);
drawContours(
groupByContour(
commandTransform(path.commands, function(x, y) {
let newX, newY;
newX = x;
if (y < map(sin(frameCount*0.04), -1, 1, 0, -100)) {
newY = y - 50;
}
else {
newY = y;
}
return [newX, newY];
})
)
);
pop();
push();
translate(50, 375);
drawContours(
groupByContour(
commandTransform(path.commands, function(x, y) {
let newX, newY;
newY = y;
newX = x * map(cos(map(x, 0, 500, 0, TWO_PI)), -1, 1, 1,
map(sin(frameCount*0.07), -1, 1, 0.1, 2));
return [newX, newY];
})
)
);
pop();
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
beginShape();
vertex(10, 10);
vertex(width-10, 10);
vertex(width-10, height-10);
vertex(10, height-10);
beginContour();
vertex(60, 60);
quadraticVertex(width/2, height/2, mouseX, mouseY);
vertex(60, height-60);
vertex(width-60, height-60);
vertex(width-60, 60);
endContour();
endShape(CLOSE);
let font;
let fontData;
function groupByContour(cmds) {
contours = [];
current = [];
for (let cmd of cmds) {
current.push(cmd);
if (cmd.type == 'Z') {
contours.push(current);
current = [];
}
}
return contours;
}
function clockwise(cmds) {
let sum = 0;
for (let i = 0; i < cmds.length - 1; i++) {
let a = cmds[i];
let b = cmds[i+1];
if (!(a.hasOwnProperty('x') && b.hasOwnProperty('x'))) {
continue;
}
sum += (b.x - a.x) * (b.y + a.y);
}
return sum < 0;
}
function drawContours(contours) {
let inShape = false;
for (let i = 0; i < contours.length; i++) {
if (clockwise(contours[i])) {
if (inShape) {
endShape(CLOSE);
}
beginShape();
inShape = true;
drawContour(contours[i]);
}
else {
beginContour();
drawContour(contours[i]);
endContour();
}
}
if (inShape) {
endShape(CLOSE);
}
}
function drawContour(cmds) {
for (let i = 0; i < cmds.length; i++) {
cmd = cmds[i];
switch (cmd.type) {
case 'M':
case 'Z':
break;
case 'L':
vertex(cmd.x, cmd.y);
break;
case 'C':
bezierVertex(
cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
break;
case 'Q':
quadraticVertex(cmd.x1, cmd.y1, cmd.x, cmd.y);
break;
}    
}
}
function preload() {
fontData = loadBytes('Roboto-Black.ttf');
}
let path;
function setup() {
createCanvas(400, 400);
font = opentype.parse(fontData.bytes.buffer);
path = font.getPath("Comptypo", 0, 0, 72);
}
function commandTransform(cmds, callback) {
let transformed = [];
for (let cmd of cmds) {
let newCmd = {type: cmd.type}
for (let pair of [['x', 'y'], ['x1', 'y1'], ['x2', 'y2']]) {
if (cmd.hasOwnProperty(pair[0]) && cmd.hasOwnProperty(pair[1])) {
let result = callback(cmd[pair[0]], cmd[pair[1]]);
newCmd[pair[0]] = result[0];
newCmd[pair[1]] = result[1];
}
}
transformed.push(newCmd);
}
return transformed;
}
function draw() {
background(255);
fill(40);
stroke(128);
push();
translate(25, 150);
drawContours(
groupByContour(
commandTransform(path.commands, function(x, y) {
let newX = x + sin((x*0.15) + (frameCount*0.11));
let newY = y + cos((y*0.35) + (frameCount*0.17));
return [newX, newY];
})
)
);
pop();
push();
translate(25, 250);
drawContours(
groupByContour(
commandTransform(path.commands, function(x, y) {
let newX, newY;
newX = x;
if (y < map(sin(frameCount*0.04), -1, 1, 0, -100)) {
newY = y - 50;
}
else {
newY = y;
}
return [newX, newY];
})
)
);
pop();
push();
translate(25, 350);
drawContours(
groupByContour(
commandTransform(path.commands, function(x, y) {
let newX, newY;
newY = y;
newX = x * map(cos(map(x, 0, 550, 0, TWO_PI)), -1, 1, 1,
map(sin(frameCount*0.07), -1, 1, 0.1, 2));
return [newX, newY];
})
)
);
pop();
let words = ['blood',
'bloody',
'boobs',
'book',
'boom',
'boost',
'boot',
'borrow',
'bottom',
'color',
'combo',
'comfort',
'common',
'condom',
'control',
'cook',
'cool',
'cooldown',
'cotton',
'doctor',
'door',
'downtown',
'flood',
'floor',
'follow',
'food',
'fool',
'foot',
'forgot',
'good',
'honor',
'hood',
'hook',
'horror',
'logo',
'look',
'loop',
'loot',
'mood',
'moon',
'motor',
'onto',
'photo',
'pool',
'poop',
'poor',
'proof',
'robot',
'roof',
'room',
'root',
'school',
'shoot',
'smooth',
'solo',
'soon',
'spoon',
'stood',
'tomorrow',
'too',
'took',
'tool',
'tooth',
'troops',
'wood',
'zoom']
function setup() {
noCanvas();
shuffle(words, true);
let gridSize = 6;
let spacing = windowWidth / gridSize;
for (let i = 0; i < gridSize*gridSize; i++) {
if (random() < 0.25) {
let d = createDiv(words[i]);
d.position((i%gridSize)*spacing,
int(i/gridSize)*spacing);
d.size(200, 200);
let fontsize = random(8, 100);
d.style('font-size', fontsize+'px');
d.style('letter-spacing', '0.1em');
d.style('font-weight', 'bold');
d.style('text-align', 'center');
d.style('font-family', 'sans-serif');
}
}
let words = [
"machinery",
"madness",
"magnificence",
"mahogany",
"mailing",
"mainframe",
"maintenance",
"majority",
"manga",
"mango",
"manifesto",
"mantra",
"manufacturer",
"maple",
"martin",
"martyrdom"
];
function setup() {
noCanvas();
select("body").style("perspective", "500px");
select("body").style("perspective-origin",
"right center");
let gridSize = 4;
let spacing = windowWidth / gridSize;
for (let i = 0; i < words.length; i++) {
for (let j = 0; j < words[i].length; j++) {
let ch = words[i][j];
let div = createDiv(ch);
let zaxis = j * 50 * -1;
div.position(
(i%gridSize)*spacing,
int(i/gridSize)*spacing);
div.style("transform", "translateZ("+zaxis+"px)");
div.style("font-family", "sans-serif");
div.style("font-size", "24px");
}
}
}
function draw() {
background(220);
}function setup() {
noCanvas();
let body = select('body');
body.style('perspective', '1000px');
let leftX = windowWidth * 0.1;
let topY = windowHeight * 0.1;
let n = 11;
let spacingX = (windowWidth * 0.8) / n;
let spacingY = (windowHeight * 0.8) / n;
for (let i = 0; i < n; i++) {
for (let j = 0; j < n; j++) {
let d = createDiv('rotate');
d.position(leftX + i*spacingX, topY + j*spacingY);
d.style('font-size', '48px');
let yRotation = (i*180/(n-1));
let xRotation = -90 + (j*(180/(n-1)));
d.style('transform',
'rotateY('+yRotation+'deg) ' +
'rotateX('+xRotation+'deg)');
}
}
}
let src = `SEA ROSE
Rose, harsh rose, 
marred and with stint of petals, 
meagre flower, thin, 
spare of leaf,
more precious 
than a wet rose 
single on a stem -- 
you are caught in the drift.
Stunted, with small leaf, 
you are flung on the sand, 
you are lifted 
in the crisp sand 
that drives in the wind.
Can the spice-rose 
drip such acrid fragrance 
hardened in a leaf?`
let fontListData;
function preload() {
fontListData = loadJSON("list-of-google-fonts.json");
}
function setup() {
noCanvas();
let fontList = fontListData.fonts;
let allDisplayFonts = [];
for (let item of fontList) {
if (item.category == 'display') {
allDisplayFonts.push(item.name);
}
}
allDisplayFonts = shuffle(allDisplayFonts);
let displayFonts = allDisplayFonts.slice(0, 7);
let pipedList = displayFonts.join('|');
let link = document.createElement("link");
link.id = 'font';
console.log(link.href);
link.rel = "stylesheet";
document.head.appendChild(link);
let linesRaw = src.split("\n");
let lines = [];
for (let item of linesRaw) {
if (item.length > 0) {
lines.push(item);
}
}
link.addEventListener('load', function() {  
for (let i = 0; i < lines.length; i++) {
let d = createDiv(lines[i]);
let fontName = random(displayFonts);
d.style('font-size', random([24, 36, 48])+'px');
d.style('font-family', random(displayFonts));
d.style('padding-left', random(10) + 'em');
}
});
}function setup() {
noCanvas();
let n = 5;
for (let i = 0; i < n; i++) {
let d = createDiv('hello');
d.position(windowWidth/2, windowHeight/2);
d.style('font-size', map(i, 0, n, 100, 200)+"px");
d.style('color', "rgba(0, 0, 0, "+map(i, 0, n, 0.5, 0)+")");
d.style('rotate', map(i, 0, 25, 0, 720));
}
}
function draw() {
background(220);
}let src = "inscribing v[eo]rtices ";
function setup() {
noCanvas();
for (let i = 0; i < src.length; i++) {
let angle = TWO_PI * (i/src.length);
let d = createDiv(src.charAt(i));
d.size(200, 25);
d.style("font-size", "100px");
d.position(windowWidth/2, windowHeight/2);
d.style("text-align", "right");
d.style("transform-origin", "left center");
d.style("transform", "rotate("+angle+"rad)");
}
}
function draw() {
background(220);
}let strokes = [];
let currentStroke = [];
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
noFill();
if (mouseIsPressed) {
currentStroke.push([mouseX, mouseY]);
}
beginShape();
for (let i = 0; i < currentStroke.length; i++) {
vertex(currentStroke[i][0], currentStroke[i][1]);
}
endShape();
for (let i = 0; i < strokes.length; i++) {
beginShape();
for (let j = 0; j < strokes[i].length; j++) {
vertex(strokes[i][j][0], strokes[i][j][1]);
}
endShape();
}
}
function mouseReleased() {
strokes.push(currentStroke);
currentStroke = [];
console.log(strokes);
}
function keyPressed() {
if (keyCode == ENTER) {
console.log(JSON.stringify(strokes));
}
strokes = [];
}let lyricsData;
function preload() {
lyricsData = loadJSON("stuff.json");
}
function setup() {
createCanvas(400, 400);
noLoop();
let lines = lyricsData.lyrics.split("\r\n");
shuffle(lines);
console.log(lines);
for (let i = 0; i < 2; i++) {
console.log(lines[i]);
}
}
function draw() {
background(220);
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
console.log(poses);
});
video.hide();
}
function modelReady() {
select('#status').html('Model Loaded');
}
function draw() {
image(video, 0, 0, width, height);
if (poses.length > 0) {    
let nose = poses[0].pose.keypoints[0].position;
let leftEar = poses[0].pose.keypoints[3].position;
let rightEar = poses[0].pose.keypoints[4].position;
fill(255, 64);
ellipse(nose.x, nose.y,
(rightEar.x - leftEar.x)*2,
(rightEar.x - leftEar.x)*2);
}
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
}
let tri;
let cam;
function preload() {
alf = loadImage("alf.jpg");
tri = loadImage("my-triangle.png");
}
let pg;
function setup() {
createCanvas(400, 400);
pg = createGraphics(100, 100);
}
function draw() {
imageMode(CORNER);
alf.loadPixels();
let randX = int(random(0, alf.width));
let randY = int(random(0, alf.height));
noStroke();
imageMode(CENTER);
pg.background(0, 0);
pg.fill(alf.get(randX, randY), 255);
pg.triangle(25, 25, 75, 75, 25, 75);
image(pg, randX, randY);
let offset = ((randY*alf.width)+randX)*4;
alf.pixels[offset] = 0;
alf.pixels[offset+1] = 0;
alf.pixels[offset+2] = 0;
fill(alf.pixels[offset],
alf.pixels[offset+1],
alf.pixels[offset+2], 128);
ellipse(
map(randX, 0, alf.width, 0, width),
map(randY, 0, alf.height, 0, height),
let mobilenet;
let classifier;
let video;
let label = 'test';
let clubsButton;
let spadesButton;
let heartsButton;
let diamondsButton;
let trainButton;
function modelReady() {
console.log('Model is ready!!!');
}
function videoReady() {
console.log('Video is ready!!!');
}
function whileTraining(loss) {
if (loss == null) {
console.log('Training Complete');
classifier.classify(gotResults);
} else {
console.log(loss);
}
}
function gotResults(error, result) {
if (error) {
console.error(error);
} else {
label = result;
classifier.classify(gotResults);
}
}
function setup() {
createCanvas(320, 270);
video = createCapture(VIDEO);
video.hide();
background(0);
mobilenet = ml5.featureExtractor('MobileNet', modelReady);
classifier = mobilenet.classification(video, videoReady);
createP();
clubsButton = createButton('clubs');
clubsButton.mousePressed(function() {
console.log("added clubs");
classifier.addImage('clubs');
});
spadesButton = createButton('spades');
spadesButton.mousePressed(function() {
console.log("added spades");
classifier.addImage('spades');
});
heartsButton = createButton('hearts');
heartsButton.mousePressed(function() {
console.log("added hearts");
classifier.addImage('hearts');
});
diamondsButton = createButton('diamonds');
diamondsButton.mousePressed(function() {
console.log("added diamonds");
classifier.addImage('diamonds');
});
trainButton = createButton('train');
trainButton.mousePressed(function() {
classifier.train(whileTraining);
});
}
function draw() {
background(0);
image(video, 0, 0, 320, 240);
fill(255);
textSize(16);
text(label, 10, height - 10);
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
let gridSize = 8;
function drawLetter(weight, depth) {
let opt = int(random(5));
if (random() < 0.5) {
rotate(PI*0.125 * int(random(16)));
}
if (opt == 0) {
ellipse(0, 0, 20, 20);
rotate(PI*0.5);
translate(20, 0);
}
else if (opt == 1) {
line(-20, 0, 20, 0);
translate(10, 0);
}
else if (opt == 2) {
line(0, -20, 0, 20);
translate(0, 10);
}
else if (opt == 3) {
arc(0, 0, 20, 20, random(TWO_PI), random(TWO_PI));
}
else {
line(-5, -10, -5, 10);
line(5, -10, 5, 10);
translate(0, 10);
}
if ((depth == 1) || (random() < 0.9 && depth < 5)) {
scale(0.75);
weight *= 1.33;
strokeWeight(weight);
drawLetter(weight, depth+1);
}
}
function setup() {
createCanvas(600, 600);
}
function draw() {
background(220);
push();
translate(width/(gridSize*2), height/(gridSize*2));
for (let i = 0; i < gridSize; i++) {
for (let j = 0; j < gridSize; j++) {
push();
translate(i * (width/gridSize), j * (height/gridSize));
scale(1.25);
stroke(0);
noFill();
drawLetter(1, 1);
pop();		
}
}
pop();
noLoop();
}
function mousePressed() {
draw();
}let chars;
let gridSize = 8;
function preload() {
chars = loadJSON("char74k-normalized.json");
}
function drawLetter(offset) {
let allLetters = Object.keys(chars);
let charA = allLetters[int(noise(offset) * allLetters.length)];
let formA = chars[charA][int(noise(offset) * chars[charA].length)];
for (let stroke of formA) {
beginShape();
for (let coord of stroke) {
let xoff = map(
noise(offset+frameCount*0.02, coord[0]*0.005, 0),
0, 1,
-250, 250);
let yoff = map(
noise(offset+frameCount*0.02, 1000, coord[1]*0.005),
0, 1,
-250, 250);
curveVertex(
coord[0] + xoff,
coord[1] + yoff);
}
endShape();
}
}
function setup() {
createCanvas(600, 600);
}
function draw() {
background(255);
push();
translate(width / (gridSize * 2), height / (gridSize * 2));
for (let i = 0; i < gridSize; i++) {
for (let j = 0; j < gridSize; j++) {
push();
translate(i * (width / gridSize), j * (height / gridSize));
scale(0.1);
strokeWeight(20);
stroke(0);
noFill();
drawLetter((i * gridSize) + j);
pop();
}
}
pop();
let chars;
let gridSize = 8;
function preload() {
chars = loadJSON("char74k-normalized.json");
}
function drawLetter() {
let allLetters = Object.keys(chars);
let charA = random(allLetters);
let charB = random(allLetters);
let formA = random(chars[charA]);
let formB = random(chars[charB]);
for (let stroke of formA) {
beginShape();
for (let coord of stroke) {
if (coord[0] < 0) {
vertex(coord[0], coord[1]);
}
}
endShape();
}
for (let stroke of formB) {
beginShape();
for (let coord of stroke) {
if (coord[0] > 0) {
vertex(coord[0], coord[1]);
}
}
endShape();
}
}
function setup() {
createCanvas(600, 600);
}
function draw() {
background(255);
push();
translate(width/(gridSize*2), height/(gridSize*2));
for (let i = 0; i < gridSize; i++) {
for (let j = 0; j < gridSize; j++) {
push();
translate(i * (width/gridSize), j * (height/gridSize));
scale(0.2);
strokeWeight(10);
stroke(0);
noFill();
drawLetter();
pop();
noLoop();
}
}
pop();
}
function mousePressed() {
draw();
}let chars;
let typing;
function preload() {
chars = loadJSON("char74k-normalized.json");
}
function setup() {
createCanvas(windowWidth, windowHeight);
typing = createInput();
typing.position(10, 10);
typing.attribute('placeholder', 'type text here');
frameRate(15);
}
function draw() {
background(255, 64);
stroke(0, 0, 90, 128);
strokeWeight(2);
translate(50, 50);
let xoff = 0;
let yoff = 0;
for (let ch of typing.value()) {
if (chars.hasOwnProperty(ch)) {
let form = random(chars[ch]);
noFill();
for (let stroke of form) {
beginShape();
for (let coord of stroke) {
vertex(xoff+(coord[0]*0.1),
yoff+(coord[1]*0.1));
}
endShape();
}
}
xoff += 20;
if (xoff > width - 100) {
xoff = 0;
yoff += 60;
}
}
}
let gridSize = 8;
function toCartesian(r, theta) {
return [r*cos(theta), r*sin(theta)];
}
function drawLetter() {
let angles = [];
for (let i = 0; i < int(random(5, 15)); i++) {
angles.push(PI/12 * int(random(12)));
}
beginShape();
for (let i = 0; i < angles.length; i++) {
let xy = toCartesian(50, angles[i]);
curveVertex(xy[0], xy[1]);
}
endShape();
}
function setup() {
createCanvas(600, 600);
}
function draw() {
background(220);
push();
translate(width/(gridSize*2), height/(gridSize*2));
for (let i = 0; i < gridSize; i++) {
for (let j = 0; j < gridSize; j++) {
push();
translate(i * (width/gridSize), j * (height/gridSize));
scale(0.5);
strokeWeight(2);
stroke(0);
noFill();
drawLetter();
pop();
}
}
pop();
noLoop();
}
function mousePressed() {
draw();
function drawLetter() {
let pts = [];
for (let i = 0; i < int(random(5, 15)); i++) {
pts.push([int(random(-2, 2))*30, int(random(-2, 2))*30]);
}
beginShape();
for (let i = 0; i < pts.length; i++) {
vertex(pts[i][0], pts[i][1]);
}
endShape();
}
function setup() {
createCanvas(600, 600);
}
function draw() {
background(220);
push();
translate(width/20, height/20);
for (let i = 0; i < 10; i++) {
for (let j = 0; j < 10; j++) {
push();
translate(i * (width/10), j * (height/10));
scale(0.5);
strokeWeight(2);
stroke(0);
noFill();
drawLetter();
pop();
noLoop();
}
}
pop();
}
function mousePressed() {
draw();
let capture;
function setup() {
noCanvas();
capture = createCapture(VIDEO);
capture.hide();
frameRate(20);
}
let ch = [" ", ".", ",", "+", "x", "X", "@", "#"];
function draw() {
term.write(ansi.erase.display(2));
term.write(ansi.cursor.position(0, 0));
capture.loadPixels();
let lineNo = 0;
for (let y = 0; y < capture.width; y += 10) {
let line = "";
for (let x = 0; x < capture.height; x += 10) {
let offset = ((y*capture.width)+x)*4;
let g = capture.pixels[offset+1];
let idx = int(map(g, 0, 255, 0, ch.length-1));
line += ch[idx];
}
term.write(ansi.cursor.position(lineNo, 0));
term.write(line);
lineNo++;
}
}let kitty;
function preload() {
kitty = createCapture(VIDEO);
kitty.hide();
}
function setup() {
createCanvas(400, 400);
}
function draw() {
background(255);
noStroke();
kitty.loadPixels();
for (let x = 0; x < kitty.width; x += 10) {
for (let y = 0; y < kitty.height; y += 10) {
let offset = ((y*kitty.width)+x)*4;
let r = kitty.pixels[offset];
let g = kitty.pixels[offset+1];
let b = kitty.pixels[offset+2];
let a = kitty.pixels[offset+3];
fill(r, g, b, a);
ellipse(
map(x, 0, kitty.width, 0, width), 
map(y, 0, kitty.height, 0, height),
map(mouseX, 0, width, 5, 50),
map(mouseY, 0, height, 5, 50));
}
}
}
function mousePressed() {
console.log(kitty.get(mouseX, mouseY));
}let kitty;
function preload() {
kitty = loadImage("kitty_transparent.png");
}
function setup() {
createCanvas(400, 400);
kitty.loadPixels();
}
function draw() {
background(255);
noStroke();
for (let x = 0; x < kitty.width; x += 10) {
for (let y = 0; y < kitty.height; y += 10) {
let offset = ((y*kitty.width)+x)*4;
let r = kitty.pixels[offset];
let g = kitty.pixels[offset+1];
let b = kitty.pixels[offset+2];
let a = kitty.pixels[offset+3];
fill(r, g, b, a);
ellipse(
map(x, 0, kitty.width, 0, width), 
map(y, 0, kitty.height, 0, height),
map(mouseX, 0, width, 5, 50),
map(mouseY, 0, height, 5, 50));
}
}
}
function mousePressed() {
console.log(kitty.get(mouseX, mouseY));
}let kitty;
function preload() {
kitty = loadImage("kitty_transparent.png");
}
function setup() {
createCanvas(400, 400);
}
function draw() {
background(255);
noStroke();
for (let x = 0; x < kitty.width; x += 10) {
for (let y = 0; y < kitty.height; y += 10) {
let c = kitty.get(x, y);
fill(c);
ellipse(
map(x, 0, kitty.width, 0, width), 
map(y, 0, kitty.height, 0, height),
map(mouseX, 0, width, 5, 50),
map(mouseY, 0, height, 5, 50));
}
}
}
function mousePressed() {
console.log(kitty.get(mouseX, mouseY));
}let kitty;
function preload() {
kitty = loadImage("kitty_transparent.png");
}
function setup() {
createCanvas(400, 400);
console.log(kitty.width, kitty.height);
console.log(kitty.get(24, 70));
console.log(width/kitty.width);
}
function draw() {
background(255);
image(kitty, 0, 0, width, height);
for (let i = 0; i < kitty.width; i++) {
let c = kitty.get(
i, map(mouseY, 0, height, 0, kitty.height));
fill(c);
noStroke();
rect(
map(i, 0, kitty.width, 0, width), 0, 5, height);
}
}
function mousePressed() {
console.log(kitty.get(mouseX, mouseY));
}let kitty;
function preload() {
kitty = loadImage("kitty_transparent.png");
}
function setup() {
createCanvas(400, 400);
imageMode(CENTER);
}
function draw() {
background(255);
tint(255, 126);
translate(width*0.5, height*0.5);
for (let i = 0; i < 50; i++) {
rotate(i*0.1);
image(kitty, 0, 0,
map(sin(frameCount*0.01*i), -1, 1, 0, width),
map(cos(frameCount*0.01*i), -1, 1, 0, height)
);
}
}function setup() {
noCanvas();
frameRate(4);
}
function draw() {
term.write("Hello world.\r\n");
}let s = "Please do not erase!";
function setup() {
noCanvas();
frameRate(4);
term.write(s);
}
function draw() {
if (frameCount % (s.length+1) == 0) {
term.write(s);
}
else {
term.write("\b \b");
}
}function setup() {
noCanvas();
frameRate(4);
}
function draw() {
term.write("Hello world.\r\n");
function setup() {
noCanvas();
frameRate(4);
}
function draw() {
let fgColor = int(random(30, 38));
let bgColor = int(random(40, 48));
let moveBack = int(random(10));
term.write("\x1B["+fgColor+"m");
term.write("\x1B["+bgColor+"m");
term.write("\x1B["+moveBack+"DThis is a test.");
let trainCol = 0;
function setup() {
noCanvas();
frameRate(4);
}
function draw() {
if (frameCount % 2 == 0) {
term.write(ansi.cursor.position(term.rows - 1, ghostCol));
term.write("GHOST");
if (ghostCol > 1) {
ghostCol--;
}
}
else {
term.write(ansi.cursor.position(term.rows - 1, trainCol));
term.write("TRAIN");
if (trainCol < term.cols - 5) {
trainCol++;
}
}
function setup() {
noCanvas();
frameRate(10);
}
function draw() {
let colors = ["magenta", "cyan", "blue", "white"];
let chars = [".", "+", "*"];
for (let i = 0; i < 25; i++) {
let row = int(random(term.rows));
let col = int(random(term.cols));
term.write(ansi.cursor.position(row, col));
let c = random(colors);
let ch = random(chars);
if (random() < 0.5) {
term.write(ansi.format(ch, [c, "bold"]));
} else {
term.write(ansi.format(ch, [c]));
}
}
for (let i = 0; i < 25; i++) {
let row = int(random(term.rows));
let col = int(random(term.cols));
term.write(ansi.cursor.position(row, col));
term.write(" ");
}
}function setup() {
noCanvas();
frameRate(60);
term.write(ansi.styles(['bg-blue', 'bold', 'blue']));
}
function draw() {
if (random() < 0.5) {
term.write("/");
}
else {
term.write("\\");
}
}let strs = [
"test",
"trial",
"practice",
"shakedown",
"rehearsal",
"dry run",
"crucible"];
function setup() {
noCanvas();
frameRate(1);
}
function draw() {
let word = random(strs);
term.write(
"This is a " + ansi.format(word, ["red", "bold"]) + ". ");
term.write(
"This is only a " + ansi.format(word, ["red", "bold"]) + ". ");
term.write("\r\n");
}let wordsSrc = "hello there how are you today".split(" ");
let words = [];
function setup() {
noCanvas();
for (let w of wordsSrc) {
d = createDiv(w);
d.style("display", "inline-block");
let e = createDiv(" ");
e.style("display", "inline-block");
words.push(d);
}
}
function draw() {
background(220);
for (let i = 0; i < words.length; i++) {
wdiv = words[i];
wdiv.style("rotate", frameCount * (i+1 * 0.2));
wdiv.style("font-size",
24 + map(
sin(i + frameCount * 0.1), -1, 1, 0, 12) + "px");
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
}
function mousePressed() {
}
function caughtEmAll(pokemon) {
console.log(pokemon);
let pokemonUrl = random(pokemon.results).url;
console.log(pokemonUrl);
loadJSON(pokemonUrl, caughtOne);
}
function caughtOne(data) {
console.log(data);
createImg(data.sprites.front_default);
}let crayola;
function preload() {
crayola = loadJSON("crayola.json");
}
function setup() {
createCanvas(400, 400);
console.log(crayola);
}
function draw() {
}
function mousePressed() {
console.log(crayola.colors[59].color)
noStroke();
for (let i = 0; i < crayola.colors.length; i++) {
let c = color(crayola.colors[i].hex);
c.setAlpha(192);
fill(c);
ellipse(random(width), random(height), 50, 50);
}
}function setup() {
noCanvas();
}
function draw() {
background(220);
}
function mousePressed() {
}
function gotEmAll(data) {
let randPokemon = random(data.results);
loadJSON(randPokemon.url, gotOne);
}
function gotOne(data) {
let img = createImg(data.sprites.front_default, data.name);
img.style("height", (data.height * 10) + "px");
}function setup() {
createCanvas(400, 400);
let quotes = [];
let names = [];
for (let i = 0; i < corporaStuff['data'].length; i++) {
let item = corporaStuff['data'][i];
for (let j = 0; j < item['quotes'].length; j++) {
quotes.push(item['quotes'][j]);
}
names.push(item['name']);
}
console.log(quotes);
console.log(names);
}
function draw() {
background(220);
}
function mousePressed() {
let grammarSource = {
"origin": "As #president# said, '#quote#.'"
}
let randomQuote = random(corporaStuff['data']);
grammarSource['president'] = randomQuote['name'];
grammarSource['quote'] = randomQuote['quotes'];
var grammar = tracery.createGrammar(grammarSource);
grammar.addModifiers(tracery.baseEngModifiers);
var output = grammar.flatten("#origin#");
createP(output);
}
let corporaStuff = {
"data":[
{
"quotes":[
"It's easier to do a job right, than to explain why you didn't"
],
"id":38455,
"name":"Martin Van Buren"
},
{
"quotes":[
"It is not strange... to mistake change for progress"
],
"id":16115,
"name":"Millard Fillmore"
},
{
"quotes":[
"A little flattery will support a man through great fatigue"
],
"id":43159,
"name":"James Monroe"
},
{
"quotes":[
"The only thing we have to fear is fear itself",
"Remember, remember always, that all of us, and you and I especially, are descended from immigrants and revolutionists"
],
"id":43176,
"name":"Franklin D. Roosevelt"
},
{
"quotes":[
"Do what you can, with what you have, where you are",
"It is hard to fail, but it is worse never to have tried to succeed"
],
"id":43161,
"name":"Theodore Roosevelt"
},
{
"quotes":[
"There are men and women who make the world better just by being the kind of people they are. They have the gift of kindness or courage or loyalty or integrity. It really matters very little whether they are behind the weel of a truck or running a business or bringing up a family. They teach the truth by living it",
"If wrinkles must be written on our brow, let them not be written on our heart. The spirit should never grow old"
],
"id":17346,
"name":"James A. Garfield"
},
{
"quotes":[
"Ninety-nine percent of failures come from people who make excuses",
"The harder the conflict, the greater the triumph"
],
"id":43163,
"name":"George Washington"
},
{
"quotes":[
"The advancement and diffusion of knowledge is the only guardian of true liberty",
"If tyranny and oppression come to this land it will be in the guise of fighting a foreign enemy"
],
"id":43158,
"name":"James Madison"
},
{
"quotes":[
"It's amazing what you can accomplish if you do not care who gets the credit"
],
"id":43162,
"name":"Harry S. Truman"
},
{
"quotes":[
"Great lives never go out; they go on"
],
"id":19617,
"name":"Benjamin Harrison"
},
{
"quotes":[
"Honesty is the first chapter of the book wisdom",
"On matters of style, swim with the current, on matters of principle, stand like a rock"
],
"id":43157,
"name":"Thomas Jefferson"
},
{
"quotes":[
"The Chinese use two brush strokes to write the word 'crisis.' One brush stroke stands for danger; the other for opportunity. In a crisis, be aware of the danger-but recognize the opportunity",
"Conformity is the jailer of freedom and the enemy of growth",
"The hottest places in hell are reserved for those who, in times of great moral crisis, maintain their neutrality",
"One person can make a difference, and everyone should try",
"Forgive your enemies, but never forget their names"
],
"id":23230,
"name":"John F. Kennedy"
},
{
"quotes":[
"I am a slow walker, but I never walk backward",
"In the end, it's not the years in your life that count. It's the life in your year",
"Leave nothing for tomorrow which can be done today",
"Whatever you are, be a good one",
"Nearly all men can stand adversity, but if you want to test a man's character, give him power"
],
"id":43174,
"name":"Abraham Lincoln"
},
{
"quotes":[
"Live simply, love generously, care deeply, speak kindly, leave the rest to God"
],
"id":43169,
"name":"Ronald W. Reagan"
},
{
"quotes":[
"What counts is not necessarily the size of the dog in the fight - it's the size of the fight in the dog",
"Never question another man's motive. His wisdom, yes, but not his motives",
"Never waste a minute thinking about people you don't like"
],
"id":43168,
"name":"Dwight D. Eisenhower"
},
{
"quotes":[
"We all do better when we work together. Our differences do matter, but our common humanity matters more",
"When our memories outweigh our dreams, it is then that we become old"
],
"id":43170,
"name":"William J. Clinton"
},
{
"quotes":[
"Change will not come if we wait for some other person, or if we wait for some other time. We are the ones we've been waiting for. We are the change that we seek",
"The best way to not feel hopeless is to get up and do something. Don't wait for good things to happen to you. If you go out and make some good things happen, you will fill the world with hope, you will fill yourself with hope",
"If you're walking down the right path and you're willing to keep walking, eventually you'll make progress"
],
"id":43155,
"name":"Barack Obama"
},
{
"quotes":[
"I have opinions of my own - strong opinions - but I don't always agree with them",
"A volunteer is a person who can see what others cannot see; who can feel what most do not feel. Often, such gifted persons do not think of themselves as volunteers, but as citizens - citizens in the fullest sense: partners in civilization"
],
"id":9806,
"name":"George H.W. Bush"
},
{
"quotes":[
"There's an old saying in Tennessee - I know it's in Texas, probably in Tennessee - that says, fool me once, shame on - shame on you. Fool me - you can't get fooled again"
],
"id":43171,
"name":"George W. Bush"
},
{
"quotes":[
"Words without actions are the assassins of idealism",
"Be patient and calm; no one can catch a fish with anger"
],
"id":41922,
"name":"Herbert C. Hoover"
},
{
"quotes":[
"You don't know what you can miss before you try"
],
"id":30929,
"name":"Franklin Pierce"
},
{
"quotes":[
"We become not a melting pot but a beautiful mosaic. Different people, different beliefs, different yearnings, different hopes, different dreams"
],
"id":41931,
"name":"James E. Carter"
},
{
"quotes":[
"Courage and perseverance have a magical talisman, before which difficulties disappear and obstacles vanish into air",
"Try and fail, but don't fail to try"
],
"id":5380,
"name":"John Q. Adams"
},
{
"quotes":[
"There is nothing more corrupting, nothing more destructive of the noblest and finest feelings of our nature, than the exercise of unlimited power"
],
"id":19666,
"name":"William H. Harrison"
},
{
"quotes":[
"One man with courage makes a majority"
],
"id":43156,
"name":"Andrew Jackson"
}
]
}let lsysDepth = 0;
let transformed;
function setup() {
createCanvas(640, 640, WEBGL);
transformed = data;
}
function draw() {
background(0);
push();
translate(0, -10, 0);
rotateY(frameCount * 0.01);
scale(3);
strokeWeight(1.5);
stroke(20, 200, 40, 192);
let shouldDraw = false;
for (let item of transformed) {
switch (item[0]) {
case "push":
push();
break;
case "pop":
pop();
break;
case "pen-up":
shouldDraw = false;
break;
case "pen-down":
shouldDraw = true;
break;
case "rotate":
case "rot-right":
rotate(item[1]);
break;
case "rot-left":
rotate(item[1] * -1);
break;
case "rotate-z":
rotateY(item[1]);
break;
case "forward":
if (shouldDraw) {
line(0, 0, item[1], 0);
}
translate(item[1], 0);
break;
}
}
pop();
}
function mousePressed() {
lsysDepth++;
if (lsysDepth > 4) {
lsysDepth = 0;
transformed = data;
}
for (let i = 0; i < lsysDepth; i++) {
transformed = lsys(transformed, rules);
}
}
let rules = [
{
"match": function(instr) {
return instr[0] == 'pen-up';
},
"replace": function(instr) {
return [
["push", null],
["rotate", random(0.2, 0.4)],
["rotateZ", random(0.2, 0.4)],
["forward", random(0.5, 1.5)],
["pen-up", null],
["pop", null]
]
},
},
{
"match": function(instr) {
return instr[0] == 'rotate' &&
random() > 0.75 &&
abs(instr[1]) > 0.1 &&
abs(instr[1]) < 0.9
},
"replace": function(instr) {
return [
instr,
["push", null],
["forward", random(0.9, 1.5)],
["rotate-z", instr[1] + 0.1],
["rotate", instr[1] + 0.1],
["pop", null],
["push", null],
["forward", random(0.9, 1.5)],
["rotate-z", TWO_PI - instr[1] + 0.1],
["rotate", TWO_PI - instr[1] + 0.1],
["pop", null],
]
}
}
];
let rules = [
{
"match": function(instr) {
return instr[0] == 'forward' && instr[1] > 1;
},
"replace": function(instr) {
let angle = random(0.25);
return [
["forward", instr[1] * 0.5],
["push", null],
["rotate", PI * angle * -1],
["forward", instr[1] * random(0.25, 0.75)],
["pop", null],
["push", null],
["rotate", PI * angle],
["forward", instr[1] * random(0.25, 0.75)],
["pop", null],
["forward", instr[1] * 0.5]
]
}
}
function lsys(instrs, rules) {
let init = instrs.slice();
let depth = 0;
for (let rule of rules) {
let out = [];
for (let instr of init) {
if (rule.match(instr)) {
for (let newrule of rule.replace(instr)) {
out.push([...newrule, depth])
}
} else {
out.push(instr);
}
}
init = out.slice();
depth++;
}
return init;
}
let data = [
[
"pen-up",
null
],
[
"rotate",
0.4899573262537283
],
[
"forward",
17.0
],
[
"pen-down",
null
],
[
"rotate",
1.0808390005411683
],
[
"forward",
16.0
],
[
"rotate",
0.32175055439664235
],
[
"forward",
3.1622776601683795
],
[
"rotate",
0.4636476090008059
],
[
"forward",
1.4142135623730951
],
[
"rotate",
0.32175055439664213
],
[
"forward",
2.23606797749979
],
[
"rotate",
0.46364760900080615
],
[
"forward",
3.0
],
[
"rotate", -5.81953769817878
],
[
"forward",
2.23606797749979
],
[
"pen-up",
null
],
[
"rotate",
1.5940479496053594
],
[
"forward",
19.235384061671343
],
[
"pen-down",
null
],
[
"rotate", -1.2722973952087173
],
[
"forward",
2.8284271247461903
],
[
"rotate", -0.32175055439664213
],
[
"forward",
2.23606797749979
],
[
"rotate",
5.81953769817878
],
[
"forward",
3.0
],
[
"rotate", -0.46364760900080615
],
[
"forward",
2.23606797749979
],
[
"rotate", -0.32175055439664213
],
[
"forward",
2.8284271247461903
],
[
"rotate", -0.4636476090008059
],
[
"forward",
3.1622776601683795
],
[
"rotate", -0.32175055439664235
],
[
"forward",
2.0
],
[
"rotate", -0.32175055439664213
],
[
"forward",
3.1622776601683795
],
[
"rotate", -0.46364760900080615
],
[
"forward",
2.8284271247461903
],
[
"rotate", -0.3217505543966422
],
[
"forward",
2.23606797749979
],
[
"rotate", -0.4636476090008061
],
[
"forward",
3.0
],
[
"rotate", -0.4636476090008061
],
[
"forward",
2.23606797749979
],
[
"rotate", -0.3217505543966422
],
[
"forward",
2.8284271247461903
],
[
"pen-up",
null
],
[
"rotate", -0.4366271598135414
],
[
"forward",
11.704699910719626
],
[
"pen-down",
null
],
[
"rotate",
2.7928216500058864
],
[
"forward",
14.0
],
[
"pen-up",
null
],
[
"rotate", -3.141592653589793
],
[
"forward",
8.0
],
[
"pen-down",
null
],
[
"rotate",
0.32175055439664213
],
[
"forward",
3.1622776601683795
],
[
"rotate",
0.46364760900080615
],
[
"forward",
2.8284271247461903
],
[
"rotate",
0.3217505543966422
],
[
"forward",
2.23606797749979
],
[
"rotate",
0.4636476090008061
],
[
"forward",
3.0
],
[
"pen-up",
null
],
[
"rotate",
1.1071487177940904
],
[
"forward",
6.708203932499369
],
[
"pen-down",
null
],
[
"rotate", -1.1071487177940904
],
[
"forward",
12.0
],
[
"rotate", -1.5707963267948966
],
[
"forward",
2.0
],
[
"rotate", -0.46364760900080615
],
[
"forward",
2.23606797749979
],
[
"rotate", -0.32175055439664213
],
[
"forward",
1.4142135623730951
],
[
"rotate", -0.32175055439664213
],
[
"forward",
2.23606797749979
],
[
"rotate",
5.81953769817878
],
[
"forward",
3.0
],
[
"rotate", -0.46364760900080615
],
[
"forward",
2.23606797749979
],
[
"rotate", -0.32175055439664213
],
[
"forward",
2.8284271247461903
],
[
"rotate", -0.4636476090008059
],
[
"forward",
3.1622776601683795
],
[
"rotate", -0.32175055439664235
],
[
"forward",
2.0
],
[
"rotate", -0.32175055439664213
],
[
"forward",
3.1622776601683795
],
[
"rotate", -0.46364760900080615
],
[
"forward",
2.8284271247461903
],
[
"rotate", -0.3217505543966422
],
[
"forward",
2.23606797749979
],
[
"rotate", -0.4636476090008061
],
[
"forward",
3.0
],
[
"rotate", -0.4636476090008061
],
[
"forward",
2.23606797749979
],
[
"rotate", -0.3217505543966422
],
[
"forward",
2.8284271247461903
],
[
"pen-up",
null
],
[
"rotate", -0.24497866312686423
],
[
"forward",
5.830951894845301
],
[
"pen-down",
null
],
[
"rotate",
1.0303768265243125
],
[
"forward",
12.0
],
[
"rotate", -1.5707963267948966
],
[
"forward",
2.0
],
[
"rotate", -0.46364760900080615
],
[
"forward",
2.23606797749979
],
[
"rotate", -0.32175055439664213
],
[
"forward",
1.4142135623730951
],
[
"rotate", -0.32175055439664213
],
[
"forward",
2.23606797749979
],
[
"rotate",
5.81953769817878
],
[
"forward",
3.0
],
[
"rotate", -0.46364760900080615
],
[
"forward",
2.23606797749979
],
[
"rotate", -0.32175055439664213
],
[
"forward",
2.8284271247461903
],
[
"rotate", -0.4636476090008059
],
[
"forward",
3.1622776601683795
],
[
"rotate", -0.32175055439664235
],
[
"forward",
2.0
],
[
"rotate", -0.32175055439664213
],
[
"forward",
3.1622776601683795
],
[
"rotate", -0.46364760900080615
],
[
"forward",
2.8284271247461903
],
[
"rotate", -0.3217505543966422
],
[
"forward",
2.23606797749979
],
[
"rotate", -0.4636476090008061
],
[
"forward",
3.0
],
[
"rotate", -0.4636476090008061
],
[
"forward",
2.23606797749979
],
[
"rotate", -0.3217505543966422
],
[
"forward",
2.8284271247461903
],
[
"pen-up",
null
],
[
"rotate", -0.4366271598135414
],
[
"forward",
11.704699910719626
],
[
"pen-down",
null
],
[
"rotate",
2.7928216500058864
],
[
"forward",
14.0
],
[
"pen-up",
null
],
[
"rotate", -3.141592653589793
],
[
"forward",
10.0
],
[
"pen-down",
null
],
[
"rotate",
0.7853981633974483
],
[
"forward",
4.242640687119285
],
[
"rotate",
0.3217505543966422
],
[
"forward",
2.23606797749979
],
[
"rotate",
0.4636476090008061
],
[
"forward",
3.0
],
[
"rotate",
0.4636476090008061
],
[
"forward",
2.23606797749979
],
[
"rotate",
0.7853981633974483
],
[
"forward",
3.1622776601683795
],
[
"rotate",
0.32175055439664213
],
[
"forward",
10.0
]
];
let data = [
[
"pen-up",
null
],
[
"rotate",
0.41012734054149097
],
[
"forward",
25.079872407968907
],
[
"pen-down",
null
],
[
"rotate",
-1.9809236673363875
],
[
"forward",
1.0
],
[
"rotate",
-0.7853981633974483
],
[
"forward",
1.4142135623730951
],
[
"rotate",
5.497787143782138
],
[
"forward",
1.0
],
[
"rotate",
-0.7853981633974483
],
[
"forward",
1.4142135623730951
],
[
"rotate",
-0.32175055439664213
],
[
"forward",
2.23606797749979
],
[
"rotate",
-0.08314123188844125
],
[
"forward",
5.385164807134504
],
[
"rotate",
0.2074962264352025
],
[
"forward",
3.605551275463989
],
[
"rotate",
0.19739555984988089
],
[
"forward",
2.8284271247461903
],
[
"rotate",
0.32175055439664213
],
[
"forward",
2.23606797749979
],
[
"rotate",
0.46364760900080615
],
[
"forward",
4.0
],
[
"rotate",
-5.81953769817878
],
[
"forward",
2.23606797749979
],
[
"rotate",
0.32175055439664213
],
[
"forward",
1.4142135623730951
],
[
"rotate",
0.32175055439664213
],
[
"forward",
2.23606797749979
],
[
"rotate",
0.46364760900080615
],
[
"forward",
2.0
],
[
"rotate",
0.46364760900080615
],
[
"forward",
2.23606797749979
],
[
"rotate",
0.32175055439664213
],
[
"forward",
1.4142135623730951
],
[
"rotate",
0.2662520491509254
],
[
"forward",
8.06225774829855
],
[
"rotate",
-0.2662520491509254
],
[
"forward",
1.4142135623730951
],
[
"rotate",
-0.32175055439664213
],
[
"forward",
2.23606797749979
],
[
"rotate",
-0.46364760900080615
],
[
"forward",
2.0
],
[
"rotate",
-0.46364760900080615
],
[
"forward",
2.23606797749979
],
[
"rotate",
-0.6435011087932843
],
[
"forward",
2.23606797749979
],
[
"rotate",
5.355890089177974
],
[
"forward",
2.23606797749979
],
[
"rotate",
-0.6435011087932843
],
[
"forward",
2.23606797749979
],
[
"rotate",
-0.46364760900080615
],
[
"forward",
2.0
],
[
"rotate",
-0.32175055439664213
],
[
"forward",
3.1622776601683795
],
[
"rotate",
-0.2662520491509254
],
[
"forward",
3.605551275463989
],
[
"rotate",
-0.032246882435253865
],
[
"forward",
8.602325267042627
],
[
"rotate",
-0.1651486774146269
],
[
"forward",
2.8284271247461903
],
[
"rotate",
-0.3217505543966422
],
[
"forward",
2.23606797749979
],
[
"rotate",
-0.4636476090008061
],
[
"forward",
2.0
],
[
"rotate",
-0.7853981633974483
],
[
"forward",
1.4142135623730951
],
[
"rotate",
-0.7853981633974483
],
[
"forward",
1.0
]
createCanvas(640, 240);
}
function draw() {
background(220);
translate(width * 0.5, height * 0.5);
scale(1.5);
strokeWeight(1.5);
for (let item of data) {
switch (item[0]) {
case "push":
push();
break;
case "pop":
pop();
break;
case "pen-up":
noStroke();
break;
case "pen-down":
stroke(0);
break;
case "rotate":
case "rot-right":
rotate(item[1] * map(mouseX/width, 0, 1, 2, -2));
break;
case "rot-left":
rotate(item[1] * -1);
break;
case "forward":
line(0, 0, item[1] * map(mouseY/height, 0, 1, -5, 5), 0);
translate(item[1], 0);
break;
}
}
}
let rules = [
{
"match": function(instr) {
return instr[0] == 'forward';
},
"replace": function(instr) {
return [
["push", null],
["rotate", PI * -0.25],
["forward", instr[1] * 0.5],
["pop", null],
["push", null],
["rotate", PI * 0.25],
["forward", instr[1] * 0.5],
["pop", null],        
]
}
}
]
function lsys(instrs, rules) {
let out = [];
for (let instr of instrs) {
for (let rule of rules) {
if (rule["matches"](instr)) {
for (let newrule of rule["replace"]) {
out.push(newrule)
}
}
else {
out.push(rule);
}
}
}
return out;
}
let data = [
[
"pen-up",
null
],
[
"rotate",
0.4899573262537283
],
[
"forward",
17.0
],
[
"pen-down",
null
],
[
"rotate",
1.0808390005411683
],
[
"forward",
21.0
],
[
"pen-up",
null
],
[
"rotate",
-3.141592653589793
],
[
"forward",
18.0
],
[
"pen-down",
null
],
[
"rotate",
-0.7853981633974483
],
[
"forward",
2.8284271247461903
],
[
"rotate",
-0.32175055439664213
],
[
"forward",
2.23606797749979
],
[
"rotate",
5.81953769817878
],
[
"forward",
3.0
],
[
"rotate",
-0.46364760900080615
],
[
"forward",
2.23606797749979
],
[
"rotate",
-0.32175055439664213
],
[
"forward",
2.8284271247461903
],
[
"rotate",
-0.4636476090008059
],
[
"forward",
3.1622776601683795
],
[
"rotate",
-0.32175055439664235
],
[
"forward",
2.0
],
[
"rotate",
-0.32175055439664213
],
[
"forward",
3.1622776601683795
],
[
"rotate",
-0.46364760900080615
],
[
"forward",
2.8284271247461903
],
[
"rotate",
-0.3217505543966422
],
[
"forward",
2.23606797749979
],
[
"rotate",
-0.4636476090008061
],
[
"forward",
3.0
],
[
"rotate",
-0.4636476090008061
],
[
"forward",
2.23606797749979
],
[
"rotate",
-0.3217505543966422
],
[
"forward",
2.8284271247461903
],
[
"pen-up",
null
],
[
"rotate",
-0.4366271598135414
],
[
"forward",
11.704699910719626
],
[
"pen-down",
null
],
[
"rotate",
2.7928216500058864
],
[
"forward",
10.0
],
[
"rotate",
-0.32175055439664213
],
[
"forward",
3.1622776601683795
],
[
"rotate",
-0.7853981633974483
],
[
"forward",
2.23606797749979
],
[
"rotate",
-0.4636476090008061
],
[
"forward",
3.0
],
[
"rotate",
-0.4636476090008061
],
[
"forward",
2.23606797749979
],
[
"rotate",
-0.3217505543966422
],
[
"forward",
4.242640687119285
],
[
"pen-up",
null
],
[
"rotate",
-0.7853981633974483
],
[
"forward",
10.0
],
[
"pen-down",
null
],
[
"rotate",
3.141592653589793
],
[
"forward",
14.0
],
[
"pen-up",
null
],
[
"rotate",
-2.321725389192837
],
[
"forward",
20.518284528683193
],
[
"pen-down",
null
],
[
"rotate",
2.321725389192837
],
[
"forward",
14.0
],
[
"pen-up",
null
],
[
"rotate",
-3.141592653589793
],
[
"forward",
11.0
],
[
"pen-down",
null
],
[
"rotate",
-0.7853981633974483
],
[
"forward",
2.8284271247461903
],
[
"rotate",
-0.32175055439664213
],
[
"forward",
2.23606797749979
],
[
"rotate",
5.81953769817878
],
[
"forward",
3.0
],
[
"rotate",
-0.46364760900080615
],
[
"forward",
2.23606797749979
],
[
"rotate",
-0.32175055439664213
],
[
"forward",
2.8284271247461903
],
[
"rotate",
-0.4636476090008059
],
[
"forward",
3.1622776601683795
],
[
"rotate",
-0.32175055439664235
],
[
"forward",
2.0
],
[
"rotate",
-0.32175055439664213
],
[
"forward",
3.1622776601683795
],
[
"rotate",
-0.46364760900080615
],
[
"forward",
2.8284271247461903
],
[
"rotate",
-0.3217505543966422
],
[
"forward",
2.23606797749979
],
[
"rotate",
-0.4636476090008061
],
[
"forward",
3.0
],
[
"rotate",
-0.4636476090008061
],
[
"forward",
2.23606797749979
],
[
"rotate",
-0.3217505543966422
],
[
"forward",
2.8284271247461903
],
[
"pen-up",
null
],
[
"rotate",
-0.4366271598135414
],
[
"forward",
11.704699910719626
],
[
"pen-down",
null
],
[
"rotate",
2.7928216500058864
],
[
"forward",
14.0
],
[
"pen-up",
null
],
[
"rotate",
-3.141592653589793
],
[
"forward",
8.0
],
[
"pen-down",
null
],
[
"rotate",
0.32175055439664213
],
[
"forward",
3.1622776601683795
],
[
"rotate",
0.46364760900080615
],
[
"forward",
2.8284271247461903
],
[
"rotate",
0.3217505543966422
],
[
"forward",
2.23606797749979
],
[
"rotate",
0.4636476090008061
],
[
"forward",
3.0
],
[
"pen-up",
null
],
[
"rotate",
-0.9505468408120752
],
[
"forward",
8.602325267042627
],
[
"pen-down",
null
],
[
"rotate",
2.5213431676069717
],
[
"forward",
17.0
],
[
"rotate",
-0.32175055439664213
],
[
"forward",
3.1622776601683795
],
[
"rotate",
-0.7853981633974483
],
[
"forward",
2.23606797749979
],
[
"rotate",
-0.4636476090008061
],
[
"forward",
2.0
],
[
"pen-up",
null
],
[
"rotate",
-2.0899424410414196
],
[
"forward",
16.1245154965971
],
[
"pen-down",
null
],
[
"rotate",
2.0899424410414196
],
[
"forward",
7.0
],
[
"pen-up",
null
],
[
"rotate",
0.0
],
[
"forward",
15.0
],
[
"pen-down",
null
],
[
"rotate",
2.2367655641740063
],
[
"forward",
17.804493814764857
],
[
"pen-up",
null
],
[
"rotate",
-3.807561890968903
],
[
"forward",
14.0
],
[
"pen-down",
null
],
[
"rotate",
1.5707963267948966
],
[
"forward",
11.0
],
[
"pen-up",
null
],
[
"rotate",
2.2367655641740063
],
[
"forward",
17.804493814764857
],
[
"pen-down",
null
],
[
"rotate",
-2.2367655641740063
],
[
"forward",
11.0
],
[
"pen-up",
null
],
[
"rotate",
-1.4288992721907328
],
[
"forward",
14.142135623730951
],
[
"pen-down",
null
],
[
"rotate",
2.5948038127005457
],
[
"forward",
15.231546211727817
],
[
"pen-up",
null
],
[
"rotate",
-2.3318090810196264
],
[
"forward",
15.231546211727817
],
[
"pen-down",
null
],
[
"rotate",
3.141592653589793
],
[
"forward",
15.231546211727817
],
[
"rotate",
0.05875582271572277
],
[
"forward",
4.47213595499958
],
[
"rotate",
0.32175055439664213
],
[
"forward",
2.8284271247461903
],
[
"rotate",
0.32175055439664213
],
[
"forward",
2.23606797749979
],
[
"rotate",
0.46364760900080615
],
[
"forward",
1.0
],
[
"pen-up",
null
],
[
"rotate",
-4.085646079173642
],
[
"forward",
35.805027579936315
],
[
"pen-up",
null
],
[
"rotate",
2.05120214337794
],
[
"forward",
8.94427190999916
],
[
"pen-down",
null
],
[
"rotate",
0.46364760900080615
],
[
"forward",
14.0
],
[
"pen-up",
null
],
[
"rotate",
-3.141592653589793
],
[
"forward",
10.0
],
[
"pen-down",
null
],
[
"rotate",
0.7853981633974483
],
[
"forward",
4.242640687119285
],
[
"rotate",
0.3217505543966422
],
[
"forward",
2.23606797749979
],
[
"rotate",
0.4636476090008061
],
[
"forward",
3.0
],
[
"rotate",
0.4636476090008061
],
[
"forward",
2.23606797749979
],
[
"rotate",
0.7853981633974483
],
[
"forward",
3.1622776601683795
],
[
"rotate",
0.32175055439664213
],
[
"forward",
10.0
],
[
"pen-up",
null
],
[
"rotate",
-3.141592653589793
],
[
"forward",
10.0
],
[
"pen-down",
null
],
[
"rotate",
0.7853981633974483
],
[
"forward",
4.242640687119285
],
[
"rotate",
0.3217505543966422
],
[
"forward",
2.23606797749979
],
[
"rotate",
0.4636476090008061
],
[
"forward",
3.0
],
[
"rotate",
0.4636476090008061
],
[
"forward",
2.23606797749979
],
[
"rotate",
0.7853981633974483
],
[
"forward",
3.1622776601683795
],
[
"rotate",
0.32175055439664213
],
[
"forward",
10.0
],
[
"pen-up",
null
],
[
"rotate",
-2.321725389192837
],
[
"forward",
20.518284528683193
],
[
"pen-down",
null
],
[
"rotate",
2.321725389192837
],
[
"forward",
14.0
],
[
"pen-up",
null
],
[
"rotate",
-3.141592653589793
],
[
"forward",
11.0
],
[
"pen-down",
null
],
[
"rotate",
-0.7853981633974483
],
[
"forward",
2.8284271247461903
],
[
"rotate",
-0.32175055439664213
],
[
"forward",
2.23606797749979
],
[
"rotate",
5.81953769817878
],
[
"forward",
3.0
],
[
"rotate",
-0.46364760900080615
],
[
"forward",
2.23606797749979
],
[
"rotate",
-0.32175055439664213
],
[
"forward",
2.8284271247461903
],
[
"rotate",
-0.4636476090008059
],
[
"forward",
3.1622776601683795
],
[
"rotate",
-0.32175055439664235
],
[
"forward",
2.0
],
[
"rotate",
-0.32175055439664213
],
[
"forward",
3.1622776601683795
],
[
"rotate",
-0.46364760900080615
],
[
"forward",
2.8284271247461903
],
[
"rotate",
-0.3217505543966422
],
[
"forward",
2.23606797749979
],
[
"rotate",
-0.4636476090008061
],
[
"forward",
3.0
],
[
"rotate",
-0.4636476090008061
],
[
"forward",
2.23606797749979
],
[
"rotate",
-0.3217505543966422
],
[
"forward",
2.8284271247461903
],
[
"pen-up",
null
],
[
"rotate",
-0.4366271598135414
],
[
"forward",
11.704699910719626
],
[
"pen-down",
null
],
[
"rotate",
2.7928216500058864
],
[
"forward",
14.0
],
[
"pen-up",
null
],
[
"rotate",
-3.141592653589793
],
[
"forward",
10.0
],
[
"pen-down",
null
],
[
"rotate",
0.7853981633974483
],
[
"forward",
4.242640687119285
],
[
"rotate",
0.3217505543966422
],
[
"forward",
2.23606797749979
],
[
"rotate",
0.4636476090008061
],
[
"forward",
3.0
],
[
"rotate",
0.4636476090008061
],
[
"forward",
2.23606797749979
],
[
"rotate",
0.7853981633974483
],
[
"forward",
3.1622776601683795
],
[
"rotate",
0.32175055439664213
],
[
"forward",
10.0
],
[
"pen-up",
null
],
[
"rotate",
-3.141592653589793
],
[
"forward",
10.0
],
[
"pen-down",
null
],
[
"rotate",
0.7853981633974483
],
[
"forward",
4.242640687119285
],
[
"rotate",
0.3217505543966422
],
[
"forward",
2.23606797749979
],
[
"rotate",
0.4636476090008061
],
[
"forward",
3.0
],
[
"rotate",
0.4636476090008061
],
[
"forward",
2.23606797749979
],
[
"rotate",
0.7853981633974483
],
[
"forward",
3.1622776601683795
],
[
"rotate",
0.32175055439664213
],
[
"forward",
10.0
],
[
"pen-up",
null
],
[
"rotate",
-2.9533711482850222
],
[
"forward",
21.37755832643195
],
[
"pen-down",
null
],
[
"rotate",
2.9533711482850222
],
[
"forward",
21.0
],
[
"pen-up",
null
],
[
"rotate",
-3.141592653589793
],
[
"forward",
11.0
],
[
"pen-down",
null
],
[
"rotate",
0.7853981633974483
],
[
"forward",
2.8284271247461903
],
[
"rotate",
0.3217505543966422
],
[
"forward",
2.23606797749979
],
[
"rotate",
0.4636476090008061
],
[
"forward",
3.0
],
[
"rotate",
0.4636476090008061
],
[
"forward",
2.23606797749979
],
[
"rotate",
0.3217505543966422
],
[
"forward",
2.8284271247461903
],
[
"rotate",
0.46364760900080615
],
[
"forward",
3.1622776601683795
],
[
"rotate",
0.32175055439664213
],
[
"forward",
2.0
],
[
"rotate",
0.32175055439664235
],
[
"forward",
3.1622776601683795
],
[
"rotate",
0.4636476090008059
],
[
"forward",
2.8284271247461903
],
[
"rotate",
0.32175055439664213
],
[
"forward",
2.23606797749979
],
[
"rotate",
0.46364760900080615
],
[
"forward",
3.0
],
[
"rotate",
-5.81953769817878
],
[
"forward",
2.23606797749979
],
[
"rotate",
0.32175055439664213
],
[
"forward",
2.8284271247461903
],
[
"pen-up",
null
],
[
"rotate",
1.853351279264484
],
[
"forward",
22.825424421026653
],
[
"pen-down",
null
],
[
"rotate",
3.180788255516848
],
[
"forward",
2.23606797749979
],
[
"rotate",
-0.32175055439664213
],
[
"forward",
2.8284271247461903
],
[
"rotate",
-0.4636476090008059
],
[
"forward",
3.1622776601683795
],
[
"rotate",
-0.32175055439664235
],
[
"forward",
2.0
],
[
"rotate",
-0.32175055439664213
],
[
"forward",
3.1622776601683795
],
[
"rotate",
-0.46364760900080615
],
[
"forward",
2.8284271247461903
],
[
"rotate",
-0.3217505543966422
],
[
"forward",
2.23606797749979
],
[
"rotate",
-0.4636476090008061
],
[
"forward",
3.0
],
[
"rotate",
-0.4636476090008061
],
[
"forward",
2.23606797749979
],
[
"rotate",
-0.3217505543966422
],
[
"forward",
2.8284271247461903
],
[
"rotate",
-0.46364760900080615
],
[
"forward",
3.1622776601683795
],
[
"rotate",
-0.32175055439664213
],
[
"forward",
2.0
],
[
"rotate",
-0.32175055439664235
],
[
"forward",
3.1622776601683795
],
[
"rotate",
-0.4636476090008059
],
[
"forward",
2.8284271247461903
],
[
"rotate",
-0.32175055439664213
],
[
"forward",
2.23606797749979
],
[
"rotate",
5.81953769817878
],
[
"forward",
3.0
]
]let slider;
function setup() {
createCanvas(400, 400);
background(220);
let b = createButton("Click for ellipse");
b.mousePressed(drawRandomRectangle);
b.position(10, 10);
let clearButton = createButton("Clear!");
clearButton.mousePressed(clearCanvas);
clearButton.position(10, 50);
slider = createSlider(0, 255, 0);
slider.position(10, 100);
}
function draw() {
}
function clearCanvas() {
background(255);
}
function drawRandomRectangle() {
strokeWeight(10);
stroke(40);
fill(slider.value(), 192);
ellipse(random(width), random(height),
random(width), random(height));
}let c;
function setup() {
c = createCanvas(400, 400);
}
function draw() {
background(220);
ellipse(random(width), random(height), 20, 20);
}
function mousePressed() {
let tagObj = createP("hello!");
tagObj.position(random(width), random(height));
tagObj.style('font-size', random(1000) + 'px');
tagObj.style('color',
color(random(255), random(255), random(255))
);
}let rectY = [
{ypos: 0, xwidth: 50, speed: 4},
{ypos: 25, xwidth: 50, speed: 3},
{ypos: 25, xwidth: 150, speed: 2}
];
console.log(rectY[0].ypos);
let penelope = [];
function setup() {
createCanvas(400, 400);
rectMode(CENTER);
}
function draw() {
background(220);
fill(255, 192);
noStroke();
for (let i = 0; i < rectY.length; i++) {
rect(width/2, rectY[i].ypos,
rectY[i].xwidth, 25);
if (rectY[i].ypos < height) {
rectY[i].ypos = rectY[i].ypos + rectY[i].speed;
}
}
console.log(rectY.length == penelope.length);
}
function mousePressed() {
rectY.push(
{ypos: mouseY,
xwidth: random(50, 250),
speed: random(-1, 2)}
);
}
let fluffy = {
mass: 4,
volume: 1,
length: 25,
albedo: 50
};
let bob = {
mass: 40,
volume: 100,
length: 250,
albedo: 25
};
let charles = {
mass: 8000000,
volume: 9999999,
length: 250000,
albedo: 10
};
return a.mass / a.volume;
}
function getAnimalLoudness(a) {
if (a.mass < 10000) {
return 0;
}
else {
return 100;
}
}
function makeAnimalNoise(a) {
if (getAnimalLoudness(a) >= 100) {
console.log("BOOM!");
}
else {
console.log("mew!");
}
}
let helloAnimal = {
mass: random(100000),
volume: random(100000),
length: random(100000),
albedo: random(100)
};
return helloAnimal;
}
allAnimals = [fluffy, bob, charles];
function setup() {
createCanvas(400, 400);
for (let i = 0; i < 12; i++) {
allAnimals.push(createAnimal());
}
for (let i = 0; i < allAnimals.length; i++) {
console.log("density", calculateAnimalDensity(allAnimals[i]));
console.log("loudness", getAnimalLoudness(allAnimals[i]));
console.log("this animal goes:");
makeAnimalNoise(allAnimals[i]);
}
}
function draw() {
background(220);
constructor(mass, volume, length, albedo) {
this.mass = mass;
this.volume = volume;
this.length = length;
this.albedo = albedo;
}
return this.mass / this.volume;
}
getLoudness() {
if (this.mass < 10000) {
return 0;
} else {
return 100;
}
}
makeNoise() {
if (this.getLoudness() >= 100) {
console.log("BOOM!");
} else {
console.log("mew!");
}
}
}
let allAnimals = [];
function setup() {
createCanvas(400, 400);
for (let i = 0; i < 12; i++) {
allAnimals.push(new Animal());
}
for (let i = 0; i < allAnimals.length; i++) {
console.log("density", allAnimals[i].calculateDensity());
console.log("loudness", allAnimals[i].getLoudness());
console.log("this animal goes:");
allAnimals[i].makeNoise();
}
}
function draw() {
background(220);
}function setup() {
createCanvas(400, 400);
ws.onmessage = function(ev) {
console.log(ev.data);
}
}
function draw() {
background(220);
}function preload() {
let x = loadStrings("foo.txt");
console.log(x);
}
function setup() {
createCanvas(400, 400);
let x = createP("hello");
x.position(20, 20);
}
function draw() {
background(255, 0);
push();
translate(mouseX, mouseY);
glyphs["a"]();
pop();
}let rectY = [
{ypos: 0, xwidth: 50, speed: 4},
{ypos: 25, xwidth: 50, speed: 3},
{ypos: 25, xwidth: 150, speed: 2}
];
console.log(rectY[0].ypos);
let penelope = [];
function setup() {
createCanvas(400, 400);
rectMode(CENTER);
}
function draw() {
background(220);
fill(255, 192);
noStroke();
for (let i = 0; i < rectY.length; i++) {
rect(width/2, rectY[i].ypos,
rectY[i].xwidth, 25);
if (rectY[i].ypos < height) {
rectY[i].ypos = rectY[i].ypos + rectY[i].speed;
}
}
console.log(rectY.length == penelope.length);
}
function mousePressed() {
rectY.push(
{ypos: mouseY,
xwidth: random(50, 250),
speed: random(-1, 2)}
);
}
let x = [5, 10, 15, 20, 25];
let y = 4;
function setup() {
createCanvas(400, 400);
console.log( x[y] );
console.log([2, 4, 6, 8, 10, 12][3]);
console.log(x.length-1);
let z = x[y];
console.log(z);
for (let i = 0; i < x.length; i++) {
console.log("in loop!", x[i]);
}
}
function draw() {
background(220);
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
translate(100, 100);
for (let i = 0; i < 10; i++) {
push();
translate(0, i*15);
rotate(i * (mouseX/width) * 0.5);
scale(0.5 + i * (mouseY/height) * 0.1);
ellipse(0, 0, 75, 25);
pop();
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
fill(255, 0, 0);
ellipse(0, 0, 25, 25);
fill(255);
makeFace();
push();
translate(mouseX, mouseY);
fill(255, 0, 0);
ellipse(0, 0, 25, 25);
fill(255);
makeFace();
pop();
push();
translate(60, 150);
makeFace();
pop();
for (let i = 0; i < 100; i++) {
push();
translate(random(width), random(height));
scale(random(-0.5, 1000));
rotate(random(TWO_PI));
makeFace();
pop();
}
noLoop();
}
function makeFace() {
ellipse(-25, 0, 20, 20);
ellipse(25, 0, 20, 20);
arc(0, 25, 50, 25, 0, PI);
}function setup() {
noCanvas();
createP("Click to step through the simulation.");
}
function draw() {
background(220);
}
function keyPressed() {
mousePressed();
}
function mousePressed() {
let storyEvents = n.stepAndRender();
if (storyEvents.length > 0) {
for (let ev of storyEvents) {
createP(ev);
}
}
window.scrollTo(0,document.body.scrollHeight);
}
let n = new seaduck.Narrative({
"nouns": [
{
"name": "Bob",
"properties": {
"hungry": true
},
"tags": ["person"]
},
{
"name": "Chris",
"properties": {
"hungry": true
},
"tags": ["person"]
},
{
"name": "Drusilla",
"properties": {
"hungry": false
},
"tags": ["person"]
}
],
"actions": [
{
"match": ["#person"],
"when": function(a) {
return a.properties.hungry;
},
"action": function*(a) {
a.properties.hungry = false;
yield new seaduck.StoryEvent("eats_something", a);
}
},
{
"match": ["#person"],
"when": function(a) {
return !a.properties.hungry;
},
"action": function*(a) {
a.properties.hungry = true;
yield new seaduck.StoryEvent("gets_hungry", a);
}
}
],
"traceryDiscourse": {
"food": ["apple", "orange", "pop tart", "Big Mac", "slim jim"],
"eats_something": ["#nounA# ate #food.a#."],
"_end": ["And they all lived happily ever after."],
"gets_hungry": ["Suddenly, #nounA# had severe hunger pangs.",
"'Oh wow,' said #nounA#. 'Have I got the munchies.'"]
}
});
function setup() {
noCanvas();
createP("Click to step through the simulation.");
}
function draw() {
background(220);
}
function keyPressed() {
mousePressed();
}
function mousePressed() {
let storyEvents = n.stepAndRender();
if (storyEvents.length > 0) {
for (let ev of storyEvents) {
createP(ev);
}
}
window.scrollTo(0,document.body.scrollHeight);
}
let n = new seaduck.Narrative({
"nouns": [
{
"name": "kitchen",
"properties": {},
"tags": ["room"]
},
{
"name": "living room",
"properties": {},
"tags": ["room"]
},
{
"name": "study",
"properties": {},
"tags": ["room"]
},
{
"name": "Max",
"properties": {
"has_drink": false
},
"tags": ["person"]
},
{
"name": "Rory",
"properties": {
"has_drink": false
},
"tags": ["person"]
},
{
"name": "coffee",
"properties": {},
"tags": ["drink"]
},
{
"name": "tea",
"properties": {},
"tags": ["drink"]
}
],
"initialize": function*() {
this.reciprocal(
"connects to", this.noun("kitchen"), this.noun("living room"));
this.reciprocal(
"connects to", this.noun("kitchen"), this.noun("study"));
this.relate(
"currently in", this.noun("Max"), this.noun("living room"));
yield new seaduck.StoryEvent(
"in", this.noun("Max"), this.noun("living room"));
this.relate(
"currently in", this.noun("Rory"), this.noun("study"));
yield new seaduck.StoryEvent(
"in", this.noun("Rory"), this.noun("study"));
this.relate(
"currently in", this.noun("coffee"), this.noun("kitchen"));
yield new seaduck.StoryEvent(
"in", this.noun("coffee"), this.noun("kitchen"));
this.relate(
"currently in", this.noun("tea"), this.noun("kitchen"));
yield new seaduck.StoryEvent(
"in", this.noun("tea"), this.noun("kitchen"));
},
"actions": [
{
"name": "take",
"match": ["#person", "#drink"],
"when": function(a, b) {
let aLocation = this.relatedByTag("currently in", a, "room");
let bLocation = this.relatedByTag("currently in", b, "room");
return aLocation == bLocation && !a.properties.has_drink;
},
"action": function*(a, b) {
yield (new seaduck.StoryEvent("take", a, b));
this.unrelateByTag("currently in", b, "room");
a.properties.has_drink = true;
}
},
{
"name": "move",
"match": ["#person"],
"when": function(a) {
return !(this.isRelated("currently in", a, this.noun("study"))
&& a.properties.has_drink);
},
"action": function*(a) {
let current = this.relatedByTag("currently in", a, "room");
let dests = this.allRelatedByTag("connects to", current, "room");
let chosenDest = this.choice(dests);
this.unrelate("currently in", a, current);
this.relate("currently in", a, chosenDest);
yield (new seaduck.StoryEvent("moveTo", a, chosenDest));
}
},
{
"name": "talk",
"match": ["#person", "#person"],
"when": function(a, b) {
let aLocation = this.relatedByTag("currently in", a, "room");
let bLocation = this.relatedByTag("currently in", b, "room");
return aLocation == bLocation;
},
"action": function*(a, b) {
yield (new seaduck.StoryEvent("chatsWith", a, b));
}
},
{
"name": "work",
"match": ["#person"],
"when": function(a) {
return this.isRelated("currently in", a, this.noun("study"))
&& a.properties.has_drink;
},
"action": function*(a) {
yield (new seaduck.StoryEvent("isWorking", a));
}
},
{
"name": "play video games",
"match": ["#person"],
"when": function(a) {
return this.isRelated("currently in", a, this.noun("living room"));
},
"action": function*(a) {
yield (new seaduck.StoryEvent("playGames", a));
}
}
],
"traceryDiscourse": {
"in": [
"#nounA.capitalize# was in the #nounB#."
],
"take": [
"#nounA# took #nounB#.",
"'Oh, hey, #nounB#!' said #nounA#, and picked it up."
],
"moveTo": [
"After a while, #nounA# went into the #nounB#.",
"#nounA# decided to go into the #nounB#."
],
"topic": ["the weather", "the garden", "the phase of the moon",
"#nounA#'s family", "the books they've been reading"],
"chatsWith": [
"#nounA# and #nounB# chatted for a bit.",
"#nounA# asked #nounB# how their day was going.",
"#nounB# told #nounA# about a dream they had last night.",
"#nounA# and #nounB# talked for a bit about #topic#."
],
"isWorking": [
"#nounA# typed furiously on their laptop.",
"#nounA# was taking notes while reading a book from the library.",
"#nounA# sighed as they clicked 'Send' on another e-mail."
],
"videoGame": ["Destiny 2", "Splatoon 2", "Skyrim", "Zelda", "Bejeweled"],
"playGames": [
"#nounA# sat down to play #videoGame# for a while.",
"#nounA# decided to get a few minutes of #videoGame# in.",
"#nounA# turned on the video game console. 'Ugh I love #videoGame# so much,' said #nounA#."
],
"_end": [
"The end."
]
}
});
function setup() {
noCanvas();
createP("Click to step through the simulation.");
}
function draw() {
background(220);
}
function keyPressed() {
mousePressed();
}
function mousePressed() {
let storyEvents = n.stepAndRender();
if (storyEvents.length > 0) {
for (let ev of storyEvents) {
createP(ev);
}
}
window.scrollTo(0,document.body.scrollHeight);
}
let n = new seaduck.Narrative({
"nouns": [
{
"name": "Joe",
"properties": {
"happiness": 0,
"hungry": true
},
"tags": ["person"]
},
{
"name": "Mary",
"properties": {
"happiness": 0,
"hungry": true
},
"tags": ["person"]
},
{
"name": "Horatio",
"properties": {
"happiness": 0,
"hungry": true
},
"tags": ["person"]
},
{
"name": "cookie",
"properties": {
"tastiness": 2,
"eaten": false
},
"tags": ["food"]
},
{
"name": "spinach",
"properties": {
"tastiness": 1,
"eaten": false
},
"tags": ["food"]
},
{
"name": "cake",
"properties": {
"tastiness": 3,
"eaten": false
},
"tags": ["food"]
}
],
"initialize": function*() {
for (let noun of this.getNounsByProperty("hungry", true)) {
yield (new seaduck.StoryEvent("isHungry", noun));
}
},
"actions": [
{
"name": "eat",
"match": ["#person", "#food"],
"when": function(a, b) {
return a.properties.hungry 
&& b.properties.tastiness > 0 
&& !b.properties.eaten;
},
"action": function*(a, b) {
yield (new seaduck.StoryEvent("eat", a, b));
a.properties.hungry = false;
b.properties.eaten = true;
a.properties.happiness += b.properties.tastiness;
if (b.properties.tastiness >= 2) {
yield (new seaduck.StoryEvent("reallyLike", a, b));
}
}
},
{
"name": "befriend",
"match": ["#person", "#person"],
"when": function(a, b) {
return (
(!a.properties.hungry && !b.properties.hungry) 
&& !this.isRelated("friendship", a, b));
},
"action": function*(a, b) {
yield (new seaduck.StoryEvent("makeFriends", a, b));
this.reciprocal("friendship", a, b);
}
},
{
"name": "express happiness",
"match": ["#person"],
"when": function(a) {
return !a.properties.hungry 
&& a.properties.happiness >= 2 
&& this.allRelatedByTag("friendship", a, "#person").length > 0;
},
"action": function*(a) {
yield (new seaduck.StoryEvent("isHappy", a));
}
}
],
"traceryDiscourse": {
"isHappy": ["#nounA# was happy", "#nounA# felt good!"],
"isHungry": [
"#nounA# had a rumble in their tummy.",
"#nounA# felt very hungry."],
"makeFriends": [
"#nounA# made friends with #nounB#.",
"#nounA# and #nounB# became friends."],
"reallyLike": [
"And let me tell you, #nounA# really enjoyed that #nounB#.",
"#nounA# says, 'This #nounB# is so delicious!'"
],
"eat": [
"#nounA# ate a #nounB#.",
"#nounA# gobbled up a #nounB#."
],
"_end": ["The end.", "And they lived happily ever after."]
}
});
function setup() {
noCanvas();
createP("Click to step through the simulation.");
}
function draw() {
background(220);
}
function keyPressed() {
mousePressed();
}
function mousePressed() {
let storyEvents = n.stepAndRender();
if (storyEvents.length > 0) {
for (let ev of storyEvents) {
createP(ev);
}
}
window.scrollTo(0,document.body.scrollHeight);
}
let n = new seaduck.Narrative({
"nouns": [
{
"name": "Chris",
"properties": {
"sleepiness": 0
},
"tags": ["person"]
},
{
"name": "Finn",
"properties": {
"sleepiness": 5
},
"tags": ["person"]
},
{
"name": "top bunk",
"properties": {
"occupied": false
},
"tags": ["bed"]
},
{
"name": "bottom bunk",
"properties": {
"occupied": false
},
"tags": ["bed"]
}
],
"actions": [
{
"match": ["#person"],
"when": function(a) {
return a.properties.sleepiness < 10;
},
"action": function*(a) {
a.properties.sleepiness++;
yield new seaduck.StoryEvent("moreSleepy", a);
}
},
{
"match": ["#person"],
"when": function(a) {
return a.properties.sleepiness == 7;
},
"action": function*(a) {
yield new seaduck.StoryEvent("reallySleepy", a);
}
},
{
"match": ["#person", "#bed"],
"when": function(a, b) {
return a.properties.sleepiness >= 10 
&& !this.relatedByTag("sleepingIn", a, "bed")
&& !b.properties.occupied;
},
"action": function*(a, b) {
this.relate("sleepingIn", a, b);
b.properties.occupied = true;
yield new seaduck.StoryEvent("getsInto", a, b);
}
},
{
"match": ["#person", "#bed"],
"when": function(a, b) {
return this.isRelated("sleepingIn", a, b);
},
"action": function*(a, b) {
yield new seaduck.StoryEvent("asleep", a, b);
}
}
],
"traceryDiscourse": {
"moreSleepy": [
"#nounA# yawns.",
"#nounA#'s eyelids droop.",
"#nounA# nods off for a second, then perks up.",
"#nounA# says, 'I could use a cup of coffee.'",
"'I don't think I can stay awake a minute longer,' says #nounA# to no one in particular.",
"#nounA# checks their watch."
],
"adverb": ["at last", "finally", "not a moment too soon"],
"getsInto": [
"#adverb.capitalize#, #nounA# gets into the #nounB#.",
"#adverb.capitalize#, #nounA# climbs into the #nounB#."
],
"asleep": [
"#nounA# is asleep in the #nounB#.",
"#nounA# snores beneath the covers of the #nounB#.",
"#nounA# sleep-mumbles peacefully in the #nounB#."
],
"reallySleepy": [
"#nounA# is really sleepy.",
"'I'm just about ready to hit the hay,' says #nounA#.",
"You can tell just by looking at them that #nounA# really needs some rest."
],
"_end": [
"Good night."
]
}
});
function setup() {
noCanvas();
createP("Click to step through the simulation.");
}
function draw() {
background(220);
}
function keyPressed() {
mousePressed();
}
function mousePressed() {
let storyEvents = n.stepAndRender();
if (storyEvents.length > 0) {
for (let ev of storyEvents) {
createP(ev);
}
}
}
let n = new seaduck.Narrative({
"nouns": [
{
"name": "Chris",
"properties": {
"sleepiness": 0
},
"tags": ["person"]
},
{
"name": "king-size bed",
"properties": {
"occupied": false
},
"tags": ["bed"]
},
],
"actions": [
{
"match": ["Chris"],
"when": function(a) {
return a.properties.sleepiness < 10;
},
"action": function*(a) {
a.properties.sleepiness++;
yield new seaduck.StoryEvent("moreSleepy", a);
}
},
{
"match": ["Chris"],
"when": function(a) {
return a.properties.sleepiness == 7;
},
"action": function*(a) {
yield new seaduck.StoryEvent("reallySleepy", a);
}
},
{
"match": ["Chris", "king-size bed"],
"when": function(a, b) {
return a.properties.sleepiness >= 10 
&& !this.isRelated("sleepingIn", a, b)
&& !b.properties.occupied;
},
"action": function*(a, b) {
this.relate("sleepingIn", a, b);
b.properties.occupied = true;
yield new seaduck.StoryEvent("getsInto", a, b);
}
},
{
"match": ["Chris", "king-size bed"],
"when": function(a, b) {
return this.isRelated("sleepingIn", a, b);
},
"action": function*(a, b) {
yield new seaduck.StoryEvent("asleep", a, b);
}
}
],
"traceryDiscourse": {
"moreSleepy": [
"#nounA# yawns.",
"#nounA#'s eyelids droop.",
"#nounA# nods off for a second, then perks up.",
"#nounA# says, 'I could use a cup of coffee.'",
"'I don't think I can stay awake a minute longer,' says #nounA# to no one in particular.",
"#nounA# checks their watch."
],
"adverb": ["at last", "finally", "not a moment too soon"],
"getsInto": [
"#adverb.capitalize#, #nounA# gets into the #nounB#.",
"#adverb.capitalize#, #nounA# climbs into the #nounB#."
],
"asleep": [
"#nounA# is asleep in the #nounB#.",
"#nounA# snores beneath the covers of the #nounB#.",
"#nounA# sleep-mumbles peacefully in the #nounB#."
],
"reallySleepy": [
"#nounA# is really sleepy.",
"'I'm just about ready to hit the hay,' says #nounA#.",
"You can tell just by looking at them that #nounA# really needs some rest."
],
"_end": [
"Good night."
]
}
});
function setup() {
createCanvas(400, 400);
}
function makeFace(faceX, faceY, smileHeight) {
ellipse(faceX, faceY, 40, 40);
ellipse(faceX + 80, faceY, 40, 40);
arc(faceX + 40, faceY + 40, 80, smileHeight, 0, PI);
}
function draw() {
background(220);
noFill();
stroke(40);
strokeWeight(12);
for (let i = 0; i < 5; i++) {
makeFace(width/2, i * 80, 
map(sin(i+frameCount*0.1), -1, 1, 0, 40));
}
}function goodConstrain(inputVal, rangeLow, rangeHigh) {
if (inputVal <= rangeLow) {
return rangeLow;
}
else if (inputVal >= rangeHigh) {
return rangeHigh;
}
else {
return inputVal;
}
}
function square(n) {
return n * n;
}
function setup() {
createCanvas(400, 400);
console.log(square(4));
for (let i = -5; i < 5; i++) {
console.log(goodConstrain(i, 0, 3));
}
}
function draw() {
background(220);
ellipse(square(mouseX), square(mouseY), 20, 20);
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(
map(constrain(mouseX, 0, width), 0, width, 64, 192)
);
console.log(
map(constrain(mouseX, 0, width), 0, width, 64, 192)
);
}function setup() {
createCanvas(400, 400);
for (i = -5; i < 15; i++) {
console.log(i, constrain(i, 0, 10));
}
}
function draw() {
background(220);
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
for (let i = 0; i < 10; i++) {
for (let j = 0; j < 10; j++) {
if (j % 2 == 0) {
if (i % 2 == 0) {
fill(0);
}
else {
fill(255);
}
}
else {
if (i % 2 == 0) {
fill(255);
}
else {
fill(0);
}
}
rect(i * 40, j * 40, 35, 35);
console.log(i, j);
}
}
noLoop();
}let paused = false;
let ourFrameCount = 0;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
ellipse(200, 200,
map(sin(ourFrameCount*0.05), -1, 1, 0, 400));
ellipse(mouseX, mouseY, 100);
if (!paused) {
ourFrameCount++;
}
}
function mousePressed() {
paused = !paused;
}let mouseWasPressedOnLastFrame = false;
function setup() {
createCanvas(400, 400);
}
function draw() {
if (mouseIsPressed && !mouseWasPressedOnLastFrame) {
console.log("click!");
background(220, 0, 0);
}
else {
background(110, 110, 220);
}
console.log(mouseIsPressed, mouseWasPressedOnLastFrame);
mouseWasPressedOnLastFrame = mouseIsPressed;
}
function mousePressed() {
console.log("click (in mousePressed)");
}
function mouseReleased() {
console.log("up!");
}let grid = 40;
function setup() {
createCanvas(400, 400);
ellipseMode(CORNER);
}
function draw() {
background(220);
for (let i = 0; i < grid; i++) {
for (let j = 0; j < grid; j++) {
fill(random(255));
ellipse(i * (width/grid),
j * (height/grid),
10, 10);
}
}
}let joe = 0;
function setup() {
createCanvas(400, 400);
frameRate(3);
}
function draw() {
background(220);
joe++;
console.log(joe);
joe = mouseX;
if (joe > 71) {
fill(0, 255, 0);
console.log("respected elder");
}
else if (joe > 31) {
fill(0, 255, 100);
console.log("prime adulthood");
}
else if (joe > 21) {
fill(0, 255, 150);
console.log("young adult");
}
else if (joe > 12) {
fill(0, 255, 200);
console.log("teen");
}
else {
fill(0, 255, 255);
console.log("whippersnapper");
}
rect(20, 20, width-40, width-40);
}let harold = 0;
let haroldDirection;
let martha = 0;
let marthaDirection;
function setup() {
createCanvas(400, 400);
haroldDirection = 3;
marthaDirection = 2;
}
function draw() {
background(220);
harold += haroldDirection;
martha += marthaDirection;
fill(255, 128);
ellipse(200, 200, harold, martha);
ellipse(harold, martha, 40, 40);
ellipse(harold, 200, martha, martha);
console.log(harold, martha);  
if (harold >= width || harold <= 0) {
haroldDirection *= -1;
}
if (martha >= width || martha <= 0) {
marthaDirection *= -1;
}
function getRandomSubarray(arr, size) {
var shuffled = arr.slice(0), i = arr.length, temp, index;
while (i--) {
index = Math.floor((i + 1) * Math.random());
temp = shuffled[index];
shuffled[index] = shuffled[i];
shuffled[i] = temp;
}
return shuffled.slice(0, size);
}
let students = `Chunhan Chen
Xinyue Li
Shivani Prasad
Jingyi Wen
Chenshan(Doris) Gao
Anna Oh
Gabriella Garcia (pw ITP2020)
Defne Onen
Becca Moore 
Idit Barak
Karina Hyland
Aileen Stanziola
August Luhrs
Raaziq M Brown`;
function setup() {
createCanvas(400, 400);
let studentList = students.split("\n");
console.log(getRandomSubarray(studentList, 4));
}
function draw() {
background(220);
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
for (let i = 0; i < 10; i++) {
ellipse(i * 50, 200, 50, 50);
}
}let i = 0;
function setup() {
createCanvas(400, 400);
background(220);
}
function draw() {
ellipse(i * 50, 200, 50, 50);
i++;
}function setup() {
createCanvas(400, 800);
}
function draw() {
background(220);
for (let i = 0; i < 400; i++) {
for (let j = 0; j < 400; j++) {
stroke(int(random(255)));
point(i, j);
}
}
for (let i = 0; i < 400; i++) {
for (let j = 0; j < 400; j++) {
stroke(int(Math.random()*255));
point(i, j+400);
}
}  
stroke(255);
line(0, 400, 400, 400);
noLoop();
}function setup() {
createCanvas(400, 400);
for (let i = 0; i < 100; i++) {
randomSeed(i);
console.log(i, random(100), random(100));
}
}
function draw() {
background(220);
}let initRandom;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
noStroke();
fill(255, 240);
for (let i = 0; i < 10; i++) {
for (let j = 0; j < 10; j++) {
let elX = (i * (width / 10)) + 20;
let elY = (j * (height / 10)) + 20;
let noiseValX = map(noise(i, j), 0, 1, -10, 10);
let noiseValY = map(noise(i, j, 9999), 0, 1, -10, 10);
let deltaX = map(
sin(noiseValX+(frameCount*0.1)), -1, 1, -10, 10);
let deltaY = map(
cos(noiseValY+(frameCount*0.1)), -1, 1, -10, 10);
ellipse(elX + deltaX,
elY + deltaY,
40, 40);
}
}
noLoop();
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
for (let i = 0; i < 10; i++) {
for (let j = 0; j < 10; j++) {
let elX = (i * (width / 10)) + 20;
let elY = (j * (height / 10)) + 20;
if (dist(mouseX, mouseY, elX, elY) < 20) {
fill(0);
}
else {
fill(255);
}
ellipse(elX, elY, 40, 40);
}
}
}function setup() {
noCanvas();
console.log("Task 1: Variables and arithmetic expressions, part 1");
let x = 3 + 5 / 2; 
console.log("Expected output: 4");
console.log("->", x);
console.log("---");
console.log("Task 2: Variables and arithmetic expressions, part 2");
let y = 7;
let z = 8;
z += a;
z *= y;
console.log("Expected output: 70");
console.log("->", z);
console.log("---");
console.log("Task 3: The map() function");
let analogVal = 0.4;
let mappedVal = map(analogVal, -1, 1, 0, 255);
console.log("Expected output: 102");
console.log("->", mappedVal);
console.log("---");
console.log("Task 4: The random() function");
let randomVal = random(100, 200);
let randomCheckResult = randomVal < 100;
console.log("Expected output: true");
console.log("->", randomCheckResult);
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(frameCount % 255);
fill(map(sin(frameCount * 0.1), -1, 1, 0, 255));
ellipse(width / 2, 200, 150, 150);
console.log(mouseX, mouseY);
}let elWidth = 110;
let elHeight = 160;
let bgcolorR;
let bgcolorG;
let bgcolorB;
function setup() {
createCanvas(400, 400);
bgcolorR = random(255);
bgcolorG = random(128);
bgcolorB = random(128);
}
function draw() {
background(bgcolorR, bgcolorG, bgcolorB);
ellipse(100, 100, elWidth, elHeight);
ellipse(300, 100, elWidth, elHeight);
ellipse(100, 300, elWidth, elHeight);
ellipse(300, 300, elWidth, elHeight);
elWidth = elWidth + 5;
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(mouseX, mouseY, frameCount);
ellipse(mouseY, mouseX, 150, 150);
ellipse(mouseX, mouseY, 150, 150);
}function setup() {
createCanvas(400, 400);
frameRate(30);
}
function draw() {
background(255 - frameCount, 255, frameCount * 2);
ellipse(frameCount * 0.5, frameCount, 150, 150);
console.log(frameCount);
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
stroke(0);
arc(200, 200, 100, 150, PI, PI + HALF_PI, OPEN);
}function setup() {
createCanvas(windowHeight, windowHeight);
}
function draw() {
background(220);
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(
map(sin(frameCount*0.1), -1, 1, 0, 255)
);
}function setup() {
createCanvas(windowWidth, windowHeight);
}
function draw() {
background(220, 0, 0);
fill(255, 0, 255);
stroke(Math.random()*255);
ellipse(50, 50, 60, 60);
fill(0, Math.random()*255, 255);
ellipse(100, 150, 45, 200);
stroke(255, 255, 0);
ellipse(400, 400, 50, 50);
}let outputP;
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
"origin": "#interjection.capitalize#, #name#! I'm #profession.a#, not #profession.a#!",
"interjection": ["alas", "congratulations", "eureka", "fiddlesticks",
"good grief", "hallelujah", "oops", "rats", "thanks", "whoa", "yes"],
"name": ["Jim", "John", "Tom", "Steve", "Kevin", "Gary", "George", "Larry"],
"profession": [
"accountant",
"actor",
"archeologist",
"astronomer",
"audiologist",
"bartender",
"butcher",
"carpenter",
"composer",
"crossing guard",
"curator",
"detective",
"economist",
"editor",
"engineer",
"epidemiologist",
"farmer",
"flight attendant",
"forest fire prevention specialist",
"graphic designer",
"hydrologist",
"librarian",
"lifeguard",
"locksmith",
"mathematician",
"middle school teacher",
"nutritionist",
"painter",
"physical therapist",
"priest",
"proofreader",
"rancher",
"referee",
"reporter",
"sailor",
"sculptor",
"singer",
"sociologist",
"stonemason",
"surgeon",
"tailor",
"taxi driver",
"teacher assistant",
"teacher",
"teller",
"therapist",
"tour guide",
"translator",
"travel agent",
"umpire",
"undertaker",
"urban planner",
"veterinarian",
"web developer",
"weigher",
"welder",
"woodworker",
"writer",
"zoologist"
]
ml5 Example
PoseNet example using p5.js
let w = 640;
let h = 480;
let video;
let poseNet;
let poses = [];
let skeletons = [];
let leftWrist;
let rightWrist;
function setup() {
createCanvas(w, h);
video = createCapture(VIDEO);
poseNet = ml5.poseNet(video, 'single', gotPoses);
video.hide();
fill(255, 0, 0);
stroke(255, 0, 0);
leftWrist = createVector(-1, -1);
rightWrist = createVector(-1, -1);
}
function draw() {
image(video, 0, 0, w, h);
drawKeypoints();
}
function drawKeypoints() {
textAlign(CENTER, CENTER);
for(let i = 0; i < poses.length; i++) {
for(let j = 0; j < poses[i].pose.keypoints.length; j++) {
let keypoint = poses[i].pose.keypoints[j];
if (keypoint.score > 0.3) {
if (keypoint.part == 'leftWrist') {
leftWrist.lerp(keypoint.position.x, keypoint.position.y, 0, 0.5);
}
else if (keypoint.part == 'rightWrist') {
rightWrist.lerp(keypoint.position.x, keypoint.position.y, 0, 0.5);
}
else if (keypoint.part == 'leftEye' || keypoint.part == 'rightEye') {
textSize(64);
text("👁", keypoint.position.x, keypoint.position.y);
}
}
}
}
let midpoint = p5.Vector.add(leftWrist, rightWrist).div(2);
let distance = leftWrist.dist(rightWrist);
fill(255, 128);
noStroke();  
ellipse(midpoint.x, midpoint.y, distance);
fill(0);
text("🖐", leftWrist.x, leftWrist.y);
text("🖐", rightWrist.x, rightWrist.y);
}
function drawSkeleton() {
for(let i = 0; i < poses.length; i++) {
for(let j = 0; j < poses[i].skeleton.length; j++) {
let partA = poses[i].skeleton[j][0];
let partB = poses[i].skeleton[j][1];
line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
}
}
}
function gotPoses(results) {
poses = results;
}
console.log(poses);
function setup() {
createCanvas(displayWidth, displayHeight);
frameRate(60);
}
let currentIdx = 0;
function draw() {
noStroke();
fill(255, 64);
rect(0, 0, width, height);
let cx = 0;
let cy = 0;
translate(100, height/2);
stroke(0);
scale(20);
strokeWeight(0.25);
let currentData = data[currentIdx];
for (let item of currentData) {
if (item[2] == 0) {
line(cx, cy, cx+item[0], cy+item[1]);
}
cx += item[0];
cy += item[1];
}
if (frameCount % 5 == 0) {
currentIdx++;
}
if (currentIdx >= data.length) {
currentIdx = 0;
}
}let data = [[[0.705363392829895, 0.18059197068214417, 1.0], [0.0015919635770842433, 3.355276584625244, 0.0], [0.020167499780654907, -1.7128498554229736, 1.0], [0.5104301571846008, -0.5251740217208862, 0.0], [0.3462475538253784, -0.20822566747665405, 0.0], [0.5187098979949951, 0.00044731536763720214, 0.0], [0.32810738682746887, 0.18277563154697418, 0.0], [0.17069822549819946, 0.5116380453109741, 0.0], [0.0028673186898231506, 1.7592519521713257, 0.0], [0.18261858820915222, -3.7840120792388916, 1.0], [2.3690006732940674, 1.4573500156402588, 1.0], [-0.00031212077010422945, 2.483686685562134, 0.0], [0.005266924854367971, -1.9101454019546509, 1.0], [-0.3115865886211395, -0.3551868498325348, 0.0], [-0.31898415088653564, -0.17669051885604858, 0.0], [-0.4997907876968384, 0.005863672122359276, 0.0], [-0.34147384762763977, 0.18196816742420197, 0.0], [-0.33900025486946106, 0.3518032729625702, 0.0], [-0.17762860655784607, 0.530083417892456, 0.0], [0.008675009943544865, 0.3449142575263977, 0.0], [0.1892499178647995, 0.5188276767730713, 0.0], [0.323957622051239, 0.3513495922088623, 0.0], [0.3263024389743805, 0.17549361288547516, 0.0], [0.3166055381298065, -0.010828671976923943, 0.0], [0.3150751292705536, -0.17731636762619019, 0.0], [0.3187534213066101, -0.3230784237384796, 0.0], [0.16285930573940277, -3.2658236026763916, 1.0], [0.5821055173873901, 1.4125797748565674, 1.0], [0.0016322728479281068, 2.388862133026123, 0.0], [0.017292570322752, -1.5415409803390503, 1.0], [0.48287704586982727, -0.4730752408504486, 0.0], [0.33509698510169983, -0.23905852437019348, 0.0], [0.484504371881485, -0.0043256450444459915, 0.0], [0.31636112928390503, 0.16009671986103058, 0.0], [0.1422053724527359, -1.4002535343170166, 0.0], [1.7649484872817993, 1.1361857652664185, 1.0], [0.006408125627785921, 2.492180585861206, 0.0], [0.05396438017487526, -2.328427314758301, 1.0], [-0.2951045334339142, -0.35666143894195557, 0.0], [-0.28953850269317627, -0.17673243582248688, 0.0], [-0.4497171938419342, -0.01781703159213066, 0.0], [-0.3527219891548157, 0.1404886394739151, 0.0], [-0.31914860010147095, 0.31653133034706116, 0.0], [-0.18490201234817505, 0.4974313974380493, 0.0], [0.002333450596779585, 0.34262537956237793, 0.0], [0.16988366842269897, 0.4894397258758545, 0.0], [0.30785349011421204, 0.3285273611545563, 0.0], [0.3089849054813385, 0.16504208743572235, 0.0], [0.3032197952270508, -0.011616446077823639, 0.0], [0.29935863614082336, -0.17730608582496643, 0.0], [0.3046184480190277, -0.31614986062049866, 0.0], [0.1612311154603958, -3.2017204761505127, 1.0], [0.5601399540901184, 1.3864033222198486, 1.0], [0.0018664556555449963, 2.399764060974121, 0.0], [0.016243046149611473, -1.4982179403305054, 1.0], [0.4725404381752014, -0.45772120356559753, 0.0], [0.325641393661499, -0.23362809419631958, 0.0], [0.32738494873046875, -0.1288030594587326, 0.0], [0.511498749256134, -0.003930799197405577, 0.0], [0.17598630487918854, -1.3744844198226929, 1.0], [2.007246971130371, 1.4777851104736328, 1.0], [-0.0018779993988573551, 2.271380662918091, 0.0], [0.021010953933000565, -1.9910691976547241, 1.0], [-0.2935144007205963, -0.34723275899887085, 0.0], [-0.29580122232437134, -0.17168065905570984, 0.0], [-0.46906086802482605, 0.0027761589735746384, 0.0], [-0.330201655626297, 0.1661979854106903, 0.0], [-0.3278607726097107, 0.3363363742828369, 0.0], [-0.1802750676870346, 0.5061061382293701, 0.0], [0.00309497001580894, 0.3344082236289978, 0.0], [0.17974671721458435, 0.49833929538726807, 0.0], [0.31563761830329895, 0.3328110873699188, 0.0], [0.3131473958492279, 0.16224324703216553, 0.0], [0.3053191304206848, -0.017160912975668907, 0.0], [0.3042415380477905, -0.1798059642314911, 0.0], [0.3060353398323059, -0.32296788692474365, 0.0], [0.1591709852218628, -3.2039082050323486, 1.0], [0.5565198063850403, 1.3870611190795898, 1.0], [0.0017919378587976098, 2.4088966846466064, 0.0], [0.01526676770299673, -1.5279865264892578, 1.0], [0.4757324159145355, -0.4741401970386505, 0.0], [0.3243793249130249, -0.23655156791210175, 0.0], [0.46705350279808044, -0.0035196812823414803, 0.0], [0.31545162200927734, 0.1550479531288147, 0.0], [0.14252692461013794, -1.3854843378067017, 0.0], [1.8247146606445312, 1.1324115991592407, 1.0], [0.00700112571939826, 2.4514694213867188, 0.0], [0.04942450299859047, -2.2655959129333496, 1.0], [-0.3031238317489624, -0.35192301869392395, 0.0], [-0.2966020703315735, -0.17411848902702332, 0.0], [-0.44928812980651855, -0.01696980558335781, 0.0], [-0.35090628266334534, 0.14104779064655304, 0.0], [-0.3158828020095825, 0.31778910756111145, 0.0], [-0.18379735946655273, 0.49360963702201843, 0.0], [0.0003637691552285105, 0.33531272411346436, 0.0], [0.16922341287136078, 0.4903182089328766, 0.0], [0.3126298785209656, 0.3288668692111969, 0.0], [0.31273823976516724, 0.1643504947423935, 0.0], [0.30544719099998474, -0.015517220832407475, 0.0], [0.30742257833480835, -0.18122223019599915, 0.0], [0.30692076683044434, -0.3162131607532501, 0.0], [0.16219079494476318, -3.1774916648864746, 1.0], [0.5555202960968018, 1.3805574178695679, 1.0], [0.0011957850074395537, 2.4269394874572754, 0.0], [0.012619197368621826, -1.5354433059692383, 1.0], [0.4669455289840698, -0.4700693190097809, 0.0], [0.32124313712120056, -0.2396206110715866, 0.0], [0.4597392678260803, -0.0034964766819030046, 0.0], [0.3135530948638916, 0.15615586936473846, 0.0], [0.140933558344841, -1.391901969909668, 0.0], [0.5182226896286011, 1.1453251838684082, 1.0], [0.0067038447596132755, 2.32853627204895, 0.0], [0.010686865076422691, -1.5673701763153076, 1.0], [0.4975924789905548, -0.468337744474411, 0.0], [0.3337160646915436, -0.196797177195549, 0.0], [0.49443984031677246, -0.00527338869869709, 0.0], [0.3219859004020691, 0.17174968123435974, 0.0], [0.1685243844985962, 0.5056213140487671, 0.0], [0.0007668481557630002, 1.7416975498199463, 0.0], [0.17885476350784302, -3.7385101318359375, 1.0], [2.3676791191101074, 1.516832947731018, 1.0], [-0.000363356462912634, 2.4174091815948486, 0.0], [-0.0010446709347888827, -1.881026268005371, 1.0], [-0.31010663509368896, -0.35414254665374756, 0.0], [-0.3177909255027771, -0.17396818101406097, 0.0], [-0.5001294016838074, 0.0058526210486888885, 0.0], [-0.3316083252429962, 0.18725480139255524, 0.0], [-0.33648285269737244, 0.3574114441871643, 0.0], [-0.1789058893918991, 0.5308997631072998, 0.0], [0.008643481880426407, 0.35138702392578125, 0.0], [0.18811875581741333, 0.5136790871620178, 0.0], [0.32317543029785156, 0.34659090638160706, 0.0], [0.32600095868110657, 0.1720445305109024, 0.0], [0.5015899538993835, -0.0046052210964262486, 0.0], [0.318058043718338, -0.1844690889120102, 0.0], [0.321735143661499, -0.3547835946083069, 0.0], [0.17194682359695435, -3.267503261566162, 1.0], [0.6130180358886719, 1.4205610752105713, 1.0], [0.00029518408700823784, 2.3921735286712646, 0.0], [0.01648126170039177, -1.5315386056900024, 1.0], [0.48818325996398926, -0.46796250343322754, 0.0], [0.3300224244594574, -0.22368690371513367, 0.0], [0.48185449838638306, -0.003682306269183755, 0.0], [0.31321480870246887, 0.15895439684391022, 0.0], [0.14396065473556519, -1.4076322317123413, 0.0], [0.5156254172325134, 1.1543200016021729, 1.0], [0.006574720609933138, 2.3584978580474854, 0.0], [0.010777740739285946, -1.6017812490463257, 1.0], [0.510920524597168, -0.48421427607536316, 0.0], [0.33829501271247864, -0.1970731019973755, 0.0], [0.49582013487815857, -0.004717451520264149, 0.0], [0.3231208622455597, 0.17869170010089874, 0.0], [0.16500011086463928, 0.5152845978736877, 0.0], [0.0012636578176170588, 1.7506132125854492, 0.0], [0.17471013963222504, -3.772914171218872, 1.0], [2.3508152961730957, 1.5155915021896362, 1.0], [0.00013101186777930707, 2.45491361618042, 0.0], [0.0008213461260311306, -1.9229586124420166, 1.0], [-0.3110654056072235, -0.35670626163482666, 0.0], [-0.320963054895401, -0.1779271960258484, 0.0], [-0.5033283829689026, 0.007748311385512352, 0.0], [-0.3393157124519348, 0.1858493685722351, 0.0], [-0.3333887457847595, 0.35603076219558716, 0.0], [-0.17588414251804352, 0.5354321002960205, 0.0], [0.007033148314803839, 0.3491770625114441, 0.0], [0.18274401128292084, 0.5192736387252808, 0.0], [0.3280720114707947, 0.34692880511283875, 0.0], [0.3220735192298889, 0.1730375587940216, 0.0], [0.31389689445495605, -0.012037458829581738, 0.0], [0.31180495023727417, -0.17461538314819336, 0.0], [0.3196636140346527, -0.32274875044822693, 0.0], [0.1624784767627716, -3.2997512817382812, 1.0], [0.5842920541763306, 1.4289634227752686, 1.0], [0.0016219161916524172, 2.392275333404541, 0.0], [0.01626642607152462, -1.5616276264190674, 1.0], [0.46910277009010315, -0.47433313727378845, 0.0], [0.32684579491615295, -0.22548332810401917, 0.0], [0.47389212250709534, -0.0034201007802039385, 0.0], [0.316046804189682, 0.16381515562534332, 0.0], [0.14355160295963287, -1.4194846153259277, 0.0], [1.754221796989441, 1.1259315013885498, 1.0], [0.006977188866585493, 2.548611640930176, 0.0], [0.05720525607466698, -2.3974533081054688, 1.0], [-0.29876187443733215, -0.3569660484790802, 0.0], [-0.2910923659801483, -0.17412899434566498, 0.0], [-0.4510467052459717, -0.012972147203981876, 0.0], [-0.350199431180954, 0.14378347992897034, 0.0], [-0.30959734320640564, 0.321554958820343, 0.0], [-0.18194998800754547, 0.50201815366745, 0.0], [0.007666439283639193, 0.34538865089416504, 0.0], [0.1745910346508026, 0.4898391366004944, 0.0], [0.3055323660373688, 0.3267405331134796, 0.0], [0.3077186644077301, 0.16357450187206268, 0.0], [0.3015456795692444, -0.01730526052415371, 0.0], [0.3006885349750519, -0.18359975516796112, 0.0], [0.3016934394836426, -0.3195890784263611, 0.0], [0.15868239104747772, -3.2209041118621826, 1.0], [0.5695822238922119, 1.4073009490966797, 1.0], [0.0006490626838058233, 2.3833792209625244, 0.0], [0.01882091350853443, -1.5284408330917358, 1.0], [0.4722510278224945, -0.4651857316493988, 0.0], [0.32691553235054016, -0.23097781836986542, 0.0], [0.4753631055355072, -0.005288299638777971, 0.0], [0.3071152865886688, 0.15856888890266418, 0.0], [0.14138928055763245, -1.411124348640442, 0.0], [0.5019208192825317, 1.1519476175308228, 1.0], [0.0059827882796525955, 2.3081541061401367, 0.0], [0.015986887738108635, -1.5974851846694946, 1.0], [0.5053731203079224, -0.4814125895500183, 0.0], [0.33281251788139343, -0.18843185901641846, 0.0], [0.4944778382778168, -0.005115080159157515, 0.0], [0.3232552409172058, 0.1715916097164154, 0.0], [0.16950738430023193, 0.5110056400299072, 0.0], [0.0020783436484634876, 1.7541157007217407, 0.0], [0.1751033216714859, -3.7503786087036133, 1.0], [2.3425705432891846, 1.5251818895339966, 1.0], [-0.0005976224783807993, 2.447535753250122, 0.0], [0.002115036128088832, -1.9222323894500732, 1.0], [-0.31022316217422485, -0.3563005030155182, 0.0], [-0.3178478479385376, -0.17857098579406738, 0.0], [-0.5005720257759094, 0.005814393982291222, 0.0], [-0.3372272551059723, 0.1826683133840561, 0.0], [-0.3327018916606903, 0.3613782525062561, 0.0], [-0.1755056083202362, 0.5319843292236328, 0.0], [0.008429063484072685, 0.34783703088760376, 0.0], [0.18617533147335052, 0.5213549733161926, 0.0], [0.3264562785625458, 0.3519258201122284, 0.0], [0.32717442512512207, 0.17219914495944977, 0.0], [0.31959378719329834, -0.01177537627518177, 0.0], [0.3101588189601898, -0.17915955185890198, 0.0], [0.317073792219162, -0.32489076256752014, 0.0], [0.1640956699848175, -3.2828216552734375, 1.0], [0.5796624422073364, 1.4253369569778442, 1.0], [0.002218145178630948, 2.3827686309814453, 0.0]], [[0.7146004438400269, 0.18221209943294525, 1.0], [0.0008458299562335014, 3.3962900638580322, 0.0], [0.019457606598734856, -1.7183400392532349, 1.0], [0.5147470235824585, -0.5265082120895386, 0.0], [0.35219699144363403, -0.211812824010849, 0.0], [0.5201431512832642, 0.0023311926051974297, 0.0], [0.33435484766960144, 0.1845545917749405, 0.0], [0.17572693526744843, 0.512103259563446, 0.0], [0.0018903559539467096, 1.7514835596084595, 0.0], [0.18258170783519745, -3.77406907081604, 1.0], [2.2799885272979736, 1.4014663696289062, 1.0], [-0.0005366680561564863, 2.4550890922546387, 0.0], [0.003999583888798952, -1.889195442199707, 1.0], [-0.30498695373535156, -0.3506232500076294, 0.0], [-0.3119145929813385, -0.17452876269817352, 0.0], [-0.49031317234039307, 0.007438909262418747, 0.0], [-0.33350950479507446, 0.17852559685707092, 0.0], [-0.33469924330711365, 0.3531835973262787, 0.0], [-0.18475165963172913, 0.5205642580986023, 0.0], [0.006274850107729435, 0.3487231433391571, 0.0], [0.18303273618221283, 0.5071765780448914, 0.0], [0.31977564096450806, 0.3416367471218109, 0.0], [0.320305734872818, 0.17169682681560516, 0.0], [0.3164162337779999, -0.009787571616470814, 0.0], [0.3120383024215698, -0.17642085254192352, 0.0], [0.3134782314300537, -0.3254542946815491, 0.0], [0.16375832259655, -3.2668049335479736, 1.0], [0.5736203789710999, 1.4058228731155396, 1.0], [0.002495288383215666, 2.428123950958252, 0.0], [0.014362526126205921, -1.5312669277191162, 1.0], [0.4771580696105957, -0.4685091972351074, 0.0], [0.3293733298778534, -0.23185007274150848, 0.0], [0.4709075093269348, -0.004340270534157753, 0.0], [0.3175748288631439, 0.1548829972743988, 0.0], [0.14451807737350464, -1.4035426378250122, 0.0], [1.8079279661178589, 1.0738016366958618, 1.0], [0.006340981461107731, 2.5509958267211914, 0.0], [0.05281770974397659, -2.3129591941833496, 1.0], [-0.2976616621017456, -0.35540083050727844, 0.0], [-0.2922079861164093, -0.17475293576717377, 0.0], [-0.47917410731315613, -0.013250313699245453, 0.0], [-0.3500461280345917, 0.14917457103729248, 0.0], [-0.3141474723815918, 0.3233841061592102, 0.0], [-0.18283912539482117, 0.4991858899593353, 0.0], [0.0033812392503023148, 0.34235090017318726, 0.0], [0.17203925549983978, 0.4891318678855896, 0.0], [0.3050735592842102, 0.3276144564151764, 0.0], [0.3096407651901245, 0.16512824594974518, 0.0], [0.30950728058815, -0.015799222514033318, 0.0], [0.3023459315299988, -0.1762360781431198, 0.0], [0.30261969566345215, -0.3166023790836334, 0.0], [0.15926049649715424, -3.198319435119629, 1.0], [0.5703306198120117, 1.395958423614502, 1.0], [0.0016531344735994935, 2.4482245445251465, 0.0], [0.013255232013761997, -1.5867851972579956, 1.0], [0.47619518637657166, -0.48714086413383484, 0.0], [0.3222488760948181, -0.2403872311115265, 0.0], [0.3195163309574127, -0.13175339996814728, 0.0], [0.5122758150100708, -0.004603726323693991, 0.0], [0.17738230526447296, -1.3614109754562378, 1.0], [2.103031873703003, 1.4798344373703003, 1.0], [-0.0027416718658059835, 2.3083574771881104, 0.0], [0.015330576337873936, -1.9674699306488037, 1.0], [-0.2965860962867737, -0.34823548793792725, 0.0], [-0.2983039319515228, -0.1747816950082779, 0.0], [-0.48116612434387207, 0.001861009863205254, 0.0], [-0.3353312909603119, 0.16813398897647858, 0.0], [-0.333570659160614, 0.3418702483177185, 0.0], [-0.18449366092681885, 0.5112029314041138, 0.0], [0.002158168936148286, 0.3366284966468811, 0.0], [0.17791372537612915, 0.5028166174888611, 0.0], [0.31305697560310364, 0.33929044008255005, 0.0], [0.3185834288597107, 0.16952788829803467, 0.0], [0.3139798939228058, -0.00901784934103489, 0.0], [0.30970096588134766, -0.1726558357477188, 0.0], [0.3110899329185486, -0.317717581987381, 0.0], [0.1627734899520874, -3.230320453643799, 1.0], [0.5730096697807312, 1.4000922441482544, 1.0], [0.001658707158640027, 2.3834023475646973, 0.0], [0.014558963477611542, -1.538286566734314, 1.0], [0.4662916958332062, -0.46864789724349976, 0.0], [0.32217708230018616, -0.23580928146839142, 0.0], [0.4643009603023529, -0.004193691071122885, 0.0], [0.3064136803150177, 0.16055288910865784, 0.0], [0.14163663983345032, -1.395308256149292, 0.0], [1.7922816276550293, 1.1230738162994385, 1.0], [0.006822772324085236, 2.5033833980560303, 0.0], [0.05326982960104942, -2.3217639923095703, 1.0], [-0.2977224588394165, -0.35654371976852417, 0.0], [-0.29178586602211, -0.174890398979187, 0.0], [-0.44837144017219543, -0.014970139600336552, 0.0], [-0.34961509704589844, 0.14476697146892548, 0.0], [-0.31657660007476807, 0.3233857750892639, 0.0], [-0.1804221123456955, 0.49905216693878174, 0.0], [0.006747100036591291, 0.343210369348526, 0.0], [0.17652800679206848, 0.48790183663368225, 0.0], [0.3055705428123474, 0.32725831866264343, 0.0], [0.31265175342559814, 0.16230660676956177, 0.0], [0.29725202918052673, -0.018267326056957245, 0.0], [0.3021703064441681, -0.17918720841407776, 0.0], [0.3004661500453949, -0.3176843822002411, 0.0], [0.16030634939670563, -3.2136309146881104, 1.0], [0.5559258460998535, 1.3991001844406128, 1.0], [0.0013153764884918928, 2.370143175125122, 0.0], [0.01709780842065811, -1.5133905410766602, 1.0], [0.46494007110595703, -0.4635131061077118, 0.0], [0.3194490671157837, -0.23599711060523987, 0.0], [0.4680541157722473, -0.004789022263139486, 0.0], [0.3088667094707489, 0.1568533331155777, 0.0], [0.14294977486133575, -1.3896703720092773, 0.0], [1.694535493850708, 1.124517798423767, 1.0], [0.00644371472299099, 2.4448773860931396, 0.0], [0.05838049575686455, -2.3362481594085693, 1.0], [-0.2865212857723236, -0.35245704650878906, 0.0], [-0.28219544887542725, -0.17727287113666534, 0.0], [-0.44180870056152344, -0.018042707815766335, 0.0], [-0.34323883056640625, 0.13635659217834473, 0.0], [-0.31546086072921753, 0.3135955035686493, 0.0], [-0.18402595818042755, 0.4890974760055542, 0.0], [0.0033909413032233715, 0.3362562358379364, 0.0], [0.170577272772789, 0.4848296642303467, 0.0], [0.29688408970832825, 0.32751286029815674, 0.0], [0.306600958108902, 0.16311785578727722, 0.0], [0.2984839379787445, -0.015503478236496449, 0.0], [0.29562944173812866, -0.1781499981880188, 0.0], [0.30748480558395386, -0.3155044913291931, 0.0], [0.15824922919273376, -3.169947862625122, 1.0], [0.5583012700080872, 1.3801147937774658, 1.0], [0.0005742096691392362, 2.371386766433716, 0.0], [0.015138515271246433, -1.539337396621704, 1.0], [0.46176594495773315, -0.4741118848323822, 0.0], [0.3212866485118866, -0.22593027353286743, 0.0], [0.4626684784889221, -0.005506123881787062, 0.0], [0.3106142580509186, 0.15883509814739227, 0.0], [0.1387753188610077, -1.3693937063217163, 0.0], [1.7101936340332031, 1.1047183275222778, 1.0], [0.0069350493140518665, 2.4823718070983887, 0.0], [0.05576808378100395, -2.3282506465911865, 1.0], [-0.29550525546073914, -0.35632574558258057, 0.0], [-0.2882443368434906, -0.172690749168396, 0.0], [-0.4392532408237457, -0.016172630712389946, 0.0], [-0.3514839708805084, 0.14072619378566742, 0.0], [-0.31214776635169983, 0.31644007563591003, 0.0], [-0.18486548960208893, 0.4945787191390991, 0.0], [0.006396588869392872, 0.336458683013916, 0.0], [0.1740274727344513, 0.48594993352890015, 0.0], [0.30176177620887756, 0.3256823420524597, 0.0], [0.30647119879722595, 0.16286985576152802, 0.0], [0.299093097448349, -0.016236765310168266, 0.0], [0.29512494802474976, -0.18206369876861572, 0.0], [0.30748870968818665, -0.3204558491706848, 0.0], [0.1553793102502823, -3.1571476459503174, 1.0], [0.5522096753120422, 1.3796727657318115, 1.0], [0.0015689663123339415, 2.464339017868042, 0.0], [0.012647191993892193, -1.5986719131469727, 1.0], [0.4789216220378876, -0.4915144443511963, 0.0], [0.3261305093765259, -0.23678161203861237, 0.0], [0.47293171286582947, -0.0064002531580626965, 0.0], [0.31039831042289734, 0.15799912810325623, 0.0], [0.13937683403491974, -1.3926903009414673, 0.0], [1.7552800178527832, 1.11777925491333, 1.0], [0.006970447488129139, 2.5110812187194824, 0.0], [0.05288349837064743, -2.3070662021636963, 1.0], [-0.29594776034355164, -0.3556614816188812, 0.0], [-0.2911630868911743, -0.1722528636455536, 0.0], [-0.44675979018211365, -0.017411991953849792, 0.0], [-0.3509044647216797, 0.14367133378982544, 0.0], [-0.310741126537323, 0.31943240761756897, 0.0], [-0.17946399748325348, 0.4937754273414612, 0.0], [0.011366020888090134, 0.33771631121635437, 0.0], [0.179713636636734, 0.48609498143196106, 0.0], [0.3059028387069702, 0.3244794011116028, 0.0], [0.310587614774704, 0.16212324798107147, 0.0], [0.30420413613319397, -0.02080726996064186, 0.0], [0.29316356778144836, -0.18229372799396515, 0.0], [0.30924466252326965, -0.31947991251945496, 0.0], [0.1573215276002884, -3.16870379447937, 1.0], [0.5506982803344727, 1.3849756717681885, 1.0], [0.0005325767560862005, 2.3936617374420166, 0.0], [0.014132972806692123, -1.5269768238067627, 1.0], [0.4701398015022278, -0.4658619463443756, 0.0], [0.3214668333530426, -0.23407357931137085, 0.0], [0.4669054448604584, -0.005859173834323883, 0.0], [0.3084088861942291, 0.15650495886802673, 0.0], [0.1382504552602768, -1.369725227355957, 0.0], [1.7333507537841797, 1.0692731142044067, 1.0], [0.006144330371171236, 2.4698262214660645, 0.0], [0.05574220418930054, -2.3010637760162354, 1.0], [-0.29587316513061523, -0.35126352310180664, 0.0], [-0.290512353181839, -0.17097236216068268, 0.0], [-0.4423580467700958, -0.015596299432218075, 0.0], [-0.3480563461780548, 0.13984839618206024, 0.0], [-0.3061191439628601, 0.3138962984085083, 0.0], [-0.1802183836698532, 0.4883822798728943, 0.0], [0.007463025860488415, 0.3381100296974182, 0.0], [0.17224720120429993, 0.4823324680328369, 0.0], [0.3061027228832245, 0.3188759386539459, 0.0], [0.30381566286087036, 0.16177496314048767, 0.0], [0.30321091413497925, -0.019935647025704384, 0.0], [0.29869070649147034, -0.18496264517307281, 0.0], [0.30368104577064514, -0.32032549381256104, 0.0], [0.15930990874767303, -3.1500375270843506, 1.0], [0.5495414733886719, 1.378251075744629, 1.0], [0.0005779497441835701, 2.360806703567505, 0.0], [0.016366707161068916, -1.5166683197021484, 1.0], [0.4601462483406067, -0.46381017565727234, 0.0], [0.3224773108959198, -0.23554381728172302, 0.0], [0.4634072184562683, -0.005971403326839209, 0.0], [0.30743157863616943, 0.15670284628868103, 0.0], [0.15946540236473083, 0.5013725757598877, 0.0], [-0.000229884113650769, 1.7226653099060059, 0.0], [0.1717112809419632, -3.6732099056243896, 1.0], [2.2629799842834473, 1.5014322996139526, 1.0], [0.0007002314669080079, 2.3874781131744385, 0.0], [0.0007253098883666098, -1.88642418384552, 1.0], [-0.30022525787353516, -0.3520711362361908, 0.0], [-0.3141254484653473, -0.17787779867649078, 0.0], [-0.4780520498752594, -0.004387232940644026, 0.0], [-0.3295202851295471, 0.17657849192619324, 0.0], [-0.3418372571468353, 0.34560948610305786, 0.0], [-0.18602807819843292, 0.5164579749107361, 0.0], [-0.0023563867434859276, 0.3384738564491272, 0.0], [0.17246560752391815, 0.5099236369132996, 0.0], [0.323904424905777, 0.3429611027240753, 0.0], [0.31955215334892273, 0.17513702809810638, 0.0], [0.3147983253002167, -0.009868563152849674, 0.0], [0.3080526888370514, -0.175003781914711, 0.0], [0.3119075298309326, -0.32024529576301575, 0.0], [0.16460002958774567, -3.2498393058776855, 1.0], [0.5865117907524109, 1.4030426740646362, 1.0], [0.0010408749803900719, 2.416020154953003, 0.0], [0.014407559297978878, -1.5646709203720093, 1.0], [0.47963425517082214, -0.48315295577049255, 0.0], [0.33114126324653625, -0.243607759475708, 0.0]], [[0.722646176815033, 0.18025058507919312, 1.0], [0.0037590882275253534, 3.4171946048736572, 0.0], [0.07370124012231827, -2.793494701385498, 1.0], [0.4058031141757965, -0.27136874198913574, 0.0], [0.37942031025886536, -0.1312309354543686, 0.0], [0.5248593091964722, 0.00512711564078927, 0.0], [0.3261992335319519, 0.12391385436058044, 0.0], [-0.10690101236104965, -0.2121136486530304, 0.0], [-0.0826837494969368, 0.49987396597862244, 0.0], [-0.0330267958343029, 0.8603835701942444, 0.0], [-0.11545431613922119, 0.6793664693832397, 0.0], [-0.10075647383928299, 0.44852641224861145, 0.0], [-0.4853409230709076, 0.27233970165252686, 0.0], [-0.29033157229423523, 0.01911826804280281, 0.0], [-0.3292142450809479, -0.18976432085037231, 0.0], [-0.2608209550380707, -0.3474622368812561, 0.0], [1.9276249408721924, -3.5359344482421875, 1.0], [1.998279333114624, 1.507773995399475, 1.0], [-0.003278697608038783, 2.4479315280914307, 0.0], [0.012730059213936329, -2.033456563949585, 1.0], [-0.2831205725669861, -0.36800330877304077, 0.0], [-0.2833009660243988, -0.178385928273201, 0.0], [-0.45189759135246277, 0.006050569470971823, 0.0], [-0.3087023198604584, 0.18165144324302673, 0.0], [-0.3137834668159485, 0.35448387265205383, 0.0], [-0.1798950880765915, 0.5261061191558838, 0.0], [0.009279537945985794, 0.3433130383491516, 0.0], [0.17802220582962036, 0.5139433741569519, 0.0], [0.3017217218875885, 0.34008628129959106, 0.0], [0.3045940399169922, 0.1596072018146515, 0.0], [0.29945269227027893, -0.03403141349554062, 0.0], [0.29591330885887146, -0.20588418841362, 0.0], [0.30091673135757446, -0.34830716252326965, 0.0], [0.15400873124599457, -3.2462728023529053, 1.0], [0.5958375930786133, 0.17082491517066956, 1.0], [-0.0014644496841356158, 3.5282785892486572, 0.0], [0.15199673175811768, 0.5944604873657227, 1.0], [0.405985027551651, 0.1291506588459015, 0.0], [0.29278379678726196, -0.07905527204275131, 0.0], [-1.2706915140151978, -2.499856472015381, 1.0], [1.090869665145874, -0.008559276349842548, 0.0], [0.32787710428237915, -1.4393465518951416, 1.0], [0.5753723382949829, 0.18919521570205688, 1.0], [0.18460822105407715, 0.24356333911418915, 0.0], [0.15189842879772186, -0.1725337654352188, 0.0], [-0.14038798213005066, -0.19285672903060913, 0.0], [-0.16659484803676605, 0.16776542365550995, 0.0], [0.1984446495771408, 1.2554806470870972, 1.0], [0.003932032268494368, 2.5341989994049072, 0.0], [0.3428494930267334, -3.8148603439331055, 1.0], [0.6666446924209595, 1.4340975284576416, 1.0], [-0.0021330451127141714, 2.3979523181915283, 0.0], [0.018809225410223007, -1.6562355756759644, 1.0], [0.5077624320983887, -0.5041079521179199, 0.0], [0.3459200859069824, -0.22362680733203888, 0.0], [0.5020440816879272, -0.0017534816870465875, 0.0], [0.32768410444259644, 0.17755280435085297, 0.0], [0.15945984423160553, 0.5216359496116638, 0.0], [5.318828334566206e-05, 1.8080661296844482, 0.0], [0.17706480622291565, -3.8581721782684326, 1.0], [2.2768197059631348, 1.558422565460205, 1.0], [-0.00020048415171913803, 2.4499642848968506, 0.0], [0.0010308134369552135, -1.9784897565841675, 1.0], [-0.3016127943992615, -0.3640873432159424, 0.0], [-0.31147363781929016, -0.18034255504608154, 0.0], [-0.4931120276451111, 0.006521143019199371, 0.0], [-0.3296280801296234, 0.18536406755447388, 0.0], [-0.33434292674064636, 0.3643576502799988, 0.0], [-0.1751878559589386, 0.5394782423973083, 0.0], [0.008822858333587646, 0.3518993556499481, 0.0], [0.18458063900470734, 0.5294572710990906, 0.0], [0.3169097602367401, 0.35645154118537903, 0.0], [0.3237365782260895, 0.1786726862192154, 0.0], [0.30920740962028503, -0.01433003880083561, 0.0], [0.303913950920105, -0.1834675371646881, 0.0], [0.31180769205093384, -0.3337179720401764, 0.0], [0.16224773228168488, -3.33670973777771, 1.0], [0.5878580808639526, 1.4437158107757568, 1.0], [0.0005525276646949351, 2.541311025619507, 0.0], [0.013052888214588165, -1.6186195611953735, 1.0], [0.4787617623806, -0.4934414029121399, 0.0], [0.32599928975105286, -0.24193979799747467, 0.0], [0.4783560335636139, -0.003901188261806965, 0.0], [0.3183802664279938, 0.16385889053344727, 0.0], [0.1446084827184677, -1.4506614208221436, 0.0], [1.7950738668441772, 1.1604424715042114, 1.0], [0.005815815180540085, 2.581998348236084, 0.0], [0.04949209839105606, -2.382366180419922, 1.0], [-0.2991022765636444, -0.36802083253860474, 0.0], [-0.2935248017311096, -0.18109126389026642, 0.0], [-0.4765588343143463, -0.012024874798953533, 0.0], [-0.3559236228466034, 0.15215648710727692, 0.0], [-0.32144448161125183, 0.3328417241573334, 0.0], [-0.18234018981456757, 0.5123924612998962, 0.0], [0.006834808737039566, 0.3518349230289459, 0.0], [0.17550291121006012, 0.5082287192344666, 0.0], [0.3103719651699066, 0.34206756949424744, 0.0], [0.31171345710754395, 0.16668784618377686, 0.0], [0.30077308416366577, -0.01831698790192604, 0.0], [0.3040757179260254, -0.18581102788448334, 0.0], [0.3048023581504822, -0.325822651386261, 0.0], [0.15801793336868286, -3.2830355167388916, 1.0], [0.5733621716499329, 1.431656837463379, 1.0], [0.0003960871254093945, 2.4611525535583496, 0.0], [0.01500394381582737, -1.5836882591247559, 1.0], [0.47669512033462524, -0.48615363240242004, 0.0], [0.33329302072525024, -0.24749258160591125, 0.0], [0.47058096528053284, -0.0035382844507694244, 0.0], [0.3134416341781616, 0.16055016219615936, 0.0], [0.14306598901748657, -1.4211221933364868, 0.0], [1.8138129711151123, 1.1622865200042725, 1.0], [0.006511779967695475, 2.516005516052246, 0.0], [0.047007836401462555, -2.298497438430786, 1.0], [-0.29949840903282166, -0.36236637830734253, 0.0], [-0.2970065474510193, -0.17764319479465485, 0.0], [-0.4794195294380188, -0.0074056717567145824, 0.0], [-0.35488468408584595, 0.15236316621303558, 0.0], [-0.3217734396457672, 0.3304543197154999, 0.0], [-0.18622124195098877, 0.5074357986450195, 0.0], [0.003063346492126584, 0.347120076417923, 0.0], [0.17502780258655548, 0.4979424774646759, 0.0], [0.3117193281650543, 0.33227747678756714, 0.0], [0.31148403882980347, 0.16694127023220062, 0.0], [0.30596596002578735, -0.015851791948080063, 0.0], [0.30233871936798096, -0.1794368028640747, 0.0], [0.30774161219596863, -0.31832554936408997, 0.0], [0.15931490063667297, -3.2605745792388916, 1.0], [0.579749345779419, 1.4165514707565308, 1.0], [0.0014378493651747704, 2.447324752807617, 0.0], [0.018305139616131783, -1.544966459274292, 1.0], [0.471243679523468, -0.47235554456710815, 0.0], [0.3255060911178589, -0.23860521614551544, 0.0], [0.4692949652671814, -0.0046829297207295895, 0.0], [0.3121093213558197, 0.1572996824979782, 0.0], [0.1406952291727066, -1.4252023696899414, 0.0], [1.8098690509796143, 1.1321203708648682, 1.0], [0.006885848008096218, 2.526346445083618, 0.0], [0.048932403326034546, -2.302598714828491, 1.0], [-0.29520395398139954, -0.361558198928833, 0.0], [-0.2921334505081177, -0.17625276744365692, 0.0], [-0.4771807789802551, -0.009819533675909042, 0.0], [-0.35019651055336, 0.14573897421360016, 0.0], [-0.32040172815322876, 0.32481884956359863, 0.0], [-0.1848212629556656, 0.5012596845626831, 0.0], [0.003327035577967763, 0.3431912064552307, 0.0], [0.17014658451080322, 0.49338072538375854, 0.0], [0.3084295392036438, 0.3300968408584595, 0.0], [0.3147759437561035, 0.1688390076160431, 0.0], [0.30798444151878357, -0.01496603712439537, 0.0], [0.3022921681404114, -0.1760873794555664, 0.0], [0.3055584728717804, -0.3181069791316986, 0.0], [0.1591603308916092, -3.2398359775543213, 1.0], [0.5677526593208313, 1.4050469398498535, 1.0], [0.001762398169375956, 2.424851417541504, 0.0], [0.014105278998613358, -1.5575906038284302, 1.0], [0.47463661432266235, -0.4763505160808563, 0.0], [0.3243906497955322, -0.24183230102062225, 0.0], [0.4769839644432068, -0.004354957956820726, 0.0], [0.3143244683742523, 0.16088826954364777, 0.0], [0.14023344218730927, -1.4060672521591187, 0.0], [1.722318172454834, 1.136897087097168, 1.0], [0.006346706300973892, 2.464653491973877, 0.0], [0.05676356330513954, -2.3568484783172607, 1.0], [-0.29380667209625244, -0.355095237493515, 0.0], [-0.28842946887016296, -0.17592674493789673, 0.0], [-0.4480489194393158, -0.01615268737077713, 0.0], [-0.34750860929489136, 0.14361855387687683, 0.0], [-0.3109768331050873, 0.32197457551956177, 0.0], [-0.17871564626693726, 0.4968056380748749, 0.0], [0.011790824122726917, 0.3444281220436096, 0.0], [0.17248427867889404, 0.49119535088539124, 0.0], [0.3049362897872925, 0.32796013355255127, 0.0], [0.3060981333255768, 0.1660979688167572, 0.0], [0.3053714334964752, -0.020708104595541954, 0.0], [0.2987630069255829, -0.18383701145648956, 0.0], [0.3064713478088379, -0.324751615524292, 0.0], [0.15752552449703217, -3.2052507400512695, 1.0], [0.581696629524231, 1.3999923467636108, 1.0], [0.001350876409560442, 2.399325370788574, 0.0], [0.017779640853405, -1.540669322013855, 1.0], [0.46587157249450684, -0.46728768944740295, 0.0], [0.32582053542137146, -0.23498758673667908, 0.0], [0.4645119607448578, -0.005023136269301176, 0.0], [0.30999884009361267, 0.15855498611927032, 0.0], [0.14048972725868225, -1.3933063745498657, 0.0], [0.5090166926383972, 1.1459450721740723, 1.0], [0.00589758763089776, 2.3257393836975098, 0.0], [0.01417909748852253, -1.566809058189392, 1.0], [0.504363477230072, -0.47326013445854187, 0.0], [0.33576700091362, -0.19820040464401245, 0.0], [0.4953278601169586, -0.004712613765150309, 0.0], [0.32483354210853577, 0.17101311683654785, 0.0], [0.16953502595424652, 0.5117517113685608, 0.0], [0.0010579486843198538, 1.733224868774414, 0.0], [0.17809228599071503, -3.7501769065856934, 1.0], [2.321920156478882, 1.5267153978347778, 1.0], [0.00023583663278259337, 2.4657082557678223, 0.0], [0.0014255859423428774, -1.9329352378845215, 1.0], [-0.3095166087150574, -0.36010217666625977, 0.0], [-0.3144344687461853, -0.17552022635936737, 0.0], [-0.4997391104698181, 0.005096018314361572, 0.0], [-0.3294093608856201, 0.18378102779388428, 0.0], [-0.3386303782463074, 0.3585711717605591, 0.0], [-0.17533664405345917, 0.5309211015701294, 0.0], [0.0067925648763775826, 0.34512409567832947, 0.0], [0.18011921644210815, 0.525113046169281, 0.0], [0.32546621561050415, 0.35230833292007446, 0.0], [0.3198733329772949, 0.17679598927497864, 0.0], [0.3125610649585724, -0.010853750631213188, 0.0], [0.31224459409713745, -0.1795545369386673, 0.0], [0.3116336464881897, -0.32151859998703003, 0.0], [0.164659783244133, -3.297292947769165, 1.0], [0.5788299441337585, 1.4218541383743286, 1.0], [0.001237328164279461, 2.4615564346313477, 0.0], [0.015100082382559776, -1.5929642915725708, 1.0], [0.4735114872455597, -0.4879303276538849, 0.0], [0.3278089761734009, -0.24272030591964722, 0.0], [0.4762139320373535, -0.005100402515381575, 0.0], [0.3137492835521698, 0.15922728180885315, 0.0], [0.1435113549232483, -1.4008891582489014, 0.0], [1.7611329555511475, 1.163818359375, 1.0], [0.006238163448870182, 2.4883692264556885, 0.0], [0.052648283541202545, -2.33021879196167, 1.0], [-0.29359331727027893, -0.3596678078174591, 0.0], [-0.2930150032043457, -0.17735400795936584, 0.0], [-0.45093584060668945, -0.012482990510761738, 0.0], [-0.35408058762550354, 0.14848366379737854, 0.0], [-0.3158390522003174, 0.3244597017765045, 0.0], [-0.18006610870361328, 0.5019034743309021, 0.0], [0.0036813414189964533, 0.342410683631897, 0.0], [0.1713937669992447, 0.4991152286529541, 0.0], [0.30831238627433777, 0.3324229419231415, 0.0], [0.3066069185733795, 0.168036550283432, 0.0], [0.30621036887168884, -0.015446873381733894, 0.0]], [[0.7234253883361816, 0.18222999572753906, 1.0], [-3.9016431401250884e-05, 3.420896291732788, 0.0], [0.020504463464021683, -1.7417447566986084, 1.0], [0.5059151649475098, -0.5384858846664429, 0.0], [0.3469398319721222, -0.21351496875286102, 0.0], [0.5209565758705139, 0.0014263208722695708, 0.0], [0.33251306414604187, 0.18576379120349884, 0.0], [0.1750134527683258, 0.5199702382087708, 0.0], [0.003735549747943878, 1.7632319927215576, 0.0], [0.18202070891857147, -3.810580015182495, 1.0], [2.319199323654175, 1.4711273908615112, 1.0], [-0.0009892008965834975, 2.4632699489593506, 0.0], [0.002566410694271326, -1.9240559339523315, 1.0], [-0.30867481231689453, -0.35334843397140503, 0.0], [-0.3111139237880707, -0.17788943648338318, 0.0], [-0.4911970794200897, 0.005229140166193247, 0.0], [-0.33282241225242615, 0.18065421283245087, 0.0], [-0.33141058683395386, 0.35713356733322144, 0.0], [-0.17926178872585297, 0.5278677344322205, 0.0], [0.0076370276510715485, 0.3445078134536743, 0.0], [0.1864832043647766, 0.5173312425613403, 0.0], [0.31538450717926025, 0.3501620292663574, 0.0], [0.32043662667274475, 0.17289888858795166, 0.0], [0.3116612434387207, -0.013823439367115498, 0.0], [0.31038758158683777, -0.17865078151226044, 0.0], [0.3141885995864868, -0.32285261154174805, 0.0], [0.16182909905910492, -3.273624897003174, 1.0], [0.5808306932449341, 1.414090633392334, 1.0], [0.0010642829583957791, 2.3914453983306885, 0.0], [0.015486936084926128, -1.545447587966919, 1.0], [0.4812351167201996, -0.4741172194480896, 0.0], [0.3298700451850891, -0.23390859365463257, 0.0], [0.4683593213558197, -0.003227447159588337, 0.0], [0.31596142053604126, 0.16104936599731445, 0.0], [0.14478236436843872, -1.4038844108581543, 0.0], [1.8158239126205444, 1.1173701286315918, 1.0], [0.0068106683902442455, 2.511730909347534, 0.0], [0.053938474506139755, -2.3306238651275635, 1.0], [-0.3038600981235504, -0.3559913635253906, 0.0], [-0.2960231304168701, -0.17633946239948273, 0.0], [-0.4799664616584778, -0.011430483311414719, 0.0], [-0.36220401525497437, 0.14770813286304474, 0.0], [-0.31229811906814575, 0.3296184539794922, 0.0], [-0.17985905706882477, 0.50536048412323, 0.0], [0.01349356584250927, 0.3460325002670288, 0.0], [0.18271082639694214, 0.49559321999549866, 0.0], [0.30769166350364685, 0.32802489399909973, 0.0], [0.3067775070667267, 0.16253966093063354, 0.0], [0.30266931653022766, -0.018436895683407784, 0.0], [0.2975770831108093, -0.1825142204761505, 0.0], [0.304500550031662, -0.3195136487483978, 0.0], [0.16107863187789917, -3.2329511642456055, 1.0], [0.5622391700744629, 1.4025031328201294, 1.0], [0.0012180455960333347, 2.3509771823883057, 0.0], [0.019728166982531548, -1.5161981582641602, 1.0], [0.4769030213356018, -0.46755388379096985, 0.0], [0.32678064703941345, -0.22738656401634216, 0.0], [0.4734596312046051, -0.004573080688714981, 0.0], [0.3137536346912384, 0.15699003636837006, 0.0], [0.1436842381954193, -1.38206946849823, 0.0], [1.755185842514038, 1.0731579065322876, 1.0], [0.007356465794146061, 2.482149600982666, 0.0], [0.054050199687480927, -2.3114659786224365, 1.0], [-0.29488617181777954, -0.35039520263671875, 0.0], [-0.28639742732048035, -0.17220288515090942, 0.0], [-0.4726734757423401, -0.012226061895489693, 0.0], [-0.354057252407074, 0.14401082694530487, 0.0], [-0.3071371018886566, 0.3183468282222748, 0.0], [-0.1749466508626938, 0.49820101261138916, 0.0], [0.013793788850307465, 0.3373703956604004, 0.0], [0.17881527543067932, 0.48800382018089294, 0.0], [0.3086058795452118, 0.3258567452430725, 0.0], [0.30793288350105286, 0.16329936683177948, 0.0], [0.30250224471092224, -0.020343858748674393, 0.0], [0.3012557625770569, -0.1831188201904297, 0.0], [0.30592724680900574, -0.3216451406478882, 0.0], [0.15826144814491272, -3.1956655979156494, 1.0], [0.5476383566856384, 1.393373727798462, 1.0], [0.0007052175351418555, 2.4052016735076904, 0.0], [0.01329746562987566, -1.5442259311676025, 1.0], [0.46984148025512695, -0.473819375038147, 0.0], [0.3301410675048828, -0.24018257856369019, 0.0], [0.4712993800640106, -0.0045722899958491325, 0.0], [0.3105960190296173, 0.15800555050373077, 0.0], [0.138316348195076, -1.3966983556747437, 0.0], [1.8189518451690674, 1.1156481504440308, 1.0], [0.006055569741874933, 2.5064477920532227, 0.0], [0.048871614038944244, -2.279205322265625, 1.0], [-0.2952778935432434, -0.35394272208213806, 0.0], [-0.2948293685913086, -0.17626512050628662, 0.0], [-0.47872185707092285, -0.011500215157866478, 0.0], [-0.35219916701316833, 0.14521415531635284, 0.0], [-0.32284265756607056, 0.32118016481399536, 0.0], [-0.18500590324401855, 0.49458616971969604, 0.0], [0.0012015319662168622, 0.3400760889053345, 0.0], [0.17630483210086823, 0.48719432950019836, 0.0], [0.3173384666442871, 0.3256923258304596, 0.0], [0.3124255836009979, 0.16026057302951813, 0.0], [0.3013527989387512, -0.014246799051761627, 0.0], [0.3014623522758484, -0.1777384728193283, 0.0], [0.30732786655426025, -0.31669679284095764, 0.0], [0.15868428349494934, -3.185647487640381, 1.0], [0.5567355751991272, 1.3823051452636719, 1.0], [0.0011466998839750886, 2.3936283588409424, 0.0], [0.015987418591976166, -1.4888288974761963, 1.0], [0.4651513397693634, -0.45458051562309265, 0.0], [0.32693564891815186, -0.2388133704662323, 0.0], [0.4758737087249756, -0.004742593504488468, 0.0], [0.31400266289711, 0.15000493824481964, 0.0], [0.14004267752170563, -1.3862558603286743, 1.0], [2.1299164295196533, 1.370274305343628, 1.0], [0.0009521256433799863, 2.223067283630371, 0.0], [0.0230378620326519, -1.9506199359893799, 1.0], [-0.29917100071907043, -0.3353599011898041, 0.0], [-0.30289584398269653, -0.16756322979927063, 0.0], [-0.47841134667396545, 0.0010710576316341758, 0.0], [-0.3449114263057709, 0.15983183681964874, 0.0], [-0.3353915214538574, 0.3208438456058502, 0.0], [-0.18899644911289215, 0.4900771677494049, 0.0], [0.002493141917511821, 0.3275545537471771, 0.0], [0.1807556003332138, 0.4846811890602112, 0.0], [0.3208296000957489, 0.3270419239997864, 0.0], [0.3215380907058716, 0.16718704998493195, 0.0], [0.3098452091217041, -0.005712395533919334, 0.0], [0.30669793486595154, -0.16421110928058624, 0.0], [0.31948843598365784, -0.3061429262161255, 0.0], [0.16466045379638672, -3.1592633724212646, 1.0], [0.5787658095359802, 1.3595346212387085, 1.0], [0.0006932467804290354, 2.322082281112671, 0.0], [0.01804148405790329, -1.5268080234527588, 1.0], [0.47247910499572754, -0.4662085473537445, 0.0], [0.3244366943836212, -0.22285202145576477, 0.0], [0.4740779995918274, -0.005691003054380417, 0.0], [0.3132874369621277, 0.15970180928707123, 0.0], [0.16261649131774902, 0.4966089427471161, 0.0], [-0.0003377710236236453, 1.7136940956115723, 0.0], [0.17303363978862762, -3.6555707454681396, 1.0], [2.293645143508911, 1.4883801937103271, 1.0], [0.0007831648690626025, 2.40519118309021, 0.0], [0.0013237999519333243, -1.8975201845169067, 1.0], [-0.3056073486804962, -0.3527289628982544, 0.0], [-0.3102489411830902, -0.17353054881095886, 0.0], [-0.49171096086502075, 0.00459717633202672, 0.0], [-0.33978232741355896, 0.1799527257680893, 0.0], [-0.3378293812274933, 0.35061562061309814, 0.0], [-0.16465528309345245, 0.527176558971405, 0.0], [0.02045414224267006, 0.34313756227493286, 0.0], [0.1910838931798935, 0.5147392749786377, 0.0], [0.32209351658821106, 0.3438420593738556, 0.0], [0.3210386633872986, 0.16946732997894287, 0.0], [0.3138890266418457, -0.017062745988368988, 0.0], [0.31704798340797424, -0.1824100911617279, 0.0], [0.3113539218902588, -0.3291151523590088, 0.0], [0.16197015345096588, -3.2631735801696777, 1.0], [0.5755345821380615, 1.4093623161315918, 1.0], [0.0017978509422391653, 2.483344316482544, 0.0], [0.010270453989505768, -1.579103946685791, 1.0], [0.4799729287624359, -0.483705073595047, 0.0], [0.33273836970329285, -0.2520722448825836, 0.0], [0.47405022382736206, -0.005113055929541588, 0.0], [0.3222833573818207, 0.15851683914661407, 0.0], [0.14557480812072754, -1.4105353355407715, 0.0], [1.7905035018920898, 1.1299024820327759, 1.0], [0.0057823811657726765, 2.487506866455078, 0.0], [0.050684887915849686, -2.304260015487671, 1.0], [-0.2990057170391083, -0.3551933169364929, 0.0], [-0.2960999608039856, -0.1766110360622406, 0.0], [-0.4792143702507019, -0.011480359360575676, 0.0], [-0.3531298339366913, 0.1475151926279068, 0.0], [-0.3178117573261261, 0.32263970375061035, 0.0], [-0.1889040768146515, 0.4988856911659241, 0.0], [0.0052024731412529945, 0.3381592035293579, 0.0], [0.1731489598751068, 0.4981197416782379, 0.0], [0.30914807319641113, 0.33415329456329346, 0.0], [0.31225189566612244, 0.16874675452709198, 0.0], [0.30602458119392395, -0.01321118138730526, 0.0], [0.3023105263710022, -0.18074564635753632, 0.0], [0.31027600169181824, -0.3203275799751282, 0.0], [0.15924997627735138, -3.2342731952667236, 1.0], [0.564483106136322, 1.4004511833190918, 1.0], [0.0007045122911222279, 2.402909278869629, 0.0], [0.015081134624779224, -1.5567370653152466, 1.0], [0.47173577547073364, -0.47475817799568176, 0.0], [0.32416486740112305, -0.23221132159233093, 0.0], [0.4639873504638672, -0.004736074712127447, 0.0], [0.3122742176055908, 0.15573391318321228, 0.0], [0.16107700765132904, 0.517264723777771, 0.0], [0.000887430040165782, 1.7827255725860596, 0.0], [0.16768182814121246, -3.7595489025115967, 1.0], [2.220513105392456, 1.5231910943984985, 1.0], [-2.7232294087298214e-05, 2.4497365951538086, 0.0], [0.003386417403817177, -1.9592546224594116, 1.0], [-0.2994556128978729, -0.3595614731311798, 0.0], [-0.3106411397457123, -0.17639762163162231, 0.0], [-0.4852216839790344, 0.006179408635944128, 0.0], [-0.3216489851474762, 0.18532957136631012, 0.0], [-0.3335627615451813, 0.36402204632759094, 0.0], [-0.17990683019161224, 0.5385719537734985, 0.0], [0.006083592772483826, 0.3508242666721344, 0.0], [0.18390074372291565, 0.5267641544342041, 0.0], [0.3187265396118164, 0.34940576553344727, 0.0], [0.3161753714084625, 0.16804100573062897, 0.0], [0.4927006959915161, -0.0046137054450809956, 0.0], [0.3132181167602539, -0.19010382890701294, 0.0], [0.3176060914993286, -0.35975638031959534, 0.0], [0.1695033609867096, -3.2992992401123047, 1.0], [0.5984298586845398, 1.4319294691085815, 1.0], [-0.0007127567660063505, 2.45821213722229, 0.0], [0.015046686865389347, -1.6250321865081787, 1.0], [0.4906919598579407, -0.49648386240005493, 0.0], [0.3303520381450653, -0.23354436457157135, 0.0], [0.4738234877586365, -0.0032606853637844324, 0.0], [0.3135172426700592, 0.16487890481948853, 0.0], [0.15936154127120972, 0.5278677344322205, 0.0], [-0.0012310693273320794, 1.7905206680297852, 0.0], [0.17346589267253876, -3.836501359939575, 1.0], [2.3834269046783447, 1.5428646802902222, 1.0], [-4.627224916475825e-05, 2.54264760017395, 0.0], [-0.002967267297208309, -1.9520914554595947, 1.0], [-0.3081325888633728, -0.36534059047698975, 0.0], [-0.3198947310447693, -0.1798805147409439, 0.0], [-0.5020051598548889, 0.006374252960085869, 0.0], [-0.3339427709579468, 0.19441647827625275, 0.0], [-0.33845970034599304, 0.37002554535865784, 0.0], [-0.17730580270290375, 0.5458003282546997, 0.0], [0.007503194734454155, 0.3543940782546997, 0.0], [0.17954903841018677, 0.5299484729766846, 0.0], [0.32380160689353943, 0.35683363676071167, 0.0], [0.3269966244697571, 0.18077610433101654, 0.0], [0.31450724601745605, -0.010765491984784603, 0.0], [0.31390097737312317, -0.17764443159103394, 0.0], [0.31679996848106384, -0.32961341738700867, 0.0], [0.16368721425533295, -3.357379913330078, 1.0], [0.5682706832885742, 1.4510141611099243, 1.0]], [[0.719272792339325, 0.18503692746162415, 1.0], [0.00011991101200692356, 3.4717917442321777, 0.0], [0.020239276811480522, -1.78248131275177, 1.0], [0.5259830951690674, -0.5524469017982483, 0.0], [0.3517134189605713, -0.21600574254989624, 0.0], [0.5187482237815857, 0.0024571663234382868, 0.0], [0.3325707018375397, 0.18575908243656158, 0.0], [0.17569981515407562, 0.5184272527694702, 0.0], [0.0023353041615337133, 1.790732502937317, 0.0], [0.18329735100269318, -3.8295552730560303, 1.0], [2.2496633529663086, 1.429160475730896, 1.0], [-0.0009259477956220508, 2.4911279678344727, 0.0], [0.005431323312222958, -1.9411250352859497, 1.0], [-0.30262893438339233, -0.35864320397377014, 0.0], [-0.30671924352645874, -0.17812348902225494, 0.0], [-0.48615753650665283, 0.005802304949611425, 0.0], [-0.33281078934669495, 0.1831424981355667, 0.0], [-0.3405764698982239, 0.35603758692741394, 0.0], [-0.16931235790252686, 0.5326085686683655, 0.0], [0.01720135286450386, 0.3419738709926605, 0.0], [0.18983697891235352, 0.5255419611930847, 0.0], [0.31984636187553406, 0.3500623404979706, 0.0], [0.313751757144928, 0.17200586199760437, 0.0], [0.3105737864971161, -0.016414163634181023, 0.0], [0.3076513707637787, -0.1828729510307312, 0.0], [0.3123030960559845, -0.32996705174446106, 0.0], [0.16233967244625092, -3.313140869140625, 1.0], [0.560689389705658, 1.4248698949813843, 1.0], [0.001052770297974348, 2.431002140045166, 0.0], [0.016522705554962158, -1.5635406970977783, 1.0], [0.4748978316783905, -0.4809066355228424, 0.0], [0.33373579382896423, -0.24144792556762695, 0.0], [0.4737549126148224, -0.004696231801062822, 0.0], [0.31191450357437134, 0.1606774777173996, 0.0], [0.14239971339702606, -1.409616231918335, 0.0], [1.781738519668579, 1.1416956186294556, 1.0], [0.007479567546397448, 2.517134666442871, 0.0], [0.0542813241481781, -2.37101674079895, 1.0], [-0.29592081904411316, -0.36429208517074585, 0.0], [-0.29291704297065735, -0.1764671802520752, 0.0], [-0.48006612062454224, -0.012675943784415722, 0.0], [-0.3532853126525879, 0.14733867347240448, 0.0], [-0.31735044717788696, 0.3308039605617523, 0.0], [-0.1780896782875061, 0.5091901421546936, 0.0], [0.010070848278701305, 0.3417753577232361, 0.0], [0.17981356382369995, 0.5026360750198364, 0.0], [0.3081134855747223, 0.3346863090991974, 0.0], [0.31598350405693054, 0.16459263861179352, 0.0], [0.3030490279197693, -0.01879778876900673, 0.0], [0.30227363109588623, -0.18538114428520203, 0.0], [0.30604618787765503, -0.32612302899360657, 0.0], [0.1594589352607727, -3.2521276473999023, 1.0], [0.5559808611869812, 1.41255521774292, 1.0], [0.0005027264123782516, 2.4231550693511963, 0.0], [0.01470886543393135, -1.5633865594863892, 1.0], [0.47055017948150635, -0.47809526324272156, 0.0], [0.31869545578956604, -0.2343229502439499, 0.0], [0.46750837564468384, -0.004866738338023424, 0.0], [0.311326801776886, 0.16529837250709534, 0.0], [0.14148519933223724, -1.4026397466659546, 0.0], [1.6967628002166748, 1.1295150518417358, 1.0], [0.006373717449605465, 2.4893686771392822, 0.0], [0.05599134787917137, -2.362790822982788, 1.0], [-0.28929516673088074, -0.35668590664863586, 0.0], [-0.30702805519104004, -0.20329518616199493, 0.0], [0.3394852578639984, 0.0008170031360350549, 0.0], [-0.3838934600353241, 0.11341973394155502, 0.0], [-0.24060769379138947, 0.2785017788410187, 0.0], [-0.1961970031261444, 0.4403586685657501, 0.0], [-0.0368066243827343, 0.36828702688217163, 0.0], [0.09273814409971237, 0.4498255252838135, 0.0], [0.20552825927734375, 0.40947678685188293, 0.0], [0.2764532268047333, 0.23808369040489197, 0.0], [0.2789989411830902, 0.05951586365699768, 0.0], [0.27582356333732605, -0.12018091976642609, 0.0], [0.2824118137359619, -0.27007636427879333, 0.0], [0.13579979538917542, -3.3389787673950195, 0.0], [0.5759289264678955, 0.12297436594963074, 1.0], [-0.003761119209229946, 3.5522899627685547, 0.0], [0.14389923214912415, -3.6414520740509033, 1.0], [0.5964733958244324, 0.16434188187122345, 1.0], [7.190038104454288e-06, 3.378791093826294, 0.0], [0.14019328355789185, 0.6082409024238586, 1.0], [0.40347906947135925, 0.136527419090271, 0.0], [0.29837360978126526, -0.057443007826805115, 0.0], [-1.2642549276351929, -2.480433464050293, 1.0], [1.1009066104888916, -0.006494333501905203, 0.0], [0.32806628942489624, -1.4086636304855347, 1.0], [0.6064526438713074, 0.1859372854232788, 1.0], [-0.002484814031049609, 3.4811041355133057, 0.0], [0.14147688448429108, 0.5715132355690002, 1.0], [0.40451034903526306, 0.12365381419658661, 0.0], [0.3017120957374573, -0.07093806564807892, 0.0], [-1.2824914455413818, -2.506383180618286, 1.0], [1.116540551185608, -0.005262789782136679, 0.0], [0.333780974149704, -1.4512875080108643, 1.0], [0.6135390400886536, 0.1922750473022461, 1.0], [0.18513479828834534, 0.23779432475566864, 0.0], [0.17181216180324554, -0.12120755761861801, 0.0], [-0.1445515751838684, -0.19285918772220612, 0.0], [-0.1633053869009018, 0.17104682326316833, 0.0], [0.1971229910850525, 1.2810821533203125, 1.0], [0.003276333911344409, 2.5081279277801514, 0.0], [0.352283775806427, -3.880321979522705, 1.0], [0.6944807171821594, 1.4564398527145386, 1.0], [-0.003188838018104434, 2.4167098999023438, 0.0], [0.021293090656399727, -1.6682270765304565, 1.0], [0.5083610415458679, -0.5075572729110718, 0.0], [0.34073179960250854, -0.21459658443927765, 0.0], [0.5105984807014465, -0.0033909466583281755, 0.0], [0.33053427934646606, 0.17964980006217957, 0.0], [0.026685403659939766, 2.0553317070007324, 0.0], [0.17973943054676056, -3.811452627182007, 1.0], [2.3808717727661133, 1.6366013288497925, 1.0], [0.001135334954597056, 2.5995852947235107, 0.0], [-0.006659818347543478, -1.9689030647277832, 1.0], [-0.30788546800613403, -0.37948086857795715, 0.0], [-0.31462058424949646, -0.18564340472221375, 0.0], [-0.4879184365272522, -0.010866161435842514, 0.0], [-0.3358139395713806, 0.18419696390628815, 0.0], [-0.3293777406215668, 0.35984840989112854, 0.0], [-0.19582515954971313, 0.5440438985824585, 0.0], [-0.009614506736397743, 0.35756441950798035, 0.0], [0.16519099473953247, 0.531665563583374, 0.0], [0.3224398195743561, 0.3650088608264923, 0.0], [0.320992648601532, 0.1904679238796234, 0.0], [0.4944710433483124, -0.0023997400421649218, 0.0], [0.3224608898162842, -0.18279044330120087, 0.0], [0.3181743025779724, -0.35761094093322754, 0.0], [0.16794708371162415, -3.3739097118377686, 1.0], [0.6302968263626099, 1.468773603439331, 1.0], [-0.0010171106550842524, 2.559645414352417, 0.0], [0.01282839197665453, -1.6386189460754395, 1.0], [0.48783326148986816, -0.4981827735900879, 0.0], [0.33752644062042236, -0.2548043429851532, 0.0], [0.48716917634010315, -0.0019376541022211313, 0.0], [0.3163604140281677, 0.16486868262290955, 0.0], [0.1440836638212204, -1.4541165828704834, 0.0], [1.7993476390838623, 1.1693655252456665, 1.0], [0.005777196958661079, 2.550600528717041, 0.0], [0.05222219601273537, -2.384166717529297, 1.0], [-0.2974108159542084, -0.3678077161312103, 0.0], [-0.2942086160182953, -0.18150044977664948, 0.0], [-0.45666879415512085, -0.01772809773683548, 0.0], [-0.35701364278793335, 0.14598195254802704, 0.0], [-0.3264204263687134, 0.3267520070075989, 0.0], [-0.18147465586662292, 0.5108761191368103, 0.0], [0.003131111618131399, 0.35160258412361145, 0.0], [0.17014098167419434, 0.5069979429244995, 0.0], [0.3112495243549347, 0.3414197564125061, 0.0], [0.31381532549858093, 0.17694014310836792, 0.0], [0.30853983759880066, -0.009442963637411594, 0.0], [0.301898717880249, -0.17859876155853271, 0.0], [0.30978894233703613, -0.3244314193725586, 0.0], [0.15881069004535675, -3.318711519241333, 1.0], [0.5694265961647034, 1.442203402519226, 1.0], [0.000557935331016779, 2.4779465198516846, 0.0], [0.014531911350786686, -1.6129851341247559, 1.0], [0.4774017930030823, -0.4927046597003937, 0.0], [0.32603058218955994, -0.24401776492595673, 0.0], [0.47316792607307434, -0.004527933429926634, 0.0], [0.3130873739719391, 0.1632746458053589, 0.0], [0.14176328480243683, -1.4266752004623413, 0.0], [1.7698743343353271, 1.1509733200073242, 1.0], [0.0057543120346963406, 2.568032741546631, 0.0], [0.05080804601311684, -2.379467010498047, 1.0], [-0.2983509600162506, -0.3679908215999603, 0.0], [-0.2923930287361145, -0.17815493047237396, 0.0], [-0.4512324929237366, -0.01724247820675373, 0.0], [-0.35856640338897705, 0.1436895728111267, 0.0], [-0.31378135085105896, 0.3220526874065399, 0.0], [-0.18618667125701904, 0.5054534673690796, 0.0], [0.0023152290377765894, 0.3483866751194, 0.0], [0.16772544384002686, 0.4950341582298279, 0.0], [0.30979591608047485, 0.3331192433834076, 0.0], [0.3132990300655365, 0.17432032525539398, 0.0], [0.30130234360694885, -0.011401092633605003, 0.0], [0.2963749170303345, -0.17708033323287964, 0.0], [0.3087981939315796, -0.317521333694458, 0.0], [0.15847629308700562, -3.270869016647339, 1.0], [0.5808902382850647, 1.4296891689300537, 1.0], [0.0010472215944901109, 2.362196683883667, 0.0], [0.01764749549329281, -1.567358136177063, 1.0], [0.474621444940567, -0.47925272583961487, 0.0], [0.33007678389549255, -0.23455031216144562, 0.0], [0.47239750623703003, -0.004282501991838217, 0.0], [0.30903226137161255, 0.16200114786624908, 0.0], [0.14482980966567993, -1.4127107858657837, 0.0], [1.830191969871521, 1.167458176612854, 1.0], [0.0070786806754767895, 2.481904983520508, 0.0], [0.051301952451467514, -2.2959959506988525, 1.0], [-0.30120599269866943, -0.3626405894756317, 0.0], [-0.2957081198692322, -0.17945265769958496, 0.0], [-0.4794873893260956, -0.012228919193148613, 0.0], [-0.34983256459236145, 0.1441698670387268, 0.0], [-0.33105647563934326, 0.3231317102909088, 0.0], [-0.19077451527118683, 0.5024402737617493, 0.0], [-0.0022466438822448254, 0.3400017321109772, 0.0], [0.16887187957763672, 0.4955402612686157, 0.0], [0.31458374857902527, 0.3336135745048523, 0.0], [0.31877726316452026, 0.16873407363891602, 0.0], [0.31090110540390015, -0.015162021853029728, 0.0], [0.30443114042282104, -0.175933837890625, 0.0], [0.3079259395599365, -0.3200099766254425, 0.0], [0.1620476096868515, -3.2401037216186523, 1.0], [0.563349187374115, 1.407806634902954, 1.0], [0.0006375521188601851, 2.431513547897339, 0.0], [0.015339446254074574, -1.5306633710861206, 1.0], [0.4732131063938141, -0.4688209295272827, 0.0], [0.32642078399658203, -0.2364041954278946, 0.0], [0.4788532257080078, -0.005109173245728016, 0.0], [0.31654033064842224, 0.15865260362625122, 0.0], [0.140226811170578, -1.407804250717163, 0.0], [1.7614092826843262, 1.085279941558838, 1.0], [0.005934199783951044, 2.5217535495758057, 0.0], [0.05345756560564041, -2.341649055480957, 1.0], [-0.2922384440898895, -0.35815727710723877, 0.0], [-0.2903154194355011, -0.1754390150308609, 0.0], [0.35428136587142944, 0.0014953382778912783, 0.0], [-0.3854096233844757, 0.11866741627454758, 0.0], [-0.24388210475444794, 0.279956191778183, 0.0], [-0.20770089328289032, 0.43302229046821594, 0.0], [-0.04802323505282402, 0.36545607447624207, 0.0], [0.08711904287338257, 0.44294053316116333, 0.0], [0.20308299362659454, 0.41249704360961914, 0.0], [0.2814181447029114, 0.24605998396873474, 0.0], [0.2801484763622284, 0.06729438155889511, 0.0], [0.274765282869339, -0.11011581122875214, 0.0], [0.2776924967765808, -0.2660203278064728, 0.0], [0.1374627649784088, -3.351562261581421, 1.0], [0.5120864510536194, 1.4285434484481812, 1.0], [0.0013567443238571286, 2.4631028175354004, 0.0], [0.01516041625291109, -1.614423394203186, 1.0], [0.4540046751499176, -0.49719393253326416, 0.0]], [[0.7447404265403748, 0.18335238099098206, 1.0], [-0.0005349648999981582, 3.4452524185180664, 0.0], [0.08150064945220947, -2.822960376739502, 1.0], [0.4070163071155548, -0.27123257517814636, 0.0], [0.3779556155204773, -0.1300656795501709, 0.0], [0.518919050693512, 0.005762755870819092, 0.0], [-0.09895576536655426, -0.20714570581912994, 0.0], [-0.22594745457172394, 0.09154447913169861, 0.0], [-0.1779041737318039, 0.24913647770881653, 0.0], [0.04264587163925171, 1.01827871799469, 0.0], [0.15080609917640686, 0.7034428715705872, 0.0], [-0.07630093395709991, 0.5879926085472107, 0.0], [-0.3876444101333618, 0.2960999011993408, 0.0], [-0.4966171383857727, -0.06860673427581787, 0.0], [-0.3369993269443512, -0.20986415445804596, 0.0], [-0.23684075474739075, -0.3626467287540436, 0.0], [1.8386108875274658, -3.6171462535858154, 1.0], [1.9410982131958008, 1.558529257774353, 1.0], [-0.001912623061798513, 2.45688533782959, 0.0], [0.01130545325577259, -2.0741539001464844, 1.0], [-0.2742310166358948, -0.3755359947681427, 0.0], [-0.2819420099258423, -0.1830023229122162, 0.0], [-0.44396206736564636, 0.006621810607612133, 0.0], [-0.3120043873786926, 0.18366563320159912, 0.0], [-0.3116174042224884, 0.3607635796070099, 0.0], [-0.17963819205760956, 0.5347662568092346, 0.0], [0.012164019979536533, 0.35101979970932007, 0.0], [0.17656496167182922, 0.5167334079742432, 0.0], [0.3004525303840637, 0.33887794613838196, 0.0], [0.2971317172050476, 0.15862874686717987, 0.0], [0.2943037748336792, -0.03713998198509216, 0.0], [0.2918030917644501, -0.21032431721687317, 0.0], [0.2971898317337036, -0.3553614914417267, 0.0], [0.15341028571128845, -3.2807810306549072, 1.0], [0.5479776263237, 1.439427375793457, 1.0], [0.0020182256121188402, 2.461972236633301, 0.0], [0.01608622819185257, -1.5904700756072998, 1.0], [0.45805272459983826, -0.48543617129325867, 0.0], [0.3227073848247528, -0.2405993491411209, 0.0], [0.4580698311328888, -0.005917381029576063, 0.0], [0.3065980076789856, 0.16104088723659515, 0.0], [0.14064949750900269, -1.411838173866272, 0.0], [1.6992133855819702, 1.1321520805358887, 1.0], [0.005949665326625109, 2.570880651473999, 0.0], [0.05126670375466347, -2.386152505874634, 1.0], [-0.29027503728866577, -0.3662979304790497, 0.0], [-0.28702613711357117, -0.17745573818683624, 0.0], [0.3478046953678131, 0.0005916478694416583, 0.0], [-0.37734317779541016, 0.11892861872911453, 0.0], [-0.24040378630161285, 0.28433364629745483, 0.0], [-0.20180219411849976, 0.44016575813293457, 0.0], [-0.04843854531645775, 0.3709779381752014, 0.0], [0.08654560893774033, 0.45050016045570374, 0.0], [0.20121002197265625, 0.4146146774291992, 0.0], [0.2825455367565155, 0.2442994862794876, 0.0], [0.2750604450702667, 0.0636691004037857, 0.0], [0.2691824436187744, -0.1181265339255333, 0.0], [0.2799436151981354, -0.27100810408592224, 0.0], [0.13580633699893951, -3.368720054626465, 1.0], [0.573415994644165, 0.1683516949415207, 1.0], [-0.0024591446854174137, 3.557145118713379, 0.0], [0.14083194732666016, 0.6060591340065002, 1.0], [0.37596091628074646, 0.1375901848077774, 0.0], [0.2876878082752228, -0.08016052842140198, 0.0], [-1.214673638343811, -2.5320210456848145, 1.0], [1.0645161867141724, -0.004248365294188261, 0.0], [0.31828925013542175, -1.4327354431152344, 1.0], [0.6194620728492737, 0.18801911175251007, 1.0], [-0.0025245018769055605, 3.5725831985473633, 0.0], [0.14445333182811737, 0.5803734660148621, 1.0], [0.4069143533706665, 0.12328245490789413, 0.0], [0.30781158804893494, -0.07311245054006577, 0.0], [-1.325872540473938, -2.547813653945923, 1.0], [1.1224695444107056, -0.00612008897587657, 0.0], [0.33752286434173584, -1.451881766319275, 1.0], [0.6209816336631775, 0.19380483031272888, 1.0], [0.18764342367649078, 0.2389526218175888, 0.0], [0.1567753702402115, -0.17122972011566162, 0.0], [-0.1472630798816681, -0.19117604196071625, 0.0], [-0.16880254447460175, 0.16921530663967133, 0.0], [0.19413720071315765, 1.2781232595443726, 1.0], [0.003752444637939334, 2.5724422931671143, 0.0], [0.3561953902244568, -3.8898186683654785, 1.0], [0.6861035227775574, 1.462705373764038, 1.0], [-0.002298773033544421, 2.4234776496887207, 0.0], [0.019196877256035805, -1.644676923751831, 1.0], [0.5156854391098022, -0.4997190237045288, 0.0], [0.35220396518707275, -0.22522304952144623, 0.0], [0.5071476697921753, -0.0015849528135731816, 0.0], [0.327935129404068, 0.1795063465833664, 0.0], [0.16191565990447998, 0.5292007923126221, 0.0], [-6.39590434730053e-05, 1.8144153356552124, 0.0], [0.17691606283187866, -3.914114236831665, 1.0], [2.4056124687194824, 1.6287963390350342, 1.0], [-0.0011385617544874549, 2.4655230045318604, 0.0], [-0.0011766186216846108, -1.959102749824524, 1.0], [-0.3161846101284027, -0.3665274679660797, 0.0], [-0.3208298981189728, -0.18271388113498688, 0.0], [-0.5068594813346863, 0.007578285411000252, 0.0], [-0.32856443524360657, 0.1897909790277481, 0.0], [-0.34136295318603516, 0.36934036016464233, 0.0], [-0.18153738975524902, 0.541732907295227, 0.0], [0.006007628049701452, 0.363083153963089, 0.0], [0.18347658216953278, 0.5289915800094604, 0.0], [0.32226505875587463, 0.35963964462280273, 0.0], [0.32773974537849426, 0.17959344387054443, 0.0], [0.5012022852897644, -0.002737433183938265, 0.0], [0.3223581314086914, -0.18213394284248352, 0.0], [0.32442983984947205, -0.35902130603790283, 0.0], [0.1689586192369461, -3.352619171142578, 1.0], [0.6102637648582458, 1.4554097652435303, 1.0], [-0.0004886265960521996, 2.495096206665039, 0.0], [0.01668754778802395, -1.6042439937591553, 1.0], [0.490908145904541, -0.4861569106578827, 0.0], [0.3411785662174225, -0.24160504341125488, 0.0], [0.4847486615180969, -0.002137498464435339, 0.0], [0.31781551241874695, 0.16340677440166473, 0.0], [0.1452748030424118, -1.4514267444610596, 0.0], [1.8676776885986328, 1.1689338684082031, 1.0], [0.006209797691553831, 2.567997455596924, 0.0], [0.05109994485974312, -2.365142583847046, 1.0], [-0.3067602515220642, -0.367576539516449, 0.0], [-0.300997793674469, -0.17744286358356476, 0.0], [-0.4859473705291748, -0.008396806195378304, 0.0], [-0.3584531545639038, 0.1516338437795639, 0.0], [-0.3317412734031677, 0.332693874835968, 0.0], [-0.18211573362350464, 0.516227662563324, 0.0], [0.005196444224566221, 0.3511805534362793, 0.0], [0.17641648650169373, 0.5078747868537903, 0.0], [0.31905925273895264, 0.34255287051200867, 0.0], [0.31529170274734497, 0.17631100118160248, 0.0], [0.31267666816711426, -0.011275652796030045, 0.0], [0.3097987174987793, -0.1811949610710144, 0.0], [0.31480473279953003, -0.32820916175842285, 0.0], [0.1620597243309021, -3.29050874710083, 1.0], [0.585676372051239, 1.436838150024414, 1.0], [0.0004918925114907324, 2.406564950942993, 0.0], [0.01465067733079195, -1.5566686391830444, 1.0], [0.472324401140213, -0.4768517315387726, 0.0], [0.32420626282691956, -0.23909685015678406, 0.0], [0.4732316732406616, -0.004221593029797077, 0.0], [0.31733328104019165, 0.1639360636472702, 0.0], [0.14401963353157043, -1.4423145055770874, 0.0], [1.8295279741287231, 1.131580114364624, 1.0], [0.005874707829207182, 2.5722434520721436, 0.0], [0.04878931865096092, -2.3182804584503174, 1.0], [-0.29589614272117615, -0.3639683127403259, 0.0], [-0.2990948557853699, -0.18021787703037262, 0.0], [-0.480221152305603, -0.01162671484053135, 0.0], [-0.3548083007335663, 0.1495278924703598, 0.0], [-0.3217734098434448, 0.3307020962238312, 0.0], [-0.18197904527187347, 0.5098470449447632, 0.0], [0.00580335920676589, 0.3446577787399292, 0.0], [0.17654478549957275, 0.5064761638641357, 0.0], [0.315655380487442, 0.3393145799636841, 0.0], [0.3112111985683441, 0.17323441803455353, 0.0], [0.3073362708091736, -0.013216391205787659, 0.0], [0.3090919256210327, -0.1808055192232132, 0.0], [0.3060724139213562, -0.321541428565979, 0.0], [0.1599303036928177, -3.2954604625701904, 1.0], [0.5771098732948303, 1.427528977394104, 1.0], [0.0015431125648319721, 2.4642088413238525, 0.0], [0.013538423925638199, -1.545835256576538, 1.0], [0.4754156470298767, -0.4721336364746094, 0.0], [0.329624742269516, -0.2415241003036499, 0.0], [0.47740212082862854, -0.004860448185354471, 0.0], [0.3129154145717621, 0.16008418798446655, 0.0], [0.14303839206695557, -1.4300686120986938, 0.0], [1.7873255014419556, 1.1558817625045776, 1.0], [0.006148431915789843, 2.5242631435394287, 0.0], [0.04946150258183479, -2.36269211769104, 1.0], [-0.29865166544914246, -0.36087486147880554, 0.0], [-0.29321223497390747, -0.1764054149389267, 0.0], [-0.4528190493583679, -0.018200509250164032, 0.0], [-0.3550719618797302, 0.14086906611919403, 0.0], [-0.32265618443489075, 0.3193294405937195, 0.0], [-0.18677674233913422, 0.49867451190948486, 0.0], [-1.9106439140159637e-05, 0.3437964618206024, 0.0], [0.16910073161125183, 0.49586209654808044, 0.0], [0.3106013238430023, 0.3343902826309204, 0.0], [0.31053251028060913, 0.1774095594882965, 0.0], [0.30491361021995544, -0.008976295590400696, 0.0], [0.30040740966796875, -0.17385560274124146, 0.0], [0.3011481463909149, -0.3152643144130707, 0.0], [0.15879948437213898, -3.2541887760162354, 1.0], [0.5563578009605408, 1.4035080671310425, 1.0], [0.00031518415198661387, 2.4738872051239014, 0.0], [0.012809310108423233, -1.583827257156372, 1.0], [0.4646044075489044, -0.4837273359298706, 0.0], [0.32603439688682556, -0.24456988275051117, 0.0], [0.46772828698158264, -0.004370926879346371, 0.0], [0.3110698163509369, 0.15901878476142883, 0.0], [0.14287053048610687, -1.4226481914520264, 0.0], [1.7223933935165405, 1.1848002672195435, 1.0], [0.007047221530228853, 2.514061450958252, 0.0], [0.05125592648983002, -2.358894109725952, 1.0], [-0.29394078254699707, -0.36070698499679565, 0.0], [-0.2880816161632538, -0.17538414895534515, 0.0], [0.34760716557502747, -0.0010265696328133345, 0.0], [-0.3791314959526062, 0.1179894432425499, 0.0], [-0.2434253692626953, 0.28181353211402893, 0.0], [-0.20548228919506073, 0.44364649057388306, 0.0], [-0.050133708864450455, 0.3634336590766907, 0.0], [0.08339183777570724, 0.44873031973838806, 0.0], [0.20364102721214294, 0.41012802720069885, 0.0], [0.27561143040657043, 0.24397015571594238, 0.0], [0.2791357934474945, 0.06352860480546951, 0.0], [0.28287822008132935, -0.1159391850233078, 0.0], [0.27750280499458313, -0.2725861370563507, 0.0], [0.1362709105014801, -3.3284382820129395, 1.0], [0.5794852375984192, 0.16801905632019043, 1.0], [-0.0015078133437782526, 3.5570688247680664, 0.0], [0.14414618909358978, 0.6110964417457581, 1.0], [0.391162633895874, 0.1371399462223053, 0.0], [0.28772175312042236, -0.0721781924366951, 0.0], [-1.219751238822937, -2.5342814922332764, 1.0], [1.0683380365371704, -0.003937534987926483, 0.0], [0.3153414726257324, -1.4152988195419312, 1.0], [0.6255037188529968, 0.1853386014699936, 1.0], [0.1852407455444336, 0.2341679483652115, 0.0], [0.16843989491462708, -0.12076149880886078, 0.0], [-0.13945704698562622, -0.19253034889698029, 0.0], [-0.16944293677806854, 0.16577357053756714, 0.0], [0.18860849738121033, 1.2462177276611328, 1.0], [0.0025280786212533712, 2.5213735103607178, 0.0], [0.34566038846969604, -3.8449020385742188, 1.0], [0.6922142505645752, 1.4500383138656616, 1.0], [-0.002335520461201668, 2.346817970275879, 0.0], [0.018713368102908134, -1.6322325468063354, 1.0], [0.5034177899360657, -0.49400147795677185, 0.0], [0.3493766784667969, -0.21477285027503967, 0.0], [0.5106686949729919, -0.0023663367610424757, 0.0], [0.3299567997455597, 0.1812877357006073, 0.0], [0.16773638129234314, 0.5275223851203918, 0.0]], [[0.7257662415504456, 0.18043197691440582, 1.0], [-0.0014949803007766604, 3.498591899871826, 0.0], [0.020258158445358276, -1.7837867736816406, 1.0], [0.5175681710243225, -0.5500736832618713, 0.0], [0.34508317708969116, -0.21190465986728668, 0.0], [0.5208510160446167, 0.001545681618154049, 0.0], [0.33478787541389465, 0.1831204742193222, 0.0], [0.1760292649269104, 0.5216001868247986, 0.0], [0.08008400350809097, 0.4052565097808838, 0.0], [-0.05223364382982254, 0.4574584364891052, 0.0], [-0.18008524179458618, 0.4038821756839752, 0.0], [-0.3183167576789856, 0.2587697207927704, 0.0], [-0.3410930633544922, 0.09648565202951431, 0.0], [-0.342216819524765, -0.10706306993961334, 0.0], [-0.3325951397418976, -0.25740760564804077, 0.0], [2.0041086673736572, -3.2521626949310303, 1.0], [1.8961445093154907, 1.3773072957992554, 1.0], [-0.0030861226841807365, 2.402895927429199, 0.0], [0.01712076924741268, -2.0233042240142822, 1.0], [-0.2812160849571228, -0.3532665967941284, 0.0], [-0.2783154845237732, -0.16885477304458618, 0.0], [-0.44427746534347534, 0.0011190999066457152, 0.0], [-0.31705227494239807, 0.1616784632205963, 0.0], [-0.32219746708869934, 0.33046749234199524, 0.0], [-0.18579478561878204, 0.49715402722358704, 0.0], [0.005302188917994499, 0.33668750524520874, 0.0], [0.17546845972537994, 0.4897489547729492, 0.0], [0.30115649104118347, 0.3229732811450958, 0.0], [0.3050081133842468, 0.15681995451450348, 0.0], [0.2992520332336426, -0.022733256220817566, 0.0], [0.29613903164863586, -0.1868443340063095, 0.0], [0.30394890904426575, -0.3244308829307556, 0.0], [0.15590079128742218, -3.1703553199768066, 1.0], [0.6145156621932983, 0.16411952674388885, 1.0], [-0.001046499004587531, 3.4428858757019043, 0.0], [0.14941439032554626, 0.587379515171051, 1.0], [0.40082064270973206, 0.12729722261428833, 0.0], [0.3014969229698181, -0.08169332146644592, 0.0], [-1.2820920944213867, -2.4591867923736572, 1.0], [1.0959784984588623, -0.005273153539747, 0.0], [0.3257656991481781, -1.3983913660049438, 1.0], [0.6025778651237488, 0.18596889078617096, 1.0], [0.1859595626592636, 0.23679614067077637, 0.0], [0.16860215365886688, -0.11523973196744919, 0.0], [-0.14136436581611633, -0.18979258835315704, 0.0], [-0.16208641231060028, 0.1690710335969925, 0.0], [0.19183354079723358, 1.230495810508728, 1.0], [0.003577781841158867, 2.4835636615753174, 0.0], [0.34877723455429077, -3.759093761444092, 1.0], [0.7021726369857788, 1.4052077531814575, 1.0], [-0.002806713804602623, 2.356074810028076, 0.0], [0.017547760158777237, -1.6356812715530396, 1.0], [0.5088422298431396, -0.49756330251693726, 0.0], [0.3450559675693512, -0.2177824079990387, 0.0], [0.502531111240387, -0.00141932035330683, 0.0], [0.3303353190422058, 0.17451392114162445, 0.0], [0.16608741879463196, 0.5177016258239746, 0.0], [0.000585801899433136, 1.7579283714294434, 0.0], [0.1790134459733963, -3.7886905670166016, 1.0], [2.329221487045288, 1.522859811782837, 1.0], [-0.0011677069123834372, 2.497697114944458, 0.0], [0.0025276015512645245, -1.9481934309005737, 1.0], [-0.30364909768104553, -0.3641667366027832, 0.0], [-0.3173592686653137, -0.17831896245479584, 0.0], [-0.4998973608016968, 0.005204503890126944, 0.0], [-0.3386319577693939, 0.18084445595741272, 0.0], [-0.344965398311615, 0.36229652166366577, 0.0], [-0.17438824474811554, 0.5400612950325012, 0.0], [0.00646722549572587, 0.3442350924015045, 0.0], [0.18451492488384247, 0.5294701457023621, 0.0], [0.3264559209346771, 0.357148677110672, 0.0], [0.3199915587902069, 0.1792593002319336, 0.0], [0.31317415833473206, -0.007336537819355726, 0.0], [0.31435877084732056, -0.1745712161064148, 0.0], [0.31229984760284424, -0.32358720898628235, 0.0], [0.16261522471904755, -3.3332679271698, 1.0], [0.5981662273406982, 1.4414584636688232, 1.0], [0.00041566751315258443, 2.4151341915130615, 0.0], [0.017479531466960907, -1.563032627105713, 1.0], [0.48780152201652527, -0.4783772826194763, 0.0], [0.33403417468070984, -0.2333100587129593, 0.0], [0.48210638761520386, -0.002989067928865552, 0.0], [0.31589022278785706, 0.162257581949234, 0.0], [0.145503431558609, -1.4302879571914673, 0.0], [1.8588026762008667, 1.1244336366653442, 1.0], [0.006801925133913755, 2.5798635482788086, 0.0], [0.05308043584227562, -2.3586843013763428, 1.0], [-0.2970278561115265, -0.35987135767936707, 0.0], [-0.2958334982395172, -0.17896206676959991, 0.0], [-0.48367801308631897, -0.012107642367482185, 0.0], [-0.3561100363731384, 0.1485411375761032, 0.0], [-0.333512544631958, 0.32779166102409363, 0.0], [-0.18559087812900543, 0.5087435841560364, 0.0], [0.00046564999502152205, 0.34358513355255127, 0.0], [0.16969023644924164, 0.49983495473861694, 0.0], [0.31449800729751587, 0.3374980390071869, 0.0], [0.31619179248809814, 0.16976799070835114, 0.0], [0.3098148703575134, -0.012010380625724792, 0.0], [0.3038293421268463, -0.17827275395393372, 0.0], [0.30891528725624084, -0.3176141083240509, 0.0], [0.15982641279697418, -3.235774040222168, 1.0], [0.5593727231025696, 1.4086872339248657, 1.0], [0.000746981124393642, 2.470275402069092, 0.0], [0.016286756843328476, -1.564028263092041, 1.0], [0.4769909977912903, -0.4809280335903168, 0.0], [0.3284282982349396, -0.23591181635856628, 0.0], [0.47051331400871277, -0.0037210597656667233, 0.0], [0.31880882382392883, 0.15848976373672485, 0.0], [0.14303278923034668, -1.4184380769729614, 0.0], [1.7490620613098145, 1.1097278594970703, 1.0], [0.006433617323637009, 2.5685391426086426, 0.0], [0.04711790755391121, -2.3623812198638916, 1.0], [-0.30040696263313293, -0.36259573698043823, 0.0], [-0.293771892786026, -0.17641231417655945, 0.0], [0.346057653427124, 0.001193279749713838, 0.0], [-0.38296449184417725, 0.1191113069653511, 0.0], [-0.24943943321704865, 0.2816848158836365, 0.0], [-0.20650525391101837, 0.4418480694293976, 0.0], [-0.05111420899629593, 0.36265307664871216, 0.0], [0.08284303545951843, 0.45218130946159363, 0.0], [0.20606963336467743, 0.4093010127544403, 0.0], [0.28079918026924133, 0.2398122102022171, 0.0], [0.2796005606651306, 0.06045336276292801, 0.0], [0.2786293625831604, -0.11656513810157776, 0.0], [0.28081679344177246, -0.2703275680541992, 0.0], [0.13898509740829468, -3.3499977588653564, 0.0], [0.576623797416687, 0.12296895682811737, 1.0], [-0.004129066132009029, 3.5473339557647705, 0.0], [0.1322750598192215, -3.5394489765167236, 1.0], [0.5560996532440186, 0.1610742062330246, 1.0], [0.0014601555885747075, 3.3340342044830322, 0.0], [0.12135817855596542, -3.319087266921997, 1.0], [0.5839603543281555, 0.15476059913635254, 1.0], [0.004030697513371706, 3.210859537124634, 0.0], [0.13766737282276154, -3.302367687225342, 1.0], [2.074968099594116, 1.3471981287002563, 1.0], [0.002117759548127651, 2.2787322998046875, 0.0], [0.02045709453523159, -1.9909082651138306, 1.0], [-0.30388692021369934, -0.34552234411239624, 0.0], [-0.2985074818134308, -0.17011290788650513, 0.0], [-0.4755672812461853, 0.005222033709287643, 0.0], [-0.34438157081604004, 0.16511128842830658, 0.0], [-0.3317424952983856, 0.3346796929836273, 0.0], [-0.18346208333969116, 0.5055848956108093, 0.0], [0.003381123300641775, 0.34108996391296387, 0.0], [0.17719702422618866, 0.4952821731567383, 0.0], [0.3177332580089569, 0.33483487367630005, 0.0], [0.3200417757034302, 0.1644994169473648, 0.0], [0.30839526653289795, -0.015836535021662712, 0.0], [0.3060241937637329, -0.17611943185329437, 0.0], [0.31219959259033203, -0.3161066174507141, 0.0], [0.1599763035774231, -3.2285315990448, 1.0], [0.5732944011688232, 1.3921880722045898, 1.0], [0.0007313285022974014, 2.417109251022339, 0.0], [0.01445106603205204, -1.5458804368972778, 1.0], [0.47042882442474365, -0.47365206480026245, 0.0], [0.3308483958244324, -0.23436427116394043, 0.0], [0.4679071605205536, -0.003941033035516739, 0.0], [0.3173157870769501, 0.1592642217874527, 0.0], [0.14274410903453827, -1.408172369003296, 0.0], [1.8134993314743042, 1.145553708076477, 1.0], [0.006347376853227615, 2.4804327487945557, 0.0], [0.050199706107378006, -2.2858071327209473, 1.0], [-0.2962896525859833, -0.3532198369503021, 0.0], [-0.29285672307014465, -0.17493902146816254, 0.0], [-0.44628584384918213, -0.01691432297229767, 0.0], [-0.3595917224884033, 0.14466367661952972, 0.0], [-0.3110634684562683, 0.3216911852359772, 0.0], [-0.18443815410137177, 0.49686476588249207, 0.0], [0.0015545290661975741, 0.3367932438850403, 0.0], [0.17336295545101166, 0.4901014268398285, 0.0], [0.3087080121040344, 0.3280072808265686, 0.0], [0.31246417760849, 0.16711600124835968, 0.0], [0.3059372007846832, -0.016177648678421974, 0.0], [0.2991427779197693, -0.1800210028886795, 0.0], [0.30744466185569763, -0.316727876663208, 0.0], [0.15828268229961395, -3.185533285140991, 1.0], [0.5437409281730652, 1.383890151977539, 1.0], [0.0013169152662158012, 2.425084114074707, 0.0], [0.014669876545667648, -1.542444109916687, 1.0], [0.47869929671287537, -0.4729914665222168, 0.0], [0.32066041231155396, -0.22727100551128387, 0.0], [0.46708837151527405, -0.005100391339510679, 0.0], [0.31182026863098145, 0.15955494344234467, 0.0], [0.13949301838874817, -1.3959791660308838, 0.0], [1.6650203466415405, 1.114047884941101, 1.0], [0.006446228828281164, 2.4856035709381104, 0.0], [0.05391055718064308, -2.348212957382202, 1.0], [-0.2875443398952484, -0.3575453758239746, 0.0], [-0.30346858501434326, -0.20347154140472412, 0.0], [0.3376469910144806, 1.3698009752260987e-05, 0.0], [-0.37888965010643005, 0.1123032197356224, 0.0], [-0.24560664594173431, 0.2763262093067169, 0.0], [-0.20002059638500214, 0.43330469727516174, 0.0], [-0.04333553463220596, 0.3665880560874939, 0.0], [0.09710397571325302, 0.4470289945602417, 0.0], [0.21166114509105682, 0.4097541868686676, 0.0], [0.2789795696735382, 0.23890361189842224, 0.0], [0.27750760316848755, 0.059741776436567307, 0.0], [0.2716015577316284, -0.1235642060637474, 0.0], [0.2785712778568268, -0.2720712423324585, 0.0], [0.294189453125, -0.3468078374862671, 0.0], [0.1404692381620407, -3.09494686126709, 1.0], [0.6171836853027344, 0.16340859234333038, 1.0], [-0.0023403295781463385, 3.513347864151001, 0.0], [0.1430901736021042, 0.6103054285049438, 1.0], [0.3841739594936371, 0.1303955316543579, 0.0], [0.28981566429138184, -0.07830525189638138, 0.0], [-1.2186181545257568, -2.4687368869781494, 1.0], [1.0744279623031616, -0.005180178210139275, 0.0], [0.31910499930381775, -1.3992019891738892, 1.0], [0.5661559700965881, 0.18574638664722443, 1.0], [0.17975181341171265, 0.23926283419132233, 0.0], [0.16817790269851685, -0.11882282048463821, 0.0], [-0.13749849796295166, -0.19290830194950104, 0.0], [-0.1675649881362915, 0.16896368563175201, 0.0], [0.1921977400779724, 1.237442970275879, 1.0], [0.0026437744963914156, 2.478178024291992, 0.0], [0.3400058150291443, -3.786858081817627, 1.0], [0.6691640615463257, 1.421081304550171, 1.0], [-0.001997904619202018, 2.337261438369751, 0.0], [0.01941045932471752, -1.5982667207717896, 1.0], [0.5024689435958862, -0.48546087741851807, 0.0], [0.3449733555316925, -0.20909270644187927, 0.0], [0.5044177174568176, -0.0025381583254784346, 0.0], [0.33067503571510315, 0.17598341405391693, 0.0], [0.16797451674938202, 0.5185876488685608, 0.0], [-0.00035026800469495356, 1.7638256549835205, 0.0], [0.1792229413986206, -3.783182144165039, 1.0], [2.3012235164642334, 1.5597933530807495, 1.0], [-0.000851915217936039, 2.449234962463379, 0.0], [0.0004652182396966964, -1.9420140981674194, 1.0], [-0.3077218234539032, -0.35963302850723267, 0.0], [-0.3175559341907501, -0.1802651584148407, 0.0]], [[0.7262352108955383, 0.18384844064712524, 1.0], [-0.00026420416543260217, 3.531982183456421, 0.0], [0.07966110110282898, -2.8976190090179443, 1.0], [0.4088921844959259, -0.27843350172042847, 0.0], [0.3767111301422119, -0.13043735921382904, 0.0], [0.5223442912101746, 0.0032215414103120565, 0.0], [-0.09766633063554764, -0.20835906267166138, 0.0], [-0.22677743434906006, 0.09287134557962418, 0.0], [-0.17287470400333405, 0.2501581311225891, 0.0], [0.052803654223680496, 1.0432658195495605, 0.0], [0.16832832992076874, 0.7108715772628784, 0.0], [-0.09444475919008255, 0.5546301007270813, 0.0], [-0.38410118222236633, 0.2945527732372284, 0.0], [-0.5236132740974426, -0.09243930131196976, 0.0], [-0.34685811400413513, -0.21453824639320374, 0.0], [-0.23416829109191895, -0.3685503304004669, 0.0], [1.845705509185791, -3.5958638191223145, 1.0], [0.6255512237548828, 0.18362337350845337, 1.0], [-0.004691661335527897, 3.6370084285736084, 0.0], [0.1434907615184784, 0.6013165712356567, 1.0], [0.40642428398132324, 0.13048462569713593, 0.0], [0.3013042211532593, -0.07695120573043823, 0.0], [-1.2933229207992554, -2.5259015560150146, 1.0], [1.127994179725647, -0.009456980973482132, 0.0], [0.33472374081611633, -1.4222126007080078, 1.0], [0.620087206363678, 0.1879449039697647, 1.0], [0.18821348249912262, 0.2231241762638092, 0.0], [0.15444865822792053, -0.17298845946788788, 0.0], [-0.14533889293670654, -0.18821118772029877, 0.0], [-0.161463662981987, 0.1693800389766693, 0.0], [0.19557617604732513, 1.2575329542160034, 1.0], [0.0024961542803794146, 2.528017997741699, 0.0], [0.35144519805908203, -3.813387393951416, 1.0], [0.6925716996192932, 1.4293526411056519, 1.0], [-0.0027832251507788897, 2.4589684009552, 0.0], [0.014062324538826942, -1.6724618673324585, 1.0], [0.5150524377822876, -0.5094286203384399, 0.0], [0.34675320982933044, -0.2174007147550583, 0.0], [0.5008795261383057, -0.0015314535703510046, 0.0], [0.331295907497406, 0.17745862901210785, 0.0], [0.023226821795105934, 2.040383815765381, 0.0], [0.1838751882314682, -3.804485559463501, 1.0], [2.362325668334961, 1.5961720943450928, 1.0], [0.0017669008811935782, 2.575469732284546, 0.0], [-0.002524268813431263, -1.940372347831726, 1.0], [-0.30835676193237305, -0.3714556396007538, 0.0], [-0.31138014793395996, -0.18578630685806274, 0.0], [-0.4882846772670746, -0.009650520980358124, 0.0], [-0.33402565121650696, 0.18260282278060913, 0.0], [-0.3427690863609314, 0.3615487217903137, 0.0], [-0.18196162581443787, 0.5410515069961548, 0.0], [-0.000523413298651576, 0.3552095592021942, 0.0], [0.17517699301242828, 0.5326953530311584, 0.0], [0.32324472069740295, 0.3601682782173157, 0.0], [0.3228479325771332, 0.18583442270755768, 0.0], [0.312287837266922, -0.009146416559815407, 0.0], [0.3093027174472809, -0.17564886808395386, 0.0], [0.31540825963020325, -0.32589617371559143, 0.0], [0.15946733951568604, -3.3643996715545654, 1.0], [0.5765029191970825, 1.4498443603515625, 1.0], [0.000685216102283448, 2.5147979259490967, 0.0], [0.01415348146110773, -1.60196852684021, 1.0], [0.47451186180114746, -0.48808127641677856, 0.0], [0.32690832018852234, -0.2454342395067215, 0.0], [0.4734877049922943, -0.004443513695150614, 0.0], [0.31586962938308716, 0.1609443724155426, 0.0], [0.14347878098487854, -1.4611051082611084, 0.0], [1.7448879480361938, 1.0916801691055298, 1.0], [0.005902848206460476, 2.6029531955718994, 0.0], [0.05377110838890076, -2.412879467010498, 1.0], [-0.3005846440792084, -0.361164391040802, 0.0], [-0.2899326980113983, -0.17838174104690552, 0.0], [0.35156962275505066, 0.000964547332841903, 0.0], [-0.3883776068687439, 0.11906087398529053, 0.0], [-0.24375353753566742, 0.28854626417160034, 0.0], [-0.19728617370128632, 0.4469718635082245, 0.0], [-0.04368174821138382, 0.37287524342536926, 0.0], [0.09177147597074509, 0.4575023949146271, 0.0], [0.20433871448040009, 0.4175890386104584, 0.0], [0.27943581342697144, 0.2511029541492462, 0.0], [0.279502809047699, 0.06740398705005646, 0.0], [0.2773829698562622, -0.11357641220092773, 0.0], [0.2799757421016693, -0.27252110838890076, 0.0], [0.1371510773897171, -3.405972957611084, 0.0], [0.5801206231117249, 0.12711568176746368, 1.0], [-0.004285044502466917, 3.5889790058135986, 0.0], [0.143131822347641, -3.6651687622070312, 1.0], [0.5580287575721741, 0.16628319025039673, 1.0], [0.0003773132339119911, 3.4195947647094727, 0.0], [0.11604546010494232, -3.3403403759002686, 1.0], [0.5793402791023254, 0.15724265575408936, 1.0], [0.005662683863192797, 3.2277584075927734, 0.0], [0.11761616915464401, -3.1921498775482178, 1.0], [0.5593326091766357, 0.15120258927345276, 1.0], [0.00482765631750226, 3.115649700164795, 0.0], [0.11699193716049194, -3.1454033851623535, 1.0], [1.95350182056427, 1.307868242263794, 1.0], [0.0030115672852844, 2.2402689456939697, 0.0], [0.03325047343969345, -2.068368434906006, 1.0], [-0.29811087250709534, -0.3383916914463043, 0.0], [-0.3073236644268036, -0.17527256906032562, 0.0], [-0.46330973505973816, -0.00011703079508151859, 0.0], [-0.3467005491256714, 0.15723678469657898, 0.0], [-0.32261228561401367, 0.3268471658229828, 0.0], [-0.18904250860214233, 0.4949224591255188, 0.0], [-0.002756353234872222, 0.33457106351852417, 0.0], [0.17214494943618774, 0.4919949471950531, 0.0], [0.3154582679271698, 0.3320655822753906, 0.0], [0.32044166326522827, 0.17039446532726288, 0.0], [0.3101094663143158, -0.010125073604285717, 0.0], [0.3086930215358734, -0.17263861000537872, 0.0], [0.3121495842933655, -0.3136552572250366, 0.0], [0.16166278719902039, -3.1982367038726807, 1.0], [0.5737630128860474, 1.3895747661590576, 1.0], [-0.00046191836008802056, 2.4087071418762207, 0.0], [0.015066509135067463, -1.5496746301651, 1.0], [0.4782889187335968, -0.47400662302970886, 0.0], [0.33242732286453247, -0.2391332983970642, 0.0], [0.4679921269416809, -0.003615147201344371, 0.0], [0.3166338801383972, 0.15960676968097687, 0.0], [0.1430327445268631, -1.396175503730774, 0.0], [1.7353724241256714, 1.090133786201477, 1.0], [0.00637261476367712, 2.519481658935547, 0.0], [0.05387075990438461, -2.335344076156616, 1.0], [-0.2907980680465698, -0.3543826639652252, 0.0], [-0.2877064347267151, -0.1753121316432953, 0.0], [-0.4450383484363556, -0.01851700432598591, 0.0], [-0.35612422227859497, 0.1407073736190796, 0.0], [-0.30990713834762573, 0.31923195719718933, 0.0], [-0.18519341945648193, 0.4914683997631073, 0.0], [0.0029647976625710726, 0.3373607397079468, 0.0], [0.16831707954406738, 0.4856526553630829, 0.0], [0.3047829866409302, 0.3262772262096405, 0.0], [0.30515924096107483, 0.16657526791095734, 0.0], [0.30255138874053955, -0.015426711179316044, 0.0], [0.29800665378570557, -0.17955246567726135, 0.0], [0.29842445254325867, -0.3175956606864929, 0.0], [0.1560780555009842, -3.2015905380249023, 1.0], [0.5464269518852234, 1.3816739320755005, 1.0], [-0.0011227913200855255, 2.4101977348327637, 0.0], [0.014330276288092136, -1.5532801151275635, 1.0], [0.46923425793647766, -0.474016398191452, 0.0], [0.3265365958213806, -0.23564723134040833, 0.0], [0.47056928277015686, -0.00508572394028306, 0.0], [0.315525621175766, 0.16164107620716095, 0.0], [0.14044152200222015, -1.4021352529525757, 0.0], [1.8237589597702026, 1.133018970489502, 1.0], [0.00629401346668601, 2.4727792739868164, 0.0], [0.0467165969312191, -2.2626779079437256, 1.0], [-0.29430028796195984, -0.3523886799812317, 0.0], [-0.29515397548675537, -0.17532101273536682, 0.0], [-0.47179797291755676, -0.009994573891162872, 0.0], [-0.3566412627696991, 0.14755529165267944, 0.0], [-0.3157599866390228, 0.3204740583896637, 0.0], [-0.18271173536777496, 0.4949045479297638, 0.0], [0.0038077121134847403, 0.33126986026763916, 0.0], [0.17680951952934265, 0.4918971359729767, 0.0], [0.31107160449028015, 0.3299383819103241, 0.0], [0.3117161989212036, 0.16720804572105408, 0.0], [0.30759188532829285, -0.015215562656521797, 0.0], [0.3038996458053589, -0.17488166689872742, 0.0], [0.3057783246040344, -0.3162200152873993, 0.0], [0.16057756543159485, -3.175812005996704, 1.0], [0.5471886396408081, 1.3712042570114136, 1.0], [0.000992576009593904, 2.3263189792633057, 0.0], [0.02035842463374138, -1.4791723489761353, 1.0], [0.4685143828392029, -0.4546572268009186, 0.0], [0.3244987726211548, -0.22478653490543365, 0.0], [0.46654146909713745, -0.005145890638232231, 0.0], [0.3077441453933716, 0.15765933692455292, 0.0], [0.1404717117547989, -1.3882054090499878, 0.0], [1.6425964832305908, 1.0934474468231201, 1.0], [0.007661104667931795, 2.4694998264312744, 0.0], [0.05676184594631195, -2.341830015182495, 1.0], [-0.2854599356651306, -0.3517261743545532, 0.0], [-0.2815226912498474, -0.17262034118175507, 0.0], [0.33219170570373535, 0.0005728819523938, 0.0], [-0.37148645520210266, 0.11763577163219452, 0.0], [-0.23555199801921844, 0.2817651927471161, 0.0], [-0.19199280440807343, 0.43320322036743164, 0.0], [-0.03340126574039459, 0.3626980483531952, 0.0], [0.09740664809942245, 0.4368325173854828, 0.0], [0.2045661062002182, 0.40429702401161194, 0.0], [0.2778235673904419, 0.23150192201137543, 0.0], [0.27840977907180786, 0.053233567625284195, 0.0], [0.27573758363723755, -0.12243910878896713, 0.0], [0.27609559893608093, -0.2708965539932251, 0.0], [0.13619866967201233, -3.2929553985595703, 0.0], [0.5537313222885132, 0.11778004467487335, 1.0], [-0.0035814610309898853, 3.4639647006988525, 0.0], [0.13563506305217743, -3.4778456687927246, 1.0], [0.5729254484176636, 0.15639403462409973, 1.0], [0.0012126676738262177, 3.292860269546509, 0.0], [0.13704346120357513, 0.6041512489318848, 1.0], [0.392636775970459, 0.14234623312950134, 0.0], [0.2997204661369324, -0.06380477547645569, 0.0], [0.30783331394195557, -0.23229652643203735, 1.0], [0.11215953528881073, -1.4647655487060547, 0.0], [0.05043959617614746, -0.8145651817321777, 1.0], [0.003078614827245474, 2.892270088195801, 1.0], [0.17313651740550995, -3.433210611343384, 1.0], [2.1410486698150635, 1.6597764492034912, 1.0], [0.004380744881927967, 2.3366284370422363, 0.0], [-0.0029111544135957956, -1.9053219556808472, 1.0], [-0.29136794805526733, -0.35564476251602173, 0.0], [-0.2930161654949188, -0.17606721818447113, 0.0], [-0.45568835735321045, 0.0070769088342785835, 0.0], [-0.3130072355270386, 0.18898355960845947, 0.0], [-0.31669339537620544, 0.3581055998802185, 0.0], [-0.1798115074634552, 0.5280949473381042, 0.0], [0.008485007099807262, 0.34807056188583374, 0.0], [0.17932187020778656, 0.5159927010536194, 0.0], [0.3071535527706146, 0.34134620428085327, 0.0], [0.3091580867767334, 0.1608855426311493, 0.0], [0.299691766500473, -0.025463925674557686, 0.0], [0.30163562297821045, -0.19824862480163574, 0.0], [0.3080662786960602, -0.3413871228694916, 0.0], [0.15742488205432892, -3.28222918510437, 1.0], [0.5588446855545044, 1.432754397392273, 1.0], [0.0012515565613284707, 2.448485851287842, 0.0], [0.01609061099588871, -1.573243498802185, 1.0], [0.47194182872772217, -0.4806450605392456, 0.0], [0.32389840483665466, -0.24138610064983368, 0.0], [0.46272724866867065, -0.003973451443016529, 0.0], [0.31512466073036194, 0.15899401903152466, 0.0], [0.14127947390079498, -1.4089813232421875, 0.0], [1.766038179397583, 1.0982540845870972, 1.0], [0.006457061041146517, 2.550828456878662, 0.0], [0.051842816174030304, -2.362518787384033, 1.0], [-0.29348224401474, -0.3593985140323639, 0.0], [-0.2878134846687317, -0.17649073898792267, 0.0], [-0.44410157203674316, -0.017543645575642586, 0.0], [-0.358943372964859, 0.14419406652450562, 0.0], [-0.30914855003356934, 0.3192724287509918, 0.0]], [[0.7333064675331116, 0.18336045742034912, 1.0], [0.0011573202209547162, 3.5473084449768066, 0.0], [0.07413218170404434, -2.839719533920288, 1.0], [0.4098024368286133, -0.2816407382488251, 0.0], [0.3783082365989685, -0.1347900778055191, 0.0], [0.5206921100616455, 0.0052757286466658115, 0.0], [0.327419638633728, 0.12576206028461456, 0.0], [-0.10028605163097382, -0.21296647191047668, 0.0], [-0.07844420522451401, 0.5077200531959534, 0.0], [-0.04377362132072449, 0.848729133605957, 0.0], [-0.12217118591070175, 0.6763899326324463, 0.0], [-0.10819435864686966, 0.4364814758300781, 0.0], [-0.4676082730293274, 0.25724849104881287, 0.0], [-0.445668488740921, 0.0014389697462320328, 0.0], [-0.33291196823120117, -0.19459664821624756, 0.0], [-0.2543127238750458, -0.3607367277145386, 0.0], [2.015303611755371, -3.5117363929748535, 1.0], [2.1428844928741455, 1.509228229522705, 1.0], [-0.003645624965429306, 2.4658775329589844, 0.0], [0.005955246277153492, -1.9696494340896606, 1.0], [-0.29425013065338135, -0.36606425046920776, 0.0], [-0.29808998107910156, -0.18077431619167328, 0.0], [-0.4736725091934204, 0.004343177191913128, 0.0], [-0.32694628834724426, 0.18281596899032593, 0.0], [-0.32259756326675415, 0.3557164967060089, 0.0], [-0.17448200285434723, 0.5297647714614868, 0.0], [0.011474513448774815, 0.3447096347808838, 0.0], [0.17936111986637115, 0.5175490379333496, 0.0], [0.31329017877578735, 0.3454621136188507, 0.0], [0.31414473056793213, 0.16884052753448486, 0.0], [0.3059517443180084, -0.023238802328705788, 0.0], [0.29896825551986694, -0.1903437376022339, 0.0], [0.3101612627506256, -0.33544906973838806, 0.0], [0.15668578445911407, -3.2750871181488037, 1.0], [0.5772281289100647, 1.4174410104751587, 1.0], [0.001019087852910161, 2.446838140487671, 0.0], [0.015327966772019863, -1.596043586730957, 1.0], [0.47437769174575806, -0.488121896982193, 0.0], [0.3270348310470581, -0.2342219203710556, 0.0], [0.47315365076065063, -0.004943400155752897, 0.0], [0.31508105993270874, 0.16241946816444397, 0.0], [0.14276735484600067, -1.401734709739685, 0.0], [0.5073256492614746, 1.1667890548706055, 1.0], [0.00612792931497097, 2.3900656700134277, 0.0], [0.011140808463096619, -1.6259373426437378, 1.0], [0.50437992811203, -0.4894697368144989, 0.0], [0.337680846452713, -0.209512397646904, 0.0], [0.49020665884017944, -0.004053074400871992, 0.0], [0.3229912519454956, 0.17429901659488678, 0.0], [0.16512629389762878, 0.5248714685440063, 0.0], [0.0011784171219915152, 1.7897138595581055, 0.0], [0.1733013093471527, -3.8065683841705322, 1.0], [2.3339388370513916, 1.5068466663360596, 1.0], [-0.0005346731632016599, 2.527383804321289, 0.0], [0.0006199386552907526, -1.9728376865386963, 1.0], [-0.31313377618789673, -0.36580488085746765, 0.0], [-0.31382694840431213, -0.17818783223628998, 0.0], [-0.49926406145095825, 0.005221514496952295, 0.0], [-0.3382081985473633, 0.1827695071697235, 0.0], [-0.32677406072616577, 0.36574843525886536, 0.0], [-0.1798689067363739, 0.5380719304084778, 0.0], [0.007685759104788303, 0.35203486680984497, 0.0], [0.1824321299791336, 0.5235049724578857, 0.0], [0.32506483793258667, 0.34883156418800354, 0.0], [0.32569608092308044, 0.17242956161499023, 0.0], [0.32043930888175964, -0.016601772978901863, 0.0], [0.30738455057144165, -0.1798497885465622, 0.0], [0.31266582012176514, -0.3275618851184845, 0.0], [0.1621917188167572, -3.309518575668335, 1.0], [0.5833004117012024, 1.4254546165466309, 1.0], [0.0003714764607138932, 2.3884329795837402, 0.0], [0.016682075336575508, -1.5452250242233276, 1.0], [0.4752332866191864, -0.4737412631511688, 0.0], [0.325425922870636, -0.22625428438186646, 0.0], [0.4710176885128021, -0.003867876483127475, 0.0], [0.3110176920890808, 0.1595064103603363, 0.0], [0.14285975694656372, -1.4190990924835205, 0.0], [1.753064751625061, 1.1627616882324219, 1.0], [0.006462705321609974, 2.4807088375091553, 0.0], [0.04924461618065834, -2.322462320327759, 1.0], [-0.2960454225540161, -0.3584102988243103, 0.0], [-0.288948655128479, -0.1780492216348648, 0.0], [0.3537842333316803, 0.0004494073800742626, 0.0], [-0.38585126399993896, 0.11886323988437653, 0.0], [-0.2402908056974411, 0.2819179594516754, 0.0], [-0.20585033297538757, 0.43856990337371826, 0.0], [-0.05305345728993416, 0.3686180114746094, 0.0], [0.08377079665660858, 0.4475937783718109, 0.0], [0.2009216696023941, 0.41750845313072205, 0.0], [0.2827593684196472, 0.24899663031101227, 0.0], [0.2864668667316437, 0.0699203833937645, 0.0], [0.28074270486831665, -0.1110304519534111, 0.0], [0.28340402245521545, -0.26926130056381226, 0.0], [0.13639189302921295, -3.3812143802642822, 1.0], [0.5057259202003479, 1.4371196031570435, 1.0], [0.0003939128655474633, 2.4045863151550293, 0.0], [0.018026597797870636, -1.6047604084014893, 1.0], [0.442342609167099, -0.48984333872795105, 0.0], [0.31182610988616943, -0.23132631182670593, 0.0], [0.4548811912536621, -0.009064256213605404, 0.0], [0.3011722266674042, 0.16400718688964844, 0.0], [0.13752295076847076, -1.4554885625839233, 0.0], [1.722322940826416, 1.154068946838379, 1.0], [0.007407715078443289, 2.5639054775238037, 0.0], [0.04766054451465607, -2.3597896099090576, 1.0], [-0.2917153239250183, -0.36678874492645264, 0.0], [-0.291500449180603, -0.1767127960920334, 0.0], [0.34912607073783875, -0.0018065156182274222, 0.0], [-0.37637457251548767, 0.1217103824019432, 0.0], [-0.24186868965625763, 0.28020238876342773, 0.0], [-0.2026350051164627, 0.4381515383720398, 0.0], [-0.05075916275382042, 0.3688966631889343, 0.0], [0.08529490232467651, 0.4486968517303467, 0.0], [0.20275235176086426, 0.41139349341392517, 0.0], [0.27830466628074646, 0.2445756047964096, 0.0], [0.27746906876564026, 0.06385773420333862, 0.0], [0.2737260162830353, -0.11192214488983154, 0.0], [0.2780144512653351, -0.26730668544769287, 0.0], [0.1338510513305664, -3.398674249649048, 1.0], [0.5748428106307983, 0.16956061124801636, 1.0], [-0.0019701330456882715, 3.4696762561798096, 0.0], [0.14136476814746857, 0.5931945443153381, 1.0], [0.38501501083374023, 0.1350298523902893, 0.0], [0.28236812353134155, -0.07829133421182632, 0.0], [-1.2280287742614746, -2.507875919342041, 1.0], [1.0545592308044434, -0.004001353867352009, 0.0], [0.3149358332157135, -1.4109878540039062, 1.0], [0.6040204763412476, 0.18562351167201996, 1.0], [0.18275251984596252, 0.24311339855194092, 0.0], [0.15682536363601685, -0.16911034286022186, 0.0], [-0.1444093883037567, -0.19432438910007477, 0.0], [-0.1698647290468216, 0.16528473794460297, 0.0], [0.18919619917869568, 1.2650426626205444, 1.0], [0.004126769490540028, 2.517679452896118, 0.0], [0.3442896902561188, -3.8305630683898926, 1.0], [0.6956784725189209, 1.4453190565109253, 1.0], [-0.0023598589468747377, 2.388603448867798, 0.0], [0.016753608360886574, -1.614761233329773, 1.0], [0.5115935206413269, -0.4899125397205353, 0.0], [0.3399662673473358, -0.21507185697555542, 0.0], [0.5037745833396912, -0.0020409594289958477, 0.0], [0.331325501203537, 0.17795471847057343, 0.0], [0.16234199702739716, 0.527403712272644, 0.0], [0.0010011156555265188, 1.800451397895813, 0.0], [0.17763537168502808, -3.8453550338745117, 1.0], [2.3299901485443115, 1.5822455883026123, 1.0], [-0.0013471216661855578, 2.459723472595215, 0.0], [0.0028777325060218573, -1.9741299152374268, 1.0], [-0.3129844665527344, -0.3627477288246155, 0.0], [-0.3159695267677307, -0.1805531531572342, 0.0], [-0.5017475485801697, 0.005989345256239176, 0.0], [-0.34049293398857117, 0.190848708152771, 0.0], [-0.338346391916275, 0.36485520005226135, 0.0], [-0.17679759860038757, 0.5418938398361206, 0.0], [0.010131895542144775, 0.3543228507041931, 0.0], [0.1875084489583969, 0.5280730128288269, 0.0], [0.32288652658462524, 0.3571734130382538, 0.0], [0.32513242959976196, 0.17812711000442505, 0.0], [0.4996030628681183, -0.003055260982364416, 0.0], [0.3273477256298065, -0.1843969225883484, 0.0], [0.32329192757606506, -0.3596460223197937, 0.0], [0.1702529788017273, -3.358227014541626, 1.0], [0.6131182909011841, 1.4602123498916626, 1.0], [2.7862444767379202e-05, 2.462639093399048, 0.0], [0.015928106382489204, -1.5783162117004395, 1.0], [0.48707857728004456, -0.47755151987075806, 0.0], [0.3308047950267792, -0.24069844186306, 0.0], [0.47638630867004395, -0.003488427260890603, 0.0], [0.3227476477622986, 0.16076138615608215, 0.0], [0.14607834815979004, -1.4473236799240112, 0.0], [1.789786458015442, 1.165116548538208, 1.0], [0.00571396155282855, 2.542240858078003, 0.0], [0.04974224045872688, -2.362783908843994, 1.0], [-0.2961697578430176, -0.3633434474468231, 0.0], [-0.2937619090080261, -0.1804342120885849, 0.0], [-0.47978538274765015, -0.011189253069460392, 0.0], [-0.3569805920124054, 0.14887972176074982, 0.0], [-0.318484902381897, 0.3274547755718231, 0.0], [-0.1833038330078125, 0.5116276741027832, 0.0], [0.0042373607866466045, 0.34102940559387207, 0.0], [0.17548123002052307, 0.5084617137908936, 0.0], [0.3184939920902252, 0.3404124081134796, 0.0], [0.31320473551750183, 0.1753617376089096, 0.0], [0.3040451407432556, -0.014317166060209274, 0.0], [0.3091343939304352, -0.17902974784374237, 0.0], [0.30481377243995667, -0.32045724987983704, 0.0], [0.15807141363620758, -3.296354055404663, 1.0], [0.5626416802406311, 1.4309662580490112, 1.0], [0.0011457441141828895, 2.4945878982543945, 0.0], [0.01576039381325245, -1.6206655502319336, 1.0], [0.4809917211532593, -0.4958652853965759, 0.0], [0.331198513507843, -0.2451629489660263, 0.0], [0.476065993309021, -0.0035709317307919264, 0.0], [0.31250548362731934, 0.16630898416042328, 0.0], [0.14335393905639648, -1.4337595701217651, 0.0], [1.73680579662323, 1.1229658126831055, 1.0], [0.006090039853006601, 2.553070545196533, 0.0], [0.05203556269407272, -2.36916446685791, 1.0], [-0.2983962893486023, -0.362933486700058, 0.0], [-0.28964394330978394, -0.17672206461429596, 0.0], [0.3451990783214569, 0.0009966676589101553, 0.0], [-0.38248851895332336, 0.12002719193696976, 0.0], [-0.2403370589017868, 0.28725165128707886, 0.0], [-0.20227192342281342, 0.4437220096588135, 0.0], [-0.04303587228059769, 0.3701010048389435, 0.0], [0.08825759589672089, 0.4541095197200775, 0.0], [0.20158983767032623, 0.41246891021728516, 0.0], [0.2798413932323456, 0.24536381661891937, 0.0], [0.2819165885448456, 0.06511596590280533, 0.0], [0.27518129348754883, -0.11513461917638779, 0.0], [0.2840844690799713, -0.27487412095069885, 0.0], [0.13477903604507446, -3.383577585220337, 1.0], [0.5889703631401062, 0.16805239021778107, 1.0], [-0.001585553283803165, 3.5318403244018555, 0.0], [0.1406349539756775, 0.6048675775527954, 1.0], [0.3792208433151245, 0.14110760390758514, 0.0], [0.286294162273407, -0.0789482519030571, 0.0], [-1.222626805305481, -2.514876127243042, 1.0], [1.0619221925735474, -0.0044877734035253525, 0.0], [0.31669101119041443, -1.4426591396331787, 1.0], [0.62602299451828, 0.18684802949428558, 1.0], [0.18412189185619354, 0.23266880214214325, 0.0], [0.16683001816272736, -0.12187135219573975, 0.0], [-0.14166367053985596, -0.191802978515625, 0.0], [-0.1612814962863922, 0.17529861629009247, 0.0], [0.19951196014881134, 1.262938380241394, 1.0], [0.0035571472253650427, 2.5482470989227295, 0.0], [0.34213894605636597, -3.8350789546966553, 1.0], [2.33427095413208, 1.7390100955963135, 1.0], [-0.003209553426131606, 2.283904790878296, 0.0], [0.008196180686354637, -1.9981660842895508, 1.0], [-0.31681549549102783, -0.3615751266479492, 0.0], [-0.3204582929611206, -0.18113388121128082, 0.0], [-0.5029235482215881, 0.008539900183677673, 0.0]], [[2.24687123298645, 1.5947266817092896, 1.0], [-0.21923236548900604, -0.31424659490585327, 0.0], [-0.41772815585136414, -0.15839633345603943, 0.0], [-0.47588402032852173, -0.005334770772606134, 0.0], [-0.28298360109329224, 0.1751483529806137, 0.0], [-0.2158428132534027, 0.329457551240921, 0.0], [0.08046412467956543, 0.34269142150878906, 0.0], [0.14437735080718994, 0.37260928750038147, 0.0], [0.2030976116657257, 0.4051864445209503, 0.0], [0.26107364892959595, 0.36434444785118103, 0.0], [0.2956908643245697, 0.1993720382452011, 0.0], [0.2919977605342865, 0.02943752519786358, 0.0], [0.28847694396972656, -0.13414666056632996, 0.0], [0.29147180914878845, -0.27853575348854065, 0.0], [0.14835555851459503, -3.2531371116638184, 1.0], [0.5141155123710632, 1.3716182708740234, 1.0], [0.0014140218263491988, 2.2249109745025635, 0.0], [0.020379163324832916, -1.478371262550354, 1.0], [0.4577632546424866, -0.45971083641052246, 0.0], [0.3127334415912628, -0.22404049336910248, 0.0], [0.45873773097991943, -0.008066239766776562, 0.0], [0.3026506304740906, 0.15557406842708588, 0.0], [0.16240432858467102, 0.5033456087112427, 0.0], [-0.0011588349007070065, 1.7133971452713013, 0.0], [0.16777047514915466, -3.6481237411499023, 1.0], [2.2293684482574463, 1.4796478748321533, 1.0], [0.00033738790079951286, 2.4427123069763184, 0.0], [0.0020246426574885845, -1.9291956424713135, 1.0], [-0.2949458658695221, -0.35355934500694275, 0.0], [-0.30963826179504395, -0.17694634199142456, 0.0], [-0.4892295002937317, 0.004093481693416834, 0.0], [-0.32374754548072815, 0.17818911373615265, 0.0], [-0.3342781960964203, 0.35203441977500916, 0.0], [-0.17951564490795135, 0.5257084965705872, 0.0], [0.006876152940094471, 0.34238916635513306, 0.0], [0.18224558234214783, 0.5144286751747131, 0.0], [0.31404709815979004, 0.34670767188072205, 0.0], [0.32436704635620117, 0.17164619266986847, 0.0], [0.30893582105636597, -0.014744526706635952, 0.0], [0.3120172917842865, -0.18163025379180908, 0.0], [0.31175535917282104, -0.32289960980415344, 0.0], [0.159530907869339, -3.251063108444214, 1.0], [0.5728014707565308, 1.3995894193649292, 1.0], [0.0013589732116088271, 2.464832305908203, 0.0], [0.011993327178061008, -1.5572452545166016, 1.0], [0.4722943603992462, -0.4766755700111389, 0.0], [0.33156922459602356, -0.25154218077659607, 0.0], [0.47694143652915955, -0.004777903202921152, 0.0], [0.315374493598938, 0.16104453802108765, 0.0], [0.14333251118659973, -1.4168533086776733, 1.0], [2.104227066040039, 1.427561640739441, 1.0], [0.0001561274257255718, 2.2475075721740723, 0.0], [0.022638002410531044, -1.9936953783035278, 1.0], [-0.2969014346599579, -0.3438800275325775, 0.0], [-0.30089208483695984, -0.17111733555793762, 0.0], [-0.4801669418811798, 0.0010956014739349484, 0.0], [-0.34178856015205383, 0.16386732459068298, 0.0], [-0.33761197328567505, 0.3344777226448059, 0.0], [-0.1784309446811676, 0.5033981204032898, 0.0], [0.007526001892983913, 0.32896262407302856, 0.0], [0.1806524097919464, 0.499361127614975, 0.0], [0.32001492381095886, 0.3343883454799652, 0.0], [0.3159749209880829, 0.16823507845401764, 0.0], [0.3090938329696655, -0.011905412189662457, 0.0], [0.3099217712879181, -0.17207607626914978, 0.0], [0.30925077199935913, -0.3106740415096283, 0.0], [0.16249556839466095, -3.2274410724639893, 1.0], [0.5574479699134827, 1.3934552669525146, 1.0], [0.0004550403682515025, 2.3553876876831055, 0.0], [0.017248006537556648, -1.5354276895523071, 1.0], [0.4745926260948181, -0.46933701634407043, 0.0], [0.32516270875930786, -0.22905734181404114, 0.0], [0.4672277569770813, -0.005041937809437513, 0.0], [0.3129778802394867, 0.15625318884849548, 0.0], [0.14170604944229126, -1.3796100616455078, 0.0], [1.768218755722046, 1.0618523359298706, 1.0], [0.006196924485266209, 2.5368704795837402, 0.0], [0.05512348935008049, -2.3197519779205322, 1.0], [-0.29354849457740784, -0.35638850927352905, 0.0], [-0.29213273525238037, -0.1732167750597, 0.0], [-0.45047250390052795, -0.017599042505025864, 0.0], [-0.3532368540763855, 0.13799256086349487, 0.0], [-0.3122263550758362, 0.3135286867618561, 0.0], [-0.19055302441120148, 0.48767441511154175, 0.0], [-0.0012122036423534155, 0.33961644768714905, 0.0], [0.17275935411453247, 0.4798174202442169, 0.0], [0.307532399892807, 0.32431352138519287, 0.0], [0.31284981966018677, 0.16604678332805634, 0.0], [0.3057466149330139, -0.01091944333165884, 0.0], [0.3092791438102722, -0.17454148828983307, 0.0], [0.31037577986717224, -0.3111152648925781, 0.0], [0.15927016735076904, -3.1811459064483643, 1.0], [0.5540193915367126, 1.3787275552749634, 1.0], [0.001329299178905785, 2.399587631225586, 0.0], [0.016461515799164772, -1.5538640022277832, 1.0], [0.47221648693084717, -0.4739914834499359, 0.0], [0.3262888789176941, -0.23155207931995392, 0.0], [0.4731628894805908, -0.006414467003196478, 0.0], [0.3109220266342163, 0.15798261761665344, 0.0], [0.14142151176929474, -1.3956583738327026, 0.0], [1.7641448974609375, 1.0941898822784424, 1.0], [0.006612112745642662, 2.481722593307495, 0.0], [0.0545383021235466, -2.276418685913086, 1.0], [-0.28894302248954773, -0.3495592772960663, 0.0], [-0.2876557409763336, -0.17471599578857422, 0.0], [-0.4481378495693207, -0.016519278287887573, 0.0], [-0.3537638485431671, 0.1432877480983734, 0.0], [-0.31214407086372375, 0.3195803761482239, 0.0], [-0.18789100646972656, 0.4932985305786133, 0.0], [0.002769093494862318, 0.33639252185821533, 0.0], [0.17346318066120148, 0.4848349392414093, 0.0], [0.3076801896095276, 0.32721248269081116, 0.0], [0.30904051661491394, 0.16630253195762634, 0.0], [0.30390092730522156, -0.014695504680275917, 0.0], [0.30060264468193054, -0.17674563825130463, 0.0], [0.3060433566570282, -0.31355413794517517, 0.0], [0.15806148946285248, -3.1801204681396484, 1.0], [0.5471265316009521, 1.3826407194137573, 1.0], [0.0005769796553067863, 2.3852219581604004, 0.0], [0.015489565208554268, -1.5211478471755981, 1.0], [0.4735136032104492, -0.4680560827255249, 0.0], [0.32463592290878296, -0.23228280246257782, 0.0], [0.467475026845932, -0.0057538412511348724, 0.0], [0.3114900588989258, 0.1599189043045044, 0.0], [0.13976459205150604, -1.3931584358215332, 0.0], [1.7062602043151855, 1.1214483976364136, 1.0], [0.005777375306934118, 2.4114649295806885, 0.0], [0.05834248289465904, -2.284590482711792, 1.0], [-0.2919165790081024, -0.3523457944393158, 0.0], [-0.28547459840774536, -0.17562425136566162, 0.0], [-0.44318684935569763, -0.017286431044340134, 0.0], [-0.34708788990974426, 0.1437702178955078, 0.0], [-0.3097856044769287, 0.3172888457775116, 0.0], [-0.17854557931423187, 0.48963838815689087, 0.0], [0.005172266159206629, 0.33630600571632385, 0.0], [0.17103447020053864, 0.4810565114021301, 0.0], [0.2995467483997345, 0.3191826343536377, 0.0], [0.30203136801719666, 0.1580357849597931, 0.0], [0.3027679920196533, -0.017855782061815262, 0.0], [0.3032943308353424, -0.1816304475069046, 0.0], [0.30286264419555664, -0.3163655400276184, 0.0], [0.1577100306749344, -3.1686692237854004, 1.0], [0.5465559363365173, 1.3765380382537842, 1.0], [0.001074231811799109, 2.4125118255615234, 0.0], [0.01583094522356987, -1.5279000997543335, 1.0], [0.46413737535476685, -0.4701625406742096, 0.0], [0.319844126701355, -0.23637571930885315, 0.0], [0.4633723199367523, -0.00579096470028162, 0.0], [0.311745822429657, 0.1580573171377182, 0.0], [0.13729636371135712, -1.3982152938842773, 0.0], [1.6959834098815918, 1.1171156167984009, 1.0], [0.005993305239826441, 2.495553493499756, 0.0], [0.051308196038007736, -2.315441370010376, 1.0], [-0.2897818982601166, -0.35658231377601624, 0.0], [-0.3026775121688843, -0.202964186668396, 0.0], [0.33822473883628845, 0.00047209582407958806, 0.0], [-0.3785482943058014, 0.1171497106552124, 0.0], [-0.24375778436660767, 0.27886202931404114, 0.0], [-0.20659802854061127, 0.43607839941978455, 0.0], [-0.050011008977890015, 0.3607267141342163, 0.0], [0.08738931268453598, 0.4393351674079895, 0.0], [0.2085009664297104, 0.40652668476104736, 0.0], [0.27851492166519165, 0.23465077579021454, 0.0], [0.27900582551956177, 0.05887870118021965, 0.0], [0.2718706727027893, -0.11671260744333267, 0.0], [0.2760392129421234, -0.26728251576423645, 0.0], [0.13768574595451355, -3.2955212593078613, 1.0], [0.4863335192203522, 1.4114205837249756, 1.0], [-7.083250238792971e-05, 2.425428628921509, 0.0], [0.016287032514810562, -1.5738829374313354, 1.0], [0.4460674524307251, -0.48387324810028076, 0.0], [0.3107057511806488, -0.24447977542877197, 0.0], [0.44693663716316223, -0.008691246621310711, 0.0], [0.29958170652389526, 0.1580802947282791, 0.0], [0.13622629642486572, -1.432782530784607, 0.0], [1.7289106845855713, 1.1187763214111328, 1.0], [0.0068597570061683655, 2.5504097938537598, 0.0], [0.04784737899899483, -2.318629026412964, 1.0], [-0.28955161571502686, -0.35935282707214355, 0.0], [-0.28772613406181335, -0.1781172901391983, 0.0], [0.34272563457489014, -0.0006881512817926705, 0.0], [-0.3809112012386322, 0.12078831344842911, 0.0], [-0.24337615072727203, 0.28363022208213806, 0.0], [-0.20211286842823029, 0.44402581453323364, 0.0], [-0.04685090482234955, 0.3653816878795624, 0.0], [0.09270855784416199, 0.4530295133590698, 0.0], [0.20894990861415863, 0.40718069672584534, 0.0], [0.2766052484512329, 0.23970292508602142, 0.0], [0.27104952931404114, 0.05873313546180725, 0.0], [0.277182400226593, -0.11916925758123398, 0.0], [0.27911174297332764, -0.2746017873287201, 0.0], [0.13577742874622345, -3.3467187881469727, 1.0], [0.5704606175422668, 0.16770987212657928, 1.0], [-0.0025746903847903013, 3.489917755126953, 0.0], [0.14007532596588135, 0.5984652638435364, 1.0], [0.3882560133934021, 0.1388898491859436, 0.0], [0.28514155745506287, -0.0783693715929985, 0.0], [-1.2072099447250366, -2.505213737487793, 1.0], [1.0576841831207275, -0.006470699794590473, 0.0], [0.31500789523124695, -1.4120395183563232, 1.0], [0.5920084118843079, 0.185999795794487, 1.0], [0.18095725774765015, 0.24921604990959167, 0.0], [0.15134499967098236, -0.1656307429075241, 0.0], [-0.14153893291950226, -0.19074879586696625, 0.0], [-0.1660573035478592, 0.1695440411567688, 0.0], [0.20100465416908264, 1.2563236951828003, 1.0], [0.002497904235497117, 2.51874041557312, 0.0], [0.34277263283729553, -3.821387529373169, 1.0], [0.6741588711738586, 1.4262913465499878, 1.0], [-0.003002812620252371, 2.3922207355499268, 0.0], [0.016702871769666672, -1.6544524431228638, 1.0], [0.5120226740837097, -0.5067307949066162, 0.0], [0.3440980017185211, -0.2200402468442917, 0.0], [0.5034688711166382, -0.002547704614698887, 0.0], [0.32228195667266846, 0.17870600521564484, 0.0], [0.16039589047431946, 0.5262370109558105, 0.0], [0.0003815664676949382, 1.7993860244750977, 0.0], [0.1782997101545334, -3.8665592670440674, 1.0], [2.3703410625457764, 1.5669450759887695, 1.0], [-0.00135771743953228, 2.4746930599212646, 0.0], [-0.0015475424006581306, -1.9419976472854614, 1.0], [-0.3146987557411194, -0.36420294642448425, 0.0], [-0.31819748878479004, -0.1787547618150711, 0.0], [-0.5028572678565979, 0.007509141694754362, 0.0], [-0.3395848572254181, 0.1872851550579071, 0.0], [-0.34003594517707825, 0.3678494989871979, 0.0], [-0.17061033844947815, 0.5424370169639587, 0.0], [0.018369503319263458, 0.35489267110824585, 0.0], [0.19177627563476562, 0.5309414267539978, 0.0], [0.32497134804725647, 0.3588228225708008, 0.0], [0.325269877910614, 0.17769567668437958, 0.0], [0.31636691093444824, -0.009593901224434376, 0.0], [0.31399551033973694, -0.17803922295570374, 0.0], [0.3169763684272766, -0.32640546560287476, 0.0]], [[0.7530068755149841, 0.1849764883518219, 1.0], [-0.0007374128908850253, 3.509066104888916, 0.0], [0.06802461296319962, -2.7520511150360107, 1.0], [0.4001674950122833, -0.281556099653244, 0.0], [0.37665054202079773, -0.13625392317771912, 0.0], [0.5241968631744385, 0.003043537260964513, 0.0], [0.3310282528400421, 0.13794144988059998, 0.0], [0.1694086343050003, 0.5018067955970764, 0.0], [0.07837466150522232, 0.380816251039505, 0.0], [-0.04464840143918991, 0.4270287752151489, 0.0], [-0.1586955338716507, 0.3790707290172577, 0.0], [-0.3348069190979004, 0.23829638957977295, 0.0], [-0.3550804853439331, 0.08069834858179092, 0.0], [-0.3756069540977478, -0.09980019181966782, 0.0], [-0.3399445414543152, -0.24328598380088806, 0.0], [2.056647539138794, -3.1271603107452393, 1.0], [1.909361481666565, 1.3369325399398804, 1.0], [-0.004440353251993656, 2.365769147872925, 0.0], [0.021086040884256363, -2.0095958709716797, 1.0], [-0.28394588828086853, -0.34830617904663086, 0.0], [-0.2847273349761963, -0.16963209211826324, 0.0], [-0.4521837532520294, 0.0023084741551429033, 0.0], [-0.3221789300441742, 0.16501645743846893, 0.0], [-0.31735584139823914, 0.33427146077156067, 0.0], [-0.18255309760570526, 0.4945073127746582, 0.0], [0.009019791148602962, 0.335279643535614, 0.0], [0.18207326531410217, 0.48705753684043884, 0.0], [0.30525004863739014, 0.3207327425479889, 0.0], [0.3034086227416992, 0.15620295703411102, 0.0], [0.2985441982746124, -0.025167742744088173, 0.0], [0.29752418398857117, -0.18450000882148743, 0.0], [0.30346623063087463, -0.32086071372032166, 0.0], [0.15830597281455994, -3.1609933376312256, 1.0], [0.5513721108436584, 1.3712158203125, 1.0], [0.0001811221009120345, 2.395256996154785, 0.0], [0.012908968143165112, -1.5286178588867188, 1.0], [0.4667443633079529, -0.4660663604736328, 0.0], [0.3206821382045746, -0.22873526811599731, 0.0], [0.4634544253349304, -0.005548098124563694, 0.0], [0.31532180309295654, 0.1546659916639328, 0.0], [0.13893269002437592, -1.3849505186080933, 0.0], [1.7338287830352783, 1.0900189876556396, 1.0], [0.006256874185055494, 2.469907283782959, 0.0], [0.05600177124142647, -2.2888107299804688, 1.0], [-0.2886747717857361, -0.3519590198993683, 0.0], [-0.28712478280067444, -0.17310494184494019, 0.0], [0.34772470593452454, -0.0001891107822302729, 0.0], [-0.3796740472316742, 0.11269672960042953, 0.0], [-0.2417113184928894, 0.2761692702770233, 0.0], [-0.21101798117160797, 0.42565682530403137, 0.0], [-0.05351835861802101, 0.3536648154258728, 0.0], [0.08220706135034561, 0.43759843707084656, 0.0], [0.200367271900177, 0.39909207820892334, 0.0], [0.27328166365623474, 0.23924139142036438, 0.0], [0.2788635194301605, 0.0640525072813034, 0.0], [0.2738571763038635, -0.1108931303024292, 0.0], [0.2810540497303009, -0.2605884075164795, 0.0], [0.13925178349018097, -3.27362322807312, 1.0], [0.4821535646915436, 1.395093560218811, 1.0], [0.001354101812466979, 2.3777074813842773, 0.0], [0.01797378994524479, -1.5311864614486694, 1.0], [0.44479843974113464, -0.47296175360679626, 0.0], [0.3090205788612366, -0.24021491408348083, 0.0], [0.4398513734340668, -0.006610955111682415, 0.0], [0.2975902259349823, 0.15682844817638397, 0.0], [0.136117622256279, -1.4174156188964844, 0.0], [1.6281869411468506, 1.1253186464309692, 1.0], [0.006353690754622221, 2.4838290214538574, 0.0], [0.05071292817592621, -2.324897289276123, 1.0], [-0.2851239740848541, -0.35753634572029114, 0.0], [-0.29720696806907654, -0.20203977823257446, 0.0], [0.32335707545280457, -0.0005593700334429741, 0.0], [-0.3755550980567932, 0.11566628515720367, 0.0], [-0.2410595417022705, 0.28218531608581543, 0.0], [-0.20196636021137238, 0.44135746359825134, 0.0], [-0.04244164004921913, 0.366636723279953, 0.0], [0.09379599243402481, 0.44506320357322693, 0.0], [0.21090148389339447, 0.4082494080066681, 0.0], [0.278369665145874, 0.23810826241970062, 0.0], [0.276314377784729, 0.05424584075808525, 0.0], [0.27411746978759766, -0.1260746419429779, 0.0], [0.2789382040500641, -0.27582603693008423, 0.0], [0.13441866636276245, -3.336195230484009, 1.0], [0.4951044023036957, 1.416357159614563, 1.0], [0.00045142005546949804, 2.277106523513794, 0.0], [0.018692879006266594, -1.5361745357513428, 1.0], [0.44885727763175964, -0.48011675477027893, 0.0], [0.3067224621772766, -0.22558385133743286, 0.0], [0.44906553626060486, -0.0077592432498931885, 0.0], [0.29256924986839294, 0.1661318987607956, 0.0], [0.15713785588741302, 0.5134219527244568, 0.0], [-0.001383844530209899, 1.7443699836730957, 0.0], [0.1659657508134842, -3.734539747238159, 1.0], [2.2450485229492188, 1.5292772054672241, 1.0], [0.0009784669382497668, 2.419175386428833, 0.0], [0.0013516194885596633, -1.9286208152770996, 1.0], [-0.29962587356567383, -0.36201274394989014, 0.0], [-0.30442893505096436, -0.17881114780902863, 0.0], [-0.48570021986961365, 0.00545585248619318, 0.0], [-0.33139854669570923, 0.18050314486026764, 0.0], [-0.3276824951171875, 0.35668590664863586, 0.0], [-0.1765761375427246, 0.5346883535385132, 0.0], [0.007329537067562342, 0.34549039602279663, 0.0], [0.18027016520500183, 0.5148924589157104, 0.0], [0.322914183139801, 0.34811824560165405, 0.0], [0.31727978587150574, 0.17147165536880493, 0.0], [0.4932621717453003, -0.003904891898855567, 0.0], [0.31670480966567993, -0.18692825734615326, 0.0], [0.32415392994880676, -0.35651180148124695, 0.0], [0.16881056129932404, -3.296588659286499, 1.0], [0.5873624086380005, 1.433893084526062, 1.0], [-0.00017307786038145423, 2.4647939205169678, 0.0], [0.018596787005662918, -1.5788887739181519, 1.0], [0.4876842498779297, -0.48356613516807556, 0.0], [0.328737735748291, -0.2355506271123886, 0.0], [0.47623154520988464, -0.004555942490696907, 0.0], [0.3183738589286804, 0.1617456078529358, 0.0], [0.14363901317119598, -1.4349539279937744, 0.0], [1.7670629024505615, 1.1056405305862427, 1.0], [0.005556219257414341, 2.564500570297241, 0.0], [0.04724336415529251, -2.351903200149536, 1.0], [-0.29192739725112915, -0.36117812991142273, 0.0], [-0.29345253109931946, -0.17611554265022278, 0.0], [-0.4467286467552185, -0.014670244418084621, 0.0], [-0.35212403535842896, 0.14424028992652893, 0.0], [-0.31335920095443726, 0.3250215947628021, 0.0], [-0.18621814250946045, 0.49815550446510315, 0.0], [0.0006398463156074286, 0.3460855484008789, 0.0], [0.16975688934326172, 0.4940754473209381, 0.0], [0.3058675527572632, 0.3343970477581024, 0.0], [0.31358885765075684, 0.16844642162322998, 0.0], [0.31078583002090454, -0.018779272213578224, 0.0], [0.30287137627601624, -0.18126718699932098, 0.0], [0.305142343044281, -0.32230526208877563, 0.0], [0.1585630476474762, -3.2147865295410156, 1.0], [0.551918625831604, 1.3990445137023926, 1.0], [0.0015196031890809536, 2.439493179321289, 0.0], [0.01517258957028389, -1.562838077545166, 1.0], [0.4748772382736206, -0.47882959246635437, 0.0], [0.32618239521980286, -0.24131901562213898, 0.0], [0.4671408534049988, -0.005253732204437256, 0.0], [0.30869877338409424, 0.16086935997009277, 0.0], [0.139288067817688, -1.4137687683105469, 0.0], [1.7468081712722778, 1.1550878286361694, 1.0], [0.006042683497071266, 2.48646879196167, 0.0], [0.050944242626428604, -2.327641725540161, 1.0], [-0.2979983687400818, -0.3616528809070587, 0.0], [-0.28362545371055603, -0.1770610511302948, 0.0], [0.34971144795417786, 0.00014855802874080837, 0.0], [-0.3839057683944702, 0.11879711598157883, 0.0], [-0.2450145184993744, 0.28406187891960144, 0.0], [-0.20617714524269104, 0.4396281838417053, 0.0], [-0.051243457943201065, 0.36546528339385986, 0.0], [0.08380069583654404, 0.4508867859840393, 0.0], [0.20873422920703888, 0.40984952449798584, 0.0], [0.2821393311023712, 0.242544487118721, 0.0], [0.277680367231369, 0.06168375536799431, 0.0], [0.27097710967063904, -0.11266797035932541, 0.0], [0.2804778814315796, -0.2665386199951172, 0.0], [0.13559949398040771, -3.3524928092956543, 1.0], [0.573201596736908, 0.16712328791618347, 1.0], [-0.003181612119078636, 3.564645290374756, 0.0], [0.1439344882965088, 0.6111975312232971, 1.0], [0.3803656995296478, 0.13048012554645538, 0.0], [0.291837215423584, -0.08136149495840073, 0.0], [-1.2196571826934814, -2.5406885147094727, 1.0], [1.0537407398223877, -0.004950169939547777, 0.0], [0.314509779214859, -1.4187886714935303, 1.0], [0.6217124462127686, 0.18672028183937073, 1.0], [0.18164920806884766, 0.24885419011116028, 0.0], [0.15336371958255768, -0.16639843583106995, 0.0], [-0.1396237015724182, -0.19232065975666046, 0.0], [-0.16833724081516266, 0.16936764121055603, 0.0], [0.19287154078483582, 1.2596111297607422, 1.0], [0.004566240590065718, 2.5155017375946045, 0.0], [0.3467229902744293, -3.840813398361206, 1.0], [0.6796279549598694, 1.4524085521697998, 1.0], [-0.0030001401901245117, 2.3833727836608887, 0.0], [0.017373181879520416, -1.6539278030395508, 1.0], [0.5140079259872437, -0.504430890083313, 0.0], [0.34421756863594055, -0.21554851531982422, 0.0], [0.5026494860649109, -0.002414101967588067, 0.0], [0.32855504751205444, 0.17986208200454712, 0.0], [0.16353991627693176, 0.5216180682182312, 0.0], [0.0008298021275550127, 1.8046932220458984, 0.0], [0.1756817251443863, -3.8579139709472656, 1.0], [2.370419979095459, 1.5665271282196045, 1.0], [-0.0006027055787853897, 2.5321741104125977, 0.0], [-0.0029306274373084307, -1.94520902633667, 1.0], [-0.313195139169693, -0.3659629225730896, 0.0], [-0.3205360174179077, -0.1834927350282669, 0.0], [-0.5025426149368286, 0.004669166635721922, 0.0], [-0.34155169129371643, 0.190919429063797, 0.0], [-0.33511489629745483, 0.3666858673095703, 0.0], [-0.18070341646671295, 0.5422559976577759, 0.0], [0.004667201545089483, 0.35469621419906616, 0.0], [0.18122424185276031, 0.529366672039032, 0.0], [0.32395538687705994, 0.3579982817173004, 0.0], [0.3259445130825043, 0.18050190806388855, 0.0], [0.32028132677078247, -0.009736641310155392, 0.0], [0.31665316224098206, -0.17668308317661285, 0.0], [0.31775036454200745, -0.3264910578727722, 0.0], [0.16219940781593323, -3.361180543899536, 1.0], [0.5793236494064331, 1.454380989074707, 1.0], [0.0009547664667479694, 2.48750638961792, 0.0], [0.017857864499092102, -1.5944492816925049, 1.0], [0.4805091619491577, -0.48595112562179565, 0.0], [0.3325868546962738, -0.24148499965667725, 0.0], [0.47897639870643616, -0.003653112333267927, 0.0], [0.3231212794780731, 0.16508418321609497, 0.0], [0.1446104496717453, -1.4519016742706299, 0.0], [1.7575151920318604, 1.1341285705566406, 1.0], [0.0058711227029562, 2.584571123123169, 0.0], [0.05175018683075905, -2.399951696395874, 1.0], [-0.2964649796485901, -0.3624713718891144, 0.0], [-0.2887287139892578, -0.17957335710525513, 0.0], [0.3517409563064575, 0.0020334746222943068, 0.0], [-0.3859066963195801, 0.11854512244462967, 0.0], [-0.24573805928230286, 0.2835927903652191, 0.0], [-0.20570264756679535, 0.444345086812973, 0.0], [-0.05622318014502525, 0.3659869432449341, 0.0], [0.07849907130002975, 0.4551706612110138, 0.0], [0.19742342829704285, 0.4178552031517029, 0.0], [0.28126296401023865, 0.24979107081890106, 0.0], [0.28066787123680115, 0.07310792803764343, 0.0], [0.2732371389865875, -0.10911757498979568, 0.0], [0.2778562903404236, -0.266300767660141, 0.0], [0.29282045364379883, -0.3547096848487854, 1.0], [0.14249441027641296, -2.8074774742126465, 1.0]], [[0.7490000128746033, 0.18322919309139252, 1.0], [-0.0005933340871706605, 3.5278375148773193, 0.0], [0.07659310847520828, -2.891230821609497, 1.0], [0.4113032817840576, -0.2759658694267273, 0.0], [0.38374000787734985, -0.13170665502548218, 0.0], [0.5290747284889221, 0.002533156191930175, 0.0], [-0.09741707891225815, -0.20879881083965302, 0.0], [-0.22805702686309814, 0.09235969930887222, 0.0], [-0.18286019563674927, 0.2551107704639435, 0.0], [0.054631464183330536, 1.0486387014389038, 0.0], [0.15384094417095184, 0.6820188760757446, 0.0], [-0.0883467048406601, 0.5863008499145508, 0.0], [-0.3846317529678345, 0.30193570256233215, 0.0], [-0.522212028503418, -0.07896019518375397, 0.0], [-0.3410976827144623, -0.21592594683170319, 0.0], [-0.23536185920238495, -0.37354692816734314, 0.0], [1.830021619796753, -3.6250553131103516, 1.0], [0.6096985936164856, 0.1828344613313675, 1.0], [-0.005927274003624916, 3.559781312942505, 0.0], [0.1428193300962448, 0.5788442492485046, 1.0], [0.40064486861228943, 0.12364673614501953, 0.0], [0.30698728561401367, -0.07772468775510788, 0.0], [-1.280852198600769, -2.5098352432250977, 1.0], [1.123934030532837, -0.007983620278537273, 0.0], [0.3325211703777313, -1.4351379871368408, 1.0], [0.6364156007766724, 0.19027501344680786, 1.0], [-0.0022069206461310387, 3.5234572887420654, 0.0], [0.144748717546463, 0.5740547180175781, 1.0], [0.41307714581489563, 0.11965199559926987, 0.0], [0.30142009258270264, -0.07416659593582153, 0.0], [-1.2874271869659424, -2.4950358867645264, 1.0], [1.137696385383606, -0.00595828564837575, 0.0], [0.34012261033058167, -1.4370038509368896, 1.0], [0.6204019784927368, 0.18988032639026642, 1.0], [-0.0027131352107971907, 3.5164167881011963, 0.0], [0.1478186994791031, 0.5723102688789368, 1.0], [0.40705081820487976, 0.12472059577703476, 0.0], [0.30442267656326294, -0.06527750194072723, 0.0], [-1.3003039360046387, -2.517571449279785, 1.0], [1.1358250379562378, -0.005277976393699646, 0.0], [0.33781683444976807, -1.4540704488754272, 1.0], [0.6601080298423767, 0.19199900329113007, 1.0], [-0.0032771960832178593, 3.531046152114868, 0.0], [0.018205083906650543, -1.6962265968322754, 1.0], [0.48276421427726746, -0.5075870752334595, 0.0], [0.33385878801345825, -0.1948627382516861, 0.0], [0.4987356662750244, -0.004390896763652563, 0.0], [0.3240540325641632, 0.18654850125312805, 0.0], [0.1674642711877823, 0.5352640748023987, 0.0], [0.0022702435962855816, 1.8003573417663574, 0.0], [0.1761210560798645, -3.905410051345825, 1.0], [2.313425302505493, 1.5696758031845093, 1.0], [-0.0006134563591331244, 2.5132992267608643, 0.0], [0.0006845301249995828, -1.9887022972106934, 1.0], [-0.306100070476532, -0.3672916889190674, 0.0], [-0.3137834072113037, -0.185024231672287, 0.0], [-0.4936184287071228, 0.006086823530495167, 0.0], [-0.3397994935512543, 0.18698328733444214, 0.0], [-0.33338335156440735, 0.36206573247909546, 0.0], [-0.1822902262210846, 0.5426636934280396, 0.0], [0.003895289497449994, 0.35772064328193665, 0.0], [0.17809656262397766, 0.5295606255531311, 0.0], [0.31873735785484314, 0.35666701197624207, 0.0], [0.32102063298225403, 0.1820279359817505, 0.0], [0.3175801634788513, -0.007757528685033321, 0.0], [0.31000399589538574, -0.17455506324768066, 0.0], [0.312126487493515, -0.3245801031589508, 0.0], [0.16120602190494537, -3.382413625717163, 1.0], [0.5804376602172852, 1.4583746194839478, 1.0], [0.0013012430863454938, 2.4162087440490723, 0.0], [0.01779489405453205, -1.549878478050232, 1.0], [0.46846428513526917, -0.4759533703327179, 0.0], [0.32967299222946167, -0.23592470586299896, 0.0], [0.4733976423740387, -0.004218309186398983, 0.0], [0.5551317930221558, -0.007866187952458858, 0.0], [0.17833246290683746, -1.4299391508102417, 0.0], [1.863068699836731, 1.1552996635437012, 1.0], [0.003589639440178871, 2.607416868209839, 0.0], [0.04597785323858261, -2.3241169452667236, 1.0], [-0.301224946975708, -0.36438730359077454, 0.0], [-0.30034711956977844, -0.18164341151714325, 0.0], [-0.4947725534439087, -0.009765003807842731, 0.0], [-0.3597227931022644, 0.15354090929031372, 0.0], [-0.32917019724845886, 0.33674129843711853, 0.0], [-0.1885913908481598, 0.5170783996582031, 0.0], [-0.003225143766030669, 0.3469643294811249, 0.0], [0.17295095324516296, 0.5080696940422058, 0.0], [0.31417134404182434, 0.34831953048706055, 0.0], [0.32017338275909424, 0.18069066107273102, 0.0], [0.3143444359302521, -0.00578412925824523, 0.0], [0.30861812829971313, -0.17256596684455872, 0.0], [0.3090896010398865, -0.31731000542640686, 0.0], [0.15968380868434906, -3.324190139770508, 1.0], [0.5618383288383484, 1.433005928993225, 1.0], [0.0020003472454845905, 2.4831438064575195, 0.0], [0.017141347751021385, -1.6124207973480225, 1.0], [0.48001953959465027, -0.49219363927841187, 0.0], [0.3296486437320709, -0.24581943452358246, 0.0], [0.4725305438041687, -0.004631800577044487, 0.0], [0.3116334080696106, 0.16396161913871765, 0.0], [0.14259928464889526, -1.4228613376617432, 0.0], [1.7740085124969482, 1.1102262735366821, 1.0], [0.0060901939868927, 2.5663187503814697, 0.0], [0.05064832791686058, -2.352916717529297, 1.0], [-0.294830322265625, -0.362322598695755, 0.0], [-0.29170382022857666, -0.1778976321220398, 0.0], [-0.47759389877319336, -0.012886133044958115, 0.0], [-0.3561289608478546, 0.1479313224554062, 0.0], [-0.31785398721694946, 0.33358052372932434, 0.0], [-0.18296542763710022, 0.5068835020065308, 0.0], [0.005776002537459135, 0.3512267768383026, 0.0], [0.17322196066379547, 0.49815356731414795, 0.0], [0.311057984828949, 0.3333718180656433, 0.0], [0.3096063435077667, 0.17112337052822113, 0.0], [0.30635130405426025, -0.01346531044691801, 0.0], [0.30056387186050415, -0.18080472946166992, 0.0], [0.3056396245956421, -0.3233489692211151, 0.0], [0.1586625576019287, -3.283447265625, 1.0], [0.5682271122932434, 1.4236754179000854, 1.0], [0.0011752843856811523, 2.4763762950897217, 0.0], [0.015130721032619476, -1.6041179895401, 1.0], [0.47063255310058594, -0.48965245485305786, 0.0], [0.32762661576271057, -0.24111779034137726, 0.0], [0.4632384777069092, -0.00300764967687428, 0.0], [0.3128491938114166, 0.16199225187301636, 0.0], [0.1428365856409073, -1.436690092086792, 0.0], [0.5220168232917786, 1.177367091178894, 1.0], [0.006489660125225782, 2.4029393196105957, 0.0], [0.011866028420627117, -1.6368494033813477, 1.0], [0.5003409385681152, -0.49518880248069763, 0.0], [0.3364254832267761, -0.20866654813289642, 0.0], [0.48845523595809937, -0.0031207636930048466, 0.0], [0.32477104663848877, 0.17611263692378998, 0.0], [0.16728869080543518, 0.5259587168693542, 0.0], [0.0005735308513976634, 1.7896405458450317, 0.0], [0.17329932749271393, -3.834578514099121, 1.0], [2.3836278915405273, 1.5400941371917725, 1.0], [-3.961748006986454e-06, 2.5042030811309814, 0.0], [0.0005065119476057589, -1.9489495754241943, 1.0], [-0.3076968193054199, -0.36389967799186707, 0.0], [-0.3186764419078827, -0.18156802654266357, 0.0], [-0.5044527053833008, 0.004447333049029112, 0.0], [-0.3335321247577667, 0.18626491725444794, 0.0], [-0.3558877408504486, 0.36429792642593384, 0.0], [-0.1712285429239273, 0.5416610836982727, 0.0], [0.010245650075376034, 0.35288918018341064, 0.0], [0.18722981214523315, 0.5310513377189636, 0.0], [0.3232007622718811, 0.35663414001464844, 0.0], [0.32554134726524353, 0.1779935210943222, 0.0], [0.3143824338912964, -0.004769842606037855, 0.0], [0.3136054277420044, -0.17390817403793335, 0.0], [0.3223048150539398, -0.3224152624607086, 0.0], [0.16150414943695068, -3.328932285308838, 1.0], [0.5830547213554382, 1.430366039276123, 1.0], [0.0013829879462718964, 2.417992115020752, 0.0], [0.019775329157710075, -1.6043936014175415, 1.0], [0.47189778089523315, -0.48606187105178833, 0.0], [0.33459341526031494, -0.2315649390220642, 0.0], [0.4818230867385864, -0.004819205496460199, 0.0], [0.31589454412460327, 0.16710466146469116, 0.0], [0.16109295189380646, 0.5225306153297424, 0.0], [4.138526855967939e-05, 1.8105906248092651, 0.0], [0.1721624732017517, -3.833808422088623, 1.0], [2.315875291824341, 1.5646342039108276, 1.0], [-0.0009042649762704968, 2.5088951587677, 0.0], [0.00092749681789428, -1.9868923425674438, 1.0], [-0.30784082412719727, -0.36711615324020386, 0.0], [-0.31246721744537354, -0.18225187063217163, 0.0], [-0.4939895272254944, 0.006329466588795185, 0.0], [-0.33230912685394287, 0.18778803944587708, 0.0], [-0.3349187970161438, 0.36290764808654785, 0.0], [-0.18057884275913239, 0.5398945212364197, 0.0], [0.0020000371150672436, 0.35610267519950867, 0.0], [0.17533361911773682, 0.5268479585647583, 0.0], [0.32362622022628784, 0.35683754086494446, 0.0], [0.32339900732040405, 0.17806847393512726, 0.0], [0.31613901257514954, -0.00995698943734169, 0.0], [0.3088838458061218, -0.1798873096704483, 0.0], [0.31650710105895996, -0.32805606722831726, 0.0], [0.16055549681186676, -3.3596878051757812, 1.0], [0.5627461075782776, 1.4483174085617065, 1.0], [0.0004286777402739972, 2.4862303733825684, 0.0], [0.015361960045993328, -1.600404143333435, 1.0], [0.48547282814979553, -0.4898732602596283, 0.0], [0.32847580313682556, -0.24315106868743896, 0.0], [0.4724145233631134, -0.003172575030475855, 0.0], [0.3153269290924072, 0.1642351895570755, 0.0], [0.1422816812992096, -1.444772481918335, 0.0], [1.796246886253357, 1.1789988279342651, 1.0], [0.0051945471204817295, 2.5090224742889404, 0.0], [0.04931960999965668, -2.3455820083618164, 1.0], [-0.29768484830856323, -0.36367112398147583, 0.0], [-0.31234896183013916, -0.20550604164600372, 0.0], [-0.45877817273139954, -0.02962195873260498, 0.0], [-0.3639755845069885, 0.13731136918067932, 0.0], [-0.3237708806991577, 0.3182815611362457, 0.0], [-0.19457875192165375, 0.5017346739768982, 0.0], [-0.009573140181601048, 0.3480514585971832, 0.0], [0.16080178320407867, 0.49719762802124023, 0.0], [0.30890339612960815, 0.3408938944339752, 0.0], [0.31132882833480835, 0.1824580729007721, 0.0], [0.30913791060447693, -0.002610695781186223, 0.0], [0.30520132184028625, -0.16637608408927917, 0.0], [0.30959194898605347, -0.30933287739753723, 0.0], [0.1589105725288391, -3.29172682762146, 1.0], [0.5634764432907104, 1.4258499145507812, 1.0], [0.0012885606847703457, 2.4501960277557373, 0.0], [0.015355831943452358, -1.5881221294403076, 1.0], [0.476997047662735, -0.48710745573043823, 0.0], [0.32616573572158813, -0.24781456589698792, 0.0], [0.4689609110355377, -0.004450771491974592, 0.0], [0.3184715509414673, 0.16255439817905426, 0.0], [0.14349421858787537, -1.4174367189407349, 0.0], [1.7634754180908203, 1.112894058227539, 1.0], [0.00599424634128809, 2.5170164108276367, 0.0], [0.05104948952794075, -2.347712278366089, 1.0], [-0.2962268590927124, -0.3580826222896576, 0.0], [-0.2877987325191498, -0.17645695805549622, 0.0], [0.34699708223342896, 0.0008368862327188253, 0.0], [-0.3809431493282318, 0.12021736055612564, 0.0], [-0.24220283329486847, 0.2867509424686432, 0.0], [-0.20023132860660553, 0.43778684735298157, 0.0], [-0.05059153214097023, 0.36779019236564636, 0.0], [0.0815391018986702, 0.4472602903842926, 0.0], [0.2021639198064804, 0.41762420535087585, 0.0], [0.27907824516296387, 0.24988777935504913, 0.0], [0.2817284166812897, 0.07417640835046768, 0.0], [0.2811357378959656, -0.10876347124576569, 0.0], [0.2760315239429474, -0.2624680995941162, 0.0], [0.1379099190235138, -3.411578416824341, 1.0], [0.5923028588294983, 0.16942812502384186, 1.0], [-0.004172246903181076, 3.5286362171173096, 0.0], [0.14439581334590912, 0.6051140427589417, 1.0], [0.38363978266716003, 0.13627295196056366, 0.0]], [[0.7569606900215149, 0.1841300129890442, 1.0], [-0.0008920034160837531, 3.4811408519744873, 0.0], [0.017268547788262367, -1.7670172452926636, 1.0], [0.5234295725822449, -0.545500636100769, 0.0], [0.3519774079322815, -0.21227166056632996, 0.0], [0.515659749507904, 0.0016180864768102765, 0.0], [0.3362662196159363, 0.18263238668441772, 0.0], [0.17538507282733917, 0.5225927829742432, 0.0], [0.07804380357265472, 0.39632168412208557, 0.0], [-0.05779190734028816, 0.4575637876987457, 0.0], [-0.1823224127292633, 0.3975597023963928, 0.0], [-0.32160961627960205, 0.25912290811538696, 0.0], [-0.3377313017845154, 0.08624124526977539, 0.0], [-0.4057510197162628, -0.09343641251325607, 0.0], [-0.33356326818466187, -0.25473645329475403, 0.0], [2.0554182529449463, -3.2203450202941895, 1.0], [1.961424708366394, 1.3873652219772339, 1.0], [-0.003043391276150942, 2.342677354812622, 0.0], [0.013865316286683083, -1.9606000185012817, 1.0], [-0.2893795073032379, -0.3484949767589569, 0.0], [-0.2832442820072174, -0.1687479168176651, 0.0], [-0.4505981206893921, 0.004507211968302727, 0.0], [-0.323178768157959, 0.17076268792152405, 0.0], [-0.32403555512428284, 0.33617207407951355, 0.0], [-0.1837034672498703, 0.5012794137001038, 0.0], [0.006338666658848524, 0.3302312195301056, 0.0], [0.1805408000946045, 0.4907104969024658, 0.0], [0.3065056800842285, 0.3250964283943176, 0.0], [0.3044026494026184, 0.15694548189640045, 0.0], [0.30926209688186646, -0.023898445069789886, 0.0], [0.3032146394252777, -0.18492534756660461, 0.0], [0.3050574064254761, -0.32457077503204346, 0.0], [0.15838481485843658, -3.1725029945373535, 1.0], [0.5462273955345154, 1.378543734550476, 1.0], [0.0015048832865431905, 2.4495596885681152, 0.0], [0.012424535118043423, -1.5561039447784424, 1.0], [0.4672175645828247, -0.4791989028453827, 0.0], [0.3241296708583832, -0.23123036324977875, 0.0], [0.4606078863143921, -0.005816585384309292, 0.0], [0.31123608350753784, 0.15664592385292053, 0.0], [0.14052492380142212, -1.393021583557129, 0.0], [1.698164701461792, 1.0900465250015259, 1.0], [0.007291529327630997, 2.4764885902404785, 0.0], [0.05504072085022926, -2.3055756092071533, 1.0], [-0.28706711530685425, -0.35336360335350037, 0.0], [-0.2841266095638275, -0.17746199667453766, 0.0], [0.3490449786186218, 7.829278183635324e-05, 0.0], [-0.38105615973472595, 0.1168191134929657, 0.0], [-0.24771326780319214, 0.27766910195350647, 0.0], [-0.19640043377876282, 0.4362053871154785, 0.0], [-0.04317237064242363, 0.35435864329338074, 0.0], [0.09135852754116058, 0.4396026134490967, 0.0], [0.2089252918958664, 0.3984997272491455, 0.0], [0.28159299492836, 0.2337597757577896, 0.0], [0.27758899331092834, 0.06009157374501228, 0.0], [0.28006768226623535, -0.11762801557779312, 0.0], [0.2847682535648346, -0.26891574263572693, 0.0], [0.13848088681697845, -3.297684669494629, 1.0], [0.5811068415641785, 0.1649947315454483, 1.0], [-0.002425546757876873, 3.51163649559021, 0.0], [0.13702525198459625, -3.493269920349121, 1.0], [0.5584477186203003, 0.15806186199188232, 1.0], [0.0018829816253855824, 3.3211557865142822, 0.0], [0.1383516639471054, 0.5985851883888245, 1.0], [0.3939463794231415, 0.14114247262477875, 0.0], [0.29734718799591064, -0.055517472326755524, 0.0], [-1.241701602935791, -2.44499135017395, 1.0], [1.0793893337249756, -0.006464356556534767, 0.0], [0.3245186507701874, -1.3849148750305176, 1.0], [0.5936831831932068, 0.18371374905109406, 1.0], [0.1805189847946167, 0.238030806183815, 0.0], [0.1520005166530609, -0.1669575273990631, 0.0], [-0.1450125128030777, -0.1886892318725586, 0.0], [-0.16155247390270233, 0.1716722697019577, 0.0], [0.19602370262145996, 1.2441574335098267, 1.0], [0.0031076990999281406, 2.458523988723755, 0.0], [0.3530944883823395, -3.7357053756713867, 1.0], [0.6742054224014282, 1.4049028158187866, 1.0], [-0.0009947468061000109, 2.3244032859802246, 0.0], [0.016794880852103233, -1.6344507932662964, 1.0], [0.5053848028182983, -0.4930955469608307, 0.0], [0.3404425382614136, -0.21037650108337402, 0.0], [0.500213623046875, -0.0031163720414042473, 0.0], [0.3292115330696106, 0.17681391537189484, 0.0], [0.16734129190444946, 0.5139278173446655, 0.0], [0.0004011269484180957, 1.7644745111465454, 0.0], [0.1780451536178589, -3.781736373901367, 1.0], [2.3561136722564697, 1.5277155637741089, 1.0], [-0.0005303742364048958, 2.4664642810821533, 0.0], [0.002767527010291815, -1.9521687030792236, 1.0], [-0.3136292099952698, -0.36140263080596924, 0.0], [-0.313144326210022, -0.17784269154071808, 0.0], [-0.5019945502281189, 0.006864697206765413, 0.0], [-0.33794739842414856, 0.1853494495153427, 0.0], [-0.33691373467445374, 0.36157113313674927, 0.0], [-0.18226824700832367, 0.535707414150238, 0.0], [-3.2232419471256435e-05, 0.34910035133361816, 0.0], [0.1837664097547531, 0.5295527577400208, 0.0], [0.3239344656467438, 0.3589872121810913, 0.0], [0.32759347558021545, 0.18178142607212067, 0.0], [0.31332090497016907, -0.005035818554461002, 0.0], [0.3131999671459198, -0.17178970575332642, 0.0], [0.315605491399765, -0.3208257555961609, 0.0], [0.16281083226203918, -3.338479995727539, 1.0], [0.5856074690818787, 1.4338082075119019, 1.0], [0.0003597790782805532, 2.3982625007629395, 0.0], [0.017674699425697327, -1.5617612600326538, 1.0], [0.4880543649196625, -0.4763864576816559, 0.0], [0.3296692967414856, -0.22898663580417633, 0.0], [0.47508934140205383, -0.00392762478441, 0.0], [0.31386467814445496, 0.16385075449943542, 0.0], [0.14383113384246826, -1.4315290451049805, 0.0], [1.8040595054626465, 1.1009560823440552, 1.0], [0.006658222060650587, 2.5630433559417725, 0.0], [0.05106620863080025, -2.3205208778381348, 1.0], [-0.296593576669693, -0.3598136305809021, 0.0], [-0.2945893108844757, -0.17927443981170654, 0.0], [-0.4825280010700226, -0.012617146596312523, 0.0], [-0.353412002325058, 0.14752835035324097, 0.0], [-0.31823527812957764, 0.32333263754844666, 0.0], [-0.184104785323143, 0.5034189820289612, 0.0], [0.003101135604083538, 0.3488977253437042, 0.0], [0.1742020547389984, 0.49547451734542847, 0.0], [0.3143462538719177, 0.3340449929237366, 0.0], [0.3140568435192108, 0.17215119302272797, 0.0], [0.3072642385959625, -0.009348158724606037, 0.0], [0.3008929491043091, -0.17462606728076935, 0.0], [0.30666807293891907, -0.31695985794067383, 0.0], [0.158771350979805, -3.266432285308838, 1.0], [0.5722100138664246, 1.4146158695220947, 1.0], [0.0008944397559389472, 2.379812002182007, 0.0], [0.01581667736172676, -1.542283296585083, 1.0], [0.4760584831237793, -0.46873217821121216, 0.0], [0.3306094706058502, -0.23525230586528778, 0.0], [0.47657307982444763, -0.005101609975099564, 0.0], [0.3111291527748108, 0.15905478596687317, 0.0], [0.14158344268798828, -1.4178049564361572, 0.0], [1.7767083644866943, 1.0947872400283813, 1.0], [0.0064842961728572845, 2.57167649269104, 0.0], [0.052442651242017746, -2.345811128616333, 1.0], [-0.29768964648246765, -0.35848525166511536, 0.0], [-0.2916441261768341, -0.1752231866121292, 0.0], [0.3469071090221405, 0.0017429243307560682, 0.0], [-0.3840857446193695, 0.11976535618305206, 0.0], [-0.2452000081539154, 0.28028666973114014, 0.0], [-0.20338080823421478, 0.4384784400463104, 0.0], [-0.04996013268828392, 0.36901959776878357, 0.0], [0.08693709224462509, 0.4453364610671997, 0.0], [0.20693926513195038, 0.4127250909805298, 0.0], [0.2841021716594696, 0.24692626297473907, 0.0], [0.2758585810661316, 0.06665009260177612, 0.0], [0.2825715243816376, -0.11152557283639908, 0.0], [0.2779090106487274, -0.26561108231544495, 0.0], [0.13886615633964539, -3.3684146404266357, 1.0], [0.5523627996444702, 0.16864843666553497, 1.0], [-0.002398574724793434, 3.479613780975342, 0.0], [0.13904815912246704, 0.5898558497428894, 1.0], [0.38274264335632324, 0.13190962374210358, 0.0], [0.29111936688423157, -0.08430255949497223, 0.0], [-1.2148009538650513, -2.5087215900421143, 1.0], [1.0617173910140991, -0.0038886957336217165, 0.0], [0.31212663650512695, -1.420710802078247, 1.0], [0.6290152072906494, 0.1866147816181183, 1.0], [0.18357262015342712, 0.24153932929039001, 0.0], [0.1683342307806015, -0.11994409561157227, 0.0], [-0.14119449257850647, -0.1929171234369278, 0.0], [-0.1627199351787567, 0.17024147510528564, 0.0], [0.19265727698802948, 1.2671440839767456, 1.0], [0.003219855483621359, 2.4971115589141846, 0.0], [0.34267082810401917, -3.84790301322937, 1.0], [0.6792299151420593, 1.4309120178222656, 1.0], [-0.0016258649993687868, 2.396718978881836, 0.0], [0.017462564632296562, -1.6515302658081055, 1.0], [0.502144455909729, -0.5027955174446106, 0.0], [0.33863961696624756, -0.2168489396572113, 0.0], [0.5029711723327637, -0.0032759609166532755, 0.0], [0.3253060281276703, 0.17989963293075562, 0.0], [0.16134317219257355, 0.5236369371414185, 0.0], [-0.00023164358572103083, 1.7944749593734741, 0.0], [0.1738143116235733, -3.845428705215454, 1.0], [2.2539329528808594, 1.5517337322235107, 1.0], [-0.0006400691927410662, 2.508620262145996, 0.0], [0.0039841365069150925, -1.978776454925537, 1.0], [-0.30573347210884094, -0.36708468198776245, 0.0], [-0.30843913555145264, -0.1809716522693634, 0.0], [-0.4885830283164978, 0.005141594912856817, 0.0], [-0.3313211500644684, 0.18609416484832764, 0.0], [-0.33406320214271545, 0.3646623492240906, 0.0], [-0.17623618245124817, 0.5422607660293579, 0.0], [0.012369888834655285, 0.35419005155563354, 0.0], [0.180685892701149, 0.5283298492431641, 0.0], [0.31802675127983093, 0.3563005328178406, 0.0], [0.31931495666503906, 0.17794503271579742, 0.0], [0.31071987748146057, -0.012163822539150715, 0.0], [0.31357961893081665, -0.182063028216362, 0.0], [0.3112957179546356, -0.33249902725219727, 0.0], [0.16002394258975983, -3.344175100326538, 1.0], [0.5912927985191345, 1.455950140953064, 1.0], [-9.51073961914517e-05, 2.497847557067871, 0.0], [0.014680170454084873, -1.6291851997375488, 1.0], [0.4737231731414795, -0.49530625343322754, 0.0], [0.32591116428375244, -0.2375834882259369, 0.0], [0.46579596400260925, -0.004143907688558102, 0.0], [0.5485213994979858, -0.00833873637020588, 0.0], [0.17567183077335358, -1.4176996946334839, 1.0], [2.1289143562316895, 1.4761238098144531, 1.0], [-0.0026124930009245872, 2.289658784866333, 0.0], [0.02178465574979782, -2.0110063552856445, 1.0], [-0.30386343598365784, -0.3499114215373993, 0.0], [-0.3081876039505005, -0.1740611344575882, 0.0], [-0.49286267161369324, 0.0011705737560987473, 0.0], [-0.34878018498420715, 0.16674591600894928, 0.0], [-0.33909013867378235, 0.3394545316696167, 0.0], [-0.18634958565235138, 0.5086207985877991, 0.0], [0.0012250184081494808, 0.34330740571022034, 0.0], [0.17656219005584717, 0.5049790143966675, 0.0], [0.3255236744880676, 0.3445870876312256, 0.0], [0.327314555644989, 0.17717283964157104, 0.0], [0.32380762696266174, -0.00697414530441165, 0.0], [0.317273885011673, -0.16995173692703247, 0.0], [0.3209479749202728, -0.31520649790763855, 0.0], [0.16463889181613922, -3.276320457458496, 1.0], [0.5823041200637817, 1.4127986431121826, 1.0], [0.0011817757040262222, 2.435023546218872, 0.0], [0.012703575193881989, -1.564858317375183, 1.0], [0.4827849566936493, -0.4743843972682953, 0.0], [0.3347231149673462, -0.23772411048412323, 0.0], [0.48007717728614807, -0.0034868293441832066, 0.0], [0.30963948369026184, 0.16162483394145966, 0.0], [0.14632853865623474, -1.4395488500595093, 0.0], [0.51363605260849, 1.1713677644729614, 1.0], [0.006116398610174656, 2.319023847579956, 0.0], [0.011537286452949047, -1.5817397832870483, 1.0], [0.5035830736160278, -0.47760891914367676, 0.0]], [[0.7490952610969543, 0.18298457562923431, 1.0], [-0.0002771794388536364, 3.470196485519409, 0.0], [0.02097976952791214, -1.7894037961959839, 1.0], [0.5327944755554199, -0.5523866415023804, 0.0], [0.35111308097839355, -0.2056514471769333, 0.0], [0.522800624370575, 0.001807605498470366, 0.0], [0.3335646688938141, 0.18848279118537903, 0.0], [0.17299522459506989, 0.5205715298652649, 0.0], [0.07561471313238144, 0.4078638553619385, 0.0], [-0.05304019898176193, 0.45713528990745544, 0.0], [-0.18243852257728577, 0.3951054811477661, 0.0], [-0.31946107745170593, 0.2564002275466919, 0.0], [-0.33046141266822815, 0.08633474260568619, 0.0], [-0.35072702169418335, -0.10602138936519623, 0.0], [-0.3360012471675873, -0.2549247443675995, 0.0], [2.0130696296691895, -3.239295244216919, 1.0], [1.8826035261154175, 1.350964903831482, 1.0], [-0.002456167945638299, 2.4327750205993652, 0.0], [0.020755194127559662, -2.059634208679199, 1.0], [-0.2810361385345459, -0.35001134872436523, 0.0], [-0.28335022926330566, -0.17202885448932648, 0.0], [-0.4492146968841553, 0.0013697462854906917, 0.0], [-0.32819831371307373, 0.16498149931430817, 0.0], [-0.3170769214630127, 0.33763471245765686, 0.0], [-0.18682564795017242, 0.503294825553894, 0.0], [0.007544484920799732, 0.3344414532184601, 0.0], [0.18043385446071625, 0.4931349754333496, 0.0], [0.305913507938385, 0.32753047347068787, 0.0], [0.3129577338695526, 0.15904965996742249, 0.0], [0.3053622543811798, -0.028086701408028603, 0.0], [0.3000493347644806, -0.19435730576515198, 0.0], [0.3050712049007416, -0.3329365849494934, 0.0], [0.15961456298828125, -3.178163766860962, 1.0], [0.5441663265228271, 1.3819475173950195, 1.0], [0.0005382282542996109, 2.356045961380005, 0.0], [0.014303715899586678, -1.5117700099945068, 1.0], [0.46699702739715576, -0.46308374404907227, 0.0], [0.3197850286960602, -0.23119160532951355, 0.0], [0.46555641293525696, -0.006090911105275154, 0.0], [0.30804693698883057, 0.1543285846710205, 0.0], [0.13928575813770294, -1.3979970216751099, 0.0], [1.7595776319503784, 1.081725001335144, 1.0], [0.006309052463620901, 2.5217301845550537, 0.0], [0.04945559427142143, -2.292722702026367, 1.0], [-0.29888084530830383, -0.35195818543434143, 0.0], [-0.3113418519496918, -0.19929616153240204, 0.0], [-0.4468170404434204, -0.025349335744976997, 0.0], [-0.35703903436660767, 0.13445305824279785, 0.0], [-0.3166137635707855, 0.3107655644416809, 0.0], [-0.186362624168396, 0.4891880750656128, 0.0], [-0.001769893802702427, 0.3333025276660919, 0.0], [0.16684778034687042, 0.48624756932258606, 0.0], [0.309356153011322, 0.3261599540710449, 0.0], [0.3126559853553772, 0.17081746459007263, 0.0], [0.3027154803276062, -0.006994964554905891, 0.0], [0.3042098879814148, -0.17270301282405853, 0.0], [0.3101049065589905, -0.31172898411750793, 0.0], [0.16018831729888916, -3.1951823234558105, 1.0], [0.5659456849098206, 1.3869878053665161, 1.0], [-0.00023876781051512808, 2.438394069671631, 0.0], [0.013230874203145504, -1.5593891143798828, 1.0], [0.4713984727859497, -0.47834500670433044, 0.0], [0.3158971667289734, -0.23130817711353302, 0.0], [0.4590182304382324, -0.005166585091501474, 0.0], [0.3128799498081207, 0.15722571313381195, 0.0], [0.1421670913696289, -1.4110976457595825, 0.0], [0.4991879463195801, 1.162458896636963, 1.0], [0.006026326213032007, 2.2759227752685547, 0.0], [0.013239060528576374, -1.5581796169281006, 1.0], [0.49521222710609436, -0.47049516439437866, 0.0], [0.33768877387046814, -0.19770364463329315, 0.0], [0.48012083768844604, -0.00463520921766758, 0.0], [0.32166677713394165, 0.16842859983444214, 0.0], [0.16860967874526978, 0.5112425088882446, 0.0], [0.00047634902875870466, 1.7302061319351196, 0.0], [0.17157311737537384, -3.7250254154205322, 1.0], [2.361103057861328, 1.5128339529037476, 1.0], [-0.00023847956617828459, 2.4575610160827637, 0.0], [-0.001261466066353023, -1.9057741165161133, 1.0], [-0.3137582540512085, -0.3589235246181488, 0.0], [-0.31961095333099365, -0.17611008882522583, 0.0], [-0.5011624693870544, 0.006303813308477402, 0.0], [-0.33141639828681946, 0.18809597194194794, 0.0], [-0.33721497654914856, 0.36354899406433105, 0.0], [-0.1771276295185089, 0.5356722474098206, 0.0], [0.012582343071699142, 0.3470439612865448, 0.0], [0.19032305479049683, 0.5200856924057007, 0.0], [0.32324057817459106, 0.3496053218841553, 0.0], [0.32473212480545044, 0.16994521021842957, 0.0], [0.3160807192325592, -0.013982835225760937, 0.0], [0.311708003282547, -0.17685924470424652, 0.0], [0.31504857540130615, -0.32414868474006653, 0.0], [0.16298912465572357, -3.2675819396972656, 1.0], [0.5805596113204956, 1.416507601737976, 1.0], [0.000709438172634691, 2.4414212703704834, 0.0], [0.01650017499923706, -1.5834581851959229, 1.0], [0.4818441569805145, -0.4857877492904663, 0.0], [0.3255600035190582, -0.23157572746276855, 0.0], [0.4733067750930786, -0.0044471221044659615, 0.0], [0.319445937871933, 0.16176863014698029, 0.0], [0.1425301432609558, -1.413248062133789, 0.0], [1.756473183631897, 1.121269941329956, 1.0], [0.005510398186743259, 2.5002329349517822, 0.0], [0.050945352762937546, -2.3125431537628174, 1.0], [-0.29475656151771545, -0.3592405915260315, 0.0], [-0.30956530570983887, -0.20272189378738403, 0.0], [-0.4559669494628906, -0.028627635911107063, 0.0], [-0.3586939573287964, 0.13534969091415405, 0.0], [-0.3202804625034332, 0.31820714473724365, 0.0], [-0.19663232564926147, 0.4965616762638092, 0.0], [-0.0054270606487989426, 0.3485558331012726, 0.0], [0.16606952250003815, 0.48987460136413574, 0.0], [0.3115510642528534, 0.32921868562698364, 0.0], [0.31168749928474426, 0.17362113296985626, 0.0], [0.305193692445755, -0.00572348153218627, 0.0], [0.30772438645362854, -0.17191889882087708, 0.0], [0.30788666009902954, -0.3128001391887665, 0.0], [0.15975423157215118, -3.2610504627227783, 1.0], [0.5505043864250183, 1.414351463317871, 1.0], [0.0008649930823594332, 2.4078500270843506, 0.0], [0.016666194424033165, -1.5234200954437256, 1.0], [0.47581052780151367, -0.46467071771621704, 0.0], [0.3283751606941223, -0.2390337884426117, 0.0], [0.46860939264297485, -0.004101872909814119, 0.0], [0.3158801794052124, 0.15548162162303925, 0.0], [0.14151780307292938, -1.4230561256408691, 0.0], [0.5209129452705383, 1.1564502716064453, 1.0], [0.0062542990781366825, 2.3204643726348877, 0.0], [0.014902148395776749, -1.5615673065185547, 1.0], [0.49621379375457764, -0.4668552875518799, 0.0], [0.3390858471393585, -0.19667558372020721, 0.0], [0.49590498208999634, -0.004915154539048672, 0.0], [0.3261745572090149, 0.17222145199775696, 0.0], [0.16905568540096283, 0.5135359764099121, 0.0], [0.0005503382417373359, 1.7335702180862427, 0.0], [0.17597320675849915, -3.781510353088379, 1.0], [2.2739012241363525, 1.4940863847732544, 1.0], [-0.001885694800876081, 2.443345546722412, 0.0], [0.003531120019033551, -1.920567512512207, 1.0], [-0.3076753616333008, -0.35612618923187256, 0.0], [-0.30695194005966187, -0.17742948234081268, 0.0], [-0.493288516998291, 0.0049255164340138435, 0.0], [-0.3293626010417938, 0.18310727179050446, 0.0], [-0.3340594470500946, 0.3546310067176819, 0.0], [-0.17540861666202545, 0.5266925692558289, 0.0], [0.008850164711475372, 0.3490447998046875, 0.0], [0.1833006888628006, 0.5174379944801331, 0.0], [0.3199286162853241, 0.34862980246543884, 0.0], [0.32031217217445374, 0.1755245327949524, 0.0], [0.31458207964897156, -0.01446074340492487, 0.0], [0.3077329397201538, -0.18255573511123657, 0.0], [0.31558677554130554, -0.32744190096855164, 0.0], [0.16042158007621765, -3.305266857147217, 1.0], [0.5745108723640442, 1.4234369993209839, 1.0], [0.0014882027171552181, 2.5085833072662354, 0.0], [0.014401874504983425, -1.6072988510131836, 1.0], [0.47935250401496887, -0.4920845031738281, 0.0], [0.3339262008666992, -0.24553941190242767, 0.0], [0.48250454664230347, -0.004504401236772537, 0.0], [0.3203293979167938, 0.16246940195560455, 0.0], [0.14268635213375092, -1.4464730024337769, 0.0], [1.8629013299942017, 1.1554399728775024, 1.0], [0.007079315837472677, 2.545539379119873, 0.0], [0.04851008206605911, -2.3335089683532715, 1.0], [-0.30101269483566284, -0.36265844106674194, 0.0], [-0.2952572703361511, -0.1791740506887436, 0.0], [-0.45688068866729736, -0.01701795496046543, 0.0], [-0.363134503364563, 0.1422019600868225, 0.0], [-0.32436713576316833, 0.3228828012943268, 0.0], [-0.18386968970298767, 0.49970459938049316, 0.0], [0.0006186995888128877, 0.34616658091545105, 0.0], [0.16969935595989227, 0.4984759986400604, 0.0], [0.3112577199935913, 0.3400368392467499, 0.0], [0.3149203658103943, 0.17877720296382904, 0.0], [0.3091218173503876, -0.003942936658859253, 0.0], [0.30727097392082214, -0.1726120561361313, 0.0], [0.3081861734390259, -0.3135364353656769, 0.0], [0.1598789542913437, -3.294184684753418, 1.0], [0.5549622178077698, 1.4211188554763794, 1.0], [0.000438699935330078, 2.4440386295318604, 0.0], [0.018352733924984932, -1.5932492017745972, 1.0], [0.48002541065216064, -0.4864172041416168, 0.0], [0.33203956484794617, -0.24829775094985962, 0.0], [0.46835818886756897, -0.004407334607094526, 0.0], [0.3162810206413269, 0.16198945045471191, 0.0], [0.14469727873802185, -1.4276100397109985, 0.0], [1.6839768886566162, 1.116562843322754, 1.0], [0.006372308824211359, 2.5291926860809326, 0.0], [0.05283379554748535, -2.369603157043457, 1.0], [-0.2883903682231903, -0.36041948199272156, 0.0], [-0.28503748774528503, -0.17689594626426697, 0.0], [0.3386668860912323, -0.0008029764867387712, 0.0], [-0.3768998980522156, 0.1159849539399147, 0.0], [-0.23717929422855377, 0.28374791145324707, 0.0], [-0.20034098625183105, 0.44082918763160706, 0.0], [-0.04652615636587143, 0.3702585697174072, 0.0], [0.08399012684822083, 0.44805124402046204, 0.0], [0.1986064910888672, 0.41383475065231323, 0.0], [0.2805684804916382, 0.24608846008777618, 0.0], [0.28781187534332275, 0.06683234125375748, 0.0], [0.27843910455703735, -0.11090531945228577, 0.0], [0.27904435992240906, -0.26584017276763916, 0.0], [0.136076420545578, -3.389807939529419, 1.0], [0.4987362325191498, 1.4356389045715332, 1.0], [-0.0007313716923817992, 2.340463638305664, 0.0], [0.019947923719882965, -1.5465830564498901, 1.0], [0.4429163634777069, -0.47546255588531494, 0.0], [0.30411016941070557, -0.22703605890274048, 0.0], [0.44493526220321655, -0.008423816412687302, 0.0], [0.30422234535217285, 0.1578105092048645, 0.0], [0.13839083909988403, -1.4159612655639648, 0.0], [1.671752691268921, 1.1272238492965698, 1.0], [0.006163909565657377, 2.5519959926605225, 0.0], [0.050412170588970184, -2.368007183074951, 1.0], [-0.284640371799469, -0.3613643944263458, 0.0], [-0.2803831398487091, -0.17579664289951324, 0.0], [0.34155604243278503, -0.003689870471134782, 0.0], [-0.3765581548213959, 0.1173141747713089, 0.0], [-0.24099500477313995, 0.27799010276794434, 0.0], [-0.20220015943050385, 0.44178876280784607, 0.0], [-0.04940009117126465, 0.3655974864959717, 0.0], [0.08282296359539032, 0.44579070806503296, 0.0], [0.19843244552612305, 0.4093898832798004, 0.0], [0.2840200662612915, 0.24361059069633484, 0.0], [0.27541765570640564, 0.06895538419485092, 0.0], [0.2784290611743927, -0.11429598927497864, 0.0], [0.2837691903114319, -0.26834338903427124, 0.0], [0.13464930653572083, -3.40438175201416, 1.0], [0.4904472231864929, 1.4440101385116577, 1.0], [0.00020184139430057257, 2.4571056365966797, 0.0], [0.017347557470202446, -1.587233066558838, 1.0], [0.44949978590011597, -0.4867352843284607, 0.0], [0.30555862188339233, -0.24059997498989105, 0.0], [0.44071662425994873, -0.007755220402032137, 0.0]], [[2.308458089828491, 1.6810412406921387, 1.0], [-0.2215345948934555, -0.32189369201660156, 0.0], [-0.40982019901275635, -0.16623029112815857, 0.0], [-0.46063923835754395, 0.005275423172861338, 0.0], [-0.4719093143939972, 0.1688554584980011, 0.0], [-0.2124592363834381, 0.32839274406433105, 0.0], [0.10992971062660217, 0.3307558000087738, 0.0], [0.17586679756641388, 0.381804883480072, 0.0], [0.7743055820465088, 0.15760105848312378, 0.0], [0.3094589114189148, 0.1488511860370636, 0.0], [0.2067905068397522, 0.30421674251556396, 0.0], [0.06404465436935425, 0.1654038280248642, 0.0], [-0.08371807634830475, 0.3074885308742523, 0.0], [-0.48748400807380676, 0.14110732078552246, 0.0], [-0.5087080001831055, -0.030100017786026, 0.0], [-0.5129797458648682, -0.19534586369991302, 0.0], [-0.1705724149942398, -0.3561438024044037, 0.0], [1.981155276298523, -3.1714863777160645, 1.0], [0.6591436266899109, 0.16909120976924896, 1.0], [-0.00548842828720808, 3.3930461406707764, 0.0], [0.14712585508823395, 0.5648022294044495, 1.0], [0.4175918996334076, 0.1304837167263031, 0.0], [0.3123169243335724, -0.06483055651187897, 0.0], [-1.3076848983764648, -2.39957594871521, 1.0], [1.134156346321106, -0.007579652592539787, 0.0], [0.33839187026023865, -1.37870454788208, 1.0], [0.5937650799751282, 0.1818346530199051, 1.0], [-0.0025081546045839787, 3.349602699279785, 0.0], [0.1373845487833023, 0.5553260445594788, 1.0], [0.4078640043735504, 0.11708948016166687, 0.0], [0.30353793501853943, -0.06642474979162216, 0.0], [-1.299702525138855, -2.432090997695923, 1.0], [1.118112325668335, -0.0051713380962610245, 0.0], [0.3322184085845947, -1.392598032951355, 1.0], [0.5887554287910461, 0.18434682488441467, 1.0], [0.18151389062404633, 0.2625165283679962, 0.0], [0.16588358581066132, -0.11738066375255585, 0.0], [-0.1402440071105957, -0.19023871421813965, 0.0], [-0.15784578025341034, 0.1743212640285492, 0.0], [0.20681075751781464, 1.2477490901947021, 1.0], [0.002612015465274453, 2.431992769241333, 0.0], [0.34397271275520325, -3.7462406158447266, 1.0], [2.382936954498291, 1.6297262907028198, 1.0], [-0.003931006882339716, 2.3078925609588623, 0.0], [0.00760443601757288, -1.9467337131500244, 1.0], [-0.3206349313259125, -0.3564283847808838, 0.0], [-0.32398924231529236, -0.17878879606723785, 0.0], [-0.5135396718978882, 0.00723098823800683, 0.0], [-0.3431086838245392, 0.18348641693592072, 0.0], [-0.3495124578475952, 0.3567739725112915, 0.0], [-0.17560556530952454, 0.5356289744377136, 0.0], [0.01115941721946001, 0.35039934515953064, 0.0], [0.1820221245288849, 0.5217105150222778, 0.0], [0.33058252930641174, 0.35455653071403503, 0.0], [0.32824382185935974, 0.1797870695590973, 0.0], [0.3246256709098816, -0.0021882515866309404, 0.0], [0.3198077976703644, -0.1652902215719223, 0.0], [0.3232263922691345, -0.3152114152908325, 0.0], [0.16497157514095306, -3.329310894012451, 1.0], [0.5889279842376709, 1.4335726499557495, 1.0], [0.0009601999772712588, 2.4930260181427, 0.0], [0.01624644175171852, -1.599195957183838, 1.0], [0.476821631193161, -0.4885003864765167, 0.0], [0.33764752745628357, -0.24724534153938293, 0.0], [0.47726771235466003, -0.0042020408436656, 0.0], [0.3129333257675171, 0.16257230937480927, 0.0], [0.14416785538196564, -1.4450372457504272, 0.0], [1.8086168766021729, 1.1282637119293213, 1.0], [0.0063071721233427525, 2.544734239578247, 0.0], [0.049584969878196716, -2.3330507278442383, 1.0], [-0.2987120747566223, -0.3608653247356415, 0.0], [-0.2911871373653412, -0.1784871518611908, 0.0], [-0.47749656438827515, -0.012514888308942318, 0.0], [-0.3510923683643341, 0.146988645195961, 0.0], [-0.32394465804100037, 0.32900792360305786, 0.0], [-0.18184879422187805, 0.5075955390930176, 0.0], [0.00285945157520473, 0.3482356667518616, 0.0], [0.17664282023906708, 0.5012247562408447, 0.0], [0.3135032653808594, 0.33548811078071594, 0.0], [0.3092897832393646, 0.170636385679245, 0.0], [0.3060764670372009, -0.012062625959515572, 0.0], [0.3088352084159851, -0.1752946674823761, 0.0], [0.3082408905029297, -0.31684526801109314, 0.0], [0.15637025237083435, -3.2904276847839355, 1.0], [0.5654321908950806, 1.4235880374908447, 1.0], [0.0016249699983745813, 2.4219558238983154, 0.0], [0.014697462320327759, -1.5775479078292847, 1.0], [0.4806019365787506, -0.47921058535575867, 0.0], [0.3262648582458496, -0.2375207245349884, 0.0], [0.47259804606437683, -0.00481289392337203, 0.0], [0.3138052821159363, 0.15988530218601227, 0.0], [0.1423487365245819, -1.4326159954071045, 0.0], [1.7100363969802856, 1.1499607563018799, 1.0], [0.006123912520706654, 2.4795491695404053, 0.0], [0.05678314343094826, -2.377476692199707, 1.0], [-0.2875029444694519, -0.35985931754112244, 0.0], [-0.2841784656047821, -0.1745312511920929, 0.0], [0.34304115176200867, -0.0006898784777149558, 0.0], [-0.37756308913230896, 0.12038685381412506, 0.0], [-0.24277959764003754, 0.28362709283828735, 0.0], [-0.19023191928863525, 0.44350090622901917, 0.0], [-0.038157884031534195, 0.3701834976673126, 0.0], [0.0877537950873375, 0.44797998666763306, 0.0], [0.2024351954460144, 0.41439732909202576, 0.0], [0.27849557995796204, 0.24424365162849426, 0.0], [0.2809954285621643, 0.06571954488754272, 0.0], [0.27327120304107666, -0.11728362739086151, 0.0], [0.2847149968147278, -0.27039340138435364, 0.0], [0.1324159950017929, -3.3756256103515625, 1.0], [0.5575660467147827, 0.16969779133796692, 1.0], [-0.0029084384441375732, 3.5463192462921143, 0.0], [0.14245480298995972, 0.6075863242149353, 1.0], [0.3823739290237427, 0.13873633742332458, 0.0], [0.27790647745132446, -0.07440665364265442, 0.0], [-1.2189925909042358, -2.5372610092163086, 1.0], [1.050464391708374, -0.00580435898154974, 0.0], [0.31430402398109436, -1.4304088354110718, 1.0], [0.6001362204551697, 0.1866689771413803, 1.0], [-0.0019259641412645578, 3.5069997310638428, 0.0], [0.14494240283966064, 0.5675726532936096, 1.0], [0.3992961347103119, 0.12933918833732605, 0.0], [0.2971266806125641, -0.06737688183784485, 0.0], [-1.3041939735412598, -2.5177173614501953, 1.0], [1.105149507522583, -0.008585498668253422, 0.0], [0.3333592414855957, -1.4400203227996826, 1.0], [0.6212723851203918, 0.19098784029483795, 1.0], [0.18557295203208923, 0.237798810005188, 0.0], [0.16980497539043427, -0.12814904749393463, 0.0], [-0.14832724630832672, -0.19438965618610382, 0.0], [-0.16695840656757355, 0.17374274134635925, 0.0], [0.19855694472789764, 1.2834466695785522, 1.0], [0.00418761046603322, 2.5650649070739746, 0.0], [0.34708812832832336, -3.911447286605835, 1.0], [0.7016884684562683, 1.4659892320632935, 1.0], [-0.0030185566283762455, 2.479541063308716, 0.0], [0.015379047021269798, -1.6979931592941284, 1.0], [0.5146634578704834, -0.5132731795310974, 0.0], [0.3458270728588104, -0.22841711342334747, 0.0], [0.5032798051834106, -0.0015138337621465325, 0.0], [0.3285016119480133, 0.17937828600406647, 0.0], [0.1572357714176178, 0.5346785187721252, 0.0], [-0.0009920541197061539, 1.8183817863464355, 0.0], [0.1787487268447876, -3.910684823989868, 1.0], [2.3091094493865967, 1.6006622314453125, 1.0], [-0.0022842418402433395, 2.545240640640259, 0.0], [-0.002551038283854723, -2.012150764465332, 1.0], [-0.30778828263282776, -0.37421953678131104, 0.0], [-0.31035614013671875, -0.18280135095119476, 0.0], [-0.49511024355888367, 0.005558035336434841, 0.0], [-0.3325406610965729, 0.19437304139137268, 0.0], [-0.3298613429069519, 0.3751853108406067, 0.0], [-0.16756044328212738, 0.5566828846931458, 0.0], [0.010950448922812939, 0.3544045090675354, 0.0], [0.18117955327033997, 0.5379149913787842, 0.0], [0.3194698691368103, 0.361614465713501, 0.0], [0.32135966420173645, 0.1797025203704834, 0.0], [0.31275907158851624, -0.01315247267484665, 0.0], [0.3120749592781067, -0.18105776607990265, 0.0], [0.3147742450237274, -0.3338213562965393, 0.0], [0.15966331958770752, -3.419156312942505, 1.0], [0.580318033695221, 1.4746744632720947, 1.0], [0.0004737460403703153, 2.5080018043518066, 0.0], [0.017251603305339813, -1.5990949869155884, 1.0], [0.4787055552005768, -0.48355889320373535, 0.0], [0.327868789434433, -0.24050039052963257, 0.0], [0.46660923957824707, -0.004512159153819084, 0.0], [0.32087236642837524, 0.1590125560760498, 0.0], [0.1430666446685791, -1.4662280082702637, 0.0], [1.8128938674926758, 1.1747552156448364, 1.0], [0.006692204158753157, 2.6110222339630127, 0.0], [0.0478191040456295, -2.3902175426483154, 1.0], [-0.29814276099205017, -0.3680013418197632, 0.0], [-0.29509803652763367, -0.18123815953731537, 0.0], [0.34747979044914246, 0.0022441581822931767, 0.0], [-0.38509896397590637, 0.12413172423839569, 0.0], [-0.2485191971063614, 0.2876895070075989, 0.0], [-0.2104303389787674, 0.449759304523468, 0.0], [-0.058712463825941086, 0.3732685446739197, 0.0], [0.07711642980575562, 0.4584386646747589, 0.0], [0.20017220079898834, 0.42041125893592834, 0.0], [0.2802514433860779, 0.25460901856422424, 0.0], [0.28062185645103455, 0.07445906102657318, 0.0], [0.28025075793266296, -0.10540572553873062, 0.0], [0.28103476762771606, -0.2643279731273651, 0.0], [0.1370665282011032, -3.418281078338623, 1.0], [0.5095823407173157, 1.4586340188980103, 1.0], [-0.000637100834865123, 2.4462594985961914, 0.0], [0.01683012954890728, -1.6069464683532715, 1.0], [0.4424141049385071, -0.4908353090286255, 0.0], [0.3114236295223236, -0.24447424709796906, 0.0], [0.4463088810443878, -0.006541338749229908, 0.0], [0.30320116877555847, 0.16433610022068024, 0.0], [0.1365049183368683, -1.474016785621643, 0.0], [1.6600027084350586, 1.160908818244934, 1.0], [0.005083792377263308, 2.6100914478302, 0.0], [0.050875741988420486, -2.4333598613739014, 1.0], [-0.28876036405563354, -0.3712548315525055, 0.0], [-0.2789698839187622, -0.18178918957710266, 0.0], [0.34045031666755676, -0.002771663712337613, 0.0], [-0.3769766390323639, 0.11678308993577957, 0.0], [-0.2369479089975357, 0.2823934853076935, 0.0], [-0.20202310383319855, 0.4471154510974884, 0.0], [-0.04677492752671242, 0.3790181577205658, 0.0], [0.08320296555757523, 0.4569898247718811, 0.0], [0.1979539841413498, 0.42706558108329773, 0.0], [0.2788972556591034, 0.2561648190021515, 0.0], [0.27702096104621887, 0.07014031708240509, 0.0], [0.27092447876930237, -0.11577776074409485, 0.0], [0.27812299132347107, -0.27023574709892273, 0.0], [0.13474324345588684, -3.4709057807922363, 0.0], [0.5724462270736694, 0.12581093609333038, 1.0], [-0.005069239530712366, 3.6504132747650146, 0.0], [0.14148662984371185, -3.6866018772125244, 1.0], [0.5727949142456055, 0.1651322841644287, 1.0], [0.00032462849048897624, 3.4522197246551514, 0.0], [0.14014218747615814, 0.6190078854560852, 1.0], [0.3976772725582123, 0.14552393555641174, 0.0], [0.29839015007019043, -0.0577123761177063, 0.0], [-1.280387282371521, -2.5247702598571777, 1.0], [1.101563572883606, -0.004537769127637148, 0.0], [0.3305208384990692, -1.430374264717102, 1.0], [0.5975086688995361, 0.1876562088727951, 1.0], [0.18303526937961578, 0.2435433566570282, 0.0], [0.17115500569343567, -0.125858873128891, 0.0], [-0.140976682305336, -0.19441601634025574, 0.0], [-0.1644054651260376, 0.1718619465827942, 0.0], [0.19345644116401672, 1.280212640762329, 1.0], [0.0027366371359676123, 2.5404458045959473, 0.0], [0.34799274802207947, -3.9003233909606934, 1.0], [0.7017680406570435, 1.462651252746582, 1.0], [-0.0020704728085547686, 2.498399019241333, 0.0], [0.015438053756952286, -1.6821991205215454, 1.0], [0.5097976326942444, -0.5099872946739197, 0.0], [0.353292316198349, -0.23132289946079254, 0.0]], [[2.2794437408447266, 1.640489935874939, 1.0], [-0.21868225932121277, -0.32636186480522156, 0.0], [-0.389204204082489, -0.160685196518898, 0.0], [-0.4693355858325958, -0.005355828441679478, 0.0], [-0.2837734520435333, 0.16879086196422577, 0.0], [-0.2432197630405426, 0.3252103924751282, 0.0], [0.07194038480520248, 0.3458321690559387, 0.0], [0.13952745497226715, 0.3699982464313507, 0.0], [0.19594958424568176, 0.4111305773258209, 0.0], [0.2577979862689972, 0.37643125653266907, 0.0], [0.29506975412368774, 0.20555250346660614, 0.0], [0.2906166911125183, 0.03467152267694473, 0.0], [0.2896951735019684, -0.12846386432647705, 0.0], [0.2964473068714142, -0.2720859944820404, 0.0], [0.14695069193840027, -3.2474050521850586, 1.0], [0.4916912019252777, 1.3774412870407104, 1.0], [0.0017229149816557765, 2.351497173309326, 0.0], [0.017717093229293823, -1.492244839668274, 1.0], [0.4585849940776825, -0.4623109996318817, 0.0], [0.3142167627811432, -0.23889750242233276, 0.0], [0.45322805643081665, -0.008182553574442863, 0.0], [0.30548804998397827, 0.15033097565174103, 0.0], [0.14017219841480255, -1.41190767288208, 1.0], [2.1274008750915527, 1.429518222808838, 1.0], [3.935949735023314e-06, 2.228215217590332, 0.0], [0.018651830032467842, -1.953006386756897, 1.0], [-0.29962268471717834, -0.33972761034965515, 0.0], [-0.30207374691963196, -0.16968035697937012, 0.0], [-0.4842382073402405, -0.0004623516579158604, 0.0], [-0.33279699087142944, 0.16359856724739075, 0.0], [-0.3367556035518646, 0.33208853006362915, 0.0], [-0.18103709816932678, 0.5000539422035217, 0.0], [0.003281972836703062, 0.32982853055000305, 0.0], [0.18187656998634338, 0.49347802996635437, 0.0], [0.31825074553489685, 0.3307036757469177, 0.0], [0.3199308514595032, 0.16886180639266968, 0.0], [0.30890175700187683, -0.010058159939944744, 0.0], [0.31393057107925415, -0.1697455644607544, 0.0], [0.31529343128204346, -0.31019100546836853, 0.0], [0.16261592507362366, -3.1743202209472656, 1.0], [0.5528503060340881, 1.370366096496582, 1.0], [0.000886042311321944, 2.4160916805267334, 0.0], [0.01399785652756691, -1.5234379768371582, 1.0], [0.4729020297527313, -0.4669594168663025, 0.0], [0.32455697655677795, -0.2275535613298416, 0.0], [0.4646865427494049, -0.004990750458091497, 0.0], [0.31446510553359985, 0.15487273037433624, 0.0], [0.14060121774673462, -1.4023652076721191, 1.0], [2.1044251918792725, 1.3908799886703491, 1.0], [-0.00010253542131977156, 2.226834535598755, 0.0], [0.021191082894802094, -1.943118691444397, 1.0], [-0.30109864473342896, -0.337496280670166, 0.0], [-0.2999526858329773, -0.16759859025478363, 0.0], [-0.4782668948173523, -0.0034401339944452047, 0.0], [-0.33607760071754456, 0.15763218700885773, 0.0], [-0.33400848507881165, 0.3286612927913666, 0.0], [-0.18714892864227295, 0.49645543098449707, 0.0], [0.0029260532464832067, 0.32496094703674316, 0.0], [0.1820741891860962, 0.49217700958251953, 0.0], [0.31738004088401794, 0.33321118354797363, 0.0], [0.3216559588909149, 0.16645774245262146, 0.0], [0.31232964992523193, -0.009935561567544937, 0.0], [0.31278884410858154, -0.171592116355896, 0.0], [0.3127235174179077, -0.3103538453578949, 0.0], [0.16397076845169067, -3.15423583984375, 1.0], [0.5688996315002441, 1.3625943660736084, 1.0], [0.0008023504633456469, 2.423394203186035, 0.0], [0.013285274617373943, -1.5574017763137817, 1.0], [0.47102221846580505, -0.4757828414440155, 0.0], [0.32398128509521484, -0.2271270453929901, 0.0], [0.4668301045894623, -0.005453622434288263, 0.0], [0.31190577149391174, 0.15889842808246613, 0.0], [0.14399583637714386, -1.3994969129562378, 0.0], [1.679373860359192, 1.0945703983306885, 1.0], [0.006329990923404694, 2.467254877090454, 0.0], [0.05632180720567703, -2.300309181213379, 1.0], [-0.29001036286354065, -0.35389444231987, 0.0], [-0.2840924859046936, -0.17379991710186005, 0.0], [0.3400248885154724, 0.00031242574914358556, 0.0], [-0.3760456442832947, 0.11755535751581192, 0.0], [-0.2361808568239212, 0.2813543677330017, 0.0], [-0.20241497457027435, 0.4310376048088074, 0.0], [-0.04240592196583748, 0.3587184250354767, 0.0], [0.0921344980597496, 0.4371243119239807, 0.0], [0.2078220397233963, 0.3987179696559906, 0.0], [0.2780570983886719, 0.23522920906543732, 0.0], [0.2804594933986664, 0.05745384097099304, 0.0], [0.27817192673683167, -0.1156650260090828, 0.0], [0.2819611728191376, -0.2663130462169647, 0.0], [0.13785335421562195, -3.285836935043335, 1.0], [0.4818348288536072, 1.3989495038986206, 1.0], [0.0008343667141161859, 2.402683973312378, 0.0], [0.016847653314471245, -1.5607995986938477, 1.0], [0.44988980889320374, -0.48048487305641174, 0.0], [0.3083520531654358, -0.24016626179218292, 0.0], [0.4434654116630554, -0.008115521632134914, 0.0], [0.30219003558158875, 0.15974467992782593, 0.0], [0.1367446333169937, -1.4089765548706055, 0.0], [1.673005223274231, 1.108392357826233, 1.0], [0.005652240477502346, 2.5027780532836914, 0.0], [0.04893393814563751, -2.3262767791748047, 1.0], [-0.2845688760280609, -0.3564547002315521, 0.0], [-0.2784540355205536, -0.17620521783828735, 0.0], [0.3430635631084442, -0.002030840842053294, 0.0], [-0.3734157085418701, 0.1188424602150917, 0.0], [-0.2383212447166443, 0.27796030044555664, 0.0], [-0.1997283399105072, 0.43479490280151367, 0.0], [-0.04635612294077873, 0.36377373337745667, 0.0], [0.08733034133911133, 0.4446995258331299, 0.0], [0.20080949366092682, 0.4050911068916321, 0.0], [0.2811521887779236, 0.23647327721118927, 0.0], [0.2770048975944519, 0.06201215088367462, 0.0], [0.2780008614063263, -0.1187238022685051, 0.0], [0.27727389335632324, -0.27208420634269714, 0.0], [0.1362231969833374, -3.3298237323760986, 0.0], [0.5484451651573181, 0.12099260836839676, 1.0], [-0.0054259696044027805, 3.473252058029175, 0.0], [0.143818199634552, -3.6140193939208984, 1.0], [0.5683503746986389, 0.162501722574234, 1.0], [0.0012248408747836947, 3.461618661880493, 0.0], [0.14109787344932556, 0.6090297102928162, 1.0], [0.4055604636669159, 0.13829126954078674, 0.0], [0.3018365800380707, -0.060584697872400284, 0.0], [-1.2440649271011353, -2.4974613189697266, 1.0], [1.0882025957107544, -0.006651925388723612, 0.0], [0.3249988257884979, -1.4329694509506226, 1.0], [0.6012976765632629, 0.1844779998064041, 1.0], [0.18183152377605438, 0.24376612901687622, 0.0], [0.15084172785282135, -0.16474394500255585, 0.0], [-0.14407625794410706, -0.19309189915657043, 0.0], [-0.16851674020290375, 0.16931679844856262, 0.0], [0.195430725812912, 1.2750850915908813, 1.0], [0.0036538366694003344, 2.5067951679229736, 0.0], [0.3438626527786255, -3.848055124282837, 1.0], [0.6823917627334595, 1.4427614212036133, 1.0], [-0.00362525787204504, 2.3431289196014404, 0.0], [0.017182044684886932, -1.6320736408233643, 1.0], [0.5066652894020081, -0.4948680102825165, 0.0], [0.3435989022254944, -0.21253687143325806, 0.0], [0.4978335499763489, -0.0021964285988360643, 0.0], [0.3274976909160614, 0.1800401508808136, 0.0], [0.16469334065914154, 0.5267539024353027, 0.0], [0.00021872993966098875, 1.779725432395935, 0.0], [0.17240501940250397, -3.8397505283355713, 1.0], [2.295133113861084, 1.6177586317062378, 1.0], [-0.0007840458420105278, 2.373732328414917, 0.0], [0.0023515799548476934, -1.9493677616119385, 1.0], [-0.3069706857204437, -0.3630025088787079, 0.0], [-0.30937743186950684, -0.18016746640205383, 0.0], [-0.4947895109653473, 0.006032528355717659, 0.0], [-0.3310438096523285, 0.18325352668762207, 0.0], [-0.33636778593063354, 0.36245694756507874, 0.0], [-0.1713797152042389, 0.5363346934318542, 0.0], [0.009444858878850937, 0.35221073031425476, 0.0], [0.18256643414497375, 0.5290844440460205, 0.0], [0.32224008440971375, 0.3557034730911255, 0.0], [0.32008036971092224, 0.17650021612644196, 0.0], [0.49850553274154663, -0.005117612890899181, 0.0], [0.32364457845687866, -0.18966352939605713, 0.0], [0.32133400440216064, -0.3604598641395569, 0.0], [0.16697204113006592, -3.3337719440460205, 1.0], [0.6020281910896301, 1.4551478624343872, 1.0], [0.00016045005759224296, 2.463733434677124, 0.0], [0.01674848422408104, -1.6011698246002197, 1.0], [0.47797757387161255, -0.4866997003555298, 0.0], [0.3348276913166046, -0.2450096160173416, 0.0], [0.4805997908115387, -0.0038967446889728308, 0.0], [0.3183837831020355, 0.1638658046722412, 0.0], [0.14392070472240448, -1.4462430477142334, 0.0], [1.7696179151535034, 1.1452250480651855, 1.0], [0.005615244619548321, 2.5753819942474365, 0.0], [0.047034990042448044, -2.3689992427825928, 1.0], [-0.29713407158851624, -0.36458882689476013, 0.0], [-0.2890477478504181, -0.17913945019245148, 0.0], [0.3436826169490814, -0.000925534637644887, 0.0], [-0.38645139336586, 0.11860094219446182, 0.0], [-0.24865004420280457, 0.284120112657547, 0.0], [-0.21170787513256073, 0.44596120715141296, 0.0], [-0.056729596108198166, 0.36774942278862, 0.0], [0.08238698542118073, 0.4573083221912384, 0.0], [0.20566250383853912, 0.41649293899536133, 0.0], [0.28797823190689087, 0.24989773333072662, 0.0], [0.2867435812950134, 0.07029414176940918, 0.0], [0.27909719944000244, -0.11239206045866013, 0.0], [0.2794222831726074, -0.2711326777935028, 0.0], [0.13937535881996155, -3.4031460285186768, 1.0], [0.5041981935501099, 1.4490301609039307, 1.0], [0.0001982213871087879, 2.4646127223968506, 0.0], [0.01660233549773693, -1.6043903827667236, 1.0], [0.45020875334739685, -0.49059584736824036, 0.0], [0.3157375156879425, -0.24589282274246216, 0.0], [0.4527718126773834, -0.007433188147842884, 0.0], [0.30439943075180054, 0.16526362299919128, 0.0], [0.13692855834960938, -1.4544956684112549, 0.0], [1.6943798065185547, 1.1711782217025757, 1.0], [0.005575098097324371, 2.5524141788482666, 0.0], [0.04974560812115669, -2.4069297313690186, 1.0], [-0.2869512736797333, -0.3677004873752594, 0.0], [-0.2835913300514221, -0.18109950423240662, 0.0], [0.3398568630218506, -0.0024723163805902004, 0.0], [-0.37641072273254395, 0.11839800328016281, 0.0], [-0.24204114079475403, 0.28501391410827637, 0.0], [-0.19424597918987274, 0.44585418701171875, 0.0], [-0.04314829781651497, 0.3769642412662506, 0.0], [0.09041736274957657, 0.4545536935329437, 0.0], [0.20110630989074707, 0.4214687645435333, 0.0], [0.2767751216888428, 0.2482079416513443, 0.0], [0.27778127789497375, 0.0682668685913086, 0.0], [0.27068933844566345, -0.1127474457025528, 0.0], [0.2765398323535919, -0.27043020725250244, 0.0], [0.13408663868904114, -3.4327666759490967, 0.0], [0.5762757658958435, 0.12611867487430573, 1.0], [-0.004711763467639685, 3.5567171573638916, 0.0], [0.13549381494522095, -3.5951058864593506, 1.0], [0.5362331867218018, 0.16359277069568634, 1.0], [0.00040732388151809573, 3.497742176055908, 0.0], [0.1224258616566658, -3.4322257041931152, 1.0], [1.9023042917251587, 1.4239387512207031, 1.0], [0.0014556252863258123, 2.3688716888427734, 0.0], [0.02217891253530979, -2.1407487392425537, 1.0], [-0.2866020202636719, -0.3625727593898773, 0.0], [-0.28590044379234314, -0.17800907790660858, 0.0], [-0.45773646235466003, 0.002687891013920307, 0.0], [-0.33279597759246826, 0.167360320687294, 0.0], [-0.3157913386821747, 0.3427325487136841, 0.0], [-0.18299832940101624, 0.5172385573387146, 0.0], [0.0011862751562148333, 0.3521631062030792, 0.0], [0.17252501845359802, 0.5081526637077332, 0.0], [0.3063311278820038, 0.34048697352409363, 0.0], [0.3090982437133789, 0.168465718626976, 0.0], [0.30285418033599854, -0.020211970433592796, 0.0], [0.29764431715011597, -0.1912406086921692, 0.0], [0.3051254153251648, -0.33190131187438965, 0.0], [0.15690702199935913, -3.313298225402832, 1.0]], [[2.3039326667785645, 1.6747567653656006, 1.0], [-0.2237420380115509, -0.32089465856552124, 0.0], [-0.4333108067512512, -0.1609322428703308, 0.0], [-0.4833044707775116, -0.0004664827138185501, 0.0], [-0.3041134774684906, 0.1809925138950348, 0.0], [-0.22368401288986206, 0.33317631483078003, 0.0], [0.08739621192216873, 0.3433420956134796, 0.0], [0.1556980311870575, 0.3770090341567993, 0.0], [0.21239162981510162, 0.41668620705604553, 0.0], [0.2697865068912506, 0.37436696887016296, 0.0], [0.2979840934276581, 0.19847697019577026, 0.0], [0.2946155071258545, 0.026573393493890762, 0.0], [0.2907765209674835, -0.14014758169651031, 0.0], [0.29508161544799805, -0.28104841709136963, 0.0], [0.14801575243473053, -3.3084805011749268, 1.0], [0.5262261033058167, 1.4044121503829956, 1.0], [0.0005738349864259362, 2.3707468509674072, 0.0], [0.014927160926163197, -1.5374594926834106, 1.0], [0.4580475986003876, -0.4706829786300659, 0.0], [0.31764623522758484, -0.22649435698986053, 0.0], [0.45494818687438965, -0.00859764963388443, 0.0], [0.3081156015396118, 0.1573399007320404, 0.0], [0.13788603246212006, -1.4065961837768555, 0.0], [1.6220035552978516, 1.1388778686523438, 1.0], [0.005487425718456507, 2.4700729846954346, 0.0], [0.05671815201640129, -2.3733108043670654, 1.0], [-0.28835639357566833, -0.36023208498954773, 0.0], [-0.278728723526001, -0.17602527141571045, 0.0], [0.3335973024368286, -0.004539510700851679, 0.0], [-0.36968979239463806, 0.11807864159345627, 0.0], [-0.2343333661556244, 0.2825663685798645, 0.0], [-0.19364683330059052, 0.439268559217453, 0.0], [-0.03410033509135246, 0.36121684312820435, 0.0], [0.09491170942783356, 0.44879618287086487, 0.0], [0.20554955303668976, 0.40059027075767517, 0.0], [0.2783506214618683, 0.22980917990207672, 0.0], [0.2776324152946472, 0.051977161318063736, 0.0], [0.2783912122249603, -0.12293088436126709, 0.0], [0.28371095657348633, -0.27176007628440857, 0.0], [0.13527041673660278, -3.319547176361084, 0.0], [0.5671695470809937, 0.11988451331853867, 1.0], [-0.004762612283229828, 3.4678821563720703, 0.0], [0.13457971811294556, -3.4952402114868164, 1.0], [0.5559736490249634, 0.15784333646297455, 1.0], [0.0008219720330089331, 3.3585708141326904, 0.0], [0.14034749567508698, 0.6196665167808533, 1.0], [0.3982749283313751, 0.14516039192676544, 0.0], [0.293705552816391, -0.05428539589047432, 0.0], [-1.2511444091796875, -2.467984437942505, 1.0], [1.0756608247756958, -0.005184932611882687, 0.0], [0.32719215750694275, -1.4122475385665894, 1.0], [0.6155020594596863, 0.18246614933013916, 1.0], [0.1816575527191162, 0.24324215948581696, 0.0], [0.16806621849536896, -0.12098243087530136, 0.0], [-0.14090688526630402, -0.18962490558624268, 0.0], [-0.1535569429397583, 0.176409512758255, 0.0], [0.198114275932312, 1.2476134300231934, 1.0], [0.0028115578461438417, 2.4688262939453125, 0.0], [0.3450089991092682, -3.785414218902588, 1.0], [0.6899157762527466, 1.4277201890945435, 1.0], [-0.0024389217142015696, 2.3447964191436768, 0.0], [0.01756655052304268, -1.6034793853759766, 1.0], [0.5026959180831909, -0.48779356479644775, 0.0], [0.34912216663360596, -0.22102417051792145, 0.0], [0.4996000826358795, -0.002539037261158228, 0.0], [0.33077216148376465, 0.17711682617664337, 0.0], [0.1702180802822113, 0.5228458642959595, 0.0], [-0.0004157455696258694, 1.779080867767334, 0.0], [0.17493459582328796, -3.8154118061065674, 1.0], [2.320467472076416, 1.5396878719329834, 1.0], [-0.0018367136362940073, 2.506357192993164, 0.0], [0.001357578788883984, -1.9783469438552856, 1.0], [-0.30747783184051514, -0.3652331829071045, 0.0], [-0.3148893117904663, -0.1781117469072342, 0.0], [-0.5015754103660583, 0.0061397613026201725, 0.0], [-0.33699265122413635, 0.18894259631633759, 0.0], [-0.34376898407936096, 0.3657834529876709, 0.0], [-0.17972609400749207, 0.5469300150871277, 0.0], [0.006486251950263977, 0.34718969464302063, 0.0], [0.18458350002765656, 0.5330333113670349, 0.0], [0.32947003841400146, 0.36095669865608215, 0.0], [0.3218334913253784, 0.17898087203502655, 0.0], [0.3191874623298645, -0.007962051779031754, 0.0], [0.3117161691188812, -0.17541155219078064, 0.0], [0.31056681275367737, -0.32248905301094055, 0.0], [0.16042451560497284, -3.3597922325134277, 1.0], [0.577418327331543, 1.44951593875885, 1.0], [0.000789288489613682, 2.4032723903656006, 0.0], [0.019504327327013016, -1.558703899383545, 1.0], [0.4752193093299866, -0.47373631596565247, 0.0], [0.32954150438308716, -0.22962529957294464, 0.0], [0.4742289185523987, -0.004818361718207598, 0.0], [0.31487488746643066, 0.1612066924571991, 0.0], [0.14151526987552643, -1.44925856590271, 0.0], [1.707515835762024, 1.1646177768707275, 1.0], [0.005500790663063526, 2.5348050594329834, 0.0], [0.05266764014959335, -2.3886525630950928, 1.0], [-0.29360857605934143, -0.3666567802429199, 0.0], [-0.30192601680755615, -0.20871052145957947, 0.0], [0.3349631726741791, 0.0002741592179518193, 0.0], [-0.3838808834552765, 0.12045218795537949, 0.0], [-0.25001534819602966, 0.2839260995388031, 0.0], [-0.20019099116325378, 0.4480496942996979, 0.0], [-0.04434177652001381, 0.36645951867103577, 0.0], [0.0894797295331955, 0.46518898010253906, 0.0], [0.20656004548072815, 0.41528788208961487, 0.0], [0.2809087634086609, 0.24875904619693756, 0.0], [0.2811944782733917, 0.06905379891395569, 0.0], [0.2822975218296051, -0.1115376353263855, 0.0], [0.28363218903541565, -0.2675270140171051, 0.0], [0.13608118891716003, -3.415524959564209, 1.0], [0.5072876811027527, 1.456786870956421, 1.0], [0.0001871921558631584, 2.4226760864257812, 0.0], [0.017738251015543938, -1.5575250387191772, 1.0], [0.448170930147171, -0.476279079914093, 0.0], [0.30481576919555664, -0.23763114213943481, 0.0], [0.44464680552482605, -0.006880864500999451, 0.0], [0.30019378662109375, 0.16003946959972382, 0.0], [0.1386556476354599, -1.4535882472991943, 0.0], [1.6583839654922485, 1.1517577171325684, 1.0], [0.005888562183827162, 2.5940372943878174, 0.0], [0.043692778795957565, -2.3970837593078613, 1.0], [-0.28917065262794495, -0.3658026158809662, 0.0], [-0.28378987312316895, -0.17799511551856995, 0.0], [0.3414062261581421, -0.0043861148878932, 0.0], [-0.3747293949127197, 0.11741132289171219, 0.0], [-0.2385765165090561, 0.2855437994003296, 0.0], [-0.19959543645381927, 0.4474944770336151, 0.0], [-0.04954765364527702, 0.3713827431201935, 0.0], [0.07902999222278595, 0.45526403188705444, 0.0], [0.1959877759218216, 0.41870513558387756, 0.0], [0.2822195291519165, 0.24883942306041718, 0.0], [0.2808666527271271, 0.0702642947435379, 0.0], [0.27328813076019287, -0.10833747684955597, 0.0], [0.2777818739414215, -0.26714372634887695, 0.0], [0.1346307098865509, -3.41300368309021, 1.0], [0.49231162667274475, 1.4537570476531982, 1.0], [0.0006388603360392153, 2.334764003753662, 0.0], [0.01936853863298893, -1.5581990480422974, 1.0], [0.45201000571250916, -0.47785747051239014, 0.0], [0.3087731599807739, -0.23294848203659058, 0.0], [0.4431155025959015, -0.007996427826583385, 0.0], [0.2999792695045471, 0.1602362096309662, 0.0], [0.13628588616847992, -1.4546442031860352, 0.0], [1.7891037464141846, 1.1522248983383179, 1.0], [0.006824206095188856, 2.5592668056488037, 0.0], [0.0465519092977047, -2.335756778717041, 1.0], [-0.29415082931518555, -0.3637031316757202, 0.0], [-0.28969326615333557, -0.18220064043998718, 0.0], [-0.47187167406082153, -0.011790553107857704, 0.0], [-0.3510819971561432, 0.14962634444236755, 0.0], [-0.3199155032634735, 0.3347289562225342, 0.0], [-0.17104081809520721, 0.5122807025909424, 0.0], [0.014852924272418022, 0.34752607345581055, 0.0], [0.17897546291351318, 0.50425124168396, 0.0], [0.3104747235774994, 0.33352041244506836, 0.0], [0.30937591195106506, 0.16523541510105133, 0.0], [0.30780646204948425, -0.01839614287018776, 0.0], [0.3051101565361023, -0.18785879015922546, 0.0], [0.31092968583106995, -0.32791203260421753, 0.0], [0.15725283324718475, -3.2943954467773438, 1.0], [0.5607218146324158, 1.4261821508407593, 1.0], [0.0006741947145201266, 2.437866449356079, 0.0], [0.01647055521607399, -1.5779258012771606, 1.0], [0.46869003772735596, -0.48731449246406555, 0.0], [0.3264244794845581, -0.24409233033657074, 0.0], [0.46662306785583496, -0.004968620836734772, 0.0], [0.3173932731151581, 0.16190965473651886, 0.0], [0.14333689212799072, -1.4323019981384277, 0.0], [1.8721081018447876, 1.1329258680343628, 1.0], [0.006026653107255697, 2.544261932373047, 0.0], [0.048254407942295074, -2.3058393001556396, 1.0], [-0.2994307279586792, -0.35886701941490173, 0.0], [-0.3011488914489746, -0.179286390542984, 0.0], [-0.4839625954627991, -0.008918763138353825, 0.0], [-0.35232049226760864, 0.1478273570537567, 0.0], [-0.3290844261646271, 0.3306101858615875, 0.0], [-0.18455982208251953, 0.5053908824920654, 0.0], [0.006504445802420378, 0.3426218032836914, 0.0], [0.1769600361585617, 0.49713119864463806, 0.0], [0.31538140773773193, 0.33452630043029785, 0.0], [0.3174297511577606, 0.16735512018203735, 0.0], [0.30627307295799255, -0.016078753396868706, 0.0], [0.30476537346839905, -0.17567043006420135, 0.0], [0.31772997975349426, -0.3186240792274475, 0.0], [0.1586569845676422, -3.251255512237549, 1.0], [0.5777323246002197, 1.409700870513916, 1.0], [0.0010699026752263308, 2.34110164642334, 0.0], [0.015160680748522282, -1.5353947877883911, 1.0], [0.4751364588737488, -0.468329519033432, 0.0], [0.3284003734588623, -0.2320113331079483, 0.0], [0.4700048863887787, -0.0036775092594325542, 0.0], [0.3159324526786804, 0.16049666702747345, 0.0], [0.14155572652816772, -1.406247615814209, 0.0], [1.7659950256347656, 1.118902564048767, 1.0], [0.006901840213686228, 2.5047764778137207, 0.0], [0.05274669826030731, -2.3261537551879883, 1.0], [-0.2955971360206604, -0.35536596179008484, 0.0], [-0.2919662594795227, -0.1762426346540451, 0.0], [0.3461324870586395, -0.00022320864081848413, 0.0], [-0.38721969723701477, 0.11784248799085617, 0.0], [-0.24081701040267944, 0.28223052620887756, 0.0], [-0.20179100334644318, 0.4392228126525879, 0.0], [-0.051439203321933746, 0.3576180636882782, 0.0], [0.08011132478713989, 0.44767773151397705, 0.0], [0.20185019075870514, 0.40296098589897156, 0.0], [0.280577689409256, 0.2415257841348648, 0.0], [0.2821173071861267, 0.06383748352527618, 0.0], [0.2766844928264618, -0.11631003022193909, 0.0], [0.2842104434967041, -0.2686413824558258, 0.0], [0.14084215462207794, -3.3332371711730957, 1.0], [0.49832382798194885, 1.4166042804718018, 1.0], [0.0008547042380087078, 2.4045040607452393, 0.0], [0.01704147830605507, -1.5246732234954834, 1.0], [0.4472416639328003, -0.4707227945327759, 0.0], [0.3153112828731537, -0.23965133726596832, 0.0], [0.4492250978946686, -0.006894320715218782, 0.0], [0.306956022977829, 0.15767164528369904, 0.0], [0.1389823704957962, -1.4504215717315674, 1.0], [2.127493381500244, 1.38762366771698, 1.0], [0.000505130912642926, 2.3227272033691406, 0.0], [0.016587724909186363, -1.950817584991455, 1.0], [-0.2989881634712219, -0.34490352869033813, 0.0], [-0.30220261216163635, -0.17036834359169006, 0.0], [-0.4827418029308319, 0.0020807511173188686, 0.0], [-0.3441625237464905, 0.1683931201696396, 0.0], [-0.3385694921016693, 0.33502960205078125, 0.0], [-0.17529930174350739, 0.5052087306976318, 0.0], [0.00954999215900898, 0.3380502462387085, 0.0], [0.1824716180562973, 0.4916718304157257, 0.0], [0.31888219714164734, 0.32917919754981995, 0.0], [0.31772446632385254, 0.1604960560798645, 0.0], [0.313554972410202, -0.012764218263328075, 0.0], [0.3105306327342987, -0.173823744058609, 0.0]], [[2.2944066524505615, 1.681708812713623, 1.0], [-0.22481504082679749, -0.3281117081642151, 0.0], [-0.40913233160972595, -0.16123837232589722, 0.0], [-0.4780483841896057, -0.0021244927775114775, 0.0], [-0.265946626663208, 0.1764030158519745, 0.0], [-0.2303764820098877, 0.33178436756134033, 0.0], [0.07249119132757187, 0.34709617495536804, 0.0], [0.14112819731235504, 0.3737397789955139, 0.0], [0.20099301636219025, 0.4165761470794678, 0.0], [0.2646440267562866, 0.3696933686733246, 0.0], [0.29404377937316895, 0.20151473581790924, 0.0], [0.29225173592567444, 0.030530964955687523, 0.0], [0.2888929843902588, -0.13064700365066528, 0.0], [0.2934477925300598, -0.27283307909965515, 0.0], [0.1459110826253891, -3.2639400959014893, 1.0], [0.5159976482391357, 1.391112208366394, 1.0], [0.0012232866138219833, 2.322000503540039, 0.0], [0.01531240064650774, -1.5123813152313232, 1.0], [0.4505791664123535, -0.4637250304222107, 0.0], [0.3116583824157715, -0.2329135686159134, 0.0], [0.4558916389942169, -0.007796071004122496, 0.0], [0.3072795867919922, 0.1582702100276947, 0.0], [0.1382358819246292, -1.3956553936004639, 0.0], [1.6929134130477905, 1.0949987173080444, 1.0], [0.0049315146170556545, 2.4638848304748535, 0.0], [0.05019538849592209, -2.290445327758789, 1.0], [-0.28519394993782043, -0.3536500334739685, 0.0], [-0.27922487258911133, -0.1738460659980774, 0.0], [0.33466172218322754, -0.0005798008642159402, 0.0], [-0.37786784768104553, 0.11755437403917313, 0.0], [-0.24209856986999512, 0.2761719226837158, 0.0], [-0.20210550725460052, 0.42944061756134033, 0.0], [-0.046732135117053986, 0.3597468137741089, 0.0], [0.08673156052827835, 0.44154590368270874, 0.0], [0.20511537790298462, 0.4040066599845886, 0.0], [0.273557186126709, 0.239206001162529, 0.0], [0.27845221757888794, 0.05698694661259651, 0.0], [0.27690649032592773, -0.11608017235994339, 0.0], [0.2793132960796356, -0.26841139793395996, 0.0], [0.13654178380966187, -3.3029420375823975, 1.0], [0.5558046698570251, 0.163680300116539, 1.0], [-0.0018236684845760465, 3.491685628890991, 0.0], [0.1402875930070877, 0.598734974861145, 1.0], [0.3905962407588959, 0.13429318368434906, 0.0], [0.2853996157646179, -0.08217056840658188, 0.0], [-1.1964131593704224, -2.484086751937866, 1.0], [1.0495916604995728, -0.003643840318545699, 0.0], [0.3128052353858948, -1.4149571657180786, 1.0], [0.5982630848884583, 0.18320368230342865, 1.0], [0.18022949993610382, 0.25801873207092285, 0.0], [0.16595952212810516, -0.13299407064914703, 0.0], [-0.13378912210464478, -0.1908259391784668, 0.0], [-0.15937936305999756, 0.17471861839294434, 0.0], [0.1980646848678589, 1.255338191986084, 1.0], [0.0009105221251957119, 2.4679317474365234, 0.0], [0.34270498156547546, -3.7866733074188232, 1.0], [0.6805010437965393, 1.4212716817855835, 1.0], [-0.0019534300081431866, 2.34584903717041, 0.0], [0.016765732318162918, -1.6243107318878174, 1.0], [0.4979449510574341, -0.49035611748695374, 0.0], [0.3457876741886139, -0.21783338487148285, 0.0], [0.5025186538696289, -0.0027510321233421564, 0.0], [0.32904762029647827, 0.1775556206703186, 0.0], [0.16864003241062164, 0.523478627204895, 0.0], [-0.0018375962972640991, 1.7632733583450317, 0.0], [0.17839553952217102, -3.812246561050415, 1.0], [2.3276472091674805, 1.5244632959365845, 1.0], [-0.0013267325703054667, 2.5359842777252197, 0.0], [0.0032229945063591003, -1.9675960540771484, 1.0], [-0.3122164011001587, -0.367974191904068, 0.0], [-0.3145785331726074, -0.17848920822143555, 0.0], [-0.49974191188812256, 0.004043962340801954, 0.0], [-0.32885318994522095, 0.18662217259407043, 0.0], [-0.3350566327571869, 0.36599892377853394, 0.0], [-0.18048636615276337, 0.542138397693634, 0.0], [0.00563541566953063, 0.3527034819126129, 0.0], [0.18287722766399384, 0.5259685516357422, 0.0], [0.32635927200317383, 0.3557986319065094, 0.0], [0.3270723521709442, 0.18045128881931305, 0.0], [0.3158933222293854, -0.0106904162093997, 0.0], [0.30796292424201965, -0.17574603855609894, 0.0], [0.3201761841773987, -0.3243746757507324, 0.0], [0.16220417618751526, -3.3731017112731934, 1.0], [0.5784546136856079, 1.4469200372695923, 1.0], [-0.00039035448571667075, 2.5600945949554443, 0.0], [0.013188166543841362, -1.6571133136749268, 1.0], [0.47653594613075256, -0.5032730102539062, 0.0], [0.3356824517250061, -0.24716538190841675, 0.0], [0.4722471535205841, -0.00410739379003644, 0.0], [0.3147507607936859, 0.16566485166549683, 0.0], [0.14487974345684052, -1.4651610851287842, 0.0], [1.7877775430679321, 1.1767264604568481, 1.0], [0.005579749587923288, 2.538180351257324, 0.0], [0.054018598049879074, -2.382500171661377, 1.0], [-0.2986114025115967, -0.3686903715133667, 0.0], [-0.2899724543094635, -0.18129076063632965, 0.0], [-0.47622981667518616, -0.013859806582331657, 0.0], [-0.3586561977863312, 0.14482274651527405, 0.0], [-0.32063549757003784, 0.3268495798110962, 0.0], [-0.1881733387708664, 0.5105396509170532, 0.0], [-0.0026333730202168226, 0.3491368889808655, 0.0], [0.16822437942028046, 0.5019826889038086, 0.0], [0.30961138010025024, 0.3408432602882385, 0.0], [0.31308621168136597, 0.17571115493774414, 0.0], [0.3095026910305023, -0.009972781874239445, 0.0], [0.3051081597805023, -0.1781030297279358, 0.0], [0.3094760775566101, -0.3214902877807617, 0.0], [0.15825137495994568, -3.3129465579986572, 1.0], [0.5604519844055176, 1.4387425184249878, 1.0], [0.0006478854338638484, 2.4532549381256104, 0.0], [0.01721438392996788, -1.5771528482437134, 1.0], [0.48102524876594543, -0.4800863265991211, 0.0], [0.32141992449760437, -0.2353902906179428, 0.0], [0.46579214930534363, -0.004930461291223764, 0.0], [0.31457221508026123, 0.1616501659154892, 0.0], [0.14393194019794464, -1.4392009973526, 0.0], [1.7667114734649658, 1.1613712310791016, 1.0], [0.006245996803045273, 2.513629674911499, 0.0], [0.05313422158360481, -2.3836586475372314, 1.0], [-0.2977291941642761, -0.3602675795555115, 0.0], [-0.29290640354156494, -0.17826209962368011, 0.0], [-0.4511161744594574, -0.017720161005854607, 0.0], [-0.3514808714389801, 0.14591775834560394, 0.0], [-0.31308093667030334, 0.32845818996429443, 0.0], [-0.1801762729883194, 0.5078292489051819, 0.0], [0.004493933171033859, 0.35084810853004456, 0.0], [0.17306436598300934, 0.5006166696548462, 0.0], [0.31144723296165466, 0.33540475368499756, 0.0], [0.31353244185447693, 0.1686694622039795, 0.0], [0.3074088990688324, -0.017046859487891197, 0.0], [0.2992636263370514, -0.18337078392505646, 0.0], [0.3054608702659607, -0.3252495229244232, 0.0], [0.15666380524635315, -3.281937837600708, 1.0], [0.5513653755187988, 1.4262750148773193, 1.0], [-0.0004184262070339173, 2.52774977684021, 0.0], [0.013096092268824577, -1.6239104270935059, 1.0], [0.4682175815105438, -0.49508988857269287, 0.0], [0.3182017505168915, -0.23897647857666016, 0.0], [0.4658689498901367, -0.0059382179751992226, 0.0], [0.31159162521362305, 0.15981075167655945, 0.0], [0.14004790782928467, -1.4491132497787476, 0.0], [1.7648323774337769, 1.190798282623291, 1.0], [0.006368771195411682, 2.4997472763061523, 0.0], [0.05001996085047722, -2.3346829414367676, 1.0], [-0.2942211925983429, -0.36508506536483765, 0.0], [-0.28632816672325134, -0.1827842891216278, 0.0], [-0.46983569860458374, -0.01466560922563076, 0.0], [-0.3497154116630554, 0.145054429769516, 0.0], [-0.32106709480285645, 0.3280613422393799, 0.0], [-0.19185948371887207, 0.5029692053794861, 0.0], [-0.005074725951999426, 0.3460178077220917, 0.0], [0.16557614505290985, 0.49744874238967896, 0.0], [0.3118666708469391, 0.3376234769821167, 0.0], [0.31546032428741455, 0.17625999450683594, 0.0], [0.3065899908542633, -0.0056822397746145725, 0.0], [0.29920074343681335, -0.17344145476818085, 0.0], [0.30528703331947327, -0.3180035948753357, 0.0], [0.15835747122764587, -3.2986838817596436, 1.0], [0.5554870963096619, 1.4281635284423828, 1.0], [0.0007468526600860059, 2.474752187728882, 0.0], [0.014364433474838734, -1.6057937145233154, 1.0], [0.4748761057853699, -0.4874173104763031, 0.0], [0.3273712992668152, -0.24463176727294922, 0.0], [0.47414398193359375, -0.005612584296613932, 0.0], [0.3121529221534729, 0.16227494180202484, 0.0], [0.14324092864990234, -1.435598373413086, 0.0], [1.7190356254577637, 1.1193201541900635, 1.0], [0.005724131595343351, 2.56463885307312, 0.0], [0.0518583208322525, -2.3813235759735107, 1.0], [-0.29405462741851807, -0.36337271332740784, 0.0], [-0.290645956993103, -0.17912811040878296, 0.0], [0.338756263256073, -0.000695020251441747, 0.0], [-0.3707616329193115, 0.11984415352344513, 0.0], [-0.2389584332704544, 0.2860160171985626, 0.0], [-0.19956901669502258, 0.45179039239883423, 0.0], [-0.046647604554891586, 0.3710126280784607, 0.0], [0.08309002965688705, 0.4532761573791504, 0.0], [0.1999763697385788, 0.4204607605934143, 0.0], [0.2790040373802185, 0.24982307851314545, 0.0], [0.2794203758239746, 0.06779536604881287, 0.0], [0.27444881200790405, -0.11406037956476212, 0.0], [0.28290417790412903, -0.2722131907939911, 0.0], [0.13504652678966522, -3.3904356956481934, 1.0], [0.4982866942882538, 1.4519941806793213, 1.0], [0.0010784845799207687, 2.4449384212493896, 0.0], [0.017686592414975166, -1.5849310159683228, 1.0], [0.4499885141849518, -0.4850080907344818, 0.0], [0.31265655159950256, -0.24515686929225922, 0.0], [0.44791871309280396, -0.007371352985501289, 0.0], [0.3029584288597107, 0.16297857463359833, 0.0], [0.13920800387859344, -1.4522734880447388, 0.0], [1.6901851892471313, 1.129677176475525, 1.0], [0.005375043489038944, 2.5738604068756104, 0.0], [0.0505201630294323, -2.3866028785705566, 1.0], [-0.28621524572372437, -0.3660646677017212, 0.0], [-0.28493982553482056, -0.18143722414970398, 0.0], [0.34336939454078674, -0.0019713817164301872, 0.0], [-0.3764582574367523, 0.12166356295347214, 0.0], [-0.24070726335048676, 0.2862267792224884, 0.0], [-0.1967158317565918, 0.4483843147754669, 0.0], [-0.04410399869084358, 0.3677612543106079, 0.0], [0.0862608477473259, 0.45908322930336, 0.0], [0.20081643760204315, 0.410354346036911, 0.0], [0.2834048271179199, 0.24295848608016968, 0.0], [0.2769588828086853, 0.06375094503164291, 0.0], [0.27372148633003235, -0.11768592894077301, 0.0], [0.2803889513015747, -0.2737511396408081, 0.0], [0.1356932818889618, -3.3944694995880127, 0.0], [0.5726780295372009, 0.12356345355510712, 1.0], [-0.005448345560580492, 3.5211522579193115, 0.0], [0.13600212335586548, -3.539775848388672, 1.0], [0.5602893233299255, 0.15958942472934723, 1.0], [-0.0006723510450683534, 3.393047571182251, 0.0], [0.14066122472286224, 0.6237789392471313, 1.0], [0.3941135108470917, 0.14772941172122955, 0.0], [0.30395635962486267, -0.055102601647377014, 0.0], [-1.2514218091964722, -2.501739740371704, 1.0], [1.1119499206542969, -0.00363744143396616, 0.0], [0.32832854986190796, -1.4091533422470093, 1.0], [0.606762707233429, 0.18673944473266602, 1.0], [0.18351373076438904, 0.23838306963443756, 0.0], [0.15833330154418945, -0.17196249961853027, 0.0], [-0.14204920828342438, -0.19031938910484314, 0.0], [-0.16299088299274445, 0.17216593027114868, 0.0], [0.19066302478313446, 1.2671695947647095, 1.0], [0.002777683548629284, 2.5182502269744873, 0.0], [0.34873855113983154, -3.8260347843170166, 1.0], [0.6880738139152527, 1.4283943176269531, 1.0], [-0.0023291539400815964, 2.4385013580322266, 0.0], [0.014593489468097687, -1.6586220264434814, 1.0], [0.5105984210968018, -0.5037701725959778, 0.0], [0.35172006487846375, -0.22272910177707672, 0.0], [0.5026130080223083, -0.002082214457914233, 0.0], [0.3283258080482483, 0.18002375960350037, 0.0]], [[2.3224544525146484, 1.679247260093689, 1.0], [-0.22866618633270264, -0.32436805963516235, 0.0], [-0.41923877596855164, -0.15988798439502716, 0.0], [-0.4841742217540741, -0.0009633388253860176, 0.0], [-0.2915768027305603, 0.17881937325000763, 0.0], [-0.23168644309043884, 0.3356240391731262, 0.0], [0.07854233682155609, 0.3507534861564636, 0.0], [0.14640337228775024, 0.3793983459472656, 0.0], [0.20306329429149628, 0.41512778401374817, 0.0], [0.26492196321487427, 0.3777829110622406, 0.0], [0.29622000455856323, 0.2023371458053589, 0.0], [0.29540950059890747, 0.02730930782854557, 0.0], [0.2937723696231842, -0.13873842358589172, 0.0], [0.297850102186203, -0.2850704789161682, 0.0], [0.1470336765050888, -3.287116289138794, 1.0], [0.5238302946090698, 1.3881078958511353, 1.0], [0.0010552117601037025, 2.295257091522217, 0.0], [0.020707232877612114, -1.4719536304473877, 1.0], [0.4528788924217224, -0.45123565196990967, 0.0], [0.3174702823162079, -0.22341957688331604, 0.0], [0.45245492458343506, -0.008570242673158646, 0.0], [0.3035966753959656, 0.14878523349761963, 0.0], [0.13765716552734375, -1.4024415016174316, 0.0], [1.6687469482421875, 1.07797372341156, 1.0], [0.005549820605665445, 2.4712700843811035, 0.0], [0.05517943575978279, -2.3216915130615234, 1.0], [-0.29264774918556213, -0.35116341710090637, 0.0], [-0.3062562942504883, -0.1983499675989151, 0.0], [0.3372604250907898, -0.0018768587615340948, 0.0], [-0.3774363696575165, 0.11457309126853943, 0.0], [-0.23645031452178955, 0.28146830201148987, 0.0], [-0.1969384253025055, 0.43844833970069885, 0.0], [-0.04243612661957741, 0.357558935880661, 0.0], [0.09334710240364075, 0.4454345405101776, 0.0], [0.21107544004917145, 0.40477630496025085, 0.0], [0.2748637795448303, 0.23475255072116852, 0.0], [0.2769030034542084, 0.05682505667209625, 0.0], [0.27977296710014343, -0.12039963155984879, 0.0], [0.27922576665878296, -0.2689542770385742, 0.0], [0.1357899159193039, -3.3313331604003906, 1.0], [0.5072571039199829, 1.425297498703003, 1.0], [8.85246554389596e-05, 2.3811087608337402, 0.0], [0.018885664641857147, -1.5430666208267212, 1.0], [0.4497198164463043, -0.4736425280570984, 0.0], [0.31475895643234253, -0.24168124794960022, 0.0], [0.4420378804206848, -0.0071547371335327625, 0.0], [0.3027642071247101, 0.1578378528356552, 0.0], [0.13701067864894867, -1.423964262008667, 0.0], [0.4914608299732208, 1.157508134841919, 1.0], [0.005592837929725647, 2.309393882751465, 0.0], [0.013774228282272816, -1.5843944549560547, 1.0], [0.4894702136516571, -0.4732971489429474, 0.0], [0.3288378417491913, -0.19623424112796783, 0.0], [0.4823456108570099, -0.006816747598350048, 0.0], [0.3147647976875305, 0.1738360971212387, 0.0], [0.16703283786773682, 0.5135671496391296, 0.0], [0.0003688247816171497, 1.751317024230957, 0.0], [0.1706312596797943, -3.7389583587646484, 1.0], [2.2513654232025146, 1.5227200984954834, 1.0], [-0.0005620897281914949, 2.43562912940979, 0.0], [0.003439251333475113, -1.9441180229187012, 1.0], [-0.30509841442108154, -0.3619612455368042, 0.0], [-0.3107186257839203, -0.17699386179447174, 0.0], [-0.4882684051990509, 0.004648757167160511, 0.0], [-0.33412113785743713, 0.1855163723230362, 0.0], [-0.33118006587028503, 0.3611592650413513, 0.0], [-0.17452099919319153, 0.5323476791381836, 0.0], [0.007189629599452019, 0.3451845049858093, 0.0], [0.18309254944324493, 0.5199340581893921, 0.0], [0.32468509674072266, 0.3512956202030182, 0.0], [0.32226458191871643, 0.17388147115707397, 0.0], [0.31233641505241394, -0.014708352275192738, 0.0], [0.3097088634967804, -0.18136489391326904, 0.0], [0.31482866406440735, -0.3276464343070984, 0.0], [0.1603621542453766, -3.3272061347961426, 1.0], [0.5767368078231812, 1.4309523105621338, 1.0], [0.0005520572303794324, 2.4569592475891113, 0.0], [0.01514432206749916, -1.5641958713531494, 1.0], [0.4716990888118744, -0.4731537997722626, 0.0], [0.3287331163883209, -0.23684559762477875, 0.0], [0.4709503948688507, -0.004305247217416763, 0.0], [0.31816235184669495, 0.15791285037994385, 0.0], [0.14439362287521362, -1.4245694875717163, 1.0], [2.1754653453826904, 1.46755850315094, 1.0], [0.00029439222998917103, 2.259319305419922, 0.0], [0.021238913759589195, -1.9847729206085205, 1.0], [-0.30194780230522156, -0.3457743227481842, 0.0], [-0.30472445487976074, -0.17331063747406006, 0.0], [-0.49215996265411377, 0.0010015564039349556, 0.0], [-0.341515451669693, 0.16256068646907806, 0.0], [-0.3426385521888733, 0.33414581418037415, 0.0], [-0.1889784187078476, 0.5054630637168884, 0.0], [-0.0027350501623004675, 0.33986276388168335, 0.0], [0.17758487164974213, 0.5002251267433167, 0.0], [0.32310521602630615, 0.34260112047195435, 0.0], [0.32555294036865234, 0.1785425990819931, 0.0], [0.31523388624191284, -0.005934880115091801, 0.0], [0.32143741846084595, -0.16621115803718567, 0.0], [0.320632666349411, -0.3104603588581085, 0.0], [0.16480174660682678, -3.2562026977539062, 1.0], [0.5815241932868958, 1.396106243133545, 1.0], [0.0007802765467204154, 2.4324769973754883, 0.0], [0.015120387077331543, -1.544676423072815, 1.0], [0.48444443941116333, -0.468662291765213, 0.0], [0.33062946796417236, -0.2341122329235077, 0.0], [0.47079169750213623, -0.004438349511474371, 0.0], [0.31374263763427734, 0.15875400602817535, 0.0], [0.1447441726922989, -1.4140456914901733, 0.0], [1.7880507707595825, 1.1189278364181519, 1.0], [0.006608589552342892, 2.515812635421753, 0.0], [0.05434732511639595, -2.322479724884033, 1.0], [-0.29729360342025757, -0.3593973219394684, 0.0], [-0.2910625636577606, -0.17491087317466736, 0.0], [-0.4761207401752472, -0.014316943474113941, 0.0], [-0.35163119435310364, 0.14651861786842346, 0.0], [-0.3175514340400696, 0.324509859085083, 0.0], [-0.18416793644428253, 0.500214159488678, 0.0], [0.0031399650033563375, 0.34196141362190247, 0.0], [0.17241381108760834, 0.4930516481399536, 0.0], [0.308523565530777, 0.3316125273704529, 0.0], [0.31283050775527954, 0.16954822838306427, 0.0], [0.3081912398338318, -0.0143252182751894, 0.0], [0.30697983503341675, -0.18197035789489746, 0.0], [0.3051908612251282, -0.3192233741283417, 0.0], [0.15868473052978516, -3.2338602542877197, 1.0], [0.5540907979011536, 1.4093079566955566, 1.0], [0.0005677814478985965, 2.4201700687408447, 0.0], [0.01375819556415081, -1.5546565055847168, 1.0], [0.4694640040397644, -0.47520118951797485, 0.0], [0.32897794246673584, -0.23970481753349304, 0.0], [0.46796926856040955, -0.0057822889648377895, 0.0], [0.31373023986816406, 0.1570816934108734, 0.0], [0.14073941111564636, -1.397538423538208, 0.0], [1.730109691619873, 1.0557303428649902, 1.0], [0.0055413139052689075, 2.5280282497406006, 0.0], [0.05774601176381111, -2.326711654663086, 1.0], [-0.2954171597957611, -0.35695964097976685, 0.0], [-0.28698062896728516, -0.17445817589759827, 0.0], [0.33588945865631104, -0.0008524211007170379, 0.0], [-0.3813343644142151, 0.1198105663061142, 0.0], [-0.2427356094121933, 0.2834825813770294, 0.0], [-0.20090064406394958, 0.4405257999897003, 0.0], [-0.04818151891231537, 0.359458863735199, 0.0], [0.08549772202968597, 0.4485306739807129, 0.0], [0.2062338888645172, 0.4093014597892761, 0.0], [0.2808436453342438, 0.24407824873924255, 0.0], [0.27706173062324524, 0.0675804540514946, 0.0], [0.27786147594451904, -0.11200197786092758, 0.0], [0.28081151843070984, -0.2679731249809265, 0.0], [0.13550209999084473, -3.360426664352417, 1.0], [0.49779945611953735, 1.4226475954055786, 1.0], [0.0016326713375747204, 2.4326882362365723, 0.0], [0.01776413805782795, -1.5703867673873901, 1.0], [0.4450990557670593, -0.4812316596508026, 0.0], [0.3102759122848511, -0.2429385930299759, 0.0], [0.4481222927570343, -0.008256334811449051, 0.0], [0.3020355701446533, 0.15756745636463165, 0.0], [0.13885398209095, -1.4514795541763306, 0.0], [1.6945637464523315, 1.1340124607086182, 1.0], [0.005257440730929375, 2.522913694381714, 0.0], [0.04682783782482147, -2.3275516033172607, 1.0], [-0.2850717604160309, -0.36088934540748596, 0.0], [-0.2837457060813904, -0.1789393126964569, 0.0], [0.330441951751709, -0.0017568570328876376, 0.0], [-0.37111684679985046, 0.11965145915746689, 0.0], [-0.24270665645599365, 0.2791774868965149, 0.0], [-0.19787253439426422, 0.4398823380470276, 0.0], [-0.04652293026447296, 0.3680444061756134, 0.0], [0.08707372844219208, 0.44736388325691223, 0.0], [0.20157893002033234, 0.4147721529006958, 0.0], [0.27899330854415894, 0.24670396745204926, 0.0], [0.27762699127197266, 0.06731368601322174, 0.0], [0.27438703179359436, -0.1100316047668457, 0.0], [0.2809312641620636, -0.2642752230167389, 0.0], [0.1358020156621933, -3.3710057735443115, 1.0], [0.589126467704773, 0.16707955300807953, 1.0], [-0.0022113407030701637, 3.5241470336914062, 0.0], [0.14216677844524384, 0.5986594557762146, 1.0], [0.39061427116394043, 0.13588017225265503, 0.0], [0.2862218916416168, -0.07818737626075745, 0.0], [-1.226082682609558, -2.519988536834717, 1.0], [1.0561820268630981, -0.0044183917343616486, 0.0], [0.3127457797527313, -1.4168859720230103, 1.0], [0.5733691453933716, 0.1861225813627243, 1.0], [0.1768510490655899, 0.2409200370311737, 0.0], [0.1676812618970871, -0.1176978051662445, 0.0], [-0.1397264152765274, -0.19708989560604095, 0.0], [-0.15889473259449005, 0.17253224551677704, 0.0], [0.1968795508146286, 1.263602375984192, 1.0], [0.002741434145718813, 2.503046989440918, 0.0], [0.34149226546287537, -3.815584897994995, 1.0], [2.376091480255127, 1.7315073013305664, 1.0], [-0.003141241380944848, 2.3075642585754395, 0.0], [0.007489342242479324, -2.0012781620025635, 1.0], [-0.3203268051147461, -0.36492738127708435, 0.0], [-0.32250893115997314, -0.1829831451177597, 0.0], [-0.5072044730186462, 0.006349575240164995, 0.0], [-0.34839537739753723, 0.18395471572875977, 0.0], [-0.3396354019641876, 0.36459171772003174, 0.0], [-0.17417514324188232, 0.5441604852676392, 0.0], [0.00848926231265068, 0.35127297043800354, 0.0], [0.18521557748317719, 0.5345513224601746, 0.0], [0.3285790681838989, 0.3624482750892639, 0.0], [0.33113893866539, 0.18316945433616638, 0.0], [0.5080549716949463, -0.0020219816360622644, 0.0], [0.3288075029850006, -0.18165603280067444, 0.0], [0.3285534679889679, -0.3541466295719147, 0.0], [0.17011034488677979, -3.360989809036255, 1.0], [0.6164815425872803, 1.453999638557434, 1.0], [4.042424916406162e-05, 2.4558792114257812, 0.0], [0.017388517037034035, -1.6222190856933594, 1.0], [0.4923483729362488, -0.4942304491996765, 0.0], [0.3355693519115448, -0.23950040340423584, 0.0], [0.48283252120018005, -0.002800148678943515, 0.0], [0.3177639842033386, 0.16622917354106903, 0.0], [0.1457344889640808, -1.429851770401001, 0.0], [1.7955876588821411, 1.129503607749939, 1.0], [0.005493873730301857, 2.531261444091797, 0.0], [0.05318395793437958, -2.378910541534424, 1.0], [-0.30494993925094604, -0.36148136854171753, 0.0], [-0.2979227602481842, -0.17833642661571503, 0.0], [-0.4531109035015106, -0.012119919061660767, 0.0], [-0.3537605106830597, 0.14456616342067719, 0.0], [-0.3259942829608917, 0.3245227336883545, 0.0], [-0.1837838739156723, 0.5055965185165405, 0.0], [-0.000894932309165597, 0.3425578474998474, 0.0], [0.16375406086444855, 0.5025188326835632, 0.0], [0.3112829327583313, 0.342133492231369, 0.0], [0.31634029746055603, 0.18045566976070404, 0.0], [0.30403614044189453, -0.0038690485525876284, 0.0], [0.3076828420162201, -0.17052361369132996, 0.0], [0.30676668882369995, -0.3132157027721405, 0.0], [0.15627533197402954, -3.329148292541504, 1.0], [0.5666965246200562, 1.4314602613449097, 1.0]], [[2.380498170852661, 1.6901224851608276, 1.0], [-0.20688076317310333, -0.32783859968185425, 0.0], [-0.4095887243747711, -0.16524867713451385, 0.0], [-0.4858415126800537, -0.00698107061907649, 0.0], [-0.30890175700187683, 0.17252284288406372, 0.0], [-0.2526889145374298, 0.32498645782470703, 0.0], [0.07419832050800323, 0.3549386262893677, 0.0], [0.14226414263248444, 0.37269270420074463, 0.0], [0.20801134407520294, 0.4211675524711609, 0.0], [0.2750774621963501, 0.3743169903755188, 0.0], [0.2977578341960907, 0.20426444709300995, 0.0], [0.295695036649704, 0.03211823105812073, 0.0], [0.29000306129455566, -0.1293516606092453, 0.0], [0.2957611680030823, -0.27485302090644836, 0.0], [0.14757190644741058, -3.296753168106079, 1.0], [0.5196022391319275, 1.3890758752822876, 1.0], [0.0015615213196724653, 2.3577780723571777, 0.0], [0.017904814332723618, -1.5267635583877563, 1.0], [0.45419764518737793, -0.4688730835914612, 0.0], [0.3152638375759125, -0.2353404015302658, 0.0], [0.4519762396812439, -0.007301580626517534, 0.0], [0.30470556020736694, 0.1561281383037567, 0.0], [0.13932247459888458, -1.4225491285324097, 0.0], [1.7314223051071167, 1.1316196918487549, 1.0], [0.005803345236927271, 2.479891300201416, 0.0], [0.049871545284986496, -2.3002607822418213, 1.0], [-0.29139137268066406, -0.35570091009140015, 0.0], [-0.3056179881095886, -0.2034831941127777, 0.0], [0.33693528175354004, -0.00035310114617459476, 0.0], [-0.3894822895526886, 0.11521196365356445, 0.0], [-0.2406647801399231, 0.28000709414482117, 0.0], [-0.20693615078926086, 0.43685382604599, 0.0], [-0.051432859152555466, 0.3627973794937134, 0.0], [0.08384019136428833, 0.4417247474193573, 0.0], [0.20736674964427948, 0.4049322009086609, 0.0], [0.28014233708381653, 0.24209710955619812, 0.0], [0.2834794521331787, 0.06966940313577652, 0.0], [0.2776467204093933, -0.11280658096075058, 0.0], [0.28102555871009827, -0.26556146144866943, 0.0], [0.1365373581647873, -3.331526041030884, 1.0], [0.5039384365081787, 1.41302490234375, 1.0], [-0.0003893316024914384, 2.4165022373199463, 0.0], [0.015617242082953453, -1.55344820022583, 1.0], [0.44456517696380615, -0.47720998525619507, 0.0], [0.3069964051246643, -0.237229123711586, 0.0], [0.44178733229637146, -0.008007912896573544, 0.0], [0.29734936356544495, 0.1551171839237213, 0.0], [0.1360941380262375, -1.4262908697128296, 0.0], [1.859106421470642, 1.1079258918762207, 1.0], [0.005656271707266569, 2.559377670288086, 0.0], [0.04482363909482956, -2.2781689167022705, 1.0], [-0.295507550239563, -0.3562732934951782, 0.0], [-0.2922855317592621, -0.17806534469127655, 0.0], [-0.474804550409317, -0.010293906554579735, 0.0], [-0.3472960293292999, 0.14914683997631073, 0.0], [-0.3186562955379486, 0.3254537880420685, 0.0], [-0.18133015930652618, 0.5063532590866089, 0.0], [0.005861691199243069, 0.3426467180252075, 0.0], [0.17127874493598938, 0.4959060251712799, 0.0], [0.30800023674964905, 0.3329930007457733, 0.0], [0.3190660774707794, 0.17287763953208923, 0.0], [0.31143075227737427, -0.01391768828034401, 0.0], [0.3009333610534668, -0.1773831695318222, 0.0], [0.30897223949432373, -0.31893718242645264, 0.0], [0.15698230266571045, -3.2447831630706787, 1.0], [0.5574967861175537, 1.4035228490829468, 1.0], [0.00023511146719101816, 2.403290271759033, 0.0], [0.014516153372824192, -1.5683211088180542, 1.0], [0.4812593162059784, -0.47930315136909485, 0.0], [0.31816020607948303, -0.230717733502388, 0.0], [0.4641840159893036, -0.004587214440107346, 0.0], [0.31117767095565796, 0.16332969069480896, 0.0], [0.14256589114665985, -1.4231853485107422, 0.0], [1.766523003578186, 1.144438624382019, 1.0], [0.005692734848707914, 2.507460117340088, 0.0], [0.04782525449991226, -2.302309036254883, 1.0], [-0.2926059365272522, -0.3551328778266907, 0.0], [-0.29087159037590027, -0.17583319544792175, 0.0], [0.34214887022972107, 0.0013641853583976626, 0.0], [-0.38563328981399536, 0.11914215236902237, 0.0], [-0.24200326204299927, 0.2865177392959595, 0.0], [-0.20284761488437653, 0.4429698884487152, 0.0], [-0.04727980121970177, 0.3637896478176117, 0.0], [0.08617784082889557, 0.4456993043422699, 0.0], [0.20087838172912598, 0.4063877463340759, 0.0], [0.2834261953830719, 0.24107888340950012, 0.0], [0.2867833971977234, 0.06357710808515549, 0.0], [0.278776615858078, -0.11588197946548462, 0.0], [0.2856752574443817, -0.2718198299407959, 0.0], [0.1381799876689911, -3.3447744846343994, 1.0], [0.5029770731925964, 1.4146069288253784, 1.0], [3.5749228118220344e-05, 2.386101007461548, 0.0], [0.016833744943141937, -1.5678131580352783, 1.0], [0.44744277000427246, -0.4804275929927826, 0.0], [0.3034023344516754, -0.23402030766010284, 0.0], [0.44107747077941895, -0.008059248328208923, 0.0], [0.30160653591156006, 0.16053016483783722, 0.0], [0.1364169418811798, -1.4243587255477905, 0.0], [1.6868813037872314, 1.1139192581176758, 1.0], [0.0062699094414711, 2.530487537384033, 0.0], [0.051476702094078064, -2.3474581241607666, 1.0], [-0.2863057553768158, -0.3632344603538513, 0.0], [-0.30333712697029114, -0.20494802296161652, 0.0], [0.3337756395339966, -0.0004186855221632868, 0.0], [-0.37252917885780334, 0.11886777728796005, 0.0], [-0.24208009243011475, 0.2835536599159241, 0.0], [-0.19536563754081726, 0.44381704926490784, 0.0], [-0.03877077251672745, 0.36518484354019165, 0.0], [0.09090351313352585, 0.4496974050998688, 0.0], [0.20611189305782318, 0.4087454378604889, 0.0], [0.2794785797595978, 0.2396705001592636, 0.0], [0.2795935273170471, 0.0607147254049778, 0.0], [0.27307459712028503, -0.1176096647977829, 0.0], [0.27932387590408325, -0.27222102880477905, 0.0], [0.13560980558395386, -3.3621835708618164, 1.0], [0.5034963488578796, 1.42436683177948, 1.0], [0.0001410503900842741, 2.441110610961914, 0.0], [0.017592573538422585, -1.554383397102356, 1.0], [0.45089656114578247, -0.47613611817359924, 0.0], [0.3059028685092926, -0.23703491687774658, 0.0], [0.44281840324401855, -0.008498115465044975, 0.0], [0.3015317916870117, 0.15501853823661804, 0.0], [0.1364506185054779, -1.4466291666030884, 0.0], [1.691669225692749, 1.122248649597168, 1.0], [0.00609815726056695, 2.5694024562835693, 0.0], [0.05035896226763725, -2.359776020050049, 1.0], [-0.289313405752182, -0.36382824182510376, 0.0], [-0.2824857234954834, -0.17771215736865997, 0.0], [0.33629345893859863, -0.001982056302949786, 0.0], [-0.37307554483413696, 0.11985936760902405, 0.0], [-0.2394963800907135, 0.2851443588733673, 0.0], [-0.19469580054283142, 0.44833502173423767, 0.0], [-0.042191337794065475, 0.36807355284690857, 0.0], [0.08791442215442657, 0.449070006608963, 0.0], [0.2030966430902481, 0.4143217206001282, 0.0], [0.28230345249176025, 0.2432701140642166, 0.0], [0.28446629643440247, 0.06447131931781769, 0.0], [0.2779599130153656, -0.11966467648744583, 0.0], [0.2744956612586975, -0.27139320969581604, 0.0], [0.13510233163833618, -3.4079344272613525, 0.0], [0.5695594549179077, 0.12509891390800476, 1.0], [-0.004063295666128397, 3.573103427886963, 0.0], [0.15010887384414673, -3.7234768867492676, 1.0], [0.5645039081573486, 0.166207954287529, 1.0], [-0.0010008628014475107, 3.48944091796875, 0.0], [0.1415005624294281, 0.6161109209060669, 1.0], [0.3934022784233093, 0.14006415009498596, 0.0], [0.30264556407928467, -0.05975913256406784, 0.0], [-1.2345150709152222, -2.5216190814971924, 1.0], [1.1002883911132812, -0.003239286132156849, 0.0], [0.3274019956588745, -1.4328107833862305, 1.0], [0.612177848815918, 0.18776975572109222, 1.0], [0.1843808889389038, 0.24071572721004486, 0.0], [0.15562692284584045, -0.16761678457260132, 0.0], [-0.1438869684934616, -0.19453492760658264, 0.0], [-0.1716804951429367, 0.16483044624328613, 0.0], [0.19079697132110596, 1.2892428636550903, 1.0], [0.002833804115653038, 2.5066306591033936, 0.0], [0.34540754556655884, -3.8503050804138184, 1.0], [0.677994966506958, 1.4457851648330688, 1.0], [-0.0019343832973390818, 2.3877456188201904, 0.0], [0.017656804993748665, -1.6894550323486328, 1.0], [0.5169638991355896, -0.5125860571861267, 0.0], [0.34773221611976624, -0.21301481127738953, 0.0], [0.5068603157997131, -0.0033628561068326235, 0.0], [0.32610294222831726, 0.1836811602115631, 0.0], [0.16277816891670227, 0.530123233795166, 0.0], [0.0004785992787219584, 1.814618706703186, 0.0], [0.17630073428153992, -3.8732333183288574, 1.0], [2.3265461921691895, 1.6019599437713623, 1.0], [-0.002111265202984214, 2.5116121768951416, 0.0], [-0.0018831182969734073, -1.9857680797576904, 1.0], [-0.31130251288414, -0.3702544867992401, 0.0], [-0.31705257296562195, -0.18235957622528076, 0.0], [-0.5021848082542419, 0.005572824273258448, 0.0], [-0.3318706452846527, 0.1887289136648178, 0.0], [-0.3431966006755829, 0.3704378306865692, 0.0], [-0.16865457594394684, 0.5542687773704529, 0.0], [0.015442010946571827, 0.3515170216560364, 0.0], [0.19098986685276031, 0.5408718585968018, 0.0], [0.3248109519481659, 0.36221402883529663, 0.0], [0.3256472647190094, 0.17931221425533295, 0.0], [0.4953923523426056, -0.002636355347931385, 0.0], [0.3253460228443146, -0.18896320462226868, 0.0], [0.3262415826320648, -0.3613164722919464, 0.0], [0.16764865815639496, -3.4061920642852783, 1.0], [0.5918977856636047, 1.4696276187896729, 1.0], [-0.0016456166049465537, 2.4223968982696533, 0.0], [0.018332643434405327, -1.5799559354782104, 1.0], [0.48740577697753906, -0.4801907241344452, 0.0], [0.3346097469329834, -0.231500044465065, 0.0], [0.4819560945034027, -0.005029621068388224, 0.0], [0.32114851474761963, 0.16479414701461792, 0.0], [0.14408031105995178, -1.4478827714920044, 0.0], [1.7613601684570312, 1.190529465675354, 1.0], [0.005873950198292732, 2.566486358642578, 0.0], [0.054399337619543076, -2.4329679012298584, 1.0], [-0.2989696264266968, -0.3671191334724426, 0.0], [-0.28833895921707153, -0.1814330518245697, 0.0], [0.35592323541641235, -0.0006289504235610366, 0.0], [-0.3855576515197754, 0.12052175402641296, 0.0], [-0.2417583465576172, 0.2877027094364166, 0.0], [-0.20128774642944336, 0.4493245482444763, 0.0], [-0.04582754895091057, 0.37241998314857483, 0.0], [0.08605101704597473, 0.4580742120742798, 0.0], [0.2028731405735016, 0.4157768189907074, 0.0], [0.28787264227867126, 0.24715518951416016, 0.0], [0.2827669382095337, 0.06795836240053177, 0.0], [0.2738840878009796, -0.1135585829615593, 0.0], [0.28447121381759644, -0.27163851261138916, 0.0], [0.13702690601348877, -3.435189962387085, 1.0], [0.5265851020812988, 1.4586559534072876, 1.0], [-0.0002894336939789355, 2.4299209117889404, 0.0], [0.016949551180005074, -1.6127493381500244, 1.0], [0.45529040694236755, -0.4928947985172272, 0.0], [0.3164813816547394, -0.23792052268981934, 0.0], [0.4547058343887329, -0.008015396073460579, 0.0], [0.3040056526660919, 0.16546282172203064, 0.0], [0.13955871760845184, -1.4575923681259155, 0.0], [0.4935424327850342, 1.2064902782440186, 1.0], [0.006091554183512926, 2.3627171516418457, 0.0], [0.013565272092819214, -1.6162564754486084, 1.0], [0.4961899220943451, -0.4866170883178711, 0.0], [0.3376956284046173, -0.20988427102565765, 0.0], [0.48720112442970276, -0.005952885374426842, 0.0], [0.32201075553894043, 0.1762278825044632, 0.0], [0.1635507047176361, 0.5249398946762085, 0.0], [0.0006393301882781088, 1.7993881702423096, 0.0], [0.1712852567434311, -3.871180534362793, 1.0], [2.2719244956970215, 1.5512022972106934, 1.0], [-0.00126946612726897, 2.5065219402313232, 0.0], [-0.002450467785820365, -1.9632415771484375, 1.0], [-0.30728277564048767, -0.36372771859169006, 0.0], [-0.31248900294303894, -0.18286386132240295, 0.0]], [[2.3222498893737793, 1.6456356048583984, 1.0], [0.0004652499919757247, 2.4641401767730713, 0.0], [0.0031477573793381453, -2.0515549182891846, 1.0], [-0.295288622379303, -0.3679075241088867, 0.0], [-0.3095518946647644, -0.18106237053871155, 0.0], [-0.4931536614894867, 0.0008613817626610398, 0.0], [-0.3290579319000244, 0.18409058451652527, 0.0], [-0.3338891863822937, 0.3633095622062683, 0.0], [-0.16507287323474884, 0.5453720092773438, 0.0], [0.012462062761187553, 0.3540651202201843, 0.0], [0.18396571278572083, 0.5272985100746155, 0.0], [0.3197031319141388, 0.35426807403564453, 0.0], [0.3201601207256317, 0.1751488298177719, 0.0], [0.3107430636882782, -0.013461465016007423, 0.0], [0.29927465319633484, -0.1820290982723236, 0.0], [0.31078994274139404, -0.3352105915546417, 0.0], [0.15720823407173157, -3.3424222469329834, 1.0], [0.6428678035736084, 0.17407463490962982, 1.0], [-0.0034070161636918783, 3.5412588119506836, 0.0], [0.15085172653198242, 0.5984372496604919, 1.0], [0.40897345542907715, 0.13618552684783936, 0.0], [0.3065263628959656, -0.07165008038282394, 0.0], [-1.2493722438812256, -2.523068428039551, 1.0], [1.1127688884735107, -0.0028820550069212914, 0.0], [0.32786113023757935, -1.4428281784057617, 1.0], [0.6131861805915833, 0.18865236639976501, 1.0], [0.18466807901859283, 0.24874703586101532, 0.0], [0.16788937151432037, -0.11938688904047012, 0.0], [-0.1413482129573822, -0.1952718198299408, 0.0], [-0.1629851758480072, 0.17419391870498657, 0.0], [0.19416894018650055, 1.2712795734405518, 1.0], [0.003368079662322998, 2.512178897857666, 0.0], [0.34680038690567017, -3.852396249771118, 1.0], [0.6872204542160034, 1.4472557306289673, 1.0], [-0.0033329983707517385, 2.3858249187469482, 0.0], [0.016444746404886246, -1.623862862586975, 1.0], [0.5129285454750061, -0.4927956759929657, 0.0], [0.3388001620769501, -0.20586150884628296, 0.0], [0.49586811661720276, -0.003177800914272666, 0.0], [0.3323155343532562, 0.1779610961675644, 0.0], [0.16606920957565308, 0.5292086005210876, 0.0], [-0.0006573533755727112, 1.7917290925979614, 0.0], [0.17377078533172607, -3.8596904277801514, 1.0], [2.3054637908935547, 1.5437208414077759, 1.0], [-0.0024550955276936293, 2.5084125995635986, 0.0], [0.0019843722693622112, -1.9834429025650024, 1.0], [-0.3057848811149597, -0.3637769818305969, 0.0], [-0.31346869468688965, -0.18066269159317017, 0.0], [-0.4916003942489624, 0.005275794304907322, 0.0], [-0.33285409212112427, 0.1887086182832718, 0.0], [-0.34784573316574097, 0.3651575446128845, 0.0], [-0.1773487627506256, 0.540489673614502, 0.0], [0.007894369773566723, 0.3520596921443939, 0.0], [0.18312279880046844, 0.5309913158416748, 0.0], [0.31927329301834106, 0.3584197163581848, 0.0], [0.3215983211994171, 0.18462660908699036, 0.0], [0.3179342448711395, -0.00409220065921545, 0.0], [0.3114747405052185, -0.1722521185874939, 0.0], [0.3191879093647003, -0.3204396069049835, 0.0], [0.16047996282577515, -3.3763458728790283, 1.0], [0.5859912037849426, 1.4474549293518066, 1.0], [0.00026586305466480553, 2.5406060218811035, 0.0], [0.016068562865257263, -1.652360439300537, 1.0], [0.4864984154701233, -0.5067138671875, 0.0], [0.3376810848712921, -0.2476920485496521, 0.0], [0.47781288623809814, -0.0045219180174171925, 0.0], [0.317558616399765, 0.1682969182729721, 0.0], [0.1442468911409378, -1.462112307548523, 0.0], [1.7336419820785522, 1.136600136756897, 1.0], [0.005912426393479109, 2.605269193649292, 0.0], [0.0551893450319767, -2.4346601963043213, 1.0], [-0.3015519380569458, -0.37006768584251404, 0.0], [-0.29029881954193115, -0.1785035878419876, 0.0], [0.3517950773239136, -0.0021337452344596386, 0.0], [-0.37954577803611755, 0.12023594230413437, 0.0], [-0.24278268218040466, 0.28838562965393066, 0.0], [-0.20417086780071259, 0.4499521255493164, 0.0], [-0.0544876866042614, 0.36704790592193604, 0.0], [0.08034282177686691, 0.4636235237121582, 0.0], [0.20100992918014526, 0.4153589904308319, 0.0], [0.2822587192058563, 0.25041520595550537, 0.0], [0.2852590084075928, 0.07119537144899368, 0.0], [0.27922722697257996, -0.10950946807861328, 0.0], [0.28019285202026367, -0.2689420282840729, 0.0], [0.137010395526886, -3.4139022827148438, 1.0], [0.5260295867919922, 1.4495052099227905, 1.0], [0.00019957900804001838, 2.4612843990325928, 0.0], [0.019235562533140182, -1.6095143556594849, 1.0], [0.4496104419231415, -0.49377116560935974, 0.0], [0.3154289126396179, -0.24560251832008362, 0.0], [0.44695430994033813, -0.005182559136301279, 0.0], [0.3025704026222229, 0.16482019424438477, 0.0], [0.13761860132217407, -1.452770709991455, 0.0], [1.7592414617538452, 1.1417789459228516, 1.0], [0.005510486196726561, 2.5544347763061523, 0.0], [0.04835344851016998, -2.3649587631225586, 1.0], [-0.2945207357406616, -0.365090012550354, 0.0], [-0.2874378263950348, -0.17692941427230835, 0.0], [0.3382921516895294, -0.0003709114098455757, 0.0], [-0.37733346223831177, 0.12259972840547562, 0.0], [-0.24439166486263275, 0.2912214994430542, 0.0], [-0.1954173594713211, 0.45172321796417236, 0.0], [-0.043606217950582504, 0.36782756447792053, 0.0], [0.08593065291643143, 0.46445634961128235, 0.0], [0.20449906587600708, 0.411638468503952, 0.0], [0.28363946080207825, 0.2444957196712494, 0.0], [0.2811149060726166, 0.06765253096818924, 0.0], [0.27416887879371643, -0.11579772084951401, 0.0], [0.28034791350364685, -0.2723284959793091, 0.0], [0.13514401018619537, -3.431436777114868, 1.0], [0.5193339586257935, 1.4508417844772339, 1.0], [-0.00033473168150521815, 2.4907147884368896, 0.0], [0.018251167610287666, -1.628743290901184, 1.0], [0.44920554757118225, -0.49755048751831055, 0.0], [0.31122544407844543, -0.24834050238132477, 0.0], [0.4558124244213104, -0.008223551325500011, 0.0], [0.3042556941509247, 0.16398534178733826, 0.0], [0.13468050956726074, -1.4545280933380127, 0.0], [1.7800899744033813, 1.156962275505066, 1.0], [0.0061563062481582165, 2.6256260871887207, 0.0], [0.04695577546954155, -2.377183437347412, 1.0], [-0.2938113808631897, -0.3716866970062256, 0.0], [-0.2890470027923584, -0.18070624768733978, 0.0], [0.3509330153465271, -0.0020847772248089314, 0.0], [-0.3923673629760742, 0.12160937488079071, 0.0], [-0.24885253608226776, 0.28842708468437195, 0.0], [-0.2086869329214096, 0.4489598870277405, 0.0], [-0.057562507688999176, 0.36999818682670593, 0.0], [0.07757417112588882, 0.454889714717865, 0.0], [0.19839830696582794, 0.419625848531723, 0.0], [0.2810155749320984, 0.25266769528388977, 0.0], [0.2891920506954193, 0.07480870932340622, 0.0], [0.27660778164863586, -0.10760974138975143, 0.0], [0.27907082438468933, -0.2699405252933502, 0.0], [0.13572143018245697, -3.4563772678375244, 1.0], [0.5210333466529846, 1.4658985137939453, 1.0], [-0.00022653379710391164, 2.402217149734497, 0.0], [0.01801213063299656, -1.5667256116867065, 1.0], [0.44774651527404785, -0.4785713255405426, 0.0], [0.3090837299823761, -0.24236129224300385, 0.0], [0.4431504011154175, -0.00740441819652915, 0.0], [0.3029821515083313, 0.15843939781188965, 0.0], [0.1384744644165039, -1.478034257888794, 0.0], [0.48443788290023804, 1.2028393745422363, 1.0], [0.00580519437789917, 2.3799638748168945, 0.0], [0.014446287415921688, -1.6481152772903442, 1.0], [0.4926132559776306, -0.49791356921195984, 0.0], [0.33149874210357666, -0.20885160565376282, 0.0], [0.4868250787258148, -0.0065735443495213985, 0.0], [0.31724536418914795, 0.1810971051454544, 0.0], [0.1655169576406479, 0.5313934087753296, 0.0], [0.0011860098456963897, 1.816733479499817, 0.0], [0.1709504872560501, -3.856583833694458, 1.0], [2.330185651779175, 1.5381051301956177, 1.0], [-0.0020820333156734705, 2.4543352127075195, 0.0], [-0.003813550341874361, -1.9377281665802002, 1.0], [-0.3097148835659027, -0.36236220598220825, 0.0], [-0.31497809290885925, -0.17927567660808563, 0.0], [-0.4963091015815735, 0.005972730927169323, 0.0], [-0.33711445331573486, 0.1900988072156906, 0.0], [-0.33587273955345154, 0.3659553825855255, 0.0], [-0.16954979300498962, 0.5454005002975464, 0.0], [0.008059252984821796, 0.3497355580329895, 0.0], [0.1846679002046585, 0.532521665096283, 0.0], [0.32083895802497864, 0.3584761321544647, 0.0], [0.32020509243011475, 0.18149283528327942, 0.0], [0.31639283895492554, -0.007972572930157185, 0.0], [0.3174321949481964, -0.17523658275604248, 0.0], [0.3132439851760864, -0.3252548277378082, 0.0], [0.16111722588539124, -3.374788761138916, 1.0], [0.5751237273216248, 1.4462635517120361, 1.0], [6.141191988717765e-05, 2.511254072189331, 0.0], [0.01301614847034216, -1.6318190097808838, 1.0], [0.47905564308166504, -0.49618294835090637, 0.0], [0.3306741714477539, -0.23678123950958252, 0.0], [0.4753284454345703, -0.004257188178598881, 0.0], [0.3139955401420593, 0.16606900095939636, 0.0], [0.14188197255134583, -1.450926661491394, 0.0], [1.7907791137695312, 1.1234242916107178, 1.0], [0.005850569345057011, 2.5871894359588623, 0.0], [0.05184389278292656, -2.3977909088134766, 1.0], [-0.30413228273391724, -0.3667197525501251, 0.0], [-0.3116224408149719, -0.20741021633148193, 0.0], [-0.453164279460907, -0.026828303933143616, 0.0], [-0.3624260127544403, 0.1423231065273285, 0.0], [-0.320663720369339, 0.3249881863594055, 0.0], [-0.19155673682689667, 0.5079732537269592, 0.0], [-0.007511571049690247, 0.3533070683479309, 0.0], [0.1582503467798233, 0.501319408416748, 0.0], [0.31226828694343567, 0.3428252041339874, 0.0], [0.31490814685821533, 0.182419553399086, 0.0], [0.3091370463371277, 9.71144690993242e-05, 0.0], [0.31041374802589417, -0.16838312149047852, 0.0], [0.31118324398994446, -0.31689828634262085, 0.0], [0.15860708057880402, -3.322275400161743, 1.0], [0.5419279336929321, 1.4343438148498535, 1.0], [0.0006043965695425868, 2.444272756576538, 0.0], [0.016640352085232735, -1.5734716653823853, 1.0], [0.4688519239425659, -0.47808584570884705, 0.0], [0.32369816303253174, -0.242522731423378, 0.0], [0.4645020663738251, -0.004535876214504242, 0.0], [0.3130655586719513, 0.16258075833320618, 0.0], [0.1437731236219406, -1.4226088523864746, 0.0], [1.7340911626815796, 1.1101404428482056, 1.0], [0.005569843575358391, 2.586822509765625, 0.0], [0.04995860904455185, -2.382807493209839, 1.0], [-0.2961595058441162, -0.3632928431034088, 0.0], [-0.2899070084095001, -0.17717835307121277, 0.0], [0.33715343475341797, -4.680289202951826e-05, 0.0], [-0.38513049483299255, 0.12196000665426254, 0.0], [-0.24624298512935638, 0.28576815128326416, 0.0], [-0.20495770871639252, 0.4448200762271881, 0.0], [-0.054564375430345535, 0.36610615253448486, 0.0], [0.08048984408378601, 0.45695242285728455, 0.0], [0.19910717010498047, 0.41261276602745056, 0.0], [0.2820393145084381, 0.24794501066207886, 0.0], [0.27975818514823914, 0.07043193280696869, 0.0], [0.2747570276260376, -0.10988008975982666, 0.0], [0.2768388092517853, -0.26425302028656006, 0.0], [0.13742293417453766, -3.4170730113983154, 1.0], [0.5526260733604431, 0.1713101863861084, 1.0], [-0.0030343690887093544, 3.5333774089813232, 0.0], [0.14354883134365082, 0.6002290844917297, 1.0], [0.38378655910491943, 0.1375933289527893, 0.0], [0.28399404883384705, -0.08074110746383667, 0.0], [-1.2055656909942627, -2.532149076461792, 1.0], [1.0625451803207397, -0.0009861075086519122, 0.0], [0.3149498403072357, -1.441192865371704, 1.0], [0.5886997580528259, 0.18700361251831055, 1.0], [0.17954981327056885, 0.24749180674552917, 0.0], [0.16863486170768738, -0.12178103625774384, 0.0], [-0.13785943388938904, -0.1967630386352539, 0.0], [-0.16316218674182892, 0.1735875904560089, 0.0], [0.1942097246646881, 1.2763170003890991, 1.0]], [[2.3641586303710938, 1.719312310218811, 1.0], [-0.21553774178028107, -0.3288838863372803, 0.0], [-0.45609650015830994, -0.16576595604419708, 0.0], [-0.4960862994194031, -0.0013049393892288208, 0.0], [-0.4869391620159149, 0.17157238721847534, 0.0], [-0.23569689691066742, 0.3331841230392456, 0.0], [0.10095148533582687, 0.33408087491989136, 0.0], [0.1736406683921814, 0.3878263235092163, 0.0], [0.7920701503753662, 0.1596074104309082, 0.0], [0.3169190287590027, 0.1621471643447876, 0.0], [0.21145831048488617, 0.3086439371109009, 0.0], [0.0724785104393959, 0.17045894265174866, 0.0], [-0.07831861823797226, 0.3093806207180023, 0.0], [-0.5017327070236206, 0.14206168055534363, 0.0], [-0.5004945993423462, -0.024510981515049934, 0.0], [-0.2315589040517807, -0.2555513083934784, 0.0], [-0.12769155204296112, -0.3884161114692688, 1.0], [1.679801106452942, -2.9656553268432617, 1.0]], [[2.32137131690979, 1.715846061706543, 1.0], [-0.23617279529571533, -0.32600370049476624, 0.0], [-0.41375023126602173, -0.16268695890903473, 0.0], [-0.4829689860343933, -0.003700617467984557, 0.0], [-0.29732546210289, 0.17459020018577576, 0.0], [-0.25249183177948, 0.33463814854621887, 0.0], [0.05510538071393967, 0.3475186824798584, 0.0], [0.12985190749168396, 0.3766133487224579, 0.0], [0.20338349044322968, 0.4183776378631592, 0.0], [0.2737489640712738, 0.3783077597618103, 0.0], [0.2999625504016876, 0.20378942787647247, 0.0], [0.2971353232860565, 0.032314904034137726, 0.0], [0.3002112805843353, -0.13040265440940857, 0.0], [0.2977510988712311, -0.27557268738746643, 0.0], [0.14800624549388885, -3.2817904949188232, 1.0], [0.5280612111091614, 1.3874037265777588, 1.0], [0.00037332219653762877, 2.3404154777526855, 0.0], [0.017010066658258438, -1.4944044351577759, 1.0], [0.4536952078342438, -0.4563063979148865, 0.0], [0.3155371844768524, -0.2313702404499054, 0.0], [0.4554184079170227, -0.006946951616555452, 0.0], [0.30603736639022827, 0.15524126589298248, 0.0], [0.1375768929719925, -1.4107557535171509, 0.0], [0.4906958341598511, 1.1441588401794434, 1.0], [0.006017831154167652, 2.2886242866516113, 0.0], [0.011446203105151653, -1.576094627380371, 1.0], [0.4983060657978058, -0.4746423661708832, 0.0], [0.3283389210700989, -0.1915045976638794, 0.0], [0.478130966424942, -0.006659242790192366, 0.0], [0.32343265414237976, 0.17183329164981842, 0.0], [0.16984795033931732, 0.5140483379364014, 0.0], [0.0015616840682923794, 1.7354249954223633, 0.0], [0.17204882204532623, -3.7320568561553955, 1.0], [2.2528886795043945, 1.498201608657837, 1.0], [-0.00040341043495573103, 2.4039297103881836, 0.0], [0.004874482750892639, -1.9246946573257446, 1.0], [-0.30392879247665405, -0.3552308678627014, 0.0], [-0.3073594272136688, -0.17703989148139954, 0.0], [-0.48777565360069275, 0.0025676132645457983, 0.0], [-0.3395322561264038, 0.18411514163017273, 0.0], [-0.3324216604232788, 0.3526822030544281, 0.0], [-0.18064400553703308, 0.5236665606498718, 0.0], [0.006871597841382027, 0.3442583382129669, 0.0], [0.18460100889205933, 0.5173055529594421, 0.0], [0.3208695948123932, 0.34942105412483215, 0.0], [0.3179105222225189, 0.17786066234111786, 0.0], [0.4924430847167969, -0.003587467363104224, 0.0], [0.3249256908893585, -0.18629637360572815, 0.0], [0.3216416835784912, -0.3528646230697632, 0.0], [0.16989323496818542, -3.2757368087768555, 1.0], [0.5828425884246826, 1.4253801107406616, 1.0], [-0.0009970867540687323, 2.4008283615112305, 0.0], [0.014759085141122341, -1.5357414484024048, 1.0], [0.47950565814971924, -0.4693352282047272, 0.0], [0.334122896194458, -0.23905879259109497, 0.0], [0.4736306071281433, -0.00355348689481616, 0.0], [0.31206220388412476, 0.15981873869895935, 0.0], [0.14438442885875702, -1.4184809923171997, 1.0], [2.167015790939331, 1.4187194108963013, 1.0], [5.926466474193148e-05, 2.273505449295044, 0.0], [0.01960044354200363, -1.9809356927871704, 1.0], [-0.302146315574646, -0.3445955514907837, 0.0], [-0.30667442083358765, -0.1715400665998459, 0.0], [-0.48734569549560547, 0.001434970530681312, 0.0], [-0.3543970584869385, 0.16432923078536987, 0.0], [-0.33934950828552246, 0.33619797229766846, 0.0], [-0.1847008317708969, 0.505014955997467, 0.0], [0.0010971826268360019, 0.3341500461101532, 0.0], [0.1792985200881958, 0.4972072243690491, 0.0], [0.32353872060775757, 0.33778247237205505, 0.0], [0.3246956467628479, 0.1779015064239502, 0.0], [0.3175733685493469, -0.004728158004581928, 0.0], [0.31438979506492615, -0.16350843012332916, 0.0], [0.3146531283855438, -0.30593276023864746, 0.0], [0.16453540325164795, -3.266253709793091, 1.0], [0.5709903240203857, 1.3969674110412598, 1.0], [0.0017506858566775918, 2.460979700088501, 0.0], [0.01355112437158823, -1.5480482578277588, 1.0], [0.48020246624946594, -0.4700908958911896, 0.0], [0.32692408561706543, -0.237357497215271, 0.0], [0.4700864255428314, -0.004151197150349617, 0.0], [0.3152557611465454, 0.15596434473991394, 0.0], [0.14456452429294586, -1.426137089729309, 0.0], [1.7244064807891846, 1.1316221952438354, 1.0], [0.005248197354376316, 2.4860825538635254, 0.0], [0.05395987629890442, -2.3259284496307373, 1.0], [-0.29124656319618225, -0.3565896153450012, 0.0], [-0.30355072021484375, -0.20281781256198883, 0.0], [0.3409668505191803, 0.000599682389292866, 0.0], [-0.3842465281486511, 0.11922150105237961, 0.0], [-0.24172669649124146, 0.28419041633605957, 0.0], [-0.19991226494312286, 0.442571759223938, 0.0], [-0.04419286176562309, 0.3621501922607422, 0.0], [0.08829501271247864, 0.44826334714889526, 0.0], [0.20630374550819397, 0.4095730781555176, 0.0], [0.28043824434280396, 0.24170677363872528, 0.0], [0.28430992364883423, 0.06594590097665787, 0.0], [0.2788817584514618, -0.11516327410936356, 0.0], [0.2805965542793274, -0.2703315019607544, 0.0], [0.1368134617805481, -3.3594937324523926, 1.0], [0.5695425271987915, 0.16839464008808136, 1.0], [-0.00244983215816319, 3.4518325328826904, 0.0], [0.016315173357725143, -1.6751841306686401, 1.0], [0.4461367428302765, -0.5069096684455872, 0.0], [0.3051190674304962, -0.18710152804851532, 0.0], [0.4490581452846527, -0.008496483787894249, 0.0], [0.30624645948410034, 0.17481984198093414, 0.0], [0.1668795645236969, 0.5241181254386902, 0.0], [0.0014426953857764602, 1.7581562995910645, 0.0], [0.16771921515464783, -3.75993013381958, 1.0], [2.231689691543579, 1.4962936639785767, 1.0], [-0.001317372894845903, 2.4664692878723145, 0.0], [0.0036182356998324394, -1.9671180248260498, 1.0], [-0.3015308976173401, -0.36084800958633423, 0.0], [-0.30683955550193787, -0.17904791235923767, 0.0], [-0.4852946698665619, 0.004828957840800285, 0.0], [-0.33455541729927063, 0.18001940846443176, 0.0], [-0.33791109919548035, 0.3566182553768158, 0.0], [-0.1786755472421646, 0.5305070281028748, 0.0], [0.0054374816827476025, 0.3443008065223694, 0.0], [0.18339020013809204, 0.5200938582420349, 0.0], [0.3162717819213867, 0.3535189926624298, 0.0], [0.3191549777984619, 0.17653325200080872, 0.0], [0.309891015291214, -0.009546921588480473, 0.0], [0.31227195262908936, -0.17636339366436005, 0.0], [0.3128035366535187, -0.32417625188827515, 0.0], [0.16065531969070435, -3.3359291553497314, 1.0], [0.5854441523551941, 1.4347901344299316, 1.0], [-0.00016108780982904136, 2.4486334323883057, 0.0], [0.01686144806444645, -1.568886399269104, 1.0], [0.4783836901187897, -0.47897785902023315, 0.0], [0.3237149715423584, -0.2393067479133606, 0.0], [0.47018536925315857, -0.0044459393247962, 0.0], [0.3147980570793152, 0.16085544228553772, 0.0], [0.14297175407409668, -1.4561846256256104, 0.0], [0.49386298656463623, 1.1935869455337524, 1.0], [0.005521989427506924, 2.3602912425994873, 0.0], [0.01311799231916666, -1.6091097593307495, 1.0], [0.502009928226471, -0.4848363697528839, 0.0], [0.34196218848228455, -0.20504045486450195, 0.0], [0.48252904415130615, -0.004095292650163174, 0.0], [0.3189142048358917, 0.179440438747406, 0.0], [0.1607217639684677, 0.5204841494560242, 0.0], [0.0005205772467888892, 1.7793495655059814, 0.0], [0.17181465029716492, -3.828867197036743, 1.0], [2.2715189456939697, 1.5372782945632935, 1.0], [-0.0008382258820347488, 2.509298324584961, 0.0], [0.0032002897933125496, -1.9990390539169312, 1.0], [-0.30329248309135437, -0.36537307500839233, 0.0], [-0.30717289447784424, -0.17893348634243011, 0.0], [-0.4933990240097046, 0.0055189672857522964, 0.0], [-0.336208313703537, 0.18658898770809174, 0.0], [-0.33986639976501465, 0.36238232254981995, 0.0], [-0.18016810715198517, 0.5381726026535034, 0.0], [0.0026109933387488127, 0.3500451147556305, 0.0], [0.1793995350599289, 0.5320311188697815, 0.0], [0.3209431767463684, 0.357974112033844, 0.0], [0.32023507356643677, 0.18507932126522064, 0.0], [0.31865426898002625, -0.008087077178061008, 0.0], [0.31041696667671204, -0.17265500128269196, 0.0], [0.3162744343280792, -0.3234666883945465, 0.0], [0.16023142635822296, -3.3771021366119385, 1.0], [0.5820503830909729, 1.4468321800231934, 1.0], [0.0001720680738799274, 2.4919400215148926, 0.0], [0.013697721995413303, -1.6372743844985962, 1.0], [0.4739096164703369, -0.49494361877441406, 0.0], [0.32788488268852234, -0.24126970767974854, 0.0], [0.4703637957572937, -0.00417722575366497, 0.0], [0.31429988145828247, 0.1660916805267334, 0.0], [0.144083172082901, -1.4610756635665894, 0.0], [1.7227412462234497, 1.1218016147613525, 1.0], [0.005257150623947382, 2.5903096199035645, 0.0], [0.05536104366183281, -2.424114227294922, 1.0], [-0.29591721296310425, -0.36744800209999084, 0.0], [-0.2884742021560669, -0.17941857874393463, 0.0], [0.3440472185611725, -0.0016965290997177362, 0.0], [-0.38536378741264343, 0.11828210204839706, 0.0], [-0.2472710907459259, 0.2866169214248657, 0.0], [-0.20313070714473724, 0.44749516248703003, 0.0], [-0.04652794823050499, 0.371795654296875, 0.0], [0.08301995694637299, 0.4555170238018036, 0.0], [0.20365090668201447, 0.4243161380290985, 0.0], [0.2820851504802704, 0.25534704327583313, 0.0], [0.28767961263656616, 0.0711963027715683, 0.0], [0.2817082405090332, -0.11022557318210602, 0.0], [0.28003990650177, -0.26708123087882996, 0.0], [0.13670098781585693, -3.4371323585510254, 0.0], [0.569265604019165, 0.12614336609840393, 1.0], [-0.004857493564486504, 3.538039445877075, 0.0], [1.608609676361084, -2.38020396232605, 1.0], [-1.58381187915802, 1.757491946220398, 0.0], [0.658355176448822, -0.8424808382987976, 1.0], [1.1241917610168457, 1.4481133222579956, 0.0], [0.15516029298305511, -3.6879827976226807, 1.0], [2.212174892425537, 1.545263648033142, 1.0], [-0.0017689375672489405, 2.42145037651062, 0.0], [0.007395078428089619, -2.0024847984313965, 1.0], [-0.29651162028312683, -0.3615247905254364, 0.0], [-0.29770320653915405, -0.18103258311748505, 0.0], [-0.4788314998149872, 0.0027073032688349485, 0.0], [-0.3346805274486542, 0.18286468088626862, 0.0], [-0.3345142900943756, 0.35479170083999634, 0.0], [-0.17869648337364197, 0.5307801365852356, 0.0], [0.0010463254293426871, 0.3425021469593048, 0.0], [0.1727178692817688, 0.522986650466919, 0.0], [0.3198665380477905, 0.35319337248802185, 0.0], [0.31780728697776794, 0.17955176532268524, 0.0], [0.30956122279167175, -0.006973231211304665, 0.0], [0.30562376976013184, -0.17464812099933624, 0.0], [0.31222501397132874, -0.3216010332107544, 0.0], [0.15719851851463318, -3.3487048149108887, 1.0], [0.5703163146972656, 1.4428083896636963, 1.0], [0.0004735652182716876, 2.458552598953247, 0.0], [0.017993884161114693, -1.5982009172439575, 1.0], [0.48264116048812866, -0.4870714247226715, 0.0], [0.32891586422920227, -0.22941499948501587, 0.0], [0.4628187119960785, -0.0035731587558984756, 0.0], [0.31611138582229614, 0.1647670716047287, 0.0], [0.14206956326961517, -1.467013955116272, 0.0], [1.882521629333496, 1.1655386686325073, 1.0], [0.00571867311373353, 2.5467071533203125, 0.0], [0.04695599153637886, -2.295991897583008, 1.0], [-0.29865628480911255, -0.3624604046344757, 0.0], [-0.298239141702652, -0.1786416620016098, 0.0], [-0.48456817865371704, -0.006978841498494148, 0.0], [-0.355172723531723, 0.154809832572937, 0.0], [-0.3245933949947357, 0.337198942899704, 0.0], [-0.18622267246246338, 0.512982964515686, 0.0], [0.001702739391475916, 0.3474218249320984, 0.0], [0.16997916996479034, 0.5082076787948608, 0.0], [0.3149993121623993, 0.3432479798793793, 0.0], [0.3240184783935547, 0.17447185516357422, 0.0], [0.3125595152378082, -0.009791911579668522, 0.0], [0.3110859990119934, -0.17744362354278564, 0.0]], [[2.3982162475585938, 1.6765985488891602, 1.0], [-0.2231743484735489, -0.326398104429245, 0.0], [-0.4232635498046875, -0.1624995768070221, 0.0], [-0.4946255385875702, -0.003158797975629568, 0.0], [-0.3094330430030823, 0.17865502834320068, 0.0], [-0.2296350747346878, 0.3401699364185333, 0.0], [0.0828753188252449, 0.3456575274467468, 0.0], [0.14588116109371185, 0.38351088762283325, 0.0], [0.21172653138637543, 0.4165903329849243, 0.0], [0.2761431336402893, 0.37853294610977173, 0.0], [0.2967981994152069, 0.20240096747875214, 0.0], [0.29643896222114563, 0.02660346031188965, 0.0], [0.29373908042907715, -0.13067665696144104, 0.0], [0.3002600073814392, -0.2781426012516022, 0.0], [0.14983537793159485, -3.3117854595184326, 1.0], [0.5064804553985596, 1.402844786643982, 1.0], [0.00016880955081433058, 2.3771557807922363, 0.0], [0.016962658613920212, -1.5542454719543457, 1.0], [0.4515349268913269, -0.47216928005218506, 0.0], [0.31459978222846985, -0.23643480241298676, 0.0], [0.4524499475955963, -0.008025492541491985, 0.0], [0.3049486577510834, 0.15743081271648407, 0.0], [0.1379098743200302, -1.4209842681884766, 0.0], [1.6818288564682007, 1.1166311502456665, 1.0], [0.005904214456677437, 2.479781150817871, 0.0], [0.050785765051841736, -2.316965341567993, 1.0], [-0.28591108322143555, -0.35581865906715393, 0.0], [-0.277116596698761, -0.1771027147769928, 0.0], [0.3295176327228546, -0.002105948980897665, 0.0], [-0.37235161662101746, 0.12042355537414551, 0.0], [-0.2401735633611679, 0.28448769450187683, 0.0], [-0.19556687772274017, 0.4399646818637848, 0.0], [-0.045463502407073975, 0.3607480525970459, 0.0], [0.09103163331747055, 0.4499339461326599, 0.0], [0.20577049255371094, 0.4035903811454773, 0.0], [0.27825525403022766, 0.23681679368019104, 0.0], [0.28585830330848694, 0.05796048790216446, 0.0], [0.27650269865989685, -0.11723709106445312, 0.0], [0.2829567790031433, -0.27490150928497314, 0.0], [0.13849186897277832, -3.338085889816284, 1.0], [0.5772004723548889, 0.16535134613513947, 1.0], [-0.0031648846343159676, 3.565195083618164, 0.0], [0.14473485946655273, 0.6030272245407104, 1.0], [0.3874862492084503, 0.13517214357852936, 0.0], [0.2853456735610962, -0.07796545326709747, 0.0], [-1.205374836921692, -2.5158421993255615, 1.0], [1.0488053560256958, -0.00441293278709054, 0.0], [0.31221017241477966, -1.4423003196716309, 1.0], [0.5476051568984985, 0.18638236820697784, 1.0], [0.17684683203697205, 0.24413911998271942, 0.0], [0.16720759868621826, -0.12257397919893265, 0.0], [-0.13454456627368927, -0.19650942087173462, 0.0], [-0.16202135384082794, 0.17812849581241608, 0.0], [0.19424323737621307, 1.255252718925476, 1.0], [0.0026515424251556396, 2.5122883319854736, 0.0], [0.3404630124568939, -3.8298826217651367, 1.0], [0.6647599935531616, 1.4381718635559082, 1.0], [-0.002219044603407383, 2.4169888496398926, 0.0], [0.016040951013565063, -1.653426170349121, 1.0], [0.5095529556274414, -0.5028524398803711, 0.0], [0.33879849314689636, -0.21474622189998627, 0.0], [0.4968929588794708, -0.0033414862118661404, 0.0], [0.3302726149559021, 0.17636966705322266, 0.0], [0.16395103931427002, 0.5242708325386047, 0.0], [-8.474058995489031e-05, 1.7915672063827515, 0.0], [0.17463050782680511, -3.850267171859741, 1.0], [2.240339756011963, 1.553399682044983, 1.0], [-0.0027186248917132616, 2.5110580921173096, 0.0], [0.0014172391965985298, -2.0037856101989746, 1.0], [-0.29989004135131836, -0.36869969964027405, 0.0], [-0.3094843327999115, -0.18217703700065613, 0.0], [-0.4858364760875702, 0.003360781352967024, 0.0], [-0.3278060853481293, 0.18384049832820892, 0.0], [-0.33175739645957947, 0.3613477945327759, 0.0], [-0.18735955655574799, 0.5368200540542603, 0.0], [-0.00203770212829113, 0.3523641526699066, 0.0], [0.17698006331920624, 0.5284645557403564, 0.0], [0.3211800754070282, 0.36023077368736267, 0.0], [0.3216015100479126, 0.18217752873897552, 0.0], [0.4948180019855499, -0.0033663895446807146, 0.0], [0.3200704753398895, -0.18275481462478638, 0.0], [0.32008984684944153, -0.3528359830379486, 0.0], [0.16771413385868073, -3.395798683166504, 1.0], [0.6128835082054138, 1.4613471031188965, 1.0], [0.0001255505922017619, 2.460505723953247, 0.0], [0.016351642087101936, -1.6085597276687622, 1.0], [0.47425413131713867, -0.48431962728500366, 0.0], [0.33020463585853577, -0.23399829864501953, 0.0], [0.4703333377838135, -0.0040770601481199265, 0.0], [0.32060614228248596, 0.16254684329032898, 0.0], [0.14523456990718842, -1.4350547790527344, 0.0], [1.7947710752487183, 1.205041766166687, 1.0], [0.005758047569543123, 2.5288662910461426, 0.0], [0.04915860295295715, -2.3597347736358643, 1.0], [-0.29598063230514526, -0.36676982045173645, 0.0], [-0.2949657440185547, -0.18041367828845978, 0.0], [-0.475691020488739, -0.013497325591742992, 0.0], [-0.356520414352417, 0.15227940678596497, 0.0], [-0.3252618610858917, 0.3325221836566925, 0.0], [-0.17942805588245392, 0.5155175924301147, 0.0], [0.006225312128663063, 0.3425334692001343, 0.0], [0.17270542681217194, 0.5128767490386963, 0.0], [0.312069296836853, 0.34258681535720825, 0.0], [0.31199854612350464, 0.17689333856105804, 0.0], [0.30509305000305176, -0.006962772458791733, 0.0], [0.30832356214523315, -0.17340372502803802, 0.0], [0.3053251802921295, -0.3164985775947571, 0.0], [0.15828685462474823, -3.3527145385742188, 1.0], [0.5702402591705322, 1.4437551498413086, 1.0], [0.0007453215075656772, 2.4768552780151367, 0.0], [0.016298096626996994, -1.5826811790466309, 1.0], [0.473339706659317, -0.48430266976356506, 0.0], [0.32866281270980835, -0.24069435894489288, 0.0], [0.46645501255989075, -0.004534413572400808, 0.0], [0.31396153569221497, 0.1606014221906662, 0.0], [0.14207078516483307, -1.4602382183074951, 0.0], [0.5071344971656799, 1.194841742515564, 1.0], [0.005113620776683092, 2.3117246627807617, 0.0], [0.017847631126642227, -1.5984238386154175, 1.0], [0.49827226996421814, -0.48200544714927673, 0.0], [0.33970406651496887, -0.20048636198043823, 0.0], [0.4822025001049042, -0.0044613429345190525, 0.0], [0.32341834902763367, 0.1773790419101715, 0.0], [0.1655825674533844, 0.52071213722229, 0.0], [0.0014773441944271326, 1.774600863456726, 0.0], [0.1717904508113861, -3.833197832107544, 1.0], [2.215827226638794, 1.5527607202529907, 1.0], [-0.0024844862055033445, 2.4892001152038574, 0.0], [0.0012447998160496354, -1.9988867044448853, 1.0], [-0.3021908700466156, -0.3646799921989441, 0.0], [-0.3038496971130371, -0.1791437566280365, 0.0], [-0.4851202368736267, 0.005110044032335281, 0.0], [-0.3330039083957672, 0.18716193735599518, 0.0], [-0.3277879059314728, 0.36593809723854065, 0.0], [-0.18134473264217377, 0.5396350026130676, 0.0], [0.004848205950111151, 0.3522026240825653, 0.0], [0.17936958372592926, 0.5261200070381165, 0.0], [0.31707853078842163, 0.356790691614151, 0.0], [0.31754687428474426, 0.1791069507598877, 0.0], [0.4965972602367401, -0.005910689942538738, 0.0], [0.31507012248039246, -0.18575705587863922, 0.0], [0.32219430804252625, -0.35779818892478943, 0.0], [0.16652518510818481, -3.3676083087921143, 1.0], [0.5898338556289673, 1.4519813060760498, 1.0], [-0.0010511127766221762, 2.4303436279296875, 0.0], [0.018009137362241745, -1.5707170963287354, 1.0], [0.48143553733825684, -0.47845780849456787, 0.0], [0.3288205862045288, -0.2332184910774231, 0.0], [0.47159186005592346, -0.0044664544984698296, 0.0], [0.3202412724494934, 0.1617775559425354, 0.0], [0.14490251243114471, -1.4740782976150513, 0.0], [1.7682965993881226, 1.0972745418548584, 1.0], [0.0056236861273646355, 2.595160961151123, 0.0], [0.05330117419362068, -2.3729381561279297, 1.0], [-0.2963000237941742, -0.361517995595932, 0.0], [-0.3085387349128723, -0.20237843692302704, 0.0], [0.3367655277252197, 0.002768873469904065, 0.0], [-0.38473716378211975, 0.11987243592739105, 0.0], [-0.2555350363254547, 0.28754547238349915, 0.0], [-0.20503057539463043, 0.4461304247379303, 0.0], [-0.05228431522846222, 0.37138304114341736, 0.0], [0.08033113926649094, 0.4539048969745636, 0.0], [0.20586547255516052, 0.4160309433937073, 0.0], [0.2864838242530823, 0.25226807594299316, 0.0], [0.2812452018260956, 0.07314682751893997, 0.0], [0.2753976583480835, -0.1076882854104042, 0.0], [0.2782439589500427, -0.2612646520137787, 0.0], [0.1373981386423111, -3.421177864074707, 1.0], [0.506534993648529, 1.4496475458145142, 1.0], [-7.042750075925142e-05, 2.4897003173828125, 0.0], [0.016795596107840538, -1.6038888692855835, 1.0], [0.45770078897476196, -0.4936768114566803, 0.0], [0.31661418080329895, -0.24620220065116882, 0.0], [0.4489007294178009, -0.006725807674229145, 0.0], [0.30497390031814575, 0.16129262745380402, 0.0], [0.13910670578479767, -1.473609209060669, 0.0], [0.4949338436126709, 1.2173064947128296, 1.0], [0.0055626449175179005, 2.3533763885498047, 0.0], [0.014992909505963326, -1.62884521484375, 1.0], [0.4933026432991028, -0.4882872402667999, 0.0], [0.3385467827320099, -0.205148845911026, 0.0], [0.4821416437625885, -0.0058177742175757885, 0.0], [0.3222792446613312, 0.17691481113433838, 0.0], [0.16512387990951538, 0.5295434594154358, 0.0], [0.0008006767020560801, 1.7939839363098145, 0.0], [0.1724475622177124, -3.8662593364715576, 1.0], [2.2864558696746826, 1.5509788990020752, 1.0], [-0.00166463409550488, 2.496121883392334, 0.0], [0.0003487624635454267, -1.9804356098175049, 1.0], [-0.3022483289241791, -0.36521655321121216, 0.0], [-0.3102579116821289, -0.1815522164106369, 0.0], [-0.49071717262268066, 0.005382999312132597, 0.0], [-0.3324987292289734, 0.18257193267345428, 0.0], [-0.33007967472076416, 0.3622257709503174, 0.0], [-0.17502503097057343, 0.53741455078125, 0.0], [0.00489695044234395, 0.35027799010276794, 0.0], [0.17529714107513428, 0.5231004357337952, 0.0], [0.32096073031425476, 0.35953590273857117, 0.0], [0.31687983870506287, 0.18288689851760864, 0.0], [0.31879520416259766, -0.004304153379052877, 0.0], [0.31016048789024353, -0.1695152372121811, 0.0], [0.3166203498840332, -0.3205088675022125, 0.0], [0.15724137425422668, -3.36547589302063, 1.0], [0.5735387206077576, 1.4608792066574097, 1.0], [-0.0005155008402653039, 2.5368051528930664, 0.0], [0.015760324895381927, -1.6503520011901855, 1.0], [0.47000014781951904, -0.49988529086112976, 0.0], [0.3258766531944275, -0.24204497039318085, 0.0], [0.46750563383102417, -0.004961310885846615, 0.0], [0.3135209083557129, 0.16572502255439758, 0.0], [0.14360904693603516, -1.465362310409546, 0.0], [1.8388707637786865, 1.182365894317627, 1.0], [0.005862486083060503, 2.600841999053955, 0.0], [0.045491933822631836, -2.3619706630706787, 1.0], [-0.30108100175857544, -0.3708401024341583, 0.0], [-0.29599729180336, -0.1809062659740448, 0.0], [-0.48225095868110657, -0.01177908480167389, 0.0], [-0.35551217198371887, 0.15287558734416962, 0.0], [-0.32042598724365234, 0.3377341628074646, 0.0], [-0.18425309658050537, 0.5198822021484375, 0.0], [0.0037945823278278112, 0.34904882311820984, 0.0], [0.17160101234912872, 0.5080165266990662, 0.0], [0.31503090262413025, 0.3408862352371216, 0.0], [0.3155231773853302, 0.17532852292060852, 0.0], [0.31009700894355774, -0.008887442760169506, 0.0], [0.30774787068367004, -0.17642395198345184, 0.0], [0.3079332411289215, -0.3206775486469269, 0.0], [0.157195582985878, -3.332256317138672, 1.0], [0.5603187084197998, 1.4418387413024902, 1.0], [0.00011097623792011291, 2.4426944255828857, 0.0], [0.01706882193684578, -1.5913169384002686, 1.0], [0.47693300247192383, -0.4844427704811096, 0.0], [0.3307526111602783, -0.2436501681804657, 0.0], [0.4663008153438568, -0.003799035679548979, 0.0]], [[2.367220401763916, 1.6582618951797485, 1.0], [-0.2262728065252304, -0.3257260024547577, 0.0], [-0.412742555141449, -0.16019250452518463, 0.0], [-0.486905962228775, -0.0011445931158959866, 0.0], [-0.28497761487960815, 0.17165403068065643, 0.0], [-0.22736626863479614, 0.3289896249771118, 0.0], [0.0873352661728859, 0.35047027468681335, 0.0], [0.15563154220581055, 0.37863749265670776, 0.0], [0.21103410422801971, 0.42127686738967896, 0.0], [0.26750174164772034, 0.37317371368408203, 0.0], [0.30095216631889343, 0.20187978446483612, 0.0], [0.2908014953136444, 0.02691282331943512, 0.0], [0.29558753967285156, -0.13561372458934784, 0.0], [0.2922656536102295, -0.27591949701309204, 0.0], [0.1476544588804245, -3.2904891967773438, 1.0], [0.6055073142051697, 0.16325294971466064, 1.0], [-0.002778048627078533, 3.4379403591156006, 0.0], [0.14464904367923737, 0.5819478034973145, 1.0], [0.40247178077697754, 0.1295527219772339, 0.0], [0.3000504970550537, -0.07763608545064926, 0.0], [-1.227748990058899, -2.472034454345703, 1.0], [1.0705111026763916, -0.002787661273032427, 0.0], [0.32102301716804504, -1.3907746076583862, 1.0], [0.5641094446182251, 0.18174821138381958, 1.0], [0.17971104383468628, 0.25743159651756287, 0.0], [0.15535904467105865, -0.16902409493923187, 0.0], [-0.14142906665802002, -0.19336071610450745, 0.0], [-0.1618555188179016, 0.16921262443065643, 0.0], [0.19470101594924927, 1.2536050081253052, 1.0], [0.003414322156459093, 2.47721266746521, 0.0], [0.3444027900695801, -3.7807464599609375, 1.0], [0.6704398989677429, 1.4131289720535278, 1.0], [-0.002580759348347783, 2.4486427307128906, 0.0], [0.013680036179721355, -1.6506717205047607, 1.0], [0.513664722442627, -0.503451406955719, 0.0], [0.3393629789352417, -0.21340839564800262, 0.0], [0.493266224861145, -0.002349174115806818, 0.0], [0.32650136947631836, 0.1758425235748291, 0.0], [0.16157349944114685, 0.5186100602149963, 0.0], [0.00037477375008165836, 1.8067840337753296, 0.0], [0.17766056954860687, -3.8709585666656494, 1.0], [2.2866971492767334, 1.5744025707244873, 1.0], [-0.0022501181811094284, 2.449199914932251, 0.0], [0.004053104668855667, -1.9675462245941162, 1.0], [-0.31091833114624023, -0.3668674826622009, 0.0], [-0.30943137407302856, -0.17851096391677856, 0.0], [-0.49553781747817993, 0.006667684763669968, 0.0], [-0.3302924931049347, 0.18924254179000854, 0.0], [-0.33837655186653137, 0.36499130725860596, 0.0], [-0.17481102049350739, 0.5412363409996033, 0.0], [0.01356666348874569, 0.35249680280685425, 0.0], [0.18601271510124207, 0.5318494439125061, 0.0], [0.3242017924785614, 0.3541293144226074, 0.0], [0.3178649842739105, 0.17521560192108154, 0.0], [0.31632280349731445, -0.012077925726771355, 0.0], [0.30593574047088623, -0.18193966150283813, 0.0], [0.31992802023887634, -0.33188292384147644, 0.0], [0.1580486297607422, -3.372629404067993, 1.0], [0.565563976764679, 1.4532724618911743, 1.0], [0.001504819025285542, 2.5345449447631836, 0.0], [0.014953345991671085, -1.6036131381988525, 1.0], [0.4772886633872986, -0.490079402923584, 0.0], [0.3278573155403137, -0.24818013608455658, 0.0], [0.4684359133243561, -0.004018244333565235, 0.0], [0.3164530396461487, 0.16049577295780182, 0.0], [0.14362457394599915, -1.4715161323547363, 0.0], [1.707419991493225, 1.160811424255371, 1.0], [0.00524531677365303, 2.592998743057251, 0.0], [0.04980272799730301, -2.4060873985290527, 1.0], [-0.29331281781196594, -0.3665476441383362, 0.0], [-0.28791511058807373, -0.17992053925991058, 0.0], [0.3409886658191681, -0.001562914694659412, 0.0], [-0.37647536396980286, 0.12406186014413834, 0.0], [-0.24115456640720367, 0.2897314429283142, 0.0], [-0.19650883972644806, 0.45096680521965027, 0.0], [-0.050619304180145264, 0.37231552600860596, 0.0], [0.07852015644311905, 0.4569171071052551, 0.0], [0.19390417635440826, 0.4253357946872711, 0.0], [0.2821016311645508, 0.2556299567222595, 0.0], [0.27422696352005005, 0.07956957072019577, 0.0], [0.2772121727466583, -0.10352635383605957, 0.0], [0.2767865061759949, -0.26302286982536316, 0.0], [0.13454172015190125, -3.446946382522583, 1.0], [0.5392392873764038, 0.17209990322589874, 1.0], [-0.005315457936376333, 3.495760440826416, 0.0], [0.14362074434757233, 0.592957615852356, 1.0], [0.3802422285079956, 0.13926781713962555, 0.0], [0.28429338335990906, -0.07571936398744583, 0.0], [-1.2023253440856934, -2.5299034118652344, 1.0], [1.0561481714248657, -0.0012223566882312298, 0.0], [0.3134279251098633, -1.4412070512771606, 1.0], [0.606343150138855, 0.18798929452896118, 1.0], [0.18042366206645966, 0.2472306787967682, 0.0], [0.16435222327709198, -0.13096290826797485, 0.0], [-0.14054252207279205, -0.19765368103981018, 0.0], [-0.16480010747909546, 0.17566964030265808, 0.0], [0.19828523695468903, 1.279800534248352, 1.0], [0.0032664500176906586, 2.5529253482818604, 0.0], [0.3463369309902191, -3.902592420578003, 1.0], [0.6683274507522583, 1.457722783088684, 1.0], [-0.003879194613546133, 2.4248387813568115, 0.0], [0.01984434202313423, -1.6749600172042847, 1.0], [0.5094201564788818, -0.5062687397003174, 0.0], [0.3475934565067291, -0.21802933514118195, 0.0], [0.4981845021247864, -0.0025862022303044796, 0.0], [0.32969245314598083, 0.18105505406856537, 0.0], [0.16517126560211182, 0.5358114838600159, 0.0], [-0.0010916497558355331, 1.8191745281219482, 0.0], [0.17533186078071594, -3.896230459213257, 1.0], [2.291646718978882, 1.5909185409545898, 1.0], [-0.0009330346947535872, 2.5039587020874023, 0.0], [-0.00021035327517893165, -1.9733126163482666, 1.0], [-0.3065006732940674, -0.3701717257499695, 0.0], [-0.31023433804512024, -0.1823933869600296, 0.0], [-0.49146145582199097, 0.004863768815994263, 0.0], [-0.3305433392524719, 0.18935997784137726, 0.0], [-0.3305460810661316, 0.36667850613594055, 0.0], [-0.1743328869342804, 0.5453548431396484, 0.0], [0.0061408462934195995, 0.35098204016685486, 0.0], [0.17969080805778503, 0.5342682003974915, 0.0], [0.323687881231308, 0.3602812588214874, 0.0], [0.32259559631347656, 0.18041495978832245, 0.0], [0.31134751439094543, -0.006858799606561661, 0.0], [0.3111262917518616, -0.17762653529644012, 0.0], [0.31292131543159485, -0.3253447413444519, 0.0], [0.15760540962219238, -3.362276792526245, 1.0], [0.5850536823272705, 1.4483619928359985, 1.0], [0.0008455878123641014, 2.4572041034698486, 0.0], [0.017697738483548164, -1.5926415920257568, 1.0], [0.47817501425743103, -0.4855295717716217, 0.0], [0.3235752284526825, -0.24105043709278107, 0.0], [0.4696641266345978, -0.0035273791290819645, 0.0], [0.31343358755111694, 0.1680016964673996, 0.0], [0.14283625781536102, -1.4636870622634888, 0.0], [1.8746693134307861, 1.1705548763275146, 1.0], [0.005766994785517454, 2.572470188140869, 0.0], [0.046899713575839996, -2.347811222076416, 1.0], [-0.3012648820877075, -0.36632996797561646, 0.0], [-0.29859793186187744, -0.18114636838436127, 0.0], [-0.48366230726242065, -0.009998638182878494, 0.0], [-0.36025676131248474, 0.15468846261501312, 0.0], [-0.33015355467796326, 0.3373061418533325, 0.0], [-0.18316110968589783, 0.5159361958503723, 0.0], [-0.0004122612299397588, 0.34805914759635925, 0.0], [0.17386183142662048, 0.5122383236885071, 0.0], [0.317266047000885, 0.34769579768180847, 0.0], [0.3186005651950836, 0.17917653918266296, 0.0], [0.31110358238220215, -0.004475518595427275, 0.0], [0.30823463201522827, -0.17178794741630554, 0.0], [0.3095510005950928, -0.31651565432548523, 0.0], [0.16078348457813263, -3.363370895385742, 1.0], [0.6339117884635925, 0.17449115216732025, 1.0], [-0.003665617201477289, 3.600837469100952, 0.0], [0.15216629207134247, 0.6036299467086792, 1.0], [0.4006744921207428, 0.13570536673069, 0.0], [0.3042195737361908, -0.07014048844575882, 0.0], [-1.2723736763000488, -2.5392720699310303, 1.0], [1.131347894668579, -0.0029865761753171682, 0.0], [0.3347280025482178, -1.476266622543335, 1.0], [0.5933443307876587, 0.19100962579250336, 1.0], [0.1808679848909378, 0.24554932117462158, 0.0], [0.16892169415950775, -0.12269150465726852, 0.0], [-0.14210881292819977, -0.1965675950050354, 0.0], [-0.1659073531627655, 0.17307893931865692, 0.0], [0.19913573563098907, 1.2773298025131226, 1.0], [0.002734287641942501, 2.534707546234131, 0.0], [0.3481491506099701, -3.8616862297058105, 1.0], [0.6685276627540588, 1.4434130191802979, 1.0], [-0.0017734046559780836, 2.3835911750793457, 0.0], [0.020298348739743233, -1.6584432125091553, 1.0], [0.5101117491722107, -0.4992894232273102, 0.0], [0.3442043662071228, -0.22412878274917603, 0.0], [0.4962252676486969, -0.002070001559332013, 0.0], [0.3281001150608063, 0.1793014258146286, 0.0], [0.163554385304451, 0.5305949449539185, 0.0], [-0.0008977276156656444, 1.7995160818099976, 0.0], [0.17737680673599243, -3.8848564624786377, 1.0], [2.2947773933410645, 1.558810830116272, 1.0], [-0.0018719256622716784, 2.4686880111694336, 0.0], [0.0012333542108535767, -1.9662400484085083, 1.0], [-0.3102548122406006, -0.36501508951187134, 0.0], [-0.31199246644973755, -0.18009811639785767, 0.0], [-0.4994044899940491, 0.006978936959058046, 0.0], [-0.3332180678844452, 0.18954847753047943, 0.0], [-0.334780752658844, 0.37100857496261597, 0.0], [-0.17372512817382812, 0.5472598671913147, 0.0], [0.008422726765275002, 0.35323581099510193, 0.0], [0.18100741505622864, 0.5325347185134888, 0.0], [0.3265262842178345, 0.35576918721199036, 0.0], [0.32559332251548767, 0.18213295936584473, 0.0], [0.3171648383140564, -0.008523797616362572, 0.0], [0.3137464225292206, -0.17660117149353027, 0.0], [0.30989202857017517, -0.3266991376876831, 0.0], [0.1589599996805191, -3.4013381004333496, 1.0], [0.5680539608001709, 1.4673149585723877, 1.0], [0.0007724091410636902, 2.5370001792907715, 0.0], [0.01427043229341507, -1.6138942241668701, 1.0], [0.47374090552330017, -0.49111461639404297, 0.0], [0.3285543620586395, -0.24888473749160767, 0.0], [0.4672771096229553, -0.003963858354836702, 0.0], [0.3161461651325226, 0.16150549054145813, 0.0], [0.14258930087089539, -1.5012000799179077, 0.0], [1.840127944946289, 1.195326328277588, 1.0], [0.004702516831457615, 2.557713747024536, 0.0], [0.049097880721092224, -2.362283706665039, 1.0], [-0.3000201880931854, -0.37299761176109314, 0.0], [-0.2939724624156952, -0.18140411376953125, 0.0], [-0.48339271545410156, -0.010830712504684925, 0.0], [-0.3502538800239563, 0.15016788244247437, 0.0], [-0.32533350586891174, 0.3343183696269989, 0.0], [-0.18636317551136017, 0.5129467248916626, 0.0], [-0.0006883749156259, 0.34540578722953796, 0.0], [0.16705580055713654, 0.5103452205657959, 0.0], [0.31516680121421814, 0.34461483359336853, 0.0], [0.3200797140598297, 0.17875038087368011, 0.0], [0.3119436204433441, -0.0059188599698245525, 0.0], [0.30765098333358765, -0.17379681766033173, 0.0], [0.307451993227005, -0.3186641335487366, 0.0], [0.15906652808189392, -3.335233211517334, 1.0], [0.5653916001319885, 1.4431384801864624, 1.0], [0.00048343438538722694, 2.4779052734375, 0.0], [0.01591174677014351, -1.6171749830245972, 1.0], [0.47263839840888977, -0.4892244040966034, 0.0], [0.3342290222644806, -0.24672091007232666, 0.0], [0.46406036615371704, -0.004378689918667078, 0.0], [0.3168860971927643, 0.16472184658050537, 0.0], [0.14324331283569336, -1.436562180519104, 1.0], [2.011815071105957, 1.3759275674819946, 1.0], [-0.00016739267448429018, 2.3324646949768066, 0.0], [0.023544136434793472, -2.0664901733398438, 1.0], [-0.2935670018196106, -0.350834459066391, 0.0], [-0.2959315776824951, -0.17266172170639038, 0.0], [-0.47685638070106506, -0.001899458933621645, 0.0], [-0.34975719451904297, 0.16047708690166473, 0.0]], [[2.3683931827545166, 1.6698999404907227, 1.0], [-0.23598811030387878, -0.32870981097221375, 0.0], [-0.41699010133743286, -0.16027992963790894, 0.0], [-0.4931969940662384, 0.0012576765147969127, 0.0], [-0.2896319627761841, 0.17982271313667297, 0.0], [-0.234628364443779, 0.3386569619178772, 0.0], [0.07034510374069214, 0.3484896421432495, 0.0], [0.14150050282478333, 0.37987256050109863, 0.0], [0.2140742987394333, 0.41740044951438904, 0.0], [0.27345582842826843, 0.37716934084892273, 0.0], [0.29998520016670227, 0.20374418795108795, 0.0], [0.3018076717853546, 0.03016197867691517, 0.0], [0.2940703332424164, -0.13502635061740875, 0.0], [0.2955757975578308, -0.28032127022743225, 0.0], [0.1502130776643753, -3.308565855026245, 1.0], [0.5002347230911255, 1.404683232307434, 1.0], [0.00032548446324653924, 2.3224971294403076, 0.0], [0.019220717251300812, -1.5078809261322021, 1.0], [0.45512932538986206, -0.4618641436100006, 0.0], [0.31134307384490967, -0.2310924232006073, 0.0], [0.4574374258518219, -0.007934199646115303, 0.0], [0.3031735420227051, 0.1592821478843689, 0.0], [0.14029960334300995, -1.4193967580795288, 0.0], [1.7385339736938477, 1.1541461944580078, 1.0], [0.006033175624907017, 2.4538843631744385, 0.0], [0.04996798560023308, -2.3068315982818604, 1.0], [-0.2908684015274048, -0.3596615493297577, 0.0], [-0.28469711542129517, -0.17739978432655334, 0.0], [0.3339409828186035, -0.0015079628210514784, 0.0], [-0.37553125619888306, 0.1208389550447464, 0.0], [-0.2426994889974594, 0.2825194001197815, 0.0], [-0.2002873718738556, 0.44029441475868225, 0.0], [-0.04563154652714729, 0.3603900372982025, 0.0], [0.09036213159561157, 0.4444681406021118, 0.0], [0.20970486104488373, 0.4023038148880005, 0.0], [0.2816007137298584, 0.2367272973060608, 0.0], [0.2787192463874817, 0.060886088758707047, 0.0], [0.2760089337825775, -0.11262879520654678, 0.0], [0.28371086716651917, -0.26842308044433594, 0.0], [0.13767282664775848, -3.364201784133911, 1.0], [0.4970293939113617, 1.4264708757400513, 1.0], [-0.0007592345937155187, 2.3562581539154053, 0.0], [0.01895836740732193, -1.5335228443145752, 1.0], [0.44138771295547485, -0.4676990509033203, 0.0], [0.3049001097679138, -0.23249666392803192, 0.0], [0.4341588318347931, -0.007018629461526871, 0.0], [0.30210286378860474, 0.15869233012199402, 0.0], [0.13624723255634308, -1.4495477676391602, 0.0], [1.7153605222702026, 1.1174795627593994, 1.0], [0.0060445088893175125, 2.5355160236358643, 0.0], [0.04813090339303017, -2.3306593894958496, 1.0], [-0.2917921543121338, -0.36321306228637695, 0.0], [-0.285421222448349, -0.17674537003040314, 0.0], [0.33583351969718933, -0.003986605443060398, 0.0], [-0.37654173374176025, 0.12039842456579208, 0.0], [-0.23860709369182587, 0.287248820066452, 0.0], [-0.20278610289096832, 0.44163790345191956, 0.0], [-0.045690879225730896, 0.36344605684280396, 0.0], [0.08848337084054947, 0.45072653889656067, 0.0], [0.2063479870557785, 0.40571993589401245, 0.0], [0.2801765501499176, 0.23953893780708313, 0.0], [0.2778080701828003, 0.06502260267734528, 0.0], [0.2748820185661316, -0.11157382279634476, 0.0], [0.27836117148399353, -0.2677451968193054, 0.0], [0.13642369210720062, -3.374260187149048, 1.0], [0.564946711063385, 0.16854603588581085, 1.0], [-0.002353178570047021, 3.4615719318389893, 0.0], [0.14391013979911804, 0.5842458009719849, 1.0], [0.3826150596141815, 0.1356920450925827, 0.0], [0.2888815999031067, -0.07817929238080978, 0.0], [-1.2112102508544922, -2.494509220123291, 1.0], [1.042249321937561, -0.0025122705847024918, 0.0], [0.3123264014720917, -1.425896406173706, 1.0], [0.569756031036377, 0.1853136569261551, 1.0], [0.17928825318813324, 0.24686433374881744, 0.0], [0.1652172952890396, -0.12005960196256638, 0.0], [-0.13433416187763214, -0.19441905617713928, 0.0], [-0.16006143391132355, 0.17555058002471924, 0.0], [0.19330817461013794, 1.2650789022445679, 1.0], [0.0029479230288416147, 2.500393867492676, 0.0], [0.3356434404850006, -3.841984748840332, 1.0], [0.6756963729858398, 1.4353992938995361, 1.0], [-0.002256357576698065, 2.4463350772857666, 0.0], [0.01391714159399271, -1.6985013484954834, 1.0], [0.5088331699371338, -0.5159839391708374, 0.0], [0.3478492200374603, -0.22617046535015106, 0.0], [0.49680250883102417, -0.0027595055289566517, 0.0], [0.32281145453453064, 0.18045231699943542, 0.0], [0.1650448590517044, 0.5310823321342468, 0.0], [-0.0005653327680192888, 1.815521001815796, 0.0], [0.17632248997688293, -3.878572940826416, 1.0], [2.1804025173187256, 1.560915231704712, 1.0], [-0.002661702921614051, 2.515089273452759, 0.0], [0.0011980170384049416, -2.019261121749878, 1.0], [-0.29813164472579956, -0.3705863058567047, 0.0], [-0.3008880913257599, -0.18280120193958282, 0.0], [-0.4769571125507355, 0.00447596050798893, 0.0], [-0.3298080861568451, 0.18368121981620789, 0.0], [-0.33099979162216187, 0.3631027042865753, 0.0], [-0.1750408560037613, 0.54315584897995, 0.0], [0.006121628452092409, 0.3488965928554535, 0.0], [0.17564502358436584, 0.535236120223999, 0.0], [0.3153054118156433, 0.35866281390190125, 0.0], [0.31611236929893494, 0.18160489201545715, 0.0], [0.4856433570384979, -0.003724512876942754, 0.0], [0.30998164415359497, -0.18311259150505066, 0.0], [0.3182796835899353, -0.35720908641815186, 0.0], [0.16758878529071808, -3.3899431228637695, 1.0], [0.6003796458244324, 1.4604887962341309, 1.0], [-0.0007895041489973664, 2.4787325859069824, 0.0], [0.01516016572713852, -1.6036465167999268, 1.0], [0.480682909488678, -0.4852581322193146, 0.0], [0.3298899233341217, -0.23746395111083984, 0.0], [0.4742852449417114, -0.003985888324677944, 0.0], [0.3174581229686737, 0.16106098890304565, 0.0], [0.1458740234375, -1.4474965333938599, 0.0], [1.7770806550979614, 1.1496273279190063, 1.0], [0.006199134513735771, 2.560086965560913, 0.0], [0.050225213170051575, -2.350031852722168, 1.0], [-0.2948741912841797, -0.36613890528678894, 0.0], [-0.28921881318092346, -0.17915195226669312, 0.0], [0.34411975741386414, 0.0001724021858535707, 0.0], [-0.3806670904159546, 0.12139289081096649, 0.0], [-0.24984513223171234, 0.2852136492729187, 0.0], [-0.21416126191616058, 0.4439992308616638, 0.0], [-0.05860411003232002, 0.37181356549263, 0.0], [0.07698287814855576, 0.4539428651332855, 0.0], [0.19724240899085999, 0.4193265736103058, 0.0], [0.2901882529258728, 0.25430822372436523, 0.0], [0.28431159257888794, 0.07865399122238159, 0.0], [0.2802579700946808, -0.10523328185081482, 0.0], [0.28052499890327454, -0.2630142271518707, 0.0], [0.13609381020069122, -3.446633815765381, 1.0], [0.5647313594818115, 0.1719343513250351, 1.0], [-0.00347574963234365, 3.554903984069824, 0.0], [0.14787086844444275, 0.6094607710838318, 1.0], [0.3924608528614044, 0.14187763631343842, 0.0], [0.29230737686157227, -0.07416186481714249, 0.0], [-1.221733808517456, -2.562382936477661, 1.0], [1.0476144552230835, -0.001646044896915555, 0.0], [0.314567893743515, -1.4383223056793213, 1.0], [0.6055672764778137, 0.18702277541160583, 1.0], [0.17943274974822998, 0.24404115974903107, 0.0], [0.16887301206588745, -0.11661405861377716, 0.0], [-0.13402175903320312, -0.19955198466777802, 0.0], [-0.16156961023807526, 0.17415843904018402, 0.0], [0.2002028524875641, 1.2802642583847046, 1.0], [0.002670601010322571, 2.5288352966308594, 0.0], [0.34013131260871887, -3.9041085243225098, 1.0], [0.6977912187576294, 1.4661064147949219, 1.0], [-0.0027415098156780005, 2.402989387512207, 0.0], [0.02065115235745907, -1.6598867177963257, 1.0], [0.5080946683883667, -0.5030698180198669, 0.0], [0.3459392189979553, -0.2171090543270111, 0.0], [0.4988213777542114, -0.002405140781775117, 0.0], [0.33480438590049744, 0.1758999079465866, 0.0], [0.16567932069301605, 0.5351138710975647, 0.0], [-0.0008187950006686151, 1.8004487752914429, 0.0], [0.17855119705200195, -3.8977842330932617, 1.0], [2.343404531478882, 1.5795921087265015, 1.0], [-0.0013515489408746362, 2.5032596588134766, 0.0], [-0.0007781761232763529, -1.9817157983779907, 1.0], [-0.30778768658638, -0.36320337653160095, 0.0], [-0.3172771632671356, -0.17924125492572784, 0.0], [-0.5013109445571899, 0.006887567695230246, 0.0], [-0.3344963490962982, 0.1920970380306244, 0.0], [-0.3435521721839905, 0.36876851320266724, 0.0], [-0.1746695339679718, 0.5435487627983093, 0.0], [0.004655685741454363, 0.3513858914375305, 0.0], [0.18683335185050964, 0.5370520949363708, 0.0], [0.33077457547187805, 0.36244750022888184, 0.0], [0.3208690285682678, 0.1791554093360901, 0.0], [0.321011483669281, -0.011352530680596828, 0.0], [0.3127576410770416, -0.1729145646095276, 0.0], [0.31399378180503845, -0.3271903693675995, 0.0], [0.15994365513324738, -3.3773345947265625, 1.0], [0.5741935968399048, 1.4451156854629517, 1.0], [-0.0009237129706889391, 2.4854483604431152, 0.0], [0.015166631899774075, -1.6185492277145386, 1.0], [0.4774836003780365, -0.49099740386009216, 0.0], [0.3309025168418884, -0.2391652762889862, 0.0], [0.46588289737701416, -0.00311588984914124, 0.0], [0.3118141293525696, 0.16590330004692078, 0.0], [0.1436339020729065, -1.4665921926498413, 0.0], [1.7092444896697998, 1.1387653350830078, 1.0], [0.006715069059282541, 2.5953874588012695, 0.0], [0.05074956268072128, -2.3968794345855713, 1.0], [-0.2888226807117462, -0.36651113629341125, 0.0], [-0.30523204803466797, -0.2087157964706421, 0.0], [0.33877116441726685, 0.001081845024600625, 0.0], [-0.3841000199317932, 0.11936335265636444, 0.0], [-0.2461383193731308, 0.2841329574584961, 0.0], [-0.20934301614761353, 0.44757080078125, 0.0], [-0.05298702418804169, 0.3707711398601532, 0.0], [0.08074682950973511, 0.45954713225364685, 0.0], [0.19860371947288513, 0.42296725511550903, 0.0], [0.2865675091743469, 0.25747066736221313, 0.0], [0.28363218903541565, 0.07786594331264496, 0.0], [0.27722692489624023, -0.1077517569065094, 0.0], [0.2807502746582031, -0.2678539752960205, 0.0], [0.1384056806564331, -3.458007335662842, 1.0], [0.5084037184715271, 1.4665822982788086, 1.0], [2.359250356676057e-05, 2.428612470626831, 0.0], [0.022397125139832497, -1.6126142740249634, 1.0], [0.44251805543899536, -0.490312397480011, 0.0], [0.31296759843826294, -0.24033811688423157, 0.0], [0.4509921669960022, -0.006591628305613995, 0.0], [0.30490195751190186, 0.16809459030628204, 0.0], [0.1396765261888504, -1.4630481004714966, 0.0], [0.4806390106678009, 1.2084131240844727, 1.0], [0.006029524840414524, 2.3708949089050293, 0.0], [0.013600560836493969, -1.6328130960464478, 1.0], [0.49064433574676514, -0.48899808526039124, 0.0], [0.3333832621574402, -0.2063322365283966, 0.0], [0.4780491590499878, -0.004831782542169094, 0.0], [0.32473987340927124, 0.1801135540008545, 0.0], [0.16725970804691315, 0.529937744140625, 0.0], [0.00010705251042963937, 1.7891188859939575, 0.0], [0.17127251625061035, -3.86474347114563, 1.0], [2.323885202407837, 1.5517958402633667, 1.0], [-0.0013507455587387085, 2.5190985202789307, 0.0], [-0.0027918685227632523, -1.9743947982788086, 1.0], [-0.30820345878601074, -0.3637261986732483, 0.0], [-0.3104933500289917, -0.17962339520454407, 0.0], [-0.49419817328453064, 0.005396375432610512, 0.0], [-0.33084043860435486, 0.18963971734046936, 0.0], [-0.3455730676651001, 0.3684760332107544, 0.0], [-0.17699319124221802, 0.5420151352882385, 0.0], [0.0049254694022238255, 0.3520454466342926, 0.0], [0.18238240480422974, 0.5336732864379883, 0.0], [0.3243435025215149, 0.35938966274261475, 0.0], [0.3250681459903717, 0.1809091717004776, 0.0], [0.3162887990474701, -0.006021917797625065, 0.0], [0.31623733043670654, -0.17528197169303894, 0.0]], [[2.4237258434295654, 1.7099220752716064, 1.0], [-0.22569923102855682, -0.331202894449234, 0.0], [-0.4449511170387268, -0.16174963116645813, 0.0], [-0.5066835284233093, 0.0007288527558557689, 0.0], [-0.49408361315727234, 0.17345030605793, 0.0], [-0.2256591022014618, 0.34083855152130127, 0.0], [0.10350117832422256, 0.3308608829975128, 0.0], [0.17805664241313934, 0.39730677008628845, 0.0], [0.79042649269104, 0.16017363965511322, 0.0], [0.3171907961368561, 0.15667425096035004, 0.0], [0.21431726217269897, 0.3144374191761017, 0.0], [0.0670686587691307, 0.1613088697195053, 0.0], [-0.08008033037185669, 0.3175523281097412, 0.0], [-0.481848806142807, 0.14803530275821686, 0.0], [-0.4964931607246399, -0.02082192339003086, 0.0], [-0.5230655670166016, -0.1914149820804596, 0.0], [-0.17549867928028107, -0.3539464771747589, 0.0], [2.0206053256988525, -3.244953155517578, 1.0], [0.6941966414451599, 0.1706739217042923, 1.0], [-0.006088505033403635, 3.4216320514678955, 0.0], [0.14924347400665283, 0.5649412870407104, 1.0], [0.41767269372940063, 0.13136465847492218, 0.0], [0.3174494504928589, -0.06352703273296356, 0.0], [-1.3190456628799438, -2.4186201095581055, 1.0], [1.1502878665924072, -0.007492583245038986, 0.0], [0.34253790974617004, -1.3998682498931885, 1.0], [0.6075959205627441, 0.18238279223442078, 1.0], [0.1867716908454895, 0.24130740761756897, 0.0], [0.1697898805141449, -0.12267834693193436, 0.0], [-0.14918118715286255, -0.18963369727134705, 0.0], [-0.16320273280143738, 0.17191578447818756, 0.0], [0.19879233837127686, 1.2449053525924683, 1.0], [0.0018906742334365845, 2.455427885055542, 0.0], [0.34986451268196106, -3.737480640411377, 1.0], [0.6721782684326172, 1.4143273830413818, 1.0], [-0.0017065169522538781, 2.352546453475952, 0.0], [0.016555309295654297, -1.6094101667404175, 1.0], [0.5148118138313293, -0.48917168378829956, 0.0], [0.33554938435554504, -0.2103949934244156, 0.0], [0.5030186176300049, -0.0031469790264964104, 0.0], [0.3292383551597595, 0.17183072865009308, 0.0], [0.1681537926197052, 0.5196194648742676, 0.0], [0.00010055793245555833, 1.7657814025878906, 0.0], [0.17567026615142822, -3.7775516510009766, 1.0], [2.3068244457244873, 1.5317655801773071, 1.0], [-0.002052802126854658, 2.484306573867798, 0.0], [0.00016222662816289812, -1.9685924053192139, 1.0], [-0.3045942783355713, -0.3579893112182617, 0.0], [-0.3130928575992584, -0.1797896772623062, 0.0], [-0.4976364076137543, 0.004687577951699495, 0.0], [-0.3396807312965393, 0.1822911500930786, 0.0], [-0.3404759466648102, 0.3640330731868744, 0.0], [-0.1784297078847885, 0.5342822670936584, 0.0], [0.007192304823547602, 0.3498716354370117, 0.0], [0.1836036741733551, 0.5295057892799377, 0.0], [0.3254261016845703, 0.3559383451938629, 0.0], [0.3174438774585724, 0.18007485568523407, 0.0], [0.3123968243598938, -0.006452764850109816, 0.0], [0.3177686035633087, -0.17107628285884857, 0.0], [0.31578272581100464, -0.31767430901527405, 0.0], [0.16223230957984924, -3.3302359580993652, 1.0], [0.5710628628730774, 1.4299627542495728, 1.0], [-0.0005030048778280616, 2.3732519149780273, 0.0], [0.018320754170417786, -1.5358299016952515, 1.0], [0.4724210202693939, -0.466219425201416, 0.0], [0.3296744227409363, -0.23269537091255188, 0.0], [0.47480231523513794, -0.005535331554710865, 0.0], [0.3153473436832428, 0.16239714622497559, 0.0], [0.14195281267166138, -1.4407010078430176, 0.0], [1.8026161193847656, 1.1377713680267334, 1.0], [0.005146893206983805, 2.514051675796509, 0.0], [0.04960206151008606, -2.3066182136535645, 1.0], [-0.2964686453342438, -0.3606135845184326, 0.0], [-0.29227492213249207, -0.17814093828201294, 0.0], [-0.4806439280509949, -0.014943365007638931, 0.0], [-0.3532244861125946, 0.14776143431663513, 0.0], [-0.31957897543907166, 0.3302936255931854, 0.0], [-0.18648935854434967, 0.5047740340232849, 0.0], [-0.0015862794825807214, 0.34363698959350586, 0.0], [0.1640923172235489, 0.4967832565307617, 0.0], [0.3127678334712982, 0.33242055773735046, 0.0], [0.3134206533432007, 0.1721101999282837, 0.0], [0.305692195892334, -0.00670305360108614, 0.0], [0.2975272834300995, -0.17311474680900574, 0.0], [0.3103344440460205, -0.31466132402420044, 0.0], [0.15896566212177277, -3.282188653945923, 1.0], [0.5589399337768555, 1.4179596900939941, 1.0], [5.063051503384486e-05, 2.444009304046631, 0.0], [0.014646945521235466, -1.5626038312911987, 1.0], [0.470793217420578, -0.4779565632343292, 0.0], [0.3181774914264679, -0.23525986075401306, 0.0], [0.45712342858314514, -0.005878656171262264, 0.0], [0.3155912458896637, 0.15934187173843384, 0.0], [0.14116041362285614, -1.4497895240783691, 0.0], [1.8082209825515747, 1.149583101272583, 1.0], [0.005983791779726744, 2.5084805488586426, 0.0], [0.048402320593595505, -2.302880048751831, 1.0], [-0.29139554500579834, -0.36042532324790955, 0.0], [-0.2896892726421356, -0.1782098263502121, 0.0], [-0.4757715165615082, -0.011706992983818054, 0.0], [-0.3493831753730774, 0.1488541066646576, 0.0], [-0.316685289144516, 0.3317073583602905, 0.0], [-0.1784621924161911, 0.5050232410430908, 0.0], [0.0039359829388558865, 0.340608686208725, 0.0], [0.16924457252025604, 0.5028960108757019, 0.0], [0.31225278973579407, 0.33595454692840576, 0.0], [0.31623411178588867, 0.1749541461467743, 0.0], [0.31073641777038574, -0.009044967591762543, 0.0], [0.30203452706336975, -0.17178215086460114, 0.0], [0.3162249028682709, -0.31923341751098633, 0.0], [0.15850016474723816, -3.2982337474823, 1.0], [0.561190664768219, 1.4214924573898315, 1.0], [-0.001113264705054462, 2.416060209274292, 0.0], [0.017590826377272606, -1.5741702318191528, 1.0], [0.4731443226337433, -0.4789849817752838, 0.0], [0.32434704899787903, -0.23196947574615479, 0.0], [0.4682978689670563, -0.005549709312617779, 0.0], [0.31398507952690125, 0.16004464030265808, 0.0], [0.14181102812290192, -1.4264012575149536, 1.0], [2.1769163608551025, 1.4560528993606567, 1.0], [-0.00046034491970203817, 2.2780075073242188, 0.0], [0.021320652216672897, -1.980239987373352, 1.0], [-0.29717788100242615, -0.346584677696228, 0.0], [-0.3056454360485077, -0.17368057370185852, 0.0], [-0.4870700538158417, -0.0021459220442920923, 0.0], [-0.35044047236442566, 0.16199269890785217, 0.0], [-0.33804792165756226, 0.3351232707500458, 0.0], [-0.18393796682357788, 0.505595326423645, 0.0], [0.001715461490675807, 0.33052799105644226, 0.0], [0.17404425144195557, 0.5021698474884033, 0.0], [0.32629409432411194, 0.34006407856941223, 0.0], [0.3266885280609131, 0.1766393631696701, 0.0], [0.3251971900463104, -0.008658181875944138, 0.0], [0.31263014674186707, -0.16594728827476501, 0.0], [0.3185979723930359, -0.3094818890094757, 0.0], [0.16211193799972534, -3.246760129928589, 1.0], [0.5554211735725403, 1.3906030654907227, 1.0], [-0.0004445463709998876, 2.387901782989502, 0.0], [0.017907317727804184, -1.5191831588745117, 1.0], [0.4791652262210846, -0.46283453702926636, 0.0], [0.32718655467033386, -0.22838225960731506, 0.0], [0.4711678624153137, -0.00493794959038496, 0.0], [0.316263884305954, 0.1546477973461151, 0.0], [0.14269281923770905, -1.4138020277023315, 0.0], [1.7883235216140747, 1.1384696960449219, 1.0], [0.005593837238848209, 2.479060411453247, 0.0], [0.04845770448446274, -2.304030179977417, 1.0], [-0.29138705134391785, -0.3579680025577545, 0.0], [-0.288287878036499, -0.17554691433906555, 0.0], [-0.44587475061416626, -0.017355913296341896, 0.0], [-0.3548254370689392, 0.14229826629161835, 0.0], [-0.3145621120929718, 0.31999659538269043, 0.0], [-0.18444080650806427, 0.5021423101425171, 0.0], [0.0006434532697312534, 0.33500587940216064, 0.0], [0.16920778155326843, 0.4877452552318573, 0.0], [0.30555668473243713, 0.3293299376964569, 0.0], [0.314328670501709, 0.17013654112815857, 0.0], [0.30595681071281433, -0.008353729732334614, 0.0], [0.3086583912372589, -0.1727142632007599, 0.0], [0.31119775772094727, -0.31324586272239685, 0.0], [0.15817710757255554, -3.2374157905578613, 1.0], [0.5577082633972168, 1.3992464542388916, 1.0], [0.0008614435791969299, 2.410313844680786, 0.0], [0.01765863411128521, -1.563011646270752, 1.0], [0.46946755051612854, -0.4777454733848572, 0.0], [0.3218243420124054, -0.23922745883464813, 0.0], [0.4591325521469116, -0.004947887267917395, 0.0], [0.31191012263298035, 0.16019602119922638, 0.0], [0.14153456687927246, -1.4221868515014648, 0.0], [1.684830665588379, 1.1058521270751953, 1.0], [0.006525536999106407, 2.5049679279327393, 0.0], [0.05403326824307442, -2.345996856689453, 1.0], [-0.29461124539375305, -0.35924145579338074, 0.0], [-0.3045123219490051, -0.2030813992023468, 0.0], [0.33021631836891174, -0.0011759123299270868, 0.0], [-0.38133957982063293, 0.1160021647810936, 0.0], [-0.24447187781333923, 0.2839277982711792, 0.0], [-0.19765298068523407, 0.4458918273448944, 0.0], [-0.040105901658535004, 0.36275914311408997, 0.0], [0.09709503501653671, 0.44789400696754456, 0.0], [0.21145984530448914, 0.40851062536239624, 0.0], [0.2819010615348816, 0.24079933762550354, 0.0], [0.2824394106864929, 0.05900392681360245, 0.0], [0.28336769342422485, -0.11931531876325607, 0.0], [0.27819037437438965, -0.272818922996521, 0.0], [0.13669195771217346, -3.3337340354919434, 1.0], [0.5127471685409546, 1.4191268682479858, 1.0], [-0.000587782880757004, 2.436039447784424, 0.0], [0.016773391515016556, -1.568795084953308, 1.0], [0.4457654356956482, -0.4776226580142975, 0.0], [0.30926892161369324, -0.23383504152297974, 0.0], [0.45002055168151855, -0.00819435715675354, 0.0], [0.3016352653503418, 0.16058675944805145, 0.0], [0.13640375435352325, -1.4496288299560547, 0.0], [0.48982203006744385, 1.1781560182571411, 1.0], [0.005458486266434193, 2.348161458969116, 0.0], [0.014053812250494957, -1.6004661321640015, 1.0], [0.48797130584716797, -0.4788261353969574, 0.0], [0.32984501123428345, -0.20506593585014343, 0.0], [0.47864559292793274, -0.00561664579436183, 0.0], [0.318614661693573, 0.17415845394134521, 0.0], [0.16491201519966125, 0.5215374231338501, 0.0], [9.465561015531421e-05, 1.7651503086090088, 0.0], [0.17452755570411682, -3.799924850463867, 1.0], [2.205857753753662, 1.5338528156280518, 1.0], [-0.002446221886202693, 2.4958605766296387, 0.0], [-0.00010223885328741744, -1.9751471281051636, 1.0], [-0.30433163046836853, -0.3657428026199341, 0.0], [-0.30597758293151855, -0.178529292345047, 0.0], [-0.4845711290836334, 0.004253070801496506, 0.0], [-0.3263157308101654, 0.18276691436767578, 0.0], [-0.3377136290073395, 0.36129435896873474, 0.0], [-0.16937357187271118, 0.5330872535705566, 0.0], [0.013162117451429367, 0.35006609559059143, 0.0], [0.18392325937747955, 0.5224937200546265, 0.0], [0.31597796082496643, 0.3511730432510376, 0.0], [0.31305521726608276, 0.17867818474769592, 0.0], [0.3140544295310974, -0.00858468096703291, 0.0], [0.30467984080314636, -0.1768387258052826, 0.0], [0.3113575279712677, -0.3254307508468628, 0.0], [0.15907621383666992, -3.3506381511688232, 1.0], [0.584124743938446, 1.4382294416427612, 1.0], [-0.000517874606885016, 2.472271680831909, 0.0], [0.014640692621469498, -1.6139158010482788, 1.0], [0.4804028272628784, -0.49192559719085693, 0.0], [0.3319166600704193, -0.2441166192293167, 0.0], [0.4676803648471832, -0.0047019729390740395, 0.0], [0.3176769018173218, 0.1654144525527954, 0.0], [0.1428564190864563, -1.4165469408035278, 0.0], [0.49364253878593445, 1.170330286026001, 1.0], [0.0067513808608055115, 2.374204635620117, 0.0], [0.014530046842992306, -1.6344290971755981, 1.0], [0.5053470730781555, -0.49406230449676514, 0.0], [0.33566218614578247, -0.20215679705142975, 0.0]], [[2.4065053462982178, 1.6941063404083252, 1.0], [-0.22760629653930664, -0.3297872543334961, 0.0], [-0.43017664551734924, -0.1564912050962448, 0.0], [-0.4985558092594147, 0.0025187209248542786, 0.0], [-0.49135467410087585, 0.17604443430900574, 0.0], [-0.2314208447933197, 0.33325156569480896, 0.0], [0.09225925803184509, 0.3360498547554016, 0.0], [0.1669580638408661, 0.3898025453090668, 0.0], [0.7881537079811096, 0.16015072166919708, 0.0], [0.31939607858657837, 0.15378856658935547, 0.0], [0.21364332735538483, 0.3199906647205353, 0.0], [0.07498466223478317, 0.15958446264266968, 0.0], [-0.07773630321025848, 0.3095243573188782, 0.0], [-0.4890373945236206, 0.14583618938922882, 0.0], [-0.49909141659736633, -0.021254662424325943, 0.0], [-0.5089318752288818, -0.18860456347465515, 0.0], [-0.17221367359161377, -0.3552010953426361, 0.0], [1.992226004600525, -3.246375322341919, 1.0], [2.082834243774414, 1.5854789018630981, 1.0], [-0.005138266831636429, 2.3648946285247803, 0.0], [0.005304782185703516, -1.9644025564193726, 1.0], [-0.28957870602607727, -0.358388751745224, 0.0], [-0.296024888753891, -0.1751609593629837, 0.0], [-0.4710938334465027, 0.004604937043040991, 0.0], [-0.3219776153564453, 0.18763785064220428, 0.0], [-0.3247165083885193, 0.3600308299064636, 0.0], [-0.17393876612186432, 0.528426468372345, 0.0], [0.01555600669234991, 0.3446783423423767, 0.0], [0.18793652951717377, 0.5128210186958313, 0.0], [0.3158678114414215, 0.3371357321739197, 0.0], [0.3156226575374603, 0.16478142142295837, 0.0], [0.30578839778900146, -0.0182843878865242, 0.0], [0.3060409128665924, -0.18798589706420898, 0.0], [0.3085229992866516, -0.3317968249320984, 0.0], [0.15894925594329834, -3.293426275253296, 1.0], [0.6517425179481506, 0.1704978495836258, 1.0], [-0.003006531158462167, 3.6013834476470947, 0.0], [0.15380410850048065, 0.6050229668617249, 1.0], [0.40672868490219116, 0.13696226477622986, 0.0], [0.3008597791194916, -0.0700690969824791, 0.0], [-1.2679674625396729, -2.542088508605957, 1.0], [1.108312964439392, -0.005952280014753342, 0.0], [0.330762654542923, -1.4355002641677856, 1.0], [0.5757232308387756, 0.18901409208774567, 1.0], [0.1806834191083908, 0.25078561902046204, 0.0], [0.16983331739902496, -0.1233346164226532, 0.0], [-0.13929662108421326, -0.19515500962734222, 0.0], [-0.16733576357364655, 0.17396779358386993, 0.0], [0.20133914053440094, 1.2748440504074097, 1.0], [0.0013459260808303952, 2.4920997619628906, 0.0], [0.34104934334754944, -3.8477461338043213, 1.0], [0.6798533201217651, 1.4388692378997803, 1.0], [-0.0019188313744962215, 2.4142026901245117, 0.0], [0.013672650791704655, -1.624240756034851, 1.0], [0.5081425309181213, -0.48951247334480286, 0.0], [0.3484952449798584, -0.21572577953338623, 0.0], [0.4976155459880829, -0.00195773271843791, 0.0], [0.3316824436187744, 0.17481866478919983, 0.0], [0.1669483184814453, 0.5289398431777954, 0.0], [-0.0005286869127303362, 1.7828975915908813, 0.0], [0.17646387219429016, -3.8756463527679443, 1.0], [2.369879961013794, 1.540414571762085, 1.0], [-0.0013900146586820483, 2.573479413986206, 0.0], [-0.0022232900373637676, -1.9756492376327515, 1.0], [-0.31368348002433777, -0.36797529458999634, 0.0], [-0.32288601994514465, -0.18128612637519836, 0.0], [-0.5040143728256226, 0.004113920032978058, 0.0], [-0.33604276180267334, 0.1888442039489746, 0.0], [-0.34041157364845276, 0.3686644434928894, 0.0], [-0.17029252648353577, 0.5477358102798462, 0.0], [0.017519105225801468, 0.35632768273353577, 0.0], [0.19153229892253876, 0.5332838296890259, 0.0], [0.31949514150619507, 0.3608221411705017, 0.0], [0.3265458941459656, 0.1824556589126587, 0.0], [0.49814343452453613, -0.0030260873027145863, 0.0], [0.3251926898956299, -0.1831984966993332, 0.0], [0.3255162835121155, -0.35667333006858826, 0.0], [0.17033617198467255, -3.3719048500061035, 1.0], [0.605201780796051, 1.4637885093688965, 1.0], [-0.0015185648808255792, 2.502455472946167, 0.0], [0.015249325893819332, -1.5803396701812744, 1.0], [0.49156686663627625, -0.4806990921497345, 0.0], [0.3352678716182709, -0.24925152957439423, 0.0], [0.4788054823875427, -0.003517328528687358, 0.0], [0.32246002554893494, 0.16051706671714783, 0.0], [0.14600405097007751, -1.4898089170455933, 0.0], [1.7581037282943726, 1.1683075428009033, 1.0], [0.005532923154532909, 2.5584230422973633, 0.0], [0.05317311733961105, -2.3819847106933594, 1.0], [-0.2948448956012726, -0.3681498169898987, 0.0], [-0.28733277320861816, -0.18246419727802277, 0.0], [-0.4497818946838379, -0.015956737101078033, 0.0], [-0.35721197724342346, 0.14648151397705078, 0.0], [-0.3172042965888977, 0.33079808950424194, 0.0], [-0.19274568557739258, 0.505270779132843, 0.0], [-0.009610037319362164, 0.3465319573879242, 0.0], [0.15951763093471527, 0.5008467435836792, 0.0], [0.3087056875228882, 0.3439309597015381, 0.0], [0.31488126516342163, 0.1812618523836136, 0.0], [0.30863726139068604, -0.002811640501022339, 0.0], [0.30313724279403687, -0.16988025605678558, 0.0], [0.3037141263484955, -0.3155309855937958, 0.0], [0.15595141053199768, -3.3459415435791016, 1.0], [0.5628101825714111, 1.4398714303970337, 1.0], [0.0006841462454758584, 2.440056324005127, 0.0], [0.017521625384688377, -1.5902007818222046, 1.0], [0.48334234952926636, -0.4783822000026703, 0.0], [0.3307911157608032, -0.2351909875869751, 0.0], [0.4721294045448303, -0.004635431803762913, 0.0], [0.3125440180301666, 0.1655074805021286, 0.0], [0.14228719472885132, -1.464077353477478, 0.0], [1.714866280555725, 1.1732518672943115, 1.0], [0.0058126868680119514, 2.5035738945007324, 0.0], [0.04846853390336037, -2.356822967529297, 1.0], [-0.2881031930446625, -0.3603256642818451, 0.0], [-0.30235081911087036, -0.20505866408348083, 0.0], [0.3348921537399292, 0.0003720697422977537, 0.0], [-0.38729196786880493, 0.11995992809534073, 0.0], [-0.24504178762435913, 0.2886548936367035, 0.0], [-0.1978723257780075, 0.4498099386692047, 0.0], [-0.04692396521568298, 0.37235936522483826, 0.0], [0.08938897401094437, 0.4546395242214203, 0.0], [0.20283496379852295, 0.4148722290992737, 0.0], [0.28675511479377747, 0.2472984492778778, 0.0], [0.28316882252693176, 0.07281237840652466, 0.0], [0.27563825249671936, -0.10884296894073486, 0.0], [0.2815423309803009, -0.26876911520957947, 0.0], [0.133015975356102, -3.4587759971618652, 1.0], [0.5878406763076782, 0.17107586562633514, 1.0], [-0.003546050051227212, 3.6022233963012695, 0.0], [0.1431734263896942, 0.6190875172615051, 1.0], [0.38657093048095703, 0.13994784653186798, 0.0], [0.2866574227809906, -0.07468421757221222, 0.0], [-1.213687539100647, -2.5522449016571045, 1.0], [1.0656136274337769, -0.001818486605770886, 0.0], [0.3164456784725189, -1.460680603981018, 1.0], [0.606994092464447, 0.18950292468070984, 1.0], [0.1806725114583969, 0.2495441883802414, 0.0], [0.16793344914913177, -0.1261170208454132, 0.0], [-0.1387721747159958, -0.19861698150634766, 0.0], [-0.15978145599365234, 0.1791457086801529, 0.0], [0.2007640302181244, 1.2791386842727661, 1.0], [0.0019631062168627977, 2.556619167327881, 0.0], [0.33737608790397644, -3.881610631942749, 1.0], [0.6738887429237366, 1.451380968093872, 1.0], [-0.0042005316354334354, 2.381213903427124, 0.0], [0.01634954661130905, -1.6599739789962769, 1.0], [0.5037380456924438, -0.5049923062324524, 0.0], [0.34903156757354736, -0.22251223027706146, 0.0], [0.509092390537262, -0.003158865962177515, 0.0], [0.3301205337047577, 0.18107858300209045, 0.0], [0.16286495327949524, 0.531973659992218, 0.0], [-0.0002969339839182794, 1.808087706565857, 0.0], [0.1788763850927353, -3.890744686126709, 1.0], [2.2846226692199707, 1.5258640050888062, 1.0], [-0.0027005954179912806, 2.5369012355804443, 0.0], [-0.0037818457931280136, -1.9496852159500122, 1.0], [-0.30464473366737366, -0.36662381887435913, 0.0], [-0.31523972749710083, -0.18144068121910095, 0.0], [-0.49175313115119934, 0.00523218372836709, 0.0], [-0.3307597041130066, 0.19103862345218658, 0.0], [-0.33826738595962524, 0.3698250651359558, 0.0], [-0.17584536969661713, 0.545758068561554, 0.0], [0.008229006081819534, 0.35020723938941956, 0.0], [0.1818636804819107, 0.5393736958503723, 0.0], [0.3217754364013672, 0.3629167377948761, 0.0], [0.32630422711372375, 0.1818351149559021, 0.0], [0.3151686191558838, -0.01119612343609333, 0.0], [0.30565980076789856, -0.17943933606147766, 0.0], [0.3130455017089844, -0.3296034038066864, 0.0], [0.15726818144321442, -3.4151549339294434, 1.0], [0.56939297914505, 1.4675318002700806, 1.0], [-0.00011926825391128659, 2.482632875442505, 0.0], [0.01644076779484749, -1.6117973327636719, 1.0], [0.4783450961112976, -0.4900888502597809, 0.0], [0.3274967670440674, -0.24522137641906738, 0.0], [0.4615328013896942, -0.003374112071469426, 0.0], [0.31441614031791687, 0.1659727692604065, 0.0], [0.14288033545017242, -1.4613962173461914, 0.0], [1.776780128479004, 1.1805835962295532, 1.0], [0.005708661861717701, 2.561145782470703, 0.0], [0.052018214017152786, -2.406569480895996, 1.0], [-0.3030620515346527, -0.36827123165130615, 0.0], [-0.28686341643333435, -0.1781308501958847, 0.0], [0.34492751955986023, -0.00042906374437734485, 0.0], [-0.3842622637748718, 0.12251985818147659, 0.0], [-0.24272462725639343, 0.2876463532447815, 0.0], [-0.21464726328849792, 0.44892558455467224, 0.0], [-0.060162290930747986, 0.37100085616111755, 0.0], [0.0717446357011795, 0.4577798843383789, 0.0], [0.1977517157793045, 0.4188314974308014, 0.0], [0.28408074378967285, 0.25867336988449097, 0.0], [0.2865166962146759, 0.07946941256523132, 0.0], [0.28049954771995544, -0.1011732667684555, 0.0], [0.2804616689682007, -0.2605701982975006, 0.0], [0.13715481758117676, -3.4718329906463623, 1.0], [0.5783873200416565, 0.17312122881412506, 1.0], [-0.003035592380911112, 3.578835964202881, 0.0], [0.14720825850963593, 0.6054182648658752, 1.0], [0.3819659352302551, 0.13730166852474213, 0.0], [0.2910346984863281, -0.07770518213510513, 0.0], [-1.2422211170196533, -2.5583457946777344, 1.0], [1.065922498703003, -0.0026858544442802668, 0.0], [0.31836172938346863, -1.444776177406311, 1.0], [0.5973514914512634, 0.18977203965187073, 1.0], [0.181576669216156, 0.250374436378479, 0.0], [0.16704107820987701, -0.12655679881572723, 0.0], [-0.13540440797805786, -0.19693227112293243, 0.0], [-0.15838196873664856, 0.17765192687511444, 0.0], [0.19552728533744812, 1.2770684957504272, 1.0], [0.003932023420929909, 2.544910192489624, 0.0], [0.3409189283847809, -3.8953192234039307, 1.0], [0.6888554096221924, 1.453171968460083, 1.0], [-0.002754750894382596, 2.4936375617980957, 0.0], [0.01665857993066311, -1.7435646057128906, 1.0], [0.5163650512695312, -0.525373101234436, 0.0], [0.3433205187320709, -0.22141069173812866, 0.0], [0.4968581795692444, -0.0024385855067521334, 0.0], [0.32675209641456604, 0.1841198056936264, 0.0], [0.16167818009853363, 0.5371568202972412, 0.0], [0.00019678960961755365, 1.8359514474868774, 0.0], [0.17381739616394043, -3.971644163131714, 1.0], [2.175992012023926, 1.598398208618164, 1.0], [-0.0016203450504690409, 2.5558884143829346, 0.0], [0.0008516956004314125, -2.0566375255584717, 1.0], [-0.301453560590744, -0.37757378816604614, 0.0], [-0.3030729293823242, -0.18418040871620178, 0.0], [-0.48238903284072876, 0.0035841953940689564, 0.0], [-0.32926663756370544, 0.1874805986881256, 0.0], [-0.3399254381656647, 0.3715948164463043, 0.0], [-0.17212216556072235, 0.5451198220252991, 0.0], [0.009252413176000118, 0.3581583797931671, 0.0], [0.18040618300437927, 0.5348244905471802, 0.0], [0.3157963156700134, 0.36175984144210815, 0.0]], [[2.3631489276885986, 1.6880970001220703, 1.0], [-0.2334967851638794, -0.325928270816803, 0.0], [-0.4041355848312378, -0.15972720086574554, 0.0], [-0.49404793977737427, -0.0019101322395727038, 0.0], [-0.3054055869579315, 0.18021436035633087, 0.0], [-0.22679607570171356, 0.3377818763256073, 0.0], [0.0934569239616394, 0.34876057505607605, 0.0], [0.15187548100948334, 0.3783687949180603, 0.0], [0.21114517748355865, 0.41945359110832214, 0.0], [0.27065160870552063, 0.37067729234695435, 0.0], [0.2982865571975708, 0.20309504866600037, 0.0], [0.2974419891834259, 0.03185540437698364, 0.0], [0.2959498465061188, -0.13337358832359314, 0.0], [0.30061203241348267, -0.2796977758407593, 0.0], [0.1492326408624649, -3.297210216522217, 1.0], [0.5150295495986938, 1.3955973386764526, 1.0], [-0.000152272405102849, 2.4227921962738037, 0.0], [0.01803220808506012, -1.542348861694336, 1.0], [0.46805599331855774, -0.47105807065963745, 0.0], [0.3141089081764221, -0.2343512922525406, 0.0], [0.4500448405742645, -0.00795083586126566, 0.0], [0.30538830161094666, 0.1562769114971161, 0.0], [0.1412237137556076, -1.4356837272644043, 0.0], [1.7019426822662354, 1.115492582321167, 1.0], [0.005828474182635546, 2.4955852031707764, 0.0], [0.04981929436326027, -2.313404083251953, 1.0], [-0.28637033700942993, -0.35621213912963867, 0.0], [-0.27867138385772705, -0.17812734842300415, 0.0], [0.33743804693222046, -0.00362483412027359, 0.0], [-0.37479591369628906, 0.11566987633705139, 0.0], [-0.2412063628435135, 0.2824748158454895, 0.0], [-0.2030336558818817, 0.43836885690689087, 0.0], [-0.04907996580004692, 0.36163467168807983, 0.0], [0.08481084555387497, 0.4452364146709442, 0.0], [0.20522594451904297, 0.4068426191806793, 0.0], [0.2812119126319885, 0.2420513927936554, 0.0], [0.2858143448829651, 0.06656031310558319, 0.0], [0.2776554822921753, -0.1086375042796135, 0.0], [0.28186121582984924, -0.26319798827171326, 0.0], [0.13881097733974457, -3.365753412246704, 0.0], [0.5766395926475525, 0.12071623653173447, 1.0], [-0.006070090923458338, 3.4871363639831543, 0.0], [0.14959613978862762, -3.604605197906494, 1.0], [1.8981919288635254, 1.5274074077606201, 1.0], [-0.0009766764706000686, 2.410003662109375, 0.0], [0.014837903901934624, -2.128749132156372, 1.0], [-0.2857855260372162, -0.371433287858963, 0.0], [-0.2836109697818756, -0.18037337064743042, 0.0], [-0.4485556483268738, 0.004757266025990248, 0.0], [-0.3289097845554352, 0.17977072298526764, 0.0], [-0.3125993609428406, 0.3541158437728882, 0.0], [-0.17021562159061432, 0.5309762954711914, 0.0], [0.014957004226744175, 0.3486784100532532, 0.0], [0.17700178921222687, 0.5170205235481262, 0.0], [0.30245286226272583, 0.3415229618549347, 0.0], [0.3031497299671173, 0.16600461304187775, 0.0], [0.30023518204689026, -0.02539396844804287, 0.0], [0.294034481048584, -0.19331009685993195, 0.0], [0.3032204210758209, -0.33592328429222107, 0.0], [0.15237288177013397, -3.354736089706421, 1.0], [0.5567377209663391, 1.4535884857177734, 1.0], [-0.00013961995136924088, 2.4777259826660156, 0.0], [0.014931073412299156, -1.612996220588684, 1.0], [0.478929728269577, -0.49323785305023193, 0.0], [0.32164230942726135, -0.24679484963417053, 0.0], [0.4623163938522339, -0.005323899444192648, 0.0], [0.31533488631248474, 0.16312578320503235, 0.0], [0.13988450169563293, -1.4615256786346436, 0.0], [0.4861825108528137, 1.1972039937973022, 1.0], [0.005578253418207169, 2.317429304122925, 0.0], [0.017530620098114014, -1.5933949947357178, 1.0], [0.4948059618473053, -0.4790043234825134, 0.0], [0.33511319756507874, -0.19782690703868866, 0.0], [0.4932677447795868, -0.005458103958517313, 0.0], [0.32327908277511597, 0.17912009358406067, 0.0], [0.16474099457263947, 0.5218828320503235, 0.0], [0.0012316657230257988, 1.771575927734375, 0.0], [0.17381571233272552, -3.819777250289917, 1.0], [2.283292531967163, 1.551525592803955, 1.0], [-0.00018719454237725586, 2.525219678878784, 0.0], [0.004010732285678387, -2.015049934387207, 1.0], [-0.3114430606365204, -0.3695893883705139, 0.0], [-0.31412285566329956, -0.18037588894367218, 0.0], [-0.4950284957885742, 0.006537045352160931, 0.0], [-0.33424386382102966, 0.19047079980373383, 0.0], [-0.33542609214782715, 0.3698621988296509, 0.0], [-0.17492316663265228, 0.5442277789115906, 0.0], [0.00994853861629963, 0.3538894057273865, 0.0], [0.1866941899061203, 0.5354214906692505, 0.0], [0.3235286474227905, 0.3587436378002167, 0.0], [0.3217683732509613, 0.1800929754972458, 0.0], [0.314229816198349, -0.010896330699324608, 0.0], [0.31482791900634766, -0.18014070391654968, 0.0], [0.3152998387813568, -0.3315620720386505, 0.0], [0.15866880118846893, -3.3814074993133545, 1.0], [0.5619527697563171, 1.4614390134811401, 1.0], [0.00021112171816639602, 2.4751031398773193, 0.0], [0.01600828394293785, -1.6265215873718262, 1.0], [0.4813050329685211, -0.49743980169296265, 0.0], [0.3228333592414856, -0.23732420802116394, 0.0], [0.4691829979419708, -0.005313908215612173, 0.0], [0.3160282075405121, 0.16499049961566925, 0.0], [0.14202825725078583, -1.449662446975708, 0.0], [1.7973661422729492, 1.1855006217956543, 1.0], [0.004607437644153833, 2.526029109954834, 0.0], [0.05204934626817703, -2.3881826400756836, 1.0], [-0.29295042157173157, -0.36816734075546265, 0.0], [-0.31187158823013306, -0.20935051143169403, 0.0], [0.34029027819633484, 0.00018618970352690667, 0.0], [-0.3951245844364166, 0.11782513558864594, 0.0], [-0.24965570867061615, 0.28671419620513916, 0.0], [-0.20841321349143982, 0.45240670442581177, 0.0], [-0.051419347524642944, 0.36711516976356506, 0.0], [0.07922966778278351, 0.463335782289505, 0.0], [0.20317666232585907, 0.4205571413040161, 0.0], [0.28203433752059937, 0.25814223289489746, 0.0], [0.28315719962120056, 0.07990934699773788, 0.0], [0.28239256143569946, -0.10366977751255035, 0.0], [0.28138354420661926, -0.26354220509529114, 0.0], [0.13557037711143494, -3.4494175910949707, 1.0], [0.5578532218933105, 0.17153197526931763, 1.0], [-0.002012208104133606, 3.580625534057617, 0.0], [0.14615166187286377, 0.5956777930259705, 1.0], [0.3918125331401825, 0.13542604446411133, 0.0], [0.2933872938156128, -0.07534291595220566, 0.0], [-1.2168692350387573, -2.5389630794525146, 1.0], [1.0585793256759644, -0.0009622226934880018, 0.0], [0.31470954418182373, -1.4430978298187256, 1.0], [0.6242711544036865, 0.1861123889684677, 1.0], [0.18167002499103546, 0.25129273533821106, 0.0], [0.17026880383491516, -0.11961166560649872, 0.0], [-0.13892710208892822, -0.19910843670368195, 0.0], [-0.1632089763879776, 0.17715027928352356, 0.0], [0.19616618752479553, 1.2889407873153687, 1.0], [0.0010439008474349976, 2.501063108444214, 0.0], [0.34187525510787964, -3.86568021774292, 1.0], [0.6893377304077148, 1.4570144414901733, 1.0], [-0.0037857203278690577, 2.4498093128204346, 0.0], [0.016153188422322273, -1.661750078201294, 1.0], [0.5041494369506836, -0.4998733401298523, 0.0], [0.35033389925956726, -0.23225198686122894, 0.0], [0.5007465481758118, -0.0016151673626154661, 0.0], [0.33174630999565125, 0.17816737294197083, 0.0], [0.16481603682041168, 0.5379996299743652, 0.0], [-0.0018164891516789794, 1.808039665222168, 0.0], [0.17343102395534515, -3.8934662342071533, 1.0], [2.260274887084961, 1.5581889152526855, 1.0], [-0.0008459017844870687, 2.500605344772339, 0.0], [-0.002016441896557808, -1.9717695713043213, 1.0], [-0.3048735558986664, -0.36792829632759094, 0.0], [-0.3097360134124756, -0.18208067119121552, 0.0], [-0.4897013008594513, 0.0033121276646852493, 0.0], [-0.32816192507743835, 0.18708369135856628, 0.0], [-0.33866700530052185, 0.3705635666847229, 0.0], [-0.17840354144573212, 0.5454146862030029, 0.0], [0.006256632041186094, 0.3533061146736145, 0.0], [0.18209490180015564, 0.5315035581588745, 0.0], [0.3187994956970215, 0.35863518714904785, 0.0], [0.32394635677337646, 0.1807660460472107, 0.0], [0.3180089592933655, -0.010451621375977993, 0.0], [0.31105729937553406, -0.1780133843421936, 0.0], [0.31699174642562866, -0.32916533946990967, 0.0], [0.15982979536056519, -3.3795740604400635, 1.0], [0.5865978002548218, 1.4502590894699097, 1.0], [-5.135513129062019e-05, 2.4646592140197754, 0.0], [0.01852778159081936, -1.5951038599014282, 1.0], [0.48288121819496155, -0.47996002435684204, 0.0], [0.3305705189704895, -0.23352186381816864, 0.0], [0.47089678049087524, -0.005177289247512817, 0.0], [0.3175804316997528, 0.16225045919418335, 0.0], [0.1446850299835205, -1.4705579280853271, 0.0], [1.7928603887557983, 1.171735167503357, 1.0], [0.005605999380350113, 2.5393104553222656, 0.0], [0.052881546318531036, -2.3758933544158936, 1.0], [-0.2913769483566284, -0.36627140641212463, 0.0], [-0.2873254716396332, -0.18012350797653198, 0.0], [0.3443526327610016, -2.4039807613007724e-05, 0.0], [-0.38746121525764465, 0.12039016932249069, 0.0], [-0.24480412900447845, 0.28667423129081726, 0.0], [-0.20495647192001343, 0.44675979018211365, 0.0], [-0.05366641283035278, 0.36968564987182617, 0.0], [0.07924198359251022, 0.46058979630470276, 0.0], [0.20199577510356903, 0.416708379983902, 0.0], [0.2850513756275177, 0.25526881217956543, 0.0], [0.287876695394516, 0.08007192611694336, 0.0], [0.2804032266139984, -0.10162657499313354, 0.0], [0.28418412804603577, -0.26141637563705444, 0.0], [0.13928018510341644, -3.4726340770721436, 1.0], [0.5734711289405823, 0.1727253794670105, 1.0], [-0.004122311249375343, 3.628777027130127, 0.0], [0.14553645253181458, 0.6169478893280029, 1.0], [0.3923552930355072, 0.13854952156543732, 0.0], [0.29417547583580017, -0.07576300203800201, 0.0], [-1.2216358184814453, -2.5633323192596436, 1.0], [1.0752174854278564, -0.004086691420525312, 0.0], [0.3167021870613098, -1.4588940143585205, 1.0], [0.6051417589187622, 0.1893881857395172, 1.0], [0.18238604068756104, 0.24882158637046814, 0.0], [0.1673441082239151, -0.12802912294864655, 0.0], [-0.13771402835845947, -0.19814249873161316, 0.0], [-0.17255721986293793, 0.1688578724861145, 0.0], [0.19942769408226013, 1.2820897102355957, 1.0], [0.0018944373587146401, 2.5349040031433105, 0.0], [0.33917680382728577, -3.8976662158966064, 1.0], [0.6819291710853577, 1.4565037488937378, 1.0], [-0.00254060048609972, 2.5155539512634277, 0.0], [0.011814619414508343, -1.6933462619781494, 1.0], [0.5111659169197083, -0.5104004740715027, 0.0], [0.3480752110481262, -0.22888857126235962, 0.0], [0.4976918697357178, -0.002382103120908141, 0.0], [0.3296564817428589, 0.1824834644794464, 0.0], [0.16148243844509125, 0.5396811366081238, 0.0], [-0.001719582243822515, 1.8263267278671265, 0.0], [0.1789359599351883, -3.921848773956299, 1.0], [2.26641583442688, 1.5899142026901245, 1.0], [-0.001568707637488842, 2.5103566646575928, 0.0], [-0.0005263590137474239, -1.9956785440444946, 1.0], [-0.3074061870574951, -0.3713354170322418, 0.0], [-0.3115938603878021, -0.17949283123016357, 0.0], [-0.48981598019599915, 0.006017419043928385, 0.0], [-0.32826128602027893, 0.19074660539627075, 0.0], [-0.33561673760414124, 0.3638265132904053, 0.0], [-0.17601808905601501, 0.5392926335334778, 0.0], [0.007069800049066544, 0.354128897190094, 0.0], [0.17894472181797028, 0.5345264673233032, 0.0], [0.3253411054611206, 0.3615359961986542, 0.0], [0.31981518864631653, 0.18454818427562714, 0.0], [0.3126080632209778, -0.00432396586984396, 0.0], [0.3105207085609436, -0.17052298784255981, 0.0], [0.3103874623775482, -0.3206692636013031, 0.0], [0.15807275474071503, -3.4216291904449463, 1.0], [0.580925703048706, 1.4653120040893555, 1.0], [0.0010179225355386734, 2.397812843322754, 0.0], [0.02003275789320469, -1.5508946180343628, 1.0]], [[2.409743309020996, 1.756294846534729, 1.0], [-0.20799744129180908, -0.3338957726955414, 0.0], [-0.44080984592437744, -0.16692183911800385, 0.0], [-0.4990360736846924, -0.003364815143868327, 0.0], [-0.49672338366508484, 0.17259947955608368, 0.0], [-0.2318457067012787, 0.33721134066581726, 0.0], [0.0905371755361557, 0.33276569843292236, 0.0], [0.16108688712120056, 0.3929937183856964, 0.0], [0.23490704596042633, 0.41156476736068726, 0.0], [0.29701340198516846, 0.3902724087238312, 0.0], [0.3162153661251068, 0.20959153771400452, 0.0], [0.30706334114074707, 0.035947415977716446, 0.0], [0.298688679933548, -0.12968215346336365, 0.0], [0.3045693635940552, -0.2740069329738617, 0.0], [0.15210574865341187, -3.336153507232666, 1.0], [0.6337401866912842, 0.1680460274219513, 1.0], [-0.0029651469085365534, 3.4561007022857666, 0.0], [0.14628471434116364, 0.5904877185821533, 1.0], [0.3962536156177521, 0.13746759295463562, 0.0], [0.3048238158226013, -0.07487587630748749, 0.0], [-1.228642225265503, -2.495783567428589, 1.0], [1.0855289697647095, -0.0025988323614001274, 0.0], [0.321936696767807, -1.3874504566192627, 1.0], [0.5883871912956238, 0.1823689192533493, 1.0], [0.18137648701667786, 0.23956066370010376, 0.0], [0.16701029241085052, -0.11702121049165726, 0.0], [-0.13614384829998016, -0.1954256296157837, 0.0], [-0.1650635004043579, 0.17104296386241913, 0.0], [0.19545350968837738, 1.242356538772583, 1.0], [0.0030551606323570013, 2.4769914150238037, 0.0], [0.3417624533176422, -3.7710676193237305, 1.0], [0.6860499382019043, 1.4175729751586914, 1.0], [-0.0035680595319718122, 2.241184711456299, 0.0], [0.021321726962924004, -1.5862005949020386, 1.0], [0.5042410492897034, -0.478898286819458, 0.0], [0.3333145081996918, -0.1931643933057785, 0.0], [0.5010903477668762, -0.004191461484879255, 0.0], [0.3328225016593933, 0.17712195217609406, 0.0], [0.16667483747005463, 0.5192053914070129, 0.0], [-0.00022240290127228945, 1.7466553449630737, 0.0], [0.17571832239627838, -3.7791032791137695, 1.0], [2.3611338138580322, 1.4756717681884766, 1.0], [-0.0029243105091154575, 2.4802258014678955, 0.0], [-0.0021497842390090227, -1.8964993953704834, 1.0], [-0.3103923797607422, -0.35798338055610657, 0.0], [-0.3171827793121338, -0.17790643870830536, 0.0], [-0.5015809535980225, 0.0038564016576856375, 0.0], [-0.33749884366989136, 0.1853983998298645, 0.0], [-0.34974241256713867, 0.3622573912143707, 0.0], [-0.1708594113588333, 0.5430701971054077, 0.0], [0.013573998585343361, 0.3483201563358307, 0.0], [0.19132199883460999, 0.5276923179626465, 0.0], [0.3294430375099182, 0.3558974862098694, 0.0], [0.3241731524467468, 0.17783308029174805, 0.0], [0.4992453157901764, -0.002629896393045783, 0.0], [0.32391828298568726, -0.1823977828025818, 0.0], [0.32706767320632935, -0.3523533046245575, 0.0], [0.1664608120918274, -3.324481248855591, 1.0], [0.6116195321083069, 1.4371049404144287, 1.0], [-0.0013199083041399717, 2.4125728607177734, 0.0], [0.017023099586367607, -1.5308187007904053, 1.0], [0.4827798902988434, -0.4685412645339966, 0.0], [0.3355487883090973, -0.237191304564476, 0.0], [0.4806249141693115, -0.004077267367392778, 0.0], [0.3182094991207123, 0.1588638424873352, 0.0], [0.14202740788459778, -1.4420716762542725, 0.0], [1.8386915922164917, 1.139434814453125, 1.0], [0.004303390625864267, 2.5560710430145264, 0.0], [0.04983598366379738, -2.330052375793457, 1.0], [-0.29934385418891907, -0.3622244596481323, 0.0], [-0.29589253664016724, -0.177047997713089, 0.0], [-0.4468303620815277, -0.014615211635828018, 0.0], [-0.3609409034252167, 0.14270904660224915, 0.0], [-0.32143867015838623, 0.32389360666275024, 0.0], [-0.18507923185825348, 0.5047466158866882, 0.0], [0.0005417047650553286, 0.342397004365921, 0.0], [0.1672356277704239, 0.5005903244018555, 0.0], [0.31319454312324524, 0.3389623165130615, 0.0], [0.3133932054042816, 0.18006877601146698, 0.0], [0.30866047739982605, -0.002962801605463028, 0.0], [0.30453747510910034, -0.16540205478668213, 0.0], [0.3113066852092743, -0.3075554072856903, 0.0], [0.1580808013677597, -3.3098130226135254, 1.0], [0.5502749085426331, 1.4225695133209229, 1.0], [-3.44693471561186e-05, 2.4666225910186768, 0.0], [0.014976480044424534, -1.581122875213623, 1.0], [0.47017326951026917, -0.4796609878540039, 0.0], [0.3273511826992035, -0.24554666876792908, 0.0], [0.46506088972091675, -0.004213899839669466, 0.0], [0.31249815225601196, 0.1600470244884491, 0.0], [0.14199866354465485, -1.453833818435669, 0.0], [1.8435986042022705, 1.143114447593689, 1.0], [0.005654233042150736, 2.5929017066955566, 0.0], [0.04485606029629707, -2.328728675842285, 1.0], [-0.2978205978870392, -0.3656395673751831, 0.0], [-0.29982665181159973, -0.18115437030792236, 0.0], [-0.4814961850643158, -0.012461730279028416, 0.0], [-0.3573024868965149, 0.15023435652256012, 0.0], [-0.3240227997303009, 0.33065149188041687, 0.0], [-0.18805155158042908, 0.5102989077568054, 0.0], [-0.002512916224077344, 0.34063366055488586, 0.0], [0.17086417973041534, 0.5034302473068237, 0.0], [0.3161027133464813, 0.339305579662323, 0.0], [0.3173322081565857, 0.17403793334960938, 0.0], [0.3160596489906311, -0.00922849215567112, 0.0], [0.3080562949180603, -0.17458806931972504, 0.0], [0.30908873677253723, -0.3180232346057892, 0.0], [0.15723933279514313, -3.284839391708374, 1.0], [0.6464384198188782, 0.16953864693641663, 1.0], [-0.0034960389602929354, 3.499325752258301, 0.0], [0.15028072893619537, 0.5971626043319702, 1.0], [0.405263751745224, 0.1333625316619873, 0.0], [0.30947354435920715, -0.07263122498989105, 0.0], [-1.2743990421295166, -2.4994094371795654, 1.0], [1.107981562614441, -0.0031712495256215334, 0.0], [0.33208099007606506, -1.429553747177124, 1.0], [0.5825554132461548, 0.18787097930908203, 1.0], [0.1821107268333435, 0.2474636286497116, 0.0], [0.16964925825595856, -0.12364261597394943, 0.0], [-0.13981927931308746, -0.19489553570747375, 0.0], [-0.16101185977458954, 0.17156600952148438, 0.0], [0.20172064006328583, 1.2662453651428223, 1.0], [0.002404893282800913, 2.4968271255493164, 0.0], [0.340838223695755, -3.8149988651275635, 1.0], [0.6589010953903198, 1.43854558467865, 1.0], [-0.00385152455419302, 2.386214017868042, 0.0], [0.016844861209392548, -1.623716950416565, 1.0], [0.5113865733146667, -0.49575111269950867, 0.0], [0.3400864899158478, -0.2132667452096939, 0.0], [0.49788299202919006, -0.0032413313165307045, 0.0], [0.32442542910575867, 0.17683207988739014, 0.0], [0.16212813556194305, 0.527756929397583, 0.0], [-0.0016661947593092918, 1.7843351364135742, 0.0], [0.17146089673042297, -3.855768918991089, 1.0], [2.317803144454956, 1.5258586406707764, 1.0], [-0.0017095552757382393, 2.5454909801483154, 0.0], [-0.0005754003650508821, -1.9644403457641602, 1.0], [-0.3120332360267639, -0.36515310406684875, 0.0], [-0.318721204996109, -0.18141265213489532, 0.0], [-0.49581894278526306, 0.002722684759646654, 0.0], [-0.33747783303260803, 0.1866278052330017, 0.0], [-0.33822304010391235, 0.3649885058403015, 0.0], [-0.17898830771446228, 0.5416271686553955, 0.0], [0.006549949757754803, 0.3511471748352051, 0.0], [0.1805398315191269, 0.5313825011253357, 0.0], [0.32784953713417053, 0.3613644540309906, 0.0], [0.32614362239837646, 0.1819089651107788, 0.0], [0.5025643110275269, -0.003771010786294937, 0.0], [0.32260432839393616, -0.18104441463947296, 0.0], [0.32585304975509644, -0.35157352685928345, 0.0], [0.16781803965568542, -3.4033172130584717, 1.0], [0.6026598811149597, 1.4693981409072876, 1.0], [-0.0007960086804814637, 2.558654308319092, 0.0], [0.015370743349194527, -1.6343379020690918, 1.0], [0.48611658811569214, -0.49650201201438904, 0.0], [0.3332119584083557, -0.24213215708732605, 0.0], [0.47919049859046936, -0.003859439631924033, 0.0], [0.31996262073516846, 0.16089482605457306, 0.0], [0.14402107894420624, -1.495097279548645, 0.0], [1.8154263496398926, 1.164462924003601, 1.0], [0.0052437433041632175, 2.60612154006958, 0.0], [0.048335082828998566, -2.3832345008850098, 1.0], [-0.3010014295578003, -0.3681848347187042, 0.0], [-0.295066237449646, -0.18059511482715607, 0.0], [-0.48689377307891846, -0.011550331488251686, 0.0], [-0.35791268944740295, 0.1522747278213501, 0.0], [-0.3244260251522064, 0.3339672088623047, 0.0], [-0.1830490231513977, 0.5167317986488342, 0.0], [0.004206296522170305, 0.3450942635536194, 0.0], [0.17557555437088013, 0.5138653516769409, 0.0], [0.315646231174469, 0.34552228450775146, 0.0], [0.3179219961166382, 0.17588691413402557, 0.0], [0.3102208375930786, -0.00522879371419549, 0.0], [0.30668315291404724, -0.17612256109714508, 0.0], [0.3115408718585968, -0.3197571039199829, 0.0], [0.15567517280578613, -3.351884126663208, 1.0], [0.5721269845962524, 1.4480713605880737, 1.0], [0.00047831214033067226, 2.464345693588257, 0.0], [0.017445094883441925, -1.5822234153747559, 1.0], [0.4700939953327179, -0.4807569682598114, 0.0], [0.3296002447605133, -0.2445823699235916, 0.0], [0.4610453248023987, -0.004281756933778524, 0.0], [0.31422773003578186, 0.15979717671871185, 0.0], [0.14261163771152496, -1.4596706628799438, 0.0], [1.7577158212661743, 1.1220123767852783, 1.0], [0.005271365400403738, 2.6036393642425537, 0.0], [0.046119216829538345, -2.368650197982788, 1.0], [-0.2980469763278961, -0.368112713098526, 0.0], [-0.28838786482810974, -0.1786433756351471, 0.0], [0.34182628989219666, -0.0007202424458228052, 0.0], [-0.3776012659072876, 0.12594084441661835, 0.0], [-0.2439969927072525, 0.292016863822937, 0.0], [-0.1970537304878235, 0.45144712924957275, 0.0], [-0.04496513307094574, 0.3717421293258667, 0.0], [0.08817974478006363, 0.456829696893692, 0.0], [0.20198900997638702, 0.4149636924266815, 0.0], [0.28388237953186035, 0.25127625465393066, 0.0], [0.27922117710113525, 0.07169594615697861, 0.0], [0.28189167380332947, -0.10935323685407639, 0.0], [0.284376859664917, -0.26684826612472534, 0.0], [0.13626737892627716, -3.4483954906463623, 1.0], [0.5664555430412292, 0.1713879108428955, 1.0], [-0.0032871945295482874, 3.582231283187866, 0.0], [0.14585119485855103, 0.6070210933685303, 1.0], [0.38307061791419983, 0.13986805081367493, 0.0], [0.2860817313194275, -0.0728074386715889, 0.0], [-1.2077107429504395, -2.547724962234497, 1.0], [1.056225061416626, -0.0007929712301120162, 0.0], [0.3139002323150635, -1.4534718990325928, 1.0], [0.6166890859603882, 0.18883831799030304, 1.0], [0.18294599652290344, 0.24909701943397522, 0.0], [0.16775794327259064, -0.12597958743572235, 0.0], [-0.13802915811538696, -0.19715920090675354, 0.0], [-0.16674645245075226, 0.17529308795928955, 0.0], [0.19594845175743103, 1.2835524082183838, 1.0], [0.0020458155777305365, 2.5076863765716553, 0.0], [0.3372229039669037, -3.873901844024658, 1.0], [0.6953069567680359, 1.4531536102294922, 1.0], [-0.001949002267792821, 2.4264345169067383, 0.0], [0.016738474369049072, -1.6642861366271973, 1.0], [0.507323682308197, -0.5011476874351501, 0.0], [0.33920377492904663, -0.21361054480075836, 0.0], [0.4961722195148468, -0.0022811503149569035, 0.0], [0.33215096592903137, 0.17826838791370392, 0.0], [0.16548357903957367, 0.5369296669960022, 0.0], [-0.0007595312199555337, 1.8015062808990479, 0.0], [0.17449642717838287, -3.8764708042144775, 1.0], [2.2336525917053223, 1.5203102827072144, 1.0], [-0.0022470189724117517, 2.525881767272949, 0.0], [0.0006996107986196876, -1.9786127805709839, 1.0], [-0.30080440640449524, -0.36685389280319214, 0.0], [-0.30773815512657166, -0.18193155527114868, 0.0], [-0.48666679859161377, 0.005400804337114096, 0.0], [-0.3374060094356537, 0.18799607455730438, 0.0]], [[2.391627550125122, 1.6908437013626099, 1.0], [-0.237123504281044, -0.3315424919128418, 0.0], [-0.4242067337036133, -0.15863081812858582, 0.0], [-0.494989812374115, 0.0006109115784056485, 0.0], [-0.300693541765213, 0.17654208838939667, 0.0], [-0.2445044219493866, 0.33586254715919495, 0.0], [0.07059776037931442, 0.3567645251750946, 0.0], [0.14105834066867828, 0.37888896465301514, 0.0], [0.20991240441799164, 0.42536941170692444, 0.0], [0.2706911563873291, 0.378120481967926, 0.0], [0.29728376865386963, 0.20391084253787994, 0.0], [0.3032170236110687, 0.029759638011455536, 0.0], [0.29479843378067017, -0.13185547292232513, 0.0], [0.2993624210357666, -0.27557626366615295, 0.0], [0.1497308611869812, -3.3283822536468506, 1.0], [0.5270628929138184, 1.4029144048690796, 1.0], [0.002088929759338498, 2.331033229827881, 0.0], [0.022947050631046295, -1.528397560119629, 1.0], [0.4598316252231598, -0.46569952368736267, 0.0], [0.3137655556201935, -0.22246944904327393, 0.0], [0.45803481340408325, -0.008224008604884148, 0.0], [0.30747807025909424, 0.15641015768051147, 0.0], [0.13932807743549347, -1.4171178340911865, 0.0], [1.686444640159607, 1.1078603267669678, 1.0], [0.006433739326894283, 2.457388162612915, 0.0], [0.05273571237921715, -2.3177576065063477, 1.0], [-0.28707581758499146, -0.35570159554481506, 0.0], [-0.2851463854312897, -0.17409849166870117, 0.0], [0.332442969083786, -0.0024562636390328407, 0.0], [-0.37366917729377747, 0.11890283226966858, 0.0], [-0.2384164035320282, 0.28698766231536865, 0.0], [-0.1962641328573227, 0.4369981586933136, 0.0], [-0.04080767557024956, 0.3622831702232361, 0.0], [0.08874537795782089, 0.44230830669403076, 0.0], [0.1988106071949005, 0.40281784534454346, 0.0], [0.28722870349884033, 0.23842757940292358, 0.0], [0.28381338715553284, 0.06604082882404327, 0.0], [0.2770620882511139, -0.1159415990114212, 0.0], [0.27846989035606384, -0.26816457509994507, 0.0], [0.13662517070770264, -3.3333241939544678, 1.0], [0.5081994533538818, 1.4175214767456055, 1.0], [-0.0012298689689487219, 2.2868921756744385, 0.0], [0.020968206226825714, -1.503686785697937, 1.0], [0.4472009241580963, -0.4601488411426544, 0.0], [0.3061380684375763, -0.22059942781925201, 0.0], [0.44224175810813904, -0.0074738091789186, 0.0], [0.3025761544704437, 0.15778975188732147, 0.0], [0.13713771104812622, -1.4380658864974976, 1.0], [1.9352366924285889, 1.4069627523422241, 1.0], [0.0006926400819793344, 2.301236867904663, 0.0], [0.020263900980353355, -2.024001359939575, 1.0], [-0.2810043394565582, -0.3460151255130768, 0.0], [-0.2867908477783203, -0.171302929520607, 0.0], [-0.4589037001132965, -0.004579171072691679, 0.0], [-0.3308861255645752, 0.16032539308071136, 0.0], [-0.31977614760398865, 0.32794344425201416, 0.0], [-0.18615326285362244, 0.49435389041900635, 0.0], [0.0006057904101908207, 0.3332899510860443, 0.0], [0.17274540662765503, 0.4875760078430176, 0.0], [0.3090425729751587, 0.32914334535598755, 0.0], [0.31312674283981323, 0.164643332362175, 0.0], [0.3093838393688202, -0.018026061356067657, 0.0], [0.3076884150505066, -0.17746885120868683, 0.0], [0.3050905168056488, -0.31313833594322205, 0.0], [0.15762190520763397, -3.2092785835266113, 1.0], [0.5435953736305237, 1.390717625617981, 1.0], [-3.0219503969419748e-05, 2.324495553970337, 0.0], [0.01620386727154255, -1.4872537851333618, 1.0], [0.45647314190864563, -0.4511791467666626, 0.0], [0.3176873028278351, -0.22153814136981964, 0.0], [0.4552048146724701, -0.006461868528276682, 0.0], [0.3090296685695648, 0.15297824144363403, 0.0], [0.1395505964756012, -1.403061866760254, 0.0], [1.7941944599151611, 1.1016343832015991, 1.0], [0.005571149755269289, 2.457284450531006, 0.0], [0.05107647925615311, -2.263880729675293, 1.0], [-0.2908414900302887, -0.35196712613105774, 0.0], [-0.31047773361206055, -0.19992801547050476, 0.0], [-0.4494829773902893, -0.029272964224219322, 0.0], [-0.3614732325077057, 0.13142776489257812, 0.0], [-0.32297396659851074, 0.31292054057121277, 0.0], [-0.19268552958965302, 0.48976394534111023, 0.0], [-0.0039068120531737804, 0.3359452784061432, 0.0], [0.16706417500972748, 0.4871474504470825, 0.0], [0.3098395764827728, 0.3301076889038086, 0.0], [0.3165890574455261, 0.1675853729248047, 0.0], [0.3095284700393677, -0.007186219096183777, 0.0], [0.303241103887558, -0.1701270341873169, 0.0], [0.30879950523376465, -0.3075677752494812, 0.0], [0.15674594044685364, -3.1978673934936523, 1.0], [0.5406217575073242, 1.38420832157135, 1.0], [-0.0005462501430884004, 2.2997918128967285, 0.0], [0.01828703284263611, -1.4724431037902832, 1.0], [0.4641488790512085, -0.44864577054977417, 0.0], [0.3171357214450836, -0.21788355708122253, 0.0], [0.4606919288635254, -0.006615511607378721, 0.0], [0.31192028522491455, 0.1543300896883011, 0.0], [0.14075691998004913, -1.3950895071029663, 0.0], [1.7740812301635742, 1.0678784847259521, 1.0], [0.006221845746040344, 2.488046884536743, 0.0], [0.05403752252459526, -2.2826175689697266, 1.0], [-0.29121771454811096, -0.3523327708244324, 0.0], [-0.3110225796699524, -0.19729769229888916, 0.0], [-0.44779664278030396, -0.027252499014139175, 0.0], [-0.3615320324897766, 0.13377933204174042, 0.0], [-0.31478238105773926, 0.3125725984573364, 0.0], [-0.18746156990528107, 0.4853297173976898, 0.0], [-0.004489052575081587, 0.33131301403045654, 0.0], [0.1676936149597168, 0.4788018465042114, 0.0], [0.3114071488380432, 0.3258195221424103, 0.0], [0.31294211745262146, 0.17048421502113342, 0.0], [0.30717697739601135, -0.005152998957782984, 0.0], [0.3007090091705322, -0.16558492183685303, 0.0], [0.31030213832855225, -0.30613869428634644, 0.0], [0.15786923468112946, -3.206146717071533, 1.0], [0.543333888053894, 1.379703402519226, 1.0], [-0.0002069578185910359, 2.3150713443756104, 0.0], [0.018243422731757164, -1.48151433467865, 1.0], [0.4746934175491333, -0.4515881836414337, 0.0], [0.3183707594871521, -0.22282609343528748, 0.0], [0.4612146019935608, -0.005427168682217598, 0.0], [0.30788251757621765, 0.15367043018341064, 0.0], [0.13846851885318756, -1.3859087228775024, 0.0], [1.6248118877410889, 1.0886110067367554, 1.0], [0.006090180482715368, 2.4505515098571777, 0.0], [0.058935124427080154, -2.3489718437194824, 1.0], [-0.2855258882045746, -0.3514419496059418, 0.0], [-0.3042040467262268, -0.20018517971038818, 0.0], [0.32353243231773376, -0.0025268387980759144, 0.0], [-0.37554997205734253, 0.11296527087688446, 0.0], [-0.23736202716827393, 0.2824997901916504, 0.0], [-0.194143608212471, 0.43490660190582275, 0.0], [-0.040779322385787964, 0.3596494495868683, 0.0], [0.09469753503799438, 0.44171062111854553, 0.0], [0.20771996676921844, 0.40270325541496277, 0.0], [0.2773204445838928, 0.2329624444246292, 0.0], [0.27767980098724365, 0.05973375216126442, 0.0], [0.27713286876678467, -0.11623437702655792, 0.0], [0.28947168588638306, -0.266986221075058, 0.0], [0.13517643511295319, -3.3093855381011963, 0.0], [0.5696736574172974, 0.11869411170482635, 1.0], [-0.0060555171221494675, 3.494626522064209, 0.0], [0.13172081112861633, -3.4509387016296387, 1.0], [0.5486562848091125, 0.1539866030216217, 1.0], [0.0009923658799380064, 3.376704454421997, 0.0], [0.1114722192287445, -3.2363386154174805, 1.0], [1.808692216873169, 1.373935580253601, 1.0], [-0.0005525504238903522, 2.252793550491333, 0.0], [0.03770173341035843, -2.1943914890289307, 1.0], [-0.28848472237586975, -0.35231152176856995, 0.0], [-0.2893421947956085, -0.18661828339099884, 0.0], [0.32991161942481995, 0.000538448803126812, 0.0], [-0.37483155727386475, 0.12691538035869598, 0.0], [-0.24370090663433075, 0.2894385755062103, 0.0], [-0.20224642753601074, 0.44488269090652466, 0.0], [-0.045892104506492615, 0.35967445373535156, 0.0], [0.08342664688825607, 0.45039767026901245, 0.0], [0.2022591084241867, 0.40457141399383545, 0.0], [0.28040382266044617, 0.2397807538509369, 0.0], [0.2779207229614258, 0.061561889946460724, 0.0], [0.2728846073150635, -0.11425842344760895, 0.0], [0.279005765914917, -0.2687532603740692, 0.0], [0.1358485072851181, -3.3841681480407715, 1.0], [0.5004381537437439, 1.426411509513855, 1.0], [0.0004138227959629148, 2.426990270614624, 0.0], [0.01866670697927475, -1.5806671380996704, 1.0], [0.4627724885940552, -0.4818268418312073, 0.0], [0.31137192249298096, -0.24729689955711365, 0.0], [0.4443620443344116, -0.00733482651412487, 0.0], [0.30129769444465637, 0.16196444630622864, 0.0], [0.13647346198558807, -1.4495809078216553, 0.0], [1.704681396484375, 1.1230659484863281, 1.0], [0.0056813922710716724, 2.527893543243408, 0.0], [0.049701135605573654, -2.342350721359253, 1.0], [-0.2856902480125427, -0.36237773299217224, 0.0], [-0.2856200933456421, -0.17745831608772278, 0.0], [0.3399939239025116, -0.0019976291805505753, 0.0], [-0.3764045834541321, 0.12167807668447495, 0.0], [-0.23896050453186035, 0.28393927216529846, 0.0], [-0.1991712749004364, 0.440298467874527, 0.0], [-0.044694796204566956, 0.3675377368927002, 0.0], [0.08831442147493362, 0.44797393679618835, 0.0], [0.20688292384147644, 0.4183203876018524, 0.0], [0.2855907380580902, 0.24833399057388306, 0.0], [0.2801538407802582, 0.06904615461826324, 0.0], [0.2747614085674286, -0.1083667129278183, 0.0], [0.28409716486930847, -0.2671542763710022, 0.0], [0.13323332369327545, -3.40871524810791, 1.0], [0.5060462355613708, 1.4422674179077148, 1.0], [0.00033475959207862616, 2.4488508701324463, 0.0], [0.01846851222217083, -1.587418556213379, 1.0], [0.44251447916030884, -0.48341843485832214, 0.0], [0.3118163049221039, -0.2369733601808548, 0.0], [0.44650718569755554, -0.0083560049533844, 0.0], [0.30142465233802795, 0.15720389783382416, 0.0], [0.1380217969417572, -1.4615504741668701, 1.0], [2.080132246017456, 1.4473490715026855, 1.0], [0.0003192074073012918, 2.3313348293304443, 0.0], [0.01860775798559189, -2.0354299545288086, 1.0], [-0.2997394800186157, -0.3528754711151123, 0.0], [-0.3011695444583893, -0.1724316030740738, 0.0], [-0.48200783133506775, 0.0028478982858359814, 0.0], [-0.3355494439601898, 0.1666783094406128, 0.0], [-0.32336553931236267, 0.3417317271232605, 0.0], [-0.18418879806995392, 0.5120227932929993, 0.0], [-0.0014478336088359356, 0.3428240716457367, 0.0], [0.17179064452648163, 0.5049583315849304, 0.0], [0.3147016763687134, 0.3422083258628845, 0.0], [0.31583482027053833, 0.17423346638679504, 0.0], [0.316232830286026, -0.008758004754781723, 0.0], [0.3102978765964508, -0.1747579425573349, 0.0], [0.3126216232776642, -0.317036509513855, 0.0], [0.16118058562278748, -3.2969460487365723, 1.0], [0.574901819229126, 1.4214531183242798, 1.0], [-0.0005305696977302432, 2.439176559448242, 0.0], [0.0140442606061697, -1.5952274799346924, 1.0], [0.46961474418640137, -0.4875093102455139, 0.0], [0.3241989314556122, -0.24291467666625977, 0.0], [0.4706997573375702, -0.006684180349111557, 0.0], [0.3107306957244873, 0.15957504510879517, 0.0], [0.1402747482061386, -1.4330103397369385, 0.0], [0.5078611373901367, 1.18038010597229, 1.0], [0.005725796800106764, 2.3284811973571777, 0.0], [0.012990791350603104, -1.6187183856964111, 1.0], [0.499639630317688, -0.48885369300842285, 0.0], [0.33403196930885315, -0.19925129413604736, 0.0], [0.4808736741542816, -0.005730805452913046, 0.0], [0.32159972190856934, 0.1729784607887268, 0.0], [0.1649279147386551, 0.5236971378326416, 0.0], [-0.00023307243827730417, 1.7712842226028442, 0.0], [0.1708817332983017, -3.80596923828125, 1.0], [2.3166744709014893, 1.5731534957885742, 1.0], [-0.0010332524543628097, 2.4342763423919678, 0.0], [0.0031077349558472633, -1.9610354900360107, 1.0]], [[2.4373786449432373, 1.70436692237854, 1.0], [-0.23677513003349304, -0.32836976647377014, 0.0], [-0.4294220507144928, -0.16430309414863586, 0.0], [-0.5029699206352234, -0.0009098317823372781, 0.0], [-0.2900793254375458, 0.1787777990102768, 0.0], [-0.24761855602264404, 0.3403564393520355, 0.0], [0.06298290938138962, 0.35236984491348267, 0.0], [0.13606372475624084, 0.3833647668361664, 0.0], [0.19994601607322693, 0.4255611300468445, 0.0], [0.2732408344745636, 0.3825986087322235, 0.0], [0.309553325176239, 0.20606067776679993, 0.0], [0.30490848422050476, 0.033255163580179214, 0.0], [0.29981645941734314, -0.13298480212688446, 0.0], [0.29958978295326233, -0.2785473167896271, 0.0], [0.14967238903045654, -3.3172719478607178, 1.0], [0.5115146040916443, 1.3998627662658691, 1.0], [0.000407199579058215, 2.3753774166107178, 0.0], [0.018763039261102676, -1.5573781728744507, 1.0], [0.4609453082084656, -0.4713786840438843, 0.0], [0.3173093795776367, -0.22405938804149628, 0.0], [0.45081812143325806, -0.00789928250014782, 0.0], [0.30854976177215576, 0.16079510748386383, 0.0], [0.13749948143959045, -1.407372236251831, 0.0], [0.471099853515625, 1.1463420391082764, 1.0], [0.0057617537677288055, 2.3151252269744873, 0.0], [0.015121118165552616, -1.5583786964416504, 1.0], [0.4892565906047821, -0.470819890499115, 0.0], [0.3382253348827362, -0.20118749141693115, 0.0], [0.4839516878128052, -0.0054480223916471004, 0.0], [0.3213621973991394, 0.17018142342567444, 0.0], [0.16394680738449097, 0.5094398856163025, 0.0], [0.0008294018334709108, 1.726263165473938, 0.0], [0.17322354018688202, -3.7298171520233154, 1.0], [2.229579210281372, 1.5164027214050293, 1.0], [-0.0010466690873727202, 2.422822952270508, 0.0], [0.0016886802623048425, -1.932745337486267, 1.0], [-0.3010317087173462, -0.3579525053501129, 0.0], [-0.3096579611301422, -0.17663656175136566, 0.0], [-0.4855443239212036, 0.003975661937147379, 0.0], [-0.3420499861240387, 0.18068617582321167, 0.0], [-0.331031858921051, 0.35578611493110657, 0.0], [-0.1805657148361206, 0.5328577756881714, 0.0], [0.005101167131215334, 0.34631913900375366, 0.0], [0.18348419666290283, 0.5218786001205444, 0.0], [0.3225991427898407, 0.35240140557289124, 0.0], [0.31795039772987366, 0.17566373944282532, 0.0], [0.3143795132637024, -0.007645741570740938, 0.0], [0.3113345205783844, -0.17184938490390778, 0.0], [0.317084938287735, -0.3177889585494995, 0.0], [0.1580178141593933, -3.3226542472839355, 1.0], [0.5470219850540161, 1.4277420043945312, 1.0], [-0.0007384819909930229, 2.3857078552246094, 0.0], [0.020193930715322495, -1.5557383298873901, 1.0], [0.47602880001068115, -0.4734014570713043, 0.0], [0.32740887999534607, -0.23628343641757965, 0.0], [0.47271472215652466, -0.006000237539410591, 0.0], [0.31633099913597107, 0.16055288910865784, 0.0], [0.14324569702148438, -1.434274435043335, 0.0], [1.717310905456543, 1.1526182889938354, 1.0], [0.005584485828876495, 2.534132957458496, 0.0], [0.05270792171359062, -2.403698682785034, 1.0], [-0.2968151271343231, -0.36622342467308044, 0.0], [-0.3087044656276703, -0.2083253562450409, 0.0], [0.33217135071754456, 0.00025605145492590964, 0.0], [-0.3896021246910095, 0.11905936896800995, 0.0], [-0.24581652879714966, 0.28484755754470825, 0.0], [-0.202352836728096, 0.4482056498527527, 0.0], [-0.04863250255584717, 0.36732882261276245, 0.0], [0.0888008251786232, 0.456111341714859, 0.0], [0.20809487998485565, 0.4102230668067932, 0.0], [0.27968278527259827, 0.24615147709846497, 0.0], [0.28763505816459656, 0.07084338366985321, 0.0], [0.2808568775653839, -0.10685660690069199, 0.0], [0.2814541757106781, -0.2650744915008545, 0.0], [0.1359115093946457, -3.416940212249756, 1.0], [0.5023773908615112, 1.4519729614257812, 1.0], [-0.0017897716024890542, 2.455404758453369, 0.0], [0.01733635924756527, -1.5811880826950073, 1.0], [0.4458843767642975, -0.4837245047092438, 0.0], [0.3145502209663391, -0.2492396980524063, 0.0], [0.4476502537727356, -0.007642277982085943, 0.0], [0.30717217922210693, 0.1591699719429016, 0.0], [0.13840308785438538, -1.4631589651107788, 0.0], [1.6056150197982788, 1.1678651571273804, 1.0], [0.0047655245289206505, 2.5416674613952637, 0.0], [0.049700528383255005, -2.4281909465789795, 1.0], [-0.2910380959510803, -0.3660282790660858, 0.0], [-0.29670286178588867, -0.2103307992219925, 0.0], [0.32659393548965454, -0.0031608634162694216, 0.0], [-0.3747304379940033, 0.11803709715604782, 0.0], [-0.236208975315094, 0.28790128231048584, 0.0], [-0.19484807550907135, 0.44972190260887146, 0.0], [-0.040395338088274, 0.3731881380081177, 0.0], [0.08607625216245651, 0.4599323570728302, 0.0], [0.20206476747989655, 0.42086663842201233, 0.0], [0.28587794303894043, 0.24931779503822327, 0.0], [0.2847428619861603, 0.0688108280301094, 0.0], [0.28012773394584656, -0.11487967520952225, 0.0], [0.2835023105144501, -0.2713525891304016, 0.0], [0.13360784947872162, -3.4464783668518066, 0.0], [0.5825571417808533, 0.12528395652770996, 1.0], [-0.005783223547041416, 3.55509352684021, 0.0], [0.15162523090839386, -3.7201931476593018, 1.0], [0.5520256161689758, 0.1665908545255661, 1.0], [0.00011015035852324218, 3.5473928451538086, 0.0], [0.12833282351493835, -3.5047824382781982, 1.0], [0.5509348511695862, 0.15928205847740173, 1.0], [0.0021471420768648386, 3.3115196228027344, 0.0], [0.1469869166612625, 0.6076820492744446, 1.0], [0.4079679250717163, 0.14804686605930328, 0.0], [0.3083888292312622, -0.045009028166532516, 0.0], [-1.269534945487976, -2.4511406421661377, 1.0], [1.1158101558685303, -0.0046149021945893764, 0.0], [0.33211374282836914, -1.4075921773910522, 1.0], [0.5999786257743835, 0.18216034770011902, 1.0], [0.18201877176761627, 0.2527518570423126, 0.0], [0.1560269147157669, -0.1656409353017807, 0.0], [-0.14746609330177307, -0.19170379638671875, 0.0], [-0.16105975210666656, 0.17074604332447052, 0.0], [0.194832444190979, 1.2797627449035645, 1.0], [0.0017487274017184973, 2.4538629055023193, 0.0], [0.3437391519546509, -3.808094024658203, 1.0], [0.6819084882736206, 1.4298045635223389, 1.0], [-0.0038405098021030426, 2.410346508026123, 0.0], [0.016799192875623703, -1.6237061023712158, 1.0], [0.5097429156303406, -0.4905848503112793, 0.0], [0.34351933002471924, -0.2096981555223465, 0.0], [0.4971473515033722, -0.0031218412332236767, 0.0], [0.3280673921108246, 0.17234408855438232, 0.0], [0.1645740568637848, 0.5290371775627136, 0.0], [-0.0011515083024278283, 1.7933015823364258, 0.0], [0.17582449316978455, -3.866628408432007, 1.0], [2.2739901542663574, 1.5780835151672363, 1.0], [-0.0021619026083499193, 2.4573144912719727, 0.0], [-0.0023947488516569138, -1.95314621925354, 1.0], [-0.3030523359775543, -0.3648222088813782, 0.0], [-0.308184951543808, -0.18110203742980957, 0.0], [-0.4928063750267029, 0.004225097596645355, 0.0], [-0.3400692939758301, 0.1880011260509491, 0.0], [-0.34133458137512207, 0.3700874149799347, 0.0], [-0.1670818030834198, 0.541626513004303, 0.0], [0.012808243744075298, 0.35043826699256897, 0.0], [0.18579402565956116, 0.5300296545028687, 0.0], [0.3212219476699829, 0.35598447918891907, 0.0], [0.32693377137184143, 0.178011953830719, 0.0], [0.3140724301338196, -0.007792115211486816, 0.0], [0.3100062310695648, -0.17392712831497192, 0.0], [0.3140272796154022, -0.3254932165145874, 0.0], [0.16041193902492523, -3.36538028717041, 1.0], [0.5639801025390625, 1.4579687118530273, 1.0], [0.0002559674030635506, 2.5100250244140625, 0.0], [0.016942637041211128, -1.6047109365463257, 1.0], [0.48060110211372375, -0.49267148971557617, 0.0], [0.33299168944358826, -0.24719734489917755, 0.0], [0.4708542823791504, -0.00378223555162549, 0.0], [0.31789126992225647, 0.162714883685112, 0.0], [0.14399205148220062, -1.4627968072891235, 0.0], [1.7464975118637085, 1.1363205909729004, 1.0], [0.005318333860486746, 2.583033561706543, 0.0], [0.05166942998766899, -2.4050943851470947, 1.0], [-0.28586509823799133, -0.3691912889480591, 0.0], [-0.28786522150039673, -0.18065623939037323, 0.0], [0.3382720649242401, -0.0018039146671071649, 0.0], [-0.38318192958831787, 0.1219109445810318, 0.0], [-0.23823335766792297, 0.28904807567596436, 0.0], [-0.20151348412036896, 0.4464676082134247, 0.0], [-0.04931429401040077, 0.3736310303211212, 0.0], [0.08201571553945541, 0.4582013487815857, 0.0], [0.20043067634105682, 0.41622084379196167, 0.0], [0.2882938086986542, 0.25285157561302185, 0.0], [0.2850245535373688, 0.07727579027414322, 0.0], [0.27833542227745056, -0.1041203960776329, 0.0], [0.2804087698459625, -0.2620033621788025, 0.0], [0.13481850922107697, -3.4536893367767334, 1.0], [0.5715101361274719, 0.17156575620174408, 1.0], [-0.0030500313732773066, 3.5385990142822266, 0.0], [0.1432507187128067, 0.6050065159797668, 1.0], [0.39181962609291077, 0.13690277934074402, 0.0], [0.2791362404823303, -0.06971167027950287, 0.0], [-1.197286605834961, -2.522541046142578, 1.0], [1.0716831684112549, -0.001126809511333704, 0.0], [0.31472060084342957, -1.465348482131958, 1.0], [0.6156499981880188, 0.18912148475646973, 1.0], [0.18258504569530487, 0.2492191195487976, 0.0], [0.17064392566680908, -0.125362828373909, 0.0], [-0.13939981162548065, -0.20036369562149048, 0.0], [-0.16540323197841644, 0.17366674542427063, 0.0], [0.19486428797245026, 1.2933557033538818, 1.0], [0.001380850444547832, 2.553370952606201, 0.0], [0.3441396653652191, -3.9077072143554688, 1.0], [0.6764344573020935, 1.4611921310424805, 1.0], [-0.0020409973803907633, 2.4459497928619385, 0.0], [0.017514171078801155, -1.716288447380066, 1.0], [0.512945294380188, -0.5162091851234436, 0.0], [0.3454250395298004, -0.21864327788352966, 0.0], [0.4988326132297516, -0.002997300121933222, 0.0], [0.33112797141075134, 0.18215268850326538, 0.0], [0.16850890219211578, 0.537277340888977, 0.0], [-0.0013047028332948685, 1.8236764669418335, 0.0], [0.17585203051567078, -3.9223716259002686, 1.0], [2.347522735595703, 1.5870299339294434, 1.0], [-0.0014181779697537422, 2.542780637741089, 0.0], [-0.0019021524349227548, -2.0075321197509766, 1.0], [-0.30772554874420166, -0.3729817569255829, 0.0], [-0.31708166003227234, -0.18274793028831482, 0.0], [-0.49756932258605957, 0.0036270630080252886, 0.0], [-0.33542513847351074, 0.18892276287078857, 0.0], [-0.3350449204444885, 0.3744008541107178, 0.0], [-0.17437119781970978, 0.5484316945075989, 0.0], [0.004380363505333662, 0.35617485642433167, 0.0], [0.17979486286640167, 0.5384335517883301, 0.0], [0.3260696828365326, 0.36155298352241516, 0.0], [0.31989586353302, 0.18555723130702972, 0.0], [0.31540289521217346, -0.0029834627639502287, 0.0], [0.3116351366043091, -0.17157161235809326, 0.0], [0.31629911065101624, -0.32108521461486816, 0.0], [0.15862952172756195, -3.4234325885772705, 1.0], [0.6517497301101685, 0.17778803408145905, 1.0], [-0.003324504941701889, 3.584611177444458, 0.0], [0.15331198275089264, 0.6067488789558411, 1.0], [0.40866217017173767, 0.13998281955718994, 0.0], [0.3103254437446594, -0.07526259869337082, 0.0], [-1.2862340211868286, -2.5682222843170166, 1.0], [1.1159371137619019, -0.003480056067928672, 0.0], [0.3359672427177429, -1.4297995567321777, 1.0], [0.57049560546875, 0.19031614065170288, 1.0], [0.18035520613193512, 0.25654470920562744, 0.0], [0.16975601017475128, -0.13438758254051208, 0.0], [-0.1414002776145935, -0.19692158699035645, 0.0], [-0.1672235131263733, 0.1776735782623291, 0.0], [0.20269723236560822, 1.2865443229675293, 1.0], [0.002702458528801799, 2.535266637802124, 0.0], [0.34463226795196533, -3.8918261528015137, 1.0], [0.680560290813446, 1.453718900680542, 1.0]], [[2.417820930480957, 1.688968539237976, 1.0], [-0.2318207025527954, -0.32933828234672546, 0.0], [-0.44778862595558167, -0.16066226363182068, 0.0], [-0.48637205362319946, 0.017125364392995834, 0.0], [-0.31395474076271057, 0.18891651928424835, 0.0], [-0.2260919064283371, 0.3469102084636688, 0.0], [0.09078487008810043, 0.3561351001262665, 0.0], [0.1565912812948227, 0.38627392053604126, 0.0], [0.21846447885036469, 0.4218571186065674, 0.0], [0.27593955397605896, 0.3810517191886902, 0.0], [0.3023528456687927, 0.19936245679855347, 0.0], [0.29842743277549744, 0.024372156709432602, 0.0], [0.2979971170425415, -0.14000330865383148, 0.0], [0.30078890919685364, -0.283502459526062, 0.0], [0.14773090183734894, -3.3608558177948, 1.0], [0.5066143870353699, 1.413012981414795, 1.0], [0.0005787870613858104, 2.3503382205963135, 0.0], [0.017911335453391075, -1.5483958721160889, 1.0], [0.4607052803039551, -0.47156602144241333, 0.0], [0.3138267695903778, -0.2280537337064743, 0.0], [0.4565352499485016, -0.008344748988747597, 0.0], [0.30436116456985474, 0.15910883247852325, 0.0], [0.13842825591564178, -1.4275456666946411, 1.0], [2.056859254837036, 1.379650592803955, 1.0], [-0.0001456173340557143, 2.294585943222046, 0.0], [0.020682526752352715, -1.9795122146606445, 1.0], [-0.29005181789398193, -0.34312963485717773, 0.0], [-0.2970866560935974, -0.1714424043893814, 0.0], [-0.4751010239124298, -0.0038673160597682, 0.0], [-0.3445313572883606, 0.16257047653198242, 0.0], [-0.3263002634048462, 0.32927900552749634, 0.0], [-0.1794271171092987, 0.5005514025688171, 0.0], [0.004784418735653162, 0.32682743668556213, 0.0], [0.1779208779335022, 0.4926079213619232, 0.0], [0.3135473430156708, 0.33121761679649353, 0.0], [0.321877121925354, 0.1683814376592636, 0.0], [0.30836132168769836, -0.00875849463045597, 0.0], [0.3066977858543396, -0.16671212017536163, 0.0], [0.3143664002418518, -0.308683842420578, 0.0], [0.16085441410541534, -3.2249042987823486, 1.0], [0.5536082983016968, 1.3875020742416382, 1.0], [0.0003117883752565831, 2.4244425296783447, 0.0], [0.015257545746862888, -1.563511610031128, 1.0], [0.47586381435394287, -0.4733985662460327, 0.0], [0.32916587591171265, -0.23670612275600433, 0.0], [0.4682193398475647, -0.006060582585632801, 0.0], [0.3123292028903961, 0.15583808720111847, 0.0], [0.14125679433345795, -1.4140158891677856, 0.0], [1.713467001914978, 1.1249568462371826, 1.0], [0.0062590595334768295, 2.5111207962036133, 0.0], [0.05242804065346718, -2.3560190200805664, 1.0], [-0.2911543846130371, -0.3586759865283966, 0.0], [-0.3094482123851776, -0.2036338746547699, 0.0], [0.3388104736804962, -0.0035297665745019913, 0.0], [-0.3854074478149414, 0.11612768471240997, 0.0], [-0.24257627129554749, 0.28198671340942383, 0.0], [-0.20395506918430328, 0.4403378665447235, 0.0], [-0.04865087941288948, 0.3591865003108978, 0.0], [0.08519766479730606, 0.44395163655281067, 0.0], [0.19832594692707062, 0.40627071261405945, 0.0], [0.2866632044315338, 0.24520228803157806, 0.0], [0.27846863865852356, 0.07357633113861084, 0.0], [0.2822921872138977, -0.10310502350330353, 0.0], [0.2791326642036438, -0.25946861505508423, 0.0], [0.29977959394454956, -0.35255610942840576, 1.0], [0.14207133650779724, -2.754077672958374, 1.0]], [[2.375309705734253, 1.7495012283325195, 1.0], [-0.2261468768119812, -0.33716583251953125, 0.0], [-0.43425723910331726, -0.16492226719856262, 0.0], [-0.5004308223724365, 0.0012025755131617188, 0.0], [-0.4944957196712494, 0.17561683058738708, 0.0], [-0.22116835415363312, 0.33982253074645996, 0.0], [0.11449969559907913, 0.33763882517814636, 0.0], [0.6974045634269714, 0.15814167261123657, 0.0], [0.8750162720680237, 0.17616011202335358, 0.0], [0.32102811336517334, 0.13711193203926086, 0.0], [0.10843976587057114, 0.26503631472587585, 0.0], [-0.06764640659093857, 0.196370929479599, 0.0], [-0.21845901012420654, 0.28130537271499634, 0.0], [-0.5216400027275085, 0.1290895789861679, 0.0], [-0.5240667462348938, -0.03652463108301163, 0.0], [-0.5308598875999451, -0.2022201418876648, 0.0], [-0.1941622644662857, -0.3472495377063751, 0.0], [2.2134079933166504, -3.048110008239746, 1.0], [0.7411885261535645, 0.16404888033866882, 1.0], [-0.004807023331522942, 3.3617494106292725, 0.0], [0.15247628092765808, 0.5631347298622131, 1.0], [0.4344204366207123, 0.1315871626138687, 0.0], [0.3286580443382263, -0.05736483633518219, 0.0], [-1.3473589420318604, -2.394190788269043, 1.0], [1.172717809677124, -0.004717704840004444, 0.0], [0.3469458222389221, -1.3674376010894775, 1.0], [2.1403186321258545, 1.5289390087127686, 1.0], [-0.0031155755277723074, 2.3364291191101074, 0.0], [0.012570121325552464, -1.9792518615722656, 1.0], [-0.29931798577308655, -0.35874053835868835, 0.0], [-0.2979269325733185, -0.17255209386348724, 0.0], [-0.47414302825927734, 0.005216382443904877, 0.0], [-0.32761868834495544, 0.176922008395195, 0.0], [-0.33537742495536804, 0.34982237219810486, 0.0], [-0.1743125021457672, 0.5225365161895752, 0.0], [0.007717151194810867, 0.33780771493911743, 0.0], [0.1790788173675537, 0.5121970176696777, 0.0], [0.31966596841812134, 0.34276074171066284, 0.0], [0.31194090843200684, 0.17258331179618835, 0.0], [0.48759204149246216, -0.004221069160848856, 0.0], [0.319299578666687, -0.18106211721897125, 0.0], [0.32262763381004333, -0.3496289849281311, 0.0], [0.16548480093479156, -3.300699472427368, 1.0], [0.6082134246826172, 1.4255056381225586, 1.0], [-0.00021618416940327734, 2.416797637939453, 0.0], [0.014559227041900158, -1.5589593648910522, 1.0], [0.4873320162296295, -0.4734210669994354, 0.0], [0.3346787393093109, -0.23607690632343292, 0.0], [0.46727120876312256, -0.0034703360870480537, 0.0], [0.3222344219684601, 0.1594422161579132, 0.0], [0.14129546284675598, -1.4320780038833618, 0.0], [1.7455781698226929, 1.130113959312439, 1.0], [0.006947448011487722, 2.4873342514038086, 0.0], [0.05129537731409073, -2.3384451866149902, 1.0], [-0.2936219871044159, -0.36088573932647705, 0.0], [-0.2825738787651062, -0.17782771587371826, 0.0], [-0.45196419954299927, -0.021855082362890244, 0.0], [-0.34871968626976013, 0.14180774986743927, 0.0], [-0.31334471702575684, 0.32076871395111084, 0.0], [-0.18105395138263702, 0.4972195029258728, 0.0], [-0.002585233421996236, 0.33891984820365906, 0.0], [0.16308701038360596, 0.4934646785259247, 0.0], [0.30736929178237915, 0.3320172131061554, 0.0], [0.31598562002182007, 0.1733236014842987, 0.0], [0.3116774260997772, -0.006732433568686247, 0.0], [0.29746896028518677, -0.16885210573673248, 0.0], [0.3074265122413635, -0.3124105632305145, 0.0], [0.15690909326076508, -3.253075361251831, 1.0], [0.5524691939353943, 1.411928653717041, 1.0], [0.00021868028852622956, 2.411691427230835, 0.0], [0.016968881711363792, -1.5542645454406738, 1.0], [0.47281673550605774, -0.4681324362754822, 0.0], [0.3324568271636963, -0.23963212966918945, 0.0], [0.46283867955207825, -0.006127538625150919, 0.0], [0.3134847581386566, 0.15610630810260773, 0.0], [0.1404821276664734, -1.4314861297607422, 0.0], [1.7070990800857544, 1.1587635278701782, 1.0], [0.00603497214615345, 2.4837071895599365, 0.0], [0.05544986575841904, -2.3823163509368896, 1.0], [-0.2950475811958313, -0.3597816824913025, 0.0], [-0.30880555510520935, -0.2024787813425064, 0.0], [0.33048075437545776, -0.0019063405925408006, 0.0], [-0.38460877537727356, 0.11260876804590225, 0.0], [-0.2406798154115677, 0.28448519110679626, 0.0], [-0.20088422298431396, 0.4461558759212494, 0.0], [-0.0468277707695961, 0.36753302812576294, 0.0], [0.08859807997941971, 0.44919446110725403, 0.0], [0.20418722927570343, 0.41047367453575134, 0.0], [0.28468456864356995, 0.24564070999622345, 0.0], [0.2831054627895355, 0.06610861420631409, 0.0], [0.27751991152763367, -0.11344466358423233, 0.0], [0.2794300615787506, -0.2697649300098419, 0.0], [0.13642315566539764, -3.40891695022583, 1.0], [0.5940807461738586, 0.16920441389083862, 1.0], [-0.00324475159868598, 3.5436851978302, 0.0], [0.14190205931663513, 0.6016948223114014, 1.0], [0.38874712586402893, 0.1351388394832611, 0.0], [0.29896435141563416, -0.07649465650320053, 0.0], [-1.2227745056152344, -2.536524534225464, 1.0], [1.050520658493042, -0.003592148656025529, 0.0], [0.31561896204948425, -1.4548851251602173, 1.0], [0.5906838774681091, 0.18761087954044342, 1.0], [0.179377019405365, 0.25603827834129333, 0.0], [0.16784162819385529, -0.1237027645111084, 0.0], [-0.13536018133163452, -0.19579507410526276, 0.0], [-0.15299883484840393, 0.17936033010482788, 0.0], [0.19950143992900848, 1.2751649618148804, 1.0], [0.0017304724315181375, 2.519984483718872, 0.0], [0.33780455589294434, -3.840508222579956, 1.0], [0.6641701459884644, 1.442672848701477, 1.0], [-0.0019378169672563672, 2.387885570526123, 0.0], [0.016033995896577835, -1.6406184434890747, 1.0], [0.5030962824821472, -0.4958620071411133, 0.0], [0.3466052711009979, -0.21941401064395905, 0.0], [0.49143144488334656, -0.003212336450815201, 0.0], [0.5685011744499207, -0.008306850679218769, 0.0], [0.2747839689254761, 0.5973458290100098, 0.0], [-0.0016167706344276667, 1.8141411542892456, 0.0], [0.17045283317565918, -3.7336108684539795, 1.0], [2.288879156112671, 1.5252193212509155, 1.0], [-0.003059428185224533, 2.401327610015869, 0.0], [0.00790303573012352, -1.9909155368804932, 1.0], [-0.3136129379272461, -0.35570138692855835, 0.0], [-0.3189280033111572, -0.17774195969104767, 0.0], [-0.4994417130947113, 0.00587188545614481, 0.0], [-0.33590391278266907, 0.18199694156646729, 0.0], [-0.34693172574043274, 0.357231467962265, 0.0], [-0.181783989071846, 0.5323362350463867, 0.0], [0.0028715215157717466, 0.3462882339954376, 0.0], [0.17980383336544037, 0.5265310406684875, 0.0], [0.32599949836730957, 0.35592231154441833, 0.0], [0.3259125053882599, 0.18698245286941528, 0.0], [0.5021169185638428, -0.0024252762086689472, 0.0], [0.32756248116493225, -0.1740943342447281, 0.0], [0.3287683427333832, -0.346279501914978, 0.0], [0.16914628446102142, -3.3678855895996094, 1.0], [0.6108896732330322, 1.4533663988113403, 1.0], [-0.0007585759740322828, 2.4750561714172363, 0.0], [0.01612805761396885, -1.5815067291259766, 1.0], [0.4840067923069, -0.47916561365127563, 0.0], [0.33403271436691284, -0.24344176054000854, 0.0], [0.47385600209236145, -0.002897323342040181, 0.0], [0.32163363695144653, 0.1573484092950821, 0.0], [0.1455565243959427, -1.471130132675171, 0.0], [1.8003249168395996, 1.1567606925964355, 1.0], [0.005852470640093088, 2.59676456451416, 0.0], [0.04960939660668373, -2.3754546642303467, 1.0], [-0.298647403717041, -0.36645057797431946, 0.0], [-0.3093050420284271, -0.2067861258983612, 0.0], [0.3482290804386139, 1.4252125765779056e-05, 0.0], [-0.38866305351257324, 0.12196680158376694, 0.0], [-0.2475409209728241, 0.2904462218284607, 0.0], [-0.21113020181655884, 0.45510128140449524, 0.0], [-0.05764593556523323, 0.3675273060798645, 0.0], [0.07550926506519318, 0.45949387550354004, 0.0], [0.2009078711271286, 0.4146779179573059, 0.0], [0.2852805554866791, 0.2530146837234497, 0.0], [0.2834291458129883, 0.07714904844760895, 0.0], [0.2842814028263092, -0.10184543579816818, 0.0], [0.28306397795677185, -0.261498361825943, 0.0], [0.1369970142841339, -3.4532437324523926, 1.0], [0.5685549974441528, 0.1720697581768036, 1.0], [-0.004430845379829407, 3.5677192211151123, 0.0], [0.14682990312576294, 0.6097235083580017, 1.0], [0.38413670659065247, 0.14493076503276825, 0.0], [0.2811657190322876, -0.0745820626616478, 0.0], [-1.1957213878631592, -2.548866033554077, 1.0], [1.0619243383407593, -0.001492030220106244, 0.0], [0.31625673174858093, -1.4139716625213623, 1.0], [0.6014388203620911, 0.18538200855255127, 1.0], [0.18015913665294647, 0.24823527038097382, 0.0], [0.1687736213207245, -0.12385843694210052, 0.0], [-0.13804438710212708, -0.20015378296375275, 0.0], [-0.17078861594200134, 0.1712450534105301, 0.0], [0.19949284195899963, 1.2924830913543701, 1.0], [0.0009465234470553696, 2.5552217960357666, 0.0], [0.34007662534713745, -3.88332200050354, 1.0], [0.7003255486488342, 1.448524832725525, 1.0], [-0.003543808124959469, 2.41117525100708, 0.0], [0.017006579786539078, -1.6735895872116089, 1.0], [0.5091347098350525, -0.5065216422080994, 0.0], [0.34520748257637024, -0.21812507510185242, 0.0], [0.5002549290657043, -0.002936788834631443, 0.0], [0.33024701476097107, 0.17783327400684357, 0.0], [0.16142426431179047, 0.5319394469261169, 0.0], [-0.0006160826305858791, 1.8228535652160645, 0.0], [0.1737479716539383, -3.880492925643921, 1.0], [2.2827398777008057, 1.548932671546936, 1.0], [-0.0025135378818958998, 2.494800090789795, 0.0], [-6.274312909226865e-05, -1.9674369096755981, 1.0], [-0.30433884263038635, -0.3660052418708801, 0.0], [-0.30903103947639465, -0.18184228241443634, 0.0], [-0.4859645366668701, 0.004131973721086979, 0.0], [-0.3332778215408325, 0.1889575719833374, 0.0], [-0.3401950001716614, 0.3656651973724365, 0.0], [-0.16591288149356842, 0.5437434315681458, 0.0], [0.011167389340698719, 0.35851040482521057, 0.0], [0.1842346489429474, 0.5317476987838745, 0.0], [0.32207489013671875, 0.361494243144989, 0.0], [0.32641854882240295, 0.18252840638160706, 0.0], [0.31788328289985657, -0.004129973705857992, 0.0], [0.3126296401023865, -0.17475907504558563, 0.0], [0.31519198417663574, -0.3252980709075928, 0.0], [0.15886278450489044, -3.4047343730926514, 1.0], [0.5568185448646545, 1.4544322490692139, 1.0], [-0.0006976624135859311, 2.504232883453369, 0.0], [0.018133657053112984, -1.5932261943817139, 1.0], [0.4728139638900757, -0.48679113388061523, 0.0], [0.33090275526046753, -0.24359747767448425, 0.0], [0.46907299757003784, -0.004443435464054346, 0.0], [0.31460604071617126, 0.16237588226795197, 0.0], [0.14296092092990875, -1.4692609310150146, 0.0], [1.6559598445892334, 1.1562966108322144, 1.0], [0.005351715255528688, 2.559840440750122, 0.0], [0.05455975979566574, -2.4346296787261963, 1.0], [-0.2910903990268707, -0.3681468367576599, 0.0], [-0.28534919023513794, -0.18148408830165863, 0.0], [0.3296508193016052, -0.003695511957630515, 0.0], [-0.3698330819606781, 0.11884937435388565, 0.0], [-0.2366926223039627, 0.2916627526283264, 0.0], [-0.19524860382080078, 0.4492124021053314, 0.0], [-0.04390447959303856, 0.3736869990825653, 0.0], [0.08450056612491608, 0.4627127945423126, 0.0], [0.20129381120204926, 0.4247853457927704, 0.0], [0.2803645730018616, 0.256890207529068, 0.0], [0.2847197353839874, 0.07394187897443771, 0.0], [0.27762892842292786, -0.1117992252111435, 0.0], [0.2837435305118561, -0.26878389716148376, 0.0], [0.13479764759540558, -3.46793532371521, 1.0], [0.5069707632064819, 1.4694284200668335, 1.0], [-0.0003119239991065115, 2.479485511779785, 0.0], [0.01897299289703369, -1.6129685640335083, 1.0], [0.4509933590888977, -0.48863300681114197, 0.0], [0.31474870443344116, -0.2458605319261551, 0.0]], [[2.4322783946990967, 1.7111254930496216, 1.0], [-0.23212239146232605, -0.3375237286090851, 0.0], [-0.4302615225315094, -0.16285264492034912, 0.0], [-0.5027830600738525, 0.00044239312410354614, 0.0], [-0.49129435420036316, 0.17586468160152435, 0.0], [-0.23986342549324036, 0.34748321771621704, 0.0], [0.09330493211746216, 0.3310837745666504, 0.0], [0.16227637231349945, 0.3962761461734772, 0.0], [0.7894126772880554, 0.1587066501379013, 0.0], [0.3174159526824951, 0.1532726138830185, 0.0], [0.21676726639270782, 0.31751739978790283, 0.0], [0.07658766955137253, 0.15770363807678223, 0.0], [-0.07468360662460327, 0.3202657401561737, 0.0], [-0.48466381430625916, 0.15397107601165771, 0.0], [-0.5078151822090149, -0.01638474315404892, 0.0], [-0.5093916654586792, -0.18950213491916656, 0.0], [1.999403476715088, -3.4356932640075684, 1.0], [0.706198513507843, 0.16656506061553955, 1.0], [-0.005258680786937475, 3.3326759338378906, 0.0], [0.14288869500160217, 0.5711912512779236, 1.0], [0.41886523365974426, 0.1293962150812149, 0.0], [0.3129718005657196, -0.06456492841243744, 0.0], [-1.3189102411270142, -2.387582540512085, 1.0], [1.1301534175872803, -0.0046073757112026215, 0.0], [0.3371243476867676, -1.392604947090149, 1.0], [0.6091623306274414, 0.1820392608642578, 1.0], [0.18244309723377228, 0.2508610188961029, 0.0], [0.16040301322937012, -0.16557049751281738, 0.0], [-0.14177455008029938, -0.18812242150306702, 0.0], [-0.1637934446334839, 0.1644182950258255, 0.0], [0.1958131641149521, 1.2397723197937012, 1.0], [0.0012001111172139645, 2.4169762134552, 0.0], [0.3363223075866699, -3.7278528213500977, 1.0], [0.6962451934814453, 1.3975036144256592, 1.0], [-0.001195860211737454, 2.364640474319458, 0.0], [0.015094771981239319, -1.6085999011993408, 1.0], [0.5027084350585938, -0.4858042597770691, 0.0], [0.3428829312324524, -0.2134217470884323, 0.0], [0.5061543583869934, -0.004992651753127575, 0.0], [0.3277417719364166, 0.17556990683078766, 0.0], [0.16497384011745453, 0.5183372497558594, 0.0], [-0.0008756645256653428, 1.7509649991989136, 0.0], [0.1761057823896408, -3.791243553161621, 1.0], [2.2914798259735107, 1.5257622003555298, 1.0], [-0.0019155768677592278, 2.49919056892395, 0.0], [0.0024425771553069353, -1.9889222383499146, 1.0], [-0.3010977804660797, -0.36345046758651733, 0.0], [-0.3113788664340973, -0.17815281450748444, 0.0], [-0.4929920434951782, 0.003203652100637555, 0.0], [-0.3405931890010834, 0.18272694945335388, 0.0], [-0.3359556198120117, 0.3613026738166809, 0.0], [-0.17231494188308716, 0.5346431732177734, 0.0], [0.00947111938148737, 0.35289332270622253, 0.0], [0.1817338764667511, 0.5238410830497742, 0.0], [0.3247300088405609, 0.35227668285369873, 0.0], [0.32578200101852417, 0.1810297966003418, 0.0], [0.49378424882888794, -0.0032826908864080906, 0.0], [0.32203248143196106, -0.1823381632566452, 0.0], [0.32239657640457153, -0.34844571352005005, 0.0], [0.16730812191963196, -3.3343937397003174, 1.0], [0.6073479056358337, 1.4404221773147583, 1.0], [-0.0020710593089461327, 2.4171435832977295, 0.0], [0.017595544457435608, -1.5462009906768799, 1.0], [0.4756218492984772, -0.46622294187545776, 0.0], [0.3341781198978424, -0.23577505350112915, 0.0], [0.4778357446193695, -0.003594696754589677, 0.0], [0.31909966468811035, 0.15654732286930084, 0.0], [0.14458654820919037, -1.4643481969833374, 0.0], [1.8573813438415527, 1.1748746633529663, 1.0], [0.005707906559109688, 2.539207935333252, 0.0], [0.04749089106917381, -2.3273282051086426, 1.0], [-0.2948734760284424, -0.36368873715400696, 0.0], [-0.2940702736377716, -0.17904144525527954, 0.0], [-0.4836496412754059, -0.01307876966893673, 0.0], [-0.3471282124519348, 0.1476561427116394, 0.0], [-0.3248971402645111, 0.32885801792144775, 0.0], [-0.18246784806251526, 0.5107173323631287, 0.0], [-0.0015199310146272182, 0.34239569306373596, 0.0], [0.16552354395389557, 0.5003330707550049, 0.0], [0.31440478563308716, 0.339857816696167, 0.0], [0.31755632162094116, 0.1806461066007614, 0.0], [0.3116113543510437, -0.002025194466114044, 0.0], [0.30928835272789, -0.16779734194278717, 0.0], [0.31182634830474854, -0.3111788034439087, 0.0], [0.158411905169487, -3.3044424057006836, 1.0], [0.5709869861602783, 1.4249980449676514, 1.0], [0.00019320196588523686, 2.428584337234497, 0.0], [0.017490314319729805, -1.5630152225494385, 1.0], [0.47013306617736816, -0.4732798933982849, 0.0], [0.3250701427459717, -0.23803593218326569, 0.0], [0.46504664421081543, -0.00408889539539814, 0.0], [0.3165600001811981, 0.15988530218601227, 0.0], [0.14083273708820343, -1.4488259553909302, 0.0], [1.7197414636611938, 1.116327166557312, 1.0], [0.004795281682163477, 2.530336618423462, 0.0], [0.05409489572048187, -2.378753900527954, 1.0], [-0.29017969965934753, -0.36060458421707153, 0.0], [-0.30629339814186096, -0.2044266015291214, 0.0], [0.3317667841911316, 0.00015470446669496596, 0.0], [-0.3829262852668762, 0.1165405809879303, 0.0], [-0.24350161850452423, 0.2857951521873474, 0.0], [-0.20332296192646027, 0.4476407766342163, 0.0], [-0.048390842974185944, 0.3664409816265106, 0.0], [0.08581240475177765, 0.45178377628326416, 0.0], [0.20359143614768982, 0.41661229729652405, 0.0], [0.28447529673576355, 0.24945463240146637, 0.0], [0.2761770486831665, 0.07022567838430405, 0.0], [0.28361424803733826, -0.11387746036052704, 0.0], [0.27972131967544556, -0.2677445411682129, 0.0], [0.13535206019878387, -3.4006617069244385, 1.0], [0.5686803460121155, 0.16695691645145416, 1.0], [-0.004268908407539129, 3.5275957584381104, 0.0], [0.14438770711421967, 0.5952165126800537, 1.0], [0.3901017904281616, 0.13988657295703888, 0.0], [0.2910643517971039, -0.0753064677119255, 0.0], [-1.2276870012283325, -2.543210744857788, 1.0], [1.0508264303207397, -0.001589784398674965, 0.0], [0.31542500853538513, -1.4227609634399414, 1.0], [0.6195597648620605, 0.18658635020256042, 1.0], [0.1824600249528885, 0.2402251660823822, 0.0], [0.16720417141914368, -0.11679339408874512, 0.0], [-0.13768702745437622, -0.19711807370185852, 0.0], [-0.16518017649650574, 0.17344067990779877, 0.0], [0.2007230967283249, 1.2692766189575195, 1.0], [0.0017701828619465232, 2.484179735183716, 0.0], [0.34080857038497925, -3.844252586364746, 1.0], [0.6808927059173584, 1.4435368776321411, 1.0], [-0.0033451272174715996, 2.386535882949829, 0.0], [0.019816529005765915, -1.6698724031448364, 1.0], [0.4985387325286865, -0.5054593682289124, 0.0], [0.3437775671482086, -0.22326719760894775, 0.0], [0.49437859654426575, -0.0027063789311796427, 0.0], [0.3278137743473053, 0.17976698279380798, 0.0], [0.1700080782175064, 0.5336816906929016, 0.0], [-0.0004699462733697146, 1.8061437606811523, 0.0], [0.17642417550086975, -3.8664021492004395, 1.0], [2.29658842086792, 1.5608881711959839, 1.0], [-0.002699175849556923, 2.494817018508911, 0.0], [0.004634536802768707, -2.001585006713867, 1.0], [-0.30517256259918213, -0.3689900040626526, 0.0], [-0.3119257986545563, -0.18184563517570496, 0.0], [-0.4962379038333893, 0.003936743829399347, 0.0], [-0.33513519167900085, 0.1870686113834381, 0.0], [-0.33362239599227905, 0.3660539388656616, 0.0], [-0.17099817097187042, 0.5448897480964661, 0.0], [0.013804096728563309, 0.3560548722743988, 0.0], [0.1850767880678177, 0.5351777672767639, 0.0], [0.3237546384334564, 0.35903653502464294, 0.0], [0.3217230439186096, 0.18083901703357697, 0.0], [0.4988093078136444, -0.0032937834039330482, 0.0], [0.32334819436073303, -0.18488621711730957, 0.0], [0.3270522654056549, -0.3593496084213257, 0.0], [0.16618800163269043, -3.3913300037384033, 1.0], [0.6061574816703796, 1.4678330421447754, 1.0], [-0.0002147635823348537, 2.366253137588501, 0.0], [0.020063765347003937, -1.5686981678009033, 1.0], [0.4827805757522583, -0.4746115505695343, 0.0], [0.331605464220047, -0.23070229589939117, 0.0], [0.4678512215614319, -0.003368477104231715, 0.0], [0.31943127512931824, 0.16215674579143524, 0.0], [0.14689567685127258, -1.4413639307022095, 0.0], [1.844711184501648, 1.1919255256652832, 1.0], [0.005702368915081024, 2.5159287452697754, 0.0], [0.04750453680753708, -2.3350508213043213, 1.0], [-0.30269575119018555, -0.3650863766670227, 0.0], [-0.2948475182056427, -0.17946358025074005, 0.0], [-0.48290255665779114, -0.014978204853832722, 0.0], [-0.3576168715953827, 0.1455322951078415, 0.0], [-0.33151930570602417, 0.3317244052886963, 0.0], [-0.19153395295143127, 0.5099006295204163, 0.0], [-0.005881005898118019, 0.3462015688419342, 0.0], [0.16710233688354492, 0.5060299634933472, 0.0], [0.31721097230911255, 0.34581658244132996, 0.0], [0.32470703125, 0.18346235156059265, 0.0], [0.3165023922920227, -0.0036036947276443243, 0.0], [0.3147120475769043, -0.16733096539974213, 0.0], [0.3114703595638275, -0.31298086047172546, 0.0], [0.15885736048221588, -3.3291289806365967, 1.0], [0.581295371055603, 1.4383870363235474, 1.0], [0.0011437630746513605, 2.5524375438690186, 0.0], [0.01177166122943163, -1.6389964818954468, 1.0], [0.4772801995277405, -0.49636754393577576, 0.0], [0.3236812949180603, -0.24165783822536469, 0.0], [0.4652690589427948, -0.004760826472193003, 0.0], [0.3134933412075043, 0.16444261372089386, 0.0], [0.14171145856380463, -1.4679118394851685, 0.0], [1.7320530414581299, 1.1464378833770752, 1.0], [0.004003938753157854, 2.5998549461364746, 0.0], [0.05198148265480995, -2.413668632507324, 1.0], [-0.2925710082054138, -0.37072646617889404, 0.0], [-0.3043648302555084, -0.20912876725196838, 0.0], [0.33388298749923706, -0.002704652026295662, 0.0], [-0.38588106632232666, 0.11981874704360962, 0.0], [-0.2424999475479126, 0.2876892685890198, 0.0], [-0.19831962883472443, 0.45367512106895447, 0.0], [-0.04393579065799713, 0.37326741218566895, 0.0], [0.0857485681772232, 0.45942679047584534, 0.0], [0.20298615097999573, 0.4205988645553589, 0.0], [0.28575801849365234, 0.2535581588745117, 0.0], [0.29165518283843994, 0.07474976778030396, 0.0], [0.28159382939338684, -0.10691481828689575, 0.0], [0.2813459634780884, -0.2672846019268036, 0.0], [0.1353655606508255, -3.4850637912750244, 0.0], [0.5672804713249207, 0.12864771485328674, 1.0], [-0.0066778818145394325, 3.6080124378204346, 0.0], [0.13963305950164795, -3.6747796535491943, 1.0], [0.5625879168510437, 0.1660957932472229, 1.0], [-0.0015492202946916223, 3.4725656509399414, 0.0], [0.14369751513004303, 0.6205459833145142, 1.0], [0.3955521881580353, 0.14829571545124054, 0.0], [0.30208250880241394, -0.05102059617638588, 0.0], [-1.2463561296463013, -2.5352084636688232, 1.0], [1.0839155912399292, -0.004229091573506594, 0.0], [0.3261220157146454, -1.4462188482284546, 1.0], [0.6176899075508118, 0.18490244448184967, 1.0], [0.1819644570350647, 0.24205289781093597, 0.0], [0.1693987250328064, -0.1182747334241867, 0.0], [-0.1434437781572342, -0.19520863890647888, 0.0], [-0.16358597576618195, 0.17755167186260223, 0.0], [0.19769655168056488, 1.2832947969436646, 1.0], [0.0023489966988563538, 2.510784149169922, 0.0], [0.3462923765182495, -3.879671812057495, 1.0], [0.6856967210769653, 1.4571809768676758, 1.0], [-0.0018960818415507674, 2.405978202819824, 0.0], [0.0190349780023098, -1.6264526844024658, 1.0], [0.5090033411979675, -0.488517701625824, 0.0], [0.34353020787239075, -0.21487070620059967, 0.0], [0.500034749507904, -0.0032213858794420958, 0.0], [0.33418184518814087, 0.1771259754896164, 0.0], [0.16668392717838287, 0.5299974083900452, 0.0], [-0.001083551673218608, 1.7848351001739502, 0.0], [0.1780347228050232, -3.912400722503662, 1.0], [2.1894495487213135, 1.581809639930725, 1.0], [-0.002276770770549774, 2.539534330368042, 0.0]], [[2.4309303760528564, 1.7521262168884277, 1.0], [-0.23621715605258942, -0.33499476313591003, 0.0], [-0.42111822962760925, -0.16678248345851898, 0.0], [-0.4951648414134979, -0.0007573897019028664, 0.0], [-0.4923289716243744, 0.17339693009853363, 0.0], [-0.21166248619556427, 0.33432260155677795, 0.0], [0.11360561102628708, 0.33730873465538025, 0.0], [0.16856516897678375, 0.3929351568222046, 0.0], [0.227088063955307, 0.4209938943386078, 0.0], [0.2899084985256195, 0.38590896129608154, 0.0], [0.31203141808509827, 0.20502930879592896, 0.0], [0.31381621956825256, 0.029322197660803795, 0.0], [0.3029698133468628, -0.13482941687107086, 0.0], [0.3068995475769043, -0.2819359004497528, 0.0], [0.15139798820018768, -3.3276968002319336, 1.0], [0.5117444396018982, 1.4075026512145996, 1.0], [0.0008881451212801039, 2.4111571311950684, 0.0], [0.0180551428347826, -1.5666792392730713, 1.0], [0.4608750641345978, -0.47924724221229553, 0.0], [0.32017993927001953, -0.23921744525432587, 0.0], [0.450269490480423, -0.006646882276982069, 0.0], [0.3030776381492615, 0.16195563971996307, 0.0], [0.13699069619178772, -1.4254997968673706, 1.0], [2.0738375186920166, 1.4469325542449951, 1.0], [-0.0002848606090992689, 2.2327914237976074, 0.0], [0.019386831670999527, -1.9747716188430786, 1.0], [-0.29196467995643616, -0.34540486335754395, 0.0], [-0.29377955198287964, -0.1702512800693512, 0.0], [-0.4780344069004059, -0.000984342535957694, 0.0], [-0.34695595502853394, 0.16402283310890198, 0.0], [-0.3354872167110443, 0.33439216017723083, 0.0], [-0.1854025274515152, 0.5047083497047424, 0.0], [0.0010221005650237203, 0.330377459526062, 0.0], [0.1777064949274063, 0.498222291469574, 0.0], [0.3180781602859497, 0.3374052345752716, 0.0], [0.31836575269699097, 0.1731877326965332, 0.0], [0.3120121955871582, -0.0055204518139362335, 0.0], [0.3087441325187683, -0.1667676866054535, 0.0], [0.3148117661476135, -0.3102461099624634, 0.0], [0.16309942305088043, -3.2503821849823, 1.0], [0.5483279228210449, 1.3943567276000977, 1.0], [0.0006223052041605115, 2.3527181148529053, 0.0], [0.016242869198322296, -1.5133140087127686, 1.0], [0.46774765849113464, -0.45639878511428833, 0.0], [0.32095789909362793, -0.2238404005765915, 0.0], [0.46172845363616943, -0.007085379678755999, 0.0], [0.3130247890949249, 0.1549365073442459, 0.0], [0.14048513770103455, -1.4016201496124268, 0.0], [1.6248708963394165, 1.1073079109191895, 1.0], [0.005790527444332838, 2.4720284938812256, 0.0], [0.05649400129914284, -2.357228994369507, 1.0], [-0.28381988406181335, -0.35542425513267517, 0.0], [-0.29789480566978455, -0.20302915573120117, 0.0], [0.3176654577255249, -0.0025513782165944576, 0.0], [-0.37255486845970154, 0.11631854623556137, 0.0], [-0.23977965116500854, 0.28158971667289734, 0.0], [-0.1951911896467209, 0.44041115045547485, 0.0], [-0.040835876017808914, 0.36361202597618103, 0.0], [0.0896376445889473, 0.4460833966732025, 0.0], [0.20626990497112274, 0.40891072154045105, 0.0], [0.2806888520717621, 0.24190643429756165, 0.0], [0.2806619703769684, 0.06516808271408081, 0.0], [0.28116145730018616, -0.11048518866300583, 0.0], [0.2830777168273926, -0.26461291313171387, 0.0], [0.13595981895923615, -3.3621013164520264, 1.0], [0.5076728463172913, 1.4227688312530518, 1.0], [-0.0008396297344006598, 2.4255549907684326, 0.0], [0.017219090834259987, -1.5231181383132935, 1.0], [0.45568549633026123, -0.466979056596756, 0.0], [0.3121853470802307, -0.2414499670267105, 0.0], [0.4445882737636566, -0.007260055746883154, 0.0], [0.3018971085548401, 0.15137356519699097, 0.0], [0.13672618567943573, -1.4468024969100952, 1.0], [2.1568803787231445, 1.4291163682937622, 1.0], [2.7305179173708893e-05, 2.306584119796753, 0.0], [0.01747172512114048, -1.9824475049972534, 1.0], [-0.29937678575515747, -0.34568750858306885, 0.0], [-0.29848167300224304, -0.17473456263542175, 0.0], [-0.4793936312198639, -0.0006671288283541799, 0.0], [-0.3397194445133209, 0.16146992146968842, 0.0], [-0.3328253924846649, 0.3373824656009674, 0.0], [-0.18489141762256622, 0.5047838091850281, 0.0], [-0.0010947687551379204, 0.33449727296829224, 0.0], [0.17357687652111053, 0.49566057324409485, 0.0], [0.32153254747390747, 0.33563315868377686, 0.0], [0.3205501437187195, 0.17293143272399902, 0.0], [0.31338271498680115, -0.005868272855877876, 0.0], [0.3113533854484558, -0.16360394656658173, 0.0], [0.312849223613739, -0.3029193580150604, 0.0], [0.16071590781211853, -3.2504427433013916, 1.0], [0.5656940340995789, 1.390519142150879, 1.0], [0.00024819295504130423, 2.4476585388183594, 0.0], [0.012886877171695232, -1.550013542175293, 1.0], [0.48378685116767883, -0.4735351800918579, 0.0], [0.32456761598587036, -0.23413099348545074, 0.0], [0.4669921100139618, -0.00617317296564579, 0.0], [0.31510481238365173, 0.15826882421970367, 0.0], [0.13951848447322845, -1.4296839237213135, 0.0], [1.768699288368225, 1.1143983602523804, 1.0], [0.006106717977672815, 2.503890037536621, 0.0], [0.05356376990675926, -2.341196060180664, 1.0], [-0.2925032675266266, -0.3562086522579193, 0.0], [-0.30811694264411926, -0.20241451263427734, 0.0], [0.34205472469329834, -0.002947629429399967, 0.0], [-0.38340920209884644, 0.11607792228460312, 0.0], [-0.24983838200569153, 0.2815278172492981, 0.0], [-0.20433051884174347, 0.44086354970932007, 0.0], [-0.052596066147089005, 0.36081215739250183, 0.0], [0.08250598609447479, 0.449540376663208, 0.0], [0.20377030968666077, 0.4091426730155945, 0.0], [0.2816154360771179, 0.25013452768325806, 0.0], [0.2839392423629761, 0.07200461626052856, 0.0], [0.28360703587532043, -0.10082253813743591, 0.0], [0.2881258428096771, -0.2620946764945984, 0.0], [0.13722920417785645, -3.3981947898864746, 1.0], [0.5041014552116394, 1.4296045303344727, 1.0], [-1.747810165397823e-05, 2.362793207168579, 0.0], [0.019810287281870842, -1.5168219804763794, 1.0], [0.44502365589141846, -0.4608200192451477, 0.0], [0.30724552273750305, -0.22897177934646606, 0.0], [0.4426785707473755, -0.007624383550137281, 0.0], [0.30525651574134827, 0.15467533469200134, 0.0], [0.13629914820194244, -1.4341028928756714, 0.0], [1.736024022102356, 1.1175683736801147, 1.0], [0.00505388667806983, 2.5408971309661865, 0.0], [0.04820329695940018, -2.3194944858551025, 1.0], [-0.2861670255661011, -0.35998204350471497, 0.0], [-0.27975088357925415, -0.17999772727489471, 0.0], [0.33041781187057495, -0.0022768054623156786, 0.0], [-0.37842485308647156, 0.11928591132164001, 0.0], [-0.24153029918670654, 0.28234416246414185, 0.0], [-0.20478686690330505, 0.4404967725276947, 0.0], [-0.05235063657164574, 0.360456645488739, 0.0], [0.08280996233224869, 0.4555032253265381, 0.0], [0.20634295046329498, 0.4124935567378998, 0.0], [0.28968819975852966, 0.24927976727485657, 0.0], [0.28059548139572144, 0.06606095284223557, 0.0], [0.27882084250450134, -0.1115429550409317, 0.0], [0.28255435824394226, -0.2653108835220337, 0.0], [0.1377573162317276, -3.3940696716308594, 1.0], [0.5112265348434448, 1.4318079948425293, 1.0], [-0.000946604588534683, 2.3842649459838867, 0.0], [0.019071785733103752, -1.568016529083252, 1.0], [0.4474831521511078, -0.4802097976207733, 0.0], [0.31001418828964233, -0.23410846292972565, 0.0], [0.4466100037097931, -0.008980383165180683, 0.0], [0.3047961890697479, 0.16138321161270142, 0.0], [0.1370844691991806, -1.4495866298675537, 0.0], [1.7656201124191284, 1.137365698814392, 1.0], [0.0058713071048259735, 2.546884775161743, 0.0], [0.04660025238990784, -2.3207807540893555, 1.0], [-0.2940952479839325, -0.36215174198150635, 0.0], [-0.28711390495300293, -0.18043306469917297, 0.0], [0.3343147039413452, -0.0024765394628047943, 0.0], [-0.37317848205566406, 0.1265791356563568, 0.0], [-0.2426939606666565, 0.2900751531124115, 0.0], [-0.19552619755268097, 0.450254887342453, 0.0], [-0.04509469121694565, 0.3658014237880707, 0.0], [0.08913005888462067, 0.45079508423805237, 0.0], [0.20100674033164978, 0.4140061140060425, 0.0], [0.282129168510437, 0.24587427079677582, 0.0], [0.28331458568573, 0.07090704888105392, 0.0], [0.27687522768974304, -0.11265885829925537, 0.0], [0.2852497696876526, -0.2697247564792633, 0.0], [0.13686774671077728, -3.422325372695923, 1.0], [0.585939884185791, 0.16868016123771667, 1.0], [-0.004108517896384001, 3.4919281005859375, 0.0], [0.14518000185489655, 0.5933673977851868, 1.0], [0.38842013478279114, 0.13847821950912476, 0.0], [0.2831858992576599, -0.07240963727235794, 0.0], [-1.2299699783325195, -2.511662006378174, 1.0], [1.070048213005066, -0.002039925195276737, 0.0], [0.3160094618797302, -1.443367600440979, 1.0], [0.6087602972984314, 0.18643592298030853, 1.0], [0.179161936044693, 0.252694308757782, 0.0], [0.1698499172925949, -0.12675558030605316, 0.0], [-0.13411936163902283, -0.19926710426807404, 0.0], [-0.16002723574638367, 0.17452584207057953, 0.0], [0.20548991858959198, 1.2714006900787354, 1.0], [0.0013862736523151398, 2.5224406719207764, 0.0], [0.3373572528362274, -3.8254499435424805, 1.0], [0.6867579221725464, 1.433333158493042, 1.0], [-0.003132818266749382, 2.394423007965088, 0.0], [0.015319476835429668, -1.6625380516052246, 1.0], [0.5002502799034119, -0.5011417269706726, 0.0], [0.3459741771221161, -0.21902379393577576, 0.0], [0.49552956223487854, -0.003409958677366376, 0.0], [0.3267538547515869, 0.1800038367509842, 0.0], [0.1626080870628357, 0.5313960313796997, 0.0], [-0.00035910611040890217, 1.80128812789917, 0.0], [0.17662155628204346, -3.8857309818267822, 1.0], [2.278470754623413, 1.5618504285812378, 1.0], [-0.0019538854248821735, 2.539491653442383, 0.0], [0.0006732820766046643, -1.9760493040084839, 1.0], [-0.3036493957042694, -0.367280513048172, 0.0], [-0.3092362582683563, -0.17985683679580688, 0.0], [-0.49085932970046997, 0.0027689931448549032, 0.0], [-0.32536932826042175, 0.1863412708044052, 0.0], [-0.343284010887146, 0.3637330234050751, 0.0], [-0.17841605842113495, 0.5371753573417664, 0.0], [0.005132276099175215, 0.3498867452144623, 0.0], [0.18102417886257172, 0.5327571630477905, 0.0], [0.31736665964126587, 0.36190494894981384, 0.0], [0.32459762692451477, 0.1848270297050476, 0.0], [0.48855701088905334, -0.003199257655069232, 0.0], [0.3213809132575989, -0.18050314486026764, 0.0], [0.32355254888534546, -0.35305535793304443, 0.0], [0.16622082889080048, -3.3936753273010254, 1.0], [0.5859963297843933, 1.4605895280838013, 1.0], [-0.00026470929151400924, 2.484943151473999, 0.0], [0.018204398453235626, -1.6179076433181763, 1.0], [0.4835700988769531, -0.48762306571006775, 0.0], [0.3324001133441925, -0.23693330585956573, 0.0], [0.4730851948261261, -0.0044818464666605, 0.0], [0.31733161211013794, 0.16312767565250397, 0.0], [0.1432546079158783, -1.469272494316101, 1.0], [2.0617141723632812, 1.4346421957015991, 1.0], [-0.0006381134153343737, 2.3073906898498535, 0.0], [0.020594902336597443, -2.0428566932678223, 1.0], [-0.29819604754447937, -0.3509484529495239, 0.0], [-0.29923489689826965, -0.1858774870634079, 0.0], [-0.47958889603614807, -0.004144120961427689, 0.0], [-0.34768664836883545, 0.16023804247379303, 0.0], [-0.3445584177970886, 0.3385891318321228, 0.0], [-0.1867954134941101, 0.5115852355957031, 0.0], [-0.002401510253548622, 0.33962923288345337, 0.0], [0.17197759449481964, 0.5070921182632446, 0.0], [0.32518014311790466, 0.343731164932251, 0.0], [0.32112106680870056, 0.17899814248085022, 0.0], [0.4934792220592499, -0.0037737840320914984, 0.0], [0.31712770462036133, -0.17421312630176544, 0.0], [0.3226037621498108, -0.34155452251434326, 0.0], [0.16880807280540466, -3.2799108028411865, 1.0], [0.5815001130104065, 1.4228971004486084, 1.0]], [[2.4389326572418213, 1.7412430047988892, 1.0], [-0.25413256883621216, -0.3352055549621582, 0.0], [-0.45685049891471863, -0.1617702692747116, 0.0], [-0.5080631971359253, 0.001979254884645343, 0.0], [-0.49795880913734436, 0.1777646541595459, 0.0], [-0.21754272282123566, 0.34561869502067566, 0.0], [0.10369053483009338, 0.33215704560279846, 0.0], [0.16777464747428894, 0.3956146538257599, 0.0], [0.7891567349433899, 0.16011939942836761, 0.0], [0.3213813602924347, 0.16223956644535065, 0.0], [0.21583551168441772, 0.3174525797367096, 0.0], [0.07380411773920059, 0.16574743390083313, 0.0], [-0.08092945069074631, 0.3130105435848236, 0.0], [-0.4989888668060303, 0.14354337751865387, 0.0], [-0.5064908266067505, -0.027607960626482964, 0.0], [-0.5165790319442749, -0.19391785562038422, 0.0], [-0.1736084371805191, -0.3631506860256195, 1.0], [1.8876159191131592, -3.0367650985717773, 1.0]], [[2.419862747192383, 1.7606425285339355, 1.0], [-0.2337552011013031, -0.3360758125782013, 0.0], [-0.438711941242218, -0.16154791414737701, 0.0], [-0.5029088854789734, 0.0008392646559514105, 0.0], [-0.5021143555641174, 0.1766289472579956, 0.0], [-0.23183278739452362, 0.34287065267562866, 0.0], [0.09226100891828537, 0.33305084705352783, 0.0], [0.7018184661865234, 0.15625306963920593, 0.0], [0.3114722669124603, 0.18223528563976288, 0.0], [0.25094088912010193, 0.3753355145454407, 0.0], [0.1537698358297348, 0.23266786336898804, 0.0], [0.03752468526363373, 0.35931316018104553, 0.0], [-0.04504826292395592, 0.19832350313663483, 0.0], [-0.4852478802204132, 0.04238196462392807, 0.0], [-0.5060021281242371, -0.10536757856607437, 0.0], [-0.5117935538291931, -0.23440255224704742, 0.0], [2.0060856342315674, -3.327108144760132, 1.0], [0.7196203470230103, 0.16617164015769958, 1.0], [-0.00475076399743557, 3.3077211380004883, 0.0], [0.14073152840137482, 0.5673039555549622, 1.0], [0.4161936938762665, 0.1336984485387802, 0.0], [0.31006062030792236, -0.06422621011734009, 0.0], [-1.3263570070266724, -2.3987982273101807, 1.0], [1.122193455696106, -0.005838517565280199, 0.0], [0.33677753806114197, -1.3702424764633179, 1.0], [0.6224189400672913, 0.1817510724067688, 1.0], [0.18522866070270538, 0.24419759213924408, 0.0], [0.16617359220981598, -0.11583591252565384, 0.0], [-0.14833901822566986, -0.1881507784128189, 0.0], [-0.16829940676689148, 0.16618239879608154, 0.0], [0.19075192511081696, 1.2256381511688232, 1.0], [0.0009029907523654401, 2.4193711280822754, 0.0], [0.34478679299354553, -3.722090005874634, 1.0], [2.3181357383728027, 1.6034773588180542, 1.0], [-0.003858811454847455, 2.3190057277679443, 0.0], [0.009968928061425686, -1.9566792249679565, 1.0], [-0.3201812207698822, -0.3518594801425934, 0.0], [-0.31633901596069336, -0.1796358823776245, 0.0], [-0.5014764070510864, 0.0026660955045372248, 0.0], [-0.34864646196365356, 0.1805068403482437, 0.0], [-0.35112378001213074, 0.3585212528705597, 0.0], [-0.1698107123374939, 0.5341127514839172, 0.0], [0.007583322934806347, 0.3471957743167877, 0.0], [0.18958526849746704, 0.5239640474319458, 0.0], [0.33004939556121826, 0.3547387719154358, 0.0], [0.33097782731056213, 0.17957322299480438, 0.0], [0.32083770632743835, -0.0032122679986059666, 0.0], [0.3152009844779968, -0.16700240969657898, 0.0], [0.31906160712242126, -0.3115454316139221, 0.0], [0.16119323670864105, -3.347670078277588, 1.0], [0.5775853991508484, 1.4273146390914917, 1.0], [0.000205901320441626, 2.4027204513549805, 0.0], [0.01680724136531353, -1.5364537239074707, 1.0], [0.47637036442756653, -0.4649721384048462, 0.0], [0.3293367922306061, -0.2326200306415558, 0.0], [0.46799492835998535, -0.005143047776073217, 0.0], [0.31978532671928406, 0.1541033834218979, 0.0], [0.14258524775505066, -1.4379557371139526, 0.0], [1.745173454284668, 1.1598780155181885, 1.0], [0.0052741896361112595, 2.4905922412872314, 0.0], [0.05343332886695862, -2.366950273513794, 1.0], [-0.2907578647136688, -0.362069308757782, 0.0], [-0.3051454722881317, -0.2065901756286621, 0.0], [0.3363799452781677, -0.001165436115115881, 0.0], [-0.38769155740737915, 0.11572722345590591, 0.0], [-0.240353062748909, 0.2884185016155243, 0.0], [-0.20365113019943237, 0.447031706571579, 0.0], [-0.04810092970728874, 0.36602339148521423, 0.0], [0.09121789783239365, 0.45595693588256836, 0.0], [0.2085980772972107, 0.41080644726753235, 0.0], [0.28523561358451843, 0.24387811124324799, 0.0], [0.2778988182544708, 0.06894411891698837, 0.0], [0.2802896499633789, -0.10514063388109207, 0.0], [0.2817736268043518, -0.2635687589645386, 0.0], [0.13604053854942322, -3.4087984561920166, 0.0], [0.5535903573036194, 0.12513962388038635, 1.0], [-0.006143996492028236, 3.5754458904266357, 0.0], [0.12145578861236572, -3.4695301055908203, 1.0], [0.5440933108329773, 0.15429286658763885, 1.0], [-0.00013533252058550715, 3.338853597640991, 0.0], [0.14428575336933136, 0.6166905164718628, 1.0], [0.4028679132461548, 0.1489866077899933, 0.0], [0.30694007873535156, -0.05440137907862663, 0.0], [-1.2513717412948608, -2.4817771911621094, 1.0], [1.0979180335998535, -0.0012395940721035004, 0.0], [0.3280567526817322, -1.4257032871246338, 1.0], [0.5615899562835693, 0.18472284078598022, 1.0], [0.17659825086593628, 0.2538178861141205, 0.0], [0.1646028310060501, -0.1204124242067337, 0.0], [-0.1366436928510666, -0.19301772117614746, 0.0], [-0.16418348252773285, 0.17581875622272491, 0.0], [0.19579747319221497, 1.2691524028778076, 1.0], [0.0019043580396100879, 2.4942760467529297, 0.0], [0.34110116958618164, -3.856983184814453, 1.0], [2.3187334537506104, 1.694360375404358, 1.0], [-0.0045202746987342834, 2.3372550010681152, 0.0], [0.0053876843303442, -1.981579303741455, 1.0], [-0.31474125385284424, -0.36364123225212097, 0.0], [-0.31686481833457947, -0.18305446207523346, 0.0], [-0.4971974790096283, 0.005554002244025469, 0.0], [-0.3421839773654938, 0.18226349353790283, 0.0], [-0.33965325355529785, 0.35896405577659607, 0.0], [-0.18202240765094757, 0.5377058982849121, 0.0], [-0.00174998608417809, 0.3537861704826355, 0.0], [0.17285653948783875, 0.5278282761573792, 0.0], [0.3292129635810852, 0.36173731088638306, 0.0], [0.32630839943885803, 0.185458704829216, 0.0], [0.31630098819732666, 0.0013900739140808582, 0.0], [0.3181387186050415, -0.162419393658638, 0.0], [0.3198418915271759, -0.31011638045310974, 0.0], [0.15938769280910492, -3.395467758178711, 1.0], [0.5571255087852478, 1.4495558738708496, 1.0], [0.0005265529034659266, 2.4239354133605957, 0.0], [0.017436766996979713, -1.5843000411987305, 1.0], [0.47460994124412537, -0.47878360748291016, 0.0], [0.3329065144062042, -0.2400367707014084, 0.0], [0.470008909702301, -0.005055923014879227, 0.0], [0.31280872225761414, 0.16096143424510956, 0.0], [0.14422063529491425, -1.4518778324127197, 0.0], [1.782718539237976, 1.1547502279281616, 1.0], [0.005135739222168922, 2.5331079959869385, 0.0], [0.052825797349214554, -2.3861212730407715, 1.0], [-0.2978491485118866, -0.36609184741973877, 0.0], [-0.2874564230442047, -0.17856194078922272, 0.0], [0.3331053853034973, -0.0004531809245236218, 0.0], [-0.3817710876464844, 0.12286137044429779, 0.0], [-0.24458366632461548, 0.2887289524078369, 0.0], [-0.21094442903995514, 0.45493242144584656, 0.0], [-0.05387953668832779, 0.363042950630188, 0.0], [0.08161783218383789, 0.4595543146133423, 0.0], [0.20487266778945923, 0.41193270683288574, 0.0], [0.2864854037761688, 0.2489713728427887, 0.0], [0.2897988259792328, 0.0724596232175827, 0.0], [0.2809448838233948, -0.10728403180837631, 0.0], [0.28549137711524963, -0.2639434337615967, 0.0], [0.1367785632610321, -3.4288055896759033, 1.0], [0.5207284092903137, 1.4540067911148071, 1.0], [-0.000316123099764809, 2.391249179840088, 0.0], [0.01967691071331501, -1.533078908920288, 1.0], [0.45205751061439514, -0.4659992456436157, 0.0], [0.31597745418548584, -0.23874296247959137, 0.0], [0.44746384024620056, -0.0070769595913589, 0.0], [0.30895528197288513, 0.1590595245361328, 0.0], [0.13640820980072021, -1.480876088142395, 1.0], [2.0433599948883057, 1.4388275146484375, 1.0], [0.0012969756498932838, 2.282518148422241, 0.0], [0.018194548785686493, -2.0052490234375, 1.0], [-0.29273131489753723, -0.34734851121902466, 0.0], [-0.29362696409225464, -0.1725708693265915, 0.0], [-0.47491326928138733, -0.0011220662854611874, 0.0], [-0.3425009548664093, 0.1670931577682495, 0.0], [-0.3288954496383667, 0.34302058815956116, 0.0], [-0.18295657634735107, 0.5128759741783142, 0.0], [0.0016603494295850396, 0.333938330411911, 0.0], [0.17524859309196472, 0.5066365599632263, 0.0], [0.3193146884441376, 0.34151795506477356, 0.0], [0.319572776556015, 0.17298901081085205, 0.0], [0.30961427092552185, -0.012225366197526455, 0.0], [0.3103131651878357, -0.17420212924480438, 0.0], [0.3123548924922943, -0.3178984224796295, 0.0], [0.15994824469089508, -3.3179776668548584, 1.0], [0.5440418720245361, 1.4215052127838135, 1.0], [-0.00039609032683074474, 2.3971974849700928, 0.0], [0.019069623202085495, -1.5290621519088745, 1.0], [0.46501976251602173, -0.46090632677078247, 0.0], [0.3236537277698517, -0.22979497909545898, 0.0], [0.46191760897636414, -0.005284608341753483, 0.0], [0.3105596601963043, 0.156217560172081, 0.0], [0.1422656625509262, -1.4405765533447266, 1.0], [2.18196439743042, 1.4405969381332397, 1.0], [0.000679246848449111, 2.2858996391296387, 0.0], [0.01843016780912876, -1.9863677024841309, 1.0], [-0.3019436299800873, -0.34464704990386963, 0.0], [-0.30039533972740173, -0.17242279648780823, 0.0], [-0.48816877603530884, -0.001310835126787424, 0.0], [-0.34332752227783203, 0.16250696778297424, 0.0], [-0.3337746560573578, 0.3337307572364807, 0.0], [-0.18003590404987335, 0.5091030597686768, 0.0], [0.0030715977773070335, 0.333286851644516, 0.0], [0.17538969218730927, 0.4987010955810547, 0.0], [0.3219556212425232, 0.3398985266685486, 0.0], [0.3240562081336975, 0.17706142365932465, 0.0], [0.31825143098831177, -0.0006815767847001553, 0.0], [0.3145187497138977, -0.16070953011512756, 0.0], [0.3171694576740265, -0.3026048243045807, 0.0], [0.16217942535877228, -3.2943859100341797, 1.0], [0.5821977257728577, 1.4078549146652222, 1.0], [-0.0006983594503253698, 2.3444437980651855, 0.0], [0.01994037814438343, -1.517791509628296, 1.0], [0.46894747018814087, -0.45821768045425415, 0.0], [0.32571184635162354, -0.22959193587303162, 0.0], [0.4695499539375305, -0.005207074340432882, 0.0], [0.31704267859458923, 0.1598733812570572, 0.0], [0.14223414659500122, -1.415636658668518, 0.0], [1.7739648818969727, 1.0813127756118774, 1.0], [0.005383813288062811, 2.532684803009033, 0.0], [0.05457742139697075, -2.331887722015381, 1.0], [-0.29100945591926575, -0.3571949303150177, 0.0], [-0.28968825936317444, -0.17846240103244781, 0.0], [0.335605263710022, -0.0016464615473523736, 0.0], [-0.38192853331565857, 0.11961320042610168, 0.0], [-0.24608734250068665, 0.2811085879802704, 0.0], [-0.20155027508735657, 0.4417420029640198, 0.0], [-0.05076293274760246, 0.3580484092235565, 0.0], [0.08456746488809586, 0.44977235794067383, 0.0], [0.20867247879505157, 0.4018366038799286, 0.0], [0.28486934304237366, 0.24025680124759674, 0.0], [0.27950310707092285, 0.07130493223667145, 0.0], [0.27662837505340576, -0.10584685206413269, 0.0], [0.28049030900001526, -0.2606799900531769, 0.0], [0.13719181716442108, -3.3798646926879883, 1.0], [0.49504050612449646, 1.4340828657150269, 1.0], [-0.00028392847161740065, 2.350140333175659, 0.0], [0.01941988617181778, -1.5428342819213867, 1.0], [0.4491099417209625, -0.4679560959339142, 0.0], [0.30651357769966125, -0.22888237237930298, 0.0], [0.4418579638004303, -0.007525936234742403, 0.0], [0.2983245849609375, 0.16007199883460999, 0.0], [0.13584809005260468, -1.435855507850647, 0.0], [1.6871814727783203, 1.1350829601287842, 1.0], [0.0062515391036868095, 2.5258889198303223, 0.0], [0.04896092414855957, -2.3437283039093018, 1.0], [-0.2883596122264862, -0.3603053092956543, 0.0], [-0.3003126084804535, -0.2043316662311554, 0.0], [0.3246006965637207, -0.004659787751734257, 0.0], [-0.3734092712402344, 0.11951356381177902, 0.0], [-0.24121668934822083, 0.2842309772968292, 0.0], [-0.19841136038303375, 0.4424378275871277, 0.0], [-0.041542693972587585, 0.36571311950683594, 0.0], [0.09175019711256027, 0.4514572024345398, 0.0], [0.20731303095817566, 0.41343072056770325, 0.0], [0.27962565422058105, 0.2442968338727951, 0.0], [0.2828335762023926, 0.07050155848264694, 0.0], [0.27963224053382874, -0.11026081442832947, 0.0]], [[2.406191825866699, 1.7154110670089722, 1.0], [-0.2362009584903717, -0.3343329429626465, 0.0], [-0.4321744441986084, -0.16188645362854004, 0.0], [-0.49926525354385376, 0.0014820046490058303, 0.0], [-0.4904141128063202, 0.17673757672309875, 0.0], [-0.22217373549938202, 0.3455018699169159, 0.0], [0.09717224538326263, 0.33663663268089294, 0.0], [0.16566860675811768, 0.39861294627189636, 0.0], [0.7961686849594116, 0.16133259236812592, 0.0], [0.32307493686676025, 0.15737490355968475, 0.0], [0.30440518260002136, 0.030395185574889183, 0.0], [0.10743585228919983, 0.2546410858631134, 0.0], [-0.036763716489076614, 0.18275825679302216, 0.0], [-0.5241988897323608, 0.09164135903120041, 0.0], [-0.5361359715461731, -0.008594962768256664, 0.0], [-0.5351362824440002, -0.1380866914987564, 0.0], [-0.1927468627691269, -0.31607502698898315, 0.0], [2.0452704429626465, -2.999582052230835, 1.0], [2.0827152729034424, 1.5290800333023071, 1.0], [-0.004739734344184399, 2.2029154300689697, 0.0], [0.0043608518317341805, -1.8762134313583374, 1.0], [-0.2984384596347809, -0.3394435942173004, 0.0], [-0.3044078052043915, -0.16953635215759277, 0.0], [-0.4777542054653168, 0.00423123873770237, 0.0], [-0.33522650599479675, 0.17963770031929016, 0.0], [-0.3323896825313568, 0.34546083211898804, 0.0], [-0.17685508728027344, 0.5168943405151367, 0.0], [0.012220275588333607, 0.33091115951538086, 0.0], [0.19250409305095673, 0.5028350949287415, 0.0], [0.3207433819770813, 0.3358359634876251, 0.0], [0.3222968876361847, 0.16367726027965546, 0.0], [0.49933651089668274, -0.005078810732811689, 0.0], [0.31830668449401855, -0.17990338802337646, 0.0], [0.325764000415802, -0.34774020314216614, 0.0], [0.16803942620754242, -3.2435522079467773, 1.0], [0.5798390507698059, 1.4051772356033325, 1.0], [8.048176823649555e-05, 2.395780324935913, 0.0], [0.01439094077795744, -1.538225769996643, 1.0], [0.4831137955188751, -0.46788209676742554, 0.0], [0.33104613423347473, -0.22629140317440033, 0.0], [0.4687539339065552, -0.005521827377378941, 0.0], [0.31329789757728577, 0.1574825942516327, 0.0], [0.1433044672012329, -1.4143866300582886, 0.0], [1.8307396173477173, 1.114731788635254, 1.0], [0.005314292851835489, 2.497799873352051, 0.0], [0.05129329115152359, -2.2832584381103516, 1.0], [-0.2972117066383362, -0.35472461581230164, 0.0], [-0.2904241979122162, -0.17653010785579681, 0.0], [-0.45406830310821533, -0.019609179347753525, 0.0], [-0.35597243905067444, 0.14305013418197632, 0.0], [-0.31824541091918945, 0.32236337661743164, 0.0], [-0.18484538793563843, 0.49902912974357605, 0.0], [0.001690599019639194, 0.336834579706192, 0.0], [0.17210786044597626, 0.493592232465744, 0.0], [0.3133350908756256, 0.33363115787506104, 0.0], [0.31652677059173584, 0.17451155185699463, 0.0], [0.3126135468482971, -0.0029531402979046106, 0.0], [0.31131529808044434, -0.16676585376262665, 0.0], [0.3088320791721344, -0.3075995147228241, 0.0], [0.15862733125686646, -3.261051654815674, 1.0], [0.5696980357170105, 1.4014086723327637, 1.0], [-0.001421019434928894, 2.4743359088897705, 0.0], [0.012729084119200706, -1.5627135038375854, 1.0], [0.4714956283569336, -0.4737110733985901, 0.0], [0.31957924365997314, -0.2404976487159729, 0.0], [0.46369048953056335, -0.00614933343604207, 0.0], [0.31062036752700806, 0.15691006183624268, 0.0], [0.14122731983661652, -1.4349709749221802, 0.0], [1.7423683404922485, 1.0799503326416016, 1.0], [0.0053596170619130135, 2.554290533065796, 0.0], [0.0537760928273201, -2.3323614597320557, 1.0], [-0.2929737865924835, -0.36045441031455994, 0.0], [-0.3072938621044159, -0.20479868352413177, 0.0], [0.3287171721458435, -0.00048570410581305623, 0.0], [-0.3761357069015503, 0.11876580864191055, 0.0], [-0.2413480430841446, 0.2850399613380432, 0.0], [-0.19951027631759644, 0.44904911518096924, 0.0], [-0.04798178747296333, 0.36276307702064514, 0.0], [0.0914187952876091, 0.4590495228767395, 0.0], [0.2117542326450348, 0.40822160243988037, 0.0], [0.28619667887687683, 0.2414170503616333, 0.0], [0.28542718291282654, 0.06631699949502945, 0.0], [0.285275936126709, -0.11004628986120224, 0.0], [0.2843172550201416, -0.26810190081596375, 0.0], [0.13709215819835663, -3.3969199657440186, 1.0], [0.4922187328338623, 1.4409267902374268, 1.0], [-0.0005853681359440088, 2.3555734157562256, 0.0], [0.02135288156569004, -1.5577138662338257, 1.0], [0.4446461498737335, -0.47820740938186646, 0.0], [0.30711016058921814, -0.23666979372501373, 0.0], [0.4436696171760559, -0.008369863964617252, 0.0], [0.30213120579719543, 0.159629687666893, 0.0], [0.1579878032207489, 0.5249388217926025, 0.0], [6.803925498388708e-05, 1.7890121936798096, 0.0], [0.16263939440250397, -3.7885398864746094, 1.0], [2.215991258621216, 1.5621777772903442, 1.0], [-0.0003415292303543538, 2.4388322830200195, 0.0], [0.0017383926315233111, -1.9586464166641235, 1.0], [-0.30099940299987793, -0.36455196142196655, 0.0], [-0.30733489990234375, -0.1804259866476059, 0.0], [-0.48315322399139404, 0.006011780817061663, 0.0], [-0.3321187496185303, 0.1891685128211975, 0.0], [-0.33347755670547485, 0.36427727341651917, 0.0], [-0.17202802002429962, 0.5367568731307983, 0.0], [0.011915750801563263, 0.3527680039405823, 0.0], [0.1823403537273407, 0.5265215039253235, 0.0], [0.31787899136543274, 0.3532877266407013, 0.0], [0.31617626547813416, 0.1771281510591507, 0.0], [0.4873645305633545, -0.003568112151697278, 0.0], [0.3214661478996277, -0.18528157472610474, 0.0], [0.3170681297779083, -0.35747259855270386, 0.0], [0.16529041528701782, -3.3826849460601807, 1.0], [0.5819947719573975, 1.4595987796783447, 1.0], [-0.000419038551626727, 2.4657533168792725, 0.0], [0.016036493703722954, -1.563636064529419, 1.0], [0.4812736511230469, -0.47676196694374084, 0.0], [0.3316355347633362, -0.24761879444122314, 0.0], [0.46846383810043335, -0.004260067827999592, 0.0], [0.3120357394218445, 0.1575048863887787, 0.0], [0.14507970213890076, -1.4718754291534424, 1.0], [2.1936018466949463, 1.4553929567337036, 1.0], [0.00037480948958545923, 2.2849643230438232, 0.0], [0.016781944781541824, -1.9673115015029907, 1.0], [-0.3037917912006378, -0.3500250279903412, 0.0], [-0.3055258095264435, -0.17400509119033813, 0.0], [-0.4926510155200958, -0.00035809489781968296, 0.0], [-0.3513753414154053, 0.16837988793849945, 0.0], [-0.3361228406429291, 0.33991652727127075, 0.0], [-0.18240228295326233, 0.5133538246154785, 0.0], [-1.014723238768056e-05, 0.3378972113132477, 0.0], [0.17296072840690613, 0.5074613690376282, 0.0], [0.3262236416339874, 0.3445323705673218, 0.0], [0.32285240292549133, 0.1845702975988388, 0.0], [0.31625860929489136, 0.004541520494967699, 0.0], [0.3150917887687683, -0.15463989973068237, 0.0], [0.31704550981521606, -0.30107980966567993, 0.0], [0.1600787341594696, -3.314624786376953, 1.0], [0.5564559102058411, 1.416046142578125, 1.0], [0.0005631251842714846, 2.4624524116516113, 0.0], [0.020366130396723747, -1.5217009782791138, 1.0], [0.4743226170539856, -0.4618912637233734, 0.0], [0.3289012908935547, -0.23937590420246124, 0.0], [0.46249768137931824, -0.004704720806330442, 0.0], [0.3105877637863159, 0.15507277846336365, 0.0], [0.14034610986709595, -1.4611117839813232, 0.0], [1.807563304901123, 1.1614699363708496, 1.0], [0.0053472137078642845, 2.552225112915039, 0.0], [0.05139964073896408, -2.3465065956115723, 1.0], [-0.2956661880016327, -0.3627376854419708, 0.0], [-0.2919194996356964, -0.1795760542154312, 0.0], [0.34512031078338623, -0.0003298765514045954, 0.0], [-0.38365811109542847, 0.1227823942899704, 0.0], [-0.2448289394378662, 0.28608599305152893, 0.0], [-0.20120379328727722, 0.4440007209777832, 0.0], [-0.05088082700967789, 0.36457177996635437, 0.0], [0.07893668115139008, 0.45141294598579407, 0.0], [0.19865915179252625, 0.4099118113517761, 0.0], [0.2848043441772461, 0.25436317920684814, 0.0], [0.28648340702056885, 0.0823417603969574, 0.0], [0.2797134220600128, -0.09853574633598328, 0.0], [0.2815586030483246, -0.25939851999282837, 0.0], [0.13424625992774963, -3.433242082595825, 1.0], [0.5809004902839661, 0.16908036172389984, 1.0], [-0.002467980608344078, 3.566570997238159, 0.0], [0.14474603533744812, 0.6083963513374329, 1.0], [0.38690993189811707, 0.1406533271074295, 0.0], [0.28949829936027527, -0.07471439242362976, 0.0], [-1.2110902070999146, -2.547827959060669, 1.0], [1.0576425790786743, -0.001230590045452118, 0.0], [0.31859269738197327, -1.4227195978164673, 1.0], [0.6110630631446838, 0.18365898728370667, 1.0], [0.1808893233537674, 0.24861478805541992, 0.0], [0.16813866794109344, -0.12362974882125854, 0.0], [-0.13589759171009064, -0.19595462083816528, 0.0], [-0.16410045325756073, 0.17364780604839325, 0.0], [0.2004959136247635, 1.2792340517044067, 1.0], [0.0022821708116680384, 2.5003485679626465, 0.0], [0.3383045196533203, -3.8623671531677246, 1.0], [0.6834914088249207, 1.4496415853500366, 1.0], [-0.003312883200123906, 2.5288336277008057, 0.0], [0.017769046127796173, -1.7002720832824707, 1.0], [0.5044352412223816, -0.5150514245033264, 0.0], [0.3508274257183075, -0.2353491634130478, 0.0], [0.5000002384185791, -0.004495831672102213, 0.0], [0.3309968113899231, 0.1745321899652481, 0.0], [0.16187354922294617, 0.5362641215324402, 0.0], [-0.00020129278709646314, 1.8298027515411377, 0.0], [0.1741965115070343, -3.9209983348846436, 1.0], [2.324493408203125, 1.5763134956359863, 1.0], [-0.0013428375823423266, 2.515627384185791, 0.0], [-0.0024136051069945097, -1.9936844110488892, 1.0], [-0.30626508593559265, -0.3710843026638031, 0.0], [-0.315441370010376, -0.18181787431240082, 0.0], [-0.4980461299419403, 0.004295947961509228, 0.0], [-0.3381078541278839, 0.18976521492004395, 0.0], [-0.33779019117355347, 0.3677525222301483, 0.0], [-0.16983063519001007, 0.5451332926750183, 0.0], [0.008043450303375721, 0.3537604510784149, 0.0], [0.18321119248867035, 0.5329955816268921, 0.0], [0.3219371736049652, 0.36131012439727783, 0.0], [0.323024183511734, 0.18337373435497284, 0.0], [0.3244074583053589, -0.005731380078941584, 0.0], [0.31438833475112915, -0.16940344870090485, 0.0], [0.3128777742385864, -0.3211241066455841, 0.0], [0.15976905822753906, -3.4272477626800537, 1.0], [0.5716180205345154, 1.4587777853012085, 1.0], [-0.0012547948863357306, 2.46277117729187, 0.0], [0.016720814630389214, -1.5938761234283447, 1.0], [0.4772046208381653, -0.48361995816230774, 0.0], [0.33288124203681946, -0.2431400716304779, 0.0], [0.4626910388469696, -0.0035933665931224823, 0.0], [0.31335926055908203, 0.1630265861749649, 0.0], [0.14210182428359985, -1.4741113185882568, 0.0], [1.822257161140442, 1.1686533689498901, 1.0], [0.005432100500911474, 2.57354998588562, 0.0], [0.044128552079200745, -2.3624298572540283, 1.0], [-0.30084556341171265, -0.370099276304245, 0.0], [-0.2924557626247406, -0.1794089823961258, 0.0], [-0.45561835169792175, -0.01619313284754753, 0.0], [-0.35712864995002747, 0.1462007761001587, 0.0], [-0.31612130999565125, 0.331088662147522, 0.0], [-0.18809208273887634, 0.51114422082901, 0.0], [-0.004879990592598915, 0.3478129208087921, 0.0], [0.16357463598251343, 0.5103949308395386, 0.0], [0.3100603222846985, 0.3449733257293701, 0.0], [0.323768675327301, 0.17924436926841736, 0.0], [0.3092842400074005, -0.006409262306988239, 0.0], [0.30905863642692566, -0.16820445656776428, 0.0], [0.3049992620944977, -0.30926719307899475, 0.0], [0.15582935512065887, -3.344666004180908, 1.0], [0.5590423941612244, 1.4436964988708496, 1.0], [0.0002956382231786847, 2.4054784774780273, 0.0], [0.020020755007863045, -1.542046070098877, 1.0], [0.4686231017112732, -0.46942225098609924, 0.0]], [[2.468122959136963, 1.6959242820739746, 1.0], [-0.24801921844482422, -0.33385640382766724, 0.0], [-0.4624694287776947, -0.16118121147155762, 0.0], [-0.514313817024231, 0.004702928476035595, 0.0], [-0.29125407338142395, 0.18410734832286835, 0.0], [-0.2307077944278717, 0.34445181488990784, 0.0], [0.07285786420106888, 0.3527933955192566, 0.0], [0.14209836721420288, 0.3895072340965271, 0.0], [0.20841911435127258, 0.42034459114074707, 0.0], [0.275154709815979, 0.38538607954978943, 0.0], [0.3073671758174896, 0.20690803229808807, 0.0], [0.30932044982910156, 0.03206339851021767, 0.0], [0.29884520173072815, -0.1332182139158249, 0.0], [0.30338865518569946, -0.2762107849121094, 0.0], [0.14997923374176025, -3.35155987739563, 1.0], [0.504835844039917, 1.4086532592773438, 1.0], [-0.0003206028195563704, 2.4085707664489746, 0.0], [0.01624450273811817, -1.5621968507766724, 1.0], [0.4576440453529358, -0.4774865508079529, 0.0], [0.3129523992538452, -0.23421835899353027, 0.0], [0.4498645067214966, -0.006984487175941467, 0.0], [0.30691835284233093, 0.16088581085205078, 0.0], [0.1400926560163498, -1.438035488128662, 0.0], [1.7289201021194458, 1.1222432851791382, 1.0], [0.004708744585514069, 2.5323286056518555, 0.0], [0.05027357116341591, -2.358262062072754, 1.0], [-0.2923378348350525, -0.35685309767723083, 0.0], [-0.3056028187274933, -0.20488038659095764, 0.0], [0.3301700949668884, -0.0034502302296459675, 0.0], [-0.3780193626880646, 0.11940568685531616, 0.0], [-0.2442132532596588, 0.2854576110839844, 0.0], [-0.19722063839435577, 0.4462076425552368, 0.0], [-0.041758157312870026, 0.36397823691368103, 0.0], [0.0859346017241478, 0.4481912851333618, 0.0], [0.20670238137245178, 0.41163378953933716, 0.0], [0.2843759059906006, 0.24746111035346985, 0.0], [0.28574302792549133, 0.0686846524477005, 0.0], [0.286933571100235, -0.11156172305345535, 0.0], [0.2826522886753082, -0.26599809527397156, 0.0], [0.136966735124588, -3.3942997455596924, 1.0], [0.5912337899208069, 0.16878050565719604, 1.0], [-0.0026580626145005226, 3.550412178039551, 0.0], [0.14339579641819, 0.6021556258201599, 1.0], [0.39179590344429016, 0.135779470205307, 0.0], [0.2828582525253296, -0.07706768810749054, 0.0], [-1.2058770656585693, -2.521627187728882, 1.0], [1.0660886764526367, -0.0032606401946395636, 0.0], [0.31912949681282043, -1.42200767993927, 1.0], [0.6008327603340149, 0.1837812215089798, 1.0], [0.17961335182189941, 0.2468896359205246, 0.0], [0.16566325724124908, -0.12143781781196594, 0.0], [-0.13803735375404358, -0.19804635643959045, 0.0], [-0.16689638793468475, 0.17298071086406708, 0.0], [0.2008167803287506, 1.277500033378601, 1.0], [0.001905771205201745, 2.506108522415161, 0.0], [0.33897578716278076, -3.8347291946411133, 1.0], [0.6729745268821716, 1.4367197751998901, 1.0], [-0.002882034983485937, 2.4542083740234375, 0.0], [0.019427141174674034, -1.6585094928741455, 1.0], [0.5079751014709473, -0.5010209679603577, 0.0], [0.3464365303516388, -0.2280673235654831, 0.0], [0.4922049343585968, -0.0018531234236434102, 0.0], [0.3357713520526886, 0.17502349615097046, 0.0], [0.16751888394355774, 0.5340985059738159, 0.0], [-0.000836241350043565, 1.7930808067321777, 0.0], [0.1747206449508667, -3.8867011070251465, 1.0], [2.3366339206695557, 1.5428409576416016, 1.0], [-0.002848837524652481, 2.5468878746032715, 0.0], [0.00013171874161344022, -1.9469785690307617, 1.0], [-0.30102863907814026, -0.36425885558128357, 0.0], [-0.3101866841316223, -0.18370473384857178, 0.0], [-0.4958687424659729, 0.003549899673089385, 0.0], [-0.32381555438041687, 0.18911126255989075, 0.0], [-0.3376319110393524, 0.3658909499645233, 0.0], [-0.16763536632061005, 0.5428681373596191, 0.0], [0.012095501646399498, 0.3510865867137909, 0.0], [0.17943674325942993, 0.5343752503395081, 0.0], [0.3223532736301422, 0.36098310351371765, 0.0], [0.3188253939151764, 0.18743625283241272, 0.0], [0.49185866117477417, -0.003188525326550007, 0.0], [0.3185977041721344, -0.1771809309720993, 0.0], [0.3231615722179413, -0.3509639501571655, 0.0], [0.16588598489761353, -3.3910365104675293, 1.0], [0.6085209846496582, 1.4642168283462524, 1.0], [-0.001618221285752952, 2.456468343734741, 0.0], [0.016755683347582817, -1.5896711349487305, 1.0], [0.48285242915153503, -0.48000019788742065, 0.0], [0.3334827423095703, -0.24207228422164917, 0.0], [0.47382935881614685, -0.004539488349109888, 0.0], [0.3194510340690613, 0.16125819087028503, 0.0], [0.14371101558208466, -1.469645619392395, 0.0], [1.7645609378814697, 1.1607102155685425, 1.0], [0.004867293871939182, 2.5821337699890137, 0.0], [0.048297613859176636, -2.395789861679077, 1.0], [-0.29495948553085327, -0.3680129647254944, 0.0], [-0.28984203934669495, -0.1806824803352356, 0.0], [0.33990195393562317, -0.0018132691038772464, 0.0], [-0.37962639331817627, 0.12218187004327774, 0.0], [-0.2489689737558365, 0.2899026572704315, 0.0], [-0.19846904277801514, 0.4484519064426422, 0.0], [-0.05133145675063133, 0.3723594546318054, 0.0], [0.08084305375814438, 0.459463894367218, 0.0], [0.1989164501428604, 0.41984716057777405, 0.0], [0.286639004945755, 0.2586817741394043, 0.0], [0.29067349433898926, 0.07903365045785904, 0.0], [0.28111931681632996, -0.10341184586286545, 0.0], [0.28737062215805054, -0.2660466134548187, 0.0], [0.13552404940128326, -3.479332685470581, 1.0], [0.4976561665534973, 1.4691123962402344, 1.0], [-0.002543330891057849, 2.3667683601379395, 0.0], [0.01986941695213318, -1.568455696105957, 1.0], [0.45108431577682495, -0.4764086902141571, 0.0], [0.3080499470233917, -0.2212240993976593, 0.0], [0.4457671046257019, -0.007710207719355822, 0.0], [0.3099137842655182, 0.16339585185050964, 0.0], [0.13647322356700897, -1.4818544387817383, 0.0], [1.681548833847046, 1.1586602926254272, 1.0], [0.0052555580623447895, 2.5597879886627197, 0.0], [0.04722785949707031, -2.3927669525146484, 1.0], [-0.28519997000694275, -0.3663649559020996, 0.0], [-0.28097814321517944, -0.17943330109119415, 0.0], [0.3239994943141937, -0.003832767717540264, 0.0], [-0.37812092900276184, 0.12058383971452713, 0.0], [-0.23826271295547485, 0.289974570274353, 0.0], [-0.19968387484550476, 0.44965124130249023, 0.0], [-0.04824777692556381, 0.3683796226978302, 0.0], [0.0819583535194397, 0.45622867345809937, 0.0], [0.19563975930213928, 0.4224078357219696, 0.0], [0.2817927300930023, 0.251382440328598, 0.0], [0.2853460907936096, 0.07601691037416458, 0.0], [0.2791942059993744, -0.10263905674219131, 0.0], [0.28480955958366394, -0.2631821632385254, 0.0], [0.13207770884037018, -3.462707042694092, 1.0], [0.499174028635025, 1.4605604410171509, 1.0], [-0.0005952908541075885, 2.5133771896362305, 0.0], [0.013899403624236584, -1.6344196796417236, 1.0], [0.45404788851737976, -0.4953427314758301, 0.0], [0.3134252429008484, -0.2470240443944931, 0.0], [0.4439115524291992, -0.007166138384491205, 0.0], [0.3001660406589508, 0.16430185735225677, 0.0], [0.13917125761508942, -1.4757310152053833, 0.0], [1.6746995449066162, 1.1182801723480225, 1.0], [0.0053238035179674625, 2.656647205352783, 0.0], [0.04737077280879021, -2.4430367946624756, 1.0], [-0.28991129994392395, -0.3743980824947357, 0.0], [-0.30210575461387634, -0.21156513690948486, 0.0], [0.3272586762905121, -0.004738456569612026, 0.0], [-0.3771430253982544, 0.1219291165471077, 0.0], [-0.23909732699394226, 0.2921254634857178, 0.0], [-0.20180478692054749, 0.45544445514678955, 0.0], [-0.04919273778796196, 0.37422600388526917, 0.0], [0.08094656467437744, 0.458830326795578, 0.0], [0.19981996715068817, 0.42376649379730225, 0.0], [0.2824341058731079, 0.2581532597541809, 0.0], [0.28432679176330566, 0.07810695469379425, 0.0], [0.28835010528564453, -0.10547170042991638, 0.0], [0.27788299322128296, -0.26602959632873535, 0.0], [0.2955623269081116, -0.3594435453414917, 1.0], [0.13795684278011322, -2.864426851272583, 1.0]], [[2.4513204097747803, 1.7029786109924316, 1.0], [-0.23511625826358795, -0.3345693349838257, 0.0], [-0.4463953971862793, -0.16057755053043365, 0.0], [-0.5066584944725037, 0.0021287337876856327, 0.0], [-0.4995391368865967, 0.176407128572464, 0.0], [-0.22941601276397705, 0.3448053002357483, 0.0], [0.0922236293554306, 0.3333340883255005, 0.0], [0.15456952154636383, 0.3968832194805145, 0.0], [0.7909358143806458, 0.15974555909633636, 0.0], [0.32241368293762207, 0.1609034687280655, 0.0], [0.30722689628601074, 0.033296577632427216, 0.0], [0.11632946133613586, 0.25974324345588684, 0.0], [-0.025887129828333855, 0.18169640004634857, 0.0], [-0.5183529257774353, 0.09059183299541473, 0.0], [-0.540507972240448, -0.008847980760037899, 0.0], [-0.5426009893417358, -0.13029642403125763, 0.0], [-0.2003987580537796, -0.3050960898399353, 0.0], [2.0693747997283936, -3.0318245887756348, 1.0], [0.6833913326263428, 0.16163696348667145, 1.0], [-0.004347450099885464, 3.293316125869751, 0.0], [0.14743077754974365, 0.5569046139717102, 1.0], [0.43553799390792847, 0.1296210139989853, 0.0], [0.321612149477005, -0.058777038007974625, 0.0], [-1.322274923324585, -2.3733808994293213, 1.0], [1.1727670431137085, -0.004849292803555727, 0.0], [0.34750106930732727, -1.3661671876907349, 1.0], [0.5866777896881104, 0.1784798800945282, 1.0], [0.1828121691942215, 0.24593228101730347, 0.0], [0.16895171999931335, -0.1167508214712143, 0.0], [-0.1441042125225067, -0.18835009634494781, 0.0], [-0.16871236264705658, 0.17126525938510895, 0.0], [0.20151887834072113, 1.2144594192504883, 1.0], [0.001876821625046432, 2.395948648452759, 0.0], [0.34659820795059204, -3.664222478866577, 1.0], [0.669292151927948, 1.3778507709503174, 1.0], [-0.002907963003963232, 2.3634440898895264, 0.0], [0.015162328258156776, -1.5838254690170288, 1.0], [0.503795325756073, -0.48249465227127075, 0.0], [0.3427128195762634, -0.21558217704296112, 0.0], [0.48927900195121765, -0.0029385790694504976, 0.0], [0.32409459352493286, 0.16850735247135162, 0.0], [0.16621389985084534, 0.5133350491523743, 0.0], [0.00025351985823363066, 1.737200379371643, 0.0], [0.17185334861278534, -3.7592482566833496, 1.0], [2.2896292209625244, 1.5036579370498657, 1.0], [-0.0039658984169363976, 2.473778009414673, 0.0], [-0.00013638389646075666, -1.9372187852859497, 1.0], [-0.3045845329761505, -0.3577846884727478, 0.0], [-0.3054852783679962, -0.17828933894634247, 0.0], [-0.4876077175140381, 0.003633196000009775, 0.0], [-0.33175328373908997, 0.18123967945575714, 0.0], [-0.3342550992965698, 0.35942700505256653, 0.0], [-0.17566661536693573, 0.5321018099784851, 0.0], [0.00727687356993556, 0.34866735339164734, 0.0], [0.1817498654127121, 0.5201632380485535, 0.0], [0.3239002525806427, 0.35091981291770935, 0.0], [0.3256087303161621, 0.1794435977935791, 0.0], [0.3180934488773346, -0.001895864144898951, 0.0], [0.31359803676605225, -0.16881142556667328, 0.0], [0.31334590911865234, -0.31807437539100647, 0.0], [0.16085617244243622, -3.336937189102173, 1.0], [0.566834032535553, 1.435890793800354, 1.0], [-0.0005055290530435741, 2.3968026638031006, 0.0], [0.019212741404771805, -1.5871869325637817, 1.0], [0.47576969861984253, -0.4784686267375946, 0.0], [0.3219887316226959, -0.22611552476882935, 0.0], [0.4673627018928528, -0.005259236786514521, 0.0], [0.3149621784687042, 0.16272154450416565, 0.0], [0.13942061364650726, -1.4275484085083008, 0.0], [1.7937637567520142, 1.1325050592422485, 1.0], [0.004723563324660063, 2.5149667263031006, 0.0], [0.05241589620709419, -2.349522113800049, 1.0], [-0.2965755760669708, -0.3621843755245209, 0.0], [-0.2899220883846283, -0.17914187908172607, 0.0], [0.3374512195587158, -0.0013967260019853711, 0.0], [-0.38319632411003113, 0.12156429886817932, 0.0], [-0.24263033270835876, 0.28807348012924194, 0.0], [-0.20212869346141815, 0.44520658254623413, 0.0], [-0.04883721470832825, 0.3656214475631714, 0.0], [0.08546005934476852, 0.454744815826416, 0.0], [0.2008078545331955, 0.40848109126091003, 0.0], [0.2836158275604248, 0.24747179448604584, 0.0], [0.2847493290901184, 0.07319431751966476, 0.0], [0.28090575337409973, -0.10225430130958557, 0.0], [0.2839738130569458, -0.25967642664909363, 0.0], [0.13631093502044678, -3.415544271469116, 1.0], [0.5654483437538147, 0.16805042326450348, 1.0], [-0.0036190743558108807, 3.5048868656158447, 0.0], [0.143198624253273, 0.593281090259552, 1.0], [0.3850802183151245, 0.13698415458202362, 0.0], [0.29120078682899475, -0.08031488955020905, 0.0], [-1.2141501903533936, -2.5222363471984863, 1.0], [1.0577689409255981, 0.00038270128425210714, 0.0], [0.3183409571647644, -1.42152738571167, 1.0], [0.555818498134613, 0.1863345056772232, 1.0], [0.17581123113632202, 0.2554949223995209, 0.0], [0.15801410377025604, -0.1790049970149994, 0.0], [-0.1363627016544342, -0.1995605230331421, 0.0], [-0.17007280886173248, 0.1630994975566864, 0.0], [0.19319909811019897, 1.2820764780044556, 1.0], [0.0029479984659701586, 2.516887903213501, 0.0], [0.34106776118278503, -3.8316993713378906, 1.0], [0.6609396934509277, 1.4425255060195923, 1.0], [-0.0038345346692949533, 2.448059558868408, 0.0], [0.0168612077832222, -1.6803832054138184, 1.0], [0.5130115747451782, -0.5097123980522156, 0.0], [0.34482210874557495, -0.22028911113739014, 0.0], [0.4840213656425476, -0.0022954242303967476, 0.0], [0.32721030712127686, 0.1754467636346817, 0.0], [0.1642148196697235, 0.5335878729820251, 0.0], [0.0003437362320255488, 1.8165346384048462, 0.0], [0.17387908697128296, -3.8942625522613525, 1.0], [2.327951669692993, 1.555482268333435, 1.0], [-0.002540067071095109, 2.509140968322754, 0.0], [0.0005400422378443182, -1.982844591140747, 1.0], [-0.3039885461330414, -0.36854708194732666, 0.0], [-0.3166242837905884, -0.18181733787059784, 0.0], [-0.49774429202079773, 0.003953859675675631, 0.0], [-0.3422796130180359, 0.19137442111968994, 0.0], [-0.34153231978416443, 0.3669354021549225, 0.0], [-0.1664389669895172, 0.5449935793876648, 0.0], [0.015836438164114952, 0.35640260577201843, 0.0], [0.1865939199924469, 0.5344559550285339, 0.0], [0.3234713077545166, 0.36158666014671326, 0.0], [0.3254709243774414, 0.18544048070907593, 0.0], [0.4932940602302551, -0.0019159851362928748, 0.0], [0.3272828459739685, -0.17784035205841064, 0.0], [0.32311710715293884, -0.34984809160232544, 0.0], [0.16640079021453857, -3.402618408203125, 1.0], [0.5740259289741516, 1.4645195007324219, 1.0], [-0.0006682242965325713, 2.406524896621704, 0.0], [0.019107092171907425, -1.5598913431167603, 1.0], [0.493103951215744, -0.4697832763195038, 0.0], [0.33546292781829834, -0.2382156401872635, 0.0], [0.4709946811199188, -0.00373850017786026, 0.0], [0.3163217306137085, 0.1577521711587906, 0.0], [0.14433081448078156, -1.483097791671753, 0.0], [1.8358970880508423, 1.1939246654510498, 1.0], [0.005322975572198629, 2.54465913772583, 0.0], [0.045417170971632004, -2.330447196960449, 1.0], [-0.29414501786231995, -0.36465346813201904, 0.0], [-0.2910766899585724, -0.18158185482025146, 0.0], [-0.45459654927253723, -0.01683947630226612, 0.0], [-0.35908204317092896, 0.14973872900009155, 0.0], [-0.3200784921646118, 0.32920780777931213, 0.0], [-0.18183664977550507, 0.5084368586540222, 0.0], [0.0003299129311926663, 0.3458870053291321, 0.0], [0.16644148528575897, 0.5086774230003357, 0.0], [0.3141416907310486, 0.3404029607772827, 0.0], [0.3194069564342499, 0.17983947694301605, 0.0], [0.31418368220329285, -0.005343976430594921, 0.0], [0.30219048261642456, -0.16822850704193115, 0.0], [0.3099541962146759, -0.313795268535614, 0.0], [0.15807193517684937, -3.3255207538604736, 1.0], [0.639034628868103, 0.17131222784519196, 1.0], [-0.004252588376402855, 3.578234910964966, 0.0], [0.15417613089084625, 0.6076293587684631, 1.0], [0.4063073396682739, 0.1404646337032318, 0.0], [0.3043673634529114, -0.06774900108575821, 0.0], [-1.2653093338012695, -2.5524985790252686, 1.0], [1.101851463317871, -0.00272575207054615, 0.0], [0.330070436000824, -1.4498939514160156, 1.0], [0.6201658844947815, 0.18817317485809326, 1.0], [0.18712660670280457, 0.24379923939704895, 0.0], [0.1730186492204666, -0.11944813281297684, 0.0], [-0.14145046472549438, -0.19870634377002716, 0.0], [-0.16316945850849152, 0.17748194932937622, 0.0], [0.19791795313358307, 1.2679835557937622, 1.0], [0.002201699186116457, 2.516338586807251, 0.0], [0.33962735533714294, -3.874788522720337, 1.0], [0.7064958810806274, 1.4546377658843994, 1.0], [-0.0030406273435801268, 2.426865816116333, 0.0], [0.015726134181022644, -1.6908230781555176, 1.0], [0.5084550380706787, -0.5137321352958679, 0.0], [0.3468776345252991, -0.2252914011478424, 0.0], [0.4934896230697632, -0.0022954060696065426, 0.0], [0.32097265124320984, 0.18045897781848907, 0.0], [0.15764933824539185, 0.5341602563858032, 0.0], [1.8952659956994466e-05, 1.8188567161560059, 0.0], [0.17615337669849396, -3.9187612533569336, 1.0], [2.292340040206909, 1.6078132390975952, 1.0], [-0.0006156743038445711, 2.546626091003418, 0.0], [0.0011068545281887054, -2.0407092571258545, 1.0], [-0.3099161684513092, -0.3723846971988678, 0.0], [-0.314220666885376, -0.18371348083019257, 0.0], [-0.4955868721008301, 0.004755555186420679, 0.0], [-0.34301701188087463, 0.18922770023345947, 0.0], [-0.33798155188560486, 0.37169063091278076, 0.0], [-0.17102669179439545, 0.5500192642211914, 0.0], [0.009259135462343693, 0.3526188135147095, 0.0], [0.18275414407253265, 0.542240560054779, 0.0], [0.3227221965789795, 0.3649722635746002, 0.0], [0.3193049430847168, 0.1876707822084427, 0.0], [0.3208714425563812, -0.0030630361288785934, 0.0], [0.31434690952301025, -0.17261342704296112, 0.0], [0.31872984766960144, -0.3293516933917999, 0.0], [0.1585104912519455, -3.4363198280334473, 1.0], [0.5782135128974915, 1.4722355604171753, 1.0], [-0.0005076529923826456, 2.5724987983703613, 0.0], [0.013762416318058968, -1.6515017747879028, 1.0], [0.46973857283592224, -0.49917107820510864, 0.0], [0.33214208483695984, -0.25361168384552, 0.0], [0.4755547046661377, -0.004433399997651577, 0.0], [0.3133792281150818, 0.16588328778743744, 0.0], [0.14244867861270905, -1.4953038692474365, 0.0], [1.8004670143127441, 1.1750624179840088, 1.0], [0.00540998624637723, 2.5987207889556885, 0.0], [0.04994862154126167, -2.3950719833374023, 1.0], [-0.29426249861717224, -0.3708835542201996, 0.0], [-0.28972405195236206, -0.18278348445892334, 0.0], [0.34300971031188965, -0.002352992305532098, 0.0], [-0.38313645124435425, 0.12565089762210846, 0.0], [-0.24507449567317963, 0.29605793952941895, 0.0], [-0.20143504440784454, 0.45679059624671936, 0.0], [-0.0508141852915287, 0.3713776767253876, 0.0], [0.07999293506145477, 0.46476757526397705, 0.0], [0.20132729411125183, 0.42128437757492065, 0.0], [0.2884500026702881, 0.25726649165153503, 0.0], [0.285804808139801, 0.07403663545846939, 0.0], [0.2807954251766205, -0.11040056496858597, 0.0], [0.28185105323791504, -0.27022308111190796, 0.0], [0.29241564869880676, -0.35872727632522583, 1.0], [0.14204749464988708, -2.878941297531128, 1.0]], [[2.4760684967041016, 1.7821097373962402, 1.0], [-0.22515229880809784, -0.3400399386882782, 0.0], [-0.43554049730300903, -0.16730783879756927, 0.0], [-0.49506086111068726, 0.012354698963463306, 0.0], [-0.5077690482139587, 0.17761960625648499, 0.0], [-0.21963843703269958, 0.34460800886154175, 0.0], [0.11069963127374649, 0.3411686420440674, 0.0], [0.1695108860731125, 0.39584246277809143, 0.0], [0.794889509677887, 0.16228769719600677, 0.0], [0.320367693901062, 0.15242595970630646, 0.0], [0.211916983127594, 0.3207251727581024, 0.0], [0.07018277794122696, 0.158517986536026, 0.0], [-0.08441022783517838, 0.3170250654220581, 0.0], [-0.4959654211997986, 0.14522533118724823, 0.0], [-0.5046855211257935, -0.025603022426366806, 0.0], [-0.5075152516365051, -0.19768165051937103, 0.0], [2.0216050148010254, -3.4513301849365234, 0.0], [0.6991557478904724, 0.12693192064762115, 1.0], [-0.006402244791388512, 3.313554286956787, 0.0], [0.11889385432004929, -3.1405739784240723, 1.0], [0.56879061460495, 0.1471172422170639, 1.0], [0.0023534661158919334, 3.0625, 0.0], [0.12606669962406158, -3.116079092025757, 1.0], [1.8941609859466553, 1.295424222946167, 1.0], [0.000510973040945828, 2.2390804290771484, 0.0], [0.0374772772192955, -2.112259864807129, 1.0], [-0.29520902037620544, -0.3395124077796936, 0.0], [-0.29795360565185547, -0.18002291023731232, 0.0], [-0.4311397969722748, -0.010626174509525299, 0.0], [-0.3501548171043396, 0.1480344980955124, 0.0], [-0.311698317527771, 0.31912705302238464, 0.0], [-0.1926344484090805, 0.4809861481189728, 0.0], [-0.006924866698682308, 0.33014044165611267, 0.0], [0.164894238114357, 0.4809338450431824, 0.0], [0.3048549294471741, 0.3267197012901306, 0.0], [0.3148678243160248, 0.16948972642421722, 0.0], [0.30769410729408264, -0.006014092359691858, 0.0], [0.3040452301502228, -0.1606481373310089, 0.0], [0.3082923889160156, -0.29895955324172974, 0.0], [0.1584426611661911, -3.200028896331787, 1.0], [0.5306824445724487, 1.3792682886123657, 1.0], [0.00039888598257675767, 2.3707425594329834, 0.0], [0.013627292588353157, -1.5042752027511597, 1.0], [0.4612182378768921, -0.4601409435272217, 0.0], [0.32111841440200806, -0.2276047319173813, 0.0], [0.45951226353645325, -0.006626427173614502, 0.0], [0.31726646423339844, 0.15338076651096344, 0.0], [0.1407075673341751, -1.410403847694397, 1.0], [2.1451025009155273, 1.389958143234253, 1.0], [-0.0006122015183791518, 2.2157888412475586, 0.0], [0.02229396253824234, -1.9292587041854858, 1.0], [-0.2990379333496094, -0.33487725257873535, 0.0], [-0.301310271024704, -0.1688523292541504, 0.0], [-0.4826476275920868, -0.0019375855335965753, 0.0], [-0.3440931737422943, 0.1621665358543396, 0.0], [-0.3339036703109741, 0.3311491012573242, 0.0], [-0.1869349628686905, 0.4945749044418335, 0.0], [7.37939408281818e-05, 0.32691672444343567, 0.0], [0.17849212884902954, 0.4880131483078003, 0.0], [0.3224875032901764, 0.32936736941337585, 0.0], [0.32106050848960876, 0.16974757611751556, 0.0], [0.314495712518692, -0.0022607443388551474, 0.0], [0.3184521794319153, -0.15859639644622803, 0.0], [0.318133682012558, -0.30200573801994324, 0.0], [0.16245673596858978, -3.190253257751465, 1.0], [0.5514135956764221, 1.3715741634368896, 1.0], [0.0007387528312392533, 2.433600664138794, 0.0], [0.01388529408723116, -1.5565482378005981, 1.0], [0.47272998094558716, -0.47148770093917847, 0.0], [0.3281649351119995, -0.23492176830768585, 0.0], [0.46193748712539673, -0.006756600458174944, 0.0], [0.5315834283828735, -0.009871351532638073, 0.0], [0.16988539695739746, -1.3829851150512695, 1.0], [2.18841814994812, 1.4542169570922852, 1.0], [-0.004427599720656872, 2.2096188068389893, 0.0], [0.018420718610286713, -1.9480032920837402, 1.0], [-0.302807480096817, -0.34085893630981445, 0.0], [-0.3093445897102356, -0.16845671832561493, 0.0], [-0.4963667690753937, 0.00023564035654999316, 0.0], [-0.34723323583602905, 0.16407842934131622, 0.0], [-0.33356744050979614, 0.3322090804576874, 0.0], [-0.18543273210525513, 0.5041669607162476, 0.0], [-0.0042318738996982574, 0.32769912481307983, 0.0], [0.1732224076986313, 0.49243927001953125, 0.0], [0.3273635804653168, 0.3355702757835388, 0.0], [0.33234265446662903, 0.17440979182720184, 0.0], [0.32016244530677795, -2.3485341444029473e-05, 0.0], [0.3191320598125458, -0.15574347972869873, 0.0], [0.3185405433177948, -0.29526981711387634, 0.0], [0.1615949422121048, -3.2219841480255127, 1.0], [0.5592739582061768, 1.3843334913253784, 1.0], [-0.0008494449430145323, 2.265730142593384, 0.0], [0.019152993336319923, -1.446667194366455, 1.0], [0.4822309613227844, -0.44042307138442993, 0.0], [0.32443538308143616, -0.216264545917511, 0.0], [0.4693125784397125, -0.004907187540084124, 0.0], [0.307996541261673, 0.15577702224254608, 0.0], [0.14116765558719635, -1.4117493629455566, 0.0], [1.683410406112671, 1.0969938039779663, 1.0], [0.0050277309492230415, 2.4343621730804443, 0.0], [0.05337651073932648, -2.296868324279785, 1.0], [-0.28374966979026794, -0.34644854068756104, 0.0], [-0.30192333459854126, -0.19919049739837646, 0.0], [0.328588604927063, -0.00121541868429631, 0.0], [-0.3771442472934723, 0.11640504747629166, 0.0], [-0.2415294200181961, 0.27999070286750793, 0.0], [-0.194350466132164, 0.4355982542037964, 0.0], [-0.041043780744075775, 0.3591064214706421, 0.0], [0.09641585499048233, 0.4406173527240753, 0.0], [0.21390192210674286, 0.4010235071182251, 0.0], [0.2775215804576874, 0.234519362449646, 0.0], [0.28456345200538635, 0.062281765043735504, 0.0], [0.28417712450027466, -0.10650307685136795, 0.0], [0.28602325916290283, -0.26023295521736145, 0.0], [0.1367456018924713, -3.3483715057373047, 1.0], [0.4954164922237396, 1.4133031368255615, 1.0], [5.602030432783067e-05, 2.376753807067871, 0.0], [0.015438797883689404, -1.522902488708496, 1.0], [0.4375930726528168, -0.46533891558647156, 0.0], [0.31024235486984253, -0.234160378575325, 0.0], [0.4481929540634155, -0.007698705419898033, 0.0], [0.30054333806037903, 0.15635818243026733, 0.0], [0.13170892000198364, -1.4381959438323975, 1.0], [1.9625205993652344, 1.401604413986206, 1.0], [0.0002274375146953389, 2.290099620819092, 0.0], [0.023549893870949745, -2.0416817665100098, 1.0], [-0.290004163980484, -0.3470138609409332, 0.0], [-0.2859489917755127, -0.1704154759645462, 0.0], [-0.46547186374664307, -0.00501985615119338, 0.0], [-0.33604696393013, 0.15813502669334412, 0.0], [-0.32331347465515137, 0.32885563373565674, 0.0], [-0.18297894299030304, 0.49691054224967957, 0.0], [0.0013189351884648204, 0.3357170820236206, 0.0], [0.17501266300678253, 0.49029290676116943, 0.0], [0.3143893778324127, 0.32929959893226624, 0.0], [0.3110382854938507, 0.17146021127700806, 0.0], [0.30974462628364563, -0.00582449184730649, 0.0], [0.3065202832221985, -0.16896982491016388, 0.0], [0.31087106466293335, -0.31118929386138916, 0.0], [0.15986081957817078, -3.2676289081573486, 1.0], [0.5512588024139404, 1.3948886394500732, 1.0], [-0.00036536698462441564, 2.356610059738159, 0.0], [0.01737459935247898, -1.5125236511230469, 1.0], [0.46884921193122864, -0.45795130729675293, 0.0], [0.3185505270957947, -0.22622810304164886, 0.0], [0.4558887183666229, -0.005449468735605478, 0.0], [0.31503555178642273, 0.1543750762939453, 0.0], [0.14106765389442444, -1.4267332553863525, 0.0], [1.8048816919326782, 1.116011381149292, 1.0], [0.004604896064847708, 2.501161575317383, 0.0], [0.04876311495900154, -2.2784781455993652, 1.0], [-0.28969183564186096, -0.3569164574146271, 0.0], [-0.28743332624435425, -0.17683015763759613, 0.0], [-0.4454502463340759, -0.020159559324383736, 0.0], [-0.35568341612815857, 0.1395738124847412, 0.0], [-0.3119528591632843, 0.319835364818573, 0.0], [-0.18822044134140015, 0.4956691563129425, 0.0], [-0.0035434593446552753, 0.3380535840988159, 0.0], [0.1668795496225357, 0.49075400829315186, 0.0], [0.31151512265205383, 0.33125969767570496, 0.0], [0.31552988290786743, 0.17227976024150848, 0.0], [0.3101939260959625, -0.0032687922939658165, 0.0], [0.30491992831230164, -0.16313715279102325, 0.0], [0.31440913677215576, -0.30675485730171204, 0.0], [0.15625078976154327, -3.2525346279144287, 1.0], [0.5449998378753662, 1.4039779901504517, 1.0], [-0.0006440847646445036, 2.3897705078125, 0.0], [0.015456648543477058, -1.5272969007492065, 1.0], [0.46904456615448, -0.4624922275543213, 0.0], [0.31806477904319763, -0.22841937839984894, 0.0], [0.4607023298740387, -0.005976072046905756, 0.0], [0.31175726652145386, 0.1565241813659668, 0.0], [0.14132073521614075, -1.4394649267196655, 0.0], [1.686692714691162, 1.0476268529891968, 1.0], [0.005772566422820091, 2.5367257595062256, 0.0], [0.05465741828083992, -2.351581335067749, 1.0], [-0.290579229593277, -0.35288920998573303, 0.0], [-0.3081035315990448, -0.20032212138175964, 0.0], [0.31911417841911316, -0.0010875619482249022, 0.0], [-0.3796469569206238, 0.11541050672531128, 0.0], [-0.23777715861797333, 0.2842373549938202, 0.0], [-0.19867567718029022, 0.4445212781429291, 0.0], [-0.04722775146365166, 0.3562052249908447, 0.0], [0.08697105944156647, 0.4557649493217468, 0.0], [0.20650774240493774, 0.3979249894618988, 0.0], [0.28523626923561096, 0.23973341286182404, 0.0], [0.2837059199810028, 0.06300819665193558, 0.0], [0.2784586250782013, -0.11573082953691483, 0.0], [0.2824499309062958, -0.269761323928833, 0.0], [0.2961193025112152, -0.3508554995059967, 1.0], [0.1407848298549652, -2.7844882011413574, 1.0]], [[2.48178768157959, 1.730928897857666, 1.0], [-0.2394285798072815, -0.3363664150238037, 0.0], [-0.40582576394081116, -0.1633628010749817, 0.0], [-0.5005245804786682, -0.0025022877380251884, 0.0], [-0.31667718291282654, 0.17863784730434418, 0.0], [-0.2495780885219574, 0.3409161865711212, 0.0], [0.05106918141245842, 0.34515807032585144, 0.0], [0.1246073991060257, 0.3894246816635132, 0.0], [0.20252157747745514, 0.4215201437473297, 0.0], [0.27899691462516785, 0.3893947899341583, 0.0], [0.31044256687164307, 0.216172456741333, 0.0], [0.3056805729866028, 0.04197137802839279, 0.0], [0.2986888885498047, -0.12359707057476044, 0.0], [0.30019280314445496, -0.26800084114074707, 0.0], [0.14958041906356812, -3.3643975257873535, 1.0], [2.0426411628723145, 1.5739532709121704, 1.0], [0.0004496500187087804, 2.3622241020202637, 0.0], [0.0029786410741508007, -2.054098129272461, 1.0], [-0.279006689786911, -0.3630015254020691, 0.0], [-0.27510708570480347, -0.1799473613500595, 0.0], [-0.44367584586143494, 0.002119493205100298, 0.0], [-0.3175252676010132, 0.17683276534080505, 0.0], [-0.30925464630126953, 0.35631468892097473, 0.0], [-0.16424354910850525, 0.5251264572143555, 0.0], [0.016142837703227997, 0.34354671835899353, 0.0], [0.17529194056987762, 0.5127543807029724, 0.0], [0.30511200428009033, 0.3384994566440582, 0.0], [0.2972499132156372, 0.16782613098621368, 0.0], [0.29477500915527344, -0.018234441056847572, 0.0], [0.2973342835903168, -0.18887972831726074, 0.0], [0.3033495545387268, -0.3344700336456299, 0.0], [0.15175071358680725, -3.351087808609009, 1.0], [0.5577229261398315, 1.452239990234375, 1.0], [-0.00023808340483810753, 2.476526975631714, 0.0], [0.017796644940972328, -1.592290997505188, 1.0], [0.4691251516342163, -0.48329126834869385, 0.0], [0.32821139693260193, -0.2438831776380539, 0.0], [0.46621692180633545, -0.0049628643319010735, 0.0], [0.31346264481544495, 0.161637082695961, 0.0], [0.13999289274215698, -1.4744821786880493, 1.0], [2.148167371749878, 1.4514143466949463, 1.0], [-0.0008307920070365071, 2.3082480430603027, 0.0], [0.02179074101150036, -2.0149991512298584, 1.0], [-0.3011781573295593, -0.3471204936504364, 0.0], [-0.30261749029159546, -0.17352735996246338, 0.0], [-0.48285308480262756, -1.7201736000060919e-06, 0.0], [-0.3494151830673218, 0.1684780716896057, 0.0], [-0.33230453729629517, 0.3427720069885254, 0.0], [-0.1841644048690796, 0.5130475759506226, 0.0], [0.0043379925191402435, 0.33874237537384033, 0.0], [0.17829066514968872, 0.5061411261558533, 0.0], [0.3244428038597107, 0.3407549560070038, 0.0], [0.319174200296402, 0.17735879123210907, 0.0], [0.4958515167236328, -0.004830515943467617, 0.0], [0.3243045210838318, -0.17385025322437286, 0.0], [0.32127708196640015, -0.3386068642139435, 0.0], [0.17067191004753113, -3.2998151779174805, 1.0], [0.6060807704925537, 1.4171137809753418, 1.0], [-0.00047386830556206405, 2.406489610671997, 0.0], [0.01603311486542225, -1.540350317955017, 1.0], [0.4763624370098114, -0.4684008061885834, 0.0], [0.330186128616333, -0.23508739471435547, 0.0], [0.4593573212623596, -0.004383627325296402, 0.0], [0.31589677929878235, 0.15378639101982117, 0.0], [0.1407753825187683, -1.4348024129867554, 0.0], [1.7975791692733765, 1.1521987915039062, 1.0], [0.004735210444778204, 2.503580331802368, 0.0], [0.048042792826890945, -2.3408443927764893, 1.0], [-0.29597729444503784, -0.3619702458381653, 0.0], [-0.28830915689468384, -0.17967265844345093, 0.0], [0.3399204909801483, -0.0009487881325185299, 0.0], [-0.3827206492424011, 0.12176090478897095, 0.0], [-0.24193987250328064, 0.29030731320381165, 0.0], [-0.20200753211975098, 0.4483519494533539, 0.0], [-0.05019942671060562, 0.3652327060699463, 0.0], [0.08544901013374329, 0.45337173342704773, 0.0], [0.2046394646167755, 0.41228264570236206, 0.0], [0.2878638207912445, 0.2501465976238251, 0.0], [0.29007798433303833, 0.07291857153177261, 0.0], [0.28399741649627686, -0.10489027202129364, 0.0], [0.28692683577537537, -0.2673398554325104, 0.0], [0.1380620002746582, -3.4269139766693115, 1.0], [0.5192026495933533, 1.4476327896118164, 1.0], [-0.0004820381000172347, 2.409102439880371, 0.0], [0.017756713554263115, -1.5661416053771973, 1.0], [0.45318591594696045, -0.4727746844291687, 0.0], [0.31335878372192383, -0.2393498718738556, 0.0], [0.4409359395503998, -0.0063703469932079315, 0.0], [0.3076258599758148, 0.15959270298480988, 0.0], [0.13664847612380981, -1.4637370109558105, 0.0], [1.7493411302566528, 1.1437582969665527, 1.0], [0.0045570735819637775, 2.5689985752105713, 0.0], [0.04783337190747261, -2.3675713539123535, 1.0], [-0.2900432348251343, -0.3637463450431824, 0.0], [-0.30586251616477966, -0.2044866532087326, 0.0], [0.33307358622550964, -0.0023205068428069353, 0.0], [-0.3828853964805603, 0.11797976493835449, 0.0], [-0.24582736194133759, 0.28707149624824524, 0.0], [-0.20127606391906738, 0.4500769376754761, 0.0], [-0.05001683160662651, 0.3677673935890198, 0.0], [0.08282534778118134, 0.457096666097641, 0.0], [0.2061609923839569, 0.4151327610015869, 0.0], [0.28591713309288025, 0.2490774691104889, 0.0], [0.2864345908164978, 0.07242297381162643, 0.0], [0.27933886647224426, -0.10535770654678345, 0.0], [0.27815574407577515, -0.2639363706111908, 0.0], [0.13478471338748932, -3.4291725158691406, 1.0], [0.5082783102989197, 1.4500691890716553, 1.0], [-0.00024683107039891183, 2.4116406440734863, 0.0], [0.018354304134845734, -1.5387786626815796, 1.0], [0.4481503367424011, -0.46976256370544434, 0.0], [0.3089004456996918, -0.23793081939220428, 0.0], [0.44296586513519287, -0.007902469485998154, 0.0], [0.30435678362846375, 0.15569190680980682, 0.0], [0.1361543834209442, -1.4715604782104492, 1.0], [2.0494277477264404, 1.420268177986145, 1.0], [0.0009404545417055488, 2.3072690963745117, 0.0], [0.017220161855220795, -2.023935556411743, 1.0], [-0.2917191982269287, -0.35053613781929016, 0.0], [-0.29240965843200684, -0.17259615659713745, 0.0], [-0.4737638533115387, 0.0005448421579785645, 0.0], [-0.3442723751068115, 0.16235622763633728, 0.0], [-0.33073920011520386, 0.33407047390937805, 0.0], [-0.1780497282743454, 0.509423553943634, 0.0], [0.0014699100283905864, 0.3344685137271881, 0.0], [0.17502759397029877, 0.5055567622184753, 0.0], [0.3143880367279053, 0.3391755223274231, 0.0], [0.3150138854980469, 0.1764175146818161, 0.0], [0.31307852268218994, -0.0038555169012397528, 0.0], [0.30812615156173706, -0.16461847722530365, 0.0], [0.31333574652671814, -0.31069713830947876, 0.0], [0.15962493419647217, -3.3071117401123047, 1.0], [0.5687099099159241, 1.427944540977478, 1.0], [-0.00019945958047173917, 2.44996976852417, 0.0], [0.015929296612739563, -1.5745989084243774, 1.0], [0.47742173075675964, -0.4767545163631439, 0.0], [0.32789963483810425, -0.2412133365869522, 0.0], [0.4669497311115265, -0.005614138208329678, 0.0], [0.3149038851261139, 0.15940357744693756, 0.0], [0.14224748313426971, -1.459942102432251, 0.0], [1.7366409301757812, 1.1362812519073486, 1.0], [0.004503723233938217, 2.5067710876464844, 0.0], [0.05458516255021095, -2.343158483505249, 1.0], [-0.2868516743183136, -0.35762450098991394, 0.0], [-0.3056366443634033, -0.2041563242673874, 0.0], [0.3245506286621094, -0.0020873812027275562, 0.0], [-0.38133683800697327, 0.11958909779787064, 0.0], [-0.24332872033119202, 0.2879005968570709, 0.0], [-0.20425204932689667, 0.44807344675064087, 0.0], [-0.04986792430281639, 0.36674126982688904, 0.0], [0.08465156704187393, 0.4556085467338562, 0.0], [0.20481792092323303, 0.4127398729324341, 0.0], [0.2857944369316101, 0.2478550672531128, 0.0], [0.2840171754360199, 0.07288316637277603, 0.0], [0.2811282277107239, -0.10728481411933899, 0.0], [0.2830173969268799, -0.2662721574306488, 0.0], [0.13471344113349915, -3.3978121280670166, 1.0], [0.5660293102264404, 0.16887809336185455, 1.0], [-0.004080704879015684, 3.5375988483428955, 0.0], [0.14505648612976074, 0.5943167209625244, 1.0], [0.3908240795135498, 0.13504242897033691, 0.0], [0.28806400299072266, -0.07903634756803513, 0.0], [-1.224941372871399, -2.5232043266296387, 1.0], [1.0547701120376587, -0.0026060796808451414, 0.0], [0.3128646910190582, -1.4331810474395752, 1.0], [0.6029952764511108, 0.18611125648021698, 1.0], [0.17877978086471558, 0.24612613022327423, 0.0], [0.1674736738204956, -0.11579205840826035, 0.0], [-0.13751794397830963, -0.1983441859483719, 0.0], [-0.16362571716308594, 0.1745910346508026, 0.0], [0.19914460182189941, 1.2775626182556152, 1.0], [0.0014447241555899382, 2.509408473968506, 0.0], [0.33654797077178955, -3.853560447692871, 1.0], [0.6890044212341309, 1.4387047290802002, 1.0], [-0.0036902965512126684, 2.494542360305786, 0.0], [0.01784093677997589, -1.6901410818099976, 1.0], [0.5110689401626587, -0.513805091381073, 0.0], [0.3497640788555145, -0.23155327141284943, 0.0], [0.49828508496284485, -0.002812217455357313, 0.0], [0.3303819000720978, 0.17880944907665253, 0.0], [0.16273710131645203, 0.5384267568588257, 0.0], [-0.002139884978532791, 1.7974711656570435, 0.0], [0.17386987805366516, -3.8857345581054688, 1.0], [2.274749994277954, 1.5410794019699097, 1.0], [-0.0016017962479963899, 2.521008253097534, 0.0], [0.0008044753922149539, -1.9642244577407837, 1.0], [-0.3057548999786377, -0.3687576651573181, 0.0], [-0.3085230886936188, -0.1824955940246582, 0.0], [-0.4933842420578003, 0.003613442648202181, 0.0], [-0.3367728590965271, 0.18764007091522217, 0.0], [-0.3391907513141632, 0.36819392442703247, 0.0], [-0.17330461740493774, 0.538536548614502, 0.0], [0.00996706634759903, 0.35549262166023254, 0.0], [0.18105216324329376, 0.5270640254020691, 0.0], [0.3202495276927948, 0.3586813509464264, 0.0], [0.3203302025794983, 0.17956086993217468, 0.0], [0.3126291334629059, -0.005371688865125179, 0.0], [0.31203120946884155, -0.16936910152435303, 0.0], [0.3157784342765808, -0.31930649280548096, 0.0], [0.1579950898885727, -3.4016270637512207, 1.0], [0.5777775645256042, 1.457702875137329, 1.0], [-0.0007932882290333509, 2.552278995513916, 0.0], [0.013930924236774445, -1.6601835489273071, 1.0], [0.47888433933258057, -0.5045936107635498, 0.0], [0.33977773785591125, -0.25326815247535706, 0.0], [0.46841979026794434, -0.004956291522830725, 0.0], [0.3163289427757263, 0.16499103605747223, 0.0], [0.14228996634483337, -1.477537751197815, 0.0], [1.7747066020965576, 1.1848540306091309, 1.0], [0.0061706844717264175, 2.5659542083740234, 0.0], [0.048461414873600006, -2.392707109451294, 1.0], [-0.2923979163169861, -0.36723190546035767, 0.0], [-0.30919861793518066, -0.20907309651374817, 0.0], [0.33332398533821106, -0.0011795867467299104, 0.0], [-0.38396748900413513, 0.12089887261390686, 0.0], [-0.2482065111398697, 0.2907336950302124, 0.0], [-0.20609377324581146, 0.454327791929245, 0.0], [-0.056562766432762146, 0.37187066674232483, 0.0], [0.07756568491458893, 0.4648423194885254, 0.0], [0.19886977970600128, 0.42048242688179016, 0.0], [0.2861589789390564, 0.25896793603897095, 0.0], [0.2891797721385956, 0.08120904862880707, 0.0], [0.2863386273384094, -0.09873827546834946, 0.0], [0.2839737832546234, -0.26282840967178345, 0.0], [0.13481445610523224, -3.495603322982788, 1.0], [0.5083191990852356, 1.471671223640442, 1.0], [-0.001806587097235024, 2.448979139328003, 0.0], [0.021498776972293854, -1.6254432201385498, 1.0], [0.4545445144176483, -0.49410274624824524, 0.0], [0.3088957667350769, -0.23257598280906677, 0.0], [0.4451214373111725, -0.007435763254761696, 0.0], [0.3033015727996826, 0.1631578952074051, 0.0], [0.1393459141254425, -1.4909031391143799, 0.0], [1.9013254642486572, 1.1777846813201904, 1.0]], [[2.4747605323791504, 1.7707693576812744, 1.0], [-0.23794633150100708, -0.33943280577659607, 0.0], [-0.463837206363678, -0.16619683802127838, 0.0], [-0.5134651064872742, 0.0014319935580715537, 0.0], [-0.5117823481559753, 0.1774320751428604, 0.0], [-0.22045111656188965, 0.34927600622177124, 0.0], [0.10205864161252975, 0.3330814242362976, 0.0], [0.17120113968849182, 0.40497180819511414, 0.0], [0.8168891072273254, 0.1603468358516693, 0.0], [0.3276960849761963, 0.15526598691940308, 0.0], [0.22391314804553986, 0.325286865234375, 0.0], [0.07717207819223404, 0.16518105566501617, 0.0], [-0.08178570866584778, 0.3167032301425934, 0.0], [-0.49070975184440613, 0.14833572506904602, 0.0], [-0.5046772956848145, -0.02740359678864479, 0.0], [-0.5103781223297119, -0.19789069890975952, 0.0], [-0.16437609493732452, -0.36570486426353455, 0.0], [2.0053584575653076, -3.2756710052490234, 1.0], [0.694074273109436, 0.1715690642595291, 1.0], [-0.005693621002137661, 3.450780153274536, 0.0], [0.15295518934726715, 0.564753532409668, 1.0], [0.4289400279521942, 0.13094769418239594, 0.0], [0.3119741976261139, -0.06508699804544449, 0.0], [-1.3066647052764893, -2.4515764713287354, 1.0], [1.1233292818069458, -0.0038960264064371586, 0.0], [0.3368203639984131, -1.3920618295669556, 1.0], [0.5914818048477173, 0.1828766167163849, 1.0], [0.18269214034080505, 0.2377765029668808, 0.0], [0.1698485165834427, -0.11072444915771484, 0.0], [-0.14269331097602844, -0.1881406009197235, 0.0], [-0.15959538519382477, 0.17575863003730774, 0.0], [0.21234293282032013, 1.2559059858322144, 1.0], [0.0020011914893984795, 2.441894292831421, 0.0], [0.3438038229942322, -3.7456214427948, 1.0], [0.6943617463111877, 1.4015611410140991, 1.0], [-0.0032864424865692854, 2.356278896331787, 0.0], [0.01896587200462818, -1.5870699882507324, 1.0], [0.5151546597480774, -0.47957080602645874, 0.0], [0.3494545817375183, -0.21402393281459808, 0.0], [0.501944363117218, -0.002924892585724592, 0.0], [0.3341638445854187, 0.17095847427845, 0.0], [0.16744773089885712, 0.5183788537979126, 0.0], [-0.0012179502518847585, 1.7408254146575928, 0.0], [0.17474812269210815, -3.791335105895996, 1.0], [2.2940616607666016, 1.5297921895980835, 1.0], [-0.001994486665353179, 2.5050160884857178, 0.0], [0.0018651599530130625, -1.9908442497253418, 1.0], [-0.31010207533836365, -0.3630061745643616, 0.0], [-0.31270137429237366, -0.1797342151403427, 0.0], [-0.4982631504535675, 0.004584445618093014, 0.0], [-0.3426530957221985, 0.18568041920661926, 0.0], [-0.32897284626960754, 0.3667987585067749, 0.0], [-0.17143987119197845, 0.5419172644615173, 0.0], [0.010250788182020187, 0.3507367968559265, 0.0], [0.1818770319223404, 0.5313547849655151, 0.0], [0.3248612582683563, 0.35848507285118103, 0.0], [0.3209478557109833, 0.1818876564502716, 0.0], [0.49691882729530334, -0.0041229212656617165, 0.0], [0.3192518949508667, -0.17738385498523712, 0.0], [0.3275446891784668, -0.3492549657821655, 0.0], [0.16696219146251678, -3.3688971996307373, 1.0], [0.5898555517196655, 1.454452395439148, 1.0], [-0.0007615138893015683, 2.4273006916046143, 0.0], [0.01759321801364422, -1.5529476404190063, 1.0], [0.4798704981803894, -0.4655608832836151, 0.0], [0.3343401551246643, -0.23831318318843842, 0.0], [0.481230765581131, -0.0051107509061694145, 0.0], [0.32274332642555237, 0.15962526202201843, 0.0], [0.14429782330989838, -1.4692078828811646, 1.0], [2.1259005069732666, 1.4558566808700562, 1.0], [-0.0009057014831341803, 2.3037312030792236, 0.0], [0.022796418517827988, -2.0371382236480713, 1.0], [-0.3031819462776184, -0.3479769825935364, 0.0], [-0.30008503794670105, -0.17290343344211578, 0.0], [-0.4839560091495514, -0.0017778003821149468, 0.0], [-0.3456515669822693, 0.1625385284423828, 0.0], [-0.33121925592422485, 0.3358069956302643, 0.0], [-0.18513435125350952, 0.5110360383987427, 0.0], [-0.004790089558809996, 0.3337831199169159, 0.0], [0.17122474312782288, 0.5064125657081604, 0.0], [0.3222982585430145, 0.3466535210609436, 0.0], [0.3227066397666931, 0.18262304365634918, 0.0], [0.321774423122406, 0.002247459255158901, 0.0], [0.31928470730781555, -0.16061390936374664, 0.0], [0.31948715448379517, -0.30598151683807373, 0.0], [0.15712419152259827, -3.3202099800109863, 1.0], [0.5526928901672363, 1.4212734699249268, 1.0], [0.0006030341610312462, 2.4126908779144287, 0.0], [0.017752675339579582, -1.5482453107833862, 1.0], [0.47520753741264343, -0.47000324726104736, 0.0], [0.32517069578170776, -0.22678428888320923, 0.0], [0.46600160002708435, -0.006772798951715231, 0.0], [0.3144538700580597, 0.1562512218952179, 0.0], [0.14137689769268036, -1.4454797506332397, 0.0], [1.737642765045166, 1.096359372138977, 1.0], [0.005318550858646631, 2.536263942718506, 0.0], [0.051986098289489746, -2.3436594009399414, 1.0], [-0.28783607482910156, -0.360861212015152, 0.0], [-0.3025285601615906, -0.2040126621723175, 0.0], [0.3293379843235016, -0.0009705398115329444, 0.0], [-0.3839958608150482, 0.1177791953086853, 0.0], [-0.24229303002357483, 0.28463035821914673, 0.0], [-0.20719020068645477, 0.4472671151161194, 0.0], [-0.051371000707149506, 0.36353799700737, 0.0], [0.08258825540542603, 0.4587189555168152, 0.0], [0.2029225379228592, 0.41009509563446045, 0.0], [0.2851969301700592, 0.2500690519809723, 0.0], [0.2868536710739136, 0.07534734159708023, 0.0], [0.28105372190475464, -0.10342724621295929, 0.0], [0.28542348742485046, -0.2617895007133484, 0.0], [0.1368749588727951, -3.4359171390533447, 1.0], [0.5696674585342407, 0.16914674639701843, 1.0], [-0.00403721584007144, 3.545236349105835, 0.0], [0.14516957104206085, 0.5992035865783691, 1.0], [0.39367160201072693, 0.139265775680542, 0.0], [0.2943000793457031, -0.07943074405193329, 0.0], [-1.198753833770752, -2.5291850566864014, 1.0], [1.0833587646484375, -0.0006100557511672378, 0.0], [0.3185676634311676, -1.4416967630386353, 1.0], [0.6198591589927673, 0.1849856972694397, 1.0], [0.1820167750120163, 0.2419373095035553, 0.0], [0.16768419742584229, -0.11242101341485977, 0.0], [-0.13824933767318726, -0.1971140056848526, 0.0], [-0.15787963569164276, 0.17720338702201843, 0.0], [0.198506161570549, 1.2846174240112305, 1.0], [0.0015918550780043006, 2.489300012588501, 0.0], [0.3411221504211426, -3.8535375595092773, 1.0], [0.6935668587684631, 1.4371787309646606, 1.0], [-0.002076139207929373, 2.512312173843384, 0.0], [0.01590730994939804, -1.6974287033081055, 1.0], [0.5126697421073914, -0.5139263272285461, 0.0], [0.34792518615722656, -0.2267487496137619, 0.0], [0.49079492688179016, -0.0017067519947886467, 0.0], [0.33258914947509766, 0.1762125939130783, 0.0], [0.1652885228395462, 0.5376173257827759, 0.0], [0.0006681425729766488, 1.814034104347229, 0.0], [0.1745804250240326, -3.8887460231781006, 1.0], [2.2113425731658936, 1.598375678062439, 1.0], [-0.0017711817054077983, 2.490732192993164, 0.0], [0.0037316051311790943, -2.0222010612487793, 1.0], [-0.3013422191143036, -0.3725876212120056, 0.0], [-0.3090207576751709, -0.1819162368774414, 0.0], [-0.4843294620513916, 0.0049719493836164474, 0.0], [-0.3364143967628479, 0.1858118325471878, 0.0], [-0.3340798020362854, 0.3656488358974457, 0.0], [-0.17551816999912262, 0.5416682958602905, 0.0], [0.005919311195611954, 0.3481455445289612, 0.0], [0.17596442997455597, 0.5386829972267151, 0.0], [0.32431039214134216, 0.35881733894348145, 0.0], [0.32388654351234436, 0.18495412170886993, 0.0], [0.31702905893325806, -0.004000118933618069, 0.0], [0.31220000982284546, -0.17312464118003845, 0.0], [0.31272026896476746, -0.32274147868156433, 0.0], [0.15682022273540497, -3.4092764854431152, 1.0], [0.6434261202812195, 0.1781551092863083, 1.0], [-0.0038737496361136436, 3.5326809883117676, 0.0], [0.15402093529701233, 0.5968352556228638, 1.0], [0.4063500165939331, 0.1393684297800064, 0.0], [0.30258825421333313, -0.07041146606206894, 0.0], [-1.2711172103881836, -2.5657670497894287, 1.0], [1.102842092514038, -0.0021129604429006577, 0.0], [0.32934582233428955, -1.4374624490737915, 1.0], [0.6321765184402466, 0.18774527311325073, 1.0], [0.1848461925983429, 0.2401438057422638, 0.0], [0.172503262758255, -0.11815396696329117, 0.0], [-0.1394440084695816, -0.1965683102607727, 0.0], [-0.16242623329162598, 0.18243573606014252, 0.0], [0.19971829652786255, 1.2859910726547241, 1.0], [0.0017098374664783478, 2.535496234893799, 0.0], [0.34499090909957886, -3.9048712253570557, 1.0], [2.3515632152557373, 1.7266629934310913, 1.0], [-0.005216472316533327, 2.349294662475586, 0.0], [0.010464057326316833, -2.0316147804260254, 1.0], [-0.3201697766780853, -0.3679468035697937, 0.0], [-0.32015305757522583, -0.18216869235038757, 0.0], [-0.5050939321517944, 0.006634722929447889, 0.0], [-0.35570651292800903, 0.1854325532913208, 0.0], [-0.334739089012146, 0.37126263976097107, 0.0], [-0.1624937653541565, 0.5540658831596375, 0.0], [0.018016522750258446, 0.3542253375053406, 0.0], [0.18993885815143585, 0.540023922920227, 0.0], [0.33034777641296387, 0.36054474115371704, 0.0], [0.32591700553894043, 0.1840709149837494, 0.0], [0.5018230676651001, -0.0033299715723842382, 0.0], [0.3316364586353302, -0.18173189461231232, 0.0], [0.32778385281562805, -0.3555920720100403, 0.0], [0.1678977608680725, -3.406049966812134, 1.0], [0.5940329432487488, 1.4709035158157349, 1.0], [-0.000494352774694562, 2.5044896602630615, 0.0], [0.01792684756219387, -1.5924038887023926, 1.0], [0.4897930324077606, -0.4798363447189331, 0.0], [0.3355904519557953, -0.2436237782239914, 0.0], [0.47368720173835754, -0.0034364755265414715, 0.0], [0.31875383853912354, 0.1628919094800949, 0.0], [0.14495012164115906, -1.4657518863677979, 0.0], [1.8316562175750732, 1.139233112335205, 1.0], [0.004442393314093351, 2.604018449783325, 0.0], [0.04624529555439949, -2.3689022064208984, 1.0], [-0.29315823316574097, -0.3660990595817566, 0.0], [-0.30969277024269104, -0.20634599030017853, 0.0], [-0.4643348157405853, -0.02814214490354061, 0.0], [-0.36611536145210266, 0.140147402882576, 0.0], [-0.3308844268321991, 0.32731494307518005, 0.0], [-0.1839270144701004, 0.5078860521316528, 0.0], [-0.005963464267551899, 0.34505510330200195, 0.0], [0.15855424106121063, 0.5082480311393738, 0.0], [0.31917229294776917, 0.345537006855011, 0.0], [0.3153948485851288, 0.18920540809631348, 0.0], [0.3158315122127533, 0.00567837106063962, 0.0], [0.31054240465164185, -0.16167466342449188, 0.0], [0.3121635317802429, -0.305449515581131, 0.0], [0.15815995633602142, -3.3734238147735596, 1.0], [0.5909532904624939, 1.4466651678085327, 1.0], [-0.0001729288196656853, 2.486614227294922, 0.0], [0.01868741773068905, -1.5963197946548462, 1.0], [0.4728856682777405, -0.4794699251651764, 0.0], [0.33104774355888367, -0.2407587766647339, 0.0], [0.46881893277168274, -0.005233528092503548, 0.0], [0.31417107582092285, 0.15925920009613037, 0.0], [0.14159893989562988, -1.4701054096221924, 0.0], [1.7540611028671265, 1.1327018737792969, 1.0], [0.005666761659085751, 2.595468521118164, 0.0], [0.05119158700108528, -2.4102084636688232, 1.0], [-0.2991240620613098, -0.3648209571838379, 0.0], [-0.3066388964653015, -0.20915743708610535, 0.0], [0.335361510515213, -9.664273966336623e-05, 0.0], [-0.38527190685272217, 0.1202571839094162, 0.0], [-0.2534883916378021, 0.2880806624889374, 0.0], [-0.19986413419246674, 0.44945183396339417, 0.0], [-0.05425255373120308, 0.36431002616882324, 0.0], [0.08283960074186325, 0.46215248107910156, 0.0], [0.20374174416065216, 0.41659075021743774, 0.0], [0.28658419847488403, 0.25234928727149963, 0.0], [0.288019597530365, 0.07469582557678223, 0.0]], [[2.444293737411499, 1.7671823501586914, 1.0], [-0.2253827005624771, -0.3368346393108368, 0.0], [-0.44511762261390686, -0.16470958292484283, 0.0], [-0.5085993409156799, 0.0018560640746727586, 0.0], [-0.5071811079978943, 0.17215891182422638, 0.0], [-0.24966226518154144, 0.34751176834106445, 0.0], [0.08683052659034729, 0.3390539586544037, 0.0], [0.16331037878990173, 0.39365625381469727, 0.0], [0.7967785596847534, 0.1621566116809845, 0.0], [0.3191920816898346, 0.16466912627220154, 0.0], [0.311480313539505, 0.032822515815496445, 0.0], [0.11696677654981613, 0.2637212872505188, 0.0], [-0.03092091530561447, 0.1848677098751068, 0.0], [-0.5307495594024658, 0.09078937023878098, 0.0], [-0.5432120561599731, -0.011847328394651413, 0.0], [-0.5260838866233826, -0.13640429079532623, 0.0], [-0.18947432935237885, -0.31435057520866394, 0.0], [2.0714290142059326, -3.028589963912964, 1.0], [0.7108691930770874, 0.16014322638511658, 1.0], [-0.004843896254897118, 3.3675827980041504, 0.0], [0.14890122413635254, 0.5652594566345215, 1.0], [0.434270441532135, 0.12720830738544464, 0.0], [0.3283316493034363, -0.059975516051054, 0.0], [-1.3402060270309448, -2.380341053009033, 1.0], [1.16836678981781, -0.006131591275334358, 0.0], [0.3450140058994293, -1.3967078924179077, 1.0], [2.1417112350463867, 1.525978922843933, 1.0], [-0.002744565950706601, 2.397066831588745, 0.0], [0.009615443646907806, -1.9812055826187134, 1.0], [-0.29896071553230286, -0.3622153699398041, 0.0], [-0.2988455891609192, -0.17514820396900177, 0.0], [-0.4743730127811432, 0.003076859749853611, 0.0], [-0.3328115940093994, 0.1762978583574295, 0.0], [-0.3305840492248535, 0.3514019250869751, 0.0], [-0.18163283169269562, 0.5183482766151428, 0.0], [-0.00038235369720496237, 0.3398028016090393, 0.0], [0.17397771775722504, 0.5126404166221619, 0.0], [0.3231019377708435, 0.3463536500930786, 0.0], [0.3150564432144165, 0.17808797955513, 0.0], [0.3131740987300873, -0.009117992594838142, 0.0], [0.30692046880722046, -0.17491735517978668, 0.0], [0.312202513217926, -0.32097896933555603, 0.0], [0.15807586908340454, -3.328662395477295, 1.0], [0.554200291633606, 1.4346952438354492, 1.0], [-0.0006148915272206068, 2.3735897541046143, 0.0], [0.01885218359529972, -1.549985408782959, 1.0], [0.47867774963378906, -0.47013241052627563, 0.0], [0.31519055366516113, -0.22204817831516266, 0.0], [0.46322160959243774, -0.0061973328702151775, 0.0], [0.3100196421146393, 0.16267719864845276, 0.0], [0.13903091847896576, -1.4556775093078613, 0.0], [1.7393124103546143, 1.1259838342666626, 1.0], [0.006344959605485201, 2.519545793533325, 0.0], [0.05636465921998024, -2.391110897064209, 1.0], [-0.29424208402633667, -0.35915234684944153, 0.0], [-0.3088042140007019, -0.20409928262233734, 0.0], [0.33295175433158875, -0.0015940302982926369, 0.0], [-0.3845028579235077, 0.11780732870101929, 0.0], [-0.2430650144815445, 0.2839219272136688, 0.0], [-0.19911181926727295, 0.44622480869293213, 0.0], [-0.0465833954513073, 0.3600904643535614, 0.0], [0.08511912822723389, 0.456621915102005, 0.0], [0.2054934799671173, 0.4121764004230499, 0.0], [0.2825971245765686, 0.2466391623020172, 0.0], [0.2854781746864319, 0.07133486121892929, 0.0], [0.27855393290519714, -0.10413983464241028, 0.0], [0.28381264209747314, -0.26013320684432983, 0.0], [0.1368730217218399, -3.418989658355713, 1.0], [0.5040372014045715, 1.4387156963348389, 1.0], [-0.0020007153507322073, 2.4054369926452637, 0.0], [0.016581544652581215, -1.5817502737045288, 1.0], [0.44527921080589294, -0.48205050826072693, 0.0], [0.30802178382873535, -0.23466257750988007, 0.0], [0.4397375285625458, -0.007383684162050486, 0.0], [0.5219644904136658, -0.012554303742945194, 0.0], [0.16720643639564514, -1.4427427053451538, 0.0], [1.640967607498169, 1.1219532489776611, 1.0], [0.0023913513869047165, 2.5553252696990967, 0.0], [0.04958110302686691, -2.3922078609466553, 1.0], [-0.2855588495731354, -0.3610714077949524, 0.0], [-0.305818647146225, -0.20299690961837769, 0.0], [0.3246585726737976, -0.0022722873836755753, 0.0], [-0.37530776858329773, 0.11793112009763718, 0.0], [-0.2379215508699417, 0.29100751876831055, 0.0], [-0.1964462399482727, 0.4533303678035736, 0.0], [-0.0423055998980999, 0.37003496289253235, 0.0], [0.08588552474975586, 0.45628270506858826, 0.0], [0.2015760987997055, 0.4162176847457886, 0.0], [0.2826867699623108, 0.249362513422966, 0.0], [0.28335392475128174, 0.07305319607257843, 0.0], [0.28374406695365906, -0.10673530399799347, 0.0], [0.27893155813217163, -0.266580194234848, 0.0], [0.13310439884662628, -3.4630608558654785, 1.0], [0.5852236747741699, 0.17009012401103973, 1.0], [-0.004632430151104927, 3.5397348403930664, 0.0], [0.014414667151868343, -1.7217620611190796, 1.0], [0.45960763096809387, -0.5206285715103149, 0.0], [0.3009394407272339, -0.18888352811336517, 0.0], [0.45121294260025024, -0.009480996988713741, 0.0], [0.30743706226348877, 0.17803917825222015, 0.0], [0.16720432043075562, 0.5307938456535339, 0.0], [0.0011265723733231425, 1.7755725383758545, 0.0], [0.16663946211338043, -3.839038848876953, 1.0], [2.17661452293396, 1.5366756916046143, 1.0], [-0.0020059640519320965, 2.5392632484436035, 0.0], [0.0002717426687013358, -2.006533145904541, 1.0], [-0.29410210251808167, -0.36956077814102173, 0.0], [-0.3011959493160248, -0.183463916182518, 0.0], [-0.4751889407634735, 0.002578646643087268, 0.0], [-0.3289448618888855, 0.18477392196655273, 0.0], [-0.3276170492172241, 0.36393919587135315, 0.0], [-0.1709727942943573, 0.5408506393432617, 0.0], [0.011380518786609173, 0.34664303064346313, 0.0], [0.17459161579608917, 0.5305972099304199, 0.0], [0.3162517547607422, 0.35607898235321045, 0.0], [0.3173031508922577, 0.1811753660440445, 0.0], [0.31141746044158936, -0.006551375612616539, 0.0], [0.30529364943504333, -0.17560306191444397, 0.0], [0.3114517629146576, -0.3247379660606384, 0.0], [0.1574859768152237, -3.394989490509033, 1.0], [0.5560081005096436, 1.4588099718093872, 1.0], [-0.0007300567231141031, 2.48439621925354, 0.0], [0.018855594098567963, -1.5868932008743286, 1.0], [0.47429922223091125, -0.48326465487480164, 0.0], [0.3265976309776306, -0.23976033926010132, 0.0], [0.46235790848731995, -0.005331776570528746, 0.0], [0.31842413544654846, 0.15929357707500458, 0.0], [0.13934238255023956, -1.4763611555099487, 0.0], [1.7181644439697266, 1.162612795829773, 1.0], [0.0043798708356916904, 2.5581042766571045, 0.0], [0.044771064072847366, -2.3671000003814697, 1.0], [-0.2923266589641571, -0.36651989817619324, 0.0], [-0.28932446241378784, -0.18155939877033234, 0.0], [0.34135380387306213, -0.004934357013553381, 0.0], [-0.37657472491264343, 0.12312302738428116, 0.0], [-0.24337390065193176, 0.2914773225784302, 0.0], [-0.19174940884113312, 0.4520646333694458, 0.0], [-0.04547521844506264, 0.3686593770980835, 0.0], [0.08023757487535477, 0.46009203791618347, 0.0], [0.19561932981014252, 0.4161122143268585, 0.0], [0.28537797927856445, 0.2540135383605957, 0.0], [0.28173843026161194, 0.07559838891029358, 0.0], [0.2796669006347656, -0.10501295328140259, 0.0], [0.2813778519630432, -0.263555109500885, 0.0], [0.1363208293914795, -3.4800705909729004, 1.0], [0.5028092861175537, 1.465004801750183, 1.0], [-0.0018126831855624914, 2.4199330806732178, 0.0], [0.01752418465912342, -1.6129134893417358, 1.0], [0.4514278471469879, -0.48931679129600525, 0.0], [0.3115532696247101, -0.236848384141922, 0.0], [0.4475272297859192, -0.007284904830157757, 0.0], [0.3049568235874176, 0.16709332168102264, 0.0], [0.1352650374174118, -1.4680942296981812, 0.0], [1.722924828529358, 1.155534029006958, 1.0], [0.0064063831232488155, 2.5377612113952637, 0.0], [0.048759575933218, -2.373305082321167, 1.0], [-0.29214146733283997, -0.36464083194732666, 0.0], [-0.2829206883907318, -0.18227173388004303, 0.0], [0.33527302742004395, -0.004342484287917614, 0.0], [-0.3791261613368988, 0.12103744596242905, 0.0], [-0.23952676355838776, 0.28884920477867126, 0.0], [-0.19874435663223267, 0.448616087436676, 0.0], [-0.049556367099285126, 0.3698347210884094, 0.0], [0.08342427760362625, 0.4624030590057373, 0.0], [0.19808070361614227, 0.4159381091594696, 0.0], [0.28159621357917786, 0.253193199634552, 0.0], [0.2802562713623047, 0.07662060856819153, 0.0], [0.27686700224876404, -0.1042146310210228, 0.0], [0.2801343500614166, -0.26430240273475647, 0.0], [0.1342223882675171, -3.4719736576080322, 1.0], [0.5682999491691589, 0.16983085870742798, 1.0], [-0.004321504849940538, 3.637791633605957, 0.0], [0.14308811724185944, 0.6193478107452393, 1.0], [0.39333900809288025, 0.1389424055814743, 0.0], [0.28657767176628113, -0.07500164955854416, 0.0], [-1.226770043373108, -2.564281463623047, 1.0], [1.0779633522033691, -0.00031931482953950763, 0.0], [0.31763795018196106, -1.4700329303741455, 1.0], [0.5910022258758545, 0.18813754618167877, 1.0], [0.17791634798049927, 0.24429330229759216, 0.0], [0.1674552857875824, -0.12474384903907776, 0.0], [-0.13835753500461578, -0.19744952023029327, 0.0], [-0.1635858565568924, 0.17376543581485748, 0.0], [0.19850125908851624, 1.296269416809082, 1.0], [0.0009151095291599631, 2.5508689880371094, 0.0], [0.3332074284553528, -3.93599534034729, 1.0], [0.6978740096092224, 1.4685759544372559, 1.0], [-0.004494643770158291, 2.476471424102783, 0.0], [0.015381838195025921, -1.6866943836212158, 1.0], [0.5149563550949097, -0.5071823000907898, 0.0], [0.351340651512146, -0.22946856915950775, 0.0], [0.49488216638565063, -0.002505738288164139, 0.0], [0.33612704277038574, 0.1780981868505478, 0.0], [0.16510680317878723, 0.5380724668502808, 0.0], [-0.0009401303250342607, 1.8141978979110718, 0.0], [0.17516009509563446, -3.917940616607666, 1.0], [2.291773557662964, 1.5786162614822388, 1.0], [-0.00135785061866045, 2.561812400817871, 0.0], [0.0034946275409311056, -2.010075569152832, 1.0], [-0.3033260703086853, -0.37527233362197876, 0.0], [-0.30617204308509827, -0.1854611188173294, 0.0], [-0.49425485730171204, 0.0029614584054797888, 0.0], [-0.33903446793556213, 0.1819729208946228, 0.0], [-0.3298112750053406, 0.36375316977500916, 0.0], [-0.17340774834156036, 0.5402806997299194, 0.0], [0.000962351739872247, 0.3532484769821167, 0.0], [0.17601047456264496, 0.5373622179031372, 0.0], [0.3270280361175537, 0.3637200593948364, 0.0], [0.31973832845687866, 0.18980379402637482, 0.0], [0.49690088629722595, -0.0036558874417096376, 0.0], [0.31893664598464966, -0.18227165937423706, 0.0], [0.3189167082309723, -0.35247910022735596, 0.0], [0.16679726541042328, -3.440697431564331, 1.0], [0.5921222567558289, 1.4829142093658447, 1.0], [-0.001413943711668253, 2.4667000770568848, 0.0], [0.01989247463643551, -1.628040075302124, 1.0], [0.4843798875808716, -0.4883466958999634, 0.0], [0.3370014727115631, -0.24534298479557037, 0.0], [0.47438982129096985, -0.005114338360726833, 0.0], [0.31851306557655334, 0.16302606463432312, 0.0], [0.14477011561393738, -1.4786633253097534, 0.0], [1.762444257736206, 1.1574431657791138, 1.0], [0.006387562956660986, 2.541429042816162, 0.0], [0.05019157752394676, -2.384103775024414, 1.0], [-0.29680827260017395, -0.3667679727077484, 0.0], [-0.29087308049201965, -0.18154801428318024, 0.0], [0.34078770875930786, -0.001993870362639427, 0.0], [-0.3841266334056854, 0.12444985657930374, 0.0], [-0.24400579929351807, 0.28555428981781006, 0.0], [-0.2035239189863205, 0.4548311233520508, 0.0], [-0.05240921303629875, 0.3711087107658386, 0.0], [0.07944107800722122, 0.4643518626689911, 0.0], [0.19716644287109375, 0.4164479970932007, 0.0], [0.279828816652298, 0.2576043903827667, 0.0]], [[2.479614734649658, 1.7258068323135376, 1.0], [-0.23082409799098969, -0.3348664939403534, 0.0], [-0.43538352847099304, -0.16368773579597473, 0.0], [-0.5091692805290222, 0.00018320782692171633, 0.0], [-0.2950865626335144, 0.18150854110717773, 0.0], [-0.256472647190094, 0.3441259562969208, 0.0], [0.051058944314718246, 0.35111987590789795, 0.0], [0.12818951904773712, 0.3878270387649536, 0.0], [0.20038139820098877, 0.4266958236694336, 0.0], [0.2785680592060089, 0.3862959146499634, 0.0], [0.31261005997657776, 0.2128930240869522, 0.0], [0.3090038001537323, 0.03893542289733887, 0.0], [0.29871806502342224, -0.12441933155059814, 0.0], [0.30513495206832886, -0.27182990312576294, 0.0], [0.14998486638069153, -3.3692572116851807, 1.0], [0.49526405334472656, 1.4147614240646362, 1.0], [0.0006397135439328849, 2.3899850845336914, 0.0], [0.020257534459233284, -1.5384591817855835, 1.0], [0.45565998554229736, -0.4667882025241852, 0.0], [0.3137378692626953, -0.22950096428394318, 0.0], [0.4514837861061096, -0.007816478610038757, 0.0], [0.30910345911979675, 0.15702594816684723, 0.0], [0.13779178261756897, -1.4466254711151123, 0.0], [0.47744062542915344, 1.1682530641555786, 1.0], [0.004801072180271149, 2.30246639251709, 0.0], [0.013957289047539234, -1.5843985080718994, 1.0], [0.49287450313568115, -0.47491392493247986, 0.0], [0.3280147612094879, -0.19411487877368927, 0.0], [0.47304022312164307, -0.007498047314584255, 0.0], [0.3215029835700989, 0.17320729792118073, 0.0], [0.16842736303806305, 0.515460193157196, 0.0], [7.052055934764212e-06, 1.738891839981079, 0.0], [0.17287062108516693, -3.781425952911377, 1.0], [2.2234416007995605, 1.512688159942627, 1.0], [-0.003477218560874462, 2.483994245529175, 0.0], [0.0012016873806715012, -1.9843136072158813, 1.0], [-0.3009730279445648, -0.3629440665245056, 0.0], [-0.3060675263404846, -0.17714059352874756, 0.0], [-0.4853276312351227, 0.004839713219553232, 0.0], [-0.3356866240501404, 0.18460527062416077, 0.0], [-0.3201783299446106, 0.36151939630508423, 0.0], [-0.16852807998657227, 0.5328125953674316, 0.0], [0.014536467380821705, 0.34498679637908936, 0.0], [0.185312420129776, 0.5254186391830444, 0.0], [0.3217114508152008, 0.35545381903648376, 0.0], [0.3214806616306305, 0.17920836806297302, 0.0], [0.4910556972026825, -0.00457838224247098, 0.0], [0.32152795791625977, -0.18641236424446106, 0.0], [0.32077208161354065, -0.35690292716026306, 0.0], [0.1658935546875, -3.3649277687072754, 1.0], [0.5794755220413208, 1.4480384588241577, 1.0], [-0.00040092947892844677, 2.430783987045288, 0.0], [0.018353132531046867, -1.5511020421981812, 1.0], [0.47222399711608887, -0.4676743447780609, 0.0], [0.3304043412208557, -0.23535186052322388, 0.0], [0.46530067920684814, -0.003387659089639783, 0.0], [0.3176807165145874, 0.1593697965145111, 0.0], [0.14029894769191742, -1.4670110940933228, 0.0], [1.7938657999038696, 1.1952571868896484, 1.0], [0.005294651258736849, 2.5157418251037598, 0.0], [0.04951225593686104, -2.36631178855896, 1.0], [-0.3037926256656647, -0.3688891530036926, 0.0], [-0.3100525140762329, -0.20828497409820557, 0.0], [0.3402005136013031, -0.0030698170885443687, 0.0], [-0.39245983958244324, 0.11929517239332199, 0.0], [-0.24774320423603058, 0.28538617491722107, 0.0], [-0.20460504293441772, 0.45247116684913635, 0.0], [-0.054836954921483994, 0.3653528392314911, 0.0], [0.08029568940401077, 0.4601265490055084, 0.0], [0.2052038609981537, 0.41097337007522583, 0.0], [0.28628700971603394, 0.2538662850856781, 0.0], [0.28721874952316284, 0.07708696275949478, 0.0], [0.2831895351409912, -0.10416204482316971, 0.0], [0.28443965315818787, -0.2616204023361206, 0.0], [0.13761119544506073, -3.43108868598938, 1.0], [0.5618658065795898, 0.17158354818820953, 1.0], [-0.004022940993309021, 3.5365164279937744, 0.0], [0.14548158645629883, 0.6054763197898865, 1.0], [0.38401395082473755, 0.1404835730791092, 0.0], [0.2882434129714966, -0.07282891869544983, 0.0], [-1.2164306640625, -2.5351550579071045, 1.0], [1.0561292171478271, 0.0005267166998237371, 0.0], [0.31379491090774536, -1.432275652885437, 1.0], [0.6153662204742432, 0.18629351258277893, 1.0], [0.18306228518486023, 0.24785177409648895, 0.0], [0.1664053201675415, -0.12405744194984436, 0.0], [-0.14048315584659576, -0.19988811016082764, 0.0], [-0.15947209298610687, 0.17481189966201782, 0.0], [0.19761329889297485, 1.2868105173110962, 1.0], [0.001622862066142261, 2.480691909790039, 0.0], [0.3425186276435852, -3.8642773628234863, 1.0], [0.6863420009613037, 1.448914647102356, 1.0], [-0.0033264695666730404, 2.366230010986328, 0.0], [0.017489241436123848, -1.5825623273849487, 1.0], [0.5004507303237915, -0.4774686098098755, 0.0], [0.3497202694416046, -0.22141145169734955, 0.0], [0.4959039092063904, -0.002562723821029067, 0.0], [0.32749393582344055, 0.17274560034275055, 0.0], [0.16195449233055115, 0.5324306488037109, 0.0], [-0.0020251839887350798, 1.7731763124465942, 0.0], [0.1719871461391449, -3.858391761779785, 1.0], [2.2739651203155518, 1.5833131074905396, 1.0], [-0.002627546899020672, 2.530059814453125, 0.0], [0.0034660291858017445, -2.0267319679260254, 1.0], [-0.3082166314125061, -0.37029069662094116, 0.0], [-0.3088674545288086, -0.17968635261058807, 0.0], [-0.4909922778606415, 0.004418396390974522, 0.0], [-0.3328324258327484, 0.18679994344711304, 0.0], [-0.3371087610721588, 0.36465075612068176, 0.0], [-0.1753329634666443, 0.5427550077438354, 0.0], [0.008118204772472382, 0.3533148765563965, 0.0], [0.18138137459754944, 0.5358668565750122, 0.0], [0.32179945707321167, 0.36271509528160095, 0.0], [0.3234904408454895, 0.18644478917121887, 0.0], [0.3169117867946625, 0.0024180645123124123, 0.0], [0.3126663565635681, -0.17107348144054413, 0.0], [0.31667444109916687, -0.3196618854999542, 0.0], [0.15919607877731323, -3.4293508529663086, 1.0], [0.5844908356666565, 1.467155933380127, 1.0], [-0.0008550142520107329, 2.5242249965667725, 0.0], [0.01950751803815365, -1.6414647102355957, 1.0], [0.4776909053325653, -0.497238427400589, 0.0], [0.33685752749443054, -0.24872975051403046, 0.0], [0.47160524129867554, -0.004886810667812824, 0.0], [0.3165838122367859, 0.1644512563943863, 0.0], [0.14292269945144653, -1.4658805131912231, 0.0], [1.7518208026885986, 1.119916558265686, 1.0], [0.0046033794060349464, 2.6121158599853516, 0.0], [0.0535055547952652, -2.433478832244873, 1.0], [-0.2953304648399353, -0.3675413131713867, 0.0], [-0.3091753125190735, -0.21062183380126953, 0.0], [0.32806333899497986, -0.003010557033121586, 0.0], [-0.38660097122192383, 0.12008219212293625, 0.0], [-0.24800832569599152, 0.29352250695228577, 0.0], [-0.20047740638256073, 0.46086758375167847, 0.0], [-0.047135964035987854, 0.3682478368282318, 0.0], [0.08478422462940216, 0.4665425717830658, 0.0], [0.20544449985027313, 0.4186646342277527, 0.0], [0.28500309586524963, 0.25540897250175476, 0.0], [0.28536325693130493, 0.07346551865339279, 0.0], [0.28597426414489746, -0.1077885851264, 0.0], [0.28127145767211914, -0.2665835916996002, 0.0], [0.13551867008209229, -3.4612672328948975, 1.0], [0.590360701084137, 0.17108532786369324, 1.0], [-0.003246334381401539, 3.534665822982788, 0.0], [0.1442764550447464, 0.6029064655303955, 1.0], [0.39026886224746704, 0.14481422305107117, 0.0], [0.287870854139328, -0.06561741977930069, 0.0], [-1.2219781875610352, -2.553790330886841, 1.0], [1.0617038011550903, -0.0008251992403529584, 0.0], [0.31162458658218384, -1.4370999336242676, 1.0], [0.5735622048377991, 0.18599797785282135, 1.0], [0.1766493022441864, 0.2509402632713318, 0.0], [0.16763395071029663, -0.12579628825187683, 0.0], [-0.1347929984331131, -0.20002543926239014, 0.0], [-0.16514962911605835, 0.17327798902988434, 0.0], [0.197190523147583, 1.2944742441177368, 1.0], [0.0016151315066963434, 2.540203332901001, 0.0], [0.33962541818618774, -3.900277614593506, 1.0], [0.641789972782135, 1.461864709854126, 1.0], [-0.0037175461184233427, 2.4965128898620605, 0.0], [0.016196781769394875, -1.7316182851791382, 1.0], [0.5102998614311218, -0.5183344483375549, 0.0], [0.34294891357421875, -0.22322191298007965, 0.0], [0.4879908561706543, -0.0031343635637313128, 0.0], [0.32395362854003906, 0.18095901608467102, 0.0], [0.15936297178268433, 0.534026026725769, 0.0], [0.00012889043136965483, 1.8435002565383911, 0.0], [0.17099441587924957, -3.942133903503418, 1.0], [2.2937729358673096, 1.5611701011657715, 1.0], [-0.0031709421891719103, 2.546093702316284, 0.0], [0.0006096734432503581, -2.0121865272521973, 1.0], [-0.3077293336391449, -0.3729088306427002, 0.0], [-0.3111036419868469, -0.18349172174930573, 0.0], [-0.4900696277618408, 0.0050063650123775005, 0.0], [-0.33238041400909424, 0.1862204521894455, 0.0], [-0.33711928129196167, 0.36991551518440247, 0.0], [-0.17066818475723267, 0.5428800582885742, 0.0], [0.011595377698540688, 0.3575740158557892, 0.0], [0.18209710717201233, 0.5330291390419006, 0.0], [0.3250620365142822, 0.35953855514526367, 0.0], [0.32331857085227966, 0.18578773736953735, 0.0], [0.31409913301467896, -0.004867087118327618, 0.0], [0.31488844752311707, -0.1730479598045349, 0.0], [0.31706908345222473, -0.3252619206905365, 0.0], [0.15873196721076965, -3.441319227218628, 1.0], [0.5634891986846924, 1.4693384170532227, 1.0], [0.0003126462106592953, 2.4672305583953857, 0.0], [0.017307966947555542, -1.63491952419281, 1.0], [0.48206448554992676, -0.49095678329467773, 0.0], [0.32492414116859436, -0.23762774467468262, 0.0], [0.4613322615623474, -0.005041136872023344, 0.0], [0.3153342306613922, 0.16532540321350098, 0.0], [0.14278432726860046, -1.4770747423171997, 0.0], [1.65679931640625, 1.1706323623657227, 1.0], [0.0059166778810322285, 2.545680284500122, 0.0], [0.052412040531635284, -2.452467441558838, 1.0], [-0.2914726734161377, -0.37049078941345215, 0.0], [-0.30096879601478577, -0.2111254781484604, 0.0], [0.33389538526535034, -0.0025652546901255846, 0.0], [-0.3783019185066223, 0.12202193588018417, 0.0], [-0.23758330941200256, 0.2942713797092438, 0.0], [-0.19110609591007233, 0.45700016617774963, 0.0], [-0.040115926414728165, 0.37316110730171204, 0.0], [0.08660224080085754, 0.470622718334198, 0.0], [0.2014063447713852, 0.42003875970840454, 0.0], [0.2831871509552002, 0.257287859916687, 0.0], [0.28315916657447815, 0.0769074484705925, 0.0], [0.28261032700538635, -0.10396761447191238, 0.0], [0.2787262797355652, -0.2631039321422577, 0.0], [0.29776933789253235, -0.35596421360969543, 0.0], [0.14120367169380188, -3.325376510620117, 1.0], [0.5883395075798035, 0.17352423071861267, 1.0], [-0.005496330093592405, 3.6441147327423096, 0.0], [0.1468808650970459, 0.6124724745750427, 1.0], [0.38981711864471436, 0.1366569697856903, 0.0], [0.2914462089538574, -0.07046302407979965, 0.0], [-1.2290966510772705, -2.5713930130004883, 1.0], [1.0826927423477173, -0.0010896687163040042, 0.0], [0.31763166189193726, -1.47183096408844, 1.0], [0.607027530670166, 0.18807469308376312, 1.0], [0.18064863979816437, 0.255136638879776, 0.0], [0.16673220694065094, -0.1284133493900299, 0.0], [-0.13388118147850037, -0.19956284761428833, 0.0], [-0.1682204008102417, 0.1741693764925003, 0.0], [0.20014113187789917, 1.2972084283828735, 1.0], [0.00230193417519331, 2.545929431915283, 0.0], [0.34237298369407654, -3.91680908203125, 1.0], [0.6654687523841858, 1.4699492454528809, 1.0], [-0.00483376020565629, 2.432751178741455, 0.0], [0.01750333234667778, -1.6846517324447632, 1.0], [0.5067951083183289, -0.5093482732772827, 0.0], [0.3443191349506378, -0.2208949327468872, 0.0], [0.4917794167995453, -0.0034844032488763332, 0.0]], [[2.478712320327759, 1.7684762477874756, 1.0], [-0.23864880204200745, -0.3414101302623749, 0.0], [-0.4579763412475586, -0.16383478045463562, 0.0], [-0.5140820741653442, 0.003203075146302581, 0.0], [-0.5157400369644165, 0.17791569232940674, 0.0], [-0.21944250166416168, 0.3485136032104492, 0.0], [0.12037595361471176, 0.3389165699481964, 0.0], [0.17866399884223938, 0.4037766456604004, 0.0], [0.23973044753074646, 0.41643357276916504, 0.0], [0.2989790737628937, 0.40407976508140564, 0.0], [0.31662023067474365, 0.2103446125984192, 0.0], [0.30816081166267395, 0.02901318296790123, 0.0], [0.30577901005744934, -0.13750916719436646, 0.0], [0.3072997033596039, -0.2786743938922882, 0.0], [0.15257440507411957, -3.3731727600097656, 1.0], [0.6027644872665405, 0.17111337184906006, 1.0], [-0.0035119529347866774, 3.4360547065734863, 0.0], [0.14940261840820312, 0.5830999612808228, 1.0], [0.4080119729042053, 0.14326532185077667, 0.0], [0.29760128259658813, -0.06787275522947311, 0.0], [-1.2600411176681519, -2.481717586517334, 1.0], [1.0738507509231567, -0.002525282558053732, 0.0], [0.3214908838272095, -1.411594271659851, 1.0], [0.588704526424408, 0.18433043360710144, 1.0], [0.17821824550628662, 0.25558847188949585, 0.0], [0.1652722805738449, -0.12318532168865204, 0.0], [-0.1397298276424408, -0.195280984044075, 0.0], [-0.1603761464357376, 0.17573429644107819, 0.0], [0.1984013319015503, 1.2672282457351685, 1.0], [-2.2156955310492776e-05, 2.454303741455078, 0.0], [0.3468073010444641, -3.7785167694091797, 1.0], [0.6883454322814941, 1.4199855327606201, 1.0], [-0.003974969498813152, 2.401158094406128, 0.0], [0.016705835238099098, -1.6311748027801514, 1.0], [0.5095074772834778, -0.49109041690826416, 0.0], [0.34948548674583435, -0.21833783388137817, 0.0], [0.48965364694595337, -0.003158995881676674, 0.0], [0.3284144699573517, 0.1706169694662094, 0.0], [0.16177618503570557, 0.5289076566696167, 0.0], [0.000460725073935464, 1.7711317539215088, 0.0], [0.17636820673942566, -3.8287370204925537, 1.0], [2.4084603786468506, 1.5496362447738647, 1.0], [-0.0019194958731532097, 2.472801446914673, 0.0], [-0.00012143293861299753, -1.9399096965789795, 1.0], [-0.3128209710121155, -0.362626314163208, 0.0], [-0.3203267753124237, -0.17857922613620758, 0.0], [-0.5075349807739258, 0.004569722805172205, 0.0], [-0.3470402956008911, 0.1873972862958908, 0.0], [-0.33833789825439453, 0.36904701590538025, 0.0], [-0.17641028761863708, 0.5390447378158569, 0.0], [0.0075897411443293095, 0.3560364842414856, 0.0], [0.1844184249639511, 0.5283495187759399, 0.0], [0.33331894874572754, 0.3562052249908447, 0.0], [0.32646021246910095, 0.1844780594110489, 0.0], [0.32697391510009766, 0.0025094235315918922, 0.0], [0.3218825161457062, -0.16199778020381927, 0.0], [0.3192228078842163, -0.3115304112434387, 0.0], [0.15850374102592468, -3.402099847793579, 1.0], [0.5930068492889404, 1.4484540224075317, 1.0], [0.00031650683376938105, 2.5191211700439453, 0.0], [0.014931084588170052, -1.5750422477722168, 1.0], [0.47193583846092224, -0.4775001108646393, 0.0], [0.3295179009437561, -0.24267518520355225, 0.0], [0.46587419509887695, -0.003116472391411662, 0.0], [0.3165808916091919, 0.1581469029188156, 0.0], [0.14233580231666565, -1.4783680438995361, 0.0], [1.785326361656189, 1.1978418827056885, 1.0], [0.0038849706761538982, 2.5398101806640625, 0.0], [0.048334550112485886, -2.3938419818878174, 1.0], [-0.2937025725841522, -0.36675456166267395, 0.0], [-0.3064509332180023, -0.2083042711019516, 0.0], [0.3371885418891907, -0.0021478182170540094, 0.0], [-0.38586345314979553, 0.11865607649087906, 0.0], [-0.2515254318714142, 0.290438175201416, 0.0], [-0.20453040301799774, 0.45074719190597534, 0.0], [-0.05718699470162392, 0.36977335810661316, 0.0], [0.07881785184144974, 0.46319088339805603, 0.0], [0.20685891807079315, 0.4191220998764038, 0.0], [0.2880493700504303, 0.2600652277469635, 0.0], [0.28860917687416077, 0.08333511650562286, 0.0], [0.28438282012939453, -0.09889575839042664, 0.0], [0.28070563077926636, -0.26122012734413147, 0.0], [0.29568934440612793, -0.3594405949115753, 1.0], [0.14096267521381378, -2.8738605976104736, 1.0]], [[2.4766786098480225, 1.7267528772354126, 1.0], [-0.23936700820922852, -0.33870160579681396, 0.0], [-0.4527015686035156, -0.16024868190288544, 0.0], [-0.5174129009246826, 0.00521861994639039, 0.0], [-0.3083055317401886, 0.18731233477592468, 0.0], [-0.23546983301639557, 0.3522518277168274, 0.0], [0.0695376768708229, 0.3534402847290039, 0.0], [0.1297364979982376, 0.38797393441200256, 0.0], [0.20519554615020752, 0.42364758253097534, 0.0], [0.2743343114852905, 0.3845510482788086, 0.0], [0.31284916400909424, 0.20555360615253448, 0.0], [0.3071833848953247, 0.03334729000926018, 0.0], [0.30400803685188293, -0.13053536415100098, 0.0], [0.30198776721954346, -0.27818289399147034, 0.0], [0.1503806710243225, -3.355530023574829, 1.0], [0.5287010073661804, 1.4144694805145264, 1.0], [1.2326677278906573e-06, 2.3308451175689697, 0.0], [0.020958559587597847, -1.5080370903015137, 1.0], [0.4560655355453491, -0.45851826667785645, 0.0], [0.3150824308395386, -0.22397485375404358, 0.0], [0.45038706064224243, -0.00749899260699749, 0.0], [0.30604371428489685, 0.15539485216140747, 0.0], [0.14038944244384766, -1.450360655784607, 0.0], [1.766649842262268, 1.099713683128357, 1.0], [0.005518818739801645, 2.500481128692627, 0.0], [0.04872802272439003, -2.2955076694488525, 1.0], [-0.2887534201145172, -0.351728618144989, 0.0], [-0.3088153004646301, -0.19965295493602753, 0.0], [0.3261040449142456, -0.0017215254483744502, 0.0], [-0.379499226808548, 0.11947029083967209, 0.0], [-0.24783927202224731, 0.28241750597953796, 0.0], [-0.19870874285697937, 0.44390612840652466, 0.0], [-0.04534834250807762, 0.35657089948654175, 0.0], [0.08886127918958664, 0.45067310333251953, 0.0], [0.20812301337718964, 0.4005441665649414, 0.0], [0.28339308500289917, 0.2384941577911377, 0.0], [0.28660526871681213, 0.06582265347242355, 0.0], [0.2844558656215668, -0.10676459223031998, 0.0], [0.2822386920452118, -0.2634175419807434, 0.0], [0.1380806714296341, -3.3798282146453857, 1.0], [0.5675173997879028, 0.16787491738796234, 1.0], [-0.0034799473360180855, 3.5054335594177246, 0.0], [0.14342650771141052, 0.5844130516052246, 1.0], [0.39008599519729614, 0.13102920353412628, 0.0], [0.29324036836624146, -0.08440855890512466, 0.0], [-1.2148303985595703, -2.5096240043640137, 1.0], [1.056780457496643, -0.0010119773214682937, 0.0], [0.3144884705543518, -1.4130102396011353, 1.0], [0.5800658464431763, 0.18436767160892487, 1.0], [0.1767037808895111, 0.25561079382896423, 0.0], [0.1657564640045166, -0.11726928502321243, 0.0], [-0.1339273303747177, -0.19511693716049194, 0.0], [-0.15090198814868927, 0.17846174538135529, 0.0], [0.20250122249126434, 1.2660244703292847, 1.0], [0.00039494389784522355, 2.469794273376465, 0.0], [0.32942259311676025, -3.8415379524230957, 1.0], [0.6787106990814209, 1.428302526473999, 1.0], [-0.002730834763497114, 2.447873115539551, 0.0], [0.015486699528992176, -1.6500557661056519, 1.0], [0.5105066895484924, -0.4979056715965271, 0.0], [0.34667184948921204, -0.2259756475687027, 0.0], [0.49326303601264954, -0.0035993994679301977, 0.0], [0.32367584109306335, 0.1764208823442459, 0.0], [0.15962645411491394, 0.528975248336792, 0.0], [-0.0011456748470664024, 1.7818502187728882, 0.0], [0.17615137994289398, -3.8669891357421875, 1.0], [2.251988172531128, 1.55294668674469, 1.0], [-0.0017964855069294572, 2.4703996181488037, 0.0], [0.0034923586063086987, -1.9915114641189575, 1.0], [-0.3051724433898926, -0.36533111333847046, 0.0], [-0.30859997868537903, -0.18062736093997955, 0.0], [-0.49022841453552246, 0.0044311885721981525, 0.0], [-0.33096054196357727, 0.18078795075416565, 0.0], [-0.3332565724849701, 0.36445000767707825, 0.0], [-0.1754479855298996, 0.5381394028663635, 0.0], [0.003951418213546276, 0.35439103841781616, 0.0], [0.17719203233718872, 0.5301854610443115, 0.0], [0.32273051142692566, 0.35867106914520264, 0.0], [0.3239884078502655, 0.1810530722141266, 0.0], [0.31835290789604187, -0.005385916214436293, 0.0], [0.31056275963783264, -0.17012661695480347, 0.0], [0.3189500868320465, -0.31914082169532776, 0.0], [0.15847066044807434, -3.413574457168579, 1.0], [0.6478945016860962, 0.17635385692119598, 1.0], [-0.004158536437898874, 3.5886409282684326, 0.0], [0.15191450715065002, 0.6075171232223511, 1.0], [0.4094262421131134, 0.14315834641456604, 0.0], [0.306305855512619, -0.06886143982410431, 0.0], [-1.2923624515533447, -2.555234432220459, 1.0], [1.112580418586731, -0.0034644287079572678, 0.0], [0.3301815986633301, -1.4663347005844116, 1.0], [0.5978471040725708, 0.19021323323249817, 1.0], [0.18017525970935822, 0.2504500448703766, 0.0], [0.17245593667030334, -0.12622055411338806, 0.0], [-0.14090225100517273, -0.1986711472272873, 0.0], [-0.1603793352842331, 0.1774182915687561, 0.0], [0.20481272041797638, 1.3002780675888062, 1.0], [0.0007054602028802037, 2.514949321746826, 0.0], [0.33895543217658997, -3.8961758613586426, 1.0], [0.6876665353775024, 1.4509503841400146, 1.0], [-0.003754207631573081, 2.347707509994507, 0.0], [0.02081199176609516, -1.6306215524673462, 1.0], [0.5052281618118286, -0.4899757206439972, 0.0], [0.3438602685928345, -0.21157097816467285, 0.0], [0.4884880483150482, -0.002572431927546859, 0.0], [0.33047425746917725, 0.17687144875526428, 0.0], [0.1618262678384781, 0.5256843566894531, 0.0], [-0.0007328243227675557, 1.7877483367919922, 0.0], [0.174307182431221, -3.878314971923828, 1.0], [2.3281819820404053, 1.582100510597229, 1.0], [-0.0038874661549925804, 2.4930787086486816, 0.0], [0.002638081554323435, -1.9956881999969482, 1.0], [-0.30717357993125916, -0.3636114001274109, 0.0], [-0.3143662214279175, -0.18234685063362122, 0.0], [-0.4998771846294403, 0.0035596229135990143, 0.0], [-0.33645331859588623, 0.1892092376947403, 0.0], [-0.3378438949584961, 0.3720546364784241, 0.0], [-0.17067363858222961, 0.5467435121536255, 0.0], [0.00945459958165884, 0.3553904592990875, 0.0], [0.18282969295978546, 0.5355994701385498, 0.0], [0.32632118463516235, 0.3599900007247925, 0.0], [0.3242054581642151, 0.18547388911247253, 0.0], [0.49539268016815186, -0.0028885849751532078, 0.0], [0.3233661949634552, -0.18452270328998566, 0.0], [0.32695889472961426, -0.3566773235797882, 0.0], [0.1664147675037384, -3.4212660789489746, 1.0], [0.6037527918815613, 1.4709457159042358, 1.0], [-0.0013093574671074748, 2.43501353263855, 0.0], [0.016599155962467194, -1.6103538274765015, 1.0], [0.475026935338974, -0.48495909571647644, 0.0], [0.3275618255138397, -0.23085705935955048, 0.0], [0.4717922508716583, -0.005919067654758692, 0.0], [0.3176957368850708, 0.16334475576877594, 0.0], [0.14260683953762054, -1.4884203672409058, 0.0], [1.6773083209991455, 1.203432559967041, 1.0], [0.005291938316076994, 2.5490007400512695, 0.0], [0.05088668316602707, -2.4420347213745117, 1.0], [-0.2935270071029663, -0.3724249005317688, 0.0], [-0.30437472462654114, -0.21236036717891693, 0.0], [0.3225986063480377, -0.0014553769724443555, 0.0], [-0.3725496828556061, 0.12258085608482361, 0.0], [-0.24274000525474548, 0.2931777536869049, 0.0], [-0.19812259078025818, 0.45804762840270996, 0.0], [-0.0463433638215065, 0.37679100036621094, 0.0], [0.08370515704154968, 0.4613785445690155, 0.0], [0.20153549313545227, 0.4224492013454437, 0.0], [0.2810741662979126, 0.25898241996765137, 0.0], [0.280392050743103, 0.07696148008108139, 0.0], [0.2759052813053131, -0.10677049309015274, 0.0], [0.2792874276638031, -0.2675795257091522, 0.0], [0.2952447235584259, -0.36212512850761414, 0.0], [0.14063017070293427, -3.2920985221862793, 1.0], [0.6168830990791321, 0.17199309170246124, 1.0], [-0.005195685662329197, 3.62705659866333, 0.0], [0.14931409060955048, 0.6100070476531982, 1.0], [0.38933712244033813, 0.13587233424186707, 0.0], [0.29261478781700134, -0.06723954528570175, 0.0], [-1.2455050945281982, -2.5587539672851562, 1.0], [1.0662505626678467, -0.0008768470725044608, 0.0], [0.3197351098060608, -1.4599363803863525, 1.0], [0.5548111796379089, 0.18785753846168518, 1.0], [0.17640143632888794, 0.2523916959762573, 0.0], [0.16766870021820068, -0.1189362183213234, 0.0], [-0.1334398239850998, -0.19984953105449677, 0.0], [-0.16491712629795074, 0.17554964125156403, 0.0], [0.19715076684951782, 1.3004707098007202, 1.0], [0.0024424230214208364, 2.521483898162842, 0.0], [0.3419192433357239, -3.8839423656463623, 1.0], [0.6760095357894897, 1.45569908618927, 1.0], [-0.004232973325997591, 2.4504199028015137, 0.0], [0.016503717750310898, -1.6788928508758545, 1.0], [0.5016276836395264, -0.5030031204223633, 0.0], [0.3388986885547638, -0.2207518368959427, 0.0], [0.4870948791503906, -0.0027826472651213408, 0.0], [0.326723575592041, 0.18133649230003357, 0.0], [0.16360870003700256, 0.532259464263916, 0.0], [0.0009558250312693417, 1.8089238405227661, 0.0], [0.17318452894687653, -3.9063150882720947, 1.0], [2.2899975776672363, 1.5913331508636475, 1.0], [-0.0012021625880151987, 2.5159244537353516, 0.0], [0.0019656375516206026, -2.021582841873169, 1.0], [-0.30355381965637207, -0.37327244877815247, 0.0], [-0.31103184819221497, -0.18341867625713348, 0.0], [-0.49378278851509094, 0.003821541089564562, 0.0], [-0.33762720227241516, 0.18447907269001007, 0.0], [-0.3341977000236511, 0.36903223395347595, 0.0], [-0.17172503471374512, 0.5428961515426636, 0.0], [0.005927853751927614, 0.3515222668647766, 0.0], [0.1772279441356659, 0.5371834635734558, 0.0], [0.3288743793964386, 0.36281657218933105, 0.0], [0.3193964660167694, 0.18601958453655243, 0.0], [0.3172031342983246, -0.001675663166679442, 0.0], [0.310253769159317, -0.16910937428474426, 0.0], [0.31669503450393677, -0.3199462890625, 0.0], [0.15659622848033905, -3.4332990646362305, 1.0], [0.5667200684547424, 1.4789201021194458, 1.0], [-0.0008691752445884049, 2.48020601272583, 0.0], [0.016188010573387146, -1.6188760995864868, 1.0], [0.4810585379600525, -0.4923752248287201, 0.0], [0.32735109329223633, -0.23573002219200134, 0.0], [0.467144250869751, -0.005363681353628635, 0.0], [0.31312885880470276, 0.16261257231235504, 0.0], [0.1414593607187271, -1.4944489002227783, 0.0], [1.7264822721481323, 1.1322752237319946, 1.0], [0.006049706134945154, 2.592613458633423, 0.0], [0.052712418138980865, -2.4143991470336914, 1.0], [-0.2888161242008209, -0.3673076629638672, 0.0], [-0.30535006523132324, -0.2096473127603531, 0.0], [0.33209630846977234, -0.0021335433702915907, 0.0], [-0.3824585974216461, 0.12164395302534103, 0.0], [-0.246333047747612, 0.2918197512626648, 0.0], [-0.20443375408649445, 0.4576786756515503, 0.0], [-0.05599464103579521, 0.37199994921684265, 0.0], [0.07790898531675339, 0.458150178194046, 0.0], [0.19991709291934967, 0.4236251711845398, 0.0], [0.2845328450202942, 0.26355206966400146, 0.0], [0.2830279469490051, 0.0814368948340416, 0.0], [0.2801782786846161, -0.10076473653316498, 0.0], [0.2844802439212799, -0.25973695516586304, 0.0], [0.13570713996887207, -3.511423110961914, 1.0], [0.5934575796127319, 0.17266127467155457, 1.0], [-0.003951547667384148, 3.567410707473755, 0.0], [0.14798521995544434, 0.605138897895813, 1.0], [0.3910287618637085, 0.14384233951568604, 0.0], [0.2883686423301697, -0.07009436935186386, 0.0], [-1.213897466659546, -2.561174154281616, 1.0], [1.0540931224822998, 0.001291142893023789, 0.0], [0.3139585554599762, -1.4435805082321167, 1.0], [0.5682342648506165, 0.1884256899356842, 1.0], [0.1774415522813797, 0.25468575954437256, 0.0], [0.168066143989563, -0.12420637905597687, 0.0], [-0.13366983830928802, -0.19995184242725372, 0.0], [-0.15945635735988617, 0.17752881348133087, 0.0], [0.19499307870864868, 1.304494023323059, 1.0]], [[2.4818830490112305, 1.7181745767593384, 1.0], [-0.22688783705234528, -0.33945614099502563, 0.0], [-0.43652981519699097, -0.1648266315460205, 0.0], [-0.508197546005249, 2.2658761736238375e-05, 0.0], [-0.5014039278030396, 0.17319835722446442, 0.0], [-0.23111321032047272, 0.3429659605026245, 0.0], [0.10794467478990555, 0.3347553312778473, 0.0], [0.16258232295513153, 0.4009262025356293, 0.0], [0.8005793690681458, 0.15981344878673553, 0.0], [0.3256506323814392, 0.14847978949546814, 0.0], [0.2209736406803131, 0.3241885006427765, 0.0], [0.07536938041448593, 0.15770521759986877, 0.0], [-0.07597136497497559, 0.31969553232192993, 0.0], [-0.4880525767803192, 0.15102919936180115, 0.0], [-0.5045715570449829, -0.02322261407971382, 0.0], [-0.5135138630867004, -0.19738107919692993, 0.0], [-0.16294065117835999, -0.3624810576438904, 1.0], [1.9029513597488403, -3.0747880935668945, 1.0], [0.6332741975784302, 0.15654081106185913, 1.0], [-0.0072221411392092705, 3.4634830951690674, 0.0], [0.15927056968212128, 0.5483819246292114, 1.0], [0.42158886790275574, 0.1222115308046341, 0.0], [0.31740328669548035, -0.05801071599125862, 0.0], [-1.299304485321045, -2.4203414916992188, 1.0], [1.1407263278961182, -0.004372559487819672, 0.0], [0.3367376923561096, -1.3964776992797852, 1.0], [0.5887366533279419, 0.1813245713710785, 1.0], [0.18386484682559967, 0.25463250279426575, 0.0], [0.16843779385089874, -0.12456324696540833, 0.0], [-0.139407217502594, -0.19094979763031006, 0.0], [-0.1603522151708603, 0.1763952523469925, 0.0], [0.20424698293209076, 1.2464988231658936, 1.0], [0.001623754040338099, 2.437852382659912, 0.0], [0.3434751629829407, -3.7353298664093018, 1.0], [0.6981722116470337, 1.4021235704421997, 1.0], [-0.0034068827517330647, 2.303633213043213, 0.0], [0.017142124474048615, -1.6040806770324707, 1.0], [0.5142972469329834, -0.4862973988056183, 0.0], [0.34627753496170044, -0.20928259193897247, 0.0], [0.49222174286842346, -0.0038272517267614603, 0.0], [0.3253933787345886, 0.17691190540790558, 0.0], [0.16516661643981934, 0.5111135244369507, 0.0], [-0.00013391533866524696, 1.7528716325759888, 0.0], [0.17454640567302704, -3.774024248123169, 1.0], [2.2452332973480225, 1.5190211534500122, 1.0], [-0.0015484828036278486, 2.4909279346466064, 0.0], [0.0017011906020343304, -1.9663395881652832, 1.0], [-0.3011065125465393, -0.364051878452301, 0.0], [-0.30812010169029236, -0.17805305123329163, 0.0], [-0.48984360694885254, 0.0020956629887223244, 0.0], [-0.3333532512187958, 0.18061092495918274, 0.0], [-0.33260565996170044, 0.35721221566200256, 0.0], [-0.1750929057598114, 0.5334692001342773, 0.0], [0.007789254188537598, 0.3497755527496338, 0.0], [0.18150117993354797, 0.5235090255737305, 0.0], [0.3228667080402374, 0.35390517115592957, 0.0], [0.32080304622650146, 0.18344102799892426, 0.0], [0.3144295811653137, -0.0018432887736707926, 0.0], [0.3137666881084442, -0.16612088680267334, 0.0], [0.31492507457733154, -0.3161836266517639, 0.0], [0.15948669612407684, -3.3698313236236572, 1.0], [0.5644928812980652, 1.4418628215789795, 1.0], [-0.000404901773435995, 2.5282936096191406, 0.0], [0.012963387183845043, -1.591233491897583, 1.0], [0.47035980224609375, -0.4816664457321167, 0.0], [0.3336940407752991, -0.24943971633911133, 0.0], [0.4662884771823883, -0.0056562479585409164, 0.0], [0.31764838099479675, 0.1591692715883255, 0.0], [0.14029811322689056, -1.4670294523239136, 0.0], [1.752040982246399, 1.157358169555664, 1.0], [0.004265605006366968, 2.5727059841156006, 0.0], [0.046552520245313644, -2.393322706222534, 1.0], [-0.2942582964897156, -0.3703339695930481, 0.0], [-0.2887481451034546, -0.18062163889408112, 0.0], [0.3390313684940338, -0.0030791740864515305, 0.0], [-0.38074880838394165, 0.12516222894191742, 0.0], [-0.2403068244457245, 0.2898227870464325, 0.0], [-0.2057836651802063, 0.45367151498794556, 0.0], [-0.05497376620769501, 0.36439988017082214, 0.0], [0.0798804983496666, 0.46066251397132874, 0.0], [0.20425885915756226, 0.4132690727710724, 0.0], [0.28494447469711304, 0.2537522315979004, 0.0], [0.2894798517227173, 0.0741003230214119, 0.0], [0.2841373085975647, -0.10626979172229767, 0.0], [0.28478771448135376, -0.26517653465270996, 0.0], [0.1367456167936325, -3.465264081954956, 1.0], [0.5708503127098083, 0.1718609482049942, 1.0], [-0.004774104803800583, 3.6013355255126953, 0.0], [0.1468401700258255, 0.6105989813804626, 1.0], [0.3893887400627136, 0.13959446549415588, 0.0], [0.2824443578720093, -0.07686589658260345, 0.0], [-1.2148621082305908, -2.5678446292877197, 1.0], [1.0518783330917358, -0.0004045598325319588, 0.0], [0.313100665807724, -1.4627569913864136, 1.0], [0.6130281686782837, 0.18664437532424927, 1.0], [0.18080078065395355, 0.24400532245635986, 0.0], [0.16803590953350067, -0.11568751186132431, 0.0], [-0.13509899377822876, -0.20030423998832703, 0.0], [-0.15980520844459534, 0.17972593009471893, 0.0], [0.20182254910469055, 1.2937209606170654, 1.0], [0.0019405386410653591, 2.523848533630371, 0.0], [0.34134641289711, -3.8963513374328613, 1.0], [0.6912000179290771, 1.4558833837509155, 1.0], [-0.002174753462895751, 2.45500111579895, 0.0], [0.01880071684718132, -1.684977412223816, 1.0], [0.5048908591270447, -0.5105698704719543, 0.0], [0.34283947944641113, -0.2234431356191635, 0.0], [0.4904223382472992, -0.0026042028330266476, 0.0], [0.3266765773296356, 0.17813433706760406, 0.0], [0.15768150985240936, 0.5331328511238098, 0.0], [-0.000522255664691329, 1.8186630010604858, 0.0], [0.17398731410503387, -3.9105019569396973, 1.0], [2.2555203437805176, 1.5803605318069458, 1.0], [-0.0025664332788437605, 2.5182416439056396, 0.0], [0.0002488014579284936, -2.0120797157287598, 1.0], [-0.29831090569496155, -0.3697759807109833, 0.0], [-0.3043285012245178, -0.18188008666038513, 0.0], [-0.48744285106658936, 0.00382980820722878, 0.0], [-0.3320499062538147, 0.18575319647789001, 0.0], [-0.33910664916038513, 0.36825671792030334, 0.0], [-0.17522235214710236, 0.5447155833244324, 0.0], [0.0032029682770371437, 0.35826876759529114, 0.0], [0.17932669818401337, 0.5313781499862671, 0.0], [0.32283055782318115, 0.36077427864074707, 0.0], [0.3250254690647125, 0.18636716902256012, 0.0], [0.4933452606201172, -0.004746495746076107, 0.0], [0.32133927941322327, -0.18368172645568848, 0.0], [0.3207363486289978, -0.3551787734031677, 0.0], [0.16514280438423157, -3.4050347805023193, 1.0], [0.5977197885513306, 1.4708161354064941, 1.0], [-0.0027286913245916367, 2.5134453773498535, 0.0], [0.015763722360134125, -1.6367511749267578, 1.0], [0.4897042512893677, -0.49452322721481323, 0.0], [0.3331080675125122, -0.24437583982944489, 0.0], [0.4640572667121887, -0.004984285216778517, 0.0], [0.31921789050102234, 0.16123685240745544, 0.0], [0.14293421804904938, -1.46934175491333, 0.0], [1.7701390981674194, 1.1622188091278076, 1.0], [0.004627550020813942, 2.5790772438049316, 0.0], [0.0495804138481617, -2.393462657928467, 1.0], [-0.2913767397403717, -0.37084928154945374, 0.0], [-0.28597429394721985, -0.1822756826877594, 0.0], [0.3417084813117981, -0.003926178906112909, 0.0], [-0.38088735938072205, 0.12410788983106613, 0.0], [-0.24299658834934235, 0.29118606448173523, 0.0], [-0.19680240750312805, 0.45600268244743347, 0.0], [-0.041885580867528915, 0.3784843981266022, 0.0], [0.0820285826921463, 0.46252211928367615, 0.0], [0.19635707139968872, 0.42318838834762573, 0.0], [0.28521275520324707, 0.25971508026123047, 0.0], [0.28486377000808716, 0.08235547691583633, 0.0], [0.285491406917572, -0.10024934262037277, 0.0], [0.28469201922416687, -0.26578086614608765, 0.0], [0.29063981771469116, -0.36040928959846497, 1.0], [0.14007124304771423, -2.903114080429077, 1.0]], [[2.493523120880127, 1.7397363185882568, 1.0], [-0.2503270208835602, -0.3362565338611603, 0.0], [-0.44708383083343506, -0.16095970571041107, 0.0], [-0.5152603983879089, 0.003012576140463352, 0.0], [-0.5094943642616272, 0.175307497382164, 0.0], [-0.20823068916797638, 0.3440764844417572, 0.0], [0.10436645895242691, 0.33634355664253235, 0.0], [0.16468288004398346, 0.4023931324481964, 0.0], [0.7996847629547119, 0.1612766832113266, 0.0], [0.3281008005142212, 0.15075771510601044, 0.0], [0.22156044840812683, 0.3307708203792572, 0.0], [0.08087878674268723, 0.15373370051383972, 0.0], [-0.07710398733615875, 0.32883894443511963, 0.0], [-0.4832322299480438, 0.15602736175060272, 0.0], [-0.49766549468040466, -0.02106386050581932, 0.0], [-0.4995821714401245, -0.18877677619457245, 0.0], [2.0258073806762695, -3.4816741943359375, 0.0], [0.7096368074417114, 0.12924018502235413, 1.0], [-0.004572611767798662, 3.384554624557495, 0.0], [0.015329861082136631, -1.659590482711792, 1.0], [0.4949793815612793, -0.5004789233207703, 0.0], [0.3271782696247101, -0.18575289845466614, 0.0], [0.4815675914287567, -0.004941026214510202, 0.0], [0.3253166675567627, 0.17477907240390778, 0.0], [0.17072130739688873, 0.5175191760063171, 0.0], [0.000983818550594151, 1.7355276346206665, 0.0], [0.17388437688350677, -3.787003755569458, 1.0], [2.2394750118255615, 1.523439884185791, 1.0], [-0.0015853381482884288, 2.4103989601135254, 0.0], [0.0024864862207323313, -1.9178799390792847, 1.0], [-0.3028137683868408, -0.35653653740882874, 0.0], [-0.30742570757865906, -0.17796461284160614, 0.0], [-0.48885080218315125, 0.004937043879181147, 0.0], [-0.3354501724243164, 0.1886385679244995, 0.0], [-0.3368033170700073, 0.3621530830860138, 0.0], [-0.16862478852272034, 0.5336480140686035, 0.0], [0.013706889003515244, 0.3458786606788635, 0.0], [0.19128958880901337, 0.5270509123802185, 0.0], [0.32108768820762634, 0.353628545999527, 0.0], [0.31956273317337036, 0.18087083101272583, 0.0], [0.31623294949531555, -0.004363217856734991, 0.0], [0.31270524859428406, -0.1711018979549408, 0.0], [0.31176358461380005, -0.31869691610336304, 0.0], [0.15729504823684692, -3.3768534660339355, 1.0], [0.5703543424606323, 1.448954701423645, 1.0], [-0.0006170222768560052, 2.493541955947876, 0.0], [0.017481157556176186, -1.6175169944763184, 1.0], [0.4684387743473053, -0.48682263493537903, 0.0], [0.3331048786640167, -0.24299554526805878, 0.0], [0.46151790022850037, -0.005572265945374966, 0.0], [0.3155111074447632, 0.16126440465450287, 0.0], [0.1415240317583084, -1.4614499807357788, 0.0], [1.7315796613693237, 1.1384491920471191, 1.0], [0.004264216870069504, 2.550692081451416, 0.0], [0.05014120414853096, -2.365410327911377, 1.0], [-0.2923736274242401, -0.36486494541168213, 0.0], [-0.3045820891857147, -0.20723532140254974, 0.0], [0.330241858959198, -0.004199004732072353, 0.0], [-0.3797270655632019, 0.12122265994548798, 0.0], [-0.24408367276191711, 0.2898417115211487, 0.0], [-0.20125406980514526, 0.4509119987487793, 0.0], [-0.050147950649261475, 0.36691001057624817, 0.0], [0.08338627219200134, 0.45819851756095886, 0.0], [0.20139703154563904, 0.41191715002059937, 0.0], [0.2873530983924866, 0.2514937222003937, 0.0], [0.28688326478004456, 0.0760200098156929, 0.0], [0.28187575936317444, -0.10246995091438293, 0.0], [0.28126123547554016, -0.25961530208587646, 0.0], [0.1361759454011917, -3.4676871299743652, 1.0], [0.5137717127799988, 1.456699013710022, 1.0], [-0.001383419381454587, 2.359686851501465, 0.0], [0.01813732087612152, -1.5292150974273682, 1.0], [0.45057234168052673, -0.46338391304016113, 0.0], [0.30849337577819824, -0.22879497706890106, 0.0], [0.44595158100128174, -0.008039469830691814, 0.0], [0.3088214099407196, 0.1567823886871338, 0.0], [0.1376437097787857, -1.4604054689407349, 0.0], [1.7017631530761719, 1.1423368453979492, 1.0], [0.005643597338348627, 2.541231870651245, 0.0], [0.0511525496840477, -2.3898537158966064, 1.0], [-0.28725409507751465, -0.3650892376899719, 0.0], [-0.2801899313926697, -0.18073081970214844, 0.0], [0.3274763524532318, -0.004370076581835747, 0.0], [-0.3667200207710266, 0.12472202628850937, 0.0], [-0.24111728370189667, 0.2870296835899353, 0.0], [-0.1954926997423172, 0.44637179374694824, 0.0], [-0.04435155540704727, 0.371722012758255, 0.0], [0.08181300014257431, 0.4565665125846863, 0.0], [0.20051541924476624, 0.41907399892807007, 0.0], [0.28258126974105835, 0.2550678551197052, 0.0], [0.28108131885528564, 0.07451236248016357, 0.0], [0.28341707587242126, -0.10565058887004852, 0.0], [0.28379783034324646, -0.26642945408821106, 0.0], [0.1342243254184723, -3.4578535556793213, 0.0], [0.5566913485527039, 0.12535519897937775, 1.0], [-0.007324167061597109, 3.5724129676818848, 0.0], [0.1379948854446411, -3.655055522918701, 1.0], [0.5372304916381836, 0.16149479150772095, 1.0], [-0.0006635527824983001, 3.457352638244629, 0.0], [0.13164879381656647, -3.515038013458252, 1.0], [0.5612659454345703, 0.1598109006881714, 1.0], [0.001300517120398581, 3.402690887451172, 0.0], [0.14408430457115173, 0.6160500049591064, 1.0], [0.4020022451877594, 0.14757101237773895, 0.0], [0.30793923139572144, -0.049217138439416885, 0.0], [-1.2765177488327026, -2.4894907474517822, 1.0], [1.0903350114822388, -0.0034511194098740816, 0.0], [0.3332153558731079, -1.4358251094818115, 1.0], [0.6346670389175415, 0.18179836869239807, 1.0], [0.1825418323278427, 0.2402217537164688, 0.0], [0.16909943521022797, -0.11983393132686615, 0.0], [-0.1419874131679535, -0.19326981902122498, 0.0], [-0.15889424085617065, 0.17651446163654327, 0.0], [0.20130808651447296, 1.282188057899475, 1.0], [0.0011799514759331942, 2.4910690784454346, 0.0], [0.34071820974349976, -3.8558714389801025, 1.0], [2.303284168243408, 1.6673574447631836, 1.0], [-0.00552794523537159, 2.3846235275268555, 0.0], [0.00939149409532547, -2.005408763885498, 1.0], [-0.3130429685115814, -0.36530718207359314, 0.0], [-0.3139529526233673, -0.18122747540473938, 0.0], [-0.5012407898902893, 0.005980540998280048, 0.0], [-0.3396333158016205, 0.19013388454914093, 0.0], [-0.33878451585769653, 0.36693188548088074, 0.0], [-0.16861829161643982, 0.5474980473518372, 0.0], [0.016666781157255173, 0.35015296936035156, 0.0], [0.19140850007534027, 0.533725380897522, 0.0], [0.32694271206855774, 0.3593139946460724, 0.0], [0.32822439074516296, 0.18237294256687164, 0.0], [0.31854066252708435, -0.004509395454078913, 0.0], [0.31596171855926514, -0.16936728358268738, 0.0], [0.3199601173400879, -0.31948837637901306, 0.0], [0.15929058194160461, -3.416571617126465, 1.0], [0.5646630525588989, 1.4582464694976807, 1.0], [-0.001186575391329825, 2.4898276329040527, 0.0], [0.01593243144452572, -1.5889918804168701, 1.0], [0.47462722659111023, -0.48358166217803955, 0.0], [0.32759371399879456, -0.24408487975597382, 0.0], [0.4667508006095886, -0.005321413278579712, 0.0], [0.542312502861023, -0.00927768088877201, 0.0], [0.17364530265331268, -1.4533268213272095, 1.0], [2.2031092643737793, 1.4988532066345215, 1.0], [-0.002281205728650093, 2.3217570781707764, 0.0], [0.01834576204419136, -2.0215864181518555, 1.0], [-0.3058566749095917, -0.3490281105041504, 0.0], [-0.30673205852508545, -0.17576922476291656, 0.0], [-0.5002785325050354, 0.0033062733709812164, 0.0], [-0.345359206199646, 0.1713256984949112, 0.0], [-0.34351783990859985, 0.3479238450527191, 0.0], [-0.1790543496608734, 0.5202259421348572, 0.0], [0.0005659515736624599, 0.34084200859069824, 0.0], [0.17180143296718597, 0.513664186000824, 0.0], [0.32863548398017883, 0.34856176376342773, 0.0], [0.33016249537467957, 0.1848672479391098, 0.0], [0.32257208228111267, 0.006119113881140947, 0.0], [0.31499791145324707, -0.15656277537345886, 0.0], [0.3143358826637268, -0.30193594098091125, 0.0], [0.1607622355222702, -3.3489553928375244, 1.0], [0.5711313486099243, 1.4257910251617432, 1.0], [-0.000186845165444538, 2.4463253021240234, 0.0], [0.01725650578737259, -1.5693475008010864, 1.0], [0.475539892911911, -0.47197797894477844, 0.0], [0.3347017168998718, -0.23294487595558167, 0.0], [0.47077447175979614, -0.00568692572414875, 0.0], [0.3155179023742676, 0.1585688591003418, 0.0], [0.13914479315280914, -1.4518101215362549, 0.0], [1.7856147289276123, 1.162392020225525, 1.0], [0.005176403559744358, 2.5081565380096436, 0.0], [0.0512571856379509, -2.349729537963867, 1.0], [-0.2916838228702545, -0.3621000647544861, 0.0], [-0.2861911952495575, -0.1785462200641632, 0.0], [0.3456171751022339, -0.002053000731393695, 0.0], [-0.3790667653083801, 0.12090552598237991, 0.0], [-0.24148038029670715, 0.2902345359325409, 0.0], [-0.19761063158512115, 0.45099368691444397, 0.0], [-0.05109993740916252, 0.36484065651893616, 0.0], [0.08131721615791321, 0.45861950516700745, 0.0], [0.19687704741954803, 0.4140377342700958, 0.0], [0.28680455684661865, 0.2517557442188263, 0.0], [0.28283435106277466, 0.08033417165279388, 0.0], [0.2790520191192627, -0.09876745939254761, 0.0], [0.2799413502216339, -0.25872957706451416, 0.0], [0.1382291465997696, -3.439002275466919, 1.0], [0.5040441751480103, 1.4553097486495972, 1.0], [-0.0007483084918931127, 2.4470629692077637, 0.0], [0.019140642136335373, -1.6119167804718018, 1.0], [0.4460330009460449, -0.49261632561683655, 0.0], [0.31448888778686523, -0.24987761676311493, 0.0], [0.4444490075111389, -0.008275649510324001, 0.0], [0.3024256229400635, 0.16197043657302856, 0.0], [0.13528482615947723, -1.4601088762283325, 0.0], [1.6830486059188843, 1.1815941333770752, 1.0], [0.005160119850188494, 2.5395913124084473, 0.0], [0.046330198645591736, -2.398961305618286, 1.0], [-0.29009994864463806, -0.36827459931373596, 0.0], [-0.30011868476867676, -0.2089872658252716, 0.0], [0.3238695561885834, -0.003313510213047266, 0.0], [-0.37618914246559143, 0.11937468498945236, 0.0], [-0.23955504596233368, 0.29237061738967896, 0.0], [-0.20152242481708527, 0.4552181363105774, 0.0], [-0.049032580107450485, 0.3732238709926605, 0.0], [0.08239497989416122, 0.45776450634002686, 0.0], [0.1983591765165329, 0.4228801429271698, 0.0], [0.2829003930091858, 0.25860363245010376, 0.0], [0.2815503478050232, 0.08132248371839523, 0.0], [0.2772843539714813, -0.10386873036623001, 0.0], [0.2800653874874115, -0.2631264925003052, 0.0], [0.13283054530620575, -3.4764046669006348, 0.0], [0.5714508891105652, 0.12751345336437225, 1.0], [-0.0065598078072071075, 3.5861644744873047, 0.0], [1.6154747009277344, -2.3883378505706787, 1.0], [-1.5701417922973633, 1.7172539234161377, 0.0], [0.6613283753395081, -0.7897654175758362, 1.0], [1.0874689817428589, 1.4467250108718872, 0.0], [0.15618166327476501, -3.7022292613983154, 1.0], [0.6021436452865601, 0.16973909735679626, 1.0], [0.17796027660369873, 0.19336794316768646, 0.0], [0.17217105627059937, -0.1490262895822525, 0.0], [-0.14462026953697205, -0.19244150817394257, 0.0], [-0.16401566565036774, 0.16678759455680847, 0.0], [0.20233158767223358, 1.277997374534607, 1.0], [0.000958284130319953, 2.480262517929077, 0.0], [0.33748459815979004, -3.8484320640563965, 1.0], [2.3811707496643066, 1.6876440048217773, 1.0], [-0.004982311744242907, 2.353729248046875, 0.0], [0.007598002441227436, -1.9963347911834717, 1.0], [-0.3173278570175171, -0.362577348947525, 0.0], [-0.3200875222682953, -0.18303650617599487, 0.0], [-0.50431227684021, 0.005381930153816938, 0.0], [-0.34189480543136597, 0.18930156528949738, 0.0], [-0.3397831618785858, 0.36827370524406433, 0.0], [-0.16948425769805908, 0.5445138812065125, 0.0], [0.012493382208049297, 0.35650762915611267, 0.0], [0.18818055093288422, 0.5313445925712585, 0.0]], [[2.4455552101135254, 1.7278931140899658, 1.0], [-0.25732097029685974, -0.3358232378959656, 0.0], [-0.4538230299949646, -0.15992166101932526, 0.0], [-0.5138430595397949, 0.004716034047305584, 0.0], [-0.5100792050361633, 0.17995436489582062, 0.0], [-0.22619491815567017, 0.35191863775253296, 0.0], [0.1064608171582222, 0.3303864598274231, 0.0], [0.3189696669578552, 0.16689598560333252, 0.0], [0.821326494216919, 0.17039678990840912, 0.0], [0.3199727237224579, 0.1744486689567566, 0.0], [0.1802201271057129, 0.31814977526664734, 0.0], [0.037708722054958344, 0.19134041666984558, 0.0], [-0.10201695561408997, 0.3166305720806122, 0.0], [-0.49004316329956055, 0.14837142825126648, 0.0], [-0.5077850222587585, -0.02565165050327778, 0.0], [-0.5235164165496826, -0.19795498251914978, 0.0], [-0.17454278469085693, -0.35916373133659363, 0.0], [2.0481274127960205, -3.185431718826294, 1.0], [0.7157511711120605, 0.16742630302906036, 1.0], [-0.00552367651835084, 3.42751145362854, 0.0], [0.15350092947483063, 0.5704100728034973, 1.0], [0.4287455081939697, 0.13213415443897247, 0.0], [0.3168334662914276, -0.061003196984529495, 0.0], [-1.3151240348815918, -2.4282567501068115, 1.0], [1.1303281784057617, -0.005777026992291212, 0.0], [0.34424689412117004, -1.3840715885162354, 1.0], [0.6449598073959351, 0.17885588109493256, 1.0], [0.18801389634609222, 0.23849886655807495, 0.0], [0.1598518192768097, -0.16897797584533691, 0.0], [-0.1529710739850998, -0.18662913143634796, 0.0], [-0.17027953267097473, 0.16236914694309235, 0.0], [0.19785495102405548, 1.2541824579238892, 1.0], [0.0005201957537792623, 2.434119701385498, 0.0], [0.34857913851737976, -3.7311460971832275, 1.0], [0.688183069229126, 1.4026719331741333, 1.0], [-0.002799475798383355, 2.311318874359131, 0.0], [0.018218090757727623, -1.5900503396987915, 1.0], [0.5081815719604492, -0.47724270820617676, 0.0], [0.33706459403038025, -0.19714362919330597, 0.0], [0.49014315009117126, -0.0037312344647943974, 0.0], [0.32874777913093567, 0.17343641817569733, 0.0], [0.16889554262161255, 0.5153331160545349, 0.0], [0.000720576208550483, 1.74541437625885, 0.0], [0.1788446456193924, -3.7791545391082764, 1.0], [2.2496211528778076, 1.5614248514175415, 1.0], [-0.0033642391208559275, 2.446449041366577, 0.0], [0.003817811142653227, -1.9693810939788818, 1.0], [-0.30023249983787537, -0.3637436032295227, 0.0], [-0.31013235449790955, -0.1802053451538086, 0.0], [-0.4912164807319641, 0.0032245975453406572, 0.0], [-0.338760107755661, 0.18415910005569458, 0.0], [-0.33660054206848145, 0.36094146966934204, 0.0], [-0.1737787425518036, 0.5346168279647827, 0.0], [0.009483934380114079, 0.34808608889579773, 0.0], [0.18515536189079285, 0.5264499187469482, 0.0], [0.3210544288158417, 0.35560327768325806, 0.0], [0.3210703730583191, 0.1828923523426056, 0.0], [0.31851813197135925, -0.0008970504277385771, 0.0], [0.3107580840587616, -0.16509787738323212, 0.0], [0.31654879450798035, -0.3149469792842865, 0.0], [0.1581515222787857, -3.3695437908172607, 1.0], [0.5721978545188904, 1.4461405277252197, 1.0], [-0.0018596976296976209, 2.3900041580200195, 0.0], [0.018292337656021118, -1.5068219900131226, 1.0], [0.46857985854148865, -0.4521408677101135, 0.0], [0.3298531174659729, -0.23806142807006836, 0.0], [0.46078330278396606, -0.0045898896642029285, 0.0], [0.31386324763298035, 0.15596167743206024, 0.0], [0.14037874341011047, -1.4850869178771973, 0.0], [1.7316325902938843, 1.1161611080169678, 1.0], [0.0049967085942626, 2.5625545978546143, 0.0], [0.05339691415429115, -2.370156764984131, 1.0], [-0.2934216558933258, -0.36195141077041626, 0.0], [-0.3057374656200409, -0.20680610835552216, 0.0], [0.3302232027053833, -0.004509763792157173, 0.0], [-0.37733474373817444, 0.12160196155309677, 0.0], [-0.24308671057224274, 0.2855558693408966, 0.0], [-0.19892556965351105, 0.44574815034866333, 0.0], [-0.0459318608045578, 0.36913833022117615, 0.0], [0.08409961313009262, 0.4571642279624939, 0.0], [0.20641668140888214, 0.40874162316322327, 0.0], [0.28469347953796387, 0.24874085187911987, 0.0], [0.2860763967037201, 0.06872774660587311, 0.0], [0.27821260690689087, -0.10425299406051636, 0.0], [0.285836786031723, -0.26575973629951477, 0.0], [0.1337636262178421, -3.436854362487793, 1.0], [0.5030067563056946, 1.4611059427261353, 1.0], [-0.0011770172277465463, 2.415400743484497, 0.0], [0.02058570832014084, -1.5694397687911987, 1.0], [0.44376468658447266, -0.47515395283699036, 0.0], [0.3088993728160858, -0.23930390179157257, 0.0], [0.4452621042728424, -0.007485414855182171, 0.0], [0.3018057942390442, 0.16049619019031525, 0.0], [0.13382205367088318, -1.4807111024856567, 0.0], [1.6919301748275757, 1.1394503116607666, 1.0], [0.00492728129029274, 2.585066795349121, 0.0], [0.04679853469133377, -2.379713296890259, 1.0], [-0.28297659754753113, -0.3660666346549988, 0.0], [-0.29595333337783813, -0.20991745591163635, 0.0], [0.32167038321495056, -0.0022483954671770334, 0.0], [-0.3781611919403076, 0.12279003113508224, 0.0], [-0.23912279307842255, 0.28806692361831665, 0.0], [-0.20423921942710876, 0.45084166526794434, 0.0], [-0.049569614231586456, 0.3646509051322937, 0.0], [0.08352561295032501, 0.46352869272232056, 0.0], [0.2017393410205841, 0.4162980318069458, 0.0], [0.28264230489730835, 0.2542062997817993, 0.0], [0.28874289989471436, 0.07691874355077744, 0.0], [0.28051385283470154, -0.1038345992565155, 0.0], [0.2782987058162689, -0.26279887557029724, 0.0], [0.1358969509601593, -3.45013427734375, 1.0], [0.4972144067287445, 1.4570419788360596, 1.0], [-0.0015093280235305429, 2.4458930492401123, 0.0], [0.01867762580513954, -1.5720906257629395, 1.0], [0.44541993737220764, -0.4796048700809479, 0.0], [0.3036995530128479, -0.22954006493091583, 0.0], [0.4363735020160675, -0.007474875543266535, 0.0], [0.3054082989692688, 0.15926982462406158, 0.0], [0.1374572068452835, -1.4976288080215454, 0.0], [1.700498342514038, 1.1321913003921509, 1.0], [0.005208373069763184, 2.6158483028411865, 0.0], [0.047140028327703476, -2.3928074836730957, 1.0], [-0.289554625749588, -0.3697322905063629, 0.0], [-0.2993756830692291, -0.20990529656410217, 0.0], [0.3247860074043274, -0.003118337830528617, 0.0], [-0.3744947910308838, 0.12226714193820953, 0.0], [-0.24328289926052094, 0.28898367285728455, 0.0], [-0.19503864645957947, 0.44958221912384033, 0.0], [-0.04425254091620445, 0.37298765778541565, 0.0], [0.08223919570446014, 0.45730873942375183, 0.0], [0.2007298618555069, 0.41994309425354004, 0.0], [0.2780954837799072, 0.2585701644420624, 0.0], [0.28420332074165344, 0.07903356850147247, 0.0], [0.2829579710960388, -0.10531003773212433, 0.0], [0.2827417552471161, -0.2657633125782013, 0.0], [0.2937681972980499, -0.36175480484962463, 1.0], [0.13928110897541046, -2.894831895828247, 1.0]], [[2.457540988922119, 1.7352409362792969, 1.0], [-0.23938098549842834, -0.34089016914367676, 0.0], [-0.41990014910697937, -0.16257861256599426, 0.0], [-0.5092050433158875, -0.0017168937483802438, 0.0], [-0.5057920813560486, 0.17496053874492645, 0.0], [-0.22738832235336304, 0.34689122438430786, 0.0], [0.0976683646440506, 0.33373987674713135, 0.0], [0.16154998540878296, 0.39927399158477783, 0.0], [0.7987399101257324, 0.16159652173519135, 0.0], [0.3232797682285309, 0.15367931127548218, 0.0], [0.2153719961643219, 0.326355904340744, 0.0], [0.07535460591316223, 0.162626251578331, 0.0], [-0.07396963238716125, 0.3219635486602783, 0.0], [-0.48535552620887756, 0.14783409237861633, 0.0], [-0.49856218695640564, -0.025608200579881668, 0.0], [-0.5142640471458435, -0.19813844561576843, 0.0], [2.026270627975464, -3.434025764465332, 0.0], [0.6972132921218872, 0.12575921416282654, 1.0], [-0.006140530109405518, 3.241703987121582, 0.0], [0.14154228568077087, 0.6006520390510559, 1.0], [0.4163912236690521, 0.15185710787773132, 0.0], [0.3210780620574951, -0.05930586904287338, 0.0], [-1.3063180446624756, -2.410149097442627, 1.0], [1.1162596940994263, -0.0053987326100468636, 0.0], [0.3363918960094452, -1.3819321393966675, 1.0], [0.6035398840904236, 0.18076258897781372, 1.0], [0.18242767453193665, 0.23596864938735962, 0.0], [0.16950112581253052, -0.11848556995391846, 0.0], [-0.14397412538528442, -0.19181908667087555, 0.0], [-0.1578340232372284, 0.17222020030021667, 0.0], [0.20469839870929718, 1.2484467029571533, 1.0], [0.001321291085332632, 2.4575719833374023, 0.0], [0.3434145450592041, -3.764711618423462, 1.0], [0.6795961260795593, 1.4144262075424194, 1.0], [-0.003701060311868787, 2.4351866245269775, 0.0], [0.0161328986287117, -1.6248867511749268, 1.0], [0.5075181126594543, -0.49259617924690247, 0.0], [0.3472537696361542, -0.22576266527175903, 0.0], [0.4900446832180023, -0.0031242885161191225, 0.0], [0.328342467546463, 0.17243105173110962, 0.0], [0.16367901861667633, 0.5252757668495178, 0.0], [-0.0006727157742716372, 1.7670892477035522, 0.0], [0.17406712472438812, -3.815729856491089, 1.0], [0.6464009881019592, 0.16489887237548828, 1.0], [-0.003088810481131077, 3.565443515777588, 0.0], [0.15313415229320526, 0.6107974648475647, 1.0], [0.4178340435028076, 0.13939161598682404, 0.0], [0.31772106885910034, -0.05491805076599121, 0.0], [-1.3041374683380127, -2.515920400619507, 1.0], [1.1422494649887085, -0.0036114135291427374, 0.0], [0.33749067783355713, -1.4368155002593994, 1.0], [0.5784799456596375, 0.18409061431884766, 1.0], [0.1810726374387741, 0.25333017110824585, 0.0], [0.15463685989379883, -0.17336072027683258, 0.0], [-0.14645321667194366, -0.195302352309227, 0.0], [-0.16503417491912842, 0.17210982739925385, 0.0], [0.20197950303554535, 1.2882370948791504, 1.0], [0.0002468174498062581, 2.5082590579986572, 0.0], [0.34418854117393494, -3.8842060565948486, 1.0], [0.676550567150116, 1.4452500343322754, 1.0], [-0.002796208020299673, 2.3643739223480225, 0.0], [0.022905101999640465, -1.6459579467773438, 1.0], [0.4976445138454437, -0.49505695700645447, 0.0], [0.3392670750617981, -0.20904825627803802, 0.0], [0.4943288266658783, -0.004157704301178455, 0.0], [0.3255290985107422, 0.17677634954452515, 0.0], [0.16090618073940277, 0.5257426500320435, 0.0], [0.00047584567801095545, 1.7808281183242798, 0.0], [0.17239168286323547, -3.8644535541534424, 1.0], [2.290313482284546, 1.578011393547058, 1.0], [-0.0031159836798906326, 2.4982736110687256, 0.0], [0.0012461673468351364, -1.9830960035324097, 1.0], [-0.30253472924232483, -0.3729567229747772, 0.0], [-0.31012722849845886, -0.18097388744354248, 0.0], [-0.4939039945602417, 0.005378865636885166, 0.0], [-0.3331213593482971, 0.1892193704843521, 0.0], [-0.32687169313430786, 0.37085652351379395, 0.0], [-0.1731584519147873, 0.5457016825675964, 0.0], [-0.0003405141760595143, 0.35529640316963196, 0.0], [0.1772112250328064, 0.5361190438270569, 0.0], [0.3223264515399933, 0.36399611830711365, 0.0], [0.3219010829925537, 0.1861460655927658, 0.0], [0.3184692859649658, 0.0004448277468327433, 0.0], [0.30938705801963806, -0.16908085346221924, 0.0], [0.3144189715385437, -0.3220776319503784, 0.0], [0.1565200835466385, -3.4265830516815186, 1.0], [0.5664716362953186, 1.4728585481643677, 1.0], [0.00031567580299451947, 2.4245193004608154, 0.0], [0.017824066802859306, -1.5901893377304077, 1.0], [0.47066545486450195, -0.4780432879924774, 0.0], [0.3298605680465698, -0.23566481471061707, 0.0], [0.46546831727027893, -0.005252605304121971, 0.0], [0.3162168562412262, 0.16161906719207764, 0.0], [0.1405988186597824, -1.4744131565093994, 0.0], [1.7680106163024902, 1.1763834953308105, 1.0], [0.00563731137663126, 2.5527524948120117, 0.0], [0.04856514185667038, -2.3772635459899902, 1.0], [-0.29709240794181824, -0.36776822805404663, 0.0], [-0.3042028546333313, -0.20907747745513916, 0.0], [0.32983481884002686, -0.0014362974325194955, 0.0], [-0.3863372206687927, 0.12161802500486374, 0.0], [-0.2463197410106659, 0.29142677783966064, 0.0], [-0.20542652904987335, 0.4539162218570709, 0.0], [-0.05452840402722359, 0.3739241361618042, 0.0], [0.08032692223787308, 0.46388325095176697, 0.0], [0.20121993124485016, 0.4216764569282532, 0.0], [0.28758957982063293, 0.25911420583724976, 0.0], [0.287952721118927, 0.08442123979330063, 0.0], [0.27757519483566284, -0.09866270422935486, 0.0], [0.2802557349205017, -0.2608514130115509, 0.0], [0.3002004027366638, -0.35830265283584595, 1.0], [0.14041820168495178, -2.8847389221191406, 1.0], [0.5312395691871643, 0.14727698266506195, 1.0], [0.17965348064899445, 0.2720271348953247, 0.0], [0.15767331421375275, -0.16124241054058075, 0.0], [-0.12177260220050812, -0.19495943188667297, 0.0], [-0.14629867672920227, 0.16943536698818207, 0.0], [0.19150063395500183, 1.2255064249038696, 1.0], [-2.1454497982631437e-06, 2.4083025455474854, 0.0], [0.31885507702827454, -3.699496030807495, 1.0], [2.2226362228393555, 1.6615842580795288, 1.0], [-0.003087793244048953, 2.3052613735198975, 0.0], [0.007257000543177128, -1.9901127815246582, 1.0], [-0.30979597568511963, -0.3545117676258087, 0.0], [-0.3096672296524048, -0.18109138309955597, 0.0], [-0.4899663031101227, 0.00435206014662981, 0.0], [-0.3432818055152893, 0.18285895884037018, 0.0], [-0.33506327867507935, 0.3575722873210907, 0.0], [-0.17731595039367676, 0.5298795700073242, 0.0], [0.007110669277608395, 0.34826555848121643, 0.0], [0.17713434994220734, 0.5207814574241638, 0.0], [0.32762837409973145, 0.3517194390296936, 0.0], [0.32865843176841736, 0.18423037230968475, 0.0], [0.5005719661712646, -0.0038850654382258654, 0.0], [0.3222985863685608, -0.1812511831521988, 0.0], [0.3262670040130615, -0.34984922409057617, 0.0], [0.1645660102367401, -3.3655011653900146, 1.0], [0.5957621335983276, 1.4655767679214478, 1.0], [-0.0015725228004157543, 2.4812982082366943, 0.0], [0.01551929209381342, -1.5940985679626465, 1.0], [0.4774414002895355, -0.4820381999015808, 0.0], [0.334769606590271, -0.24254658818244934, 0.0], [0.46470731496810913, -0.004631983581930399, 0.0], [0.3182748258113861, 0.1567220389842987, 0.0], [0.1449584662914276, -1.4791392087936401, 0.0], [1.6719106435775757, 1.1514055728912354, 1.0], [0.00608401233330369, 2.560654640197754, 0.0], [0.04777073487639427, -2.4128060340881348, 1.0], [-0.2904358506202698, -0.3695678412914276, 0.0], [-0.30257493257522583, -0.21029499173164368, 0.0], [0.33040016889572144, -0.004287674091756344, 0.0], [-0.37816914916038513, 0.1204119473695755, 0.0], [-0.24113024771213531, 0.28385016322135925, 0.0], [-0.196369931101799, 0.45128926634788513, 0.0], [-0.04351789876818657, 0.3716248869895935, 0.0], [0.08501174300909042, 0.458363801240921, 0.0], [0.20249640941619873, 0.4178627133369446, 0.0], [0.28535348176956177, 0.25427788496017456, 0.0], [0.28266242146492004, 0.07737717777490616, 0.0], [0.28495004773139954, -0.10370250791311264, 0.0], [0.28224441409111023, -0.2633141577243805, 0.0], [0.13460904359817505, -3.4841907024383545, 1.0], [0.5909349322319031, 0.1706981658935547, 1.0], [-0.005102098919451237, 3.6086666584014893, 0.0], [0.14295853674411774, 0.6134679317474365, 1.0], [0.3898487687110901, 0.1409934163093567, 0.0], [0.28949278593063354, -0.06590026617050171, 0.0], [-1.2222659587860107, -2.564225673675537, 1.0], [1.064592719078064, -0.00013724080054089427, 0.0], [0.3175913989543915, -1.4575648307800293, 1.0], [0.6084960103034973, 0.18627268075942993, 1.0], [0.17758330702781677, 0.22993844747543335, 0.0], [0.16955526173114777, -0.11564651876688004, 0.0], [-0.14002129435539246, -0.19776847958564758, 0.0], [-0.16184981167316437, 0.17189496755599976, 0.0], [0.20486097037792206, 1.2911436557769775, 1.0], [0.001285762176848948, 2.544940233230591, 0.0], [0.3338356614112854, -3.9221351146698, 1.0], [0.6912570595741272, 1.4679468870162964, 1.0], [-0.0032362753991037607, 2.445168972015381, 0.0], [0.01858103647828102, -1.646165370941162, 1.0], [0.5090888738632202, -0.4931847155094147, 0.0], [0.35141831636428833, -0.2215494066476822, 0.0], [0.4964379370212555, -0.0038044294342398643, 0.0], [0.3323012590408325, 0.17703497409820557, 0.0], [0.1632603108882904, 0.5342973470687866, 0.0], [-0.00020393566228449345, 1.7924853563308716, 0.0], [0.17228777706623077, -3.8889000415802, 1.0], [2.303730010986328, 1.6393224000930786, 1.0], [-0.0032112973276525736, 2.486680507659912, 0.0], [-0.0030141263268887997, -1.9854252338409424, 1.0], [-0.309354692697525, -0.3697555363178253, 0.0], [-0.31156641244888306, -0.18266664445400238, 0.0], [-0.4981541931629181, 0.003446547780185938, 0.0], [-0.3314802348613739, 0.1887214481830597, 0.0], [-0.3389541506767273, 0.3665260374546051, 0.0], [-0.17025676369667053, 0.5477696061134338, 0.0], [0.011056310497224331, 0.35466527938842773, 0.0], [0.1819554567337036, 0.541774332523346, 0.0], [0.3270314335823059, 0.3636578619480133, 0.0], [0.3240474462509155, 0.18868529796600342, 0.0], [0.5012735724449158, -0.0036829570308327675, 0.0], [0.3159804344177246, -0.18094980716705322, 0.0], [0.328222393989563, -0.3529849648475647, 0.0], [0.16473998129367828, -3.4333088397979736, 1.0], [0.5934799313545227, 1.4741536378860474, 1.0], [-0.0008546040044166148, 2.5200321674346924, 0.0], [0.017273085191845894, -1.6279146671295166, 1.0], [0.4850127398967743, -0.49112218618392944, 0.0], [0.3311619758605957, -0.24181458353996277, 0.0], [0.47305431962013245, -0.0036508734337985516, 0.0], [0.31666886806488037, 0.16453388333320618, 0.0], [0.14122265577316284, -1.475214958190918, 0.0], [1.8386586904525757, 1.1675424575805664, 1.0], [0.005414055194705725, 2.6172122955322266, 0.0], [0.04681886360049248, -2.3819258213043213, 1.0], [-0.2996181547641754, -0.3679042160511017, 0.0], [-0.29293403029441833, -0.18286341428756714, 0.0], [0.3406605124473572, -0.0013290861388668418, 0.0], [-0.3828376829624176, 0.12541083991527557, 0.0], [-0.2515812814235687, 0.29508134722709656, 0.0], [-0.20283420383930206, 0.45776093006134033, 0.0], [-0.052559804171323776, 0.3662993609905243, 0.0], [0.08183527737855911, 0.4680376350879669, 0.0], [0.20429401099681854, 0.4210127890110016, 0.0], [0.29071107506752014, 0.26036667823791504, 0.0], [0.2865377962589264, 0.08422774821519852, 0.0], [0.2762376368045807, -0.09638035297393799, 0.0], [0.28379708528518677, -0.2561782896518707, 0.0], [0.13545066118240356, -3.5078485012054443, 1.0], [0.5158549547195435, 1.4776445627212524, 1.0], [-0.0009418256813660264, 2.4091694355010986, 0.0], [0.02085542492568493, -1.5461137294769287, 1.0], [0.44345900416374207, -0.46758049726486206, 0.0]], [[2.484856128692627, 1.7276421785354614, 1.0], [-0.2561226189136505, -0.33664482831954956, 0.0], [-0.47042834758758545, -0.1601361781358719, 0.0], [-0.5174815654754639, 0.00765308877453208, 0.0], [-0.29462704062461853, 0.19679659605026245, 0.0], [-0.23527538776397705, 0.35809704661369324, 0.0], [0.07959020137786865, 0.35499051213264465, 0.0], [0.13969220221042633, 0.39511996507644653, 0.0], [0.21598803997039795, 0.4307630658149719, 0.0], [0.28653356432914734, 0.3848852217197418, 0.0], [0.3115841746330261, 0.2015102058649063, 0.0], [0.30688557028770447, 0.02749001793563366, 0.0], [0.29808309674263, -0.136017307639122, 0.0], [0.3042360842227936, -0.28405141830444336, 0.0], [0.14811328053474426, -3.348114252090454, 1.0], [0.5257024168968201, 1.4138256311416626, 1.0], [-0.00159389094915241, 2.3844454288482666, 0.0], [0.020179208368062973, -1.5262271165847778, 1.0], [0.46256962418556213, -0.46158576011657715, 0.0], [0.3174645006656647, -0.22693940997123718, 0.0], [0.4583074152469635, -0.00818912498652935, 0.0], [0.3115878403186798, 0.1550249457359314, 0.0], [0.13823074102401733, -1.4462835788726807, 0.0], [1.7931464910507202, 1.0944668054580688, 1.0], [0.00563081493601203, 2.5484580993652344, 0.0], [0.05048639699816704, -2.3033549785614014, 1.0], [-0.2924532890319824, -0.35958513617515564, 0.0], [-0.2885493338108063, -0.17722705006599426, 0.0], [0.3302038311958313, -0.0028858627192676067, 0.0], [-0.37897762656211853, 0.12580439448356628, 0.0], [-0.24692527949810028, 0.28526386618614197, 0.0], [-0.20348289608955383, 0.4412359893321991, 0.0], [-0.0490843690931797, 0.36201590299606323, 0.0], [0.08635388314723969, 0.4465106725692749, 0.0], [0.20537571609020233, 0.4094384014606476, 0.0], [0.28541502356529236, 0.24654076993465424, 0.0], [0.28439462184906006, 0.07738101482391357, 0.0], [0.2778121531009674, -0.09716763347387314, 0.0], [0.28049999475479126, -0.25364264845848083, 0.0], [0.13503165543079376, -3.4240589141845703, 1.0], [0.6065722107887268, 0.16769033670425415, 1.0], [-0.00215788627974689, 3.5496339797973633, 0.0], [0.14702503383159637, 0.5985645055770874, 1.0], [0.37876251339912415, 0.14129823446273804, 0.0], [0.29169604182243347, -0.07414589822292328, 0.0], [-1.2216598987579346, -2.527986526489258, 1.0], [1.0642585754394531, -0.0016731382347643375, 0.0], [0.31417006254196167, -1.4403759241104126, 1.0], [0.5950911045074463, 0.18620051443576813, 1.0], [0.17979997396469116, 0.24157845973968506, 0.0], [0.16981765627861023, -0.11950886994600296, 0.0], [-0.136873260140419, -0.19611157476902008, 0.0], [-0.15745960175991058, 0.18307940661907196, 0.0], [0.20070524513721466, 1.2834539413452148, 1.0], [0.001614087144844234, 2.5130486488342285, 0.0], [0.33809399604797363, -3.8613667488098145, 1.0], [2.2951102256774902, 1.6813151836395264, 1.0], [-0.005665402859449387, 2.340277910232544, 0.0], [0.009655436500906944, -2.007497787475586, 1.0], [-0.312698632478714, -0.36368146538734436, 0.0], [-0.3128182291984558, -0.18397414684295654, 0.0], [-0.5004940629005432, 0.005442651454359293, 0.0], [-0.3400172293186188, 0.18412260711193085, 0.0], [-0.34351620078086853, 0.36366868019104004, 0.0], [-0.16992740333080292, 0.5436898469924927, 0.0], [0.005448821932077408, 0.3492351174354553, 0.0], [0.17839808762073517, 0.5281514525413513, 0.0], [0.32650941610336304, 0.35728833079338074, 0.0], [0.3277708888053894, 0.18339338898658752, 0.0], [0.3219369947910309, 0.002554425038397312, 0.0], [0.31333425641059875, -0.16172806918621063, 0.0], [0.3187524080276489, -0.3135795593261719, 0.0], [0.15972954034805298, -3.3909332752227783, 1.0], [0.5793372988700867, 1.4504849910736084, 1.0], [-0.0005269202520139515, 2.408191680908203, 0.0], [0.01657753437757492, -1.5465000867843628, 1.0], [0.4694911241531372, -0.46460700035095215, 0.0], [0.329272598028183, -0.2349099963903427, 0.0], [0.46486803889274597, -0.00517939543351531, 0.0], [0.3146407902240753, 0.1581796556711197, 0.0], [0.1425374150276184, -1.4883445501327515, 0.0], [1.7041845321655273, 1.1658248901367188, 1.0], [0.004217901732772589, 2.5287837982177734, 0.0], [0.054586827754974365, -2.396848201751709, 1.0], [-0.28825920820236206, -0.36517876386642456, 0.0], [-0.30398082733154297, -0.2067769169807434, 0.0], [0.3348522484302521, -0.004852268844842911, 0.0], [-0.3817993402481079, 0.11930223554372787, 0.0], [-0.239956796169281, 0.28786665201187134, 0.0], [-0.20079025626182556, 0.45004260540008545, 0.0], [-0.052348844707012177, 0.36542949080467224, 0.0], [0.08100947737693787, 0.4589487910270691, 0.0], [0.19569654762744904, 0.42009788751602173, 0.0], [0.2880725562572479, 0.25702276825904846, 0.0], [0.2856518626213074, 0.082880400121212, 0.0], [0.28546586632728577, -0.10055675357580185, 0.0], [0.28881096839904785, -0.2588859498500824, 0.0], [0.13541285693645477, -3.4693565368652344, 1.0], [0.5587024688720703, 0.17062683403491974, 1.0], [-0.005389513447880745, 3.554023504257202, 0.0], [0.14314846694469452, 0.6029807329177856, 1.0], [0.3898172080516815, 0.14386074244976044, 0.0], [0.2853235900402069, -0.07002169638872147, 0.0], [-1.2118470668792725, -2.545470714569092, 1.0], [1.0749945640563965, -0.0008727078093215823, 0.0], [0.3149842321872711, -1.4607640504837036, 1.0], [0.6025575399398804, 0.18653790652751923, 1.0], [0.1787276417016983, 0.24726125597953796, 0.0], [0.16810688376426697, -0.130545973777771, 0.0], [-0.13680461049079895, -0.1997416764497757, 0.0], [-0.15626712143421173, 0.17932075262069702, 0.0], [0.2012569010257721, 1.2963495254516602, 1.0], [0.002181475982069969, 2.5536210536956787, 0.0], [0.338032990694046, -3.9315996170043945, 1.0], [0.6702068448066711, 1.4717552661895752, 1.0], [-0.0022560928482562304, 2.496405601501465, 0.0], [0.015632841736078262, -1.7015717029571533, 1.0], [0.5048178434371948, -0.5114119052886963, 0.0], [0.3391466736793518, -0.22003260254859924, 0.0], [0.47979044914245605, -0.0021477004047483206, 0.0], [0.3267022669315338, 0.17593170702457428, 0.0], [0.1614859253168106, 0.5437046885490417, 0.0], [-0.0017467493889853358, 1.821577548980713, 0.0], [0.17506062984466553, -3.936784267425537, 1.0], [0.6263557076454163, 0.17010614275932312, 1.0], [-0.0032950800377875566, 3.557816982269287, 0.0], [0.15321817994117737, 0.6096879839897156, 1.0], [0.41734328866004944, 0.15285857021808624, 0.0], [0.3137285113334656, -0.04778522253036499, 0.0], [-1.3322913646697998, -2.567579746246338, 1.0], [1.1651732921600342, -0.003930548205971718, 0.0], [0.3441120684146881, -1.451347827911377, 1.0], [0.6471489071846008, 0.1875787228345871, 1.0], [0.18599848449230194, 0.24802426993846893, 0.0], [0.1736806035041809, -0.12900888919830322, 0.0], [-0.14584773778915405, -0.1980556696653366, 0.0], [-0.16616959869861603, 0.17268072068691254, 0.0], [0.20445361733436584, 1.2824631929397583, 1.0], [0.002403438789770007, 2.5346269607543945, 0.0], [0.34434813261032104, -3.9061145782470703, 1.0], [0.6840022802352905, 1.4598792791366577, 1.0], [-0.003190571442246437, 2.5051934719085693, 0.0], [0.016695989295840263, -1.6762646436691284, 1.0], [0.5083125829696655, -0.5053435564041138, 0.0], [0.35180148482322693, -0.22929103672504425, 0.0], [0.49279120564460754, -0.0020124120637774467, 0.0], [0.3344346582889557, 0.17464162409305573, 0.0], [0.16532205045223236, 0.5377157926559448, 0.0], [-0.001186177134513855, 1.8144499063491821, 0.0], [0.1758199781179428, -3.9259226322174072, 1.0], [2.2294905185699463, 1.5935640335083008, 1.0], [-0.002388427499681711, 2.522641658782959, 0.0], [0.0033745267428457737, -2.046564817428589, 1.0], [-0.2984580099582672, -0.37454432249069214, 0.0], [-0.30688121914863586, -0.18453527987003326, 0.0], [-0.489044725894928, 0.0043241241946816444, 0.0], [-0.3347618281841278, 0.18663720786571503, 0.0], [-0.33558130264282227, 0.3691299855709076, 0.0], [-0.17256909608840942, 0.5496324896812439, 0.0], [0.006318377330899239, 0.35769951343536377, 0.0], [0.18335206806659698, 0.5385312438011169, 0.0], [0.3190595507621765, 0.36090216040611267, 0.0], [0.32617032527923584, 0.18448716402053833, 0.0], [0.3119569420814514, -0.0012089352821931243, 0.0], [0.31065964698791504, -0.17186832427978516, 0.0], [0.3119106888771057, -0.3193167448043823, 0.0], [0.15621450543403625, -3.4454431533813477, 1.0], [0.5779854655265808, 1.4714641571044922, 1.0], [-0.00024205527734011412, 2.5079829692840576, 0.0], [0.018501438200473785, -1.6348333358764648, 1.0], [0.4778585433959961, -0.4965217411518097, 0.0], [0.3269057869911194, -0.2464679479598999, 0.0], [0.46852993965148926, -0.004993073176592588, 0.0], [0.31589776277542114, 0.16508640348911285, 0.0], [0.14441722631454468, -1.4766619205474854, 0.0], [1.65446937084198, 1.162720799446106, 1.0], [0.00494631752371788, 2.5769660472869873, 0.0], [0.05292379856109619, -2.4678092002868652, 1.0], [-0.2891312539577484, -0.371542364358902, 0.0], [-0.30138298869132996, -0.21415375173091888, 0.0], [0.3271316587924957, -0.005597784649580717, 0.0], [-0.37645113468170166, 0.11895780265331268, 0.0], [-0.23984113335609436, 0.2933059334754944, 0.0], [-0.19547276198863983, 0.4525434374809265, 0.0], [-0.04762333258986473, 0.3740975558757782, 0.0], [0.08102833479642868, 0.4638797342777252, 0.0], [0.19811494648456573, 0.4222217798233032, 0.0], [0.2848063111305237, 0.25798362493515015, 0.0], [0.28142353892326355, 0.08087430149316788, 0.0], [0.28084591031074524, -0.09811878204345703, 0.0], [0.28030678629875183, -0.2562384605407715, 0.0], [0.29940447211265564, -0.3538002371788025, 0.0], [0.1380487084388733, -3.325585126876831, 1.0], [0.5510696172714233, 0.17293357849121094, 1.0], [-0.004616892896592617, 3.660163640975952, 0.0], [0.14850015938282013, 0.6199179887771606, 1.0], [0.3952656090259552, 0.13876093924045563, 0.0], [0.2855227589607239, -0.07294029742479324, 0.0], [-1.2221914529800415, -2.583636522293091, 1.0], [1.0862962007522583, -0.000942529528401792, 0.0], [0.3191016614437103, -1.4589248895645142, 1.0], [0.581964373588562, 0.18771867454051971, 1.0], [0.17920435965061188, 0.2522695064544678, 0.0], [0.17108634114265442, -0.12627598643302917, 0.0], [-0.13637013733386993, -0.20167991518974304, 0.0], [-0.16358469426631927, 0.17673370242118835, 0.0], [0.20046687126159668, 1.305363416671753, 1.0], [0.0017381147481501102, 2.5546445846557617, 0.0], [0.3378029763698578, -3.942847967147827, 1.0], [0.6988658905029297, 1.474697470664978, 1.0], [-0.0038326019421219826, 2.4495105743408203, 0.0], [0.017457760870456696, -1.6819459199905396, 1.0], [0.5036978125572205, -0.509756326675415, 0.0], [0.34877634048461914, -0.2282484918832779, 0.0], [0.49322187900543213, -0.0026027115527540445, 0.0], [0.3254221975803375, 0.17812204360961914, 0.0], [0.1607372909784317, 0.5355616807937622, 0.0], [0.00011606845509959385, 1.817630410194397, 0.0], [0.1765882670879364, -3.9362080097198486, 1.0], [2.314013719558716, 1.5433452129364014, 1.0], [-0.002106409752741456, 2.5841784477233887, 0.0], [-0.0001540326193207875, -1.9951694011688232, 1.0], [-0.30515795946121216, -0.37266626954078674, 0.0], [-0.3115188181400299, -0.1857103705406189, 0.0], [-0.4985206425189972, 0.005456098821014166, 0.0], [-0.3332219421863556, 0.18944087624549866, 0.0], [-0.34398287534713745, 0.3729274570941925, 0.0], [-0.17259381711483002, 0.5467811822891235, 0.0], [0.010558187030255795, 0.35823553800582886, 0.0], [0.1828048974275589, 0.5394098162651062, 0.0], [0.32974332571029663, 0.36283233761787415, 0.0], [0.32256653904914856, 0.18752938508987427, 0.0], [0.31913119554519653, -0.004086628090590239, 0.0], [0.3171054720878601, -0.17168661952018738, 0.0]], [[2.461608648300171, 1.7627419233322144, 1.0], [-0.2308489829301834, -0.33850356936454773, 0.0], [-0.44578835368156433, -0.1629744917154312, 0.0], [-0.508844256401062, 0.0022163749672472477, 0.0], [-0.5084130167961121, 0.17483988404273987, 0.0], [-0.23727525770664215, 0.34747451543807983, 0.0], [0.09540063142776489, 0.3356036841869354, 0.0], [0.16573061048984528, 0.4034201204776764, 0.0], [0.23944370448589325, 0.4208439886569977, 0.0], [0.2983400523662567, 0.3922460973262787, 0.0], [0.3121013641357422, 0.20980700850486755, 0.0], [0.31223711371421814, 0.032138675451278687, 0.0], [0.30975672602653503, -0.1295558214187622, 0.0], [0.3083769679069519, -0.2744196653366089, 0.0], [0.1489672213792801, -3.3721764087677, 1.0], [2.024766206741333, 1.5467511415481567, 1.0], [-0.0011007275898009539, 2.3781521320343018, 0.0], [0.007617848925292492, -2.0580852031707764, 1.0], [-0.2771523892879486, -0.3662794828414917, 0.0], [-0.2782302796840668, -0.17890796065330505, 0.0], [-0.4424530565738678, 0.0026609397027641535, 0.0], [-0.3214893043041229, 0.17688097059726715, 0.0], [-0.31480875611305237, 0.356610506772995, 0.0], [-0.17702752351760864, 0.5266211032867432, 0.0], [0.007195024751126766, 0.3447366952896118, 0.0], [0.17249353229999542, 0.5124531388282776, 0.0], [0.30459681153297424, 0.3418661653995514, 0.0], [0.30476880073547363, 0.17103515565395355, 0.0], [0.3030620813369751, -0.01407240703701973, 0.0], [0.29720136523246765, -0.18348228931427002, 0.0], [0.30107712745666504, -0.32847726345062256, 0.0], [0.15196813642978668, -3.3587186336517334, 1.0], [0.5580707788467407, 1.4462037086486816, 1.0], [-0.0019380564335733652, 2.486348867416382, 0.0], [0.01567269302904606, -1.5767531394958496, 1.0], [0.45831751823425293, -0.4770599901676178, 0.0], [0.3280060291290283, -0.24763064086437225, 0.0], [0.45585405826568604, -0.005887528415769339, 0.0], [0.5406334400177002, -0.01141798309981823, 0.0], [0.1720079481601715, -1.461917519569397, 1.0], [2.1277825832366943, 1.4825084209442139, 1.0], [-0.0033694615121930838, 2.3548598289489746, 0.0], [0.017600759863853455, -2.034881591796875, 1.0], [-0.3037797510623932, -0.35519707202911377, 0.0], [-0.3029136657714844, -0.1778809130191803, 0.0], [-0.49132803082466125, -0.0013220451073721051, 0.0], [-0.3448795676231384, 0.16808858513832092, 0.0], [-0.3366614282131195, 0.34122493863105774, 0.0], [-0.18686680495738983, 0.5131188035011292, 0.0], [-0.002741454169154167, 0.34130701422691345, 0.0], [0.17103488743305206, 0.5098137259483337, 0.0], [0.32584890723228455, 0.34728309512138367, 0.0], [0.32809513807296753, 0.17928901314735413, 0.0], [0.5025691986083984, -0.004489255137741566, 0.0], [0.3235626816749573, -0.1739586442708969, 0.0], [0.3288543224334717, -0.33988285064697266, 0.0], [0.16786421835422516, -3.321561336517334, 1.0], [0.6168398261070251, 1.4266005754470825, 1.0], [-0.0012155647855252028, 2.4556775093078613, 0.0], [0.016322849318385124, -1.5663930177688599, 1.0], [0.4770980775356293, -0.4718557894229889, 0.0], [0.32838213443756104, -0.23103204369544983, 0.0], [0.46805092692375183, -0.005370942875742912, 0.0], [0.3190586268901825, 0.15594547986984253, 0.0], [0.14148107171058655, -1.466637134552002, 0.0], [1.7091004848480225, 1.1366647481918335, 1.0], [0.005956997163593769, 2.5236825942993164, 0.0], [0.053948234766721725, -2.387355327606201, 1.0], [-0.289347767829895, -0.35853084921836853, 0.0], [-0.3044144809246063, -0.20524510741233826, 0.0], [0.33010008931159973, -0.004437786061316729, 0.0], [-0.3792339265346527, 0.11869756877422333, 0.0], [-0.2405407577753067, 0.28942352533340454, 0.0], [-0.202566459774971, 0.447016179561615, 0.0], [-0.05217114835977554, 0.3731290400028229, 0.0], [0.0849798247218132, 0.44968241453170776, 0.0], [0.20020149648189545, 0.4153008460998535, 0.0], [0.2869572341442108, 0.24966570734977722, 0.0], [0.28396958112716675, 0.07698321342468262, 0.0], [0.2800135612487793, -0.10567420721054077, 0.0], [0.28291112184524536, -0.26261812448501587, 0.0], [0.13626891374588013, -3.4572291374206543, 1.0], [0.5556731224060059, 0.17164087295532227, 1.0], [-0.0042268033139407635, 3.470989465713501, 0.0], [0.14304764568805695, 0.5853174328804016, 1.0], [0.39041203260421753, 0.1361733376979828, 0.0], [0.28374168276786804, -0.06703278422355652, 0.0], [-1.21083664894104, -2.500234603881836, 1.0], [1.0465441942214966, -0.0011735926382243633, 0.0], [0.31268322467803955, -1.4372020959854126, 1.0], [0.57313472032547, 0.18498370051383972, 1.0], [0.1741401106119156, 0.24510248005390167, 0.0], [0.1655913144350052, -0.12374045699834824, 0.0], [-0.13197652995586395, -0.1994900107383728, 0.0], [-0.1613525152206421, 0.17344346642494202, 0.0], [0.20115572214126587, 1.2848910093307495, 1.0], [0.0011596954427659512, 2.5068089962005615, 0.0], [0.3344953656196594, -3.870441436767578, 1.0], [0.6763648390769958, 1.448886513710022, 1.0], [-0.0035441345535218716, 2.398392915725708, 0.0], [0.016539495438337326, -1.66647469997406, 1.0], [0.5071161389350891, -0.5002419352531433, 0.0], [0.33844757080078125, -0.2158106118440628, 0.0], [0.48799094557762146, -0.0027590617537498474, 0.0], [0.32694879174232483, 0.17963548004627228, 0.0], [0.16490483283996582, 0.5327619910240173, 0.0], [-0.000553368532564491, 1.795583963394165, 0.0], [0.17641723155975342, -3.8569464683532715, 1.0], [2.296691656112671, 1.55607008934021, 1.0], [-0.0037914891727268696, 2.4755144119262695, 0.0], [0.00037465518107637763, -1.969411849975586, 1.0], [-0.30558356642723083, -0.3660513162612915, 0.0], [-0.3091381788253784, -0.1809571534395218, 0.0], [-0.49497365951538086, 0.0054116081446409225, 0.0], [-0.34087875485420227, 0.1870095580816269, 0.0], [-0.33133530616760254, 0.3684197664260864, 0.0], [-0.1696338802576065, 0.5431355237960815, 0.0], [0.009451068937778473, 0.3523436486721039, 0.0], [0.18416452407836914, 0.5313839912414551, 0.0], [0.32674646377563477, 0.3572348952293396, 0.0], [0.3235386610031128, 0.18096010386943817, 0.0], [0.3202953636646271, -0.003896229900419712, 0.0], [0.31238803267478943, -0.1669432371854782, 0.0], [0.316755086183548, -0.3186889588832855, 0.0], [0.156931534409523, -3.409454345703125, 1.0], [0.6390923857688904, 0.17525698244571686, 1.0], [-0.0048841689713299274, 3.57991623878479, 0.0], [0.15737469494342804, 0.6010896563529968, 1.0], [0.40588057041168213, 0.1436365842819214, 0.0], [0.3119400143623352, -0.06847334653139114, 0.0], [-1.263138771057129, -2.5554394721984863, 1.0], [1.104773998260498, -0.0005670010577887297, 0.0], [0.32771623134613037, -1.4634959697723389, 1.0], [0.611186146736145, 0.18771851062774658, 1.0], [0.18264248967170715, 0.24633172154426575, 0.0], [0.15837159752845764, -0.17653261125087738, 0.0], [-0.14729513227939606, -0.19727596640586853, 0.0], [-0.1693309098482132, 0.16938899457454681, 0.0], [0.20182648301124573, 1.3111069202423096, 1.0], [0.0010583563707768917, 2.575512170791626, 0.0], [0.3421151041984558, -3.925429105758667, 1.0], [2.3387579917907715, 1.681049108505249, 1.0], [-0.005740172695368528, 2.4067091941833496, 0.0], [0.007336264941841364, -2.0241856575012207, 1.0], [-0.3184758424758911, -0.36707940697669983, 0.0], [-0.31451481580734253, -0.18554149568080902, 0.0], [-0.5002119541168213, 0.005808903835713863, 0.0], [-0.34309622645378113, 0.18732450902462006, 0.0], [-0.33826711773872375, 0.3683195412158966, 0.0], [-0.17351694405078888, 0.5474377274513245, 0.0], [0.004239355679601431, 0.354062020778656, 0.0], [0.17708338797092438, 0.5362818241119385, 0.0], [0.3234136998653412, 0.3638807237148285, 0.0], [0.3255336582660675, 0.18983927369117737, 0.0], [0.32377320528030396, 0.0018046038458123803, 0.0], [0.31750282645225525, -0.16069430112838745, 0.0], [0.3222625255584717, -0.310261070728302, 0.0], [0.15962865948677063, -3.437872886657715, 1.0], [0.5766648650169373, 1.464717149734497, 1.0], [-0.001088473480194807, 2.4474754333496094, 0.0], [0.016493743285536766, -1.603715419769287, 1.0], [0.47566545009613037, -0.48233485221862793, 0.0], [0.33111414313316345, -0.24146310985088348, 0.0], [0.47397419810295105, -0.005727729760110378, 0.0], [0.31953567266464233, 0.1607043743133545, 0.0], [0.1417706161737442, -1.4633443355560303, 0.0], [1.8315796852111816, 1.123297929763794, 1.0], [0.005618765484541655, 2.593686103820801, 0.0], [0.05042600259184837, -2.384093999862671, 1.0], [-0.3013608753681183, -0.36543557047843933, 0.0], [-0.31513503193855286, -0.2084074169397354, 0.0], [0.33792710304260254, -0.0013365182094275951, 0.0], [-0.3907216489315033, 0.12003438174724579, 0.0], [-0.25236451625823975, 0.28625571727752686, 0.0], [-0.20681370794773102, 0.45106470584869385, 0.0], [-0.05772024020552635, 0.3672850728034973, 0.0], [0.08080437034368515, 0.4623112976551056, 0.0], [0.20961174368858337, 0.41785183548927307, 0.0], [0.28987473249435425, 0.2600780129432678, 0.0], [0.2851196825504303, 0.08681575208902359, 0.0], [0.2860610783100128, -0.09419568628072739, 0.0], [0.28260552883148193, -0.25263360142707825, 0.0], [0.2921968996524811, -0.3526330888271332, 1.0], [0.14141690731048584, -2.90915584564209, 1.0], [0.5541099309921265, 0.15052847564220428, 1.0], [-0.0015554380370303988, 3.4199976921081543, 0.0], [0.15668882429599762, 0.5660726428031921, 1.0], [0.3948938548564911, 0.13383889198303223, 0.0], [0.2820855379104614, -0.05909482762217522, 0.0], [-1.20119047164917, -2.4538702964782715, 1.0], [1.0615301132202148, 0.0015539105515927076, 0.0], [0.31926995515823364, -1.3872982263565063, 1.0], [0.5934907793998718, 0.1799793392419815, 1.0], [0.17757679522037506, 0.25211301445961, 0.0], [0.1675492376089096, -0.1239655464887619, 0.0], [-0.13949795067310333, -0.1946425437927246, 0.0], [-0.15939025580883026, 0.17879392206668854, 0.0], [0.19723165035247803, 1.2789007425308228, 1.0], [0.0008857036009430885, 2.4862749576568604, 0.0], [0.33328381180763245, -3.835744857788086, 1.0], [0.6982263326644897, 1.4465413093566895, 1.0], [-0.0026294291019439697, 2.3824362754821777, 0.0], [0.020539524033665657, -1.5932573080062866, 1.0], [0.4979625940322876, -0.4782942235469818, 0.0], [0.34543436765670776, -0.22327718138694763, 0.0], [0.4895671606063843, -0.0037911240942776203, 0.0], [0.3291727304458618, 0.17073804140090942, 0.0], [0.16165250539779663, 0.5273735523223877, 0.0], [-0.001039244350977242, 1.775953769683838, 0.0], [0.17398381233215332, -3.857802152633667, 1.0], [2.3486921787261963, 1.566206932067871, 1.0], [-0.0027563627809286118, 2.4776670932769775, 0.0], [0.003201927524060011, -1.9686224460601807, 1.0], [-0.31207960844039917, -0.36727282404899597, 0.0], [-0.31900957226753235, -0.18219967186450958, 0.0], [-0.5009615421295166, 0.0038272927049547434, 0.0], [-0.3328103721141815, 0.1864164173603058, 0.0], [-0.3332849442958832, 0.3649832308292389, 0.0], [-0.1747690886259079, 0.5436285138130188, 0.0], [0.007942735217511654, 0.35773226618766785, 0.0], [0.18418776988983154, 0.5327414870262146, 0.0], [0.32585445046424866, 0.35746413469314575, 0.0], [0.32723015546798706, 0.18222902715206146, 0.0], [0.5017019510269165, -0.004048995673656464, 0.0], [0.3257267475128174, -0.175894632935524, 0.0], [0.3246188163757324, -0.3485710024833679, 0.0], [0.16811610758304596, -3.3989572525024414, 1.0], [0.6069064736366272, 1.4639192819595337, 1.0], [-0.0003314319474156946, 2.4650368690490723, 0.0], [0.018431011587381363, -1.605272889137268, 1.0], [0.4815499782562256, -0.4836854338645935, 0.0], [0.33309274911880493, -0.24232149124145508, 0.0], [0.4704235792160034, -0.004354535136371851, 0.0], [0.31868797540664673, 0.16322444379329681, 0.0]], [[2.5290699005126953, 1.7709113359451294, 1.0], [-0.22579701244831085, -0.3409157991409302, 0.0], [-0.4409557282924652, -0.16737110912799835, 0.0], [-0.5097708106040955, 0.014011506922543049, 0.0], [-0.5138313174247742, 0.17953036725521088, 0.0], [-0.24225828051567078, 0.34853899478912354, 0.0], [0.10013717412948608, 0.3456293046474457, 0.0], [0.16938936710357666, 0.4009549617767334, 0.0], [0.806892991065979, 0.16230183839797974, 0.0], [0.3256230354309082, 0.15228334069252014, 0.0], [0.32106146216392517, 0.026085885241627693, 0.0], [0.12102486938238144, 0.26615849137306213, 0.0], [-0.036317165940999985, 0.17981185019016266, 0.0], [-0.5380859971046448, 0.08724024146795273, 0.0], [-0.5493287444114685, -0.013697478920221329, 0.0], [-0.547472357749939, -0.1386723667383194, 0.0], [-0.19165292382240295, -0.31157156825065613, 0.0], [2.098926305770874, -3.0408639907836914, 1.0], [0.7431502342224121, 0.16134583950042725, 1.0], [-0.005598562303930521, 3.301668882369995, 0.0], [0.15063922107219696, 0.5566525459289551, 1.0], [0.4329908788204193, 0.12901443243026733, 0.0], [0.32713067531585693, -0.060569655150175095, 0.0], [-1.3259785175323486, -2.3427677154541016, 1.0], [1.1737985610961914, -0.002725298050791025, 0.0], [0.3455173969268799, -1.3804025650024414, 1.0], [0.5855685472488403, 0.17863765358924866, 1.0], [0.18044590950012207, 0.2425391972064972, 0.0], [0.16981221735477448, -0.110887810587883, 0.0], [-0.14411932229995728, -0.18569329380989075, 0.0], [-0.1570984125137329, 0.1743071973323822, 0.0], [0.21696574985980988, 1.2264289855957031, 1.0], [0.0007191815529949963, 2.3730695247650146, 0.0], [0.34482425451278687, -3.6644763946533203, 1.0], [0.6704868078231812, 1.3836320638656616, 1.0], [-0.0038823268841952085, 2.2475056648254395, 0.0], [0.017135359346866608, -1.5345665216445923, 1.0], [0.49653011560440063, -0.45892783999443054, 0.0], [0.3430516719818115, -0.20215696096420288, 0.0], [0.4843069314956665, -0.003446674207225442, 0.0], [0.3205966353416443, 0.16654404997825623, 0.0], [0.16521567106246948, 0.5031137466430664, 0.0], [-0.00027233592118136585, 1.7144731283187866, 0.0], [0.17478923499584198, -3.7222816944122314, 1.0], [2.228634834289551, 1.4876456260681152, 1.0], [-0.0007366429199464619, 2.4611377716064453, 0.0], [0.003076462307944894, -1.9642376899719238, 1.0], [-0.30309948325157166, -0.3596208691596985, 0.0], [-0.30801430344581604, -0.177626371383667, 0.0], [-0.485288143157959, 0.003237792057916522, 0.0], [-0.3411436676979065, 0.18407820165157318, 0.0], [-0.3313293755054474, 0.3596813976764679, 0.0], [-0.1738782525062561, 0.5325729250907898, 0.0], [0.006812932435423136, 0.34103381633758545, 0.0], [0.18136712908744812, 0.5239675045013428, 0.0], [0.3222246468067169, 0.35011962056159973, 0.0], [0.32094040513038635, 0.17587460577487946, 0.0], [0.31617268919944763, -0.00716959685087204, 0.0], [0.32264941930770874, -0.1707935482263565, 0.0], [0.3162412941455841, -0.3162008225917816, 0.0], [0.15857598185539246, -3.353551149368286, 1.0], [0.5637850761413574, 1.4340434074401855, 1.0], [0.0005938793183304369, 2.477332830429077, 0.0], [0.015990834683179855, -1.5725219249725342, 1.0], [0.47986042499542236, -0.4724436104297638, 0.0], [0.3304916024208069, -0.23406361043453217, 0.0], [0.46658629179000854, -0.005321296863257885, 0.0], [0.3181748390197754, 0.15660572052001953, 0.0], [0.1399887353181839, -1.473252534866333, 0.0], [1.8645901679992676, 1.1530921459197998, 1.0], [0.004959664773195982, 2.5439846515655518, 0.0], [0.05224400386214256, -2.341338634490967, 1.0], [-0.3011718690395355, -0.36134615540504456, 0.0], [-0.2930541932582855, -0.17965704202651978, 0.0], [-0.4823771119117737, -0.015143143944442272, 0.0], [-0.36135879158973694, 0.14977413415908813, 0.0], [-0.32292214035987854, 0.33631691336631775, 0.0], [-0.18316958844661713, 0.5113939642906189, 0.0], [-0.0021235672757029533, 0.3433057367801666, 0.0], [0.1730659157037735, 0.5090983510017395, 0.0], [0.31379804015159607, 0.34359169006347656, 0.0], [0.3189195394515991, 0.17912399768829346, 0.0], [0.30920737981796265, -0.00237133726477623, 0.0], [0.3109324276447296, -0.1673540472984314, 0.0], [0.3134205937385559, -0.3145149052143097, 0.0], [0.15698079764842987, -3.327315330505371, 1.0], [0.5730155110359192, 1.4304969310760498, 1.0], [-0.0007994559709914029, 2.5077080726623535, 0.0], [0.01455360371619463, -1.6270793676376343, 1.0], [0.4758478105068207, -0.49333125352859497, 0.0], [0.3247825503349304, -0.2406288981437683, 0.0], [0.4636930823326111, -0.005798200145363808, 0.0], [0.5348764657974243, -0.010878091678023338, 0.0], [0.17266009747982025, -1.444809079170227, 0.0], [1.8519432544708252, 1.1087373495101929, 1.0], [0.0017313462449237704, 2.6154048442840576, 0.0], [0.04891553893685341, -2.346832275390625, 1.0], [-0.3003900945186615, -0.3664456605911255, 0.0], [-0.2954361140727997, -0.18381750583648682, 0.0], [-0.4515842795372009, -0.01662779226899147, 0.0], [-0.3658410608768463, 0.14920145273208618, 0.0], [-0.32025954127311707, 0.3300861418247223, 0.0], [-0.1845313012599945, 0.5075836181640625, 0.0], [-0.0014676520368084311, 0.3430992662906647, 0.0], [0.16503837704658508, 0.5038493871688843, 0.0], [0.3210833966732025, 0.34167540073394775, 0.0], [0.31925785541534424, 0.18211665749549866, 0.0], [0.30888745188713074, 0.004185852129012346, 0.0], [0.3027593791484833, -0.1606261134147644, 0.0], [0.30813586711883545, -0.3044777512550354, 0.0], [0.15560489892959595, -3.3478310108184814, 1.0], [0.5642549395561218, 1.4366369247436523, 1.0], [-0.0013180633541196585, 2.3809447288513184, 0.0], [0.01622537523508072, -1.5797860622406006, 1.0], [0.4706953465938568, -0.4739743769168854, 0.0], [0.3229944407939911, -0.22745592892169952, 0.0], [0.46185797452926636, -0.006382539868354797, 0.0], [0.5352943539619446, -0.010507123544812202, 0.0], [0.17386679351329803, -1.4272428750991821, 1.0], [2.08099627494812, 1.4078580141067505, 1.0], [-0.00405856454744935, 2.332956075668335, 0.0], [0.020745115354657173, -2.030754566192627, 1.0], [-0.30051955580711365, -0.3476659953594208, 0.0], [-0.29766300320625305, -0.17238767445087433, 0.0], [-0.48570799827575684, -0.0017125309677794576, 0.0], [-0.3465394675731659, 0.16754399240016937, 0.0], [-0.33042436838150024, 0.3407570421695709, 0.0], [-0.17771103978157043, 0.5079559683799744, 0.0], [0.006325122434645891, 0.3367542624473572, 0.0], [0.1813129484653473, 0.5017292499542236, 0.0], [0.32065677642822266, 0.3372049331665039, 0.0], [0.32499539852142334, 0.1748642921447754, 0.0], [0.3146091103553772, -0.00017682299949228764, 0.0], [0.31685304641723633, -0.15762680768966675, 0.0], [0.3160249888896942, -0.30206114053726196, 0.0], [0.16004018485546112, -3.3042502403259277, 1.0], [0.565655529499054, 1.4140987396240234, 1.0], [-0.0006611082353629172, 2.3947713375091553, 0.0], [0.01766091398894787, -1.5039763450622559, 1.0], [0.47060030698776245, -0.45298731327056885, 0.0], [0.32527658343315125, -0.23450630903244019, 0.0], [0.4656229317188263, -0.006060028914362192, 0.0], [0.3157116174697876, 0.15158233046531677, 0.0], [0.13927008211612701, -1.4442216157913208, 1.0], [2.1343460083007812, 1.410339593887329, 1.0], [0.0003608777478802949, 2.305286407470703, 0.0], [0.022790569812059402, -2.0086045265197754, 1.0], [-0.30032679438591003, -0.34780633449554443, 0.0], [-0.2988545298576355, -0.17297928035259247, 0.0], [-0.4839608073234558, -0.0008785744430497289, 0.0], [-0.3482089042663574, 0.16226078569889069, 0.0], [-0.32705458998680115, 0.3390199542045593, 0.0], [-0.18234969675540924, 0.5062437057495117, 0.0], [0.009016468189656734, 0.33659037947654724, 0.0], [0.17511244118213654, 0.4976673722267151, 0.0], [0.32408854365348816, 0.3354020118713379, 0.0], [0.32343465089797974, 0.17149417102336884, 0.0], [0.31620466709136963, -0.001733233337290585, 0.0], [0.31515517830848694, -0.16131117939949036, 0.0], [0.3158511221408844, -0.30119311809539795, 0.0], [0.16216813027858734, -3.274468183517456, 1.0], [0.5601552128791809, 1.4022196531295776, 1.0], [-0.0010752464877441525, 2.407813787460327, 0.0], [0.015809766948223114, -1.5097099542617798, 1.0], [0.4801207184791565, -0.45484527945518494, 0.0], [0.3252796530723572, -0.22231760621070862, 0.0], [0.46230700612068176, -0.0058277444913983345, 0.0], [0.31408312916755676, 0.15220783650875092, 0.0], [0.13875961303710938, -1.4448741674423218, 0.0], [1.758310317993164, 1.1310800313949585, 1.0], [0.004711840767413378, 2.514202356338501, 0.0], [0.05328076332807541, -2.3218259811401367, 1.0], [-0.2924152612686157, -0.35730281472206116, 0.0], [-0.30797648429870605, -0.205093115568161, 0.0], [0.3374456763267517, -0.003957860637456179, 0.0], [-0.383996844291687, 0.11831162869930267, 0.0], [-0.244256392121315, 0.2793225347995758, 0.0], [-0.19863185286521912, 0.43414565920829773, 0.0], [-0.0498262420296669, 0.36169251799583435, 0.0], [0.08163148909807205, 0.4446527659893036, 0.0], [0.20525172352790833, 0.4089391827583313, 0.0], [0.2837078869342804, 0.25212469696998596, 0.0], [0.2846847474575043, 0.08124950528144836, 0.0], [0.28274649381637573, -0.09491793066263199, 0.0], [0.2841566503047943, -0.24976971745491028, 0.0], [0.28999242186546326, -0.3480125069618225, 0.0], [0.14343325793743134, -3.2388057708740234, 1.0], [0.5640891194343567, 0.168096661567688, 1.0], [-0.004773776978254318, 3.51540470123291, 0.0], [0.14836746454238892, 0.5886512994766235, 1.0], [0.39724329113960266, 0.13145789504051208, 0.0], [0.2905261218547821, -0.07405006885528564, 0.0], [-1.2159998416900635, -2.517141819000244, 1.0], [1.0322741270065308, -0.0012657473562285304, 0.0], [0.31672176718711853, -1.3911570310592651, 1.0], [0.6334125995635986, 0.18076594173908234, 1.0], [0.18132361769676208, 0.23899927735328674, 0.0], [0.16994450986385345, -0.11757534742355347, 0.0], [-0.13544785976409912, -0.19469140470027924, 0.0], [-0.15762992203235626, 0.17086075246334076, 0.0], [0.19919143617153168, 1.266686201095581, 1.0], [0.0005933889769949019, 2.4866387844085693, 0.0], [0.3334607183933258, -3.8455543518066406, 1.0], [0.6973918676376343, 1.4433495998382568, 1.0], [-0.0021863882429897785, 2.3851516246795654, 0.0], [0.01968407817184925, -1.6112736463546753, 1.0], [0.507394552230835, -0.48841923475265503, 0.0], [0.35168778896331787, -0.22277535498142242, 0.0], [0.4971272647380829, -0.0033695290330797434, 0.0], [0.3280986249446869, 0.17365489900112152, 0.0], [0.1599884331226349, 0.5252920389175415, 0.0], [-0.0011586585314944386, 1.7824008464813232, 0.0], [0.17475755512714386, -3.8509724140167236, 1.0], [2.334730625152588, 1.5504182577133179, 1.0], [-0.0030947865452617407, 2.574568748474121, 0.0], [0.00013916358875576407, -1.9976063966751099, 1.0], [-0.3049149215221405, -0.3723505437374115, 0.0], [-0.312755286693573, -0.18089473247528076, 0.0], [-0.4978088140487671, 0.002438205759972334, 0.0], [-0.3362849950790405, 0.1863982230424881, 0.0], [-0.34039342403411865, 0.36385130882263184, 0.0], [-0.17502133548259735, 0.5421960949897766, 0.0], [0.007137863896787167, 0.3528761565685272, 0.0], [0.18007226288318634, 0.5353103876113892, 0.0], [0.32694631814956665, 0.36113014817237854, 0.0], [0.3263830840587616, 0.1869339644908905, 0.0], [0.49820417165756226, -0.0029663911554962397, 0.0], [0.3327140212059021, -0.17452126741409302, 0.0], [0.33027762174606323, -0.34798145294189453, 0.0], [0.16764257848262787, -3.417466878890991, 1.0], [0.5948805809020996, 1.4677950143814087, 1.0], [-0.0019172951579093933, 2.542433023452759, 0.0], [0.014461623504757881, -1.6315903663635254, 1.0], [0.48429253697395325, -0.49122875928878784, 0.0]], [[2.476290702819824, 1.738896369934082, 1.0], [-0.23067009449005127, -0.33847731351852417, 0.0], [-0.45271754264831543, -0.15932421386241913, 0.0], [-0.5112106800079346, 0.0012325984425842762, 0.0], [-0.512177050113678, 0.17916874587535858, 0.0], [-0.24167200922966003, 0.35013604164123535, 0.0], [0.10448280721902847, 0.33671072125434875, 0.0], [0.17070350050926208, 0.4047100841999054, 0.0], [0.8132205605506897, 0.16162754595279694, 0.0], [0.32451382279396057, 0.15384896099567413, 0.0], [0.21906231343746185, 0.31758466362953186, 0.0], [0.07772954553365707, 0.1635889708995819, 0.0], [-0.07510580867528915, 0.31703466176986694, 0.0], [-0.4885404109954834, 0.14377133548259735, 0.0], [-0.5095400214195251, -0.03048759512603283, 0.0], [-0.5200706720352173, -0.19957593083381653, 0.0], [2.0216596126556396, -3.4472014904022217, 1.0], [0.7163001298904419, 0.16738080978393555, 1.0], [-0.00543738529086113, 3.3999080657958984, 0.0], [0.14811955392360687, 0.578515350818634, 1.0], [0.41611695289611816, 0.1296379268169403, 0.0], [0.31309351325035095, -0.0661485567688942, 0.0], [-1.2920410633087158, -2.4214372634887695, 1.0], [1.1388866901397705, -0.0034158306661993265, 0.0], [0.33814555406570435, -1.395485281944275, 1.0], [0.5969753861427307, 0.18105019629001617, 1.0], [0.18132531642913818, 0.2438221424818039, 0.0], [0.16930893063545227, -0.11858894675970078, 0.0], [-0.1420748084783554, -0.19100451469421387, 0.0], [-0.1575707346200943, 0.17491832375526428, 0.0], [0.2082972377538681, 1.2594866752624512, 1.0], [5.4796819313196465e-05, 2.420581102371216, 0.0], [0.3410371243953705, -3.7269632816314697, 1.0], [2.2704670429229736, 1.6063262224197388, 1.0], [-0.005180965177714825, 2.3129098415374756, 0.0], [0.010647320188581944, -1.9818270206451416, 1.0], [-0.3075464963912964, -0.3541725277900696, 0.0], [-0.31111782789230347, -0.1790795624256134, 0.0], [-0.49681356549263, 0.004101896192878485, 0.0], [-0.34533771872520447, 0.18211229145526886, 0.0], [-0.3351653218269348, 0.35894498229026794, 0.0], [-0.16865840554237366, 0.5324123501777649, 0.0], [0.012646587565541267, 0.3462001383304596, 0.0], [0.18388941884040833, 0.5233880281448364, 0.0], [0.3259110748767853, 0.3521938920021057, 0.0], [0.32628923654556274, 0.18192726373672485, 0.0], [0.49769121408462524, -0.003920045215636492, 0.0], [0.32704979181289673, -0.17576263844966888, 0.0], [0.3245766758918762, -0.3462134897708893, 0.0], [0.16732817888259888, -3.371553659439087, 1.0], [0.5952481627464294, 1.4419689178466797, 1.0], [-0.0016293571097776294, 2.474940299987793, 0.0], [0.01624811813235283, -1.615358591079712, 1.0], [0.47561976313591003, -0.4853260815143585, 0.0], [0.33106425404548645, -0.23409882187843323, 0.0], [0.47312140464782715, -0.00485952477902174, 0.0], [0.3160499036312103, 0.1615408957004547, 0.0], [0.14082106947898865, -1.4539681673049927, 0.0], [1.8368065357208252, 1.1404989957809448, 1.0], [0.005292192101478577, 2.557504653930664, 0.0], [0.04843344911932945, -2.3459978103637695, 1.0], [-0.29888206720352173, -0.3623272180557251, 0.0], [-0.2927352786064148, -0.1793394833803177, 0.0], [0.3460099697113037, -0.0019529132405295968, 0.0], [-0.3917624056339264, 0.12077820301055908, 0.0], [-0.2441568523645401, 0.28678062558174133, 0.0], [-0.20440568029880524, 0.4497969150543213, 0.0], [-0.059037402272224426, 0.3600945472717285, 0.0], [0.07385039329528809, 0.45786362886428833, 0.0], [0.2007281631231308, 0.4108287990093231, 0.0], [0.2857217788696289, 0.2533363103866577, 0.0], [0.286830872297287, 0.080629363656044, 0.0], [0.2833508551120758, -0.09572884440422058, 0.0], [0.2810317873954773, -0.2535189092159271, 0.0], [0.2958036959171295, -0.3530736565589905, 1.0], [0.14383643865585327, -2.8649117946624756, 1.0]], [[2.4847114086151123, 1.7711559534072876, 1.0], [-0.2345847636461258, -0.3409760892391205, 0.0], [-0.45268118381500244, -0.16363762319087982, 0.0], [-0.5116390585899353, 1.0697231118683703e-05, 0.0], [-0.5111939907073975, 0.17937621474266052, 0.0], [-0.21598859131336212, 0.35048583149909973, 0.0], [0.10472182929515839, 0.33521825075149536, 0.0], [0.16146422922611237, 0.40361347794532776, 0.0], [0.8100107908248901, 0.1635397970676422, 0.0], [0.32180461287498474, 0.15765218436717987, 0.0], [0.2129981517791748, 0.3204568028450012, 0.0], [0.07355386018753052, 0.16491994261741638, 0.0], [-0.07065761089324951, 0.3307556211948395, 0.0], [-0.4793393611907959, 0.15251410007476807, 0.0], [-0.4949008822441101, -0.031737782061100006, 0.0], [-0.5037631392478943, -0.20488132536411285, 0.0], [-0.16315233707427979, -0.37493062019348145, 1.0], [1.8901419639587402, -3.099860429763794, 1.0], [0.688076376914978, 0.156205415725708, 1.0], [-0.005448338575661182, 3.5453782081604004, 0.0], [0.15927475690841675, 0.5609750151634216, 1.0], [0.4236202538013458, 0.11908739060163498, 0.0], [0.325001060962677, -0.06428179144859314, 0.0], [-1.2954673767089844, -2.445239305496216, 1.0], [1.1571159362792969, -0.002913916949182749, 0.0], [0.34271499514579773, -1.408374547958374, 1.0], [0.5787785649299622, 0.18273884057998657, 1.0], [0.18222996592521667, 0.24734185636043549, 0.0], [0.16763953864574432, -0.11940819770097733, 0.0], [-0.14207997918128967, -0.19099393486976624, 0.0], [-0.16487352550029755, 0.16959811747074127, 0.0], [0.20809149742126465, 1.2450670003890991, 1.0], [0.0006933896220289171, 2.4214394092559814, 0.0], [0.3413001000881195, -3.734816789627075, 1.0], [0.6862981915473938, 1.400617241859436, 1.0], [-0.003155760234221816, 2.4042272567749023, 0.0], [0.018758542835712433, -1.6519659757614136, 1.0], [0.4988274574279785, -0.4962151348590851, 0.0], [0.34114035964012146, -0.21342529356479645, 0.0], [0.4861712157726288, -0.003185207722708583, 0.0], [0.329044908285141, 0.17443105578422546, 0.0], [0.16383755207061768, 0.5236389636993408, 0.0], [-0.00034047302324324846, 1.7612059116363525, 0.0], [0.17809057235717773, -3.8322696685791016, 1.0], [2.308692693710327, 1.5576622486114502, 1.0], [-0.0031010094098746777, 2.4500174522399902, 0.0], [-0.0032967254519462585, -1.9365779161453247, 1.0], [-0.3079015612602234, -0.36157551407814026, 0.0], [-0.3143978714942932, -0.17791607975959778, 0.0], [-0.49574747681617737, 0.004706623498350382, 0.0], [-0.33695387840270996, 0.1893029808998108, 0.0], [-0.3332318067550659, 0.3685028553009033, 0.0], [-0.17271468043327332, 0.5411802530288696, 0.0], [0.012131855823099613, 0.3486497402191162, 0.0], [0.1856067031621933, 0.5326573848724365, 0.0], [0.32666289806365967, 0.35940635204315186, 0.0], [0.32307127118110657, 0.18540127575397491, 0.0], [0.3196484446525574, -0.0038971854373812675, 0.0], [0.31046709418296814, -0.1676032543182373, 0.0], [0.31398671865463257, -0.3177932798862457, 0.0], [0.1584545373916626, -3.3868393898010254, 1.0], [0.5800355672836304, 1.4484401941299438, 1.0], [-2.424803824396804e-06, 2.4661760330200195, 0.0], [0.018693679943680763, -1.560050129890442, 1.0], [0.4745883345603943, -0.4682910144329071, 0.0], [0.3274979293346405, -0.23194968700408936, 0.0], [0.4604891836643219, -0.0057904464192688465, 0.0], [0.3185562491416931, 0.1541154682636261, 0.0], [0.1406996101140976, -1.4867219924926758, 0.0], [1.7364028692245483, 1.1218959093093872, 1.0], [0.004974774084985256, 2.5932037830352783, 0.0], [0.0491802878677845, -2.3964853286743164, 1.0], [-0.2904871106147766, -0.367009699344635, 0.0], [-0.30496442317962646, -0.20975162088871002, 0.0], [0.3274614214897156, -0.0034327111206948757, 0.0], [-0.38303685188293457, 0.11935342848300934, 0.0], [-0.2421909123659134, 0.2873314917087555, 0.0], [-0.1966661512851715, 0.449150949716568, 0.0], [-0.051253534853458405, 0.3654344379901886, 0.0], [0.08185870200395584, 0.4621365964412689, 0.0], [0.20193611085414886, 0.4185728430747986, 0.0], [0.2816837430000305, 0.2574078440666199, 0.0], [0.2829491198062897, 0.08149126917123795, 0.0], [0.2849894165992737, -0.09638110548257828, 0.0], [0.28484100103378296, -0.2595495581626892, 0.0], [0.2931303083896637, -0.35727205872535706, 1.0], [0.138924703001976, -2.8735969066619873, 1.0]], [[2.503441095352173, 1.7515453100204468, 1.0], [-0.2611432671546936, -0.34026339650154114, 0.0], [-0.43357428908348083, -0.15962111949920654, 0.0], [-0.5180836319923401, 0.0063155340030789375, 0.0], [-0.5068454742431641, 0.17741969227790833, 0.0], [-0.21679553389549255, 0.3454906642436981, 0.0], [0.1108546182513237, 0.33726707100868225, 0.0], [0.169157013297081, 0.40308865904808044, 0.0], [0.8033099174499512, 0.1617441624403, 0.0], [0.31947237253189087, 0.1641235053539276, 0.0], [0.21585138142108917, 0.3142869472503662, 0.0], [0.07580700516700745, 0.17223167419433594, 0.0], [-0.07342403382062912, 0.3136660158634186, 0.0], [-0.4875492453575134, 0.138834610581398, 0.0], [-0.5075609087944031, -0.03250289335846901, 0.0], [-0.5064356327056885, -0.1995905339717865, 0.0], [2.0181243419647217, -3.4508421421051025, 1.0], [0.6930037140846252, 0.16810297966003418, 1.0], [-0.006748867686837912, 3.3768997192382812, 0.0], [0.14510558545589447, 0.570812463760376, 1.0], [0.4153725802898407, 0.13733269274234772, 0.0], [0.3173053562641144, -0.0620097741484642, 0.0], [0.5814105272293091, -0.3566165864467621, 1.0], [0.09885130077600479, -1.4603753089904785, 1.0], [-0.019602246582508087, 2.373091220855713, 1.0], [0.16846781969070435, -3.3974814414978027, 1.0], [2.1862525939941406, 1.629514217376709, 1.0], [-0.00048529135528951883, 2.1845803260803223, 0.0], [0.008812371641397476, -1.9132816791534424, 1.0], [-0.2950325906276703, -0.3415561616420746, 0.0], [-0.2953348755836487, -0.16902397572994232, 0.0], [-0.46795570850372314, 0.00401981920003891, 0.0], [-0.32833579182624817, 0.17394810914993286, 0.0], [-0.3181755840778351, 0.34353357553482056, 0.0], [-0.18427695333957672, 0.5123320817947388, 0.0], [0.00600954657420516, 0.3391581177711487, 0.0], [0.17894448339939117, 0.5000207424163818, 0.0], [0.3145101070404053, 0.3374888002872467, 0.0], [0.3150629997253418, 0.1702462136745453, 0.0], [0.3123617470264435, -0.01118834875524044, 0.0], [0.31352537870407104, -0.16984859108924866, 0.0], [0.3120940327644348, -0.31086447834968567, 0.0], [0.16108132898807526, -3.29705810546875, 1.0], [0.5600112676620483, 1.4168798923492432, 1.0], [-5.466155198519118e-05, 2.400045394897461, 0.0], [0.014858162961900234, -1.539743423461914, 1.0], [0.4632335901260376, -0.4647625982761383, 0.0], [0.3304676413536072, -0.23625190556049347, 0.0], [0.4632500410079956, -0.006003285758197308, 0.0], [0.3099994361400604, 0.1573380082845688, 0.0], [0.1382836103439331, -1.4565215110778809, 0.0], [1.7849127054214478, 1.1028838157653809, 1.0], [0.00417768768966198, 2.536492347717285, 0.0], [0.051784031093120575, -2.3198843002319336, 1.0], [-0.29219186305999756, -0.3575533926486969, 0.0], [-0.2902706265449524, -0.1801765114068985, 0.0], [0.33398616313934326, -0.003793899668380618, 0.0], [-0.38222870230674744, 0.12149959802627563, 0.0], [-0.24264732003211975, 0.2839735150337219, 0.0], [-0.2038310170173645, 0.44166940450668335, 0.0], [-0.05416418984532356, 0.3645765483379364, 0.0], [0.07995713502168655, 0.4504172205924988, 0.0], [0.20065562427043915, 0.40731754899024963, 0.0], [0.28867456316947937, 0.249216690659523, 0.0], [0.2870313227176666, 0.07480697333812714, 0.0], [0.2847561538219452, -0.10119855403900146, 0.0], [0.28154200315475464, -0.2600024938583374, 0.0], [0.29659080505371094, -0.3541561961174011, 1.0], [0.14188209176063538, -2.790905475616455, 1.0]], [[2.5054571628570557, 1.7548539638519287, 1.0], [-0.2379065901041031, -0.33766499161720276, 0.0], [-0.4638638198375702, -0.16013847291469574, 0.0], [-0.5257068872451782, 0.005250438582152128, 0.0], [-0.5204362869262695, 0.17844660580158234, 0.0], [-0.24327929317951202, 0.35003000497817993, 0.0], [0.1028362512588501, 0.3365631103515625, 0.0], [0.17346274852752686, 0.40149062871932983, 0.0], [0.8127302527427673, 0.16240379214286804, 0.0], [0.3283436894416809, 0.14955216646194458, 0.0], [0.22210684418678284, 0.3277330696582794, 0.0], [0.07778797298669815, 0.15442237257957458, 0.0], [-0.07587382197380066, 0.33142194151878357, 0.0], [-0.4953050911426544, 0.15515603125095367, 0.0], [-0.5104923248291016, -0.022378522902727127, 0.0], [-0.5115416646003723, -0.19536666572093964, 0.0], [2.0384562015533447, -3.467271566390991, 1.0], [0.6715664863586426, 0.16693976521492004, 1.0], [-0.006298757623881102, 3.3935465812683105, 0.0], [0.1473073810338974, 0.5766385197639465, 1.0], [0.42556270956993103, 0.13219963014125824, 0.0], [0.3130117952823639, -0.06306381523609161, 0.0], [-1.3077771663665771, -2.433368444442749, 1.0], [1.1188853979110718, -0.0036198627203702927, 0.0], [0.3367122709751129, -1.4032046794891357, 1.0], [2.102389097213745, 1.566372275352478, 1.0], [-0.0026158257387578487, 2.445038080215454, 0.0], [0.008186290971934795, -2.034594774246216, 1.0], [-0.29412075877189636, -0.36995503306388855, 0.0], [-0.295424222946167, -0.1783919334411621, 0.0], [-0.4685140550136566, 0.0033317869529128075, 0.0], [-0.32517239451408386, 0.17918036878108978, 0.0], [-0.3266555368900299, 0.35922786593437195, 0.0], [-0.17656056582927704, 0.5320740342140198, 0.0], [0.004795576445758343, 0.3437943756580353, 0.0], [0.17178736627101898, 0.5228433609008789, 0.0], [0.31529659032821655, 0.3482148349285126, 0.0], [0.31410902738571167, 0.17920741438865662, 0.0], [0.31175315380096436, -0.005000654142349958, 0.0], [0.30649158358573914, -0.17224794626235962, 0.0], [0.3075042963027954, -0.3230060935020447, 0.0], [0.15516877174377441, -3.3800837993621826, 1.0], [0.5665656924247742, 1.4519225358963013, 1.0], [-0.001595387002453208, 2.3880670070648193, 0.0], [0.020153827965259552, -1.5265072584152222, 1.0], [0.47054240107536316, -0.4597361087799072, 0.0], [0.32224875688552856, -0.2247304618358612, 0.0], [0.45095300674438477, -0.00560570927336812, 0.0], [0.5327596664428711, -0.011118707247078419, 0.0], [0.17200790345668793, -1.4489506483078003, 1.0], [2.133488416671753, 1.4270460605621338, 1.0], [-0.0018900453578680754, 2.3659756183624268, 0.0], [0.021389437839388847, -2.0238094329833984, 1.0], [-0.2985706627368927, -0.3480496108531952, 0.0], [-0.30083024501800537, -0.17481662333011627, 0.0], [-0.48591873049736023, -0.0012990126851946115, 0.0], [-0.351367712020874, 0.1634395271539688, 0.0], [-0.3340008854866028, 0.33931103348731995, 0.0], [-0.18808525800704956, 0.5026160478591919, 0.0], [-0.005015513394027948, 0.33868852257728577, 0.0], [0.17243893444538116, 0.5003719925880432, 0.0], [0.3219009041786194, 0.3412027657032013, 0.0], [0.3305591940879822, 0.18179890513420105, 0.0], [0.5002736449241638, -0.004665110260248184, 0.0], [0.32549893856048584, -0.1711636334657669, 0.0], [0.32652515172958374, -0.33379697799682617, 0.0], [0.17074497044086456, -3.294630527496338, 1.0], [0.5884855389595032, 1.4247602224349976, 1.0], [-0.001265995786525309, 2.429386615753174, 0.0], [0.012352222576737404, -1.5578019618988037, 1.0], [0.4739614427089691, -0.46594786643981934, 0.0], [0.3348666727542877, -0.23798127472400665, 0.0], [0.46453237533569336, -0.0047594644129276276, 0.0], [0.3177987039089203, 0.1553649753332138, 0.0], [0.14319752156734467, -1.452139139175415, 0.0], [1.8914457559585571, 1.100753664970398, 1.0], [0.004425948951393366, 2.5452725887298584, 0.0], [0.050794973969459534, -2.2968146800994873, 1.0], [-0.29276540875434875, -0.3561830520629883, 0.0], [-0.3138207197189331, -0.1998673975467682, 0.0], [-0.45299050211906433, -0.026793621480464935, 0.0], [-0.3591795563697815, 0.13599255681037903, 0.0], [-0.3286683261394501, 0.3175082802772522, 0.0], [-0.19093157351016998, 0.49439918994903564, 0.0], [-0.013510963879525661, 0.34170636534690857, 0.0], [0.155348002910614, 0.4939230680465698, 0.0], [0.3134678900241852, 0.3387856185436249, 0.0], [0.3204435110092163, 0.18861767649650574, 0.0], [0.318130761384964, 0.015443138778209686, 0.0], [0.3085918426513672, -0.14763914048671722, 0.0], [0.30944010615348816, -0.2962663173675537, 0.0], [0.1586000770330429, -3.30267596244812, 1.0], [0.5494712591171265, 1.4150484800338745, 1.0], [-0.0005859797238372266, 2.358931541442871, 0.0], [0.01792488992214203, -1.495877742767334, 1.0], [0.46990665793418884, -0.45288780331611633, 0.0], [0.3253914713859558, -0.22669027745723724, 0.0], [0.45823147892951965, -0.005709673743695021, 0.0], [0.3111114203929901, 0.1528603583574295, 0.0], [0.139931321144104, -1.445322036743164, 1.0], [2.113553047180176, 1.3996838331222534, 1.0], [0.00024302792735397816, 2.266814708709717, 0.0], [0.024271558970212936, -1.998279333114624, 1.0], [-0.30275025963783264, -0.3439655005931854, 0.0], [-0.30064496397972107, -0.17184148728847504, 0.0], [-0.48137184977531433, -0.002089346991851926, 0.0], [-0.34686195850372314, 0.15960754454135895, 0.0], [-0.33403778076171875, 0.33354687690734863, 0.0], [-0.17862366139888763, 0.5026022791862488, 0.0], [0.006995036732405424, 0.3342563807964325, 0.0], [0.1861494481563568, 0.4981641471385956, 0.0], [0.3219631612300873, 0.33700987696647644, 0.0], [0.329317182302475, 0.17707298696041107, 0.0], [0.3198237419128418, -0.0006721095996908844, 0.0], [0.3119617700576782, -0.16156545281410217, 0.0], [0.3162413537502289, -0.30354616045951843, 0.0], [0.1582649201154709, -3.274139642715454, 1.0], [0.5553746819496155, 1.3986619710922241, 1.0], [-0.000766497221775353, 2.4080867767333984, 0.0], [0.0190008282661438, -1.532903790473938, 1.0], [0.470478355884552, -0.45700302720069885, 0.0], [0.33008360862731934, -0.2312583029270172, 0.0], [0.46497517824172974, -0.005583581514656544, 0.0], [0.3149232566356659, 0.1521904170513153, 0.0], [0.1404743492603302, -1.4407531023025513, 0.0], [1.7309314012527466, 1.1076867580413818, 1.0], [0.005356140900403261, 2.5122337341308594, 0.0], [0.05195559933781624, -2.325087547302246, 1.0], [-0.29222169518470764, -0.3614448010921478, 0.0], [-0.3038356602191925, -0.20500610768795013, 0.0], [0.3311702013015747, -0.004169739782810211, 0.0], [-0.38025784492492676, 0.12173505127429962, 0.0], [-0.24256017804145813, 0.283122718334198, 0.0], [-0.20016013085842133, 0.44346266984939575, 0.0], [-0.05217986926436424, 0.35719311237335205, 0.0], [0.08197230100631714, 0.44337019324302673, 0.0], [0.20553338527679443, 0.40642181038856506, 0.0], [0.28652334213256836, 0.24784182012081146, 0.0], [0.280292272567749, 0.07516032457351685, 0.0], [0.28298458456993103, -0.10445588082075119, 0.0], [0.28342053294181824, -0.2579236924648285, 0.0], [0.13729767501354218, -3.376966953277588, 1.0], [0.5279248952865601, 1.4205936193466187, 1.0], [-0.0010909164557233453, 2.428696870803833, 0.0], [0.016195323318243027, -1.5530942678451538, 1.0], [0.44829514622688293, -0.4711648225784302, 0.0], [0.30505824089050293, -0.23821581900119781, 0.0], [0.4407674968242645, -0.00706053851172328, 0.0], [0.30092132091522217, 0.15398159623146057, 0.0], [0.13378296792507172, -1.4660792350769043, 0.0], [1.8045434951782227, 1.1298205852508545, 1.0], [0.004711084999144077, 2.5578248500823975, 0.0], [0.04553436115384102, -2.310297727584839, 1.0], [-0.2925466299057007, -0.3595792055130005, 0.0], [-0.3077440559864044, -0.20286321640014648, 0.0], [0.3276767432689667, -0.0030108250211924314, 0.0], [-0.38054850697517395, 0.12425299733877182, 0.0], [-0.24189117550849915, 0.28675511479377747, 0.0], [-0.19771555066108704, 0.4468696415424347, 0.0], [-0.052453745156526566, 0.3656117618083954, 0.0], [0.0816061943769455, 0.4526890516281128, 0.0], [0.2013646960258484, 0.4181100130081177, 0.0], [0.2848072946071625, 0.25066274404525757, 0.0], [0.2868209183216095, 0.07584993541240692, 0.0], [0.27878424525260925, -0.10230514407157898, 0.0], [0.28116774559020996, -0.26038268208503723, 0.0], [0.13450513780117035, -3.4485278129577637, 1.0], [0.5002338886260986, 1.4480122327804565, 1.0], [-0.0007005002116784453, 2.484262466430664, 0.0], [0.01620042882859707, -1.5674669742584229, 1.0], [0.44467711448669434, -0.47712886333465576, 0.0], [0.3133894205093384, -0.24451400339603424, 0.0], [0.4442327618598938, -0.008340821601450443, 0.0], [0.300894558429718, 0.15755823254585266, 0.0], [0.13708630204200745, -1.500821828842163, 0.0], [1.790777325630188, 1.1618013381958008, 1.0], [0.006128821987658739, 2.602393865585327, 0.0], [0.04842255637049675, -2.3714182376861572, 1.0], [-0.29678502678871155, -0.37298473715782166, 0.0], [-0.2887210547924042, -0.18353219330310822, 0.0], [0.33387434482574463, -0.003637627698481083, 0.0], [-0.3792862892150879, 0.12292984127998352, 0.0], [-0.24225926399230957, 0.2912777364253998, 0.0], [-0.2067265659570694, 0.44997891783714294, 0.0], [-0.05675463378429413, 0.3669113516807556, 0.0], [0.07379047572612762, 0.45685896277427673, 0.0], [0.19631744921207428, 0.4193251132965088, 0.0], [0.28779810667037964, 0.257661908864975, 0.0], [0.288049578666687, 0.08436495065689087, 0.0], [0.28264257311820984, -0.09570372849702835, 0.0], [0.2846337556838989, -0.25973448157310486, 0.0], [0.2945757210254669, -0.3601136803627014, 0.0], [0.14309339225292206, -3.2493584156036377, 1.0], [0.5541846752166748, 0.17009569704532623, 1.0], [-0.003724360838532448, 3.5283310413360596, 0.0], [0.14711324870586395, 0.593886137008667, 1.0], [0.3868344724178314, 0.13628950715065002, 0.0], [0.2909029424190521, -0.06905683875083923, 0.0], [-1.2332390546798706, -2.537256956100464, 1.0], [1.053733229637146, -0.0006397899123840034, 0.0], [0.31643426418304443, -1.417966365814209, 1.0], [0.607737123966217, 0.18428337574005127, 1.0], [0.176445871591568, 0.24068418145179749, 0.0], [0.16961292922496796, -0.1155163124203682, 0.0], [-0.1367425173521042, -0.20030175149440765, 0.0], [-0.1620510220527649, 0.17439240217208862, 0.0], [0.20327894389629364, 1.2882777452468872, 1.0], [0.0008194380206987262, 2.5238447189331055, 0.0], [0.33821192383766174, -3.8507087230682373, 1.0], [0.6783112287521362, 1.4384337663650513, 1.0], [-0.0033478019759058952, 2.4521491527557373, 0.0], [0.01755376160144806, -1.660019874572754, 1.0], [0.5069878101348877, -0.4973105788230896, 0.0], [0.34842219948768616, -0.2254970371723175, 0.0], [0.488714337348938, -0.0028189041186124086, 0.0], [0.3312404155731201, 0.1738189458847046, 0.0], [0.1670180708169937, 0.532904326915741, 0.0], [-0.000592118944041431, 1.7902402877807617, 0.0], [0.17551107704639435, -3.8968989849090576, 1.0], [2.268617868423462, 1.5880937576293945, 1.0], [-0.003742291359230876, 2.4863266944885254, 0.0], [0.0007844757637940347, -2.0027477741241455, 1.0], [-0.3063609302043915, -0.3679121732711792, 0.0], [-0.31239020824432373, -0.18236219882965088, 0.0], [-0.4894085228443146, 0.0053078792989254, 0.0], [-0.3354499340057373, 0.18918417394161224, 0.0], [-0.33402103185653687, 0.3727133274078369, 0.0], [-0.16653278470039368, 0.5436662435531616, 0.0], [0.011705618351697922, 0.35687243938446045, 0.0], [0.1808106005191803, 0.5394186973571777, 0.0], [0.3226427435874939, 0.36209553480148315, 0.0], [0.3217509686946869, 0.18685327470302582, 0.0], [0.31925100088119507, -0.003528418019413948, 0.0], [0.30979081988334656, -0.16998398303985596, 0.0]], [[2.474560260772705, 1.759460210800171, 1.0], [-0.24877358973026276, -0.3413453698158264, 0.0], [-0.44460317492485046, -0.16037772595882416, 0.0], [-0.5104156732559204, 0.003020306583493948, 0.0], [-0.507588803768158, 0.17875277996063232, 0.0], [-0.2269492894411087, 0.34607571363449097, 0.0], [0.1013447567820549, 0.33722954988479614, 0.0], [0.16618794202804565, 0.40235790610313416, 0.0], [0.23875609040260315, 0.417921245098114, 0.0], [0.303470641374588, 0.3966144919395447, 0.0], [0.317976176738739, 0.21398131549358368, 0.0], [0.3100936710834503, 0.03669390827417374, 0.0], [0.309874951839447, -0.12883907556533813, 0.0], [0.3109744191169739, -0.2785774767398834, 0.0], [0.1519070267677307, -3.3753132820129395, 1.0], [0.5424819588661194, 1.4186781644821167, 1.0], [-0.0006669875583611429, 2.4443399906158447, 0.0], [0.01921052299439907, -1.5814135074615479, 1.0], [0.46854573488235474, -0.4816642701625824, 0.0], [0.32357513904571533, -0.23114366829395294, 0.0], [0.4571276307106018, -0.00810384750366211, 0.0], [0.30909448862075806, 0.15965086221694946, 0.0], [0.1388089656829834, -1.4334533214569092, 0.0], [1.7763242721557617, 1.141815185546875, 1.0], [0.003955727908760309, 2.5404818058013916, 0.0], [0.04896947741508484, -2.3577916622161865, 1.0], [-0.2954613268375397, -0.3596930503845215, 0.0], [-0.3099001944065094, -0.20347726345062256, 0.0], [0.32354849576950073, -0.002290532225742936, 0.0], [-0.3818548023700714, 0.12127528339624405, 0.0], [-0.24406060576438904, 0.2891194224357605, 0.0], [-0.20788757503032684, 0.44412916898727417, 0.0], [-0.052569448947906494, 0.3655172884464264, 0.0], [0.08527317643165588, 0.45509713888168335, 0.0], [0.21014830470085144, 0.41230425238609314, 0.0], [0.28398704528808594, 0.2503994107246399, 0.0], [0.28890159726142883, 0.07486317306756973, 0.0], [0.2825356423854828, -0.10303140431642532, 0.0], [0.2829495072364807, -0.25985416769981384, 0.0], [0.13496729731559753, -3.4287304878234863, 1.0], [0.49596431851387024, 1.4406672716140747, 1.0], [-0.00017619229038245976, 2.43485164642334, 0.0], [0.01994359865784645, -1.5861002206802368, 1.0], [0.44819870591163635, -0.48340147733688354, 0.0], [0.3085131049156189, -0.23487238585948944, 0.0], [0.43832558393478394, -0.0077955820597708225, 0.0], [0.3021593391895294, 0.15952280163764954, 0.0], [0.13533297181129456, -1.4714438915252686, 0.0], [1.6725108623504639, 1.1144156455993652, 1.0], [0.004939582664519548, 2.579457998275757, 0.0], [0.05077036842703819, -2.3809454441070557, 1.0], [-0.2854650318622589, -0.36770716309547424, 0.0], [-0.29628676176071167, -0.20928004384040833, 0.0], [0.32720935344696045, -0.006376244593411684, 0.0], [-0.3704236149787903, 0.12071643769741058, 0.0], [-0.24082399904727936, 0.2865961790084839, 0.0], [-0.20086470246315002, 0.44906145334243774, 0.0], [-0.05136623606085777, 0.36682403087615967, 0.0], [0.08198665827512741, 0.45685121417045593, 0.0], [0.19840914011001587, 0.41453519463539124, 0.0], [0.2857278883457184, 0.251175194978714, 0.0], [0.28939998149871826, 0.08174566924571991, 0.0], [0.2780449390411377, -0.10051457583904266, 0.0], [0.28313907980918884, -0.26033565402030945, 0.0], [0.13261187076568604, -3.4483394622802734, 0.0], [0.5544046759605408, 0.12672661244869232, 1.0], [-0.00704375421628356, 3.579249858856201, 0.0], [1.6644513607025146, -2.37003231048584, 1.0], [-1.5948173999786377, 1.6707009077072144, 0.0], [0.6572369933128357, -0.6740603446960449, 1.0], [1.0513203144073486, 1.4309226274490356, 0.0], [0.1612701714038849, -3.778144598007202, 1.0], [2.1111719608306885, 1.536609172821045, 1.0], [-0.004361211322247982, 2.4636354446411133, 0.0], [0.004288335330784321, -2.041325569152832, 1.0], [-0.289683073759079, -0.3702251613140106, 0.0], [-0.28891876339912415, -0.18239441514015198, 0.0], [-0.46550610661506653, 0.0024401654954999685, 0.0], [-0.32875725626945496, 0.17684072256088257, 0.0], [-0.3206830322742462, 0.36347123980522156, 0.0], [-0.17786632478237152, 0.5357925891876221, 0.0], [0.0064459191635251045, 0.34949687123298645, 0.0], [0.17498771846294403, 0.5261982083320618, 0.0], [0.31024280190467834, 0.35151076316833496, 0.0], [0.3181171715259552, 0.1780948042869568, 0.0], [0.3152407705783844, -0.0063372403383255005, 0.0], [0.30938053131103516, -0.1763341724872589, 0.0], [0.3139515519142151, -0.32645922899246216, 0.0], [0.15561287105083466, -3.415623664855957, 1.0], [0.5857200622558594, 1.4742034673690796, 1.0], [-0.0008553932420909405, 2.391827344894409, 0.0], [0.018349045887589455, -1.5510029792785645, 1.0], [0.47241997718811035, -0.4687313139438629, 0.0], [0.32433992624282837, -0.22926704585552216, 0.0], [0.4631301760673523, -0.006189442705363035, 0.0], [0.31707963347435, 0.15870241820812225, 0.0], [0.13993149995803833, -1.4852619171142578, 0.0], [1.7620902061462402, 1.15829598903656, 1.0], [0.004032923374325037, 2.5735843181610107, 0.0], [0.05165497586131096, -2.396789789199829, 1.0], [-0.29496607184410095, -0.3660910129547119, 0.0], [-0.3076121509075165, -0.2093118578195572, 0.0], [0.33139875531196594, -0.0028264273423701525, 0.0], [-0.38188496232032776, 0.12252022325992584, 0.0], [-0.24486877024173737, 0.29061946272850037, 0.0], [-0.19959399104118347, 0.4546835124492645, 0.0], [-0.052805058658123016, 0.36578473448753357, 0.0], [0.07975611835718155, 0.4560820162296295, 0.0], [0.20213982462882996, 0.4203947186470032, 0.0], [0.2841086983680725, 0.26278504729270935, 0.0], [0.2933589816093445, 0.08658912032842636, 0.0], [0.2822466492652893, -0.09642935544252396, 0.0], [0.2818332314491272, -0.260693222284317, 0.0], [0.2933501899242401, -0.3585597276687622, 0.0], [0.14072750508785248, -3.2999305725097656, 1.0], [0.5600313544273376, 0.1723354160785675, 1.0], [-0.006057913415133953, 3.6227118968963623, 0.0], [0.1478753536939621, 0.6129624843597412, 1.0], [0.3918948769569397, 0.1393222212791443, 0.0], [0.29587313532829285, -0.07622375339269638, 0.0], [-1.2180335521697998, -2.551835775375366, 1.0], [1.045478105545044, -0.0022784860339015722, 0.0], [0.3145501911640167, -1.4504656791687012, 1.0], [0.5785853862762451, 0.18530091643333435, 1.0], [0.17607848346233368, 0.25191885232925415, 0.0], [0.16979609429836273, -0.12869101762771606, 0.0], [-0.1349794864654541, -0.199789896607399, 0.0], [-0.16479742527008057, 0.17241597175598145, 0.0], [0.1994631439447403, 1.300304889678955, 1.0], [0.0018607424572110176, 2.5176641941070557, 0.0], [0.3346485495567322, -3.903935432434082, 1.0], [0.6759464740753174, 1.4642754793167114, 1.0], [-0.003093936014920473, 2.481623649597168, 0.0], [0.019015377387404442, -1.681125283241272, 1.0], [0.5108344554901123, -0.5039498805999756, 0.0], [0.3508565425872803, -0.22715027630329132, 0.0], [0.48909077048301697, -0.0025250038597732782, 0.0], [0.3277572691440582, 0.17624431848526, 0.0], [0.16704048216342926, 0.5384402871131897, 0.0], [-0.0012274339096620679, 1.804686188697815, 0.0], [0.17467623949050903, -3.8895859718322754, 1.0], [2.3083322048187256, 1.6025910377502441, 1.0], [-0.0026928510051220655, 2.526188611984253, 0.0], [-0.001069593708962202, -2.0241262912750244, 1.0], [-0.30811554193496704, -0.3720927834510803, 0.0], [-0.31192418932914734, -0.1851380467414856, 0.0], [-0.49598437547683716, 0.0026609860360622406, 0.0], [-0.3376455307006836, 0.18988347053527832, 0.0], [-0.33628910779953003, 0.3695331811904907, 0.0], [-0.16964958608150482, 0.5437768697738647, 0.0], [0.006848635617643595, 0.35668089985847473, 0.0], [0.17848284542560577, 0.5327547788619995, 0.0], [0.3260860741138458, 0.36079737544059753, 0.0], [0.3239496946334839, 0.18755650520324707, 0.0], [0.5025105476379395, -0.004008874762803316, 0.0], [0.3238425850868225, -0.17922869324684143, 0.0], [0.3289806842803955, -0.35255178809165955, 0.0], [0.16562262177467346, -3.4030256271362305, 1.0], [0.5879219770431519, 1.4762517213821411, 1.0], [-0.002050944836810231, 2.4595844745635986, 0.0], [0.01851515844464302, -1.585391640663147, 1.0], [0.48306357860565186, -0.4772140383720398, 0.0], [0.32483574748039246, -0.2383815497159958, 0.0], [0.471757709980011, -0.004870500881224871, 0.0], [0.31434500217437744, 0.16031505167484283, 0.0], [0.14267927408218384, -1.4849705696105957, 1.0], [2.0410890579223633, 1.4902784824371338, 1.0], [-0.0007621351396664977, 2.2656965255737305, 0.0], [0.02717076987028122, -2.087278366088867, 1.0], [-0.29279813170433044, -0.3535538613796234, 0.0], [-0.2905951738357544, -0.17533272504806519, 0.0], [-0.4741458296775818, -0.0021800289396196604, 0.0], [-0.3433218002319336, 0.16551801562309265, 0.0], [-0.3243195712566376, 0.34417444467544556, 0.0], [-0.18724314868450165, 0.5103429555892944, 0.0], [-0.0019055955344811082, 0.34209153056144714, 0.0], [0.16764646768569946, 0.5029971599578857, 0.0], [0.316042423248291, 0.34435945749282837, 0.0], [0.320757657289505, 0.18606197834014893, 0.0], [0.3130669891834259, 0.004603693261742592, 0.0], [0.3097468614578247, -0.15813089907169342, 0.0], [0.314214825630188, -0.30393415689468384, 0.0], [0.15871798992156982, -3.3764615058898926, 1.0], [0.554878830909729, 1.4397741556167603, 1.0], [-0.0016039212932810187, 2.403440475463867, 0.0], [0.01998845860362053, -1.562179446220398, 1.0], [0.4674331545829773, -0.4735702574253082, 0.0], [0.3261112868785858, -0.23275341093540192, 0.0], [0.4586397111415863, -0.0053159198723733425, 0.0], [0.31337395310401917, 0.160609632730484, 0.0], [0.13721723854541779, -1.455815076828003, 0.0], [1.7904316186904907, 1.1593822240829468, 1.0], [0.004998828284442425, 2.5614724159240723, 0.0], [0.047054607421159744, -2.3447837829589844, 1.0], [-0.2926504611968994, -0.36924007534980774, 0.0], [-0.30625590682029724, -0.20978936553001404, 0.0], [0.337188720703125, -0.0014650617958977818, 0.0], [-0.3864344656467438, 0.11999839544296265, 0.0], [-0.2514127194881439, 0.2898664176464081, 0.0], [-0.207907572388649, 0.45102110505104065, 0.0], [-0.05869024991989136, 0.3639843463897705, 0.0], [0.07637237012386322, 0.456021249294281, 0.0], [0.208049476146698, 0.4184497892856598, 0.0], [0.2894330322742462, 0.25908470153808594, 0.0], [0.2883315980434418, 0.08202797174453735, 0.0], [0.28558918833732605, -0.09645327925682068, 0.0], [0.28498905897140503, -0.25791969895362854, 0.0], [0.1348789483308792, -3.4424469470977783, 1.0], [0.5769221782684326, 0.1695355474948883, 1.0], [-0.004255620762705803, 3.5298213958740234, 0.0], [0.14281980693340302, 0.597472608089447, 1.0], [0.38540568947792053, 0.13986656069755554, 0.0], [0.2893635630607605, -0.07270517200231552, 0.0], [-1.220914363861084, -2.52907657623291, 1.0], [1.0662822723388672, 0.0007610020693391562, 0.0], [0.3131360411643982, -1.4465242624282837, 1.0], [0.6084470152854919, 0.1834087371826172, 1.0], [0.176920548081398, 0.23772770166397095, 0.0], [0.16834183037281036, -0.11908276379108429, 0.0], [-0.13927210867404938, -0.19716666638851166, 0.0], [-0.16108036041259766, 0.17342892289161682, 0.0], [0.20206402242183685, 1.304927945137024, 1.0], [0.0013716422254219651, 2.5015013217926025, 0.0], [0.3380327522754669, -3.876751184463501, 1.0], [0.6730442643165588, 1.453789472579956, 1.0], [-0.0032917852513492107, 2.4697256088256836, 0.0], [0.013921838253736496, -1.6563799381256104, 1.0], [0.5011619925498962, -0.4949340224266052, 0.0], [0.3492389917373657, -0.22928158938884735, 0.0], [0.4898383617401123, -0.0027958012651652098, 0.0], [0.3268123269081116, 0.1747964471578598, 0.0], [0.16192665696144104, 0.5323857665061951, 0.0], [0.0003554567229002714, 1.7996494770050049, 0.0], [0.17349596321582794, -3.891162157058716, 1.0]]]
function setup() {
createCanvas(displayWidth, displayHeight);
frameRate(60);
}
let currentIdx = 0;
function draw() {
noStroke();
fill(255, 64);
rect(0, 0, width, height);
let cx = 0;
let cy = 0;
translate(100, height/2);
stroke(0);
scale(20);
strokeWeight(0.25);
let currentData = data[currentIdx];
for (let item of currentData) {
if (item[2] == 0) {
line(cx, cy, cx+item[0], cy+item[1]);
}
cx += item[0];
cy += item[1];
}
if (frameCount % 5 == 0) {
currentIdx++;
}
if (currentIdx >= data.length) {
currentIdx = 0;
}
function normal() {
let count = 50;
let sum = 0;
for (let i = 0; i < count; i++) {
sum += random();
}
return sum / count;
}
function setup() {
createCanvas(400, 400);
background(0);
fill(255, 16);
noStroke();
console.log(normal());
}
function draw() {
background(0, 16);
fill(255, 0, 0);
ellipse(normal()*width, normal()*height, normal()*100, normal()*100);
fill(0, 0, 255);
ellipse(random()*width, random()*height, random()*100, random()*100);
var seed = 987654;
function myRandom() {
seed = (seed * seed).toString();
while (seed.length < 10) {
seed = '0'+seed;
}
seed = seed.substr(2, 6);
seed = parseInt(seed);
return seed / 1000000;
}
var pos = 0;
var step = 8;
var randomCanvas;
function setup() { 
createCanvas(200, 200);
randomCanvas = createGraphics(40, 40);
console.log(myRandom(), ",", myRandom(), ",", myRandom());
} 
function draw() {
background(0);
noSmooth();
randomCanvas.loadPixels();
for (var i = 0; i < step; i++) {
var pxval = myRandom() * 255;
for (var j = 0; j < 4; j++) {
randomCanvas.pixels[pos+j] = pxval;
}
pos += 4;
}
if (pos > randomCanvas.width * randomCanvas.height * 4) {
pos = 0;
}
randomCanvas.updatePixels();
scale(5);
image(randomCanvas, 0, 0);
}
var seed = 987654;
function myRandom() {
seed = (seed * seed).toString();
while (seed.length < 10) {
seed = '0'+seed;
}
seed = seed.substr(2, 6);
seed = parseInt(seed);
return seed / 1000000;
}
var pos = 0;
var step = 8;
var randomCanvas;
function setup() { 
pixelDensity(1);
createCanvas(200, 200);
randomCanvas = createGraphics(40, 40);
console.log(myRandom(), ",", myRandom(), ",", myRandom());
} 
function draw() {
background(0);
noSmooth();
randomCanvas.loadPixels();
for (var i = 0; i < step; i++) {
var pxval = myRandom() * 255;
for (var j = 0; j < 4; j++) {
randomCanvas.pixels[pos+j] = pxval;
}
pos += 4;
}
if (pos > randomCanvas.width * randomCanvas.height * 4) {
pos = 0;
}
randomCanvas.updatePixels();
scale(5);
image(randomCanvas, 0, 0);
}
var seed = 9385;
function myRandom() {
seed = (seed * seed).toString();
while (seed.length < 8) {
seed = '0'+seed;
}
seed = seed.substr(2, 4);
seed = parseInt(seed);
return seed / 10000;
}
var pos = 0;
var step = 8;
var randomCanvas;
function setup() { 
pixelDensity(1);
createCanvas(200, 200);
randomCanvas = createGraphics(40, 40);
console.log(myRandom(), ",", myRandom(), ",", myRandom());
} 
function draw() {
background(0);
noSmooth();
randomCanvas.loadPixels();
for (var i = 0; i < step; i++) {
var pxval = myRandom() * 255;
for (var j = 0; j < 4; j++) {
randomCanvas.pixels[pos+j] = pxval;
}
pos += 4;
}
if (pos > randomCanvas.width * randomCanvas.height * 4) {
pos = 0;
}
randomCanvas.updatePixels();
scale(5);
image(randomCanvas, 0, 0);
}
let output;
function setup() {
noCanvas();
output = createDiv("");
output.style(
"word-wrap: break-word; background-color: blue; color: cyan;");
frameRate(30);
}
function draw() {
output.html(random(["╱", "╲"]), true);
}function setup() { 
createCanvas(400, 400);
let v1 = createVector("1", "2");
let v2 = createVector("300", "400");
v1.add(v2);
console.log(v1.x, v1.y);
} 
function draw() { 
background(220);
}let antonyms;
function preload() {
antonyms = loadJSON("antonyms.json"); 
}
function setup() { 
createCanvas(1024, 720);
strokeJoin(ROUND);
frameRate(1);
}
function draw() { 
background(250);
let i = int(random(antonyms.antonyms.length));
let w1 = antonyms.antonyms[i][0];
let w2 = antonyms.antonyms[i][1];
w1 = w1.replace(/_/g, ' ').toUpperCase();
w2 = w2.replace(/_/g, ' ').toUpperCase();
textAlign(CENTER, BASELINE);
textFont("Work Sans");  
let bigSize = 144;
textSize(bigSize);
while (textWidth(w1) > width * 0.8) {
bigSize -= 5;
textSize(bigSize);
}
strokeWeight(4);
fill(40);
text(w1, width/2, height/2);
fill(40);
noStroke();
rect(0, height/2, width, height);
let bigSize2 = 144;
textSize(bigSize2);
while (textWidth(w2) > width * 0.8) {
bigSize2 -= 5;
textSize(bigSize2);
}
stroke(250);
fill(250);
noStroke();
translate(width/2, height/2);
rotate(PI);
text(w2, 0, 0);
}let antonyms;
function preload() {
antonyms = loadJSON("antonyms.json"); 
}
function setup() { 
createCanvas(1024, 720);
strokeJoin(ROUND);
frameRate(1);
console.log(antonyms);
}
function draw() { 
background(250);
let i = int(random(antonyms.antonyms.length));
let w1 = antonyms.antonyms[i][0];
let w2 = antonyms.antonyms[i][1];
w1 = w1.replace(/_/g, ' ').toUpperCase();
w2 = w2.replace(/_/g, ' ');
textAlign(CENTER, CENTER);
textFont("Work Sans");
let bigSize = 144;
textSize(bigSize);
while (textWidth(w1) > width * 0.8) {
bigSize -= 5;
textSize(bigSize);
}
strokeWeight(4);
fill(40);
text(w1, width/2, height/2);
textFont("Playfair Display");
textSize(bigSize * 0.5);
strokeWeight(8);
stroke(40);
fill(250);
text(w2, width/2, height/2);
i++;
}let lines = `Rose, harsh rose, 
marred and with stint of petals, 
meagre flower, thin, 
sparse of leaf, 
more precious 
than a wet rose 
single on a stem— 
you are caught in the drift. 
Stunted, with small leaf, 
you are flung on the sand, 
you are lifted 
in the crisp sand 
that drives in the wind.`.split("\n");
function setup() { 
noCanvas();
let count = lines.length;
for (let i = 0; i < count; i++) {
let rotDeg = ((i/count) * 360);
let elem = createDiv("");
let span = createDiv(lines[i]);
elem.position(windowWidth/2, windowHeight/2);
elem.style("width", "350px");
elem.style("font-family", "sans-serif");
elem.style("font-size", "20px");    
elem.style("color", "rgba(0, 0, 0)");
elem.style("transform-origin", "right");
let transforms = [];
if (rotDeg > 90 && rotDeg < 270) {
transforms.push("scaleY(-1)");
span.style("transform", "scaleX(-1)");
span.style("text-align", "right");
}
transforms.push("perspective(400px)");
transforms.push("rotateZ("+rotDeg+"deg)");
transforms.push("rotateY(80deg)");
elem.style("transform", transforms.join(" "));
elem.child(span);
}
} 
function draw() { 
background(220);
}function setup() { 
createCanvas(400, 400);
colorMode(HSB);
rectMode(CENTER);
} 
function draw() { 
background(0);
noStroke();
fill((frameCount*0.5+60) % 360, 150, 100, 128);
rect(width/2, height/2, 200, 200);
}let font;
let pts;
let ptsPolar;
let centeredPts;
let centerX;
let centerY;
let sequence = [];
let sequenceStrs = ["weighed", "wedgewood", "westwood", "weldwood", "wildwood", "wildwoods", "woodwinds", "winwood", "woodwind", "wohlwend", "whirlwind", "windward", "winward", "wynyard", "wayward", "hayward", "keywords", "keyword", "seaward", "leeward", "derouin", "derouen", "westward", "westwards", "westworld", "neworld", "marooned", "numerals", "numeral", "numerous", "humerous", "humerus", "humorist", "humorists", "humoral", "funeral", "funerals", "funerary", "honorary", "honoree", "honorably", "admirably", "admirable", "adaptable", "adoptable", "audible", "adabelle", "edibles", "audibles", "doubles", "bubbles", "gubbels", "bubbled", "doubled", "lebudde", "debatable"];
let transitions = [];
function preload() {
font = loadFont("LeagueGothic-Regular.otf");
}
function mapClosest(a, b, rfactor) {
let m = new Map();
let s = new Set();
for (let i = 0; i < a.length; i++) {
let closestIdx = -1;
let closestScore = 0;
for (let j = 0; j < b.length; j++) {
let d = dist(a[i].x, a[i].y, b[j].x, b[j].y);
d += random(d * (rfactor * -1), d * rfactor);
if (closestIdx == -1 || d < closestScore) {
closestIdx = j;
closestScore = d;
}
}
m[i] = closestIdx;
s.add(closestIdx);
}
return {'map': m, 'present': s};
}
function setup() { 
createCanvas(600, 600);
for (let item of sequenceStrs) {
pts = font.textToPoints(item, 0, 0, 100,
{sampleFactor: 0.85,
simplifyThreshold: 0});
centerX = pts.map(item => item.x).reduce((a, b) => a + b) / pts.length;
centerY = pts.map(item => item.y).reduce((a, b) => a + b) / pts.length;
centeredPts = pts.map(item => ({x: item.x - centerX, y: item.y - centerY}));
sequence.push(centeredPts);
}
for (let i = 0; i < sequence.length; i++) {
let nextIdx = i + 1;
if (nextIdx >= sequence.length) {
nextIdx = 0;
}
let m = mapClosest(sequence[i], sequence[nextIdx], 0.0);
transitions.push(m);
}
} 
function ns(x, y, z, scale_, min_, max_) {
return map(
noise(x*scale_, y*scale_, z*scale_),
0, 1, min_, max_);
}
let idx = 0;
let count = 0;
let tframes = 64;
let colorSpd = 0.9;
function draw() { 
background(0);
noStroke();
push();
translate(width/2, height/2);
let currentPts = sequence[idx];
let nextIdx = (idx + 1) % sequence.length;
let lastIdx = (idx - 1);
if (lastIdx < 0) {
lastIdx = sequence.length - 1;
}
for (let i = 0; i < currentPts.length; i++) {
let coord = currentPts[i];
let coordNext = sequence[nextIdx][transitions[idx].map[i]];
if (!transitions[lastIdx].present.has(i)) {
fill((frameCount*colorSpd) % 360, 150, 100, lerp(0, 255, count / tframes));
}
else {
fill((frameCount*colorSpd) % 360, 150, 100);
}
ellipse(lerp(coord.x, coordNext.x, count / tframes),
lerp(coord.y, coordNext.y, count / tframes),
3, 3);
}
pop();
count++;
if (count > tframes) {
idx++;
count = 0;
}
if (idx >= sequence.length) {
idx = 0;
}
}let font;
let pts;
function preload() {
font = loadFont("LeagueGothic-Regular.otf");
}
function setup() { 
createCanvas(720, 480);
pts = font.textToPoints('a place for every-', 20, 120, 120,
{sampleFactor: 0.8,
simplifyThreshold: 0});
let pts2 = font.textToPoints('thing and every-', 20, 240, 120,
{sampleFactor: 0.8,
simplifyThreshold: 0});
let pts3 = font.textToPoints('thing in its place', 20, 360, 120,
{sampleFactor: 0.8,
simplifyThreshold: 0});
pts = pts.concat(pts2);
pts = pts.concat(pts3);
} 
function ns(x, y, z, scale_, min_, max_) {
return map(
noise(x*scale_, y*scale_, z*scale_),
0, 1, min_, max_);
}
let xz = Math.random()*99999;
let yz = Math.random()*99999;
function draw() { 
background(240, 96);
noStroke();
fill(40, 128);
push();
translate(0, 0);
for (let i = 0; i < pts.length; i++) {
let elSize = 2;
let xcoord = pts[i].x;
let ycoord = pts[i].y;
if (ns(xcoord, ycoord, xz, 0.0075, 0, 1) > 0.5) {
xcoord += 10;
ycoord += 15;
}
if (ns(xcoord, ycoord, yz, 0.01, 0, 1) > 0.5) {
elSize = 3;
}
else {
elSize = 2;
}
ellipse(xcoord, ycoord, elSize);
}
pop();
xz += 2;
yz += 1;
}let font;
let pts;
let ptsPolar;
let centeredPts;
let centerX;
let centerY;
let sequence = [];
let sequenceStrs = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
let gradedTransitions = [];
function preload() {
font = loadFont("LeagueGothic-Regular.otf");
}
function mapClosest(a, b, rfactor) {
let m = new Map();
let s = new Set();
for (let i = 0; i < a.length; i++) {
let closestIdx = -1;
let closestScore = 0;
for (let j = 0; j < b.length; j++) {
let d = dist(a[i].x, a[i].y, b[j].x, b[j].y);
d += random(d * (rfactor * -1), d * rfactor);
if (closestIdx == -1 || d < closestScore) {
closestIdx = j;
closestScore = d;
}
}
m[i] = closestIdx;
s.add(closestIdx);
}
return {'map': m, 'present': s};
}
function setup() { 
createCanvas(600, 600);
for (let item of sequenceStrs) {
pts = font.textToPoints(item, 0, 0, 65,
{sampleFactor: 0.8,
simplifyThreshold: 0});
centerX = pts.map(item => item.x).reduce((a, b) => a + b) / pts.length;
centerY = pts.map(item => item.y).reduce((a, b) => a + b) / pts.length;
centeredPts = pts.map(item => ({x: item.x - centerX, y: item.y - centerY}));
sequence.push(centeredPts);
}
for (let rfactor = 0; rfactor <= 10; rfactor++) {
let transitions = [];
for (let i = 0; i < sequence.length; i++) {
let nextIdx = i + 1;
if (nextIdx >= sequence.length) {
nextIdx = 0;
}
let m = mapClosest(sequence[i], sequence[nextIdx], rfactor / 10);
transitions.push(m);
}
gradedTransitions.push(transitions);
}
console.log(gradedTransitions.length);
} 
function ns(x, y, z, scale_, min_, max_) {
return map(
noise(x*scale_, y*scale_, z*scale_),
0, 1, min_, max_);
}
let idx = 0;
let tframes = 30;
function draw() {
noLoop();
background(250);
noStroke();
fill(40);
let currentT = gradedTransitions[0];
for (let idx = 0; idx < sequence.length; idx++) {
let gridx = idx % 11;
let gridy = int(idx / 11);
push();
translate(50 + (gridx * 50), 75 + (gridy * 110));
let currentPts = sequence[idx];
let nextIdx = (idx + 1) % sequence.length;
let lastIdx = (idx - 1);
if (lastIdx < 0) {
lastIdx = sequence.length - 1;
}
for (let i = 0; i < currentPts.length; i++) {
let coord = currentPts[i];
let coordNext = sequence[nextIdx][currentT[idx].map[i]];
fill(40, lerp(0, 255, (frameCount % tframes)/tframes));
}
else {
fill(40);
fill(0, 240);
ellipse(
lerp(coord.x, coordNext.x, 0.65),
lerp(coord.y, coordNext.y, 0.65),
2, 2);
fill(0, 40);
ellipse(
lerp(coord.x, coordNext.x, 0),
lerp(coord.y, coordNext.y, 0),
5, 5);
fill(0, 40);
ellipse(
lerp(coord.x, coordNext.x, 1),
lerp(coord.y, coordNext.y, 1),
}
pop();
}
}let font;
let pts;
let ptsPolar;
let centeredPts;
let centerX;
let centerY;
let sequence = [];
let sequenceStrs = "abcdefghijklmnopqrstuvwxyz".split("");
let transitions = [];
function preload() {
font = loadFont("Comic Sans MS.ttf");
}
function mapClosest(a, b, rfactor) {
let m = new Map();
let s = new Set();
for (let i = 0; i < a.length; i++) {
let closestIdx = -1;
let closestScore = 0;
for (let j = 0; j < b.length; j++) {
let d = dist(a[i].x, a[i].y, b[j].x, b[j].y);
d += random(d * (rfactor * -1), d * rfactor);
if (closestIdx == -1 || d < closestScore) {
closestIdx = j;
closestScore = d;
}
}
m[i] = closestIdx;
s.add(closestIdx);
}
return {'map': m, 'present': s};
}
function setup() { 
createCanvas(600, 600);
for (let item of sequenceStrs) {
pts = font.textToPoints(item, 0, 0, 400,
{sampleFactor: 0.95,
simplifyThreshold: 0});
centerX = pts.map(item => item.x).reduce((a, b) => a + b) / pts.length;
centerY = pts.map(item => item.y).reduce((a, b) => a + b) / pts.length;
centeredPts = pts.map(item => ({x: item.x - centerX, y: item.y - centerY}));
sequence.push(centeredPts);
}
for (let i = 0; i < sequence.length; i++) {
let nextIdx = i + 1;
if (nextIdx >= sequence.length) {
nextIdx = 0;
}
let m = mapClosest(sequence[i], sequence[nextIdx], 0.05);
transitions.push(m);
}
} 
function ns(x, y, z, scale_, min_, max_) {
return map(
noise(x*scale_, y*scale_, z*scale_),
0, 1, min_, max_);
}
let idx = 0;
let tframes = 32;
function draw() { 
background(0);
noStroke();
fill(250);
push();
translate(width/2, height/2);
let currentPts = sequence[idx];
let nextIdx = (idx + 1) % sequence.length;
let lastIdx = (idx - 1);
if (lastIdx < 0) {
lastIdx = sequence.length - 1;
}
for (let i = 0; i < currentPts.length; i++) {
let coord = currentPts[i];
let coordNext = sequence[nextIdx][transitions[idx].map[i]];
if (!transitions[lastIdx].present.has(i)) {
fill(255, lerp(0, 255, (frameCount % tframes)/tframes));
}
else {
fill(255);
}
ellipse(lerp(coord.x, coordNext.x, (frameCount % tframes)/tframes),
lerp(coord.y, coordNext.y, (frameCount % tframes)/tframes),
8, 8);
}
pop();
if (frameCount % tframes == tframes - 1) {
idx++;
}
if (idx >= sequence.length) {
idx = 0;
}
}let font;
let pts;
let ptsPolar;
let centeredPts;
let centerX;
let centerY;
function preload() {
font = loadFont("LeagueGothic-Regular.otf");
}
function toP(x, y) {
return [sqrt(sq(x) + sq(y)), atan2(y, x)]
}
function toC(r, theta) {
return [r * cos(theta), r * sin(theta)];
}
function setup() { 
createCanvas(600, 600);
pts = font.textToPoints('uh okay?', 0, 0, 125,
{sampleFactor: 0.75,
simplifyThreshold: 0});
centerX = pts.map(item => item.x).reduce((a, b) => a + b) / pts.length;
centerY = pts.map(item => item.y).reduce((a, b) => a + b) / pts.length;
console.log(centerX, centerY);
centeredPts = pts.map(item => ({x: item.x - centerX, y: item.y - centerY}));
ptsPolar = centeredPts.map(item => toP(item.x, item.y));
console.log(ptsPolar.length);
} 
function ns(x, y, z, scale_, min_, max_) {
return map(
noise(x*scale_, y*scale_, z*scale_),
0, 1, min_, max_);
}
let xz = 0;
let yz = 1000;
function draw() { 
background(250);
noStroke();
fill(40);
push();
translate(width/2, height/2);
for (let i = 0; i < ptsPolar.length; i++) {
let polar = ptsPolar[i];
let coord = toC(
lerp(log(polar[0]) * 50, polar[0], (mouseX/width)),
polar[1]+(map(sin((polar[0]+frameCount)*0.011), -1, 1, 0, PI)));
ellipse(coord[0], coord[1], 5, 5);
}
pop();
xz += 2;
yz += 2;
}let font;
let pts;
function preload() {
font = loadFont("LeagueGothic-Regular.otf");
}
function setup() { 
createCanvas(600, 400);
pts = font.textToPoints('Allison', 0, 0, 250,
{sampleFactor: 0.9,
simplifyThreshold: 0});
} 
function ns(x, y, z, scale_, min_, max_) {
return map(
noise(x*scale_, y*scale_, z*scale_),
0, 1, min_, max_);
}
let xz = 0;
let yz = 1000;
function draw() { 
background(0);
noStroke();
fill(0, 255, 0);
push();
translate(75, 275);
for (let i = 0; i < pts.length; i++) {
let xoff = ns(pts[i].x, pts[i].y, xz, 0.005, -50, 50);
let yoff = ns(pts[i].y, pts[i].x, yz, 0.005, -50, 50);
ellipse(pts[i].x + xoff, pts[i].y + yoff, 5, 5);
}
pop();
xz += 2;
yz += 2;
}let override = false;
let limit = 7 * 60 * 1000;
function setup() { 
createCanvas(windowWidth, windowHeight);
} 
function draw() {
if ((millis() > limit) || override) {
textSize(400 * sin(frameCount * 0.1) + 600);
textAlign(CENTER, CENTER);
if (int(frameCount / 50) % 2 == 0) {
background(0);
fill(255, 255, 0);
text("NEXT", width/2, height/2);
}
else {
background(255, 255, 0);
fill(0);
text("NEXT", width/2, height/2);
}
}
else {
background(0);
textSize(24);
fill(255);
textAlign(LEFT, TOP);
let left = int(limit - millis());
let leftMins = int(left / 60000);
let leftSeconds = int((left % 60000) / 1000);
text(leftMins.toString() + "m" + leftSeconds + "s remain", 20, 20);
}
}
function mousePressed() {
override = !override;
}
let colors = [];
let colorInput;
let anchor;
function setup() { 
createCanvas(400, 400);
console.log(window.location.search);
if (window.location.search) {
let query = window.location.search.substring(1);
colors = query.split(",");
}
if (colors.length == 0) {
colorInput = createInput("type a color value here");
anchor = createA("", "your color");
}
} 
function draw() {
if (colors.length > 0) {
background(colors);
}
else {
background(0);
}
anchor.attribute("href", "?" + colorInput.value());
}
let sourceText = "Life is short and art long";
let words = sourceText.split(" ");
console.log(words);
function setup() { 
createCanvas(400, 400);
background(220);
} 
function draw() { 
let ridx = int(random(words.length));
textSize(random(24, 100));
fill(random(255));
stroke(0);
textAlign(CENTER, CENTER);
translate(random(width), random(height));
rotate(random(TWO_PI));
text(words[ridx], random(width), random(height));
}function setup() { 
createCanvas(400, 400);
} 
let myString = "😀😃😄";
let tsize = 48;
function draw() { 
background(220);
textSize(tsize);
fill(0);
let twidth = textWidth(myString);
text(myString, 50, 100);
if ((mouseX > 50) && (mouseX < (50 + twidth)) &&
(mouseY > (100 - tsize)) && (mouseY < 100)) {
fill(255, 0, 0, 128);
}
else {
noFill();
}
rect(50, 100 - tsize, twidth, tsize);
}let sourceText = "The quick brown fox jumps yay!";
function setup() { 
createCanvas(400, 400);
frameRate(10);
} 
function draw() { 
background(220);
fill(0);
textSize(24);
let textEnd = map(mouseY, 0, height,
0, sourceText.length);
text(sourceText.substring(0, textEnd),
10, height/2);
}let sourceText = "The quick brown fox jumps over the lazy dog";
let currentIndex = 0;
function setup() { 
createCanvas(400, 400);
frameRate(10);
} 
function draw() { 
background(220);
fill(0);
textSize(144);
textAlign(CENTER, CENTER);
text(sourceText[currentIndex],
width/2, height/2);
currentIndex++;
if (currentIndex >= sourceText.length) {
currentIndex = 0;
}
}let ourText = `It was the
best of times,
it was t
he worst of times,
such good t
ime
s.`;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
fill(0);
textSize(50 + cos(frameCount * 0.025) * 25);
textLeading(sin(frameCount * 0.01)*50);
text(ourText, 40, height/2, 300, 350);
}
let myFont;
function preload() {
myFont = loadFont("knewave.otf");
}
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
textSize(48);
fill(0);
textAlign(LEFT, BOTTOM);
text("Piggy", 200, 100);
fill(0, 255, 0);
ellipse(200, 100, 15, 15);
fill(0);
textAlign(CENTER);
text("Piggy", 200, 200);
fill(0, 255, 0);
ellipse(200, 200, 15, 15);
fill(0);
textAlign(RIGHT);
text("Piggy", 200, 300);
fill(0, 255, 0);
ellipse(200, 300, 15, 15);
class BlobTimer {
constructor(xpos, ypos) {
this.xpos = xpos;
this.ypos = ypos;
this.rotation = random(TWO_PI);
this.ellipseSize = random(10, 25);
this.lastBlobTime = millis();
this.blobs = [];
this.addBlob();
}
update() {
if (millis() > this.lastBlobTime + 1000) {
this.addBlob();
this.lastBlobTime = millis();
}
}
addBlob() {
let c = random(255);
this.blobs.push(c);
}
display() {
push();
translate(this.xpos, this.ypos);
rotate(this.rotation);
for (let i = 0; i < this.blobs.length; i++) {
fill(this.blobs[i]);
ellipse(i * 20,
0,
this.ellipseSize);
}
pop();
}
}
let timers = [];
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
for (let i = 0; i < timers.length; i++) {
timers[i].update();
timers[i].display();
}
}
function mousePressed() {
timers.push(new BlobTimer(mouseX, mouseY));
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
textAlign(LEFT, TOP);
textLeading(0);
text("This\nis\na\ntest", 20, 20);
}class Kitty {
constructor(img, x, y, speed) {
this.img = img;
this.x = x;
this.y = y;
this.xspeed = random(-10, 0);
this.isMoving = false;
}
display() {
image(this.img, this.x, this.y);
}
update() {
if (this.isMoving) {
this.x += this.xspeed;
if (this.x < 0 || this.x > width) {
this.xspeed = this.xspeed * -1;
}
}
}
start() {
this.isMoving = true;
}
setSpeed(x) {
this.xspeed = x;
}
}
let kittyImage;
let puppyImage;
function preload() {
kittyImage = loadImage("kitty_transparent.png");
puppyImage = loadImage("puppy.jpg");
}
let kitties = [];
function setup() { 
createCanvas(400, 400);
kitties.push(new Kitty(kittyImage, random(width),
random(height)));
kitties.push(new Kitty(puppyImage, random(width),
random(height)));
} 
function draw() { 
background(220);
for (let i = 0; i < kitties.length; i++) {
kitties[i].display();
kitties[i].update();
}
}
function mousePressed() {
for (let i = 0; i < kitties.length; i++) {
kitties[i].start();
}
}var osc = new Tone.Oscillator({
"frequency" : 440,
"volume" : 1
}).toMaster();
osc.start();
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
}let ourText = `It was the best of times,
it was the worst of times,
it was the age of wisdom,
it was the age of foolishness,
it was the epoch of belief,
it was the epoch of incredulity,
it was the season of Light,
it was the season of Darkness,
it was the spring of hope,
it was the winter of despair,
we had everything before us,
we had nothing before us,
we were all going direct to Heaven,
we were all going direct the other way--
in short, the period was so far like the present period, that some of
its noisiest authorities insisted on its being received, for good or for
evil, in the superlative degree of comparison only.`
ourText = ourText.replace(/\n/g, " ");
let ourWords = ourText.split(" ");
let i = 0;
function setup() { 
createCanvas(400, 400);
frameRate(10);
} 
function draw() { 
background(220);
textAlign(CENTER, CENTER);
textSize(random(50, 100));
let currentWord = ourWords[i];
text(currentWord, width/2, height/2);
i++;
if (i >= ourWords.length) {
i = 0;
}
}let ourText = "Center for the Recently Possible";
let i = 0;
function setup() { 
createCanvas(400, 400);
frameRate(10);
} 
function draw() { 
background(220);
textAlign(CENTER, CENTER);
textSize(100);
let currentChar = ourText.substring(i, i+1);
text(currentChar, width/2, height/2);
i++;
if (i > ourText.length) {
i = 0;
}
}var textinput;
var myFont;
function preload() {
myFont = loadFont("knewave.otf");
}
function setup() { 
createCanvas(400, 400);
textinput = createInput(
"It was the best of times, it was the worst of times, such good times."
);
} 
function draw() { 
background(50);
fill(255);
textSize(50);  
textFont(myFont);
textAlign(CENTER, CENTER);
textLeading(sin(frameCount * 0.05) * 50);
text(textinput.value(), 0, 0, 400, 400);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(50);
fill(255, 192);
stroke(0, 192);
strokeWeight(2);
let spacing = 20;
for (let i = spacing/2; i < width; i += spacing) {
for (let j = spacing/2; j < height; j += spacing) {
let d = dist(mouseX, mouseY, i, j);
ellipse(i, j, d * 0.1);
let sinVal = sin((frameCount * 0.01) + (i * 0.02));
let cosVal = cos((frameCount * 0.01) + (j * -0.02));
let elSize = map(sinVal * cosVal, -1, 1, 0, 40);
ellipse(i, j, elSize);
let pnoiseVal = noise(i * 0.02,
j * 0.02,
frameCount * 0.01);
ellipse(i, j, pnoiseVal * 50);
let pnoiseVal = noise(i * 0.01,
j * 0.01,
frameCount * 0.005);
if (pnoiseVal < 0.4) {
noFill();
stroke(255);
strokeWeight(2);
ellipse(i, j, 20);
}
else if (pnoiseVal < 0.6) {
stroke(255);
strokeWeight(2);
line(i - (spacing/2), j - (spacing/2),
i + (spacing/2), j + (spacing/2));
}
else {
stroke(255);
strokeWeight(6);
line(i + (spacing/4), j - (spacing/4),
i - (spacing/4), j + (spacing/4));
}
}
}function setup() {
createCanvas(windowWidth, windowHeight);
colorMode(HSB);
} 
let ellipseSize = 50;
function draw() {
background(0);
fill(rotationZ, 128, 128);
ellipse(width/2, height/2,
map(rotationX, -180, 180, 0, width),
map(rotationY, -90, 90, 0, height));
fill(255);
text(rotationX, width/2, height/2);
text(rotationY, width/2, height/2+20);
background(50 * touches.length);
if (touches.length >= 2) {
let d = dist(touches[0].x, touches[0].y,
touches[1].x, touches[1].y);
ellipse(width/2, height/2, d, d);
}
function mousePressed() {
ellipseSize += 10;
}
function touchMoved() {
return false;
var apiKey = '&APPID=bcd6fa161a6caa18cc4d3ce8d03f274b';
var units = '&units=metric';
function setup() { 
createCanvas(400, 150);
} 
function preload() {
}
function weatherQuery() {
var url = api + "London" + apiKey + units;
console.log(url);
loadJSON(url, gotData);
}
function gotData(data) {
console.log("in gotData", data);
}
function draw() { 
background(250);
}
function mousePressed() {
weatherQuery();
}var sel;
var weather; 
var apiKey = '&APPID=bcd6fa161a6caa18cc4d3ce8d03f274b';
var units = '&units=metric';
var weatherIcons = [];
function setup() { 
createCanvas(400, 150);
sel = createSelect();
sel.position(220, 20);
sel.option('Cities');
sel.option('London');
sel.option('New York');
sel.option('Singapore');
sel.option('Hong Kong');
sel.option('Paris');
sel.option('Beijing');
sel.option('Tokyo');
sel.option('Dubai');
sel.option('Shanghai');
sel.option('Sydney');
sel.option('São Paulo');
sel.option('Milan');
sel.option('Chicago');
sel.option('Mexico City');
sel.option('Mumbai');
sel.option('Moscow');
sel.option('Frankfurt');
sel.option('Madrid');
sel.option('Warsaw');
sel.option('Johannesburg');
sel.option('Toronto');
sel.option('Seoul');
sel.option('Kuala Lumpur');
sel.option('Istanbul');
sel.option('Jakarta');
sel.option('Amsterdam');
sel.option('Brussels');
sel.option('Los Angeles');
sel.option('Taipei');
sel.changed(mySelectEvent);
} 
function weatherQuery() {
var url = api + sel.value() + apiKey + units;
loadJSON(url, gotData);
}
function gotData(data) {
weather = data;
}
function mySelectEvent() {
var item = sel.value();
weatherQuery();
}
function preload() {
}
function draw() { 
background(250);
rect(20, 90, 30, 30);
textAlign(LEFT);
textFont('OpenSans',[14]);
text('Check the current weather of:', 20, 40);
textFont('OpenSans',[14]);
text('Humidity:', 200, 100);
text('Wind:', 200, 125);
text('°C', 160, 100);
rect(20, 150, 40, 40);
if(weather) {
textFont('OpenSans', [48]); 
text(floor(weather.main.temp), 100, 125)
textFont('OpenSans', [14]);
text(weather.main.humidity + '%', 280, 100)
text(weather.wind.speed + 'km/h', 250, 125);
textFont('OpenSans', [10]);
text(weather.weather[0].description, 20, 70);
if (weather.weather[0].icon == '01d'){
image(weatherIcons[0], 20, 100);
}
if (weather.weather[0].icon == '01n'){
image(weatherIcons[1], 20, 100);
}
if (weather.weather[0].icon == '02d'){
image(weatherIcons[2], 20, 100);
}
if (weather.weather[0].icon == '02n'){
image(weatherIcons[3], 20, 100);
}
if (weather.weather[0].icon == '03d'){
image(weatherIcons[4], 20, 100);
}
if (weather.weather[0].icon == '03n'){
image(weatherIcons[5], 20, 100);
}
if (weather.weather[0].icon == '04d'){
image(weatherIcons[6], 20, 100);
}
if (weather.weather[0].icon == '04n'){
image(weatherIcons[7], 20, 100);
}
if (weather.weather[0].icon == '09d'){
image(weatherIcons[8], 20, 100);
}
if (weather.weather[0].icon == '09n'){
image(weatherIcons[9], 20, 100);
}
if (weather.weather[0].icon == '10d'){
image(weatherIcons[10], 20, 100);
}
if (weather.weather[0].icon == '10n'){
image(weatherIcons[11], 20, 100);
}
if (weather.weather[0].icon == '11d'){
image(weatherIcons[12], 20, 100);
}
if (weather.weather[0].icon == '11n'){
image(weatherIcons[13], 20, 100);
}
if (weather.weather[0].icon == '13d'){
image(weatherIcons[14], 20, 100);
}
if (weather.weather[0].icon == '13n'){
image(weatherIcons[15], 20, 100);
}
if (weather.weather[0].icon == '50d'){
image(weatherIcons[16], 20, 100);
}
if (weather.weather[0].icon == '50n'){
image(weatherIcons[17], 20, 100);
}
}
}let capture;
function preload() {
}
function setup() {
createCanvas(400, 400);
capture = createCapture(VIDEO);
capture.size(width, height);
capture.hide();
background(0);
} 
function draw() {
background(0, 16);
capture.loadPixels();
for (let cx = 0; cx < width; cx += 10) {
for (let cy = 0; cy < height; cy += 10) {
let offset = int(((cy*capture.width)+cx)*4);
let greenc = capture.pixels[offset+1];
fill(255, 64);
noStroke();
let elSize = map(greenc, 0, 255, 0, 15);
ellipse(cx, cy, elSize, elSize);
}
}
}let capture;
function preload() {
}
function setup() {
createCanvas(400, 400);
capture = createCapture(VIDEO);
capture.size(width, height);
capture.hide();
} 
function draw() {
capture.loadPixels();  
for (let i = 0; i < 1000; i++) {
let rx = int(random(capture.width));
let ry = int(random(capture.height));
let offset = int(((ry*capture.width)+rx)*4);
let redc = capture.pixels[offset];
let greenc = capture.pixels[offset+1];
let bluec = capture.pixels[offset+2];
let alphac = capture.pixels[offset+3];
fill(redc, redc, redc);
noStroke();
ellipse(rx, ry, greenc * 0.1, greenc * 0.1);
}
}let kitty;
function preload() {
kitty = loadImage("kitty_transparent.png");
}
function setup() {
createCanvas(400, 400);
} 
function draw() { 
kitty.loadPixels();
for (let i = 0; i < 25000; i++) {
let rx = int(random(kitty.width));
let ry = int(random(kitty.height));
let offset = ((ry*kitty.width)+rx)*4;
let redc = kitty.pixels[offset];
let greenc = kitty.pixels[offset+1];
let bluec = kitty.pixels[offset+2];
let alphac = kitty.pixels[offset+3];
fill(redc, greenc, bluec, alphac);
noStroke();
ellipse(rx, ry, 5, 5);
}
}let paragraphs = [];
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
if (frameCount % 30 == 0 && paragraphs.length > 0) {
let randomIndex = int(random(paragraphs.length));
paragraphs[randomIndex].remove();
paragraphs.splice(randomIndex, 1);
}
}
function mousePressed() {
let newp = createP("hello!");
newp.position(random(width), random(height));
paragraphs.push(newp);
}let imgtag;
function setup() { 
createCanvas(400, 400);
imgtag = createImg();
imgtag.position(0, 0);
} 
function draw() { 
background(220);
}
function mousePressed() {
let resp = loadJSON(
giphyLoaded);
}
function giphyLoaded(respObj) {
console.log("in loaded", respObj);
let imgsrc = respObj.data.image_original_url;
imgtag.attribute('src', imgsrc);
}
let imgtag;
function setup() { 
createCanvas(400, 400);
imgtag = createImg();
imgtag.position(0, 0);
} 
function draw() { 
background(220);
}
function mousePressed() {
let resp = loadJSON(
giphyLoaded);
}
function giphyLoaded(respObj) {
console.log("in loaded", respObj);
let imgsrc = respObj.data.image_original_url;
imgtag.attribute('src', imgsrc);
}
let coughX = 200;
let coughY = 150;
let coughXspeed = 3;
let coughYspeed = 7;
let coughSize = 48;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
textSize(coughSize);
text("cough", coughX, coughY);
coughX += coughXspeed;
coughY += coughYspeed;
if (coughSize > 0) {
coughSize--;
}
}
function mousePressed() {
coughX = random(width);
coughY = random(height);
coughXspeed = random(-5, 5);
coughYspeed = random(-5, 5);
coughSize = random(48, 144);
}function setup() { 
createCanvas(windowWidth, windowHeight);
console.log("hello!");
} 
function draw() { 
background(220, 0, 0);
for (let i = 0; i < touches.length; i++) {
ellipse(touches[i].x,
touches[i].y,
25, 25);
}
if (frameCount % 60 == 0) {
console.log(touches);
}
}
function touchMoved() {
return false;
}var cap;
function setup() {
createCanvas(400, 400);
cap = createCapture(VIDEO);
cap.size(400, 400);
cap.hide();
}
function draw() {
background(50);
noStroke();
cap.loadPixels();
for (let cx = 0; cx < cap.width; cx += 10) {
for (let cy = 0; cy < cap.height; cy += 10) {
let offset = ((cy * cap.width) + cx) * 4;
push();
rectMode(CENTER);
translate(cx, cy);
rotate(map(cap.pixels[offset+1], 0, 255,
0, TWO_PI));
rect(0, 0, cap.pixels[offset] * 0.05,
cap.pixels[offset] * 0.05);
textSize(cap.pixels[offset] * 0.1);
fill(255);
text("🌤", 0, 0);
pop();
}
}
}
class SoundBall {
constructor() {
this.x = random(width);
this.y = random(height);
this.osc = new p5.Oscillator();
this.osc.freq(random(100, 500));
this.osc.amp(random(0.05, 0.2));
this.osc.start();
}
display() {
ellipse(this.x, this.y, 50, 50);
this.x += random(-1, 1);
this.y += random(-1, 1);
}
}
let soundballs = [];
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
for (let i = 0; i < soundballs.length; i++) {
soundballs[i].display();
}
}
function mouseClicked() {
soundballs.push(new SoundBall());
}
var osc;
var playing = false;
function setup() {
backgroundColor = color(255,0,255);
textAlign(CENTER);
osc = new p5.Oscillator();
osc.setType('square');
osc.freq(120);
osc.amp(0.5);
osc.start();
volOsc = new p5.Oscillator();
volOsc.disconnect();
volOsc.setType('sine');
volOsc.freq(124);
volOsc.amp(0.5);
volOsc.start();
osc.amp(volOsc.scale(-1,1,1,-1));
}
function draw() {
background(backgroundColor)
text('click to play', width/2, height/2);
}
function mouseClicked() {
osc.amp(0.5);
}let data;
function preload() {
data = loadTable("PRSA-adapted-aparrish.csv",
"csv",
"header");
}
function setup() { 
createCanvas(400, 400);
console.log(data.getRowCount());
console.log(data.getNum(49, "TEMP"));
noLoop();
} 
function draw() { 
background(220);
let pm25 = data.getColumn("pm2.5");
let pm25min = min(pm25);
let pm25max = max(pm25);
let dewp = data.getColumn("DEWP");
let dewpmin = min(dewp);
let dewpmax = max(dewp);
for (let i = 0; i < data.getRowCount(); i++) {
ellipse(xpos, ypos, 5, 5);
}
}let data;
function preload() {
data = loadTable("PRSA-adapted-aparrish.csv",
"csv",
"header");
}
function setup() { 
createCanvas(400, 400);
console.log(data.getRowCount());
console.log(data.getNum(49, "TEMP"));
noLoop();
} 
function draw() { 
background(220);
let pm25 = data.getColumn("pm2.5");
let pm25min = min(pm25);
let pm25max = max(pm25);
for (let i = 0; i < data.getRowCount(); i++) {
let val = data.getNum(i, "pm2.5");
let ypos = map(val, pm25min, pm25max, height, 0);
let xpos = map(i, 0, data.getRowCount(),
0, width);
ellipse(xpos, ypos, 5, 5);
}
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(128+sin(frameCount * 0.1)*128);
}let fish;
function preload() {
fish = loadImage("Filet-O-Fish_transparent.png");
}
let fishImg;
function setup() { 
createCanvas(400, 400);
fishImg.mouseClicked(fishClick);
} 
function fishClick() {
console.log("you clicked deliciously!");
}
function draw() { 
background(220);
image(fish, 0, 0, 200, 200);
}let fish;
function preload() {
fish = loadImage("Filet-O-Fish_transparent.png");
}
let fishImg;
function setup() { 
createCanvas(400, 400);
fishImg.mouseClicked(fishClick);
} 
function fishClick() {
console.log("you clicked deliciously!");
}
function draw() { 
background(220);
image(fish, 0, 0, 200, 200);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
text("猫", mouseX, mouseY);
}let vid;
let playing = false;
function setup() { 
createCanvas(400, 400);
vid = createVideo("transit.mov");
vid.size(400, 400);
vid.position(0, 0);
vid.hide();
} 
function draw() { 
background(220);
image(vid, 0, 0);
}
function mousePressed() {
if (playing) {
vid.pause();
playing = false;
}
else {
vid.play();
playing = true;
}
}let kitty;
let kittyClear;
function preload() {
kitty = loadImage("kitty.jpg");
}
function setup() { 
createCanvas(400, 400);
console.log(kitty.width);
console.log(kitty.height);
console.log(kitty.get(100, 100));
} 
function draw() { 
background(220);
noStroke();
for (let i = 0; i < kitty.width; i += 8) {
for (let j = 0; j < kitty.height; j += 8) {
let c = kitty.get(i, j);
fill(c[1], c[1], random(255), 128);
ellipse(map(i, 0, kitty.width, 0, width),
map(j, 0, kitty.height, 0, height),
random(50), random(50));
}
}
}let kitty;
let kittyClear;
function preload() {
kitty = loadImage("kitty.jpg");
kittyClear = loadImage("kitty_transparent.png");
}
function setup() { 
createCanvas(600, 400);
} 
function draw() { 
background(kitty);
image(kittyClear, mouseX, mouseY);
}let kitty;
let meow;
function preload() {
kitty = loadImage("kitty.jpg");
meow = loadSound("meow.mp3");
}
function setup() { 
createCanvas(600, 400);
meow.loop();
} 
function draw() { 
background(200);
image(kitty, mouseX, mouseY,
200+(sin(frameCount*0.1)*100),
200+(cos(frameCount*0.1)*100));
meow.rate(sin(frameCount*0.1));
}let meow;
let hihat;
let snare;
let kick;
function preload() {
meow = loadSound("meow.mp3");
hihat = loadSound("hihat.mp3");
snare = loadSound("snare.mp3");
kick = loadSound("kick.mp3");
}
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
meow.play();
}
function mousePressed() {
meow.play();
}
function keyTyped() {
if (key == "a") {
kick.play();
}
if (key == "l") {
hihat.play();
}
if (key == "s") {
snare.play();
}
if (key == "c") {
meow.play();
}
}let all_letters = ['a', 'l', 'l', 'i', 's', 'o', 'n'];
class LetterBox {
constructor(index, x, y) {
this.index = index;
this.x = x;
this.y = y;
}
display() {
rect(this.x, this.y, 50, 50);
text(all_letters[this.index], this.x, this.y);
}
click() {
if (mouseX > this.x && mouseX < this.x+50 &&
mouseY > this.y && mouseY < this.y+50) {
this.index++;
}
}
}
let letterboxes = [];
function setup() { 
createCanvas(400, 400);
letterboxes.push(new LetterBox(0, 10, 10));
letterboxes.push(new LetterBox(4, 60, 10));
letterboxes.push(new LetterBox(6, 110, 10));
} 
function draw() { 
background(220);
for (let i = 0; i < letterboxes.length; i++) {
letterboxes[i].display();
}
}
function mouseClicked() {
for (let i = 0; i < letterboxes.length; i++) {
letterboxes[i].click();
}
}
let button;
let clearbutton;
let slider;
let field;
function setup() {
createCanvas(400, 400);
button = createButton("Increment!");
button.mousePressed(randomRectangle);
button.position(10, 10);
button.size(100, 100);
button.style("font-family", "Comic Sans MS");
button.style("background-color", "#00f");
button.style("color", "#fff");
clearbutton = createButton("Clear!");
clearbutton.mousePressed(resetCount);
clearbutton.position(10, 120);
clearbutton.size(100, 100);
slider = createSlider(0, 255, 127);
slider.position(10, height-20);
slider.size(width-20, 20);
field = createInput("hello!");
field.position(10, height-50);
} 
let count = 0;
function draw() { 
background(slider.value());
textSize(100);
text(count, width/2, height/2);
text(field.value(), width/2, height * 0.667);
button.position(mouseX, mouseY);
slider.value(mouseX)
}
function randomRectangle() {
count++;
}
function resetCount() {
count = 0;
}
function setup() { 
createCanvas(400, 400, WEBGL);
} 
function draw() { 
background(220);
directionalLight(0, 0, 255, -1, -1, 1);
pointLight(0, 255, 0, mouseX-width/2, (mouseY-height/2)*-1, 20);
push();
translate(mouseX-width/2, mouseY-height/2, 20);
sphere(5);
pop();
for (let i = -5; i < 5; i++) {
push();
translate(i * 50, sin(frameCount*i*0.01)*50, 0);
sphere(25);
pop();
}
}let toggle = false;
let lastCheck = 0;
function setup() {
createCanvas(400, 400);
} 
function draw() {
for (let i = 0; i < 500000; i++) {
Math.sqrt(random());
}
if (toggle) {
background(255);
}
else {
background(0);
}
toggle = !toggle;
if (millis() > lastCheck + 1000) {
toggle = !toggle;
lastCheck = millis();
}
console.log(millis());
}function setup() { 
createCanvas(400, 400);
} 
function draw() {
if (frameCount > 120) {
background(255, 0, 0);
}
else {
background(0, 128, 255);
}
if (millis() > 3000) {
ellipse(width/2, height/2, 200, 200);
}
textSize(24);
text(minute(), 24, 48);
}function setup() { 
createCanvas(400, 400);
noLoop();
} 
function draw() { 
background(220);
textSize(100);
textAlign(CENTER, CENTER);
text("RGQ", width/2, height*0.25);
textFont("Times");
text("RGQ", width/2, height*0.5);
textFont("Comic Sans MS");
text("RGQ", width/2, height*0.75);
}let data;
function preload() {
data = loadTable("PRSA-adapted-aparrish.csv",
"csv",
"header");
}
function setup() {
createCanvas(400, 400);
console.log(data.getRowCount());
console.log(data.columns);
console.log(data.getNum(3, "TEMP"));
noLoop();
} 
function draw() { 
background(220);
for (var i = 0; i < data.getRowCount(); i++) {
let val = data.getNum(i, "TEMP");
let xpos = map(i, 0, data.getRowCount(), 0, width);
let ypos = map(val, -50, 50, height, 0);
ellipse(xpos, ypos, 1, 1);
}
}let button;
let c;
function setup() {
c = createCanvas(400, 400);
c.style("border", "10px blue solid");
hellobutton = select("#hellobutton");
hellobutton.size(200, 200);
hellobutton.position(0, 0);
button = createButton("BOOP!");
button.mouseClicked(
function() {
button.position(random(width), random(height));
console.log("you booped me!");
}
);
button.size(200, 100);
button.position(10, 10);
button.style("font-family", "Comic Sans MS");
button.style("font-size", "48px");
} 
function draw() { 
background(220);
c.position(mouseX, mouseY);
}let button;
function setup() {
createCanvas(400, 400);
button = createButton("BOOP!");
button.mouseClicked(moveButton);
button.size(200, 100);
button.position(10, 10);
button.style("font-family", "Comic Sans MS");
button.style("font-size", "48px");
} 
function draw() { 
background(220);
}
function moveButton() {
button.position(random(width), random(height));
console.log("you booped me!");
}let slider;
function setup() { 
createCanvas(400, 400);
slider = createSlider(0, height, height/2);
slider.size(300, 20);
slider.position(10, 10);
} 
function draw() { 
background(220);
fill(slider.value(), 0, 0);
ellipse(width/2, slider.value(), 50, 50);
}let hueCounter = 0;
function setup() { 
createCanvas(400, 400);
colorMode(HSB);
} 
function draw() { 
fill(1, 2, 3);
background(map(mouseX, 0, width, 0, 360),
map(mouseY, 0, height, 0, 100),
100);
fill(0, 0, 100);
ellipse(frameCount % width, height/2, 200, 200);
}function wait(ms) {
var start = Date.now(),
now = start;
now = Date.now();
}
}
function setup() { 
createCanvas(400, 400);
} let data;
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
stroke(255);
let pm = colValsMinMax(data, "pm2.5");
console.log(pm.min);
console.log(pm.max);
let iws = colValsMinMax(data, "Iws");
console.log(iws.min);
console.log(iws.max);
for (var i = 0; i < data.getRowCount(); i++) {
stroke(255, 128, 128);
let xpos = map(pm.values[i], pm.min, pm.max, 0, width);
let ypos = map(iws.values[i], iws.min, iws.max, height, 0);
point(xpos, ypos);   
}
}let data;
function preload() {
data = loadTable(
'PRSA-adapted-aparrish.csv',
'csv',
'header');
}
function setup() { 
createCanvas(640, 480);
console.log(data.getRowCount());
console.log(data.columns);
background(50);
stroke(255);
let temps = data.getColumn("TEMP");
let minTemp = min(temps);
let maxTemp = max(temps);
console.log(minTemp);
console.log(maxTemp);
for (var i = 0; i < data.getRowCount(); i++) {
let val = data.getNum(i, "TEMP");
let xpos = map(i, 0, data.getRowCount(), 0, width);
let ypos = map(val, minTemp, maxTemp, height, 0);
point(xpos, ypos);
}
stroke(255, 0, 0);
let zeroVal = map(0, minTemp, maxTemp, height, 0);
line(0, zeroVal, width, zeroVal);
let data;
function preload() {
data = loadTable(
'PRSA-adapted-aparrish.csv',
'csv',
'header');
}
function setup() { 
createCanvas(640, 480);
console.log(data.getRowCount());
console.log(data.columns);
background(50);
stroke(255);
for (var i = 0; i < data.getRowCount(); i++) {
let xpos = map(i, 0, data.getRowCount(), 0, width);
point(xpos, data.getNum(i, "TEMP"));
}
}let data;
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
}let rectY = [];
function setup() { 
createCanvas(400, 400);
rectMode(CENTER);
} 
function draw() { 
background(220);
for (let i = 0; i < rectY.length; i++) {
rect(rectY[i].xpos, rectY[i].ypos, 100, 60);
rectY[i].ypos = rectY[i].ypos + rectY[i].speed;
}
for (let i = rectY.length - 1; i >= 0; i--) {
if (rectY[i].ypos > 350 || rectY[i].ypos < 50) {
rectY.splice(i, 1);
}
}
}
function mousePressed() {
let newRect = {
"xpos": mouseX,
"ypos": mouseY,
"speed": random(-2, 2)
};
rectY.push(newRect);
console.log(rectY);
}
let rectY = [];
function setup() { 
createCanvas(400, 400);
rectMode(CENTER);
} 
function draw() { 
background(220);
for (let i = 0; i < rectY.length; i++) {
rect(width/2, rectY[i], 100, 60);
rectY[i] = rectY[i] + 1;
}
for (let i = rectY.length - 1; i >= 0; i--) {
if (rectY[i] > 350) {
rectY.splice(i, 1);
}
}
}
function keyPressed() {
rectY.push(0);
console.log(rectY);
}let timer = 5;
let lastTimeCheck = 0;
function setup() {
createCanvas(400, 400);
} 
function draw() { 
background(220);
ellipse(mouseX, mouseY, 100, 100);
for (let i = 0; i < 500000; i++) {
Math.sqrt(2);
}
displayTimer();
if (frameCount % 60 == 0 && timer > 0) {
timer--;
}
if (timer == 0) {
text("game over", width/2, height * 0.667);
}
textSize(12);
if (millis() - lastTimeCheck > 1000) {
console.log("tick!");
lastTimeCheck = millis();
}
text(millis(), width/2, height * 0.333); 
}
function displayTimer() {
textAlign(CENTER, CENTER);
textSize(100);
text(timer, width/2, height/2);
let rectangles = [];
function makeRect(xpos, ypos) {
let newRect = {
x: xpos,
y: ypos,
width: random(10, 200),
height: random(10, 200),
speed: random(1, 3)
};
return newRect;
}
function setup() {
createCanvas(400, 400);
rectMode(CENTER);
} 
function draw() { 
background(220);
noStroke();
fill(255, 0, 255, 64);
for (let i = 0; i < rectangles.length; i++) {
rect(rectangles[i].x, rectangles[i].y,
rectangles[i].width, rectangles[i].height);
rectangles[i].y += rectangles[i].speed;
}
let newRect = makeRect(random(width), random(height));
rectangles.push(newRect);
for (var i = rectangles.length - 1; i >= 0; i--) {
if (rectangles[i].x > width ||
rectangles[i].x < 0 ||
rectangles[i].y > height ||
rectangles[i].y < 0) {
rectangles.splice(i, 1);
}
}
}
function mousePressed() {
let blah = makeRect(mouseX, mouseY);
rectangles.push(blah);
console.log(rectangles.length);
function setup() {
createCanvas(500, 300);
}
function gotData() {
}
function draw() {
background(255, 255, 255);
fill(0, 0, 0);
var data = map(latestData, 0, 1023, 0, height);
ellipse(50, data, 50, 50);
text(data, 10, 10);
}let positions = [];
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(50);
fill(255, 100);
noStroke();
for (let i = 0; i < positions.length; i++) {
ellipse(positions[i][0], positions[i][1], 50, 50);
positions[i][1]++;
}
positions.push([mouseX, mouseY]);
}function setup() { 
createCanvas(400, 400);
noLoop();
} 
function draw() { 
background(50);
stroke(255, 128);
strokeWeight(8);
noFill();
for (let i = 0; i < 100; i++) {
push();
translate(random(width), random(height));
scale(random(1.5), random(1.5));
displayFace();
pop();
}
}
function displayFace() {
ellipse(0, 0, 60, 60);
ellipse(100, 0, 60, 60);
arc(50, 50, 100, 75, 0, PI);
}let xoffset = 200;
let yoffset = 250;
function setup() { 
createCanvas(600, 600);
} 
function draw() { 
background(50);
stroke(255);
strokeWeight(8);
noFill();
push();
stroke(255, 0, 0);
translate(mouseX, mouseY);
displayFace();
pop();
push();
translate(mouseY, mouseX);
displayFace();
pop();
push();
translate(frameCount % width, height/2);
stroke(0, 0, 255);
displayFace();
pop();
}
function displayFace() {
ellipse(0, 0, 60, 60);
ellipse(100, 0, 60, 60);
arc(50, 50, 100, 75, 0, PI);
}
let xpos = 0;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
if (toggle) {
background(255, 0, 0);
}
else {
background(0, 0, 255);
}
ellipse(xpos, height/2, 200, 200);
}
function mousePressed() {
console.log("mouse was pressed!");
toggle = !toggle;
xpos += 10;
}let lastFramePress = false;
let toggle = false;
function setup() { 
createCanvas(400, 400);
} 
function draw() {
if (mouseIsPressed) {
console.log("mouse is pressed currently");
}
if (mouseIsPressed && !lastFramePress) {
console.log("mouse was pressed!");
toggle = !toggle;
}
if (!mouseIsPressed && lastFramePress) {
console.log("mouse was released!");
}
if (toggle) {
background(255, 0, 0);
}
else {
background(0, 0, 255);
}
lastFramePress = mouseIsPressed;
}var vlookup;
var showText = `in the beginning god created the heaven and the earth
and the earth was without form and void and darkness was upon the face of the deep
and the spirit of god moved upon the face of the waters 
and god said let there be light and there was light`;
var showWords = showText.split(/\s+/);
function preload() {
}
let textInput;
function setup() { 
createCanvas(720, 640);
textInput = createInput(showText.replace("\n", " "));
textInput.input(parseText);
textInput.position(10, 10);
textInput.size(width-25, 16);
} 
function p2xy(r, theta) {
return [r * cos(theta), r * sin(theta)];
}
function paintRose(v, radius, multiplier) {
let vec = v.slice(0);
let coords = [];
for (let i = 0; i < vec.length; i++) {
let r = radius + (vec[i] * multiplier);
let theta = (TWO_PI / 50) * i;
let pos = p2xy(r, theta);
coords.push(pos);
}
beginShape();
for (let i = 0; i < coords.length; i++) {
let pos = coords[i];
curveVertex(pos[0], pos[1]);
}
endShape(CLOSE);
line(coords[0][0], coords[0][1],
coords[1][0],
coords[1][1]);
}
function draw() { 
background(245);
let cols = 8;
noStroke();
let border = 32;
let figw = width - (2*border);
let figh = height - (2*border);
push();
translate(border, border+32);
for (let i = 0; i < showWords.length; i++) {
push();
translate((i % cols) * (figw/cols) + (figw/cols)*0.5,
floor(i / cols) * (figh/cols) + (figh/cols) * 0.5);
textSize(12);
textAlign(CENTER, CENTER);
fill(40, 220);
if (vlookup.hasOwnProperty(showWords[i])) {
paintRose(vlookup[showWords[i]], 30, 10);
}
else {
fill(200);
ellipse(0, 0, 25, 25);
}
fill(40, 128);
textSize(14);
text(showWords[i], 2, 2);
fill(255);
text(showWords[i], 0, 0);
pop();
}
pop();
fill(128, 128);
textSize(32);
text("?", width - 32, height - 32);
noLoop();
}
function parseText() {
let incoming = textInput.value().toLowerCase();
let cleaned = incoming.replace(/\W+/g, " ");
showWords = cleaned.split(/\s+/);
draw();
}
function mousePressed() {
if (mouseY > 32) {
let helpmodal = select("#help");
if (helpmodal.style("display") == "block") {
select("#help").style("display", "none");
}
else {
select("#help").style("display", "block");
}
}
}let points = [];
let triangles = [];
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
for (let i = 0; i < points.length; i++) {
ellipse(points[i][0], points[i][1], 5, 5);
}
for (let i = 0; i < triangles.length; i += 3) {
beginShape();
fill(255-(i / triangles.length)*255, 0, 128);
vertex(points[triangles[i]][0], points[triangles[i]][1]);
vertex(points[triangles[i+1]][0], points[triangles[i+1]][1]);
vertex(points[triangles[i+2]][0], points[triangles[i+2]][1]);
endShape(CLOSE);
}
}
function mousePressed() {
points.push([mouseX, mouseY]);
triangles = Delaunay.triangulate(points);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(128+(sin(frameCount*0.01)*128),
128+(sin(frameCount*0.02)*128),
128+(sin(frameCount*0.03)*128)
);
}function setup() { 
createCanvas(600, 600);
} 
function draw() { 
background(50);
strokeWeight(8);
stroke(255);
noFill();
push();
translate(width*0.33, height/2);
scale(0.5+sin(frameCount*0.1)*0.25);
drawFace();
pop();
push();
translate(width*0.67, height/2);
scale(0.5+cos(frameCount*0.1)*0.25);
drawFace();
pop();
}
function drawFace() {
ellipse(0, 0, 40, 40);
ellipse(100, 0, 40, 40);
arc(50, 50, 100, 75, 0, PI);
}function setup() { 
createCanvas(600, 600);
} 
function draw() { 
background(50);
strokeWeight(8);
stroke(255);
noFill();
for (let i = 0; i < 10; i++) {
push();
translate(0, i * 50);
stroke(255 - (i * 20));
drawFace();
pop();
}
}
function drawFace() {
ellipse(0, 0, 40, 40);
ellipse(100, 0, 40, 40);
arc(50, 50, 100, 75, 0, PI);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
push();
strokeWeight(25);
ellipse(mouseX, mouseY, 50, 50);
pop();
ellipse(width/2, height/2, 100, 100);
}let xoffset = 75;
let yoffset = 100;
function setup() {
createCanvas(400, 400);
} 
function draw() { 
background(50);
stroke(255);
strokeWeight(8);
noFill();
push();
translate(250, 250);
drawFace();
pop();
translate(mouseX, mouseY);
drawFace();
}
function drawFace() {
ellipse(0, 0, 80, 80);
ellipse(100, 0, 80, 80);
arc(50, 50, 100, 75, 0, PI);
}let lastFrameMouseState = false;
function setup() {
createCanvas(400, 400);
background(255, 0, 0);
} 
function draw() {
if (lastFrameMouseState == false && mouseIsPressed == true) {
ellipse(random(width), random(height), 100, 100);  
}
lastFrameMouseState = mouseIsPressed;
}
let cx = 100;
let cy = 100;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
if (dist(mouseX, mouseY, cx, cy) < 50) {
fill(255, 0, 0);
if (mouseIsPressed) {
cx = mouseX;
cy = mouseY;
}
}
else {
fill(255);
}
ellipse(cx, cy, 100, 100);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
for (let i = 0; i < 10; i++) {
fill(100, 200, 255);
let spacing = (mouseX / width) * 0.1;
ellipse(width * (0.1+(spacing * i)),
width * (0.1+(spacing * i)), 20, 20*(i*0.5));    
}
}let ex = 0;
let ey = 0;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
ellipse(ex, ey, 100, 100);
let diffx = mouseX - ex;
ex = ex + (diffx * 0.05);
let diffy = mouseY - ey;
ey = ey + (diffy * 0.05);
}let ex;
let ey;
function preload() {
}
function setup() {
createCanvas(400, 400);
ex = random(width);
ey = random(height);
} 
function draw() { 
background(220);
ellipse(ex, ey, 200, 100);
}let shapeKind = 0;
function setup() { 
createCanvas(400, 400);
shapeKind = int(random(3));
} 
function draw() { 
background(220);
if (shapeKind == 0) {
ellipse(mouseX, mouseY, 100, 100);
}
else if (shapeKind == 1) {
rect(mouseX, mouseY, 100, 100);
}
else {
triangle(mouseX, mouseY, mouseX+100, mouseY+100,
mouseX-100, mouseY+100);
}
}function setup() { 
createCanvas(400, 400);
} 
function draw() {
background(220);
if ((mouseX > 0) && (mouseX < width * 0.333)) {
fill(255, 0, 0);
}
else if (mouseX < width * 0.667) {
fill(255, 0, 255);
}
else {
fill(0, 0, 255);
}
ellipse(width/2, height/2, 300, 300);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
if (((mouseX > width/2) && (mouseY > height/2)) || mouseIsPressed) {
rect(100, 100, 200, 200);
}
ellipse(width/2, height/2, 50, 50);
}let bgColor = 0;
let circleColor = 0;
let squareColor = 0;
function setup() { 
createCanvas(400, 400);
bgColor = random(255);
circleColor = random(255);
squareColor = random(255);
rectMode(CENTER);
} 
function draw() { 
background(bgColor);
fill(circleColor);
ellipse(0.33 * width, height * 0.5, 100, 100);
fill(squareColor);
rect(0.67 * width, height * 0.5, 100, 100);
if (frameCount % 60 == 0) {
bgColor = color(random(255), random(255), random(255));
circleColor = color(random(255), random(255), random(255));
squareColor = color(random(255), random(255), random(255));
}
fill(255);
ellipse(mouseX, mouseY, 50, 50);
}
function mousePressed() {
}let diameter = 50;
let sw = 4;
function setup() { 
createCanvas(400, 400);
} 
function draw() {
background(220);
fill(255);
stroke(50);
strokeWeight(sw);
ellipse(width * 0.25, height * 0.25, diameter, diameter);
strokeWeight(sw-1);
ellipse(width * 0.25, height * 0.75, diameter+25, diameter+25);
strokeWeight(sw-2);
ellipse(width * 0.75, height * 0.25, diameter+50, diameter+50);
strokeWeight(sw-3);
ellipse(width * 0.75, height * 0.75, diameter+75, diameter+75);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
strokeWeight(5);
ellipse(200, 200, 250, 250);  
strokeWeight(10);
arc(200, 200, 225, 225, radians(45),
radians(-45));
}var vlookup;
var showText = `in the beginning god created the heaven and the earth
and the earth was without form and void and darkness was upon the face of the deep
and the spirit of god moved upon the face of the waters 
and god said let there be light and there was light`;
var showWords = showText.split(/\s+/);
function preload() {
}
let textInput;
function setup() { 
createCanvas(720, 640);
textInput = createInput(showText.replace("\n", " "));
textInput.input(parseText);
textInput.position(10, 10);
textInput.size(width-25, 16);
} 
function p2xy(r, theta) {
return [r * cos(theta), r * sin(theta)];
}
function paintRose(v, radius, multiplier) {
let vec = v.slice(0);
let coords = [];
for (let i = 0; i < vec.length; i++) {
let r = radius + (vec[i] * multiplier);
let theta = (TWO_PI / 50) * i;
let pos = p2xy(r, theta);
coords.push(pos);
}
beginShape();
for (let i = 0; i < coords.length; i++) {
let pos = coords[i];
curveVertex(pos[0], pos[1]);
}
endShape(CLOSE);
line(coords[0][0], coords[0][1],
coords[1][0],
coords[1][1]);
}
function draw() { 
background(245);
let cols = 8;
noStroke();
let border = 32;
let figw = width - (2*border);
let figh = height - (2*border);
push();
translate(border, border+32);
for (let i = 0; i < showWords.length; i++) {
push();
translate((i % cols) * (figw/cols) + (figw/cols)*0.5,
floor(i / cols) * (figh/cols) + (figh/cols) * 0.5);
textSize(12);
textAlign(CENTER, CENTER);
fill(40, 220);
if (vlookup.hasOwnProperty(showWords[i])) {
paintRose(vlookup[showWords[i]], 30, 10);
}
else {
fill(200);
ellipse(0, 0, 25, 25);
}
fill(40, 128);
textSize(14);
text(showWords[i], 2, 2);
fill(255);
text(showWords[i], 0, 0);
pop();
}
pop();
fill(128, 128);
textSize(32);
text("?", width - 32, height - 32);
noLoop();
}
function parseText() {
let incoming = textInput.value().toLowerCase();
let cleaned = incoming.replace(/\W+/g, " ");
showWords = cleaned.split(/\s+/);
draw();
}
function mousePressed() {
if (mouseY > 32) {
let helpmodal = select("#help");
if (helpmodal.style("display") == "block") {
select("#help").style("display", "none");
}
else {
select("#help").style("display", "block");
}
}
}
let xPos;
let yPos;
function setup() { 
createCanvas(400, 400);
xPos = random(width);
yPos = random(height);
} 
function draw() { 
ellipse(random(width), random(height), 50, 50);
ellipse(xPos, xPos, mouseX, mouseY);
}let xPos = 1;
let yPos = 50;
function setup() {
createCanvas(400, 400);
} 
function draw() { 
background(220);
ellipse(xPos, yPos, frameCount, 200);
xPos = xPos + 2;
yPos = yPos + 3;
}function setup() { 
createCanvas(800, 400);
} 
function draw() { 
background(220);
ellipse(width * 0.33, mouseY, width / 4, mouseY);
ellipse(width * 0.67, mouseY, width / 4, 100);
}let diameterX = 180;
let diameterY = 50;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
fill(255);
stroke(50);
strokeWeight(8);
ellipse(100, 100, diameterX, diameterY);
ellipse(300, 100, diameterX, diameterY + 25);
ellipse(100, 300, diameterX, diameterY + 50);
ellipse(300, 300, diameterX, diameterY + 75);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
stroke(0);
strokeWeight(10);
fill(128);
arc(200, 200, 350, 250, 0.5*PI, TWO_PI);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(100, 50, 255);
fill(200, 250, 250, 64);
stroke(255);
rect(150, 150, 240, 175);
triangle(50, 60, 350, 24, 200, 275);
fill(255, 0, 0);
stroke(0, 255, 0);
ellipse(100, 275, 400, 180);
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(0, 100, 200);
fill(200, 250, 0);
stroke(100, 200, 100);
rect(100, 100, 250, 300);
ellipse(50, 50, 100, 120);
fill(0, 0, 255, 128);
stroke(255, 0, 0);
quad(5, 31, 100, 20, 200, 63, 230, 250);
}
let 猫 = 100;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
fill(255);
ellipse(mouseX, mouseY, 猫, 猫);
var circles = [];
function setup() { 
createCanvas(400, 400);
circles = [getRandCirc()];
} 
function draw() { 
background(220);
for (var i = 0; i < circles.length; i++) {
ellipse(circles[i].x, circles[i].y,
circles[i].diam, circles[i].diam);
}
}
function mouseClicked() {
circles = [getRandCirc()];
}
}
function getRandCirc() {
var diam = random(width * 0.05, width * 0.5);
var xpos = random(diam * 0.5, width - diam * 0.5);
var ypos = random(diam * 0.5, height - diam * 0.5);
return {x: xpos, y: ypos, diam: diam};
}
function addCirc() {
var buff = 10;
for (var i = 0; i < 10000; i++) {
var found = true;
var circ = getRandCirc();
var checks = [];
for (var j = 0; j < circles.length; j++) {
if (dist(circ.x, circ.y,
circles[j].x, circles[j].y) < 
(circ.diam*0.5) + (circles[j].diam * 0.5) + buff) {
found = false;
}
}
if (found) {
circles.push(circ);
return true;
}
}
return false;
}
var tfilter = new Tone.Filter(100, "highpass").toMaster();
var feedbackDelay = new Tone.FeedbackDelay("6n", 0.25).connect(tfilter);
var crusher = new Tone.BitCrusher(4).connect(feedbackDelay);
var synth = new Tone.Synth(
{oscillator: {type: 'sawtooth'}}).connect(tfilter);
synth.portamento = "16n";
var drum = new Tone.MembraneSynth().connect(crusher);
var tnoise = new Tone.NoiseSynth().connect(crusher);
var pitches = new Tone.CtrlPattern(
["C3", "Eb4", "F3", "G4", "Ab3"],
'randomWalk'
);
var vels = new Tone.CtrlPattern(
[0.25, 0.33, 0.5, 0.66, 0.75, 1],
'up'
);
var pattern = new Tone.CtrlPattern(
[0, 0, 0, 0, 1, 0, 0, 0],
'up'
);
var myLoop = new Tone.Loop(function(time) {
var pitch = pitches.next();
var vel = vels.next();
synth.triggerAttackRelease(pitch, "8n", time, vel);
if (pattern.next() == 0) {
drum.triggerAttackRelease("C1", "16n", time, vel);
}
else {
tnoise.triggerAttackRelease("16n", time, vel);
}
}, "16n");
myLoop.start();
function setup() {
createCanvas(windowWidth, windowHeight);
background(220);
StartAudioContext(Tone.context, 'canvas');
}
function mousePressed() {
if (myLoop.state === 'started') {
myLoop.stop();
}
else {
myLoop.start();
}
}
function draw() {
background(0);
fill(255);
text(rotationY, width/2, height/2);
}
var synth = new Tone.Synth().toMaster();
var env = new Tone.FrequencyEnvelope({
attack: 0,
baseFrequency: "C2",
octaves: -1
});
env.connect(synth.frequency);
var myLoop = new Tone.Loop(function(time) {
synth.triggerAttackRelease("A3", 2, time);
}, 2);
myLoop.start();
var synth = new Tone.Synth().toMaster();
var synth2 = new Tone.Synth().toMaster();
var synth3 = new Tone.Synth().toMaster();
var synth4 = new Tone.Synth().toMaster();
var myLoop = new Tone.Loop(function(time) {
synth.triggerAttackRelease("A3", 2, time, random());
synth2.triggerAttackRelease("C#4", 2, time+0.5, random());
synth3.triggerAttackRelease("E4", 2, time+1, random());
synth4.triggerAttackRelease("B4", 2, time+1.5, random());
}, 2);
myLoop.start();
function setup() {
}function setup() { 
createCanvas(400, 400);
} 
var state = "PART1";
function draw() { 
if (state == "PART1") {
background(220);
line(mouseX, mouseY, 0, 0);
if (millis() > 5000) {
state = "PART2";
}
}
else if (state == "PART2") {
background(0);
fill(255);
text("party time!", width/2, height/2);
}
var state = 1;
function myRandom() {
state++;
if (state > 255) {
state = 0;
}
return state / 256; 
}
var pos = 0;
var step = 8;
var randomCanvas;
function setup() {
pixelDensity(1);
createCanvas(200, 200);
randomCanvas = createGraphics(40, 40);
} 
function draw() {
background(0);
noSmooth();
randomCanvas.loadPixels();
for (var i = 0; i < step; i++) {
var pxval = myRandom() * 255;
for (var j = 0; j < 4; j++) {
randomCanvas.pixels[pos+j] = pxval;
}
pos += 4;
}
if (pos > randomCanvas.width * randomCanvas.height * 4) {
pos = 0;
}
randomCanvas.updatePixels();
scale(5);
image(randomCanvas, 0, 0);
}
var state = 0;
function myRandom() {
state++;
return (((mouseX + mouseY) * state) % 100) / 100;
}
var pos = 0;
var step = 8;
var randomCanvas;
var mic;
function setup() {
pixelDensity(1);
createCanvas(200, 200);
randomCanvas = createGraphics(40, 40);
} 
function draw() {
background(0);
noSmooth();
randomCanvas.loadPixels();
for (var i = 0; i < step; i++) {
var pxval = myRandom() * 255;
for (var j = 0; j < 4; j++) {
randomCanvas.pixels[pos+j] = pxval;
}
pos += 4;
}
if (pos > randomCanvas.width * randomCanvas.height * 4) {
pos = 0;
}
randomCanvas.updatePixels();
scale(5);
image(randomCanvas, 0, 0);
}
var lastFew = [xorRandom()];
function myRandom() {
var sum = 0;
for (var i = 0; i < lastFew.length; i++) {
sum += lastFew[i];
}
var mean = sum / lastFew.length;
var newVal = xorRandom();
lastFew.push(newVal);
if (lastFew.length > 10) {
lastFew = lastFew.slice(1);
}
return mean;
}
var state = 1;
function xorRandom() {
state ^= state << 13;
state ^= state >> 17;
state ^= state << 5;
var ret = ((state % 100) / 200) + 0.5;
return ret;
}
var pos = 0;
var step = 8;
var randomCanvas;
function setup() {
pixelDensity(1);
createCanvas(200, 200);
randomCanvas = createGraphics(40, 40);
console.log(myRandom(),",",myRandom(),",",myRandom());
} 
function draw() {
background(0);
noSmooth();
randomCanvas.loadPixels();
for (var i = 0; i < step; i++) {
var pxval = myRandom() * 255;
for (var j = 0; j < 4; j++) {
randomCanvas.pixels[pos+j] = pxval;
}
pos += 4;
}
if (pos > randomCanvas.width * randomCanvas.height * 4) {
pos = 0;
}
randomCanvas.updatePixels();
scale(5);
image(randomCanvas, 0, 0);
}
var value = 0x8988;
var tap1bit = 1;
var tap2bit = 9;
function myRandom() {
var tap1val = (value >> tap1bit) & 1;
var tap2val = (value >> tap2bit) & 1;
var leftmostBit = tap1val ^ tap2val;
value = ((leftmostBit << 15) | (value >>> 1)) >>> 0;
return value / (2 ** 16);
}
var pos = 0;
var step = 8;
var randomCanvas;
function setup() { 
pixelDensity(1);
createCanvas(200, 200);
randomCanvas = createGraphics(40, 40);
console.log(myRandom(), ",", myRandom(), ",", myRandom());
} 
function draw() {
background(0);
noSmooth();
randomCanvas.loadPixels();
for (var i = 0; i < step; i++) {
var pxval = myRandom() * 255;
for (var j = 0; j < 4; j++) {
randomCanvas.pixels[pos+j] = pxval;
}
pos += 4;
}
if (pos > randomCanvas.width * randomCanvas.height * 4) {
pos = 0;
}
randomCanvas.updatePixels();
scale(5);
image(randomCanvas, 0, 0);
}
var p = 0.1;
var r = 3.5;
function myRandom() {
p = r * p * (1 - p);
if (r < 3.96995) {
r += 0.00005;
}
return p;
}
var pos = 0;
var step = 8;
var randomCanvas;
function setup() {
pixelDensity(1);
createCanvas(200, 200);
randomCanvas = createGraphics(40, 40);
console.log(myRandom(), ",", myRandom(), ",", myRandom());
} 
function draw() {
background(0);
noSmooth();
randomCanvas.loadPixels();
for (var i = 0; i < step; i++) {
var pxval = myRandom() * 255;
for (var j = 0; j < 4; j++) {
randomCanvas.pixels[pos+j] = pxval;
}
pos += 4;
}
if (pos > randomCanvas.width * randomCanvas.height * 4) {
pos = 0;
}
randomCanvas.updatePixels();
scale(5);
image(randomCanvas, 0, 0);
}
var instructionP;
var slider;
var flipButton;
var sliderP;
var runResultP;
function setup() {
createCanvas(320, 130);
background(220);
instructionP = createP(
"Move slider to set alternation probability.");
instructionP.position(10, -5);
slider = createSlider(0, 10, 5);
slider.changed(sliderChange);
slider.position(10, 35);
sliderP = createP("0.5");
sliderP.position(150, 20);
runResultP = createP("Run count: None");
runResultP.position(10, 45);
flipButton = createButton("Flip Experiment");
flipButton.position(175, 35);
flipButton.mouseClicked(startExp);
} 
function sliderChange() {
sliderP.html(slider.value() / 10);
}
function startExp() {
var exp = experiment(20, slider.value() / 10);
var runs = runCount(exp);
background(220);
for (var i = 0; i < exp.length; i++) {
stroke(0);
if (exp[i]) {
fill(255);
}
else {
fill(0);
}
push();
translate(10 + i*14, 95);
rect(0, 0, 11, 11);
pop();
}
runResultP.html("Run count: " + runs);
}
function runCount(flips) {
var count = 1;
for (var i = 1; i < flips.length; i++) {
if (flips[i] != flips[i-1]) {
count++;
}
}
return count;
}
function experiment(flipCount, alternationProb) {
var flips = [];
if (Math.random() > 0.5) {
flips.push(true);
}
else {
flips.push(false);
}
for (var i = 0; i < flipCount; i++) {
var prev = flips[flips.length-1];
if (Math.random() < alternationProb) {
flips.push(!prev);
}
else {
flips.push(prev);
}
}
return flips;
}
var state = 1;
function myRandom() {
state ^= state << 13;
state ^= state >> 17;
state ^= state << 5;
var ret = ((state % 100) / 200) + 0.5;
return ret;
}
var pos = 0;
var step = 8;
var randomCanvas;
function setup() { 
pixelDensity(1);
createCanvas(200, 200);
randomCanvas = createGraphics(40, 40);
} 
function draw() {
background(0);
noSmooth();
randomCanvas.loadPixels();
for (var i = 0; i < step; i++) {
var pxval = myRandom() * 255;
for (var j = 0; j < 4; j++) {
randomCanvas.pixels[pos+j] = pxval;
}
pos += 4;
}
if (pos > randomCanvas.width * randomCanvas.height * 4) {
pos = 0;
}
randomCanvas.updatePixels();
scale(5);
image(randomCanvas, 0, 0);
}
var state = 1;
function myRandom() {
return random();
}
var pos = 0;
var step = 8;
var randomCanvas;
function setup() { 
pixelDensity(1);
createCanvas(200, 200);
randomCanvas = createGraphics(40, 40);
} 
function draw() {
background(0);
noSmooth();
randomCanvas.loadPixels();
for (var i = 0; i < step; i++) {
var pxval = myRandom() * 255;
for (var j = 0; j < 4; j++) {
randomCanvas.pixels[pos+j] = pxval;
}
pos += 4;
}
if (pos > randomCanvas.width * randomCanvas.height * 4) {
pos = 0;
}
randomCanvas.updatePixels();
scale(5);
image(randomCanvas, 0, 0);
}
var markov = new RiMarkov(2);
function preload() {
markov.loadFrom("pg1952.txt");
}
function setup() { 
createCanvas(400, 400);
background(255);
textSize(32);
textAlign(LEFT, TOP);
text("click!", 10, 10);
noLoop();
} 
function draw() { 
}
function mousePressed() {
var sentences = markov.generateSentences(1);
background(255);
text(sentences[0], 10, 10,
width-20, height-20);
}var markov = new RiMarkov(2);
var textField;
function preload() {
markov.loadFrom("46963-0.txt");
}
function setup() { 
noCanvas();
textField = createInput("Type here and hit enter. Response appears below.");
textField.size(400, 24);
textField.position(10, 10);
} 
function draw() { 
}
var resp;
function keyPressed() {
if (keyCode == RETURN || keyCode == ENTER) {
if (resp) { resp.remove(); }
var output = markov.generateSentences(1)[0];
resp = createP("MY RESPONSE: " + output);
resp.position(10, 35);
textField.value("");
}
}function setup() { 
createCanvas(400, 400);
background(255);
textAlign(LEFT, TOP);
textSize(24);
text("Click for ~messages from another world~",
20, 20, width-40, height-40);
} 
function draw() { 
}
function mousePressed() {
var grammar = tracery.createGrammar(grammarSource);
grammar.addModifiers(tracery.baseEngModifiers);
var output = grammar.flatten("#origin#");
background(255);
text(output, 20, 20, width-40, height-40);
}
var grammarSource = {
"origin": "#interjection.capitalize#, #name#! I'm #profession.a#, not #profession.a#!",
"interjection": ["alas", "congratulations", "eureka", "fiddlesticks",
"good grief", "hallelujah", "oops", "rats", "thanks", "whoa", "yes"],
"name": ["Jim", "John", "Tom", "Steve", "Kevin", "Gary", "George", "Larry"],
"profession": [
"accountant",
"actor",
"archeologist",
"astronomer",
"audiologist",
"bartender",
"butcher",
"carpenter",
"composer",
"crossing guard",
"curator",
"detective",
"economist",
"editor",
"engineer",
"epidemiologist",
"farmer",
"flight attendant",
"forest fire prevention specialist",
"graphic designer",
"hydrologist",
"librarian",
"lifeguard",
"locksmith",
"mathematician",
"middle school teacher",
"nutritionist",
"painter",
"physical therapist",
"priest",
"proofreader",
"rancher",
"referee",
"reporter",
"sailor",
"sculptor",
"singer",
"sociologist",
"stonemason",
"surgeon",
"tailor",
"taxi driver",
"teacher assistant",
"teacher",
"teller",
"therapist",
"tour guide",
"translator",
"travel agent",
"umpire",
"undertaker",
"urban planner",
"veterinarian",
"web developer",
"weigher",
"welder",
"woodworker",
"writer",
"zoologist"
]
};var holdTimer = 0;
var state = "waiting";
var outcome = "";
function setup() { 
createCanvas(400, 400);
noStroke();
textSize(24);
} 
function draw() {
if (state == "waiting") {
background(0);
fill(240);
textAlign(CENTER, CENTER);
text("Personality test!\nClick and hold :)", width/2, height/2);
}
else if (state == "holding") {
background(240);
fill(0);
var ellSize = sin(holdTimer*0.05) * width;
ellipse(width/2, height/2, ellSize, ellSize);
holdTimer += 1;
}
else if (state == "done") {
background(240);
fill(0);
textAlign(LEFT, TOP);
text(outcome,
20, 20, width-40, height-40);
}
}
function mouseReleased() {
if (state == "holding") {
state = "done";
outcome = ["You held the mouse for ",
holdTimer,
" frames.\n\n",
"People see you as ",
traits[holdTimer%traits.length],
".\n\n",
"You see yourself as very ",
traits[(holdTimer+mouseX)%traits.length],
".\n\n",
"Someday you hope to be more ",
traits[(holdTimer+mouseY)%traits.length],
".\n\n",
"Click to try again :)"].join("")
}
}
function mousePressed() {
if (state == "waiting") {
state = "holding";
}
else if (state == "done") {
holdTimer = 0;
state = "waiting";
}
}
var traits = [
"able",
"abnormal",
"absent-minded",
"above average",
"adventurous",
"affectionate",
"agile",
"agreeable",
"alert",
"amazing",
"ambitious",
"amiable",
"amusing",
"analytical",
"angelic",
"apathetic",
"apprehensive",
"ardent",
"artificial",
"artistic",
"assertive",
"attentive",
"average",
"awesome",
"awful",
"balanced",
"beautiful",
"below average",
"beneficent",
"blue",
"blunt",
"boisterous",
"brave",
"bright",
"brilliant",
"buff",
"callous",
"candid",
"cantankerous",
"capable",
"careful",
"careless",
"caustic",
"cautious",
"charming",
"childish",
"childlike",
"cheerful",
"chic",
"churlish",
"circumspect",
"civil",
"clean",
"clever",
"clumsy",
"coherent",
"cold",
"competent",
"composed",
"conceited",
"condescending",
"confident",
"confused",
"conscientious",
"considerate",
"content",
"cool",
"cool-headed",
"cooperative",
"cordial",
"courageous",
"cowardly",
"crabby",
"crafty",
"cranky",
"crass",
"critical",
"cruel",
"curious",
"cynical",
"dainty",
"decisive",
"deep",
"deferential",
"deft",
"delicate",
"demonic",
"dependent",
"delightful",
"demure",
"depressed",
"devoted",
"dextrous",
"diligent",
"direct",
"dirty",
"disagreeable",
"discerning",
"discreet",
"disruptive",
"distant",
"distraught",
"distrustful",
"dowdy",
"dramatic",
"dreary",
"drowsy",
"drugged",
"drunk",
"dull",
"dutiful",
"eager",
"earnest",
"easy-going",
"efficient",
"egotistical",
"elfin",
"emotional",
"energetic",
"enterprising",
"enthusiastic",
"evasive",
"even-tempered",
"exacting",
"excellent",
"excitable",
"experienced",
"fabulous",
"fastidious",
"ferocious",
"fervent",
"fiery",
"flabby",
"flaky",
"flashy",
"frank",
"friendly",
"funny",
"fussy",
"generous",
"gentle",
"gloomy",
"glutinous",
"good",
"grave",
"great",
"groggy",
"grouchy",
"guarded",
"hateful",
"hearty",
"helpful",
"hesitant",
"hot-headed",
"hypercritical",
"hysterical",
"idiotic",
"idle",
"illogical",
"imaginative",
"immature",
"immodest",
"impatient",
"imperturbable",
"impetuous",
"impractical",
"impressionable",
"impressive",
"impulsive",
"inactive",
"incisive",
"incompetent",
"inconsiderate",
"inconsistent",
"independent",
"indiscreet",
"indolent",
"indefatigable",
"industrious",
"inexperienced",
"insensitive",
"inspiring",
"intelligent",
"interesting",
"intolerant",
"inventive",
"irascible",
"irritable",
"irritating",
"jocular",
"jovial",
"joyous",
"judgmental",
"keen",
"kind",
"lame",
"lazy",
"lean",
"leery",
"lethargic",
"level-headed",
"listless",
"lithe",
"lively",
"local",
"logical",
"long-winded",
"lovable",
"love-lorn",
"lovely",
"maternal",
"mature",
"mean",
"meddlesome",
"mercurial",
"methodical",
"meticulous",
"mild",
"miserable",
"modest",
"moronic",
"morose",
"motivated",
"musical",
"naive",
"nasty",
"natural",
"naughty",
"negative",
"nervous",
"noisy",
"normal",
"nosy",
"numb",
"obliging",
"obnoxious",
"old-fashioned",
"one-sided",
"orderly",
"ostentatious",
"outgoing",
"outspoken",
"passionate",
"passive",
"paternal",
"paternalistic",
"patient",
"peaceful",
"peevish",
"pensive",
"persevering",
"persnickety",
"petulant",
"picky",
"plain",
"plain-speaking",
"playful",
"pleasant",
"plucky",
"polite",
"popular",
"positive",
"powerful",
"practical",
"prejudiced",
"pretty",
"proficient",
"proud",
"provocative",
"prudent",
"punctual",
"quarrelsome",
"querulous",
"quick",
"quick-tempered",
"quiet",
"realistic",
"reassuring",
"reclusive",
"reliable",
"reluctant",
"resentful",
"reserved",
"resigned",
"resourceful",
"respected",
"respectful",
"responsible",
"restless",
"revered",
"ridiculous",
"sad",
"sassy",
"saucy",
"sedate",
"self-assured",
"selfish",
"sensible",
"sensitive",
"sentimental",
"serene",
"serious",
"sharp",
"short-tempered",
"shrewd",
"shy",
"silly",
"sincere",
"sleepy",
"slight",
"sloppy",
"slothful",
"slovenly",
"slow",
"smart",
"snazzy",
"sneering",
"snobby",
"somber",
"sober",
"sophisticated",
"soulful",
"soulless",
"sour",
"spirited",
"spiteful",
"stable",
"staid",
"steady",
"stern",
"stoic",
"striking",
"strong",
"stupid",
"sturdy",
"subtle",
"sullen",
"sulky",
"supercilious",
"superficial",
"surly",
"suspicious",
"sweet",
"tactful",
"tactless",
"talented",
"testy",
"thinking",
"thoughtful",
"thoughtless",
"timid",
"tired",
"tolerant",
"touchy",
"tranquil",
"ugly",
"unaffected",
"unbalanced",
"uncertain",
"uncooperative",
"undependable",
"unemotional",
"unfriendly",
"unguarded",
"unhelpful",
"unimaginative",
"unmotivated",
"unpleasant",
"unpopular",
"unreliable",
"unsophisticated",
"unstable",
"unsure",
"unthinking",
"unwilling",
"venal",
"versatile",
"vigilant",
"warm",
"warmhearted",
"wary",
"watchful",
"weak",
"well-behaved",
"well-developed",
"well-intentioned",
"well-respected",
"well-rounded",
"willing",
"wonderful",
"volcanic",
"vulnerable",
"zealous"
var astroButton;
function setup() { 
createCanvas(400, 400);
background(0, 0, random(48));
fill(255);
for (var i = 0; i < random(200, 800); i++) {
var starSize = random(0, 5);
strokeWeight(starSize * 0.5);
stroke(255, random(255));
ellipse(random(width), random(height), starSize, starSize);
}
fill(255);
stroke(0);
strokeWeight(6);
textSize(36);
textAlign(CENTER, CENTER);
text("Click for your\nrandom\nbirth chart", width/2, height/2);
} 
function draw() { 
}
function mousePressed() {
var name = names['firstNames'][floor(random(names['firstNames'].length))];
var randMonth = int(random(1, 12));
var randDay = int(random(1, 28));
var randYear = int(random(1900, 2100));
var randHour = int(random(1, 12));
var randMinute = int(random(0, 59));
var ampm;
if (random() < 0.5) {
ampm = "AM";
}
else {
ampm = "PM";
}
var lat = random(-90, 90);
var long = random(0, 180);
"INPUT1=", name,
"&MONTH=", randMonth,
"&DAY=", randDay,
"&YEAR=", randYear,
"&HOUR=", randHour,
"&MINUTE=", randMinute,
"&AMPM=", ampm,
"&INPUT6=", lat,
"&INPUT7=", long,
"&INPUT8=GMT"].join("");
window.open(outgoingLink);
}
var names = {
"description": "First names of men and women, pulled from the US Census for the 2000s.",
"firstNames": [
"Aaliyah",
"Aaron",
"Abby",
"Abigail",
"Abraham",
"Adam",
"Addison",
"Adrian",
"Adriana",
"Adrianna",
"Aidan",
"Aiden",
"Alan",
"Alana",
"Alejandro",
"Alex",
"Alexa",
"Alexander",
"Alexandra",
"Alexandria",
"Alexia",
"Alexis",
"Alicia",
"Allison",
"Alondra",
"Alyssa",
"Amanda",
"Amber",
"Amelia",
"Amy",
"Ana",
"Andrea",
"Andres",
"Andrew",
"Angel",
"Angela",
"Angelica",
"Angelina",
"Anna",
"Anthony",
"Antonio",
"Ariana",
"Arianna",
"Ashley",
"Ashlyn",
"Ashton",
"Aubrey",
"Audrey",
"Austin",
"Autumn",
"Ava",
"Avery",
"Ayden",
"Bailey",
"Benjamin",
"Bianca",
"Blake",
"Braden",
"Bradley",
"Brady",
"Brandon",
"Brayden",
"Breanna",
"Brendan",
"Brian",
"Briana",
"Brianna",
"Brittany",
"Brody",
"Brooke",
"Brooklyn",
"Bryan",
"Bryce",
"Bryson",
"Caden",
"Caitlin",
"Caitlyn",
"Caleb",
"Cameron",
"Camila",
"Carlos",
"Caroline",
"Carson",
"Carter",
"Cassandra",
"Cassidy",
"Catherine",
"Cesar",
"Charles",
"Charlotte",
"Chase",
"Chelsea",
"Cheyenne",
"Chloe",
"Christian",
"Christina",
"Christopher",
"Claire",
"Cody",
"Colby",
"Cole",
"Colin",
"Collin",
"Colton",
"Conner",
"Connor",
"Cooper",
"Courtney",
"Cristian",
"Crystal",
"Daisy",
"Dakota",
"Dalton",
"Damian",
"Daniel",
"Daniela",
"Danielle",
"David",
"Delaney",
"Derek",
"Destiny",
"Devin",
"Devon",
"Diana",
"Diego",
"Dominic",
"Donovan",
"Dylan",
"Edgar",
"Eduardo",
"Edward",
"Edwin",
"Eli",
"Elias",
"Elijah",
"Elizabeth",
"Ella",
"Ellie",
"Emily",
"Emma",
"Emmanuel",
"Eric",
"Erica",
"Erick",
"Erik",
"Erin",
"Ethan",
"Eva",
"Evan",
"Evelyn",
"Faith",
"Fernando",
"Francisco",
"Gabriel",
"Gabriela",
"Gabriella",
"Gabrielle",
"Gage",
"Garrett",
"Gavin",
"Genesis",
"George",
"Gianna",
"Giovanni",
"Giselle",
"Grace",
"Gracie",
"Grant",
"Gregory",
"Hailey",
"Haley",
"Hannah",
"Hayden",
"Hector",
"Henry",
"Hope",
"Hunter",
"Ian",
"Isaac",
"Isabel",
"Isabella",
"Isabelle",
"Isaiah",
"Ivan",
"Jack",
"Jackson",
"Jacob",
"Jacqueline",
"Jada",
"Jade",
"Jaden",
"Jake",
"Jalen",
"James",
"Jared",
"Jasmin",
"Jasmine",
"Jason",
"Javier",
"Jayden",
"Jayla",
"Jazmin",
"Jeffrey",
"Jenna",
"Jennifer",
"Jeremiah",
"Jeremy",
"Jesse",
"Jessica",
"Jesus",
"Jillian",
"Jocelyn",
"Joel",
"John",
"Johnathan",
"Jonah",
"Jonathan",
"Jordan",
"Jordyn",
"Jorge",
"Jose",
"Joseph",
"Joshua",
"Josiah",
"Juan",
"Julia",
"Julian",
"Juliana",
"Justin",
"Kaden",
"Kaitlyn",
"Kaleb",
"Karen",
"Karina",
"Kate",
"Katelyn",
"Katherine",
"Kathryn",
"Katie",
"Kayla",
"Kaylee",
"Kelly",
"Kelsey",
"Kendall",
"Kennedy",
"Kenneth",
"Kevin",
"Kiara",
"Kimberly",
"Kyle",
"Kylee",
"Kylie",
"Landon",
"Laura",
"Lauren",
"Layla",
"Leah",
"Leonardo",
"Leslie",
"Levi",
"Liam",
"Liliana",
"Lillian",
"Lilly",
"Lily",
"Lindsey",
"Logan",
"Lucas",
"Lucy",
"Luis",
"Luke",
"Lydia",
"Mackenzie",
"Madeline",
"Madelyn",
"Madison",
"Makayla",
"Makenzie",
"Malachi",
"Manuel",
"Marco",
"Marcus",
"Margaret",
"Maria",
"Mariah",
"Mario",
"Marissa",
"Mark",
"Martin",
"Mary",
"Mason",
"Matthew",
"Max",
"Maxwell",
"Maya",
"Mckenzie",
"Megan",
"Melanie",
"Melissa",
"Mia",
"Micah",
"Michael",
"Michelle",
"Miguel",
"Mikayla",
"Miranda",
"Molly",
"Morgan",
"Mya",
"Naomi",
"Natalia",
"Natalie",
"Nathan",
"Nathaniel",
"Nevaeh",
"Nicholas",
"Nicolas",
"Nicole",
"Noah",
"Nolan",
"Oliver",
"Olivia",
"Omar",
"Oscar",
"Owen",
"Paige",
"Parker",
"Patrick",
"Paul",
"Payton",
"Peter",
"Peyton",
"Preston",
"Rachel",
"Raymond",
"Reagan",
"Rebecca",
"Ricardo",
"Richard",
"Riley",
"Robert",
"Ruby",
"Ryan",
"Rylee",
"Sabrina",
"Sadie",
"Samantha",
"Samuel",
"Sara",
"Sarah",
"Savannah",
"Sean",
"Sebastian",
"Serenity",
"Sergio",
"Seth",
"Shane",
"Shawn",
"Shelby",
"Sierra",
"Skylar",
"Sofia",
"Sophia",
"Sophie",
"Spencer",
"Stephanie",
"Stephen",
"Steven",
"Summer",
"Sydney",
"Tanner",
"Taylor",
"Thomas",
"Tiffany",
"Timothy",
"Travis",
"Trenton",
"Trevor",
"Trinity",
"Tristan",
"Tyler",
"Valeria",
"Valerie",
"Vanessa",
"Veronica",
"Victor",
"Victoria",
"Vincent",
"Wesley",
"William",
"Wyatt",
"Xavier",
"Zachary",
"Zoe",
"Zoey"
]
}var lines = ["hello", "hey", "whatever", "ugh", "no"];
var catImages = [];
var pairings = [];
function setup() { 
createCanvas(400, 400);
catImages.push(loadImage("cat1.jpg"));
catImages.push(loadImage("cat2.jpg"));
catImages.push(loadImage("cat3.jpg"));
} 
function draw() { 
background(220);
for (var i = 0; i < pairings.length; i++) {
var xPos = pairings[i].x;
var yPos = pairings[i].y;
var catIndex = pairings[i].catIndex;
var lineIndex = pairings[i].lineIndex;
image(catImages[catIndex], xPos, yPos);
text(lines[lineIndex], xPos, yPos);
}
}
function mousePressed() {
var pair = {catIndex: int(random(catImages.length)),
lineIndex: int(random(lines.length)),
x: mouseX,
y: mouseY};
pairings.push(pair);
console.log(pair);
}var lines = ["hello", "hey", "whatever", "ugh", "no"];
var catImages = [];
var randomCatIndex = 0;
var randomLineIndex = 0;
function setup() { 
createCanvas(400, 400);
catImages.push(loadImage("cat1.jpg"));
catImages.push(loadImage("cat2.jpg"));
catImages.push(loadImage("cat3.jpg"));
} 
function draw() { 
background(220);
image(catImages[randomCatIndex], mouseX, mouseY);
text(lines[randomLineIndex], mouseX, mouseY);
}
function mousePressed() {
randomCatIndex = int(random(catImages.length));
randomLineIndex = int(random(lines.length));
}var sourceText = "Life is short and art long";
var words = [];
function setup() { 
createCanvas(400, 400);
words = sourceText.split(" ");
background(220);
} 
function draw() { 
var idx = int(random(words.length));
textSize(random(10, 200));
fill(random(255), 0, random(255));
stroke(255);
strokeWeight(2);
textAlign(CENTER, CENTER);
text(words[idx], random(width), random(height));
}var current = "Call me Ishmael. Some years ago--never mind how long precisely--having little or no money in my purse, and nothing particular to interest me on shore";
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
textSize(24);
textLeading(24 + sin(frameCount*0.01)*24);
text(current, 50, 50, 300, 300);
}
function keyTyped() {
current += key;
}var sourceText = "Life is short and art long";
var idx = 0;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
fill(0);
var stringPart = sourceText.substring(0, idx);
textSize(32);
textAlign(LEFT, CENTER);
text(stringPart, 25, height/2);
idx++;
if (idx > sourceText.length) {
idx = 0;
}
}var sourceText = "Life is short and art long";
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
fill(0);
var idx = map(mouseX, 0, width, 0, sourceText.length);
var currentChar = sourceText.substring(idx, idx+1);
textSize(200);
textAlign(CENTER, CENTER);
text(currentChar, width/2, height/2);
}var sourceText = "Life is short and art long";
var currentIndex = 0;
function setup() { 
createCanvas(400, 400);
console.log(sourceText.length);
var snippet = sourceText.substring(3, 15);
console.log(snippet);
frameRate(10);
} 
function draw() { 
background(220);
fill(0);
var currentChar = sourceText.substring(currentIndex,
currentIndex+1);
textSize(200);
textAlign(CENTER, CENTER);
text(currentChar, width/2, height/2);
currentIndex++;
if (currentIndex > sourceText.length) {
currentIndex = 0;
}
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
fill(0);
textSize(40);
textFont("Lobster");
text("Hello, there!", 50, 200);
}var lastImg;
function setup() { 
createCanvas(400, 400);
background(255, 0, 0);
} 
function draw() { 
if (lastImg) {
tint(0, 0, 255, 128);
image(lastImg, -2, -2, width+4, height+4);
}
stroke(255);
strokeWeight(10);
fill(0);
textSize(48);
text("KQED", mouseX, mouseY);
lastImg = get();
}var lastImg;
function setup() { 
createCanvas(400, 400);
background(220);
} 
function draw() { 
if (lastImg) {
image(lastImg, -1, -1, width+2, height+2);
}
noStroke();
fill(0);
stroke(255);
textSize(40);
textAlign(CENTER, CENTER);
translate(mouseX, mouseY);
rotate(frameCount*0.01);
text("Attention, please.", 0, 0);
lastImg = get();
}var myText = "here's a\nbackslash: \\\\\\\\ woo";
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
textSize(32);
fill(0);
textLeading((mouseX/width)*32);
text(myText, 50, 50);
}var myFont;
function setup() { 
createCanvas(400, 400);
background(50);
} 
function draw() { 
background(50);
noStroke();
fill(random(255));
textSize(48);
textAlign(CENTER, CENTER);
textFont("Lobster");
translate(mouseX, mouseY);
rotate(frameCount*0.1);
text("yardvarkr", 0, 0);
}var typehere;
var button;
function setup() { 
createCanvas(400, 400);
typehere = createInput();
button = createButton("store stuff!");
button.mousePressed(storeStuff);
} 
function draw() { 
background(220);
if (localStorage["saved"]) {
text(localStorage["saved"]);
}
}
function storeStuff() {
console.log("in storestuff");
localStorage["saved"] = typehere.value();
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(50);
textFont("Coiny");
fill(255);
textSize(32);
text("Hey, it's a font from Google.",
mouseX, mouseY, 200, 200);
}var bgcol = 0;
function setup() { 
createCanvas(displayWidth, displayHeight);
background(0);
} 
function draw() { 
background(bgcol);
noStroke();
fill(map(rotationZ, 0, 360, 0, 255));
ellipse(map(rotationY, 90, -90, 0, width),
map(rotationX, 90, -90, 0, height),
50, 50);
bgcol--;
}
function deviceShaken() {
bgcol = 255;
}var count = 0;
function setup() {
createCanvas(displayWidth, displayHeight);
background(255);
console.log("in setup");
}
function draw() {
background(map(count, 0, 5, 0, 255));
noStroke();
rectMode(CENTER);
fill(255);
var ellsize = map(rotationZ, 0, 360, 0, 200);
var x = map(rotationY, -90, 90, 0, width);
var y = map(rotationX, -90, 90, 0, height);
translate(x, y);
rotate(radians(rotationZ));
rect(
0,
0,
100, 100);
}
function touchStarted() {
console.log("started");
count++;
}
function touchEnded() {
console.log("ended");
count--;
}
function touchMoved() {
return false;
}
fingers = {
touch1X: 50,
touch1Y: 75
}
touches = [
{x: 10, y: 10},
{x: 25, y: 100},
{x: 35, y: 14}
];
function setup() { 
createCanvas(400, 400);
loadJSON(giphyUrl, handleGiphy);
} 
var vid;
function draw() {
background(0);
if (vid) {
imageMode(CENTER);
image(vid, width/2, height/2, mouseX, mouseY);
}
}
function doSearch() {
searchField.value() + "&api_key=dc6zaTOxFJmzC";
loadJSON(giphyUrl, handleGiphy);
}
function handleGiphy(giphy) {
vid = createVideo(giphy.data[4].images.original.mp4);
vid.loop();
vid.size(400, 400);
vid.hide();
}function setup() { 
createCanvas(displayWidth, displayHeight);
} 
function draw() { 
background(220);
fill(255);
for (var i = 0; i < touches.length; i++) {
ellipse(touches[i].x, touches[i].y,
50, 50);
}
}
function touchMoved() {
return false;
}
[
{x: 50, y: 50},
{x: 60, y: 70},
{x: 75, y: 40}
]
var ry = 0;
var rz = 0;
function setup() {
createCanvas(displayWidth, displayHeight);
rectMode(CENTER);
setMoveThreshold(0.1);
}
function draw() {
background(50);
noStroke();
fill(255);
push();
translate(ry, rx);
rotate(rz);
rect(0, 0, 150, 150);
pop();
}
function deviceMoved() {
rx = map(rotationX, -90, 90, 0, displayHeight);
ry = map(rotationY, -90, 90, 0, displayWidth);
rz = radians(rotationZ);
}function setup() {
createCanvas(displayWidth, displayHeight);
}
function draw() {
background(50);
noStroke();
fill(255, 192);
for (var i = 0; i < touches.length; i++) {
ellipse(touches[i].x, touches[i].y,
100+sin(i+frameCount*0.1)*50,
100+sin(i+frameCount*0.1)*50);
}
}
function touchMoved() {
return false;
}var fillEllipse = true;
var bg = 50;
function setup() {
createCanvas(displayWidth, displayHeight);
rectMode(CENTER);
}
function draw() {
background(bg);
if (fillEllipse) {
fill(255);
}
else {
noFill();
}
rect(width/2, height/2, 100, 100);
}
function touchStarted() {
fillEllipse = !fillEllipse;
bg = 128;
}
function touchEnded() {
bg = 50;
}
function touchMoved() {
return false;
}function setup() {
createCanvas(displayWidth, displayHeight);
rectMode(CENTER);
}
function draw() {
background(50);
noStroke();
fill(255);
rect(width/2, height/2, touchX, touchY);
}
function touchMoved() {
return false;
var bg = 0;
function setup() {
createCanvas(displayWidth, displayHeight);
}
function draw() {
background(bg);
if (touchIsDown) {
bg = 255;
}
else {
bg = bg - 5;
}
if (bg < 0) {
bg = 0;
}
}var vid;
function setup() { 
createCanvas(320, 240);
pixelDensity(1);
vid = createCapture(VIDEO);
vid.size(width, height);
vid.hide();
} 
function draw() {
fill(255, 1);
noStroke();
rect(0, 0, width, height);
vid.loadPixels();
for (var i = 0; i < 1000; i++) {
var x = int(random(vid.width));
var y = int(random(vid.height));
var offset = ((y*vid.width)+x)*4;
fill(vid.pixels[offset],
vid.pixels[offset+1],
vid.pixels[offset+2]);
noStroke();
ellipse(x, y, 10, 10);
}
}
function keyTyped() {
if (key == 'a') {
vid.loop();
}
if (key == 'b') {
vid.pause();
}
}var vid;
function setup() { 
createCanvas(320, 240);
vid = createVideo("iwaswrong.mp4");
vid.loop();
vid.size(320, 240);
} 
function draw() { 
vid.loadPixels();
for (var i = 0; i < 100; i++) {
var x = int(random(vid.width));
var y = int(random(vid.height));
var offset = ((y*vid.width)+x)*4;
fill(vid.pixels[offset],
vid.pixels[offset+1],
vid.pixels[offset+2],
64);
noStroke();
ellipse(x, y, 10, 10);
}
}
function keyTyped() {
if (key == 'a') {
vid.loop();
}
if (key == 'b') {
vid.pause();
}
}var kitty;
function preload() {
kitty = loadImage('kitty_transparent.png');
}
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
fill(255, 64);
rect(0, 0, width, height);
kitty.loadPixels();
scale(1.5);
for (var i = 0; i < 1000; i++) {
var x = int(random(kitty.width));
var y = int(random(kitty.height));
var offset = ((y*kitty.width)+x)*4;
fill(kitty.pixels[offset+2],
random(255),
kitty.pixels[offset],
kitty.pixels[offset+3]);
noStroke();
ellipse(x, y, random(10), random(10));
}
}var kitty;
function preload() {
kitty = loadImage('kitty_transparent.png');
}
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(255);
for (var i = 0; i < 100; i++) {
var x = random(kitty.width);
var y = random(kitty.height);
var c = kitty.get(x, y);
fill(c);
noStroke();
ellipse(x+100, y+100, 10, 10);
}
}var hello;
function setup() { 
createCanvas(400, 400);
hello = createDiv("hello");
hello.style("width: 200px;");
hello.style("height: 300px;");
hello.style("background-color: red");
hello.style("z-index: -100");
hello.position(100, 300);
} 
function draw() { 
background(220);
hello.style("z-index: " + map(mouseX, 0, width, -100, 100));
}var kitty;
function preload() {
kitty = loadImage('kitty_transparent.png');
imageMode(CENTER);
}
function setup() { 
createCanvas(displayWidth, displayHeight);
imageMode(CENTER);
console.log("hello");
} 
var bg = 255;
function draw() { 
background(bg);
fill(255);
noStroke();
translate(touchX, touchY);
rotate(sin(frameCount*0.1));
ellipse(0, 0, kitty.width, kitty.height);
image(kitty, 0, 0);
}
function mousePressed() {
bg = 0;
}
function touchMoved() {
return false;
}var searchField;
var searchButton;
function setup() { 
noCanvas();
searchField = createInput();
searchButton = createButton("Search!");
searchButton.mouseClicked(doSearch);
} 
function draw() { 
background(220);
}
function doSearch() {
searchField.value() + "&api_key=dc6zaTOxFJmzC";
loadJSON(giphyUrl, handleGiphy);
}
function handleGiphy(giphy) {
for (var i = 0; i < giphy.data.length; i++) {
var vid = createVideo(giphy.data[i].images.original.mp4);
vid.loop();
}
}var meow;
var snare;
function preload() {
meow = loadSound("meow.mp3");
snare = loadSound("snare.mp3");
}
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
if (pmouseX < width / 2 && mouseX > width / 2) {
meow.play();
}
}
function mousePressed() {
if (!meow.isPlaying()) {
meow.play();
}
}
function keyTyped() {
if (key == 'a') {
meow.play();
}
if (key == 'l') {
snare.play();
}
}var kitty;
function preload() {
kitty = loadImage('kitty_transparent.png');
}
function setup() { 
createCanvas(400, 400);
noLoop();
} 
function draw() { 
background(255);
noStroke();
kitty.loadPixels();
for (var i = 0; i < width; i++) {
for (var j = 0; j < height; j++) {
var offset = ((j*kitty.width)+i)*3;
stroke(kitty.pixels[offset+1],
kitty.pixels[offset],
kitty.pixels[offset+2],
kitty.pixels[offset+3]);
point(i, j);
}
}
}var kitty;
function preload() {
kitty = loadImage('kitty_transparent.png');
}
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(255);
noStroke();
kitty.loadPixels();
translate(mouseX, mouseY);
for (var i = 0; i < 1000; i++) {
var x = int(random(kitty.width));
var y = int(random(kitty.height));
var offset = ((y*kitty.width)+x)*4;
fill(kitty.pixels[offset],
kitty.pixels[offset+1],
kitty.pixels[offset+2],
kitty.pixels[offset+3]);
ellipse(x, y, 10, 10);
}
}var kitty;
function preload() {
kitty = loadImage('kitty_transparent.png');
}
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
for (var i = 0; i < 10; i++) {
var x = random(kitty.width);
var y = random(kitty.height);
var c = kitty.get(x, y);
noStroke();
fill(c);
ellipse(x, y, 10, 10);
}
}var kitty;
function preload() {
kitty = loadImage("kitty_transparent.png");
imageMode(CENTER);
}
function setup() {
createCanvas(400, 400);
} 
function draw() { 
background(220);
image(kitty, mouseX, mouseY);
var textInput;
var apikey = "?&apikey=a74472e8eca541b2b2577c690b887abe";
var begin_date = "&begin_date=20161025";
var end_date = "&end_date=20161025";
var NYTquery = NYTurl + apikey + begin_date + end_date;
console.log(NYTquery);
var giphySearchTerm = "";
var giphyAPIkey = "?&api_key=dc6zaTOxFJmzC";
var giphyQuery = "&q=" + giphySearchTerm + "&limit=1";
var giphyQueryURL = giphyAPI + giphyAPIkey + giphyQuery;
var mainHeadlineElement;
var headlineWords = "";
var headlineWordStepper = 0;
var mainHeadline = "";
function setup() {
noCanvas();
textInput = select('#search');
textInput.changed(updateInput);
var button = select("#submit");
button.mousePressed(updateInput);
loadJSON(NYTquery, getNYTData);
}
function draw() {
background(220);
}
function getNYTData(data) {
var articles = data.response.docs;
mainHeadline = articles[0].headline.main;
headlineWords = split(mainHeadline, " ");
createElement('h1', mainHeadline);
underMainHeadlineElement = createP('');
for (var j = 0; j < headlineWords.length; j++) {
giphySearchTerm = headlineWords[headlineWordStepper];
giphySearchTerm = headlineWords[j];
giphyQuery = "&q=" + giphySearchTerm + "&limit1";
giphyQueryURL = giphyAPI + giphyAPIkey + giphyQuery;
var loader = new ImageLoader(
giphyQueryURL,
createDiv(""));
loader.load();
}
}
function updateInput() {
removeElements();
begin_date = "&begin_date=" + textInput.value();
end_date = "&end_date=" + textInput.value();
NYTquery = NYTurl + apikey + begin_date + end_date;
loadJSON(NYTquery, getNYTData);
}
function GiphyImageLoader(url, elem) {
this.url = url;
this.elem = elem;
this.load = function() {
loadJSON(this.url, this.gotData);
};
this.gotData = function(giphy) {
var newGIF = createImg(giphy.data[0].images.fixed_height.url);
newGIF.parent(this.div);
};
}
function getgiphyData(giphy) {
var newGIF = createImg(giphy.data[0].images.fixed_height.url);
newGIF.parent(underMainHeadlineElement);
}var vid;
function setup() {
createCanvas(0, 0);
vid = createVideo("iwaswrong.mp4");
vid.loop()
}var cap;
function setup() {
createCanvas(640, 480);
pixelDensity(1);
cap = createCapture(VIDEO);
cap.size(width, height);
cap.hide();
rectMode(CENTER);
noStroke();
}
function draw() {
background(50);
fill(255);
cap.loadPixels();
for (var cy = 0; cy < cap.height; cy += 10) {
for (var cx = 0; cx < cap.width; cx += 5) {
var offset = ((cy*cap.width)+cx)*4;
var xpos = (cx / cap.width) * width;
var ypos = (cy / cap.height) * height;
rect(xpos, ypos, 10,
10 * (cap.pixels[offset+1]/255));
}
}
}var cap;
function setup() {
createCanvas(400, 400);
cap = createCapture(VIDEO);
cap.hide();
imageMode(CENTER);
}
function draw() {
background(50);
image(cap, mouseX, mouseY, 160, 120);
}var happinessRecords = [
5,
7,
9,
2,
3,
8,
8,
8,
0,
1,
5,
6,
7,
10
];
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(0);
var spacing = width / happinessRecords.length;
fill(255, 240);
noStroke();
for (var i = 0; i < happinessRecords.length; i++) {
ellipse(i * spacing, height/2,
happinessRecords[i]*10,
happinessRecords[i]*10);
}
}function setup() { 
createCanvas(400, 400);
loadJSON(
showNames);
} 
function draw() { 
background(220);
}
function showNames(data) {
for (var i = 0; i < data.tracks.items.length; i++) {
item = data.tracks.items[i];
createP(item.name);
}
}var mySlider;
var mySlider2;
function setup() { 
createCanvas(400, 400);
mySlider = createSlider(0, 255, 127);
mySlider.position(10, 10);
mySlider.style("width: 500px;");
mySlider2 = createSlider(0, width, width/2);
mySlider2.position(10, 25);
} 
function draw() { 
background(mySlider.value());
fill(255);
ellipse(mySlider2.value(), height/2,
50, 50);
}var myButton;
var myButton2;
function setup() { 
createCanvas(400, 400);
myButton = createButton("Click me!");
myButton.position(10, 10);
myButton.mousePressed(drawRandomCircle);
myButton2 = createButton("Click me too!");
myButton2.position(10, 40);
myButton2.mousePressed(clearAll);
} 
function draw() { 
}
function drawRandomCircle() {
fill(random(255));
var circleSize = random(10, 200);
ellipse(random(width), random(height),
circleSize, circleSize);
}
function clearAll() {
background(255);
}var cheeseImage;
var cheeseImage2;
var headerTag;
function setup() { 
createCanvas(0, 0);
cheeseImage = select(".cheese");
cheeseImage2 = select(".cheese2");
headerTag = select(".happy");
} 
function draw() { 
background(220);
cheeseImage.position(mouseX, mouseY);
cheeseImage2.position(mouseY, mouseX);
cheeseImage2.size(200+sin(frameCount*0.01)*200,
200+sin(frameCount*0.1)*200);
}
function mousePressed() {
headerTag.html("you clicked!");
headerTag.position(mouseX, mouseY);
}var myButton;
var clearButton;
var mySlider;
function setup() { 
createCanvas(400, 400);
myButton = createButton("Click Me!!");
myButton.style("font-family: Comic Sans MS; font-size: 24px;");
myButton.position(10, 10);
myButton.mousePressed(drawRandomRect);
clearButton = createButton("Clear!");
clearButton.style("font-family: Comic Sans MS; font-size: 24px;");
clearButton.position(10, 58);
clearButton.mousePressed(drawBackground);
mySlider = createSlider(0, 255, 127);
mySlider.position(10, 100);
background(220);
} 
function draw() { 
background(mySlider.value());
}
function drawBackground() {
background(220);
}
function drawRandomRect() {
rectMode(CENTER);
fill(random(255));
rect(random(width), random(height), random(width), random(height));
}
var riker;
var bashir;
function setup() { 
createCanvas(0, 0);
riker = select(".riker");
bashir = select(".bashir");
} 
function draw() { 
background(220);
riker.position(mouseX, mouseY);
riker.size(sin(frameCount*0.1)*100,
sin(frameCount*0.1)*100);
bashir.position(mouseY, mouseX);
if (mouseIsPressed) {
bashir.hide();
}
else {
bashir.show();
}
}var circles = [];
function setup() {
createCanvas(400, 400);
}
function draw() {
background(64, 16);
if (frameCount % 5) {
circles.push(new Circle(random(width), random(height)));
}
for (var i = 0; i < circles.length; i++) {
circles[i].update();
circles[i].display();
}
for (var i = circles.length - 1; i >= 0; i--) {
if (circles[i].size <= 0) {
circles.splice(i, 1);
}
}
}
function mousePressed() {
circles.push(new Circle(mouseX, mouseY));
console.log(circles.length);
}
function Circle(x, y) {
this.xpos = x;
this.ypos = y;
this.xspeed = random(-1, 1);
this.yspeed = random(-1, 1);
this.size = random(25, 200);
this.sizeSpeed = random(5);
this.update = function() {
this.xpos += this.xspeed;
this.ypos += this.yspeed;
this.size -= this.sizeSpeed;
if (this.size <= 0) {
this.size = 0;
}
};
this.display = function() {
if (this.size > 0) {
fill(255, 64);
noStroke();
ellipse(this.xpos, this.ypos,
this.size, this.size);
}
};
}var circles = [];
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
for (var i = 0; i < circles.length; i++) {
circles[i].display();
circles[i].update();
}
var toRemove = [];
for (var i = 0; i < circles.length; i++) {
for (var j = 0; j < circles.length; j++) {
if (i != j) {
if (circles[i].intersects(circles[j])) {
circles[i].deleteMe = true;
circles[j].deleteMe = true;
}
}
}
}
for (var i = circles.length - 1; i >= 0; i--) {
if (circles[i].deleteMe) {
circles.splice(i, 1);
}
}
}
function mousePressed() {
circles.push(new Circle(mouseX, mouseY, random(255)));
}
function Circle(x, y, c) {
this.x = x;
this.y = y;
this.c = c;
this.deleteMe = false;
this.xspeed = random(-2, 2);
this.yspeed = random(-2, 2);
this.display = function() {
fill(this.c);
ellipse(this.x, this.y, 50, 50);
};
this.update = function() {
this.x += this.xspeed;
this.y += this.yspeed;
if (this.x > width || this.x < 0) {
this.xspeed *= -1;
}
if (this.y > height || this.y < 0) {
this.yspeed *= -1;
}
};
this.intersects = function(other) {
var d = dist(this.x, this.y, other.x, other.y);
if (d < 40) {
return true;
}
return false;
}
}var happyRectangle = {xpos: 42, ypos: 250};
function setup() {
createCanvas(400, 400);
rectMode(CENTER);
} 
function draw() { 
background(220);
rect(happyRectangle.xpos,
happyRectangle.ypos,
100, 50);
happyRectangle.ypos += 1;
}
function mousePressed() {
happyRectangle.xpos = mouseX;
happyRectangle.ypos = mouseY;
}var rectY = [];
var xwidth;
var xheight;
function setup() { 
createCanvas(400, 400);
rect[0] = 99;
rectMode(CENTER);
xwidth = random(20);
xheight = random(20);
} 
function draw() {
background(50);
for (var i = 0; i < rectY.length; i++) {
var currentObj = rectY[i];
rect(currentObj.xpos, currentObj.ypos,
currentObj.w, currentObj.h);
}
for (var i = 0; i < rectY.length; i++) {
var currentObj = rectY[i];
currentObj.ypos += 1;
}
}
function mousePressed() {
var newRect = {xpos: mouseX, ypos: mouseY,
w: random(50), h: random(50)};
rectY.push(newRect);
console.log(rectY);
var rectList = [75, 200, 300];
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
for (var i = 0; i < rectList.length; i++) {
rect(rectList[i], height/2, 50, 25);
}
for (var i = 0; i < rectList.length; i++) {
rectList[i]++;
}
}var canvasHeight = 458;
var canvasWidth = 670;
var positionX;
var positionY;
var canvasX;
var canvasY;
var moveX = canvasWidth /2;
var moveY = canvasHeight /2;
var sound;
var color_r = 255;
var color_g = 0;
var color_b = 0;
function setup() {
var canvas = createCanvas(canvasWidth, canvasHeight);
}
function preload(){
}
function windowResized() {
if (window.innerWidth < 700){
resizeCanvas(windowWidth, canvasHeight);
} else{
resizeCanvas(canvasWidth, canvasHeight);
}
}
function draw() {
background(230);
var myIpod = new Ipod(mouseX, mouseY, canvasWidth, canvasHeight, color_r, color_g, color_b);
myIpod.drawIpod();
}
var Ipod = function(positionX, positionY, canvasX, canvasY, color_r, color_g, color_b){
this.positionX = positionX;
this.positionY = positionY;
this.canvasX = canvasX;
this.canvasY = canvasY;
this.width = 150;
this.height = 300;
this.colorR_ipod = color_r;
this.colorG_ipod = color_g;
this.colorB_ipod = color_b;
this.colorR = 30;
this.colorG = 30;
this.colorB = 30;
this.controlSize = 120;
if ((this.positionX > (this.canvasX/2 - this.width/2) && this.positionX < this.canvasX/2 + this.width/2) && (this.positionY > this.canvasY/2 - this.height/2 && this.positionY < this.canvasY/2 + this.height/2))
{
cursor(HAND);
}
else {
cursor(ARROW);
}
if ((this.positionX > (this.canvasX/2 - this.width/2) + (this.controlSize/5)) && (this.positionX < (this.canvasX/2 + this.width/2) - (this.controlSize/5)) &&  (this.positionY > (this.canvasY/2 - this.height/2) + (this.controlSize+15)) && (this.positionY < (this.canvasY/2 + this.height/2) - ((this.controlSize/2) -15))
)
{
console.log("On the control");
this.colorR = random(0, 0);
this.colorG = random(0, 130);
this.colorB = random(0, 255);
}
if ((this.positionX > this.canvasX/2 -((this.width/2)/2)) && (this.positionX < this.canvasX/2 +((this.width/2)/2) )&& 
(this.positionY > (this.canvasY/2)+15) && (this.positionY < (this.canvasY/2)+60)){
console.log("inside");
this.colorR = 30;
this.colorG = 30;
this.colorB = 30;
}
this.drawIpod = function(){
fill(this.colorR_ipod, this.colorG_ipod, this.colorB_ipod);
noStroke();
rect(this.canvasX/2 - this.width/2, this.canvasY/2 - this.height/2, this.width, this.height);
fill(this.colorR, this.colorG, this.colorB);
rect((this.canvasX/2 - this.width/2) + (this.width /21.4),(this.canvasY/2 - this.height/2) + (this.height / 21.4), this.width/1.1, 100);
fill(250);
ellipse((this.canvasX/2 - this.width/2) + (this.width/2), (this.canvasY/2 - this.height/2) + (this.height /1.5), this.controlSize, this.controlSize);
fill(this.colorR_ipod, this.colorG_ipod, this.colorB_ipod);
ellipse((this.canvasX/2 - this.width/2) + (this.width/2), (this.canvasY/2 - this.height/2) + (this.height /1.5), this.controlSize/2, this.controlSize/2);
fill(255);
rect((this.canvasX/2)+this.controlSize/2, (this.canvasY/2)+this.height/2, 5, this.canvasY/2);
rect(((this.canvasX/2)+this.controlSize/2)-2.5, (this.canvasY/2)+this.height/2, 10, 30);
}
}
var counter = 0;
function setup() { 
createCanvas(400, 400);
} 
function draw() {
var noiseShade = noise(counter*0.01, 0) * 255;
background(noiseShade);
ellipse(noiseShade, height/2, 10, 10);
counter += 1;
}var shade = 128;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
var shadeSin = map(sin(shade*0.01), -1, 1, 0, 255);
background(shadeSin);
ellipse(shadeSin, height/2, 10, 10);
}var shade = 128;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
var shadeSin = map(sin(shade*0.01), -1, 1, 0, 255);
background(shadeSin);
ellipse(shadeSin, height/2, 10, 10);
}function setup() { 
createCanvas(400, 400);
console.log("you rolled a ", rollDie(-100));
} 
function draw() { 
background(220);
}
function rollDie(nsides) {
var roll = int(random(nsides)) + 1;
return roll;
}
function dollars2kroner(usd) {
return usd * 17;
}var cX = 100;
var cY = 100;
var cD = 50;
var cSpeedX = 2;
var cSpeedY = 4;
var boink = false;
function setup() { 
createCanvas(400, 400);
} 
function mousePressed() {
if (dist(mouseX, mouseY, cX, cY) < cD / 2) {
console.log("hey");
boink = true;
}
}
function draw() { 
background(220);
if (dist(mouseX, mouseY, cX, cY) < cD / 2) {
fill(255, 0, 0);
}
else {
fill(255);
}
ellipse(cX, cY, cD, cD);
circleBounce();
if (dist(mouseX, mouseY, 150, 150) < 50) {
fill(255, 0, 0);
}
else {
fill(255);
}
ellipse(150, 150, 100, 100);
if (boink) {
textSize(72);
fill(255, 0, 0);
text("boink!", width/2, height/2);
}
}
function circleBounce() {
cX += cSpeedX;
cY += cSpeedY;
if (cX+(cD/2) > width || cX-(cD/2) < 0) {
cSpeedX *= -1;
cSpeedX += random(-0.1, 0.1);
}
if (cY+(cD/2) > height || cY-(cD/2) < 0) {
cSpeedY *= -1;
cSpeedY += random(-0.1, 0.1);
}
}function setup() { 
createCanvas(400, 400);
rectMode(CENTER);
} 
function draw() { 
background(220);
fill(0);
stroke(255);
strokeWeight(3);
push();
translate(50, height/2);
for (var i = 0; i < 5; i++) {
translate(50, 0);
push();
rotate((PI/10)*i*(mouseX/width));
rect(0, 0, 45, 45);
pop();
}
pop();
ellipse(mouseX, mouseY, 20, 20);
var cellSize = 40;
var gridResolution = 40;
var randomSeedVal = 0;
function setup() {
createCanvas(400, 400);
background(255);
cellSize = width / gridResolution;
randomSeedVal = int(random(1000));
}
function draw() {
background(0, 0, 220);
stroke(0, 220, 220);
noFill();
for (var i = 0; i < gridResolution; i++) {
for (var j = 0; j < gridResolution; j++) {
push();
translate(i*cellSize, j*cellSize);
if (noise(i*0.2, j*0.2) > 0.5) {
line(0, 0, cellSize, cellSize);
}
else {
line(cellSize, 0, 0, cellSize);
}
pop();
}
}
fill(255, 0, 0);
ellipse(mouseX, mouseY, 50, 50);
}var howManyEyes = 2;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(0);
strokeWeight(8);
stroke(255, 0, 255);
noFill();
push();
translate(mouseX, mouseY);
makeFaceNEyes(howManyEyes, frameCount * 0.01);
pop();
}
function mousePressed() {
howManyEyes++;
if (howManyEyes > 8) {
howManyEyes = 2;
}
}
function makeFaceNEyes(eyeCount, smileAmount) {
var outerPupDist = 100;
var eyeStep = outerPupDist / (eyeCount - 1);
for (var i = 0; i < eyeCount; i++) {
ellipse(-50 + (i*eyeStep), -25,
getEyeSize(eyeStep));
}
arc(0, 25, 100, 50, 0, smileAmount);
}
function getEyeSize(x) {
return (mouseX / width) * 25;
}var ypos = 80;
var xpos = 80;
var xstep = 60;
function setup() { 
createCanvas(400, 400);
background(220);
} 
function draw() {
background(220);
fill(0);
for (var i = 0; i < 5; i++) {
for (var j = 0; j < 5; j++) {
mouse_dist = dist(xpos+(xstep*i), ypos+(xstep*j),
mouseX, mouseY);
if (mouse_dist < 25) {
fill(255);
}
else {
fill(0);
}
ellipse(xpos + (xstep * i), ypos + (xstep * j),
50,
50);			
}
}
}
var ypos = 80;
var xpos = 80;
var xstep = 60;
function setup() { 
createCanvas(400, 400);
background(220);
} 
function draw() {
background(220);
noStroke();
for (var i = 0; i < 5; i++) {
for (var j = 0; j < 5; j++) {
if (int(frameCount*0.1) % 5 == i) {
fill(255, 0, 0);
}
else {
fill(i * 30, j * 25, 255);
}
mouse_dist = dist(xpos+(xstep*i), ypos+(xstep*j),
mouseX, mouseY);
push();
translate(xpos + (xstep * i), ypos + (xstep * j));
scale(0.25);
makeFaceNEyes(2+int(noise(i, j)*4));
pop();
}
}
}
function makeFaceNEyes(eyeCount) {
var outerPupDist = 100;
var eyeStep = outerPupDist / (eyeCount - 1);
for (var i = 0; i < eyeCount; i++) {
ellipse(-50 + (i*eyeStep), -25, eyeStep * 0.5, eyeStep * 0.5);
}
arc(0, 25, 100, 50, 0, PI);
}
var ypos = 80;
var xpos = 80;
var xstep = 60;
var alt_ypos = 250;
var alt_xpos = 80;
var alt_xstep = 60;
function setup() { 
createCanvas(400, 400);
background(220);
} 
function draw() {
background(220);
noStroke();
fill(0);
for (var i = 0; i < 5; i++) {
for (var j = 0; j < 5; j++) {			
ellipse(xpos + (xstep * i), ypos + (xstep * j),
40, 40);			
}
}
fill(255);
for (var i = 0; i < 25; i++) {
var how_far_over = i % 5;
var how_far_down = int(i / 5);
ellipse(xpos + 10 + how_far_over*xstep,
90 + how_far_down*xstep, 40, 40);
}
}
var xpos = 0;
function setup() { 
createCanvas(400, 400);
console.log(10*19 > 9*20);
} 
function draw() { 
background(220);
fill(255);
ellipse(xpos, height/2, 100, 100);
xpos += 2;
if (xpos > width) {
fill(255, 255, 0);
ellipse(width/2, height/2, 300, 300);
}
else {
rect(10, 10, 100, 100);
}
if (frameCount % 300 == 0) {
xpos = 0;
}
}function setup() { 
createCanvas(400, 400);
rectMode(CENTER);
} 
function draw() { 
background(220);
translate(mouseX, mouseY);
rotate(frameCount * 0.01);
rect(0, 0, 100, 200);
}var cloud1 = 0;
var cloud1speed = 0.7;
var cloud2 = 50;
var cloud3 = 100;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220, 240, 255);
fill(240, 0, 0);
rect(50, 150, 90, 300);
fill(255, 240);
noStroke();
push();
translate(cloud1, 50);
scale(0.25);
rotate(0.1);
happyCloud();
pop();
push();
translate(cloud2, mouseY);
scale(0.5);
rotate(-0.1);
happyCloud();
pop();
push();
translate(cloud3, 350);
scale(1.5);
rotate(0.2);
happyCloud();
pop();
cloud1 += cloud1speed;
cloud2 += 0.6;
cloud3 += 0.7;
if (cloud1 > width) {
cloud1speed = -1 * cloud1speed;
}
if (cloud2 > width) {
cloud2 = -100;
}
if (cloud3 > width) {
cloud3 = -100;
}
}
function happyCloud() {
arc(0, 0, 200, 250, PI, 0, CHORD);
arc(75, 0, 150, 175, PI, 0, CHORD);
arc(150, 0, 100, 125, PI, 0, CHORD);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
fill(0);
ellipse(width/2, height/2, sin(frameCount*0.05)*255, sin(frameCount*0.05)*255);
}var xpos = 80;
var ypos = 200;
var xstep = 40;
var ellipseCount = 0;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
fill(50);
noStroke();
xstep = mouseX;
ellipseCount = map(mouseX, 0, height, 0, 100);
for (var i = 0; i < ellipseCount; i++) {
ellipse(xpos + (xstep*i), ypos, 40, 40);
}
}var circleFill;
function setup() { 
createCanvas(400, 400);
circleFill = color(255, 0, 0);
var n = random(6);
console.log(n);
if (n < 2) {
circleFill = color(255, 0, 0);
}
else if (n < 4) {
circleFill = color(0, 255, 0);
}
else {
circleFill = color(0, 0, 255);
}
} 
function draw() {
background(50);
fill(circleFill);
strokeWeight(10);
stroke(255);
ellipse(width/2, height/2, 300, 250);
}var circleFill = 0;
function setup() { 
createCanvas(400, 400);
if (random(100) < 50) {
circleFill = 255;
}
} 
function draw() {
background(50);
fill(circleFill);
strokeWeight(10);
stroke(255);
ellipse(width/2, height/2, 300, 250);
}function setup() { 
createCanvas(400, 400);
} 
function draw() {
background(50);
fill(255);
if ((frameCount % 20) < 5) {
rect(100, 100, 200, 200);
}
if ((frameCount % 45) < 35) {
fill(255, 0, 0);
rect(150, 150, 200, 200);
}
}var xoffset = 10;
var yoffset = 350;
function setup() { 
createCanvas(400, 400);
} 
function draw() {
background(220);
stroke(0);
strokeWeight(8);
noFill();
push();
scale(2);
translate(mouseX, mouseY);
drawFace();
pop();
translate(mouseX, 200);
drawFace();
pop();
push();
translate(mouseX, 300);
drawFace();
}
function drawFace() {
ellipse(-40, -20, 40, 50);
ellipse(40, -20, 50, 40);
line(-20, 40, 40, 40);
}
function setup() { 
createCanvas(400, 400);
} 
function draw() {
var doubleMouse = mouseX * 2;
background(mouseX, mouseY, frameCount % 255);
triangle((frameCount * 2) % 400, mouseY / 2, 100, 100, doubleMouse, height);
}var ed = 200;
var joe = 100;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(joe);
strokeWeight(ed / 5);
ellipse(100, 200, ed * 2, ed * 2);
ellipse(200, 200, ed, ed);
ellipse(300, 200, ed * 0.5, ed * 0.5);
}var ed = 200;
var joe = 100;
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(joe);
strokeWeight(ed / 5);
ellipse(100, 200, ed * 2, ed * 2);
ellipse(200, 200, ed, ed);
ellipse(300, 200, ed * 0.5, ed * 0.5);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
noFill();
stroke(0, 0, 240);
strokeWeight(20);
ellipse(200, 200, 300, 200);
stroke(255);
strokeWeight(10);
arc(200, 200, 300, 200, PI * 2,
map(mouseX, 0, width, 0, TWO_PI), CHORD);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
}function setup() {
createCanvas(400, 400);  
}
function draw() {
background(105, 109, 125);
strokeWeight(10);
stroke(111, 146, 131);
fill(141, 159, 135);
rect(50, 50, 100, 100);
strokeWeight(5);
stroke(141, 159, 135);
fill(205, 198, 165);
ellipse(200, 200, 250, 250);
strokeWeight(10);
stroke(205, 198, 165);
fill(240, 220, 202);
rect(250, 250, 100, 100);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
}