let turkey;

// Load the image 1 time
function preload() {
	turkey = loadImage("turkey.jpg");
  
}

function setup() {
  createCanvas(400, 400);
  
  // Do the threshold 1 time in setup
  turkey.loadPixels();
  for (let i = 0; i < turkey.pixels.length; i+=4) {
    let r = turkey.pixels[i];
    let g = turkey.pixels[i+1];
    let b = turkey.pixels[i+2];
    
    // There is probably a better way to do threshold?
    if (r+b+g > 200) {
      turkey.pixels[i] = 255;
      turkey.pixels[i+1] = 255;
      turkey.pixels[i+2] = 255;
    } else {
      turkey.pixels[i] = 0;
      turkey.pixels[i+1] = 0;
      turkey.pixels[i+2] = 0;
    }
  }
  turkey.updatePixels();
}

function draw() {
  background(220);
  image(turkey, 0, 0);
}var currentImage = null;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
	if (currentImage != null) {
		image(currentImage, 0, 0);
	}
}

function mousePressed() {
	loadStrings('http://localhost:8000/fingerprints/', loadIt);
	
}

function loadIt(files) {
		console.log(files);

		loadImage(files[files.length - 1]);

}let state = 0;
const INTRO = 0;
const GAME = 1;
const FINAL = 2;


function setup() {
  createCanvas(400, 400);
}

function mousePressed() {
  if (state < 2) {
    state++;
  } else {
    state = 0;
  }
}

function draw() {
  background(220);
  if (state == INTRO) {
	  drawOne();
  } else if (state == GAME) {
    drawTwo();
  } else if (state == FINAL) {
    drawThree();
  }
}

function drawOne() {
  rect(width/2, height/2, 50, 50);  
}

function drawTwo() {
   ellipse(width/2, height/2, 50, 50); 
}

function drawThree() {
    text("End", width/2, height/2);
}

var speech;
var recog;

function setup() {
  createCanvas(400, 400);
  speech = new p5.Speech(); // speech synthesis object
  speech.speak("What do you want to do?");
  
  recog = new p5.SpeechRec();
  recog.onResult = gotResult;
  recog.continuous = true;
  recog.interimResults = true;
 	recog.start();
}

function gotResult() {
  console.log(recog.resultString);
  speech.speak(recog.resultString);
}

function draw() {
  background(220);
}let classifier;
let video;

var speech;
var recog;

let started = false;
let stop = false;

function setup() {
  noCanvas();

  speech = new p5.Speech(); // speech synthesis object
  speech.speak('hi there, what do you want to do?'); // say something 

  recog = new p5.SpeechRec('en-US'); // speech recognition object (will prompt for mic access)
  recog.onResult = showResult;
  recog.continuous = true; // do continuous recognition
	recog.interimResults = true; // allow partial recognition (faster, less accurate)  
 	recog.start(); // start listening
}

function showResult()
{
   console.log(recog.resultString); // log the result
   if (!started && recog.resultString.indexOf("start") > -1) {
     started = true;
     stop = false;
    // Create a camera input
    video = createCapture(VIDEO);
    // Initialize the Image Classifier method with MobileNet and the video as the second argument
    classifier = ml5.imageClassifier('MobileNet', video, modelReady);    	
   } else if (started && recog.resultString.indexOf("stop")) {
			stop = true;     
   }
  
}


function modelReady() {
  // Change the status of the model once its ready
  //select('#status').html('Model Loaded');
  console.log("Model Loaded");
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
  speech.speak(results[0].className);
  console.log(results[0].className);

  //select('#result').html(results[0].className);
  //select('#probability').html(nf(results[0].probability, 0, 2));
  if (!stop) {
	  classifyVideo();
  }
}let video;
let osc;

function setup() {
  createCanvas(400, 400);
  
  video = createCapture(VIDEO);
  video.hide();
  
  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.start();
}

function draw() {
  background(220);
  image(video, 0, 0, width, height);
  
  let mostRed = 0;
  let mostRedX = 0;
  let mostRedY = 0;
  
  loadPixels();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      var currentRed = pixels[4*(y*width + x)];
      var currentGreen = pixels[4 * (y * width + x) + 1];
      var currentBlue = pixels[4 * (y * width + x) + 2];
      
      if (currentRed > mostRed) {
        mostRedX = x;
        mostRedY = y;
        mostRed = currentRed;
      }
      
      

      //set(x, y, [currentBlue, currentBlue, currentBlue, currentRed]);
      
    } 
  }
  updatePixels();
  ellipse(mostRedX, mostRedY, 50);
  osc.freq(map(mostRedY, 0, height, 0, 1000));
}let video;
let poseNet;
let poses = [];
let skeletons = [];

function setup() {
  createCanvas(640, 480);
  
  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.start();
  
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function (results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  background(255);
  //image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  //drawSkeleton();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = poses[i].pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
    
    let rightEar = poses[i].pose.keypoints[4];
    ellipse(rightEar.position.x, rightEar.position.y, 50, 50);
    osc.freq(map(rightEar.position.y, 0, width, 0, 2000));

    
    
  }
  
  
  
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    // For every skeleton, loop through all body connections
    for (let j = 0; j < poses[i].skeleton.length; j++) {
      let partA = poses[i].skeleton[j][0];
      let partB = poses[i].skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}let capture;

function setup() {
  capture = createCapture(VIDEO);

// 	const video = document.getElementById('video');

// 	// Create a YOLO method
// 	const yolo = ml5.YOLO(video, modelLoaded);

//   // Detect objects in the video element
//   yolo.detect(function(err, results){
//     console.log(results) // Will output bounding boxes of detected objects
//   });
}


// When the model is loaded
function modelLoaded() {
  console.log('Model Loaded!');
}

var message = "Welcome IMA Parents!";

var secondsPerBackground = 10;

var backgroundImages = [
  "images/1.jpg",
  "images/2.jpg",
  "images/3.jpg",
  "images/4.jpg",
  "images/5.jpg",
  "images/6.jpg"
  ];

var backgrounds = [];
currentIndex = 0;

class Ball {
 	constructor(imag) {
    this.img = imag;
    this.width = 100;
    this.height = 100;
    this.w = width;
    this.h = height - height/3;
   	this.x = random(this.width, width - this.width);
    this.y = random(this.h, height - this.height);
    this.xdir = random(.1,2);
    this.ydir = random(.1,2);
  }
  
  display() {
   //ellipse(this.x, this.y, this.width, this.height);
    image(this.img, this.x, this.y, this.width, this.height);
    if (this.x <= 0 || this.x >= this.w - this.width) {
     this.xdir *= -1; 
    }
    if (this.y <= this.h || this.y >= height - this.height) {
      this.ydir *= -1;
    }
    
    this.x += this.xdir;
    this.y += this.ydir;    
  }
  
  bounce() {
    this.xdir *= -1; 
    this.ydir *= -1;
  }
}

var balls = [];

var images = [];

function preload() {
  images[0] = loadImage("IMA-Sticker-coder-activist2.png");
  images[1] = loadImage("IMA-Sticker-Invent.png");
  images[2] = loadImage("IMA-Sticker-thinker-engineer2.png");
  images[3] = loadImage("IMA-Sticker-maker-artist2.png");
  images[4] = loadImage("IMA-Sticker2.png");
  
  for (let i = 0; i < backgroundImages.length; i++) {
  	let bgimg = loadImage(backgroundImages[i]); 
    backgrounds.push(bgimg);
  }

}

function setup() { 
  createCanvas(windowWidth, windowHeight);
  balls[0] = new Ball(images[0]);
  balls[1] = new Ball(images[1]);
  balls[2] = new Ball(images[2]);
  balls[3] = new Ball(images[3]);
  balls[4] = new Ball(images[4]);
} 

var count = 0;

function draw() { 
  background(255);
  //console.log(backgrounds[currentIndex].height, width * float(backgrounds[currentIndex].height/backgrounds[currentIndex].width));
  image(backgrounds[currentIndex], 0, 0, width, width * backgrounds[currentIndex].height/backgrounds[currentIndex].width) ;
  if (frameCount % (60*secondsPerBackground) == 0) {
	  count++;
	  currentIndex = count%backgrounds.length;
  }
  
  fill(0);
  textSize(64);
  text(message, width/2 - textWidth(message)/2 + 2, 102);
  fill(255);
  text(message, width/2 - textWidth(message)/2, 100);
  
  // console.log(height - balls[0].height);
  // line(0,height - balls[0].height, width, height - balls[0].height);
  
  for (var i = 0; i < balls.length; i++) {
   balls[i].display(); 
    // for (var j = i+1; j < balls.length; j++) {
    //   if (dist(balls[i].x, balls[i].y, balls[j].x, balls[j].y)<balls[j].width*2)
    //   {
    //     balls[i].bounce(); 
    //     balls[j].bounce();
    //   }
    // }
  }
}let mic;
let fft;

function setup() {
  createCanvas(400, 400);
  
  mic = new p5.AudioIn();
  mic.start();
  
  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  background(220);
  
  let vol = mic.getLevel();
  //print(vol);
  ellipse(width/2, height/2, vol*1000);
  
  let spectrum = fft.analyze();
  //print(spectrum);
  
  for (var i = 0; i < spectrum.length; i++)
  {
    if (spectrum[i] < 100) {
      spectrum[i] = 0;
    }
    var y = map(spectrum[i], 0, 255, height, 0);
	   line(i, height, i, y); 
  }
  
}let osc;

function setup() {
  createCanvas(400, 400);
  
  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.start();
  //osc.freq(1020);
}

function draw() {
  background(220);
  osc.freq(map(mouseX, 0, width, 0, 5000));
}let beep;
let playing = false;

function preload() {
 	beep = loadSound("beep.mp3"); 
}

function setup() {
  createCanvas(400, 400);
  beep.loop();
}

function draw() {
  background(220);
  //beep.play();
  
  // let vol = map(mouseY, 0, height, 2, 0);
  // beep.amp(vol);
  
  var speed = map(mouseX, 0, width, 0, 4);
  beep.rate(speed);
  
  var panning = map(mouseY, 0, width, -1, 1);
  beep.pan(panning);
}

function mousePressed() {
 	//beep.stop(); 
  if (!playing) {
	  beep.play();
    playing = true;
  } else {
    beep.stop();
    playing = false;
  }
}var api = 'http://api.usno.navy.mil/imagery/jupiter.png?'
var query_date = 'date='
var query_time = '&time=';
var date_year = 2018;
var date_month = 12;
var date_day;
var time_h = 11;
var time_m = 30;
var url;
var col;
var slider;
var theImage = null;
var imgTag;

function setup() {
  noCanvas();
  //createCanvas(400,400);
  //loadJSON (url,gotImg);
  slider = createSlider(1, 30, 1);
  slider.position(10, 10);
  slider.style('width', '80px');
}

function draw() {
  //loadJSON (url,gotImg);
  //loadImage(url,gotImg);
  url = api + query_date + date_month + '/' + date_day + '/' + date_year + query_time + time_h + ':' + time_m;
  date_day = floor(slider.value());
  console.log(url);
  
  imageTag = createImg(url);
  //imageTag.src = url;
  
  var d = createDiv("test");
  d.style("background", "url('" + url + "')");
          

}
  // API Key d21e79452f4461671f1ccf2a209d48c3
// http://api.openweathermap.org/data/2.5/weather?q=New%20York&appid=d21e79452f4461671f1ccf2a209d48c3&units=imperial

let txt;
let button;

function setup() {
  createCanvas(400, 400);
  
  txt = select("#text");
  
  button = select("#button");
  button.mousePressed(loadIt);
  
}

function loadIt() {
  console.log(txt.value());
  loadJSON("https://api.openweathermap.org/data/2.5/forecast?q="+txt.value()+"&appid=d21e79452f4461671f1ccf2a209d48c3&units=imperial", drawWeather);
}

function drawWeather(data) {
 	console.log(data); 
  
  let d = new Date(data.list[0].dt);
  print(d.getHours() + ":" + d.getMinutes());
  let minTemp = 200;
  let maxTemp = -200;
  let currentDay;
  let lastDate = 0;
  for (let i = 0; i < data.list.length; i++)
  {
    
  	// currentDay = new Date(data.list[i].dt);
  	// let currentDate = currentDay.getDate();
  	// if (currentDate > lastDate)
  	// lastDate = currentDate;
  	// }
    if (data.list[i].main.temp < minTemp) {
      minTemp = data.list[i].main.temp;
    }
    
    if (data.list[i].main.temp > maxTemp) {
     	maxTemp = data.list[i].main.temp; 
    }
  }
  
  print("The min temp is: " + minTemp);
  print("The max temp is: " + maxTemp);

  
  //console.log(data.main.temp);
  //setTimeout(loadIt, 5000);
}

function draw() {
  background(220);
}let video;


function setup() {
  createCanvas(400, 400);
  video = createCapture(VIDEO);
  video.hide();

}

function draw() {
  background(220);
  image(video, 0, 0, width, height);

loadPixels(); 
  for (var w = 0; w < width; w++) {
    for (var h = 0; h < height; h++) {
	
   	var r = pixels[4 * ((h*width + w))];
	var g = pixels[4 * ((h*width + w) + 1)];      

      // Sub Channel
pixels[4 * ((h*width + w) + 1)] = r;

      	//set(w, h, [0, 0, r, g]); 
    }
  }
  updatePixels();

}let noise;

function setup() {
  createCanvas(400, 400);

	noise = new p5.Noise();
  noise.setType('white');
  noise.start();
}

function draw() {
  background(220);
}
let osc;

function setup() {
  createCanvas(400, 400);

	osc = new p5.Oscillator();
  osc.setType('sine');
  osc.start();
}

function draw() {
  background(220);
  
	let freq = map(mouseX, 0, width, 150, 880);
  osc.freq(freq);
}
let input;

function setup() {
  createCanvas(400, 400);

  input = new p5.AudioIn();
  input.start();
}

function draw() {
  background(220);
  
	let vol = input.getLevel() * 100;
  print(vol);
	ellipse(width/2, height/2, vol);
}
let song;
let fft;

function preload() {
  song = loadSound("beat.mp3");  
 	fft = new p5.FFT();
}

function setup() {
  createCanvas(400, 400);

}

function draw() {
  background(220);
  
	let spectrum = fft.analyze();

  for (var i = 0; i < spectrum.length; i++) {
    stroke(0);
    // The FFT range is between 0 and 1, we map it to pixels
    var y = map(spectrum[i], 0, 255, height, 0);
    line(i, height, i, y);
  }
}


function mousePressed() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.loop();
  }
}
let descriptions = [];
let words = [];

function setup() {
  createCanvas(400, 400);
  loadJSON("https://itp.nyu.edu/ranch/api/projects-finder/interactive", processData);
}

function processData(data)
{
  descriptions = data;
  
  for (let i = 0; i < descriptions.length; i++)
  {
   let currentWords = split(descriptions[i].description, " ");
    for (let c = 0; c < currentWords.length; c++) {
      let found = false;
    	for (let d = 0; d < words.length; d++) {
       if (currentWords[c] == words[d].word) {
        found = true; 
         words[d].count++;
       }
      }
      if (found == false) {
       words.push({"word":currentWords[c],"count":1}); 
      }
    }
  }
  
  for (let i = 0; i < words.length; i++)
  {
  	console.log(words[i]);
  }
}

function draw() {
  background(220);
}// API Key d21e79452f4461671f1ccf2a209d48c3
// http://api.openweathermap.org/data/2.5/weather?q=New%20York&appid=d21e79452f4461671f1ccf2a209d48c3&units=imperial

let txt;
let button;

function setup() {
  createCanvas(400, 400);
  
  txt = select("#text");
  
  button = select("#button");
  button.mousePressed(loadIt);
  
}

function loadIt() {
  console.log(txt.value());
  loadJSON("https://api.openweathermap.org/data/2.5/weather?q="+txt.value()+"&appid=d21e79452f4461671f1ccf2a209d48c3&units=imperial", drawWeather);
}

function drawWeather(data) {
 	//console.log(data); 
  console.log(data.main.temp);
  setTimeout(loadIt, 5000);
}

function draw() {
  background(220);
}function setup() {
  createCanvas(400, 400);
  loadJSON("nameage.json", gotData);
}

function gotData(data) {
 	for (let i = 0; i < data.length; i++) {
  	ellipse(random(width), random(height), data[i].age);
    console.log(data[i].name);
  }
}

function draw() {
  //background(220);
}let lines = [];
let i = 0;

function setup() {
  createCanvas(400, 400);
  
  loadStrings("lines.txt", doText);
}

function doText(data) {
  lines = data;
} 

function draw() {
  background(255,255,255);

	//for (let i = 0; i < lines.length; i++) {
    text(lines[i], 5, 20*i+20);
  //}
}

function mousePressed() {
 i++; 
 console.log(lines[i]); 

}function setup() {
  createCanvas(400, 400);
  setTimeout(drawSomething, 500);
}

function drawSomething() {
 	ellipse(width/2, height/2, 50, 50); 
}

function draw() {
  //background(220);
}let canvas, bgcanvas, button;

function windowResized(){
  button.position(windowWidth/2, height/2);

  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  bgcanvas = color(200, 100, 100)
  canvas.position(0,0);
  canvas.style('z-index', '-1');
  button = createButton('switch');
  button.id("myButton");
  button.mousePressed(changeColor);
}



function changeColor(){
bgcanvas = color(random(255), random(255), random(255));
}


function draw() {
  background(bgcanvas);
}function setup() {
  loadJSON("data.json", drawData);
}

function drawData(data) {
  console.log("here" + data.length);
  for (let i = 0; i < data.length; i++) {
    fill(155, 30, 180, 180);
    ellipse(random(width), random(height), data[i].age * 5); // age = 30
    fill(255);
    text(data[i].name, random(width), random(width)); // name
  }
}

function draw() {
}
let imgs = [];
function preload() {
  for (let i = 0; i < 7; i++) {
    var imag = loadImage('images/' + i + '.jpg');
    imgs.push(imag);
  }
}

function setup() {
  createCanvas(800, 800);
}

function draw() {
	background(0);
	image(imgs[0],0,0);

}let img;

function preload() {
  img = loadImage('images/0.jpg');
}

function setup() {
  createCanvas(800, 800);
  
}
function draw() {
  background(0);
	image(img,0,0);
}let size = 800;
let clocks = []; //array of clocks
let arm1;
let arm2;
let arm3;
let arm4;
let arm0 = 0;

const MODE1 = 49;
const MODE2 = 50;
const MODE3 = 51;

let color;

function setup() {
	createCanvas(size, size);
  
	for (let x = 0; x <= size; x += 20) {
		for (let y = 0; y <= size; y += 20) {
		clocks.push(new Clock(x,y));
		}
	}
}


function draw() {
	background(0);
  
  if (mouseIsPressed) {
    background(255);
    color = 225;
  } else {
    color = 255; 
  }


	// print(clocks.length);

	for (var i = 0; i < clocks.length; i++) {
	clocks[i].display(i, mouseX, mouseY);
	// clocks[i].rotation(i);
	//console.log("shown");
	}


}

class Clock {
  constructor(x, y) {
	this.x = x;
	this.y = y;
  }
  
	display(change, x, y) {
  	// arm1 = map(mouseX, 0, size, 0,150);
  	// arm2 = sqrt(mouseX * mouseY);
    
    arm4 = dist(x, y, this.x, this.y);
    arm1 = (change) / (arm4);
    arm2 = (change / 60) * map(x, 0, size, 0,150);
    arm3 = dist(x,y,size/2,size/2);
    
    //modeSwitch();
    
		push();
		translate(this.x, this.y)
		rotate(radians(arm0));
    // rotate(radians(arm2));
    // strokeWeight(arm4/25);
		stroke(arm4+100);
		line(0, 0, 10, 10);
		pop();
    
    push();
		translate(this.x, this.y)
		// rotate(radians(arm1));
    rotate(radians(arm4));
    // rotate(radians(arm4));
    // strokeWeight(arm1/25);
		stroke(color);
		line(0, 0, 10, 10);
		pop();
    
	}

	// this.rotation = function() {
	// 	this.x = this.x * noise(0.01*frameCount);
	// }
}

function keyPressed() {
  if (keyCode == MODE1) {
    arm0 = arm1;
  }
  else if (keyCode == 50) {
    arm0 = arm2;
  }
  else if (keyCode == 51) {
    arm0 = arm4;
  }
  else if (keyCode == 52) {
    arm0 = arm3;
  }
}let thediv;
let theotherdiv;
let h1;
let two;

let input;

function setup() {
  createCanvas(400, 400);
  
  thediv = select('#thediv');
  //thediv.html("Here is new text");
  
  theotherdiv = createDiv("Here is the initial text");
  h1 = createElement("h1","Here is a headline");
	h1.mousePressed(h1Callback);
  
  two = select('#two');
  
  input = select('#textInput');
  input.changed(inputCallback);
}

function inputCallback() {
 alert(input.value()); 
}

function h1Callback() {
  h1.style('color', 'green');
 //alert("Hey stop"); 
}

function draw() {
  background(220);
}

function mousePressed() {
 thediv.html("Here is some new text"); 
  two.html("New stuff");
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}

function mousePressed() {
  let livediv = select('#dynamic');
	livediv.html("Updated Text");

}
let buttons = [];
let numButtons = 100;

function setup() {
  createCanvas(1, 1);
  
  for (let i = 0; i < numButtons; i++) {
		let b = createButton(i);
    b.position(10,i*20);
    buttons.push(b);
    b.mouseClicked(function() {
      print(i);
      window.alert(i);
    });
  }
  
}

function draw() {
  background(220);
}let balls = [];
let numBalls = 10;

function setup() {
  createCanvas(400, 400);
  
	for (let i = 0; i < numBalls; i++) {
  	let b = new Ball(random(0,width), random(0,height), random(-2,2), random(-1,1), random(1,50)); 
    balls.push(b);
  }
}

function draw() {
  background(220);
  
	for (let i = 0; i < balls.length; i++) {
    
    // Check for collisions
    for (let j = i; j < balls.length; j++) {
     if (balls[i] != balls[j] && dist(balls[i].x, balls[i].y, balls[j].x, balls[j].y) < (balls[i].r + balls[j].r)/2) {
       balls[i].bounceX(); 
       balls[i].bounceY();
       balls[j].bounceX();
       balls[j].bounceY();
     }
    }
    
		balls[i].move();
    balls[i].display();

  	if (mouseIsPressed && balls[i].hover()) {
     balls[i].stop(); 
    } else {
     balls[i].start(); 
    }
  }  
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  rectMode(CENTER);
  drawSomething(mouseX, mouseY, 200);
}

function drawSomething(x, y, s) {
 	rect(x, y, s, s);
  if (s > 10) {
	  drawSomething(x, y, s-10);
  }
}

let b, b1;

function setup() {
  createCanvas(400, 400);
  
  b = new Ball(50, 50, 1, 2, 50);
  b1 = new Ball(90, 80, 2, 1, 40);
  
}

function draw() {
  background(220);
  
  b.move();
  b1.move();
  
  b.display();
  b1.display();
  
  b.hover();
  b1.hover();
  
  // if (mouseIsPressed) {
  //   b.stop();
  // } else {
  //   b.start();
  // }  
  
  // ellipse(b.x, b.y, b.r, b.r);
  // ellipse(b1.x, b1.y, b1.r, b1.r);
  
}let ball = {
 	x: 100,
  y: 100,
  d: 25,
  xspeed: 1,
  yspeed: 2
}

let beachBall = {
 	x: 50,
  y: 50,
  d: 50,
  xspeed: 1,
  yspeed: 1
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  displayBall(ball);
  displayBall(beachBall);
  
  moveBall(ball);
  moveBall(beachBall);
  
  bounceBall(ball);
  bounceBall(beachBall);
}

function displayBall(whichBall) {
	ellipse(whichBall.x, whichBall.y, whichBall.d, whichBall.d); 
  
}

function moveBall(whichBall) {
 	whichBall.x = whichBall.x + whichBall.xspeed;
  whichBall.y = whichBall.y + whichBall.yspeed;
}

function bounceBall(whichBall) {
	if (whichBall.x <= 0 || whichBall.x >= width) {
  	whichBall.xspeed = whichBall.xspeed * -1;  
  }
  
  if (whichBall.y <= 0 || whichBall.y >= height) {
   	whichBall.yspeed = whichBall.yspeed * -1; 
  }
}
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
	

// 	fill(random(0,100), random(0,255), random(0, 255));
// 	ellipse(mouseX-20, mouseY-40, 50 ,50);

// 	fill(random(0,100), random(0,255), random(0, 255));
// 	ellipse(mouseX+20, mouseY-80, 50 ,50);
	
  // for (let i = 0; i < 100; i++) {
  //  	drawCircle(random(0,100), random(0,100)); 
  // }
  
	drawCircle(10, 50);
	drawCircle(0, 60);
	drawCircle(100, 70);
	drawCircle(75, 80);
  
  
  let d = myDist(width/2, height/2, mouseX, mouseY);
  drawCircle(d,d);
  print(d);
  
}

function drawCircle(offset, diameter) {
	fill(random(0,100), random(0,255), random(0, 255));
	ellipse(mouseX+offset, mouseY+offset, diameter ,diameter);	
}

function myDist(x1, y1, x2, y2) {
  return sqrt(pow((x2 - x1),2) + pow((y2 - y1),2));
}

let myText;

function setup() {
  createCanvas(1, 1);
 
  myText = {
    cc: 0,
	  p: createP(""),
    s: ""
  };
  
  frameRate(10);
  
}

function draw() {
  //background(220);
  
  let c = random(95,123);
  c = floor(c);
  if (c == 96 || c == 95 || charCount >= random(1,10)) {
   c = 32; 
    charCount = 0;
  }
  c = char(c);
  //print(c);
  s = s + c;
  charCount++;
  print(charCount);
  //print(s);
	paragraph.html(s);
}let x = 100;
let y = 100;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  drawCircle(x,y,50);
}

function drawCircle(x,y,r) {
  stroke(255);
  noFill();
  ellipse(x, y, r, r);
  if(r > 2) {
    // Now we draw two more circles, one to the left
    // and one to the right
    drawCircle(x + r/2, y, r/2);
    drawCircle(x - r/2, y, r/2);
  }
}var ball = {
  x: 200,
  y: 30,
  w: 25,
  h: 25,
  xspeed: 1.0,
  yspeed: 1.0,
  gravity: .75
}

function setup() {
  createCanvas(400, 300);
}

function displayBall() {
  fill(255);
  ellipse(ball.x, ball.y, ball.w, ball.h);
}

function moveBall() {
  ball.x = ball.x + ball.xspeed;
  ball.yspeed = ball.yspeed + ball.gravity;
  ball.y = ball.y + ball.yspeed;
}

function bounceBall() {
  if (ball.y >= height || ball.y <= 0) {
    ball.yspeed = ball.yspeed * -0.95;
    if (ball.y >= height) {
     ball.y = height; 
    }
  }
  
  if (ball.x >= width || ball.x <= 0) {
   ball.xspeed = ball.xspeed * -1.0; 
  }
}

function draw() {
  background(0);
  displayBall();
  moveBall();
  bounceBall();
}

// 10print.org
// Ported from the book

var w = 16;
var h = 16;
var index = 0;

function setup() {
  createCanvas(640, 384);
  background('#0000ff');
  strokeWeight(3);
  stroke(224);
}

function draw() {
  var x1 = w*index;
  var x2 = x1 + w;
  var y1 = h*23;
  var y2 = h*24;
  if (random(2) < 1) {
    line(x2, y1, x1, y2);
  } 
  else {
    line(x1, y1, x2, y2);
  }
  
  index++;
  if (index == width/w) {
    var p = get(0, h, width, h*23);
    background('#0000ff');
    set(0, 0, p);
    index = 0;
  }
}let x, y;
let xdir = 4;
let ydir = 3;
let pdirSet = false;
let pxdir = 4;
let pydir = 3;

function setup() {
  createCanvas(400, 400);
  x = 10;
  y = 10;
}

function draw() {
  background(220);
  
  rect(200,200,100,100);
  if (mouseIsPressed && mouseX > 200 && mouseX < 300 && mouseY < 300 && mouseY > 200) {
    if (xdir != 0 && ydir != 0) {
    	pxdir = xdir;
    	pydir = ydir;
	   	xdir = 0;
  	  ydir = 0;
      pdirSet = true;
    }
  } else if (pdirSet) {
   		xdir = pxdir;
    	ydir = pydir;
    	pdirSet = false;
  }
  
  ellipse(x,y,20,20);
  x = x + xdir;
  y = y + ydir;
  
  if (y >= 400 || y <= 0) {
    ydir = ydir * -1;
  }
    
  if (x >= 400 || x <= 0) {
    xdir = xdir * -1;
  }  
}
let s = "";
let paragraph;
let charCount = 0;

function setup() {
  createCanvas(1, 1);
  
  paragraph = createP("");
  
  frameRate(10);
  
}

function draw() {
  //background(220);
  
  let c = random(95,123);
  c = floor(c);
  if (c == 96 || c == 95 || charCount >= random(1,10)) {
   c = 32; 
    charCount = 0;
  }
  c = char(c);
  //print(c);
  s = s + c;
  charCount++;
  print(charCount);
  //print(s);
	paragraph.html(s);
}let x, y;
let xdir = 4;
let ydir = 3;

function setup() {
  createCanvas(400, 400);
  x = 10;
  y = 10;
}

function draw() {
  background(220);
  
  ellipse(x,y,20,20);
  x = x + xdir;
  y = y + ydir;
  
  if (y >= height || y <= 0) {
    ydir = ydir * -1;
  }
    
  if (x >= width || x <= 0) {
    xdir = xdir * -1;
  }  
}
function setup() {
  createCanvas(400, 400);
	
	let x = "0";
	if (x === false) {
		print("equal");
	}
	
}

function draw() {
  background(220);
}let s = "";
let p;
let numCharsNoSpace = 0;


function setup() {
  createCanvas(1, 1);
  
  p = createP("");
  
  //frameRate(1);
  
}

function draw() {
  //background(220);
  
  let stayHere = true;
  while (stayHere) {
    // Better range for letters
    // https://en.wikipedia.org/wiki/ASCII
    let c = random(96,123);
    c = floor(c);

    // Check for 96 which we don't want
    // turn into a space
    if (c == 96) {
      print("got 96"); 
      // Change it to a space
      c = 32; // space
      numCharsNoSpace = 0;
      stayHere = false;
    } else {
      numCharsNoSpace++; 
    }

    if (numCharsNoSpace >= random(10)) {
      c = 32; 
    }

    c = char(c);
    //print(c);
    s = s + c;
  }
  //print(s);
  p.html(s);
}let s = "";
let p;
let numCharsNoSpace = 0;


function setup() {
  createCanvas(1, 1);
  
  p = createP("");
  
  //frameRate(1);
  
}

function draw() {
  //background(220);
  
  // Better range for letters
  // https://en.wikipedia.org/wiki/ASCII
  let c = random(96,123);
  c = floor(c);
  
  // Check for 96 which we don't want
  // turn into a space
	if (c == 96) {
		print("got 96"); 
    // Change it to a space
    c = 32; // space
    numCharsNoSpace = 0;
  } else {
   	numCharsNoSpace++; 
  }
  
  if (numCharsNoSpace >= random(10)) {
   	c = 32; 
  }
  
  c = char(c);
  //print(c);
  s = s + c;
  //print(s);
  p.html(s);
}let s = "";
let p;

function setup() {
  createCanvas(1, 1);
  
  p = createP("");
  
  frameRate(1);
  
}

function draw() {
  //background(220);
    
  let c = random(96,123);
  c = round(c);
  c = char(c);
  //print(c);
  s = s + c;
  print(s);
  p.html(s);
}let ball;

function setup() {
  createCanvas(400, 400);

  // Two different ways to assign values to ball object
  
  // Version 1
//   ball.x = 10;
//   ball.y = 100;
//   ball.width = 50;
  
  // Version 2 - Using JSON
  ball = {
    x: 10,
    y: 100,
    width: 50
  };
}

function draw() {
  background(220);
  
  fill(mouseX);
  ellipse(ball.x, ball.y, ball.width, ball.width);
  //ball.x = random(0,width);
  ball.x = mouseY;  
}let s = "";
let paragraph;

function setup() {
  createCanvas(400, 400);
  
  paragraph = createP("");
  
  frameRate(1);
  
}

function draw() {
  //background(220);
  
  let x = random(width);
  let y = random(height);
  
  ellipse(x,y,50,50);
  
  let c = random(96,127);
  c = round(c);
  c = char(c);
  //print(c);
  s = s + c;
  //print(s);
	paragraph.html(s);
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
	
	line(0,0,200,200);

	push();
	translate(200, 200);
	rotate(radians(mouseX));
	line(0,0,200,200);
	pop();
	
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
print(char(random(127)));
}function setup() {
  createCanvas(400, 400);

  background(220);
  fill(0,0,255);
  stroke(255,0,0);
  ellipseMode(CORNER);
  ellipse(200,200,50,90);
  
  stroke(0);
  strokeWeight(10);
  rect(10,10,50,50);
  
  createP("My Name is Shawn);
  
  
}

function draw() {
  //background(220, 0, 0);
  /*
  adsf;laksdjf;lajksdfl;kj
  as;ldkfja;lskdjf
  */
}function setup() {
  createCanvas(0, 0);
	createElement('h1',"My name is Shawn");
	createP("I like code");
  createA("https://www.walking-productions.com/notslop/", "A link");
  createP("Code like I");
}

function draw() {
}function setup() {
  createCanvas(400, 400);
	
}

function draw() {
  background(220);
}var mic;
var reverb;
var fft;

function setup() {
  createCanvas(400, 400);
  
  fft = new p5.FFT();
  
  mic = new p5.AudioIn();
  mic.start();
  mic.connect();
  //reverb = new p5.Reverb();
  //mic.connect(reverb);
  //reverb.connect();
}

function draw() {
  background(220);
  
  var spectrum = fft.analyze();
  noStroke();
  fill(0,255,0); // spectrum is green
  for (var i = 0; i< spectrum.length; i++){
    var x = map(i, 0, spectrum.length, 0, width);
    var h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h )
  }  
  
  //var waveform = fft.waveform();
  
}var osc;

function setup() {
  createCanvas(400, 400);
  
 	osc = new p5.Oscillator();
  osc.setType('sine');
  osc.freq(550);
  osc.amp(1);
}

function mousePressed() {
  osc.start();    
}

function draw() {
  background(220);
  //freq = map(mouseY, 0, height, 0, 25000);
  //osc.freq(freq);
  //print(freq);
  
}var audioFile;

function preload() {
  audioFile = loadSound('test.mp3');  
}

function setup() {
  createCanvas(400, 400);
  audioFile.loop();
  //audioFile.play();
  //audioFile.setVolume(0.5);
}

function draw() {
  background(220);
  audioFile.setVolume(map(mouseY, 0, height, 0, 1));
  audioFile.rate(map(mouseX, 0, width, 0, 10));
}

function mousePressed() {
	audioFile.play();  
}

// noprotect

var capture;
var x = 50;
var y = 50;

function setup() {
  createCanvas(400, 400);
  
  capture = createCapture(VIDEO);
  capture.hide();
  
}

function draw() {
  background(220,50);
  image(capture, 0, 0);
  //tint(255,50);
    
  loadPixels();
  //for (var i = 0; i < pixels.length; i=i+4) {
    // Transpose colors
    // var r = pixels[i];
    // var b = pixels[i+2];
    // pixels[i] = b;
    // pixels[i+2] = r;
    
    // // Black and white
    // var r = pixels[i];
    // pixels[i+1] = r;
    // pixels[i+2] = r;
    
    // Threshold
    // var r = pixels[i];
    // if (r < mouseX) {
    //  pixels[i] = 0;
    //   pixels[i+1] = 0;
    //   pixels[i+2] = 0;
    // } else {
    //   pixels[i] = 255;
    //   pixels[i+1] = 255;
    //   pixels[i+2] = 255;
    // }

    
  //}

  // Track a brightness
  // var brvalue = brightness(get(mouseX,mouseY));
  // print(brvalue);
  
  var brightestX = 0;
  var brightestY = 0;
  var brightestBrightness = 0;
  for (var x = 0; x < width; x=x+4) {
    for (var y = 0; y < height; y=y+4) {
  		  //var brightvalue = brightness(get(x,y));
      	var brightvalue = pixels[(y*width+x)*4] + pixels[(y*width+x)*4+1] + pixels[(y*width+x)*4+2];
      	if (brightvalue > brightestBrightness) {
         	brightestX = x;
          brightestY = y;
          brightestBrightness = brightvalue;
        }
    }
  }
  ellipse(brightestX, brightestY, 50, 50);
  
  //updatePixels();
	
  //ellipse(x,y,50,50);

}var myVideo;

function setup() {
  createCanvas(400, 400);
  
  myVideo = createVideo("video.m4v");
  myVideo.hide();
}

function draw() {
  background(220);
  image(myVideo, 0, mouseY, 100, 100);
  if (mouseX > 0) {
	  myVideo.speed(floor(mouseX/(width/8)));
  }
  
}

function mousePressed() {
 myVideo.loop(); 
}

function mouseReleased() {
 myVideo.stop(); 
}var myImage;
var myOtherImage;

function preload() {
 myImage = loadImage('image.jpg'); 
  myOtherImage = loadImage('image1.jpg');
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  image(myOtherImage,0,0,width,height);
  tint(255, width-mouseX);
  
  image(myImage,0,0,width,height);
  tint(255, mouseX);
  
}var serial;
var dataArray = [];

function setup() {
  createCanvas(400, 400);
  
  serial = new p5.SerialPort(9600);
  serial.open("/dev/cu.usbmodem1421");
  serial.on('data',serialEvent);
  
}

function serialEvent() {
  var data = serial.readLine();
 	print(data); 
  var numData = int(data);
  if (numData > 0) {
	  dataArray.push(numData);
    
    if (dataArray.length > 100) {
     dataArray.shift();  // remove from beginning
    }
  }
  // background(255);
  // fill(0);
  // rect(10,height-numData,50,numData);
}

function draw() {
  background(220);
  
  //for (var i = 0; i < dataArray.length; i++)
  var p = 0;
  for (var i = dataArray.length - 1; i >= dataArray.length - 50; i--)
  {
  	// dataArray[i]
    rect(p*10,height-dataArray[i],10,dataArray[i]);
    p++;
  }
  
}var img;
var img2;

function preload() {
  img = loadImage('test.jpg');
  img2 = loadImage('test2.jpg');
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  image(img, 0, 0);
  tint(255, 128)
  
  image(img2, 0, 0);
  tint(255, 128);
  //blend(img2, 0, 0, 100, 100, 0, 0, 100, 100, DARKEST)
  
}

class MyImage {
 	constructor(imagePath) {
    // Load Image
  }
  
  setTransparency(value) {
    
  }
  
  drawImage() {
   	image(this.image, 
  	tint(255, this.transparency)
  }
  
}

var serial;
var currentNumber = 0;

function setup() {
  createCanvas(400, 400);
  
    serial = new p5.SerialPort();
  serial.open("/dev/cu.usbserial-A800evM8");
  serial.on('data', gotData);

}

function gotData() {
  var currentString = serial.readLine();  // read the incoming data
  if (Number(currentString) > 0)
  {
    currentNumber = Number(currentString);
    currentNumber = map(currentNumber, 0, 1024, 0, 255);
  	print(currentNumber);
  }
}

function draw() {
  background(currentNumber);
}var myfunball;

var xcoords = [0,10,100,230,40,50];
var ycoords = [90,100,10,230,40,50];
var currentcoord = 0;

var balls = [];

var ball0;
var ball1;
var ball2;
var ball3;

function setup() {
  createCanvas(400, 400);
  myfunball = new Ball(100, 100, 1, 1, 25, 0);

  for (var i = 0; i < 5; i++) {
		balls[i] = new Ball(random(50,100), random(50,100), random(-1,1), random(-1,1), random(10,20), random(0,255));
  }
  
//     ball0 = 
//   ball1 = new Ball(random(50,100), random(50,100), random(-1,1), random(-1,1), random(10,20), random(0,255));
//   ball2 = new Ball(random(50,100), random(50,100), random(-1,1), random(-1,1), random(10,20), random(0,255));
//   ball3 = new Ball(random(50,100), random(50,100), random(-1,1), random(-1,1), random(10,20), random(0,255));

// 	balls[0] = ball0;
//   balls[1] = ball1;
//   balls[2] = ball2;
//   balls[3] = ball3;
}

function draw() {
  background(220);
  
  myfunball.display();
  // ball0.display();
  // ball1.display();
  // ball2.display();
  // ball3.display();
  
  for(var i = 0; i < balls.length; i++) {
   balls[i].display(); 
  }
  
  rect(xcoords[currentcoord], ycoords[currentcoord], 50 ,50);
  if (currentcoord < xcoords.length - 1) {
    currentcoord++;
  } else {
    currentcoord = 0;
  }
  
}

function mousePressed() {
  var newball = new Ball(random(50,width-50), random(50,height-50), random(-1,1), random(-1,1), random(10,20), random(0,255));
  //balls[balls.length] = newball;
  balls.push(newball);
}

class Ball {
  constructor(xx, yy, xxdir, yydir, rr, cc) {
    this.x = xx;
    this.y = yy;
    this.xdir = xxdir;
    this.ydir = yydir;
    this.r = rr;
    this.c = cc;
  }
  
  move() {
  	this.x = this.x + this.xdir;
    this.y = this.y + this.ydir;
   
    if (dist(this.x, this.y, mouseX, mouseY) > 50) {
      if (this.x > mouseX) {
           this.xdir = -1; 
    	}
    	else {
     		this.xdir = 1; 
    	}
	    if (this.y > mouseY) {
  	   this.ydir = -1; 
    	} else {
				this.ydir = 1;
    	}
    }
//     if (this.x > width - this.r || this.x < 0 + this.r) {
//      this.xdir = this.xdir * -1; 
//     }
    
//     if (this.y > height - this.r || this.y < 0 + this.r) {
//     	this.ydir = this.ydir * -1;    
//     }
  }
  
  display() {
    this.move();
    fill(this.c);
  	ellipse(this.x, this.y, this.r * 2); 
  }
}var myfunball;
var ball0;
var ball1;
var ball2;
var ball3;

function setup() {
  createCanvas(400, 400);
  myfunball = new Ball(100, 100, 1, 1, 25, 0);

  ball0 = new Ball(random(50,100), random(50,100), random(-1,1), random(-1,1), random(10,20), random(0,255));
  ball1 = new Ball(random(50,100), random(50,100), random(-1,1), random(-1,1), random(10,20), random(0,255));
  ball2 = new Ball(random(50,100), random(50,100), random(-1,1), random(-1,1), random(10,20), random(0,255));
  ball3 = new Ball(random(50,100), random(50,100), random(-1,1), random(-1,1), random(10,20), random(0,255));


}

function draw() {
  background(220);
  
  myfunball.display();
  ball0.display();
  ball1.display();
  ball2.display();
  ball3.display();
}

class Ball {
  constructor(xx, yy, xxdir, yydir, rr, cc) {
    this.x = xx;
    this.y = yy;
    this.xdir = xxdir;
    this.ydir = yydir;
    this.r = rr;
    this.c = cc;
  }
  
  move() {
  	this.x = this.x + this.xdir;
    this.y = this.y + this.ydir;
    
    if (this.x > width - this.r || this.x < 0 + this.r) {
     this.xdir = this.xdir * -1; 
    }
    
    if (this.y > height - this.r || this.y < 0 + this.r) {
    	this.ydir = this.ydir * -1;    
    }
  }
  
  display() {
    this.move();
    fill(this.c);
  	ellipse(this.x, this.y, this.r * 2); 
  }
}var c = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  c++;
  print(c);

  /* Brute Force
  line(0, 10, width 10);
  line(0, 20, width 20);
  line(0, 30, width 30);
  */
  
  /* While loop
  var i = 0;
  while(i < mouseY) {
   	line(0, i, width, i);
    i = i + 10;
  }
  */

  /* For loop */
  for(var i = 0; i < mouseY; i = i + 10) {
   line(0,i,width,i); 
  }

}var serial;

var w = 200;

function setup() {
	serial = new p5.SerialPort();  
  serial.open("/dev/cu.usbmodem1421");
  serial.on('data', gotData);
  
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  ellipse(width/2, height/2, w);
  if (w > 500) {
		ellipse(width/2, height/2, w-200);    
  }
}

function gotData() {
	var serialData = serial.readStringUntil("\r\n");
  //print(serialData); 
  var lastW = w;
  w = Number(serialData);
  if (w <= 0) {
   w = lastW; 
  }
}

var x = 0;
var y = 0;

var Xdir = 1;
var Ydir = 1;

var rdir = 0;
var gdir = 0;
var bdir = 0;

//set color variables for balls
var myBall = {
  r : 100,
  g : 150,
  b : 200
};
    
var ellipseX = 110;
var ellipseY = 510;

var ellipseXDir = 5;
var ellipseYDir = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {  
  background(90,155,200);
  fill(myBall.r, myBall.g, myBall.b);
  ellipse(ellipseX,ellipseY,x,y); 
  
  //myBall.r = myBall.r + rdir;
  //myBall.g = myBall.g - gdir;
  //myBall.b = myBall.b + bdir;
  
  if (myBall.r >=255 && myBall.g >=255 && myBall.b >=255) {
    myBall.r = myBall.r - rdir;
    myBall.g = myBall.g - gdir;
    myBall.b = myBall.b - bdir;
  }
  
  if (myBall.r <=0 && myBall.g <=0 && myBall.b <= 0) {
    myBall.r = myBall.r + rdir;
    myBall.g = myBall.g + gdir;
    myBall.b = myBall.b + bdir; 
  }
  
  x = x + Xdir;
  y = y + Ydir;
    
  ellipseX = ellipseX + ellipseXDir;
  ellipseY = ellipseY + ellipseYDir;
  
  if (ellipseX >= width || ellipseX <= 0) {
    ellipseXDir = ellipseXDir * -1 + random(-2,2);
  }
  
  if (ellipseY >= height || ellipseY <= 0) {
		ellipseYDir = ellipseYDir * -1 + random(-2, 2); 
  } 

  if (y >= 500 && x >=500) {
    Xdir = -1;
    Ydir = -1;
	}
  
  if (y<0 && x<0) {
    Xdir = 1;
    Ydir = 1;
  } 
  print(x);
}var whichScreen = 0;

function setup() {
  createCanvas(400, 400);
}

function keyPressed() {
  whichScreen++;
}

function draw() {
  background(220);
	if (whichScreen == 0) {
    screen1();
  } else if (whichScreen == 1) {
    screen2();
  } else if (whichScreen == 2) {
   	screen3(); 
  } else {
   	whichScreen = 0; 
  }
    

}


function screen1() {
 background('white');
  text('My Fun Screen', width/2, height/2);
}

function screen2() {
  background('black');
  fill('white');
  ellipse(width/2, height/2, mouseX, mouseX);
  
}

function screen3() {
 background('white');
  fill('black');
  text('Bye Bye Bye', width/2, height/2);
}var buttonWasPressed = false

function setup() {
  createCanvas(400, 400);
}

function draw() {
  if (buttonWasPressed) {
  	background('blue');
  } else {
    background('white');
  }
	fill('red')
  ellipse(width/2,height/2,100,100)
}

function mousePressed(){
	var d = int(dist(200,200,mouseX,mouseY));
  print(d)
  if (d > 50) {
    buttonWasPressed = false;
  } else {
    buttonWasPressed = true;
  }
}var mouseWasClicked = false;

function setup() {
  createCanvas(400, 400);
  //frameRate(1);
}

function draw() {
  background(220);
  
  ellipse(width/2, height/2, 50, 50);
  
  if (mouseWasClicked) {
	  ellipse(0,0,100,100);  
  }
}

// Callback
function mousePressed() {
  if (mouseWasClicked) {
    mouseWasClicked = false;
  } else {
	  mouseWasClicked = true;
  }
}

function keyPressed() {
  print(keyCode);
  if (keyCode == 13) {
   fill('red'); 
  }
}

var serial;

var x = 0;
var y = 0;

var ellipseX = 200;
var ellipseY = 200;

var ellipseXDir = 10;
var ellipseYDir = 1;

function setup() {
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem1421");
  serial.on('error', gotError);
  serial.on('data', gotData);
  createCanvas(windowWidth, windowHeight);
}

function gotError(err) {
	print(err);  
}

function gotData() {
 	var something = serial.readStringUntil("[");
  print(something);
  ellipseX = Number(something);
}

function draw() {  
  background(0,255,0);
  
  stroke(255,0,0);
  strokeCap(SQUARE);
  line(x,y,20,30);
  
  stroke(0,0,255);
  fill(255,0,0);
  ellipse(ellipseX,ellipseY,100,100); 
  
  ellipseX = ellipseX + ellipseXDir;
  ellipseY = ellipseY + ellipseYDir;
  
  if (ellipseX >= width || ellipseX <= 0) {
    ellipseXDir = ellipseXDir * -1 + random(-2,2);
  }
  
  if (ellipseY >= height || ellipseY <= 0) {
		ellipseYDir = ellipseYDir * -1 + random(-2, 2); 
  } 
  
  //x = x + 1;
  // == equal
  // != does not equal
  if (x <= 350) {
    x = x + 3;
    y++;    
  }
  
}var capture;

function setup() {
  createCanvas(480, 120);
  capture = createCapture(VIDEO);
}

function draw() {
  image(capture, 0, 0, width, width * capture.height / capture.width);
  filter(INVERT);
}var c = null;

function setup() { 
  c = createCanvas(400, 400);
  getData();
} 

function getData() {
      httpGet("http://liveweb.itp.io:9090/send", 'json', false, 
              
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
    httpGet("http://liveweb.itp.io:9090/save?x="+mouseX+"&y="+mouseY, 'json', false, function(response) {});

  // }
}var data = [];

function setup() { 
  createCanvas(400, 400);
  getLatest();
} 

function draw() { 
  background(220);
  for (var i = 0; i < data.length; i++) {
    ellipse(data[i].x, data[i].y, 20, 20); 
  }
}

function getLatest() {
  httpGet("http://liveweb.itp.io:8999/data","json",false,
          function(response) {
        		console.log(response)
    				data = response;
    				setTimeout(getLatest,100)
  			},
        function() {
          console.log("bad")
        } 
	);
}

function mousePressed() {
 	ellipse(mouseX, mouseY, 20, 20);
  var data = {
    x: mouseX,
    y: mouseY
  };
  // SEnd to server
  // http get
  httpGet("http://liveweb.itp.io:8999/save?x="+mouseX+"&y="+mouseY,"json",false,function() {console.log("good");},function() {console.log("bad");} );

}var kinectron = null;
var x = 0;
var y = 0;

var bx = 0;
var by = 0;
var bxdir = 1;
var bydir = 1;

function setup() { 
  createCanvas(400, 400);
  
  kinectron = new Kinectron("10.17.117.136");
  kinectron.makeConnection();
  
	kinectron.startTrackedJoint(kinectron.HANDRIGHT, gotRightHand);

} 

function gotRightHand(hand) {
 console.log(hand);
  x = hand.depthX * width;
  y = hand.depthY * height;
}

function draw() { 
  background(220);
  ellipse(x, y, 50, 50);
  
  
  rectMode(CENTER);
  push()
  translate(bx,by);
  rotate(radians(25+frameCount));
  rect(0, 0, 50, 50);
  pop();
  
  bx = bx + bxdir;
  by = by + bydir;
  if (bx > width || bx < 0) {
   bxdir = bxdir * -1; 
  }
  
  if (by > height || by < 0) {
   bydir = bydir * -1; 
  }
  
  if (dist(bx, by, x, y) < 50) {
        fill(random(255),random(255),random(255));
		bx = x;
    by = y;
  }
  

  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
 background(0, 100, 200);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}// must be in HTTPS
function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log('starting');
	noStroke();
  // get position once
  if (!navigator.geolocation) {
    alert("navigator.geolocation is not available");
  }
  navigator.geolocation.getCurrentPosition(setPos);
}

function setPos(position) {
  console.log(position);
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  background(0);
  fill(255);
  textSize(32);
  text("Current position: " + nf(lat,2,2) + " " + nf(lng,2,2), 10, height/2);
  console.log(lat + " " + lng);
}
var bgColor;
var value = 0;


function setup() { 
  createCanvas(windowWidth, windowHeight);
  bgColor = color(255,255,255);
} 

function deviceTurned() {
  value = value + 10;
  if (value > 255) {
    value = 0;
  }
}


// // The device moved!
// function deviceMoved() {
//   var r = random(255);
//   var g = random(255);
//   var b = random(255);
//   bgColor = color(r, g, b);
// }

function draw() { 
  background(value);
  
  fill(255,0,0);
  
  for (var i = 0; i < touches.length; i++) {
      ellipse(touches[i].x, touches[i].y, 100, 100);
  }
  
  
  
}let video;

function setup() { 

  createCanvas(400, 400);
  pixelDensity(1);

  video = createCapture(VIDEO);
  video.hide();
} 

function draw() { 
  background(220);
  image(video,0,0,width,height);
//  image(video,mouseX,0,mouseX+mouseX,height);
  
  loadPixels();
  for (var w = 0; w < width; w++) {
    for (var h = 0; h < height; h++) {
      
      // Get the R, G, B
   		var r = pixels[4*((h*width) + w)];
   		var g = pixels[4*((h*width) + w) + 1];
   		var b = pixels[4*((h*width) + w) + 2];
      
      //Swap them
      pixels[4*((h*width) + w)] = b;
      pixels[4*((h*width) + w) + 2] = r;
      
      // If r is greater than the mouse position, make the video  black
      if (r > mouseX) { 
        pixels[4*((h*width) + w)] = 0;
        pixels[4*((h*width) + w) + 1] = 0;
        pixels[4*((h*width) + w) + 2] = 0;
      }
    }
  }
	updatePixels();
}let input;

function setup() { 
  createCanvas(400, 400);
  input = new p5.AudioIn();
  input.start();
} 

function draw() { 
  background(220);
  ellipse(width/2, height/2, input.getLevel()*1000,input.getLevel()*1000);
}let osc;

function setup() { 
  createCanvas(400, 1000);
  
	osc = new p5.Oscillator();
  osc.setType('sawtooth');
  osc.freq(550);
  osc.amp(1);
  osc.start();  
} 

function draw() { 
  background(220);
  // osc.freq(mouseY*20);
  // print(mouseY*20);
  
}let audio;
let level;


function preload() {
 audio = loadSound("test.mp3"); 
  
}

function setup() { 
  createCanvas(400, 400);

  level = new p5.Amplitude();
} 

function draw() { 
  background(220);
  
  var panValue = map(mouseX, 0, width, -1, 1);
  print(panValue);
  audio.pan(panValue);
  
  var speed = map(mouseY, 0, height, 0, 4);
  audio.rate(speed);  
  
  var vol = map(mouseY, 0, height, 0, 1);
  audio.amp(vol);
  
  if (!audio.isPlaying()) {
   audio.play(); 
  }
  
  fill(0,5);
  ellipse(width/2, height/2, level.getLevel()*1000, level.getLevel()*1000);
}

function mousePressed() {
 audio.play(); 
}var inputBox;
var inputButton;

var xdir = 0;
var x = 0;


function inputWasInput() {
  var city = inputBox.value();
  print(city);

  loadJSON("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=d21e79452f4461671f1ccf2a209d48c3", jsonLoaded);
}

function jsonNotLoaded(er) {
	console.log(er);
}

function jsonLoaded(newdata) {
  console.log(newdata);
  xdir = newdata.wind.speed;
}

function setup() { 
  createCanvas(400, 400);
  
  inputButton = createButton('load');
  inputButton.mouseClicked(inputWasInput);
  inputButton.position(150, 10);
  inputBox = createInput('New York');
  inputBox.position(10, 10);  
  
} 

function draw() { 
  background(220);

  ellipse(x, 100, 50, 50);
  x = x + xdir;
  if (x > width) { x = 0; }
}
function jsonNotLoaded(er) {
	console.log(er);
}

function jsonLoaded(newdata) {
  console.log(newdata);
}

function setup() { 
  createCanvas(400, 400);
  
	loadJSON("http://api.openweathermap.org/data/2.5/weather?q=New%20York&appid=d21e79452f4461671f1ccf2a209d48c3", jsonLoaded, jsonNotLoaded);
  //loadJSON("http://api.openweathermap.org/data/2.5/weather?q=New%20York&appid=d21e79452f4461671f1ccf2a209d48c3", jsonLoaded);
} 

function draw() { 
  background(220);
}
var xdir = 0;
var x = 0;
var thedata;

var inputBox;
var inputButton;

function preload() {
  thedata = loadJSON("http://api.openweathermap.org/data/2.5/weather?q=New%20York&appid=d21e79452f4461671f1ccf2a209d48c3");
}

function inputWasInput() {
  print("Loading..");  
  var city = inputBox.value();
  print(city);

	//loadJSON("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=d21e79452f4461671f1ccf2a209d48c3", jsonLoaded, jsonNotLoaded);
  loadJSON("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=d21e79452f4461671f1ccf2a209d48c3", jsonLoaded);

}

function jsonNotLoaded(er) {
	console.log(er);
}

function jsonLoaded(newdata) {
  console.log(newdata);
  console.log("New Wind Speed: " + newdata.wind.speed);
  thedata = newdata;
	xdir = thedata.wind.speed;
}

function setup() { 
  createCanvas(400, 400);
  
  inputButton = createButton('load');
  inputButton.mouseClicked(inputWasInput);
  inputButton.position(150, 10);
  inputBox = createInput('New York');
  inputBox.position(10, 10);  
  
  print(thedata.wind.speed);
  xdir = thedata.wind.speed;
} 

function draw() { 
  background(220);
  ellipse(x, 100, 50, 50);
  x = x + xdir;
  if (x > width) { x = 0; }
}
var name = "";

function setup() { 
  createCanvas(10, 10);
  createP("Click");
} 

function draw() { 
}

function callback(data) {
  print(data);
  name = data.name + " Van Every";
  createP(name);
}

function mousePressed() {
	loadJSON("https://uinames.com/api/?gender=male",callback); 
}var thepoem;

function preload() {
  thepoem = loadStrings("lines.txt");
}

function setup() { 
  createCanvas(400, 400);
  print(thepoem);
} 


var counter = 0;
function draw() { 
  background(220);
  text(thepoem[counter], 50,50);  
}

function mousePressed() {
  counter++;
}function setup() { 
  createCanvas(400, 400);
  loadJSON("https://itp.nyu.edu/~sve204/test.json",jsonLoaded);
} 

function jsonLoaded(thedata) {
 console.log(thedata); 
}

function draw() { 
  background(220);
}function setup() {
  var url = 'http://api.openweathermap.org/data/2.5/weather?q=NewYork,USA&APPID=d21e79452f4461671f1ccf2a209d48c3';
	loadJSON(url, drawWeather); 

  createCanvas(600, 400);
  noLoop();
}

function draw() {

}

function drawWeather(weather) {

  // Get the loaded JSON data
  console.log(weather); // inspect the weather JSON
  var humidity = weather.main.humidity; // get the main.humidity out of the loaded JSON
  console.log(humidity); // inspect the humidity in the console

  background(40, 90, 200);
  fill(0, 255, 255, humidity); // use the humidity value to set the alpha
  for (var i = 0; i < 50; i++) {
    ellipse(random(width), random(height), 30, 30);
  }
}
	
var whatever;

function setup() { 
  
  whatever = select("#theimage");
  console.log(whatever);
  
  whatever.mouseOver(mouseOverWhatever);
  whatever.mouseOut(mouseOutWhatever);
 	whatever.position(0,0);
  
  var cvs = createCanvas(whatever.width, whatever.height);
	cvs.position(0,0);  
} 

function mouseOverWhatever() {
  var thebody = select("body");
  thebody.style('background','purple');
}

function mouseOutWhatever() {
  var thebody = select("body");
  thebody.style('background','white');
  console.log("Here");
}

function mousePressed() {
 	whatever.hide(); 
}

function mouseReleased() {
 	whatever.show(); 
}


function draw() { 
  //background(220,0);
  ellipse(mouseX, mouseY, 10, 10);
}var canvas;
var coolDiv;

var button;

var x = 0;

function setup() { 
  canvas = createCanvas(500, 500);
  canvas.position(0,0);
  
 	button = createButton('click me');
  button.position(200, 19);
  button.mousePressed(buttonClicked);
  
} 

function buttonClicked() {
  coolDiv = select('#first');
  coolDiv.style("background-color","green");
  coolDiv.position(0,200);
  
  var otherDiv = select("#first");
  otherDiv.hide();
  
  x = x + 10;
}

function draw() { 
  background(0,0,0);
  fill(50);
  rect(x,0,100,100);
}let paddleW=60;
let paddleH=15;
let paddleX;
let paddleY;
let brickW=50;
let brickH=40;

//Create an empty array for bricks
bricks=[];

function setup() { 
  createCanvas(400, 400);
  //create a ball
  ball=new Ball();  
  for(var _x = 0; _x < width / brickW; _x++) {
  	for(var _y = 0; _y < (height / 2) / brickH; _y++) {
      bricks[_x] = bricks[_x] || [];
      bricks[_x][_y] = new Brick(_x, _y, brickW, brickH);
  	}
  }
}
  //create an array of bricks 
  
	// for (var i=0; i<8;i++){
	// for (var _x=0;_x<width;_x=_x+brickW){
	// for (var _y=0;_y<width/2;_y=_y+brickH){
	// // var _x=_x+brickW*i;
	// // var _y=_y+brickH*i;
	// bricks[i]=new Brick(_x,_y);
	// }
	// }
	// }


function draw() { 
   background(0,90);
  //draw the paddle
   drawPaddle();
  
  //create the bouncing ball
   ball.display();
   ball.move();
   ball.bounce()
  
  // drawBrick();
  for(var _x = 0; _x < width / brickW; _x++) {
  	for(var _y = 0; _y < (height / 2) / brickH; _y++) {
      
      if (dist(ball.x, ball.y, bricks[_x][_y].x, bricks[_x][_y].y) < 40) {
        bricks[_x][_y].show = false;
        ball.dobounce();
      }
      bricks[_x][_y].display();
      

  	}
  }
     // for (i=0;i<bricks.length;i++){
   // bricks[i].display();
   // }
  
  
	//Game Over if the ball doesn't hit paddle
  if (ball.y>height){
  	gameOver();
   }
}

function drawPaddle(){
  paddleX=mouseX;
  paddleY=height-paddleH;
  fill(255,150,9);
  noStroke();
  rect(paddleX,paddleY,paddleW,paddleH);
}


function drawBrick(){
   for (x=0;x<width;x=x+50){
     for (y=0;y<width/2;y=y+40){
       stroke(255);
       strokeWeight(6);
       
       fill(255,random(100,250),random(0,100));
     	 rect(x,y,brickW,brickH);
     }
	}
}
  
function gameOver(){
		background(0);
  	textSize(32);
  	textAlign(CENTER);
  	fill(255,80,80);
  	text("GAME OVER",width/2,height/2);
	}

// function mousePressed() {
//   draw();
// }var recta=[];

function setup(){
  createCanvas(600, 600)
  
  
  //for(var i=0; i<100; i++){
   var i = 0;
	for(var x = 0; x < width; x+=60){
    for(var y = 0; y < height; y+=60){
   
    recta[i] = new Rectangle(x,y,60,60,0)
      i++;
  }
}
  //}
  
}

function draw(){
	background(20)
  for(var i=0;i<recta.length; i++){
    push();
    recta[i].display();
    pop();
  
    //recta[i].move();
    
       
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
}class Ball {
 	constructor(imag) {
    this.img = imag;
    this.width = 100;
    this.height = 100;
   	this.x = random(width-this.width);
    this.y = random(height-this.height);
    this.xdir = random(-2,2);
    this.ydir = random(-2,2);
  }
  
  display() {
   //ellipse(this.x, this.y, this.width, this.height);
    image(this.img, this.x, this.y, this.width, this.height);
    if (this.x <= 0 || this.x >= width - this.width) {
     this.xdir *= -1; 
    }
    if (this.y <= 0 || this.y >= height - this.height) {
      this.ydir *= -1;
    }
    
    this.x += this.xdir;
    this.y += this.ydir;    
  }
  
  bounce() {
    this.xdir *= -1; 
    this.ydir *= -1;
  }
}

var balls = [];

var images = [];

function preload() {
  images[0] = loadImage("IMA-Sticker-coder-activist2.png");
  images[1] = loadImage("IMA-Sticker-Invent.png");
  images[2] = loadImage("IMA-Sticker-thinker-engineer2.png");
  images[3] = loadImage("IMA-Sticker-maker-artist2.png");
  images[4] = loadImage("IMA-Sticker2.png");

}

function setup() { 
  createCanvas(windowWidth, windowHeight);
  balls[0] = new Ball(images[0]);
  balls[1] = new Ball(images[1]);
  balls[2] = new Ball(images[2]);
  balls[3] = new Ball(images[3]);
  balls[4] = new Ball(images[4]);
} 

function draw() { 
  background(255);
  
  textSize(64);
  text("Welcome IMA 2023", width/2 - textWidth("Welcome IMA 2022")/2, height/2);
  
  for (var i = 0; i < balls.length; i++) {
   balls[i].display(); 
    // for (var j = i+1; j < balls.length; j++) {
    // if (dist(balls[i].x, balls[i].y, balls[j].x, balls[j].y)<this.width)
    // {
    // balls[i].bounce(); 
    //  balls[j].bounce();
    // }
    // }
  }
}var x;
var y;
var xdir = 1;
var ydir = 1;

var kinectron;
var ghand = null;

function setup() { 
  createCanvas(400, 400);
  x = 100;
  y = 100;
  
  kinectron = new Kinectron("172.16.224.234");
  kinectron.makeConnection();
  kinectron.startTrackedJoint(kinectron.HANDRIGHT, drawRightHand);
}

function drawRightHand(hand) {
  print(hand);
  ghand = hand;
}

function draw() { 
  background(0);
  
  if (ghand != null) {
	  fill(128,0,128);
  	ellipse(ghand.depthX * width, ghand.depthY * height, 10, 10);
    
    var distance = dist(ghand.depthX * width,  ghand.depthY * height, x, y);
    
    if (distance < 20) {
     	// WE caught it!
      x = ghand.depthX * width;
      y = ghand.depthY * height;
    }
    
  }
  
  
  
  fill(255,0,0);
  //ellipse(mouseX, x, mouseY, x);
  ellipse(x, y, 55, 55);
  
  x = x + xdir;
  y = y + ydir;
  //print(x);
  
  if (y > height) {
  	ydir = ydir * -1 + random(-1,1);
  }
  
  if (y < 0) {
    ydir = ydir * -1 + random(-1,1);
  }  
  
  if (x > width) {
  	xdir = xdir * -1 + random(-1,1);
  }
  
  if (x < 0) {
    xdir = xdir * -1 + random(-1,1);
  }
  
}
var x = 0;
var y = 0;

var xdir = 1;
var ydir = 1;

var ghand = null;

// Declare Kinectron
var kinectron = null;


function setup() { 
  createCanvas(400, 400);

  kinectron = new Kinectron("172.16.224.234");
  kinectron.makeConnection();

  // Request right hand and set callback for received hand
  kinectron.startTrackedJoint(kinectron.HANDRIGHT, drawRightHand);

} 

function drawRightHand(hand) {
  ghand = hand;
}

function draw() { 
  background(220);
  
  if (ghand != null) {
		ellipse(ghand.depthX * width, ghand.depthY * height, 50, 50);     
    
    if (dist(ghand.depthX * width, ghand.depthY * height, x, y) < 50) {
    	x =  ghand.depthX * width;
    	y = ghand.depthY * height;
    }
  }
  
  ellipse(x,y,10,10);
  x = x + xdir;
  y = y + ydir;
  if (x >= width || x <= 0) {
   xdir = xdir * -1;
  }
  if (y >= height || y <= 0) {
   ydir = ydir * -1; 
  }
}var x = 0;
var y = 0;

var xdir = 1;
var ydir = 1;

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  ellipse(x,y,10,10);
  x = x + xdir;
  y = y + ydir;
  if (x >= width || x <= 0) {
   xdir = xdir * -1;
  }
  if (y >= height || y <= 0) {
   ydir = ydir * -1; 
  }
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


	
  
function myFunStuff(locx, locy) {
 	// Do something fun
  for (var x = 0; x < 100; x = x + 10) {
    for (var y = 0; y < 100; y = y + 10) {
      fill(random(255));
	  	rect(locx + x, locy + y, 10, 10);
    }
  }
}

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  myFunStuff(mouseX, mouseY);
	myFunStuff(width - mouseX, height - mouseY);
  
  // for (var x = 0; x < width; x = x + 100) {
  //   for (var y = 0; y < height; y = y + 100) {
  //     myFunStuff(x, y);
  //   }
  // }
  
}var whichScreen = 0;

function startScreen() {
 	ellipse(width/2, height/2, 100, 100); 
  if (mouseIsPressed) {
   whichScreen = 1; 
  }
}

function playScreen() {
  myVideo.play();
 	if (mouseIsPressed) {
   	background(0); 
  } else {
    background(255);
  }
}

var myVideo;

function setup() { 
  createCanvas(400, 400);
  myVideo = createVideo("https://itp.nyu.edu/~sve204/liveweb_fall2017/video.mp4");
} 

function draw() { 
  if (whichScreen == 0) {
		startScreen();
  } else if (whichScreen == 1) {
	  playScreen();
  }
}function myFunStuff(locx, locy) {
 	// Do something fun
  for (var x = 0; x < 100; x = x + 10) {
    for (var y = 0; y < 100; y = y + 10) {
      fill(random(255));
	  	rect(locx + x, locy + y, 10, 10);
    }
  }
}

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  myFunStuff(mouseX, mouseY);
	myFunStuff(width - mouseX, height - mouseY);
  
  // for (var x = 0; x < width; x = x + 100) {
  //   for (var y = 0; y < height; y = y + 100) {
  //     myFunStuff(x, y);
  //   }
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

function success() {
  print("good");
}

function failure(evt) {
  console.log(evt);
  print("not so good");
}

function preload() {
	img=loadImage("", success, failure);
  
}

function setup() { 
  createCanvas(700, 700);
  
  
  
  
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

}var x2;
var y2;
var w;
var h;
var lx1=640;
var lx2=670;
var l1y=300;
var l2y=350;
var l3y=400;
var l4y=450;
var img;

function loadSuc(img) {
 print("Loading worked"); 
}

function loadFail() {
 print("Loading Failed"); 
}

function preload() {
  img =loadImage("hbo.jjpg.jpg", loadSuc, loadFail);
}

function setup() { 
  createCanvas(800, 700);
  
} 
  
  //var of button
var d = 50;
var state = false;
var channel1 =false;
var channel2=false;



function draw() {
  
  background(253, 237, 236);
  image = (img, 0, 0);
  frameRate(15);
  
  //TV Body
  // Body
  strokeWeight(10);
  fill(212, 230, 241)
	rect(200, 200, 500, 400, 50);
  
  //screen
  x2=225;
  y2=240;
  w=390;
  h=320;
  if (state) {
  stroke(10);
  fill(213, 216, 220);
	rect(x2,y2,w,h,50);
	} 
  else if (channel1){
  stroke(10);
  fill(87,45,136);
	rect(x2,y2,w,h,50);
  push();
  translate(width/2,height/2);
  noStroke();
	fill(255);
  textSize(128);
  text("ITP",-75,50);
  textSize(32);
	fill(0);
  text("NYU | TISCH",-70,100);
  pop();
  }
  else if (channel2){

  image(img,x2,y2,390,320);

  }

  else{
    push();
    translate(x2,y2);
    var delta=random(55,60);
    for (var y1=0+random(-2,2);y1<h;y1=y1+0.5){
    	for (var x1=5+random(-10,10);x1<(w-30);x1=x1+delta+5){
		stroke((x1+2),(255-x1*3),random(150,255),50);
    strokeWeight(2);
    line(x1,y1,x1+delta,y1);
    }
  }
    pop();
}
  
  

    
  // bottom

  strokeCap(ROUND);
  fill(212, 230, 241  );
  rect(290, 600, 250, 20, 20, 15, 10, 5);
  
  //top
  strokeWeight(10);
  fill(212, 230, 241  )
  arc(420, 204, 90, 80, 135, 135, OPEN);

  //top lines
  fill(230)
  line(520, 120, 415, 164);
  line(370, 120, 415, 164);
  
 //right lines

  line(lx1, l1y, lx2, l1y);
  line(lx1, l2y, lx2, l2y);
  line(lx1, l3y, lx2, l3y);
  line(lx1, l4y, lx2, l4y);
  
  
 // button
  fill(213, 216, 220)
  ellipse(655, 530, d, d);
  
  
  //button
  //if (mouseIsPressed&&dist(mouseX,mouseY,(lx1+lx2)/2,(l1y+l1y)/2)<15){

  //}
}


 // button function
  function mousePressed() {
  if (dist(mouseX, mouseY, 655, 530) < d/2) {
    state = !state;
  }
  else if (mouseX>=lx1&&mouseX<=lx2&&mouseY<=(l1y+5)&&mouseY>=(l1y-5)){
	  //state = !state;
    channel1 = !channel1;
  }
	else if (mouseX>=lx1&&mouseX<=lx2&&mouseY<=(l2y+5)&&mouseY>=(l2y-5)){
    channel2=!channel2;
  }
}

  

var numCircles = 0;

function setup() { 
  createCanvas(400, 400);
} 

function mousePressed() {
 numCircles++; 
}

function draw() { 
  background(220);
  
  // var i = 0;
  // while (i < 10) {
  //  	rect(i * 50, 0, 45, 45);
  //   i++;
  // }
  
  // Same as above loop
  // for (var i = 0; i < 10; i++) {
  //   rect(i * 50, 0, 45, 45);
  // }

  if (frameCount < 600) {
  
    var numCirclesDrawn = 0;
    for (var x = 0; x < width; x=x+50) {
      for (var y = 0; y < height; y=y+50) {
        //if (numCirclesDrawn < numCircles) {
          fill(x,y,frameCount%256);
          ellipse(x, y, 50, 50);
          numCirclesDrawn++;
        }
      }
    }

  } else {
  
	  fill(0);
    rectMode(CENTER);
  	rect(width/2, height/2, 100, 100);
  }
}var ball = {
	x: 0,
	y: 0,
	d: 0,
	xspeed: 10,
	yspeed: 10
};

var button = {
  x: 0,
  y: 0,
  d: 100
}



function setup() { 
  createCanvas(400, 400);

	ball.x = random(0, width);
	ball.y = random(0, height);
	ball.d = random(10, 30);
	
  button.x = width - button.d;
  button.y = height - button.d;
  
} 

// // THis triggered 1 time per press
// function mousePressed() {
//  // the code to do something 
// }

function draw() { 
  background(220);
  
  // Button
  rect(button.x, button.y, button.d, button.d);
  
  // if (mouseIsPressed && 
  //     mouseX > button.x && mouseX < button.x + button.d &&
  //    mouseY > button.y && mouseY < button.y + button.d) {
  // fill(0);
  // } else {
  // fill(255);
  // }
  
  // True always when mouse is down
  if (mouseIsPressed && 
      dist(mouseX, mouseY, button.x + button.d/2, button.y+ button.d/2) < button.d/2)
  {
   fill(0); 
  } else {

    fill(255); 
  }
	
	ellipse(ball.x, ball.y, ball.d);
	
	//ball.x = ball.x + ball.xspeed;
	ball.x += ball.xspeed;

	//ball.y = ball.y + ball.yspeed;
	ball.y += ball.yspeed;

	if (ball.x > width || ball.x < 0) {
		//ball.xspeed = ball.xspeed * -1;
		ball.xspeed *= -1;
	}
	
	if (ball.y > height || ball.y < 0) {
		//ball.yspeed = ball.yspeed * -1;
		ball.yspeed *= -1;
	}	

	// ball.yspeed = ball.yspeed + random(-1,1);
	
// 	if (ball.y < height) {
// 		ball.yspeed++;
// 	}
	
	// if (ball.x < 0) {
	// 	ball.xspeed = ball.xspeed * -1;
	// }
	
}var clicked = false; //boolean

var eonefifty = 150
var ethreefifty = 350
var eoneeightyfive = 185
var ethreefifteen = 315
var etwofifty = 250
// negatives
var eNonefifty = 150
var eNthreefifty = 350
var eNoneeightyfive = 185
var eNthreefifteen = 315
var eNtwofifty = 250

function setup() { 
  createCanvas(500, 500);
} 

function draw() { 
  background(0);

	// top
	fill(100,12,174);
	ellipse ( 250,eNonefifty,20);
	// bottom
	fill(150,14,35);
	ellipse ( 250,ethreefifty,20);
	// left
	fill(100,54,65);
	ellipse ( eNonefifty,250,20);
	// right
	fill(10,12,45);
	ellipse ( ethreefifty,250,20);
	// North West
	fill(55,13,12);
	ellipse ( eNoneeightyfive,eNoneeightyfive,20);
	// South East
	fill(11,34,12);
	ellipse ( ethreefifteen,ethreefifteen,20);
	// South West
	fill(17,24,56);
	ellipse ( eNoneeightyfive,ethreefifteen,20);
	// North East
	fill(9,23,78)
	ellipse ( ethreefifteen,eNoneeightyfive,20);

  if (clicked) {
    eonefifty++;
  ethreefifty++;
  eoneeightyfive++;
  ethreefifteen++;
  etwofifty++ 
// negatives
  eNonefifty = eNonefifty - 100
  eNthreefifty--
  eNoneeightyfive--
  eNthreefifteen--
  eNtwofifty--
  }
  
}

function mousePressed(){
  
  
	clicked = !clicked;  
  
}var ball1 = {
	x: 0,
	y: 0,
	d: 0,
	xspeed: 10,
	yspeed: 10
};

var ball2 = {
	x: 0,
	y: 0,
	d: 0,
	xspeed: 10,
	yspeed: 10
};

var ball3 = {
	x: 0,
	y: 0,
	d: 0,
	xspeed: 10,
	yspeed: 10
};

var ball4 = {
	x: 0,
	y: 0,
	d: 0,
	xspeed: 10,
	yspeed: 10
};

var circles = [];

function setup() { 
  createCanvas(400, 400);

	initBall(ball1);
	initBall(ball2);  
	initBall(ball3);
  
  circles[0] = ball1;
  circles[1] = ball2;
  circles[2] = ball3;
  
  initBall(ball4);
  circles[3] = ball4;
  
  
} 
  
function initBall(ball) {
  ball.x = random(0, width);
	ball.y = random(0, height);
	ball.d = random(10, 30); 
}

function displayBall(ball) {
	ellipse(ball.x, ball.y, ball.d);
}

function moveBall(ball) {
  //ball.x = ball.x + ball.xspeed;
	ball.x += ball.xspeed;

	//ball.y = ball.y + ball.yspeed;
	ball.y += ball.yspeed;
}

function checkBounds(ball) {
  if (ball.x > width || ball.x < 0) {
		//ball.xspeed = ball.xspeed * -1;
		ball.xspeed *= -1;
	}
	
	if (ball.y > height || ball.y < 0) {
		//ball.yspeed = ball.yspeed * -1;
		ball.yspeed *= -1;
	}	
}

function draw() { 
  background(220);
  
  for (var i = 0; i < circles.length; i++) {
		displayBall(circles[i]);
  	moveBall(circles[i]);
  	checkBounds(circles[i]);
  }
  
}var square;
var other;

function setup() { 
  createCanvas(400, 400);
  
  // JSON - JavaScript Object Notation
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
    h: random(0,50)
  };
  
} 

function draw() { 
  //background(220);
  
  ellipse(mouseX, mouseY, 20, 20);
  
  square.x++;
  other.x--;
  
  rect(square.x, square.y, square.w, square.h);
	rect(other.x, other.y, other.w, other.h);
}
var x, y;

var square


function setup() { 
  createCanvas(400, 400);
  
  //frameRate(60);
  
  x = random(0,width);
  y = random(0, height);
} 

function draw() { 
  background(220);
  
  fill(mouseY,mouseX,random(200-255));
  
  x = map(mouseX, 0, width, 0, 100);
  
	y = mouseY;
  
  rect(x, y, mouseX, mouseX);
  //x++;
  //y++;
  //x = x + random(-2, 2);
  //y = y + random(-2, 2);
}function setup() { 
  
  createCanvas(400, 400);
  background('purple');
  line(10, 10, 100, 100);
  //fill(0,255,0);  
  noFill();
  ellipse(100, 100, 40);
} 

function draw() { 

  /*
  	Everything here is a comment
    and not code  
  */
  
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}var things = [
	"artist", "designer", "engineer", "creative technologist",
  "interactive artist", "hacker", "leader", "new media maker",
  "new media artist", "emerging media maker",
  "technologist", "creative", "activist", "teacher",
  "founder", "director", "entrepreneur",
  "user experience designer", "researcher",
  "maker", "media maker", "interaction designer",
  "3D artist", "augmented reality designer",
  "creative director",
  "VR filmmaker", "interactive sound designer",
  "fabricator", "interactive designer", "human centered designer"
];

//var ima = "ima";
var ima = "I'm a";
var invent_yourself = "invent yourself";
var at_ima = "with IMA";
var introducing = "Introducing ITP's new Interactive Media Arts program";
var link = "https://itp.nyu.edu/ima";
// var c;

// var tColorR = 61;
// var tColorG = 24;
// var tColorB = 121;
// var tSize = 32;
// var tLineSpacing = 35;
// var tStartX = 10;
// var tStartY = 50;

var flipDelay = 100;
var count = 0;
var thing = "";

var p, p1, p2;

function setup() { 
  // c = createCanvas(600, 200);
  
// for (var p = 0; p < things.length; p++) {
//   print(things[p]);
// }
  
  p = createP("");
  p.style('margin-bottom', "0px");
  p.style('padding-bottom', "3px");
  p.style('color',"#3E1879");
  p.style('font-size',"32px");
  p.style('text-align', "center");
  p.style('font-family', "Verdana,sans-serif");  
  
  p1 = createP("");
  p1.style('color',"#3E1879");
  p1.style('font-size',"42px");
  p1.style('text-align', "center");
  p1.style('font-family', "Verdana,sans-serif");
  p1.style('font-weight', "bold");
  p1.style('margin-top', "0px");
  p1.style('padding-top', "3px");
  p1.style('margin-bottom', "0px");
  p1.style('padding-bottom', "3px");

  // p1.style('background-color', "#000000");
  
  p2 = createP("");
  p2.style('margin-top', "0px");
  p2.style('padding-top', "3px");
  p2.style('color',"#3E1879");
  p2.style('font-size',"30px");
  p2.style('text-align', "center");
  p2.style('font-family', "Verdana,sans-serif");
} 

function draw() { 
// 	var x = tStartX;
//   var y = tStartY;
  
  if (count % flipDelay === 0) {
  	thing = random(things);
  }
  count++;
  
//   c.background(255);
  
//   c.textSize(tSize);
//   fill(tColorR, tColorG, tColorB);

// 	c.text(ima + " " + thing.toUpperCase(), x, y);
//   y += tLineSpacing;
//   c.text(invent_yourself + " " + introducing, x, y);
  p.html(ima);
  p1.html(thing.toUpperCase());
  p2.html(invent_yourself + " " + at_ima);
}var kinectron = null;
var bgimage = null;

var trackedBodies = [];

var x = 0;
var y = 0;
var xdir = 1;
var ydir = 2;

function setup() { 
  createCanvas(400, 400);
  
//   loadImage("Outer_Space.jpg",
//             function(loadedImage) {
//     bgimage = loadedImage;
//   });
  
  kinectron = new Kinectron("128.122.151.98");
  kinectron.makeConnection();
  //kinectron.startColor(gotImage);
  //kinectron.startInfrared(gotImage);
  //kinectron.startKey(gotImage);
  //kinectron.startTrackedJoint(kinectron.HANDRIGHT, drawRightHand);
  //kinectron.startTrackedJoint(kinectron.HANDLEFT, drawLeftHand);
  kinectron.startTrackedBodies(gotBody);
}

function gotBody(body) {
	var found = false;
	for (var t = 0; t < trackedBodies.length; t++) {
		if (trackedBodies[t].bodyIndex == body.bodyIndex) {
			trackedBodies[t] = body;
			found = true;
		}
	}
	if (found == false) {
		trackedBodies.push(body);
	}
}

function drawLeftHand(hand) {
  //background(0);
  fill(0,0,255);
  ellipse(hand.depthX * width, hand.depthY * height, 50, 50);
}

function drawRightHand(hand) {
  //background(0);
  fill(255,0,0);
  ellipse(hand.depthX * width, hand.depthY * height, 50, 50);
}

function gotImage(theimage) {
	//console.log(theimage); 
  loadImage(theimage.src, function(loadedImage) {
    image(bgimage, 0, 0);
    image(loadedImage, 0, 0);
  });
}

function draw() { 
  /*
 	background(0);

  fill(255,0,0);
	ellipse(x, y, 100, 100);
  x = x + xdir;
  y = y + ydir;
  
  if (x >= width || x <= 0) {
   xdir = xdir * -1; 
  }
  
  if (y >= height || y <= 0) {
   ydir = ydir * -1; 
  }

  */
  fill(255,0,0);
  
	for (var t = 0; t < trackedBodies.length; t++) {		
		body = trackedBodies[t];
		//for (var i = 0; i < body.joints.length; i++) {
          fill(255, 0, 255);

			ellipse(body.joints[11].depthX * width,
							body.joints[11].depthY * height,
							10, 10);
      
    fill(255, 0, 0);
    			ellipse(body.joints[7].depthX * width,
							body.joints[7].depthY * height,
							10, 10);
    
        fill(255, 255, 0);
    			ellipse(body.joints[15].depthX * width,
							body.joints[15].depthY * height,
							10, 10);
    
            fill(0, 255, 0);
    			ellipse(body.joints[19].depthX * width,
							body.joints[19].depthY * height,
							10, 10);
    
    if (dist(body.joints[11].depthX * width,
							body.joints[11].depthY * height,
    					body.joints[7].depthX * width,
							body.joints[7].depthY * height) < 10) {
    fill(0);
    rect(0,0,width,height);
  }
    
      // if (dist(x, y, body.joints[i].depthX * width, body.joints[i].depthY * height) < 50) {
      //   x =  body.joints[i].depthX * width;
      //   y = body.joints[i].depthY * height;
      //   xdir = 0;
      //   ydir = 0;
      //   break;
      // }
		//}
	}
}var kinectron = null;
var bgimage = null;

var trackedBodies = [];

var x = 0;
var y = 0;
var xdir = 1;
var ydir = 2;

function setup() { 
  createCanvas(400, 400);
  
//   loadImage("Outer_Space.jpg",
//             function(loadedImage) {
//     bgimage = loadedImage;
//   });
  
  kinectron = new Kinectron("128.122.151.98");
  kinectron.makeConnection();
  //kinectron.startColor(gotImage);
  //kinectron.startInfrared(gotImage);
  //kinectron.startKey(gotImage);
  //kinectron.startTrackedJoint(kinectron.HANDRIGHT, drawRightHand);
  kinectron.startTrackedBodies(gotBody);
}

function gotBody(body) {
	var found = false;
	for (var t = 0; t < trackedBodies.length; t++) {
		if (trackedBodies[t].bodyIndex == body.bodyIndex) {
			trackedBodies[t] = body;
			found = true;
		}
	}
	if (found == false) {
		trackedBodies.push(body);
	}
}

function drawRightHand(hand) {
  background(0);
  fill(0,0,255);
  ellipse(hand.depthX * width, hand.depthY * height, 50, 50);
}

function gotImage(theimage) {
	//console.log(theimage); 
  loadImage(theimage.src, function(loadedImage) {
    image(bgimage, 0, 0);
    image(loadedImage, 0, 0);
  });
}

function draw() { 
 	background(0);

  fill(255,0,0);
	ellipse(x, y, 100, 100);
  x = x + xdir;
  y = y + ydir;
  
  if (x >= width || x <= 0) {
   xdir = xdir * -1; 
  }
  
  if (y >= height || y <= 0) {
   ydir = ydir * -1; 
  }

  
  fill(255);
  
	for (var t = 0; t < trackedBodies.length; t++) {		
		body = trackedBodies[t];
		for (var i = 0; i < body.joints.length; i++) {
			ellipse(body.joints[i].depthX * width,
							body.joints[i].depthY * height,
							10, 10);
      
      if (dist(x, y, body.joints[i].depthX * width, body.joints[i].depthY * height) < 50) {
        x =  body.joints[i].depthX * width;
        y = body.joints[i].depthY * height;
        xdir = 0;
        ydir = 0;
        break;
      }
		}
	}
}var kinectron = null;
var bgimage = null;

function setup() { 
  createCanvas(400, 400);
  
  loadImage("Outer_Space.jpg",
            function(loadedImage) {
    bgimage = loadedImage;
  });
  
  kinectron = new Kinectron("128.122.151.98");
  kinectron.makeConnection();
  //kinectron.startColor(gotImage);
  //kinectron.startInfrared(gotImage);
  kinectron.startKey(gotImage);
}

function gotImage(theimage) {
	//console.log(theimage); 
  loadImage(theimage.src, function(loadedImage) {
    image(bgimage, 0, 0);
    image(loadedImage, 0, 0);
  });
}

function draw() { 
  //background(0);
}var lines = [];

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  for (var i = 1; i < lines.length; i++)
  {
    line(lines[i-1].x, lines[i-1].y, lines[i].x, lines[i].y);
  }
}

function mousePressed() {
	var line = {x: mouseX, y: mouseY};
  lines.push(line);
}var helloVar;
var goodbyeVar;
var button;
var on = false;

var capture;

function setup() { 
  createCanvas(200,200);
  
  //video = createVideo("http://www.");
  
  capture = createCapture(VIDEO);
  capture.hide();
  
  helloVar = select("#helloDiv");
  helloVar.style("font-size","100px");
  
  goodbyeVar = select("#goodbyeDiv");
  goodbyeVar.style("font-size", "10px");

  button = createButton('click me');
	button.mousePressed(mouseWasPressed);
} 

function draw() { 
  background(220); 
  
  
  if (on) {
	  fill(255);
	  rect(10,10,100,100);

    image(capture, 0, 0, width, width*capture.height/capture.width);
  	filter(INVERT);
	
  }
}

function mouseWasPressed() {
  on = true;
  
  helloVar.style("font-size","10px");
  goodbyeVar.style("font-size", "100px"); 
}

var result = 5 + 5;
var name = "Shawn";

var x = 0;
var y = 0;

// direction of x movement
var xdir = 1.89;
// direction of y movement
var ydir = 3;

var lastMouseX = 0;
var lastMouseY = 0;


function setup() { 
  createCanvas(400, 400);
  //fill(0,0,0);
  fill(255,0,0);
  stroke(0,0,255);
} 

function draw() { 
  
  background(220);
  
  if (mouseIsPressed) {
	  line(lastMouseX, lastMouseY, mouseX, mouseY);
  	lastMouseX = mouseX;
  	lastMouseY = mouseY;
  }
  
  ellipse(x,y,50,50);
  x = x + (xdir * (width - mouseX)/100);
  y = y + ydir;
  
  if (y > height || y < 0) {
    ydir = ydir * -1; 
  }
  
  if (x > width || x < 0) {
   	xdir = xdir * -1; 
  }    
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}//noprotect

var video;

function setup() { 
  pixelDensity(1);
  createCanvas(400, 400);
  
  video = createCapture(VIDEO);
  video.hide();
  
} 

function draw() { 
  var redestPixelX = 0;
  var redestPixelY = 0;
  var redestValue = 0;
  
  background(260);
  image(video,0,0,width,height);
  loadPixels();
  for (var y = 0; y < height/2; y++) {
	  for (var x = 0; x < width/2; x++) {
    	//var current = get(x, y);
      var r = pixels[4 * (y*width + x)];
			var g = pixels[4 * (y*width + x) + 1];      
			var b = pixels[4 * (y*width + x) + 2];      
  
      set(x, y, [b, g, r, 255]); 
      
      if (r > redestValue) {
       	redestValue = r;
        redestPixelX = x;
        redestPixelY = y;
      }
      

//       var red = current[0];
//       var blue = current[2];
//       current[0] = blue;
//       current[2] = red;
//       set(x,y,current);
    }
  }
  updatePixels();
  
  ellipse(redestPixelX, redestPixelY, 20,20);
}var soundfile;
var filter;

function preload() {
  soundfile = loadSound("test.mp3");
  filter = new p5.LowPass();

}

function setup() { 
  createCanvas(400, 400);
    soundfile.loop();
  
  print(soundfile.frames());

} 

function draw() { 
  background(220);
	//soundfile.rate(map(mouseX,0,width,-2,2));
  var freq = map(mouseX, 0, width, 20, 10000);
  filter.freq(freq);
  // give the filter a narrow band (lower res = wider bandpass)
  //filter.res(50);
}

function mousePressed() {
 	//soundfile.play(); 
}var capture;

function setup() {
  var cnv = createCanvas(480, 120);
  capture = createCapture(VIDEO);
  //capture.hide();
}

function draw() {
  image(capture, 0, 0, 480, 120);
 	loadPixels(); 
  for (var w = 0; w < width; w++) {
    for (var h = 0; h < height; h++) {
   		var r = pixels[4 * (h*width + w)];
			var g = pixels[4 * (h*width + w) + 1];      
      
      //set(w, h, [0, 0, r, g]); 
    }
  }
  updatePixels();
  
}var kinectron = null;
var htmlImage = null;

function setup() {
	createCanvas(500, 500);
  fill(255);
  
  // Point to your kinectron IP (this one is in the microstudio)
	kinectron = new Kinectron('kinectron',{host: '172.16.230.74', port: 9001, path: '/'});
	kinectron.makeConnection();
	//kinectron.startTrackedBodies(gotBodies);
  kinectron.startRGB(rgbCallback);

  //htmlImage = createElement("img");
  
  
}

function draw() {
	ellipse(50,50,50,50);
}

function rgbCallback(rgbImage) {
	//console.log(rgbImage.src);
  //htmlImage.elt.src = rgbImage.src;
  //console.log(rgbImage);
	loadImage(rgbImage.src, function(loadedImage) {
	 image(loadedImage, 0, 0);
	 });  
}

function gotBodies(body) {
  background(0);
  console.log(body);

  var regularX = body.joints[kinectron.HANDRIGHT].depthX;
  var regularY = body.joints[kinectron.HANDRIGHT].depthY;

  rect(regularX, regularY, 20, 20);
}



var Player = function(_x, _y, _xdir, _ydir) {
  this.x = _x;
  this.y = _y;
  this.xdir = _xdir;
  this.ydir = _ydir;
  this.col = color(255);
  this.diam1 = 50;
  this.diam2 = 30;

  this.changeColor = function() {
    this.col = color(255, 0, 0);

  }; // End of change color function


  this.display = function() {

    //Player Base
    stroke(20);
    fill(this.col);
    ellipse(this.x, this.y, this.diam1, this.diam1);

    //Player Top
    stroke(20);
    fill(20, 20, 20);
    ellipse(this.x, this.y, this.diam2, this.diam2);
  

  }; // End of display function
  
  

  this.intersects = function(other) {
    var d = dist(this.x, this.y, other.x, other.y);
    if (d < this.diam1 + other.diam) {
      println("true");
      return true;
    } else {
      // println("false");
      return false;
    } 
  };// End of intersection function

}

function Barrier(_x,_y) {
	
  this.x = random(0,width);
  this.y = -5;
  this.speedx = 0; // speed in the x direction
	this.speedy = 5; // speed in the y direction
	this.col = color(random(0,255), random(0,255), random(0,255)); //unique color  
  this.diam = random(5,15);
	

  this.display = function(_r,_g,_b) {  
    noStroke();
    fill(color(_r,_g,_b));
  	ellipse(this.x, this.y, this.diam, this.diam);
    
  };

  
  this.move = function() {
  	this.y = this.y + this.speedy;

    if (this.y > height) 
    {
    	this.y = -5;
    } 
  }; // end of move

} // end of constructor




var player1;
var barriers = [];
var speedy = 5;

// create a wall object
// each wall object will store an array of bricks

// inside the wall's draw method, loop through the array of bricks
// and draw each brick

// inside the main draw loop, loop through the array of walls and
// call each wall's draw method.


function setup() {
    
  createCanvas(600, 600);

  player1 = new Player(300, 500, 1, 1);
  
  
  for(var i = 0; i < 10 ; i++){
    var r = new Barrier(random(width), -5, 5, 5); // generate a circle;
		barriers.push(r); //add it to the array.
	}
  
}

function draw() {
  background(255, 255, 240);

  player1.display();

  for (var b = 0; b < barriers.length; b++) {
    if (player1.intersects(barriers[b])) {
          player1.changeColor();
      break;
    }
  }  
    
  if (keyIsDown(LEFT_ARROW)) {
    player1.x-=5;
  }  
  
  if (keyIsDown(RIGHT_ARROW)) {
    player1.x+=5;
  }

	for (var i = 0; i < barriers.length; i++)
  {
    barriers[i].display();
    barriers[i].move();    
  }
  
}//noprotect
var video;
var slider;

var imgToSave;

function setup() { 
  createCanvas(400, 400);
  video=createCapture(VIDEO);
  video.size(320,240);
  video.hide();
  
  imgToSave = createImage(320,240);
  
  move=createP("Move");
  move.position(50,20);
  move.id('Move');
  
  slider = createSlider(2,20,20);
  slider.position(50,300);
  //slider.size(280);
 	slider.style("width","280px");
  
  background(0,0,0);
} 

function mousePressed() {
	println("mousePressed");
  //imgToSave.loadPixels();
  imgToSave.copy(video, 0, 0, 320, 240, 0, 0, 320, 240);
  imgToSave.updatePixels();
}

function draw() { 
  var a = slider.value();
	image(video,40,40);
  tint(255,255,255,a);
  image(imgToSave, 0, 0);
}var searchname;

function setup() { 
  createCanvas(400, 400);
  println("here is something");

  searchname = createInput("Enter Search Term");
  searchname.position(10,10);
  searchname.changed(loadProjects);
} 

function loadProjects() {
	println(searchname.value());
  loadJSON("https://itp.nyu.edu/ranch/api/projects-finder/"+searchname.value(), projectsLoaded);
}

function projectsLoaded(projectsJson) {
	//println(w);
	for (var i = 0; i < projectsJson.length; i++) {
		println(projectsJson[i].name);

	} 
}

function draw() { 
}
var w = null;
var cityname;

function setup() { 
  createCanvas(400, 400);

  cityname = createInput("Enter a city");
	cityname.position(10,10);
  cityname.changed(loadWeather);
} 

function loadWeather() {
	println("Loading: " + cityname.value());
  loadJSON("http://api.openweathermap.org/data/2.5/weather?q="+ cityname.value() + "&appid=d21e79452f4461671f1ccf2a209d48c3&units=imperial", jsonLoaded);	
}

function jsonLoaded(loadedContent) {
	w = loadedContent;
	for (var i = 0; i < w.length; i++) {
		println(w.main.temp);
	} 
}

function draw() { 
  if (w != null) {
  	background(w.main.temp, 0, 0);
  }
}
var w = null;
var cityname;

function setup() { 
  createCanvas(400, 400);

  cityname = createInput("Enter a city");
	cityname.position(10,10);
  cityname.changed(loadWeather);
} 

function loadWeather() {
	println("Loading: " + cityname.value());
  loadJSON("http://api.openweathermap.org/data/2.5/weather?q="+ cityname.value() + "&appid=d21e79452f4461671f1ccf2a209d48c3&units=imperial", jsonLoaded);	
}

function jsonLoaded(loadedContent) {
	w = loadedContent;
	for (var i = 0; i < w.length; i++) {
		println(w.main.temp);
	} 
}

function draw() { 
  if (w != null) {
  	background(w.main.temp, 0, 0);
  }
}
var w = null;
var cityname;

function setup() { 
  createCanvas(400, 400);

  cityname = createInput("Enter a city");
	cityname.position(10,10);
  cityname.changed(loadWeather);
} 

function loadWeather() {
	println("Loading: " + cityname.value());
  loadJSON("http://api.openweathermap.org/data/2.5/weather?q="+ cityname.value() + "&appid=d21e79452f4461671f1ccf2a209d48c3&units=imperial", jsonLoaded);	
}

function jsonLoaded(loadedContent) {
	w = loadedContent;
	for (var i = 0; i < w.length; i++) {
		println(w.main.temp);
	} 
}

function draw() { 
  if (w != null) {
  	background(w.main.temp, 0, 0);
  }
}
function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}var weather;

function setup() { 
  createCanvas(400, 400);
  weather = loadJSON("http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=d21e79452f4461671f1ccf2a209d48c3&units=imperial");

} 

function draw() { 
  background(220);
}

function mousePressed() {
 println(weather); 
}var poemlines;
var currentLine = 0;

function stringsLoaded(lines) {
	poemlines = lines; 
  for (var i = 0; i < poemlines.length; i++) {
	  println(poemlines[i]);  
  }
}

function setup() { 
  createCanvas(400, 400);  

  poemlines = loadStrings(
    "poem.txt",
    stringsLoaded
  	);
  
  frameRate(1);
} 

function draw() { 
  background(220);
  text(poemlines[currentLine],10,height/2);
  
  if (currentLine < poemlines.length) {
    currentLine++;
  } else {
   	currentLine = 0; 
  }
}
function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}var myCanvas = null;
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

	kinectron = new Kinectron('kinectron',{host: 'kinectron.itp.tsoa.nyu.edu', port: 9001, path: '/'});
  //kinectron = new Kinectron();
	kinectron.makeConnection();
	kinectron.startTrackedBodies(bodyTracked);
}

function draw() {

}

function bodyTracked(body) {
  background(0, 20);

  kinectron.getJoints(drawJoint); 
  kinectron.getHands(drawHands);
}

// Draw skeleton
function drawJoint(joint) {
  fill(100);
  ellipse(joint.depthX * myCanvas.width, joint.depthY * myCanvas.height, 15, 15);
  
  fill(200);
  ellipse(joint.depthX * myCanvas.width, joint.depthY * myCanvas.height, 3, 3);
}

// Draw hands
function drawHands(hands) {
	
	//check if hands are touching 
  if ( (Math.abs(hands.leftHand.depthX - hands.rightHand.depthX) < 0.01) && (Math.abs(hands.leftHand.depthY - hands.rightHand.depthY) < 0.01)) {
  	hands.leftHandState = 'clapping';
  	hands.rightHandState = 'clapping';
  }

  // draw hand states
  updateHandState(hands.leftHandState, hands.leftHand);
  updateHandState(hands.rightHandState, hands.rightHand);
}

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

function drawHand(hand, handState, color) {
 
  if (handState === 1) {
    state = 'ascending';
  }
  
  if (handState === 0 ) {
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
  ellipse(hand.depthX * myCanvas.width, hand.depthY * myCanvas.height, diameter, diameter);  
}var myCanvas = null;
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

	kinectron = new Kinectron('kinectron',{host: 'kinectron.itp.tsoa.nyu.edu', port: 9001, path: '/'});
  //kinectron = new Kinectron();
	kinectron.makeConnection();
	kinectron.startTrackedBodies(bodyTracked);
}

function draw() {

}

function bodyTracked(body) {
  background(0, 20);

  kinectron.getJoints(drawJoint); 
  kinectron.getHands(drawHands);
}

// Draw skeleton
function drawJoint(joint) {
  fill(100);
  ellipse(joint.depthX * myCanvas.width, joint.depthY * myCanvas.height, 15, 15);
  
  fill(200);
  ellipse(joint.depthX * myCanvas.width, joint.depthY * myCanvas.height, 3, 3);
}

// Draw hands
function drawHands(hands) {
	
	//check if hands are touching 
  if ( (Math.abs(hands.leftHand.depthX - hands.rightHand.depthX) < 0.01) && (Math.abs(hands.leftHand.depthY - hands.rightHand.depthY) < 0.01)) {
  	hands.leftHandState = 'clapping';
  	hands.rightHandState = 'clapping';
  }

  // draw hand states
  updateHandState(hands.leftHandState, hands.leftHand);
  updateHandState(hands.rightHandState, hands.rightHand);
}

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

function drawHand(hand, handState, color) {
 
  if (handState === 1) {
    state = 'ascending';
  }
  
  if (handState === 0 ) {
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
  ellipse(hand.depthX * myCanvas.width, hand.depthY * myCanvas.height, diameter, diameter);  
}var mycapture;

function setup() { 
  createCanvas(400, 400);
  
  mycapture = createCapture(VIDEO);
  mycapture.hide();
} 

function draw() { 
  background(220);
  
	image(mycapture,0,0, 400, 400);  
 //   filter(GRAY);
  
  //copy(mycapture, 0,0,400,400/2, 0, 400/2, 400, 400);

}var canvas;
var div;
var themaindiv;
var divhidden = false;

var mybutton;
var myslider;

var backcolor = 0;

function setup() { 
  canvas = createCanvas(100, 100);
	canvas.position(100, 0);
	
	mybutton = createButton("Don't Press Me!");
	mybutton.position(200,200);
	mybutton.mousePressed(theyPushed);
	
	myslider = createSlider(0, 255, 100);
	myslider.position(200, 250);
	myslider.changed(sliderChanged);
	myslider.style("transform", "rotate(90deg)");
	
	div = createDiv("Here is a new div, that I am creating with JavaScript");
	div.style("font-size", "200px");
	div.mousePressed(pressedMainDiv);
	
	themaindiv = select("#main");
	themaindiv.style("font-size", "100px");
	// themaindiv.mousePressed(pressedMainDiv);
	println("I am here");
} 

function sliderChanged()
{
	println(myslider.value());
	backcolor = myslider.value();
}

function theyPushed()
{
		var thebody = select('body');
		thebody.style('background-color', "red");
}

function pressedMainDiv() {
	println("This is running");
	if (!divhidden) {
		themaindiv.hide();	
		divhidden = true;
	} else {
		themaindiv.show();
		divhidden = false;
	}
}

function draw() { 
  background(myslider.value());
}var Ball = function(_x, _y) {
 	this.x = _x;
  this.y = _y;
  this.xdir = random(-1,1);
  this.ydir = random(-1,1);
  
  this.size = 50;
  
  this.contains = function(testX, testY) {
   
    if (dist(testX, testY, this.x, this.y) < this.size/2) {
     	return true; 
    }
    
    return false;
  }
  
  this.draw = function() {
		ellipse(this.x, this.y, this.size, this.size); 
  };
  
  this.move = function() {
  	 this.x += this.xdir;
     this.y += this.ydir;
    
    if (this.x <= 0 || this.x >= width) {
      this.xdir *= -1;
    }
    
    if (this.y <= 0 || this.y >= height) {
      this.ydir *= -1;
    }

  };
}

var Racket = function (_x, _y) {
 	this.x = _x;
  this.y = _y
}

var theballs = [];
var eep;

var removedCount = 0;

function setup() { 
  createCanvas(400, 400);
  
  for (var i = 0; i<5; i++) {
    var aball = new Ball(random(width), random(height));
   theballs.push(aball);
  }
  
  eep = new Racket(50,50);
} 

function draw() { 
  background(220);
  
  for (var i = 0; i<theballs.length; i++) {
    theballs[i].move();
    theballs[i].draw();
  }  
    
  // Draw Racket
  ellipse(eep.x, eep.y, 50, 50);
  line(eep.x, eep.y, eep.x+100, eep.y+100);


  
}



function mousePressed() {
  // var aball = new Ball(mouseX,mouseY);
  //  theballs.push(aball);
  
  var removedOne = false;
  
  for (var i = 0; i<theballs.length; i++) {
		if (theballs[i].contains(mouseX, mouseY)) {
     var beginning = subset(theballs, 0, i);
     var end = subset(theballs, i+1);
      theballs = concat(beginning, end);
      removedOne = true;
      removedCount++;
    }
  }  
  
 if (!removedOne) {
   for (var something = 0; something < removedCount+1; something++) {
     	var newball = new Ball(mouseX, mouseY);
      theballs.push(newball);
   }
   removedCount = 0;
 }
  
  
  
}







var Ball = function(_x, _y) {
 	this.x = _x;
  this.y = _y;
  this.xdir = random(-1,1);
  this.ydir = random(-1,1);
  
  this.draw = function() {
		ellipse(this.x, this.y, 50, 50); 
  };
  
  this.move = function() {
  	 this.x += this.xdir;
     this.y += this.ydir;
    
    if (this.x <= 0 || this.x >= width) {
      this.xdir *= -1;
    }
    
    if (this.y <= 0 || this.y >= height) {
      this.ydir *= -1;
    }

  };
}

var Racket = function (_x, _y) {
 	this.x = _x;
  this.y = _y
}

var aball;
var bball;
var eep;

function setup() { 
  createCanvas(400, 400);
  aball = new Ball(width/2, height/2);
  bball = new Ball(10,10);
  eep = new Racket(50,50);
} 

function draw() { 
  background(220);
  
  aball.move();
  bball.move();
  
	aball.draw();
  bball.draw();
  
  // Draw Racket
  ellipse(eep.x, eep.y, 50, 50);
  line(eep.x, eep.y, eep.x+100, eep.y+100);
  
  
  
}var Ball = function(_x, _y, _xdir, _ydir) {
 	this.x = _x;
  this.y = _y;
  this.xdir = _xdir;
  this.ydir = _ydir;
  
  this.draw = function() {
  	ellipse(this.x, this.y, 50, 50);
  };
  
  this.move = function() {
    this.x = this.x + this.xdir;
    this.y += this.ydir;
    if (this.x >= width || this.x <= 0) {
     this.xdir *= -1; 
    }
    if (this.y >= height || this.y <= 0) {
     this.ydir *= -1; 
    }
        
    //console.log(this.x);
  };
  
};

/* Almost the same
var dosomething = function() {
  
};

function dosomething() {
  
}
*/

var Racket = function (_x, _y) {
 	this.x = _x;
  this.y = _y;

  this.draw = function() {
 		ellipse(this.x, this.y, 50, 50);
  	line(this.x, this.y, this.x+100, this.y+100);
	};
  
}

var aball;
var bball;
var eep;

function setup() { 
  createCanvas(400, 400);
  aball = new Ball(width/2, height/2, 1, 1);
  bball = new Ball(10,10, 2, 2);
  eep = new Racket(50,50);
} 

function draw() { 
  background(220);
  
  // Move ball
  aball.move();
  
  // Draw ball
  aball.draw();
	bball.draw();
  
  // Draw Racket
  eep.draw(); 
}/*
Serial read and animate example

Reads an ASCII-encoded string from a seiral port via a webSocket server.
Animates the text on the screen with the received value

You can use this with the included Arduino example called AnalogReadSerial.
Works with P5 editor as the socket/serial server, version 0.5.5 or later.

written 2 Oct 2015
by Tom Igoe
*/

// Declare a "SerialPort" object
var serial;
// fill in the name of your serial port here:
var portName = "/dev/cu.usbmodem1421";
var textXpos = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // make an instance of the SerialPort object
  serial = new p5.SerialPort();

  // Get a list the ports available
  // You should have a callback defined to see the results. See gotList, below:
  serial.list();

  // Assuming our Arduino is connected,  open the connection to it
  serial.open(portName);

  // When you get a list of serial ports that are available
  serial.on('list', gotList);

  // When you some data from the serial port
  serial.on('data', gotData);
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

// Called when there is data available from the serial port
function gotData() {
  var currentString = serial.readLine();  // read the incoming data
  trim(currentString);                    // trim off trailing whitespace
  if (!currentString) return;             // if the incoming string is empty, do no more
  //console.log(currentString);
  if (!isNaN(currentString)) {  // make sure the string is a number (i.e. NOT Not a Number (NaN))
    textXpos = currentString;   // save the currentString to use for the text position in draw()
  }
}

function draw() {
  background(255,255,255);
  fill(0,0,0);
  text("sensor value: " + textXpos, textXpos, 30);
}// Declare a "SerialPort" object
var serial;
var latestData = "waiting for data";  // you'll use this to write incoming data to the canvas

var tenData = [];

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
  tenData.push(latestData);
  if (tenData.length > 10) {
   tenData.shift(); 
  }
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
  var avData = 0;
  var totData = 0;
  for (var i = 0; i < tenData.length; i++) {
    totData = totData + tenData[i];
	}
  avData = totData/tenData.length;

  
  var data = map(avData, 0, 255, 0, height);
  ellipse(50, data, 50, 50);
  text(data, 10, 10);
}var state = 0;

// var x = 102;
// var y = 102;
// var d = 100;
// var xdir = 1;
// var ydir = 1;

var ball = {
	x: 202,
  y: 202,
  d: 100,
  xdir: 1,
  ydir: 1, 
  strokeWeight: 5,
  fillColor: 'green'
};

var ball2 = {
	x: 102,
  y: 102,
  d: 100,
  xdir: 1,
  ydir: 2,  	
  strokeWeight: 0,
  fillColor: 'blue'
  
};

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  
  if (state == 0) {
	  drawIntro();
  } else if (state == 1) {
   	drawMiddle(); 
  }
}

function drawIntro() {
  	text("Push your mouse", 50,50);
}

function drawMiddle() {
	drawBall(ball);
	drawBall(ball2);
  
  if (checkCollision(ball, ball2)) {
   	// bounce 
    bounce(ball);
    bounce(ball2);
  }
  
  //drawBall(100, 200, 10);
  //drawBall(0, 100, 50);
}

function drawBall(_ball) {
  moveBall(_ball);
  checkBounce(_ball);
  strokeWeight(_ball.strokeWeight);
  fill(_ball.fillColor);
  ellipse(_ball.x, _ball.y, _ball.d, _ball.d);
  
}

function checkCollision(ball1, ball2) {
 	if (dist(ball1.x, ball1.y, ball2.x, ball2.y) <  ball1.d/2 + ball2.d/2) {
   	return true; 
  } else {
   	return false; 
  }
  
}


function moveBall(_ball) {
 	  _ball.x = _ball.x + _ball.xdir;
  	_ball.y = _ball.y + _ball.ydir;
}

function checkBounce(_ball) {
	if (_ball.x < 0 || _ball.x > width) {
  	_ball.xdir *= -1;
  }
  
  if (_ball.y < 0 || _ball.y > height) {
  	_ball.ydir *= -1;
  }
}

function bounce(_ball) {
  _ball.xdir *= -1;
  _ball.ydir *= -1;
}



function mousePressed() {
  state++;
}var state = 0;

var x = 102;
var y = 102;
var d = 100;
var xdir = 1;
var ydir = 1;

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  
  if (state == 0) {
	  drawIntro();
  } else if (state == 1) {
   	drawMiddle(); 
  }
}

function drawIntro() {
  	text("Push your mouse", 50,50);
}

function drawMiddle() {
	drawBall(x, y, d);
  xdir = checkBounce(xdir, x, width);
  ydir = checkBounce(ydir, y, height);
  x = moveBall(x,xdir);
  y = moveBall(y,ydir);
  
  drawBall(100, 200, 10);
  drawBall(0, 100, 50);
}

function drawBall(_x, _y, _d) {
   	ellipse(_x, _y, _d, _d);
}

function moveBall(val, dir) {
 	  val += dir; 	
	  return val;
}

function checkBounce(dir, val, max) {
   if (val > max || val < 0) {
   	dir *= -1; 
  }
  
  return dir;
}



function mousePressed() {
  state++;
}var x = 100;
var y = 100;
var r = 100;
var xdir = 1;
var ydir = 1;

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
	
	ellipse(x,y,r,r);
	x = x + xdir;
	y = y + ydir;
	
	if (x+r/2 > width || x-r/2 < 0) {
		xdir = xdir * -1;	
	}
	
	if (y-r/2 < 0 || y+r/2 > height) {
		ydir *= -1;	
	}
	
	
}// From: http://10print.org/

var x = 0;
var y = 0;

function setup() {
  createCanvas(400, 400);
  background(255);
}

function draw() {

  if (random(1) > 0.5) {
    line(x, y, x+20, y+20);
  } 
  else {
    line(x, y+20, x+20, y);
  }

  x += 20;
  if (x > width) {
    x = 0;
    y += 20;
  }

  if (y > height) {
    background(255);
    x = 0;
    y = 0;
  }
}var currentscreen = 0;

var x = 10;
var y = 10;

function setup() { 
  createCanvas(windowWidth, windowHeight);
} 

function draw() { 
  background(220);
  
  fill(200,0,155);
  rectMode(CENTER);
  rect(width/2, height/2, 100, 50);
  fill(0);
  textAlign(CENTER);
  
  if (currentscreen == 0) {
      text("Click Me", width/2, height/2);
  }
  else if (currentscreen == 1) {
  	ellipse(x,y,50,50);  
    
  } else if (currentscreen == 2) {
  	
    text("Bye bye", 100, 100, 100, 100); 
  } else if (currentscreen == 3) {
    
    text("Hello again", 100, 100, 100, 100);
  } else if (currentscreen == 4) {
   	
    fill('RED'); 
    rect(0,0,width,height);
  } else if (currentscreen == 5) {
   
    for (var linex = 0; linex < width; linex = linex + mouseX) {
     	line(linex, 0, linex, height); 
    }
    
    
  }

  
}

function mouseClicked() {
	if ((mouseX > width/2 - 50) && (mouseX < width/2 + 50) && (mouseY > height/2 - 25) && (mouseY < height/2 + 25)) {
  	console.log("You clicked");
    
   currentscreen++;
    
  } 
}



var bees = [];
//var bee = {x: 50, y: 50, h: 100, w: 100};

function setup() { 
  createCanvas(400, 400);
  
  for (var i = 0; i < 100; i++) {
   bees[i] = {x: random(0,width), y: random(0, height), w: random(20,50), h: random(20, 50)}; 
  }
  
} 

function draw() { 
  background(220);
  
//  bee.x = mouseX;
  
    for (var i = 0; i < bees.length; i++) {
   		
      ellipse(bees[i].x, bees[i].y, bees[i].h, bees[i].w);
  		
      ellipse(bees[i].x, bees[i].y, bees[i].h/2, bees[i].w/2);
      
      bees[i].x = bees[i].x + random(-1,1);
      
  }
  
  
    
}function setup() { 
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
} 

function draw() { 
  background(220);
  
  push();
  translate(width/2,height/2);
  
  var mouseRadians = radians(mouseX);
  rotate(mouseRadians);
  
  //rotate(radians(mouseX));
  
  rect(0,0,100,100);
  pop();
  
  ellipse(width/2,height/2,10,10);
  
  curve(-width*2,0,0,mouseY/2,0,mouseY/2,-width*2,height);
}
var x = 90;
var y = 80;


function setup() { 
  createCanvas(600, 400);
  
  frameRate(10);
} 

function draw() { 
  background(80,190,250);
  
  noStroke();
  fill (111,173,6)
	ellipse(320,165,170,175)
  
  noStroke();
  fill (91,140,6)
	ellipse(320,175,170,175)
  
	noStroke();
  fill (111,173,6)
	ellipse(320,185,170,175)
  
   noStroke();
  fill (91,140,6)
	ellipse(320,195,170,175)

  fill(111,173,6)
  triangle(470,160,470,240,400,200)
  
  fill(91,140,6)
  triangle(450,171,450,191,470,180)
  
  fill(91,140,6)
  triangle(450,191,450,211,470,200)
  
  fill(91,140,6)
  triangle(450,210,450,229,470,220)
  
  fill(91,140,6)
  triangle(430,200,430,218,450,210)
  
  fill(91,140,6)
  triangle(430,182,430,200,450,190)
  
  fill(91,140,6)
  triangle(415,191,415,210,430,200)
  
  fill(80,190,250)
  triangle(520,160,520,240,455,200)
  
  noStroke();
  fill (240,96,96)
	ellipse(320,200,195,175)
  
  noStroke();
  fill (241,123,123)
	ellipse(310,200,195,175)

	noStroke();
  fill (240,96,96)
	ellipse(300,200,195,175)
  
  noStroke();
  fill (241,123,123)
	ellipse(290,200,195,175)
  
  noStroke();
  fill (240,96,96)
	ellipse(280,200,190,175)
  
   noStroke();
  fill (241,123,123)
	ellipse(270,200,185,175)
  
//Bubbles
  drawBubble(x,y);
  y= y-1;
  x = x + random(-2,1);
  // drawBubble(70,170);
  // drawBubble(100,270);
  //  drawBubble(100,200);
  // drawBubble(200,270);
  // drawBubble(300,270);

  
//Eyes
  stroke(0, 0, 0);
	strokeWeight(1);
  fill (255,255,255)
	ellipse(200,170,50,50)
  
  stroke(0, 0, 0);
	strokeWeight(1);
  fill (255,255,255)
	ellipse(235,170,50,50)
  
  noStroke();
  fill (64,143,229)
	ellipse(225,180,25,25)
  
  noStroke();
  fill (64,143,229)
	ellipse(190,180,25,25)
  
  noStroke();
  fill (0,0,0)
	ellipse(190,180,10,10)
  
  noStroke();
  fill (0,0,0)
	ellipse(225,180,10,10)
  
  noStroke(0, 0, 0)
  fill (255,255,255)
	ellipse(240,240,40,30)
	
  noStroke(0, 0, 0)
  fill (241,123,123)
	ellipse(240,225,40,30)
  
  
  noStroke(0, 0, 0)
  fill (111,173,6)
	ellipse(355,225,80,50)
  
  noStroke(0, 0, 0)
  fill (91,140,6)
	ellipse(345,225,80,50)
  
  noStroke(0, 0, 0)
  fill (111,173,6)
	ellipse(335,225,80,50)
  
   noStroke(0, 0, 0)
  fill (241,123,123)
	ellipse(315,220,65,60)

}

function drawBubble(x,y) {
  
  noStroke();
  fill (80,210,250)
	ellipse(x,y,60,60)
  
  noStroke();
  fill (200,250,250)
	ellipse(x-5,y-12,30,20)
  
  noStroke();
  fill (80,210,250)
	ellipse(x-5,y-9,35,15)  
  
  
}

// Declare global variable
var x;
var y;
var colorr = 1;
var colorg = 1;
var colorb = 1;

function setup() { 
  createCanvas(windowWidth, windowHeight);
	
	// Assign values to the variables
	x = random(width);
	y = random(height);
	
	colorMode(RGB);
	noStroke();
	
} 

function draw() { 
  //background(220);
		colorr = colorr + random(-25,25);
		colorg = colorg + random(-25,25);
		colorb = colorb + random(-25,25);

	fill(colorr, colorg, colorb);
	
//	x = random(width);
//	y = random(height);
	x = x+random(-2,2);
	y = y+random(-2,2);
	
	ellipse(x,y,50,50);
	
}// Declare global variable
var x;
var y;

function setup() { 
  createCanvas(400, 400);
	
	// Assign values to the variables
	
} 

function draw() { 
  var mousePos = map(mouseX, 0, width, 0, 255);
	console.log(mousePos);
  background(mousePos,mouseY,100);
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  
  // Left Ear
  fill("RED");
  ellipse(100,100,100,150);
  fill("BLUE");
	ellipse(105,105,60,110);
  fill("RED");
  ellipse(110,110,40,90);
  fill("BLUE");
	ellipse(115,115,20,70);
  
  // Right Ear
  fill("BLUE");
	ellipse(300,100,100,150);
  
  // Head
  fill("WHITE");
  ellipse(200,100,100,100);

  // Left Eye
  fill("RED");
  ellipse(180,90,20,30);
  
  fill("BLUE");
  // Right Eye
  ellipse(220,90,20,30);
  
  // Antenna
  noFill();
  arc(210, 25, 50, 50, 0, HALF_PI);
	arc(190, 25, 50, 50, 0, HALF_PI);
	arc(170, 30, 50, 50, 0, HALF_PI);
  
  // Mouth
  arc(200, 100, 50, 70, 20, PI/4*3);
  
	fill("WHITE");
  // Neck
  rect(190,150,20,30);
  
  // Torso
  fill("BLUE");
  rect(175,170,50,100);
  fill("RED");
  rect(180,175,40,90);
  fill("BLUE");
  rect(185,180,30,80);
  fill("RED");
  rect(190,185,20,70);
  
}

//Whatever I want


function setup() { 
  createCanvas(500, 200);
} 

function draw() { 
  background(200,0,255);
	ellipseMode(CORNER);
	//noFill();
	fill(255,0,0);
	noStroke();
	ellipse(0,0,50,50);
}