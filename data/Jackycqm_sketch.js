let data;


function preload() {
  data = loadTable(
    'PRSA-adapted-aparrish.csv',
    'csv',
    'header');
}


function colValsMinMax(tab, colName) {
  let vals = data.getColumn(colName);
  let obj = {
    values: vals,
    min: min(vals),
    max: max(vals),
  }
  return obj;
}

function setup() {
  createCanvas(640, 480);
  console.log(data.getRowCount());
  console.log(data.columns);

  background(50);

  let pm = colValsMinMax(data, "pm2.5");
  console.log(pm.min);
  console.log(pm.max);


  let temps = colValsMinMax(data, "TEMP");
  console.log(temps.min);
  console.log(temps.max);


  for (var i = 0; i < data.getRowCount(); i++) {


    stroke(255, 128, 128);
    let pmXpos = map(i, 0, data.getRowCount(), 0, width);
    let pmYpos = map(pm.values[i], pm.min, pm.max, height, 0);
    point(pmXpos, pmYpos);


    stroke(128, 128, 255);
    let tempXpos = map(i, 0, data.getRowCount(), 0, width);
    let tempYpos = map(temps.values[i], temps.min, temps.max,
      height, 0);
    point(tempXpos, tempYpos);

  }
}function setup() {

  var data = [105, 212, 158, 31, 98, 54];
  var width = 200, // canvas width and height
      height = 350,
      margin = 20,
      w = width - 2 * margin, // chart area width and height
      h = height - 2 * margin;
  
  var barWidth =  (h / data.length) * 0.8; // width of bar
  var barMargin = (h / data.length) * 0.2; // margin between two bars
  
  createCanvas(width, height);
  
  textSize(14);
  
  push();
  translate(margin, margin); // ignore margin area
  
  for(var i=0; i<data.length; i++) {
    push();
    fill('steelblue');
    noStroke();
    translate(0, i* (barWidth + barMargin)); // jump to the top right corner of the bar
    rect(0, 0, data[i], barWidth); // draw rect

    fill('#FFF');
    text(data[i], 5, barWidth/2 + 5); // write data

    pop();
  }
  
  pop();
}var font, r, g, b, wordIndex, system, fontsize = 60

let video;
let poseNet;
let poses = [];

let FearPool = [
  "Expectations",
  "Financial Responsibility",
  "Student Loan",
  "Failing P Comp ",
  "Looking dumb in front of the class",
  "GLOBAL WARMING",
  "Finials in 4 weeks",
  "Unplanned Pregnancy",
  "Can’t find a job",
  "Loneliness",
  "Losing family",
  "Breakups",
  "Long-distance relationship",
  "Competition",
  "Hangover",
  "Bored in life",
  "Violence",
  "Intolerance",
  "Fascism",
  "Having a stalker",
  "Pizza with Pineapples",
  "Warm beer",
  "Hatred",
  "PTSD",
  "Sleep Paralysis",
  "Street food with strang looking meat",
  "Paralyzed by fear",
]

function setup() {
  createCanvas(640, 480);

  textSize(fontsize);
  textAlign(CENTER, CENTER);

  r = random(0, 255);
  g = random(0, 255);
  b = random(0, 255);
  wordIndex = floor(random(0, 26));


  createCanvas(640, 480);
  system = new ParticleSystem(createVector(200, 200));

  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');

}

function draw() {

   image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
 
  drawExpectations();

  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    // A keypoint is an object describing a body part (like rightArm or leftShoulder)
    let nose = pose.keypoints[0];
    let leftEar = pose.keypoints[3];
    let sparkleRadius = dist(nose.position.x, nose.position.y, leftEar.position.x, leftEar.position.y);
  
    // Only draw an ellipse is the pose probability is bigger than 0.2
    if (nose.score > 0.2) {
          system.origin.x = nose.position.x;
        system.origin.y = nose.position.y;
        system.addParticle();
        system.run();
      
    }
  }
  console.log(poses.length);
}

var Particle = function(position) {
  this.acceleration = createVector(0, 0.05);
  this.velocity = createVector(random(-1.5, 1.5), random(-2, 2));
  this.position = position.copy();
  this.lifespan = 190;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function() {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function() {
  stroke(200, this.lifespan);
  noStroke();
  //fill(127, this.lifespan);
  fire(this.position.x, this.position.y, this.lifespan);
};

// Is the particle still useful?
Particle.prototype.isDead = function() {
  return this.lifespan < 0;
};

var ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
  for (var i = this.particles.length - 1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};


function fire(firex, firey, lifespan) {
  fill(255, 164, 7, lifespan - 120);
  ellipse(firex + random(5), firey, 21, 23);
  fill(255, 126, 7, lifespan - 80);
  ellipse(firex + random(2), firey, 14, 16);
  fill(255, 160, 28, lifespan - 50);
  ellipse(firex, firey, 6, 8);
  fill(255, 75, 48, lifespan - 40);
  ellipse(firex + random(2), firey, 4, 6);
  fill(255, 58, 28, lifespan - 20);
  ellipse(firex, firey + random(2), 3, 5 + random(2));
}


function drawExpectations() {
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i].pose;

    let leftShoulder = pose.keypoints[5];
    let rightShoulder = pose.keypoints[6];
    let leftElbow = pose.keypoints[7];
    let rightElbow = pose.keypoints[8];
    let leftWrist = pose.keypoints[9];
    let rightWrist = pose.keypoints[10];
    let leftHip = pose.keypoints[11];
    let rightHip = pose.keypoints[12];

    strokeWeight(3);
    stroke(255);
    noFill();

    let shoulderDist = dist(leftShoulder.position.x, leftShoulder.position.y, rightShoulder.position.x, rightShoulder.position.y) / 2;
    let hipDist = dist(leftHip.position.x, leftHip.position.y, rightHip.position.x, rightHip.position.y) / 2;

    let topX = rightShoulder.position.x + shoulderDist;
    let topY = rightShoulder.position.y;
    let bottomX = rightHip.position.x + hipDist;
    let bottomY = rightHip.position.y;
		
    wordIndex=floor(random(0,26));
    
    fill(r, g, b);
    textAlign(CENTER,CENTER);
    text(FearPool[wordIndex], random(topX, bottomX), random(topY, bottomY));

  }
}var mic;
var screen_factor = 3500

var balloon_value  

function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  mic.start()
}

function draw() {
  background(255);

  var vol;

  vol = mic.getLevel();
  var r = vol * screen_factor
  var balloon = lerp(vol, r, 0.5);
  // console.log(vol);
  // console.log(r);
  console.log(balloon);
  if (balloon < 100){
  balloon = 100
  }else{ 
    balloon = balloon}
  fill(100, 0, 0)
  ellipse(width / 2, height / 2, balloon, balloon);
}var serial; // variable to hold an instance of the serialport library
var portName = 'COM5'; // fill in your serial port name here
var inData;
var called = true;
var song_1;
var song_2;
var countdown = 0;
var delay = 3000;


function preload() {
  
  song_2 = loadSound('assets/Winter_Lantern_Song.mp3');

  song_1 = loadSound('assets/STE-001.wav')
	// song_2 = loadSound('assets/Mergos_Crying.mp3')

}

function setup() {
  createCanvas(400, 400);
  background(0x08, 0x16, 0x40);

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

function draw() {



}

function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
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

  var dataString = serial.readLine();
  if (dataString.length > 0) {
    inData = JSON.parse(dataString);

    var A_cm = (inData.A_duration / 2) * 0.0343;

    A_cm = constrain(A_cm, 0, 500);

    var volume_1 = map(A_cm, 100, 10, 0, 1, true);
    var volume_2 = map(A_cm, 10, 500, 0, 1, true);

    //print(A_cm);
    //song_1.amp(volume_1);
    //song_2.amp(volume_2);

    song_1.amp(1);
    song_2.amp(1);
    if (A_cm < 85 && !called && millis() - countdown > delay) {
      song_2.pause();
      song_1.loop();
      called = true;
      countdown = millis();
      print("song one is played");
    } else if (A_cm > 100 && called && millis() - countdown > delay) {
      song_1.pause();
      song_2.loop();
      called = false;
      countdown = millis();
      print("song two is played");
    }
  }
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}var serial; // variable to hold an instance of the serialport library
var portName = 'COM3'; // fill in your serial port name here
var inData;
//var xPos = 0;
var outByte = 0;

function setup() {
  createCanvas(400, 400);

  // background(0x08, 0x16, 0x40);

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

function draw() {
  background(0);
  fill(255);
  text("incoming value: " + inData, 30, 30);

  // graphData(inData);
}

// function mouseDragged() {
//   outByte = int(map(mouseY, 0, height, 0, 255));

//   serial.write(outByte);
// }

// function keyPressed() {
//   if (key >= 0 && key <= 9) {
//     outByte = byte(key * 25);
//   }
//     serial.write(outByte);
// }

function keyPressed() {
 if (key ==='H' || key ==='L') { // if the user presses H or L
 serial.write(key);  
  console.log(key)// send it out the serial port
 }
}

// function graphData(newData){
//   var yPos = map (newData, 0,255,0,height)
//   stroke(0xA8,0xD9,0xA7);
//   line(xPos,height,xPos,height - yPos)

//   if (xPos >= width) {
//     xPos = 0;
//     background(0x08, 0x16, 0x40);
//   } else {
//     xPos++;
//   }
// }

function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
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
  var inByte = serial.read();
  inData = inByte

  // var inString =serial.readLine();
  // if (inString.length > 0){
  //   inData = Number (inString);
  // }

  // inData = serial.readLine();
  // inData = Number(serial.read());
  // console.log (inData);
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}var serial; // variable to hold an instance of the serialport library
var portName = 'COM3'; // fill in your serial port name here
var inData;
var xPos = 0;

function setup() {
  createCanvas(400, 400);
  background(0x08, 0x16, 0x40);
  
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

function draw() {
  graphData(inData);
}

function graphData(newData){
  var yPos = map (newData, 0,255,0,height)
  stroke(0xA8,0xD9,0xA7);
  line(xPos,height,xPos,height - yPos)
  
  if (xPos >= width) {
    xPos = 0;
    background(0x08, 0x16, 0x40);
  } else {
    xPos++;
  }
}

function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
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
  var inString =serial.readLine();
  if (inString.length > 0){
    inData = Number (inString);
  }
  // inData = serial.readLine();
  // inData = Number(serial.read());
  // console.log (inData);
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}var unit = 2;
var count;
var spirals = [];
// var spiral1
// var spiral2
// var spiral3
// var spiral4
// var spiral5

class Spiral {

  constructor() {
    this.x //= (width / random(2, 10));
    this.y //= (height / random(2, 10));

    this.xOffset //= (width / random(2, 10));
    this.yOffset //= (height / random(2, 10));
    this.osf; //off set factor
    this.gbf; //growth boundry factor

    this.r = random(1, 20);
    this.R = random(1, 10);
    this.dR = random(0, 2);
    this.t = random(1, PI);
    this.dt = random(0, 2)
  }

  growth() {
    this.osf = 10
    this.gbf = this.osf - 0.3
    this.x = cos(this.t) * this.R;
    this.y = sin(this.t) * this.R;
    this.xOffset = (width / this.osf);
    this.yOffset = (height / this.osf)

    if (abs(this.x) > (width - this.xOffset * this.gbf) && abs(this.y) > (height - this.yOffset * this.gbf)) {
      this.dR = this.dR * -1
      this.dt = this.dt * -1
    } else {
      this.dR = this.dR
      this.dt = this.dt
    }
    this.R += this.dR
    this.t += this.dt
  }

  display() {
    push();
    let r = random(255);
    let g = random(255);
    let b = random(255);
    fill(r, g, b);
    stroke(r, g, b);
    ellipse(this.x + this.xOffset, this.y + this.yOffset, this.r, this.r)
    pop();
    //print(this.x, this.y, this.xOffset, this.yOffset, this.osf, this.gbf, this.r, this.R, this.dR, this.t, this.d);
  }
}

function setup() {

  createCanvas(windowWidth, windowHeight);
  background(5);
  // spirals = new Spiral();
  // spiral1 = new Spiral();
  // spiral2 = new Spiral();
  // spiral3 = new Spiral();
  // spiral4 = new Spiral();
  // spiral5 = new Spiral();


  // var wideCount = width / unit;
  // var highCount = height / unit;
  var count = (width / unit) * (height / unit); //wideCount * highCount;
  // var index = 0;
  // for (var i = 0; i < count; i++) {
  // spirals.push(new Spiral());
  // }


  for (var x = 0; x < width; x = x + width / unit) {
    for (var y = 0; y < height; y = y + height / unit) {
      // spirals[index++] = new Spiral(windowWidth / unit, windowWidth / unit, windowWidth / unit, windowWidth / unit, unit);
      spirals.push(new Spiral());
    }
  }
}

function draw() {
  background(5, 20);
  for (var i = 0; i < count; i++) {
    spirals[i].growth();
    spirals[i].display();
    // spirals.growth();
    // spirals.display();
 }
  //   spiral1.growth();
  //   spiral2.growth();
  //   spiral3.growth();
  //   spiral4.growth();
  //   spiral5.growth();

  //   spiral1.display();
  //   spiral2.display();
  //   spiral3.display();
  //   spiral4.display();
  //   spiral5.display();

}var unit = 200;
var sprial=[];
//var sprials =[];

class Sprial {

  constructor() {
    this.x;
    this.y;
    this.xOffset;
    this.yOffset;
    this.osf; //off set factor
    this.gbf; //growth boundry factor

    this.r = random(1, 20);
    this.R = random(1, 10);
    this.dR = random(0, 2);
    this.t = random(0, 2 * PI);
    this.dt = random(0, 2)
  }

  growth() {
    sprial.osf = unit
    sprial.gbf = sprial.osf - 0.3
    sprial.x = cos(sprial.t) * sprial.R;
    sprial.y = sin(sprial.t) * sprial.R;
    sprial.xOffset = (windowWidth / sprial.osf);
    sprial.yOffset = (windowHeight / sprial.osf)

    if (abs(sprial.x) > (windowWidth - sprial.xOffset * sprial.gbf) && abs(sprial.y) > (windowHeight - sprial.yOffset * sprial.gbf)) {
      sprial.dR = sprial.dR * -1
      sprial.dt = sprial.dt * -1
    } else {
      sprial.dR = sprial.dR
      sprial.dt = sprial.dt
    }
    sprial.R += sprial.dR
    sprial.t += sprial.dt
   // print(this.r, this.R, this.dR, this.t, this.dt)
  }

  display() {
    push();
    let r = random(255);
    let g = random(255);
    let b = random(255);
    fill(r, g, b);
    stroke(r, g, b);
    ellipse(sprial.x + sprial.xOffset, sprial.y + sprial.yOffset, sprial.r, sprial.r)
    pop();
  }
}

function setup() {

  createCanvas(windowWidth, windowHeight);
  background(5);

  var wideCount = width / unit;
  var highCount = height / unit;
  count = wideCount * highCount;
 // var index = 0;

  for (var y = 0; y < highCount; y++) {
    for (var x = 0; x < wideCount; x++) {
      sprial.push (new Sprial(windowWidth / unit, windowWidth / unit, windowWidth / unit, windowWidth / unit, unit));
    
      //sprial[index++] = new Sprial(windowWidth / unit, windowWidth / unit, windowWidth / unit, windowWidth / unit, unit);
    }
  }
  print(sprial);
}

function draw() {
  background(5, 20);
  for (var i = 0; i < sprial.length; i++) {
    sprial[i].growth();
    sprial[i].display();
  }
}let t = 0;
let R = 10;
let dt;
//let dt = 3;
let dR;
//let dR = 1;

function setup() {
  createCanvas(windowWidth-100, windowHeight-100);
  sliderdR = createSlider (-3,3,0,0.1)
  sliderdt = createSlider (-1,1,0,0.05)
  background(5);
}

//function mousePressed() {
  //background(5);

  function draw() {
    //sprialPopulate()
    generateSprial()
    sprialAnimation()
    dR = sliderdR.value();
    dt = sliderdt.value();
  }

function sprialPopulate() {
  for (var x = 0; x <= width; x += 50) {
  for (var y = 0; y <= height; y += 50) {
    generateSprial(x,y)
  
  	}
  }
}

function generateSprial (x,y){
  {this.x=x;
  this.y=y;
  }
  push();
  //translate(width/2,height/2);
  let r = random(255);
  let g = random(255);
  let b = random(255);
  fill(r, g, b);
  stroke(r, g, b);
  this.x = R * cos(t);
  this.y = R * sin(t);
  ellipse (this.x,this.y,10,10);
  pop();
  print(this.x,this.y)
}

function sprialAnimation(){
  t+=dt;
  R+=dR;
}
	let t = 0;
	let R = 10;
	let dt = 3;
	let dr = 0.1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(5);
}

function mousePressed() {
  background(5);
}

function draw() {
  generateSprial()
  sprialAnimation ()
 
  //sliderSpinSpeed()
  //sliderSpinAngle()
}
  
function generateSprial(){
  push();
  translate(width / 2, height / 2);
  let r = random(255);
  let g = random(255);
  let b = random(255);
  fill(r, g, b);
  stroke(r, g, b);
  var x = R * cos(t)
	var y = R * sin(t)
  if (mouseIsPressed) {
    ellipse(x, y, 10, 10)
  } else {
    ellipse(x, y, 10, 10)
    pop();
  }
}
  
function sprialAnimation (){
  if (windowWidth / 2 - mouseX < 0) {
    R += dr //* (windowWidth/2-mouseX)/100
    t += dt //* (windowWidth / 2 - mouseY) / 100
    //}
  } else {
    R -= dr //* (windowWidth/2-mouseX)/10
    t -= dt //* (windowWidth / 2 - mouseY) / 10
  }
}

 var t = 0
let R = 10;
let dt = 10;
let dr = 10;
let x;
let y;
var xOffset;
var yOffset;

//let clr = {
//r : 0,
//g : 0,
//b  : 0,
//}
//let r = random(255);
//let g = random(255);
//let b = random(255);


function setup() {
  createCanvas(windowWidth, windowHeight);
  //createCanvas(400, 400);
  background(5);
  //frameRate (60)
}

// function mousePressed() {
//   background(5);
// }

function draw() {
  background(5, 10);
  x = cos(t)*R/10
  y = sin(t)*R/10
  xOffset = (windowWidth / 2);
  yOffset = (windowHeight / 2)
  // if (abs(x) > 0) {
  //   x = 0
  //     x = R * cos(t)
  //   // R += dr //* (windowWidth/ 2 - mouseX) / 10
  //   // t += dt //* (windowWidth / 2 - mouseY) / 10
  // } else if (y > 0) {
  //   y = 0
  //     y = R * sin(t)
  //   // R += dr //* (windowWidth/ 2 - mouseX) / 100
  //   // t += dt //* (windowWidth / 2 - mouseY) / 100
  if (abs(x) > (windowWidth -xOffset) && abs(y) > (windowHeight-yOffset)) {
    x = 0
    y = 0
    // R -= dr
    // t -= dt
    dr = -dr
    dt = -dt
    // R -= dr //* (windowWidth/ 2 - mouseX) / 100
    // t -= dt //* (windowWidth / 2 - mouseY) / 100
  } else {
    // R += dr
    // t += dt
    dr = dr
    dt = dt
    // R -= dr //* (windowWidth/ 2 - mouseX) / 100
    // t -= dt //* (windowWidth / 2 - mouseY) / 100
  }
  print(x, y, R, t, dr, dt)
  push();
  //translate(width / 2, height / 2);
  let r = random(255);
  let g = random(255);
  let b = random(255);
  fill(r, g, b);
  stroke(r, g, b);
  R += dr
  t += dt
  if (mouseIsPressed) {
    ellipse(x + xOffset, y + yOffset, 10, 10)
  } else {
    ellipse(x + xOffset, y + yOffset, 10, 10)
  }
  pop();
}function draw() {
  createCanvas(800, 600);
  background(250);

	noStroke();
	fill(135,206,250);
	
  if (mouseIsPressed) {
    if (mouseButton === LEFT) {
      ellipse(width,height/2, 300, 300);
    }
    if (mouseButton === RIGHT) {
      ellipse(0,height/2, 300, 300);
    }
    if (mouseButton === CENTER) {
			fill(139,0,0);
      textSize (13 + (mouseX/width)*13);
      text ("wHAt kInD of pErSoN cliCks tHe mIdDlE bUtTon aNYwAys !!!",100, height/2,);
    }
  }  
}