let osc1, osc2;
let fft;
let mic;
function setup() {
  createCanvas(400, 400);
  
	osc1 = new p5.Oscillator();
  osc1.setType('sine');
  osc1.freq(440);
  osc1.start();
  
  osc2 = new p5.Oscillator();
  osc2.setType('sine');
  osc2.freq(440);
  osc2.start();
  
  fft = new p5.FFT();
  
  
  fft.setInput(osc2);
  
}
function draw() {
  background(220);
  let freq = map(mouseX, 0, width, 440, 880);
  osc2.freq(freq);
  text(freq, width/2, 100);
  
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
  
  fft = new p5.FFT();
  fft.setInput(osc);
}
function draw() {
  background(220);
  let freq = map(mouseX, 0, width, 440, 880);
  osc.freq(freq);
  
  let bins = fft.analyze();
  
  for(let b in bins) {
   	let bin = bins[b];
   	line(b, 0, b, bin);
  }
  
  
ml5 Example
Basic Pitch Detection
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
ml5 Example
PoseNet example using p5.js
let video;
let poseNet;
let poses = [];
function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  poseNet = ml5.poseNet(video, modelReady);
}
function modelReady() {
  select('#status').html('Model Loaded');
  poseNet.on('pose', function(results) {
    poses = results;
  });
}
function draw() {
  image(video, 0, 0, width, height);
  drawKeypoints();
  drawSkeleton();
}
function drawKeypoints()  {
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i].pose;
    
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
     
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}
function drawSkeleton() {
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    console.log(skeleton);
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}
ml5 Example
Webcam Image Classification using MobileNet and p5.js
This example uses a callback pattern to create the classifier
let classifier;
let video;
function setup() {
  noCanvas();
  video = createCapture(VIDEO);
  classifier = ml5.imageClassifier('MobileNet', video, modelReady);  
}
function modelReady() {
  select('#status').html('Model Loaded');
  classifyVideo();
}
function classifyVideo() {
  classifier.predict(gotResult);
}
function gotResult(err, results) {
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
ml5 Example
Image classification using MobileNet and p5.js
This example uses a callback pattern to create the classifier
const classifier = ml5.imageClassifier('MobileNet', modelReady);
let img;
function preload() {
  img = createImg("images/bird.jpg");
  img.elt.crossOrigin = "Anonymous";
  img.size(400, 400);
}
function setup() {
  noCanvas();
}
function modelReady() {
  select('#status').html('Model Loaded')
  classifier.predict(img, gotResult);
}
function gotResult(err, results) {
  console.log(results);
  if (err) {
    console.error(err);
  }
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
      if (x > mouseX - 10 && x < mouseX + 10) {
        capture.set(x, y, [0, 0, 0, 0]);
      }
    }
  }
  capture.updatePixels();
let allWords = [];
let ts = 16;
let i = 0;
function preload() {
  let q = "trump";
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
  let docs = data.response.docs;
  console.log("docs", docs);
	
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
}let img;
function preload() {
}
function setup() {
  createCanvas(400, 400);
  
  img.loadPixels();
  for (let i = 0; i < img.pixels.length; i++) {
    if(i%4 == 0) img.pixels[i] = 255;
    if(i%4 == 3) img.pixels[i] = 255;
  }
  img.updatePixels();
  
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
      let d = dist(x, y, mouseX, mouseY);
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
}
function draw() {
  background(0);
  image(capture, 0, 0, width, height);
  let brightest = 0;
  
  let bright = {
    x: 0,
    y: 0
  };
  let level = mic.getLevel();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let c = capture.get(x, y);
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
let balls = [];
function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 10; i++) {
    balls.push(new Ball(random(width), random(height), random(-5, 5), random(-5, 5)));
  }
}
function draw() {
  background(220);
  for (let b = 0; b < balls.length; b++) {
    balls[b].run();
    for (let c = b + 1; c < balls.length; c++) {
      if (balls[b].isNear(balls[c])) {
        balls.splice(c, 1);
        balls.splice(b, 1);
      }
    }
  }
let data;
function setup() {
    createCanvas(600, 600);
  noFill();
  strokeWeight(10);
}
function processData(){
  console.log(inString);
 if(!inString) return;
  data = inString;
}
function draw() { 
  background(127, 0, 127);
  
  data = map(data, 700, 900, 0, width);
  var v = data; 
  ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);
  ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
	
  bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
  v+=random(-5, 5);
  bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);
}
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
}
function processData() {
  if (inString) {
    console.log(inString);
  }
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
function setup() {
  createCanvas(600, 600);
}
function draw() {
  background('blue');
  fill(255);
  strokeWeight(0);
  text(sensorValue, 20, 20);
	
  
  
  var v = map(data, 700,900, 0, width);
	ellipse(v, height/2, 20, 20);
  
  fill(255, 0, 0);
  strokeWeight(10);
  noFill();
  ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);
  ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
  bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);
	
  bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
}
function processData() {
	if (!inString) return;
	data = inString.trim();
}
let allWords = [];
let ts = 16;
let i = 0;
function preload() {
  let q = "trump";
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
let allTokens = [];
let ts = 16;
let i = 0;
function preload() {
  let q = "trump";
  let apikey = "5fcc7b03d74d15972346cf84719ad5e5:13:68130021";
  loadJSON(url, showSnippets);
}
function setup() {
  createCanvas(800, 800);
  fill(0);
}
function draw() {
  background(255, 5);
  ts++;
  ts %= 48;
  if (allTokens.length > 0) {
    i += 1;
    i %= allTokens.length;
    textSize(ts);
    text(allTokens[floor(i)], random(width), random(height));
  }
}
function showSnippets(data) {
  let docs = data.response.docs;
  console.log(data.response.docs.length);
  let putin = ["Putin", "Vladi", "Vlad", "Vova"];
  let trump = ["Trump", "Trump's", "president", "President"];
  for (let i = 0; i < docs.length; i++) {
    let tokens = splitTokens(docs[i].snippet);
    for (var j = 0; j < tokens.length; j++) {
      for (let k = 0; k < trump.length; k++) {
        let m = trump[k];
        if (match(tokens[j], m)) {
          console.log(match(tokens[j], m));
          tokens[j] = putin[floor(random(putin.length))];
          console.log(tokens[j]);
          break;
        }
      }
      shuffle(tokens, true);
    }
    allTokens = concat(allTokens, tokens);
  }
}let segments;
let words = [];
function setup() {
  createCanvas(400, 400);
  segments = loadStrings("text.txt", function(data) {
    for (let d of data) {
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
  }
function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER);
}
function draw() {
  background(220);
  ellipse(data[0]/4, data[1]/4, 50);
}
function gotData() {
  if(!inBytes) return;
  console.log(inBytes);
  data = inBytes.split(',');
}
function mousePressed() {
}var osc;
var playing = false;
function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER);
}
function draw() {
  background(220);
  ellipse(data[0]/4, data[1]/4, 50);
}
function gotData() {
  if(!inBytes) return;
  console.log(inBytes);
  data = inBytes.split(',');
  
let xys = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function gotData() {
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
  ellipse((sumY - 400), height/2, 10, 10);
var lowest = 1000;
var highest = 0;
function setup() {
  createCanvas(600, 600);
}
function draw() {
  background('blue');
  fill(255);
  strokeWeight(0);
  text(sensorValue, 20, 20);
	
  if(sensorValue < lowest && sensorValue > 0) lowest = sensorValue;
  if(sensorValue > highest) highest = sensorValue;
  
  
  var v = map(sensorValue, lowest, highest, 0, width);
	ellipse(v, height/2, 20, 20);
  
  fill(255, 0, 0);
  strokeWeight(10);
  noFill();
  ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);
  ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
  bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);
	
  bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
}
 for (var i = 0; i < portList.length; i++) {
 }
}
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
    rects[r].mouseOver(mouseX, mouseY)
  }
}function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
let balls = [];
function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 10; i++) {
    balls.push(new Ball(random(width), random(height), random(-5, 5), random(-5, 5)));
  }
}
function draw() {
  background(220);
  
  for (let b in balls) {
   balls[b].run(); 
    
    if(balls[b].isNear(mouseX, mouseY)){
      balls.splice(b, 1);
    }
  }
}function setup() {
  createCanvas(400, 400);
  var i = 5;
  for (var i = 0; i < 100; i++) {}
  i++;
  console.log("Loop uses var: " + i);
  var i = 5;
  for (let i = 0; i < 100; i++) {}
  i++;
  console.log("Loop uses let: " + i);
}
function draw() {
  background(220);
}let WIDTH = 10240;
let HEIGHT = 922;
let scl = 0.1875;
function setup() {
  createCanvas(WIDTH*scl, HEIGHT*scl);
}
function draw() {
  background(255);
  push();
  scale(scl, scl);
  strokeWeight(50);
  rect(400, 100, 1000, 600);
  pop();  
  push();
  scale(1, 1);
  strokeWeight(50*scl);
  ellipse(mouseX, mouseY, 50*scl, 50*scl);
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
	bgspeed = bounce (bg, 0, 255, bgspeed);
  xspeed = bounce(x, 0, width, xspeed);
  yspeed = bounce(y, 0, height, yspeed);
  
  bg += bgspeed;
  x += xspeed;
  y += yspeed;
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
  for (let col = 0; col < numCols; col++) {
    for (let row = 0; row < numRows; row++) {
      let x = col * colW;
      let y = row * rowH;
      let d = dist(mouseX, mouseY, x, y);
      d = map(d, 0, dist(0, 0, width, height), 255, 0);
      fill(d);
      rect(x, y, colW, rowH);
    }
  }
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
    let x = i * width/10;
    if (i == 7) fill('blue');
    else fill('white');
    line(x, 0, x, height);
  }
  
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
  
  
  yspeed = (y-mouseY)/100;
}let x;
let xspeed = 10;
function setup() {
  createCanvas(400, 400);
  x = 0;
}
function draw() {
  background(220);
  
  ellipse(x, height/2, 50, 50);
  
  x+=xspeed;
  
  if(x > width || x < 0) xspeed *=-1;
  
}let leftIsOn = false;
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  if (leftIsOn) {
    fill('red');
    rect(0, 0, width / 3, height);
  }
  if (mouseX < width / 3) {
  }
  else if (mouseX < 2 * width / 3) {
    fill('red');
    rect(width / 3, 0, width / 3, height);
  }
  else {
    fill('red');
    rect(2 * width / 3, 0, width / 3, height);
  }
}
function mousePressed() {
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
  
  
  
  
  x += xspeed;
  
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
  
  x = x - xspeed;
  y = y + (xspeed*.2);
  ellipse(x, y, 50, 50);
}let lx, rx, ty, by;
let cx, cy;
let w, h;
function setup() {
  rectMode(CENTER);
}
function draw() {
  createCanvas(frameCount, frameCount);
  cx = width/4;
  cy = height/2;
  hw = width/5;
  hh = height/20;
  
  
  lx = cx - hw;
  rx = cx + hw;
  ty = cy - hh;
  by = cy + hh;
  
  background(220);
  line(lx, ty, rx, ty);
  
  line(rx, ty, rx, by);
  
  line(rx, by, lx, 1.5*by);
  
  line(lx, by, lx, ty);
  
  
}
function setup() {
  createCanvas(400, 400);
}
function draw() {
  
  let d = dist(mouseX, mouseY, pmouseX, pmouseY);
  let sw = map(d, 100, 0, 10, 1);
  strokeWeight(sw);
  line(mouseX, mouseY, pmouseX, pmouseY);
that is always 10% of the width and 10% of the height.
This is how you define 1 frame that also defines all future frames.
Move createCanvas() down to draw() and see what happens.
So we're going to re-write the rect() function by drawing lines
and creating x and y variables for each corner of the quadrilateral.
easily define relationships between corners. (e.g. Let's make the
the upper right hand corner is always higher than the left.)
let x, y, w, h;
let l, r, t, b;
let ltx, lty, rtx, rty, rbx, rby, lbx, lby;
function setup() {
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
  
  lt = { x : l, y : t };
  rt = { x : r, y : t };
  rb = { x : r, y : b };
  lb = { x : l, y : b };
  
  background(220);
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
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
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
 * Loads a the camera to be used in the demo
 *
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
 * Feeds an image to posenet to estimate poses - this is where the magic
 * happens. This function loops with a requestAnimationFrame method.
function detectPoseInRealTime(video, net) {
  const canvas = document.getElementById('output');
  const ctx = canvas.getContext('2d');
  const flipHorizontal = true;
  canvas.width = videoWidth;
  canvas.height = videoHeight;
  async function poseDetectionFrame() {
    if (guiState.changeToArchitecture) {
      guiState.net.dispose();
      guiState.net = await posenet.load(+guiState.changeToArchitecture);
      guiState.changeToArchitecture = null;
    }
    stats.begin();
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
    stats.end();
    requestAnimationFrame(poseDetectionFrame);
  }
  poseDetectionFrame();
}
 * Kicks off the demo by loading the posenet model, finding and loading
 * available camera devices, and setting off the detectPoseInRealTime function.
async function bindPage() {
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
 * Draws a line on a canvas, i.e. a joint
function drawSegment([ay, ax], [by, bx], color, scale, ctx) {
  ctx.beginPath();
  ctx.moveTo(ax * scale, ay * scale);
  ctx.lineTo(bx * scale, by * scale);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.stroke();
}
 * Draws a pose skeleton by looking up all adjacent keypoints/joints
function drawSkeleton(keypoints, minConfidence, ctx, scale = 1) {
  const adjacentKeyPoints = posenet.getAdjacentKeyPoints(
    keypoints, minConfidence);
  adjacentKeyPoints.forEach((keypoints) => {
    drawSegment(toTuple(keypoints[0].position),
      toTuple(keypoints[1].position), color, scale, ctx);
  });
}
 * Draw pose keypoints onto a canvas
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
 * Draw the bounding box of a pose. For example, for a whole person standing
 * in an image, the bounding box will begin at the nose and extend to one of
 * ankles
function drawBoundingBox(keypoints, ctx) {
  const boundingBox = posenet.getBoundingBox(keypoints);
  ctx.rect(boundingBox.minX, boundingBox.minY,
    boundingBox.maxX - boundingBox.minX, boundingBox.maxY - boundingBox.minY);
  ctx.stroke();
}
 * Converts an arary of pixel data into an ImageData object
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
 * Draw an image on a canvas
function renderImageToCanvas(image, size, canvas) {
  canvas.width = size[0];
  canvas.height = size[1];
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);
}
 * Draw heatmap values, one of the model outputs, on to the canvas
 * Read our blog post for a description of PoseNet's heatmap outputs
function drawHeatMapValues(heatMapValues, outputStride, canvas) {
  const ctx = canvas.getContext('2d');
  const radius = 5;
  const scaledValues = heatMapValues.mul(tf.scalar(outputStride, 'int32'));
  drawPoints(ctx, scaledValues, radius, color);
}
 * Used by the drawHeatMapValues method to draw heatmap points on to
 * the canvas
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
 * Draw offset vector values, one of the model outputs, on to the canvas
 * Read our blog post for a description of PoseNet's offset vector outputs
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
  for (let i = 0; i < positions.length; i++) {
    if(i > 0) break;
    let pos = positions[i];
    ellipse(pos.x, pos.y, 5, 5);
  }
  text(frameRate(), 10, 10);
}
function getPose() {
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
  if (millis() - lm > RATE) {
		lm = millis();
    for (let n = 0; n < notes.length; n++) {
      let note = notes[n];
      note.display(false);
    }
    nindex++;
    nindex %= notes.length;
    notes[nindex].run(people);
    notes[nindex].display(true);
  }
  for (let p = people.length - 1; p >= 0; p--) {
    let person = people[p];
    person.display();
    if (person.zap()) {
      people.splice(p, 1);
    }
  }
}
function mousePressed() {
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
  if (millis() - lm > RATE) {
		lm = millis();
    for (let n = 0; n < notes.length; n++) {
      let note = notes[n];
      note.display(false);
    }
    nindex++;
    nindex %= notes.length;
    notes[nindex].run(people);
    notes[nindex].display(true);
  }
  for (let p = people.length - 1; p >= 0; p--) {
    let person = people[p];
    person.display();
    if (person.zap()) people.splice(p, 1);
  }
}
function mousePressed() {
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
}
function setup() {
  createCanvas(720,100);
  background(0);
  reverb = new p5.Reverb();
  delay = new p5.Delay();
  
}
function mousePressed() {
  s++;
  s%=sounds.length;
  sounds[s].loop();
let i = 0;
function setup() {
  createCanvas(400, 400);
  background(255, 0, 0);
  fill(255, 255, 255, 100);
  textSize(72);
  textAlign(CENTER);
  text("click me", width / 2, height / 2);
  listbutton = createButton('List Voices');
  listbutton.position(180, 430);
  listbutton.mousePressed(doList);
}
function draw() {
}
function doList() {
}
function keyPressed() {
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
	len.rotate(la);
  let end = p5.Vector.add(begin, len);
  line(begin.x, begin.y, end.x, end.y);
let x = 0;
let tx = 0;
let bg = 255;
let maxVoices = 5;
let numVoices = 0;
let voices = [];
let vb;
let pitches = [];
function preload() {
  for (let i = 0; i < 6; i++) {
  }
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(bg);
  noFill();
  vb = new Dartboard(maxVoices, 2);
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
  x++;
  if (x > width * (tx + 1)) {
    tx++;
    background(bg);
  }
  push();
  translate(-width * tx, 0);
  if (numVoices > 0) {
    for (let i = maxVoices - 1; i >= 0; i--) {
      if (voices[i] == null) {
        continue;
      }
      if (voices[i].isDead()) {
        numVoices--;
        cue();
      } else if (voices[i].run()) {
        run(i);
      }
    }
  }
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
function cue() {
  let numToAdd = vb.fire() + 1;
  console.log("CUE", numToAdd);
  if (numToAdd > 0) {
    add(numToAdd);
  }
}
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
  initialize();
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
    if (square.die() == true) {
      springs.splice(i, 1);
      squares.splice(i, 1);
    }
  }
  curtain();
}
  toss = int(random(1000));
  if (toss % 33 == 0) {
    springs.push(new Spring((noise(t + random(10)) * width * -1), (noise(t + random(100)) * noise(t) * random(0.01))));
    squares.push(new Square((noise(t + random(100)) * 250)));
    t += random(-1, 5);
  }
}
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
  }
    this.r_angle -= noise(t) * random(0.375);
  }
    this.w_square += noise(t) * random(-10, 10);
    this.h_square += noise(t) * random(-10, 10);
    this.h_square = constrain(this.h_square, 0, 50);
  }
    this.o_square += noise(t) * random(-10, 10);
    this.o_square = constrain(this.o_square, 100, 255);
  }
    this.acceleration.x = sin(this.r_angle) * noise(t) * random(-3, 5);
  }
    if (this.location.x > width) {
      return true;
    }
    return false;
  }
    let app_force = spr_force.copy();
    this.acceleration.add(app_force);
  }
    this.location.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.acceleration.mult(0);
  }
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
  }
	fill(255);
  textSize(18);
  text(frameRate() + ":   " + cam.width, 50, 50);
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
  let sum = 0;
  let octave = keyboard[0];
  for (let n = 0; n < octave.length; n++) {
    let note = octave[n];
    sum += note._rh;
  }
  mult = height / sum;
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
function updateRelativeNotes(t, tn) {
  if (tn.counter <= 0) return;
  for (let o = 0; o < keyboard.length; o++) {
    let octave = keyboard[o];
    for (let n = 0; n < octave.length; n++) {
      let note = keyboard[o][n];
      let rn = n >= t ? n - t : (n + (octave.length - 1)) - t;
      let h = (areas[rn] - note.h);
      note.modulate(areas[rn], tn.counter * stepSize);
    }
  }
}
function calcRatios() {
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
  MIN = 10;
  MAX = height / num;
  for (let i = 0; i < num; i++) {
    let d = random(MIN, MAX);
    data.push(d);
  }
  let colW = width / data.length;
  fill(0);
  for (let i = 0; i < data.length; i++) {
    let x = (i * colW) + colW / 2;
    let y = data[i];
    ellipse(x, y, 10, 10);
  }
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += data[i];
  }
  line(0, sum, width, sum);
  text("ADD", 10, sum);
  let mean = sum / data.length;
  line(0, mean, width, mean);
  text("MEAN", 50, mean);
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
  let addSubtract = 0;
  let F = 0.65*MAX;
  for (let i = 0; i < data.length; i++) {
    let d = data[i];
    if (d >= F) addSubtract += d;
    else addSubtract -= d;
  }
  line(0, addSubtract, width, addSubtract);
  text("ADD/SUBTRACT", 150, addSubtract);
  let sumDeviation = 0;
  for (let i = 0; i < data.length; i++) {
    let deviation = abs(data[i] - mean);
    sumDeviation += deviation;
  }
  let avgDeviation = sumDeviation / data.length;
  line(0, avgDeviation, width, avgDeviation);
  text("AVG DEVIATION", 250, avgDeviation);
  let sqSum = 0;
  for (let i = 0; i < data.length; i++) {
    let d = data[i];
    sqSum += ((d * d) / (MAX * MAX)) * MAX;
  }
  let sqmean = sqSum / data.length;
  line(0, sqmean, width, sqmean);
  text("MEAN OF SQUARES", width - 150, sqmean);
}
Mimi Yin NYU-ITP
Trisect space.
Horizontal and Vertical.
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
  
  w += wspeed;
  h += hspeed;
  
  if(w < 0 || w > width/2) wspeed *= -1;
  if(h < 0 || h > height/2) hspeed *= -1;
	
  if (horizontal) rect(width/2, height/2, width, h);
  else rect(width/2, height/2, w, height);
}
function keyPressed() {
  switch (keyCode) {
    case ESCAPE:
      horizontal = !horizontal;
      w = 0;
      h = 0;
      break;
  }
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
  for (var col = 0; col < cols; col++) {
    for (var row = 0; row < rows; row++) {
      if ((col % 2 == 0 && row % 2 == 1) || (col % 2 == 1 && row % 2 == 0)) fill(invert ? 255 : 0);
      else fill(invert ? 0 : 255);
      var x = col * colW;
      var y = row * rowH;
      rect(x, y, colW, rowH);
    }
  }
}
function init() {
  colW = width / cols;
  rowH = height / rows;
}
function keyPressed() {
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
  cols = constrain(cols, 0, 10);
  rows = constrain(rows, 0, 10);
  init();
Linear motion with controls
Distance of mouse from center of screen controls speed.
Direction of mouse from center of screen controls direction.
let x, y
let px, py;
function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = height / 2;
  background(0);
}
function draw() {
  background(0, 10);
  x += ((mouseX - (width / 2)) / width) * 50;
  y += ((mouseY - (height / 2)) / height) * 50;
  stroke(255);
  line(px, py, x, y);
  px = x;
  py = y;
  fill(255);
  rect(width / 2, height / 2, 10, 10);
}
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
  if(frameCount%60 == 0) {
   console.log("SAY HEY!"); 
  }
  if(frameCount == 300) {
   console.log("SAY YIPPEE"); 
  }
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
}
let x = 0;
function draw() {
  if (random(1) < 0.01) {
    nudge();
  }
  background(220);
  x++;
  x %= width;
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
}
function draw() {
  background(220);
  ellipse(width / 2, height / 2, 50, 50);
  if (frameCount %= 120) {
    console.log("HI", frameCount);
  }
let numOctaves = 1;
let numNotes = 0;
let notes = [];
let data = [];
let scl = 0;
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
  for (var n = 0; n < notes.length; n++) {
    for (var m = 0; m < numNotes; m++) {
      notes[n][m].run(balls);
    }
  }
	
  for (let b = 0; b < balls.length; b++) {
    let ball = balls[b];
    ball.run();
  }
}
function calcRatios() {
  var baseIndex = 3;
  var base;
	
  data.reverse();
  base = data[baseIndex] * 2;
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
	
  let sum = 0;
  for (var s in sel) {
    sum += sel[s];
  }
  scl = height / sum;
	
  let ratios = {};
  for (var s in sel) {
    var r = data[s] / data[baseIndex];
    ratios[s] = r;
    numNotes++;
  }
	
  let ow = 100;
  let x = width / 2 - ow / 2;
  for (var o = 0; o < numOctaves; o++) {
    notes[o] = [];
    var y = height;
    for (var s in sel) {
      var ratio = ratios[s];
      var freq = base * pow(2, 3) * ratio;
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
  copy(video, mouseX-m, mouseY-m, m*2, m*2, mouseX-m, mouseY-m, m*2, m*2);
 *  @name Reverb
 *  @description Reverb gives depth and perceived space to a sound. Here,
 *  noise is processed with reverb.
 *
 * <p><em><span class="small"> To run this example locally, you will need the
var sound, reverb;
function preload() {
  soundFormats('mp3', 'ogg');
  soundFile = loadSound('assets/Damscray_DancingTiger');
  soundFile.disconnect();
}
function setup() {
  createCanvas(innerWidth,100);
  background(0);
  reverb = new p5.Reverb();
  reverb.process(soundFile, 6, 0.2);
}
function mousePressed() {
  soundFile.play();
}
function setup() { 
  createCanvas(400, 400);
  
  
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
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function gotData() {
}
function draw() {
 
function setup() { 
  createCanvas(400, 400);
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
  for (var i = 0; i< spectrum.length; i++){
    var x = map(i, 0, spectrum.length, 0, width);
    var h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h )
  }
  var waveform = fft.waveform();
  noFill();
  beginShape();
  strokeWeight(1);
  for (var i = 0; i< waveform.length; i++){
    var x = map(i, 0, waveform.length, 0, width);
    var y = map( waveform[i], -1, 1, 0, height);
    vertex(x,y);
  }
  endShape();
var lowest = 1000;
var highest = 0;
function setup() {
  createCanvas(600, 600);
}
function draw() {
  background('blue');
  fill(255);
  strokeWeight(0);
  text(sensorValue, 20, 20);
	
  if(sensorValue < lowest && sensorValue > 0) lowest = sensorValue;
  if(sensorValue > highest) highest = sensorValue;
  
  
  var v = map(sensorValue, lowest, highest, 0, width);
	ellipse(v, height/2, 20, 20);
  
  fill(255, 0, 0);
  strokeWeight(10);
  noFill();
  ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);
  ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
  bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);
	
  bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
}
 for (var i = 0; i < portList.length; i++) {
 }
}
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
  ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);
  ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
  bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
  v+=random(-5, 5);
  bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);
}
var trumpys = [];
var ts = 16;
var t = 0;
function setup() {
  createCanvas(800, 800);
  fill(0);
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
    textSize(ts);
    text(trumpys[floor(t)], random(width), random(height));
  }
}
function showSnippets(data) {
  var docs = data.response.docs;
  var trumps = ["Trumpy", "McTrumpFace", "Trumperson", "Trump Trump"];
  var allTokens = [];
  for (var i=0; i<docs.length; i++) {
    var tokens = splitTokens(docs[i].snippet);
    shuffle(tokens, true);
    for(var j = 0; j < tokens.length; j++) {
      if(random(1) < .25) {
        tokens.splice(j, 0, trumps[floor(random(trumps.length))]);
      }
    }
    allTokens = concat(allTokens, tokens);
  }
    trumpys = allTokens;
function setup() {
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
}
function gotRawData(thedata) {
}
function draw() {
  background(255,255,255);
  fill(0,0,0);
  var mappedVar = map(latestData, 490,540,0,width);
  ellipse(mappedVar, 100, 50, 50);
  text(latestData, 10, 10);
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function gotData() {
  console.log('\t' + currentString);
}
function draw() {
}let txt;
let tokens = [];
function preload() {
  txt = loadStrings("joke.txt");
  console.log(txt);
}
function setup() {
  createCanvas(1280, 800);
  for (let l of txt) {
    tokens = concat(tokens, splitTokens(l));
  }
  console.log(tokens);
}
function draw() {
  background(220);
	
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
    if(!balls[b]) continue;
    balls[b].run();
    for (let c = balls.length-1; c >=0; c--) {
        if (b == c) continue;
        if (balls[b].isNear(balls[c])) {
          balls.splice(b, 1);
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
  
  par.position(mouseX, mouseY);
function setup() {
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
}
function gotRawData(thedata) {
}
function draw() {
  background(255,255,255);
  fill(0,0,0);
  text(latestData, 10, 10);
  ellipse(50,50,data,data);
}
}let balls = [];
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(0);
  for (let b = 0; b < balls.length; b++) {
    if(balls[b]) balls[b].run();
    else continue;
    for (let c = 0; c < balls.length; c++) {
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
  update(x1, y1, xspeed1, yspeed1);
  update(x2, y2, xspeed2, yspeed2);
  display(x1, y1);
  display(x2, y2);
}
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
}
function mousePressed() {
  balls.push(new Ball(mouseX, mouseY, random(-5, 5), random(-5, 5)));
}
class Ball {
  constructor(x, y, xspeed, yspeed) {
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
}
function count(c, lim) {
  if(c >= lim) return;
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
  
  if (x > width || x < 0) {
    xspeed *= -1;
  }
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
  xspeed = -1;
  yspeed = xspeed*.5;
} 
function draw() { 
  background(220);
  
  x+=xspeed;
  y+=yspeed;
  
  ellipse(x, y, 10, 10);
}function setup() { 
  createCanvas(windowWidth, windowHeight);
} 
function draw() { 
  var speed = dist(mouseX, mouseY, pmouseX, pmouseY);
  
  var sw = speed/10;
  var sw = map(speed, 0, 500, 0, 100);
  strokeWeight(sw);
  stroke(0, 255/sw);
  var sz = random(sw);
  fill(0);
  ellipse(mouseX, mouseY, sz, sz);
  line(mouseX,mouseY, pmouseX, pmouseY);
}
function mousePressed() {
  background(255);
  
let tlX, tlY, trX, trY, blX, blY, brX, brY;
let lX, rX, tY, bY;
let tl, tr, bl, br;
function setup() { 
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  
  tlX = width/2 - width/4;
  tlY = height/2 - height/4;
  trX = tlX + width/2;
  trY = tlY;
  blX = tlX;
  blY = tlY + height/2;
  brX = trX;
  brY = blY;
  
  lX = width/2 - width/4;
  rX = lX + width/2;
  tY = height/2 - height/4;
  bY = tY + height/2;
  
  tlX = lX;
  tlY = tY;
  trX = rX;
  trY = tY;
  blX = lX;
  blY = bY;
  brX = rX;
  brY = bY;
  
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
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  ball = new Ball(50, height / 2, 20, 20, 0, 1);
}
function draw() {
  background(255)
  ball.run();
}
function calcRatios(data) {
  data.reverse();
  base = data[baseIndex] * pow(2, 2);
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
  soundFile.loop();
  filter = new p5.LowPass();
  soundFile.disconnect();
  soundFile.connect(filter);
  fft = new p5.FFT();
}
function draw() {
  background(30);
  filterFreq = map (mouseX, 0, width, 10, 22050);
  filterRes = map(mouseY, 0, height, 15, 5);
  filter.set(filterFreq, filterRes);
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
  delay = new p5.Delay();
  delay.process(soundFile, .01, .7, 400300);
  analyzer = new p5.Amplitude();
  console.log(soundFile);
}
function draw() {
  background(0);
  var level = analyzer.getLevel();
  var levelHeight = map(level, 0, .1, 0, height);
  fill(100,250,100);
  rect(0, height, width, - levelHeight);
  var delTime = map(mouseX, 0, width, .01, .2);
  delTime = constrain(delTime, .01, .2);
  delay.delayTime(delTime);
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
  var speed = map(mouseY, 0.1, height, 0, 2);
  speed = constrain(speed, 0.01, 4);
  song.rate(speed);
  stroke(0);
  fill(51, 100);
  ellipse(width/2, mouseY, 48, 48);
Mimi Yin NYU-ITP
Drawing skeleton joints and bones.
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
  kinectron = new Kinectron("192.168.0.4");
  kinectron.makeConnection();
  kinectron.startTrackedBodies(bodyTracked);
  xscl = (width/3.2)*0.55;
  yscl = -(width/3.2)*0.6;
  xshift = 0;
  yshift = height / 2;
  diag = sqrt(sq(width) + sq(height));
  background(0);
}
function draw() {
  background(0);
  var joints = bm.getJoints(kinectron.HANDRIGHT);
  for (var j = 0; j < joints.length; j++) {
    var joint = joints[j];
    var pos = getPos(joint.pos);
    var speed = joint.speed;
    var acceleration = joint.acceleration;
    var alpha = speed * 5000 + 32;
    var sz = acceleration * 5000 + 10;
    fill(255, alpha);
    ellipse(pos.x, pos.y, sz, sz);
  }
}
function bodyTracked(body) {
  var id = body.trackingId;
  if (!bm.contains(id)) bm.add(body);
  else bm.update(body);
}
function getPos(joint) {
  return createVector((joint.z * xscl) + xshift, (joint.x * yscl) + yshift);
}
function keyPressed() {
  if (keyCode == ESCAPE) scl = !scl;
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
Mimi Yin NYU-ITP
Mapping Kinect Skeleton locations to floor projection.
var kinectron = null;
var xscl, yscl;
var xshift, yshift;
var scl = true;
var bm = new BodyManager();
var DEATH_TH = 1000;
var polygon = new Polygon();
function setup() {
  createCanvas(windowWidth, windowHeight);
  kinectron = new Kinectron("172.16.231.112");
  kinectron.makeConnection();
  kinectron.startTrackedBodies(bodyTracked);
  xscl = (width/3.2)*0.55;
  yscl = -(width/3.2)*0.6;
  xshift = 0;
  yshift = height / 2;
  diag = sqrt(sq(width) + sq(height));
  background(0);
}
function draw() {
  background(0);
  var bodies = bm.getBodies();
  var it;
  polygon.clear();
  for (var b = 0; b < bodies.length; b++) {
    var body = bodies[b];
    var pos = getPos(body.getPosition(kinectron.HEAD));
    if (bodies.length > 0 && b == 0) it = pos;
    else polygon.addVertex(pos.x, pos.y);
  }
  noStroke();
  fill(255, 128);
  polygon.display();
  if (it != null && polygon.isReady()) {
    var itIsInside = polygon.contains(it);
    if (itIsInside) {
      noStroke();
      fill(255, 0, 0);
      polygon.display();
    }
    var np = polygon.getNearestPointOnSide(it);
    stroke(255);
    strokeWeight(1);
    line(it.x, it.y, np.x, np.y);
    var d = p5.Vector.sub(it, np).mag();
    var ns = polygon.getNearestSide(it);
    stroke(255);
    strokeWeight(100 - d);
    line(ns.start.x, ns.start.y, ns.end.x, ns.end.y);
    var nv = polygon.getNearestVertex(it);
    var d = p5.Vector.sub(it, nv).mag();
    stroke(255);
    strokeWeight(1);
    line(it.x, it.y, nv.x, nv.y);
    noStroke();
    fill(255);
    ellipse(nv.x, nv.y, d, d);
    fill(255);
    ellipse(it.x, it.y, 50, 50);
  }
}
function bodyTracked(body) {
  var id = body.trackingId;
  if (!bm.contains(id)) bm.add(body);
  else bm.update(body);
}
function getPos(joint) {
  return createVector((joint.z * xscl) + xshift, (joint.x * yscl) + yshift);
}
function mousePressed() {
  polygon.addVertex(mouseX, mouseY);
}
function keyPressed() {
  if (keyCode == ESCAPE) scl = !scl;
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
Mimi Yin NYU-ITP
Mapping Kinect Skeleton locations to floor projection.
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
  kinectron = new Kinectron("172.16.229.129");
  kinectron.makeConnection();
  kinectron.startTrackedBodies(bodyTracked);
  xscl = (width/3.2)*0.55;
  yscl = -(width/3.2)*0.6;
  xshift = 0;
  yshift = height / 2;
  diag = sqrt(sq(width) + sq(height));
  background(0);
}
function draw() {
  background(0);
  var avgPos = createVector();
  var positions = bm.getPositions(kinectron.HEAD);
  for (var p = 0; p < positions.length; p++) {
    var pos = getPos(positions[p]);
    fill(255, 0, 0);
    ellipse(pos.x, pos.y, 50, 50);
    avgPos.add(pos);
  }
  avgPos.div(positions.length);
  var avgDist = 100;
  for (var p = 0; p < positions.length; p++) {
    var pos = getPos(positions[p]);
    var d = p5.Vector.dist(avgPos, pos);
    avgDist += d;
  }
  if (positions.length > 0) {
    avgDist /= positions.length;
  }
  fill(255);
  ellipse(avgPos.x, avgPos.y, avgDist, avgDist);
}
function bodyTracked(body) {
  var id = body.trackingId;
  if (!bm.contains(id)) bm.add(body);
  else bm.update(body);
}
function getPos(joint) {
  return createVector((joint.z * xscl) + xshift, (joint.x * yscl) + yshift);
}
function keyPressed() {
  if (keyCode == ESCAPE) scl = !scl;
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
Mimi Yin NYU-ITP
Mapping Kinect Skeleton locations to floor projection.
var kinectron = null;
var xscl, yscl;
var xshift, yshift;
var scl = true;
var bm = new BodyManager();
var DEATH_TH = 1000;
function setup() {
  createCanvas(windowWidth, windowHeight);
  kinectron = new Kinectron("172.16.231.112");
  kinectron.makeConnection();
  kinectron.startTrackedBodies(bodyTracked);
  xscl = (width/3.2)*0.55;
  yscl = -(width/3.2)*0.6;
  xshift = 0;
  yshift = height / 2;
  center = createVector(random(width), random(height));
  diag = sqrt(sq(width) + sq(height));
  background(0);
  noStroke();
}
function draw() {
  background(0);
  var positions = bm.getPositions(kinectron.HEAD);
  var r = sz / 2;
  var c = color(0);
  for (var p = 0; p < positions.length; p++) {
    var pos = getPos(positions[p]);
    var d = p5.Vector.sub(pos, center).mag();
    if (d < r) c = color(255, 0, 0);
    else c = color(0);
    fill(255);
    ellipse(pos.x, pos.y, 50, 50);
  }
  fill(c);
  ellipse(center.x, center.y, sz, sz);
  sz++;
}
function bodyTracked(body) {
  var id = body.trackingId;
  if (!bm.contains(id)) bm.add(body);
  else bm.update(body);
}
function getPos(joint) {
  return createVector((joint.z * xscl) + xshift, (joint.x * yscl) + yshift);
}
function keyPressed() {
  if (keyCode == ESCAPE) scl = !scl;
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
Mimi Yin NYU-ITP
Mapping Kinect Skeleton locations to floor projection of circles.
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
  kinectron = new Kinectron("192.168.1.4");
  kinectron.makeConnection();
  kinectron.startTrackedBodies(bodyTracked);
  xscl = (width/3.2)*0.55;
  yscl = -(width/3.2)*0.6;
  xshift = 0;
  yshift = height/2;
  diag = sqrt(sq(width) + sq(height));
  background(0);
}
function draw() {
  background(0);
  if (bm.getPop() > 0) {
    var positions = bm.getPositions(kinectron.HEAD);
    for (var p = 0; p < positions.length; p++) {
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
  if (!bm.contains(id)) bm.add(body);
  else bm.update(body);
}
function getPos(pos) {
  return createVector((pos.z * xscl) + xshift, (pos.x * yscl) + yshift);
}
function keyPressed() {
  if (keyCode == ESCAPE) scl = !scl;
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
Mimi Yin NYU-ITP
Mapping Kinect Skeleton locations to floor projection of circles.
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
  kinectron = new Kinectron("192.168.1.4");
  kinectron.makeConnection();
  kinectron.startTrackedBodies(bodyTracked);
  xscl = (width/3.2)*0.55;
  yscl = -(width/3.2)*0.6;
  xshift = 0;
  yshift = height/2;
  diag = sqrt(sq(width) + sq(height));
  background(0);
}
function draw() {
  background(0);
  if (bm.getPop() > 0) {
    var positions = bm.getPositions(kinectron.HEAD);
    for (var p = 0; p < positions.length; p++) {
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
  if (!bm.contains(id)) bm.add(body);
  else bm.update(body);
}
function getPos(pos) {
  return createVector((pos.z * xscl) + xshift, (pos.x * yscl) + yshift);
}
function keyPressed() {
  if (keyCode == ESCAPE) scl = !scl;
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
Mimi Yin NYU-ITP
Mapping skeleton locations to floor projection of circle.
var kinectron = null;
var xscl, yscl;
var xshift, yshift;
var scl = true;
var bm = new BodyManager();
var DEATH_TH = 1000;
function setup() {
  createCanvas(windowWidth, windowHeight);
  kinectron = new Kinectron("172.16.231.112");
  kinectron.makeConnection();
  kinectron.startTrackedBodies(bodyTracked);
  diag = sqrt(sq(width) + sq(height));
  xscl = (width/3.2)*0.55;
  yscl = -(width/3.2)*0.6;
  xshift = 0;
  yshift = height / 2;
  center = createVector(0, 0);
  background(0);
  noStroke();
}
function draw() {
  background(0);
  fill(255);
  ellipse(center.x, center.y, sz, sz);
  var positions = bm.getPositions(kinectron.HEAD);
  var avgDist2Center = 0;
  var avgDist2Edge = 0;
  console.log(positions.length);
  for (var p = 0; p < positions.length; p++) {
    var pos = getPos(positions[p]);
    fill(255, 0, 0);
    ellipse(pos.x, pos.y, 50, 50);
    var dist2Center = p5.Vector.sub(pos, center).mag();
    var dist2Edge = abs((sz / 2) - dist2Center);
    avgDist2Center += dist2Center / diag;
    avgDist2Edge += dist2Edge / diag;
  }
  if (positions.length > 1) {
    avgDist2Center /= positions.length;
    avgDist2Edge /= positions.length;
  }
  szspeed = pow(100, avgDist2Edge);
  sz += szspeed;
}
function bodyTracked(body) {
  var id = body.trackingId;
  if (!bm.contains(id)) bm.add(body);
  else bm.update(body);
}
function getPos(joint) {
  return createVector((joint.z * xscl) + xshift, (joint.x * yscl) + yshift);
}
function keyPressed() {
  if (keyCode == ESCAPE) scl = !scl;
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
Mimi Yin NYU-ITP
Mapping mouse position inside polygon.
var polygon = new Polygon();
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}
function draw() {
  background(0);
  var mouse = createVector(mouseX, mouseY);
  if (polygon.isReady()) {
    var isInside = polygon.contains(mouse);
    if (isInside) fill(255, 0, 0);
    else fill(255, 128);
    noStroke();
    polygon.display();
    var np = polygon.getNearestPointOnSide(mouse);
    stroke(255);
    strokeWeight(1);
    line(mouse.x, mouse.y, np.x, np.y);
    var d = p5.Vector.sub(mouse, np).mag();
    var ns = polygon.getNearestSide(mouse);
    stroke(255);
    strokeWeight(100 - d);
    line(ns.start.x, ns.start.y, ns.end.x, ns.end.y);
    var nv = polygon.getNearestVertex(mouse);
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
Mimi Yin NYU-ITP
Drawing lines.
var mode = 0;
var locs = [];
function setup() { 
  createCanvas(windowWidth, windowHeight);
  background(0);
} 
function draw() { 
  var speed = dist(pmouseX, pmouseY, mouseX, mouseY);
	var sw = 1;
  
  switch(mode){
    case 1:
      sw = speed/10;
      break;
    case 2:      
  		sw = 100/speed;
      break;
    case 3:
      background(0);
      locs.push(createVector(mouseX, mouseY));
      if(locs.length> 50) locs.shift();
      for(var l = 0; l < locs.length; l++) {
        var sz = sin(frameCount*0.01)*l*2 + l*2;
        locs[l].x+=(mouseX-locs[l].x)*0.01;
        locs[l].y+=(mouseY-locs[l].y)*0.01;
				
        noStroke();
        fill(255, 64);
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
  
Mimi Yin NYU-ITP
Trisect space.
Horizontal and Vertical.
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
  
  w += wspeed;
  h += hspeed;
  
  if(w < 0 || w > width/2) wspeed *= -1;
  if(h < 0 || h > height/2) hspeed *= -1;
	
  if (horizontal) rect(width/2, height/2, width, h);
  else rect(width/2, height/2, w, height);
}
function keyPressed() {
  switch (keyCode) {
    case ESCAPE:
      horizontal = !horizontal;
      w = 0;
      h = 0;
      break;
  }
  w = constrain(w, 0, width);
  h = constrain(h, 0, height);
Mimi Yin NYU-ITP
Bisect space.
Horizontal and Vertical.
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
  counter += 0.01;
  x = pow(2, counter);
  y = pow(2, counter);
  fill(255);
  if (horizontal) rect(0, 0, width, y);
  else rect(0, 0, x, height);
}
function keyPressed() {
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
  
  noStroke();
  fill(255);
  beginShape();
  for (var v = 0; v < vertices.length; v++) {
    vertex(vertices[v].x, vertices[v].y);
  }
  endShape(CLOSE);
  var mouse = createVector(mouseX, mouseY);
  var distCenter = floor(p5.Vector.sub(center, mouse).mag());
  var intersections = 0;
  var distSide = width*height;
  
  stroke(128);
  for (var v = 0; v < vertices.length; v++) {
    var v1 = vertices[v];
    var v2 = v == vertices.length-1 ? vertices[0] : vertices[v+1];
    
    if (areIntersecting(createVector(0, 0), mouse, v1, v2)) intersections++;
    
    var n = getNormalPoint(mouse, v1, v2);
    var d = p5.Vector.sub(n, mouse).mag();
    if (d < distSide) distSide = floor(d);
    line(mouse.x, mouse.y, n.x, n.y);
  }
	
  textSize(18);
  noStroke();
  fill(255);
  
  if (intersections%2 == 0) text("OUTSIDE: " + distSide + " " + distCenter, 10, 20);
  else text("INSIDE: "  + distSide + " " + distCenter, 10, 20);
}
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
function init() {
  vertices = [num];
  for (var n = 0; n < num; n++) {
    var x = cos(TWO_PI*n/num)*r + center.x;
    var y = sin(TWO_PI*n/num)*r + center.y;
    vertices[n] = createVector(x, y);
  }
}
function areIntersecting(p0, p1, s0, s1) {
  var d1, d2;
  var a1, a2, b1, b2, c1, c2;
  c1 = (s1.x * s0.y) - (s0.x * s1.y);
  d1 = (a1 * p0.x) + (b1 * p0.y) + c1;
  d2 = (a1 * p1.x) + (b1 * p1.y) + c1;
  if (d1 > 0 && d2 > 0) return false;
  if (d1 < 0 && d2 < 0) return false;
  a2 = p1.y - p0.y;
  b2 = p0.x - p1.x;
  c2 = (p1.x * p0.y) - (p0.x * p1.y);
  d1 = (a2 * s0.x) + (b2 * s0.y) + c2;
  d2 = (a2 * s1.x) + (b2 * s1.y) + c2;
  if (d1 > 0 && d2 > 0) return false;
  if (d1 < 0 && d2 < 0) return false;
  if ((a1 * b2) - (a2 * b1) == 0.0) return true;
  return true;
}
function getNormalPoint(p, s0, s1) {
  s0p = p5.Vector.sub(p, s0);
  s0s1 = p5.Vector.sub(s1, s0);
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
  
  sz+=szspeed;
  if(sz > height || sz < 0) szspeed *= -1;
  
  fill(invert ? 255: 0);
  
  beginShape();
  	vertex(0, -sz);
  	vertex(sz, sz);
  	vertex(-sz, sz);
  endShape(CLOSE);
  pop();
}
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
  for (var col = 0; col < cols; col++) {
    for (var row = 0; row < rows; row++) {
      if ((col % 2 == 0 && row % 2 == 1) || (col % 2 == 1 && row % 2 == 0)) fill(invert ? 255 : 0);
      else fill(invert ? 0 : 255);
      var x = col * colW;
      var y = row * rowH;
      rect(x, y, colW, rowH);
    }
  }
}
function init() {
  colW = width / cols;
  rowH = height / rows;
}
function keyPressed() {
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
  cols = constrain(cols, 0, 10);
  rows = constrain(rows, 0, 10);
  init();
Mimi Yin NYU-ITP
Drawing skeleton joints and bones.
var kinectron = null;
var bodies = {};
var xscl, zscl;
var xshift, zshift;
var scl = true;
var sz = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
  kinectron = new Kinectron("192.168.0.112");
  kinectron.makeConnection();
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
    var joints = bodies[body].joints;
    var head = getPos(joints[kinectron.HEAD]);
		ellipse(head.x, head.y, 50, 50);
    
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
function getPos(joint) {
  return createVector((joint.cameraZ * zscl) + zshift, (joint.cameraX * xscl) + xshift);
}
function mousePressed(){
  scl = !scl;
}
function keyPressed(){
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
Mimi Yin NYU-ITP
Mapping joint movement to sounds.
var kinectron = null;
var marimba, rain, thunder;
var pHead = null;
function preload(){
  marimba = loadSound("data/marimba.mp3");
  rain = loadSound("data/rain.mp3");
  thunder = loadSound("data/thunder.mp3");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  kinectron = new Kinectron("192.168.0.112");
  kinectron.makeConnection();
  kinectron.startTrackedBodies(bodyTracked);
  marimba.loop();
  rain.loop();
  background(0);
}
function draw() {	
}
function bodyTracked(body) {
	background(0);
  kinectron.getJoints(drawJoint);
  var head = getPos(body.joints[kinectron.HEAD]);
  var neck = getPos(body.joints[kinectron.NECK]);
  var spineShoulder = getPos(body.joints[kinectron.SPINESHOULDER]);
  var spineMid = getPos(body.joints[kinectron.SPINEMID]);
  var spineBase = getPos(body.joints[kinectron.SPINEBASE]);
  var shoulderRight = getPos(body.joints[kinectron.SHOULDERRIGHT]);
  var elbowRight = getPos(body.joints[kinectron.ELBOWRIGHT]);
  var wristRight = getPos(body.joints[kinectron.WRISTRIGHT]);
  var handRight = getPos(body.joints[kinectron.HANDRIGHT]);
  var handTipRight = getPos(body.joints[kinectron.HANDTIPRIGHT]);
  var thumbRight = getPos(body.joints[kinectron.THUMBRIGHT]);
  var shoulderLeft = getPos(body.joints[kinectron.SHOULDERLEFT]);
  var elbowLeft = getPos(body.joints[kinectron.ELBOWLEFT]);
  var wristLeft = getPos(body.joints[kinectron.WRISTLEFT]);
  var handLeft = getPos(body.joints[kinectron.HANDLEFT]);
  var handTipLeft = getPos(body.joints[kinectron.HANDTIPLEFT]);
  var thumbLeft = getPos(body.joints[kinectron.THUMBLEFT]);
  var hipRight = getPos(body.joints[kinectron.HIPRIGHT]);
  var kneeRight = getPos(body.joints[kinectron.KNEERIGHT]);
  var ankleRight = getPos(body.joints[kinectron.ANKLERIGHT]);
  var footRight = getPos(body.joints[kinectron.FOOTRIGHT]);
  var hipLeft = getPos(body.joints[kinectron.HIPLEFT]);
  var kneeLeft = getPos(body.joints[kinectron.KNEELEFT]);
  var ankleLeft = getPos(body.joints[kinectron.ANKLELEFT]);
  var footLeft = getPos(body.joints[kinectron.FOOTLEFT]);
  stroke(255);
  fill(255);
  var d = p5.Vector.dist(handLeft, handRight);
  marimba.setVolume(d/100);
  var d = p5.Vector.dist(handLeft, head);
  rain.setVolume(100/d);
  if(pHead != null) {
    var d = p5.Vector.dist(pHead, head);
		
    if (d > 50 && (thunder.currentTime() == 0 || thunder.currentTime() > 2)) {
      thunder.jump(0);
      setTimeout(function () {
        thunder.play();
      }, 500);
    }
  }
  pHead = head;
}
function getPos(joint) {
  return createVector(joint.cameraX * width/2 + width/2, -joint.cameraY * width/2 + height/2, joint.cameraZ * width/2);
}
function drawJoint(joint) {
  var pos = getPos(joint);
  stroke(255);
  strokeWeight(5);
  point(pos.x, pos.y);
}
Mimi Yin NYU-ITP
Mapping joint movement to sounds.
var kinectron = null;
var marimba, rain, thunder;
var pHead = null;
function preload(){
  marimba = loadSound("data/marimba.mp3");
  rain = loadSound("data/rain.mp3");
  thunder = loadSound("data/thunder.mp3");
  buddhaImg = loadImage("data/buddha.jpg");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  kinectron = new Kinectron("192.168.0.112");
  kinectron.makeConnection();
  kinectron.startTrackedBodies(bodyTracked);
  marimba.loop();
  rain.loop();
  background(0);
}
function draw() {
}
function bodyTracked(body) {
	background(0);
  kinectron.getJoints(drawJoint);
  var head = getPos(body.joints[kinectron.HEAD]);
  var neck = getPos(body.joints[kinectron.NECK]);
  var spineShoulder = getPos(body.joints[kinectron.SPINESHOULDER]);
  var spineMid = getPos(body.joints[kinectron.SPINEMID]);
  var spineBase = getPos(body.joints[kinectron.SPINEBASE]);
  var shoulderRight = getPos(body.joints[kinectron.SHOULDERRIGHT]);
  var elbowRight = getPos(body.joints[kinectron.ELBOWRIGHT]);
  var wristRight = getPos(body.joints[kinectron.WRISTRIGHT]);
  var handRight = getPos(body.joints[kinectron.HANDRIGHT]);
  var handTipRight = getPos(body.joints[kinectron.HANDTIPRIGHT]);
  var thumbRight = getPos(body.joints[kinectron.THUMBRIGHT]);
  var shoulderLeft = getPos(body.joints[kinectron.SHOULDERLEFT]);
  var elbowLeft = getPos(body.joints[kinectron.ELBOWLEFT]);
  var wristLeft = getPos(body.joints[kinectron.WRISTLEFT]);
  var handLeft = getPos(body.joints[kinectron.HANDLEFT]);
  var handTipLeft = getPos(body.joints[kinectron.HANDTIPLEFT]);
  var thumbLeft = getPos(body.joints[kinectron.THUMBLEFT]);
  var hipRight = getPos(body.joints[kinectron.HIPRIGHT]);
  var kneeRight = getPos(body.joints[kinectron.KNEERIGHT]);
  var ankleRight = getPos(body.joints[kinectron.ANKLERIGHT]);
  var footRight = getPos(body.joints[kinectron.FOOTRIGHT]);
  var hipLeft = getPos(body.joints[kinectron.HIPLEFT]);
  var kneeLeft = getPos(body.joints[kinectron.KNEELEFT]);
  var ankleLeft = getPos(body.joints[kinectron.ANKLELEFT]);
  var footLeft = getPos(body.joints[kinectron.FOOTLEFT]);
  stroke(255);
  fill(255);
  var d = p5.Vector.dist(handLeft, handRight);
  marimba.setVolume(d/100);
  strokeWeight(d/10);
  line(handLeft.x, handLeft.y, handRight.x, handRight.y);
  var d = p5.Vector.dist(handLeft, head);
  rain.setVolume(10/d);
  if(pHead != null) {
    var d = p5.Vector.dist(pHead, head);
    if(d > 50) {
      thunder.jump(0);
      thunder.play();
    }
  }
  pHead = head;
}
function getPos(joint) {
  return createVector(joint.cameraX * width/2 + width/2, -joint.cameraY * width/2 + height/2, joint.cameraZ * width/2);
}
function drawJoint(joint) {
  var pos = getPos(joint);
  stroke(255);
  strokeWeight(5);
  point(pos.x, pos.y);
}
Mimi Yin NYU-ITP
Mapping joint movements to words.
var kinectron = null;
var yo, zing, buddha;
var buddhaVol = 0;
var pHead = null;
var pHandLeft = null;
var pHandRight = null;
function preload(){
  yo = loadSound("data/yo.wav");
  zing = loadSound("data/zing.mp3");
  buddha = loadSound("data/buddha.wav");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  kinectron = new Kinectron("192.168.0.112");
  kinectron.makeConnection();
  kinectron.startTrackedBodies(bodyTracked);
  buddha.setVolume(buddhaVol);
  buddha.loop();
  imageMode(CENTER);
  background(0);
}
function draw() {
}
function bodyTracked(body) {
	background(0);
  kinectron.getJoints(drawJoint);
  var head = getPos(body.joints[kinectron.HEAD]);
  var neck = getPos(body.joints[kinectron.NECK]);
  var spineShoulder = getPos(body.joints[kinectron.SPINESHOULDER]);
  var spineMid = getPos(body.joints[kinectron.SPINEMID]);
  var spineBase = getPos(body.joints[kinectron.SPINEBASE]);
  var shoulderRight = getPos(body.joints[kinectron.SHOULDERRIGHT]);
  var elbowRight = getPos(body.joints[kinectron.ELBOWRIGHT]);
  var wristRight = getPos(body.joints[kinectron.WRISTRIGHT]);
  var handRight = getPos(body.joints[kinectron.HANDRIGHT]);
  var handTipRight = getPos(body.joints[kinectron.HANDTIPRIGHT]);
  var thumbRight = getPos(body.joints[kinectron.THUMBRIGHT]);
  var shoulderLeft = getPos(body.joints[kinectron.SHOULDERLEFT]);
  var elbowLeft = getPos(body.joints[kinectron.ELBOWLEFT]);
  var wristLeft = getPos(body.joints[kinectron.WRISTLEFT]);
  var handLeft = getPos(body.joints[kinectron.HANDLEFT]);
  var handTipLeft = getPos(body.joints[kinectron.HANDTIPLEFT]);
  var thumbLeft = getPos(body.joints[kinectron.THUMBLEFT]);
  var hipRight = getPos(body.joints[kinectron.HIPRIGHT]);
  var kneeRight = getPos(body.joints[kinectron.KNEERIGHT]);
  var ankleRight = getPos(body.joints[kinectron.ANKLERIGHT]);
  var footRight = getPos(body.joints[kinectron.FOOTRIGHT]);
  var hipLeft = getPos(body.joints[kinectron.HIPLEFT]);
  var kneeLeft = getPos(body.joints[kinectron.KNEELEFT]);
  var ankleLeft = getPos(body.joints[kinectron.ANKLELEFT]);
  var footLeft = getPos(body.joints[kinectron.FOOTLEFT]);
  stroke(255);
  fill(255);
  if(pHead != null) {
    var d = p5.Vector.dist(pHead, head);
    if(d > 10) {
      buddhaVol+=0.5;
    }
    buddhaVol -= 0.1;
    buddha.setVolume(constrain(buddhaVol, 0, 2));
    var d = p5.Vector.dist(pHandLeft, handLeft);
    if(d > 50) {
      zing.jump(0);
      zing.play();
    }
    noStroke();
    textSize(d);
    text("Zing", handLeft.x, handLeft.y);
    var d = p5.Vector.dist(pHandRight, handRight);
    if(d > 50) {
      yo.jump(0);
      yo.play();
    }
    textSize(d);
    text("Yo", pHandRight.x, pHandRight.y);
  }
  pHead = head;
  pHandRight = handRight;
  pHandLeft = handLeft;
}
function getPos(joint) {
  return createVector(joint.cameraX * width/2 + width/2, -joint.cameraY * width/2 + height/2, joint.cameraZ * width/2);
}
function drawJoint(joint) {
  var pos = getPos(joint);
  stroke(255);
  strokeWeight(5);
  point(pos.x, pos.y);
}
Mimi Yin NYU-ITP
Extra mapping techniques.
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
    case 0:
      value += (mouseX - value ) * 0.01;
      break;
    case 1:
      value += abs(mouseX - pmouseX);
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
  }
  endShape(CLOSE);
  
}
function mousePressed(){
  locs.push(createVector(mouseX, mouseY));
Mimi Yin NYU-ITP
Mapping mouse to sound.
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
Mimi Yin NYU-ITP
Mapping techniques.
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
  var speed = abs(mouseX - pmouseX);
  var accel = abs(speed - pspeed);
  switch (input) {
    case 0:
      value = mouseX;
      break;
    case 1:
      value = speed * width * 0.1;
      break;
    case 2:
      value = accel * width * 0.1;
      break;
  }
  pspeed = speed;
  var scl = 2;
  switch (mapping) {
    case 0:
      volume = scl * value / width;
      break;
    case 1:
      volume = width / (width - value) - 1;
      break;
    case 2:
      var interval = width / 3;
      volume = scl * floor(value / interval);
      break;
    case 3:
      var interval = width / 3;
      volume = scl * (value % interval / interval);
      break;
    case 4:
      volume = (sin(2 * TWO_PI * value / width) * scl / 2 + scl / 2);
      break;
    case 5:
      if (frameCount % 2 == 0) {
        volume = noise(value * 0.01) - 0.25;
        volume = map(volume, 0, 0.5, 0, 1);
      }
      break;
    case 6:
      if (frameCount % 5 == 0) {
        volume = random(scl * value / width);
      }
      break;
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
Mimi Yin NYU-ITP
Drawing lines with selected joint in 4 ways
With multiple skeletons
var kinectron = null;
var mode;
var j;
var bodies = {};
function setup() {
  createCanvas(windowWidth, windowHeight);
  kinectron = new Kinectron("192.168.0.118");
  kinectron.makeConnection();
  kinectron.startTrackedBodies(bodyTracked);
  mode = 1;
  j = kinectron.HANDLEFT;
  background(255);
}
function draw() {
}
function bodyTracked(body) {
  
  if(!(body.trackingId in bodies)) {
    bodies[body.trackingId] = { r: random(255), g: random(255), b: random(255) };
    
  }
  
  var b = bodies[body.trackingId];
  var joint = body.joints[j];
  var x = (joint.cameraX * width/2) + width/2;
  var y = (-joint.cameraY * height/2) + height/2;
  var z = joint.cameraZ * 100;
  if(mode < 4 && b.px != null) {
    var speed = dist(b.px, b.py, b.pz, x, y, z);
    var sw = 1;
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
    stroke(b.r, b.g, b.b);
    strokeWeight(sw);
    line(b.px, b.py, x, y);
  }
  b.px = x;
  b.py = y;
  b.pz = z;
}
function drawJoint(joint) {
  x = (joint.cameraX * width/2) + width/2;
  y = (-joint.cameraY * height/2) + height/2;
  z = joint.cameraZ * 100;
  fill(255);
  push();
  translate(x, y);
	ellipse(0, 0, 10, 10);
  pop();
}
function keyPressed(){
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
Mimi Yin NYU-ITP
Drawing skeleton joints
Showing selected joint
var kinectron = null;
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  kinectron = new Kinectron("172.16.216.84");
  kinectron.makeConnection();
  kinectron.startTrackedBodies(bodyTracked);
  background(0);
}
function draw() {
}
function bodyTracked(body) {
  background(255);
  rotateY(2*TWO_PI*mouseX/width);
  rotateX(3*TWO_PI*mouseY/width);
  kinectron.getJoints(drawJoint);
  var head = getPos(body.joints[kinectron.HEAD]);
  var neck = getPos(body.joints[kinectron.NECK]);
  var spineShoulder = getPos(body.joints[kinectron.SPINESHOULDER]);
  var spineMid = getPos(body.joints[kinectron.SPINEMID]);
  var spineBase = getPos(body.joints[kinectron.SPINEBASE]);
  var shoulderRight = getPos(body.joints[kinectron.SHOULDERRIGHT]);
  var elbowRight = getPos(body.joints[kinectron.ELBOWRIGHT]);
  var wristRight = getPos(body.joints[kinectron.WRISTRIGHT]);
  var handRight = getPos(body.joints[kinectron.HANDRIGHT]);
  var handTipRight = getPos(body.joints[kinectron.HANDTIPRIGHT]);
  var thumbRight = getPos(body.joints[kinectron.THUMBRIGHT]);
  var shoulderLeft = getPos(body.joints[kinectron.SHOULDERLEFT]);
  var elbowLeft = getPos(body.joints[kinectron.ELBOWLEFT]);
  var wristLeft = getPos(body.joints[kinectron.WRISTLEFT]);
  var handLeft = getPos(body.joints[kinectron.HANDLEFT]);
  var handTipLeft = getPos(body.joints[kinectron.HANDTIPLEFT]);
  var thumbLeft = getPos(body.joints[kinectron.THUMBLEFT]);
  var hipRight = getPos(body.joints[kinectron.HIPRIGHT]);
  var kneeRight = getPos(body.joints[kinectron.KNEERIGHT]);
  var ankleRight = getPos(body.joints[kinectron.ANKLERIGHT]);
  var footRight = getPos(body.joints[kinectron.FOOTRIGHT]);
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
  var offset = p5.Vector.sub(head, spineBase).add(handLeft);
  push();
  translate(offset.x, offset.y, offset.z);
  box(100);
  pop();
}
function getPos(joint) {
  return createVector(joint.cameraX*width/4, -joint.cameraY*width/4, joint.cameraZ*100);
}
function drawJoint(joint) {
  var pos = getPos(joint);
  push();
	translate(pos.x, pos.y, pos.z);
  sphere(5);
  pop();
}
Mimi Yin NYU-ITP
Drawing 2D body.
var kinectron = null;
var mode = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
  kinectron = new Kinectron("172.16.230.153");
  kinectron.makeConnection();
  kinectron.startTrackedBodies(bodyTracked);
  background(0);
}
function draw() {
}
function bodyTracked(body) {
	background(0);
  kinectron.getJoints(drawJoint);
  var head = getPos(body.joints[kinectron.HEAD]);
  var neck = getPos(body.joints[kinectron.NECK]);
  var spineShoulder = getPos(body.joints[kinectron.SPINESHOULDER]);
  var spineMid = getPos(body.joints[kinectron.SPINEMID]);
  var spineBase = getPos(body.joints[kinectron.SPINEBASE]);
  var shoulderRight = getPos(body.joints[kinectron.SHOULDERRIGHT]);
  var elbowRight = getPos(body.joints[kinectron.ELBOWRIGHT]);
  var wristRight = getPos(body.joints[kinectron.WRISTRIGHT]);
  var handRight = getPos(body.joints[kinectron.HANDRIGHT]);
  var handTipRight = getPos(body.joints[kinectron.HANDTIPRIGHT]);
  var thumbRight = getPos(body.joints[kinectron.THUMBRIGHT]);
  var shoulderLeft = getPos(body.joints[kinectron.SHOULDERLEFT]);
  var elbowLeft = getPos(body.joints[kinectron.ELBOWLEFT]);
  var wristLeft = getPos(body.joints[kinectron.WRISTLEFT]);
  var handLeft = getPos(body.joints[kinectron.HANDLEFT]);
  var handTipLeft = getPos(body.joints[kinectron.HANDTIPLEFT]);
  var thumbLeft = getPos(body.joints[kinectron.THUMBLEFT]);
  var hipRight = getPos(body.joints[kinectron.HIPRIGHT]);
  var kneeRight = getPos(body.joints[kinectron.KNEERIGHT]);
  var ankleRight = getPos(body.joints[kinectron.ANKLERIGHT]);
  var footRight = getPos(body.joints[kinectron.FOOTRIGHT]);
  var hipLeft = getPos(body.joints[kinectron.HIPLEFT]);
  var kneeLeft = getPos(body.joints[kinectron.KNEELEFT]);
  var ankleLeft = getPos(body.joints[kinectron.ANKLELEFT]);
  var footLeft = getPos(body.joints[kinectron.FOOTLEFT]);
  fill(255, 64);
  stroke(255);
  switch(mode) {
    case 0:
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
function getPos(joint) {
  return createVector((joint.cameraX * width/2) + width/2, (-joint.cameraY * width/2) + height/2);
}
function drawJoint(joint) {
  var pos = getPos(joint);
  stroke(255);
  strokeWeight(5);
  point(pos.x, pos.y);
}
function keyPressed(){
  mode++;
  mode%=2;
}
Mimi Yin NYU-ITP
Drawing skeleton joints and bones.
var kinectron = null;
function setup() {
  createCanvas(windowWidth, windowHeight);
  kinectron = new Kinectron("172.16.230.153");
  kinectron.makeConnection();
  kinectron.startTrackedBodies(bodyTracked);
  background(0);
}
function draw() {
}
function bodyTracked(body) {
  background(0);
  kinectron.getJoints(drawJoint);
  var head = getPos(body.joints[kinectron.HEAD]);
  var neck = getPos(body.joints[kinectron.NECK]);
  var spineShoulder = getPos(body.joints[kinectron.SPINESHOULDER]);
  var spineMid = getPos(body.joints[kinectron.SPINEMID]);
  var spineBase = getPos(body.joints[kinectron.SPINEBASE]);
  var shoulderRight = getPos(body.joints[kinectron.SHOULDERRIGHT]);
  var elbowRight = getPos(body.joints[kinectron.ELBOWRIGHT]);
  var wristRight = getPos(body.joints[kinectron.WRISTRIGHT]);
  var handRight = getPos(body.joints[kinectron.HANDRIGHT]);
  var handTipRight = getPos(body.joints[kinectron.HANDTIPRIGHT]);
  var thumbRight = getPos(body.joints[kinectron.THUMBRIGHT]);
  var shoulderLeft = getPos(body.joints[kinectron.SHOULDERLEFT]);
  var elbowLeft = getPos(body.joints[kinectron.ELBOWLEFT]);
  var wristLeft = getPos(body.joints[kinectron.WRISTLEFT]);
  var handLeft = getPos(body.joints[kinectron.HANDLEFT]);
  var handTipLeft = getPos(body.joints[kinectron.HANDTIPLEFT]);
  var thumbLeft = getPos(body.joints[kinectron.THUMBLEFT]);
  var hipRight = getPos(body.joints[kinectron.HIPRIGHT]);
  var kneeRight = getPos(body.joints[kinectron.KNEERIGHT]);
  var ankleRight = getPos(body.joints[kinectron.ANKLERIGHT]);
  var footRight = getPos(body.joints[kinectron.FOOTRIGHT]);
  var hipLeft = getPos(body.joints[kinectron.HIPLEFT]);
  var kneeLeft = getPos(body.joints[kinectron.KNEELEFT]);
  var ankleLeft = getPos(body.joints[kinectron.ANKLELEFT]);
  var footLeft = getPos(body.joints[kinectron.FOOTLEFT]);
  noFill();
  stroke(255);
  strokeWeight(10);
  beginShape();
  vertex(head.x, head.y);
  vertex(neck.x, neck.y);
  vertex(spineShoulder.x, spineShoulder.y);
  vertex(spineMid.x, spineMid.y);
  vertex(spineBase.x, spineBase.y);
  endShape();
  line(spineShoulder.x, spineShoulder.y, shoulderRight.x, shoulderRight.y);
  line(spineShoulder.x, spineShoulder.y, shoulderLeft.x, shoulderLeft.y);
  beginShape();
  vertex(shoulderRight.x, shoulderRight.y);
  vertex(elbowRight.x, elbowRight.y);
  vertex(wristRight.x, wristRight.y);
  vertex(handRight.x, handRight.y);
  vertex(handTipRight.x, handTipRight.y);
  endShape();
  line(handRight.x, handRight.y, thumbRight.x, thumbRight.y);
  beginShape();
  vertex(shoulderLeft.x, shoulderLeft.y);
  vertex(elbowLeft.x, elbowLeft.y);
  vertex(wristLeft.x, wristLeft.y);
  vertex(handLeft.x, handLeft.y);
  vertex(handTipLeft.x, handTipLeft.y);
  endShape();
  line(handLeft.x, handLeft.y, thumbLeft.x, thumbLeft.y);
  line(spineBase.x, spineBase.y, hipRight.x, hipRight.y);
  line(spineBase.x, spineBase.y, hipLeft.x, hipLeft.y);
  beginShape();
  vertex(hipRight.x, hipRight.y);
  vertex(kneeRight.x, kneeRight.y);
  vertex(ankleRight.x, ankleRight.y);
  vertex(footRight.x, footRight.y);
  endShape();
  beginShape();
  vertex(hipLeft.x, hipLeft.y);
  vertex(kneeLeft.x, kneeLeft.y);
  vertex(ankleLeft.x, ankleLeft.y);
  vertex(footLeft.x, footLeft.y);
  endShape();
}
function getPos(joint) {
  return createVector((joint.cameraX * width/2) + width/2, (-joint.cameraY * width/2) + height/2);
}
function drawJoint(joint) {
  var pos = getPos(joint);
  stroke(255);
  strokeWeight(5);
  point(pos.x, pos.y);
Mimi Yin NYU-ITP
Drawing a trail with selected joint in 4 ways
var kinectron = null;
var j;
var locs = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
  kinectron = new Kinectron("172.16.224.146");
  kinectron.makeConnection();
  kinectron.startTrackedBodies(bodyTracked);
  j = kinectron.HANDLEFT;
  background(255);
}
function draw() {
}
function bodyTracked(body) {
  background(0);
  var joint = body.joints[j];
  x = (joint.cameraX * width/2) + width/2;
  y = (-joint.cameraY * height/2) + height/2;
  locs.push(createVector(x, y));
  if(locs.length > 50) locs.shift();
  fill(255, 64);
  noStroke();
  for (var l = 0 ; l < locs.length; l++) {
      var sz = sin(frameCount*0.01)*l + l/2;
      locs[l].x += (x-locs[l].x)*0.001;
      locs[l].y += (y-locs[l].y)*0.001;
      ellipse(locs[l].x, locs[l].y, sz, sz);
  }
}
function drawJoint(joint) {
  x = (joint.cameraX * width/2) + width/2;
  y = (-joint.cameraY * height/2) + height/2;
  z = joint.cameraZ * 100;
  fill(255);
  push();
  translate(x, y);
	ellipse(0, 0, 10, 10);
  pop();
}
function keyPressed(){
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
Mimi Yin NYU-ITP
Drawing lines with selected joint in 4 ways
var kinectron = null;
var mode;
var j;
var x, y, z;
var px, py, pz;
function setup() {
  createCanvas(windowWidth, windowHeight);
  kinectron = new Kinectron("172.16.224.146");
  kinectron.makeConnection();
  kinectron.startTrackedBodies(bodyTracked);
  mode = 1;
  j = kinectron.HANDLEFT;
  background(255);
}
function draw() {
}
function bodyTracked(body) {
  var joint = body.joints[j];
  x = (joint.cameraX * width/2) + width/2;
  y = (-joint.cameraY * height/2) + height/2;
  z = joint.cameraZ * 100;
  if(mode < 4 && px != null) {
    var speed = dist(px, py, pz, x, y, z);
    var sw = 1;
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
    line(px, py, x, y);
  }
  px = x;
  py = y;
  pz = z;
}
function drawJoint(joint) {
  x = (joint.cameraX * width/2) + width/2;
  y = (-joint.cameraY * height/2) + height/2;
  z = joint.cameraZ * 100;
  fill(255);
  push();
  translate(x, y);
	ellipse(0, 0, 10, 10);
  pop();
}
function keyPressed(){
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
Mimi Yin NYU-ITP
Circular Pathways with Controls
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
  x = cos(angle)*range + centerX;
  y = sin(angle*yfreq)*range*yscl + centerY;
  x = cos(sin(angle)*angle)*range*tan(angle) + centerX;
  y = sin(cos(angle)*angle*yfreq)*range*yscl*tan(angle) + centerY;
	stroke(255, 64);
  strokeWeight(5);
  if(frameCount > 1) line(px, py, x, y);
  px = x;
  py = y;
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
  switch(key) {
    case '0':
      range = 100;
      yscl = 1;
      aspeed = TWO_PI/3;
      yfreq = 1;
      preset = 0;
      break;
    case '1':
      range = 100;
      yscl = 1;
      aspeed = 0.01;
      yfreq = 1;
      preset = 1;
      break;
    case '2':
      range = 100;
      yscl = 2;
      aspeed = 0.01;
      yfreq = 1;
      preset = 2;
      break;
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
function bottomOut(p, bottom) {
  return p < bottom ? bottom : p;
Noisy pathways with controls.
var x, y;
var px, py;
var xspeed, yspeed;
var t;
var tspeed;
var mode;
var interval;
var range, yscl;
var xshift, yshift;
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
  
  if (frameCount % interval == 0) {
    t += tspeed;
  }
  x += xspeed;
  y += yspeed;
  stroke(255);
  line(px, py, x, y);
  px = x;
  py = y;
  
  if(x < 0 || x > width || y < 0 || y > height) reset(); 
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
  switch(key) {
    case '0':
      interval = 1;
      range = 20;
      yscl = 1;
      tspeed = 1;
      xshift = .5;
      yshift = .5;
      preset = 0;
      break;
    case '1':
      interval = 1;
      range = 4;
      yscl = 1;
      tspeed = 0.01;
      xshift = .5;
      yshift = .5;
      preset = 1;
      break;
    case '2':
      interval = 1;
      range = 20;
      yscl = 1;
      tspeed = 0.01;
      xshift = .5;
      yshift = .5;
      preset = 2;
      break;
    case '3':
      interval = 60;
      range = 2;
      yscl = 1;
      tspeed = 0.01;
      xshift = .5;
      yshift = .5;
      preset = 3;
      break;
    case '4':
      interval = 1;
      range = 4;
      yscl = .5;
      tspeed = 0.01;
      xshift = .5;
      yshift = .5;
      preset = 4;
    	break;
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
function bottomOut(p, bottom) {
  return p < bottom ? bottom : p;
Random pathways with controls.
let x, y;
let px, py;
let xspeed, yspeed;
let rop = false;
let mode;
let interval;
let range, yscl;
let xshift, yshift;
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
  if (frameCount % interval == 0) {
  }
  x += xspeed;
  y += yspeed;
  stroke(255);
  line(px, py, x, y);
  if (rop) {
    stroke(255, 0, 0, 255 * range / 32);
    noFill();
    rect(x - range, y - (range * yscl), range + (range * xshift), (range * yscl) + (range * yscl * yshift));
  }
  px = x;
  py = y;
  if (x < 0 || x > width || y < 0 || y > height) reset();
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
  switch (key) {
    case '1':
      interval = 1;
      range = 4;
      yscl = 1;
      xshift = 1;
      yshift = 1;
      preset = 1;
      break;
    case '2':
      interval = 1;
      range = 50;
      yscl = 1;
      xshift = 1;
      yshift = 1;
      preset = 2;
      break;
    case '3':
      interval = 120;
      range = 2;
      yscl = 1;
      xshift = 1;
      yshift = 1;
      preset = 3;
      break;
    case '4':
      interval = 30;
      range = 2;
      yscl = .5;
      xshift = 1;
      yshift = 1;
      preset = 4;
      break;
    case '5':
      interval = 1;
      range = 1;
      yscl = 1;
      xshift = 1.5;
      yshift = .7;
      preset = 5;
      break;
    case '6':
      interval = 180;
      range = 1;
      yscl = 1;
      xshift = 1;
      yshift = 1;
      preset = 6;
      break;
  }
  switch (keyCode) {
    case TAB:
      rop = !rop;
      break;
    case ESCAPE:
      mode++;
      mode %= 3;
      break;
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
function bottomOut(p, bottom) {
  return p < bottom ? bottom : p;
}function setup() { 
  createCanvas(windowWidth, windowHeight);
} 
function draw() { 
  background(255);
Mimi Yin NYU-ITP
Drawing skeleton joints
Showing selected joint
var kinectron = null;
var j;
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
  kinectron = new Kinectron("172.30.5.171");
  kinectron.makeConnection();
  kinectron.startTrackedBodies(bodyTracked);
  j = kinectron.HANDLEFT;
  background(0);
}
function draw() {
}
function bodyTracked(body) {
	background(0);
  kinectron.getJoints(drawJoint);
  var joint = body.joints[j];
  x = (joint.cameraX * width/2) + width/2;
  y = (-joint.cameraY * height/2) + height/2;
  noStroke();
  fill(255);
  push();
  translate(x, y);
  ellipse(0, 0, 50, 50);
  pop();
  stroke(255);
  textSize(18);
  text("RT/LFT to change joints. " + j + ": " + joints[j-1], 10, 20);
}
function drawJoint(joint) {
  x = (joint.cameraX * width/2) + width/2;
  y = (-joint.cameraY * height/2) + height/2;
  noStroke();
  fill(255);
  push();
  translate(x, y);
	ellipse(0, 0, 10, 10);
  pop();
}
function keyPressed(){
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
Mimi Yin NYU-ITP
Applying sin/cos and noise
to move a bezier curve.
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
  factor = noise(t)*2;
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
  noStroke();
  fill(255, 0, 0);
  ellipse(anchor1X, anchor1Y, 10, 10);
  ellipse(anchor2X, anchor2Y, 10, 10);
  fill(0, 0, 255);
  ellipse(control1X, control1Y, 10, 10);
  ellipse(control2X, control2Y, 10, 10);
  stroke(200);
  strokeWeight(1);
  line(anchor1X, anchor1Y, control1X, control1Y);
  line(anchor2X, anchor2Y, control2X, control2Y);
Mimi Yin NYU-ITP
Applying sin/cos and noise
to move a bezier curve.
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
  factor = noise(t)*2;
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
  noStroke();
  fill(255, 0, 0);
  ellipse(anchor1X, anchor1Y, 10, 10);
  ellipse(anchor2X, anchor2Y, 10, 10);
  fill(0, 0, 255);
  ellipse(control1X, control1Y, 10, 10);
  ellipse(control2X, control2Y, 10, 10);
  stroke(255);
  strokeWeight(1);
  line(anchor1X, anchor1Y, control1X, control1Y);
  line(anchor2X, anchor2Y, control2X, control2Y);
Mimi Yin NYU-ITP
Zeno's Paradox or easing.
let x;
function setup() { 
  createCanvas(windowWidth, windowHeight);
  x = 0;
} 
function draw() { 
  background(255);
  
  x += (width-x)*0.01;
  
  fill(0);
  ellipse(x, height/2, 10,10);
Mimi Yin NYU-ITP
Drawing lines.
var mode = 0;
function setup() { 
  createCanvas(windowWidth, windowHeight);
  background(255);
} 
function draw() { 
  var speed = dist(pmouseX, pmouseY, mouseX, mouseY);
	var sw = 1;
  
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
  
Mimi Yin NYU-ITP
Graphing Noise
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
  
  x++;
  
  y = (noise(t)-0.5)*height/4 + height/2;
  
 	line(px, py, x, y);
  
  px = x;
  py = y;
Simply sine and cosine
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
  for (let a = 0; a < TWO_PI; a += aSpeed) {
    x++;
    let y = sin(a) * r + yOffset;
    ellipse(x, y, 1, 1);
    let y = cos(a) * r + yOffset;
    ellipse(x, y, 1, 1);
  }
  dotX++;
  dotA += aSpeed;
  if (dotX > width) dotX = 0;
  fill(255, 0, 0);
  dotY = sin(dotA) * r + yOffset;
  ellipse(dotX, dotY, 10, 10);
  dotY = cos(dotA) * r + yOffset;
  ellipse(dotX, dotY, 10, 10);
Mimi Yin NYU-ITP
Graphing Random
let x, y;
let px, py;
function setup() { 
  createCanvas(windowWidth, windowHeight);
	background(255);
  x = 0;
  y = height/2;
  px = x;
  py = y;
} 
function draw() { 
  
  x+=10;
  
  y = random(-height/4, height/4) + height/2;
  
 	line(px, py, x, y);
  
  px = x;
  py = y;
Mimi Yin NYU-ITP
Circular Pathways
let x, y;
let angle;
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
  
  angle += 0.01;
  
  x = cos(angle)*r + width/2;
  y = sin(angle)*r + height/2;
	
  ellipse(x, y, 1, 1);
Mimi Yin NYU-ITP
Visualizing relationship between circle
sine, cosine and tan waves.
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
  tSpeed = (width / TWO_PI) * .000075;
}
function draw() {
  background(128);
  noStroke();
  
  if (drawSin) {
    fill(255, 0, 0);
    for (let t = 0; t < theta; t += abs(tSpeed)) {
      ellipse(t * 100, circle.y + r * sin(t), 1, 1);
    }
  }
  if (drawCos) {
    fill(0, 0, 255);
    for (let t = 0; t < theta; t += abs(tSpeed)) {
      ellipse(t * 100, circle.y + r * cos(t), 1, 1);
    }
  }
  if (drawTan) {
    fill(0);
    for (let t = 0; t < theta; t += abs(tSpeed)) {
      ellipse(t * 100, circle.y + r * tan(t), 1, 1);
    }
  }
  stroke(225);
  line(0, circle.y, width, circle.y);
  let circum = createVector(circle.x + r * cos(theta), circle.y + r * sin(theta));
  noStroke();
  fill(255, 0, 0);
  ellipse(circle.x, circle.y, 10, 10);
  fill(0, 255, 0);
  ellipse(circle.x, circum.y, 10, 10);
  fill(0, 0, 255);
  ellipse(circum.x, circum.y, 10, 10);
  stroke(255, 0, 0);
  strokeWeight(5);
  line(circle.x, circle.y, circle.x, circum.y);
  line(circum.x, circum.y, circum.x, circle.y);
  stroke(0, 0, 255);
  line(circum.x, circum.y, circle.x, circum.y);
  noFill();
  strokeWeight(1);
  stroke(200);
  ellipse(circle.x, circle.y, d, d);
  if (circle.x > width || circle.x < 0) {
    speed.mult(-1);
    tSpeed *= -1;
  }
  circle.add(speed);
  theta += tSpeed;
}
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
Mimi Yin NYU-ITP
Deconstructing the relationship between
circles and the sine and cosine waves.
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
  tSpeed = (width / TWO_PI) * .000075;
}
function draw() {
  background(128);
  noStroke();
  fill(255, 0, 0);
  for (let t = 0; t < theta; t+=abs(tSpeed)) {
    ellipse(t*100, circle.y + r*sin(t), 5, 5);
  }
  if(drawCos){
    fill(0, 0, 255);
    for (let t = 0; t < theta; t+=abs(tSpeed)) {
      ellipse(t*100, circle.y + r*cos(t), 5, 5);
    }
  }
  stroke(225);
  line(0, circle.y, width, circle.y);
  let circum = createVector(circle.x + r*cos(theta), circle.y + r*sin(theta));
  noStroke();
  fill(255, 0, 0);
  ellipse(circle.x, circle.y, 10, 10);
  fill(0, 255, 0);
  ellipse(circle.x, circum.y, 10, 10);
  fill(0, 0, 255);
  ellipse(circum.x, circum.y, 10, 10);
  stroke(255, 0, 0);
  strokeWeight(5);
  line(circle.x, circle.y, circle.x, circum.y);
  line(circum.x, circum.y, circum.x, circle.y);
  stroke(0, 0, 255);
  line(circum.x, circum.y, circle.x, circum.y);
  noFill();
  strokeWeight(1);
  stroke(200);
  ellipse(circle.x, circle.y, d, d);
  if (circle.x > width || circle.x < 0) {
    speed.mult(-1);
    tSpeed *= -1;
  }
  circle.add(speed);
  theta += tSpeed;
  noStroke();
  rect(0, 0, 500, 30);
  fill(255);
  text("Press mouse to show/hide cosine wave.", 10, 20);
}
function mousePressed(){
 drawCos = !drawCos;
Visualizing how direction is constantly
changing as you move around a circle.
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
  x = (cos(frameCount*0.01)*r) + centerX;
  y = (sin(frameCount*0.01)*r) + centerY;
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
  fill(255, 0, 0);
  noStroke();
  ellipse(x, y, 10, 10);
  stroke(0, 64);
  noFill();
  ellipse(centerX, centerY, r*2, r*2);
Noisy pathways.
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
	
  t += 0.01;
  
	x += (noise(t)-0.5)*2;
	y += (noise(t*2)-0.5)*2;
 
  stroke(255);
  line(px, py, x, y);
  
  px = x;
  py = y;
Levy Flight adapted from Dan Shiffman's version for Nature of Code
let x, y;
let px, py;
function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
  px = x;
  py = y;
  noStroke();
  background(0);
}
function draw() {
  let stepSize = montecarlo()*100;
	x += random(-1,1)*stepSize;
	y += random(-1,1)*stepSize;
  stroke(255);
  line(px, py, x, y);
  px = x;
  py = y;
}
function montecarlo(){
  while (true) {
		let r1 = random(1);
  	let probability = pow(1.0 - r1,8);
    let r2 = random(1);
    if (r2 < probability) {
      return r1;
    }
  }
Mimi Yin NYU-ITP
A more random random.
Randomly select a cell in a 10x10 grid to make red.
OR Make entire canvas red if a certain cell is randomly selected.
let zoom;
let numCols, numRows;
let cellW, cellH;
function setup() {
  createCanvas(windowWidth, windowHeight);
  numCols = 10;
  numRows = 10;
  cellW = width/numCols;
  cellH = height/numRows;
}
function draw() {
  background(255);
	x = floor(random(numCols));
  y = floor(random(numRows));
  if(zoom) {
    if(x == 2 && y == 5) {
      background('red');
    }
  }
  else {
  	fill('red');
    rect(x*cellW, y*cellH, cellW, cellH);
  }
}
function mousePressed(){
 zoom = !zoom;
Random pathways.
let x, y;
let px, py;
function setup() {
  createCanvas(windowWidth, windowHeight);
  
  x = width/2;
  y = height/2;
  px = x;
  py = y;
  noStroke();
  background(0);
}
function draw() {
	x += random(-50,50);
	y += random(-50,50);;
 
  stroke(255);
  line(px, py, x, y);
  
  px = x;
  py = y; 
Linear motion, deconstructed.
let x, y;
let xstart, ystart;
function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = 10;
  xstart = x;
	ystart = y;
  noStroke();
  textSize(16);
}
function draw() {
  background(0);
  x += .2;
  y += .8;
  fill(255);
  ellipse(x, y, 10, 10);
  text("c", x + 10, y + 5);
  
  fill(255, 16);
  rect(0, 0, x, height);
  fill(255, 0, 0);
  ellipse(x, ystart, 10, 10);
  text("a", x + 10, ystart + 5);
  
  fill(255, 8);
  rect(0, 0, width, y);  
  fill(0, 0, 255);
  ellipse(xstart, y, 10, 10);
  text("b", xstart - 20, y + 5);
Linear motion.
let x, y;
function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = 10;
  noStroke();
}
function draw() {
  background(0);
  x += -.4;
  y += .8;
  fill(255);
  ellipse(x, y, 10, 10);
var kinectron = null;
var midSpine;
function setup() {
  createCanvas(640, 480);
  background(0);
  noStroke();
  kinectron = new Kinectron("192.168.0.117");
  kinectron.makeConnection();
  kinectron.startDepth(depth);
  
  frameRate(30);
}
function draw() {
  text("fps: " + frameRate, 10, 20);
}
function depth(data) {
	loadImage(data.src, function(img) {
    img.loadPixels();
    if(frameCount%10 == 0) {
    	background(0);
      for(var i = 0; i < img.pixels.length; i+=160) {
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
Drawing a trail.
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
  locs.push(createVector(mouseX, mouseY));
  if(locs.length> 50) locs.shift();
  for(let l = 0; l < locs.length; l++) {
    let sz;
    if(throbbing) sz = sin(frameCount*0.01)*l + l;
    else sz = 10;
		if(easing) {
      locs[l].x+=(mouseX-locs[l].x)*0.01;
      locs[l].y+=(mouseY-locs[l].y)*0.01;
    }
  	ellipse(locs[l].x, locs[l].y, sz, sz);
    text("Press 'e' to ease. Press 't' to throb.", 10, 20);
  }
}
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
Mimi Yin NYU-ITP
Drawing lines.
let mode = 0;
function setup() { 
  createCanvas(windowWidth, windowHeight);
  background(255);
} 
function draw() { 
  
  let speed = dist(pmouseX, pmouseY, mouseX, mouseY);
	let sw = 1;
  
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
function mousePressed(){
 	mode++;
  mode%=4;
}
function keyPressed(){
  background(255);
}
  
  var myCanvas = null;
var kinectron = null;
var rightHand, prightHand, midSpine;
function setup() {
  myCanvas = createCanvas(500, 500, WEBGL);
  background(0);
  noStroke();
  kinectron = new Kinectron("172.16.229.40");
  kinectron.makeConnection();
  kinectron.startTrackedBodies(bodyTracked);
}
function draw() {
}
function bodyTracked(body) {
	
  midSpine = body.joints[kinectron.SPINEMID];
  kinectron.getJoints(drawJoint);
  
  
  prightHand = rightHand;
  
}
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
  var dirX = map(mouseX, 0, width, -1, 1);
  var dirY = map(mouseY, 0, height, -1, 1);
  directionalLight(250, 250, 250, dirX, -dirY, 0.25);
  ambientMaterial(250);
  sphere(50, 64);
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
  var locY = (mouseY / height - 0.5) *(-2);
  var locX = (mouseX / width - 0.5) *2;
  pointLight(250, 250, 250, locX, locY, 0);
  ambientMaterial(250);
  for (var i = 0; i < 500; i += 100) {
    push();
    translate(0, 100, 0);
    translate(0, 100, 0);
    triangle(
      0, sin(i + frameCount * 0.1) * 10, i,
      60, 60, i, -60, 60, i);
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
  box(30, 50, 50);
  
  translate(-100, -100, 0);
  
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
  
  rotate(rot, [1, 1, 0]);
  
  box();
  rot+=0.05;
  
}function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}
function draw(){
  background(0);
  translate(-width/2, -height/2, 0);
  box();
}function setup() {
  createCanvas(600, 400, WEBGL);
}
function draw(){
  background(0);
  push();
  translate(-width/2, -height/2, -300);
  box(100);
  pop();
  
  push();
  translate(width/2, height/2, 1000);
  sphere(100);
  pop();
}var myCanvas = null;
var kinectron = null;
var midSpine;
function setup() {
  myCanvas = createCanvas(500, 500, WEBGL);
  background(0);
  noStroke();
  kinectron = new Kinectron("192.168.0.117");
  kinectron.makeConnection();
  kinectron.startTrackedBodies(bodyTracked);
}
function draw() {
}
function bodyTracked(body) {
	
  kinectron.getJoints(drawJoint);
}
function drawJoint(joint) {
	
  push();
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
var kinectron = null;
var characterWidth = 250;
var characterHeight = 400;
var backgroundColor = 255;
var ballColor = 150;
var characterColor = 0;
var leftHandState = 0;
var rightHandState = 0;
var handJoint = 23;
var x = 100;
var y = 100;
var xdir = 2;
var ydir = 1;
var caught = false;
var processing = false;
var joints = [];
for (var a = 0; a < 23; a++) {
  joints[a] = {};
  joints[a].x = 0;
  joints[a].y = 0;
}
function setup() {
  myCanvas = createCanvas(windowWidth, windowHeight - 100);
  background(0);
  kinectron = new Kinectron("192.168.0.116");
  kinectron.makeConnection();
  kinectron.startTrackedBodies(playCatch);
}
function draw() {
}
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
    leftHandState = body.leftHandState;
    rightHandState = body.rightHandState;
    for (var j = 0; j < body.joints.length; j++) {
      joints[j] = {
        x: (body.joints[j].cameraX) * characterWidth / 2 + width / 2,
        y: (body.joints[j].cameraY * -1) * characterHeight / 2 + height / 2 + 50
      };
    }
    if (dist(joints[handJoint].x, joints[handJoint].y, x, y) < 150) {
      caught = true;
      ballColor = color(random(255), random(255), random(255));
    }
    fill(characterColor);
    for (var d = 0; d < joints.length; d++) {
      ellipse(joints[d].x, joints[d].y, 25, 25);
    }
    if (!caught) {
      x += xdir * 2;
      y += ydir * 2;
      if (x >= width || x <= 0) xdir *= -1;
      if (y >= height || y <= 0) ydir *= -1;
    }
    fill(ballColor);
    ellipse(x, y, 50, 50);
    processing = false;
  }
var beach;
var kinectron = null;
function preload() {
  beach = loadImage("beach.png");
}
function setup() {
  createCanvas(640, 426);
  background(255);
  kinectron = new Kinectron("172.16.229.40");
  kinectron.makeConnection();
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
var kinectron = null;
function setup() {
  canvas = createCanvas(500, 500);
  background(0);
  kinectron = new Kinectron("172.16.229.215");
  kinectron.makeConnection();
  kinectron.setRGBCallback(drawFeed);
  kinectron.setDepthCallback(drawFeed);
  kinectron.setInfraredCallback(drawFeed);
}
function draw() {
}
function keyPressed() {
  if (keyCode == TAB) {
    mode++;
    mode%=3;
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
  loadImage(img.src, function(loadedImage) {
    image(loadedImage, 0, 0);
  });
}var myCanvas = null;
var kinectron = null;
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
  kinectron = new Kinectron("169.254.237.66");
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
function drawJoint(joint) {
  fill(100);
  ellipse(joint.depthX * myCanvas.width, joint.depthY * myCanvas.height, 15, 15);
  fill(200);
  ellipse(joint.depthX * myCanvas.width, joint.depthY * myCanvas.height, 3, 3);
}
function drawHands(hands) {
  if ((Math.abs(hands.leftHand.depthX - hands.rightHand.depthX) < 0.01) && (Math.abs(hands.leftHand.depthY - hands.rightHand.depthY) < 0.01)) {
    hands.leftHandState = 'clapping';
    hands.rightHandState = 'clapping';
  }
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
    case 'clapping':
      drawHand(hand, 1, 'red');
  }
}
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
  ellipse(hand.depthX * myCanvas.width, hand.depthY * myCanvas.height, diameter, diameter);
}function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  fill(255);
  background(0);
  
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
var x = 0;
var y = 0;
var vx = 0;
var vy = 0;
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
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(200);
}
function mouseMoved() {
  drawLine();
}
function touchMoved() {
  drawLine();
  return false;
}
function drawLine() {
  strokeWeight(10)
  stroke(0);
  var x = mouseX || touchX;
  var y = mouseY || touchY;
  var px = pmouseX || ptouchX;
  var py = pmouseY || ptouchY;
  line(x, y, px, py);
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  setShakeThreshold(50);
  colorMode(HSB);
  background(0);
}
function deviceShaken() {
  var h = random(255);
  background(h, 255, 255);
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
var bgColor;
function setup() {
  createCanvas(windowWidth, windowHeight);
  bgColor = color(0,0,0);
}
function draw() {
  background(bgColor);
  var x = map(accelerationY, -90, 90, 0, width);
  var y = map(accelerationX, -90, 90, 0, height);
  fill(255);
  ellipse(x, y, 30, 30);
}
function deviceMoved() {
  var r = map(accelerationX, -90, 90, 0, 255);
  var g = map(accelerationY, -90, 90, 0, 255);
  var b = map(accelerationZ, -90, 90, 0, 255);
  bgColor = color(r, g, b);
}
var colors;
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(200);
  colors = [color(255,0,0), color(0,255,0), color(0,0,255), color(255, 255,0), color(0,255,255)];
}
function draw() {
  for (var i = 0; i < touches.length; i++) {
    noStroke();
    fill(colors[i]);
    ellipse(touches[i].x, touches[i].y, 24, 24);
  }
}
function touchMoved() {
  return false;
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(200);
}
function touchMoved() {
  strokeWeight(10)
  stroke(0);
  line(touchX, touchY, ptouchX, ptouchY);
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
function draw() {
   image(img, 0, 0, width, height);
  
	
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
  update() {
    this.x += this.xspeed;
    this.y += this.yspeed;
    this.xspeed = bounce(this.x, this.xspeed, 0, width);
    this.yspeed = bounce(this.y, this.yspeed, 0, height);
    var panning = map(this.x, 0., width, -1.0, 1.0);
    rain.pan(panning);
  }
  display() {
    ellipse(this.x, this.y, this.w * vol, this.h * vol);
  }
}
function bounce(position, speed, min, max) {
  if (position < min || position > max) {
    speed *= -1;
    thunder.play();
  }
  return speed;
let allTokens = [];
let ts = 16;
let i = 0;
function preload() {
  let q = "trump";
  let apikey = "5fcc7b03d74d15972346cf84719ad5e5:13:68130021";
  loadJSON(url, showSnippets);
}
function setup() {
  createCanvas(800, 800);
  fill(0);
}
function draw() {
  background(255, 5);
  ts++;
  ts %= 48;
  if (allTokens.length > 0) {
    i += 1;
    i %= allTokens.length;
    textSize(ts);
    text(allTokens[floor(i)], random(width), random(height));
  }
}
function showSnippets(data) {
  let docs = data.response.docs;
  console.log(data.response.docs.length);
  let trumps = ["Trumpy", "McTrumpFace", "Trumperson"];
  let matchTrump = ["Donald", "Trump", "president", "President"];
  let obamas = ["Obamamama", "Bananabama", "ObamanKenaba"];
  let matchObama = ["Barack", "Obama"];
  for (let i = 0; i < docs.length; i++) {
    let tokens = splitTokens(docs[i].snippet);
    for (var j = 0; j < tokens.length; j++) {
      for (let k = 0; k < matchTrump.length; k++) {
        let m = matchTrump[k];
        if (match(tokens[j], m)) {
          console.log(match(tokens[j], m));
          tokens[j] = trumps[floor(random(trumps.length))];
          break;
        }
        if (k < matchObama.length) {
          let m = matchObama[k];
          if (match(tokens[j], m)) {
            console.log(match(tokens[j], m));
            tokens[j] = obamas[floor(random(obamas.length))];
          }
        }
      }
      shuffle(tokens, true);
    }
    allTokens = concat(allTokens, tokens);
  }
}function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
function setup() {
  noCanvas();
  noLoop();
  noStroke();
  fill(0);
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
      }
    }
  }
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
        }
      }
    }
    if(balls[b].isClicked()) {
     	balls.splice(b, 1);
    }
  }  
}
function mousePressed(){
 	balls.push(new Ball(mouseX + random(-50, 50), mouseY + random(-50, 50), random(-5, 5), random(-5, 5), random(10, 50))); 
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
    this.xspeed = this.bounce(this.x, this.xspeed, 0, width);
    this.yspeed = this.bounce(this.y, this.yspeed, 0, height);
  }
  
  this.bounce = function(position, speed, min, max){
    if(position < min || position > max){
     speed *= -1; 
    }x
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
      if(i != j) {
        if(balls[i].isNear(balls[j])) {
          balls[i].changeColor();
          balls[j].changeColor();
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
  this.update = function(){
    this.x+=this.xspeed;
    this.y+=this.yspeed;
    this.xspeed = this.bounce(this.x, this.xspeed, 0, width);
    this.yspeed = this.bounce(this.y, this.yspeed, 0, height);
  }
  
  this.bounce = function(position, speed, min, max) {
    if(position < min || position > max) {
      speed *= -1;
    }
    return speed;
  }
  this.isClicked = function() {
    return mouseIsPressed && dist(this.x, this.y, mouseX, mouseY) < this.w; 
  }
  this.isNear = function(otherBall) {
    return dist(this.x, this.y, otherBall.x, otherBall.y) < this.w; 
  }
  
  
  this.changeColor = function() {
   this.color = { r: random(255), g: random(255), b:random(255) }; 
  }
  
  this.display = function(){
    fill(this.color.r, this.color.g, this.color.b);
    ellipse(this.x, this.y, this.w, this.h);
  }
var lowest = 1000;
var highest = 0;
function setup() {
  createCanvas(600, 600);
}
function draw() {
  background("#2307AF");
	fill(255);
  strokeWeight(0);
	ellipse(sensorValue, height/2, 20, 20);
  text(sensorValue, 20, 20);
	
  if(sensorValue < lowest && sensorValue > 0) lowest = sensorValue;
  if(sensorValue > highest) highest = sensorValue;
  
  
  var v = map(sensorValue, lowest, highest, 0, width);
  
  fill(255, 0, 0);
  strokeWeight(10);
  noFill();
  ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);
  ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
  bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);
	
  bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
}
 for (var i = 0; i < portList.length; i++) {
 }
}
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
  ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);
  ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
	
  bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
  
  v+=random(-5, 5);
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
    if(i != j) {
      if(dist(balls[i].x, balls[i].y, balls[j].x, balls[j].y) < 5 ) {
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
  this.update = function(){
    this.x+=this.xspeed;
    this.y+=this.yspeed;
    this.xspeed = this.bounce(this.x, this.xspeed, 0, width);
    this.yspeed = this.bounce(this.y, this.yspeed, 0, height);
  }
  
  
  this.bounce = function(position, speed, min, max) {
    if(position < min || position > max) {
      speed *= -1;
    }
    return speed;
  }
  
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
function setup() {
  createCanvas(320, 240);
}
function draw() {
  background("#2307AF");
	fill(255);
	ellipse(sensorValue, height/2, 20, 20);
  text(sensorValue, 20, 20);
  
  ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);
  ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
  bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);
  bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
}
 for (var i = 0; i < portList.length; i++) {
 }
}
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
function update(){
   x += xspeed;
   y += yspeed;
  xspeed = bounce(x, xspeed, 0, width);
  
  yspeed = bounce(y, yspeed, 0, height);
}
function bounce(position, speed, min, max) {
    if( position < min || position > max) {
    	speed *= -1;
  }
  return speed;
}
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
  
  
  x1speed = bounce(x1, x1speed, 0, width);
  
  y1speed = bounce(y1, y1speed, 0, height);
  x1 += x1speed;
  y1 += y1speed;
  
  x2speed = bounce(x2, x2speed, 0, width);
  y2speed = bounce(y2, y2speed, 0, height);
  x2 += x2speed;
  y2 += y2speed;
  
  
  c1speed = bounce(c1, c1speed, 0, 255);
  
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
} 
function draw() { 
  background(220);
	
  if(frameCount%60 == 0 ) {
   rect(width/4, height/2, 50, 50); 
  }  
  else if(frameCount%60 > 30 ) {
   rect(width/2, height/2, 50, 50); 
  }
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
  for (var posx=width;posx>=0;posx-=width/10){
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
    
  if(positionX > width || positionX < 0) { 
    xSpeed = xSpeed * -1;
  }
    
  
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
      
      
			
      
    	fill(map(dist(mouseX, mouseY, x, y), 100,sqrt(sq(400) + sq(400)), 255, 0));
			
      
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
  
  
	x++;
  
  
  
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
	var d = dist(mouseX, mouseY, pmouseX, pmouseY);
	
	strokeWeight(sw);
	
	var a = 512/d; 
	stroke(255, a);
  
	line(mouseX, mouseY, pmouseX, pmouseY);
	
	fill(255, a);
  
	noStroke();
  
	var range = d*2;
	var offset = random(-range, range);
  
	ellipse(mouseX + offset, mouseY + offset, d, d);
}  var x;
function setup() { 
  createCanvas(800, 600);
  background(220);
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
  
  bg.r += bgspeed.r;
  bg.g += bgspeed.g;
  bg.b += bgspeed.r;
  
  fg.r += fgspeed.r;
  fg.g += fgspeed.g;
  fg.b += fgspeed.r;
  
  if(bg.r < 0 || bg.r > 255 ) bgspeed.r *= -1;
  if(bg.g < 0 || bg.g > 255 ) bgspeed.g *= -1;
  if(bg.b < 0 || bg.b > 255 ) bgspeed.b *= -1;
  if(fg.r < 0 || fg.r > 255 ) fgspeed.r *= -1;
  if(fg.g < 0 || fg.g > 255 ) fgspeed.g *= -1;
  if(fg.b < 0 || fg.b > 255 ) fgspeed.b *= -1;
  
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