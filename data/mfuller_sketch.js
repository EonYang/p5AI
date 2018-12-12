// Create P5 Canvas
var myCanvas = null;

var myVideo;
var loopVid = false;

function preload() {
  //myVideo = createVideo('short.mp4', playVid);
  //myVideo = createVideo('short.mp4', playVid);

}

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  translate(width/2,height/2);
  ellipse(x*width/2, y*height/2, 20, 20);
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  translate(width/2,height/2);
  ellipse(x*width/2, y*height/2, 10, 10);
}// Declare Kinectron
var kinectron = null;

// Create P5 Canvas
var myCanvas = null;

var myVideo;
var loopVid = false;

function preload() {
  myVideo = createVideo('short.mp4', playVid);

}

function setup() {
  myCanvas = createCanvas(512, 424);
  background(0);
  noStroke();


  // Define and create an instance of kinectron
  var kinectronIpAddress = "172.16.221.100"; // FILL IN YOUR KINECTRON IP ADDRESS HERE
  kinectron = new Kinectron(kinectronIpAddress);

  // Connect with application over peer
  kinectron.makeConnection();

  // Request right hand and set callback for received hand
  // drawRightHand function runs when hand information is received from Kinect
  // this runs instead of draw function
  kinectron.startTrackedJoint(kinectron.HANDRIGHT, drawRightHand);
}

function draw() {
  

}

function playVid() {
	myVideo.loop();
  loopVid = true; 
}

function drawRightHand(hand) {
  //console.log(hand);
  let handX = hand.depthX * myCanvas.width;
  let handY = hand.depthY * myCanvas.height;

  playOrStopVid(handX, handY);

  // Clear background
  //background(0);

  // Set hand color
  fill(255);

  // Draw ellipse where hand is with hand positioning mapped to cavas size
  rect(handX, handY, 50, 50);
}

function playOrStopVid(inHandX, inHandY) {
  
  if (inHandX > width / 2 && loopVid == true) {
    
    console.log("here");
    myVideo.stop();
    loopVid = false;
    
    
    //make something happen
    
    

  } else if (inHandX < width /2 && loopVid == false) {
    //make something else happen 
    console.log("there");
    myVideo.loop();
    loopVid = true;
  }


}// Declare Kinectron
var kinectron = null;
var url = "http://www.michaelfuller56.com/wp-content/uploads/2017/11/IMG_4415.mp4";

// Create P5 Canvas
var myCanvas = null;

function setup() {
  myvideo = createVideo('short.mp4')
  myvideo.play();
  myCanvas = createCanvas(512, 424);
  background(0);
  noStroke();

  // Define and create an instance of kinectron
  var kinectronIpAddress = "172.16.223.47"; // FILL IN YOUR KINECTRON IP ADDRESS HERE
  kinectron = new Kinectron(kinectronIpAddress);

  // Connect with application over peer
  kinectron.makeConnection();

  // Request right hand and set callback for received hand
  // drawRightHand function runs when hand information is received from Kinect
  // this runs instead of draw function
  kinectron.startTrackedJoint(kinectron.HANDRIGHT, drawRightHand);
}

function draw() {

}

function drawRightHand(hand) {
  // Clear background
  background(0);

  // Set hand color
  fill(255);

  // Draw ellipse where hand is with hand positioning mapped to cavas size
  ellipse(hand.depthX * myCanvas.width, hand.depthY * myCanvas.height, 50, 50);
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
 background(0, 100, 200);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}var name = "";
var myspeech;

let puffins = [];
//let images1 = [];
let tempx = 0;
let tempy = 0;

//let puffin1;
//let puffin2;


// let mySound;
// let mySound1;
let img_puffin;

// function preload() {
//   soundFormats('mp3', 'ogg');
//   img_puffin = loadImage('images-1.jpg');
//   mySound = loadSound('puffin.mp3');
//   mySound1 = loadSound('puffin.mp3');

// }

function setup() {
  createCanvas(480, 420);
  myspeech = new p5.Speech();
}

// puffin1 = new Puffin();
// puffin2 = new Puffin();
// print(puffin.x, bubble.y);

function printName(data) {
  print(data.name);
  var b = new myPuffins(mouseX, mouseY,  "my Puffin name is",data.name);
  puffins.push(b);
  myspeech.speak(data.name);
}


function mousePressed() {
  loadJSON("https://uinames.com/api/?region=Canada", printName);
  var r = floor(random(0, puffins.length));


  //mySound.play();
}

function draw() {
  background(220);
  //puffin1.move();
  // puffin1.show();
  //  puffin2.move();
  //  puffin2.show();

  for (var i = puffins.length - 1; i >= 0; i--) {
    puffins[i].move();
    puffins[i].show();

  }
}


class myPuffins {
  constructor(x, y, name) {
    this.x = x;
    this.y = y;
    this.name = name;
  }

  move() {

    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);

  }

  show() {
    push();
    translate(this.x, this.y);
    //image(img_puffin, 0, 0, 20, 20);
    stroke(0);
    strokeWeight(70);
    line(0, -35, 0, -65);
    noStroke();
    fill(220);
    //left eye dome
    ellipse(-17.5, -65, 35, 35);
    //right eye dome
    ellipse(17.5, -65, 35, 35);
    //chin
    arc(0, -65, 70, 70, 0, PI);
    fill(0);
    //left eye
    ellipse(-14, -65, 8, 8);
    //right eye
    ellipse(14, -65, 8, 8);
    //beak
    quad(0, -58, 4, -51, 0, -44, -4, -51);
    fill(100, 20, 40)
    text(this.name, 10, 10);
    pop();

  }

  // }

  // function show() {

  //   //puffin.draw(110, 210);
}var name = "";
var myspeech;

let puffins = [];
//let images1 = [];
let tempx = 0;
let tempy = 0;

//let puffin1;
//let puffin2;


// let mySound;
// let mySound1;
let img_puffin;

// function preload() {
//   soundFormats('mp3', 'ogg');
//   img_puffin = loadImage('images-1.jpg');
//   mySound = loadSound('puffin.mp3');
//   mySound1 = loadSound('puffin.mp3');

// }

function setup() {
  createCanvas(480, 420);
  myspeech = new p5.Speech();
}

// puffin1 = new Puffin();
// puffin2 = new Puffin();
// print(puffin.x, bubble.y);

function printName(data) {
  print(data.name);
  var b = new myPuffins(mouseX, mouseY, data.name);
  puffins.push(b);
  myspeech.speak(data.name);
}


function mousePressed() {
  loadJSON("https://uinames.com/api/?region=Canada", printName);
  var r = floor(random(0, puffins.length));
  
  
  //mySound.play();
}

function draw() {
  background(220);
  //puffin1.move();
  // puffin1.show();
  //  puffin2.move();
  //  puffin2.show();

  for (var i = puffins.length - 1; i >= 0; i--) {
    puffins[i].move();
    puffins[i].show();

  }
}


class myPuffins {
  constructor(x, y, name) {
    this.x = x;
    this.y = y;
    this.name = name;
  }

  move() {

    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);

  }

  show() {
    push();
    translate(this.x, this.y);
    //image(img_puffin, 0, 0, 20, 20);
    stroke(0);
    strokeWeight(70);
    line(0, -35, 0, -65);
    noStroke();
    fill(220);
    //left eye dome
    ellipse(-17.5, -65, 35, 35);
    //right eye dome
    ellipse(17.5, -65, 35, 35);
    //chin
    arc(0, -65, 70, 70, 0, PI);
    fill(0);
    //left eye
    ellipse(-14, -65, 8, 8);
    //right eye
    ellipse(14, -65, 8, 8);
    //beak
    quad(0, -58, 4, -51, 0, -44, -4, -51);
    text(this.name, 10,10);
    pop();
    
  }

  // }

  // function show() {

  //   //puffin.draw(110, 210);
}var name = "";
var myspeech;

let myCircles = [];
let tempx = 0;
let tempy = 0;

function setup() { 
  createCanvas(500, 500);
  background(255,0,0);
  myspeech = new p5.Speech();
} 

function draw() { 
  
  for(let i =0;i<myCircles.length;i++)
  {
    myCircles[i].show();
  }
  
}

function printName(data) {
 
  name = data.name + " " + data.surname;
  print(name);
  myCircles.push(new myCircle(tempx, tempy, name));
  myspeech.speak(name);
}

function mousePressed() {
  tempx = mouseX;
  tempy = mouseY;
	loadJSON("https://uinames.com/api/?region=Canada",printName);
}

class myCircle {
  constructor(x,y,name) {
    this.x = x;
    this.y = y;
    this.name = name;
  }
  show() {
    fill(255);
    ellipse(this.x, this.y, 40,40);
    stroke(0);
    text(this.name, this.x, this.y);
  }
}var puffin = [];
var images1 = [];

//let puffin1;
//let puffin2;

let mySound;
let mySound1;
let img_puffin;

function preload() {
  soundFormats('mp3', 'ogg');
  img_puffin = loadImage('images-1.jpg');
  mySound = loadSound('puffin.mp3');
  mySound1 = loadSound('puffin.mp3');

}

function setup() {
  createCanvas(480, 420);
  puffin1 = new Puffin();
  puffin2 = new Puffin();
  // print(puffin.x, bubble.y);


}

function mousePressed() {
  var r = floor(random(0, puffin.length));
  var b = new Puffin(mouseX, mouseY);
  puffin.push(b);
  mySound.play();
}

function draw() {
  background(220);
  //puffin1.move();
  // puffin1.show();
  //  puffin2.move();
  //  puffin2.show();

  for (var i = puffin.length - 1; i >= 0; i--) {
    puffin[i].move();
    puffin[i].show();

  }
}


class Puffin {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  move() {

    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);

  }

  show() {
    push();
    translate(this.x, this.y);
    //image(img_puffin, 0, 0, 20, 20);
    stroke(0);
    strokeWeight(70);
    line(0, -35, 0, -65);
    noStroke();
    fill(220);
    //left eye dome
    ellipse(-17.5, -65, 35, 35);
    //right eye dome
    ellipse(17.5, -65, 35, 35);
    //chin
    arc(0, -65, 70, 70, 0, PI);
    fill(0);
    //left eye
    ellipse(-14, -65, 8, 8);
    //right eye
    ellipse(14, -65, 8, 8);
    //beak
    quad(0, -58, 4, -51, 0, -44, -4, -51);
    pop();
  }

  // }

  // function show() {

  //   //puffin.draw(110, 210);
}var puffin = [];
var images1 = [];

//let puffin1;
//let puffin2;

let mySound;
let mySound1;
let img_puffin;

function preload() {
  soundFormats('mp3', 'ogg');
  img_puffin = loadImage('images-1.jpg');
  mySound = loadSound('puffin.mp3');
  mySound1 = loadSound('puffin.mp3');

}

function setup() {
  createCanvas(480, 420);
  puffin1 = new Puffin();
  puffin2 = new Puffin();
  // print(puffin.x, bubble.y);


}

function mousePressed() {
  var r = floor(random(0, puffin.length));
  var b = new Puffin(mouseX, mouseY);
  puffin.push(b);
  mySound.play();
}

function draw() {
  background(220);
  //puffin1.move();
  // puffin1.show();
  //  puffin2.move();
  //  puffin2.show();

  for (var i = puffin.length - 1; i >= 0; i--) {
    puffin[i].move();
    puffin[i].show();

  }
}


class Puffin {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  move() {

    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);

  }

  show() {
    push();
    translate(this.x, this.y);
    image(img_puffin, 0, 0, 20, 20);
    //stroke(0);
    //strokeWeight(70);
    //line(0, -35, 0, -65);
    //noStroke();
    //fill(220);
    //left eye dome
    //ellipse(-17.5, -65, 35, 35);
    //right eye dome
    //ellipse(17.5, -65, 35, 35);
    //chin
    //arc(0, -65, 70, 70, 0, PI);
    //fill(0);
    //left eye
    //ellipse(-14, -65, 8, 8);
    //right eye
    //ellipse(14, -65, 8, 8);
    //beak
    //quad(0, -58, 4, -51, 0, -44, -4, -51);
    pop();
  }

  // }

  // function show() {

  //   //puffin.draw(110, 210);
}let video;
let colInfo;
let word = [];


function setup() { 
  createCanvas(800, 600);
  video = createCapture(VIDEO);
  video.hide();
} 

function draw() { 
  background(220);
  image(video, 0,0,width,height);
  
  //image(video,mouseY+mouseY,0,width);
  //text(word, 10, 10);
  var col = get(mouseX, mouseY);
  noStroke();
  fill(col[0], col[1], col[2]);
  rectMode(CENTER);
  rect(mouseX, mouseY, 100, 100);
  
  if(word.length > 0){
    for(var i = 0 ; i < word.length; i++){
    word[i].size = (word[i].color[0] +word[i].color[1]+word[i].color[2])/6;
    //print(word[0].size);
    textSize(word[i].size);
    //fill(word[i].color[2], word[i].color[0], word[i].color[1]);
    fill(word[i].color[0], word[i].color[1], word[i].color[2]);
      text(word[i].ascii, word[i].posX, word[i].posY);
    //word[0].show();
    }
  }
}

function mouseMoved(){
  colInfo = get(mouseX, mouseY);
  //print(colInfo[0]);
  var ascii = round(map(colInfo[0], 0, 255, 33, 122));
  var letter = String.fromCharCode(ascii);
  //print(letter);
  //word = word + letter;
  word.push(new Alphabets(colInfo, letter));
  word[0].sizeCal();
}function setup() { 
  createCanvas(400, 1000);
  osc = new p5.Oscillator();
  osc.setType('sin');
  osc.freq(550);
  osc.amp(1);
  osc.start();
} 

function draw() { 
  background(220);
  osc.freq(mouseY*20);
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1421'; // fill in your serial port name here
var inData;                            // for incoming serial data
var outByte = 0;                       // for outgoing data
 
function setup() {
 createCanvas(400, 300);          // make the canvas
 serial = new p5.SerialPort();    // make a new instance of the serialport library
 serial.on('data', serialEvent);  // callback for when new data arrives
 serial.on('error', serialError); // callback for errors
 serial.open(portName);           // open a serial port
}var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.thisWontWorkEver';  // fill in your serial port name here, or pick during Serial list event
var searchString = "usbmodem"; //during Serial port list event, if a port containing this string is found we will attempt to open it
var logSerial = true;
var lastSerialString = "";
//var rValue, gValue;
var bgValue = 10;
var switchState = 1; //pulled high, 1 = not pressed, 0 = pressed


function setup() {
  createCanvas(640, 480);
  //background(bgValue/4, 0x16, 0x40);
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event NOTE: I like to chain open from list, so I can decide which port is the arduino
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
  
  //serial.list();
}

// get the list of ports:
function printList(portList) {
  console.log("In list");
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {

    // Display the list the console:
    console.log(i + " " + portList[i]);
    if (portList[i].indexOf(searchString) != -1) { //indexOf gives the starting position of a substring within a longer string, and returns -1 if not found.
      portName = portList[i];
      console.log("Will attempt to open Arduino on " + portName + " for serial connection");
    }
  }
  serial.open(portName); //NOTE: here is my open command.
}


function serialEvent() {
  //console.log(serial.read());
  var inData = serial.readLine();
  if (inData.length>0) {
    console.log("Incoming serial data: " + inData);
    var d = split(inData, ',');
    console.log(d);
    if (d.length == 4) {
    	bgValue = parseInt(d[0]);
      switchState = parseInt(d[1]);
    	console.log("bgValue = " + bgValue);
    	console.log("switchState = " + switchState);      
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
  text(lastSerialString, 50, 50);
  stroke(0);
  fill(255, 0, 0);
  ellipse(100, 300, 50, 50);
  fill(0, 255, 0);
  ellipse(200, 300, 50, 50);
}

function mousePressed() {
  // rValue = int(map(mouseX, 10, width-10, 0, 255));
  // gValue = int(map(mouseY, 10, height-10, 0, 255));
  // gValue = constrain(gValue, 0, 255);
  // rValue = constrain(rValue, 0, 255);
  //serial.write("L:" + rValue + "," + gValue + "\n");
  if (mouseX < width/2) {
   serial.write("beep:" + mouseX * 10 + "," + (20+mouseY/2) + "\n");
  } else {
  	serial.write("blorp" + "\n"); 
  }
}

function keyPressed() {
  if (key>=0 && key<=9) {
    //serial.write("T:" + key*40 + "\r\n");
    serial.write("whoop" + "\n");
  }
}

//function mousePressed() {
  //serial.write("255,128\r\n");
  // serial.write(13);
  // serial.write(10);
//}

function serialError(err) { console.log('Something went wrong with the serial port. ' + err); }
function portClose() { console.log('The serial port closed.'); }
function serverConnected() { console.log('connected to server.'); }
function portOpen() { console.log('the serial port opened.') }function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}var puffin = [];
var images1 = [];

//let puffin1;
//let puffin2;

let mySound;
let mySound1;
let img_puffin;

function preload() {
  soundFormats('mp3', 'ogg');
  img_puffin = loadImage('images-1.jpg');
  mySound = loadSound('puffin.mp3');
  mySound1 = loadSound('puffin.mp3');

}

function setup() {
  createCanvas(480, 420);
  puffin1 = new Puffin();
  puffin2 = new Puffin();
  // print(puffin.x, bubble.y);


}

function mousePressed() {
  var r = floor(random(0, puffin.length));
  var b = new Puffin(mouseX, mouseY);
  puffin.push(b);
  mySound.play();
}

function draw() {
  background(220);
  //puffin1.move();
  // puffin1.show();
  //  puffin2.move();
  //  puffin2.show();

  for (var i = puffin.length - 1; i >= 0; i--) {
    puffin[i].move();
    puffin[i].show();

  }
}


class Puffin {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  move() {

    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);

  }

  show() {
    push();
    translate(this.x, this.y);
    image(img_puffin, 0, 0, 20, 20);
    //stroke(0);
    //strokeWeight(70);
    //line(0, -35, 0, -65);
    //noStroke();
    //fill(220);
    //left eye dome
    //ellipse(-17.5, -65, 35, 35);
    //right eye dome
    //ellipse(17.5, -65, 35, 35);
    //chin
    //arc(0, -65, 70, 70, 0, PI);
    //fill(0);
    //left eye
    //ellipse(-14, -65, 8, 8);
    //right eye
    //ellipse(14, -65, 8, 8);
    //beak
    //quad(0, -58, 4, -51, 0, -44, -4, -51);
    pop();
  }

  // }

  // function show() {

  //   //puffin.draw(110, 210);
}var bubbles = [];
var emojis = [];

function preload() {
  emojis[0] = loadImage("images/emoji0.png"); 
}

function setup() {
  cnv = createCanvas(600, 400);   
}

function mousePressed() {
  var r = floor(random(0, emojis.length));
  var b = new Bubble(mouseX, mouseY, emojis[r]);
  bubbles.push(b);
}

function draw() {
  background(220);

  for (var i = bubbles.length-1; i >= 0; i--) {
    bubbles[i].update();
    bubbles[i].display(); 
  }
}let puffin1;
let puffin2;

let mySound;
let mySound1;

function preload() {
  // soundFormats('mp3', 'ogg');
  mySound = loadSound('puffin.mp3');
    mySound1 = loadSound('puffin.mp3');

}

function setup() {
  createCanvas(480, 220);
  puffin1 = new Puffin();
  puffin2 = new Puffin();
  // print(puffin.x, bubble.y);

  mySound.play();
  mySound.play();


}

function draw() {
  background(220);
  puffin1.move();
  puffin1.show();
  puffin2.move();
  puffin2.show();
}

class Puffin {
  constructor() {
    this.x = 200;
    this.y = 150;
  }

  move() {

    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
  }

  // }


  show() {
    push();
    translate(this.x, this.y);
    stroke(0);
    strokeWeight(70);
    line(0, -35, 0, -65);
    noStroke();
    fill(220);
    //left eye dome
    ellipse(-17.5, -65, 35, 35);
    //right eye dome
    ellipse(17.5, -65, 35, 35);
    //chin
    arc(0, -65, 70, 70, 0, PI);
    fill(0);
    //left eye
    ellipse(-14, -65, 8, 8);
    //right eye
    ellipse(14, -65, 8, 8);
    //beak
    quad(0, -58, 4, -51, 0, -44, -4, -51);
    pop();
  }

  // }

  // function show() {

  //   //puffin.draw(110, 210);
}var puffin = [];
var images1 = [];

//let puffin1;
//let puffin2;

let mySound;
let mySound1;
let img_puffin;

function preload() {
  soundFormats('mp3', 'ogg');
  img_puffin = loadImage('images-1.jpg');
  mySound = loadSound('puffin.mp3');
  mySound1 = loadSound('puffin.mp3');

}

function setup() {
  createCanvas(480, 420);
  puffin1 = new Puffin();
  puffin2 = new Puffin();
  // print(puffin.x, bubble.y);


}

function mousePressed() {
  var r = floor(random(0, puffin.length));
  var b = new Puffin(mouseX, mouseY);
  puffin.push(b);
  mySound.play();
}

function draw() {
  background(220);
  //puffin1.move();
  // puffin1.show();
  //  puffin2.move();
  //  puffin2.show();

  for (var i = puffin.length - 1; i >= 0; i--) {
    puffin[i].move();
    puffin[i].show();

  }
}


class Puffin {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  move() {

    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);

  }

  show() {
    push();
    translate(this.x, this.y);
    //image(img_puffin, 0, 0, 20, 20);
    stroke(0);
    strokeWeight(70);
    line(0, -35, 0, -65);
    noStroke();
    fill(220);
    //left eye dome
    ellipse(-17.5, -65, 35, 35);
    //right eye dome
    ellipse(17.5, -65, 35, 35);
    //chin
    arc(0, -65, 70, 70, 0, PI);
    fill(0);
    //left eye
    ellipse(-14, -65, 8, 8);
    //right eye
    ellipse(14, -65, 8, 8);
    //beak
    quad(0, -58, 4, -51, 0, -44, -4, -51);
    pop();
  }

  // }

  // function show() {

  //   //puffin.draw(110, 210);
}let puffin1;
let puffin2;

let mySound;
let mySound1;

function preload() {
  // soundFormats('mp3', 'ogg');
  mySound = loadSound('puffin.mp3');
  mySound1 = loadSound('puffin.mp3');

}

function setup() {
  createCanvas(480, 220);
  puffin1 = new Puffin();
  puffin2 = new Puffin();
  // print(puffin.x, bubble.y);

  mySound.play();
  mySound.play();


}

function draw() {
  background(220);
  puffin1.move();
  puffin1.show();
  puffin2.move();
  puffin2.show();
}

class Puffin {
  constructor() {
    this.x = 200;
    this.y = 150;
  }

  move() {

    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
  }

  // }


  show() {
    push();
    translate(this.x, this.y);
    stroke(0);
    strokeWeight(70);
    line(0, -35, 0, -65);
    noStroke();
    fill(220);
    //left eye dome
    ellipse(-17.5, -65, 35, 35);
    //right eye dome
    ellipse(17.5, -65, 35, 35);
    //chin
    arc(0, -65, 70, 70, 0, PI);
    fill(0);
    //left eye
    ellipse(-14, -65, 8, 8);
    //right eye
    ellipse(14, -65, 8, 8);
    //beak
    quad(0, -58, 4, -51, 0, -44, -4, -51);
    pop();
  }

  // }

  // function show() {

  //   //puffin.draw(110, 210);
}var puffin = [];

//let puffin1;
//let puffin2;

let mySound;
let mySound1;

function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound('puffin.mp3');
  mySound1 = loadSound('puffin.mp3');

}

function setup() {
  createCanvas(480, 420);
  puffin1 = new Puffin();
  puffin2 = new Puffin();
  // print(puffin.x, bubble.y);

  function mousePressed() {
    var r = floor(random(0, puffin.length));
   var b = new puffin(mouseX, mouseY, puffin[r]);
    puffin.push(b);
  }


  //mySound.play();
  //mySound.play();
}

function draw() {
  background(220);
  puffin1.move();
  puffin1.show();
  puffin2.move();
  puffin2.show();
}
for (var i = puffin.length - 1; i >= 0; i--) {
  puffin[i].update();
  puffin[i].display();
}
class Puffin {
  constructor() {
    this.x = 200;
    this.y = 150;
  }

  move() {

    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
    
  }

//}


show() {
  push();
  translate(this.x, this.y);
  stroke(0);
  strokeWeight(70);
  line(0, -35, 0, -65);
  noStroke();
  fill(220);
  //left eye dome
  ellipse(-17.5, -65, 35, 35);
  //right eye dome
  ellipse(17.5, -65, 35, 35);
  //chin
  arc(0, -65, 70, 70, 0, PI);
  fill(0);
  //left eye
  ellipse(-14, -65, 8, 8);
  //right eye
  ellipse(14, -65, 8, 8);
  //beak
  quad(0, -58, 4, -51, 0, -44, -4, -51);
  pop();
}

// }

// function show() {

//   //puffin.draw(110, 210);
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}let puffin1;
let puffin2;


function setup() {
  createCanvas(480, 220);
  puffin1 = new Puffin();
  puffin2 = new Puffin();
  // print(puffin.x, bubble.y);
}

function draw() {
  background(220);
  puffin1.move();
  puffin1.show();
  puffin2.move();
  puffin2.show();
}

class Puffin {
  constructor() {
    this.x = 200;
    this.y = 150;
  }

  move() {

    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
  }

  // }


  show() {
    push();
    translate(this.x, this.y);
    stroke(0);
    strokeWeight(70);
    line(0, -35, 0, -65);
    noStroke();
    fill(220);
    //left eye dome
    ellipse(-17.5, -65, 35, 35);
    //right eye dome
    ellipse(17.5, -65, 35, 35);
    //chin
    arc(0, -65, 70, 70, 0, PI);
    fill(0);
    //left eye
    ellipse(-14, -65, 8, 8);
    //right eye
    ellipse(14, -65, 8, 8);
    //beak
    quad(0, -58, 4, -51, 0, -44, -4, -51);
    pop();
  }

  // }

  // function show() {

  //   //puffin.draw(110, 210);
}function setup() { 
  createCanvas(400, 400);
  bubblees.push(new Bubble(200,200));
  print(bubbles);
} 

function draw() {
  bubble.display();
  background(220);
  for(let i =0; 
  
  
class Bubble{
    constructor(){
      this.diameter = 20;
      this.x=200;
      this.y = 200;
      this.color = 255;
    }      
display() {
      fill(255);
      ellipse(this.x, this.y, this.diameter, this.diameter);
}
move() {
  this.x+= this.speed;
  this.y+= this.speed;}
  
  
        
        
        
}


class Circle{
  
   constructor(_x, _y, _r, _xdir, _ydir){
     this.x =_x;
     this.y =_y;
     this.r =_x;
     this.x =_x;
     this.x =_x;

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}function setup() { 
  var angle = degrees(PI/2);
  println(angle);
} 

function draw() { 
  
}var puffin = {
  x: 0,
  y: -35,


  move: function() {
    this.x = this.x + random(-1, 1);
    this.y = this.y + random(-1, 1);
  },
}


function setup() {
  createCanvas(480, 220);
}

function draw() {
  puffin.display();
  background(220);
}

function puffin(x, y) {
  push();
  translate(x, y);
  stroke(0);
  strokeWeight(70);
  line(0, -35, 0, -65);
  noStroke();
  fill(220);
  //left eye dome
  ellipse(-17.5, -65, 35, 35);
  //right eye dome
  ellipse(17.5, -65, 35, 35);
  //chin
  arc(0, -65, 70, 70, 0, PI);
  fill(0);
  //left eye
  ellipse(-14, -65, 8, 8);
  //right eye
  ellipse(14, -65, 8, 8);
  //beak
  quad(0, -58, 4, -51, 0, -44, -4, -51);
  pop();
  //puffin.draw(110, 210);
  puffin.move();
}



function setup() { 
  createCanvas(500, 220);
} 

function draw() { 
  background(204);
  randomSeed(0);
  for (var i = 35; i < width + 40; i += 40){
  //for (var y = 35; y < height + 55; y += 55){
    var gray = int(random(0, 102));
    var scalar = random(0.25, 1.0);
    puffin(i,110, gray, scalar);
  }
  {
    //puffin(x, y);
  }
  //puffin(110, 210);
  //puffin(180, 165);
  //puffin(250, 110);
  //puffin(320, 165);
  //puffin(390, 210);
}
  
function puffin(x, y, g, s) {
  push();
  translate(x,y);
  //set the scale
  scale(s);
  //set the gray value
  stroke(g);
  strokeWeight(70);
  //body
  line(0, -35, 0, -65);
  noStroke();
  fill(255-g);
  //left eye dome
  ellipse(-17.5, -65, 35, 35);
  //right eye dome
  ellipse(17.5, -65, 35, 35);
  //chin
  arc(0, -65, 70, 70, 0, PI);
  fill(g);
  //left eye
  ellipse(-14, -65, 8, 8);
  //right eye
  ellipse(14, -65, 8, 8);
  //beak
  quad(0, -58, 4, -51, 0, -44, -4, -51);
  pop();
}



function setup() { 
  createCanvas(500, 220);
} 

function draw() { 
  background(204);
  randomSeed(0);
  for (var i = 35; i < width + 40; i += 40){
  //for (var y = 35; y < height + 55; y += 55){
    var gray = int(random(0, 102));
    var scalar = random(0.25, 1.0);
    puffin(i,110, gray, scalar);
  }
  {
    //puffin(x, y);
  }
  //puffin(110, 210);
  //puffin(180, 165);
  //puffin(250, 110);
  //puffin(320, 165);
  //puffin(390, 210);
}
  
function puffin(x, y, g, s) {
  push();
  translate(x,y);
  //set the scale
  scale(s);
  //set the gray value
  stroke(g);
  strokeWeight(70);
  //body
  line(0, -35, 0, -65);
  noStroke();
  fill(255-g);
  //left eye dome
  ellipse(-17.5, -65, 35, 35);
  //right eye dome
  ellipse(17.5, -65, 35, 35);
  //chin
  arc(0, -65, 70, 70, 0, PI);
  fill(g);
  //left eye
  ellipse(-14, -65, 8, 8);
  //right eye
  ellipse(14, -65, 8, 8);
  //beak
  quad(0, -58, 4, -51, 0, -44, -4, -51);
  pop();
}



function setup() { 
  createCanvas(480, 220);
} 

function draw() { 
  background(204);
  for (var x = 35; x< width + 70; x += 70)
  for (var y = 35; y< height + 55; y += 55)
  {
    puffin(x, y);
  }
  //puffin(110, 210);
  //puffin(180, 165);
  //puffin(250, 110);
  //puffin(320, 165);
  //puffin(390, 210);
}
  
function puffin(x, y) {
  push();
  translate(x,y);
  stroke(0);
  strokeWeight(70);
  line(0, -35, 0, -65);
  noStroke();
  fill(220);
  //left eye dome
  ellipse(-17.5, -65, 35, 35);
  //right eye dome
  ellipse(17.5, -65, 35, 35);
  //chin
  arc(0, -65, 70, 70, 0, PI);
  fill(0);
  //left eye
  ellipse(-14, -65, 8, 8);
  //right eye
  ellipse(14, -65, 8, 8);
  //beak
  quad(0, -58, 4, -51, 0, -44, -4, -51);
  pop();
}var bubble = {
  x: 300,
  y: 200,
  display: function() {
    stroke(100,25,0);
    strokeWeight(2);
    fill(0,100,80);
    ellipse(this.x, this.y, 24, 24);
},
move: function() {
  bubble.x = bubble.x + random(-1,1);
   bubble.y = bubble.y + random(-1,1);
}
}
function setup() { 
  createCanvas(600, 400);
}

function draw() { 
  background(0);
  bubble.move();
  bubble.display();
}



function setup() { 
  createCanvas(480, 220);
} 

function draw() { 
  background(204);
  puffin(110, 210);
  puffin(180, 165);
  puffin(250, 110);
  puffin(320, 165);
  puffin(390, 210);
}
  
function puffin(x, y) {
  push();
  translate(x,y);
  stroke(0);
  strokeWeight(70);
  line(0, -35, 0, -65);
  noStroke();
  fill(220);
  //left eye dome
  ellipse(-17.5, -65, 35, 35);
  //right eye dome
  ellipse(17.5, -65, 35, 35);
  //chin
  arc(0, -65, 70, 70, 0, PI);
  fill(0);
  //left eye
  ellipse(-14, -65, 8, 8);
  //right eye
  ellipse(14, -65, 8, 8);
  //beak
  quad(0, -58, 4, -51, 0, -44, -4, -51);
  pop();
}//var puffin = {
  

function setup() { 
  createCanvas(480, 220);
} 

function draw() { 
  background(204);
  translate(110,165);
  stroke(0);
  strokeWeight(70);
  line(0, -35, 0, -65);
  noStroke();
  fill(220);
  //left eye dome
  ellipse(-17.5, -65, 35, 35);
  //right eye dome
  ellipse(17.5, -65, 35, 35);
  //chin
  arc(0, -65, 70, 70, 0, PI);
  fill(0);
  //left eye
  ellipse(-14, -65, 8, 8);
  //right eye
  ellipse(14, -65, 8, 8);
  //beak
  quad(0, -58, 4, -51, 0, -44, -4, -51);
}var bubble = {
  x: 300,
  y: 200,
  display: function() {
    stroke(100,25,0);
    strokeWeight(2);
    fill(0,100,80);
    ellipse(this.x, this.y, 24, 24);
},
move: function() {
  this.x = this.x + random(-1,1);
   this.y = this.y + random(-1,1);
}
}
function setup() { 
  createCanvas(600, 400);
}

function draw() { 
  background(0);
  bubble.move();
  bubble.display();
}function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(50);

  lollipop(100,100,50);
  lollipop(300,200,150);

}



function lollipop(x, y, diameter) {
  fill(0, 200, 255);
  rect(x - 10, y, 20, 150);

  fill(255, 0, 200);
  ellipse(x, y, diameter, diameter);



}var ball = {
  x: 300,
  y: 200,
  xspeed: 4,
  yspeed: -3
}

function setup() { 
  createCanvas(600, 400);
} 

function draw() { 
  background(0);
  move();
  bounce();
  display();
  
  //ball(ball.x >1, ball.y+1)
  //bounce(ball.x>width, ball.x<0)
}
  function move() {
  ball.x = ball.x + ball.xspeed;
  ball.y = ball.y + ball.yspeed;

 }
  
  function bounce() {
   if (ball.y > height || ball.y < 0) {
    ball.yspeed = ball.yspeed * -1;
   }
     if (ball.x > width || ball.x < 0) {
    ball.xspeed = ball.xspeed * -1;
 }
  }
    
  function display() {
  stroke(155);
  strokeWeight(2);
 fill(255,50,0);
  ellipse(ball.x, ball.y, 24,24);
  }

 

 
var ball = {
  x: 300,
  y: 200,
  xspeed: 4,
  yspeed: -3
}

function setup() { 
  createCanvas(600, 400);
} 

function draw() { 
  background(0);
  move();
  bounce();
  display();
}
  function move() {
  ball.x = ball.x + ball.xspeed;
  ball.y = ball.y + ball.yspeed;

 }
  
  function bounce() {
   if (ball.y > height || ball.y < 0) {
    ball.yspeed = ball.yspeed * -1;
   }
     if (ball.x > width || ball.x < 0) {
    ball.xspeed = ball.xspeed * -1;
 }
  }
    
  function display() {
  stroke(255);
  strokeWeight(4);
 fill(255,50,0);
  ellipse(ball.x, ball.y, 24,24);
  }

 

 
function myFunction(y){
	stroke(255);
  strokeWeight(4);
  noFill();
  ellipse(200,y,40);
}

function setup() { 
  createCanvas(600, 400);
  background(0);
} 

function draw() { 
  //background(0);
  // strokeWeight();
  myFunction(200);
  myFunction(400);
  myFunction(150);

  //stroke(255);
  //strokeWeight(4);
  //noFill();
  
  if (mouseX > 300) {
    fill(255,0,200);
  }  
  //ellipse(300,200,100,100);
  
}var sqSize = 80;
var positionX = 0
var positionY = 0


function setup() { 
  createCanvas(400, 400);
  fill(255);
  positionX = width/2;
  positionY = height/2;
  
  
  
} 

function draw() { 
  background(220);
  
  rectMode(CENTER)
  rect(positionX,positionY,sqSize,sqSize);
  
  if (
    	(mouseX > (width/2 - sqSize/2))   &&
      (mouseX < (height/2 + sqSize/2))  &&
      (mouseY > (width/2 - sqSize/2))   &&
      (mouseY < (height/2 + sqSize/2))  &&
      (mouseIsPressed)
   		){
   	
      fill(160,20,0);  
      positionX = mouseX;
      positionY = mouseY;
       print(positionX,positionY); 
        
        
 			 }else{
        fill(255); 
       }
  
}function setup() { 
  createCanvas(600, 400);
} 

function draw() { 
  background(0);
   
  stroke(255);
  strokeWeight(4);
  noFill();
  
  if (mouseX > 300) {
    fill(255,0,200);
  }  
  ellipse(300,200,100,100);
  
}var sqSize = 80;
var positionX = 0
var positionY = 0


function setup() { 
  createCanvas(400, 400);
  fill(255);
  positionX = width/2;
  positionY = height/2;
  
  
  
} 

function draw() { 
  background(220);
  
  rectMode(CENTER)
  rect(positionX,positionY,sqSize,sqSize);
  print(mouseX,mouseY);
  if (
    	(mouseX > (width/2 - sqSize/2))  &&
      (mouseX < (width/2 + sqSize/2))  &&
      (mouseY > (height/2 - sqSize/2)) &&
      (mouseY < (height/2 + sqSize/2)) &&
      (mouseIsPressed)
   		){
   	
      fill(160,20,0);  
      positionX = mouseX;
      positionY = mouseY;
            
        
         
        
        
 			 }else{
        fill(255); 
       }
  
}var sqSize = 80;
var positionX = 0
var positionY = 0


function setup() { 
  createCanvas(400, 400);
  fill(255);
  positionX = width/2;
  positionY = height/2;
  
  
  
} 

function draw() { 
  background(220);
  
  rectMode(CENTER)
  rect(positionX,positionY,sqSize,sqSize);
  
  if (
    	(mouseX > (width/2 - sqSize/2))  &&
      (mouseX < (width/2 + sqSize/2))  &&
      (mouseY > (height/2 - sqSize/2)) &&
      (mouseY < (height/2 + sqSize/2)) &&
      (mouseIsPressed)
   		){
   	
      fill(160,20,0);  
      positionX = mouseX;
      positionY = mouseY;
       print(positionX,positionY); 
        
        
 			 }else{
        fill(255); 
       }
  
}var sqSize=20;


function setup() { 
  createCanvas(400, 400);
  
  
  
  
} 

function draw() { 
  background(220);
  rectMode(CENTER)
  rect(width/2,height/2,sqSize,sqSize)
  
  
  
  
  
  if (mouseX > (width/2-sqSize/2)){
    print("something) 
  }
  
}var colorWhite = 255;
var colorGrey = 155;
var sqWidth = 50;
var xPos = 0;
var yPos = 0;
var offsetX = 50;


var count = 0;



function setup() { 
  createCanvas(400, 400);
} 


function draw() { 
  background(0);
 // print(count);
  var counter =0;
  
   if (count <= 1){
     
     
   for (var xcanvas = 0; xcanvas < width; xcanvas += sqWidth) {
      counter++;
    	
      for(var ycanvas = 0; ycanvas < height; ycanvas += sqWidth){
      counter++;
    	
      if (counter%2==0){ 
      fill(255);
      quad (xcanvas+offsetX, ycanvas, 
            xcanvas,(ycanvas+sqWidth),
          	(xcanvas+sqWidth),(ycanvas+sqWidth),
            (xcanvas+(sqWidth+offsetX)),ycanvas);
      }
     
        
    	if (counter%2==1){ 
			fill(90);
      quad  (xcanvas+offsetX, ycanvas, 
            xcanvas,(ycanvas+sqWidth),
            (xcanvas+sqWidth),(ycanvas+sqWidth),
          	(xcanvas+(sqWidth+offsetX)),ycanvas);      
      }
        
     
    
     
        
      //rect(xPos ,yPos,sqWidth,sqWidth);
      //rect(xPos-sqWidth, (yPos+sqWidth), sqWidth,sqWidth);
    }
    
    //print(count);
    }
  
  

   
  }
  
  
	}
  
  
	
var circle = {
  x: 0,
  y: 200,
  diameter: 50
};

var r = 218;
var g = 160;
var b = 221;

function setup() { 
  createCanvas(600, 400);
}

function draw() { 
  //background
  background(r, g, b);
 //ellipse
 fill(250, 200, 200);
 ellipse(circle.x, circle.y, circle.diamter,circle.diameter);  
 
circle.x = circle.x + 1;
}
  
var circleX = 0;
var circleY = 0;

function setup() { 
  createCanvas(600, 400);
  
} 

function draw() { 
  background(250,250,100);
  
  //ellipse 
  
  //noStroke();
  fill(250, 200, 200);
  ellipse(circleX,circleY,80,80);
  
  circleX = circleX + 5; 
  circleY = circleY + 5;
  
  
}
  
//function mousePressed(){
  // background(250,250,100);
  //}function setup() { 
  createCanvas(600, 400);
  background(250,250,100);
} 

function draw() { 
  //background(250,250,100);
  
  //ellipse 
  
  noStroke();
  fill(250,200,50);
  ellipse(mouseX,mouseY,25,25);
  
}
  
function mousePressed(){
   background(250,250,100);
  }var colorWhite=255
var colorGrey=155
var sqWidth=50

var count=0



function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(255);
  fiil(colorWhite);
  rect(0, 0, sqWidth, sqWidth);
  
  
}var ball={
  x: 0,
  

function setup()  
  createCanvas(400, 400);
} 

function draw() { 
  bal.x=random(0,width);
  bal.y=random(0,height);
  bal.d=random(10,30);
  
  
  if(mouseIsPressed && mouseX >button.x && mouseX < button.x + button.d &&
  mouseY >button.y && 
  
  background(220);
  
  
  
}var x = 10;

//I'm a Baloon pulling a load
//Michael Fuller
//09/08/2017 my wifes Birthday
//Can a Balloon Pull an object
//p5.js/MacBook Air
//runs on chrome


//setup() runs once, at the beginning
function setup() {

  
  //creatvareCanvas() creates a canvas to draw on
  //measured in pixels
  //createCanvas(width, height);
	createCanvas(500, 400);
  

}

//draw() runs after setup, on a loop, forever
function draw() {
  x=mouseX
  //background(red, green, blue)
  //google rgb color picker
  //values from 0 to 255
  //background is olive color
	background(120, 100, 0);
  
  //bezier
  //x1, y1 and x4,y4 are anchors
  //x2, y2 and x3, y3 are controls
  //bezier(x1, y1, x2, y2, x3, y3, x4, y4);
  noFill();
  
  push();

  
  //rotate(i);
  
  //i = i + 0.01;
  
//   bezier(0, 0, 
//          width/4, -100, 
//          3*width/4, 9*height/10, 
//          width, height);
  
  pop();
  
  //fill(255, 255, 255);
  //triangle(35, 75, 73, 20, 101, 75);
  
  
  fill(0, 60, 100);
	ellipse(x+73, 100, 70, 70);
  
  fill(25, 140, 0);
  ellipse(55, 85, 15, 15);
  line(75, 100, 40, 100);
  fill(125, 40, 12);
	ellipse(x+256, 346, 55, 55);
	ellipse(306, 346, 55, 55);
	ellipse(356, 346, 55, 55);
	ellipse(406, 346, 55, 55);
	fill(125, 40, 12);
  
	line(250, 300, 73, 135);
	rect(250, 300, 155, 55);
	rect(250, 200, 155, 55);
	rect(300, 145, 55, 155);
  //bezier(80, 50, 10, 10, 90, 90, 30, 80);
  fill(100, 10, 10);
  triangle(45, 75, 73, 20, 101, 75);
  
  
  //save the current state of coordinate system
  push();
  
  //neck
  //translate(x, y);
  
  //scale(percentage)
  scale(0.25);
  translate(75*3,135*3);
  fill(0, 60, 100);
  triangle(45, 75+115, 75, 20+115, 101, 75+115);
  
  //restore the current state of coordinate system
  //it works in pairs with push()
  pop();
  
  
  
  push();
  
  //string
  
  translate(-40, 15);
  
  noFill();
  bezier(85-10, 20+200, 10+200, 10+200, 90-10, 90+50, 15+100, 80+50);
  
  pop();
  
  
  
  //bezier(80, 25, 10, 10, 90, 90, 15, 80);
  //noFill();
  //noFill();
  //rotate(PI/3.0);
stroke(255, 102, 0);
//line(85, 20+200, 10, 10+200);
//line(90, 90+50, 15, 80+50);
stroke(0, 0, 0);

}//how much are the shapes moving
var offsetX = 0;
var offsetY = 0;


var stepX = -1;
var stepY = -1;

//I'm a Balloon breaking away from the load
//Michael Fuller
//09/18/2017
//Can a Balloon break away from an object
//p5.js/MacBook Air
//runs on chrome


//setup() runs once, at the beginning
function setup() {

  
  //creatvareCanvas() creates a canvas to draw on
  //measured in pixels
  //createCanvas(width, height);
	createCanvas(500, 400);
  

}

//draw() runs after setup, on a loop, forever
function draw() {
  
  
  //update offsets
  offsetX = offsetX + stepX;
  offsetY = offsetY + stepY;
  
  
  //background(red, green, blue)
  //google rgb color picker
  //values from 0 to 255
  //background is olive color
	background(120, 100, 0);
  
  //bezier
  //x1, y1 and x4,y4 are anchors
  //x2, y2 and x3, y3 are controls
  //bezier(x1, y1, x2, y2, x3, y3, x4, y4);
  noFill();
  
  push();

  
  //rotate(i);
  
  //i = i + 0.01;
  
//   bezier(0, 0, 
//          width/4, -100, 
//          3*width/4, 9*height/10, 
//          width, height);
  
  pop();
  
  //fill(255, 255, 255);
  //triangle(35, 75, 73, 20, 101, 75);
  
  
  fill(0, 60, 100);
	ellipse(offsetX+73, 100, 70, 70);
  
  fill(25, 140, 0);
  ellipse(55, 85, 15, 15);
  line(75, 100, 40, 100);
  fill(125, 40, 12);
	ellipse(offsetX+256, offsetY+346, 55, 55);
	ellipse(306, 346, 55, 55);
	ellipse(356, 346, 55, 55);
	ellipse(406, 346, 55, 55);
	fill(125, 40, 12);
  
	line(250, 300, 73, 135);
	rect(250, 300, 155, 55);
	rect(250, 200, 155, 55);
	rect(300, 145, 55, 155);
  //bezier(80, 50, 10, 10, 90, 90, 30, 80);
  fill(100, 10, 10);
  triangle(45, 75, 73, 20, 101, 75);
  
  
  //save the current state of coordinate system
  push();
  
  //neck
  //translate(x, y);
  
  //scale(percentage)
  scale(0.25);
  translate(75*3,135*3);
  fill(0, 60, 100);
  triangle(45, 75+115, 75, 20+115, 101, 75+115);
  
  //restore the current state of coordinate system
  //it works in pairs with push()
  pop();
  
  
  
  push();
  
  //string
  
  translate(-40, 15);
  
  noFill();
  bezier(85-10, 20+200, 10+200, 10+200, 90-10, 90+50, 15+100, 80+50);
  
  pop();
  
  
  
  //bezier(80, 25, 10, 10, 90, 90, 15, 80);
  //noFill();
  //noFill();
  //rotate(PI/3.0);
stroke(255, 102, 0);
//line(85, 20+200, 10, 10+200);
//line(90, 90+50, 15, 80+50);
stroke(0, 0, 0);

}//how much are the shapes moving
var offsetX = 0;
var offsetY = 0;


var stepX = -1;
var stepY = -1;

//I'm a Balloon lifting a load
//Michael Fuller
//09/18/2017 
//Can a Balloon lift an object
//p5.js/MacBook Air
//runs on chrome


//setup() runs once, at the beginning
function setup() {

  
  //creatvareCanvas() creates a canvas to draw on
  //measured in pixels
  //createCanvas(width, height);
	createCanvas(500, 400);
  

}

//draw() runs after setup, on a loop, forever
function draw() {
  
  
  //update offsets
  offsetX = offsetX + stepX;
  offsetY = offsetY + stepY;
  
  
  //background(red, green, blue)
  //google rgb color picker
  //values from 0 to 255
  //background is olive color
	background(120, 100, 0);
  
  //bezier
  //x1, y1 and x4,y4 are anchors
  //x2, y2 and x3, y3 are controls
  //bezier(x1, y1, x2, y2, x3, y3, x4, y4);
  noFill();
  
  push();

  
  //rotate(i);
  
  //i = i + 0.01;
  
//   bezier(0, 0, 
//          width/4, -100, 
//          3*width/4, 9*height/10, 
//          width, height);
  
  pop();
  
  //fill(255, 255, 255);
  //triangle(35, 75, 73, 20, 101, 75);
  
  
  fill(0, 60, 100);
	ellipse(offsetX+73, offsetY+100, 70, 70);
  
  fill(25, 140, 0);
  ellipse(offsetX+55, offsetY+85, 15, 15);
  line(offsetX+75, offsetY+100, offsetX+40, offsetY+100);
  fill(125, 40, 12);
	ellipse(offsetX+256, offsetY+346, 55, 55);
	ellipse(offsetX+306, offsetY+346, 55, 55);
	ellipse(offsetX+356, offsetY+346, 55, 55);
	ellipse(offsetX+406, offsetY+346, 55, 55);
	fill(125, 40, 12);
  
	line(offsetX+250, offsetY+300, offsetX+73, offsetY+135);
	rect(offsetX+250, offsetY+300, 155, 55);
	rect(offsetX+250, offsetY+200, 155, 55);
	rect(offsetX+300, offsetY+145, 55, 155);
  //bezier(80, 50, 10, 10, 90, 90, 30, 80);
  fill(100, 10, 10);
  triangle(offsetX+45, offsetY+75, offsetX+73, offsetY+20, offsetX+101, offsetY+75);
  
  
  //save the current state of coordinate system
  push();
  
  //neck
  //translate(x, y);
  
  //scale(percentage)
  scale(0.25);
  translate(75*3,135*3);
  fill(0, 60, 100);
  triangle(offsetX+45, offsetY+75+115, offsetX+75, offsetY+20+115, offsetX+101, offsetY+75+115);
  
  //restore the current state of coordinate system
  //it works in pairs with push()
  pop();
  
  
  
  push();
  
  //string
  
  translate(-40, 15);
  
  noFill();
  bezier(offsetX+85-10, offsetY+20+200, 10+200, 10+200, 90-10, 90+50, offsetX+15+100, offsetY+80+50);
  
  pop();
  
  
  
  //bezier(80, 25, 10, 10, 90, 90, 15, 80);
  //noFill();
  //noFill();
  //rotate(PI/3.0);
stroke(255, 102, 0);
//line(85, 20+200, 10, 10+200);
//line(90, 90+50, 15, 80+50);
stroke(0, 0, 0);

}var x = 10;

//I'm a Balloon pulling a load
//Michael Fuller
//09/18/2017 
//Can a Balloon Pull an object
//p5.js/MacBook Air
//runs on chrome


//setup() runs once, at the beginning
function setup() {

  
  //creatvareCanvas() creates a canvas to draw on
  //measured in pixels
  //createCanvas(width, height);
	createCanvas(500, 400);
  

}

//draw() runs after setup, on a loop, forever
function draw() {
  x=-mouseX
  //background(red, green, blue)
  //google rgb color picker
  //values from 0 to 255
  //background is olive color
	background(120, 100, 0);
  
  //bezier
  //x1, y1 and x4,y4 are anchors
  //x2, y2 and x3, y3 are controls
  //bezier(x1, y1, x2, y2, x3, y3, x4, y4);
  noFill();
  
  push();

  
  //rotate(i);
  
  //i = i + 0.01;
  
//   bezier(0, 0, 
//          width/4, -100, 
//          3*width/4, 9*height/10, 
//          width, height);
  
  pop();
  
  //fill(255, 255, 255);
  //triangle(35, 75, 73, 20, 101, 75);
  
  //Object
  
  //fill(0, 60, 100);
	//ellipse(x+73, 100, 70, 70);
  
  //fill(25, 140, 0);
  //ellipse(x+55, 85, 15, 15);
  //line(x+75, 100, x+40, 100);
  fill(125, 40, 12);
	ellipse(x+256, 346, 55, 55);
	ellipse(x+306, 346, 55, 55);
	ellipse(x+356, 346, 55, 55);
	ellipse(x+406, 346, 55, 55);
	
 //Balloon
  
  fill(0, 60, 100);
	ellipse(x+73, 100, 70, 70);
  
  fill(125, 40, 12);
  
  line(x+75, 100, x+40, 100);
	line(x+250, 300, x+73, 135);
	rect(x+250, 300, 155, 55);
	rect(x+250, 200, 155, 55);
	rect(x+300, 145, 55, 155);
  //bezier(80, 50, 10, 10, 90, 90, 30, 80);
  fill(100, 10, 10);
  triangle(x+45, 75, x+73, 20, x+101, 75);
  
  fill(25, 140, 0);
  ellipse(x+55, 85, 15, 15);
 
  
  //save the current state of coordinate system
  push();
  
  //neck
  //translate(x, y);
  //x=10
  //scale(percentage)
  scale(0.25);
  translate(75*3,135*3);
  fill(0, 60, 100);
  triangle(x+45, 75+115, x+75, 20+115, x+101, 75+115);
  
  //restore the current state of coordinate system
  //it works in pairs with push()
  pop();
  
  
  
  push();
  
  //string
  
  translate(-40, 15);
  //x=10
  noFill();
  bezier(x+85-10, 20+200, x+10+200, 10+200, 90-10, 90+50, x+15+100, 80+50);
  
  pop();
  
  
  
  //bezier(80, 25, 10, 10, 90, 90, 15, 80);
  //noFill();
  //noFill();
  //rotate(PI/3.0);
stroke(255, 102, 0);
//line(85, 20+200, 10, 10+200);
//line(90, 90+50, 15, 80+50);
stroke(0, 0, 0);

}var x = 10;

//I'm a Baloon pulling a load
//Michael Fuller
//09/8/2017 my wifes Birthday
//Can a Balloon Pull an object
//p5.js/MacBook Air
//runs on chrome


//setup() runs once, at the beginning
function setup() {

  
  //creatvareCanvas() creates a canvas to draw on
  //measured in pixels
  //createCanvas(width, height);
	createCanvas(500, 400);
  

}

//draw() runs after setup, on a loop, forever
function draw() {
  x=mouseX
  //background(red, green, blue)
  //google rgb color picker
  //values from 0 to 255
  //background is olive color
	background(120, 100, 0);
  
  //bezier
  //x1, y1 and x4,y4 are anchors
  //x2, y2 and x3, y3 are controls
  //bezier(x1, y1, x2, y2, x3, y3, x4, y4);
  noFill();
  
  push();

  
  //rotate(i);
  
  //i = i + 0.01;
  
//   bezier(0, 0, 
//          width/4, -100, 
//          3*width/4, 9*height/10, 
//          width, height);
  
  pop();
  
  //fill(255, 255, 255);
  //triangle(35, 75, 73, 20, 101, 75);
  
  
  fill(0, 60, 100);
	ellipse(x+73, 100, 70, 70);
  
  fill(25, 140, 0);
  ellipse(55, 85, 15, 15);
  line(75, 100, 40, 100);
  fill(125, 40, 12);
	ellipse(x+256, 346, 55, 55);
	ellipse(306, 346, 55, 55);
	ellipse(356, 346, 55, 55);
	ellipse(406, 346, 55, 55);
	fill(125, 40, 12);
  
	line(250, 300, 73, 135);
	rect(250, 300, 155, 55);
	rect(250, 200, 155, 55);
	rect(300, 145, 55, 155);
  //bezier(80, 50, 10, 10, 90, 90, 30, 80);
  fill(100, 10, 10);
  triangle(45, 75, 73, 20, 101, 75);
  
  
  //save the current state of coordinate system
  push();
  
  //neck
  //translate(x, y);
  
  //scale(percentage)
  scale(0.25);
  translate(75*3,135*3);
  fill(0, 60, 100);
  triangle(45, 75+115, 75, 20+115, 101, 75+115);
  
  //restore the current state of coordinate system
  //it works in pairs with push()
  pop();
  
  
  
  push();
  
  //string
  
  translate(-40, 15);
  
  noFill();
  bezier(85-10, 20+200, 10+200, 10+200, 90-10, 90+50, 15+100, 80+50);
  
  pop();
  
  
  
  //bezier(80, 25, 10, 10, 90, 90, 15, 80);
  //noFill();
  //noFill();
  //rotate(PI/3.0);
stroke(255, 102, 0);
//line(85, 20+200, 10, 10+200);
//line(90, 90+50, 15, 80+50);
stroke(0, 0, 0);

}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}var x = 10;

//I'm a Baloon pulling a load
//Michael Fuller
//09/08/2017 my wifes Birthday
//Can a Balloon Pull an object
//p5.js/MacBook Air
//runs on chrome


//setup() runs once, at the beginning
function setup() {

  
  //creatvareCanvas() creates a canvas to draw on
  //measured in pixels
  //createCanvas(width, height);
	createCanvas(500, 400);
  

}

//draw() runs after setup, on a loop, forever
function draw() {
  x=mouseX
  //background(red, green, blue)
  //google rgb color picker
  //values from 0 to 255
  //background is olive color
	background(120, 100, 0);
  
  //bezier
  //x1, y1 and x4,y4 are anchors
  //x2, y2 and x3, y3 are controls
  //bezier(x1, y1, x2, y2, x3, y3, x4, y4);
  noFill();
  
  push();

  
  //rotate(i);
  
  //i = i + 0.01;
  
//   bezier(0, 0, 
//          width/4, -100, 
//          3*width/4, 9*height/10, 
//          width, height);
  
  pop();
  
  //fill(255, 255, 255);
  //triangle(35, 75, 73, 20, 101, 75);
  
  
  fill(0, 60, 100);
	ellipse(x+73, 100, 70, 70);
  
  fill(25, 140, 0);
  ellipse(55, 85, 15, 15);
  line(75, 100, 40, 100);
  fill(125, 40, 12);
	ellipse(x+256, 346, 55, 55);
	ellipse(306, 346, 55, 55);
	ellipse(356, 346, 55, 55);
	ellipse(406, 346, 55, 55);
	fill(125, 40, 12);
  
	line(250, 300, 73, 135);
	rect(250, 300, 155, 55);
	rect(250, 200, 155, 55);
	rect(300, 145, 55, 155);
  //bezier(80, 50, 10, 10, 90, 90, 30, 80);
  fill(100, 10, 10);
  triangle(45, 75, 73, 20, 101, 75);
  
  
  //save the current state of coordinate system
  push();
  
  //neck
  //translate(x, y);
  
  //scale(percentage)
  scale(0.25);
  translate(75*3,135*3);
  fill(0, 60, 100);
  triangle(45, 75+115, 75, 20+115, 101, 75+115);
  
  //restore the current state of coordinate system
  //it works in pairs with push()
  pop();
  
  
  
  push();
  
  //string
  
  translate(-40, 15);
  
  noFill();
  bezier(85-10, 20+200, 10+200, 10+200, 90-10, 90+50, 15+100, 80+50);
  
  pop();
  
  
  
  //bezier(80, 25, 10, 10, 90, 90, 15, 80);
  //noFill();
  //noFill();
  //rotate(PI/3.0);
stroke(255, 102, 0);
//line(85, 20+200, 10, 10+200);
//line(90, 90+50, 15, 80+50);
stroke(0, 0, 0);

}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(255,128,255);
  line(10, 10, 100, 100);
  //fill(0,255,0);
  nofill
  ellipse(100,100,40);
}

/* everything is a commentfunction setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(255,128,255);
  line(10, 10, 100, 100);
  //fill(0,255,0);
  nofill
  ellipse(100,100,40);
}

/* everything is a commentfunction setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(255,128,255);
  line(10, 10, 100, 100);
  fill(0,255,0);
  nofill
  ellipse(100,100,40);
}

/* everything is a commentvar xposition=200;
var yposition=200;


function setup() { 
  rectMode(CENTER);
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  rect(xposition,yposition,200,200);
}var xposition=200;
var yposition=200;

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  triangle(120,60,360,60,xposition,yposition);
  rect(xposition,yposition,40,40);
  
  
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}function setup() { 
  createCanvas(600, 400);
  
} 

function draw() { 
	

	background(0,255,255);
	
	
	strokeWeight(40);
	stroke(255,0,0);
	line(0,0,600,400);
	
	
	strokeWeight(0);
	
	ellipse(300, 200, 300, 220);
	
	
	fill(0,0,153);
	
	rect(410,160,40,40);
	
	strokeWeight(0);
	
	fill(0,204,0);
	
	
}function setup() { 
  createCanvas(600, 400);
  
} 

function draw() { 
  
  background(0,255,255);
	ellipse(300, 200, 300, 220);
	fill(0,204,0);function setup() { 
  createCanvas(600, 400);
  
} 

function draw() { 
  
  background(0,255,255);
	ellipse(300, 200, 300, 220);
	fill(0,204,0);
	
	
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
	ellipse(200, 200, 200, 200);
	
	
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
	ellipse(200, 200, 200, 200);
	
	
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  
  background(200);
	ellipse(200, 200, 200, 200);
	fill(0,255,255);
	
	
}