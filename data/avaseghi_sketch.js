var videoInput;
var ctracker;

function setup() {
  // setup camera capture
  videoInput = createCapture(VIDEO);
  videoInput.size(400, 300);
  videoInput.position(0, 0);

  // setup tracker
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(videoInput.elt);

}

function draw() {
  // get array of face marker positions [x, y] format
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
 // preload() runs once
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
    // set the color of the ellipse based on position on screen
    fill(map(positions[i][0], width * 0.33, width * 0.66, 0, 255), map(positions[i][1], height * 0.33, height * 0.66, 0, 255), 255);
    // draw ellipse at each position point
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
  httpGet("https://af3412.itp.io:8000/send", 'json', false, function(response) {
    //console.log(response[0].submission);
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
      // set the color of the ellipse based on position on screen
      fill(map(positions[i][0], width * 0.33, width * 0.66, 0, 255), map(positions[i][1], height * 0.33, height * 0.66, 0, 255), 255);
      // draw ellipse at each position point
      ellipse(positions[i][0], positions[i][1], 8, 8);
    }
    setTimeout(getData, 100);
  });		
}
var ctracker;
var cnv;

function setup() {
  // setup camera capture
  var videoInput = createCapture(VIDEO);
  videoInput.size(400, 300);
  videoInput.position(0, 0);
  //videoInput.hide();

  // setup canvas
 cnv = createCanvas(400, 300);
  cnv.position(0, 0);
  // setup tracker
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(videoInput.elt);
  noStroke();
}

function draw() {
  clear();
  // get array of face marker positions [x, y] format
  var positions = ctracker.getCurrentPosition();

  for (var i = 0; i < positions.length; i++) {
    // set the color of the ellipse based on position on screen
    fill(map(positions[i][0], width * 0.33, width * 0.66, 0, 255), map(positions[i][1], height * 0.33, height * 0.66, 0, 255), 255);
    // draw ellipse at each position point
    ellipse(positions[i][0], positions[i][1], 8, 8);

  }
}

// function mousePressed() {
//   var thedata = cnv.elt.toDataURL();
//   httpPost("/saveframe", 'json', {"image": thedata}, function(r) {
//     console.log(r);
//   });
//  console.log(cnv.elt.toDataURL()); 
// }var x;
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
    // roundCrossed = 2;
  }
	fill(255);
	let cXval = (width/2 + (di_2/1.55) * Math.cos(2 * oldNum * (Math.PI / 14) + (Math.PI / 15))); //x coordinate of centre of small circles
	let cYval = (height/2 + (di_2/1.55) * Math.sin(2 * oldNum * (Math.PI / 14) + (Math.PI / 15)));//y coordinate of centre of small circles
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
	let cXval = (width/2 + (di_2/1.55) * Math.cos(2 * oldNum * (Math.PI / 14) + (Math.PI / 15))); //x coordinate of centre of small circles
	let cYval = (height/2 + (di_2/1.55) * Math.sin(2 * oldNum * (Math.PI / 14) + (Math.PI / 15)));//y coordinate of centre of small circles
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
  text("Years: " + years, 200, 40); //7 secs = 1 years
  let x = map(savings, 1200, 41997.79, 0, 12);
  ellipse(400, 250, x, x);

}

function time() {
  // if (timer > 0) {
  	timer++; // subtract time by one
    
  // }
}

function calculations(){
  if (timer > 0 && timer < 210) {
    years++;
    t = 12 * years; //compounding frequency = 12
    i = (1/100) / 12; //i = r/n
    savings = 100 * (1+i)*((pow(i+1,t)-1)/i); //rate of interest = 1%, 
    savingsInterest = savings -  (100 * 12 * years);

    debtInterest = ((15/365)/100) * 1200 * 365 * years; // rate of interest = 15%
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
  text("Years: " + val, 200, 40); //7 secs = 1 years
}

function calculations(years){
    t = 12 * years; //compounding frequency = 12
    i = (1/100) / 12; //i = r/n
    savings = 100 * (1+i)*((pow(i+1,t)-1)/i); //rate of interest = 1%, 
    savingsInterest = savings -  (100 * 12 * years);

    debtInterest = ((15/365)/100) * 1200 * 365 * years; // rate of interest = 15%
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
// let timer = 30;
// let months = 0; // months passed
// let savings = 300;
// let interest = 0;x
// let debt = 100;
// let minimum = 0; // minimum payment amount
// let showButton = false; // make min payment button not shown

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
  // setInterval(time, 3000); // timer interval
  // if (timer > 0) { 
  //   setInterval(function() { // show make min payment button every 7 secs
  //   showButton = true;
  // }, 7000);
  // }
  // setInterval(function() { // increment num of months by 1 every 7 secs
  //   if (timer > 0) {
  //     months ++;
  //     debt = debt + (debt * ((13/12)/100)); // add interest to debt
  //   	minimum = (debt * ((13/12)/100)) + debt*(2/100); // calculate min payment amount
  //   	interest = interest + (savings * ((5/12)/100)); // add interest to savings
  //   }
  // }, 7000);
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
  // if (screen_3) {
  //   textSize(20);
  //   text("Time: " + timer, 30, 40);
  //   text("Months Passed: " + months, width - 200, 40);
  //   text("Debt: $" + debt.toFixed(2), 30, 120);
  //   text("Minimum Payment: $" + minimum.toFixed(2), 30, 160);
  //   text("Savings: $" + (savings+interest).toFixed(2), 30, 200);
  //   text("Interest: $" + interest.toFixed(2), 30, 240);
  //   if (months > 0 && months%3 == 0) { // display compound button every 3 months
  //     fill(255);
  //     rect(width - 130, height - 50 , 100, 35);
  //     fill(0);
  //     textSize(15);
  //     text("Compound", width - 117, height - 27);
  //   }
  //   if (timer > 0 && showButton && interest > minimum) { // displays make min payment button and sets showButton to false
  //     fill(255);
  //     rect(30, height - 50, 200, 35);
  //     fill(0);
  //     textSize(15);
  //     text("Make minimum Payment", 46, height - 27);
  //     setTimeout(function(){ showButton = false; }, 3500);
  //   }
  // }
}

// function time() {
//   if (timer > 0) {
//   	timer--; // subtract time by one
//   }
// }

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
  // if (mouseX > 30 && mouseX < 230 && mouseY > height - 50 && mouseY < height - 25) { // make min payment button clicked
  //   if (interest > minimum) {
  //   	interest = interest - minimum;
  //   	minimum = 0;
  //   }
  // } else if (mouseX > width - 130 && mouseX < width - 30 && mouseY > height - 50 && mouseY < height - 25) {
  //   if (months > 0 && months%4 == 0) { // compound button pressed
  //     savings = savings + interest;
  //     interest = 0;
  //   }
  // }
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
}var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodemFD121'; // fill in your serial port name here
// var nameInput;
// var nameP;

function setup() {
  createCanvas(640, 480); // make canvas
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing

  serial.list(); // list the serial ports
  serial.open(portName); // open a serial port

  // nameInput = createInput();
  // nameInput.changed(updateText);
}

// function updateText() {
//   nameP.html(nameInput.value());
// }

var sensorVal = [],
    letter = "";

function draw() {
  background(0); // black background
  fill(255);
	assignLetter();
  text(letter, 30, 30);
  // text(nameInput.value(), 130, 140);
}

// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    print(i + " " + portList[i]);
  }
}

function serverConnected() {
  print('connected to server.');
}

function portOpen() {
  print('the serial port opened.')
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}

function serialEvent() {
  // read a string from the serial port
  // until you get carriage return and newline:
  var inString = serial.readLine();

  //check to see that there's actually a string there:
  if (inString.length > 0) {
    if(inString !== 'hello') {
      var sensors = splitTokens(inString, ','); // split the string on the commas
        sensorVal = sensors;
    }
    serial.write('x');
  }
}

function keyPressed() {
 	serial.write(key);              // send it out the serial port
}

function assignLetter() {
  alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L",
           "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X",
           "Y", "Z"];
  for (i = 0; i < sensorVal.length; i++) {
    if (int(sensorVal[i]) > 50) {
      letter = alpha[i];    }
  }
  print(sensorVal);
}var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodemFA131'; // fill in your serial port name here

function setup() {
  createCanvas(640, 480); // make canvas
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing

  serial.list(); // list the serial ports
  serial.open(portName); // open a serial port
}

var sensorVal = [],
    letter = "";

function draw() {
  background(0); // black background
  fill(255);
	assignLetter();
  text(letter, 30, 30);
  text(sensorVal, 60, 30);
}

// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    print(i + " " + portList[i]);
  }
}

function serverConnected() {
  print('connected to server.');
}

function portOpen() {
  print('the serial port opened.')
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}

function serialEvent() {
  // read a string from the serial port
  // until you get carriage return and newline:
  var inString = serial.readStringUntil('\r\n');

  //check to see that there's actually a string there:
  if (inString.length > 0) {
    var sensors = split(inString, ','); // split the string on the commas
    if (sensors.length > 5) { // if there are six elements
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
}var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodemFA131'; // fill in your serial port name here

function setup() {
  createCanvas(640, 480); // make canvas
  smooth(); // antialias drawing lines
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing

  serial.list(); // list the serial ports
  serial.open(portName); // open a serial port
}

var sensorVal_1,sensorVal_2, sensorVal_3, sensorVal_4,
    sensorVal_5, sensorVal_6, sensorVal_7, sensorVal_8,
    sensorVal_9, sensorVal_10, sensorVal_11, sensorVal_12,
    sensorVal_13, sensorVal_14, sensorVal_15, sensorVal_16,
    sensorVal_17, sensorVal_18, sensorVal_19, sensorVal_20,
    sensorVal_21, sensorVal_22, sensorVal_23, sensorVal_24,
    sensorVal_25, sensorVal_26;

function draw() {
  background(0); // black background
  fill(255);
  text(sensorVal_1 + ", " + sensorVal_2 + ", " + sensorVal_3 + ", " + sensorVal_4 + ", " + sensorVal_5 + ", " + sensorVal_6, 30, 30);
}

// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    print(i + " " + portList[i]);
  }
}

function serverConnected() {
  print('connected to server.');
}

function portOpen() {
  print('the serial port opened.')
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}

function serialEvent() {
  // read a string from the serial port
  // until you get carriage return and newline:
  var inString = serial.readStringUntil('\r\n');

  //check to see that there's actually a string there:
  if (inString.length > 0) {
    var sensors = split(inString, ','); // split the string on the commas
    if (sensors.length > 5) { // if there are six elements
      sensorVal_1 = sensors[0];
      sensorVal_2 = sensors[1];
      sensorVal_3 = sensors[2];
      sensorVal_4 = sensors[3];
      sensorVal_5 = sensors[4];
      sensorVal_6 = sensors[5];
      // sensorVal_7 = sensors[6];
      // sensorVal_8 = sensors[7];
      // sensorVal_9 = sensors[8];
      // sensorVal_10 = sensors[9];
      // sensorVal_11 = sensors[10];
      // sensorVal_12 = sensors[11];
      // sensorVal_13 = sensors[12];
      // sensorVal_14 = sensors[13];
      // sensorVal_15 = sensors[14];
      // sensorVal_16 = sensors[15];
      // sensorVal_17 = sensors[16];
      // sensorVal_18 = sensors[17];
      // sensorVal_19 = sensors[18];
      // sensorVal_20 = sensors[19];
      // sensorVal_21 = sensors[20];
      // sensorVal_22 = sensors[21];
      // sensorVal_23 = sensors[22];
      // sensorVal_24 = sensors[23];
      // sensorVal_25 = sensors[24];
      // sensorVal_26 = sensors[25];
    }
  }
}

function assignLetter() {
}var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodemFA131'; // fill in your serial port name here
var inData;                            // for incoming serial data
 
function setup() {
 createCanvas(400, 300);          // make the canvas
 serial = new p5.SerialPort();    // make a new instance of the serialport library
 serial.on('data', serialEvent);  // callback for when new data arrives
 serial.on('error', serialError); // callback for errors
 serial.open(portName);           // open a serial port
}

function serialEvent() {
 // read a byte from the serial port:
 var inByte = serial.read();
 // store it in a global variable:
 inData = inByte;
}
 
function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function draw() {
 // black background, white text:
 background(0);
 fill(255);
 // display the incoming serial data as a string:
 text("incoming value: " + inData, 30, 30);
}

function keyPressed() {
 	serial.write(key);              // send it out the serial port
}// Declare a "SerialPort" object
let serial;
let latestData = "waiting for data";

function setup() { 
  createCanvas(600, 600);
  noFill();
  strokeWeight(10);
  
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodemFA131");
  serial.on('data', gotData);
} 

function draw() { 
  background(127, 0, 127);
  
  var v = map(latestData,600, 1023, 0, width);
  var origV = v;

  // Left Eye
  ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);

  // Right Eye
  ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
	
  // Nose
  v+=random(-5, 5);
  bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);

  // Mouth

  bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
}

function gotData() {
  var currentString = serial.readLine(); // read the incoming string
  trim(currentString); // remove any trailing whitespace
  if (!currentString) return; // if the string is empty, do no more
  console.log(currentString); // println the string
  latestData = currentString; // save it for the draw method
}
var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodemFD121';  // fill in your serial port name here
var inData;
var xPos = 0;
 
function setup() {
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
  serial.list();                      // list the serial ports
  serial.open(portName);
  
  createCanvas(400, 300);
  background(0, 0, 0);
}
function serverConnected() {
  print('connected to server.');
}
 
function portOpen() {
  print('the serial port opened.')
}
 
function serialEvent() {
 inData = Number(serial.read());
}
 
function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  print('The serial port closed.');
}

function graphData(newData) {
  // map the range of the input to the window height:
  var yPos = map(newData, 0, 255, 0, height);
  // draw the line in a pretty color:
  stroke(250, 250, 250);
  line(xPos, height, xPos, height - yPos);
  // at the edge of the screen, go back to the beginning:
  if (xPos >= width) {
    xPos = 0;
    // clear the screen by resetting the background:
    background(0, 0, 0);
  } else {
    // increment the horizontal position for the next reading:
    xPos++;
  }
}

function draw() {
  graphData(inData);
}
var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodemFA131';  // fill in your serial port name here
var inData;
 
function setup() {
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
  
  createCanvas(400,400);
}

// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 print(i + " " + portList[i]);
 }
}

function serverConnected() {
  print('connected to server.');
}
 
function portOpen() {
  print('the serial port opened.')
}
 
function serialEvent() {
  inData = Number(serial.read());
}
 
function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  print('The serial port closed.');
}

function draw() {
  background(250);
  fill(0);
  text("sensor value: " + inData, 30, 30);
}

// function mouseMoved() {
//   serial.write("mouse moved" + "/n");
// }
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
}//variables for line-drawing
let x, y;

//variable for diagonal line-drawing
let offset;

//variables for defining quadrant bounds [see "setup()"]
let q1, q2, q3, q4;

let rectColor = 250,
    textColor = 0,
		night = false,
    strokeColor = 0,
    bgrndColor = 250;

function setup() {
  createCanvas(700, 700);

  //make bg off-white
  // background(250);

  //define offset
  offset = width/50;
  
  //define start and end points for each quadrant [4]
  //q1 values are re-used in "randomLines()"
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
/* loop the background to slowly erase */

  frameRate(60);
  
  //button
  fill(rectColor);
  rect((width/2) - 50, (height/2) - 20, 100, 40);
  fill(textColor);
  textAlign(CENTER, CENTER);
  textSize(15);
  text("NIGHT", width/2, height/2);

  strokeWeight(1);
  stroke(strokeColor);
  
  //opacity controls speed of fade
  background(bgrndColor, bgrndColor, bgrndColor, 5);

  //clear the background when user hits "RETURN"
  if (keyIsPressed === true && keyCode === 13) {
      background(250);
  }
}

function mousePressed() {
/* define what happens when I click in each quadrant */
  
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
  
  //QUADRANT 1
  //first locate mouse: "Is it in this quadrant?"
  if (mouseX >= q1.x1 && mouseX <= q1.x2 && mouseY >= q1.y1 && mouseY <= q1.y2) {
    //if so, draw lines
    randomLines();
  }

  //QUADRANT 2
  //do the same as Q1 but translated to q2
  if (mouseX >= q2.x1 && mouseX <= q2.x2 && mouseY >= q2.y1 && mouseY <= q2.y2) {
    push();
    translate(q2.x1, q2.y1);
    randomLines();
    pop();
  }

  //QUADRANT 3
  if (mouseX >= q3.x1 && mouseX <= q3.x2 && mouseY >= q3.y1 && mouseY <= q3.y2) {
    push();
    translate(q3.x1, q3.y1);
    randomLines();
    pop();
  }

  //QUADRANT 4
  if (mouseX >= q4.x1 && mouseX <= q4.x2 && mouseY >= q4.y1 && mouseY <= q4.y2) {
    push();
    translate(q4.x1, q4.y1);
    randomLines();
    pop();
  }
}

function randomLines() {
/*
create lines based on random number 
[based on values for q1]
*/

  //generate random number
  let r = floor(random(1, 5));
  
	//draw various lines depending on r
  
	if (r == 1) {
    //draw vertical lines
    for (x = 0; x <= q1.x2; x += 10) {
      line(x, 0, x, q1.y2);
    }
  }

  if (r == 2) {
    //draw horizontal lines
    for (y = 0; y <= q1.y2; y += 10) {
      line(q1.x1, y, q1.x2, y);
    }
  }

  if (r == 3) {
    //draw diagonal lines from top-right
    for (x = q1.x2; x >= 0+offset && x <= q1.x2; x -= offset) {
      for (y = q1.y1; y >= 0 && y <= q1.y2 - offset; y += offset) {
        line(x, y, x - offset, y + offset);
      }
    }
  }

  if (r == 4) {
    //draw diagonal lines from top-left
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
	// else if (x < width) {
	// 	speed = 3;
	// }
  
  ellipse(x, 200, 100, 100);
  
  print(x);
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
  
  //if mouse is clicked on the first third of the width of the canvas
  //from the left, make the shape pink, if mouse is clicked on the second 
  //third, make the shape green, else make the shape blue
  if (x <= (width/3)) {
    fill(255,182,193);
  } else if (x <= ((width*2)/3)) {
    fill(178,255,178);
  } else {
    fill(176,224,230);
  }
  
  //if circle is indicated, draw a circle, else draw a rectangle  
  if (circle == 1) {
    ellipse(x, y, 55, 55);
  } else {
    rect(x, y, 55, 55);
  }
  
  //animate the circle down from the point when the mouse was first
  //clicked until the end of the page is reached
  if (y <= height + (55/2)) {
    y++
  }
}

function mouseClicked() {
  x = mouseX;
  y = mouseY;
  
  //if mouse is clicked on the upper half of the canvas,
  //the shape will be a circle
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
  
  //hair
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
  
  //right ear
  arc(290, 220, 40, 35, PI + HALF_PI, HALF_PI);
  
  //head
  rect(205, 120, 95, 160, 60);
  
  //left ear
  arc(208, 220, 40, 35, HALF_PI, PI + HALF_PI);
  
  //left eye-bag
  curve(260, 180, 275, 210, 303, 199, 280, 105);
  //right eye-bag
  curve(250, 180, 220, 205, 250, 210, 290, 160);
  
  fill(250,250,250);
  //left eye
  ellipse(leftEyeX, 185, eyeDi);
  //right eye
  ellipse(rightEyeX, 185, eyeDi);
  
  //nose
  noFill();
  curve(280, 80, 260, 205, 270, 200, 225, 0);
  
  //mouth
  curve(250, 250, 250, 245, 270, 240, 350, 250);
  //crease
  curve(280, 245, 250, 240, 255, 247, 340, 185);
  
  // rightPupilX ++;
  //right pupil
  fill(0,0,0);
  
  //if the x-coordinate of the pupil is GREATER
  //than the radius of the eye minus the diameter
  //of the pupil move the pupil to the right
  //if the x-coordinate of the pupil is LESS
  //than the radius of the eye minus the diameter
  //of the pupil move the pupil to the right
  
  leftPupilX = leftPupilX + pupilSpeedX;
  rightPupilX = rightPupilX + pupilSpeedX;
  
  if (leftPupilX >= (leftEyeX + ((eyeDi/2) - pupilDi))) {
    	pupilSpeedX = -1;
  } else if (leftPupilX <= (leftEyeX - ((eyeDi/2) - pupilDi))) {
    	pupilSpeedX = 1;
  }
  
  // print(leftPupilX);
  ellipse(leftPupilX, 185, pupilDi);
  //left pupil
  ellipse(rightPupilX, 185, pupilDi);
  
  //brow
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
  
  //hair
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
  
  //right ear
  arc(290, 220, 40, 35, PI + HALF_PI, HALF_PI);
  
  //head
  rect(205, 120, 95, 160, 60);
  
  //left ear
  arc(208, 220, 40, 35, HALF_PI, PI + HALF_PI);
  
  //left eye-bag
  curve(260, 180, 275, 210, 303, 199, 280, 105);
  //right eye-bag
  curve(250, 180, 220, 205, 250, 210, 290, 160);
  
  fill(250,250,250);
  //left eye
  ellipse(238, 185, 40, 40);
  //right eye
  ellipse(285, 185, 40, 40);
  
  //nose
  noFill();
  curve(280, 80, 260, 205, 270, 200, 225, 0);
  
  //mouth
  curve(250, 250, 250, 245, 270, 240, 350, 250);
  //crease
  curve(280, 245, 250, 240, 255, 247, 340, 185);
  
  //right pupil
  fill(0,0,0);
  ellipse(290, 185, 5, 5);
  //left pupil
  ellipse(240, 185, 5, 5);
  
  //brow
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