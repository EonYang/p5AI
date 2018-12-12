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
var value = "0";
var a = 10;
var speed = 5;
function setup() {
  createCanvas(500, 500);
}
function draw() {
  background(255);
  fill(212);
  textSize(20);
  text("var{stroke(123,123,321){stroke(123,123,321)fill(255,255,255)set;}{stroke(123,123,321(123,123,321)fill(255,255,255)set;{stroke(123,123,321)}var{stroke(123,123,321){stroke(123,123,321)fill(255,255,255)set;}{stroke(123,123,321)ITPIsAwesomeWeLoveCodingtrainar{stroke(123,123,321){stroke(123,123,321)fill(255,255,255)set;{stroke(123,123,321)}", 0 + a, 0, 150, 120);
  text("text{stroke()Codingsohardfill()setvar=1{(200,123,48,);}ar{stroke(123,123,321)fill(255,255}ar{stroke(123,123,321)fill(255,255,255)set;};noStroke();fill(247,221,212)ITPIsAwesomeWeLoveCodingtrainar{stroke(123,123,321)23,321(123,123,321)fill(255,255,255)set;{st123,321)ITPIsAwesomeWeLoveCodingtrainar{stroke(123,", 5 + a, 25, 150, 120);
  text("(123,123,321)fill(255,255,255)set;}ITPIsAwesomeWeLoveCodingtrainarc(250,245,270,420,ke(123,123,321)fill(255,255}ar{stroke(123,123,321)fill(255,255,255)set;}TPIsAwesomeWeLoveCodingtrainar{stroke(123,123,321)23,321(123,123,321)fill(255,255,255)set;{st123,321)ITPIsAwesomeWeLoveCodingtrainar{stroke(123,", 0 + a, 50, 150, 120);
  text("noStroke();fill(247,221,212);ellipse(250,200,190,200);21,212);noStroke();fill(247,221,212);ellipse(250,200,190,200);ellipse(250,200,190,200)23,321(123,123,321)fill(255,255,255)set;23,321(123,123,321)fill(255,255,255)set;123,321)ITPIsAwesomeWeLoveCodingtrainar{stroke5,255,255)set;};noStroke();fil(123,{st{st", 0 + a, 75, 150, 120);
  text("triangle(250,220,260,250,240,250)}{)setvar=1{(200,123,48,);noStroke();fill(247,221,212);ellipse(250,200,190,200);}23,321(123,123,321)fill(255,255,255)set;{st23,321(123,123,321)fill(255,255,255)123,321)ITPIsAwesomeWeLoveCodingtrainar{stroke(123,123,321)ITPIsAwesomeWeLoveCodingtrainar{stroke(123,set;{star{s", 0 + a, 100, 150, 120);
  text("fill(255,255,255)set;var{stroke(12fill(255,255,255)set;}ITPIsAwesome)5,255,255)set;};noStroke();filsetvar=15,255,255)set;};noStroke();fil{(200,123,48,;noStroke();(123,123,321)fillnoStroke();fill(247,221,212))", 0 + a, 150, 150, 120);
  text("noStroke();fill(247,221,212);ellipse(250,200,190,200);noStroke();5,255,255)set;};noStroke();filfill(247,221,212);ellipse(250,200,190,200);5,255,255)set;};noStroke();filect(165,315,170,132,18);", 0 + a, 175, 150, 120);
  text("text{stroke()Codingsohardfill()setvar=1{(200,123,48,);}ar{stroke(123,123,321)fill(255,255,255)set;}ect(165,315,170,132,18);ect(165,315,170,132,18);ect(165,315,170,132,18);", 5 + a, 200, 150, 120);
  text("text{stroke()Codingsohardfill()setvar=1{(200,123,48,);}ar{stroke(123,123,321)fill(255,255}ar{stroke(123,123);fill(247,221,212)", 5 + a, 225, 150, 120);
  text("(123,123,321)fill(255,255,255)set;}ITPIsAwesomeWeLoveCodingtrainarc(250,245,270,420,ke(123,123,321)fill(255,255}ar{stroke(123,123,321)fill(255,255,255)set;}", 0 + a, 250, 150, 120);
  text("noStroke();fill(247,221,212);ellipse(250,200,190,200);21,212);noStroke();fill(247,221,212);ellipse(250,200,190,200);ellipse(250,200,190,200)", 0 + a, 275, 150, 120);
  text("triangle(250, 220, 260, 250, 240, 250)}{)setvar=1{(200,123,48,);noStroke();fill(247,221,212);ellipse(250,200,190,200);}ar{s", 0 + a, 300, 150, 120);
  text("fill(255,255,255)set;var{stroke(12fill(255,255,255)set;}ITPIsAwesome)setvar=1{(200,123,48,;noStroke();(123,123,321)fill(255,255,255)set;};noStroke()fill(247,221,212);noStroke();fill(247,221,212))", 0 + a, 350, 150, 120);
  text("noStroke();fill(247,221,212);ellipse(250,200,190,200);noStroke();fill(247,221,212);ellipse(250,200,190,200);noStroke();fill(247,221,212);ellipse(250,200,190,200);", 0 + a, 400, 150, 120);
  text("text{stroke()Codingsohardfill()setvar=1{(200,123,48,);}ar{stroke(123,123,321)fill(255,255,255)set;}", 5 + a, 425, 150, 120);
  a = a + speed
  if (a > 0) {
    a = -500
  }
  if (value == "0") {
    noStroke()
    fill(64, 51, 38);
    arc(250, 245, 270, 420, QUARTER_PI + HALF_PI, QUARTER_PI);
    fill(247, 221, 212);
    ellipse(163, 215, 50, 50);
    noStroke();
    fill(247, 221, 212);
    ellipse(250, 200, 190, 200);
    noStroke();
    fill(255, 184, 194);
    ellipse(200, 230, 30, 20);
    ellipse(300, 230, 30, 20);
    noStroke();
    fill(64, 51, 38);
    arc(250, 130, 160, 80, Math.PI, 0);
    arc(300, 100, 270, 125, 0.25 * Math.PI, Math.PI);
    stroke(64, 51, 38);
    strokeWeight(6);
    line(190, 173, 220, 170);
    line(278, 170, 308, 173);
    stroke(128, 128, 128);
    strokeWeight(1);
    fill(255);
    ellipse(209, 200, 35, 35);
    ellipse(291, 200, 35, 35);
    stroke(128, 128, 128);
    fill(102, 102, 51);
    ellipse(209, 200, 18, 18);
    ellipse(291, 200, 18, 18);
    noStroke();
    fill(247, 221, 155);
    triangle(250, 220, 260, 250, 240, 250);
    noStroke();
    fill(255, 169, 168);
    ellipse(250, 270, 12, 12);
    noStroke();
    fill(247, 221, 212);
    rect(165, 315, 170, 132, 18);
    noStroke();
    fill(102, 21, 173);
    rect(190, 310, 120, 140, 8);
    noStroke();
    fill(247, 221, 212);
    arc(250, 310, 40, 40, 0, PI);
    rect(230, 280, 40, 30);
  } else if (value == "1") {
    noStroke()
    fill(64, 51, 38);
    arc(250, 245, 270, 420, QUARTER_PI + HALF_PI, QUARTER_PI);
    fill(247, 221, 212);
    ellipse(163, 215, 50, 50);
    noStroke();
    fill(247, 221, 212);
    ellipse(250, 200, 190, 200);
    frameRate(15);
    noStroke();
    fill(255, random(164, 171), random(196, 212));
    ellipse(random(197, 203), random(228, 232), 30, 20);
    ellipse(random(297, 303), random(228, 232), 30, 20);
    noStroke();
    fill(64, 51, 38);
    arc(250, 130, 160, 80, Math.PI, 0);
    arc(300, 100, 270, 125, 0.25 * Math.PI, Math.PI);
    frameRate(10);
    stroke(64, 51, 38);
    strokeWeight(random(5, 7));
    line(190, random(171, 175), 220, random(168, 171));
    line(278, random(168, 172), 308, random(171, 175));
    stroke(128, 128, 128);
    strokeWeight(1);
    fill(255);
    ellipse(209, 200, 35, 35);
    ellipse(291, 200, 35, 35);
    frameRate(speed * 5);
    stroke(128, 128, 128);
    fill(102, 102, 51);
    ellipse(random(201, 217), random(194, 206), 18, 18);
    ellipse(random(281, 300), random(194, 206), 18, 18);
    noStroke();
    fill(247, 221, 155);
    triangle(250, 220, 260, 250, 240, 250);
    frameRate(10);
    noStroke();
    fill(255, 169, 168);
    ellipse(250, 270, random(10, 20), 12);
    noStroke();
    fill(247, 221, 212);
    rect(165, 315, 170, 132, 18);
    noStroke();
    fill(102, 21, 173);
    rect(190, 310, 120, 140, 8);
    noStroke();
    fill(247, 221, 212);
    arc(250, 310, 40, 40, 0, PI);
    rect(230, 280, 40, 30);
  }
  drawITP()
}
function mousePressed() {
  if (value == "0") {
    value = "1";
  } else {
    value = "0";
  }
  noLoop()
}
function mouseReleased() {
  loop()
}
function drawITP() {
  textSize(32)
  fill(random(255), random(255), random(255));
  text("!TP", 225, 350, 150, 120);
  textSize(36)
}var output = document.getElementById('output'),
    pressed = {};
window.onkeydown = function(e) {
    if ( pressed[e.which] ) return;
    pressed[e.which] = e.timeStamp;
};
    
window.onkeyup = function(e) {
    if ( !pressed[e.which] ) return;
    var duration = ( e.timeStamp - pressed[e.which] ) / 1000;
    output.innerHTML += '<p>Key ' + e.which  + ' was pressed for ' + duration + ' seconds</p>';
    pressed[e.which] = 0;
};
    let video;
let slider;
let videoScale = 32;
function setup() { 
  createCanvas (640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size (width/videoScale,height/videoScale);
  video.hide();
  
} 
function draw() { 
  background(0);
  
  video.loadPixels();
  loadPixels();
  
  for(let y = 0; y < video.height; y++){
    for(let x = 0; x < video.width; x++){
      let index = (x + y * video.width)*4;
      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];
     
      let bright = (r+g+b)/3;
      
      
      let pie = map(bright, 0,255,0,6);
      
      
      noStroke();
      fill(255,bright,bright,255);
      
      arc(x * videoScale, y * videoScale, videoScale, videoScale, 0, pie, PIE);
      
      
        
      pixels[index + 0] =  bright;
      pixels[index + 1] =  bright;
      pixels[index + 2] =  bright;
      pixels[index + 3] =  255;
    
    }
  
    
  }
  
  
 
  
}let x = 220
let y = 200
let x1 = 400
let y1 = 200
let x2 = 300
let y2 = 300
function setup() {
  createCanvas(600, 600);
  background(0)
  noCursor();
}
function mousePressed() {
  background(0);
}
function draw() {
 
  background(0,5)
  stroke(mouseY, 200, mouseX, 255, 255);
  noFill();
  quad(mouseX, mouseY, x, y,x1,y1,x2,y2);
 
  x = x + random(-5, +5);
  y = y + random(-5, +5);
  x1 = x1 + random(-5, +5);
  y1 = y1 + random(-5, +5);
  x2 = x2 + random(-5, +5);
  y2 = y2 + random(-5, +5);
}var weather;
let apiKey = '&APPID=001b0f58045147663b1ea518d34d88b4';
let units = '&units=metric';
let input;
function setup() {
  createCanvas(400, 200);
  let input = "Jersey City";
}
function weatherAsk() {
  let url = api + input + apiKey + units;
  loadJSON(url, gotData);
}
function gotData(data) {
  weather = data;
}
function draw() {
  background(0);
  weatherAsk();
  if (weather) {
    let temp = weather.main.temp;
    var humidity = weather.main.humidity;
    ellipse(100, 100, temp, temp);
    ellipse(300, 100, humidity, humidity);
    console.log(temp);
  }
  
}let bubbles = [];
let canvas;
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");
  for (var i = 0; i < 1; i++) {
    bubbles[i] = new Bubble(random(width), random(height));
  }
  stroke(136, 119, 236);
}
function mousePressed() {
  bubbles.push(new Bubble(mouseX, mouseY));
}
function keyPressed() {
  bubbles.splice(0, 1);
}
function draw() {
  background(255);
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].display();
    bubbles[i].shadows();
    bubbles[i].color();
    bubbles[i].update();
  }
  
  
}var clientId = '3127979041-gt4hh27ktaorbio8jmjcqldfv5a9ujql.apps.googleusercontent.com';
var apiKey = 'AIzaSyBr5w2thmXTvyVeJBgBQJqpX0jTTVtH-yo';
var change = 0;
 if(inByte.length >0){
 }
 inData = inByte;
}
}
function handleClientLoad() {
  window.setTimeout(checkAuth, 1);
}
function checkAuth() {
  gapi.auth.authorize({
    client_id: clientId,
    scope: scopes,
    immediate: true
  }, handleAuthResult);
}
function handleAuthClick() {
  gapi.auth.authorize({
    client_id: clientId,
    scope: scopes,
    immediate: false
  }, handleAuthResult);
  return false;
}
function handleAuthResult(authResult) {
  if(authResult && !authResult.error) {
    window.setInterval(loadGmailApi,1000);
    $('#authorize-button').remove();
    $('.table-inbox').removeClass("hidden");
  } else {
    $('#authorize-button').removeClass("hidden");
    $('#authorize-button').on('click', function(){
      handleAuthClick();
    });
  }
}
function loadGmailApi() {
  gapi.client.load('gmail', 'v1', displayInbox);
}
function displayInbox() {
  var request = gapi.client.gmail.users.messages.list({
    'userId': 'me',
    'q': 'label:inbox is:unread',
    'maxResults': 200000
  });
  request.execute(function(response) {
  var diff = response.resultSizeEstimate - change;
  console.log("unread messages change:" + diff);
   outByte = response.resultSizeEstimate;
   change = response.resultSizeEstimate;
});
}
function setup() {
  createCanvas(400, 400);
  p5.midi.init();
}
function draw() {
  background(220);
}
function onMidiPress(button){
  console.log(button);
  key = "A";
  onKeyPress饿的（）
}
var lastTimeStamp = 0;
p5.midi.onInput = function(e) {
  if (e.timeStamp > lastTimeStamp && e.data[0] === 179 && e.data[2] === 127) {
    var button = e.data[1];
    onMidiPress(button);
    lastTimeStamp = e.timeStamp;
  }
}let headImgs = [];
let heads = [];
let notes = [];
let button;
let beat;
function preload() {
  for (var o = 0; o < 10; o++) {
    headImgs[o] = loadImage("assets/shiffmanhead" + o + ".png");
  };
  soundFormats('mp3');
  notes.push(loadSound('./assets/aoao.mp3'));
  notes.push(loadSound('./assets/danielshiffman.mp3'));
  notes.push(loadSound('./assets/donotbangintomyneibough.mp3'));
  notes.push(loadSound('./assets/havenoidea.mp3'));
  notes.push(loadSound('./assets/ilookmuchyounger.mp3'));
  notes.push(loadSound('./assets/jellyfish.mp3'));
  notes.push(loadSound('./assets/juses.mp3'));
  notes.push(loadSound('./assets/midterm.mp3'));
  notes.push(loadSound('./assets/mynameisdaniel.mp3'));
  notes.push(loadSound('./assets/thisisitp.mp3'));
  notes.push(loadSound('./assets/toolate.mp3'));
  notes.push(loadSound('./assets/uhhhhh.mp3'));
  notes.push(loadSound('./assets/wuuuuuuu.mp3'));
  notes.push(loadSound('./assets/iteachinitp.mp3'));
  notes.push(loadSound('./assets/welcome.mp3'));
  notes.push(loadSound('./assets/meow.mp3'));
  beat = loadSound('./assets/beats.mp3');
}
function setup() {
  createCanvas(600, 600);
  background(120);
  button = createButton("beats");
  button.mousePressed(beatsPlaying);
}
function beatsPlaying() {
  if (!beat.isPlaying()) {
    beat.setVolume(0.5);
    beat.play();
    button.html("pause");
  } else {
    beat.stop();
    button.html("play");
  }
}
function draw() {
  background(0);
  if (heads.length != 0) {
    for (o = 0; o < heads.length; o++) {
      heads[o].show();
    }
  }
}
function keyPressed() {
  for (o = 0; o < 7; o++) {
    heads.push(new Head(random(width), random(height), headImgs[floor(random(0, headImgs.length))]));
  }
  if (key === 'A') {
    notes[14].setVolume(0.9);
    notes[14].play();
  } else if (key === 'S') {
    notes[13].setVolume(0.9);
    notes[13].play();
  
  } else if (key === 'D') {
    notes[6].setVolume(0.9);
    notes[6].play();
  } else if (key === 'F') {
    notes[0].setVolume(0.9);
    notes[0].play();
  } else if (key === 'G') {
    notes[4].setVolume(0.9);
    notes[4].play();
  } else if (key === 'H') {
    notes[11].setVolume(0.9);
    notes[11].play();
  } else if (key === 'J') {
    notes[8].setVolume(0.9);
    notes[8].play();
  } else if (key === 'K') {
    notes[7].setVolume(0.9);
    notes[7].play();
  } else if (key === 'L') {
    notes[2].setVolume(0.9);
    notes[2].play();
  } else if (key === 'Z') {
    notes[5].setVolume(0.9);
    notes[5].play();
  } else if (key === 'X') {
    notes[10].setVolume(0.9);
    notes[10].play();
  } else if (key === 'C') {
    notes[9].setVolume(0.9);
    notes[9].play();
  } else if (key === 'V') {
    notes[12].setVolume(0.9);
    notes[12].play();
  } else if (key === 'B') {
    notes[1].setVolume(0.9);
    notes[1].play();
  } else if (key === 'N') {
    notes[3].setVolume(0.9);
    notes[3].play();
  } else if (key === 'M') {
    notes[15].setVolume(0.9);
    notes[15].play();
  }
}
class Head {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.size = 1;
  }
  show() {
    push();
    imageMode(CENTER);
    translate(this.x, this.y);
    scale(this.size);
    image(this.img, 0, 0);
    pop();
    if (this.size > 0) {
      this.size -= 0.02;
    }
  }
}
const midiToKeys = {
  36: "A",
  37: "S",
  38: "D",
  39: "F",
  40: "G",
  41: "H",
  42: "J",
  43: "K",
  44: "L",
  45: "Z",
  46: "X",
  47: "C",
  48: "V",
  49: "B",
  50: "N",
  51: "M",
}
function onMidiPress(button){
  key = midiToKeys[button];
 
  keyPressed();
}
var lastTimeStamp = 0;
p5.midi.onInput = function(e) {
  if (e.timeStamp > lastTimeStamp && e.data[0] === 179 && e.data[2] === 127) {
    var button = e.data[1];
    onMidiPress(button);
    lastTimeStamp = e.timeStamp;
  }
let headImgs = [];
let heads = [];
function preload() {
  for (var i = 0; i< 7; i++){
        headImgs[i] = loadImage("shiffmanhead" + i + ".png"); 
}
}
function setup() {
  createCanvas(500, 500);
}
function draw() {
  background(0);
  if (heads.length != 0) {
  for (i = 0; i < heads.length; i++) {
    heads[i].show();
  }
  }
  
}
function keyPressed() {
  for (i = 0; i < 3; i++) {
    heads.push(new Head(random(width), random(height), headImgs[floor(random(0, headImgs.length))]));
  }
}
let headImgs = [];
function preload() {
  headImgs[0] = loadImage('shiffman1.jpg');
  headImgs[1] = loadImage('mitochondria1.png');
}
function setup() {
  createCanvas(500, 500);
}
function keyPressed() {
  let order = floor(random(0, headImgs.length));
  var b = new head(random(200,400), random(200,400), headImgs[order]);
  shiffmanHeads.push(b);
}
function draw() {
  background(0);
let headImgs = [];
function preload() {
  headImgs[0] = loadImage('shiffman1.jpg');
  headImgs[1] = loadImage('mitochondria1.png');
}
function setup() {
  createCanvas(500, 500);
}
function keyPressed() {
  let order = floor(random(0, headImgs.length));
  var b = new head(random(200,400), random(200,400), headImgs[order]);
  shiffmanHeads.push(b);
}
function draw() {
  background(0);
  for (var i = shiffmanHeads.length - 1; i >= 0; i--) {
    shiffmanHeads[i].update();
    shiffmanHeads[i].display();
  }
}
function preload(){
  soundFormats('mp3');
  notes.push(loadSound('./assets/aoao.mp3'));
  notes.push(loadSound('./assets/danielshiffman.mp3'));
  notes.push(loadSound('./assets/donotbangintomyneibough.mp3'));
  notes.push(loadSound('./assets/havenoidea.mp3'));
  notes.push(loadSound('./assets/ilookmuchyounger.mp3'));
  notes.push(loadSound('./assets/jellyfish.mp3'));
  notes.push(loadSound('./assets/juses.mp3'));
  notes.push(loadSound('./assets/midterm.mp3'));
  notes.push(loadSound('./assets/mynameisdaniel.mp3'));
  notes.push(loadSound('./assets/thisisitp.mp3'));
  notes.push(loadSound('./assets/toolate.mp3'));
  notes.push(loadSound('./assets/uhhhhh.mp3'));
  notes.push(loadSound('./assets/wuuuuuuu.mp3'));
  notes.push(loadSound('./assets/iteachinitp.mp3'));
  notes.push(loadSound('./assets/welcome.mp3'));
}
function setup(){
  createCanvas(1000,1000);
  background(0);
}
function keyPressed() {
  if (key === 'A') {
    notes[14].setVolume(0.9);
    notes[14].play();
  } else if (key === 'S') {
    notes[13].setVolume(0.9);
    notes[13].play();
  } else if (key === 'D') {
    notes[6].setVolume(0.9);
    notes[6].play();
  } else if (key === 'F') {
    notes[0].setVolume(0.9);
    notes[0].play();
  } else if (key === 'G') {
    notes[4].setVolume(0.9);
    notes[4].play();
  } else if (key === 'H') {
    notes[11].setVolume(0.9);
    notes[11].play();
  } else if (key === 'J') {
    notes[8].setVolume(0.9);
    notes[8].play();
  } else if (key === 'K') {
    notes[7].setVolume(0.9);
    notes[7].play();
  } else if (key === 'L') {
    notes[2].setVolume(0.9);
    notes[2].play();
  } else if (key === 'Z') {
    notes[5].setVolume(0.9);
    notes[5].play();
  } else if (key === 'X') {
    notes[10].setVolume(0.9);
    notes[10].play();
  } else if (key === 'C') {
    notes[9].setVolume(0.9);
    notes[9].play();
  } else if (key === 'V') {
    notes[12].setVolume(0.9);
    notes[12].play();
  } else if (key === 'B') {
    notes[1].setVolume(0.9);
    notes[1].play();
  } else if (key === 'N') {
    notes[3].setVolume(0.9);
    notes[3].play();
}
}
var foodlist=[
var calAte=0;
function setup() {
  nameP = createP('Your Cal budget: 2000');	
  nameP2 = createP('You ate: 0 cal');	
  nameP.parent("calBar");
  nameP2.parent("calBar");
  
  button1=createButton("Add 80 Cal dish");
  button1.parent("button");
  button1.mousePressed(updateAte);
  
  sliderVar= createSlider(0,2,0);
  sliderVar.parent("calBar");
  sliderVar.changed(updateText);
  
}
function updateText() {
  button1.html("Add " + (sliderVar.value()*500+80) +" Cal dish")
}
function updateAte() {
 
  var dishes = createImg(random(foodlist[sliderVar.value()]));
  dishes.parent("resultArea");
  calAte=calAte+sliderVar.value()*500+80;
  
  nameP.html('Your Cal budget: '+ (2000-calAte));
  nameP2.html('You ate: '+ calAte+ ' cal');
var portName = '/dev/cu.usbmodem1411';
var sensorValue = 0;
var sensorValue2 = 255;
function setup() { 
  createCanvas(400, 400);
  
  
} 
function draw() { 
  background(sensorValue);
  noStroke();
  fill(sensorValue2);
  ellipse(200,200,100);
}
function gotOpen()
{
}
function parseData(){
 
  if (inData.length > 0){
     
    var values = inData.split(',');
    sensorValue = int(values[0]);
    sensorValue2 = int(values[1]);
    
  }
}
var portName = '/dev/cu.usbmodem1411';
var sensorValue = 0;
var sensorValue2 = 255;
function setup() { 
  createCanvas(400, 400);
  
  
} 
function draw() { 
  background(sensorValue);
  noStroke();
  fill(sensorValue2);
  ellipse(200,200,100);
}
function gotOpen()
{
}
function parseData(){
 
  if (inData.length > 0){
     
    var values = inData.split(',');
    sensorValue = int(values[0]);
    sensorValue2 = int(values[1]);
    
  }
var portName = '/dev/cu.usbmodem1411';
var sensorValue = 0;
var sensorValue2 = 255;
function setup() { 
  createCanvas(400, 400);
  
  
} 
function draw() { 
  background(sensorValue);
  noStroke();
  fill(sensorValue2);
  ellipse(200,200,100);
}
function gotOpen()
{
}
function parseData(){
 
  if (inData.length > 0){
     
    var values = inData.split(',');
    sensorValue = int(values[0]);
    sensorValue2 = int(values[1]);
    
  }
var sensorValue = 0;
function setup() {
  
  createCanvas(400, 300);
}
function draw() {
    background(0);
    fill(sensorValue);
  	ellipse(100,100,100);
    
  }      
         
    if(inData.length>0){
     sensorValue = int(map(inData,0,1023,0,255)); 
    }
  
}
var sensorValue = 0;
function setup() {
  
  
  createCanvas(400, 300);
}
function openIt()
{
}
function draw() {
    background(0);
    fill(sensorValue);
  	ellipse(100,100,100);
    
  }      
         
    values = split(inData, ',');
    if(values.length>0){
     sensorValue = int(map(values[0],0,1023,0,255)); 
    }
  
}
var sensorValue = 0;
function setup() {
  
  createCanvas(400, 300);
}
function draw() {
    background(0);
    fill(sensorValue);
  	ellipse(100,100,100);
    
  }      
         
    if(inData.length>0){
     sensorValue = int(map(inData,0,1023,0,255)); 
    }
  
}
 
function setup() {
 
}
 
 for (var i = 0; i < portList.length; i++) {
 }
}let bubbles = [];
let img;
function setup() {
  createCanvas(windowWidth, windowHeight);
  img = loadImage("p5.jpg");
  for (var i = 0; i < 1; i++) {
    bubbles[i] = new Bubble(random(width), random(height));
  }
  stroke(136, 119, 236);
}
function mousePressed() {
  bubbles.push(new Bubble(mouseX, mouseY));
}
function keyPressed() {
  bubbles.splice(0, 1);
}
function draw() {
  image(img, 0, 0, width, height);
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].display();
    bubbles[i].shadows();
    bubbles[i].color();
    bubbles[i].update();
  }
  
  
}let bubbles = [];
function setup() {
  createCanvas(200, 200);
  for (var i = 0; i < bubbles.length; i++) {
    let x = random(width);
    let y = random(height);
    bubbles.push(new Bubble(x, y));
  }
}
function mousePressed() {
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].clicked();
  }
}
function draw() {
  background(0);
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].show();
  }
}
class Bubble {
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.col = color(255, 100);
  }
  show() {
    stroke(255);
    fill(this.col);
    ellipse(this.x, this.y, 30, 30);
  }
  move() {
    this.x = this.x + random(-1, 1);
    this.y = this.y + random(-1, 1);
  }
  
  clicked() {
    var d = distance(mouseX, mouseY, this.x, this.y);
    if (d < 10) {
      this.col = color(0, random(255), random(100, 255));
    }
  }
}var bubbles = [];
function setup() { 
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < 1; i++) { 
    bubbles[i] = new Bubble(random(width), random(height)); 
  } 
  stroke(141, 115, 243);
}
function mousePressed() {
  bubbles.push(new Bubble(mouseX, mouseY)); 
}
function keyPressed() {
  bubbles.splice(0,1);    
}
function draw() {
  background(255);
  for (var i = 0;i < bubbles.length; i++) {
    bubbles[i].update();
    bubbles[i].display();
    bubbles[i].show();
      
  
    for (var j = 0; j < bubbles.length; j++) {
      if (i != j && bubbles[i].intersects(bubbles[j])) {
        bubbles[i].changeColor();
        bubbles[j].changeColor();
      } 
    }
  }
}   
var bubbles = [];
function setup() { 
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < 1; i++) { 
    bubbles[i] = new Bubble(random(width), random(height)); 
  } 
  stroke(141, 115, 243);
}
function mousePressed() {
  bubbles.push(new Bubble(mouseX, mouseY)); 
}
function keyPressed() {
  bubbles.splice(0,1);    
}
function draw() {
  background(255);
  for (var i = 0;i < bubbles.length; i++) {
    bubbles[i].update();
    bubbles[i].display();
    bubbles[i].show();
      
  
    for (var j = 0; j < bubbles.length; j++) {
      if (i != j && bubbles[i].intersects(bubbles[j])) {
        bubbles[i].changeColor();
        bubbles[j].changeColor();
      } 
    }
  }
}   
var bubbles = [];
function setup() { 
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < 1; i++) { 
    bubbles[i] = new Bubble(random(width), random(height)); 
  } 
  stroke(141, 115, 243);
}
function mousePressed() {
  bubbles.push(new Bubble(mouseX, mouseY)); 
}
function keyPressed() {
  bubbles.splice(0,1);    
}
function draw() {
  background(255);
  for (var i = 0;i < bubbles.length; i++) {
    bubbles[i].update();
    bubbles[i].display();
    bubbles[i].show();
      
  
    for (var j = 0; j < bubbles.length; j++) {
      if (i != j && bubbles[i].intersects(bubbles[j])) {
        bubbles[i].changeColor();
        bubbles[j].changeColor();
      } 
    }
  }
}   
var bubbles = [];
function setup() { 
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < 1; i++) { 
    bubbles[i] = new Bubble(random(width), random(height)); 
  } 
  stroke(141, 115, 243);
}
function mousePressed() {
  bubbles.push(new Bubble(mouseX, mouseY)); 
}
function keyPressed() {
  bubbles.splice(0,1);    
}
function draw() {
  background(255);
  for (var i = 0;i < bubbles.length; i++) {
    bubbles[i].update();
    bubbles[i].display();
    bubbles[i].show();
      
  
    for (var j = 0; j < bubbles.length; j++) {
      if (i != j && bubbles[i].intersects(bubbles[j])) {
        bubbles[i].changeColor();
        bubbles[j].changeColor();
      } 
    }
  }
}   
var bubbles = [];
function setup() { 
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < 1; i++) { 
    bubbles[i] = new Bubble(random(width), random(height)); 
  } 
  stroke(141, 115, 243);
}
function mousePressed() {
  bubbles.push(new Bubble(mouseX, mouseY)); 
}
function keyPressed() {
  bubbles.splice(0,1);    
}
function draw() {
  background(255);
  for (var i = 0;i < bubbles.length; i++) {
    bubbles[i].update();
    bubbles[i].display();
    bubbles[i].show();
      
  
    for (var j = 0; j < bubbles.length; j++) {
      if (i != j && bubbles[i].intersects(bubbles[j])) {
        bubbles[i].changeColor();
        bubbles[j].changeColor();
      } 
    }
  }
}   
let particles = [];
function setup() { 
  createCanvas(400, 400);
  particle = new particle(100, 100); 
} 
function mousePressed(){
  particles.push(new particle(mouseX, mouseY, i,i\\\\))
}
function draw() { 
  background(220);
  for (let i = 0; i < particles.length; i++){
    
     particles[i].update();
     particle[i].show();
  }
}let gravity = 0.1;
let bouncer;
function setup() {
  createCanvas(400, 400);
  bouncer = new Ball();
  console.log(bouncer);
}
function draw() {
  background(220);
  bouncer.move();
  bouncer.show();
}
let gravity = 0.1;
let bouncer;
function setup() { 
  createCanvas(400, 400);
  bouncer = new Ball();
  console.log(bouncer);
} 
function draw(){
  background(220);
  bouncer.move();
  bouncer.show();
}
let x = 0;
let y = 0;
let size = 20;
function setup() { 
  createCanvas(500, 500);
	background(0);
} 
function draw() { 
	stroke (255);
	if ( random (1) < 0.5) {
		line( x, y, x + size, y + size)}
	else
		line(x, y + size, x + size, y);
  x = x + size;
	if (x > width) {
		x = 0;
	  y = y + size}
}var horizontalWalls = [];
var verticalWalls = [];
function setup() {
   frameRate(40)
   createCanvas(701, 351);
   pos_a = {
     x: 0,
     y: 0
   };
   pos_b = {
     x: 17,
     y: 7
   };
   up_pressed = false;
   down_pressed = false;
   left_pressed = false;
   right_pressed = false;
   w_pressed = false;
   s_pressed = false;
   a_pressed = false;
   d_pressed = false;
   finshed = false;
   direction_a = {
     x: 0,
     y: 0
   };
   direction_b = {
     x: 0,
     y: 0
   };
   
   for (x = 0; x < 18; x+=2) {
     horizontalWalls[x] = [];
     verticalWalls[x] = [];
     for (y = 0; y < 8; y+=2) {
       horizontalWalls[x][y] = str(int(random(0, 2)));
       verticalWalls[x][y] = str(int(random(0, 2)));
     }
   }
     horizontal_walls = [
       "111111111111111111",
       "111111111111111110",
       "011111111111111111",
       "000000000000000000",
       "000000000000000000",
       "000000000000000000",
       "000000000000000000",
       "000000000000000000",
       "111111111111111111",
     ];
     vertical_walls = [
       "1000000000000000001",
       "1000000000000000001",
       "1000000000000000001",
       "1000000000100000001",
       "1000000000000000001",
       "1000000000000000001",
       "1000000000000000001",
       "1000000000000000001",
       "1000000000000000001",
     ];
 }
 function draw_map() {
   background(0);
   noStroke();
   var gridSize = 35;
   for (var x = 0; x < 18; x+=2) {
     for (var y = 0; y < 8; y+=2) {
       noStroke();
       fill(255);
       rect((x + 1) * gridSize - 1, (y + 1) * gridSize - 1, 2, 2);
       if (x < 18 && horizontalWalls[x][y] == '1') {
         noStroke();
         rect((x + 1) * gridSize - 1, (y + 1) * gridSize - 1, gridSize, 2);
       }
       if (y < 8 && verticalWalls[x][y] == '1') {
         noStroke();
         rect((x + 1) * gridSize - 1, (y + 1) * gridSize - 1, 2, gridSize);
       }
     }
   }
 }
 function draw_player(pos, direction, face_color) {
   var face_x_offset = 2.5 * direction.x;
   var face_y_offset = 2.5 * direction.y;
   fill(face_color);
   var face_base_x = pos.x * 35 + 37.5;
   var face_base_y = pos.y * 35 + 37.5;
   rect(face_base_x, face_base_y, 30, 30);
   fill(0, 0, 0);
   rect(face_base_x + 05 + face_x_offset, face_base_y + 10 + face_y_offset, 05, 05);
   rect(face_base_x + 20 + face_x_offset, face_base_y + 10 + face_y_offset, 05, 05);
   rect(face_base_x + 10 + face_x_offset, face_base_y + 20 + face_y_offset, 10, 05);
 }
 function draw_players() {
   draw_player(pos_a, direction_a, color(128));
   draw_player(pos_b, direction_b, color(255));
 }
 
   
   
 
 function draw() {
   draw_map(220);
   if (!finshed) {
     control_players();
     draw_players();
   }
 }
 function move_player(pos, direction, x_offset, y_offset) {
   if (x_offset == 0) {
     direction.x = 0;
   } else {
     direction.x = x_offset > 0 ? 1 : -1;
   }
   if (y_offset == 0) {
     direction.y = 0;
   } else {
     direction.y = y_offset > 0 ? 1 : -1;
   }
   if (x_offset != 0 && vertical_walls[pos.y].charAt(pos.x + (direction.x > 0 ? 1 : 0)) == "0") {
     pos.x += x_offset;
   }
   if (y_offset != 0 && horizontal_walls[pos.y + (direction.y > 0 ? 1 : 0)].charAt(pos.x) == "0") {
     pos.y += y_offset;
   }
 }
 function control_player_a() {
   if (keyIsDown(UP_ARROW) || up_pressed) {
     move_player(pos_a, direction_a, 0, -1);
     up_pressed = false;
   } else if (keyIsDown(DOWN_ARROW) || down_pressed) {
     move_player(pos_a, direction_a, 0, 1);
     down_pressed = false;
   } else if (keyIsDown(LEFT_ARROW) || left_pressed) {
     move_player(pos_a, direction_a, -1, 0);
     left_pressed = false;
   } else if (keyIsDown(RIGHT_ARROW) || right_pressed) {
     move_player(pos_a, direction_a, 1, 0);
     right_pressed = false;
   }
 }
 function control_player_b() {
   if (keyIsDown('W'.charCodeAt(0)) || w_pressed) {
     move_player(pos_b, direction_b, 0, -1);
     w_pressed = false;
   } else if (keyIsDown('S'.charCodeAt(0)) || s_pressed) {
     move_player(pos_b, direction_b, 0, 1);
     s_pressed = false;
   } else if (keyIsDown('A'.charCodeAt(0)) || a_pressed) {
     move_player(pos_b, direction_b, -1, 0);
     a_pressed = false;
   } else if (keyIsDown('D'.charCodeAt(0)) || d_pressed) {
     move_player(pos_b, direction_b, 1, 0);
     d_pressed = false;
   }
 }
 function control_players() {
   if (frameCount % 5 != 0)
     return;
   control_player_a();
   control_player_b();
   if (pos_a.x == pos_b.x && pos_a.y == pos_b.y) {
     finshed = true;
   }
 }
 function keyPressed() {
   console.log(keyCode);
   switch (keyCode) {
     case UP_ARROW:
       up_pressed = true;
       break;
     case DOWN_ARROW:
       down_pressed = true;
       break;
     case LEFT_ARROW:
       left_pressed = true;
       break;
     case RIGHT_ARROW:
       right_pressed = true;
       break;
     case 'W'.charCodeAt(0):
       w_pressed = true;
       break;
     case 'S'.charCodeAt(0):
       s_pressed = true;
       break;
     case 'A'.charCodeAt(0):
       a_pressed = true;
       break;
     case 'D'.charCodeAt(0):
       d_pressed = true;
       break;
   };
 };let horizontal_walls = [];
let vertical_walls = [];
function setup() {
  frameRate(40)
  createCanvas(701, 351);
  pos_a = {
    x: 0,
    y: 0
  };
  pos_b = {
    x: 17,
    y: 7
  };
  up_pressed = false;
  down_pressed = false;
  left_pressed = false;
  right_pressed = false;
  w_pressed = false;
  s_pressed = false;
  a_pressed = false;
  d_pressed = false;
  finshed = false;
  direction_a = {
    x: 0,
    y: 0
  };
  direction_b = {
    x: 0,
    y: 0
  };
  makeWalls();
}
function draw_map() {
  background(0);
  noStroke();
  var gridSize = 35;
  for (var x = 0; x <= 18; x++) {
    for (var y = 0; y <= 8; y++) {
      noStroke();
      fill(255);
      rect((x + 1) * gridSize - 1, (y + 1) * gridSize - 1, 2, 2);
      if (x < 18 && horizontal_walls[y].charAt(x) == '1') {
        noStroke();
        rect((x + 1) * gridSize - 1, (y + 1) * gridSize - 1, gridSize, 2);
      }
      if (y < 8 && vertical_walls[y].charAt(x) == '1') {
        noStroke();
        rect((x + 1) * gridSize - 1, (y + 1) * gridSize - 1, 2, gridSize);
      }
    }
  }
}
function draw_player(pos, direction, face_color) {
  var face_x_offset = 2.5 * direction.x;
  var face_y_offset = 2.5 * direction.y;
  fill(face_color);
  var face_base_x = pos.x * 35 + 37.5;
  var face_base_y = pos.y * 35 + 37.5;
  rect(face_base_x, face_base_y, 30, 30);
  fill(0, 0, 0);
  rect(face_base_x + 05 + face_x_offset, face_base_y + 10 + face_y_offset, 05, 05);
  rect(face_base_x + 20 + face_x_offset, face_base_y + 10 + face_y_offset, 05, 05);
  rect(face_base_x + 10 + face_x_offset, face_base_y + 20 + face_y_offset, 10, 05);
}
function draw_players() {
  draw_player(pos_a, direction_a, color(128));
  draw_player(pos_b, direction_b, color(255));
}
function draw() {
  draw_map(220);
  if (!finshed) {
    control_players();
    draw_players();
  }
}
function move_player(pos, direction, x_offset, y_offset) {
  if (x_offset == 0) {
    direction.x = 0;
  } else {
    direction.x = x_offset > 0 ? 1 : -1;
  }
  if (y_offset == 0) {
    direction.y = 0;
  } else {
    direction.y = y_offset > 0 ? 1 : -1;
  }
  if (x_offset != 0 && vertical_walls[pos.y].charAt(pos.x + (direction.x > 0 ? 1 : 0)) == "0") {
    pos.x += x_offset;
  }
  if (y_offset != 0 && horizontal_walls[pos.y + (direction.y > 0 ? 1 : 0)].charAt(pos.x) == "0") {
    pos.y += y_offset;
  }
}
function control_player_a() {
  if (keyIsDown(UP_ARROW) || up_pressed) {
    move_player(pos_a, direction_a, 0, -1);
    up_pressed = false;
  } else if (keyIsDown(DOWN_ARROW) || down_pressed) {
    move_player(pos_a, direction_a, 0, 1);
    down_pressed = false;
  } else if (keyIsDown(LEFT_ARROW) || left_pressed) {
    move_player(pos_a, direction_a, -1, 0);
    left_pressed = false;
  } else if (keyIsDown(RIGHT_ARROW) || right_pressed) {
    move_player(pos_a, direction_a, 1, 0);
    right_pressed = false;
  }
}
function control_player_b() {
  if (keyIsDown('W'.charCodeAt(0)) || w_pressed) {
    move_player(pos_b, direction_b, 0, -1);
    w_pressed = false;
  } else if (keyIsDown('S'.charCodeAt(0)) || s_pressed) {
    move_player(pos_b, direction_b, 0, 1);
    s_pressed = false;
  } else if (keyIsDown('A'.charCodeAt(0)) || a_pressed) {
    move_player(pos_b, direction_b, -1, 0);
    a_pressed = false;
  } else if (keyIsDown('D'.charCodeAt(0)) || d_pressed) {
    move_player(pos_b, direction_b, 1, 0);
    d_pressed = false;
  }
}
function control_players() {
  if (frameCount % 5 != 0)
    return;
  control_player_a();
  control_player_b();
  if (pos_a.x == pos_b.x && pos_a.y == pos_b.y) {
    finshed = true;
  }
}
function keyPressed() {
  console.log(keyCode);
  switch (keyCode) {
    case UP_ARROW:
      up_pressed = true;
      break;
    case DOWN_ARROW:
      down_pressed = true;
      break;
    case LEFT_ARROW:
      left_pressed = true;
      break;
    case RIGHT_ARROW:
      right_pressed = true;
      break;
    case 'W'.charCodeAt(0):
      w_pressed = true;
      break;
    case 'S'.charCodeAt(0):
      s_pressed = true;
      break;
    case 'A'.charCodeAt(0):
      a_pressed = true;
      break;
    case 'D'.charCodeAt(0):
      d_pressed = true;
      break;
  };
};
function makeWalls() {
  horizontal_walls.push("111111111111111111");
  for (var x = 0; x <= 6; x++) {
    wall = makeWallX();
    horizontal_walls.push(wall);
  }
  horizontal_walls.push("111111111111111111");
  for (var y = 0; y <= 8; y++) {
    wall = makeWallY();
    vertical_walls.push(wall);
  }
  function makeWallX() {
    var text = "";
    var possible = "00001";
    for (var i = 0; i < 18; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }
  function makeWallY() {
    var text = "1";
    var possible = "00001";
    for (var i = 0; i < 17; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    text += "1";
    return text;
  }
}function setup() {
	frameRate(40)
  createCanvas(701, 351);
  pos_a = {x: 0, y: 0};
  pos_b = {x: 17, y: 7};
	up_pressed = false;
	down_pressed = false;
	left_pressed = false;
	right_pressed = false;
  w_pressed = false;
  s_pressed = false;
  a_pressed = false;
  d_pressed = false;
  finshed = false;
	direction_a = {x: 0, y: 0};
	direction_b = {x: 0, y: 0};
  
  horizontal_walls = [
		"111111111111111111",
		"000000000000000000",
		"000000000000000000",
		"000111111111000000",
		"000000000000000000",
		"001110000000000000",
		"000011000000000000",
		"000000000000000000",
		"111111111111111111",
	];
  vertical_walls = [
		"1000000000000000001",
		"1000111110000000001",
		"1000000000000000001",
		"1000000000001110001",
		"1000000000000000001",
		"1000000000000000001",
		"1000011111111111001",
		"1000000000000000001",
		"1000000000000000001",
	];
}
function draw_map() {
	
  background(0); 
  noStroke();
	
  var gridSize = 35;
  for (var x = 0; x <= 18; x++) {
    for (var y = 0; y <= 8; y++) {
      noStroke();
      fill(255);
      rect((x + 1) * gridSize - 1, (y + 1) * gridSize -1, 2, 2);
      if (x < 18 && horizontal_walls[y].charAt(x) == '1') {
        noStroke();
        rect((x + 1) * gridSize - 1, (y + 1) * gridSize -1, gridSize, 2);
      }
      if (y < 8 && vertical_walls[y].charAt(x) == '1') {
        noStroke();
        rect((x + 1) * gridSize - 1, (y + 1) * gridSize -1, 2, gridSize);
      }
    }
  }
}
function draw_player(pos, direction, face_color) {
  var face_x_offset = 2.5 * direction.x;
	var face_y_offset = 2.5 * direction.y;
  fill(face_color);
	var face_base_x = pos.x * 35 + 37.5;
	var face_base_y = pos.y * 35 + 37.5;
  rect(face_base_x, face_base_y, 30, 30);
  fill(0, 0, 0);
  rect(face_base_x + 05 + face_x_offset, face_base_y + 10 + face_y_offset, 05, 05);
  rect(face_base_x + 20 + face_x_offset, face_base_y + 10 + face_y_offset, 05, 05);
  rect(face_base_x + 10 + face_x_offset, face_base_y + 20 + face_y_offset, 10, 05);
}
function draw_players() {
	draw_player(pos_a, direction_a, color(128));
	draw_player(pos_b, direction_b, color(255));
}
function draw() { 
  draw_map(220);
  if (!finshed) {
	  control_players();
	  draw_players();
  }
}
function move_player(pos, direction, x_offset, y_offset) {
	if (x_offset == 0) {
		direction.x = 0;
	} else {
		direction.x = x_offset > 0 ? 1 : -1;
	}
	if (y_offset == 0) {
		direction.y = 0;
	} else {
		direction.y = y_offset > 0 ? 1 : -1;
	}
  if (x_offset != 0 && vertical_walls[pos.y].charAt(pos.x + (direction.x > 0 ? 1 : 0)) == "0") {
	  pos.x += x_offset;
  }
  if (y_offset != 0 && horizontal_walls[pos.y + (direction.y > 0 ? 1 : 0)].charAt(pos.x) == "0") {
	  pos.y += y_offset;
  }
}
function control_player_a() {
  if (keyIsDown(UP_ARROW) || up_pressed) {
		move_player(pos_a, direction_a, 0, -1);
		up_pressed = false;
	} else if (keyIsDown(DOWN_ARROW) || down_pressed) {
		move_player(pos_a, direction_a, 0, 1);
		down_pressed = false;
	} else if (keyIsDown(LEFT_ARROW) || left_pressed) {
		move_player(pos_a, direction_a, -1, 0);
		left_pressed = false;
	} else if (keyIsDown(RIGHT_ARROW) || right_pressed) {
		move_player(pos_a, direction_a, 1, 0);
		right_pressed = false;
	} 
}
function control_player_b() {
  if (keyIsDown('W'.charCodeAt(0)) || w_pressed) {
		move_player(pos_b, direction_b, 0, -1);
		w_pressed = false;
	} else if (keyIsDown('S'.charCodeAt(0)) || s_pressed) {
		move_player(pos_b, direction_b, 0, 1);
		s_pressed = false;
	} else if (keyIsDown('A'.charCodeAt(0)) || a_pressed) {
		move_player(pos_b, direction_b, -1, 0);
		a_pressed = false;
	} else if (keyIsDown('D'.charCodeAt(0)) || d_pressed) {
		move_player(pos_b, direction_b, 1, 0);
		d_pressed = false;
	} 
}
function control_players() {
	if (frameCount % 5 != 0)
		return;
  control_player_a();
  control_player_b();
  if (pos_a.x == pos_b.x && pos_a.y == pos_b.y) {
    finshed = true;
  }
}
function keyPressed() { 
	switch(keyCode){
      case UP_ARROW:
		    up_pressed = true;
        break;
      case DOWN_ARROW:
				down_pressed = true;
        break;
      case LEFT_ARROW:
				left_pressed = true;
      	break;
      case RIGHT_ARROW:
				right_pressed = true;
        break;
      case 'W'.charCodeAt(0):
				w_pressed = true;
        break;
      case 'S'.charCodeAt(0):
				s_pressed = true;
        break;
      case 'A'.charCodeAt(0):
				a_pressed = true;
        break;
      case 'D'.charCodeAt(0):
				d_pressed = true;
        break;
  };
};
function setup() {
	frameRate(60)
  createCanvas(701, 351);
  pos_a_x = 0;
  pos_a_y = 0;    
  up_pressed = false;
	down_pressed = false;
	left_pressed = false;
	right_pressed = false;
	direction_a_x = 0;
	direction_a_y = 0;
  
  pos_b_x = 17;
  pos_b_y = 7;
  w_pressed = false;
  s_pressed = false;
  a_pressed = false;
	d_pressed = false;
	direction_b_x = 0;
	direction_b_y = 0;
}
function draw_map() {
	
  background(0); 
  noStroke();
	
	var map = [
		"+",
		"+",
		"+",
		"",
		"",
		"",
		"",
		"",
	];
  var gridSize = 35;
  for (var x = gridSize; x <= width - gridSize; x += gridSize) {
    for (var y = gridSize; y <= height - gridSize; y += gridSize) {
      noStroke();
      fill(255);
      rect(x-1, y-1, 3, 3);
    }
  }
}
function draw_player_a() {
  var face_x_offset = 2.5 * direction_a_x;
	var face_y_offset = 2.5 * direction_a_y;
  fill(255, 255, 255);
	var face_base_x = pos_a_x * 35 + 37;
	var face_base_y = pos_a_y * 35 + 37;
  rect(face_base_x, face_base_y, 30, 30);
  fill(0, 0, 0);
  rect(face_base_x + 05 + face_x_offset, face_base_y + 10 + face_y_offset, 05, 05);
  rect(face_base_x + 20 + face_x_offset, face_base_y + 10 + face_y_offset, 05, 05);
  rect(face_base_x + 10 + face_x_offset, face_base_y + 20 + face_y_offset, 10, 05);
}
function draw_player_b() {
  var face_offset = 2.5 * direction_b_x;
  var face_base_y = 2.5 * direction_b_y;
  fill(25, 255, 255);
  var face_base_x = pos_b_x * 35 + 37;
	var face_base_y = pos_b_y * 35 + 37;
  ellipse(face_base_x, face_base_y, 30, 30);
  fill(0, 0, 0);
  rect(face_base_x + 05 + face_x_offset, face_base_y + 10 + face_y_offset, 05, 05);
  rect(face_base_x + 20 + face_x_offset, face_base_y + 10 + face_y_offset, 05, 05);
  rect(face_base_x + 10 + face_x_offset, face_base_y + 20 + face_y_offset, 10, 05);
}
  
function draw_players() {
	draw_player_a();
  draw_player_b();
}
function draw() { 
  draw_map(220);
	draw_players();
	control_players();
}
function move_player_a(x_offset, y_offset) {
	if (x_offset == 0) {
		direction_a_x = 0;
	} else {
		direction_a_x = x_offset > 0 ? 1 : -1;
	}
	if (y_offset == 0) {
		direction_a_y = 0;
	} else {
		direction_a_y = y_offset > 0 ? 1 : -1;
	}
	pos_a_x += x_offset;
	pos_a_x = Math.min(pos_a_x, 17);
	pos_a_x = Math.max(pos_a_x, 0);
	pos_a_y += y_offset;
	pos_a_y = Math.min(pos_a_y, 7);
	pos_a_y = Math.max(pos_a_y, 0);
}
function move_player_b(x_offset, y_offset) {
	if (x_offset == 0) {
		direction_b_x = 0;
	} else {
		direction_b_x = x_offset > 0 ? 1 : -1;
	}
	if (y_offset == 0) {
		direction_b_y = 0;
	} else {
		direction_b_y = y_offset > 0 ? 1 : -1;
	}
	pos_b_x += x_offset;
	pos_b_x = Math.min(pos_a_x, 17);
	pos_b_x = Math.max(pos_a_x, 0);
	pos_b_y += y_offset;
	pos_b_y = Math.min(pos_a_y, 7);
	pos_b_y = Math.max(pos_a_y, 0);
}
function control_player_a() {
  if (keyIsDown(UP_ARROW) || up_pressed) {
		move_player_a(0, -1);
		up_pressed = false;
	} else if (keyIsDown(DOWN_ARROW) || down_pressed) {
		move_player_a(0, 1);
		down_pressed = false;
	} else if (keyIsDown(LEFT_ARROW) || left_pressed) {
		move_player_a(-1, 0);
		left_pressed = false;
	} else if (keyIsDown(RIGHT_ARROW) || right_pressed) {
		move_player_a(1, 0);
		right_pressed = false;
	} 
}
function control_players() {
	if (frameCount % 5 != 0)
		return;
  control_player_a();
}
function keyPressed() { 
	switch(keyCode){
      case UP_ARROW:
		    up_pressed = true;
        break;
        
      case DOWN_ARROW:
				down_pressed = true;
        break;
        
      case LEFT_ARROW:
				left_pressed = true;
      	break;
        
      case RIGHT_ARROW:
				right_pressed = true;
        break;
			
  };
};function setup() {
	frameRate(60)
  createCanvas(701, 351);
  、、
  pos_a_x = 0;
  pos_a_y = 0;    
  up_pressed = false;
	down_pressed = false;
	left_pressed = false;
	right_pressed = false;
	direction_a_x = 0;
	direction_a_y = 0;
}
function draw_map() {
	
  background(0); 
  noStroke();
	
	var map = [
		"+",
		"+",
		"+",
		"",
		"",
		"",
		"",
		"",
	];
  var gridSize = 35;
  for (var x = gridSize; x <= width - gridSize; x += gridSize) {
    for (var y = gridSize; y <= height - gridSize; y += gridSize) {
      noStroke();
      fill(255);
      rect(x-1, y-1, 3, 3);
    }
  }
}
function draw_player_a() {
  var face_x_offset = 2.5 * direction_a_x;
	var face_y_offset = 2.5 * direction_a_y;
  fill(255, 255, 255);
	var face_base_x = pos_a_x * 35 + 37;
	var face_base_y = pos_a_y * 35 + 37;
  rect(face_base_x, face_base_y, 30, 30);
  fill(0, 0, 0);
  rect(face_base_x + 05 + face_x_offset, face_base_y + 10 + face_y_offset, 05, 05);
  rect(face_base_x + 20 + face_x_offset, face_base_y + 10 + face_y_offset, 05, 05);
  rect(face_base_x + 10 + face_x_offset, face_base_y + 20 + face_y_offset, 10, 05);
}
function draw_players() {
	draw_player_a();
}
function draw() { 
  draw_map(220);
	draw_players();
	control_players();
}
function move_player_a(x_offset, y_offset) {
	if (x_offset == 0) {
		direction_a_x = 0;
	} else {
		direction_a_x = x_offset > 0 ? 1 : -1;
	}
	if (y_offset == 0) {
		direction_a_y = 0;
	} else {
		direction_a_y = y_offset > 0 ? 1 : -1;
	}
	pos_a_x += x_offset;
	pos_a_x = Math.min(pos_a_x, 17);
	pos_a_x = Math.max(pos_a_x, 0);
	pos_a_y += y_offset;
	pos_a_y = Math.min(pos_a_y, 7);
	pos_a_y = Math.max(pos_a_y, 0);
}
function control_player_a() {
  if (keyIsDown(UP_ARROW) || up_pressed) {
		move_player_a(0, -1);
		up_pressed = false;
	} else if (keyIsDown(DOWN_ARROW) || down_pressed) {
		move_player_a(0, 1);
		down_pressed = false;
	} else if (keyIsDown(LEFT_ARROW) || left_pressed) {
		move_player_a(-1, 0);
		left_pressed = false;
	} else if (keyIsDown(RIGHT_ARROW) || right_pressed) {
		move_player_a(1, 0);
		right_pressed = false;
	} 
}
function control_players() {
	if (frameCount % 5 != 0)
		return;
  control_player_a();
}
function keyPressed() { 
	switch(keyCode){
      case UP_ARROW:
		    up_pressed = true;
        break;
        
      case DOWN_ARROW:
				down_pressed = true;
        break;
        
      case LEFT_ARROW:
				left_pressed = true;
      	break;
        
      case RIGHT_ARROW:
				right_pressed = true;
        break;
			
  };
var value = "0";
var a = 10;
function setup() {
  createCanvas(500, 500);
}
function draw() {
  background(255);
  fill(212);
  textSize(20);
  text("var{stroke(123,123,321){stroke(123,123,321)fill(255,255,255)set;}{stroke(123,123,321(123,123,321)fill(255,255,255)set;{stroke(123,123,321)}var{stroke(123,123,321){stroke(123,123,321)fill(255,255,255)set;}{stroke(123,123,321)ITPIsAwesomeWeLoveCodingtrainar{stroke(123,123,321){stroke(123,123,321)fill(255,255,255)set;{stroke(123,123,3}", 0 + a, 0, 500, 120);
  text("text{stroke()Codingsohardfill()setvar=1{(200,123,48,);}ar{stroke(123,123,321)fill(255,255}ar{stroke(123,123,321)fill(255,255,255)set;};noStroke();fill(247,221,212)ITPIsAwesomeWeLoveCodingtrainar{stroke(123,123,321)23,321(123,123,321)fill(255,255,255)set;{st123,321)ITPIsAwesomeWeLoveCodingtrainar{stroke(123,", 5 + a, 25, 150, 120);
  text("(123,123,321)fill(255,255,255)set;}ITPIsAwesomeWeLoveCodingtrainarc(250,245,270,420,ke(123,123,321)fill(255,255}ar{stroke(123,123,321)fill(255,255,255)set;}TPIsAwesomeWeLoveCodingtrainar{stroke(123,123,321)23,321(123,123,321)fill(255,255,255)set;{st123,321)ITPIsAwesomeWeLoveCodingtrainar{stroke(123,l(255,255}ar{stroke(123,123,321)fill(255,255,255)200", 0 + a, 50, 150, 120);
  text("noStroke();fill(247,221,212);ellipse(250,200,190,200);21,212);noStroke();fill(247,221,212);ellipse(250,200,190,200);ellipse(250,200,190,200)23,321(123,123,321)fill(255,255,255)set;23,321(123,123,321)fill(255,255,255)set;123,321)ITPIsAwesomeWeLoveCodingtrainar{stroke5,255,255)set;};noStroke();fil(123,{st{stl(255,255}ar{stroke(123,123,321)fill(255,255,255)200", 0 + a, 75, 150, 120);
  text("triangle(250,220,260,250,240,250)}{)setvar=1{(200,123,48,);noStroke();fill(247,221,212);ellipse(250,200,190,200);}23,321(123,123,321)fill(255,255,255)set;{st23,321(123,123,321)fill(255,255,255)123,321)ITPIsAwesomeWeLoveCodingtrainar{stroke(123,123,321)ITPIsAwesomeWeLoveCodingtrainar{stroke(123,set;{star{sl(255,255}ar{stroke(123,123,321)fill(255,255,255)200", 0 + a, 100, 150, 120);
  text("fill(255,255,255)set;var{stroke(12fill(255,255,255)set;}ITPIsAwesome)5,255,255)set;};noStroke();filsetvar=15,255,255)set;};noStroke();fil{(200,123,48,;noStroke();(123,123,321)fillnoStroke();23,321)fill(255,255,255)set;23,321(123,123,321)fill(255,255,255)set;123,321)fill(247,221,212))l(255,255}ar{stroke(123,123,321)fill(255,255,255)200", 0 + a, 125, 150, 120);
  text("noStroke();fill(247,221,212);ellipse(250,200,190,200);noStroke();5,255,255)set;};noStroke();filfill(247,221,212);23,321)fill(255,255,255)set;23,321(123,123,321)fill(255,255,255)set;123,321)ellipse(250,200,190,200);5,255,255)set;};noStroke();filect(165,315,170,132,18);l(255,255}ar{stroke(123,123,321)fill(255,255,255)200l(255,255}ar{stroke(123,123,321)fill(255,255,255)200", 0 + a, 150, 150, 120);
  text("text{stroke()Codingsohardfill()setvar=1{(200,123,48,);}ar{stroke(123,123,321)fill(255,255,255)set;}ect(165,315,170,132,18);ect(165,315,170,132,18);ect(165,315,170,132,18);vertex(490,320);vertex(490,320);vertex(490,320);vertex(490,320);vertex(490,320);vertex(490,320);vertex(490,320);vertex(490,320);vertex(490,320)l(255,255}ar{stroke(123,123,321)fill(255,255,255)200;", 5 + a, 175, 150, 120);
  text("text{stroke()Codingsohardfill()setvar=1{(200,123,48,);}ar{stroke(123,123,321)fill(255,255}ar{stroke(123,123);fill(247,221,212)vertex(490,320);vertex(490,320);vertex(490,320);vertex(490,320);vertex(490,320);vertex(490,320);vertex(490,320);vertex(490,320);vertex(490,320);vertex(490,320)l(255,255}ar{stroke(123,123,321)fill(255,255,255)200;", 5 + a, 200, 150, 120);
  text("(123,123,321)fill(255,255,255)set;}vertex(490,320);ITPIsAwesomeWeLoveCodingtrainarc(250,245,270,420,ke(123,123,321)fill(255,255}ar{stroke(123,123,321)fill(255,255,255)200,123,48,;noStroke();(123,123,321)fillnoStroke()200,123,48,;noStroke();(123,123,321)fillnoStroke()set;}l(255,255}ar{stroke(123,123,321)fill(255,255,255)200l(255,255}ar{stroke(123,123,321)fill(255,255,255)200", 0 + a, 225, 150, 120);
  text("noStroke();fill(247,221,212);ellipse(250,200,190,200);21,212);noStroke();fill(247,221,212)vertex(490,320);;ellipse(250,200,190,200)vertex(490,320);vertex(490,320);vertex(490,320);vertex(490,320);vertex(490,320);)set;123,321)ellipse(250,200,190,200);5,255,255)set;};noStroke();ellipse(250,200,190,200)l(255,255}ar{stroke(123,123,321)fill(255,255,255)200", 0 + a, 250, 150, 120);
  text("triangle(250, 220, 260, 250, 240, 250)}{)setvar=1{(200,123,48,);noStroke();fill(247,221,212);23,321)fill(255,255,255)set;23,321(123,123,321)fill(255,255,255)set;123,321)ellipse(250,200,190,200);}ar)set;123,321)ellipse(250,200,190,200);5,255,255)set;};noStroke(){sl(255,255}ar{stroke(123,123,321)fill(255,255,255)200l(255,255}ar{stroke(123,123,321)fill(255,255,255)200", 0 + a, 275, 150, 120);
  text("fill(255,255,255)set;var{stroke(12fill(255,255,255)set;}ITPIsAwesome)setvar=1{(200,123,48,;noStroke();(123,123,321)fill(255,255,255)set;};noStroke()fill(247,221,212);noStroke();fill(247,221,212))l(255,255}ar{stroke(123,123,321)fill(255,255,255)200l(255,255}ar{stroke(123,123,321)fill(255,255,255)200l(255,255}ar{stroke(123,123,321)fill(255,255,255)200l(255,255}ar{stroke(123,123,321)fill(255,255,255)200", 0 + a, 300, 150, 120);
  text("noStroke();fill(247,221,212);ellipse(250,200,190,200);vertex(490,320);noStroke();fill(247,221,212);ellipse(250,200,190,200);noStroke();fill(247,221,212);ellipse(250,200,190,200);l(255,255}ar{stroke(123,123,321)fill(255,255,255)200l(255,255}ar{stroke(123,123,321)fill(255,255,255)200l(255,255}ar{stroke(123,123,321)fill(255,255,255)200", 0 + a, 325, 150, 120);
  text("text{stroke()Codingsohardfill()setvar=1{(200,123,48,);vertex(490,320);}ar{stroke(123,123,321)fill(255,255,255)set;}l(255,255}ar{stroke(123,123,321)fill(255,255,255)200l(255,255}ar{stroke(123,123,321)fill(255,255,255)200l(255,255}ar{stroke(123,123,321)fill(255,255,255)200l(255,255}ar{stroke(123,123,321)fill(255,255,255)200", 5 + a, 375, 150, 120);
  a = a + 4
  if (a > 0) {
    a = -1000
  }
  if (value == "0") {
    noStroke()
    fill(64, 51, 38);
    arc(250, 245, 270, 420, QUARTER_PI + HALF_PI, QUARTER_PI);
    fill(247, 221, 212);
    ellipse(163, 215, 50, 50);
    noStroke();
    fill(247, 221, 212);
    ellipse(250, 200, 190, 200);
    noStroke();
    fill(255, 184, 194);
    ellipse(200, 230, 30, 20);
    ellipse(300, 230, 30, 20);
    noStroke();
    fill(64, 51, 38);
    arc(250, 130, 160, 80, Math.PI, 0);
    arc(300, 100, 270, 125, 0.25 * Math.PI, Math.PI);
    stroke(64, 51, 38);
    strokeWeight(6);
    line(190, 173, 220, 170);
    line(278, 170, 308, 173);
    stroke(128, 128, 128);
    strokeWeight(1);
    fill(255);
    ellipse(209, 200, 35, 35);
    ellipse(291, 200, 35, 35);
    stroke(128, 128, 128);
    fill(102, 102, 51);
    ellipse(209, 200, 18, 18);
    ellipse(291, 200, 18, 18);
    noStroke();
    fill(247, 221, 155);
    triangle(250, 220, 260, 250, 240, 250);
    noStroke();
    fill(255, 169, 168);
    ellipse(250, 270, 12, 12);
    noStroke();
    fill(247, 221, 212);
    rect(165, 315, 170, 132, 18);
    noStroke();
    fill(102, 21, 173);
    rect(190, 310, 120, 140, 8);
    noStroke();
    fill(247, 221, 212);
    arc(250, 310, 40, 40, 0, PI);
    rect(230, 280, 40, 30);
  } else if (value == "1") {
    noStroke()
    fill(64, 51, 38);
    arc(250, 245, 270, 420, QUARTER_PI + HALF_PI, QUARTER_PI);
    fill(247, 221, 212);
    ellipse(163, 215, 50, 50);
    noStroke();
    fill(247, 221, 212);
    ellipse(250, 200, 190, 200);
    frameRate(15);
    noStroke();
    fill(255, random(164, 171), random(196, 212));
    ellipse(random(197, 203), random(228, 232), 30, 20);
    ellipse(random(297, 303), random(228, 232), 30, 20);
    noStroke();
    fill(64, 51, 38);
    arc(250, 130, 160, 80, Math.PI, 0);
    arc(300, 100, 270, 125, 0.25 * Math.PI, Math.PI);
    frameRate(10);
    stroke(64, 51, 38);
    strokeWeight(random(5, 7));
    line(190, random(171, 175), 220, random(168, 171));
    line(278, random(168, 172), 308, random(171, 175));
    stroke(128, 128, 128);
    strokeWeight(1);
    fill(255);
    ellipse(209, 200, 35, 35);
    ellipse(291, 200, 35, 35);
    frameRate(10);
    stroke(128, 128, 128);
    fill(102, 102, 51);
    ellipse(random(201, 217), random(194, 206), 18, 18);
    ellipse(random(281, 300), random(194, 206), 18, 18);
    noStroke();
    fill(247, 221, 155);
    triangle(250, 220, 260, 250, 240, 250);
    frameRate(10);
    noStroke();
    fill(255, 169, 168);
    ellipse(250, 270, random(10, 20), 12);
    noStroke();
    fill(247, 221, 212);
    rect(165, 315, 170, 132, 18);
    noStroke();
    fill(102, 21, 173);
    rect(190, 310, 120, 140, 8);
    noStroke();
    fill(247, 221, 212);
    arc(250, 310, 40, 40, 0, PI);
    rect(230, 280, 40, 30);
  }
  drawITP()
}
function mousePressed() {
  if (value == "0") {
    value = "1";
  } else {
    value = "0";
  }
  noLoop()
}
function mouseReleased() {
  loop()
}
function drawITP() {
  textSize(32)
  fill(random(255), random(255), random(255));
  text("!TP", 225, 350, 150, 120);
  textSize(36)
}var a=10;
var b=10;
var c=10;
var Eye;
function setup() { 
  createCanvas(600, 400);
  
} 
function draw() { 
  background(159,205,201);
  a = a +5;
  b = b -5;
  c = c -3;
  
  if (a > 600) 
	{
    a = -320;
  }
	
	if(b < -320)
	{
    b = +520;
	}
	
	if(c < -320)
	{
		c = 400;
	}
    
  fill(205,246,243,150);
  ellipse(555,260+c,38,38);
  ellipse(250,340+c,35,35);
  ellipse(50,210+c,55,55);
  ellipse(290,170+c,23,23);
  ellipse(260,25+c,8,7);
  ellipse(255,200+c,12,10);
  ellipse(40,345+c,21,18);
  ellipse(65,485+c,12,14);
  ellipse(105,285+c,9,9);
  ellipse(435,287+c,12,11);
  ellipse(370,355+c,7,8);
  ellipse(350,380+c,9,8);
  ellipse(350,430+c,13,14);
  ellipse(36,580+c,7,9);
   ellipse(500,580+c,10,9);
  ellipse(350,600+c,13,14);
 ellipse(400,545+c,21,18);
   ellipse(200,680+c,10,9);
   ellipse(500,500+c,30,30);
    ellipse(300,550+c,10,9);
  
  stroke(0);
  strokeWeight(15)
  line(335,115,300,65);
  line(380,80,360,25);
  line(440,80,435,13);
  line(495,80,505,20);
  line(550,115,575,50);
  noStroke();
  fill(244,211,222);
  ellipse(450,150, 250,160);
  fill(255);
  ellipse(435,155,225,140);
  fill(0);
  
   Eye = new movingEye(450,160);
 
  
  noStroke();
  fill(228,161,185);
  ellipse(130+a,300,120,120);
  fill(244,211,222);
  ellipse(150+a,280,105,105);
  fill(255);
  ellipse(165+a,255,62,50);
  fill(0);
  ellipse(175+a,245,35,30);
  fill(228,161,185);
  ellipse(71+a,310,50,50);  
  fill(228,161,185);
  ellipse(90+a,347,50,50);  
  fill(228,161,185);
  ellipse(135+a,356,50,50); 
  
  fill(0);
  ellipse(128+b,45,28,28);
  fill(255);
  ellipse(140+b,60,48,48);
  fill(228,161,185);
  ellipse(190+b,95,95,95);
  fill(244,211,222);
  ellipse(170+b,80,85,85);
  fill(228,161,185);
  ellipse(195+b,140,40,40);
  ellipse(227+b,130,40,40);
  ellipse(237+b,100,40,40);
  fill(255);
  ellipse(195+b,85,50,50);
  fill(0);
  ellipse(208+b,80,30,30);
  }  
function mousePressed() {
  noLoop();
}
function mouseReleased() {
	loop();
}
function movingEye(nX,nY)
{
  var directionX = (mouseX - 400)/5;
  var directionY = (mouseY - 300)/10;
  
  nX = directionX + nX;
  nY = directionY + nY;
  
  ellipse(nX, nY, 85, 85);
}
  
  
  
  
var a=10;
var b=10;
var c=10;
var Eye;
function setup() { 
  createCanvas(600, 400);
  
} 
function draw() { 
  background(159,205,201);
  a = a +5;
  b = b -5;
  c = c -3;
  
  if (a > 600) 
	{
    a = -320;
  }
	
	if(b < -320)
	{
    b = +520;
	}
	
	if(c < -320)
	{
		c = 400;
	}
    
  fill(205,246,243,150);
  ellipse(555,260+c,38,38);
  ellipse(250,340+c,35,35);
  ellipse(50,210+c,55,55);
  ellipse(290,170+c,23,23);
  ellipse(260,25+c,8,7);
  ellipse(255,200+c,12,10);
  ellipse(40,345+c,21,18);
  ellipse(65,485+c,12,14);
  ellipse(105,285+c,9,9);
  ellipse(435,287+c,12,11);
  ellipse(370,355+c,7,8);
  ellipse(350,380+c,9,8);
  ellipse(350,430+c,13,14);
  ellipse(36,580+c,7,9);
   ellipse(500,580+c,10,9);
  ellipse(350,600+c,13,14);
 ellipse(400,545+c,21,18);
   ellipse(200,680+c,10,9);
   ellipse(500,500+c,30,30);
    ellipse(300,550+c,10,9);
  
  stroke(0);
  strokeWeight(15)
  line(335,115,300,65);
  line(380,80,360,25);
  line(440,80,435,13);
  line(495,80,505,20);
  line(550,115,575,50);
  noStroke();
  fill(244,211,222);
  ellipse(450,150, 250,160);
  fill(255);
  ellipse(435,155,225,140);
  fill(0);
  
   Eye = new movingEye(450,160);
 
  
  noStroke();
  fill(228,161,185);
  ellipse(130+a,300,120,120);
  fill(244,211,222);
  ellipse(150+a,280,105,105);
  fill(255);
  ellipse(165+a,255,62,50);
  fill(0);
  ellipse(175+a,245,35,30);
  fill(228,161,185);
  ellipse(71+a,310,50,50);  
  fill(228,161,185);
  ellipse(90+a,347,50,50);  
  fill(228,161,185);
  ellipse(135+a,356,50,50); 
  
  fill(0);
  ellipse(128+b,45,28,28);
  fill(255);
  ellipse(140+b,60,48,48);
  fill(228,161,185);
  ellipse(190+b,95,95,95);
  fill(244,211,222);
  ellipse(170+b,80,85,85);
  fill(228,161,185);
  ellipse(195+b,140,40,40);
  ellipse(227+b,130,40,40);
  ellipse(237+b,100,40,40);
  fill(255);
  ellipse(195+b,85,50,50);
  fill(0);
  ellipse(208+b,80,30,30);
  }  
function mousePressed() {
  noLoop();
}
function mouseReleased() {
	loop();
}
function movingEye(nX,nY)
{
  var directionX = (mouseX - 400)/5;
  var directionY = (mouseY - 300)/10;
  
  nX = directionX + nX;
  nY = directionY + nY;
  
  ellipse(nX, nY, 85, 85);
}
  
  
  
  
var value = "0";
function setup() { 
  createCanvas(500, 500); 
  
} 
function draw() {
  background(255);
  if (value == "0") {
  
    noStroke()
    fill(64,51,38);
    arc(250,245,270,420, QUARTER_PI+HALF_PI,QUARTER_PI);
  
    fill(247,221,212);
    ellipse(163,215,50,50);
  
    noStroke();
    fill(247,221,212);
    ellipse(250,200,190,200);
  
    noStroke();
    fill(255, 184, 194);
    ellipse(200,230,30,20);
    ellipse(300,230,30,20);
  
    noStroke();
    fill(64,51,38);
    arc(250,130,160,80, Math.PI, 0);
    arc(300,100,270,125, 0.25*Math.PI, Math.PI);
  
    stroke(64,51,38);
    strokeWeight(6);
    line(190,173,220,170);
    line(278,170,308,173);
  
    stroke(128, 128, 128);
    strokeWeight(1);
    fill(255);
    ellipse(209, 200, 35, 35);
    ellipse(291, 200, 35, 35);
 
    stroke(128, 128, 128);
    fill(102,102,51);
    ellipse(209, 200, 18, 18);
    ellipse(291, 200, 18, 18);
  
    noStroke();
    fill(247,221,155);
    triangle(250, 220, 260, 250, 240, 250);
    noStroke();
    fill(255, 169, 168);
    ellipse(250,270,12,12);
  
    noStroke();
    fill(247,221,212);
    rect(165,315,170,132,18);  
 
    noStroke();
    fill(102,21,173);
    rect(190,310,120,140,8);  
  
    noStroke();
    fill(247,221,212);
    arc(250,310,40,40,0,PI);
    rect(230,280,40,30);
    fill(255, 255, 255); 
    text("!TP",225,350,150,120); 
    textSize(36) 
    
} else if (value == "1") {
  
  
    noStroke()
    fill(64,51,38);
    arc(250,245,270,420, QUARTER_PI+HALF_PI,QUARTER_PI);
  
    fill(247,221,212);
    ellipse(163,215,50,50);
  
    noStroke();
    fill(247,221,212);
    ellipse(250,200,190,200);
  
    frameRate(5);
    noStroke();
    fill(255,random(164,171),random(196,202));
    ellipse(random(197,203),random(228,232),30,20);
    ellipse(random(297,303),random(228,232),30,20);
  
    noStroke();
    fill(64,51,38);
    arc(250,130,160,80, Math.PI, 0);
    arc(300,105,280,125, 0.25*Math.PI, Math.PI); 
  
    frameRate(10);
    stroke(64,51,38);
    strokeWeight(random(5,7));
    line(190,random(171,175),220,random(168,171));
    line(278,random(168,172),308,random(171,175));
  
    stroke(128, 128, 128);
    strokeWeight(1);
    fill(255);
    ellipse(209, 200, 35, 35);
    ellipse(291, 200, 35, 35);
 
    frameRate(10);
    stroke(128, 128, 128);
    fill(102,102,51);
    ellipse(random(201,217), random(194,206), 18, 18);
    ellipse(random(281,300), random(194,206), 18, 18);
  
    noStroke();
    fill(247,221,155);
    triangle(250, 220, 260, 250, 240, 250);
    
  
    frameRate(10);
    noStroke();
    fill(255, 169, 168);
    ellipse(250,270,random(10,20),12);
  
    noStroke();
    fill(247,221,212);
    rect(165,315,170,132,18);
 
    noStroke();
    fill(102,21,173);
    rect(190,310,120,140,8);
  
    noStroke();
    fill(247,221,212);
    arc(250,310,40,40,0,PI);
    rect(230,280,40,30);
    fill(random(255), random(255), random(255)); 
    text("!TP",225,350,150,120); 
    textSize(36) 
  }
}  
function mousePressed() {
  if (value == "0") {
    value = "1";
  } else {
    value ="0";
  }
  
function draw（） 
}
var Action= "static
function setup() { 
  createCanvas(500, 500);
} 
function draw() {
  background(255);
  
  
    noStroke()
    fill(64,51,38);
    arc(250,245,270,420, QUARTER_PI+HALF_PI,QUARTER_PI);
  
    fill(247,221,212);
    ellipse(163,215,50,50);
  
    noStroke();
    fill(247,221,212);
    ellipse(250,200,190,200);
  
    noStroke();
    fill(255, 184, 194);
    ellipse(200,230,30,20);
    ellipse(300,230,30,20);
  
    noStroke();
    fill(64,51,38);
    arc(250,130,160,80, Math.PI, 0);
    arc(300,105,280,125, 0.25*Math.PI, Math.PI);
  
  
    fill(64,51,38);
    quad(190,170,220,170,225,175,180,180);
    quad(275,170,307,172,315,180,270,175);
  
  
    stroke(128, 128, 128);
    fill(255);
    ellipse(209, 200, 35, 35);
    ellipse(291, 200, 35, 35);
 
    stroke(128, 128, 128);
    fill(102,102,51);
    ellipse(209, 200, 18, 18);
    ellipse(291, 200, 18, 18);
  
    noStroke();
    fill(247,221,155);
    triangle(250, 220, 260, 250, 240, 250);
    noStroke();
    fill(255, 169, 168);
    ellipse(250,270,12,12);
  
    noStroke();
    fill(247,221,212);
    rect(165,315,170,132,18);
  
 
    noStroke();
    fill(102,21,173);
    rect(190,310,120,140,8);
  
  
    noStroke();
    fill(247,221,212);
    arc(250,310,40,40,0,PI);
    rect(230,280,40,30);
    fill(255, 255, 255); 
    text("!TP",225,350,150,120); 
    textSize(36) 
    
    
}