let video;
let vScale=16;
var button;
var snapshots = [];

function setup() {
  createCanvas(400, 400);

  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale);

  button = createButton('TICKLE');
  button.mousePressed(takesnap);
  video.hide();
}

function takesnap() {
  background(random(255),0,0);
  vScale ++;
}


function draw() {
  background(random(255), random(255), random(255),random(1,100));

  video.loadPixels();
  loadPixels();
  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      let index = (x + y * video.width) * 4;
      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];
      
      let bright = (r+g+b)/2;
      
      let w = map(bright,0,255,0,vScale);
      
      noStroke();
      fill(255);
      rectMode(CENTER);
      rect(x*vScale, y*vScale, w, w);
      }
  }
}let video;
let vScale=16;

function setup() {
  createCanvas(640, 480);

  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale);
}

function draw() {
  background(50);

  video.loadPixels();
  loadPixels();
  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      let index = (x + y * video.width) * 4;
      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];
      
      let bright = (r+g+b)/3;
      
      let w = map(bright,0,255,0,vScale);
      
      noStroke();
      fill(255);
      rectMode(CENTER);
      rect(x*vScale, y*vScale, w, w);
      
      // fill(bright);
      // rect(x*vScale,y*vScale,vScale,vScale);
      
      // pixels[index + 0] = bright;
      // pixels[index + 1] = bright;
      // pixels[index + 2] = bright;
      // pixels[index + 3] = 255;
    }
  }
  //updatePixels();

}function preload() {
  data = loadJSON("mta.json");
  
}

function setup() { 
  //createCanvas(400, 400);
  //loadJSON("https://raw.githubusercontent.com/atmccann/mta-lost-found/master/data/2014-10-25.json",gotData, 'jsonP');
  var lost = data.mta[1].accessories[2];
  createP(mta);
} 

function draw() { 
  //background(220);
}

// function gotData(data) {
//   console.log(data);
// }var data;
var paragraphs;
function preload() {
data = loadJSON("collective.json");
}

function setup() { 

// 	var animals = data.list[1].nouns[2];
//   createP(animals);
  
  var collective = data.list; 
  for(var i = 0; i<collective.length; i++) {
    createElement('h1',collective[i].nouns);
  }

  
  // var singular = data.list; 
  // for(var j = 0; j<collective.length; j++) {
  //   createElement('h1',collective[j].animals);
  // }
   //collective.mouseover() 
    
    
//   for(var j = 0; j<collective.length; j++) {
//     createElement('h1',collective[j].animal);
    
    
    }

var weather;
function setup() { 
  createCanvas(400, 400);
  loadJSON('http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=001b0f58045147663b1ea518d34d88b4') 
} 
           
function gotData(data){
  println(data);
  weather = data;
}

function draw() { 
  background(0);
  if (weather) {
    ellipse(100,100,weather.main.temp);
}
}var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1421'; // fill in your serial port name here
var inData;
var xPos = 0; // x position of the graph
var slider;

// Declare Variables
let canvas = {
  x: 400,
  y: 400
};

let hourHandRotate;
let minutehandRotate;
let hourHandColor;
let minuteHandColor;

function setup() {
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing

  serial.list(); // list the serial ports
  serial.open(portName); // open a serial port

	nameP = createP();  
  
  createCanvas(canvas.x, canvas.y);
  colorMode(HSB);
  
  slider = createSlider(0,255,50);
  input = createInput ("Taste the rainbow");


  // Random color generated for stroke
  r = random(360);
  g = random(360);
  b = random(360);

}

function printList() {}

function serverConnected() {
  print('connected to server.');
}

function portOpen() {
  print('the serial port opened.')
}

function serialEvent() {
  //binary
  inData = Number(serial.read());
  print(inData);

  //ascii
  // read a string from the serial port:
  //var inString = serial.readLine();
  // check to see that there's actually a string there:
  //if (inString.length > 0 ) {
  // convert it to a number:
  //inData = Number(inString);
  //}
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}


function draw() {

  //background(frameCount % 360, 20, 80);
  background(slider.value(), 20, 80);
  nameP.html(input.value());

  text("Potentiometer Value:" + inData, 30, 30);


  // Flower Stroke Outline Info  
  stroke(r, g, b);
  strokeWeight(2);
  noFill();
  smooth();

  //Flower Circle Locations
  ellipseMode(RADIUS);

  ellipse(200, 100, 50, 50);
  ellipse(200, 150, 50, 50);
  ellipse(200, 200, 50, 50);
  ellipse(200, 250, 50, 50);
  ellipse(200, 300, 50, 50);

  ellipse(245, 275, 50, 50);
  ellipse(245, 225, 50, 50);
  ellipse(245, 175, 50, 50);
  ellipse(245, 125, 50, 50);

  ellipse(155, 275, 50, 50);
  ellipse(155, 225, 50, 50);
  ellipse(155, 175, 50, 50);
  ellipse(155, 125, 50, 50);

  ellipse(290, 250, 50, 50);
  ellipse(290, 200, 50, 50);
  ellipse(290, 150, 50, 50);

  ellipse(115, 250, 50, 50);
  ellipse(115, 200, 50, 50);
  ellipse(115, 150, 50, 50);

  ellipse(202.5, 200, 150, 150);

  //Start of Clock

  push();
  hourHandRotate = map(inData, 0, canvas.x, 0, 2 * PI);
  minuteHandRotate = map(inData, 0, canvas.x, 0, 24 * PI);
  hourHandColor = map(inData, 0, canvas.y, 180, 360);
  minuteHandColor = map(inData, 0, canvas.y, 360, 180);

  translate(canvas.x / 2, canvas.y / 2);
  noFill();
  //ellipse (0,0,20,20);

  //hour hand

  rotate(hourHandRotate)
  strokeWeight(6);
  stroke(hourHandColor, 100, 100);
  line(0, 0, 0, 85);

  //minute Hand

  rotate(minuteHandRotate - hourHandRotate)
  strokeWeight(6);
  stroke(minuteHandColor, 100, 100);
  line(0, 0, 0, 145)
  pop();
}var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1421';  // fill in your serial port name here
var inData;
var xPos = 0;                           // x position of the graph

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
  
  createCanvas(400,300);
  background(0x08, 0x16, 0x40);
}

function printList() {
}

function serverConnected() {
  print('connected to server.');
}
 
function portOpen() {
  print('the serial port opened.')
}
 
function serialEvent() { 
  //binary
  inData = Number(serial.read());
  print(inData);
  
  //ascii
  // read a string from the serial port:
  //var inString = serial.readLine();
  // check to see that there's actually a string there:
  //if (inString.length > 0 ) {
  // convert it to a number:
  //inData = Number(inString);
  //}
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
  stroke(0xA8, 0xD9, 0xA7);
  line(xPos, height, xPos, height - yPos);
  // at the edge of the screen, go back to the beginning:
  if (xPos >= width) {
    xPos = 0;
    // clear the screen by resetting the background:
    background(0x08, 0x16, 0x40);
  } else {
    // increment the horizontal position for the next reading:
    xPos++;
  }
}
  
  function draw() {
  graphData(inData);

}
var serial; // variable to hold an instance of the serialport library
 
function setup() {
 serial = new p5.SerialPort(); // make a new instance of the serialport library
 serial.on('list', printList); // set a callback function for the serialport list event
 
 serial.list(); // list the serial ports
}
 
// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 print(i + " " + portList[i]);
 }
}var bgcolor;
var button;
var slider;
var input;
var nameP;

function setup() { 
  canvas = createCanvas(400, 400);
  canvas.mouseOver(overpara);
  canvas.mouseOut(outpara);
  canvas.mousePressed(changeColor);
  
  bgcolor = color(200);
  nameP = createP('Your Name');
  
	button = createButton( "go go go");
  button.mousePressed(changeColor);
  
  nameP.mouseOver(overpara);
  nameP.mouseOut(outpara);
  
  slider = createSlider(10,100,47);
  input = createInput ("type your name");
} 

function overpara(){
  nameP.html('Your mouse is over')
}

function outpara(){
  nameP.html('Your mouse is OUT')
}
function changeColor() {
  bgcolor = color(random(255));
}

//function mousePressed() {
//  bgcolor = color(random(255));
//}
  
function draw() { 
  background(bgcolor);
  fill(255,255,0);
  rect(100,100,slider.value(),slider.value());
  //nameP.html(input.value());
  text(input.value(), 10,20);
}var canvas;
var h1;
var x = 100;
var y = 100;

function setup() { 
  canvas = createCanvas(400, 200);
  createP("rawr");
  h1 = createElement('h1', "Test");
} 

function mousepressed() {
  h1.html("Now I will show you my Favorite Numbers")
  createP("Fav Numb is");
}
function draw() { 
  clear();
  background(200);
  fill(255,255,0);
  rect(x,y, 50,50);
  h1.position(x,y);
  x = x + random(-5,5);
}function setup() {
  createCanvas(200, 200);
  createP("rawr");
}

function draw() {
  background(0);
  fill(255, 0, 0);
  rect(100, 100, 50, 50);
}function setup() {
  createCanvas(400,400);  
}

function draw() {
  background(200);
  stroke(0);
  noFill();
  drawCircle(width/2,height/2,200); 

}

// Recursion
function drawCircle(x,y,rad) {
  ellipse(x, y, rad, rad);
  if(rad > 10) {
  let newrad = rad/2
  drawCircle(x+rad/2, y, newrad); //left
  drawCircle(x-rad/2, y, newrad);//right
  drawCircle(x, y+rad/2, newrad); //top
  drawCircle(x, y-rad/2, newrad);//bottom
  rad = newrad;
  }
  

}function setup() { 
  createCanvas(400, 400);
} 

var button = {
  x: 0,
  y: 0,
  d: 100
}

function draw() { 
  background(220);
  
  rect(width - 100, height - 100, 100, 100)
}var ball = {
  
  x: 0,
  y: 0,
  d: 0
  
};

function setup() { 
  createCanvas(400, 400);
  
  ball.x = random(0,width),
  ball.y = random(0,height),
  ball.d = random(10,30);
};


  function draw() { 
  background(220);
  ellipse (ball.x,ball.y,ball.d);
    
    ball.x =  ball.x + ball.xspeed;
  
    if (ball.x > width) { 
      ball.xspeed = balll.xspeed * -1

}let canvas = {
  x: 400,
  y: 400
};

let hourHandRotate;
let minutehandRotate;
let hourHandColor;
let minuteHandColor;

function setup() { 
  createCanvas(canvas.x, canvas.y);
  colorMode(HSB);
} 

function draw() { 

  background(frameCount%360,40,70);
  
  // House translation
  push();

  hourHandRotate = map(mouseX,0,canvas.x,0,2*PI);
  minuteHandRotate = map(mouseX,0,canvas.x,0,24*PI);
  hourHandColor = map(mouseY,0, canvas.y, 0, 360);
  minuteHandColor = map(mouseY, 0, canvas.y, 360, 0);
  
  translate (canvas.x/2, canvas.y/2);
  fill("white")
  ellipse (0,0,200,200);
  
  // hour hand

  rotate(hourHandRotate)
  strokeWeight(6);
  stroke(hourHandColor,100,100);
  line (0,0,0,50);
  
  //minute Hand
  
  rotate(minuteHandRotate - hourHandRotate)
  strokeWeight (6);
  stroke (minuteHandColor,100,100);
  line (0,0,0, 80)
  pop ();
}// Declare Variables
let canvas = {
  x: 400,
  y: 400
};

let hourHandRotate;
let minutehandRotate;
let hourHandColor;
let minuteHandColor;

function setup() { 
  createCanvas(canvas.x, canvas.y);
  colorMode(HSB);
  
// Random color generated for stroke
  r = random(360);
  g = random(360);
  b = random(360);  
} 

function draw() { 
  
background(frameCount%360,20,80);

  
// Flower Stroke Outline Info  
stroke(r, g, b);
strokeWeight(2);
noFill();
smooth();

//Flower Circle Locations
ellipseMode(RADIUS); 
  
ellipse(200, 100, 50, 50);
ellipse(200, 150, 50, 50);
ellipse(200, 200, 50, 50);
ellipse(200, 250, 50, 50);
ellipse(200, 300, 50, 50);

ellipse(245, 275, 50, 50);
ellipse(245, 225, 50, 50);
ellipse(245, 175, 50, 50);
ellipse(245, 125, 50, 50);
  
ellipse(155, 275, 50, 50);
ellipse(155, 225, 50, 50);
ellipse(155, 175, 50, 50);
ellipse(155, 125, 50, 50);
  
ellipse(290, 250, 50, 50);
ellipse(290, 200, 50, 50);
ellipse(290, 150, 50, 50);
  
ellipse(115, 250, 50, 50);
ellipse(115, 200, 50, 50);
ellipse(115, 150, 50, 50);

ellipse(202.5, 200, 150, 150); 

  //Start of Clock
  
  push();
  hourHandRotate = map(mouseX,0,canvas.x,0,2*PI);
  minuteHandRotate = map(mouseX,0,canvas.x,0,24*PI);
  hourHandColor = map(mouseY,0, canvas.y, 180, 360);
  minuteHandColor = map(mouseY, 0, canvas.y, 360, 180);
  
  translate (canvas.x/2, canvas.y/2);
  noFill();
  //ellipse (0,0,20,20);
  
  //hour hand

  rotate(hourHandRotate)
  strokeWeight(6);
  stroke(hourHandColor,100,100);
  line (0,0,0,85);
  
  //minute Hand
  
  rotate(minuteHandRotate - hourHandRotate)
  strokeWeight (6);
  stroke (minuteHandColor,100,100);
  line (0,0,0,145)
  pop ();
}function setup() { 
  createCanvas(400, 400);
  //frameRate (8); //choppy motion
  //var x, y; //must declare X up here!
  
  //x = random (0, width)
  //y = random (0, height)
  
} 

function draw() { 
  background(220);

  x = map(mouseX, 0, 50, 0, width);
  y = mouseY;

  rect (x,y, 20,50);

  //x = x + random (0,2)
  //x++;
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(255, 153, 51);
  
stroke(0, 0, 128);
strokeWeight(2);
noFill();
smooth();
  

ellipseMode(RADIUS); 
  
ellipse(200, 100, 50, 50);
ellipse(200, 150, 50, 50);
ellipse(200, 200, 50, 50);
ellipse(200, 250, 50, 50);
ellipse(200, 300, 50, 50);

ellipse(245, 275, 50, 50);
ellipse(245, 225, 50, 50);
ellipse(245, 175, 50, 50);
ellipse(245, 125, 50, 50);
  
ellipse(155, 275, 50, 50);
ellipse(155, 225, 50, 50);
ellipse(155, 175, 50, 50);
ellipse(155, 125, 50, 50);
  
ellipse(290, 250, 50, 50);
ellipse(290, 200, 50, 50);
ellipse(290, 150, 50, 50);
  
ellipse(115, 250, 50, 50);
ellipse(115, 200, 50, 50);
ellipse(115, 150, 50, 50);

ellipse(202.5, 200, 150, 150); 
  
}
  function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(255, 171, 45);
  noFill()
  
  ellipse(200, 100, 100, 100);
  ellipse(200, 150, 100, 100);
  ellipse(200, 200, 100, 100);
  ellipse(200, 250, 100, 100);
  ellipse(200, 300, 100, 100);
  

  ellipse(250, 275, 100, 100);
  ellipse(250, 225, 100, 100);
  ellipse(250, 175, 100, 100);
  ellipse(250, 125, 100, 100);
  
  ellipse(150, 275, 100, 100);
  ellipse(150, 225, 100, 100);
  ellipse(150, 175, 100, 100);
  ellipse(150, 125, 100, 100);
  
  ellipse(300, 250, 100, 100);
  ellipse(300, 200, 100, 100);
  ellipse(300, 150, 100, 100);
  
  ellipse(100, 250, 100, 100);
  ellipse(100, 200, 100, 100);
  ellipse(100, 150, 100, 100);
  
  //ellipse(100, 200, 100, 100);
  //ellipse(150, 200, 100, 100);
  //ellipse(250, 200, 100, 100);
  //ellipse(300, 200, 100, 100);
  

}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(120, 110, 234);
  
  fill(200);
  ellipse(200, 200, 100, 100);
  
  rectMode(CENTER);
  fill(255);
  rect(167, 263, 33, 33);
  
  
  rectMode(CENTER);
  //fill(0);
  rect(233, 263, 33, 33);
  
  fill(130);
  triangle(150, 150, 250, 150, 200, 50);
  
  /*
  	Everything here is a comment and not code  
    It was tricky getting the triangle to line up with the circle
  */
  
}