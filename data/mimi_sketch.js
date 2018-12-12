let osc1, osc2;
let fft;
let mic;

function setup() {
  createCanvas(400, 400);
  
  // Create a sine-wave oscillator
	osc1 = new p5.Oscillator();
  osc1.setType('sine');
  // Set it to Orchestra A
  osc1.freq(440);
  osc1.start();
  
  osc2 = new p5.Oscillator();
  osc2.setType('sine');
  // Set it to Orchestra A
  osc2.freq(440);
  osc2.start();
  
  // Create an FFT analyzer
  fft = new p5.FFT();
  
  // Create a mic
  //mic = new p5.AudioIn();
  //mic.start();
  
  // Analyze the oscillator
  fft.setInput(osc2);
  
  // Analyze the mic
  //fft.setInput(mic);
}

function draw() {
  background(220);
  // Map the freq of osc to mouseX
  // From Orchestra A to 1 octave above
  let freq = map(mouseX, 0, width, 440, 880);
  osc2.freq(freq);
  text(freq, width/2, 100);
  
  // Visualize the fft bins
  let bins = fft.analyze();
  for (let b in bins) {
   let bin = bins[b];
    line(b, 0, b, bin);
  }
}let osc;
let mic;
let amp;
let fft;

function setup() {
  createCanvas(400, 400);
  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.freq(440);
  osc.start();
  mic = new p5.AudioIn();
  mic.start();
  // amp = new p5.Amplitude();
  // amp.setInput(mic);
  
  fft = new p5.FFT();
  fft.setInput(osc);
}

function draw() {
  background(220);
  let freq = map(mouseX, 0, width, 440, 880);
  osc.freq(freq);
  //text(freq, width/2, 100);
  //text(amp.getLevel(), width/2, 200);
  
  // Gives me amplitude values between 0-255
  let bins = fft.analyze();
  
  for(let b in bins) {
   	let bin = bins[b];
   	line(b, 0, b, bin);
  }
  
  
}// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Basic Pitch Detection
=== */

let audioContext;
let mic;
let pitch;
let canvas;

function setup() {
  canvas = createCanvas(400, 400);
  canvas.drop(gotFiles);
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
}

function startPitch() {
  pitch = ml5.pitchDetection('./model/', audioContext , mic.stream, modelLoaded);
}

function gotFiles(files) {
   mic.start(startPitch); 
}
function modelLoaded() {
  select('#status').html('Model Loaded');
  getPitch();
}

function getPitch() {
  pitch.getPitch(function(err, frequency) {
    if (frequency) {
      select('#result').html(frequency);
    } else {
      select('#result').html('No pitch detected');
    }
    getPitch();
  })
}let osc;
let fft;

let base = 440;

function setup() {
  createCanvas(400, 400);
  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.freq(base);
  osc.start();  
}

function draw() {
  background(220);
	let freq = base + base*mouseX/width;
  osc.freq(freq);
  text(freq, width/2, 100);
}

// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  // Hide the video element, and just show the canvas
  video.hide();

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
}

function modelReady() {
  select('#status').html('Model Loaded');
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
}

function draw() {
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  drawSkeleton();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
     
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    console.log(skeleton);
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}
// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using MobileNet and p5.js
This example uses a callback pattern to create the classifier
=== */

let classifier;
let video;

function setup() {
  noCanvas();
  // Create a camera input
  video = createCapture(VIDEO);
  // Initialize the Image Classifier method with MobileNet and the video as the second argument
  classifier = ml5.imageClassifier('MobileNet', video, modelReady);  
}

function modelReady() {
  // Change the status of the model once its ready
  select('#status').html('Model Loaded');
  // Call the classifyVideo function to start classifying the video
  classifyVideo();
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.predict(gotResult);
}

// When we get a result
function gotResult(err, results) {
  // The results are in an array ordered by probability.
  select('#result').html(results[0].className);
  select('#probability').html(nf(results[0].probability, 0, 2));
  classifyVideo();
}
let mic;
let amp;
let fft;

function setup() {
  createCanvas(400, 400);
  mic = new p5.AudioIn();
  mic.start();
  
  amp = new p5.Amplitude();
  amp.setInput(mic);
  
  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  background(220);
  console.log(mic.getLevel());
  console.log(amp.getLevel());
  
  let bins = fft.analyze();
  
  for(let b in bins) {
   let bin = bins[b];
   line(b, height, b, height-bin); 
  }
}// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Image classification using MobileNet and p5.js
This example uses a callback pattern to create the classifier
=== */

// Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
const classifier = ml5.imageClassifier('MobileNet', modelReady);

// A variable to hold the image we want to classify
let img;

function preload() {
  // Load the image
  img = createImg("images/bird.jpg");
  img.elt.crossOrigin = "Anonymous";
  img.size(400, 400);
}

function setup() {
  noCanvas();
}

// Change the status when the model loads.
function modelReady() {
  select('#status').html('Model Loaded')
  classifier.predict(img, gotResult);
}


// A function to run when we get any errors and the results
function gotResult(err, results) {
  console.log(results);
  // Display error in the console
  if (err) {
    console.error(err);
  }
  // The results are in an array ordered by probability.
  select('#result').html(results[0].className);
  select('#probability').html(nf(results[0].probability, 0, 2));
}let capture;

function setup() {
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  capture.hide();
  pixelDensity(1);
  createCanvas(capture.width, capture.height);
}

function draw() {
  background(220);
  image(capture, 0, 0);

  capture.loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      // Create a transparent vertical strip around the mouse
      if (x > mouseX - 10 && x < mouseX + 10) {
        capture.set(x, y, [0, 0, 0, 0]);
      }
    }
  }
  capture.updatePixels();
}// Get your own API Key @http://developer.nytimes.com
let allWords = [];
let ts = 16;
let i = 0;

function preload() {
  let q = "trump";
  let apikey = "Get your own API from http://developer.nytimes.com";
  let url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + q + "&api-key=" + apikey;
  loadJSON(url, processSnippets);
}

function setup() {
  createCanvas(800, 800);
  fill(0);
}


function draw() {
  background(255, 5);
  ts++;
  ts %= 48;
  if (allWords.length > 0) {
    i += 1;
    i %= allWords.length;
    textSize(ts);
    let word = allWords[floor(i)];
    text(allWords[floor(i)], random(width), random(height));
  }
}



function processSnippets(data) {
  console.log("data", data);
  // Just grab the array of documents (aka articles)
  let docs = data.response.docs;
  console.log("docs", docs);
	
  // An array of names for Putin
  let putins = ["Putin", "Vladi", "Vlad", "Vova"];
  // An array of names for Trump
  let trumps = ["Trump", "president", "President"];

	
  // Loop through each document object
  for (let doc of docs) {
    // Take the snippet string off the document and 
    // split it into an array of words and store it
    // in a variable called words
    let words = splitTokens(doc.snippet);
    // Loop through each index of the words array
    for (let w in words) {
      // Get the word at index w and store
      // it in a variable called word
      let word = words[w];
      // Loop through each of trump's names
      for (let trump of trumps) {
        // See if the current word matches the current trump name
        if (match(word, trump)) {
          // If it does, place it with a random putin name
          words[w] = putins[floor(random(putins.length))];
          // Break out of this loop
          break;
        }
      }
      // Shuffle the order of the words around
      shuffle(words, true);
    }
    // Add these words to a giant array of all words
    allWords = concat(allWords, words);
  }
}let img;

function preload() {
  // Make an image from scratch
  //img = createImage(10, 10);
  // OR Load an image
  img = loadImage("https://pbs.twimg.com/profile_images/378800000532546226/dbe5f0727b69487016ffd67a6689e75a_400x400.jpeg");
}

function setup() {
  createCanvas(400, 400);
  
  // Load the img's pixels array into memory
  img.loadPixels();
  for (let i = 0; i < img.pixels.length; i++) {
    // Make it red
    if(i%4 == 0) img.pixels[i] = 255;
    // Make it opaque
    if(i%4 == 3) img.pixels[i] = 255;
  }
  // Update the img's pixels
  img.updatePixels();
  
  // Draw the image to screen
  image(img, 0, 0);
}

function draw() {
}let menu;
function preload() {
 menu = loadJSON("menu.json"); 
}
function setup() {
  createCanvas(400, 400);
  console.log("menu", menu);
  let apps = menu["appetizer s"];
  console.log("apps", apps);
  for(let a = 0; a < apps.length; a++) {
   console.log("app name", apps[a].name); 
   let sizes = apps[a].sizes;
   console.log("sizes", sizes);
    for(let s = 0; s < sizes.length; s++) {
     console.log(sizes[s].name, sizes[s].price);
    }
  }
  
}

function draw() {
  background(220);
}let img;

function preload(){
  img = loadImage('totoro.jpg');
}

function setup() {
  createCanvas(img.width, img.height);
}

function draw() {
  background(220);
  image(img, 0, 0);
  //img.loadPixels();
  // for(let i = 0; i < img.pixels.length; i++) {
  //   // How do we make it brighter? Ignore alpha
  //   //if(i%4 == 3) continue;
  //   // How do we affect redness, greenness and blueness?
  //   //if(i%4 == 0) img.pixels[i]*=1.01;
  //   // How do we affect alpha?
  //   if(i%4 == 3) img.pixels[i]*=.9875;
  //  //if(i > 100 && i < 105) console.log(img.pixels[i]); 
  // }
  // img.updatePixels();
  
  // How do we pixelate it?
  for (let x = 0; x < width; x+=20) {
    for (let y = 0; y < width; y+=20) {
      fill(img.get(x,y));
      rect(x,y,20, 20);
    }
  }
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  let c = color(255, 0, 0);
  console.log(c);
}function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(220);
	noStroke();
  for (let x = 0; x < width; x+=10) {
    for (let y = 0; y < height; y+=10) {
			// Calculate the distance of this cell to the mouse
      let d = dist(x, y, mouseX, mouseY);
      // Use the distance to color the cell
      let c = map(d, 0, 100, 255, 0);
			fill(c);
      rect(x,y, 10, 10);
    }
  }
}function setup() {
  createCanvas(400, 400);
  let c = color(255, 0, 0);
  console.log(c);
  c.setRed(128);
  console.log(c.toString());
}

function draw() {
  background(220);
}let menu = {
  "appetizers": [
    {
      name: "Fried mushrooms",
      sizes: [{
          "size": "Large",
          "price": "6.95"
        },
        {
          "size": "Small",
          "price": "3.95"
        }
      ]
    }
  ]
}

console.log(menu.appetizers[0]);

function preload() {
  loadJSON("menu.json", function(data) {
    console.log(data);
  });
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}var capture;
let diag;
let mic;


function setup() {
  createCanvas(320, 240)
  pixelDensity(1);
  capture = createCapture(VIDEO);
  capture.size(width, height);
  capture.hide();
  diag = sqrt(sq(width) + sq(height));

  mic = new p5.AudioIn()
  mic.start();
  //colorMode(HSB, 255);
}

function draw() {
  background(0);
  image(capture, 0, 0, width, height);

  // Store the brightest value we've found
  let brightest = 0;
  
  // Store the x,y position of brightest pixel
  let bright = {
    x: 0,
    y: 0
  };

  let level = mic.getLevel();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let c = capture.get(x, y);
      //console.log(c);
      let b = brightness(c);
      if (b > brightest) {
        brightest = b;
        bright.x = x;
        bright.y = y;
      }
    }
  }
  stroke('red');
  noFill();
  ellipse(bright.x, bright.y, 100, 100);
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let d = dist(x, y, bright.x, bright.y);
      let c = capture.get(x, y);
      c[3] = level*10000 / d;
      capture.set(x, y, c);
    }
  }
  capture.updatePixels();
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}//Set-up an array
// Declare a variable for the array
let balls = [];

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 10; i++) {
    // Create a new ball
    // Store it in the array
    balls.push(new Ball(random(width), random(height), random(-5, 5), random(-5, 5)));
  }
}

function draw() {
  background(220);
  // for (let i = 0; i < balls.length; i++) {
  //     balls[i].run();
  // }

  for (let b = 0; b < balls.length; b++) {
    balls[b].run();
    // Only check against balls after ball[b] in the array
    for (let c = b + 1; c < balls.length; c++) {
      // If mouse is in the ball then delete it
      // Remove ball that has been moused over

      if (balls[b].isNear(balls[c])) {
        // Make sure to remove the higher-number ball first
        balls.splice(c, 1);
        balls.splice(b, 1);
      }
    }
  }
}let serial;
let data;

function setup() {
    createCanvas(600, 600);
  noFill();
  strokeWeight(10);
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem1411");
  serial.on("data", processData);
}


function processData(){
 let inString = serial.readLine();
  // Exit out if there's no data
  console.log(inString);
 if(!inString) return;
  data = inString;
  //console.log(inString);
}

function draw() { 
  background(127, 0, 127);
  
  data = map(data, 700, 900, 0, width);
  var v = data; 


  // Left Eye
  ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);

  // Right Eye
  ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
	
  // Mouth
  bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);

  // Nose
  v+=random(-5, 5);
  bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);

}
let serial;

function setup() {
  createCanvas(400, 400);
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem1411");
  serial.on("data", processData);
}

function draw() {
  background(220);
}


function processData() {
  let inString = serial.readLine();
  if (inString) {
    console.log(inString);
  }

}// When mouse hovers over a certain ball, 
// the ball changes its direction to the opposite. 
// Also when the balls bounce from the edges 
// of the canvas they change color.

let rects = []

function setup() {
  createCanvas(600, 400)
  background(5, 55, 54)
  for (let i = 0; i < 1; i++) {
    let x = random(width)
    let y = random(height)
    let Rwh = random(12, 20)
    let Rxsp = random(-1, 3)
    let Rysp = random(-0.7, 2.4)
    rects[i] = new Recto(x, y, Rwh, Rxsp, Rysp)
  }
}

function draw() {
  for (let r = 0; r < rects.length; r++) {
    rects[r].run()
    if (rects[r].mouseOver(mouseX, mouseY)) {
    }

  }
}var serial; // variable to hold an instance of the serialport library
var data = 0;		//

function setup() {
  createCanvas(600, 600);
  serial = new p5.SerialPort();  // make a new instance of  serialport library
  serial.on('data', processData);// callback for new data coming in
	serial.open("/dev/cu.usbmodem1411"); // open a port
}

function draw() {
  background('blue');
  fill(255);
  strokeWeight(0);
  text(sensorValue, 20, 20);
	
  
  
  // Variable controlling face
  var v = map(data, 700,900, 0, width);
	ellipse(v, height/2, 20, 20);
  
  fill(255, 0, 0);
  strokeWeight(10);
  noFill();
  // Left Eye
  ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);

  // Right Eye
  ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);

  // Nose
  bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);
	
  // Mouth
  bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
}

function processData() {
	var inString = serial.readLine();
	if (!inString) return;
	data = inString.trim();
}
// Get your own API Key @http://developer.nytimes.com
let allWords = [];
let ts = 16;
let i = 0;

function preload() {
  let q = "trump";
  let apikey = "Get your own API from http://developer.nytimes.com";
  let url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + q + "&api-key=" + apikey;
  loadJSON(url, processSnippets);
}

function setup() {
  createCanvas(800, 800);
  fill(0);
}


function draw() {
  background(255, 5);
  ts++;
  ts %= 48;
  if (allWords.length > 0) {
    i += 1;
    i %= allWords.length;
    textSize(ts);
    let word = allWords[floor(i)];
    text(allWords[floor(i)], random(width), random(height));
  }
}



function processSnippets(data) {
  let docs = data.response.docs;
  console.log(data);

  let putins = ["Putin", "Vladi", "Vlad", "Vova"];
  let trumps = ["Trump", "president", "President"];


  for (let doc of docs) {
    let words = splitTokens(doc.snippet);
    for (let w in words) {
      let word = words[w];
      for (let trump of trumps) {
        if (match(word, trump)) {
          words[w] = putins[floor(random(putins.length))];
          break;
        }
      }
      shuffle(words, true);
    }
    allWords = concat(allWords, words);
  }
}// Get your own API Key @http://developer.nytimes.com
let allTokens = [];
let ts = 16;
let i = 0;

function preload() {
  let q = "trump";
  let apikey = "5fcc7b03d74d15972346cf84719ad5e5:13:68130021";
  let url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + q + "&api-key=" + apikey;
  loadJSON(url, showSnippets);
}

function setup() {
  createCanvas(800, 800);
  fill(0);
}

function draw() {
  //console.log(allTokens.length);
  background(255, 5);
  ts++;
  ts %= 48;
  if (allTokens.length > 0) {
    i += 1;
    i %= allTokens.length;
    //for (let i = 0; i < allTokens.length; i++) {
    textSize(ts);
    text(allTokens[floor(i)], random(width), random(height));
    //}
  }
}



function showSnippets(data) {
  //console.log(data);
  let docs = data.response.docs;
  console.log(data.response.docs.length);

  // Stuff for matching Trump
  let putin = ["Putin", "Vladi", "Vlad", "Vova"];
  let trump = ["Trump", "Trump's", "president", "President"];


  // Put all the words together into a single array.
  // Iterate through all the article snippets
  // Make an array of words for each snippet
  for (let i = 0; i < docs.length; i++) {
    let tokens = splitTokens(docs[i].snippet);
    // Loop through each word of the snippet
    for (var j = 0; j < tokens.length; j++) {
      // For each word, loop through the trump terms to match
      for (let k = 0; k < trump.length; k++) {
        let m = trump[k];
        // If there's a match
        if (match(tokens[j], m)) {
          console.log(match(tokens[j], m));
          // Pick a random word from trumps to replace it with
          tokens[j] = putin[floor(random(putin.length))];
          console.log(tokens[j]);
          break;
        }
      }
      // Shuffle the order of the words
      shuffle(tokens, true);
    }

    // Stick all the words into 1 big array
    allTokens = concat(allTokens, tokens);
  }
}let segments;
let words = [];

function setup() {
  createCanvas(400, 400);
  segments = loadStrings("text.txt", function(data) {
    for (let d of data) {
      //console.log(splitTokens(d));
      words.push(...splitTokens(d));
    }
  });
}

function draw() {
  background(220);
  let x = 0;
  let y = 10;
  for (let w in words) {
    let word = words[w];
    textSize(10);
    text(word, x, y);
    x += textWidth(word) + 10;
      //y += textAscent(word) + textDescent(word);

    // if (x > width - 50) {
    //   x = 0;
    // }
  }
}// Declare a "SerialPort" object
let serial;
let data = "waiting for data"; // you'll use this to write incoming data to the canvas

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER);

  serial = new p5.SerialPort();
  //serial.open("/dev/cu.usbmodem1411");
  //serial.open("/dev/cu.AdafruitEZ-Link74b6-SPP");
  serial.open("/dev/cu.Bluetooth-Incoming-Port");
  serial.on('data', gotData);
}

function draw() {
  background(220);
  ellipse(data[0]/4, data[1]/4, 50);

}

function gotData() {
  let inBytes = serial.readLine();
  if(!inBytes) return;
  console.log(inBytes);
  data = inBytes.split(',');
}

function mousePressed() {
   //serial.write(1);
  serial.write(1000);
}var osc;
var playing = false;

// Declare a "SerialPort" object
let serial;
let data = "waiting for data"; // you'll use this to write incoming data to the canvas

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER);

  serial = new p5.SerialPort();
  //serial.open("/dev/cu.usbmodem1411");
  serial.open("/dev/cu.AdafruitEZ-Link74b6-SPP");
  serial.on('data', gotData);


  // osc = new p5.Oscillator();
  // osc.setType('sine');
  // osc.freq(240);
  // osc.amp(0);
  // osc.start();
}

function draw() {
  background(220);
  ellipse(data[0]/4, data[1]/4, 50);

}

function gotData() {
  let inBytes = serial.readLine();
  if(!inBytes) return;
  console.log(inBytes);
  data = inBytes.split(',');
  
//   console.log(data);
}// Declare a "SerialPort" object
let serial;
let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas
let xys = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem1411");
  serial.on('data', gotData);
}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readLine(); // read the incoming string
  trim(currentString); // remove any trailing whitespace
  if (!currentString) return; // if the string is empty, do no more
  //console.log("DATA: " + currentString); // println the string
  latestData = currentString; // save it for the draw method
}

function draw() {
  background(255);
  let xy = latestData.split(',');
  xys.push(xy);
  let sumX = 0;
  let sumY = 0;
  if (xys.length > 50) xys.shift();

  for (let xy of xys) {
    sumX += int(xy[0]);
    sumY += int(xy[1]);
  }
  sumX /= xys.length;
  sumY /= xys.length;
      //console.log(int(sumX));
  ellipse((sumY - 400), height/2, 10, 10);
}var serial; // variable to hold an instance of the serialport library
var sensorValue = 0;		// ellipse position
var lowest = 1000;
var highest = 0;

function setup() {
  createCanvas(600, 600);
  serial = new p5.SerialPort();  // make a new instance of  serialport library
  serial.on('list', printList);  // callback function for serialport list event
  serial.on('data', serialEvent);// callback for new data coming in
	serial.list();                         // list the serial ports
	serial.open("/dev/cu.AdafruitEZ-Link74b6-SPP"); // open a port
  setInterval(function(){ serial.write('BUZZ') }, 1000);
}

function draw() {
  background('blue');
  fill(255);
  strokeWeight(0);
  text(sensorValue, 20, 20);
	
  // Find the min/max of sensor readings.
  if(sensorValue < lowest && sensorValue > 0) lowest = sensorValue;
  if(sensorValue > highest) highest = sensorValue;
  
  //if(frameCount%60 == 0) println(lowest + "\t" + highest);
  
  // Variable controlling face
  var v = map(sensorValue, lowest, highest, 0, width);
	ellipse(v, height/2, 20, 20);
  
  fill(255, 0, 0);
  strokeWeight(10);
  noFill();
  // Left Eye
  ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);

  // Right Eye
  ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);

  // Nose
  bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);
	
  // Mouth
  bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
}

// get the list of ports:
function printList(portList) {
 for (var i = 0; i < portList.length; i++) {
	// Display the list the console:
 	println(i + " " + portList[i]);
 }
}

function serialEvent() {
	var inString = serial.readLine();
	if (inString.length > 0) {
	  sensorValue += inString.trim();
	}
}
let arr = [1, 2, 3];

function setup() {
  createCanvas(400, 400);
  for (let a in arr) {
    console.log("in: " + a);
  }

  for (let a of arr) {
    console.log("of: " + a);
  }
}

function draw() {
  background(220);


}// When mouse hovers over a certain ball, 
// the ball changes its direction to the opposite. 
// Also when the balls bounce from the edges 
// of the canvas they change color.

let rects = []

function setup() {
  createCanvas(600, 400)
  background(5, 55, 54)
  for (let i = 0; i < 1; i++) {
    let x = random(width)
    let y = random(height)
    let Rwh = random(12, 20)
    let Rxsp = random(-1, 3)
    let Rysp = random(-0.7, 2.4)
    rects[i] = new Recto(x, y, Rwh, Rxsp, Rysp);
  }
}

function draw() {
  for (let r = 0; r < rects.length; r++) {
    rects[r].run()
    // If the mouse is over the rect which is really an ellipse
    rects[r].mouseOver(mouseX, mouseY)
    // if (rects[r].mouseOver(mouseX, mouseY)) {
    //   rects[r].shudder();
    // // then ???
    // }

  }
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}//Set-up an array
// Declare a variable for the array
let balls = [];

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 10; i++) {
    // Create a new ball
    // Store it in the array
    balls.push(new Ball(random(width), random(height), random(-5, 5), random(-5, 5)));
  }
}

function draw() {
  background(220);
  // for (let i = 0; i < balls.length; i++) {
  //     balls[i].run();
  // }
  
  for (let b in balls) {
   balls[b].run(); 
    // If mouse is in the ball then delete it
    // Remove ball that has been moused over
    
    if(balls[b].isNear(mouseX, mouseY)){
      balls.splice(b, 1);
    }
  }
}function setup() {
  createCanvas(400, 400);
  // Look uses var
  var i = 5;
  for (var i = 0; i < 100; i++) {}
  i++;
  console.log("Loop uses var: " + i);

  // Loop uses let
  var i = 5;
  for (let i = 0; i < 100; i++) {}
  i++;
  console.log("Loop uses let: " + i);
}

function draw() {
  background(220);

}let WIDTH = 10240;
let HEIGHT = 922;
//let scl = 1;
let scl = 0.1875;

function setup() {
  // Max out the canvas
  createCanvas(WIDTH*scl, HEIGHT*scl);
}

function draw() {
  // Draw the background
  background(255);

  push();
  // Scale everything your draw
  scale(scl, scl);
  // Strokeweight is automatically scaled
  strokeWeight(50);
  // Position and size are automatically scaled
  rect(400, 100, 1000, 600);
  pop();  

  // No need to scale mouse position...OR
  // Anything that is defined relative to 
  // the width and height of the window
  push();
  scale(1, 1);
  // However still need to scale strokeWeight
  strokeWeight(50*scl);
  // And you will still need to scale size...
  ellipse(mouseX, mouseY, 50*scl, 50*scl);
  // UNLESS it is defined relative to width and height
  //ellipse(mouseX, mouseY, width*0.025, width*0.025);
  pop();
}let balls = [];

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 10; i++) {
    balls.push(new Ball(random(width), random(height), random(-1, 1), random(-1, 1)));
  }
}

function draw() {
  background(0);
  for (b in balls) {
		balls[b].update();
    for (c in balls) {
      if (b == c) continue;
      balls[b].grow(balls[c]);
    }
    balls[b].render();
  }
}

function bounce(state, low, high, speed) {
  if (state > high || state < low) speed *= -1;
  return speed;
}let x = 0;
let xspeed = 10;
let y = 0;
let yspeed = 10;
let bg = 0;
let bgspeed = 10;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(bg);

  // Update speeds
	bgspeed = bounce (bg, 0, 255, bgspeed);
  xspeed = bounce(x, 0, width, xspeed);
  yspeed = bounce(y, 0, height, yspeed);
  
  // Move
  bg += bgspeed;
  x += xspeed;
  y += yspeed;

  // Draw ball
  ellipse(x, y, 50, 50);
}

function bounce(pos, low, high, speed) {
  if (pos < low || pos > height) speed *= -1;
  return speed;
}let numCols;
let numRows;
let colW;
let rowH;

function setup() {
  createCanvas(400, 400);
  numCols = 10;
  numRows = numCols;
  colW = width / numCols;
  rowH = height / numRows;
}

function draw() {
  background(255);
  // 1 loop to draw column lines
  for (let col = 0; col < numCols; col++) {
    for (let row = 0; row < numRows; row++) {
      // if ((col % 2 == 1 && row % 2 == 1) || (col %2 == 0 && row % 2 == 0)) fill('black');
      // else fill('white');
      let x = col * colW;
      let y = row * rowH;
      let d = dist(mouseX, mouseY, x, y);
      d = map(d, 0, dist(0, 0, width, height), 255, 0);
      //console.log(d);
      fill(d);
      rect(x, y, colW, rowH);

    }
  }

  // Draw 2 separate loops of lines
  //   for (let x = 0; x < width; x += width / 50) {
  //     line(x, 0, x, height);
  //   }
  //   for (let y = 0; y < height; y += height / 50) {
  //     line(0, y, width, y);
  //   }

}let ball = new Ball(0, 0, 10, 10);

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  ball.run();
}

function bounce(state, low, high, speed) {
  if (state > high || state < low) speed *= -1;
  return speed;
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  for (let i = 0; i < 10; i++) {
    //console.log(i);
    let x = i * width/10;
    if (i == 7) fill('blue');
    else fill('white');
    //ellipse(x, height / 2, 50, 50);
    line(x, 0, x, height);
  }
  
  // The old way of doing things.
  line(0, 0, 0, height);
  line(width/10, 0, width/10, height);
  line(2*width/10, 0, 2*width/10, height);
  line(3*width/10, 0, 3*width/10, height);
  line(4*width/10, 0, 4*width/10, height);
  line(5*width/10, 0, 5*width/10, height);
  line(6*width/10, 0, 6*width/10, height);
  line(7*width/10, 0, 7*width/10, height);
  line(8*width/10, 0, 8*width/10, height);
  line(9*width/10, 0, 9*width/10, height);  
}let y;
let yspeed = 0;

function setup() {
  createCanvas(400, 500);
  y = height;
}

function draw() {
  background(220);
  
  ellipse(width/2, y, 50, 50);
  y-= yspeed;
  
  // Speed as a function of the height of the screen
  //yspeed = height/100;
  
	// Speed as a function of distance from mouse
  yspeed = (y-mouseY)/100;
  //console.log(y);
}let x;
let xspeed = 10;

function setup() {
  createCanvas(400, 400);
  // Initialize the ball at the left edge and middle height
  x = 0;
}

function draw() {
  background(220);
  
  //Draw the ball
  ellipse(x, height/2, 50, 50);
  
  // Move the ball
  x+=xspeed;
  
  // Turn around when you cross a border
  if(x > width || x < 0) xspeed *=-1;
  
  //Move the ball
	// When you get to the opposite edge stop and turn around
  // Start to go back to original spot
  // And then turn around and go back to the other edge
  // Forever
}let leftIsOn = false;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  // Draw the left panel if it's on
  if (leftIsOn) {
    fill('red');
    rect(0, 0, width / 3, height);
  }
  // Color the first rectangle if the mouse is in it
  if (mouseX < width / 3) {
		// Do nothing.
  }
  // Color the second rectangle if the mouse is in it
  else if (mouseX < 2 * width / 3) {
    fill('red');
    rect(width / 3, 0, width / 3, height);
  }
  // Color the third rectangle if the mouse is in it
  else {
    fill('red');
    rect(2 * width / 3, 0, width / 3, height);
  }

  //Draw 3 vertical rectangles that are each full-height 
  //and 1/3rd wide
}

function mousePressed() {
  // Toggle the state of the left panel
  if (mouseX < width / 3) {
    leftIsOn = !leftIsOn;
  }
}function setup() {
  createCanvas(400, 400);
  noStroke();
}

function draw() {
  background(220);
  
  for (let col = 0; col < 10; col++) {
    for (let row = 0; row < 10; row++) {
      // If the col is even and the row is odd OR
      // If the col is odd and the row is even
      if(col%2 == 0 & row%2 == 1 || col%2 == 1 & row%2 == 0) {
        fill('black');
      }
      else {
        fill('white');
      }
      rect(col*width/10, row*height/10, width/10, height/10);
    }
  }
}let rightIsOn = false;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  fill('red');
  // if(mouseX > 2*width/3) rect( 2*width/3, 0, width/3, height);
  // else if( mouseX > width/3) rect( width/3, 0, width/3, height);
  // else rect( 0, 0, width/3, height);
  
  if(rightIsOn) rect( 2*width/3, 0, width/3, height);

}

function mousePressed() {
  if(mouseX > 2*width/3) {
    if(mouseIsPressed) {
      rightIsOn = !rightIsOn;
      console.log("TOGGLING");
    }
  }
  
}let x = 0;
let xspeed = 1;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  // What needs to change to make the ball go backwards?
	// if(x > width)  x--;
	// else x++;
  
  // When does this change need to happen? ONLY 1X!!!!
  // When you cross a boundary, change the direction
  // until the other boundary is crossed again.
	// if(x > width)  x--;
	// else if( x < 0) x++;
  
  // NOTHING IS HAPPENING IN THE MIDDLE!!!

  // x-- and x++ combines movement and direction
  // We need to separate them

  
  // But x needs to change all the time
  x += xspeed;

  // XSPEED is the thing that needs to change
  // We need to de-couple XSPEED changing from x changing
	// if(x > width)  xspeed = -1;
	// else if( x < 0) xspeed = 1;
  
  // Do you see something duplicated here?
  if( x > width || x < 0 ) xspeed *= -1;
  
  
  console.log(x);
  ellipse(x, height/2, 50, 50);
}let y;
let yspeed;

function setup() {
  createCanvas(400, 1200);
  y = height;
  
  console.log(yspeed);
}

function draw() {
  yspeed = height/100;
  //yspeed = (y - mouseY) / 100;
  background(220);
  y -= yspeed;
  ellipse(width/2, y, 50, 50);
}let x = 0;
let y = 0;
let xspeed = 0.5;

function setup() {
  createCanvas(400, 400);
  x = width/2;
  y = height/2;
}

function draw() {
  background(220);
  //console.log(x);
  // x = x + 0.5;
  // y = y + (0.5*2);
  
  x = x - xspeed;
  y = y + (xspeed*.2);
  ellipse(x, y, 50, 50);
}let lx, rx, ty, by;
let cx, cy;
let w, h;

function setup() {
//createCanvas(400, 400);
  rectMode(CENTER);
}

function draw() {
  createCanvas(frameCount, frameCount);
  // Relationship of my shape to the canvas
  cx = width/4;
  cy = height/2;
  hw = width/5;
  hh = height/20;
  
  
  // Relationship of sides of my shape to the relationship of the shape to the canvas
  lx = cx - hw;
  rx = cx + hw;
  ty = cy - hh;
  by = cy + hh;
  
  background(220);

  // TL to TR
  //line(width/2 - width/20, height/2 - height/20, width/2 + width/20, height/2 - height/20);
  line(lx, ty, rx, ty);
  
  // TR to BR
  //line(width/2 - width/20, height/2 - height/20, width/2 + width/20, height/2 + height/20);
  line(rx, ty, rx, by);
  
  // BR to BL
  //line(width/2 + width/20, height/2 + height/20, width/2 - width/20, height/2 + height/20);
  line(rx, by, lx, 1.5*by);
  
  // BL to TL
  //line(width/2 - width/20, height/2 + height/20, width/2 - width/20, height/2 - height/20);
  line(lx, by, lx, ty);
  
  //rect(width/2, height/2, width/10, height/10);
  
  // Where is the rect? 200, 200
  // How big is it? 10 x10
  //rect(200, 200, 10, 10);

}
function setup() {
  createCanvas(400, 400);
}

function draw() {
  //background(220);
  
  let d = dist(mouseX, mouseY, pmouseX, pmouseY);
  let sw = map(d, 100, 0, 10, 1);
  strokeWeight(sw);
  line(mouseX, mouseY, pmouseX, pmouseY);
}/* 1. Create a rectangle centered in the canvas
that is always 10% of the width and 10% of the height.

This is how you define 1 frame that also defines all future frames.
Move createCanvas() down to draw() and see what happens.
*/

/* 2. We want to be able to create arbitrary quadrilaterals.
So we're going to re-write the rect() function by drawing lines
and creating x and y variables for each corner of the quadrilateral.
*/

/* 3. Let's get rid of the copy and pasting. This allows us to
easily define relationships between corners. (e.g. Let's make the
the upper right hand corner is always higher than the left.)
*/

/* 4. Introduce object literals.
*/

let x, y, w, h;
let l, r, t, b;
let ltx, lty, rtx, rty, rbx, rby, lbx, lby;

function setup() {
  //createCanvas(400, 400);
  rectMode(CENTER, CENTER);
  
}

function draw() {
  createCanvas(frameCount, frameCount);
  x = width / 2;
  y = height / 2;
  w = width / 10;
  h = height / 10;
  l = x - w / 2;
  r = x + w / 2;
  t = y - h / 2;
  b = y + h / 2;

  ltx = l
  lty = t;
  rtx = r;
  rty = t;
  rbx = r;
  rby = b;
  lbx = l;
  lby = b;
  
  // Complete this on your own
  lt = { x : l, y : t };
  rt = { x : r, y : t };
  rb = { x : r, y : b };
  lb = { x : l, y : b };
  
  background(220);
  //rect(width/2, height/2, width/10, height/10);
  drawRectWithLines();
}

function drawRectWithLines() {
  beginShape();
  vertex(ltx, lty);
  vertex(rtx, rty);
  vertex(rbx, rby);
  vertex(lbx, lby);
  endShape(CLOSE);
  
  beginShape();
  vertex(lt.x, lt.y);
  vertex(rt.x, rt.y);
  vertex(rb.x, rb.y);
  vertex(lb.x, lb.y);
  endShape(CLOSE);

}/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */


const videoWidth = 600;
const videoHeight = 500;

function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

function isiOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function isMobile() {
  return isAndroid() || isiOS();
}

/**
 * Loads a the camera to be used in the demo
 *
 */
async function setupCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    throw new Error(
        'Browser API navigator.mediaDevices.getUserMedia not available');
  }

  const video = document.getElementById('video');
  video.width = videoWidth;
  video.height = videoHeight;

  const mobile = isMobile();
  const stream = await navigator.mediaDevices.getUserMedia({
    'audio': false,
    'video': {
      facingMode: 'user',
      width: mobile ? undefined : videoWidth,
      height: mobile ? undefined : videoHeight,
    },
  });
  video.srcObject = stream;

  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });
}

async function loadVideo() {
  const video = await setupCamera();
  video.play();

  return video;
}


/**
 * Feeds an image to posenet to estimate poses - this is where the magic
 * happens. This function loops with a requestAnimationFrame method.
 */
function detectPoseInRealTime(video, net) {
  const canvas = document.getElementById('output');
  const ctx = canvas.getContext('2d');
  // since images are being fed from a webcam
  const flipHorizontal = true;

  canvas.width = videoWidth;
  canvas.height = videoHeight;

  async function poseDetectionFrame() {
    if (guiState.changeToArchitecture) {
      // Important to purge variables and free up GPU memory
      guiState.net.dispose();

      // Load the PoseNet model weights for either the 0.50, 0.75, 1.00, or 1.01
      // version
      guiState.net = await posenet.load(+guiState.changeToArchitecture);

      guiState.changeToArchitecture = null;
    }

    // Begin monitoring code for frames per second
    stats.begin();

    // Scale an image down to a certain factor. Too large of an image will slow
    // down the GPU
    const imageScaleFactor = guiState.input.imageScaleFactor;
    const outputStride = +guiState.input.outputStride;

    let poses = [];
    let minPoseConfidence;
    let minPartConfidence;
    switch (guiState.algorithm) {
      case 'single-pose':
        const pose = await guiState.net.estimateSinglePose(
            video, imageScaleFactor, flipHorizontal, outputStride);
        poses.push(pose);

        minPoseConfidence = +guiState.singlePoseDetection.minPoseConfidence;
        minPartConfidence = +guiState.singlePoseDetection.minPartConfidence;
        break;
      case 'multi-pose':
        poses = await guiState.net.estimateMultiplePoses(
            video, imageScaleFactor, flipHorizontal, outputStride,
            guiState.multiPoseDetection.maxPoseDetections,
            guiState.multiPoseDetection.minPartConfidence,
            guiState.multiPoseDetection.nmsRadius);

        minPoseConfidence = +guiState.multiPoseDetection.minPoseConfidence;
        minPartConfidence = +guiState.multiPoseDetection.minPartConfidence;
        break;
    }

    ctx.clearRect(0, 0, videoWidth, videoHeight);

    if (guiState.output.showVideo) {
      ctx.save();
      ctx.scale(-1, 1);
      ctx.translate(-videoWidth, 0);
      ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
      ctx.restore();
    }

    // For each pose (i.e. person) detected in an image, loop through the poses
    // and draw the resulting skeleton and keypoints if over certain confidence
    // scores
    poses.forEach(({score, keypoints}) => {
      if (score >= minPoseConfidence) {
        if (guiState.output.showPoints) {
          drawKeypoints(keypoints, minPartConfidence, ctx);
        }
        if (guiState.output.showSkeleton) {
          drawSkeleton(keypoints, minPartConfidence, ctx);
        }
      }
    });

    // End monitoring code for frames per second
    stats.end();

    requestAnimationFrame(poseDetectionFrame);
  }

  poseDetectionFrame();
}

/**
 * Kicks off the demo by loading the posenet model, finding and loading
 * available camera devices, and setting off the detectPoseInRealTime function.
 */
async function bindPage() {
  // Load the PoseNet model weights with architecture 0.75
  const net = await posenet.load(0.75);

  let video;

  try {
    video = await loadVideo();
  } catch (e) {
    console.log('this browser does not support video capture,' +
        'or this device does not have a camera');
    throw e;
  }
  detectPoseInRealTime(video, net);
}

const color = 'aqua';
const lineWidth = 2;

function toTuple({y, x}) {
  return [y, x];
}

function drawPoint(ctx, y, x, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

/**
 * Draws a line on a canvas, i.e. a joint
 */
function drawSegment([ay, ax], [by, bx], color, scale, ctx) {
  ctx.beginPath();
  ctx.moveTo(ax * scale, ay * scale);
  ctx.lineTo(bx * scale, by * scale);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.stroke();
}

/**
 * Draws a pose skeleton by looking up all adjacent keypoints/joints
 */
function drawSkeleton(keypoints, minConfidence, ctx, scale = 1) {
  const adjacentKeyPoints = posenet.getAdjacentKeyPoints(
    keypoints, minConfidence);

  adjacentKeyPoints.forEach((keypoints) => {
    drawSegment(toTuple(keypoints[0].position),
      toTuple(keypoints[1].position), color, scale, ctx);
  });
}

/**
 * Draw pose keypoints onto a canvas
 */
function drawKeypoints(keypoints, minConfidence, ctx, scale = 1) {
  for (let i = 0; i < keypoints.length; i++) {
    const keypoint = keypoints[i];

    if (keypoint.score < minConfidence) {
      continue;
    }

    const {y, x} = keypoint.position;
    drawPoint(ctx, y * scale, x * scale, 3, color);
  }
}

/**
 * Draw the bounding box of a pose. For example, for a whole person standing
 * in an image, the bounding box will begin at the nose and extend to one of
 * ankles
 */
function drawBoundingBox(keypoints, ctx) {
  const boundingBox = posenet.getBoundingBox(keypoints);

  ctx.rect(boundingBox.minX, boundingBox.minY,
    boundingBox.maxX - boundingBox.minX, boundingBox.maxY - boundingBox.minY);

  ctx.stroke();
}

/**
 * Converts an arary of pixel data into an ImageData object
 */
async function renderToCanvas(a, ctx) {
  const [height, width] = a.shape;
  const imageData = new ImageData(width, height);

  const data = await a.data();

  for (let i = 0; i < height * width; ++i) {
    const j = i * 4;
    const k = i * 3;

    imageData.data[j + 0] = data[k + 0];
    imageData.data[j + 1] = data[k + 1];
    imageData.data[j + 2] = data[k + 2];
    imageData.data[j + 3] = 255;
  }

  ctx.putImageData(imageData, 0, 0);
}

/**
 * Draw an image on a canvas
 */
function renderImageToCanvas(image, size, canvas) {
  canvas.width = size[0];
  canvas.height = size[1];
  const ctx = canvas.getContext('2d');

  ctx.drawImage(image, 0, 0);
}

/**
 * Draw heatmap values, one of the model outputs, on to the canvas
 * Read our blog post for a description of PoseNet's heatmap outputs
 * https://medium.com/tensorflow/real-time-human-pose-estimation-in-the-browser-with-tensorflow-js-7dd0bc881cd5
 */
function drawHeatMapValues(heatMapValues, outputStride, canvas) {
  const ctx = canvas.getContext('2d');
  const radius = 5;
  const scaledValues = heatMapValues.mul(tf.scalar(outputStride, 'int32'));

  drawPoints(ctx, scaledValues, radius, color);
}

/**
 * Used by the drawHeatMapValues method to draw heatmap points on to
 * the canvas
 */
function drawPoints(ctx, points, radius, color) {
  const data = points.buffer().values;

  for (let i = 0; i < data.length; i += 2) {
    const pointY = data[i];
    const pointX = data[i + 1];

    if (pointX !== 0 && pointY !== 0) {
      ctx.beginPath();
      ctx.arc(pointX, pointY, radius, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
    }
  }
}

/**
 * Draw offset vector values, one of the model outputs, on to the canvas
 * Read our blog post for a description of PoseNet's offset vector outputs
 * https://medium.com/tensorflow/real-time-human-pose-estimation-in-the-browser-with-tensorflow-js-7dd0bc881cd5
 */
function drawOffsetVectors(
  heatMapValues, offsets, outputStride, scale = 1, ctx) {
  const offsetPoints = posenet.singlePose.getOffsetPoints(
    heatMapValues, outputStride, offsets);

  const heatmapData = heatMapValues.buffer().values;
  const offsetPointsData = offsetPoints.buffer().values;

  for (let i = 0; i < heatmapData.length; i += 2) {
    const heatmapY = heatmapData[i] * outputStride;
    const heatmapX = heatmapData[i + 1] * outputStride;
    const offsetPointY = offsetPointsData[i];
    const offsetPointX = offsetPointsData[i + 1];

    drawSegment([heatmapY, heatmapX], [offsetPointY, offsetPointX],
      color, scale, ctx);
  }
}



navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
// kick off the demo
bindPage();let positions = [];
let capture;

let scaleFactor = 0.50;
let flipHorizontal = false;
let outputStride = 16;
let imageElement;
let net;

function preload() {
  posenet.load().then(function(_net) {
    net = _net;
  });
}

function setup() {
  createCanvas(800, 600);
  capture = createCapture(VIDEO);
  capture.hide();
  imageElement = document.getElementsByTagName('video')[0];
  setInterval(getPose, 100);
}

function draw() {
  //background(220);
  // image(capture, 0, 0);
  for (let i = 0; i < positions.length; i++) {
    if(i > 0) break;
    let pos = positions[i];
    ellipse(pos.x, pos.y, 5, 5);
  }

  text(frameRate(), 10, 10);

}

function getPose() {
  // posenet model loaded
  net.estimateSinglePose(imageElement, scaleFactor, flipHorizontal, outputStride).then(function(pose) {
    console.log("NUM OF POSITIONS: " + pose.keypoints.length);
    positions = [];
    for (let i = 0; i < pose.keypoints.length; i++) {
      positions.push(pose.keypoints[i].position);
    }
  });
}let r, interval;
const NUM = 12;
const BASE = 440;
const RATE = .5 * 1000;
let lifespan = 60;
let people = [];
let notes = [];
let nindex = 0;
let lm = 0;

let center;
let isTone = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  center = createVector(width / 2, height / 2);
  r = width / 2;
  interval = TWO_PI / NUM;

  for (let n = 0; n < NUM; n++) {
    let a = n * TWO_PI / NUM;
    notes.push(new Note(a));
  }
}

function draw() {
  // Timer to pick which note to play NOW  
  // Check to see if it has people to play the note

  for (let n = 0; n < notes.length; n++) {
    let note = notes[n];
    note.display(n == nindex);
  }

}

function keyPressed() {
  switch (keyCode) {
    case RIGHT_ARROW:
      nindex++;
      break;
    case LEFT_ARROW:
      nindex--;
      break;
    case SHIFT:
      notes[nindex].play(!isTone);
      break;
    case ESCAPE:
      isTone = !isTone;
      for (let n = 0; n < notes.length; n++) {
        let note = notes[n];
        note.switch(isTone);
      }
  }

  if (nindex < 0) nindex = notes.length - 1;
  else if (nindex >= notes.length) nindex = 0;
}let r, interval;
const NUM = 12;
const BASE = 440;
const RATE = .5 * 1000;
let lifespan = 60;
let people = [];
let notes = [];
let nindex = 0;
let lm = 0;

let center;

function setup() {
  createCanvas(windowWidth, windowHeight);
  center = createVector(width / 2, height / 2);
  r = width / 2;
  interval = TWO_PI / NUM;

  for (let n = 0; n < NUM; n++) {
    let f = BASE + (n * BASE / NUM);
    let a = n * TWO_PI / NUM;
    notes.push(new Note(f, a));
  }
}

function draw() {
  // Timer to pick which note to play NOW  
  // Check to see if it has people to play the note

  for (let n = 0; n < notes.length; n++) {
    let note = notes[n];
    note.display(n == nindex);
  }

}

function keyPressed() {
  switch (keyCode) {
    case RIGHT_ARROW:
      nindex++;
      break;
    case LEFT_ARROW:
      nindex--;
      break;
    case SHIFT:
      notes[nindex].play(1);
      break;

  }
  nindex %= notes.length;
}let r, interval;
const NUM = 10;
const BASE = 440;
const RATE = 0.5 * 1000;
let lifespan = 60;
let people = [];
let notes = [];
let nindex = 0;
let lm = 0;

let center;

function setup() {
  createCanvas(windowWidth, windowHeight);
  center = createVector(width/2, height/2);
  r = width / 2;
  interval = TWO_PI / NUM;

  for (let n = 0; n < NUM; n++) {
		let s = loadSound("data/voices-" + n + ".mp3");
    let a = n * TWO_PI / NUM;
    notes.push(new Note(s, a));
  }
}

function draw() {
  // Timer to pick which note to play NOW  
  // Check to see if it has people to play the note

  if (millis() - lm > RATE) {
		lm = millis();
    for (let n = 0; n < notes.length; n++) {
      let note = notes[n];
      note.display(false);
    }
    nindex++;
    nindex %= notes.length;
    // Run the note
    notes[nindex].run(people);
    notes[nindex].display(true);
  }


  // Kill people
  for (let p = people.length - 1; p >= 0; p--) {
    let person = people[p];
    person.display();
    if (person.zap()) {
      people.splice(p, 1);
    }
  }

}

function mousePressed() {
  // Create new Person at mouseX, mouseY 
  people.push(new Person(mouseX, mouseY));
  console.log(people.length);
}let r, interval;
const NUM = 12;
const BASE = 440;
const RATE = .5 * 1000;
let lifespan = 60;
let people = [];
let notes = [];
let nindex = 0;
let lm = 0;

let center;

function setup() {
  createCanvas(windowWidth, windowHeight);
  center = createVector(width/2, height/2);
  r = width / 2;
  interval = TWO_PI / NUM;

  for (let n = 0; n < NUM; n++) {
    let f = BASE + (n * BASE / NUM);
    let a = n * TWO_PI / NUM;
    notes.push(new Note(f, a));
  }
}

function draw() {
  // Timer to pick which note to play NOW  
  // Check to see if it has people to play the note

  if (millis() - lm > RATE) {
		lm = millis();
    for (let n = 0; n < notes.length; n++) {
      let note = notes[n];
      note.display(false);
    }
    nindex++;
    nindex %= notes.length;
    // Run the note
    notes[nindex].run(people);
    notes[nindex].display(true);
  }


  // Kill people
  for (let p = people.length - 1; p >= 0; p--) {
    let person = people[p];
    person.display();
    if (person.zap()) people.splice(p, 1);
  }

}

function mousePressed() {
  // Create new Person at mouseX, mouseY 
  people.push(new Person(mouseX, mouseY));
}let num = 10;
let notes = [];
let w;

let walkers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  w = int(width / num);
  for (let n = 0; n < num; n++) {
    let s = loadSound("data/voices-" + n + ".mp3");
    notes.push(new Note(s, n * w, 0, w, height));
  }
  
  colorMode(HSB, 255);
}

function draw() {
  background(0);
  for (let n = 0; n < notes.length; n++) {
    let note = notes[n];
    note.run(walkers);
  }
  for (let w = 0; w < walkers.length; w++) {
    let walker = walkers[w];
    walker.run();
    if (!walker.contains(mouseX, mouseY)) walker.isBorn = true;
    else if (!walker.onScreen() || walker.contains(mouseX, mouseY) && walker.isBorn) {
      walkers.splice(w, 1);
    }
  }
}

function mousePressed() {
  walkers.push(new Walker(mouseX, mouseY));

}
let m1, m2;
let diag = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  m1 = new Mover(width * 0.25, height / 2);
  m2 = new Mover(width * 0.75, height / 2);
  diag = sqrt(sq(width) + sq(height));
}

function draw() {
  background(0);
  let mp = createVector();
  mp.add(m1.loc);
  mp.add(m2.loc);
  mp.div(2);
  let heading = p5.Vector.sub(m1.loc, m2.loc).heading();
  push()
  translate(mp.x, mp.y);
  rotate(heading + PI / 2);
  fill(255);
  noStroke();
  rect(-width, 0, diag * 2, diag * 2);
  pop();
  fill('red');
  ellipse(mp.x, mp.y, 10, 10);


  m1.update();
  m1.display();
  m2.update();
  m2.display();
}

function keyPressed() {
  switch (key) {
    case 'A':
      m1.vel.x = -1;
      break;
    case 'D':
      m1.vel.x = 1;
      break;
    case 'W':
      m1.vel.y = -1;
      break;
    case 'S':
      m1.vel.y = 1;
      break;
  }
  switch (keyCode) {
    case LEFT_ARROW:
      m2.vel.x = -1;
      break;
    case RIGHT_ARROW:
      m2.vel.x = 1;
      break;
    case UP_ARROW:
      m2.vel.y = -1;
      break;
    case DOWN_ARROW:
      m2.vel.y = 1;
      break;
  }
}

function keyReleased() {
  switch (key) {
    case 'A':
      m1.vel.x = 0;
      break;
    case 'D':
      m1.vel.x = 0;
      break;
    case 'W':
      m1.vel.y = 0;
      break;
    case 'S':
      m1.vel.y = 0;
      break;
  }
  switch (keyCode) {
    case LEFT_ARROW:
      m2.vel.x = 0;
      break;
    case RIGHT_ARROW:
      m2.vel.x = 0;
      break;
    case UP_ARROW:
      m2.vel.y = 0;
      break;
    case DOWN_ARROW:
      m2.vel.y = 0;
      break;
  }
}var sounds = [];
let s = 0;

function preload() {
  for (let i = 0; i < 10; i++) {
  	sounds.push(loadSound('buddha.wav'));
  }

  // disconnect the default connection
  // so that we only hear the sound via the reverb.process
  //soundFile.disconnect();
}

function setup() {
  createCanvas(720,100);
  background(0);

  reverb = new p5.Reverb();
  delay = new p5.Delay();

  // sonnects soundFile to reverb with a
  // reverbTime of 6 seconds, decayRate of 0.2%
  //reverb.process(soundFile, 1, 0.5);

  //reverb.amp(1); // turn it up!
  
  //delay.process(soundFile,  0.25, .5, 0);
}

function mousePressed() {
  s++;
  s%=sounds.length;
  sounds[s].loop();
  //soundFile.play();
}var words = ["i", "don't", "know", "why"]; // some words
var iptr = 0; // a counter for the words
var myVoice = new p5.Speech(); // new P5.Speech object
var listbutton; // button
let i = 0;

function setup() {
  // graphics stuff:
  createCanvas(400, 400);
  background(255, 0, 0);
  fill(255, 255, 255, 100);
  // instructions:
  textSize(72);
  textAlign(CENTER);
  text("click me", width / 2, height / 2);
  // button:
  listbutton = createButton('List Voices');
  listbutton.position(180, 430);
  listbutton.mousePressed(doList);
  // say hello:
  //myVoice.speak('yeah, baby!!!');
}

function draw() {
  // why draw when you can click?
}

function doList() {
  myVoice.listVoices(); // debug printer for voice options
}

function keyPressed() {
  background(255, 0, 0); // clear screen
}

let v = 0;
function keyPressed() {
  v++;
  v %= myVoice.voices.length;
}

function mousePressed() {
  myVoice.setVoice(v);
  myVoice.speak(words[i]);
  i++;
  i %= words.length;
  // if in bounds:
  // if (mouseX < width && mouseY < height) {
  // 	ellipse(mouseX, mouseY, 50, 50); // circle
  // 	// randomize voice and speak word:
  // 	myVoice.setVoice(Math.floor(random(myVoice.voices.length)));
  // 	myVoice.speak(words[iptr]);
  // 	iptr = (iptr + 1) % words.length; // increment
  // }
}let begin, len;
let tx = 0;
let ty = 0;
let ba = 0;
let la = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
  begin = createVector(width/2 - 125, height/2 - 125);
  len = createVector(250, 250);
}

function draw() {
  background(220);
  tx+= 0.01;
  ty+= 0.01;
  ba+=(noise(tx)-0.5)*0.001;
  la+=(noise(ty)-0.5)*0.001;
  //begin.rotate(ba);
	len.rotate(la);
  let end = p5.Vector.add(begin, len);
  line(begin.x, begin.y, end.x, end.y);
}// Moving the shark
let x = 0;
let tx = 0;
let bg = 255;

// Keeping track of voices
let maxVoices = 5;
let numVoices = 0;
let voices = [];

// Dartboard to control probabilities of
// adding voices and picking wave types
let vb;

// Pitches
let pitches = [];

function preload() {
  for (let i = 0; i < 6; i++) {
    pitches.push(new Pitch(loadSound('https://editor.p5js.org/mimi/sketches/SyUGaLylQ/' + i + '.mp3')));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(bg);
  noFill();

  // Create Dartboard
  vb = new Dartboard(maxVoices, 2);
  // Let's run the same set of random numbers every time
  //randomSeed(10);

  // Listen for messages to play and pause
  window.addEventListener("message", function(msg) {
    let action = JSON.parse(msg.data).method;
    console.log("ACTION: " + action);
    switch (action) {
      case 'pause':
        noLoop();
        for (let p = 0; p < pitches.length; p++) {
          pitches[p].setVolume(0, 5);
        }
        break;
      case 'play':
        loop();
        for (let p = 0; p < pitches.length; p++) {
          pitches[p].setVolume(1);
        }
        break;
    }
  }, false);
}

function draw() {
  // Wrap the visualization
  x++;
  if (x > width * (tx + 1)) {
    tx++;
    background(bg);
  }
  push();
  translate(-width * tx, 0);

  //IF THERE ARE ACTIVE VOICES...
  if (numVoices > 0) {
    //Check each voice to see if it's dead
    for (let i = maxVoices - 1; i >= 0; i--) {
      if (voices[i] == null) {
        continue;
      }
      if (voices[i].isDead()) {
        numVoices--;
        // Cue up some voices if one died
        cue();
      } else if (voices[i].run()) {
        run(i);
      }
    }
  }
  // Cue up some voices if there are none
  else {
    cue();
  }
  pop();
}

function run(v) {
  console.log("RUN", v);
  fill(0);
  let interval = height / (maxVoices + 1);
  rect(x, (v + 1) * (interval) - (interval / 2), 5, 10);
  pitches[v].play();
}

// Decide how many voices to add
function cue() {
  let numToAdd = vb.fire() + 1;
  console.log("CUE", numToAdd);
  if (numToAdd > 0) {
    add(numToAdd);
  }
}

// Add a voice to any "dead" spots in the chorus
function add(max) {
  let numToAdd = max - numVoices;
  console.log("ADD", numToAdd);
  if (numToAdd == 0) {
    return;
  }
  for (let v = 0; v < maxVoices; v++) {
    if (voices[v] == null || voices[v].isDead()) {
      if (numVoices >= numToAdd) {
        break;
      }
      voices[v] = new Voice(v);
      numVoices++;
      console.log("NUM ACTIVE VOICES: " + numVoices);
    }
  }
}let o_curtain, curtainSpeed;

let springs = [];
let squares = [];

let toss, t, m;
let bg, bgspeed;
let rFactor, gFactor, bFactor;
let rFactorSpeed, gFactorSpeed, bFactorSpeed;

let scaleX = 1;
let scaleY = 1;

let bach;

function preload() {
  bach = loadSound('bach.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  smooth();

  toss = 0;
  t = 0;

  m = 0;
  o_curtain = 0;
  curtainSpeed = 0.1;

  bg = random() * 255;
  bgspeed = 0.1;

  rFactor = random() * 1;
  rFactorSpeed = 0.001;
  gFactor = random() * 255;
  gFactorSpeed = 0.001;
  bFactor = random() * 2;
  bFactorSpeed = 0.001;
  
  // Listen for messages to play and pause
  window.addEventListener("message", function(msg) {
    let action = JSON.parse(msg.data).method;
    console.log("ACTION: " +  action);
    switch (action) {
      case 'pause':
        noLoop();
        bach.amp(0, 5);
        setTimeout(function(){
          bach.pause()
        }, 5000);
        break;
      case 'play':
        loop();
        bach.setVolume(1);
        bach.loop();
        break;
    }
  }, false);

  noStroke();
}

function draw() {
  scale(scaleX, scaleY);

  rFactor += rFactorSpeed;
  if (rFactor < 0 || rFactor > 1) rFactorSpeed *= -1;
  gFactor += gFactorSpeed;
  if (gFactor < 0 || gFactor > 255) gFactorSpeed *= -1;
  bFactor += bFactorSpeed
  if (bFactor < 1 || bFactor > 3) bFactorSpeed *= -1;

  bg += bgspeed;
  if (bg < 0 || bg > 255) bgspeed *= -1;
  bg = constrain(bg, 0, 255);

  background(bg * rFactor, gFactor - bg, bg / bFactor);

  //Create squares (at a slow rate)
  initialize();

  //Constantly change size, rotation, opacity and strength of springs for each square
  for (let i = 0; i < springs.length; i++) {
    let spring = springs[i];
    let square = squares[i];

    square.wave();
    square.turn();
    square.grow();
    square.fade();
    square.pull();

    let spring_force = spring.connect(square);
    square.applyForce(spring_force);

    square.update();
    square.display();

    //If squares reach right side of window, kill it.
    if (square.die() == true) {
      springs.splice(i, 1);
      squares.splice(i, 1);
    }
  }

  curtain();
}

function initialize() { // create new springs and squares at a controlled rate using toss
  toss = int(random(1000));
  if (toss % 33 == 0) {
    springs.push(new Spring((noise(t + random(10)) * width * -1), (noise(t + random(100)) * noise(t) * random(0.01))));
    squares.push(new Square((noise(t + random(100)) * 250)));
    t += random(-1, 5);
  }
}

function curtain() { // if music is playing, count seconds until...

  fill(gFactor - bg, bg / bFactor, bg * rFactor, o_curtain);
  rectMode(CORNER);
  rect(0, 0, width, height);
  o_curtain += curtainSpeed;
  if (o_curtain < 0 || o_curtain > 255) curtainSpeed *= -1;
  o_curtain = constrain(o_curtain, 0, 255);
}

function resize(_scaleX, _scaleY) {
  scaleX = _scaleX;
  scaleY = _scaleY;
}

class Spring {


  constructor(x_anchor, k) {
    this.x_anchor = x_anchor;
    this.anchor = createVector(this.x_anchor, height / 2);
    this.k = k;
    this.len = abs(this.x_anchor);
  }

  connect(square) { // calculate spring force, anchor position is set when created
    let spr_force = p5.Vector.sub(square.location, this.anchor);

    let d = spr_force.mag();
    let stretch = d - this.len;

    spr_force.normalize();
    spr_force.mult(-1 * this.k * stretch);

    return spr_force;
  }
}

class Square {

  constructor(amp) {
    this.location = createVector(0, height / 2);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);

    this.freq = 1;
    this.amp = amp;

    this.c_angle = radians(0);
    this.r_angle = radians(0);

    this.w_square = 0;
    this.h_square = 0;
    this.o_square = 0;

  }

  wave() { // move the square up and down according to sine wave
    this.location.y = height / 2 + (sin(this.c_angle) * this.amp); // amplitude of wave is set when square is created

    this.c_angle += .01 * this.freq; // increase angle
    this.freq = noise(t) * 10; // frequence fluctuates every time through draw
  }

  turn() { // turn the square
    this.r_angle -= noise(t) * random(0.375);
  }

  grow() { // grow the square
    this.w_square += noise(t) * random(-10, 10);
    this.h_square += noise(t) * random(-10, 10);

    this.w_square = constrain(this.w_square, 0, 50); // constrain square size
    this.h_square = constrain(this.h_square, 0, 50);
  }

  fade() { // fade the square
    this.o_square += noise(t) * random(-10, 10);
    this.o_square = constrain(this.o_square, 100, 255);
  }

  pull() { // pull the square (equivalent to pulling the bob on the spring)
    this.acceleration.x = sin(this.r_angle) * noise(t) * random(-3, 5);
  }

  die() { // kill the square if it exits to the right

    if (this.location.x > width) {
      return true;
    }

    return false;
  }

  applyForce(spr_force) { // apply spring force
    let app_force = spr_force.copy();
    this.acceleration.add(app_force);
  }

  update() { // update location, vel and re-set acceleration
    this.location.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.acceleration.mult(0);
  }

  display() { // draw the square

    push();
    translate(this.location.x, this.location.y);
    rotate(this.r_angle);

    rectMode(CENTER);
    noStroke();
    fill(gFactor - bg, bg * rFactor, bg * bFactor, this.o_square);

    rect(0, 0, this.w_square, this.h_square);

    pop();
  }
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}let cam;

function setup() {
  createCanvas(1280, 720);
	cam = createCapture(VIDEO);
  cam.size(320, 240);
}

function draw() {
  background(0);
	cam.loadPixels();
  image(cam, 0, 0);
  for (let i = 0; i < cam.pixels.length; i++) {
    let b = brightness(cam.pixels[i]);
    //println(b);
  }
	fill(255);
  textSize(18);
  text(frameRate() + ":   " + cam.width, 50, 50);
}// Curve describing the balls dropping in
// Curve describing when to noodle versus go straight

// Curve describing how many layers of rhythm
// Linear positive slope - increases probability of adding a layer of rhythm
// Mostly overlapping extremely long sine waves to shift the rhythms slowly

// User's movement sets off horrific screech

let playing = false;

let scales, scale, areas, ratios;
let mult = 1;
let TOTAL_OCTAVES = 5;
let BASE = 110;
let numOctaves = 3;
let ow = 100;
let stepSize = 0.00001;

let keyboard = [];
let balls = [];

let speed = 0;
let diag = 0;

let replay = true;

let record;
let rpdata;
let rp = 0;

let button, p;
let start = 0;

function preload() {
  scales = loadJSON('https://editor.p5js.org/sketches/HklZ3xNjM/assets/scales.json');
  record = loadJSON('https://editor.p5js.org/sketches/HklZ3xNjM/assets/record.json');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);

  scale = scales.scales.chromatic;
  areas = scales.areas;
  ratios = scales.ratios;

  rpdata = record.data;

  diag = sqrt(sq(width) + sq(height));

  reset();
  calcRatios();

  noiseSeed(0);
  randomSeed(0);

  colorMode(HSB, 100);

  button = select('button');
  button.mouseClicked(toggleReplay);

  p = select('p');

  // Listen for messages to play and pause
  // Listen for messages to play and pause
  window.addEventListener("message", function(msg) {
    let action = JSON.parse(msg.data).method;
    console.log("ACTION: " + action);
    switch (action) {
      case 'pause':
        noLoop();
        for (let o = 0; o < keyboard.length; o++) {
          let octave = keyboard[o];
          let y = height;
          for (let n = 0; n < octave.length; n++) {
            let note = keyboard[o][n];
            note.note.amp(0, 5);
            setTimeout(function(){
              note.note.stop();
            }, 5000);
          }
        }
        break;
      case 'play':
        loop();
        break;
    }
  }, false);

}

function toggleReplay() {
  replay = !replay;
  if (replay) start = millis();
  button.html(replay ? 'AUTO-PLAY: ON' : 'AUTO-PLAY: OFF');
  p.html(replay ? '6 minutes of pre-recorded data will begin shortly.' : 'Move mouse to trigger pitches. The faster you move, the more pitches you will create.');

}

function reset() {
  ow = width / numOctaves;
}

function draw() {
  background(0);

  if (replay) {
    //console.log("REPLAY!");
    if (start + millis() > rpdata[rp].m) {
      addBalls(rpdata[rp].num);
      rp++;
      if (rp >= rpdata.length - 1) replay = false;
    }
  }

  for (let o = 0; o < keyboard.length; o++) {
    let octave = keyboard[o];
    for (let n = 0; n < octave.length; n++) {
      let note = keyboard[o][n];
      note.run(balls);
      updateRelativeNotes(n, note);
    }
  }

  // Update multiplier
  let sum = 0;
  let octave = keyboard[0];
  for (let n = 0; n < octave.length; n++) {
    let note = octave[n];
    sum += note._rh;
  }
  mult = height / sum;

  // Update keyboard
  for (let o = 0; o < keyboard.length; o++) {
    let octave = keyboard[o];
    let y = height;
    for (let n = 0; n < octave.length; n++) {
      let note = keyboard[o][n];
      y -= note._rh * mult;
      note.update(y);
    }
  }

  for (let b = balls.length - 1; b >= 0; b--) {
    let ball = balls[b];
    ball.run();
    if (ball.died()) balls.splice(b, 1);
  }
}

// Paramaters are tonic index and tonic note.
function updateRelativeNotes(t, tn) {
  if (tn.counter <= 0) return;
  // Iterate through ALL the keyboard again for each note.
  for (let o = 0; o < keyboard.length; o++) {
    let octave = keyboard[o];
    for (let n = 0; n < octave.length; n++) {
      let note = keyboard[o][n];
      // Calculate the relative note
      let rn = n >= t ? n - t : (n + (octave.length - 1)) - t;
      let h = (areas[rn] - note.h);
      note.modulate(areas[rn], tn.counter * stepSize);
    }
  }
}

function calcRatios() {
  // Calculate scale of areas based on total height of window
  let sum = 0;
  for (let s = 0; s < scale.length; s++) {
    sum += areas[s];
  }

  mult = height / sum;

  for (let o = 0; o < TOTAL_OCTAVES; o++) {
    keyboard[o] = [];
    let y = height;
    for (let s = 0; s < scale.length; s++) {
      let ratio = ratios[s].n / ratios[s].d;
      let freq = BASE * ratio * pow(2, o);
      let h = areas[s];
      y -= h * mult;
      keyboard[o].push(new Note(freq, o, y, h));
    }
  }
}

function mouseMoved() {
  // Don't create new balls if replaying
  if (replay) return;
  speed += dist(pmouseX, pmouseY, mouseX, mouseY) / diag;
  if (speed > 1) {
    addBalls(speed);
    speed = 0;
  }
}

function addBalls(num) {
  for (let i = 0; i < num; i++) {
    balls.push(new Ball(random(width), random(height), 20, 20, 0, random(-5, 5), 300 * num));
  }
}let data = [];
let num = 10;
let MIN, MAX;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  // Generate some fake data
  // Set range of data
  MIN = 10;
  MAX = height / num;
  for (let i = 0; i < num; i++) {
    let d = random(MIN, MAX);
    data.push(d);
  }

  // Plot data evenly across the screen
  let colW = width / data.length;
  fill(0);
  for (let i = 0; i < data.length; i++) {
    let x = (i * colW) + colW / 2;
    let y = data[i];
    ellipse(x, y, 10, 10);
  }

  // ADD DATA
  // Who matters?
  // Depending on how you use this data, it can
  // either be easy for 1 person to carry everyone,
  // or everyone has to contribute to meet the goal.
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += data[i];
  }
  line(0, sum, width, sum);
  text("ADD", 10, sum);

  // MEAN (AVERAGE)
  // Who matters?
  // The majority rather than the minority.
  let mean = sum / data.length;
  line(0, mean, width, mean);
  text("MEAN", 50, mean);

  // FIND MIDPOINT
  // Who matters?
  // Only the highest and lowest values matter.
  let minD = MAX;
  let maxD = MIN;
  for (let i = 0; i < data.length; i++) {
    let d = data[i];
    if (d < minD) minD = d;
    if (d > maxD) maxD = d;
  }
  let midpoint = (minD + maxD) / 2;
  line(0, midpoint, width, midpoint);
  text("MIDPOINT", 100, midpoint);

  // ADD ABOVE MEAN, SUBTRACT BELOW MEAN
  // Who matters?
  // Values above the F mark contribute.
  // Values below the F mark take away.
  let addSubtract = 0;
  let F = 0.65*MAX;
  for (let i = 0; i < data.length; i++) {
    let d = data[i];
    if (d >= F) addSubtract += d;
    else addSubtract -= d;
  }
  line(0, addSubtract, width, addSubtract);
  text("ADD/SUBTRACT", 150, addSubtract);

  // AVG DEVIATION FROM THE MEAN
  // Who  matters?
  // Outliers. It doesn't matter how high or low your value is,
  // what counts is staying in sync with everyone else. Therefore
  // anyone not in sync with the group has a big impact.
  let sumDeviation = 0;
  for (let i = 0; i < data.length; i++) {
    let deviation = abs(data[i] - mean);
    sumDeviation += deviation;
  }
  let avgDeviation = sumDeviation / data.length;
  line(0, avgDeviation, width, avgDeviation);
  text("AVG DEVIATION", 250, avgDeviation);

  // SQUARE IT, MEAN IT
  // Who  matters?
  // Higher values have more weight.
  let sqSum = 0;
  for (let i = 0; i < data.length; i++) {
    let d = data[i];
    // Scale the value to the range of data, otherwise
    // the number will be off-the-charts huge
    sqSum += ((d * d) / (MAX * MAX)) * MAX;
  }
  let sqmean = sqSum / data.length;
  line(0, sqmean, width, sqmean);
  text("MEAN OF SQUARES", width - 150, sqmean);

}
/*
Mimi Yin NYU-ITP
Trisect space.
Horizontal and Vertical.
*/


var moving = false;
var horizontal = true;
var w, h;

function setup() {
  createCanvas(windowWidth, windowHeight);
  w = 0;
  h = 0;
  wspeed = 0.1;
  hspeed = 0.1;
  noStroke();
  rectMode(CENTER);
}

function draw() {
  background(0);

  fill(255);
  
  // Change width and height
  w += wspeed;
  h += hspeed;
  
  if(w < 0 || w > width/2) wspeed *= -1;
  if(h < 0 || h > height/2) hspeed *= -1;
	
  // Draw the cells
  if (horizontal) rect(width/2, height/2, width, h);
  else rect(width/2, height/2, w, height);
}

function keyPressed() {
  // Adjust number of columns and rows
  // ESC inverts black and white
  switch (keyCode) {
    case ESCAPE:
      horizontal = !horizontal;
      w = 0;
      h = 0;
      break;
  }

  // Limit cols/rows to 0-10
  w = constrain(w, 0, width);
  h = constrain(h, 0, height);
}var sz = 0;
var invert = true;

function setup() { 
  createCanvas(windowWidth, windowHeight);
  noStroke();
} 

function draw() { 
  background(invert ? 0: 255);
  sz+=0.25;
  fill(invert ? 255: 0);
  ellipse(0, 0, sz, sz);
}

// Invert black and white
function mousePressed(){
 invert = !invert; 
}

var cols = 2;
var rows = 1;
var colW, rowH;
var invert = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  init();
  noStroke();
}

function draw() {
  background(0);

  // Draw the cells
  for (var col = 0; col < cols; col++) {
    for (var row = 0; row < rows; row++) {
      if ((col % 2 == 0 && row % 2 == 1) || (col % 2 == 1 && row % 2 == 0)) fill(invert ? 255 : 0);
      else fill(invert ? 0 : 255);

      // Calculate x,y location of each cell
      var x = col * colW;
      var y = row * rowH;
      rect(x, y, colW, rowH);
    }
  }
}

// Set column width and row height based on num of cols and rows.
function init() {
  colW = width / cols;
  rowH = height / rows;
}

function keyPressed() {
  // Adjust number of columns and rows
  // ESC inverts black and white
  switch (keyCode) {
    case ESCAPE:
      invert = !invert;
      break;
    case RIGHT_ARROW:
      cols++;
      break;
    case LEFT_ARROW:
      cols--;
      break;
    case UP_ARROW:
      rows++;
      break;
    case DOWN_ARROW:
      rows--;
      break;
  }

  // Limit cols/rows to 0-10
  cols = constrain(cols, 0, 10);
  rows = constrain(rows, 0, 10);

  // Re-initialize colW and rowH
  init();

}/* Mimi Yin, NYU-ITP
Linear motion with controls
Distance of mouse from center of screen controls speed.
Direction of mouse from center of screen controls direction.
*/

// Variables to store x,y coordinates of current position
let x, y
  // Variables to store x,y coordinates of previous position
let px, py;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Initial position is center
  x = width / 2;
  y = height / 2;

  background(0);
}

function draw() {
  // Draw very transparent background every frame
  // to create fade-out effect
  background(0, 10);

  //Distance of mouse from center of screen controls speed.
  //Direction of mouse from center of screen controls direction.
  x += ((mouseX - (width / 2)) / width) * 50;
  y += ((mouseY - (height / 2)) / height) * 50;

  // Set fill color to white
  stroke(255);
  // Draw a circle at x,y
  line(px, py, x, y);

  // Remember current position as previous position for next frame
  px = x;
  py = y;

  // Draw a landmark in the center
  fill(255);
  rect(width / 2, height / 2, 10, 10);
}

// Start new line wherever mouse is
function mousePressed() {
  background(0);
  x = mouseX;
  y = mouseY;
}let tempos = [25, 40, 70, 90, 110, 135, 165, 180, 240];


let t = 0;
let bpm;
let beat;

function preload() {
 beat = loadSound('clock.mp3'); 
}

function setup() {
  createCanvas(400, 400);
  setTempo();
  textAlign(CENTER, CENTER);
  textSize(64);
  frameRate(30);
}

function draw() {
  background(0);
  if(frameCount%int(30*60/bpm) == 0) {
    background(255);
    beat.play();
  }
  fill(255);
  text(t, width/2, height/2);
}

function keyPressed() {
  t++;
  t %= tempos.length;
  setTempo();
}

function setTempo() {
  bpm = tempos[t];
}let tempos = [{
    name: 'Grave',
    bpm: 25
  },
  {
    name: 'Largo',
    bpm: 40
  },
  {
    name: 'Adagio',
    bpm: 70
  },
  {
    name: 'Andante',
    bpm: 90
  },
  {
    name: 'Moderato',
    bpm: 110
  },
  {
    name: 'Allegro',
    bpm: 135
  },
  {
    name: 'Vivace',
    bpm: 165
  },
  {
    name: 'Presto',
    bpm: 180
  },
  {
    name: 'Prestissimo',
    bpm: 240
  },
];

let t = 0;
let tempo, bpm;
let beat;

function preload() {
 beat = loadSound('clock.mp3'); 
}

function setup() {
  createCanvas(400, 400);
  setTempo();
  textAlign(CENTER, CENTER);
  textSize(64);
  frameRate(30);
}

function draw() {
  background(0);
  if(frameCount%int(30*60/bpm) == 0) {
    background(255);
    beat.play();
  }
  fill(255);
  text(tempo, width/2, height/2);
}

function keyPressed() {
  t++;
  t %= tempos.length;
  setTempo();
}

function setTempo() {
  tempo = tempos[t].name;
  bpm = tempos[t].bpm;
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  // Happens about 1x per second
  if(frameCount%60 == 0) {
   console.log("SAY HEY!"); 
  }
  // Happens 1x at about 5 seconds
  if(frameCount == 300) {
   console.log("SAY YIPPEE"); 
  }
  // Happens about 60x per second after about 10 seconds
  if(frameCount > 600) {
   console.log("SAY YO"); 
  }
}let chalks = [];
let d, e;

function preload() {
  for (let i = 0; i < 2; i++) {
    chalks.push(loadSound("eggsoft.wav"));
  }
}

function setup() {
  createCanvas(400, 400);
  nudge();
  //chalk.disconnect();
  //d = new p5.Delay();
  //e = new p5.Env();
}

let x = 0;

function draw() {
  if (random(1) < 0.01) {
    print("NUDGE");
    nudge();
  }

  background(220);
  x++;
  x %= width;
  //d.process(chalk, 0.9, 0.1, 2300);
  fill(0);
  ellipse(x, height / 2, 10, 10);
}

function nudge() {
    for (let i = 0; i < chalks.length; i++) {
      chalks[i].playMode('restart');
      chalks[i].loop(0, 1, 1, noise(frameCount*0.01) + 0.25, noise(frameCount*0.02) + 5);
    }  
}let pauls = [];
let rs = [];

function preload() {
  for (let i = 0; i < 10; i++) {
    pauls.push(createImg("giphy.gif"));
    rs.push(random(600, 800));
  }
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);
  for (let i = 0; i < 10; i++) {
      let div = createDiv();
      div.child(pauls[i]);
  //   pauls[i].style("top", floor(random(width)) + "px");
  //   pauls[i].style("left", floor(random(height)) + "px");
  }
}

function draw() {
  background(220);
  for (let i = 0; i < pauls.length; i++) {
    pauls[i].size(rs[i] * mouseX / width, rs[i] * mouseY / height);
  }
}let balls;
let diag;

function setup() {
  createCanvas(windowWidth, windowHeight);
	reset();
  noStroke();
  rectMode(CENTER);
  diag = sqrt(sq(width) + sq(height));
}

function draw() {
  background(0);
  
  let ball0 = createVector(balls[0].x, balls[0].y);
  let ball1 = createVector(balls[1].x, balls[1].y);
  
  let heading = p5.Vector.sub(ball0, ball1).heading();
  let d = p5.Vector.dist(ball0, ball1);
  let midpoint = p5.Vector.add(ball0, ball1).div(2);
  
  push();
  translate(midpoint.x, midpoint.y);
  rotate(heading + PI);
  fill(255);
  rect(0, 0, d, diag*10);
  pop();

  textAlign(RIGHT, CENTER);
  fill(255);
  text("Click mouse for new configuration.", width- 10, height / 2 - 50);

  for (let b = 0; b < balls.length; b++) {
    balls[b].run();
  }

}

function reset(){
  balls = [];
  let r = random(width);
  for (let i = 0; i < 2; i++) {
    balls.push(new Ball(r + random(-10, 10), height / 2, random(-1, 1), random(-1, 1)));
  }
}

function mousePressed(){
  reset();
}

class Ball {
  constructor(x, y, xspeed, yspeed) {
    // Defensive Driving
    this.x = x;
    this.y = y;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
    this.color = {
      r: random(255),
      g: random(255),
      b: random(255)
    };
    this.divx = random(2,4);
    this.divy = random(2,4);
  }

  run() {
    this.update();
    this.display();
  }

  update() {
    let t = frameCount*0.01;
    this.x = cos(t)*this.xspeed*width/this.divx + width/2;
    this.y = sin(t)*this.yspeed*width/this.divy + height/2;
  }
  display() {
    fill(this.color.r, this.color.g, this.color.b);
    ellipse(this.x, this.y, 25, 25);
  }
}

function bounce(position, speed, min, max) {
  if (position < min || position > max) {
    speed *= -1;
  }
  return speed;
}let balls;

function setup() {
  createCanvas(windowWidth, windowHeight);
	reset();
  noStroke();
}

function draw() {
  background(0);
  
  fill(255);
  rect(balls[0].x, 0, balls[1].x-balls[0].x, height);

  textAlign(RIGHT, CENTER);
  fill(255);
  text("Click mouse for new configuration.", width- 10, height / 2 - 50);

  for (let b = 0; b < balls.length; b++) {
    balls[b].run();
  }

}

function reset(){
  balls = [];
  let r = random(width);
  for (let b = 0; b < 2; b++) {
    balls.push(new Ball(r + random(-100, 100), height / 2, random(-2, 2), 0));
  }
}

function mousePressed(){
  reset();
}

class Ball {
  constructor(x, y, xspeed, yspeed) {
    // Defensive Driving
    this.x = x;
    this.y = y;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
    this.color = {
      r: random(255),
      g: random(255),
      b: random(255)
    };
  }

  run() {
    this.update();
    this.display();
  }

  update() {
    this.xspeed = bounce(this.x, this.xspeed, 0, width);
    this.yspeed = bounce(this.y, this.yspeed, 0, height);
    this.x += this.xspeed;
    this.y += this.yspeed;
  }
  display() {
    fill(this.color.r, this.color.g, this.color.b);
    ellipse(this.x, this.y, 25, 25);
  }
}

function bounce(position, speed, min, max) {
  if (position < min || position > max) {
    speed *= -1;
  }
  return speed;
}let balls;
let midpoint;

function setup() {
  createCanvas(windowWidth, windowHeight);
  reset();
  noStroke();
}

function draw() {
  background(0);

  textAlign(RIGHT, CENTER);
  fill(255);
  text("Click mouse for new configuration.", width - 10, height / 2 - 50);

  midpoint = createVector();
  for (let b = 0; b < balls.length; b++) {
    balls[b].update();
    let ball = createVector(balls[b].x, balls[b].y);
    midpoint.add(ball);
  }
  midpoint.div(balls.length);

  fill(255);
  rect(0, 0, midpoint.x, height);

  fill(255, 0, 0);
  ellipse(midpoint.x, midpoint.y, 10, 10);

  for (let b = 0; b < balls.length; b++) {
    balls[b].display();
  }

}

function reset() {
  balls = [];
  let r = random(width);
  for (let b = 0; b < 2; b++) {
    balls.push(new Ball(r + random(-100, 100), height / 2, random(-2, 2), 0));
  }
}

function mousePressed() {
  reset();
}

class Ball {
  constructor(x, y, xspeed, yspeed) {
    // Defensive Driving
    this.x = x;
    this.y = y;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
    this.color = {
      r: random(255),
      g: random(255),
      b: random(255)
    };
  }

  run() {
    this.update();
    this.display();
  }

  update() {
    this.xspeed = bounce(this.x, this.xspeed, 0, width);
    this.yspeed = bounce(this.y, this.yspeed, 0, height);
    this.x += this.xspeed;
    this.y += this.yspeed;
  }
  display() {
    fill(this.color.r, this.color.g, this.color.b);
    ellipse(this.x, this.y, 25, 25);
  }
}

function bounce(position, speed, min, max) {
  if (position < min || position > max) {
    speed *= -1;
  }
  return speed;
}function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // register event handler to position anytime it changes
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(updatePosition);
  } else {
    alert("navigator.geolocation is not available");
  }
}

function updatePosition(position) {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  background(0);
  fill(255);
  background(0);
  textSize(32);
  text(nf(lat,2,2) + " " + nf(lng,2,2), 10, 50);
}function setup() {
  createCanvas(400, 400);
  print("HI", frameCount);
}

function draw() {
  background(220);
  ellipse(width / 2, height / 2, 50, 50);
  if (frameCount %= 120) {
    console.log("HI", frameCount);
  }
}// How many octaves do we want?
let numOctaves = 1;
// Calculate number of notes based on scale being use and num of octaves
let numNotes = 0;
// Array to hold Note objects
let notes = [];
// Array to load freq data
let data = [];
// Sizing scale
let scl = 0;
// Balls
let balls = [];

function preload() {
  data = loadStrings('notes.csv');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  calcRatios();
  for (let b = 0; b < 2; b++) {
    balls.push(new Ball(width / 2, random(height), 20, 20, 0, random(-5, 5)));
  }
}

function draw() {
  background(255)
  // Run all the notes across all the octaves
  // Check to see if there are any balls in any of the notes
  for (var n = 0; n < notes.length; n++) {
    for (var m = 0; m < numNotes; m++) {
      notes[n][m].run(balls);
    }
  }
	
  // Run the balls
  for (let b = 0; b < balls.length; b++) {
    let ball = balls[b];
    ball.run();
  }
}

// Calculate frequences for notes
// Create note objects
function calcRatios() {
  var baseIndex = 3;
  var base;
	
  // Make it so frequences go from lowest to highest
  data.reverse();
  // Pick the lowest note - C, 4 octaves up
  base = data[baseIndex] * 2;

  // Western Scale with weights
  var sel = {
    3: 2,
    5: .34,
    7: .67,
    8: 1,
    10: 1.5,
    12: .5,
    14: .17,
    15: 2
  };
	
  // We're going to scale the notes by tonal weight
  // Calculate the height of the smallest note
  let sum = 0;
  for (var s in sel) {
    sum += sel[s];
  }
  scl = height / sum;
	
  // Calculate the frequences of the notes as a multiple of the base
  let ratios = {};
  for (var s in sel) {
    var r = data[s] / data[baseIndex];
    ratios[s] = r;
    numNotes++;
  }
	
  // Create note objects with frequency and position
  let ow = 100;
  let x = width / 2 - ow / 2;
  for (var o = 0; o < numOctaves; o++) {
    notes[o] = [];
    var y = height;
    for (var s in sel) {
      var ratio = ratios[s];
      var freq = base * pow(2, 3) * ratio;
      var diff = sel[s]; //ratio-pratio;
      var h = diff * scl;
      y -= h;
      notes[o].push(new Note(freq, x, y, ow, h));
    }
    x += ow;
  }
}let video;
let m = 10;

function setup() {
  createCanvas(320,240);
  background(0);
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();
  
  background(255);
}

function draw() {
  // Show video
  copy(video, mouseX-m, mouseY-m, m*2, m*2, mouseX-m, mouseY-m, m*2, m*2);
}/**
 *  @name Reverb
 *  @description Reverb gives depth and perceived space to a sound. Here,
 *  noise is processed with reverb.
 *
 * <p><em><span class="small"> To run this example locally, you will need the
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.sound library</a>
 * a sound file, and a running <a href="https://github.com/processing/p5.js/wiki/Local-server">local server</a>.</span></em></p>
 */
var sound, reverb;

function preload() {
  soundFormats('mp3', 'ogg');
  soundFile = loadSound('assets/Damscray_DancingTiger');

  // disconnect the default connection
  // so that we only hear the sound via the reverb.process
  soundFile.disconnect();
}

function setup() {
  createCanvas(innerWidth,100);
  background(0);

  reverb = new p5.Reverb();

  // sonnects soundFile to reverb with a
  // reverbTime of 6 seconds, decayRate of 0.2%
  reverb.process(soundFile, 6, 0.2);

  reverb.amp(4); // turn it up!
}

function mousePressed() {
  soundFile.play();
}

function setup() { 
  createCanvas(400, 400);
//   let str = "A dog jumped.";
//   console.log(str.length);
//   console.log(str.indexOf('g'));
//   console.log(str.charAt(4));
  
//   console.log(h + a + g);
//   console.log("Helloandgoodbye");
  
  let a = 10;
  let b = 20;
  let c = add(a, b);
  console.log(a + "+" + b + "=" + c);
} 

function draw() { 
  background(220);
}

function add(a, b) {
 return a + b;
}
// Declare a "SerialPort" object
let serial;
let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem1411");
  serial.on('data', gotData);
}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readLine(); // read the incoming string
  trim(currentString); // remove any trailing whitespace
  if (!currentString) return; // if the string is empty, do no more
  console.log("DATA: " + currentString); // println the string
  latestData = currentString; // save it for the draw method
}

function draw() {
 
}//Documentation of String object
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String

function setup() { 
  createCanvas(400, 400);
  //let str = "hello";
  console.log(str.length);
  console.log(str.charAt(2));
  console.log(str.indexOf('l'));
} 

function draw() { 
  background(220);
}function setup() { 
  createCanvas(400, 400);
  let a = 3;
  let b = 5;
  console.log(add(a, b));
  console.log(a + "+" + b + "=" + add(a,b));
} 

function draw() { 
  background(220);
}

function add(a, b) {
 return a + b; 
}let mic;
let fft;
function setup(){
  mic = new p5.AudioIn()
  mic.start();
  fft = new p5.FFT();
}
function draw(){
  background(0);
  micLevel = mic.getLevel();
  ellipse(width/2, constrain(height-micLevel*height*5, 0, height), 10, 10);

  var spectrum = fft.analyze();
  noStroke();
  fill(0,255,0); // spectrum is green
  for (var i = 0; i< spectrum.length; i++){
    var x = map(i, 0, spectrum.length, 0, width);
    var h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h )
  }

  var waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(255,0,0); // waveform is red
  strokeWeight(1);
  for (var i = 0; i< waveform.length; i++){
    var x = map(i, 0, waveform.length, 0, width);
    var y = map( waveform[i], -1, 1, 0, height);
    vertex(x,y);
  }
  endShape();

}var serial; // variable to hold an instance of the serialport library
var sensorValue = 0;		// ellipse position
var lowest = 1000;
var highest = 0;

function setup() {
  createCanvas(600, 600);
  serial = new p5.SerialPort();  // make a new instance of  serialport library
  serial.on('list', printList);  // callback function for serialport list event
  serial.on('data', serialEvent);// callback for new data coming in
	serial.list();                         // list the serial ports
	serial.open("/dev/cu.AdafruitEZ-Link74b6-SPP"); // open a port
  setInterval(function(){ serial.write('BUZZ') }, 1000);
}

function draw() {
  background('blue');
  fill(255);
  strokeWeight(0);
  text(sensorValue, 20, 20);
	
  // Find the min/max of sensor readings.
  if(sensorValue < lowest && sensorValue > 0) lowest = sensorValue;
  if(sensorValue > highest) highest = sensorValue;
  
  //if(frameCount%60 == 0) println(lowest + "\t" + highest);
  
  // Variable controlling face
  var v = map(sensorValue, lowest, highest, 0, width);
	ellipse(v, height/2, 20, 20);
  
  fill(255, 0, 0);
  strokeWeight(10);
  noFill();
  // Left Eye
  ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);

  // Right Eye
  ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);

  // Nose
  bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);
	
  // Mouth
  bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
}

// get the list of ports:
function printList(portList) {
 for (var i = 0; i < portList.length; i++) {
	// Display the list the console:
 	println(i + " " + portList[i]);
 }
}

function serialEvent() {
	var inString = serial.readLine();
	if (inString.length > 0) {
	  sensorValue = inString.trim();
	}
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

  // Nose
  v+=random(-5, 5);
  bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);

}
// http://developer.nytimes.com
var trumpys = [];
var ts = 16;
var t = 0;

function setup() {
  //noCanvas();
  //noLoop();
  createCanvas(800, 800);
  //noStroke();
  fill(0);
  var url = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=trump&api-key=5fcc7b03d74d15972346cf84719ad5e5:13:68130021";
  loadJSON(url, showSnippets);
}

function draw() {
  console.log(trumpys.length);
  background(255, 5);
  ts++;
  ts%=48;
  if(trumpys.length > 0) {
  t+=1;
  t%=trumpys.length;
//  for(var i = 0; i < trumpys.length; i++) {
    textSize(ts);
    text(trumpys[floor(t)], random(width), random(height));
  //}
  }
}

function showSnippets(data) {
  //console.log(data);
  var docs = data.response.docs;
  var trumps = ["Trumpy", "McTrumpFace", "Trumperson", "Trump Trump"];
  var allTokens = [];
  for (var i=0; i<docs.length; i++) {
    var tokens = splitTokens(docs[i].snippet);
    shuffle(tokens, true);
    // console.log(tokens.length);
    for(var j = 0; j < tokens.length; j++) {
      if(random(1) < .25) {
        tokens.splice(j, 0, trumps[floor(random(trumps.length))]);
      }
    }
    allTokens = concat(allTokens, tokens);
    //createP(join(allTokens, " "));
  }
    trumpys = allTokens;
}// Declare a "SerialPort" object
var serial;
var latestData = "waiting for data";  // you'll use this to write incoming data to the canvas

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Get a list the ports available
  // You should have a callback defined to see the results
  serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/cu.usbmodem1421");

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
  var mappedVar = map(latestData, 490,540,0,width);
  //var mappedVar = map(latestData, 400,950,0,width);
  ellipse(mappedVar, 100, 50, 50);
  text(latestData, 10, 10);
}// Declare a "SerialPort" object
let serial;
let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem1411");
  serial.on('data', gotData);

}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.read(); // read the incoming string
  // trim(currentString); // remove any trailing whitespace
  // if (!currentString) return; // if the string is empty, do no more
  // console.log(currentString); // println the string
  // latestData = currentString; // save it for the draw method
  console.log('\t' + currentString);
}

function draw() {
  // background(255, 255, 255);
  // fill(0, 0, 0);
  // //var mappedVar = map(latestData, 490,540,0,width);
  // var mappedVar = map(latestData, 300, 400, 0, width);
  // ellipse(mappedVar, 100, 50, 50);
  // text(latestData, 10, 10);
}let txt;
let tokens = [];

function preload() {
  txt = loadStrings("joke.txt");
  console.log(txt);
}

function setup() {
  createCanvas(1280, 800);
  // Iterate through each line of text
  for (let l of txt) {
    // Split the line into an array of words
    // Append it to the end of the tokens array.
    tokens = concat(tokens, splitTokens(l));
  }
  console.log(tokens);
}

function draw() {
  background(220);
	
  // Loop through the words and draw them in a staircase
  // Words get bigger as you progress along the string
  let y = 0;
  let x = 0;
  for (let i = 0; i < tokens.length; i++) {
    textSize(i * 10 + 10);
    y += textAscent() + textDescent();
    text(tokens[i], x, y);
    x += textWidth(tokens[i]);
  }
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(255, 0, 0);
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}let balls = [];

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 50; i++) {
    balls.push(new Ball(random(width), random(height), random(-5, 5), random(-5, 5)));
  }
}

function draw() {
  background(0);
  
  for (let b = balls.length-1; b >=0; b--) {
    //for (let b = 0; b < balls.length; b++) {
    if(!balls[b]) continue;
    balls[b].run();
    for (let c = balls.length-1; c >=0; c--) {
      //for (let c = 0; c < balls.length; c++) {
        if (b == c) continue;
        if (balls[b].isNear(balls[c])) {
          balls.splice(b, 1);
          //if (b < c) c--;
          balls.splice(c, 1);
          break;
        }
      }
    }
  }

  function mousePressed() {
    balls.push(new Ball(mouseX, mouseY, random(-5, 5), random(-5, 5)));
  }


  class Ball {
    constructor(x, y, xspeed, yspeed) {
      // Defensive Driving
      this.x = x;
      this.y = y;
      this.xspeed = xspeed;
      this.yspeed = yspeed;
      this.color = {
        r: 255,
        g: 255,
        b: 255
      };
    }

    run() {
      this.update();
      this.display();
    }

    update() {
      this.xspeed = bounce(this.x, this.xspeed, 0, width);
      this.x += this.xspeed;

      this.yspeed = bounce(this.y, this.yspeed, 0, height);
      this.y += this.yspeed;
    }
    isNear(other) {
      return dist(this.x, this.y, other.x, other.y) < 50;
    }
    turnRed() {
      this.color = {
        r: 255,
        g: 0,
        b: 0
      };
    }
    display() {
      fill(this.color.r, this.color.g, this.color.b);
      ellipse(this.x, this.y, 25, 25);
    }
  }

  function bounce(position, speed, min, max) {
    if (position < min || position > max) {
      speed *= -1;
    }
    return speed;
  }var x = 0;
var par;
var slider;

function setup() {
  createCanvas(200, 200);
  par = createP("This is some text.");
  par.style("background-color", "red");
  par.style("text-decoration", "line-through")
  slider = createSlider(0, 255, 100);
}


function draw() {
  background(slider.value());
  stroke(255);
  line(x, 0, x, height);
  x = x + 3;
  if (x > width) {
    x = 0;
  }
  par.html("The slider is at: " + slider.value());
}var par;
var button;

function setup() {
  createCanvas(200, 200);

  par = createP("This is some text.");
  par.mousePressed(changeText);

  button = createButton("change color");
  button.mousePressed(changeColor);
}

function changeText() {
  par.html("NEW TEXT! " + random(100));
}

function changeColor() {
  background(random(255), 0, random(255));
}

function draw() {

}var x = 0;
var par;

function setup() {
  createCanvas(200, 200);
  par = createP("This is some text.");
}


function draw() {
  background(0);
  stroke(255);
  line(x, 0, x, height);
  x = x + 3;
  if (x > width) {
    x = 0;
  }
  
  // Position at the mouse
  par.position(mouseX, mouseY);
}// Declare a "SerialPort" object
var serial;
var latestData = "waiting for data";  // you'll use this to write incoming data to the canvas

function setup() {
  createCanvas(windowWidth, windowHeight);

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
  text(latestData, 10, 10);
  // Polling method
  /*
  if (serial.available() > 0) {
  var data = serial.read();
  ellipse(50,50,data,data);
}
*/
}let balls = [];

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);

  for (let b = 0; b < balls.length; b++) {
//  for (let b = balls.length-1; b >= 0; b--) {
    if(balls[b]) balls[b].run();
    else continue;
    for (let c = 0; c < balls.length; c++) {
    //for (let c = balls.length-1; c >= 0; c--) {
      if(b == c) continue;
      if (balls[b].isNear(balls[c])) {
        console.log("DELETE");
        balls.splice(b, 1);
        if(b < c) c--;
        balls.splice(c, 1);
        break;
      }
    }
  }
}

function mousePressed() {
    balls.push(new Ball(mouseX, mouseY, random(-5, 5), random(-5, 5)));  
}


class Ball {
  constructor(x, y, xspeed, yspeed) {
    // Defensive Driving
    this.x = x;
    this.y = y;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
    this.color = {
      r: 255,
      g: 255,
      b: 255
    };
  }

  run() {
    this.update();
    this.display();
  }

  update() {
    this.xspeed = bounce(this.x, this.xspeed, 0, width);
    this.x += this.xspeed;

    this.yspeed = bounce(this.y, this.yspeed, 0, height);
    this.y += this.yspeed;
  }
  isNear(other) {
    return dist(this.x, this.y, other.x, other.y) < 50;
  }
  turnRed() {
    this.color = {
      r: 255,
      g: 0,
      b: 0
    };
  }
  display() {
    fill(this.color.r, this.color.g, this.color.b);
    ellipse(this.x, this.y, 25, 25);
  }
}

function bounce(position, speed, min, max) {
  if (position < min || position > max) {
    speed *= -1;
  }
  return speed;
}let balls = [];

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 10; i++) {
    //balls.push(new Ball(random(width), random(height), random(-5, 5), random(-5, 5)));
  }
}

function draw() {
  background(0);

  for (let b = 0; b < balls.length; b++) {
    balls[b].run();
    for (let c = 0; c < balls.length; c++) {
      if(b == c) continue;
      if (balls[b].isNear(balls[c])) {
        balls[b].turnRed();
      }
    }
  }
}

function mousePressed() {
     balls.push(new Ball(mouseX, mouseY, random(-5, 5), random(-5, 5))); 
}

class Ball {
  constructor(x, y, xspeed, yspeed) {
    // Defensive Driving
    this.x = x;
    this.y = y;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
    this.color = {
      r: 255,
      g: 255,
      b: 255
    };
  }

  run() {
    this.update();
    this.display();
  }

  update() {
    this.xspeed = bounce(this.x, this.xspeed, 0, width);
    this.x += this.xspeed;

    this.yspeed = bounce(this.y, this.yspeed, 0, height);
    this.y += this.yspeed;
  }
  isNear(other) {
    return dist(this.x, this.y, other.x, other.y) < 50;
  }
  turnRed() {
    this.color = {
      r: 255,
      g: 0,
      b: 0
    };
  }
  display() {
    fill(this.color.r, this.color.g, this.color.b);
    ellipse(this.x, this.y, 25, 25);
  }
}

function bounce(position, speed, min, max) {
  if (position < min || position > max) {
    speed *= -1;
  }
  return speed;
}let x1, y1, xspeed1, yspeed1;
let x2, y2, xspeed2, yspeed2;

function setup() {
  createCanvas(400, 400);
  x1 = width / 2;
  y1 = height / 2;
  xspeed1 = 3;
  yspeed1 = 2;

  x2 = width / 4;
  y2 = height / 2;
  xspeed2 = 5;
  yspeed2 = 3;
}

function draw() {
  background(220);
  //for(let i = 0; i < 2; i++) {
  // update ball 1
  update(x1, y1, xspeed1, yspeed1);
  // update ball 2
  update(x2, y2, xspeed2, yspeed2);

  // display ball 1
  display(x1, y1);
  // display ball 2
  display(x2, y2);

  //}
}

// Doesn't work!
function update(x, y, xspeed, yspeed) {
  xspeed = bounce(x, xspeed, 0, width);
  x += xspeed;

  yspeed = bounce(y, yspeed, 0, height);
  y += yspeed;
}

function display(x, y) {
  ellipse(x, y, 50, 50);
}

function bounce(pos, speed, low, high) {
  if (pos < low || pos > high) {
    speed *= -1;
  }
  return speed;
}let x = 0;
let y = 200;

function setup() { 
  createCanvas(800, 400);
  background(0);
  fill(255);
  count(0, 3);
} 

function draw() { ;
}

function count(c, limit){
  if(c > limit) return;
  x+=10;
  text(c, x, c*20 + 50);
  c++;
  for(let i = 0; i < 5; i++) {
  	count(c, limit);
  }
}let snake = [];
function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  snake.push({x: mouseX, y: mouseY});
  if(snake.length > 50) snake.shift();
  background(0);
  noStroke();
  for(let i = 0 ; i < snake.length; i++) {
  	let s = snake[i];
    fill(255, i*255/100); 
    ellipse(s.x,s.y,pow(2,i/10), pow(2, i/10));
  }
  
  
}let x1, y1, xspeed1, yspeed1;
let x2, y2, xspeed2, yspeed2;

let ball1, ball2;

let balls = [];

function setup() {
  createCanvas(400, 400);
  x1 = random(width);
  y1 = random(height);
  x2 = width / 2;
  y2 = height / 2;

  xspeed1 = 1;
  yspeed1 = 1;

  xspeed2 = -1;
  yspeed2 = -1;

  ball1 = new Ball(x1, y1, xspeed1, yspeed1);
  ball2 = new Ball(x2, y2, xspeed2, yspeed2);

  for (let i = 0; i < 10; i++) {
    balls.push(new Ball(x1, y1, random(-5, 5), random(-5, 5)));
  }

}

function draw() {
  background(220);

  // DOESN'T ACTUALLY WORK
  // update(x1, y1, xspeed1, yspeed1);
  // update(x2, y2, xspeed2, yspeed2);
  // display(x1, y1);
  // display(x2, y2);

  // ball1.update();
  // ball1.display();
  // ball2.update();
  // ball2.display();

  // ball1.run();
  // ball2.run();

  for (let i = 0; i < 10; i++) {
    balls[i].run();
    balls[i].changeColor({r: 255, g: 255, b: 255});
    for (let j = 0; j < 10; j++) {
      if(i == j) continue;
      if(balls[i].isNear(balls[j])) {
       balls[i].changeColor({r: 255, g: 0, b: 0}); 
       balls[j].changeColor({r: 255, g: 0, b: 0}); 
      }
    }
  }

}

class Ball {
  constructor(x, y, xspeed, yspeed) {
    this.x = x;
    this.y = y;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
    this.color = {r: 255, g: 255, b: 255 };
  }

  run() {
    this.update();
    this.display();
  }

  update() {
    this.xspeed = bounce(this.x, this.xspeed, 0, width);
    this.yspeed = bounce(this.y, this.yspeed, 0, height);
    this.x += this.xspeed;
    this.y += this.yspeed;
  }

  display() {
    fill(this.color.r, this.color.g, this.color.b);
    ellipse(this.x, this.y, 50, 50);
  }

  isNear(other) {
    return dist(this.x, this.y, other.x, other.y) < 25;
  }
  
  changeColor(col) {
   this.color = col; 
    
  }
}

function bounce(pos, speed, bottom, top) {

  if (pos < bottom || pos > top) {
    speed *= -1;
  }

  return speed;
}

function update(x, y, xspeed, yspeed) {
  xspeed = bounce(x, xspeed, 0, width);
  yspeed = bounce(y, yspeed, 0, height);

  x += xspeed;
  y += yspeed;
}

function display(x, y) {
  ellipse(x, y, 50, 50);
}let locs = [];

function setup() {
  createCanvas(400, 400);
  noStroke();
}

function draw() {
  background(0);
  locs.push({x: mouseX, y: mouseY});
	if(locs.length>50) locs.shift();
  for (let l = 0; l < locs.length; l++) {
    let loc = locs[l];
    fill(255, (l*5));
    ellipse(loc.x, loc.y, l/2, l/2);
  }
}let balls = [];

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);


  for (let b = balls.length - 1; b > 0; b--) {
    if (!balls[b]) continue;
    balls[b].run();
    for (let c = balls.length - 1; c > 0; c--) {
      if (b == c) continue;
      if (balls[b].isNear(balls[c])) {
        balls.splice(b, 1);
        balls.splice(b < c ? c - 1 : c, 1);
        break;
      }
    }
  }

//   for (let b = 0; b < balls.length; b++) {
//     balls[b].update();
//     for (let c = 0; c < balls.length; c++) {
//       if (b == c) continue;
//       if (balls[b].isNear(balls[c])) {
//         balls[b].goRed();
//         balls[c].goRed();
//         break;

//       } else {
//         balls[b].goWhite();
//         balls[c].goWhite();
//       }
//     }
//     balls[b].render();
//   }

}

function mousePressed() {
  balls.push(new Ball(mouseX, mouseY, random(-5, 5), random(-5, 5)));
}

class Ball {
  constructor(x, y, xspeed, yspeed) {
    // Defensive Driving
    this.x = x;
    this.y = y;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
    this.d = 25;
  }

  run() {
    this.update();
    this.render();
  }

  update() {
    this.xspeed = bounce(this.x, this.xspeed, 0, width);
    this.x += this.xspeed;

    this.yspeed = bounce(this.y, this.yspeed, 0, height);
    this.y += this.yspeed;
  }
  isNear(other) {
    return dist(this.x, this.y, other.x, other.y) < this.d * 2;
  }
  goRed() {
    fill(255, 0, 0);
  }
  goWhite() {
    fill(255);
  }
  render() {
    ellipse(this.x, this.y, this.d, this.d);
  }
}

function bounce(position, speed, min, max) {
  if (position < min || position > max) {
    speed *= -1;
  }
  return speed;
}let numbers = [];

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 100; i++) {
    numbers[i] = round(random(i));
    console.log(i + "\t" + numbers[i]);
  }
}

function draw() {
  background(220);
}let x = 0;
function setup() {
  createCanvas(400, 400);
  count(0, 5);
}

function draw() {
  //background(220);
}

function count(c, lim) {
  if(c >= lim) return;
  //console.log(c);
  x+=10;
  text(c, x, c*20);
  c++;
  count(c, lim);
  count(c, lim);
}let ball1, ball2;

function setup() {
  createCanvas(400, 400);
  ball1 = new Ball(width / 2, height / 2, 10, 0);
  ball2 = new Ball(width / 2, height / 2, 0, 10);

}

function draw() {
  background(0);
  ball1.run();
  ball2.run();
}

class Ball {
  constructor(x, y, xspeed, yspeed) {
    // Defensive Driving
    this.x = x;
    this.y = y;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
  }

  run() {
    this.update();
    this.render();
  }

  update() {
    this.xspeed = bounce(this.x, this.xspeed, 0, width);
    this.x += this.xspeed;

    this.yspeed = bounce(this.y, this.yspeed, 0, height);
    this.y += this.yspeed;
  }
  render() {
    ellipse(this.x, this.y, 10, 10);
  }
}

function bounce(position, speed, min, max) {
  if (position < min || position > max) {
    speed *= -1;
  }
  return speed;
}let x1 = 0;
let x2 = 0;

function setup() {
  createCanvas(400, 400);
  background(220);
  count(0, 3);

  //This is a form of hard-coding
  for (let a = 0; a < 2; a++) {
    text(1, x2 += 10, 120);
    for (let b = 0; b < 2; b++) {
      text(2, x2 += 10, 140);
      for (let c = 0; c < 2; c++) {
        text(3, x2 += 10, 160);
      }
    }
  }
}

function draw() {}

function count(c, lim) {
  if (c > lim) return;
  text(c, x1 += 10, c * 20);
  c++;
  count(c, lim);
  count(c, lim);
}

// Formula for calculating total number of branches
//b^gen + b^(gen-1) + b^(gen-2) ... b^0
let numBranches = 0;

function setup() {
  createCanvas(400, 400);
  background(220);
  translate(width / 2, height / 2);
  branch(0, 10);
}

function draw() {}

function branch(count, limit) {
  console.log(numBranches++);

  if (count > limit) return;
  count++;
  push();
  translate(10, 0);

  push();
  rotate(-PI / 8);
  line(0, 0, 10, 0);
  branch(count, limit);
  pop();

  push();
  rotate(PI / 8);
  line(0, 0, 10, 0);
  branch(count, limit);
  pop();

  pop();


}let names = [
  "chengchao",
  "haiyi",
  "yeonhee",
  "marco",
  "stephanie",
  "simon",
  "jesse",
  "joohyun",
  "yifan",
  "beverly",
  "kathy",
  "maria",
  "kimberly",
  "azalea",
  "aidan",
  "eva",
  "effy"
];

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}

function mousePressed() {
  for (let i = 0; i < 8; i++) {

    let p1Name = getPartner();
    let p2Name = getPartner();
    console.log(p1Name + "\t" + p2Name);

    if (names.length < 2) {
      let p3Name = getPartner();
      console.log(p3Name);
    }
  }
}

function getPartner() {
  let n = floor(random(names.length));
  let name = names[n];
  names.splice(n, 1);
  return name;
}function setup() { 
  createCanvas(400, 400);
  
  for(let i = 0; i < 10; i++) {
   rect(i*width/10, 0, width/10, height); 
  }
} 

function draw() { 
}let isOn = false;
let isEntered = false;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(220);
  fill(255, 0, 0);
  noStroke();

  // If the rect is on, draw it

  if (isOn) {
    rect(0, 0, width / 3, height);
  }

  if (mouseX < width / 3) {
    if (pmouseX > width / 3) {
      isOn = !isOn;
      console.log("ENTERED");
    }
  } else if (mouseX <= 2 * width / 3) {
    rect(width / 3, 0, width / 3, height);
    hasLeft = true;

  } else {
    rect(2 * width / 3, 0, width / 3, height);
    hasLeft = true;

  }
}let x;
let xspeed = 5;
let justHitRightWall = true;

function setup() {
  createCanvas(600, 400);
  x = width / 2;
}

function draw() {
  background(220);

//   if(x > width - 25) justHitRightWall = true;
//   else if(x < 0) justHitRightWall = false;
  
//   // Come back, when x is > width
//   if(justHitRightWall) {
//     // Move to the left
//    x-=2; 
//   }
//   else {
//    x+=2; 
//   }

  if (x > width || x < 0) {
    xspeed *= -1;
    //xspeed = xspeed * -1;
  }

  //Move
  x += xspeed;
  console.log(x);
  ellipse(x, height / 2, 50, 50);
}let names = [
  "chengchao",
  "haiyi",
  "yeonhee",
  "marco",
  "stephanie",
  "simon",
  "jesse",
  "joohyun",
  "yifan",
  "beverly",
  "kathy",
  "maria",
  "kimberly",
  "azalea",
  "aidan",
  "eva",
  "effy"
];

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}

function mousePressed() {
  console.log(names[floor(random(names.length))]);
}let cols = 50;
let rows = 50;
let colW, rowH;

function setup() {
  createCanvas(400, 400);
  colW = width / cols;
  rowH = height / rows;
}

function draw() {
  background(220);
  noStroke();
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      let x = col * colW;
      let y = row * rowH;
      let d = dist(mouseX, mouseY, x, y);
      d = map(d, 0, 100, 255, 0);
      let speed = dist(mouseX, mouseY, pmouseX, pmouseY);
      speed = map(speed, 0, 500, 0, 10);
      fill(speed * d);
      rect(x, y, colW, rowH);
    }

  }
}let w;
let turnedOn1 = false;
let hasLeft1 = true;

function setup() { 
  createCanvas(400, 400);
  w = width/3;
} 

function draw() { 
  background(220);
  noStroke();
  fill(255, 0, 0);
  if(mouseX > w*2) {
    if(hasLeft1) {
      // When do I want to turn it on or off?
      // Not the whole time my mouse is in the area.
      // Only in the 1 moment that it re-enters the area.
      // So I need another boolean to keep track of
      // whether the mouse has left the area.
    	turnedOn1 = !turnedOn1;
    	hasLeft1 = false;
    }
  }
  else if(mouseX > w) {
    hasLeft1 = true;
    rect(w, 0, w, height);
  }
  else {
    hasLeft1 = true;
    rect(0, 0, w, height);
  }
  
  if(turnedOn1) {
    rect(w*2, 0, w, height);
  }
  
  
}function setup() { 
  createCanvas(400, 400);
  for(let i = 0; i < 10; i++) {
   console.log(i); 
  }

  for(let i = 0; i < 10; i+=2) {
   console.log(i); 
  }
  
  for(let i = 10; i > 0; i--) {
   console.log(i); 
  }


} 

function draw() { 
  background(220);
  
  for(let i = 0; i < 10; i++) {
   console.log(i); 
  }
}

function setup() { 
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  console.log(width, height);
} 

function draw() { 
  background(220);
  line(width/4, height/4, 3*width/4, height/4);
  line(3*width/4, height/4, 0.75*width, 0.75*height);
  line(0.75*width, 3*height/4, width/4, 3*height/4);
  line(width/4, 3*height/4, width/4, height/4);

}let a1 = 0;
let a2 = 800;

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  push(a1+=PI/70);
  translate(width/2, height/2);
  rotate(a1);
  rect(0, 0, 50, 50);
  pop();
	
  push();
  translate(width/3, height/3);
  rotate(a2+=PI/100);
  rect(0, 0, 50, 50);
	pop();
}let x, y;
let xspeed, yspeed;

function setup() { 
  createCanvas(400, 400);
  x = width/2;
  y = height/2;

  // Define the relationship between y-movement and x-movement
  xspeed = -1;
  yspeed = xspeed*.5;
} 

function draw() { 
  background(220);
  
  // Move the ball
  x+=xspeed;
  y+=yspeed;
  
  // Draw the ball
  ellipse(x, y, 10, 10);
}function setup() { 
  createCanvas(windowWidth, windowHeight);
  //background(0);
} 

function draw() { 
  var speed = dist(mouseX, mouseY, pmouseX, pmouseY);
  
  var sw = speed/10;
  var sw = map(speed, 0, 500, 0, 100);
  //print("Strokeweight: ", sw);
  strokeWeight(sw);
  stroke(0, 255/sw);
  var sz = random(sw);
  fill(0);
  ellipse(mouseX, mouseY, sz, sz);
  line(mouseX,mouseY, pmouseX, pmouseY);
}

function mousePressed() {
  background(255);
  
}// 4 Ways to Draw a Rectangle with Lines

// Define x and y variables for every corner: 8 total
let tlX, tlY, trX, trY, blX, blY, brX, brY;

// Define left/right x and top/bottom y variables: 4 total
let lX, rX, tY, bY;

// Define 1 variable per corner
let tl, tr, bl, br;


function setup() { 
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  
  // Define X/Y for each corner
  // Lots of repeat
  tlX = width/2 - width/4;
  tlY = height/2 - height/4;
  trX = tlX + width/2;
  trY = tlY;
  blX = tlX;
  blY = tlY + height/2;
  brX = trX;
  brY = blY;
  
  // Define Xes and Yes for each side
  // No repeats
  lX = width/2 - width/4;
  rX = lX + width/2;
  tY = height/2 - height/4;
  bY = tY + height/2;
  

  // Use the Xes and Yes for each side to define the XY for each ocrner
  tlX = lX;
  tlY = tY;
  trX = rX;
  trY = tY;
  blX = lX;
  blY = bY;
  brX = rX;
  brY = bY;
  
  // Define x,y components for each corner using Object Literals
  tl = { x: lX, y: tY };
  tr = { x: rX, y: tY };
  br = { x: rX, y: bY };
  bl = { x: lX, y: bY };
  
} 

function draw() { 
  background(220);
  noStroke();
  rect(width/2, height/2, width/2, height/2);
  stroke(0);
  strokeWeight(10);
  
  // Using 2 Xes and 2 Yes for each side.
  // But you have to calculate the correct pair for each corner
  // line(lX, tY, rX, tY);
  // line(rX, tY, rX, bY);
  // line(rX, bY, lX, bY);
  // line(lX, bY, lX, tY);
  
  // Using XY variables for each corner
  // Easier to understand
  // line(tlX, tlY, trX, trY);
  // line(trX, trY, brX, brY);
  // line(brX, brY, blX, blY);
  // line(blX, blY, tlX, tlY);
  
  // Using object literals
  line(tl.x, tl.y, tr.x, tr.y);
  line(tr.x, tr.y, br.x, br.y);
  line(br.x, br.y, bl.x, bl.y);
  line(bl.x, bl.y, tl.x, tl.y);
}var playing = false;
var numOctaves = 1;
var numNotes = 0;
var ow = 100;
var ratios = {};
var notes = [];
var baseIndex = 3;
var base;
var scl = 100;

var ball;

function preload() {
  //loadStrings('notes.csv', calcRatios);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);

  ball = new Ball(50, height / 2, 20, 20, 0, 1);
}

function draw() {
  background(255)
  // for (var n = 0; n < notes.length; n++) {
  //   for (var m = 0; m < numNotes; m++) {
  //     notes[n][m].run(ball);
  //   }
  // }
  ball.run();
}

function calcRatios(data) {
  data.reverse();
  base = data[baseIndex] * pow(2, 2);

  // Ratios of the Western scales
  var sel = {
    3: 2,
    5: .34,
    7: 1,
    8: .67,
    10: 1.5,
    12: .5,
    14: .25,
    15: 2
  };

  for (var s in sel) {
    var r = data[s] / data[3];
    ratios[s] = r;
    numNotes++;
  }

  var x = 0;
  for (var o = 0; o < numOctaves; o++) {
    notes[o] = [];
    var y = height;
    for (var s in sel) {
      var ratio = ratios[s];
      var freq = base * pow(2, 3) * ratio;
      var diff = sel[s]; //ratio-pratio;
      var h = diff * scl;
      y -= h;
      notes[o].push(new Note(freq, x, y, ow, h));
    }
    x += ow;
  }
}var soundFile;
var fft;

var filter, filterFreq, filterRes;

function preload() {
  soundFile = loadSound('book.wav');
}

function setup() {
  createCanvas(710, 256);
  fill(255, 40, 255);

  // loop the sound file
  soundFile.loop();

  filter = new p5.LowPass();

  // Disconnect soundfile from master output.
  // Then, connect it to the filter, so that we only hear the filtered sound
  soundFile.disconnect();
  soundFile.connect(filter);

  fft = new p5.FFT();
}

function draw() {
  background(30);

  // Map mouseX to a the cutoff frequency from the lowest
  // frequency (10Hz) to the highest (22050Hz) that humans can hear
  filterFreq = map (mouseX, 0, width, 10, 22050);

  // Map mouseY to resonance (volume boost) at the cutoff frequency
  filterRes = map(mouseY, 0, height, 15, 5);

  // set filter parameters
  filter.set(filterFreq, filterRes);

  // Draw every value in the FFT spectrum analysis where
  // x = lowest (10Hz) to highest (22050Hz) frequencies,
  // h = energy (amplitude / volume) at that frequency
  var spectrum = fft.analyze();
  noStroke();
  for (var i = 0; i< spectrum.length; i++){
    var x = map(i, 0, spectrum.length, 0, width);
    var h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width/spectrum.length, h) ;
  }

}
var soundFile, analyzer, delay;

function preload() {
  soundFormats('ogg', 'mp3', 'wav');
  soundFile = loadSound('guitar.wav');
}

function setup() {
  createCanvas(710, 400);
	
  soundFile.loop();
  //soundFile.disconnect(); // so we'll only hear delay

  delay = new p5.Delay();
  delay.process(soundFile, .01, .7, 400300);
  delay.setType('pingPong'); // a stereo effect

  analyzer = new p5.Amplitude();
  console.log(soundFile);
}

function draw() {
  background(0);

  // get volume reading from the p5.Amplitude analyzer
  var level = analyzer.getLevel();

  // use level to draw a green rectangle
  var levelHeight = map(level, 0, .1, 0, height);

  fill(100,250,100);
  rect(0, height, width, - levelHeight);

  // var filterFreq = map(mouseX, 0, width, 60, 15000);
  // filterFreq = constrain(filterFreq, 60, 15000);
  // var filterRes = map(mouseY, 0, height, 3, 0.01);
  // filterRes = constrain(filterRes, 0.01, 3);
  // delay.filter(filterFreq, filterRes);
  var delTime = map(mouseX, 0, width, .01, .2);
  delTime = constrain(delTime, .01, .2);
  delay.delayTime(delTime);
  //delay.feedback(mouseY/height);
}

function mousePressed() {
  soundFile.play();
}var song;

function preload() {
  song = loadSound('tap.wav');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  song.loop();
}

function draw() {
  background(200);

  // Set the rate to a range between 0.1 and 4
  // Changing the rate also alters the pitch
  var speed = map(mouseY, 0.1, height, 0, 2);
  speed = constrain(speed, 0.01, 4);
  song.rate(speed);

  // Draw a circle to show what is going on
  stroke(0);
  fill(51, 100);
  ellipse(width/2, mouseY, 48, 48);
}/*
Mimi Yin NYU-ITP
Drawing skeleton joints and bones.
 */

// Declare kinectron
var kinectron = null;
var xscl, yscl;
var xshift, yshift;
var scl = true;
var bm = new BodyManager();
var DEATH_TH = 1000;

function preload() {

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Define and create an instance of kinectron
  kinectron = new Kinectron("192.168.0.4");
  //kinectron = new Kinectron("172.16.229.129");

  // CONNECT TO MIRCROSTUDIO
  //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked);

  xscl = (width/3.2)*0.55;
  yscl = -(width/3.2)*0.6;
  xshift = 0;
  yshift = height / 2;

  // Calculate maximum distance to normalize data
  diag = sqrt(sq(width) + sq(height));

  background(0);
}

function draw() {
  background(0);

  // Get joints for live bodies
  var joints = bm.getJoints(kinectron.HANDRIGHT);

  for (var j = 0; j < joints.length; j++) {
    // Get the position
    var joint = joints[j];
    var pos = getPos(joint.pos);
    var speed = joint.speed;
    var acceleration = joint.acceleration;

    // Control transparency of circle with speed
    var alpha = speed * 5000 + 32;

    // Control size of the circle with acceleration
    var sz = acceleration * 5000 + 10;
    fill(255, alpha);
    ellipse(pos.x, pos.y, sz, sz);
  }
}

function bodyTracked(body) {
  var id = body.trackingId;
  // When there is a new body, add it
  if (!bm.contains(id)) bm.add(body);
  // Otherwise, update it
  else bm.update(body);
}

// Scale the data to fit the screen
// Move it to the center of the screen
// Return it as a vector
// Use z as x
// Use x as y
function getPos(joint) {
  return createVector((joint.z * xscl) + xshift, (joint.x * yscl) + yshift);
}

function keyPressed() {
  // Switch mode of arrow keys
  if (keyCode == ESCAPE) scl = !scl;

  // Adjust scale of x,z coordinates to map to projection
  if (scl) {
    switch (keyCode) {
      case RIGHT_ARROW:
        xscl++;
        break;
      case LEFT_ARROW:
        xscl--;
        break;
      case UP_ARROW:
        yscl++;
        break;
      case DOWN_ARROW:
        yscl--;
        break;
    }

    xscl = constrain(xscl, 0, width);
    yscl = constrain(yscl, 0, width);
  }
  // Adjust shift
  else {
    switch (keyCode) {
      case RIGHT_ARROW:
        xshift++;
        break;
      case LEFT_ARROW:
        xshift--;
        break;
      case UP_ARROW:
        yshift++;
        break;
      case DOWN_ARROW:
        yshift--;
        break;
    }
    xshift = constrain(xshift, 0, width);
    yshift = constrain(yshift, 0, height);
  }
}/*
Mimi Yin NYU-ITP
Mapping Kinect Skeleton locations to floor projection.
 */

// Declare kinectron
var kinectron = null;

// Mapping Kinect data to projecion
var xscl, yscl;
var xshift, yshift;
var scl = true;

// Managing kinect bodies
var bm = new BodyManager();
var DEATH_TH = 1000;

var diag; // Diagonal of screen

var polygon = new Polygon();

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Define and create an instance of kinectron
  kinectron = new Kinectron("172.16.231.112");
  //kinectron = new Kinectron("192.168.0.118");


  // CONNECT TO MIRCROSTUDIO
  //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked);

  xscl = (width/3.2)*0.55;
  yscl = -(width/3.2)*0.6;
  xshift = 0;
  yshift = height / 2;

  // Calculate maximum distance to normalize data
  diag = sqrt(sq(width) + sq(height));

  background(0);
}

function draw() {
  background(0);

  // Get array of bodies
  var bodies = bm.getBodies();
  // Variable to keep track of the it body's location
  var it;

  // Clear the polygon
  polygon.clear();

  for (var b = 0; b < bodies.length; b++) {

    // Get body
    var body = bodies[b];

    // Get position of body
    var pos = getPos(body.getPosition(kinectron.HEAD));

    // 1st body is IT!
    if (bodies.length > 0 && b == 0) it = pos;
    // Add all other bodies to polygon
    else polygon.addVertex(pos.x, pos.y);
  }

  // Draw the polygon
  noStroke();
  fill(255, 128);
  polygon.display();

  // Skip the rest if there is no it.
  if (it != null && polygon.isReady()) {

    // Is "it" inside the polygon?
    var itIsInside = polygon.contains(it);

    // If it is inside the polygon, paint it red!
    if (itIsInside) {
      noStroke();
      fill(255, 0, 0);
      polygon.display();
    }

    // Get nearest point on side to IT
    var np = polygon.getNearestPointOnSide(it);
    // Draw a line from mouse to closest point on this side
    stroke(255);
    strokeWeight(1);
    line(it.x, it.y, np.x, np.y);

    // Calculate distance to nearest point on nearest side
    var d = p5.Vector.sub(it, np).mag();

    // Get 2 vectors that define nearest side to IT
    // Map distance to side to strokeWeight of side
    var ns = polygon.getNearestSide(it);
    stroke(255);
    strokeWeight(100 - d);
    strokeCap(SQUARE); // Don't add rounded ends to line.
    line(ns.start.x, ns.start.y, ns.end.x, ns.end.y);

    // Get nearest vertex to IT
    var nv = polygon.getNearestVertex(it);
    // Draw a line from mouse to closest point on this side
    // Scale the stroke of the line to the nearest side by the distance
    var d = p5.Vector.sub(it, nv).mag();
    stroke(255);
    strokeWeight(1);
    line(it.x, it.y, nv.x, nv.y);
    noStroke();
    fill(255);
    ellipse(nv.x, nv.y, d, d);

    // Draw IT
    fill(255);
    ellipse(it.x, it.y, 50, 50);
  }

}

function bodyTracked(body) {
  var id = body.trackingId;
  // When there is a new body
  if (!bm.contains(id)) bm.add(body);
  else bm.update(body);
}

// Scale the data to fit the screen
// Move it to the center of the screen
// Return it as a vector
// Use z as x
// Use x as y
function getPos(joint) {
  return createVector((joint.z * xscl) + xshift, (joint.x * yscl) + yshift);
}

// Add vertices to polygon manually
function mousePressed() {
  polygon.addVertex(mouseX, mouseY);
}

function keyPressed() {
  // Switch mode of arrow keys
  if (keyCode == ESCAPE) scl = !scl;

  // Adjust scale of x,z coordinates to map to projection
  if (scl) {
    switch (keyCode) {
      case RIGHT_ARROW:
        xscl++;
        break;
      case LEFT_ARROW:
        xscl--;
        break;
      case UP_ARROW:
        yscl++;
        break;
      case DOWN_ARROW:
        yscl--;
        break;
    }

    xscl = constrain(xscl, 0, width);
    yscl = constrain(yscl, 0, width);
  }
  // Adjust shift
  else {
    switch (keyCode) {
      case RIGHT_ARROW:
        xshift++;
        break;
      case LEFT_ARROW:
        xshift--;
        break;
      case UP_ARROW:
        yshift++;
        break;
      case DOWN_ARROW:
        yshift--;
        break;
    }
    xshift = constrain(xshift, 0, width);
    yshift = constrain(yshift, 0, height);
  }
}/*
Mimi Yin NYU-ITP
Mapping Kinect Skeleton locations to floor projection.
 */

// Declare kinectron
var kinectron = null;

// Mapping Kinect data to projecion
var xscl, yscl;
var xshift, yshift;
var scl = true;

// Managing kinect bodies
var bm = new BodyManager();
var DEATH_TH = 1000;

function preload() {

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Define and create an instance of kinectron
  kinectron = new Kinectron("172.16.229.129");
  //kinectron = new Kinectron("192.168.0.118");

  // CONNECT TO MIRCROSTUDIO
  //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked);

  xscl = (width/3.2)*0.55;
  yscl = -(width/3.2)*0.6;
  xshift = 0;
  yshift = height / 2;

  // Calculate maximum distance to normalize data
  diag = sqrt(sq(width) + sq(height));

  background(0);
}

function draw() {
  background(0);

  // Calculate avergage position
  var avgPos = createVector();

  // Get body positions
  var positions = bm.getPositions(kinectron.HEAD);

  for (var p = 0; p < positions.length; p++) {
    // Get the position
    var pos = getPos(positions[p]);

    fill(255, 0, 0);
    ellipse(pos.x, pos.y, 50, 50);

    // Add it to the avgPos vector
    avgPos.add(pos);
  }
  // Divide by number of positions
  avgPos.div(positions.length);

  // Calculate average dist
  var avgDist = 100;
  for (var p = 0; p < positions.length; p++) {
    // Get the position
    var pos = getPos(positions[p]);
    // Calculate dist between avgPos and pos
    var d = p5.Vector.dist(avgPos, pos);
    // Add it to the avgDist
    avgDist += d;
  }

  if (positions.length > 0) {
    // Divide by number of positions.
    avgDist /= positions.length;
  }

  fill(255);
  ellipse(avgPos.x, avgPos.y, avgDist, avgDist);

}

function bodyTracked(body) {
  var id = body.trackingId;
  // When there is a new body, add it
  if (!bm.contains(id)) bm.add(body);
  // Otherwise, update it
  else bm.update(body);
}

// Scale the data to fit the screen
// Move it to the center of the screen
// Return it as a vector
// Use z as x
// Use x as y
function getPos(joint) {
  return createVector((joint.z * xscl) + xshift, (joint.x * yscl) + yshift);
}

function keyPressed() {
  // Switch mode of arrow keys
  if (keyCode == ESCAPE) scl = !scl;

  // Adjust scale of x,z coordinates to map to projection
  if (scl) {
    switch (keyCode) {
      case RIGHT_ARROW:
        xscl++;
        break;
      case LEFT_ARROW:
        xscl--;
        break;
      case UP_ARROW:
        yscl++;
        break;
      case DOWN_ARROW:
        yscl--;
        break;
    }

    xscl = constrain(xscl, 0, width);
    yscl = constrain(yscl, 0, width);
  }
  // Adjust shift
  else {
    switch (keyCode) {
      case RIGHT_ARROW:
        xshift++;
        break;
      case LEFT_ARROW:
        xshift--;
        break;
      case UP_ARROW:
        yshift++;
        break;
      case DOWN_ARROW:
        yshift--;
        break;
    }
    xshift = constrain(xshift, 0, width);
    yshift = constrain(yshift, 0, height);
  }
}/*
Mimi Yin NYU-ITP
Mapping Kinect Skeleton locations to floor projection.
 */

// Declare kinectron
var kinectron = null;

var center; // center of circle
var sz = 0; // size of circle
var szspeed = 1; // speed at which circle changes size
var diag = 0; // diag of canvas

// Mapping Kinect data to projecion
var xscl, yscl;
var xshift, yshift;
var scl = true;

// Managing kinect bodies
var bm = new BodyManager();
var DEATH_TH = 1000;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Define and create an instance of kinectron
  kinectron = new Kinectron("172.16.231.112");
  //kinectron = new Kinectron("192.168.0.118");

  // CONNECT TO MIRCROSTUDIO
  //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked);

  xscl = (width/3.2)*0.55;
  yscl = -(width/3.2)*0.6;
  xshift = 0;
  yshift = height / 2;

  // Place circle in upper left-hand corner
  center = createVector(random(width), random(height));
  // Calculate maximum distance to normalize data
  diag = sqrt(sq(width) + sq(height));

  background(0);
  noStroke();
}

function draw() {
  background(0);

  // Get positions of all bodies
  var positions = bm.getPositions(kinectron.HEAD);

  // Calculate radius of circle
  var r = sz / 2;
  // Color of circle
  var c = color(0);

  for (var p = 0; p < positions.length; p++) {

    // Get the position
    var pos = getPos(positions[p]);

    //Calculate distance from center
    var d = p5.Vector.sub(pos, center).mag();

    // Color it red if someone is inside the circle.
    if (d < r) c = color(255, 0, 0);
    else c = color(0);

    fill(255);
    ellipse(pos.x, pos.y, 50, 50);
  }

  fill(c);
  ellipse(center.x, center.y, sz, sz);

  //Grow the circle
  sz++;
}

function bodyTracked(body) {
  var id = body.trackingId;
  // When there is a new body
  if (!bm.contains(id)) bm.add(body);
  else bm.update(body);
}

// Scale the data to fit the screen
// Move it to the center of the screen
// Return it as a vector
// Use z as x
// Use x as y
function getPos(joint) {
  return createVector((joint.z * xscl) + xshift, (joint.x * yscl) + yshift);
}

function keyPressed() {
  // Switch mode of arrow keys
  if (keyCode == ESCAPE) scl = !scl;

  // Adjust scale of x,z coordinates to map to projection
  if (scl) {
    switch (keyCode) {
      case RIGHT_ARROW:
        xscl++;
        break;
      case LEFT_ARROW:
        xscl--;
        break;
      case UP_ARROW:
        yscl++;
        break;
      case DOWN_ARROW:
        yscl--;
        break;
    }

    xscl = constrain(xscl, 0, width);
    yscl = constrain(yscl, 0, width);
  }
  // Adjust shift
  else {
    switch (keyCode) {
      case RIGHT_ARROW:
        xshift++;
        break;
      case LEFT_ARROW:
        xshift--;
        break;
      case UP_ARROW:
        yshift++;
        break;
      case DOWN_ARROW:
        yshift--;
        break;
    }
    xshift = constrain(xshift, 0, width);
    yshift = constrain(yshift, 0, height);
  }
}/*
Mimi Yin NYU-ITP
Mapping Kinect Skeleton locations to floor projection of circles.
 */

// Declare kinectron
var kinectron = null;

// Mapping Kinect data to projecion
var xscl, yscl;
var xshift, yshift;
var scl = true;

// Managing kinect bodies
var bm = new BodyManager();
var DEATH_TH = 1000;

function preload() {

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Define and create an instance of kinectron
  //kinectron = new Kinectron("172.16.231.112");
  kinectron = new Kinectron("192.168.1.4");


  // CONNECT TO MIRCROSTUDIO
  //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked);

  xscl = (width/3.2)*0.55;
  yscl = -(width/3.2)*0.6;
  xshift = 0;
  yshift = height/2;

  // Calculate maximum distance to normalize data
  diag = sqrt(sq(width) + sq(height));

  background(0);
}

function draw() {
  background(0);

  // Give up if there are no bodies
  if (bm.getPop() > 0) {

    // Get joints for live bodies
    var positions = bm.getPositions(kinectron.HEAD);

    for (var p = 0; p < positions.length; p++) {
      // Get the position
      var pos = getPos(positions[p]);
      ellipse(pos.x, pos.y, 100, 100);
      fill(255)
      textSize(18);
      text(floor(xscl) + "\t" + floor(yscl), width/2, height/2);
    }
  }
}

function bodyTracked(body) {
  var id = body.trackingId;
  // When there is a new body, add it
  if (!bm.contains(id)) bm.add(body);
  // Otherwise, update it
  else bm.update(body);
}

// Scale the data to fit the screen
// Move it to the center of the screen
// Return it as a vector
// Use z as x
// Use x as y
function getPos(pos) {
  return createVector((pos.z * xscl) + xshift, (pos.x * yscl) + yshift);
}

function keyPressed() {
  // Switch mode of arrow keys
  if (keyCode == ESCAPE) scl = !scl;

  // Adjust scale of x,z coordinates to map to projection
  if (scl) {
    switch (keyCode) {
      case RIGHT_ARROW:
        xscl++;
        break;
      case LEFT_ARROW:
        xscl--;
        break;
      case UP_ARROW:
        yscl++;
        break;
      case DOWN_ARROW:
        yscl--;
        break;
    }

    xscl = constrain(xscl, 0, width);
    yscl = constrain(yscl, 0, width);
  }
  // Adjust shift
  else {
    switch (keyCode) {
      case RIGHT_ARROW:
        xshift++;
        break;
      case LEFT_ARROW:
        xshift--;
        break;
      case UP_ARROW:
        yshift++;
        break;
      case DOWN_ARROW:
        yshift--;
        break;
    }
    xshift = constrain(xshift, 0, width);
    yshift = constrain(yshift, 0, height);
  }
}/*
Mimi Yin NYU-ITP
Mapping Kinect Skeleton locations to floor projection of circles.
 */

// Declare kinectron
var kinectron = null;

// Mapping Kinect data to projecion
var xscl, yscl;
var xshift, yshift;
var scl = true;

// Managing kinect bodies
var bm = new BodyManager();
var DEATH_TH = 1000;

function preload() {

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Define and create an instance of kinectron
  //kinectron = new Kinectron("172.16.231.112");
  kinectron = new Kinectron("192.168.1.4");


  // CONNECT TO MIRCROSTUDIO
  //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked);

  xscl = (width/3.2)*0.55;
  yscl = -(width/3.2)*0.6;
  xshift = 0;
  yshift = height/2;

  // Calculate maximum distance to normalize data
  diag = sqrt(sq(width) + sq(height));

  background(0);
}

function draw() {
  background(0);

  // Give up if there are no bodies
  if (bm.getPop() > 0) {

    // Get joints for live bodies
    var positions = bm.getPositions(kinectron.HEAD);

    for (var p = 0; p < positions.length; p++) {
      // Get the position
      var pos = getPos(positions[p]);
      ellipse(pos.x, pos.y, 100, 100);
      fill(255)
      textSize(18);
      text(floor(xscl) + "\t" + floor(yscl), width/2, height/2);
    }
  }
}

function bodyTracked(body) {
  var id = body.trackingId;
  // When there is a new body, add it
  if (!bm.contains(id)) bm.add(body);
  // Otherwise, update it
  else bm.update(body);
}

// Scale the data to fit the screen
// Move it to the center of the screen
// Return it as a vector
// Use z as x
// Use x as y
function getPos(pos) {
  return createVector((pos.z * xscl) + xshift, (pos.x * yscl) + yshift);
}

function keyPressed() {
  // Switch mode of arrow keys
  if (keyCode == ESCAPE) scl = !scl;

  // Adjust scale of x,z coordinates to map to projection
  if (scl) {
    switch (keyCode) {
      case RIGHT_ARROW:
        xscl++;
        break;
      case LEFT_ARROW:
        xscl--;
        break;
      case UP_ARROW:
        yscl++;
        break;
      case DOWN_ARROW:
        yscl--;
        break;
    }

    xscl = constrain(xscl, 0, width);
    yscl = constrain(yscl, 0, width);
  }
  // Adjust shift
  else {
    switch (keyCode) {
      case RIGHT_ARROW:
        xshift++;
        break;
      case LEFT_ARROW:
        xshift--;
        break;
      case UP_ARROW:
        yshift++;
        break;
      case DOWN_ARROW:
        yshift--;
        break;
    }
    xshift = constrain(xshift, 0, width);
    yshift = constrain(yshift, 0, height);
  }
}/*
Mimi Yin NYU-ITP
Mapping skeleton locations to floor projection of circle.
 */

// Declare kinectron
var kinectron = null;

var center; // center of circle
var sz = 0; // size of circle
var szspeed = 1; // speed at which circle changes size
var diag; // diagonal of screen

// Mapping Kinect data to projecion
var xscl, yscl;
var xshift, yshift;
var scl = true;

// Managing kinect bodies
var bm = new BodyManager();
var DEATH_TH = 1000;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Define and create an instance of kinectron
  kinectron = new Kinectron("172.16.231.112");
  //kinectron = new Kinectron("192.168.0.118");

  // CONNECT TO MIRCROSTUDIO
  //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked);

  diag = sqrt(sq(width) + sq(height));

  xscl = (width/3.2)*0.55;
  yscl = -(width/3.2)*0.6;
  xshift = 0;
  yshift = height / 2;

  // Place circle in upper left-hand corner
  center = createVector(0, 0);

  background(0);
  noStroke();
}

function draw() {
  background(0);

  // Draw the circle
  fill(255);
  ellipse(center.x, center.y, sz, sz);


  // Get positions of all bodies
  var positions = bm.getPositions(kinectron.HEAD);

  // Calculate avgDist2Center and avgDist2Edge
  var avgDist2Center = 0;
  var avgDist2Edge = 0;
  console.log(positions.length);

  for (var p = 0; p < positions.length; p++) {

    // Draw all the body positions
    var pos = getPos(positions[p]);
    fill(255, 0, 0);
    ellipse(pos.x, pos.y, 50, 50);

    //Calculate distance from center
    var dist2Center = p5.Vector.sub(pos, center).mag();
    var dist2Edge = abs((sz / 2) - dist2Center);

    // Add to averages
    avgDist2Center += dist2Center / diag;
    avgDist2Edge += dist2Edge / diag;

  }
  if (positions.length > 1) {
    // Divide by number of vertices
    avgDist2Center /= positions.length;
    avgDist2Edge /= positions.length;
  }

  // Map dist2edge to szspeed
  szspeed = pow(100, avgDist2Edge);
  sz += szspeed;
}

function bodyTracked(body) {
  var id = body.trackingId;
  // When there is a new body
  if (!bm.contains(id)) bm.add(body);
  else bm.update(body);
}

// Scale the data to fit the screen
// Move it to the center of the screen
// Return it as a vector
// Use z as x
// Use x as y
function getPos(joint) {
  return createVector((joint.z * xscl) + xshift, (joint.x * yscl) + yshift);
}

function keyPressed() {
  // Switch mode of arrow keys
  if (keyCode == ESCAPE) scl = !scl;

  // Adjust scale of x,z coordinates to map to projection
  if (scl) {
    switch (keyCode) {
      case RIGHT_ARROW:
        xscl++;
        break;
      case LEFT_ARROW:
        xscl--;
        break;
      case UP_ARROW:
        yscl++;
        break;
      case DOWN_ARROW:
        yscl--;
        break;
    }

    xscl = constrain(xscl, 0, width);
    yscl = constrain(yscl, 0, width);
  }
  // Adjust shift
  else {
    switch (keyCode) {
      case RIGHT_ARROW:
        xshift++;
        break;
      case LEFT_ARROW:
        xshift--;
        break;
      case UP_ARROW:
        yshift++;
        break;
      case DOWN_ARROW:
        yshift--;
        break;
    }
    xshift = constrain(xshift, 0, width);
    yshift = constrain(yshift, 0, height);
  }
}/*
Mimi Yin NYU-ITP
Mapping mouse position inside polygon.
 */

var polygon = new Polygon();

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}


function draw() {
  background(0);

  // Draw polygon
  // Is the mouse inside the shape?
  var mouse = createVector(mouseX, mouseY);

  if (polygon.isReady()) {
    // Is mouse inside the polygon?
    var isInside = polygon.contains(mouse);

    // If mouse inside the polygon, paint polygon red!
    if (isInside) fill(255, 0, 0);
    else fill(255, 128);
    noStroke();
    polygon.display();

    // Calculate distance to nearest point on side
    var np = polygon.getNearestPointOnSide(mouse);
    // Draw a line from mouse to closest point on this side
    stroke(255);
    strokeWeight(1);
    line(mouse.x, mouse.y, np.x, np.y);

    // Calculate distance to nearest point on nearest side
    var d = p5.Vector.sub(mouse, np).mag();

    // Get 2 vectors that define nearest side
    // Map distance to side to strokeWeight of side
    var ns = polygon.getNearestSide(mouse);
    stroke(255);
    strokeWeight(100 - d);
    strokeCap(SQUARE); // Don't add rounded ends to line.
    line(ns.start.x, ns.start.y, ns.end.x, ns.end.y);

    // Calculate distance to nearest vertex
    var nv = polygon.getNearestVertex(mouse);
    // Draw a line from mouse to closest point on this side
    // Scale the stroke of the line to the nearest side by the distance
    var d = p5.Vector.sub(mouse, nv).mag();
    stroke(255);
    strokeWeight(1);
    line(mouse.x, mouse.y, nv.x, nv.y);
    noStroke();
    fill(255);
    ellipse(nv.x, nv.y, d, d);
  }
}

function mousePressed() {
  polygon.addVertex(mouseX, mouseY);
}/*
Mimi Yin NYU-ITP
Drawing lines.
*/

var mode = 0;
var locs = [];

function setup() { 
  createCanvas(windowWidth, windowHeight);
  background(0);
} 

function draw() { 
  var speed = dist(pmouseX, pmouseY, mouseX, mouseY);
	var sw = 1;
  
  // 3 ways to set strokeweight according to speed.
  switch(mode){
    case 1:
      sw = speed/10;
      break;
    case 2:      
  		sw = 100/speed;
      break;
    case 3:
      background(0);
      // Add current mouse position to locs array
      locs.push(createVector(mouseX, mouseY));

      // Remove the oldest mouse location after 50 frames
      if(locs.length> 50) locs.shift();

      // Iterate through last 50 mouse positions
      for(var l = 0; l < locs.length; l++) {

        // Turn on throbbing
        var sz = sin(frameCount*0.01)*l*2 + l*2;

        // Turn on easing
        locs[l].x+=(mouseX-locs[l].x)*0.01;
        locs[l].y+=(mouseY-locs[l].y)*0.01;
				
        noStroke();
        fill(255, 64);
        // Draw an ellipse at this location
        ellipse(locs[l].x, locs[l].y, sz, sz);  
      }
      break;
  }
  
  if(mode < 3) {
    stroke(255);
    strokeWeight(sw);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
  
}

function mousePressed(){
 	mode++;
  mode%=4;
}
  
  /*
Mimi Yin NYU-ITP
Trisect space.
Horizontal and Vertical.
*/


var moving = false;
var horizontal = true;
var w, h;

function setup() {
  createCanvas(windowWidth, windowHeight);
  w = 0;
  h = 0;
  wspeed = 0.1;
  hspeed = 0.1;
  noStroke();
  rectMode(CENTER);
}

function draw() {
  background(0);

  fill(255);
  
  // Change width and height
  w += wspeed;
  h += hspeed;
  
  if(w < 0 || w > width/2) wspeed *= -1;
  if(h < 0 || h > height/2) hspeed *= -1;
	
  // Draw the cells
  if (horizontal) rect(width/2, height/2, width, h);
  else rect(width/2, height/2, w, height);
}

function keyPressed() {
  // Adjust number of columns and rows
  // ESC inverts black and white
  switch (keyCode) {
    case ESCAPE:
      horizontal = !horizontal;
      w = 0;
      h = 0;
      break;
  }

  // Limit cols/rows to 0-10
  w = constrain(w, 0, width);
  h = constrain(h, 0, height);
}/*
Mimi Yin NYU-ITP
Bisect space.
Horizontal and Vertical.
*/

var horizontal = false;
var x, y;
var counter;

function setup() {
  createCanvas(1080, windowHeight);
  x = 0;
  y = 0;
  counter = 0;
  noStroke();
}

function draw() {
  background(0);


  // Calculate the position
  // Google 2^x to see the shape of numbers you will get
  counter += 0.01;
  x = pow(2, counter);
  y = pow(2, counter);

  // Draw the cells
  fill(255);
  if (horizontal) rect(0, 0, width, y);
  else rect(0, 0, x, height);
}

function keyPressed() {
  // Adjust number of columns and rows
  // ESC inverts black and white
  switch (keyCode) {
    case ESCAPE:
      horizontal = !horizontal;
      counter = 0;
      break;
  }
}var num = 5;
var r;
var vertices = [num];
var center;

function setup() {
  createCanvas(windowWidth, windowHeight);
  r = width/4;
  center = createVector(width/2, height/2);
  init();
}


function draw() {
  background(0);
  
  // Draw polygon
  noStroke();
  fill(255);
  beginShape();
  for (var v = 0; v < vertices.length; v++) {
    vertex(vertices[v].x, vertices[v].y);
  }
  endShape(CLOSE);

  // Is the mouse inside the shape?
  var mouse = createVector(mouseX, mouseY);
  var distCenter = floor(p5.Vector.sub(center, mouse).mag());
  var intersections = 0;
  var distSide = width*height;
  
  // Test whether mouse is inside or outside polygon
  // Calculate distance to nearest side

  stroke(128);
  for (var v = 0; v < vertices.length; v++) {
    var v1 = vertices[v];
    var v2 = v == vertices.length-1 ? vertices[0] : vertices[v+1];
    
    // v1 and v2 are the start and end points of this side of the polygon
    // Test to see if the mouse intersects the side
    if (areIntersecting(createVector(0, 0), mouse, v1, v2)) intersections++;
    
    // Get point closest to mouse on this side
    var n = getNormalPoint(mouse, v1, v2);
    // Calculate distance to side
    var d = p5.Vector.sub(n, mouse).mag();
    // Is this the closest side?
    if (d < distSide) distSide = floor(d);
    // Draw a line from mouse to closest point on this side
    line(mouse.x, mouse.y, n.x, n.y);
  }
	
  // Print into to screen
  textSize(18);
  noStroke();
  fill(255);
  
  // If # of intersections  is even, we're outside!
  // Otherwise, we're inside!
  if (intersections%2 == 0) text("OUTSIDE: " + distSide + " " + distCenter, 10, 20);
  else text("INSIDE: "  + distSide + " " + distCenter, 10, 20);

}

// Change number of vertices of polygon
// Change size of polygon
function keyPressed() {
  switch(keyCode) {
  case RIGHT_ARROW:  
    num++;
    break;
  case LEFT_ARROW:
    num--;
    break;
  case UP_ARROW:  
    r++;
    break;
  case DOWN_ARROW:
    r--;
    break;
  }
  num = constrain(num, 0, 100);
  r = constrain(r, 0, width);
  init();
}

// Calculate x,y locations for vertices of polygon
function init() {
  vertices = [num];
  for (var n = 0; n < num; n++) {
    var x = cos(TWO_PI*n/num)*r + center.x;
    var y = sin(TWO_PI*n/num)*r + center.y;
    vertices[n] = createVector(x, y);
  }
}

//Re-implementation of this: http://stackoverflow.com/a/218081
function areIntersecting(p0, p1, s0, s1) {
  var d1, d2;
  var a1, a2, b1, b2, c1, c2;

  // Convert the s0-s1 vector to a line of infinite length.
  // We want the line in linear equation standard form: A*x + B*y + C = 0
  // See: http://en.wikipedia.org/wiki/Linear_equation
  a1 = s1.y - s0.y; // change in y
  b1 = s0.x - s1.x; // change in x
  c1 = (s1.x * s0.y) - (s0.x * s1.y);

  // Every point (x,y), that solves the equation above, is on the line,
  // every point that does not solve it, is not. The equation will have a
  // positive result if it is on one side of the line and a negative one 
  // if is on the other side of it. We insert (x1,y1) and (x2,y2) of vector
  // 2 into the equation above.
  d1 = (a1 * p0.x) + (b1 * p0.y) + c1;
  d2 = (a1 * p1.x) + (b1 * p1.y) + c1;

  // If d1 and d2 both have the same sign, they are both on the same side
  // of our line 1 and in that case no intersection is possible. Careful, 
  // 0 is a special case, that's why we don't test ">=" and "<=", 
  // but "<" and ">".
  if (d1 > 0 && d2 > 0) return false;
  if (d1 < 0 && d2 < 0) return false;

  // The fact that vector 2 intersected the infinite line 1 above doesn't 
  // mean it also intersects the vector 1. Vector 1 is only a subset of that
  // infinite line 1, so it may have intersected that line before the vector
  // started or after it ended. To know for sure, we have to repeat the
  // the same test the other way round. We start by calculating the 
  // infinite line 2 in linear equation standard form.
  a2 = p1.y - p0.y;
  b2 = p0.x - p1.x;
  c2 = (p1.x * p0.y) - (p0.x * p1.y);

  // Calculate d1 and d2 again, this time using points of vector 1.
  d1 = (a2 * s0.x) + (b2 * s0.y) + c2;
  d2 = (a2 * s1.x) + (b2 * s1.y) + c2;

  // Again, if both have the same sign (and neither one is 0),
  // no intersection is possible.
  if (d1 > 0 && d2 > 0) return false;
  if (d1 < 0 && d2 < 0) return false;

  // If we get here, only two possibilities are left. Either the two
  // vectors intersect in exactly one point or they are collinear, which
  // means they intersect in any number of points from zero to infinite.
  if ((a1 * b2) - (a2 * b1) == 0.0) return true;

  // If they are not collinear, they must intersect in exactly one point.
  return true;
}

// From Dan Shiffman
// A function to get the normal point from a point (p) to a line segment (a-b)
// This function could be optimized to make fewer new Vector objects
function getNormalPoint(p, s0, s1) {
  // Vector from a to p
  s0p = p5.Vector.sub(p, s0);
  // Vector from a to b
  s0s1 = p5.Vector.sub(s1, s0);
  s0s1.normalize(); // Normalize the line
  // Project vector "diff" onto line by using the dot product
  s0s1.mult(s0p.dot(s0s1));
  var normalPoint = p5.Vector.add(s0, s0s1);
  return normalPoint;
}
var sz;
var szspeed = 0.1;
var invert = false;

function setup() { 
  createCanvas(windowWidth, windowHeight);
  sz = height/2;
  noStroke();
} 

function draw() { 
  background(invert ? 0: 255);
  
  push();
  translate(mouseX, mouseY);
  rotate(frameCount*0.005);
  
  // Bounce speed
  sz+=szspeed;
  if(sz > height || sz < 0) szspeed *= -1;
  
  fill(invert ? 255: 0);
  
  // Draw Triangle
  beginShape();
  	vertex(0, -sz);
  	vertex(sz, sz);
  	vertex(-sz, sz);
  endShape(CLOSE);
  pop();
}

// Invert background/foreground colors
function mousePressed(){
  invert = !invert; 
}

var sz = 0;
var invert = false;

function setup() { 
  createCanvas(windowWidth, windowHeight);
  noStroke();
} 

function draw() { 
  background(invert ? 0: 255);
  sz+=0.5;
  fill(invert ? 255: 0);
  ellipse(0, 0, sz, sz);
}

// Invert black and white
function mousePressed(){
 invert = !invert; 
}

var cols = 2;
var rows = 1;
var colW, rowH;
var invert = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  init();
  noStroke();
}

function draw() {
  background(0);

  // Draw the cells
  for (var col = 0; col < cols; col++) {
    for (var row = 0; row < rows; row++) {
      if ((col % 2 == 0 && row % 2 == 1) || (col % 2 == 1 && row % 2 == 0)) fill(invert ? 255 : 0);
      else fill(invert ? 0 : 255);

      // Calculate x,y location of each cell
      var x = col * colW;
      var y = row * rowH;
      rect(x, y, colW, rowH);
    }
  }
}

// Set column width and row height based on num of cols and rows.
function init() {
  colW = width / cols;
  rowH = height / rows;
}

function keyPressed() {
  // Adjust number of columns and rows
  // ESC inverts black and white
  switch (keyCode) {
    case ESCAPE:
      invert = !invert;
      break;
    case RIGHT_ARROW:
      cols++;
      break;
    case LEFT_ARROW:
      cols--;
      break;
    case UP_ARROW:
      rows++;
      break;
    case DOWN_ARROW:
      rows--;
      break;
  }

  // Limit cols/rows to 0-10
  cols = constrain(cols, 0, 10);
  rows = constrain(rows, 0, 10);

  // Re-initialize colW and rowH
  init();

}/*
Mimi Yin NYU-ITP
Drawing skeleton joints and bones.
 */

// Declare kinectron
var kinectron = null;
var bodies = {};
var xscl, zscl;
var xshift, zshift;
var scl = true;
var sz = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Define and create an instance of kinectron
  kinectron = new Kinectron("192.168.0.112");

  // CONNECT TO MIRCROSTUDIO
  //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked);

  xscl = width/2;
  zscl = width/2;
  xshift = width/2;
  zshift = height/2;
  
  background(0);
}

function draw() {
  background(0);
  
  for(var body in bodies) {
    // Draw all the joints
    var joints = bodies[body].joints;

    // Mid-line
    var head = getPos(joints[kinectron.HEAD]);
		ellipse(head.x, head.y, 50, 50);
    
    //Calculate distance from center
    var dFromCenter = p5.Vector.sub(head, createVector(0,0)).mag();
    var dFromEdge = (sz/2) - dFromCenter;
    
  }
  
  sz++;
  fill(255);
  ellipse(0, 0, sz, sz);
}

function bodyTracked(body) {
  bodies[body.trackingId] = {
    joints: body.joints,
  }
}

// Scale the data to fit the screen
// Move it to the center of the screen
// Return it as a vector
function getPos(joint) {
  return createVector((joint.cameraZ * zscl) + zshift, (joint.cameraX * xscl) + xshift);
}

// Press mouse to switch between adjust scl v. shift
function mousePressed(){
  scl = !scl;
}

function keyPressed(){
  // Adjust scale of x,z coordinates to map to projection
  if(scl){
    switch(keyCode){
      case RIGHT_ARROW:
        shift ? xshift++ : xscl++;
        break;
      case LEFT_ARROW:
        shift ? xshift-- : xscl--;
        break;
      case UP_ARROW:
        shift ? zshift++ : zscl++;
        break;
      case DOWN_ARROW:
        shift ? zshift-- : zscl--;
        break;    
    }

    xscl = constrain(xscl, 0, width);
    zscl = constrain(zscl, 0, width);
	}
  // Adjust shift
  else {
    switch(keyCode){
      case RIGHT_ARROW:
        xshift++;
        break;
      case LEFT_ARROW:
        xshift--;
        break;
      case UP_ARROW:
        zshift++;
        break;
      case DOWN_ARROW:
        zshift--;
        break;    
    }
    xshift = constrain(xshift, 0, width);
  	zshift = constrain(zshift, 0, height);
  }
            
}

/*
Mimi Yin NYU-ITP
Mapping joint movement to sounds.
 */

// Declare kinectron
var kinectron = null;

// Sound files
var marimba, rain, thunder;

// Keep track of previous locations for 3 joints
var pHead = null;

function preload(){
  // Load sound files
  marimba = loadSound("data/marimba.mp3");
  rain = loadSound("data/rain.mp3");
  thunder = loadSound("data/thunder.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Define and create an instance of kinectron
  //kinectron = new Kinectron("172.16.228.147");
  kinectron = new Kinectron("192.168.0.112");

  // CONNECT TO MIRCROSTUDIO
  //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked);

  // Cue sounds
  marimba.loop();
  rain.loop();
  background(0);
}

function draw() {	
}

function bodyTracked(body) {
	background(0);

  // Draw all the joints
  kinectron.getJoints(drawJoint);

  // Get all the joints off the tracked body and do something with them

  // Mid-line
  var head = getPos(body.joints[kinectron.HEAD]);
  var neck = getPos(body.joints[kinectron.NECK]);
  var spineShoulder = getPos(body.joints[kinectron.SPINESHOULDER]);
  var spineMid = getPos(body.joints[kinectron.SPINEMID]);
  var spineBase = getPos(body.joints[kinectron.SPINEBASE]);

  // Right Arm
  var shoulderRight = getPos(body.joints[kinectron.SHOULDERRIGHT]);
  var elbowRight = getPos(body.joints[kinectron.ELBOWRIGHT]);
  var wristRight = getPos(body.joints[kinectron.WRISTRIGHT]);
  var handRight = getPos(body.joints[kinectron.HANDRIGHT]);
  var handTipRight = getPos(body.joints[kinectron.HANDTIPRIGHT]);
  var thumbRight = getPos(body.joints[kinectron.THUMBRIGHT]);

  // Left Arm
  var shoulderLeft = getPos(body.joints[kinectron.SHOULDERLEFT]);
  var elbowLeft = getPos(body.joints[kinectron.ELBOWLEFT]);
  var wristLeft = getPos(body.joints[kinectron.WRISTLEFT]);
  var handLeft = getPos(body.joints[kinectron.HANDLEFT]);
  var handTipLeft = getPos(body.joints[kinectron.HANDTIPLEFT]);
  var thumbLeft = getPos(body.joints[kinectron.THUMBLEFT]);

  // Right Leg
  var hipRight = getPos(body.joints[kinectron.HIPRIGHT]);
  var kneeRight = getPos(body.joints[kinectron.KNEERIGHT]);
  var ankleRight = getPos(body.joints[kinectron.ANKLERIGHT]);
  var footRight = getPos(body.joints[kinectron.FOOTRIGHT]);

  // Left Leg
  var hipLeft = getPos(body.joints[kinectron.HIPLEFT]);
  var kneeLeft = getPos(body.joints[kinectron.KNEELEFT]);
  var ankleLeft = getPos(body.joints[kinectron.ANKLELEFT]);
  var footLeft = getPos(body.joints[kinectron.FOOTLEFT]);

  stroke(255);
  fill(255);

  // As the hands get closer, the marimba quiets down
  var d = p5.Vector.dist(handLeft, handRight);
  marimba.setVolume(d/100);

  // As the left hand gets closer to the head, the rain gets louder, non-linearly
  var d = p5.Vector.dist(handLeft, head);
  rain.setVolume(100/d);

  if(pHead != null) {
    var d = p5.Vector.dist(pHead, head);
		
    // Speed of head sets off thunder
    // Only set it off 1x
    if (d > 50 && (thunder.currentTime() == 0 || thunder.currentTime() > 2)) {
      thunder.jump(0);
      // Wait half a second to play to avoid distortion
      setTimeout(function () {
        thunder.play();
      }, 500);
    }
  }

  // Remember position for next frame
  pHead = head;
}

// Scale the data to fit the screen
// Return it as a vector
function getPos(joint) {
  return createVector(joint.cameraX * width/2 + width/2, -joint.cameraY * width/2 + height/2, joint.cameraZ * width/2);
}

// Draw skeleton
function drawJoint(joint) {

  //console.log("JOINT OBJECT", joint);
  var pos = getPos(joint);

  //Kinect location data needs to be normalized to canvas size
  stroke(255);
  strokeWeight(5);
  point(pos.x, pos.y);
}


/*
Mimi Yin NYU-ITP
Mapping joint movement to sounds.
 */

// Declare kinectron
var kinectron = null;

// Sound files
var marimba, rain, thunder;

// Keep track of previous locations for 3 joints
var pHead = null;

function preload(){
  // Load sound files
  marimba = loadSound("data/marimba.mp3");
  rain = loadSound("data/rain.mp3");
  thunder = loadSound("data/thunder.mp3");

  // Load image of buddha
  buddhaImg = loadImage("data/buddha.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Define and create an instance of kinectron
  //kinectron = new Kinectron("172.16.228.147");
  kinectron = new Kinectron("192.168.0.112");

  // CONNECT TO MIRCROSTUDIO
  //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked);

  // Cue sounds
  marimba.loop();
  rain.loop();

  background(0);
}

function draw() {
  //background(0);
}

function bodyTracked(body) {
	background(0);

  // Draw all the joints
  kinectron.getJoints(drawJoint);

  // Get all the joints off the tracked body and do something with them

  // Mid-line
  var head = getPos(body.joints[kinectron.HEAD]);
  var neck = getPos(body.joints[kinectron.NECK]);
  var spineShoulder = getPos(body.joints[kinectron.SPINESHOULDER]);
  var spineMid = getPos(body.joints[kinectron.SPINEMID]);
  var spineBase = getPos(body.joints[kinectron.SPINEBASE]);

  // Right Arm
  var shoulderRight = getPos(body.joints[kinectron.SHOULDERRIGHT]);
  var elbowRight = getPos(body.joints[kinectron.ELBOWRIGHT]);
  var wristRight = getPos(body.joints[kinectron.WRISTRIGHT]);
  var handRight = getPos(body.joints[kinectron.HANDRIGHT]);
  var handTipRight = getPos(body.joints[kinectron.HANDTIPRIGHT]);
  var thumbRight = getPos(body.joints[kinectron.THUMBRIGHT]);

  // Left Arm
  var shoulderLeft = getPos(body.joints[kinectron.SHOULDERLEFT]);
  var elbowLeft = getPos(body.joints[kinectron.ELBOWLEFT]);
  var wristLeft = getPos(body.joints[kinectron.WRISTLEFT]);
  var handLeft = getPos(body.joints[kinectron.HANDLEFT]);
  var handTipLeft = getPos(body.joints[kinectron.HANDTIPLEFT]);
  var thumbLeft = getPos(body.joints[kinectron.THUMBLEFT]);

  // Right Leg
  var hipRight = getPos(body.joints[kinectron.HIPRIGHT]);
  var kneeRight = getPos(body.joints[kinectron.KNEERIGHT]);
  var ankleRight = getPos(body.joints[kinectron.ANKLERIGHT]);
  var footRight = getPos(body.joints[kinectron.FOOTRIGHT]);

  // Left Leg
  var hipLeft = getPos(body.joints[kinectron.HIPLEFT]);
  var kneeLeft = getPos(body.joints[kinectron.KNEELEFT]);
  var ankleLeft = getPos(body.joints[kinectron.ANKLELEFT]);
  var footLeft = getPos(body.joints[kinectron.FOOTLEFT]);

  stroke(255);
  fill(255);

  // As the hands get closer, the marimba quiets down
  var d = p5.Vector.dist(handLeft, handRight);
  marimba.setVolume(d/100);
  strokeWeight(d/10);
  line(handLeft.x, handLeft.y, handRight.x, handRight.y);

  // As the left hand gets closer to the head, the rain gets louder, non-linearly
  var d = p5.Vector.dist(handLeft, head);
  rain.setVolume(10/d);
  // strokeWeight(10000/d);
  // line(handLeft.x, handLeft.y, head.x, head.y);

  if(pHead != null) {
    var d = p5.Vector.dist(pHead, head);

    // Speed of head sets off thunder
    if(d > 50) {
      thunder.jump(0);
      thunder.play();
    }
  }

  // Remember position for next frame
  pHead = head;
}

// Scale the data to fit the screen
// Return it as a vector
function getPos(joint) {
  return createVector(joint.cameraX * width/2 + width/2, -joint.cameraY * width/2 + height/2, joint.cameraZ * width/2);
}

// Draw skeleton
function drawJoint(joint) {

  //console.log("JOINT OBJECT", joint);
  var pos = getPos(joint);

  //Kinect location data needs to be normalized to canvas size
  stroke(255);
  strokeWeight(5);
  point(pos.x, pos.y);
}


/*
Mimi Yin NYU-ITP
Mapping joint movements to words.
 */

// Declare kinectron
var kinectron = null;

// Sound files
var yo, zing, buddha;
// Volume of buddha file
var buddhaVol = 0;

// Keep track of previous locations for 3 joints
var pHead = null;
var pHandLeft = null;
var pHandRight = null;

function preload(){
  // Load sound files
  yo = loadSound("data/yo.wav");
  zing = loadSound("data/zing.mp3");
  buddha = loadSound("data/buddha.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Define and create an instance of kinectron
  //kinectron = new Kinectron("172.16.228.147");
  kinectron = new Kinectron("192.168.0.112");

  // CONNECT TO MIRCROSTUDIO
  //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked);

  // Cue sounds
  buddha.setVolume(buddhaVol);
  buddha.loop();

  imageMode(CENTER);
  background(0);
}

function draw() {
  //background(0);
}

function bodyTracked(body) {
	background(0);

  // Draw all the joints
  kinectron.getJoints(drawJoint);

  // Get all the joints off the tracked body and do something with them

  // Mid-line
  var head = getPos(body.joints[kinectron.HEAD]);
  var neck = getPos(body.joints[kinectron.NECK]);
  var spineShoulder = getPos(body.joints[kinectron.SPINESHOULDER]);
  var spineMid = getPos(body.joints[kinectron.SPINEMID]);
  var spineBase = getPos(body.joints[kinectron.SPINEBASE]);

  // Right Arm
  var shoulderRight = getPos(body.joints[kinectron.SHOULDERRIGHT]);
  var elbowRight = getPos(body.joints[kinectron.ELBOWRIGHT]);
  var wristRight = getPos(body.joints[kinectron.WRISTRIGHT]);
  var handRight = getPos(body.joints[kinectron.HANDRIGHT]);
  var handTipRight = getPos(body.joints[kinectron.HANDTIPRIGHT]);
  var thumbRight = getPos(body.joints[kinectron.THUMBRIGHT]);

  // Left Arm
  var shoulderLeft = getPos(body.joints[kinectron.SHOULDERLEFT]);
  var elbowLeft = getPos(body.joints[kinectron.ELBOWLEFT]);
  var wristLeft = getPos(body.joints[kinectron.WRISTLEFT]);
  var handLeft = getPos(body.joints[kinectron.HANDLEFT]);
  var handTipLeft = getPos(body.joints[kinectron.HANDTIPLEFT]);
  var thumbLeft = getPos(body.joints[kinectron.THUMBLEFT]);

  // Right Leg
  var hipRight = getPos(body.joints[kinectron.HIPRIGHT]);
  var kneeRight = getPos(body.joints[kinectron.KNEERIGHT]);
  var ankleRight = getPos(body.joints[kinectron.ANKLERIGHT]);
  var footRight = getPos(body.joints[kinectron.FOOTRIGHT]);

  // Left Leg
  var hipLeft = getPos(body.joints[kinectron.HIPLEFT]);
  var kneeLeft = getPos(body.joints[kinectron.KNEELEFT]);
  var ankleLeft = getPos(body.joints[kinectron.ANKLELEFT]);
  var footLeft = getPos(body.joints[kinectron.FOOTLEFT]);

  stroke(255);
  fill(255);

  if(pHead != null) {
    var d = p5.Vector.dist(pHead, head);

    // Constantly moving head, makes buddha talk
    if(d > 10) {
      buddhaVol+=0.5;
    }
    // But Buddha is always fading
    buddhaVol -= 0.1;
    buddha.setVolume(constrain(buddhaVol, 0, 2));

    // Speed of left hand sets off zing
    var d = p5.Vector.dist(pHandLeft, handLeft);
    if(d > 50) {
      zing.jump(0);
      zing.play();
    }
    // Scale textsize to speed of left hand
    noStroke();
    textSize(d);
    text("Zing", handLeft.x, handLeft.y);

    // Speed of right hand sets off yo
    var d = p5.Vector.dist(pHandRight, handRight);
    if(d > 50) {
      yo.jump(0);
      yo.play();
    }

    // Scale textsize to speed of left hand
    textSize(d);
    text("Yo", pHandRight.x, pHandRight.y);
  }

  // Remember positions for next frame
  pHead = head;
  pHandRight = handRight;
  pHandLeft = handLeft;
}

// Scale the data to fit the screen
// Return it as a vector
function getPos(joint) {
  return createVector(joint.cameraX * width/2 + width/2, -joint.cameraY * width/2 + height/2, joint.cameraZ * width/2);
}

// Draw skeleton
function drawJoint(joint) {

  //console.log("JOINT OBJECT", joint);
  var pos = getPos(joint);

  //Kinect location data needs to be normalized to canvas size
  stroke(255);
  strokeWeight(5);
  point(pos.x, pos.y);
}


/*
Mimi Yin NYU-ITP
Extra mapping techniques.
*/
var sound;
var value = 0;
var mode = 0;

function preload() {
  sound = loadSound("data/rain.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  sound.setVolume(0);
  sound.loop();
  background(0);
}

function draw() {
  background(0);
  switch (mode) {
    // Zeno's Paradox: Move only a % of the way towards the mouse
    case 0:
      value += (mouseX - value ) * 0.01;
      break;
    case 1:
      // Move based on speed of mouse
      value += abs(mouseX - pmouseX);
      // But always lose ground
      value -= 10;
      break;
  }

  var volume = value / width;
  sound.setVolume(volume);
  fill(255);
  var sz = volume*100 + 50;
  ellipse(value, height / 2, sz, sz);
}

function keyPressed() {
  mode++;
  mode%=2;
}var locs = [];
function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  beginShape();
  for(var l = 0; l < locs.length; l++) {
   curveVertex(locs[l].x, locs[l].y); 
   //vertex(locs[l].x, locs[l].y); 
  }
  endShape(CLOSE);
  
}

function mousePressed(){
  locs.push(createVector(mouseX, mouseY));
}/*
Mimi Yin NYU-ITP
Mapping mouse to sound.
*/

var marimba, rain, thunder;
var counter = 60;

function preload() {
  marimba = loadSound("data/marimba.mp3");
  rain = loadSound("data/rain.mp3");
  thunder = loadSound("data/thunder.mp3");
}

function setup()
{
  createCanvas(windowWidth, windowHeight);
  marimba.loop();
  rain.loop();
}

function draw()
{
  background(0);
  stroke(255);

  var marimbaVol = map(mouseX, 0, width, 0, 5);
  marimba.setVolume(marimbaVol);

  var rainVol = map(mouseY, 0, height,  0, 5);
  rain.setVolume(rainVol);
  var distance = dist(mouseX, mouseY, pmouseX, pmouseY);
  if ( distance > width/8 && counter > 60) {
    thunder.setVolume(5);
    thunder.jump();
    counter = 0;
  }
  counter++;
}/*
Mimi Yin NYU-ITP
Mapping techniques.
*/
var sound;
var input = 0;
var mapping = 0;
var value = 0;
var pspeed = 0;
var volume = 0;

var inputs = ["Position", "Speed", "Acceleration"];
var mappings = ["Linear", "Non-Linear", "Step", "Sawtooth", "Sin", "Noise", "Linear-Random", "Random"];

function preload() {
  sound = loadSound("data/police.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  sound.setVolume(0);
  sound.loop();
  noiseSeed(0);
  background(0);
}

function draw() {
  // Switch the input
  var speed = abs(mouseX - pmouseX);
  var accel = abs(speed - pspeed);

  switch (input) {
    // Position
    case 0:
      value = mouseX;
      break;
      // Speed
    case 1:
      value = speed * width * 0.1;
      break;
      // Acceleration
    case 2:
      value = accel * width * 0.1;
      break;
  }

  // Store the value for next frame
  pspeed = speed;

  // Make it louder
  // Define the range of volume to be roughly (0-2);
  var scl = 2;

  // Switch how inputs are mapped to volume
  switch (mapping) {
    // Linear mapping
    case 0:
      volume = scl * value / width;
      break;
      // Non-linear mapping
    case 1:
      volume = width / (width - value) - 1;
      break;
      // Step-function
    case 2:
      var interval = width / 3;
      volume = scl * floor(value / interval);
      break;
      // Saw-tooth wave
    case 3:
      var interval = width / 3;
      volume = scl * (value % interval / interval);
      break;
      // Sine wave
    case 4:
      volume = (sin(2 * TWO_PI * value / width) * scl / 2 + scl / 2);
      break;
      // Noise
    case 5:
      if (frameCount % 2 == 0) {
        volume = noise(value * 0.01) - 0.25;
        volume = map(volume, 0, 0.5, 0, 1);
      }
      break;
      // Linear random
    case 6:
      if (frameCount % 5 == 0) {
        volume = random(scl * value / width);
      }
      break;
      // Random
    case 7:
      if (frameCount % 5 == 0) {
        volume = random(scl);
      }
      break;
  }

  volume = constrain(volume, 0, 100);
  sound.setVolume(volume);

  background(0);
  fill(255);
  noStroke();
  ellipse(mouseX, height / 2, volume * 100 + 50, volume * 100 + 50);

  textSize(12);
  text("Press RETURN to change input. Press ESC to change mapping.", 10, 20);
  textSize(18);
  text("INPUT: " + input + "\tMAPPING: " + mapping, 10, 40);
  //text("INPUT: " + input + " (" + inputs[input] + ")\tMAPPING: " + mapping + " (" + mappings[mapping] + ")", 10, 40);
}

function keyPressed() {
  switch (keyCode) {
    case ESCAPE:
      mapping++;
      mapping %= 8;
      break;
    case RETURN:
      input++;
      input %= 3;
      break;
  }
}/*
Mimi Yin NYU-ITP
Drawing lines with selected joint in 4 ways
With multiple skeletons
*/

// Declare kinectron
var kinectron = null;
var mode;
var j;

var bodies = {};

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Define and create an instance of kinectron
  kinectron = new Kinectron("192.168.0.118");
  //kinectron = new Kinectron("128.122.151.171");

  // CONNECT TO MIRCROSTUDIO
  //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked);

  // Initialize values
  mode = 1;
  j = kinectron.HANDLEFT;

  background(255);
}

function draw() {
}

function bodyTracked(body) {
  
  // Start tracking new bodies!
  // Assign it a random color
  if(!(body.trackingId in bodies)) {
    bodies[body.trackingId] = { r: random(255), g: random(255), b: random(255) };
    
  }
  
  // Shortcut for this body;
  var b = bodies[body.trackingId];

  // Draw all the joints
  //kinectron.getJoints(drawJoint);

  // Get the selected joint to draw with its position
  var joint = body.joints[j];
  var x = (joint.cameraX * width/2) + width/2;
  var y = (-joint.cameraY * height/2) + height/2;
  var z = joint.cameraZ * 100;

  // Print out x,y values
  //console.log(joint);
  //console.log(frameCount + "\tx: " + nfs(x, 0, 2) + "\ty: " + nfs(y, 0, 2) + "\tz: " + nfs(z, 0, 2));

  if(mode < 4 && b.px != null) {
  	//console.log("px: " + nfs(px, 0, 2) + "\tpy: " + nfs(py, 0, 2) + "\tpz: " + nfs(pz, 0, 2));

    var speed = dist(b.px, b.py, b.pz, x, y, z);
    var sw = 1;

    // 3 ways to set strokeweight according to speed.
    switch(mode){
      case 1:
        sw = speed/10;
        break;
      case 2:
        sw = 100/speed;
        break;
      case 3:
        sw = map(speed, 0, 100, 10, 0);
        break;
    }

    // Draw the line
    stroke(b.r, b.g, b.b);
    strokeWeight(sw);
    line(b.px, b.py, x, y);
  }

  // Store current location for next frame
  b.px = x;
  b.py = y;
  b.pz = z;

  // Get the hands off the tracked body and do somethign with them
  //kinectron.getHands(drawJoint);
}

// Draw skeleton
function drawJoint(joint) {

  //console.log("JOINT OBJECT", joint);
  x = (joint.cameraX * width/2) + width/2;
  y = (-joint.cameraY * height/2) + height/2;
  z = joint.cameraZ * 100;

  fill(255);
  push();
  //Kinect location data needs to be normalized to canvas size
  translate(x, y);
	ellipse(0, 0, 10, 10);
  pop();
}

function keyPressed(){
  // Use RIGHT/LEFT arrow keys to change selected joint
  switch(keyCode){
    case UP_ARROW:
      mode++;
      mode%=4;
      break;
    case LEFT_ARROW:
    	j--;
  		if(j < 0) j = 25-1;
    case RIGHT_ARROW:
    	j++;
  		j%=25;
      break;
    case ENTER:
      background(255);
      break;
  }
}



/*
Mimi Yin NYU-ITP
Drawing skeleton joints
Showing selected joint
 */

// Declare kinectron
var kinectron = null;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  // Define and create an instance of kinectron
  kinectron = new Kinectron("172.16.216.84");

  // CONNECT TO MIRCROSTUDIO
  //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked);

  background(0);
}

function draw() {
  //background(0);
}

function bodyTracked(body) {
  background(255);

  rotateY(2*TWO_PI*mouseX/width);
  rotateX(3*TWO_PI*mouseY/width);

  // Draw all the joints
  kinectron.getJoints(drawJoint);

  // Get all the joints off the tracked body and do something with them

  // Mid-line
  var head = getPos(body.joints[kinectron.HEAD]);
  var neck = getPos(body.joints[kinectron.NECK]);
  var spineShoulder = getPos(body.joints[kinectron.SPINESHOULDER]);
  var spineMid = getPos(body.joints[kinectron.SPINEMID]);
  var spineBase = getPos(body.joints[kinectron.SPINEBASE]);

  // Right Arm
  var shoulderRight = getPos(body.joints[kinectron.SHOULDERRIGHT]);
  var elbowRight = getPos(body.joints[kinectron.ELBOWRIGHT]);
  var wristRight = getPos(body.joints[kinectron.WRISTRIGHT]);
  var handRight = getPos(body.joints[kinectron.HANDRIGHT]);
  var handTipRight = getPos(body.joints[kinectron.HANDTIPRIGHT]);
  var thumbRight = getPos(body.joints[kinectron.THUMBRIGHT]);

  // Left Arm
  var shoulderLeft = getPos(body.joints[kinectron.SHOULDERLEFT]);
  var elbowLeft = getPos(body.joints[kinectron.ELBOWLEFT]);
  var wristLeft = getPos(body.joints[kinectron.WRISTLEFT]);
  var handLeft = getPos(body.joints[kinectron.HANDLEFT]);
  var handTipLeft = getPos(body.joints[kinectron.HANDTIPLEFT]);
  var thumbLeft = getPos(body.joints[kinectron.THUMBLEFT]);

  // Right Leg
  var hipRight = getPos(body.joints[kinectron.HIPRIGHT]);
  var kneeRight = getPos(body.joints[kinectron.KNEERIGHT]);
  var ankleRight = getPos(body.joints[kinectron.ANKLERIGHT]);
  var footRight = getPos(body.joints[kinectron.FOOTRIGHT]);

  // Left Leg
  var hipLeft = getPos(body.joints[kinectron.HIPLEFT]);
  var kneeLeft = getPos(body.joints[kinectron.KNEELEFT]);
  var ankleLeft = getPos(body.joints[kinectron.ANKLELEFT]);
  var footLeft = getPos(body.joints[kinectron.FOOTLEFT]);

  push();
  translate(spineBase.x, spineBase.y, spineBase.z);
  sphere(10);
  pop();

  push();
  translate(handLeft.x, handLeft.y, handLeft.z);
  sphere(50);
  pop();

  // Put the head on the left hand as if it were the base of the spine
  // Make it a box
  var offset = p5.Vector.sub(head, spineBase).add(handLeft);
  push();
  translate(offset.x, offset.y, offset.z);
  box(100);
  pop();

}

// Scale the data to fit the screen
// Return it as a vector
function getPos(joint) {
  return createVector(joint.cameraX*width/4, -joint.cameraY*width/4, joint.cameraZ*100);
}

// Draw skeleton
function drawJoint(joint) {

  //console.log("JOINT OBJECT", joint);
  var pos = getPos(joint);

  //Kinect location data needs to be normalized to canvas size
  push();
	translate(pos.x, pos.y, pos.z);
  sphere(5);
  pop();
}
/*
Mimi Yin NYU-ITP
Drawing 2D body.
*/

// Declare kinectron
var kinectron = null;
var mode = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Define and create an instance of kinectron
  kinectron = new Kinectron("172.16.230.153");

  // CONNECT TO MIRCROSTUDIO
  //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked);

  background(0);
}

function draw() {
  //background(0);
}

function bodyTracked(body) {
	background(0);

  // Draw all the joints
  kinectron.getJoints(drawJoint);

  // Get all the joints off the tracked body and do something with them

  // Mid-line
  var head = getPos(body.joints[kinectron.HEAD]);
  var neck = getPos(body.joints[kinectron.NECK]);
  var spineShoulder = getPos(body.joints[kinectron.SPINESHOULDER]);
  var spineMid = getPos(body.joints[kinectron.SPINEMID]);
  var spineBase = getPos(body.joints[kinectron.SPINEBASE]);

  // Right Arm
  var shoulderRight = getPos(body.joints[kinectron.SHOULDERRIGHT]);
  var elbowRight = getPos(body.joints[kinectron.ELBOWRIGHT]);
  var wristRight = getPos(body.joints[kinectron.WRISTRIGHT]);
  var handRight = getPos(body.joints[kinectron.HANDRIGHT]);
  var handTipRight = getPos(body.joints[kinectron.HANDTIPRIGHT]);
  var thumbRight = getPos(body.joints[kinectron.THUMBRIGHT]);

  // Left Arm
  var shoulderLeft = getPos(body.joints[kinectron.SHOULDERLEFT]);
  var elbowLeft = getPos(body.joints[kinectron.ELBOWLEFT]);
  var wristLeft = getPos(body.joints[kinectron.WRISTLEFT]);
  var handLeft = getPos(body.joints[kinectron.HANDLEFT]);
  var handTipLeft = getPos(body.joints[kinectron.HANDTIPLEFT]);
  var thumbLeft = getPos(body.joints[kinectron.THUMBLEFT]);

  // Right Leg
  var hipRight = getPos(body.joints[kinectron.HIPRIGHT]);
  var kneeRight = getPos(body.joints[kinectron.KNEERIGHT]);
  var ankleRight = getPos(body.joints[kinectron.ANKLERIGHT]);
  var footRight = getPos(body.joints[kinectron.FOOTRIGHT]);

  // Left Leg
  var hipLeft = getPos(body.joints[kinectron.HIPLEFT]);
  var kneeLeft = getPos(body.joints[kinectron.KNEELEFT]);
  var ankleLeft = getPos(body.joints[kinectron.ANKLELEFT]);
  var footLeft = getPos(body.joints[kinectron.FOOTLEFT]);

  fill(255, 64);
  stroke(255);

  switch(mode) {
    case 0:
      // Draw  shape
      strokeWeight(2);
      beginShape();
        vertex(hipLeft.x, hipLeft.y);
        vertex(thumbRight.x, thumbRight.y);
        vertex(head.x, head.y);
        vertex(footRight.x, footRight.y);
        vertex(shoulderLeft.x, shoulderLeft.y);
        vertex(hipLeft.x, hipLeft.y);
      endShape(CLOSE);
      break;
    case 1:
      // Draw curved shape
      strokeWeight(2);
      beginShape();
        curveVertex(hipLeft.x, hipLeft.y);
        curveVertex(thumbRight.x, thumbRight.y);
        curveVertex(head.x, head.y);
        curveVertex(footRight.x, footRight.y);
        curveVertex(shoulderLeft.x, shoulderLeft.y);
      endShape(CLOSE);
      break;
    }

  textSize(18);
  stroke(255);
  fill(255);
  text("Press key to change modes.", 10, 20);
}

// Scale the data to fit the screen
// Move it to the center of the screen
// Return it as a vector
function getPos(joint) {
  return createVector((joint.cameraX * width/2) + width/2, (-joint.cameraY * width/2) + height/2);
}

// Draw skeleton
function drawJoint(joint) {

  //console.log("JOINT OBJECT", joint);
  var pos = getPos(joint);

  //Kinect location data needs to be normalized to canvas size
  stroke(255);
  strokeWeight(5);
  point(pos.x, pos.y);
}

function keyPressed(){
  mode++;
  mode%=2;
}



/*
Mimi Yin NYU-ITP
Drawing skeleton joints and bones.
 */

// Declare kinectron
var kinectron = null;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Define and create an instance of kinectron
  kinectron = new Kinectron("172.16.230.153");

  // CONNECT TO MIRCROSTUDIO
  //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked);

  background(0);
}

function draw() {
  //background(0);
}

function bodyTracked(body) {
  background(0);

  // Draw all the joints
  kinectron.getJoints(drawJoint);

  // Get all the joints off the tracked body and do something with them

  // Mid-line
  var head = getPos(body.joints[kinectron.HEAD]);
  var neck = getPos(body.joints[kinectron.NECK]);
  var spineShoulder = getPos(body.joints[kinectron.SPINESHOULDER]);
  var spineMid = getPos(body.joints[kinectron.SPINEMID]);
  var spineBase = getPos(body.joints[kinectron.SPINEBASE]);

  // Right Arm
  var shoulderRight = getPos(body.joints[kinectron.SHOULDERRIGHT]);
  var elbowRight = getPos(body.joints[kinectron.ELBOWRIGHT]);
  var wristRight = getPos(body.joints[kinectron.WRISTRIGHT]);
  var handRight = getPos(body.joints[kinectron.HANDRIGHT]);
  var handTipRight = getPos(body.joints[kinectron.HANDTIPRIGHT]);
  var thumbRight = getPos(body.joints[kinectron.THUMBRIGHT]);

  // Left Arm
  var shoulderLeft = getPos(body.joints[kinectron.SHOULDERLEFT]);
  var elbowLeft = getPos(body.joints[kinectron.ELBOWLEFT]);
  var wristLeft = getPos(body.joints[kinectron.WRISTLEFT]);
  var handLeft = getPos(body.joints[kinectron.HANDLEFT]);
  var handTipLeft = getPos(body.joints[kinectron.HANDTIPLEFT]);
  var thumbLeft = getPos(body.joints[kinectron.THUMBLEFT]);

  // Right Leg
  var hipRight = getPos(body.joints[kinectron.HIPRIGHT]);
  var kneeRight = getPos(body.joints[kinectron.KNEERIGHT]);
  var ankleRight = getPos(body.joints[kinectron.ANKLERIGHT]);
  var footRight = getPos(body.joints[kinectron.FOOTRIGHT]);

  // Left Leg
  var hipLeft = getPos(body.joints[kinectron.HIPLEFT]);
  var kneeLeft = getPos(body.joints[kinectron.KNEELEFT]);
  var ankleLeft = getPos(body.joints[kinectron.ANKLELEFT]);
  var footLeft = getPos(body.joints[kinectron.FOOTLEFT]);

  noFill();
  stroke(255);
  strokeWeight(10);

  // Draw Bust
  beginShape();
  vertex(head.x, head.y);
  vertex(neck.x, neck.y);
  vertex(spineShoulder.x, spineShoulder.y);
  vertex(spineMid.x, spineMid.y);
  vertex(spineBase.x, spineBase.y);
  endShape();


  // Draw shoulders
  line(spineShoulder.x, spineShoulder.y, shoulderRight.x, shoulderRight.y);
  line(spineShoulder.x, spineShoulder.y, shoulderLeft.x, shoulderLeft.y);


  // Draw Right Arm
  beginShape();
  vertex(shoulderRight.x, shoulderRight.y);
  vertex(elbowRight.x, elbowRight.y);
  vertex(wristRight.x, wristRight.y);
  vertex(handRight.x, handRight.y);
  vertex(handTipRight.x, handTipRight.y);
  endShape();

  // Draw Right Thumb
  line(handRight.x, handRight.y, thumbRight.x, thumbRight.y);

  // Draw Left Arm (on top of head)
  // push();
  // var offset = p5.Vector.sub(head, shoulderLeft);
  // translate(offset.x, offset.y);
  // beginShape();
  // vertex(shoulderLeft.x, shoulderLeft.y);
  // vertex(elbowLeft.x, elbowLeft.y);
  // vertex(wristLeft.x, wristLeft.y);
  // vertex(handLeft.x, handLeft.y);
  // vertex(handTipLeft.x, handTipLeft.y);
  // endShape();
  // pop();


  // Draw Left Arm
  beginShape();
  vertex(shoulderLeft.x, shoulderLeft.y);
  vertex(elbowLeft.x, elbowLeft.y);
  vertex(wristLeft.x, wristLeft.y);
  vertex(handLeft.x, handLeft.y);
  vertex(handTipLeft.x, handTipLeft.y);
  endShape();

  // // Draw Left Thumb
  line(handLeft.x, handLeft.y, thumbLeft.x, thumbLeft.y);
  //
  // // Draw hips
  line(spineBase.x, spineBase.y, hipRight.x, hipRight.y);
  line(spineBase.x, spineBase.y, hipLeft.x, hipLeft.y);
  //
  // // Draw Right Leg
  beginShape();
  vertex(hipRight.x, hipRight.y);
  vertex(kneeRight.x, kneeRight.y);
  vertex(ankleRight.x, ankleRight.y);
  vertex(footRight.x, footRight.y);
  endShape();
  //
  // // Draw Left Leg
  beginShape();
  vertex(hipLeft.x, hipLeft.y);
  vertex(kneeLeft.x, kneeLeft.y);
  vertex(ankleLeft.x, ankleLeft.y);
  vertex(footLeft.x, footLeft.y);
  endShape();
}

// Scale the data to fit the screen
// Return it as a vector
function getPos(joint) {
  return createVector((joint.cameraX * width/2) + width/2, (-joint.cameraY * width/2) + height/2);
}

// Draw skeleton
function drawJoint(joint) {

  //console.log("JOINT OBJECT", joint);
  var pos = getPos(joint);

  //Kinect location data needs to be normalized to canvas size
  stroke(255);
  strokeWeight(5);
  point(pos.x, pos.y);
}/*
Mimi Yin NYU-ITP
Drawing a trail with selected joint in 4 ways
*/

// Declare kinectron
var kinectron = null;
var j;
var locs = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Define and create an instance of kinectron
  kinectron = new Kinectron("172.16.224.146");

  // CONNECT TO MIRCROSTUDIO
  //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked);

  // Initialize values
  j = kinectron.HANDLEFT;

  background(255);
}

function draw() {
}

function bodyTracked(body) {
  background(0);

  // Draw all the joints
  //kinectron.getJoints(drawJoint);

  // Get the selected joint to draw with its position
  var joint = body.joints[j];
  x = (joint.cameraX * width/2) + width/2;
  y = (-joint.cameraY * height/2) + height/2;

  // Add to stored positions
  locs.push(createVector(x, y));
  // Start pushing out oldest position after 50 frames
  if(locs.length > 50) locs.shift();

  fill(255, 64);
  noStroke();
  // Draw positions as ellipses
  for (var l = 0 ; l < locs.length; l++) {
      // Throbbing
      var sz = sin(frameCount*0.01)*l + l/2;
      // Easing
      locs[l].x += (x-locs[l].x)*0.001;
      locs[l].y += (y-locs[l].y)*0.001;
      ellipse(locs[l].x, locs[l].y, sz, sz);
  }


  // Get the hands off the tracked body and do somethign with them
  //kinectron.getHands(drawJoint);
}

// Draw skeleton
function drawJoint(joint) {

  //console.log("JOINT OBJECT", joint);
  x = (joint.cameraX * width/2) + width/2;
  y = (-joint.cameraY * height/2) + height/2;
  z = joint.cameraZ * 100;

  fill(255);
  push();
  //Kinect location data needs to be normalized to canvas size
  translate(x, y);
	ellipse(0, 0, 10, 10);
  pop();
}

function keyPressed(){
  // Use RIGHT/LEFT arrow keys to change selected joint
  switch(keyCode){
    case LEFT_ARROW:
    	j--;
  		if(j < 0) j = 25-1;
    case RIGHT_ARROW:
    	j++;
  		j%=25;
      break;
    case ENTER:
      background(255);
      break;
  }
}



/*
Mimi Yin NYU-ITP
Drawing lines with selected joint in 4 ways
*/

// Declare kinectron
var kinectron = null;
var mode;
var j;
var x, y, z;
var px, py, pz;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Define and create an instance of kinectron
  kinectron = new Kinectron("172.16.224.146");

  // CONNECT TO MIRCROSTUDIO
  //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked);

  // Initialize values
  mode = 1;
  j = kinectron.HANDLEFT;

  background(255);
}

function draw() {
}

function bodyTracked(body) {

  // Draw all the joints
  //kinectron.getJoints(drawJoint);

  // Get the selected joint to draw with its position
  var joint = body.joints[j];
  x = (joint.cameraX * width/2) + width/2;
  y = (-joint.cameraY * height/2) + height/2;
  z = joint.cameraZ * 100;

  // Print out x,y values
  //console.log(joint);
  //console.log(frameCount + "\tx: " + nfs(x, 0, 2) + "\ty: " + nfs(y, 0, 2) + "\tz: " + nfs(z, 0, 2));

  if(mode < 4 && px != null) {
  	//console.log("px: " + nfs(px, 0, 2) + "\tpy: " + nfs(py, 0, 2) + "\tpz: " + nfs(pz, 0, 2));

    var speed = dist(px, py, pz, x, y, z);
    var sw = 1;

    // 3 ways to set strokeweight according to speed.
    switch(mode){
      case 1:
        sw = speed/10;
        break;
      case 2:
        sw = 100/speed;
        break;
      case 3:
        sw = map(speed, 0, 100, 10, 0);
        break;
    }

    // Draw the line
    stroke(0);
    strokeWeight(sw);
    line(px, py, x, y);
  }

  // Store current location for next frame
  px = x;
  py = y;
  pz = z;

  // Get the hands off the tracked body and do somethign with them
  //kinectron.getHands(drawJoint);
}

// Draw skeleton
function drawJoint(joint) {

  //console.log("JOINT OBJECT", joint);
  x = (joint.cameraX * width/2) + width/2;
  y = (-joint.cameraY * height/2) + height/2;
  z = joint.cameraZ * 100;

  fill(255);
  push();
  //Kinect location data needs to be normalized to canvas size
  translate(x, y);
	ellipse(0, 0, 10, 10);
  pop();
}

function keyPressed(){
  // Use RIGHT/LEFT arrow keys to change selected joint
  switch(keyCode){
    case UP_ARROW:
      mode++;
      mode%=4;
      break;
    case LEFT_ARROW:
    	j--;
  		if(j < 0) j = 25-1;
    case RIGHT_ARROW:
    	j++;
  		j%=25;
      break;
    case ENTER:
      background(255);
      break;
  }
}



/*
Mimi Yin NYU-ITP
Circular Pathways with Controls
*/

var x, y;
var px, py;
var a;
var aspeed;
var yfreq;
var range, yscl;
var centerX, centerY;
var preset = 1;
var mode = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = 0;
  y = 0;

  px = x;
  py = y;

  angle = 0;
  aspeed = 0.01;
  yfreq = 1;

  range = width/4;
  yscl = 1;

  centerX = width/2;
  centerY = height/2;

  background(0);
}

function draw() {
  angle += aspeed;

  //Move
  x = cos(angle)*range + centerX;
  y = sin(angle*yfreq)*range*yscl + centerY;

  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////
  ///////////////////////POLAR ROSES///////////////////////
  /////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////

  // // Spiral
  // range += 0.1;
  // x = cos(angle)*range + centerX;
  // y = sin(angle*yfreq)*range*yscl + centerY;
  //
  // // Straight line
  // x = cos(angle)*range*cos(angle) + centerX;
  // y = sin(angle*yfreq)*range*yscl*sin(angle) + centerY;
  //
  // // Circular squares
  // x = cos(sin(angle)*angle)*range + centerX;
  // y = sin(cos(angle)*angle*yfreq)*range*yscl + centerY;
  //
  // // Just a circle, sorta
  // x = cos(cos(angle)*angle)*range + centerX;
  // y = sin(cos(angle)*angle*yfreq)*range*yscl + centerY;

  // // Inny - Outy
  // x = cos(sin(angle)*angle)*range*sin(angle)+ centerX;
  // y = sin(cos(angle)*angle*yfreq)*range*yscl*cos(angle)+ centerY;

  // Bigger sweeps with tan
  x = cos(sin(angle)*angle)*range*tan(angle) + centerX;
  y = sin(cos(angle)*angle*yfreq)*range*yscl*tan(angle) + centerY;

  // Traversing by tan()ing centerX
  // Alternating curves with straight darts
  // x = cos(angle)*range*sin(angle) + centerX*tan(angle);
  // y = sin(cos(angle)*angle*yfreq)*range*yscl*cos(angle) + centerY;

	stroke(255, 64);
  strokeWeight(5);
  if(frameCount > 1) line(px, py, x, y);

  px = x;
  py = y;

  // Print control values to screen
  noStroke();
  fill(0);
  rect(0, 0, 500, 120);
  fill(255);
  textSize(18);
  text("mode (ESC): " + mode + "\tpreset (0-3): " + preset, 10, 20);
  text("mode 0. yscl (UP/DWN): " + nfs(yscl, 0, 2) + "\trange (RT/LFT): " + nfs(range, 0, 2), 10, 40);
  text("mode 1. yfreq (UP/DWN): " + nfs(yfreq, 0, 2) + "\taspeed (RT/LFT): " + nfs(aspeed, 0, 2), 10, 60);
  text("mode 2. centerY (DWN/UP): " + nfs(centerY, 0, 2) + "\tcenterX (RT/LFT): " + nfs(centerX, 0, 2), 10, 80);
  text("Press RETURN to clear canvas.", 10, 100);
}

function keyPressed() {
  // Presets
  switch(key) {
    //  Big aspeed, more like a polygon
    case '0':
      range = 100;
      yscl = 1;
      aspeed = TWO_PI/3;
      yfreq = 1;
      preset = 0;
      break;
    // "Normal"
    case '1':
      range = 100;
      yscl = 1;
      aspeed = 0.01;
      yfreq = 1;
      preset = 1;
      break;
    // Taller than wide
    case '2':
      range = 100;
      yscl = 2;
      aspeed = 0.01;
      yfreq = 1;
      preset = 2;
      break;
    // Figure 8
    case '3':
      range = 100;
      yscl = 1;
      aspeed = 0.01;
      yfreq = 2;
      preset = 3;
      break;
  }

  switch (keyCode){
    case ESCAPE:
      mode++;
      mode %= 3;
      break;
    // Reset
    case RETURN:
      background(0);
      break;
  }

  switch (mode) {
    case 0:
      switch (keyCode) {
        case UP_ARROW:
          yscl += 0.1;
          break;
        case DOWN_ARROW:
          yscl -= 0.1;
          break;
        case RIGHT_ARROW:
          range++;
          break;
        case LEFT_ARROW:
          range--;
          break;
      }
      yscl = bottomOut(yscl, 0);
      range = bottomOut(range, 0);
      break;
    case 1:
      switch (keyCode) {
        case UP_ARROW:
          yfreq += 0.1;
          break;
        case DOWN_ARROW:
          yfreq -= 0.1;
          break;
        case RIGHT_ARROW:
          aspeed += 0.01;
          break;
        case LEFT_ARROW:
          aspeed -= 0.01;
          break;
      }
      yfreq = bottomOut(yfreq, 0);
      aspeed = bottomOut(aspeed, 0.01);
      break;
    case 2:
      switch (keyCode) {
        case RIGHT_ARROW:
          centerX ++;
          break;
        case LEFT_ARROW:
          centerX --;
          break;
        case UP_ARROW:
          centerY --;
          break;
        case DOWN_ARROW:
          centerY ++;
          break;
      }
      break;
  }
}

// Bottom out at...
function bottomOut(p, bottom) {
  return p < bottom ? bottom : p;
}/* Mimi Yin, NYU-ITP
Noisy pathways with controls.
*/

var x, y;
var px, py;
var xspeed, yspeed;
var t;
var tspeed;

// Mode of control for arrow keys
var mode;
// # of frames to wait before changing direction.
var interval;
// Range of random, relative range of vertical random
var range, yscl;
// How much to shift right/left, up/down
var xshift, yshift;
// Which preset
var preset = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  reset();
  px = x;
  py = y;
  xspeed = 0;
  yspeed = 0;
  t = 0;
  tspeed = 0.01;
  
  mode = 0;
  interval = 1;
  range = 4;
  yscl = 1;
  xshift = .5;
  yshift = .5;

  noStroke();
}

function draw() {
  //background(0);
  
  //Change direction
  if (frameCount % interval == 0) {
		// Move forward along noise graph
    t += tspeed;

    xspeed = (noise(t)-xshift)*range; //shift median to right/left
    yspeed = (noise(t*2)-yshift)*range*yscl //shift median to up/down
  }

  // Move
  x += xspeed;
  y += yspeed;

  // Draw a line from the previous loc to this loc
  stroke(255);
  line(px, py, x, y);

  // Remember current location for next frame
  px = x;
  py = y;
  
  // Re-center when off-screen
  if(x < 0 || x > width || y < 0 || y > height) reset(); 

  // Print control values to screen
  noStroke();
  fill(0);
  rect(0, 0, 500, 120);
  fill(255);
  textSize(18);
  text("mode (ESC): " + mode + "\tpreset (0-5): " + preset, 10, 20);
  text("mode 0. interval (UP/DWN): " + interval + "\trange (RT/LFT): " + nfs(range, 0, 2), 10, 40);
  text("mode 1. yscl (UP/DWN): " + nfs(yscl, 0, 2) + "\ttspeed (RT/LFT): " + nfs(tspeed, 0, 2), 10, 60);
  text("mode 2. yshift (DWN/UP): " + nfs(yshift, 0, 2) + "\txshift (RT/LFT): " + nfs(xshift, 0, 2), 10, 80);
  text("Press RETURN to clear canvas.", 10, 100);
}

function keyPressed() {
  // Presets
  switch(key) {
    //  Big tspeed, more like random  
    case '0':
      interval = 1;
      range = 20;
      yscl = 1;
      tspeed = 1;
      xshift = .5;
      yshift = .5;
      preset = 0;
      break;
    // "Normal"
    case '1':
      interval = 1;
      range = 4;
      yscl = 1;
      tspeed = 0.01;
      xshift = .5;
      yshift = .5;
      preset = 1;
      break;
    // Fast
    case '2':
      interval = 1;
      range = 20;
      yscl = 1;
      tspeed = 0.01;
      xshift = .5;
      yshift = .5;
      preset = 2;
      break;
    // Only changes every second. Slow.
    case '3':
      interval = 60;
      range = 2;
      yscl = 1;
      tspeed = 0.01;
      xshift = .5;
      yshift = .5;
      preset = 3;
      break;
    // More vertical.
    case '4':
      interval = 1;
      range = 4;
      yscl = .5;
      tspeed = 0.01;
      xshift = .5;
      yshift = .5;
      preset = 4;
    	break;
    // Moving towards upper-right.
    case '5':
      interval = 1;
      range = 4;
      yscl = 1;
      xshift = .2;
      yshift = .7;
      preset = 5;
      break;
  }
  
  switch (keyCode){
    case ESCAPE:
      mode++;
      mode %= 3;
      break;
    // Reset
    case RETURN: 
      reset();
      break;
  }

  switch (mode) {
    case 0:
      switch (keyCode) {
        case UP_ARROW:
          interval++;
          break;
        case DOWN_ARROW:
          interval--;
          break;
        case RIGHT_ARROW:
          range++;
          break;
        case LEFT_ARROW:
          range--;
          break;
      }
      interval = bottomOut(interval, 1);
      range = bottomOut(range, 0);
      break;
    case 1:
      switch (keyCode) {
        case UP_ARROW:
          yscl += 0.1;
          break;
        case DOWN_ARROW:
          yscl -= 0.1;
          break;
        case RIGHT_ARROW:
          tspeed += 0.01;
          break;
        case LEFT_ARROW:
          tspeed -= 0.01;
          break;
      }
      yscl = bottomOut(yscl, 0);
      tspeed = bottomOut(tspeed, 0.01);
      break;
    case 2:
      switch (keyCode) {
        case RIGHT_ARROW:
          xshift += 0.1;
          break;
        case LEFT_ARROW:
          xshift -= 0.1;
          break;
        case UP_ARROW:
          yshift += 0.1;
          break;
        case DOWN_ARROW:
          yshift -= 0.1;
          break;
      }      
      break;        
  }
}

function reset() {
  background(0);
  x = width/2;
  y = (height/2) + 120;
  px = x;
  py = y;
}

// Bottom out at...
function bottomOut(p, bottom) {
  return p < bottom ? bottom : p;
}/* Mimi Yin, NYU-ITP
Random pathways with controls.
*/

// Store x,y coordinates of current location
let x, y;
// Store x,y coordinates of previous location
let px, py;
// Store current xspeed and yspeed
let xspeed, yspeed;

// Whether to draw the rectangle of possibility
let rop = false;

// Mode of control for arrow keys
let mode;
// # of frames to wait before changing direction.
let interval;
// Range of random, relative range of vertical random
let range, yscl;
// How much to shift right/left, up/down
let xshift, yshift;
// Which preset
let preset = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  reset();

  xspeed = 0;
  yspeed = 0;

  rop = false;
  mode = 0;
  interval = 1;
  range = 4;
  yscl = 1;
  xshift = 1;
  yshift = 1;

  noStroke();
}

function draw() {
  //background(0);

  //Change direction
  if (frameCount % interval == 0) {
    xspeed = random(-range, range * xshift); //shift median to go right/left
    yspeed = random(-range * yscl, range * yscl * yshift); // shift median to go up/down
  }

  // Move
  x += xspeed;
  y += yspeed;

  // Draw a line from the previous loc to this loc
  stroke(255);
  line(px, py, x, y);

  // Draw the rectangle of possibility
  if (rop) {
    stroke(255, 0, 0, 255 * range / 32);
    noFill();
    rect(x - range, y - (range * yscl), range + (range * xshift), (range * yscl) + (range * yscl * yshift));
  }

  // Remember current location for next frame
  px = x;
  py = y;

  // Re-center when off-screen
  if (x < 0 || x > width || y < 0 || y > height) reset();

  // Print control values to screen
  noStroke();
  fill(0);
  rect(0, 0, 500, 120);
  fill(255);
  textSize(18);
  text("mode (ESC): " + mode + "\tpreset (1-6): " + preset, 10, 20);
  text("mode 0. interval (UP/DWN): " + interval + "\trange (RT/LFT): " + nfs(range, 0, 2), 10, 40);
  text("mode 1. yscl (UP/DWN): " + nfs(yscl, 0, 2), 10, 60);
  text("mode 2. yshift (DWN/UP): " + nfs(yshift, 0, 2) + "\txshift (RT/LFT): " + nfs(xshift, 0, 2), 10, 80);
  text("Press RETURN to clear canvas.", 10, 100);

}

function keyPressed() {
  // Presets
  switch (key) {
    // "Normal"
    case '1':
      interval = 1;
      range = 4;
      yscl = 1;
      xshift = 1;
      yshift = 1;
      preset = 1;
      break;
      // Fast
    case '2':
      interval = 1;
      range = 50;
      yscl = 1;
      xshift = 1;
      yshift = 1;
      preset = 2;
      break;
      // Only changes every second. Slow.
    case '3':
      interval = 120;
      range = 2;
      yscl = 1;
      xshift = 1;
      yshift = 1;
      preset = 3;
      break;
      // More vertical.
    case '4':
      interval = 30;
      range = 2;
      yscl = .5;
      xshift = 1;
      yshift = 1;
      preset = 4;
      break;
      // Moving towards upper-right.
    case '5':
      interval = 1;
      range = 1;
      yscl = 1;
      xshift = 1.5;
      yshift = .7;
      preset = 5;
      break;
      // Moving towards upper-right.
    case '6':
      interval = 180;
      range = 1;
      yscl = 1;
      xshift = 1;
      yshift = 1;
      preset = 6;
      break;
  }


  // Change mode to change which
  // lets the arrow keys control
  switch (keyCode) {
    case TAB:
      rop = !rop;
      break;
    case ESCAPE:
      mode++;
      mode %= 3;
      break;
      // Reset
    case RETURN:
      reset();
      break;
  }

  // Arrow key controls
  switch (mode) {
    case 0:
      switch (keyCode) {
        case UP_ARROW:
          interval++;
          break;
        case DOWN_ARROW:
          interval--;
          break;
        case RIGHT_ARROW:
          range++;
          break;
        case LEFT_ARROW:
          range--;
          break;
      }
      interval = bottomOut(interval, 1);
      range = bottomOut(range);
      break;
    case 1:
      switch (keyCode) {
        case UP_ARROW:
          yscl += 0.1;
          break;
        case DOWN_ARROW:
          yscl -= 0.1;
          break;
      }
      yscl = bottomOut(yscl, 0);
      break;
    case 2:
      switch (keyCode) {
        case RIGHT_ARROW:
          xshift += 0.1;
          break;
        case LEFT_ARROW:
          xshift -= 0.1;
          break;
        case UP_ARROW:
          yshift -= 0.1;
          break;
        case DOWN_ARROW:
          yshift += 0.1;
          break;
      }
      xshift = bottomOut(xshift, 0);
      yshift = bottomOut(yshift, 0);
      break;
  }
}

function reset() {
  background(0);
  x = width / 2;
  y = (height / 2) + 120;
  px = x;
  py = y;
}

// Bottom out at...
function bottomOut(p, bottom) {
  return p < bottom ? bottom : p;
}function setup() { 
  createCanvas(windowWidth, windowHeight);
} 

function draw() { 
  background(255);
}/*
Mimi Yin NYU-ITP
Drawing skeleton joints
Showing selected joint
 */

// Declare kinectron
var kinectron = null;
// Keep track of selected joint
var j;
// Directory of joints
var joints = [
  "SPINEBASE",
  "SPINEMID",
  "NECK",
  "HEAD",
  "SHOULDERLEFT",
  "ELBOWLEFT",
  "WRISTLEFT",
  "HANDLEFT",
  "SHOULDERRIGHT",
  "ELBOWRIGHT",
  "WRISTRIGHT",
  "HANDRIGHT",
  "HIPLEFT",
  "KNEELEFT",
  "ANKLELEFT",
  "FOOTLEFT",
  "HIPRIGHT",
  "KNEERIGHT",
  "ANKLERIGHT",
  "FOOTRIGHT",
  "SPINESHOULDER",
  "HANDTIPLEFT",
  "THUMBLEFT",
  "HANDTIPRIGHT",
  "THUMBRIGHT"];

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Define and create an instance of kinectron
  kinectron = new Kinectron("172.30.5.171");

  // CONNECT TO MIRCROSTUDIO
  //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked);

  // Start by tracking left hand
  j = kinectron.HANDLEFT;

  background(0);
}

function draw() {
  //background(0);
}

function bodyTracked(body) {
	background(0);

  // Draw all the joints
  kinectron.getJoints(drawJoint);

  // Get all the joints off the tracked body and do something with them
  var joint = body.joints[j];
  x = (joint.cameraX * width/2) + width/2;
  y = (-joint.cameraY * height/2) + height/2;

  noStroke();
  fill(255);
  push();
  //Kinect location data needs to be normalized to canvas size
  translate(x, y);
  // Draw a bigger ellipse for the selected joint
  ellipse(0, 0, 50, 50);
  pop();

  // Print which joint is selected
  stroke(255);
  textSize(18);
  text("RT/LFT to change joints. " + j + ": " + joints[j-1], 10, 20);

  // Get the hands off the tracked body and do somethign with them
  //kinectron.getHands(drawJoint);
}

// Draw skeleton
function drawJoint(joint) {

  //console.log("JOINT OBJECT", joint);
  x = (joint.cameraX * width/2) + width/2;
  y = (-joint.cameraY * height/2) + height/2;

  noStroke();
  fill(255);
  push();
  //Kinect location data needs to be normalized to canvas size
  translate(x, y);
	ellipse(0, 0, 10, 10);
  pop();
}

function keyPressed(){
  // Use RIGHT/LEFT arrow keys to change selected joint
  switch(keyCode){
    case LEFT_ARROW:
    	j--;
  		if(j < 0) j = 24;
    case RIGHT_ARROW:
    	j++;
  		j%=25;
      break;
  }
}



/*
Mimi Yin NYU-ITP
Applying sin/cos and noise
to move a bezier curve.
*/

let anchor1X, anchor1Y, anchor2X, anchor2Y;
let control1X, control1Y, control2X, control2Y;
let t, factor;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  anchor1X = width/2;
  anchor1Y = height/3;
  anchor2X = width/2;
  anchor2Y = height/3;

  control1X = width/2;
  control1Y = height/3;
  control2X = width/2;
  control2Y = height/3;

  t = 0;
  factor = 1;
}


function draw() {
  background(255);
  t+=.01;

  // Adjust size of movement using noise
  factor = noise(t)*2;

  // Use sin and cos to move anchor and control points
  // Play with numbers to affect ratios of movement
  anchor1X += cos(t*2)*factor*.5;
  anchor1Y += sin(t*.33)*factor*.2;
  anchor2X += cos(t*.33)*factor*.5;
  anchor2Y += sin(t*.5)*factor*.67;

  control1X += cos(t*.67)*factor*.33;
  control1Y += sin(t*.33)*factor*.2;
  control2X += cos(t*2)*factor*.2;
  control2Y += sin(t*.33)*factor*.5;

  noFill();
  stroke(0);
  strokeWeight(50);
  bezier(anchor1X, anchor1Y, control1X, control1Y, control2X, control2Y, anchor2X, anchor2Y);

  // Red anchor points
  noStroke();
  fill(255, 0, 0);
  ellipse(anchor1X, anchor1Y, 10, 10);
  ellipse(anchor2X, anchor2Y, 10, 10);

  // Blue control points
  fill(0, 0, 255);
  ellipse(control1X, control1Y, 10, 10);
  ellipse(control2X, control2Y, 10, 10);

  stroke(200);
  strokeWeight(1);
  line(anchor1X, anchor1Y, control1X, control1Y);
  line(anchor2X, anchor2Y, control2X, control2Y);
}/*
Mimi Yin NYU-ITP
Applying sin/cos and noise
to move a bezier curve.
*/

var anchor1X, anchor1Y, anchor2X, anchor2Y;
var control1X, control1Y, control2X, control2Y;
var t, factor;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  anchor1X = width/2;
  anchor1Y = height/3;
  anchor2X = width/2;
  anchor2Y = height/3;

  control1X = width/2;
  control1Y = height/3;
  control2X = width/2;
  control2Y = height/3;

  t = 0;
  factor = 1;
}


function draw() {
  background(0, 10);
  t+=.01;

  // Adjust size of movement using noise
  factor = noise(t)*2;

  // Use sin and cos to move anchor and control points
  // Play with numbers to affect ratios of movement
  anchor1X += cos(t*2)*factor*.5;
  anchor1Y += sin(t*.33)*factor*.2;
  anchor2X += cos(t*.33)*factor*.5;
  anchor2Y += sin(t*.5)*factor*.67;

  control1X += cos(t*.67)*factor*.33;
  control1Y += sin(t*.33)*factor*.2;
  control2X += cos(t*2)*factor*.2;
  control2Y += sin(t*.33)*factor*.5;

  noFill();
  stroke(255, 200);
  strokeWeight(50);
  bezier(anchor1X, anchor1Y, control1X, control1Y, control2X, control2Y, anchor2X, anchor2Y);

  // Red anchor points
  noStroke();
  fill(255, 0, 0);
  ellipse(anchor1X, anchor1Y, 10, 10);
  ellipse(anchor2X, anchor2Y, 10, 10);

  // Blue control points
  fill(0, 0, 255);
  ellipse(control1X, control1Y, 10, 10);
  ellipse(control2X, control2Y, 10, 10);

  stroke(255);
  strokeWeight(1);
  line(anchor1X, anchor1Y, control1X, control1Y);
  line(anchor2X, anchor2Y, control2X, control2Y);
}/*
Mimi Yin NYU-ITP
Zeno's Paradox or easing.
*/
let x;

function setup() { 
  createCanvas(windowWidth, windowHeight);
  // Initialize x at 0
  x = 0;
} 

function draw() { 
  // Draw a white background
  background(255);
  
  // Increment x by 1% of the distance remaining between x and the right edge
  x += (width-x)*0.01;
  
  // Set fill color to black
  fill(0);
  // Draw a circle at x
  ellipse(x, height/2, 10,10);
}/*
Mimi Yin NYU-ITP
Drawing lines.
*/

var mode = 0;

function setup() { 
  createCanvas(windowWidth, windowHeight);
  background(255);
} 

function draw() { 
  var speed = dist(pmouseX, pmouseY, mouseX, mouseY);
	var sw = 1;
  
  // 3 ways to set strokeweight according to speed.
  switch(mode){
    case 1:
      sw = speed/10;
      break;
    case 2:      
  		sw = 100/speed;
      break;
    case 3:
  		sw = map(speed, 0, 100, 10, 0);
      break;
  }
  
  stroke(0);
  strokeWeight(sw);
  line(pmouseX, pmouseY, mouseX, mouseY);
  
  noStroke();
  fill(255);
	rect(0, 0, 500, 50);
  fill(0);
  text("Press mouse to change modes. There are 4.", 10, 20);
}

function mousePressed(){
 	mode++;
  mode%=4;
}
  
  /*
Mimi Yin NYU-ITP
Graphing Noise
*/

var px, py, x, y;
var t;

function setup() { 
  createCanvas(windowWidth, windowHeight);
	background(255);
  x = 0;
  y = height/2;
  px = x;
  py = y;
  t = 0;
} 

function draw() { 
  t+=0.01;
  
  // Advance 1 pixel across the screen
  x++;
  
  // Generate a new noisy number for the y-position.
  // Scale it so it's not tiny. Remember noise() generates a number between  0 and 1.
  // Position it so that it ends up either above or below the vertical mid-point of the canvas.
  y = (noise(t)-0.5)*height/4 + height/2;
  
  // Draw a line from the previous frame's position to this frame's.
 	line(px, py, x, y);
  
  // Remember this frame's position for the next frame.
  px = x;
  py = y;
}/* Mimi Yin NYU-ITP
Simply sine and cosine
*/

let r, yOffset;
let dotX, dotY, dotA;
let aSpeed;

function setup() {
  createCanvas(windowWidth, windowHeight);
  r = 100;
  yOffset = height / 2;
  dotX = 0;
  dotY = yOffset;
  dotA = 0;
  aSpeed = TWO_PI / width;
}

function draw() {
  background(255);

  fill(0);
  noStroke();
  let x = 0;
  // Draw static sine and cosine waves
  for (let a = 0; a < TWO_PI; a += aSpeed) {
    x++;
    // Draw a circle for each point along the sine wave
    let y = sin(a) * r + yOffset;
    ellipse(x, y, 1, 1);

    // Draw a circle for each point along the cosine wave
    // Can you calculate y for the cosine wave
    // using the sin() function instead?
    let y = cos(a) * r + yOffset;
    ellipse(x, y, 1, 1);
  }

  // Move the dot every frame
  dotX++;
  dotA += aSpeed;

  if (dotX > width) dotX = 0;
  fill(255, 0, 0);

  // Draw dot for sine wave.
  dotY = sin(dotA) * r + yOffset;
  ellipse(dotX, dotY, 10, 10);

  // Draw dot for cosine wave.
  // Can you calculate dotY for the cosine wave
  // using the sin() function instead?
  dotY = cos(dotA) * r + yOffset;
  ellipse(dotX, dotY, 10, 10);
}/*
Mimi Yin NYU-ITP
Graphing Random
*/

// Store current x,y coordinates
let x, y;
// Store previous x,y coordinates
let px, py;

function setup() { 
  createCanvas(windowWidth, windowHeight);
	background(255);
  // Begin in the left, middle.
  x = 0;
  y = height/2;
  px = x;
  py = y;
} 

function draw() { 
  
  // Advance 10 pixels across every frame.
  x+=10;
  
  // Generate a new random number for the y-position.
  y = random(-height/4, height/4) + height/2;
  
  // Draw a line from last frame's position to this frame's.
 	line(px, py, x, y);
  
  // Remember this frame's position for the next frame.
  px = x;
  py = y;
}/*
Mimi Yin NYU-ITP
Circular Pathways
*/

//Store x,y coordinates of current position
let x, y;
// Store angle of rotation
let angle;
// Store radius of circle (size)
let r;
function setup() { 
  createCanvas(windowWidth, windowHeight);
  angle = 0;
  r = 100;
  x = width/2;
  y = height/2-r;
} 

function draw() { 
	fill(0);
  
  // Move around the circle
  angle += 0.01;
  
  // Calculate x,y coordinates
  //Method 1
  x = cos(angle)*r + width/2;
  y = sin(angle)*r + height/2;

  //Method 2
  // x += cos(angle);
  // y += sin(angle);
	
  // Draw a circle at x,y
  ellipse(x, y, 1, 1);
}/*
Mimi Yin NYU-ITP
Visualizing relationship between circle
sine, cosine and tan waves.
*/


let circle, speed;
let d, r, theta, tSpeed;
let drawSin = false;
let drawCos = false;
let drawTan = false;

function setup() {
  createCanvas(TWO_PI * 100, window.innerHeight);
  circle = createVector(0, height / 2);
  speed = createVector((width / TWO_PI) * .0075, 0);
  d = 200;
  r = d / 2;
  theta = 0;
  // Fit the speed to the width of the window
  // Make sure a complete sine-wave is drawn
  tSpeed = (width / TWO_PI) * .000075;
}


function draw() {
  background(128);
  noStroke();
  
  if (drawSin) {
    fill(255, 0, 0);
    // Draw all the points of the sin wave until the current "theta"
    for (let t = 0; t < theta; t += abs(tSpeed)) {
      ellipse(t * 100, circle.y + r * sin(t), 1, 1);
    }
  }

  if (drawCos) {
    // Draw all the points of the cos wave until the current "theta"
    fill(0, 0, 255);
    for (let t = 0; t < theta; t += abs(tSpeed)) {
      ellipse(t * 100, circle.y + r * cos(t), 1, 1);
    }
  }

  if (drawTan) {
    // Draw all the points of the tan wave until the current "theta"
    fill(0);
    for (let t = 0; t < theta; t += abs(tSpeed)) {
      ellipse(t * 100, circle.y + r * tan(t), 1, 1);
    }
  }

  stroke(225);
  line(0, circle.y, width, circle.y);

  // Calculate position of dot going around the circumference of the circle
  let circum = createVector(circle.x + r * cos(theta), circle.y + r * sin(theta));

  noStroke();
  // Red Center of Circle
  fill(255, 0, 0);
  ellipse(circle.x, circle.y, 10, 10);

  // Green Y-Position Dot
  fill(0, 255, 0);
  ellipse(circle.x, circum.y, 10, 10);


  // Blue Circumference Dot
  fill(0, 0, 255);
  ellipse(circum.x, circum.y, 10, 10);

  stroke(255, 0, 0);
  strokeWeight(5);
  //Height line
  line(circle.x, circle.y, circle.x, circum.y);

  //Vertical height Line
  line(circum.x, circum.y, circum.x, circle.y);

  //strokeWeight(1);
  stroke(0, 0, 255);
  //Horizontal height line
  line(circum.x, circum.y, circle.x, circum.y);

  noFill();
  strokeWeight(1);
  stroke(200);
  ellipse(circle.x, circle.y, d, d);

  // Bounce back and forth
  if (circle.x > width || circle.x < 0) {
    speed.mult(-1);
    tSpeed *= -1;
  }

  //Move the circle
  circle.add(speed);

  //Move forward through the degrees of the circle for the sin and cos calculations
  theta += tSpeed;
}

// Press 'c' to turn cosine wave on/off
// Press 's' to turn sine wave on/off
// Press 't' to turn tan wave on/off
function keyPressed() {
  switch (key) {
    case 'C':
      drawCos = !drawCos;
      break;
    case 'S':
      drawSin = !drawSin;
      break;
    case 'T':
      drawTan = !drawTan;
      break;
  }
}/*
Mimi Yin NYU-ITP
Deconstructing the relationship between
circles and the sine and cosine waves.
*/


let circle, speed;
let d, r, theta, tSpeed;
let drawCos = false;

function setup() {
  createCanvas(TWO_PI*100, window.innerHeight);
  circle = createVector(0, height / 2);
  speed = createVector((width / TWO_PI) * .0075, 0);
  d = 200;
  r = d / 2;
  theta = 0;
  // Fit the speed to the width of the window
  // Make sure a complete sine-wave is drawn
  tSpeed = (width / TWO_PI) * .000075;
}


function draw() {
  background(128);

  noStroke();
  fill(255, 0, 0);
  // Draw all the points of the sin wave until the current "theta"
  for (let t = 0; t < theta; t+=abs(tSpeed)) {
    ellipse(t*100, circle.y + r*sin(t), 5, 5);
  }

  if(drawCos){
    // Draw all the points of the cos wave until the current "theta"
    fill(0, 0, 255);
    for (let t = 0; t < theta; t+=abs(tSpeed)) {
      ellipse(t*100, circle.y + r*cos(t), 5, 5);
    }
  }

  stroke(225);
  line(0, circle.y, width, circle.y);

  // Calculate position of dot going around the circumference of the circle
  let circum = createVector(circle.x + r*cos(theta), circle.y + r*sin(theta));

  noStroke();
  // Red Center of Circle
  fill(255, 0, 0);
  ellipse(circle.x, circle.y, 10, 10);

  // Green Y-Position Dot
  fill(0, 255, 0);
  ellipse(circle.x, circum.y, 10, 10);


  // Blue Circumference Dot
  fill(0, 0, 255);
  ellipse(circum.x, circum.y, 10, 10);

  stroke(255, 0, 0);
  strokeWeight(5);
  //Height line
  line(circle.x, circle.y, circle.x, circum.y);

  //Vertical height Line
  line(circum.x, circum.y, circum.x, circle.y);

  //strokeWeight(1);
  stroke(0, 0, 255);
  //Horizontal height line
  line(circum.x, circum.y, circle.x, circum.y);

  noFill();
  strokeWeight(1);
  stroke(200);
  ellipse(circle.x, circle.y, d, d);

  // Bounce back and forth
  if (circle.x > width || circle.x < 0) {
    speed.mult(-1);
    tSpeed *= -1;
  }

  //Move the circle
  circle.add(speed);

  //Move forward through the degrees of the circle for the sin and cos calculations
  theta += tSpeed;

  noStroke();
  rect(0, 0, 500, 30);
  fill(255);
  text("Press mouse to show/hide cosine wave.", 10, 20);
}

function mousePressed(){
 drawCos = !drawCos;
}/* Mimi Yin, NYU-ITP
Visualizing how direction is constantly
changing as you move around a circle.
*/
let x, y, r, centerX, centerY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  centerX = width/2;
  centerY = height/2;
  r = 100;
  noStroke();
}

function draw() {
  background(255);

  //Move
  x = (cos(frameCount*0.01)*r) + centerX;
  y = (sin(frameCount*0.01)*r) + centerY;

  // Draw the tangent
  let len = 20;
  stroke(0, 255)
  push();
  translate(x, y);
  rotate((frameCount*0.01) + PI/4);
  line(0, 0, len, len);
  push();
  translate(len, len);
  rotate(PI/8);
  line(0, 0, -10, -10);
  pop();
  push()
  translate(len, len);
  rotate(-PI/8);
  line(0, 0, -10, -10);
  pop();
  pop();

  //Ellipse moving around circle
  fill(255, 0, 0);
  noStroke();
  ellipse(x, y, 10, 10);

  // Draw3
  stroke(0, 64);
  noFill();
  ellipse(centerX, centerY, r*2, r*2);
}/* Mimi Yin, NYU-ITP
Noisy pathways.
*/

var x, y;
var px, py;
var t;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
  px = x;
  py = y;
  t = 0;
  noStroke();
  background(0);
}

function draw() {
  //background(0);
	
  // Move along noise curve.
  t += 0.01;
  
  //Move
	x += (noise(t)-0.5)*2;
	y += (noise(t*2)-0.5)*2;
 
  // Draw a line from the previous loc to this loc
  stroke(255);
  line(px, py, x, y);
  
  // Remember current location for next frame
  px = x;
  py = y;
}/* Mimi Yin, NYU-ITP
Levy Flight adapted from Dan Shiffman's version for Nature of Code
https://github.com/shiffman/The-Nature-of-Code-Examples/tree/master/introduction/RandomWalkLevy
*/

// Store x,y coordinates of current position
let x, y;
// Store x,y coordinates of previous position
let px, py;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Start in the middle
  x = width/2;
  y = height/2;
  px = x;
  py = y;

  // Don't draw an outline
  noStroke();
  // Draw a black background
  background(0);
}

function draw() {

  // Calculate step size
  let stepSize = montecarlo()*100;

  // Move in a random direction at calculated stepsize
	x += random(-1,1)*stepSize;
	y += random(-1,1)*stepSize;

  // Draw a line from the previous loc to this loc
  stroke(255);
  line(px, py, x, y);

  // Remember current location for next frame
  px = x;
  py = y;

}

// Calculating stepsize favoring smaller steps
function montecarlo(){
  while (true) {
		let r1 = random(1);
  	let probability = pow(1.0 - r1,8);
    let r2 = random(1);
    if (r2 < probability) {
      return r1;
    }
  }
}/*
Mimi Yin NYU-ITP
A more random random.
Randomly select a cell in a 10x10 grid to make red.
OR Make entire canvas red if a certain cell is randomly selected.
*/

// Mode
let zoom;
// Number of columns and rows in our grid
let numCols, numRows;
// Width and height of cell in our grid
let cellW, cellH;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // 10 columns
  numCols = 10;
  // 10 rows
  numRows = 10;
  // Calculate cell width based on width of canvas and number of columns
  cellW = width/numCols;
  // Calculate cell height based on height of canvas and number of rows
  cellH = height/numRows;
}


function draw() {
  // Draw a white background
  background(255);

  // Pick a random cell
	x = floor(random(numCols));
  y = floor(random(numRows));

  // If zoomed in, make entire canvas red
  // if selected cell is cell (2, 5)
  if(zoom) {
    if(x == 2 && y == 5) {
      background('red');
    }
  }
  // Otherwise, make  the randomly selected cell red
  else {
  	fill('red');
    rect(x*cellW, y*cellH, cellW, cellH);
  }
}

// Press mouse to witch modes
function mousePressed(){
 zoom = !zoom;
}/* Mimi Yin, NYU-ITP
Random pathways.
*/

// Store current x,y coordinates
let x, y;
// Store previous x,y coordinates
let px, py;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Start in the middle
  x = width/2;
  y = height/2;
  px = x;
  py = y;
  noStroke();
  background(0);
}

function draw() {
  //background(0);

  //Move randomly
	x += random(-50,50);
	y += random(-50,50);;
 
  // Draw a line from the previous loc to this loc
  stroke(255);
  line(px, py, x, y);
  
  // Remember current location as previous position
  // for the next frame of animation
  px = x;
  py = y; 
}/* Mimi Yin, NYU-ITP
Linear motion, deconstructed.
*/

// Variables to store x,y coordinates of position
let x, y;

// Variables to start starting x,y coordinates
let xstart, ystart;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Start near the middle, top
  x = width/2;
  y = 10;
  xstart = x;
	ystart = y;
  noStroke();
  textSize(16);
}

function draw() {
  // Draw a black background
  background(0);

  //Move
  x += .2;
  y += .8;

  // Draw linear pathway
  fill(255);
  ellipse(x, y, 10, 10);
  text("c", x + 10, y + 5);
  
  // Draw x-component of pathway
  fill(255, 16);
  rect(0, 0, x, height);
  fill(255, 0, 0);
  ellipse(x, ystart, 10, 10);
  text("a", x + 10, ystart + 5);
  
  // Draw y-component of pathway
  fill(255, 8);
  rect(0, 0, width, y);  
  fill(0, 0, 255);
  ellipse(xstart, y, 10, 10);
  text("b", xstart - 20, y + 5);
}/* Mimi Yin, NYU-ITP
Linear motion.
*/

// Variables to store x,y coordinates
let x, y;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Initial position is middle, near the top
  x = width / 2;
  y = 10;
  // Don't draw an outline
  noStroke();
}

function draw() {
  // Draw black background
  background(0);

  //Move horizontally to the left .4 pixels every frame
  x += -.4;
  // Move vertically down .8 pixels every frame
  y += .8;

  // Set fill color to white
  fill(255);
  // Draw a circle at x,y
  ellipse(x, y, 10, 10);
}// Declare kinectron 
var kinectron = null;
var midSpine;

function setup() {
  createCanvas(640, 480);
  background(0);
  noStroke();

  // Define and create an instance of kinectron
  kinectron = new Kinectron("192.168.0.117");

  // CONNECT TO MIRCROSTUDIO
  //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  //kinectron.startRGB();
  kinectron.startDepth(depth);
  
  frameRate(30);
}

function draw() {
  text("fps: " + frameRate, 10, 20);
}
//noprotect
function depth(data) {
  //console.log("HELLO", data);
	loadImage(data.src, function(img) {
    img.loadPixels();
    //console.log(img.pixels.length);
		//image(loadedImage, 0, 0);
    if(frameCount%10 == 0) {
    	background(0);
      //console.log(img.pixels[length/2]);
      for(var i = 0; i < img.pixels.length; i+=160) {
        // if(img.pixels[i] != 0 && img.pixels[i] != 255) {
        // 	console.log(img.pixels[i], "\t", img.pixels[i+1], "\t", img.pixels[i+2], "\t", img.pixels[i+3]);
        // }
        if(img.pixels[i] > 64) continue;
        var x = ((i/4)%img.width)*5;
        var y = (floor((i/4)/img.width))*5;
        
        var sz = map(sq(img.pixels[i]), 0, 64*64, 0, 100);
        stroke(255);
        noFill();
        ellipse(x, y, sz, sz);
      }
    }
	});	
}

/* Mimi Yin NYU-ITP
Drawing a trail.
*/

let locs = [];
let easing = false;
let throbbing = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  noStroke();
  fill(255, 64);

  // Add current mouse position to locs array
  locs.push(createVector(mouseX, mouseY));

  // Remove the oldest mouse location after 50 frames
  if(locs.length> 50) locs.shift();

  // Iterate through last 50 mouse positions
  for(let l = 0; l < locs.length; l++) {

    // Turn on throbbing
    // What's being throbbed?
    let sz;
    if(throbbing) sz = sin(frameCount*0.01)*l + l;
    else sz = 10;

    // Turn on easing
		if(easing) {
      locs[l].x+=(mouseX-locs[l].x)*0.01;
      locs[l].y+=(mouseY-locs[l].y)*0.01;
    }

    // Draw an ellipse at this location
  	ellipse(locs[l].x, locs[l].y, sz, sz);

    // Draw instructions to screen
    text("Press 'e' to ease. Press 't' to throb.", 10, 20);
  }
}

// Press 'e' to turn on easing
// Press 't' to turn on throbbing
function keyPressed(){
  console.log(key);
  switch(key){
    case 'E':
      easing = !easing;
      break;
    case 'T':
      throbbing = !throbbing;
      break;
  }
}/*
Mimi Yin NYU-ITP
Drawing lines.
*/

let mode = 0;

function setup() { 
  createCanvas(windowWidth, windowHeight);
  background(255);
} 

function draw() { 
  
  // Calculate speed of mouse
  let speed = dist(pmouseX, pmouseY, mouseX, mouseY);
  // Initialize sw to 1
	let sw = 1;
  
  // 3 ways to set strokeweight according to speed
  // based on mode
  switch(mode){
    case 1:
      sw = speed/10;
      break;
    case 2:      
  		sw = 100/speed;
      break;
    case 3:
  		sw = map(speed, 0, 100, 10, 1);
      break;
  }
  
  stroke(0);
  strokeWeight(sw);
  line(pmouseX, pmouseY, mouseX, mouseY);
  
  noStroke();
  fill(255);
	rect(0, 0, 500, 50);
  fill(0);
  text("Press mouse to change modes. There are 4.", 10, 20);
}

// Press the mouse to change mode
function mousePressed(){
 	mode++;
  mode%=4;
}

// Press any key to redraw white background
function keyPressed(){
  background(255);
}
  
  var myCanvas = null;

// Declare kinectron 
var kinectron = null;
var rightHand, prightHand, midSpine;

function setup() {
  myCanvas = createCanvas(500, 500, WEBGL);
  background(0);
  noStroke();

  // Define and create an instance of kinectron
  kinectron = new Kinectron("172.16.229.40");

  // CONNECT TO MIRCROSTUDIO
  //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked);
}

function draw() {
}

function bodyTracked(body) {
	
  // Get the x,y,z of the midSpine joint.
  midSpine = body.joints[kinectron.SPINEMID];

  // Get all the joints off the tracked body and do something with them
  kinectron.getJoints(drawJoint);

  // Get the right hand
  // Scale it according to speed
//   rightHand = body.joints[kinectron.HANDRIGHT];
//   var x = rightHand.cameraX;
//   var y = rightHand.cameraY;
//   var z = rightHand.cameraZ;
  
//   // For the first time, set prightHand = rightHand.
//   if(prightHand == null)  prightHand = rightHand;

//   var d = dist(x, y, z, prightHand.cameraX, prightHand.cameraY, prightHand.cameraZ);
//   var sz = map(d, 0, 1, 10, 500);
//   push();
//   translate(x, y, z);
//   sphere(sz);
// 	pop();
  
  // Store previous rightHand for next frame.
  prightHand = rightHand;
  

  // Get the hands off the tracked body and do somethign with them
  //kinectron.getHands(drawJoint);
}

// Draw skeleton
function drawJoint(joint) {
	var x = joint.cameraX * myCanvas.width;
  var y = -joint.cameraY * myCanvas.height;
  var z = joint.cameraZ*100;
  var d = dist(joint.cameraX, joint.cameraY, joint.cameraZ, midSpine.cameraX, midSpine.cameraY, midSpine.cameraZ);
	var sz = floor(10/(d+1))*10;
  var dirX = (mouseX/width - 0.5) *2;
  var dirY = (mouseY/height - 0.5) *(-2);
	directionalLight(200, 164, 164, dirX, dirY, 0);
  ambientMaterial(250);
  push();
  //Kinect location data needs to be normalized to canvas size
  translate(x, y, z);
  rotateX(frameCount*.005);
  rotateY(frameCount*.0033);
  rotateZ(frameCount*.0025);

  if(d < .25) {
  	sphere(sz);
  }
  else if(d < .4) {
  	cone(sz, sz*2);
  }
  else {
  	box(sz*2);
  }
  pop();

}

var angle, radius, img;

function preload() {
 img = loadImage("clouds_elias.jpeg");	
}
function setup() { 
  createCanvas(400, 400, WEBGL);
	angle = 0;
	radius = width/4;
} 

function draw() { 
  background(220);
	
	angle += 0.01;
	var x1 = cos(angle)*radius;
	var y1 = sin(angle)*radius;
	var z1 = sin(angle)*radius;
	var x2 = cos(angle*sin(angle))*radius;
	var y2 = sin(angle*cos(angle))*radius;
	var z2 = sin(angle*cos(angle))*radius;
	var x3 = cos(angle*sin(angle))*radius*sin(2*angle);
	var y3 = sin(angle*cos(angle))*radius*cos(2*angle);
	var z3 = sin(angle*cos(angle))*radius*cos(2*angle);
	beginShape();
	vertex(0, 0, 0);
	vertex(x1, y1, mouseX*mouseY/2);
	vertex(x2, y2, z2);
	vertex(x3, y3, z3);
	vertex(0, 0, 0);
	endShape();
}function setup(){
  createCanvas(710, 400, WEBGL);
  angleMode(DEGREES);
}

function draw() {
  // ambientLight(255,0,0); //even red light across our objects
  // rotateX(45);
  // box(100);

  var dirX = map(mouseX, 0, width, -1, 1);
  var dirY = map(mouseY, 0, height, -1, 1);
  directionalLight(250, 250, 250, dirX, -dirY, 0.25);
  ambientMaterial(250);
  sphere(50, 64);

  // var locX = map(mouseX, 0, width, -1, 1);
  // ambientLight(50);
  // pointLight(0, 0, 200, locX, 0, 0);
  // pointLight(200, 200, 0, -locX, 0, 0);
  // specularMaterial(250);
  // sphere(100);

}var img;
var vid;
var theta = 0;

function setup(){
  createCanvas(710, 400, WEBGL);

  img = loadImage("cat.jpg");
  vid = createVideo("tex.mp4");
  vid.loop();
  vid.hide();
}

function draw(){
  background(250);
   translate(-220,0,0);
  push();
    rotateZ(theta * mouseX * 0.001);
    rotateX(theta * mouseX * 0.001);
    rotateY(theta * mouseX * 0.001);
    //pass image as texture
    texture(vid);
    sphere(150);
  pop();
    translate(440,0,0);
  push();
    rotateZ(theta * 0.1);
    rotateX(theta * 0.1);
    rotateY(theta * 0.1);
    texture(img);
    box(100, 100, 100);
  pop();
  theta += 0.05;
}function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  orbitControl();
  //background(0);
  var locY = (mouseY / height - 0.5) *(-2);
  var locX = (mouseX / width - 0.5) *2;
  //to set the light position,
  //think of the world's coordinate as:
  // -1,1 -------- 1,1
  //   |            |
  //   |            |
  //   |            |
  // -1,-1---------1,-1
  pointLight(250, 250, 250, locX, locY, 0);
  ambientMaterial(250);
  for (var i = 0; i < 500; i += 100) {
    push();
		//FILL DOESN'T WORK NOW
    //fill(i * 0.1, 100, 100);

    //line
    translate(0, 100, 0);
		// LINE DOESN'T WORK NOW
    //line(-100, 0, i, 100, 0, i);

    //triangles
    translate(0, 100, 0);
    triangle(
      0, sin(i + frameCount * 0.1) * 10, i,
      60, 60, i, -60, 60, i);

    //quad
    translate(0, 200, 0);
    quad(-100, i, 0,
      100, i, 0, -100, 100, i,
      100, 100, i
    );
    pop();
  }

	  for (var i = -5000; i < 5000; i += 100) {
    	triangle(
				0, 100, i,
				60, 160, i,
				-60, 160, i);
  	}
}function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  orbitControl();
  background(0);
  //draws a box of width: 30, height: 50, and depth: 50
  box(30, 50, 50);
  
  translate(-100, -100, 0);
  
  //draws a cone with radius: 100, height: 100, and a detail of 10
  cone(100, 100, 10);

  translate(200, 0, 0);
  sphere(50);
  translate(-100, -100, 0);
  cylinder(30, 100);
  translate(100, 400, 0);
  torus(100, 30);
}var rot = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw(){
  if (mouseIsPressed) {
    ortho(-width, width, height, -height, 0.1, 100);
  } else {
    perspective(PI/3, width/height, 0.1, 100);
  }

  background(0);

  translate(300, 0, 0);
  box(50);
  translate(-600, 0, 100);
  box(50);
}function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw(){
	// FOV = Field of View - Vertical Angle of Camera
  var fov = mouseX/width * PI/2;
  var aspect = width/height;
  if (mouseIsPressed) {
    aspect = aspect / 2.0;
  }
  perspective(fov, aspect, 0.1, 100);

  translate(30, 0, 0);
  rotateX(-PI/6);
  rotateY(PI/3 + mouseY/height * PI);
  box(45);
  translate(0, 0, -50);
  box(30);
}function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw(){
  var camX = map(mouseX, 0, width, -width, width);
  var camY = map(mouseY, 0, height, -height, height);
  var camZ = 0;
  if (mouseIsPressed) {
    camZ = map(mouseX, 0, width, -1000, 1000);
  }
  camera(camX, camY, camZ);

  background(0);

  translate(30, 0, 0);
  rotateX(PI/6);
  rotateY(PI/3);
  box(45);
  translate(0, 0, -50);
  box(30);
}var rot = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw(){
  background(0);
  
  // rotate around x/y axis
  rotate(rot, [1, 1, 0]);
  
  // barrel roll around x axis
  //rotateX(rot);
  box();
  rot+=0.05;
  
}function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw(){
  background(0);
  //moves our drawing origin to the top left corner
  translate(-width/2, -height/2, 0);
  box();
}function setup() {
  createCanvas(600, 400, WEBGL);
}

function draw(){
  background(0);
  push();
  translate(-width/2, -height/2, -300);
  //rotateX(frameCount*0.01);
  box(100);
  pop();
  
  push();
  translate(width/2, height/2, 1000);
  //rotateX(frameCount*0.01);
  sphere(100);
  pop();
}var myCanvas = null;

// Declare kinectron 
var kinectron = null;
var midSpine;

function setup() {
  myCanvas = createCanvas(500, 500, WEBGL);
  background(0);
  noStroke();

  // Define and create an instance of kinectron
  kinectron = new Kinectron("192.168.0.117");

  // CONNECT TO MIRCROSTUDIO
  //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked);
}

function draw() {
}

function bodyTracked(body) {
	
  // Get the x,y,z of the midSpine joint.
  //var midSpine = body.joints(kinectron.SPINEMID);

  // Get all the joints off the tracked body and do something with them
  kinectron.getJoints(drawJoint);

  // Get the hands off the tracked body and do somethign with them
  //kinectron.getHands(drawJoint);
}

// Draw skeleton
function drawJoint(joint) {
	
  var sz = 50; //sin(dist(joint.depthX, joint.depthY, joint.depthZ, midSpine.depthX, midSpine.depthY, midSpine.depthZ)*2)*150 + 150;
	//pointLight(200, 164, 164, mouseX, mouseY, 0);
  push();
  //Kinect location data needs to be normalized to canvas size
  translate(joint.depthX * myCanvas.width, joint.depthY * myCanvas.height, joint.depthZ * myCanvas.width);
  var rand = random(1);
  if(rand > 0.9) {
	  sphere(sz);
  }
  else if(rand > 0.7) {
    torus(sz, sz/2);
  }
  else if(rand > 0.5) {
   	cone(sz/2, sz); 
  }
  else if(rand > 0.3) {
    box(sz, sz/2, sz*2);
  }
  pop();
}



var myCanvas = null;

// Declare Kinectron
var kinectron = null;

var characterWidth = 250;
var characterHeight = 400;

var backgroundColor = 255;
var ballColor = 150;
var characterColor = 0;

var leftHandState = 0;
var rightHandState = 0;

// **********************************
var handJoint = 23;
var x = 100;
var y = 100;
var xdir = 2;
var ydir = 1;
var caught = false;
// **********************************

var processing = false;

// Initialized joints array 
var joints = [];
for (var a = 0; a < 23; a++) {
  joints[a] = {};
  joints[a].x = 0;
  joints[a].y = 0;
}

function setup() {
  myCanvas = createCanvas(windowWidth, windowHeight - 100);
  background(0);

  // Define and create an instance of kinectron
  kinectron = new Kinectron("192.168.0.116");

  // CONNECT TO MIRCROSTUDIO
  //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

  // Connect remote to application
  kinectron.makeConnection();

  // Start the tracked bodies feed over API
  kinectron.startTrackedBodies(playCatch);
}

function draw() {

}

// Start and stop game 
function keyPressed() {
  if (keyCode === ENTER) {
    kinectron.stopAll();
  } else if (keyCode === UP_ARROW) {
    kinectron.startTrackedBodies();
  }
}


function playCatch(body) {
  background(backgroundColor);

  fill(characterColor);
  ellipseMode(CENTER);

  if (processing === false) {
    processing = true;

    caught = false;

    // Get hand states from the tracked body object
    leftHandState = body.leftHandState;
    rightHandState = body.rightHandState;

    for (var j = 0; j < body.joints.length; j++) {
      // Put joints into array
      joints[j] = {
        x: (body.joints[j].cameraX) * characterWidth / 2 + width / 2,
        y: (body.joints[j].cameraY * -1) * characterHeight / 2 + height / 2 + 50
      };
    }

    // Catch the ball!
    if (dist(joints[handJoint].x, joints[handJoint].y, x, y) < 150) {
      caught = true;
      ballColor = color(random(255), random(255), random(255));
    }

    // Loop through and draw joints
    fill(characterColor);
    for (var d = 0; d < joints.length; d++) {
      ellipse(joints[d].x, joints[d].y, 25, 25);
    }

    // Keep ball moving 
    if (!caught) {
      x += xdir * 2;
      y += ydir * 2;
      if (x >= width || x <= 0) xdir *= -1;
      if (y >= height || y <= 0) ydir *= -1;
    }

    // Draw ball 
    fill(ballColor);
    ellipse(x, y, 50, 50);
    processing = false;
  }
}// Run with simplehttpserver for image to load properly. http://www.andyjamesdavies.com/blog/javascript/simple-http-server-on-mac-os-x-in-seconds

var beach;

// Declare Kinectron
var kinectron = null;

function preload() {
  beach = loadImage("beach.png");
}

function setup() {
  createCanvas(640, 426);
  background(255);

  // Define and create an instance of kinectron
  kinectron = new Kinectron("172.16.229.40");

  // CONNECT TO MIRCROSTUDIO
  //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

  // Create connection between remote and application
  kinectron.makeConnection();

  // Start the greenscreen camera
  kinectron.startKey(goToBeach);
}

function draw() {

}

function goToBeach(img) {
  loadImage(img.src, function(loadedImage) {
    image(beach, 0, 0);
    image(loadedImage, 0, 0);
  });
}var myCanvas = null;
var mode = -1;

// Declare kinectron 
var kinectron = null;

function setup() {
  canvas = createCanvas(500, 500);
  background(0);

  // Define and create an instance of kinectron
  kinectron = new Kinectron("172.16.229.215");

  // CONNECT TO MIRCROSTUDIO
  //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

  // Connect with application over peer
  kinectron.makeConnection();

  // Set callbacks
  kinectron.setRGBCallback(drawFeed);
  kinectron.setDepthCallback(drawFeed);
  kinectron.setInfraredCallback(drawFeed);
}

function draw() {

}

// Choose camera to start based on key pressed
function keyPressed() {
  if (keyCode == TAB) {
    mode++;
    mode%=3;
    //kinectron.stopAll();
    background(0);
  }
  switch(mode){
    case 0:
	    kinectron.startRGB();
      break;
    case 1:      	
    	kinectron.startDepth();
      break;
    case 2:
      kinectron.startInfrared();
      break;
  }
}

function drawFeed(img) {
    console.log(kinectron);

  // Draws feed using p5 load and display image functions  
  loadImage(img.src, function(loadedImage) {
    image(loadedImage, 0, 0);
  });
}var myCanvas = null;

// Declare kinectron 
var kinectron = null;

// drawHand variables
var start = 30;
var target = 100;
var diameter = start;
var light = 255;
var dark = 100;
var hueValue = light;
var lerpAmt = 0.3;
var state = 'ascending';

function setup() {
  myCanvas = createCanvas(500, 500);
  background(0);
  noStroke();

  // Define and create an instance of kinectron
  kinectron = new Kinectron("169.254.237.66");

  // CONNECT TO MIRCROSTUDIO
  //kinectron = new Kinectron("kinectron.itp.tsoa.nyu.edu");

  // Connect with application over peer
  kinectron.makeConnection();

  // Request all tracked bodies and pass data to your callback
  kinectron.startTrackedBodies(bodyTracked);
}

function draw() {

}

function bodyTracked(body) {
  background(0, 20);

  // Get all the joints off the tracked body and do something with them
  kinectron.getJoints(drawJoint);

  // Get the hands off the tracked body and do somethign with them
  kinectron.getHands(drawHands);
}

// Draw skeleton
function drawJoint(joint) {
  fill(100);

  // Kinect location data needs to be normalized to canvas size
  ellipse(joint.depthX * myCanvas.width, joint.depthY * myCanvas.height, 15, 15);

  fill(200);

  // Kinect location data needs to be normalized to canvas size
  ellipse(joint.depthX * myCanvas.width, joint.depthY * myCanvas.height, 3, 3);
}

// Draw hands
function drawHands(hands) {

  //check if hands are touching 
  if ((Math.abs(hands.leftHand.depthX - hands.rightHand.depthX) < 0.01) && (Math.abs(hands.leftHand.depthY - hands.rightHand.depthY) < 0.01)) {
    hands.leftHandState = 'clapping';
    hands.rightHandState = 'clapping';
  }

  // draw hand states
  updateHandState(hands.leftHandState, hands.leftHand);
  updateHandState(hands.rightHandState, hands.rightHand);
}

// Find out state of hands
function updateHandState(handState, hand) {
  switch (handState) {
    case 'closed':
      drawHand(hand, 1, 255);
      break;

    case 'open':
      drawHand(hand, 0, 255);
      break;

    case 'lasso':
      drawHand(hand, 0, 255);
      break;

      // Created new state for clapping
    case 'clapping':
      drawHand(hand, 1, 'red');
  }
}

// Draw the hands based on their state
function drawHand(hand, handState, color) {

  if (handState === 1) {
    state = 'ascending';
  }

  if (handState === 0) {
    state = 'descending';
  }

  if (state == 'ascending') {
    diameter = lerp(diameter, target, lerpAmt);
    hueValue = lerp(hueValue, dark, lerpAmt);
  }

  if (state == 'descending') {
    diameter = lerp(diameter, start, lerpAmt);
    hueValue = lerp(hueValue, light, lerpAmt);
  }

  fill(color);

  // Kinect location needs to be normalized to canvas size
  ellipse(hand.depthX * myCanvas.width, hand.depthY * myCanvas.height, diameter, diameter);
}function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  fill(255);
  background(0);
  
  // register event handler to position anytime it changes
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(updatePosition);
  } else {
    alert("navigator.geolocation is not available");
  }
}

function updatePosition(position) {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  background(0);
  text("Current position: " + lat + " " + lng, 50, 50);
}function setup() {
  createCanvas(windowWidth, windowHeight);
	noStroke();
  // get position once
  if (!navigator.geolocation) {
    alert("navigator.geolocation is not available");
  }
}

function setPos(position) {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  background(0);
  fill(255);
  text("Current position: " + lat + " " + lng, 50, 50);
}

function touchStarted() {  
    navigator.geolocation.getCurrentPosition(setPos);
}// Jiashan Wu
// https://github.com/OhJia/p5MobileWebExamples

var balls = [];

function setup() {
  createCanvas(displayWidth, displayHeight);
  for (var i = 0; i < 15; i++) {
    balls.push(new Ball());
  }
  setShakeThreshold(50);
}

function draw() {
  background(0);

  for (var i = 0; i < balls.length; i++) {
    balls[i].move();
    balls[i].turn();
    balls[i].display();
  }

}

// Ball class
function Ball() {
  this.x = random(width);
  this.y = random(height);
  this.diameter = random(20, 30);
  this.xspeed = random(-2, 2);
  this.yspeed = random(-2, 2);
  this.oxspeed = this.xspeed;
  this.oyspeed = this.yspeed;
  this.direction = 0.5;

  this.move = function() {
    this.x += this.xspeed * this.direction;
    this.y += this.yspeed * this.direction;

  };

  this.turn = function() {
    if (this.x < 0) {
      this.x = 0;
      this.direction = -this.direction;
    } else if (this.y < 0) {
      this.y = 0;
      this.direction = -this.direction;
    } else if (this.x > width - 20) {
      this.x = width - 20;
      this.direction = -this.direction;
    } else if (this.y > height - 20) {
      this.y = height - 20;
      this.direction = -this.direction;
    }
  }

  this.shake = function() {
    //   this.xspeed += random(5, accChangeX/3);
    //   this.yspeed += random(5, accChangeX/3);
    this.xspeed += random(5, 15);
    this.yspeed += random(5, 15);
  }

  this.stopShake = function() {
    if (this.xspeed > this.oxspeed) {
      this.xspeed -= 0.6;
    } else {
      this.xspeed = this.oxspeed;
    }
    if (this.yspeed > this.oyspeed) {
      this.yspeed -= 0.6;
    } else {
      this.yspeed = this.oyspeed;
    }
  }

  this.display = function() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  };
}

function deviceShaken() {
  for (var i = 0; i < balls.length; i++) {
    balls[i].shake();
    balls[i].turn();
  }
  setInterval(function() {
    for (var i = 0; i < balls.length; i++) {
      balls[i].stopShake();
      balls[i].move();
    }
  }, 500);
}// Jiashan Wu
// https://github.com/OhJia/p5MobileWebExamples

var x, y, x;

function setup(){
  createCanvas(windowWidth, windowHeight, 'webgl');
	x = 0;
  y = 0;
  z = 0;
}

function draw(){
  background(255, 255, 255, 255);

  translate(-width/2, 0, -600);
  x+=accelerationX*0.05;
  y+=accelerationY*0.05;
  z+=accelerationZ*0.05;
  normalMaterial();
  rotateX(x);
  rotateY(y);
  rotateZ(z);
  box(80, 80, 180);

}// Jiashan Wu
// https://github.com/OhJia/p5MobileWebExamples

// Position Variables
var x = 0;
var y = 0;

// Speed - Velocity
var vx = 0;
var vy = 0;

// Acceleration
var ax = 0;
var ay = 0;

var vMultiplier = 0.07;
var bMultiplier = 0.6;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(2000);
  fill(0);
}

function draw() {
  background(255);
  ballMove();
  ellipse(x, y, 30, 30);
}

function ballMove() {

  ax = accelerationX;
  ay = accelerationY;

  vx = vx + ax;
  vy = vy + ay;
  y = y + vy * vMultiplier;
  x = x + vx * vMultiplier;

  // Bounce when touch the edge of the canvas
  if (x < 0) {
    x = 0;
    vx = -vx * bMultiplier;
  }
  if (y < 0) {
    y = 0;
    vy = -vy * bMultiplier;
  }
  if (x > windowWidth - 20) {
    x = windowWidth - 20;
    vx = -vx * bMultiplier;
  }
  if (y > windowHeight - 20) {
    y = windowHeight - 20;
    vy = -vy * bMultiplier;
  }

}// ICM-2016

// Take a look at the HTML file where some things have been
// added for mobile viewing

function setup() {
  // Make the canvas the size of the mobile device screen
  createCanvas(windowWidth, windowHeight);
  background(200);
}


function mouseMoved() {
  drawLine();
}

function touchMoved() {
  drawLine();

  // This prevents dragging screen around
  return false;
}


function drawLine() {
  strokeWeight(10)
  stroke(0);
  // Here touchX and touchY act like mouseX and mouseY
  // line(touchX, touchY, ptouchX, ptouchY);
  var x = mouseX || touchX;
  var y = mouseY || touchY;
  var px = pmouseX || ptouchX;
  var py = pmouseY || ptouchY;
  line(x, y, px, py);
}
// ICM-2016

// Take a look at the HTML file where some things have been
// added for mobile viewing

function setup() {
  createCanvas(windowWidth, windowHeight);
  setShakeThreshold(50);
  colorMode(HSB);
  background(0);
}


function deviceShaken() {
  var h = random(255);
  background(h, 255, 255);
}// Jiashan Wu
// https://github.com/OhJia/p5MobileWebExamples

var value = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(value);
}

function deviceTurned() {
  value = value + 10;
  if (value > 255) {
    value = 0;
  }
}

// A global variable for background color
var bgColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  bgColor = color(0,0,0);
}

function draw() {
  // Draw the backgroung
  background(bgColor);

  // Map the accelerameter data to an x and y position
  var x = map(accelerationY, -90, 90, 0, width);
  var y = map(accelerationX, -90, 90, 0, height);
  fill(255);
  ellipse(x, y, 30, 30);
}

// There is also an event triggered whenever the
// device is moved. Here we are picking a background
// color based on accelerometer data
function deviceMoved() {
  var r = map(accelerationX, -90, 90, 0, 255);
  var g = map(accelerationY, -90, 90, 0, 255);
  var b = map(accelerationZ, -90, 90, 0, 255);
  bgColor = color(r, g, b);
}

// ICM-2016

// Take a look at the HTML file where some things have been
// added for mobile viewing

var colors;

function setup() {
  // Make the canvas the size of the mobile device screen
  createCanvas(windowWidth, windowHeight);
  background(200);

  // An array of five colors, one for each finger
  colors = [color(255,0,0), color(0,255,0), color(0,0,255), color(255, 255,0), color(0,255,255)];
}

function draw() {
  // The touches array holds an object for each and every touch
  // The array length is dynamic and tied to the number of fingers 
  // currently touching
  for (var i = 0; i < touches.length; i++) {
    noStroke();
    // One color per finger
    fill(colors[i]);
    // Draw a circle at each finger
    ellipse(touches[i].x, touches[i].y, 24, 24);
  }
}

// this prevents dragging screen around
function touchMoved() {
  return false;
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
  strokeWeight(10)
  stroke(0);
  // Here touchX and touchY act like mouseX and mouseY
  line(touchX, touchY, ptouchX, ptouchY);
  // line(mouseX, mouseY, pmouseX, pmouseY);

  // This prevents dragging screen around
  return false;
}
var img;
var scale = 10;
var skip = 20;

function preload() {
  img = loadImage("totoro.jpg");
}

function setup() {
  createCanvas(img.width, img.height);
  noStroke();
}
// noprotect

function draw() {
   image(img, 0, 0, width, height);
//   loadPixels();
  
//   // What is this going to do to the image?
//   for(var i = 0; i < img.pixels.length; i++) {
//     img.pixels[i]*=1.01;
//   }
//   updatePixels();
	
  //What is this going to do to the image?
  // skip++;
  // skip %= 100;
  // skip = constrain(skip, 20, 100);
  for (var x = 0; x < width; x += 20) {
    for (var y = 0; y < height; y += 20) {
      var c = get(x, y);
      c[3] = 10;
      fill(c);
      ellipse(x, y, skip, skip);
    }
  }
}let ball;
let thunder;
let rain;
let mic;
let vol = 1;

function preload() {
  thunder = loadSound("thunder.mp3");
  rain = loadSound("rain.mp3");
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  ball = new SoundBall(width / 2, height / 2, 50, 50, 3, 2);
  rain.play();
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(220);
  vol = mic.getLevel();
  ball.run();
}

class SoundBall {
  constructor(x, y, w, h, xspeed, yspeed) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
  }

  run() {
    this.update();
    this.display();
  }

  //Update function
  update() {
    this.x += this.xspeed;
    this.y += this.yspeed;
    this.xspeed = bounce(this.x, this.xspeed, 0, width);
    this.yspeed = bounce(this.y, this.yspeed, 0, height);
    var panning = map(this.x, 0., width, -1.0, 1.0);
    rain.pan(panning);

  }

  // Display function
  display() {
    ellipse(this.x, this.y, this.w * vol, this.h * vol);
  }
}

//Bounce function
function bounce(position, speed, min, max) {
  if (position < min || position > max) {
    speed *= -1;
    thunder.play();
  }
  return speed;
}// Get your own API Key @http://developer.nytimes.com
let allTokens = [];
let ts = 16;
let i = 0;

function preload() {
  let q = "trump";
  let apikey = "5fcc7b03d74d15972346cf84719ad5e5:13:68130021";
  let url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + q + "&api-key=" + apikey;
  loadJSON(url, showSnippets);
}

function setup() {
  //noCanvas();
  //noLoop();
  createCanvas(800, 800);
  //noStroke();
  fill(0);
}

function draw() {
  //console.log(allTokens.length);
  background(255, 5);
  ts++;
  ts %= 48;
  if (allTokens.length > 0) {
    i += 1;
    i %= allTokens.length;
    //for (let i = 0; i < allTokens.length; i++) {
    textSize(ts);
    text(allTokens[floor(i)], random(width), random(height));
    //}
  }
}



function showSnippets(data) {
  //console.log(data);
  let docs = data.response.docs;
  console.log(data.response.docs.length);

  // Stuff for matching Trump
  let trumps = ["Trumpy", "McTrumpFace", "Trumperson"];
  let matchTrump = ["Donald", "Trump", "president", "President"];

  // Stuff for matching Obama
  let obamas = ["Obamamama", "Bananabama", "ObamanKenaba"];
  let matchObama = ["Barack", "Obama"];

  // Put all the words together into a single array.
  // Iterate through all the article snippets
  // Make an array of words for each snippet
  for (let i = 0; i < docs.length; i++) {
    let tokens = splitTokens(docs[i].snippet);
    // Loop through each word of the snippet
    for (var j = 0; j < tokens.length; j++) {
      // For each word, loop through the trump terms to match
      for (let k = 0; k < matchTrump.length; k++) {
        let m = matchTrump[k];
        // If there's a match
        if (match(tokens[j], m)) {
          console.log(match(tokens[j], m));
          // Pick a random word from trumps to replace it with
          tokens[j] = trumps[floor(random(trumps.length))];
          break;
        }
        // Repeat for obama
        if (k < matchObama.length) {
          let m = matchObama[k];
          if (match(tokens[j], m)) {
            console.log(match(tokens[j], m));
            tokens[j] = obamas[floor(random(obamas.length))];
          }
        }
      }
      // Shuffle the order of the words
      shuffle(tokens, true);
    }

    // Stick all the words into 1 big array
    allTokens = concat(allTokens, tokens);
  }
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}// http://developer.nytimes.com
function setup() {
  noCanvas();
  noLoop();
  noStroke();
  fill(0);
  var url = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=trump&api-key=5fcc7b03d74d15972346cf84719ad5e5:13:68130021";
  loadJSON(url, showSnippets);
}

function showSnippets(data) {
  console.log(data);
  var docs = data.response.docs;
  for (var i=0; i<docs.length; i++) {
      createP(docs[i].snippet);
  }
}
function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}
var squid;
var div;

function setup() { 
  createCanvas(400, 400);
  squid = select("#squid");
  squid.mouseClicked(hideSquid);
  //div = select("#frame");
  console.log(squid);
} 

function draw() { 
  background(0);
}

function hideSquid(){
  squid.hide();
}

function mouseMoved(){
	var colors = ['red', 'green', 'orange', 'blue'];
 	var c = colors[floor(random(colors.length))];
 	div.style("background", c); 
}var w, h;
var x, y, r;
var Balloons = [];
var Balloons2 = [];
var a = 0;
var b = 0;
var j = 0;
var counter = 0;
var cloud;
var Pop;
var cloudX;
var cloudY;
var cloudX2;
var cloudY2;
var trump; 
var start = false; 




function setup() {
  createCanvas(600, 650);
  for (var i = 0; i < 50; i++) {
    Balloons.push(new Balloon(random(20, width - 20), random(600, 650), 40, 60));
    Balloons2.push(new Balloon(random(20, width - 20), random(600, 650), 40, 60));
  }

  cloudX = 400;
  cloudY = 300;

  cloudX2 = 50;
  cloudY2 = 100;
}

function preload() {
  cloud = loadImage("cloud.png");
  Pop = loadSound('Pop.mp3');
  trump = loadImage('trump.png');
  cloud2 = loadImage("cloud2.png");
}

function draw() {
  background('#ADDBDB');
  image(cloud, cloudX, cloudY);
  image(cloud2, cloudX2, cloudY2);
  image(cloud2, 50, 400);
  
  if (start === false){
  //textSize(30);
  textAlign(CENTER);
  text("Pop as many balloons connected to the mouse as you can. If you let 10 go then you lose. Click to begin", width / 2, height / 2);
  }
  
  if (mouseIsPressed){
    start = true;
  }
  
  if (start === true){
    drawBalloons();
    moveBalloons();
    removeBalloons();

    if (Balloons.length === 0 && Balloons2.length === 0) {
      strokeWeight(2);
      //textSize(30);
      textAlign(CENTER);
      text("YASSS", width / 2, height / 2);
    }
  }
}


function drawBalloons() {
  ellipseMode(CENTER);

  for (var j = 0; j < Balloons.length; j++) {
    Balloons[j].shadow();
    Balloons[j].string();
    Balloons[j].display();
  }

  for (j = 0; j < Balloons2.length; j++) {
    Balloons2[j].shadow();
    Balloons2[j].string();
    Balloons2[j].display();
  }

}



function removeBalloons() {

  for (var i = 0; i < Balloons.length; i++) {
    strokeWeight(1);
    line(mouseX, mouseY, Balloons[0].x, Balloons[0].y);
    if (dist(mouseX, mouseY, Balloons[i].x, Balloons[i].y) < 40) {
      if (mouseIsPressed) {
        Balloons.splice(Balloons[i], 1);
        Pop.setVolume(0.3);
        Pop.play();
        //YAS.jump(1,2);
      }
    }
  }

  for (i = 0; i < Balloons2.length; i++) {
    strokeWeight(1);
    line(mouseX, mouseY, Balloons2[0].x, Balloons2[0].y);
    if (dist(mouseX, mouseY, Balloons2[i].x, Balloons2[i].y) < 40) {
      if (mouseIsPressed) {
        Balloons2.splice(Balloons2[i], 1);
        Pop.setVolume(0.3);
        Pop.play();
        //YAS.jump(1,2);
      }
    }
  }


  //distance = dist(mouseX, mouseY, Balloons[0].x, Balloons[0].y);

}

function moveBalloons() {

  if (Balloons.length > 2) {
    for (var i = 0; i < 3; i++) {
      if (Balloons[i].y > -170 && counter <= 10) {
        Balloons[i].moveFaster();
      } 
    }
  }


  if (Balloons.length == 2) {
    for (i = 0; i < 2; i++) {
      if (Balloons[i].y > -170 && counter <= 10) {
        Balloons[i].moveFaster();
      } 
    }
  }


  if (Balloons.length == 1) {
    for (i = 0; i < 1; i++) {
      if (Balloons[i].y > -170 && counter <= 10) {
        Balloons[i].moveFaster();
      } 
    }
  }

  for (i = 0; i < Balloons.length; i++) {
    if (Balloons[i].y < -170) {
      Balloons.splice(Balloons[i], 1);
      counter = counter + 1;
    }
  }
  text(counter, 20, 20);

  if (Balloons2.length > 2) {
    for (i = 0; i < 3; i++) {
      if (Balloons2[i].y > -170 && counter <= 10) {
        Balloons2[i].move();
      } 
    }
  }


  if (Balloons2.length == 2) {
    for (i = 0; i < 2; i++) {
      if (Balloons2[i].y > -170 && counter <= 10) {
        Balloons2[i].move();
      } 
    }
  }


  if (Balloons2.length == 1) {
    for (i = 0; i < 1; i++) {
      if (Balloons2[i].y > -170 && counter <= 10) {
        Balloons2[i].move();
      } 
    }
  }

  for (i = 0; i < Balloons2.length; i++) {
    if (Balloons2[i].y < -170) {
      Balloons2.splice(Balloons2[i], 1);
      counter = counter + 1;
    }
  }
  text(counter, 20, 20);

  if (counter > 10){
    text("you lose", width / 2, height / 2);
    image(trump,(width/2),(height/2)-30);
      
  }

}

function Balloon(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;

  this.display = function() {
    stroke(0);
    strokeWeight(4);
    fill('#FFFFFF');
    ellipse(this.x, this.y, this.w, this.h);
  };
  this.shadow = function() {
    fill(0, 0, 0, 30);
    noStroke();
    ellipse(this.x + 10, this.y - 10, this.w + 10, this.h + 10);
  };
  this.string = function() {
    strokeWeight(1);
    stroke(0);
    line(this.x, this.y, this.x, this.y + 125);
  };
  this.move = function() {
    this.y = this.y - 2;
  };

  this.moveFaster = function() {
    this.y = this.y - 1;
  };

}

     
 


var balls = [];

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  for(var b = balls.length-1; b > 0; b--) {
    balls[b].update();
    balls[b].display();
    for(var c = 0 ; c < balls.length; c++) {
    	if(b != c) {
        if(balls[b].isNear(balls[c])) {
           //println("HELLO");
        }
      }
    }
    if(balls[b].isClicked()) {
      // Remove this ball
     	balls.splice(b, 1);
    }
  }  
}

function mousePressed(){
 	balls.push(new Ball(mouseX + random(-50, 50), mouseY + random(-50, 50), random(-5, 5), random(-5, 5), random(10, 50))); 
  //println(balls.length);
}

function Ball(x, y, xspeed, yspeed, sz){
  this.x = x;
  this.y = y;
  this.xspeed = xspeed;
  this.yspeed = yspeed;
  this.sz = sz;
  
  this.update = function(){
    this.x += this.xspeed;
    this.y += this.yspeed;
    // Am I going right or left?
    this.xspeed = this.bounce(this.x, this.xspeed, 0, width);
    // Am I going up or down?
    this.yspeed = this.bounce(this.y, this.yspeed, 0, height);
  }
  
  this.bounce = function(position, speed, min, max){
    if(position < min || position > max){
     speed *= -1; 

    }x
  //println(balls.length);s
    return speed;
  }
  
  this.isClicked = function() {
    return mouseIsPressed && dist(this.x, this.y,mouseX, mouseY) < this.sz/2;
  }
  
  this.isNear = function(otherBall) {
    return dist(this.x, this.y,otherBall.x, otherBall.y) < this.sz/2 + otherBall.sz/2;
  }
  
  this.display = function(){
    ellipse(this.x, this.y, this.sz, this.sz); 
  }
  
  
}var balls = [];

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  for(var b = balls.length-1; b > 0; b--){
    balls[b].update();
    balls[b].display();   
  	for(var c = 0; c < balls.length; c++){
      if(b!=c) {
        if(balls[b].isNear(balls[c])){
          balls[b].changeColor();
          balls[c].changeColor();
        }
      }
  	}
    if(balls[b].isClicked()){
      balls.splice(b, 1);
    }
  }
}

function mousePressed(){
  balls.push(new Ball(mouseX + random(-50, 50), mouseY + random(-50, 50), random(-3,3), random(-3,3), random(50), random(50)));
}

function Ball(x, y, xspeed, yspeed, w, h){
  this.x = x;
  this.y = y;
  this.xspeed = xspeed;
  this.yspeed = yspeed;
  this.w = w;
  this.h = h;
  
  this.color = {r: 0, g: 0, b: 0};
  
  this.update = function(){
		this.x += this.xspeed;
    this.y += this.yspeed;
    this.xspeed = this.bounce(this.x, this.xspeed, 0, width);
    this.yspeed = this.bounce(this.y, this.yspeed, 0, height);

  }
  this.bounce = function(position, speed, min, max){
		if(position < min || position > max){
     speed *= -1; 
    }
	return speed;
  }
  
  this.isNear = function(otherBall) {
    return dist(this.x, this.y, otherBall.x, otherBall.y) < this.w + otherBall.w;
  }
  
  this.changeColor = function(){
     this.color = {r: random(255), g: random(255), b: random(255)}; 
  }
  
  this.isClicked = function(){
   	return dist(this.x, this.y, mouseX, mouseY) < this.w; 
  }
  
  this.display = function(){
    fill(this.color.r, this.color.g, this.color.b);
    ellipse(this.x, this.y, this.w, this.h);    
  }
  
}var selected, created;

function setup() { 
  createCanvas(400, 400);
  selected = select("#cat");
  created = createP("Cats are marvelous.");
  selected.style("color", "red");
  selected.mouseClicked(hideElement);
} 

function draw() { 
  background(220);
  selected.position(mouseX, mouseY);
  created.position(random(width), random(height));
}

function hideElement(){
  selected.hide();
  
}function setup() { 
  createCanvas(400, 400);
  ball = select("#ball");
} 

function draw() { 
  background(220);
}var x = 0;
var px = 0;
var canvas;
var par;

function setup() {
  canvas = createCanvas(200, 200);
  par = createP("This is some text.");
  
}


function draw() {
  background(0);
  stroke(255);
  line(x, 0, x, height);
  x = x + 3;
  if (x > width) {
    x = 0;
  }
}

var balls = [];
var numBalls = 100;
function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  
  for(var i = balls.length-1; i > 0; i--) {
    balls[i].update();
    balls[i].display();
	

    for(var j = 1; j < balls.length; j++) {
      // If ball 1 and ball2 are close, do something
      // Open up the console to see the print statement
      if(i != j) {
        if(balls[i].isNear(balls[j])) {
          balls[i].changeColor();
          balls[j].changeColor();
          //println("HELLO: " + i + ": " + j);
          }
        }
    }
    if(balls[i].isClicked()){
       balls.splice(i, 1);
    }
  }
}

function mousePressed(){
  balls.push(new Ball(random(width), random(height), random(30, 60), random(30, 60), random(), random(5)));
}

function Ball(x, y, w, h, xspeed, yspeed) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.xspeed = xspeed;
  this.yspeed = yspeed;
  this.color = { r: 0, g: 0, b:0 };

  //Update function
  this.update = function(){
    this.x+=this.xspeed;
    this.y+=this.yspeed;
    this.xspeed = this.bounce(this.x, this.xspeed, 0, width);
    this.yspeed = this.bounce(this.y, this.yspeed, 0, height);
  }
  
  //Bounce function
  this.bounce = function(position, speed, min, max) {
    if(position < min || position > max) {
      speed *= -1;
    }
    return speed;
  }

  // Detect if mouseClicked
  this.isClicked = function() {
    return mouseIsPressed && dist(this.x, this.y, mouseX, mouseY) < this.w; 
  }

  // Detect if another ball is close by
  this.isNear = function(otherBall) {
    return dist(this.x, this.y, otherBall.x, otherBall.y) < this.w; 
  }
  
  
  // Change color
  this.changeColor = function() {
   this.color = { r: random(255), g: random(255), b:random(255) }; 
  }
  
  // Display function
  this.display = function(){
    fill(this.color.r, this.color.g, this.color.b);
    ellipse(this.x, this.y, this.w, this.h);
  }
}var serial; // variable to hold an instance of the serialport library
var sensorValue = 0;		// ellipse position
var lowest = 1000;
var highest = 0;

function setup() {
  createCanvas(600, 600);
  serial = new p5.SerialPort();  // make a new instance of  serialport library
  serial.on('list', printList);  // callback function for serialport list event
  serial.on('data', serialEvent);// callback for new data coming in
	serial.list();                         // list the serial ports
	serial.open("/dev/cu.usbmodem1411"); // open a port
}

function draw() {
  background("#2307AF");
	fill(255);
  strokeWeight(0);
	ellipse(sensorValue, height/2, 20, 20);
  text(sensorValue, 20, 20);
	
  // Find the min/max of sensor readings.
  if(sensorValue < lowest && sensorValue > 0) lowest = sensorValue;
  if(sensorValue > highest) highest = sensorValue;
  
  //if(frameCount%60 == 0) println(lowest + "\t" + highest);
  
  // Variable controlling face
  var v = map(sensorValue, lowest, highest, 0, width);
  
  fill(255, 0, 0);
  strokeWeight(10);
  noFill();
  // Left Eye
  ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);

  // Right Eye
  ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);

  // Nose
  bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);
	
  // Mouth
  bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
}

// get the list of ports:
function printList(portList) {
 for (var i = 0; i < portList.length; i++) {
	// Display the list the console:
 	println(i + " " + portList[i]);
 }
}

function serialEvent() {
	var inString = serial.readLine();
	if (inString.length > 0) {
	  inString = inString.trim();
		sensorValue = Number(inString/4);
	}
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
var ball, x, y, xspeed, yspeed;
var w;

function setup() {
  createCanvas(400, 400);
  ball = select("#ball");
  x = width / 2;
  y = height / 2;
  xspeed = 0.5;
  yspeed = 0.3;

  ball.mousePressed(changeColor);
}

function draw() {
  background(220);
  update();
}

function update() {
  x += xspeed;
  y += yspeed;
  xspeed = bounce(x, xspeed, 0, width);
  yspeed = bounce(y, yspeed, 0, height);
  ball.position(x, y);

}

function bounce(position, speed, min, max) {
  if (position < min || position > max) {
    speed *= -1;
  }
  return speed;

}

function display() {

}

function changeColor() {
  if (ball.class() == 'red') {
      ball.removeClass('red');
    } else {
      ball.addClass('red');
    }
  }var par;
var slider;

function setup() {
  createCanvas(200, 200);
  par = createP();
  slider = createSlider(0, 255, 100);
}


function draw() {
  background(slider.value());
  par.html("The slider is at: " + slider.value());
}var canvas;
var par;
var x = 0;
var button;

function setup() {
  canvas = createCanvas(200, 200);

  par = createP("This is some text.");
  par.mousePressed(changeText);

  button = createButton("change color");
  button.mousePressed(changeColor);
}

function changeText() {
  par.html("NEW TEXT!" + random(100));
  button.html("BUTTON TEXT");
}

function changeColor() {
  background(random(255), 0, random(255));
}

function draw() {

}var x = 0;
var px = 0;
var canvas;
var par;

function setup() {
  canvas = createCanvas(200, 200);
  par = createP("This is some text.");
  
}


function draw() {
  background(0);
  stroke(255);
  line(x, 0, x, height);
  x = x + 3;
  if (x > width) {
    x = 0;
  }
  par.position(x, mouseY);
}

function mousePressed() {
  
  par.addClass("movable");
  
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}var balls = [];
var numBalls = 100;
function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  
  for(var i = 0; i < balls.length; i++) {
    balls[i].update();
    balls[i].display();
    for(var j = 1; j < balls.length; j++) {
    // If ball 1 and ball2 are close, do something
    // Open up the console to see the print statement
    if(i != j) {
      if(dist(balls[i].x, balls[i].y, balls[j].x, balls[j].y) < 5 ) {
        println("HELLO: " + i + ": " + j);
        }
    }
    }
  }
}

function mousePressed(){
  balls.push(new Ball(random(width), random(height), random(30, 60), random(30, 60), random(5), random(5)));
}

function Ball(x, y, w, h, xspeed, yspeed) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.xspeed = xspeed;
  this.yspeed = yspeed;

  //Update function
  this.update = function(){
    this.x+=this.xspeed;
    this.y+=this.yspeed;
    this.xspeed = this.bounce(this.x, this.xspeed, 0, width);
    this.yspeed = this.bounce(this.y, this.yspeed, 0, height);
  }
  
  
  //Bounce function
  this.bounce = function(position, speed, min, max) {
    if(position < min || position > max) {
      speed *= -1;
    }
    return speed;
  }
  
  // Display function
  this.display = function(){
    ellipse(this.x, this.y, this.w, this.h);
  }
}var num, numCols, numRows, sz;

function setup() {
  createCanvas(1000, 1000);
  noFill();
  num = 0;
  numCols = 5;
  numRows = 5;
  sz = width / 5;
}

function draw() {
  background(220);
  xMarks();
  populate();
}

function xMarks() {
  for (var x = sz / 2; x <= width; x += sz) {
    for (var y = sz / 2; y <= height; y += sz) {
      stroke(25, 0, 200);
      line(x, y, x + 25, y + 25);
      stroke(0, 150, 10);
      strokeWeight(5);
      line(x, y + 25, x + 25, y - 5);
    }
  }
}

function populate() {

  if (num <= numCols * numRows) {
    // This is where you control the speed at which the butterflies appear
    num += 0.5;
  }

  for (var i = 0; i <= num; i++) {
    var col = i % numCols;
    var row = floor(i / numCols);
    var x = (col * sz) + sz / 2;
    var y = (row * sz) + sz / 2;
    butterfly(x, y, sz / 2);
  }
}

function butterfly(x, y, w) {
  strokeWeight(3);
  var aPos = {
    x2: x - 25,
    y2: y + 40,
    w2: w + 10
  };
  arc(x, y, w, 40, 3 * PI / 2, PI / 2);
  arc(aPos.x2, y, w, 40, PI / 2, 3 * PI / 2);
  arc(x, aPos.y2, aPos.w2, 50, 3 * PI / 2, PI / 2);
  arc(aPos.x2, aPos.y2, aPos.w2, 50, PI / 2, 3 * PI / 2);
  stroke(255, 0, 200);
  var ePos = {
    eX: x - 12,
    eY: y + 25
  };
  ellipse(ePos.eX, ePos.eY, 24, 115);
  line(ePos.eX - 2, ePos.eY - 60, x - 30, y - 90);
  line(ePos.eX, ePos.eY - 60, x + 4, y - 90);
}var ball;

function setup() { 
  createCanvas(400, 400);
  ball = new Ball(width/2, height/2, 3, 2);
} 

function draw() { 
  background(220);
  ball.update();
  ball.display();
}

class Ball {
  constructor(x, y, xspeed, yspeed) {
    // Defensive Driving
    this.x = x;
    this.y = y;
    this.xspeed = xspeed;
    this.yspeed = yspeed;
  }

  update() {
    this.xspeed = bounce(this.x, this.xspeed, 0, width);
    this.x += this.xspeed;

    this.yspeed = bounce(this.y, this.yspeed, 0, height);
    this.y += this.yspeed;
  }
  display() {
    ellipse(this.x, this.y, 10, 10);
  }
}

function bounce(position, speed, min, max) {
  if (position < min || position > max) {
    speed *= -1;
  }
  return speed;
}var xmax, ymax, pop;

function setup() { 
  createCanvas(windowWidth, windowHeight);
  noFill();
  pop = 0;
  xmax = 100;
  ymax = 120
} 

function draw() { 
  background(220);
  xMarks();
  populate(75);
}

function xMarks() {
  	for (var x = 10; x <= width; x += 125) {
		  for (var y = 10; y <= height; y += 125) {
        stroke(25, 0, 200);
        line(x, y, x+25, y+25);
        stroke(0, 150, 10);
        strokeWeight(5);
        line(x, y+25, x+25, y-5);
	}}
}

function populate(size) {
  pop++;
  pop%=50;
  xmax += 230;
  if(pop%5 == 0) ymax += 230;
  
  	for (var x = 100; x <= xmax; x += 230) {
		  for (var y = 120; y <= ymax; y += 230) {
      	butterfly(x, y, size);
      }
    }
}

function butterfly(x, y, w) {
  strokeWeight(3);
  var aPos = {
    x2: x - 25,
    y2: y + 40,
    w2: w + 10 };
  arc(x, y, w, 40, 3*PI/2, PI/2);
  arc(aPos.x2, y, w, 40, PI/2, 3*PI/2);
  arc(x, aPos.y2, aPos.w2, 50, 3*PI/2, PI/2);
  arc(aPos.x2, aPos.y2, aPos.w2, 50, PI/2, 3*PI/2);
  stroke(255, 0, 200);
  var ePos = {
    eX: x - 12,
  	eY: y + 25 };
  ellipse(ePos.eX, ePos.eY, 24, 115);
  line(ePos.eX-2, ePos.eY-60, x-30, y-90);
  line(ePos.eX, ePos.eY-60, x+4, y-90);
}var serial; // variable to hold an instance of the serialport library
var sensorValue = 5;		// ellipse position

function setup() {
  createCanvas(320, 240);
  serial = new p5.SerialPort();  // make a new instance of  serialport library
  serial.on('list', printList);  // callback function for serialport list event
  serial.on('data', serialEvent);// callback for new data coming in
	serial.list();                         // list the serial ports
	serial.open("/dev/cu.usbmodem1421"); // open a port
}

function draw() {
  background("#2307AF");
	fill(255);
	ellipse(sensorValue, height/2, 20, 20);
  text(sensorValue, 20, 20);
  if(frameCount % 60 == 0) println(sensorValue);
  
  // Left Eye
  ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);

  // Right Eye
  ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);

  // Nose
  bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);

  // Mouth
  bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
}

// get the list of ports:
function printList(portList) {
 for (var i = 0; i < portList.length; i++) {
	// Display the list the console:
 	println(i + " " + portList[i]);
 }
}

function serialEvent() {
	var inString = serial.readLine();
	if (inString.length > 0) {
	  inString = inString.trim();
		sensorValue = Number(inString/4);
	}
}
var snake = [];
function setup() { 
  createCanvas(400, 400);
  noStroke();
} 

function draw() { 
  background(0);
  
  var sz = map(dist(mouseX, mouseY, pmouseX, pmouseY), 0, 400, 10, 255);
  snake.push({x : mouseX, y: mouseY, sz: sz}); 

  if(snake.length > 20) { 
    snake.splice(0, 1);
  }
  

  for(var s = 0; s < snake.length; s++) {
    fill(255, 1024/snake[s].sz);
   	ellipse(snake[s].x, snake[s].y, snake[s].sz, snake[s].sz);
  }
}var x,y,xspeed,yspeed;

function setup() { 
  createCanvas(400, 400);
  x = width/2;
  y = height/2;
  xspeed = 1;
  yspeed = 3;
} 

function draw() { 
  background(220);
  
  if(x < 0 || x > width) {
   xspeed *= -1; 
  }
  
  if(y < 0 || y > height) {
   yspeed *= -1; 
  }
  
  x += xspeed;
  y += yspeed;

  // Draw the ball
	ellipse(x,y, 50, 50);
}var x, y, xspeed, yspeed;

function setup() { 
  createCanvas(400, 400);
  x = width/2;
  y = height/2;
  xspeed = 3;
  yspeed = 2;
} 


function draw() { 
  background(220);
  update();
  display();
}

//Update function
function update(){
   x += xspeed;
   y += yspeed;
  // Bounce horizontally
  xspeed = bounce(x, xspeed, 0, width);
  
  // Bounce vertically
  yspeed = bounce(y, yspeed, 0, height);
}

//Re-usable bounce function
function bounce(position, speed, min, max) {
    if( position < min || position > max) {
    	speed *= -1;
  }
  return speed;
}

// Display function
function display(){
 ellipse(x,y, 50, 50); 
}var balls = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
	for (var b = 0; b < balls.length; b++) {
  balls[b].run();
  for (var ob = balls.length - 1; ob > 0; ob--) {
    if (b == ob) continue;
    // if (balls[b].isNear(balls[ob])) {
    //    balls[b].changeColor();
    //    balls[ob].changeColor();
    // }
    balls[ob].run();
    if(balls[ob].isNear(balls[b])) {
       balls.splice(ob, 1);
    }
  }
  }
}

function mousePressed() {
  balls.push(new Ball(mouseX, mouseY, random(-5, 5), random(-5, 5)));
}var ball = {};

function setup() { 
  createCanvas(400, 400);
  ball = {
    x : width/2,
    y : height/2,
    xspeed : 1,
    yspeed : 1,
    run : function() {
      this.update();
      this.render();
    },
    render : function() {
      ellipse(this.x, this.y, 50, 50);
    },
    update : function(){
      this.x += this.xspeed;
    	this.y += this.yspeed;
      
      this.xspeed = bounce(this.x, this.xspeed, 0, width);
      this.yspeed = bounce(this.y, this.yspeed, 0, height);
    },
    bounce : function(position, speed, min, max) {
      if( position < min || position > max) {
        speed *= -1;
      }
      return speed;
  	}
  }
  
    
} 

function draw() { 
  background(220);
  ball.run();

}var x1, y1, x1speed, y1speed;
var x2, y2, x2speed, y2speed;

var c1, c1speed;

function setup() { 
  createCanvas(400, 400);
  x1 = random(width);
  y1 = random(height);
  x1speed = 1;
  y1speed = 2;
  
  x2 = random(width);
  y2 = random(height);
  x2speed = 1;
  y2speed = 2;
  
  c1 = 0;
  c1speed = 2;
} 

function draw() { 
  background(220);
  
  // if(x1 < 0 || x1 > width) {
  // 	x1speed *= -1;  
  // }
  
  x1speed = bounce(x1, x1speed, 0, width);
  
  // if(y1< 0 || y1 > height) {
  //   y1speed *= -1;
  // }

  y1speed = bounce(y1, y1speed, 0, height);

  x1 += x1speed;
  y1 += y1speed;
  
  // 
  // if(x2 < 0 || x2 > width) {
  // 	x2speed *= -1;  
  // }

  x2speed = bounce(x2, x2speed, 0, width);

  // if(y2< 0 || y2 > height) {
  //   y2speed *= -1;
  // }

  y2speed = bounce(y2, y2speed, 0, height);

  x2 += x2speed;
  y2 += y2speed;
  
  
  // Bounce the color for Ball 1
  // variables: c1, c1speed
  c1speed = bounce(c1, c1speed, 0, 255);
  
  // Keep color moving
  c1 += c1speed;
  
  fill(c1, c1/2, c1*2);
  ellipse(x1, y1, 50, 50);
  
  fill(255);
  ellipse(x2, y2, 50, 50);
}

function bounce(position, speed, min, max) {
    if( position < min || position > max) {
    	speed *= -1;
  }
  return speed;
}function setup() { 
  createCanvas(400, 400);
  //frameRate(30);
} 

function draw() { 
  background(220);
	
  // Draw a rectangle for 1 frame, every 60 frames.
  if(frameCount%60 == 0 ) {
   rect(width/4, height/2, 50, 50); 
  }  
  // Draw a rectangle for 30 frames, every 30 frames.
  else if(frameCount%60 > 30 ) {
   rect(width/2, height/2, 50, 50); 
  }
  // Draw a rectangle for 15 frames, every 30 frames.
  else if(frameCount%60 < 15 ) {
   rect(3*width/4, height/2, 50, 50); 
  }  
}var ball = {};

function setup() { 
  createCanvas(400, 400);
  ball = {
    x : width/2,
    y : height/2,
    xspeed : 1,
    yspeed : 2,
    run : function(){
      this.update();
      this.render();
    },
    update : function(){
      this.xspeed = this.bounce(this.x, this.xspeed, 0, width);
      this.x+=this.xspeed;

      this.yspeed = this.bounce(this.y, this.yspeed, 0, height);
      this.y+=this.yspeed;
    },
    render : function(){
        ellipse(this.x, this.y, 10, 10);
    },
    bounce : function(position, speed, min, max) {
      if(position < min || position > max) {
       speed *= -1; 
      }
     return speed; 
    }
  }
} 

function draw() { 
  background(0);
  ball.run();
}

var ball1, ball2;

function setup() { 
  createCanvas(400, 400);
  ball1 = new Ball(width/2, height/2, 10, 0);
  ball2 = new Ball(width/2, height/2, 0, 10);

} 

function draw() { 
  background(0);
  ball1.run();
  ball2.run();
}

function Ball(x, y, xspeed, yspeed){
  // Defensive Driving
  var x = x;
  var y = y;
  var xspeed = xspeed;
  var yspeed = yspeed;
  
  this.run = function(){
    this.update();
    this.render();
  }
  this.update = function(){
    xspeed = this.bounce(x, xspeed, 0, width);
    x+=xspeed;
    
    yspeed = this.bounce(y, yspeed, 0, height);
    y+=yspeed;
  }
	this.render = function(){
      ellipse(x, y, 10, 10);
  }
  this.bounce = function(position, speed, min, max) {
    if(position < min || position > max) {
     speed *= -1; 
    }
   return speed; 
  }
}var x, xspeed;
var c, cspeed;

function setup() { 
  createCanvas(400, 400);
  x = width/2;
  xspeed = 10;
  
  c = 0;
  cspeed = 1;
} 

function draw() { 
  background(255);
  xspeed = bounce(x, xspeed, 0, width);
  x+=xspeed;
  cspeed = bounce(c, cspeed, 0, 255);
  c+=cspeed;
  fill(c);
  ellipse(x, height/2, 1000/c, 1000/c);
}

function bounce(position, speed, min, max) {
  if(position < min || position > max) {
   speed *= -1; 
  }
 return speed; 
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  // Reverse the for loop so that it starts at the right side of the screen and draw the columns moving left.
  for (var posx=width;posx>=0;posx-=width/10){
    // posx/width gives you the percentage you're at as you move across the screen
    // width/10 gives you the default width of the rectangle
    // multiplying them together gives you rectangles ranging from 0 at 0% across the screen to width/10 at 100% across the screen.
    rect(posx,0,(posx/width)*(width/10),height);    
  }
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  for(var x = 0; x < width; x += width/10) {
    var c = map(x, 0, width, 0, 255);
    fill(c);
    //fill(255*x/width);
   	rect(x, 0, width/10, height);     
  }
}var positionX;
var xSpeed;

function setup() { 
  createCanvas(400, 400);
  positionX = width/2;
  xSpeed = 2;
} 

function draw() { 
  background(220);
    
  // When the ball passes either side of the canvas, TURNAROUND
  if(positionX > width || positionX < 0) { 
    xSpeed = xSpeed * -1;
  }
    
  
  // We always need to be moving
  positionX = positionX + xSpeed;
  
  fill(0);
  ellipse(positionX, height/2, 100, 100);
}var x, y, xspeed;


function setup() { 
  createCanvas(800, 600);
  x = width/2;
  y = height/2;
  xspeed = width/100;
} 

function draw() { 
  background(0);
  if(x > width || x < 0) {
  	xspeed *= -1;
  }
  x += xspeed;
  ellipse(x, y, 10, 10);
}var strobe = true;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  if (strobe) {
    if (mouseX > width/3 && mouseX < 2*width/3 && mouseY > height/3 && mouseY < 2*height/3) {
        background(random(255), random(255), random(255));
      }
     else {
      if (mouseX >= 2*width/3) {
        background(255);
      } else if (mouseX >= width/3) {
        background(127);
      } else {
        background(0);
      }
    }
  }
	else {	  
    // Draw an ellipse
    noStroke();
    fill(255, 32);
    ellipse(mouseX, mouseY, 50, 50);
	}
}

function mousePressed() {
  strobe = !strobe;
}var numCols = 50;
var numRows = 50;
function setup() { 
  createCanvas(400, 400);
  colWidth = width/numCols;
  rowHeight = height/numRows;
} 

function draw() { 
  background(220);
  
  for(var col = 0; col < numCols; col++) {
    var x = col * colWidth;
  	for(var row = 0; row < numRows; row++) {
      var y = row * rowHeight;
      
      // COMMENT OPTIONS IN/OUT TO SEE DIFFERENT EFFECTS
      
      // OPTION 1: Use % to create patterns.
      // if((row*col)%91 == 0) {
      //  fill(255, 0, 0);  
      // }
      // else if((row*col)%28 == 0){
      //   fill(0, 255, 0);
      // }
      // else if((row*col)%12 == 0) {
      //   fill(0, 0, 255);
      // }
      // else{
      //   fill(0);
      // }
			
      // OPTION 2: Create a gradient
      // fill(map(row*col, 0, numRows*numCols, 0, 255));
      
      // OPTION 3: Create a spotlight
    	fill(map(dist(mouseX, mouseY, x, y), 100,sqrt(sq(400) + sq(400)), 255, 0));
			
      // OPTION 4: Map the spotlight to the speed of the mouse
      //var d = dist(mouseX, mouseY, pmouseX, pmouseY);
      //fill((d*100)/dist(mouseX, mouseY, x, y));
      
			// Draw the rectangle
      noStroke();
    	rect(x, y, colWidth, rowHeight);
  	}  
  }
  
  
}var x, y;

function setup() { 
  createCanvas(400, 400);
  x = width/2;
  y = height/2;
} 

function draw() { 
  background(220);
  
  // Comment in and out each of these options to see different kinds of movement.
  
  // Move to the right
	x++;

//   // Move to the top-left corner
//   x--;
//   y--;
  
//   // Move to the top-right corner
//   x++;
//   y--;

//   // Move to the bottom-left corner
//   x--;
//   y++;
  
//   // Move towards the bottom-right corner
//   x++;
//   y++;
  
//   // Move 2x as fast
//   x+=2
//   y+=2;

  ellipse(x, y, 10, 10);
}function setup() { 
  createCanvas(400, 400);
  rectMode(CENTER);
} 

function draw() { 
  background(220);
  
  push();
  translate(200, 200);
  rotate(QUARTER_PI);
  rect(0, 0, 100, 100);
  pop();

  push();
  translate(100, 100);
  rotate(QUARTER_PI);
  rect(0, 0, 100, 100);
  pop();
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
	background(0);

}

function draw() {
  // Calculate distance traveled by mouse frame to frame
	var d = dist(mouseX, mouseY, pmouseX, pmouseY);
  // Base strokeweight on distance traveled
	// Can I calculate sw some other?
  var sw = map(d, 0, 1000, 0, 500); // d/2;
	
	strokeWeight(sw);
	
	// Calculate the alpha transparency based on d
  // Define alpha using map? Does it have the same result? Why?
	var a = 512/d; 
	stroke(255, a);
  
  // Draw the line
	line(mouseX, mouseY, pmouseX, pmouseY);
	
  // Define the fill for the ellipse
	fill(255, a);
  
	noStroke();
  
  // Calculate a random offset range for the ellipse based on d
	var range = d*2;
	var offset = random(-range, range);
  
  // Draw the ellipse
	ellipse(mouseX + offset, mouseY + offset, d, d);
}  var x;

function setup() { 
  createCanvas(800, 600);
  background(220);
  // 1st argument:
  // 2nd argument:
  // 3rd argument:
  // 4th argument: 
  x = width/2;
  rectMode(CENTER);
} 

function draw() {
  
  rect(x, 300, 100, 100);
  console.log(width);
  
}var x, y, w, h;

function setup() { 
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
  w = width/10;
  h = height/10;
} 

function draw() { 
  background(220);
  stroke(0);
  line(x-w/2, y-h/2, x+w/2, y-h/2);
  line(x+w/2, y-h/2, x+w/2, y+h/2);
  line(x+w/2, y+h/2, x-w/2, y+h/2);
  line(x-w/2, y+h/2, x-w/2, y-h/2);

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
  w = width/10;
  h = height/10;
}function setup() {
  createCanvas(800, 600);
}

function draw() {
	background(0, 255, 255);
	
  stroke(255, 0, 0);
	strokeWeight(50);
  line(0, 0, 800, 600);
  
  noStroke();
  fill(0, 200, 0);
  ellipse(400, 300, 400, 300);
	
	fill(0, 0, 128);
	strokeWeight(20);
  rect(550, 250, 50, 50);
	
}let bg = { r: 0, g: 0, b: 0 };
let fg = { r: 0, g: 0, b: 0 };
let bgspeed = { r: 1, g: .33, b: .67 };
let fgspeed = { r: .33, g: .67, b: 1 };

function setup() {
  createCanvas(800, 800);
  rectMode(CENTER);
  noStroke();
}

function draw() {
  
  // Update background color
  bg.r += bgspeed.r;
  bg.g += bgspeed.g;
  bg.b += bgspeed.r;
  
  // Update foreground color
  fg.r += fgspeed.r;
  fg.g += fgspeed.g;
  fg.b += fgspeed.r;
  
  // Turn around colors
  if(bg.r < 0 || bg.r > 255 ) bgspeed.r *= -1;
  if(bg.g < 0 || bg.g > 255 ) bgspeed.g *= -1;
  if(bg.b < 0 || bg.b > 255 ) bgspeed.b *= -1;

  if(fg.r < 0 || fg.r > 255 ) fgspeed.r *= -1;
  if(fg.g < 0 || fg.g > 255 ) fgspeed.g *= -1;
  if(fg.b < 0 || fg.b > 255 ) fgspeed.b *= -1;
  
  // Draw background and foreground
  background(bg.r, bg.g, bg.b);
  fill(fg.r, fg.g, fg.b);
  rect(width/2, height/2, width/2, height/2);
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
	fill(___, ___, ___);
	ellipse(200, 200, 100, 100);
}function setup() { 
} 

function draw() { 
  background(220);
}