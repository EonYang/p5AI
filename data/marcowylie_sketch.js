let kinectron;
function setup() {
  createCanvas(400, 400);
	
	kinectron = new Kinectron("YOUR IP ADDRESS")
	
	kinectron.makeConnection();
	
	kinectron.startTrackedBodies(drawBody);
	
}
function draw() {
  background(220);
}
function drawBody(body) {
	console.log(body);
	debugger
}let imgA, imgB;
function setup() { 
  createCanvas(400, 400);
	imgA = select('#cat');
	imgA.position(20,20);
	imgA.size(100,100);
	
	imgB = document.getElementById('dog');
	
	
} 
function draw() { 
  background(220);
	
}let playbutton, stopbutton, nextbutton, backbutton;
let slider;
let songAFileNames = ['SpiritInTheSky', 'RunThroughTheJungle', 'HesSoFine',
	'UnderPressure', 'YouNeedLove', 'AmericanGirl', 'SweetLittleSixteen',
	'MaryJanesLastDance', 'BrownSugar', 'LadyMadonna',
	'DontStopTilYouGetEnough', 'TwoPrinces', 'Mmmbop', 'PumpItUp',
	'ObLaDiObLaDa', 'IWontBackDown', 'Taurus', 'TheAirThatIBreathe',
	'PictureBook', 'TomorrowNeverKnows'
];
let songBFileNames = ['BabyDidABadBadThing', 'TheOldManDownTheRoad', 'MySweetLord',
	'IceIceBaby', 'WholeLottaLove', 'LastNight', 'SurfinUSA',
	'DaniCalifornia', 'WalkAndTalkIt', 'WhatIGot',
	'SteppinOut', 'SemiCharmedLife', 'Unpretty', 'GetOnYourBoots',
	'WhyDontYouGetAJob', 'StayWithMe', 'StairwayToHeaven', 'Creep',
	'SaladDays', 'LetForeverBe'
];
let songAs = [];
let songBs = [];
let albumAs = [];
let albumBs = [];
let currentIndex = 0;
let portName = '/dev/cu.usbmodem1411';
let inData;
function preload() {
	for (let i = 0; i < songAFileNames.length; i++) {
		songAs[i] = loadSound("assets/sounds/" + songAFileNames[i] + ".mp3");
		songBs[i] = loadSound("assets/sounds/" + songBFileNames[i] + ".mp3");
		albumAs[i] = loadImage("assets/images/" + songAFileNames[i] + ".jpg");
		albumBs[i] = loadImage("assets/images/" + songBFileNames[i] + ".jpg");
	}
}
function setup() {
	createCanvas(400, 400);
	background(215);
	text("Original", 75, 335);
	text("Ripped", 275, 335);
		console.log("CONNECTED");
	});
	slider = createSlider(0, 255, 0);
	slider.position(125, 325);
	playbutton = createButton('Play');
	playbutton.position(175, 365);
	playbutton.mousePressed(playsound);
	backbutton = createButton('<<');
	backbutton.position(135, 365);
	backbutton.mousePressed(lastsetsound);
	nextbutton = createButton('>>');
	nextbutton.position(225, 365);
	nextbutton.mousePressed(nextsetsound);
}
function gotData() {
	if(result.length>0) {
	
	if (result === 'P') { 
		playsound(); 
	}
	else if (result === 'B') {
		lastsetsound();
	}
	else if (result === 'N') {
		nextsetsound();
	}
		
	else {
		if(frameCount%60 == 0) {
			updateSound(result);
		}
	}
	}
}
function draw() {
}
function updateSound(result) {
	
	let volumeA = map(result, 0, 1023, 0, 1);
	let volumeB = map(result, 0, 1023, 1, 0);
	songAs[currentIndex].setVolume(volumeA);
	songBs[currentIndex].setVolume(volumeB);
	image(albumBs[currentIndex], 55, 20);
	image(albumAs[currentIndex], 55, 20);
}
function playsound() {
	if (!songAs[currentIndex].isPlaying()) {
		songAs[currentIndex].loop();
		songBs[currentIndex].loop();
	}
}
function stopsound() {
	songAs[currentIndex].stop();
	songBs[currentIndex].stop();
}
function nextsetsound() {
	stopsound();
	currentIndex++;
	if (currentIndex > songAs.length - 1) {
		currentIndex = 0;
	}
	playsound();
}
function lastsetsound() {
	stopsound();
	currentIndex--;
	if (currentIndex < 0) {
		currentIndex = songAs.length - 1;
	}
	playsound();
}let playbutton, stopbutton, nextbutton, backbutton;
let slider;
let songAFileNames = ['BabyDidABadBadThing', 'SpiritInTheSky'];
let songBFileNames = ['RunThroughTheJungle', 'TheOldManDownTheRoad'];
let songCFileNames = ['AmericanGirl', 'MySweetLord'];
let songDFileNames = ['LastNight', 'HesSoFine'];
let songAs = [];
let songBs = [];
let songCs = [];
let songDs = [];
let albumAs = [];
let albumBs = [];
let albumCs = [];
let albumDs = [];
let currentIndex = 0;
function preload() {
	for (let i = 0; i < songAFileNames.length; i++) {
		songAs[i] = loadSound("assets/sounds/" + songAFileNames[i] + ".mp3");
		songBs[i] = loadSound("assets/sounds/" + songBFileNames[i] + ".mp3");
		songCs[i] = loadSound("assets/sounds/" + songCFileNames[i] + ".mp3");
		songDs[i] = loadSound("assets/sounds/" + songDFileNames[i] + ".mp3");
		albumAs[i] = loadImage("assets/images/" + songAFileNames[i] + ".jpg");
		albumBs[i] = loadImage("assets/images/" + songBFileNames[i] + ".jpg");
		albumCs[i] = loadImage("assets/images/" + songCFileNames[i] + ".jpg");
		albumDs[i] = loadImage("assets/images/" + songDFileNames[i] + ".jpg");
	}
}
function setup() {
	createCanvas(400, 400);
	background(215);
	slider = createSlider(0, 255, 100);
	slider.position(125, 320);
	playbutton = createButton('Play');
	playbutton.position(140, 350);
	playbutton.mousePressed(playsound);
	stopbutton = createButton('Stop');
	stopbutton.position(200, 350);
	stopbutton.mousePressed(stopsound);
	backbutton = createButton('Last Set');
	backbutton.position(50, 350);
	backbutton.mousePressed(lastsetsound);
	nextbutton = createButton('Next Set');
	nextbutton.position(275, 350);
	nextbutton.mousePressed(nextsetsound);
}
function draw() {
	checkSliderAndUpdateSound();
}
function checkSliderAndUpdateSound() {
	let slidervalue = slider.value();
	let volumeA = map(slidervalue, 0, 255, 0, 1);
	let volumeB = map(slidervalue, 0, 255, 1, 0);
	let volumeC = map(slidervalue, 0, 255, 0, 1);
	let volumeD = map(slidervalue, 0, 255, 1, 0);
	songAs[currentIndex].setVolume(volumeA);
	songBs[currentIndex].setVolume(volumeB);
	songCs[currentIndex].setVolume(volumeC);
	songDs[currentIndex].setVolume(volumeD);
	
	tint(255,255);
	image(albumAs[currentIndex], 50, 15);
	tint(255, slidervalue);
	image(albumBs[currentIndex], 50, 15);
}
function playsound() {
	songAs[currentIndex].loop();
	songBs[currentIndex].loop();
	songCs[currentIndex].loop();
	songDs[currentIndex].loop();
}
function stopsound() {
	songAs[currentIndex].stop();
	songBs[currentIndex].stop();
	songCs[currentIndex].stop();
	songDs[currentIndex].stop();
}
function nextsetsound() {
	stopsound();
	currentIndex++;
	if (currentIndex > songAs.length - 1) {
		currentIndex = 0;
	}
	playsound();
}
function lastsetsound() {
	stopsound();
	currentIndex--;
	if (currentIndex < 0) {
		currentIndex = songAs.length - 1;
	}
	playsound();
}let playbutton, stopbutton, nextbutton, backbutton;
let slider;
let songBFileNames = ['SpiritInTheSky', 'RunThroughTheJungle', 'HesSoFine',
										 'UnderPressure', 'YouNeedLove', 'AmericanGirl', 'SweetLittleSixteen',
										 'MaryJanesLastDance', 'BrownSugar', 'LadyMadonna',
										 'DontStopTilYouGetEnough', 'TwoPrinces', 'Mmmbop', 'PumpItUp',
										 'ObLaDiObLaDa', 'IWontBackDown', 'Taurus', 'TheAirThatIBreathe',
										  'PictureBook','TomorrowNeverKnows', 'LittleMermaid'];
let songAFileNames = ['BabyDidABadBadThing', 'TheOldManDownTheRoad', 'MySweetLord',
										 'IceIceBaby', 'WholeLottaLove', 'LastNight', 'SurfinUSA',
										 'DaniCalifornia', 'WalkAndTalkIt', 'WhatIGot',
										 'SteppinOut', 'SemiCharmedLife', 'Unpretty', 'GetOnYourBoots',
										 'WhyDontYouGetAJob', 'StayWithMe', 'StairwayToHeaven', 'Creep',
										  'SaladDays','LetForeverBe', 'Nude'];
let songAs = [];
let songBs = [];
let albumAs = [];
let albumBs = [];
let currentIndex = 0;
function preload() {
	for (let i = 0; i < songAFileNames.length; i++) {
		songAs[i] = loadSound("assets/sounds/" + songAFileNames[i] + ".mp3");
		songBs[i] = loadSound("assets/sounds/" + songBFileNames[i] + ".mp3");
		albumAs[i] = loadImage("assets/images/" + songAFileNames[i] + ".jpg");
		albumBs[i] = loadImage("assets/images/" + songBFileNames[i] + ".jpg");
	}
}
function setup() {
	createCanvas(400, 400);
	background(215);
	text("Original", 75, 335);
	text("Ripped", 275, 335);
	slider = createSlider(0, 255, 0);
	slider.position(125, 325);
	playbutton = createButton('Play');
	playbutton.position(175, 365);
	playbutton.mousePressed(playsound);
	backbutton = createButton('Last Set');
	backbutton.position(50, 365);
	backbutton.mousePressed(lastsetsound);
	nextbutton = createButton('Next Set');
	nextbutton.position(275, 365);
	nextbutton.mousePressed(nextsetsound);
}
function draw() {
	checkSliderAndUpdateSound();
}
function checkSliderAndUpdateSound() {
	let slidervalue = slider.value();
	let volumeA = map(slidervalue, 0, 255, 0, 1);
	let volumeB = map(slidervalue, 0, 255, 1, 0);
	songAs[currentIndex].setVolume(volumeA);
	songBs[currentIndex].setVolume(volumeB);
	
	tint(255,255);
	image(albumBs[currentIndex], 55, 20);
	tint(255, slidervalue);
	image(albumAs[currentIndex], 55, 20);
}
function playsound() {
	songAs[currentIndex].loop();
	songBs[currentIndex].loop();
}
function stopsound() {
	songAs[currentIndex].stop();
	songBs[currentIndex].stop();
}
function nextsetsound() {
	stopsound();
	currentIndex++;
	if (currentIndex > songAs.length - 1) {
		currentIndex = 0;
	}
	playsound();
}
function lastsetsound() {
	stopsound();
	currentIndex--;
	if (currentIndex < 0) {
		currentIndex = songAs.length - 1;
	}
	playsound();
}let playbutton, stopbutton, nextbutton, backbutton;
let slider;
let songAFileNames = ['BabyDidABadBadThing', 'SpiritInTheSky'];
let songBFileNames = ['RunThroughTheJungle', 'TheOldManDownTheRoad'];
let songAs = [];
let songBs = [];
let albumAs = [];
let albumBs = [];
let currentIndex = 0;
function preload() {
	for (let i = 0; i < songAFileNames.length; i++) {
		songAs[i] = loadSound("assets/sounds/" + songAFileNames[i] + ".mp3");
		songBs[i] = loadSound("assets/sounds/" + songBFileNames[i] + ".mp3");
		albumAs[i] = loadImage("assets/images/" + songAFileNames[i] + ".jpg");
		albumBs[i] = loadImage("assets/images/" + songBFileNames[i] + ".jpg");
	}
}
function setup() {
	createCanvas(400, 400);
	background(215);
	slider = createSlider(0, 255, 100);
	slider.position(125, 320);
	playbutton = createButton('Play');
	playbutton.position(140, 350);
	playbutton.mousePressed(playsound);
	stopbutton = createButton('Stop');
	stopbutton.position(200, 350);
	stopbutton.mousePressed(stopsound);
	backbutton = createButton('Last Set');
	backbutton.position(50, 350);
	backbutton.mousePressed(lastsetsound);
	nextbutton = createButton('Next Set');
	nextbutton.position(275, 350);
	nextbutton.mousePressed(nextsetsound);
}
function draw() {
	checkSliderAndUpdateSound();
}
function checkSliderAndUpdateSound() {
	let slidervalue = slider.value();
	let volumeA = map(slidervalue, 0, 255, 0, 1);
	let volumeB = map(slidervalue, 0, 255, 1, 0);
	songAs[currentIndex].setVolume(volumeA);
	songBs[currentIndex].setVolume(volumeB);
	
	tint(255,255);
	image(albumAs[currentIndex], 50, 15);
	tint(255, slidervalue);
	image(albumBs[currentIndex], 50, 15);
}
function playsound() {
	songAs[currentIndex].loop();
	songBs[currentIndex].loop();
}
function stopsound() {
	songAs[currentIndex].stop();
	songBs[currentIndex].stop();
}
function nextsetsound() {
	stopsound();
	currentIndex++;
	if (currentIndex > songAs.length - 1) {
		currentIndex = 0;
	}
	playsound();
}
function lastsetsound() {
	stopsound();
	currentIndex--;
	if (currentIndex < 0) {
		currentIndex = songAs.length - 1;
	}
	playsound();
}let playbutton, nextbutton, backbutton;
let slider;
let soundGroupPath1 = ['assets/sounds/BabyDidABadBadThing.wav', 'assets/sounds/LaGrange.wav'];
let soundGroup1 = [];
let soundGroupPath2 = ['assets/sounds/RunThroughTheJungle.mp3', 'assets/sounds/TheOldManDownTheRoad.mp3'];
let soundGroup2 = [];
function preload()
{
  for(let i =0; i<soundGroupPath1.length; i ++) {
    soundGroup1[i] = loadSound(soundGroupPath1[i])
  }
	for(let i =0; i<soundGroupPath2.length; i ++) {
    soundGroup2[i] = loadSound(soundGroupPath2[i])
  }
}
function setup()
{
  createCanvas(350, 300);
    background(255);
  slider = createSlider (0, 255, 100);
  slider.position(100,100);
  playbutton = createButton('Play');
  playbutton.position(120, 150);
  playbutton.mousePressed(playsound);
   nextbutton = createButton('Next Set');
   nextbutton.position(140, 180);
   nextbutton.mousePressed(nextsetsound);
	
	stopbutton = createButton('Stop');
  stopbutton.position(180, 150);
  stopbutton.mousePressed(stopsound);
}
function draw()
{
  checkSliderAndUpdateSound();
}
function checkSliderAndUpdateSound(){
  let slidervalue = slider.value();
  let volumeOne = map(slidervalue , 0, 255, 0, 1);
  let volumeTwo = map(slidervalue , 0, 255, 1, 0);
  if(soundGroup1[0].isPlaying() == true && soundGroup1[1].isPlaying() == true){
    soundGroup1[0].setVolume(volumeOne);
    soundGroup1[1].setVolume(volumeTwo);
  }
	if(soundGroup2[0].isPlaying() == true && soundGroup2[1].isPlaying() == true){
    soundGroup2[0].setVolume(volumeOne);
    soundGroup2[1].setVolume(volumeTwo);
  }
}
function playsound()
{
  if(soundGroup1[0].isPlaying() == false)
  {
    for(let i =0; i<soundGroupPath1.length; i ++) {
      soundGroup1[i].loop();
    }
  }
}
function stopsound()
{
  if(soundGroup1[0].isPlaying() == true)
  {
    for(let i =0; i<soundGroupPath1.length; i ++) {
      soundGroup1[i].pause();
    }
  }
}
function nextsetsound()
{
	if(soundGroup1[0].isPlaying() == true)
	{
		for(let i=0; i<soundGroupPath2.length; i ++) {
			soundGroup2[i].loop();
		}
	}
}
let playbutton, nextbutton, backbutton;
let slider;
let soundGroupPath1= ['assets/sounds/BabyDidABadBadThing.wav', 'assets/sounds/LaGrange.wav'];
let soundGroup1 = [];
function preload()
{
  for(let i =0; i<soundGroupPath1.length; i ++) {
    soundGroup1[i] = loadSound(soundGroupPath1[i])
  }
}
function setup()
{
  createCanvas(350, 300);
    background(255);
  slider = createSlider (0, 255, 100);
  slider.position(100,100);
  playbutton = createButton('Play');
  playbutton.position(125, 150);
  playbutton.mousePressed(playsound);
}
function draw()
{
  checkSliderAndUpdateSound();
}
function checkSliderAndUpdateSound(){
  let slidervalue = slider.value();
  let volumeOne = map(slidervalue , 0, 255, 0, 0.5);
  let volumeTwo = map(slidervalue , 0, 255, 1, 0);
  if(soundGroup1[0].isPlaying() == true && soundGroup1[1].isPlaying() == true){
    soundGroup1[0].setVolume(volumeOne);
    soundGroup1[1].setVolume(volumeTwo);
  }
}
function playsound()
{
  if(soundGroup1[0].isPlaying() == false)
  {
    for(let i =0; i<soundGroupPath1.length; i ++) {
      soundGroup1[i].loop();
    }
  }
}
function stopsound()
{
  if(soundGroup1[0].isPlaying() == true)
  {
    for(let i =0; i<soundGroupPath1.length; i ++) {
      soundGroup1[i].pause();
    }
  }
}
let pumpkin;
let scream;
let kick;
let snare;
let hihat;
let extraScale = 0;
function preload() {
  pumpkin = loadImage("pumpkin.jpg");
  scream = loadSound("scream.mp3");
  kick = loadSound("kick.mp3");
  snare = loadSound("snare.mp3");
  hihat = loadSound("hihat.mp3");
}
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(0);
	text("Press a s d f to play", 150, 25);
	fill(255);
  imageMode(CENTER);
  translate(width/2, height/2);
  scale(1 + extraScale);
  image(pumpkin, 0, 0);
  if (extraScale > 0) {
    extraScale -= 0.05;
  }
}
function keyTyped() {
  extraScale = 1;
  if (key == "a") {
    kick.play();
  }
  else if (key == "s") {
    hihat.play();
  }
  else if (key == "d") {
    snare.play();
  }
  else if (key == "f") {
    scream.play();
  }
}
let pumpkin;
let scream;
let kick;
let snare;
let hihat;
let extraScale = 0;
function preload() {
  pumpkin = loadImage("pumpkin.jpg");
  scream = loadSound("scream.mp3");
  kick = loadSound("kick.mp3");
  snare = loadSound("snare.mp3");
  hihat = loadSound("hihat.mp3");
}
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(0);
	noStroke();
	text("
  imageMode(CENTER);
  translate(width/2, height/2);
  scale(1 + extraScale);
  image(pumpkin, 0, 0);
  if (extraScale > 0) {
    extraScale -= 0.05;
  }
}
function keyTyped() {
  extraScale = 1;
  if (key == "a") {
    kick.play();
  }
  else if (key == "s") {
    hihat.play();
  }
  else if (key == "d") {
    snare.play();
  }
  else if (key == "f") {
    scream.play();
  }
}
function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
function setup() { 
  createCanvas(600, 600);
  noFill();
  strokeWeight(10);
  
}
function gotData() {
}
function draw() {
    background(127, 0, 127);
  var mappedVar = map(latestData, 0, 600, 0, width);
  text(latestData, 10, 10);
  
  
  var v = mappedVar; 
  var origV = v;
  ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);
  ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
	
  v+=random(-5, 5);
  bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);
  bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
}
let latestData = "waiting for data";
let v;
function setup() { 
  createCanvas(600, 600);
  noFill();
  strokeWeight(10);
	
}
 
function gotData() {
}
function draw() { 
  background(127, 0, 127);
  
var mappedVar = map(latestData, 300, 400, 0, width);
  var origV = v;
	origV = v;
  ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);
  ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
	
  v+=random(-5, 5);
  bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);
  bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
}
let latestData = "waiting for data";
function setup() { 
  createCanvas(600, 600);
  noFill();
  strokeWeight(10);
	
}
}\ 
function draw() { 
  background(127, 0, 127);
  
  var v = mappedVar; 
  var origV = v;
  ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);
  ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
	
  v+=random(-5, 5);
  bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);
  bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
}
function setup() {
  createCanvas(400, 300);
  background(0x08, 0x16, 0x40);
 
}
 
 for (var i = 0; i < portList.length; i++) {
 }
}
	function graphData(newData) {
  var yPos = map(newData, 0, 255, 0, height);
  stroke(0xA8, 0xD9, 0xA7);
  line(xPos, height, xPos, height - yPos);
  if (xPos >= width) {
    xPos = 0;
    background(0x08, 0x16, 0x40);
  } else {
    xPos++;
  }
}
	
function draw() { 
graphData(inData);
let xPos = 0;
function setup() {
	createCanvas(400,300);
	background(0x
 
}
function draw() {
  background(0);
  fill(255);
  text("sensor value: " + inData, 30, 30);
}
 
function serverConnected() {
}
 
function portOpen() {
}
 
}
 
}
 
function portClose() {
}
 for (var i = 0; i < portList.length; i++) {
 }
}var img;
var tony;
function setup() { 
  canvas = createCanvas(200, 200);
} 
function draw() {
  image(img, 0, 0);
  image(img, 0, height/2, img.width/2, img.height/2);
}let balls = [];
function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 50; i++) {
    balls.push(new Ball(random(width), random(height), random(-5, 5), random(-5, 5)));
  }
}
function draw() {
  background(0);
  for (let b = 0; b < balls.length; b++) {
    balls[b].run();
    for (let c = 0; c < balls.length; c++) {
      if(b == c) continue;
      if (balls[b].isNear(balls[c])) {
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
}var img;
function preload() {
									");
}
function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
	image(img, 0,0);
}let fish;
let dog;
function setup() { 
  createCanvas(600, 400);
	fish = new Bubble(200,150);
	dog = new Bubble(375, 225);
} 
function draw() { 
  background(220);
	fish.update();
	dog.update();
	fish.display();
	dog.display();
	let d = dist(fish.x, fish.y, dog.x, dog.y);
	
	if (d < fish.r + dog.r) {
		fish.changeColor();
		dog.changeColor();
	}
	
}let ball;
		
function setup() {
  createCanvas(500, 400);
  
  ball = new Ball();
}
 
function draw()
{
  background(255);
  
  if(ball.x > 400)
  {
    ball.stop();
  } 
  
  ball.move();
  ball.display();
}
 
function keyPressed()
{
  ball.x = 0;
  ball.speed = 2;
}
 
function Ball()
{
  this.x = 0;
  this.y = 200;
  this.speed = 2;
  this.c = color(153, 102, 51);
 
  this.move = function()
  {
    if(this.x > width)
    {
      this.x = 0;
    }
    this.x = this.x + this.speed;        
  }
 
  this.stop = function()
  {
    if(this.speed > 0)
    {
      this.speed = this.speed - 0.05;
    } else {
      this.speed = 0;
    }        
  }
 
  this.display = function()
  {
    fill(0);
    ellipse(this.x + 20, this.y + 45, 40, 40);
    ellipse(this.x + 80, this.y + 45, 40, 40);
  }
}let balls = [];
function setup() {
  createCanvas(400, 400);
	for (let i =0; i < 5; i++) {
	balls[i] = new Ball(random(width), random(height));
	}
}
function draw() {
  background(220);
  for (let i =0; i < balls.length; i++) {
		balls[i].update();
		balls[i].display()'
	if (ball1.intersects(ball2)) {
		ball1.changeColor();
		ball2.changeColor();
	}
}
function bounce(pos, speed, low, high) {
  if (pos < low || pos > high) {
    speed *= -1;
  }
  return speed;
}let balls = [];
function setup() {
  createCanvas(400, 400);  
    for(let i = 0; i < 50; i++){
balls.push(new Ball(random(width), random(height), 3, 2));
}
}
function draw() {
  background(220);
	  for(let i = 0; i < balls.length; i++)
}
}
function bounce(pos, speed, low, high) {
  if (pos < low || pos > high) {
    speed *= -1;
  }
  return speed;
let positions = [];
function setup() { 
  createCanvas(400, 400);
}
function draw() { 
  background(130);
  
  positions.push({x: mouseX, y: mouseY});
  
  if(positions.length > 50) positions.splice();
  
  for(let i = 0; i < positions.length; i++) {
  let x = positions[i].x;
  let y = positions[i].y;
  ellipse(x, y, i/2, i/2);
}
let positions = [];
function setup() { 
  createCanvas(400, 400);
}
function draw() { 
  background(130);
  
  positions.push({x: mouseX, y: mouseY});
  
  if(positions.length > 50) positions.shift();
  
  for(let i = 0; i < positions.length; i++) {
  let x = positions[i].x;
  let y = positions[i].y;
  ellipse(x, y, i/2, i/2);
}
}let ball1;
let ball2;
function setup() {
  createCanvas(400, 400);
  ball1 = new Ball(width / 2, height / 2, 3, 2);
  ball2 = new Ball(width / 4, height / 4, 4, 3);
}
function draw() {
  background(220);
  
  ball1.run();
  ball2.run();
}
function bounce(pos, speed, low, high) {
  if (pos < low || pos > high) {
    speed *= -1;
  }
  return speed;
}let rw;
let rh;
let numCol = 10;
let numRow = 5;
let x = 0;
let y = 0;
let cw;
function setup() {
  createCanvas(400, 400);
  rw = width / numCol;
  rh = height / numRow;
}
function draw() {
  background(220);
  for (let cn = 0; cn < numCol; cn++) {
    for (let rn = 0; rn < numRow; rn++) {
      rect(x + cw)
    }
  }
}function setup() { 
  createCanvas(400, 400);
  
  for(let c = 0; c < 10; c++) {
   rect(c*width/10, 0, width/10, height); 
  }
} 
	for(let r = 0; r <5; r--) {
rect(r*height/5, 0, height/5, width));
function draw() { 
}let angle = 0
let x = 50
let y = 50
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(0);
	angleMode(DEGREES);
  translate(width/height);
  rotate(angle);
  stroke(130);
  line(0, 0, 50, 50);
  fill(255, 50, 20);
  rect(x, y, 10, 10);
  angle = angle + 2;
}let bubbles = [];
function setup() {
  createCanvas(600, 400);
  for (let i = 0, i < 10; i++) {
    let balls = [];
function setup() {
  createCanvas(500, 400);
  for (let i = 0; i < 4; i++) {
    balls[i] = new Ball();
  }
}
function draw() {
  background(0);
  for (let i = 0; i < balls.length; i++) {
    balls[i].move();
    balls[i].display();
  }
}
function Ball() {
  this.x = random(0, width);
  this.y = random(0, height);
  this.display = function() {
    stroke(255);
    noFill();
    ellipse(this.x, this.y, 25, 25);
  }
  this.move = function() {
    this.x = this.x + random(-1, 1);
    this.y = this.y + random(-1, 1);
  }
}let balls = [];
function setup() {
  createCanvas(500, 400);
  for (let i = 0; i < 4; i++) {
  balls[i] = new Ball();
  }
} 
function draw() {
  background(0);
  for (let i = 0; i < balls.length; i++); {
  balls[i].move();
  balls[i].display();
}
}
function Ball() {
      this.x = random(0,width);
      this.y = random(0m);
      }
    }
  }
}
let balls = [];
function setup() {
  createCanvas(500, 400);
  for (let i = 0; i < 4; i++) {
  balls[i] = new Ball();
  }
} 
function draw() {
  background(0);
  for (let i = 0; i < balls.length; i++); {
  balls[i].move();
  balls[i].display();
}
}
function Ball() {
      this.x = random(0,width);
      this.y = random(0m);
      }
    }
  }
}
let balls = [];
function setup() {
  createCanvas(500, 400);
  for (let i = 0; i < 4; i++) {
  balls[i] = new Ball();
  }
} 
function draw() {
  background(0);
  for (let i = 0; i < balls.length; i++); {
  balls[i].move();
  balls[i].display();
}
}
function Ball() {
      this.x = random(0,width);
      this.y = random(0m);
      }
    }
  }
}
let balls = [];
function setup() {
  createCanvas(500, 400);
  for (let i = 0; i < 4; i++) {
  balls[i] = new Ball();
  }
} 
function draw() {
  background(0);
  for (let i = 0; i < balls.length; i++); {
  balls[i].move();
  balls[i].display();
}
}
function Ball() {
      this.x = random(0,width);
      this.y = random(0m);
      }
    }
  }
}
let balls = [];
function setup() {
  createCanvas(500, 400);
  for (let i = 0; i < 4; i++) {
  balls[i] = new Ball();
  }
} 
function draw() {
  background(0);
  for (let i = 0; i < balls.length; i++); {
  balls[i].move();
  balls[i].display();
}
}
function Ball() {
      this.x = random(0,width);
      this.y = random(0m);
      }
    }
  }
}
let balls = [];
function setup() {
  createCanvas(500, 400);
  for (let i = 0; i < 4; i++) {
  balls[i] = new Ball();
  }
} 
function draw() {
  background(0);
  for (let i = 0; i < balls.length; i++); {
  balls[i].move();
  balls[i].display();
}
}
function Ball() {
      this.x = random(0,width);
      this.y = random(0m);
      }
    }
  }
}
let balls = [];
function setup() {
  createCanvas(500, 400);
  for (let i = 0; i < 4; i++) {
  balls[i] = new Ball();
  }
} 
function draw() {
  background(0);
  for (let i = 0; i < balls.length; i++); {
  balls[i].move();
  balls[i].display();
}
}
function Ball() {
      this.x = random(0,width);
      this.y = random(0m);
      }
    }
  }
}
let balls = [];
function setup() {
  createCanvas(500, 400);
  for (let i = 0; i < 4; i++) {
  balls[i] = new Ball();
  }
} 
function draw() {
  background(0);
  for (let i = 0; i < balls.length; i++); {
  balls[i].move();
  balls[i].display();
}
}
function Ball() {
      this.x = random(0,width);
      this.y = random(0m);
      }
    }
  }
}
let balls = [];
function setup() {
  createCanvas(500, 400);
  for (let i = 0; i < 4; i++) {
  balls[i] = new Ball();
  }
} 
function draw() {
  background(0);
  for (let i = 0; i < balls.length; i++); {
  balls[i].move();
  balls[i].display();
}
}
function Ball() {
      this.x = random(0,width);
      this.y = random(0m);
      }
    }
  }
}
let balls = [];
function setup() {
  createCanvas(500, 400);
  for (let i = 0; i < 4; i++) {
  balls[i] = new Ball();
  }
} 
function draw() {
  background(0);
  for (let i = 0; i < balls.length; i++); {
  balls[i].move();
  balls[i].display();
}
}
function Ball() {
      this.x = random(0,width);
      this.y = random(0m);
      }
    }
  }
}
let balls = [];
function setup() {
  createCanvas(500, 400);
  for (let i = 0; i < 4; i++) {
  balls[i] = new Ball();
  }
} 
function draw() {
  background(0);
  for (let i = 0; i < balls.length; i++); {
  balls[i].move();
  balls[i].display();
}
}
function Ball() {
      this.x = random(0,width);
      this.y = random(0m);
      }
    }
  }
}
let balls = [];
function setup() {
  createCanvas(500, 400);
  for (let i = 0; i < 4; i++) {
  balls[i] = new Ball();
  }
} 
function draw() {
  background(0);
  for (let i = 0; i < balls.length; i++); {
  balls[i].move();
  balls[i].display();
}
}
function Ball() {
      this.x = random(0,width);
      this.y = random(0m);
      }
    }
  }
}
let balls = [];
function setup() {
  createCanvas(500, 400);
  for (let i = 0; i < 4; i++) {
  balls[i] = new Ball();
  }
} 
function draw() {
  background(0);
  for (let i = 0; i < balls.length; i++); {
  balls[i].move();
  balls[i].display();
}
}
function Ball() {
      this.x = random(0,width);
      this.y = random(0m);
      }
    }
  }
}
let balls = [];
function setup() {
  createCanvas(500, 400);
  for (let i = 0; i < 4; i++) {
  balls[i] = new Ball();
  }
} 
function draw() {
  background(0);
  for (let i = 0; i < balls.length; i++); {
  balls[i].move();
  balls[i].display();
}
}
function Ball() {
      this.x = random(0,width);
      this.y = random(0m);
      }
    }
  }
}
let balls = [];
function setup() {
  createCanvas(500, 400);
  for (let i = 0; i < 4; i++) {
  balls[i] = new Ball();
  }
} 
function draw() {
  background(0);
  for (let i = 0; i < balls.length; i++); {
  balls[i].move();
  balls[i].display();
}
}
function Ball() {
      this.x = random(0,width);
      this.y = random(0m);
      }
    }
  }
}
let balls = [];
function setup() {
  createCanvas(500, 400);
  for (let i = 0; i < 4; i++) {
  balls[i] = new Ball();
  }
} 
function draw() {
  background(0);
  for (let i = 0; i < balls.length; i++); {
  balls[i].move();
  balls[i].display();
}
}
function Ball() {
      this.x = random(0,width);
      this.y = random(0m);
      }
    }
  }
}
let balls = [];
function setup() {
  createCanvas(500, 400);
  for (let i = 0; i < 4; i++) {
  balls[i] = new Ball();
  }
} 
function draw() {
  background(0);
  for (let i = 0; i < balls.length; i++); {
  balls[i].move();
  balls[i].display();
}
}
function Ball() {
      this.x = random(0,width);
      this.y = random(0m);
      }
    }
  }
}
let balls = [];
function setup() {
  createCanvas(500, 400);
  for (let i = 0; i < 4; i++) {
  balls[i] = new Ball();
  }
} 
function draw() {
  background(0);
  for (let i = 0; i < balls.length; i++); {
  balls[i].move();
  balls[i].display();
}
}
function Ball() {
      this.x = random(0,width);
      this.y = random(0m);
      }
    }
  }
}
let nums = [100, 25, 46, 72];
let num = 23;	
function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(0);
  
  ellipse (100, 200, num, num);
  
    ellipse (200, 200, nums[2], nums[2]);
}let x = 0;
let y = 0;
function setup() { 
  createCanvas(400, 400);
  background(220);
} 
function draw() { 
}
function mouseMoved() {
  ellipse(mouseX, mouseY, 100,120);
  fill("red");
}
function mousePressed() {
	rect(mouseX,mouseY,20,120);
  
}let canvas = {
  x : 500,
  y : 500,
}
let slider = {
  x :10,
  y : 240,
  height: 20,
  width: 10,
}
let dragged = false;
function setup() { 
  createCanvas(canvas.x,canvas.y);
} 
function draw() { 
  background(225);
  line(10, canvas.y/2, canvas.x-10,canvas.y/2);
  
  if(dragged){
  }
  rect(slider.x, slider.y,slider.width, slider.height);
  strokeWeight(2)
  ellipse (canvas.x/2, canvas.y-40,30,30); 
}
function mouseDragged(){
  if(mouseX>slider.x && mouseX < (slider.x+ slider.width)
    dragged = true;
}
function mouseReleasedfunction setup() {
    createCanvas(400, 400);
    noStroke();
}
function draw() {
		background(220);
		stroke(255);
    
  for(let i = 0; i < 10; i++) {
        if (mouseX >= i * width / 10 && mouseX < (i + 1) * width / 10 && i<5 && i!=6)  {
            fill(255, 0, 0);
        } else if(mouseX >= i * width / 10 && mouseX < (i + 1) * width / 10 && i>=5 && i!= 6){
          fill(0,0,200);
        } else {
            fill(255);
        }
        rect(i * 1 / 10 * width, 0, width / 10, height);
    }
}let x=0;
let y=0;
function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(0);
   
   if(mouseIsPressed){
      background(210,0,random(150));
      for(let x=mouseX; x<= width;x+=40){
        for(let y=mouseY; y<= height; y+=40){
          strokeWeight(2);
        fill(random(200),random(200),0);
        ellipse(x,y,50);
      }
    
      }
  }
    
}let angle = 0.0;
let offset = 200;
let scalar = 2;
let speed = 0.05;
function setup() {
  createCanvas(400, 400);
  fill(0);
  background(204);
}
function draw() {
  let x = offset + cos(angle) * scalar;
  let y = offset + sin(angle) * scalar;
  ellipse(x, y, 2, 2);
  angle += speed;
  scalar += speed;
  if (mouseIsPressed) {
    background(0, 175, 0);
  }
}function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
0\function setup() {
  createCanvas(600, 400);
}
function draw() {
  background(0);
      fill(255, 0, 200);
 if (mouseIsPressed){
 background(0,255,0); 
 }
  stroke(255);
  strokeWeight(4);
  noFill();
  if (mouseX > 250 && mouseX < 350 && mouseY > 250 && mouseY < 350) {
  rectMode(CENTER);
  rect(300, 200, 100, 100);
}
}function setup() { 
  createCanvas(600, 400);
} 
function draw() { 
  background(0);
  
  stroke(255);
  strokeWeight(4);
  noFill();
  
  if(mouseX  > 300) {
    fill(255,0,200);
  }
  ellipse(300,200,100,100);
  
}function setup() { 
  createCanvas(500, 400);
} 
function draw() { 
  background(220);
  noStroke();
  for (let i = 0; i < 10; i++) {
    if (mouseX > width / 10 * i && mouseX < width / 10 * (i + 1)) {
      fill(20*i,0,20*(10-i));
      rect(i*1/10*width, 0, width/10,height);
    } else {
      fill(220);
    }}
}function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
for(let i = 0; i < 10; i++){
  rect(i*1/10*width, 0, width/10,height);
}
  
}let angle = (200,200);
let x = 50;
let y = 50;
function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}
function draw() {
  background(0);
  translate(moveCenter(), height/2);
   rotate(angle);
   stroke(130);
   line(0, 0, 50, 50);
   fill("red");
   rect(x, y, 10, 10);
   
  angle = angle + 2;
function moveCenter(pct) {
  return width * pct/400; 
}
}let x;
let spot = {
  x: 100,
  y: 50
};
let col = {
  r : 255,
  g : 0,
  b : 0,
};
function setup() { 
  createCanvas(500, 500);
  x = width/2
  y = height/2
} 
function draw() { 
  background(0,153,255);
  
  noStroke();
  fill(45);
  rect(mouseX,200,50,150);
  
  stroke(45);
  fill(0,204,0);
  ellipse(x,y,125,125);
  x++;
  
  stroke(45);
  line(273,345,300,450);
  line(200,450,225,345);
  
  fill(50);
  noStroke();
  ellipse(215,215,20,20);
	ellipse(250,220,20,20);
   
  spot.x = random(0, width);
  spot.y = random(0, height);
  col.r = random(100,175);
  col.g = 0;
  col.b = random(100,200);
  fill(col.r, col.g, col.b);
	ellipse(spot.x, spot.y,25,25);
}
let x;
let spot = {
  x: 100,
  y: 50
};
let col = {
  r : 255,
  g : 0,
  b : 0,
};
function setup() { 
  createCanvas(500, 500);
  x = width/2
  y = height/2
} 
function draw() { 
  background(0,153,255);
  
  noStroke();
  fill(45);
  rect(225,200,50,150);
  
  stroke(45);
  fill(0,204,0);
  ellipse(x,y,125,125);
	x++;
  
  
  stroke(45);
  line(273,345,300,450);
  line(200,450,225,345);
  
  fill(50);
  noStroke();
  ellipse(215,215,20,20);
	ellipse(250,220,20,20);
   
  spot.x = random(0, width);
  spot.y = random(0, height);
  col.r = random(100,175);
  col.g = 0;
  col.b = random(100,200);
  fill(col.r, col.g, col.b);
	ellipse(spot.x, spot.y,25,25);
}
let x;
let spot = {
  x: 100,
  y: 50
};
let col = {
  r : 255,
  g : 0,
  b : 0,
};
function setup() { 
  createCanvas(500, 500);
  x = width/2
  y = height/2
} 
function draw() { 
  background(0,153,255);
  
  noStroke();
  fill(45);
  rect(225,200,50,150);
  
  stroke(45);
  fill(0,204,0);
  ellipse(x,y,125,125);
  
  
  stroke(45);
  line(273,345,300,450);
  line(200,450,225,345);
  
  fill(50);
  noStroke();
  ellipse(215,215,20,20);
	ellipse(250,220,20,20);
   
  spot.x = random(0, width);
  spot.y = random(0, height);
  col.r = random(100,175);
  col.g = 0;
  col.b = random(100,200);
  fill(col.r, col.g, col.b);
	ellipse(spot.x, spot.y,25,25);
}
var spot = {
  x: 100,
  y: 50
};
var col = {
  r : 255,
  g : 0,
  b : 0,
};
function setup() { 
  createCanvas(600, 400);
  background(0);
} 
function draw() { 
  col.r = random(100,255);
  col.g = 0;
  col.b = random(100,190);
  spot.x = random(0, width);
  spot.y = random(0, height);
  fill(col.r, col.g, col.b);
	ellipse(spot.x, spot.y,25,25);
}var col = 0;
var r = 0;
var b = 255;
function setup() { 
  createCanvas(600, 400);
} 
function draw() { 
  r = map(mouseX,0,600,0,255);
  b = map(mouseX,0,600,255,0);
  background(r,0,b);
  fill(250,118,222);
  ellipse(mouseX, 200,64,64);
}function setup() { 
  createCanvas(windowWidth, windowHeight);
  var x =width/2
} 
function draw() { 
  let speed=dist(mouseX,mouseY,pmouseX,pmouseY);
  \\console.log(speed);
}function setup() { 
  createCanvas(500, 350);   
  rectMode(CENTER)
} 
function draw() { 
  background(220);
  
  
  var x=width/2;
  var y=height/2;
  var x1=width/2;
  var y1=height/2;
    rect(x,y,x1,y1)
  
         }var circleY = 10;
function setup() { 
  createCanvas(600, 400);
} 
function draw() { 
  background(250,250,100);
  
  fill(250,200,200);
  ellipse(circleY,200,80,80);
  
  circleY = circleY + 5
  
}
function setup() { 
  createCanvas(500, 500);
} 
function draw() { 
  background(0,153,255);
  
  noStroke();
  fill(45);
  rect(225,200,50,150);
  
  stroke(45);
  fill(0,204,0);
  ellipse(250,200,125,125);
  
  stroke(45);
  line(273,345,300,450);
  line(200,450,225,345);
  
  fill(50);
  noStroke();
  ellipse(215,215,20,20);
	ellipse(250,220,20,20);
  
  
}function setup() { 
  createCanvas(600, 400);
} 
function draw() { 
  
  background(64,244,208);
  
  strokeWeight(40);
  stroke(255,0,0);
  line(0,0,600,400);
  
	stroke(0,204,0);
  fill(0,204,0);
  ellipse(300,200,300,200);
  
  stroke(0,0,153)
  rect(440,180,9,9)
}function setup() {
  createCanvas(480, 270);
  ellipseMode(CENTER);
  rectMode(CENTER); 
  
  background(51);
  stroke(255);
  fill(150);
  rect(240, 145, 20, 100);
  fill(255);
  ellipse(240, 115, 60, 60); 
  fill(0); 
  ellipse(221, 115, 16, 32); 
  ellipse(259, 115, 16, 32);
  stroke(255);
  line(230, 195, 220, 205);
  line(250, 195, 260, 205); 
}function setup() { 
  createCanvas(400, 400);
  colorMode (120, 140)
} 
function draw() { 
  background(220);
  rect (100, 50, 100, 50)
  ellipse (200, 200, 30, 60)
}