let knn;
let video;
let buttonA;
let buttonB;
let guessButton;

function preload() {
	knn = new p5ml.KNNImageClassifier(modelloaded, 2, 1);
	// knn.addImage(video,index);
	// knn.predict(video, callback);

}

function modelloaded() {
	console.log('loaded');
}

function setup() { 
  createCanvas(320, 240).parent('canvasContainer'); //.parent inserts canvas into the div #canvasContainer
  video = createCapture(VIDEO);
  background(0);
  video.size(227,227);
  video.hide();



	buttonA = select('#buttonA');
	buttonB = select('#buttonB');
	guessButton = select('#buttonPredict');

	buttonA.mousePressed(() => {
		train(1);
	});

	buttonB.mousePressed(() => {
		train(2);
	});

	guessButton.mousePressed(() => {
		predict();
	});
} 

function predict() {
	knn.predict();
}

function gotResult(res) {
	// if(res.classIndex) {
	console.log(res);
	// }
}

function train(index) {
	knn.addImage(video.elt, index);
}

function draw() { 
  background(0);
  image(video, 0, 0, width, height);
}// binaural beats from 10hz (resting state) to 50hz (gamma) in 10800 frames (3 mins)
		// 1 hz per 270 frames
// then 50hz to 25hz in 3600 frames (1 min)
		// 1hz per 144 frames

var osc;
var osc2;
var oscTone2;

function setup() { 
  createCanvas(400, 400);
  
  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.freq(150);
  osc.amp(0.5, 0.5);
  osc.pan(-1,0);
  osc.start();

  oscTone2 = 150;

  osc2 = new p5.Oscillator();
  osc2.setType('sine');
  osc2.freq(oscTone2);
  osc2.amp(0.5,0.5);
  osc2.pan(1,0);
  osc2.start();
} 

function draw() { 
  background(220);
  console.log("frame count: ", frameCount);
  console.log("frame count % 270: ", frameCount % 270);
  
  while (frameCount < 10800) {
    
  	if (frameCount % 270 == 0) {
      oscTone2 += 1;
    }
    
  while (frameCount < 14400 && frameCount >= 10800) {
    if (frameCount % 144 == 0) {
      oscTone2 -= 1;
    }
  }
    
  }
  console.log(frameCount % 14400);
}var serial;
var portName = '/dev/cu.usbmodem1411';
var signalStr;
var attention;
var meditation;
var delta;
var theta;
var lowAlpha;
var highAlpha;
var lowBeta;
var highBeta;
var lowGamma;
var highGamma;
var values;
var deltaArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  serial = new p5.SerialPort();
  serial.open(portName);
  serial.on('data', parseData); // whenever p5 receives data, run callback function parseData



}




function parseData() {
  var inData = serial.readLine();


  if (inData.length > 0) {
    // print(inData);
    values = inData.split(',');

    signalStr = {
      x: frameCount,
      y: int(values[0])
    }

    attention = int(values[1]);
    meditation = int(values[2]);

    delta = {
      // x: (frameCount / 2),
      // x: step * stepSize,
      y: Math.round(map(int(values[3]), 0, 1200000, height, height - height / 4))
    }


    deltaArray.push(delta);
    // let i = deltaArray.length - 1;
    // line(deltaArray[i - 1].x, deltaArray[i - 1].y, deltaArray[i].x, deltaArray[i].y);


    theta = int(values[4]);
    lowAlpha = int(values[5]);
    highAlpha = int(values[6]);
    lowBeta = int(values[7]);
    highBeta = int(values[8]);
    lowGamma = int(values[9]);
    highGamma = int(values[10]);
    // print("signalStr", signalStr);
    // print("delta", delta);
    // print("theta", theta);
    // print("lowAlpha", lowAlpha);
    // print("highAlpha", highAlpha);
  }
}


let stepSize = 10;

function draw() {
  // print(deltaArray);
  background(255, 201, 186);

  //   if (deltaArray.length > 10) {

  //     for (var i = 1; i < deltaArray.length; i++) {
  //       strokeWeight(1);
  //       line(deltaArray[i - 1].x, deltaArray[i - 1].y, deltaArray[i].x, deltaArray[i].y);
  //     }


  //   }else 
  if (deltaArray.length > 1) {

    for (var i = 0; i < deltaArray.length ; i++) {
      strokeWeight(1);
      line(i * stepSize, deltaArray[i].y, (i + 1) * stepSize, deltaArray[i + 1].y);
    }
  }
}var osc;
var playing = false;
var playing2 = false;

var fft;

var dragging = false;
var rollover = false;
var slider_x = 50;
var slider_y = 40;
var slider_w = 10;
var slider_h = 20;
var slider_start = 50;
var slider_end = 350;
var offsetX=0;
var tone;

var dragging2 = false;
var rollover2 = false;
var slider_x2 = 50;
var slider_y2 = 345;
var slider_w2 = 10;
var slider_h2 = 20;
var slider_start2 = 50;
var slider_end2 = 350;
var offsetX2=0;
var tone2;

var tone1Label;
var tone2Label;

function setup() {
  frameRate(200);
  var c = createCanvas(400, 400);
  c.position(0,0);
  c.style("z-index", "-1");
  textAlign(CENTER);

  osc = new p5.Oscillator();
  osc.setType('sine');
  // osc.freq(240);
  osc.amp(0);
  osc.start();
  osc.pan(-1,0);


  osc2 = new p5.Oscillator();
  osc2.setType('sine');
  // osc2.freq(tone2);
  osc2.amp(0);
  osc2.pan(1, 0);

  osc2.start();
  
  fft = new p5.FFT();
  
  tone1Label = select("#first-tone");
  tone2Label = select("#second-tone");

}

function draw() {
  // console.log(mouseY);
  background(220);
  noStroke();
  fill(0);
//   text('play first tone', width / 2, height / 3);

//   text('play second tone', width / 2, height / 1.4);
  
  // var spectrum = fft.analyze();
  // noStroke();
  // fill(0);
  // for (var i = 0; i < spectrum.length; i++){
  //   var g = map(i, 0, spectrum.length, 0, width);
  //   var h = -height + map(spectrum[i], 0, 255, height, 0);
  //   rect(g, height, width/spectrum.length, h);
  // }

  // console.log(spectrum);
  
//   var waveform = fft.waveform();
//   noFill();
//   beginShape();

// 	if (Math.abs(tone - tone2) <= 40) {
//     stroke(0, 255, 0);
//   }
//   else {
//   stroke(255,0,0);
//   }
//   strokeWeight(1);
//   for (var j = 0; j < waveform.length; j++) {
//     var x = map(j, 0, waveform.length, 0, width);
//     var y = map(waveform[j], -1, 1, 0, height);
//     vertex(x,y);
//   }
//   endShape();
  
  
  if(dragging) {
    slider_x = mouseX + offsetX;
  }
  slider_x = constrain(slider_x, slider_start, slider_end - slider_w);
  
  stroke(0);
  line(slider_start, slider_y+slider_h/2, slider_end, slider_y+slider_h/2);
  stroke(0);
  // Fill according to state
  if (dragging) {
    fill (50);
  } else {
    fill(175);
  }
  rect(slider_x, slider_y, slider_w, slider_h);
  
  var tone = map(slider_x, slider_start, slider_end - slider_w, 0, 1500);
  osc.freq(tone);
  
  tone1Label.html("Play first tone at " + Math.round(tone) + " hz.");


  if(dragging2) {
    slider_x2 = mouseX + offsetX2;
  }
  slider_x2 = constrain(slider_x2, slider_start2, slider_end2 - slider_w2);
  
  stroke(0);
  line(slider_start2, slider_y2+slider_h2/2, slider_end2, slider_y2+slider_h2/2);
  stroke(0);
  // Fill according to state
  if (dragging2) {
    fill (50);
  } else {
    fill(175);
  }
  rect(slider_x2, slider_y2, slider_w2, slider_h2);
  
  var tone2 = map(slider_x2, slider_start2, slider_end2 - slider_w2, 0, 1500);
  osc2.freq(tone2);
  tone2Label.html("Play second tone at " + Math.round(tone2) + " hz.");

  var waveform = fft.waveform();
  noFill();
  beginShape();

	if (Math.abs(tone - tone2) <= 40 && tone > 0 && tone2 > 0) {
    stroke(255, 0, 0);
  }
  else {
  stroke(0,0,255);
  }
  strokeWeight(1);
  for (var j = 0; j < waveform.length; j++) {
    var x = map(j, 0, waveform.length, 0, width);
    var y = map(waveform[j], -1, 1, 0, height);
    vertex(x,y);
  }
  endShape();
  
}


function mouseClicked() {
  // if (!playing || !playing2) {
  if (!playing && mouseX > 0 && mouseX < width && mouseY < height / 2 && mouseY > 60) {
      // if (!playing) {
      // ramp amplitude to 0.5 over 0.1 seconds
      osc.amp(0.5, 0.05);
      playing = true;
      backgroundColor = color(0, 255, 255);
    } 
  else if (!playing2 && mouseX > 0 && mouseX < width && mouseY > height / 2 && mouseY < height - 60) {
      osc2.amp(0.5, 0.05);
      playing2 = true;
      backgroundColor = color(0, 255, 255);
    } 
  // }
  else if (playing == true && mouseX > 0 && mouseX < width && mouseY < height / 2 && mouseY > 60) {
      // ramp amplitude to 0 over 0.5 seconds
    	osc.amp(0, 0.5);
    	playing = false;
  }
  else if (playing2 == true && mouseX > 0 && mouseX < width && mouseY > height / 2 && mouseY < height - 60) {
    	osc2.amp(0, 0.5);
   		playing2 = false;
  }
}

function mousePressed() {
	if (mouseX > slider_x && mouseX < slider_x + slider_w && mouseY > slider_y && mouseY < slider_y + slider_h) {
    dragging = true;
    offsetX = slider_x - mouseX;
   }
  else if (mouseX > slider_x2 && mouseX < slider_x2 + slider_w2 && mouseY > slider_y2 && mouseY < slider_y2 + slider_h2) {
    dragging2 = true;
    offsetX2 = slider_x2 - mouseX;
 }
}

function mouseReleased() {
  // Stop dragging
  dragging = false;
  dragging2 = false;
}var imgs = [];

 let topColor = [90, 205, 55];

let bottomColor = [255, 5, 5];

function setup() { 
  var c = createCanvas(530, 530);
  c.position(0,0);
  c.style("z-index","-1");
  
  imgs.push(loadImage("1.png"));
  imgs.push(loadImage("2.png"));
  imgs.push(loadImage("3.png"));
  imgs.push(loadImage("4.png"));
  imgs.push(loadImage("5.png"));
  imgs.push(loadImage("6.png"));
  imgs.push(loadImage("7.png"));
  imgs.push(loadImage("8.png"));
  imgs.push(loadImage("9.png"));
  imgs.push(loadImage("10.png"));
  imgs.push(loadImage("11.png"));
  imgs.push(loadImage("12.png"));
  imgs.push(loadImage("13.png"));
  imgs.push(loadImage("14.png"));
  imgs.push(loadImage("15.png"));
  imgs.push(loadImage("16.png"));
  imgs.push(loadImage("17.png"));
  imgs.push(loadImage("18.png"));


  paragraphs = selectAll('p');
  print(paragraphs.length);
  copy = select("#copy");
  for (var i = 0; i < paragraphs.length; i++) {
    paragraphs[i].hide();
  }
}

let x = 0;
let changeRate = 0.1;


function draw() { 
  // background(220);
  image(imgs[int(x)], 0, 0, width, height);
  /*for( var i = 1; i < imgs.length; i++) {
 		image(imgs[i], 0, 0, width, height);
  
  }*/
  x += changeRate;
  if (x > imgs.length - 1) {
    x = 0;
  }
  //console.log(x);
  
  
    for (var i=0; i<width; i+=50){
				let r = map(i, 0, height,
                    topColor[0],
                    bottomColor[0]);
     		let g = map(i, 0, height,
                    topColor[1],
                    bottomColor[1]);
     		let b = map(i, 0, height,
                    topColor[2],
                    bottomColor[2]);

    		fill(r+205, g-10, b, 10);

				noStroke();
        rect(i,0,width,height);   
    	
      
      for (var j = 0; j < paragraphs.length; j++) {
        paragraphs[j].show();
      }
    
    
    
    }
}var video;
var width;
var height;

function setup() { 
  width = 400;
  height = 400;
  createCanvas(width, height);
  video = createCapture(VIDEO);
  video.hide();
} 

function draw() { 
  background(220);
  
  image(video, 0,0,width, height);
  loadPixels();
  // each pixel has r,g,b,a
  // 
  for (var w=0; w<width; w++) {
    for (var h = 0; h < height; h++) {
      var r = pixels[4*(h*width)+w];
      //pulls out current r value for each pixel, groups of four
      set(w,h, [r,r,r,0]);
    }
  }
  updatePixels();
}var apiKey= "dce2fe3cc3864d1fd60041d17bb898a3";
var dataFeed= "http://datamine.mta.info/mta_esi.php?key=dce2fe3cc3864d1fd60041d17bb898a3";


function setup() { 
  createCanvas(400, 400);

 } 

function draw() { 
  background(220);
}

var ProtoBuf = dcodeIO.ProtoBuf;
var xhr = new XMLHttpRequest();
xhr.open(
/* method */ "GET",
/* file */ "gtfs-",
/* async */ true
);xhr.responseType = "arraybuffer";
var resp = xhr.response;
var builder = ProtoBuf.loadProtoFile("nyct-subway.proto.txt").build("transit_realtime");
//FeedMessage is the “container” object of the entire feed
var msg = builder.FeedMessage.decode(xhr.response);
var jsonMsg = JSON.stringify(msg,null,4);
//prints feed object to the console
console.log(jsonMsg);
//feed will be the object that contains the feed in plain text JSON object.
var feed = JSON.parse(jsonMsg);  	var myMap;
  	var canvas;
  	var mappa = new Mappa('Leaflet') // Google, Mapzen, etc
  	var meteorites;

  	var options = {
  		lat: 0,
  		lng: 0,
  		zoom: 4,
  		style: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
  	}

  	function preload() {
  		meteorites = loadTable('Meteorite_Landings.csv', 'csv', 'header');

  	}

  	function setup() {
  		canvas = createCanvas(640, 640);
  		// background(200);

  		console.log(meteorites);

  		myMap = mappa.tileMap(options);
  		myMap.overlay(canvas);

  		myMap.onChange(drawPoints);
  		fill(70, 203, 31);
  		stroke(100);
  	}

  	function draw() {

  	}

  	function drawPoints() {
  		clear();
  		// var itp = myMap.latLngToPixel(40.729628, -73.993686);
  		// ellipse(itp.x, itp.y, 20, 20);

  		for(var i = 0; i < 500; i++) {
  			var latitude = Number(meteorites.getString(i, 'reclat'));
  			var longitude = Number(meteorites.getString(i, 'reclong'));
  			var pos = myMap.latLngToPixel(latitude, longitude);
  			ellipse(pos.x, pos.y, 20, 20);
  		}
  	}
var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411'; // fill in your serial port name here
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
  print('Something went wrong with the serial port. ' + err);
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

// function keyPressed() {
//  if (key >=0 && key <=9) { // if the user presses 0 through 9
//  outByte = byte(key * 25); // map the key to a range from 0 to 225
//  }
//  serial.write(outByte); // send it out the serial port
// }

function keyPressed() {
 if (key ==='H' || key ==='L') { // if the user presses H or L
 serial.write(key);              // send it out the serial port
 }
}let knn;
let video;
let buttonA;
let buttonB;
let guessButton;
let resultContainer;
let resultP;

function preload() {
	knn = new p5ml.KNNImageClassifier(modelloaded, 2, 1);
	// knn.addImage(video,index);
	// knn.predict(video, callback);

}

function modelloaded() {
	console.log('loaded');
}

function setup() { 
  createCanvas(320, 240).parent('canvasContainer'); //.parent inserts canvas into the div #canvasContainer
  video = createCapture(VIDEO);
  background(0);
  video.size(227,227);
  video.hide();



	buttonA = select('#buttonA');
	buttonB = select('#buttonB');
	guessButton = select('#buttonPredict');

	buttonA.mousePressed(() => {
		train(1);
	});

	buttonB.mousePressed(() => {
		train(2);
	});

	guessButton.mousePressed(() => {
		predict();
	});
} 

function predict() {
	knn.predict(video.elt, gotResult);
}

function gotResult(res) {
	// if(res.classIndex) {
	console.log(res);
	resultContiner = select("#resultContainer");
	resultP = createP("Guess: " + res);
	resultContiner.child(resultP);
	// }
}

function train(index) {
	knn.addImage(video.elt, index);
}

function draw() { 
  background(0);
  image(video, 0, 0, width, height);
}var serial;
var portName = '';

var bg = 0;
var col = 255;
var button = 0;

function setup() {
  createCanvas(400, 400);

  serial = new p5.SerialPort();
  serial.open(portName);
  serial.on('data', parseData); // whenever p5 receives data, run callback function parseData


}

function draw() {
  background(bg);
  
  noStroke();
  fill(col);
  ellipse(200,200,100);
  
}

function parseData() {
  var inData = serial.readLine();

  if (inData.length > 0) {
    var values = inData.split(',');
    
    button = int(values[0]);
    bg = int(values[1]);
    col = int(values[2]);
  }

}var serial;
var inData;
var bg = 0;
var col = 255;
var nums = '';
function setup() { 
  createCanvas(400, 400);
  
  serial = new p5.SerialPort();
  serial.on('list', printList);
  serial.on('data', serialEvent);
	serial.open('/dev/cu.usbmodem1421');
} 

function draw() { 
  background(255);
  // fill(col);
  // noStroke();
  // ellipse(width/2,height/2,100);
  textSize(50);
  text(nums, 100,100);
}

function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 console.log(i + " " + portList[i]);
 }
}

function serialEvent() {
  inData = serial.readLine();
  // print(inData);
  
//   var val1 = int(vals[0]);
//   var val2 = int(vals[1]);
  
  var vals = inData.split(',');
	if (vals.length > 1){
    nums = vals;
    bg = map(val1, 0, 1023, 0, 255);
    col = map(val2, 0, 1023, 0, 255);
//     print(bg + ' ' + col);
  }
}// Declare a "SerialPort" object
var serial;
var latestData = "waiting for data";  // you'll use this to write incoming data to the canvas

function setup() {
  createCanvas(500, 300);

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Get a list the ports available
  // You should have a callback defined to see the results
  serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/cu.usbmodem1411");

  // Here are the callbacks that you can register

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);
  // OR
  //serial.onList(gotList);

  // When we some data from the serial port
  serial.on('data', gotData);
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
  //serial.on('rawdata', gotRawData);
  // OR
  //serial.onRawData(gotRawData);
}

// We are connected and ready to go
function serverConnected() {
  println("Connected to Server");
}

// Got the list of ports
function gotList(thelist) {
  println("List of Serial Ports:");
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    println(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  println("Serial Port is Open");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  println(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readLine();  // read the incoming string
  trim(currentString);                    // remove any trailing whitespace
  if (!currentString) return;             // if the string is empty, do no more
  console.log(currentString);             // println the string
  latestData = currentString;            // save it for the draw method
}

// We got raw from the serial port
function gotRawData(thedata) {
  println("gotRawData" + thedata);
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
  background(255,255,255);
  fill(0,0,0);
  var data = map(latestData, 0, 1023, 0, height);
  ellipse(50, data, 50, 50);
  text(data, 10, 10);
}var marks = [];
var markers = [];

var pen;
var sharpie;

var buttons = [];

var stateRadius;


function setup() {
  createCanvas(600, 600);

  pen = new Marker(mouseX, mouseY, 6, 0);
  markers.push(pen);

  sharpie = new Marker(mouseX, mouseY, 12, 0);
  markers.push(sharpie);

  paintMarker = new Marker(mouseX, mouseY, 24, 0);
  markers.push(paintMarker);

  for (i = 0; i < markers.length; i++) {
    buttons[i] = new Button((i + 1) * 50 + markers[i].radius, 50, markers[i].radius)
  }

}

function draw() {
  background(220);
	strokeWeight(1);

  for (i = 0; i < buttons.length; i++) {
    buttons[i].displayButton();

    if (mouseIsPressed && dist(mouseX, mouseY, buttons[i].x, buttons[i].y) < buttons[i].radius) {
      stateRadius = buttons[i].radius;
      marks = [];
    } else if (mouseIsPressed == false) {
      marks.push(mouseX, mouseY);
    }
  }


  if (stateRadius == sharpie.radius) {
    sharpie.markings();
    sharpie.displayMarkings();
  } else if (stateRadius == pen.radius) {
    pen.markings();
    pen.displayMarkings();
  } else if (stateRadius == paintMarker.radius) {
    paintMarker.markings();
    paintMarker.displayMarkings();
  }


}var coordinates = [];
var pen;

function setup() { 
  createCanvas(600, 600);
  pen = new Marker(mouseX, mouseY, 5, 0);
  
} 

function draw() { 
  background(220);  
  
  
//    if(mouseIsPressed) {
//     var drawing = new Marker(mouseX, mouseY, 2, 0);
//       markings.push(drawing);
//    }
  
// 	for (var i = 0; i < markings.length; i++) {
//     markings[i].mark();
//   }
  
  pen.markings();
  pen.displayMarkings();
  print(coordinates);
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


	
  
var marks = [];
var pen;

function setup() { 
  createCanvas(600, 600);
  pen = new Marker(mouseX, mouseY, 5, 0);
  
} 

function draw() { 
  background(220);  
  
  
//    if(mouseIsPressed) {
//     var drawing = new Marker(mouseX, mouseY, 2, 0);
//       markings.push(drawing);
//    }
  
// 	for (var i = 0; i < markings.length; i++) {
//     markings[i].mark();
//   }
  
  pen.markings();
  pen.displayMarkings();
}class Rectangle {
  constructor(_x, _y, _w, _h, _angle){
  	this.x = _x;
  	this.y = _y;
  	this.w = _w;
  	this.angle = _angle;
  }
  displayRect() {
    push();
    fill(0,0,0);
    translate(this.w, this.y);
    rect(this.x, this.y, this.w, this.h, this.angle)
    pop();
  }
  moveRect() {
    this.angle = this.angle + 0.01;
  }
}

var r;
var r2;
var r3;

function setup() {
  createCanvas(400, 400);
  
  c = new Circle(40, 50, 10, 10, 2, 1);
  
  r = new Rectangle(20, 20, 20, 20, 100);
}

function draw() {
  background(220);
  
  
  c.display();
  c.move();
  r.displayRect();
  r.moveRect();
  
  var circles = [];
  
  if(mouseIsPressed) {
    var nc = new Circle(mouseX, mouseY, 10, 10, 2, 1);
    circles.push(nc);
  }
}var speaker = {
	x: 98,
  y: 250,
  w: 10,
  h: 70,
  roundedCorner: 20
}

var powerSlider = {
  x: 0,
  y: 14,
  w: 20,
  h: 8,
  roundedCorner: 20
};

var sliderStart = 80;
var sliderEnd = 120;
var offsetX = 0;
var dragging = false;
var rollover = false;

function slide() {  
  if (mouseX > powerSlider.x && mouseX < powerSlider.x + powerSlider.w && mouseY > powerSlider.y && mouseY < powerSlider.y + powerSlider.h && mouseIsPressed){
  	dragging = true;
    offsetX = powerSlider.x-mouseX;
  }
  if (!mouseIsPressed) {
    dragging = false;
  }
}

function turnOn() {
  if(dragging == true) {
    powerSlider.x = mouseX + offsetX;
  }
  powerSlider.x = constrain(powerSlider.x, sliderStart, sliderEnd-powerSlider.w);
}

function powerOn() {
  var s = second();
  if (powerSlider.x >= sliderEnd - powerSlider.w) {
    fill(0, frameCount%260, 0);
    rect(130,100,200,180);
  }
  

    if(s == s + 5) {
    	fill(0, 100, 0);
    	rect(130,100,200,180);
    }
}
  

function setup() { 
  createCanvas(700, 700);
} 

function draw() { 
  background(255);

//gameboy body
  fill(219,217,208);
  noStroke();
  rect(30, 20, 400, 650, 20, 20, 100, 20);
//on-off panel
  stroke(180);
  strokeWeight(5);
  line(32,50,426,50);
  line(70,22,70,50);
  line(390,22,390,50);  
//on-off text
  fill(180);
  textSize(10);
  noStroke();
  textFont("Arial");
  textStyle("bold");
  text("ON/OFF",80,35);
//screen border
  fill(85,87,120);
  noStroke();
  rect(70, 70, 320, 250, 20, 20, 60, 20);
//default off screen
  fill(0,0,0);
  rect(130, 100, 200, 180);
//Logo 
  fill(17,28,118);
  textSize(18);
  text("Nintendo", 70, 350);
  textSize(24);
  textStyle("italic");
  text("GAME BOY", 152, 350);
  textSize(8);
  textStyle("bold");
  text("TM", 280, 350);
//Speakers
  push();
  translate(70, 400);
  rotate(-44.4);
  stroke(140);
  strokeWeight(1);
  noFill();
  for (var i = 0; i < 6; i++) {
    rect(speaker.x+ i * 24, speaker.y, speaker.w, speaker.h, speaker.roundedCorner);
  }
//select and start buttons
  fill(140);
  noStroke();
  textSize(15);
  rect(0, 150, 60, 12, 20, 20, 20, 20);
  rect(60, 190, 60, 12, 20, 20, 20, 20);
  fill(17,28,118);
  textStyle("bold");
  text("SELECT", 2, 178);
  text("START", 66, 218);
//A and B buttons 
  fill(140, 27, 79);
  ellipse(260,150, 50, 50);
  ellipse(190,150, 50, 50);
  fill(17,28,118);
  text("A", 255,190);
  text("B", 185,192);
  pop();
//D-pad
  fill(0);
  rect( 70, 425, 85, 35, 5, 5, 5, 5);
  rect( 95, 400, 35, 85, 5, 5, 5, 5);
//Power slider
  fill(140)
	rect(powerSlider.x, powerSlider.y, powerSlider.w, powerSlider.h, powerSlider.roundedCorner);

slide();
turnOn();
powerOn();
  
}var buttonB = {
  x: 302,
  y: 455,
  d: 50
};

var buttonA = {
  x: 365,
  y: 425,
  d: 50
};

var speaker = {
	x: 98,
  y: 250,
  w: 10,
  h: 70,
  roundedCorner: 20
};

var powerSlider = {
  x: 0,
  y: 14,
  w: 20,
  h: 8,
  roundedCorner: 20
};

var sliderStart = 80;
var sliderEnd = 120;
var offsetX = 0;
var dragging = false;
var rollover = false;

function slide() {  
  if (mouseX > powerSlider.x && mouseX < powerSlider.x + powerSlider.w && mouseY > powerSlider.y && mouseY < powerSlider.y + powerSlider.h && mouseIsPressed){
  	dragging = true;
    offsetX = powerSlider.x-mouseX;
  }
  if (!mouseIsPressed) {
    dragging = false;
  }
}

function turnOn() {
  if(dragging == true) {
    powerSlider.x = mouseX + offsetX;
  }
  powerSlider.x = constrain(powerSlider.x, sliderStart, sliderEnd-powerSlider.w);
}

var powerState = false;

function powerOn() {
  var s = second();
  if (powerSlider.x >= sliderEnd - powerSlider.w) {
    fill(228, 237, 208);
    rect(130,100,200,180);
    powerState = true;
  }
  else if (powerSlider.x <= sliderStart) {
    powerState = false;
  }
  
}

var button = "";

function whichButton() {
  if(powerState == true && mouseIsPressed){
    if (dist(mouseX, mouseY, buttonA.x, buttonA.y) < buttonA.d/2) {
      button = "buttonA";
    }
    else if (dist(mouseX, mouseY, buttonB.x, buttonB.y) < buttonB.d/2) {
      button = "buttonB";
    }
    else if (dist(mouseX, mouseY, buttonA.x, buttonA.y) < buttonA.d/2) {
    }
  }
  else if (powerState == false) {
    fill(133, 153, 84);
    rect(130,100,200,180);
  }
}

function mousePressed() {
  if(button == "buttonA") {
    image(ICMgroup,130,100,200,180);
  }
  else if(button == "buttonB") {
    image(pokemon,130,100,200,180);
  }
}

var ICMgroup;
var pokemon;
function preload() {
	ICMgroup = loadImage("assets/ICMgroup.gif");
  pokemon = loadImage("assets/pokemon_yellow_image12.jpg");
}

function setup() { 
  createCanvas(700, 700);
} 

function draw() { 
  background(255);

//gameboy body
  fill(219,217,208);
  noStroke();
  rect(30, 20, 400, 650, 20, 20, 100, 20);
//on-off panel
  stroke(140,75);
  strokeWeight(5);
  line(32,50,426,50);
  line(70,22,70,50);
  line(390,22,390,50);  
//on-off text
  fill(180);
  textSize(10);
  noStroke();
  textFont("Arial");
  textStyle("bold");
  text("OFF/ON",80,35);
//screen border
  strokeWeight(3);
  stroke(140, 80);
  fill(85,87,120);
  rect(70, 70, 320, 250, 20, 20, 60, 20);
//default off screen
  strokeWeight(3);
  stroke(0);
  fill(133, 153, 84);
  rect(130, 100, 200, 180);
//Logo 
  noStroke();
  fill(17,28,118);
  textSize(18);
  text("Nintendo", 70, 350);
  textSize(24);
  textStyle("italic");
  text("GAME BOY", 152, 350);
  textSize(8);
  textStyle("bold");
  text("TM", 280, 350);
//Speakers
  push();
  translate(70, 400);
  rotate(-44.4);
  stroke(140,75);
  strokeWeight(1);
  fill(140, 30);
  for (var i = 0; i < 6; i++) {
    rect(speaker.x+ i * 24, speaker.y, speaker.w, speaker.h, speaker.roundedCorner);
  }
//select and start buttons
  strokeWeight(6);
  stroke(140, 50);
  fill(140);
  textSize(15);
  rect(0, 150, 60, 12, 20, 20, 20, 20);
  rect(60, 190, 60, 12, 20, 20, 20, 20);
  fill(17,28,118);
  noStroke();
  textStyle("bold");
  text("SELECT", 2, 178);
  text("START", 66, 218);
//A and B text 
  fill(17,28,118);
  text("A", 255,190);
  text("B", 185,192);
  pop();
//A and B buttons 
  fill(140, 27, 79);
  strokeWeight(6);
  stroke(140, 80);
  ellipse(buttonA.x,buttonA.y, buttonA.d, buttonA.d);
  ellipse(buttonB.x,buttonB.y, buttonB.d, buttonB.d);
//D-pad
  fill(0);
  rect(95, 400, 35, 85, 5, 5, 5, 5);
  rect(70, 425, 85, 35, 5, 5, 5, 5);
  noStroke();
  rect(95, 400, 35, 85, 5, 5, 5, 5);
//Power slider
  fill(140)
	rect(powerSlider.x, powerSlider.y, powerSlider.w, powerSlider.h, powerSlider.roundedCorner);

slide();
turnOn();
powerOn();
mousePressed();
whichButton();
  
}var ball = {
  x: 0,
  y: 0,
  d: 0,
  xspeed: 6,
  yspeed: 6
};

var ball2 = {
  x: 0,
  y: 0,
  d: 0,
  xspeed: 3,
  yspeed: 3
};

var ball3 = {
  x: 0,
  y: 0,
  d: 0,
  xspeed: 5,
  yspeed: 5
};

  var balls = [];

function setup() { 
  createCanvas(400, 400);
  
balls[0] = ball;
balls[1] = ball2;
balls[2] = ball3;

  initBall(balls);

} 

function initBall(ball) {
  for (var i = 0; i < balls.length; i++) { 

  balls[i].x = (random(0, width));
  balls[i].y = (random(0, height));
  balls[i].d = (random(10, 30));
  }
}

function displayBall(ball) {
  ellipse(ball.x, ball.y, ball.d);

}

function moveBall(ball) {
  ball.x += ball.xspeed;
}

function checkBounds(ball) {
    if(ball.x < 0 || ball.x > width) {
   ball.xspeed *= -1; 
  }
  
  ball.y += ball.yspeed;
  
  if(ball.y < 0 || ball.y > width) {
   ball.yspeed *= -1; 
  }
}

function draw() { 
  background(220);
  

for (var i = 0; i < balls.length; i++) { 
  displayBall(balls[i]);
  moveBall(balls[i]);
  checkBounds(balls[i]);
}

  
// if (mouseClicked) {
//   displayBall();
//   moveBall();
//   checkBounds();
// }
}// Power On

var dragging = false; // Is the slider being dragged?
var rollover = false; // Is the mouse over the slider?

// Rectangle variables for slider
 power = {
 x: 0,
y: 14,
w: 20,
h: 8
};
 //Start and end of slider
var sliderStart = 75;
var sliderEnd = 115;
// Offset for dragging slider
var offsetX = 0; 


function setup() { 
  createCanvas(700, 700);
  
img=loadImage("http://www.xujenna.com/itp_blog/wp-content/uploads/2017/09/ICMgroup.gif");
  
  
  
} 

function draw() { 
background(255);
  
    
  
	//Gameboy
fill(219,217,208);
noStroke();
rect(30, 20, 400, 650, 20, 20, 100, 20);

stroke(180);
strokeWeight(5);
line(32,50,426,50);
line(70,22,70,50);
line(390,22,390,50);


// why is the line length different from the gameboy's width?
	
  // screen border
fill(85,87,120);
noStroke();
rect(70, 70, 320, 250, 20, 20, 60, 20);
  
fill(0,0, 0);
rect(130, 100, 200, 180);


  
// Nintendo words
fill(17,28,118);
textSize(18);
textFont("Arial");
textStyle("bold");
text("Nintendo", 70, 350);
  // Game Boy words
fill(17,28,118);
textSize(24);
textFont("Arial");
textStyle("italic");
text("GAME BOY", 152, 350);
  // TM words
fill(17,28,118);
textSize(8);
textFont("Arial");
textStyle("bold");
text("TM", 280, 350);


   // Speakers
push();
translate(70, 400);
rotate(-44.4);
stroke(140);
strokeWeight(1);
noFill();
rect(98, 250, 10, 70, 20, 20, 20, 20);
rect(122, 250, 10, 70, 20, 20, 20, 20);
rect(146, 250, 10, 70, 20, 20, 20, 20);
rect(168, 250, 10, 70, 20, 20, 20, 20);
rect(192, 250, 10, 70, 20, 20, 20, 20);
rect(216, 250, 10, 70, 20, 20, 20, 20);
//why do the rectangles move together when one x value is changed 
  
  // select and start buttons
fill(140);
noStroke();
textSize(15);
rect(0, 150, 60, 12, 20, 20, 20, 20);
rect(60, 190, 60, 12, 20, 20, 20, 20);
fill(17,28,118);
text("SELECT", 2, 178);
text("START", 66, 218);
  // A and B buttons 
fill(140, 27, 79);
ellipse(260,150, 50, 50);
ellipse(190,150, 50, 50);
fill(17,28,118);
text("A", 255,190);
text("B", 185,192);
pop();
  
  // D-pad
fill(0);
  rect( 70, 425, 85, 35, 5, 5, 5, 5);
 rect( 95, 400, 35, 85, 5, 5, 5, 5);
  
  
  // turn on power button
  if (power.x >= 95) {
    image(img, 130, 100, 200, 180);

  // screen 
fill(0,frameCount%260, 0);
var onScreen= rect(130, 100, 200, 180);
    } 
  

  
  if (dragging) {
    power.x = mouseX + offsetX;
  }
  power.x = constrain(power.x, sliderStart, sliderEnd-power.w);



  // Draw rectangle for slider
  fill(140)
rect(power.x, power.y, power.w, power.h);

  // Map is an amazing function that will map one range to another!
  // Here we take the slider's range and map it to a value between 0 and 255
  var b = map(power.x,sliderStart,sliderEnd-power.w,0,255);
  //fill(b);
  //rect(sliderStart, 100, sliderEnd-sliderStart, 150);
}

function mousePressed() {
  // Did I click on slider?
  if (mouseX > power.x && mouseX < power.x + power.w && mouseY > power.y && mouseY < power.y + power.h) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX = power.x-mouseX;
  }
}

function mouseReleased() {
  // Stop dragging
  dragging = false;

}var img;
	function preload("https://www.unilad.co.uk/wp-content/uploads/2016/08/tupac1.jpg) {
    img = loadimage();
  }

function setup() { 
  createCanvas(700, 700);
  
  loadImage() 
} 

function draw() { 
background(255);
	
fill(219,217,208);
noStroke();
rect(30, 20, 400, 650, 20, 20, 100, 20);

stroke(180);
strokeWeight(5);
line(32,50,426,50);
line(70,22,70,50);
line(390,22,390,50);

fill(219,217,208);
line(100,19,115,19);

// why is the line length different from the gameboy's width?
	
fill(85,87,120);
noStroke();
rect(70, 70, 320, 250, 20, 20, 60, 20);

fill(0,frameCount%260, 0);
rect(130, 100, 200, 180);

fill(17,28,118);
textSize(18);
textFont("Arial");
textStyle("bold");
text("Nintendo", 70, 350);
  
fill(17,28,118);
textSize(24);
textFont("Arial");
textStyle("italic");
text("GAME BOY", 152, 350);
  
fill(17,28,118);
textSize(8);
textFont("Arial");
textStyle("bold");
text("TM", 280, 350);

// push();
// translate(260, 589);
// rotate(-44.4);
// stroke(0);
// strokeWeight(1);
// noFill();
// rect(0, 0, 10, 70, 20, 20, 20, 20);
// rect(24, 0, 10, 70, 20, 20, 20, 20);
// rect(48, 0, 10, 70, 20, 20, 20, 20);
// rect(72, 0, 10, 70, 20, 20, 20, 20);
// rect(96, 0, 10, 70, 20, 20, 20, 20);
// rect(118, 0, 10, 70, 20, 20, 20, 20);
// pop();

push();
translate(70, 400);
rotate(-44.4);
stroke(140);
strokeWeight(1);
noFill();
rect(98, 250, 10, 70, 20, 20, 20, 20);
rect(122, 250, 10, 70, 20, 20, 20, 20);
rect(146, 250, 10, 70, 20, 20, 20, 20);
rect(168, 250, 10, 70, 20, 20, 20, 20);
rect(192, 250, 10, 70, 20, 20, 20, 20);
rect(216, 250, 10, 70, 20, 20, 20, 20);
//why do the rectangles move together when one x value is changed 
fill(140);
noStroke();
textSize(15);
rect(0, 150, 60, 12, 20, 20, 20, 20);
rect(60, 190, 60, 12, 20, 20, 20, 20);
fill(17,28,118);
text("SELECT", 2, 178);
text("START", 66, 218);
fill(140, 27, 79);
ellipse(260,150, 50, 50);
ellipse(190,150, 50, 50);
fill(17,28,118);
text("A", 255,190);
text("B", 185,192);
pop();
  
fill(0);
  rect( 70, 425, 85, 35, 5, 5, 5, 5);
 rect( 95, 400, 35, 85, 5, 5, 5, 5);

  
}function setup() { 
  createCanvas(700, 700);
} 

function draw() { 
background(255);
	
fill(219,217,208);
noStroke();
rect(30, 20, 400, 650, 20, 20, 100, 20);
	
fill(85,87,120);
noStroke();
rect(70, 60, 320, 250, 20, 20, 60, 20);

fill(0,frameCount%260, 0);
rect(130, 90, 200, 180);

fill(17,28,118);
textSize(18);
textFont("Arial");
textStyle("bold");
text("Nintendo", 70, 340);
  
fill(17,28,118);
textSize(24);
textFont("Arial");
textStyle("italic");
text("GAME BOY", 152, 340);
  
fill(17,28,118);
textSize(8);
textFont("Arial");
textStyle("bold");
text("TM", 280, 340);

// push();
// translate(260, 589);
// rotate(-44.4);
// stroke(0);
// strokeWeight(1);
// noFill();
// rect(0, 0, 10, 70, 20, 20, 20, 20);
// rect(24, 0, 10, 70, 20, 20, 20, 20);
// rect(48, 0, 10, 70, 20, 20, 20, 20);
// rect(72, 0, 10, 70, 20, 20, 20, 20);
// rect(96, 0, 10, 70, 20, 20, 20, 20);
// rect(118, 0, 10, 70, 20, 20, 20, 20);
// pop();

push();
translate(115, 589);
rotate(-44.4);
stroke(0);
strokeWeight(1);
noFill();
rect(0, 0, 10, 70, 20, 20, 20, 20);
rect(24, 0, 10, 70, 20, 20, 20, 20);
rect(48, 0, 10, 70, 20, 20, 20, 20);
rect(72, 0, 10, 70, 20, 20, 20, 20);
rect(96, 0, 10, 70, 20, 20, 20, 20);
rect(118, 0, 10, 70, 20, 20, 20, 20);
  
text("
pop();
  
}function setup() { 
  createCanvas(400, 400);
  
} 

function draw() { 
  background(220);
  

  /*
  while (i < 10) {
    rect(i * 50, 0, 45, 45);
    i++;
  }
  
  
  for (var x = 0; x < width; x=x+50) {

    for (var y = 0; y < height; y=y+50) {
      rect(x, y, 45, 45);
    }
  }
    */
  
    for (var x = 0; x <= width; x=x+50) {

    for (var y = 0; y <= height; y=y+50) {
      ellipse(x, y, mouseX, mouseY);
      fill(x, y, frameCount%256, 60);
    }
  }

  
}var ball = {
  x: 0,
  y: 0,
  d: 0,
  xspeed: 9,
  yspeed: 9
};

var button = {
  x: 0,
  y: 0,
  d: 100
};

function setup() { 
  createCanvas(400, 400);
  
  ball.x = (random(0, width));
  ball.y = (random(0, height));
  ball.d = (random(10, 30));
  
  button.x = width - button.d;
  button.y = height- button.d;
  
} 


function draw() { 
  background(220);
  
  rect(button.x, button.y, button.d, button.d);
  
  if (mouseIsPressed && mouseX > button.x && mouseX < button.x + button.d && mouseY > button.y && mouseY < button.y + button.d) {
 	 fill(0);
  }
  else {
    fill(255);
  }
  
  ellipse(ball.x, ball.y, ball.d);
  
  ball.x += ball.xspeed;
  
  if(ball.x < 0 || ball.x > width) {
   ball.xspeed *= -1; 
  }
  
  ball.y += ball.yspeed;
  
  if(ball.y < 0 || ball.y > width) {
   ball.yspeed *= -1; 
  }
  
  
}var ball = {
  x: 0,
  y: 0,
  d: 0,
  xspeed: 9,
  yspeed: 9
};

function setup() { 
  createCanvas(400, 400);
  
  ball.x = (random(0, width));
  ball.y = (random(0, height));
  ball.d = (random(10, 30));
  
} 

function draw() { 
  background(220);
  
  ellipse(ball.x, ball.y, ball.d);
  
  ball.x += ball.xspeed;
  
  if(ball.x < 0 || ball.x > width) {
   ball.xspeed *= -1; 
  }
  
  ball.y += ball.yspeed;
  
  if(ball.y < 0 || ball.y > width) {
   ball.yspeed *= -1; 
  }
  
  
}var bg;
var light;
var medium;
var dark;
var r;
var g;
var b;

function setup() { 
  createCanvas(600, 600);
	frameRate(7);

  tri1 = {
    x1: 100,
    y1: 200,
    x2: 200,
    y2: 100,
    x3: 200,
    y3: 200
  };
  
  tri2 = {
    x1: 200,
    y1: 200,
    x2: 200,
    y2: 100,
    x3: 300,
    y3: 100
  };
  
  tri3 = {
    x1: 200,
    y1: 200,
    x2: 300,
    y2: 100,
    x3: 400,
    y3: 200
  };
  
  tri4 = {
    x1: 300,
    y1: 100,
    x2: 400,
    y2: 100,
    x3: 400,
    y3: 200
  };
  
  tri5 = {
    x1: 400,
    y1: 100,
    x2: 400,
    y2: 200,
    x3: 500,
    y3: 200
  };
  
  tri6 = {
    x1: 100,
    y1: 200,
    x2: 200,
    y2: 200,
    x3: 300,
    y3: 500
  };
  
  tri7 = {
    x1: 200,
    y1: 200,
    x2: 400,
    y2: 200,
    x3: 300,
    y3: 500
  };
  
  tri8 = {
    x1: 400,
    y1: 200,
    x2: 500,
    y2: 200,
    x3: 300,
    y3: 500
  };
  
} 

function draw() {
	bg = map(mouseY, 0, height, 0, 250);
  r = random(50,200);
  g = random(50,200);
  b = random(50,200);
  multiplier = 255/bg + 1;


  background(bg);
  stroke(bg);
	fill((random(50,200)*multiplier), (random(50,200)*multiplier), (random(50,200)*multiplier));
	triangle(tri1.x1++,tri1.y1++, tri1.x2++, tri1.y2++, tri1.x3++, tri1.y3++);
	fill((random(50,200)*multiplier), (random(50,200)*multiplier), (random(50,200)*multiplier));
	triangle(tri2.x1--,tri2.y1--, tri2.x2--, tri2.y2--, tri2.x3--, tri2.y3--);
	fill((random(50,200)*multiplier), (random(50,200)*multiplier), (random(50,200)*multiplier));
	triangle(tri3.x1--, tri3.y1++, tri3.x2--, tri3.y2++, tri3.x3--, tri3.y3++);
	fill((random(50,200)*multiplier), (random(50,200)*multiplier), (random(50,200)*multiplier));
	triangle(tri4.x1++,tri4.y1--, tri4.x2++, tri4.y2--, tri4.x3++, tri4.y3--);
	fill((random(50,200)*multiplier), (random(50,200)*multiplier), (random(50,200)*multiplier));
	triangle(tri5.x1--,tri5.y1--, tri5.x2--, tri5.y2--, tri5.x3--, tri5.y3--);
	fill((random(50,200)*multiplier), (random(50,200)*multiplier), (random(50,200)*multiplier));
	triangle(tri6.x1++,tri6.y1--, tri6.x2++, tri6.y2--, tri6.x3++, tri6.y3--);
	fill((random(50,200)*multiplier), (random(50,200)*multiplier), (random(50,200)*multiplier));
	triangle(tri7.x1++,tri7.y1++, tri7.x2++, tri7.y2++, tri7.x3++, tri7.y3++);
	fill((random(50,200)*multiplier), (random(50,200)*multiplier), (random(50,200)*multiplier));
	triangle(tri8.x1--,tri8.y1, tri8.x2--, tri8.y2, tri8.x3--, tri8.y3);
  
  
  for (i = 0; i<30; i++) {
  fill(bg+100);
  text("*", random(0,width), random(0,height));

  }

}var bg;
var light;
var medium;
var dark;

function setup() { 
  createCanvas(600, 600);
	frameRate(7);

  tri1 = {
    x1: 100,
    y1: 200,
    x2: 200,
    y2: 100,
    x3: 200,
    y3: 200
  };
  
  tri2 = {
    x1: 200,
    y1: 200,
    x2: 200,
    y2: 100,
    x3: 300,
    y3: 100
  };
  
  tri3 = {
    x1: 200,
    y1: 200,
    x2: 300,
    y2: 100,
    x3: 400,
    y3: 200
  };
  
  tri4 = {
    x1: 300,
    y1: 100,
    x2: 400,
    y2: 100,
    x3: 400,
    y3: 200
  };
  
  tri5 = {
    x1: 400,
    y1: 100,
    x2: 400,
    y2: 200,
    x3: 500,
    y3: 200
  };
  
  tri6 = {
    x1: 100,
    y1: 200,
    x2: 200,
    y2: 200,
    x3: 300,
    y3: 500
  };
  
  tri7 = {
    x1: 200,
    y1: 200,
    x2: 400,
    y2: 200,
    x3: 300,
    y3: 500
  };
  
  tri8 = {
    x1: 400,
    y1: 200,
    x2: 500,
    y2: 200,
    x3: 300,
    y3: 500
  };
  
} 

function draw() {
	bg = map(mouseY, 0, width, 0, 250);
  light = (bg+1)* 0.65;
  medium = (bg+1)* 0.6;
  dark = (bg+1)* 0.575;

  background(bg);
  stroke(bg);
	fill(random(medium+60, medium+70));
	triangle(tri1.x1++,tri1.y1++, tri1.x2++, tri1.y2++, tri1.x3++, tri1.y3++);
	fill(random(dark+50,dark+60));
	triangle(tri2.x1--,tri2.y1--, tri2.x2--, tri2.y2--, tri2.x3--, tri2.y3--);
	fill(random(light+70,light+80));
	triangle(tri3.x1--, tri3.y1++, tri3.x2--, tri3.y2++, tri3.x3--, tri3.y3++);
	fill(random(medium+60, medium+70));
	triangle(tri4.x1++,tri4.y1--, tri4.x2++, tri4.y2--, tri4.x3++, tri4.y3--);
	fill(random(light+70,light+80));
	triangle(tri5.x1--,tri5.y1--, tri5.x2--, tri5.y2--, tri5.x3--, tri5.y3--);
	fill(random(light+70,light+80));
	triangle(tri6.x1++,tri6.y1--, tri6.x2++, tri6.y2--, tri6.x3++, tri6.y3--);
	fill(random(dark+50,dark+60));
	triangle(tri7.x1++,tri7.y1++, tri7.x2++, tri7.y2++, tri7.x3++, tri7.y3++);
	fill(random(medium+60, medium+70));
	triangle(tri8.x1--,tri8.y1, tri8.x2--, tri8.y2, tri8.x3--, tri8.y3);
  
  
  for (i = 0; i<30; i++) {
  fill(bg+100);
  text("*", random(0,width), random(0,height));

  }

}var bg;
var light;
var medium;
var dark;

function setup() { 
  createCanvas(600, 600);
	frameRate(7);
	
} 

function draw() {
	bg = map(mouseY, 0, width, 0, 230);
  light = (bg+1) * random(1.2, 1.3);
  medium = (bg+1) * random(1.1, 1.2);
  dark = (bg+1)* random(1, 1.1);

  background(bg);
  stroke(bg);
	fill(random(medium, medium));
	triangle(100,200,200,100,200,200);
	fill(random(dark,dark));
	triangle(200,200,200,100,300,100);
	fill(random(light,light));
	triangle(200,200,300,100,400,200);
	fill(random(medium, medium));
	triangle(300,100,400,100,400,200);
	fill(random(light,light));
	triangle(400,100,400,200,500,200);
	fill(random(light,light));
	triangle(100,200,200,200,300,500);
	fill(random(dark,dark));
	triangle(200,200,400,200,300,500);
	fill(random(medium, medium));
	triangle(400,200,500,200,300,500);
  
  
  for (i = 0; i<30; i++) {
  fill(bg+100);
  text("*", random(50,550), random(50,550));

  }

}var bg;
var light;
var medium;
var dark;

function setup() { 
  createCanvas(600, 600);
	frameRate(7);
	
} 

function draw() {
	bg = map(mouseY, 0, width, 0, 250);
  light = (bg+1)* 0.65;
  medium = (bg+1)* 0.6a;
  dark = (bg+1)* 0.575;

  background(bg);
  stroke(bg);
	fill(random(medium+60, medium+70));
	triangle(100,200,200,100,200,200);
	fill(random(dark+50,dark+60));
	triangle(200,200,200,100,300,100);
	fill(random(light+70,light+80));
	triangle(200,200,300,100,400,200);
	fill(random(medium+60, medium+70));
	triangle(300,100,400,100,400,200);
	fill(random(light+70,light+80));
	triangle(400,100,400,200,500,200);
	fill(random(light+70,light+80));
	triangle(100,200,200,200,300,500);
	fill(random(dark+50,dark+60));
	triangle(200,200,400,200,300,500);
	fill(random(medium+60, medium+70));
	triangle(400,200,500,200,300,500);
  
  
  for (i = 0; i<30; i++) {
  fill(bg+100);
  text("*", random(50,550), random(50,550));

  }

}var bg;
var light;
var medium;
var dark;

function setup() { 
  createCanvas(600, 600);
	frameRate(7);
	
} 

function draw() {
	bg = map(mouseY, 0, width, 0, 255);
  light = random(100,125);
  medium = random(85,100);
  dark = random(65,85);

  background(bg);
  stroke(bg);
	fill(random(bg/2,bg/2+dark));
	triangle(100,200,200,100,200,200);
	fill(random(bg/2+20,bg/2_45));
	triangle(200,200,200,100,300,100);
	fill(random(70,95));
	triangle(200,200,300,100,400,200);
	fill(random(45,70));
	triangle(300,100,400,100,400,200);
	fill(random(20,45));
	triangle(400,100,400,200,500,200);
	fill(random(70,95));
	triangle(100,200,200,200,300,500);
	fill(random(20,45));
	triangle(200,200,400,200,300,500);
	fill(random(45,70));
	triangle(400,200,500,200,300,500);
  
  
  fill(bg+100);
  text("*", random(50,550), random(50,550));
  text("*", random(50,550), random(50,550));
  text("*", random(50,550), random(50,550));
  text("*", random(50,550), random(50,550));


}var square;
var other;

function setup() { 
  createCanvas(400, 400);
  
  //JSON (Javascript Object Notation)
  square = {
    x: 10,
    y: 100,
    w: 50,
    h: 50
	};
  
  other = {
    x: 100,
    y: 50,
    w: random(0,100),
    h: random(0,150)
  };
  
}

function draw() { 
  background(220);
  
  rect(square.x++, square.y, square.w, square.h);
  rect(other.x--, other.y, other.w, other.h);
  
}function setup() { 
  createCanvas(400, 400);
  
  x = random(0,width);
  y = random(0, height);
  
  x2 = random(0,width);
  y2 = random(0, height);
  
  var a,b;
} 

function draw() { 
  background(220);
 
  rect(x, y, 20, 50);
  x = x + random(-2,2);
  y = y + random(-2,2);
  
  rect(x2, y2, 20, 50);
  x2++;
  y2++;
  
  rect(mouseX, mouseY, 20,50);

  fill(mouseX, mouseY, 255);
  rect(x, y, mouseX, mouseY);
}var x;
var y;
var w;
var h;

function setup() { 
  createCanvas(400, 400);
  
  x = width/2;
  y = height/2;
  w = 50;
  h = 50;
  
  noFill();
  ellipse(x,y,w,h);
  y = y - h/2;
  ellipse(x,y,w,h);
  y = y + h;
  ellipse(x,y,w,h);
	y = y - h/2;
  x = x + w/2;
  ellipse(x,y,w,h);
  x = x - h;
  ellipse(x,y,w,h);
  
} 

function draw() { 
//  background(220);
  

}
function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  
  arc(100,100,100,100, radians(0), radians(90));
  
  
  // push > translate > pop
  
  
  push(); //starts a new drawing state
  translate(100,100); //moves origin to (100,100)
  rotate(radians(-45)); //rotates coordinate system
  line(-100,0,100,0);
  pop(); //restores cooridinate system; always used with push
  line(-100,0,100,0);


  
  
}function setup() { 
  createCanvas(600, 600);
	frameRate(7);
} 

function draw() { 
  background(0,0,0);
	fill(random(210,230));
  stroke(255,255,255);
	triangle(100,200,200,100,200,200);
	fill(random(180,200));
	triangle(200,200,200,100,300,100);
	fill(random(240,255));
	triangle(200,200,300,100,400,200);
	fill(random(220,240));
	triangle(300,100,400,100,400,200);
	fill(random(200,210));
	triangle(400,100,400,200,500,200);
	fill(random(235,250));
	triangle(100,200,200,200,300,500);
	fill(random(215,230));
	triangle(200,200,400,200,300,500);
	fill(random(235,250));
	triangle(400,200,500,200,300,500);
  
  
  fill("white");
  text("*", random(50,550), random(50,550));
  text("*", random(50,550), random(50,550));
  text("*", random(50,550), random(50,550));
  text("*", random(50,550), random(50,550));


}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
	noFill("red");
	strokeWeight(3);
	stroke("blue");
	rect(5,height-82,80,80);
	line(80,height-100, 130, 250);
	line(120, height-100, 170, 250);
	triangle(180,height-50, 260, height-50, 220, height-110)
}