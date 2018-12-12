// A2Z F18
// Daniel Shiffman
// https://github.com/shiffman/A2Z-F18
// http://shiffman.net/a2z



// Many DOM elements
let dropZone, input, button, sample, clearButton;

// An array to keep track of all the new DOM elements being added
let paragraphs = [];

let inputText = '';

// An extra element, an input element
let seedInput;

function setup() {

  noCanvas();

  // Selecting the text field and button
  input = select('#textinput');
  button = select('#submit');
  // What to do when button pressed
  button.mousePressed(handleInput);

  // This link allows quick testing with a file
  // that's ready to load instantly
  sample = select('#sample');
  sample.mousePressed(loadFile);

  // This button clears the new paragraph elements
  // added
  clearButton = select('#clear');
  clearButton.mousePressed(clearText);

  // Diastic Seed
  seedInput = select('#seed');

}

// Load a file for quick testing
function loadFile() {
  loadStrings('files/adjectives2.txt', fileLoaded);
}
// When the file is loaded
function fileLoaded(data) {
  let txt = data.join('\n');

  input.html(txt);
  // Note the use of a function that will "process" the text
  // This is b/c the text might come in a number of different ways
  // process(txt);
}

// Handle dropzone events
function highlight() {
  dropZone.style('background', '#AAA');
}

function unHighlight() {
  dropZone.style('background','');
}

// Handle the text input field
function handleInput() {
  process(input.value());
}

// Clear all the divs with remove()
function clearText() {
  input.html('');
  for (let i = 0; i < paragraphs.length; i++) {
    paragraphs[i].remove();
  }
  paragraphs = [];
}
let txt;

function preload(){
  txt = loadStrings('license.txt');
}

function setup() {
  noCanvas();
  
  let alltxt = join(txt,' ');
  let words = split(text,' ');
  console.log(words)
  words = words.reverse();
  alltxt = join(words,' ');
  createP(alltxt);
  
}

function draw() {
  background(220);
}let txt;

function preload(){
  txt = loadStrings('license.txt');
}

function setup() {
  noCanvas();
  
  let alltxt = join(txt,' ');
  let words = split(text,' ');
  console.log(words)
  words = words.reverse();
  alltxt = join(words,' ');
  createP(alltxt);
  
}

function draw() {
  background(220);
}function setup() { 
  createCanvas(400, 400);
  getData();
} 

function getData() {
      httpGet("http://ytc321.itp.io:9090/send", 'json', false, 
              
              function(response) {
      					for(var i = 0; i < response.length; i++) {
                 	ellipse(response[i].x, response[i].y, 20, 20); 
                }
				        setTimeout(getData, 100);
      				});
		
}

function draw() { 
  //background(220);
  fill(0,0,0);
}

function mousePressed() {  
 	// if (mouseIsPressed) {
   ellipse(mouseX, mouseY, 20, 20); 
    httpGet("http://ytc321.itp.io:9090/save?x="+mouseX+"&y="+mouseY, 'json', false, function(response) {});

  // }
}var streams = [];
var fadeInterval = 1.6;
var symbolSize = 14;

function setup() {
  createCanvas(
    window.innerWidth,
    window.innerHeight
  );
  background(0);

  var x = 0;
  for (var i = 0; i <= width / symbolSize; i++) {
    var stream = new Stream();
    stream.generateSymbols(x, random(-2000, 0));
    streams.push(stream);
    x += symbolSize
  }

  textFont('Consolas');
  textSize(symbolSize);
}

function draw() {
  background(0, 150);
  streams.forEach(function(stream) {
    stream.render();
  });
}

function Symbol(x, y, speed, first, opacity) {
  this.x = x;
  this.y = y;
  this.value;

  this.speed = speed;
  this.first = first;
  this.opacity = opacity;

  this.switchInterval = round(random(2, 25));

  this.setToRandomSymbol = function() {
    var charType = round(random(0, 5));
    if (frameCount % this.switchInterval == 0) {
      if (charType > 1) {
        // set it to Katakana
        this.value = String.fromCharCode(
          0x30A0 + round(random(0, 96))
        );
      } else {
        // set it to numeric
        this.value = round(random(0,9));
      }
    }
  }

  this.rain = function() {
    this.y = (this.y >= height) ? 0 : this.y += this.speed;
  }

}

function Stream() {
  this.symbols = [];
  this.totalSymbols = round(random(5, 35));
  this.speed = random(5, 22);

  this.generateSymbols = function(x, y) {
    var opacity = 255;
    var first = round(random(0, 4)) == 1;
    for (var i =0; i <= this.totalSymbols; i++) {
      symbol = new Symbol(
        x,
        y,
        this.speed,
        first,
        opacity
      );
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      opacity -= (255 / this.totalSymbols) / fadeInterval;
      y -= symbolSize;
      first = false;
    }
  }

  this.render = function() {
    this.symbols.forEach(function(symbol) {
      if (symbol.first) {
        fill(140, 255, 170, symbol.opacity);
      } else {
        fill(0, 255, 70, symbol.opacity);
      }
      text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      symbol.setToRandomSymbol();
    });
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


var num = 1500;
var vx = new Array(num);
var vy = new Array(num);
var x = new Array(num);
var y = new Array(num);
var ax = new Array(num);
var ay = new Array(num);

var magnetism = 30;
var radius = 3; 
var gensoku =  1; 

function setup(){
  createCanvas(windowWidth,windowHeight);
  stroke(100, 10, 200); 
  ellipseMode(RADIUS);
  background(30,40,50);
  blendMode(SCREEN);
  
  for(var i =0; i< num; i++){
    x[i] = random(width);
    y[i] = random(height);
    vx[i] = 0;
    vy[i] = 0;
    ax[i] = 0;
    ay[i] = 0;
  }
  
    // Instantiate our SerialPort object
    serial = new p5.SerialPort();
    serial.on('list', printList); // set a callback function for the serialport list event
    serial.on('connected', serverConnected); // callback for connecting to the server
    serial.on('open', portOpen); // callback for the port opening
    serial.on('data', serialEvent); // callback for when new data arrives
    serial.on('error', serialError); // callback for errors
    serial.on('close', portClose); // callback for the port closing

    serial.list(); // list the serial ports

    serial.open("/dev/cu.usbmodem1441");

    // let col= map(humi1, 0,width, 0,255);
  
}


function draw(){
  clear();
	fill(0,0,0);
  rect(0,0,windowWidth,windowHeight);
  
  for(var i=0; i<num; i++){
    var distance = dist(humi1,humi2, x[i], y[i]); 
   
    if(distance > 3){ 
      ax[i] = magnetism * (humi1 - x[i]) / (distance * distance); 
      ay[i] = magnetism * (humi2 - y[i]) / (distance * distance);
    }
    
    
    vx[i] += ax[i]; 
    vy[i] += ay[i]; 
    
    vx[i] = vx[i]*gensoku;
    vy[i] = vy[i]*gensoku;
    
    x[i] += vx[i];  
    y[i] += vy[i];  
    
    var sokudo = dist(humi1,humi2,vx[i],vy[i]);
    var r = map(sokudo, 0, 5, 0, 255); 
    var g = map(sokudo, 0,5, 64, 255);
    var b = map(sokudo, 0,5, 128, 255);
    fill(r, g, b, 50);
    //fill(r, g, b);
    ellipse(x[i],y[i],radius,radius);
  }
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
 //print(inString);
    //check to see that there's actually a string there:
    if (inString.length > 0) {
      var sensors = split(inString, ','); // split the string on the commas
      if (sensors.length >1) { // if there are three elements
        humi1 = map(sensors[0], 40, 100, 0, width / 2);
        humi2 = map(sensors[1], 10, 50, 0, width / 2);
        print(humi1);
        print(humi2);
       
        // element 0 is the boardx
        //wh = map(sensors[1], 0, 1023, 0, height/2); // element 1 is the wall's height
        //circleColor = 255 - (sensors[2] * 255);      // element 2 is the button
      }
   }


  }
// Declare a "SerialPort" object
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


var num = 1500;
var vx = new Array(num);
var vy = new Array(num);
var x = new Array(num);
var y = new Array(num);
var ax = new Array(num);
var ay = new Array(num);

var magnetism = 30;
var radius = 3; 
var gensoku =  1; 

function setup(){
  createCanvas(windowWidth,windowHeight);
  stroke(100, 10, 200); 
  ellipseMode(RADIUS);
  background(30,40,50);
  blendMode(SCREEN);
  
  for(var i =0; i< num; i++){
    x[i] = random(width);
    y[i] = random(height);
    vx[i] = 0;
    vy[i] = 0;
    ax[i] = 0;
    ay[i] = 0;
  }
  
    // Instantiate our SerialPort object
    serial = new p5.SerialPort();
    serial.on('list', printList); // set a callback function for the serialport list event
    serial.on('connected', serverConnected); // callback for connecting to the server
    serial.on('open', portOpen); // callback for the port opening
    serial.on('data', serialEvent); // callback for when new data arrives
    serial.on('error', serialError); // callback for errors
    serial.on('close', portClose); // callback for the port closing

    serial.list(); // list the serial ports

    serial.open("/dev/cu.usbmodem1441");

    // let col= map(humi1, 0,width, 0,255);
  
}


function draw(){
  clear();
	fill(0,0,0);
  rect(0,0,windowWidth,windowHeight);
  
  for(var i=0; i<num; i++){
    var distance = dist(humi1,humi2, x[i], y[i]); 
   
    if(distance > 3){ 
      ax[i] = magnetism * (humi1 - x[i]) / (distance * distance); 
      ay[i] = magnetism * (humi2 - y[i]) / (distance * distance);
    }
    
    
    vx[i] += ax[i]; 
    vy[i] += ay[i]; 
    
    vx[i] = vx[i]*gensoku;
    vy[i] = vy[i]*gensoku;
    
    x[i] += vx[i];  
    y[i] += vy[i];  
    
    var sokudo = dist(mouseX,mouseY,vx[i],vy[i]);
    var r = map(sokudo, 0, 5, 0, 255); 
    var g = map(sokudo, 0,5, 64, 255);
    var b = map(sokudo, 0,5, 128, 255);
    fill(r, g, b, 50);
    //fill(r, g, b);
    ellipse(x[i],y[i],radius,radius);
  }
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
 //print(inString);
    //check to see that there's actually a string there:
    if (inString.length > 0) {
      var sensors = split(inString, ','); // split the string on the commas
      if (sensors.length >1) { // if there are three elements
        humi1 = map(sensors[0], 40, 100, 0, width / 2);
        humi2 = map(sensors[1], 10, 50, 0, width / 2);
        print(humi1);
        print(humi2);
       
        // element 0 is the boardx
        //wh = map(sensors[1], 0, 1023, 0, height/2); // element 1 is the wall's height
        //circleColor = 255 - (sensors[2] * 255);      // element 2 is the button
      }
   }


  }
// Declare a "SerialPort" object
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


var num = 1500;
var vx = new Array(num);
var vy = new Array(num);
var x = new Array(num);
var y = new Array(num);
var ax = new Array(num);
var ay = new Array(num);

var magnetism = 30;
var radius = 1; 
var gensoku =  1; 

function setup(){
  createCanvas(windowWidth,windowHeight);
  stroke(100, 10, 200); 
  ellipseMode(RADIUS);
  background(30,40,50);
  blendMode(SCREEN);
  
  for(var i =0; i< num; i++){
    x[i] = random(width);
    y[i] = random(height);
    vx[i] = 0;
    vy[i] = 0;
    ax[i] = 0;
    ay[i] = 0;
  }
  
    // Instantiate our SerialPort object
    serial = new p5.SerialPort();
    serial.on('list', printList); // set a callback function for the serialport list event
    serial.on('connected', serverConnected); // callback for connecting to the server
    serial.on('open', portOpen); // callback for the port opening
    serial.on('data', serialEvent); // callback for when new data arrives
    serial.on('error', serialError); // callback for errors
    serial.on('close', portClose); // callback for the port closing

    serial.list(); // list the serial ports

    serial.open("/dev/cu.usbmodem1441");

    // let col= map(humi1, 0,width, 0,255);
  
}


function draw(){
  clear();
	fill(0,0,0);
  rect(0,0,windowWidth,windowHeight);
  
  for(var i=0; i<num; i++){
    var distance = dist(humi1,humi2, x[i], y[i]); 
   
    if(distance > 3){ 
      ax[i] = magnetism * (mouseX - x[i]) / (distance * distance); 
      ay[i] = magnetism * (mouseY - y[i]) / (distance * distance);
    }
    
    
    vx[i] += ax[i]; 
    vy[i] += ay[i]; 
    
    vx[i] = vx[i]*gensoku;
    vy[i] = vy[i]*gensoku;
    
    x[i] += vx[i];  
    y[i] += vy[i];  
    
    var sokudo = dist(mouseX,mouseY,vx[i],vy[i]);
    var r = map(sokudo, 0, 5, 0, 255); 
    var g = map(sokudo, 0,5, 64, 255);
    var b = map(sokudo, 0,5, 128, 255);
    fill(r, g, b, 50);
    //fill(r, g, b);
    ellipse(x[i],y[i],radius,radius);
  }
}

 // get the list of ports:
  function printList(portList) {
    // portList is an array of serial port names
    for (var i = 0; i < portList.length; i++) {
      // Display the list the console:
      //println(i + " " + portList[i]);
   }
  }


  function serverConnected() {
    //println('connected to server.');
  }

  function portOpen() {
    //println('the serial port opened.')
  }

  function serialError(err) {
    //println('Something went wrong with the serial port. ' + err);
  }

  function portClose() {
    //println('The serial port closed.');
  }

  function serialEvent() {
    // read a string from the serial port
    // until you get carriage return and newline:
    var inString = serial.readStringUntil('\r\n');
 //print(inString);
    //check to see that there's actually a string there:
    if (inString.length > 0) {
      var sensors = split(inString, ','); // split the string on the commas
      if (sensors.length >1) { // if there are three elements
        humi1 = map(sensors[0], 40, 100, 0, width / 2);
        humi2 = map(sensors[1], 10, 50, 0, width / 2);
      	print(humi1);
        print(humi2);
       
        // element 0 is the boardx
        //wh = map(sensors[1], 0, 1023, 0, height/2); // element 1 is the wall's height
        //circleColor = 255 - (sensors[2] * 255);      // element 2 is the button
      }
   }


  }
// Declare a "SerialPort" object
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


var num = 1500;
var vx = new Array(num);
var vy = new Array(num);
var x = new Array(num);
var y = new Array(num);
var ax = new Array(num);
var ay = new Array(num);

var magnetism = 30;
var radius = 1; 
var gensoku =  1; 

function setup(){
  createCanvas(windowWidth,windowHeight);
  stroke(100, 10, 200); 
  ellipseMode(RADIUS);
  background(30,40,50);
  blendMode(SCREEN);
  
  for(var i =0; i< num; i++){
    x[i] = random(width);
    y[i] = random(height);
    vx[i] = 0;
    vy[i] = 0;
    ax[i] = 0;
    ay[i] = 0;
  }
  
    // Instantiate our SerialPort object
    serial = new p5.SerialPort();
    serial.on('list', printList); // set a callback function for the serialport list event
    serial.on('connected', serverConnected); // callback for connecting to the server
    serial.on('open', portOpen); // callback for the port opening
    serial.on('data', serialEvent); // callback for when new data arrives
    serial.on('error', serialError); // callback for errors
    serial.on('close', portClose); // callback for the port closing

    serial.list(); // list the serial ports

    serial.open("/dev/cu.usbmodem1441");

    // let col= map(humi1, 0,width, 0,255);
  
}


function draw(){
  clear();
	fill(0,0,0);
  rect(0,0,windowWidth,windowHeight);
  
  for(var i=0; i<num; i++){
    var distance = dist(mouseX,mouseY, x[i], y[i]); 
   
    if(distance > 3){ 
      ax[i] = magnetism * (mouseX - x[i]) / (distance * distance); 
      ay[i] = magnetism * (mouseY - y[i]) / (distance * distance);
    }
    
    
    vx[i] += ax[i]; 
    vy[i] += ay[i]; 
    
    vx[i] = vx[i]*gensoku;
    vy[i] = vy[i]*gensoku;
    
    x[i] += vx[i];  
    y[i] += vy[i];  
    
    var sokudo = dist(mouseX,mouseY,vx[i],vy[i]);
    var r = map(sokudo, 0, 5, 0, 255); 
    var g = map(sokudo, 0,5, 64, 255);
    var b = map(sokudo, 0,5, 128, 255);
    fill(r, g, b, 50);
    //fill(r, g, b);
    ellipse(x[i],y[i],radius,radius);
  }
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
    //println('connected to server.');
  }

  function portOpen() {
    //println('the serial port opened.')
  }

  function serialError(err) {
    //println('Something went wrong with the serial port. ' + err);
  }

  function portClose() {
    //println('The serial port closed.');
  }

  function serialEvent() {
    // read a string from the serial port
    // until you get carriage return and newline:
    var inString = serial.readStringUntil('\r\n');
 //print(inString);
    //check to see that there's actually a string there:
    if (inString.length > 0) {
      var sensors = split(inString, ','); // split the string on the commas
      if (sensors.length >1) { // if there are three elements
        humi1 = map(sensors[0], 40, 100, 0, width / 2);
        humi2 = map(sensors[1], 10, 50, 0, width / 2);
        print(humi1);
        print(humi2);
       
        // element 0 is the boardx
        //wh = map(sensors[1], 0, 1023, 0, height/2); // element 1 is the wall's height
        //circleColor = 255 - (sensors[2] * 255);      // element 2 is the button
      }
   }


  }

// Declare a "SerialPort" object
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

var num = 2000;
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
var gensoku = 0.94;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  ellipseMode(RADIUS);
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
    // Instantiate our SerialPort object
    serial = new p5.SerialPort();
    serial.on('list', printList); // set a callback function for the serialport list event
    serial.on('connected', serverConnected); // callback for connecting to the server
    serial.on('open', portOpen); // callback for the port opening
    serial.on('data', serialEvent); // callback for when new data arrives
    serial.on('error', serialError); // callback for errors
    serial.on('close', portClose); // callback for the port closing

    serial.list(); // list the serial ports

    serial.open("/dev/cu.usbmodem1441");

    // let col= map(humi1, 0,width, 0,255);

// }

function serialEvent() {
 // read a byte from the serial port:
 var inByte = serial.read();
 // store it in a global variable:
 inData = inByte;
}

function serialError(err) {
  println('Something went wrong with the serial port. ' + err);
}


function draw() {
  //background(30, 40, 50, 1);
  clear();
  fill(0);

  rect(0, 0, windowWidth, windowHeight);

  for (var i = 0; i < num; i++) {
  // for (var i = 0; i < 1; i++) {

    var distance = dist(humi1, humi2, x[i], y[i]);

    if (distance > 3 && distance < 200) {
      ax[i] = magnetism * (humi1 - x[i]) / (distance * distance);
      ay[i] = magnetism * (humi2- y[i]) / (distance * distance);
      ax2[i] = 0;
      ay2[i] = 0;
    }

    if (distance > 200 + random(0, 500)) {
      x[i] = humi1;
      y[i] = humi2;
      ax[i] = 0.8;
      ay[i] = -0.3;
      ax2[i] = -random(0, 30);
      ay2[i] = -random(0, 30);
    }

    vx[i] += ax[i] + ax2[i];
    vy[i] += ay[i] + ay2[i];

    vx[i] = vx[i] * gensoku;
    vy[i] = vy[i] * gensoku;

    x[i] += vx[i];
    y[i] += vy[i];

    // var sokudo = dist(mouseX, mouseY, vx[i], vy[i]);
    // print(sokudo);
    // var r = int(map(sokudo, 0, 100, 0, 255));
    // var g = int(map(sokudo, 0, 900, 64, 255));
    // var b = int(map(sokudo, 0, 400, 158, 255));
    // fill(r, g, b, 150);
    // ellipse(x[i], y[i], radius, radius);

    var r = map(y[i]*x[i], 0, (width*height)*0.4, 255, 0);
    r = constrain(r, 0, 255);
    var g = 0;
    var b = map(y[i]*x[i], 0, (width*height)*0.4, 0, 255);
    b = constrain(b, 0, 255);
    fill(b,g,r, 150);
    // ellipse(mouseX, mouseY, radius*10, radius*10);
    ellipse(x[i], y[i], radius, radius);
  }
}
 // get the list of ports:
  function printList(portList) {
    // portList is an array of serial port names
    for (var i = 0; i < portList.length; i++) {
      // Display the list the console:
      // println(i + " " + portList[i]);
   }
  }


  function serverConnected() {
    // println('connected to server.');
  }

  function portOpen() {
    // println('the serial port opened.')
  }

  function serialError(err) {
    //println('Something went wrong with the serial port. ' + err);
  }

  function portClose() {
    //println('The serial port closed.');
  }

  function serialEvent() {
    // read a string from the serial port
    // until you get carriage return and newline:
    var inString = serial.readStringUntil('\r\n');
 //print(inString);
    //check to see that there's actually a string there:
    if (inString.length > 0) {
      var sensors = split(inString, ','); // split the string on the commas
      // conso
      if (sensors.length > 1) { // if there are three elements
        humi1 = map(sensors[0], 0, 100, 100, 600);
        humi2 = map(sensors[1], 0, 100, 100, 600);
				//pulse1 = map(sensors[2], 0, 100, 0, 300);
        print(humi1," , ",  humi2);


        // element 0 is the boardx
        //wh = map(sensors[1], 0, 1023, 0, height/2); // element 1 is the wall's height
        //circleColor = 255 - (sensors[2] * 255);      // element 2 is the button
      }
   }


  }
// Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// Video: https://www.youtube.com/watch?v=4hA7G3gup-4


var img;
let xys = [];

function preload() {
  img = loadImage("heart-3.png");
}


function setup() {
  createCanvas(600, 400);
  background(30, 40, 50);
  img.loadPixels();
  for(let x = 0; x < width; x++) {
    xys.push([]);
    for(let y = 0; y < height; y++) {
      // Get image color
      let c = img.get(x,y);
      // Test for brightness
    	// If it's white
      xys[x].push(true or false);
    }
    
  }
  
  
}

function draw(){
  
}
var num = 2000;
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
  noStroke();
  ellipseMode(RADIUS);
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
  //background(30, 40, 50, 1);
  clear();
  fill(0);

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
    var r = int(map(sokudo, 0, 400, 0, 255));
    var g = int(map(sokudo, 0, 900, 64, 255));
    var b = int(map(sokudo, 0, 100, 158, 205));
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

var magnetism = 80;
var radius = 2;
var gensoku = 0.96;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  ellipseMode(RADIUS);
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
  //background(30, 40, 50, 1);
  clear();
  fill(0);

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

    var sokudo = dist(random(height), random(width), vx[i], vy[i]);
    var r = int(map(sokudo, 0, 500, 0, 255));
    var g = int(map(sokudo, 0, 900, 64, 255));
    var b = int(map(sokudo, 0, 500, 128, 255));
    fill(r,g,b, 100);
    ellipse(x[i], y[i], radius, radius);
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

  
  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviors();
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
 
  for(i = 0; i<particles.length;i++){
    particles[i].update();
    particles[i].display();
  }

  
  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.show(); 
    
  }
  }

var vehicles = [];
var points = [];
var img;

var particles = [];

function preload() {
  img = loadImage("heart-3.png");
}

function setup() {
  background(0);
  createCanvas(windowWidth, windowHeight);
  ellipseMode(RADIUS);
  
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
  
  for(i = 0; i<1000; i++){
    particles.push(new Particle(0, 0));
  }
  



}

function draw() {
  clear();
  fill(0);
  rect(0, 0, windowWidth, windowHeight);
  
  for(i = 0; i<particles.length;i++){
    particles[i].update();
    particles[i].display();
  }
  blendMode(ADD);
  
  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  }
}
}var particles = [];
function setup() {
  background(0);
  createCanvas(windowWidth, windowHeight);
  ellipseMode(RADIUS);
  
  for(i = 0; i<1000; i++){
    particles.push(new Particle(0, 0));
  }


}

function draw() {
  clear();
  fill(0);
  rect(0, 0, windowWidth, windowHeight);
  
  for(i = 0; i<particles.length;i++){
    particles[i].update();
    particles[i].display();
  }
  blendMode(ADD);
 
}var num = 1000;
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


var vehicles = [];
var points = [];
var img;


function preload() {
  img = loadImage("heart-3.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  ellipseMode(RADIUS);
  blendMode(ADD);
  
  createCanvas(600, 400);
  background(30, 40, 50);
  

  //pixelDensity(1);
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

  for (var a = 0; a < num; a++) {
    x[a] = random(width);
    y[a] = random(height);
    vx[a] = 0;
    vy[a] = 0;
    ax[a] = 0;
    ay[a] = 0;
    ax2[a] = 0;
    ay2[a] = 0;
  }
    
    for (var b = 0; b < points.length; b++) {
    var pt = points[b];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
  }
  }


function draw() {
  background(30, 40, 50, 1);
  clear();
  
  background(51);
  for (var i = 0; i < vehicles.length; i++) {
    var v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();

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
    
    var r = int(map(sokudo, 0, 500, 0, 255));
    var g = int(map(sokudo, 0, 900, 64, 255));
    var b = int(map(sokudo, 0, 500, 128, 255));
    
    fill(r, g, b, 100);
    ellipse(x[i], y[i], radius, radius);
    
  }
}// Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// Video: https://www.youtube.com/watch?v=4hA7G3gup-4


var vehicles = [];
var points = [];
var img;


function preload() {
  img = loadImage("heart-3.png");
}


function setup() {
  createCanvas(600, 400);
  background(30, 40, 50);
  

  //pixelDensity(1);
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


  // var points = font.textToPoints('train', 100, 200, 192, {
  // sampleFactor: 0.25
  // });

  //points[0] = createVector(100, 100);
  //points[1] = createVector(200, 100);

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

}// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/QHEQuoIKgNE



var circles;
var spots;
var img;

function preload() {
  img = loadImage("heart-3.png");
}

function setup() {
  createCanvas(600, 400);
  var density = displayDensity();
  pixelDensity(1);
  img.loadPixels();
  spots = [];
  circles = [];
  for (var x = 0; x < img.width; x++) {
    for (var y = 0; y < img.height; y++) {
      var index = x + y * img.width;
      var c = img.pixels[index*4];
      var b = brightness([c]);
      if (b > 1) {
        spots.push(createVector(x, y));
      }
    }
  }

  console.log(img.width);
  console.log(img.height);
  console.log("pixels", img.pixels.length);
  console.log("spots", spots.length);
  console.log(density)
}

function draw() {
  background(0);
  //frameRate(50)

  var total = 10;
  var count = 0;
  var attempts = 0;

  while (count < total) {
    var newC = newCircle();
    if (newC !== null) {
      circles.push(newC);
      count++;
    }
    attempts++;
    if (attempts > 1000) {
      noLoop();
      console.log("finished");
      break;
    }
  }

  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];

    if (circle.growing) {
      if (circle.edges()) {
        circle.growing = false;
      } else {
        for (var j = 0; j < circles.length; j++) {
          var other = circles[j];
          if (circle !== other) {
            var d = dist(circle.x, circle.y, other.x, other.y);
            var distance = circle.r + other.r;

            if (d - 5 < distance) {
              circle.growing = false;
              break;
            }
          }
        }
      }
    }

    circle.show();
    circle.grow();
  }
}

function newCircle() {
  var r = int(random(0, spots.length));
  var spot = spots[r];
  var x = spot.x;
  var y = spot.y;

  var valid = true;
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];
    var d = dist(x, y, circle.x, circle.y);
    if (d < circle.r) {
      valid = false;
      break;
    }
  }
  if (valid) {
    return new Circle(x, y);
  } else {
    return null;
  }
}var num = 1000;
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
  noStroke();
  ellipseMode(RADIUS);
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
  //background(30, 40, 50, 1);
  clear();
  fill(0);

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

    // var sokudo = dist(mouseX, mouseY, vx[i], vy[i]);
    // //print("sokudo:"+sokudo);
    // // windowDistance=sqrt(windowWidth*windowWidth+windowHeight*windowHeight);
    // var r = int(map(sokudo, 0, 500, 0, 255));
    // var g = int(map(sokudo, 0, 900, 64, 255));
    // var b = int(map(sokudo, 0, 500, 128, 255));
    //print("r:"+r+"g:"+g+"b:"+b);    
    //print(sokudo);
    fill(255,0,0, 100);
    ellipse(x[i], y[i], radius, radius);
  }



}// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/QHEQuoIKgNE



var circles;
var spots;
var img;

function preload() {
  img = loadImage("heart-3.png");
}

function setup() {
  createCanvas(600, 400);
  var density = displayDensity();
  pixelDensity(1);
  img.loadPixels();
  spots = [];
  circles = [];
  for (var x = 0; x < img.width; x++) {
    for (var y = 0; y < img.height; y++) {
      var index = x + y * img.width;
      var c = img.pixels[index*4];
      var b = brightness([c]);
      if (b > 1) {
        spots.push(createVector(x, y));
      }
    }
  }

  console.log(img.width);
  console.log(img.height);
  console.log("pixels", img.pixels.length);
  console.log("spots", spots.length);
  console.log(density)
}

function draw() {
  background(0);
  //frameRate(50)

  var total = 10;
  var count = 0;
  var attempts = 0;

  while (count < total) {
    var newC = newCircle();
    if (newC !== null) {
      circles.push(newC);
      count++;
    }
    attempts++;
    if (attempts > 1000) {
      noLoop();
      console.log("finished");
      break;
    }
  }

  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];

    if (circle.growing) {
      if (circle.edges()) {
        circle.growing = false;
      } else {
        for (var j = 0; j < circles.length; j++) {
          var other = circles[j];
          if (circle !== other) {
            var d = dist(circle.x, circle.y, other.x, other.y);
            var distance = circle.r + other.r;

            if (d - 5 < distance) {
              circle.growing = false;
              break;
            }
          }
        }
      }
    }

    circle.show();
    circle.grow();
  }
}

function newCircle() {
  var r = int(random(0, spots.length));
  var spot = spots[r];
  var x = spot.x;
  var y = spot.y;

  var valid = true;
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];
    var d = dist(x, y, circle.x, circle.y);
    if (d < circle.r) {
      valid = false;
      break;
    }
  }
  if (valid) {
    return new Circle(x, y);
  } else {
    return null;
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
}// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/QHEQuoIKgNE

var circles;
var spots;
var img;

function preload() {
  img = loadImage("assets/2017.png");
}

function setup() {
  createCanvas(900, 400);
  var density = displayDensity();
  pixelDensity(1);
  img.loadPixels();
  spots = [];
  circles = [];
  for (var x = 0; x < img.width; x++) {
    for (var y = 0; y < img.height; y++) {
      var index = x + y * img.width;
      var c = img.pixels[index*4];
      var b = brightness([c]);
      if (b > 1) {
        spots.push(createVector(x, y));
      }
    }
  }

  console.log(img.width);
  console.log(img.height);
  console.log("pixels", img.pixels.length);
  console.log("spots", spots.length);
  console.log(density)
}

function draw() {
  background(0);
  // frameRate(20)

  var total = 10;
  var count = 0;
  var attempts = 0;

  while (count < total) {
    var newC = newCircle();
    if (newC !== null) {
      circles.push(newC);
      count++;
    }
    attempts++;
    if (attempts > 1000) {
      noLoop();
      console.log("finished");
      break;
    }
  }

  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];

    if (circle.growing) {
      if (circle.edges()) {
        circle.growing = false;
      } else {
        for (var j = 0; j < circles.length; j++) {
          var other = circles[j];
          if (circle !== other) {
            var d = dist(circle.x, circle.y, other.x, other.y);
            var distance = circle.r + other.r;

            if (d - 5 < distance) {
              circle.growing = false;
              break;
            }
          }
        }
      }
    }

    circle.show();
    circle.grow();
  }
}

function newCircle() {
  var r = int(random(0, spots.length));
  var spot = spots[r];
  var x = spot.x;
  var y = spot.y;

  var valid = true;
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];
    var d = dist(x, y, circle.x, circle.y);
    if (d < circle.r) {
      valid = false;
      break;
    }
  }
  if (valid) {
    return new Circle(x, y);
  } else {
    return null;
  }
}// Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// Video: https://www.youtube.com/watch?v=4hA7G3gup-4

var font;
var vehicles = [];
var spots;
var img;

function preload() {
  //font = loadFont('AvenirNextLTPro-Demi.otf');
  
}

function setup() {
  createCanvas(600, 300);
  background(51);
  //textFont(font);
  // textSize(192);
  // fill(255);
  // noStroke();
  //text('train', 100, 200);
  

  img = loadImage("heart2-p5.gif");
  img.loadPixels();
  for (var x = 0 ; x < img.width; x++){
		for (var y = 0; y < img.height; y++) {
      var index = x + y * img.width;
      
      var c = img.pixels[index*4];
      var b = brightness([c]);
      if (b > 1) {
        spots.push(createVector(x, y));
   
      }
    }
  }
  
  
  var density = displayDensity();
  pixelDensity(1);
  spots = [];
  circles = [];


  console.log(img.width);
  console.log(img.height);
  console.log("pixels", img.pixels.length);
  console.log("spots", spots.length);
  console.log(density)

  var points = spots.length;

  for (var i = 0; i < points.length; i++) {
    var pt = points[i];
    var vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
    //stroke(255);
    //strokeWeight(8);
    //point(pt.x, pt.y);
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

}

// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/QHEQuoIKgNE

var circles;

function setup() {
  createCanvas(640, 360);
  circles = [];
}

function draw() {
  background(0);
  frameRate(20)

  var total = 5;
  var count = 0;
  var attempts = 0;

  while (count < total) {
    var newC = newCircle();
    if (newC !== null) {
      circles.push(newC);
      count++;
    }
    attempts++;
    if (attempts > 100) {
      noLoop();
      console.log("finished");
      break;
    }
  }

  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];

    if (circle.growing) {
      if (circle.edges()) {
        circle.growing = false;
      } else {
        for (var j = 0; j < circles.length; j++) {
          var other = circles[j];
          if (circle !== other) {
            var d = dist(circle.x, circle.y, other.x, other.y);
            var distance = circle.r + other.r;

            if (d - 2 < distance) {
              circle.growing = false;
              break;
            }
          }
        }
      }
    }

    circle.show();
    circle.grow();
  }
}

function newCircle() {
  var x = random(width);
  var y = random(height);
  var valid = true;
  for (var i = 0; i < circles.length; i++) {
    var circle = circles[i];
    var d = dist(x, y, circle.x, circle.y);
    if (d < circle.r) {
      valid = false;
      break;
    }
  }
  if (valid) {
    return new Circle(x, y);
  } else {
    return null;
  }
}// Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// Video: https://www.youtube.com/watch?v=4hA7G3gup-4

var font;
var vehicles = [];
var points = [];
var img;

function preload() {
  // font = loadFont('AvenirNextLTPro-Demi.otf');
  img = loadImage("heart-3.png");
}


function setup() {
  createCanvas(600, 400);
  background(51);

  //pixelDensity(1);
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


  // textFont(font);
  // textSize(192);
  // fill(255);
  // noStroke();
  // text('train', 100, 200);

  // var points = font.textToPoints('train', 100, 200, 192, {
  //   sampleFactor: 0.25
  // });

  //points[0] = createVector(100, 100);
  //points[1] = createVector(200, 100);

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


var num = 1500;
var vx = new Array(num);
var vy = new Array(num);
var x = new Array(num);
var y = new Array(num);
var ax = new Array(num);
var ay = new Array(num);

var magnetism = 30;
var radius = 1; 
var gensoku =  1; 

const IDEAL_FRAME_RATE = 60;
const UNIT_ANGLE_VELOCITY = (2 * Math.PI) / IDEAL_FRAME_RATE;

function setup(){
  createCanvas(windowWidth,windowHeight);
  stroke(100, 10, 200); 
  ellipseMode(RADIUS);
  background(30,40,50);
  blendMode(SCREEN);
  
  for(var i =0; i< num; i++){
    x[i] = random(width);
    y[i] = random(height);
    vx[i] = 0;
    vy[i] = 0;
    ax[i] = 0;
    ay[i] = 0;
  }
  
    // Instantiate our SerialPort object
    serial = new p5.SerialPort();
    serial.on('list', printList); // set a callback function for the serialport list event
    serial.on('connected', serverConnected); // callback for connecting to the server
    serial.on('open', portOpen); // callback for the port opening
    serial.on('data', serialEvent); // callback for when new data arrives
    serial.on('error', serialError); // callback for errors
    serial.on('close', portClose); // callback for the port closing

    serial.list(); // list the serial ports

    serial.open("/dev/cu.usbmodem1441");

    // let col= map(humi1, 0,width, 0,255);
  
    const canvasSideLength = Math.max(Math.min(windowWidth, windowHeight) * 0.95, Math.min(displayWidth, displayHeight) * 0.5);
    createCanvas(canvasSideLength, canvasSideLength, WEBGL);
    frameRate(IDEAL_FRAME_RATE);
    const scaleFactor = canvasSideLength / 640;
    largeSphereRadius = 240 * scaleFactor;
    for (let i = 0; i < 64; i += 1) {
        const newParticle = new Particle();
        newParticle.position.set(Math.random() * 2 * Math.PI, Math.random() * 2 * Math.PI, largeSphereRadius);
        newParticle.displaySize = 4 * scaleFactor;
        particleSet.push(newParticle);
    }
  
}


function draw(){
  clear();
	fill(0,0,0);
  rect(0,0,windowWidth,windowHeight);
  
  for(var i=0; i<num; i++){
    var distance = dist(mouseX,mouseY, x[i], y[i]); 
   
    if(distance > 3){ 
      ax[i] = magnetism * (mouseX - x[i]) / (distance * distance); 
      ay[i] = magnetism * (mouseY - y[i]) / (distance * distance);
    }
    
    
    vx[i] += ax[i]; 
    vy[i] += ay[i]; 
    
    vx[i] = vx[i]*gensoku;
    vy[i] = vy[i]*gensoku;
    
    x[i] += vx[i];  
    y[i] += vy[i];  
    
    var sokudo = dist(mouseX,mouseY,vx[i],vy[i]);
    var r = map(sokudo, 0, 5, 0, 255); 
    var g = map(sokudo, 0,5, 64, 255);
    var b = map(sokudo, 0,5, 128, 255);
    fill(r, g, b, 50);
    //fill(r, g, b);
    ellipse(x[i],y[i],radius,radius);
  }
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
 //print(inString);
    //check to see that there's actually a string there:
    if (inString.length > 0) {
      var sensors = split(inString, ','); // split the string on the commas
      if (sensors.length >1) { // if there are three elements
        humi1 = map(sensors[0], 40, 100, 0, width / 2);
        humi2 = map(sensors[1], 10, 50, 0, width / 2);
        print(humi1);
        print(humi2);
       
        // element 0 is the boardx
        //wh = map(sensors[1], 0, 1023, 0, height/2); // element 1 is the wall's height
        //circleColor = 255 - (sensors[2] * 255);      // element 2 is the button
      }
   }


  }

p5.disableFriendlyErrors = true;
const particleSet = [];
let largeSphereRadius;
let alternativeViewIsOn = false;
function getAirCurrentDirection(position) {
    const noiseOffset = 0.003 * frameCount;
    const angleOffset = 0.1 * (frameCount / IDEAL_FRAME_RATE) * TWO_PI;
    return (noise(noiseOffset) * TWO_PI) + angleOffset;
}
function applyAirCurrentForceField(particle) {
    const position = particle.position;
    const directionAngle = getAirCurrentDirection(position);
    const speed = radians(1);
    const latitudeDisplacement = speed * Math.cos(directionAngle);
    const longitudeDisplacement = speed * Math.sin(directionAngle);
    particle.position.set(position.latitude + latitudeDisplacement, position.longitude + longitudeDisplacement);
}
class Particle {
    constructor() {
        this.position = new GeographicPosition();
        this.positionHistory = new PositionHistory(7 /* capacity */, createVector);
        this.displaySize = 3;
    }
    display() {
        let sizeFactor = (this.positionHistory.capacity - this.positionHistory.validHistoryCount + 1)
            / (this.positionHistory.capacity + 1);
        for (const pos of this.positionHistory) {
            push();
            translate(pos.x, pos.y, pos.z);
            sphere(sizeFactor * this.displaySize, 6, 4);
            pop();
            sizeFactor += 1 / (this.positionHistory.capacity + 1);
        }
        push();
        translate(this.position.x, this.position.y, this.position.z);
        sphere(this.displaySize, 6, 4);
        pop();
        if (frameCount % 2 === 0)
            this.positionHistory.push(this.position);
    }
}

function setFromGeographicPosition(lat, lon, alt) {
    this.x = alt * Math.cos(lon) * Math.cos(lat);
    this.y = alt * Math.sin(-lon);
    this.z = alt * Math.cos(lon) * Math.sin(lat);
}
class GeographicPosition {
    constructor(lat = 0, lon = 0, alt = 0, create3DVector) {
        this.cartesianPosition = create3DVector ? create3DVector() : { x: 0, y: 0, z: 0 };
        this.set(lat, lon, alt);
    }
    set(lat, lon, alt) {
        this.latitude = lat;
        this.longitude = lon;
        this.altitude = alt || this.altitude;
        setFromGeographicPosition.call(this.cartesianPosition, this.latitude, this.longitude, this.altitude);
    }
    get x() {
        return this.cartesianPosition.x;
    }
    get y() {
        return this.cartesianPosition.y;
    }
    get z() {
        return this.cartesianPosition.z;
    }
}
class PositionHistory {
    constructor(capacity, create3DVectorFunction) {
        this.capacity = capacity;
        this.positionArray = [];
        for (let i = 0; i < capacity; i += 1) {
            this.positionArray.push(create3DVectorFunction ? create3DVectorFunction() : { x: 0, y: 0, z: 0 });
        }
        this.validHistoryCount = 0;
        this.currentIndex = 0;
    }
    push(position) {
        const currentObject = this.positionArray[this.currentIndex];
        currentObject.x = position.x;
        currentObject.y = position.y;
        currentObject.z = position.z;
        this.currentIndex += 1;
        if (this.currentIndex >= this.capacity) {
            this.currentIndex = 0;
        }
        this.validHistoryCount = Math.min(this.capacity, this.validHistoryCount + 1);
    }
    // tslint:disable-next-line:function-name
    [Symbol.iterator]() {
        return new PositionHistoryIterator(this);
    }
}
class PositionHistoryIterator {
    constructor(history) {
        this.history = history;
        this.remainingIterationCount = history.validHistoryCount;
        this.historyIndex = history.currentIndex - this.remainingIterationCount;
        if (this.historyIndex < 0)
            this.historyIndex += history.capacity;
    }
    next() {
        if (this.remainingIterationCount <= 0) {
            return {
                // value should be undefined. https://github.com/Microsoft/TypeScript/issues/11375
                value: this.history.positionArray[this.historyIndex],
                done: true,
            };
        }
        const result = {
            value: this.history.positionArray[this.historyIndex],
            done: false,
        };
        this.historyIndex += 1;
        if (this.historyIndex >= this.history.capacity)
            this.historyIndex = 0;
        this.remainingIterationCount -= 1;
        return result;
    }
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


var num = 1500;
var vx = new Array(num);
var vy = new Array(num);
var x = new Array(num);
var y = new Array(num);
var ax = new Array(num);
var ay = new Array(num);

var magnetism = 30;
var radius = 3; 
var gensoku = 1; 

function setup(){
  createCanvas(windowWidth,windowHeight);
  stroke(100, 10, random(200,300)); 
  ellipseMode(RADIUS);
  background(30,40,50);
  blendMode(SCREEN);
  
  for(var i =0; i< num; i++){
    x[i] = random(width);
    y[i] = random(height);
    vx[i] = 0;
    vy[i] = 0;
    ax[i] = 0;
    ay[i] = 0;
  }
  
    // Instantiate our SerialPort object
    serial = new p5.SerialPort();
    serial.on('list', printList); // set a callback function for the serialport list event
    serial.on('connected', serverConnected); // callback for connecting to the server
    serial.on('open', portOpen); // callback for the port opening
    serial.on('data', serialEvent); // callback for when new data arrives
    serial.on('error', serialError); // callback for errors
    serial.on('close', portClose); // callback for the port closing

    serial.list(); // list the serial ports

    serial.open("/dev/cu.usbmodem1441");

  let col= map(humi1, 0,width, 0,255);
  
}


function draw(){
  clear();
	fill(0,0,0);
  rect(0,0,windowWidth,windowHeight);
  
  for(var i=0; i<num; i++){
    var distance = dist(humi1,humi2, x[i], y[i]); 
   
    if(distance > 3){ 
      ax[i] = magnetism * (humi1 - x[i]) / (distance * distance); 
      ay[i] = magnetism * (-humi2 - y[i]) / (distance * distance);
    }
    
    
    vx[i] += ax[i]; 
    vy[i] += ay[i]; 
    
    vx[i] = vx[i]*gensoku;
    vy[i] = vy[i]*gensoku;
    
    x[i] += vx[i];  
    y[i] += vy[i];  
    
    var sokudo = dist(humi1,humi2,vx[i],vy[i]);
    var r = map(sokudo, 0, 5, 0, 255); 
    var g = map(sokudo, 0,5, humi1, 255);
    var b = map(sokudo, 0,5, humi2, 255);
    fill(r, g, b, 50);
    //fill(r, g, b);
    ellipse(x[i],y[i],radius,radius);
  }
}

 // get the list of ports:
  function printList(portList) {
    // portList is an array of serial port names
    for (var i = 0; i < portList.length; i++) {
      // Display the list the console:
//	 println(i + " " + portList[i]);
   }
  }


  function serverConnected() {
    //println('connected to server.');
  }

  function portOpen() {
 //   println('the serial port opened.')
  }

  function serialError(err) {
    //println('Something went wrong with the serial port. ' + err);
  }

  function portClose() {
    //println('The serial port closed.');
  }

  function serialEvent() {
    // read a string from the serial port
    // until you get carriage return and newline:
    var inString = serial.readStringUntil('\r\n');
 //print(inString);
    //check to see that there's actually a string there:
    if (inString.length > 0) {
      var sensors = split(inString, ','); // split the string on the commas
      if (sensors.length >1) { // if there are three elements
        humi1 = map(sensors[0], 40, 100, 0, width / 2);
        humi2 = map(sensors[1], 10, 50, 0, width / 2);
        print(humi1);
        print(humi2);
       
        // element 0 is the boardx
        //wh = map(sensors[1], 0, 1023, 0, height/2); // element 1 is the wall's height
        //circleColor = 255 - (sensors[2] * 255);      // element 2 is the button
      }
   }


  }
// Declare a "SerialPort" object
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


var num = 1500;
var vx = new Array(num);
var vy = new Array(num);
var x = new Array(num);
var y = new Array(num);
var ax = new Array(num);
var ay = new Array(num);

var magnetism = 30;
var radius = 1; 
var gensoku =  1; 

function setup(){
  createCanvas(windowWidth,windowHeight);
  stroke(100, 10, 200); 
  ellipseMode(RADIUS);
  background(30,40,50);
  blendMode(SCREEN);
  
  for(var i =0; i< num; i++){
    x[i] = random(width);
    y[i] = random(height);
    vx[i] = 0;
    vy[i] = 0;
    ax[i] = 0;
    ay[i] = 0;
  }
  
    // Instantiate our SerialPort object
    serial = new p5.SerialPort();
    serial.on('list', printList); // set a callback function for the serialport list event
    serial.on('connected', serverConnected); // callback for connecting to the server
    serial.on('open', portOpen); // callback for the port opening
    serial.on('data', serialEvent); // callback for when new data arrives
    serial.on('error', serialError); // callback for errors
    serial.on('close', portClose); // callback for the port closing

    serial.list(); // list the serial ports

    serial.open("/dev/cu.usbmodem1441");

    // let col= map(humi1, 0,width, 0,255);
  
}


function draw(){
  clear();
	fill(0,0,0);
  rect(0,0,windowWidth,windowHeight);
  
  for(var i=0; i<num; i++){
    var distance = dist(mouseX,mouseY, x[i], y[i]); 
   
    if(distance > 3){ 
      ax[i] = magnetism * (mouseX - x[i]) / (distance * distance); 
      ay[i] = magnetism * (mouseY - y[i]) / (distance * distance);
    }
    
    
    vx[i] += ax[i]; 
    vy[i] += ay[i]; 
    
    vx[i] = vx[i]*gensoku;
    vy[i] = vy[i]*gensoku;
    
    x[i] += vx[i];  
    y[i] += vy[i];  
    
    var sokudo = dist(mouseX,mouseY,vx[i],vy[i]);
    var r = map(sokudo, 0, 5, 0, 255); 
    var g = map(sokudo, 0,5, 64, 255);
    var b = map(sokudo, 0,5, 128, 255);
    fill(r, g, b, 50);
    //fill(r, g, b);
    ellipse(x[i],y[i],radius,radius);
  }
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
 //print(inString);
    //check to see that there's actually a string there:
    if (inString.length > 0) {
      var sensors = split(inString, ','); // split the string on the commas
      if (sensors.length >1) { // if there are three elements
        humi1 = map(sensors[0], 40, 100, 0, width / 2);
        humi2 = map(sensors[1], 10, 50, 0, width / 2);
        print(humi1);
        print(humi2);
       
        // element 0 is the boardx
        //wh = map(sensors[1], 0, 1023, 0, height/2); // element 1 is the wall's height
        //circleColor = 255 - (sensors[2] * 255);      // element 2 is the button
      }
   }


  }
// Declare a "SerialPort" object
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

let pic1, pic2;

//heartrain
let rain = [];

//font
let myFont;

function preload() {
  heart = loadImage('heart.png');
  myFont = loadFont('Barkentina 1.otf');
}

function setup() {
  createCanvas(1000, 600);
  
  //font
  
  textFont(myFont);
  textSize(36);

  //heart rain
  for (let i = 0; i < 150; i++) {
    rain.push(new Rain(heart));
  }

    // Instantiate our SerialPort object
    serial = new p5.SerialPort();
    serial.on('list', printList); // set a callback function for the serialport list event
    serial.on('connected', serverConnected); // callback for connecting to the server
    serial.on('open', portOpen); // callback for the port opening
    serial.on('data', serialEvent); // callback for when new data arrives
    serial.on('error', serialError); // callback for errors
    serial.on('close', portClose); // callback for the port closing

    serial.list(); // list the serial ports

    serial.open("/dev/cu.usbmodem1441");

    // let col= map(humi1, 0,width, 0,255);
  }

  function draw() {
    background(255);
    imageMode(CENTER);

    //bar();


    //let col= map(humi1,0,width, 0,255);
    //tint(col,50);
    //println(humi1);
    
  	//falling heart
    //if (humi1 > width / 3 && humi2 > width / 3)

    if (humi1 > width / 3 && humi2 > width / 3 ) {
      for (let i = 0; i < rain.length; i++) {
        rain[i].fall();
        rain[i].display();
      }
      fill(250,0,0);
      text('You are in Love!', width / 3, height *6/ 7);
      
    }
  	scale(random(0.99, 1));

    pic1 = image(heart, width / 4, height / 2, humi1, humi1);
  	//scale(random(0.95, 1));

    pic2 = image(heart, width * 3 / 4, height / 2, humi2, humi2);
  	//scale(random(0.95, 1));

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
 //print(inString);
    //check to see that there's actually a string there:
    if (inString.length > 0) {
      var sensors = split(inString, ','); // split the string on the commas
      if (sensors.length >1) { // if there are three elements
        humi1 = map(sensors[0], 40, 100, 0, width / 2);
        humi2 = map(sensors[1], 10, 50, 0, width / 2);
        print(humi1);
        print(humi2);
       
        // element 0 is the boardx
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
  }var num = 1500;
var vx = new Array(num);
var vy = new Array(num);
var x = new Array(num);
var y = new Array(num);
var ax = new Array(num);
var ay = new Array(num);

var magnetism = 50;
var radius = 1.5; 
var gensoku =  1; 

function setup(){
  createCanvas(windowWidth,windowHeight);
  stroke(100, 10, 200); 
  ellipseMode(RADIUS);
  background(30,40,50);
  blendMode(SCREEN);
  
  for(var i =0; i< num; i++){
    x[i] = random(width);
    y[i] = random(height);
    vx[i] = 0;
    vy[i] = 0;
    ax[i] = 0;
    ay[i] = 0;
  }
}


function draw(){
  clear();
	fill(0,0,0);
  rect(0,0,windowWidth,windowHeight);
  
  for(var i=0; i<num; i++){
    var distance = dist(mouseX, mouseY, x[i], y[i]); 
   
    if(distance > 3){ 
      ax[i] = magnetism * (mouseX - x[i]) / (distance * distance); 
      ay[i] = magnetism * (mouseY - y[i]) / (distance * distance);
    }
    

    
    vx[i] += ax[i]; 
    vy[i] += ay[i]; 
    
    vx[i] = vx[i]*gensoku;
    vy[i] = vy[i]*gensoku;
    
    x[i] += vx[i];  
    y[i] += vy[i];  
    
    var sokudo = dist(mouseX,mouseY,vx[i],vy[i]);
    var r = map(sokudo, 0, 5, 0, 255); 
    var g = map(sokudo, 0, 5, 64, 255);
    var b = map(sokudo, 0, 5, 128, 255);
    fill(r, g, b, 50);
    //fill(r, g, b);
    ellipse(x[i],y[i],radius,radius);
  }
  
}var num = 1000;
var vx = new Array(num);
var vy = new Array(num);
var x = new Array(num);
var y = new Array(num);
var ax = new Array(num);
var ay = new Array(num);

var magnetism = 30;
var radius = 1; 
var gensoku =  1; 

function setup(){
  createCanvas(windowWidth,windowHeight);
  stroke(100, 10, 200); 
  ellipseMode(RADIUS);
  background(30,40,50);
  blendMode(ADD);
  
  for(var i =0; i< num; i++){
    x[i] = random(width);
    y[i] = random(height);
    vx[i] = 0;
    vy[i] = 0;
    ax[i] = 0;
    ay[i] = 0;
  }
}


function draw(){
  clear();
	fill(0,0,0);
  rect(0,0,windowWidth,windowHeight);
  
  for(var i=0; i<num; i++){
    var distance = dist(mouseX, mouseY, x[i], y[i]); 
   
    if(distance > 3){ 
      ax[i] = magnetism * (mouseX - x[i]) / (distance * distance); 
      ay[i] = magnetism * (mouseY - y[i]) / (distance * distance);
    }
    vx[i] += ax[i]; 
    vy[i] += ay[i]; 
    
    vx[i] = vx[i]*gensoku;
    vy[i] = vy[i]*gensoku;
    
    x[i] += vx[i];  
    y[i] += vy[i];  
    
    var sokudo = dist(0,0,vx[i],vy[i]);
    var r = map(sokudo, 0, 5, 0, 255); 
    var g = map(sokudo, 0,5, 64, 255);
    var b = map(sokudo, 0,5, 128, 255);
    //fill(r, g, b, 50);
    fill(r, g, b);
    ellipse(x[i],y[i],radius,radius);
  }
  
}var img;
var img2;
var counter = 0;
var interval;
var timer;
var x = 50;
let button;

function setup() { 
  createCanvas(500, 500);
  
  timer = createP('timer');
  
  button = createButton('restart');
  button.style('font-size','10pt');
  button.mousePressed(stopTimer);
  interval = setInterval(timeIt, 500);

} 
  
function preload() {
  img = createImg("heartbeat-UI-04.png");
  img.hide();
}

function startTimer(){
  interval = setInterval(timeIt, 500);
}

function stopTimer(){
  clearInterval(interval);
}

function timeIt(){
  timer.html(counter);
  counter ++;
  if( counter > 10) { 
  img2 = createImg("love.gif");
}
}

function draw() { 
  background(255);
  
  image(img, width/2, height/2, x, x);
  imageMode(CENTER);
  
  x = x + 1
  if ( x > 200 ) {
    x = x / height ;
  }
  
  if ( x > 80){
  textSize(28);
  fill(255, 104, 100);
	text("Measuring", 185, 60);
  } else {
  textSize(28);
  fill(255, 104, 100);
	text("Ready", 210, 60);
  }
  
  if ( x > 80){
  textSize(14);
  s = "Look at your partner and feel the pulse";
	fill(96, 96, 96);
	text(s, 130, 70, 300, 300)
  } else {
  textSize(14);
  s = "Place your hand on the sensor";
	fill(96, 96, 96);
	text(s, 150, 70, 300, 300)
  }
}
  
let a = 50;
let z = 0;

function setup() { 
  createCanvas(400, 400, WEBGL);
} 

function draw() { 
  background(220);
  
  translate(mouseX-200,mouseY-200, z);
  rotateX(a);
  rectMode(CENTER);
  noFill(0);
  stroke(0);
  sphere(50);
 	ambientLight(90);
 	pointLight(250, 250, 250, 100, 100, 0);
 	ambientMaterial(255);
  
  //rotation speed
  a += 0.1;
  
  z += 5;
  if (z < 100){
    z = 0;
  }
    
}let a = 30;

function setup() { 
  createCanvas(400, 400, WEBGL);
} 

function draw() { 
  background(220);
  rotateX(a);
  rectMode(CENTER);
  //rect(0,0,100,100);
  noFill(0);
  stroke(0);
  box(mouseX);
  
  //rotation speed
  a+= 0.1;
}var img;

function setup() { 
  createCanvas(500, 500);
} 

function preload() {
  img = createImg("heartbeat-UI-04.png");
  img.hide();
}


function draw() { 
  background(255);
  

  image(img, width/2, height/2, mouseX, mouseX);
  imageMode(CENTER);
  
  if (mouseX > 80){
  textSize(28);
  fill(255, 104, 100);
	text("Measuring", 185, 60);
  } else {
  textSize(28);
  fill(255, 104, 100);
	text("Ready", 210, 60);
  }
  
  if (mouseX > 80){
  textSize(14);
  s = "Look at your partner and feel the pulse";
	fill(96, 96, 96);
	text(s, 130, 70, 300, 300)
  } else {
  textSize(14);
  s = "Place your hand on the sensor";
	fill(96, 96, 96);
	text(s, 150, 70, 300, 300)
  }

  
  
}
function setup() {
 	createCanvas(windowWidth, windowHeight);
	strokeWeight(10)
	stroke(random(255),random(255),random(255));
  setShakeThreshold(50);
}

function touchMoved() {
	line(mouseX, mouseY, pmouseX, pmouseY);
	return false;
}

function deviceShaken() {
  background(255);
}var kinectron = null;
var lightImage;

function preload(){
  lightImage = loadImage("light.jpg");
}

function setup() {
	createCanvas(500, 500);
  var address = {host: '172.16.216.84', port: 9001, path: '/'};
	kinectron = new Kinectron('kinectron',address);
	kinectron.makeConnection();
  kinectron.startTrackedBodies(trackBody);
  //set the callback function name to be called when stuff comes from kinect
}

function draw() {

}

function trackBody(body) {
	background(255);
  var val = body.joints[kinectron.HANDLEFT].depthX;
  var leftX =  map(val,0,1,0,width);
  val = body.joints[kinectron.HANDLEFT].depthY;
  var leftY = map(val,0,1,0,height);
  val = body.joints[kinectron.HANDRIGHT].depthX;
  var rightX = map(val,0,1,0,width);
  val = body.joints[kinectron.HANDRIGHT].depthY;
  var rightY = map(val,0,1,0,height);
  imageMode(CORNERS);
 	image(lightImage,leftX,leftY,rightX,rightY);
}var kinectron = null;
var backgrnd ;

function preload(){
   backgrnd = loadImage("beach.jpg");
}

function setup() {
	createCanvas(630, 420);
	kinectron = new Kinectron('172.16.216.84');
	kinectron.makeConnection();
  //kinectron.startTrackedBodies(trackBody);
  kinectron.startKey(gotData);
  //set the callback function name to be called when stuff comes from kinect
}

function draw() {

}

function gotData(data){
  loadImage(data.src,gotImage);
  //this is a callback that triggers another callback
}

function gotImage(img){
  image(backgrnd,0,0);
  image(img,0,0);
}


let img;
let song;
let slider;
let sliderVolume;
let sliderRate;
let sliderPan;
let mic;
let button;
let laugh;

function preload() {
  img = createImg("minion_guitar.jpg");
}

function setup() { 
  
  //creating minion
  createCanvas(600, 400);
  
  //loading sound and slider
  song = loadSound("despacito.mp3",loaded);
  laugh = loadSound("Voice-Cartoon_Laugh-01.mp3");
  sliderVolume = createSlider(0, 1, 0.5, 0.01);
  sliderRate = createSlider(0, 3, 2, 0.01);
  
  //creating mouth animation
  mic = new p5.AudioIn();
  mic.start(); 

  //laughing sound
  laugh.playMode('restart');

} 

function loaded(){
  console.log("loaded");
  
  //play and pause button
  button = createButton("play");
  button.mousePressed(togglePlaying);
}

function togglePlaying(){
  if(!song.isPlaying()) {
  song.play();
  button.html("You are annoying!");
  } else {
  song.stop();
  button.html("Sing!");
  }
}

function draw() { 
  image(img, 0, 0);
  img.hide();
  
  song.setVolume(sliderVolume.value());
  song.rate(sliderRate.value());
  
  var vol = mic.getLevel(); 
  //stroke(0);
  fill(0);
  ellipse(200, 200, 50, 1 + vol * 200);
}

function keyPressed(){
  if(key == 'M'){
		if(!laugh.isPlaying()) {
  	laugh.play();
		}
  }
}let img;
let song;
let slider;
let sliderVolume;
let sliderRate;
let sliderPan;
let mic;
let button;
let laugh;

function preload() {
  img = createImg("minion_guitar.jpg");
}

function setup() { 
  
  //creating minion
  createCanvas(600, 400);
  
  //loading sound and slider
  song = loadSound("despacito.mp3",loaded);
  laugh = loadSound("Voice-Cartoon_Laugh-01.mp3");
  sliderVolume = createSlider(0, 1, 0.5, 0.01);
  sliderRate = createSlider(0, 3, 2, 0.01);
  
  //creating mouth animation
  mic = new p5.AudioIn();
  mic.start(); 

  //laughing sound
  laugh.playMode('restart');

} 

function loaded(){
  console.log("loaded");
  
  //play and pause button
  button = createButton("play");
  button.mousePressed(togglePlaying);
}

function togglePlaying(){
  if(!song.isPlaying()) {
  song.play();
  button.html("pause");
  } else {
  song.pause();
  button.html("play");
  }
}

function draw() { 
  image(img, 0, 0);
  img.hide();
  
  song.setVolume(sliderVolume.value());
  song.rate(sliderRate.value());
  
  var vol = mic.getLevel(); 
  //stroke(0);
  fill(0);
  ellipse(200, 200, 50, 1vol*100);
}

function keyPressed(){
  if(key == 'M'){
		if(!laugh.isPlaying()) {
  	laugh.play();
		}
  }
}// Daniel Shiffman
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
  ellipse(100, 100, 200, 1 + vol * 200);
}
var video;

var vScale = 16;
var slider;

var cols = 40;
var rows = 30;

var boxes = [];

function setup() {
  noCanvas();
  pixelDensity(1);
  createP('test');
  video = createCapture(VIDEO);
  video.size(cols, rows);
  slider = createSlider(0, 255, 77);

  for (var y = 0; y < rows; y++) {
    // noprotect
    for (var x = 0; x < cols; x++) {
      var box = createCheckbox();
      box.style('display', 'inline');
      box.parent('mirror');
      boxes.push(box);
    }
    var linebreak = createSpan('<br/>');
    linebreak.parent('mirror');
  }

}

function draw() {
  video.loadPixels();
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var index = (video.width - x + 1 + (y * video.width))*4;
      var r = video.pixels[index+0];
      var g = video.pixels[index+1];
      var b = video.pixels[index+2];

      var bright = (r+g+b)/3;

      var threshold = slider.value();

      var checkIndex = x + y * cols;

      if (bright > threshold) {
        boxes[checkIndex].checked(false);
      } else {
        boxes[checkIndex].checked(true);
      }
    }
  }
 
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

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      
      // mirrored column = width - column - 1
      var loc = ((cols - i - 1) + j * cols) * 4;
      
      var r = video.pixels[loc   ]; 
      var g = video.pixels[loc + 1];
      var b = video.pixels[loc + 2];

      var sz = map((r+g+b)/3, 0, 255, 0, videoScale);
      rectMode(CENTER);
      fill(255);
      noStroke();

      var x = i*videoScale;
      var y = j*videoScale;
      rect(x + videoScale/2, y + videoScale/2, sz, sz);
    }
  }
}

let img;
let song;
let slider;
let sliderVolume;
let sliderRate;
let sliderPan;
let mic;
let button;
let laugh;

function preload() {
  img = createImg("minion_guitar.jpg");
}

function setup() { 
  
  //creating minion
  createCanvas(600, 400);
  
  //loading sound and slider
  song = loadSound("despacito.mp3",loaded);
  laugh = loadSound("Voice-Cartoon_Laugh-01.mp3");
  sliderVolume = createSlider(0, 1, 0.5, 0.01);
  sliderRate = createSlider(0, 3, 2, 0.01);
  
  //creating mouth animation
  mic = new p5.AudioIn();
  mic.start(); 

  //laughing sound
  laugh.playMode('restart');

} 

function loaded(){
  console.log("loaded");
  
  //play and pause button
  button = createButton("play");
  button.mousePressed(togglePlaying);
}

function togglePlaying(){
  if(!song.isPlaying()) {
  song.play();
  button.html("pause");
  } else {
  song.pause();
  button.html("play");
  }
}

function draw() { 
  image(img, 0, 0);
  img.hide();
  
  song.setVolume(sliderVolume.value());
  song.rate(sliderRate.value());
  
  var vol = mic.getLevel(); 
  //stroke(0);
  fill(0);
  ellipse(200, 200, 50, 1 + vol * 200);
}

function keyPressed(){
  if(key == 'M'){
		if(!laugh.isPlaying()) {
  	laugh.play();
		}
  }
}var video;
var button;
var snapshots = [];
var counter = 0;

function setup() { 
  createCanvas(400, 300);
  background(51);
  video = createCapture(VIDEO, ready);
  video.size(400,300);
  // button=createButton('snap');
  // button.mousePressed(takesnap);
} 

var go = false;

function ready(){
  go = true;
}

function draw() { 
  if(go){
    snapshots[counter]=video.get();
    counter++;
    if(counter==29){
      counter=0;
    }
  }
  var w = 80;
  var h = 60;
  var x = 0;
  var y = 0;
	for (var i = 0; i < snapshots.length; i++){
   tint(255,50);
   image(snapshots[i],x,y,w,h);
   x = x + w

   if(x>width){
     x = 0;
     y = y + h;
   }
 }
}var video;
var button;
var snapshots = [];

function setup() { 
  createCanvas(400, 300);
  background(51);
  video = createCapture(VIDEO);
  video.size(400,300);
  button=createButton('snap');
  button.mousePressed(takesnap);
} 

function takesnap(){
  snapshots.push(video.get());
  //image(video,0,0);
}

function draw() { 
  var w = 80;
  var h = 60;
  var x = 0;
  var y = 0;
	for (var i = 0; i < snapshots.length; i++){
   tint(255,50);
   image(snapshots[i],x,y,w,h);
   x = x + w

   if(x>width){
     x = 0;
     y = y + h;
   }
 }
}var weather;

var api = 'http://api.openweathermap.org/data/2.5/weather?q=';
var city = 'London';
var apiKey = '&APPID=001b0f58045147663b1ea518d34d88b4';
var units = '&units=metric';
var input;

var img;

function preload(){
   img = loadImage("img_rain-02.png");
}

function setup() {
  background(255);
  createCanvas(400, 400);
  loadImage("img_rain-02.png", imageReady);

  var button = select('#submit');
  button.mousePressed(weatherAsk);

  input = select('#city');
  print(img);

}

function imageReady(iahahsh) {
  img = iahahsh; 
}

function weatherAsk() {
  var url = api + input.value() + apiKey + units;
  loadJSON(url, gotDatas);

}

function gotDatas(datas) {
  weather = datas;
  print(datas);
}

function draw() {

  if (weather) {
    var temp = weather.main.temp;
    var humidity = weather.main.humidity;
    noStroke();
    fill(255, 0, 0);
    //ellipse(100,200,temp,temp);
    ellipse(100, 150, humidity, humidity);
    stroke(255, 0, 0);
    line(100, 150, 100, 250);
    print("bla");
  }

  if (img) {
    image(img, 200, 150);
  }

}var weather;

var api='http://api.openweathermap.org/data/2.5/weather?q=';
var city = 'London';
var apiKey = '&APPID=001b0f58045147663b1ea518d34d88b4';
var units = '&units=metric';

var input;

function setup() { 
  createCanvas(400, 400);
  
  var button = select('#submit');
  button.mousePressed(weatherAsk);
  
  input = select('#city');
} 

function weatherAsk(){
    var url = api + input.value() + apiKey + units;
  loadJSON(url,gotData);
}

function gotData(data){
  weather = data;
}

function draw() { 
  background(0);
  if(weather){
    var temp = weather.main.temp;
    var humidity = weather.main.humidity;
    fill(255);
    ellipse(100,200,temp,temp);
    ellipse(200,200,humidity,humidity);
  }
  
}let img;

function preload(){
  img = createImg('http://turtlebackzoo.com/wp-content/uploads/2017/03/exhibit-headers_sea-turtles-600x400.jpg');
}

function setup() { 
  createCanvas(400, 400);
  img.hide();
  background(0);
  image(img,0,0);
} 

function draw() { 
 
}var weather;
var face;
var input;
var api = 'http://api.openweathermap.org/data/2.5/weather?q=';
var apiKey = '&APPID=001b0f58045147663b1ea518d34d88b4';
var units = '&units=metric';
var rain = [];
var emoji = new Emoji(100, 300);
var humid = 0;

function preload() {
  face = loadImage("a.png");
}

function askRain() {
  var url = api + input.value() + apiKey + units;
  loadJSON(url, gotData);
}

function gotData(data) {
  weather = data;
  println(data);
}

function setup() {
  createCanvas(500, 450);
  var button = select('#submit');
  button.mousePressed(askRain);

  input = select('#city');
  for (i = 0; i < 1000; i++) {
    rain[i] = new Rain(random(10, 750), random(0, -20000));
  }
}



function draw() {
  if (weather) {
    humid = weather.main.humidity;
    var humid2 = map(humid, 15, 110, 10, 900);

    println(humid2);

    var temp = weather.main.temp;
    colorMode(HSB);
    background(200, 40, temp * 1.5);
    //noStroke();
    //fill(255);
    //ellipse(mouseX, 300, humid, humid);
    // image(face, mouseX, 280, humid, humid);

    emoji.x = mouseX;
    emoji.draw();



    for (i = 0; i < humid2; i++) {
      rain[i].drawRain();
      rain[i].ripple();
      if (emoji.catch(rain[i])) {
        rain.splice(i, 1);

      }
    }
  }
}










function Rain(x, y) {
  this.x = x;
  this.y = y;
  this.gravity = 0.98;
  this.len = 30;
  this.r = 0;
  this.opacity = 200;

  this.drawRain = function() {
    noStroke();
    fill(255);
    ellipse(this.x, this.y, 1, this.len);
    this.y = this.y + 4;
    if (this.y > 400) {
      this.len = this.len - 4;
    }
    if (this.len < 0) {
      this.len = 0;
    }
  };

  this.ripple = function() {
    strokeWeight(2);
    colorMode(RGB);
    stroke(247, 247, 247, this.opacity);
    noFill();
    if (this.y > 400) {
      ellipse(this.x, 400, this.r * 2, this.r / 2);
      this.r++;
      this.opacity = this.opacity - 2;
    }
  };
}

function Emoji(x, y) {
  this.x = x;
  this.y = y;
  this.draw = function() {
    //fill(255);
    //ellipse(this.x, this.y, 50, 50);
    image(face, this.x, this.y, 60, 60);
  };
  this.catch = function(rain) {
    if (rain.y > this.y - 50) {
      if (rain.x < this.x + 50 && rain.x > this.x - 50) {
        return true;
      } else {
        return false;
      }
    }
  };

}var weather;

var api='http://api.openweathermap.org/data/2.5/weather?q=';
var city = 'London';
var apiKey = '&APPID=001b0f58045147663b1ea518d34d88b4';
var units = '&units=metric';

var input;

function setup() { 
  createCanvas(400, 400);
  
  var button = select('#submit');
  button.mousePressed(weatherAsk);
  
  input = select('#city');
} 

function weatherAsk(){
    var url = api + input.value() + apiKey + units;
  loadJSON(url,gotData);
}

function gotData(data){
  weather = data;
}

function draw() { 
  background(0);
  if(weather){
    var temp = weather.main.temp;
    var humidity = weather.main.humidity;
    fill(255);
    ellipse(100,200,temp,temp);
    ellipse(200,200,humidity,humidity);
  }
  
}var air;

//var mapimg;

var api='http://api.airvisual.com/v2/states?country=';
var country = 'USA';
var apiKey = '&key=PCeaqxxmHwaNCR6ST';

var input;

function preload(){
  data = loadJSON("air.json");
}

function setup() { 
  createCanvas(600,400);
  
  var button = select('#submit');
  button.mousePressed(dataAsk);
  
  input = select('#country');
} 

function mousePressed(){
}

function dataAsk(){
    var url = api + input.value() + apiKey;
  loadJSON(url,gotData);
}

function gotData(data){
  air = data;
}

function draw(){ 
  if(air){
    var aqi = air.data.ranking[1.current_aqi;
    if(aqi>200){
    fill(255,0,0,50);
		ellipse(200,200,100,100);
    }else{
		fill(0,255,0,50);
    ellipse(200,200,100,100);
  }
}
}var weather;

var api='http://api.openweathermap.org/data/2.5/weather?q=';
var city = 'London';
var apiKey = '&APPID=001b0f58045147663b1ea518d34d88b4';
var units = '&units=metric';

var input;

function setup() { 
  createCanvas(400, 400);
  
  var button = select('#submit');
  button.mousePressed(weatherAsk);
  
  input = select('#city');
} 

function weatherAsk(){
    var url = api + input.value() + apiKey + units;
  loadJSON(url,gotData);
}

function gotData(data){
  weather = data;
}

function draw() { 
  background(0);
  if(weather){
    var temp = weather.main.temp;
    var humidity = weather.main.humidity;
    fill(255);
    ellipse(100,200,temp,temp);
    ellipse(200,200,humidity,humidity);
  }
  
}var spaceData;

function setup(){ 
  loadJSON("http://api.open-notify.org/astros.json", gotData, 'jsonp');
} 

function gotData(data){ 
  spaceData = data;
  // println(data);
  // for (var i = 0; i < data.number; i++){
  //   fill(255);
  //   ellipse(random(width),random(height), 16, 16);
  // }
}

function draw(){
  background(0);
  stroke(255);
  line(x,0,x,height);
  x = x +1;
  if ( x > width){
    x = 0;
  }
  for (var i = 0; i < spaceData.number; i++){
    fill(255);
    ellipse(random(width), random(height),16,16);
  
}
}var data;

function preload() { 
  data = loadJSON("birds.json");
} 
 
function setup(){ 
  noCanvas();
  var bird = data.birds[1].members[2];
  createP(bird);
  
var birds = data.birds;
  
for (var i = 0; 1 < birds.length; i++){
createElement('h1', birds[i].family);
var members = birds[i].members;
for (var j = 0; j < members.length; j++){
createDiv(members[j]);
}
  }
}var api = "http://api.giphy.com/v1/gifs/search?";
var apiKey = "&api_key=dc6zaTOxFJmzC";
var query = "&q=shiffman";


function setup() {
  noCanvas();
  var url = api + apiKey + query;
  loadJSON(url, gotData);
}

function gotData(giphy) {
  for (var i = 0; i < giphy.data.length; i++) {
    var img = createImg(giphy.data[i].images.original.url);
    img.size(200, 200);
  }
}var api = "http://api.giphy.com/v1/gifs/search?";
var apiKey = "&api_key=dc6zaTOxFJmzC";
var query = "&q=tired";


function setup() {
  noCanvas();
  var url = api + apiKey + query;
  loadJSON(url, gotData);
}

function gotData(giphy) {
  for (var i = 0; i < giphy.data.length; i++) {
    var img = createImg(giphy.data[i].images.original.url);
    img.size(200, 200);
  }
}var data;

function preload() {
  data = loadJSON("birds.json");
}

function setup() {
  noCanvas();

  var birds = data.birds;

  for (var i = 0; i < birds.length; i++) {
    createElement('h1', birds[i].family);
    var members = birds[i].members;
    for (var j = 0; j < members.length; j++) {
      createDiv(members[j]);
    }
  }
}// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z

var emojis;

function setup() {
  noCanvas();
  data = loadJSON("sea_emoji.json', gotEmoji);

  var button = select('#button');
  // Demonstrating anonymous function
  button.mousePressed(function() {
    var span = createSpan(random(emojis))
    // Demonstrating chaining
    span.style('font-size','64px').parent('emojis');
  });
}

function gotEmoji(data) {
  console.log(data);
  emojis = data.seaEmoji;
}let data;

function preload(){
data = loadJSON("tolkienCharacterNames.json");
data = loadJSON("http://nytimes.com/api/headlines");
}
  

function setup(){
creativeCanvas(400,400);
background(0);
print(data,description);
}
  
  function draw(){
  }var colors;
var freq;
var bgcolor;
var slider;
var nameInput;
var nameP;

function setup() {
  createCanvas(600, 400);
  
  colors = [
    color(80, 150, 255),
    color(255, 50, 50),
    color(0,255,255)
  ];
  
  freq = 300;
  
  //slider
  slider = createSlider(0, 255, 100);
  slider.position(10, 100);
  slider.style('width', '80px');
  
  //button
  button = createButton("change background");
  button.mousePressed(changeColor);
  
  //input
  nameInput = createInput('type your name');
  nameInput.changed(updateText);
  
  //inputted
  nameP = createP('Your name!');
  nameP.position(10,40);
}

function draw() {
  //slider
  var freq = slider.value();
  
  //input
  fill(255);
  text(nameInput.value(), 10, 20);
  
  blendMode(BLEND);
  
  if(bgcolor == 0) {
    background(255);
    blendMode(MULTIPLY);
  } else {
    background(0);
    blendMode(SCREEN);
  }
  noFill();
  strokeWeight(20);
  for(var i = 0; i < 3; i++) {
    stroke(colors[i]);
    beginShape();
    for(var w = -20; w < width + 20; w += 5) {
      var h = height / 2;
      h += freq * sin(w * 0.03 + frameCount * 0.07 + i * TWO_PI / 3) * w * 0.001 + frameCount * 0.02, 5;
      curveVertex(w, h);
    }    
    endShape();
  }
  
}

function changeColor() {
  if(bgcolor == 0) {
    bgcolor = 1;
  } else {
    bgcolor = 0;
  }
}

function updateText() {
  nameP.html(nameInput.value());
}var colors;
var freq;
var bgcolor;
var slider;
var nameInput;
var nameP;

function setup() {
  createCanvas(600, 400);
  
  colors = [
    color(80, 150, 255),
    color(255, 50, 50),
    color(0,255,255)
  ];
  
  freq = 300;
  
  //slider
  slider = createSlider(0, 255, 100);
  slider.position(10, 100);
  slider.style('width', '80px');
  
  //button
  button = createButton("change background");
  button.mousePressed(changeColor);
  
  //input
  nameInput = createInput('type your name');
  nameInput.changed(updateText);
  
  //inputted
  nameP = createP('Your name!');
  nameP.position(10,40);
}

function draw() {
  //slider
  var freq = slider.value();
  
  //input
  fill(255);
  text(nameInput.value(), 10, 20);
  
  blendMode(BLEND);
  
  if(bgcolor == 0) {
    background(255);
    blendMode(MULTIPLY);
  } else {
    background(0);
    blendMode(SCREEN);
  }
  noFill();
  strokeWeight(20);
  for(var i = 0; i < 3; i++) {
    stroke(colors[i]);
    beginShape();
    for(var w = -20; w < width + 20; w += 5) {
      var h = height / 2;
      h += freq * sin(w * 0.03 + frameCount * 0.07 + i * TWO_PI / 3) * w * 0.001 + frameCount * 0.02, 5;
      curveVertex(w, h);
    }    
    endShape();
  }
  
}

function changeColor() {
  if(bgcolor == 0) {
    bgcolor = 1;
  } else {
    bgcolor = 0;
  }
}

function updateText() {
  nameP.html(nameInput.value());
}var colors;
var bgcolor;
var f;
var slider;

function setup() {
  createCanvas(600,400);
  colors = [color(80, 150, 255), color(255, 50, 50), color(0,255,255)];
  bgcolor = 0;
  f = 300; 
  
  //slider
  slider = createSlider(0, 255, 100);
  slider.position(10, 10);
  slider.style('width', '80px');
  
  //button
  button = createButton("change background");
  button.mousePressed(changeColor);
  
  /
}

function draw() {
  //slider
  var f = slider.value();
  background(bgcolor);
  
  //blendmode
  blendMode(BLEND);
  
  if(bgcolor == 0) {
    background(255);
    blendMode(MULTIPLY);
  } else {
    background(0);
    blendMode(SCREEN);
  }
  noFill();
  strokeWeight(20);
  for(var i = 0; i < 3; i++) {
    stroke(colors[i]);
    beginShape();
    for(var w = -20; w < width + 20; w += 5) {
      var h = height / 2;
      h += f * cos(w * 0.03 + frameCount * 0.08 + i * TWO_PI / 3) * w * 0.001 + frameCount * 0.02, 5;
      curveVertex(w, h);
    }    
    endShape();
  }
  

}

function keyPressed() {
  if( f >= 0) {
  f = random(0,500);
  } else {
    f = 300;
  }
}

function changeColor() {
  // bgcolor = color(random(0,255));
  if(bgcolor == 0) {
    bgcolor = 1;
  } else {
    bgcolor = 0;
  }
}
  

var colors;
var bgcolor;
var f;
var slider;

function setup() {
  createCanvas(600,400);
  colors = [color(80, 150, 255), color(255, 50, 50), color(0,255,255)];
  bgcolor = 0;
  f = 300; 
  
  //slider
  slider = createSlider(0, 255, 100);
  slider.position(10, 10);
  slider.style('width', '80px');
  
  //button
  button = createButton("change background");
  button.mousePressed(changeColor);
  
  /
}

function draw() {
  //slider
  var f = slider.value();
  background(bgcolor);
  
  //blendmode
  blendMode(BLEND);
  
  if(bgcolor == 0) {
    background(255);
    blendMode(MULTIPLY);
  } else {
    background(0);
    blendMode(SCREEN);
  }
  noFill();
  strokeWeight(20);
  for(var i = 0; i < 3; i++) {
    stroke(colors[i]);
    beginShape();
    for(var w = -20; w < width + 20; w += 5) {
      var h = height / 2;
      h += f * cos(w * 0.03 + frameCount * 0.08 + i * TWO_PI / 3) * w * 0.001 + frameCount * 0.02, 5;
      curveVertex(w, h);
    }    
    endShape();
  }
  

}

function keyPressed() {
  if( f >= 0) {
  f = random(0,500);
  } else {
    f = 300;
  }
}

function changeColor() {
  // bgcolor = color(random(0,255));
  if(bgcolor == 0) {
    bgcolor = 1;
  } else {
    bgcolor = 0;
  }
}
  var colors;
var a;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  colors = [
    color(255, 0, 0),
    color(0, 255, 0),
    color(0, 0, 255)
  ];
  
  a = 0;
}

function draw() {
  blendMode(BLEND);
  
  if(a == 0) {
    background(255);
    blendMode(EXCLUSION);
  } else {
    background(0);
    blendMode(SCREEN);
  }
  noFill();
  strokeWeight(20);
  for(var i = 0; i < 3; i++) {
    stroke(colors[i]);
    beginShape();
    for(var w = -20; w < width + 20; w += 5) {
      var h = height / 2;
      h += 200 * sin(w * 0.03 + frameCount * 0.07 + i * TWO_PI / 3) * pow(abs(sin(w * 0.001 + frameCount * 0.02)), 5);
      curveVertex(w, h);
    }    
    endShape();
  }
  
}

function mousePressed() {
  if(a == 0) {
    a = 1;
  } else {
    a = 0;
  }
}var serial,x;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1421';  // fill in your serial port name here

function setup() {
  background(255);
  createCanvas(500,500);
  
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  //serial.on('list', printList);  // set a callback function for the serialport list event
 // serial.on('connected', serverConnected); // callback for connecting to the server
  //serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
 // serial.on('error', serialError);    // callback for errors
 // serial.on('close', portClose);      // callback for the port closing
 
  //serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
}

function draw(){
	fill(255,87,51);
  ellipse(x,200,100,100);
}


function serialEvent() {
 let inData = serial.readLine();
  if (inData > 0){
    //console.log("Incoming serial data:" + InData);
    //var x = split(InData,',');
    print(inData);
    x = int(inData); 
  }
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
}

function serialEvent() {
 // read a byte from the serial port:
 var inByte = serial.read();
 // store it in a global variable:
 inData = inByte;
}
 
function serialError(err) {
  println('Something went wrong with the serial port. ' + err);
}

function draw() {
 // black background, white text:
 background(0);
 fill(255);
 // display the incoming serial data as a string:
 text("incoming value: " + inData, 30, 30);
}

function mouseDragged() {
 // map the mouseY to a range from 0 to 255:
 outByte = int(map(mouseY, 0, height, 0, 255));
 // send it out the serial port:
 serial.write(outByte);
}

function keyPressed() {
 if (key >=0 && key <=9) { // if the user presses 0 through 9
 outByte = byte(key * 25); // map the key to a range from 0 to 225
 }
 serial.write(outByte); // send it out the serial port
}
var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1421'; // fill in your serial port name here
var inData;                            // for incoming serial data
var outByte = 0;                       // for outgoing data
 
function setup() {
 createCanvas(400, 300);          // make the canvas
 serial = new p5.SerialPort();    // make a new instance of the serialport library
 serial.on('data', serialEvent);  // callback for when new data arrives
 serial.on('error', serialError); // callback for errors
 serial.open(portName);           // open a serial port
}

function serialEvent() {
 // read a byte from the serial port:
 var inByte = serial.read();
 // store it in a global variable:
 inData = inByte;
}
 
function serialError(err) {
  println('Something went wrong with the serial port. ' + err);
}

function draw() {
 // black background, white text:
 background(0);
 fill(255);
 // display the incoming serial data as a string:
 text("incoming value: " + inData, 30, 30);
}

function mouseDragged() {
 // map the mouseY to a range from 0 to 255:
 outByte = int(map(mouseY, 0, height, 0, 255));
 // send it out the serial port:
 serial.write(outByte);
}

function keyPressed() {
 if (key >=0 && key <=9) { // if the user presses 0 through 9
 outByte = byte(key * 25); // map the key to a range from 0 to 225
 }
 serial.write(outByte); // send it out the serial port
}
var serial,x;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1421';  // fill in your serial port name here


function setup() {
  background(255);
  createCanvas(500,500);
  
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  //serial.on('list', printList);  // set a callback function for the serialport list event
 // serial.on('connected', serverConnected); // callback for connecting to the server
  //serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
 // serial.on('error', serialError);    // callback for errors
 // serial.on('close', portClose);      // callback for the port closing
 
  //serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
}

function draw(){
	fill(255,87,51);
  ellipse(x,200,100,100);
}




function serialEvent() {
 let inData = serial.readLine();
  if (inData > 0){
    //console.log("Incoming serial data:" + InData);
    //var x = split(InData,',');
    print(inData);
    x = int(inData); 
  }
}function setup() { 
  createCanvas(200, 200);
  // createP('Random number:' + random(100));
  let button = createButton('hello');
  button.style('font-size','30pt');
  button.mousePressed(changeBG);
  createSlider(0,255,100);
  createCheckbox('on or off');
  let numP = createP('Random number:' + random(100));
  numP.mouseOver(paragraphChange);
  numP.style('background-color','pink');
} 

function draw() { 
  background(220);
}

function changeBG(){
  background(random(255));
}

function paragraphChange(){
  numP.style('font
}let img;
let lily = [];
let ripples = [];

function setup() {
  createCanvas(500,500);
  img = loadImage("pond2.jpg");
  
    for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(30,100);
  }
}

function keyPressed() {
  lily.splice(0, 1);    
}

function draw() {
  image(img, 0, 0, width, height);
  
  for (var i = 0; i < ripples.length; i++) {
  ripples[i].display();
  }

  for (var o = 0; o < lily.length; o++) {
  lily[o].display();
  }
	
}

function mouseDragged() {
	var b = new Ripples(mouseX+20,mouseY-20,random(10,100));
  ripples.push(b);
}

function mouseClicked() {
	var m = new Lily(mouseX,mouseY,random(10,100));
  lily.push(m);
}let img;
let lily = [];
let ripples = [];

function setup() {
  createCanvas(500,500);
  img = loadImage("pond2.jpg");
  
    for (let i = 0; i < 10; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(30,100);
  }
}

function keyPressed() {
  lily.splice(0, 1);    
}


function mouseDragged() {
	var b = new Ripples(mouseX+20,mouseY-20,random(10,100));
  ripples.push(b);
}

function mousePressed() {
	var m = new Lily(mouseX,mouseY,random(40,100));
  lily.push(m);
}

function draw() {
  image(img, 0, 0, width, height);
  
  for (var i = 0; i < ripples.length; i++) {
  ripples[i].display();
  }
  
  for (var o = 0; o < lily.length; o++) {
  lily[o].display();
	lily[o].update();
  }
	
}var mover = [];

function setup() { 
  createCanvas(500, 500);
  //  image(img,0,0);
} 

function draw() { 
  background(220);

}let img = [];
let lily = [];

function preload(){
	img[0] = loadImage("images/pond.jpg");
}

function setup() {
  createCanvas(500,500);
}

function mousePressed() {
  var b = new Lilypad(mouseX, mouseY);
  lily.push(b);
}

function draw() {
  background(255);
  
  for(var i = 0; i < lily.length; i++){
  lily[i].display();
	}
  
  if(lily.length > 500){
    lily.splice(0,5);
  }
}

function mousePressed() {
  for(var i = 0; i <5; i++){
  lily.push(new Lilypad(mouseX + random(-10,0), mouseY + random(-10,0)));
  }
}var img;

function preload(){
img = loadImage('
}

function setup() {
  createCanvas(600,600);
  background(
}

function draw(){
}var img;

function preload(){
img = loadImage('
}

function setup() {
  createCanvas(600,600);
  background(
}

function draw(){
}var bouncers = [];

function setup(){
  createCanvas(600,400);
  for (let i = 0; i < 2; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(12,32);
    bouncers.push(new Bubbles(x,y,r));
  }
}

function draw(){
  background(0);
  
  for(var i = 0; i < bouncers.length; i++){
  bouncers[i].display();
  }
  
  if(bouncers.length > 50){
    bouncers.splice(0,1);
  }
}


function mousePressed(x,y){
var b = new Bubbles(mouseX,mouseY,32);
  bouncers.push(b)
}var nums = [100,25,46,72];


function setup() { 
  createCanvas(500, 400);
} 

function draw() { 
  background(0);
  
  for(var i = 0; i < 4; i++){
  stroke(255);
  noFill();
  ellipse(i * 100 + 100, 200, nums[i], nums[i]);
  }
  
  // ellipse(100, 200, nums[0], nums[0]);
  // ellipse(200, 200, nums[1], nums[1]);
  // ellipse(300, 200, nums[2], nums[2]);
  // ellipse(400, 200, nums[3], nums[3]);
}let words = ["love", "hate", "confused", "amazed"]

let index = 0;

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  
  fill(random(255),random(255),random(255));
  textSize(40);
  text(words[index], 100, 200);
  
}

function mousePressed(){
  index = index + 1; //click and becomes next variable
  
  if(index == words.length){
    index = 0;
  }
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
// Bouncing ball

let gravity = 0.1;
let bouncer1;
let bouncer2;
let bouncers = [];

function setup() { 
  createCanvas(400, 400);
  bouncer1 = new ball(100);  
  bouncer2 = new ball(50);
} 

function draw() { 
  background(220);
	bouncer1.move();
  bouncer1.show();
  bouncer2.move();
  bouncer2.show();
  
}
// Bouncing ball
//no objects

/

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  fill(0);
  ellipse(x,y,24,24);
  
  y = y + speed;
  speed = speed + gravity;
  if (y > height) {
    y = height;
    speed = -0.95*speed;
  }
}let x;
let img;
var ball = {
  x: 200,
  y: 30,
  speed: 0
}

var gravity = 0.1;

function preload(){
  img = loadImage ('gradient.jpg');
}

function setup() { 
  createCanvas(600, 320);
  image(img,0,0);
} 

function displayBall() {
  fill(255);
  noStroke();
  ellipse(ball.x, ball.y, 24, 24);
  ellipse(ball.x+40, ball.y, 40, 40);
  ellipse(ball.x+110, ball.y, 80, 80);
}

function moveBall() {
  ball.y = ball.y + ball.speed;
  ball.speed = ball.speed + gravity;
}

function bounceBall() {
  if (ball.y > height) {
    ball.speed = ball.speed * -0.95;
  }
}

function draw() { 
  image(img,0,0);
  displayBall();
  moveBall();
  bounceBall();

}let x;
let img

function preload(){
  img = loadImage ('gradient.jpg');
}

function setup() { 
  createCanvas(600, 300);
    image(img,0,0);

} 

function mousePressed(){
}

function draw() { 
}function setup() { 
  createCanvas(600, 400);
  ellipseMode(RADIUS);

  display();
  
  fill(255);
  text("Your waiting number for...", 10, 20);
  waitNumber(100,20);
  text("Next!", 10, 60);

} 

function draw() { 


  //ramen
  drawNoodles(50,50,0,40);
  drawNoodles(80,50,50,30);
  drawNoodles(100,10,40,20);
  drawNoodles(110,-30,40,40);
  
}

function display(){ //background
  background(153,0,0);
  noStroke();
  fill(204,0,0);
  ellipse(420,200,400);
  
}

function drawNoodles (x,y,bowlHeight,noodleHeight){ //ramen
  
  let radius = 30;
  let ny = y - bowlHeight - noodleHeight - radius;
  
  //chopstick
  translate(x,y);
  stroke(230,115,0);
  strokeWeight(4);
  line(x+4,y,x+70,y-10);
	line(x+6,y+10,x+70,y+20);

  //noodles
  stroke(255,230,128);
  strokeWeight(3);
  line(x+20,y,x+20,y+80+noodleHeight);
	line(x+30,y-4,x+30,y+150+noodleHeight);
  line(x+40,y-5,x+40,y+50+noodleHeight);
  line(x+50,y-6,x+50,y+159+noodleHeight);
  noFill();
  
  //bowl
  fill(255);
  noStroke();
  ellipse(x+35,y+190,33,20);
  fill(255);
  noStroke();
	rect(x,y+190,70,ny);
  stroke(204,0,0);
  line(x,y+190,x+75,y+190);

}

function waitNumber(numSides,y){
  var d = 1 + int(random(numSides));
  text("1 - 4 people..." + d, 10, y+20);
}
function setup() { 
  createCanvas(600, 400);
  ellipseMode(RADIUS);
} 

function draw() { 
  background(153,0,0);
  
  //background
  display();
  
  //Seats
  text('
  
  //ramen
  drawNoodles(50,50,0,40);
  drawNoodles(80,50,50,30);
  drawNoodles(100,10,40,20);
  drawNoodles(110,-30,40,40);
  
}

function display(){ //background
  
  noStroke();
  fill(204,0,0);
  ellipse(420,200,400);
  
}

function drawNoodles (x,y,bowlHeight,noodleHeight){ //ramen
  
  let radius = 30;
  let ny = y - bowlHeight - noodleHeight - radius;
  
  //chopstick
  translate(x,y);
  stroke(230,115,0);
  strokeWeight(4);
  line(x+4,y,x+70,y-10);
	line(x+6,y+10,x+70,y+20);

  //noodles
  stroke(255,230,128);
  strokeWeight(3);
  line(x+20,y,x+20,y+80+noodleHeight);
	line(x+30,y-4,x+30,y+150+noodleHeight);
  line(x+40,y-5,x+40,y+50+noodleHeight);
  line(x+50,y-6,x+50,y+159+noodleHeight);
  noFill();
  
  //bowl
  fill(255);
  noStroke();
  ellipse(x+35,y+190,33,20);
  fill(255);
  noStroke();
	rect(x,y+190,70,ny);
  stroke(204,0,0);
  line(x,y+190,x+75,y+190);

}
function setup() { 
  createCanvas(600, 400);
  ellipseMode(RADIUS);
} 

function draw() { 
  background(153,0,0);
  noStroke();
  fill(204,0,0);
  ellipse(420,200,400);
  drawNoodles(50,50,0,40);
  drawNoodles(80,0,20,30);
  drawNoodles(100,40,30,20);
  drawNoodles(120,5,40,40);
  
}

function drawNoodles (x,y,bowlHeight,noodleHeight){
  
  let radius = 30;
  let ny = y - bowlHeight - noodleHeight - radius;
  
  //chopstick
  translate(x,y);
  stroke(230,115,0);
  strokeWeight(4);
  line(x+4,y,x+70,y-10);
	line(x+6,y+10,x+70,y+20);

  //noodles
  stroke(255,230,128);
  strokeWeight(3);
  line(x+20,y,x+20,y+80+noodleHeight);
	line(x+30,y-4,x+30,y+150+noodleHeight);
  line(x+40,y-5,x+40,y+130+noodleHeight);
  line(x+50,y-6,x+50,y+159+noodleHeight);
  noFill();
  
    //bowl
  fill(255);
  noStroke();
  ellipse(x+35,y+190,33,20);
  fill(255);
  ／／noStroke();
	rect(x,y+190,70,ny);
  stroke(204,0,0);
  line(x,y+190,x+75,y+190);

}function setup() { 
  createCanvas(600, 400);
  ellipseMode(RADIUS);
} 

function draw() { 
  background(153,0,0);
  noStroke();
  fill(204,0,0);
  ellipse(450,200,400);
  drawNoodles(50,50,100,300);
	drawNoodles(200,30,100,300);
  
}

function drawNoodles (x,y,chopstickHeight,noodleHeight){
  
  let radius = 45;
  let ny = y - chopstickHeight - noodleHeight - radius;
  
  //chopstick
  stroke(230,115,0);
  strokeWeight(4);
  line(x+4,y,x+70,y-10);
	line(x+6,y+10,x+70,y+20);

  //bowl
  noStroke();
  fill(255);
  arc(x+35, y+170,x+10,y+10, 0, PI);
  fill(200);
  ellipse(x+35,y+170,x+10,y-30);
  fill(255,195,77);
  ellipse(x+35,y+170,x+2,y-35);
  
  //noodles
  stroke(255,230,128);
  strokeWeight(3);
  line(x+20,y+10,x+20,y+80);
	line(x+30,y+12,x+30,y+170);
  line(x+40,y+12,x+40,y+130);
  line(x+50,y+15,x+50,y+170);
  noFill();
  arc(x+20,y+179,x+5,y-35,PI+QUARTER_PI,TWO_PI);
  arc(x+20,y+181,x+1,y-40,PI+QUARTER_PI,TWO_PI);

  

}function setup() { 
  createCanvas(600, 400);
  ellipseMode(RADIUS);
} 

function draw() { 
  background(153,0,0);
  noStroke();
  fill(204,0,0);
  ellipse(450,200,400);
  drawNoodles(0,0,0,0);
  drawNoodles(100,100,0,0);



}

function drawNoodles (x,y,chopstickHeight,noodleHeight){
  
  let radius = 30;
  let ny = y - chopstickHeight - noodleHeight - radius;
  
  //chopstick
  stroke(230,115,0);
  strokeWeight(4);
  line(x+4,y,x+70,y-10);
	line(x+6,y+10,x+70,y+20);

  //bowl
  push();
  translate(x,y);
  noStroke();
  fill(255);
  arc(40,170,x+50,y+50, 0, PI);
  fill(200);
  ellipse(40,170,x+50,y+20);
  fill(255,195,77);
  ellipse(40,170,x+40,y+15);
  pop();
  
  //noodles
  stroke(255,230,128);
  strokeWeight(3);
  line(x+20,y+10,x+20,y+80);
	line(x+30,y+12,x+30,y+170);
  line(x+40,y+12,x+40,y+130);
  line(x+50,y+15,x+50,y+170);
  noFill();
  arc(x+35,y+170,x+40,y+10,PI+QUARTER_PI,TWO_PI);
  arc(x+35,y+180,x+30,y+10,PI+QUARTER_PI,TWO_PI);

}var ball = {
  x: 100,
  y: 180,
  xspeed: 5,
  yspeed: 2,
  display:function display() {
  ellipse(this.x, this.y, r*2, r*2);
},
  move:function move() {
  this.x += this.xspeed;
  this.y += this.yspeed;
},
  bounce:function bounce() {
  if (this.x > width - r || this.x < r) {
    this.xspeed = -this.xspeed;
  }
  if (this.y > height - r || this.y < r) {
    this.yspeed = -this.yspeed;
  }
}
	
};

var r = 10;

function setup() {
  createCanvas(200, 200);
}

function draw() {
  background(0);
  ball.display();
  ball.move();
  ball.bounce();
}function setup() {
  createCanvas(200, 200);
  background(255);
  text('Temperature in °C: 25', 0, 50);
  var temp = CtoF(25);
  text('Temperature in °F: ' + temp, 0, 100);
}

function CtoF(cel) {
  var fa = (cel*1.8)+32;
  return fa;
}function setup() {
  createCanvas(200, 200);
  background(255);
  noStroke();
  colorMode(HSB, 255);
  
  for (let x = 1; x <= 3; x++) {
    iceCream(width/6*x+20, height/2, random(20,40));
  }
}

function iceCream(x, y, diameter) {
  fill(random(360), 112, 331);
  arc(x, y, diameter, diameter, -PI, 0);
  fill('#d7c38e');
  triangle(x - diameter / 2, y + 5, x + diameter / 2, y + 5, x, y + diameter * 1.3);
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  
  for ( let x = 0; 
}var x;
var y;
var z = 1;
var t = 1;
var counter = 0;


function setup() { 
  createCanvas(400, 400);
} 

function draw() {
	
	//create slider tie to mouseY
  //background(200)
  stroke(120, 180, 230, 20)
  rect(370, 50, 15, 300);
  var y1 = map(mouseY, 0, height, 45, height-100);
  fill(0,100,220,40);
  //line(30,100, 30, 300);
  rect(370,y1,15,10);
	
  counter ++;
  //create slider tie to mouseY
  if (counter > 2*t){
  background(80, 130, 230, random(1))
  }
  push();
  //stroke(120, 180, 230, 20)
  noStroke();
  fill(255, 100)
  //rect(width/2 - 7.5, 50, 15, 300);
  fill(mouseY / 0.7, 25)
  //rect(width/2 - 7.5, 50, 15, 300);
  var y1 = map(mouseY, 0, height, 45, height-100);
  //fill(255, 20);
  //line(30,100, 30, 300);
  noFill();
  //stroke(255, 10*t)
  if (x == width/4 || y == height/4){
  console.log("yo");
  z = random(1);
  t = random(1);
  }
  if (x <= width && y > height/2){
    //noStroke();
    //strokeWeight(1);
    stroke(120, 180, 230, 30)
    //stroke(130, 220, 230)
    fill( 255, 255/x+30)
    //fill( 255, 220, 200/ x*(y))
    //upper half
    triangle(x + 20, y*z, y, x*z, x/2, x);
    triangle(width -x*t, y/z, height, x*t, x/2*t,x/t);
    //rotated upper half
    //triangle(width -x, height -y, x, x*1, width + x/2, width + x);
    //triangle(width, height, 0, x, x/2,x);
    //lower half
    triangle(width - x, height - y*z, height - y, width - x*z, width - x/2, width - x);
    triangle(0 + x*t, height-y/z, 0, width - x*t, width - x/2*t,width - x/t);
    //rotated lower half
    //triangle(width - (x + 20), height - x, height - x, width - x, width - x/2, width - x);
    //triangle(0, height, 0, width - x, width - x/2,width - x);
    x+= 1*y1/100
  }
    else if (x <= width && y <= height){
      x += x*t;
    	//x -= 2;
      y += 100
    }
    else{
    	background(255, 10);
      x = 0;
      y = 0;
    }
  //background(220); 

}var x;
var y;
var z;


function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  //create slider tie to mouseY
  //background(200)
  stroke(120, 180, 230, 20)
  rect(370, 50, 15, 300);
  var y1 = map(mouseY, 0, height, 45, height-100);
  fill(0,100,220,40);
  //line(30,100, 30, 300);
  rect(370,y1,15,10);
  
  if (random(1) > 0.){
    if (x < width && y > height /2 ){
      //noStroke();
      //strokeWeight(1);
      stroke(120, 180, 230, 30)
      //stroke(130, 220, 230)
      fill( 255, 255/x+30)
      //fill( 255, 220, 200/ x*(y))
      //upper half
      triangle(x + 20, y, y, x, x/2, x);
      triangle(width, 0, height, x, x/2,x);
      //rotated upper half
      //triangle(x + 20, height - y, x, x, x/2, x);
      //triangle(width, height, 0, x, x/2,x);
      //lower half
      triangle(width - (x + 20), height - y, height - y, width - x, width - x/2, width - x);
      triangle(0, height, 0, width - x, width - x/2,width - x);
      //rotated lower half
      //triangle(width - (x + 20), height - x, height - x, width - x, width - x/2, width - x);
      //triangle(0, height, 0, width - x, width - x/2,width - x);
      x+= 1*y1/100
    }
    else if (y < height){
      x = 0;
    	//x -= 2;
      y += 10;
    }
    else{
    	background(255, 10);
      x = -20;
      y = 0;
    }
    
  }
  //background(220); 

}var x;
var y;
var z;


function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  //create slider tie to mouseY
  //background(200)
  rect(15, 50, 15, 250);
  var y1 = map(mouseY, 0, height, 45, 245);
  fill(230);
  line(30,100, 30, 300);
  rect(15,y1,15,10);
  
  if (random(1) > 0.){
    if (x < width && y > height /2 ){
      //noStroke();
      stroke(120, 180, 230, 30)
      //stroke(130, 220, 230)
      fill( 255, 255/x+30)
      //fill( 255, 220, 200/ x*(y))
      //upper half
      triangle(x + 20, y, y, x, x/2, x);
      triangle(width, 0, height, x, x/2,x);
      //rotated upper half
      //triangle(x + 20, height - y, x, x, x/2, x);
      //triangle(width, height, 0, x, x/2,x);
      //lower half
      triangle(width - (x + 20), height - y, height - y, width - x, width - x/2, width - x);
      triangle(0, height, 0, width - x, width - x/2,width - x);
      //rotated lower half
      //triangle(width - (x + 20), height - x, height - x, width - x, width - x/2, width - x);
      //triangle(0, height, 0, width - x, width - x/2,width - x);
      x+= 1*y1/100
    }
    else if (y < height){
      x = 0;
    	//x -= 2;
      y += 10;
    }
    else{
    	background(255, 10);
      x = -20;
      y = 0;
    }
    
  }
  //background(220); 

}let y = 0;
let speed=1;
let gravity=0.2;

function setup() { 
  createCanvas(400, 400);
} 

function draw(){ 
  background(220);
  ellipse(200,y,20,20);
  y=y+speed;
  speed=speed+gravity;
  
  if(y>400){
  //reverse the speed
    speed=-0.95 * speed;
  }
  

}let y = 0;
let speed=5;
let gravity=0.1;

function setup() { 
  createCanvas(400, 400);
} 

function draw(){ 
  background(220);
  ellipse(200,y,20,20);
  
  y=y+speed;
  speed=speed+gravity;
  
  if(y>400){
  //reverse the speed
    speed=-0.95*speed;
  }
  
  \\if(y>400){
    speed = -5;
  }
  if (y<0){
    speed = 5;
  }
}var col={
  r:0,
  g:0,
  b:0
};

let Moon = 120;
let spot={
  x:0,
  y:0
};


function setup() { 
  createCanvas(500, 500);
  frameRate(10);
} 

  
function draw() { 
  
  //backgroundSky
  r=map(mouseX,0,500,300,50);
  g=map(mouseX,0,500,255,80);
  b=map(mouseX,0,500,300,200);
  background(r,g,b);
  
  
  
  //stars
  spot.x=random(0,width);
  spot.y=random(0,height);
  comets=random(10,30);
  speed=3
  fill(255,255,255,100);
  noStroke();
  star(spot.x, spot.y, 20, 50, 5); 
  star(spot.x+150, spot.y-200, 20, 50, 5);
  star(spot.x-300, spot.y-150, 20, 50, 5); 
  star(spot.x+400, spot.y-300, 20, 50, 5);
   if (spot.y>height-100){
    speed=5;
  }
  spot.y= spot.y+speed
  
  
  //Moon
  ellipseMode(CENTER);
  noStroke();
  fill(255);
	ellipse(mouseX,mouseY,255);
  fill(200);
  ellipse(mouseX+60,mouseY-5,Moon);
   fill(200);
  ellipse(mouseX-10,mouseY+50,30,20);
  
  //click
  if(mouseIsPressed){
   noStroke();
  fill("#ffdb00");
	ellipse(mouseX,mouseY,255);
  }  
}

function star(x, y, radius1, radius2, npoints) {
  var angle = TWO_PI / npoints;
  var halfAngle = angle/2.0;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius2;
    var sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a+halfAngle) * radius1;
    sy = y + sin(a+halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);

}function setup() {
  createCanvas(200, 150);
  ellipseMode(CENTER);
}
function draw(){
  background(0,255,255);
  
  //line
  fill(255,0,0);
  stroke(255,0,0);
  strokeWeight(20);
  line(0,0,200,150);
  
  //ellipse
  noStroke();
  fill(0,255,0);
  ellipse(100,75,100,70);
  
  //square
  fill(0,0,255);
  rect(130,60,20,20);
}function setup() {
  createCanvas(200, 200);
}
function draw(){
  background(0,0,0);
  
  //red
  fill(217,35,20);
  rect(50,0,150,145);
  
  //blue
  fill(0,91,158);
  rect(0,151,42,49);
  
  //yellow
  fill(237,220,104);
  rect(185,181,16,20);
  
  //white 1
  fill(255,255,255);
  rect(0,0,42,61);
  
  //white 2
  fill(255,255,255);
  rect(0,73,42,72);
  
  //white 3
  fill(255,255,255);
  rect(49,151,129,49);
  
  //white 4
  fill(255,255,255);
  rect(184,151,17,20);
  
}function setup() { 
  createCanvas(400,320);
  ellipseMode(CENTER);
  rectMode(CENTER);
} 

function draw() { 
  background(255);
  
  //hands
  fill(243,165,170);
	stroke(0,0,0);
  strokeWeight(3);
  bezier(291,122,361,155,325,199,293,171);
  bezier(101,126,67,121,23,194,95,180);

  //foot
  fill(224,0,91);
	stroke(0,0,0);
  strokeWeight(3);
  bezier(280,198,416,254,309,282,233,246);
	bezier(105,201,11,224,35,286,155,247);
  
  //face
  fill(243,165,170);
	stroke(0,0,0);
  strokeWeight(3);
	ellipse(194,151,208,208);
  
  //cheeks
  fill(235,104,150);
	noStroke();
  ellipse(251,148,26,16);
	ellipse(137,149,26,15);
  
  //mouth
  noFill();
	stroke(0,0,0);
	arc(195,130,50 ,70, 0.75, 0.75*Math.PI);
  
  //eyes
  fill(0,118,192);
	stroke(0,0,0);
  strokeWeight(3);
  ellipse(163,107,16,54);
	ellipse(227,107,16,54);
  
  fill(0,0,0);
	stroke(0,0,0);
  strokeWeight(3);
  ellipse(163,100,16,40);
	ellipse(227,100,16,40);
  
  fill(255,255,255);
stroke(0,0,0);
  strokeWeight(2);
  ellipse(163,95,16,25);
ellipse(227,95,16,25);

}