var kinectron;

function preload() {
	img = loadImage('centraliaparliament.jpg');
	}

function setup() {
  createCanvas(960, 540);
  background(0);
  noStroke();
  kinectron = new Kinectron('172.16.224.110');
  kinectron.makeConnection();
  kinectron.startKey(gotData);
}

function draw() {
 // background(220);
}

function gotData(data){
  loadImage(data.src,gotImage);
  //this is a callback that triggers another callback
}

function gotImage(img){
  image(img,0,0);
}

let serial; // variable to hold an instance of the serialport library
let portName = '3 /dev/cu.usbmodem1411';
let inString; // for incoming serial data
let inData;

function setup() {
  createCanvas(400, 400);
 
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  //serial.on('list', printList);  // set a callback function for the serialport list event
  //serial.on('connected', serverConnected); // callback for connecting to the server
  //serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  //serial.on('error', serialError);    // callback for errors
  // serial.on('close', portClose);      // callback for the port closing

  serial.list(); // list the serial ports
  function printList(portList) {
    // portList is an array of serial port names
    for (var i = 0; i < portList.length; i++) {
      // Display the list the console:
      console.log(i + " " + portList[i]);
    }
  }
  serial.open(portName); // open a serial port
}


function draw() {
   background(random() * 255, 0, random() * 255, 25);
  stroke(255, random() * 255, 0);
  noFill();
  ellipse(width/2, height/2, map(inData, 0, 255, 0, 400), map(inData, 0, 255, 0, 400));
}

function serverConnected() {
  console.log('connected to server.');
}

function portOpen() {
  console.log('the serial port opened.')
}

function serialEvent() {
  inString = serial.readLine();
  if (inString.length > 0) {
    // convert it to a number:
    inData = Number(inString);
  }
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}let vid1;
let vid2;
let vid3;
let flipped = false;

let currentVideo = 0;
var videos = [];

function preload() {
  vid1 = createVideo("A005_C052_0925BL_001.mp4");
  vid2 = createVideo("A002_C052_0922T7_001.mp4");
  vid3 = createVideo("A005_C049_09253L_001.mp4");
}

function setup() {
  createCanvas(400, 1000);
  videos = [vid1, vid2, vid3];
  videos[currentVideo].play();
  console.log("hi");
}

function mousePressed() {
  videos[currentVideo].hide();
  currentVideo++
  if (currentVideo == 3) currentVideo = 0;
  videos[currentVideo].play();
  console.log(currentVideo);
}

function keyPressed(){
  if(keyCode === UP_ARROW) {
  	if(flipped) vid2.elt.style.transform = "rotate(0deg)";
 		else vid2.elt.style.transform = "rotate(180deg)";
  
  flipped = !flipped;
  }
}

function keyPressed(){
 if(keyCode === LEFT_ARROW){
   vid2.speed(-1);
   if(vid2.time() < 0.1) vid2.time(4.3);
 } else vid2.speed(1);
  
}var vid;
let flipped = false;
function setup() {
  createCanvas(0, 0);
  vid = createVideo("A005_C052_0925BL_001.mp4");
  vid.loop()
  //vid.speed(-1);
}


function draw(){
 if(mouseIsPressed){
   console.log('HERE')
   vid.speed(-1);
   if(vid.time() < 0.1) vid.time(4.3);
 } else vid.speed(1);
  
}

function keyPressed(){
  if(keyCode === UP_ARROW) {
  	if(flipped) vid.elt.style.transform = "rotate(0deg)"
 		else vid.elt.style.transform = "rotate(180deg)";
  
  flipped = !flipped;
  }
}

var vid;
let flipped = false;
function setup() {
  createCanvas(0, 0);
  vid = createVideo("A005_C052_0925BL_001.mp4");
  vid.loop()
  //vid.speed(-1);
}


function draw(){
 if(mouseIsPressed){
   vid.speed(-1);
   if(vid.time() < 0.1) vid.time(4.3);
 } else vid.speed(1);
  
}

function keyPressed(){
  if(flipped) vid.elt.style.transform = "rotate(0deg)"
  else vid.elt.style.transform = "rotate(180deg)";
  
  flipped = !flipped;

}var vid;
let flipped = false;
function setup() {
  createCanvas(0, 0);
  vid = createVideo("A005_C052_0925BL_001.mp4");
  vid.loop()
  //vid.speed(-1);
}


function draw(){
 if(mouseIsPressed){
   vid.speed(-1);
   if(vid.time() < 0.1) vid.time(4.3);
 } else vid.speed(1);
  
}

function keyPressed(){
  if(flipped) vid.elt.style.transform = "rotate(0deg)"
  else vid.elt.style.transform = "rotate(180deg)";
  
  flipped = !flipped;

}let vid1;
let vid2;
let vid3;

let currentVideo = 0;
var videos = [];

function preload(){
  vid1 = createVideo("A005_C052_0925BL_001.mp4");
  vid2 = createVideo("A002_C052_0922T7_001.mp4");
  vid3 = createVideo("A005_C049_09253L_001.mp4");


}

function setup() {
  createCanvas(400, 1000);
  //vid1.size(400, 300);
  //vid2.size(400, 300);
  //vid3.size(400, 300);
  videos = [vid1, vid2, vid3];
  //for(let i = 0; i < 3; i++) videos[i].hide();
   //currentVideo.size(400, 300);
//   for (let i = 0; i < 3; i++) {
//    vid[i].play();
//    if(i == 0)vid[2].hide();
//    else vid[i-1].hide();
// }
//videos[currentVideo].show();
videos[currentVideo].play();
console.log("hi");
}

function mousePressed() {
  videos[currentVideo].hide();
  currentVideo++
if(currentVideo == 3)currentVideo = 0;
videos[currentVideo].play();
console.log(currentVideo);
}
let vid1;

//let playing = false;
let completion;
function setup() {
  createCanvas(400, 100);
  vid1 = createVideo("A005_C052_0925BL_001.mp4");
  vid1.size(400, 300);
 
   vid1.play();
   vid1.time((mouseX/width) * vid1.duration());
   //playing = true;
  
}
function draw() {
  background(50);
  completion = vid.time() / vid.duration();
  ellipse(completion*width, 50, 20, 20);
}
1
function mousePressed() {

}let vid1;
let vid2;
let vid3;
//let playing = false;
let completion;
function setup() {
  createCanvas(400, 100);
  vid1 = createVideo("A005_C052_0925BL_001.mp4");
  vid2 = createVideo("A002_C052_0922T7_001.mp4");
//  vid3 = createVideo("A005_C049_09253L_001.mp4");
  vid1.size(400, 300);
  vid2.size(400, 300);
  
   vid1.play();
   vid2.hide();
   vid1.time((mouseX/width) * vid1.duration());
   //playing = true;
  
}
function draw() {
  background(50);
  completion = vid.time() / vid.duration();
  ellipse(completion*width, 50, 20, 20);
}
1
function mousePressed() {
//  if (!playing) {
//  }
 // else {
  vid1.hide();
  vid2.show();
  vid2.play();
 //   playing = false;
//  }
}let vid;
//let playing = false;
let completion;
function setup() {
  createCanvas(400, 100);
  vid = createVideo("A005_C052_0925BL_001.mp4");
  vid.size(400, 300);
  
   vid.play();
   vid.time((mouseX/width) * vid.duration());
   //playing = true;
  
}
function draw() {
  background(50);
  completion = vid.time() / vid.duration();
  ellipse(completion*width, 50, 20, 20);
}
1
function mouseIsPressed() {
//  if (!playing) {
//  }
 // else {
//vid.pause();
  vid.speed(-1);
 //   playing = false;
//  }
}var vid;
function setup() {
  createCanvas(0, 0);
  vid = createVideo("A005_C052_0925BL_001.mp4");
  vid.loop()
  vid.speed(3);
}



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
  stroke(0,255,0);
  // For single touch mouseX and mouseY work just fine
  line(mouseX, mouseY, pmouseX, pmouseY);

  // This prevents dragging screen around
  return false;
}

let video;
let bg;

function setup() { 
  createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  
  //bg = createImage(width, height);
	
} 

function draw() { 
  background(220);
  
  
  if( bg ) {
  	//image(bg, mouseX, mouseY);
    let buffer = createImage(width, height);
    buffer = video.get();
    buffer.blend(bg, 0,0, width, height, 0,0, width,height, DIFFERENCE );

    loadPixels();
    for (var x = 0; x < buffer.width; x++) {
    	for (var y = 0; y < buffer.height; y++ ) {
      	// Calculate the 1D location from a 2D grid

      	var loc = (x + y*buffer.width)*4;
        var pixloc = (y*width + x)*4;
      	// Get the R,G,B values from image
      	var r,g,b;
      	r = buffer.pixels[loc];
				r*=5;
        r=constrain(r,0,255);
        
	      pixels[pixloc] = r;
 	    	pixels[pixloc+1] = r;
 	  	  pixels[pixloc+2] = r;
 		    pixels[pixloc+3] = 255;

    	}
  	}
  	updatePixels();
    
  
//	image( buffer, 0,0 );
  }
  else
  	image(video,0,0);
}


function mousePressed() {
  bg = video.get();
	video = createCapture(VIDEO);
  video.hide();

	print("lala");

	video = createCapture(VIDEO);
  video.hide();
  
}


var video;
var bg;

function setup() { 
  createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  
  //bg = createImage(width, height);
	
} 

function draw() { 
  background(220);
  
  
  if( bg ) {
  	//image(bg, mouseX, mouseY);
    let buffer = createImage(width, height);
    buffer = video.get();
    buffer.blend(bg, 0,0, width, height, 0,0, width,height,  );
    image( buffer, 0,0 );
  }
  else
  	image(video,0,0);
}


function mousePressed() {
  bg = video.get();
	video = createCapture(VIDEO);
  video.hide();

	print("lala");

	video = createCapture(VIDEO);
  video.hide();
  
}

let video;
let bg;

function setup() { 
  createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  //bg = createImage(width, height);
} 

function draw() { 
  background(220);
  
  if( bg ) {
  	//image(bg, mouseX, mouseY);
    let buffer = createImage(width, height);
    buffer = video.get();
    buffer.blend(bg, 0,0, width, height, 0,0, width,height, DIFFERENCE );
    image( buffer, 0,0 );
  }
  else
  	image(video,0,0);
}


function mousePressed() {
  bg = video.get();
	video = createCapture(VIDEO);
  video.hide();

	print("lala");

	video = createCapture(VIDEO);
  video.hide();
  
}


var video;
var bg;

function setup() { 
  createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  
  
  //bg = createImage(width, height);
	
} 

function draw() { 
  background(220);
  
  
  if( bg ) {
  	//image(bg, mouseX, mouseY);
    bg.blend(video, 0,0, width, height, 0,0, width,height, DIFFERENCE );
    image( bg, 0,0 );
  }
  else
  	image(video,0,0);
}


function keyPressed() {
  bg = video.get();
	video = createCapture(VIDEO);
  video.hide();

	print("lala");

}

let video;
let bg;

function setup() { 
  createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  //bg = createImage(width, height);
	} 

function draw() { 
  background(220);
  
  if( bg ) {
  	//image(bg, mouseX, mouseY);
    bg.blend(video, 0,0, width, height, 0,0, width,height, ADD );
    image( bg, 0,0 );
  }
  else
  	image(video,0,0);
}

function keyPressed() {
  bg = video.get();
	video = createCapture(VIDEO);
  video.hide();

	print("lala");

}

let img;
let x, y;

function setup() {
  createCanvas(640, 480);
  x = width / 2;
  y = height / 2;
  background(0);
  img = createCapture(VIDEO);
  //img.hide();
}

function draw() {
  //image(img,0,0);

  let col = img.get(x, y);
  col[3] = 100;
  //console.log(col);
  fill(col);
  noStroke();
  ellipse(x, y, 10);
  ellipse(x, y, 10);
  ellipse(x, y, 10);
  ellipse(x, y, 10);
	ellipse(x, y, 20);
  ellipse(x, y, 20);
  ellipse(x, y, 20);
  ellipse(x, y, 20);
  
  x += random(-70, 70);
  y += random(-70, 70);
  x = constrain(x, 0, width);
  y = constrain(y, 0, height);



}let data;

function preload() {
  data = loadJSON('https://raw.githubusercontent.com/dariusk/corpora/master/data/foods/iba_cocktails.json')
}

function setup() { 
  createCanvas(400, 400);
  background(0);
  createP(data.description);
  createA(data.source,'source');
  for (let i = 0; i < data.cocktails.length; i++) {
    fill(255, 50, 150);
    textAlign(CENTER);
    text(data.cocktails[i], random(width), random(height));
  }
  console.log(data);
} 

/* Danny Rozin
Introduction to Physical Computing
ITP
/************ make sure you are in https mode for capture to work***************

This sketch will send one binary byte from P5 to arduino
See arduino code in bottom, have LED connected to pin 3

move mouse over live image to send pixel brightness and dim LED*/

var serial; // variable to hold an instance of the serialport library
var fromSerial = 0; //variable to hold the data
var Capture;


function setup() {
  createCanvas(320, 240);
  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in	
  serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem1421"); // open a port
  
  Capture= createCapture(VIDEO);
  Capture.size(320, 240);
  Capture.hide();

}

function draw() {
 image(Capture,0,0);
  var c = get(mouseX, mouseY);
  var b = int(  brightness(c)   );
  serial.write(b);
}

// get the list of ports:
function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    println(i + " " + portList[i]);
  }
}

function serialEvent() {
  // this is called when data is recieved	
}

/*  
// Arduino Code 
void setup() {
  Serial.begin(9600);
}
void loop() {
  if(Serial.available()){
  byte byteFromSerial = Serial.read();
  analogWrite(3,byteFromSerial);
  }
}
*//* Danny Rozin
Introduction to Physical Computing
ITP

This sketch will send one binary byte from arduino to P5
See arduino code in bottom, have pot connected to A0*/

var serial; // variable to hold an instance of the serialport library
var fromSerial = 0; //variable to hold the data
var posX=0,posY=0, step = 10;


function setup() {
	createCanvas(320, 240);
	serial = new p5.SerialPort(); // make a new instance of  serialport librar	
	serial.on('list', printList); // callback function for serialport list event
	serial.on('data', serialEvent); // callback for new data coming in	
	serial.list(); // list the serial ports
	serial.open("/dev/cu.usbmodem1421"); // open a port

}

function draw() {
posX+=step;
  if (posX> width){
    posX= 0;
    posY+=step;
    if (posY> height)posY=0;
  }
  fill(fromSerial);
  rect(posX,posY, step, step);
}

// get the list of ports:
function printList(portList) {
	for (var i = 0; i < portList.length; i++) {
		// Display the list the console:
		println(i + " " + portList[i]);
	}
}

function serialEvent() {
	// this is called when data is recieved, data will then live in fromSerial	
	fromSerial = serial.read();
}

/*  
// Arduino Code 
void setup() {
  Serial.begin(9600);
}
void loop() {
  int analogValue = analogRead(A0);
  byte byteToSend = map (analogValue, 0, 1023, 0, 255);
  Serial.write(byteToSend);
  delay(50);
}
*/var d = 150;

function setup() { 
  createCanvas(500, 400);
  
} 


function draw() { 
  background(0, 60, 100);
  
  push();
  //translate(0, (millis() / 20) % 25);
  translate(0, d);
  translate(165, 0);
  drawWing();
  translate(width-350,0);
  scale(-1, 1);
  drawWing();
  pop();

}

function drawWing() {
fill(200, 40, 200);// feathers
  arc(150, 105, 200, 10, 5, PI/2); 
  
  fill(200, 140, 200); // second layer of feathers
  arc(200, 100, 200, 5, 5, PI/1); 

  fill(200, 40, 200);// feathers
  arc(140, 115, 200, 10, 5, PI/2); 
  
  fill(200, 140, 200); // second layer of feathers
  arc(190, 110, 160, 5, 5, PI/1); 
 
  fill(200, 40, 200);// feathers
  arc(130, 125, 200, 10, 5, PI/2); 
  
  fill(200, 140, 200); // second layer of feathers
  arc(180, 120, 150, 5, 5, PI/1); 
  
  fill(200, 40, 200);// feathers
  arc(120, 135, 200, 10, 5, PI/2); 
  
  fill(200, 140, 200); // second layer of feathers
  arc(170, 130, 140, 5, 5, PI/1); 
  
    fill(200, 40, 200);// feathers
  arc(110, 145, 200, 10, 5, PI/2); 
  
  fill(200, 140, 200); // second layer of feathers
  arc(160, 140, 120, 5, 5, PI/1); 
  
  fill(200, 40, 200);// feathers
  arc(100, 155, 200, 10, 5, PI/2); 
  
  fill(200, 140, 200); // second layer of feathers
  arc(150, 150, 100, 5, 5, PI/1); 
  
    fill(200, 40, 200);// feathers
  arc(100, 165, 160, 10, 5, PI/2); 
  
  fill(200, 140, 200); // second layer of feathers
  arc(140, 160, 80, 5, 5, PI/1); 
  
  
  /////
  
  fill(200, 70, 20); // bottom left feathers
  arc(100, 170,50, 50, 1, PI/1.8);
  fill(200, 70, 20);
  arc(100, 160,50, 50, 1, PI/1.8);
  fill(200, 70, 20);
  arc(100, 150,50, 50, 1, PI/1.8);
  
  
  //////
  
  
  fill(200, 70, 20); // bottom muscle
  arc(100, 100, 80, 200, 0, PI/2);
  
  
  //////
  
  fill(200, 20, 20);
  arc(100, 100, 200, 50, 0, PI/2); //top muscle

}function setup() { 
  createCanvas(400, 400);
} 


function draw() { 
  background(220);
  
  drawWing(); 

}

function drawWing() {
fill(200, 40, 200);// feathers
  arc(150, 105, 200, 10, 5, PI/2); 
  
  fill(200, 140, 200); // second layer of feathers
  arc(200, 100, 200, 5, 5, PI/1); 

  fill(200, 40, 200);// feathers
  arc(140, 115, 200, 10, 5, PI/2); 
  
  fill(200, 140, 200); // second layer of feathers
  arc(190, 110, 160, 5, 5, PI/1); 
 
  fill(200, 40, 200);// feathers
  arc(130, 125, 200, 10, 5, PI/2); 
  
  fill(200, 140, 200); // second layer of feathers
  arc(180, 120, 150, 5, 5, PI/1); 
  
  fill(200, 40, 200);// feathers
  arc(120, 135, 200, 10, 5, PI/2); 
  
  fill(200, 140, 200); // second layer of feathers
  arc(170, 130, 140, 5, 5, PI/1); 
  
    fill(200, 40, 200);// feathers
  arc(110, 145, 200, 10, 5, PI/2); 
  
  fill(200, 140, 200); // second layer of feathers
  arc(160, 140, 120, 5, 5, PI/1); 
  
  fill(200, 40, 200);// feathers
  arc(100, 155, 200, 10, 5, PI/2); 
  
  fill(200, 140, 200); // second layer of feathers
  arc(150, 150, 100, 5, 5, PI/1); 
  
    fill(200, 40, 200);// feathers
  arc(100, 165, 160, 10, 5, PI/2); 
  
  fill(200, 140, 200); // second layer of feathers
  arc(140, 160, 80, 5, 5, PI/1); 
  
  
  /////
  
  fill(200, 70, 20); // bottom left feathers
  arc(100, 170,50, 50, 1, PI/1.8);
  fill(200, 70, 20);
  arc(100, 160,50, 50, 1, PI/1.8);
  fill(200, 70, 20);
  arc(100, 150,50, 50, 1, PI/1.8);
  
  
  //////
  
  
  fill(200, 70, 20); // bottom muscle
  arc(100, 100, 80, 200, 0, PI/2);
  
  
  //////
  
  fill(200, 20, 20);
  arc(100, 100, 200, 50, 0, PI/2); //top muscle

}function setup() { 
  createCanvas(400, 400);
} 


function draw() { 
  background(220);
  
  fill(200, 40, 200);// feathers
  arc(150, 105, 200, 10, 5, PI/2); 
  
  fill(200, 140, 200); // second layer of feathers
  arc(200, 100, 200, 5, 5, PI/1); 

  fill(200, 40, 200);// feathers
  arc(140, 115, 200, 10, 5, PI/2); 
  
  fill(200, 140, 200); // second layer of feathers
  arc(190, 110, 160, 5, 5, PI/1); 
 
  fill(200, 40, 200);// feathers
  arc(130, 125, 200, 10, 5, PI/2); 
  
  fill(200, 140, 200); // second layer of feathers
  arc(180, 120, 150, 5, 5, PI/1); 
  
  fill(200, 40, 200);// feathers
  arc(120, 135, 200, 10, 5, PI/2); 
  
  fill(200, 140, 200); // second layer of feathers
  arc(170, 130, 140, 5, 5, PI/1); 
  
    fill(200, 40, 200);// feathers
  arc(110, 145, 200, 10, 5, PI/2); 
  
  fill(200, 140, 200); // second layer of feathers
  arc(160, 140, 120, 5, 5, PI/1); 
  
  fill(200, 40, 200);// feathers
  arc(100, 155, 200, 10, 5, PI/2); 
  
  fill(200, 140, 200); // second layer of feathers
  arc(150, 150, 100, 5, 5, PI/1); 
  
    fill(200, 40, 200);// feathers
  arc(100, 165, 160, 10, 5, PI/2); 
  
  fill(200, 140, 200); // second layer of feathers
  arc(140, 160, 80, 5, 5, PI/1); 
  
  
  /////
  
  fill(200, 70, 20); // bottom left feathers
  arc(100, 170,50, 50, 1, PI/1.8);
  fill(200, 70, 20);
  arc(100, 160,50, 50, 1, PI/1.8);
  fill(200, 70, 20);
  arc(100, 150,50, 50, 1, PI/1.8);
  
  
  //////
  
  
  fill(200, 70, 20); // bottom muscle
  arc(100, 100, 80, 200, 0, PI/2);
  
  
  //////
  
  fill(200, 20, 20);
  arc(100, 100, 200, 50, 0, PI/2); //top muscle
 

}
let nums = [100, 25, 46, 72]

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(0);
  
  for (let i = 0; i < 4; i++) {
    stroke(255);
    noFill();
    ellipse(i*100+100, 200, nums[i], nums[i]);
            }
}let words = ["rainbow", "heart", "purple", "friendship", "love"];
let index = 0;

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(0);
  
  fill(255);
  textSize(32);
  text(words[index], 12, 200);
}

function mousePressed(){
  index = index +1;
  
  if (index == words.length) {
    index = 0;
  }
}let bubbles = [];

function setup() { 
  createCanvas(400, 400);
 // for (let i = 0; i < 10; i++) {
 // let x = 20 + 100 * i;
	//bubbles[i] = new Bubble(x, 200, 40);
  //}
} 

function mouseDragged() {
  let r = random(10, 50);
  let b = new Bubble(mouseX, mouseY, r);
  bubbles.push(b);
}

function draw() { 
  background(0);
	for (let i = 0; i < bubbles.length; i++) {
   bubbles[i].move();
    bubbles[i].show();
  }
}

class Bubble {
  constructor(tempX, tempY, tempR) {
    this.x = tempX;
    this.y = tempY;
    this.r = tempR;
  }
  move() {
  this.x = this.x + random(-5,5);
  this.y = this.y + random(-5,5);
  }
  show() {
  stroke(255);
  strokeWeight(4);
  noFill();
  ellipse(this.x, this.y, this.r, this.r);
  }
}let serial; // variable to hold an instance of the serialport library
let portName = '3 /dev/cu.usbmodem1411';
let inString; // for incoming serial data
let inData;

function setup() {
  createCanvas(400, 400);
 
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  //serial.on('list', printList);  // set a callback function for the serialport list event
  //serial.on('connected', serverConnected); // callback for connecting to the server
  //serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  //serial.on('error', serialError);    // callback for errors
  // serial.on('close', portClose);      // callback for the port closing

  serial.list(); // list the serial ports
  function printList(portList) {
    // portList is an array of serial port names
    for (var i = 0; i < portList.length; i++) {
      // Display the list the console:
      console.log(i + " " + portList[i]);
    }
  }
  serial.open(portName); // open a serial port
}


function draw() {
   background(random() * 255, 0, random() * 255, 25);
  stroke(255, random() * 255, 0);
  noFill();
  ellipse(width/2, height/2, map(inData, 0, 255, 0, 400), map(inData, 0, 255, 0, 400));
}

function serverConnected() {
  console.log('connected to server.');
}

function portOpen() {
  console.log('the serial port opened.')
}

function serialEvent() {
  inString = serial.readLine();
  if (inString.length > 0) {
    // convert it to a number:
    inData = Number(inString);
  }
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1421';  // fill in your serial port name here
 
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
}
function draw(){
background(fromSer)
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
  println('connected to server.');
}
 
function portOpen() {
  println('the serial port opened.')
}
 
function serialEvent() {
 let stringFromSerial= serial.readLine();
  if(stringfromSerial.length > 0){
    let trimmedString = trim(stringFromSerial);
    fromSerial = Number(trimmedString);
  }
}
 
function serialError(err) {
  println('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  println('The serial port closed.');
}var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1421';  // fill in your serial port name here
var fromSerial = 0;
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
  createCanvas(500,500);
}
function draw(){
	background(fromSerial);
  text(fromSerial, 100, 100)

}
function serverConnected() {
  print('connected to server.');
}
 
function portOpen() {
  print('the serial port opened.')
}
 
function serialEvent() {
 var stringFromSerial = serial.readLine();
  if(stringFromSerial.length > 0){
   var trimmedString = trim(stringFromSerial);
   fromSerial = Number(trimmedString);
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
}let bouncer;
let gravity = 0.1;

function setup() {
  createCanvas(400, 400);
  bouncer = new Ball();
}

function draw() {
  background(220);
  bouncer.render();
  bouncer.update();
}




// Bouncing ball
// no objects

let x = 200;
let y = 20;
let speed = 0;
let gravity = 0.1;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  fill(0);
  ellipse(x, y, 24, 24);

  y = y + speed;
  speed = speed + gravity;
  if (y > height) {
    y = height;
    speed = -0.95 * speed;
  }
}let bubble1 = {
  x:220, y:200,
  display: function() {
  	stroke(255);
  	strokeWeight(4);
  	noFill();
  	ellipse(this.x, this.y, 24, 24);
	},
  move: function() {
  this.x = this.x + random(-1,1);
  //this.y = this.y + random(-1,1);
	}
}

let bubble2 = {
  x: 150, y:200,
  display:function() {
  ellipse(this.x, this.y, 24, 24);
  },
  move: function() {
    this.x = this.x + random(-1,1);
    //this.y + this.y + random(-1,1);
  }
}

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(0);
  bubble1.move();
  bubble1.display();
  
	bubble2.display();
  bubble2.move();
  
  //line(bubble2.x, 250, bubble1.x, 250);
  bezier(bubble2.x, 250, 170, 270, 200, 270, bubble1.x, 250);

}


 function setup() {
  createCanvas(400, 400);
  background(255, 230, 230);
}

function draw() {
  squares();

  }


function mousePressed() {
  //background(255, 230, 230);
 
  pawprint();

}

function pawprint() {
  noStroke();
  fill(random(100, 255), 0, random(100, 150), 100);
  size = 8;
  ellipse(mouseX, mouseY, size * 3, size * 3);
  ellipse(mouseX + 18, mouseY - 5, size, size);
  ellipse(mouseX + 12, mouseY - 15, size, size);
  ellipse(mouseX, mouseY - 19, size, size);
  ellipse(mouseX - 12, mouseY - 15, size, size);
}
function squares(){
  noFill();
  let color1 = map(mouseY, height, 0, 0, 255);
  let color2 = map(mouseX, 0, width, 0, 255);
      stroke (color1, color2, color1);
  
  for (let y = height+8; y >= mouseY; y -= 25) {
    for (let x = 7; x <= mouseX; x +=25) {
  rect(x, y, 10, 10);
    }
    }
}

  
function setup() {
  createCanvas(400, 400);
  background(255, 230, 230);
}

function draw() {

  }


function mousePressed() {
  pawprint();

}

function pawprint() {
  noStroke();
  fill(random(100, 255), 0, random(100, 150), 100);
  size = 8;
  ellipse(mouseX, mouseY, size * 3, size * 3);
  ellipse(mouseX + 18, mouseY - 5, size, size);
  ellipse(mouseX + 12, mouseY - 15, size, size);
  ellipse(mouseX, mouseY - 19, size, size);
  ellipse(mouseX - 12, mouseY - 15, size, size);
}
  


function setup() { 
  createCanvas(400, 400);
   background(255, 230, 230);
} 

function draw() { 
 
  noFill();

  let color1 = map(mouseY, height, 0, 0, 255);
  let color2 = map(mouseX, 0, width, 0, 255);
      stroke (color1, color2, color1);
  
  for (let y = height+8; y >= mouseY; y -= 25) {
    for (let x = 7; x <= mouseX; x +=25) {
  rect(x, y, 10, 10);
    }

}
}function setup() { 
  createCanvas(400, 400);
    background(255);
} 

function draw() { 
  
}
  function mousePressed() {
 / fill(0);
  size = 8;
  ellipse(mouseX, mouseY, size *3, size *3);
  ellipse(mouseX + 18, mouseY - 5, size, size);
  ellipse(mouseX + 12, mouseY - 15, size, size);
  ellipse(mouseX, mouseY - 19, size, size);
  ellipse(mouseX - 12, mouseY - 15, size, size);

}

//function paw(x, y, size) {
  //ellipse(function setup() { 
  createCanvas(400, 400);
    background(255);
} 

function draw() { 
  
}
  function mousePressed() {
 / fill(0);
  size = 8;
  ellipse(mouseX, mouseY, size *3, size *3);
  ellipse(mouseX + 18, mouseY - 5, size, size);
  ellipse(mouseX + 12, mouseY - 15, size, size);
  ellipse(mouseX, mouseY - 19, size, size);
  ellipse(mouseX - 12, mouseY - 15, size, size);

}

//function paw(x, y, size) {
  //ellipse(function setup() { 
  createCanvas(400, 400);
    background(255);
} 

function draw() { 
  
}
  function mousePressed() {
 / fill(0);
  size = 8;
  ellipse(mouseX, mouseY, size *3, size *3);
  ellipse(mouseX + 18, mouseY - 5, size, size);
  ellipse(mouseX + 12, mouseY - 15, size, size);
  ellipse(mouseX, mouseY - 19, size, size);
  ellipse(mouseX - 12, mouseY - 15, size, size);

}

//function paw(x, y, size) {
  //ellipse(function setup() { 
  createCanvas(400, 400);
    background(255);
} 

function draw() { 
  
}
  function mousePressed() {
 / fill(0);
  size = 8;
  ellipse(mouseX, mouseY, size *3, size *3);
  ellipse(mouseX + 18, mouseY - 5, size, size);
  ellipse(mouseX + 12, mouseY - 15, size, size);
  ellipse(mouseX, mouseY - 19, size, size);
  ellipse(mouseX - 12, mouseY - 15, size, size);

}

//function paw(x, y, size) {
  //ellipse(function setup() { 
  createCanvas(400, 400);
    background(255);
} 

function draw() { 
  
}
  function mousePressed() {
 / fill(0);
  size = 8;
  ellipse(mouseX, mouseY, size *3, size *3);
  ellipse(mouseX + 18, mouseY - 5, size, size);
  ellipse(mouseX + 12, mouseY - 15, size, size);
  ellipse(mouseX, mouseY - 19, size, size);
  ellipse(mouseX - 12, mouseY - 15, size, size);

}

//function paw(x, y, size) {
  //ellipse(let ball = {
  x: 300,
  y: 200,
  xspeed: 4,
  yspeed: -3
}

function setup() {
  createCanvas(400, 400);
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
  noFill();
  ellipse(ball.x, ball.y, 24, 24);

}

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(0);
  noFill();

  let color1 = map(mouseY, height, 0, 0, 255);
  let color2 = map(mouseX, 0, width, 0, 255);
      stroke (color1, color2, color1);
  
  for (let y = height+8; y >= mouseY; y -= 25) {
    for (let x = 7; x <= mouseX; x +=25) {
  rect(x, y, 10, 10);
    }

}
}let light = false

let circle1 = {
  x:100, y:200, d:20
}
let speed = 3;

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  if (light) {
  background(220);
  } else {
    background (0);
  }
	stroke(255);
  noFill();
  //circle1
ellipse(circle1.x, circle1.y, circle1.d);
  circle1.x = circle1.x + speed;
	circle1.y = circle1.y + speed;
  if (circle1.y > height || circle1.x < 0) {
    speed = speed * -1;
  }

  //box
    if (mouseX > 300 && mouseX < 320 && mouseY > 100 && mouseY < 120) {
    fill (255, 0, 0);
    }
    rect(300, 100, 20, 20);
    
  }
function mousePressed() {
   if (mouseX > 300 && mouseX < 320 && mouseY > 100 && mouseY < 120) {
      light = !light;
	}
}

let circle1 = {
  x:100, y:200, d:20
}
let speed = 3;

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
	stroke(255);
  noFill();
  //circle1
ellipse(circle1.x, circle1.y, circle1.d);
  circle1.x = circle1.x + speed;
	circle1.y = circle1.y + speed;
  if (circle1.y > height || circle1.x < 0) {
    speed = speed * -1;
  }

  //box
    if (mouseX > 300 && mouseX < 320 && mouseY > 100 && mouseY < 120) {
        if (mouseIsPressed) {
    background (0);
  }
    fill (255, 0, 0);
    }
    rect(300, 100, 20, 20);
    
  }

let eMin = 90;
let eMax = 150;

let x = 200;
let y = 335;
let a = 110;
let b = 10;
let c = 10;
let d = 200;
let e = eMin;
let f = 110;
let maxChubiness = 120;
let lineSpace = 20;




function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(248,244,188);
  
  // ------  begin animation --------
   let a = (frameCount / map(e, eMin, eMax, 10, .01)) % lineSpace

   strokeWeight(3);
   stroke(255, 0, 0, map(e, eMin, eMax, 0, 255));

   let l = 0;
  
   while (l < height * 2) {
  	 line(0, l + a, l + a, 0);
    
     // increment l
     l = l + lineSpace;
   }

  
  
  // ------ end animation --------
  
  noStroke();
  fill(240, 73, 62)
  ellipse(x, y, a, b);
  //Burger Button
  noStroke();
  fill(57, 190, 101)
  ellipse(200, 325, 110, 10);
  fill(147, 61, 42)
  ellipse(200, 340, 110, 15);
  fill(220, 140, 55)
  arc(200, 350, 100, 50, 0, PI, CHORD);
  translate(200, 320);
  rotate(PI);
  arc(0, 0, 100, 85, 0, PI, CHORD);
  //fat guy
  noStroke();
  fill(254, 214, 176);
  ellipse(c, d, e, f);
  stroke(0);
  strokeWeight(6);
  line(45, 200, 22, 200);
  line(-25, 200, -2, 200);
  
  if(e > maxChubiness){
     strokeWeight(3);
  	arc(c+30, d-30, 20, 30, HALF_PI, PI+HALF_PI);
    arc(c-30, d-30, 20, 30, PI+HALF_PI,HALF_PI);
  }
  
  stroke(0);
  strokeWeight(2);
  fill(249,166,199);
  translate(10, 180);
  rotate(PI);
  arc(0, 0, 10, 15, 0, PI, CHORD);
  
}

function mousePressed() {
 
  if (dist(mouseX, mouseY, x, y) < a / 2) {
    e = e + 10;
    f = f + 10;
  }
  
  if(e >= eMax){
   	e = eMin;
    f = 110;
  }
  
}let move = 3;
let speed = 1

function setup() {
  createCanvas(windowWidth, windowHeight);
  
} 


function draw() {
  background(0);
  stroke(255);
  strokeWeight(4);
  noFill();

  //rightCircle
  ellipse(move +100, windowHeight/2, 50, 50);
  move = move;
  
  //leftCircle
  ellipse(move, windowHeight/2, 50, 50);

  
  //mouth
  line(move, windowHeight/1.6, move + 100, windowHeight/1.6);
  
if (move > width -100){
speed = -3;
}
 move = move + speed;
}
  let circleX = 50;

function setup() { 
  createCanvas(400, 400);
  background(220);
} 

function draw() { 

	fill(255,33,44, 20);
  noStroke();
ellipse(circleX, mouseY, 25, 25)
  circleX = circleX + 1

}

function mousePressed() {
  background(220);
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  //background
  col = map(mouseY, 0, 400, 0, 255);
  background(col);

  let ratioXLeft = (mouseX - 150) / 400
  let ratioXRight = (mouseX - 250) / 400
  let ratioY = (mouseY - 200) / 400
  let rightEye = 250 + ratioXRight * 15
  let leftEye = 150 + ratioXLeft * 15
  let eyeY = 200 + ratioY * 15



  //ears
  stroke(255)
  triangle(100, 150, 110 + -8 * ratioXLeft, 110, 130, 130);
  triangle(240, 140, 290, 150, 280 + -8 * ratioXRight, 110);

  //invisible face
  noStroke();
  fill(0);
  ellipse(200, 200, 240, 180);

  //eyes
  fill(255)
  stroke(0)
  ellipse(150, 200, 35, 35);
  ellipse(250, 200, 35, 35);

  //pupils
  fill(0);
  ellipse(leftEye, eyeY, 10, 10);
  ellipse(rightEye, eyeY, 10, 10);

  let spots = {
    x: 100,
    y: 50
  }

  spots.x = random(0, 400);
  spots.y = random(0, 50);
  //fill(255)
  ellipse(spots.x, spots.y, 20, 20);
  //}

  //function mousePressed() {
  // fill(255,33,55)
  //arc(200, 270, 40, 60, 150, -40, PI+QUARTER_PI, CHORD);

}function setup() { 
  createCanvas(400, 400);
  ellipseMode(CENTER)
  rectMode(CENTER)
  
  background(500,100,100);
  
  // Sun
  noStroke()
  fill(244, 206, 66)
  ellipse(330, 70, 35, 35);
  
    // Moon
  fill(245, 235, 237);
  ellipse(200, 400, 500, 500);
  
  fill(170,160,175, 50);
  arc(100, 340, 60, 60, 50, PI);
  arc(250, 280, 50, 50, 50, PI);
  arc(130, 250, 40, 40, 50, PI);
  arc(300, 355, 65, 65, 50, PI);
  arc(320, 230, 35, 35, 50, PI);
  arc(20, 280, 50, 50, 50, PI);
  arc(100, 200, 25, 25, 50, PI);
  arc(380, 290, 50, 50, 50, PI);

  // Legs
  stroke(255);
  fill(150);
  rect(172.5, 217, 5, 20);
  
  rect(189, 217, 5, 20);
  
  rect(216, 217, 5, 20);
  
  rect(227.5, 217, 5, 20);
  
  	// Tail
  noFill();
  stroke(150);
  arc(228,168,30,50,0, HALF_PI);
  
  // Body
  stroke(255);
  fill(150);
  rect(200, 200, 60, 20);
  
    // Ears
  stroke(255);
  fill(150);
  triangle(165, 187, 175, 177, 164, 168);
  
  triangle(195, 168, 195, 187, 183, 178);

  // Head
  fill(150);
  ellipse(180, 190, 30, 30);

  // Eyes
  fill(0, 0, 0, 150);
  noStroke();
  ellipse(173, 189, 12, 9);
  ellipse(187, 189, 12, 9);

  stroke(0,200,500);
  line(172.5, 185, 172.5, 192);

  line(186.5, 185, 186.5, 192);
}
  function setup() { 
  createCanvas(400, 400);
  ellipseMode(CENTER)
  rectMode(CENTER)
  
  background(500,100,100);
  
  // Sun
  noStroke()
  fill(244, 206, 66)
  ellipse(330, 70, 35, 35);
  
    // Moon
  fill(245, 235, 237);
  ellipse(200, 400, 500, 500);
  
  fill(170,160,175, 50);
  arc(100, 340, 60, 60, 50, PI);
  arc(250, 280, 50, 50, 50, PI);
  arc(130, 250, 40, 40, 50, PI);
  arc(300, 355, 65, 65, 50, PI);
  arc(320, 230, 35, 35, 50, PI);
  arc(20, 280, 50, 50, 50, PI);
  arc(100, 200, 25, 25, 50, PI);
  arc(380, 290, 50, 50, 50, PI);

  // Legs
  stroke(255);
  fill(150);
  rect(172.5, 217, 5, 20);
  
  rect(189, 217, 5, 20);
  
  rect(216, 217, 5, 20);
  
  rect(227.5, 217, 5, 20);
  
  	// Tail
  noFill();
  stroke(150);
  arc(228,168,30,50,0, HALF_PI);
  
  // Body
  stroke(255);
  fill(150);
  rect(200, 200, 60, 20);
  
    // Ears
  stroke(255);
  fill(150);
  triangle(165, 187, 175, 177, 164, 168);
  
  triangle(195, 168, 195, 187, 183, 178);

  // Head
  fill(150);
  ellipse(180, 190, 30, 30);

  // Eyes
  fill(0, 0, 0, 150);
  noStroke();
  ellipse(173, 189, 12, 9);
  ellipse(187, 189, 12, 9);

  stroke(0,200,500);
  line(172.5, 185, 172.5, 192);

  line(186.5, 185, 186.5, 192);
}
  function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(500,100,100);
  ellipse(200, 200, 200, 200);
}