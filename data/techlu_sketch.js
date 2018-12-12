var mic;
var micLevel = 0;
var fft;
var DS = true;
var DW = true;
function setup(){
	createCanvas(windowWidth, windowHeight);
	
	
	
	textSize(9);
}
function draw(){
  background(0);
	
	if(DS) drawSpectrum();
	
	if(DW) drawWave();
	
}
function keyPressed()
{
	if(keyCode==83) DS = !DS;
	if(keyCode==87) DW = !DW;
}
function drawSpectrum()
{
	var w = width*0.8/spectrum.length;
	for(var i = 0;i<spectrum.length;i++)
	{
		var freq = ((44100/1024)*i).toFixed(2);
		var x = map(i, 0, spectrum.length-1, width*0.1, width*0.9);
		var y = map(spectrum[i], 0, 255, height*0.9, height*0.1);
		noStroke();
		fill(0, 255, 0, 0);
		rect(x, y, w, height*0.9 - y);
		stroke(255, 0, 0);
		noFill()
		ellipse(x, y, 10, 10);
		fill(0, 255, 255);
		noStroke();
		text(freq, x, y);
	}
}
function drawWave()
{
	noStroke();
	beginShape();
	for(var i = 0;i<waveform.length;i++)
	{
		var x = map(i, 0, waveform.length-1, width*0.1, width*0.9);
		var y = map(waveform[i], -1., 1., height*0.9, height*0.1);
		var g = map(i, 0, waveform.length-1, 0, 255);
		var b = map(abs(waveform[i]), 0., 1., 0, 255);
		vertex(x, y);
		fill(random(255), random(255), random(255), 255);
		ellipse(x, y, 5, 5);
	}
	endShape();
}let audio;
let level;
var fft, filter;
function preload() {
    soundFormats('mp3');
    mySound = loadSound('left sound.mp3');
    mySound2 = loadSound('SJ.mp3');
    mySound3 = loadSound('bottomsound.mp3');
}
function setup() {
    createCanvas(640, 360);
    filter = new p5.LowPass();
    mySound3.connect(filter);
    fft = new p5.FFT();
    level = new p5.Amplitude();
}
function draw() {
    background(244, 66, 66);
    line(200, 0, 200, 250);
    line(0, 250, 640, 250);
  strokeWeight(10);
    var freq = map(mouseX, 0, width, 20, 8000);
    filter.freq(freq);
    filter.res(10);
}
function isMouseOverCanvas() {
    var mX = mouseX,
        mY = mouseY;
    if (mX > 0 && mX < width && mY < height && mY > 0) {
        mySound3.amp(0.5, 0.2);
    } else {
        mySound3.amp(0, 0.2);
    }
}
var inside1 = false;
function mouseMoved() {
    if (mouseX > 0 &&
        mouseX < 200 &&
        mouseY > 0 &&
        mouseY < 250) {
      
      
      if (inside1 == false) {
            mySound.play();
						 			           inside1 = true;
		        }
    } else {
      inside1 = false;
        if (mouseX > 200 &&
            mouseX < 640 &&
            mouseY > 0 &&
            mouseY < 250) {
            var panValue = map(mouseX, 0, width, -1, 1);
            mySound2.pan(panValue);
            var speed = map(mouseY, 0, height, 0, 4);
            mySound2.rate(speed);
            var vol = map(mouseY, 0, height, 0, 1);
            mySound2.amp(vol);
            if (mySound2.isPlaying() == true) {
            } else {
                mySound2.play();
            }
        } else {
            if (mouseX > 0 &&
                mouseX < 640 &&
                mouseY > 250 &&
                mouseY < 360) {
                filterFreq = map(mouseX, 0, width, 20, 20000);
                filterRes = map(mouseY, 710, height, 15, 5)
                if (mySound3.isPlaying() == true) {
                } else {
                    mySound3.play();
                }
            }
        }
    }
}let audio;
let level;
var fft, filter;
function preload() {
    soundFormats('mp3');
    mySound = loadSound('tree-2.mp3');
    mySound2 = loadSound('bird.mp3');
    mySound3 = loadSound('water.mp3');
}
function setup() {
    createCanvas(640, 360);
    filter = new p5.LowPass();
    mySound3.connect(filter);
    fft = new p5.FFT();
    level = new p5.Amplitude();
}
function draw() {
    background(220, 230, 233);
    line(200, 0, 200, 250);
    line(0, 250, 640, 250);
    var freq = map(mouseX, 0, width, 20, 8000);
    filter.freq(freq);
    filter.res(10);
}
function isMouseOverCanvas() {
    var mX = mouseX,
        mY = mouseY;
    if (mX > 0 && mX < width && mY < height && mY > 0) {
        mySound3.amp(0.5, 0.2);
    } else {
        mySound3.amp(0, 0.2);
    }
}
var inside1 = false;
function mouseMoved() {
    if (mouseX > 0 &&
        mouseX < 200 &&
        mouseY > 0 &&
        mouseY < 250) {
      
      if (inside1 == false) {
            mySound.play();
						 			           inside1 = true;
				
        }
    } else {
      inside1 = false;
        if (mouseX > 200 &&
            mouseX < 640 &&
            mouseY > 0 &&
            mouseY < 250) {
            var panValue = map(mouseX, 0, width, -1, 1);
            mySound2.pan(panValue);
            var speed = map(mouseY, 0, height, 0, 4);
            mySound2.rate(speed);
            var vol = map(mouseY, 0, height, 0, 1);
            mySound2.amp(vol);
            if (mySound2.isPlaying() == true) {
            } else {
                mySound2.play();
            }
        } else {
            if (mouseX > 0 &&
                mouseX < 640 &&
                mouseY > 250 &&
                mouseY < 360) {
                filterFreq = map(mouseX, 0, width, 20, 20000);
                filterRes = map(mouseY, 710, height, 15, 5)
                if (mySound3.isPlaying() == true) {
                } else {
                    mySound3.play();
                }
            }
        }
    }
}let audio;
let level;
var fft, filter;
function preload() {
    soundFormats('mp3');
    mySound = loadSound('tree-2.mp3');
    mySound2 = loadSound('bird.mp3');
    mySound3 = loadSound('water.mp3');
}
function setup() {
    createCanvas(640, 360);
    filter = new p5.LowPass();
    mySound3.connect(filter);
    fft = new p5.FFT();
    level = new p5.Amplitude();
}
function draw() {
    background(220, 230, 233);
    line(200, 0, 200, 250);
    line(0, 250, 640, 250);
    var freq = map(mouseX, 0, width, 20, 8000);
    filter.freq(freq);
    filter.res(10);
}
function isMouseOverCanvas() {
    var mX = mouseX,
        mY = mouseY;
    if (mX > 0 && mX < width && mY < height && mY > 0) {
        mySound3.amp(0.5, 0.2);
    } else {
        mySound3.amp(0, 0.2);
    }
}
var inside1 = false;
function mouseMoved() {
    if (mouseX > 0 &&
        mouseX < 200 &&
        mouseY > 0 &&
        mouseY < 250) {
      
      if (inside1 == false) {
            mySound.play();
						 			           inside1 = true;
				
        }
    } else {
      inside1 = false;
        if (mouseX > 200 &&
            mouseX < 640 &&
            mouseY > 0 &&
            mouseY < 250) {
            var panValue = map(mouseX, 0, width, -1, 1);
            mySound2.pan(panValue);
            var speed = map(mouseY, 0, height, 0, 4);
            mySound2.rate(speed);
            var vol = map(mouseY, 0, height, 0, 1);
            mySound2.amp(vol);
            if (mySound2.isPlaying() == true) {
            } else {
                mySound2.play();
            }
        } else {
            if (mouseX > 0 &&
                mouseX < 640 &&
                mouseY > 250 &&
                mouseY < 360) {
                filterFreq = map(mouseX, 0, width, 20, 20000);
                filterRes = map(mouseY, 710, height, 15, 5)
                if (mySound3.isPlaying() == true) {
                } else {
                    mySound3.play();
                }
            }
        }
    }
}let audio;
let level;
var fft, filter;
function preload() {
  
  soundFormats('mp3');
   mySound = loadSound('tree.mp3'); 
   mySound2 = loadSound('bird.mp3');
   mySound3 = loadSound('water.mp3');
  
}
function setup() { 
  createCanvas(640, 360);
  
  filter =new p5.LowPass();
  mySound3.disconnect();
  mySound3.connect(filter);
  fft= new p5.FFT();
  
  
} 
function draw() { 
  background(220,230,233);
  line(200,0,200,250);
  line(0,250,640,250);
    
  
  var freq = map(mouseX, 0, width, 20, 8000);
  filter.freq(freq);
  filter.res(10);
  isMouseOverCanvas();
  
  
   var panValue = map(mouseX, 0, width, -1, 1);
  mySound2.pan(panValue);
  
  var speed = map(mouseY, 0, height, 0, 4);
  mySound2.rate(speed);  
  
  var vol = map(mouseY, 0, height, 0, 1);
  mySound2.amp(vol);
  
  if (!mySound2.isPlaying()) {
   mySound2.play(); 
  
  
}
function isMouseOverCanvas() {
  var mX = mouseX, mY = mouseY;
  if (mX > 0 && mX < width && mY < height && mY > 0) {
    mySound3.amp(0.5, 0.2);
  } else {
    mySound3.amp(0, 0.2);
  }
}
function mouseMoved() {
  
  if(mouseX > 0 && 
     mouseX < 200 &&
     mouseY > 0 &&
     mouseY < 250){
    
    
    if(mySound.isPlaying() == true){
      mySound.pause();
    }else{
      
   		mySound.play();
      
 
    }
    
  } 
  
    if(mouseX > 200 && 
     mouseX < 640 &&
     mouseY > 0 &&
     mouseY < 250){
    
    if(mySound2.isPlaying() == true){
      mySound2.pause();
    }
      else{
   		mySound2.play();
    }
    }
  
  
    
      if(mouseX > 0 && 
     mouseX < 640 &&
     mouseY > 250 &&
     mouseY < 360){
        
    filterFreq = map(mouseX, 0, width, 20, 20000);
    filterRes = map( mouseY, 710, height, 15, 5)
    
        
     if(mySound3.isPlaying() == true){
       mySound3.pause();
     }else{
      
    		mySound3.play();
      
    
       } 
    }
    
}
}
var fft, filter;
function preload() {
  
  soundFormats('mp3');
   mySound = loadSound('timber 1.mp3'); 
   mySound2 = loadSound('timber 2.mp3');
   mySound3 = loadSound('timber 3.mp3');
  
}
function setup() { 
  createCanvas(640, 360);
  
  filter =new p5.LowPass();
  
  mySound3.disconnect();
  mySound3.connect(filter);
  
  fft= new p5.FFT();
} 
function draw() { 
  background(220,230,233);
  line(200,0,200,250);
  line(0,250,640,250);
  
  
  
    var freq = map(mouseX, 0, width, 20, 10000);
  filter.freq(freq);
  filter.res(50);
  
  
}
function mouseMoved() {
  
  if(mouseX > 0 && 
     mouseX < 200 &&
     mouseY > 0 &&
     mouseY < 250){
    
    
    if(mySound.isPlaying() == true){
      mySound.pause();
    }else{
      
   		mySound.play();
      
 
    }
    
  } 
  
  else {
    if(mouseX > 200 && 
     mouseX < 640 &&
     mouseY > 0 &&
     mouseY < 250){
    
    if(mySound2.isPlaying() == true){
      mySound2.pause();
    }else{
      
   		mySound2.play();
    }
    }else{
    
      if(mouseX > 0 && 
     mouseX < 640 &&
     mouseY > 250 &&
     mouseY < 360){
        
    filterFreq = map(mouseX, 0, width, 20, 10000);
    filterRes = map( mouseY, 710, height, 15, 5)
    
        
    if(mySound3.isPlaying() == true){
      mySound3.pause();
    }else{
      
   		mySound3.play();
      
    
      } 
    }
  }
    }
}
var filter;
function preload() {
  
  soundFormats('mp3');
   mySound = loadSound('timber 1.mp3'); 
   mySound2 = loadSound('timber 2.mp3');
   mySound3 = loadSound('timber 3.mp3');
}
function setup() { 
  createCanvas(640, 360);
  
} 
function draw() { 
  background(220,230,233);
  line(200,0,200,250);
  line(0,250,640,250);
  
  filter.freq(freq);
}
function mouseMoved() {
  if(mouseX > 0 && 
     mouseX < 200 &&
     mouseY > 0 &&
     mouseY < 250){
    
    if(mySound.isPlaying() == true){
      mySound.pause();
    }else{
      
   		mySound.play();
      
 
    }
    
  } else {
    if(mouseX > 200 && 
     mouseX < 640 &&
     mouseY > 0 &&
     mouseY < 250){
    
    if(mySound2.isPlaying() == true){
      mySound2.pause();
    }else{
      
   		mySound2.play();
    }
    }else{
    
      if(mouseX > 0 && 
     mouseX < 640 &&
     mouseY > 250 &&
     mouseY < 360){
        
    if(mySound3.isPlaying() == true){
      mySound3.pause();
    }else{
      
   		mySound3.play();
      
    
      } 
    }
  }
    }
}
var latestData = "waiting for data";
let vid1;
function setup() {
  createCanvas(windowWidth, windowHeight);
  vid1 = createVideo("videoplayback.mp4");
  vid1.hide();
  vid1.loop();
}
function draw() {
  background(220);
  if (latestData < 800) {
    image(vid1, 0, 0);
  } else {
    background(0);
  }
}
function gotData() {
  latestData = currentString;
}var kinectron = null;
var x = 0;
var y = 0;
var bx = 0;
var by = 0;
var bxdir = 1;
var bydir = 1;
function setup() { 
  createCanvas(400, 400);
  
  kinectron = new Kinectron("172.16.231.35");
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
function preload() {
  
  soundFormats('mp3');
   mySound = loadSound('timber 1.mp3'); 
   mySound2 = loadSound('timber 2.mp3');
   mySound3 = loadSound('timber 3.mp3');
}
function setup() {
  createCanvas(500, 200);
  background('#004d00');
  
}
                    
 
function draw() { 
  
  fill('#86592d');
  triangle(60, 100, 88, 150, 116, 100);
  triangle(180, 100, 208, 150, 236, 100);
  triangle(120, 50, 148, 100, 176, 50);
  
  
}
  
function mousePressed() {
  if(mouseX > 180 && 
     mouseX < 236 &&
     mouseY > 100 &&
     mouseY < 150){
    
    if(mySound.isPlaying() == true){
      mySound.pause();
    }else{
      
   		mySound.play();
      
 
    }
    
  } else {
    if(mouseX > 120 && 
     mouseX < 176 &&
     mouseY > 50 &&
     mouseY < 100){
    
    if(mySound2.isPlaying() == true){
      mySound2.pause();
    }else{
      
   		mySound2.play();
    }
    }else{
    
      if(mouseX > 60 && 
     mouseX < 116 &&
     mouseY > 100 &&
     mouseY < 150){
        
    if(mySound3.isPlaying() == true){
      mySound3.pause();
    }else{
      
   		mySound3.play();
      
    
      } 
    }
  }
    }
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log('starting');
	noStroke();
  if (!navigator.geolocation) {
    alert("navigator.geolocation is not available");
  }
  navigator.geolocation.getCurrentPosition(setPos);
}
function setPos(position) {
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
function draw() { 
  background(value);
  
  fill(255,0,0);
  
  for (var i = 0; i < touches.length; i++) {
      ellipse(touches[i].x, touches[i].y, 100, 100);
  }
  
  
  
}var bgColor;
function setup() { 
  createCanvas(windowWidth, windowHeight);
  bgColor = color(255,255,255);
} 
function deviceMoved() {
  var r = random(255);
  var g = random(255);
  var b = random(255);
  bgColor = color(r, g, b);
}
function draw() { 
  background(bgColor);
  
  fill(255,0,0);
  
  for (var i = 0; i < touches.length; i++) {
      ellipse(touches[i].x, touches[i].y, 100, 100);
  }
  
  
  
}function setup() { 
  createCanvas(windowWidth, windowHeight);
} 
function draw() { 
  background(220);
  
  fill(255,0,0);
  
  for (var i = 0; i < touches.length; i++) {
      ellipse(touches[i].x, touches[i].y, 100, 50);
  }
  
}
var osc;
var playing = false;
var triangle1
var mic;
function preload() {
    soundFormats('mp3');
   mySound = loadSound('Gooey.mp3'); 
   mysound2=loadSound ('Gooey2.mp3');
}
function setup() { 
  createCanvas(1000, 300);
  textAlign(CENTER);
  backgroundColor = color('#ffe6e6');
  
  mic = new p5.AudioIn()
  mic.start();
  
  
  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.freq(240);
  osc.amp(3);
  osc.start();
} 
var counter = 0;
function draw() { 
  background(0,40,60);
  
  textSize(30)
  background(backgroundColor)
  text('Click me', width/2, height/2);
  
    micLevel = mic.getLevel();
  ellipse(350, constrain(height-micLevel*height*30, 0, height), 30, 40);
  
  
  fill('#f9f95e');
  triangle(180, 275, 208, 220, 236, 275);
  
  
  fill('#f9f95e');
  triangle(80, 175, 108, 120, 136, 175);
  
  fill('#f9f95e');
  triangle(80, 275, 108, 220, 136, 275);
  
 
}
function mousePressed() {
  counter++;
  if(mouseX > 180 && 
     mouseX < 208 &&
     mouseY > 220 &&
     mouseY < 275){
    
    if(mySound.isPlaying() == true){
      mySound.pause();
    }else{
      
   		mySound.play();
      
     
      }
    }
  }
function mouseClicked() {
  if (mouseX > 80 && mouseX < 3108 && mouseY < 175 && mouseY > 120) {
    if (!playing) {
      osc.amp(0.5, 0.05);
      playing = true;
       backgroundColor = color('#eeffcc');
      
    } else {
      osc.amp(0, 0.5);
      playing = false;
      backgroundColor = color('#ccffff');
    }
  }
}
var osc;
var playing = false;
var triangle1
var mic;
function preload() {
    soundFormats('mp3');
   mySound = loadSound('Gooey.mp3'); 
   mysound2=loadSound ('Gooey2.mp3');
}
function setup() { 
  createCanvas(1000, 300);
  textAlign(CENTER);
  backgroundColor = color('#ffe6e6');
  
  mic = new p5.AudioIn()
  mic.start();
  
  
  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.freq(240);
  osc.amp(3);
  osc.start();
} 
var counter = 0;
function draw() { 
  background(0,40,60);
  
  textSize(30)
  background(backgroundColor)
  text('Click me', width/2, height/2);
  
    micLevel = mic.getLevel();
  ellipse(350, constrain(height-micLevel*height*30, 0, height), 30, 40);
  
  
  fill('#f9f95e');
  triangle(180, 275, 208, 220, 236, 275);
  
  
  fill('#f9f95e');
  triangle(80, 175, 108, 120, 136, 175);
  
  fill('#f9f95e');
  triangle(80, 275, 108, 220, 136, 275);
  
 
}
function mousePressed() {
  counter++;
  if(mouseX > 180 && 
     mouseX < 208 &&
     mouseY > 220 &&
     mouseY < 275){
    
    if(mySound.isPlaying() == true){
      mySound.pause();
    }else{
      
   		mySound.play();
      
     
      }
    }
  }
function mouseClicked() {
  if (mouseX > 80 && mouseX < 3108 && mouseY < 175 && mouseY > 120) {
    if (!playing) {
      osc.amp(0.5, 0.05);
      playing = true;
       backgroundColor = color('#eeffcc');
      
    } else {
      osc.amp(0, 0.5);
      playing = false;
      backgroundColor = color('#ccffff');
    }
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
  
  loadPixels();
  for (var w = 0; w < width; w++) {
    for (var h = 0; h < height; h++) {
   		var r = pixels[4*((h*width) + w)];
      
      if (r > mouseX) { 
        pixels[4*((h*width) + w)] = 0;
        pixels[4*((h*width) + w) + 1] = 0;
        pixels[4*((h*width) + w) + 2] = 0;
      }
    }
  }
	updatePixels();
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
  
  loadPixels();
  for (var w = 0; w < width; w++) {
    for (var h = 0; h < height; h++) {
   		var r = pixels[4*((h*width) + w)];
   		pixels[4*((h*width) + w)+1] = r;
      pixels[4*((h*width) + w)+2] = r;
    }
  }
	updatePixels();
}let video;
function setup() { 
  createCanvas(400, 400);
  video = createCapture(VIDEO);
  video.hide();
} 
function draw() { 
  background(220);
  image(video,0,0,width,height);
  
  loadPixels();
  for (var w = 0; w < width; w++) {
    for (var h = 0; h < height; h++) {
   		var r = pixels[4*(h*width) + w];
      set(w, h, [r, 0, 50, 100]);
    }
  }
	updatePixels();
}let video;
function setup() { 
  createCanvas(400, 400, WEBGL);
  video = createCapture(VIDEO);
  video.hide();
} 
function draw() { 
  background(220);
  
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
    texture(video);
    sphere(50);
}let osc;
function setup() { 
  createCanvas(400, 1000);
  
	osc = new p5.Oscillator();
  osc.setType('sine');
  osc.freq(550);
  osc.amp(1);
  osc.start();  
} 
function draw() { 
  background(220);
  osc.freq(mouseY*20);
  
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
  audio.pan(panValue);
  
  var speed = map(mouseY, 0, height, 0, 4);
  audio.rate(speed);  
  
  if (!audio.isPlaying()) {
   audio.play(); 
  }
  
  ellipse(width/2, height/2, level.getLevel()*1000, level.getLevel()*1000);
}
function mousePressed() {
 audio.play(); 
}let audio;
function preload() {
 audio = loadSound("test.mp3"); 
  
}
function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
  
  var panValue = map(mouseX, 0, width, -1, 1);
  audio.pan(panValue);
  
  var speed = map(mouseY, 0, height, 0, 4);
  audio.rate(speed);  
  
  if (!audio.isPlaying()) {
   audio.play(); 
  }
}
function mousePressed() {
 audio.play(); 
}
var thedata;
var thelyric;
function preload() {
  thedata = loadJSON("test.json");
  thelyric = loadStrings("lines.txt");
  
  soundFormats('mp3');
   mySound = loadSound('Gooey.mp3'); 
}
function setup() { 
  createCanvas(1000, 300);
} 
var counter = 0;
function draw() { 
  background(0,40,60);
  text(thelyric[counter], 10,100);
  textSize(30)
  
  
  fill('#f9f95e');
  triangle(180, 275, 208, 220, 236, 275);
  
}
function mousePressed() {
  counter++;
  if(mouseX > 180 && 
     mouseX < 208 &&
     mouseY > 220 &&
     mouseY < 275){
    
    if(mySound.isPlaying() == true){
      mySound.pause();
    }else{
      
   		mySound.play();
      
      
}
  }
}
var inputBox;
var inputButton;
var xdir = 0;
var x = 0;
function inputWasInput() {
  var city = inputBox.value();
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
var bgValue = 0;
var vibrate1 = false;
var vibrate2 = false;
var timestamp = 0;
var img;
var img2;
var img3;
var img4;
var img5;
function preload() {
   
  img = loadImage("PP.png");
  img2 = loadImage("text.png");
  img3 = loadImage("cat.png");
  img4 = loadImage("DTM.png");
  img5 = loadImage("arrow.png");
  
  soundFormats('mp3');
   mySound = loadSound('HW Sound1.mp3'); 
   mySound2 = loadSound('HW Sound2.mp3');
   mySound3 = loadSound('HW Sound3.mp3');
}
function setup() {
  createCanvas(1900, 1600);
  background('#0c0c0c');
  image(img, 0, 17);
  image(img2, 90, 400);
  image(img3, 700, 400);
  image(img4, 900, 60);
  image(img5, 500, 60);
  
  
  
  
}
  for (var i = 0; i < portList.length; i++) {
      portName = portList[i];
    }
  }
}
  if (inData.length>0) {
    
     var values = splitTokens(inData, ',');
     var b1 = values[0];
     var b2 = values[1];
    
   if (b1 == '1'){
      if (millis() - timestamp > 1000){
        vibrate1 = true;
        timestamp = millis();        
      }
    }
    
    if (b2 == '1'){
      if (millis() - timestamp > 1000){
        vibrate2 = true;
        timestamp = millis();        
      }
      
    }
    
					
  }
}
 
function draw() { 
  
  strokeWeight(7);
  fill('#f48342');
  ellipse(300, 270, 350, 250);
  
  fill('#f9f95e');
  triangle(180, 275, 208, 220, 236, 275);
  triangle(350, 275, 378, 220, 406, 275);
  arc(300, 320, 200, 15, 0, PI+QUARTER_PI, CHORD);
  
  if (vibrate1){
    vibrate1 = false;
      
   					mySound.play(); 
  }
  
  if (vibrate2){
    vibrate2 = false;
      
   					mySound2.play(); 
  }
}
  
function mousePressed() {
  if(mouseX > 180 && 
     mouseX < 208 &&
     mouseY > 220 &&
     mouseY < 275 ){
    
    if(mySound.isPlaying() == true){
      mySound.pause();
    }else{
      
   		mySound.play();
      mySound2.pause();
      mySound3.pause();
      
 
    }
    
  } else {
    if(mouseX > 208 && 
     mouseX < 398 &&
     mouseY > 220 &&
     mouseY < 275){
    
  
    if(mySound2.isPlaying() == true){
      mySound2.pause();
    }else{
      
   		mySound2.play();
      mySound.pause();
      mySound3.pause();
  
    }
    }else{
    
      if(mouseX > 200 && 
     mouseX < 378 &&
     mouseY > 310 &&
     mouseY < 330){
        
    if(mySound3.isPlaying() == true){
      mySound3.pause();
    }else{
      
   		mySound3.play();
      mySound.pause();
      mySound2.pause();
      
    
      } 
    }
  }
    }
}
var bgValue = 0;
var vibrate1 = false;
var vibrate2 = false;
var timestamp = 0;
var img;
var img2;
var img3;
function preload() {
   
  img = loadImage("PP.png");
  img2 = loadImage("text.png");
  img3 = loadImage("cat.png");
  
  soundFormats('mp3');
   mySound = loadSound('HW Sound1.mp3'); 
   mySound2 = loadSound('HW Sound2.mp3');
   mySound3 = loadSound('HW Sound3.mp3');
}
function setup() {
  createCanvas(1900, 1600);
  background('#0c0c0c');
  image(img, 0, 17);
  image(img2, 90, 400);
  image(img3, 700, 400);
  
  
  
  
}
  for (var i = 0; i < portList.length; i++) {
      portName = portList[i];
    }
  }
}
  if (inData.length>0) {
    
     var values = splitTokens(inData, ',');
     var b1 = values[0];
     var b2 = values[1];
    
   if (b1 == '1'){
      if (millis() - timestamp > 1000){
        vibrate1 = true;
        timestamp = millis();        
      }
    }
    
    if (b2 == '1'){
      if (millis() - timestamp > 1000){
        vibrate2 = true;
        timestamp = millis();        
      }
      
    }
    
					
  }
}
 
function draw() { 
  
  strokeWeight(7);
  fill('#f48342');
  ellipse(300, 270, 350, 250);
  
  fill('#f9f95e');
  triangle(180, 275, 208, 220, 236, 275);
  triangle(350, 275, 378, 220, 406, 275);
  arc(300, 320, 200, 15, 0, PI+QUARTER_PI, CHORD);
  
  if (vibrate1){
    vibrate1 = false;
      
   					mySound.play(); 
  }
  
  if (vibrate2){
    vibrate2 = false;
      
   					mySound2.play(); 
  }
}
  
function mousePressed() {
  if(mouseX > 180 && 
     mouseX < 208 &&
     mouseY > 220 &&
     mouseY < 275 ){
    
    if(mySound.isPlaying() == true){
      mySound.pause();
    }else{
      
   		mySound.play();
      mySound2.pause();
      mySound3.pause();
      
 
    }
    
  } else {
    if(mouseX > 208 && 
     mouseX < 398 &&
     mouseY > 220 &&
     mouseY < 275){
    
  
    if(mySound2.isPlaying() == true){
      mySound2.pause();
    }else{
      
   		mySound2.play();
      mySound.pause();
      mySound3.pause();
  
    }
    }else{
    
      if(mouseX > 200 && 
     mouseX < 378 &&
     mouseY > 310 &&
     mouseY < 330){
        
    if(mySound3.isPlaying() == true){
      mySound3.pause();
    }else{
      
   		mySound3.play();
      mySound.pause();
      mySound2.pause();
      
    
      } 
    }
  }
    }
}
var bgValue = 0;
var vibrate = false;
var timestamp = 0;
var img;
var img2;
var img3;
function preload() {
   
  img = loadImage("PP.png");
  img2 = loadImage("text.png");
  img3 = loadImage("cat.png");
  
  soundFormats('mp3');
   mySound = loadSound('HW Sound1.mp3'); 
   mySound2 = loadSound('HW Sound2.mp3');
   mySound3 = loadSound('HW Sound3.mp3');
}
function setup() {
  createCanvas(1500, 800);
  background('#0c0c0c');
  image(img, 0, 17);
  image(img2, 90, 400);
  image(img3, 700, 400);
  
  
  
  
}
  for (var i = 0; i < portList.length; i++) {
      portName = portList[i];
    }
  }
}
  if (inData.length>0) {
    
     var values = splitTokens(inData, ',');
     var b1 = values[0];
     var b2 = values[1];
    
   if (b1 == '1'){
      if (millis() - timestamp > 1000){
        vibrate = true;
        timestamp = millis();        
      }
    }
    
    if (b2 == '1'){
      if (millis() - timestamp > 1000){
        vibrate = true;
        timestamp = millis();        
      }
      
    }
    
					
  }
}
 
function draw() { 
  
  strokeWeight(7);
  fill('#f48342');
  ellipse(300, 270, 350, 250);
  
  fill('#f9f95e');
  triangle(180, 275, 208, 220, 236, 275);
  triangle(350, 275, 378, 220, 406, 275);
  arc(300, 320, 200, 15, 0, PI+QUARTER_PI, CHORD);
  
  if (vibrate){
    vibrate = false;
      
   					mySound.play(); 
  }
}
  
function mousePressed() {
  if(mouseX > 180 && 
     mouseX < 208 &&
     mouseY > 220 &&
     mouseY < 275 ){
    
    if(mySound.isPlaying() == true){
      mySound.pause();
    }else{
      
   		mySound.play();
      mySound2.pause();
      mySound3.pause();
      
 
    }
    
  } else {
    if(mouseX > 208 && 
     mouseX < 398 &&
     mouseY > 220 &&
     mouseY < 275){
    
  
    if(mySound2.isPlaying() == true){
      mySound2.pause();
    }else{
      
   		mySound2.play();
      mySound.pause();
      mySound3.pause();
  
    }
    }else{
    
      if(mouseX > 200 && 
     mouseX < 378 &&
     mouseY > 310 &&
     mouseY < 330){
        
    if(mySound3.isPlaying() == true){
      mySound3.pause();
    }else{
      
   		mySound3.play();
      mySound.pause();
      mySound2.pause();
      
    
      } 
    }
  }
    }
}
var bgValue = 0;
function setup() {
  createCanvas(640, 480);
}
  for (var i = 0; i < portList.length; i++) {
      portName = portList[i];
    }
  }
}
  if (inData.length>0) {
    var d = split(inData, ',');
    console.log(d);
    if (d.length == 4) {
    	bgValue = parseInt(d[0]);
      switchState = parseInt(d[1]);
    	console.log("bgValue = " + bgValue);
    	console.log("switchState = " + switchState);      
    }
  }
}
function draw() {
  if (switchState == 1) { 
    background(bgValue/4);
  } else {
    background(255, 0, bgValue/4);
  }
  textSize(32);
  fill(0);
  stroke(0);
  fill(255, 0, 0);
  ellipse(100, 300, 50, 50);
  fill(0, 255, 0);
  ellipse(200, 300, 50, 50);
}
  if (mouseX < width/2) {
  } else {
  }
}
function keyPressed() {
  if (key>=0 && key<=9) {
  }
}
var bgValue = 0;
function setup() {
  createCanvas(640, 480);
}
  for (var i = 0; i < portList.length; i++) {
      portName = portList[i];
    }
  }
}
  if (inData.length>0) {
    var d = split(inData, ',');
    console.log(d);
    if (d.length == 4) {
    	bgValue = parseInt(d[0]);
      switchState = parseInt(d[1]);
    	console.log("bgValue = " + bgValue);
    	console.log("switchState = " + switchState);      
    }
  }
}
function draw() {
  if (switchState == 1) { 
    background(bgValue/4);
  } else {
    background(255, 0, bgValue/4);
  }
  textSize(32);
  fill(0);
  stroke(0);
  fill(255, 0, 0);
  ellipse(100, 300, 50, 50);
  fill(0, 255, 0);
  ellipse(200, 300, 50, 50);
}
  if (mouseX < width/2) {
  } else {
  }
}
function keyPressed() {
  if (key>=0 && key<=9) {
  }
}
var img;
var img2;
var img3;
function preload() {
   
  img = loadImage("PP.png");
  img2 = loadImage("text.png");
  img3 = loadImage("cat.png");
  
  soundFormats('mp3');
   mySound = loadSound('HW Sound1.mp3'); 
   mySound2 = loadSound('HW Sound2.mp3');
   mySound3 = loadSound('HW Sound3.mp3');
}
function setup() {
  createCanvas(1500, 800);
  background('#0c0c0c');
  image(img, 0, 17);
  image(img2, 90, 400);
  image(img3, 700, 400);
  
  
}
                    
 
function draw() { 
  
  strokeWeight(7);
  fill('#f48342');
  ellipse(300, 270, 350, 250);
  
  fill('#f9f95e');
  triangle(180, 275, 208, 220, 236, 275);
  triangle(350, 275, 378, 220, 406, 275);
  arc(300, 320, 200, 15, 0, PI+QUARTER_PI, CHORD);
  
}
  
function mousePressed() {
  if(mouseX > 180 && 
     mouseX < 208 &&
     mouseY > 220 &&
     mouseY < 275){
    
    if(mySound.isPlaying() == true){
      mySound.pause();
    }else{
      
   		mySound.play();
      mySound2.pause();
      mySound3.pause();
      
 
    }
    
  } else {
    if(mouseX > 208 && 
     mouseX < 398 &&
     mouseY > 220 &&
     mouseY < 275){
    
  
    if(mySound2.isPlaying() == true){
      mySound2.pause();
    }else{
      
   		mySound2.play();
      mySound.pause();
      mySound3.pause();
  
    }
    }else{
    
      if(mouseX > 200 && 
     mouseX < 378 &&
     mouseY > 310 &&
     mouseY < 330){
        
    if(mySound3.isPlaying() == true){
      mySound3.pause();
    }else{
      
   		mySound3.play();
      mySound.pause();
      mySound2.pause();
      
    
      } 
    }
  }
    }
}
let vol = 1.0;
var portName = '/dev/cu.usbmodem1421';
function setup() {
  createCanvas(800, 600);
}
  for (var i = 0; i < portList.length; i++) {
    console.log(i + " " + portList[i]);
  }
}
let mySound;
function preload() {
  mySound = loadSound('sound.mp3');
}
function draw() {
  fill('#00FF90');
  noStroke();									
  ellipse(width/2, height/2, circleSize, circleSize);
  
  if (!mySound.isPlaying()){
    mySound.play();
  mySound.setVolume(vol);  
}
  }
function serverConnected() {
  console.log('connected to server.');
}
function portOpen() {
}
   console.log(data);
  circleSize= data
}
function gotData(){
  
}
}
function portClose() {
}
let vol = 1.0;
function setup() {
  createCanvas(800, 600);
}
  for (var i = 0; i < portList.length; i++) {
    console.log(i + " " + portList[i]);
  }
}
let mySound;
function preload() {
  mySound = loadSound('sound.mp3');
}
function draw() {
  
   fill('#00FF90');
  
  ellipse(width/2, height/2, circleSize, circleSize);
  
  if (!mySound.isPlaying()){
    mySound.play();
  mySound.setVolume(vol);  
}
  }
function serverConnected() {
  console.log('connected to server.');
}
function portOpen() {
}
   console.log(data);
  circleSize= data
}
function gotData(){
  
}
}
function portClose() {
}
    
    created 9 Oct 2017
    by Tom Igoe
function setup() {
  createCanvas(800, 600);
}
  for (var i = 0; i < portList.length; i++) {
    console.log(i + " " + portList[i]);
  }
}
function draw() {
  
   fill('#00FF90');
  ellipse(width/2, height/2, circleSize, circleSize);
}
function serverConnected() {
  console.log('connected to server.');
}
function portOpen() {
}
   console.log(data);
  circleSize= data
}
}
function portClose() {
 
function setup() {
 
}
 
 for (var i = 0; i < portList.length; i++) {
 console.log(i + " " + portList[i]);
 }
  to your project folder and include it in 
  your index.html.
  
  app open.
  
  Make sure you only have one program accessing
  
  For a full tutorial:
var portName = '/dev/cu.usbmodem1421';
var bg = 0;
var col = 255;
var button = 1;
function setup() { 
  createCanvas(400, 400);
  
  
    Whenever data is received, the parseData()
    function defined below will run.
} 
function draw() { 
  background(bg);
  
  if (button == 0){
    noStroke();
    fill(col);
    ellipse(200,200,100);
  }
}
function gotData(){
  
    parseData() will run every time data
    strings until p5 receives a carriage return
    statement below filters these out and only
    updates our variables when we receive a
    complete batch of data - in our case, the
    three sensor values. Uncomment the else
    statement at the bottom to see how often
  if (inData.length > 0){
    
      Here I'm using the native js version of split.
      Below that you can see the p5 version 
      of split, which is commented out.
    var values = inData.split(',');
    
      Once we split the received data into
      individual values, we still need to convert
      them from strings to integers.
    button = int(values[0]);
    bg = int(map(values[1], 0, 1023, 0, 255));
    col = int(map(values[2], 0, 1023, 0, 255));
  }
  
  to your project folder and include it in 
  your index.html.
  
  app open.
  
  Make sure you only have one program accessing
  
  For a full tutorial:
var portName = '/dev/cu.usbmodem1421';
var bg = 0;
var col = 255;
var button = 1;
function setup() { 
  createCanvas(400, 400);
  
  
    Whenever data is received, the parseData()
    function defined below will run.
} 
function draw() { 
  background(bg);
  
  if (button == 0){
    noStroke();
    fill(col);
    ellipse(200,200,100);
  }
}
function gotData(){
  
    parseData() will run every time data
    strings until p5 receives a carriage return
    statement below filters these out and only
    updates our variables when we receive a
    complete batch of data - in our case, the
    three sensor values. Uncomment the else
    statement at the bottom to see how often
  if (inData.length > 0){
    
      Here I'm using the native js version of split.
      Below that you can see the p5 version 
      of split, which is commented out.
    var values = inData.split(',');
    
      Once we split the received data into
      individual values, we still need to convert
      them from strings to integers.
    button = int(values[0]);
    bg = int(map(values[1], 0, 1023, 0, 255));
    col = int(map(values[2], 0, 1023, 0, 255));
  }
  
}var name = "";
function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
  text(name, 10, 10);
}
function callback(data) {
  name = data.name + " " + data.surname;
}
function mousePressed() {
var xdir = 0;
var x = 0;
var thedata;
var inputBox;
var inputButton;
function preload() {
}
function inputWasInput() {
}
function jsonLoaded(newdata) {
  console.log(newdata);
  console.log("New Wind Speed: " + newdata.wind.speed);
  thedata = newdata;
	xdir = thedata.wind.speed;
}
function jsonNotLoaded(error) {
 console.log(error); 
}
function setup() { 
  createCanvas(400, 400);
  
  inputButton = createButton('load');
  inputButton.mousePressed(inputWasInput);
  inputButton.position(150, 10);
  inputButton.id("load");
  inputBox = createInput('city');
  inputBox.id("city");
  
  document.getElementById("load").addEventListener('click', function() {
    console.log(document.getElementById("city").value);
    
    var city = document.getElementById("city").value;
    
    
    
  });
  
  
  inputBox.input(inputWasInput);
	inputBox.position(10, 10);  
  
  xdir = thedata.wind.speed;
} 
function draw() { 
  background(220);
  ellipse(x, 100, 50, 50);
  x = x + xdir;
  if (x > width) { x = 0; }
}
var xdir = 0;
var x = 0;
var thedata;
var inputBox;
function preload() {
}
function inputWasInput() {
}
function setup() { 
  createCanvas(400, 400);
  
  inputBox = createInput('city');
  inputBox.input(inputWasInput);
	inputBox.position(10, 10);  
  
  xdir = thedata.wind.speed;
} 
function draw() { 
  background(220);
  ellipse(x, 100, 50, 50);
  x = x + xdir;
  if (x > width) { x = 0; }
}
var xdir = 0;
var x = 0;
var thedata;
function preload() {
}
function setup() { 
  createCanvas(400, 400);
  xdir = thedata.wind.speed;
} 
function draw() { 
  background(220);
  ellipse(x, 100, 50, 50);
  x = x + xdir;
  if (x > width) { x = 0; }
}
var thedata;
var thepoem;
function preload() {
  thedata = loadJSON("test.json");
  thepoem = loadStrings("lines.txt");
}
function setup() { 
  createCanvas(1000, 300);
} 
var counter = 0;
function draw() { 
  background(0,40,60);
  text(thepoem[counter], 10,100);
  textSize(30)
  
}
function mousePressed() {
  counter++;
}
var paragraphs;
var numHighlighted = 0;
function setup() {  
  for (var i = 0; i < 50; i++) {
    var par = createP('glass animals');
    par.position(random(600), random(1000));
  }
  paragraphs = selectAll('p');
  
  for (var i = 0; i < paragraphs.length; i++) {
    paragraphs[i].mouseOver(highlight);
    paragraphs[i].mouseOut(unhighlight);
  }
}
function highlight() {
  this.style('padding', '16pt');
  this.style('background-color', '#FFF');
  numHighlighted++;
  if (numHighlighted > 10) {
  }
}
function unhighlight() {
  this.style('padding', '0pt');
  this.style('background-color', '#4d8ab3');
}var paragraphs;
var numHighlighted = 0;
function setup() {  
  for (var i = 0; i < 50; i++) {
    var par = createP('glass animals');
    par.position(random(600), random(1000));
  }
  paragraphs = selectAll('p');
  
  for (var i = 0; i < paragraphs.length; i++) {
    paragraphs[i].mouseOver(highlight);
    paragraphs[i].mouseOut(unhighlight);
  }
}
function highlight() {
  this.style('padding', '16pt');
  this.style('background-color', '#FFF');
  numHighlighted++;
  if (numHighlighted > 10) {
  }
}
function unhighlight() {
  this.style('padding', '0pt');
  this.style('background-color', '#4d8ab3');
}function setup() { 
  createCanvas(400, 400);
  ｝
var paragraphs;
function setup() {  
  for (var i = 0; i < 50; i++) {
    var par = createP('glass animals');
    par.position(random(300), random(300));
  }
  paragraphs = selectAll('p');
  
  for (var i = 0; i < paragraphs.length; i++) {
    paragraphs[i].mouseOver(highlight);
    paragraphs[i].mouseOut(unhighlight);
  }
}
function highlight() {
  this.style('padding', '16pt');
  this.style('background-color', '#F0F');
}
function unhighlight() {
  this.style('padding', '0pt');
  this.style('background-color', '#FFF');
 
function setup() {
 
}
 
 for (var i = 0; i < portList.length; i++) {
 }
}
var ball1;
var ball2; 
var ball3;
var ball4;
var noiseScale=0.09;
function setup() {
  createCanvas(480, 270);
  
  ball2 = new ball(color(0),100,100,1);
  ball3 = new ball(color(0),20,20,80);
  ball5 = new ball(color(60),70,200,80);
  frameRate(30)
}
function draw() {
  background(0,76,153,20);
  ball1.move();
  ball1.display();
  ball2.move();
  ball2.display();
  ball3.move();
  ball3.display();
  ball5.move();
  ball5.display();
  
  for (var x=0; x < width; x++) {
    var noiseVal = noise((mouseX+x)*noiseScale, mouseY*noiseScale);
    stroke(noiseVal*100);
    line(x, mouseY+noiseVal*200, x, height);
}
}
class ball {
    this.c = tempC;
    this.xpos = tempXpos;
    this.ypos = tempYpos;
    this.xspeed = tempXspeed;
  }
  display() {
    stroke(100);
    fill(200,40,frameCount%256);
    ellipse(CENTER);
    ellipse(this.xpos,this.ypos,80,80);
  }
  move() {
    this.xpos = this.xpos + this.xspeed;
    if (this.xpos > width) {
      this.xpos = 0;
    }
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
  
  
}   
function draw() { 
  background(16,0,0)
	
  
  
  if (mouseIsPressed) {
    var nc = new Circle(mouseX,mouseY,10,random(2),random(2));
		circles.push(nc);
  }
  for (var i = 0; i < circles.length; i++) {
	  circles[i].display();
  }
  
  r.displayRect();
  r.moveRect();
  
  r1.displayRect();
  r1.moveRect();
  
  r2.displayRect();
  r2.moveRect();
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
  
  
}   
function draw() { 
  background(16,0,0)
	
  
  
  if (mouseIsPressed) {
    var nc = new Circle(mouseX,mouseY,10,random(2),random(2));
		circles.push(nc);
  }
  for (var i = 0; i < circles.length; i++) {
	  circles[i].display();
  }
  
  r.displayRect();
  r.moveRect();
  
  r1.displayRect();
  r1.moveRect();
  
  r2.displayRect();
  r2.moveRect();
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
  
  
}   
function draw() { 
  background(16,0,0)
	
  
  
    var nc = new Circle(mouseX,mouseY,10,random(2),random(2));
		circles.push(nc);
  }
  for (var i = 0; i < circles.length; i++) {
	  circles[i].display();
  }
  
  r.displayRect();
  r.moveRect();
  
  r1.displayRect();
  r1.moveRect();
  
  r2.displayRect();
  r2.moveRect();
}
	
  
var r;
var r1;
var r2;
var c;
var circles = [];
function setup() { 
  createCanvas(500, 500);
  
	  circles[i] = new Circle(random(width),random(height),10,random(2),random(2));
  }
  
  
  r = new Rectangle(0,0,60,80,0);
  r1 = new Rectangle(100,0,60,80,0);  
  r2 = new Rectangle(0,100,60,80,0);
  
	angleMode(degrees)
  rectMode(CENTER)
  
  
}   
function draw() { 
  background(16,0,0)
	
  
  for (var i = 0; i < circles.length; i++) {
	  circles[i].display();
  }
  
  r.displayRect();
  r.moveRect();
  
  r1.displayRect();
  r1.moveRect();
  
  r2.displayRect();
  r2.moveRect();
}
	
  
var r;
var r1;
var r2;
var c;
function setup() { 
  createCanvas(500, 500);
  
  r = new Rectangle(0,0,60,80,0);
  r1 = new Rectangle(100,0,60,80,0);  
  r2 = new Rectangle(0,100,60,80,0);
  
	angleMode(degrees)
  rectMode(CENTER)
  
  
}   
function draw() { 
  background(16,0,0)
	
  
  
  c.display();
  
  r.displayRect();
  r.moveRect();
  
  r1.displayRect();
  r1.moveRect();
  
  r2.displayRect();
  r2.moveRect();
}
	
  
var r;
var r1;
var r2;
var c;
function setup() { 
  createCanvas(500, 500);
  
  c = new Circle(40,50,10,10,2,1);／／
  r = new Rectangle(0,0,60,80,0);
  r1 = new Rectangle(100,0,60,80,0);  
  r2 = new Rectangle(0,100,60,80,0);
  
	angleMode(degrees)
  rectMode(CENTER)
  
  
}   
function draw() { 
  background(16,0,0)
	
  
  
  c.display();
  
  r.displayRect();
  r.moveRect();
  
  r1.displayRect();
  r1.moveRect();
  
  r2.displayRect();
  r2.moveRect();
}
	
  
var r;
var r1;
var r2;
var c;
function setup() { 
  createCanvas(500, 500);
  
  c = new Circle(40,50,10,10,2,1);／／
  r = new Rectangle(0,0,60,80,0);
  r1 = new Rectangle(100,0,60,80,0);  
  r2 = new Rectangle(0,100,60,80,0);
  
	angleMode(degrees)
  rectMode(CENTER)
  
  
}   
function draw() { 
  background(16,0,0)
	
  
  
  c.display();
  
  r.displayRect();
  r.moveRect();
  
  r1.displayRect();
  r1.moveRect();
  
  r2.displayRect();
  r2.moveRect();
}
	
  
var r;
var r1;
var r2;
var c;
function setup() { 
  createCanvas(500, 500);
  
  c = new Circle(40,50,10,10,2,1);／／
  r = new Rectangle(0,0,60,80,0);
  r1 = new Rectangle(100,0,60,80,0);  
  r2 = new Rectangle(0,100,60,80,0);
  
	angleMode(degrees)
  rectMode(CENTER)
  
  
}   
function draw() { 
  background(16,0,0)
	
  
  
  c.display();
  
  r.displayRect();
  r.moveRect();
  
  r1.displayRect();
  r1.moveRect();
  
  r2.displayRect();
  r2.moveRect();
}
	
  
var r;
var r1;
var r2;
var c;
function setup() { 
  createCanvas(500, 500);
  
  c = new Circle(40,50,10,10,2,1);／／
  r = new Rectangle(0,0,60,80,0);
  r1 = new Rectangle(100,0,60,80,0);  
  r2 = new Rectangle(0,100,60,80,0);
  
	angleMode(degrees)
  rectMode(CENTER)
  
  
}   
function draw() { 
  background(16,0,0)
	
  
  
  c.display();
  
  r.displayRect();
  r.moveRect();
  
  r1.displayRect();
  r1.moveRect();
  
  r2.displayRect();
  r2.moveRect();
}
	
  
var r;
var r1;
var r2;
var c;
function setup() { 
  createCanvas(500, 500);
  
  c = new Circle(40,50,10,10,2,1);／／
  r = new Rectangle(0,0,60,80,0);
  r1 = new Rectangle(100,0,60,80,0);  
  r2 = new Rectangle(0,100,60,80,0);
  
	angleMode(degrees)
  rectMode(CENTER)
  
  
}   
function draw() { 
  background(16,0,0)
	
  
  
  c.display();
  
  r.displayRect();
  r.moveRect();
  
  r1.displayRect();
  r1.moveRect();
  
  r2.displayRect();
  r2.moveRect();
}
	
  
var r;
var r1;
var r2;
var c;
function setup() { 
  createCanvas(500, 500);
  
  c = new Circle(40,50,10,10,2,1);／／
  r = new Rectangle(0,0,60,80,0);
  r1 = new Rectangle(100,0,60,80,0);  
  r2 = new Rectangle(0,100,60,80,0);
  
	angleMode(degrees)
  rectMode(CENTER)
  
  
}   
function draw() { 
  background(16,0,0)
	
  
  
  c.display();
  
  r.displayRect();
  r.moveRect();
  
  r1.displayRect();
  r1.moveRect();
  
  r2.displayRect();
  r2.moveRect();
}
	
  
class Rectangle {
	constructor(_x, _y, _w, _h, _angle) {
    this.x = _x;
    this.y = _y;
    this.w = _w;
    this.h = _h;
    this.angle = _angle;
  }
}
var r;
var r1;
var r2;
function setup() { 
  createCanvas(500, 500);
  
  r = new Rectangle(0,0,60,80,0);
  r1 = new Rectangle(100,0,60,80,0);  
  r2 = new Rectangle(0,100,60,80,0);
  
	angleMode(degrees)
  rectMode(CENTER)
  
  
} 
function displayRect(){
  push();
  translate(r.w,r.y);
  noFill ()
  stroke(200,0,0)
  strokeWeight (3)
  rotate(r.angle)
  rect(r.x,r.y,r.w,r.h)
  pop();
}
function moveRect(){
  r.angle = r.angle + 0.01
}
  
function draw() { 
  background(16,0,0)
	
  displayRect();
  
  moveRect();
  
}
	
  
function setup() { 
  createCanvas(400, 400);
} 
function mousePressed() {
  background(300);
}
function draw() { 
  var x = random(0, width);
  var y = random(0, height);
  ellipse(x,y,20,20);
  x = random ;
  y = random ;
  frameRate (20);
  ellipse(mouseX, mouseY, 40, 40);
  stroke(100);
  
  people();
  words();
  speaker();
  }
 function speaker(){
  rect(200,200,80,80);
  fill(244, 222, 215);
    
 }
 function people() {
  ellipse(130, 150, 40, 40);
  strokeWeight(2.0);
  strokeCap(ROUND)
  line(130, 170, 130, 280);
  line(130, 200, 230, 250);
  triangle(100, 320, 130, 280, 160, 320);
   
 }
 function words() {
  textSize(32);
  text("WA", 10, 30);
  fill(mouseX, mouseY, 153);
  text("WASH", 70, 60);
  fill(mouseX, mouseY, 153, 51);
  text("WASHING", 200, 90);
 }
var x2;
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
}
function loadFail() {
}
function preload() {
  img =loadImage("hbo.jjpg.jpg", loadSuc, loadFail);
}
function setup() { 
  createCanvas(800, 700);
  
} 
  
var d = 50;
var state = false;
var channel1 =false;
var channel2=false;
function draw() {
  
  background(253, 237, 236);
  image = (img, 0, 0);
  frameRate(15);
  
  strokeWeight(10);
  fill(212, 230, 241)
	rect(200, 200, 500, 400, 50);
  
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
  
  
    
  strokeCap(ROUND);
  fill(212, 230, 241  );
  rect(290, 600, 250, 20, 20, 15, 10, 5);
  
  strokeWeight(10);
  fill(212, 230, 241  )
  arc(420, 204, 90, 80, 135, 135, OPEN);
  fill(230)
  line(520, 120, 415, 164);
  line(370, 120, 415, 164);
  
  line(lx1, l1y, lx2, l1y);
  line(lx1, l2y, lx2, l2y);
  line(lx1, l3y, lx2, l3y);
  line(lx1, l4y, lx2, l4y);
  
  
  fill(213, 216, 220)
  ellipse(655, 530, d, d);
  
  
}
  function mousePressed() {
  if (dist(mouseX, mouseY, 655, 530) < d/2) {
    state = !state;
  }
  else if (mouseX>=lx1&&mouseX<=lx2&&mouseY<=(l1y+5)&&mouseY>=(l1y-5)){
    channel1 = !channel1;
  }
	else if (mouseX>=lx1&&mouseX<=lx2&&mouseY<=(l2y+5)&&mouseY>=(l2y-5)){
    channel2=!channel2;
  }
}
  
var x2;
var y2;
var w;
var h;
var lx1=640;
var lx2=670;
var l1y=300;
var l2y=350;
var l3y=400;
var l4y=450;
function setup() { 
  createCanvas(800, 700);
} 
  
var d = 50;
var state = false;
function draw() {
  background(253, 237, 236);
  frameRate(15);
  
  strokeWeight(10);
  fill(212, 230, 241  )
	rect(200, 200, 500, 400, 50);
  
  x2=225;
  y2=240;
  w=390;
  h=320;
  if (state) {
  stroke(10);
  fill(213, 216, 220);
	rect(x2,y2,w,h,50);
	} 
  else {
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
    
  strokeCap(ROUND);
  fill(212, 230, 241  );
  rect(290, 600, 250, 20, 20, 15, 10, 5);
  
  strokeWeight(10);
  fill(212, 230, 241  )
  arc(420, 204, 90, 80, 135, 135, OPEN);
  fill(230)
  line(520, 120, 415, 164);
  line(370, 120, 415, 164);
  
  line(lx1, l1y, lx2, l1y);
  line(lx1, l2y, lx2, l2y);
  line(lx1, l3y, lx2, l3y);
  line(lx1, l4y, lx2, l4y);
  
  
  fill(213, 216, 220)
  ellipse(655, 530, d, d);
  
  
}
  function mousePressed() {
  if (dist(mouseX, mouseY, 655, 530) < d/2) {
    state = !state;
  }
}
  
function setup() { 
  createCanvas(800, 700);
} 
function draw() { 
  background('rgba(0,200,100, 0.60)');
  
  fill(300)
	rect(200, 200, 500, 400, 50);
  
  fill(200)
	rect(225, 240, 390, 320, 50);
  
  fill(300)
  rect(290, 600, 250, 20, 20, 15, 10, 5);
  
  fill(300)
  arc(420, 204, 90, 80, 135, 135, OPEN);
  line(520, 120, 415, 164);
  line(370, 120, 415, 164);
  
  line(640, 300, 670, 300);
  line(640, 350, 670, 350);
  line(640, 400, 670, 400);
  line(640, 450, 670, 450);
  
  strokeWeight(12.0);
  strokeCap(ROUND);
  }
  
  
var d = 50;
var state = false;
function draw() {
  if (state) {
  fill(50)
	rect(225, 240, 390, 320, 50);
  } else {
  fill(200)
	rect(225, 240, 390, 320, 50);
  }
  fill(300)
  ellipse(700, 550, d, d);
}
  function mousePressed() {
  if (dist(mouseX, mouseY, 500, 300) < d/2) {
    state = !state;
  }
}
  
  
function setup() { 
  createCanvas(800, 700);
} 
  
var d = 50;
var state = false;
function draw() {
  background('rgba(0,200,100, 0.60)');
    for ( var x = 0; x < width; x = x+50) {
    for (var y = 0; y < height; y = y+50) {
      fill(x, y, frameCount%256)
    line( x , y, mouseX, mouseY);
      stroke( ROUND)
  
  
  fill(300)
	rect(200, 200, 500, 400, 50);
  
  if (state) {
  fill(50)
	rect(225, 240, 390, 320, 50);
  } else {
  fill(200)
	rect(225, 240, 390, 320, 50);
  }
  
  fill(300)
  rect(290, 600, 250, 20, 20, 15, 10, 5);
  
  fill(300)
  arc(420, 204, 90, 80, 135, 135, OPEN);
  line(520, 120, 415, 164);
  line(370, 120, 415, 164);
  
  line(640, 300, 670, 300);
  line(640, 350, 670, 350);
  line(640, 400, 670, 400);
  line(640, 450, 670, 450);
  
  strokeWeight(12.0);
  strokeCap(ROUND);
  
  fill(300)
  ellipse(655, 530, d, d);
}
  function mousePressed() {
  if (dist(mouseX, mouseY, 655, 530) < d/2) {
    state = !state;
  }
}
  
  
var d = 40;
var state = false;
function setup() { 
  createCanvas(800, 700);
} 
function draw() { 
   if (state) {
    background('rgba(0,200,100, 0.60)');
  } else {
    background(255);
  }
  ellipse(500, 300, d, d);
}
  
  
	rect(200, 200, 500, 400, 50);
	rect(225, 240, 390, 320, 50);
  rect(290, 600, 250, 20, 20, 15, 10, 5);
  arc(420, 204, 90, 80, 135, 135, OPEN);
  line(520, 120, 415, 164);
  line(370, 120, 415, 164);
  
  strokeWeight(12.0);
  strokeCap(ROUND);
  line(640, 300, 670, 300);
  line(640, 350, 670, 350);
  line(640, 400, 670, 400);
  line(640, 450, 670, 450);
｝
}
function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(20, 30, 20,20 );
  
  for ( var x = 0; x < width; x = x+50) {
    for (var y = 0; y < height; y = y+50) {
      fill(x, y, frameCount%256)
    line( x , y, mouseX, mouseY);
      stroke( ROUND)
    
   }
 } 
  
}
function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(20,30, 20,20 );
  
  
  
  
    
   }
 } 
  
}
function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
  
  for ( var x = 0; x < width; x = x+50) {
    for (var y = 0; y < height; y = y+50) {
    line( x , y, mouseX, mouseY);
    
   }
 } 
  
}
function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
}function setup() { 
  createCanvas(400, 400);
} 
function mousePressed() {
  background(220);
}
function draw() { 
  background(100,0,0,0);  
  var x = random(0, width);
  var y = random(0, height);
  ellipse(x,y,20,20);
  
  
  x = random ;
  y = random ;
  frameRate (20);
  rect(200,200,80,80);
  fill(244, 222, 215);
  ellipse(mouseX, mouseY, 40, 40);
  stroke(100);
  
  ellipse(130, 150, 40, 40);
  strokeWeight(2.0);
  strokeCap(ROUND)
  line(130, 170, 130, 280);
  line(130, 200, 230, 250);
  triangle(100, 320, 130, 280, 160, 320);
  textSize(32);
text("WA", 10, 30);
fill(mouseX, mouseY, 153);
text("WASH", 70, 60);
fill(mouseX, mouseY, 153, 51);
text("WASHING", 200, 90);
  
}function setup() { 
  createCanvas(400, 400);
} 
function mousePressed() {
  background(220);
}
function draw() { 
  background(100,0,0,0);  
  var x = random(0, width);
  var y = random(0, height);
  ellipse(x,y,20,20);
  
  
  x = random ;
  y = random ;
  frameRate (20);
  rect(200,200,80,80);
  fill(244, 222, 215);
  ellipse(mouseX, mouseY, 40, 40);
  stroke(100);
  
  ellipse(130, 150, 40, 40);
  strokeWeight(2.0);
  strokeCap(ROUND)
  line(130, 170, 130, 280);
  line(130, 200, 230, 250);
  triangle(100, 320, 130, 280, 160, 320);
  textSize(32);
text("WA", 10, 30);
fill(mouseX, mouseY, 153);
text("WASH", 70, 60);
fill(mouseX, mouseY, 153, 51);
text("WASHING", 200, 90);
  
}var x, y;
function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(300);
  stroke(255);
  
  rect(200,200,80,80)
  fill(244, 222, 215)
  ellipse(225, 288, 40, 40)
  stroke(0);
  
  
  
  ellipse(130, 150, 40, 40)
  line(130, 170, 130, 280)
  line(130, 200, 230, 250)
  triangle(100, 320, 130, 280, 160, 320)
  x = random( 0,width);
  y = random (0, height);
  frameRate (1);
  fill (mouseX, mouseY,110)
  line(290, 220, x, y)
 
  line(290, 240, x, y)
  line(290, 260, x, y);
 
  
  
}
function setup() { 
  createCanvas(400, 400);
  
  frameRate(50)
  
  
  x = random(0, width);
  y = random(0, height);
} 
function draw() { 
  background(220);
  
  rect(x, y, 20,50);
  
}
function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(300);
  stroke(255);
  
  rect(200,200,80,80)
  fill(244, 222, 215)
  ellipse(225, 288, 40, 40)
  stroke(0);
  
  line(290, 220, 350, 180)
  line(290, 240, 350, 240)
  line(290, 260, 350, 280);
 
  
  ellipse(130, 150, 40, 40)
  line(130, 170, 130, 280)
  line(130, 200, 230, 250)
  triangle(100, 320, 130, 280, 160, 320)
  
  
  
}