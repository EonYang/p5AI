// The Starting Line Game
// By Lauren Race and Terrick Gutierrez
// runs on p5.js, tested on the alpha editor, chrome, macbook
// November 2017
// with array for images
// with serial
// with images changing as moderator button is pressed

// red value #e50022

//add "Yes" and/or "No" on the screen after ppl answer


let serial;
let portName = '/dev/cu.usbmodem1411';

let noOfQuestions = 10;
let currentQuestion = 1;
let score = [0, 0];

let timeNow = 0;
let timePressed = 0;
let img = [];
let imageIndex = 0;

let percentage1 = 0;
let percentage2 = 0;

let myFont;



// preload the imgages (img[0] is not working... make sure to debug)
function preload() {
  img[0] = loadImage("TSL/SL0.png");
  img[1] = loadImage("TSL/SL1.png");
  img[2] = loadImage("TSL/SL2.png");
  img[3] = loadImage("TSL/SL3.png");
  img[4] = loadImage("TSL/SL4.png");
  img[5] = loadImage("TSL/SL5.png");
  img[6] = loadImage("TSL/SL6.png");
  img[7] = loadImage("TSL/SL7.png");
  img[8] = loadImage("TSL/SL8.png");
  img[9] = loadImage("TSL/SL9.png");
  img[10] = loadImage("TSL/SL10.png");
  img[11] = loadImage("TSL/SL11.png");
  myFont = loadFont('RobotoMono-Bold.ttf');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.open(portName); // open a serial port
  serial.on('data', serialEvent); // callback for when new data arrives

}


function draw() {
  background(220);


  var auxHeight = height;
  print(auxHeight);
  var headerRatio = 3000 / 1688;
  // var headerRatio = ;
  image(img[imageIndex], 0, 0, auxHeight * headerRatio, auxHeight);
  textFont(myFont);
  textSize(250);
  textAlign(CENTER);
  if (imageIndex > 10) {
    fill('#e50022');
    text(percentage1 + '%', windowWidth * 1 / 4, windowHeight * 2 / 7);
     fill('#1c4587');
    text(percentage2 + '%', windowWidth * 3 / 4, windowHeight * 2 / 7);
  }
  noStroke();
  textAlign(LEFT);
  fill(255);
  
  if (imageIndex <= 10) {
      
    rect(windowWidth/16 - 13, windowHeight * 3/5 +2, percentage1 * 5, 17);
    rect(windowWidth * 9/16 + 14, windowHeight * 3/5 +2, percentage2 * 5, 17);
  }
}

function serialEvent() {
  var data = serial.readLine();
 
  if (data.length > 0) {
    data = data.split(',');
    
    if(data.length==2) {
      timeNow = new Date().getTime();
      if (timeNow - timePressed > 1000) {


        calculateScore(data);
        timePressed = new Date().getTime();
      }
    }
  }
}

function calculateScore(data) {
  if (data[0] == 1)
    score[0]++;


  if (data[1] == 1)
    score[1]++;
  console.log(score);
  currentQuestion++;
  imageIndex++;
  if (imageIndex > 11) {
    imageIndex = 0;
    score[0] = 0;
    score[1] = 0;

  }


  // if we are on imageIndex 11 print percentage at this location for both players
  percentage1 = score[0] * 10;
  percentage2 = score[1] * 10;
}
//for resizing the canvas when window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

}// The Starting Line Game
// By Lauren Race and Terrick Gutierrez
// runs on p5.js, tested on the alpha editor, chrome, macbook
// November 2017
// with array for images
// with serial
// with images changing as moderator button is pressed

// red value #e50022

//add "Yes" and/or "No" on the screen after ppl answer


let serial;
let portName = '/dev/cu.usbmodem1411';

let noOfQuestions = 10;
let currentQuestion = 1;
let score = [0, 0];

let timeNow = 0;
let timePressed = 0;
let img = [];
let imageIndex = 0;

let percentage1 = 0;
let percentage2 = 0;

let myFont;



// preload the imgages (img[0] is not working... make sure to debug)
function preload() {
  img[0] = loadImage("TSL/SL0.png");
  img[1] = loadImage("TSL/SL1.png");
  img[2] = loadImage("TSL/SL2.png");
  img[3] = loadImage("TSL/SL3.png");
  img[4] = loadImage("TSL/SL4.png");
  img[5] = loadImage("TSL/SL5.png");
  img[6] = loadImage("TSL/SL6.png");
  img[7] = loadImage("TSL/SL7.png");
  img[8] = loadImage("TSL/SL8.png");
  img[9] = loadImage("TSL/SL9.png");
  img[10] = loadImage("TSL/SL10.png");
  img[11] = loadImage("TSL/SL11.png");
  myFont = loadFont('RobotoMono-Bold.ttf');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.open(portName); // open a serial port
  serial.on('data', serialEvent); // callback for when new data arrives

}


function draw() {
  background(220);


  var auxHeight = height;
  var headerRatio = 3000 / 1688;
  image(img[imageIndex], 0, 0, auxHeight * headerRatio, auxHeight);
  //image(img[1], 0, 0, windowWidth, windowHeight);
  fill('#e50022');
  textFont(myFont);
  textSize(150);
  textAlign(CENTER);
  if (imageIndex > 10) {
    text(percentage1 + '%', windowWidth * 1 / 4, windowHeight * 2 / 7);
    text(percentage2 + '%', windowWidth * 3 / 4, windowHeight * 2 / 7);
  }
  noStroke();
  textAlign(LEFT);
  fill(255);
  if (imageIndex <= 10) {
    rect(76, 424, percentage1 * 5, 14);
    rect(712, 424, percentage2 * 5, 14);
  }
}

function serialEvent() {
  var data = serial.readLine();
  // console.log(data);
  if (data.length > 0) {
    data = data.split(',');
    if(data.length==2) {
      timeNow = new Date().getTime();
      if (timeNow - timePressed > 1000) {

        console.log(data)

        calculateScore(data);
        timePressed = new Date().getTime();
      }
    }
  }
}

function calculateScore(data) {
  if (data[0] == 1)
    score[0]++;


  if (data[1] == 1)
    score[1]++;
  console.log(score);
  currentQuestion++;
  imageIndex++;
  if (imageIndex > 11) {
    imageIndex = 0;
    score[0] = 0;
    score[1] = 0;

  }


  // if we are on imageIndex 11 print percentage at this location for both players
  percentage1 = score[0] * 10;
  percentage2 = score[1] * 10;
}
//for resizing the canvas when window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

}// The Starting Line Game
// By Lauren Race and Terrick Gutierrez
// runs on p5.js, tested on the alpha editor, chrome, macbook
// November 2017
// with arrary for images
// with serial
// with images changing as moderator button is pressed

// red value #e50022

//add "Yes" and/or "No" on the screen after ppl answer

let data = [0, 0];

let serial;
let portName = '/dev/cu.usbmodem1411';

let noOfQuestions = 10;
let currentQuestion = 1;
let score = [0, 0];

let timeNow = 0;
let timePressed = 0;
let img = [];
let imageIndex = 0;

let percentage1 = 0;
let percentage2 = 0;

let myFont;

//0 when no one on this question has answered
//1 when anyone answers
//2 after both answered
//ittriggers the drawing of the text and the progress bar
let answersRound = 0;


// preload the imgages (img[0] is not working... make sure to debug)
function preload() {
  img[0] = loadImage("TSL/SL0.png");
  img[1] = loadImage("TSL/SL1.png");
  img[2] = loadImage("TSL/SL2.png");
  img[3] = loadImage("TSL/SL3.png");
  img[4] = loadImage("TSL/SL4.png");
  img[5] = loadImage("TSL/SL5.png");
  img[6] = loadImage("TSL/SL6.png");
  img[7] = loadImage("TSL/SL7.png");
  img[8] = loadImage("TSL/SL8.png");
  img[9] = loadImage("TSL/SL9.png");
  img[10] = loadImage("TSL/SL10.png");
  img[11] = loadImage("TSL/SL11.png");
  myFont = loadFont('RobotoMono-Bold.ttf');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.open(portName); // open a serial port
  serial.on('data', serialEvent); // callback for when new data arrives

}


function draw() {
  background(220);

	
  var auxHeight = height;
  var headerRatio = 3000/1688;
  image(img[imageIndex], 0, 0, auxHeight*headerRatio, auxHeight);
  //image(img[1], 0, 0, windowWidth, windowHeight);
  fill('#e50022');
  textFont(myFont);
  textSize(150);
  if (imageIndex > 10)
    text(percentage1 + '%', windowWidth * 1 / 12, windowHeight * 2 / 7);

  if (imageIndex > 10)
    text(percentage2 + '%', windowWidth * 6.98 / 12, windowHeight * 2 / 7);
  noStroke();
  fill(255);
  rect(77, 423, percentage1 * 5, 15);
  rect(720, 423, percentage2 * 5, 15);
  // if (data[0] == "0") {
  //text('Yes', 20, 20);
   // console.log("yes");
  // }
  

}

function serialEvent() {
  data = serial.readLine();
  // console.log(data);
  if (data.length > 0) {
    timeNow = new Date().getTime();
    if (timeNow - timePressed > 1000) {

      console.log(data)
      data = data.split(',');
      calculateScore(data);
      timePressed = new Date().getTime();
    }
  }
}

function calculateScore(data) {
  if (data[0] == "0")
    score[0]++;
  
  // if (data[0] == "0") {
  //text('Yes', 20, 20);
   console.log("no");
  // }

	//REMINDER
  //data is a string: "0,0"
  //data[0] is the first answer
  //data[1] is the comma, so skip it when checking stuff
  //data[2] is the second answer
  	
  if (data[2] == "1")
    score[1]++;
  console.log("yes");
  console.log(score);
  currentQuestion++;
  imageIndex++;
  if (imageIndex > 11) {
    imageIndex = 0;
    score[0] = 0;
    score[1] = 0;

  }


  // if we are on imageIndex 11 print percentage at this location for both players
  percentage1 = score[0] * 10;
  percentage2 = score[1] * 10;


}

//for resizing the canvas when window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
// The Starting Line Game
// By Lauren Race and Terrick Gutierrez
// runs on p5.js, tested on the alpha editor, chrome, macbook
// November 2017
// with arrary for images
// with serial
// with images changing as moderator button is pressed

// red value #e50022

//add "Yes" and/or "No" on the screen after ppl answer

let data = [0, 0];

let serial;
let portName = '/dev/cu.usbmodem1411';

let noOfQuestions = 10;
let currentQuestion = 1;
let score = [0, 0];

let timeNow = 0;
let timePressed = 0;
let img = [];
let imageIndex = 0;

let percentage1 = 0;
let percentage2 = 0;

let myFont;

//0 when no one on this question has answered
//1 when anyone answers
//2 after both answered
//ittriggers the drawing of the text and the progress bar
let answersRound = 0;


// preload the imgages (img[0] is not working... make sure to debug)
function preload() {
  img[0] = loadImage("TSL/SL0.png");
  img[1] = loadImage("TSL/SL1.png");
  img[2] = loadImage("TSL/SL2.png");
  img[3] = loadImage("TSL/SL3.png");
  img[4] = loadImage("TSL/SL4.png");
  img[5] = loadImage("TSL/SL5.png");
  img[6] = loadImage("TSL/SL6.png");
  img[7] = loadImage("TSL/SL7.png");
  img[8] = loadImage("TSL/SL8.png");
  img[9] = loadImage("TSL/SL9.png");
  img[10] = loadImage("TSL/SL10.png");
  img[11] = loadImage("TSL/SL11.png");
  myFont = loadFont('RobotoMono-Bold.ttf');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.open(portName); // open a serial port
  serial.on('data', serialEvent); // callback for when new data arrives

}


function draw() {
  background(220);

	
  var auxHeight = height;
  var headerRatio = 3000/1688;
  image(img[imageIndex], 0, 0, auxHeight*headerRatio, auxHeight);
  //image(img[1], 0, 0, windowWidth, windowHeight);
  fill('#e50022');
  textFont(myFont);
  textSize(150);
  if (imageIndex > 10)
    text(percentage1 + '%', windowWidth * 1 / 12, windowHeight * 2 / 7);

  if (imageIndex > 10)
    text(percentage2 + '%', windowWidth * 6.98 / 12, windowHeight * 2 / 7);
  noStroke();
  fill(255);
  rect(77, 423, percentage1 * 5, 15);
  rect(720, 423, percentage2 * 5, 15);
  // if (data[0] == "0") {
  //text('Yes', 20, 20);
   // console.log("yes");
  // }
  

}

function serialEvent() {
  data = serial.readLine();
  // console.log(data);
  if (data.length > 0) {
    timeNow = new Date().getTime();
    if (timeNow - timePressed > 1000) {

      console.log(data)
      data = data.split(',');
      calculateScore(data);
      timePressed = new Date().getTime();
    }
  }
}

function calculateScore(data) {
  if (data[0] == "0")
    score[0]++;
  
  // if (data[0] == "0") {
  //text('Yes', 20, 20);
   console.log("no");
  // }

	//REMINDER
  //data is a string: "0,0"
  //data[0] is the first answer
  //data[1] is the comma, so skip it when checking stuff
  //data[2] is the second answer
  	
  if (data[2] == "1")
    score[1]++;
  console.log("yes");
  console.log(score);
  currentQuestion++;
  imageIndex++;
  if (imageIndex > 11) {
    imageIndex = 0;
    score[0] = 0;
    score[1] = 0;

  }


  // if we are on imageIndex 11 print percentage at this location for both players
  percentage1 = score[0] * 10;
  percentage2 = score[1] * 10;


}

//for resizing the canvas when window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
let buttonPressed;

function setup() { 
  createCanvas(windowWidth, windowHeight);
} 

function draw() { 
  background(220);
 //if button is pushed (x1) show instructions
//if button is pushed again (x2) start game and show first question
//if button is pushed again (x3)show second question
//if button is pushed again (x4) show third question
//if button is pushed again (x5) show fourth question
//if button is pushed again (x6) show fifth question
//if button is pushed again (x7) show sixth question
//if button is pushed again (x8) seventh question
//if button is pushed again (x9) eighth question
//if button is pushed again (x10) show ninth question
//if button is pushed again (x11) show tenth question
//if button is pushed again (x12) show percentage and resolve
//if button is pushed again (x13) resets

// function playerOneResponse
	// if yes, move playerOne forward
	// if no, do not move playerOne forward
// function playerTwoResponse
	// if yes, move playerTwo forward
// if no, do not move playerTwo forward
// function storeValuePlayerOne
	// if playerOne answers yes, add one to counter
	// if playerOne answers no, add zero to counter
// function storeValuePlayerTwo
	// if playerTwo answers yes, add one to counter
	// if playerTwo answers no, add zero to counter

//function returnValuePlayerOne
	//multiply number of yes’s from counter by 100
	//print value with “%”
	
//function returnValuePlayerTwo
	//multiply number of yes’s from counter by 100
	//print value with “%”

	//print “In the game of life privilege gets you closer to the finish line. Talk about it, be about it, and use it to help others!”


  
  
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}let value = 0;

// ICM-2016

// Take a look at the HTML file where some things have been
// added for mobile viewing

function setup() {
  // Make the canvas the size of the mobile device screen
  createCanvas(windowWidth, windowHeight);
  
  background(200);
}

function touchMoved() {
  strokeWeight(10);
  console.log(mouseX);
  stroke(0, 255, 0);
  // For single touch mouseX and mouseY work just fine
  line(mouseX, mouseY, pmouseX, pmouseY);

  // This prevents dragging screen around
  return false;
}

function deviceShaken() {
  background(0);
}
let video;

let x = 0;

function setup() {
  createCanvas(600, 400);
  pixelDensity(5);
  video = createCapture(VIDEO);
  video.size(340, 340);
  background(255);
}

function draw() {
  video.loadPixels();
  copy(video, 200, 200, 100, 100, mouseX, mouseY, 100, 100);

}

let video;

function setup() {
  createCanvas(600, 400);
  pixelDensity(5);
  video = createCapture(VIDEO);
  video.size(340, 340);
  background(255);
}

function draw() {
  video.loadPixels();
  copy(video, 200, 200, 100, 100, mouseX, mouseY, 100, 100);

}

let video;

function setup() {
  createCanvas(320, 240);
  video = createCapture(VIDEO);
  video.hide();
}

function draw() {
  background(0);
  // Step 5. Display the video image.
  image(video, 0, 0, width, height);
}
// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Example 16-6: Drawing a grid of squares

// Size of each cell in the grid, ratio of window size to video size
// 40 * 16 = 640
// 30 * 16 = 480
var videoScale = 16;

// Number of columns and rows in our system
var cols, rows;

function setup() {
  createCanvas(640, 480);

  // Initialize columns and rows
  cols = width/videoScale;
  rows = height/videoScale;

  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(cols, rows);
  //video.hide();
}

function mousePressed() {
}

function draw() {
  background(0);
  video.loadPixels();

  // Begin loop for columns
  for (var i = 0; i < cols; i++) {
    // Begin loop for rows
    for (var j = 0; j < rows; j++) {
      // Reversing x to mirror the image
      // In order to mirror the image, the column is reversed with the following formula:
      // mirrored column = width - column - 1
      var loc = ((cols - i - 1) + j * cols) * 4;
      
      // The functions red(), green(), and blue() pull out the three color components from a pixel.
      var r = video.pixels[loc   ]; 
      var g = video.pixels[loc + 1];
      var b = video.pixels[loc + 2];

      // A rectangle size is calculated as a function of the pixel's brightness. 
      // A bright pixel is a large rectangle, and a dark pixel is a small one.
      var sz = map((r+g+b)/3, 0, 255, 0, videoScale);
      rectMode(CENTER);
      fill(255);
      noStroke();
      // For every column and row, a rectangle is drawn at an (x,y) location scaled and sized by videoScale.
      var x = i*videoScale;
      var y = j*videoScale;
      rect(x + videoScale/2, y + videoScale/2, sz, sz);
    }
  }
}

var video;
var button;
var snapshots = [];

function setup() {
  createCanvas(400, 300);
  background(51);
  video = createCapture(VIDEO);
  video.size(320, 240);
  button = createButton('snap');
  button.mousePressed(takesnap);
}

function takesnap() {
  snapshots.push(video.get());
  if (snapshots.length > 25) {
    snapshots.splice(0, 1);
  }
}

function draw() {
  if (frameCount % 20 == 0){ 
  takesnap();
  }
  var w = 80;
  var h = 60;
  var x = 0;
  var y = 0;

  for (var i = 0; i < snapshots.length; i++) {
    image(snapshots[i], x, y, w, h);
    x = x + w;
    if (x >= width) {
      x = 0;
      y = y + h;
    }
  }
}var videoScale = 16;

// Number of columns and rows in our system
var cols, rows;

function setup() {
  createCanvas(640, 480);

  // Initialize columns and rows
  cols = width/videoScale;
  rows = height/videoScale;

  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(cols, rows);
  //video.hide();
}

function mousePressed() {
}

function draw() {
  background(0);
  video.loadPixels();

  // Begin loop for columns
  for (var i = 0; i < cols; i++) {
    // Begin loop for rows
    for (var j = 0; j < rows; j++) {
      // Reversing x to mirror the image
      // In order to mirror the image, the column is reversed with the following formula:
      // mirrored column = width - column - 1
      var loc = ((cols - i - 1) + j * cols) * 4;
      
      // The functions red(), green(), and blue() pull out the three color components from a pixel.
      var r = video.pixels[loc   ]; 
      var g = video.pixels[loc + 1];
      var b = video.pixels[loc + 2];

      // A rectangle size is calculated as a function of the pixel's brightness. 
      // A bright pixel is a large rectangle, and a dark pixel is a small one.
      var sz = map((r+g+b)/3, 0, 255, 0, videoScale);
      rectMode(CENTER);
      fill(255);
      noStroke();
      // For every column and row, a rectangle is drawn at an (x,y) location scaled and sized by videoScale.
      var x = i*videoScale;
      var y = j*videoScale;
      rect(x + videoScale/2, y + videoScale/2, sz, sz);
    }
  }
}

let weather;
let x = 36;
let y = 36;
let xdirection = 1;
let ydirection = 1;

let api = 'https://api.openweathermap.org/data/2.5/weather?q=NewYork';
let apiKey = '&APPID=3a6c728f7ad54686e4fda6ce19821184';
let units = '&units=metric';

function preload() {
  leaf = loadImage("images/leaf.png");
}

function setup() {
  createCanvas(600, 400);
  weatherAsk();
}

function weatherAsk() {
  let url = api + apiKey + units;
  loadJSON(url, gotData);
}

function gotData(data) {
  weather = data;
}

function draw() {
  background(207, 242, 255);
  image(leaf, x, y, 70, 70);

  if (weather) {
    let windspeed = weather.wind.speed;
    console.log(windspeed);
//    let ywindspeed = weather.wind.speed;
    x += windspeed * xdirection;
    y += windspeed * ydirection;
//    y += ywindspeed;
    if (x > width - 70 || x < 0) {
    	xdirection *= -1;
  	}
    if (y > height - 70 || y < 0) {
    	ydirection *= -1;
      
  	}
    
  }
}let serial; // variable to hold an instance of the serialport library
let portName = '/dev/cu.usbmodem1421'; // fill in your serial port name here
let inData;

let bg = 0;
let col = 255;
let button = 1;


function setup() {
  createCanvas(600, 400);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing

  serial.list(); // list the serial ports
  serial.open(portName); // open a serial port
  
  
  serial.on('data', gotData);
}

// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    console.log(i + " " + portList[i]);
  }
}

function serverConnected() {
  console.log('connected to server.');
}

function portOpen() {
  console.log('the serial port opened.')
}

function serialEvent() {
  let data = serial.read();
  console.log("the value is " + data);
 
  

}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}






function pianos() {
  
  this.display = function() {
  fill(6, 52, 203);
  noStroke();
  rect(width * 2/5, height/2, 50, 50);
}
  
  this.sound = function() {
    //sound bhjfjfjflj//
  }
  
  this.volume = function() {
    //volume vjhfhjl//
  }
}
  
  function snare() {
    
    this.display = function() {
      fill(255);
      noStroke();
      rect(width * 3/5, height/2, 50, 50);
    }
    
    this.sound = function() {
      //sound//
    }
    
    this.volume = function() {
      //volume//
    }
  }
  
  function bass() {
    
    this.display = function() {
    fill(purple);
    noStroke;
    rect(width * 4/5);
  }
    
    this.sound = function() {
      //sound//
    }
    
    this.volume = function() {
      //volume//
    }
  }

function draw(){

  ellipse(sensorValue, y, 20, 20);
  
  if (button == 0){
    bass();  
}
}

function gotData(){
  var inData = serial.readLine();
  
  if (inData.length > 0){
    print(inData);
    
    var values = inData.split(',');
    
    
     buttonA = int(values[0]);
     buttonB = int(values[0]);
     buttonC = int(values[0]);
   	 bg = int (map(values[1], 0, 1023, 0, 255));
     col = int (map(values[2], 0, 1023, 0, 255));
    
}
  
//use an if statement to call the object.   let serial; // variable to hold an instance of the serialport library
let hedgie1;
let portName = '/dev/cu.usbmodem1421'; // fill in your serial port name here
let inData;

// create hedgehog
hedgie1 = new Hedgie(150, 100);

function setup() {
  createCanvas(600, 400);
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

// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    console.log(i + " " + portList[i]);
  }
}

function serverConnected() {
  console.log('connected to server.');
}

function portOpen() {
  console.log('the serial port opened.')
}

function serialEvent() {
  let data = serial.read();
  console.log("the value is " + data);
  hedgie1.moveTo(data);

}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}




function draw() {
  background(172, 205, 164);
  fill(223, 216, 178);
  rect(0, 270, 600, 200);


  // display hedgehog
  hedgie1.display();


  // // move hedgehog
  // hedgie1.move();

}

// function parseData() {
//   var inData = serial.readLine();
//   if (inData.length >0) (
//     var values = inData.split(',');
//   // var values = splitTokens(inData, ',');

  
  let hedgie1;
let slider;


function setup() {
  createCanvas(600, 400);
  slider = createSlider(0, 600, 86);
  


// create hedgehog
hedgie1 = new Hedgie(100, 100);
}

function draw() {
  background(172, 205, 164);
  fill(223, 216, 178);
  rect(0, 270, 600, 200);
  
  // display hedgehog
  hedgie1.display();
  print(slider.value());
  
  // hedgie1.move(slider.value()); move hedgie
   hedgie1.move(slider.value());
}

function mousePressed() {
	createP("Good job!");
}
  

  
  let hedgie1;

function setup() {
	createCanvas(600, 400);

	// create hedgehog
	hedgie1 = new Hedgie(150, 100, 5);
  
}

function draw() {
	background(172, 205, 164);
  fill(223, 216, 178);
  rect(0, 270, 600, 200);
  

	// display hedgehog
	hedgie1.display();

// 	// move hedgehog
// 	hedgie1.move();

}// 2 hedgehogs
let hedgie1;
let hedgie2;

function setup() {
	createCanvas(600, 400);

	// create hedgehogs
	hedgie1 = new Hedgie(150, 100, 5);
	hedgie2 = new Hedgie(350, 200, 5);
  
}

function draw() {
	background(172, 205, 164);
  fill(223, 216, 178);
  rect(0, 270, 600, 200);
  

	// display hedgehogs
	hedgie1.display();
	hedgie2.display();

	// move hedgehogs
	hedgie1.move();
	hedgie2.move();

}let hedgie1;
let slider;


function setup() {
  createCanvas(600, 400);
  slider = createSlider(10, 100, 86);


// create hedgehog
hedgie1 = new Hedgie(100, 100);
}

function draw() {
  background(172, 205, 164);
  fill(223, 216, 178);
  rect(0, 270, 600, 200);


  // display hedgehog
  hedgie1.display();
}
  // move hedgehog
  hedgie1.move();

  
  let serial; // variable to hold an instance of the serialport library
let hedgie1;
let portName = '/dev/cu.usbmodem1421'; // fill in your serial port name here
let inData;

// create hedgehog
hedgie1 = new Hedgie(150, 100);

function setup() {
  createCanvas(600, 400);
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

// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    console.log(i + " " + portList[i]);
  }
}

function serverConnected() {
  console.log('connected to server.');
}

function portOpen() {
  console.log('the serial port opened.')
}

function serialEvent() {
  let data = serial.read();
  console.log("the value is " + data);
  hedgie1.moveTo(data);

}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}




function draw() {
  background(172, 205, 164);
  fill(223, 216, 178);
  rect(0, 270, 600, 200);


  // display hedgehog
  hedgie1.display();


  // // move hedgehog
  // hedgie1.move();

}

// function parseData() {
//   var inData = serial.readLine();
//   if (inData.length >0) (
//     var values = inData.split(',');
//   // var values = splitTokens(inData, ',');

  
  // Declare a "SerialPort" object
var serial;
var latestData = "waiting for data";  // you'll use this to write incoming data to the canvas

function setup() {
  createCanvas(500, 300);

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Get a list the ports available
  // You should have a callback defined to see the results
  serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/cu.usbmodem1411");

  // Here are the callbacks that you can register

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);
  // OR
  //serial.onList(gotList);

  // When we some data from the serial port
  serial.on('data', gotData);
  // OR
  //serial.onData(gotData);

  // When or if we get an error
  serial.on('error', gotError);
  // OR
  //serial.onError(gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
  // OR
  //serial.onOpen(gotOpen);

  // Callback to get the raw data, as it comes in for handling yourself
  //serial.on('rawdata', gotRawData);
  // OR
  //serial.onRawData(gotRawData);
}

// We are connected and ready to go
function serverConnected() {
  println("Connected to Server");
}

// Got the list of ports
function gotList(thelist) {
  println("List of Serial Ports:");
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    println(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  println("Serial Port is Open");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  println(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readLine();  // read the incoming string
  trim(currentString);                    // remove any trailing whitespace
  if (!currentString) return;             // if the string is empty, do no more
  console.log(currentString);             // println the string
  latestData = currentString;            // save it for the draw method
}

// We got raw from the serial port
function gotRawData(thedata) {
  println("gotRawData" + thedata);
}

function draw() {
  background(255,255,255);
  fill(0,0,0);
  var data = map(latestData, 0, 1023, 0, height);
  ellipse(50, data, 50, 50);
  text(data, 10, 10);
}// Hedgehog
let hedgie;

function setup() {
	createCanvas(600, 400);

	// create hedgehog
	hedgie1 = new Hedgie(150, 100, 10);
}

function draw() {
	background(255);

	// display hedgehog
	hedgie1.display();

	// move hedgehog
	hedgie1.update();

}// 2 hedgehogs
let hedgie1;
let hedgie2;

function setup() {
	createCanvas(600, 400);

	// create hedgehogs
	hedgie1 = new Hedgie(150, 100, 5);
	hedgie2 = new Hedgie(350, 200, 5);
  
}

function draw() {
	background(172, 205, 164);
  fill(223, 216, 178);
  rect(0, 270, 600, 200);
  

	// display hedgehogs
	hedgie1.display();
	hedgie2.display();

	// move hedgehogs
	hedgie1.move();
	hedgie2.move();

}//Two hedgehogs
var hedgie1;
var hedgie2;

function setup() { 
  createCanvas(600, 400);
  //create hedgehog
	hedgie1 = new Hedgie(200, 100);
  hedgie2 = new Hedgie(300, 200);
} 

function draw() { 
  background(220);
  //display hedgehog
	hedgie1.display();
  hedgie2.display();
  
  

  
}function setup() {
  createCanvas(600, 400);
  noStroke();
}
function draw() {
  background(174, 215, 207); 
  //tree
  drawTree(40,385,298,1);
  drawTree(180,380,300,3);
  drawTree(300,250,40,3);
  drawTree(120,350,180,2);
  drawTree(120,350,180,2);
  drawTree(520,365,230,2);
  drawTree(500,390,110,2);
  drawTree(420,250,20,3);
  drawTree(90,380,50,2);
  drawTree(210,385,10,3);
  drawTree(320,275,200,2);
  drawTree(331,375,10,1);
   //shroom
	drawMushroom(); 
}
 
// draws a tree with the center of its roots in x,y
function drawTree(x, y, h, leaves) {
  rectMode(CENTER);
  // change coordinates
  push();
  translate(x,y);
  // draw ground
  fill(3, 167, 134, 60);
  ellipse(0, 0, 80, 15);
  // draw trunk
  fill(0, 102, 51);
  rect(0, -h/2, 15, h, 2);
	// draw leaves
  fill(3, 167, 134);
  push();
  for(var i = 0; i < leaves; i++){
    triangle(0, -h-100, 50, -h, -50, -h);
    translate(0,-25);
  }
  pop();
	// go back to original coordinates
  pop();
}

function drawMushroom() {
  strokeJoin(ROUND);// round the stroke corners
  strokeCap(ROUND);// round the line endings
  fill(3, 167, 134, 60);
  ellipse(400, 362, 35, 9);
  fill(253, 245, 230);
  rect(400, 352, 8, 20, 3); //stem
  fill(237, 1, 1);
  arc(400, 350, 40, 40, PI, TWO_PI); //cap
  fill(253, 245, 230);
	ellipse(391, 344, 5, 5);
  ellipse(400, 344, 5, 5);
  ellipse(405, 337, 5, 5);
  ellipse(395, 337, 5, 5);
  ellipse(410, 345, 5, 5); //spots
}
//function drawBee() {
  let on = false;

function setup() { 
  createCanvas(600, 400);
} 

function draw() { 
  let r = random(255);
	let g = random(255);
  let b = random(255);
  if (on) {
    background(r, g, b);
  } else {
  background(255);
  }
  
	stroke(225);
	if (dist(mouseX, mouseY, 200, 200) < 50/2) {
	fill(r, g, b);
} else {
	fill(225);
}
  
  ellipse(200, 200, 50, 50);
 }
function mousePressed() {
 if (dist(mouseX, mouseY, 200, 200) < 50/2) {
   on = !on;
 }
}let on = false;
let night = false;

function setup() { 
  createCanvas(600, 400);
} 

//random rgb if circle pressed, black if square pressed
function draw() { 
  let r = random(255);
  let g = random(255);
  let b = random(255);
  if (on) {
    background(r, g, b);
  } else if (night) {
    background(0);
  } else {
  background(255);
  }
//rollover to demo what will happen when clicked
  //Nico: para que el programa no se confunda con mouse x
  if(mouseX > 225 && mouseX < 275 && mouseY > 175 && mouseY < 225) {
  fill(0, 5, 8);
} else {
	fill(225);
}  
  rect(225, 175, 50, 50);
  
  //Lauren
	stroke(225);
	if (dist(mouseX, mouseY, 200, 200) < 50/2) {
	fill(r, g, b);
} else {
	fill(225);
}

  //Lauren
  ellipse(200, 200, 50, 50);
}
//Lauren
function mousePressed() {
  if (dist(mouseX, mouseY, 200, 200) < 50/2) {
    on = !on;
  } else if (mouseX > 225 && mouseX < 275 && mouseY > 175 && mouseY < 225) {
    night = !night;
  } else {
    fill(255);
 }
}function setup() { 
  createCanvas(600, 400);
  background(255);
} 

function mousePressed() {
   background(255);
}

function draw() { 
  var x = random(width);
  var y = random(height);
  
	let r = random(200);
	let g = random(10);
  let b = random(255);
  
  fill(255);
  ellipse(mouseX, mouseY, 40, 40);
  noStroke();
  
  fill(r, g, b, 20);
  rect(x, y, 200, 200, 10);
  


}function setup() { 
  createCanvas(450, 340);
} 

function draw() { 
  background('rgb(254,247,227)');
  noStroke();
  fill('rgb(212,118,118)');
  ellipse(80, 5, 80, 80);
  fill('rgb(224,209,167)');
  ellipse(340, 190, 100, 100);
  ellipse(270, 212, 20, 20);
  ellipse(340, 120, 20, 20);
  fill('rgb(195,176,123)');
  rect(420, 150, 100, 105);
  stroke('rgb(212,118,118)');
  strokeWeight(8);
  ellipse(145, 230, 75, 75);
  noStroke();
  fill('rgb(237,224,185)');
  rect(140, 169, 90, 60);
  fill('rgb(254,247,227)');
  ellipse(210, 190, 20, 20);
  stroke('rgb(212,118,118)');
  strokeWeight(8);
  fill('rgb(237,224,185)');
  ellipse(290, 245, 30, 30);
  rect(290, 270, 200, 120);
  rect(195, 279, 70, 60);
  
  
  
  
  
}function setup() { 
	createCanvas(400, 400);
}
  
function draw() {
  background(0, 100, 200);
  fill(200, 250, 0);
  stroke(100, 200, 100);
  quad(5, 31, 100, 20, 200, 63, 230, 250);
  ellipse(50, 50, 10, 10);
  stroke(255, 0, 0);
  rect(100, 100, 250, 300);
  
}