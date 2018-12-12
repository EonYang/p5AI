let trail = [];
let song;
let spaceShip;
let xx = 50;
let yy = 50;

function preload() {
  //song = loadSound('takeOnMe.mp3');
  spaceShip = createImg('ship.gif')
  space = loadImage('SPACE.png');
}


function setup() {
  //Create Canvas
 createCanvas(windowWidth, windowHeight);
//image(space, windowWidth, windowHeight);
  //Create particle system
  for (let i = 0; i < trail.length; i++) {
    trail[i] = new spacePoop();
  }
}

function draw() {
    image(space, 0, 0, windowWidth, windowHeight);
 //  image(spaceShip, xx, yy);
  spaceShip.position(xx, yy);
  spaceShip.size(40, 60);
  
  let sky = {  
  locationX : random(width),
  locationY : random(height),
  size : random(4,8)
}
  
  ellipse(sky.locationX, sky.locationY, sky.size, sky.size); 
  background(0, 4, 22, 50); 
  
  for (let i = 0; i < trail.length; i++) {
    trail[i].move();
    trail[i].drawBall();
  }

  if (mouseIsPressed) { 
      let b = new spacePoop();
      trail.push(b);
  }
  
  
}

//function mouseClicked(){
//	 if (!song.isPlaying()) {
//    song.play();
//  } else {
//    song.stop();
//  }
//}
 function keyPressed() {
   for (let i=0; i < 80; i++){
   let b = new spacePoop();
      trail.push(b);
   }
      if (keyCode === LEFT_ARROW) {
        xx = xx - 30;
running2 = 1;
     //   print("ff");
      } else if (keyCode === RIGHT_ARROW) {
        xx = xx + 30;
running2 = 1;
      } else if (keyCode === UP_ARROW) {
        yy = yy - 30;
running2 = 1;
      } else if (keyCode === DOWN_ARROW){
        yy = yy + 30;
running2 = 1;
      }
}

let W;
let A;
let S;
let D;
let XX;
let YY;
let dracula1;
let ikea1;
let mydracula = [];
let myikea = [];
let reddest = [255, 0, 0];
let feet1 = [W, A, S, D];
let feet2 = [-20, 20];
// let start = 5;

//wanted to make schmup/chess/perfect probability,,
//couldn't figure out how to spawn with video, but
//I think the movement feature is ok??

function preload() {
  dracula1 = loadImage("dracula.png");
  ikea1 = loadImage("ikea.png");
  CW = loadImage("CW.jpg");
}

function setup() {
  createCanvas(550, 500);
  pixelDensity(1);
  capture = createCapture(VIDEO);
  capture.size(width, height);
  capture.hide();
}

function mousePressed() {
  reddest = get(mouseX, mouseY);
  mouseX = XX;
  mouseY = YY;
}

function draw() {
   //imageMode(CENTER);
  image(capture, 0, 0);
  image(dracula1, 50, 50, 100, 100); // cc
  image(ikea1, 200, 200, 100, 100); // cc
 // new dracula2(400, random(550), 50, 50); // cc
  let reddestX = 0;
  let reddestY = 0;
  let qualify = 10;
  let allThatQualified = 1;
  for (var y = 0; y < capture.height; y++) {
    for (var x = 0; x < capture.width; x++) {
      var finger = capture.get(x, y);
      var findReddest = dist(finger[0], finger[1], finger[2], reddest[0], reddest[1], reddest[2]);
      if (findReddest < qualify) {
        reddestX += x;
        reddestY += y;
        allThatQualified++;
        qualify = findReddest;
      }
    }
  }
  var a = reddestX / allThatQualified;
  var b = reddestY / allThatQualified;
  rect(a, b, 10, 10);
  if (dist(XX, YY, a, b) > 40) {
    XX = a;
    YY = b;
    running1 = 1;
    running2 = 1;
  }
 // capture.loadPixels();
  for (var start = 0; start < 7; start++) {
   // dracula2.spawn();
   // ikea2.spawn();
   mydracula.push(new dracula2(400, random(550), 50));
    myikea.push(new ikea2(400, random(550), 50));
    capture.set(ikea2, 200, 200);
  }
   // capture.updatePixels();
}
class dracula2 {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  spawn() {
    image(dracula1, this.x, this.y, 30, 30);
  }
  if (running1 = 1) {
    this.r = random(feet1);
    if (this.r = W) {
      this.y = this.y + 20;
    } else if (this.r = S) {
      this.y = this.y - 20;
    } else if (this.r = D) {
      this.x = this.x + 20;
    } else {
      this.x = this.x - 20;
      // } else if (this.r = A) {
      // this.x = this.x - 20;
    }
    running1 = 0;
  }

  // if (this.r = W; this.y = this.y + 20;);
  // else (this.r = S; this.y = this.y - 20;);
  // else (this.r = A; this.x = this.x - 20);
  // else (this.r = D; this.x = this.x + 20);
  // running1 = 0;
}
class ikea2 {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  spawn() {
    image(ikea1, this.x, this.y, 30, 30);
  }
  if (running2 = 1) {
    this.r = random(feet1);
    if (this.r = W) {
      this.y = this.y + 20;
      this.x = this.x + 20;
    } else if (this.r = S) {
      this.y = this.y - 20;
      this.x = this.x - 20;
    } else if (this.r = D) {
      this.x = this.x + 20;
      this.y = this.y - 20;
    } else {
      this.x = this.x - 20;
      this.y = this.y + 20;
    }
    // else if (this.r = A) {
    //    this.x = this.x - 20;
    //   this.y = this.y + 20;
    //  }
    running2 = 0;
  }
}function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
}

function draw() {
  background(220);
  loadPixels();
  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
    var index = (x + y * width)*4;
      pixels[index+0] = x;
       pixels[index+1] = random(255);
       pixels[index+2] = y;
       pixels[index+3] = 255;
    }
  }

  pixels[365] = 255;
  updatePixels();
}let video;
let button;
var snaps = [];

function setup() {
createCanvas(800, 240);
background(51);
video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();
  button = createButton('snap');
  button.mousePressed(takesnap);
}
function takesnap(){
 snaps.push(video.get());
  //image(video,0,0);
}
function draw() {
  var w = 80;
  var e = 60;
  var x = 0;
  var y = 0;

  for (var i = 0; i < snaps.length; i++){
    tint(255,50);
    image(snaps[i], x, y, w, e);
    x = x + w;
    if (x > width){
      x = 0;
      y = y + e;
    }
  }
  tint(255,0,150);
//  background(51);
//  image(video, 0,0, mouseX, mouseY);
  
}let video;
let targetColor = [255, 0, 0];
let mySound;

function preload(){
}

function setup() {
	createCanvas(640, 480);
	video = createCapture(VIDEO);
	video.size(width, height);
	video.hide();
}

function draw() {
	background(220);
	// image(video,0,0);
	var biggest = 5000000;
	var winningX = 0;
	var winningY = 0;
	var allThatQualiifed = 1;
	//	for every row
	//		for every column
	for (var y = 0; y < video.height; y++) {
		for (var x = 0; x < video.width; x++) {
			var thisPixel = video.get(x, y);
			var diffBetweenColors = dist(thisPixel[0], thisPixel[1], thisPixel[2], targetColor[0], targetColor[1], targetColor[2])
			if (diffBetweenColors < biggest) {
				winningX += x;
				winningY += y;
				allThatQualified++;
				biggest = diffBetweenColors;
			}
		}
	}
}
ellipse(winningX/allThatQualified, winningY/allThatQualified, 20, 20);
function mousePressed(){
	targetColor = get(mouseX, mouseY);
	printLn(targetColor);
}var myButton;

function setup() {
  createCanvas(400, 400);
  myButton = createButton("Press");
  myButton.position(100,100);
  myButton.mousePressed(function pressed(){
  ellipse(random(width), random(height), 20,20);
});
}

function draw() {
//  background(220);
}// Declare a "SerialPort" object
var serial;
var latestData = "waiting for data";  // you'll use this to write incoming data to the canvas

function setup() {
  createCanvas(500, 300);

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem1411");
  serial.on('data', gotData);
}


// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readLine();  // read the incoming string
  //same as readStringUntil(‘\r\n’)
  trim(currentString);                    // remove any trailing whitespace
  if (!currentString) return;             // if the string is empty, do no more
  latestData = int(currentString);            // save it for the draw method
  console.log(latestData);             // println the string
  var output = map(mouseX,0,width,0,255);
  serial.write(output);
}

function draw() {
  background(255,255,255);
  fill(0,0,0);
  var data = map(latestData, 0, 1023, 0, height);
  ellipse(mouseX, data, 50, 50);
  text(data, 10, 10);
  
}let DDR_key = [];
let ddr;
let ddr2;
let ddr3;
let xx = 0;
//let s = second();

function preload() {
  OJR = loadImage("OJR.png");
  castle = loadImage("castle.JPG");
  DDR1 = loadImage("DDR-1.png");
  DDR2 = loadImage("DDR-2.png");
  DDR3 = loadImage("DDR-3.png");
  DDR4 = loadImage("DDR-4.png");
  //for (let i = 1; i < 5; i++) {
  //   DDR_key[i] = loadImage("DDR-" + i + ".png");
  // }
}

function setup() {
  createCanvas(400, 400);
  ddr = new DDR();
  ddr2 = new DDR();
}

function draw() {
  //background(220);
  image(castle, 0, 0, width, height);
  image(OJR, xx, height / 3, 120, 120);
  //  ddr.rats();
  // % prolly modulus and spawn remainders with s
  ddr.show();
}
 function keyPressed() {
      if (keyCode === LEFT_ARROW) {
        xx = xx - 20;
     //   print("ff");
      } else if (keyCode === RIGHT_ARROW) {
        xx = xx + 20;
      } else if (keyCode === UP_ARROW) {
        print("sample");
      } else if (keyCode === DOWN_ARROW){
      }
   // this was originally for the timed arrows, but
   // couldn't get seconds-spawning to work :(
 }
class DDR {
  constructor() {
    this.x = 100;
    this.y = 300;
  }
//  rats() 
  show() {
    for (this.i = 0; this.i<25; this.i++) {
    image(DDR3, this.i * 15, this.y, 40, 40);
    this.y = this.y - .01;
  }
}
}
// show() {
//  for (s >= 0; s<180; i++) {
// natural numbers??
//  int(s);
// switching to plan b aah
//this.q = ("DDR" + random(1,4));var slider;

function setup() {
  myButton = createSlider(0,100,50);
  myButton.position(20,20);
  myButton.changed(prolly);
}

function draw() {
 background(220); 
}

function prolly() {
  print ("prolly" + myButton.value());
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}

// NOTE TO YUANYUAN -- blocked from my phone/laptop/nyu account and cant fix until 9ish
// (buildings not open yet) -- been trying to fix since yesterday/early early this morning,, 
// I have the code on my laptop, and wanted to update you so you aren't worried but
// I dont have wechat or email access -- I'll combine the 2 parts and send you a text when
// I have access,, really really sorry for the confusion/worry  ToTvar x = 100;
var y = 100;
var xLoc1=0;
var yLoc1=100;
var directionX = 2;
var directionY = 1;
var speed=5;
var speed1 = 10;
var speed2 = 5;
var ex=20;
var wy=20;

function preload() {
  img = loadImage("kitchen.png");
  img2 = loadImage("icecream.png");
  img3 = loadImage("egg.png");
  img4 = loadImage("bulb.png");
  img5 = loadImage("tiger.png");
  img6 = loadImage("David.png");
  img7 = loadImage("fish.png");
  img8 = loadImage("emoji1.png");
  img9 = loadImage("rugdeals.png");
}

function setup() {
createCanvas(1000, 561);
  textSize(50);
}

function draw() {
  background(255);
  noStroke();
  fill(0);
    image(img, 0, 0);//kitchen
  image(img6, 470, 170, 200, 200);//david
  image(img5, 610, 110, 400, 285);//tiger

  image(img2, x, 100, 150, 100);//icecream
  x = x + 2 * speed1;
  if (x > width || x < 0) {
    speed1 = speed1 * -1
  }
   image(img3, 10, y, 110, 100)//egg
  y = y + 2 * speed2;
  if (y > height || y < 0) {
    speed2 = speed2 * -1
  }

  xLoc1 = xLoc1 + directionX;
  if (xLoc1 < 0 || xLoc1 > width){
		directionX = -directionX
  }
  yLoc1 = yLoc1 + directionY;
  if (yLoc1 < 0 || yLoc1 > height){
		directionY = -directionY
  }
  image(img8,xLoc1,yLoc1,100,80);//emoji
  xLoc1 = xLoc1 + directionX * speed;
  yLoc1 = yLoc1 + directionY * speed;
  
 
 image(img7, random(width/2),random(height) , 180, 85);//fish
  image(img9, ex, wy, 110, 100);
  //text(key, 33, 65);
   if (wy == 100) {
    text("Top 10 Most Romantic lines from Shakespeare?", ex, wy);
  } // icecream
  if (ex >= 10 && ex <= 50) {
    text("but there's a little problem. I can easily draw it, but then when", ex, wy);
  } //egg
  if (ex >= 600 && ex <=750 && wy >=100 && wy <= 200) {
    rect(610, 110, 400, 285, 300);
    text("you ate the tiger! incredible!!", ex, wy+300);
  }
}
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    ex = ex-40;
  } else if (keyCode === RIGHT_ARROW) {
    ex = ex+40;
  } else if (keyCode === UP_ARROW) {
    wy = wy-40;
  } else if (keyCode === DOWN_ARROW) {
    wy = wy+40;
  }
}let t=0;



function setup() {
  createCanvas(400, 400);
  background(100,100,150);
}

function draw() {
  //background(220);
  ellipse(mouseX-200,mouseY,250,250);
  ellipse(mouseX+150,mouseX+50,150,50);
  rect(150,150,150,150); fill(random(0,300),mouseY,mouseX);
}

function mousePressed(){
  ellipse(mouseX,mouseY,20,20)
  saveFrames('out','.png')
  createCanvas(random(300,500),random(300,500));
  background(random(0,300),random(0,300));
}