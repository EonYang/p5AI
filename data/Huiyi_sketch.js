var ctx;
function setup() { 
  c = createCanvas(400, 400);
  ctx = c.drawingContext;
} 

function draw() { 
  background(220);
  drawIndicator();
  drawGradient();
}

function drawGradient(i){
  push();
  translate(width / 2, height / 2);

  //gradX=R*cos(a),gradY=R*sin(a)
  //a=270+*15*i
  var gradX=400*cos(radians(90+15*i*(-1)));
  var gradY=400*sin(radians(90+15*i*(-1)));
  // var gradX = mouseX - width / 2;
  // var gradY = mouseY - height / 2;
  var gradient = ctx.createRadialGradient(0, 0, 400, gradX, gradY, 0);
  gradient.addColorStop(0, "black");
  // gradient.addColorStop(0.3,"grey");
  gradient.addColorStop(1, "orange");
  ctx.fillStyle = gradient;
  ellipse(0, 0, 800, 800);
  rotate(radians(180 + i * (-1) * 15));
  scale(2);
  colorMode(HSL);
  stroke(360, 100, frameCount % 360, 1);
  strokeWeight(1);
  line(0, 0, 0, -180);

  pop();
}

function drawIndicator(i) {
  // background(0, 95);
  push();
  translate(width / 2, height / 2);
  rotate(radians(180 + i * (-1) * 15));
  scale(2);
  colorMode(HSL);
  // fill(47,100,70,0.04);
  // noStroke();
  // ellipse(x1,y1,50);
  h = 0;
  s = 0;
  l = 70;
  noFill();
  stroke(h, s, l);
  // triangle(x1,y1,-80,80,60,80);

  //stroke(255);
  //line(x1,y1,x2,y2);

  strokeWeight(1);

  //fill(360,100,100,random(0.5,0.95));
  stroke(360, 100, frameCount % 360, 1);
  strokeWeight(2);
  line(0, 0, 0, -150);

  //x1=20


}var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411';  // fill in your serial port name here

// canvas
var cnv;

//incoming data
var data, previousSendValue, currentSendValue;
var buttonReleasedAction = false;
var buttonPressedAction = false;
var buttonAllowed = true;
var button;

// loading bar
var countingStart, countingStop, showImgStop;
var countingTime = 7000;
var showImg = false;
var showImgStart, showImgStop;
var imgShown;
var showImgTime = 4000;
var loadingBarWidth, loadingPercentage, rectWidth;
var waitText, waitTextLine;

// live feed
var ip, img;
var snapShots = [];

function preload(){
	waitText = loadStrings("wait.txt");
  waitTextLine = int(random(0,16));
}

function setup() {
  cnv = createCanvas(1024, 703);
  cnv.id("mycanvas");
  
  rectMode(CENTER);
  textAlign(CENTER,CENTER);
  
  loadingBarWidth = 4 * width/5;
  
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port

  
	//set camera
  // ip = "localhost";
  // img = new Image();
  // img.setAttribute('crossOrigin', 'anonymous');
  // img.src = "http://"+ip+":3000/mjpg/video.mjpg";
  
  
  img = createCapture(VIDEO);
  // img.size(width,height);
}

function draw() { 
  // background(0);

  // var ctx = mycanvas.getContext("2d");
  // ctx.drawImage(img, 0, 0);
  
	if(showImg && millis() >= showImgStart){
    imgShown = image(snapShots[snapShots.length-1], -(height*width/height - width)/2, 0, height*width/height, height);
    console.log(showImgStop);
    console.log(millis());
    if (millis() >= showImgStop -100) {
      showImg = false;
      console.log(showImg);
			img = createCapture(VIDEO);
    }
  } else if( !showImg ){
		image(img, -(height*width/height - width)/2, 0, height*width/height, height);  
    console.log(0);
  }
  // loading bar
  if (buttonPressedAction){
    
    buttonAllowed = false;  // ban user from taking shots again during loading.
    background(0);
    
    noStroke();  // for text of loading bar 
  	fill(255);
    textSize(32);
    
    if(millis() > countingStart && millis() < countingStop){ // check if loading starts.

      // loading bar width
      rectWidth = loadingBarWidth - (countingStop-millis())/countingTime * loadingBarWidth;
      rect( width/2, height/2 + 20, rectWidth, 5);
      loadingPercentage = int(map(rectWidth,0, loadingBarWidth, 0, 100)) + 1;

      if (loadingPercentage == 12 || loadingPercentage == 57){ // reset line number for wait.txt
        waitTextLine = int(random(0,16));
        
      } else if (loadingPercentage > 12 && loadingPercentage <= 40){ // show wait text
        waitTextShown();
          
      } else if (loadingPercentage > 57 && loadingPercentage <= 82){ // show wait text
        waitTextShown();
        
      } else if (loadingPercentage >= 99){  // reset loading bar
        buttonPressedAction = false;
        loadingPercentage = 0;
        buttonAllowed = true;
        showImg = true;
        showImgStart = millis();
        showImgStop = showImgStart + showImgTime;
        console.log(showImgStop);
          
      } else { // show percentage
        waitPercentageShown();
        
      }
    }
  }
}


function mousePressed(){
  if(buttonAllowed){
    buttonPressedAction = true;
    countingStart = millis();
    countingStop = countingStart + countingTime;
    snapShots.push(img.get());
    save('camerobot');
  }
}

function waitTextShown(){
  text(waitText[waitTextLine], width/2, height/2 - 20);
}

function waitPercentageShown(){
  text(loadingPercentage + "%", width/2, height/2 - 20);
}


// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {}}



//incoming data and set status
function serialEvent() {
 previousSendValue = currentSendValue;
  //previousSendValueButton = currentSendValueButton;
 	data =serial.read();
  currentSendValue = parseInt(data);
  // console.log(buttonPressedAction);
  
  if((currentSendValue - previousSendValue) == 1 && buttonAllowed){
    buttonPressedAction = true;
    countingStart = millis();
    countingStop = countingStart + countingTime;
    snapShots.push(img.get());
    save();
    //downloadCanvas(down, 'mycanvas', 'test.png');
    
    /*
    var canvas = document.getElementById('mycanvas');
		var dataURL = canvas.toDataURL("image/png");
  	//var fullQuality = canvas.toDataURL('image/jpeg', 1.0);
  	console.log(dataURL);
    
    imageSaved = new Image();
    imageSaved.src = dataURL;
    */
    
    
  }

}



function serverConnected() {console.log('connected to server.');}
function portOpen() {console.log('the serial port opened.')}
function serialError(err) {console.log('Something went wrong with the serial port. ' + err);}
function portClose() {console.log('The serial port closed.');}
 
var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411';  // fill in your serial port name here

// canvas
var cnv;

//incoming data
var data, previousSendValue, currentSendValue;
var buttonReleasedAction = false;
var buttonPressedAction = false;
var buttonAllowed = true;
var button;

// loading bar
var countingStart, countingStop, showImgStop;
var countingTime = 2000;
var showImg = false;
var showImgStart, showImgStop;
var imgShown;
var showImgTime = 2000;
var loadingBarWidth, loadingPercentage, rectWidth;
var waitText, waitTextLine;

// live feed
var ip, img;
var snapShots = [];

function preload(){
	waitText = loadStrings("wait.txt");
  waitTextLine = int(random(0,16));
}

function setup() {
  cnv = createCanvas(1024, 703);
  cnv.id("mycanvas");
  
  rectMode(CENTER);
  textAlign(CENTER,CENTER);
  
  loadingBarWidth = 4 * width/5;
  
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port

  
	//set camera
  // ip = "localhost";
  // img = new Image();
  // img.setAttribute('crossOrigin', 'anonymous');
  // img.src = "http://"+ip+":3000/mjpg/video.mjpg";
  
  
  img = createCapture(VIDEO);
  // img.size(width,height);
}

function draw() { 
  // background(0);

  // var ctx = mycanvas.getContext("2d");
  // ctx.drawImage(img, 0, 0);
  
	if(showImg && millis() >= showImgStart){
    imgShown = image(snapShots[snapShots.length-1], -(height*width/height - width)/2, 0, height*width/height, height);
    console.log(showImgStop);
    console.log(millis());
    if (millis() >= showImgStop -100) {
      showImg = false;
      console.log(showImg);
			img = createCapture(VIDEO);
    }
  } else if( !showImg ){
		image(img, -(height*width/height - width)/2, 0, height*width/height, height);  
    console.log(0);
  }
  // loading bar
  if (buttonPressedAction){
    
    buttonAllowed = false;  // ban user from taking shots again during loading.
    background(0);
    
    noStroke();  // for text of loading bar 
  	fill(255);
    textSize(32);
    
    if(millis() > countingStart && millis() < countingStop){ // check if loading starts.

      // loading bar width
      rectWidth = loadingBarWidth - (countingStop-millis())/countingTime * loadingBarWidth;
      rect( width/2, height/2 + 20, rectWidth, 5);
      loadingPercentage = int(map(rectWidth,0, loadingBarWidth, 0, 100)) + 1;

      if (loadingPercentage == 12 || loadingPercentage == 57){ // reset line number for wait.txt
        waitTextLine = int(random(0,16));
        
      } else if (loadingPercentage > 12 && loadingPercentage <= 40){ // show wait text
        waitTextShown();
          
      } else if (loadingPercentage > 57 && loadingPercentage <= 82){ // show wait text
        waitTextShown();
        
      } else if (loadingPercentage >= 99){  // reset loading bar
        buttonPressedAction = false;
        loadingPercentage = 0;
        buttonAllowed = true;
        showImg = true;
        showImgStart = millis();
        showImgStop = showImgStart + showImgTime;
        console.log(showImgStop);
          
      } else { // show percentage
        waitPercentageShown();
        
      }
    }
  }
}


function mousePressed(){
  buttonPressedAction = true;
  countingStart = millis();
  countingStop = countingStart + countingTime;
  snapShots.push(img.get());
  save('camerobot');
}

function waitTextShown(){
  text(waitText[waitTextLine], width/2, height/2 - 20);
}

function waitPercentageShown(){
  text(loadingPercentage + "%", width/2, height/2 - 20);
}


// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {}}



//incoming data and set status
function serialEvent() {
 previousSendValue = currentSendValue;
  //previousSendValueButton = currentSendValueButton;
 	data =serial.read();
  currentSendValue = parseInt(data);
  // console.log(buttonPressedAction);
  
  if((currentSendValue - previousSendValue) == 1 && buttonAllowed){
    buttonPressedAction = true;
    countingStart = millis();
    countingStop = countingStart + countingTime;
    snapShots.push(img.get());
    save();
    //downloadCanvas(down, 'mycanvas', 'test.png');
    
    /*
    var canvas = document.getElementById('mycanvas');
		var dataURL = canvas.toDataURL("image/png");
  	//var fullQuality = canvas.toDataURL('image/jpeg', 1.0);
  	console.log(dataURL);
    
    imageSaved = new Image();
    imageSaved.src = dataURL;
    */
    
    
  }

}



function serverConnected() {console.log('connected to server.');}
function portOpen() {console.log('the serial port opened.')}
function serialError(err) {console.log('Something went wrong with the serial port. ' + err);}
function portClose() {console.log('The serial port closed.');}
 
var canvas;
var ctx;
var i= 24;
var ipt;
var timeTest;
function setup() {
  
  ipt=createInput();
  var canvas = createCanvas(windowWidth, windowHeight);
  ctx = canvas.drawingContext;
  
  noStroke();
}

function draw() {
  
//   background(250,255,255,10);
  
  timeTest=ipt.value();
  push();
  translate(width / 2, height / 2);
  // var gradX = mouseX - width / 2;
  // var gradY = mouseY - height / 2;
	var gradX=400*cos(radians(90+15*timeTest*(-1)))-100;
  var gradY=400*sin(radians(90+15*timeTest*(-1)))-100;
  var gradient = ctx.createRadialGradient(0, 0, 200, gradX, gradY, 0);
  gradient.addColorStop(0, "black");
  gradient.addColorStop(1, "orange");
  ctx.fillStyle = gradient;
  ellipse(0, 0, 400, 400);
  pop();
}var canvas;
var ctx;

function setup() {
  canvas = createCanvas(200, 200);
  ctx = canvas.drawingContext;
  noStroke();
}

function draw() {
  background(0,3);
  push();
  translate(width / 2, height / 2);
  var gradX = mouseX - width / 2;
  var gradY = mouseY - height / 2;
  var gradient = ctx.createRadialGradient(0, 0, 50, gradX, gradY, 0);
  gradient.addColorStop(0, "black");
  gradient.addColorStop(1, "white");
  ctx.fillStyle = gradient;
  ellipse(0, 0, 100, 100);
  pop();
}let x1;
let y1;
let h;
let s;
let l;
let ipt;

function setup() { 
  createCanvas(400, 400);
    x1 = 0;
  y1 = 0;
} 

function draw() { 
  background(0, 95);
  push();
  translate(width / 2, height / 2);
  rotate(radians(frameCount%360)));
  scale(2);
  colorMode(HSL);
  fill(47,100,70,0.04);
  noStroke();
  ellipse(x1,y1,50);
  h = 0;
  s = 0;
  l = 70;
  noFill();
  stroke(h, s, l);
  triangle(x1,y1,-80,80,60,80);

  stroke(255);
  line(x1,y1,x2,y2);

  strokeWeight(1);

  fill(360,100,100,random(0.5,0.95));
  stroke(360, 100, frameCount % 360, 1);
  strokeWeight(2);
  line(0, 0, frameCount%360, -150);
  x1 = x1 + random(-2, 2);
  y1 = y1 + random(-2, 2);
  // x1=20
  pop();

}var kinectron = null;
var x = 0;
var y = 0;

var bx = 0;
var by = 0;
var bxdir = 1;
var bydir = 1;

function setup() { 
  createCanvas(400, 400);
  
  kinectron = new Kinectron("172.16.231.35");
  kinectron.makeConnection();
  
	kinectron.startTrackedJoint(kinectron.HANDRIGHT, gotRightHand);

} 

function gotRightHand(hand) {
 console.log(hand);
  x = hand.depthX * width;
  y = hand.depthY * height;
}

function draw() { 
  background(220);
  ellipse(x, y, 50, 50);
  
  
  rectMode(CENTER);
  push()
  translate(bx,by);
  rotate(radians(25+frameCount));
  rect(0, 0, 50, 50);
  pop();
  
  bx = bx + bxdir;
  by = by + bydir;
  if (bx > width || bx < 0) {
   bxdir = bxdir * -1; 
  }
  
  if (by > height || by < 0) {
   bydir = bydir * -1; 
  }
  
  if (dist(bx, by, x, y) < 50) {
        fill(random(255),random(255),random(255));
		bx = x;
    by = y;
  }
  

  
}

var img; 
function setup() { 
  createCanvas(400, 400);
  loadI();
} 

function loadI() {
  if (img) {
    
  }
  img = createImg("http://24.103.196.243/cgi-bin/viewer/video.jpg?r=1517803291%22"); 
  setTimeout(loadI, 3000);
}

function draw() { 
  
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}// Learning Processing
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

var api = "http://api.giphy.com/v1/gifs/search?";
var apiKey = "&api_key=dc6zaTOxFJmzC";
var query = "&q=scream munch edvard";

var img;
var img2;
var url = api + apiKey + query;

function setup() {

  loadJSON(url, gotData);

}


function mousePressed() {
  loadJSON(url, updateImage);
}




function gotData(giphy) {
  // if (mousePressed){

  img = createImg(giphy.data[0].images.original.url);
  img.size(400, 400);
}

function updateImage(giphy) {
  //for (var i = 0; i < 1; i++) {
  img2 = createImg(giphy.data[1].images.original.url);
  img2.size(400, 400);
  //}
  img.hide()
}

function setup() { 
  createCanvas(400, 400);
  wave = new p5.Oscillator();
  wave.setType('sine');  //type of sine, triangle,sawtooth and square
  wave.start();
  wave.amp(1); //amp between 0 and 1 
  wave.freq(440);
  
  button=createButton('play/pause');
  button.mousePressed(toggle);
 
} 


function draw() { 
  if (playing){
    background(255,0,255);
  }else{
  background(51); 
}
}

function toggle(){
  if(!playing){
    playing=true;
  }else{
    playing=false;
}
}var api = "http://api.giphy.com/v1/gifs/search?";
var apiKey = "&api_key=dc6zaTOxFJmzC";
var query = "&q=scream munch edvard";

var img;
var img2;
var url = api + apiKey + query;

function setup() {
 
  loadJSON(url, gotData);
  
} 


  function mousePressed(){
  loadJSON(url, updateImage);
}




function gotData(giphy) {
  // if (mousePressed){
  for (var i = 0; i < 1; i++) {
    img = createImg(giphy.data[0].images.original.url);
    img.size(400,400);
}
  }

function updateImage(giphy){
    //for (var i = 0; i < 1; i++) {
    img2 = createImg(giphy.data[1].images.original.url);
    img2.size(400,400);
//}
  img.hide()
}var xdir = 0;
var x = 0;
var thedata;

var inputBox;
var inputButton;

function preload() {
  thedata = loadJSON("http://api.openweathermap.org/data/2.5/weather?q=New%20York&appid=d21e79452f4461671f1ccf2a209d48c3");
}

function inputWasInput() {
  print("Loading..");  
  var city = inputBox.value();
  print(city);

	//loadJSON("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=d21e79452f4461671f1ccf2a209d48c3", jsonLoaded, jsonNotLoaded);
  loadJSON("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=d21e79452f4461671f1ccf2a209d48c3", jsonLoaded);

}

function jsonNotLoaded(er) {
	console.log(er);
}

function jsonLoaded(newdata) {
  console.log(newdata);
  console.log("New Wind Speed: " + newdata.wind.speed);
  thedata = newdata;
	xdir = thedata.wind.speed;
}

function setup() { 
  createCanvas(400, 400);
  
  inputButton = createButton('load');
  inputButton.mouseClicked(inputWasInput);
  inputButton.position(150, 10);
  inputBox = createInput('New York');
  inputBox.position(10, 10);  
  
  print(thedata.wind.speed);
  xdir = thedata.wind.speed;
} 

function draw() { 
  background(220);
  ellipse(x, 100, 50, 50);
  x = x + xdir;
  if (x > width) { x = 0; }
}
var weather;
function setup(){
  	
  	createCanvas(400,400);
  	// background(0);
    loadJSON("http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=f4c4d040297e567316c582ee2ea28823",gotData,'jsonp');
}

function gotData(data){
    weather=data;
  	console.log(data);
		// weather=data;
}

function draw(){
  background(0);
  if(weather){
    var temp=weather.main.temp;
    var humidity=weather.main.humidity;
    ellipse(250,200,weather.main.temp,weather.main.temp);
    ellipse(250,200,weather.main.humidity,weather.main.humidity);
  }
  
}// var student;
// var bird;
// function preload(){
// 	data=loadJSON("birds.json");
// }

// function setup() {
// 	  noCanvas();
// 		// bird=data.birds[1].members[2];
// 		// createP(bird);
// 		var birds=data.birds
// 		for (i=0;i<=birds.length;i++){
// 			createElement('h1',birds[i].family)
// 			createP(birds[i].members)
// 		}
// }
// function draw() {
//     background(255);
//     // text(student.name,100,100)
// }
var spaceData;
function setup(){
  	
  	createCanvas(400,400);
  	// background(0);
    loadJSON('http://api.open-notify.org/astros.json',gotData);
}

function gotData(data){
  	console.log(data);
		// weather=data;
}

// function draw(){
//   if(weather){
//     randomSeed(4);
//     fill(255);
//     ellipse(50,100,weather.list[main.temp],weather.list[main.hummidity]);
//   }
// }

var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411';  // fill in your serial port name here
var fromSerial = 0;

let paddleW=60;//Width of the paddle
let paddleH=15;//height of the paddle
let paddleX;//x position of paddle
let paddleY;//y position of paddle
let brickW=50;//width of a brick
let brickH=40;//height of a brick

//Create an empty array for bricks
bricks=[];

function setup() {
 createCanvas(600,600);
 serial = new p5.SerialPort();       // make a new instance of the serialport library
 serial.on('list', printList);  // set a callback function for the serialport list event
 serial.on('connected', serverConnected); // callback for connecting to the server
 serial.on('open', portOpen);        // callback for the port opening
 serial.on('data', serialEvent);     // callback for when new data arrives
 serial.on('error', serialError);    // callback for errors
 serial.on('close', portClose);      // callback for the port closing

 serial.list();                      // list the serial ports
 serial.open(portName);              // open a serial port
 
  //create a ball
  ball=new Ball();  
  for(var _x = 0; _x < width / brickW; _x++) {
  	for(var _y = 0; _y < (height / 2) / brickH; _y++) {
      bricks[_x] = bricks[_x] || [];
      bricks[_x][_y] = new Brick(_x, _y, brickW, brickH);
  	}
	}
}

function draw(){
 //background(255);
   background(0,90);
  //draw the paddle
   drawPaddle();
  
  //create the bouncing ball
   ball.display();
   ball.move();
   ball.bounce()
  
  // drawBrick();
  for(var _x = 0; _x < width / brickW; _x++) {
  	for(var _y = 0; _y < (height / 2) / brickH; _y++) {
      
      if (dist(ball.x, ball.y, bricks[_x][_y].x, bricks[_x][_y].y) < 40) {
        bricks[_x][_y].show = false;
        ball.dobounce();
      }
      bricks[_x][_y].display();
    }
 // ellipse(fromSerial,mouseY, 10, 10);
}
  if (ball.y>height){
  	gameOver();
   }
}

function drawPaddle(){
  paddleX=map(fromSerial,0,400,0,400-paddleW);
  paddleX=fromSerial;
  paddleY=height-paddleH;
  fill(255,150,9);
  noStroke();
  rect(paddleX,paddleY,paddleW,paddleH);
}

function gameOver(){
		background(0);
  	textSize(32);
  	textAlign(CENTER);
  	fill(255,80,80);
  	text("GAME OVER",width/2,height/2);
}

function serverConnected() {
 print('connected to server.');
}

function portOpen() {
 print('the serial port opened.')
}

function serialEvent() {
var stringFromSerial = serial.readLine();
 if (stringFromSerial.length>0){
   var trimmedString = trim(stringFromSerial);
   fromSerial= Number(trimmedString);
   print(fromSerial);
 }
}

function serialError(err) {
 print('Something went wrong with the serial port. ' + err);
}

function portClose() {
 print('The serial port closed.');
}



// get the list of ports:
function printList(portList) {
// portList is an array of serial port names
for (var i = 0; i < portList.length; i++) {
// Display the list the console:
print(i + " " + portList[i]);
}
}
var serial//varial to hold an instant of serialport library
var portName='/dev/cu.usbmodem1411';//serial port namevar 
var fromSerial=0;
function setup() { 
  createCanvas(400, 400);
  serial= new p5.SerialPort();
  serial.on('list',printList);
  serial.on('connected',serverConnected);
  serial.on('open',portOpen);
  serial.on('data',serialEvent);
  serial.on('error',serialError);
  serial.on('close',portClose);
  //serial.list();
  serial.open(portName);
} 



//get the list of ports
function printList(portList){
  //serial list is an array of port names
  for (var i = 0; i<portList.length;i++){
    console.log(i+""+portList[i]);
  }
}

function serverConnected() {
 print('connected to server.');
}

function portOpen() {
 print('the serial port opened.')
}

function serialEvent() {
var stringFromSerial = serial.readLine();
 if (stringFromSerial.length>0){
   var trimmedString = trim(stringFromSerial);
   fromSerial= Number(trimmedString);
   print(fromSerial);
 }

//   circleSize=fromSerial;
}

function serialError(err) {
 print('Something went wrong with the serial port. ' + err);
}

function portClose() {
 print('The serial port closed.');
}
let paddleW=60;
let paddleH=15;
let paddleX;
let paddleY;
let brickW=50;
let brickH=40;

//Create an empty array for bricks
bricks=[];

function setup() { 
  createCanvas(400, 400);
  //create a ball
  ball=new Ball();  
  for(var _x = 0; _x < width / brickW; _x++) {
  	for(var _y = 0; _y < (height / 2) / brickH; _y++) {
      bricks[_x] = bricks[_x] || [];
      bricks[_x][_y] = new Brick(_x, _y, brickW, brickH);
  	}
  }
}



function draw() { 
   background(0,90);
  //draw the paddle
   drawPaddle();
  
  //create the bouncing ball
   ball.display();
   ball.move();
   ball.bounce()
  
  // drawBrick();
  for(var _x = 0; _x < width / brickW; _x++) {
  	for(var _y = 0; _y < (height / 2) / brickH; _y++) {
      
      if (dist(ball.x, ball.y, bricks[_x][_y].x, bricks[_x][_y].y) < 40) {
        bricks[_x][_y].show = false;
        ball.dobounce();
      }
      bricks[_x][_y].display();
      

  	}
  }
     // for (i=0;i<bricks.length;i++){
   // bricks[i].display();
   // }
  
  
	//Game Over if the ball doesn't hit paddle
  if (ball.y>height){
  	gameOver();
   }
}

function drawPaddle(){
  paddleX=mouseX;
  paddleY=height-paddleH;
  fill(255,150,9);
  noStroke();
  rect(paddleX,paddleY,paddleW,paddleH);
}


function drawBrick(){
   for (x=0;x<width;x=x+50){
     for (y=0;y<width/2;y=y+40){
       stroke(255);
       strokeWeight(6);
       
       fill(255,random(100,250),random(0,100));
     	 rect(x,y,brickW,brickH);
     }
	}
}
  
function gameOver(){
		background(0);
  	textSize(32);
  	textAlign(CENTER);
  	fill(255,80,80);
  	text("GAME OVER",width/2,height/2);
	}

// function mousePressed() {
//   draw();
// }var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411';  // fill in your serial port name here
var fromSerial = 0;


let paddleW = 60;
let paddleH = 15;
let paddleX;
let paddleY;
let brickW = 50;
let brickH = 40;
let button;
let resetButton;
let move = false;



//Create an empty array for bricks
bricks = [];

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

  button = createButton('start');
  button.mousePressed(ballMove);
  button.class('start-button');
  resetButton = createButton('restart');
  resetButton.mousePressed(resetGame);
  button.class('start-button');

  createCanvas(400,400);
  //create a ball
  // createP('');
  slider = createSlider(0, 10, 1);
  slider.class('slider');
  let sliderValue = slider.value();
  // ball=new Ball(sliderValue,sliderValue);
  ball = new Ball(1, 1);
  for (var _x = 0; _x < width / brickW; _x++) {
    for (var _y = 0; _y < (height / 2) / brickH; _y++) {
      bricks[_x] = bricks[_x] || [];
      bricks[_x][_y] = new Brick(_x, _y, brickW, brickH);
    }
  }
}

function resetGame() {
  ball = new Ball(1, 1);
  for (var _x = 0; _x < width / brickW; _x++) {
    for (var _y = 0; _y < (height / 2) / brickH; _y++) {
      bricks[_x] = bricks[_x] || [];
      bricks[_x][_y] = new Brick(_x, _y, brickW, brickH);
    }
  }
}

function ballMove() {
  move = true;
}

function draw() {
  ball.updateSpeed(slider.value());
  background(0, 90);
  //draw the paddle
  drawPaddle();
  //create the bouncing ball
  if (move == true) {
    ball.display();
    ball.move();
    ball.bounce()
  }

  // drawBrick();

  for (var _x = 0; _x < width / brickW; _x++) {
    for (var _y = 0; _y < (height / 2) / brickH; _y++) {
      if (dist(ball.x, ball.y, bricks[_x][_y].x, bricks[_x][_y].y) < 40) {
        bricks[_x][_y].show = false;
        ball.dobounce();
      }
      bricks[_x][_y].display();
    }
  }

  //Game Over if the ball doesn't hit paddle
  if (ball.y > height) {
    gameOver();
    move=false;

  }
}

function drawPaddle() {
  paddleX=map(fromSerial,0,400,0,400-paddleW);
  paddleY = height - paddleH;
  fill(255, 150, 9);
  noStroke();
  rect(paddleX, paddleY, paddleW, paddleH);
}


function drawBrick() {
  for (x = 0; x < width; x = x + 50) {
    for (y = 0; y < width / 2; y = y + 40) {
      stroke(255);
      strokeWeight(6);
      fill(255, random(100, 250), random(0, 100));
      rect(x, y, brickW, brickH);
    }
  }
}

function gameOver() {
  background(0);
  textSize(32);
  textAlign(CENTER);
  fill(255, 80, 80);
  text("GAME OVER", width / 2, height / 2);
}

// function mousePressed() {
//   draw();
// }

function serverConnected() {
 print('connected to server.');
}

function portOpen() {
 print('the serial port opened.')
}

function serialEvent() {
var stringFromSerial = serial.readLine();
 if (stringFromSerial.length>0){
   var trimmedString = trim(stringFromSerial);
   fromSerial= Number(trimmedString);
   print(fromSerial);
 }
}

function serialError(err) {
 print('Something went wrong with the serial port. ' + err);
}

function portClose() {
 print('The serial port closed.');
}



// get the list of ports:
function printList(portList) {
// portList is an array of serial port names
for (var i = 0; i < portList.length; i++) {
// Display the list the console:
print(i + " " + portList[i]);
}
}
let paddleW=60;
let paddleH=15;
let paddleX;
let paddleY;
let brickW=50;
let brickH=40;
let slider;
let easy;
let hard;

//Create an empty array for bricks
bricks=[];

function setup() { 
  createCanvas(500, 500);
  //create start button
  createButton('start');
  slider=createSlider(0,500,0);//create slider
  slider.position(180,60);//specify position of slider
  slider.style('width','250px');
  //create text easy and hard
  easy=createP('
  
  //create a ball
  ball=new Ball();  
  for(var _x = 0; _x < width / brickW; _x++) {
  	for(var _y = 0; _y < (height / 2) / brickH; _y++) {
      bricks[_x] = bricks[_x] || [];
      bricks[_x][_y] = new Brick(_x, _y, brickW, brickH);
  	}
  }
}
  //create an array of bricks 
  
	// for (var i=0; i<8;i++){
	// for (var _x=0;_x<width;_x=_x+brickW){
	// for (var _y=0;_y<width/2;_y=_y+brickH){
	// // var _x=_x+brickW*i;
	// // var _y=_y+brickH*i;
	// bricks[i]=new Brick(_x,_y);
	// }
	// }
	// }


function draw() { 
   background(0,90);
  //draw the paddle
   drawPaddle();
  
  //create the bouncing ball
   ball.display();
   ball.move();
   ball.bounce()
  
  // drawBrick();
  for(var _x = 0; _x < width / brickW; _x++) {
  	for(var _y = 0; _y < (height / 2) / brickH; _y++) {
      
      if (dist(ball.x, ball.y, bricks[_x][_y].x, bricks[_x][_y].y) < 40) {
        bricks[_x][_y].show = false;
        ball.dobounce();
      }
      bricks[_x][_y].display();
      

  	}
  }
     // for (i=0;i<bricks.length;i++){
   // bricks[i].display();
   // }
  
  
	//Game Over if the ball doesn't hit paddle
  if (ball.y>height){
  	gameOver();
   }
}

function drawPaddle(){
  paddleX=mouseX;
  paddleY=height-paddleH;
  fill(255,150,9);
  noStroke();
  rect(paddleX,paddleY,paddleW,paddleH);
}


function drawBrick(){
   for (x=0;x<width;x=x+50){
     for (y=0;y<width/2;y=y+40){
       stroke(255);
       strokeWeight(6);
       
       fill(255,random(100,250),random(0,100));
     	 rect(x,y,brickW,brickH);
     }
	}
}
  
function gameOver(){
		background(0);
  	textSize(32);
  	textAlign(CENTER);
  	fill(255,80,80);
  	text("GAME OVER",width/2,height/2);
	}

// function mousePressed() {
//   draw();
// }var canvas;
var coolDiv;

var button;

var x = 0;

function setup() { 
  canvas = createCanvas(500, 500);
  canvas.position(0,0);
  
 	button = createButton('click me');
  button.position(200, 19);
  button.mousePressed(buttonClicked);
  
} 

function buttonClicked() {
  coolDiv = select('#first');
  coolDiv.style("background-color","green");
  coolDiv.position(0,200);
  
  var otherDiv = select("#first");
  otherDiv.hide();
  
  x = x + 10;
}

function draw() { 
  background(0,0,0);
  fill(50);
  rect(x,0,100,100);
}let paddleW=60;
let paddleH=15;
let paddleX;
let paddleY;
let brickW=50;
let brickH=40;
let slider;
let easy;
let hard;

//Create an empty array for bricks
bricks=[];

function setup() { 
  createCanvas(500, 500);
  //create start button
  createButton('start');
  slider=createSlider(0,500,0);//create slider
  slider.position(180,60);//specify position of slider
  slider.style('width','250px');
  //create text easy and hard
  easy=createP('
  
  //create a ball
  ball=new Ball();  
  for(var _x = 0; _x < width / brickW; _x++) {
  	for(var _y = 0; _y < (height / 2) / brickH; _y++) {
      bricks[_x] = bricks[_x] || [];
      bricks[_x][_y] = new Brick(_x, _y, brickW, brickH);
  	}
  }
}
  //create an array of bricks 
  
	// for (var i=0; i<8;i++){
	// for (var _x=0;_x<width;_x=_x+brickW){
	// for (var _y=0;_y<width/2;_y=_y+brickH){
	// // var _x=_x+brickW*i;
	// // var _y=_y+brickH*i;
	// bricks[i]=new Brick(_x,_y);
	// }
	// }
	// }


function draw() { 
   background(0,90);
  //draw the paddle
   drawPaddle();
  
  //create the bouncing ball
   ball.display();
   ball.move();
   ball.bounce()
  
  // drawBrick();
  for(var _x = 0; _x < width / brickW; _x++) {
  	for(var _y = 0; _y < (height / 2) / brickH; _y++) {
      
      if (dist(ball.x, ball.y, bricks[_x][_y].x, bricks[_x][_y].y) < 40) {
        bricks[_x][_y].show = false;
        ball.dobounce();
      }
      bricks[_x][_y].display();
      

  	}
  }
     // for (i=0;i<bricks.length;i++){
   // bricks[i].display();
   // }
  
  
	//Game Over if the ball doesn't hit paddle
  if (ball.y>height){
  	gameOver();
   }
}

function drawPaddle(){
  paddleX=mouseX;
  paddleY=height-paddleH;
  fill(255,150,9);
  noStroke();
  rect(paddleX,paddleY,paddleW,paddleH);
}


function drawBrick(){
   for (x=0;x<width;x=x+50){
     for (y=0;y<width/2;y=y+40){
       stroke(255);
       strokeWeight(6);
       
       fill(255,random(100,250),random(0,100));
     	 rect(x,y,brickW,brickH);
     }
	}
}
  
function gameOver(){
		background(0);
  	textSize(32);
  	textAlign(CENTER);
  	fill(255,80,80);
  	text("GAME OVER",width/2,height/2);
	}

// function mousePressed() {
//   draw();
// }var serial//varial to hold an instant of serialport library
var portName='/dev/cu.usbmodem1421';//serial port namevar 
var circleSize = 10;
function setup() { 
  createCanvas(400, 400);
  serial= new p5.SerialPort();
  serial.on('list',printList);
  serial.on('connected',serverConnected);
  serial.on('open',portOpen);
  serial.on('data',serialEvent);
  serial.on('error',serialError);
  serial.on('close',portClose);
  //serial.list();
  serial.open(portName);
} 

function draw() { 
  background(0); 
  fill(255,200,5);
  noStroke();
  ellipse(width/2,height/2,circleSize,circleSize);
  
}

//get the list of ports
function printList(portList){
  //serial list is an array of port names
  for (var i = 0; i<portList.length;i++){
    console.log(i+""+portList[i]);
  }
}

function serverConnected() {
 print('connected to server.');
}

function portOpen() {
 print('the serial port opened.')
}

function serialEvent() {
var stringFromSerial = serial.readLine();
 if (stringFromSerial.length>0){
   var trimmedString = trim(stringFromSerial);
   fromSerial= Number(trimmedString);

   print(fromSerial);
 }

  circleSize=fromSerial;
}

function serialError(err) {
 print('Something went wrong with the serial port. ' + err);
}

function portClose() {
 print('The serial port closed.');
}






var serial//varial to hold an instant of serialport library
var portName='/dev/cu.usbmodem1421';//serial port namevar 
var circleSize = 10;
function setup() { 
  createCanvas(400, 400);
  serial= new p5.SerialPort();
  serial.on('list',printList);
  serial.on('connected',serverConnected);
  serial.on('open',portOpen);
  serial.on('data',serialEvent);
  serial.on('error',serialError);
  serial.on('close',portClose);
  //serial.list();
  serial.open(portName);
} 

function draw() { 
  background(0); 
  fill(255,200,5);
  noStroke();
  ellipse(width/2,height/2,circleSize,circleSize);
  
}

//get the list of ports
function printList(portList){
  //serial list is an array of port names
  for (var i = 0; i<portList.length;i++){
    console.log(i+""+portList[i]);
  }
}

function serverConnected() {
 print('connected to server.');
}

function portOpen() {
 print('the serial port opened.')
}

function serialEvent() {
var stringFromSerial = serial.readLine();
 if (stringFromSerial.length>0){
   var trimmedString = trim(stringFromSerial);
   fromSerial= Number(trimmedString);

   print(fromSerial);
 }

  circleSize=fromSerial;
}

function serialError(err) {
 print('Something went wrong with the serial port. ' + err);
}

function portClose() {
 print('The serial port closed.');
}






var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411';  // fill in your serial port name here
var fromSerial = 0;


function setup() {
 createCanvas(500,500);
 serial = new p5.SerialPort();       // make a new instance of the serialport library
 serial.on('list', printList);  // set a callback function for the serialport list event
 serial.on('connected', serverConnected); // callback for connecting to the server
 serial.on('open', portOpen);        // callback for the port opening
 serial.on('data', serialEvent);     // callback for when new data arrives
 serial.on('error', serialError);    // callback for errors
 serial.on('close', portClose);      // callback for the port closing

 serial.list();                      // list the serial ports
 serial.open(portName);              // open a serial port
 background(0);
}

function draw(){
 //background(255);
 fill(255, 10);
 noStroke();
 ellipse(fromSerial,mouseY, 10, 10);

}


function serverConnected() {
 print('connected to server.');
}

function portOpen() {
 print('the serial port opened.')
}

function serialEvent() {
var stringFromSerial = serial.readLine();
 if (stringFromSerial.length>0){
   var trimmedString = trim(stringFromSerial);
   fromSerial= Number(trimmedString);
   print(fromSerial);
 }
}

function serialError(err) {
 print('Something went wrong with the serial port. ' + err);
}

function portClose() {
 print('The serial port closed.');
}



// get the list of ports:
function printList(portList) {
// portList is an array of serial port names
for (var i = 0; i < portList.length; i++) {
// Display the list the console:
print(i + " " + portList[i]);
}
}
var cols=8;
var rows=5;
bricks=create2dArray(cols,rows);
function setup() { 
  createCanvas(400, 400);
  for (var i=0;i<cols;i++){
    for (var j=0;j<rows;j++){
      var x=i*50;
      var y=j*40;
      bricks.push(new Brick(x,y));
    }
  }
  // colors = create2dArray(cols,rows)

}

function draw() { 
  background(0);
  for (var i=0;i<cols;i++){
    for (var j=0;j<rows;j++){
      var x=i*50;
      var y=j*40;
			bricks[cols][rows].display();
    
  }


function create2dArray(col,row){
  var arr = new Array(col);
  for (var i=0;i<arr.length;i++){
    arr[i]=new Array(row);
  }
  return arr;
}let paddleW=60;
let paddleH=15;
let paddleX;
let paddleY;
let brickW=50;
let brickH=40;

//Create an empty array for bricks
bricks=[];

function setup() { 
  createCanvas(400, 400);
  //create a ball
  ball=new Ball();  
  for(var _x = 0; _x < width / brickW; _x++) {
  	for(var _y = 0; _y < (height / 2) / brickH; _y++) {
      bricks[_x] = bricks[_x] || [];
      bricks[_x][_y] = new Brick(_x, _y, brickW, brickH);
  	}
  }
}
  //create an array of bricks 
  
	// for (var i=0; i<8;i++){
	// for (var _x=0;_x<width;_x=_x+brickW){
	// for (var _y=0;_y<width/2;_y=_y+brickH){
	// // var _x=_x+brickW*i;
	// // var _y=_y+brickH*i;
	// bricks[i]=new Brick(_x,_y);
	// }
	// }
	// }


function draw() { 
   background(0,90);
  //draw the paddle
   drawPaddle();
  
  //create the bouncing ball
   ball.display();
   ball.move();
   ball.bounce()
  
  // drawBrick();
  for(var _x = 0; _x < width / brickW; _x++) {
  	for(var _y = 0; _y < (height / 2) / brickH; _y++) {
      bricks[_x][_y].display();
  	}
  }
     // for (i=0;i<bricks.length;i++){
   // bricks[i].display();
   // }
  
  
	//Game Over if the ball doesn't hit paddle
  if (ball.y>height){
  	gameOver();
   }
}

function drawPaddle(){
  paddleX=mouseX;
  paddleY=height-paddleH;
  fill(255,150,9);
  noStroke();
  rect(paddleX,paddleY,paddleW,paddleH);
}


function drawBrick(){
   for (x=0;x<width;x=x+50){
     for (y=0;y<width/2;y=y+40){
       stroke(255);
       strokeWeight(6);
       
       fill(255,random(100,250),random(0,100));
     	 rect(x,y,brickW,brickH);
     }
	}
}
  
function gameOver(){
		background(0);
  	textSize(32);
  	textAlign(CENTER);
  	fill(255,80,80);
  	text("GAME OVER",width/2,height/2);
	}

// function mousePressed() {
//   draw();
// }var ball1 = {
	x: 0,
	y: 0,
	d: 0,
	xspeed: 10,
	yspeed: 10
};

var ball2 = {
	x: 0,
	y: 0,
	d: 0,
	xspeed: 10,
	yspeed: 10
};

var ball3 = {
	x: 0,
	y: 0,
	d: 0,
	xspeed: 10,
	yspeed: 10
};

var ball4 = {
	x: 0,
	y: 0,
	d: 0,
	xspeed: 10,
	yspeed: 10
};

var circles = [];

function setup() { 
  createCanvas(400, 400);

	initBall(ball1);
	initBall(ball2);  
	initBall(ball3);
  
  circles[0] = ball1;
  circles[1] = ball2;
  circles[2] = ball3;
  
  initBall(ball4);
  circles[3] = ball4;
  
  
} 
  
function initBall(ball) {
  ball.x = random(0, width);
	ball.y = random(0, height);
	ball.d = random(10, 30); 
}

function displayBall(ball) {
	ellipse(ball.x, ball.y, ball.d);
}

function moveBall(ball) {
  //ball.x = ball.x + ball.xspeed;
	ball.x += ball.xspeed;

	//ball.y = ball.y + ball.yspeed;
	ball.y += ball.yspeed;
}

function checkBounds(ball) {
  if (ball.x > width || ball.x < 0) {
		//ball.xspeed = ball.xspeed * -1;
		ball.xspeed *= -1;
	}
	
	if (ball.y > height || ball.y < 0) {
		//ball.yspeed = ball.yspeed * -1;
		ball.yspeed *= -1;
	}	
}

function draw() { 
  background(220);
  
  for (var i = 0; i < circles.length; i++) {
		displayBall(circles[i]);
  	moveBall(circles[i]);
  	checkBounds(circles[i]);
  }
  
}let paddleW=60;
let paddleH=15;
let paddleX;
let paddleY;
let brickW=50;
let brickH=40;

//Create an empty array for bricks
bricks=[];

function setup() { 
  createCanvas(400, 400);
  //create a ball
  ball=new Ball();
  //create an array of bricks 
  
	for (var i=0; i<30;i++){
      for (var _x=0;_x<width;_x=_x+brickW){
     		for (var _y=0;_y<width/2;_y=_y+brickH){
      		// var _x=_x+brickW*i;
          // var _y=_y+brickH*i;
      		bricks[i]=new Brick(_x,_y);
        }
      }
  }
}
     		
      
    



function draw() { 
   background(0,90);
  //draw the paddle
   drawPaddle();
  
  //create the bouncing ball
   ball.display();
   ball.move();
   ball.bounce()
  
   drawBrick();
   // for (i=0;i<bricks.length;i++){
   // bricks[i].display();
   // }
  
	//Game Over if the ball doesn't hit paddle
  if (ball.y>height){
  	gameOver();
   }
}

function drawPaddle(){
  paddleX=mouseX;
  paddleY=height-paddleH;
  fill(242,255,125);
  noStroke();
  rect(paddleX,paddleY,paddleW,paddleH);
}


function drawBrick(){
   for (x=0;x<width;x=x+50){
     for (y=0;y<width/2;y=y+40){
       stroke(255);
       strokeWeight(6);
       
       fill(80,random(125,200),random(10,255));
     	 rect(x,y,brickW,brickH);
     }
	}
}
  
function gameOver(){
		background(0);
  	textSize(32);
  	textAlign(CENTER);
  	fill(255,80,80);
  	text("GAME OVER",width/2,height/2);
	}

// function mousePressed() {
//   draw();
// }var paddleW=60;
var paddleH=15;
var brick=[];

function setup() { 
  createCanvas(400, 400);
  for (var i = 0; i < 10; i++) {
    brick.push(new Brick());
  }
}
 
} 


function draw() { 
   background(0,70);
   drawPaddle();
	 for (i=0;i<width;i++){
     for (j=0;i<width/2;j++){
       drawBrick();
			}
   }
}

function drawPaddle(){
  fill(255,150,100);
  noStroke();
  rect(mouseX,height-paddleH,paddleW,paddleH);
}

function drawBrick(){
   for (x=0;y<width;x++){
     for (y=0;y<width/2;y++){
     	 rect(x,y,50,40);
  
}

var r;
var r1;
var r2;

var c;

var circles = [];


function setup() { 
  createCanvas(500, 500);
  
  for (var i = 0; i < 10; i++) {
	  circles[i] = new Circle(random(width),random(height),10,random(2),random(2));
  }
  
  
  r = new Rectangle(0,0,60,80,0);
  r1 = new Rectangle(100,0,60,80,0);  
  r2 = new Rectangle(0,100,60,80,0);
  
	angleMode(degrees)
  rectMode(CENTER)
  
  // var g = random(80);
  // var f = random(100);
  
}   

function draw() { 
  background(16,0,0)
	
  //push();
  //translate (r.w,r.y)
  //displayRect();
  //pop();
  
  //moveRect();
  
  if (mouseIsPressed) {
    var nc = new Circle(mouseX,mouseY,10,random(-2,2),random(-2,2));
		circles.push(nc);
  }

  for (var i = 0; i < circles.length; i++) {
	  circles[i].display();
    
    if (circles[i].fill <= 0) {
      circles.splice(i,1);
      print("removed: " + i);
    }
    
    
  }
  //c.display();
  
  r.displayRect();
  r.moveRect();
  
  r1.displayRect();
  r1.moveRect();
  
  r2.displayRect();
  r2.moveRect();
}


	
  
// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Exercise 8-5: Rewrite the gravity example from 
// Chapter 5 using objects with a Ball class. 
// Include two instances of a Ball object.

// Two ball objects
var ball1;
var ball2;

// Global gravity variable
var gravity = 0.1;

function setup() {
	createCanvas(480, 270);

	// Create ball objects
	ball1 = new Ball(150, 0, 16);
	ball2 = new Ball(350, 50, 32);
}

function draw() {
	background(51);

	// Display ball objects
	ball1.display();
	ball2.display();

	// Move ball objects
	ball1.update();
	ball2.update();

}var nums=[100,25,46,72];

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(0);
  stroke(255);
  for (i=0;i<4;i++){
	fill(random(0,255),random(100,255),255);
  ellipse((50+100*i),200,nums[i],nums[i]);
    }
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(100);

}



function show(){
  for(circleX=50;circleX<=width;circleX+=50){
    noStroke();
    fill(0);
    ellipse(circleX,height/2,10,10);
  }
}
  

function disappear(){
  for(circleX=50;circleX<width;circleX+=50){
    noStroke();
    fill(255);
    ellipse(circleX,height/2,10,10);
  }
}

function draw(){
  background(100);
  character(mouseX);
  if(mouseX<circleX){
    show();
  }
  else{
  disappear();
  }
}


function character(posX) {
  push();
  translate(posX,height/2);

  rotate(radians(25));
  fill(255,240,0);
  arc(0,0, 80, 80, 0, PI+3*QUARTER_PI, PIE)
  pop();
  
  fill(0);
  ellipse(posX+10, 19*height/40, 8, 8);
}let canvas = {
  x: 400,
  y:400
};
  
function setup() { 
  createCanvas(canvas.x, canvas.y);
  // noStroke();
  colorMode(HSB);
  background(30);
} 

function draw() { 
  // 
  fill(frameCount%360,50,128,0.03);
  push();
  translate(canvas.x/2, canvas.y/2); 
  rotate(map(mouseX,0,canvas.x,0,PI*5));
  scale(map(mouseY,0,canvas.x,0,5));
  rect(-25, -25, 50,50,5);
  pop();
  
}var x2=225;
var y2=240;
var w=390;
var h=320;
var lx1=640;
var lx2=670;
var l1y=300;
var l2y=350;
var l3y=400;
var l4y=450;
var img1;
var d = 50;
var state = true;
var channel1 =false;
var channel2=false;
var channel3 = false;

function preload() {
  img1 = loadImage("hbo.jpeg");
  img2 = loadImage("Gabe.jpeg");
}

function setup() { 
  createCanvas(800, 700);
} 

function drawtv(){
  //TV Body
  strokeWeight(10);
  fill(212, 230, 241)
	rect(200, 200, 500, 400, 50);
    // bottom
  strokeCap(ROUND);
  fill(212, 230, 241  );
  rect(290, 600, 250, 20, 20, 15, 10, 5);
  
  //top
  strokeWeight(10);
  fill(212, 230, 241  )
  arc(420, 204, 90, 80, 135, 135, OPEN);

  //top lines
  fill(230)
  line(520, 120, 415, 164);
  line(370, 120, 415, 164);
  
 //right lines
  line(lx1, l1y, lx2, l1y);
  line(lx1, l2y, lx2, l2y);
  line(lx1, l3y, lx2, l3y);
  line(lx1, l4y, lx2, l4y);
  
 // button
  fill(213, 216, 220)
  ellipse(655, 530, d, d);
}

function turnoff(){
  stroke(10);
  fill(213, 216, 220);
	rect(x2,y2,w,h,50);
}


function turnon(){
    push();
    translate(x2,y2);
    var delta=random(55,60);
    for (var y1=0+random(-2,2);y1<h;y1=y1+0.5){
    	for (var x1=5+random(-10,10);x1<(w-30);x1=x1+delta+5){
		stroke((x1+2),(255-x1*3),random(150,255),50);
    strokeWeight(2);
    line(x1,y1,x1+delta,y1);
    }
  }
    pop();
}

function itpchannel(){
  stroke(10);
  fill(87,45,136);
	rect(x2,y2,w,h,50);
  push();
  translate(width/2,height/2);
  noStroke();
	fill(255);
  textSize(128);
  text("ITP",-75,50);
  textSize(32);
	fill(0);
  text("NYU | TISCH",-70,100);
  pop();
  
}

function hbochannel(){
image(img1,x2,y2,390,300);
}

function GabeChannel(){
image(img2,x2,y2,380,300);
}


function draw() {
  background(253, 237, 236);
  //image = (img, 0, 0);
  frameRate(15);
  //state of button
  drawtv();
  if (state) {
  turnon();
	} 
  else if (channel1){
	itpchannel();
  }
  else if (channel2){
  hbochannel();
  }
  else if (channel3){
  GabeChannel();
  }
  else{
  turnoff();
	}
}

 // button function
  function mousePressed() {
  if (dist(mouseX, mouseY, 655, 530) < d/2) {
    state = !state;
  }
  else if (mouseX>=lx1&&mouseX<=lx2&&mouseY<=(l1y+5)&&mouseY>=(l1y-5)){
	  //state = !state;
    channel1 = !channel1;
  }
	else if (mouseX>=lx1&&mouseX<=lx2&&mouseY<=(l2y+5)&&mouseY>=(l2y-5)){
    channel2=!channel2;
  }
  else if (mouseX>=lx1&&mouseX<=lx2&&mouseY<=(l3y+5)&&mouseY>=(l3y-5)){
    channel3=!channel3;
	}
}
var x2=225;
var y2=240;
var w=390;
var h=320;
var lx1=640;
var lx2=670;
var l1y=300;
var l2y=350;
var l3y=400;
var l4y=450;
var img1;
var d = 50;
var state = false;
var channel1 =false;
var channel2=false;
var channel3 = false;
var channel4 = false;

function preload() {
  img1 = loadImage("hbo.jpeg");
  img2 = loadImage("Gabe.jpeg");
  img3 = loadImage("pcom.jpg");
}

function setup() { 
  createCanvas(800, 700);
} 

function drawtv(){
  //TV Body
  strokeWeight(10);
  fill(212, 230, 241)
	rect(200, 200, 500, 400, 50);
    // bottom
  strokeCap(ROUND);
  fill(212, 230, 241  );
  rect(290, 600, 250, 20, 20, 15, 10, 5);
  
  //top
  strokeWeight(10);
  fill(212, 230, 241  )
  arc(420, 204, 90, 80, 135, 135, OPEN);

  //top lines
  fill(230)
  line(520, 120, 415, 164);
  line(370, 120, 415, 164);
  
 //right lines
  line(lx1, l1y, lx2, l1y);
  line(lx1, l2y, lx2, l2y);
  line(lx1, l3y, lx2, l3y);
  line(lx1, l4y, lx2, l4y);
  
 // button
  fill(213, 216, 220)
  ellipse(655, 530, d, d);
}

function turnoff(){
  stroke(10);
  fill(213, 216, 220);
	rect(x2,y2,w,h,50);
}


function turnon(){
    push();
    translate(x2,y2);
    var delta=random(55,60);
    for (var y1=0+random(-2,2);y1<h;y1=y1+0.5){
    	for (var x1=5+random(-10,10);x1<(w-30);x1=x1+delta+5){
		stroke((x1+2),(255-x1*3),random(150,255),50);
    strokeWeight(2);
    line(x1,y1,x1+delta,y1);
    }
  }
    pop();
}

function itpchannel(){
  stroke(10);
  fill(87,45,136);
	rect(x2,y2,w,h,50);
  push();
  translate(width/2,height/2);
  noStroke();
	fill(255);
  textSize(128);
  text("ITP",-75,50);
  textSize(32);
	fill(0);
  text("NYU | TISCH",-70,100);
  pop();
  
}

function hbochannel(){
image(img1,x2,y2,390,300);
}

function GabeChannel(){
image(img2,x2,y2,370,320);
}

function pcomChannel(){
image(img3,x2,y2,390,300);
}

function draw() {
  background(253, 237, 236);
  //image = (img, 0, 0);
  frameRate(15);
  //state of button
  drawtv();
  if (state) {
  turnoff();
	} 
  else if (channel1){
	itpchannel();
  }
  else if (channel2){
  hbochannel();
  }
  else if (channel3){
  GabeChannel();
  }
  else if (channel4){
  pcomChannel();
  }
  else{
  turnon();
	}
}

 // button function
  function mousePressed() {
  if (dist(mouseX, mouseY, 655, 530) < d/2) {
    state = !state;
  }
  else if (mouseX>=lx1&&mouseX<=lx2&&mouseY<=(l1y+5)&&mouseY>=(l1y-5)){
	  //state = !state;
    channel1 = !channel1;
  }
	else if (mouseX>=lx1&&mouseX<=lx2&&mouseY<=(l2y+5)&&mouseY>=(l2y-5)){
    channel2=!channel2;
  }
  else if (mouseX>=lx1&&mouseX<=lx2&&mouseY<=(l3y+5)&&mouseY>=(l3y-5)){
    channel3=!channel3;
	}
  else if (mouseX>=lx1&&mouseX<=lx2&&mouseY<=(l4y+5)&&mouseY>=(l4y-5)){
  channel4=!channel4;
	}
}

  

var numCircles = 0;

function setup() { 
  createCanvas(400, 400);
} 

function mousePressed() {
 numCircles++; 
}

function draw() { 
  background(220);
  
  // var i = 0;
  // while (i < 10) {
  //  	rect(i * 50, 0, 45, 45);
  //   i++;
  // }
  
  // Same as above loop
  // for (var i = 0; i < 10; i++) {
  //   rect(i * 50, 0, 45, 45);
  // }

  if (frameCount < 600) {
  
    var numCirclesDrawn = 0;
    for (var x = 0; x < width; x=x+50) {
      for (var y = 0; y < height; y=y+50) {
        if (numCirclesDrawn < numCircles) {
          fill(x,y,frameCount%256);
          ellipse(x, y, 50, 50);
          numCirclesDrawn++;
        }
      }
    }

  } else {
  
	  fill(0);
    rectMode(CENTER);
  	rect(width/2, height/2, 100, 100);
  }
}


function setup() { 
  createCanvas(800, 700);
} 
  
  //var of button
var d = 50;
var state = false;


function draw() {
  background('rgba(0,200,100, 0.60)');
  
  //TV Body
  // Body
  fill(300)
	rect(200, 200, 500, 400, 50);
  
  //screen
  if (state) {
  fill(50)
	rect(225, 240, 390, 320, 50);



  } else {
  fill(200)
	rect(225, 240, 390, 320, 50);
  }
  
  // bottom
  fill(300)
  rect(290, 600, 250, 20, 20, 15, 10, 5);
  
  //top
  fill(300)
  arc(420, 204, 90, 80, 135, 135, OPEN);

  //top lines
  line(520, 120, 415, 164);
  line(370, 120, 415, 164);
  
 //right lines
  line(640, 300, 670, 300);
  line(640, 350, 670, 350);
  line(640, 400, 670, 400);
  line(640, 450, 670, 450);
  
 // stroke
  strokeWeight(12.0);
  strokeCap(ROUND);
  
 // button
  fill(300)
  ellipse(655, 530, d, d);
}

 // button function
  function mousePressed() {
  if (dist(mouseX, mouseY, 655, 530) < d/2) {
    state = !state;
  }
}
  var x2;
var y2;
var w;
var h;
var lx1=640;
var lx2=670;
var l1y=300;
var l2y=350;
var l3y=400;
var l4y=450;

function setup() { 
  createCanvas(800, 700);
} 
  
  //var of button
var d = 50;
var state = false;



function draw() {
  background(125,156,150,50);
  frameRate(15);
  
  //TV Body
  // Body
  strokeWeight(4);
  fill(240)
	rect(200, 200, 500, 400, 50);
  
  //screen
  x2=225;
  y2=240;
  w=390;
  h=320;
  if (state) {
  stroke(2);
  fill(50);
	rect(x2,y2,w,h,50);
	} 
  else {
    push();
    translate(x2,y2);
    var delta=random(55,60);
    for (var y1=0+random(-2,2);y1<h;y1=y1+0.5){
    	for (var x1=5+random(-10,10);x1<(w-30);x1=x1+delta+5){
		stroke((x1+2),(255-x1*3),random(150,255),50);
    strokeWeight(2);
    line(x1,y1,x1+delta,y1);
    }
  }
    pop();
}

    
  // bottom

  strokeCap(ROUND);
  fill(200,80);
  rect(290, 600, 250, 20, 20, 15, 10, 5);
  
  //top
  strokeWeight(4);
  fill(200)
  arc(420, 204, 90, 80, 135, 135, OPEN);

  //top lines
  fill(230)
  line(520, 120, 415, 164);
  line(370, 120, 415, 164);
  
 //right lines

  line(lx1, l1y, lx2, l1y);
  line(lx1, l2y, lx2, l2y);
  line(lx1, l3y, lx2, l3y);
  line(lx1, l4y, lx2, l4y);
  
  
 // button
  fill(100)
  ellipse(655, 530, d, d);
  
  
  //button
  //if (mouseIsPressed&&dist(mouseX,mouseY,(lx1+lx2)/2,(l1y+l1y)/2)<15){

  //}
}


 // button function
  function mousePressed() {
  if (dist(mouseX, mouseY, 655, 530) < d/2) {
    state = !state;
  }
  //else if (mouseX,mouseY,(lx1+lx2)/2,(l1y+l1y)/2){
	//backgroun(255); 
}

  


function setup(){ 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
	frameRate(15);
  var delta=random(55,60);
    for (var y1=0+random(-1,1);y1<height;y1=y1+0.5){
    	for (var x1=0+random(-10,10);x1<width;x1=x1+delta+5){
        if(x1< width/2){
           		stroke(255,(255-x1*3),random(150,255),50);

           }else{
            stroke(random(150,255),255,random(150,255),50);

           }
    strokeWeight(2);
    line(x1,y1,x1+delta,y1);
    }
  }
}

function mousePressed(){
  background(100);
}var bgcolor;
var button;
var slider;
var input;
var nameP

function setup(){ 
  createCanvas(400, 400);
  bgcolor=color(255,255,100);
  nameP=createP("Your name");
  // createElement('h1','tv no signal');
  var button = createButton('Power');
  button.mousePressed(changeColor);
  slider=createSlider(10,100,4);
  input=createInput('type your name')
} 


function changeColor(){
  bgcolor=color(random(255),random(255),random(255),20);
}
// function mousePressed(){
//   createP("I wanna sleep"+random(1,10));
// }

function drawlines(){
  var delta=random(55,60);
    for (var y1=0+random(-10,10);y1<height;y1=y1+0.5){
    	for (var x1=0+random(-10,10);x1<width;x1=x1+delta+5){
 
		stroke((x1+2),(255-x1*3),random(150,255),50);
    strokeWeight(2);
    line(x1,y1,x1+delta,y1);
    }
  }
}

function draw() { 
  background(bgcolor);
  frameRate(15);
  nameP.html(input.value());
	// drawlines()
}var colors = ['#00FFFF','#FFFF00','#FF00FF','#00FF00','FF00FF','#FF0000'];

function setup(){ 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
	frameRate(15);
  var delta=random(45,50);
    for (var y1=0+random(-10,10);y1<height;y1=y1+0.5){
    	for (var x1=0+random(-10,10);x1<width;x1=x1+delta+5){
  	
    //var delta=random(30,40);
  
    //var x2=x1+random(30,40);
    //for (var x1=0; x1<width;x1=x2)
    //var x1=0+random(-10,10);
	//var stretch = map(mouseX,0,width,0,2);
		stroke(random(colors));
    strokeWeight(2);
    line(x1,y1,x1+delta,y1);
    }
  }
}var colors = ['#00FFFF','#FFFF00','#FF00FF','#00FF00','FF00FF','#FF0000'];

function setup(){ 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
	frameRate(15);
  var delta=random(45,50);
    for (var y1=0+random(-10,10);y1<height;y1=y1+0.5){
    	for (var x1=0+random(-10,10);x1<width;x1=x1+delta+5){
  	
    //var delta=random(30,40);
  
    //var x2=x1+random(30,40);
    //for (var x1=0; x1<width;x1=x2)
    //var x1=0+random(-10,10);
	//var stretch = map(mouseX,0,width,0,2);
		stroke(random(colors));
    strokeWeight(2);
    line(x1,y1,x1+delta,y1);
    }
  }
}var color = [];
function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
	frameRate(15);
  var delta=random(45,50);
  for (var y1=0+random(-10,10);y1<height;y1=y1+0.5){
  	for (var x1=0+random(-10,10);x1<width;x1=x1+delta+5){
  	
    //var delta=random(30,40);
  
    //var x2=x1+random(30,40);
    //for (var x1=0; x1<width;x1=x2)
    //var x1=0+random(-10,10);
	／／var stretch = map(mouseX,0,width,0,2);

stroke(x1,0,x1+random(0,255));
    strokeWeight(2);
    line(x1+stretch*y1,y1,x1+delta+stretch*y1,y1);
    }
  }
}
    

  /*if (y1%2!=0){
  stroke(160);
  strokeWeight(1);
  }
  else {
  stroke(0,255,255);
  strokeWeight(2);
  }
	line(x1,y1,x2,y1);
  */
  
  
  /*delta1=random(10,20);
  delta2=random(10,20);
  line(x,y,x+delta1,delta2)
  x=x+delta1;
  y=y+delta2;*/
var numCircles = 0;

function setup() { 
  createCanvas(400, 400);
} 

function mousePressed() {
 numCircles++; 
}

function draw() { 
  background(220);
  
  // var i = 0;
  // while (i < 10) {
  //  	rect(i * 50, 0, 45, 45);
  //   i++;
  // }
  
  // Same as above loop
  // for (var i = 0; i < 10; i++) {
  //   rect(i * 50, 0, 45, 45);
  // }

  if (frameCount < 600) {
  
    var numCirclesDrawn = 0;
    for (var x = 0; x < width; x=x+50) {
      for (var y = 0; y < height; y=y+50) {
        if (numCirclesDrawn < numCircles) {
          fill(x,y,frameCount%256);
          ellipse(x, y, 50, 50);
          numCirclesDrawn++;
        }
      }
    }

  } else {
  
	  fill(0);
    rectMode(CENTER);
  	rect(width/2, height/2, 100, 100);
  }
}var ball = {
  x:0,
  y:0,
  d:0,
  xSpeed:10,
  ySpeed:10,
};
function setup() { 
  createCanvas(400, 400);
  	ball.x=random(0,width);
  ball.y=random(0,height);
  ball.d=random(10,30);
} 

function draw() { 

  background(220);
  ellipse(ball.x,ball.y,ball.d)
	//ball.x=ball.x+ball.xSpeed;
  ball.x+=ball.xSpeed;
  ball.y=ball.y+ball.ySpeed;
  //ball.x++
  if (ball.x>=width || ball.x <0){
    //ball.xSpeed = ball.xSpeed*-1;
    ball.xSpeed *=-1;
  }
   if (ball.y>=width || ball.y <0){
    ball.ySpeed = ball.ySpeed*-1;

  }
  if (ball.y>height ||ball.y<0)
  ball.ySpeed=ball.ySpeed+random(1,-1)
   /*if (ball.x>=width){
    ball.xSpeed = ball.xSpeed*-1;
  }*/
  
}var ball = {
  x:0,
  y:0,
  d:0,
  xSpeed:10,
  ySpeed:10,
};
function setup() { 
  createCanvas(400, 400);
  	ball.x=random(0,width);
  ball.y=random(0,height);
  ball.d=random(10,30);
} 

function draw() { 

  background(220);
  ellipse(ball.x,ball.y,ball.d)
	//ball.x=ball.x+ball.xSpeed;
  ball.x+=ball.xSpeed;
  ball.y=ball.y+ball.ySpeed;
  //ball.x++
  if (ball.x>=width || ball.x <0){
    //ball.xSpeed = ball.xSpeed*-1;
    ball.xSpeed *=-1;
  }
   if (ball.y>=width || ball.y <0){
    ball.ySpeed = ball.ySpeed*-1;

  }
  if (ball.y>height ||ball.y<0)
  ball.ySpeed=ball.ySpeed+random(1,-1)
   /*if (ball.x>=width){
    ball.xSpeed = ball.xSpeed*-1;
  }*/
  
}let x1;
let y1;
let h;
let s;let l;
function setup() { 
  createCanvas(windowWidth, windowHeight);
  x1=0;
  y1=0;
} 

function draw() { 
  frameRate(10);
  background(0,3);
  push();
  translate(width/2,height/2);
  rotate(frameCount%360/30);
  scale(map(mouseY,0,width,0,2));
  colorMode(HSL);
  fill(0,100,70,0.04);
  noStroke();
  ellipse(x1,y1,50);
  h=map(mouseX,0,width,0,90);
  s=map(mouseX,0,width,40,80);
  l=70;
  noFill();
  stroke(h,s,l)
  triangle(x1,y1,-80,80,60,80);

  stroke(255);
  // line(x1,y1,x2,y2);

  strokeWeight(1);

  fill(360,100,100,random(0.5,0.95));
  stroke(360,100,frameCount%360,random(0.5,0.95))
  line(0,-20,0,random(-120,-160));
  x1=x1+random(-2,2);
  y1=y1+random(-2,2);
  x1=20
  pop();
}let x1;
let x2;
let x3;
let y1;
let y2;
let y3;
function setup() { 
  createCanvas(600,600);
  //background(0);
} 

function draw() { 
  //background(0);

  colorMode(HSL);
  push();
  h=random(0,300);
  s=random(10,50);
  l=50;
  noFill();
  stroke(h,s,l,0.1);
  x1=mouseX;
  y1=mouseY;
  x2=300;
  y2=500;
  x3=400;
  y3=450;
  x3=x3+random(-10,10);
  y3=y3+random(-5,5);
  triangle(x1,y1,x2,y2,x3,y3);
  //x3=map(mouseX,0,width,150,250);
  //y3=map(mouseX,0,width,150,250);
  /*translate((x1+x2+x3)/3,(y1+y2+y3)/3);
  rotate(radians(frameCount%360));
  //scale(map(mouseY,0,canvas.x,0,5));
  
	pop();*/
}

var centerX;
var centerY;
var eyesY;
var X;
var Y;
var randomMove;
var ballonX;
var ballonY;
var b1;
var z1;

function setup() { 
  createCanvas(400, 400);
    background(255,mouseY,mouseX);
    centerX=width/2;
    centerY=height/2+30;
    eyesY=centerY-50;
		
/*var balloon ={
  x: 50,
  y: 50,
  w:30,
  h:38,
  triX1:mouseX,
  triY1:mouseY+18,
  triX2:mouseX-6,
  triY2:mouseY+18+10,
  triX3:mouseX+6,
  triY3:mouseY+18+10
};*/

} 

function draw() { 

  bgr=250;
  bgg=map(mouseX,0,400,160,220);
  bgb=map(mouseY,0,400,100,140);
  background(bgr,bgg,bgb,80);
  
	//draw flying circle
  stroke(255,10,0,70);
  fill(255,255,255,random(20,80));
  ellipse(random(10,390),random(50,250),30,30)
  stroke(255,10,0,70);
  fill(255,255,255,random(20,80));
  ellipse(random(10,390),random(50,250),30,30)
  stroke(255,10,0,70);
  fill(255,255,255,random(20,80));
  ellipse(random(10,390),random(50,250),30,30)
  stroke(255,10,0,70);
  fill(255,255,255,random(20,80))
  ellipse(random(10,390),random(50,250),30,30)
  stroke(255,10,0,70);
  fill(255,255,255,random(20,80))
  ellipse(random(10,390),random(50,250),30,30)
  
  //Draw Balloon
  noStroke();
  fill(255,109,85);
  //ballonX=mouseX;
  //ballonY=mouseY;
  //triangle(balloon.triX1,balloon.triY1,balloon.triX2,balloon.triY2,balloon.triX3,balloon.triY3);
  balloonX=mouseX;
  balloonY=mouseY;
  triangle(balloonX,balloonY+18,balloonX-6,balloonY+16+8,balloonX+6,balloonY+24);
  ellipse(balloonX,balloonY,35,40);
  noFill()
  stroke(255,109,85)
  //bezier(50,0,-6,38,69,91,17,126);
  b1=balloonX;
  z1=balloonY+24;
  bezier(b1,z1,b1-56,z1+38,b1+20,z1+91,b1-33,z1+126)
  //bezier(0,0,0,-50,50,100,0,100);

	//face
  strokeWeight(1);
	stroke(0);
	fill(2,160,234);
  ellipse(centerX,centerY,250);
  
	//face bottom
	fill(240);
	ellipse(centerX,centerY+30,220,180);
  
	//eyes white
  randomMove=random(-180,180);
	fill(255);
  ellipse(centerX-30,eyesY,60,65);
  fill(255);	
	ellipse(centerX+30,eyesY,60,65);
	fill(0);
  
	//eyes black
  frameRate(5);
  push();
  translate(centerX-30,eyesY);
  rotate(radians(frameCount*60));
  ellipse(15,5,18);
  fill(255);
  ellipse(18,5,6)
  pop()
  push();
  
  translate(centerX+30,eyesY);
  rotate(radians(frameCount*60));
  fill(0);
  ellipse(15,5,18)
  fill(255);
  ellipse(18,5,6);
  
  pop();
  //ellipse(centerX-20,eyesY+5,15,20);
  //ellipse(centerX+20,eyesY+5,15,20);
  
  //nose
	fill(255,0,0);
	ellipse(centerX,eyesY+36,30);
	line(centerX,centerY,centerX,centerY+70);
  
  //noseDote
  fill(255);
  noStroke();
  ellipse(centerX+5,eyesY+35,10);
  
	//mouth
	noFill();
  stroke(1);
	arc(centerX,centerY,190,150,0,radians(170));
	
  //beard left
	line(centerX-250/2+15,centerY-15,centerX-20,centerY+10);
	line(centerX-250/2+15-10,centerY+10+10,centerX-20,centerY+10+10);
	line(centerX-250/2+15,centerY+60,centerX-20,centerY+30)
  
	//beard right (rotate)
  line(centerX+250/2-15,centerY-15,centerX+20,centerY+10);
	line(centerX+250/2-15+10,centerY+10+10,centerX+20,centerY+10+10);
	line(centerX+250/2-15,centerY+60,centerX+20,centerY+30);
	//bow tie
	fill(231,0,50);

  noStroke();
  rectMode(CENTER);
	rect(centerX,centerY+125,250,12,10);
  stroke(0.5);
	fill(255,221,2);
	ellipse(centerX,centerY+125,30)
	rect(centerX,centerY+125,35,8,10);

/*
	Everything here is a comment
	and not code 
	*/
}

  
function mousePressed(){
  background(255,200,random(120,240));
}function setup() {
  createCanvas(500, 600);
  background(0);

}

function draw() {
  background(0);
  drawCircle(frameCount*2, 100);
}



function drawCircle(angle, distance) {


  push();
  translate(width / 2, height / 2);
  rotate(radians(angle));
  ellipse(distance, 0, 50, 50);
  pop();

}

function mousePressed(){
  
  
}var square;
var other;

function setup() { 
  createCanvas(400, 400);
    square={
    x:10,
    y:100,
    w:50,
    h:50
} 

function draw() { 
  background(220);
  //JSON - 
  square.x++;
  other.x--;
  
  rect(square.x,square.y,square.w,square.h);
    
  }
}something=10 //number
something2=10.5//float
sometingelse="shawn" //string
something=something-1;//9
something--;//8
something=something*2;//16


function setup() { 
  createCanvas(400, 400);
  
  frameRate();
  
  x=random(0,width);
  y=random(0,height);
} 

function draw() { 
  background(220);
  rect(x,y,20,40);
  x=map(mouseX,0,50,0,width);
  y=mouseY;
  
  //x++;
  //y++;
  //x=x+random(2,-2);
  //y=y+random(2,-2)
  
}

function setup() { 
  
  createCanvas(400, 400);
  var x = width/2;
  var y = height/2;
  var w =50;
  var h = 50;
  noFill();
  ellipse(x,y,w,h);
  y=y-h/2;
  ellipse(x,y,w,h);
  y=y+h/2;
  /ellipse(x,y,w,h);
} 

function draw() { 

}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  push();
  translate(100,100);
  rotate(radians(-45));
  line(-100,0,100,0);
  rect(20,20,50,50);
  //you have to draw the line after rotation 
  pop();
}var centerX;
var centerY;
var eyesY;
var X;
var Y;
var randomMove;
function setup() { 
  createCanvas(400, 400);
    background(255,255,230);
    centerX=width/2;
    centerY=height/2+30;
    eyesY=centerY-50;
} 

function draw() { 
  frameRate(100)
  background(255,190,random(120,220));
  //Text
  textSize(64);
  fill(255);
  rectMode(CENTER);
  frameRate(1);
  text("Doraemon",random(70,80),80);
  
	//face

	stroke(0);
	fill(2,160,234);

  
  ellipse(centerX,centerY,250);
  
	//face bottom
	fill(240);
	ellipse(centerX,centerY+30,220,180);
  
	//eyes white
  randomMove=random(-180,180);
	fill(255);
  ellipse(centerX-30,eyesY,60,65);
  fill(255);	
	ellipse(centerX+30,eyesY,60,65);
	fill(0);
	//eyes black
  frameRate(5);
  push();
  translate(centerX-30,eyesY);
  rotate(radians(frameCount*60));
  ellipse(15,5,18);
  fill(255);
  ellipse(18,5,6)
  pop()
  push();
  
  translate(centerX+30,eyesY);
  rotate(radians(frameCount*60));
  fill(0);
  ellipse(15,5,18)
  fill(255);
  ellipse(18,5,6);
  
  pop();
  //ellipse(centerX-20,eyesY+5,15,20);
  //ellipse(centerX+20,eyesY+5,15,20);
  
  	//nose
	fill(255,0,0);
  
	ellipse(centerX,eyesY+36,30);
	line(centerX,centerY,centerX,centerY+70);
  
  //noseDote
  fill(255);
  noStroke();
  ellipse(centerX+5,eyesY+35,10);
  
	//mouth
	noFill();
  stroke(1);
	
  arc(centerX,centerY,190,150,0,radians(170));
	
  //beard left
	line(centerX-250/2+15,centerY-15,centerX-20,centerY+10);
	line(centerX-250/2+15-10,centerY+10+10,centerX-20,centerY+10+10);
	line(centerX-250/2+15,centerY+60,centerX-20,centerY+30)
  
	//beard right (rotate)
  line(centerX+250/2-15,centerY-15,centerX+20,centerY+10);
	line(centerX+250/2-15+10,centerY+10+10,centerX+20,centerY+10+10);
	line(centerX+250/2-15,centerY+60,centerX+20,centerY+30)
	//bow tie
	fill(231,0,50);
  rectMode(CENTER);
	rect(centerX,centerY+125,250,12,10);
	fill(255,221,2);
	ellipse(centerX,centerY+125,30)
	rect(centerX,centerY+125,35,8,10);
//why this doesn't work
  //centerX=centerX+random(8,-8);
  

  
/*
	Everything here is a comment
	and not code 
	*/

}

//
//eyes white
  

  

function mousePressed(){
  //background(255,200,random(120,240));
}var centerX;
var centerY'
function setup() { 
  createCanvas(400, 400);
} 

function draw() { 

  background(255,255,230);
	//face
	stroke(0);
	fill(2,160,234);
  ellipse(center,height/2,250);
	//face bottom
	fill(255);
	ellipse(200,230,220,180);
	//eyes white
	fill(255);
  ellipse(170,150,60,65);
  fill(255);	
	ellipse(230,150,60,65);
	fill(0);
	//eyes black
  ellipse(185,155,15,20);
	ellipse(215,155,15,20);
	fill(255,0,0);
	//nose
	ellipse(200,185.5,30);
	line(200,200.5,200,270);
	//mouth
	noFill();
	arc(200,200,190,150,0,PI);
	
  //beard left
	line(90,180,180,210);
	line(80,220,180,220);
	line(90,260,180,230)
	//beard right
	line(310,180,220,210);
	line(320,220,220,220);
	line(310,260,220,230);
	//bow tie
	fill(231,0,50);
	rect(75,315,250,12,10);
	fill(255,221,2);
	ellipse(200,325,30)
	rect(182,320,35,8,10);
/*
	Everything here is a comment
	and not code 
	*/
	
}