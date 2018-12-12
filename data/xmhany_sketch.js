var waves = new Array(30);
var t=0;
var a=0;
// var value = 25;

function setup() {
  createCanvas(1800, 800);

  for (var i = waves.length - 1; i >= 0; i--) {
  	waves[i] = new Wave(random(100,200), random(500,1500), random(8,12));
  }

  console.log(width);
}

function draw() {
  background(255);
  // for (var i = waves.length - 1; i >= 0; i--) {
  // 	waves[i] = new Wave(100+100*noise(t+100), 1000+1000*noise(t), random(16));
  //
  // }
  var test = map(mouseX,0,width,1/8,2);
  //var map_y = map(mouseY,0,1800,1/8,1);
  //console.log(test);

  for (var i = waves.length - 1; i >= 0; i--) {
  	waves[i].calcWave(test);
  	waves[i].renderWave();
  }
  t=+0.1;
  //  a+=1;

}

function Wave(_a, _p, _s) {
	var self = this;
// var b=0
	self.xspacing = (0,9);   // How far apart should each horizontal location be spaced
	self.w = window.innerWidth;              // Width of entire wave

	self.theta = random(0,5);  // Start angle at 0
	self.amplitude = _a;  // Height of wave
	self.period = _p;  // How many pixels before the wave repeats
	self.dx = (Math.PI*2 / self.period) * self.xspacing;  // Value for incrementing X, a function of period and xspacing
	self.yvalues = new Array(Math.round(self.w/self.xspacing));  // Using an array to store height values for the wave
	self.size = _s;


self.calcWave = function(test) {
  // Increment theta (try different values for 'angular velocity' here
  self.theta += 0.02;

  // For every x value, calculate a y value with sine function
  var x = self.theta;
  for (var i = 0; i < self.yvalues.length; i++) {
    self.yvalues[i] = Math.sin(x)*self.amplitude * test;
    x+=self.dx;
  }
}

self.renderWave = function() {
  noStroke();
  fill(12,25,112,50);
  // A simple way to draw the wave with an ellipse at each location
  for (var x = 0; x < self.yvalues.length; x++) {
    ellipse(x*self.xspacing, (height/2-50)+self.yvalues[x], self.size, self.size);
  }
}



}var waves = new Array(40);

function setup() {
  createCanvas(1800, 800);

  for (var i = waves.length - 1; i >= 0; i--) {
  	waves[i] = new Wave(random(200), random(1500), random(16));
  }
}

function draw() {
  background(255);
  for (var i = waves.length - 1; i >= 0; i--) {
  	waves[i].calcWave();
  	waves[i].renderWave();
  }
}

function Wave(_a, _p, _s) {
	var self = this;

	self.xspacing = 7;   // How far apart should each horizontal location be spaced
	self.w = window.innerWidth;              // Width of entire wave

	self.theta = 0.0;  // Start angle at 0
	self.amplitude = _a;  // Height of wave
	self.period = _p;  // How many pixels before the wave repeats
	self.dx = (Math.PI*2 / self.period) * self.xspacing;  // Value for incrementing X, a function of period and xspacing
	self.yvalues = new Array(Math.round(self.w/self.xspacing));  // Using an array to store height values for the wave
	self.size = _s;


self.calcWave = function() {
  // Increment theta (try different values for 'angular velocity' here
  self.theta += 0.02;

  // For every x value, calculate a y value with sine function
  var x = self.theta;
  for (var i = 0; i < self.yvalues.length; i++) {
    self.yvalues[i] = Math.sin(x)*self.amplitude;
    x+=self.dx;
  }
}

self.renderWave = function() {
  noStroke();
  fill(25,25,112);
  // A simple way to draw the wave with an ellipse at each location
  for (var x = 0; x < self.yvalues.length; x++) {
    ellipse(x*self.xspacing, (height/2-50)+self.yvalues[x], self.size, self.size);
  }
}

}var waves = new Array(50);

function setup() {
  createCanvas(1800, 800);

  for (var i = waves.length - 1; i >= 0; i--) {
  	waves[i] = new Wave(random(200), random(1500), random(16));
  }
}

function draw() {
  background(255);
  for (var i = waves.length - 1; i >= 0; i--) {
  	waves[i].calcWave();
  	waves[i].renderWave();
  }
}

function Wave(_a, _p, _s) {
	var self = this;

	self.xspacing = 16;   // How far apart should each horizontal location be spaced
	self.w = window.innerWidth+3;              // Width of entire wa

	self.theta = 0.0;  // Start angle at 0
	self.amplitude = _a;  // Height of wave
	self.period = _p;  // How many pixels before the wave repeats
	self.dx = (Math.PI*2 / self.period) * self.xspacing;  // Value for incrementing X, a function of period and xspacing
	self.yvalues = new Array(Math.round(self.w/self.xspacing));  // Using an array to store height values for the wave
	self.size = _s;


self.calcWave = function() {
  // Increment theta (try different values for 'angular velocity' here
  self.theta += 0.02;

  // For every x value, calculate a y value with sine function
  var x = self.theta;
  for (var i = 0; i < self.yvalues.length; i++) {
    self.yvalues[i] = Math.sin(x)*self.amplitude;
    x+=self.dx;
  }
}

self.renderWave = function() {
  noStroke();
  fill(124,10,4);
  // A simple way to draw the wave with an ellipse at each location
  for (var x = 0; x < self.yvalues.length; x++) {
    ellipse(x*self.xspacing, (height/2-50)+self.yvalues[x], self.size, self.size);
  }
}

}
var particles = [];
var vehicles = [];
var points = [];
var img;
var beat = false;
var beat2 = false;
var pg1;
var pg2;
var pg3;
var showOrder = 0;
var a = 100;


// Declare a "SerialPort" object
let serial;
//let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas
var Humi;
var Pulse;
var humi1;
var humi2;

//var inString;
var portName = '/dev/cu.usbmodem1441';
var options = {
  baudrate: 115200
};

function preload() {
  img = loadImage("heart-3.png");
}


function setup() {
  pixelDensity(1);

  createCanvas(800, 600);
  //background(30, 40, 50);
  pg1 = createGraphics(800, 600);
  pg2 = createGraphics(800, 600);
  pg3 = createGraphics(800, 600);
  serial = new p5.SerialPort();
  serial.open(portName, options);
  serial.on('data', serialEvent);
  
  for (i = 0; i < 1000; i++) {
    particles.push(new Particle(0, 0));
  }

  img.loadPixels();
  for (var x = 0; x < img.width; x += 10) {
    for (var y = 0; y < img.height; y += 10) {
      var index = x + y * img.width;
      var c = img.pixels[index * 4];
      var b = brightness([c]);
      if (b > 1) {
        points.push(createVector(x, y));
      }
    }

    // Instantiate our SerialPort object

    //     //serial.on('list', printList); // set a callback function for the serialport list event
    //     serial.on('connected', serverConnected); // callback for connecting to the server
    //     serial.on('open', portOpen); // callback for the port opening
    //     serial.on('data', serialEvent); // callback for when new data arrives
    //     serial.on('error', serialError); // callback for errors
    //     serial.on('close', portClose); // callback for the port closing

    //     serial.list(); // list the serial ports

    // serial.open("/dev/cu.usbmodem1441");


  }


  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }
}

// function serialEvent() {
//  // read a byte from the serial port:
//  var inByte = serial.read();
//  // store it in a global variable:
//  inData = Number(inByte);
// }


function draw() {
  //console.log(a);

  if (frameCount % 60 == 1) {
    beat = true;
  } else {
    beat = false;
  }


  if (frameCount % 200 > 1 && frameCount % 200 < 100) {
    beat1 = true;
    a++;
  } else {
    beat2 = false;
    a--;
  }

  //console.log(humi1+humi2);
  if ((humi1 + humi2) / 2 > 140) {
    showOrder = 0;
  }

  if ((humi1 + humi2) / 2 > 130 && (humi1 + humi2) / 2 < 140) {
    showOrder = 1;
  }

  if ((humi1 + humi2) / 2 < 100) {
    showOrder = 2;
  }

  if (showOrder == 0) {
    pg1.background(51);
    pg1.clear();
    pg1.blendMode(ADD);
    pg1.fill(0);
    pg1.rect(0, 0, windowWidth, windowHeight);
  } else if (showOrder == 1) {

    pg2.background(51);
    pg2.clear();
    pg2.blendMode(ADD);
    pg2.fill(0);
    pg2.rect(0, 0, windowWidth, windowHeight);
  } else if (showOrder == 2) {
    pg3.background(51);
    pg3.clear();
    pg3.blendMode(ADD);
    pg3.fill(0);
    pg3.rect(0, 0, windowWidth, windowHeight);
  }

  for (i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();
  }

  setTimeout(function() {
    for (var i = 0; i < vehicles.length; i++) {
      var v = vehicles[i];
      v.behaviors();
    }
  }, 9000);


  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    // v.behaviors();
    v.update();
    v.show(particles[i].display);

  }

  if (showOrder == 0) {
    image(pg1, 0, 0);
  } else if (showOrder == 1) {
    image(pg2, 0, 0);
  } else if (showOrder == 2) {
    image(pg3, 0, 0);
  }

}

function mousePressed() {
  showOrder++;
  if (showOrder > 2) {
    showOrder = 0;
  }
  // console.log(showOrder);

}

function serialEvent() {
  // read a string from the serial port
  // until you get carriage return and newline:
  // var inString = serial.readStringUntil('\r\n');
  var inString = serial.readLine();
  //print(inString);
  //check to see that there's actually a string there:
  if (inString.length > 0) {
    var sensors = inString.split(','); // split the string on the commas
    // conso
    //if (sensors.length > 1) { // if there are three elements
    humi1 = int(map(sensors[0], 0, 100, 0, 300));
    humi2 = int(map(sensors[1], 0, 100, 0, 300));
    //pulse1 = map(sensors[2], 0, 100, 0, 300);
    console.log('humi1:', humi1, ',', 'humi2:', humi2);


    // element 0 is the boardx
    //wh = map(sensors[1], 0, 1023, 0, height/2); // element 1 is the wall's height
    //circleColor = 255 - (sensors[2] * 255);      // element 2 is the button
  }
  //  }


}

var particles = [];

var vehicles = [];
var points = [];
var img;
var beat = false;
var beat2 = false;
var pg1;
var pg2;
var pg3;
var showOrder = 0;
var a = 100;


function preload() {
  img = loadImage("heart-3.png");
}


function setup() {
    pixelDensity(1);

  createCanvas(600, 400);
  background(30, 40, 50);
  pg1 = createGraphics(600,400);
  pg2 = createGraphics(600,400);
  pg3 = createGraphics(600,400);


  for (i = 0; i < 1000; i++) {
    particles.push(new Particle(0, 0));
  }

  img.loadPixels();
  for (var x = 0; x < img.width; x += 10) {
    for (var y = 0; y < img.height; y += 10) {
      var index = x + y * img.width;
      var c = img.pixels[index * 4];
      var b = brightness([c]);
      if (b > 1) {
        points.push(createVector(x, y));
      }
    }
  }


  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }
}

function draw() {
	//console.log(a);
  
  if (frameCount % 60 == 1) {
    beat = true;
  } else {
    beat = false;
  }
  
  
   if (frameCount % 200 > 1 && frameCount%200<100) {
    beat2 = true;
     a++;
  } else {
    beat2 = false;
    a--;
  }
  
  if(showOrder == 0){
  pg1.background(51);
  pg1.clear();
  pg1.blendMode(ADD);
  pg1.fill(0);
  pg1.rect(0, 0, windowWidth, windowHeight);
  }else if(showOrder == 1){
  
  pg2.background(51);
  pg2.clear();
  pg2.blendMode(ADD);
  pg2.fill(0);
  pg2.rect(0, 0, windowWidth, windowHeight);
  }else if (showOrder == 2){
  pg3.background(51);
  pg3.clear();
  pg3.blendMode(ADD);
  pg3.fill(0);
  pg3.rect(0, 0, windowWidth, windowHeight);}

  for (i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();
  }

  setTimeout(function() {
    for (var i = 0; i < vehicles.length; i++) {
      var v = vehicles[i];
      v.behaviors();
    }
  }, 5000);


  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    // v.behaviors();
    v.update();
    v.show(particles[i].display);

  }
  
  if(showOrder == 0){
  image(pg1, 0, 0);
  }else if(showOrder == 1){
  image(pg2, 0, 0);
  }else if (showOrder == 2){
  image(pg3,0,0);
  }

}

function mousePressed() {
  showOrder ++;
  if (showOrder > 2) {
    showOrder = 0;
  } 
    // console.log(showOrder);

}
var num = 3000;
var vx = new Array(num);
var vy = new Array(num);
var x = new Array(num);
var y = new Array(num);
var ax = new Array(num);
var ay = new Array(num);
var ax2 = new Array(num);
var ay2 = new Array(num);

var magnetism = 80;
var radius = 2;
var gensoku = 0.96;
var isTouched = false;
var parX = window.innerWidth - 100;
var parY = window.innerHeight - 100;


function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();; 
  ellipseMode(RADIUS);
  background(30, 40, 50);
  blendMode(ADD);

  for (var i = 0; i < num; i++) {
    x[i] = random(width);
    y[i] = random(height);
    vx[i] = 0;
    vy[i] = 0;
    ax[i] = 0;
    ay[i] = 0;
    ax2[i] = 0;
    ay2[i] = 0;
  }
}


function draw() {
  
  if(isTouched){
  	parX = noise(frameCount/1000)*width;
    parY = random(1)*height;
  }else{
  	parX = width -100;
    parY = height - 100;
  }
  background(30, 40, 50, 1);
  clear();
  //fill(0, 0, 0);

  rect(0, 0, windowWidth, windowHeight);

  for (var i = 0; i < num; i++) {
    var distance = dist(mouseX, mouseY, x[i], y[i]);

    if (distance > 3 && distance < 200) {
      ax[i] = magnetism * (mouseX - x[i]) / (distance * distance);
      ay[i] = magnetism * (mouseY - y[i]) / (distance * distance);
      ax2[i] = 0;
      ay2[i] = 0;
    }

    if (distance > 200 + random(0, 500)) {
      x[i] = parX;
      y[i] = parY;
      ax[i] = 0.8;
      ay[i] = -0.3;
      ax2[i] = -random(0, 1);
      ay2[i] = -random(0, 1);
    }

    vx[i] += ax[i] + ax2[i];
    vy[i] += ay[i] + ay2[i];

    vx[i] = vx[i] * gensoku;
    vy[i] = vy[i] * gensoku;



    x[i] += vx[i];
    y[i] += vy[i];

    var sokudo = dist(mouseX, mouseY, vx[i], vy[i]);
    //print("sokudo:"+sokudo);
    // windowDistance=sqrt(windowWidth*windowWidth+windowHeight*windowHeight);
    var r = int(map(sokudo, 0, 900, 0, 255));
    var g = int(map(sokudo, 0, 900, 64, 255));
    var b = int(map(sokudo, 0, 900, 128, 255));
    //print("r:"+r+"g:"+g+"b:"+b);    
    //print(sokudo);
    fill(r, g, b, 100);
    ellipse(x[i], y[i], radius, radius);
  }



}

function mousePressed(){
	isTouched = !isTouched;
  console.log(isTouched);
}

var particles = [];

var vehicles = [];
var points = [];
var img;
var beat = false;
var beat2 = false;
var pg1;
var pg2;
var pg3;
var showOrder = 0;
var a = 100;


function preload() {
  img = loadImage("heart-3.png");
}


function setup() {
    pixelDensity(1);

  createCanvas(600, 400);
  background(30, 40, 50);
  pg1 = createGraphics(600,400);
  pg2 = createGraphics(600,400);
  pg3 = createGraphics(600,400);


  for (i = 0; i < 1000; i++) {
    particles.push(new Particle(0, 0));
  }

  img.loadPixels();
  for (var x = 0; x < img.width; x += 10) {
    for (var y = 0; y < img.height; y += 10) {
      var index = x + y * img.width;
      var c = img.pixels[index * 4];
      var b = brightness([c]);
      if (b > 1) {
        points.push(createVector(x, y));
      }
    }
  }


  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }
}

function draw() {
	//console.log(a);
  
  if (frameCount % 60 == 1) {
    beat = true;
  } else {
    beat = false;
  }
  
  
   if (frameCount % 200 > 1 && frameCount%200<100) {
    beat2 = true;
     a++;
  } else {
    beat2 = false;
    a--;
  }
  
  if(showOrder == 0){
  pg1.background(51);
  pg1.clear();
  pg1.blendMode(ADD);
  pg1.fill(0);
  pg1.rect(0, 0, windowWidth, windowHeight);
  }else if(showOrder == 1){
  
  pg2.background(51);
  pg2.clear();
  pg2.blendMode(ADD);
  pg2.fill(0);
  pg2.rect(0, 0, windowWidth, windowHeight);
  }else if (showOrder == 2){
  pg3.background(51);
  pg3.clear();
  pg3.blendMode(ADD);
  pg3.fill(0);
  pg3.rect(0, 0, windowWidth, windowHeight);}

  for (i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();
  }

  setTimeout(function() {
    for (var i = 0; i < vehicles.length; i++) {
      var v = vehicles[i];
      v.behaviors();
    }
  }, 5000);


  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    // v.behaviors();
    v.update();
    v.show(particles[i].display);

  }
  
  if(showOrder == 0){
  image(pg1, 0, 0);
  }else if(showOrder == 1){
  image(pg2, 0, 0);
  }else if (showOrder == 2){
  image(pg3,0,0);
  }

}

function mousePressed() {
  showOrder ++;
  if (showOrder > 2) {
    showOrder = 0;
  } 
    // console.log(showOrder);

}


var particles = [];

var vehicles = [];
var points = [];
var img;
var beat = false;
var beat2 = false;
var pg1;
var pg2;
var pg3;
var showOrder = 0;
var a = 100;


function preload() {
  img = loadImage("heart-2.png")
}

function setup() {
    pixelDensity(1);

  createCanvas(600, 400);

  background(30, 40, 50);
      image(img,0,0);

  pg1 = createGraphics(600,400);
  pg2 = createGraphics(600,400);
  pg3 = createGraphics(600,400);


  for (i = 0; i < 1000; i++) {
    particles.push(new Particle(0, 0));
  }

  img.loadPixels();
  for (var x = 0; x < img.width; x += 10) {
    for (var y = 0; y < img.height; y += 10) {
      var index = x + y * img.width;
      var c = img.pixels[index * 4];
      var b = brightness([c]);
      if (b > 1) {
        points.push(createVector(x, y));
      }
    }
  }


  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }
}

function draw() {
	//console.log(a);
  
  if (frameCount % 60 == 1) {
    beat = true;
  } else {
    beat = false;
  }
  
  
   if (frameCount % 200 > 1 && frameCount%200<100) {
    beat2 = true;
     a++;
  } else {
    beat2 = false;
    a--;
  }
  
  if(showOrder == 0){
  pg1.background(51);
  pg1.clear();
  pg1.blendMode(ADD);
  pg1.fill(0);
  pg1.rect(0, 0, windowWidth, windowHeight);
  }else if(showOrder == 1){
  
  pg2.background(51);
  pg2.clear();
  pg2.blendMode(ADD);
  pg2.fill(0);
  pg2.rect(0, 0, windowWidth, windowHeight);
  }else if (showOrder == 2){
  pg3.background(51);
  pg3.clear();
  pg3.blendMode(ADD);
  pg3.fill(0);
  pg3.rect(0, 0, windowWidth, windowHeight);}

  for (i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();
  }

  setTimeout(function() {
    for (var i = 0; i < vehicles.length; i++) {
      var v = vehicles[i];
      v.behaviors();
    }
  }, 13000);


  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    // v.behaviors();
    v.update();
    v.show(particles[i].display);

  }
  
  if(showOrder == 0){
  image(pg1, 0, 0);
  }else if(showOrder == 1){
  image(pg2, 0, 0);
  }else if (showOrder == 2){
  image(pg3,0,0);
  }

}

function mousePressed() {
  showOrder ++;
  if (showOrder > 2) {
    showOrder = 0;
  } 
    // console.log(showOrder);

}
var R=180, r=15, h0=[120, 120], phi=0;
var t=[0,0], t_inc=[0,0];
var numPovars=360;

var numFigs=8;



function setup() {
  colorMode(HSB, 1.0, 1.0, 1.0);
  createCanvas(900, 900, P2D);
  frameRate(25);
  strokeWeight(3);
  t_inc[0]=TWO_PI/frameRate()/1250;
  t_inc[1]=TWO_PI/frameRate()/4045;
}

function draw() {
  background(0);
  phi=0;
  push();
  translate(width/2, height/2);
  for(var i=0; i<numPovars; i++) {
    for(var k=0; k<2; k++) {
      t[k]+=t_inc[k];
      stroke(0.5+0.5*sin(t[1-k]), 1, 1);
      var h=h0[k]*cos(phi)-h0[k]*sin(t[k]);
      for(var j=0; j<numFigs; j++) {
        push();
        rotate(TWO_PI/numFigs*j);
        point((R-r)*cos(phi)+h*cos((R-r)/r*phi), 
              (R-r)*sin(phi)+h*sin((R-r)/r*phi));
        pop();
      }
    }
    phi+=TWO_PI/numPovars;   
  }
  pop();
}

var particles = [];

var vehicles = [];
var points = [];
var img;
var friend = false; //for pg1
var nope = false;//for pg3
var love = false;//for pg2
var pg1;
var pg2;
var pg3;
var showOrder = 0;
var a = 100;


function preload() {
  img = loadImage("heart-3.png");
}


function setup() {
    pixelDensity(1);

  createCanvas(600, 400);
  background(30, 40, 50);
  pg1 = createGraphics(600,400);
  pg2 = createGraphics(600,400);
  pg3 = createGraphics(600,400);


  for (i = 0; i < 1000; i++) {
    particles.push(new Particle(0, 0));
  }

  img.loadPixels();
  for (var x = 0; x < img.width; x += 10) {
    for (var y = 0; y < img.height; y += 10) {
      var index = x + y * img.width;
      var c = img.pixels[index * 4];
      var b = brightness([c]);
      if (b > 1) {
        points.push(createVector(x, y));
      }
    }
  }


  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }
}

function draw() {
	//console.log(a);
  
  if (frameCount % 100 == 1) {
    friend = true;
  } else {
    friend = false;
  }
  
    if (frameCount % 30 == 1) {
    love = true;
  } else {
    love = false;
  }
  
  
   if (frameCount % 200 > 1 && frameCount%200<100) {
    nope = true;
     a++;
  } else {
    nope = false;
    a--;
  }
  
  if(showOrder == 0){
  pg1.background(51);
  pg1.clear();
  pg1.blendMode(ADD);
  pg1.fill(0);
  pg1.rect(0, 0, windowWidth, windowHeight);
  }else if(showOrder == 1){
  
  pg2.background(51);
  pg2.clear();
  pg2.blendMode(ADD);
  pg2.fill(0);
  pg2.rect(0, 0, windowWidth, windowHeight);
  }else if (showOrder == 2){
  pg3.background(51);
  pg3.clear();
  pg3.blendMode(ADD);
  pg3.fill(0);
  pg3.rect(0, 0, windowWidth, windowHeight);}

  for (i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();
  }

  setTimeout(function() {
    for (var i = 0; i < vehicles.length; i++) {
      var v = vehicles[i];
      v.behaviors();
    }
  }, 5000);


  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    // v.behaviors();
    v.update();
    v.show(particles[i].display);

  }
  
  if(showOrder == 0){
  image(pg1, 0, 0);
  }else if(showOrder == 1){
  image(pg2, 0, 0);
  }else if (showOrder == 2){
  image(pg3,0,0);
  }

}

function mousePressed() {
  showOrder ++;
  if (showOrder > 2) {
    showOrder = 0;
  } 
    // console.log(showOrder);

}
// Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// Video: https://www.youtube.com/watch?v=4hA7G3gup-4

var particles = [];

var vehicles = [];
var points = [];
var img;


function preload() {
  img = loadImage("bh.png");
}


function setup() {
  createCanvas(600, 400);
  background(30, 40, 50);
  
  
  for(i = 0; i<1000; i++){
  particles.push(new Particle(0, 0));
  }

  img.loadPixels();
  for (var x = 0; x < img.width; x+=10) {
    for (var y = 0; y < img.height; y+=10) {
      var index = x + y * img.width;
      var c = img.pixels[index * 4];
      var b = brightness([c]);
      if (b > 1) {
        points.push(createVector(x, y));
      }
    }
  }


  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }
}

function draw() {
  background(51);
  clear();
  blendMode(ADD);
  fill(0);
  rect(0, 0, windowWidth, windowHeight);
 
  for(i = 0; i < particles.length;i++){
    particles[i].update();
    particles[i].display();
  }
  
  setTimeout(  function(){for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviors(); 
  }},9000);

  
  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    // v.behaviors();
    v.update();
    v.show(particles[i].display); 
    
  }
  }



var particles = [];

var vehicles = [];
var points = [];
var img;
var beat = false;


function preload() {
  img = loadImage("heart-3.png");
}


function setup() {
  createCanvas(600, 400);
  background(30, 40, 50);


  for (i = 0; i < 1000; i++) {
    particles.push(new Particle(0, 0));
  }

  img.loadPixels();
  for (var x = 0; x < img.width; x += 10) {
    for (var y = 0; y < img.height; y += 10) {
      var index = x + y * img.width;
      var c = img.pixels[index * 4];
      var b = brightness([c]);
      if (b > 1) {
        points.push(createVector(x, y));
      }
    }
  }


  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }
}

function draw() {
  if (frameCount % 60 == 1) {
    beat = true;
  } else {
    beat = false;
  }
  background(51);
  clear();
  blendMode(ADD);
  fill(0);
  rect(0, 0, windowWidth, windowHeight);

  for (i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();
  }

  setTimeout(function() {
    for (var i = 0; i < vehicles.length; i++) {
      var v = vehicles[i];
      v.behaviors();
    }
  }, 9000);


  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    // v.behaviors();
    v.update();
    v.show(particles[i].display);

  }
}// Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// Video: https://www.youtube.com/watch?v=4hA7G3gup-4

var particles = [];

var vehicles = [];
var points = [];
var img;


function preload() {
  img = loadImage("heart-3.png");
}


function setup() {
  createCanvas(600, 400);
  background(30, 40, 50);
  
  
  for(i = 0; i<1000; i++){
  particles.push(new Particle(0, 0));
  }

  img.loadPixels();
  for (var x = 0; x < img.width; x+=10) {
    for (var y = 0; y < img.height; y+=10) {
      var index = x + y * img.width;
      var c = img.pixels[index * 4];
      var b = brightness([c]);
      if (b > 1) {
        points.push(createVector(x, y));
      }
    }
  }


  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }
}

function draw() {
  background(51);
  clear();
  blendMode(ADD);
  fill(0);
  rect(0, 0, windowWidth, windowHeight);
 
  for(i = 0; i < particles.length;i++){
    particles[i].update();
    particles[i].display();
  }
  
  setTimeout(  function(){for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviors(); 
  }},9000);

  
  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    // v.behaviors();
    v.update();
    v.show(particles[i].display); 
    
  }
  }

// Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// Video: https://www.youtube.com/watch?v=4hA7G3gup-4

var particles = [];

var vehicles = [];
var points = [];
var img;


function preload() {
  img = loadImage("heart-3.png");
}


function setup() {
  createCanvas(600, 400);
  background(30, 40, 50);
  
  
  for(i = 0; i<1000; i++){
  particles.push(new Particle(0, 0));
  }

  img.loadPixels();
  for (var x = 0; x < img.width; x+=10) {
    for (var y = 0; y < img.height; y+=10) {
      var index = x + y * img.width;
      var c = img.pixels[index * 4];
      var b = brightness([c]);
      if (b > 1) {
        points.push(createVector(x, y));
      }
    }
  }


  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);

  }
}

function draw() {
  background(51);
  clear();
  blendMode(ADD);
  fill(0);
  rect(0, 0, windowWidth, windowHeight);
 
  for(i = 0; i < particles.length;i++){
    particles[i].update();
    particles[i].display();
  }

  
  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.show(particles[i].display); 
    
  }
  }

var points = [];
var img;

var num = 3000;
var vx = new Array(num);
var vy = new Array(num);
var x = new Array(num);
var y = new Array(num);
var ax = new Array(num);
var ay = new Array(num);
var ax2 = new Array(num);
var ay2 = new Array(num);
var px = 0, py = 0;

// var magnetism = 20;
var magnetism = 40;

var radius = 1.25;
var gensoku = 0.9;

function preload() {
  img = loadImage("heart-white.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  ellipseMode(RADIUS);
  background(30, 40, 50);
  // blendMode(ADD);

  for (var i = 0; i < num; i++) {
    x[i] = random(width);
    y[i] = random(height);
    vx[i] = 0;
    vy[i] = 0;
    ax[i] = 0;
    ay[i] = 0;
    ax2[i] = 0;
    ay2[i] = 0;
  }
  
  img.loadPixels();
  for (var _x = 0; _x < img.width; _x+=1) {
    for (var _y = 0; _y < img.height; _y+=1) {
      var _i = _x + _y * img.width;
      var c = img.pixels[_i * 4];
      var b = brightness([c]);
      if (b > 1) {
        points.push(createVector(_x, _y));
      }
    }
  }
}


function draw() {
  background(30, 40, 50, 25);
  //clear();

  
  var p = points[Math.round(millis() * 1) % points.length];
	px = p.x
  py = p.y
  
  for (var i = 0; i < num; i++) {
    var distance = dist(px, py, x[i], y[i]);

    if (distance > 3 && distance < 200) {
      ax[i] = magnetism * (px - x[i]) / (distance * distance);
      ay[i] = magnetism * (py - y[i]) / (distance * distance);
      ax2[i] = 0;
      ay2[i] = 0;
    }

    if (distance > 200 + random(0, 500)) {
      x[i] = px;
      y[i] = py;
      ax[i] = 0.8;
      ay[i] = -0.3;
      ax2[i] = -random(-1, 1);
      ay2[i] = -random(-1, 1);
    }

    vx[i] += ax[i] + ax2[i];
    vy[i] += ay[i] + ay2[i];

    vx[i] = vx[i] * gensoku;
    vy[i] = vy[i] * gensoku;


    x[i] += vx[i];
    y[i] += vy[i];

    var sokudo = dist(px, py, vx[i], vy[i]);
    //print("sokudo:"+sokudo);
    // windowDistance=sqrt(windowWidth*windowWidth+windowHeight*windowHeight);
    var r = int(map(sokudo, 0, 50, 0, 255));
    var g = int(map(sokudo, 0, 2000, 0, 255));
    var b = int(map(sokudo, 0, 1000, 0, 255));
    //print("r:"+r+"g:"+g+"b:"+b);    
    //print(sokudo);
    fill(r, g, b, 100);
    ellipse(x[i], y[i], radius, radius);
  }



}var vehicles = [];
var points = [];
var img;

function preload() {
  img = loadImage("heart.png");
}


function setup() {
  createCanvas(600, 400);
  background(51);

  img.loadPixels();
  for (var x = 0; x < img.width; x+=10) {
    for (var y = 0; y < img.height; y+=10) {
      var index = x + y * img.width;
      var c = img.pixels[index * 4];
      var b = brightness([c]);
      if (b > 1) {
        points.push(createVector(x, y));
      }
    }
  }

  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }
}

function draw() {
  background(51);
  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  }
}// Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// Video: https://www.youtube.com/watch?v=4hA7G3gup-4

var font;
var vehicles = [];

function preload() {
  font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup() {
  createCanvas(600, 300);
  background(51);
  // textFont(font);
  // textSize(192);
  // fill(255);
  // noStroke();
  // text('train', 100, 200);

  var points = font.textToPoints('train', 100, 200, 192, {
    sampleFactor: 0.25
  });

  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
    // stroke(255);
    // strokeWeight(8);
    // point(pt.x, pt.y);
  }
}

function draw() {
  background(51);
  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  }
}var points = [];
var img;

var num = 3000;
var vx = new Array(num);
var vy = new Array(num);
var x = new Array(num);
var y = new Array(num);
var ax = new Array(num);
var ay = new Array(num);
var ax2 = new Array(num);
var ay2 = new Array(num);
var px = 0, py = 0;

var magnetism = 30;
var radius = 1.5;
var gensoku = 0.93;

function preload() {
  img = loadImage("heart.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  ellipseMode(RADIUS);
  background(30, 40, 50);
  blendMode(ADD);

  for (var i = 0; i < num; i++) {
    x[i] = random(width);
    y[i] = random(height);
    vx[i] = 0;
    vy[i] = 0;
    ax[i] = 0;
    ay[i] = 0;
    ax2[i] = 0;
    ay2[i] = 0;
  }
  
  img.loadPixels();
  for (var _x = 0; _x < img.width; _x+=1) {
    for (var _y = 0; _y < img.height; _y+=1) {
      var _i = _x + _y * img.width;
      var c = img.pixels[_i * 4];
      var b = brightness([c]);
      if (b > 1) {
        points.push(createVector(_x, _y));
      }
    }
  }
}


function draw() {
  background(30, 40, 50, 100);
  clear();

  
  var p = points[Math.round(millis() * 30) % points.length];
	px = p.x
  py = p.y
  
  for (var i = 0; i < num; i++) {
    var distance = dist(px, py, x[i], y[i]);

    if (distance > 3 && distance < 200) {
      ax[i] = magnetism * (px - x[i]) / (distance * distance);
      ay[i] = magnetism * (py - y[i]) / (distance * distance);
      ax2[i] = 0;
      ay2[i] = 0;
    }

    if (distance > 200 + random(0, 500)) {
      x[i] = px;
      y[i] = py;
      ax[i] = 0.8;
      ay[i] = -0.3;
      ax2[i] = -random(0, 1);
      ay2[i] = -random(0, 1);
    }

    vx[i] += ax[i] + ax2[i];
    vy[i] += ay[i] + ay2[i];

    vx[i] = vx[i] * gensoku;
    vy[i] = vy[i] * gensoku;


    x[i] += vx[i];
    y[i] += vy[i];

    var sokudo = dist(px, py, vx[i], vy[i]);
    //print("sokudo:"+sokudo);
    // windowDistance=sqrt(windowWidth*windowWidth+windowHeight*windowHeight);
    var r = int(map(sokudo, 0, 900, 0, 255));
    var g = int(map(sokudo, 0, 900, 64, 255));
    var b = int(map(sokudo, 0, 900, 128, 255));
    //print("r:"+r+"g:"+g+"b:"+b);    
    //print(sokudo);
    fill(r, g, b, 100);
    ellipse(x[i], y[i], radius, radius);
  }



}var num = 3000;
var vx = new Array(num);
var vy = new Array(num);
var x = new Array(num);
var y = new Array(num);
var ax = new Array(num);
var ay = new Array(num);
var ax2 = new Array(num);
var ay2 = new Array(num);

var magnetism = 80;
var radius = 2;
var gensoku = 0.96;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();; 
  ellipseMode(RADIUS);
  background(30, 40, 50);
  blendMode(ADD);

  for (var i = 0; i < num; i++) {
    x[i] = random(width);
    y[i] = random(height);
    vx[i] = 0;
    vy[i] = 0;
    ax[i] = 0;
    ay[i] = 0;
    ax2[i] = 0;
    ay2[i] = 0;
  }
}


function draw() {
  background(30, 40, 50, 1);
  clear();
  //fill(0, 0, 0);

  rect(0, 0, windowWidth, windowHeight);

  for (var i = 0; i < num; i++) {
    var distance = dist(mouseX, mouseY, x[i], y[i]);

    if (distance > 3 && distance < 200) {
      ax[i] = magnetism * (mouseX - x[i]) / (distance * distance);
      ay[i] = magnetism * (mouseY - y[i]) / (distance * distance);
      ax2[i] = 0;
      ay2[i] = 0;
    }

    if (distance > 200 + random(0, 500)) {
      x[i] = mouseX;
      y[i] = mouseY;
      ax[i] = 0.8;
      ay[i] = -0.3;
      ax2[i] = -random(0, 1);
      ay2[i] = -random(0, 1);
    }

    vx[i] += ax[i] + ax2[i];
    vy[i] += ay[i] + ay2[i];

    vx[i] = vx[i] * gensoku;
    vy[i] = vy[i] * gensoku;



    x[i] += vx[i];
    y[i] += vy[i];

    var sokudo = dist(mouseX, mouseY, vx[i], vy[i]);
    //print("sokudo:"+sokudo);
    // windowDistance=sqrt(windowWidth*windowWidth+windowHeight*windowHeight);
    var r = int(map(sokudo, 0, 900, 0, 255));
    var g = int(map(sokudo, 0, 900, 64, 255));
    var b = int(map(sokudo, 0, 900, 128, 255));
    //print("r:"+r+"g:"+g+"b:"+b);    
    //print(sokudo);
    fill(r, g, b, 100);
    ellipse(x[i], y[i], radius, radius);
  }



}var num = 2000;
var vx = new Array(num);
var vy = new Array(num);
var x = new Array(num);
var y = new Array(num);
var ax = new Array(num);
var ay = new Array(num);
var ax2 = new Array(num);
var ay2 = new Array(num);
var px = 0,
  py = 0;

var magnetism = 80;
var radius = 2;
var gensoku = 0.96;
var heartD = 2;

var heartPoints = [
  [50, 50],
  [60, 60],
  [70, 70],
  [80, 80],
  [90, 90],
  [100, 100],
  [110, 110],
  [120, 120],
  [130, 130],
  [40, 40],
  [150, 150],
  [160, 160],
  [160, 150],
  [170, 140],
  [170, 130],
  [180, 120],
  [190, 110],
  [210, 100],

];


function setup() {
  createCanvas(windowWidth, windowHeight);
  //stroke(100, 10, 200); 
  ellipseMode(RADIUS);
  background(30, 40, 50);
  blendMode(ADD);

  for (var i = 0; i < num; i++) {
    x[i] = random(width);
    y[i] = random(height);
    vx[i] = 0;
    vy[i] = 0;
    ax[i] = 0;
    ay[i] = 0;
    ax2[i] = 0;
    ay2[i] = 0;
  }
}


function draw() {
  point = heartPoints[Math.round(millis() / 10) % (heartPoints.length - 1)];

  px = point[0];
  py = point[1];

  clear();
  fill(0, 0, 0);
  rect(0, 0, windowWidth, windowHeight);

  
  beginShape(LINES);
  stroke(255);
  strokeWeight(10);
  noFill();
  for (var i = 0; i < heartPoints.length - 1; i++) {
    vertex(heartPoints[i][0], heartPoints[i][1]);
  }
  endShape();
  strokeWeight(1);

  

  for (var i = 0; i < num; i++) {
    var distance = dist(px, py, x[i], y[i]);

    if (distance > 3 && distance < 200) {
      ax[i] = magnetism * (px - x[i]) / (distance * distance);
      ay[i] = magnetism * (py - y[i]) / (distance * distance);
      ax2[i] = 0;
      ay2[i] = 0;
    }

    if (distance > 200 + random(0, 500)) {
      x[i] = px;
      y[i] = py;
      ax[i] = 0.8;
      ay[i] = -0.3;
      ax2[i] = -random(0, 1);
      ay2[i] = -random(0, 1);
    }

    vx[i] += ax[i] + ax2[i];
    vy[i] += ay[i] + ay2[i];

    vx[i] = vx[i] * gensoku;
    vy[i] = vy[i] * gensoku;



    x[i] += vx[i];
    y[i] += vy[i];

    var sokudo = dist(px, py, vx[i], vy[i]);
    //print("sokudo:"+sokudo);
    // windowDistance=sqrt(windowWidth*windowWidth+windowHeight*windowHegight);
    var r = int(map(sokudo, 0, 900, 0, 255));
    var g = int(map(sokudo, 0, 900, 64, 255));
    var b = int(map(sokudo, 0, 900, 128, 255));
    //print("r:"+r+"g:"+g+"b:"+b);    
    //print(sokudo);
    fill(r, g, b, 100);

    ellipse(x[i], y[i], radius, radius);

  }



}
var allParticles = [];
var globalHue = 0;
var spawnPerFrame = 3;
var mouseSize = 100;


function Particle(x, y) {
  this.lastPos = new p5.Vector(x, y);
  this.pos = new p5.Vector(x, y);
  this.vel = new p5.Vector(0, 0);
  this.acc = new p5.Vector(0, 0);
  this.size = random(2, 20);
  this.h = globalHue;
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360);
  
  mouseX = width/2;
  mouseY = height/2;
}


function draw() {
  noStroke();
  fill(0, 5);
  rect(0, 0, width, height);
  
  for (var i = 0; i < spawnPerFrame; i++) {
  	allParticles.push(new Particle(random(width), 0));
  }
  
  for (var i = allParticles.length-1; i > -1; i--) {
    allParticles[i].acc.add(new p5.Vector(0, allParticles[i].size*0.01));
    
    // Quick check to avoid calculating distance if possible.
    if (abs(allParticles[i].pos.x-mouseX) < mouseSize) {
      d = dist(mouseX, mouseY, allParticles[i].pos.x, allParticles[i].pos.y);
      if (d < mouseSize) {
        var vec = new p5.Vector(mouseX, mouseY-mouseSize);
        vec.sub(new p5.Vector(allParticles[i].pos.x, allParticles[i].pos.y));
        vec.normalize();
        allParticles[i].vel.add(vec);

        allParticles[i].h += 1.5;
        if (allParticles[i].h > 360) {
          allParticles[i].h = 0;
        }
      }
    }
    
    allParticles[i].vel.add(allParticles[i].acc);
    allParticles[i].pos.add(allParticles[i].vel);
    allParticles[i].acc.mult(0);
    
    stroke(allParticles[i].h, 360, 360);
    strokeWeight(allParticles[i].size);
    line(allParticles[i].lastPos.x, allParticles[i].lastPos.y, 
         allParticles[i].pos.x, allParticles[i].pos.y);
    
    allParticles[i].lastPos.set(allParticles[i].pos.x, allParticles[i].pos.y);
    
    if (allParticles[i].pos.y > height || allParticles[i].pos.x < 0 || allParticles[i].pos.x > width) {
      allParticles.splice(i, 1);
    }
  }
  
  globalHue += 0.15;
  if (globalHue > 360) {
    globalHue = 0;
  }
}let a = 0;
let z;

function setup() { 
  createCanvas(400, 400,WEBGL);
} 

function draw() { 
  background(220);
	rotateX(a);
	ellipseMode(CENTER);
	noFill();
	stroke(0);
	// box(mouseX,mouseY);
	sphere(50);
	translate(mouseX, mouseY);
	
	z+= 2;
	if (z > 100);{
	z=0;
	}

	
	a+= 0.01;
}let x;
let xspeed;
let y;
let yspeed;
let radium;
let rectwidth;
let rectheight;
let a = false;
let t = "press to start";
//variables for slider
let drag = false;
let offset;
//button
let b;
let c;
let d;

//variables for the wall
let wh;

//variables for the board
let bx;

// Declare a "SerialPort" object
let serial;
//let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas


function setup() {
  createCanvas(550, 500);
  x = (width - 50) / 3;
  xspeed = random(5);
  y = height / 3;
  yspeed = random(8);
  radium = 30;
  rectwidth = 100;
  rectheight = 10;
  // b = width - 25;
  // c = height / 3;
  // d = 15;
  
   // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  serial.on('list', printList);    // set a callback function for the serialport list event
 serial.on('connected', serverConnected); // callback for connecting to the server
 serial.on('open', portOpen);     // callback for the port opening
 serial.on('data', serialEvent);  // callback for when new data arrives
 serial.on('error', serialError); // callback for errors
 serial.on('close', portClose);   // callback for the port closing
 
 serial.list();                   // list the serial ports
  serial.open("/dev/cu.usbmodem14521");
}

function draw() {
  background(250);
  noStroke();
  
  serialEvent()

  print(wh);
  
  //wall
  rect(0, 0, width , wh);
  
  //button(sensor[2]);

  //bounce & text
  if (a == true) {

    bounce(0, width , wh, height);

    y += yspeed;
    x += xspeed;
    ellipse(x, y, radium, radium);
  }
  if (a == false) {
    words(t);
  }
  //board
  rect(bx - rectwidth / 2, height - rectheight, rectwidth, rectheight)
}




//bounce
function bounce(w1, w2, h1, h2) {
  if (x < w1 || x > w2) {
    xspeed *= -1;
  }
  if (y < h1) {
    yspeed *= -1;
  }

  if (y > h2 - rectheight) {
    if (abs(bx - x) < rectwidth / 2) {
      yspeed *= -1
      print(y + "and mouseX:" + bx + "and X:" + x)
    } else {
      y = wh;
      a = false;

    }

  }

}

// //buttonpressed
// function button(p) {
//   p=true;
//   a = !a;
// }

//mousepressed
function mousePressed() {
   a = !a;
  fill(random(250), 0, random(250));

  //slider
  if (mouseX > b && mouseX < b + d && mouseY > c && mouseY < c + d) {
    drag = true;

    offset = y - mouseY;
  }
}

function mouseReleased() {
  // Stop dragging
  drag = false;
}

//text
function words(t) {
  fill(0);
  textSize(30);
  text(t, width /3, height / 3);
}

//slider
function slider() {
  //slider
  // Is it being dragged?
  if (drag) {
    c = mouseY + offset;
  }
  // Keep rectangle within limits of slider
  c = constrain(c, height / 3, height * 2 / 3);
  //map wall
  //wh = map(c, height / 3, height * 2 / 3, 0, height * 3 / 4);

  


  rect(width - 50, 0, 50, height);
  stroke(255);
  line(width - 25, height / 3, width - 25, height * 2 / 3);

  rect(b, c, d, d);
}

// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 println(i + " " + portList[i]);
 }
}
 
function serverConnected() {
 println('connected to server.');
}
 
function portOpen() {
 println('the serial port opened.')
}
 
function serialError(err) {
 println('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
 println('The serial port closed.');
}

function serialEvent() {
  // read a string from the serial port
  // until you get carriage return and newline:
  var inString = serial.readStringUntil('\r\n');
 
  //check to see that there's actually a string there:
  if (inString.length > 0 ) {
    var sensors = split(inString, ',');            // split the string on the commas
    if (sensors.length > 2) {                      // if there are three elements
      bx = map(sensors[0], 0, 1023, 0,width);   // element 0 is the boardx
      wh = map(sensors[1], 0, 1023, 0, height/2); // element 1 is the wall's height
      //circleColor = 255 - (sensors[2] * 255);      // element 2 is the button
    }
  }
}var Humi;
var Pulse;

function setup() {
  createCanvas(600, 600);
}
function draw() {
  background(50);
  noFill();
  stroke(255);
  strokeWeight(1);

 	fill(255,233,138);
  Humi = rect(100, 600, 50,-frameCount/2);
  Pulse = rect(200, 600, 50,-frameCount/2);
  
}// Declare a "SerialPort" object
let serial;
//let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas
var Humi;
var Pulse;

//data name from sensor
let pulse1;
let humi1;
let pulse2;
let humi2;

//beat1=(pulse1+humi1)*sth
let beat1;
let beat2;

//heart
let heart;

function preload() {
  heart = loadImage('heart.png');
}

function setup() {
  createCanvas(600, 600);
  //heart1=new Heart(20,200,5);

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing

  serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem1451");
}

function draw() {
  background(220);
  imageMode(CENTER);

  bar();
  image(heart, width/2, height/2, mouseX,mouseX);
}




// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    println(i + " " + portList[i]);
  }
}

function serverConnected() {
  println('connected to server.');
}

function portOpen() {
  println('the serial port opened.')
}

function serialError(err) {
  println('Something went wrong with the serial port. ' + err);
}

function portClose() {
  println('The serial port closed.');
}

function serialEvent() {
  // read a string from the serial port
  // until you get carriage return and newline:
  var inString = serial.readStringUntil('\r\n');

  //check to see that there's actually a string there:
  if (inString.length > 0) {
    var sensors = split(inString, ','); // split the string on the commas
    if (sensors.length > 2) { // if there are three elements
      //bx = map(sensors[0], 0, 1023, 0,width);   // element 0 is the boardx
      //wh = map(sensors[1], 0, 1023, 0, height/2); // element 1 is the wall's height
      //circleColor = 255 - (sensors[2] * 255);      // element 2 is the button
    }
  }


}

function bar() {
  noFill();
  stroke(255);
  strokeWeight(1);

  fill(255, 233, 138);
  Humi = rect(100, 600, 50, -frameCount / 2);
  Pulse = rect(200, 600, 50, -frameCount / 2);
}/* -----------
Google Maps Static API demo.
Visualizing 45,716 Meteorite Landings. Data from NASA's Open Data Portal.(https://data.nasa.gov/Space-Science/Meteorite-Landings/gh4g-9sfh) 
----------- */

// API Key for Google Maps. Get one here: https://developers.google.com/maps/web/
var key = 'AIzaSyCdmGJ7JWNWkmmxSdvNiu1Qo6BMn56eTSE'

// Create an instance of Google.
var mappa = new Mappa('Google', key); 

// Options for map
var options = {
  lat: 0,
  lng: 0,
  zoom: 2,
  width: 640,
  height: 500,
  scale: 1,
  format: 'PNG',
  language: 'en',
  maptype: 'satellite'
}

// Create the static map reference.
var myMap = mappa.staticMap(options);

var img;
var meteorites;

function preload(){
  // Load the image
  img = loadImage(myMap.imgUrl);
  // Load the data
  // meteorites = loadTable('../../data/Meteorite_Landings.csv', 'csv', 'header');
}

function setup(){
  createCanvas(640,500);
  noStroke();

  // Display the image
  image(img, 0, 0);

  // // Show the Meteorites Landings
  // for (var i = 0; i < meteorites.getRowCount(); i++) {
  //   // Get the lat/lng of each meteorite
  //   var pos = myMap.latLngToPixel(meteorites.getString(i, 'reclat'), meteorites.getString(i, 'reclong'));
  //   // Get the size of the meteorite and map it. 60000000 is the mass of the largest meteorite (https://en.wikipedia.org/wiki/Hoba_meteorite)
  //   var size = meteorites.getString(i, 'mass (g)');
  //   size = map(size, 0, 60000000, 3, 25);
  //   fill(random(0,255), random(0,255),random(0,255));
  //   ellipse(pos.x, pos.y, size, size);
  // }
} 

function mousePressed(){
  print(myMap.pixelToLatlng(mouseX, mouseY));
}var mapimg;
// function preload(){
//   maping = loadImage ('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/0,0,1,0,0/1024x512?access_token=pk.eyJ1IjoieWVvbnkxMDIiLCJhIjoiY2o4emkxdjNpMTc3bDMybnJidHowNnU4ayJ9.L7ZFrDdJVYx1ZjXvUrAqnA');
// }

var clat = 0;
var clon = 0;

var lat = 31.2304;
var lon = 121.4737;

var zoom = 1;
var distribution;
var names;

var image;

function mercX(lon) {
  lon = radians(lon);
  var a = (256 / PI) * pow(2, zoom);
  var b = lon + PI;
  return a * b;
}

function mercY(lat) {
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}

function preload()
{
  mapimg = loadImage("https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/0,0,1,0,0/1024x512?access_token=pk.eyJ1IjoieWVvbnkxMDIiLCJhIjoiY2o4emkxdjNpMTc3bDMybnJidHowNnU4ayJ9.L7ZFrDdJVYx1ZjXvUrAqnA");

distribution= loadStrings('http://api.gbif.org/v1/species/5231190/distributions')
  names = loadStrings('http://api.gbif.org/v1/species/2973063/synonyms')
}

function setup() {
  createCanvas(1024, 512);
  
	image(mapimg,0,0);
  
   console.log(image);
  translate(width/2, height/2);
  imageMode(0,0);
  
  var cx = mercX(clon);
  var cy = mercY(clat);
  
  for (var i = 0; i < distribution.length; i++){
  var data = distribution[i].split(/,/);
  var lat = data[1];
  var lon = data[2];
  
  
  var x = mercX(lon) - cx;
  var y = mercY(lat)-cy;
  
  fill(255,0,255,200);
  ellipse(x,y,8,8);
}
}

// function draw()
// {  fill(255,0,255,200);
//   ellipse(x,y,20,20);
// }var mapimg;
function preload(){
  maping = loadImage ('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/0,0,1,0,0/1024x512?access_token=pk.eyJ1IjoieWVvbnkxMDIiLCJhIjoiY2o4emkxdjNpMTc3bDMybnJidHowNnU4ayJ9.L7ZFrDdJVYx1ZjXvUrAqnA');
}


function setup() { 
createCanvas(1024,512);
image(mapimg,0,0);
} 

function draw() { 

}var mapimg;
// function preload(){
//   maping = loadImage ('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/0,0,1,0,0/1024x512?access_token=pk.eyJ1IjoieWVvbnkxMDIiLCJhIjoiY2o4emkxdjNpMTc3bDMybnJidHowNnU4ayJ9.L7ZFrDdJVYx1ZjXvUrAqnA');
// }

var clat = 0;
var clon = 0;

var lat = 31.2304;
var lon = 121.4737;

var zoom = 1;
var meterio;

var image;
var input;

function mercX(lon) {
  lon = radians(lon);
  var a = (256 / PI) * pow(2, zoom);
  var b = lon + PI;
  return a * b;
}

function mercY(lat) {
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}

function preload()
{
  mapimg = loadImage("https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/0,0,1,0,0/1024x512?access_token=pk.eyJ1IjoieWVvbnkxMDIiLCJhIjoiY2o4emkxdjNpMTc3bDMybnJidHowNnU4ayJ9.L7ZFrDdJVYx1ZjXvUrAqnA");
meterio = loadStrings('meterio.csv', gotData);
}

function gotData(e){
console.log(e);

}
function setup() {
  createCanvas(1024, 512);
//   var button = select('#check it out!');
//   button.mousePressed(massCheck);
  
//   input = select('#mass')
//   function massCheck(){
//     loadStrings(gotData);
//   }
  
	image(mapimg,0,0);
  
  // console.log(image);
  translate(width/2, height/2);
  imageMode(0,0);
  
  var cx = mercX(clon);
  var cy = mercY(clat);
  
  for (var i = 0; i < meterio.length; i++){
  var data = meterio[i].split(/,/);
  var lat = data[8];
  var lon = data[9];
    let size= data[5];
    let r= map(size,558,60000000,5,55);
    
  
  
  var x = mercX(lon) - cx;
  var y = mercY(lat)-cy;
  

  fill(255,55,25,150);
    noStroke();
  ellipse(x,y,r);
}
}

// function draw()
// {  fill(255,0,255,200);
//   ellipse(x,y,20,20);
// }var dayimg;
var img
let api = 'https://api.nasa.gov/planetary/apod?api_key=U4mGpycPu3fMpg0dOyg2NTeayd4nai8tu4mvjufY&date=';

let input;

var imgUrl;
function setup() {
  createCanvas(400, 200);

  var button = select('#submit');
  button.mousePressed(dayImgAsk);

  input = select('#date');
}

function dayImgAsk() {
  let url = api + input.value();
  loadJSON(url, gotData);
}

function gotData(data) {
  img = data;
	imgUrl = img.url;
  print(imgUrl);
  dayimg = loadImage('Access-Control-Allow-Origin: *
'+ imgUrl);
}

function draw() {
  background(0);
  if (img) {
    image(dayimg, 0, 0);
  }
}var fireworks;
var gravity;

function setup() {
  createCanvas(400, 400);
  gravity = createVector(0,0.2);
  stroke(255);
  strokeWeight(4);
  fireworks = new Particle(random(width), random(height));

}


function draw() {
  background(51);
//   fireworks.applyForce(gravity);
//   fireworks.update();
//   fireworks.show();
 }
var data;

function preload(){

 data = loadJSON("birds.json");
}


function setup() { 
 noCanvas();
//   var bird = data.birds[1].members[2];
//   createP(bird); 
 var birds = data.birds;
  for (var i = 0; i < birds.length; i++){
  createElement('h1',birds[i].family);
    
  
  }
} 

// function draw() { 
//   background(0);
//   fill(flower.r,flower.g,flower.b);
//   text(flower.name,10,50);
// }var flower；






function setup() { 
 createCanvas(500,500);
  flower = {
 name:"sunflower",
 col : color(200,220,0)
 }
} 

function draw() { 
  background(0);
  fill(flower.col);
  text(flower.name,10,50);
}var flower；






function setup() { 
 createCanvas(500,500);
  flower = {
 name:"sunflower",
 col : color(200,220,0)
 }
} 

function draw() { 
  background(0);
  fill(flower.col);
  text(flower.name,10,50);
}
var xpos = 255;
var ypos = 25;
var xspeed = 2;
var yspeed = 2;
var xposhand;

function setup() {
  createCanvas(500, 500);
  noStroke();
  fill(random(255), random(255), random(255));
  rectMode(CENTER);
}

function draw() {
  background(240, 95);
  ellipse(xpos, ypos, 50, 50); //ball

  //making sure handle does not leave canvas area

  if (mouseX >= 40 && mouseX <= width - 40) {
    xposhand = mouseX;
  } else if (mouseX < 40) {
    xposhand = 40;
  } else if (mouseX > width - 40) {
    xposhand = width - 40;
  }
  rect(xposhand, height - 2.5, 80, 5);

  //Making the ball move
  xpos += xspeed;
  ypos += yspeed;

  //Making the ball bounce out of left,top and right edges
  if (xpos <= 25 || xpos >= width - 25) {
    if (xspeed < 10 && xspeed > -10) { //controlling the speed
      xspeed = xspeed * (-1.2);
    } else {
      xspeed = xspeed * (-1.01);
    }
  }
  if (ypos <= 25) {
    if (yspeed < 10 && yspeed > -10) {
      yspeed = yspeed * (-1.2);
    } else {
      yspeed = yspeed * (-1.01);
    }
  }
  //Making the ball bounce out of bottom handle
  if (ypos >= height - 25) {
    if (xpos <= xposhand + 65 && xpos >= xposhand - 65) {
      if (yspeed < 10 && yspeed > -10) {
        yspeed = yspeed * (-1.2);
      } else {
        yspeed = yspeed * (-1.01);
      }
    } else {
      textAlign(CENTER);
      textFont("Open Sans");
      textStyle(BOLD);
      text("GAME OVER", width / 2, height / 2);
      noLoop();
    }
  }
}

//Change the colors on a mouse press event
function mousePressed() {
  fill(random(255), random(255), random(255));
}
var canvas;
var h1;
var bgcolor;
var slider;
var rectcolor;
var rects = [];
let x=0;

var button1,button;

function setup() {
  canvas = createCanvas(600, 600);
  canvas.position(100, 100);
  bgcolor = color(110);
  h1 = createElement('h1', 'Welcome');
  button1 = createButton('Change');
  button = createButton('More');
  button.mousePressed(rectMore);
  button1.mousePressed(changeColor);

	slider = createSlider(30,400,45);
  rectcolor=color(100);

  rects.push(new Rect());
}

function changeColor(){
  bgcolor = color(random(255),random(255),random(255));
 rectcolor = color(random(255),random(255),random(255))
}



function draw() {
  background(bgcolor);
  fill(rectcolor);
  // rect(rects[i], slider.value(), slider.value());
  for(i=0;i<rects.length;i++){
		rects[i].display();
	}
}
  


function rectMore(){
  // for (var i = 0; i< 50; i++)
 //  rect[i].display();

  rects.push(new Rect(random() * width, random() * height));
}


  function setup() { 
  createCanvas(400, 400);
createP("my favorite color is Yellow");
} 

function draw() { 
  background(220);
  fill("red");
  rect(26,39,20.28);
}var serial; // variable to hold an instance of the serialport library
 
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
 println(i + " " + portList[i]);
 }
}
function setup() { 
  createCanvas(400, 400);
  let button = createButton("hello");
  button.mousePressed(changeBG);
  button.style('font-size','64pt');

  creatSlider(0,255,100);
  createDiv("this is a div");
  creatButton("hello");
  let numP = createP('random number:' + random(100));
  numP.style(:'background-color','pink');
} 

function draw() { 
  background(250);
}

function changeBG(){
background(random(255));
}var star = [];

var stars;

function setup() {
  createCanvas(600, 600);
  stars = new Star();
}

function draw() {
  background(0);

  for (var i = 0; i <= 30; i++) {
    star[i]= stars.display();
    
  }
}var lines = [];


function setup() { 
  createCanvas(600, 600);
} 

function draw() { 
  background(0);

  for (var i = 0; i<lines.length; i++)
  {
    lines[i].display();
  
  }
if (lines.length >700){
 lines.splice(0,120);
}
}


function mouseDragged() {
  for(var i = 0; i < 5; i++) {
    // lines[i].fade();
    lines.push(new Line(mouseX + random(-10, 10), mouseY + random (-50,50)));
  }
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}

class Ball{
  constructor(){
  this.x = 200;
    this.y = 20;
    this.speed = 2;
  }
  
  bouncer = new Ball();
bouncer = new move();
bouncer = new show();//let w = h;

function setup() { 
  createCanvas(600, 600);
  rectMode(CENTER);
  
} 

function draw() { 
  background(0);
  // if(mouseX > 300){
  //   background("blue");
  //    }
drawRect (width/2, height/2, 300,300);
  
}

function drawRect (x,y,w,h) {
  // fill(0);
	push();
  translate(x,y);
  rotate(mouseX/3,mouseY/2);
  noFill();
  stroke(255);
  strokeWeight(1);
  rect(0,0,w,h);
  pop();
  
 if (h > 10 && w >10) {
    drawRect( x+ h/2, y + w/2, h/2, w/2);
    drawRect( x- h/2, y - w/2, h/2, w/2);
		drawRect(x- h/2, y + w/2, h/2, w/2);
		drawRect(x+ h/2, y - w/2, h/2, w/2);
		}
}//let w = h;

function setup() { 
  createCanvas(600, 600);
  rectMode(CENTER);
  angleMode(DEGREES);
} 

function draw() { 
  background(0);
	drawRect (width/2, height/2, 300,300);
  
}

function drawRect (x,y,w,h) {
	
  push();
  translate(x,y);
	rotate(mouseX,mouseY);

  noFill();
  stroke(255);
  strokeWeight(1);
  rectMode(CENTER);
  rect(0,0,w,h);
  pop();
  
 if (h > 10 && w >10) {
    drawRect( x+ h/2, y + w/2, h/2, w/2);
    drawRect( x- h/2, y - w/2, h/2, w/2);
		drawRect(x- h/2, y + w/2, h/2, w/2);
		drawRect(x+ h/2, y - w/2, h/2, w/2);
   fill("
		}
}//let w = h;

function setup() { 
  createCanvas(600, 600);
  rectMode(CENTER);

} 

function draw() { 
  background(0);
  // if(mouseX > 300){
  //   background("blue");
  //    }

rotate（
drawRect (width/2, height/2, 300,300);

}

function drawRect (x,y,w,h) {
  // fill(0);

rotate(mouseX);
  noFill();
  stroke(255);
  strokeWeight(1);
  rect(x,y,w,h);

  
 if (h > 10 && w >10) {
    drawRect( x+ h/2, y + w/2, h/2, w/2);
    drawRect( x- h/2, y - w/2, h/2, w/2);
		drawRect(x- h/2, y + w/2, h/2, w/2);
		drawRect(x+ h/2, y - w/2, h/2, w/2);
		}
}//let w = h;

function setup() { 
  createCanvas(600, 600);
  rectMode(CENTER);

} 

function draw() { 
  background(0);
  // if(mouseX > 300){
  //   background("blue");
  //    }

rotate（
drawRect (width/2, height/2, 300,300);

}

function drawRect (x,y,w,h) {
  // fill(0);

rotate(mouseX);
  noFill();
  stroke(255);
  strokeWeight(1);
  rect(x,y,w,h);

  
 if (h > 10 && w >10) {
    drawRect( x+ h/2, y + w/2, h/2, w/2);
    drawRect( x- h/2, y - w/2, h/2, w/2);
		drawRect(x- h/2, y + w/2, h/2, w/2);
		drawRect(x+ h/2, y - w/2, h/2, w/2);
		}
}//let w = h;

function setup() { 
  createCanvas(600, 600);
  rectMode(CENTER);

} 

function draw() { 
  background(0);
  // if(mouseX > 300){
  //   background("blue");
  //    }

rotate（
drawRect (width/2, height/2, 300,300);

}

function drawRect (x,y,w,h) {
  // fill(0);

rotate(mouseX);
  noFill();
  stroke(255);
  strokeWeight(1);
  rect(x,y,w,h);

  
 if (h > 10 && w >10) {
    drawRect( x+ h/2, y + w/2, h/2, w/2);
    drawRect( x- h/2, y - w/2, h/2, w/2);
		drawRect(x- h/2, y + w/2, h/2, w/2);
		drawRect(x+ h/2, y - w/2, h/2, w/2);
		}
}//let w = h;

function setup() { 
  createCanvas(600, 600);
  rectMode(CENTER);

} 

function draw() { 
  background(0);
  // if(mouseX > 300){
  //   background("blue");
  //    }

rotate（
drawRect (width/2, height/2, 300,300);

}

function drawRect (x,y,w,h) {
  // fill(0);

rotate(mouseX);
  noFill();
  stroke(255);
  strokeWeight(1);
  rect(x,y,w,h);

  
 if (h > 10 && w >10) {
    drawRect( x+ h/2, y + w/2, h/2, w/2);
    drawRect( x- h/2, y - w/2, h/2, w/2);
		drawRect(x- h/2, y + w/2, h/2, w/2);
		drawRect(x+ h/2, y - w/2, h/2, w/2);
		}
}//let w = h;

function setup() { 
  createCanvas(600, 600);
  rectMode(CENTER);

} 

function draw() { 
  background(0);
  // if(mouseX > 300){
  //   background("blue");
  //    }

rotate（
drawRect (width/2, height/2, 300,300);

}

function drawRect (x,y,w,h) {
  // fill(0);

rotate(mouseX);
  noFill();
  stroke(255);
  strokeWeight(1);
  rect(x,y,w,h);

  
 if (h > 10 && w >10) {
    drawRect( x+ h/2, y + w/2, h/2, w/2);
    drawRect( x- h/2, y - w/2, h/2, w/2);
		drawRect(x- h/2, y + w/2, h/2, w/2);
		drawRect(x+ h/2, y - w/2, h/2, w/2);
		}
}//let w = h;

function setup() { 
  createCanvas(600, 600);
  rectMode(CENTER);

} 

function draw() { 
  background(0);
  // if(mouseX > 300){
  //   background("blue");
  //    }

rotate（
drawRect (width/2, height/2, 300,300);

}

function drawRect (x,y,w,h) {
  // fill(0);

rotate(mouseX);
  noFill();
  stroke(255);
  strokeWeight(1);
  rect(x,y,w,h);

  
 if (h > 10 && w >10) {
    drawRect( x+ h/2, y + w/2, h/2, w/2);
    drawRect( x- h/2, y - w/2, h/2, w/2);
		drawRect(x- h/2, y + w/2, h/2, w/2);
		drawRect(x+ h/2, y - w/2, h/2, w/2);
		}
}//let w = h;

function setup() { 
  createCanvas(600, 600);
  rectMode(CENTER);

} 

function draw() { 
  background(0);
  // if(mouseX > 300){
  //   background("blue");
  //    }

rotate（
drawRect (width/2, height/2, 300,300);

}

function drawRect (x,y,w,h) {
  // fill(0);

rotate(mouseX);
  noFill();
  stroke(255);
  strokeWeight(1);
  rect(x,y,w,h);

  
 if (h > 10 && w >10) {
    drawRect( x+ h/2, y + w/2, h/2, w/2);
    drawRect( x- h/2, y - w/2, h/2, w/2);
		drawRect(x- h/2, y + w/2, h/2, w/2);
		drawRect(x+ h/2, y - w/2, h/2, w/2);
		}
}//let w = h;

function setup() { 
  createCanvas(600, 600);
  rectMode(CENTER);

} 

function draw() { 
  background(0);
  // if(mouseX > 300){
  //   background("blue");
  //    }

rotate（
drawRect (width/2, height/2, 300,300);

}

function drawRect (x,y,w,h) {
  // fill(0);

rotate(mouseX);
  noFill();
  stroke(255);
  strokeWeight(1);
  rect(x,y,w,h);

  
 if (h > 10 && w >10) {
    drawRect( x+ h/2, y + w/2, h/2, w/2);
    drawRect( x- h/2, y - w/2, h/2, w/2);
		drawRect(x- h/2, y + w/2, h/2, w/2);
		drawRect(x+ h/2, y - w/2, h/2, w/2);
		}
}//let w = h;

function setup() { 
  createCanvas(600, 600);
  rectMode(CENTER);

} 

function draw() { 
  background(0);
  // if(mouseX > 300){
  //   background("blue");
  //    }

rotate（
drawRect (width/2, height/2, 300,300);

}

function drawRect (x,y,w,h) {
  // fill(0);

rotate(mouseX);
  noFill();
  stroke(255);
  strokeWeight(1);
  rect(x,y,w,h);

  
 if (h > 10 && w >10) {
    drawRect( x+ h/2, y + w/2, h/2, w/2);
    drawRect( x- h/2, y - w/2, h/2, w/2);
		drawRect(x- h/2, y + w/2, h/2, w/2);
		drawRect(x+ h/2, y - w/2, h/2, w/2);
		}
}//let w = h;

function setup() { 
  createCanvas(600, 600);
  rectMode(CENTER);

} 

function draw() { 
  background(0);
  // if(mouseX > 300){
  //   background("blue");
  //    }

rotate（
drawRect (width/2, height/2, 300,300);

}

function drawRect (x,y,w,h) {
  // fill(0);

rotate(mouseX);
  noFill();
  stroke(255);
  strokeWeight(1);
  rect(x,y,w,h);

  
 if (h > 10 && w >10) {
    drawRect( x+ h/2, y + w/2, h/2, w/2);
    drawRect( x- h/2, y - w/2, h/2, w/2);
		drawRect(x- h/2, y + w/2, h/2, w/2);
		drawRect(x+ h/2, y - w/2, h/2, w/2);
		}
}//let w = h;

function setup() { 
  createCanvas(600, 600);
  rectMode(CENTER);
  
} 

function draw() { 
  background(0);
  // if(mouseX > 300){
  //   background("blue");
  //    }
drawRect (width/2, height/2, 300,300);
  
}

function drawRect (x,y,w,h) {
  // fill(0);
	rotate(mouseX,mouseY);
  if (mouseX > width/2) {
    fill("
  noFill();
  stroke(255);
  strokeWeight(1);
  rect(x,y,w,h);
  
 if (h > 10 && w >10) {
    drawRect( x+ h/2, y + w/2, h/2, w/2);
    drawRect( x- h/2, y - w/2, h/2, w/2);
		drawRect(x- h/2, y + w/2, h/2, w/2);
		drawRect(x+ h/2, y - w/2, h/2, w/2);
		}
}//let w = h;

function setup() { 
  createCanvas(600, 600);
  rectMode(CENTER);
} 

function draw() { 
  background(0);
drawRect (width/2, height/2, 300,300);
  

  if (mouseX < 300) {
    fill("
  
  
  }
}

function drawRect (x,y,w,h) {
   fill(0);
	stroke(255);
  strokeWeight(1);
  rect(x,y,w,h);
  
 if (h > 10 && w >10) {
    drawRect( x+ h/2, y + w/2, h/2, w/2);
    drawRect( x- h/2, y - w/2, h/2, w/2);
		drawRect(x- h/2, y + w/2, h/2, w/2);
		drawRect(x+ h/2, y - w/2, h/2, w/2);
		}
}let canvas = {
  x:500,
  y:500
}

let slider = {
  x:10,
  y:240,
  height:20,
  width:10}
  
  

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  
  //slider
  if (dragged)
  line(10,canvas.y/2,canvas.x-10, canvas.y/2);
  rect(slider.x, slider.y,slider.width, slider.height);
  
  //ellipse
  
ellipse(canvas.x/2, canvas.y-60, 30,30);
}

function mouseDragged(){
if (mouseX> slider.x && mouseX < (slider.x + slider.width) && mouse.Y >slider.y && mouseY
  dragged = true;
}
  
  
  
  
}function setup() { 
  createCanvas(400, 400);
    background(220);
} 

function draw() { 

}


function mouseMoved(){
	fill ("red");
  ellipse (mouseX, mouseY, 10,10);

}
function mouseDragged(){
fill("green");
  ellipse(mouseX, mouseY, 10,10);

}

  
function mousePressed() {
  fill("yellow");
  ellipse(mouseX, mouseY, 10,20);
}

function mouseReleased(){
fill("blue");
  ellipsed(mouseX, mouseY, 20,20);

}  //show clock
  let noClock = true;
  let showClockUS = false;
  let showClockBR = false;
  let showClockCH = false;

  function setup() {
    createCanvas(600, 500);
    angleMode(DEGREES);
    frameRate(20);
  }

  function draw() {

    if (showClockUS) {
      //time variables USA
      let hr = hour();
      let mn = minute();
      let sc = second();

      background(0);
      textSize(32);
      fill("blue");
      text("USA", 260, 220);

      //CLOCK
      //seconds ellipse
      stroke(86, 38, 255);
      strokeWeight(8);
      noFill();
      let end1 = map(sc, 0, 60, -89, 270);
      arc(300, 200, 320, 320, 270, end1);

      //minutes ellipse
      stroke(255, 0, 0);
      strokeWeight(8);
      noFill();
      let end2 = map(mn, 0, 60, -89, 270);
      arc(300, 200, 290, 290, 270, end2);

      //hours ellipse
      stroke(255);
      strokeWeight(8);
      noFill();
      let end3 = map(hr % 12, 0, 12, -89, 270);
      arc(300, 200, 260, 260, 270, end3);
    } else if (showClockBR) {
      //time variables BR
      let hr = hour() + 1;
      let mn = minute();
      let sc = second();

      background(0);
      textSize(32);
      fill("green");
      text("Brasil", 260, 210);


      //CLOCK
      //seconds ellipse
      stroke(0, 119, 51);
      strokeWeight(8);
      noFill();
      let end1 = map(sc, 0, 60, -89, 270);
      arc(300, 200, 320, 320, 270, end1);

      //minutes ellipse
      stroke(255, 217, 51);
      strokeWeight(8);
      noFill();
      let end2 = map(mn, 0, 60, -89, 360);
      arc(300, 200, 290, 290, 270, end2);

      //hours ellipse
      stroke(66, 66, 238);
      strokeWeight(8);
      noFill();
      let end3 = map(hr % 12, 0, 12, -89, 270);
      arc(300, 200, 260, 260, 270, end3);
    } else if (showClockCH) {
      //time variables CH
      let hr = hour() - 12;
      let mn = minute();
      let sc = second();

      background(0);
      textSize(32);
      fill(255, 0, 0);
			text("中国", 260, 210);


      var secondBarWidth = map(sc, 0, 59, 0, TWO_PI);

      //CLOCK
      //seconds ellipse
      // stroke(255,0,0);
      // strokeWeight(8);
      // noFill();
      // let end1 = map(sc,0,60,-89,270);
      // arc(300,200,320,320,270,end1);

      //seconds
      push();
      translate(300, 200);
      rotate(secondBarWidth * 60);
      pandapaws();
      pop();

      //minutes ellipse
      stroke(255, 0, 0);
      strokeWeight(8);
      noFill();
      let end2 = map(mn, 0, 60, -89, 270);
      arc(300, 200, 290, 290, 270, end2);

      //hours ellipse
      stroke(255, 217, 51);
      strokeWeight(8);
      noFill();
      let end3 = map(hr % 12, 0, 12, -89, 270);
      arc(300, 200, 260, 260, 270, end3);
    } else {
      background(0);
      textSize(35);
      fill(random(255), random(255), random(255));
      text("What time is it right now?", 120, 250);

      questionMarkX = random(width);
      questionMarkY = random(height);


      fill(random(255), random(255), random(255));
      textSize(70);
      text("?", questionMarkX, questionMarkY);
    }



    //US BUTTON
    noStroke();
    fill(255);
    ellipse(200, 430, 30, 30);

    //BR BUTTON
    fill("green");
    ellipse(300, 430, 30, 30);

    //CH BUTTON
    fill("red");
    ellipse(400, 430, 30, 30);

  }


  function mousePressed() {
    if (dist(mouseX, mouseY, 200, 430) < 30 / 2) {
      showClockBR = false;
      showClockCH = false;
      showClockUS = !showClockUS
      console.log('us');
    }
    if (dist(mouseX, mouseY, 300, 430) < 30 / 2) {
      showClockUS = false;
      showClockCH = false;
      showClockBR = !showClockBR;
      console.log('br');

    }
    if (dist(mouseX, mouseY, 400, 430) < 30 / 2) {
      showClockUS = false;
      showClockBR = false;
      showClockCH = !showClockCH;
      console.log(showClockCH);

    }
  }

  function pandapaws() {
    fill(255);
    noStroke();
    beginShape();
    ellipse(100, 180, 30, 35);
    ellipse(120, 200, 10, 15);
    ellipse(120, 160, 20, 17);
    ellipse(130, 179, 16, 20);
    endShape(close);
  }var i = 0;

function setup() { 
  createCanvas(600, 600);
} 

function draw() { 
  background(255);
  
//  // fill(0);
//  // noStroke();
//  // ellipse(200,300,45,22);
//  // ellipse(180,285,10,15);
//  // ellipse(200,278,20,17);
//  // ellipse(222,285,16,20);
//   //push();
//   //translate(random(20), 30);
//   //rotate(60/200);
//   pandapows(i,i);
//   i++
    push()
    translate(200, 200i);
    pandapaws();
    pop();
    
    i++;
}

function pandapaws() {
 fill(0);
  noStroke();
  beginShape ();
  ellipse(200,300,45,22);
  ellipse(180,285,10,15);
  ellipse(200,278,20,17);
  ellipse(222,285,16,20);
  endShape (close);
}var i = 0;

function setup() { 
  createCanvas(600, 600);
} 

function draw() { 
  background(255);
  
//  // fill(0);
//  // noStroke();
//  // ellipse(200,300,45,22);
//  // ellipse(180,285,10,15);
//  // ellipse(200,278,20,17);
//  // ellipse(222,285,16,20);
//   //push();
//   //translate(random(20), 30);
//   //rotate(60/200);
//   pandapows(i,i);
//   i++
    push()
    translate(200, 200i);
    pandapaws();
    pop();
    
    i++;
}

function pandapaws() {
 fill(0);
  noStroke();
  beginShape ();
  ellipse(200,300,45,22);
  ellipse(180,285,10,15);
  ellipse(200,278,20,17);
  ellipse(222,285,16,20);
  endShape (close);
}var i = 0;

function setup() { 
  createCanvas(600, 600);
} 

function draw() { 
  background(255);
  
//  // fill(0);
//  // noStroke();
//  // ellipse(200,300,45,22);
//  // ellipse(180,285,10,15);
//  // ellipse(200,278,20,17);
//  // ellipse(222,285,16,20);
//   //push();
//   //translate(random(20), 30);
//   //rotate(60/200);
//   pandapows(i,i);
//   i++
    push()
    translate(200, 200i);
    pandapaws();
    pop();
    
    i++;
}

function pandapaws() {
 fill(0);
  noStroke();
  beginShape ();
  ellipse(200,300,45,22);
  ellipse(180,285,10,15);
  ellipse(200,278,20,17);
  ellipse(222,285,16,20);
  endShape (close);
}var i = 0;

function setup() { 
  createCanvas(600, 600);
} 

function draw() { 
  background(255);
  
//  // fill(0);
//  // noStroke();
//  // ellipse(200,300,45,22);
//  // ellipse(180,285,10,15);
//  // ellipse(200,278,20,17);
//  // ellipse(222,285,16,20);
//   //push();
//   //translate(random(20), 30);
//   //rotate(60/200);
//   pandapows(i,i);
//   i++
    push()
    translate(200, 200i);
    pandapaws();
    pop();
    
    i++;
}

function pandapaws() {
 fill(0);
  noStroke();
  beginShape ();
  ellipse(200,300,45,22);
  ellipse(180,285,10,15);
  ellipse(200,278,20,17);
  ellipse(222,285,16,20);
  endShape (close);
}var i = 0;

function setup() { 
  createCanvas(600, 600);
} 

function draw() { 
  background(255);
  
//  // fill(0);
//  // noStroke();
//  // ellipse(200,300,45,22);
//  // ellipse(180,285,10,15);
//  // ellipse(200,278,20,17);
//  // ellipse(222,285,16,20);
//   //push();
//   //translate(random(20), 30);
//   //rotate(60/200);
//   pandapows(i,i);
//   i++
    push()
    translate(200, 200i);
    pandapaws();
    pop();
    
    i++;
}

function pandapaws() {
 fill(0);
  noStroke();
  beginShape ();
  ellipse(200,300,45,22);
  ellipse(180,285,10,15);
  ellipse(200,278,20,17);
  ellipse(222,285,16,20);
  endShape (close);
}function setup() { 
  createCanvas(600, 600);
 angleMode(DEGREES);
} 

function draw() { 
  background(0);
  translate(300,250);
  rotate(-90);
 
 var hr = hour();
 var mn = minute();
 var sc = second();
 
 // strokeWeight(4);
 // noFill();
 // stroke(300);
 // ellipse(300,250,350,350); 

 //seconds ellipse
 // stroke(86,38,255);
 // strokeWeight(8);
 // noFill();
 // let end1 = map(sc,0,60,0,360);
 // arc(0,0,350,350,0,end1);
 
 //minutes ellipse
 stroke(223,49,29);
 strokeWeight(10);
 noFill();
 var end2 = map(mn,0,60,0,360);
 arc(0,0,320,320,0,end2);
 
 //hours ellipse
 stroke(255,255,0);
 strokeWeight(12);
 noFill();
 var end3 = map(hr % 12,0,12,0,360); 
 arc(0,0, 290, 290, 0, end3);
  
  var secondBarWidth = map(sc, 0, 59, 0, TWO_PI);

 //seconds
  push();
  rotate(secondBarWidth*60);
  pandapaws();
  pop();
  

 //pandapaws();
  
}
  

 function pandapaws() {
  fill(255);
  noStroke();
  beginShape ();
  ellipse(100,180,30,35);
  ellipse(120,200,10,15);
  ellipse(120,160,20,17);
  ellipse(130,179,16,20);
  endShape (close);
}

//  fill (255);
//  noStroke();
//  text( hr + ":" + mn + ":" + sc, 209, 30);
let y = 0;
let speed =10;
let gravity = 7;


function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  
	ellipse(200,y,20,20);
  y= y+ speed ;
  speed = speed + gravity;

  
		if (y > 400 || y <0) {
    speed = -0.8 * speed;
    
    }
//   if (y > 400){
//     print("Y is at bottom");
// 		background(255,233,49);
    
//     speed = -3;
//       }
      
//   if (y <0){
//     print("Y is at top");
//     background(222,29,38);
//     speed = 3;
//   }
  
}
let r = 100;
let g = 100;
let b = 255;

let shine;

function setup() { 
 
  createCanvas(450,550);
}

function draw() {
  
	//background
  r = map(mouseX, 0, 450, 5, 0);
  g = map(mouseX, 0, 450, 180, 0);
  b = map(mouseX, 0, 450, 255, 0);
  background(r, g, b);
  
  //sun
  push();
  noStroke();
  r = map(mouseX, 0,450,255,120);
  b = map(mouseX, 0,450,25, 0);
  fill (r, 50, b, 200);
  ellipse(mouseX,80,80);
  pop();
  
  //MountRainer
  strokeWeight(0);
  fill(128,198,222);
	quad(75,550,200,350,340,350,450,550);
  
  fill(255);
  quad(200,350,340,350,300,270,240,270);
  
	ellipse (228,360,59,60);
  ellipse(285,360,70,90);
  ellipse(328,360,30,40);

  
  // spaceneedleBase
  strokeWeight(6);
	line(100,300,70,550);
  
  line(150,300,190,550);  
  line(100,300,95,200);
  
  line(150,300,155,200);
  
  strokeWeight(4);
  fill(211,34,63);
  triangle(100,300,95,200,150,300);
  
  fill(26,84,21);
  triangle(100,300,150,300,70,550);
  
  fill(63,48,96);
	triangle(190,550,150,300,133,355);   
  
	fill(229,227,36);
  quad(70,550,190,550,159,450,104,450); 
  
  fill(219,60,227);
  triangle(150,300,95,200,155,200);

  
  //spaceneedleHead
  fill(75,76,82);
  strokeWeight(5);
	rect(50,160,150,40);
  
	
	strokeWeight(5);
  line(65,160,96,130);
  strokeWeight(5);
  line(185,160,155,130);
  
  fill(117,125,120);
	quad(96,130,155,130,169,120,80,120);
  
  strokeWeight(3);
	fill(60,80,230);  	
	triangle(120,120,130,120,125,30);    
  
	fill(38,230,148);
  triangle(65,160,155,130,185,160);
  
  //stars
  push();
  noStroke();
  shine = random(0,255);
  fill(255,255,255,shine);
	ellipse (100,35,5);

  shine = random(0,255);
  fill(255,255,255,shine);
	ellipse (200,55,7);
  
   shine = random(0,255);
  fill(255,255,255,shine);
	ellipse (370,40,7);
  
   shine = random(0,255);
  fill(255,255,255,shine);
	ellipse (299,80,8);
  
   shine = random(0,255);
  fill(255,255,255,shine);
	ellipse (440,150,4);
  
   shine = random(0,255);
  fill(255,255,255,shine);
	ellipse (230,200,7);
  
   shine = random(0,255);
  fill(255,255,255,shine);
	ellipse (35,149,4);
  
  //toplight
  shine = random(255,255);
  fill(255,255,26,shine);
  ellipse (125,33,10);
  
  pop();

}

function setup() { 
  createCanvas(400, 400);
	background(255);
} 

function draw() { 
	

fill(random(168),random(39),random(55));
	noStroke();
	ellipse(mouseX,mouseY,40,40);
	}

function mousePressed() {
background(155);
  
	


}


function setup() { 

  createCanvas(450,550);
  background(184,217,238);

  //MountRainer
  strokeWeight(0);
  fill(128,198,222);
	quad(75,550,200,350,340,350,450,550);
  
  fill(255);
  quad(200,350,340,350,300,270,240,270);
  
	ellipse (228,360,59,60);
  ellipse(285,360,70,90);
  ellipse(328,360,30.40);

  
  // spaceneedleBase
  strokeWeight(6);
	line(100,300,70,550);
  
  line(150,300,190,550);  
  line(100,300,95,200);
  
  line(150,300,155,200);
  
  strokeWeight(4);
  fill(211,34,63);
  triangle(100,300,95,200,150,300);
  
  fill(26,84,21);
  triangle(100,300,150,300,70,550);
  
  fill(63,48,96);
	triangle(190,550,150,300,133,355);   
  
	fill(229,227,36);
  quad(70,550,190,550,159,450,104,450); 
  
  fill(219,60,227);
  triangle(150,300,95,200,155,200);

  
  //spaceneedleHead
  fill(75,76,82);
  strokeWeight(5);
	rect(50,160,150,40);
  
	
	strokeWeight(5);
  line(65,160,96,130);
  strokeWeight(5);
  line(185,160,155,130);
  
  fill(117,125,120);
	quad(96,130,155,130,169,120,80,120);
  
  strokeWeight(3);
	fill(60,80,230);  	
	triangle(120,120,130,120,125,5);    
  
	fill(38,230,148);
  triangle(65,160,155,130,185,160);
  

  //Text
  
  textSize(60);
  fill(31,11,95);
	text("Seattle",240,50,50,400);
	fill(0, 102, 153);
	text("Seattle", 240,100,100, 300);
	fill(0, 102, 153, 51);
	text("Seattle", 240,150,300, 100);

 
  } 

