function setup() {
  createCanvas(600, 400);
  background(200);
  game = new Game();
  game.addPlayer();
	
	
  game.addBackgroundImage("background.jpg");
	game.addBlockImage("block.png");
	game.addPlayerImage("player.png");
}
function draw() {
  game.update();
  game.display();
}
function mousePressed() {
  game.addBlock(mouseX, mouseY, 200, 40);
}
var obstacles;
var collectibles;
var asterisk;
function setup() {
  createCanvas(800, 400);
  asterisk = createSprite(400, 200);
  asterisk.addAnimation('normal', 'assets/asterisk_normal0001.png', 'assets/asterisk_normal0003.png');
  asterisk.addAnimation('stretch', 'assets/asterisk_stretching0001.png', 'assets/asterisk_stretching0008.png');
  obstacles = new Group();
  collectibles = new Group();
  for(var i=0; i<4; i++)
  {
    var box = createSprite(random(0, width), random(0, height));
    box.addAnimation('normal', 'assets/box0001.png', 'assets/box0003.png');
    obstacles.add(box);
  }
  for(var j=0; j<10; j++)
  {
    var dot = createSprite(random(0, width), random(0, height));
    dot.addAnimation('normal', 'assets/small_circle0001.png', 'assets/small_circle0001.png');
    collectibles.add(dot);
  }
}
function draw() {
  background(255, 255, 255);
  asterisk.velocity.x = (mouseX-asterisk.position.x)/10;
  asterisk.velocity.y = (mouseY-asterisk.position.y)/10;
  asterisk.collide(obstacles);
  asterisk.overlap(collectibles, collect);
  if(asterisk.getAnimationLabel() == 'stretch' && asterisk.animation.getFrame() == asterisk.animation.getLastFrame())
  {
    asterisk.changeAnimation('normal');
  }
  drawSprites();
}
function collect(collector, collected)
{
  collector.changeAnimation('stretch');
  collector.animation.rewind();
  collected.remove();
}
March 23, 2018
Helicopter Game!
This is a single player game in which you try to fly a helicopter through a cave!
Environment (the cave):
- the cave has top and bottom walls,
- the walls are always moving to the left (so that it look like the player (helicopter) is moving to the right)
Player (the helicopter):
- you (the player) are controlling the helicopter
Goal (the point of the game):
- keep flying as long as you can
Rules (how you play):
- press the spacebar to fly up,
- gravity will move you down,
- avoid the walls of the cave!
let game;
function setup() {
	createCanvas(600, 400);
	game = new Game();
	game.addPlayer();
	game.addWalls();
	game.showScore();
	game.difficulty = 12;
	game.speed = 2;
}
function draw() {
	game.update();
	game.display();
}
function setup() {
	createCanvas(400, 400);
	strokeWeight(2);
}
function draw() {
	background(220);
	fill(0);
	let interval = 1;
	let dif = 0;
	for (let j = 0; j < height; j += 40) {
		for (let i = 0; i <= width; i += interval) {
			fluid_pos = frameCount * j/100 % width;
			let distFromCenter = abs(fluid_pos - i);
			dif = max(0, 4 - distFromCenter / 3);
			strokeWeight(4 + dif);
			line(i, j, i + interval, j);
		}
	}
}function setup() {
	createCanvas(600, 400, WEBGL);
	normalMaterial();
	camera(0,-100,300,0,0,0,0,1,0);
	debugMode();
}
function draw() {
	background(200,220,250);
	orbitControl();
	for (let i = -3; i <= 3; i++) {
		for (let j = -3; j <= 3; j++) {
			push();
			translate(i * 40, 0, j * 40);
			box(10,20,10);
			pop();
		}
	}
}function setup() {
	createCanvas(600, 400, WEBGL);
	normalMaterial();
	camera(0,-100,300,0,0,0,0,1,0);
}
function draw() {
	background(200,220,250);
	orbitControl();
	for (let i = -3; i <= 3; i++) {
		for (let j = -3; j <= 3; j++) {
			push();
			translate(i * 40, 0, j * 40);
			box(10,20,10);
			pop();
		}
	}
}
function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
}
function draw() {
  background(200);
  orbitControl(0.01, 0.01);
  normalMaterial();
  let scale = 200;
  for (let px = -5; px < 5; px++) {
    for (let pz = -5; pz < 5; pz++) {
      push();
      rotateX(PI);
      translate(px * scale, 0, pz * scale);
      if (px > 0) {
        fill(255, 0, 0);
      }
      cone(20, 50);
      pop();
    }
  }
March 23, 2018
Helicopter Game!
This is a single player game in which you try to fly a helicopter through a cave!
Environment (the cave):
- the cave has top and bottom walls,
- the walls are always moving to the left (so that it look like the player (helicopter) is moving to the right)
Player (the helicopter):
- you (the player) are controlling the helicopter
Goal (the point of the game):
- keep flying as long as you can
Rules (how you play):
- press the spacebar to fly up,
- gravity will move you down,
- avoid the walls of the cave!
function setup() {
}
function draw() {
}
March 23, 2018
Helicopter Game!
This is a single player game in which you try to fly a helicopter through a cave!
Environment (the cave):
- the cave has top and bottom walls,
- the walls are always moving to the left (so that it look like the player (helicopter) is moving to the right)
Player (the helicopter):
- you (the player) are controlling the helicopter
Goal (the point of the game):
- keep flying as long as you can
Rules (how you play):
- press the spacebar to fly up,
- gravity will move you down,
- avoid the walls of the cave!
let game;
function setup() {
	createCanvas(600, 400);
	game = new Game();
	game.addPlayer();
	game.addWalls();
	game.showScore();
	game.difficulty = 12;
	game.speed = 2;
}
function draw() {
	game.update();
	game.display();
}
function setup() {
	let arr = [1, 3, 4, 6];
	let cat = {
		name: "jojo",
		age: 9,
		type: "calico"
	};
	
	let catArr = [];
	
	for (let i = 0; i<10; i++){
		let c = Object.assign({}, cat);
		catArr.push(c);
	}
	
	console.log(catArr);
	
	for (let kitty of catArr){
		for (let prop in kitty){
			console.log(kitty[prop]);
		}
	}
}function setup() {
	createCanvas(400, 400);
	var v = createVector(4, 5, 6);
	v.sub(1, 1, 1);
	var v1 = createVector(2, 3, 4);
	var v2 = createVector(1, 2, 3);
	var v3 = p5.Vector.sub(v1, v2);
	console.log(v3);
}
function draw() {
}let walkers = [];
let img;
function preload(){
	img = loadImage('World_map_green.png');
}
function setup() {
	createCanvas(500,300);
	img.resize(500,300);
	let step = 10;
	for (let y = step; y < img.height; y+= step){
		for (let x = step; x < img.width; x += step){
			if (img.get(x,y)[3] > 0){
				let w = new Walker(x,y);
				walkers.push(w);
			}
		}
	}
}
function draw() {
	background(255,255,255,50);
	for (let i = 0; i<walkers.length; i++){
		walkers[i].render();
	}
}
class Walker {
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.steps = [];
		this.steps.push({x:this.x,y:this.y});
		for (let i=0; i<floor(random(100,800)); i++){
			this.stepForwards();
		}
	}
	render(){
		this.stepBackwards();
		fill(0);
		ellipse(this.x,this.y, 8,8);
	}
	stepBackwards(){
		if (this.steps.length > 0){
			let	{x,y} = this.steps.pop();
			this.x = x;
			this.y = y;
		}
	}
	stepForwards(){
		let r = random(1);
		let stepSize = 5;
		if (r < 0.25){
			this.x += stepSize;
		} else if (r < 0.5){
			this.x -= stepSize;
		} else if (r < 0.75){
			this.y += stepSize;
		} else {
			this.y -= stepSize;
		}
		this.x = constrain(this.x,0,width);
		this.y = constrain(this.y,0,height);
		this.steps.push({x: this.x,y: this.y});
	}
}
function setup() { 
  createCanvas(400, 400);
	let video = createCapture(VIDEO);
	
} 
function draw() { 
  background(220);
	image(video,0,0,
}function setup() { 
  createCanvas(600, 400);
	
  background(220);
} 
function draw() { 
	
	fill(200,100,200,20);
	ellipse (random(width),random(height),50,50);
let walker;
let wlist = [];
function setup() {
	createCanvas(640, 360);
	for (let i = 0; i < 300; i++) {
		let x = floor(random(width));
		let y = floor(random(height));
		wlist.push(new Walker(x, y));
	}
	background(127);
}
function draw() {
	for (let i = 0; i < wlist.length; i++) {
		wlist[i].step();
		wlist[i].render();
	}
}
class Walker {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.destx = floor(random(width));
		this.desty = floor(random(height));
		console.log(this.destx, " , ", this.desty);
	};
	render() {
		stroke(0);
		point(this.x, this.y);
		if (dist(this.x, this.y, this.destx, this.desty) < 10) {
			fill(230,175,210);
			ellipse(this.x,this.y,5,5);
		}
	};
	step() {
		let choice = floor(random(4));
		let r = random(1);
		if (dist(this.x, this.y, this.destx, this.desty) > 10) {
			if (r < 0.25) {
				this.x += 2;
			} else if (r < 0.5) {
				this.x -= 2;
			} else if (r < 0.75) {
				this.y += 2;
			} else {
				this.y -= 2;
			}
		}
		this.x = constrain(this.x, 0, width - 1);
		this.y = constrain(this.y, 0, height - 1);
	};
function setup() { 
  createCanvas(400, 400);
	  background(0,0,0);
} 
function draw() { 
	fill(randomGaussian,200,210,50);
	noStroke();
	let x = randomGaussian(width/2, width/8);
	let y = randomGaussian(height/2, height/8);
	
	ellipse(x,y,15,15);
}class Walker {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	step() {
		let mx = monteCarlo(50);
		let my = monteCarlo(50);
		
		if (mx){ this.x += random(-1,1) * mx};
		if (my){ this.y += random(-1,1) * my};
		function monteCarlo(max) {
			let stepSize = random(max);
			let p = stepSize * stepSize;
			let test = random(max * max);
			if (test > p) {
				return stepSize;
			}
 		}
		
	}
	display() {
		this.step();
		console.log(this.x);
		ellipse(this.x, this.y, 5, 5);
	}
}
let w;
function setup() {
	createCanvas(400, 400);
	background(220);
	w = new Walker(width / 2, height / 2);
}
function draw() {
	w.display();
}
let goalStates = {0,0,0,0,0,0};
let score = {
	red: 0,
	blue: 0
};
let timeLeft = 0;
let gameState = "menu";
function setup() { 
  createCanvas(400, 400);
	setupMenu();
} 
function setupMenu(){
	setup2pGame();
}
function setup2pGame(){
	timeLeft = gameLength;
	gameState = "game";
}w
function draw() { 
	if (gameState == "menu"){
	} else if (gameState == "game"){
	} else if (gameState == "gameover") {
	}
2017.10.22 -- Pcomp Midterm project: April & Aidan
Description: p5.js part of a simple ball-tossing game.
Code Sources:
var query = "q=dance+party";
var apiKey = "&api_key=eLV69yVXgNcn6hj51Qjm6XfwMHnnhDsY";
var lim = "&limit=5";
var url = endpoint + query + apiKey + lim;
let portName = "/dev/cu.usbmodem621";
let score = {
    a: 0,
    b: 0
};
let previousScore = {
    a: 0,
    b: 0
};
let countDown;
let gameOver = false;
let scoreArray;
let song;
let gifURLs = [];
function preload() {
    soundFormats('mp3');
    song = loadSound('skull_fire.mp3');
    scoreSound = loadSound('coin.wav');
    loadJSON(url, getGifURLs);
}
function getGifURLs(gifs) {
    for (let i = 0; i < gifs.data.length; i++) {
        let url = gifs.data[i].images.original.url;
        gifURLs.push(url);
    }
}
function setup() {
    createCanvas(960, 480);
    countDown = 60;
    song.setVolume(0.1);
    song.play();
    scoreSound.setVolume(1);
}
function gotData(data) {
    scoreArray = split(inString, ',');
    if (scoreArray.length > 1) {
        score.a = scoreArray[0];
        score.b = scoreArray[1];
    };
}
function resetScore() {
	gameOver = false;
	countDown = 60;
}
function draw() {
    background(252,255,10);
    if (!gameOver){
        stroke(0);
        line(width / 2, 0, width / 2, height);
        if (frameCount %30 == 0){
            countDown--;
            if (countDown < 0){
                gameOver = true;   
            }
        }
        textSize(120);
        text("GAME OVER",width/2,120);
        textSize(72);
        if (score.a>score.b){
            text("PLAYER A WINS", width/2, 240);
        } else if (score.b>score.a) {
            text("PLAYER B WINS", width/2,240);
        }
				text("space to resume", width/2,320)
    }
}
function keyPressed(){
	if (keyCode==32){
		gameOver = false;
		countDown = 60;
	}
}
function onScore() {
    if (score.a != previousScore.a) {
        imageA.addClass("playerA");
        setTimeout(function(){
            imageA.remove();
        }, 1500);
        previousScore.a = score.a;
        scoreSound.play();
        setTimeout(function(){
            scoreSound.stop();
        }, 1500);
    }
    if (score.b != previousScore.b) {
        imageB.addClass("playerB");
        setTimeout(function(){
            imageB.remove();
        }, 1500);        
        previousScore.b = score.b;
        scoreSound.play();
        setTimeout(function(){
            scoreSound.stop();
        }, 1500);
    }
}
function displayScore() {
    textSize(240);
    textAlign(CENTER);
    text(score.a, width / 4, height / 2);
    text(score.b, width / 4 * 3, height / 2);
    textSize(72);
    text(countDown, width/2, 60);
}
ARDUINO CODE:
  2017.10.22 -- Ball Game: April & Aidan Physical Computing Midterm Project
   Code Sources:
   Threshold and peak detection:
   Color sensor code:
int scoreA = 0;
int scoreB = 0;
int peakValue = 0;
int peakValueB = 0;
int threshold = 120;
int noise = 5;
unsigned int pulseWidth;
unsigned int cValue;
unsigned int pulseWidthB;
unsigned int cValueB;
void setup() {
  sayHello();
  pinMode(S2, OUTPUT);
  pinMode(S3, OUTPUT);
  pinMode(outPin, INPUT);
  pinMode(S2B, OUTPUT);
  pinMode(S3B, OUTPUT);
  pinMode(outPinB, INPUT);
}
void sayHello() {
    delay(250);
  }
}
void loop() {
  digitalWrite(S2, LOW);
  digitalWrite(S3, LOW);
  pulseWidth = (pulseIn(outPin, LOW));
cValue = 255- (pulseWidth/10);
  if (cValue > peakValue) {
    peakValue = cValue;
  }
  if (cValue <= threshold - noise) {
    if (peakValue > threshold) {
      scoreA++;
      peakValue = 0;
    }
  }
  digitalWrite(S2B, LOW);
  digitalWrite(S3B, LOW);
  pulseWidthB = (pulseIn(outPinB, LOW));
cValueB = 255- (pulseWidthB/10);
  if (cValueB > peakValueB) {
    peakValueB = cValueB;
  }
  if (cValueB <= threshold - noise) {
    if (peakValueB > threshold) {
      scoreB++;
      peakValueB = 0;
    }
  }
  if (inByte == 114) {
    scoreA = 0;
    scoreB = 0;
  }
}
}
var cols, rows;
var scl = 20;
var w = 1400;
var h = 1000;
var flying = 0;
var terrain = [];
function setup() {
	createCanvas(600, 600, WEBGL);
	cols = w / scl;
	rows = h / scl;
	for (var x = 0; x < cols; x++) {
		terrain[x] = [];
		for (var y = 0; y < rows; y++) {
		}
	}
}
function draw() {
	flying = 0;
	var yoff = flying;
	
	for (var y = 0; y < rows; y++) {
		var xoff = 0;
		for (var x = 0; x < cols; x++) {
			if (mouseIsPressed && mouseX == x && mouseY == y){
				terrain[x][y] += 10;
			}
			terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
			xoff += 0.2;
		}
		yoff += 0.2;
	}
	background(0);
	translate(0, 50);
	rotateX(-PI / 3);
	fill(200, 200, 200, 50);
	noFill();
	strokeWeight(1);
	translate(-w / 2, -h / 2);
	for (let y = 0; y < rows - 1; y++) {
		beginShape(TRIANGLE_STRIP);
		for (let x = 0; x < cols; x++) {
			vertex(x * scl, y * scl, terrain[x][y]);
			vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
		}
		endShape();
	}
let spacing = 30;
let spinners = []
let changeEm = false;
function setup() {
	createCanvas(500, 500);
	background(0);
	fill(255, 0, 0);
		stroke(255, 0, 0);
	
	for (let y = 0; y <= height; y += spacing) {
		for (let x = 0; x <= width; x += spacing) {
			spinners.push(new Spinner(x, y, spacing-1, 0));
		}
	}
}
function draw() {
	background(0);
	if (frameCount %500 == 0){
		changeEm = !changeEm;
		console.log(changeEm);
	}
	for (let i = 0; i < spinners.length; i++) {
		spinners[i].display();
		spinners[i].update();
		if (random(1) < 0.001 && changeEm) {
			spinners[i].isChanging = true;
			isStill = false;
		}
		let d = dist(spinners[i].x, spinners[i].y, mouseX, mouseY);
		if (d<25){
			spinners[i].isChanging = true;
		}
	}
}
class Spinner {
	constructor(x, y, size) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.ang = 0;
		this.isChanging = false;
		if (random(1) > 0.5) {
			this.ang = 90;
		}
	}
	display() {
		angleMode(DEGREES);
		strokeWeight(2);
		push();
		translate(this.x, this.y);
		rotate(this.ang);
		line(-this.size / 2, -this.size / 2, this.size / 2, this.size / 2);
		pop();
	}
	update() {
		if (this.isChanging) {
			this.ang += 1;
			if (this.ang % (90) == 0) {
				this.isChanging = false;
			}
		}
	}
let spacing = 30;
let spinners = []
function setup() {
	createCanvas(500, 500);
	background(0);
	fill(255, 0, 0);
	for (let y = 0; y <= height; y += spacing) {
		for (let x = 0; x <= width; x += spacing) {
			spinners.push(new Spinner(x, y, spacing, 0));
		}
	}
}
function draw() {
	background(0);
	for (let i = 0; i < spinners.length; i++) {
		spinners[i].display();
		spinners[i].update();
		let d = dist(spinners[i].x, spinners[i].y, mouseX, mouseY);
		if (d<25){
			spinners[i].isChanging = true;
		}
	}
}
class Spinner {
	constructor(x, y, size) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.ang = 0;
		this.isChanging = false;
		if (random(1) > 0.5) {
			this.ang = 90;
		}
	}
	display() {
		angleMode(DEGREES);
		stroke(255, 0, 0);
		strokeWeight(3);
		push();
		translate(this.x, this.y);
		rotate(this.ang);
		line(-this.size / 2, -this.size / 2, this.size / 2, this.size / 2);
		pop();
	}
	update() {
		if (this.isChanging) {
			this.ang += 1;
			if (this.ang % (90) == 0) {
				console.log('here');
				this.isChanging = false;
			}
		}
	}
}function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
let submitButton;
let inp;
let database;
let allKeys;
let config = {
	apiKey: "AIzaSyCNXWvMxraT7PTKKCLk4uzaQD-XNhzqw84",
	authDomain: "windemere-44.firebaseapp.com",
	projectId: "windemere-44",
	storageBucket: "",
	messagingSenderId: "115375595951"
};
function setup() {
	createCanvas(400, 400).parent('game');
	inp = createInput('name').parent('game');
	let inp2 = createInput('hi').parent('game');
	
	submitButton = createButton('submit').parent('game');
	submitButton.mousePressed(sendData);
	firebase.initializeApp(config);
	database = firebase.database();
	objectTest = database.ref('objectTest');
	objectTest.on('value', gotData, gotErr);
}
function gotData(data) {
	if (data) {
		incoming = data.val();
		allKeys = Object.keys(incoming);
		for (let i = 0; i < allKeys.length; i++) {
			let k = allKeys[i];
			
		}
	}
}
function gotErr(err) {
	console.log('Error!');
	console.log(err);
}
function sendData() {
	objectTest.push(data, finished);
}
function finished(error) {
	if (error) {
		console.log('ooops');
	} else {
		console.log('data saved!');
	}
}
let database;
let imageRef;
let config = {
	apiKey: "AIzaSyCNXWvMxraT7PTKKCLk4uzaQD-XNhzqw84",
	authDomain: "windemere-44.firebaseapp.com",
	projectId: "windemere-44",
	storageBucket: "",
	messagingSenderId: "115375595951"
};
let submitButton;
let saveButton;
let img;
let cnv;
function preload(){
	img = loadImage('pic.png', loadThem);
}
function loadThem(){
	img.loadPixels();
	console.log('done');
}
function setup(){
	createCanvas(400, 400);
	image(img,0,0);
	
	submitButton = createButton('submit');
	submitButton.mousePressed(sendData);
	saveButton = createButton('save');
	saveButton.mousePressed(trySaving);
	
	firebase.initializeApp(config);
	database = firebase.database();
	imageRef = database.ref('imageRef');
	imageRef.on('value', gotData, gotErr);
}
function trySaving(){
	p5.prototype.saveCanvas(cnv);
}
function gotData(data) {
	console.log("got data");
			
}
function gotErr(err) {
	console.log('Error!');
	console.log(err);
}
function sendData() {
	imageRef.push(img, finished);
	console.log('sending');
}
function finished(error) {
	if (error) {
		console.log('ooops');
	} else {
		console.log('data saved!');
	}
}
function upScore() {
	score++;
}
function draw() {
}
Take the Money and Run: A Bot's Journey
by Simon & Aidan
ICM Final Project, Fall 2017
In this game, your player avatar will live out a wild and uninhibited life
of world travel, adventure and excitement while you stay at home,
go to work, and live out your decidedly more inhibited life.  Enjoy.
Sources:
let webcam;
let canvas;
let mask;
let snapButton;
let profilePic;
function preload() {
	mask = loadImage("mask.png");
}
function setup() {
	canvas = createCanvas(640, 480);
	webcam = createCapture(VIDEO);
	webcam.size(640, 480);
	webcam.hide();
	snapButton = createButton("snap");
	snapButton.mousePressed(takeSnap);
	
}
function takeSnap() {
	profilePic = webcam.get();
	cutOut();
}
function cutOut(){
	profilePic.loadPixels();
	mask.loadPixels();
	
	for (let x=0;x<width;x++){
		for (let y=0;y<height;y++){
			let pixelRef = (x + y*width)*4;
			let maskAlpha = mask.pixels[pixelRef + 3];
			if (maskAlpha != 0){
				profilePic.pixels[pixelRef + 3] = 0;
			}
		}
	}
	
	profilePic.updatePixels();
	saveImg();
	console.log('done');
	
}
function saveImg(){
	clear();
	image(profilePic, 0, 0);
	save('prof.png');
}
function draw() {
	if (profilePic) {
		image(profilePic, 0, 0);
	} else {
		push();
		translate(width,0);
		scale(-1,1);
		image(webcam, 0, 0);
		pop();
		image(mask, 0, 0,);
	}
}function setup() { 
  createCanvas(300, 300);
} 
function draw() { 
  background(220);
Take the Money and Run: A Bot's Journey
by Simon & Aidan
ICM Final Project, Fall 2017
In this game, your player avatar will live out a wild and uninhibited life
of world travel, adventure and excitement while you stay at home,
go to work, and live out your decidedly more inhibited life.  Enjoy.
Sources:
Seriously.js:
let video;
let canvas;
let seriously;
let chromaEffect;
let mask;
function preload(){
	mask = loadImage("mask.png");
}
function setup() {
	canvas = createCanvas(300, 300);
	canvas.style('z-index', '-1')
	canvas.id('p5canvas');
	video = createCapture(VIDEO);
	video.size(300, 300);
	video.id('p5video');
	
	
	image(mask,0,0,300,300);
}
	
	
	
	
Take the Money and Run: A Bot's Journey
by Simon & Aidan
ICM Final Project, Fall 2017
In this game, your player avatar will live out a wild and uninhibited life
of world travel, adventure and excitement while you stay at home,
go to work, and live out your decidedly more inhibited life.  Enjoy.
Sources:
Seriously.js:
let video;
let canvas;
let seriously;
let chromaEffect;
let cutOut;
function preload(){
	cutOut = loadImage("pic.png");
}
function setup() {
	background(200,100,200);
	canvas = createCanvas(320, 240, WEBGL);
	canvas.id('p5canvas');
	createElement('br', '');
	
	image(cutOut,0,0);
}
	
	
	
	
let submitButton;
let inp;
let pointsButton;
let score = 0;
let database;
let scores;
let allScores;
let allKeys;
let config = {
	apiKey: "AIzaSyCNXWvMxraT7PTKKCLk4uzaQD-XNhzqw84",
	authDomain: "windemere-44.firebaseapp.com",
	projectId: "windemere-44",
	storageBucket: "",
	messagingSenderId: "115375595951"
};
function setup() {
	createCanvas(400, 400).parent('game');
	createElement("br").parent('game');
	pointsButton = createButton('click').parent('game');
	inp = createInput('name').parent('game');
	submitButton = createButton('submit').parent('game');
	pointsButton.mousePressed(upScore);
	submitButton.mousePressed(sendData);
	firebase.initializeApp(config);
	database = firebase.database();
	scores = database.ref('scores');
	scores.on('value', gotData, gotErr);
}
function gotData(data) {
	if (data) {
		let oldData = selectAll(".scorelisting");
		for (let i = 0; i < oldData.length; i++) {
			oldData[i].remove();
		}
		allScores = data.val();
		allKeys = Object.keys(allScores);
		for (let i = 0; i < allKeys.length; i++) {
			let k = allKeys[i];
			let nme = allScores[k].name;
			let scro = allScores[k].score;
			console.log("name: " + nme + " / score: " + scro);
			let listItem = createElement('li', nme + " , " + scro).class('scorelisting').parent('scorelist');
			listItem
		}
	}
}
function gotErr(err) {
	console.log('Error!');
	console.log(err);
}
function sendData() {
	var data = {
		"name": inp.value(),
		"score": score
	}
	scores.push(data, finished);
}
function finished(error) {
	if (error) {
		console.log('ooops');
	} else {
		console.log('data saved!');
	}
}
function upScore() {
	score++;
}
function draw() {
	background(220);
	textAlign(CENTER);
	text(score, width / 2, height / 2);
let airports;
let myMap;
let canvas;
let mappa;
let options = {
	lat: 40.7128,
	lng: -73.950,
	zoom: 2,
}
function preload() {
	airports = loadTable("airports.txt", "csv", "header");
}
function setup() {
	canvas = createCanvas(640, 640);
	mappa = new Mappa('Leaflet');
	myMap = mappa.tileMap(options);
	myMap.onChange(drawAirports);
}
function drawAirports() {
	clear();
	for (let r = 0; r < airports.getRowCount(); r++) {
		let lat = airports.getString(r, 4);
		let lng = airports.getString(r, 5);
		
		let pos = myMap.latLngToPixel(lat, lng);
		fill(255);
		ellipse(pos.x, pos.y, 5, 5);
	}
}
function draw() {}let img;
let bg;
function preload() {
	img = loadImage('pic.png');
	bg = loadImage('beach.jpeg');
}
function setup() { 
  createCanvas(400, 400);
	image(bg,0,0,400,300);
	image(img,0,0,400,300);
	noLoop();
} 
function setup() {
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
  text(nf(lat,2,7) + " \n" + nf(lng,2,7), 10, 50);
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
  textSize(12);
  text("Current position: " + nf(lat,2,2) + " \n" + nf(lng,2,2), 10, height/2);
}
var x, y, z;
function setup(){
  createCanvas(windowWidth, windowHeight, WEBGL);
	x = 0;
  y = 0;
  z = 0;
}
function draw(){
  background(255, 255, 255, 255);
  translate(-width/2, 0, -600);
  
  x+=accelerationX*0.5;
  y+=accelerationY*5;
  z+=accelerationZ*0.05;
  normalMaterial();
  rotateX(x+2);
  rotateY(y);
  rotateZ(z);
  box(200, 200, 200);
var balls = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
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
function deviceShaken() {
  for (var i = 0; i < balls.length; i++) {
    balls[i].shake();
  }
var bgColor;
function setup() {
  createCanvas(windowWidth, windowHeight);
	setMoveThreshold(0.1);
  bgColor = color(0,0,0);
}
function draw() {
  background(bgColor);
}
function deviceMoved() {
  var r = random(255);
  var g = random(255);
  var b = random(255);
  bgColor = color(r, g, b);
}
var colors;
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(200);
  colors = [color(255,0,0), color(23,23,23),color(0,255,0), color(0,0,255), color(255, 255,0), color(0,255,255), color(23,23,23)];
}
function draw() {
  for (var i = 0; i < touches.length; i++) {
    noStroke();
    fill(colors[i]);
    ellipse(touches[i].x, touches[i].y, 24, 24);
  }
}
function touchMoved() {
}
2017.10.09 -- Aidan Nelson
A quick and dirty clone of the helicopter game as I remember playing it in 
middle school math class on ebaumsworld -- circa 2002.  For Intro to Computational
Media at ITP.
Questions that came up:
	1. should helicopter controls go into helicopter class?
	2. should the function returning an intersection go into the wall or helicopter
			class?
	3. how to monitor an ongoing keypress?
	4. can an object delete itself?
	5. calling 'height' and 'width' from within class OK ?
let heli;
let gameOver = false;
let isFirstGo = true;
let speed = 0;
let walls = [];
let wallHeight = 200;
let wallWidth = 50;
let bg_col;
let difficulty = 10;
let framesElapsed = 0;
function setup() {
	createCanvas(600, 400);
	heli = new Heli();
	bg_col = color(119, 151, 198);
	for (let x = 0; x < 50; x++) {
		let shortWallWidth = width / 50;
		walls.push(new Wall(speed, x * shortWallWidth, 0, shortWallWidth, random(20, 30)));
		walls.push(new Wall(speed, x * shortWallWidth, height - wh, shortWallWidth, wh));
		framesElapsed = 10;
	}
}
function draw() {
	displayGame();
	
	updateGame();
}
function displayGame() {
		fill(119, 151, 198);
		rectMode(CENTER);
		rect(width / 2, height / 2, width, height);
		textSize(50);
		textAlign(CENTER, CENTER);
		fill(255);
		text("HELICOPTER", width / 2, height / 2 - 10);
		textSize(20);
		text("space to play", width / 2, height / 2 + 30);
		speed = 0;
		bg_col = color(255, 0, 0);
		fill(0);
		rectMode(CENTER);
		rect(width / 2, height / 2, width, 100);
		textSize(50);
		textAlign(CENTER, CENTER);
		fill(255);
		text("GAME OVER", width / 2, height / 2 - 10);
		textSize(20);
		text("space to resume", width / 2, height / 2 + 30);
		background(bg_col);
		heli.run();
		for (let i = walls.length - 1; i >= 0; i--) {
			walls[i].run();
			if (walls[i].isOut()) {
				walls.splice(i, 1);
			}
		}
	}
}
function updateGame() {
	checkIfGameOver();
	if (isFirstGo) {
		if (keyIsDown(32)) {
			resetGame();
			isFirstGo = false;
		}
		heli.stop();
		if (keyIsDown(32)) {
			resetGame();
		}
		if (framesElapsed * speed >= wallWidth) {
			addWalls();
			framesElapsed = 0;
		}
		if (keyIsDown(32)) {
			heli.yspeed -= 0.6;
		}
	}
	framesElapsed += 1;
}
function checkIfGameOver() {
	for (let i = walls.length - 1; i >= 0; i--) {
		if (heli.isIn(walls[i])) {
			gameOver = true;
		}
	}
}
function addWalls() {
	walls.push(new Wall(speed, windowWidth, 0, wallWidth, random(20, 10 * difficulty)));
	walls.push(new Wall(speed, windowWidth, height - wh, wallWidth, wh));
}
function resetGame() {
	console.log("reset");
	gameText = "";
	gameOver = false;
	walls.splice(0, walls.length);
	speed = 5;
	bg_col = color(119, 151, 198);
	heli.reset();
	for (let x = 0; x < 50; x++) {
		let shortWallWidth = width / 50;
		walls.push(new Wall(speed, x * shortWallWidth, 0, shortWallWidth, random(20, 30)));
		walls.push(new Wall(speed, x * shortWallWidth, height - wh, shortWallWidth, wh));
		framesElapsed = 10;
	}
}
class Heli {
	constructor() {
		this.x = width / 4;
		this.y = height / 2;
		this.yspeed = 0;
		this.size = 50;
		this.col = color(0, 0, 255);
		this.gravity = 0.3;
	}
	stop(){
		this.yspeed = 0;
		this.gravity = 0;
	}
	reset(){
		this.x = width / 4;
		this.y = height / 2;
		this.yspeed = 0;
		this.size = 50;
		this.col = color(0, 0, 255);
		this.gravity = 0.3;
	}
	
	run() {
		this.update();
		this.display();
	}
	update() {
		this.y += this.yspeed;
		this.yspeed += this.gravity;
	}
	display() {
		fill(this.col);
		ellipse(this.x, this.y, this.size, this.size);
	}
	isIn(wall) {
		if (this.x + this.size / 2 > wall.tlx && this.x - this.size / 2 < wall.tlx + wall.w) {
			if (this.y + this.size / 2 > wall.tly && this.y - this.size / 2 < wall.tly + wall.h) {
				return true;
			}
		}
	}
	isOut() {
		if (this.y + this.size/2 > height || this.y - this.size/2 < 0) {
			return true;
		} else {
			return false;
		}
	}
}
class Wall {
	constructor(speed, x, y, w, h) {
		this.speed = speed;
		this.tlx = x;
		this.tly = y;
		this.w = w;
		this.h = h;
	}
	display() {
		fill(255, 0,0);
		rectMode(CORNER);
		stroke(0);
		rect(this.tlx, this.tly, this.w, this.h);
	}
	isOut() {
		if (this.tlx + this.w < 0) {
			return true;
		} else {
			return false;
		}
	}
	run() {
		this.move();
		this.display();
	}
	move() {
		this.tlx -= speed;
	}
}var mic;
let volArray = [];
let avg = 0;
let fullText = "\"RADICAL HOPE IS OUR BEST WEAPON AGAINST DESPAIR, EVEN WHEN DESPAIR SEEMS JUSTIFIABLE; IT MAKES THE SURVIVAL OF THE END OF YOUR WORLD POSSIBLE. ONLY RADICAL HOPE COULD HAVE IMAGINED PEOPLE LIKE US INTO EXISTENCE. AND I BELIEVE THAT IT WILL HELP US CREATE A BETTER, MORE LOVING FUTURE.\" \n -Junot Diaz";
let displayText = "";
let textIndex = 0;
let myText;
function setup() {
	createCanvas(600, 600);
	mic = new p5.AudioIn();
	mic.start();
	myText = createDiv('');
	myText.style("position", 50, 50);
	myText.style("width", '500px');
	myText.style("font-family", "Gotham");
	myText.style("color", "white");
	myText.style("font-size", '32px');
	video = createVideo('hope-movie.mov');
	video.play();
	video.hide();
}
function draw() {
	background(255);
	var vol = mic.getLevel();
	if (volArray.length > 200) {
		avg = 0;
		for (let x = 0; x < volArray.length; x++) {
			avg += volArray[x];
		}
		avg *= (1 / volArray.length);
		volArray.pop();
	}
	image(video, 0, 0, width, height);
	let a = map(avg, 0.005, 0.1, 255, 0);
	stroke(255);
	fill(0, 0, 0, a);
	rect(0, 0, 600, 600);
	if (avg > 0.08) {
		
			textIndex += 0.5;
		
	} else {
		if (textIndex>0){
			textIndex -= 0.5;
		}
	}
	if (textIndex > fullText.length-1){
		displayText = fullText;
	} else {
		displayText = fullText.slice(0, floor(textIndex));
	}
	console.log(textIndex);
	myText.html(displayText);
}var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
var colors = [ 'aqua' , 'azure' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];
var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;
var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');
var hints = document.querySelector('.hints');
var colorHTML= '';
colors.forEach(function(v, i, a){
  console.log(v, i);
  colorHTML += '<span style="background-color:' + v + ';"> ' + v + ' </span>';
});
hints.innerHTML = 'Tap/click then say a color to change the background color of the app. Try '+ colorHTML + '.';
document.body.onclick = function() {
  recognition.start();
  console.log('Ready to receive a color command.');
}
recognition.onresult = function(event) {
  var last = event.results.length - 1;
  var color = event.results[last][0].transcript;
  diagnostic.textContent = 'Result received: ' + color + '.';
  bg.style.backgroundColor = color;
  console.log('Confidence: ' + event.results[0][0].confidence);
}
recognition.onspeechend = function() {
  recognition.stop();
}
recognition.onnomatch = function(event) {
  diagnostic.textContent = "I didn't recognise that color.";
}
recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
2017.10.22 -- Pcomp Midterm project: April & Aidan
Description: p5.js part of a simple ball-tossing game.
Code Sources:
var query = "q=dance+party";
var apiKey = "&api_key=eLV69yVXgNcn6hj51Qjm6XfwMHnnhDsY";
var lim = "&limit=5";
var url = endpoint + query + apiKey + lim;
let portName = "/dev/cu.usbmodem621";
let score = {
    a: 0,
    b: 0
};
let previousScore = {
    a: 0,
    b: 0
};
let countDown;
let gameOver = false;
let scoreArray;
let song;
let gifURLs = [];
function preload() {
    soundFormats('mp3');
    song = loadSound('skull_fire.mp3');
    scoreSound = loadSound('coin.wav');
    loadJSON(url, getGifURLs);
}
function getGifURLs(gifs) {
    for (let i = 0; i < gifs.data.length; i++) {
        let url = gifs.data[i].images.original.url;
        gifURLs.push(url);
    }
}
function setup() {
    createCanvas(960, 480);
    countDown = 60;
    song.setVolume(0.1);
    song.play();
    scoreSound.setVolume(1);
}
function gotData(data) {
    scoreArray = split(inString, ',');
    if (scoreArray.length > 1) {
        score.a = scoreArray[0];
        score.b = scoreArray[1];
    };
}
function resetScore() {
	gameOver = false;
	countDown = 60;
}
function draw() {
    background(252,255,10);
    if (!gameOver){
        stroke(0);
        line(width / 2, 0, width / 2, height);
        if (frameCount %30 == 0){
            countDown--;
            if (countDown < 0){
                gameOver = true;   
            }
        }
        textSize(120);
        text("GAME OVER",width/2,120);
        textSize(72);
        if (score.a>score.b){
            text("PLAYER A WINS", width/2, 240);
        } else if (score.b>score.a) {
            text("PLAYER B WINS", width/2,240);
        }
				text("space to resume", width/2,320)
    }
}
function keyPressed(){
	if (keyCode==32){
		gameOver = false;
		countDown = 60;
	}
}
function onScore() {
    if (score.a != previousScore.a) {
        imageA.addClass("playerA");
        setTimeout(function(){
            imageA.remove();
        }, 1500);
        previousScore.a = score.a;
        scoreSound.play();
        setTimeout(function(){
            scoreSound.stop();
        }, 1500);
    }
    if (score.b != previousScore.b) {
        imageB.addClass("playerB");
        setTimeout(function(){
            imageB.remove();
        }, 1500);        
        previousScore.b = score.b;
        scoreSound.play();
        setTimeout(function(){
            scoreSound.stop();
        }, 1500);
    }
}
function displayScore() {
    textSize(240);
    textAlign(CENTER);
    text(score.a, width / 4, height / 2);
    text(score.b, width / 4 * 3, height / 2);
    textSize(72);
    text(countDown, width/2, 60);
}
ARDUINO CODE:
  2017.10.22 -- Ball Game: April & Aidan Physical Computing Midterm Project
   Code Sources:
   Threshold and peak detection:
   Color sensor code:
int scoreA = 0;
int scoreB = 0;
int peakValue = 0;
int peakValueB = 0;
int threshold = 120;
int noise = 5;
unsigned int pulseWidth;
unsigned int cValue;
unsigned int pulseWidthB;
unsigned int cValueB;
void setup() {
  sayHello();
  pinMode(S2, OUTPUT);
  pinMode(S3, OUTPUT);
  pinMode(outPin, INPUT);
  pinMode(S2B, OUTPUT);
  pinMode(S3B, OUTPUT);
  pinMode(outPinB, INPUT);
}
void sayHello() {
    delay(250);
  }
}
void loop() {
  digitalWrite(S2, LOW);
  digitalWrite(S3, LOW);
  pulseWidth = (pulseIn(outPin, LOW));
cValue = 255- (pulseWidth/10);
  if (cValue > peakValue) {
    peakValue = cValue;
  }
  if (cValue <= threshold - noise) {
    if (peakValue > threshold) {
      scoreA++;
      peakValue = 0;
    }
  }
  digitalWrite(S2B, LOW);
  digitalWrite(S3B, LOW);
  pulseWidthB = (pulseIn(outPinB, LOW));
cValueB = 255- (pulseWidthB/10);
  if (cValueB > peakValueB) {
    peakValueB = cValueB;
  }
  if (cValueB <= threshold - noise) {
    if (peakValueB > threshold) {
      scoreB++;
      peakValueB = 0;
    }
  }
  if (inByte == 114) {
    scoreA = 0;
    scoreB = 0;
  }
}
}
2017.10.22 -- Pcomp Midterm project: April & Aidan
Description: p5.js part of a simple ball-tossing game.
Code Sources:
var query = "q=dance+party";
var apiKey = "&api_key=eLV69yVXgNcn6hj51Qjm6XfwMHnnhDsY";
var lim = "&limit=5";
var url = endpoint + query + apiKey + lim;
let portName = "/dev/cu.usbmodem411";
let score = {
	a: 0,
	b: 0
};
let previousScore = {
	a: 0,
	b: 0
};
let scoreArray;
let song;
let gifURLs = [];
function preload() {
	loadJSON(url, getGifURLs);
}
function getGifURLs(gifs) {
	for (let i = 0; i < gifs.data.length; i++) {
		let url = gifs.data[i].images.original.url;
		gifURLs.push(url);
	}
}
function setup() {
	createCanvas(windowWidth, windowHeight);
	console.log(gifURLs);
}
function gotData(data) {
	scoreArray = split(inString, ',');
	if (scoreArray.length > 1) {
		score.a = scoreArray[0];
		score.b = scoreArray[1];
		console.log(score.a + " / " + score.b);
	};
}
function resetScore() {
}
function draw() {
	clear();
	stroke(0);
	line(width / 2, 0, width / 2, height);
	onScore();
	displayScore();
}
function onScore() {
	console.log("pscore: " + previousScore.a);
	console.log("score: " + score.a);
	if (score.a != previousScore.a) {
		let image = createImg(gifURLs[floor(random(gifURLs.length))]);
		image.position(0, 0);
		setTimeout(image.remove(), 1500);
		previousScore.a = score.a;
	}
	if (score.b != previousScore.b) {
		let imageB = createImg(gifURLs[floor(random(gifURLs.length))]);
		imageB.position(width / 2, 0);
		setTimeout(imageB.remove(), 1500);
		previousScore.b = score.b;
	}
}
function displayScore() {
	textSize(240);
	textAlign(CENTER);
	text(score.a, width / 4, height / 2);
	text(score.b, width / 4 * 3, height / 2);
}
ARDUINO CODE:
  2017.10.22 -- Ball Game: April & Aidan Physical Computing Midterm Project
   Code Sources:
   Threshold and peak detection:
   Color sensor code:
int scoreA = 0;
int scoreB = 0;
int peakValue = 0;
int threshold = 100;
int noise = 5;
unsigned int pulseWidth;
unsigned int cValue;
void setup() {
  sayHello();
  pinMode(S2, OUTPUT);
  pinMode(S3, OUTPUT);
  pinMode(outPin, INPUT);
}
void sayHello() {
    delay(250);
  }
}
void loop() {
  digitalWrite(S2, LOW);
  digitalWrite(S3, LOW);
  pulseWidth = (pulseIn(outPin, LOW));
  cValue = map(pulseWidth, 0, 1200, 255, 0);
  if (cValue > peakValue) {
    peakValue = cValue;
  }
  if (cValue <= threshold - noise) {
    if (peakValue > threshold) {
      scoreA++;
      peakValue = 0;
    }
  }
    if (inByte == 114) {
      scoreA=0;
      scoreB=0;
    }
    
  }
}
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
2017.10.21 -- CitiBike Usage Visualizer
by Aidan Nelson
Desciption: Visualization of my Citibike bike-sharing usage in the past year (Oct 2016 - Oct 2017).  I 
use citibike often, so there are a relatively large number of trip data points (525) in that time frame.  
Citibike trip data is from their website (after login, there is a 'trips' menu where you can download data) and station
information (containing longitude/latitude) is from citibike's JSON data.  Mapping will happen using
Mappa, which interfaces between p5.js and various online mapping APIs.
Google Maps Directions.
QUESTIONS:
1. Are these arrays of arrays an OK way to hold the station and trip data?  A JSON file seems more logical,
in that each data-point (one trip, or one station) would be held together rather than in 3 separate columns
with a single row index, but I don't know what the logic behind storing and accessing this data is... it 
basically feels semantically unwise to require someone accessing trip info to know that start_time is at
index 0 and start_station is at index 1, etc.  
2. Does "push" copy information or just reference it?  IE does "stationInfo.push(names);" copy the "names" array 
into "stationInfo" array, or just place a reference there?  I am wondering this because the "names" array
is, in this case, local to the loadJSON callback function, and if it were referenced, I don't know why it was
not deleted after the function ended...
4. using map functions in object definitions (latLngToPixel..)?
TO DO:
1. figure out regular expressions: how to match entire station names, rather than parts of names?
IE how to avoid matching "jay st" with "jay st & york st"
2. infinite loop error
let allTrips = [];
let stationInfo = [];
let tripsTaken = [];
let totalTime = 0;
let now = Date.parse("September 30, 2016");
let myMap;
let canvas;
let mappa;
let options = {
    lat: 40.7128,
    lng: -73.950,
    zoom: 12,
}
function preload() {
    console.log("in preload");
    loadStrings("cb_trips.txt", makeTrips);
    soundFormats('mp3');
    song = loadSound('bicycle_race.mp3');
}
function setup() {
    console.log("in setup");
    canvas = createCanvas(640, 640);
    mappa = new Mappa('Leaflet');
    myMap = mappa.tileMap(options);
    myMap.onChange(redrawMap);
    setTimeout(getLatLng(allTrips,stationInfo),5000);
    song.setVolume(0.1);
    song.play();
}
function draw() {
    clear();
    update();
    displayStations();
    displayText();
}
function update() {
    if (frameCount % 30 == 0) {
        now += 1000 * 60 * 60 * 24 * 1;
        updateStations();
    }
}
function updateStations() {
    for (let i = allTrips.length - 1; i >= 0; i--) {
        if (allTrips[i].startTime > now) {
            break;
        } else {
            let tripTime = allTrips[i].endTime - allTrips[i].startTime;
            totalTime+= tripTime;
            tripsTaken.push(allTrips.pop());
        } 
    }
}
function displayStations() {
    for (let j = 0; j < tripsTaken.length; j++) {
        let pnt = myMap.latLngToPixel(tripsTaken[j].orig.lat, tripsTaken[j].orig.lng);
        noStroke();
        fill(200, 255, 0, 25);
        ellipse(pnt.x, pnt.y, 50, 50);
				console.log(tripsTaken[j].dest.lat + " , " + tripsTaken[j].dest.lng);
        pnt = myMap.latLngToPixel(tripsTaken[j].dest.lat, tripsTaken[j].dest.lng);
        fill(255, 0, 150, 25);
        ellipse(pnt.x, pnt.y, 50, 50);
    }
}
function displayText() {
    textAlign(LEFT);
    textSize(12);
    textStyle(ITALIC);
    fill(255);
    text("Date: " + new Date(now).toDateString(), 75, 30);
    text("Trips taken: " + tripsTaken.length, 75,45);
    text("Total Time: " + round(totalTime/1000/60/60) + " hours",75,60);
}
function redrawMap() {}
function getLatLng(trips, stations) {
    console.log("in getLatLng");
    for (let k = 0; k < trips.length; k++) {
        for (let q = 0; q < stations.length; q++) {
            if (trips[k].startStation == stations[q].name) {
                trips[k].orig.lat = stations[q].lat;
                trips[k].orig.lng = stations[q].lng;
            }
            if (trips[k].endStation == stations[q].name) {
                trips[k].dest.lat = stations[q].lat;
                trips[k].dest.lng = stations[q].lng;
            }
        }
    }
    console.log("done w getLatLng");
}
function makeStations(cb_stations) {
    console.log("in makeStations");
    let stations = cb_stations.data.stations;
    for (let i = 0; i < stations.length; i++) {
        let s = new Station(stations[i].name, stations[i].lat, stations[i].lon);
        stationInfo.push(s);
    }
    console.log("done w makeStations");
}
function makeTrips(cb_trips) {
    console.log("in makeTrips");
    let t = new Trip();
    let lineIndex = 1;
    for (let i = 0; i < cb_trips.length; i++) {
        if (lineIndex % 5 == 0) {
            t.duration = trim(cb_trips[i]);
        } else if (lineIndex % 4 == 0) {
            t.endStation = trim(cb_trips[i]);
        } else if (lineIndex % 3 == 0) {
            t.endTime = Date.parse(trim(cb_trips[i]));
        } else if (lineIndex % 2 == 0) {
            t.startStation = trim(cb_trips[i]);
        } else {
            t.startTime = Date.parse(trim(cb_trips[i]));
        }
        lineIndex++;
        if (lineIndex > 5) {
            lineIndex = 1;
            allTrips.push(t);
            t = new Trip();
        }
    }
    console.log("done w makeTrips");
}let someTime = 3000000;
function setup() { 
  createCanvas(400, 400);
	console.log("Hours: " + someTime/1000/60/60);
}
function draw() { 
  background(220);
2017.10.21 -- CitiBike Usage Visualizer
by Aidan Nelson
Desciption: Visualization of my Citibike bike-sharing usage in the past year (Oct 2016 - Oct 2017).  I 
use citibike often, so there are a relatively large number of trip data points (525) in that time frame.  
Citibike trip data
is from their website (after login, there is a 'trips' menu where you can download data) and station
information (containing longitude/latitude) is from citibike's JSON data.  Mapping will happen using
Mappa, which interfaces between p5.js and various online mapping APIs.
QUESTIONS:
1. Are these arrays of arrays an OK way to hold the station and trip data?  A JSON file seems more logical,
in that each data-point (one trip, or one station) would be held together rather than in 3 separate columns
with a single row index, but I don't know what the logic behind storing and accessing this data is... it 
basically feels semantically unwise to require someone accessing trip info to know that start_time is at
index 0 and start_station is at index 1, etc.  
2. Does "push" copy information or just reference it?  IE does "station_info.push(names);" copy the "names" array 
into "station_info" array, or just place a reference there?  I am wondering this because the "names" array
is, in this case, local to the loadJSON callback function, and if it were referenced, I don't know why it was
not deleted after the function ended...
4. using map functions in object definitions (latLngToPixel..)?
TO DO:
1. figure out regular expressions: how to match entire station names, rather than parts of names?
IE how to avoid matching "jay st" with "jay st & york st"
2. infinite loop error
let all_trips = [];
let station_info = [];
let tripsTaken = [];
let now = Date.parse("September 1, 2018");
let myMap;
let canvas;
let mappa;
let options = {
	lat: 40.7128,
	lng: -73.950,
	zoom: 12,
}
let totalTime = 0;
function preload() {
	console.log("in preload");
	loadStrings("cb_trips.txt", makeTrips);
}
function setup() {
	console.log("in setup");
	canvas = createCanvas(640, 640);
	mappa = new Mappa('Leaflet');
	myMap = mappa.tileMap(options);
    
    
}
function draw() {
	clear();
	update();
	displayStations();
	displayText();
    
    if (frameCount%307==0){
        console.log("here: ");
        for (let i=0;i<tripsTaken;i++){
            console.log(tripsTaken[i]);
        }
    }
}
function update() {
	if (frameCount % 30 == 0) {
		now += 1000 * 60 * 60 * 24 * 7;
		updateStations();
	}
}
function updateStations() {
	for (let i = all_trips.length - 1; i >= 0; i--) {
		if (all_trips[i].startTime > now) {
			break;
		} else {
				if (all_trips[i].startStation == station_info[j].name) {
					all_trips[i].orig.lat = station_info[j].lat;
					all_trips[i].orig.lng = station_info[j].lng;
				}
				if (all_trips[i].endStation == station_info[j].name) {
					station_info[j].timesVisited++;
					all_trips[i].dest.lat = station_info[j].lat;
					all_trips[i].dest.lng = station_info[j].lng;
				}
			}
			tripsTaken.push(all_trips.pop());
		}
	}
}
function displayStations() {
	for (let j = 0; j < tripsTaken.length; j++) {
		let pnt = myMap.latLngToPixel(tripsTaken[j].orig.lat, tripsTaken[j].orig.lng);
		fill(0, 0, 255, 75);
		ellipse(pnt.x, pnt.y, 5, 5);
    }
}
function displayText() {
	textSize(12);
	textAlign(LEFT);
	fill(255);
	text(new Date(now), 50, 50);
    text("Trips taken: " + tripsTaken.length, 50,75);
    text("Total Time: " + totalTime,50,100);
}
function redrawMap() {
}
function makeStations(cb_stations) {
	console.log("in makeStations");
	let stations = cb_stations.data.stations;
	for (let i = 0; i < stations.length; i++) {
		let s = new Station(stations[i].name, stations[i].lat, stations[i].lon);
		station_info.push(s);
	}
	console.log("done w makeStations");
}
function makeTrips(cb_trips) {
	console.log("in makeTrips");
	let t = new Trip();
	let lineIndex = 1;
	for (let i = 0; i < cb_trips.length; i++) {
		if (lineIndex % 5 == 0) {
			t.duration = trim(cb_trips[i]);
		} else if (lineIndex % 4 == 0) {
			t.endStation = trim(cb_trips[i]);
		} else if (lineIndex % 3 == 0) {
			t.endTime = Date.parse(trim(cb_trips[i]));
		} else if (lineIndex % 2 == 0) {
			t.startStation = trim(cb_trips[i]);
		} else {
			t.startTime = Date.parse(trim(cb_trips[i]));
		}
		lineIndex++;
		if (lineIndex > 5) {
			lineIndex = 1;
			all_trips.push(t);
			t = new Trip();
		}
	}
	console.log("done w makeTrips");
2017.10.21 -- CitiBike Usage Visualizer
by Aidan Nelson
Desciption: Visualization of my Citibike bike-sharing usage in the past year (Oct 2016 - Oct 2017).  I 
use citibike often, so there are a relatively large number of trip data points (525) in that time frame.  
Citibike trip data
is from their website (after login, there is a 'trips' menu where you can download data) and station
information (containing longitude/latitude) is from citibike's JSON data.  Mapping will happen using
Mappa, which interfaces between p5.js and various online mapping APIs.
QUESTIONS:
1. Are these arrays of arrays an OK way to hold the station and trip data?  A JSON file seems more logical,
in that each data-point (one trip, or one station) would be held together rather than in 3 separate columns
with a single row index, but I don't know what the logic behind storing and accessing this data is... it 
basically feels semantically unwise to require someone accessing trip info to know that start_time is at
index 0 and start_station is at index 1, etc.  
2. Does "push" copy information or just reference it?  IE does "station_info.push(names);" copy the "names" array 
into "station_info" array, or just place a reference there?  I am wondering this because the "names" array
is, in this case, local to the loadJSON callback function, and if it were referenced, I don't know why it was
not deleted after the function ended...
4. using map functions in object definitions (latLngToPixel..)?
TO DO:
1. figure out regular expressions: how to match entire station names, rather than parts of names?
IE how to avoid matching "jay st" with "jay st & york st"
2. infinite loop error
let all_trips = [];
let station_info = [];
let now = Date.parse("September 1, 2016");
let myMap;
let canvas;
let mappa;
let options = {
	lat: 40.7128,
	lng: -73.950,
	zoom: 12,
}
function preload() {
	console.log("in preload");
	loadStrings("cb_trips.txt", makeTrips);
	soundFormats('mp3');
	song = loadSound('bicycle_race.mp3');
}
function setup() {
	console.log("in setup");
	canvas = createCanvas(640, 640);
	mappa = new Mappa('Leaflet');
	myMap = mappa.tileMap(options);
	myMap.onChange(redrawMap);
	song.setVolume(0.1);
	song.play();
}
function draw() {
	clear();
	if (frameCount % 30 == 0) {
		now += 1000 * 60 * 60 * 24 * 7;
	}
	for (let i = 0; i < all_trips.length; i++) {
		if (all_trips[i].startTime < now) {
			for (let j = 0; j < station_info.length; j++) {
				if (all_trips[i].startStation == station_info[j].name) {
					let pnt = myMap.latLngToPixel(station_info[j].lat, station_info[j].lng);
					fill(200, 0, 255,25);
					
					ellipse(pnt.x, pnt.y, 25, 25);
				}
			}
		}
	}
	textSize(12);
	textAlign(LEFT);
	fill(255);
	text(new Date(now), 50, 50);
}
function redrawMap() {
	clear();
	for (let i = 0; i < all_trips.length; i++) {
		if (all_trips[i].startTime > now) {
			for (let j = 0; j < station_info.length; j++) {
				if (all_trips[i].startStation == station_info[j].name) {}
			}
		}
	}
}
function makeTrips(cb_trips) {
	console.log("in makeTrips");
	let t = new Trip();
	let lineIndex = 1;
	for (let i = 0; i < cb_trips.length; i++) {
		if (lineIndex % 5 == 0) {
			t.duration = trim(cb_trips[i]);
		} else if (lineIndex % 4 == 0) {
			t.endStation = trim(cb_trips[i]);
		} else if (lineIndex % 3 == 0) {
			t.endTime = Date.parse(trim(cb_trips[i]));
		} else if (lineIndex % 2 == 0) {
			t.startStation = trim(cb_trips[i]);
		} else {
			t.startTime = Date.parse(trim(cb_trips[i]));
		}
		lineIndex++;
		if (lineIndex > 5) {
			lineIndex = 1;
			all_trips.push(t);
			t = new Trip();
		}
	}
}
function makeStations(cb_stations) {
	console.log("in makeStations");
	let stations = cb_stations.data.stations;
	for (let i = 0; i < stations.length; i++) {
		let s = new Station(stations[i].name, stations[i].lat, stations[i].lon);
		station_info.push(s);
	}
}let arr = [0,1,2,3,4];
function setup() { 
  createCanvas(400, 400);
	console.log(arr);
	console.log(arr.pop());
	console.log(arr);
		console.log(arr);
} 
function draw() { 
  background(220);
let apiKey = "key=AIzaSyA-Oedge0bQ9C6FpwqJseZFd-Mqilp9iTA";
let origin = "&origin=";
let originCoordinates = "40.6961022,-73.96751037";
let destination = "&destination=";
let destinationCoordinates = "40.72743423,-73.99379025";
let mode = "&mode=bicycling";
let url = home + apiKey + origin + originCoordinates + destination + destinationCoordinates + mode;
console.log(url);
let output;
function preload() {
	loadJSON(url, parseThis);
}
function parseThis(output) {
	let route = [];
	let steps = output.routes[0].legs[0].steps;
	for (let i = 0; i < steps.length; i++) {
		let latitude = steps[i].end_location.lat;
		let longitude = steps[i].end_location.lng;
		let s = {
			lat: latitude,
			lng: longitude
		};
		route.push(s);
	}
	console.log(route);
}
function displayDirections(data) {
	console.log(data);
}
function setup() {
	createCanvas(400, 400);
}
function draw() {
	background(220);
}
{
"geocoded_waypoints": [
{
"geocoder_status": "OK",
"place_id": "ChIJ5epMo75ZwokRr6SS6d2NBME",
"types": [
"street_address"
]
},
{
"geocoder_status": "OK",
"place_id": "Eic0Ni01MCBQYXJrIEF2ZSwgQnJvb2tseW4sIE5ZIDExMjA1LCBVU0E",
"types": [
"street_address"
]
}
],
"routes": [
{
"bounds": {
"northeast": {
"lat": 40.7419644,
"lng": -73.9780299
},
"southwest": {
"lat": 40.6961379,
"lng": -74.0022109
}
},
"copyrights": "Map data ©2017 Google",
"legs": [
{
"distance": {
"text": "4.6 mi",
"value": 7410
},
"duration": {
"text": "30 mins",
"value": 1829
},
"end_address": "46-50 Park Ave, Brooklyn, NY 11205, USA",
"end_location": {
"lat": 40.6961379,
"lng": -73.9780299
},
"start_address": "301 W 17th St, New York, NY 10011, USA",
"start_location": {
"lat": 40.74181129999999,
"lng": -74.0014709
},
"steps": [
{
"distance": {
"text": "112 ft",
"value": 34
},
"duration": {
"text": "1 min",
"value": 5
},
"end_location": {
"lat": 40.7419644,
"lng": -74.0018253
},
"html_instructions": "Head <b>northwest</b> on <b>W 17th St</b>",
"polyline": {
"points": "iktwFdltbM]fA"
},
"start_location": {
"lat": 40.74181129999999,
"lng": -74.0014709
},
"travel_mode": "BICYCLING"
},
{
"distance": {
"text": "249 ft",
"value": 76
},
"duration": {
"text": "1 min",
"value": 15
},
"end_location": {
"lat": 40.7413479,
"lng": -74.0022109
},
"html_instructions": "Turn <b>left</b> toward <b>W 16th St</b>",
"maneuver": "turn-left",
"polyline": {
"points": "gltwFlntbMv@b@`Af@"
},
"start_location": {
"lat": 40.7419644,
"lng": -74.0018253
},
"travel_mode": "BICYCLING"
},
{
"distance": {
"text": "0.6 mi",
"value": 920
},
"duration": {
"text": "4 mins",
"value": 244
},
"end_location": {
"lat": 40.7373355,
"lng": -73.99266430000002
},
"html_instructions": "Turn <b>left</b> onto <b>W 16th St</b>",
"maneuver": "turn-left",
"polyline": {
"points": "mhtwFxptbMv@aCjFuPnF{PlGaS"
},
"start_location": {
"lat": 40.7413479,
"lng": -74.0022109
},
"travel_mode": "BICYCLING"
},
{
"distance": {
"text": "0.3 mi",
"value": 496
},
"duration": {
"text": "2 mins",
"value": 125
},
"end_location": {
"lat": 40.733438,
"lng": -73.9955166
},
"html_instructions": "Turn <b>right</b> onto <b>5th Ave</b>",
"maneuver": "turn-right",
"polyline": {
"points": "koswFburbM`C`BxA~@JH^TjCbB`CzA~B~AtBxA"
},
"start_location": {
"lat": 40.7373355,
"lng": -73.99266430000002
},
"travel_mode": "BICYCLING"
},
{
"distance": {
"text": "0.5 mi",
"value": 839
},
"duration": {
"text": "4 mins",
"value": 238
},
"end_location": {
"lat": 40.7297745,
"lng": -73.9868067
},
"html_instructions": "Turn <b>left</b> onto <b>E 10th St</b>",
"maneuver": "turn-left",
"polyline": {
"points": "_wrwF~fsbMnCqIfEwM|AwEp@wBv@qC`CoHz@qC"
},
"start_location": {
"lat": 40.733438,
"lng": -73.9955166
},
"travel_mode": "BICYCLING"
},
{
"distance": {
"text": "0.4 mi",
"value": 719
},
"duration": {
"text": "3 mins",
"value": 154
},
"end_location": {
"lat": 40.7241246,
"lng": -73.9909592
},
"html_instructions": "Turn <b>right</b> onto <b>2nd Ave</b>",
"maneuver": "turn-right",
"polyline": {
"points": "a`rwFppqbMvBvAz@j@t@f@~BzAr@d@x@h@xBxA~@r@v@f@xBxAnAv@r@d@dAr@v@h@b@X"
},
"start_location": {
"lat": 40.7297745,
"lng": -73.9868067
},
"travel_mode": "BICYCLING"
},
{
"distance": {
"text": "138 ft",
"value": 42
},
"duration": {
"text": "1 min",
"value": 7
},
"end_location": {
"lat": 40.7237544,
"lng": -73.991033
},
"html_instructions": "Slight <b>left</b> to stay on <b>2nd Ave</b>",
"maneuver": "turn-slight-left",
"polyline": {
"points": "w|pwFnjrbMp@HVB"
},
"start_location": {
"lat": 40.7241246,
"lng": -73.9909592
},
"travel_mode": "BICYCLING"
},
{
"distance": {
"text": "0.6 mi",
"value": 930
},
"duration": {
"text": "4 mins",
"value": 268
},
"end_location": {
"lat": 40.7159604,
"lng": -73.99501819999999
},
"html_instructions": "Continue onto <b>Chrystie St</b>",
"polyline": {
"points": "mzpwF|jrbM`@HJBJBRHl@Vh@TdBp@jCfAxAj@`CbANDbAd@ZLXJpAn@XLz@\\bA`@h@TfAd@vAj@vClApBx@LJFDFBx@^"
},
"start_location": {
"lat": 40.7237544,
"lng": -73.991033
},
"travel_mode": "BICYCLING"
},
{
"distance": {
"text": "200 ft",
"value": 61
},
"duration": {
"text": "1 min",
"value": 38
},
"end_location": {
"lat": 40.71572760000001,
"lng": -73.99436829999999
},
"html_instructions": "Turn <b>left</b> onto <b>Manhattan Bridge Bicycle Path</b>",
"maneuver": "turn-left",
"polyline": {
"points": "wiowFzcsbMDa@FK^sA"
},
"start_location": {
"lat": 40.7159604,
"lng": -73.99501819999999
},
"travel_mode": "BICYCLING"
},
{
"distance": {
"text": "30 ft",
"value": 9
},
"duration": {
"text": "1 min",
"value": 2
},
"end_location": {
"lat": 40.7156504,
"lng": -73.9944112
},
"html_instructions": "Turn <b>right</b> to stay on <b>Manhattan Bridge Bicycle Path</b>",
"maneuver": "turn-right",
"polyline": {
"points": "ihowFx_sbMNF"
},
"start_location": {
"lat": 40.71572760000001,
"lng": -73.99436829999999
},
"travel_mode": "BICYCLING"
},
{
"distance": {
"text": "1.4 mi",
"value": 2173
},
"duration": {
"text": "7 mins",
"value": 407
},
"end_location": {
"lat": 40.6998511,
"lng": -73.9863408
},
"html_instructions": "Turn <b>right</b> to stay on <b>Manhattan Bridge Bicycle Path</b>",
"maneuver": "turn-right",
"polyline": {
"points": "ygowF``sbMDB@B?BERCHAHAB@DB@D@D?HAPCNCLAL@N@J@@?FCHAZQHEHAF?D?FCDCj@[VMBABATKp@YTKDCDCHE|Aq@PKDA@AVMnAg@XKDC@APGnAk@^QBC@?XM|Aq@r@[@ANGdAe@b@Sr@[NGJEBAJGFCPIJEFCnLwFh@[h@YtEyBjGyCBALEp@[XOd@U@?@AHE|@a@z@c@DCDApAm@\\ONI^OFCnAi@l@WJGJEFCp@Y^QJGz@_@LGLGn@YDCNGJEFCRKTKRKRKLKHKDKHOBGBEDQDMBOBS?O?MAGCICEECCCGCG?E@E@EBABEHCJGTGd@ABE\\E`@?RAP?^"
},
"start_location": {
"lat": 40.7156504,
"lng": -73.9944112
},
"travel_mode": "BICYCLING"
},
{
"distance": {
"text": "33 ft",
"value": 10
},
"duration": {
"text": "1 min",
"value": 2
},
"end_location": {
"lat": 40.6999402,
"lng": -73.9863792
},
"html_instructions": "Turn <b>right</b> toward <b>Sands St</b>",
"maneuver": "turn-right",
"polyline": {
"points": "aelwFrmqbMQF"
},
"start_location": {
"lat": 40.6998511,
"lng": -73.9863408
},
"travel_mode": "BICYCLING"
},
{
"distance": {
"text": "0.2 mi",
"value": 287
},
"duration": {
"text": "1 min",
"value": 63
},
"end_location": {
"lat": 40.6997874,
"lng": -73.9830894
},
"html_instructions": "Turn <b>right</b> at <b>Sands St</b>",
"maneuver": "turn-right",
"polyline": {
"points": "selwFzmqbMIBA??A?A?A?E?G?E@M?E@E?I@Y?]Bm@@_@Di@Fs@JqB@o@@kE?E"
},
"start_location": {
"lat": 40.6999402,
"lng": -73.9863792
},
"travel_mode": "BICYCLING"
},
{
"distance": {
"text": "20 ft",
"value": 6
},
"duration": {
"text": "1 min",
"value": 1
},
"end_location": {
"lat": 40.6997297,
"lng": -73.9830872
},
"html_instructions": "Turn <b>right</b> toward <b>Sands St</b>",
"maneuver": "turn-right",
"polyline": {
"points": "udlwFhypbMJ?"
},
"start_location": {
"lat": 40.6997874,
"lng": -73.9830894
},
"travel_mode": "BICYCLING"
},
{
"distance": {
"text": "0.1 mi",
"value": 222
},
"duration": {
"text": "1 min",
"value": 79
},
"end_location": {
"lat": 40.6996384,
"lng": -73.9804633
},
"html_instructions": "Turn <b>left</b> onto <b>Sands St</b>",
"maneuver": "turn-left",
"polyline": {
"points": "idlwFhypbM?]@[@y@@i@@k@?KBeC@C@gA@eB"
},
"start_location": {
"lat": 40.6997297,
"lng": -73.9830872
},
"travel_mode": "BICYCLING"
},
{
"distance": {
"text": "0.2 mi",
"value": 385
},
"duration": {
"text": "2 mins",
"value": 127
},
"end_location": {
"lat": 40.6961847,
"lng": -73.9804056
},
"html_instructions": "Turn <b>right</b> onto <b>Navy St</b>",
"maneuver": "turn-right",
"polyline": {
"points": "wclwFzhpbMpADv@BfCFBAB?ZAj@?x@AZ?zBOd@CT@F?LAB?HA^?"
},
"start_location": {
"lat": 40.6996384,
"lng": -73.9804633
},
"travel_mode": "BICYCLING"
},
{
"distance": {
"text": "0.1 mi",
"value": 201
},
"duration": {
"text": "1 min",
"value": 54
},
"end_location": {
"lat": 40.6961379,
"lng": -73.9780299
},
"html_instructions": "Turn <b>left</b> onto <b>Park Ave</b><div style=\"font-size:0.9em\">Destination will be on the right</div>",
"maneuver": "turn-left",
"polyline": {
"points": "cnkwFphpbMAUCm@?oBDaCB_A?[@K@}@"
},
"start_location": {
"lat": 40.6961847,
"lng": -73.9804056
},
"travel_mode": "BICYCLING"
}
],
"traffic_speed_entry": [],
"via_waypoint": []
}
],
"overview_polyline": {
"points": "iktwFdltbM]fAv@b@`Af@v@aCzMqb@lGaS`C`BdBhAjDxB`GzDtBxAnCqIdHoThBiG|DaMrDbCbHrExDlCpD`C`GzDb@Xp@Hx@LVF`A`@tJzDpF|BjBz@tAj@lGhChGfCTP`Ab@Da@FK^sANFFFKj@?HHBp@IZ?ZBHCd@SRGL?pAq@\\OrEsB|CqAbH_DxEuBfOkHnOoHxAq@rDgBdCiAdDuAfEmBpCoAf@WVWVi@J_@Fc@?]EQIIKGM@KDSn@UhBAd@?^QFIBA??C?OHoCZoFB{F?EJ?@y@BcBFaEBmDhCHjCD^AdBAvCOd@CT@TALA^?AUC}CJiF@}@"
},
"summary": "Manhattan Bridge Bicycle Path",
"warnings": [
"Bicycling directions are in beta. Use caution – This route may contain streets that aren't suited for bicycling."
],
"waypoint_order": []
}
],
"status": "OK"
}
2017.10.21 -- CitiBike Usage Visualizer
by Aidan Nelson
Desciption: Visualization of my Citibike bike-sharing usage in the past year (Oct 2016 - Oct 2017).  I 
use citibike often, so there are a relatively large number of trip data points (525) in that time frame.  
Citibike trip data
is from their website (after login, there is a 'trips' menu where you can download data) and station
information (containing longitude/latitude) is from citibike's JSON data.  Mapping will happen using
Mappa, which interfaces between p5.js and various online mapping APIs.
QUESTIONS:
1. Are these arrays of arrays an OK way to hold the station and trip data?  A JSON file seems more logical,
in that each data-point (one trip, or one station) would be held together rather than in 3 separate columns
with a single row index, but I don't know what the logic behind storing and accessing this data is... it 
basically feels semantically unwise to require someone accessing trip info to know that start_time is at
index 0 and start_station is at index 1, etc.  
2. Does "push" copy information or just reference it?  IE does "station_info.push(names);" copy the "names" array 
into "station_info" array, or just place a reference there?  I am wondering this because the "names" array
is, in this case, local to the loadJSON callback function, and if it were referenced, I don't know why it was
not deleted after the function ended...
4. using map functions in object definitions (latLngToPixel..)?
TO DO:
1. figure out regular expressions: how to match entire station names, rather than parts of names?
IE how to avoid matching "jay st" with "jay st & york st"
2. infinite loop error
let all_trips = [];
let station_info = [];
let now = Date.parse("September 1, 2016");
let myMap;
let canvas;
let mappa;
let options = {
	lat: 40.7128,
	lng: -73.950,
	zoom: 12,
}
function preload() {
	console.log("in preload");
	loadStrings("cb_trips.txt", makeTrips);
	soundFormats('mp3');
	song = loadSound('bicycle_race.mp3');
}
function setup() {
	console.log("in setup");
	canvas = createCanvas(640, 640);
	mappa = new Mappa('Leaflet');
	myMap = mappa.tileMap(options);
	myMap.onChange(redrawMap);
	song.setVolume(0.1);
	song.play();
}
function draw() {
	clear();
	if (frameCount % 30 == 0) {
		now += 1000 * 60 * 60 * 24 * 7;
	}
	for (let i = 0; i < all_trips.length; i++) {
		if (all_trips[i].startTime < now) {
			for (let j = 0; j < station_info.length; j++) {
				if (all_trips[i].startStation == station_info[j].name) {
					let pnt = myMap.latLngToPixel(station_info[j].lat, station_info[j].lng);
					fill(200, 0, 255);
					ellipse(pnt.x, pnt.y, 7, 7);
				}
			}
		}
	}
	textSize(12);
	textAlign(LEFT);
	fill(255);
	text(new Date(now), 50, 50);
}
function redrawMap() {
	clear();
	for (let i = 0; i < all_trips.length; i++) {
		if (all_trips[i].startTime > now) {
			for (let j = 0; j < station_info.length; j++) {
				if (all_trips[i].startStation == station_info[j].name) {}
			}
		}
	}
}
function makeTrips(cb_trips) {
	console.log("in makeTrips");
	let t = new Trip();
	let lineIndex = 1;
	for (let i = 0; i < cb_trips.length; i++) {
		if (lineIndex % 5 == 0) {
			t.duration = trim(cb_trips[i]);
		} else if (lineIndex % 4 == 0) {
			t.endStation = trim(cb_trips[i]);
		} else if (lineIndex % 3 == 0) {
			t.endTime = Date.parse(trim(cb_trips[i]));
		} else if (lineIndex % 2 == 0) {
			t.startStation = trim(cb_trips[i]);
		} else {
			t.startTime = Date.parse(trim(cb_trips[i]));
		}
		lineIndex++;
		if (lineIndex > 5) {
			lineIndex = 1;
			all_trips.push(t);
			t = new Trip();
		}
	}
}
function makeStations(cb_stations) {
	console.log("in makeStations");
	let stations = cb_stations.data.stations;
	for (let i = 0; i < stations.length; i++) {
		let s = new Station(stations[i].name, stations[i].lat, stations[i].lon);
		station_info.push(s);
	}
2017.10.21 -- CitiBike Usage Visualizer
by Aidan Nelson
Desciption: Visualization of my Citibike bike-sharing usage in the past year (Oct 2016 - Oct 2017).  I 
use citibike often, so there are a relatively large number of trip data points (525) in that time frame.  
Citibike trip data
is from their website (after login, there is a 'trips' menu where you can download data) and station
information (containing longitude/latitude) is from citibike's JSON data.  Mapping will happen using
Mappa, which interfaces between p5.js and various online mapping APIs.
QUESTIONS:
1. Are these arrays of arrays an OK way to hold the station and trip data?  A JSON file seems more logical,
in that each data-point (one trip, or one station) would be held together rather than in 3 separate columns
with a single row index, but I don't know what the logic behind storing and accessing this data is... it 
basically feels semantically unwise to require someone accessing trip info to know that start_time is at
index 0 and start_station is at index 1, etc.  
2. Does "push" copy information or just reference it?  IE does "station_info.push(names);" copy the "names" array 
into "station_info" array, or just place a reference there?  I am wondering this because the "names" array
is, in this case, local to the loadJSON callback function, and if it were referenced, I don't know why it was
not deleted after the function ended...
4. using map functions in object definitions (latLngToPixel..)?
TO DO:
1. figure out regular expressions: how to match entire station names, rather than parts of names?
IE how to avoid matching "jay st" with "jay st & york st"
2. infinite loop error
let all_trips = [];
let station_info = [];
let tripsTaken = [];
let tripsIndex;
let route = [{
	"lat": 40.6977549,
	"lng": -73.96772899999999
}, {
	"lat": 40.6982737,
	"lng": -73.9805511
}, {
	"lat": 40.699748,
	"lng": -73.9804601
}, {
	"lat": 40.6998395,
	"lng": -73.9830842
}, {
	"lat": 40.6997874,
	"lng": -73.9830894
}, {
	"lat": 40.6999402,
	"lng": -73.9863792
}, {
	"lat": 40.6998511,
	"lng": -73.9863408
}, {
	"lat": 40.7156504,
	"lng": -73.9944112
}, {
	"lat": 40.71572760000001,
	"lng": -73.99436829999999
}, {
	"lat": 40.7159286,
	"lng": -73.9948476
}, {
	"lat": 40.7212588,
	"lng": -73.99223150000002
}, {
	"lat": 40.7216138,
	"lng": -73.9934573
}, {
	"lat": 40.7223341,
	"lng": -73.9931936
}, {
	"lat": 40.7236843,
	"lng": -73.99646849999999
}, {
	"lat": 40.7272842,
	"lng": -73.993628
}, {
	"lat": 40.7273868,
	"lng": -73.9938318
}];
let now = Date.parse("September 1, 2016");
let myMap;
let canvas;
let mappa;
let options = {
	lat: 40.7128,
	lng: -73.950,
	zoom: 12,
}
function preload() {
	console.log("in preload");
	loadStrings("cb_trips.txt", makeTrips);
}
function setup() {
	console.log("in setup");
	canvas = createCanvas(640, 640);
	mappa = new Mappa('Leaflet');
	myMap = mappa.tileMap(options);
	myMap.onChange(redrawMap);
	tripsIndex = all_trips.length - 1;
}
function draw() {
	clear();
	update();
	displayStations();
	console.log("abt to display text");
	displayText();
}
function update() {
	if (frameCount % 30 == 0) {
		now += 1000 * 60 * 60 * 24 * 7;
		updateStations();
	}
}
function updateStations() {
	for (let i = all_trips.length - 1; i >= 0; i--) {
		if (all_trips[i].startTime > now) {
			break;
		} else {
				if (all_trips[i].startStation == station_info[j].name) {
					all_trips[i].orig.lat = station_info[j].lat;
					all_trips[i].orig.lng = station_info[j].lng;
				}
				if (all_trips[i].endStation == station_info[j].name) {
					station_info[j].timesVisited++;
					all_trips[i].dest.lat = station_info[j].lat;
					all_trips[i].dest.lng = station_info[j].lng;
				}
			}
			tripsTaken.push(all_trips.pop());
			console.log(tripsTaken.length);
		}
	}
}
function displayStations() {
	for (let j = 0; j < tripsTaken.length; j++) {
		let pnt = myMap.latLngToPixel(tripsTaken[j].lat, tripsTaken[j].lng);
		let size = station_info[j].timesVisited * 1;
		fill(0, 0, 255, 75);
		ellipse(pnt.x, pnt.y, size, size);
	}
}
function displayText() {
	textSize(12);
		console.log("really");
	textAlign(LEFT);
		console.log("really");
	fill(255);
		console.log("really");
	text(new Date(now), 50, 50);
}
function redrawMap() {
}
function makeStations(cb_stations) {
	console.log("in makeStations");
	let stations = cb_stations.data.stations;
	for (let i = 0; i < stations.length; i++) {
		let s = new Station(stations[i].name, stations[i].lat, stations[i].lon);
		station_info.push(s);
	}
	console.log("done w makeStations");
}
function makeTrips(cb_trips) {
	console.log("in makeTrips");
	let t = new Trip();
	let lineIndex = 1;
	for (let i = 0; i < cb_trips.length; i++) {
		if (lineIndex % 5 == 0) {
			t.duration = trim(cb_trips[i]);
		} else if (lineIndex % 4 == 0) {
			t.endStation = trim(cb_trips[i]);
		} else if (lineIndex % 3 == 0) {
			t.endTime = Date.parse(trim(cb_trips[i]));
		} else if (lineIndex % 2 == 0) {
			t.startStation = trim(cb_trips[i]);
		} else {
			t.startTime = Date.parse(trim(cb_trips[i]));
		}
		lineIndex++;
		if (lineIndex > 5) {
			lineIndex = 1;
			all_trips.push(t);
			t = new Trip();
		}
	}
	console.log("done w makeTrips");
2017.10.22 -- Pcomp Midterm project: April & Aidan
Description: p5.js part of a simple ball-tossing game.
Code Sources:
let portName = "/dev/cu.usbmodem621";
let score = {
	a: 0,
	b: 0
};
let scoreArray;
let song;
function preload() {
	soundFormats('mp3');
	song = loadSound('song.mp3');
}
function setup() {
	createCanvas(windowWidth, windowHeight);
	song.setVolume(0.1);
	song.play();
}
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
function gotData(data) {
	scoreArray = split(inString, ',');
	if (scoreArray.length > 1) {
		score.a = scoreArray[0];
		score.b = scoreArray[1];
		console.log(score.a + " / " + score.b);
	}
}
function resetScore() {
}
function draw() {
	background(200, 0, 0);
	textSize(20);
	text(score.a, 50, 50);
	text(score.b, 100, 100);
}
ARDUINO CODE:
  2017.10.22 -- Ball Game: April & Aidan Physical Computing Midterm Project
   Code Sources:
   Threshold and peak detection:
   Color sensor code:
int scoreA = 0;
int scoreB = 0;
int peakValue = 0;
int threshold = 100;
int noise = 5;
unsigned int pulseWidth;
unsigned int cValue;
void setup() {
  sayHello();
  pinMode(S2, OUTPUT);
  pinMode(S3, OUTPUT);
  pinMode(outPin, INPUT);
}
void sayHello() {
    delay(250);
  }
}
void loop() {
  digitalWrite(S2, LOW);
  digitalWrite(S3, LOW);
  pulseWidth = (pulseIn(outPin, LOW));
  cValue = map(pulseWidth, 0, 1200, 255, 0);
  if (cValue > peakValue) {
    peakValue = cValue;
  }
  if (cValue <= threshold - noise) {
    if (peakValue > threshold) {
      scoreA++;
      peakValue = 0;
    }
  }
    if (inByte == 114) {
      scoreA=0;
      scoreB=0;
    }
    
  }
}
	"startTime": "09/28/2017 7:54:16 AM",
	"endTime": "09/28/2017 8:00:24 AM",
	"startStation": "Willoughby Ave & Hall St",
	"endStation": "DeKalb Ave & Hudson Ave",
	"duration": "6 min 8 s"
}
function setup() {
	createCanvas(400, 400);
	
	let d = Date.parse(t.startTime);
	let e = Date.parse(t.endTime);
	console.log("start: " + d + " / end: " + e);
	console.log("diff: " + ((e-d)/1000/60));
	console.log(e>d);
}
function draw() {
	background(220);
2017.10.21 -- CitiBike Usage Visualizer
by Aidan Nelson
Desciption: Visualization of my Citibike bike-sharing usage in the past year (Oct 2016 - Oct 2017).  I 
use citibike often, so there are a relatively large number of trip data points (525) in that time frame.  
Citibike trip data
is from their website (after login, there is a 'trips' menu where you can download data) and station
information (containing longitude/latitude) is from citibike's JSON data.  Mapping will happen using
Mappa, which interfaces between p5.js and various online mapping APIs.
QUESTIONS:
1. Are these arrays of arrays an OK way to hold the station and trip data?  A JSON file seems more logical,
in that each data-point (one trip, or one station) would be held together rather than in 3 separate columns
with a single row index, but I don't know what the logic behind storing and accessing this data is... it 
basically feels semantically unwise to require someone accessing trip info to know that start_time is at
index 0 and start_station is at index 1, etc.  
2. Does "push" copy information or just reference it?  IE does "station_info.push(names);" copy the "names" array 
into "station_info" array, or just place a reference there?  I am wondering this because the "names" array
is, in this case, local to the loadJSON callback function, and if it were referenced, I don't know why it was
not deleted after the function ended...
4. using map functions in object definitions (latLngToPixel..)?
TO DO:
1. figure out regular expressions: how to match entire station names, rather than parts of names?
IE how to avoid matching "jay st" with "jay st & york st"
2. infinite loop error
let all_trips = [];
let station_info = [];
let visited_stations = [];
let now = Date.parse("September 1, 2016");
let myMap;
let canvas;
let mappa;
let options = {
	lat: 40.7128,
	lng: -73.950,
	zoom: 12,
}
function preload() {
	console.log("in preload");
	loadStrings("cb_trips.txt", makeTrips);
	soundFormats('mp3');
	song = loadSound('bicycle_race.mp3');
}
function setup() {
	console.log("in setup");
	canvas = createCanvas(640, 640);
	mappa = new Mappa('Leaflet');
	myMap = mappa.tileMap(options);
	myMap.onChange(redrawMap);
	song.setVolume(0.1);
	song.play();
}
function draw() {
	clear();
	if (frameCount % 30 == 0) {
		now += 1000 * 60 * 60 * 24 * 7;
	}
	updateMap();
	displayStations()
	
	textSize(12);
	textAlign(LEFT);
	fill(255);
	text(new Date(now), 50, 50);
}
function updateMap(){
	for (let i = 0; i < all_trips.length; i++) {
		if (all_trips[i].startTime < now) {
			
			if (
			
			
			for (let j = 0; j < station_info.length; j++) {
				if (all_trips[i].startStation == station_info[j].name) {
					let pnt = myMap.latLngToPixel(station_info[j].lat, station_info[j].lng);
					fill(0, 0, 255);
					ellipse(pnt.x, pnt.y, 5, 5);
				}
			}
		}
	}
}
function redrawMap() {
	clear();
	for (let i = 0; i < all_trips.length; i++) {
		if (all_trips[i].startTime > now) {
			for (let j = 0; j < station_info.length; j++) {
				if (all_trips[i].startStation == station_info[j].name) {}
			}
		}
	}
}
function makeTrips(cb_trips) {
	console.log("in makeTrips");
	let t = new Trip();
	let lineIndex = 1;
	for (let i = 0; i < cb_trips.length; i++) {
		if (lineIndex % 5 == 0) {
			t.duration = trim(cb_trips[i]);
		} else if (lineIndex % 4 == 0) {
			t.endStation = trim(cb_trips[i]);
		} else if (lineIndex % 3 == 0) {
			t.endTime = Date.parse(trim(cb_trips[i]));
		} else if (lineIndex % 2 == 0) {
			t.startStation = trim(cb_trips[i]);
		} else {
			t.startTime = Date.parse(trim(cb_trips[i]));
		}
		lineIndex++;
		if (lineIndex > 5) {
			lineIndex = 1;
			all_trips.push(t);
			t = new Trip();
		}
	}
}
function makeStations(cb_stations) {
	console.log("in makeStations");
	let stations = cb_stations.data.stations;
	for (let i = 0; i < stations.length; i++) {
		let s = new Station(stations[i].name, stations[i].lat, stations[i].lon);
		station_info.push(s);
	}
}function setup() {
	createCanvas(400, 400);
	for (let i = 0; i < 500; i++) {
		for (let j = 0; j < 800; j++) {
			console.log("i: " + i + " / j: " + j);
		}
	}
}
function draw() {
	background(220);
2017.10.21 -- CitiBike Usage Visualizer
by Aidan Nelson
Desciption: Visualization of my Citibike bike-sharing usage in the past year (Oct 2016 - Oct 2017).  I 
use citibike often, so there are a relatively large number of trip data points (525) in that time frame.  
Citibike trip data
is from their website (after login, there is a 'trips' menu where you can download data) and station
information (containing longitude/latitude) is from citibike's JSON data.  Mapping will happen using
Mappa, which interfaces between p5.js and various online mapping APIs.
QUESTIONS:
1. Are these arrays of arrays an OK way to hold the station and trip data?  A JSON file seems more logical,
in that each data-point (one trip, or one station) would be held together rather than in 3 separate columns
with a single row index, but I don't know what the logic behind storing and accessing this data is... it 
basically feels semantically unwise to require someone accessing trip info to know that start_time is at
index 0 and start_station is at index 1, etc.  
2. Does "push" copy information or just reference it?  IE does "station_info.push(names);" copy the "names" array 
into "station_info" array, or just place a reference there?  I am wondering this because the "names" array
is, in this case, local to the loadJSON callback function, and if it were referenced, I don't know why it was
not deleted after the function ended...
TO DO:
1. figure out regular expressions: how to match entire station names, rather than parts of names?
IE how to avoid matching "jay st" with "jay st & york st"
2. infinite loop error
let all_trips = [];
let station_info = [];
let currentDate;
let myMap;
let canvas;
let mappa;
let options = {
	lat: 40.7128,
	lng: -73.950,
	zoom: 12,
}
function preload() {
	console.log("in preload");
	loadStrings("cb_trips.txt", makeTripTable);
}
function setup() {
	console.log("in setup");
	canvas = createCanvas(640, 640);
	mappa = new Mappa('Leaflet');
	myMap = mappa.tileMap(options);
	myMap.onChange(redrawMap);
}
function draw() {
}
function redrawMap(currentDate) {
	clear();
	
	
	for (let i = 0; i < all_trips[0].length; i++) {
		for (let j = 0; j < station_info[0].length; j++) {
			if (all_trips[1][i] == station_info[0][j]) {
				let pnt = myMap.latLngToPixel(station_info[1][j], station_info[2][j]);
				fill(0, 0, 255);
				ellipse(pnt.x, pnt.y, 5, 5);
			}
			if (all_trips[3][i] == station_info[0][j]) {
				let pnt = myMap.latLngToPixel(station_info[1][j], station_info[2][j]);
				fill(255, 0, 0);
				ellipse(pnt.x, pnt.y, 5, 5);
			}
		}
	}
}
function addCoordinatesToTrips(trips, stations) {
			console.log("i: " + i + " / j: " + j);
		}
	}
	console.log('end');
}
	function makeTripTable(cb_trips) {
		console.log("in makeTable");
		let start_time = [];
		let start_station = [];
		let end_time = [];
		let end_station = [];
		let trip_duration = [];
		let line_index = 1;
		for (let i = 0; i < cb_trips.length; i++) {
			if (line_index % 5 == 0) {
				trip_duration.push(trim(cb_trips[i]));
			} else if (line_index % 4 == 0) {
				end_station.push(trim(cb_trips[i]));
			} else if (line_index % 3 == 0) {
				end_time.push(trim(cb_trips[i]));
			} else if (line_index % 2 == 0) {
				start_station.push(trim(cb_trips[i]));
			} else {
				start_time.push(trim(cb_trips[i]));
			}
			line_index++;
			if (line_index > 5) {
				line_index = 1;
			}
		}
		all_trips.push(start_time);
		all_trips.push(start_station);
		all_trips.push(end_time);
		all_trips.push(end_station);
		all_trips.push(trip_duration);
	}
	function makeStationTable(cb_stations) {
		console.log("in makeStationTable");
		let names = [];
		let lat = [];
		let lng = [];
		let stations = cb_stations.data.stations;
		for (let i = 0; i < stations.length; i++) {
			names.push(stations[i].name);
			lat.push(stations[i].lat);
			lng.push(stations[i].lon);
		}
		station_info.push(names);
		station_info.push(lat);
		station_info.push(lng);
	}function setup() { 
  createCanvas(400, 400);
	
	
	let str = "jay st & york st";
	let regex = "^jay st$";
	
	if (match(str,regex)){
		console.log(match(str,regex));
	} else {
		console.log("no match");
	}
} 
function draw() { 
  background(220);
2017.10.21 -- CitiBike Usage Visualizer
by Aidan Nelson
Desciption: Visualization of my Citibike bike-sharing usage in the past year (Oct 2016 - Oct 2017).  I 
use citibike often, so there are a relatively large number of trip data points (525) in that time frame.  
Citibike trip data
is from their website (after login, there is a 'trips' menu where you can download data) and station
information (containing longitude/latitude) is from citibike's JSON data.  Mapping will happen using
Mappa, which interfaces between p5.js and various online mapping APIs.
QUESTIONS:
1. Are these arrays of arrays an OK way to hold the station and trip data?  A JSON file seems more logical,
in that each data-point (one trip, or one station) would be held together rather than in 3 separate columns
with a single row index, but I don't know what the logic behind storing and accessing this data is... it 
basically feels semantically unwise to require someone accessing trip info to know that start_time is at
index 0 and start_station is at index 1, etc.  
2. Does "push" copy information or just reference it?  IE does "station_info.push(names);" copy the "names" array 
into "station_info" array, or just place a reference there?  I am wondering this because the "names" array
is, in this case, local to the loadJSON callback function, and if it were referenced, I don't know why it was
not deleted after the function ended...
TO DO:
1. figure out regular expressions: how to match entire station names, rather than parts of names?
IE how to avoid matching "jay st" with "jay st & york st"
2. infinite loop error
let all_trips = [];
let station_info = [];
let myMap;
let canvas;
let mappa;
let options = {
	lat: 40.7128,
	lng: -73.950,
	zoom: 12,
}
function preload() {
	console.log("in preload");
	loadStrings("cb_trips.txt", makeTripTable);
	soundFormats('mp3');
	song = loadSound('bicycle_race.mp3');
}
function setup() {
	console.log("in setup");
	setTimeout(addCoordinatesToTrips, 2000, all_trips, station_info);
}
function draw() {
}
function redrawMap() {
	clear();
	for (let i = 0; i < all_trips[0].length; i++) {
		for (let j = 0; j < station_info[0].length; j++) {
			if (all_trips[1][i] == station_info[0][j]) {
				let pnt = myMap.latLngToPixel(station_info[1][j], station_info[2][j]);
				fill(0, 0, 255);
				ellipse(pnt.x, pnt.y, 5, 5);
			}
			if (all_trips[3][i] == station_info[0][j]) {
				let pnt = myMap.latLngToPixel(station_info[1][j], station_info[2][j]);
				fill(255, 0, 0);
				ellipse(pnt.x, pnt.y, 5, 5);
			}
		}
	}
}
function addCoordinatesToTrips(trips, stations) {
			console.log("i: " + i + " / j: " + j);
		}
	}
	console.log('end');
}
	function makeTripTable(cb_trips) {
		console.log("in makeTable");
		let start_time = [];
		let start_station = [];
		let end_time = [];
		let end_station = [];
		let trip_duration = [];
		let line_index = 1;
		for (let i = 0; i < cb_trips.length; i++) {
			if (line_index % 5 == 0) {
				trip_duration.push(trim(cb_trips[i]));
			} else if (line_index % 4 == 0) {
				end_station.push(trim(cb_trips[i]));
			} else if (line_index % 3 == 0) {
				end_time.push(trim(cb_trips[i]));
			} else if (line_index % 2 == 0) {
				start_station.push(trim(cb_trips[i]));
			} else {
				start_time.push(trim(cb_trips[i]));
			}
			line_index++;
			if (line_index > 5) {
				line_index = 1;
			}
		}
		all_trips.push(start_time);
		all_trips.push(start_station);
		all_trips.push(end_time);
		all_trips.push(end_station);
		all_trips.push(trip_duration);
	}
	function makeStationTable(cb_stations) {
		console.log("in makeStationTable");
		let names = [];
		let lat = [];
		let lng = [];
		let stations = cb_stations.data.stations;
		for (let i = 0; i < stations.length; i++) {
			names.push(stations[i].name);
			lat.push(stations[i].lat);
			lng.push(stations[i].lon);
		}
		station_info.push(names);
		station_info.push(lat);
		station_info.push(lng);
2017.10.19 -- Fly By on Maps
following along with...
var myMap;
var canvas;
var mappa;
var options = {
	lat: 0,
	lng: 0,
	zoom: 4,
}
function preload() {
	meteorites = loadTable('meteorite_landings.csv', 'csv', 'header');
}
function setup() {
	canvas = createCanvas(640, 640);
	mappa = new Mappa('Leaflet');
	myMap = mappa.tileMap(options);
	myMap.onChange(drawMeteorites);
}
function draw() {}
function drawPoints() {
	clear();
	var pier = myMap.latLngToPixel(41.043285, -73.896486);
	fill(230, 220, 0, 75);
	ellipse(pier.x, pier.y, 30, 30);
}
function drawMeteorites() {
	clear();
	for (var i = 0; i < meteorites.getRowCount(); i++) {
		var latitude = Number(meteorites.getString(i, 'reclat'));
		var longitude = Number(meteorites.getString(i, 'reclong'));
		if (myMap.map.getBounds().contains({
				lat: latitude,
				lng: longitude
			})) {
			var pos = myMap.latLngToPixel(latitude, longitude);
			var size = meteorites.getString(i, 'mass (g)');
			size = map(size, 558, 60000000, 1, 25) + myMap.zoom();
			ellipse(pos.x, pos.y, size, size);
		}
	}
}function setup() { 
  createCanvas(	, 1080);
} 
function draw() { 
  background(220,220,0);
2017.10.09 -- Aidan Nelson
A quick and dirty clone of the helicopter game as I remember playing it in 
middle school math class on ebaumsworld -- circa 2002.  For Intro to Computational
Media at ITP.
Questions that came up:
	1. should helicopter controls go into helicopter class?
	2. should the function returning an intersection go into the wall or helicopter
			class?
	3. how to monitor an ongoing keypress?
	4. can an object delete itself?
	5. calling 'height' and 'width' from within class OK ?
let heli;
let gameOver = false;
let isFirstGo = true;
let speed = 0;
let walls = [];
let wallHeight = 200;
let wallWidth = 50;
let bg_col;
let difficulty = 10;
let framesElapsed = 0;
function setup() {
	createCanvas(600, 400);
	heli = new Heli();
	bg_col = color(119, 151, 198);
	for (let x = 0; x < 50; x++) {
		let shortWallWidth = width / 50;
		walls.push(new Wall(speed, x * shortWallWidth, 0, shortWallWidth, random(20, 30)));
		walls.push(new Wall(speed, x * shortWallWidth, height - wh, shortWallWidth, wh));
		framesElapsed = 10;
	}
}
function gotData() {
}
function draw() {
	displayGame();
	updateGame();
}
function displayGame() {
		fill(119, 151, 198);
		rectMode(CENTER);
		rect(width / 2, height / 2, width, height);
		textSize(50);
		textAlign(CENTER, CENTER);
		fill(255);
		text("HELICOPTER", width / 2, height / 2 - 10);
		textSize(20);
		text("space to play", width / 2, height / 2 + 30);
		speed = 0;
		bg_col = color(255, 0, 0);
		fill(0);
		rectMode(CENTER);
		rect(width / 2, height / 2, width, 100);
		textSize(50);
		textAlign(CENTER, CENTER);
		fill(255);
		text("GAME OVER", width / 2, height / 2 - 10);
		textSize(20);
		text("space to resume", width / 2, height / 2 + 30);
		background(bg_col);
		heli.run();
		for (let i = walls.length - 1; i >= 0; i--) {
			walls[i].run();
			if (walls[i].isOut()) {
				walls.splice(i, 1);
			}
		}
	}
}
function updateGame() {
	checkIfGameOver();
	if (isFirstGo) {
		if (keyIsDown(32)) {
			resetGame();
			isFirstGo = false;
		}
		heli.stop();
		if (keyIsDown(32)) {
			resetGame();
		}
		if (framesElapsed * speed >= wallWidth) {
			addWalls();
			framesElapsed = 0;
		}
		if (keyIsDown(32)) {
			heli.yspeed -= 0.6;
		}
	}
	
	let hY = map(latestData,0,1023,0,height);
	heli.y = hY
	framesElapsed += 1;
}
function checkIfGameOver() {
	for (let i = walls.length - 1; i >= 0; i--) {
		if (heli.isIn(walls[i])) {
			gameOver = true;
		}
	}
}
function addWalls() {
	walls.push(new Wall(speed, windowWidth, 0, wallWidth, random(20, 10 * difficulty)));
	walls.push(new Wall(speed, windowWidth, height - wh, wallWidth, wh));
}
function resetGame() {
	console.log("reset");
	gameText = "";
	gameOver = false;
	walls.splice(0, walls.length);
	speed = 5;
	bg_col = color(119, 151, 198);
	heli.reset();
	for (let x = 0; x < 50; x++) {
		let shortWallWidth = width / 50;
		walls.push(new Wall(speed, x * shortWallWidth, 0, shortWallWidth, random(20, 30)));
		walls.push(new Wall(speed, x * shortWallWidth, height - wh, shortWallWidth, wh));
		framesElapsed = 10;
	}
2017.10.17 -- Aidan Nelson / Giphy API test 
var query = "q=dance+party";
var apiKey = "&api_key=eLV69yVXgNcn6hj51Qjm6XfwMHnnhDsY";
var lim = "&limit=3";
var url = endpoint + query + apiKey + lim;
function preload(){
		loadJSON(url, displayGifs);
}
function setup() {}
function draw(){
}
function displayGifs(gifs) {
	console.log(gifs.data.length);
	for (let i = 0; i < gifs.data.length; i++) {
		console.log(gifs.data[i].images.fixed_height.url);
		let gifUrl = gifs.data[i].images.fixed_height.url;
		let image = createImg(gifUrl);
		image.position(0,0);
	}
}
function draw() {
function setup() { 
  createCanvas(600, 600);
  noFill();
  strokeWeight(10);
} 
function draw() { 
	let latestCol = map(latestData,50,400,100,255);
	
  background(latestCol, latestCol, 127);
  let mappedData = map(latestData, 50,400,100,300);
  var v = mappedData; 
  var origV = v;
  ellipse(width*.4, height*.4, v*.25 + 10, v*.25 + 10);
  ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
	
  v+=random(-5, 5);
  bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);
  bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
}
function gotData() {
}
var button;
var myCanvas;
var cList = [];
function setup(){ 
  myCanvas = createCanvas(300, 300);
    myCanvas.position(0,50);
    button = createButton("cheese");
    button.mousePressed(cheeseDrop);
} 
function draw() {
    for (let i=0; i<cList.length; i++){
        ellipse(cList[i].x,cList[i].y,50,50);
        console.log("ok");
				cList[i].y++;
    }
}
function cheeseDrop(){
    let cheese = {x:random(width),y:0};
    cList.push(cheese);
}
2017.10.09 -- Aidan Nelson
A quick and dirty clone of the helicopter game as I remember playing it in 
middle school math class on ebaumsworld -- circa 2002.  For Intro to Computational
Media at ITP.
Questions that came up:
	1. should helicopter controls go into helicopter class?
	2. should the function returning an intersection go into the wall or helicopter
			class?
	3. how to monitor an ongoing keypress?
	4. can an object delete itself?
	5. calling 'height' and 'width' from within class OK ?
let heli;
let gameOver = false;
let isFirstGo = true;
let speed = 0;
let walls = [];
let wallHeight = 200;
let wallWidth = 50;
let bg_col;
let difficulty = 10;
let framesElapsed = 0;
function setup() {
	createCanvas(600, 400);
	heli = new Heli();
	bg_col = color(119, 151, 198);
	for (let x = 0; x < 50; x++) {
		let shortWallWidth = width / 50;
		walls.push(new Wall(speed, x * shortWallWidth, 0, shortWallWidth, random(20, 30)));
		walls.push(new Wall(speed, x * shortWallWidth, height - wh, shortWallWidth, wh));
		framesElapsed = 10;
	}
}
function draw() {
	displayGame();
	
	updateGame();
}
function displayGame() {
		fill(119, 151, 198);
		rectMode(CENTER);
		rect(width / 2, height / 2, width, height);
		textSize(50);
		textAlign(CENTER, CENTER);
		fill(255);
		text("HELICOPTER", width / 2, height / 2 - 10);
		textSize(20);
		text("space to play", width / 2, height / 2 + 30);
		speed = 0;
		bg_col = color(255, 0, 0);
		fill(0);
		rectMode(CENTER);
		rect(width / 2, height / 2, width, 100);
		textSize(50);
		textAlign(CENTER, CENTER);
		fill(255);
		text("GAME OVER", width / 2, height / 2 - 10);
		textSize(20);
		text("space to resume", width / 2, height / 2 + 30);
		background(bg_col);
		heli.run();
		for (let i = walls.length - 1; i >= 0; i--) {
			walls[i].run();
			if (walls[i].isOut()) {
				walls.splice(i, 1);
			}
		}
	}
}
function updateGame() {
	checkIfGameOver();
	if (isFirstGo) {
		if (keyIsDown(32)) {
			resetGame();
			isFirstGo = false;
		}
		heli.stop();
		if (keyIsDown(32)) {
			resetGame();
		}
		if (framesElapsed * speed >= wallWidth) {
			addWalls();
			framesElapsed = 0;
		}
		if (keyIsDown(32)) {
			heli.yspeed -= 0.6;
		}
	}
	framesElapsed += 1;
}
function checkIfGameOver() {
	for (let i = walls.length - 1; i >= 0; i--) {
		if (heli.isIn(walls[i])) {
			gameOver = true;
		}
	}
}
function addWalls() {
	walls.push(new Wall(speed, windowWidth, 0, wallWidth, random(20, 10 * difficulty)));
	walls.push(new Wall(speed, windowWidth, height - wh, wallWidth, wh));
}
function resetGame() {
	console.log("reset");
	gameText = "";
	gameOver = false;
	walls.splice(0, walls.length);
	speed = 5;
	bg_col = color(119, 151, 198);
	heli.reset();
	for (let x = 0; x < 50; x++) {
		let shortWallWidth = width / 50;
		walls.push(new Wall(speed, x * shortWallWidth, 0, shortWallWidth, random(20, 30)));
		walls.push(new Wall(speed, x * shortWallWidth, height - wh, shortWallWidth, wh));
		framesElapsed = 10;
	}
}let x1, y1, x1speed, y1speed;
let x2, y2, x2speed, y2speed;
function setup() {
	createCanvas(400, 400);
	x1 = width / 2;
	y1 = height / 2;
	x1speed = 1;
	y1speed = 3;
	x2 = width / 2;
	y2 = height / 2;
	x2speed = 2;
	y2speed = -3;
}
function draw() {
	background(220);
	x1 = move(x1,x1speed);
						y1=move(y1,y1speed);
	x1speed = bounce(x1, 0, width, x1speed);
	y1speed = bounce(y1, 0, height, y1speed);
	drawball(x1, y1);
	x2 = move(x2,x2speed);
						y2=move(y2,y2speed);;
	x2speed = bounce(x2, 0, width, x2speed);
	y2speed = bounce(y2, 0, height, y2speed);
	drawball(x2, y2);
}
function move(x, speed) {
	x += speed;
	return x;
}
function drawball(x, y) {
	ellipse(x, y, 50, 50);
}
function bounce(x, low, high, speed) {
	if (x < low || x > high) {
		speed *= -1;
	}
	return speed;
}let x1, y1, x1speed, y1speed;
let x2, y2, x2speed, y2speed;
function setup() {
	createCanvas(400, 400);
	x1 = width / 2;
	y1 = height / 2;
	x1speed = 1;
	y1speed = 3;
	x2 = width / 2;
	y2 = height / 2;
	x2speed = 2;
	y2speed = -3;
}
function draw() {
	background(220);
	move(x1, y1, x1speed, y1speed);
	x1speed = bounce(x1, 0, width, x1speed);
	y1speed = bounce(y1, 0, height, y1speed);
	drawball(x1, y1);
	move(x2, y2, x2speed, y2speed);
	x2speed = bounce(x2, 0, width, x2speed);
	y2speed = bounce(y2, 0, height, y2speed);
	drawball(x2, y2);
}
function move(x, y, xspeed, yspeed) {
	x += xspeed;
	y += yspeed;
	return 
}
function drawball(x, y) {
	ellipse(x, y, 50, 50);
}
function bounce(x, low, high, speed) {
	if (x < low || x > high) {
		speed *= -1;
	}
	return speed;
let c1 = {
	h: 211,
	s: 19,
	b: 95
};
let c2 = {
	h: 52,
	s: 10,
	b: 62
};
let c3 = {
	h: 47,
	s: 35,
	b: 51
};
let c4 = {
	h: 41,
	s: 45,
	b: 33
};
let c5 = {
	h: 217,
	s: 33,
	b: 25
};
let colors = [c1, c2, c3, c4, c5];
let b = [];
let j=0;
function setup() {
	createCanvas(600, 600);
	for (i = 0; i < 100; i++) {
		b.push(new Ball(random(width), random(height),colors[j].h,colors[j].s,colors[j].b));
		j++;
		if (j>=colors.length){ j=0;}
	}
}
function draw() {
	background(220);
	for (let i = 0; i < b.length; i++) {
		b[i].run();
	}
}
function bounce(pos, low, high, speed) {
	if (pos < low || pos > high) {
		speed *= -1;
	}
	return speed
let c1 = {
	h: 211,
	s: 19,
	b: 95
};
let c2 = {
	h: 52,
	s: 10,
	b: 62
};
let c3 = {
	h: 47,
	s: 35,
	b: 51
};
let c4 = {
	h: 41,
	s: 45,
	b: 33
};
let c5 = {
	h: 217,
	s: 33,
	b: 25
};
let px, py;
let colors = [c1, c2, c3, c4, c5];
let cIndex = 0;
let rHeight;
let numRows = 43;
function setup() {
	createCanvas(600, 600);
	colorMode(HSB);
	rHeight = height / numRows;
}
function draw() {
	
	if (frameCount % 20 == 0) {
			for (let i = 0; i < numRows; i++) {
				fill(colors[cIndex].h, colors[cIndex].s, colors[cIndex].b,10);
				rect(0, i * rHeight, width, i * rHeight + rHeight);
				cIndex += 1;
				if (cIndex == 5) {
					cIndex = 0;
				}
			}
		}
let c1 = {
	h: 211,
	s: 19,
	b: 95
};
let c2 = {
	h: 52,
	s: 10,
	b: 62
};
let c3 = {
	h: 47,
	s: 35,
	b: 51
};
let c4 = {
	h: 41,
	s: 45,
	b: 33
};
let c5 = {
	h: 217,
	s: 33,
	b: 25
};
let xSpacing = 30;
let ySpacing = 60;
let px, py;
let colors = [c1, c2, c3, c4, c5];
let colWidth;
let numCols = 21;
function setup() {
	createCanvas(600, 600);
	colorMode(HSB);
	console.log(colors);
	colWidth = width / numCols;
	let cIndex=4
	for (let x = 0; x < numCols; x++) {
		fill(colors[cIndex].h, colors[cIndex].s, colors[cIndex].b);
		rect(x * colWidth, 0, x * colWidth + colWidth, height);
		cIndex+=1;
		if (cIndex==5){cIndex=0;}
	}
}
function draw() {
let c1 = {
	h: 211,
	s: 19,
	b: 95
};
let c2 = {
	h: 52,
	s: 10,
	b: 62
};
let c3 = {
	h: 47,
	s: 35,
	b: 51
};
let c4 = {
	h: 41,
	s: 45,
	b: 33
};
let c5 = {
	h: 217,
	s: 33,
	b: 25
};
let xSpacing = 30;
let ySpacing = 60;
let px, py;
let colors = [c1,c2,c3,c4,c5];
let colWidth;
let numCols = 10;
function setup() {
	createCanvas(600, 600);
	colorMode(HSB);
	console.log(colors);
	noStroke();
	
	colWidth=width/numCols;
	
}
	
function draw() {
	for (let x=0; x<numCols; x++){
		fill(0);
		rect(x*colWidth,0,x*colWidth+colWidth,height);
}
let c1 = {
	h: 211,
	s: 19,
	b: 95
};
let c2 = {
	h: 52,
	s: 10,
	b: 62
};
let c3 = {
	h: 47,
	s: 35,
	b: 51
};
let c4 = {
	h: 41,
	s: 45,
	b: 33
};
let c5 = {
	h: 217,
	s: 33,
	b: 25
};
let xSpacing = 30;
let ySpacing = 60;
let px, py;
let colors = [c1,c2,c3,c4,c5];
function setup() {
	createCanvas(600, 600);
	colorMode(HSB);
	console.log(colors);
	noStroke();
}
	
function draw() {
	background(c1.h,c1.s,c1.b);
	fill(c3.h,c3.s,c3.b);
	triangle(width/2,0,0,height,width,height);
	fill(c5.h,c5.s,c5.b);
	triangle(width/2,height,width/4,height/2,3*width/4,height/2);
	fill(c2.h,c2.s,c2.b)
	triangle(width/4,height/2,width/4*3,height/2,width/2,0);
	fill(c4.h,c4.s,c4.b)
	triangle(0,height,width/4,height/2,width/2,height);
}let b = [];
function setup() {
	createCanvas(600, 600);
	for (i = 0; i < 10; i++) {
		b.push(new Ball(random(width), random(height)));
	}
	console.log(b.length);
}
function draw() {
	background(220);
	for (let i = 0; i < b.length; i++) {
		b[i].run();
		for (let j = i+1; j < b.length; j++) {
			if (b[i].isClose(b[j])) {
				b.splice(j,1);
				b.splice(i,1);
				
			}
		}
	}
}
function bounce(pos, low, high, speed) {
	if (pos < low || pos > high) {
		speed *= -1;
	}
	return speed
}let b = [];
function setup() {
	createCanvas(600, 600);
	for (i = 0; i < 50; i++) {
		b.push(new Ball(random(width), random(height)));
	}
}
function draw() {
	background(220);
	for (let i = 0; i < b.length; i++) {
		b[i].run();
		for (let j = 0; j < b.length; j++) {
			if (b[i].isClose(b[j]) && i != j) {
				if (!b[i].isRed) {
					b[i].col = color(255, 0, 0);
					b[i].isRed = !b[i].isRed;
				} else {
					b[i].col = color(255, 255, 255);
					b[i].isRed = !b[i].isRed;
				}
				if (!b[j].isRed) {
					b[j].col = color(255, 0, 0);
					b[j].isRed = !b[j].isRed;
				} else {
					b[j].col = color(255, 255, 255);
					b[j].isRed = !b[i].isRed;
				}
			}
		}
	}
}
function bounce(pos, low, high, speed) {
	if (pos < low || pos > high) {
		speed *= -1;
	}
	return speed
}let positions = [];
function setup() {
	createCanvas(400, 400);
}
function draw() {
	background(220);
	if (mouseIsPressed) {
		positions.push({
			x: mouseX,
			y: mouseY
		});
		noFill();
		strokeWeight(4);
		beginShape();
		for (let i = 0; i < positions.length; i++) {
			curveVertex(positions[i].x, positions[i].y);
		}
		endShape();
	}
}let a = [];
function setup() { 
  createCanvas(400, 400);
	for 
} 
function draw() { 
  background(220);
}let a = [];
function setup() { 
  createCanvas(400, 400);
	for 
} 
function draw() { 
  background(220);
}let a = [];
function setup() { 
  createCanvas(400, 400);
	for 
} 
function draw() { 
  background(220);
}let b = [];
function setup() {
	createCanvas(600, 600);
	for (i = 0; i < 50; i++) {
		b.push(new Ball(random(width), random(height)));
	}
}
function draw() {
	background(220);
	for (let i = 0; i < b.length; i++) {
		b[i].run();
		for (let j = 0; j < b.length; j++) {
			if (b[i].isClose(b[j]) && i != j) {
				b[i].col = color(0);
				b[j].col = color(0);
			} else {
				b[i].col = color(255);
				b[j].col = color(255);
			}
		}
	}
}
function bounce(pos, low, high, speed) {
	if (pos < low || pos > high) {
		speed *= -1;
	}
	return speed
}balls = [];
function setup() {
	createCanvas(400, 400);
	for (let i = 0; i < 300; i++) {
		balls.push(new Ball(random(width), random(height), random(50)));
	}
}
function draw() {
	background(220);
	for (let i = 0; i < balls.length; i++) {
		balls[i].update();
		balls[i].display();
	}
}
let magnets = [];
function setup() {
	createCanvas(600, 500);
}
function draw() {
	background(220, 120, 30);
	for (let i = 0; i < magnets.length; i++) {
		magnets[i].display();
		magnets[i].move();
		magnets[i].bounce();
		if (magnets[i].isHome() && (frameCount - magnets[i].birth) > 10) {
			magnets.splice(i, 1);
			i--;
		}
	}
	if (frameCount % 200 == 0) {
		for (let i = 0; i < magnets.length; i++) {
			magnets[i].reverse();
		}
	}
}
function mouseClicked() {
	let x = constrain(mouseX, 0, width);
	magnets.push(new Magnet(x, mouseY, 24));
}
function Magnet(x, y, d) {
	this.x = x;
	this.y = y;
	this.d = d;
	this.birth = frameCount;
	
	this.birthX = x;
	this.birthY = y;
	this.xspeed = random(-5, 5);
	this.yspeed = random(-5, 5);
	this.move = function() {
		this.x += this.xspeed;
		this.y += this.yspeed;
	}
	this.updateSpeed = function() {
		this.yspeed += (1 / 60 * 10 * (frameCount - this.birth));
		console.log(frameCount - this.birth);
	}
	this.bounce = function() {
		if (this.x - this.d / 2 < 0 || this.x  >= width) {
			this.xspeed *= -1;
		}
		if (this.y - this.d / 2 < 0 || this.y + this.d / 2 > height) {
			this.yspeed *= -1;
		}
	}
	this.reverse = function() {
		this.xspeed *= -1;
		this.yspeed *= -1;
	}
	this.display = function() {
		fill(255, 0, 255);
		ellipse(this.x, this.y, this.d, this.d);
	}
	this.repel = function(magnet) {
		if (dist(this.x, this.y, magnet.x, magnet.y) < 50) {
			this.xspeed = -magnet.xspeed;
			this.yspeed = -magnet.yspeed;
		}
	}
	this.isHome = function() {
		if (dist(this.x, this.y, this.birthX, this.birthY) < 10) {
			return true;
		} else {
			return false;
		}
	}
let c1 = {
	h: 211,
	s: 19,
	b: 95
};
let c2 = {
	h: 52,
	s: 10,
	b: 62
};
let c3 = {
	h: 47,
	s: 35,
	b: 51
};
let c4 = {
	h: 41,
	s: 45,
	b: 33
};
let c5 = {
	h: 217,
	s: 33,
	b: 25
};
let xSpacing = 30;
let ySpacing = 60;
let px, py;
let colors = [];
function setup() {
	createCanvas(600, 600);
	colorMode(HSB);
	colors.push(c1);
	colors.push(c2);
	colors.push(c3);
	colors.push(c4);
	colors.push(c5);
	console.log(colors);
	
	background(120);
	
	for (let x = 0; x < width; x += xSpacing) {
		fill(colors[floor(random(5))].h,colors[floor(random(5))].s,colors[floor(random(5))].b);
		noStroke();
		px = x;
		py = 0;
		for (let y = 0; y <= height; y += ySpacing) {
					fill(colors[floor(random(5))].h,colors[floor(random(5))].s,colors[floor(random(5))].b);
			triangle(px,py,x+10,y,x-10,y);
			py = y;
		}
	}
}
function draw() {
	
let c1 = {
	h: 211,
	s: 19,
	b: 95
};
let c2 = {
	h: 52,
	s: 10,
	b: 62
};
let c3 = {
	h: 47,
	s: 35,
	b: 51
};
let c4 = {
	h: 41,
	s: 45,
	b: 33
};
let c5 = {
	h: 217,
	s: 33,
	b: 25
};
let start, stop;
let colors = {
	h: 0,
	s: 0,
	b: 0
};
let cIndex = 0;
function setup() {
	createCanvas(600, 600);
	colorMode(HSB);
	colors.h = c1.h;
	colors.s = c1.s;
	colors.b = c1.b;
	start = c1;
	stop = c2;
}
function draw() {
	background(colors.h, colors.s, colors.b);
	if (cIndex >= 1) {
		start = stop;
		cIndex = 0;
		if (stop == c1) {
			stop = c2;
		} else if (stop == c2) {
			stop = c3;
		} else if (stop == c3) {
			stop = c4;
		} else if (stop == c4) {
			stop = c5;
		} else {
			stop = c1;
		}
	}
	colors.h = lerp(start.h, stop.h, cIndex);
	colors.s = lerp(start.s, stop.s, cIndex);
	colors.b = lerp(start.b, stop.b, cIndex);
	cIndex += 0.02;
}
let ball = {
	x: 0,
	y: 0,
	d: 50,
	xspeed: 0,
	yspeed: 0
};
let ball2 = {
	x: 0,
	y: 0,
	d: 50,
	xspeed: 0,
	yspeed: 0
};
function setup() {
	createCanvas(400, 400);
	ball.x = width / 2;
	ball.y = height / 2;
	ball2.x = width / 2;
	ball2.y = height / 2;
	ball.xspeed = random(-5, 5);
	ball.yspeed = random(-5, 5);
	ball2.xspeed = -3;
	ball2.yspeed = 2;
		
	
	
}
function draw() {
	background(220);
	
	ball.x += ball.xspeed;
	ball.y += ball.yspeed;
	ball2.x += ball2.xspeed;
	ball2.y += ball2.yspeed;
	bounce(ball);
	bounce(ball2);
	fill(255, 0, 0,50);
	ellipse(ball.x, ball.y, ball.d, ball.d);
	
	fill(0, 0, 255,50);
	ellipse(ball2.x, ball2.y, ball2.d, ball2.d);
	
}
function bounce(ball) {
	if (ball.x-ball.d/2 < 0 || ball.x+ball.d/2 > width) {
		ball.xspeed *= -1;
	}
	if (ball.y-ball.d/2 < 0 || ball.y+ball.d/2 > height) {
		ball.yspeed *= -1;
	}
}let numCols = 10;
let numRows = 5;
let rectWidth, rectHeight;
let x, y;
let randSq = 50;
function setup() {
	createCanvas(400, 400);
	rectWidth = width / numCols;
	rectHeight = height / numRows;
	rectMode(CORNER);
}
function draw() {
	for (let cn = 0; cn < numCols; cn++) {
		x = cn * rectWidth;
		for (let rn = 0; rn < numRows; rn++) {
			y = rn * rectHeight;
			if (((cn * numRows) + rn) == randSq) {
				fill(0, 0, 255);
			} else {
				fill(200, 200, 200);
			}
			rect(x, y, rectWidth, rectHeight);
		}
	}
}
function mouseClicked() {
	randSq = floor(random(0, 50));
let x, y, px, py, xScale, yScale, precisionFactor, phaseOffset, phaseQty;
let genny = {
	x: 0,
	y: 0,
	size: 50
};
let speed, rOffset, lineLength;
function setup() {
	createCanvas(600, 400);
	background(255);
	xScale = 20;
	yScale = 50;
	precisionFactor = 1;
	phaseOffset = 2 / 3 * PI;
	phaseQty = 3;
	rectMode(CORNERS);
	fill(255);
	lineLength = 50;
	speed = 0.05;
	rOffset = 0;
}
function draw() {
	drawSineWave(50,height/2,500,xScale,yScale,0);
}
	
	
		
	
	
function drawSineWave(startX,centerY,length,xScale, yScale,phaseOffset){
	translate(startX,centerY);	
	
	noFill();
	beginShape();
	
	for (let x = 0; x<length; x++){
		let y = -sin((x / xScale) + phaseOffset) * yScale;
		curveVertex(x,y);
	}
	
	endShape();
}
		let x,y,xspeed,yspeed;
let r,g;
function setup() { 
  createCanvas(400, 400);
	x = width/2;
	y= height/2;
	xspeed =random(-5,5);
	yspeed =random(-5,5);
} 
function draw() { 
  background(220);
	
	
	xspeed = bounce(xspeed,x,50, 0,width);
	yspeed = bounce(yspeed,y,50, 0,height);
	
	x += xspeed;
	y += yspeed;
	
	r = map(x, 0,width, 100,255);
	g = map(y,0,height,100,255);
	fill(r,g, -g);
	ellipse(x,y,50,50);
}
function bounce(speed,x,diam,min,max){
	if (x-diam/2<min || x+diam/2>max){
		speed *=-1;
		
	}
	return speed;
}let rw, rh;
let numCols = 5;
let numRows = 5;
let numZ = 30;
function setup() {
	createCanvas(600, 600);
	rw = width / numCols;
	rh = height / numRows;
}
function draw() {
	background(220);
	for (let cn = 0; cn < numCols; cn++) {
		let x = cn * rw;
		for (let rn = 0; rn < numRows; rn++) {
			let y = rn * rh;
			for (let zn = 0; zn < numZ; zn++) {
					
				strokeWeight(2);
				fill(0,0,30*zn);
				
				rect(x + (zn*5), y + (zn*5), rw, rh);
			}
		}
	}
}let rw, rh;
let numCols = 10;
let numRows = 5;
function setup() { 
  createCanvas(400, 400);
	rw = width/numCols;
	rh = height/numRows;
	
} 
function draw() { 
  background(220);
	for (let cn = 0; cn<numCols; cn++){
		for (let rn=0; rn<numRows; rn++){
			let x = cn * cw;
			let y = rn * rh;
			rect(x,y,rw,rh);
	
}let rw, rh;
let numCols = 10;
let numRows = 5;
function setup() { 
  createCanvas(400, 400);
	rw = width/numCols;
	rh = height/numRows;
	
} 
function draw() { 
  background(220);
	for (let cn = 0; cn<numCols; cn++){
		for (let rn=0; rn<numRows; rn++){
			let x = cn * cw;
			let y = rn * rh;
			rect(x,y,rw,rh);
	
}let rw, rh;
let numCols = 10;
let numRows = 5;
function setup() { 
  createCanvas(400, 400);
	rw = width/numCols;
	rh = height/numRows;
	
} 
function draw() { 
  background(220);
	for (let cn = 0; cn<numCols; cn++){
		for (let rn=0; rn<numRows; rn++){
			let x = cn * cw;
			let y = rn * rh;
			rect(x,y,rw,rh);
	
let pressed = false;
let x = 50;
let y = 70;
let d = 60;
let sliderStart, sliderEnd, theta;
var offsetX = 0;
function setup() {
	createCanvas(600, 300);
	rectMode(CENTER);
	sliderStart = 50;
	sliderEnd = width - 50;
	theta = 270;
}
function draw() {
	if (dragging) {
		background(80, 100, 255, 100);
	} else {
		background(80, 100, 255, 70);
	}
	frameRate(4);
	if (dragging) {
		x = mouseX + offsetX;
		x = constrain(x, sliderStart, sliderEnd);
		y = 120 - 80 * sin(map(x, 0, width, 2.65, 0.5));
	}
	noStroke();
	if (dragging) {
		fill(230, 100, 50);
	} else {
		fill(175);
	}
	ellipse(x, y, d);
	var r = map(x, sliderStart, sliderEnd, 100, 230);
	var g = map(x, sliderStart, sliderEnd, 255, 100);
	var b = map(x, sliderStart, sliderEnd, 0, 50);
	fill(r, g, b);
	if (!dragging) {
		r = r * random(0.7, 1.3);
		g = g * random(0.7, 1.3);
		b = b * random(0.7, 1.3);
	}
	for (i = 0; i < width; i += 80) {
		push();
		translate(i - 120, 80);
		fill(r, g, b);
		scale(random(0.5, 0.8), random(0.5, 0.8));
		leaf();
		pop();
	}
	fill(0);
	textSize(15);
	rectMode(CORNERS);
	rect(0, height - 50, width, height);
	fill(200);
	text("Spring 春", 50, height - 20);
	text("Summer 夏", width / 2 - 30, height - 20);
	text("Fall 秋", width - 80, height - 20);
}
function leaf() {
	noStroke();
	beginShape();
	triangle(width / 2, height / 4, 5 * width / 11, height / 2, 6 * width / 11, height / 2);
	triangle(width / 2 - 50, height / 4 + 35, 5 * width / 11 - 10, height / 2 + 30, 6 * width / 11 + 10, height / 2 + 30);
	triangle(width / 2 + 50, height / 4 + 35, 5 * width / 11 - 10, height / 2 + 30, 6 * width / 11 + 10, height / 2 + 30);
	triangle(width / 2, 2 * height / 3, 5 * width / 11 - 10, height / 2 + 30, 6 * width / 11 + 10, height / 2 + 30);
	rectMode(CENTER);
	rect(width / 2, 2 * height / 3, 3, 100);
	endShape();
}
function mousePressed() {
	pressed = true;
	if (mouseX > x - d / 2 && mouseX < x + d / 2 && mouseY > y - d / 2 && mouseY < y + d / 2) {
		dragging = true;
		offsetX = x - mouseX;
	}
}
function mouseReleased() {
	dragging = false;
let x, y, px, py, xScale, yScale, precisionFactor, phaseOffset, phaseQty;
let genny = {
	x: 0,
	y: 0,
	size: 50
};
let speed, rOffset, lineLength;
function setup() {
	createCanvas(600, 400);
	background(255);
	xScale = 30;
	yScale = 50;
	precisionFactor = 1;
	phaseOffset = 2 / 3 * PI;
	phaseQty = 3;
	rectMode(CORNERS);
	fill(255);
	lineLength = 50;
	speed = 0.05;
	rOffset = 0;
}
function draw() {
	background(255);
	push();
	translate(width / 4, height / 2);
	for (let j = 0; j < phaseQty; j++) {
		px = 0;
		py = -sin(j * phaseOffset - rOffset) * yScale;
		for (let i = 0; i < width; i += 1 / precisionFactor) {
			x = i;
			y = -sin((x / xScale) + (j * phaseOffset) - rOffset) * yScale;
			if (j == 0) {
				stroke(255, 0, 0);
			}
			if (j == 1) {
				stroke(0, 0, 0);
			}
			if (j == 2) {
				stroke(0, 0, 255);
			}
			strokeWeight(2);
			line(x, y, px, py);
			px = x;
			py = y;
		}
	}
	pop();
	push();
	
	translate(width / 4 - lineLength, height / 2);
		
	ellipse(0, 0, lineLength * 2, lineLength * 2);
	rotate(rOffset - 1.5);
	strokeWeight(4);
	
	push();
	stroke(255, 0, 0);
	line(0, 0, 0, lineLength);
	pop();
	push();
	rotate(2 / 3 * PI);
	stroke(0, 0, 255);
	line(0, 0, 0, lineLength);
	pop();
	push();
	rotate(2 * 2 / 3 * PI);
	stroke(0, 0, 0);
	line(0, 0, 0, lineLength);
	pop();
	pop();
	rOffset += speed;
	stroke(0);
	line(0, height / 2, width, height / 2);
	
	line(width/4,0,width/4,height);
}
function mousePressed(){
	phaseQty++;
	if (phaseQty > 3){
		phaseQty = 0;
	}
let x, y, px, py, xScale, yScale, precisionFactor, phaseOffset, phaseQty;
let genny = {
	x: 0,
	y: 0,
	size: 50
};
let speed, rOffset, lineLength;
function setup() {
	createCanvas(600, 400);
	background(255);
	xScale = 30;
	yScale = 50;
	precisionFactor = 1;
	phaseOffset = 2 / 3 * PI;
	phaseQty = 3;
	rectMode(CORNERS);
	fill(255);
	lineLength = 50;
	speed = 0.05;
	rOffset = 0;
}
function draw() {
	background(255);
	push();
	translate(width / 4, height / 2);
	for (let j = 0; j < phaseQty; j++) {
		px = 0;
		py = -sin(j * phaseOffset - rOffset) * yScale;
		for (let i = 0; i < width; i += 1 / precisionFactor) {
			x = i;
			y = -sin((x / xScale) + (j * phaseOffset) - rOffset) * yScale;
			if (j == 0) {
				stroke(255, 0, 0);
			}
			if (j == 1) {
				stroke(0, 0, 0);
			}
			if (j == 2) {
				stroke(0, 0, 255);
			}
			strokeWeight(2);
			line(x, y, px, py);
			px = x;
			py = y;
		}
	}
	pop();
	push();
	
	translate(width / 4 - lineLength, height / 2);
		
	ellipse(0, 0, lineLength * 2, lineLength * 2);
	rotate(rOffset - 1.5);
	strokeWeight(4);
	
	push();
	stroke(255, 0, 0);
	line(0, 0, 0, lineLength);
	pop();
	push();
	rotate(2 / 3 * PI);
	stroke(0, 0, 255);
	line(0, 0, 0, lineLength);
	pop();
	push();
	rotate(2 * 2 / 3 * PI);
	stroke(0, 0, 0);
	line(0, 0, 0, lineLength);
	pop();
	pop();
	rOffset += speed;
	stroke(0);
	line(0, height / 2, width, height / 2);
	
	line(width/4,0,width/4,height);
}
function mousePressed(){
	phaseQty++;
	if (phaseQty > 3){
		phaseQty = 0;
	}
let x, y, px, py, xScale, yScale, precisionFactor, phaseOffset, phaseQty;
let genny = {x:0,y:0,size:50};
function setup() {
	createCanvas(600, 400);
	background(255);
	xScale = 40;
	yScale = 50;
	precisionFactor = 1;
	
	phaseOffset = 2/3*PI;
	phaseQty = 3;
	rectMode(CORNERS);
	fill(255);
	
}
function draw() {
	background(255);
	
	for (let j = 0; j < phaseQty; j++) {
		px = 0;
		py = -sin(j * phaseOffset) * yScale + (height/2);
		
		for (let i = 0; i < width; i += 1 / precisionFactor) {
			x = i;
			y = -sin((x / xScale) + (j * phaseOffset)) * yScale + (height / 2);
			
			
			
			if (j==0){stroke(255,0,0);}
			if (j==1){stroke(0,255,0);}
			if (j==2){stroke(0,0,255);}
			line(x, y, px, py);
			px = x;
			py = y;
		}
	}
	
	
	push();
	translate(width/2,height/2);
	ellipse(genny.x,genny.y,genny.size,genny.size);
	line(genny.x,genny.y,50,50);
	rotate(5);
	pop();
	
	stroke(0);
	line(0, height / 2, width, height / 2);
let x, y, px, py, xScale, yScale, precisionFactor, phaseOffset, phaseQty, xIndex;
function setup() {
	createCanvas(600, 400);
	background(255);
	xScale = 40;
	yScale = 50;
	precisionFactor = 1;
	
	phaseOffset = 2/3*PI;
	phaseQty = 3;
	rectMode(CORNERS);
	fill(255);
	xIndex=0;
}
function draw() {
	background(255);
	
	for (let j = 0; j < phaseQty; j++) {
		px = 0;
		py = -sin(j * phaseOffset) * yScale + (height/2);
		
		for (let i = 0; i < width; i += 1 / precisionFactor) {
			x = i;
			y = -sin((x / xScale) + (j * phaseOffset)) * yScale + (height / 2);
			
			
			
			if (j==0){stroke(255,0,0);}
			if (j==1){stroke(0,255,0);}
			if (j==2){stroke(0,0,255);}
			line(x, y, px, py);
			px = x;
			py = y;
		}
	}
	
	
	xIndex++;
	if (xIndex>width){xIndex==0;}
	rect(xIndex,0,width,height);
	
	stroke(0);
	line(0, height / 2, width, height / 2);
}let col = {r:0,g:0,b:0};
function setup() {
    createCanvas(400, 400);
    noStroke();
}
function draw() {
	stroke(255,0,255);
    background(0);
    for (let i = 0; i < 10; i++) {
       for (let q = 0; q<10; q++) {
				 fill(random(100,255),random(100,255),random(100,255));
				 rect(i*width/10,q*height/10,width/10,height/10);
			 }
		}
	
}let col = {r:0,g:0,b:0};
function setup() {
    createCanvas(400, 400);
    noStroke();
}
function draw() {
	stroke(255,0,255);
    background(220);
    for (let i = 0; i < 10; i++) {
        if (mouseX >= i * width / 10 && mouseX < (i + 1)*width / 10){
        	col.r = map(i,0,9,50,255);
					col.b = map(i,0,9,255,50);
					fill(col.r,col.g,col.b);
        } else {
					fill(255);
				}
			
        rect(i * 1 / 10 * width, 0, width / 10, height);
    }
}function setup() {
    createCanvas(400, 400);
    noStroke();
}
function draw() {
	stroke(255,0,255);
    background(220);
    for (let i = 0; i < 10; i++) {
        if (mouseX >= i * width / 10 && mouseX < (i + 1) * width / 10 && i%2==0)  {
            fill(0, 0, 255);
        } else if(mouseX >= i * width / 10 && mouseX < (i + 1) * width / 10){
          fill(255,0,0);
        } else {
					fill(255);
				}
			
        rect(i * 1 / 10 * width, 0, width / 10, height);
    }
}function setup() {
    createCanvas(400, 400);
    noStroke();
}
function draw() {
	stroke(255,0,255);
    background(220);
    for (let i = 0; i < 10; i++) {
        if (mouseX >= i * width / 10 && mouseX < (i + 1) * width / 10 && i<5 && i!=6)  {
            fill(0, 0, 255);
        } else if(mouseX >= i * width / 10 && mouseX < (i + 1) * width / 10 && i>=5 && i!= 6){
          fill(255,0,0);
        } else {
            fill(255);
        }
        rect(i * 1 / 10 * width, 0, width / 10, height);
    }
let x, y, px, py, xScale, yScale, precisionFactor;
let circ = {
	x: 0,
	y: 0,
	diam: 2,
	speed: 2
};
function setup() {
	createCanvas(600, 400);
	background(255);
	xScale = 50;
	yScale = 20;
	precisionFactor = 1;
	rectMode(CORNERS);
	fill(255);
}
function draw() {
	background(255);
	
	for (let j = 0; j < 2; j++) {
		px = 0;
		py = 0;
		for (let i = 0; i < width; i += 1 / precisionFactor) {
			x = i;
			y = cos(x / yScale + (j * HALF_PI)) * xScale + (height / 2);
			line(x, y, px, py);
			px = x;
			py = y;
		}
	}
	stroke(0);
	line(0, height / 2, width, height / 2);
}function setup() {
    createCanvas(400, 400);
    noStroke();
}
function draw() {
	stroke(255,0,255);
    background(220);
    for (let i = 0; i < 10; i++) {
        if (mouseX >= i * width / 10 && mouseX < (i + 1) * width / 10 && i<5)  {
            fill(0, 0, 255);
        } else if(mouseX >= i * width / 10 && mouseX < (i + 1) * width / 10 && i>=5){
          fill(255,0,0);
        } else {
            fill(255);
        }
        rect(i * 1 / 10 * width, 0, width / 10, height);
    }
}function setup() {
    createCanvas(600, 400);
}
function draw() {
    background(220);
    fill(255, 0, 0);
    noStroke();
    if (mouseX > width / 3 * 2) {
        rect(width / 3 * 2, 0, width / 3, height);
    } else if (mouseX > width / 3) {
        rect(width / 3, 0, width / 3, height);
    } else if (mouseX > 0 && mouseX < width / 3) {
        rect(0, 0, width / 3, height);
    }
}let tangle = {x:200, y: 200, w: 100, h:100};
let deltaX=0;
let deltaY=0;
function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  
  rectMode(CENTER);
  
  
  deltaX = mouseX-tangle.x;
  deltaY = mouseY - tangle.y;
  
  tangle.x += deltaX*0.02;
  tangle.y += deltaY*0.02;
  
  rect(tangle.x,tangle.y,tangle.w,tangle.h);
	
}let circle = {x:0,y:0,diam:50};
let deltaX = 0;
let deltaY = 0;
function setup() { 
  createCanvas(400,430);
  circle.x = width/2;
  circle.y = height/2;
} 
function draw() { 
  background(220,10,50);
  fill(0,50,255);
  ellipse(circle.x + deltaX,circle.y + deltaY,circle.diam,circle.diam);
  
  
  
  
  
  
  
  if (frameCount<200) {
    deltaX ++;
    deltaY --;
  }
  
  if (frameCount > 200 && frameCount < 600) {
    deltaX --;
    deltaY ++;
  }
  
  if (frameCount > 600 && frameCount < 1000) {
    deltaY --;
  }
  
  if (frameCount > 1000 && frameCount < 1400) {
    deltaX ++;
    deltaY ++;
  }
  
  if (frameCount > 1400 && deltaX > 0) {
    deltaX --;
  }
  if (frameCount > 1400 && deltaX<0) {
    deltaX ++;
  }
  if (frameCount > 1400 && deltaY >0) {
    deltaY --;
  }
  if (frameCount > 1400 && deltaY <0) {
    deltaY ++;
  }
let balloonsize=0;
let circle = {x:0,y:0,diam:50};
let colR=0;
let colB=0;
let multiplier=0;
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(random(0,255),random(0,255),random(0,255));
  multiplier=random(0,1);
}
function draw() {
  
  colR = map(mouseX,0,width,100,255)*multiplier;
  colB = map(mouseY,0,height,255,100)*multiplier;
  
  fill(colR,100,colB,65);
  
  
  
  if (mouseIsPressed) {
    balloonsize+= 5;
    ellipse(mouseX,mouseY,balloonsize,balloonsize);
  }
  
}
function mouseReleased() {
  balloonsize = 0;
}
let circX,circY;
function setup() { 
  createCanvas(windowWidth, windowHeight);
  circX=width;
  circY=height/2;
  
} 
function draw() { 
  background(0);
  
  let speed = dist(circX,circY,width/2,height/2);
  
  ellipse(circX,circY, 50,50);
  ellipse(circX+50,circY,50,50);
  ellipse(circX+100,circY,50,50);
  ellipse(circX+150,circY,50,50);
  
  
  circX-= speed/20;
  if (circX<0){
    circX= windowWidth;
  }
  
  
}let x1, y1, x2, y2;
function setup() { 
  createCanvas(600, 400);
  background(220);
  x1 = width/4;
  y1 = height/4;
  x2 = width*3/4;
  y2 = height*3/4;
  rectMode(CENTER);
} 
function draw() {
  strokeWeight(2);
  line(x1,y1,x2,y1);
  line(x2,y1,x2,y2);
  line(x2,y2,x1,y2);
  line(x1,y2,x1,y1);
  
}function setup() { 
  createCanvas(windowWidth, windowHeight);
} 
function draw() { 
  let speed = dist(mouseX,mouseY,pmouseX,pmouseY);
  
  let sw = map(speed,0,300,0,50);
  
  strokeWeight(sw);
  
  line(mouseX,mouseY,pmouseX,pmouseY);
}
function mousePressed(){
  background(200,200,0);
}function setup() { 
  createCanvas(windowWidth, windowHeight);
  x=width/2;
  y=height/2;
} 
function draw() { 
  background(255,255,0);
  rectMode(CENTER);
  rect(x,y,x,y);
}function setup() { 
  createCanvas(700, 200);
} 
function draw() { 
  background(255,235,0);
  
  strokeWeight(5);
  stroke(0);
  
  fill(0,0,255);
  triangle(0,0,350,200,700,0);
  
  fill(255,0,0);
  triangle(100,0,350,200,600,0);
  
  fill(255,255,150);
  triangle(200,0,350,200,500,0);
  
  fill(0,255,255);
  
  strokeWeight(1);
  curve(0,-1000,0,0,350,200,700,0);
  curve(700,-1000,700,0,350,200,0,0);
  
  fill(0);
  stroke(255,255,255);
  ellipse(200,150,25,15);
  ellipse(500,150,25,15);
  
}function setup() { 
  createCanvas(600, 400);
} 
function draw() { 
  background(100,255,255);
  
  fill(255,0,0);
  noStroke();
  
  quad(-10,10,10,-10,610,390,590,410);
  
  fill(50,200,80);
  
  ellipse(300,200,300,200);
  
  fill(50,50,200);
  
  rect(400,175,50,50);
  
}function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
	fill(60, 220, 195);
	ellipse(200, 200, 100, 100);
}
function setup() { 
  createCanvas(80,800);
} 
function draw() { 
  background(220);
}