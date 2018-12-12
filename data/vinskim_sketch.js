let img;

function preload() {
  img = loadImage("eye.png");
}


// https://github.com/kylemcdonald/AppropriatingNewTechnologies/wiki/Week-2
var capture;
var tracker
var w = 640,
  h = 480;

function setup() {

  capture = createCapture(VIDEO);
  createCanvas(w, h);
  capture.size(w, h);
  capture.hide();

  colorMode(HSB);
  imageMode(CENTER);


  tracker = new clm.tracker();
  tracker.init(pModel);
  tracker.start(capture.elt);

}

function draw() {
  image(capture, width/2, height/2, w, h);
  let positions = tracker.getCurrentPosition();




  noFill();
  //stroke(255);
  beginShape();
  for (let i = 0; i < positions.length; i++) {
    vertex(positions[i][0], positions[i][1]);
  }
  endShape();

  noStroke();
  for (let i = 0; i < positions.length; i++) {
    fill(50, map(i, 0, positions.length, 0, 360), 100);
    ellipse(positions[i][0], positions[i][1], 3, 3);
    //text(i, positions[i][0], positions[i][1]);

  }



  if (positions.length > 0) {
    let mouthLeft = createVector(positions[44][0], positions[44][1]);
    let mouthRight = createVector(positions[50][0], positions[50][1]);
    let smile = mouthLeft.dist(mouthRight);
    // uncomment the line below to show an estimate of amount "smiling" 
    rect(20, 20, smile * 3, 20);


    stroke('green');
    strokeWeight(14);
    for (let i = 15; i < 18; i++) {
      line(positions[i][0], positions[i][1], positions[i + 1][0], positions[i + 1][1]);
    }
    for (let i = 19; i < 22; i++) {
      line(positions[i][0], positions[i][1], positions[i + 1][0], positions[i + 1][1]);
    }

    let nose = dist(positions[62][0], positions[62][1], positions[37][0], positions[37][1]);
    noStroke();
    fill(0, 255, 255);
    textSize(positions[37][1] - positions[33][1]);
    textAlign(CENTER);
    textStyle(BOLD);
    text("J",positions[37][0], positions[37][1]);
    //ellipse(positions[62][0], positions[62][1], nose * 2);

    image(img, positions[27][0], positions[27][1], positions[25][0] - positions[23][0], positions[26][1] - positions[24][1]);
    image(img, positions[32][0], positions[32][1], positions[28][0] - positions[30][0], positions[31][1] - positions[29][1]);

  }
}var video;
var button;
var snapshots = [];

function setup() {
  createCanvas(600, 300);
  background(51);
  video = createCapture(VIDEO);
  video.size(240, 240);
  button = createButton('snap');
  button.mousePressed(takesnap);
}

function takesnap() {
  snapshots.push(video.get());
  if (snapshots.length > 20) {
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
}var mic;
var song;
var button;


function preload() {
  img1 = loadImage("images/smlab.jpg");
}
  
function setup() {
  createCanvas(650, 415);
  mic = new p5.AudioIn();
  mic.start();
  button = createButton("play");
  song = loadSound("beatbox.mp3", loaded);
  button.mousePressed(togglePlaying);
}


function togglePlaying() {
  if (!song.isPlaying()) {
    song.play();
    button.html("pause");
  } else {
    song.stop();
    button.html("play");
  }
}

function draw() {
  image(img1, 0, 0);
  var vol = mic.getLevel(); 
  noStroke(0);
  fill(40);
  ellipse(117, 218, 20, 1 + vol * 120);
  ellipse(253, 215, 20, 1 + vol * 110);
  ellipse(390, 215, 20, 1 + vol * 130);
  ellipse(525, 215, 20, 1 + vol * 140);

}

function loaded() {
  console.log("loaded");
}

var mic;
var song;
var button;


function preload() {
  img1 = loadImage("images/smlab.jpg");
}
  
function setup() {
  createCanvas(650, 415);
  mic = new p5.AudioIn();
  mic.start();
  button = createButton("play");
  song = loadSound("beat.mp3", loaded);
  button.mousePressed(togglePlaying);
}


function togglePlaying() {
  if (!song.isPlaying()) {
    song.play();
    button.html("pause");
  } else {
    song.stop();
    button.html("play");
  }
}

function draw() {
  image(img1, 0, 0);
  var vol = mic.getLevel(); 
  noStroke(0);
  fill(40);
  ellipse(117, 218, 20, 1 + vol * 120);
  ellipse(253, 215, 20, 1 + vol * 130);
  ellipse(390, 215, 20, 1 + vol * 120);
  ellipse(525, 215, 20, 1 + vol * 120);

}

function loaded() {
  console.log("loaded");
}

var mic;
var song;
var button;


function preload() {
  img1 = loadImage("images/smlab.jpg");
}
  
function setup() {
  createCanvas(650, 415);
  mic = new p5.AudioIn();
  mic.start();
  button = createButton("play");
  song = loadSound("beatbox.mp3", loaded);
  button.mousePressed(togglePlaying);
}


function togglePlaying() {
  if (!song.isPlaying()) {
    song.play();
    button.html("pause");
  } else {
    song.stop();
    button.html("play");
  }
}

function draw() {
  image(img1, 0, 0);
  var vol = mic.getLevel(); 
  noStroke(0);
  fill(40);
  ellipse(117, 218, 20, 1 + vol * 120);
  ellipse(253, 215, 20, 1 + vol * 110);
  ellipse(390, 215, 20, 1 + vol * 130);
  ellipse(525, 215, 20, 1 + vol * 140);

}

function loaded() {
  console.log("loaded");
}

// Daniel Shiffman
// Code for: https://youtu.be/q2IDNkUws-A

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
  ellipse(50, 75, 25, 25)
  ellipse(150, 75, 25, 25)
  rect(50, 130, 100, 1 + vol * 200);
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
  ellipse(x, y, 60);

  x += random(-50, 50);
  y += random(-50, 50);
  x = constrain(x, 0, width);
  y = constrain(y, 0, height);



}let  data;

function preload(){
  data = loadJSON('https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json');
}
  

function setup() { 
  createCanvas(400, 400);
  background(0);
  createP(data.description);
  createA(data.source,'source');
  for (let i = 0; i < data.tarot_interpretations.length; i++) {
    fill(255);
    textAlign(CENTER);
    text(data.tarot_interpretations[i], random(width),random(height));
  }
  console.log(data);
}
let  data;

function preload(){
  data = loadJSON('https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/zodiac.json');
}
  

function setup() { 
  createCanvas(400, 400);
  background(0);
  createP(data.description);
  createA(data.source');
  for (let i = 0; i < data.gemstones.length; i++) {
    fill(255);
    textAlign(CENTER);
    text(data.gemstones[i], random(width),random(height));
  }
  console.log(data);
}
var portName = '/dev/cu.usbmodem1411';
var option = {
  baudrate: 9600
};
//var data;
//var myPort;
var serial;

var keyboard = ['a', 'w', 's', 'e', 'd', 'f', 't', 'g', 'y', 'h', 'u', 'j', 'k'];
var notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C"];

function setup() {
  createCanvas(400, 400);
  background(200);
  serial = new p5.SerialPort();
  serial.on('data', serialEvent);
  serial.open(portName, 9600);
  
  console.log("asdfsafd");
  
}


function draw() {
  // background(255);

  textAlign(150,300);
  textSize(100);
  //fill(0);
  // println(Serial.list());
  // myPort = new Serial(this, Serial.list()[0], 9600);
}

function keyPressed() {
  background(200);

  for (var i = 0; i < 13; i++) {//searching index
    if (key.toLowerCase() == keyboard[i]) {
      // serial.write(key);//toLowerCase()  
      
      text(notes[i], 170, 220);
    }
  }
}

function serialEvent(){
	console.log(key.toLowerCase());
  serial.write(key.toLowerCase());
  //keyPressed();
}var portName = '/dev/cu.usbmodem1411';
var option = {
  baudrate: 9600
};
//var data;
//var myPort;
var serial;

var keyboard = ['a', 'w', 's', 'e', 'd', 'f', 't', 'g', 'y', 'h', 'u', 'j', 'k'];
var notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C"];

function setup() {
  createCanvas(400, 400);
  background(200);
  // serial = new p5.SeriaaslPort();
  // //serial.on('data', serialEvent);
  // serial.open(portName, 9600);
  
  console.log("asdfsafd");
  

}


function draw() {
  // background(255);

  textAlign(150ㄴㅇ,300);
  textSize(200);

  
  //fill(0);



  // println(Serial.list());
  // myPort = new Serial(this, Serial.list()[0], 9600);
}

function keyPressed() {
  background(200);
  for (var i = 0; i < 13; i++) {
    if (key.toLowerCase() == keyboard[i]) {
      // serial.write(key);//toLowerCase()  
      
      text(notes[i], width/2, height / 2);
    }
  }
}var portName = '/dev/cu.usbmodem1411';
var data;
var myPort;
var serial;

var keyboard = 
  ['a','w','s','e','d','f','t','g','y','h','u','j','k'];
var notes = 
  ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B","C"];

function setup() { 
  createCanvas(400, 400);
  serial = new p5.SerialPort();
  serial.on('data', serialEvent);
  serial.open(portName, options);
  
}


function draw(){
  background(255);
  textAlign(Center, Center);
  textSize(200);
  fill(0);
  
  println(Serial.list());
  myPort = new Serial(this, Serial.list()[0], 9600);
}

function mousePressed() { 
  myPort.write(key);
  background(255);
  
  for(var i=0;i<13;i++){
   if(key == keyboard[i]){
     text(notes[i], width/2, height/2);
     break;
    }
  }      
}

function mousePressed() { 
  myPort.write(key);
  background(255);
  
  for(var i=0;i<13;i++){
   if(key == keyboard[i]){
     text(notes[i], width/2, height/2);
     break;
    }var serial;
var sensorValue = 0;


function setup() { 
  createCanvas(320, 240);
  serial = new p5.SerialPort();
  serial.on('list', printList);
  serial.on('data', serialEvent);
  serial.list();
  serial.open("COM6");
} 

function draw() { 
  background(220);
  fill(255);
  ellipse(sensorValue, height/2, 20, 20);
  text(sensorValue, 20, 20);
}

function printList(portList) {
  for(var i = 0; i < portList.length; i++) {
  println(i + " " + portList[i]);
  }
}
 
function serialEvent() {
  var inString = serial.readLine();
  if (inString.length > 0) {
    inString = inString.trim();
    sensorValue = Number(inString);
  }
  
  if (sensorValue > 350) {
  col = color(255,255,12);
  } else {
  col = color(0,0,0);
  }
}
  
  
  
let serial;
let myPort;

var char note_chars[] = 
  {'a','w','s','e','d','f','t','g','y','h','u','j','k'};
String notes[] = 
  {"C","C#","D","D#","E","F","F#","G","G#","A","A#","B","C"};


function setup() { 
  createCanvas(400, 400);
  serial = new p5.SerialPort;
  background(255);
  textAlign(Center, Center);
  textSize(200);
  fill(0);
  
  println(Serial.list());
  myPort = new Serial(this, Serial.list()[0], 9600);
} 


function mousePressed() { 
  myPort.write(key);
  background(255);
  
  for(int i=0;i<13;i++){
  if(key == note_chars[i]){
    text(notes[i], width/2, height/2);
    break;
    }
  }      
}
import p5.serial;
Serial myPort;

char note_chars[] = 
  {'a','w','s','e','d','f','t','g','y','h','u','j','k'};
String notes[] = 
  {"C","C#","D","D#","E","F","F#","G","G#","A","A#","B","C"};




function setup() { 
  createCanvas(400, 400);
  background(255);
  textAlign(Center, Center);
  textSize(200);
  fill(0);
  
  println(Serial.list());
  myPort = new Serial(this, Serial.list()[0], 9600);
} 

function keyPressed() { 
  myPort.write(key);
  background(255);
  
  for(int i=0;i<13;i++){
  if(key == note_chars[i]){
    text(notes[i], width/2, height/2);
    break;
    }
  }      
}
import p5.serial;
import cc.arduino;

Arduino arduino;
int button = 8, pState = Arduino.LOW;

function setup() { 
  createCanvas(400, 400);
  background(255);
  randomSeed(second());
  
  println(Arduino.list());
  arduino = new Arduino(this. Arduino.list()[0], 57600);
  arduino.pinMode(button, Arduino.INPUT);
} 

function draw() { 
  int state = arduino.digitalRead(button);
  if(pState == Arduino.Low && state == Arduino.HIGH) {
    float radius = random(50,300);
    fill(random(0,255), random(0,255), random(0,255), 20);
    ellipse(mouseX, mouseY, radius, radius);
  }
  pState = state;
}function preload() {
  img = loadImage("colors.jpg");}

function setup() { 
  createCanvas(640, 425);
  c = color(255);
} 

function draw() { 
  image(img, 0, 0);
  strokeWeight(3);
  noStroke();
  fill(c);
  ellipse(25,25,25);
  
function mousePressed() {
  c = get(mouseX, mouseY);
  var rgbValue = c[0] + "," + c[l] + "," + c[2];
  print(rgbValue);
  
  var particle = new Particle();
  particle.callfunction({
    deviceid : '2
    name : 'led',
    argument : rgbValue,
    auth : 
            
    
}let bouncers = []; 
let goalkeeper = [];
let goal = [];


function preload() {
  img1 = loadImage("images/soccer.png"); 
  img2 = loadImage("images/goalkeeper.png"); 
  img3 = loadImage("images/goal.jpg"); 
}

function setup() {
  createCanvas(640, 360);

  for (let i = 0; i < 2; i++) {
    let x = random(width);
    let y = random(height);
    bouncers.push(new Ball(x,y,img1)); 
    goalkeeper.push(new Goalkeeper(50,50,img2));

  }
}

function draw() {
  background(255);
  image(img3, 330, 200, 800, 500);

  
  // Update and display all balls
  for (var i = 0; i < bouncers.length; i++) { // Whatever the length of that array, update and display all of the objects.
    goalkeeper[i].update();
    goalkeeper[i].display();
    bouncers[i].update();
    bouncers[i].display();

  }
}

function mousePressed() {
  // A new ball object
  var b = new Ball(mouseX,mouseY,img1); // Make a new object at the mouse location.
  bouncers.push(b);
  goalkeeper.push(b);

}
let bouncers = []; // We start with an array with just one element.


function setup() {
  createCanvas(640, 360);
  for (let i = 0; i < 2; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(12,32);
    bouncers.push(new Ball(x,y,r));
  }
}

function draw() {
  background(51);
  
  // Update and display all balls
  for (var i = 0; i < bouncers.length; i++) { // Whatever the length of that array, update and display all of the objects.
    bouncers[i].update();
    bouncers[i].display();
  }
}

function mousePressed() {
  // A new ball object
  var b = new Ball(mouseX,mouseY,32); // Make a new object at the mouse location.
  bouncers.push(b);
}let bouncers = []; // We start with an array with just one element.


function setup() {
  createCanvas(640, 360);
  for (let i = 0; i < 2; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(12,32);
    bouncers.push(new Ball(x,y,r));
  }
}

function draw() {
  background(51);
  
  // Update and display all balls
  for (var i = 0; i < bouncers.length; i++) { // Whatever the length of that array, update and display all of the objects.
    bouncers[i].update();
    bouncers[i].display();
  }
}

function mousePressed() {
  // A new ball object
  var b = new Ball(mouseX,mouseY,32); // Make a new object at the mouse location.
  bouncers.push(b);
}let particles = [];

function setup() {
  createCanvas(600, 400);
  let p = new Particle();
  particles.push(p);
} 

function draw() { 
  background(0);
  let p = new Particle();
  particles.push(p);
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].show();
  }
}

class Particle { 
  
  constructor() {
   this.x = 200;
   this.y = 380;
   this.vx = random(-1, 1);
   this.vy = random(-5, -1);
   }
  
  update() {
   this.x += this.vx;
   this.y += this.vy;
   }

  show() {
    stroke(255);
    fill(255,10);
    ellipse(this.x, this.y, 20);
   }
  
  
}

function setup() { 
  createCanvas(600, 700);
} 

function draw() { 
  background(220);
  stroke(255);
  noFill();
  drawCircle(300,200,200);


}

function drawCircle(x, y, d) { 
  ellipse(x,y,d);
  if (d > 2) {
    drawCircle(x + d * 0.25, y, d * 0.5);
    drawCircle(x - d * 0.25, y, d * 0.5);
    drawCircle(x, y + d, d * 0.5);
    drawCircle(x, y, d * 0.5);
  }
  
}

function setup() { 
  createCanvas(600, 400);
} 

function draw() { 
  background(220);
  stroke(255);
  noFill();
  drawCircle(150,50,80);
  drawCircle(100,100,50);
  drawCircle(450,80,20);
  drawCircle(400,80,100);
  drawCircle(300,100,130);
  drawCircle(450,200,20);
  drawCircle(150,350,80);
  drawCircle(400,300,50);
  drawCircle(450,300,20);


}

function drawCircle(x, y, d) { 
  ellipse(x,y,d);
  if (d > 2) {
    drawCircle(x + d * 0.25, y, d * 0.5);
    drawCircle(x - d * 0.25, y, d * 0.5);
    drawCircle(x, y + d, d * 0.3);
    drawCircle(x, y, d * 0.2);
  }
  
}

function setup() { 
  createCanvas(600, 1000);
} 

function draw() { 
  background(220);
  stroke(255);
  noFill();
  drawCircle(300,300,500);


}

function drawCircle(x, y, d) { 
  ellipse(x,y,d);
  if (d > 2) {
    drawCircle(x + d * 0.25, y, d * 0.5);
    drawCircle(x - d * 0.25, y, d * 0.5);
    drawCircle(x, y + d, d * 0.4);
    drawCircle(x, y, d * 0.5);
  }
  
}function setup() { 
  createCanvas(600, 400);
} 

function draw() { 
  background(220);
  stroke(255);
  noFill();
  drawCircle(300,200,300);
}

function drawCircle(x, y, d) { 
  triangle(220,220,220,220,220);
  if (x < width) “
  
  
  
  
}

function setup() { 
  createCanvas(600, 400);
} 

function draw() { 
  background(220);
  stroke(255);
  noFill();
  drawCircle(300,200,3000);
}

function drawCircle(x, y, d) { 
  ellipse(x,y,d);
  if (d > 2) {
    let newD = d * random(0.5, 0.85);
    drawCircle(x + newD / 2, y, newD);
    drawCircle(x - newD / 2, y, newD);
  }
  
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}let x = 0;
let y = 0;
let snowx, snowy;
let snowstate = false;
let textcolor = 220;
let redc, snowc ;
let size = 10; 
let r = 255;
    g = 255;
    b = 255;


function setup() {
  createCanvas(600, 400);
  background(230);

  redx = width / 2;
  redy = height / 2;
  snowx = width / 3 * 2.8;
  snowy = height / 1 * 0.85;
}

function draw() {

  // // caption 
	fill(230, 0, 0);
  textSize(15);
	text("Winter Wonderland", snowx-110, snowy+30);
  
///// rollover on pills
  if(mouseX>snowx-25 && mouseX<snowx+25 && mouseY>snowy-50 && mouseY<snowy+50) {
	snowc = 255 ;    
  } else { 
    snowc = 180; 
  }
  
///// snow button
  fill(0, 153, 0);
  noStroke()
  ellipse(snowx, snowy, 20, 20);
  
  
///// snow
  if (snowstate) {
    if (random(1) > 0.5) {
      fill(217, 217, 217);
    } else {
      fill(217);
      text("*", x, y);
    }
    y += 20;
    if (x > width) {
      background(0);
      x = 0;
      y = 0;
    }
    if (y > height) {
      x += 20;
      y = 0;
    }
  }
}

///// if click the snow button
function mousePressed() {
  if (mouseX>snowx-25 && mouseX<snowx+25 && mouseY>snowy-50 && mouseY<snowy+50) {
    background(30);
    fill(150);
    snowstate = true;
  }
 
}
let y = 0;
let speed = 0;

let bouncing = false;
let x1 = 0;
let x3 = 50;
let x2 = 100;
let recty;
let speedRect;

function setup() {
	createCanvas(600, 400);
  recty = height / 1.1;
  speedRect = 3;

}

function mousePressed() {
  bouncing = !bouncing;
  rect(x1, recty,10,50);
	rect(x2, recty,10,50);
}

function draw() {
  fill(255);
  background(200);
  
  var r = random(255);
  var g = random(255);
  var b = random(255);
  
	fill(r, g, b)
  
	rect(x1, 0,10,50);
	rect(x2, 0,10,50);
  
  fill(255, 0, 0)
  rect(200, 380,200,100);
  noStroke(0)
  
  x1 += speedRect;
  x2 += speedRect;
  x3 += speedRect;
  
  
  if(x1<=0 || (x2+10) >=width)
    speedRect *= -1;  // speedRect = speedRect * -1


  fill(255, 0, 0)
  ellipse(x3, y,60,60);

  if (bouncing) {
    y = y + speed;
    speed = speed + 1;

    if (y == height) {
      //y = height;
      //speed = -0.8 * speed;
      //if (abs(speed) < 1) {
      //  speed = 0;

  ellipse(x, recty, r+2, r*2);
  //x += xspeed;
  //y += yspeed;
  if (x > width - r || x < r) {
    xspeed = -xspeed;
  }
  if (y > height - r || y < r) {
    yspeed = -yspeed;
  }  
    }
  }

}let y = 0;
let speed = 0;

let bouncing = false;
let x1 = 0;
let x2 = 100;
let recty;
let speedRect;

function setup() {
	createCanvas(600, 400);
  recty = height / 1.1;
  speedRect = 3;

}

function mousePressed() {
  bouncing = !bouncing;
  
}

function draw() {
  fill(255);
  background(200);
  
  var r = random(255);
  var g = random(255);
  var b = random(255);
  
  
	fill(r, g, b)
  
	rect(x1, recty,10,50);
	rect(x2, recty,10,50);
  noStroke(0)
  
  x1 += speedRect;
  x2 += speedRect;
  
  if(x1<=0 || (x2+10) >=width)
    speedRect *= -1;  // speedRect = speedRect * -1
//   if (x >= width || (x-100) <= 0) {
//  //     x = -width;
//       speed = -1 * speed;
//       // if (abs(speed) < 1) {
//       //   speed = 0;
//       // }
//   }
  
//   x += speed;

  // x = x + 5;

  
  fill(255, 0, 0)
  ellipse(300, y, 40, 40);

  if (bouncing) {
    y = y + speed;
    speed = speed + 1;

    if (y == height) {
      //y = height;
      //speed = -0.8 * speed;
      //if (abs(speed) < 1) {
      //  speed = 0;
    }
  }

}let y = 0;
let speed = 0;

let bouncing = false;
var x = 0;

function setup() {
	createCanvas(700, 400);

}

function mousePressed() {
  bouncing = !bouncing;
  
  // Kind of longwinded
//   if (bouncing) {
//     bouncing = false;
//   } else {
//     bouncing = true;
//   }
  
//   // Super longwinded
//   if (bouncing == true) {
//     bouncing = false;
//   } else if (bouncing == false) {
//     bouncing = true;
//   } 
}

function draw() {
  fill(255);
  background(250);
  
  var r = random(255);
  var g = random(255);
  var b = random(255);
  
  
	fill(r, g, b)
  
	rect(x, height/1.1,10,50);
	rect(x-100, height/1.1,10,50);
  noStroke(0)
  
  if (x >= width || (x-100) <= 0) {
 /     x = -width;
      speed = -1 * speed;
      if (abs(speed) < 1) {
        speed = 0;
      }
  }

  x = x + 5;

  
  fill(255, 0, 0)
  ellipse(300, y, 40, 40);

  if (bouncing) {
    y = y + speed;
    speed = speed + 1;

    if (y == height) {
      //y = height;
      //speed = -0.8 * speed;
      //if (abs(speed) < 1) {
      //  speed = 0;
    }
  }

}let y = 0;
let speed = 0;

let bouncing = false;
var x = 0;


function setup() {
	createCanvas(400, 400);

}

function mousePressed() {
  bouncing = !bouncing;
  
  // Kind of longwinded
//   if (bouncing) {
//     bouncing = false;
//   } else {
//     bouncing = true;
//   }
  
//   // Super longwinded
//   if (bouncing == true) {
//     bouncing = false;
//   } else if (bouncing == false) {
//     bouncing = true;
//   } 
}

function draw() {
  fill(255);
  background(1);
	fill(280)
	rect(x, height+/50,10,50);
	rect(x-80, height/50,10,50);

  x = x + 6;
  // x = x + 1; // this line is same as above
  // x = x + 5; // faster
  fill(255, 0, 0)
  ellipse(200, y, 40, 40);

  if (bouncing) {
    y = y + speed;
    speed = speed + 1;

    if (y > height) {
      //y = height;
      //speed = -0.8 * speed;
      //if (abs(speed) < 1) {
      //  speed = 0;
    }
  }

}var circleX = 0;
var circleY = 0;


function setup() { 
  createCanvas(500, 500);
  background(255, 254, 250);
  noStroke()
  
  // Compotion
  fill(180);
  rect(50, 60, 10, 420);
  fill(180);
  rect(120, 15, 10, 50);
  fill(180);
  rect(180, 320, 10, 160);
  rect(320, 10, 10, 460);
  rect(480, 15, 10, 470);
  rect(400, 190, 10, 130);
  rect(5, 60, 480, 10);
  rect(5, 180, 45, 10);
  rect(330, 180, 150, 10);
  rect(5, 375, 500, 10);
  rect(50, 430, 270, 10);
  rect(50, 320, 480, 10);
  rect(180, 460, 300, 10);
  
  // Red Rectangle
  fill(200);
  rect(60, 70, 260, 250);
  
  // Yellow Rectangle(right)
  fill(220);
  rect(330, 70, 150, 110); 
  fill(230);
  rect(330, 10, 150, 50);
  
  // Blue Rectangle
  fill(190);
  rect(330, 385, 150, 75);
  
  // Yellow Rectangle(Left)
  fill(240);
  rect(5, 385, 45, 95);

  // Red Rectangle(Right)
  fill(210);
  rect(490, 385, 45, 95);

  // Black Rectangle(left)
  fill(180);
  rect(60, 330, 120, 100);
  
  // Black Rectangle(Right)
  fill(190);
  rect(190, 440, 130, 20);
  
} 


function mousePressed() {
  background(250, 70);
  let r = random(255);
  let g = random(255);
  let b = random(255);
  
  
  // Compotion
  noStroke()
  rect(50, 60, 10, 420);
  rect(120, 15, 10, 50);
  rect(180, 320, 10, 160);
  rect(320, 10, 10, 460);
  rect(480, 15, 10, 470);
  rect(400, 190, 10, 130);
  rect(5, 60, 480, 10);
  rect(5, 180, 45, 10);
  rect(330, 180, 150, 10);
  rect(5, 375, 500, 10);
  rect(50, 430, 270, 10);
  rect(50, 320, 480, 10);
  rect(180, 460, 300, 10);
  
  // Red Rectangle (Random Color)
  fill(r, g, b, 130, 70);
  rect(60, 70, 260, 250);
  
  // Yellow Rectangle (Random Color)
  fill(r, g, b, 150, 90);
  rect(330, 70, 150, 110); 
  fill(r, g, b, 80, 50);
  rect(330, 10, 150, 50);
  
  // Blue Rectangle (Random Color)
  fill(r, g, b, 150, 80);
  rect(330, 385, 150, 75);
  
  // Yellow Rectangle (Random Color)
  fill(r, g, b, 80, 50);
  rect(5, 385, 45, 95);

  // Red Rectangle (Random Color)
  fill(r, g, b, 80, 50);
  rect(490, 385, 45, 95);

  // Black Rectangle (Random Color)
  fill(r, g, b, 255, 190);
  rect(60, 330, 120, 100);
  
  // Black Rectangle (Random Color)
  fill(r, g, b, 80, 50);
  rect(190, 440, 130, 20);
  
  fill (0, 100, 255);
  
}
  

function draw() {
  
  noStroke()
  rect(mouseX, mouseY, 5, 5, 100);
  fill(5);
  let r = random(255);
  let g = random(255);
  let b = random(255);
  background(500,5);
  
  fill(r,g,b);
  var x = random(0, width);
  var y = random(0, height);
  ellipse(x,y,5,5);
  
  fill(r,g,b, 50, 50);
  
  rect(-circleX, 60, 300, 10);
  circleX = circleX + 5;
  
  rect(circleX, 320, 150, 10);
  circleX = circleX + 5;

  rect(320, -circleY, 10, 380);
  circleY = circleY + 5;

  rect(50, -circleY, 10, 100);
  circleY = circleY + 1;

  rect(50, -circleY, 10, 100);
  circleY = circleY + 1;
  
  rect(50, circleY + 300, 10, 250);
  circleY = circleY + 1;
  
}

var value = 0;
var angle = 0;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  rectMode(CENTER);
  //ellipseMode(CENTER);
  //noStroke();
}

function draw() {
  //background(64, 64, 64);



  if (mouseIsPressed) {
    //background(64, 64, 64);
    stroke(0);
    fill(255);
    push();
    translate(200, 200);
    rotate(-angle);
    fill(51, 0, 51);
    rect(0, 0, 450, 450);

    pop();

    fill(255);
    push();
    translate(200, 200);
    rotate(angle);
    fill(51, 0, 102);
    rect(0, 0, 400, 400);

    pop();

    fill(255);
    push();
    translate(200, 200);
    rotate(-angle);
    fill(76, 0, 153);
    rect(0, 0, 350, 350);

    pop();

    fill(255);
    push();
    translate(200, 200);
    rotate(angle);
    fill(102, 0, 204);
    rect(0, 0, 300, 300);

    pop();

    fill(255);
    push();
    translate(200, 200);
    rotate(-angle);
    fill(127, 0, 255);
    rect(0, 0, 250, 250);

    pop();

    fill(255);
    push();
    translate(200, 200);
    rotate(angle);
    fill(153, 51, 255);
    rect(0, 0, 200, 200);

    pop();

    fill(255);
    push();
    translate(200, 200);
    rotate(-angle);
    fill(178, 102, 255);
    rect(0, 0, 150, 150);

    pop();

    fill(255);
    push();
    translate(200, 200);
    rotate(angle);
    fill(204, 153, 255);
    rect(0, 0, 100, 100);

    pop();

    fill(255);
    push();
    translate(200, 200);
    rotate(-angle);
    fill(229, 204, 255);
    rect(0, 0, 50, 50);

    pop();

  } else {
    noStroke();
    fill(255);
    push();
    translate(200, 200);
    rotate(angle);
    fill(51, 0, 51);
    rect(0, 0, 450, 450);

    pop();

    fill(255);
    push();
    translate(200, 200);
    rotate(-angle);
    fill(51, 0, 102);
    rect(0, 0, 400, 400);

    pop();

    fill(255);
    push();
    translate(200, 200);
    rotate(angle);
    fill(76, 0, 153);
    rect(0, 0, 350, 350);

    pop();

    fill(255);
    push();
    translate(200, 200);
    rotate(-angle);
    fill(102, 0, 204);
    rect(0, 0, 300, 300);

    pop();

    fill(255);
    push();
    translate(200, 200);
    rotate(angle);
    fill(127, 0, 255);
    rect(0, 0, 250, 250);

    pop();

    fill(255);
    push();
    translate(200, 200);
    rotate(-angle);
    fill(153, 51, 255);
    rect(0, 0, 200, 200);

    pop();

    fill(255);
    push();
    translate(200, 200);
    rotate(angle);
    fill(178, 102, 255);
    rect(0, 0, 150, 150);

    pop();

    fill(255);
    push();
    translate(200, 200);
    rotate(-angle);
    fill(204, 153, 255);
    rect(0, 0, 100, 100);

    pop();

    fill(255);
    push();
    translate(200, 200);
    rotate(angle);
    fill(229, 204, 255);
    rect(0, 0, 50, 50);

    pop();
  }
  angle = angle + 2;
}var circleX = 0;
var circleY = 0;


function setup() { 
  createCanvas(500, 500);
  background(255, 254, 250);
  noStroke()
  
  // Compotion
  fill(180);
  rect(50, 60, 10, 420);
  fill(180);
  rect(120, 15, 10, 50);
  fill(180);
  rect(180, 320, 10, 160);
  rect(320, 10, 10, 460);
  rect(480, 15, 10, 470);
  rect(400, 190, 10, 130);
  rect(5, 60, 480, 10);
  rect(5, 180, 45, 10);
  rect(330, 180, 150, 10);
  rect(5, 375, 500, 10);
  rect(50, 430, 270, 10);
  rect(50, 320, 480, 10);
  rect(180, 460, 300, 10);
  
  // Red Rectangle
  fill(200);
  rect(60, 70, 260, 250);
  
  // Yellow Rectangle(right)
  fill(220);
  rect(330, 70, 150, 110); 
  fill(230);
  rect(330, 10, 150, 50);
  
  // Blue Rectangle
  fill(190);
  rect(330, 385, 150, 75);
  
  // Yellow Rectangle(Left)
  fill(240);
  rect(5, 385, 45, 95);

  // Red Rectangle(Right)
  fill(210);
  rect(490, 385, 45, 95);

  // Black Rectangle(left)
  fill(180);
  rect(60, 330, 120, 100);
  
  // Black Rectangle(Right)
  fill(190);
  rect(190, 440, 130, 20);
  
} 


function mousePressed() {
  background(250, 70);
  let r = random(255);
  let g = random(255);
  let b = random(255);
  
  
  // Compotion
  noStroke()
  rect(50, 60, 10, 420);
  rect(120, 15, 10, 50);
  rect(180, 320, 10, 160);
  rect(320, 10, 10, 460);
  rect(480, 15, 10, 470);
  rect(400, 190, 10, 130);
  rect(5, 60, 480, 10);
  rect(5, 180, 45, 10);
  rect(330, 180, 150, 10);
  rect(5, 375, 500, 10);
  rect(50, 430, 270, 10);
  rect(50, 320, 480, 10);
  rect(180, 460, 300, 10);
  
  // Red Rectangle (Random Color)
  fill(r, g, b, 130, 70);
  rect(60, 70, 260, 250);
  
  // Yellow Rectangle (Random Color)
  fill(r, g, b, 150, 90);
  rect(330, 70, 150, 110); 
  fill(r, g, b, 80, 50);
  rect(330, 10, 150, 50);
  
  // Blue Rectangle (Random Color)
  fill(r, g, b, 150, 80);
  rect(330, 385, 150, 75);
  
  // Yellow Rectangle (Random Color)
  fill(r, g, b, 80, 50);
  rect(5, 385, 45, 95);

  // Red Rectangle (Random Color)
  fill(r, g, b, 80, 50);
  rect(490, 385, 45, 95);

  // Black Rectangle (Random Color)
  fill(r, g, b, 255, 190);
  rect(60, 330, 120, 100);
  
  // Black Rectangle (Random Color)
  fill(r, g, b, 80, 50);
  rect(190, 440, 130, 20);
  
  fill (0, 100, 255);
  
}
  
function draw() {
  
  noStroke()
  rect(mouseX, mouseY, 5, 5, 100);
  fill(5);
  /let r = random(255);
  let g = random(255);
  let b = random(255);
  background(500,5);
  
  fill(r,g,b);
  var x = random(0, width);
  var y = random(0, height);
  ellipse(x,y,5,5);
  
  fill(r,g,b, 50, 50);
  
  rect(-circleX, 60, 300, 10);
  circleX = circleX + 5;
  
  rect(circleX, 320, 150, 10);
  circleX = circleX + 5;


  rect(320, -circleY, 10, 380);
  circleY = circleY + 5;
  

  rect(50, -circleY, 10, 100);
  circleY = circleY + 1;
  

  rect(50, -circleY, 10, 100);
  circleY = circleY + 1;
  
  
  rect(50, circleY + 300, 10, 250);
  circleY = circleY + 1;
  
}

function setup() { 
  createCanvas(500, 520);
  background(255, 254, 250);
  noStroke()
  
  // Compotion
  fill(30);
  rect(50, 60, 10, 420);
  fill(30);
  rect(120, 15, 10, 50);
  fill(30);
  rect(180, 320, 10, 160);
  rect(320, 10, 10, 460);
  rect(480, 15, 10, 470);
  rect(400, 190, 10, 130);
  rect(5, 60, 480, 10);
  rect(5, 180, 45, 10);
  rect(330, 180, 150, 10);
  rect(5, 375, 500, 10);
  rect(50, 430, 270, 10);
  rect(50, 320, 480, 10);
  rect(180, 460, 300, 10);
  
  // Red Rectangle
  fill(200, 2, 15);
  rect(60, 70, 260, 250);
  
  // Yellow Rectangle(right)
  fill(255, 204, 0);
  rect(330, 70, 150, 110); 
  fill(255, 204, 0);
  rect(330, 10, 150, 50);
  
  // Blue Rectangle
  fill(0, 51, 204);
  rect(330, 385, 150, 75);
  
  // Yellow Rectangle(Left)
  fill(255, 204, 0);
  rect(5, 385, 45, 95);

  // Red Rectangle(Right)
  fill(200, 2, 15);
  rect(490, 385, 45, 95);

  // Black Rectangle(left)
  fill(20);
  rect(60, 330, 120, 100);
  
  // Black Rectangle(Right)
  fill(20);
  rect(190, 440, 130, 20);
  
}

function mousePressed() {
  background(10);
}

function draw() { 
  // Red Rectangle
  fill(10, 2, 15);

  let r = random(255);
  var g = random(255);
  let b = random(255);

  fill(r, g, b, 30);
  rect(60, 70, 260, 250);

/
//rect(330, 70, 150, 110); 
  rect(330, 10, 150, 50);
  rect(490, 385, 45, 95);
  
} 

function setup() { 
  createCanvas(500, 520);
} 

function draw() { 
  background(255, 254, 250);
  noStroke()
  
  // Compotion
  fill(30);
  rect(50, 60, 10, 420);
  fill(30);
  rect(120, 15, 10, 50);
  fill(30);
  rect(180, 320, 10, 160);
  rect(320, 10, 10, 460);
  rect(480, 15, 10, 470);
  rect(400, 190, 10, 130);
  rect(5, 60, 480, 10);
  rect(5, 180, 45, 10);
  rect(330, 180, 150, 10);
  rect(5, 375, 500, 10);
  rect(50, 430, 270, 10);
  rect(50, 320, 480, 10);
  rect(180, 460, 300, 10);
  
  // Red Rectangle
  fill(200, 2, 15);
  rect(60, 70, 260, 250);
  
  // Yellow Rectangle(right)
  fill(255, 204, 0);
  rect(330, 70, 150, 110); 
  fill(255, 204, 0);
  rect(330, 10, 150, 50);
  
  // Blue Rectangle
  fill(0, 51, 204);
  rect(330, 385, 150, 75);
  
  // Yellow Rectangle(Left)
  fill(255, 204, 0);
  rect(5, 385, 45, 95);

  // Red Rectangle(Right)
  fill(200, 2, 15);
  rect(490, 385, 45, 95);

  // Black Rectangle(left)
  fill(20);
  rect(60, 330, 120, 100);
  
  // Black Rectangle(Right)
  fill(20);
  rect(190, 440, 130, 20);

  // Black Fly
  fill(20);
  ellipse(mouseX, mouseY, 10, 10);
} 

