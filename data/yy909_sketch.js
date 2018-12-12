function setup() {
noCanvas();
frameRate(1);
}
function draw() {
const values = [];
for (let i = 0; i < 150000; i++) {
values[i] = random(0, 100);
}
const shape = [500, 300];
tf.tidy(() => {
const a = tf.tensor2d(values, shape, 'int32');
const b = tf.tensor2d(values, shape, 'int32');
const bb = b.transpose();
const c = a.matMul(bb);
});
console.log('hello');
a.dispose();
b.dispose();
bb.dispose();
c.dispose();
tf.memory().numTensors;
}
var video;
var img;
var trackColor; 
function preload() {
img = loadImage("crouchoGlasses.png");
}
function setup() {
createCanvas(320, 240);
pixelDensity(1);
video = createCapture(VIDEO);
video.size(width,height);
video.hide();
trackColor = [255, 0, 0];
}
function draw() {
image(video,0,0);
img.resize(85, 85);
video.loadPixels();
var threshold = 30;
cumulativeX = 0;
cumulativeY = 0;
numberThatQualified = 0;
for (var y = 0; y < video.height; y++ ) {
for (var x = 0; x < video.width; x++ ) {
var loc = (x + y * video.width) * 4;
var r1 = video.pixels[loc   ]; 
var g1 = video.pixels[loc + 1];
var b1 = video.pixels[loc + 2];
var r2 = trackColor[0];
var g2 = trackColor[1];
var b2 = trackColor[2];
if (d < threshold) {
numberThatQualified ++;
cumulativeX = cumulativeX + x;
cumulativeY = cumulativeY + y;
}
}
}
if (numberThatQualified  >0 ) { 
fill(trackColor);
strokeWeight(4.0);
stroke(0);
image(img, cumulativeX/numberThatQualified , cumulativeY/numberThatQualified);
}
}
function mousePressed() {
trackColor = video.get(mouseX,mouseY);
console.log(trackColor);
}
let url;
let city;
let before = "?terms=";
let after = "&format=json";
let startYear;
function setup() {
noCanvas();
let button = select('#tryit');
button.mousePressed(cityAsk);
}
function cityAsk() {
let cityInput = select("#city");
city = cityInput.value();
console.log(city);
let url = result + before + city + after;
console.log(url);
loadJSON(url, gotData);
}
function gotData(data) {
let length = data.items.length;
let i = Math.floor(random(length));
startYear = data.items[i].start_year;
console.log(startYear);
}let data;
let y;
function preload() {
}
function setup() {
createCanvas(400, 400);
background(255);
console.log(data.USD.last);
y = data.USD.last/100;
fill(255, 0, 255);
noStroke();
ellipse(200, y, 30, 30);
}
function draw() {
var bgValue = 0;
function setup() {
createCanvas(640, 480);
}
for (var i = 0; i < portList.length; i++) {
console.log(i + " " + portList[i]);
portName = portList[i];
}
}
}
if (inData.length > 0) {
console.log("Got data: " + inData);
}
if (inData.length>0) {
var d = split(inData, ',');
console.log(d);
if (d.length == 1) {
bgValue = parseInt(d[0]);
switchState = parseInt(d[1]);
console.log("bgValue = " + bgValue);
console.log("switchState = " + switchState); 
d = bgValue;
}
}
}
function draw() {
if (switchState == 1) { 
background(bgValue/4);
} else {
background(255, 0, bgValue/4);
}
textSize(32);
fill(0);
stroke(0);
fill(255, 0, 0);
ellipse(100, 300, 50, 50);
fill(0, 255, 0);
ellipse(200, 300, 50, 50);
}
function mousePressed() {
if (mouseX < width/2) {
} else {
}
}
function keyPressed() {
if (key>=0 && key<=9) {
}
}
function serverConnected() { console.log('connected to server.'); }
createCanvas(400, 400);
} 
function draw() { 
background(220);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
beginShape();
curveVertex(221, 68);
curveVertex(175, 61);
curveVertex(183, 92);
curveVertex(223, 87);
endShape(CLOSE);
1.	use sin() function to change the size of dots, instead of the current linear relationship
2.	draw columns vertically first. the middle column should be sin(PI/2)
let triangles;
function setup() {
createCanvas(width_Canvas, 412);
background(0);
triangles = new Background_Triangle(24, 23, 5);
triangles.draw_Triangles();
pumpkin_Grid();
draw_PumpSects();
draw_Stem();
draw_Dots();
}
1.	use sin() function to change the size of dots, instead of the current linear relationship
2.	draw columns vertically first. the middle column should be sin(PI/2)
let triangles;
function setup() {
createCanvas(width_Canvas, 412);
background(0);
triangles = new Background_Triangle(24, 23, 5);
triangles.draw_Triangles();
pumpkin_Grid();
draw_PumpSects();
draw_Stem();
draw_Dots();
}
1.	use sin() function to change the size of dots, instead of the current linear relationship
2.	draw columns vertically first. the middle column should be sin(PI/2)
let triangles;
function setup() {
createCanvas(width_Canvas, 412);
background(0);
triangles = new Background_Triangle(24, 23, 5);
triangles.draw_Triangles();
pumpkin_Grid();
draw_PumpSects();
draw_Stem();
draw_Dots();
}
function setup() {
createCanvas(500,500); 
}
var perc = 0.1;
function draw() { 
background(220);
noFill();
bezier(85, 20, 10, 10, 90, 90, 15, 80);
var p = getCubicBezierXYatPercent({x:85,y:20}, {x:10, y:10}, {x:90, y:90}, {x:15, y:80}, perc);
ellipse(p.x, p.y, 50, 50);
perc+=0.01;
}
function getCubicBezierXYatPercent(startPt, controlPt1, controlPt2, controlPt3, endPt, percent){
var x=CubicN(percent, startPt.x, controlPt1.x, controlPt2.x, controlPt3, endPt.x);
var y=CubicN(percent, startPt.y, controlPt1.y, controlPt2.y, controlPt3, endPt.y);
return({x:x, y:y});
}
function CubicN(pct, a, b, e, c, d) {
var t2 = pct * pct;
var t3 = t2 * pct;
return a + (-a * 3 + pct * (3 * a - a * pct)) * pct
+ (3 * b + pct * (-6 * b + b * 3 * pct)) * pct
+ (c * 3 - c * 3 * pct) * t2
+ d * t3;
}
function CubicN(pct, a, b, e, c, d) {
var t2 = pct * pct;
var t3 = t2 * pct;
return a + (-a * 3 + pct * (3 * a - a * pct)) * pct
+ (3 * b + pct * (-6 * b + b * 3 * pct)) * pct
+ (c * 3 - c * 3 * pct) * t2
+ d * t3;
}function setup() {
createCanvas(500,500); 
}
var perc = 0.1;
function draw() { 
background(220);
noFill();
bezier(85, 20, 10, 10, 90, 90, 15, 80);
var p = getQuadraticBezierXYatPercent({x:85,y:20}, {x:10, y:10}, {x:90, y:90}, perc);
ellipse(p.x, p.y, 50, 50);
perc+=0.01;
}
function getQuadraticBezierXYatPercent(startPt,controlPt,endPt,percent) {
var x = Math.pow(1-percent,2) * startPt.x + 2 * (1-percent) * percent * controlPt.x + Math.pow(percent,2) * endPt.x;
var y = Math.pow(1-percent,2) * startPt.y + 2 * (1-percent) * percent * controlPt.y + Math.pow(percent,2) * endPt.y;
return( {x:x,y:y} );
}function setup() { 
createCanvas(400, 400);
} 
var p = 0.1f;
function draw() { 
background(220);
noFill();
bezier(85, 20, 10, 10, 90, 90, 15, 80);
var p = getQuadraticBezierXYatPercent({x:85,y:20}, {x:10, y:10}, {x:90, y:90}, .5);
ellipse(p.x, p.y, 50, 50);
p+=.01;
}
function getQuadraticBezierXYatPercent(startPt,controlPt,endPt,percent) {
var x = Math.pow(1-percent,2) * startPt.x + 2 * (1-percent) * percent * controlPt.x + Math.pow(percent,2) * endPt.x;
var y = Math.pow(1-percent,2) * startPt.y + 2 * (1-percent) * percent * controlPt.y + Math.pow(percent,2) * endPt.y;
return( {x:x,y:y} );
let portName = '/dev/cu.usbmodem1461';
let circleSize = 10;
function setup() { 
} 
for (var i = 0; i < portList.length; i++) {
console.log(i + "" + portList[i]);
}
}
function serverConnected() {
console.log('connected to server.');
}
function portOpen() {
}
}
}
function portClose() {
}
function draw() { 
background(220);
fill(255, 0, 255);
noStroke();
ellipse(width/2, height/2, circleSize, circleSize);
}let width_Canvas = 510;
let pump_Height = 313;
let coord_Right = [];
let coord_LeftReverse;
let coord_Left = [
[
[239, 117], [226, 125], [215, 141], [207, 165], [204, 185],
[203, 214], [199, 244], [190, 277], [182, 305], [183, 328],
[189, 344], [197, 356], [209, 366], [233, 371]
],
[
[228, 96], [193, 112], [178, 128], [165, 152], [156, 172],
[145, 196], [134, 220], [122, 247], [115, 275], [122, 313],
[132, 330], [145, 345], [164, 355], [194, 362]
],
[
[202, 87], [153, 107], [123, 124], [106, 143], [96, 167],
[87, 191], [78, 215], [68, 242], [59, 261], [57, 286],
[67, 311], [82, 330], [117, 351], [169, 362]
],
[
[192, 64], [158, 68], [119, 83], [87, 108], [70, 134],
[52, 167], [42, 192], [34, 220], [35, 244], [40, 269],
[49, 291], [66, 313], [98, 332], [158, 340]
]
];
function setup() { 
createCanvas(width_Canvas, 400);
for(let i = 0; i < coord_Left.length; i++) {
coord_Right[i] = [];
for(let j = 0; j < coord_Left[i].length; j++) {
let x_Left = coord_Left[i][j][0];
let y_Any = coord_Left[i][j][1];
let x_Right = width_Canvas - x_Left;
coord_Right[i][j] = [x_Right, y_Any];
}
}
coord_LeftReverse = coord_Left.slice().reverse();
coord = coord_LeftReverse.concat(coord_Right);
background(220);
fill(0);
for(let i = 0; i < coord.length; i++) {
let x_Center = width_Canvas / 2;
let y_Rear = 61;
let y_Now;
if(i == 0) {
y_Now = y_Rear + 66;
let radius_Max = 28;
let radius_Min = 1;
let shift_Max = 0.15;
let shift_Min = 0.01;
let dist_Between = dist(x_Center, y_Now, x_Center, pump_Height + y_Rear);
drawing = new Draw_Dots(x_Center, y_Now, x_Center, pump_Height + y_Rear, radius_Max, radius_Min, dist_Between, shift_Max, shift_Min);
drawing.dots_Column();
}
for(let j = 1; j < coord[i].length / 2; j++) {
let x_Previous = coord[i][j - 1][0];
let y_Previous = coord[i][j - 1][1];
let x_PreviousOpposit = coord[i][coord[i].length - j][0];
let y_PreviousOpposit = coord[i][coord[i].length - j][1];
let x_Current = coord[i][j][0];
let x_Opposit = coord[i][coord[i].length - 1 - j][0];
let x_Next = coord[i][j + 1][0];
let x_NextOpposit = coord[i][coord[i].length - 2 - j][0];
let dist_Between = dist(x_Previous, y_Previous, x_PreviousOpposit, y_PreviousOpposit);
let x_PreviousMiddle = (x_Previous + y_Previous) / 2;
let x_Middle = (x_Current + x_Opposit) / 2;
let x_NextMiddle = (x_Next + x_NextOpposit) / 2;
let radius_Max = 8 * (14 - j) / 5;
let radius_Min = 0.02 * (14 - j);
let x_Start = x_Previous;
let y_Start = y_Previous;
let x_End = x_PreviousOpposit;
let y_End = y_PreviousOpposit;
let shift_Max = 0.15;
let shift_Min = 0.01;
if(i <= 14 && x_Middle >= x_NextMiddle && (x_Middle < x_PreviousMiddle || x_Middle < 253) && dist_Between > 100) {
drawing = new Draw_Dots(x_Start, y_Start, x_End, y_End, radius_Max, radius_Min, dist_Between, shift_Max, shift_Min);
drawing.dots_Column();
} else if (x_Middle <= x_NextMiddle && (x_Middle > x_PreviousMiddle || x_Middle > 253) && dist_Between > 100) {
drawing = new Draw_Dots(x_Start, y_Start, x_End, y_End, radius_Max, radius_Min, dist_Between, shift_Max, shift_Min);
drawing.dots_Column();
} 
}
}
}
class Draw_Dots {
constructor(x_Start, y_Start, x_End, y_End, radius_Max, radius_Min, dist_Between, shift_Max, shift_Min) {
this.x_Start = x_Start;
this.y_Start = y_Start;
this.x_End = x_End;
this.y_End = y_End;
this.radius_Max = radius_Max;
this.radius_Min = radius_Min;
this.dist_Between = dist_Between;
this.shift_Max = shift_Max;
this.shift_Min = shift_Min;
}
dots_Column() {
let ratio1 = 0.01;
let x_NearBottom = (this.x_Start + 3 * this.x_End) / 4;
let y_NearBottom = (this.y_Start + 3 * this.y_End) / 4;
let x_Off = 0.0;
let y_Off = 0.0;
let noise_Scale = 15;
while(ratio1 < 1) {
x_Off += 10;
y_Off += 1;
let ratio2 = 1 - ratio1;
let x_Any = ratio1 * this.x_Start + ratio2 * this.x_End + noise(x_Off) * noise_Scale;
let y_Any = ratio1 * this.y_Start + ratio2 * this.y_End + noise(y_Off) * noise_Scale;
let dist_ToNearBottom = dist(x_Any, y_Any, x_NearBottom, y_NearBottom);
let radius = map(dist_ToNearBottom, 0, 3/4 * this.dist_Between, this.radius_Max, this.radius_Min);
let shift = map(radius, this.radius_Max, this.radius_Min, this.shift_Max, this.shift_Min);
stroke(0);
fill(0);
ellipse(x_Any, y_Any, radius, radius);
ratio1 += shift;
}
}
}let width_Canvas = 510;
let pump_Height = 313;
let coord_Right = [];
let coord_LeftReverse;
let coord_Left = [
[
[239, 117], [226, 125], [215, 141], [207, 165], [204, 185],
[203, 214], [199, 244], [190, 277], [182, 305], [183, 328],
[189, 344], [197, 356], [209, 366], [233, 371]
],
[
[228, 96], [193, 112], [178, 128], [165, 152], [156, 172],
[145, 196], [134, 220], [122, 247], [115, 275], [122, 313],
[132, 330], [145, 345], [164, 355], [194, 362]
],
[
[202, 87], [153, 107], [123, 124], [106, 143], [96, 167],
[87, 191], [78, 215], [68, 242], [59, 261], [57, 286],
[67, 311], [82, 330], [117, 351], [169, 362]
],
[
[192, 64], [158, 68], [119, 83], [87, 108], [70, 134],
[52, 167], [42, 192], [34, 220], [35, 244], [40, 269],
[49, 291], [66, 313], [98, 332], [158, 340]
]
];
function setup() { 
createCanvas(width_Canvas, 400);
for(let i = 0; i < coord_Left.length; i++) {
coord_Right[i] = [];
for(let j = 0; j < coord_Left[i].length; j++) {
let x_Left = coord_Left[i][j][0];
let y_Any = coord_Left[i][j][1];
let x_Right = width_Canvas - x_Left;
coord_Right[i][j] = [x_Right, y_Any];
}
}
coord_LeftReverse = coord_Left.slice().reverse();
coord = coord_LeftReverse.concat(coord_Right);
background(220);
fill(0);
for(let i = 0; i < coord.length; i++) {
let x_Center = width_Canvas / 2;
let y_Rear = 61;
let y_Now;
if(i == coord.length - 1) {
y_Now = y_Rear;
} else {
y_Now = y_Rear + 66 - 17 * i;
}
ellipse(x_Center, y_Now, 2, 2);
ellipse(x_Center, pump_Height + y_Rear, 2, 2);
line(x_Center, y_Now, x_Center, pump_Height + y_Rear);
for(let j = 1; j < coord[i].length / 2; j++) {
let x_Previous = coord[i][j - 1][0];
let y_Previous = coord[i][j - 1][1];
let x_PreviousOpposit = coord[i][coord[i].length - j][0];
let y_PreviousOpposit = coord[i][coord[i].length - j][1];
let x_Current = coord[i][j][0];
let x_Opposit = coord[i][coord[i].length - 1 - j][0];
let x_Next = coord[i][j + 1][0];
let x_NextOpposit = coord[i][coord[i].length - 2 - j][0];
let dist_Between = dist(x_Previous, y_Previous, x_PreviousOpposit, y_PreviousOpposit);
let x_PreviousMiddle = (x_Previous + y_Previous) / 2;
let x_Middle = (x_Current + x_Opposit) / 2;
let x_NextMiddle = (x_Next + x_NextOpposit) / 2;
if(i <= 14 && x_Middle >= x_NextMiddle && (x_Middle < x_PreviousMiddle || x_Middle < 253) && dist_Between > 100) {
let ratio1 = 0.01;
let x_NearBottom = ( x_Previous + 3 * x_PreviousOpposit) / 4;
let y_NearBottom = ( y_Previous + 3 * y_PreviousOpposit) / 4;
let radius_Max = 12 * (14 - j) / 5;
let radius_Min = 0.02 * (14 - j);
let shift_Max = 0.15;
let shift_Min = 0.01;
let x_Off = 0.0;
let y_Off = 0.0;
let noise_Scale = 10;
while(ratio1 < 1) {
x_Off += 10;
y_Off += 1;
let ratio2 = 1 - ratio1;
let x_Any = ratio1 * x_Previous + ratio2 * x_PreviousOpposit + noise(x_Off) * noise_Scale;
let y_Any = ratio1 * y_Previous + ratio2 * y_PreviousOpposit + noise(y_Off) * noise_Scale;
let dist_ToNearBottom = dist(x_Any, y_Any, x_NearBottom, y_NearBottom);
let radius = map(dist_ToNearBottom, 0, 3/4 * dist_Between, radius_Max, radius_Min);
let shift = map(radius, radius_Max, radius_Min, shift_Max, shift_Min);
stroke(0);
fill(0);
ellipse(x_Any, y_Any, radius, radius);
ratio1 += shift;
}
line(x_Previous, y_Previous, x_PreviousOpposit, y_PreviousOpposit);
} else if (x_Middle <= x_NextMiddle && (x_Middle > x_PreviousMiddle || x_Middle > 253) && dist_Between > 100) {
line(x_Previous, y_Previous, x_PreviousOpposit, y_PreviousOpposit);
} 
}
}
}
class Draw_Dots {
constructor(x_Start, y_Start, x_End, y_End, radius_Max, radius_Min) {
this.x_Start = x_Start;
this.y_Start = y_Start;
this.x_End = x_End;
this.y_End = y_End;
this.radius_Max = radius_Max;
this.radius_Min = radius_Min;
}
draw_Column() {
let ratio1 = 0.01;
let x_NearBottom = (this.x_Start + 3 * this.x_End) / 4;
let y_NearBottom = (this.y_Start + 3 * this.y_End) / 4;
let shift_Max = 0.15;
let shift_Min = 0.01;
let x_Off = 0.0;
let y_Off = 0.0;
let noise_Scale = 10;
while(ratio1 < 1) {
x_Off += 10;
y_Off += 1;
let ratio2 = 1 - ratio1;
let x_Any = ratio1 * this.x_Start + ratio2 * this.x_End + noise(x_Off) * noise_Scale;
let y_Any = ratio1 * this.y_Start + ratio2 * this.y_End + noise(y_Off) * noise_Scale;
let dist_ToNearBottom = dist(x_Any, y_Any, x_NearBottom, y_NearBottom);
let radius = map(dist_ToNearBottom, 0, 3/4 * dist_Between, this.radius_Max, this.radius_Min);
let shift = map(radius, this.radius_Max, this.radius_Min, shift_Max, shift_Min);
stroke(0);
fill(0);
ellipse(x_Any, y_Any, radius, radius);
ratio1 += shift;
}
}
1.	use sin() function to change the size of dots, instead of the current linear relationship
2.	draw columns vertically first. the middle column should be sin(PI/2)
let triangles;
function preload() {
data_coord = loadJSON ("data.json");
}
function setup() {
createCanvas(width_Canvas, 412);
coord_Left = data_coord.data_Pumpkin;
coord_Stem = data_coord.data_Stem;
pumpkin_Grid();
background(0);
triangles = new Background_Triangle(24, 23, 5);
triangles.draw_Triangles();
draw_PumpSects();
draw_Dots();
draw_Stem();
1.	use sin() function to change the size of dots, instead of the current linear relationship
2.	draw columns vertically first. the middle column should be sin(PI/2)
let triangles;
function setup() {
createCanvas(width_Canvas, 412);
background(0);
triangles = new Background_Triangle(24, 23, 5);
triangles.draw_Triangles();
pumpkin_Grid();
draw_PumpSects();
draw_Stem();
draw_Dots();
}
1.	use sin() function to change the size of dots, instead of the current linear relationship
2.	draw columns vertically first. the middle column should be sin(PI/2)
let width_Canvas = 510;
let pump_Height = 315;
let coord;
let coord_Right = [];
let coord_LeftReverse;
let triangles;
let coord_Left;
function preload() {
coord_Left = loadJSON ("test.json");
}
function setup() {
createCanvas(width_Canvas, 412);
}
function draw() {
}
function draw_PumpSects() {
for(let i = coord_Left.length - 1; i >= 0; i--) {
stroke(0);
fill(210, 160, 6);
beginShape();
let x_RightControl = coord_Right[0][0][0];
let y_RightControl = coord_Right[0][0][1];
curveVertex(x_RightControl, y_RightControl);
let x_Center = width_Canvas / 2;
let y_Rear = 61;
let y_Now;
if(i == coord_Left.length - 1) {
y_Now = y_Rear;
} else {
y_Now = y_Rear + 66 - 17 * i;
}
curveVertex(x_Center, y_Now);
for(let j = 0; j < coord_Left[i].length; j++) {
let x_Left = coord_Left[i][j][0];
let y_Left = coord_Left[i][j][1];
curveVertex(x_Left, y_Left);
}
curveVertex(x_Center, pump_Height + y_Rear);
for(let k = 0; k < coord_Right[i].length; k++) {
let last = coord_Right[i].length - 1 - k;
let x_Right = coord_Right[i][last][0];
let y_Right = coord_Right[i][last][1];
curveVertex(x_Right, y_Right);
}
curveVertex(x_Center, y_Now);
let x_LeftControl = coord_Left[0][0][0];
let y_LeftControl = coord_Left[0][0][1];
curveVertex(x_LeftControl, y_LeftControl);
endShape();
}
}
function draw_Dots() {
for(let i = 0; i < coord.length - 1; i++) {
for(let j = 1; j < coord[i].length - 1; j++) {
let x_Left = coord[i][j][0], y_Left = coord[i][j][1];
let x_Right = coord[i+1][j][0], y_Right = coord[i+1][j][1];
let ratio1 = 0.05;
let x_Quarter = (3 * x_Left + x_Right) / 4;
let y_Quarter = (3 * y_Left + y_Right) / 4;
let distance_LeftRight = dist(x_Left, y_Left, x_Right, y_Right);
let radius_Max = 25;
let radius_Min = 1;
let shift_Max = 1.5;
let shift_Min = 0.01;
if (x_Left < x_Right) {
while(ratio1 < 1) {
let ratio2 = 1 - ratio1;
let x_Any = ratio1 * x_Left + ratio2 * x_Right;
let y_Any = ratio1 * y_Left + ratio2 * y_Right;
let distance_ToQuarter = dist(x_Any, y_Any, x_Quarter, y_Quarter);
let radius = map(distance_ToQuarter, 0, 3/4 * distance_LeftRight, radius_Max, radius_Min);
let shift = map(radius, radius_Max, radius_Min, shift_Max, shift_Min);
stroke(0);
fill(0);
ellipse(x_Any, y_Any, radius, radius + 2);
ratio1 += shift;
}
}
}
}
}
class Background_Triangle {
constructor(width_Triangle, height_Triangle, random_Triangle) {
this.width = width_Triangle;
this.height = height_Triangle;
this.random = random_Triangle;
this.grid = new Array(23);
}
draw_Triangles() {
for(let i = 0; i < this.grid.length; i++) {
this.grid[i] = new Array(19);
for(let j = 0; j < this.grid[i].length; j++) {
this.grid[i][j] = createVector(i * this.width + random(-this.random, this.random), j * this.height + random(-this.random, this.random));
}
}
stroke(239, 193, 6);
strokeWeight(1);
noFill();
for(let i = 0; i < this.grid.length - 1; i ++){
for(let j = 0; j < this.grid[i].length - 1; j++){
beginShape();
let pt1 = this.grid[i][j];
vertex(pt1.x, pt1.y);
let pt2 = this.grid[i][j + 1];
vertex(pt2.x, pt2.y);
let pt3 = this.grid[i + 1][j];
vertex(pt3.x, pt3.y);
endShape(CLOSE);
}
}
}
}[
[[226,125],[215,141],[207,165],[204,185],
[203,209],[200,233],[196,260],[189,279],
[182,305],[182,322],[188,343],[196,359],[226,375]],
[[193,112],[178,128],[165,152],[156,172],
[145,196],[134,220],[122,247],[116,266],
[116,291],[120,308],[132,330],[147,346],[194,362]],
[[153,107],[123,124],[104,147],[96,167],
[87,191],[78,215],[68,242],[59,261],
[57,286],[62,303],[77,325],[94,343],[139,360]],
[[158,68],[119,83],[87,108],[70,134],
[52,167],[42,192],[34,220],[35,244],
[40,269],[45,286],[60,308],[77,326],[158,340]],
[[284,125],[295,141],[303,165],[306,185],
[307,209],[310,233],[314,260],[321,279],
[328,305],[328,322],[322,343],[314,359],[284,375]],
[[317,112],[332,128],[345,152],[354,172],
[365,196],[376,220],[388,247],[394,266],
[394,291],[390,308],[378,330],[363,346],[316,362]],
[[357,107],[387,124],[406,147],[414,167],
[423,191],[432,215],[442,242],[451,261],
[453,286],[448,303],[433,325],[416,343],[371,360]],
[[352,68],[391,83],[423,108],[440,134],
[458,167],[468,192],[476,220],[475,244],
[470,269],[465,286],[450,308],[433,326],[352,340]]
]let width_Canvas = 510;
let pump_Height = 315;
let coord;
let coord_Right = [];
let coord_LeftReverse;
let coord_Left = [
[
[226, 125], [215, 141], [207, 165], [204, 185],
[203, 209], [200, 233], [196, 260], [189, 279], [182, 305],
[182, 322], [188, 343], [196, 359], [226, 375]
],
[
[193, 112], [178, 128], [165, 152], [156, 172],
[145, 196], [134, 220], [122, 247], [116, 266], [116, 291],
[120, 308], [132, 330], [147, 346], [194, 362]
],
[
[153, 107], [123, 124], [104, 147], [96, 167],
[87, 191], [78, 215], [68, 242], [59, 261], [57, 286],
[62, 303], [77, 325], [94, 343], [139, 360]
],
[
[158, 68], [119, 83], [87, 108], [70, 134],
[52, 167], [42, 192], [34, 220], [35, 244], [40, 269],
[45, 286], [60, 308], [77, 326], [158, 340]
],
];
function setup() { 
createCanvas(400, 400);
for(let i = 0; i < coord_Left.length; i++) {
coord_Right[i] = [];
for(let j = 0; j < coord_Left[i].length; j++) {
let x_Left = coord_Left[i][j][0];
let y_Any = coord_Left[i][j][1];
let x_Right = width_Canvas - x_Left;
coord_Right[i][j] = [x_Right, y_Any];
}
}
coord_LeftReverse = coord_Left.reverse();
coord = coord_LeftReverse.concat(coord_Right);
console.log(coord);
} 
1.	use sin() function to change the size of dots, instead of the current linear relationship
2.	draw columns vertically first. the middle column should be sin(PI/2)
let width_Canvas = 510;
let pump_Height = 315;
let coord;
let coord_Right = [];
let coord_LeftReverse;
let triangles;
let coord_Left;
function preload() {
data_coord_Left = loadJSON ("data.json");
}
function setup() {
createCanvas(width_Canvas, 412);
coord_Left = data_coord_Left.data;
for(let i = 0; i < coord_Left.length; i++) {
coord_Right[i] = [];
for(let j = 0; j < coord_Left[i].length; j++) {
let x_Left = coord_Left[i][j][0];
let y_Any = coord_Left[i][j][1];
let x_Right = width_Canvas - x_Left;
coord_Right[i][j] = [x_Right, y_Any];
}
}
coord_LeftReverse = coord_Left.slice().reverse();
coord = coord_LeftReverse.concat(coord_Right);
triangles = new Background_Triangle(24, 23, 5);
background(0);
triangles.draw_Triangles();
}
function draw() {
draw_PumpSects();
draw_Dots();
}
function draw_PumpSects() {
for(let i = coord_Left.length - 1; i >= 0; i--) {
stroke(0);
fill(210, 160, 6);
beginShape();
let x_RightControl = coord_Right[0][0][0];
let y_RightControl = coord_Right[0][0][1];
curveVertex(x_RightControl, y_RightControl);
let x_Center = width_Canvas / 2;
let y_Rear = 61;
let y_Now;
if(i == coord_Left.length - 1) {
y_Now = y_Rear;
} else {
y_Now = y_Rear + 66 - 17 * i;
}
curveVertex(x_Center, y_Now);
for(let j = 0; j < coord_Left[i].length; j++) {
let x_Left = coord_Left[i][j][0];
let y_Left = coord_Left[i][j][1];
curveVertex(x_Left, y_Left);
}
curveVertex(x_Center, pump_Height + y_Rear);
for(let k = 0; k < coord_Right[i].length; k++) {
let last = coord_Right[i].length - 1 - k;
let x_Right = coord_Right[i][last][0];
let y_Right = coord_Right[i][last][1];
curveVertex(x_Right, y_Right);
}
curveVertex(x_Center, y_Now);
let x_LeftControl = coord_Left[0][0][0];
let y_LeftControl = coord_Left[0][0][1];
curveVertex(x_LeftControl, y_LeftControl);
endShape();
}
}
function draw_Dots() {
for(let i = 0; i < coord.length - 1; i++) {
for(let j = 1; j < coord[i].length - 1; j++) {
let x_Left = coord[i][j][0], y_Left = coord[i][j][1];
let x_Right = coord[i+1][j][0], y_Right = coord[i+1][j][1];
let ratio1 = 0.05;
let x_Quarter = (3 * x_Left + x_Right) / 4;
let y_Quarter = (3 * y_Left + y_Right) / 4;
let distance_LeftRight = dist(x_Left, y_Left, x_Right, y_Right);
let radius_Max = 25;
let radius_Min = 1;
let shift_Max = 1.5;
let shift_Min = 0.01;
if (x_Left < x_Right) {
while(ratio1 < 1) {
let ratio2 = 1 - ratio1;
let x_Any = ratio1 * x_Left + ratio2 * x_Right;
let y_Any = ratio1 * y_Left + ratio2 * y_Right;
let distance_ToQuarter = dist(x_Any, y_Any, x_Quarter, y_Quarter);
let radius = map(distance_ToQuarter, 0, 3/4 * distance_LeftRight, radius_Max, radius_Min);
let shift = map(radius, radius_Max, radius_Min, shift_Max, shift_Min);
stroke(0);
fill(0);
ellipse(x_Any, y_Any, radius, radius + 2);
ratio1 += shift;
}
}
}
}
}
class Background_Triangle {
constructor(width_Triangle, height_Triangle, random_Triangle) {
this.width = width_Triangle;
this.height = height_Triangle;
this.random = random_Triangle;
this.grid = new Array(23);
}
draw_Triangles() {
for(let i = 0; i < this.grid.length; i++) {
this.grid[i] = new Array(19);
for(let j = 0; j < this.grid[i].length; j++) {
this.grid[i][j] = createVector(i * this.width + random(-this.random, this.random), j * this.height + random(-this.random, this.random));
}
}
stroke(239, 193, 6);
strokeWeight(1);
noFill();
for(let i = 0; i < this.grid.length - 1; i ++){
for(let j = 0; j < this.grid[i].length - 1; j++){
beginShape();
let pt1 = this.grid[i][j];
vertex(pt1.x, pt1.y);
let pt2 = this.grid[i][j + 1];
vertex(pt2.x, pt2.y);
let pt3 = this.grid[i + 1][j];
vertex(pt3.x, pt3.y);
endShape(CLOSE);
}
}
}
}let width_Canvas = 510;
let pump_Height = 315;
let coord;
let coord_Right = [];
let coord_Left = [
[
[226, 125], [215, 141], [207, 165], [204, 185],
[203, 209], [200, 233], [196, 260], [189, 279], [182, 305],
[182, 322], [188, 343], [196, 359], [226, 375]
],
[
[193, 112], [178, 128], [165, 152], [156, 172],
[145, 196], [134, 220], [122, 247], [116, 266], [116, 291],
[120, 308], [132, 330], [147, 346], [194, 362]
],
[
[153, 107], [123, 124], [104, 147], [96, 167],
[87, 191], [78, 215], [68, 242], [59, 261], [57, 286],
[62, 303], [77, 325], [94, 343], [139, 360]
],
[
[158, 68], [119, 83], [87, 108], [70, 134],
[52, 167], [42, 192], [34, 220], [35, 244], [40, 269],
[45, 286], [60, 308], [77, 326], [158, 340]
],
];
function setup() { 
createCanvas(400, 400);
for(let i = 0; i < coord_Left.length; i++) {
coord_Right[i] = [];
for(let j = 0; j < coord_Left[i].length; j++) {
let x_Left = coord_Left[i][j][0];
let y_Any = coord_Left[i][j][1];
let x_Right = width_Canvas - x_Left;
coord_Right[i][j] = [x_Right, y_Any];
}
}
coord = coord_Left.concat(coord_Right);
}
function draw() { 
background(220);
console.log(coord);
}let width_Canvas = 510;
let pump_Height = 315;
let coord;
let coord_Right = [];
let coord_Left = [
[
[226, 125], [215, 141], [207, 165], [204, 185],
[203, 209], [200, 233], [196, 260], [189, 279], [182, 305],
[182, 322], [188, 343], [196, 359], [226, 375]
],
[
[193, 112], [178, 128], [165, 152], [156, 172],
[145, 196], [134, 220], [122, 247], [116, 266], [116, 291],
[120, 308], [132, 330], [147, 346], [194, 362]
],
[
[153, 107], [123, 124], [104, 147], [96, 167],
[87, 191], [78, 215], [68, 242], [59, 261], [57, 286],
[62, 303], [77, 325], [94, 343], [139, 360]
],
[
[158, 68], [119, 83], [87, 108], [70, 134],
[52, 167], [42, 192], [34, 220], [35, 244], [40, 269],
[45, 286], [60, 308], [77, 326], [158, 340]
],
];
function setup() {
createCanvas(width_Canvas, 400);
for(let i = 0; i < coord_Left.length; i++) {
coord_Right[i] = [];
for(let j = 0; j < coord_Left[i].length; j++) {
let x_Left = coord_Left[i][j][0];
let y_Any = coord_Left[i][j][1];
let x_Right = width_Canvas - x_Left;
coord_Right[i][j] = [x_Right, y_Any];
}
}
coord_LeftReverse = coord_Left.slice().reverse();
coord = coord_LeftReverse.concat(coord_Right);
}
function draw() {
background(220);
for(let i = 0; i < coord.length - 1; i++) {
for(let j = 0; j < coord[i].length; j++) {
let x_Left = coord[i][j][0], y_Left = coord[i][j][1];
let x_Right = coord[i+1][j][0], y_Right = coord[i+1][j][1];
let ratio1 = 0.05;
let x_Quarter = (3 * x_Left + x_Right) / 4;
let y_Quarter = (3 * y_Left + y_Right) / 4;
let distance_LeftRight = dist(x_Left, y_Left, x_Right, y_Right);
let radius_Max = 13;
let radius_Min = 0.01;
let shift_Max = 0.3;
let shift_Min = 0.03;
while(ratio1 < 1) {
let ratio2 = 1 - ratio1;
let x_Any = ratio1 * x_Left + ratio2 * x_Right;
let y_Any = ratio1 * y_Left + ratio2 * y_Right;
let distance_ToQuarter = dist(x_Any, y_Any, x_Quarter, y_Quarter);
let radius = map(distance_ToQuarter, 0, 3/4 * distance_LeftRight, radius_Max, radius_Min);
let shift = map(radius, radius_Max, radius_Min, shift_Max, shift_Min);
stroke(0);
fill(0);
ellipse(x_Any, y_Any, radius, radius);
ratio1 += shift;
}
}
}
}
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
let x2 = 300;
let y2 = 100;
let x1 = 100;
let y1 = 150;
let p1 = 0.05;
while(p1 < 1) {
let p2 = 1 - p1;
let x3 = p1 * x1 + p2 * x2;
let y3 = p1 * y1 + p2 * y2;
let x_Quarter = (3 * x1 + x2) / 4;
let y_Quarter = (3 * y1 + y2) / 4;
let d = dist(x3, y3, x_Quarter, y_Quarter);
let w = dist(x1, y1, x2, y2);
d = map(d, 0, 3 * w / 4, 14, 1);
let d2 = map(d, 14, 1, 0.1, 0.01);
stroke(0);
fill(0);
ellipse(x3, y3, d, d);
p1 += d2;
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
let x2 = 300;
let y2 = 100;
let x1 = 100;
let y1 = 150;
let p1 = 0.08;
while ( p1 < 0.2) {
let p2 = 1 - p1;
let x3 = p1 * x1 + p2 * x2;
let y3 = p1 * y1 + p2 * y2;
let d = dist(x3, y3, (3 * x1 + x2) / 4, (3 * y1 + y2) / 4);
let w = dist(x1, y1, x2, y2);
d = map(d, 0, w / 2, 14, 1);
stroke(0);
fill(0);
ellipse(x3, y3, d, d);
p1 += 0.08;
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
let x2 = 300;
let y2 = 100;
let x1 = 100;
let y1 = 150;
let p1 = 0.08;
for( let p1 = 0.05; p1 < 1; p1 += 0.08) {
let p2 = 1 - p1;
let x3 = p1 * x1 + p2 * x2;
let y3 = p1 * y1 + p2 * y2;
let x_Center = (3 * x1 + x2) / 4;
let y_Center = (3 * y1 + y2) / 4;
let d = dist(x3, y3, x_Center, y_Center);
let w = dist(x1, y1, x2, y2);
d = map(d, 0, w / 2, 14, 1);
stroke(0);
fill(0);
ellipse(x3, y3, d, d);
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
let x1 = 300;
let y1 = 100;
let x2 = 100;
let y2 = 150;
stroke(0);
fill(0);
line(x1, y1, x2, y2);
for (let p1 = 0; p1 < 1; p1 += 0.1) {
let p2 = 1 - p1;
let x3 = p1 * x1 + p2 * x2;
let y3 = p1 * y1 + p2 * y2;
ellipse(x3, y3, 8, 8);
}
ellipse(x1, y1, 4, 4);
ellipse(x2, y2, 4, 4);
}numbers = [2, 4, 9, 2, 0, 16, 24]
Array.prototype.max = function() {
let min = Math.max.apply(null, this);
};
Array.prototype.min = function() {
let max = Math.min.apply(null, this);
};
function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(220);
return max;
return min;
}
let width_Canvas = 510;
let pump_Height = 315;
let coord;
let coord_Right = [];
let coord_Left = [
[
[226, 125], [215, 141], [207, 165], [204, 185],
[203, 209], [200, 233], [196, 260], [189, 279], [182, 305],
[182, 322], [188, 343], [196, 359], [226, 375]
],
[
[193, 112], [178, 128], [165, 152], [156, 172],
[145, 196], [134, 220], [122, 247], [116, 266], [116, 291],
[120, 308], [132, 330], [147, 346], [194, 362]
],
[
[153, 107], [123, 124], [104, 147], [96, 167],
[87, 191], [78, 215], [68, 242], [59, 261], [57, 286],
[62, 303], [77, 325], [94, 343], [139, 360]
],
[
[158, 68], [119, 83], [87, 108], [70, 134],
[52, 167], [42, 192], [34, 220], [35, 244], [40, 269],
[45, 286], [60, 308], [77, 326], [158, 340]
],
];
function setup() {
createCanvas(width_Canvas, 412);
grid = new Array(23);
for(let i = 0; i < grid.length; i++) {
grid[i] = new Array(19);
for(let j = 0; j < grid[i].length; j++) {
grid[i][j] = createVector(i * 24 + random(-5, 5), j * 23 + random(-5, 5));
}
}
for(let i = 0; i < coord_Left.length; i++) {
coord_Right[i] = [];
for(let j = 0; j < coord_Left[i].length; j++) {
let x_Left = coord_Left[i][j][0];
let y_Any = coord_Left[i][j][1];
let x_Right = width_Canvas - x_Left;
coord_Right[i][j] = [x_Right, y_Any];
}
}
coord = coord_Left.concat(coord_Right);
}
function draw() {
background(0);
stroke(239, 193, 6);
strokeWeight(1);
noFill();
for(let i = 0; i < grid.length - 1; i ++){
for(let j = 0; j < grid[i].length - 1; j++){
beginShape();
let pt1 = grid[i][j];
vertex(pt1.x, pt1.y);
let pt2 = grid[i][j + 1];
vertex(pt2.x, pt2.y);
let pt3 = grid[i + 1][j];
vertex(pt3.x, pt3.y);
endShape(CLOSE);
}
}
draw_PumpSects();
draw_Dots();
}
function draw_PumpSects() {
for(let i = coord_Left.length - 1; i >= 0; i--) {
stroke(0);
fill(210, 160, 6);
beginShape();
let x_RightControl = coord_Right[0][0][0];
let y_RightControl = coord_Right[0][0][1];
curveVertex(x_RightControl, y_RightControl);
let x_Center = width_Canvas / 2;
let y_Rear = 61;
let y_Now;
if(i == coord_Left.length - 1) {
y_Now = y_Rear;
} else {
y_Now = y_Rear + 66 - 17 * i;
}
curveVertex(x_Center, y_Now);
for(let j = 0; j < coord_Left[i].length; j++) {
let x_Left = coord_Left[i][j][0];
let y_Left = coord_Left[i][j][1];
curveVertex(x_Left, y_Left);
}
curveVertex(x_Center, pump_Height + y_Rear);
for(let k = 0; k < coord_Right[i].length; k++) {
let last = coord_Right[i].length - 1 - k;
let x_Right = coord_Right[i][last][0];
let y_Right = coord_Right[i][last][1];
curveVertex(x_Right, y_Right);
}
curveVertex(x_Center, y_Now);
let x_LeftControl = coord_Left[0][0][0];
let y_LeftControl = coord_Left[0][0][1];
curveVertex(x_LeftControl, y_LeftControl);
endShape();
}
}
function draw_Dots() {
for(let i = 0; i < coord_Left.length - 1; i++) {
for(let j = 0; j < coord_Left[1].length; j++) {
let x_Left = coord_Left[i][j][0], y_Left = coord_Left[i][j][1];
let x_Right = coord_Left[i+1][j][0], y_Right = coord_Left[i+1][j][1];
let ratio1 = 0.05;
let x_Quarter = (3 * x_Left + x_Right) / 4;
let y_Quarter = (3 * y_Left + y_Right) / 4;
let distance_LeftRight = dist(x_Left, y_Left, x_Right, y_Right);
let radius_Max = 6;
let radius_Min = 0.01;
let shift_Max = 0.15;
let shift_Min = 0.03;
while(ratio1 < 1) {
let ratio2 = 1 - ratio1;
let x_Any = ratio1 * x_Left + ratio2 * x_Right;
let y_Any = ratio1 * y_Left + ratio2 * y_Right;
let distance_ToQuarter = dist(x_Any, y_Any, x_Quarter, y_Quarter);
let radius = map(distance_ToQuarter, 0, 3/4 * distance_LeftRight, radius_Max, radius_Min);
let shift = map(radius, radius_Max, radius_Min, shift_Max, shift_Min);
stroke(0);
fill(0);
ellipse(x_Any, y_Any, radius, radius);
ratio1 += shift;
}
}
}
}let width_Canvas = 510;
let x_Center = 253;
let y_Original = 61;
let y_Actual;
let pump_Height = 315;
let coord_Right = [];
let x_Left;
let y_Any;
let x_Right;
let coord_Left = [
[
[226, 125], [215, 141], [207, 165], [204, 185],
[203, 209], [200, 233], [196, 260], [189, 279], [182, 305],
[182, 322], [188, 343], [196, 359], [226, 375]
],
[
[193, 112], [178, 128], [165, 152], [156, 172],
[145, 196], [134, 220], [122, 247], [116, 266], [116, 291],
[120, 308], [132, 330], [147, 346], [194, 362]
],
[
[153, 107], [123, 124], [104, 147], [96, 167],
[87, 191], [78, 215], [68, 242], [59, 261], [57, 286],
[62, 303], [77, 325], [94, 343], [139, 360]
],
[
[158, 68], [119, 83], [87, 108], [70, 134],
[52, 167], [42, 192], [34, 220], [35, 244], [40, 269],
[45, 286], [60, 308], [77, 326], [158, 340]
],
];
function setup() { 
createCanvas(width_Canvas, 412);
for (let i = 0; i < coord_Left.length; i++) {
coord_Right[i] = [];
for (let j = 0; j < coord_Left[i].length; j++) {
x_Left = coord_Left[i][j][0];
y_Any = coord_Left[i][j][1];
x_Right = width_Canvas - x_Left;
coord_Right[i][j] = [x_Right, y_Any];
}
}
} 
function draw() { 
background(220);
draw_PumpSects ();
}
function draw_PumpSects() {
stroke (0);
fill (210, 160, 6);
for (let i = coord_Left.length - 1; i >= 0 ; i--) {
beginShape();
curveVertex(coord_Right[0][0]);
if (i == coord_Left.length - 1) {
y_Actual = y_Original;
curveVertex(x_Center, y_Actual);
} else {
y_Actual = y_Original + 66 - 17 * i;
curveVertex(x_Center, y_Actual);
}
curveVertex(x_Center, y_Front);
} else {
y_Front = y_Front + 30 - 5*i;
curveVertex(x_Center, y_Front);
for (let j = 0; j < coord_Left[i].length; j++) {
curveVertex(coord_Left[i][j][0], coord_Left[i][j][1]);
}
curveVertex(x_Center, pump_Height + y_Original);
for (let k = 0; k < coord_Right[i].length; k++) {
curveVertex(coord_Right[i][coord_Right[i].length - 1 - k][0],coord_Right[i][coord_Right[i].length - 1 - k][1]);
}
if (i == coord_Left.length - 1) {
y_Actual = y_Original;
curveVertex(x_Center, y_Actual);
} else {
y_Actual = y_Original + 66 - 17 * i;
curveVertex(x_Center, y_Actual);
}
curveVertex(x_Center, y_Front);
} else {
y_Front = y_Front - (28 - 3 * i);
curveVertex(x_Center, y_Front);
curveVertex(coord_Left[0][0][0], coord_Left[0][0][1]);
endShape();
}
}function setup(){
createCanvas(253*2, 600);
} 
function draw() { 
background(0);
stroke(255);
fill(0,100,0);
beginShape();
curveVertex(253*2-226,125);
curveVertex(253,115);
curveVertex(226,125);
curveVertex(215,141);
curveVertex(207,165);
curveVertex(204,185);
curveVertex(203,209);
curveVertex(200,233);
curveVertex(196,260);
curveVertex(189,279);
curveVertex(182,305);
curveVertex(182,322);
curveVertex(188,343);
curveVertex(196,359);
curveVertex(226,375);
curveVertex(253,376);
curveVertex(253*2-226,375);
curveVertex(253*2-196,359);
curveVertex(253*2-182,305);
curveVertex(253*2-196,260);
curveVertex(253*2-203,209);
curveVertex(253*2-207,165);
curveVertex(253*2-226,125);
curveVertex(253,115);
curveVertex(226,125);
endShape(CLOSE);
}function setup() { 
createCanvas(400, 400);
} 
function draw() { 
background(0);
stroke(255);
fill(0,100,0);
beginShape();
curveVertex(350,150);
curveVertex(200,50);
curveVertex(50,150);
curveVertex(50,250);
curveVertex(200,350);
curveVertex(350,250);
curveVertex(350,150);
curveVertex(200,50);
curveVertex(50,150);
endShape();
}let width_Canvas = 510;
let dots_Front;
let x_Vertex_Front = 253, y_Vertex_Front = 115;
let x0_Anchor_LeftFront = 222, y0_Anchor_Front = 123;
let x0_ControlA_LeftFront = 240, y0_ControlA_Front = 113;
let x0_ControlB_LeftFront = 231, y0_ControlB_Front = 118;
let x1_Anchor_LeftFront = 201, y1_Anchor_Front = 181;
let x1_ControlA_LeftFront = 200, y1_ControlA_Front = 153;
let x1_ControlB_LeftFront = 203, y1_ControlB_Front = 167;
let x2_Anchor_LeftFront = 197, y2_Anchor_Front = 256;
let x2_ControlA_LeftFront = 203, y2_ControlA_Front = 202;
let x2_ControlB_LeftFront = 205, y2_ControlB_Front = 229;
let x3_Anchor_LeftFront = 183, y3_Anchor_Front = 328;
let x3_ControlA_LeftFront = 180, y3_ControlA_Front = 294;
let x3_ControlB_LeftFront = 184, y3_ControlB_Front = 311;
let x4_Anchor_LeftFront = 224, y4_Anchor_Front = 375;
let x4_ControlA_LeftFront = 192, y4_ControlA_Front = 358;
let x4_ControlB_LeftFront = 208, y4_ControlB_Front = 368;
let x5_Anchor_LeftFront = 253, y5_Anchor_Front = 380;
let x5_ControlA_LeftFront = 253, y5_ControlA_Front = 379;
let x5_ControlB_LeftFront = 210, y5_ControlB_Front = 375;
let x0_Anchor_RightFront = width_Canvas - x0_Anchor_LeftFront;
let x0_ControlA_RightFront = width_Canvas - x0_ControlA_LeftFront;
let x0_ControlB_RightFront = width_Canvas - x0_ControlB_LeftFront;
let x1_Anchor_RightFront = width_Canvas - x1_Anchor_LeftFront;
let x1_ControlA_RightFront = width_Canvas - x1_ControlA_LeftFront;
let x1_ControlB_RightFront = width_Canvas - x1_ControlB_LeftFront;
let x2_Anchor_RightFront = width_Canvas - x2_Anchor_LeftFront;
let x2_ControlA_RightFront = width_Canvas - x2_ControlA_LeftFront;
let x2_ControlB_RightFront = width_Canvas - x2_ControlB_LeftFront;
let x3_Anchor_RightFront = width_Canvas - x3_Anchor_LeftFront;
let x3_ControlA_RightFront = width_Canvas - x3_ControlA_LeftFront;
let x3_ControlB_RightFront = width_Canvas - x3_ControlB_LeftFront;
let x4_Anchor_RightFront = width_Canvas - x4_Anchor_LeftFront;
let x4_ControlA_RightFront = width_Canvas - x4_ControlA_LeftFront;
let x4_ControlB_RightFront = width_Canvas - x4_ControlB_LeftFront;
let x5_Anchor_RightFront = width_Canvas - x5_Anchor_LeftFront;
let x5_ControlA_RightFront = width_Canvas - x5_ControlA_LeftFront;
let x5_ControlB_RightFront = width_Canvas - x5_ControlB_LeftFront;
function setup() { 
createCanvas(width_Canvas, 412);
} 
function draw() {
background(0);
stroke(239, 193, 6);
strokeWeight(2);
noFill();
shape_Front();
}
function shape_Front() {
fill(239, 193, 6);
noFill();
beginShape();
vertex(x_Vertex_Front, y_Vertex_Front);
curveVertex(x0_ControlA_LeftFront, y0_ControlA_Front, x0_ControlB_LeftFront, y0_ControlB_Front, x0_Anchor_LeftFront, y0_Anchor_Front);
curveVertex(x1_ControlA_LeftFront, y1_ControlA_Front, x1_ControlB_LeftFront, y1_ControlB_Front, x1_Anchor_LeftFront, y1_Anchor_Front);
curveVertex(x2_ControlA_LeftFront, y2_ControlA_Front, x2_ControlB_LeftFront, y2_ControlB_Front, x2_Anchor_LeftFront, y2_Anchor_Front);
curveVertex(x3_ControlA_LeftFront, y3_ControlA_Front, x3_ControlB_LeftFront, y3_ControlB_Front, x3_Anchor_LeftFront, y3_Anchor_Front);
curveVertex(x4_ControlA_LeftFront, y4_ControlA_Front, x4_ControlB_LeftFront, y4_ControlB_Front, x4_Anchor_LeftFront, y4_Anchor_Front);
curveVertex(x4_ControlA_LeftFront, y4_ControlA_Front, x4_ControlB_LeftFront, y4_ControlB_Front, x4_Anchor_LeftFront, y4_Anchor_Front);
vertex(x5_Anchor_LeftFront, y5_Anchor_Front);
curveVertex(x5_ControlB_RightFront, y5_ControlB_Front, x5_ControlA_RightFront, y5_ControlA_Front, x5_Anchor_RightFront, y5_Anchor_Front);
curveVertex(x4_ControlB_RightFront, y4_ControlB_Front, x4_ControlA_RightFront, y4_ControlA_Front, x4_Anchor_RightFront, y4_Anchor_Front);
curveVertex(x3_ControlB_RightFront, y3_ControlB_Front, x3_ControlA_RightFront, y3_ControlA_Front, x3_Anchor_RightFront, y3_Anchor_Front);
curveVertex(x2_ControlA_RightFront, y2_ControlA_Front, x2_ControlB_RightFront, y2_ControlB_Front, x2_Anchor_RightFront, y2_Anchor_Front);
curveVertex(x1_ControlA_RightFront, y1_ControlA_Front, x1_ControlB_RightFront, y1_ControlB_Front, x1_Anchor_RightFront, y1_Anchor_Front);
curveVertex(x0_ControlA_RightFront, y0_ControlA_Front, x0_ControlB_RightFront, y0_ControlB_Front, x0_Anchor_RightFront, y0_Anchor_Front);
vertex(x_Vertex_Front, y_Vertex_Front);
endShape(CLOSE);
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
for (let y = 0; y < height; y += 10) {
let x = 0;
while (x < width) {
let d = dist(x, y, 200, y);
d = map(d, 0, width / 2, 10, 1);
ellipse(x, y, d, d);
x += d;
}
}
}let width_Canvas = 510;
let dots_Front;
let x_Vertex_Front = 253, y_Vertex_Front = 115;
let x0_Anchor_LeftFront = 222, y0_Anchor_Front = 123;
let x0_ControlA_LeftFront = 240, y0_ControlA_Front = 113;
let x0_ControlB_LeftFront = 231, y0_ControlB_Front = 118;
let x1_Anchor_LeftFront = 201, y1_Anchor_Front = 181;
let x1_ControlA_LeftFront = 200, y1_ControlA_Front = 153;
let x1_ControlB_LeftFront = 203, y1_ControlB_Front = 167;
let x2_Anchor_LeftFront = 197, y2_Anchor_Front = 256;
let x2_ControlA_LeftFront = 203, y2_ControlA_Front = 202;
let x2_ControlB_LeftFront = 205, y2_ControlB_Front = 229;
let x3_Anchor_LeftFront = 183, y3_Anchor_Front = 328;
let x3_ControlA_LeftFront = 180, y3_ControlA_Front = 294;
let x3_ControlB_LeftFront = 184, y3_ControlB_Front = 311;
let x4_Anchor_LeftFront = 224, y4_Anchor_Front = 375;
let x4_ControlA_LeftFront = 192, y4_ControlA_Front = 358;
let x4_ControlB_LeftFront = 208, y4_ControlB_Front = 368;
let x5_Anchor_LeftFront = 253, y5_Anchor_Front = 380;
let x5_ControlA_LeftFront = 253, y5_ControlA_Front = 379;
let x5_ControlB_LeftFront = 210, y5_ControlB_Front = 375;
let x0_Anchor_RightFront = width_Canvas - x0_Anchor_LeftFront;
let x0_ControlA_RightFront = width_Canvas - x0_ControlA_LeftFront;
let x0_ControlB_RightFront = width_Canvas - x0_ControlB_LeftFront;
let x1_Anchor_RightFront = width_Canvas - x1_Anchor_LeftFront;
let x1_ControlA_RightFront = width_Canvas - x1_ControlA_LeftFront;
let x1_ControlB_RightFront = width_Canvas - x1_ControlB_LeftFront;
let x2_Anchor_RightFront = width_Canvas - x2_Anchor_LeftFront;
let x2_ControlA_RightFront = width_Canvas - x2_ControlA_LeftFront;
let x2_ControlB_RightFront = width_Canvas - x2_ControlB_LeftFront;
let x3_Anchor_RightFront = width_Canvas - x3_Anchor_LeftFront;
let x3_ControlA_RightFront = width_Canvas - x3_ControlA_LeftFront;
let x3_ControlB_RightFront = width_Canvas - x3_ControlB_LeftFront;
let x4_Anchor_RightFront = width_Canvas - x4_Anchor_LeftFront;
let x4_ControlA_RightFront = width_Canvas - x4_ControlA_LeftFront;
let x4_ControlB_RightFront = width_Canvas - x4_ControlB_LeftFront;
let x5_Anchor_RightFront = width_Canvas - x5_Anchor_LeftFront;
let x5_ControlA_RightFront = width_Canvas - x5_ControlA_LeftFront;
let x5_ControlB_RightFront = width_Canvas - x5_ControlB_LeftFront;
function setup() { 
createCanvas(width_Canvas, 412);
} 
function draw() {
background(0);
stroke(239, 193, 6);
strokeWeight(2);
noFill();
shape_Front();
}
function shape_Front() {
fill(239, 193, 6);
noFill();
beginShape();
vertex(x_Vertex_Front, y_Vertex_Front);
bezierVertex(x0_ControlA_LeftFront, y0_ControlA_Front, x0_ControlB_LeftFront, y0_ControlB_Front, x0_Anchor_LeftFront, y0_Anchor_Front);
bezierVertex(x1_ControlA_LeftFront, y1_ControlA_Front, x1_ControlB_LeftFront, y1_ControlB_Front, x1_Anchor_LeftFront, y1_Anchor_Front);
bezierVertex(x2_ControlA_LeftFront, y2_ControlA_Front, x2_ControlB_LeftFront, y2_ControlB_Front, x2_Anchor_LeftFront, y2_Anchor_Front);
bezierVertex(x3_ControlA_LeftFront, y3_ControlA_Front, x3_ControlB_LeftFront, y3_ControlB_Front, x3_Anchor_LeftFront, y3_Anchor_Front);
bezierVertex(x4_ControlA_LeftFront, y4_ControlA_Front, x4_ControlB_LeftFront, y4_ControlB_Front, x4_Anchor_LeftFront, y4_Anchor_Front);
bezierVertex(x4_ControlA_LeftFront, y4_ControlA_Front, x4_ControlB_LeftFront, y4_ControlB_Front, x4_Anchor_LeftFront, y4_Anchor_Front);
vertex(x5_Anchor_LeftFront, y5_Anchor_Front);
bezierVertex(x0_ControlA_RightFront, y0_ControlA_Front, x0_ControlB_RightFront, y0_ControlB_Front, x0_Anchor_RightFront, y0_Anchor_Front);
bezierVertex(x1_ControlA_RightFront, y1_ControlA_Front, x1_ControlB_RightFront, y1_ControlB_Front, x1_Anchor_RightFront, y1_Anchor_Front);
bezierVertex(x2_ControlA_RightFront, y2_ControlA_Front, x2_ControlB_RightFront, y2_ControlB_Front, x2_Anchor_RightFront, y2_Anchor_Front);
bezierVertex(x3_ControlA_RightFront, y3_ControlA_Front, x3_ControlB_RightFront, y3_ControlB_Front, x3_Anchor_RightFront, y3_Anchor_Front);
bezierVertex(x4_ControlA_RightFront, y4_ControlA_Front, x4_ControlB_RightFront, y4_ControlB_Front, x4_Anchor_RightFront, y4_Anchor_Front);
bezierVertex(x5_ControlA_RightFront, y5_ControlA_Front, x5_ControlB_RightFront, y5_ControlB_Front, x5_Anchor_RightFront, y5_Anchor_Front);
endShape();
}let width_Canvas = 510;
let dots_Front;
let x_Vertex_Front = 253, y_Vertex_Front = 115;
let x0_Anchor_LeftFront = 215, y0_Anchor_Front = 139;
let x0_ControlA_LeftFront = 226, y0_ControlA_Front = 125;
let x0_ControlB_LeftFront = 238, y0_ControlB_Front = 112;
let x1_Anchor_LeftFront = 202, y1_Anchor_Front = 184;
let x1_ControlA_LeftFront = 207, y1_ControlA_Front = 165;
let x1_ControlB_LeftFront = 212, y1_ControlB_Front = 146;
let x2_Anchor_LeftFront = 200, y2_Anchor_Front = 235;
let x2_ControlA_LeftFront = 203, y2_ControlA_Front = 209;
let x2_ControlB_LeftFront = 206, y2_ControlB_Front = 183;
let x3_Anchor_LeftFront = 192, y3_Anchor_Front = 280;
let x3_ControlA_LeftFront = 169, y3_ControlA_Front = 260;
let x3_ControlB_LeftFront = 200, y3_ControlB_Front = 240;
let x4_Anchor_LeftFront = 179, y4_Anchor_Front = 329;
let x4_ControlA_LeftFront = 182, y4_ControlA_Front = 305;
let x4_ControlB_LeftFront = 185, y4_ControlB_Front = 281;
let x5_Anchor_LeftFront = 206, y5_Anchor_Front = 371;
let x5_ControlA_LeftFront = 196, y5_ControlA_Front = 359;
let x5_ControlB_LeftFront = 186, y5_ControlB_Front = 347;
let x6_Anchor_LeftFront = 238, y6_Anchor_Front = 377;
let x6_ControlA_LeftFront = 226, y6_ControlA_Front = 375;
let x6_ControlB_LeftFront = 214, y6_ControlB_Front = 373;
let x0_Anchor_RightFront = width_Canvas - x0_Anchor_LeftFront;
let x0_ControlA_RightFront = width_Canvas - x0_ControlA_LeftFront;
let x0_ControlB_RightFront = width_Canvas - x0_ControlB_LeftFront;
let x1_Anchor_RightFront = width_Canvas - x1_Anchor_LeftFront;
let x1_ControlA_RightFront = width_Canvas - x1_ControlA_LeftFront;
let x1_ControlB_RightFront = width_Canvas - x1_ControlB_LeftFront;
let x2_Anchor_RightFront = width_Canvas - x2_Anchor_LeftFront;
let x2_ControlA_RightFront = width_Canvas - x2_ControlA_LeftFront;
let x2_ControlB_RightFront = width_Canvas - x2_ControlB_LeftFront;
let x3_Anchor_RightFront = width_Canvas - x3_Anchor_LeftFront;
let x3_ControlA_RightFront = width_Canvas - x3_ControlA_LeftFront;
let x3_ControlB_RightFront = width_Canvas - x3_ControlB_LeftFront;
let x4_Anchor_RightFront = width_Canvas - x4_Anchor_LeftFront;
let x4_ControlA_RightFront = width_Canvas - x4_ControlA_LeftFront;
let x4_ControlB_RightFront = width_Canvas - x4_ControlB_LeftFront;
let x5_Anchor_RightFront = width_Canvas - x5_Anchor_LeftFront;
let x5_ControlA_RightFront = width_Canvas - x5_ControlA_LeftFront;
let x5_ControlB_RightFront = width_Canvas - x5_ControlB_LeftFront;
let x6_Anchor_RightFront = width_Canvas - x6_Anchor_LeftFront;
let x6_ControlA_RightFront = width_Canvas - x6_ControlA_LeftFront;
let x6_ControlB_RightFront = width_Canvas - x6_ControlB_LeftFront;
function setup() { 
createCanvas(400, 400);
} 
function draw() {
background(0);
stroke(239, 193, 6);
strokeWeight(2);
noFill();
shape_Front();
}
function shape_Front() {
fill(239, 193, 6);
noStroke();
beginShape();
vertex(x_Vertex_Front, y_Vertex_Front);
bezierVertex(x0_ControlA_LeftFront, y0_ControlA_Front, x0_ControlB_LeftFront, y0_ControlB_Front, x0_Anchor_LeftFront, y0_Anchor_Front);
bezierVertex(x1_ControlA_LeftFront, y1_ControlA_Front, x1_ControlB_LeftFront, y1_ControlB_Front, x1_Anchor_LeftFront, y1_Anchor_Front);
bezierVertex(x2_ControlA_LeftFront, y2_ControlA_Front, x2_ControlB_LeftFront, y2_ControlB_Front, x2_Anchor_LeftFront, y2_Anchor_Front);
bezierVertex(x3_ControlA_LeftFront, y3_ControlA_Front, x3_ControlB_LeftFront, y3_ControlB_Front, x3_Anchor_LeftFront, y3_Anchor_Front);
bezierVertex(x4_ControlA_LeftFront, y4_ControlA_Front, x4_ControlB_LeftFront, y4_ControlB_Front, x4_Anchor_LeftFront, y4_Anchor_Front);
bezierVertex(x4_ControlA_LeftFront, y4_ControlA_Front, x4_ControlB_LeftFront, y4_ControlB_Front, x4_Anchor_LeftFront, y4_Anchor_Front);
bezierVertex(x5_ControlA_LeftFront, y5_ControlA_Front, x5_ControlB_LeftFront, y5_ControlB_Front, x5_Anchor_LeftFront, y5_Anchor_Front);
bezierVertex(x6_ControlA_LeftFront, y6_ControlA_Front, x6_ControlB_LeftFront, y6_ControlB_Front, x6_Anchor_LeftFront, y6_Anchor_Front);
bezierVertex(x6_ControlA_RightFront, y6_ControlA_Front, x6_ControlB_RightFront, y6_ControlB_Front, x6_Anchor_RightFront, y6_Anchor_Front);
bezierVertex(x5_ControlA_RightFront, y5_ControlA_Front, x5_ControlB_RightFront, y5_ControlB_Front, x5_Anchor_RightFront, y5_Anchor_Front);
bezierVertex(x4_ControlA_RightFront, y4_ControlA_Front, x4_ControlB_RightFront, y4_ControlB_Front, x4_Anchor_RightFront, y4_Anchor_Front);
bezierVertex(x3_ControlA_RightFront, y3_ControlA_Front, x3_ControlB_RightFront, y3_ControlB_Front, x3_Anchor_RightFront, y3_Anchor_Front);
bezierVertex(x2_ControlA_RightFront, y2_ControlA_Front, x2_ControlB_RightFront, y2_ControlB_Front, x2_Anchor_RightFront, y2_Anchor_Front);
bezierVertex(x1_ControlA_RightFront, y1_ControlA_Front, x1_ControlB_RightFront, y1_ControlB_Front, x1_Anchor_RightFront, y1_Anchor_Front);
bezierVertex(x0_ControlA_RightFront, y0_ControlA_Front, x0_ControlB_RightFront, y0_ControlB_Front, x0_Anchor_RightFront, y0_Anchor_Front);
endShape();
}let dots_Front;
let dots_MidF;
let dots_MidR;
let dots_Rear;
let dots_Stem;
let front_Width, front_Height;
let midF_Width, midF_Height;
let midR_Width, midR_Height;
let rear_Width, rear_Height;
let stem_Width, stem_Height;
let pumpDots_Radius, stemDots_Radius;
function setup() { 
createCanvas(400, 400);
dots_Front = new Dots(400, 400);
} 
function draw() { 
background(220);
dotsSection.drawDots();
}
class DotsSection {
constructor(sectionWidth, sectionHeight) {
this.dotsWidth = sectionWidth;
this.dotsHeight = sectionHeight;
}
drawDots() {
for(let i = 0; i < this.dotsWidth; i += 10) {
for(let j = 0; j < this.dotsHeight; j += 10) {
let distance = dist(i, j, this.dotsWidth/2, this.dotsHeight/2);
let radius = map(distance, 0, this.dotsWidth, 10, 0);
ellipse(i, j, radius, radius);
}
}
}
}let bouncer1;
function setup() {
createCanvas(400, 400);
bouncer1 = new Ball(100,100);
}
function draw() {
background(220);
bouncer1.render();
}
class Ball {
constructor(x, y) {
this.x = x;
this.y = y;
this.speed = 0;
this.r = 24;
}
render() {
fill(0);
ellipse(this.x, this.y, this.r, this.r);
}
}
let dots_Front;
let dots_MidF;
let dots_MidR;
let dots_Rear;
let dots_Stem;
let front_Width, front_Height;
let midF_Width, midF_Height;
let midR_Width, midR_Height;
let rear_Width, rear_Height;
let stem_Width, stem_Height;
let pumpDots_Radius, stemDots_Radius;
function setup() { 
createCanvas(400, 400);
dots_Front = new Dots(400, 400);
} 
function draw() { 
background(220);
dotsSection.drawDots();
}
class DotsSection {
constructor(sectionWidth, sectionHeight) {
this.dotsWidth = sectionWidth;
this.dotsHeight = sectionHeight;
}
drawDots() {
for(let i = 0; i < this.dotsWidth; i += 10) {
for(let j = 0; j < this.dotsHeight; j += 10) {
let distance = dist(i, j, this.dotsWidth/2, this.dotsHeight/2);
let radius = map(distance, 0, this.dotsWidth, 10, 0);
ellipse(i, j, radius, radius);
}
}
}
}let dotsSection;
function setup() { 
createCanvas(400, 400);
dotsSection = new DotsSection (200, 200);
} 
function draw() { 
background(220);
dotsSection.drawDots();
}
class DotsSection {
constructor(sectionWidth, sectionHeight) {
this.dotsWidth = sectionWidth;
this.dotsHeight = sectionHeight;
}
drawDots() {
for(let i = 0; i < this.sectionWidth; i += 50) {
for(let j = 0; j < this.sectionHeight; j += 50) {
let distance = dist(i, j, this.sectionWidth/2, this.sectionHeight/2);
let radius = map(distance, 0, this.sectionWidth, 50, 0);
ellipse(i, j, radius, radius);
}
}
}
let gravity = 0.1;
let bouncer;
function setup() {
createCanvas(400, 400);
bouncer = new Ball();
}
function draw() {
background(220);
fill(0);
bouncer.render();
bouncer.update();
}
let width = 510;
let grid;
let pg1;
let pg2;
let xMostLVertex0 = 253;
let xMostLBezierA0 = 191, xMostLBezierA1 = 154, xMostLBezierA2 = 117;
let xMostLBezierB0 = 91, xMostLBezierB1 = 76, xMostLBezierB2 = 61;
let xMostLBezierC0 = 40, xMostLBezierC1 = 34, xMostLBezierC2 = 28;
let xMostLBezierD0 = 26, xMostLBezierD1 = 34, xMostLBezierD2 = 42;
let xMostLVertex1 = 72;
let yMostLVertex0 = 72;
let yMostLBezierA0 = 56, yMostLBezierA1 = 66, yMostLBezierA2 = 76;
let yMostLBezierB0 = 99, yMostLBezierB1 = 117, yMostLBezierB2 = 135;
let yMostLBezierC0 = 168, yMostLBezierC1 = 198, yMostLBezierC2 = 228;
let yMostLBezierD0 = 267, yMostLBezierD1 = 288, yMostLBezierD2 = 309;
let yMostLVertex1 = 305;
let xMoreLVertex0 = 253;
let xMoreLBezierA0 = 195, xMoreLBezierA1 = 170, xMoreLBezierA2 = 145;
let xMoreLBezierB0 = 126, xMoreLBezierB1 = 106, xMoreLBezierB2 = 86;
let xMoreLBezierC0 = 84, xMoreLBezierC1 = 73, xMoreLBezierC2 = 62;
let xMoreLBezierD0 = 56, xMoreLBezierD1 = 66, xMoreLBezierD2 = 76;
let xMoreLBezierE0 = 80, xMoreLBezierE1 = 103, xMoreLBezierE2 = 126;
let xMoreLVertex1 = 171;
let yMoreLVertex0 = 98;
let yMoreLBezierA0 = 87, yMoreLBezierA1 = 95, yMoreLBezierA2 = 103;
let yMoreLBezierB0 = 111, yMoreLBezierB1 = 143, yMoreLBezierB2 = 175;
let yMoreLBezierC0 = 195, yMoreLBezierC1 = 220, yMoreLBezierC2 = 245;
let yMoreLBezierD0 = 290, yMoreLBezierD1 = 313, yMoreLBezierD2 = 336;
let yMoreLBezierE0 = 338, yMoreLBezierE1 = 352, yMoreLBezierE2 = 366;
let yMoreLVertex1 = 341;
let xLVertex0 = 253;
let xLBezierA0 = 231, xLBezierA1 = 210, xLBezierA2 = 189;
let xLBezierB0 = 171, xLBezierB1 = 159, xLBezierB2 = 147;
let xLBezierC0 = 136, xLBezierC1 = 133, xLBezierC2 = 130;
let xLBezierD0 = 121, xLBezierD1 = 121, xLBezierD2 = 121;
let xLBezierE0 = 118, xLBezierE1 = 138, xLBezierE2 = 158;
let xLVertex1 = 203;
let yLVertex0 = 104;
let yLBezierA0 = 101, yLBezierA1 = 110, yLBezierA2 = 119;
let yLBezierB0 = 137, yLBezierB1 = 154, yLBezierB2 = 171;
let yLBezierC0 = 209, yLBezierC1 = 234, yLBezierC2 = 259;
let yLBezierD0 = 280, yLBezierD1 = 301, yLBezierD2 = 314;
let yLBezierE0 = 328, yLBezierE1 = 348, yLBezierE2 = 368;
let yLVertex1 = 359;
let xCenterLVertex0 = 256;
let xCenterLBezierA0 = 240, xCenterLBezierA1 = 231, xCenterLBezierA2 = 222;
let xCenterLBezierB0 = 200, xCenterLBezierB1 = 203, xCenterLBezierB2 = 201;
let xCenterLBezierC0 = 203, xCenterLBezierC1 = 205, xCenterLBezierC2 = 197;
let xCenterLBezierD0 = 180, xCenterLBezierD1 = 184, xCenterLBezierD2 = 183;
let xCenterLBezierE0 = 192, xCenterLBezierE1 = 208, xCenterLBezierE2 = 224;
let xCenterLVertex1 = 256;
let yCenterLVertex0 = 116;
let yCenterLBezierA0 = 113, yCenterLBezierA1 = 118, yCenterLBezierA2 = 123;
let yCenterLBezierB0 = 153, yCenterLBezierB1 = 167, yCenterLBezierB2 = 181;
let yCenterLBezierC0 = 202, yCenterLBezierC1 = 229, yCenterLBezierC2 = 256;
let yCenterLBezierD0 = 294, yCenterLBezierD1 = 311, yCenterLBezierD2 = 328;
let yCenterLBezierE0 = 358, yCenterLBezierE1 = 368, yCenterLBezierE2 = 378;
let yCenterLVertex1 = 376;
let arraySectionMostL = [];
let mostLVertex0, mostLBezierA, mostLBezierB, mostLBezierC, mostLBezierD, mostLVertex1;
let arraySectionMoreL = [];
let moreLVertex0, moreLBezierA, moreLBezierB, moreLBezierC, moreLBezierD, moreLBezierE, moreLVertex1;
let arraySectionLeft = [];
let leftVertex0, leftBezierA, leftBezierB, leftBezierC, leftBezierD, leftBezierE, leftVertex1;
let arraySectionCenterL = [];
let centerLVertex0, centerLBezierA, centerLBezierB, centerLBezierC, centerLBezierD, centerLBezierE, centerLVertex1;
let arraySectionMostR = [];
let mostRVertex0, mostRBezierA, mostRBezierB, mostRBezierC, mostRBezierD, mostRVertex1;
let arraySectionMoreR = [];
let moreRVertex0, moreRBezierA, moreRBezierB, moreRBezierC, moreRBezierD, moreRBezierE, moreRVertex1;
let arraySectionRight = [];
let rightVertex0, rightBezierA, rightBezierB, rightBezierC, rightBezierD, rightBezierE, rightVertex1;
let arraySectionCenterR = [];
let centerRVertex0, centerRBezierA, centerRBezierB, centerRBezierC, centerRBezierD, centerRBezierE, centerRVertex1;
function setup() {
grid = new Array(23);
for (let i = 0; i < grid.length; i++) {
grid[i] = new Array(19);
for (let j = 0; j < grid[i].length; j++) {
grid[i][j] = createVector(i * 24 + random(-5, 5), j * 23 + random(-5, 5));
}
}
pg1 = createGraphics(70, 265);
pg2 = createGraphics(70, 265);
}
function draw() {
background(0);
stroke(239, 193, 6);
strokeWeight(2);
noFill();
for (let i = 0; i < grid.length - 1; i ++){
for (let j = 0; j < grid[i].length - 1; j++){
beginShape();
let pt1 = grid[i][j];
vertex(pt1.x, pt1.y);
let pt2 = grid[i][j+1];
vertex(pt2.x, pt2.y);
let pt3 = grid[i+1][j];
vertex(pt3.x, pt3.y);
endShape(CLOSE);
}
}
SectionDots();
rotateY(PI/4);
texture(pg1);
sectionMostLeft(0, 0);
sectionMoreLeft(0, 0);
sectionLeft(0, 0);
sectionCenterLeft(0, 0);
stemDots();
rotateX(PI/8);
texture(pg2);
sectionMostRight(0, 0);
sectionMoreRight(0, 0);
sectionRight(0, 0);
sectionCenterRight(0, 0);
stem(0, 0);
}
function sectionMostLeft() {
fill(210, 160, 6);
noStroke();
beginShape();
vertex(xMostLVertex0, yMostLVertex0);
mostLVertex0 = createVector(xMostLVertex0, yMostLVertex0);
arraySectionMostL.push(mostLVertex0);
mostLBezierA = createVector(xMostLBezierA2, yMostLBezierA2);
arraySectionMostL.push(mostLBezierA);
bezierVertex(xMostLBezierB0, yMostLBezierB0, xMostLBezierB1, yMostLBezierB1, xMostLBezierB2, yMostLBezierB2);
mostLBezierB = createVector(xMostLBezierB2, yMostLBezierB2);
arraySectionMostL.push(mostLBezierB);
bezierVertex(xMostLBezierC0, yMostLBezierC0, xMostLBezierC1, yMostLBezierC1, xMostLBezierC2, yMostLBezierC2);
mostLBezierC = createVector(xMostLBezierC2, yMostLBezierC2);
arraySectionMostL.push(mostLBezierC);
bezierVertex(xMostLBezierD0, yMostLBezierD0, xMostLBezierD1, yMostLBezierD1, xMostLBezierD2, yMostLBezierD2);
mostLBezierD = createVector(xMostLBezierD2, yMostLBezierD2);
arraySectionMostL.push(mostLBezierD);
vertex(xMostLVertex1, yMostLVertex1);
mostLVertex1 = createVector(xMostLVertex1, yMostLVertex1);
arraySectionMostL.push(mostLVertex1);
endShape();
}
function sectionMoreLeft() {
fill(300, 200, 6);
noStroke();
beginShape();
vertex(xMoreLVertex0, yMoreLVertex0);
moreLVertex0 = createVector(xMoreLVertex0, yMoreLVertex0);
arraySectionMoreL.push(moreLVertex0);
bezierVertex(xMoreLBezierA0, yMoreLBezierA0, xMoreLBezierA1, yMoreLBezierA1, xMoreLBezierA2, yMoreLBezierA2);
moreLBezierA = createVector(xMoreLBezierA2, yMoreLBezierA2);
arraySectionMoreL.push(moreLBezierA);
bezierVertex(xMoreLBezierB0, yMoreLBezierB0, xMoreLBezierB1, yMoreLBezierB1, xMoreLBezierB2, yMoreLBezierB2);
moreLBezierB = createVector(xMoreLBezierB2, yMoreLBezierB2);
arraySectionMoreL.push(moreLBezierB);
bezierVertex(xMoreLBezierC0, yMoreLBezierC0, xMoreLBezierC1, yMoreLBezierC1, xMoreLBezierC0, yMoreLBezierC0);
moreLBezierC = createVector(xMoreLBezierC2, yMoreLBezierC2);
arraySectionMoreL.push(moreLBezierC);
bezierVertex(xMoreLBezierD0, yMoreLBezierD0, xMoreLBezierD1, yMoreLBezierD1, xMoreLBezierD2, yMoreLBezierD2);
moreLBezierD = createVector(xMoreLBezierD2, yMoreLBezierD2);
arraySectionMoreL.push(moreLBezierD);
bezierVertex(xMoreLBezierE0, yMoreLBezierE0, xMoreLBezierE1, yMoreLBezierE1, xMoreLBezierE2, yMoreLBezierE2);
moreLBezierE = createVector(xMoreLBezierE2, yMoreLBezierE2);
arraySectionMoreL.push(moreLBezierE);
vertex(xMoreLVertex1, yMoreLVertex1);
moreLVertex1 = createVector(xMoreLVertex1, yMoreLVertex1);
arraySectionMoreL.push(moreLVertex1);
endShape();
}
function sectionLeft() {
fill(239, 250, 6);
noStroke();
beginShape();
vertex(xLVertex0, yLVertex0);
leftVertex0 = createVector(xLVertex0, yLVertex0);
arraySectionLeft.push(leftVertex0);
bezierVertex(xLBezierA0, yLBezierA0, xLBezierA1, yLBezierA1, xLBezierA2, yLBezierA2);
leftBezierA = createVector(xLBezierA2, yLBezierA2);
arraySectionLeft.push(leftBezierA);
bezierVertex(xLBezierB0, yLBezierB0, xLBezierB1, yLBezierB1, xLBezierB2, yLBezierB2);
leftBezierB = createVector(xLBezierB2, yLBezierB2);
arraySectionLeft.push(leftBezierB);
bezierVertex(xLBezierC0, yLBezierC0, xLBezierC1, yLBezierC1, xLBezierC2, yLBezierC2);
leftBezierC = createVector(xLBezierC2, yLBezierC2);
arraySectionLeft.push(leftBezierC);
bezierVertex(xLBezierD0, yLBezierD0, xLBezierD1, yLBezierD1, xLBezierD2, yLBezierD2);
leftBezierD = createVector(xLBezierD2, yLBezierD2);
arraySectionLeft.push(leftBezierD);
bezierVertex(xLBezierE0, yLBezierE0, xLBezierE1, yLBezierE1, xLBezierE2, yLBezierE2);
leftBezierE = createVector(xLBezierE2, yLBezierE2);
arraySectionLeft.push(leftBezierE);
vertex(xLVertex1, yLVertex1);
leftVertex1 = createVector(xLVertex1, yLVertex1);
arraySectionLeft.push(leftVertex1);
endShape();
}
function sectionCenterLeft() {
fill(239, 193, 6);
noStroke();
beginShape();
vertex(xCenterLVertex0, yCenterLVertex0);
centerLVertex0 = createVector(xCenterLVertex0, yCenterLVertex0);
arraySectionCenterL.push(centerLVertex0);
bezierVertex(xCenterLBezierA0, yCenterLBezierA0, xCenterLBezierA1, yCenterLBezierA1, xCenterLBezierA2, yCenterLBezierA2);
centerLBezierA = createVector(xCenterLBezierA2, yCenterLBezierA2);
arraySectionCenterL.push(centerLBezierA);
bezierVertex(xCenterLBezierB0, yCenterLBezierB0, xCenterLBezierB1, yCenterLBezierB1, xCenterLBezierB2, yCenterLBezierB2);
centerLBezierB = createVector(xCenterLBezierB2, yCenterLBezierB2);
arraySectionCenterL.push(centerLBezierB);
bezierVertex(xCenterLBezierC0, yCenterLBezierC0, xCenterLBezierC1, yCenterLBezierC1, xCenterLBezierC2, yCenterLBezierC2);
centerLBezierC = createVector(xCenterLBezierC2, yCenterLBezierC2);
arraySectionCenterL.push(centerLBezierC);
bezierVertex(xCenterLBezierD0, yCenterLBezierD0, xCenterLBezierD1, yCenterLBezierD1, xCenterLBezierD2, yCenterLBezierD2);
centerLBezierD = createVector(xCenterLBezierD2, yCenterLBezierD2);
arraySectionCenterL.push(centerLBezierD);
bezierVertex(xCenterLBezierE0, yCenterLBezierE0, xCenterLBezierE1, yCenterLBezierE1, xCenterLBezierE2, yCenterLBezierE2);
centerLBezierE = createVector(xCenterLBezierE2, yCenterLBezierE2);
arraySectionCenterL.push(centerLBezierE);
vertex(xCenterLVertex1, yCenterLVertex1);
centerLVertex1 = createVector(xCenterLVertex1, yCenterLVertex1);
arraySectionCenterL.push(centerLVertex1);
endShape();
}
function sectionMostRight() {
fill(210, 160, 6);
noStroke();
beginShape();
vertex(width - xMostLVertex0, yMostLVertex0);
mostRVertex0 = createVector(width - xMostLVertex0, yMostLVertex0);
arraySectionMostR.push(mostRVertex0);
mostRBezierA = createVector(width - xMostLBezierA2, yMostLBezierA2);
arraySectionMostR.push(mostRBezierA);
bezierVertex(width - xMostLBezierB0, yMostLBezierB0, width - xMostLBezierB1, yMostLBezierB1, width - xMostLBezierB2, yMostLBezierB2);
mostRBezierB = createVector(width - xMostLBezierB2, yMostLBezierB2);
arraySectionMostR.push(mostRBezierB);
bezierVertex(width - xMostLBezierC0, yMostLBezierC0, width - xMostLBezierC1, yMostLBezierC1, width - xMostLBezierC2, yMostLBezierC2);
mostRBezierC = createVector(width - xMostLBezierC2, yMostLBezierC2);
arraySectionMostR.push(mostRBezierC);
bezierVertex(width - xMostLBezierD0, yMostLBezierD0, width - xMostLBezierD1, yMostLBezierD1, width - xMostLBezierD2, yMostLBezierD2);
mostRBezierD = createVector(width - xMostLBezierD2, yMostLBezierD2);
arraySectionMostR.push(mostRBezierD);
vertex(width - xMostLVertex1, yMostLVertex1);
mostRVertex1 = createVector(width - xMostLVertex1, yMostLVertex1);
arraySectionMostR.push(mostRVertex1);
endShape();
}
function sectionMoreRight() {
fill(300, 200, 6);
noStroke();
beginShape();
vertex(width - xMoreLVertex0, yMoreLVertex0);
moreRVertex0 = createVector(width - xMoreLVertex0, yMoreLVertex0);
arraySectionMoreR.push(moreRVertex0);
bezierVertex(width - xMoreLBezierA0, yMoreLBezierA0, width - xMoreLBezierA1, yMoreLBezierA1, width - xMoreLBezierA2, yMoreLBezierA2);
moreRBezierA = createVector(width - xMoreLBezierA2, yMoreLBezierA2);
arraySectionMoreR.push(moreRBezierA);
bezierVertex(width - xMoreLBezierB0, yMoreLBezierB0, width - xMoreLBezierB1, yMoreLBezierB1, width - xMoreLBezierB2, yMoreLBezierB2);
moreRBezierB = createVector(width - xMoreLBezierB2, yMoreLBezierB2);
arraySectionMoreR.push(moreRBezierB);
bezierVertex(width - xMoreLBezierC0, yMoreLBezierC0, width - xMoreLBezierC1, yMoreLBezierC1, width - xMoreLBezierC0, yMoreLBezierC0);
moreRBezierC = createVector(width - xMoreLBezierC2, yMoreLBezierC2);
arraySectionMoreR.push(moreRBezierC);
bezierVertex(width - xMoreLBezierD0, yMoreLBezierD0, width - xMoreLBezierD1, yMoreLBezierD1, width - xMoreLBezierD2, yMoreLBezierD2);
moreRBezierD = createVector(width - xMoreLBezierD2, yMoreLBezierD2);
arraySectionMoreR.push(moreRBezierD);
bezierVertex(width - xMoreLBezierE0, yMoreLBezierE0, width - xMoreLBezierE1, yMoreLBezierE1, width - xMoreLBezierE2, yMoreLBezierE2);
moreRBezierE = createVector(width - xMoreLBezierE2, yMoreLBezierE2);
arraySectionMoreR.push(moreRBezierE);
vertex(width - xMoreLVertex1, yMoreLVertex1);
moreRVertex1 = createVector(width - xMoreLVertex1, yMoreLVertex1);
arraySectionMoreR.push(moreRVertex1);
endShape();
}
function sectionRight() {
fill(239, 250, 6);
noStroke();
beginShape();
vertex(xLVertex0, yLVertex0);
rightVertex0 = createVector(width - xLVertex0, yLVertex0);
arraySectionRight.push(rightVertex0);
bezierVertex(width - xLBezierA0, yLBezierA0, width - xLBezierA1, yLBezierA1, width - xLBezierA2, yLBezierA2);
rightBezierA = createVector(width - xLBezierA2, yLBezierA2);
arraySectionRight.push(rightBezierA);
bezierVertex(width - xLBezierB0, yLBezierB0, width - xLBezierB1, yLBezierB1, width - xLBezierB2, yLBezierB2);
rightBezierB = createVector(width - xLBezierB2, yLBezierB2);
arraySectionRight.push(rightBezierB);
bezierVertex(width - xLBezierC0, yLBezierC0, width - xLBezierC1, yLBezierC1, width - xLBezierC2, yLBezierC2);
rightBezierC = createVector(width - xLBezierC2, yLBezierC2);
arraySectionRight.push(rightBezierC);
bezierVertex(width - xLBezierD0, yLBezierD0, width - xLBezierD1, yLBezierD1, width - xLBezierD2, yLBezierD2);
rightBezierD = createVector(width - xLBezierD2, yLBezierD2);
arraySectionRight.push(rightBezierD);
bezierVertex(width - xLBezierE0, yLBezierE0, width - xLBezierE1, yLBezierE1, width - xLBezierE2, yLBezierE2);
rightBezierE = createVector(width - xLBezierE2, yLBezierE2);
arraySectionRight.push(rightBezierE);
vertex(width - xLVertex1, yLVertex1);
rightVertex1 = createVector(width - xLVertex1, yLVertex1);
arraySectionRight.push(rightVertex1);
endShape();
}
function sectionCenterRight() {
fill(239, 193, 6);
noStroke();
beginShape();
vertex(width - xCenterLVertex0, yCenterLVertex0);
centerRVertex0 = createVector(width - xCenterLVertex0, yCenterLVertex0);
arraySectionCenterR.push(centerRVertex0);
bezierVertex(width - xCenterLBezierA0, yCenterLBezierA0, width - xCenterLBezierA1, yCenterLBezierA1, width - xCenterLBezierA2, yCenterLBezierA2);
centerRBezierA = createVector(width - xCenterLBezierA2, yCenterLBezierA2);
arraySectionCenterR.push(centerRBezierA);
bezierVertex(width - xCenterLBezierB0, yCenterLBezierB0, width - xCenterLBezierB1, yCenterLBezierB1, width - xCenterLBezierB2, yCenterLBezierB2);
centerRBezierB = createVector(width - xCenterLBezierB2, yCenterLBezierB2);
arraySectionCenterR.push(centerRBezierB);
bezierVertex(width - xCenterLBezierC0, yCenterLBezierC0, width - xCenterLBezierC1, yCenterLBezierC1, width - xCenterLBezierC2, yCenterLBezierC2);
centerRBezierC = createVector(width - xCenterLBezierC2, yCenterLBezierC2);
arraySectionCenterR.push(centerRBezierC);
bezierVertex(width - xCenterLBezierD0, yCenterLBezierD0, width - xCenterLBezierD1, yCenterLBezierD1, width - xCenterLBezierD2, yCenterLBezierD2);
centerRBezierD = createVector(width - xCenterLBezierD2, yCenterLBezierD2);
arraySectionCenterR.push(centerRBezierD);
bezierVertex(width - xCenterLBezierE0, yCenterLBezierE0, width - xCenterLBezierE1, yCenterLBezierE1, width - xCenterLBezierE2, yCenterLBezierE2);
centerRBezierE = createVector(width - xCenterLBezierE2, yCenterLBezierE2);
arraySectionCenterR.push(centerRBezierE);
vertex(width - xCenterLVertex1, yCenterLVertex1);
centerRVertex1 = createVector(width - xCenterLVertex1, yCenterLVertex1);
arraySectionCenterR.push(centerRVertex1);
endShape();
}
function stem(){
fill(0);
noStroke();
ellipse(260, 100, 80, 44);
beginShape();
vertex(207, 8);
bezierVertex(250, 0, 234, 18, 219, 11);
bezierVertex(256, 33, 261, 42, 266, 50);
vertex(264, 90);
vertex(242, 90);
bezierVertex(220, 39, 228, 44, 235, 50);
bezierVertex(188, 12, 192, 31);
endShape()
}
function sectionDots(){
noStroke();
fill(0);
for (let h = 0; h < height; h++) {
for (let w = 0; w < width; w++) {
pg1.ellipse(w * 15, h * 15, 14, 14);
}
}
return(pg1);
}
function stemDots(){
noStroke();
fill(239, 193, 6);
for (let h = 0; h < height; h++) {
for (let w = 0; w < width; w++) {
pg2.ellipse(w * 8, h * 8, 7, 7);
}
}
}
function sectionDots() {
noStroke ();
fill(0);
for (let h = 0; h < height; h++) {
}
}
let xCenterLVertex0 = 256;
let xCenterLBezierA0 = 240, xCenterLBezierA1 = 231, xCenterLBezierA2 = 222;
let xCenterLBezierB0 = 200, xCenterLBezierB1 = 203, xCenterLBezierB2 = 201;
let xCenterLBezierC0 = 203, xCenterLBezierC1 = 205, xCenterLBezierC2 = 197;
let xCenterLBezierD0 = 180, xCenterLBezierD1 = 184, xCenterLBezierD2 = 183;
let xCenterLBezierE0 = 192, xCenterLBezierE1 = 208, xCenterLBezierE2 = 224;
let xCenterLVertex1 = 256;
let yCenterLVertex0 = 116;
let yCenterLBezierA0 = 113, yCenterLBezierA1 = 118, yCenterLBezierA2 = 123;
let yCenterLBezierB0 = 153, yCenterLBezierB1 = 167, yCenterLBezierB2 = 181;
let yCenterLBezierC0 = 202, yCenterLBezierC1 = 229, yCenterLBezierC2 = 256;
let yCenterLBezierD0 = 294, yCenterLBezierD1 = 311, yCenterLBezierD2 = 328;
let yCenterLBezierE0 = 358, yCenterLBezierE1 = 368, yCenterLBezierE2 = 378;
let yCenterLVertex1 = 376;
let arrayRindCenterL = [];
let centerLVertex0, centerLBezierA, centerLBezierB, centerLBezierC, centerLBezierD, centerLBezierE, centerLVertex1;
function setup() {
centerLVertex0 = createVector(xCenterLVertex0, yCenterLVertex0);
arrayRindCenterL.push(centerLVertex0);
centerLBezierA = createVector(xCenterLBezierA2, yCenterLBezierA2);
arrayRindCenterL.push(centerLBezierA);
centerLBezierB = createVector(xCenterLBezierB2, yCenterLBezierB2);
arrayRindCenterL.push(centerLBezierB);
centerLBezierC = createVector(xCenterLBezierC2, yCenterLBezierC2);
arrayRindCenterL.push(centerLBezierC);
centerLBezierD = createVector(xCenterLBezierD2, yCenterLBezierD2);
arrayRindCenterL.push(centerLBezierD);
centerLBezierE = createVector(xCenterLBezierE2, yCenterLBezierE2);
arrayRindCenterL.push(centerLBezierE);
centerLVertex1 = createVector(xCenterLVertex1, yCenterLVertex1);
arrayRindCenterL.push(centerLVertex1);
}
function draw() {
background(255);
stroke(239, 193, 6);
strokeWeight(2);
rindDots();
rotateY(PI/4);
texture(pg1);
rindCenterLeft();
dots();
}
function rindCenterLeft() {
fill(239, 193, 6);
noStroke();
beginShape();
vertex(xCenterLVertex0, yCenterLVertex0);
bezierVertex(xCenterLBezierA0, yCenterLBezierA0, xCenterLBezierA1, yCenterLBezierA1, xCenterLBezierA2, yCenterLBezierA2);
bezierVertex(xCenterLBezierB0, yCenterLBezierB0, xCenterLBezierB1, yCenterLBezierB1, xCenterLBezierB2, yCenterLBezierB2);
bezierVertex(xCenterLBezierC0, yCenterLBezierC0, xCenterLBezierC1, yCenterLBezierC1, xCenterLBezierC2, yCenterLBezierC2);
bezierVertex(xCenterLBezierD0, yCenterLBezierD0, xCenterLBezierD1, yCenterLBezierD1, xCenterLBezierD2, yCenterLBezierD2);
bezierVertex(xCenterLBezierE0, yCenterLBezierE0, xCenterLBezierE1, yCenterLBezierE1, xCenterLBezierE2, yCenterLBezierE2);
vertex(xCenterLVertex1, yCenterLVertex1);
endShape();
}
function dots() {
let size = 5;
const vector0 = arrayRindCenterL[0];
const vertices = arrayRindCenterL.length - 1;
const lastY = arrayRindCenterL[vertices].y;
const lastX = vector0.x;
for (let i = 1; i < 2; i++) {
const vector1 = arrayRindCenterL[i - 1];
const vector2 = arrayRindCenterL[vertices];
let height = 10;
let yPos = vector0.y;
let xPos = vector1.x;
for (let m = vector1.y; m < vector2.y; m += size*2) {
fill(0);
ellipse(xPos + size, m, size + 2, size + 2);
}
}
}
let arrayRindMostLeft;
let arrayRindMoreLeft;
let arrayRindLeft;
let arrayRindCenterL;
let arrayRindMostRight;
let arrayRindMoreRight;
let arrayRindRight;
let arrayRindCenterR;
let grid;
let width = 510;
let xMostLVertex0 = 253;
let xMostLBezierA0 = 191, xMostLBezierA1 = 154, xMostLBezierA2 = 117;
let xMostLBezierB0 = 91, xMostLBezierB1 = 76, xMostLBezierB2 = 61;
let xMostLBezierC0 = 40, xMostLBezierC1 = 34, xMostLBezierC2 = 28;
let xMostLBezierD0 = 26, xMostLBezierD1 = 34, xMostLBezierD2 = 42;
let xMostLVertex1 = 72;
let xMoreLVertex0 = 253;
let xMoreLBezierA0 = 195, xMoreLBezierA1 = 170, xMoreLBezierA2 = 145;
let xMoreLBezierB0 = 126, xMoreLBezierB1 = 106, xMoreLBezierB2 = 86;
let xMoreLBezierC0 = 84, xMoreLBezierC1 = 73, xMoreLBezierC2 = 62;
let xMoreLBezierD0 = 56, xMoreLBezierD1 = 66, xMoreLBezierD2 = 76;
let xMoreLBezierE0 = 80, xMoreLBezierE1 = 103, xMoreLBezierE2 = 126;
let xMoreLVertex1 = 171;
let xLVertex0 = 253;
let xLBezierA0 = 231, xLBezierA1 = 210, xLBezierA2 = 189;
let xLBezierB0 = 171, xLBezierB1 = 159, xLBezierB2 = 147;
let xLBezierC0 = 136, xLBezierC1 = 133, xLBezierC2 = 130;
let xLBezierD0 = 121, xLBezierD1 = 121, xLBezierD2 = 121;
let xLBezierE0 = 118, xLBezierE1 = 138, xLBezierE2 = 158;
let xLVertex1 = 203;
let xCenterLVertex0 = 256;
let xCenterLBezierA0 = 240, xCenterLBezierA1 = 231, xCenterLBezierA2 = 222;
let xCenterLBezierB0 = 200, xCenterLBezierB1 = 203, xCenterLBezierB2 = 201;
let xCenterLBezierC0 = 203, xCenterLBezierC1 = 205, xCenterLBezierC2 = 197;
let xCenterLBezierD0 = 180, xCenterLBezierD1 = 184, xCenterLBezierD2 = 183;
let xCenterLBezierE0 = 192, xCenterLBezierE1 = 208, xCenterLBezierE2 = 224;
let xCenterLVertex1 = 256;
function setup() {
createCanvas(width, 412);
grid = new Array(23);
for (let i = 0; i < grid.length; i++) {
grid[i] = new Array(19);
for (let j = 0; j < grid[i].length; j++) {
grid[i][j] = createVector(i * 24 + random(-5, 5), j * 23 + random(-5, 5));
}
}
}
function draw() {
background(0);
strokeWeight(2);
noFill();
for (let i = 0; i < grid.length - 1; i ++){
for (let j = 0; j < grid[i].length - 1; j++){
beginShape();
let pt1 = grid[i][j];
vertex(pt1.x, pt1.y);
let pt2 = grid[i][j+1];
vertex(pt2.x, pt2.y);
let pt3 = grid[i+1][j];
vertex(pt3.x, pt3.y);
endShape(CLOSE);
}
}
rindMostLeft(0, 0);
rindMoreLeft(0, 0);
rindLeft(0, 0);
rindCenterLeft(0, 0);
rindMostRight(0, 0);
rindMoreRight(0, 0);
rindRight(0, 0);
rindCenterRight(0, 0);
stem(0, 0);
}
function rindMostLeft() {
fill(210, 160, 6);
noStroke();
beginShape();
vertex(xMostLVertex0, 72);
bezierVertex(xMostLBezierA0, 56, xMostLBezierA1, 66, xMostLBezierA2, 76);
bezierVertex(xMostLBezierB0, 99, xMostLBezierB1, 117, xMostLBezierB2, 135);
bezierVertex(xMostLBezierC0, 168, xMostLBezierC1, 198, xMostLBezierC2, 228);
bezierVertex(xMostLBezierD0, 267, xMostLBezierD1, 288, xMostLBezierD2, 309);
vertex(xMostLVertex1, 305);
endShape();
}
function rindMoreLeft() {
fill(300, 200, 6);
noStroke();
beginShape();
vertex(xMoreLVertex0, 98);
bezierVertex(xMoreLBezierA0, 87, xMoreLBezierA1, 95, xMoreLBezierA2, 103);
bezierVertex(xMoreLBezierB0, 111, xMoreLBezierB1, 143, xMoreLBezierB2, 175);
bezierVertex(xMoreLBezierC0, 195, xMoreLBezierC1, 220, xMoreLBezierC2, 245);
bezierVertex(xMoreLBezierD0, 290, xMoreLBezierD1, 313, xMoreLBezierD2, 336);
bezierVertex(xMoreLBezierE0, 338, xMoreLBezierE1, 352, xMoreLBezierE2, 366);
vertex(xMoreLVertex1, 341);
endShape();
}
function rindLeft() {
fill(239, 250, 6);
noStroke();
beginShape();
vertex(xLVertex0, 104);
bezierVertex(xLBezierB0, 137, xLBezierB1, 154, xLBezierB2, 171);
bezierVertex(xLBezierC0, 209, xLBezierC1, 234, xLBezierC2, 259);
bezierVertex(xLBezierD0, 280, xLBezierD1, 301, xLBezierD2, 314);
bezierVertex(xLBezierE0, 328, xLBezierE1, 348, xLBezierE2, 368);
vertex(xLVertex1, 359);
endShape();
}
function rindCenterLeft() {
fill(239, 193, 6);
noStroke();
beginShape();
vertex(xCenterLVertex0, 116);
bezierVertex(xCenterLBezierA0, 113, xCenterLBezierA1, 118, xCenterLBezierA2, 123);
bezierVertex(xCenterLBezierB0, 153, xCenterLBezierB1, 167, xCenterLBezierB2, 181);
bezierVertex(xCenterLBezierC0, 202, xCenterLBezierC1, 229, xCenterLBezierC2, 256);
bezierVertex(xCenterLBezierD0, 294, xCenterLBezierD1, 311, xCenterLBezierD2, 328);
bezierVertex(xCenterLBezierE0, 358, xCenterLBezierE1, 368, xCenterLBezierE2, 378);
vertex(xCenterLVertex1, 376);
endShape();
}
function rindMostRight() {
fill(210, 160, 6);
noStroke();
beginShape();
vertex(width - xMostLVertex0, 72);
bezierVertex(width - xMostLBezierA0, 56, width - xMostLBezierA1, 66, width - xMostLBezierA2, 76);
bezierVertex(width - xMostLBezierB0, 99, width - xMostLBezierB1, 117, width - xMostLBezierB2, 135);
bezierVertex(width - xMostLBezierC0, 168, width - xMostLBezierC1, 198, width - xMostLBezierC2, 228);
bezierVertex(width - xMostLBezierD0, 267, width - xMostLBezierD1, 288, width - xMostLBezierD2, 309);
vertex(width - xMostLVertex1, 305);
endShape();
}
function rindMoreRight() {
fill(300, 200, 6);
noStroke();
beginShape();
vertex(width - xMoreLVertex0, 98);
bezierVertex(width - xMoreLBezierA0, 87, width - xMoreLBezierA1, 95, width - xMoreLBezierA2, 103);
bezierVertex(width - xMoreLBezierB0, 111, width - xMoreLBezierB1, 143, width - xMoreLBezierB2, 175);
bezierVertex(width - xMoreLBezierC0, 195, width - xMoreLBezierC1, 220, width - xMoreLBezierC2, 245);
bezierVertex(width - xMoreLBezierD0, 290, width - xMoreLBezierD1, 313, width - xMoreLBezierD2, 336);
bezierVertex(width - xMoreLBezierE0, 338, width - xMoreLBezierE1, 352, width - xMoreLBezierE2, 366);
vertex(width - xMoreLVertex1, 341);
endShape();
}
function rindRight() {
fill(239, 250, 6);
noStroke();
beginShape();
vertex(width - xLVertex0, 104);
bezierVertex(width - xLBezierB0, 137, width - xLBezierB1, 154, width - xLBezierB2, 171);
bezierVertex(width - xLBezierC0, 209, width - xLBezierC1, 234, width - xLBezierC2, 259);
bezierVertex(width - xLBezierD0, 280, width - xLBezierD1, 301, width - xLBezierD2, 314);
bezierVertex(width - xLBezierE0, 328, width - xLBezierE1, 348, width - xLBezierE2, 368);
vertex(width - xLVertex1, 359);
endShape();
}
function rindCenterRight() {
fill(239, 193, 6);
noStroke();
beginShape();
vertex(width - xCenterLVertex0, 116);
bezierVertex(width - xCenterLBezierA0, 113, width - xCenterLBezierA1, 118, width - xCenterLBezierA2, 123);
bezierVertex(width - xCenterLBezierB0, 153, width - xCenterLBezierB1, 167, width - xCenterLBezierB2, 181);
bezierVertex(width - xCenterLBezierC0, 202, width - xCenterLBezierC1, 229, width - xCenterLBezierC2, 256);
bezierVertex(width - xCenterLBezierD0, 294, width - xCenterLBezierD1, 311, width - xCenterLBezierD2, 328);
bezierVertex(width - xCenterLBezierE0, 358, width - xCenterLBezierE1, 368, width - xCenterLBezierE2, 378);
vertex(width - xCenterLVertex1, 376);
endShape();
}
function stem(){
fill(0);
noStroke();
ellipse(260, 100, 80, 44);
beginShape();
vertex(207, 8);
bezierVertex(250, 0, 234, 18, 219, 11);
bezierVertex(256, 33, 261, 42, 266, 50);
vertex(264, 90);
vertex(242, 90);
bezierVertex(220, 39, 228, 44, 235, 50);
bezierVertex(188, 12, 192, 31);
endShape()
}function rindMostLeft() {
fill(210, 160, 6);
noStroke();
beginShape();
vertex(xMostLVertex0, yMostLVertex0);
bezierVertex(xMostLBezierB0, yMostLBezierB0, xMostLBezierB1, yMostLBezierB1, xMostLBezierB2, yMostLBezierB2);
bezierVertex(xMostLBezierC0, yMostLBezierC0, xMostLBezierC1, yMostLBezierC1, xMostLBezierC2, yMostLBezierC2);
bezierVertex(xMostLBezierD0, yMostLBezierD0, xMostLBezierD1, yMostLBezierD1, xMostLBezierD2, yMostLBezierD2);
vertex(xMostLVertex1, yMostLVertex1);
endShape();
}
function rindMoreLeft() {
fill(300, 200, 6);
noStroke();
beginShape();
vertex(xMoreLVertex0, yMoreLVertex0);
bezierVertex(xMoreLBezierA0, yMoreLBezierA0, xMoreLBezierA1, yMoreLBezierA1, xMoreLBezierA2, yMoreLBezierA2);
bezierVertex(xMoreLBezierB0, yMoreLBezierB0, xMoreLBezierB1, yMoreLBezierB1, xMoreLBezierB2, yMoreLBezierB2);
bezierVertex(xMoreLBezierC0, yMoreLBezierC0, xMoreLBezierC1, yMoreLBezierC1, xMoreLBezierC0, yMoreLBezierC0);
bezierVertex(xMoreLBezierD0, yMoreLBezierD0, xMoreLBezierD1, yMoreLBezierD1, xMoreLBezierD2, yMoreLBezierD2);
bezierVertex(xMoreLBezierE0, yMoreLBezierE0, xMoreLBezierE1, yMoreLBezierE1, xMoreLBezierE2, yMoreLBezierE2);
vertex(xMoreLVertex1, yMoreLVertex1);
endShape();
}
function rindLeft() {
fill(239, 250, 6);
noStroke();
beginShape();
vertex(xLVertex0, yLVertex0);
bezierVertex(xLBezierA0, yLBezierA0, xLBezierA1, yLBezierA1, xLBezierA2, yLBezierA2);
bezierVertex(xLBezierB0, yLBezierB0, xLBezierB1, yLBezierB1, xLBezierB2, yLBezierB2);
bezierVertex(xLBezierC0, yLBezierC0, xLBezierC1, yLBezierC1, xLBezierC2, yLBezierC2);
bezierVertex(xLBezierD0, yLBezierD0, xLBezierD1, yLBezierD1, xLBezierD2, yLBezierD2);
bezierVertex(xLBezierE0, yLBezierE0, xLBezierE1, yLBezierE1, xLBezierE2, yLBezierE2);
vertex(xLVertex1, yLVertex1);
endShape();
}
function rindCenterLeft() {
fill(239, 193, 6);
noStroke();
beginShape();
vertex(xCenterLVertex0, yCenterLVertex0);
bezierVertex(xCenterLBezierA0, yCenterLBezierA0, xCenterLBezierA1, yCenterLBezierA1, xCenterLBezierA2, yCenterLBezierA2);
bezierVertex(xCenterLBezierB0, yCenterLBezierB0, xCenterLBezierB1, yCenterLBezierB1, xCenterLBezierB2, yCenterLBezierB2);
bezierVertex(xCenterLBezierC0, yCenterLBezierC0, xCenterLBezierC1, yCenterLBezierC1, xCenterLBezierC2, yCenterLBezierC2);
bezierVertex(xCenterLBezierD0, yCenterLBezierD0, xCenterLBezierD1, yCenterLBezierD1, xCenterLBezierD2, yCenterLBezierD2);
bezierVertex(xCenterLBezierE0, yCenterLBezierE0, xCenterLBezierE1, yCenterLBezierE1, xCenterLBezierE2, yCenterLBezierE2);
vertex(xCenterLVertex1, yCenterLVertex1);
endShape();
}
let grid;
let pg1;
let pg2;
let width = 510;
let xMostLVertex0 = 253;
let xMostLBezierA0 = 191, xMostLBezierA1 = 154, xMostLBezierA2 = 117;
let xMostLBezierB0 = 91, xMostLBezierB1 = 76, xMostLBezierB2 = 61;
let xMostLBezierC0 = 40, xMostLBezierC1 = 34, xMostLBezierC2 = 28;
let xMostLBezierD0 = 26, xMostLBezierD1 = 34, xMostLBezierD2 = 42;
let xMostLVertex1 = 72;
let xMoreLVertex0 = 253;
let xMoreLBezierA0 = 195, xMoreLBezierA1 = 170, xMoreLBezierA2 = 145;
let xMoreLBezierB0 = 126, xMoreLBezierB1 = 106, xMoreLBezierB2 = 86;
let xMoreLBezierC0 = 84, xMoreLBezierC1 = 73, xMoreLBezierC2 = 62;
let xMoreLBezierD0 = 56, xMoreLBezierD1 = 66, xMoreLBezierD2 = 76;
let xMoreLBezierE0 = 80, xMoreLBezierE1 = 103, xMoreLBezierE2 = 126;
let xMoreLVertex1 = 171;
let xLVertex0 = 253;
let xLBezierA0 = 231, xLBezierA1 = 210, xLBezierA2 = 189;
let xLBezierB0 = 171, xLBezierB1 = 159, xLBezierB2 = 147;
let xLBezierC0 = 136, xLBezierC1 = 133, xLBezierC2 = 130;
let xLBezierD0 = 121, xLBezierD1 = 121, xLBezierD2 = 121;
let xLBezierE0 = 118, xLBezierE1 = 138, xLBezierE2 = 158;
let xLVertex1 = 203;
let xCenterLVertex0 = 256;
let xCenterLBezierA0 = 240, xCenterLBezierA1 = 231, xCenterLBezierA2 = 222;
let xCenterLBezierB0 = 200, xCenterLBezierB1 = 203, xCenterLBezierB2 = 201;
let xCenterLBezierC0 = 203, xCenterLBezierC1 = 205, xCenterLBezierC2 = 197;
let xCenterLBezierD0 = 180, xCenterLBezierD1 = 184, xCenterLBezierD2 = 183;
let xCenterLBezierE0 = 192, xCenterLBezierE1 = 208, xCenterLBezierE2 = 224;
let xCenterLVertex1 = 256;
function setup() {
createCanvas(width, 412);
pg1 = createGraphics(70, 265);
pg2 = createGraphics(70, 265);
grid = new Array(23);
for (let i = 0; i < grid.length; i++) {
grid[i] = new Array(19);
for (let j = 0; j < grid[i].length; j++) {
grid[i][j] = createVector(i * 24 + random(-5, 5), j * 23 + random(-5, 5));
}
}
}
function draw() {
background(0);
stroke(239, 193, 6);
strokeWeight(2);
noFill();
for (let i = 0; i < grid.length - 1; i ++){
for (let j = 0; j < grid[i].length - 1; j++){
beginShape();
let pt1 = grid[i][j];
vertex(pt1.x, pt1.y);
let pt2 = grid[i][j+1];
vertex(pt2.x, pt2.y);
let pt3 = grid[i+1][j];
vertex(pt3.x, pt3.y);
endShape(CLOSE);
}
}
rindDots();
console.log(pg1);
texture(pg1);
plane(200);
rindMostLeft(0, 0);
rindMoreLeft(0, 0);
rindLeft(0, 0);
rindCenterLeft(0, 0);
texture(stemDots);
rindMostRight(0, 0);
rindMoreRight(0, 0);
rindRight(0, 0);
rindCenterRight(0, 0);
stem(0, 0);
}
function rindMostLeft() {
fill(210, 160, 6);
noStroke();
beginShape();
vertex(xMostLVertex0, 72);
bezierVertex(xMostLBezierA0, 56, xMostLBezierA1, 66, xMostLBezierA2, 76);
bezierVertex(xMostLBezierB0, 99, xMostLBezierB1, 117, xMostLBezierB2, 135);
bezierVertex(xMostLBezierC0, 168, xMostLBezierC1, 198, xMostLBezierC2, 228);
bezierVertex(xMostLBezierD0, 267, xMostLBezierD1, 288, xMostLBezierD2, 309);
vertex(xMostLVertex1, 305);
endShape();
}
function rindMoreLeft() {
fill(300, 200, 6);
noStroke();
beginShape();
vertex(xMoreLVertex0, 98);
bezierVertex(xMoreLBezierA0, 87, xMoreLBezierA1, 95, xMoreLBezierA2, 103);
bezierVertex(xMoreLBezierB0, 111, xMoreLBezierB1, 143, xMoreLBezierB2, 175);
bezierVertex(xMoreLBezierC0, 195, xMoreLBezierC1, 220, xMoreLBezierC2, 245);
bezierVertex(xMoreLBezierD0, 290, xMoreLBezierD1, 313, xMoreLBezierD2, 336);
bezierVertex(xMoreLBezierE0, 338, xMoreLBezierE1, 352, xMoreLBezierE2, 366);
vertex(xMoreLVertex1, 341);
endShape();
}
function rindLeft() {
fill(239, 250, 6);
noStroke();
beginShape();
vertex(xLVertex0, 104);
bezierVertex(xLBezierB0, 137, xLBezierB1, 154, xLBezierB2, 171);
bezierVertex(xLBezierC0, 209, xLBezierC1, 234, xLBezierC2, 259);
bezierVertex(xLBezierD0, 280, xLBezierD1, 301, xLBezierD2, 314);
bezierVertex(xLBezierE0, 328, xLBezierE1, 348, xLBezierE2, 368);
vertex(xLVertex1, 359);
endShape();
}
function rindCenterLeft() {
fill(239, 193, 6);
noStroke();
beginShape();
vertex(xCenterLVertex0, 116);
bezierVertex(xCenterLBezierA0, 113, xCenterLBezierA1, 118, xCenterLBezierA2, 123);
bezierVertex(xCenterLBezierB0, 153, xCenterLBezierB1, 167, xCenterLBezierB2, 181);
bezierVertex(xCenterLBezierC0, 202, xCenterLBezierC1, 229, xCenterLBezierC2, 256);
bezierVertex(xCenterLBezierD0, 294, xCenterLBezierD1, 311, xCenterLBezierD2, 328);
bezierVertex(xCenterLBezierE0, 358, xCenterLBezierE1, 368, xCenterLBezierE2, 378);
vertex(xCenterLVertex1, 376);
endShape();
}
function rindMostRight() {
fill(210, 160, 6);
noStroke();
beginShape();
vertex(width - xMostLVertex0, 72);
bezierVertex(width - xMostLBezierA0, 56, width - xMostLBezierA1, 66, width - xMostLBezierA2, 76);
bezierVertex(width - xMostLBezierB0, 99, width - xMostLBezierB1, 117, width - xMostLBezierB2, 135);
bezierVertex(width - xMostLBezierC0, 168, width - xMostLBezierC1, 198, width - xMostLBezierC2, 228);
bezierVertex(width - xMostLBezierD0, 267, width - xMostLBezierD1, 288, width - xMostLBezierD2, 309);
vertex(width - xMostLVertex1, 305);
endShape();
}
function rindMoreRight() {
fill(300, 200, 6);
noStroke();
beginShape();
vertex(width - xMoreLVertex0, 98);
bezierVertex(width - xMoreLBezierA0, 87, width - xMoreLBezierA1, 95, width - xMoreLBezierA2, 103);
bezierVertex(width - xMoreLBezierB0, 111, width - xMoreLBezierB1, 143, width - xMoreLBezierB2, 175);
bezierVertex(width - xMoreLBezierC0, 195, width - xMoreLBezierC1, 220, width - xMoreLBezierC2, 245);
bezierVertex(width - xMoreLBezierD0, 290, width - xMoreLBezierD1, 313, width - xMoreLBezierD2, 336);
bezierVertex(width - xMoreLBezierE0, 338, width - xMoreLBezierE1, 352, width - xMoreLBezierE2, 366);
vertex(width - xMoreLVertex1, 341);
endShape();
}
function rindRight() {
fill(239, 250, 6);
noStroke();
beginShape();
vertex(width - xLVertex0, 104);
bezierVertex(width - xLBezierB0, 137, width - xLBezierB1, 154, width - xLBezierB2, 171);
bezierVertex(width - xLBezierC0, 209, width - xLBezierC1, 234, width - xLBezierC2, 259);
bezierVertex(width - xLBezierD0, 280, width - xLBezierD1, 301, width - xLBezierD2, 314);
bezierVertex(width - xLBezierE0, 328, width - xLBezierE1, 348, width - xLBezierE2, 368);
vertex(width - xLVertex1, 359);
endShape();
}
function rindCenterRight() {
fill(239, 193, 6);
noStroke();
beginShape();
vertex(width - xCenterLVertex0, 116);
bezierVertex(width - xCenterLBezierA0, 113, width - xCenterLBezierA1, 118, width - xCenterLBezierA2, 123);
bezierVertex(width - xCenterLBezierB0, 153, width - xCenterLBezierB1, 167, width - xCenterLBezierB2, 181);
bezierVertex(width - xCenterLBezierC0, 202, width - xCenterLBezierC1, 229, width - xCenterLBezierC2, 256);
bezierVertex(width - xCenterLBezierD0, 294, width - xCenterLBezierD1, 311, width - xCenterLBezierD2, 328);
bezierVertex(width - xCenterLBezierE0, 358, width - xCenterLBezierE1, 368, width - xCenterLBezierE2, 378);
vertex(width - xCenterLVertex1, 376);
endShape();
}
function stem(){
fill(0);
noStroke();
ellipse(260, 100, 80, 44);
beginShape();
vertex(207, 8);
bezierVertex(250, 0, 234, 18, 219, 11);
bezierVertex(256, 33, 261, 42, 266, 50);
vertex(264, 90);
vertex(242, 90);
bezierVertex(220, 39, 228, 44, 235, 50);
bezierVertex(188, 12, 192, 31);
endShape()
}
function rindDots(){
noStroke();
fill(0);
for (let h = 0; h < height; h++) {
for (let w = 0; w < width; w++) {
pg1.ellipse(w * 15, h * 15, 13, 13);
}
}
return(pg1);
}
function stemDots(){
noStroke();
fill(239, 193, 6);
for (let h = 0; h < height; h++) {
for (let w = 0; w < width; w++) {
pg2.ellipse(w * 8, h * 8, 7, 7);
}
}
}
let grid;
let width = 510;
let xMostLVertex0 = 253;
let xMostLBezierA0 = 191, xMostLBezierA1 = 154, xMostLBezierA2 = 117;
let xMostLBezierB0 = 91, xMostLBezierB1 = 76, xMostLBezierB2 = 61;
let xMostLBezierC0 = 40, xMostLBezierC1 = 34, xMostLBezierC2 = 28;
let xMostLBezierD0 = 26, xMostLBezierD1 = 34, xMostLBezierD2 = 42;
let xMostLVertex1 = 72;
let xMoreLVertex0 = 253;
let xMoreLBezierA0 = 195, xMoreLBezierA1 = 170, xMoreLBezierA2 = 145;
let xMoreLBezierB0 = 126, xMoreLBezierB1 = 106, xMoreLBezierB2 = 86;
let xMoreLBezierC0 = 84, xMoreLBezierC1 = 73, xMoreLBezierC2 = 62;
let xMoreLBezierD0 = 56, xMoreLBezierD1 = 66, xMoreLBezierD2 = 76;
let xMoreLBezierE0 = 80, xMoreLBezierE1 = 103, xMoreLBezierE2 = 126;
let xMoreLVertex1 = 171;
let xLVertex0 = 253;
let xLBezierA0 = 231, xLBezierA1 = 210, xLBezierA2 = 189;
let xLBezierB0 = 171, xLBezierB1 = 159, xLBezierB2 = 147;
let xLBezierC0 = 136, xLBezierC1 = 133, xLBezierC2 = 130;
let xLBezierD0 = 121, xLBezierD1 = 121, xLBezierD2 = 121;
let xLBezierE0 = 118, xLBezierE1 = 138, xLBezierE2 = 158;
let xLVertex1 = 203;
let xCenterLVertex0 = 256;
let xCenterLBezierA0 = 240, xCenterLBezierA1 = 231, xCenterLBezierA2 = 222;
let xCenterLBezierB0 = 200, xCenterLBezierB1 = 203, xCenterLBezierB2 = 201;
let xCenterLBezierC0 = 203, xCenterLBezierC1 = 205, xCenterLBezierC2 = 197;
let xCenterLBezierD0 = 180, xCenterLBezierD1 = 184, xCenterLBezierD2 = 183;
let xCenterLBezierE0 = 192, xCenterLBezierE1 = 208, xCenterLBezierE2 = 224;
let xCenterLVertex1 = 256;
function setup() {
createCanvas(width, 412);
grid = new Array(23);
for (let i = 0; i < grid.length; i++) {
grid[i] = new Array(19);
for (let j = 0; j < grid[i].length; j++) {
grid[i][j] = createVector(i * 24 + random(-5, 5), j * 23 + random(-5, 5));
}
}
}
function draw() {
background(0);
strokeWeight(2);
noFill();
for (let i = 0; i < grid.length - 1; i ++){
for (let j = 0; j < grid[i].length - 1; j++){
beginShape();
let pt1 = grid[i][j];
vertex(pt1.x, pt1.y);
let pt2 = grid[i][j+1];
vertex(pt2.x, pt2.y);
let pt3 = grid[i+1][j];
vertex(pt3.x, pt3.y);
endShape(CLOSE);
}
}
rindMostLeft(0, 0);
rindMoreLeft(0, 0);
rindLeft(0, 0);
rindCenterLeft(0, 0);
rindMostRight(0, 0);
rindMoreRight(0, 0);
rindRight(0, 0);
rindCenterRight(0, 0);
stem(0, 0);
}
function rindMostLeft() {
fill(twxture\);
noStroke();
beginShape();
vertex(xMostLVertex0, 72);
bezierVertex(xMostLBezierA0, 56, xMostLBezierA1, 66, xMostLBezierA2, 76);
bezierVertex(xMostLBezierB0, 99, xMostLBezierB1, 117, xMostLBezierB2, 135);
bezierVertex(xMostLBezierC0, 168, xMostLBezierC1, 198, xMostLBezierC2, 228);
bezierVertex(xMostLBezierD0, 267, xMostLBezierD1, 288, xMostLBezierD2, 309);
vertex(xMostLVertex1, 305);
endShape();
}
function rindMoreLeft() {
fill(300, 200, 6);
noStroke();
beginShape();
vertex(xMoreLVertex0, 98);
bezierVertex(xMoreLBezierA0, 87, xMoreLBezierA1, 95, xMoreLBezierA2, 103);
bezierVertex(xMoreLBezierB0, 111, xMoreLBezierB1, 143, xMoreLBezierB2, 175);
bezierVertex(xMoreLBezierC0, 195, xMoreLBezierC1, 220, xMoreLBezierC2, 245);
bezierVertex(xMoreLBezierD0, 290, xMoreLBezierD1, 313, xMoreLBezierD2, 336);
bezierVertex(xMoreLBezierE0, 338, xMoreLBezierE1, 352, xMoreLBezierE2, 366);
vertex(xMoreLVertex1, 341);
endShape();
}
function rindLeft() {
fill(239, 250, 6);
noStroke();
beginShape();
vertex(xLVertex0, 104);
bezierVertex(xLBezierB0, 137, xLBezierB1, 154, xLBezierB2, 171);
bezierVertex(xLBezierC0, 209, xLBezierC1, 234, xLBezierC2, 259);
bezierVertex(xLBezierD0, 280, xLBezierD1, 301, xLBezierD2, 314);
bezierVertex(xLBezierE0, 328, xLBezierE1, 348, xLBezierE2, 368);
vertex(xLVertex1, 359);
endShape();
}
function rindCenterLeft() {
fill(239, 193, 6);
noStroke();
beginShape();
vertex(xCenterLVertex0, 116);
bezierVertex(xCenterLBezierA0, 113, xCenterLBezierA1, 118, xCenterLBezierA2, 123);
bezierVertex(xCenterLBezierB0, 153, xCenterLBezierB1, 167, xCenterLBezierB2, 181);
bezierVertex(xCenterLBezierC0, 202, xCenterLBezierC1, 229, xCenterLBezierC2, 256);
bezierVertex(xCenterLBezierD0, 294, xCenterLBezierD1, 311, xCenterLBezierD2, 328);
bezierVertex(xCenterLBezierE0, 358, xCenterLBezierE1, 368, xCenterLBezierE2, 378);
vertex(xCenterLVertex1, 376);
endShape();
}
function rindMostRight() {
fill(210, 160, 6);
noStroke();
beginShape();
vertex(width - xMostLVertex0, 72);
bezierVertex(width - xMostLBezierA0, 56, width - xMostLBezierA1, 66, width - xMostLBezierA2, 76);
bezierVertex(width - xMostLBezierB0, 99, width - xMostLBezierB1, 117, width - xMostLBezierB2, 135);
bezierVertex(width - xMostLBezierC0, 168, width - xMostLBezierC1, 198, width - xMostLBezierC2, 228);
bezierVertex(width - xMostLBezierD0, 267, width - xMostLBezierD1, 288, width - xMostLBezierD2, 309);
vertex(width - xMostLVertex1, 305);
endShape();
}
function rindMoreRight() {
fill(300, 200, 6);
noStroke();
beginShape();
vertex(width - xMoreLVertex0, 98);
bezierVertex(width - xMoreLBezierA0, 87, width - xMoreLBezierA1, 95, width - xMoreLBezierA2, 103);
bezierVertex(width - xMoreLBezierB0, 111, width - xMoreLBezierB1, 143, width - xMoreLBezierB2, 175);
bezierVertex(width - xMoreLBezierC0, 195, width - xMoreLBezierC1, 220, width - xMoreLBezierC2, 245);
bezierVertex(width - xMoreLBezierD0, 290, width - xMoreLBezierD1, 313, width - xMoreLBezierD2, 336);
bezierVertex(width - xMoreLBezierE0, 338, width - xMoreLBezierE1, 352, width - xMoreLBezierE2, 366);
vertex(width - xMoreLVertex1, 341);
endShape();
}
function rindRight() {
fill(239, 250, 6);
noStroke();
beginShape();
vertex(width - xLVertex0, 104);
bezierVertex(width - xLBezierB0, 137, width - xLBezierB1, 154, width - xLBezierB2, 171);
bezierVertex(width - xLBezierC0, 209, width - xLBezierC1, 234, width - xLBezierC2, 259);
bezierVertex(width - xLBezierD0, 280, width - xLBezierD1, 301, width - xLBezierD2, 314);
bezierVertex(width - xLBezierE0, 328, width - xLBezierE1, 348, width - xLBezierE2, 368);
vertex(width - xLVertex1, 359);
endShape();
}
function rindCenterRight() {
fill(239, 193, 6);
noStroke();
beginShape();
vertex(width - xCenterLVertex0, 116);
bezierVertex(width - xCenterLBezierA0, 113, width - xCenterLBezierA1, 118, width - xCenterLBezierA2, 123);
bezierVertex(width - xCenterLBezierB0, 153, width - xCenterLBezierB1, 167, width - xCenterLBezierB2, 181);
bezierVertex(width - xCenterLBezierC0, 202, width - xCenterLBezierC1, 229, width - xCenterLBezierC2, 256);
bezierVertex(width - xCenterLBezierD0, 294, width - xCenterLBezierD1, 311, width - xCenterLBezierD2, 328);
bezierVertex(width - xCenterLBezierE0, 358, width - xCenterLBezierE1, 368, width - xCenterLBezierE2, 378);
vertex(width - xCenterLVertex1, 376);
endShape();
}
function stem(){
fill(0);
noStroke();
ellipse(260, 100, 80, 44);
beginShape();
vertex(207, 8);
bezierVertex(250, 0, 234, 18, 219, 11);
bezierVertex(256, 33, 261, 42, 266, 50);
vertex(264, 90);
vertex(242, 90);
bezierVertex(220, 39, 228, 44, 235, 50);
bezierVertex(188, 12, 192, 31);
endShape()
I'd like to recreate Yayoi's pumpkin
Questions:
1. How to position rinds and stem correctly when using functions?
If I don't use functions, my code will generate the pumpkin like this:
However, after I use functions, I couldn't call them to a correct position
2. How to add texture using the dot maps created?
I created two dot maps for the rinds and the stem. 
But how can I put them in the shape using texture()? I don't know what call
inside the ().
3. ShearZ?
Since the dots become smaller and smaller, I was suggested to use ShearZ()
According to the reference page, do I have to use a translation() first?
4. How to only apply the shattering effect to the pumpkin layer?
5. How to mirror the left half to the right?
6. How to make the joints not sharp?
let grid;
function setup() {
createCanvas(510, 412);
grid = new Array(23);
for (let i = 0; i < grid.length; i++) {
grid[i] = new Array(19);
for (let j = 0; j < grid[i].length; j++) {
grid[i][j] = createVector(i * 24 + random(-5, 5), j * 23 + random(-5, 5));
}
}
}
function draw() {
background(0);
strokeWeight(2);
noFill();
for (let i = 0; i < grid.length - 1; i++) {
for (let j = 0; j < grid[i].length - 1; j++) {
beginShape();
let pt1 = grid[i][j];
vertex(pt1.x, pt1.y);
let pt2 = grid[i][j + 1];
vertex(pt2.x, pt2.y);
let pt3 = grid[i + 1][j];
vertex(pt3.x, pt3.y);
endShape(CLOSE);
}
}
rindMostLeft(0, 0);
rindMoreLeft(0, 0);
rindLeft(0, 0);
rindCenter(0, 0);
rindMostLeft(0, 0);
rindMoreLeft(0, 0);
rindLeft(0, 0);
rindCenter(0, 0);
stem(191, 8);
}
function rindMostLeft() {
fill(210, 160, 6);
noStroke();
beginShape();
vertex(253, 72);
bezierVertex(191, 56, 154, 66, 117, 76);
bezierVertex(91, 99, 76, 117, 61, 135);
bezierVertex(40, 168, 34, 198, 28, 228);
bezierVertex(26, 267, 34, 288, 42, 309);
vertex(72, 305);
endShape();
}
function rindMoreLeft(x, y) {
push();
translate(x, y);
fill(300, 200, 6);
noStroke();
beginShape();
vertex(253, 98);
bezierVertex(195, 87, 170, 95, 145, 103);
bezierVertex(126, 111, 106, 143, 86, 175);
bezierVertex(84, 195, 73, 220, 62, 245);
bezierVertex(56, 290, 66, 313, 76, 336);
bezierVertex(80, 338, 103, 352, 126, 366);
vertex(171, 341);
endShape();
}
function rindLeft(x, y) {
push();
translate(x, y);
fill(239, 250, 6);
noStroke();
beginShape();
vertex(253, 104);
bezierVertex(171, 137, 159, 154, 147, 171);
bezierVertex(136, 209, 133, 234, 130, 259);
bezierVertex(121, 280, 121, 301, 121, 314);
bezierVertex(118, 328, 138, 348, 158, 368);
vertex(203, 359);
endShape();
}
function rindCenter(x, y) {
push();
translate(x, y);
fill(239, 193, 6);
noStroke();
beginShape();
vertex(253, 116);
fill("red");
stroke("white");
ellipse(240, 113, 50, 50);
ellipse(231, 118, 50, 50);
ellipse(222, 123, 50, 50);
bezierVertex(211, 146, 205, 167, 201, 187);
bezierVertex(203, 202, 197, 256, 200, 229);
bezierVertex(185, 294, 184, 311, 183, 328);
bezierVertex(192, 358, 208, 368, 224, 378);
vertex(253, 376);
endShape();
}
function stem(x, y) {
push();
translate(x, y);
fill(0);
noStroke();
ellipse(260, 100, 80, 44);
beginShape();
vertex(207, 8);
bezierVertex(250, 26, 234, 18, 219, 11);
bezierVertex(256, 33, 261, 42, 266, 50);
vertex(264, 90);
vertex(242, 90);
bezierVertex(220, 39, 228, 44, 235, 50);
bezierVertex(188, 12, 192, 31);
endShape()
}
function rindDots(x, y) {
noStroke();
fill(0);
for (let h = 0; h < height; h++) {
for (let w = 0; w < width; w++) {
ellipse(w * 15, h * 15, 13, 13);
}
}
}
function stemDots(x, y) {
noStroke();
fill(239, 193, 6);
for (let h = 0; h < height; h++) {
for (let w = 0; w < width; w++) {
ellipse(w * 8, h * 8, 7, 7);
}
}
}
createCanvas(400, 400);
} 
function draw() { 
background(220);
noStroke();
fill(0);
for (let h = 0; h < height; h++) {
for (let w = 0; w < width; w++) {
ellipse(w * 15, h * 15, 13, 13);
}
}
}function setup() { 
createCanvas(600, 400);
} 
function draw() { 
background(220);
fill(210, 160, 6);
noStroke();
beginShape();
vertex(253, 72);
bezierVertex(191, 56, 154, 66, 117, 76);
bezierVertex(91, 99, 76, 117, 61, 135);
bezierVertex(40, 168, 34, 198, 28, 228);
bezierVertex(26, 267, 34, 288, 42, 309);
vertex(72, 305);
endShape();
fill(300, 200, 6);
noStroke();
beginShape();
vertex(253, 98);
bezierVertex(195, 87, 170, 95, 145, 103);
bezierVertex(126, 111, 106, 143, 86, 175);
bezierVertex(84, 195, 73, 220, 62, 245);
bezierVertex(56, 290, 66, 313, 76, 336);
bezierVertex(80, 338, 103, 352, 126, 366);
vertex(171, 341);
endShape();
fill(239, 250, 6);
noStroke();
beginShape();
vertex(253, 104);
bezierVertex(161, 137, 159, 154, 147, 171);
bezierVertex(136, 209, 133, 234, 130, 259);
bezierVertex(121, 280, 121, 301, 121, 314);
bezierVertex(118, 328, 138, 348, 158, 368);
vertex(203, 359);
endShape();
fill(239, 193, 6);
noStroke();
beginShape();
vertex(253, 116);
bezierVertex(200, 153, 203, 167, 201, 181);
bezierVertex(203, 202, 205, 229, 197, 256);
bezierVertex(180, 294, 184, 311, 183, 328);
bezierVertex(192, 358, 208, 368, 224, 378);
vertex(253, 376);
endShape();
}let grid;
function setup() {
createCanvas(400, 400);
grid = new Array(10);
for (let i = 0; i < grid.length; i++) {
grid[i] = new Array(10);
for (let j = 0; j < grid[i].length; j++) {
grid[i][j] = createVector(i * 40 + random(-5,5), j * 40);
}
}
}
function draw() {
background(220);
stroke(0);
noFill();
strokeWeight(4);
beginShape()
for (let i = 0; i < grid.length; i++) {
for (let j = 0; j < grid[i].length; j++) {
let pt1 = grid[i][j];
vertex(pt.x,pt.y);
}
}
endShape();
}let x = 0;
let y = 0;
let spacing = 20;
function setup(){
createCanvas(542, 445);
noFill();
background(0);
}
function draw(){
stroke(239, 193, 6);
strokeWeight(2);
if (random(1) < 0.5) {
beginShape();
vertex(x + random(0, 5), y - 5);
vertex(x + random(0, 5), y + random(-5, 0) + spacing);
vertex(x + random(0, 5) + spacing, y + random(-5, 0) + spacing);
vertex(x + random(0, 5) + spacing, y - 5);
endShape();
}
else {
beginShape();
vertex(x + random(-5, 0), y + random(0, 5));
vertex(x + random(-5, 0) + spacing, y + random(0, 5));
vertex(x + random(-5, 0) + spacing, y + random(0, 5) + spacing);
endShape();
}
x = x + spacing;
if (x > width) {
x = 0;
y = y + spacing;
}
}var ASlider, BSlider, CSlider, DSlider, ESlider, FSlider;
let x = 0;
let y = 0;
let spacing = 20;
function setup() {
createCanvas(600, 750);
textSize(15);
stroke(239, 193, 6);
strokeWeight(2);
noFill();
background(0);
ASlider = createSlider(0, 300, 0);
ASlider.position(20, 630);
BSlider = createSlider(30, 155, 30);
BSlider.position(20, 645);
CSlider = createSlider(0, 255, 0);
CSlider.position(20, 675);
DSlider = createSlider(0, 60, 0);
DSlider.position(20, 690);
ESlider = createSlider(0, 300, 0);
ESlider.position(200, 630);
FSlider = createSlider(0, 170, 0);
FSlider.position(200, 645);
GSlider = createSlider(0, 255, 0);
GSlider.position(200, 675);
HSlider = createSlider(0, 255, 0);
HSlider.position(200, 690);
}
function draw() {
var a = ASlider.value();
var b = BSlider.value();
var c = CSlider.value();
var d = DSlider.value();
var e = ESlider.value();
var f = FSlider.value();
var pt1x = 0;
var pt1y = 0;
var pt2x = 600;
var pt2y = 0;
var pt3x = 600;
var pt3y = 600;
var pt4x = 0;
var pt4y = 600;
if (random(1) < 0.5) {
beginShape();
vertex(x + random(0, 5), y - 5);
vertex(x + random(0, 5), y + random(-5, 0) + spacing);
vertex(x + random(0, 5) + spacing, y + random(-5, 0) + spacing);
vertex(x + random(0, 5) + spacing, y - 5);
endShape();
}
else {
beginShape();
vertex(x + random(-5, 0), y + random(0, 5));
vertex(x + random(-5, 0) + spacing, y + random(0, 5));
vertex(x + random(-5, 0) + spacing, y + random(0, 5) + spacing);
endShape();
}
x = x + spacing;
if (x > width) {
x = 0;
y = y + spacing;
}
angleMode(DEGREES);
text("A", ASlider.x * 2 + ASlider.width, 35);
text("B", BSlider.x * 2 + BSlider.width, 65);
text("C", CSlider.x * 2 + CSlider.width, 95);
text("D", DSlider.x * 1.1 + DSlider.width, 35);
text("E", ESlider.x * 1.1 + ESlider.width, 65);
text("F", FSlider.x * 1.1 + FSlider.width, 95);
fill(0,0,0);
rect(0, 0, 600, 600);
fill(155,155,155);
rect(0, 615, 600, 120);
fill(255,255,255);
rect(pt1x, pt4y/2, a, b);
rect(pt1x, pt4y/2, a, -b);
rect(pt2x, pt4y/2, -a, b);
rect(pt2x, pt4y/2, -a, -b);
rect(pt2x/2, pt1y, b, a);
rect(pt2x/2, pt1y, -b, a);
rect(pt2x/2, pt3y, b, -a);
rect(pt2x/2, pt3y, -b, -a);
fill(255,255,255);
rect(pt1x, pt1y, c, c);
rect(pt2x, pt2y, -c, c);
rect(pt3x, pt3y, -c, -c);
rect(pt4x, pt4y, c, -c);
fill(255,255,255);
rect(pt2x/2, pt3y/2, -d, -d);
rect(pt2x/2, pt3y/2, d, -d);
rect(pt2x/2, pt3y/2, d, d);
rect(pt2x/2, pt3y/2, -d, d);
fill(0,0,0);
rect(135, 0, 30, e);
rect(0, 135, e, 30);
rect(435, 0, 30, e);
rect(600, 135, -e, 30);
rect(435, 600, 30, -e);
rect(600, 435, -e, 30);
rect(135, 600, 30, -e);
rect(0, 435, e, 30);
}
var x = 0;
var y = 0;
function setup() { 
createCanvas(400, 400);
background(253, 47, 90);
noStroke ();
} 
function draw() { 
if (random(1) > 0.5) {
ellipse(mouseX+20, mouseY+20, 20);
}
let background, tab0, tab1, tab2, tab3, clickMe;
let colorR, colorG;
function setup() {
createCanvas(1280, 720);
background.hide();
image(background, 0, 0, background.elt.width, background.elt.height);
tab0.hide();
tab1.hide();
tab2.hide();
tab3.hide();
clickMe.hide();
rotate(PI/3.0);
image(clickMe, 295, -500);
noStroke();
colorR = random (255);
colorG = random (255);
}
function draw() {
noFill();
ellipse(405, 305, 110, 110);
}
function mousePressed() {
let distance = dist(mouseX, mouseY, 405, 305);
if (distance < 95) {
fill(255);
rect(350, 280, 200, 40);
textSize(22);
fill(colorR, colorG, 153);
text("Happy Birthday!!!", 370, 305);
image(tab0, 296, 320);
setTimeout(function() {image(tab1, 296, 320)}, 1000);
setTimeout(function() {image(tab2, 296, 320)}, 2000);
setTimeout(function() {image(tab3, 296, 320)}, 3000);
}
}let background, img0, img1, img2, img3;
let r, g;
function setup() {
createCanvas(1280, 720);
frameRate(1);
background.hide();
image(background, 0, 0, background.elt.width, bg\.elt.height);
img0.hide();
img1.hide();
img2.hide();
img3.hide();
noStroke();
r = random(255);
g = random (255);
}
function draw() {
nofill();
ellipse(405, 305, 110);
}
function mousePressed() {
let d = dist(mouseX, mouseY, 405, 305);
if (d < 95) {
fill(255);
rect(350, 280, 200, 40);
textSize(22);
fill(r, g, 153);
text("Happy Birthday!!!", 370, 305);
image(img0, 296, 320);
}
}var y = 100;
function setup() { 
createCanvas(720, 400);
stroke(255);
frameRate(30);
} 
function draw() { 
background(0);
y -= 1;
if (y < 0) {
y = height;
}
line(0, y, width, y);
let X_AXIS = 1;
let DARK_GREY, LIGHT_GREY, GREEN, TEAL;
function setup(){
createCanvas(368, 200);
noStroke();
DARK_GREY = color(51, 51, 51);
LIGHT_GREY = color(169, 169, 169);
GREEN = color(84, 234, 84);
TEAL = color(119, 231, 212);
}
function draw(){
background(255);
drawTopTriangle(100, 60, 100, 150, 65 + 80, 60, DARK_GREY, LIGHT_GREY, X_AXIS);
drawBottomTriangle(100, 60, 100, 125, 60 + 80, 85, GREEN, TEAL, X_AXIS);
}
function drawTopTriangle(xTopLeft, yTopLeft, xBottomLeft, yBottomLeft, xTopRight, yTopRight, darkGrey, lightGrey, axis){
noFill();
for(let i = xTopLeft, j = yBottomLeft; i <= xTopLeft + xTopRight, j >= yTopLeft; i++, j-=1.3){
let interpolation = map(i, xTopLeft, xTopLeft + xTopRight, 0, 1);
let colorGrey = lerpColor(darkGrey, lightGrey, interpolation);
stroke(colorGrey);
line(i, yTopLeft, i, j);
}
}
function drawBottomTriangle(xTopLeft, yTopLeft, xBottomLeft, yBottomLeft, xTopRight, yTopRight, green, teal, axis){
noFill();
for(let i = xTopLeft, j = yTopLeft, k = yBottomLeft; i <= xTopLeft + xTopRight, j <= yTopRight, k >= 0; i++, j = j + 0.8, k = k - 2.2){
let interpolation = map(i, xTopLeft, xTopLeft + xTopRight, 0, 1);
let colorGreen = lerpColor(green, teal, interpolation);
stroke(colorGreen);
line(i, j, i, j + k);
}
}