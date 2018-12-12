var videoInput;
var ctracker;
function setup() {
  videoInput = createCapture(VIDEO);
  videoInput.size(400, 300);
  videoInput.position(0, 0);
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(videoInput.elt);
}
function draw() {
  var positions = ctracker.getCurrentPosition();
  console.log(positions);
}
var state;
var count = 0;
var cart = [];
var angle = 0;
function setup() {
  createElement("h1", "Ferris Wheel Operator");
  createCanvas(600, 400);
  angleMode(DEGREES);
  cart = new Cart();
}
function draw() {
  background(120, 200, 255);
  push();
  noStroke();
  fill(50, 200, 50);
  rect(0, 270, width, 200);
  pop();
  
  push();
  noFill();
  ellipse(300, 150, 250, 250);
  ellipse(300, 150, 200, 200);
  line(300, 160, 370, 330);
  line(300, 160, 240, 330);
  translate(300, 150);
  rotate(angle); 
  let count = 0;
  for (var degs = 0; degs < 360; degs += 45) {
    push();
    rotate(degs);
    line(115, 0, 0, 0);
    cart.show();
    pop();
  
  }
  
  pop();
    if (state) {
    	angle = angle - 1;
  	} else {
    	angle = angle + 1;
  	}
  fill(200, 100, 200);
  ellipse(300, 150, 30, 30);
  stroke(200, 100, 200);
  rect(210, 330, 190, 5);
}
function mousePressed() {
  	if (dist(mouseX, mouseY, 300, 150) < 20/2) {
  		state = !state;
    	count++;
    
    }
}
function mouseReleased() {
  	if (dist(mouseX, mouseY, 300, 150) < 20/2) {
  		state = 0;
    	count++;
    
    }
}var img;
function preload() {
  img = loadImage('face.jpg');
}
function setup() { 
  canvas = createCanvas(400, 400);
  pixelDensity(1);
  pic = image(img, 0, 0, width, height);
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(canvas.elt);
  noStroke();
  image(img, 0, 0, width, height);
  var positions = ctracker.track(canvas.elt);
  for (var i = 0; i < positions.length; i++) {
    fill(map(positions[i][0], width * 0.33, width * 0.66, 0, 255), map(positions[i][1], height * 0.33, height * 0.66, 0, 255), 255);
    ellipse(positions[i][0], positions[i][1], 8, 8);
  }
} 
var canvas;
var pic;
function setup() { 
  canvas = createCanvas(400, 400);
  select('canvas').center();
  getData();
  
} 
function getData() {
    removeElements();
    var img = createImg(response[0].submission).center();
    image(img, 0, 0);
    img.remove();
    ctracker = new clm.tracker();
    ctracker.init(pModel);
    ctracker.start(canvas.elt);
    noStroke();
    var positions = ctracker.track(canvas.elt);
    for (var i = 0; i < positions.length; i++) {
      fill(map(positions[i][0], width * 0.33, width * 0.66, 0, 255), map(positions[i][1], height * 0.33, height * 0.66, 0, 255), 255);
      ellipse(positions[i][0], positions[i][1], 8, 8);
    }
    setTimeout(getData, 100);
  });		
}
var ctracker;
var cnv;
function setup() {
  var videoInput = createCapture(VIDEO);
  videoInput.size(400, 300);
  videoInput.position(0, 0);
 cnv = createCanvas(400, 300);
  cnv.position(0, 0);
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(videoInput.elt);
  noStroke();
}
function draw() {
  clear();
  var positions = ctracker.getCurrentPosition();
  for (var i = 0; i < positions.length; i++) {
    fill(map(positions[i][0], width * 0.33, width * 0.66, 0, 255), map(positions[i][1], height * 0.33, height * 0.66, 0, 255), 255);
    ellipse(positions[i][0], positions[i][1], 8, 8);
  }
}
var y;
function setup() { 
  createCanvas(400, 400);
  background(220);
  x = 200;
  y = 200;
} 
function draw() { 
  stroke(51);
  strokeWeight(2);
  point(x,y);
  
  var r = floor(random(4));
  
  switch(r) {
    case 0:
      x = x + 1;
      break;
    case 1:
      x = x - 1;
      break;
    case 2: 
      y = y + 1;
      break;
    case 3:
      y = y - 1;
      break;
          
  }
      
}let now = new Date();
let previousMinute = 0;
let currentMinute = now.getMinutes();
let image;
let zoom;
function drawTime(){
 	image = select('#container');
  
  if (previousMinute - currentMinute == 1){
  	previousMinute = currentMinute;
    zoom = 500/previousMinute;
    image.style('background-size', zoom + '');
    console.log(previousMinute);
    if (previousMinute > 59) {
      previousMinute = 0;
      zoom = 500;
  	}
  }
  
  
}
function draw(){
 drawTime();
}let brown_rat;
let black_rat;
let brownX = 0;
let brownY = 0;
function setup() {
  brown_rat = select('#brown');
  black_rat = select('#black');
}
function draw() {
  brown_rat.style('left', brownX);
}
function keyPressed() {
  if (keyCode === 32) {
    brownX += 10;
  } 
}
function mousePressed() {
  
}let di;
let di_2;
let oldNum = 10;
let diceNumber = 0;
let newNum;
let button;
let roundCrossed = 1;
let start = 10;
function setup() { 
	button = createButton("roll the dice").mousePressed(roll);
  createCanvas(600, 600);
	di = width/ (1 + (1/4));
	di_2 = width/2;
} 
function draw() { 
  background(255);
  board();
}
function board() {
  noStroke();
	fill(204,204,255);
	ellipse(width/2, height/2, di);
	if (frameCount%5 == 0) {
    if (oldNum < newNum) {
    oldNum ++;
    }
  }
   if( oldNum - start >= (14 * roundCrossed) ){
    console.log("crossed " + roundCrossed);
    roundCrossed++;
  }
	fill(255);
	ellipse( cXval, cYval, 50, 50);
	fill(125);
	textSize(14);
	noStroke();
	textAlign(CENTER);
	text("PAYDAY", width/2, (((height/2) - (di/2)) + ((height/2) - (di_2/2)))/(1 + (9/10)));
  stroke(153, 153, 255);
	for(i = 0; i < 14; i++) {
    xVal = (width/2 + (di/2) * Math.cos(2 * Math.PI * i / 14));
    yVal = (height/2 + (di/2) * Math.sin(2 * Math.PI * i / 14));
		line(width/2, height/2, xVal, yVal);
	}
	fill(255);
	noStroke();
	ellipse(width/2, height/2, di_2);
  fill(0);
  textSize(24);
  text(diceNumber + "", 20, 80);
}
function roll() {
  diceNumber = Math.floor((Math.random() * 6) + 1);
  newNum = oldNum + diceNumber;
}let di;
let di_2;
let oldNum = 10;
let random = 0;
let newNum;
let button;
function setup() { 
	button = createButton("roll the dice").mousePressed(roll);
  createCanvas(600, 600);
	di = width/ (1 + (1/4));
	di_2 = width/2;
} 
function draw() { 
  background(255);
  board();
}
function board() {
  noStroke();
	fill(204,204,255);
	ellipse(width/2, height/2, di);
	if (oldNum < newNum) {
    oldNum ++; 
  }
	fill(255);
	ellipse( cXval, cYval, 50, 50);
	fill(125);
	textSize(14);
	noStroke();
	textAlign(CENTER);
	text("PAYDAY", width/2, (((height/2) - (di/2)) + ((height/2) - (di_2/2)))/(1 + (9/10)));
  stroke(153, 153, 255);
	for(i = 0; i < 14; i++) {
    xVal = (width/2 + (di/2) * Math.cos(2 * Math.PI * i / 14));
    yVal = (height/2 + (di/2) * Math.sin(2 * Math.PI * i / 14));
		line(width/2, height/2, xVal, yVal);
	}
	fill(255);
	noStroke();
	ellipse(width/2, height/2, di_2);
  fill(0);
  textSize(24);
  text(random + "", 20, 80);
}
function roll() {
  random = Math.floor((Math.random() * 7) + 1);
  newNum = oldNum + random;
}let directions;
let menu;
let username;
let password;
let submit;
function setup() { 
  fields();
}
function fields() {
  directions = createP("Select your bank");
  let banks = ["Bank of America", "Chase", "Citi", "Wells Fargo", "PNC", "Capital One", "TD Bank"]; 
  
  menu = createSelect();
  for (i = 0; i < banks.length; i++) {
    menu.option(banks[i]);
  }
  
  username = createInput("johnDoe");
  password = createInput("***********");
  submit = createButton('submit');
  submit.mousePressed(screen_2);
}let debt = 1200;
let savings = 1200;
let years = 0;
let savingsInterest = 0;
let debtInterest = 0;
let timer = 0;
let i;
let x;
function setup(){
  createCanvas(700, 600);
  setInterval(time,1000);
  setInterval(calculations, 7000);
}
function draw(){
  background(220);
  text("Savings: " + savings.toFixed(2), 80, 80);
  text("Savings Interest: " + savingsInterest.toFixed(2), 80, 120);
  text("Debt: " + debt.toFixed(2), 80, 160);
  text("Debt Interest: " + debtInterest.toFixed(2), 80, 200);
 	text("Timer: " + timer, 80, 40);
  let x = map(savings, 1200, 41997.79, 0, 12);
  ellipse(400, 250, x, x);
}
function time() {
    
}
function calculations(){
  if (timer > 0 && timer < 210) {
    years++;
    savingsInterest = savings -  (100 * 12 * years);
    debt = debt + debtInterest;
  }
}
let debt = 100;
let savings = 100;
function setup() { 
  createCanvas(560, 550);
  slider = createSlider(0,12,0,1)
  slider.position(180, 500);
  slider.style('width', '200px');
} 
function draw() { 
  let val = slider.value();
  background(250);
  calculations(val);
  background(220);
  text("Savings: " + savings.toFixed(2), 80, 80);
  text("Savings Interest: " + savingsInterest.toFixed(2), 80, 120);
  text("Debt: " + debt.toFixed(2), 80, 160);
  text("Debt Interest: " + debtInterest.toFixed(2), 80, 200);
}
function calculations(years){
    savingsInterest = savings -  (100 * 12 * years);
    debt = debt + debtInterest;
}let direction;
let userIncome;
function setup() { 
  screen_1();
}
let screen_1 = true;
let screen_2 = false;
let direction;
let dWidth;
let buttons = [];
let incomes = [46633, 58862, 79271, 83084, 67814, 44015, 51358, 33747];
let userIncome;
let categories = ["Expenses", "Emergency", "Savings"];
class Button {
  constructor(rectX, rectY, rectWidth, rectHeight, age, textX, textY) {
    this.rectWidth = rectWidth;
    this.rectHeight = rectHeight;
    this.rectX = rectX;
    this.rectY = rectY;
    this.age = age;
    this.textX = textX;
    this.textY = textY;
  }
  
  show() {
    fill(255);
    rect(this.rectX, this.rectY, this.rectWidth, this.rectHeight);
    fill(0);
    text(this.age, this.textX, this.textY);
  }
}
class Category {
  constructor(category, initialAmount, catY) {
    this.copy = category + ": " + initialAmount + "%" ;
    this.catWidth = textWidth(this.copy);
    this.amount = initialAmount;
    this.catY = catY;
  }
  
  show() {
    textSize(20);
    fill(0);
    text(this.copy, (width/2) - (this.catWidth/2), (height/5) + this.catY);
    fill(255);
    rect(this.catWidth, this.catY + 65, 20, 20); 
    rect(width - this.catWidth, this.catY + 65, 20, 20); 
  }
}
function setup() { 
  createCanvas(400, 400);
  rectWidth = 100;
  rectHeight = 35;
  rectX = width/2 - (rectWidth + 5);
  rectY = height/3 - (rectHeight/2);
  let age = 25;
  let tWidth = textWidth(age);
  let textX = (rectX + (rectWidth/2)) - (tWidth/2);
  let textY = rectY + ((rectHeight/2) + (textAscent()/2));
  for (i = 0; i < 8; i++) {
    buttons.push(new Button(rectX, rectY, rectWidth, rectHeight, age, textX, textY));
    if (this.rectX >= width/4) {
      rectX = width/2 - (rectWidth + 5);
      rectY += rectHeight + 10;
      textX = (rectX + (rectWidth/2)) - (tWidth/2);
      textY += rectHeight + textAscent();
    } else {
      rectX += rectWidth + 10;
      textX += rectWidth + 10;
    }
    age += 9;
  }
  let catY = 80;
  for (i = 0; i < categories.length; i++) {
    categories.splice(i,1,new Category(categories[i], 0, catY));
    catY += 40;
  }
} 
function draw() { 
  background(220);
  if (screen_1) {
    direction = "How old are you?";
    dWidth = textWidth(direction);
    textSize(20);
    fill(0);
    text(direction, width/2 - (dWidth/2), height/5);
    for(i = 0; i < buttons.length; i++) {
      buttons[i].show();
    }
  }
  if (screen_2) {
    direction = "Split your income into the following: ";
    dWidth = textWidth(direction);
    inWidth = textWidth("Income: $" + userIncome);
    textSize(20);
    fill(0);
    text(direction, width/2 - (dWidth/2), height/5);
    text("Income: $" + userIncome, width/2 - (inWidth/2), (height/5) + 40);
    for(i = 0; i < categories.length; i++) {
      categories[i].show();
    }
  }
}
function mouseClicked() {
  for (i = 0; i < buttons.length; i++) {
    if (screen_1) {
      if (mouseX > buttons[i].rectX && mouseX < (buttons[i].rectX + buttons[i].rectWidth) && mouseY > buttons[i].rectY && mouseY < (buttons[i].rectY + buttons[i].rectHeight)) {
        userIncome = incomes[i];
        screen_1 = false;
        screen_2 = true;
      }
    }
  }
}
let video; 
let button;
let laugh;
let playing = false;
function preload() {
  laugh = loadSound("cackle.mp3");
}
function setup() { 
  createCanvas(320, 240);
  video = createCapture(VIDEO);
  video.size(320, 240);
  button = createButton('Witchify');
  button.mousePressed(witchify);
} 
function draw() {
}
function witchify() {
  image(video, 0, 0, width, height);
  filter(INVERT);
  if (!playing) {
    playing = true;
    laugh.play();
  }
}
var mic;
function setup() {
  createCanvas(200, 200);
  mic = new p5.AudioIn();
  mic.start();
}
function draw() {
  background(0);
  var vol = mic.getLevel(); 
  stroke(255);
  fill(175);
  ellipse(100, 100, 200, 1 + vol * 200);
function setup() {
}
var sensorVal = [],
    letter = "";
function draw() {
  fill(255);
	assignLetter();
  text(letter, 30, 30);
}
  for (var i = 0; i < portList.length; i++) {
  }
}
function serverConnected() {
}
function portOpen() {
}
}
function portClose() {
}
  if (inString.length > 0) {
    if(inString !== 'hello') {
        sensorVal = sensors;
    }
  }
}
function keyPressed() {
}
function assignLetter() {
  alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
           "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X",
           "Y", "Z"];
  for (i = 0; i < sensorVal.length; i++) {
    if (int(sensorVal[i]) > 50) {
      letter = alpha[i];    }
  }
function setup() {
}
var sensorVal = [],
    letter = "";
function draw() {
  fill(255);
	assignLetter();
  text(letter, 30, 30);
  text(sensorVal, 60, 30);
}
  for (var i = 0; i < portList.length; i++) {
  }
}
function serverConnected() {
}
function portOpen() {
}
}
function portClose() {
}
  if (inString.length > 0) {
      sensorVal = sensors;
    }
  }
}
function assignLetter() {
  alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
           "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X",
           "Y", "Z"];
  for (i = 0; i < sensorVal.length; i++) {
    if (sensorVal[i] > 50) {
      letter = alpha[i];
    }
  }
function setup() {
}
var sensorVal_1,sensorVal_2, sensorVal_3, sensorVal_4,
    sensorVal_5, sensorVal_6, sensorVal_7, sensorVal_8,
    sensorVal_9, sensorVal_10, sensorVal_11, sensorVal_12,
    sensorVal_13, sensorVal_14, sensorVal_15, sensorVal_16,
    sensorVal_17, sensorVal_18, sensorVal_19, sensorVal_20,
    sensorVal_21, sensorVal_22, sensorVal_23, sensorVal_24,
    sensorVal_25, sensorVal_26;
function draw() {
  fill(255);
  text(sensorVal_1 + ", " + sensorVal_2 + ", " + sensorVal_3 + ", " + sensorVal_4 + ", " + sensorVal_5 + ", " + sensorVal_6, 30, 30);
}
  for (var i = 0; i < portList.length; i++) {
  }
}
function serverConnected() {
}
function portOpen() {
}
}
function portClose() {
}
  if (inString.length > 0) {
      sensorVal_1 = sensors[0];
      sensorVal_2 = sensors[1];
      sensorVal_3 = sensors[2];
      sensorVal_4 = sensors[3];
      sensorVal_5 = sensors[4];
      sensorVal_6 = sensors[5];
    }
  }
}
function assignLetter() {
 
function setup() {
}
 inData = inByte;
}
 
}
function draw() {
 background(0);
 fill(255);
 text("incoming value: " + inData, 30, 30);
}
function keyPressed() {
let latestData = "waiting for data";
function setup() { 
  createCanvas(600, 600);
  noFill();
  strokeWeight(10);
  
} 
function draw() { 
  background(127, 0, 127);
  
  var v = map(latestData,600, 1023, 0, width);
  var origV = v;
  ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);
  ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
	
  v+=random(-5, 5);
  bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);
  bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
}
function gotData() {
}
var inData;
var xPos = 0;
 
function setup() {
 
  
  createCanvas(400, 300);
  background(0, 0, 0);
}
function serverConnected() {
}
 
function portOpen() {
}
 
}
 
}
 
function portClose() {
}
function graphData(newData) {
  var yPos = map(newData, 0, 255, 0, height);
  stroke(250, 250, 250);
  line(xPos, height, xPos, height - yPos);
  if (xPos >= width) {
    xPos = 0;
    background(0, 0, 0);
  } else {
    xPos++;
  }
}
function draw() {
  graphData(inData);
}
var inData;
 
function setup() {
 
  
  createCanvas(400,400);
}
 for (var i = 0; i < portList.length; i++) {
 }
}
function serverConnected() {
}
 
function portOpen() {
}
 
}
 
}
 
function portClose() {
}
function draw() {
  background(250);
  fill(0);
  text("sensor value: " + inData, 30, 30);
}
let circles = [];
function setup() {
  createCanvas(500, 500);
  rectMode(CENTER); 
}
function draw() {
  background(240,240,144);
  for(i = 0; i < circles.length; i++) {
    circles[i].display();
    circles[i].animate();
  }
}
function mouseClicked() {
	circles.push(new Shape(mouseX,mouseY));
}
class Shape {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    if (x <= (width/3)) {
      this.r = 255;
      this.g = 182;
      this.b = 193;
    } else if (x <= ((width*2)/3)) {
      this.r = 178;
      this.g = 255;
      this.b = 178;
    } else {
      this.r = 176;
      this.g = 224;
      this.b = 230;
    }
  }
  display() {
    fill(this.r, this.g, this.b);
    noStroke();
    
  }
  animate() {
    if (this.y <= height + (55/2)) {
    	this.y++
  	}
  }
}
function shape() {
  if (y >= (height/2)) {
      ellipse(this.x, this.y, 55, 55);
  } else {
      rect(this.x, this.y, 55, 55);
  }
}
let circles = [];
function setup() {
  createCanvas(500, 500);
  rectMode(CENTER); 
}
function draw() {
  background(240,240,144);
  for(i = 0; i < circles.length; i++) {
    circles[i].display();
    circles[i].animate();
  }
}
function mouseClicked() {
	circles.push(new Shape(mouseX,mouseY));
}
class Shape {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    if (x <= (width/3)) {
      this.r = 255;
      this.g = 182;
      this.b = 193;
    } else if (x <= ((width*2)/3)) {
      this.r = 178;
      this.g = 255;
      this.b = 178;
    } else {
      this.r = 176;
      this.g = 224;
      this.b = 230;
    }
  }
  display() {
    fill(this.r, this.g, this.b);
    noStroke();
    if (this.y >= (height/2)) {
      ellipse(this.x, this.y, 55, 55);
    } else {
      rect(this.x, this.y, 55, 55);
    }
  }
  animate() {
    if (this.y <= height + (55/2)) {
    	this.y++
  	}
  }
}
let x, y, r, g, b, circle;
function setup() {
  createCanvas(500, 500);
  rectMode(CENTER); 
}
function draw() {
  background(240,240,144);
  shape(x,y,r,g,b);
  animation();
}
function mouseClicked() {
  x = mouseX;
  y = mouseY;
  
  shapeColor(x);
  
  if (y >= (height/2)) {
    circle = 1;
  } else {
    circle = 0;
  }
}
function shape(x,y,r,g,b) {
  noStroke();
  fill(r,g,b);
  if (circle == 1) {
    ellipse(x, y, 55, 55);
  } else {
    rect(x, y, 55, 55);
  }
}
function shapeColor(x) {
  if (x <= (width/3)) {
    r = 255;
    g = 182;
    b = 193;
  } else if (x <= ((width*2)/3)) {
		r = 178;
    g = 255;
    b = 178;
  } else {
    r = 176;
    g = 224;
    b = 230;
  }
}
function animation() {
  if (y <= height + (55/2)) {
    y++
  }
let x, y;
let offset;
let q1, q2, q3, q4;
let rectColor = 250,
    textColor = 0,
		night = false,
    strokeColor = 0,
    bgrndColor = 250;
function setup() {
  createCanvas(700, 700);
  offset = width/50;
  
  q1 = {
    x1: 0,
    y1: 0,
    x2: width / 2,
    y2: height / 2,
  }
  q2 = {
    x1: width / 2,
    y1: 0,
    x2: width,
    y2: height / 2,
  }
  q3 = {
    x1: 0,
    y1: height / 2,
    x2: width / 2,
    y2: height,
  }
  
  q4 = {
    x1: width / 2,
    y1: height / 2,
    x2: width,
    y2: height,
  }
	
}
function draw() {
  frameRate(60);
  
  fill(rectColor);
  rect((width/2) - 50, (height/2) - 20, 100, 40);
  fill(textColor);
  textAlign(CENTER, CENTER);
  textSize(15);
  text("NIGHT", width/2, height/2);
  strokeWeight(1);
  stroke(strokeColor);
  
  background(bgrndColor, bgrndColor, bgrndColor, 5);
  if (keyIsPressed === true && keyCode === 13) {
      background(250);
  }
}
function mousePressed() {
  
  if (mouseX >= (width/2) - 50 && mouseX <= (width/2) + 50 && mouseY >= (height/2) - 20 && mouseY <= (height/2) + 20) {
 		if (night == false) {
      rectColor = 0;
      textColor = 250;
      strokeColor = 250;
      bgrndColor = 0;
      night = true;
    } else {
      rectColor = 250;
      textColor = 0;
      strokeColor = 0;
      night = false;
      bgrndColor = 250;
    }
  }
  
  if (mouseX >= q1.x1 && mouseX <= q1.x2 && mouseY >= q1.y1 && mouseY <= q1.y2) {
    randomLines();
  }
  if (mouseX >= q2.x1 && mouseX <= q2.x2 && mouseY >= q2.y1 && mouseY <= q2.y2) {
    push();
    translate(q2.x1, q2.y1);
    randomLines();
    pop();
  }
  if (mouseX >= q3.x1 && mouseX <= q3.x2 && mouseY >= q3.y1 && mouseY <= q3.y2) {
    push();
    translate(q3.x1, q3.y1);
    randomLines();
    pop();
  }
  if (mouseX >= q4.x1 && mouseX <= q4.x2 && mouseY >= q4.y1 && mouseY <= q4.y2) {
    push();
    translate(q4.x1, q4.y1);
    randomLines();
    pop();
  }
}
function randomLines() {
create lines based on random number 
[based on values for q1]
  let r = floor(random(1, 5));
  
  
	if (r == 1) {
    for (x = 0; x <= q1.x2; x += 10) {
      line(x, 0, x, q1.y2);
    }
  }
  if (r == 2) {
    for (y = 0; y <= q1.y2; y += 10) {
      line(q1.x1, y, q1.x2, y);
    }
  }
  if (r == 3) {
    for (x = q1.x2; x >= 0+offset && x <= q1.x2; x -= offset) {
      for (y = q1.y1; y >= 0 && y <= q1.y2 - offset; y += offset) {
        line(x, y, x - offset, y + offset);
      }
    }
  }
  if (r == 4) {
    for (x = q1.x1; x >= q1.x1 && x <= q1.x2 - offset; x += offset) {
      for (y = q1.y1; y >= 0 && y <= q1.y2 - offset; y += offset) {
        line(x, y, x + offset, y + offset);
      }
    }
  }
}let x = 0,
    speed = 3; 
function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
  
  x = x + speed;
  
 	if (x >= width) {
    speed = -3;
  } 
  
  ellipse(x, 200, 100, 100);
  
}let x,
    y,
    circle;
function setup() {
  createCanvas(500, 500);
  rectMode(CENTER); 
}
function draw() {
  
  background(240,240,144);
  
  noStroke();
  
  if (x <= (width/3)) {
    fill(255,182,193);
  } else if (x <= ((width*2)/3)) {
    fill(178,255,178);
  } else {
    fill(176,224,230);
  }
  
  if (circle == 1) {
    ellipse(x, y, 55, 55);
  } else {
    rect(x, y, 55, 55);
  }
  
  if (y <= height + (55/2)) {
    y++
  }
}
function mouseClicked() {
  x = mouseX;
  y = mouseY;
  
  if (y >= (height/2)) {
    circle = 1;
  } else {
    circle = 0;
  }
}
function setup() { 
  createCanvas(500, 500);
  leftEyeX = 238;
  rightEyeX = 285;
  eyeDi = 40;
  pupilDi = 5;
  pupilSpeedX = 1;
  leftPupilX = leftEyeX;
  rightPupilX = rightEyeX;
  hairFill = random(0, 250);
} 
function draw() { 
  background(220); 
  
  strokeWeight(1.0);
  fill(hairFill,196,222);
  stroke(0,0,0);
  strokeJoin(MITER);
  beginShape();
  vertex(210, 250);
  vertex(150, 250);
  vertex(180, 220);
  vertex(120, 210);
  vertex(170, 180);
  vertex(110, 150);
  vertex(180, 140);
  vertex(150, 90);
  vertex(215, 110);
  vertex(225, 50);
  vertex(260, 105);
  vertex(310, 65);
  vertex(300, 125);
  vertex(340, 125);
  vertex(310, 155);
  vertex(340, 170);
  vertex(310, 190);
  vertex(330, 210);
  vertex(310, 220);
  endShape();
  
  fill(240,213,190);
  stroke(0,0,0);
  strokeWeight(1);
  
  arc(290, 220, 40, 35, PI + HALF_PI, HALF_PI);
  
  rect(205, 120, 95, 160, 60);
  
  arc(208, 220, 40, 35, HALF_PI, PI + HALF_PI);
  
  curve(260, 180, 275, 210, 303, 199, 280, 105);
  curve(250, 180, 220, 205, 250, 210, 290, 160);
  
  fill(250,250,250);
  ellipse(leftEyeX, 185, eyeDi);
  ellipse(rightEyeX, 185, eyeDi);
  
  noFill();
  curve(280, 80, 260, 205, 270, 200, 225, 0);
  
  curve(250, 250, 250, 245, 270, 240, 350, 250);
  curve(280, 245, 250, 240, 255, 247, 340, 185);
  
  fill(0,0,0);
  
  
  leftPupilX = leftPupilX + pupilSpeedX;
  rightPupilX = rightPupilX + pupilSpeedX;
  
  if (leftPupilX >= (leftEyeX + ((eyeDi/2) - pupilDi))) {
    	pupilSpeedX = -1;
  } else if (leftPupilX <= (leftEyeX - ((eyeDi/2) - pupilDi))) {
    	pupilSpeedX = 1;
  }
  
  ellipse(leftPupilX, 185, pupilDi);
  ellipse(rightPupilX, 185, pupilDi);
  
  stroke(hairFill,196,222);
  noFill();
  strokeWeight(10); 
  curve(mouseX, mouseY, 225, 160, 295, 160, 400, 100);
  
}function setup() { 
  createCanvas(800, 600);
  rectMode(CENTER);
} 
function draw() {
	background(220);
  rect(width/2, height/2, width/2, height/2);
}function setup() { 
  createCanvas(500, 500);
} 
function draw() { 
  background(220); 
  
  strokeWeight(1.0);
  fill(176,196,222);
  stroke(0,0,0);
  strokeJoin(MITER);
  beginShape();
  vertex(210, 250);
  vertex(150, 250);
  vertex(180, 220);
  vertex(120, 210);
  vertex(170, 180);
  vertex(110, 150);
  vertex(180, 140);
  vertex(150, 90);
  vertex(215, 110);
  vertex(225, 50);
  vertex(260, 105);
  vertex(310, 65);
  vertex(300, 125);
  vertex(340, 125);
  vertex(310, 155);
  vertex(340, 170);
  vertex(310, 190);
  vertex(330, 210);
  vertex(310, 220);
  endShape();
  
  fill(240,213,190);
  stroke(0,0,0);
  strokeWeight(1);
  
  arc(290, 220, 40, 35, PI + HALF_PI, HALF_PI);
  
  rect(205, 120, 95, 160, 60);
  
  arc(208, 220, 40, 35, HALF_PI, PI + HALF_PI);
  
  curve(260, 180, 275, 210, 303, 199, 280, 105);
  curve(250, 180, 220, 205, 250, 210, 290, 160);
  
  fill(250,250,250);
  ellipse(238, 185, 40, 40);
  ellipse(285, 185, 40, 40);
  
  noFill();
  curve(280, 80, 260, 205, 270, 200, 225, 0);
  
  curve(250, 250, 250, 245, 270, 240, 350, 250);
  curve(280, 245, 250, 240, 255, 247, 340, 185);
  
  fill(0,0,0);
  ellipse(290, 185, 5, 5);
  ellipse(240, 185, 5, 5);
  
  stroke(176,196,222);
  noFill();
  strokeWeight(10); 
  curve(100, 100, 225, 160, 295, 160, 400, 100);
  
}function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
	fill(0, 250, 250);
	ellipse(200, 200, 100, 100);
}function setup() { 
  createCanvas(500,500);
} 
function draw() { 
  background(220);
}