let rangeVal = 95;
let img, startImg;
let isMoving = false;
let speed = 7.5;
let walkX, walkY, wlakR, stepX, stepY;
let textFlag = false;
let capture;
let tracker;
let playerCount = -1;
let player = [];
let playerColor = [];
let playerPhoto = [];
let turnOver = false;
let diceCount;
let currentDiceCount;
let weightVal = 0.3;
let showGrid = false;
let rhi, ghi, bhi;
let rlo, glo, blo;
function preload() {
img = loadImage("assets/players.jpg");
startImg = loadImage("assets/cover.png");
imgSheree = loadImage("assets/Sheree.png");
imgNoble = loadImage("assets/Noble.png");
imgClarence = loadImage("assets/Clarence.png");
imgWalker = loadImage("assets/Walker.png");
}
function setTarget(r, g, b, range) {
range = range || 32;
rhi = r + range;
rlo = r - range;
ghi = g + range;
glo = g - range;
bhi = b + range;
blo = b - range;
}
function setup() {
var w = 640,
h = 480;
capture = createCapture(VIDEO);
capture.size(w, h);
capture.parent('camera');
cnv = createCanvas(w, h);
cnv.parent('container');
setTarget(0, 0, 0, rangeVal);
tracking.ColorTracker.registerColor('match', function(r, g, b) {
if (r <= rhi && r >= rlo &&
g <= ghi && g >= glo &&
b <= bhi && b >= blo) {
return true;
}
return false;
});
tracker = new tracking.ColorTracker(['match']);
tracking.track('#p5video', tracker, {
camera: true
});
tracker.on('track', function(event) {
camCal = event.data;
diceCount = event.data.length;
diceCount = event.data.filter(d => {
if (d.width < 1 || d.height < 1 || d.width > 10 || d.height > 10) return false
else return true
}).length;
camCal = event.data.filter(c => {
if (c.width < 1 || c.height < 1 || c.width > 10 || c.height > 10) return false
else return true
});
});
var gameCanvas = createCanvas(700, 700);
gameCanvas.parent('game');
walkX = -20;
walkY = -20;
walkR = width / 40;
player[0] = "Sheree";
player[1] = "Noble";
player[2] = "Clarence";
player[3] = "Walker";
player[4] = "Sheree";
playerColor[0] = color(255, 0, 0);
playerColor[1] = color(0, 255, 0);
playerColor[2] = color(0, 0, 255);
playerColor[3] = color(255, 255, 0);
playerColor[4] = color(255, 0, 0);
playerPhoto[0] = imgSheree;
playerPhoto[1] = imgNoble;
playerPhoto[2] = imgClarence;
playerPhoto[3] = imgWalker;
playerPhoto[4] = imgSheree;
push();
imageMode(CENTER);
image(startImg, width / 2, height / 2, 640, 480);
pop();
}
function draw() {
if (showGrid == true) {
push();
imageMode(CORNER);
image(capture, 0, 0);
pop();
push();
noStroke();
stroke(255, 0, 0);
noFill();
camCal.forEach(function(r) {
rect(r.x, r.y, r.width, r.height);
});
pop();
push();
noStroke();
fill(255, 0, 0);
textSize(16);
text("Place the dice in the center of the board.", cnv.width * 0.05, cnv.height * 0.50);
text("Make sure the board is clear and well lit with few shadows.", cnv.width * 0.05, cnv.height * 0.53);
text("You should see one red rectangle for each blob only.", cnv.width * 0.05, cnv.height * 0.56);
text("If not, you can change the rangeVal at the top of the code.", cnv.width * 0.05, cnv.height * 0.59);
text("Higher numbers pick up more blobs; lower numbers exclude any errant blobs.", cnv.width * 0.05, cnv.height * 0.62);
text("Once finished, save the sketch and re-enter calibration to see the results.", cnv.width * 0.05, cnv.height * 0.65);
pop();
} else if (showGrid == false) {
step();
display();
checkWinner();
if (isMoving) {
push();
textSize(18);
stroke(255);
strokeWeight(1);
fill(255);
text("You rolled:",
width * 0.12, height * 0.7);
textSize(64);
text(currentDiceCount, width * 0.15, height * 0.78);
textSize(18);
pop();
}
}
}
function keyPressed() {
if (keyCode == 32) {
if (!isMoving) {
playerCount++;
if (playerCount > 3) {
playerCount = 0;
}
}
isMoving = true;
fill(0);
image(img, 0, height / 20, width, height);
borders();
walkX = width / 2;
walkY = height / 2;
currentDiceCount = diceCount;
}
if (keyCode === 65) {
showGrid = !showGrid;
}
}
function display() {
strokeWeight(1);
fill(150, 0, 255);
ellipse(walkX, walkY, walkR, walkR);
}
function step() {
let ran = random(1 + (diceCount / 12) * weightVal);
if (isMoving == true) {
if (playerCount === 0 || playerCount === 5) {
if (ran < 0.25) {
walkY -= speed;
} else if (ran < 0.5) {
walkX += speed;
} else if (ran < 0.75) {
walkY += speed;
} else if (ran > 0.75) {
walkX -= speed;
}
} else if (playerCount == 1) {
if (ran < 0.25) {
walkX += speed;
} else if (ran < 0.5) {
walkY += speed;
} else if (ran < 0.75) {
walkX -= speed;
} else if (ran > 0.75) {
walkY -= speed;
}
} else if (playerCount == 2) {
if (ran < 0.25) {
walkY += speed;
} else if (ran < 0.5) {
walkX -= speed;
} else if (ran < 0.75) {
walkY -= speed;
} else if (ran > 0.75) {
walkX += speed;
}
} else if (playerCount == 3) {
if (ran < 0.25) {
walkX -= speed;
} else if (ran < 0.5) {
walkY -= speed;
} else if (ran < 0.75) {
walkX += speed;
} else if (ran > 0.75) {
walkY += speed;
}
} else if (isMoving == false) {
stepX = 1;
stepY = 1;
walkX += 0;
walkY += 0;
}
}
}
function checkWinner() {
let textX = width * 0.2;
let offset1 = 125;
let offset2 = 330;
if (walkX <= width / 10 && walkX > 0) {
turnOver = true;
isMoving = false;
textFlag = false;
background(255, 0, 0);
push();
imageMode(CENTER);
image(imgSheree, width * 0.5, height * 0.2, imgSheree.width * 0.25, imgSheree.height * 0.25);
textAlign(CENTER);
textSize(64);
fill(150, 0, 255);
text("Sheree Wins!!!", width * 0.5, height * 0.4);
pop();
showNextPlayer();
}
if (walkY <= height / 10 && walkY > 0) {
turnOver = true;
isMoving = false;
textFlag = false;
background(0, 255, 0);
push();
imageMode(CENTER);
image(imgNoble, width * 0.5, height * 0.2, imgNoble.width * 0.25, imgNoble.height * 0.25);
textAlign(CENTER);
textSize(64);
fill(150, 0, 255);
text("Noble Wins!!!", width * 0.5, height * 0.4);
pop();
showNextPlayer();
}
if (walkX >= (width - (width / 10)) && walkX > 0) {
turnOver = true;
isMoving = false;
textFlag = false;
background(0, 0, 255);
push();
imageMode(CENTER);
image(imgClarence, width * 0.5, height * 0.2, imgClarence.width * 0.25, imgClarence.height * 0.25);
textAlign(CENTER);
textSize(64);
fill(150, 0, 255);
text("Clarence Wins!!!", width * 0.5, height * 0.4);
pop();
showNextPlayer();
}
if (walkY >= (height - (height / 10)) && walkY > 0) {
turnOver = true;
isMoving = false;
textFlag = false;
background(255, 255, 0);
push();
imageMode(CENTER);
image(imgWalker, width * 0.5, height * 0.2, imgWalker.width * 0.25, imgWalker.height * 0.25);
textAlign(CENTER);
textSize(64);
fill(150, 0, 255);
text("WALKER Wins!!!", width * 0.5, height * 0.4);
pop();
showNextPlayer();
}
function showNextPlayer() {
push();
imageMode(CENTER);
image(playerPhoto[playerCount + 1], textX + offset1, height * 0.63,
playerPhoto[playerCount + 1].width * 0.25, playerPhoto[playerCount + 1].height * 0.25);
textAlign(CENTER);
stroke(0);
strokeWeight(2);
textSize(32);
text("And it's  ", textX, 3 * height / 4);
push();
fill(playerColor[playerCount + 1]);
text(player[playerCount + 1] + "'s", textX + offset1, 3 * height / 4);
pop();
text(" turn to roll now...", textX + offset2, 3 * height / 4);
text("Then press SPACEBAR to run the Walker!", width / 2, height * 0.80);
pop();
}
}
function borders() {
if (playerCount == 0) {
push();
stroke(255);
strokeWeight(4);
fill(255, 0, 0);
quad(0, 0, width / 10, height / 10, width / 10, height - (height / 10), 0, height);
pop();
} else {
fill(255, 0, 0);
quad(0, 0, width / 10, height / 10, width / 10, height - (height / 10), 0, height);
}
if (playerCount == 1) {
push();
stroke(255);
strokeWeight(4);
fill(0, 255, 0);
quad(0, 0, width / 10, height / 10, width - (width / 10), height / 10, width, 0);
pop();
} else {
fill(0, 255, 0);
quad(0, 0, width / 10, height / 10, width - (width / 10), height / 10, width, 0);
}
if (playerCount == 2) {
push();
stroke(255);
strokeWeight(4);
fill(0, 0, 255);
quad(width - (width / 10), (height / 10), width, 0, width, height, width - (width / 10), height - (height / 10));
pop();
} else {
fill(0, 0, 255);
quad(width - (width / 10), (height / 10), width, 0, width, height, width - (width / 10), height - (height / 10));
}
if (playerCount == 3) {
push();
stroke(255);
strokeWeight(4);
fill(255, 255, 0);
quad(width - (width / 10), height - (height / 10), width, height, 0, height, width / 10, height - (height / 10));
pop();
} else {
fill(255, 255, 0);
quad(width - (width / 10), height - (height / 10), width, height, 0, height, width / 10, height - (height / 10));
}
}
want to build a timer with visible counter to auto restart after x seconds 
scoreboard
percentages of likelihood walker
alignment and camera procedures
let r = random(1);
if (playerCount = 1) {
r * diceCount/12
if (r < 0.25) {
x--;
} else if (r < 0.5) {
y--;
} else if (r < 0.75) {
x++;
}else if (r < 1) {
y++;
}
let rangeVal = 95;
let img, startImg;
let isMoving = false;
let speed = 7.5;
let walkX, walkY, wlakR, stepX, stepY;
let textFlag = false;
let capture;
let tracker;
let playerCount = -1;
let player = [];
let playerColor = [];
let playerPhoto = [];
let turnOver = false;
let diceCount;
let currentDiceCount;
let weightVal = 0.3;
let showGrid = false;
let rhi, ghi, bhi;
let rlo, glo, blo;
function preload() {
img = loadImage("assets/players.jpg");
startImg = loadImage("assets/cover.png");
imgSheree = loadImage("assets/Sheree.png");
imgNoble = loadImage("assets/Noble.png");
imgClarence = loadImage("assets/Clarence.png");
imgWalker = loadImage("assets/Walker.png");
}
function setTarget(r, g, b, range) {
range = range || 32;
rhi = r + range;
rlo = r - range;
ghi = g + range;
glo = g - range;
bhi = b + range;
blo = b - range;
}
function setup() {
var w = 640,
h = 480;
capture = createCapture(VIDEO);
capture.size(w, h);
capture.parent('camera');
cnv = createCanvas(w, h);
cnv.parent('container');
setTarget(0, 0, 0, rangeVal);
tracking.ColorTracker.registerColor('match', function(r, g, b) {
if (r <= rhi && r >= rlo &&
g <= ghi && g >= glo &&
b <= bhi && b >= blo) {
return true;
}
return false;
});
tracker = new tracking.ColorTracker(['match']);
tracking.track('#p5video', tracker, {
camera: true
});
tracker.on('track', function(event) {
camCal = event.data;
diceCount = event.data.length;
diceCount = event.data.filter(d => {
if (d.width < 1 || d.height < 1 || d.width > 10 || d.height > 10) return false
else return true
}).length;
camCal = event.data.filter(c => {
if (c.width < 1 || c.height < 1 || c.width > 10 || c.height > 10) return false
else return true
});
camCal.forEach(function(r) {
console.log('r.width: ', r.width); 
console.log('r.height: ', r.height);
}); 
});
var gameCanvas = createCanvas(700, 700);
gameCanvas.parent('game');
walkX = -20;
walkY = -20;
walkR = width / 40;
player[0] = "Sheree";
player[1] = "Noble";
player[2] = "Clarence";
player[3] = "Walker";
player[4] = "Sheree";
playerColor[0] = color(255, 0, 0);
playerColor[1] = color(0, 255, 0);
playerColor[2] = color(0, 0, 255);
playerColor[3] = color(255, 255, 0);
playerColor[4] = color(255, 0, 0);
push();
imageMode(CENTER);
image(startImg, width / 2, height / 2, 640, 480);
pop();
}
function draw() {
if (showGrid == true) {
push();
imageMode(CORNER);
image(capture, 0, 0);
pop();
push();
noStroke();
stroke(255,0,0);
noFill();
camCal.forEach(function(r) {
rect(r.x, r.y, r.width, r.height);
});
pop();
push();
noStroke();
fill(255, 0, 0);
textSize(16);
text("Place the dice in the center of the board.", cnv.width * 0.05, cnv.height * 0.50);
text("Make sure the board is clear and well lit with few shadows.", cnv.width * 0.05, cnv.height * 0.53);
text("You should see one red rectangle for each blob only.", cnv.width * 0.05, cnv.height * 0.56);
text("If not, you can change the rangeVal at the top of the code.", cnv.width * 0.05, cnv.height * 0.59);
text("Higher numbers pick up more blobs; lower numbers exclude any errant blobs.", cnv.width * 0.05, cnv.height * 0.62);
text("Once finished, save the sketch and re-enter calibration to see the results.", cnv.width * 0.05, cnv.height * 0.65);
pop();
} else if (showGrid == false) {
step();
display();
checkWinner();
if (isMoving) {
push();
textSize(18);
stroke(255);
strokeWeight(1);
fill(255);
text("You rolled:",
width * 0.12, height * 0.7);
textSize(64);
text(currentDiceCount, width * 0.15, height * 0.78);
textSize(18);
text("...right????", width * 0.20, height * 0.81);
text("(if not, press spacebar again and/or move the dice)",
width * 0.12, height * 0.86);
pop();
}
}
}
function keyPressed() {
if (keyCode == 32) {
if (!isMoving) {
playerCount++;
if (playerCount > 3) {
playerCount = 0;
}
}
isMoving = true;
fill(0);
image(img, 0, height / 20, width, height);
borders();
walkX = width / 2;
walkY = height / 2;
currentDiceCount = diceCount;
}
if (keyCode === 65) {
showGrid = !showGrid;
}
}
function display() {
strokeWeight(1);
fill(150, 0, 255);
ellipse(walkX, walkY, walkR, walkR);
}
function step() {
let ran = random(1 + (diceCount / 12) * weightVal);
if (isMoving == true) {
if (playerCount === 0 || playerCount === 5) {
if (ran < 0.25) {
walkY -= speed;
} else if (ran < 0.5) {
walkX += speed;
} else if (ran < 0.75) {
walkY += speed;
} else if (ran > 0.75) {
walkX -= speed;
}
} else if (playerCount == 1) {
if (ran < 0.25) {
walkX += speed;
} else if (ran < 0.5) {
walkY += speed;
} else if (ran < 0.75) {
walkX -= speed;
} else if (ran > 0.75) {
walkY -= speed;
}
} else if (playerCount == 2) {
if (ran < 0.25) {
walkY += speed;
} else if (ran < 0.5) {
walkX -= speed;
} else if (ran < 0.75) {
walkY -= speed;
} else if (ran > 0.75) {
walkX += speed;
}
} else if (playerCount == 3) {
if (ran < 0.25) {
walkX -= speed;
} else if (ran < 0.5) {
walkY -= speed;
} else if (ran < 0.75) {
walkX += speed;
} else if (ran > 0.75) {
walkY += speed;
}
} else if (isMoving == false) {
stepX = 1;
stepY = 1;
walkX += 0;
walkY += 0;
}
}
}
function checkWinner() {
let textX = width * 0.2;
let offset1 = 125;
let offset2 = 330;
if (walkX <= width / 10 && walkX > 0) {
turnOver = true;
isMoving = false;
textFlag = false;
background(255, 0, 0);
push();
textAlign(CENTER);
textSize(64);
fill(150, 0, 255);
text("Sheree Wins!!!", width / 2, height / 2);
textSize(32);
text("And it's  ", textX, 3 * height / 4);
push();
stroke(0);
strokeWeight(2);
fill(playerColor[playerCount + 1])
text(player[playerCount + 1] + "'s", textX + offset1, 3 * height / 4);
pop();
text(" turn to roll now...", textX + offset2, 3 * height / 4);
text("Then press SPACEBAR to run the Walker!", width / 2, height * 0.80);
pop();
}
if (walkY <= height / 10 && walkY > 0) {
turnOver = true;
isMoving = false;
textFlag = false;
background(0, 255, 0);
push();
textAlign(CENTER);
textSize(64);
fill(150, 0, 255);
text("Noble Wins!!!", width / 2, height / 2);
textSize(32);
text("And it's  ", textX, 3 * height / 4);
push();
stroke(0);
strokeWeight(2);
fill(playerColor[playerCount + 1]);
text(player[playerCount + 1] + "'s", textX + offset1, 3 * height / 4);
pop();
text("turn to roll now...", textX + offset2, 3 * height / 4);
text("Then press SPACEBAR to run the Walker!", width / 2, height * 0.80);
pop();
}
if (walkX >= (width - (width / 10)) && walkX > 0) {
turnOver = true;
isMoving = false;
textFlag = false;
background(0, 0, 255);
push();
textAlign(CENTER);
textSize(64);
fill(150, 0, 255);
text("Clarence Wins!!!", width / 2, height / 2);
textSize(32);
text("And it's  ", textX, 3 * height / 4);
push();
stroke(0);
strokeWeight(2);
fill(playerColor[playerCount + 1]);
text(player[playerCount + 1] + "'s", textX + offset1, 3 * height / 4);
pop();
text(" turn to roll now...", textX + offset2, 3 * height / 4);
text("Then press SPACEBAR to run the Walker!", width / 2, height * 0.80);
pop();
}
if (walkY >= (height - (height / 10)) && walkY > 0) {
turnOver = true;
isMoving = false;
textFlag = false;
background(255, 255, 0);
push();
textAlign(CENTER);
textSize(64);
fill(150, 0, 255);
text("WALKER Wins!!!", width / 2, height / 2);
textSize(32);
text("And it's  ", textX, 3 * height / 4);
push();
stroke(0);
strokeWeight(2);
fill(playerColor[playerCount + 1]);
text(player[playerCount + 1] + "'s", textX + offset1, 3 * height / 4);
pop();
text(" turn to roll now...", textX + offset2, 3 * height / 4);
text("Then press SPACEBAR to run the Walker!", width / 2, height * 0.80);
pop();
}
}
function borders() {
if (playerCount == 0) {
push();
stroke(255);
strokeWeight(4);
fill(255, 0, 0);
quad(0, 0, width / 10, height / 10, width / 10, height - (height / 10), 0, height);
pop();
} else {
fill(255, 0, 0);
quad(0, 0, width / 10, height / 10, width / 10, height - (height / 10), 0, height);
}
if (playerCount == 1) {
push();
stroke(255);
strokeWeight(4);
fill(0, 255, 0);
quad(0, 0, width / 10, height / 10, width - (width / 10), height / 10, width, 0);
pop();
} else {
fill(0, 255, 0);
quad(0, 0, width / 10, height / 10, width - (width / 10), height / 10, width, 0);
}
if (playerCount == 2) {
push();
stroke(255);
strokeWeight(4);
fill(0, 0, 255);
quad(width - (width / 10), (height / 10), width, 0, width, height, width - (width / 10), height - (height / 10));
pop();
} else {
fill(0, 0, 255);
quad(width - (width / 10), (height / 10), width, 0, width, height, width - (width / 10), height - (height / 10));
}
if (playerCount == 3) {
push();
stroke(255);
strokeWeight(4);
fill(255, 255, 0);
quad(width - (width / 10), height - (height / 10), width, height, 0, height, width / 10, height - (height / 10));
pop();
} else {
fill(255, 255, 0);
quad(width - (width / 10), height - (height / 10), width, height, 0, height, width / 10, height - (height / 10));
}
}
want to build a timer with visible counter to auto restart after x seconds 
scoreboard
percentages of likelihood walker
alignment and camera procedures
let r = random(1);
if (playerCount = 1) {
r * diceCount/12
if (r < 0.25) {
x--;
} else if (r < 0.5) {
y--;
} else if (r < 0.75) {
x++;
}else if (r < 1) {
y++;
}
let rangeVal = 90;
let img, startImg;
let isMoving = false;
let speed = 5;
let walkX, walkY, wlakR, stepX, stepY;
let textFlag = false;
let capture;
let tracker;
let playerCount = -1;
let player = [];
let playerColor = [];
let turnOver = false;
let diceCount;
let currentDiceCount;
let weightVal = 0.3;
let showGrid = false;
let rhi, ghi, bhi;
let rlo, glo, blo;
function preload() {
img = loadImage("assets/players.jpg");
startImg = loadImage("assets/cover.png");
}
function setTarget(r, g, b, range) {
range = range || 32;
rhi = r + range;
rlo = r - range;
ghi = g + range;
glo = g - range;
bhi = b + range;
blo = b - range;
}
function setup() {
var w = 640,
h = 480;
capture = createCapture(VIDEO);
capture.size(w, h);
capture.parent('camera');
cnv = createCanvas(w, h);
cnv.parent('container');
setTarget(0, 0, 0, rangeVal);
tracking.ColorTracker.registerColor('match', function(r, g, b) {
if (r <= rhi && r >= rlo &&
g <= ghi && g >= glo &&
b <= bhi && b >= blo) {
return true;
}
return false;
});
tracker = new tracking.ColorTracker(['match']);
tracking.track('#p5video', tracker, {
camera: true
});
tracker.on('track', function(event) {
camCal = event.data;
diceCount = event.data.length;
strokeWeight(2);
stroke(255, 0, 0);
noFill();
event.data.forEach(function(r) {
rect(r.x, r.y, r.width, r.height);
});
var gameCanvas = createCanvas(700, 700);
gameCanvas.parent('game');
walkX = -20;
walkY = -20;
walkR = width / 40;
player[0] = "Sheree";
player[1] = "Noble";
player[2] = "Clarence";
player[3] = "Walker";
player[4] = "Sheree";
playerColor[0] = color(255, 0, 0);
playerColor[1] = color(0, 255, 0);
playerColor[2] = color(0, 0, 255);
playerColor[3] = color(255, 255, 0);
playerColor[4] = color(255, 0, 0);
push();
imageMode(CENTER);
image(startImg, width / 2, height / 2, 640, 480);
pop();
}
function draw() {
if (showGrid == true) {
push();
imageMode(CORNER);
image(capture, 0, 0);
pop();
push();
noStroke();
stroke(255,0,0);
noFill();
camCal.forEach(function(r) {
rect(r.x, r.y, r.width, r.height);
});
pop();
push();
noStroke();
fill(255, 0, 0);
textSize(16);
text("Place the dice in the center of the board.", cnv.width * 0.05, cnv.height * 0.50);
text("Make sure the board is clear and well lit with few shadows.", cnv.width * 0.05, cnv.height * 0.53);
text("You should see one red rectangle for each blob only.", cnv.width * 0.05, cnv.height * 0.56);
text("If not, you can change the rangeVal at the top of the code.", cnv.width * 0.05, cnv.height * 0.59);
text("Higher numbers pick up more blobs; lower numbers exclude any errant blobs.", cnv.width * 0.05, cnv.height * 0.62);
text("Once finished, save the sketch and re-enter calibration to see the results.", cnv.width * 0.05, cnv.height * 0.65);
pop();
} else if (showGrid == false) {
step();
display();
checkWinner();
if (isMoving) {
push();
textSize(18);
stroke(255);
strokeWeight(1);
fill(255);
text("You rolled:",
width * 0.12, height * 0.7);
textSize(64);
text(currentDiceCount, width * 0.15, height * 0.78);
textSize(18);
text("...right????", width * 0.20, height * 0.81);
text("(if not, press spacebar again and/or move the dice)",
width * 0.12, height * 0.86);
pop();
}
}
}
function keyPressed() {
if (keyCode == 32) {
if (!isMoving) {
playerCount++;
if (playerCount > 3) {
playerCount = 0;
}
}
isMoving = true;
fill(0);
image(img, 0, height / 20, width, height);
borders();
walkX = width / 2;
walkY = height / 2;
currentDiceCount = diceCount;
}
if (keyCode === 65) {
showGrid = !showGrid;
}
}
function display() {
strokeWeight(1);
fill(150, 0, 255);
ellipse(walkX, walkY, walkR, walkR);
}
function step() {
let ran = random(1) + (diceCount / 12) * weightVal;
if (isMoving == true) {
if (playerCount === 0 || playerCount === 5) {
if (ran < 0.25) {
walkY -= speed;
} else if (ran < 0.5) {
walkX += speed;
} else if (ran < 0.75) {
walkY += speed;
} else if (ran > 0.75) {
walkX -= speed;
}
} else if (playerCount == 1) {
if (ran < 0.25) {
walkX += speed;
} else if (ran < 0.5) {
walkY += speed;
} else if (ran < 0.75) {
walkX -= speed;
} else if (ran > 0.75) {
walkY -= speed;
}
} else if (playerCount == 2) {
if (ran < 0.25) {
walkY += speed;
} else if (ran < 0.5) {
walkX -= speed;
} else if (ran < 0.75) {
walkY -= speed;
} else if (ran > 0.75) {
walkX += speed;
}
} else if (playerCount == 3) {
if (ran < 0.25) {
walkX -= speed;
} else if (ran < 0.5) {
walkY -= speed;
} else if (ran < 0.75) {
walkX += speed;
} else if (ran > 0.75) {
walkY += speed;
}
} else if (isMoving == false) {
stepX = 1;
stepY = 1;
walkX += 0;
walkY += 0;
}
}
}
function checkWinner() {
let textX = width * 0.2;
let offset1 = 125;
let offset2 = 330;
if (walkX <= width / 10 && walkX > 0) {
turnOver = true;
isMoving = false;
textFlag = false;
background(255, 0, 0);
push();
textAlign(CENTER);
textSize(64);
fill(150, 0, 255);
text("Sheree Wins!!!", width / 2, height / 2);
textSize(32);
text("And it's  ", textX, 3 * height / 4);
push();
stroke(0);
strokeWeight(2);
fill(playerColor[playerCount + 1])
text(player[playerCount + 1] + "'s", textX + offset1, 3 * height / 4);
pop();
text(" turn to roll now...", textX + offset2, 3 * height / 4);
text("Then press SPACEBAR to run the Walker!", width / 2, height * 0.80);
pop();
}
if (walkY <= height / 10 && walkY > 0) {
turnOver = true;
isMoving = false;
textFlag = false;
background(0, 255, 0);
push();
textAlign(CENTER);
textSize(64);
fill(150, 0, 255);
text("Noble Wins!!!", width / 2, height / 2);
textSize(32);
text("And it's  ", textX, 3 * height / 4);
push();
stroke(0);
strokeWeight(2);
fill(playerColor[playerCount + 1]);
text(player[playerCount + 1] + "'s", textX + offset1, 3 * height / 4);
pop();
text("turn to roll now...", textX + offset2, 3 * height / 4);
text("Then press SPACEBAR to run the Walker!", width / 2, height * 0.80);
pop();
}
if (walkX >= (width - (width / 10)) && walkX > 0) {
turnOver = true;
isMoving = false;
textFlag = false;
background(0, 0, 255);
push();
textAlign(CENTER);
textSize(64);
fill(150, 0, 255);
text("Clarence Wins!!!", width / 2, height / 2);
textSize(32);
text("And it's  ", textX, 3 * height / 4);
push();
stroke(0);
strokeWeight(2);
fill(playerColor[playerCount + 1]);
text(player[playerCount + 1] + "'s", textX + offset1, 3 * height / 4);
pop();
text(" turn to roll now...", textX + offset2, 3 * height / 4);
text("Then press SPACEBAR to run the Walker!", width / 2, height * 0.80);
pop();
}
if (walkY >= (height - (height / 10)) && walkY > 0) {
turnOver = true;
isMoving = false;
textFlag = false;
background(255, 255, 0);
push();
textAlign(CENTER);
textSize(64);
fill(150, 0, 255);
text("WALKER Wins!!!", width / 2, height / 2);
textSize(32);
text("And it's  ", textX, 3 * height / 4);
push();
stroke(0);
strokeWeight(2);
fill(playerColor[playerCount + 1]);
text(player[playerCount + 1] + "'s", textX + offset1, 3 * height / 4);
pop();
text(" turn to roll now...", textX + offset2, 3 * height / 4);
text("Then press SPACEBAR to run the Walker!", width / 2, height * 0.80);
pop();
}
}
function borders() {
if (playerCount == 0) {
push();
stroke(255);
strokeWeight(4);
fill(255, 0, 0);
quad(0, 0, width / 10, height / 10, width / 10, height - (height / 10), 0, height);
pop();
} else {
fill(255, 0, 0);
quad(0, 0, width / 10, height / 10, width / 10, height - (height / 10), 0, height);
}
if (playerCount == 1) {
push();
stroke(255);
strokeWeight(4);
fill(0, 255, 0);
quad(0, 0, width / 10, height / 10, width - (width / 10), height / 10, width, 0);
pop();
} else {
fill(0, 255, 0);
quad(0, 0, width / 10, height / 10, width - (width / 10), height / 10, width, 0);
}
if (playerCount == 2) {
push();
stroke(255);
strokeWeight(4);
fill(0, 0, 255);
quad(width - (width / 10), (height / 10), width, 0, width, height, width - (width / 10), height - (height / 10));
pop();
} else {
fill(0, 0, 255);
quad(width - (width / 10), (height / 10), width, 0, width, height, width - (width / 10), height - (height / 10));
}
if (playerCount == 3) {
push();
stroke(255);
strokeWeight(4);
fill(255, 255, 0);
quad(width - (width / 10), height - (height / 10), width, height, 0, height, width / 10, height - (height / 10));
pop();
} else {
fill(255, 255, 0);
quad(width - (width / 10), height - (height / 10), width, height, 0, height, width / 10, height - (height / 10));
}
}
want to build a timer with visible counter to auto restart after x seconds 
scoreboard
percentages of likelihood walker
alignment and camera procedures
let r = random(1);
if (playerCount = 1) {
r * diceCount/12
if (r < 0.25) {
x--;
} else if (r < 0.5) {
y--;
} else if (r < 0.75) {
x++;
}else if (r < 1) {
y++;
}
let img, startImg;
let isMoving = false;
let speed = 5;
let walkX, walkY, wlakR, stepX, stepY;
let textFlag = false;
let capture;
let tracker;
let playerCount = -1;
let player = [];
let playerColor = [];
let turnOver = false;
let diceCount;
let currentDiceCount;
let weightVal = 0.3;
let showGrid = false;
let rhi, ghi, bhi;
let rlo, glo, blo;
function preload() {
img = loadImage("assets/players.jpg");
startImg = loadImage("assets/cover.jpg");
}
function setTarget(r, g, b, range) {
range = range || 32;
rhi = r + range;
rlo = r - range;
ghi = g + range;
glo = g - range;
bhi = b + range;
blo = b - range;
}
function setup() {
var w = 640, h = 480;
capture = createCapture(VIDEO);
capture.size(w, h);
capture.parent('camera');
cnv = createCanvas(w, h);
cnv.parent('container');
setTarget(0, 0, 0, 70);
tracking.ColorTracker.registerColor('match', function(r, g, b) {
if (r <= rhi && r >= rlo &&
g <= ghi && g >= glo &&
b <= bhi && b >= blo) {
return true;
}
return false;
});
tracker = new tracking.ColorTracker(['match']);
tracking.track('#p5video', tracker, {
camera: true
});
tracker.on('track', function(event) {
diceCount = event.data.length;
stroke(255, 0, 0);
noFill();
event.data.forEach(function(r) {
rect(r.x, r.y, r.width, r.height);
}); 
});
var gameCanvas = createCanvas(700, 700);
gameCanvas.parent('game');
walkX = -20;
walkY = -20;
walkR = width / 40;
player[0] = "Sheree";
player[1] = "Noble";
player[2] = "Clarence";
player[3] = "Walker";
player[4] = "Sheree";
playerColor[0] = color(255, 0, 0);
playerColor[1] = color(0, 255, 0);
playerColor[2] = color(0, 0, 255);
playerColor[3] = color(255, 255, 0);
playerColor[4] = color(255, 0, 0);
push();
imageMode(CENTER);
image(startImg, width / 2, height / 2, 640, 480);
textAlign(CENTER);
fill(255);
strokeWeight(3);
stroke(0);
textSize(32);
text("This is...", width * 0.2, height * 0.45);
textSize(50);
strokeWeight(3);
stroke(0);
text("Walker, Texas Gamer!!!", width / 2, height * 0.60);
textSize(24);
text("Ladies roll first..", width * 0.6, height * 0.73);
pop();
}
function draw() {
step();
display();
checkWinner();
if (isMoving) {
push();
textSize(18);
stroke(255);
strokeWeight(1);
fill(255);
text("You rolled:",
width * 0.12, height * 0.7);
textSize(64);
text(currentDiceCount, width * 0.15, height * 0.78);
textSize(18);
text("...right????", width * 0.20, height * 0.81);
text("(if not, press spacebar again and/or move the dice)",
width * 0.12, height * 0.86);
pop();
}
}
function keyPressed() {
if (keyCode == 32) {
if (!isMoving) {
playerCount++;  
if (playerCount > 3) {
playerCount = 0;
}
}
isMoving = true;
fill(0);
image(img, 0, height / 20, width, height);
borders();
walkX = width / 2;
walkY = height / 2;
currentDiceCount = diceCount;
}
}
function display() {
strokeWeight(1);
fill(150, 0, 255);
ellipse(walkX, walkY, walkR, walkR);
}
function step() {
let ran = random(1) + (diceCount/12) * weightVal;
if (isMoving == true) {
if (playerCount === 0 || playerCount === 5) {
if (ran < 0.25) {
walkY-= speed;
} else if (ran < 0.5) {
walkX+= speed;
} else if (ran < 0.75) {
walkY+= speed;
} else if (ran > 0.75) {
walkX-= speed; 
}
} else if (playerCount == 1) {
if (ran < 0.25) {
walkX+= speed;
} else if (ran < 0.5) {
walkY+= speed;
} else if (ran < 0.75) {
walkX-= speed;
} else if (ran > 0.75) {
walkY-= speed;
}
} else if (playerCount == 2) {
if (ran < 0.25) {
walkY+= speed;
} else if (ran < 0.5) {
walkX-= speed;
} else if (ran < 0.75) {
walkY-= speed;
} else if (ran > 0.75) {
walkX+= speed;
}
} else if (playerCount == 3) {
if (ran < 0.25) {
walkX-= speed;
} else if (ran < 0.5) {
walkY-= speed;
} else if (ran < 0.75) {
walkX+= speed;
} else if (ran > 0.75) {
walkY+= speed;
}
} else if (isMoving == false) {
stepX = 1;
stepY = 1;
walkX += 0;
walkY += 0;
}
}
}
function checkWinner() {
let textX = width * 0.2;
let offset1 = 125;
let offset2 = 330;
if (walkX <= width / 10 && walkX > 0) {
turnOver = true;
isMoving = false;
textFlag = false;
background(255, 0, 0);
push();
textAlign(CENTER);
textSize(64);
fill(150, 0, 255);
text("Sheree Wins!!!", width / 2, height / 2);
textSize(32);
text("And it's  ", textX, 3 * height / 4);
push();
stroke(0);
strokeWeight(2);
fill(playerColor[playerCount + 1])
text(player[playerCount + 1] + "'s", textX + offset1, 3 * height / 4);
pop();
text(" turn to roll now...", textX + offset2, 3 * height / 4);
text("Then press SPACEBAR to run the Walker!", width / 2, height * 0.80);
pop();
}
if (walkY <= height / 10 && walkY > 0) {
turnOver = true;
isMoving = false;
textFlag = false;
background(0, 255, 0);
push();
textAlign(CENTER);
textSize(64);
fill(150, 0, 255);
text("Noble Wins!!!", width / 2, height / 2);
textSize(32);
text("And it's  ", textX, 3 * height / 4);
push();
stroke(0);
strokeWeight(2);
fill(playerColor[playerCount + 1]);
text(player[playerCount + 1] + "'s", textX + offset1, 3 * height / 4);
pop();
text("turn to roll now...", textX + offset2, 3 * height / 4);
text("Then press SPACEBAR to run the Walker!", width / 2, height * 0.80);
pop();
}
if (walkX >= (width - (width / 10)) && walkX > 0) {
turnOver = true;
isMoving = false;
textFlag = false;
background(0, 0, 255);
push();
textAlign(CENTER);
textSize(64);
fill(150, 0, 255);
text("Clarence Wins!!!", width / 2, height / 2);
textSize(32);
text("And it's  ", textX, 3 * height / 4);
push();
stroke(0);
strokeWeight(2);
fill(playerColor[playerCount + 1]);
text(player[playerCount + 1] + "'s", textX + offset1, 3 * height / 4);
pop();
text(" turn to roll now...", textX + offset2, 3 * height / 4);
text("Then press SPACEBAR to run the Walker!", width / 2, height * 0.80);
pop();
}
if (walkY >= (height - (height / 10)) && walkY > 0) {
turnOver = true;
isMoving = false;
textFlag = false;
background(255, 255, 0);
push();
textAlign(CENTER);
textSize(64);
fill(150, 0, 255);
text("WALKER Wins!!!", width / 2, height / 2);
textSize(32);
text("And it's  ", textX, 3 * height / 4);
push();
stroke(0);
strokeWeight(2);
fill(playerColor[playerCount + 1]);
text(player[playerCount + 1] + "'s", textX + offset1, 3 * height / 4);
pop();
text(" turn to roll now...", textX + offset2, 3 * height / 4);
text("Then press SPACEBAR to run the Walker!", width / 2, height * 0.80);
pop();
}
}
function borders() {
if (playerCount == 0) {
push();
stroke(255);
strokeWeight(4);
fill(255, 0, 0);
quad(0, 0, width / 10, height / 10, width / 10, height - (height / 10), 0, height);
pop();
} else {
fill(255, 0, 0);
quad(0, 0, width / 10, height / 10, width / 10, height - (height / 10), 0, height);
}
if (playerCount == 1) {
push();
stroke(255);
strokeWeight(4);
fill(0, 255, 0);
quad(0, 0, width / 10, height / 10, width - (width / 10), height / 10, width, 0);
pop();
} else {
fill(0, 255, 0);
quad(0, 0, width / 10, height / 10, width - (width / 10), height / 10, width, 0);
}
if (playerCount == 2) {
push();
stroke(255);
strokeWeight(4);
fill(0, 0, 255);
quad(width - (width / 10), (height / 10), width, 0, width, height, width - (width / 10), height - (height / 10));
pop();
} else {
fill(0, 0, 255);
quad(width - (width / 10), (height / 10), width, 0, width, height, width - (width / 10), height - (height / 10));
}
if (playerCount == 3) {
push();
stroke(255);
strokeWeight(4);
fill(255, 255, 0);
quad(width - (width / 10), height - (height / 10), width, height, 0, height, width / 10, height - (height / 10));
pop();
} else {
fill(255, 255, 0);
quad(width - (width / 10), height - (height / 10), width, height, 0, height, width / 10, height - (height / 10));
}
}
want to build a timer with visible counter to auto restart after x seconds 
scoreboard
percentages of likelihood walker
alignment and camera procedures
let r = random(1);
if (playerCount = 1) {
r * diceCount/12
if (r < 0.25) {
x--;
} else if (r < 0.5) {
y--;
} else if (r < 0.75) {
x++;
}else if (r < 1) {
y++;
}
let img, startImg;
let isMoving = false;
let speed = 5;
let walkX, walkY, wlakR, stepX, stepY;
let textFlag = false;
let capture;
let tracker;
let playerCount = -1;
let player = [];
let playerColor = [];
let turnOver = false;
let diceCount;
let currentDiceCount;
let weightVal = 0.3;
let showGrid = false;
let rhi, ghi, bhi;
let rlo, glo, blo;
function preload() {
img = loadImage("assets/players.jpg");
startImg = loadImage("assets/cover.jpg");
}
function setTarget(r, g, b, range) {
range = range || 32;
rhi = r + range;
rlo = r - range;
ghi = g + range;
glo = g - range;
bhi = b + range;
blo = b - range;
}
function setup() {
var w = 640, h = 480;
capture = createCapture(VIDEO);
capture.size(w, h);
capture.parent('camera');
cnv = createCanvas(w, h);
cnv.parent('container');
setTarget(0, 0, 0, 70);
tracking.ColorTracker.registerColor('match', function(r, g, b) {
if (r <= rhi && r >= rlo &&
g <= ghi && g >= glo &&
b <= bhi && b >= blo) {
return true;
}
return false;
});
tracker = new tracking.ColorTracker(['match']);
tracking.track('#p5video', tracker, {
camera: true
});
tracker.on('track', function(event) {
diceCount = event.data.length;
stroke(255, 0, 0);
noFill();
event.data.forEach(function(r) {
rect(r.x, r.y, r.width, r.height);
}); 
});
var gameCanvas = createCanvas(700, 700);
gameCanvas.parent('game');
walkX = -20;
walkY = -20;
walkR = width / 40;
player[0] = "Sheree";
player[1] = "Noble";
player[2] = "Clarence";
player[3] = "Walker";
player[4] = "Sheree";
playerColor[0] = color(255, 0, 0);
playerColor[1] = color(0, 255, 0);
playerColor[2] = color(0, 0, 255);
playerColor[3] = color(255, 255, 0);
playerColor[4] = color(255, 0, 0);
push();
imageMode(CENTER);
image(startImg, width / 2, height / 2, 640, 480);
textAlign(CENTER);
fill(255);
strokeWeight(3);
stroke(0);
textSize(32);
text("This is...", width * 0.2, height * 0.45);
textSize(50);
strokeWeight(3);
stroke(0);
text("Walker, Texas Gamer!!!", width / 2, height * 0.60);
textSize(24);
text("Ladies roll first..", width * 0.6, height * 0.73);
pop();
}
function draw() {
step();
display();
checkWinner();
if (isMoving) {
push();
textSize(18);
stroke(255);
strokeWeight(1);
fill(255);
text("You rolled:",
width * 0.12, height * 0.7);
textSize(64);
text(currentDiceCount, width * 0.15, height * 0.78);
textSize(18);
text("...right????", width * 0.20, height * 0.81);
text("(if not, press spacebar again and/or move the dice)",
width * 0.12, height * 0.86);
pop();
}
}
function keyPressed() {
if (keyCode == 32) {
if (!isMoving) {
playerCount++;  
if (playerCount > 3) {
playerCount = 0;
}
}
isMoving = true;
fill(0);
image(img, 0, height / 20, width, height);
borders();
walkX = width / 2;
walkY = height / 2;
currentDiceCount = diceCount;
}
}
function display() {
strokeWeight(1);
fill(150, 0, 255);
ellipse(walkX, walkY, walkR, walkR);
}
function step() {
let ran = random(1) + (diceCount/12) * weightVal;
if (isMoving == true) {
if (playerCount === 0 || playerCount === 5) {
if (ran < 0.25) {
walkY-= speed;
} else if (ran < 0.5) {
walkX+= speed;
} else if (ran < 0.75) {
walkY+= speed;
} else if (ran > 0.75) {
walkX-= speed; 
}
} else if (playerCount == 1) {
if (ran < 0.25) {
walkX+= speed;
} else if (ran < 0.5) {
walkY+= speed;
} else if (ran < 0.75) {
walkX-= speed;
} else if (ran > 0.75) {
walkY-= speed;
}
} else if (playerCount == 2) {
if (ran < 0.25) {
walkY+= speed;
} else if (ran < 0.5) {
walkX-= speed;
} else if (ran < 0.75) {
walkY-= speed;
} else if (ran > 0.75) {
walkX+= speed;
}
} else if (playerCount == 3) {
if (ran < 0.25) {
walkX-= speed;
} else if (ran < 0.5) {
walkY-= speed;
} else if (ran < 0.75) {
walkX+= speed;
} else if (ran > 0.75) {
walkY+= speed;
}
} else if (isMoving == false) {
stepX = 1;
stepY = 1;
walkX += 0;
walkY += 0;
}
}
}
function checkWinner() {
let textX = width * 0.2;
let offset1 = 125;
let offset2 = 330;
if (walkX <= width / 10 && walkX > 0) {
turnOver = true;
isMoving = false;
textFlag = false;
background(255, 0, 0);
push();
textAlign(CENTER);
textSize(64);
fill(150, 0, 255);
text("Sheree Wins!!!", width / 2, height / 2);
textSize(32);
text("And it's  ", textX, 3 * height / 4);
push();
stroke(0);
strokeWeight(2);
fill(playerColor[playerCount + 1])
text(player[playerCount + 1] + "'s", textX + offset1, 3 * height / 4);
pop();
text(" turn to roll now...", textX + offset2, 3 * height / 4);
text("Then press SPACEBAR to run the Walker!", width / 2, height * 0.80);
pop();
}
if (walkY <= height / 10 && walkY > 0) {
turnOver = true;
isMoving = false;
textFlag = false;
background(0, 255, 0);
push();
textAlign(CENTER);
textSize(64);
fill(150, 0, 255);
text("Noble Wins!!!", width / 2, height / 2);
textSize(32);
text("And it's  ", textX, 3 * height / 4);
push();
stroke(0);
strokeWeight(2);
fill(playerColor[playerCount + 1]);
text(player[playerCount + 1] + "'s", textX + offset1, 3 * height / 4);
pop();
text("turn to roll now...", textX + offset2, 3 * height / 4);
text("Then press SPACEBAR to run the Walker!", width / 2, height * 0.80);
pop();
}
if (walkX >= (width - (width / 10)) && walkX > 0) {
turnOver = true;
isMoving = false;
textFlag = false;
background(0, 0, 255);
push();
textAlign(CENTER);
textSize(64);
fill(150, 0, 255);
text("Clarence Wins!!!", width / 2, height / 2);
textSize(32);
text("And it's  ", textX, 3 * height / 4);
push();
stroke(0);
strokeWeight(2);
fill(playerColor[playerCount + 1]);
text(player[playerCount + 1] + "'s", textX + offset1, 3 * height / 4);
pop();
text(" turn to roll now...", textX + offset2, 3 * height / 4);
text("Then press SPACEBAR to run the Walker!", width / 2, height * 0.80);
pop();
}
if (walkY >= (height - (height / 10)) && walkY > 0) {
turnOver = true;
isMoving = false;
textFlag = false;
background(255, 255, 0);
push();
textAlign(CENTER);
textSize(64);
fill(150, 0, 255);
text("WALKER Wins!!!", width / 2, height / 2);
textSize(32);
text("And it's  ", textX, 3 * height / 4);
push();
stroke(0);
strokeWeight(2);
fill(playerColor[playerCount + 1]);
text(player[playerCount + 1] + "'s", textX + offset1, 3 * height / 4);
pop();
text(" turn to roll now...", textX + offset2, 3 * height / 4);
text("Then press SPACEBAR to run the Walker!", width / 2, height * 0.80);
pop();
}
}
function borders() {
if (playerCount == 0) {
push();
stroke(255);
strokeWeight(4);
fill(255, 0, 0);
quad(0, 0, width / 10, height / 10, width / 10, height - (height / 10), 0, height);
pop();
} else {
fill(255, 0, 0);
quad(0, 0, width / 10, height / 10, width / 10, height - (height / 10), 0, height);
}
if (playerCount == 1) {
push();
stroke(255);
strokeWeight(4);
fill(0, 255, 0);
quad(0, 0, width / 10, height / 10, width - (width / 10), height / 10, width, 0);
pop();
} else {
fill(0, 255, 0);
quad(0, 0, width / 10, height / 10, width - (width / 10), height / 10, width, 0);
}
if (playerCount == 2) {
push();
stroke(255);
strokeWeight(4);
fill(0, 0, 255);
quad(width - (width / 10), (height / 10), width, 0, width, height, width - (width / 10), height - (height / 10));
pop();
} else {
fill(0, 0, 255);
quad(width - (width / 10), (height / 10), width, 0, width, height, width - (width / 10), height - (height / 10));
}
if (playerCount == 3) {
push();
stroke(255);
strokeWeight(4);
fill(255, 255, 0);
quad(width - (width / 10), height - (height / 10), width, height, 0, height, width / 10, height - (height / 10));
pop();
} else {
fill(255, 255, 0);
quad(width - (width / 10), height - (height / 10), width, height, 0, height, width / 10, height - (height / 10));
}
}
want to build a timer with visible counter to auto restart after x seconds 
scoreboard
percentages of likelihood walker
alignment and camera procedures
let r = random(1);
if (playerCount = 1) {
r * diceCount/12
if (r < 0.25) {
x--;
} else if (r < 0.5) {
y--;
} else if (r < 0.75) {
x++;
}else if (r < 1) {
y++;
}
function setup () {
vid = createCapture(VIDEO);
createCanvas(640,480);
}
function draw () {
image(vid, 0, 0);
let img, startImg;
let isMoving = false;
let speed = 10;
let x, y, r, stepX, stepY;
let textFlag = false;
let capture;
let tracker;
let diceCount;
let currentDiceCount;
let showGrid = false;
let rhi, ghi, bhi;
let rlo, glo, blo;
function preload() {
img = loadImage("assets/players.jpg");
startImg = loadImage("assets/cover.jpg");
}
function setTarget(r, g, b, range) {
range = range || 32;
rhi = r + range; rlo = r - range;
ghi = g + range; glo = g - range;
bhi = b + range; blo = b - range;
} 
function setup() {
var w = 640, h = 480;
capture = createCapture(VIDEO);
capture.size(w, h);
capture.parent('camera');
setTarget(0 , 0, 0, 20);
tracking.ColorTracker.registerColor('match', function(r, g, b) {
if(r <= rhi && r >= rlo &&
g <= ghi && g >= glo &&
b <= bhi && b >= blo) {
return true;
}
return false;
});
tracker = new tracking.ColorTracker(['match']);
tracking.track('#p5video', tracker, { camera: true });
tracker.on('track', function(event) {
console.log(event.data.length);
diceCount = event.data.filter(d => {
if (d.width < 1 || d.height < 1) return false
else return true
}).length;
});
var gameCanvas = createCanvas(700, 700);
gameCanvas.parent('container');
x = -20;
y = -20;
r = width / 40;
push();
imageMode(CENTER);
image(startImg, width/2, height/2, 640, 480);
textAlign(CENTER);
fill(255);
strokeWeight(3);
stroke(0);
textSize(32);
text("This is...", width*0.2, height*0.45);
textSize(50);
strokeWeight(3);
stroke(0);
text("Walker, Texas Gamer!!!", width / 2, height* 0.60);
textSize(24);
text("Ladies roll first..", width*0.6, height*0.73);
pop();
}
function draw() {
step();
display();
checkWinner();
if (textFlag) {
text(currentDiceCount,50,50);
}
}
function keyPressed() {
if (keyCode == 32) {
isMoving = true;
fill(0);
image(img, 0, height / 20, width, height);
borders();
x = width / 2;
y = height / 2;
}
if (keyCode == 32) {
isMoving = true;
fill(0);
image(img, 0, height / 20, width, height);
borders();
x = width / 2;
y = height / 2;
textFlag = !textFlag;
currentDiceCount = diceCount;
}
}
function display() {
strokeWeight(1);
fill(150, 0, 255);
ellipse(x, y, r, r);
}
function step() {
if (isMoving == true) {
stepX = int(random(3)) - 1;
stepY = int(random(3)) - 1;
x += stepX * speed;
y += stepY * speed;
} else if (isMoving == false) {
stepX = 1;
stepY = 1;
x += 0;
y += 0;
}
}
function restartGame() {
}
function checkWinner() {
if (x <= width / 10 && x > 0) {
isMoving = false;
background(255, 0, 0);
push();
textAlign(CENTER);
textSize(64);
fill(150, 0, 255);
text("Sheree Wins!!!", width / 2, height / 2);
textSize(32);
text("Press Space Bar to play again...", width / 2, 3 * height / 4);
pop();
}
if (y <= height / 10 && x > 0) {
isMoving = false;
background(0, 255, 0);
push();
textAlign(CENTER);
textSize(64);
fill(150, 0, 255);
text("Noble Wins!!!", width / 2, height / 2);
textSize(32);
text("Press Space Bar to play again...", width / 2, 3 * height / 4);
pop();
}
if (x >= (width - (width / 10)) && x > 0) {
isMoving = false;
background(0, 0, 255);
push();
textAlign(CENTER);
textSize(64);
fill(150, 0, 255);
text("Clarence Wins!!!", width / 2, height / 2);
textSize(32);
text("Press Space Bar to play again...", width / 2, 3 * height / 4);
pop();
}
if (y >= (height - (height / 10)) && x > 0) {
isMoving = false;
background(255, 255, 0);
push();
textAlign(CENTER);
textSize(64);
fill(150, 0, 255);
text("WALKER Wins!!!", width / 2, height / 2);
textSize(32);
text("Press Space Bar to play again...", width / 2, 3 * height / 4);
pop();
}
}
function borders() {
fill(0, 255, 0);
quad(0, 0, width / 10, height / 10, width - (width / 10), height / 10, width, 0);
fill(0, 0, 255);
quad(width - (width / 10), (height / 10), width, 0, width, height, width - (width / 10), height - (height / 10));
fill(255, 0, 0);
quad(0, 0, width / 10, height / 10, width / 10, height - (height / 10), 0, height);
fill(255, 255, 0);
quad(width - (width / 10), height - (height / 10), width, height, 0, height, width / 10, height - (height / 10));
}
function keyPressed() {
if (key == 13) {
image(img, 0, 0, width, height);
borders();
x = width / 2;
y = height / 2;
}
}
want to build a timer with visible counter to auto restart after x seconds 
scoreboard
percentages of likelihood walker
alignment and camera procedures
var tracker;
var diceCount;
var showGrid = false;
var rhi, ghi, bhi;
var rlo, glo, blo;
function setTarget(r, g, b, range) {
range = range || 32;
rhi = r + range; rlo = r - range;
ghi = g + range; glo = g - range;
bhi = b + range; blo = b - range;
} 
function setup() {
var w = 640, h = 480;
capture = createCanvas(VIDEO);
capture.size(w, h);
capture.parent('container');
cnv = createCanvas(w, h);
cnv.parent('container');
ellipseMode(CORNER);
tracking.ColorTracker.registerColor('match', function(r, g, b) {
if(r <= rhi && r >= rlo &&
g <= ghi && g >= glo &&
b <= bhi && b >= blo) {
return true;
}
return false;
});
tracker = new tracking.ColorTracker(['match']);
tracking.track('#p5video', tracker, { camera: true });
tracker.on('track', function(event) {
clear();
strokeWeight(2);
stroke(255, 0, 0);
noFill();
event.data.forEach(function(r) {
ellipse(r.x, r.y, r.width, r.height);
}); 
diceCount = event.data.filter(d => {
if (d.width < 1 || d.height < 1) return false
else return true
}).length;
});
}
function keyPressed() {
if (keyCode === 71) {
showGrid = !showGrid;
}
if (key == ' ') {
text(diceCount,10,10);
console.log('space is pressed')
console.log('Dice Count: ', diceCount)
} 
}
function draw() {
if (showGrid == true) {
noStroke();
fill(255,0,0,90);
rect(width / 2 - 1, 0, 2 , height);
rect(0, height/2 - 1, width, 2);
}
textSize(32);
text("Dice Count: " + diceCount, 50, 50);
image(capture, 0, 0);
}
let img, startImg;
let isMoving = false;
let speed = 10;
let x, y, r, stepX, stepY;
function preload() {
img = loadImage("assets/players.jpg");
startImg = loadImage("assets/cover.jpg");
}
function setup() {
createCanvas(700, 700);
x = -20;
y = -20;
r = width / 40;
push();
imageMode(CENTER);
image(startImg, width/2, height/2, 640, 480);
textAlign(CENTER);
fill(255);
strokeWeight(3);
stroke(0);
textSize(32);
text("This is...", width*0.2, height*0.45);
textSize(50);
strokeWeight(3);
stroke(0);
text("Walker, Texas Gamer!!!", width / 2, height* 0.60);
textSize(24);
text("Ladies roll first..", width*0.6, height*0.73);
pop();
}
function draw() {
step();
display();
checkWinner();
}
function keyPressed() {
if (keyCode == 32) {
isMoving = true;
fill(0);
image(img, 0, height / 20, width, height);
borders();
x = width / 2;
y = height / 2;
}
}
function display() {
strokeWeight(1);
fill(150, 0, 255);
ellipse(x, y, r, r);
}
function step() {
if (isMoving == true) {
stepX = int(random(3)) - 1;
stepY = int(random(3)) - 1;
x += stepX * speed;
y += stepY * speed;
} else if (isMoving == false) {
stepX = 1;
stepY = 1;
x += 0;
y += 0;
}
}
function restartGame() {
}
function checkWinner() {
if (x <= width / 10 && x > 0) {
isMoving = false;
background(255, 0, 0);
push();
textAlign(CENTER);
textSize(64);
fill(150, 0, 255);
text("Sheree Wins!!!", width / 2, height / 2);
textSize(32);
text("Press Space Bar to play again...", width / 2, 3 * height / 4);
pop();
}
if (y <= height / 10 && x > 0) {
isMoving = false;
background(0, 255, 0);
push();
textAlign(CENTER);
textSize(64);
fill(150, 0, 255);
text("Noble Wins!!!", width / 2, height / 2);
textSize(32);
text("Press Space Bar to play again...", width / 2, 3 * height / 4);
pop();
}
if (x >= (width - (width / 10)) && x > 0) {
isMoving = false;
background(0, 0, 255);
push();
textAlign(CENTER);
textSize(64);
fill(150, 0, 255);
text("Clarence Wins!!!", width / 2, height / 2);
textSize(32);
text("Press Space Bar to play again...", width / 2, 3 * height / 4);
pop();
}
if (y >= (height - (height / 10)) && x > 0) {
isMoving = false;
background(255, 255, 0);
push();
textAlign(CENTER);
textSize(64);
fill(150, 0, 255);
text("WALKER Wins!!!", width / 2, height / 2);
textSize(32);
text("Press Space Bar to play again...", width / 2, 3 * height / 4);
pop();
}
}
function borders() {
fill(0, 255, 0);
quad(0, 0, width / 10, height / 10, width - (width / 10), height / 10, width, 0);
fill(0, 0, 255);
quad(width - (width / 10), (height / 10), width, 0, width, height, width - (width / 10), height - (height / 10));
fill(255, 0, 0);
quad(0, 0, width / 10, height / 10, width / 10, height - (height / 10), 0, height);
fill(255, 255, 0);
quad(width - (width / 10), height - (height / 10), width, height, 0, height, width / 10, height - (height / 10));
}
function keyPressed() {
if (key == 13) {
image(img, 0, 0, width, height);
borders();
x = width / 2;
y = height / 2;
}
}
want to build a timer with visible counter to auto restart after x seconds 
scoreboard
percentages of likelihood walker
alignment and camera procedures
let img, startImg;
let isMoving = false;
let speed = 10;
let x, y, r, stepX, stepY;
function preload() {
img = loadImage("assets/players.jpg");
startImg = loadImage("assets/cover.jpg");
}
function setup() {
createCanvas(700, 700);
x = -20;
y = -20;
r = width / 40;
push();
imageMode(CENTER);
image(startImg, width/2, height/2, 640, 480);
textAlign(CENTER);
fill(255);
strokeWeight(3);
stroke(0);
textSize(32);
text("This is...", width*0.2, height*0.45);
textSize(50);
strokeWeight(3);
stroke(0);
text("Walker, Texas Gamer!!!", width / 2, height* 0.60);
textSize(24);
text("Press Space Bar to begin..", width*0.6, height*0.73);
pop();
}
function draw() {
step();
display();
checkWinner();
}
function keyPressed() {
if (keyCode == 32) {
isMoving = true;
fill(0);
image(img, 0, height / 20, width, height);
borders();
x = width / 2;
y = height / 2;
}
}
function display() {
strokeWeight(1);
fill(150, 0, 255);
ellipse(x, y, r, r);
}
function step() {
if (isMoving == true) {
stepX = int(random(3)) - 1;
stepY = int(random(3)) - 1;
x += stepX * speed;
y += stepY * speed;
} else if (isMoving == false) {
stepX = 1;
stepY = 1;
x += 0;
y += 0;
}
}
function restartGame() {
}
function checkWinner() {
if (x <= width / 10 && x > 0) {
isMoving = false;
background(255, 0, 0);
push();
textAlign(CENTER);
textSize(64);
fill(150, 0, 255);
text("Sheree Wins!!!", width / 2, height / 2);
textSize(32);
text("Press Space Bar to play again...", width / 2, 3 * height / 4);
pop();
}
if (y <= height / 10 && x > 0) {
isMoving = false;
background(0, 255, 0);
push();
textAlign(CENTER);
textSize(64);
fill(150, 0, 255);
text("Noble Wins!!!", width / 2, height / 2);
textSize(32);
text("Press Space Bar to play again...", width / 2, 3 * height / 4);
pop();
}
if (x >= (width - (width / 10)) && x > 0) {
isMoving = false;
background(0, 0, 255);
push();
textAlign(CENTER);
textSize(64);
fill(150, 0, 255);
text("Clarence Wins!!!", width / 2, height / 2);
textSize(32);
text("Press Space Bar to play again...", width / 2, 3 * height / 4);
pop();
}
if (y >= (height - (height / 10)) && x > 0) {
isMoving = false;
background(255, 255, 0);
push();
textAlign(CENTER);
textSize(64);
fill(150, 0, 255);
text("WALKER Wins!!!", width / 2, height / 2);
textSize(32);
text("Press Space Bar to play again...", width / 2, 3 * height / 4);
pop();
}
}
function borders() {
fill(0, 255, 0);
quad(0, 0, width / 10, height / 10, width - (width / 10), height / 10, width, 0);
fill(0, 0, 255);
quad(width - (width / 10), (height / 10), width, 0, width, height, width - (width / 10), height - (height / 10));
fill(255, 0, 0);
quad(0, 0, width / 10, height / 10, width / 10, height - (height / 10), 0, height);
fill(255, 255, 0);
quad(width - (width / 10), height - (height / 10), width, height, 0, height, width / 10, height - (height / 10));
}
function keyPressed() {
if (key == 13) {
image(img, 0, 0, width, height);
borders();
x = width / 2;
y = height / 2;
}
}
want to build a timer with visible counter to auto restart after x seconds 
scoreboard
percentages of likelihood walker
alignment and camera procedures
let restartTime = 5;
let charactersBkgd;
let moving = false;
function Walker() {
this.speed = 30;
this.x = width / 2;
this.y = height / 2;
this.r = width / 40;
this.display = function() {
stroke(5);
fill(150, 0, 255);
ellipse(this.x, this.y, this.r, this.r);
}
this.step = function() {
this.stepx = int(random(3)) - 1;
this.stepy = int(random(3)) - 1;
this.x += this.stepx * this.speed;
this.y += this.stepy * this.speed;
}
this.move = function() {
if (this.x > 0) {
if (this.x >= width - (width / 10) || this.x <= (width / 10)) {
moving = !moving;
}
}
if (this.y >= height - (height / 10) || this.y <= (height / 10)) {
moving = !moving;
}
if (!moving) {
this.display();
this.step();
} else if (moving) {
checkWinner();
restartGame();
}
}
}
function restartGame() {
walker.x = -1;
}
function checkWinner() {
if (walker.x <= width / 10 && walker.x > 0) {
background(255, 0, 0);
push();
textAlign(CENTER);
textSize(64);
fill(150, 0, 255);
text("Sheree Wins!!!", width / 2, height / 2);
textSize(32);
text("Press Space Bar to play again...", width / 2, 3 * height / 4);
pop();
}
if (walker.y <= height / 10 && walker.x > 0) {
background(0, 255, 0);
push();
textAlign(CENTER);
textSize(64);
fill(150, 0, 255);
text("Noble Wins!!!", width / 2, height / 2);
textSize(32);
text("Press Space Bar to play again...", width / 2, 3 * height / 4);
pop();
}
if (walker.x >= (width - (width / 10)) && walker.x > 0) {
background(0, 0, 255);
push();
textAlign(CENTER);
textSize(64);
fill(150, 0, 255);
text("Clarence Wins!!!", width / 2, height / 2);
textSize(32);
text("Press Space Bar to play again...", width / 2, 3 * height / 4);
pop();
}
if (walker.y >= (height - (height / 10)) && walker.x > 0) {
background(255, 255, 0);
push();
textAlign(CENTER);
textSize(64);
fill(150, 0, 255);
text("WALKER Wins!!!", width / 2, height / 2);
textSize(32);
text("Press Space Bar to play again...", width / 2, 3 * height / 4);
pop();
}
}
function setup() {
createCanvas(700, 700);
charactersBkgd = loadImage("assets/players.jpg", gotResults);
walker = new Walker();
borders();
}
function gotResults() {
}
function draw() {
walker.move();
if (walker.x = -1 && keyIsPressed) {
if (key == 32) {
walker.x = width / 2;
walker.y = height / 2;
moving = !moving;
}
}
void startScreen () {
if (w.x == 100000) {
fill(150, 100, 200);
textSize(50);
text("Hi, y'all!", width/3, height/3);
textSize(40);
text("Let's git riddy to gayumble!", width/2, 2*height/2);
text("Just press SPACEBAR to begin the game...", width/2, 3*height/4);
}
if (keyPressed) {
if (key == 32) {
fill(0);
image(charactersBkgd, 0, 0, width, height);
borders();
w.x = width/2;
w.y = height/2;
}
}
}
void initScoreBoard () {
pushMatrix();
noStroke();
fill(255, 98);
rect(width/10 + 10, height*(0.75), width/6, height*(0.135));
fill(255);
textAlign(LEFT);
textSize(18);
text("Sheree:", width/10 + 20, height*(0.75) + 20);
text("Noble:", width/10 + 20, height*(0.75) + 40);
text("Clarence:", width/10 + 20, height*(0.75) + 60);
text("Walker:", width/10 + 20, height*(0.75) + 80);
textAlign(RIGHT);
text(p1Score, width/10 + width/6, height*(0.75) + 20);
text(p2Score, width/10 + width/6, height*(0.75) + 40);
text(p3Score, width/10 + width/6, height*(0.75) + 60);
text(p4Score, width/10 + width/6, height*(0.75) + 80);
popMatrix();
} 
void updateScoreBoard() {
pushMatrix();
fill(255);
textAlign(LEFT);
textSize(18);
text("Sheree:", width/10 + 20, height*(0.75) + 20);
text("Noble:", width/10 + 20, height*(0.75) + 40);
text("Clarence:", width/10 + 20, height*(0.75) + 60);
text("Walker:", width/10 + 20, height*(0.75) + 80);
textAlign(RIGHT);
text(p1Score, width/10 + width/6, height*(0.75) + 20);
text(p2Score, width/10 + width/6, height*(0.75) + 40);
text(p3Score, width/10 + width/6, height*(0.75) + 60);
text(p4Score, width/10 + width/6, height*(0.75) + 80);
popMatrix();
}
function borders() {
fill(0, 255, 0);
quad(0, 0, width / 10, height / 10, width - (width / 10), height / 10, width, 0);
fill(0, 0, 255);
quad(width - (width / 10), (height / 10), width, 0, width, height, width - (width / 10), height - (height / 10));
fill(255, 0, 0);
quad(0, 0, width / 10, height / 10, width / 10, height - (height / 10), 0, height);
fill(255, 255, 0);
quad(width - (width / 10), height - (height / 10), width, height, 0, height, width / 10, height - (height / 10));
}
function keyIsPressed() {
if (key == 13) {
fill(0);
image(charactersBkgd, 0, 0, width, height);
borders();
walker.x = width / 2;
walker.y = height / 2;
}
}
want to build a timer with visible counter to auto restart after x seconds 
scoreboard
percentages of likelihood walker
alignment and camera procedures
var tracker;
var diceCount;
var showGrid = false;
var rhi, ghi, bhi;
var rlo, glo, blo;
function setTarget(r, g, b, range) {
range = range || 32;
rhi = r + range; rlo = r - range;
ghi = g + range; glo = g - range;
bhi = b + range; blo = b - range;
} 
function setup() {
var w = 640, h = 480;
capture = createCapture(VIDEO);
capture.size(w, h);
capture.parent('container');
cnv = createCanvas(w, h);
cnv.parent('container');
tracking.ColorTracker.registerColor('match', function(r, g, b) {
if(r <= rhi && r >= rlo &&
g <= ghi && g >= glo &&
b <= bhi && b >= blo) {
return true;
}
return false;
});
tracker = new tracking.ColorTracker(['match']);
tracking.track('#p5video', tracker, { camera: true });
tracker.on('track', function(event) {
clear();
strokeWeight(2);
stroke(255, 0, 0);
noFill();
event.data.forEach(function(r) {
rect(r.x, r.y, r.width, r.height);
console.log('r.width: ', r.width); 
console.log('r.height: ', r.height);
}); 
diceCount = event.data.filter(d => {
if (d.width < 1 || d.height < 1 || d.width > 10 || d.height > 10) return false
else return true
}).length;
});
}
function keyPressed() {
if (keyCode === 71) {
showGrid = !showGrid;
}
}
function draw() {
if (showGrid == true) {
noStroke();
fill(255,0,0,90);
rect(width / 2 - 1, 0, 2 , height);
rect(0, height/2 - 1, width, 2);
}
textSize(32);
text("Dice Count: " + diceCount, 50, 50);
}
function setup() {
createCanvas(710, 400, WEBGL);
move = createSlider(1, 400, 10);
move.position(10, 10);
x = 10;
}
function draw() {
background(100);
noStroke();
fill(50);
push();
translate(-275, 175);
rotateY(1.25);
rotateX(-0.9);
box(move.value());
pop();
noFill();
stroke(255);
push();
moveIt =move.value();
translate(200, height * 0.35, x++ );
sphere(move.value());
pop();
}let square = {
constructor(x, y, l, w, opac) {
this.x: x,
this.y: y,
this.l: l,
this.w: w,
this.opac: opac
}
rect(this.x, this.y, this.l, this.w, this.opac);
}
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
let x = 0;
let y = 0;
let ang = 90;
let col = 0;
let moveC = 1;
let b;
let manip;
let timtimsong;
let amplitude;
let currentAmplitude;
let previousAmplitude;
let level;
let levelMap = 0;
let bkgdSliderVal = 0.01;
function preload() {
timtimsong = loadSound("timtim.mp3");
}
function setup() {
timtimsong.loop();
amplitude = new p5.Amplitude();
createCanvas(windowWidth, windowHeight);
imageMode(CENTER);
angleMode(DEGREES);
colorMode(HSB);
domObjects();
manip = 400 / 72;
textSize(24);
textAlign(LEFT);
smooth();
}
function draw() {
b = bValSlider.value();
manip = manipSlider.value();
let f = frameRateSlider.value();
frameRate(f);
bkgdColor();
donut(0, 0, 0);
instructions();
}
function donut(strokeH, strokeS, strokeB) {
push();
col += moveC;
fill(col * 2, 30, 75);
if (col >= 100 || col < 0) {
moveC = moveC * -1;
}
ang += 5;
let transX = windowWidth / 2 + sin(ang * 2);
let transY = windowHeight / 2 + cos(ang / 3) * 20;
translate(transX, (transY - 40));
rotate(x / ((b * sqrt(3) / levelMap)));
x += 5;
for (i = 0; i < 360; i += 13) {
let ellipseX = windowWidth / 20 + cos(i++) * windowWidth / manip;
let ellipseY = windowWidth / 20 + sin(i++) * windowWidth / manip;
let ellipseSize = windowWidth / 20;
level = amplitude.getLevel();
levelMap = map(level, 0, 1, 2, 10)
let SWSliderVal = map(strokeWeightSlider.value(), 0, 1, 0, 10);
stroke(strokeH, strokeS, strokeB);
strokeWeight(SWSliderVal);
ellipse(ellipseX, ellipseY, ellipseSize * b * levelMap);
}
pop();
}
function instructions() {
fill(255, 127);
}
function bkgdColor() {
push();
colorMode(RGB);
background(random(50, 75), random(50,100), random(10,50), sqrt(3));
pop();
}
function keyTyped() {
if (key === 'c') {
redraw();
}
}
function domObjects() {
bValSlider = createSlider(0.01, 0.2, 0.01, 0.0001);
bValSlider.position(windowWidth / 20, 16 * windowHeight / 20);
let manipRep = (400 / 72);
manipSlider = createSlider(2, 20, 8, 0.001);
manipSlider.position(windowWidth / 20, 17 * windowHeight / 20);
manip = manipSlider.value();
frameRateSlider = createSlider(12, 60, 30, 1);
frameRateSlider.position(windowWidth / 20, 18 * windowHeight / 20);
strokeWeightSlider = createSlider(0.01, 0.1, 0.03, 0.01);
strokeWeightSlider.position(windowWidth/20, 19*windowHeight/20);
}
let strokeX;
let startVal = 10;
let movingLoc;
let movingY;
let movingX;
let movingR;
let movingG;
let movingB;
function setup() {
createCanvas(400, 400);
background(50);
}
function draw() {
strokeX = strokeX + random(-1,1);
startVal = startVal + 1;
movingLoc = random(500);
movingY = random(720);
movingX = movingX+0.25;
movingR = random(200, 250);
movingG = random(100);
movingB = random(200, 255);
stroke(movingR, movingB, 100);
strokeWeight(((movingY+360)/10+movingX/50)+5);
line(movingX, movingY, movingX, movingY);
}
function mousePressed() {
background(50);
}
let strokeX;
let startVal = 10;
let movingLoc;
let movingY;
let movingX;
let movingR;
let movingG;
let movingB;
function setup() {
createCanvas(displayWidth, displayHeight);
background(0,50,10);
}
function draw() {
strokeX = strokeX + random(-1, 1);
startVal = startVal + 1;
movingLoc = random(500);
movingY = random(720);
movingX = random(1080);
movingR = random(10);
movingG = random(25,80);
movingB = random(200, 255);
stroke(movingR, movingG, 50);
strokeWeight(((movingY+360)/10+movingX/50)+5);
line(movingX, movingY, movingX, movingY);
}
function mousePressed() {
background(0,50,10);
}let numEllipses = 5;
let palette = [];
let x,y;
function setup() {
createCanvas(400, 400);
palette = [
color(240, 240, 203),
color(123, 196, 118),
color(61, 113, 83),
color(40, 68, 61),
color(26, 52, 64)
]
}
function draw() {
for (let i = 1; i <= numEllipses; i++) {
fill(palette[i-1]);
rect((width / 6) * i, (0.5 * height), 0.1 * width, );
}
}Walker w;
let p1Score = 0;
let p2Score = 0;
let p3Score = 0; 
let p4Score = 0;
let restartTime = 5;
PImage charactersBkgd;
function setup () {
createCanvas (700, 700);
charactersBkgd = loadImage("players.jpg");
image(charactersBkgd, 0, height/15, width, height);
borders();
w = new Walker();
textAlign(CENTER);
}
void draw () {
w.move();
}var capture;
var tracker;
var diceCount;
var showGrid = false;
var showCount = false;
var rhi, ghi, bhi;
var rlo, glo, blo;
function setTarget(r, g, b, range) {
range = range || 32;
rhi = r + range; rlo = r - range;
ghi = g + range; glo = g - range;
bhi = b + range; blo = b - range;
} 
function setup() {
var w = 640, h = 480;
capture = createCapture(VIDEO);
capture.size(w, h);
capture.parent('container');
cnv = createCanvas(w, h);
cnv.parent('container');
tracking.ColorTracker.registerColor('match', function(r, g, b) {
if(r <= rhi && r >= rlo &&
g <= ghi && g >= glo &&
b <= bhi && b >= blo) {
return true;
}
return false;
});
tracker = new tracking.ColorTracker(['match']);
tracking.track('#p5video', tracker, { camera: true });
tracker.on('track', function(event) {
clear();
strokeWeight(2);
stroke(255, 0, 0);
noFill();
event.data.forEach(function(r) {
rect(r.x, r.y, r.width, r.height);
}); 
diceCount = event.data.filter(d => {
if (d.width < 1 || d.height < 1) return false
else return true
}).length;
});
}
function keyPressed() {
if (keyCode === 71) {
showGrid = !showGrid;
}
if (keyIsPressed == ' ') {
showCount = !showCount
} else {showCount = false;}
}
function draw() {
if (showGrid == true) {
noStroke();
fill(255,0,0,90);
rect(width / 2 - 1, 0, 2 , height);
rect(0, height/2 - 1, width, 2);
}
if (keyIsDown(32)) {
textSize(32);
text("Dice Count: " + diceCount, 50, 50);
}
}
let mobeilenet;
let classifier;
let video;
let puffin;
var label = 'test';
let twoButton;
let threeButton;
let fourButton;
let show = false;
function modelReady() {
console.log('Model is ready!');
}
function videoReady() {
}
function whileTraining(loss) {
if (loss == null) {
classifier.classify(gotResults);
} else {
}
}
function gotResults(error, result) {
if (error) {
} else {
label = result;
classifier.classify(gotResults);
}
}
function setup() {
createCanvas(320, 270);
video = createCapture(VIDEO);
video.hide();
mobilenet = ml5.featureExtractor('MobileNet', modelReady);
classifier = mobilenet.classification(video, videoReady);
twoButton = createButton('two');
twoButton.mousePressed(function() {
classifier.addImage('two');
});
threeButton = createButton('three');
threeButton.mousePressed(function() {
classifier.addImage('three');
});
trainButton = createButton('train');
trainButton.mousePressed(function() {
classifier.train(whileTraining);
});
saveButton = createButton('save');
saveButton.mousePressed(function() {
classifier.save();
});
}
function draw() {
background(255);
image(video, 0, 0, width, height);
if (show == true) {
noStroke();
fill(0);
rect(width / 2 - 1, 0, 2 , height);
rect(0, height/2 - 1, width, 2);
}
fill(255);
textSize(16);
text(label, 10, height - 10);
if (label == 'two') {
fill(255, 0, 0);
text("export dice number works", 10, height / 2);
}
}
function keyPressed() {
if (keyCode === 71) {
show = !show;
}
}let mobeilenet;
let puffin;
function modelReady() {
console.log('Model is ready!');
mobilenet.predict(puffin, gotResults);
}
function gotResults(error, results) {
if (error) {
} else {
let label = results[0].className;
let prob = results[0].probability;
fill(0);
textSize(64);
text(label, 10, height - 100);
createP(label);
createP(prob);
}
}
function imageReady() {
image(puffin, 0, 0, width, height);
}
function setup() {
createCanvas(640, 480);
puffin = createImg('assets/puffin.jpg', imageReady);
puffin.hide();
background(0);
mobilenet = ml5.imageClassifier('MobileNet', modelReady);
}let vid;
function setup() {
createCanvas(320, 240);
vid = createCapture();
vid.size(400,400);
noStroke();
}
function draw() { 
background(0);
vid.loadPixels();
for (let y = 0; y < height; y+=8) {
for (let x = 0; x < width; x+=8) {
var offset = ((y*width)+x)*4;
fill(vid.pixels[offset], 
vid.pixels[offset+ 1],
vid.pixels[offset+ 2]);
ellipse(x, y, 8, 8);
}      
}
}
ml5 Example
Webcam Image Classification using MobileNet and p5.js
This example uses a callback pattern to create the classifier
let classifier;
let video;
function setup() {
noCanvas();
video = createCapture(VIDEO);
classifier = ml5.imageClassifier('MobileNet', video, modelReady);  
}
function modelReady() {
select('#status').html('Model Loaded');
classifyVideo();
}
function classifyVideo() {
classifier.predict(gotResult);
}
function gotResult(err, results) {
select('#result').html(results[0].className);
select('#probability').html(nf(results[0].probability, 0, 2));
classifyVideo();
}let bubble = [];
let fillColors;
function setup() {
createCanvas(400, 400);
background(220);
fillColors = [(255, 230, 238), (255, 50, 238, 50), (255, 50, 20, 50)];
}
function draw() {
for (let i = 0; i < bubble.length; i++) {
bubble[i].display();
}
}
function mousePressed() {
bubble.push(new Bubble(random(width), 100));
if (bubble.length > 6) {
bubble.splice
}
class Bubble {
constructor(x, y) {
this.x = x;
this.y = y;
}
display() {
fill(fillColors[int(random(2))]);
ellipse(this.x + 55, this.y + 100, 150);
fill(150);
textSize(12);
textAlign(CENTER, CENTER);
}
move() {
this.y -= thts[0].intensity / 100;
}
}var poemData;
function preload() {
poemData = loadTable('assets/museum.csv', 'csv', 'header');
}
function setup() {
createCanvas(windowWidth, windowHeight);
}
function mousePressed() {
background(255);
text(poemData.getString(int(random(poemData.getRowCount())), "intros"), 10, 10);
text(poemData.getString(int(random(poemData.getRowCount())), "name") + ",", 30, 30);
text(poemData.getString(int(random(poemData.getRowCount())), "middles"), 50, 50);
text(poemData.getString(int(random(poemData.getRowCount())), "specials")+ ".", 70, 70);
text(poemData.getString(int(random(poemData.getRowCount())), "ends"), 90, 90);
text(poemData.getString(int(random(poemData.getRowCount())), "closing")+ "...", 110, 110);
}
function draw() {
}var classifier;
var canvas;
var img;
function setup() {
canvas = createCanvas(400, 400);
canvas.drop(gotFile);
classifier = ml5.imageClassifier('MobileNet', gotModel);
}
function gotModel() {
}
function gotFile(daFile) {
img = createImg(daFile.data, imageReady).hide();
}
function imageReady() {
classifier.predict(img, gotResult);
background(0);
image(img, 0, 0, width, height);
}
function gotResult(error, data) {
console.log(data);
textSize(20);
fill(255,0,0);
text(data[0].className, 20,20);
}
function draw() {
}var c, w, h, x;
var song, webCam, lastMillis;
function setup() {
createCanvas(windowWidth, windowHeight);
img = createCapture(VIDEO);
img.size(windowWidth, windowHeight);
img.position(0, 0);
loadPixels();
img.hide();
imageMode(CORNERS);
}
function draw() {
image(img,0,0);
if(lastMillis - millis() > 200) {
image(img,x++,100);
}
lastMillis = millis();
}var c, w, h, mic, length, plevelMap;
var song, webCam;
function preload () {
song = loadSound('/assets/song.mp3');
}
function setup() {
song.loop();
createCanvas(windowWidth, windowHeight);
w = windowWidth;
h = windowHeight;
c = color(random(255), random(255), random(255));
img = createCapture(VIDEO);
img.size(windowWidth, windowHeight);
img.position(windowWidth/4, windowHeight/4);
loadPixels();
img.hide();
mic = new p5.AudioIn();
mic.start();
amplitude = new p5.Amplitude();
amplitude.setInput(song);
length = 3000;
angleMode(DEGREES);
}
function draw() {
background(c, 10);
translate(w / 2, h / 2);
level = amplitude.getLevel();
levelMap = map(level, 0, 1, -5, w - w / 10);
levelLerp = lerp(levelMap,plevelMap, 0.2);
for (var i = 0; i < levelMap; i++) { 
rotate(level);
ellipse(w / 4 * cos(i * 15.1 * level), h / 4 * sin(i * 15), w / 10);
}
plevelMap = levelMap;
}let classifier;
let video;
function setup() {
noCanvas();
video = createCapture(VIDEO);
classifier = ml5.imageClassifier('MobileNet', video, modelReady);  
}
function modelReady() {
select('#status').html('Model Loaded');
classifyVideo();
}
function classifyVideo() {
classifier.predict(gotResult);
}
function gotResult(err, results) {
select('#result').html(results[0].className);
select('#probability').html(nf(results[0].probability, 0, 2));
classifyVideo();
}
var c, d;
var x;
var w;
var h;
var mic;
var length;
var plength;
var levelMap;
var plevelMap;
function setup() {
createCanvas(windowWidth, windowHeight);
w = windowWidth;
h = windowHeight;
mic = new p5.AudioIn();
mic.start();
amplitude = new p5.Amplitude();
amplitude.setInput(mic);
length = 300;
angleMode(DEGREES);
osc = new p5.Oscillator();
osc.setType('sin');
osc.freq(240);
osc.amp(0.3);
osc.start();
}
function draw() {
length = 4 * constrain(levelMap, 30, 300);
lengthLerp = lerp(plength, length, 0.1);
translate(w / 2, h/10);
push();
colorMode(HSB);
background(200, 50, 20, 10);
pop();
textSize(18);
text("make noise & mouseX around", w/10, h/10);
level = amplitude.getLevel();
mouseXMap = map(mouseX, 0, w, 0, 100);
levelMap = map(level, 0, 1, -1, mouseXMap);
levelLerp = lerp(plevelMap, levelMap, 0.5);
freqMap = map(level, 0, 1, 100, 500);
for (var i = 0; i < length; i++) {
c = color(random(100), 100, random(150));
fill(c);
ellipse((w / 2 * sin(i * 10 * levelMap) + (10 / i))*0.5,
((h / 10 * sin(i * 11 * levelLerp) + (i * 10)))*0.5, w / 20);
osc.freq(freqMap + mouseXMap);
plevelMap = levelMap;
plength = length;
}
}var c, w, h, mic, length, plevelMap;
var song;
function preload () {
song = loadSound('/assets/song.mp3');
}
function setup() {
song.loop();
createCanvas(windowWidth, windowHeight);
w = windowWidth;
h = windowHeight;
c = color(random(255), random(255), random(255));
mic = new p5.AudioIn();
mic.start();
amplitude = new p5.Amplitude();
amplitude.setInput(song);
length = 3000;
angleMode(DEGREES);
}
function draw() {
translate(w / 2, h / 2);
background(c, 10);
level = amplitude.getLevel();
levelMap = map(level, 0, 1, -5, w - w / 10);
levelLerp = lerp(levelMap,plevelMap, 0.2);
for (var i = 0; i < levelMap; i++) { 
rotate(level);
ellipse(w / 4 * cos(i * 15.1 * level), h / 4 * sin(i * 15), w / 10);
}
plevelMap = levelMap;
}var img;
function preload() {
img = loadImage('assets/schiffman.png');
}
function setup() {
createCanvas(400,400);
image(img, 0, 0);
var c = get(30,350);
fill(c);
noStroke();
rect(25,25,50,50);
}var video;
var targetColor = [255,0,0];
function preload () {
}
function setup() {
createCanvas(640,480);
video = createCapture(VIDEO);
video.size(width,height);
video.hide();
}
function draw() {
image(video,0,0);
var worldRecord = 88888888888;
var winningX = 0;
var winningY = 0;
for (var y = 0; y < video.height; y++) {
for (var x = 0; x < video.width; x++) {
var thisPixel = video.get(x,y);
var diffBetweenColors = dist(thisPixel[0], thisPixel[1], thisPixel[2], 
targetColor[0], targetColor[1], targetColor[2]);
if (diffBetweenColors < worldRecord) { 
winningX = x;
winningY = y;
worldRecord = diffBetweenColors;
}
}
}
ellipse(winningX, winningY, 20, 20);
}
function mousePressed() {
targetColor = get(mouseX, mouseY);
let bloods = [];
var offset = 2;
var minBloodSize = 1;
var maxBloodSize = 4;
var bloodLength = 60;
var WindSpeed_MPH;
function preload () {
scream = loadSound("/assets/scream.mp3");
}
function setup() {
var bloodLength = 20;
createCanvas(400, 400);
background(220);
}
function draw() {
if (mouseX > width/2) {
scream.loop();
} else {
scream.stop();
}
WindSpeed_MPH = abs(dist(mouseX,mouseY,width/2,height/2))/20;
push();
translate(height / 2, width / 2);
createBlood(random(0,width), random(0,height));
if (millis() % 5000 < 100) {
}
pop();
for (let i = 0; i < bloods.length; i++) {
bloods[i].move();
bloods[i].display();
}
}
function createBlood(x, y) {
let b = new blood(x, y);
bloods.push(b);
}
class blood {
constructor(xIn, yIn) {
this.x = xIn;
this.y = yIn;
this.maxLength = random(10, bloodLength);
this.maxFall = this.maxLength + yIn;
this.speed = random(5, 15);
this.diameter = random(minBloodSize * WindSpeed_MPH, maxBloodSize * WindSpeed_MPH);
this.darken = 40;
}
move() {
var rand = random(-0.5, 0.5)
if (this.y > this.maxFall) {
this.y = this.y;
} else {
this.y += this.speed * bloodEasing;
this.x += rand;
}
}
display() {
push();		
colorMode(HSB);
this.darken -= 0.08;
noStroke();
fill(360, 100, this.darken, 1);
ellipse(this.x, this.y + 1, this.diameter, this.diameter);
fill(360, 100, this.darken, 1);
ellipse(this.x, this.y, this.diameter, this.diameter);
}
*  GLOBAL VARIABLES
var x;
var z;
var xMap;
var zMap;
var constrainDegree = 40;
let drops = [];
var offset = 2;
var minDropSize = 5;
var maxDropSize = 15;
var dropLength = 60;
var WindSpeed_MPH = 0;
var touching = -1;
var buttonOn = 0;
var img;
*  SETUP
function setup() {
createCanvas(windowWidth, windowHeight);
imageMode(CORNER);
img = new loadImage("/assets/bkgd-img.jpg");
background(img);
noStroke();
frameRate(30);
angleMode(DEGREES);
ellipseMode(CENTER);
}
*  DRAW
function draw() {
if (buttonOn[1] > -1) background(img);
if (WindSpeed_MPH[1] > 10) {
fill(255, 0, 0);
for (var i = 0; i < 10; i++) {
ellipse(random(0, windowWidth), random(0 , windowHeight), WindSpeed_MPH[1] * random(0.1, 2));
}
}	 
push();
translate(height / 2, width / 2);
translateInput();
for (let i = 0; i < drops.length; i++) {
drops[i].move();
drops[i].display();
}
if (touching[1] == 0) {
createDrop(xMap, zMap);
if (millis() % 5000 < 100) {
}
noStroke();
ellipse(xMap, zMap, 10, 10);
pop();
}
}
function resetButton () {
background(img);
}
* Drawing Drops functionality
function createDrop(x, y) {
let d = new drop(x, y);
drops.push(d);
}
class drop {
constructor(xIn, yIn) {
this.x = xIn;
this.y = yIn;
this.maxLength = random(10, dropLength);
this.maxFall = this.maxLength + yIn;
this.speed = random(5, 15);
this.diameter = random(minDropSize, maxDropSize);
}
move() {
var rand = random(-0.5, 0.5)
if (this.y > this.maxFall) {
this.y = this.y;
} else {
this.y += this.speed * easing;
this.x += rand;
}
}
display() {
fill(200,255);
ellipse(this.x, this.y + 1, this.diameter, this.diameter);
fill(255, 255);
ellipse(this.x, this.y, this.diameter, this.diameter);
}
}
function translateInput() {
if (x > (360 - constrainDegree)) {
xMap = map((-1 * (360 - x)), 0, constrainDegree, 0, width / 2);
} else {
xMap = map(x, 0, constrainDegree, 0, width / 2);
}
zMap = map(z, 0, constrainDegree, 0, height / 2);
}
function guiText() {
fill(255);
text("sensor value: " + inData, 30, 30);
}
for (var i = 0; i < portList.length; i++) {
var p = portList[i];
baudrate: 9600
});
}
}
}
if (!inString) return;
if (inString.length > 0) {
var parts = inString.split(',');
WindSpeed_MPH = split(parts[0], ':');
touching = split(parts[1], ':');
buttonOn = split(parts[2], ':');
x = Number(parts[3]);
z = Number(parts[4]);
}
}
}
*  GLOBAL VARIABLES
var x;
var z;
var xMap;
var zMap;
var constrainDegree = 40;
let drops = [];
var offset = 2;
var minDropSize = 5;
var maxDropSize = 15;
var dropLength = 60;
var WindSpeed_MPH = 0;
var touching = -1;
var buttonOn = 0;
var bkgdImg;
*  SETUP
function setup() {
createCanvas(windowWidth, windowHeight);
background(0);
imageMode(CORNER);
image(bkgdImg,0,0, 100, 100);
noStroke();
frameRate(30);
angleMode(DEGREES);
ellipseMode(CENTER);
}
*  DRAW
function draw() {
push();
translate(height / 2, width / 2);
translateInput();
if (buttonOn[1] == 0) {
fill(0, 255, 0);
textSize(24);
text("button to clear", width / 2, 3 * height / 4);
}
for (let i = 0; i < drops.length; i++) {
drops[i].move();
drops[i].display();
}
if (touching[1] == 0) {
createDrop(xMap, zMap);
if (millis() % 5000 < 100) {
}
noStroke();
ellipse(xMap, zMap, 10, 10);
pop();
if (WindSpeed_MPH[1] > 7) {
fill(255, 0, 0);
noStroke();
textSize(24);
text('blood', width / 4, height / 4);
fill(255, 0, 0);
ellipse(random(0, windowWidth), random(0 , windowHeight), WindSpeed_MPH[1] * random(0.1, 3));
}
}
}
* Drawing Drops functionality
function createDrop(x, y) {
let d = new drop(x, y);
drops.push(d);
}
class drop {
constructor(xIn, yIn) {
this.x = xIn;
this.y = yIn;
this.maxLength = random(10, dropLength);
this.maxFall = this.maxLength + yIn;
this.speed = random(5, 15);
this.diameter = random(minDropSize, maxDropSize);
}
move() {
var rand = random(-0.5, 0.5)
if (this.y > this.maxFall) {
this.y = this.y;
} else {
this.y += this.speed * easing;
this.x += rand;
}
}
display() {
fill(200,255);
ellipse(this.x, this.y + 1, this.diameter, this.diameter);
fill(255, 255);
ellipse(this.x, this.y, this.diameter, this.diameter);
}
}
function translateInput() {
if (x > (360 - constrainDegree)) {
xMap = map((-1 * (360 - x)), 0, constrainDegree, 0, width / 2);
} else {
xMap = map(x, 0, constrainDegree, 0, width / 2);
}
zMap = map(z, 0, constrainDegree, 0, height / 2);
}
function guiText() {
background(0);
fill(255);
text("sensor value: " + inData, 30, 30);
}
for (var i = 0; i < portList.length; i++) {
var p = portList[i];
baudrate: 9600
});
}
}
}
if (!inString) return;
if (inString.length > 0) {
var parts = inString.split(',');
WindSpeed_MPH = split(parts[0], ':');
touching = split(parts[1], ':');
buttonOn = split(parts[2], ':');
x = Number(parts[3]);
z = Number(parts[4]);
}
}
}
function setup() {
angleMode(DEGREES);
createCanvas(windowWidth, windowHeight);
}
for (var i = 0; i < portList.length; i++) {
var p = portList[i];
if (p.indexOf('Adafruit') > -1) {
baudrate: 9600
});
}
}
}
if (!input) return;
var sensors = split(input, ',');
}
}
function draw() {
background(0, 10);
fill(0,100,255);
textSize(24);
stroke(1);
text("drawing", width / 2, height / 2);
fill(255,0,0);
noStroke();
textSize(24);
text('blood', width/4, height/4);
fill(255, 0, 0);
noStroke();
ellipse(random(windowWidth/4, 3 * windowWidth / 4), random(windowHeight/4, 3*windowHeight/4), WindSpeed_MPH[1] * random(0.1, 10));
ellipse(random(windowWidth/4, 3 * windowWidth / 4), random(windowHeight/4, 3*windowHeight/4), WindSpeed_MPH[1] * random(0.1, 10));
ellipse(random(windowWidth/4, 3 * windowWidth / 4), random(windowHeight/4, 3*windowHeight/4), WindSpeed_MPH[1] * random(0.1, 10));
ellipse(random(windowWidth/4, 3 * windowWidth / 4), random(windowHeight/4, 3*windowHeight/4), WindSpeed_MPH[1] * random(0.1, 10));
}
*  GLOBAL VARIABLES
var x;
var z;
var xMap;
var zMap;
var constrainDegree = 40;
let drops = [];
var offset = 2;
var minDropSize = 5;
var maxDropSize = 15;
var dropLength = 60;
var WindSpeed_MPH = 0;
var touching = -1;
var buttonOn = 0;
*  SETUP
function setup() {
createCanvas(400, 400);
noStroke();
frameRate(30);
angleMode(DEGREES);
ellipseMode(CENTER);
}
*  DRAW
function draw() {
translate(height / 2, width / 2);
translateInput();
if (buttonOn[1] == 0) {
fill(0, 255, 0);
textSize(24);
text("button to clear", width / 2, 3 * height / 4);
}
for (let i = 0; i < drops.length; i++) {
drops[i].move();
drops[i].display();
}
if (touching[1] == 0) {
fill(0, 100, 255);
textSize(24);
stroke(1);
text("drawing", width / 2, height / 2);
createDrop(xMap, zMap);
if (millis() % 5000 < 100) {
}
noStroke();
ellipse(xMap, zMap, 10, 10);
if (WindSpeed_MPH[1] > 3) {
fill(255, 0, 0);
noStroke();
textSize(24);
text('blood', width / 4, height / 4);
fill(255, 0, 0);
ellipse(random(windowWidth / 4, 3 * windowWidth / 4), random(windowHeight / 4, 3 * windowHeight / 4), WindSpeed_MPH[1] * random(0.1, 10));
ellipse(random(windowWidth / 4, 3 * windowWidth / 4), random(windowHeight / 4, 3 * windowHeight / 4), WindSpeed_MPH[1] * random(0.1, 10));
ellipse(random(windowWidth / 4, 3 * windowWidth / 4), random(windowHeight / 4, 3 * windowHeight / 4), WindSpeed_MPH[1] * random(0.1, 10));
ellipse(random(windowWidth / 4, 3 * windowWidth / 4), random(windowHeight / 4, 3 * windowHeight / 4), WindSpeed_MPH[1] * random(0.1, 10));
}
}
}
* Drawing Drops functionality
function createDrop(x, y) {
let d = new drop(x, y);
drops.push(d);
}
class drop {
constructor(xIn, yIn) {
this.x = xIn;
this.y = yIn;
this.maxLength = random(10, dropLength);
this.maxFall = this.maxLength + yIn;
this.speed = random(5, 15);
this.diameter = random(minDropSize, maxDropSize);
}
move() {
var rand = random(-0.5, 0.5)
if (this.y > this.maxFall) {
this.y = this.y;
} else {
this.y += this.speed * easing;
this.x += rand;
}
}
display() {
fill(200, 0, 0, 255);
ellipse(this.x, this.y + 1, this.diameter, this.diameter);
fill(255, 0, 0, 255);
ellipse(this.x, this.y, this.diameter, this.diameter);
}
}
function translateInput() {
if (x > (360 - constrainDegree)) {
xMap = map((-1 * (360 - x)), 0, constrainDegree, 0, width / 2);
} else {
xMap = map(x, 0, constrainDegree, 0, width / 2);
}
zMap = map(z, 0, constrainDegree, 0, height / 2);
}
function guiText() {
background(0);
fill(255);
text("sensor value: " + inData, 30, 30);
}
for (var i = 0; i < portList.length; i++) {
var p = portList[i];
baudrate: 9600
});
}
}
}
if (!inString) return;
if (inString.length > 0) {
var parts = inString.split(',');
WindSpeed_MPH = split(parts[0], ':');
touching = split(parts[1], ':');
buttonOn = split(parts[2], ':');
x = Number(parts[3]);
z = Number(parts[4]);
}
}
}
*  GLOBAL VARIABLES
var x;
var z;
var xMap;
var zMap;
var constrainDegree = 40;
let drops = [];
var offset = 2;
var minDropSize = 5;
var maxDropSize = 15;
var dropLength = 60;
var WindSpeed_MPH = 0;
var touching = -1;
var buttonOn = 0;
*  SETUP
function setup() {
createCanvas(400, 400);
noStroke();
frameRate(30);
angleMode(DEGREES);
ellipseMode(CENTER);
}
*  DRAW
function draw() {
translate(height / 2, width / 2);
translateInput();
if (buttonOn[1] == 0) {
fill(0, 255, 0);
textSize(24);
text("button to clear", width / 2, 3 * height / 4);
}
for (let i = 0; i < drops.length; i++) {
drops[i].move();
drops[i].display();
}
if (touching[1] == 0) {
createDrop(xMap, zMap);
if (millis() % 5000 < 100) {
}
noStroke();
ellipse(xMap, zMap, 10, 10);
if (WindSpeed_MPH[1] > 3) {
fill(255, 0, 0);
noStroke();
textSize(24);
text('blood', width / 4, height / 4);
fill(255, 0, 0);
noStroke();
ellipse(random(windowWidth / 4, 3 * windowWidth / 4), random(windowHeight / 4, 3 * windowHeight / 4), WindSpeed_MPH[1] * random(0.1, 10));
ellipse(random(windowWidth / 4, 3 * windowWidth / 4), random(windowHeight / 4, 3 * windowHeight / 4), WindSpeed_MPH[1] * random(0.1, 10));
ellipse(random(windowWidth / 4, 3 * windowWidth / 4), random(windowHeight / 4, 3 * windowHeight / 4), WindSpeed_MPH[1] * random(0.1, 10));
ellipse(random(windowWidth / 4, 3 * windowWidth / 4), random(windowHeight / 4, 3 * windowHeight / 4), WindSpeed_MPH[1] * random(0.1, 10));
}
}
}
* Drawing Drops functionality
function createDrop(x, y) {
let d = new drop(x, y);
drops.push(d);
}
class drop {
constructor(xIn, yIn) {
this.x = xIn;
this.y = yIn;
this.maxLength = random(10, dropLength);
this.maxFall = this.maxLength + yIn;
this.speed = random(5, 15);
this.diameter = random(minDropSize, maxDropSize);
}
move() {
var rand = random(-0.5, 0.5)
if (this.y > this.maxFall) {
this.y = this.y;
} else {
this.y += this.speed * easing;
this.x += rand;
}
}
display() {
fill(200, 0, 0, 255);
ellipse(this.x, this.y + 1, this.diameter, this.diameter);
fill(255, 0, 0, 255);
ellipse(this.x, this.y, this.diameter, this.diameter);
}
}
function translateInput() {
if (x > (360 - constrainDegree)) {
xMap = map((-1 * (360 - x)), 0, constrainDegree, 0, width / 2);
} else {
xMap = map(x, 0, constrainDegree, 0, width / 2);
}
zMap = map(z, 0, constrainDegree, 0, height / 2);
}
function guiText() {
background(0);
fill(255);
text("sensor value: " + inData, 30, 30);
}
for (var i = 0; i < portList.length; i++) {
var p = portList[i];
baudrate: 9600
});
}
}
}
}
function serverConnected() {
}
function portOpen() {
}
}
function portClose() {
var WindSpeed_MPH = 0;
var touching = -1;
var buttonOn = 0;
function setup() {
angleMode(DEGREES);
createCanvas(windowWidth, windowHeight);
ellipseMode(CENTER);
}
for (var i = 0; i < portList.length; i++) {
var p = portList[i];
if (p.indexOf('Adafruit') > -1) {
baudrate: 9600
});
}
}
}
if (!input) return;
var sensors = split(input, ',');
}
}
function draw() {
background(0, 10);
if (buttonOn[1] == 0) {
fill(0,255,0);
textSize(24);
text("button to clear", width / 2, 3 * height / 4);
}
if (touching[1] == 0) {
fill(0,100,255);
textSize(24);
stroke(1);
text("drawing", width / 2, height / 2);
if (WindSpeed_MPH[1] > 3) {
fill(255,0,0);
noStroke();
textSize(24);
text('blood', width/4, height/4);
fill(255, 0, 0);
noStroke();
ellipse(random(windowWidth/4, 3 * windowWidth / 4), random(windowHeight/4, 3*windowHeight/4), WindSpeed_MPH[1] * random(0.1, 10));
ellipse(random(windowWidth/4, 3 * windowWidth / 4), random(windowHeight/4, 3*windowHeight/4), WindSpeed_MPH[1] * random(0.1, 10));
ellipse(random(windowWidth/4, 3 * windowWidth / 4), random(windowHeight/4, 3*windowHeight/4), WindSpeed_MPH[1] * random(0.1, 10));
ellipse(random(windowWidth/4, 3 * windowWidth / 4), random(windowHeight/4, 3*windowHeight/4), WindSpeed_MPH[1] * random(0.1, 10));
}
}
var portName = '/dev/cu.usbmodem1421';
var inData = 0;
let inDataMap;
let currentgrowEllipse = 0.0;
let lastgrowEllipse = 0.0;
function setup() {
createCanvas(300,300);
smooth();
}
rectMode(CENTER);
}
function draw() {
background(0,10);
fill(255);
text("MPH: " + inData, 30,30);
let currentgrowEllipse = map(inData, 0, 255, 20, windowWidth);
let lerpEllipse = lerp(currentgrowEllipse, lastgrowEllipse, 0.2);
ellipse(width/2, height/2, lerpEllipse*0.8 + 50);
lastgrowEllipse = currentgrowEllipse;
}
var flower;
function setup() {
createCanvas(400, 400);
flower = {
name: "sunflower",
col: color(200, 220, 0)
}
}
function draw() {
background(0);
fill(flower.col);
text(flower.name, 10, 50);
}function setup() {
}
function gotData(data) {
}
let x = 0;
let y = 0;
let ang = 90;
let col = 0;
let moveC = 1;
let b;
let manip;
let timtimsong;
let amplitude;
let currentAmplitude;
let previousAmplitude;
let level;
let levelMap = 0;
let bkgdSliderVal = 0.01;
function preload() {
timtimsong = loadSound("timtim.mp3");
}
function setup() {
timtimsong.loop();
amplitude = new p5.Amplitude();
createCanvas(windowWidth, windowHeight);
imageMode(CENTER);
angleMode(DEGREES);
colorMode(HSB);
domObjects();
manip = 400 / 72;
textSize(24);
textAlign(LEFT);
smooth();
}
function draw() {
b = bValSlider.value();
manip = manipSlider.value();
let f = frameRateSlider.value();
frameRate(f);
bkgdColor();
donut(0, 0, 0);
instructions();
}
function donut(strokeH, strokeS, strokeB) {
push();
col += moveC;
fill(col * 2, 75, 100);
if (col >= 100 || col < 0) {
moveC = moveC * -1;
}
ang += 5;
let transX = windowWidth / 2 + sin(ang * 2);
let transY = windowHeight / 2 + cos(ang / 3) * 20;
translate(transX, (transY - 40));
rotate(x / ((b * sqrt(3) / levelMap)));
x += 5;
for (i = 0; i < 360; i += 13) {
let ellipseX = windowWidth / 20 + cos(i++) * windowWidth / manip;
let ellipseY = windowWidth / 20 + sin(i++) * windowWidth / manip;
let ellipseSize = windowWidth / 20;
level = amplitude.getLevel();
levelMap = map(level, 0, 1, 2, 10)
let SWSliderVal = map(strokeWeightSlider.value(), 0, 1, 0, 10);
stroke(strokeH, strokeS, strokeB);
strokeWeight(SWSliderVal);
ellipse(ellipseX, ellipseY, ellipseSize * b * levelMap);
}
pop();
}
function instructions() {
fill(255, 127);
}
function bkgdColor() {
push();
colorMode(RGB);
background(random(100, 120), random(200, 50), random(100, 255), sqrt(3));
pop();
}
function keyTyped() {
if (key === 'c') {
redraw();
}
}
function domObjects() {
bValSlider = createSlider(0.01, 0.2, 0.01, 0.0001);
bValSlider.position(windowWidth / 20, 3 * windowHeight / 5);
let manipRep = (400 / 72);
manipSlider = createSlider(2, 20, 8, 0.001);
manipSlider.position(windowWidth / 20, 13 * windowHeight / 20);
manip = manipSlider.value();
frameRateSlider = createSlider(12, 60, 30, 1);
frameRateSlider.position(windowWidth / 20, 14 * windowHeight / 20);
strokeWeightSlider = createSlider(0.01, 0.1, 0.03, 0.01);
strokeWeightSlider.position(windowWidth/20, 15*windowHeight/20);
}
var uno;
var unoPort = '/dev/cu.usbmodem1421';
var unoData;
var windMPH;
function setup() {
uno.open(unoPort);
createCanvas(400, 400);
}
for (var i = 0; i < portList.length; i++) {
}
}
var unoString = uno.readLine();
if (unoString.length > 0 ) {
unoData = Number(unoString);
windMPH = unoData;
}
}
function draw () {
background(255,10);
if (windMPH > 10) {
fill(0,255,0, 10);
ellipse(random(0,width),random(0,height),windMPH*random(2,10));
} 
if (windMPH == 999) {
background(0);
fill(255);
textSize(64);
text("clear", width/2, height/2);
}
}
var uno;
function setup() {
}
for (var i = 0; i < portList.length; i++) {
var p = portList[i]
if (p.indexOf('usbmodem') > -1) {
portClose();
}			
}
}
function portClose() {
}
var WindSpeed_MPH = 0;
var touching = -1;
var buttonOn = 0;
function setup() {
angleMode(DEGREES);
createCanvas(windowWidth, windowHeight);
ellipseMode(CENTER);
}
for (var i = 0; i < portList.length; i++) {
var p = portList[i];
if (p.indexOf('usbmodem') > -1) {
baudrate: 9600
});
}
}
}
if (!input) return;
var sensors = split(input, ',');
}
}
function draw() {
background(0, 10);
if (buttonOn[1] == 0) {
fill(0,255,0);
textSize(24);
text("button to clear", width / 2, 3 * height / 4);
}
if (touching[1] == 0) {
fill(0,100,255);
textSize(24);
stroke(1);
text("drawing", width / 2, height / 2);
if (WindSpeed_MPH[1] > 3) {
fill(255,0,0);
noStroke();
textSize(24);
text('blood', width/4, height/4);
fill(255, 0, 0);
noStroke();
ellipse(random(windowWidth/4, 3 * windowWidth / 4), random(windowHeight/4, 3*windowHeight/4), WindSpeed_MPH[1] * random(0.1, 10));
ellipse(random(windowWidth/4, 3 * windowWidth / 4), random(windowHeight/4, 3*windowHeight/4), WindSpeed_MPH[1] * random(0.1, 10));
ellipse(random(windowWidth/4, 3 * windowWidth / 4), random(windowHeight/4, 3*windowHeight/4), WindSpeed_MPH[1] * random(0.1, 10));
ellipse(random(windowWidth/4, 3 * windowWidth / 4), random(windowHeight/4, 3*windowHeight/4), WindSpeed_MPH[1] * random(0.1, 10));
}
}
}function setup() {
var myQuery = "cat";
createCanvas(400, 400);
loadJSON(url, gotData);
}
function draw() {
background(220);
}
function gotData(data) {
for (var i = 0; i < 10; i++) 
{
console.log(data.response.docs[i].snippet);
delay(500);
loadJSON(url, gotData);
}
let x = 0;
let y = 0;
let ang = 90;
let col = 0;
let moveC = 1;
let b;
let manip;
let timtimsong;
let amplitude;
let level;
let levelMap = 0;
let bkgdSliderVal = 0.01;
function preload() {
timtimsong = loadSound("timtim.mp3");
}
function setup() {
timtimsong.loop();
amplitude = new p5.Amplitude();
createCanvas(windowWidth, windowHeight);
imageMode(CENTER);
angleMode(DEGREES);
colorMode(HSB);
domObjects();
manip = 400 / 72;
textSize(24);
textAlign(LEFT);
}
function draw() {
b = bValSlider.value();
manip = manipSlider.value();
bkgdColor();
donut(0, 0, 0);
instructions();
}
function donut(strokeH, strokeS, strokeB) {
push();
col += moveC;
fill(col * 2, 75, 100);
if (col >= 100 || col < 0) {
moveC = moveC * -1;
}
ang += 5;
let transX = windowWidth / 2 + sin(ang * 2);
let transY = windowHeight / 2 + cos(ang / 3) * 20;
translate(transX, (transY - 50));
rotate(x / ((b * sqrt(3) / levelMap)));
x += 5;
for (i = 0; i < 360; i += 13) {
let ellipseX = windowWidth / 20 + cos(i++) * windowWidth / manip;
let ellipseY = windowWidth / 20 + sin(i++) * windowWidth / manip;
let ellipseSize = windowWidth / 20;
level = amplitude.getLevel();
levelMap = map(level, 0, 1, 2, 20);
let SWSliderVal = map(strokeWeightSlider.value(), 0, 1, 0, 10);
stroke(strokeH, strokeS, strokeB);
strokeWeight(SWSliderVal);
ellipse(ellipseX, ellipseY, ellipseSize * b * levelMap);
}
pop();
}
function instructions() {
fill(255, 127);
}
function bkgdColor() {
push();
colorMode(RGB);
background(random(100, 120), random(200, 50), random(100, 255), sqrt(3));
pop();
}
function keyTyped() {
if (key === 'c') {
redraw();
}
}
function domObjects() {
strokeWeightSlider = createSlider(0, 0.5, 0.1, 0.01);
strokeWeightSlider.position(windowWidth / 20, 13 * windowHeight / 20);
let manipRep = (400 / 72);
manipSlider = createSlider(1.5, 7, manipRep, 0.001);
manipSlider.position(windowWidth / 20, 14 * windowHeight / 20);
manip = manipSlider.value();
frameRateSlider = createSlider(10, 30, 24, 1);
frameRateSlider.position(windowWidth / 20, 15 * windowHeight / 20);
bValSlider = createSlider(0.01, 1, 0.01, 0.01);
bValSlider.position(windowWidth / 20, 16 * windowHeight / 20);
}
var portName = '/dev/cu.usbmodem1421';
var inData = 0;
let inDataMap;
let currentgrowEllipse = 0.0;
let lastgrowEllipse = 0.0;
function setup() {
createCanvas(300,300);
smooth();
}
rectMode(CENTER);
}
function draw() {
background(0,10);
fill(255);
text("MPH: " + inData, 30,30);
let currentgrowEllipse = map(inData, 0, 255, 20, windowWidth);
let lerpEllipse = lerp(currentgrowEllipse, lastgrowEllipse, 0.2);
ellipse(width/2, height/2, lerpEllipse*0.8 + 50);
lastgrowEllipse = currentgrowEllipse;
}
let x = 0;
let y = 0;
let ang = 90;
let col = 0;
let moveC = 1;
let manip;
let timtimsong;
let amplitude;
let level;
let levelMap = 0;
let bkgdSliderVal = 0.01;
function preload() {
timtimsong = loadSound("timtim.mp3");
}
function setup() {
timtimsong.loop();
amplitude = new p5.Amplitude();
createCanvas(windowWidth, windowHeight);
imageMode(CENTER);
angleMode(DEGREES);
colorMode(HSB);
domObjects();
manip = 400 / 72;
textSize(24);
textAlign(LEFT);
}
function draw() {
bkgdColor();
donut(0, 0, 0);
instructions();
}
function donut(strokeH, strokeS, strokeB) {
manip = manipSlider.value();
var b = bValSlider.value();
push();
col += moveC;
fill(col * 2, 75, 100);
if (col >= 100 || col < 0) {
moveC = moveC * -1;
}
ang += 5;
let weight = dist(mouseX, mouseY, pmouseX, pmouseY) * 10;
let transX = windowWidth / 2 + sin(ang * 2);
let transY = windowHeight / 2 + cos(ang / 3) * 20;
translate(transX, (transY - 50));
rotate(x / ((b * sqrt(3) / levelMap)));
x += 5;
for (i = 0; i < 360; i += 13) {
let ellipseX = windowWidth / 20 + cos(i++) * windowWidth / manip;
let ellipseY = windowWidth / 20 + sin(i++) * windowWidth / manip;
let ellipseSize = windowWidth / 20;
level = amplitude.getLevel();
levelMap = map(level, 0, 1, 2, 20);
let SWSliderVal = map(strokeWeightSlider.value(), 0, 1, 0, 10);
stroke(strokeH, strokeS, strokeB);
strokeWeight(SWSliderVal);
ellipse(ellipseX, ellipseY, ellipseSize * b * levelMap);
}
pop();
}
function instructions() {
fill(255, 127);
text('  start here  > > >  to find a fun sweet spot!', windowWidth / 20, (18 / 20) * windowHeight);
}
function bkgdColor() {
push();
colorMode(RGB);
background(random(100, 120), random(200, 50), random(100, 255), sqrt(3));
pop();
}
function keyTyped() {
if (key === 'c') {
redraw();
}
}
function domObjects() {
strokeWeightSlider = createSlider(0, 0.5, 0.1, 0.01);
strokeWeightSlider.position(windowWidth / 20, 13 * windowHeight / 20);
let manipRep = (400 / 72);
manipSlider = createSlider(1.5, 7, manipRep, 0.001);
manipSlider.position(windowWidth / 20, 14 * windowHeight / 20);
manip = manipSlider.value();
frameRateSlider = createSlider(10, 30, 24, 1);
frameRateSlider.position(windowWidth / 20, 15 * windowHeight / 20);
bValSlider = createSlider(0.01, 1, 0.01, 0.01);
bValSlider.position(windowWidth / 20, 16 * windowHeight / 20);
}
function setup() {
}
function gotData(data) {
}
var data;
function preload() {
data = loadJSON("archetypes.json");
}
function setup() {
noCanvas();
var archetypes = data.artifacts;
createElement('h1', archetypes[5].qualities[3]);
for (var i = 0; i < archetypes.length; i++) {
createP(archetypes[i].name);
}
for (var i = 0; i < archetypes.length; i++) {
createElement('h2', archetypes[i].name);
var syn = archetypes[i].synonyms;
for (var j = 0; j < syn.length; j++) {
createDiv(syn[j]);
}
}
}var data;
function preload() {
data = loadJSON("birds.json");
}
function setup() {
noCanvas();
var jacks = data.birds;
for (var i = 0; i < jacks.length; i++) {
createElement('h2', jacks[i].family);
var members = jacks[i].members;
for (var j = 0; j < members.length; j++) {
createDiv(members[j]);
}
}
}
var portName = '/dev/cu.usbmodem1421'
var inData = 0;
let inDataMap;
function setup() {
angleMode(DEGREES);
createCanvas(400,400);
}
rectMode(CENTER);
}
function draw() {
background(0);
rect(width/2,height/2,inData, inData);
}
function setup() {
}
function draw() {
background(220);
ellipse(width/2, height/2, 
}
for (var i = 0; i < portList.length; i++) {
console.log(i + " " + portList[i]);
}
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
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
}let myCircles = [];
let myColors = [];
function setup() {
createCanvas(400, 400, P2D);
for (let i = 0; i < 2; i++) {
myCircles.push(new Circle(random(width),
random(height), 60, random(10), random(5)));
}
}
function draw() {
background(220);
for (let i = 0; i < myCircles.length; i++) {
myCircles[i].displayIt();
myCircles[i].moveIt();
for (let j = 0; j < myCircles.length; j++) {
if (i != j && myCircles[i].intersects(myCircles[j])) {
myCircles[i].turn();
}
}
}
}
class Circle {
constructor(x, y, radius, moveX, moveY) {
this.x = x;
this.y = y;
this.radius = radius;
this.moveX = moveX;
this.moveY = moveY;
}
displayIt() {
ellipse(this.x, this.y, this.radius);
}
moveIt() {
this.x = this.x + this.moveX;
this.y = this.y + this.moveY;
if (this.x > width || this.x < 0) {
this.moveX *= -1;
}
if (this.y > height || this.y < 0) {
this.moveY *= -1;
}
}
intersects(other) {
var d = dist(this.x, this.y, other.x, other.y);
if (d < this.radius/2 + other.radius/2) {
return true;
} else {
return false;
}
}
turn() {
this.moveX = -1 * this.moveX;
this.moveY = -1 * this.moveY;
}
let x = 0;
let y = 0;
let ang = 90;
let col = 0;
let moveC = 1;
let manip;
var slider;
let timtimsong;
let amplitude;
let level;
let levelMap = 0;
let bkgdSliderVal = 0.01;
var offsetX = 0;
function preload() {
timtimsong = loadSound("timtim.mp3");
}
function setup() {
timtimsong.loop();
amplitude = new p5.Amplitude();
createCanvas(windowWidth, windowHeight);
imageMode(CENTER);
angleMode(DEGREES);
colorMode(HSB);
slider = {
x: windowWidth / 20,
y: windowHeight * (16 / 20),
w: windowWidth / 20,
h: windowHeight / 22,
start: windowWidth / 20,
end: (2 / 11) * windowWidth
}
strokeWeightSlider = createSlider(0, 0.5, 0.0, 0.01);
strokeWeightSlider.position(windowWidth/20, 13 *windowHeight/20);
let manipRep = (400/72);
manipSlider = createSlider(1.5, 7, manipRep, 0.1);
manipSlider.position(windowWidth/20, 14 *windowHeight/20);
frameRateSlider = createSlider(10, 30, 24, 1);
frameRateSlider.position(windowWidth/20, 15 *windowHeight/20);
resetButton = createButton('reset');
resetButton.position(windowWidth/20, 12*windowHeight/20);
resetButton.mousePressed(resetSliders);
manip = 400 / 72;
textSize(24);
textAlign(LEFT);
}
function draw() {
let f = frameRateSlider.value();
frameRate(f);
bkgdColor();
Sliders();
donut(0,0,0);
instructions();
}
function donut(strokeH, strokeS, strokeB) {
manip = manipSlider.value();
var b = map(slider.x, slider.start, slider.end - slider.w, 0.01, 1);
push();
col += moveC;
fill(col * 2, 75, 100);
if (col >= 100 || col < 0) {
moveC = moveC * -1;
}
ang += 5;
let weight = dist(mouseX, mouseY, pmouseX, pmouseY) * 10;
let transX = windowWidth / 2 + sin(ang * 2);
let transY = windowHeight / 2 + cos(ang / 3) * 20;
translate(transX, (transY - 50));
rotate(x / ((b * sqrt(3) / levelMap)));
x += 5;
for (i = 0; i < 360; i += 13) {
let ellipseX = windowWidth / 20 + cos(i++) * windowWidth / manip;
let ellipseY = windowWidth / 20 + sin(i++) * windowWidth / manip;
let ellipseSize = windowWidth / 20;
level = amplitude.getLevel();
levelMap = map(level, 0, 1, 2, 20)
let SWSliderVal = map(strokeWeightSlider.value(),0,1,0,10);
stroke(strokeH,strokeS,strokeB);
strokeWeight(SWSliderVal);
ellipse(ellipseX, ellipseY, ellipseSize * b * levelMap);
}
pop();
}
function instructions() {
fill(255, 127);
text('  ^ slide me  > > >  to find a fun sweet spot!', windowWidth / 20, (18 / 20) * windowHeight);
}
function bkgdColor() {
push();
colorMode(RGB);
background(random(100, 120), random(200, 50), random(100, 255), sqrt(3));
pop();
}
function Sliders() {
for (i = 0; i < 1; i++) {
if (dragging) {
slider.x = mouseX + offsetX;
}
slider.x = constrain(slider.x, slider.start, slider.end - slider.w);
push();
colorMode(RGB);
fill(255, 10);
rect(slider.x, slider.y + (i * windowWidth / 10), slider.w, slider.h, 10);
pop();
if (dragging) {
fill(50);
} else {
fill(50, 50);
}
noStroke();
rect(slider.x, slider.y, slider.w, slider.h, 10, 10);
}
}
function mousePressed() {
if (mouseX > slider.x && mouseX < slider.x + slider.w && mouseY > slider.y && mouseY < slider.y + slider.h) {
dragging = true;
offsetX = slider.x - mouseX;
}
}
function mouseReleased() {
dragging = false;
}
function resetSliders () {
strokeWeightSliderVal = 0.0;
manipSliderVal = manip;
frameRateSliderVal = 24;
}
function keyTyped() {
if (key === 'c') {
redraw();
} 
var song;
function preLoad() {
song = loadSound('timtimshort.mp3');
}
function setup() {
createCanvas(400, 400);
background(0);
}
function mousePressed() {
if (song.isPlaying()) {
}
}
function draw() {
}let ball;
function setup() {
createCanvas(400, 400);
ball = new Ball(random(0,width), random(0,height), 50, 2);
}
function draw() {
background(220);
ball.check();
ball.display();
ball.move();
}
class Ball {
constructor(x, y, size, speed) {
this.x = x;
this.y = y;
this.size = size;
this.xSpeed = speed;
this.ySpeed = speed;
}
move() {
this.x += this.xSpeed;
this.y += this.ySpeed;
}
display() {
ellipse(this.x, this.y, this.size);
}
check() {
if (this.x > width - this.size/2 || this.x < this.size/2) {
this.xSpeed *= -1;
} 
if (this.y > height - (this.size/2) || this.y < (this.size/2)) {
this.ySpeed *= -1;
} 
}
}let cluster = [];
let clusterSizeOffset = 20;
let checkMouseXYdist;
let lerpVal;
class Dot {
constructor(x, y) {
this.xOffset = x;
this.yOffset = y;
}
display(x, y) {
let xVal = x + this.xOffset;
let yVal = y + this.yOffset;
let xBound = constrain(xVal,-150, width/2 + 150);
let yBound = constrain(yVal, -150, height/2 + 150);
ellipse(xBound, yBound, 10, 10);
if (dist(this.x, this.y, width/2, height/2) < 150) {
}
}
}
class Cluster {
constructor(x, y) {
this.x = x;
this.y = y;
this.dots = [];
for (let i = 0; i < 5; i++) {
let myDot = new Dot(random(-clusterSizeOffset, clusterSizeOffset),
random(-clusterSizeOffset, clusterSizeOffset));
this.dots.push(myDot);
}
}
move() {
for (let i = 0; i < this.dots.length; i++) {
this.dots[i].display(this.x, this.y);
}
}
}
function setup() {
createCanvas(400, 400);
lerpVal = sqrt(3) / 100;
for (let i = 0; i < 4; i++) {
cluster[i] = new Cluster((random(width / 3, 2 * width / 3)), (random(height / 3, 2 * height / 3)));
}
}
function draw() {
background(220);
push();
stroke(1);
fill(255);
ellipse(width / 2, height / 2, 300);
pop();
for (let i = 0; i < 4; i++) {
cluster[i].move();
}
}let angle = 0.0;
var speed = 0.000005;
function setup() {
createCanvas(windowWidth, windowHeight);
}
function draw() {
translate(width/2, height/2);
background(0,5);
noStroke();
angle += speed;
rotate(angle);
for (i = 70; i <= height; i += 120) {
for (j = 65; j <= width; j += 120) {
fill(i/random(2,6)+50,j,(i+j)/random(2,10), random(i*2,10));
circle(i, j, 34, 0.00005);
angle += speed*sin(i*j)/50;
rotate(i,j);
}
}
}
function circle(xOffset, yOffset, scalar, speed) {
let x = xOffset + cos(angle) * scalar;
let y = yOffset + sin(angle) * scalar;
ellipse(x, y, 50, angle++);
}
var Xoffset = 70;
var Yoffset = 70;
var scalar = 34;
var speed = 0.005;
function setup() {
createCanvas(windowWidth, windowHeight);
background(0);
}
function draw() {
circle(); 
}
function circle() {
fill(255);
for(Yoffset=70; Yoffset<=height; Yoffset+=120){
for (Xoffset = 65; Xoffset <=width; Xoffset +=120){
var x = Xoffset + cos(angle) * scalar;
var y = Yoffset + sin(angle) * scalar;
ellipse( x, y, 50, 50);
angle += speed;
} 
}
}
let eyePic;
let x = 0;
let y = 0;
let ang = 90;
let col = 0;
let moveC = 1;
let manip;
var slider;
var song;
var offsetX = 0;
function setup() {
createCanvas(windowWidth, windowHeight);
imageMode(CENTER);
angleMode(DEGREES);
colorMode(HSB);
slider = {
x: windowWidth / 20,
y: windowHeight * (16 / 20),
w: windowWidth / 20,
h: windowHeight / 22,
start: windowWidth / 20,
end: (2 / 11) * windowWidth
}
manip = 400 / 72;
textSize(24);
textAlign(LEFT);
}
function draw() {
randomBackground();
Sliders();
donut();
instructions();
}
function donut() {
var b = map(slider.x, slider.start, slider.end - slider.w, 0.01, 1);
push();
stroke(100, 100, 40);
col += moveC;
fill(col * 2, 75, 100);
if (col >= 100 || col < 0) {
moveC = moveC * -1;
}
ang += 5;
let weight = dist(mouseX, mouseY, pmouseX, pmouseY) * 10;
let transX = windowWidth / 2 + sin(ang * 2);
let transY = windowHeight / 2 + cos(ang / 3) * 20;
translate(transX, (transY - 50));
rotate(x / (b * sqrt(3) / 100));
x += 5;
for (i = 0; i < 360; i += 13) {
let ellipseX = windowWidth / 20 + cos(i++) * windowWidth / manip;
let ellipseY = windowWidth / 20 + sin(i++) * windowWidth / manip;
let ellipseSize = windowWidth / 20;
ellipse(ellipseX, ellipseY, ellipseSize * b);
}
pop();
}
function instructions() {
fill(255, 127);
text('  ^ slide me  > > >  to find a fun sweet spot!', windowWidth / 20, (18 / 20) * windowHeight);
}
function randomBackground() {
push();
colorMode(RGB);
background(random(100, 120), random(200, 50), random(100, 255), sqrt(3));
pop();
}
function Sliders() {
for (i = 0; i < 1; i++) {
if (dragging) {
slider.x = mouseX + offsetX;
}
slider.x = constrain(slider.x, slider.start, slider.end - slider.w);
push();
colorMode(RGB);
noStroke();
fill(255, 10);
rect(slider.x, slider.y + (i * windowWidth / 10), slider.w, slider.h, 10);
pop();
if (dragging) {
fill(50);
} else {
fill(50, 50);
}
noStroke();
rect(slider.x, slider.y, slider.w, slider.h, 10, 10);
}
}
function mousePressed() {
if (mouseX > slider.x && mouseX < slider.x + slider.w && mouseY > slider.y && mouseY < slider.y + slider.h) {
dragging = true;
offsetX = slider.x - mouseX;
}
}
function mouseReleased() {
dragging = false;
}
let xLoc = 0;
let yLoc = 0;
let size;
let colors = [];
let sizeSlider;
let bkgdAlphaSlider;
let sizeVal;
function setup() {
createCanvas(windowWidth, windowHeight);
size = width / 20;
xLoc = size;
yLoc = size;
colors[0] = [153, 40, 40];
colors[1] = [37, 145, 77];
colors[2] = [51, 102, 204];
sizeSlider = createSlider(1, 150, 20, 10);
sizeSlider.position(width / size, height / size);
bkgdAlphaSlider = createSlider(2, 255, 40, 10);
bkgdAlphaSlider.position(width / size, 3 * (height / size));
ellipseMode(CORNER);
}
function draw() {
sizeVal = sizeSlider.value();
size = windowWidth / sizeVal;
let bkgdAlpha = bkgdAlphaSlider.value();
background(0, bkgdAlpha);
drawRGB();
}
function drawRGB() {
for (j = 0; j < 50; j++) {
for (i = 0; i < 3; i++) {
fill(random(colors));
altDots();
}
}
}
function altDots() {
ellipse(xLoc, yLoc, size);
xLoc = xLoc + size;
if (xLoc > width) {
xLoc = 0;
yLoc = yLoc + size
}
if (yLoc > height) {
yLoc = 0;
}
}
function setup() {
createCanvas(600, 600);
background(54, 127, 74);
bkgdDots();
fill(201, 102, 137);
beginShape(TRIANGLES);
vertex(width / 9, (7 / 9) * height);
vertex((8 / 9) * width, (7 / 9) * height);
vertex(width / 2, height / 9);
vertex((2 / 9) * width, (6.5 / 9) * height);
vertex((7 / 9) * width, (6.5 / 9) * height);
vertex((1 / 2) * width, (2 / 9) * height);
endShape(CLOSE);
}
function bkgdDots() {
for (i = 0; i < 10; i++) {
for (j = 0; j < 10; j++) {
elli(i * width / 9, j * height / 9);
}
}
}
function elli(x, y) {
push();
noStroke();
pop();
ellipse(x, y, width / 10, height / 10);
}
let mySlider;
let val;
let x = 255;
function setup() {
createCanvas(400, 400);
mySlider = createSlider(0, 100, 0, 10);
mySlider.position(width / 4, height / 2);
mySlider.changed(believe);
}
function draw() {
background(x);
}
function believe() {
x = 0;
}let cluster = [];
let clusterSizeOffset = 20;
let checkMouseXYdist;
let lerpVal;
class Dot {
constructor(x, y) {
this.xOffset = x;
this.yOffset = y;
}
display(x, y) {
ellipse(x + this.xOffset, y + this.yOffset, 10, 10);
}
}
class Cluster {
constructor(x, y) {
this.x = x;
this.y = y;
this.dots = [];
for (let i = 0; i < 3; i++) {
let myDot = new Dot(random(-clusterSizeOffset, clusterSizeOffset),
random(-clusterSizeOffset, clusterSizeOffset));
this.dots.push(myDot);
}
}
move() {
for (let i = 0; i < this.dots.length; i++) {
this.dots[i].display(this.x, this.y);
}
}
}
function setup() {
createCanvas(400, 400);
lerpVal = sqrt(3)/100;
for (let i = 0; i < 4; i++) {
cluster[i] = new Cluster((random(0, width)), (random(height)));
}
}
function draw() {
background(220);
push();
stroke(1);
fill(255);
ellipse(width / 2, height / 2, 300);
pop();
for (let i = 0; i < 4; i++) {
cluster[i].move();
}
let offsetX = [3, -5, 8, -13, 21, -10]
let offsetY = [34, -21, 13, -8, 5, 3]
let rand;
let cluster1;
let cluster2;
let cluster3;
let cluster4;
let dot = {
x: 100,
y: 100,
dia: 5,
spacing: 10,
rand: 0
}
function setup() {
createCanvas(400, 400);
angleMode(DEGREES);
cluster1 = new Cluster(random(20,40),random(20,40));
cluster2 = new Cluster(random(-20,-40),random(-20,-40));
cluster3 = new Cluster(random(-20,-40),random(20,40));
cluster4 = new Cluster(random(20,40),random(-20,-40));
}
function draw() {
background(220);
dot.rand = random(-0.5, 0.5);
dot.x = mouseX - 50;
dot.y = mouseY - 50;
cluster1.make();
cluster2.make();
cluster3.make();
cluster4.make();
}
class Cluster {
constructor(x, y) {
this.x = x;
this.y = y;
}
make() {
for (let i = 0; i < 6; i++) {
fill(0);
let locX = mouseX - this.x;
let locY = mouseY - this.y;
ellipse((locX + (offsetX[i] / 2) + dot.rand), (locY - (offsetY[i]) / 2) + dot.rand, dot.dia);
}
}
let offsetX = [3, -5, 8, -13, 21, -10]
let offsetY = [34, -21, 13, -8, 5, 3]
let rand;
let cluster1, cluster2, cluster3;
let dot = {
x: 100,
y: 100,
dia: 5,
spacing: 10,
rand: 0
}
function setup() {
createCanvas(400, 400);
angleMode(DEGREES);
cluster1 = new Cluster();
cluster2 = new Cluster();
cluster3 = new Cluster();
}
function draw() {
background(220);
dot.x = mouseX - 50;
dot.y = mouseY - 50;
dot.rand = random(-0.5, 0.5);
cluster1.make();
cluster2.make();
cluster3.make();
}
class Cluster {
constructor() {
}
make() {
for (let i = 0; i < 6; i++) {
fill(0);
ellipse((dot.x + (offsetX[i] / 2) + dot.rand), (dot.y - (offsetY[i]) / 2) + dot.rand, dot.dia);
}
}
}let offsetX = [3, -5, 8, -13, 21, -10]
let offsetY = [34, -21, 13, -8, 5, 3]
let dot = {
x: 100,
y: 100,
dia: 5,
spacing: 10,
rand: 0
}
let rand;
function setup() {
createCanvas(400, 400);
angleMode(DEGREES);
}
function draw() {
background(220);
Cluster();
}
function Cluster() {
fill(0);
dot.x = mouseX - 50;
dot.y = mouseY - 50;
dot.rand = random(-0.5, 0.5);
for (let i = 0; i < 6; i++) {
ellipse((dot.x + (offsetX[i] / 2) + dot.rand), (dot.y - (offsetY[i]) / 2) + dot.rand, dot.dia);
}
}var slider;
var mixer = [];
function setup() {
createCanvas(windowWidth, windowHeight);
}  
function draw() {
background(255,100,100);
for (let i = 0; i < 6; i++){
Slider();
}
}
function Slider() {
slider  = {
x: windowWidth / 20,
y: windowHeight / 20,
w: windowWidth / 20,
h: windowHeight / 22,
start: windowWidth / 20,
end: (2 / 11) * windowWidth
}
if (dragging) {
slider.x = mouseX + offsetX;
}
slider.x = constrain(slider.x, slider.start, slider.end - slider.w);
push();
colorMode(RGB);
noStroke();
fill(255);
rect(slider.x, slider.y, slider.w, slider.h, 10);
pop();
if (dragging) {
fill(50);
} else {
fill(50, 50);
}
noStroke();
rect(slider.x, slider.y, slider.w, slider.h, 10, 10);
}
function mousePressed() {
if (mouseX > slider.x && mouseX < slider.x + slider.w && mouseY > slider.y && mouseY < slider.y + slider.h) {
dragging = true;
offsetX = slider.x - mouseX;
}
}
function mouseReleased() {
dragging = false;
}
let eyePic;
let x = 0;
let y = 0;
let ang = 90;
let col = 0;
let moveC = 1;
let manip;
var slider;
var song;
var offsetX = 0;
function preLoad() {
timtim = loadSound("assets/timtim.mp3");
eyePic = loadImage("assets/eye.jpg");
timtim.play();
}
function setup() {
createCanvas(windowWidth, windowHeight);
imageMode(CENTER);
angleMode(DEGREES);
colorMode(HSB);
slider = {
x: windowWidth / 20,
y: windowHeight * (16 / 20),
w: windowWidth / 20,
h: windowHeight / 22,
start: windowWidth / 20,
end: (2 / 11) * windowWidth
}
manip = 400 / 72;
textSize(24);
textAlign(LEFT);
}
function draw() {
randomBackground();
image(eyePic, 10, 10);
Sliders();
donut();
instructions();
}
function donut() {
var b = map(slider.x, slider.start, slider.end - slider.w, 0.01, 1);
push();
stroke(100, 100, 40);
col += moveC;
fill(col * 2, 75, 100);
if (col >= 100 || col < 0) {
moveC = moveC * -1;
}
ang += 5;
let weight = dist(mouseX, mouseY, pmouseX, pmouseY) * 10;
let transX = windowWidth / 2 + sin(ang * 2);
let transY = windowHeight / 2 + cos(ang / 3) * 20;
translate(transX, (transY - 50));
rotate(x / (b * sqrt(3) / 100));
x += 5;
for (i = 0; i < 360; i += 13) {
let ellipseX = windowWidth / 20 + cos(i++) * windowWidth / manip;
let ellipseY = windowWidth / 20 + sin(i++) * windowWidth / manip;
let ellipseSize = windowWidth / 20;
ellipse(ellipseX, ellipseY, ellipseSize * b);
}
pop();
}
function instructions() {
fill(255, 127);
text('  ^ slide me  > > >  to find a fun sweet spot!', windowWidth / 20, (18 / 20) * windowHeight);
}
function randomBackground() {
push();
colorMode(RGB);
background(random(100, 120), random(200, 50), random(100, 255), sqrt(3));
pop();
}
function Sliders() {
for (i = 0; i < 1; i++) {
if (dragging) {
slider.x = mouseX + offsetX;
}
slider.x = constrain(slider.x, slider.start, slider.end - slider.w);
push();
colorMode(RGB);
noStroke();
fill(255, 10);
rect(slider.x, slider.y + (i * windowWidth / 10), slider.w, slider.h, 10);
pop();
if (dragging) {
fill(50);
} else {
fill(50, 50);
}
noStroke();
rect(slider.x, slider.y, slider.w, slider.h, 10, 10);
}
}
function mousePressed() {
if (mouseX > slider.x && mouseX < slider.x + slider.w && mouseY > slider.y && mouseY < slider.y + slider.h) {
dragging = true;
offsetX = slider.x - mouseX;
}
}
function mouseReleased() {
dragging = false;
}
let micLevel;
let levelMultiplier = 1000;
let pixelWhiteCount=0;
let c;
function setup() {
mic = new p5.AudioIn()
mic.start();
createCanvas(800, 800);
background(0);
textAlign(CENTER);
}
function draw() {
drawText();
drawFear();
checkWhite();
}
function checkWhite() {
}
function drawText() {
micLevel = (mic.getLevel() * levelMultiplier);
fill(0, 102, 153);
if (micLevel < 35 && micLevel > 20) {
fill(255, 255, 255, 40);
textSize(random((height * 0.03), (height * 0.06)));
noStroke();
text("soft words", random(0, width), random(0, height));
pixelWhiteCount++;
}
if (micLevel < 65 && micLevel > 35) {
fill(255, 255, 255, 80);
textSize(random((height * 0.06), (height * 0.09)));
noStroke();
text("medium words", random(0, width), random(0, height));
pixelWhiteCount++;
}
if (micLevel > 65) {
fill(255, 255, 255, 120);
textSize((height * 0.09), (height * 0.12));
noStroke();
text("Loud words", random(0, width), random(0, height));
pixelWhiteCount++;
}
}
function drawFear() {
textSize(pixelWhiteCount/10);
fill(0, 0, 0,pixelWhiteCount,pixelWhiteCount/10);
stroke(255,pixelWhiteCount/10);
text("WORD", width / 2, height / 2);
}
let mic;
let micLevel;
let levelMultiplier = 500;
let pixelWhiteCount = 0;
let c;
let endThresh = 0;
let textEndSize;
function setup() {
mic = new p5.AudioIn()
mic.start();
createCanvas(800, 800);
background(0);
textAlign(CENTER);
}
function draw() {
drawText();
drawUnity();
checkWhite();
}
function checkWhite() {
}
function drawText() {
micLevel = (mic.getLevel() * levelMultiplier);
fill(0, 102, 153);
if (micLevel < 35 && micLevel > 20) {
fill(255, 255, 255, 20);
textSize(random((height * 0.03), (height * 0.06)));
text("soft words", random(0, width), random(0, height));
pixelWhiteCount++;
}
if (micLevel < 65 && micLevel > 35) {
fill(255, 255, 255, 50);
textSize(random((height * 0.06), (height * 0.09)));
text("medium words", random(0, width), random(0, height));
pixelWhiteCount++;
}
if (micLevel > 65) {
fill(255, 255, 255, 90);
textSize((height * 0.09), (height * 0.12));
text("Loud words", random(0, width), random(0, height));
pixelWhiteCount++;
}
endThresh += micLevel;
if (endThresh > 34000 + levelMultiplier * 2) {
endTakeOver();
}
}
function drawUnity() {
textSize(pixelWhiteCount/0.9);
fill(255, 255, 255, pixelWhiteCount / 3);
text("UNITY", width / 2, height / 2);
}
function endTakeOver() {
background(255);
textEndSize = constrain(pixelWhiteCount, 0, (9/10)*width);
textSize(textEndSize);
fill(0);
text("UNITY", width/2, height/2);
}
function keyPressed() {
if (keyCode === UP_ARROW) {
levelMultiplier += 10;
} else if (keyCode === DOWN_ARROW) {
levelMultiplier -= 10;
}
}
let mic;
let micLevel;
let levelMultiplier = 500;
let pixelWhiteCount = 0;
let c;
let endThresh = 0;
function setup() {
mic = new p5.AudioIn()
mic.start();
createCanvas(800, 800);
background(0);
textAlign(CENTER);
}
function draw() {
drawText();
drawFear();
checkWhite();
}
function checkWhite() {
}
function drawText() {
micLevel = (mic.getLevel() * levelMultiplier);
fill(0, 102, 153);
if (micLevel < 35 && micLevel > 20) {
fill(255, 255, 255, 20);
textSize(random((height * 0.03), (height * 0.06)));
text("soft words", random(0, width), random(0, height));
pixelWhiteCount++;
}
if (micLevel < 65 && micLevel > 35) {
fill(255, 255, 255, 50);
textSize(random((height * 0.06), (height * 0.09)));
text("medium words", random(0, width), random(0, height));
pixelWhiteCount++;
}
if (micLevel > 65) {
fill(255, 255, 255, 90);
textSize((height * 0.09), (height * 0.12));
text("Loud words", random(0, width), random(0, height));
pixelWhiteCount++;
}
endThresh += micLevel;
if (endThresh > 34000 + levelMultiplier * 2) {
endTakeOver();
}
}
function drawFear() {
textSize(pixelWhiteCount);
fill(255, 255, 255, pixelWhiteCount / 3);
text("FEAR!", width / 2, height / 2);
}
function endTakeOver() {
background(0);
textSize(pixelWhiteCount);
fill(255, 255, 255, pixelWhiteCount);
text("FEAR!", width / 2, height / 2);
}
function keyPressed() {
if (keyCode === UP_ARROW) {
levelMultiplier += 10;
} else if (keyCode === DOWN_ARROW) {
levelMultiplier -= 10;
}
}
let x = 0;
let y = 0;
let ang = 90;
let col = 0;
let moveC = 1;
let manip;
var slider = [];
var offsetX = 0;
function setup() {
createCanvas(windowWidth, windowHeight);
angleMode(DEGREES);
colorMode(HSB);
slider = {
x: windowWidth / 20,
y: windowHeight/20,
w: windowWidth / 20,
h: windowHeight / 22,
start: windowWidth / 20,
end: (2 / 11) * windowWidth
}
manip = 400 / 72;
}
function draw() {
randomBackground();
Sliders();
var b = map(slider.x, slider.start, slider.end - slider.w, 0.01, 1);
push();
stroke(100, 100, 40);
col += moveC;
fill(col * 2, 75, 100);
if (col >= 100 || col < 0) {
moveC = moveC * -1;
}
ang += 5;
let weight = dist(mouseX, mouseY, pmouseX, pmouseY) * 10;
let transX = windowWidth / 2 + sin(ang * 2);
let transY = windowHeight / 2 + cos(ang / 3) * 20;
translate(transX, (transY - 50));
rotate(x / (b * sqrt(3) / 100));
x += 5;
for (i = 0; i < 360; i += 13) {
let ellipseX = windowWidth / 20 + cos(i++) * windowWidth / manip;
let ellipseY = windowWidth / 20 + sin(i++) * windowWidth / manip;
let ellipseSize = windowWidth / 20;
ellipse(ellipseX, ellipseY, ellipseSize * b);
}
pop();
}
function randomBackground() {
push();
colorMode(RGB);
background(random(100, 120), random(200, 50), random(100, 255), sqrt(3));
pop();
}
function Sliders() {
for (i = 0; i < 6; i++) {
if (dragging) {
slider.x = mouseX + offsetX;
}
slider.x = constrain(slider.x, slider.start, slider.end - slider.w);
push();
colorMode(RGB);
noStroke();
fill(255, 10);
rect(slider.x, slider.y + (i*windowWidth/10), slider.w, slider.h, 10);
pop();
if (dragging) {
fill(50);
} else {
fill(50, 50);
}
noStroke();
rect(slider.x, slider.y, slider.w, slider.h, 10, 10);
}
}
function mousePressed() {
if (mouseX > slider.x && mouseX < slider.x + slider.w && mouseY > slider.y && mouseY < slider.y + slider.h) {
dragging = true;
offsetX = slider.x - mouseX;
}
}
function mouseReleased() {
dragging = false;
}
let y = 0;
let ang = 90;
let col = 0;
let moveC = 1;
let manip;
var slider;
var offsetX = 0;
function setup() {
createCanvas(windowWidth, windowHeight);
angleMode(DEGREES);
colorMode(HSB);
slider = {
x: windowWidth / 11,
y: (9 / 11) * windowHeight,
w: windowWidth / 10,
h: windowHeight / 11,
start: windowWidth / 11,
end: (9 / 11) * windowWidth
}
manip = 400 / 72;
}
function draw() {
randomBackground();
Sliders();
var b = map(slider.x, slider.start, slider.end - slider.w, 0.01, 1);
push();
stroke(100, 100, 40);
col += moveC;
fill(col * 2, 75, 100);
if (col >= 100 || col < 0) {
moveC = moveC * -1;
}
ang += 5;
let weight = dist(mouseX, mouseY, pmouseX, pmouseY) * 10;
let transX = windowWidth / 2 + sin(ang * 2);
let transY = windowHeight / 2 + cos(ang / 3) * 20;
translate(transX, (transY - 50));
rotate(x / (b * sqrt(3) / 100));
x += 5;
for (i = 0; i < 360; i += 13) {
let ellipseX = windowWidth / 20 + cos(i++) * windowWidth / manip;
let ellipseY = windowWidth / 20 + sin(i++) * windowWidth / manip;
let ellipseSize = windowWidth / 20;
ellipse(ellipseX, ellipseY, ellipseSize * b);
}
pop();
}
function randomBackground() {
push();
colorMode(RGB);
background(random(100, 120), random(200, 50), random(100, 255), sqrt(3));
pop();
}
function Sliders() {
if (dragging) {
slider.x = mouseX + offsetX;
}
slider.x = constrain(slider.x, slider.start, slider.end - slider.w);
push();
colorMode(RGB);
noStroke();
fill(255, 10);
rect(slider.x, slider.y, slider.w, slider.h, 10);
pop();
if (dragging) {
fill(50);
} else {
fill(50, 50);
}
noStroke();
rect(slider.x, slider.y, slider.w, slider.h, 10, 10);
}
function mousePressed() {
if (mouseX > slider.x && mouseX < slider.x + slider.w && mouseY > slider.y && mouseY < slider.y + slider.h) {
dragging = true;
offsetX = slider.x - mouseX;
}
}
function mouseReleased() {
dragging = false;
}let mic;
let endThresh;
let bkgdFadeIn;
function setup() {
mic = new p5.AudioIn()
mic.start();
createCanvas(400, 400);
background(0);
endThresh = 0;
}
function draw() {
micLevel = (mic.getLevel() * 500);
fill(0, 102, 153);
if (micLevel < 35 && micLevel > 20) {
fill(255, 255, 255, 20);
textSize(random(0, 12));
text("soft words", random(-20, 420), random(-20, 420));
}
if (micLevel < 65 && micLevel > 35) {
fill(255, 255, 255, 50);
textSize(random(12, 24));
text("medium words", random(-20, 420), random(-20, 420));
}
if (micLevel > 65) {
fill(255, 255, 255, 90);
textSize(random(24, 36));
text("Loud words", random(-20, 420), random(-20, 420));
}
endThresh += micLevel;
if (endThresh > 10000) {
endTakeOver();
}
}
function endTakeOver() {
background(0);
textSize(36);
text("FEAR", width / 2, height / 2);
}
let x = 0;
let y = 0;
let ang = 90;
let col = 0;
let moveC = 1;
let manip;
var slider;
var offsetX = 0;
function setup() {
createCanvas(windowWidth, windowHeight);
angleMode(DEGREES);
colorMode(HSB);
slider = {
x: windowWidth / 11,
y: (9 / 11) * windowHeight,
w: windowWidth / 11,
h: windowHeight / 11,
start: windowWidth / 11,
end: (9 / 11) * windowWidth
}
manip = 400 / 72;
}
function draw() {
randomBackground();
if (dragging) {
slider.x = mouseX + offsetX;
}
slider.x = constrain(slider.x, slider.start, slider.end - slider.w);
push();
colorMode(RGB);
noStroke();
fill(255, 10);
rect(slider.x, slider.y, slider.w, slider.h, 10);
pop();
if (dragging) {
fill(50);
} else {
fill(50, 50);
}
noStroke();
rect(slider.x, slider.y, slider.w, slider.h, 10, 10);
var b = map(slider.x, slider.start, slider.end - slider.w, 0, 1);
push();
stroke(100, 100, 40);
col += moveC;
fill(col*2, 75, 100);
if (col >= 100 || col < 0) {
moveC = moveC * -1;
}
ang += 5;
let weight = dist(mouseX, mouseY, pmouseX, pmouseY) * 10;
let transX = windowWidth / 2 + sin(ang * 2);
let transY = windowHeight / 2 + cos(ang / 3) * 20;
translate(transX, (transY - 50));
rotate(x / (b * sqrt(3) / 100));
x += 5;
for (i = 0; i < 360; i += 13) {
let ellipseX = windowWidth / 20 + cos(i++) * windowWidth / manip;
let ellipseY = windowWidth / 20 + sin(i++) * windowWidth / manip;
let ellipseSize =  windowWidth / 20;
ellipse(ellipseX, ellipseY, ellipseSize);
}
pop();
}
function randomBackground() {
push();
colorMode(RGB);
background(random(100, 120), random(200, 50), random(100, 255), sqrt(3));
pop();
}
function mousePressed() {
if (mouseX > slider.x && mouseX < slider.x + slider.w && mouseY > slider.y && mouseY < slider.y + slider.h) {
dragging = true;
offsetX = slider.x - mouseX;
}
}
function mouseReleased() {
dragging = false;
}let dims;
let x = 0;
let y = 0;
function setup() {
createCanvas(400, 400);
background(0);
dims = width / 10;
}
function draw() {
for (let x = 0; x < 10; x += 1) {
for (let y = 0; y < 10; y += 1) {
if ((x + y) % 2 == 0) {
fill(255);
rect(x * dims, y * dims, dims, dims);
} else {
fill(0);
rect(x * dims, y * dims, dims, dims);
}
}
}
}let dims;
function setup() {
createCanvas(400, 400);
background(0);
dims = width / 10;
}
function draw() {
fill(255);
for (let i = 0; i < 10; i++) {
for (let j = 0; j < 10; j++) {
if (i % 2 > 0 && j % 2 > 0) {
fill(0);
} else {
fill(255);
}
rect(i * dims, j * dims, dims, dims);
}
}
}let dims;
function setup() {
createCanvas(400, 400);
background(0);
dims = width / 10;
}
function draw() {
fill(255);
for (let i = 1; i < 11; i++) {
for (let j = 1; j < 11; j++) {
if (i % 2 > 0 && j % 2 > 0) {
fill(0);
} else {
fill(255);
}
rect(i * dims, j * dims, dims, dims);
}
}
}let dims;
function setup() {
createCanvas(400, 400);
background(0);
dims = width / 10;
}
function draw() {
fill(255);
for (let i = 0; i < 10; i++) {
for (let j = 0; j < 10; j++) {
if (i % 2 > 0 && j % 2 > 0) {
fill(0);
} else {
fill(255);
}
rect(i * dims, j * dims, dims, dims);
}
}
}let dims;
function setup() {
createCanvas(400, 400);
background(0);
dims = width / 10;
}
function draw() {
fill(255);
for (let i = 0; i < 10; i++) {
for (let j = 0; j < 10; j++) {
rect(i * dims, j * dims, dims, dims);
}
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
stroke(1);
for (let i = 0; i < 10; i++) {
let rectCheck = (mouseX > i * width / 10 && mouseX <= i * width / 10 + width / 10);
if (rectCheck == true) {
let color = ['red', 'green', 'blue', 'yellow', 'brown', 'black', 'purple', 'orange', 'gray', 'pink']
fill(color[i]);
rect(i * width / 10, 0, width / 10, height);
} else {
fill('white');
rect(i * width / 10, 0, width / 10, height);
}
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
stroke(1);
for (let i = 0; i < 10; i++) {
let rectCheck = (mouseX > i * width / 10 && mouseX <= i * width / 10 + width / 10);
if (rectCheck == true) {
if (i % 2 > 0) {
fill('red');
rect(i * width / 10, 0, width / 10, height);
} else if (i % 2 == 0) {
fill('blue');
rect(i * width / 10, 0, width / 10, height);
}
} else {
fill('white');
rect(i * width / 10, 0, width / 10, height);
}
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
stroke(1);
for (let i = 0; i < 10; i++) {
let rectCheck = (mouseX > i * width / 10 && mouseX <= i * width / 10 + width / 10);
if (rectCheck == true) {
if (i == redHalf) {
fill('red');
rect(i * width / 10, 0, width / 10, height);
} else if (i > 4) {
fill('blue');
rect(i * width / 10, 0, width / 10, height);
}
} else {
fill('white');
rect(i * width / 10, 0, width / 10, height);
}
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
stroke(1);
for (let i = 0; i < 10; i++) {
let rectCheck = (mouseX > i * width / 10 && mouseX <= i * width / 10 + width / 10);
if (rectCheck == true) {
if (i != 6) {
fill('red');
rect(i * width / 10, 0, width / 10, height);
}
} else {
fill('white');
rect(i * width / 10, 0, width / 10, height);
}
}
}function setup() {
createCanvas(400, 400);
}
function draw() {
stroke(1);
for (let i = 0; i < 10; i++) {
let rectCheck = (mouseX > i * width / 10 && mouseX <= i * width / 10 + width / 10);
if (rectCheck == true) {
fill('red');
rect(i * width / 10, 0, width / 10, height);
} else {
fill('white');
rect(i * width / 10, 0, width / 10, height);
}
}
let white = 255;
let green = [0, 255, 0];
let gray = 127;
let yellow = [255, 255, 0];
let black = 0;
let blue = [0, 0, 255];
let red = [255, 0, 0];
let rect1Color = white;
let rect1ColorHover = green;
let rect2Color = gray;
let rect2ColorHover = yellow;
let rect3Color = black;
let rect3ColorHover = blue;
let redToggle;
function setup() {
createCanvas(400, 400);
redToggle = false;
}
function mouseClicked() {
rect3ColorHover = red;
rect3Color = red;
}
function draw() {
let rect1Check = (mouseX > 0 && mouseX < width / 3);
let rect2Check = (mouseX > width / 3 && mouseX < 2 / 3 * width);
let rect3Check = (mouseX > 2 / 3 * width && mouseX < width);
noStroke();
fill(rect1Color);
rect(0, 0, width / 3, height);
fill(rect2Color);
rect(width / 3, 0, width / 3, height);
fill(rect3Color);
rect(2 * width / 3, 0, width / 3, height);
if (rect1Check == true) {
rect1Color = rect1ColorHover;
} else {
rect1Color = white;
}
if (rect2Check == true) {
rect2Color = rect2ColorHover;
} else {
rect2Color = gray;
}
if (rect3Check == true && rect3ColorHover == red) {
rect3Color = red; } 
else if (rect3Check == true) {
rect3Color = rect3ColorHover;
} else {
rect3Color = black;
}
}
let white = 255;
let green = [0, 255, 0];
let gray = 127;
let yellow = [255, 255, 0];
let black = 0;
let blue = [0, 0, 255];
let red = [255, 0, 0];
let rect1Color = white;
let rect1ColorHover = green;
let rect2Color = gray;
let rect2ColorHover = yellow;
let rect3Color = black;
let rect3ColorHover = blue;
let turnRed;
let redToggle;
function setup() {
createCanvas(400, 400);
}
function mouseClicked() {
redToggle = !redToggle;
}
function draw() {
let rect1Check = (mouseX > 0 && mouseX < width / 3);
let rect2Check = (mouseX > width / 3 && mouseX < 2 / 3 * width);
let rect3Check = (mouseX > 2 / 3 * width && mouseX < width);
noStroke();
fill(rect1Color);
rect(0, 0, width / 3, height);
fill(rect2Color);
rect(width / 3, 0, width / 3, height);
fill(rect3Color);
rect(2 * width / 3, 0, width / 3, height);
if (rect1Check == true) {
rect1Color = rect1ColorHover;
} else {
rect1Color = white;
}
if (rect2Check == true) {
rect2Color = rect2ColorHover;
} else {
rect2Color = gray;
}
if (rect3Check == true) {
rect3Color = rect3ColorHover;
} else {
rect3Color = black;
}
}let x = 20;
let xSpeed = 10;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
x += xSpeed;
ellipse(x, height / 2, 50, 50);
if (x > width - 20 || x < 20) {
xSpeed = -xSpeed;
} else {
xSpeed = xSpeed;
}
}let x, y;
let i = 0;
var colors = {
a: [48, 111, 191],
b: [88, 210, 204],
c: [216, 60, 141]
}
function setup() {
createCanvas(400, 400);
angleMode(DEGREES);
colorMode(HSB);
colorMode(RGB);
push();
translate(0, 50);
rotate(10);
fill(colors.a);
rect(-100, -200, width + 200, height);
pop();
push();
translate(0, 50);
rotate(10);
fill(colors.b);
rect(-100, 200, width + 200, height);
pop();
}
function draw() {
push();
colorMode(HSB);
noStroke();
fill(lerpColor(color.a,color.b,inter));
ellipse(100, 100, 100);
pop();
}let x, y;
let i = 0;
var colors = {
a: [48, 111, 191],
b: [88, 210, 204],
c: [216, 60, 141]
}
function setup() {
createCanvas(400, 400);
angleMode(DEGREES);
push();
translate(0, 50);
rotate(10);
fill(colors.a);
rect(-100, -200, width + 200, height);
pop();
push();
translate(0, 50);
rotate(10);
fill(colors.b);
rect(-100, 200, width + 200, height);
pop();
}
function draw() {
noStroke();
fill(colors.c);
ellipse(100, 100, 100);
}var mic;
var vol;
let opac, opacRand, opacMap;
let x, y;
let moveCircle;
let volMap;
function setup() {
createCanvas(710, 200);
opacRand = random(0, -1);
mic = new p5.AudioIn();
mic.start();
opac = opac + opacMap;
moveCircle = map(vol, 0, 1, 0, 20);
}
function draw() {
background(200);
var vol = mic.getLevel();
volMap = map(vol, 0, 1, 0, 255);
opacMap = map(vol, 0, 1, 0, 255);
fill(127, opac + opacRand);
stroke(0);
ellipse(-50 + moveCircle, height / 2, 50, 50);
}var mic;
let opac;
var micVol;
let micCheck;
let opacRate = 0.1;
let alphaVal;
let opacReduction;
let size = 0;
function setup() {
createCanvas(710, 200);
background(0);
mic = new p5.AudioIn();
mic.start();
opacReduction = random(-50, 0);
}
function draw() {
var micVol = mic.getLevel();
opac = map(micVol, 0, 1, 0, 255);
alphaVal = opac * opacRate + opacReduction;
fill(255, alphaVal);
size = alphaVal*5;
if (alphaVal > 30) {
}
noStroke();
ellipse(width / 2, height / 2, 10 + size, 10 + size);
}function setup() {
}
var mx = 1;
var my = 1;
var easing = 0.05;
var radius = 10;
var edge = 100;
var inner = edge + radius;
function setup() {
createCanvas(700, 700);
noStroke();
ellipseMode(RADIUS);
rectMode(CORNERS);
}
function draw() {
background(0);
fill(255);
if (mouseIsPressed) {
fill(random(0, 255), random(0, 255), random(0, 255));
radius = random(2, 15)
}
for (let z = 0; z < 6; z++) {
for (let i = 0; i < 6; i++) {
mx = constrain(mouseX, 50 + z * 100, 100);
my = constrain(mouseY, 50 + i * 100, 100);
ellipse(mx, my, radius, radius);
}
}
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
}let x = 0;
let y = 0;
let ang = 90;
let col = 0;
let moveC = 1;
let manip;
function setup() {
createCanvas(windowWidth, windowHeight);
angleMode(DEGREES);
colorMode(HSB);
manip = 400/72;
}
function draw() {
push();
colorMode(RGB);
background(random(100, 120), random(200, 50), random(100, 255), 5);
pop();
stroke(100, 100, 40);
col += moveC;
fill(col + 50, 75, 100);
if (col >= 100 || col < 0) {
moveC = moveC * -1;
}
ang+=5;
let weight = dist(mouseX,mouseY,pmouseX,pmouseY)*10;
translate(width/2 + sin(ang*2)*2, height/2 + cos(ang)*20);
rotate(x);
x+=1;
for (i = 0; i < 360; i += 13) {
ellipse(width / 20 + cos(i++) * width / manip, width / 20 + sin(i++) * width / manip, width / 20, width / 20);
}
}let x = 0;
let y = 0;
let ang = 90;
let col = 0;
let moveC = 1;
function setup() {
createCanvas(windowWidth, windowHeight);
angleMode(DEGREES);
colorMode(HSB);
}
function draw() {
push();
colorMode(RGB);
background(random(100, 120), random(200, 50), random(100, 255), 5);
pop();
stroke(100, 100, 40);
col += moveC;
fill(col + 50, 75, 100);
if (col >= 100 || col < 0) {
moveC = moveC * -1;
}
translate(width/2, height/2);
rotate(x);
x+=1;
for (i = 0; i < 360; i += 13) {
ellipse(width / 20 + cos(i++) * width / (400 / 72), width / 20 + sin(i++) * width / (400 / 72), width / 20 + mouseX, width / 20 -mouseY);
}
}let x = 0;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
ellipse(x,height/2,50,50);
x+=10;
}let x;
let y;
let ease = 0.1;
let move = 0;
function setup() {
createCanvas(400, 400);
rectMode(CENTER);
x = width / 2;
y = width / 2;
let ease = random(0.5,6);
}
function draw() {
background(220);
strokeWeight(3);
fill(255);
var targetX = mouseX;
var targetY = mouseY;
x += (targetX - x) * ease;
y += (targetY - y) * ease;
rect(x + random(-5,5), y + random(-5,5), width / 4, height / 4);
}let x = 0;
let y = 0;
let ang = 90;
let col = 0;
let moveC = 1;
function setup() {
createCanvas(windowWidth, windowHeight);
angleMode(DEGREES);
colorMode(HSB);
}
function draw() {
push();
colorMode(RGB);
background(random(100, 120), random(200, 50), random(100, 255), 5);
pop();
stroke(100, 100, 40);
col += moveC;
fill(col + 50, 75, 100);
if (col >= 100 || col < 0) {
moveC = moveC * -1;
}
translate(width/2, height/2);
rotate(x);
x++;
for (i = 0; i < 360; i += 13) {
ellipse(width / 20 + cos(i++) * width / (400 / 72), width / 20 + sin(i++) * width / (400 / 72), width / 20, width / 20);
}
}let x = 0;
let y = 0;
let ang = 0;
function setup() {
createCanvas(windowWidth, windowHeight);
angleMode(DEGREES);
ellipseMode(CENTER);
}
function draw() {
background(220, 200, 200, 8 + random(2, -2));
translate(width / 2, height / 2);
rotate(ang);
ang = ang + 1;
noStroke();
fill(255);
for (i = 0; i < 360; i += 13) {
ellipse(width / 20 + cos(i++) * width/(400/72), width / 20 + sin(i++) * width/(400/72), width / 20, width / 20);
}
}let x = 0;
let y = 0;
let ang = 0;
function setup() {
createCanvas(400, 400);
angleMode(DEGREES);
ellipseMode(CENTER);
}
function draw() {
background(220, 200, 200, 8 + random(2,-2));
stroke(0);
noFill();
ellipse(width / 2 + random(-5, 5), height / 2 + random(-1, 1), width / 20, width / 20);
noStroke();
fill(0, 100, 200, 100);
ellipse(width / 2 + cos(x++) * 100, height / 2 - sin(x++) * 100, width / 20, width / 20);
fill(100, 200, 0, 100);
ellipse(width / 2 - cos(x++) * 100, height / 2 + sin(x++) * 100, width / 20, width / 20);
}let x = 0;
let y = 0;
let ang = 90;
let col = 0;
function setup() {
createCanvas(windowWidth, windowHeight);
angleMode(DEGREES);
colorMode(HSB);
}
function draw() {
push();
colorMode(RGB);
background(random(100, 120), random(200, 50), random(100, 255), 10);
pop();
noStroke();
col < 100 ? col++ : col--;
noFill();
fill(col + 100, 200, 100);
translate(width / 2, height / 2);
rotate(x);
ellipse(10, 10 - y / 2, 50 - y / 2, 50);
x > width ? x-- : x++;
y--;
}let x = 10;
let y = 10;
let angle;
function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
angle = x + PI;
x++;
fill(100);
noStroke();
ellipse(100 + x + abs(sin(angle) * 40), 100, 10, 10);
}var cam;
var w;
var angle;
var inc;
function setup() {
createCanvas(400, 400);
colorMode(RGB);
cam = createCapture(VIDEO);
inc = TWO_PI / 10.0;
}
function draw() {
background(0, 206, 209);
cam.loadPixels();
var totalB = 0;
for (var i = 0; i < cam.width * cam.height * 4; i += 4) {
var r = cam.pixels[i];
var g = cam.pixels[i + 1];
var b = cam.pixels[i + 2];
var c = color(r, g, b);
var bright = brightness(c);
totalB = totalB + bright;
}
var averageB = totalB / (cam.width * cam.height * 4);
var moveB = 0;
if (averageB >= 10) {
moveB = 10;
}
w = averageB / 10;
fill(255, 224, 189);
noStroke();
arc(104, 170, 40, 60, PI / 3, 3 * PI / 2);
arc(296, 170, 40, 60, 3 * PI / 2, PI / 3);
strokeWeight(0);
ellipse(width / 2, height / 2, 220, 300);
fill(255);
noStroke();
let pupilWidth = constrain(15 * (1 / w), 10, 20);
ellipse(width / 2.75, 150, 60, 1.6 * pupilWidth);
ellipse(width / 1.6, 150, 60, 1.6 * pupilWidth);
fill(46, 180, 25);
stroke(46, 180, 25);
ellipse(width / 2.75, 150, 30, 1.5 * pupilWidth);
ellipse(width / 1.6, 150, 30, 1.5 * pupilWidth);
fill(0);
ellipse(width / 2.75, 150, pupilWidth, pupilWidth);
ellipse(width / 1.6, 150, pupilWidth, pupilWidth);
noFill();
strokeWeight(8);
stroke(90, 43, 11, 127);
bezier(180, 130 - pupilWidth / 2, 170, 120, 115, 130, 115, 126, );
bezier(220, 130 - pupilWidth / 2, 230, 120, 285, 135, 282, 129, );
strokeWeight(1);
stroke(255);
line(274, 160, 254, 185);
line(264, 160, 245, 185);
strokeWeight(4);
fill(255, 100);
stroke(127, 127);
ellipse(width / 2.75, 160, 80);
ellipse(width / 1.6, 160, 80);
curve(186, 190, 185, 160, 210, 160, 210, 180);
curve(150, 157, 102, 157, 95, 140, 100, 140);
curve(350, 157, 290, 157, 303, 143, 300, 100);
fill(0, 0);
curve(250, 50, 195, 144, 211, 240, 450, 15);
stroke(255, 192, 203);
strokeWeight(5);
fill(255);
arc(width / 2, height / 1.55, 100, 100, 0, HALF_PI + HALF_PI, PIE);
strokeWeight(0.5);
stroke(0);
line(156, 280, 245, 279);
angle = 0.0;
for (var i = 0; i < 6; i++) {
line(i * 12 + 170, height / 1.55 + 2, i * 12 + 170 , 292 + sin(angle)*11);
angle = angle + inc;
}
rectMode(CENTER);
fill(90, 43, 11);
noStroke();
rect(width / 2, 80, 150, 40, 40);
rectMode(CORNER);
arc(width / 2, 85, 200, 80, PI, 0);
triangle(173, 96, 185, 99, 175, 120);
triangle(190, 96, 200, 99, 195, 115);
triangle(220, 96, 240, 98, 216, 112);
arc(120, 110, 60, 90, 2 * PI / 2.75, 5 * PI / 3);
arc(280, 110, 50, 95, -2 * PI / 2.5, -5 * PI / 3);
}class Orb {
constructor() {
let x, y;
let moveX, moveY;
let angle;
angle = 3;
x = 500;
y = 600;
moveX = sin(angle) * 40;
moveY = sin(angle) * 30;
}
function display() {
x = x + moveX;
y = y + moveY;
translate(100, 100);
noStroke();
fill(map(x, 0, 800, 100, 255) + 50, map(x, 0, 800, 100, 255), x + y / 4, 40);
ellipse(x, y, 100 - x, 100 - y);
if (x < -100 || x > width) {
moveX = -1 * moveX;
}
if (y < -100 || y > height) {
moveY = -1 * moveY;
}
}
let o;
function setup() {
createCanvas(800, 800);
background(255);
}
}
function draw() {
o = new Orb();
o.display();
}var cam;
function setup() {
createCanvas(400, 400);
colorMode(RGB);
background(0, 206, 209);
cam = createCapture(VIDEO);
}
function draw() {
cam.loadPixels();
var totalB = 0;
for(var i = 0; i < cam.width * cam.height * 4; i += 4){
var r = cam.pixels[i];
var g = cam.pixels[i + 1];
var b = cam.pixels[i + 2];
var c = color(r, g, b);
var bright = brightness(c);
totalB = totalB + bright;
}
var averageB = totalB / (cam.width * cam.height * 4);
var moveB = 0;
map(averageB,0,20,0,1);
let w;
w = averageB;
fill(255, 224, 189);
noStroke();
arc(104, 170, 40, 60, PI / 3, 3 * PI / 2);
arc(296, 170, 40, 60, 3 * PI / 2, PI / 3);
strokeWeight(0);
ellipse(width / 2, height / 2, 220, 300);
fill(255);
noStroke();
ellipse(width / 2.75, 150, 60, 25 * w);
ellipse(width / 1.6, 150, 60, 25 * w);
fill(46, 180, 25);
stroke(46, 180, 25);
ellipse(width / 2.75, 150, 30, 28 * w);
ellipse(width / 1.6, 150, 30, 28 * w);
fill(0)
ellipse(width / 2.75, 150, 15 * w , 15 * w);
ellipse(width / 1.6, 150, 15 * w, 15 * w);
noFill();
strokeWeight(8);
stroke(90, 43, 11,127);
bezier(180, 123 - moveB, 170, 120, 115, 130, 115, 126, );
bezier(220, 125 - moveB, 230, 120, 285, 135, 282, 129, );
strokeWeight(1);
stroke(255);
line(274, 160, 254, 185);
line(264, 160, 245, 185);
strokeWeight(4);
fill(255, 100);
stroke(127, 127);
ellipse(width / 2.75, 160, 80);
ellipse(width / 1.6, 160, 80);
curve(186, 190, 185, 160, 210, 160, 210, 180);
curve(150, 157, 102, 157, 95, 140, 100, 140);
curve(350, 157, 290, 157, 303, 143, 300, 100);
fill(0, 0);
curve(250, 50, 195, 144, 211, 240, 450, 15);
stroke(255, 192, 203);
strokeWeight(5);
fill(255);
arc(width / 2, height / 1.55, 100, 100, 0, HALF_PI + HALF_PI, PIE);
strokeWeight(0.5);
stroke(0);
line(156, 280, 245, 279);
var y = height / 1.55 + 2;
line(168, y, 168, 292);
line(180, y, 180, 300);
line(192, y, 192, 306);
line(204, y, 204, 306);
line(216, y, 216, 303);
line(228, y, 228, 296);
rectMode(CENTER);
fill(90, 43, 11);
noStroke();
rect(width / 2, 80, 150, 40, 40);
rectMode(CORNER);
arc(width / 2, 85, 200, 80, PI, 0);
triangle(173, 96, 185, 99, 175, 120);
triangle(190, 96, 200, 99, 195, 115);
triangle(220, 96, 240, 98, 216, 112);
arc(120, 110, 60, 90, 2 * PI / 2.75, 5 * PI / 3);
arc(280, 110, 50, 95, -2 * PI / 2.5, -5 * PI / 3);
}
let x, y;
let moveX, moveY;
function setup() {
createCanvas(800, 800);
background(255);
}
x = 0;
y = 0;
moveX = 24;
moveY = 18;
function draw() {
x = x + moveX;
y = y + moveY;
translate(100,100);
noStroke();
fill(map(x,0,800,0,255),map(y,0,800,0,255), x + y / 4, 40);
ellipse(x, y, 100 - x, 100 - y);
if (x < -100 || x > width) {
moveX = -1 * moveX;
}
if (y < -100 || y > height) {
moveY = -1 * moveY;
}
}var circle = {
x: 120,
y: 10,
moveX: 3.14159265359 * 3,
moveY: 3.14159265358 * 2,
}
function setup() {
createCanvas(3.14159265359 * 300, 3.14159265359 * 250);
}
function circle1() {
fill(random(50, 100), 1, random(100, 250), random(50, 100));
noStroke();
circle.x = circle.x + circle.moveX;
circle.y = circle.y + circle.moveY;
ellipse(circle.x, circle.y, 100 + circle.x / 2, 100 + circle.y / 2);
if (circle.x >= width || circle.x <= 0) {
circle.moveX = -1 * circle.moveX;
}
if (circle.y >= height || circle.y <= 0) {
circle.moveY = -1 * circle.moveY;
}
}
function circle2() {
fill(random(50, 100), 201, random(100, 250));
noStroke();
circle.x = circle.x + circle.moveX;
circle.y = circle.y + circle.moveY;
ellipse(circle.x, circle.y, circle.x / 2, circle.y / 2);
if (circle.x >= width || circle.x <= 0) {
circle.moveX = -1 * circle.moveX;
}
if (circle.y >= height || circle.y <= 0) {
circle.moveY = -1 * circle.moveY;
}
}
function draw() {
circle1();
circle2();
}var circle = {
x : 12,
y : 1,
moveX : 3.14159265359*3,
moveY : 3.14159265358*2,
}
function setup() {
createCanvas(3.14159265359*300,3.14159265359*250);
}
function circle1() {
fill(random(50,100),1,random(100,250));
noStroke();
circle.x = circle.x + circle.moveX;
circle.y = circle.y + circle.moveY;
ellipse(circle.x, circle.y, 50+circle.x/2, 50+circle.y/2);
if (circle.x >= width || circle.x <= 0) {
circle.moveX = -1 * circle.moveX;
}
if (circle.y >= height || circle.y <= 0) {
circle.moveY = -1 * circle.moveY;
}
}
function circle2() {
fill(random(50,100),201,random(100,250));
noStroke();
circle.x = circle.x + circle.moveX;
circle.y = circle.y + circle.moveY;
ellipse(circle.x, circle.y, circle.x/2, circle.y/2);
if (circle.x >= width || circle.x <= 0) {
circle.moveX = -1 * circle.moveX;
}
if (circle.y >= height || circle.y <= 0) {
circle.moveY = -1 * circle.moveY;
}
}
function draw() {
circle1();
circle2();
}function setup() {
createCanvas(400, 400);
}
function draw() {
background(220);
var a = 0;
var inc = TWO_PI / 25.0;
for (var i = 0; i < 10; i++) {
line(100,200,300,100+sin(a) * 200);
a = a + inc;
if (a > 200 || a < 0) {
inc = inc*-1;
}
}
}function setup() {
createCanvas(400, 400);
colorMode(RGB);
background(0, 206, 209);
fill(255, 224, 189);
noStroke();
arc(104, 170, 40, 60, PI / 3, 3 * PI / 2);
arc(296, 170, 40, 60, 3 * PI / 2, PI / 3);
strokeWeight(0);
ellipse(width / 2, height / 2, 220, 300);
fill(255);
noStroke();
ellipse(width / 2.75, 150, 60, 25);
ellipse(width / 1.6, 150, 60, 25);
fill(46, 180, 25);
stroke(46, 180, 25);
ellipse(width / 2.75, 150, 30, 28);
ellipse(width / 1.6, 150, 30, 28);
fill(0)
ellipse(width / 2.75, 150, 15, 15);
ellipse(width / 1.6, 150, 15, 15);
noFill();
strokeWeight(8);
stroke(90, 43, 11,127);
bezier(180, 123, 170, 120, 115, 130, 115, 126, );
bezier(220, 125, 230, 120, 285, 135, 282, 129, );
strokeWeight(1);
stroke(255);
line(274, 160, 254, 185);
line(264, 160, 245, 185);
strokeWeight(4);
fill(255, 100);
stroke(127, 127);
ellipse(width / 2.75, 160, 80);
ellipse(width / 1.6, 160, 80);
curve(186, 190, 185, 160, 210, 160, 210, 180);
curve(150, 157, 102, 157, 95, 140, 100, 140);
curve(350, 157, 290, 157, 303, 143, 300, 100);
fill(0, 0);
curve(250, 50, 195, 144, 211, 240, 450, 15);
stroke(255, 192, 203);
strokeWeight(5);
fill(255);
arc(width / 2, height / 1.55, 100, 100, 0, HALF_PI + HALF_PI, PIE);
strokeWeight(0.5);
stroke(0);
line(156, 280, 245, 279);
var y = height / 1.55 + 2;
line(168, y, 168, 292);
line(180, y, 180, 300);
line(192, y, 192, 306);
line(204, y, 204, 306);
line(216, y, 216, 303);
line(228, y, 228, 296);
rectMode(CENTER);
fill(90, 43, 11);
noStroke();
rect(width / 2, 80, 150, 40, 40);
rectMode(CORNER);
arc(width / 2, 85, 200, 80, PI, 0);
triangle(173, 96, 185, 99, 175, 120);
triangle(190, 96, 200, 99, 195, 115);
triangle(220, 96, 240, 98, 216, 112);
arc(120, 110, 60, 90, 2 * PI / 2.75, 5 * PI / 3);
arc(280, 110, 50, 95, -2 * PI / 2.5, -5 * PI / 3);
}function setup() {
createCanvas(500, 450);
}
function draw() {
background(255,100,100);
stroke(250,255,100);
line(150,100,100,125);
line(350,100,400,125);
fill(150,255,200);
ellipse(150,150,50,50);
ellipse(350,150,50,50);
fill(100);
noStroke();
ellipse(150,150,25,25);
ellipse(350,150,25,25);
fill(255);
noStroke();
ellipse(150,150,8,8);
ellipse(350,150,8,8);
stroke(250,255,100);
fill(150,255,200);
arc(250,250,250,200, 0, HALF_PI+HALF_PI, PIE);
fill(255);
noStroke();
arc(250,260,200,160, 0, HALF_PI+HALF_PI, PIE);
}