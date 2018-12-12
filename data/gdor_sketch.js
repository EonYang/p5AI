// Declare a "SerialPort" object
var serial; // variable to hold an instance of the serialport library
//var portName = '/dev/cu.usbmodem14111'; // fill in your serial port name here
var inData; // for incoming serial data
var outByte = [];

var video;
var vScale = 13;
var led = [];

function setup() {
  createCanvas(820, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width / vScale, height / vScale);
  frameRate(5);
  //   for (var i = 0; i < 256; i++) {  
  //   }

  smooth(); // antialias drawing lines
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  //serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing
  serial.open("/dev/cu.usbmodem1411", {
    baudrate: 9600
  });
//   setInterval(function() {
//     			console.log("writing: " + led.length);

//     for (var i = 0; i < led.length; i++) {
// 			serial.write(led[i]);
//     }
//       //serial.write(outByte);
//     //console.log(outByte)
//   }, 1500);
}

function serialEvent() {
  // read a byte from the serial port
}

// function printList(portList) {
//   // portList is an array of serial port names
//   for (var i = 0; i < portList.length; i++) {
//     // Display the list the console:
//     console.log(i + " " + portList[i]);
//   }
// }

function serverConnected() {
  console.log('connected to server.');
}

function portOpen() {
  console.log('the serial port opened.')
}

function serialError(err) {
  println('Something went wrong with the serial port. ' + err);
}

function portClose() {
  println('The serial port closed.');

}

function draw() {
  background(25);
  led.length = 0;
  video.loadPixels();
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var index = (video.width - x + 1 + (y * video.width))*4;
      var r = video.pixels[index+0];
      var g = video.pixels[index+1];
      var b = video.pixels[index+2];

      
      var bright = (r + g + b) / 3;
      //  led.push(bright);
      var w = map(bright, 0, 255, 0, vScale);
     // var br = map(bright, 0, 255, 0, 200);
     led.push(bright);
      // led.push(128);
      noStroke();
      colorMode(RGB);
      ellipseMode(CENTER);
      ellipse(x * vScale, y * vScale, w, w);
    }
  }
  
  console.log("writing: " + led.length);
  // serial.write(255);
   for (var i = 0; i < 756; i++) {
     //console.log(floor(led[i]));
   serial.write(floor(led[i]));
   }
	
  //outByte = int(led);
  //console.log(outByte);




}// Declare a "SerialPort" object
var serial; // variable to hold an instance of the serialport library
//var portName = '/dev/cu.usbmodem14111'; // fill in your serial port name here
var inData; // for incoming serial data
var outByte = [];

var video;

var led = [];
let matrixScale = 4;

let vScale = 1*matrixScale;

function setup() {
      createCanvas(88*matrixScale, 165*matrixScale);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width, height);
  noStroke();
  // background(0);
  colorMode(HSB, 360, 100, 100, 1)


smooth(); // antialias drawing lines
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  //serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing
  serial.open("/dev/cu.usbmodem14411", {
    baudrate: 230400
  });
  setInterval(function() {
    serial.write(outByte);
    console.log(outByte)
  }, 1500);
}

function serialEvent() {
  // read a byte from the serial port
}

// function printList(portList) {
//   // portList is an array of serial port names
//   for (var i = 0; i < portList.length; i++) {
//     // Display the list the console:
//     console.log(i + " " + portList[i]);
//   }
// }

function serverConnected() {
  console.log('connected to server.');
}

function portOpen() {
  console.log('the serial port opened.')
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');

}

function draw() {
  led = [];
  video.loadPixels();
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var index = (video.width - x + 1 + (y * video.width))*4;
      var r = video.pixels[index+0];
      var g = video.pixels[index+1];
      var b = video.pixels[index+2];

      
      var bright = (r + g + b) / 3;
      led.push(bright);
      
      // var w = map(bright,0,255,0, vScale);
      
      
      // fill(200,bright,100);
      fill(200,100-bright,100); 
      rectMode(CENTER);
      if(x%(10*matrixScale) == 0 && y%10 == 0) {
        ellipse(x,y,vScale,vScale);
      }
      
//       pixels[index + 0] = bright;
//       pixels[index + 1] = bright;
//       pixels[index + 2] = bright;
//       pixels[index + 3] = 255;

    }
  }
  video.updatePixels();
  outByte = int(led);

}let video;



let matrixScale = 4;

let vScale = 1*matrixScale;

function setup() {
      createCanvas(88*matrixScale, 165*matrixScale);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width, height);
  noStroke();
  // background(0);
  colorMode(HSB, 360, 100, 100, 1)
}

function draw() {
  video.loadPixels();
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var index = (video.width - x + 1 + (y * video.width))*4;
      var r = video.pixels[index+0];
      var g = video.pixels[index+1];
      var b = video.pixels[index+2];

      
      var bright = (r + g + b) / 3;
      
      // var w = map(bright,0,255,0, vScale);
      
      
      // fill(200,bright,100);
      fill(200,100-bright,100); 
      rectMode(CENTER);
      if(x%(10*matrixScale) == 0 && y%10 == 0) {
        ellipse(x,y,vScale,vScale);
      }
      
//       pixels[index + 0] = bright;
//       pixels[index + 1] = bright;
//       pixels[index + 2] = bright;
//       pixels[index + 3] = 255;

    }
  }
  video.updatePixels();
}let patch;
let scary;

let scaryX = 50;
let scaryY = 330;


function preload() {
  patch = createImg('patch.jpg');
  scary = createImg('scary.png');
  pie = createImg('pie.png');
  oven = createImg('oven.png');

  patch.hide();
  scary.hide();
  pie.hide();
  oven.hide();
}

function setup() {
  createCanvas(800, 500);
}

function draw() {
  background(220);
  image(oven, 570, 170, 200, 160);

  image(patch, 0, 0);
  image(scary, scaryX, scaryY);

  if (mouseIsPressed && mouseX >= 50 && mouseX <= width && mouseY >= 0 && mouseY <= height - 50) {
    // for (let i = 0; i <= width;i++) {
    scaryX = mouseX;
    scaryY = mouseY;
    // }
  } else {
    scaryX = 50;
    scaryY = 330;
  }
  if (scaryX >= 570 && scaryX <= 770 && scaryY >= 100 && scaryY <= 330) {
    image(pie, -100, -20);
  }
}let video;

let vScale = 16;

function setup() {
  createCanvas(600, 800);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale);
}

function draw() {
  video.loadPixels();
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var index = (video.width - x + 1 + (y * video.width))*4;
      var r = video.pixels[index+0];
      var g = video.pixels[index+1];
      var b = video.pixels[index+2];

      
      var bright = (r + g + b) / 3;
      
      // var w = map(bright,0,255,0, vScale);
      
      
      
      fill(bright);
      rectMode(CENTER);
      ellipse(x*vScale,y*vScale,vScale,vScale);
      
      pixels[index + 0] = bright;
      pixels[index + 1] = bright;
      pixels[index + 2] = bright;
      pixels[index + 3] = 255;

    }
  }
  video.updatePixels();
}//Nothing on this project really worked out for me

//I originally wanted to use this effect from seriously.js
// http://brianchirls.github.io/Seriously.js/examples/blur/whip.html
//Couldn't get it to work, no documentation for it on the github, but it was on his site?

//I wanted to blur the mirror but have two issues
// 1) Can't get the mirror to display properly
// 2) It just does this weird effect behind the mirror, not actually blurring the mirror
let video;
let vScale = 16;
let slider;

let cols=40;

let rows=30;

function setup() {
  createCanvas(800, 600);
  pixelDensity(1);
  video = createCapture(VIDEO);
 	video.id('p5video');
  video.size(cols,rows);
  slider = createSlider(0,255,77);   

  // slider = createSlider(0, 1, 0.1, 0.01);
  // slider.id("slider");
  canvas = createCanvas(640, 480, WEBGL);
	canvas.id('p5canvas');
}
function blur(){
  var seriously = new Seriously();

  var src = seriously.source('#p5canvas');

  var target = seriously.target('#p5canvas');

	var blur = seriously.effect('blur');
  
  blur.source = src;
  target.source = blur; 
  
	seriously.go();
}
function draw() {
    blur();

  video.loadPixels();
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var index = (video.width - x + 1 + (y * video.width))*4;
      var r = video.pixels[index+0];
      var g = video.pixels[index+1];
      var b = video.pixels[index+2];

      
      var bright = (r + g + b) / 3;
      
      var threshold = slider.value();
      
      if (bright  >threshold){
       	fill(255); 
    	}else{
      	fill(0);
      }
      rectMode(CENTER);
      ellipse(x*vScale,y*vScale,vScale,vScale);
      noStroke();
      
      pixels[index + 0] = bright;
      pixels[index + 1] = bright;
      pixels[index + 2] = bright;
      pixels[index + 3] = 255;

    }
  }
  
  video.updatePixels()
  // video.id();
  
}







let video;

let vScale = 16;

function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale);
}

function draw() {
  video.loadPixels();
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var index = (video.width - x + 1 + (y * video.width))*4;
      var r = video.pixels[index+0];
      var g = video.pixels[index+1];
      var b = video.pixels[index+2];

      
      var bright = (r + g + b) / 3;
      
      // var w = map(bright,0,255,0, vScale);
      
      
      
      fill(bright);
      rectMode(CENTER);
      rect(x*vScale,y*vScale,vScale,vScale);
      
      pixels[index + 0] = bright;
      pixels[index + 1] = bright;
      pixels[index + 2] = bright;
      pixels[index + 3] = 255;

    }
  }
  video.updatePixels();
}var video;
var vScale = 16;

var particles = [];

let slider;

function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale);
  for (var i = 0; i < 200; i++) {
    particles[i] = new Particle(random(width),random(height));
  }
  slider = createSlider(0, 255, 127);
  background(51);
}

function draw() {
  video.loadPixels();
  for(var i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].show();
  }
}let video;

let vScale = 16;
let slider;

let cols=40;

let rows=30;

function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(cols,rows);
  slider = createSlider(0,255,77);   
}

function draw() {
  video.loadPixels();
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var index = (video.width - x + 1 + (y * video.width))*4;
      var r = video.pixels[index+0];
      var g = video.pixels[index+1];
      var b = video.pixels[index+2];

      
      var bright = (r + g + b) / 3;
      
      var threshold = slider.value();
      
      if (bright  >threshold){
       	fill(255); 
    	}else{
      	fill(0);
      }
      rectMode(CENTER);
      ellipse(x*vScale,y*vScale,vScale,vScale);
      noStroke();
      
      pixels[index + 0] = bright;
      pixels[index + 1] = bright;
      pixels[index + 2] = bright;
      pixels[index + 3] = 255;

    }
  }
  video.updatePixels();
}let video;

let vScale = 16;

function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale);
}

function draw() {
  video.loadPixels();
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var index = (video.width - x + 1 + (y * video.width))*4;
      var r = video.pixels[index+0];
      var g = video.pixels[index+1];
      var b = video.pixels[index+2];

      
      var bright = (r + g + b) / 3;
      
      // var w = map(bright,0,255,0, vScale);
      
      
      
      fill(bright);
      rectMode(CENTER);
      rect(x*vScale,y*vScale,vScale,vScale);
      
      pixels[index + 0] = bright;
      pixels[index + 1] = bright;
      pixels[index + 2] = bright;
      pixels[index + 3] = 255;

    }
  }
  video.updatePixels();
}function setup() {
  createCanvas(320, 240);
  pixelDensity(1);
}

function draw() {
	background(51);

	loadPixels();
  
  
	for (var y = 0; y < height; y++){
		for (var x = 0; x< width; x++){
      var index = (x+ y * width) * 4;
//         var currentRed = pixels[(x+y*width)*4];
//         var currentGreen = pixels[((x+y*width)*4)+1];
//         var currentBlue = pixels[((x+y*width)*4) +2];
      
//       	set(x,y[currentBlue,currentGreen,currentRed,255]);
      
      	pixels[index+0] = x;
        pixels[index+1] = random(255);
        pixels[index+2] = y;
        pixels[index+3] = 255;
  
    }
  }
  updatePixels();
}

let video;
let button;
let snapshots = [];
let counter = 0;


function setup() {
  createCanvas(600,240);
  background(51);
  video = createCapture(VIDEO, ready);
  video.size(600,240);
}

let go = false;

function ready(){
	go = true; 
}


function draw() {
  if (go){
  	snapshots[counter] = video.get();
    counter++;
    if(counter == 40){
    	counter= 0;
  	}
  }
  var w = 80;
  var h = 60;
  var x = 0;
  var y = 0;
  for (var i = 0; i < snapshots.length; i++){
  	// tint(255,50);
    var index = (i + frameCount) % snapshots.length;
    image(snapshots[index],x,y,w,h);
    x=x+w;
    if(x>width){
    	x=0;
      y=y+h;
    }
    
  }
}let video;
let button;
let snapshots = [];
let counter = 0;


function setup() {
  createCanvas(600,240);
  background(51);
  video = createCapture(VIDEO, ready);
  video.size(600,240);
}

let go = false;

function ready(){
	go = true; 
}


function draw() {
  if (go){
  	snapshots[counter] = video.get();
    counter++;
    if(counter == 40){
    	counter= 0;
  	}
  }
  var w = 80;
  var h = 60;
  var x = 0;
  var y = 0;
  for (var i = 0; i < snapshots.length; i++){
  	// tint(255,50);
    var index = (i + frameCount) % snapshots.length;
    image(snapshots[index],x,y,w,h);
    x=x+w;
    if(x>width){
    	x=0;
      y=y+h;
    }
    
  }
}// M_2_3_01
//
// Generative Gestaltung – Creative Coding im Web
// ISBN: 978-3-87439-902-9, First Edition, Hermann Schmidt, Mainz, 2018
// Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
// with contributions by Joey Lee and Niels Poldervaart
// Copyright 2018
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * draws an amplitude modulated oscillator
 *
 * KEYS
 * i                 : toggle draw info signal
 * c                 : toggle draw carrier signal
 * 1/2               : info signal frequency -/+
 * arrow left/right  : info signal phi -/+
 * 7/8               : carrier signal frequency -/+ (modulation frequency)
 * s                 : save png
 */
'use strict';

var sketch = function( p ) {

  var pointCount = 600;
  var freq = 2;
  var phi = 0;
  var modFreq = 12;

  var drawFrequency = true;
  var drawModulation = true;
  var drawCombination = true;

  var angle;
  var y;

  p.setup = function() {
    p.createCanvas(p.windowWidth,800);
    p.noFill();
    pointCount = p.width;
  };

  p.draw = function() {
    p.background(255);
    p.strokeWeight(1);

    p.translate(0, p.height / 2);

    // draw oscillator with freq and phi
    if (drawFrequency) {
      p.beginShape();
      for (var i = 0; i <= pointCount; i++) {
        angle = p.map(i, 0, pointCount, 0, p.TAU);
        y = p.sin(angle * freq + p.radians(phi));
        y *= p.height / 4;
        p.vertex(i,y);
      }
      p.endShape();
    }

    // draw oscillator with modFreq
    if (drawModulation) {
      p.stroke(0,130,164,128);
      p.beginShape();
      for (var i = 0; i <= pointCount; i++) {
        angle = p.map(i, 0, pointCount, 0, p.TAU);
        y = p.cos(angle * modFreq);
        y *= p.height / 4;
        p.vertex(i,y);
      }
      p.endShape();
    }

    // draw both combined
    p.stroke(0);
    p.strokeWeight(2);
    p.beginShape();
    for (var i = 0; i <= pointCount; i++) {
       angle = p.map(i, 0, pointCount, 0, p.TAU);
       var info = p.sin(angle * freq + p.radians(phi));
       var carrier = p.cos(angle * modFreq);
       y = info * carrier;
       y *= p.height / 4;
       p.vertex(i,y);
    }
    p.endShape();
  };

  p.keyPressed = function() {
    if (p.key == 's' || p.key == 'S') p.saveCanvas(gd.timestamp(), 'png');

    if (p.key == 'i' || p.key == 'I') drawFrequency = !drawFrequency;
    if (p.key == 'c' || p.key == 'C') drawModulation = !drawModulation;

    if (p.key == '1') freq--;
    if (p.key == '2') freq++;
    freq = p.max(freq,1);

    if (p.keyCode == p.LEFT_ARROW) phi -= 15;
    if (p.keyCode == p.RIGHT_ARROW) phi += 15;

    if (p.key == '7') modFreq--;
    if (p.key == '8') modFreq++;
    modFreq = p.max(modFreq,1);

    console.log("freq: " + freq + ", phi: " + phi + ", modFreq: " + modFreq);
  };

};

var myp5 = new p5(sketch);
function setup() {
  createCanvas(400, 400);
   loadJSON("https://dog.ceo/api/breeds/list/all", gotData);
}

function draw() {
}
function gotData(data) {
 	for (let i = 0; i < data.length; i++) {
    print(data.message[i].object);
  }
}let thediv;
let noOne;
let h1;
let button;
let dogA1; let dogA2; let dogB1; let dogB2;


function setup() {
  

  //setInterval(function(){ alert("dogs"); }, 5000);
 
  dogA1 = select('#cellA1');
  dogA1.mousePressed(goodDogA1);

  dogA2 = select('#cellA2');
  dogA2.mousePressed(goodDogA2);
  
  dogB1 = select('#cellB1');
  dogB1.mousePressed(goodDogB1);
  
  dogB2 = select('#cellB2');
  dogB2.mousePressed(goodDogB2);
  
 	// cellA1 = select('#cellA1')
 	// cellA1.mousePressed(alert("good dog"));

  let textSizer;
  createCanvas(800, 800);
  background(220);


}
function vidLoad() {
  vid.play();
}
function goodDogA1(){
	alert("good dog, it is akita");
}
function goodDogA2(){
	alert("good dog, this is the fat beagle");
}
function goodDogB1(){
	alert("bad dog, this is the ugliest dog");
}
function goodDogB2(){
	alert("GOOD dog,everyone loves baby pugs");
  vid = createVideo(['dog.mp4'], vidLoad);
  vid.volume(0.3);
}
function mousePressed(){
	// theotherdiv = createDiv("No one cares")
	// two.html('You answered');
}
function draw() {
   loadJSON("https://dog.ceo/api/breeds/list/all", gotData);
}
function gotData(data) {
 	// for (let i = 0; i < data.length; i++) {
    console.log(data);
  // }
}var serial;
var mcd = {};
var logData = false;

function setup() {
  createCanvas(400, 400);
  
  serial = new p5.SerialPort();
	serial.on('list', printList);  
  //serial.on('connected', serverConnected); // callback for connecting to the server
  //serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  //serial.on('close', portClose);      // callback for the port closing
}


function serialEvent() {
  print("Got data");
    	var input = serial.readLine(); 
    	if (input.length > 0){
    		print(input);
        var parts = input.split(',');
        print(parts);
        if(parts.length==3){
          print("Data looks good...")
        }
    	}
}

function draw() {
  background(220);
}

function printList(portList) {
  for (var i=0; i<portList.length; i++) {
    var p = portList[i];
		if (p.indexOf('usbmodem') > -1) {
      print(p + " looks like the Arduino serial port");
      serial.open(p, {baudrate: 9600});
    }
  }
}


function serialError(err) {
  println('Issue: ' + err);
}
 
function portClose() {
  println('The serial port closed.');
}

function println(p) { print(p); }

var serial; // variable to hold an instance of the serialport library 
var portName = '/dev/cu.usbmodem1411';  // fill in your serial port name here
var inData = 0;                             // for incoming serial data


function setup() {
  createCanvas(600,400);
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  //serial.on('connected', serverConnected); // callback for connecting to the server
  // serial.on('open', portOpen);        // callback for the port opening
	serial.on('data', serialEvent);     // callback for when new data arrives
	serial.on('error', serialError);    // callback for errors
	//serial.on('close', portClose);      // callback for the port closing
 
  // serial.list();                      // list the serial ports
  //serial.open(portName);              // open a serial port
}
	function SerialEvent(){
		print("Got data");
    	var input = serial.readLine(); 
    	if (input.length > 0){
    		print(input);
        var parts = input.split(',');
        print(parts);
    	}
 }

function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 var p = portList[i];
  print(p);
   if (p.indexOf('usbmodem') > -1){
    print( p + " looks like the Arduino serial port");
     serial.open(p, { baudrate: 9600});
   }
 }
}
let lines = [];

let i =0;

function setup() {
  createCanvas(400, 400);
  loadJSON("nameage.json", gotData);

}

gotData(data){
	for (let i =0; i < data.length; i++){
			
	}
}

function draw() {
  background(255);
}

function mousePressed(){
	i++;
  console.log(lines[i]);
}let lines = [];

let i =0;

function setup() {
  createCanvas(400, 400);

	loadStrings("lines.txt", doText);

}

function doText(data){
  lines = data;
}

function draw() {
  background(255);
  // for(let i = 0; i < lines.length; i++){
  	
    text(lines[i],5,20*i+20);
  // }
}

function mousePressed(){
	i++;
  console.log(lines[i]);
}function setup() {
  createCanvas(400, 400);
	setTimeout(drawSomething, 2000);
}

function drawSomething(){
	ellipse(width/2,height/2,50,50);
}

function draw() {
  //background(220);
}function setup() {
  noCanvas();
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  text("gilad's version", mouseX, mouseY);
}function setup() {
}

function draw() {
}var serial; // variable to hold an instance of the serialport library 
var portName = '/dev/cu.usbmodem1411';  // fill in your serial port name here
var inData = 0;                             // for incoming serial data


function setup() { 
  createCanvas(600, 600);
  noFill();
  strokeWeight(10);

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

function draw() { 
  background(127, 0, 127);
  
  var v = inData; 

  // Left Eye
  ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);

  // Right Eye
  ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
	
  // Mouth
  bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
  
  v+=random(-5, 5);
  // Nose
  bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);

}
function setup() { 
  createCanvas(600, 600);
  noFill();
  strokeWeight(10);
} 

function draw() { 
  background(127, 0, 127);
  
  var v = mouseX; 

  // Left Eye
  ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);

  // Right Eye
  ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
	
  // Mouth
  bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
  
  v+=random(-5, 5);
  // Nose
  bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);

}
// Declare a "SerialPort" object
var serial;
var portListDiv;
var portSelect;
var selectedPort;
var rescanPorts;
var connectButton;
var disconnectButton;
var serialConsoleEnabledCheckbox;
var serialConsoleEnabled = false;
var serialConsole;
var clearButton;
var sendMessage;
var sendButton;
var consoleBuffer = [];
var lastConsoleLogTime = Date.now();
var LOGWAIT = 500;

function setup() {
	createCanvas(1, 1);

	portListDiv = select("#serialports");
	
	// GUI controls
	portSelect = createSelect();
	portSelect.option("No Ports Found");
	portSelect.parent(select("#portselectdiv"));

	rescanPorts = select("#rescan");
	rescanPorts.mousePressed(function() {
		serial.list();
	});

	connectButton = select("#connect");
	connectButton.mousePressed(connectPressed);
	disconnectButton = select("#disconnect");
	disconnectButton.mousePressed(disconnectPressed);
	
	serialConsole = select("#serialconsole");	
	serialConsoleEnabledCheckbox = select("#serialconsoleenabled");
	serialConsoleEnabledCheckbox.elt.checked = false;
	serialConsoleEnabledCheckbox.elt.addEventListener('change', serialConsoleSwitch);
	
	clearButton = select("#clear");
	clearButton.elt.addEventListener('click', clearPressed);
	//clearButton.mousePressed("clearPressed");
	
	sendButton = select("#send");
	sendMessage = select("#message");
	sendButton.elt.addEventListener('click', sendPressed);
	
	// Instantiate our SerialPort object
	serial = new p5.SerialPort();

	// Callback for list of ports available
	serial.on('list', gotList);

	// Get a list the ports available
	// You should have a callback defined to see the results
	serial.list();

	// Here are the callbacks that you can register

	// When we connect to the underlying server
	serial.on('connected', serverConnected);

	// When we get a list of serial ports that are available
	// OR
	//serial.onList(gotList);

	// When we some data from the serial port
	//serial.on('data', gotData);
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
	serial.on('rawdata', gotRawData);
	// OR
	//serial.onRawData(gotRawData);
}

// We are connected and ready to go
function serverConnected() {
  seriallog("Connected to Server");
}

// Got the list of ports
function gotList(thelist) {
	seriallog("Available Serial Ports:");
		
	if (portSelect) {
		portSelect.remove();
	}
	
	portSelect = createSelect();
	portSelect.parent(select("#portselectdiv"));

	//This isn't working - Looks like p5.dom bug
	//newPortSelect.changed(portSelected);
	portSelect.elt.addEventListener('change', portSelected);
	
	if (portListDiv) {
		portListDiv.elt.innerHTML = "";
	}

	for (var i = 0; i < thelist.length; i++) {
		seriallog(i + " " + thelist[i]);
		portSelect.option(thelist[i]);
		if (portListDiv) {
			portListDiv.elt.innerHTML += "<br />\n" + thelist[i];
		}
	}
}

function portSelected() {
	selectedPort = portSelect.value();
		connectButton.show();
}

function connectPressed() {
	if (!selectedPort) {
		selectedPort = portSelect.value();
	}
	seriallog("Opening: " + selectedPort);
	serial.open(selectedPort);
	
		connectButton.hide();
		disconnectButton.show();
}

function disconnectPressed() {
	seriallog("Closing: " + selectedPort);
	serial.close();
	
		disconnectButton.hide();
		connectButton.show();
}

function serialConsoleSwitch() {
	if (serialConsoleEnabledCheckbox.checked()) {
		serialConsoleEnabled = true;
	} else {
		serialConsoleEnabled = false;
	}
}		

function clearPressed() {
	serialConsole.elt.value = "";
}

function sendPressed() {
	serial.write(sendMessage.elt.value);
	sendMessage.elt.value = "";
}

function gotOpen() {
  seriallog("Serial Port is Open");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  seriallog(theerror);
}

// There is data available to work with from the serial port
function gotData() {
// 	  var currentString = serial.readLine();  // read the incoming string
// 	  trim(currentString);                    // remove any trailing whitespace
// 	  if (!currentString) return;             // if the string is empty, do no more
// 	  log(currentString);             // log the string
// 	  latestData = currentString;            // save it for the draw method
}

// We got raw from the serial port
function gotRawData(thedata) {
  seriallog(thedata);
}

// Methods available
// serial.read() returns a single byte of data (first in the buffer)
// serial.readChar() returns a single char 'A', 'a'
// serial.readBytes() returns all of the data available as an array of bytes
// serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
// serial.readString() retunrs all of the data available as a string
// serial.readStringUntil('\n') returns all of the data available as a string until a specific string is encountered
// serial.readLine() calls readStringUntil with "\r\n" typical linebreak carriage return combination
// serial.last() returns the last byte of data from the buffer
// serial.lastChar() returns the last byte of data from the buffer as a char
// serial.clear() clears the underlying serial buffer
// serial.available() returns the number of bytes available in the buffer
// serial.write(somevar) writes out the value of somevar to the serial device

function draw() {
}

function seriallog(txt) {
	//console.log(txt + "\n");
	if (serialConsoleEnabled) {
		
	// if (serialConsole.elt.value.length >= 800)
	// {
	// 	serialConsole.elt.value = serialConsole.elt.value.substring(400);
	// }
	// serialConsole.elt.value += txt + "\n";
	// serialConsole.elt.scrollTop = serialConsole.elt.scrollHeight;
	
	consoleBuffer.push(txt);
		if (lastConsoleLogTime + LOGWAIT < Date.now()) {
			if (serialConsole.elt.value.length >= 800)
			{
				serialConsole.elt.value = serialConsole.elt.value.substring(400);
			}
			serialConsole.elt.value += consoleBuffer.join("\n");
			serialConsole.elt.scrollTop = serialConsole.elt.scrollHeight;
		
			lastConsoleLogTime = Date.now();
			consoleBuffer.length = 0;
			console.log("wrote to text area " + consoleBuffer.length);
		}
	}
}
//inspiration https://upload.wikimedia.org/wikipedia/commons/7/75/Lightnings_below_the_summit.jpg

var serial; // variable to hold an instance of the serialport library 
var portName = '/dev/cu.usbmodem1411';  // fill in your serial port name here
var inData = 0;                             // for incoming serial data


//ThunderSound
var ele;

var Y_AXIS = 1;
var X_AXIS = 2;
var c1, c2, c3, cY, cB, cG;
let speed = 20;
var x = 0;
let fuji1 = {
  x: 0,
  y: 420
}
let fuji2 = {
  x: 0,
  y: 346,
}
let fuji3 = {
  x: 423,
  y: 102
}
let fuji4 = {
  x: 448,
  y: 102,
}
let fuji5 = {
  x: 567,
  y: 226,
}
let fuji6 = {
  x: 567,
  y: 420
}
var cloud1 = {
  x: 23,
  y: 180,
};
let cloud = 1;

function preload() {
  img = loadImage("cloud done.png");
  ele = createAudio('Thunder sound effect.mp3');

}

function setup() {
  createCanvas(610, 420);

  // Fuji Colors
  c1 = color(0, 0, 0); //black
  c2 = color(255, 0, 0); //red
  c3 = color(255, 255, 255); //white
  cY = color(254, 213, 68); //yellow
  cB = color(0, 151, 205); //blue
  cG = color(39, 71, 52); //green

  frameRate(24);
  
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

function draw() {

  

  //FRAME
  fill(225);
  stroke(0);
  rect(0, 0, 610, 420)

  push();
  translate(20, -5);


  //Sky Gradient - couldn't get it to fit with other gradients, need to work out
  //setGradient(0, 10, 565, 280, c3, cB, Y_AXIS);

  //Fuji Gradient White Cap
  setGradient(0, 100, 565, 100, c3, c2, Y_AXIS);

  //Fuji gradient RED
  setGradient(0, 200, 565, 220, c2, c1, Y_AXIS);

  //fuji strokes  
  noFill()
  stroke(3);
  strokeWeight(2);
  beginShape();
  vertex(0, 346); //2
  bezierVertex(175, 306, 286, 264, 423, 102);
  vertex(423, 102);
  vertex(448, 102);
  vertex(448, 102);
  bezierVertex(511, 192, 525, 196, 567, 226);
  vertex(567, 226);
  vertex(567, 420);
  vertex(0, 420);
  vertex(0, 346);
  endShape();
  
	

  //Lightning Gradient
  if (mouseIsPressed) {
    setGradient(0, 10, 565, 400, cY, c1, Y_AXIS);
  } else {}  
  
  //background Blue Fill
  fill(cB);
  rect(0, 10, 6)
  beginShape();
  vertex(0, 10);
  vertex(0, 346); //2
  bezierVertex(175, 306, 286, 264, 423, 102);
  vertex(423, 102);
  vertex(448, 102);
  vertex(448, 102);
  bezierVertex(511, 192, 525, 196, 567, 226);
  vertex(567, 10);
  endShape(CLOSE)
  
  //Clouds
  fill(255);
    image(img, inData, cloud1.y);
  
  // if (cloud1.x > 99 || cloud1.x < 300) {
  //   image(img, cloud1.x + speed, cloud1.y);
  //   speed = speed * -1;
  // }

  //Green Mountains
  push();
  translate(10, 0)

  fill(cG);
  beginShape();
  vertex(-10, 286);
  vertex(41, 267);
  vertex(50, 272);
  vertex(58, 262);
  vertex(81, 270);
  vertex(95, 267);
  vertex(110, 280);
  vertex(167, 248);
  vertex(195, 230);
  vertex(257, 245);
  bezierVertex(265, 245, 0, 400, -10, 360);
  endShape()
  pop();
  stroke(0);

  //closing frame
  line(0, 245, 0, 370);

  //Lightning Bolt Animation on Mouse Click
  if (mouseIsPressed) {
    stroke(0);
    strokeWeight(1);
    fill(254, 213, 68);
    beginShape();
    vertex(213, 407);
    vertex(358, 355);
    vertex(418, 291);
    vertex(511, 273);
    vertex(561, 300);
    vertex(514, 286);
    vertex(500, 321);
    vertex(506, 282);
    vertex(436, 293);
    vertex(527, 361);
    vertex(474, 330);
    vertex(399, 399);
    vertex(467, 322);
    vertex(426, 298);
    vertex(361, 358);
    vertex(213, 407);
    endShape();
    
    ele.play();    //Trying to get a thunder sound to work, was working then changed the file,now it doesn't
  } else {}
 

  
  
  //Gradient (credit https://p5js.org/examples/color-linear-gradient.html)
  function setGradient(x, y, w, h, c1, c2, axis) {
    noFill();
    if (axis == Y_AXIS) { // Top to bottom gradient
      for (var i = y; i <= y + h; i++) {
        var inter = map(i, y, y + h, 0, 1);
        var c = lerpColor(c1, c2, inter);
        stroke(c);
        line(x, i, x + w, i);
      }
    } else if (axis == X_AXIS) { // Left to right gradient
      for (var i = x; i <= x + w; i++) {
        var inter = map(i, x, x + w, 0, 1);
        var c = lerpColor(c1, c2, inter);
        stroke(c);
        line(i, y, i, y + h);
      }
    }
  }
}var serial; // variable to hold an instance of the serialport library 
var portName = '/dev/cu.usbmodem1411';  // fill in your serial port name here
var inData = 0;                             // for incoming serial data



function setup() {
 createCanvas(800, 600);
  
	frameRate(24);  
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
 

function draw() {
  background(220, inData);
  
  for(let i =0; i<100;i++){
		drawCircle(random(0,100),inData);
		// drawCircle(random(0,-100),random(0,100));
		// drawCircle(random(-110,+100),random(0,100));
		// drawCircle(random(+110,-100),random(0,100));
  }
  
  
}

function drawCircle(cucumber,diameter){
  fill(random(255),random(255),random(255));
  ellipse(random(0+100,width-100),random(0+100,height-100),diameter,diameter);
}
var serial; // variable to hold an instance of the serialport library 
var portName = '/dev/cu.usbmodem1411';  // fill in your serial port name here
var inData = 0;                             // for incoming serial data


function setup() {
  createCanvas(600,400);
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  //serial.on('connected', serverConnected); // callback for connecting to the server
  // serial.on('open', portOpen);        // callback for the port opening
	serial.on('data', serialEvent);     // callback for when new data arrives
	serial.on('error', serialError);    // callback for errors
	//serial.on('close', portClose);      // callback for the port closing
 
  // serial.list();                      // list the serial ports
  //serial.open(portName);              // open a serial port
}
	function SerialEvent(){
		print("Got data");
    	var input = serial.readLine(); 
    	if (input.length > 0){
    		print(input);
        var parts = input.split(',');
        print(parts);
    	}
 }
let thediv;
let noOne;
let h1;
let button;
let whateverText ;
let dogA1; let dogA2; let dogB1; let dogB2;


function setup() {
  //setInterval(function(){ alert("dogs"); }, 5000);

  createCanvas(875, 200);


  thediv = select('#thediv');
     
  input = select('#textInput');
  input.changed(iAm);
  
  h1 = createElement("h1", "What is the answer in life?");
  h1.mousePressed(h1Callback);
  
  two = select('#two'); 
  
  dogA1 = select('#cellA1');
  dogA1.mousePressed(goodDogA1);

  dogA2 = select('#cellA2');
  dogA2.mousePressed(goodDogA2);
  
  dogB1 = select('#cellB1');
  dogB1.mousePressed(goodDogB1);
  
  dogB2 = select('#cellB2');
  dogB2.mousePressed(goodDogB2);
  
 	// cellA1 = select('#cellA1')
 	// cellA1.mousePressed(alert("good dog"));

  let textSizer;
 
  
}
function vidLoad() {
  vid.loop();
}
function iAm(){
	alert("I am " + input.value());
  whateverText = input.value();
  print("I am "+whateverText);
}
function h1Callback(){
	alert("you are alone");
	noOne = createDiv("and no one cares");
}
function goodDogA1(){
	alert("good dog, it is akita");
}
function goodDogA2(){
	alert("good dog, this is the fat beagle");
}
function goodDogB1(){
	alert("bad dog, this is the ugliest dog");
}
function goodDogB2(){
	alert("GOOD dog,everyone loves baby pugs");
  vid = createVideo(['dog.mp4'], vidLoad);
  vid.volume(0.3);
}
function mousePressed(){
	// theotherdiv = createDiv("No one cares")
	// two.html('You answered');
}

function draw() {
  
  var xoff = 0.0; 
  background(220);
  xoff = xoff + 0.01;
  for(var i = 0; i < 5; i++) {
  if(mouseX > 438.5){
    textSize(i * mouseX/8);
}  
  if(mouseX < 438.4){
    var n = random(xoff) * width;
    textSize(i * n);
    strokeWeight(random);
    }
    text(whateverText, mouseX,mouseY); 
  }
    
  //thediv.html("here is some new text2"); 
}let bubbles = [];

function setup() {
  createCanvas(600, 400);
  for (let i = 0; i < 100; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(20, 60);
    let b = new Bubble(x, y, r);
    bubbles.push(b);
  }


}

function mousePressed() {
  for (let i = bubbles.length - 1; i >= 0; i--) {
    if (bubbles[i].contains(mouseX, mouseY)) {
      bubbles.splice(i, 1);
    }
  }
}

function draw() {
  background(0);
  for (let i = 0; i < bubbles.length; i++) {
    if (bubbles[i].contains(mouseX, mouseY)) {
      bubbles[i].changeColor(255);
    } else {
      bubbles[i].changeColor(0);
    }
    bubbles[i].move();
    bubbles[i].show();
  }
}

class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.brightness = 0;
  }

  changeColor(bright) {
    this.brightness = bright;
  }

  contains(px, py) {
    let d = dist(px, py, this.x, this.y);
    if (d < this.r) {
      return true;
    } else {
      return false;
    }
  }

  move() {
    this.x = this.x + random(-2, 2);
    this.y = this.y + random(-2, 2);
  }

  show() {
    stroke(255);
    strokeWeight(4);
    fill(this.brightness, 125);
    ellipse(this.x, this.y, this.r * 2);
  }
}let bubbles = [];


function setup() {
	createCanvas(600, 400);
  for (let i = 0; i < 5; i++){
  let x = random(width);
  let y = random(height);
  let r = random(10,50);
	let b = new Bubble(x,y,r);
  bubbles.push(b);
  } 
}
function mousePressed(){
	for (let i=0; i < bubbles.length; i++){  
  	bubbles[i].clicked(mouseX,mouseY);
   }
}
function draw() {
  background(0);
  	for (let i=0; i < bubbles.length; i++){  
      bubbles[i].move();
      bubbles[i].show();

  }
}

class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.brightness = 0;
  }
  move() {
    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
  }
  show() {
    stroke(255);
    strokeWeight(4);
		fill(this.brightness, 100);
    ellipse(this.x, this.y,this.r * 2);
  }
  clicked(px,py){
		let d = dist(px,py,this.x,this.y);
    if(d<this.r){
			this.brightness=255;
    }
  }
}// let Bubbles = [];
let bubble;

function setup() {
	createCanvas(600, 400);
  let x = random(width);
  let y = random(height);
  let r = random(10,50);
	let b = new Bubble(x,y,r)
  bubble.push(b);
}

// function mousePressed(){
//   let r = random(10,50);
  // let b = new Bubble(mouseX,mouseY,r)
  // Bubbles.push(b);
// }
function draw() {
  background(0);
  //  for (let Bubble of Bubbles){
  //   Bubble.move();
  //   Bubble.show();
  // }
}

class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;

  }
  move() {
    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
  }
  show() {
    stroke(255);
    strokeWeight(4);
    noFill();
    ellipse(this.x, this.y,this.r * 2);
  }


}let Bubbles = [];

function setup() {
	createCanvas(600, 400);

}

function mousePressed(){
  let r = random(10,50);
  let b = new Bubble(mouseX,mouseY,r)
  Bubbles.push(b);
}
function draw() {
  background(0);
   for (let Bubble of Bubbles){
    Bubble.move();
    Bubble.show();
  }
}

class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;

  }
  move() {
    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
  }
  show() {
    stroke(255);
    strokeWeight(4);
    noFill();
    ellipse(this.x, this.y,this.r * 2);
  }


}let bubbles = [];

function setup() {
	createCanvas(600, 400);

}

function mousePressed(){
  let r = random(10,50);
  let b = new Bubble(mouseX,mouseY,r)
  bubbles.push(b);
}
function draw() {
  background(0);
   for (let i=0; i < bubbles.length; i++){
    bubbles[i].move();
    bubbles[i].show();
  }
}

class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;

  }
  move() {
    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
  }
  show() {
    stroke(255);
    strokeWeight(4);
    noFill();
    ellipse(this.x, this.y,this.r * 2);
  }


}var nums = [100,25,46,72]



function setup() {
  createCanvas(500, 400);
}

function draw() {
	background(0);
  stroke(255)
	fill(68);
  
  for(var i = 0;i<4;i++){
  ellipse(i*100+100,200,nums[i],nums[i]);
	// ellipse(200,200,nums[i],nums[i]);
	// ellipse(300,200,nums[i],nums[i]);
	// ellipse(400,200,nums[i],nums[i]);
  }

}
var words = ["rainbow","heart","purple","friendship","love"]

var index = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
	background(0);
  
	fill(255);
  textSize(32);
  text(words[index],mouseX,mouseY);

}

function mousePressed(){
  index = index +1;
  if(index == words.length){
    index = 0;
  }
}var nums = [100,25,46,72]

var num = 23;

function setup() {
  createCanvas(400, 400);
}

function draw() {
	background(0);
  
	ellipse(100,200,num,num);
	ellipse(200,200,nums[2],nums[2]);
}
let bubble1;
let bubble2;

function setup() {
  createCanvas(400, 400);
  bubble1 = new Bubble(200, 200, 40, 250);
  bubble2 = new Bubble(400, 200, 20, 0);

}

function draw() {
  background(0);
  bubble1.move();
  bubble1.show();
  bubble2.move();
  bubble2.show(225);
}

class Bubble {
  constructor(x_, y_, r_,c_) {
    this.x = x_;
    this.y = y_;
    this.r = r_;
    this.c = c_;

  }
  move() {
    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
  }
  show(c) {
    stroke(255);
    strokeWeight(4);
    ellipse(this.x, this.y,this.r * 2);
  }


}let bubble1;
let bubble2;

function setup() {
  createCanvas(400, 400);
  bubble1 = new Bubble();
  bubble2 = new Bubble();
  
}

function draw() {
  background(220);
  
  bubble1.move();
  bubble1.show();
  
  bubble2.move();
  bubble2.show();
}

class Bubble{
  constructor() {
  	this.x = 200;
  	this.y =150;
  }
  move(){
 		this.x =  this.x + random(-5,5);
		this.y =  this.y + random(-5,5);
  }
  show(){
    stroke(255);
    strokeWeight(4);
    noFill();
		ellipse(this.x,this.y,24,24);
  }
  
  
}let anotherthing = [1,3,5,7];

let b = [];

function setup() {
  createCanvas(500,500);

for (let i=0; i< 10; i++){
  let ball = new Ball(random(0,width),random(0,height), random (-1,1), random(1,50));
  b.push(ball);
}

let r =floor(random(0,height));

}

function draw() {
  background(128);
	
  
  	
  for (let i = 0; i < b.length; i++){
  b[i].move();
  b[i].display();
}
}
class Ball {
 constructor(xx, yy, xxdir, yydir, rr) {
	 this.x = xx;
   this.y = yy;
   this.xdir = xxdir;
   this.ydir = yydir;
   this.r = rr;
   
   this.stopped = false;
   this.color = color(random(0,255), random(0, 255), random(0, 255));
 }
  
  move() {
    if (!this.stopped) {
      this.x = this.x + this.xdir;
      this.y = this.y + this.ydir;
    }
  	//this.display();
    
    if (this.x <= 0 || this.x >= width) {
     this.xdir = this.xdir * -1; 
    }
    
    if (this.y <=0 || this.y >= height) {
     this.ydir = this.ydir * -1; 
    }
    
  }
  
  display() {
    fill(this.color);
   ellipse(this.x, this.y, this.r, this.r); 
  }
  
  stop() {
    this.stopped = true;    
  }
  
  start() {
    this.stopped = false;
  }
  
  hover() { 
   	if (dist(mouseX, mouseY, this.x, this.y) < this.r) {
     	this.stop(); 
    } else {
      this.start();
    }
  }
}function setup() {
  createCanvas(600, 400);
}
function draw() {

  background(220);
  horizontalButton(100,100,100);
  verticalButton(500, 100, 100);
  
  stroke(255)
  strokeWeight(4);
  fill(0);  
}function setup() {
  createCanvas(600, 400);
}

function horizontalButton(xbuttonW, ybuttonW, dbuttonW){

  if (mouseIsPressed && mouseX > xbuttonW - 50 && mouseX < xbuttonW + 500 && mouseY > 50 && mouseY < 150) {
    xbuttonW = mouseX;
    background(0, 200, 255);
    stroke(0)
    strokeWeight(4);

    if ( xbuttonW <= 100){
	  xbuttonW = 100;
    }
    if(xbuttonW >= 400) {
    xbuttonW = 400;
    }
    for (let x = 0; x <= width; x += 50) {
      for (let y = 0; y <= width; y += 50) {
        fill(random(255), random(255), random(255));
        ellipse(x, y, xbuttonW / 4, 25);
      }
    }
    //having VERTI button appear
		line(500, 100, 500, 300);
  	ellipse(500, 100, 100);  
  } 
  	line(100, 100, 400, 100); 
  	ellipse(xbuttonW, ybuttonW, dbuttonW);
}

function verticalButton(xbuttonH, ybuttonH, dbuttonH){
  if (mouseIsPressed && mouseX > 450 && mouseX < 550 && mouseY > ybuttonH - 50 && mouseY < ybuttonH + 350) {
    ybuttonH = mouseY;
    background(255, 200, 0);
    stroke(0)
    strokeWeight(4);

    if (ybuttonH <= 100){
	  ybuttonH = 100;
    }
    if(ybuttonH >= 300) {
    ybuttonH = 300;
    }
    for (let x = 0; x <= width; x += 50) {
      for (let y = 0; y <= width; y += 50) {
        fill(random(255), random(255), random(255));
        ellipse(x, y, 25, ybuttonH / 4);
        }
      }
    //having horizontal button appear
  	line(100, 100, 400, 100);  
  	ellipse(100,100,100); 
  }
  line(500, 100, 500, 300);
  ellipse(xbuttonH, ybuttonH, dbuttonH);
}

function draw() {

  background(220);
  horizontalButton(100,100,100);
  verticalButton(500, 100, 100);
  
  stroke(255)
  strokeWeight(4);
  fill(0);  
}function setup() {
  createCanvas(600, 400);
}

function horizontalButton(xbuttonW, ybuttonW, dbuttonW){
  line(100, 100, 400, 100); 
  ellipse(xbuttonW, ybuttonW, dbuttonW);

  if (mouseIsPressed && mouseX > xbuttonW - 50 && mouseX < xbuttonW + 50 && mouseY > 50 && mouseY < 150) {
    xbuttonW = mouseX;
    background(0, 200, 255);
    stroke(0)
    strokeWeight(4);

    if ( xbuttonW <= 100){
	  xbuttonW = 100;
    }
    if(xbuttonW >= 400) {
    xbuttonW = 400;
    }
    for (let x = 0; x <= width; x += 50) {
      for (let y = 0; y <= width; y += 50) {
        fill(random(255), random(255), random(255));
        ellipse(x, y, xbuttonW / 4, 25);
      }
    }
  } 
}

function verticalButton(xbuttonH, ybuttonH, dbuttonH){
  line(500, 100, 500, 300);
  ellipse(xbuttonH, ybuttonH, dbuttonH);
  
  if (mouseIsPressed && mouseX > 450 && mouseX < 550 && mouseY > ybuttonH - 50 && mouseY < ybuttonH + 150) {
    ybuttonH = mouseY;
    background(255, 200, 0);
    stroke(0)
    strokeWeight(4);

    if (ybuttonH <= 100){
	  ybuttonH = 100;
    }
    if(ybuttonH >= 300) {
    ybuttonH = 300;
    }
    for (let x = 0; x <= width; x += 50) {
      for (let y = 0; y <= width; y += 50) {
        fill(random(255), random(255), random(255));
        ellipse(x, y, 25, ybuttonH / 4);
        }
      }
   }
  }
function draw() {

  background(220);
  horizontalButton(100,100,100);
  verticalButton(500, 100, 100);
  
  stroke(255)
  strokeWeight(4);
  fill(0);
}


  // //crazy everything  
//   if(mouseIsPressed&&mouseX>0&&mouseX<50&&mouseY>350&&mouseY<400){
//   background(random(255), random(255), random(255));
//   stroke(0)
//   strokeWeight(4);

//   for (let x = 0; x <= width; x += 50) {
// 		for (let y = 0; y <= width; y += 50) {
//       fill(random(255), random(255), random(255));
//       ellipse(x, y, random(50),random(25));
//       print(".     help");
//     }
//   }
// }

//coding train base



function setup() {  
  let km = milesToKm(26.3);
  print(km);
  let km2 = milesToKm(100);
  print(km2);
}

//function draw(){}

function milesToKm(miles) {
  var km = miles * 1.6;
  return km;
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  ellipse(CENTER);
  drawSomething(width / 2, height / 2, 200);
}

function drawSomething(x, y, s) {
  ellipse(x, y, s, s);
  if(s>1){
  	drawSomething(x+10,y-10,s/2);
	}
}let ball = {
  x: 100,
  y: 100,
  d: 50,
  xspeed: 5,
  yspeed: 10,
}

let beachBall = {
  x: 50,
  y: 50,
  d: 50,
  xspeed: 2,
  yspeed: 5,
}



function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  displayBall();
  moveBall();
  bounceBall();

  displayBall(beachBall);
  moveBall(beachBall);
  bounceBall(beachBall);
}

function displayBall(whichBall) {
  ellipse(whichBall.x, whichBall.y, whichBall.d, whichBall.d);
}

function moveBall(whichBall) {
  whichBall.x = whichBall.x + whichBall.xspeed;
  whichBall.y = whichBall.y + whichBall.yspeed;
}

function bounceBall() {
  if (whichBall.x <= 0 || whichBall.x >= width) {
    whichBall.xspeed = whichBall.xspeed * -1;
  }

  if (ball.y <= 0 || ball.y >= height) {
    whichBall.yspeed = whichBall.yspeed * -1;
  }
}
let b, b1,move;

function setup() {
  createCanvas(400, 400);

  b = new Ball(50, 50, 1, 2, 50);
  b1 = new Ball(90,80,2,1,40);
}

function draw() {
  background(220);
	b.move();
  b1.move();
  
  b.display();
  b1.display();
  
  if(mouseIsPressed){
    b.stop();
  }else{
    b.start();
  }

}function setup() {
  createCanvas(800, 600);
  }

function draw() {
  background(220);
  
//   for(let i =0; i<100;i++){
// 		drawCircle(random(0,100),random(0,100));
//     drawCircle(random(0,-100),random(0,100));
//     drawCircle(random(-110,+100),random(0,100));
//     drawCircle(random(+110,-100),random(0,100));
//   }
  
  
}

function drawCircle(cucumber,diameter){
  fill(random(255),random(255),random(255));
  ellipse(random(0+100,width-100),random(100,500),diameter,diameter);
}function setup() {
  createCanvas(800, 600);
  
	frameRate(7);
}

function draw() {
  background(220, 100);
  
  for(let i =0; i<100;i++){
		drawCircle(random(0,100),50);
    // drawCircle(random(0,-100),random(0,100));
    // drawCircle(random(-110,+100),random(0,100));
    // drawCircle(random(+110,-100),random(0,100));
  }
  
  
}

function drawCircle(cucumber,diameter){
  fill(random(255),random(255),random(255));
  ellipse(random(0+100,width-100),random(0+100,height-100),diameter,diameter);
}let xbuttonW, ybuttonW, dbuttonW;
let xbuttonH, ybuttonH, dbuttonH;

function setup() {
  createCanvas(600, 400);
  xbuttonW = 100;
  ybuttonW = 100;
  dbuttonW = 100;
  
  xbuttonH = 500;
  ybuttonH = 100;
  dbuttonH = 100;

}

function draw() {
  background(220);

  if (mouseIsPressed && mouseX > xbuttonW - 50 && mouseX < xbuttonW + 50 && mouseY > 50 && mouseY < 150) {
    xbuttonW = mouseX;
    background(0, 200, 255);
    stroke(0)
    strokeWeight(4);

    if ( xbuttonW <= 100){
	  xbuttonW = 100;
    }
    if(xbuttonW >= 400) {
    xbuttonW = 400;
    }
    for (let x = 0; x <= width; x += 50) {
      for (let y = 0; y <= width; y += 50) {
        fill(random(255), random(255), random(255));
        ellipse(x, y, xbuttonW / 4, 25);
      }
    }
  } 

  if (mouseIsPressed && mouseX > 450 && mouseX < 550 && mouseY > ybuttonH - 50 && mouseY < ybuttonH + 150) {
    ybuttonH = mouseY;
    background(255, 200, 0);
    stroke(0)
    strokeWeight(4);

    if (ybuttonH <= 100){
	  ybuttonH = 100;
    }
    if(ybuttonH >= 300) {
    ybuttonH = 300;
    }
    for (let x = 0; x <= width; x += 50) {
      for (let y = 0; y <= width; y += 50) {
        fill(random(255), random(255), random(255));
        ellipse(x, y, 25, ybuttonH / 4);
        }
      }
   }
//crazy everything  
  if(mouseIsPressed&&mouseX>0&&mouseX<50&&mouseY>350&&mouseY<400){
  background(random(255), random(255), random(255));
  stroke(0)
  strokeWeight(4);

  for (let x = 0; x <= width; x += 50) {
		for (let y = 0; y <= width; y += 50) {
      fill(random(255), random(255), random(255));
      ellipse(x, y, random(50),random(25));
      print(".     help");
    }
  }
}
  else {
    stroke(255)
    strokeWeight(4);
    fill(0);
  }
  line(100, 100, 400, 100);
	line(500, 100, 500, 300);
  ellipse(xbuttonW, ybuttonW, dbuttonW);
  ellipse(xbuttonH, ybuttonH, dbuttonH);
}

//thanks shawn for the helplet xbuttonW, ybuttonW, dbuttonW;
let xbuttonH, ybuttonH, dbuttonH;

function setup() {
  createCanvas(600, 400);
  xbuttonW = 100;
  ybuttonW = 100;
  dbuttonW = 100;
  
  xbuttonH = 500;
  ybuttonH = 100;
  dbuttonH = 100;

}

function draw() {
  background(220);

  if (mouseIsPressed && mouseX > xbuttonW - 50 && mouseX < xbuttonW + 50 && mouseY > 50 && mouseY < 150) {
    xbuttonW = mouseX;
    background(0, 200, 255);
    stroke(0)
    strokeWeight(4);

    if ( xbuttonW <= 100){
	  xbuttonW = 100;
    }
    if(xbuttonW >= 400) {
    xbuttonW = 400;
    }
    for (let x = 0; x <= width; x += 50) {
      for (let y = 0; y <= width; y += 50) {
        fill(random(255), random(255), random(255));
        ellipse(x, y, xbuttonW / 4, 25);
      }
    }
  } 

  if (mouseIsPressed && mouseX > 450 && mouseX < 550 && mouseY > ybuttonH - 50 && mouseY < ybuttonH + 150) {
    ybuttonH = mouseY;
    background(255, 200, 0);
    stroke(0)
    strokeWeight(4);

    if (ybuttonH <= 100){
	  ybuttonH = 100;
    }
    if(ybuttonH >= 300) {
    ybuttonH = 300;
    }
    for (let x = 0; x <= width; x += 50) {
      for (let y = 0; y <= width; y += 50) {
        fill(random(255), random(255), random(255));
        ellipse(x, y, 25, ybuttonH / 4);
        }
      }
   }
//crazy everything  
  if(mouseIsPressed&&mouseX>0&&mouseX<50&&mouseY>350&&mouseY<400){
  background(random(255), random(255), random(255));
  stroke(0)
  strokeWeight(4);

  for (let x = 0; x <= width; x += 50) {
		for (let y = 0; y <= width; y += 50) {
      fill(random(255), random(255), random(255));
      ellipse(x, y, random(50),random(25));
      print(".     help");
    }
  }
}
  else {
    stroke(255)
    strokeWeight(4);
    fill(0);
  }
  line(100, 100, 400, 100);
	line(500, 100, 500, 300);
  ellipse(xbuttonW, ybuttonW, dbuttonW);
  ellipse(xbuttonH, ybuttonH, dbuttonH);
}

let xbutton, ybutton, dbutton;

function setup() {
  createCanvas(600, 400);
  xbutton = 100;
  ybutton = 100;
  dbutton = 100;

}

function draw() {
  background(220);

  if (mouseIsPressed && mouseX > xbutton - 50 && mouseX < xbutton + 50 && mouseY > 50 && mouseY < 150) {
    xbutton = mouseX;
    background(0, 200, 255);
    stroke(0)
    strokeWeight(4);

    if ( xbutton <= 100){
	  xbutton = 100;
    }
    if(xbutton >= 400) {
    xbutton = 400;
    }
    for (let x = 0; x <= width; x += 50) {
      for (let y = 0; y <= width; y += 50) {
        fill(random(255), random(255), random(255));
        ellipse(x, y, xbutton / 4, 25);
      }
    }
  } 

//     if (mouseIsPressed && mouseX > 450 && mouseX < 550 && mouseY > 50 && mouseY < 150) {
//       background(255, 200, 0);
//       stroke(0)
//       strokeWeight(4);

//       for (let x = 0; x <= width; x += 50) {
//         for (let y = 0; y <= width; y += 50) {
//           fill(random(255), random(255), random(255));
//           ellipse(x, y, 25, random(100));
//         }
//       }
//    }
  else {
    stroke(255)
    strokeWeight(4);
    fill(0);
  }
  line(100, 100, 400, 100);
	
  ellipse(xbutton, ybutton, dbutton);
  //ellipse(500, ybutton, dbutton);
}let xbutton, ybutton, dbutton;
let colorbutton;


function setup() {
  createCanvas(600, 400);
	xbutton = 100;
  ybutton = 100;
  dbutton = 100;

}

function draw() {
  background(220);

  if(mouseIsPressed&&mouseX>50&&mouseX<150&&mouseY>50&&mouseY<150){
  background(0,200,255);
  stroke(0)
  strokeWeight(4);

  for (let x = 0; x <= width; x += 50) {
		for (let y = 0; y <= width; y += 50) {
      fill(random(255), random(255), random(255));
      ellipse(x, y, random(50),random(25));
      print(".     help");
    }
  }
}	else{
  stroke(255)
  strokeWeight(4);
	fill(0);     
}
  ellipse(xbutton,ybutton,dbutton);
}

let xbutton, ybutton, dbutton;

let wSlider;



function setup() {
  createCanvas(600, 400);
  xbutton = 100;
  ybutton = 100;
  dbutton = 100;

}

function draw() {
  background(220);

  if (mouseIsPressed && mouseX > xbutton - 50 && mouseX < xbutton +50 && mouseY > 50 && mouseY < 150) {
    xbutton = mouseX;
    background(0, 200, 255);
    stroke(0)
    strokeWeight(4);
    
    if (xbutton <= 100){
      xbutton += 1;}

    for (let x = 0; x <= width; x += 50) {
      for (let y = 0; y <= width; y += 50) {
        fill(random(255), random(255), random(255));
        ellipse(x, y, xbutton/4, 25);
      }
    }
  } //vertical button
//   if (mouseIsPressed && mouseX > 450 && mouseX < 550 && mouseY > 50 && mouseY < 150) {
//     background(255, 200, 0);
//     stroke(0)
//     strokeWeight(4);

//     for (let x = 0; x <= width; x += 50) {
//       for (let y = 0; y <= width; y += 50) {
//         fill(random(255), random(255), random(255));
//         ellipse(x, y, 25, random(100));
//       }
//     }
//  }
else {
    stroke(255)
    strokeWeight(4);
    fill(0);
  }
	line(100,100,400,100);
  
  ellipse(xbutton, ybutton, dbutton);

  

 // ellipse(xbutton + 400, ybutton, dbutton);

 
}


//coding train base



function setup() {
  createCanvas(600, 400);
}

function draw() {
	background(0);
	
  lollipop(100,100,50);
  lollipop(300,200,250);
}

function lollipop(x,y,diameter){
  fill(0,200,255);
  rect(x-10,y,20,150);
  
  fill(255,0,200);
  ellipse(x,y,diameter,diameter);
}
//coding train base

let ball = {
  x: 300,
  y: 200,
  xspeed: 4,
  yspeed: -4,
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

function move(){
  ball.x += ball.xspeed;
  ball.y += ball.yspeed;
}

function bounce(){
  if (ball.x > width || ball.x < 0) {
    ball.xspeed = ball.xspeed * -1;
  }
  if (ball.y > width || ball.y < 0) {
    ball.yspeed = ball.yspeed * -1;
  }
}

function display(){
  stroke(255);
  strokeWeight(4);
  fill(random(255), random(255), random(255));
  ellipse(ball.x, ball.y, 24, 24);

}

// let ball1; let ball2;
// ball1=(0,0,0);
// ball2=(0,0,0);


let r;


function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(4);
  noFill();

  for (let x = 0; x <= width; x += 50) {
		for (let y = 0; y <= width; y += 50) {
      fill(random(255), random(255), random(255));
      ellipse(x, y, 25,25);
    }   
  }
}// let ball1; let ball2;
// ball1=(0,0,0);
// ball2=(0,0,0);


let r;


function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(4);
  noFill();

  for (let x = 0; x <= width; x += 50) {
		for (let y = 0; y <= width; y += 50) {
      fill(random(255), random(255), random(255));
      ellipse(x, y, mouseX, mouseY);
    }   
  }
}let x=50;

let speed = 3;


function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(4);
  noFill();
  ellipse(x,200,100,100);
  
  
  if(x >= width -50 || x < 50){
  speed = speed *-1;
  }
  x=x+speed;

}let s = "";
let paragraph;
let charCount = 0;


function setup() {
  createCanvas(1, 1);

  paragraph = createP("");
  frameRate(30);
}

function draw() {
  //background(220);

  let c = random(95, 123);
  c = floor(c);
  if(c==96 || c==95|| charCount >= random(1,10)){
    c=32;
    charCount = 0;
  }
  if (charCount >=10){
    
  }
  c = char(c)
	charCount++;
  //print(charCount);
  s = s + c;

  paragraph.html(s);

  
}
let x, y;

let xdir = 4;
let ydir = 3;
let pxdir ;
let pydir ;


function setup() {
  createCanvas(400, 400);

  x = 10;
  y = 10;

}

function draw() {
  background(220);

  ellipse(x, y, 20, 20)
  x = x + xdir;
  y = y + ydir;

  if (y >= height ||y <= 0) {
		ydir = ydir * -1;
  }
  if ( x >= width || x <= 0) {
	  xdir = xdir * -1;
    print("woooooo");
  }

rect(200,200,100,100)
    if(mouseIsPressed && mouseX > 200 && mouseX < 300 && mouseY > 200 && mouseY < 300){
      if(xdir != 0 && ydir != 0){
      
      
      }
  }

  
}

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
	
  stroke(255);
  strokeWeight(4);
  noFill();
  
  if (mouseX > 300){
    fill(255,0,0);
}
  
  ellipse(300,200,100,100);  
  
}


var r = 0;
var b = 255;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(r,0,b);
  
  r = map(mouseX,0,600,0,255);
  b = map(mouseX,0,600,255,0);

  
  //ellipse
  fill(250,118,222);
  ellipse(mouseX,200,64,64);
  
  
  
}let cloud = {
  x : 200,
  y : 200,
  w : 300,
  h : 300.
}

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(220);
  
  
  
  ellipse(cloud.x,cloud.y,cloud.diameter);
  ellipse(cloud.x + 50, cloud.y + 50, cloud.w);
}//inspiration https://upload.wikimedia.org/wikipedia/commons/7/75/Lightnings_below_the_summit.jpg

//ThunderSound
var ele;

var Y_AXIS = 1;
var X_AXIS = 2;
var c1, c2, c3, cY, cB, cG;
let speed = 20;
var x = 0;
let fuji1 = {
  x: 0,
  y: 420
}
let fuji2 = {
  x: 0,
  y: 346,
}
let fuji3 = {
  x: 423,
  y: 102
}
let fuji4 = {
  x: 448,
  y: 102,
}
let fuji5 = {
  x: 567,
  y: 226,
}
let fuji6 = {
  x: 567,
  y: 420
}
var cloud1 = {
  x: 23,
  y: 180,
};
let cloud = 1;

function preload() {
  img = loadImage("cloud done.png");
  ele = createAudio('Thunder sound effect.mp3');

}

function setup() {
  createCanvas(610, 420);

  // Fuji Colors
  c1 = color(0, 0, 0); //black
  c2 = color(255, 0, 0); //red
  c3 = color(255, 255, 255); //white
  cY = color(254, 213, 68); //yellow
  cB = color(0, 151, 205); //blue
  cG = color(39, 71, 52); //green

  frameRate(5);
  
}

function draw() {

  

  //FRAME
  fill(225);
  stroke(0);
  rect(0, 0, 610, 420)

  push();
  translate(20, -5);


  //Sky Gradient - couldn't get it to fit with other gradients, need to work out
  //setGradient(0, 10, 565, 280, c3, cB, Y_AXIS);

  //Fuji Gradient White Cap
  setGradient(0, 100, 565, 100, c3, c2, Y_AXIS);

  //Fuji gradient RED
  setGradient(0, 200, 565, 220, c2, c1, Y_AXIS);

  //fuji strokes  
  noFill()
  stroke(3);
  strokeWeight(2);
  beginShape();
  vertex(0, 346); //2
  bezierVertex(175, 306, 286, 264, 423, 102);
  vertex(423, 102);
  vertex(448, 102);
  vertex(448, 102);
  bezierVertex(511, 192, 525, 196, 567, 226);
  vertex(567, 226);
  vertex(567, 420);
  vertex(0, 420);
  vertex(0, 346);
  endShape();
  
	

  //Lightning Gradient
  if (mouseIsPressed) {
    setGradient(0, 10, 565, 400, cY, c1, Y_AXIS);
  } else {}  
  
  //background Blue Fill
  fill(cB);
  rect(0, 10, 6)
  beginShape();
  vertex(0, 10);
  vertex(0, 346); //2
  bezierVertex(175, 306, 286, 264, 423, 102);
  vertex(423, 102);
  vertex(448, 102);
  vertex(448, 102);
  bezierVertex(511, 192, 525, 196, 567, 226);
  vertex(567, 10);
  endShape(CLOSE)
  
  //Clouds
  fill(255);
  if (cloud1.x > 99 || cloud1.x < 300) {
    image(img, cloud1.x + speed, cloud1.y);
    speed = speed * -1;
  }

  //Green Mountains
  push();
  translate(10, 0)

  fill(cG);
  beginShape();
  vertex(-10, 286);
  vertex(41, 267);
  vertex(50, 272);
  vertex(58, 262);
  vertex(81, 270);
  vertex(95, 267);
  vertex(110, 280);
  vertex(167, 248);
  vertex(195, 230);
  vertex(257, 245);
  bezierVertex(265, 245, 0, 400, -10, 360);
  endShape()
  pop();
  stroke(0);

  //closing frame
  line(0, 245, 0, 370);

  //Lightning Bolt Animation on Mouse Click
  if (mouseIsPressed) {
    stroke(0);
    strokeWeight(1);
    fill(254, 213, 68);
    beginShape();
    vertex(213, 407);
    vertex(358, 355);
    vertex(418, 291);
    vertex(511, 273);
    vertex(561, 300);
    vertex(514, 286);
    vertex(500, 321);
    vertex(506, 282);
    vertex(436, 293);
    vertex(527, 361);
    vertex(474, 330);
    vertex(399, 399);
    vertex(467, 322);
    vertex(426, 298);
    vertex(361, 358);
    vertex(213, 407);
    endShape();
    
    ele.play();    //Trying to get a thunder sound to work, was working then changed the file,now it doesn't
  } else {}
 

  
  
  //Gradient (credit https://p5js.org/examples/color-linear-gradient.html)
  function setGradient(x, y, w, h, c1, c2, axis) {
    noFill();
    if (axis == Y_AXIS) { // Top to bottom gradient
      for (var i = y; i <= y + h; i++) {
        var inter = map(i, y, y + h, 0, 1);
        var c = lerpColor(c1, c2, inter);
        stroke(c);
        line(x, i, x + w, i);
      }
    } else if (axis == X_AXIS) { // Left to right gradient
      for (var i = x; i <= x + w; i++) {
        var inter = map(i, x, x + w, 0, 1);
        var c = lerpColor(c1, c2, inter);
        stroke(c);
        line(i, y, i, y + h);
      }
    }
  }
}

function setup() {
  createCanvas(610, 420);
  

	img = loadImage("https://upload.wikimedia.org/wikipedia/commons/5/57/Red_Fuji_southern_wind_clear_morning.jpg");  
      
}
  
function draw() { 
  background(255);
  
  fill(225);
  stroke(0);
  rect(10,10,590,400)
  

  
  
  //fuji
  noFill();
  stroke(0);
  point(0, 420);//1
  point(0, 346);//2
  point(423, 102);//3
  point(448, 102);//4
  point(567, 226);//5
  point(567, 420);//6

  stroke(244, 122, 158);
  point(175,306);//a
  point(286,264);//b
  point(511,192);//c
	point(525,196);//d
  strokeWeight(2);

	stroke(0);
  
  line(0,420,0,346)
  
  beginShape();
  vertex(0,346);//2
  bezierVertex(175, 306, 286, 264, 423, 102);
  endShape();
  
  line(423,102, 448, 102);
  
  stroke(0);
  beginShape();
  vertex(448, 102);
  bezierVertex(511,192, 525,196, 567,226);
  endShape();
  
	line(567, 226,567, 420)
  line(567, 420,0, 420)
  
  stroke(218,160,221)
noFill();
strokeWeight(2);
beginShape();
vertex(423, 102);
vertex(448, 102)
quadraticVertex(452,165,470,153);

endShape();
  
 stroke(0); 
}var circle1 = {
  x: 0,
  y: 100,
  diameter: 50,
};

var circle2 = {
  x: 0,
  y: 200,
  diameter: 50,
};

var r = 218;
var g = 160;
var b = 221;


function setup() {
  createCanvas(600, 400);

}

function draw() {
  background(r,g,b);

  //ellipse
  fill(250, 200, 200);
  ellipse(circle1.x, circle1.y, circle1.diameter, circle1.diameter);

  circle1.x = circle1.x + 1;
  
  fill(250, 200, 200);
  ellipse(circle2.x, circle2.y, circle2.diameter, circle2.diameter);

  circle2.x = circle2.x + 1;
  
  fill(0,255,0)
  ellipse(mouseX, mouseY, 50,50);


}function setup() {
  createCanvas(630,470);
  background(44,255,254);
  
  //redline
 	stroke(255,0,0)
  fill(255,0,0)
  quad(-50,-60,640,450,630,490,0,29,50);

  
 	//green circle
  stroke(30, 198, 34);
  fill(30, 198, 34);
  ellipse(315,235,315,230);
  
  //blue square
  stroke(2,12,126);
  fill(2,12,126);
  rect(432,190,40,40);
  
  
}

function draw() {
}function setup() { 
	createCanvas(400,250);
  createP("I put createCanvas() in - functionSetup()")
  createP("Then I changed the background color to 100");
} 

function draw() { 
  background(100);
}function setup() { 
  createCanvas(400, 400);
  	createElement('h1',"Gilad's Turquoise Blue Circle");
  	createElement('b1',"I changed the fill to the RGB for turqoise, which I found ");
    createA("https://www.rapidtables.com/web/color/turquoise-color.html", "here.");
}
function draw() { 
  background(220);
	fill(64,224,208);
	ellipse(200, 200, 100, 100);
}let outerPupil = {
	x:150,
  y:150,
  diameter:60,

}

let innerPupil = {
  x:150,
  y:150,
  diameter:30,
} 
  
function setup() {
  createCanvas(500, 500);
}
  
function draw() {
background(220);
  
  push();
	translate(0,-20);

	//TEETH
	strokeWeight(4);
  fill(255);
  stroke(0);
  quad(100, 425, 425, 240, 390, 450, 130, 470);

	//SKINTONE
  fill(255, 224, 189);
  
  //HEAD
	strokeWeight(4);
	stroke(0);
  quad(50, 50, 450, 50, 450, 250, 50, 450);

  //LEFT GLASSES FRAME
  noFill();
  stroke(254, 194, 65);
  strokeWeight(4);
  rect(50, 50, 200, 200);

  //LEFT OUTER PUPIL
  stroke(114, 210, 249);
  fill(114, 210, 249);
  ellipse(outerPupil.x, outerPupil.y, outerPupil.diameter, outerPupil.diameter);

  //LEFT INNER PUPIL
  stroke(100);
  fill(100);
  ellipse(innerPupil.x, innerPupil.y, innerPupil.diameter, innerPupil.diameter);

  //GLASSES BRIDGE
  stroke(254, 194, 65);
  line(250, 150, 300, 150);

  //RIGHT GLASSES FRAME
  noFill();
  stroke(254, 194, 65);
  strokeWeight(4);
  rect(300, 90, 120, 120);

  //RIGHT OUTER PUPIL
  stroke(114, 210, 249);
  fill(114, 210, 249);
  ellipse(outerPupil.x + 210, outerPupil.y, outerPupil.diameter, outerPupil.diameter);

  //RIGHT INNER PUPIL
  stroke(100);
  fill(100);
  ellipse(innerPupil.x + 210, innerPupil.y, innerPupil.diameter, innerPupil.diameter);

  //nose
  noFill();
  stroke(0);
  bezier(250, 300, 0, 400, 300, 0, 300, 50, 0, 0, 0, 0);

	
	//JAW
  stroke(0);
  fill(255, 224, 189);
  quad(100, 445, 430, 290, 400, 490, 130, 495);

  pop();



}function setup() {
  createCanvas(500, 500);
  
}

function draw() {
background(220);
  
  fill(255,224,189);

  stroke(0);
  strokeWeight(4);
  rect(50,50,400,400)
  

  //LEFT GLASSES FRAME
  noFill();
  stroke(254,194,65);
  strokeWeight(4);
  rect(100,100,120,120);
  
  //LEFT OUTER PUPIL
  ellipseMode(RADIUS); 
  stroke(114, 210, 249);
  fill(114, 210, 249); 
  ellipse(160,160, 30, 30); 

  //LEFT INNER PUPIL
  stroke(100);
  ellipseMode(CENTER); 
  fill(100); 
  ellipse(160,160,30,30); 



  //GLASSES BRIDGE
  stroke(254,194,65);
  line(220,150,270,150);
  

  //RIGHT GLASSES FRAME
  translate(50,-30);
  noFill();
  stroke(254,194,65);
  strokeWeight(4);
  rect(220,130, 120, 120);
  
  //RIGHT OUTER PUPIL
  ellipseMode(RADIUS); 
  stroke(114, 210, 249);
  fill(114, 210, 249); 
  ellipse(280, 190, 30, 30); 

  //RIGHT INNER PUPIL
  stroke(100);
  ellipseMode(CENTER); 
  fill(100); 
  ellipse(280,190, 30, 30); 
  

}function setup() {
  createCanvas(500, 500);
  background(220);
  
  fill(255,224,189);
  stroke(0);
  strokeWeight(4);
  rect(50,50,400,400,150,150,190,190);
  
  line(70,130,150,150);
  
  fill(255,224,189);
  stroke(254,194,65);
  strokeWeight(4);
  rect(150, 150, 80, 80);
  
  ellipseMode(RADIUS); 
  stroke(114, 210, 249);
  fill(114, 210, 249); 
  ellipse(190, 190, 30, 30); 

  stroke(100);
  ellipseMode(CENTER); 
  fill(100); 
  ellipse(190,190, 30, 30); 
    
  line(430,130,350,150);

  fill(255,224,189);
  stroke(254,194,65);
  strokeWeight(4);
  rect(270,150, 80, 80);
  
  ellipseMode(RADIUS); 
  stroke(114, 210, 249);
  fill(114, 210, 249); 
  ellipse(310, 190, 30, 30); 

  stroke(100);
  ellipseMode(CENTER); 
  fill(100); 
  ellipse(310,190, 30, 30); 
  
  
}

function draw() {
  
    

}