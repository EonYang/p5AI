var myX;
var myY;
var starCount = 13;
var stars = [];
var selected = [];
var selIndex = 0;

function setup() {
  createCanvas(375, 667);
  
  for(var i=0;i<starCount;i++){
  	stars[i] = new Star(random(40,350),random(40, 630), random(3,10));
  }
  
  
}

function draw() {
  background(31,31,31);
  noFill();
  strokeWeight(0.7);
  stroke(100);
  rect(12.8, 13, 350, 642);
  
  drawStars();
  drawLines();
}

function drawLines() {
  if(selIndex>1)
    for(var i=0;i<=selIndex;i+=1) {
      var pair1 = selected[i];
      var pair2 = selected[i+1];
      if(pair1 && pair2)
      	line(pair1[0],pair1[1],pair2[0],pair2[1]);
    }
}
function drawStars() {
	stars.forEach(star => {
  	star.display();
    star.detectHit();
  });
}

function Star(x, y, size) {
  this.colors = [100,100,100];
  this.ripples = [];
  this.rippleCount = 0;
  this.size = size;
  this.originalSize = size;
  this.starX = x;
  this.starY = y;
  
  this.myIndex = 0;
  this.selected = false;
  this.connected = false;
  
  this.display = function() {
    if(!this.connected){
       if(selIndex > this.myIndex && this.selected){
          this.connected = true;
         	this.onHit();
      }
    }
    if(this.connected) {
       fill([223, 187, 140], 255);
    		ellipse(this.starX, this.starY, 13, 13);
    }else{
      fill(this.colors, 255);
      ellipse(this.starX, this.starY, this.size, this.size);
    }
    
    this.ripples.forEach(ripple => {
      ripple.display();
    })
  }
  
  this.detectHit = function() {
    if(dist(mouseX,mouseY,this.starX,this.starY) < 15) {
    	this.colors = [223, 187, 140];
      this.size = 13;
      if(!this.selected) {
      	this.selected = true;
        this.myIndex = selIndex;
        selected[selIndex++] = [this.starX, this.starY];
      }
    }else{
    	this.size = this.originalSize;
      this.colors = [100,100,100];
    }
  }
  
  this.onHit = function() {
  	 if(this.rippleCount < 3) {
    		let ripple1 = new Ripple(this.starX+random(-10,10), this.starY+random(-10,10), this.size-10);
       let ripple2 = new Ripple(this.starX+random(-10,10), this.starY+random(-10,10), this.size-10);
       let ripple3 = new Ripple(this.starX+random(-10,10), this.starY+random(-10,10), this.size-5);
       	ripple1.display();
       ripple2.display();
       ripple3.display();
       this.ripples[this.rippleCount++] = ripple1;
       this.ripples[this.rippleCount++] = ripple2;
       this.ripples[this.rippleCount++] = ripple3;
     }else {
      	this.rippleCount = 0; 
     }
  }
  
	
  
  
}

function Ripple(x, y, size) {
  this.colors = [random(255), random(255), random(255)];
  this.size = size;
  this.ripX = x;
  this.ripY = y;
  
  this.display = function() {
    fill(this.colors, 255);
  	ellipse(this.ripX, this.ripY, this.size, this.size);
    if(this.size > 11) {
    	this.size = 0;
    }
    
    if(this.size > 1) {
      this.size += 0.5; 
    }
  }
  
}


function handleMouse() {
  
}var myX;
var myY;
var starCount = 13;
var stars = [];
var selected = [];
var selIndex = 0;

function setup() {
  createCanvas(375, 667);
  
  for(var i=0;i<starCount;i++){
  	stars[i] = new Star(random(40,350),random(40, 630), random(3,10));
  }
  
  
}

function draw() {
  background(31,31,31);
  noFill();
  strokeWeight(0.7);
  stroke(100);
  rect(12.8, 13, 350, 642);
  
  drawStars();
  drawLines();
}

function drawLines() {
  if(selIndex>1)
    for(var i=0;i<=selIndex;i+=1) {
      var pair1 = selected[i];
      var pair2 = selected[i+1];
      if(pair1 && pair2)
      	line(pair1[0],pair1[1],pair2[0],pair2[1]);
    }
}
function drawStars() {
	stars.forEach(star => {
  	star.display();
    star.detectHit();
  });
}

function Star(x, y, size) {
  this.colors = [100,100,100];
  this.ripples = [];
  this.rippleCount = 0;
  this.size = size;
  this.originalSize = size;
  this.starX = x;
  this.starY = y;
  
  this.myIndex = 0;
  this.selected = false;
  this.connected = false;
  
  this.display = function() {
    if(!this.connected){
       if(selIndex > this.myIndex && this.selected){
          this.connected = true;
         	this.onHit();
      }
    }
    if(this.connected) {
       fill([223, 187, 140], 255);
    		ellipse(this.starX, this.starY, 13, 13);
    }else{
      fill(this.colors, 255);
      ellipse(this.starX, this.starY, this.size, this.size);
    }
    
    this.ripples.forEach(ripple => {
      ripple.display();
    })
  }
  
  this.detectHit = function() {
    if(dist(mouseX,mouseY,this.starX,this.starY) < 15) {
    	this.colors = [223, 187, 140];
      this.size = 13;
      if(!this.selected) {
      	this.selected = true;
        this.myIndex = selIndex;
        selected[selIndex++] = [this.starX, this.starY];
      }
    }else{
    	this.size = this.originalSize;
      this.colors = [100,100,100];
    }
  }
  
  this.onHit = function() {
  	 if(this.rippleCount < 1) {
    		let ripple = new Ripple(this.starX, this.starY, this.size);
       	ripple.display();
       this.ripples[this.rippleCount++] = ripple;
     }else {
      	this.rippleCount = 0; 
     }
  }
  
	
  
  
}

function Ripple(x, y, size) {
  this.colors = [random(255), random(255), random(255)];
  this.size = size;
  this.ripX = x;
  this.ripY = y;
  
  this.display = function() {
    fill(this.colors, 255);
  	ellipse(this.ripX, this.ripY, this.size, this.size);
    if(this.size > 30) {
    	this.size = 0;
    }
    
    if(this.size > 3) {
      this.size += random(2); 
    }
  }
  
}


function handleMouse() {
  
}var myX;
var myY;
var starCount = 13;
var stars = [];
var selected = [];
var selIndex = 0;
var zodiacNames = [
   "TAURUS","LIBRA","ARIES"
]
var zodiacSet = [
  [131.31, 178.57, 60.32, 240.95, 179.48, 263.92, 195.11, 319.28, 161.57, 339.44, 195.11, 319.28, 176.49, 362.53, 206.26, 356.44, 198.51, 375.37, 214.11, 435.92, 267.53, 493.33, 308.02, 340.49],
  [197.82, 211.59, 104.97, 255.57, 280.9, 272.68, 123.95, 349.92, 114.26, 420.83, 78.37, 435.02, 261.07, 417.72, 269.02, 449.87],
  [82, 408, 113, 384, 68, 318, 196, 254, 264, 266, 300, 299]
];
var zodiacIndex = 0;

var colorSet = [[239,233, 224, 50],[202,176,122, 50],[253,253,253, 30],[221, 213, 183, 30],[228, 228, 228, 50]]

function setup() {
  createCanvas(375, 667);
  zodiacIndex = Math.floor(random(0,zodiacSet.length));
  var starCount = zodiacSet[zodiacIndex].length;
  for(var i=0;i<starCount;i+=2){
  	stars[i] = new Star(zodiacSet[zodiacIndex][i],zodiacSet[zodiacIndex][i+1], random(3,10));
  }
  
}

function draw() {
  background(31,31,31,80);
  noFill();
  strokeWeight(0.5);
  stroke(98, 93, 70); 
  rect(13.5, 13.5, 350, 642);
  stroke(115, 107, 94);
  rect(17.5, 17.5, 341.5, 633);
  stroke(78, 67, 48);
  rect(22, 22, 332, 624);


  
  drawLines();
  drawStars();
  drawText();
  
}

function drawText() {
  fill(172, 170, 157);
 	text(zodiacNames[zodiacIndex], 168, 50);
}

function mouseClicked() {
  
}
  
function drawLines() {
  
  // if (mouseIsPressed) {
  //   this.starX = mouseX;
  // 	this.starY = mouseY;
  // }
  
  if(selIndex>1)
    for(var i=0;i<=selIndex;i+=1) {
      var pair1 = selected[i];
      var pair2 = selected[i+1];
      if(pair1 && pair2)
      	line(pair1[0],pair1[1],pair2[0],pair2[1]);
    }
}
function drawStars() {
	stars.forEach(star => {
  	star.display();
    star.detectHit();
  });
}

function Star(x, y, size) {
  this.colors = [100,100,100];
  this.ripples = [];
  this.rippleCount = 0;
  this.size = size;
  this.originalSize = size;
  this.starX = x;
  this.starY = y;
  
  this.myIndex = 0;
  this.selected = false;
  this.connected = false;
  
  this.display = function() {
    if(!this.connected){
       if(selIndex > this.myIndex && this.selected){
          this.connected = true;
         	this.onHit();
      }
    }
    this.ripples.forEach(ripple => {
      ripple.display();
    })
    
    
    if(this.connected) {
      fill([223, 187, 140], 255);
    	ellipse(this.starX, this.starY, 11, 11);
    }else{
      fill(this.colors, 255);
      ellipse(this.starX, this.starY, this.size, this.size);
    }
    
    
  }
  
  this.detectHit = function() {
    if(dist(mouseX,mouseY,this.starX,this.starY) < 15) {
    	this.colors = [223, 187, 140];
      this.size = 11;
      if(!this.selected) {
      	this.selected = true;
        this.myIndex = selIndex;
        selected[selIndex++] = [this.starX, this.starY];
      }
    }else{
    	this.size = this.originalSize;
      this.colors = [100,100,100];
    }
  }
  
  this.onHit = function() {
  	 if(this.rippleCount < 5) {
    		let ripple = new Ripple(this.starX, this.starY, this.size);
       	ripple.display();
       this.ripples[this.rippleCount++] = ripple;
     }else {
      	this.rippleCount = 0; 
     }
  }
  
	
  
  
}

function Ripple(x, y, size) {
  this.colors = colorSet[Math.floor(random(5))];
  this.size = size;
  this.original = size;
  this.ripX = x;
  this.ripY = y;
  this.contract = false;
  this.display = function() {
    fill(this.colors, 100);
    noStroke();
  	ellipse(this.ripX, this.ripY, this.size, this.size);
    
    if(this.size < 15) {
      this.size += 0.1; 
    }
    if(this.size > 15) {
    	this.size = random(11, 14);
    }
  }
  
  this.smaller = function() {
    this.size -= 0.2;
  }
  
  this.bigger = function() {
  	this.size += 0.1;
  }
}


function handleMouse() {
  
}var mic;

function setup() {
  createCanvas(710, 200);

  // Create an Audio input
  mic = new p5.AudioIn();

  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
}

function draw() {
  background(200);

  // Get the overall volume (between 0 and 1.0)
  var vol = mic.getLevel();
  fill(127);
  stroke(0);

  // Draw an ellipse with height based on volume
  var h = map(vol, 0, 1, height, 0);
  ellipse(width/2, h - 25, 50, 50);
}
var mic;

function setup() {
  createCanvas(710, 200);

  // Create an Audio input
  mic = new p5.AudioIn();

  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
}

function draw() {
  background(200);

  // Get the overall volume (between 0 and 1.0)
  var vol = mic.getLevel();
  fill(127);
  stroke(0);

  // Draw an ellipse with height based on volume
  var h = map(vol, 0, 1, height, 0);
  ellipse(width/2, h - 25, 50, 50);
}
var mic;

function setup() {
  createCanvas(710, 200);

  // Create an Audio input
  mic = new p5.AudioIn();

  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
	}

function draw() {
  background(200);

  // Get the overall volume (between 0 and 1.0)
  var vol = mic.getLevel();
  fill(127);
  stroke(0);

  // Draw an ellipse with height based on volume
  var h = map(vol, 0, 1, height, 0);
  ellipse(width/2, h - 25, 50, 50);
	}
var mic;

function setup() {
  createCanvas(710, 200);

  // Create an Audio input
  mic = new p5.AudioIn();

  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
}

function draw() {
  background(200);

  // Get the overall volume (between 0 and 1.0)
  var vol = mic.getLevel();
  fill(127);
  stroke(0);

  // Draw an ellipse with height based on volume
  var h = map(vol, 0, 1, height, 0);
  ellipse(width/2, h - 25, 50, 50);
}
var mic;

function setup() {
  createCanvas(710, 200);

  // Create an Audio input
  mic = new p5.AudioIn();

  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
}

function draw() {
  background(200);

  // Get the overall volume (between 0 and 1.0)
  var vol = mic.getLevel();
  fill(127);
  stroke(0);

  // Draw an ellipse with height based on volume
  var h = map(vol, 0, 1, height, 0);
  ellipse(width/2, h - 25, 50, 50);
}
var mic;

function setup() {
  createCanvas(710, 200);
  
  mic = new p5.AudioIn();
  
  mic.start();
}

function draw() {
  background(200);
  
  var vol = mic.getLevel();
  fill(127);
  stroke(0);
  
  var h = map(vol, 0, 1, height, 0);
  ellipse(width/2, h - 25, 50, 50);
}var mic;

function setup() {
  createCanvas(710, 200);
  
  mic = new p5.AudioIn();
  
  mic.start();
}

function draw() {
  background(200);
  
  var vol = mic.getLevel();
  fill(127);
  stroke(0);
  
  var h = map(vol, 0, 1, height, 0);
  ellipse(width/2, h - 25, 50, 50);
}var mic;

function setup() {
  createCanvas(710, 200);
  
  mic = new p5.AudioIn();
  
  mic.start();
}

function draw() {
  background(200);
  
  var vol = mic.getLevel();
  fill(127);
  stroke(0);
  
  var h = map(vol, 0, 1, height, 0);
  ellipse(width/2, h - 25, 50, 50);
}var ctracker;
var mouthSound;

function preload() {
  mouthSound = loadSound('scream.wav');
}

function setup() {

  // setup camera capture
  var videoInput = createCapture(VIDEO);
  videoInput.size(400, 300);
  videoInput.position(0, 0);
  
  // setup canvas
  var cnv = createCanvas(400, 300);
  cnv.position(0, 0);

  // setup tracker
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(videoInput.elt);

  mouthSound.loop();
  mouthSound.setVolume(0);
}

function draw() {
  clear();

  // get array of face marker positions [x, y] format
  var positions = ctracker.getCurrentPosition();
  if(positions.length > 0) {
    var mouthH = positions[57][1] - positions[60][1];
    var faceH = positions[7][1] - positions[33][1];
    var mouthR = mouthH/faceH;

    console.log(mouthR);

    if (mouthR > 0.1) {
      mouthSound.setVolume(10);
    } else {
      mouthSound.setVolume(0);
    }

  }

}let img;

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
}var song;
var button;
var sliderVolume;
var sliderRate;
var amp;
var cnv;

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, 10);
  
}

function setup() {
  cnv = createCanvas(720, 200);
  centerCanvas();
  textSize(10);
  noStroke();
  button = createButton("Play");
  button.position(470, 288);
  song = loadSound("zedd_Clarity.mp3", loaded);
  button.mousePressed(togglePlaying);
  background(255, 0, 200);
  
  sliderVolume = createSlider(0, 1, 0.3, 0.01);
  sliderVolume.position(350, 248);
  sliderRate = createSlider(0, 3, 1, 0.01);
  sliderRate.position(500, 248);
  amp = new p5.Amplitude();

  label();
}

function windowResized() {
  centerCanvas();
}

function draw() {
  background(0);
  song.setVolume(sliderVolume.value());
  song.rate(sliderRate.value());
  
  var vol = amp.getLevel();
  var diam = map(vol, 0, 0.3, 10, 200);
  
  noStroke();
  fill(250, 125, 152, 230-diam);
  ellipse(400, height/2, diam, diam);
  
  stroke(200, 200-diam);
  noFill();
  ellipse((400) + random(-diam, diam), (height/2) + random(-diam, diam), diam, diam);
  
  noStroke();
  fill(100, 255, 200, 200-diam);
  ellipse(320, height/2, diam, diam);
  
  stroke(200, 200-diam);
  noFill();
  ellipse((320) + random(-diam, diam), (height/2) + random(-diam, diam), diam, diam);
  
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.play();
    button.html("Pause");
  } else {
    song.stop();
    button.html("Play");
  }
}

function label() {

  title = createP("Clarity feat. Foxes (2012)");
  title.id("title");
  title.position(0, 0);
  
	title = createP("music.visualizer");
  title.id("title");
  title.position(0, 18);

  //slider label  
  sliderText = createP("Volume:");
  sliderText.position(350, height + 10);
  
  sliderText = createP("Rate:");
  sliderText.position(500, height + 10);
  

}

function loaded() {
  console.log("loaded");
  
}
// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Example 16-9: The scribbler

// Two global variables
var x;
var y;
var video;

function setup() {
  createCanvas(320, 240);
  background(175);
  // Start x and y in the center
  x = width/2;
  y = height/2;
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width,height);
  // The above function actually makes a separate video
  // element on the page.  The line below hides it since we are
  // drawing the video to the canvas
  video.hide();

}

function draw() {
  video.loadPixels();

  // A new x,y location is picked as the current (x,y) plus or minus a random value. 
  // The new location is constrained within the window's pixels.  
  var newx = constrain(x + random(-20, 20), 0, width);
  var newy = constrain(y + random(-20, 20), 0, height);
  
  var loc = (floor(newx) + floor(newy) * width) * 4;
  var r = video.pixels[loc];
  var g = video.pixels[loc + 1];
  var b = video.pixels[loc + 2];
  // Draw a line from x,y to the newx,newy
  stroke(r,g,b);
  strokeWeight(4);
  line(x, y, newx, newy);

  // We save the new location in (x,y) in order to start the process over again.
  x = newx; 
  y = newy;
}var video;
var button;
var snapshots = [];

function setup() {
  createCanvas(400, 300);
  background(51);
  video = createCapture(VIDEO);
  video.size(320, 240);
  button = createButton('snap');
  button.mousePressed(takesnap);
}

function takesnap() {
  snapshots.push(video.get());
  if (snapshots.length > 25) {
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
}var video;

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


// How many octaves do we want?
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
}//work with Firefox for Sound
let ball,
let thunder;
let rain;
let mic;
let vol = 1; 

function preload() {
  thunder = loadSound("thunder.mp3"); 
  rain = loadSound("rain.mp3");

}


  

  
//Update function
  update() {
    this.x += this.xspeed;
    this.y += this.ypseed;
    this.xspeed = bounce(this.x, this.xspeed, 0, width);
    this.yspeed = bounce(this.y, this.yspeed, 0, height);
    var panning = map(this.x, 0, width, -1.0, 1.0);
    rain.pan(panning); 
    
  } 

//Display function
  display() {
    
    
  }

function setup() { 
  createCanvas(innerWidth, innerHeight);
  background(0);

} 

function draw() { 
  background(255);
  vol = mic.getlevel();
  ball.run();
  
}let video;
let mouse;

function setup() { 
  createCanvas(600, 600);
  background(0);
  video = createCapture(VIDEO);
  video.size(500, 500);
  video.hide();
  
  mouse = createGraphics(100, 100, RGB);
  background(255);
} 

function draw() { 
  //Show Video
  image(video, 0, 0);
  
  //Dynamically change video size
  //image(video, 0, 0, mouseX, mouseY);
  
  //Paint video
  //imageMode(CENTER);
  //mouse.copy(video, mouseX, mouseY, 100, 100, 0, 0, 100, 100);
  //tint(255, 10); //setting alpha
  //image(mouse, mouseX, mouseY); 
  
}var img;
var skip = 20;

function preload() {
  img = loadImage
}

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  img.loadPixels();
}
  
//what is this going to do to the image?
  for(var i = 0; i < img.pixels.length; i++) {
    img.pixels[i]*=1.01;
  }
  img.updatePixels();
  image(img, 0, 0, img.width, img.height);
  
  //what is this going to do to the image?
  //skip++
  //skip %= 100; // modulo - gives you remainder; so if skip = 101 and skip %= 100, skip will be 1. 
  //skip = constrain(skip, 20, 100);
// for (var x = 0; x < width; x += skip) {
//   for (var y = 0; y < height; y += skip) {
//     var c = img.get(x, y);
//     fill(c[0], c[1], c[2], 10);
//     ellipse(x, y, skip, skip);
//   }
// }


  				function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}/* Danny Rozin
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
  serial.open("/dev/cu.usbmodem1461"); // open a port
  
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

This sketch will send 2 values as ascii from P5 to arduino
See arduino code in bottom, have LED connected to pin 3 and 5

move mouseX to dim LED*/

var serial; // variable to hold an instance of the serialport library
var fromSerial = 0; //variable to hold the data

function setup() {
  createCanvas(255, 255);
  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in	
  serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem1421"); // open a port
}

function draw() {
	background(0,0,255);
  var firstValueToSend = mouseX;
  var secondValueToSend = mouseY;
  serial.write(firstValueToSend + ","); // this makes it a string and adds a comma
  serial.write(secondValueToSend +","); // this makes it a string and adds a comma
  serial.write("\n" ); 								// this adds a linefeed in end (ascii 10)
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
  if (Serial.available()) {
    String fromSerial = Serial.readStringUntil('\n');               // read until you see a \n 
    int firstValueEnd = fromSerial.indexOf(',');                    // find the first comma and tell me how deep into the string it is
    String firstValueString = fromSerial.substring(0,firstValueEnd);// give me a new string that includes everything till the first comma
    int firstValue= firstValueString.toInt();                       // give me the int interpretation of that string 
    analogWrite(3, firstValue);

    int secondValueEnd = fromSerial.indexOf(',',firstValueEnd+1);                     // search for the second comma, start searching after the first one
    String secondValueString = fromSerial.substring(firstValueEnd+1,secondValueEnd);   //give me a new string with everything beween first and second comma
    int secondValue= secondValueString.toInt();                                       // give me the int interpretation of that string 
    analogWrite(5, secondValue);   
  }
}
*//* Danny Rozin
Introduction to Physical Computing
ITP

This sketch will send 2 values in ascii from arduino to P5
See arduino code in bottom, have pots connected to A0 and A1*/

var serial; // variable to hold an instance of the serialport library
var fromSerial = 0,fromSerial2 = 0; //variable to hold the data

function setup() {
  createCanvas(320, 240);
  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in	
  serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem14111"); // open a port
}

function draw() {
  // do your drawing stuff here
  ellipse(fromSerial, fromSerial2, 5, 5);
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
  var stringFromSerial = serial.readLine();    // reads everything till the new line charecter
  if (stringFromSerial.length > 0) {             // is the something there ?
    var trimmedString = trim(stringFromSerial);  // get rid of all white space
    var myArray = split(trimmedString, ",")      // splits the string into an array on commas
    fromSerial = Number(myArray[0]);             // get the first item in the array and turn into integer
    fromSerial2 = Number(myArray[1]); 					 // get the second item in the array and turn into integer
  }
}

/*  
// Arduino Code 
void setup() {
  Serial.begin(9600);
}
void loop() {
  int valueToSend = analogRead(A0)/4;
  Serial.print(valueToSend);
  Serial.print(",");
  valueToSend = analogRead(A1)/4;
  Serial.println(valueToSend);
  delay (10);
}
*//* Danny Rozin
Introduction to Physical Computing
ITP

This sketch will send one value as ascii from P5 to arduino
See arduino code in bottom, have LED connected to pin 3

move mouseX to dim LED*/

var serial; // variable to hold an instance of the serialport library
var fromSerial = 0; //variable to hold the data

function setup() {
  createCanvas(255, 255);
  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in	
  serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem1461"); // open a port
}

function draw() {
	background(0,0,255);
  var valueToSend = mouseX;
  serial.write(valueToSend + ","); // this adds a comma and turns it into a string
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
  if (Serial.available()) {
    int intFromSerial = Serial.parseInt();
    analogWrite(3, intFromSerial);
  }
}
*//* Danny Rozin
Introduction to Physical Computing
ITP

This sketch will send one binary byte from P5 to arduino
See arduino code in bottom, have LED connected to pin 3

move mouseX to dim LED*/

var serial; // variable to hold an instance of the serialport library
var fromSerial = 0; //variable to hold the data



function setup() {
  createCanvas(255, 255);
  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in	
  serial.list(); // list the serial ports
  serial.open("/dev/cu.usbmodem1461"); // open a port
}

function draw() {
  background(255,0,0);
  serial.write(mouseX);   // sends as byte unles iyts a string
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

This sketch will send one value in ascii from arduino to P5
See arduino code in bottom, have pot connected to A0*/

var serial; // variable to hold an instance of the serialport library
var fromSerial = 0; //variable to hold the data

function setup() {
	createCanvas(520, 540);
	serial = new p5.SerialPort(); // make a new instance of  serialport librar	
	serial.on('list', printList); // callback function for serialport list event
	serial.on('data', serialEvent); // callback for new data coming in	
	serial.list(); // list the serial ports
	serial.open("/dev/cu.usbmodem1461"); // open a port
  frameRate(1);
}

function draw() {
	// do your drawing stuff here
	background(255);
	textSize(fromSerial);
	text(fromSerial, 0, height / 2);
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
	var stringFromSerial = serial.readLine();
  if (stringFromSerial.length>0){
    var trimmedString = trim(stringFromSerial); //trim: get rid of all the white space
    fromSerial= Number(trimmedString);
  }
}

/*  
// Arduino Code 
void setup() {
  Serial.begin(9600);
}
void loop() {
  int analogValue = analogRead(A0);
  Serial.println(analogValue);
  delay(50);
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
	serial.open("/dev/cu.usbmodem1461"); // open a port

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
*/// Declare a "SerialPort" object
var serial;
var latestData = "waiting for data"; // you'll use this to write incoming data to the canvas

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem1461");
  serial.on('data', gotData);
  
  createCanvas(600, 600);
  noFill();
  stroke(238, 189, 65); 
  strokeWeight(10);

}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readLine(); // read the incoming string
  trim(currentString); // remove any trailing whitespace
  if (!currentString) return; // if the string is empty, do no more
  console.log(currentString); // println the string
  latestData = currentString; // save it for the draw method
}

function draw() {
  //var mappedVar = map(latestData, 490,540,0,width);
  var mappedVar = map(latestData, 0, 1023, 0, width);
  // ellipse(mappedVar, 100, 50, 50);
  // text(latestData, 10, 10);
  drawFace(mappedVar);
  console.log(latestData);
  
}

function drawFace(m) {
  background(105, 176, 210);
  
  var v = m; 
  var origV = v;

  // Left Eye
  ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);

  // Right Eye
  ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
	
  // Nose
  //v+=random(-5, 5);
  bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);

  // Mouth

  bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
}


let str = "A string walks into a bar and orders a drink. The bartender says we don't serve strings here and you're a string. Nope, I'm a frayed knot."

let segments = [];

// function preload() {
//   segments = loadStrings("text.txt");
//   console.log(segments);

// }

function setup() { 
  createCanvas(1280, 800);
  //segments = splitTokens(str);
  segments = str.split(".");

} 

function draw() { 
  background(220);
  
  let h = 0;
  let x = 0;
  
  
}function setup() { 
  createCanvas(400, 400);
  
  let a = 3;
  let b = 5;
  
  let s = sum(a, b);
  
  console.log(a, " + ", b, " = ", s);
} 

function draw() { 
  background(220);
  
 
}

function sum(a, b) {
  
  let s = a + b;
  
  return s; 
  
}// Declare a "SerialPort" object
var serial;
var latestData = "waiting for data"; // you'll use this to write incoming data to the canvas

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem1461");
  serial.on('data', gotData);
  
  createCanvas(600, 600);
  noFill();
  strokeWeight(10);

}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readLine(); // read the incoming string
  trim(currentString); // remove any trailing whitespace
  if (!currentString) return; // if the string is empty, do no more
  console.log(currentString); // println the string
  latestData = currentString; // save it for the draw method
}

function draw() {
  background(255, 255, 255);
  //var mappedVar = map(latestData, 490,540,0,width);
  var mappedVar = map(latestData, 0, 1023, 0, width);
  // ellipse(mappedVar, 100, 50, 50);
  // text(latestData, 10, 10);
  drawFace(mappedVar);
  console.log(latestData);
  
}

function drawFace(m) {
  background(127, 0, 127);
  
  var v = m; 
  var origV = v;

  // Left Eye
  ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);

  // Right Eye
  ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
	
  // Nose
  //v+=random(-5, 5);
  bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);

  // Mouth

  bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
}


function setup() { 
  createCanvas(600, 600);
  noFill();
  strokeWeight(10);
} 

function draw() { 
  background(127, 0, 127);
  
  var v = mouseX; 
  var origV = v;

  // Left Eye
  ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);

  // Right Eye
  ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
	
  // Nose
  v+=random(-5, 5);
  bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);

  // Mouth

  bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
}
function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(255, 0, 0);
}var quote = "Text goes in here!";
var dragging = false; 
var rollover = false; 

var x, y, w, h;          
var offsetX, offsetY;


function setup() { 
  createCanvas(800, 500);
  textFont("Helvetica");
  textSize(18); 
  // Starting location
  x = 100;
  y = 100;
  // Dimensions
  w = 200;
  h = 200;

} 

function draw() { 
  background(210, 164, 88);
  
  //Text boc
  noStroke(0);
  strokeWeight(1);
  fill(250);
  rect(300, 50, 200, 40);

  noStroke(0);
  fill(83, 75, 66);
  text(quote, 330, 20, 400, 400);
  
  
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    rollover = true;
  } 
  else {
    rollover = false;
  }
  
  if (dragging) {
    x = mouseX + offsetX;
    y = mouseY + offsetY;
  }

  
  strokeWeight(10);
  stroke(78, 64, 55);
  if (dragging) {
    fill (50);
  } else if (rollover) {
    fill(100);
  } else {
    fill(175, 200);
  }
  rect(x, y, w, h);
}

function mousePressed() {
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    dragging = true;

    offsetX = x-mouseX;
    offsetY = y-mouseY;
  }
}

function mouseReleased() {
  dragging = false;
}function setup() { 
  createCanvas(800, 800);
} 

function draw() { 
  background(220);
}var num = 60;
var x = [];
var y = [];

function setup() { 
  createCanvas(400, 400);
  noStroke();
  
  for (var i = 0; i < num; i++) {
    x[i] = 0;
    y[i] = 0;
  }
} 

function draw() { 
  background(220);
  for (var i = num-1; i > 0; i--) {
  	x[i] = x[i-1];
    y[i] = y[i-1];
  }
  x[0] = mouseX;
  y[0] = mouseY;
  for (var i = 0; i < num; i++) {
    fill(i*4);
    ellipse(x[i], y[i], 40, 40);
  }
  
}var gray = [];

function setup() { 
  createCanvas(400, 400);
  for (var i = 0; i < width; i++) {
    gray[i] = random(0, 255);
  }
	
} 

function draw() { 
  background(220);
  for (var i = 0; i <gray.length; i++) {
    stroke(gray[i]);
    line(i, 0, i, height);
  }
}var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1461';  // fill in your serial port name here
var fromSerial = 0;
 
function setup() {
  createCanvas(500, 500);
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
 
// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 print(i + " " + portList[i]);
 }
}

function draw(){
  background(fromSerial);
  text(fromSerial, 100, 100);
  rect(fromSerial, height-20, 50, 10);
  
}

function serverConnected() {
  print('connected to server.');
}
 
function portOpen() {
  print('the serial port opened.')
}
 
function serialEvent() {
  var stringFromSerial = serial.readLine();
  	if (stringFromSerial.length > 0){
      var trimmedString = trim(stringFromSerial);
      fromSerial = Number(trimmedString);
      
    }
 
}
 
function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  print('The serial port closed.');
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}//Created array for ball
let balls = [];

function setup() { 
  createCanvas(600, 600);
  
  for(let i=0; i < 10; i++) {
    balls.push(new Ball(random(0,width), random(0,height), random(-5, 5), random(10, 30)));
  }
} 

function draw() { 
  background(220);
  
  
  for(let b = 0; b < balls.length; b++) {
    if(!balls[b]) continue;
    balls[b].run();
    	for (let c = 0; c < balls.length; c++) {
      	if (b==c) continue;  
      	if(balls[b].isNear(balls[c])) {
          balls.splice (b, 1);
          if (b < c) c--;
          balls.splice(c, 1);

        }
      }
  }
  

}var big;
var small;


function setup() { 
  createCanvas(600, 600);
  background(111, 77, 145);
  //Object & its parameters
  big = new Scribble(width * 0.33, height/2, 50);
  small = new Scribble(width * 0.66, height/2, 10);
  
} 

function draw() { 
  big.move();
  big.display();
  big.color();
  small.move();
  small.display();
  small.color();
  
}

var small;

function setup() { 
  createCanvas(600, 600);
  background(220);
  //Object & its parameters
  small = new Scribble(width/2, height/2, 20);
} 

function draw() { 
  small.move();
  small.display();
  
}

//Constructor
function Scribble(tempX, tempY, tempDiameter) {
  
  this.x = tempX;
  this.y = tempY;
  this.diameter = tempDiameter;
  this.speed = 2.5;
  
  this.move = function() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  };
  
  this.display = function() {
    ellipse(this.x, this.y, this.diameter, this.diameter);
  };
  
}
var angle = 2.0;
var offset = 300;
var scalar = 3.5;
var speed = 0.1;
var col = {
  r: 255,
  g: 0,
  b: 0
};

function setup() { 
  createCanvas(600, 600);
  noStroke();
  background (0);
} 

function draw() { 
  col.r = random(0, 200);
  col.g = random(0, 250);
  col.b = random(100, 250);
  var x = offset + cos(angle) * scalar;
  var y = offset + sin(angle) * scalar;
  fill(col.r, col.g, col.b);
  noStroke();
  ellipse(x, y, 5, 5);
  angle += speed;
  scalar += speed;
  
}//Created array for ball
let balls = [];

function setup() { 
  createCanvas(600, 600);
  
  for(let i=0; i < 10; i++) {
    balls.push(new Ball(random(0,width), random(0,height), random(-5, 5), random(10, 30)));
  }
} 

function draw() { 
  background(220);
  
  
  for(let i = 0; i < balls.length; i++) {
    for(let j = 0; j < balls.length; j++) {
      if(i!=j) { //if i does not equal to j
      	if(balls[i].isNear(balls[j])) {
        	balls[i].turnRed();
        	balls[j].turnRed();
        }
      }
    }
  	balls[i].run();
  }
  

}//Created array for ball
let balls = [];

function setup() { 
  createCanvas(600, 600);
  
  for(let i=0; i < 10; i++) {
    balls.push(new Ball(random(100, 300), random(100, 300), random(10, 30), random(10, 30)));
  }
} 

function draw() { 
  background(220);
  
  
  for(let i=0; i<balls.length; i++) {
    balls[i].run();
  }
  

}//Created new array
let positions = [];

function setup() { 
  createCanvas(600, 600);
} 

function draw() { 
  //background(random(220)); Disco party effect XP
  background(0);
  
	//Every frame of animation
  //Storing in that array, the mouse position
  positions.push({x: mouseX, y: mouseY});
  
  if(positions.length > 50) positions.splice();
  
  for(let i = 0; i < positions.length; i++) {
    let x = positions[i].x;
    let y = positions[i].y;
  	ellipse(x, y, i/5, i/5);
  }
}//Created new array
let positions = [];

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  //background(random(220)); Disco party effect XP
  background(0);
  
	//Every frame of animation
  //Storing in that array, the mouse position
  positions.push({x: mouseX, y: mouseY});
  
  if(positions.length > 50) positions.shift();
  
  for(let i = 0; i < positions.length; i++) {
    let x = positions[i].x;
    let y = positions[i].y;
  	ellipse(x, y, i/5, i/5);
  }
}//Created new array
let positions = [];

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  //background(random(220)); Disco party effect XP
  
	//Every frame of animation
  //Storing in that array, the mouse position
  positions.push({x: mouseX, y: mouseY});
  
  for(let i = 0; i < positions.length; i++) {
    let x = positions[i].x;
    let y = positions[i].y;
  	ellipse(x, y, 50, 50);
  }
}let ball;
let ball2;

function setup() { 
  createCanvas(400, 400);
  ball = new Ball(width/2, height/2, 3, 2); //refer to Ball.js file
  ball2= new Ball(width/3, height/3, 4, 3);
} 

function draw() { 
  background(220);
  
  //HEY BALLS, DO YOUR THING
  ball.run();
  ball2.run()
  
//   ball.update();
//   ball.display();
  
//   ball2.update();
//   ball2.display();
  
}
let ball;
let ball2;

function setup() { 
  createCanvas(400, 400);
  ball = new Ball(width/2, height/2, 3, 2);
  ball2= new Ball(width/3, height/3, 4, 3);
} 

function draw() { 
  background(220);
  ball.update();
  ball.display();
  
  ball2.update();
  ball2.display();
  
}
let x1, y1, xspeed1, yspeed1;
let x2, y2, xspeed2, yspeed2;


function setup() { 
  createCanvas(400, 400);
  x1 = width/2;
  y1 = height/2;
  xspeed1 = 3;
  yspeed1 = 2;
  
  x2 = width/3;
  y2 = height/3;
  xspeed2 = 5;
  yspeed2 = 3;
} 

function draw() { 
  background(220);
  update();
  display();
  
}

function update() {
  xspeed1 = bounce(x1, xspeed1, 0, width);
  x1 += xspeed1;
  
  yspeed1 = bounce(y1, yspeed1, 0, height);
  y1 += yspeed1;
  
  xspeed2 = bounce(x2, xspeed2, 0, width);
  x2 += xspeed2;
  
  yspeed2 = bounce(y2, yspeed2, 0, height);
  y2 += yspeed2;
  
}
  
function display() {
  ellipse(x1, y1, 50, 50);
  ellipse(x2, y2, 80, 80);


}
  
function bounce(pos, speed, low, high) { //p=position
  if (pos < low || pos > high) {
    speed *= -1; 
  }
  
  pos += speed;
  
  return speed;

  
}let x, y, xspeed, yspeed;


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

function update() {
  xspeed = bounce(x, xspeed, 0, width);
  x+=speed;
  
  yspeed = bounce(y, yspeed, 0, height);
  
}
  
function display() {
  ellipse(x, y, 50, 50);

}
  
function bounce() {
  

}let x1, y1, xspeed1, yspeed1;


function setup() { 
  createCanvas(400, 400);
  x1 = width/2;
  y1 = height/2;
  xspeed1 = 4;
  yspeed1 = 2;
  
} 

function draw() { 
  background(220);
  update();
  display();
  
}

function update() {
  xspeed1 = bounce(x1, xspeed1, 0, width);
  x1 += xspeed1;
  
  yspeed1 = bounce(y1, yspeed1, 0, height);
  y1 += yspeed1;
  

}
  
function display() {
  ellipse(x1, y1, 50, 50);


}
  
function bounce(pos, speed, low, high) { //p=position
  if (pos < low || pos > high) {
    speed *= -1; 
  }
  
  pos += speed;
  
  return speed;

  
}function setup() { 
  createCanvas(600, 600);
} 

function draw() { 
  background(95, 168, 115);
  random(0);
  for (var i = 35; i < width + 40; i+= 40) {
    var gray = int(random(0, 102));
    var scalar = random(0.25, 1.0);
    owl(i, 260, gray, scalar);
  }
  
  tree(120, 420);
}

// Tree Function
function tree(x, y) {
  push();
  translate(x, y);
  noStroke();
  fill(0);
  rectangle(110, 140, 100, 10);
  
}
  

// Owl Function
function owl(x, y, g, s) {
  push();
  translate(x, y);
  scale(s);
  stroke(g);
  strokeWeight(70);
  line(0, -35, 0, -65); // Body
  
  noStroke();
  fill(255-g);
  ellipse(-17.5, -65, 35, 35); // Left eye 
  ellipse(17.5, -65, 35, 35); // Right eye dome
  arc(0, -65, 70, 70, 0, PI); // Chin
  
  fill(g);
  ellipse(-14, -65, 8, 8); // Left eye
  ellipse(14, -65, 8, 8); // Right eye
  
  fill(254, 193, 6); 
  quad(0, -58, 4, -51, 0, -44, -4, -51); // Beak
  pop();
  
}function setup() { 
  createCanvas(600, 600);
} 

function draw() { 
  background(95, 168, 115);
  random(0);
  for (var i = 35; i < width + 40; i+= 40) {
    var gray = int(random(0, 102));
    var scalar = random(0.25, 1.0);
    owl(i, 260, gray, scalar);
  }
  
}
  

// Owl Function
function owl(x, y, g, s) {
  push(); //Push adds in/pushes in a new value
  translate(x, y);
  scale(s);
  stroke(g);
  strokeWeight(70);
  line(0, -35, 0, -65); // Body
  
  noStroke();
  fill(255-g);
  ellipse(-17.5, -65, 35, 35); // Left eye 
  ellipse(17.5, -65, 35, 35); // Right eye dome
  arc(0, -65, 70, 70, 0, PI); // Chin
  
  fill(g);
  ellipse(-14, -65, 8, 8); // Left eye
  ellipse(14, -65, 8, 8); // Right eye
  
  fill(254, 193, 6); 
  quad(0, -58, 4, -51, 0, -44, -4, -51); // Beak
  pop();
  
}function setup() { 
  createCanvas(600, 600);
} 

function draw() { 
  background(95, 168, 115);
  random(0);
  for (var i = 35; i < width + 40; i+= 40) {
    var gray = int(random(0, 102));
    var scalar = random(0.25, 1.0);
    owl(i, 260, gray, scalar);
  }
  
  tree(120, 420, 110, 140);
}

// Tree Function
function tree(x, y) {
  push();
  translate(x, y);
  noStroke();
  fill(0);
  rectangle(110, 140, 100, 10)'
  

// Owl Function
function owl(x, y, g, s) {
  push();
  translate(x, y);
  scale(s);
  stroke(g);
  strokeWeight(70);
  line(0, -35, 0, -65); // Body
  
  noStroke();
  fill(255-g);
  ellipse(-17.5, -65, 35, 35); // Left eye 
  ellipse(17.5, -65, 35, 35); // Right eye dome
  arc(0, -65, 70, 70, 0, PI); // Chin
  
  fill(g);
  ellipse(-14, -65, 8, 8); // Left eye
  ellipse(14, -65, 8, 8); // Right eye
  
  fill(254, 193, 6); 
  quad(0, -58, 4, -51, 0, -44, -4, -51); // Beak
  pop();
  
}function setup() { 
  createCanvas(600, 600);
} 

function draw() { 
  background(95, 168, 115);
  random(0);
  for (var i = 35; i < width + 40; i+= 40) {
    var gray = int(random(0, 102));
    var scalar = random(0.25, 1.0);
    owl(i, 260, gray, scalar);
  }
  
  tree(120, 420, 110, 140);
}

// Tree Function
function tree(x, y) {
  push();
  translate(x, y);
  noStroke();
  fill(0);
  rectangle(110, 140, 100, 10)'
  

// Owl Function
function owl(x, y, g, s) {
  push();
  translate(x, y);
  scale(s);
  stroke(g);
  strokeWeight(70);
  line(0, -35, 0, -65); // Body
  
  noStroke();
  fill(255-g);
  ellipse(-17.5, -65, 35, 35); // Left eye 
  ellipse(17.5, -65, 35, 35); // Right eye dome
  arc(0, -65, 70, 70, 0, PI); // Chin
  
  fill(g);
  ellipse(-14, -65, 8, 8); // Left eye
  ellipse(14, -65, 8, 8); // Right eye
  
  fill(254, 193, 6); 
  quad(0, -58, 4, -51, 0, -44, -4, -51); // Beak
  pop();
  
}function setup() { 
  createCanvas(600, 600);
} 

function draw() { 
  background(95, 168, 115);
  random(0);
  for (var i = 35; i < width + 40; i+= 40) {
    var gray = int(random(0, 102));
    var scalar = random(0.25, 1.0);
    owl(i, 110, gray, scalar);
  }
  
}

// Owl Function
function owl(x, y, g, s) {
  push();
  translate(x, y);
  scale(s);
  stroke(88, 3, 1);
  strokeWeight(70);
  line(0, -35, 0, -65); // Body
  
  noStroke();
  fill(255);
  ellipse(-17.5, -65, 35, 35); // Left eye 
  ellipse(17.5, -65, 35, 35); // Right eye dome
  arc(0, -65, 70, 70, 0, PI); // Chin
  
  fill(0);
  ellipse(-14, -65, 8, 8); // Left eye
  ellipse(14, -65, 8, 8); // Right eye
  
  fill(254, 193, 6); 
  quad(0, -58, 4, -51, 0, -44, -4, -51); // Beak
  pop();
  
}function setup() { 
  createCanvas(600, 600);
} 

function draw() { 
  background(220);
  owl(110, 110);
  owl(180, 110);
}

// Owl Function
function owl(x, y) {
  push();
  translate(x, y);
  stroke(88, 3, 1);
  strokeWeight(70);
  line(0, -35, 0, -65); // Body
  
  noStroke();
  fill(255);
  ellipse(-17.5, -65, 35, 35); // Left eye 
  ellipse(17.5, -65, 35, 35); // Right eye dome
  arc(0, -65, 70, 70, 0, PI); // Chin
  
  fill(0);
  ellipse(-14, -65, 8, 8); // Left eye
  ellipse(14, -65, 8, 8); // Right eye
  
  fill(254, 193, 6); 
  quad(0, -58, 4, -51, 0, -44, -4, -51); // Beak
  pop();
  
}function setup() { 
  print("Ready to roll!");
  rollDice(20);
  rollDice(20);
  rollDice(6);
  print("Finished");
} 

function rollDice(numSides) { 
  var d = 1 + int(random(numSides));
  print("Rolling..." + d);
}
function setup() { 
  print(";
} 

function draw() { 
  background(220);
}let x, y;
let xspeed = 2;
let yspeed = 5;

function setup() {
  createCanvas(500, 500);
  
  x = width/2;
  y = height/2;
}

function draw() {
  background(220);
  
  xspeed = bounce(x, xspeed, 0, width);
  yspeed = bounce(y, yspeed, 0, height);
    
  y += yspeed;
  x += xspeed;
  ellipse(x, y, 50, 50);

}

//Bounce function - loc for location 
function bounce(loc, speed, bottom, top) {
  if(loc < bottom || loc > top) {
    speed *= -1;
	}

	return speed;
  
}let x, y;
let xspeed = 2;
let yspeed = 5;

function setup() {
  createCanvas(500, 500);
  
  x = width/2;
  y = height/2;
}

function draw() {
  background(220);
  
  xspeed = bounce(xspeed, x, 0, width);
  yspeed = bounce(yspeed, y, 0, height);
  
		ellipse(x, y, 50, 50);
  
  y += yspeed;
  x += xspeed;
}

//Bounce function, p for position
function bounce(speed, p, min, max) {
  if(p < min || p > max)
    return (speed*-1);
  else
    return speed;
  

}let w, h;
let cw, ch;
let rw, rh;
let numCols = 100;
let numRows = 100;


function setup() { 
  createCanvas(600, 600);
} 

function draw() { 
  background(220);
  
  cw = width/numCols;
  ch = height;
  rw = width
  rh = width/numRows;
  
  //Loop through columns
  for(n1 = 0; n1 < numCols; n1++) {
    for (n2 = 0; n2 < numRows; n2++) {
      let x = n1 * cw;
    	let y = n2 * rh;
      fill (0, 255, 0);
      rect(x, y, cw, ch);
      
      if(x%3==0) {
      }
    }
  }
  
  //for(let x= 0; x < width; x+=cw) {
    //rect(x, 0, cw, ch);
  //}
}let numCol, numRow;
let ch, cw; 

function setup() { 
  createCanvas(600, 600);
  numCol = 10;
  numRow = 5;
  ch = height/numRow;
  cw = width/numCol;
} 

function draw() { 
  background(220);
  
  for(let i = 0; i < numCol; i++) {
			x = i * cw;
    for(let j = 0; j < numRow; j++) {
      y = j * ch;
      rect(x, y, cw, ch);
    }
  }
      
  
}let numCol, numRow;
let ch, cw; 

function setup() { 
  createCanvas(600, 600);
  numCol = 10;
  numRow = 5;
  ch = height/numRow;
  cw = width/numCol;
} 

function draw() { 
  background(220);
  
  for(let i = 0; i < numCol; i++) {
			x = i * cw;
    for(let j = 0; j < numRow; j++) {
      y = j * ch;
      rect(x, y, cw, ch);
    }
  }
      
  
}let button={
  w:50,
  h:50,
}

let pressed = false;
let count = 0;

function setup() { 
  createCanvas(600, 600);
} 

function draw() { 
  background(237, 34, 93);
  //draw a button
  noStroke();
  fill(0);
  rectMode(CENTER);
  rect(width/2,height/2,button.w,button.h);
  push();
  fill(255);
  triangle(width/2-5,height/2-10,width/2+10,height/2,width/2-5,height/2+10);
  pop();

//   //button flickers
//   offset=offset+speed
//   if (offset>=0 && offset<=5) {
//     speed=1
//   }
//   else {
//     speed=speed*-1
//   }
  
  //if mouse is over the button, button pops
  if (mouseX>width/2-button.w/2 && mouseX<width/2+button.w/2) {
    rect(width/2,height/2,button.w+15,button.h+15);
    push();
    fill(165, 211, 140);
    triangle(width/2-10,height/2-15,width/2+15,height/2,width/2-10,height/2+15);
    pop();
  }

  //if button is pressed, button disappears and pattern shows
  if(mouseIsPressed) {
    if (mouseX>width/2-button.w/2 && mouseX<width/2+button.w/2) {
    rect(width/2,height/2,button.w+15,button.h+15);
  }
    background(237, 34, 93);
    
    let x=width/2
    let y=height/2
    
    stroke(111);
    noFill();
    
    pressed = true;
    if(count==0) {
    for (w=20;w<=width;w+=20) {
      for (h=20;h<=height;h+=20) {
        ellipse(x,y,w+random(-5,5),h+random(-5,5));
      }
    }
    }
    else if (count==1) {
      for (w=0;w<=width;w+=20) {
        ellipse(x,y,w+random(-5,5),h+random(-5,5));
        ellipse(x,y,h+random(-5,5),w+random(-5,5));
      }
    }
    else if (count==2) {
      
    }
    else if (count==3) {
      for (h=20;h<=height;h+=20) {
        ellipse(x,y,w+random(-5,5),h+random(-5,5));
      }
    }
    else if (count==4) {
      for (w=0;w<=width;w+=20) {
      ellipse(x,y,w+random(-5,5),h+random(-5,5));
      }
    }

    
  }
}
function mouseReleased() {
  count++
  if (count>4) {
    count=1
  }
}
var dragging = false; // Is the slider being dragged?
var rollover = false; // Is the mouse over the slider?

// Ellipse variables for slider
var x = 100;
var y = 45;
var w = 30;
var h = 30;
// Start and end of slider
var sliderStart = 100;
var sliderEnd = 400;
// Offset for dragging slider
var offsetX = 0;

function setup() {
  createCanvas(540, 700);
}

function draw() {
  background(50, 57, 65);


  // Is it being dragged?
  if (dragging) {
    x = mouseX + offsetX;
  }
  // Keep rectangle within limits of slider
  x = constrain(x, sliderStart, sliderEnd-w);

  // Draw a line for slider
  stroke(164, 174, 181);
  line(sliderStart, y+h/15, sliderEnd, y+h/15);

  noStroke();
  // Fill according to state
  if (dragging) {
    fill (116, 175, 223);
  } else {
    fill(255, 103, 104);
  }
  // Draw ellipse for slider
  ellipse(x, y, w, h);

  // Map is an amazing function that will map one range to another!
  // Here we take the slider's range and map it to a value between 0 and 255
  var b = map(x,sliderStart,sliderEnd-w,255,0);
  fill(b);
  rect(sliderStart, 100, sliderEnd-sliderStart, 450);
  
		//Hectagon inside rectangle  
  	stroke(255);
  	noFill();
  
  	push();
  	translate(width*0.8, height*0.5);
  	rotate(frameCount / -100.0);
  	polygon(270, 0, 60, 6); 
  	pop();
  
  //Hectagons
  stroke(255);
  noFill();
  
  push();
  translate(width*0.8, height*0.5);
  rotate(frameCount / -100.0);
  polygon(0, 0, 60, 6); 
  pop();
  
  push();
  translate(width*0.8, height*0.5);
  rotate(frameCount / -100.0);
  polygon(10, 100, 60, 6); 
  pop();
  
  push();
  translate(width*0.8, height*0.5);
  rotate(frameCount / -50.0);
  polygon(50, 100, 30, 6); 
  pop();
  
  push();
  translate(width*0.8, height*0.5);
  rotate(frameCount / -50.0);
  polygon(50, 100, 30, 6); 
  pop();
  
}

function polygon(x, y, radius, npoints) {
  var angle = TWO_PI / npoints;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius;
    var sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function mousePressed() {
  // Did I click on slider?
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX = x-mouseX;
  }
}

function mouseReleased() {
  // Stop dragging
  dragging = false;
}var dragging = false; // Is the slider being dragged?
var rollover = false; // Is the mouse over the slider?

// Ellipse variables for slider
var x = 100;
var y = 45;
var w = 30;
var h = 30;
// Start and end of slider
var sliderStart = 100;
var sliderEnd = 400;
// Offset for dragging slider
var offsetX = 0;

function setup() {
  createCanvas(540, 700);
}

function draw() {
  background(50, 57, 65);


  // Is it being dragged?
  if (dragging) {
    x = mouseX + offsetX;
  }
  // Keep rectangle within limits of slider
  x = constrain(x, sliderStart, sliderEnd-w);

  // Draw a line for slider
  stroke(164, 174, 181);
  line(sliderStart, y+h/15, sliderEnd, y+h/15);

  noStroke();
  // Fill according to state
  if (dragging) {
    fill (116, 175, 223);
  } else {
    fill(255, 103, 104);
  }
  // Draw ellipse for slider
  ellipse(x, y, w, h);

  // Map is an amazing function that will map one range to another!
  // Here we take the slider's range and map it to a value between 0 and 255
  var b = map(x,sliderStart,sliderEnd-w,255,0);
  fill(b);
  rect(sliderStart, 100, sliderEnd-sliderStart, 450);
  
		//Hectagon inside rectangle  
  	stroke(255);
  	noFill();
  
  	push();
  	translate(width*0.8, height*0.5);
  	rotate(frameCount / -100.0);
  	polygon(270, 0, 60, 6); 
  	pop();
  
  //Hectagons
  stroke(255);
  noFill();
  
  push();
  translate(width*0.8, height*0.5);
  rotate(frameCount / -100.0);
  polygon(0, 0, 60, 6); 
  pop();
  
  push();
  translate(width*0.8, height*0.5);
  rotate(frameCount / -100.0);
  polygon(10, 100, 60, 6); 
  pop();
  
  push();
  translate(width*0.8, height*0.5);
  rotate(frameCount / -50.0);
  polygon(50, 100, 30, 6); 
  pop();
  
  push();
  translate(width*0.8, height*0.5);
  rotate(frameCount / -50.0);
  polygon(50, 100, 30, 6); 
  pop();
  
}

function polygon(x, y, radius, npoints) {
  var angle = TWO_PI / npoints;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius;
    var sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function mousePressed() {
  // Did I click on slider?
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX = x-mouseX;
  }
}

function mouseReleased() {
  // Stop dragging
  dragging = false;
}var dragging = false; // Is the slider being dragged?
var rollover = false; // Is the mouse over the slider?

// Ellipse variables for slider
var x = 100;
var y = 45;
var w = 30;
var h = 30;
// Start and end of slider
var sliderStart = 100;
var sliderEnd = 400;
// Offset for dragging slider
var offsetX = 0;

function setup() {
  createCanvas(540, 700);
}

function draw() {
  background(50, 57, 65);


  // Is it being dragged?
  if (dragging) {
    x = mouseX + offsetX;
  }
  // Keep rectangle within limits of slider
  x = constrain(x, sliderStart, sliderEnd-w);

  // Draw a line for slider
  stroke(164, 174, 181);
  line(sliderStart, y+h/15, sliderEnd, y+h/15);

  noStroke();
  // Fill according to state
  if (dragging) {
    fill (116, 175, 223);
  } else {
    fill(255, 103, 104);
  }
  // Draw ellipse for slider
  ellipse(x, y, w, h);

  // Map is an amazing function that will map one range to another!
  // Here we take the slider's range and map it to a value between 0 and 255
  var b = map(x,sliderStart,sliderEnd-w,0,255);
  fill(b);
  rect(sliderStart, 100, sliderEnd-sliderStart, 150);
  
  stroke(164, 174, 181);
  noFill();
  
  push();
  translate(width*0.8, height*0.5);
  rotate(frameCount / -100.0);
  polygon(0, 0, 60, 6); 
  pop();
}

function polygon(x, y, radius, npoints) {
  var angle = TWO_PI / npoints;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius;
    var sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function mousePressed() {
  // Did I click on slider?
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX = x-mouseX;
  }
}

function mouseReleased() {
  // Stop dragging
  dragging = false;
}function setup() { 
  createCanvas(480, 120);
  fill(255);
  stroke(102);
} 

function draw() { 
  background(0);
  for (var y = 20; y <= height-20; y += 10) {
    for (var x = 20; x <= width-20; x+=10) {
      ellipse(x, y, 4, 4);
      //Draw a line to the center of the display
      line(x, y, 240, 60);
    }
  }
}function setup() { 
  createCanvas(480, 420);
  noStroke();
} 

function draw() { 
  background(0);
  for (var y = 0; y <= height; y += 40) {
    for (var x = 0; x <= width; x+= 40) {
      fill(255, 140);
      ellipse(x, y, 40, 40);
    }
  }

}var dragging = false; // Is the slider being dragged?
var rollover = false; // Is the mouse over the slider?

// Ellipse variables for slider
var x = 100;
var y = 45;
var w = 30;
var h = 30;
// Start and end of slider
var sliderStart = 100;
var sliderEnd = 400;
// Offset for dragging slider
var offsetX = 0;

function setup() {
  createCanvas(540, 700);
}

function draw() {
  background(50, 57, 65);


  // Is it being dragged?
  if (dragging) {
    x = mouseX + offsetX;
  }
  // Keep rectangle within limits of slider
  x = constrain(x, sliderStart, sliderEnd-w);

  // Draw a line for slider
  stroke(164, 174, 181);
  line(sliderStart, y+h/15, sliderEnd, y+h/15);

  noStroke();
  // Fill according to state
  if (dragging) {
    fill (116, 175, 223);
  } else {
    fill(255, 103, 104);
  }
  // Draw ellipse for slider
  ellipse(x, y, w, h);

  // Map is an amazing function that will map one range to another!
  // Here we take the slider's range and map it to a value between 0 and 255
  var b = map(x,sliderStart,sliderEnd-w,255,0);
  fill(b);
  rect(sliderStart, 100, sliderEnd-sliderStart, 450);
  
		//Hectagon inside rectangle  
  	stroke(255);
  	noFill();
  
  	push();
  	translate(width*0.8, height*0.5);
  	rotate(frameCount / -100.0);
  	polygon(270, 0, 60, 6); 
  	pop();
  
  //Hectagons
  stroke(255);
  noFill();
  
  push();
  translate(width*0.8, height*0.5);
  rotate(frameCount / -100.0);
  polygon(0, 0, 60, 6); 
  pop();
  
  push();
  translate(width*0.8, height*0.5);
  rotate(frameCount / -100.0);
  polygon(10, 100, 60, 6); 
  pop();
  
  push();
  translate(width*0.8, height*0.5);
  rotate(frameCount / -50.0);
  polygon(50, 100, 30, 6); 
  pop();
  
  push();
  translate(width*0.8, height*0.5);
  rotate(frameCount / -50.0);
  polygon(50, 100, 30, 6); 
  pop();
  
}

function polygon(x, y, radius, npoints) {
  var angle = TWO_PI / npoints;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius;
    var sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function mousePressed() {
  // Did I click on slider?
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX = x-mouseX;
  }
}

function mouseReleased() {
  // Stop dragging
  dragging = false;
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}function setup() { 
  var km = milesToKm(26.3);
  println(km);
  var km2 = milesToKm(100);
  println(km2);
  
} 

function milesToKm(miles) { 
  var km = miles * 1.6;
  return km;

}function setup() { 
  createCanvas(600, 400);
} 

function draw() { 
  background(50);
  
  lollipop(100, 100, 50);
  lollipop(300, 200, 150);
  
  
}

function lollipop(x, y, diameter) {
  fill(0, 200, 255);
  rect(x-10, y, 20, 150);
  
  fill(255, 0, 200);
  ellipse(x, y, diameter, diameter);
}function setup() { 
  createCanvas(600, 400);
} 

function draw() { 
  background(0);
  strokeWeight(4);
  stroke(255);
  
  for (var x = 0; x <= mouseX; x += 50) {
    for (var y = 0; y <= height; y += 50) {
    	fill(random(255), 0, random(255));
    	ellipse(x, y, 25, 25);
    }
  }
}function setup() { 
  createCanvas(600, 400);
} 

function draw() { 
  background(0);
  strokeWeight(4);
  stroke(255);
  
  var x = 0;
  while (x <= width) {
    fill(0, 200, 255);
  	ellipse(x, 100, 25, 25);
  	x = x + 50;
  }
  
  
  for (var x = 0; x <= width; x += 50) {
    fill(255, 0, 200);
  	ellipse(x, 300, 25, 25);
  }
  
}function setup() { 
  createCanvas(600, 400);
} 

function draw() { 
  background(0);
  strokeWeight(4);
  stroke(255);
  
  var x = 0;
  
  while (x <= width) {
  	ellipse(x, 200, 25, 25);
  	x = x + 50;
  }
}// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Example 5-4: Hold down the button
var button = false;

var x = 50;
var y = 50;
var w = 100;
var h = 75;

function setup() {
  createCanvas(200,200); 
}

function draw() {
  // The button is pressed if (mouseX,mouseY) is inside the rectangle and mousePressed is true.
  if (mouseX > x && mouseX < x+w && mouseY > y && mouseY < y+h && mouseIsPressed) {
    button = true; 
  } else {
    button = false;
  }

 if (button) {
    background(255);
    stroke(0);
  } else {
    background(0);
    stroke(255);
  }
  
  fill(175);
  rect(x,y,w,h);
}var x = 300;
var y = 200;
var d = 50;
var state = false;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  if (state) {
    background(0);
  } else {
    background(255);
  }
  ellipse(x, y, d, d);
}

function mousePressed() {
  if (dist(mouseX, mouseY, x, y) < d/2) {
    state = !state;
  }
}// Click and Drag an object
// Daniel Shiffman <http://www.shiffman.net>

var dragging = false; // Is the object being dragged?
var rollover = false; // Is the mouse over the ellipse?

var x, y, w, h;          // Location and size
var offsetX, offsetY;    // Mouseclick offset

function setup() {
  createCanvas(640, 360);
  
  // Starting location
  x = 100;
  y = 100;
  // Dimensions
  w = 75;
  h = 50;
}

function draw() {
  background(255);
  
  
  // Is mouse over object
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    rollover = true;
  } 
  else {
    rollover = false;
  }
  
  // Adjust location if being dragged
  if (dragging) {
    x = mouseX + offsetX;
    y = mouseY + offsetY;
  }

  stroke(0);
  // Different fill based on state
  if (dragging) {
    fill (50);
  } else if (rollover) {
    fill(100);
  } else {
    fill(175, 200);
  }
  rect(x, y, w, h);
}

function mousePressed() {
  // Did I click on the rectangle?
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX = x-mouseX;
    offsetY = y-mouseY;
  }
}

function mouseReleased() {
  // Quit dragging
  dragging = false;
}// Complicated Knob
// Daniel Shiffman <http://www.shiffman.net>

var dragging = false; // Is the slider being dragged?
var rollover = false; // Is the mouse over the slider?

// Circle variables for knob
var x = 160;
var y = 180;
var r = 40;

// Knob angle
var angle = 0;

// Offset angle for turning knob
var offsetAngle = 0;

function setup() {
  createCanvas(640, 360);
}

function draw() {
  background(255);


  // Is it being dragged?
  if (dragging) {
    var dx = mouseX - x;
    var dy = mouseY - y;
    var mouseAngle = atan2(dy, dx);
    angle = mouseAngle - offsetAngle;
  }

  // Fill according to state
  if (dragging) {
    fill (175);
  } 
  else {
    fill(255);
  }
  // Draw ellipse for knob
  push();
  translate(x, y);
  rotate(angle);
  ellipse(0, 0, r*2, r*2);
  line(0, 0, r, 0);
  pop();
  fill(0);


  // Map is an amazing function that will map one range to another!
  // Here we take the slider's range and map it to a value between 0 and 255
  // Our angle is either between
  var calcAngle = 0; 
  if (angle < 0) {
    calcAngle = map(angle, -PI, 0, PI, 0);
  } 
  else if (angle > 0) {
    calcAngle = map(angle, 0, PI, TWO_PI, PI);
  }

  textAlign(CENTER);
  text(int(degrees(calcAngle)), x, y+r+20);

  var b = map(calcAngle, 0, TWO_PI, 0, 255);
  fill(b);
  rect(320, 90, 160, 180);
}

function mousePressed() {
  // Did I click on slider?
  if (dist(mouseX, mouseY, x, y) < r) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    var dx = mouseX - x;
    var dy = mouseY - y;
    offsetAngle = atan2(dy, dx) - angle;
  }
}

function mouseReleased() {
  // Stop dragging
  dragging = false;
}// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Exercise 5-6: Rewrite Example 5-3 so that the squares fade from white to black 
// when the mouse leaves their area. 
// Hint: you need four variables, one for each rectangle's color.

// Four variables, one for each square's brightness level
var bright0 = 0;
var bright1 = 0;
var bright2 = 0;
var bright3 = 0;

function setup() { 
  createCanvas(640,360); 
} 

function draw() { 
  // Draw the background
  background(0); 

  // Depending on the mouse location, a 
  // different rectangle is set to brightness 255
  if (mouseX < 320 && mouseY < 180) { 
    bright0 = 255;
  } 
  else if (mouseX > 320 && mouseY < 180) { 
    bright1 = 255;
  } 
  else if (mouseX < 320 && mouseY > 180) { 
    bright2 = 255;
  } 
  else if (mouseX > 320 && mouseY > 180) { 
    bright3 = 255;
  } 

  // All rectangles always fade
  bright0 = bright0 - 2;
  bright1 = bright1 - 2;
  bright2 = bright2 - 2;
  bright3 = bright3 - 2;

  // Fill color and draw each rectangle
  noStroke(); 
  fill(bright0);
  rect(0,0,320,180); 
  fill(bright1);
  rect(320,0,320,180); 
  fill(bright2);
  rect(0,180,320,180); 
  fill(bright3);
  rect(320,180,320,180); 
  
  // Draw grid lines
  stroke(255); 
  line(320,0,320,360); 
  line(0,180,640,180); 

} var x = 300;
var y = 200;
var d = 100;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  if (dist(mouseX, mouseY, x, y) < d/2) {
    background(0);
  } else {
    background(255);
  }
  ellipse(x, y, d, d);
}// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Example 5-3: Rollovers
function setup() {
  createCanvas(640,360);
}

function draw() {
  background(255);
  stroke(0);
  line(320,0,320,360);
  line(0,180,640,180);
  
  // Fill a black color
  noStroke();
  fill(0);

  // Depending on the mouse location, a different rectangle is displayed.    
  if (mouseX < 320 && mouseY < 180) {
    rect(0,0,320,180);
  } else if (mouseX > 320 && mouseY < 180) {
    rect(320,0,320,180);
  } else if (mouseX < 320 && mouseY > 180) {
    rect(0,180,320,180);
  } else if (mouseX > 320 && mouseY > 180) {
    rect(320,180,320,180);
  }
}// Rollover Rect
// Lauren McCarthy <http://lauren-mccarthy.com>

var x = 250;
var y = 150;
var s = 100;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(200);
  if ((mouseX > x) && (mouseX < x + s) && (mouseY > y) && (mouseY < y + s)) {
    fill(0);
  } else {
    fill(255);
  }
  rect(x, y, s, s);
}// 10print.org
// Animated version of 10 print.

var x = 0;
var y = 0;

function setup() {
  createCanvas(640, 360);
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
}// Simple Slider
// Daniel Shiffman <http://www.shiffman.net>

var dragging = false; // Is the slider being dragged?
var rollover = false; // Is the mouse over the slider?

// Rectangle variables for slider
var x = 100;
var y = 25;
var w = 10;
var h = 50;
// Start and end of slider
var sliderStart = 100;
var sliderEnd = 400;
// Offset for dragging slider
var offsetX = 0;

function setup() {
  createCanvas(640, 360);
}

function draw() {
  background(255);


  // Is it being dragged?
  if (dragging) {
    x = mouseX + offsetX;
  }
  // Keep rectangle within limits of slider
  x = constrain(x, sliderStart, sliderEnd-w);

  // Draw a line for slider
  stroke(0);
  line(sliderStart, y+h/2, sliderEnd, y+h/2);

  stroke(0);
  // Fill according to state
  if (dragging) {
    fill (50);
  } else {
    fill(175);
  }
  // Draw rectangle for slider
  rect(x, y, w, h);

  // Map is an amazing function that will map one range to another!
  // Here we take the slider's range and map it to a value between 0 and 255
  var b = map(x,sliderStart,sliderEnd-w,0,255);
  fill(b);
  rect(sliderStart, 100, sliderEnd-sliderStart, 150);
}

function mousePressed() {
  // Did I click on slider?
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX = x-mouseX;
  }
}

function mouseReleased() {
  // Stop dragging
  dragging = false;
}let a = 0
function setup() { 
  createCanvas(400, 400);
  angleMode(DEGREES);
} 

function draw() { 
  background(220);
  push();
  translate(150, 150);
  scale(2, 5);
  //scale (x, y) -> multiplies by x, y values
  
//Makes faster: 
  //console.log(a++);
  //rotate(a+=2); 
  rotate(a++);
  rect(0, 0, 100, 100); 
  pop(0);
}function setup() { 
  createCanvas(400, 400);

	for(let i = 0; i > 0; i -=2) {
  console.log(i);
  
  fill(120);
  rect(i, 100, 100, 100);

  } 
  
}

function draw() { 
  background(220);
  
}let isOn = false
let isEntered = false

function setup() { 
  createCanvas(600, 400);
} 

function draw() { 
  background(220);
  fill (255, 0, 0);
  noStroke();
  
  // If the rect is on, draw it
  
  if(isOn) {
    rect(0, 0, width / 3, height);
  }
  
  if (mouseX < width / 3) {
    if(pmouseX > width/3) {
      isEntered = true;
      console.log("ENTERED");
    }
    //isOn = true;
  }
  else if (mouseX <= 2 * width / 3) {
    rect(width / 3, 0, width / 3, height);
  }
}function setup() { 
  createCanvas(600, 400);
} 

function draw() { 
  background(220);
  fill (255, 0 , 0);
  noStroke();
  
  if(mouseX < width/3) {
    rect(0, 0, width / 3, height);
  }
    
  else if(mouseX <= 2*width/3) {
  		rect(width / 3, 0, width / 3, height);
  } 
  
  else {
    rect(2 * width / 3, 0, width / 3, height);
  }
    
}let x;
let xspeed = 5;
let hit = false;

function setup() {
  createCanvas(400, 400);
  x = width/2;
}

function draw() {
  background(220);
  
  if(x > width-25) hit = true;
  else if(x<25) hit = false;
  
  if(hit) x = x-xspeed;
  else  x = x+xspeed;
  
  // if (x > width-25 || x < 0) {
  //   xspeed *= -1; // xspeed = xspeed * -1
  //}
  
  // //Move
  // x += xspeed;
  // console.log(x);
   ellipse(x, height/2, 50, 50);
}var r = 100;
var b = 255;
var g = 100;

var x = 160;
var x1 = 180;
var x2 = 140;
var z = 360;
var z1 = 380;
var z2 = 340;
var speed = 2;

var spot = {
  x: 100,
  y: 50
};
  
var col = {
  r: 255,
  g: 0,
  b: 0
};

function setup() { 
  createCanvas(600, 400);
  //c1 = 160;
} 

function draw() { 
  //background(96, mouseY, 255);
  r = map(mouseY, 0, 600, 5, 0);
  b = map(mouseY, 0, 600, 255, 0);
  g = map(mouseY, 0, 600, 180, 0);
  background(r, g, b);
  
  //Sun
  r = map(mouseY, 200, 400, 205, 0);
  b = map(mouseY, 200, 400, 25, 0);
  fill(r, 50, b);
  ellipse(width/2, mouseY, 80, 80);
  
  //Mountains at the back
  fill(10, 55, 15);
  noStroke();
  triangle(-100, height, 180, height, 50, 250);
  triangle(255, 400, 350, 250, 420, height);
  triangle(500, height, 565, 200, 630, height);
  
  //Mountains
  fill(70, 105, 15);
  noStroke();
  triangle(0, height, width/2, height, 150, 200);
  triangle(width/2, 400, 450, 150, width, height);
  
  //Clouds
  fill (250);
  noStroke();
  ellipse(x, 100, 75, 35);
  ellipse(x1, 115, 80, 30);
  ellipse(x2, 115, 80, 30);
  
  ellipse(z, 90, 60, 45);
  ellipse(z1, 100, 80, 40);
  ellipse(z2, 100, 80, 35);
	
  if (x > width) {
    speed = - 2;
  }
  x = x + speed;
  x1 = x1 + speed;
  x2 = x2 + speed;
  
  if (z > width) {
    speed = - 1;
  }
  z = z + speed;
  z1 = z1 + speed;
  z2 = z2 + speed;
  
  col.r = random(0, 250);
  col.g = random(0, 255);
  col.b = random(100, 255);
  spot.x = random(0, width);
  spot.y = random(0, height/2);
  fill(col.r, col.g, col.b, 55);
  noStroke();
  ellipse(spot.x, spot.y, 5, 5);
}var spot = {
  x: 100,
  y: 50
};
  
var col = {
  r: 255,
  g: 0,
  b: 0
};
  
  function setup() { 
  createCanvas(600, 400);
    background(0);
} 

function draw() { 
  col.r = random(0, 0);
  col.g = random(0, 250);
  col.b = random(100, 250);
  spot.x = random(0, width);
  spot.y = random(0, height/2);
  fill(col.r, col.g, col.b, 100);
  noStroke();
  ellipse(spot.x, spot.y, 3, 3);
}var r = 100;
var b = 255;
var g = 100;

var x = 160;
var x1 = 180;
var x2 = 140;

var spot = {
  x: 100,
  y: 50
};
  
var col = {
  r: 255,
  g: 0,
  b: 0
};

function setup() { 
  createCanvas(600, 400);
  //c1 = 160;
} 

function draw() { 
  //background(96, mouseY, 255);
  r = map(mouseY, 0, 600, 5, 0);
  b = map(mouseY, 0, 600, 255, 0);
  g = map(mouseY, 0, 600, 180, 0);
  background(r, g, b);
  
  //Sun
  r = map(mouseY, 200, 400, 205, 0);
  b = map(mouseY, 200, 400, 25, 0);
  fill(r, 50, b);
  ellipse(width/2, mouseY, 80, 80);
  
  //Mountains at the back
  fill(10, 55, 15);
  noStroke();
  triangle(-100, height, 180, height, 50, 250);
  triangle(255, 400, 350, 250, 420, height);
  triangle(500, height, 565, 200, 630, height);
  
  //Mountains
  fill(70, 105, 15);
  noStroke();
  triangle(0, height, width/2, height, 150, 200);
  triangle(width/2, 400, 450, 150, width, height);
  
  //Clouds
  fill (250);
  noStroke();
  ellipse(x, 100, 80, 30);
  ellipse(x1, 115, 80, 30);
  ellipse(x2, 115, 80, 30);
	
  if (x > width) {
    speed = -3;
  }
  x = x + speed;
  x1 = x1 + speed;
  x2 = x2 + 1\;
  
  col.r = random(0, 250);
  col.g = random(0, 255);
  col.b = random(100, 255);
  spot.x = random(0, width);
  spot.y = random(0, height/2);
  fill(col.r, col.g, col.b, 50);
  noStroke();
  ellipse(spot.x, spot.y, 5, 5);
}function setup() { 
  createCanvas(windowWidth, windowHeight);
  var col = 0;
} 

function draw() { 
  //background
  let col = mouseY;
  background(col);
  
  //ellipse
  fill(250, 118, 222);
  nostroke()'
  ellipse(width/2, mouseY, 65, 65, 100);
}
function setup() { 
  createCanvas(400, 400);
  x = width/2;
  y = height/2;
  xspeed = -1
  yspeed = 0.5*xspeed;
} 

function draw() { 
  background(220);
  ellipse(x, y, 50, 50);
  x+=xspeed;
  y+=yspeed;
  //console.log(x);
}function setup() { 
  createCanvas(400, 400);
  x = width/2;
  y = height/2;
} 

function draw() { 
  background(220);
  ellipse(x, y, 50, 50);
  x--;
  y++;
  console.log(x);
}function setup() { 
  createCanvas(400, 400);
  x=width/2
} 

function draw() { 
  background(220);
  ellipse(x, 200, 50, 50);
  x--;
  console.log(x);
}function setup() { 
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  console.log(width, height);
} 

function draw() { 
  background(220);
  line(width/4, height/4, 3*width/4, height/4);
  line(3*width/4, height/4, 3*width/4, 3*height/4);
  line(3*width/4, 3*height/4, width/4, 3*height/4);
  line(width/4, 3*height/4, width/4, height/4);
  
}
function setup() { 
  createCanvas(windowWidth, windowHeight);
  var x = width/2;
} 

function draw() { 
  //background(220);
  let speed = dist(mouseX, mouseY, pmouseY, pmouseY);
  //console.log(speed);
  let sw = map(speed, 0, 300, 20, 0);
  //console.log(sw)
  strokeWeight(sw);
  stroke(0, sw)
  line(mouseX, mouseY, pmouseX, pmouseY);
}

function mousePressed() {
  background(255);
}function setup() {
  createCanvas(400, 400);
  rectMode(CENTER)
  console.log(width, height)
}

function draw() {
  background(220);
  rect(width/2, height/2, width/2, height/2)
}function setup() {
  createCanvas(650, 400);
  ellipseMode(CENTER);
  rectMode(CENTER); 
  
  background(230, 167, 185);

  // Body
  stroke(255);
  fill(235, 235, 100);
  rect(330, 255, 58, 80);

    // Hair
  fill(255, 95, 55);
  noStroke();
  ellipse(400, 170, 55, 45); 
  ellipse(385, 125, 65, 55);
  ellipse(333, 95, 65, 55);
  ellipse(280, 122, 65, 55);
  ellipse(267, 170, 55, 45);
  
  // Head
  fill(255);
  ellipse(330, 165, 100, 100); 
  
  // Eyes
  fill(0); 
  ellipse(307, 155, 12, 13); 
  ellipse(355, 155, 12, 13);

  // Center Eye
  fill(235, 10 , 40)
  ellipse(330, 155, 12, 13);
  
  // Nose
  fill(10)
  ellipse(330, 175, 8, 5);
  
  // Mouth
  fill(10)
  rect(330, 195, 50, 11);
  
  // Legs
  stroke(5);
  line(330, 355, 320, 296);
  line(340, 355, 345, 296); 
  
  // Arms
  stroke(5);
  line(300, 235, 220, 196);
  line(360, 245, 345, 196)
  
  // Ground
  fill(50, 35, 15)
  rect(370, 385, 770, 57);
  
}function setup() { 
  createCanvas(600, 450);
} 

function draw() { 
  background(10, 255, 255);
	
  strokeWeight(40);
	stroke(290, 0, 0);
	line(0, 0, 600, 450);
  
  strokeWeight(1);
  stroke(0, 200, 0);
  fill(15, 200, 50);
  ellipse(300, 220, 295, 220);
  
  
  fill(0, 0, 125)
  rect(408, 180, 40, 40);
  
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
	fill(64, 224, 220);
	ellipse(200, 200, 100, 100);
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}