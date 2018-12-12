let mic;
let fft;
let drawing = [];
let x = 0;
let vol = 0;
let micBass;
let micTreble;
function setup() {
  createCanvas(600, 200);
  
  background(0);
  mic = new p5.AudioIn();
  mic.start();
  
  fft = new p5.FFT();
  fft.setInput(mic);
}
function draw() {
  vol = mic.getLevel();
  
	fft.analyze();
  
  micBass = map(fft.getEnergy("lowMid"), 0, 255, -50, 50);
  micTreble = map(fft.getEnergy("treble"), 0, 255, -50, 50);
  fill(255);
  noStroke();
  
  if (micBass > 25) {
	x++;
	} else {
	x = x;
	}
  var h = map(vol, 0, 1, width, 0);
	
  drawLine(x, micBass-micTreble+100);
}
function drawLine(micX, micY){
    if(vol>0){
        var point = {
            x: micX,
            y: micY,
          
        }
        drawing.push(point);       
    }
    beginShape();
    stroke(230);
    strokeWeight(3);
    noFill();
    push();
    for(var i=0; i<drawing.length; i++){
        vertex(drawing[i].x,drawing[i].y);
    }
    endShape();
    pop();
}
let mic;
let fft;
let drawing = [];
let x = 0;
let vol = 0;
let micBass;
let micTreble;
function setup() {
  createCanvas(710, 200);
  
  background(0);
  mic = new p5.AudioIn();
  mic.start();
  
  fft = new p5.FFT();
  fft.setInput(mic);
}
function draw() {
  vol = mic.getLevel();
  
	fft.analyze();
  
  micBass = map(fft.getEnergy("bass"), 0, 255, -50, 50);
  micTreble = map(fft.getEnergy("treble"), 0, 255, -50, 50);
  fill(255);
  noStroke();
  
  
	x++;
  var h = map(vol, 0, 1, height, 0);
	
  drawLine(x-micBass-micTreble, h-25-micTreble);
}
function drawLine(micX, micY){
    if(vol>0){
        var point = {
            x: micX,
            y: micY,
          
        }
        drawing.push(point);       
    }
    beginShape();
    stroke(230);
    strokeWeight(3);
    noFill();
    push();
    for(var i=0; i<drawing.length; i++){
        vertex(drawing[i].x,drawing[i].y);
    }
    endShape();
    pop();
}
var song;
var amp;
var button;
var volhistory = [];
function setup() {
  createCanvas(200, 200);
  
  song = new p5.AudioIn();
  
  song.start();
  amp = new p5.Amplitude();
}
function draw() {
  background(0);
  var vol = mic.getLevel();
  volhistory.push(vol);
  stroke(255);
  noFill();
  push();
  var currentY = map(vol, 0, 1, height, 0);
  translate(0, height / 2 - currentY);
  beginShape();
  for (var i = 0; i < volhistory.length; i++) {
    var y = map(volhistory[i], 0, 1, height, 0);
    vertex(i, y);
  }
  endShape();
  pop();
  if (volhistory.length > width - 50) {
    volhistory.splice(0, 1);
  }
  stroke(255, 0, 0);
  line(volhistory.length, 0, volhistory.length, height);
var song;
var amp;
var button;
var volhistory = [];
function toggleSong() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}
function preload() {
  song = loadSound('this-dot-kp.mp3');
}
function setup() {
  createCanvas(200, 200);
  button = createButton('toggle');
  button.mousePressed(toggleSong);
  song.play();
  amp = new p5.Amplitude();
}
function draw() {
  background(0);
  var vol = amp.getLevel();
  volhistory.push(vol);
  stroke(255);
  noFill();
  push();
  var currentY = map(vol, 0, 1, height, 0);
  translate(0, height / 2 - currentY);
  beginShape();
  for (var i = 0; i < volhistory.length; i++) {
    var y = map(volhistory[i], 0, 1, height, 0);
    vertex(i, y);
  }
  endShape();
  pop();
  if (volhistory.length > width - 50) {
    volhistory.splice(0, 1);
  }
  stroke(255, 0, 0);
  line(volhistory.length, 0, volhistory.length, height);
let upscore = 0;
let downscore = 0;
let bg;
let downpad;
let acorn;
let music;
function preload(){
  bg = loadImage("bg.jpg");
  downpad = loadImage("squirrels-platform.png");
  uppad = loadImage("pigeons-platform.png");
  acorn = loadImage("acorn.png");
  music = loadSound("win.wav");
}
  
function setup() {
    createCanvas(600,600);
   	ding = loadSound("data/beep.wav");
    puck = new Puck();
    up = new Paddle(true);
    down = new Paddle(false);
}
function draw() {
  	imageMode(CORNER);
    background(bg);
    
    puck.checkPaddleDown(down);
    puck.checkPaddleUp(up);
    up.show(uppad);
    down.show(downpad);
    up.update();
    down.update();
    
    puck.update();
    puck.edges();
    puck.show();
    
    fill(255);
    textSize(32);
    text(upscore, 32, 40);
    text(downscore, width-64, 40);
  
		puck.whoWins();
}
function keyReleased() {
    up.move(0);
    down.move(0);
}
function keyPressed() {
    console.log(key);
    if (keyCode == 90) {
        up.move(-10);
    } else if (keyCode == 67) {
        up.move(10);
    }
    if (keyCode == 37) {
        down.move(-10);
    } else if (keyCode == 39) {
        down.move(10);
    }
let upscore = 0;
let downscore = 0;
function setup() {
    createCanvas(600,600);
   	ding = loadSound("data/beep.wav");
    puck = new Puck();
    up = new Paddle(true);
    down = new Paddle(false);
}
function draw() {
    background(0);
    
    puck.checkPaddleDown(down);
    puck.checkPaddleUp(up);
    up.show();
    down.show();
    up.update();
    down.update();
    
    puck.update();
    puck.edges();
    puck.show();
    
    fill(255);
    textSize(32);
    text(upscore, 32, 40);
    text(downscore, width-64, 40);
}
function keyReleased() {
    up.move(0);
    down.move(0);
}
function keyPressed() {
    console.log(key);
    if (keyCode == 90) {
        up.move(-10);
    } else if (keyCode == 67) {
        up.move(10);
    }
    if (keyCode == 37) {
        down.move(-10);
    } else if (keyCode == 39) {
        down.move(10);
    }
let leftscore = 0;
let rightscore = 0;
function setup() {
    createCanvas(600,600);
   	ding = loadSound("data/beep.wav");
    puck = new Puck();
    left = new Paddle(true);
    right = new Paddle(false);
}
function draw() {
    background(0);
    
    puck.checkPaddleRight(right);
    puck.checkPaddleLeft(left);
    left.show();
    right.show();
    left.update();
    right.update();
    
    puck.update();
    puck.edges();
    puck.show();
    
    fill(255);
    textSize(32);
    text(leftscore, 32, 40);
    text(rightscore, width-64, 40);
}
function keyReleased() {
    left.move(0);
    right.move(0);
}
function keyPressed() {
    console.log(key);
    if (keyCode == 65) {
        left.move(-10);
    } else if (keyCode == 90) {
        left.move(10);
    }
    if (keyCode == 74) {
        right.move(-10);
    } else if (keyCode == 77) {
        right.move(10);
    }
var xBall = Math.floor(Math.random() * 300) + 50;
var yBall = 50;
var diameter = 50;
var xBallChange = 5;
var yBallChange = 5;
var xPaddle, xPaddle2;
var yPaddle, yPaddle2;
var paddleWidth = 100;
var paddleHeight = 25;
var started = false;
var score = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
  
  yBall = height/2;
}
function draw() {
  background(0);
  
	xBall += xBallChange;
	yBall += yBallChange;
	if (xBall < diameter/2 || 
      xBall > windowWidth - 0.5*diameter) {
		xBallChange *= -1;
  }
	if (yBall < diameter/2 || 
      yBall > windowHeight - diameter) {
    yBallChange *= -1;
	}
  
  if ((xBall > xPaddle &&
      xBall < xPaddle + paddleWidth) &&
      (yBall + (diameter/2) >= yPaddle)) {
    xBallChange *= -1;
    yBallChange *= -1;
  }
  
  if ((xBall > xPaddle2 &&
      xBall < xPaddle2 + paddleWidth) &&
      (yBall + (diameter/2) >= yPaddle2)) {
    xBallChange *= -1;
    yBallChange *= -1;
  }
  
	fill(255, 0, 255);
	noStroke();
	ellipse(xBall, yBall, diameter, diameter);
  
  if (!started) {
    xPaddle = windowWidth / 2;
    yPaddle = windowHeight - 100;
    
    xPaddle2 = windowWidth / 2;
    yPaddle2 = 100;
    started = true;
  }
  
  fill(0, 255, 255);
  noStroke();
  rect(xPaddle, yPaddle, paddleWidth, paddleHeight);
  rect(xPaddle2, yPaddle2, paddleWidth, paddleHeight);
  
  fill(0, 255, 255);
  textSize(24);
	text("Score: " + score, 10, 25);
}
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    xPaddle -= 50;
  } else if (keyCode === RIGHT_ARROW) {
    xPaddle += 50;
  } else if (keyCode === 65) {
    xPaddle2 -= 50;
  } else if (keyCode === 68) {
    xPaddle2 += 50;
  }
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
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let currentRed = pixels[4 * (y * width + x)];
      let currentGreen = pixels[4 * (y * width + x) + 1];
      let currentBlue = pixels[4 * (y * width + x) + 2];
      
      set(x, y, [currentBlue, currentGreen, currentRed, 255]);
    }
  }
  
  updatePixels();
var video;
let rvalue;
let gvalue;
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
      var r = pixels[4 * (y*width + x)];
			var g = pixels[4 * (y*width + x) + 1];      
			var b = pixels[4 * (y*width + x) + 2];
      
      rvalue = r;
      gvalue = g;
  
      
      if (r > redestValue) {
       	redestValue = r;
        redestPixelX = x;
        redestPixelY = y;
      }
      
    }
  }
  updatePixels();
  
  console.log(rvalue);
  
  if (rvalue >= 180) {
    fill(255);
    textAlign(CENTER);
    textSize(36);
    text("RED ZOMBIE WINS", width/2, height/2);
  }
  
    else if (gvalue >= 180) {
    fill(255);
    textAlign(CENTER);
    textSize(36);
    text("GREEN ZOMBIE WINS", width/2, height/2);
  }
  
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
  
  background(255);
  image(video,0,0,width,height);
  loadPixels();
  for (var y = 0; y < height; y++) {
	  for (var x = 0; x < width; x++) {
      var r = pixels[4 * (y*width + x)];
			var g = pixels[4 * (y*width + x) + 1];      
			var b = pixels[4 * (y*width + x) + 2];      
  
      set(x, y, [r, g, b, 255]); 
      
      if (r > redestValue) {
       	redestValue = r;
        redestPixelX = x;
        redestPixelY = y;
      }
      
    }
  }
  updatePixels();
  
  ellipse(redestPixelX, redestPixelY, 20,20);
let img;
let face;
let numBubbles = 100;
let latestData = "waiting for data";
let xwind;
let mic;
function setup() {
	
  mic = new p5.AudioIn();
  
  mic.start();
  
  
  
  
 
  createCanvas(1200, 400);
 	img = loadImage("paper.jpg");
  face = loadImage("face.png");
  
  for (let i = 0; i <= numBubbles; i++) {
		bubbles.push(new Bubble(0,height/2+80,0,0,random(5,80),random(100,255),60,random(100,255)));
	}
  
  
}
function gotData() {
  
}
function draw() {
  
  
  noStroke();
  
  let vol = mic.getLevel();
  let h = map(vol, 0, 1, 65, 200);
  
  console.log(vol);
  
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].force(h);
    bubbles[i].move();
    bubbles[i].display();
  }
	
  
let img;
let face;
let numBubbles = 100;
let latestData = "waiting for data";
let xwind;
let mic;
function setup() {
	
  mic = new p5.AudioIn();
  
  mic.start();
  
  
  
  
 
  createCanvas(1200, 400);
 	img = loadImage("paper.jpg");
  face = loadImage("face.png");
  
  for (let i = 0; i <= numBubbles; i++) {
		bubbles.push(new Bubble(0,height/2+80,0,0,random(5,80),random(100,255),60,random(100,255)));
	}
  
  
}
function gotData() {
  
}
function draw() {
  
  
  noStroke();
  
  let vol = mic.getLevel();
  let h = map(vol, 0, 1, 65, 200);
  
  console.log(vol);
  
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].force(h);
    bubbles[i].move();
    bubbles[i].display();
  }
	
  image(face, -250, 0, face.width/2, face.height/2); 
  
let img;
let numBubbles = 250;
function setup() {
  
  
  createCanvas(400, 400);
 	img = loadImage("paper.jpg");
  
  for (let i = 0; i <= numBubbles; i++) {
		bubbles.push(new Bubble(0,height/2,0,0,50));
	}
  
  
}
function draw() {
  
  image(img, 0, 0, img.width-300, img.height-300);
  
  noStroke();
  
  fill(255,0,0,50);
  
  for (let i = 0; i < bubbles.length; i++) {
		bubbles[i].display();
    bubbles[i].move();
  }
    
  
function setup() {
  createCanvas(400, 400);
}
function gotData(data) {
    console.log(data.main.temp);
}
function draw() {
function setup() {
  createCanvas(400, 400);
}
function gotData(data) {
  for (let i = 0; i < data.length; i++) {
    ellipse(random(width), random(height), data[i].temp);
    console.log(data[i].name);
  }
}
function draw() {
}let lines[];
let i = 0;
function setup() {
  createCanvas(400, 400);
  
  background(220);
  
  loadStrings('lines.txt', doText);
}
              
function doText(data) {
  lines[] = data;
}
function draw() {
  
  console.log(lines[i]);
	text(lines[i], 5, 20*i+20);
    
}
function mousePressed() {
  i++;
}
  let thediv;
let h1;
let two;
let input;
let yoff = 0.0;
let colorBg;
function setup() {
  colorMode(HSB);
  
  textAlign(CENTER, CENTER);
  
  createCanvas(windowWidth, 400);
  
  thediv = select('#thediv');
  
  
  h1 = createElement("h1", "the end.");
  h1.mousePressed(h1Callback);
  
  two = select('#two');
  
  input = select('#textInput');
  input.changed(inputCallback);
}
function inputCallback() {
  colorBg = random(255);
  background(colorBg, 255, 255);
}
function h1Callback() {
  h1.style('color', 'red');
}
function draw() {
  
  input.style('position', mouseX-20, mouseY+20);
  thediv.style('rotate', radians(mouseX));
  two.style('rotate', radians(mouseX));
  h1.style('font-size', mouseX + 'px');
  
  push();
  for (var x = 0; x <= width/2; x += 10) {
    
    let y = map(noise(xoff, yoff), 0, 1, 0,255);
    
    stroke(255);
    rotate(radians(y*.0075));
    fill(x,255,255);
    text(input.value(), width/2, y/2);
    xoff += 0.005;
  }
  
  pop();
  yoff += 0.01;
  
  textSize(75);
  textAlign(CENTER);
  
}
function mousePressed() {
  thediv.html("feed the rainbow");
  two.html("its the last thing");
}
var video;
var trackColor; 
function setup() {
  createCanvas(320, 240);
  video = createCapture(VIDEO);
  video.size(320,240);
  trackColor = [255, 0, 0];
}
function draw() {
  
  image(video,0,0);
  video.loadPixels();
  var worldRecord = 500; 
  var closestX = 0;
  var closestY = 0;
  for (var y = 0; y < video.height; y++ ) {
    for (var x = 0; x < video.width; x++ ) {
      var loc = (x + y * video.width) * 4;
      var r1 = video.pixels[loc   ]; 
      var g1 = video.pixels[loc + 1];
      var b1 = video.pixels[loc + 2];
      var r2 = trackColor[0];
      var g2 = trackColor[1];
      var b2 = trackColor[2];
      if (d < worldRecord) {
        worldRecord = d;
        closestX = x;
        closestY = y;
      }
    }
  }
  if (worldRecord < 50) { 
    fill(trackColor);
    strokeWeight(4.0);
    stroke(0);
    ellipse(closestX, closestY, 16, 16);
  }
}
function mousePressed() {
  trackColor = video.get(mouseX,mouseY);
  console.log(trackColor);
}let size = 800;
let arm1;
let arm2;
let arm3;
let arm4;
let arm0 = 0;
const MODE1 = 49;
const MODE2 = 50;
const MODE3 = 51;
const MODE4 = 52;
let color;
function setup() {
	createCanvas(size, size);
  rectMode(CENTER);
  
	for (let x = 0; x <= size; x += 25) {
		for (let y = 0; y <= size; y += 25) {
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
	for (var i = 0; i < clocks.length; i++) {
	clocks[i].display(i, mouseX, mouseY);
	}
}
class Clock {
  constructor(x, y) {
	this.x = x;
	this.y = y;
  }
  
	display(change, x, y) {
    
    arm4 = dist(x, y, this.x, this.y);
    arm1 = (change) / (arm4);
    arm2 = (change/60) * map(sqrt(x*y), 0, size, 0,150);
    arm3 = dist(x,y,size/2,size/2);
    
    modeSwitch();
    
    push();
		translate(this.x, this.y)
    rotate(radians(arm4));
		stroke(color);
    noFill();
		line(0, 0, 10, 10);
    
		pop();
    
	}
}
function modeSwitch() {
  if (keyCode == MODE1) {
    arm0 = arm1;
  }
  else if (keyCode == MODE2) {
    arm0 = arm2;
  }
  else if (keyCode == MODE3) {
    arm0 = arm4;
  }
  else if (keyCode == MODE4) {
    arm0 = arm3;
  }
let color;
function setup() {
  colorMode(HSB);
  
  createCanvas(windowWidth, windowHeight);
}
function serverConnected() {
}
function gotList(thelist) {
  for (var i = 0; i < thelist.length; i++) {
  }
}
function gotOpen() {
}
function gotError(theerror) {
}
function gotData() {
  color = map(latestData, 0, 1023, 0, 255);
  
}
function gotRawData(thedata) {
}
function draw() {
  background(color,255,255);
  fill(0,0,0);
  text(latestData, 10, 10);
  ellipse(50,50,data,data);
}
}let thediv;
let theotherdiv;
let h1;
let two;
let input;
function setup() {
  createCanvas(400, 400);
  
  thediv = select('#thediv');
  
  theotherdiv = createDiv("here is the initial text");
  h1= createElement("h1", "I'm an H1 Element");
  h1.mousePressed(h1Callback);
  
  two = select('#two');
  
  input = select('#textInput');
  input.changed(inputCallback);
}
function inputCallback() {
  alert(input.value());
}
function h1Callback() {
  h1.style('color', 'red');
  alert("HEY STOP");
}
function draw() {
  background(220);
}
function mousePressed() {
  thediv.html("Here is some new text");
  two.html("New stuff");
}let size = 800;
let arm1;
let arm2;
let arm3;
let arm4;
let arm0 = 0;
let color;
function setup() {
	createCanvas(size, size);
  
  
}
function draw() {
	background(0);
  
  if (mouseIsPressed) {
    background(255);
    color = 225;
  } else {
    color = 255; 
  }
	for (var i = 0; i < clocks.length; i++) {
	clocks[i].display(i);
	}
}
function Clock (x, y) {
	this.x = x;
	this.y = y;
	this.display = function(change) {
    
    arm4 = dist(mouseX, mouseY, this.x, this.y);
    arm1 = (change) / (arm4);
    arm2 = (change / 60) * map(mouseX, 0, size, 0,150);
    arm3 = dist(mouseX,mouseY,size/2,size/2);
    
    modeSwitch();
    
		push();
		translate(this.x, this.y)
		rotate(radians(arm0));
		stroke(arm4+100);
		line(0, 0, 20, 20);
		pop();
    
    push();
		translate(this.x, this.y)
    rotate(radians(arm4));
		stroke(color);
		line(0, 0, 20, 20);
		pop();
    
	}
}
function modeSwitch() {
  if (keyCode == 49) {
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
let size = 600;
let numClocks = (size/20) * (size/20);
let locX = 0;
let locY = 0;
function setup() {
  colorMode(HSB);
	createCanvas(size, size);
	for (i = 0; i < numClocks; i++) {
		clocks.push(new Clock());
	}
}
function draw() {
	background(255);
  
  let locX;
  let locY;
  for (let x = 0; x <= width; x += 20) {
    for (let y = 0; y <= height; y += 20) {
      locX = x;
      locY = y;
    }
  }	
  
  for (let i = 0; i < clocks.length; i++) {
    clocks[i].display(locX, locY);	
  }
}
function Clock(xx,yy){
  this.x = random(size);
  this.y = random(size);
  
    
  this.display = function() {
    
    
    
    let angle = 0.0;
    
    angle = angle + frameCount * 0.01;
    let cosine = cos(angle);
    let cX = map(cosine, 0, 1, 0, 360);
    let cY = map(cosine, 0, 1, 360, 0);
    let col = map(cosine, 0, 1, 0, 1);
    let colX = map(this.x, 0, 400, 0, 255);
    let colY = map(this.y, 0, 400, 0, 255);
    
    
    
		let rotX = this.x * radians(cX);
    let rotY = this.y * radians(cY);
  	
    stroke(col * colX, 255, col*colY+100);
    line(this.x, this.y, rotX, rotY);
  
  };
}
let size = 800;
let numClocks = (size/20) * (size/20);
let i = 0;
function setup() {
	createCanvas(size, size);
	for (i = 0; i < numClocks; i++) {
		clocks.push(new Clock());
	}
}
function draw() {
	background(255);
  for (let i = 0; i < clocks.length; i++) {
    clocks[i].display();	
  }
			
}
function Clock(){
  this.x = random(width);
  this.y = random(height);
  
  for (let x = 0; x <= width; x += 20) {
    for (let y = 0; y <= height; y += 20) {
      this.x = x;
      this.y = y;
    }
  }
  this.display = function() {
    line(this.x, this.y, this.x * noise(0.01*frameCount), this.y * noise(0.01*frameCount));
  };
}
let size = 800;
let numClocks = (size/20) * (size/20);
let i = 0;
function setup() {
	createCanvas(size, size);
	for (i = 0; i < numClocks; i++) {
		clocks.push(new Clock());
	}
}
function draw() {
	background(0);
	for (let x = 0; x <= size; x+20) {
		for (let y = 0; y <= size; y+20) {
			clocks[i].display(x, y);	
		}
	}
}
function setup() {
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
}function setup() {
  createCanvas(400, 400);
  
  b = new Ball(50, 50, 1, 2, 50);
  b1 = new Ball(90, 80, 2, 1, 40);
}
function draw() {
  background(220);
  
  b.display();
  b1.display();
  
  b.move();
  b1.move();
  
  b.bounce();
  b1.bounce();
  
  b.hover();
  b1.hover();
}let ball = {
  x: 100,
  y: 100,
  d: 50,
  xspeed: 1.5,
  yspeed: 1
}
let beachBall = {
  x: 50,
  y: 50,
  d: 10,
  xspeed: 1.5,
  yspeed: 2
}
function setup() {
  createCanvas(400, 400);
}
function draw() {
  noFill();
  
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
}let padding = 50
let slider;
let sliderC = 0;
function setup() {
  frameRate(60);
  createCanvas(400, 400);
  slider = padding
  
  
}
function draw() {
  sliderC = map( slider, padding, width-padding, 0, 255);
  sliderS = map( slider, padding, width-padding, 0, 50);
  background(sliderC);
  
  
  
  noFill();
  for (let x = 0; x <= width; x += 20) {
    for (let y = 0; y <= height; y += 20) {
      ellipse(x,y,sliderS,sliderS);
      if(sliderS < 25) {
      line(x, y, x+20, y+20);
      } else {
      line(x+random(20), y+random(20), x+random(20), y+random(20));
      }
    }
  }
  
  stroke (map(sliderC, 0, 255, 255, 0));
  fill(255);
  line( padding, height-padding, width-padding, height-padding)
  ellipseMode (CENTER);
  ellipse ( slider, height-padding, 20,20);
  if (mouseIsPressed && mouseY >= height-padding-10 && mouseY <= height-padding + 10) {
    if (mouseX >= padding && mouseX <= width-padding ) {
    slider = mouseX
    }
  }
}let padding = 50
let slider;
let sliderC = 0;
let clocks [];
function setup() {
  frameRate(60);
  createCanvas(400, 400);
  slider = padding
  
  for (let x = 0; x <= width/10; x++) {
  	clocks.push(new Spin()); 
  }
}
function draw() {
  sliderC = map( slider, padding, width-padding, 0, 255);
  sliderS = map( slider, padding, width-padding, 0, 50);
  background(sliderC);
  
  
  
  noFill();
  for (let i=0; i<clocks.length; i++) {
    for (let x = 0; x <= width; x += 20) {
      for (let y = 0; y <= height; y += 20) {
        ellipse(x,y,sliderS,sliderS);
        if(sliderS < 25) {
        line(x, y, x+20, y+20);
        } else {
        line(x+random(20), y+random(20), x+random(20), y+random(20));
        }
      }
    }
  }
  stroke (map(sliderC, 0, 255, 255, 0));
  fill(255);
  line( padding, height-padding, width-padding, height-padding)
  ellipseMode (CENTER);
  ellipse ( slider, height-padding, 20,20);
  if (mouseIsPressed && mouseY >= height-padding-10 && mouseY <= height-padding + 10) {
    if (mouseX >= padding && mouseX <= width-padding ) {
    slider = mouseX
    }
  }
}
function Spin() {
  this.x = x;
  this.y = y;
  this.speed = 1;
  
  this.rotate = function() {
    
  }
  
  this.display = function() {
    line(this.x, this.y, this
  }
}let padding = 50
let slider;
let sliderC = 0;
let sliderW = 0;
function setup() {
  colorMode(HSB);
  
  createCanvas(400, 400);
  slider = padding
}
function draw() {
  
  sliderC = map( slider, padding, width-padding, 0, 225);
  sliderS = map( slider, padding, width-padding, 0, 50);
  sliderW = map( slider, padding, width-padding, -75, 50);
  
  let rx = sliderW * noise(0.01*frameCount + 30);
  
  
  background(rx*-1/2);
  
  fill(0,50);
  
  for (let x = 0; x <= width; x += 20) {
    for (let y = 0; y <= height; y += 20) {
      
    	ellipse(x,y,sliderS,sliderS);
      
       
        stroke (map(sliderC, 0, 255, 255, 0)*(x/y),255,255);
        line(x*rx/20, y/rx/20, x, y);
    }
  }
  
  fill(255,50);
  line( padding, height-padding, width-padding, height-padding)
  ellipseMode (CENTER);
  ellipse ( slider, height-padding, 20,20);
  if (mouseIsPressed && mouseY >= height-padding-10 && mouseY <= height-padding + 10) {
    if (mouseX >= padding && mouseX <= width-padding ) {
    slider = mouseX
    }
  }
}let x,y;
let xdir = 3;
let ydir = 4;
let pxdir = 3;
let pydir = 4;
function setup() {
  createCanvas(400, 400);
  
  x = 10;
  y = 10;
}
function draw() {
  
  rect(200, 200, 100, 100);
  if (mouseIsPressed && mouseX > 200 && mouseX < 300 && mouseY < 300 && mouseY > 200) {
    if (xdir != 0 && ydir != 0) {
    pxdir = xdir;
    pydir = ydir;
    xdir = 0;
    ydir = 0;
    }
  } else {
    xdir = pxdir;
    ydir = pydir;
  }
  
  ellipse(x, y, 20, 20);
  x = x + xdir;
  y = y + ydir;
  
  if (y >= height) {
    ydir = ydir * -1;
  }
  
  if (x >= width) {
  	xdir = xdir * -1;
  }
  
  if (y <= 0) {
    ydir = ydir * -1;
  }
  
  if (x <= 0) {
    xdir = xdir * -1;
  }
  
}let locX = 0;
let locY = 0;
let textLoc = 0;
let h = window.innerWidth;
let points = 1;
function setup() {
  
  frameRate(30);
  colorMode(HSB);
  createCanvas(window.innerWidth, window.innerHeight);
  
  background(220);
  
  locX = random(h/1.5)+100;
  locY = random(h/1.5)+100;
  
  fontSize = 100;
  
  noStroke();
  text ("— press up/down arrow to increase/decrease points", h/2, 25);
  text ("— press '1' + '2' number keys for special modes, '3' to return to default mode", h/2, 45);
  text ("— click mouse to clear", h/2, 65);
  text ("don't have too much fun.", h/2, 105);
  
}
function draw() {
  
  for (let i=0; i<=h/2; i+=(h/points)) {
    
    stroke(random(255), random(155)+100, random(155)+100);
    line(mouseX, mouseY, i+(locX), i+(locY));
    line(mouseX, mouseY, pmouseX, pmouseY);
    
  
  }
  
  if (keyCode == 49) {
    
    text("thicc mode 001 activated", locX+textLoc, locY+textLoc-100);
    
    strokeWeight((locX+locY)-(mouseX+mouseY));
    
  }
  
  if (keyCode == 50) {
    
    strokeWeight((mouseX*(locX*2))/(mouseY*(locY*2)));
    
    text("thicc mode 002 activated", locX+textLoc, locY+textLoc-100);
  }
    
}
function keyPressed() {
  if (keyCode == 38) {
    points++;
  }
  
  if (keyCode == 40) {
    points--;
  }
  
	if (keyCode == 49) {
    textLoc = 0
  }
  
  if (keyCode == 50) {
    textLoc = 0
  }
  
  if (keyCode == 51) {
    
    strokeWeight(1);
    
    clear();
    background(220);
    
    text("thicc mode deactivated", locX, locY-100);
  }
}
function mousePressed() {
  alpha = 255;
  
  clear();
  background(220);
  
  locX = random(h/1.5)+100;
  locY = random(h/1.5)+100;
  
  textLoc = h*1000;
}var size = 0;
var alpha = 255;
var loc = 0;
function setup() {
  colorMode(HSB);
  createCanvas(window.innerWidth, window.innerWidth/2);
  
  createP("My name is Casey."); 
  createP("Draw what you think I look like.");
  createP("Press your face against your mouse to clear the canvas.");
  
  background(220);
}
function draw() {
  
  if ((frameCount % 10) == 0) {
    
    alpha = alpha-5;
    
    size = 5 * random(4) + 10;
    
		fill(random(255), random(155)+100, random(155)+100, alpha);
    
    strokeWeight(random(3));
    
    loc--;
  }
  
  ellipse(mouseX, mouseY, size, size);
  line(pmouseX, pmouseY, mouseX, mouseY);
}
function mousePressed() {
  alpha = 255;
  
  clear();
  background(220);
  
}var size = 0;
var alpha = 255;
var loc = 0;
function setup() {
  colorMode(HSB);
  createCanvas(window.innerWidth, window.innerWidth/2);
  
  createP("My name is Casey."); 
  createP("Draw what you think I look like.");
  createP("Press your face against your mouse to clear the canvas.");
  
  background(220);
}
function draw() {
  
  if ((frameCount % 10) == 0) {
    
    alpha = alpha-5;
    
    size = 5 * random(4) + 10;
    
		fill(random(255), random(155)+100, random(155)+100, alpha);
    
    strokeWeight(random(3));
    
    loc--;
  }
  
  ellipse(mouseX, mouseY, size, size);
  line(pmouseX, pmouseY, mouseX, mouseY);
}
function mousePressed() {
  alpha = 255;
  
  clear();
  background(220);
  
}