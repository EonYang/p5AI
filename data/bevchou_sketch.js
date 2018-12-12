function setup() {
  createCanvas(400, 400);
	stroke(2);
}

function draw() {
	background(220);
	push();
	noFill();
	translate(20, 50);
	makeLine();
	pop();
	noLoop();
}

function makeLine() {
	let amplitude = [];
	let theta = [];
	let totalTime=0;
	
	beginShape();
	for (let i = 0; i < int(random(10, 20)); i++) {
		amplitude.push(random(1, 20));
		theta.push(random(0, 2*PI));
	}
	beginShape();
	for (let i=0; i < theta.length; i++) {
		console.log(i);
		let time = int(random(1,20));
		totalTime = totalTime + time;
		for (let j = 0; j < time; j += 4){
			curveVertex(totalTime+j, amplitude[i]*sin(theta[i]));
		}
	}
	endShape();	
}

function mousePressed() {
  draw();
}function setup() { 
  createCanvas(400, 400);
   video = createCapture(VIDEO);
} 

function draw() { 
  background(220);
}function setup() { 
  createCanvas(400, 400);
  createCapture(VIDEO):
} 

function draw() { 
  background(220);
}//GLOBAL VARIABLES
//webcam
let video;
let vidWidth = 600;
let vidHeight = 450;
//clm trackr
let facepos;
let ctracker;
let faceX, faceY, faceW, faceH;
//flickr API data
let flickrData;
let photoURL;
let photoArray = [];
let numImgPerQuery = 3;
//save snapshot
let button;
let saveimg_index = 0;

function setup() {
  //get webcam
  video = createCapture(VIDEO);
  video.id('webcam');
  video.size(vidWidth, vidHeight)
  video.volume(0);
  video.hide();
  //canvas overlay on video
  canvas = createCanvas(vidWidth, vidHeight);
  canvas.id('canvas');
  pixelDensity(1);
  //DOM elements
  inputSetup();
  button = createButton('save!');
  button.position(windowWidth / 2 + 320, 450);
  button.mousePressed(takeSnap);
  //initilize face tracker
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(video.elt);
}

//????? https://stackoverflow.com/questions/20424279/canvas-todataurl-securityerror
function takeSnap() {
  let filename = 'selfportrait' + saveimg_index;
  saveCanvas(canvas, filename, 'png');
  saveimg_index++;
}

//flickr loadJSON callback
function getPhotos(photoData) {
  flickrData = photoData;
  //once data loads
  if (flickrData) {
    for (let i = 0; i < numImgPerQuery; i++) {
      let farmid = flickrData.photos.photo[i].farm;
      let serverid = flickrData.photos.photo[i].server;
      let id = flickrData.photos.photo[i].id;
      let secret = flickrData.photos.photo[i].secret;
      //create photo url
      photoURL = 'https://farm' + farmid + '.staticflickr.com/' + serverid + '/' + id + '_' + secret + '_s.jpg';
      //and create an array of img elements
      photoArray.push(createImg(photoURL));
      for (let i = 0; i < photoArray.length; i++) {
        //hide DOM element images
        photoArray[i].hide();
      }
    }
  }
}


function draw() {
  // clear();
  image(video, 0, 0, vidWidth, vidHeight);
  faceTracking();
  fill(200, 0, 150, 100);
  // rect(faceX, faceY, faceW, faceH);


  //name input on canvas
  textSize(faceW / 5);
  text(newName, faceX - faceW * 0.2, faceY - 50);
  //input dropdowns
  push();
  textSize(40);
  //what do you like
  nounInput.changed(updateNoun);
  //describe yourself
  adjInput.changed(updateAdj);
  pop();



  //how to get DOM elements on top of canvas
  //https://github.com/processing/p5.js/issues/561
  //show photos
  for (let i = 0; i < photoArray.length; i++) {
    let y = 0;
    push();
    // scale(.7);
    // rotate(PI / 4);
    image(photoArray[i], 75 * i, y);
    pop();
  }

}


function faceTracking() {
  //get face points
  facepos = ctracker.getCurrentPosition();
  for (j = 0; j < facepos.length; j++) {
    // ellipse(facepos[j][0], facepos[j][1], 5);
    //bounding box of face
    faceW = facepos[13][0] - facepos[1][0];
    faceH = (facepos[7][1] - facepos[16][1]) * 1.25;
    faceX = facepos[1][0];
    faceY = facepos[21][1] - faceH * .25;
  }
}
var mic, fft;
let counter = 0;
let back_count = 0;
let back;
let pos, pos_old;

function preload() {
  back = loadImage('background.png');
}

function setup() {
  createCanvas(710, 400);
  background(back);
  //microphone
  mic = new p5.AudioIn();
  mic.start();
  //FFT
  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  counter++;
  back_count ++

  fill(random(255), random(255), random(255), 20);
  stroke(random(255), random(255), random(255), 20);
  strokeWeight(random(100));

  var spectrum = fft.analyze();
  // if (){
  //   background(back, 1);
  //   back_count =0;
  // }

  if (counter == 5) {
    //draw sound waves
    // beginShape();
    // for (i = 0; i < spectrum.length; i++) {
    //   vertex(i, map(spectrum[i], 0, 255, height, 0));
    // }
    // endShape();

    //draw ellipse
    ellipse(350, 200, map(spectrum.length, 0, 255, 0, 100));

    //draw

      //pos = map(spectrum.length, 0, 255, 0, width);
for (i = 0; i < spectrum.length; i++){
      pos = map(spectrum[i], 0, 255, 0, width);
      pos_old = pos;
      if (spectrum[i] > 200){
        background(back, 1);
      }
      //stroke(200, 20);
      //line(pos, random(pos), random(pos_old), pos_old);
    }



    counter = 0;
  }
}

function mousePressed() {

}
// Declare a "SerialPort" object
let serial;
let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodemFD121");
  serial.on('data', gotData);

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
  fill(0, 0, 0);
  //var mappedVar = map(latestData, 490,540,0,width);
  var mappedVar = map(latestData, 300, 400, 0, width);
  ellipse(mappedVar, 100, 50, 50);
  text(latestData, 10, 10);
}let a = 4;
let b = 7;

function setup() {
	createCanvas(400, 400);
}

function draw() {
	background(220);
	let sum = addNumbers(a, b);
  	console.log(a + " + " + b + " = " + sum);
}

// function addNumbers(a, b) {
// 	let output = a + b;
// 	string = a + " + " + b + " = " + output;
// 	console.log(string);
// 	return string;
// }

function addNumbers(a, b) {
	return a + b;
}//I have 7 of each type of gif
let numGif = 7;
//arrays for image file paths
let catGif = [];
let catDogGif = [];
let dogGif = [];
//keep track of gifs
let currentGif; //the file path
let image; //the actual image


function setup() {
  noCanvas();
  //arrays of image file paths
  for (let i = 0; i < numGif; i++) {
    catGif.push("/cat-gifs/cat" + i + ".gif");
    catDogGif.push("/cat-dog-gifs/catdog" + i + ".gif");
    dogGif.push("/dog-gifs/dog" + i + ".gif");
  }
  //make slider
  slider = createSlider(0, 100, 20);
  slider.size(300);
  slider.parent('#slider');
  //make button
  button = createButton('GO!');
  button.size(50, 50);
  button.parent('#button');
  //starter image
  image = createImg("welcome.gif");
  image.class('gif');
  //remove and then show new gif
  button.mousePressed(removeGif);
  button.mouseReleased(showGif);
}

function draw() {
  //pick gifs based on slider position
  sliderValue = slider.value();
  currentGif = pickGif(sliderValue);
}

function showGif() {
  image = createImg(currentGif);
  image.class('gif');
}

function removeGif() {
  a = selectAll('.gif');
  for (let i = 0; i < a.length; i++) {
    a[i].remove();
  }
}

//function that changes the gif based on slider value
function pickGif() {
  let newGif;
  let gifIndex = floor(random(0, numGif));
  if (sliderValue >= 0 && sliderValue < 33) {
    newGif = catGif[gifIndex];
  } else if (sliderValue >= 33 && sliderValue < 66) {
    newGif = catDogGif[gifIndex];
  } else if (sliderValue >= 66 && sliderValue <= 100) {
    newGif = dogGif[gifIndex];
  }
  return newGif;
}
function setup() {
	noCanvas();
	document.getElementById("catpic").animate([
		//keyframes
		{
			transform: 'translateY(20px)'
		},
		{
			transform: 'translateY(-100px)'
		}
	], {
		//timing optsions
		duration: 2000,
		iterations: Infinity
	});
}

function draw() {}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(255);
}let ball = [];
let numBalls;

function setup() {
	createCanvas(400, 400);
	numBalls = 50;
	for (let i = 0; i < numBalls; i++) {
		ball.push(new Ball(random(width), random(height), random(-5, 5), random(-5, 5)));
	}
}

function draw() {
	background(220);
	//if balls touch, then both are deleted
	for (let i = 0; i < ball.length; i++) {
		ball[i].run();
		for (let j = i + 1; j < ball.length; j++) {
			if (ball[i].isNear(ball[j])) {
				ball.splice(i, 1);
				ball.splice(j-1, 1);
			  //exit loop after deleting so it doesn't check empty spots
			  	break;
			}
		}
	}
}//arrays
let paragraph = [];
let words = [];
let allWaves;
let waves = [];
//fonts
let Arial;
let fontsize = 20;
//text boxes
let textboxA = {
  rectx: 50,
  recty: 50,
  rectwidth: 100,
  rectheight: 150
}
let textboxB = {
  rectx: 200,
  recty: 50,
  rectwidth: 100,
  rectheight: 150
}
let textboxC = {
  rectx: 50,
  recty: 50,
  rectwidth: 250,
  rectheight: 350
}


function preload() {
  Arial = loadFont('fonts/Arial Bold.ttf');
  paragraph = loadStrings('waves.txt');
}

function setup() {
  createCanvas(350, 500);
  //turn text file int an array of words
  allWaves = new TextToArray(paragraph);
  words = allWaves.makeWordArray();
  //array of objects of a word, x, y, xspeed, yspeed
  for (let i = 0; i < words.length; i++) {
    waves.push(new manipulateText(words[i], 0, 0, 1, 1));
  }
}

function draw() {
  //appearance
  background(0);
  fill(255);
  textSize(fontsize);
  //textbox A scroll
  drawScroll(0, 5, textboxA, .5);
  //textbox B scroll
  drawScroll(6, 11, textboxB, .5);
  //all across tilt
  drawTilt(12, 13, 200);
  //textbox C scroll
  drawScroll(14, 23, textboxC, 1);
  //all across tilt
  drawTilt(24, 26, 400);
}



function drawScroll(startindex, endindex, textbox, speed) {
  push();
  for (i = startindex; i <= endindex; i++) {
    waves[i].scroll(textbox, speed);
    translate(0, fontsize);
  }
  pop();
  waves[0].boundVert(textbox);
}

function drawTilt(startindex, endindex, ypos) {
  let count = 0;
  for (i = startindex; i <= endindex; i++) {
    count++;
    waves[i].tilt(ypos + fontsize * count);
  }
}//arrays
let paragraph = [];
let words = [];
let allWaves;
let waves = [];



function preload() {
	paragraph = loadStrings('waves.txt');
}

function setup() {
	createCanvas(350, 500);
	console.log(width);


  console.log(words);
}

function draw() {
	background(0);
	fill(255);
	ellipse(100, 100, 200);
}//arrays
let paragraph = [];
let words = [];
let allWaves;
let waves = [];
//fonts
let Arial;
let fontsize = 20;
//text boxes
let textboxA = {
	rectx: 50,
	recty: 50,
	rectwidth: 100,
	rectheight: 150
}
let textboxB = {
	rectx: 200,
	recty: 50,
	rectwidth: 100,
	rectheight: 150
}
let textboxC = {
	rectx: 50,
	recty: 50,
	rectwidth: 250,
	rectheight: 350
}

function preload() {
	Arial = loadFont('fonts/Arial Bold.ttf');
	paragraph = loadStrings('waves.txt');
}

function setup() {
	createCanvas(350, 500);
  console.log(width);
	//turn text file int an array of words
	allWaves = new TextToArray(paragraph);
	words = allWaves.makeWordArray();
	//array of objects of a word, x, y, xspeed, yspeed
	for (let i = 0; i < words.length; i++) {
		waves.push(new manipulateText(words[i], 0, 0, 1, 1));
	}
}

function draw() {
	background(0);
	fill(255);
	textSize(fontsize);
	drawScroll(0, 5, textboxA, 0.5);
	drawScroll(6, 11, textboxB, 0.5);
	drawTilt(12, 13, 200);
	drawScroll(14, 23, textboxC, 1);
	drawTilt(24, 26, 400);
	ellipse(100,100, 200);
}



function drawScroll(startindex, endindex, textbox, speed) {
	push();
	for (i = startindex; i <= endindex; i++) {
		waves[i].scroll(textbox, speed);
		translate(0, fontsize);
	}
	pop();
	waves[0].boundVert(textbox);
}

function drawTilt(startindex, endindex, ypos) {
	let count = 0;
	for (i = startindex; i <= endindex; i++) {
		count++;
		waves[i].tilt(ypos + fontsize * count);
	}
}//to run on local computer see: https://stackoverflow.com/questions/27742070/angularjs-error-cross-origin-requests-are-only-supported-for-protocol-schemes/27743373

let word = "HELLO";
let letter = [];
let y = 100;
let yspeed = 1;
let angle;
let Arial;

function preload() {
	Arial = loadFont('fonts/Arial Bold.ttf');
}

function setup() {
	createCanvas(400, 300);
	letter = split(word, '');
	console.log(letter);
	angle = PI / 7;
}


function draw() {
	background(0);

	//y += yspeed;
	if (y > height || y < 0) {
		yspeed *= -1;
	}
  
	push();
	textFont(Arial);
	fill(255);
  	textSize(30);

  
  //what I want the tilt function to do
	angle += PI / 1000;
	console.log(angle);
	if (angle > PI / 6 || angle < -PI / 6) {
		angle *= -1;
	}
	shearX(angle);

	for (let i = 0; i < letter.length; i++) {
		text(letter[i], ((width - 15) / (letter.length - 1)) * i, y);
	}
	pop();




}let ball = [];
let numBalls;

function setup() {
	createCanvas(400, 400);
	numBalls = 100;
	for (let i = 0; i < numBalls; i++) {
		ball.push(new Ball(random(width), random(height), random(-5, 5), random(-5, 5)));
	}
}

function draw() {
	background(220);
	//if balls touch, then both are deleted
	for (let i = 0; i < ball.length; i++) {
		for (let j = i + 1; j < ball.length; j++) {
			if(ball[i].isNear(ball[j])) {
				ball.splice(i, 1);
				ball.splice(j - 1, 1);
				console.log(ball.length);
			}
		}
	}
	//run ball function
	for (let i = 0; i < ball.length; i++){
		if (ball.length > 0){
			ball[i].run();
		}
	}
}
let ball = [];
let numBalls;

function setup() {
	createCanvas(400, 400);
	numBalls = 20;
	for (let i = 0; i < numBalls; i++) {
		ball.push(new Ball(random(width), random(height), random(-5, 5), random(-5, 5)));
	}
}

function draw() {
	background(220);
	for (let i = 0; i < ball.length; i++) {
		for (let j = i + 1; j < ball.length; j++) {
			if (ball[i].isNear(ball[j])) {
				ball[i].turnRed();
				ball[j].turnRed();
			}
		}
	}
	for (let i=0; i < ball.length; i++){
	  ball[i].run();
	}
}let ball = [];
let numBalls;

function setup() {
	createCanvas(400, 400);
	numBalls = 20;
	for (let i = 0; i < numBalls; i++) {
		ball.push(new Ball(random(width), random(height), random(-5, 5), random(-5, 5)));
	}
}

function draw() {
	background(220);
	for (let i = 0; i < ball.length; i++) {
		for (let j = 0; j < ball.length; j++) {
			if (ball[i].isNear(ball[j]) && ball[i] != ball[j]) {
				ball[i].turnRed();
				ball[j].turnRed();
			}
		}
		ball[i].run();
	}
}let positions = [];

function setup() {
	createCanvas(400, 400);
}

function draw() {
	background(220);

	positions.push({
		x: mouseX,
		y: mouseY
	});

	if (positions.length > 50) {
		positions.shift();
	}

	//store the mouse position for every frame of animation
	for (let i = 0; i < positions.length; i++) {
		let x = positions[i].x;
		let y = positions[i].y;
		ellipse(x, y, 50, 50);
	}
}let ball;

function setup() { 
  createCanvas(400, 400);
  ball1 = new Ball(width/2, height/2, 3, 2);
  ball2 = new Ball(random(width), random(height), 1, 4);
} 

function draw() { 
  background(220);
  ball1.run();
  ball2.run();
}var x1, y1, xspeed1, yspeed1;
var x2, y2, xspeed2, yspeed2;

function setup() {
	createCanvas(400, 400);
	x1 = width / 2;
	y1 = height / 2;
	xspeed1 = 1;
	yspeed1 = 3;
	x2 = width / 2;
	y2 = height / 4;
	xspeed2 = 2;
	yspeed2 = 1;
}

function draw() {
	background(220);
	update(x1, y1, xspeed1, yspeed1);
  	update(x2, y2, xspeed2, yspeed2);
	display(x1, y1);
	display(x2, y2);
}

function display(x, y) {
	ellipse(x, y, 50, 50);
}

function update(x, y, xspeed, yspeed) {
	xspeed = bounce(x, xspeed, 0, width);
	yspeed = bounce(y, yspeed, 0, height);
	x = moveBall(x, xspeed);
	y = moveBall(y, yspeed);
}

function bounce(pos, speed, min, max) {
	if (pos < min || pos > max) {
		speed *= -1;
	}
	return speed;
}


function moveBall(pos, speed) {
	pos += speed;
	return pos;
}var x1, y1, xspeed1, yspeed1;
var x2, y2, xspeed2, yspeed2;

function setup() {
	createCanvas(400, 400);
	x1 = width / 2;
	y1 = height / 2;
	xspeed1 = 1;
	yspeed1 = 3;
	x2 = width / 2;
	y2 = height / 4;
	xspeed2 = 2;
	yspeed2 = 1;
}

function draw() {
	background(220);
	update(x1, y1, xspeed1, yspeed1);
  	update(x2, y2, xspeed2, yspeed2);
	display(x1, y1);
	display(x2, y2);
}

function display(x, y) {
	ellipse(x, y, 50, 50);
}

function update(x, y, xspeed, yspeed) {
	xspeed = bounce(x, xspeed, 0, width);
	yspeed = bounce(y, yspeed, 0, height);
	x = moveBall(x, xspeed);
	y = moveBall(y, yspeed);
}

function bounce(pos, speed, min, max) {
	if (pos < min || pos > max) {
		speed *= -1;
	}
	return speed;
}


function moveBall(pos, speed) {
	pos += speed;
	return pos;
}let numLayers, layerHeight;
let startCol, endCol, colIncr;

let fish1x, fish2x, fish3x;
let bub1y, bub2y, bub3y, bub4y;

let theta;


function setup() {
	createCanvas(400, 600);
	//water
	numLayers = 50;
	layerHeight = height/numLayers;
	startCol = color(177, 233, 239);
	endCol = color(26, 33, 68);
	colIncr = 1/numLayers;
	//fish
	fish1x =  width*0.1;
	fish2x = width*0.7;
	fish3x = width*0.3;
	//bubbles
	bub1y = height*0.9;
	bub2y = height*0.7;
	bub3y = height*0.5;
	bub4y = height*0.4;
	//angle
	theta = 0;
	//jellyfishes
	jelly1y = height*0.3;
	jelly2y = height*0.8;
}

function draw() {
	background(0);
	noStroke();
	//draw water - each rect get darker as height increases
	for (let i = 0; i < numLayers; i++){
		let waterCol = lerpColor(startCol, endCol, colIncr*i);
		fill(waterCol);
		rect(0, layerHeight*i, width, layerHeight);
	}

	fish(fish1x, height*0.3, .5, color(232, 123, 111));
	fish1x = moveLoopX(fish1x, 2);

	fish(fish2x, height*0.7, 0.8, color(219, 142, 0));
	fish2x = moveLoopX(fish2x, 1);

	jellyfish(width*0.8, jelly1y, 1, color(214, 122, 226, 200));
	jelly1y = moveLoopY(jelly1y, -0.25);

	fish(fish3x, height*0.9, 1.2, color(193, 52, 87))
	fish3x = moveLoopX(fish3x, .5);

	bubble(width*0.1, bub1y, 40);
	bub1y = moveLoopY(bub1y, -1);

	bubble(width*0.7, bub2y, 30);
	bub2y = moveLoopY(bub2y, -0.5);

	jellyfish(width*0.2, jelly2y, .5, color(137, 113, 232, 200));
	jelly2y = moveLoopY(jelly2y, -0.5);

	bubble(width*0.4, bub3y, 50);
	bub3y = moveLoopY(bub3y, -1.5);

	bubble(width*0.9, bub4y, 40);
	bub4y = moveLoopY(bub4y, -1);

}

function fish(fishX, fishY, fishSize, fishCol) {
	push();
	fill(fishCol);
	translate(fishX, fishY);
	scale(fishSize);
	triangle(0, 0, -35, -20, -35, 20);
	ellipse(20, 0, 80, 40);
	fill(0);
	ellipse(35, -8, 6);
	pop();
}

function moveLoopX(xpos, xspeed){
	xpos += xspeed;
	if (xpos > width*1.2){
		xpos = -width*0.2;
	}
	return xpos;
}

function moveLoopY(ypos, yspeed){
	ypos += yspeed;
	if (ypos < -0.2*height){
		ypos = height*1.2;
	}
	return ypos;
}

function bubble(bubX, bubY, bubSize){
	push();
	fill(255, 255, 255, 50);
	ellipse(bubX, bubY,bubSize);
	fill(255, 255, 255, 180);
	ellipse(bubX+0.2*bubSize, bubY-0.2*bubSize, 0.2*bubSize);
	pop();
}

function jellyfish(jellyX, jellyY, jellySize, jellyCol){
	push();
	fill(jellyCol);
	translate(jellyX, jellyY);
	scale(jellySize);
	//body, use sin() to oscillate size
	let jw = map(sin(theta), -1, 1, 65, 90);
	theta += 0.05;
	arc(0, 0, jw, 100, PI, 0);
	//tentacles
	stroke(jellyCol);
	strokeWeight(3);
	for (let k= -25; k <= 25; k += random(2,10)){
	line(k, 0, k, random(20,70));
	}
	//eyes
	fill(0);
	ellipse(-10, -10, 8);
	ellipse(10, -10, 8);
	pop();
}
let ballA, ballB;

function setup() {
	createCanvas(400, 400);
	ballA = {
		x: width / 4,
		y: height / 4,
		xspeed: 1,
		yspeed: -2,
		diam: 70
	}
	ballB = {
		x: width * 3/4,
		y: height * 3/4,
		xspeed: -2,
		yspeed: 0.5,
		diam: 50
	}
}

function draw() {
	background(220);
	bouncingBall(ballA);
	bouncingBall(ballB);
}

function bouncingBall(ball){
	ball.xspeed = bounce(ball.xspeed, ball.x, 0, width, ball.diam);
	ball.yspeed = bounce(ball.yspeed, ball.y, 0, height, ball.diam);
	ball.x = move(ball.x, ball.xspeed);
	ball.y = move(ball.y, ball.yspeed);
	ellipse(ball.x, ball.y, ball.diam, ball.diam);
}

function bounce(speed, pos, min, max, diameter) {
	if (pos-diameter/2 < min || pos+diameter/2 > max) {
		speed *= -1;
	}
	return speed;
}

function move(position, speed) {
	position += speed;
	return position;
}
//number of rows and columns
let numRow = 5;
let numCol = 10;
let rectx, recty, rectWidth, rectHeight;
let fillIn = false;
let iRandom, jRandom;

function setup() {
	createCanvas(400, 400);
}

function draw() {
	background(220);
	//width & height of rectangles
	rectWidth = width / numRow;
  	rectHeight = height / numCol;
  	//draw row
	for (let i = 0; i <= numRow; i++) {
	  //draw columns
	  for (let j = 0; j <= numCol; j++) {
		rectx = i * rectWidth;
		recty = j * rectHeight;
	  	rect(rectx,recty ,rectWidth, rectHeight);
		if (fillIn){
		  push();
		  fill(0, 0, 255);
		  rect(iRandom * rectWidth, jRandom * rectHeight, rectWidth, rectHeight);
		  pop();
		}
	  }
	}
}

function mousePressed() {
  fillIn = true;
  iRandom = floor(random(0, numRow));
  jRandom = floor(random(0, numCol));
  console.log(iRandom);
}

function mouseReleased() {
  fillIn = false;
}let xspeed, yspeed, x, y;


function setup() {
	createCanvas(400, 400);
	y = height / 2;
	x = width / 2;
	xspeed = 1;
	yspeed = -2;
}

function draw() {
	background(220);
	// if (x < 0 || x > width) {
	// xspeed *= -1;
	// }
	// if (y < 0 || y > height) {
	// yspeed *= -1;
	// }
	xspeed = bounce(xspeed, x, 0, width);
	yspeed = bounce(yspeed, y, 0, height);
	y += yspeed;
	x += xspeed;
	ellipse(x, y, 50, 50);
}

function bounce(speed, x, min, max) {
	if (x < min || x > max) {
		speed *= -1;
	}
	return speed;
}

//slider variables
let n;
let y;
let dragging = false;
//ellipse position
let a, b;
let speeda, directiona, speedb, directionb;
//add color variables
let colorOn = false;
//rgb colors, 'c' is used for blue
let r, g, c;
//hsl colors for bouncing ellipse
let h, s, l;




function setup() {
	createCanvas(600, 400);
	angleMode(DEGREES);
	n = width / 100;
	y = height / 2;
	a = 2 * width / 3;
	b = height / 2;
	speeda = random(3, 9);
	speedb = random(2, 15);
	directiona = 1;
	directionb = 1;
	h = 1;
	s = 60;
	l = 50;
}

function draw() {
	colorMode(RGB);
	background(220);
	
	//draw the slider
	//bc made the slider slide faster
	stroke(200);
	line(width - n, 0, width - n, height);
	noStroke();
	fill(150)
	if (dragging) {
		y = y + (mouseY - pmouseY);
		//console.log(y)
		fill(100);
	}
	y = constrain(y, 0, height - 2 * n);
	rect(width - 2 * n, y, 2 * n, 2 * n);
	fill(150);
	let x = map(y, 0, height, 0, width);

	//changing dots
	//bc added random color change when the mouse is pressed
	for (let i = 0; i < height + 20; i += 20) {
		for (let m = 0; m < x + 20; m += 20) {
			if (colorOn){
				r = random (100, 240);
				g = random (100, 240);
				c = random (100, 240);
				fill(r, g, c);
			} else {
				fill(random(110, 220))
			}
			push();
			rectMode(CENTER);
			rect(m, i, 10, 10);
			pop();
		}

	}

	//bouncing ellipse
	//bc added code to change color when it hits walls
	colorMode(HSL);
	fill(h, s, l);
	ellipse(a, b, 30, 30);
	if (a >= width - 15 || a <= x + 30) {
		directiona = -directiona;
		h += random(20, 200);
	}
	if (b >= height - 15 || b <= 15) {
		directionb = -directionb;
		h -= random(20,70);
	}
	a += speeda * directiona;
	b += speedb * directionb;
	//reset color
	if (h > 360){
		h=0;
	}
}

function mousePressed() {
	if (mouseX >= width - 2 * n && mouseX <= width && mouseY >= y && mouseY <= y + 2 * n) {
		dragging = true;
	}
	colorOn = true;
}

function mouseReleased() {
	dragging = false;
	colorOn = false;
}//THIS IS CHENGCHAO'S ORIGINAL CODE
let n;
let y;
let dragging = false;
let a, b;
let speeda, directiona, speedb, directionb;



function setup() {
	createCanvas(600, 400);
	angleMode(DEGREES);
	n = width / 100;
	y = height / 2;
	a = 2 * width / 3;
	b = height / 2;
	speeda = random(3, 9);
	speedb = random(2, 15);
	directiona = 1;
	directionb = 1;

}

function draw() {
	background(220);


	//draw the slider
	stroke(200);
	line(width - n, 0, width - n, height);
	noStroke();
	fill(150)
	if (dragging) {
		y = y + (mouseY - pmouseY) / 5;
		//console.log(y)
		fill(100);
	}
	y = constrain(y, 0, height - 2 * n);
	rect(width - 2 * n, y, 2 * n, 2 * n);
	fill(150);
	let x = map(y, 0, height, 0, width);

	for (let i = 0; i < height + 20; i += 20) {
		for (let m = 0; m < x + 20; m += 20) {
			fill(random(110, 220))
			ellipse(m, i, 10, 10);
		}

	}
	fill(150);
	ellipse(a, b, 30, 30);
	if (a >= width - 15 || a <= x + 30) {
		directiona = -directiona;
	}
	if (b >= height - 15 || b <= 15) {
		directionb = -directionb;
	}
	a += speeda * directiona;
	b += speedb * directionb;
}

function mousePressed() {
	if (mouseX >= width - 2 * n && mouseX <= width && mouseY >= y && mouseY <= y + 2 * n) {
		dragging = true;
	}
}

function mouseReleased() {
	dragging = false;
}//arc origin and radius
let x, y ,r;
//angle of slider
let angle;
//difference of mouse angle and slider angle
let offsetAngle;
//end of slider rotation
let stopAngle;
//colors
let h, s, l;

//track if user dragging the slider
let dragging = false;
//track when to change color
let changeCol = false;
//track if you've passed the stop angle
let passedStop = false;


function setup() { 
	createCanvas(550, 400);
	colorMode(HSL);
	//start color
	h = 8;
	s = 88;
	l = 58;
	//start position of slider
	angle = 0;
	//end position of slider
	stopAngle = PI*2/3;
} 

function draw() { 
	background(255);
	//arc placement
	x = width/2;
	y = 0;
	//radius to fill the screen
	r = dist(x, y, width, height);
	//slider appearance
	noStroke();
	fill(h, s, l);
	//change in mouse position
	let dx = mouseX - x;
	let dy = mouseY - y;
	//angle of mouse from 0
	let mouseAngle = atan2(dy, dx);
	//increase the angle while dragging
	if (dragging){
		angle = mouseAngle - offsetAngle;
	}
	//if slider reaches the area after the stop angle
	if (angle > stopAngle || angle < 0){
		//reset arc rotation
		angle = 0;
		//define when to change color
		//if hasn't passed the stop angle before
		if (!passedStop){
			//flip boolean value
			changeCol = !changeCol;
			passedStop = !passedStop;
		}
	} else {
		passedStop = false;
	}
	//change color
	if (changeCol) {
			h += 20;
			//reset after changing color
			passedStop=false;
	}
	//reset color cycling
	if (h > 360) {
			h = 0;
		}
	//draw the arc
	push();
	translate(x, y);
	rotate(angle);
	arc(0, 0, 2*r, 2*r, PI/8 , PI*1.3);
	pop();
	//add text
	fill(0);
	textSize(13);
	text("Drag your cursor to the left!", width*0.7, height*0.08);
	console.log(angle);
}

//drag rotation based on knob GUI code from Dan Schiffman: 
//https://github.com/ITPNYU/ICM-2015/blob/master/03_interaction/GUI/knob/sketch.js
function mousePressed() {
	//when user is dragging mouse inside the circle
	//track angle of mouse relative to angle of slider
	if (dist(mouseX, mouseY, x, y) < r){
		dragging = true;
		let dx = mouseX - x;
		let dy = mouseY - y;
		offsetAngle = atan2(dy, dx)-angle;
	}
}

//when mouse is released, dragging is false
function mouseReleased() {
	dragging = false;
	changeCol = false;
}//number of rows and columns
let numRow = 10;
let numCol = 10;
let rectx, recty, rectWidth, rectHeight;

function setup() {
	createCanvas(400, 400);
}

function draw() {
	background(220);
	//width & height of rectangles
	rectWidth = width / numRow;
  	rectHeight = height / numCol;
  	//draw row
	for (let i = 0; i <= numRow; i++) {
	  //draw columns
	  for (let j = 0; j <= numCol; j++) {
		rectx = i * rectWidth;
		recty = j * rectHeight;
	  	console.log(rectx);
	  	rect(rectx,recty ,rectWidth, rectHeight);
	  }
	}
}//top left x position of the left most vertical
let start = 0;
//number of rectangles
let numRect = 10;
let rectx, rectWidth, Nextrect;
//color
let h, s, l, rectColor;

function setup() {
	createCanvas(400, 400);
  	colorMode(HSL);
	h = random(0, 360);
	s = 50
	l = 50
}

function draw() {
	background(220);
	noStroke();
	//width of vertical rectangle
	rectWidth = width / numRect;
  	//increment of color hue for each rectangle
  	rectColor = 360/numRect;
	for (i = 0; i <= numRect; i++) {
		//top left corner of rectangle
		rectx = start + i * rectWidth;
		//top left corner of the rectangle to the right
		Nextrectx = rectx + rectWidth;
		//only draw the rectangle when the mouse is between rectx and Nextrectx
		if (mouseX > rectx && mouseX < Nextrectx) {
		  	h = i*rectColor;
			fill(h, s, l);
			console.log(h, "---", s, "---", l);
			rect(rectx, 0, rectWidth, height);
			//otherwise no fill
		} else {
			noFill();
		}
	}
}//top left x position of the left most vertical
let start = 0;
//number of rectangles
let numRect = 10;
let rectx, rectWidth, Nextrect;

function setup() {
	createCanvas(400, 400);
}

function draw() {
	background(220);
	noStroke();
	//width of vertical rectangle
	rectWidth = width / numRect;
	for (i = 0; i <= numRect; i++) {
		//top left corner of rectangle
		rectx = start + i * rectWidth;
		//top left corner of the rectangle to the right
		Nextrectx = rectx + rectWidth;
		//only draw the rectangle when the mouse is between rectx and 
	  	//Nextrectx except the 7th column
		if (mouseX > rectx && mouseX < Nextrectx) {
			//only even numbers of i are blue
		  	if (i%2 == 0){
			  fill(0, 0, 255);
			} else{
			fill(255, 0, 0);
			}
			console.log(rectx, "---", Nextrectx, "---", rectWidth);
			rect(rectx, 0, rectWidth, height);
			//otherwise no fill
		} else {
			noFill();
		}
	}
}//top left x position of the left most vertical
let start = 0;
//number of rectangles
let numRect = 10;
let rectx, rectWidth, Nextrect;

function setup() {
	createCanvas(400, 400);
}

function draw() {
	background(220);
	noStroke();
	//width of vertical rectangle
	rectWidth = width / numRect;
	for (i = 0; i <= numRect; i++) {
		//top left corner of rectangle
		rectx = start + i * rectWidth;
		//top left corner of the rectangle to the right
		Nextrectx = rectx + rectWidth;
		//only draw the rectangle when the mouse is between rectx and 
	  	//Nextrectx except the 7th column
		if (mouseX > rectx && mouseX < Nextrectx) {
			if (i <5){
			  fill(0, 0, 255);
			} else{
			fill(255, 0, 0);
			}
			console.log(rectx, "---", Nextrectx, "---", rectWidth);
			rect(rectx, 0, rectWidth, height);
			//otherwise no fill
		} else {
			noFill();
		}
	}
}//top left x position of the left most vertical
let start = 0;
//number of rectangles
let numRect = 10;
let rectx, rectWidth, Nextrect;

function setup() {
	createCanvas(400, 400);
}

function draw() {
	background(220);
	noStroke();
	//width of vertical rectangle
	rectWidth = width / numRect;
	for (i = 0; i <= numRect; i++) {
		//top left corner of rectangle
		rectx = start + i * rectWidth;
		//top left corner of the rectangle to the right
		Nextrectx = rectx + rectWidth;
		//only draw the rectangle when the mouse is between rectx and 
	  	//Nextrectx except the 7th column
		if (mouseX > rectx && mouseX < Nextrectx && i != 6) {
			fill(255, 0, 0);
			console.log(rectx, "---", Nextrectx, "---", rectWidth);
			rect(rectx, 0, rectWidth, height);
			//otherwise no fill
		} else {
			noFill();
		}
	}
}let a=1;

function setup() { 
  createCanvas(400, 400);
  angleMode(DEGREES);
} 

function draw() { 
  background(220);
  push();
  translate(150, 150);
  scale(2, 5);
  rotate(a++);
  rect(0, 0, 100, 100);
  pop();
}let start = 0;
let numRect = 10;
let rectx, rectWidth, Nextrect;

function setup() {
	createCanvas(400, 400);
}

function draw() {
	background(220);
  	noStroke();
  	//width of vertical rectangle
	rectWidth = width / numRect;
	for (i = 0; i <= numRect; i++) {
	  	//top left corner of rectangle
		rectx = start + i * rectWidth;
	  	//top left corner of the rectangle to the right
		Nextrectx = rectx + rectWidth;
	  	//only draw the rectangle when the mouse is between rectx and Nextrectx
		if (mouseX > rectx && mouseX < Nextrectx) {
			fill(255, 0, 0);
			console.log(rectx, "---", Nextrectx, "---", rectWidth);
			rect(rectx, 0, rectWidth, height);
		//otherwise no fill
		} else {
			noFill();
		}
	}
}let isOn = false;

function setup() {
	createCanvas(400, 400);
}

function draw() {
	background(220);

	noStroke();

	//if first rectangle is on, draw it
	if (isOn) {
		rect(0, 0, width / 3, height);
	}

	if (mouseX <= width / 3) {
		//change isOn if it enters the first (leftmost) rectangle
		if (pmouseX >= width / 3) {
			isOn = !isOn;
		}
	} else if (mouseX <= width * 2 / 3) {
		fill(255, 0, 0);
		rect(width / 3, 0, width / 3, height);
	} else {
		rect(width * 2 / 3, 0, width / 3, height);
	}
}function setup() {
	createCanvas(400, 400);
	rectMode(CENTER);
}

function draw() {
	background(220);

	noStroke();

	//change color in the middle

	if (mouseX <= width / 3) {
		rect(width / 6, height / 2, width / 3, height);
	} else if (mouseX <= width * 2 / 3) {
		fill(255, 0, 0);
		rect(width / 2, height / 2, width / 3, height);
	} else {
		rect(width * 5 / 6, height / 2, width / 3, height);
	}
}//psuedocode: when ball’s horionztal center position is greater than the width of the canvas or less than zero go in the opposite direction at same speed

let x;
let hitRightWall;
let xspeed = 5;

function setup() {
	createCanvas(400, 400);
	x = width / 2;
}

function draw() {
	background(220);

	//bounce ball using if statements to define edges
	// if (x > width){
	// hitRightWall = true;
	// }
	// else if (x < 0){
	// hitRightWall = false;
	// }
	// if (hitRightWall){
	// x--;
	// }
	// else{
	// x++;
	// }

	//bounce ball w/ more general terms
	x += xspeed;
	if (x > width || x < 0) {
		xspeed *= -1;
	}

	//draw circle
	ellipse(x, height / 2, 50, 50);

}let cloud, kite, person;
let r1, r2, size;

function setup() {
	createCanvas(600, 400);
	//hide cursor
	noCursor();
	//initial cloud variables
	cloud = {
		//position
		x: 100,
		y: 75,
	};
	//cloud size/shape
	size = 1.2;
	r1 = size * random(60, 90);
	r2 = size * random(40, 70);
	person = {
		x: width*0.85,
		y: height*0.70
	};
}

function draw() {
	//blue sky
	background(203, 227, 242);
	//sun
	noStroke();
	fill(255, 234, 117);
	ellipse(50,50,120);
	//clouds
	//position clouds horizontally across the sky
	for(horiz = -100; horiz <= width+100; horiz += 200){
		//position clouds vertically along top 40% of sky
		for(vert = -50; vert <= height*0.60; vert += 120){
			//creating the cloud shape
			for (i = -20; i <= 20; i += 20) {
				fill(230, 237, 235, 170);
				console.log(r1, "----", r2);
				ellipse(cloud.x+i+horiz, cloud.y+vert, r1, r2);
				ellipse(cloud.x+5+horiz, cloud.y+i+vert, r1, r2);
			}
		}	
	}
	//move clouds
	cloud.x += 0.5;
	//loop clouds
	if (cloud.x > width/3){
		cloud.x =0;
	}
	//grass
	fill(92, 173, 74);
	beginShape();
	vertex(0, height*0.90);
	vertex(width, height*0.70);
	vertex(width,height);
	vertex(0,height);
	endShape(CLOSE);
	//kite position + other variables
	kite = {
		x: mouseX,
		y: mouseY,
	};
	let fade;
	//draw kite
	colorMode(HSL);
	fade = map(mouseY, 0, height, 70, 20 );
	fill(6, 100, fade);
	beginShape();
	vertex(kite.x, kite.y);
	kite.x -= 20;
	kite.y -= 35;
	vertex(kite.x, kite.y);
	kite.x -= 30;
	vertex(kite.x, kite.y);
	kite.x += 10;
	kite.y += 30;
	vertex(kite.x, kite.y);
	endShape();
	//kite string
	colorMode(RGB);
	noFill();
	stroke(0);
	line(mouseX, mouseY, person.x,person.y+60);
	//kite flyer
	//legs
	noStroke();
	rectMode(CENTER);
	fill(41, 54, 84);
	rect(person.x, person.y+80, 50, 100);
	//body
	fill(232, 189, 239);
	rect(person.x, person.y+50, 55,80, 3)
	//hair
	fill(79, 71, 55);
	ellipse(person.x, person.y, 40, 50);
	rect(person.x, person.y+20, 40, 40);

	//drawing for cloud without loopgs
	//    ellipse(cloud.x, cloud.y, 50,40);
	//    ellipse(cloud.x+20, cloud.y-20, 30, 30);
	//    ellipse(cloud.x+30, cloud.y+20, 50, 40);
	//    ellipse(cloud.x+40, cloud.y, 60, 30);
}
let rectW, rectH, rectX, rectY;
let rectMoveX, rectMoveY, rectSpeed;

function setup() { 
  createCanvas(400, 400);
  //Rectangle width and height
  rectW = width/2;
  rectH = height/2;
  //Start position of rectangle's center
  rectX = width/2;
  rectY = height/2;
  rectMode(CENTER);
  //print width and height of canvas
  console.log(width,"x" ,height);
} 

function draw() {
  background(220);
  //Draw rectangle
  rect(rectX, rectY, rectW, rectH);
  //speed factor (increase or decrease rectangle speed)
  rectSpeed=0.01;
  //Distance from mouse to rectangle
  rectMoveX = (mouseX-rectX)*rectSpeed;
  rectMoveY = (mouseY-rectY)*rectSpeed;
	//add to rectangle's position
	rectX += rectMoveX;
	rectY += rectMoveY;
}let circlex, circley;

function setup() { 
  createCanvas(400, 400);
  circlex=width/2;
  circley=height/2;
} 

function draw() { 
  background(220);
  ellipse(circlex, circley, 50,50);
  circlex+=2;
  circley--;
}function setup() { 
  createCanvas(windowWidth, windowHeight);
  background(220);
} 

function draw() { 
  let speed = dist(mouseX, mouseY, pmouseX, pmouseY);
  let sw = map(speed, 0, 100, 30, 0);
  console.log(sw);
  strokeWeight(sw);
  stroke(60, 80, 100, 40);
  line(mouseX,mouseY,pmouseX,pmouseY);
}

function mousePressed() {
  background(220);
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
  //rect(x, y, x, y);
  strokeWeight(2);
  line(x1,y1,x2,y1);
  line(x2,y1,x2,y2);
  line(x2,y2,x1,y2);
  line(x1,y2,x1,y1);
  
}  var x;

function setup() { 
  createCanvas(800, 600);
  background(220);
  // 1st argument:
  // 2nd argument:
  // 3rd argument:
  // 4th argument: 
  x = width/2;
  y = height/2;
  rectMode(CENTER);
  console.log(width,"x" ,height);
  print(x);
  print(y);
} 

function draw() {
  rect(x, y, x, y); 
}var x = 400;
var y = 400;
var centerx=x/2;
var centery=y/2;
var begin=1;
var example = {
  thingwidth: 20,
  thingheight: 50,
};


function setup() {
    createCanvas(x, y);
	background(0);
}

function draw() { 
    noStroke();
    fill(206, 83, 55);
    ellipse(centerx,centery,mouseX);
  	rect(begin, centery, example.thingwidth, example.thingheight);
 	begin=begin+1;
  	if (mouseIsPressed) {
    fill(247, 216, 81);
    }
  	else{
      fill(255);
    }
  
    ellipse(mouseX, mouseY, 100);
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(209, 229, 252);
  //Stem
  stroke(45, 145, 60);
  strokeWeight(20);
  noFill();
  curve(0, 10, 200,200, 200, 400, 20, 370);  
  //Flower petals along x-y
  strokeWeight(5);
  fill(252, 222, 90);
  stroke(252, 189, 89);
  ellipseMode(CORNERS);
  ellipse(180,200, 220, 50);
  ellipse(180,200,220,350);
  ellipse(200,180,350, 220);
  ellipse(200,180,50, 220);
  //Flower petals along downward diagonal
  ellipseMode(CENTER);
  angleMode(DEGREES);
  rotate(315);
  ellipse(0,200, 40, 150);
  translate(0,170);
  ellipse(0,200, 40, 150);
  translate(100,100);
  //Flower petals along upward diagonal
  rotate(90);
  translate(15,20)
  ellipse(0,0, 40, 150);
  ellipse(0,150, 40, 150);
  //Center of flower
  resetMatrix();
  noStroke();
  fill(79, 58, 9);
  ellipseMode(CENTER);
  ellipse(200,200,80,80);
  strokeWeight(3);
}function setup() { 
  createCanvas(500, 400);
} 

function draw() { 
  //background color in RGB
  background(66, 244, 235);
  //red diagonal
  stroke(355, 0, 0);
	strokeWeight(35);
  line (0, 0, 500, 400);
  //green ellipse
  fill(9, 230, 60);
  noStroke();
  ellipse(250, 200, 250, 180);
  //blue rectange
  fill(37, 70, 122);
  rectMode(CORNER);
  rect(345, 170, 30,30);
}
function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  //RGB colors for bright turquoise
	fill(136, 209, 208);
	ellipse(200, 200, 100, 100);
}function setup() { 
  //createCanvas goes under the setup function
  createCanvas(300,300);
} 

function draw() { 
  background(220);
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  //Ellipse
 	strokeWeight(5);
  stroke(120);
  fill(10, 80, 200);
  ellipse(200, 200, 250, 80);
  //Rectangle
  fill(200, 5, 100);
  stroke(200, 100, 200);
  strokeWeight(8);
  rect(50, 50, 100, 150, 10);
  
  
}