function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
}let img;
let originalImg;
let gp;
function preload(){
  img = loadImage("ccc.png");
  originalImg = loadImage("aaa.png");
}
function setup() {
  createCanvas(800, 600);
  gp = createGraphics(width,height);
  gp.image(originalImg, 0, 0);
}
function draw() {
  background(255, 0, 0);
  
  
  
  
  
      
  
  image(originalImg, 0, 0);
  image(img, 0, 0);
	fadeOut(img, -1);
  fadeIn(originalImg, 1);
  
}
function getDistance(x1, y1, x2, y2){
	let dis = sqrt((x1-x2) * (x1-x2) + (y1-y2)*(y1-y2));
  return dis;
}
function mousePressed(){
  
}
function fadeOut(a, speed){
  a.loadPixels();
  
  for (let j=0; j<a.height; j++){
    for (let i=0; i<a.width; i++){
      let index = (i + j*a.width) * 4;
      if (speed < 0 && a.pixels[index+3] > 0){
        a.pixels[index+3] = a.pixels[index+3] + speed;
      }
    }1
  }
  a.updatePixels();
}
function fadeIn(img, speed){
    img.loadPixels();
  
  for (let j=0; j<img.height; j++){
    for (let i=0; i<img.width; i++){
      let index = (i + j*img.width) * 4;
      if (speed > 0 && img.pixels[index+3] < 255){
        img.pixels[index+3] = img.pixels[index+3] + speed;
      }
    }
  }
  img.updatePixels();
}
let tweetText = "this is some long sentence to be displayed.";
let stair1;
let stair2;
function setup() {
  createCanvas(400, 400);
  stair1 = new StairText(tweetText, 200, 40, 1, 20, [200, 150, 175], [255,0,0]);
	stair2 = new StairText("testing", 200, 40, 1, 20, [200, 150, 175], [255,0,0]);
}
function draw() {
  background(220);
  
  image(stair1.graphic, 20, 0, stair1.stairWidth, stair1.stairHeight);
  stair1.show();
  
  image(stair2.graphic, 20, 80, stair2.stairWidth, stair2.stairHeight);
  stair2.show();
}
function mousePressed(){
  stair1.setContent("new texts showing up!");
}let innerR = 50;
let outterR = 90;
let outterR2 = 110;
let innerR2 = 50
let innerXs = [];
let innerYs = [];
let innerXs2 = [];
let innerYs2 = [];
let outterXs = [];
let outterYs = [];
let outterXs2 = [];
let outterYs2 = [];
let speed = 0.001;
function preload() {
  sun = loadImage("sun.png");
	}
function setup() {
  
  frameRate (30);
  createCanvas(400, 400);
  
  let centerX = width/2;
  let centerY = height/2;
  outterR = 100 + random (-8,8)
  
  angleMode(DEGREES);
  for (let i=0; i<720; i+=2){
    innerXs.push(centerX + innerR * cos(i));
    innerYs.push(centerY + innerR * sin(i));
  }
  for (let i=0; i<720; i+=1){
    outterXs.push(centerX + outterR * cos(i));
    outterYs.push(centerY + outterR * sin(i));
  }
  
  for (let i=0; i<720; i+=4){
    innerXs2.push(centerX + innerR * cos(i));
    innerYs2.push(centerY + innerR * sin(i));
  }
  for (let i=0; i<720; i+=2){
    outterXs2.push(centerX + outterR2 * cos(i));
    outterYs2.push(centerY + outterR2 * sin(i));
  }
  
}
function draw() {
 
  
  background(0);
   image(sun,100,100,width/2+2,height/2);
  for (let i=0;i<180;i++){
    let outterXIndex = i*2 + speed*(floor(random(0,2)))
    let outterYIndex = i*2 + speed*(floor(random(0,2)));
    strokeWeight(1)
    stroke(255,245,125,20)
    line(innerXs[i], innerYs[i], outterXs[outterXIndex], outterYs[outterYIndex]);
    stroke(255,245,125,50)
    strokeWeight(1);
    line(innerXs2[i], innerYs2[i], outterXs2[outterXIndex], outterYs2[outterYIndex]);
  	
  }
	
	fill(255,245,125,10); 
	fill(255,245,125,20); 
  ellipse(width/2+0.5, height/2+0.5, 100, 100)
}let pixelCenters = [];
let segmentRatio = 50;
let capture;
let buffer;
let currentX = 0;
let dir = 4;
let reveal = true;
function setup() {
  createCanvas(800, 600);
  buffer = createGraphics(width, height);
  for (let j = 0; j < height; j += height / segmentRatio) {
    let y = height / segmentRatio / 2 + j;
    for (let i = 0; i < width; i += width / segmentRatio) {
      let x = width / segmentRatio / 2 + i;
      let pixelXY = [];
      pixelXY.push(x);
      pixelXY.push(y);
      pixelCenters.push(pixelXY);
    }
  }
  capture = createCapture(VIDEO);
  capture.size(width, height);
  capture.hide();
}
function draw() {
  if (currentX > width) {
    currentX = 0;
  }
  currentX = currentX + dir;
  buffer.image(capture, 0, 0, width, height);
  buffer.loadPixels();
  background(0);
  noStroke();
  pixelCenters.forEach(e => {
    let pixelIndex = (e[1] * width + e[0]) * 4
    let d = map(buffer.pixels[pixelIndex], 150, 255, 0, width / segmentRatio - 6);
    let r, g, b;
    if (reveal) {
      if (e[0] > currentX && e[0] - currentX < segmentRatio) {
        let r = map(mouseX, 0, width, 60, 255);
        let g = map(mouseY, 0, height, 0, 200);
        let b = map((r + g)/2, 0, 255, 30, 255);
        fill(r+e[0]*0.15, g+e[0]*0.2, b+e[1]*0.1);
      } else {
        fill(0, 0, 0);
      }
    } else {
      if (e[0] > currentX && e[0] - currentX < segmentRatio) {
        fill(0, 0, 0);
      } else {
        let r = map(mouseX, 0, width, 60, 255);
        let g = map(mouseY, 0, height, 0, 200);
        let b = map((r + g)/2, 0, 255, 30, 255);
        fill(r+e[0]*0.15, g+e[0]*0.2, b+e[1]*0.1);
      }
    }
    rect(e[0] - d / 2, e[1] - d / 2, d, d);
  });
}
function mousePressed() {
  reveal = !reveal;
}let innerR = 50;
let outterR = 100;
let innerXs = [];
let innerYs = [];
let outterXs = [];
let outterYs = [];
function setup() {
  createCanvas(400, 400);
  let centerX = width/2;
  let centerY = height/2;
  angleMode(DEGREES);
  for (let i=0; i<360; i+=10){
    innerXs.push(centerX + innerR * cos(i));
    innerYs.push(centerY + innerR * sin(i));
  }
  for (let i=0; i<360; i+=5){
    outterXs.push(centerX + outterR * cos(i));
    outterYs.push(centerY + outterR * sin(i));
  }
  
}
function draw() {
  background(220);
  for (let i=0;i<360;i++){
    let outterXIndex = i*2 + floor(random(0,2));
    let outterYIndex = i*2 + floor(random(0,2));
    line(innerXs[i], innerYs[i], outterXs[outterXIndex], outterYs[outterYIndex]);
  }
}let array = [false, false, false];
const map1 = array.map(x => x + 2);
function setup() {
  
}
function draw() {
  background(220);
}let photos = [];
let totalPhotoNumber = 3;
function preload() {
  for (let i = 0; i < totalPhotoNumber; i++) {
    photos[i] = loadImage("photos/themarias_" + i.toString() + ".png");
  }
}
function setup() {
  createCanvas(400, 1400);
    for (let i = 0; i < photos.length; i++) {
  }
}
function draw() {
  background(220);
  for (let i=0; i<photos.length; i++) {
    image(photos[i], 0, i*500); 
  }
}let inputImg;
let statusMsg;
let transferBtn;
let style1;
let style2;
function setup() {
  noCanvas();
  statusMsg = select('#statusMsg');
  inputImg = select('#inputImg');
  transferBtn = select('#transferBtn')
  transferBtn.mousePressed(transferImages);
  style1 = ml5.styleTransfer('models/wave', modelLoaded);
  style2 = ml5.styleTransfer('models/udnie', modelLoaded);
}
function modelLoaded() {
  if(style1.ready && style2.ready){
    statusMsg.html('Ready!')
  }
}
function transferImages() {
  statusMsg.html('Applying Style Transfer...!');
  
  style1.transfer(inputImg, function(err, result) {
    createImg(result.src).parent('styleA');
  });
  style2.transfer(inputImg, function(err, result) {
    createImg(result.src).parent('styleB');
  });
  statusMsg.html('Done!');
let speechRed;
let speechGreen;
let recog;
let regErrorCount = 0;
let regErrorLimit = 3;
let guessErrorCount = 0;
let video_backdrop_standby;
let video_stairs_left_standby;
let video_stairs_right_standby;
let video_cage_guess_and_analyze;
let video_cage_just_analyze;
let video_cage_result_right;
let video_cage_result_wrong;
let stair_left_1;
let stair_left_2;
let stair_left_3;
let stair_left_4;
let stair_left_5;
let stair_right_1;
let stair_right_2;
let stair_right_3;
let stair_right_4;
let stair_right_5;
let statusPlayed = [false, false, false, false];
let topicSelected = false;
let topicNumber;
let lastTopicNumber = 0;
let guessResultCorrect = false;
const STATUS_INITIALIZE = 0;
const STATUS_GAME_STANDBY = 1;
const STATUS_BIRD_CALLED_READY_TO_GUESS = 2;
const STATUS_USER_GUESS_PROCESSING = 3;
const STATUS_USER_GUESS_GOT_RESULT = 4;
const GUESS_NEGATIVE = "negative";
const GUESS_POSITIVE = "positive";
let data;
let retrievedTweets = [];
function preload() {
  data = loadJSON("tweets.json");
  prepareVideos();
  prepareStairs();
}
function setup() {
  retrievedTweets = data.result;
  createCanvas(windowWidth, windowHeight);
  resetRecog();
}
function draw() {
  background(255);
  switch (status) {
    case STATUS_INITIALIZE:
      noFill();
      rect(width / 2 - 75, height / 2 - 25, 150, 50, 20);
      fill(0);
      text("Start Inivisible Bird", width / 2 - 50, height / 2 + 5);
      if (mouseIsPressed) {
        status = STATUS_GAME_STANDBY;
      }
      break;
    case STATUS_GAME_STANDBY:
      if (debugMode) {
        noFill();
        rect(49, 30, 350, 150);
        rect(width - 401, 30, 350, 150);
        rect(49, height / 2, 350, 252);
        rect(width - 401, height / 2, 350, 252);
        rect(width / 2 - 311, height / 2 - 49, 620, 360);
      }
      if (!topicSelected) {
        topicNumber = floor(random(0, retrievedTweets.length));
        console.log("first selected topic number: " + topicNumber);
      }
      while (topicNumber == lastTopicNumber) {
        topicNumber = floor(random(0, retrievedTweets.length));
        console.log("new topic number: " + topicNumber);
      }
      if (millis() > lastResetRecogTime + resetRecogPeriod) {
        resetRecog();
      }
      fill(0);
      textSize(12);
      text("Say \"Where\'s my bird?\"", 50, 50);
      text("Say \"Where\'s my bird?\"", width - 400, 50);
      if (recog.resultString) {
        if (regErrorCount < regErrorLimit) {
          text("(The cage heard \"" + recog.resultString + "\")", 50, 85);
          text("(The cage heard \"" + recog.resultString + "\")", width - 400, 85);
        } else {
          text("(Seems like the cage is skiving off... )", 50, 100);
          text("(Let me bring you a bird.)", 50, 120);
          text("(Seems like the cage is skiving off... )", width - 400, 100);
          text("(Let me bring you a bird.)", width - 400, 120);
        }
      }
      if (!statusPlayed[status]) {
        console.log("**** status: game standby ****");
        topicSelected = true;
        muteAllVideos();
        playAllVideos();
        statusPlayed[status] = true;
      }
      break;
    case STATUS_BIRD_CALLED_READY_TO_GUESS:
      if (debugMode) {
        noFill();
        rect(49, 30, 350, 150);
        rect(width - 401, 30, 350, 150);
        rect(49, height / 2, 350, 252);
        rect(width - 401, height / 2, 350, 252);
        rect(width / 2 - 311, height / 2 - 49, 620, 360);
      }
      let promptText = "Now the bird about " +
        retrievedTweets[topicNumber].topicName +
        " has arrived. Do you think Twitter\'s attitude about " + retrievedTweets[topicNumber].topicName + " is positive or negative?";
      let backdropPromptText = "Twitter\'s attitude about ";
      let instructionTextPositive = " If it is positive, feed the bird with the green box.";
      let instructionTextNegative = " If it is negative, feed the bird with the red box.";
      fill(0);
      textSize(12);
      text(backdropPromptText, 50, 50);
      textSize(40);
      text(retrievedTweets[topicNumber].topicName, 50, 85);
      textSize(28);
      fill(255, 0, 0);
      text("NEGATIVE", 50, 120);
      fill(0);
      textSize(12);
      text(backdropPromptText, width - 400, 50);
      textSize(40);
      text(retrievedTweets[topicNumber].topicName, width - 400, 85);
      textSize(28);
      fill(0, 255, 0);
      text("POSITIVE", width - 400, 120);
      if (laptop == 1){
      image(video_cage_guess_and_analyze, width / 2 - 305, height / 2 - 40, 600, 350);
      } else if (laptop == 2){
      image(video_cage_guess_and_analyze, width / 2 - 255, height / 2 - 40, 500, 300);
      }
      image(stair_left_1.graphic, 50, height / 2 + 20, stair_left_1.stairWidth, stair_left_1.stairHeight);
      stair_left_1.show();
      image(stair_left_2.graphic, 50, height / 2 + 20 + 5 + stair_left_1.stairHeight, stair_left_2.stairWidth, stair_left_2.stairHeight);
      stair_left_2.show();
      image(stair_left_3.graphic, 50, height / 2 + 20 + 5 + stair_left_1.stairHeight + 5 + stair_left_2.stairHeight, stair_left_3.stairWidth, stair_left_3.stairHeight);
      stair_left_3.show();
      image(stair_left_4.graphic, 50, height / 2 + 20 + (5 + stair_left_1.stairHeight)*3, stair_left_4.stairWidth, stair_left_4.stairHeight);
      stair_left_4.show();
      image(stair_left_5.graphic, 50, height / 2 + 20 + (5 + stair_left_1.stairHeight)*4, stair_left_5.stairWidth, stair_left_5.stairHeight);
      stair_left_5.show();
      image(stair_right_1.graphic, width - 401, height / 2 + 20, stair_right_1.stairWidth, stair_right_1.stairHeight);
      stair_right_1.show();
      image(stair_right_2.graphic, width - 401, height / 2 + 20 + 5 + stair_right_1.stairHeight, stair_right_2.stairWidth, stair_right_2.stairHeight);
      stair_right_2.show();
      image(stair_right_3.graphic, width - 401, height / 2 + 20 + 5 + stair_right_1.stairHeight + 5 + stair_right_3.stairHeight, stair_right_3.stairWidth, stair_right_3.stairHeight);
      stair_right_3.show();
      image(stair_right_4.graphic, width - 401, height / 2 + 20 + (5 + stair_right_1.stairHeight)*3, stair_right_4.stairWidth, stair_right_4.stairHeight);
      stair_right_4.show();
      image(stair_right_5.graphic, width - 401, height / 2 + 20 + (5 + stair_right_1.stairHeight)*4, stair_right_5.stairWidth, stair_right_5.stairHeight);
      stair_right_5.show();
      if (!statusPlayed[status]) {
        console.log("**** status: ready to guess ****");
        muteAllVideos();
        video_cage_guess_and_analyze.elt.currentTime = 0;
        video_cage_guess_and_analyze.elt.muted = false;
        stair_left_1.setContent(retrievedTweets[topicNumber].negativeTweets[0]);
        stair_left_2.setContent(retrievedTweets[topicNumber].negativeTweets[1]);
        stair_left_3.setContent(retrievedTweets[topicNumber].negativeTweets[2]);
        stair_left_4.setContent(retrievedTweets[topicNumber].negativeTweets[3]);
        stair_left_5.setContent(retrievedTweets[topicNumber].negativeTweets[4]);
        stair_right_1.setContent(retrievedTweets[topicNumber].positiveTweets[0]);
        stair_right_2.setContent(retrievedTweets[topicNumber].positiveTweets[1]);
        stair_right_3.setContent(retrievedTweets[topicNumber].positiveTweets[2]);
        stair_right_4.setContent(retrievedTweets[topicNumber].positiveTweets[3]);
        stair_right_5.setContent(retrievedTweets[topicNumber].positiveTweets[4]);
        recog = null;
        speechRed.speak(promptText + instructionTextPositive + instructionTextNegative + " Here are some tweets about it.");
        for (let i = 0; i < 0; i++) {
          speechRed.speak(retrievedTweets[topicNumber].positiveTweets[0]);
        }
        for (let i = 0; i < 0; i++) {
          speechGreen.speak(retrievedTweets[topicNumber].negativeTweets[0]);
        }
        statusPlayed[status] = true;
      }
      break;
    case STATUS_USER_GUESS_PROCESSING:
      if (debugMode) {
        noFill();
        rect(49, 30, 350, 150);
        rect(width - 401, 30, 350, 150);
        rect(49, height / 2, 350, 252);
        rect(width - 401, height / 2, 350, 252);
        rect(width / 2 - 311, height / 2 - 49, 620, 360);
      }
      fill(0);
      textSize(12);
      video_cage_just_analyze.play();
      image(video_cage_just_analyze, width / 2 - 305, height / 2 - 40, 600, 350);
      if (!statusPlayed[status]) {
        console.log("**** status: analyzing ****");
        muteAllVideos();
        video_cage_just_analyze.elt.currentTime = 0;
        video_cage_just_analyze.elt.muted = false;
        speechRed.speak("Analyzing...");
        if (userGuess == retrievedTweets[topicNumber].attitude) {
          guessResultCorrect = true;
        } else {
          guessResultCorrect = false;
        }
        statusPlayed[status] = true;
        setTimeout(goToNextStatus, 5000);
      }
      break;
    case STATUS_USER_GUESS_GOT_RESULT:
      if (debugMode) {
        noFill();
        rect(49, 30, 350, 150);
        rect(width - 401, 30, 350, 150);
        rect(49, height / 2, 350, 252);
        rect(width - 401, height / 2, 350, 252);
        rect(width / 2 - 311, height / 2 - 49, 620, 360);
      }
      let resultText;
      if (guessResultCorrect) {
        resultText = "Your guess about " +
          retrievedTweets[topicNumber].topicName +
          " is right!";
        image(video_cage_result_right, width / 2 - 305, height / 2 - 40, 600, 350);
      } else {
        resultText = "Your guess about " +
          retrievedTweets[topicNumber].topicName +
          " is wrong!";
        image(video_cage_result_wrong, width / 2 - 305, height / 2 - 40, 600, 350);
      }
      fill(0);
      textSize(12);
      if (!statusPlayed[status]) {
        console.log("**** status: got result ****");
        muteAllVideos();
        lastTopicNumber = topicNumber;
        console.log("last topic number: " + lastTopicNumber);
        if (guessResultCorrect) {
          video_cage_result_right.elt.currentTime = 0;
          video_cage_result_right.elt.muted = false;
        } else {
          video_cage_result_wrong.elt.currentTime = 0;
          video_cage_result_wrong.elt.muted = false;
        }
        speechRed.speak(resultText);
        statusPlayed[status] = true;
        setTimeout(resetGame, 20000);
      }
      break;
  }
}
function mousePressed() {
  if (debugMode) {
    switch (status) {
      case STATUS_GAME_STANDBY:
        goToNextStatus();
        break;
      case STATUS_BIRD_CALLED_READY_TO_GUESS:
        if (mouseX < width / 2) {
          userGuess = GUESS_NEGATIVE;
        } else {
          userGuess = GUESS_POSITIVE;
        }
        status = STATUS_USER_GUESS_PROCESSING;
        break;
      case STATUS_USER_GUESS_PROCESSING:
        break;
      case STATUS_USER_GUESS_GOT_RESULT:
        break;
    }
  }
}
function resetRecog() {
  recog = new p5.SpeechRec();
  recog.onResult = gotRecogResult;
  recog.continuous = true;
  recog.interimResults = false;
  recog.start();
  lastResetRecogTime = millis();
  console.log("recog reset at:" + lastResetRecogTime);
}
function resetStatus() {
  statusPlayed.forEach((e, idx) => {
    statusPlayed[idx] = false
  });
  console.log("all game statuses reset");
}
function resetRegErrorCount() {
  regErrorCount = 0;
  console.log("reg error count reset");
}
function resetGame() {
  topicSelected = false;
  status = STATUS_GAME_STANDBY;
  if (recog == null) {
    resetRecog();
  }
  resetStatus();
  resetRegErrorCount();
  console.log("game reset");
}
function prepareVideos() {
  video_backdrop_standby = createVideo("assets/standby.mp4");
  video_backdrop_standby.hide();
  video_backdrop_standby.elt.loop = true;
  video_stairs_left_standby = createVideo("assets/side video.mp4");
  video_stairs_left_standby.hide();
  video_stairs_left_standby.elt.loop = true;
  video_stairs_right_standby = createVideo("assets/side video.mp4");
  video_stairs_right_standby.hide();
  video_stairs_right_standby.elt.loop = true;
  video_cage_guess_and_analyze = createVideo("assets/your bird.mp4", vidLoadGuess);
  video_cage_guess_and_analyze.hide();
  video_cage_guess_and_analyze.elt.loop = true;
  video_cage_just_analyze = createVideo("assets/walk bird.mp4", vidLoadAnalyze);
  video_cage_just_analyze.hide();
  video_cage_just_analyze.elt.loop = true;
  video_cage_result_right = createVideo("assets/yes.mp4", vidLoadYes);
  video_cage_result_right.hide();
  video_cage_result_right.elt.loop = true;
  video_cage_result_wrong = createVideo("assets/no.mp4", vidLoadNo);
  video_cage_result_wrong.hide();
  video_cage_result_wrong.elt.loop = true;
}
function vidLoadGuess() {
}
function vidLoadAnalyze() {
}
function vidLoadYes() {
}
function vidLoadNo() {
}
function playAllVideos() {
  video_stairs_left_standby.play();
  video_stairs_right_standby.play();
  video_cage_guess_and_analyze.play();
  video_cage_just_analyze.play();
  video_cage_result_right.play();
  video_cage_result_wrong.play();
}
function muteAllVideos() {
  video_backdrop_standby.elt.muted = true;
  video_stairs_left_standby.elt.muted = true;
  video_stairs_right_standby.elt.muted = true;
  video_cage_guess_and_analyze.elt.muted = true;
  video_cage_just_analyze.elt.muted = true;
  video_cage_result_right.elt.muted = true;
  video_cage_result_wrong.elt.muted = true;
}
function prepareStairs() {
  
  if (laptop == 1){
  stair_left_1 = new StairText("this is stair 1", 350, 40, 1, 20, 0, [255, 255, 255]);
  stair_left_2 = new StairText("this is stair 2", 350, 40, 1, 20, 0, [255, 255, 255]);
  stair_left_3 = new StairText("this is stair 3", 350, 40, 1, 20, 0, [255, 255, 255]);
  stair_left_4 = new StairText("this is stair 4", 350, 40, 1, 20, 0, [255, 255, 255]);
  stair_left_5 = new StairText("this is stair 5", 350, 40, 1, 20, 0, [255, 255, 255]);
  stair_right_1 = new StairText("this is stair 6", 350, 40, 1, 20, 10, [255, 255, 255]);
  stair_right_2 = new StairText("this is stair 7", 350, 40, 1, 20, 0, [255, 255, 255]);
  stair_right_3 = new StairText("this is stair 8", 350, 40, 1, 20, 0, [255, 255, 255]);
  stair_right_4 = new StairText("this is stair 9", 350, 40, 1, 20, 0, [255, 255, 255]);
  stair_right_5 = new StairText("this is stair 10", 350, 40, 1, 20, 0, [255, 255, 255]);
  } else if (laptop ==2) {
  stair_left_1 = new StairText("this is stair 1", 250, 40, 1, 20, 0, [255, 255, 255]);
  stair_left_2 = new StairText("this is stair 2", 250, 40, 1, 20, 0, [255, 255, 255]);
  stair_left_3 = new StairText("this is stair 3", 250, 40, 1, 20, 0, [255, 255, 255]);
  stair_left_4 = new StairText("this is stair 4", 250, 40, 1, 20, 0, [255, 255, 255]);
  stair_left_5 = new StairText("this is stair 5", 250, 40, 1, 20, 0, [255, 255, 255]);
  stair_right_1 = new StairText("this is stair 6", 250, 40, 1, 20, 10, [255, 255, 255]);
  stair_right_2 = new StairText("this is stair 7", 250, 40, 1, 20, 0, [255, 255, 255]);
  stair_right_3 = new StairText("this is stair 8", 250, 40, 1, 20, 0, [255, 255, 255]);
  stair_right_4 = new StairText("this is stair 9", 250, 40, 1, 20, 0, [255, 255, 255]);
  stair_right_5 = new StairText("this is stair 10", 250, 40, 1, 20, 0, [255, 255, 255]);
  }
}
function goToStatus(targetStatus) {
  status = targetStatus;
}
function goToNextStatus() {
  status = status + 1;
}
function gotRecogResult() {
  console.log(recog.resultString);
  if (recog.resultString == "where\'s my bird" || recog.resultString == "where is my bird" || recog.resultString == "where\'s my birds" || recog.resultString == "where is my birds") {
    goToNextStatus();
  } else {
    regErrorCount++;
  }
  if (regErrorCount >= regErrorLimit) {
    setTimeout(goToNextStatus, 4000);
  }
}
  if (!inString) return;
  if (inString == "guess red") {
    userGuess = GUESS_NEGATIVE;
    goToStatus(STATUS_USER_GUESS_PROCESSING);
  } else if (inString == "guess green") {
    userGuess = GUESS_POSITIVE;
    goToStatus(STATUS_USER_GUESS_PROCESSING);
  } else {
    return;
  }
}
function getRandomColor() {
  let rgb = [];
  rgb.push(random(0, 255));
  rgb.push(random(0, 255));
  rgb.push(random(0, 255));
  return rgb;
}
  console.log(status);
}let foo;
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
}let lstm;
let textInput;
let lengthSlider;
let crazinessLevel = 0.1;
let button;
let button2;
let button3;
let portName = '/dev/cu.usbmodem1411';
let generated = true;
function setup() {
  noCanvas();
  textInput = select('#textInput');
  lengthSlider = select('#lenSlider');
  button = select('#generate1');
  button2 = select('#generate2');
  button3 = select('#generate3');
  button.mousePressed(generate1);
  button2.mousePressed(generate2);
  button3.mousePressed(generate3);
  lengthSlider.input(updateSliders);
  select('#ideaContent').hide();
}
function updateSliders() {
  select('#length').html(lengthSlider.value());
}
function modelReady() {
  select('#status').html('Get Ready & Flick!');
}
function generate1() {
  crazinessLevel = 0.1;
  let temp = 1 - crazinessLevel;
  crazinessLevel = 0.1;
  let original = textInput.value();
  let txt = original.toLowerCase();
  if (txt.length > 0) {
    select('#status').html('An idea is coming right away...');
    select('#ideaContent').show();
    let data = {
      seed: txt,
      length: lengthSlider.value() * 3,
      temperature: temp
    };
    lstm.generate(data, gotData);
    function gotData(err, result) {
      select('#status').html('Done!');
      if (data.temperature < 0.55) {
        select('#temperature').style('font-size', '50px');
        select('#temperature').style('color', '#ff0000');
        select('#temperature').html("SUPER CRAZY!!!");
        select('#result').style('font-size', '30px');
      } else if (data.temperature <= 0.7) {
        select('#temperature').style('font-size', '18px');
        select('#temperature').style('color', '#ff7800');
        select('#temperature').html("Somewhat Crazy");
        select('#result').style('font-size', '18px');
      } else {
        select('#temperature').style('font-size', '18px');
        select('#temperature').style('color', '#ff4343');
        select('#temperature').html("Gental and soft as a human being");
        select('#result').style('font-size', '18px');
      }
      select('#result').html(txt + result);
    }
  } else {
    alert("Please type the beginning of your idea and flick again!");
  }
}
function generate2() {
  crazinessLevel = 0.4;
  let temp = 1 - crazinessLevel;
  crazinessLevel = 0.1;
  let original = textInput.value();
  let txt = original.toLowerCase();
  if (txt.length > 0) {
    select('#status').html('An idea is coming right away...');
    select('#ideaContent').show();
    let data = {
      seed: txt,
      length: lengthSlider.value() * 3,
      temperature: temp
    };
    lstm.generate(data, gotData);
    function gotData(err, result) {
      select('#status').html('Done!');
      if (data.temperature < 0.55) {
        select('#temperature').style('font-size', '50px');
        select('#temperature').style('color', '#ff0000');
        select('#temperature').html("SUPER CRAZY!!!");
        select('#result').style('font-size', '30px');
      } else if (data.temperature <= 0.7) {
        select('#temperature').style('font-size', '18px');
        select('#temperature').style('color', '#ff7800');
        select('#temperature').html("Somewhat Crazy");
        select('#result').style('font-size', '18px');
      } else {
        select('#temperature').style('font-size', '18px');
        select('#temperature').style('color', '#ff4343');
        select('#temperature').html("Gental and soft as a human being");
        select('#result').style('font-size', '18px');
      }
      select('#result').html(txt + result);
    }
  } else {
    alert("Please type the beginning of your idea and flick again!");
  }
}
function generate3() {
  crazinessLevel = 0.7;
  let temp = 1 - crazinessLevel;
  crazinessLevel = 0.1;
  let original = textInput.value();
  let txt = original.toLowerCase();
  if (txt.length > 0) {
    select('#status').html('An idea is coming right away...');
    select('#ideaContent').show();
    let data = {
      seed: txt,
      length: lengthSlider.value() * 3,
      temperature: temp
    };
    lstm.generate(data, gotData);
    function gotData(err, result) {
      select('#status').html('Done!');
      if (data.temperature < 0.55) {
        select('#temperature').style('font-size', '50px');
        select('#temperature').style('color', '#ff0000');
        select('#temperature').html("SUPER CRAZY!!!");
        select('#result').style('font-size', '30px');
      } else if (data.temperature <= 0.7) {
        select('#temperature').style('font-size', '18px');
        select('#temperature').style('color', '#ff7800');
        select('#temperature').html("Somewhat Crazy");
        select('#result').style('font-size', '18px');
      } else {
        select('#temperature').style('font-size', '18px');
        select('#temperature').style('color', '#ff4343');
        select('#temperature').html("Gental and soft as a human being");
        select('#result').style('font-size', '18px');
      }
      select('#result').html(txt + result);
    }
  } else {
    alert("Please type the beginning of your idea and flick again!");
  }
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
  if (currentString.length > 0) {
    let flickedValue = map(Number(currentString), 0, 1023, 0, 1);
    console.log("Flicked Value: " + flickedValue);
    if (flickedValue > crazinessLevel) {
      crazinessLevel = flickedValue;
    }
    if (flickedValue == 0 && crazinessLevel > 0.1) {
      generated = false;
    }
    if (generated == false) {
      generated = true;
      console.log("Craziness Level: " + crazinessLevel);
      generate();
    }
  }
}let movies, guesses;
function preload() {
  loadJSON("Data.json", gotData);
  
}
function setup() {
  createCanvas(400, 400);
}
function gotData(data) {
  movies = data.movies;
  guesses = data.guesses;
}
function draw() {
  background(220);
}let myp5 = new p5(sketch1);
let data;
let particles=[];
let index;
let trans;
function preload(){
  data = loadJSON('pollution.json');
}
function getIndex(){
  index = data.data[0].current.pollution.aqius;
  
  console.log(index);
  return index;
}
function setup() {
  createCanvas(200, 200);
  getIndex();
  
  for (let i=0; i<index; i++){
    particles.push(new Particle());
  }
}
function draw() {
  background(255);
  
  if (index<50){
    trans=60;
  } 
  else if (index>50&&index<101){
    trans=170;
  }
  else if (index>101){
    trans=255;
  }
  
  for (let i=0; i<index; i++){ 
    particles[i].move();
    particles[i].show(trans);
  }
}
class Particle{
  constructor(){
  	this.x = random(width-10);
  	this.y = random(height-10);
  	this.d = random(10,30);
  	this.speed = 2;
  }
  
  move(){
    this.x = this.x + random(-this.speed, this.speed);
    this.y = this.y + random(-this.speed, this.speed);
  }
  
  show(trans){
    fill(0, trans);
    noStroke();
    ellipse(this.x, this.y, this.d, this.d);
  }
}let data;
let particles=[];
let index;
function preload(){
  data = loadJSON('hkpollution.json');
}
function getIndex(){
  let index = data.data.current.pollution.aqius;
  
  console.log(index);
  return index;
}
function setup() {
  createCanvas(400, 400);
  
  getIndex();
  
  for (let i=0; i<index; i++){
    particles.push(new Particle());
  }
}
function draw() {
  background(255);
  
  for (let i=0; i<index; i++){
    particles[i].move();
    particles[i].show(10);
  }
}
class Particle{
  constructor(){
  	this.x = random(width);
  	this.y = random(height);
  	this.d = random(20,40);
  	this.speed = 2;
  }
  
  move(){
    this.x = this.x + random(-this.speed, this.speed);
    this.y = this.y + random(-this.speed, this.speed);
  }
  
  show(trans){
    fill(0);
    noStroke();
    ellipse(this.x, this.y, this.d, this.d);
  }
let head, originalHead, body, originalBody, bgImage;
let videoRatio = 2;
let sound;
let soundIsPlayed = false;
let bgSound;
let bg = new ProjectionBG();
let bgTime = 99999999;
let ghostRightShoulder = null;
let ghostLeftShoulder = null;
let ghostHead = null;
let video;
let poseNet;
let poses = [];
let mouseWidth = 0,
  mouseHeight = 0;
let option = {
  imageScaleFactor: 0.3,
  outputStride: 16,
  flipHorizontal: true,
  minConfidence: 0.5,
  maxPoseDetections: 5,
  scoreThreshold: 0.5,
  nmsRadius: 20,
  detectionType: 'multiple',
  multiplier: 0.75
}
let showSketch;
let portName = "/dev/cu.usbmodem1421";
let data;
function preload() {
  body = loadImage('1950headbody.png');
  originalBody = loadImage('1950headbody.png');
  bgImage = loadImage('photoscratch.png');
  
}
function setup() {
  bg.setState(0);
  createCanvas(windowWidth, windowHeight);
  sound = loadSound('Scary.mp3');
  bgSound = loadSound('bgSound1.mp3');
  video = createCapture(VIDEO);
  video.size(windowWidth / 2, windowHeight / 2);
  poseNet = ml5.poseNet(video, option, modelReady);
  poseNet.on('pose', function(results) {
    poses = results;
  });
  video.hide();
  angleMode(DEGREES);
  let faceUnitTime = round(showGhostTime / 255);
  setInterval(fadeImageAlpha, faceUnitTime);
  setInterval(restoreImageAlpha, updateGhostTime);
}
function processData() {
  if (!inString) return;
  data = inString.trim();
  console.log(data);
  if (data == "sensor on") {
    showSketch = true;
  } else if (data == "sensor off") {
    showSketch = false;
  } else if (data == "start music") {
    soundIsPlayed = false;
  }
}
function modelReady() {
}
function draw() {
  if (true) {
    if (millis() > bgTime) {
      if (bgSound.isLooping() == false && bgSound.isPlaying() == false) {
        bgSound.play()
        bgSound.loop();
      }
    }
    image(bgImage, 0, 0, windowWidth, windowHeight);
    drawKeypoints();
    
    if (ghostRightShoulder && ghostLeftShoulder && ghostHead) {
      let v0 = createVector(ghostRightShoulder.position.x * videoRatio, ghostRightShoulder.position.y * videoRatio);
      let v1 = createVector(ghostLeftShoulder.position.x * videoRatio - ghostRightShoulder.position.x * videoRatio, ghostLeftShoulder.position.y * videoRatio - ghostRightShoulder.position.y * videoRatio);
    	drawBodyPart(body, ghostRightShoulder.position.x * videoRatio, ghostRightShoulder.position.y * videoRatio - 300, v1.heading());
    }
  } else {
    bg.setState(0);
    bg.changeColor();
    bg.display();
    if (bgSound.isLooping() == true) {
    }
  }
}
function drawKeypoints() {
  
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i].pose;
    let nose;
    let leftShoulder;
    let rightShoulder;
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      if (keypoint.score > 0.2) {
        switch (j) {
          case 0:
            nose = keypoint;
            break;
          case 5:
            leftShoulder = keypoint;
            break;
          case 6:
            rightShoulder = keypoint;
            break;
        }
        
        
        if (nose && leftShoulder && rightShoulder) {
          if (!ghostProjected) {
            ghostRightShoulder = rightShoulder;
            ghostLeftShoulder = leftShoulder;
            ghostHead = nose;
            ghostProjected = !ghostProjected;
            setTimeout(() => {
              ghostProjected = !ghostProjected;
            }, updateGhostTime);
          }
          if (ghostRightShoulder && ghostLeftShoulder && ghostHead) {
						
            if (!soundIsPlayed) {
              bgTime = millis() + 8000;
              sound.play();
              soundIsPlayed = true;
            }
          }
        }
      }
    }
  }
}
function drawBodyPart(img, x, y, angle) {
  push();
  translate(x, y);
  rotate(angle);
  image(img, -20, -50);
  pop();
}
function fadeImageAlpha() {
  let img = body;
  img.loadPixels();
  for (let i = 0; i < 4 * (img.width * img.height); i += 4) {
    if (img.pixels[i + 3] != 0) {
      img.pixels[i + 3] = img.pixels[i + 3] - 3;
    }
  }
  img.updatePixels();
}
function restoreImageAlpha() {
  let img1 = body;
  let img2 = originalBody;
  img1.loadPixels();
  img2.loadPixels();
  for (let i = 0; i < 4 * (img1.width * img1.height); i += 4) {
    img1.pixels[i + 3] = img2.pixels[i + 3];
  }
  img1.updatePixels();
}
function fadeHeadAlpha() {
  let img = head;
  img.loadPixels();
  for (let i = 0; i < 4 * (img.width * img.height); i += 4) {
    if (img.pixels[i + 3] != 0) {
      img.pixels[i + 3] = img.pixels[i + 3] - 3;
    }
  }
  img.updatePixels();
}
function restoreHeadAlpha() {
  let img1 = head;
  let img2 = originalHead;
  img1.loadPixels();
  img2.loadPixels();
  for (let i = 0; i < 4 * (img1.width * img1.height); i += 4) {
    img1.pixels[i + 3] = img2.pixels[i + 3];
  }
  img1.updatePixels();
}let stock1;
let stock1Symbol = "aapl";
let stock1StartingNote = "C4";
let stock1Color = "red";
let stock1NoteNumber = 15;
let stock2;
let stock2Symbol = "fb";
let stock2StartingNote = "D4";
let stock2Color = "blue";
let stock2NoteNumber = 10;
let stock3;
let stock3Symbol = "googl";
let stock3StartingNote = "E4";
let stock3Color = "green";
let stock3NoteNumber = 5;
let allStocks = [];
let totalRange;
let graphMargin = 20;
let xUnit;
let yUnit;
let lineMoveInterval;
let lineX;
let playTime = 700;
function preload() {
  stock1 = new StockMusic1D(stock1Symbol, stock1StartingNote, stock1NoteNumber, stock1Color);
  stock1.preLoad();
  stock2 = new StockMusic1D(stock2Symbol, stock2StartingNote, stock2NoteNumber, stock2Color);
  stock2.preLoad();
  stock3 = new StockMusic1D(stock3Symbol, stock3StartingNote, stock3NoteNumber, stock3Color);
  stock3.preLoad();
}
function setup() {
  stock1.initialize();
  stock2.initialize();
  stock3.initialize();
  allStocks.push(stock1);
  allStocks.push(stock2);
  totalRange = getTotalRange(allStocks);
  createCanvas(windowWidth, windowHeight);
  xUnit = (width - graphMargin * 2) / stock1.getNotes().length;
  yUnit = (height - graphMargin * 2) / stock1NoteNumber;
  lineX = graphMargin;
  lineMoveInterval = noteLength / xUnit;
  let synth = new Tone.PolySynth(6, Tone.Synth).toMaster();
  for (let i = 0; i < stock1.getNotes().length; i++) {
    synth.triggerAttackRelease([stock1.getNotes()[i], stock2.getNotes()[i], "A3", "C4", "E4"], '4n', (i + 1) / (1000 / noteLength));
  }
}
function draw() {
  background(255);
  fill(0);
  strokeWeight(0.5);
  text(stock1.date + ": ", graphMargin, 20);
  let textX = 100;
  allStocks.forEach((stock) => {
      fill(stock.color);
     	text(stock.company.companyName, textX, 20);
      textX = textX + stock.company.companyName.length*6 + 20;
  });
  stroke(130);
  strokeWeight(1.5);
  line(graphMargin, graphMargin * 2, graphMargin, height - graphMargin * 2);
  line(graphMargin, height - graphMargin * 2, width - graphMargin, height - graphMargin * 2);
  allStocks.forEach((stock) => {
    for (let i = 0; i < stock.getBreakpoints().length - 1; i++) {
      stroke(stock.color);
      strokeWeight(1);
      line(graphMargin + i * xUnit, height - (graphMargin * 2 + stock.getBreakpoints()[i] * yUnit), graphMargin + (i + 1) * xUnit, height - (graphMargin * 2 + stock.getBreakpoints()[i + 1] * yUnit));
    }
  });
  stroke(130);
  strokeWeight(1.5);
  line(lineX, graphMargin * 2, lineX, height - graphMargin * 2);
  if (millis() > playTime + lineMoveInterval * 5) {
    lineX += 5;
    playTime = millis();
  }
}
function getTotalRange(stocks) {
  let highPrice = 0;
  let lowPrice = 9999;
  stocks.forEach((s) => {
    if (s.high > highPrice) {
      highPrice = s.high;
    }
    if (s.low < lowPrice) {
      lowPrice = s.low;
    }
  });
  return highPrice - lowPrice;
let head, body;
let videoRatio = 2;
let sound;
let soundIsPlayed = false;
let bgSound;
let bg = new ProjectionBG();
let bgTime = 99999999;
let video;
let poseNet;
let poses = [];
let mouseWidth = 0,
  mouseHeight = 0;
let option = {
  imageScaleFactor: 0.3,
  outputStride: 16,
  flipHorizontal: true,
  minConfidence: 0.5,
  maxPoseDetections: 5,
  scoreThreshold: 0.5,
  nmsRadius: 20,
  detectionType: 'multiple',
  multiplier: 0.75
}
let showSketch;
let portName = "/dev/cu.usbmodem1411";
let data;
function preload() {
  head = loadImage('head.png');
  body = loadImage('bodyBlack.png');
}
function setup() {
  bg.setState(0);
  createCanvas(windowWidth, windowHeight);
  sound = loadSound('Scary.mp3');
  bgSound = loadSound('bgSound1.mp3');
  video = createCapture(VIDEO);
  video.size(windowWidth / 2, windowHeight / 2);
  poseNet = ml5.poseNet(video, option, modelReady);
  poseNet.on('pose', function(results) {
    poses = results;
  });
  video.hide();
  angleMode(DEGREES);
}
function processData() {
  if (!inString) return;
  data = inString.trim();
  console.log(data);
  if (data == "sensor on") {
    showSketch = true;
  } else if (data == "sensor off") {
    showSketch = false;
  }
}
function modelReady() {
}
function draw() {
  if (showSketch) {
    if (millis() > bgTime) {
      bg.setState(1);
      if (bgSound.isLooping() == false && bgSound.isPlaying() == false) {
        bgSound.play();
        bgSound.loop();
      }
    }
    
    bg.changeColor();
    bg.display();
    drawKeypoints();
  } else {
    bg.setState(0);
    bg.changeColor();
    bg.display();
    
    
    if (bgSound.isLooping() == true) {
        bgSound.stop();
    }
  }
}
function drawKeypoints() {
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i].pose;
    let nose;
    let leftShoulder;
    let rightShoulder;
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      if (keypoint.score > 0.2) {
        switch (j) {
          case 0:
            nose = keypoint;
            break;
          case 5:
            leftShoulder = keypoint;
            break;
          case 6:
            rightShoulder = keypoint;
            break;
        }
        if (leftShoulder && rightShoulder) {
          var v0 = createVector(rightShoulder.position.x * videoRatio, rightShoulder.position.y * videoRatio);
          var v1 = createVector(leftShoulder.position.x * videoRatio - rightShoulder.position.x * videoRatio, leftShoulder.position.y * videoRatio - rightShoulder.position.y * videoRatio);
          drawBodyPart(body, rightShoulder.position.x * videoRatio, rightShoulder.position.y * videoRatio, v1.heading());
        }
        if (nose) {
          if (!soundIsPlayed) {
            bgTime = millis() + 8000;
            sound.play();
            soundIsPlayed = true;
          }
          noFill();
          stroke(255);
          strokeWeight(4);
          ellipse(nose.position.x * videoRatio, nose.position.y * videoRatio, 250, 250);
        }
      }
    }
  }
}
function drawSkeleton() {
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}
function drawBodyPart(img, x, y, angle) {
  push();
  translate(x, y);
  rotate(angle);
  image(img, -20, -50);
  pop();
let head, body;
let videoRatio = 2;
let sound;
let soundIsPlayed = false;
let bgSound;
let bg = new ProjectionBG();
let bgTime = 99999999;
let video;
let poseNet;
let poses = [];
let mouseWidth = 0,
  mouseHeight = 0;
let option = {
  imageScaleFactor: 0.3,
  outputStride: 16,
  flipHorizontal: true,
  minConfidence: 0.5,
  maxPoseDetections: 5,
  scoreThreshold: 0.5,
  nmsRadius: 20,
  detectionType: 'multiple',
  multiplier: 0.75
}
let showSketch;
let portName = "/dev/cu.usbmodem1411";
let data;
function preload() {
  head = loadImage('head.png');
  body = loadImage('bodyBlack.png');
}
function setup() {
  bg.setState(0);
  createCanvas(windowWidth, windowHeight);
  sound = loadSound('Scary.mp3');
  bgSound = loadSound('bgSound1.mp3');
  video = createCapture(VIDEO);
  video.size(windowWidth / 2, windowHeight / 2);
  poseNet = ml5.poseNet(video, option, modelReady);
  poseNet.on('pose', function(results) {
    poses = results;
  });
  video.hide();
  angleMode(DEGREES);
}
function processData() {
  if (!inString) return;
  data = inString.trim();
  console.log(data);
  if (data == "sensor on") {
    showSketch = true;
  } else if (data == "sensor off") {
    showSketch = false;
  }
}
function modelReady() {
}
function draw() {
  if (showSketch) {
    if (millis() > bgTime) {
      bg.setState(1);
      if (bgSound.isLooping() == false && bgSound.isPlaying() == false) {
        bgSound.play();
        bgSound.loop();
      }
    }
    
    bg.changeColor();
    bg.display();
    drawKeypoints();
  } else {
    bg.setState(0);
    bg.changeColor();
    bg.display();
    
    
    if (bgSound.isLooping() == true) {
        bgSound.stop();
    }
  }
}
function drawKeypoints() {
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i].pose;
    let nose;
    let leftShoulder;
    let rightShoulder;
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      if (keypoint.score > 0.2) {
        switch (j) {
          case 0:
            nose = keypoint;
            break;
          case 5:
            leftShoulder = keypoint;
            break;
          case 6:
            rightShoulder = keypoint;
            break;
        }
        if (leftShoulder && rightShoulder) {
          var v0 = createVector(rightShoulder.position.x * videoRatio, rightShoulder.position.y * videoRatio);
          var v1 = createVector(leftShoulder.position.x * videoRatio - rightShoulder.position.x * videoRatio, leftShoulder.position.y * videoRatio - rightShoulder.position.y * videoRatio);
          drawBodyPart(body, rightShoulder.position.x * videoRatio, rightShoulder.position.y * videoRatio, v1.heading());
        }
        if (nose) {
          if (!soundIsPlayed) {
            bgTime = millis() + 8000;
            sound.play();
            soundIsPlayed = true;
          }
          noFill();
          stroke(255);
          strokeWeight(4);
          ellipse(nose.position.x * videoRatio, nose.position.y * videoRatio, 250, 250);
        }
      }
    }
  }
}
function drawSkeleton() {
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}
function drawBodyPart(img, x, y, angle) {
  push();
  translate(x, y);
  rotate(angle);
  image(img, -20, -50);
  pop();
let head, rightArm;
let video;
let poseNet;
let poses = [];
let mouseWidth = 0, mouseHeight = 0;
let showSketch;
var data = 0;
function preload() {
  head = loadImage('head.png');
  rightArm = loadImage('rightArm.png');
  
}
function setup() {
  
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(800, 600);
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', function(results) {
    poses = results;
  });
  video.hide();
}
function processData() {
	if (!inString) return;
	data = inString.trim();
  if (data == "1") {
  	showSketch = true;
  } else {
  	showSketch = false;
  }
}
function modelReady() {
  select('#status').html('Model Loaded');
}
function draw() {
  if (showSketch === true ) {
    background (0);
    drawKeypoints();
  } else {
  	background (0);
  }
}
function drawKeypoints()  {
  for (let i = 0; i < poses.length; i++) {
    
    let pose = poses[i].pose;
    let nose;
    let leftEye;
    let rightEye;
    let leftShoulder;
    let rightShoulder;
    
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      if (keypoint.score > 0.2) {
        switch (j) {
          case 0:
            nose = keypoint;
            break;
          case 1:
            leftEye = keypoint;
            break;
          case 2:
            rightEye = keypoint;
            break;
          case 5:
            leftShoulder = keypoint;
            break;
          case 6:
            rightShoulder = keypoint;
            break;
        }
        
        if (nose && leftShoulder && rightShoulder) {
          fill(206,122,33);
          noStroke();
          beginShape();
          curveVertex(rightShoulder.position.x ,rightShoulder.position.y);
          curveVertex(rightShoulder.position.x ,rightShoulder.position.y);
          curveVertex(nose.position.x - 100 ,nose.position.y - 110);
          curveVertex(nose.position.x + 80 ,nose.position.y - 110);
          curveVertex(leftShoulder.position.x ,leftShoulder.position.y);
          curveVertex(leftShoulder.position.x,leftShoulder.position.y);
          endShape();
          
          fill(238,179,72);
          beginShape();
          curveVertex(rightShoulder.position.x + 30,rightShoulder.position.y);
          curveVertex(rightShoulder.position.x + 30,rightShoulder.position.y);
          curveVertex(nose.position.x - 80 ,nose.position.y - 110);
          curveVertex(nose.position.x + 80 ,nose.position.y - 110);
          curveVertex(leftShoulder.position.x ,leftShoulder.position.y);
          curveVertex(leftShoulder.position.x,leftShoulder.position.y);
          endShape();
          
          noFill();
          stroke(0);
          strokeWeight(3);
          arc(nose.position.x ,nose.position.y, 30 + mouseWidth, 20 + mouseHeight, 0, PI);
          mouseWidth +=0.5; mouseHeight-= 0.01;
            if (mouseWidth >= 55) {
              mouseWidth = 0;
              mouseHeight = 0;
            } 
         }
       }
       else if (nose && !leftShoulder && !rightShoulder) {
          drawShoulder(nose.position.x ,nose.position.y);
          noFill();
          stroke(0);
          strokeWeight(3);
          arc(nose.position.x ,nose.position.y, 30 + mouseWidth, 20 + mouseHeight, 0, PI);
          mouseWidth +=0.5; mouseHeight-= 0.01;
            if (mouseWidth >= 55) {
              mouseWidth = 0;
              mouseHeight = 0;
            }
         }  
          
        
        if (leftEye) {
        fill(255);
        noStroke();  
        ellipse(leftEye.position.x, leftEye.position.y, 30, 30);
        fill(0);
        ellipse(leftEye.position.x, leftEye.position.y, 10, 13);
        rect (leftEye.position.x - 10, leftEye.position.y - 40, 15, 3);
      }
        if (rightEye) {
        fill(255);
        noStroke();  
        ellipse(rightEye.position.x, rightEye.position.y, 30, 30);
        fill(0);
        ellipse(rightEye.position.x, rightEye.position.y, 10, 13);
        rect (rightEye.position.x - 10, rightEye.position.y - 40, 15, 3);
          
      }
        
    }
  
  }
}
function drawShoulder(x,y) {
          this.x = x;
          this.y = y;
          fill(206,122,33);
          noStroke();
          beginShape();
          curveVertex(this.x - 150  ,this.y + 150);
          curveVertex(this.x - 150,this.y + 150);
          curveVertex(this.x - 100 ,this.y - 110);
          curveVertex(this.x + 80 ,this.y - 110);
          curveVertex(this.x + 150 ,this.y + 150);
          curveVertex(this.x + 150 ,this.y + 150);
          endShape();
          
          fill(238,179,72);
          beginShape();
          curveVertex(this.x - 130,this.y + 150);
          curveVertex(this.x - 130,this.y +150);
          curveVertex(this.x - 80 ,this.y - 110);
          curveVertex(this.x + 80 ,this.y - 110);
          curveVertex(this.x + 150 ,this.y + 150);
          curveVertex(this.x + 150,this.y + 150);
          endShape();
}
function drawSkeleton() {
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}let lstm;
let textInput;
let lengthSlider;
let crazinessLevel = 0.1;
let button;
let button2;
let button3;
let portName = '/dev/cu.usbmodem1411';
let generated = true;
function setup() {
  noCanvas();
  textInput = select('#textInput');
  lengthSlider = select('#lenSlider');
  button = select('#generate1');
  button2 = select('#generate2');
  button3 = select('#generate3');
  button.mousePressed(generate1);
  button2.mousePressed(generate2);
  button3.mousePressed(generate3);
  lengthSlider.input(updateSliders);
  select('#ideaContent').hide();
}
function updateSliders() {
  select('#length').html(lengthSlider.value());
}
function modelReady() {
  select('#status').html('Get Ready & Flick!');
}
function generate1() {
  crazinessLevel = 0.1;
  let temp = 1 - crazinessLevel;
  crazinessLevel = 0.1;
  let original = textInput.value();
  let txt = original.toLowerCase();
  if (txt.length > 0) {
    select('#status').html('An idea is coming right away...');
    select('#ideaContent').show();
    let data = {
      seed: txt,
      length: lengthSlider.value() * 3,
      temperature: temp
    };
    lstm.generate(data, gotData);
    function gotData(err, result) {
      select('#status').html('Done!');
      if (data.temperature < 0.55) {
        select('#temperature').style('font-size', '50px');
        select('#temperature').style('color', '#ff0000');
        select('#temperature').html("SUPER CRAZY!!!");
        select('#result').style('font-size', '30px');
      } else if (data.temperature <= 0.7) {
        select('#temperature').style('font-size', '18px');
        select('#temperature').style('color', '#ff7800');
        select('#temperature').html("Somewhat Crazy");
        select('#result').style('font-size', '18px');
      } else {
        select('#temperature').style('font-size', '18px');
        select('#temperature').style('color', '#ff4343');
        select('#temperature').html("Gental and soft as a human being");
        select('#result').style('font-size', '18px');
      }
      select('#result').html(txt + result);
    }
  } else {
    alert("Please type the beginning of your idea and flick again!");
  }
}
function generate2() {
  crazinessLevel = 0.4;
  let temp = 1 - crazinessLevel;
  crazinessLevel = 0.1;
  let original = textInput.value();
  let txt = original.toLowerCase();
  if (txt.length > 0) {
    select('#status').html('An idea is coming right away...');
    select('#ideaContent').show();
    let data = {
      seed: txt,
      length: lengthSlider.value() * 3,
      temperature: temp
    };
    lstm.generate(data, gotData);
    function gotData(err, result) {
      select('#status').html('Done!');
      if (data.temperature < 0.55) {
        select('#temperature').style('font-size', '50px');
        select('#temperature').style('color', '#ff0000');
        select('#temperature').html("SUPER CRAZY!!!");
        select('#result').style('font-size', '30px');
      } else if (data.temperature <= 0.7) {
        select('#temperature').style('font-size', '18px');
        select('#temperature').style('color', '#ff7800');
        select('#temperature').html("Somewhat Crazy");
        select('#result').style('font-size', '18px');
      } else {
        select('#temperature').style('font-size', '18px');
        select('#temperature').style('color', '#ff4343');
        select('#temperature').html("Gental and soft as a human being");
        select('#result').style('font-size', '18px');
      }
      select('#result').html(txt + result);
    }
  } else {
    alert("Please type the beginning of your idea and flick again!");
  }
}
function generate3() {
  crazinessLevel = 0.7;
  let temp = 1 - crazinessLevel;
  crazinessLevel = 0.1;
  let original = textInput.value();
  let txt = original.toLowerCase();
  if (txt.length > 0) {
    select('#status').html('An idea is coming right away...');
    select('#ideaContent').show();
    let data = {
      seed: txt,
      length: lengthSlider.value() * 3,
      temperature: temp
    };
    lstm.generate(data, gotData);
    function gotData(err, result) {
      select('#status').html('Done!');
      if (data.temperature < 0.55) {
        select('#temperature').style('font-size', '50px');
        select('#temperature').style('color', '#ff0000');
        select('#temperature').html("SUPER CRAZY!!!");
        select('#result').style('font-size', '30px');
      } else if (data.temperature <= 0.7) {
        select('#temperature').style('font-size', '18px');
        select('#temperature').style('color', '#ff7800');
        select('#temperature').html("Somewhat Crazy");
        select('#result').style('font-size', '18px');
      } else {
        select('#temperature').style('font-size', '18px');
        select('#temperature').style('color', '#ff4343');
        select('#temperature').html("Gental and soft as a human being");
        select('#result').style('font-size', '18px');
      }
      select('#result').html(txt + result);
    }
  } else {
    alert("Please type the beginning of your idea and flick again!");
  }
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
  if (currentString.length > 0) {
    let flickedValue = map(Number(currentString), 0, 1023, 0, 1);
    console.log("Flicked Value: " + flickedValue);
    if (flickedValue > crazinessLevel) {
      crazinessLevel = flickedValue;
    }
    if (flickedValue == 0 && crazinessLevel > 0.1) {
      generated = false;
    }
    if (generated == false) {
      generated = true;
      console.log("Craziness Level: " + crazinessLevel);
      generate();
    }
  }
}var canvas;
var angle1 = 0;
var angle2 = 0;
var tracksOffset;
var resizeImgW = 0;
var resizeImgH = 0;
var tracks = [];
var drawVenus = false;
function preload() {
  imgEarth = loadImage("planets/Earth.png");
  imgNeptune = loadImage("planets/Neptune.png");
  imgJupiter = loadImage("planets/Jupiter.png");
  imgMars = loadImage("planets/Mars.png");
  imgMercury = loadImage("planets/Mercury.png");
  imgPluto = loadImage("planets/Pluto.png");
  imgSaturn = loadImage("planets/Saturn.png");
  imgSky = loadImage("planets/sky2.jpg");
  imgSun = loadImage("planets/Sun.png");
  imgVenus = loadImage("planets/Venus.png");
  imgUranus = loadImage("planets/Uranus.png");
}
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
function draw() {
  var resizeImgW = 0;
  var resizeImgH = 0;
  resizeImgW = resizeImgS(1920, 1080, width, height)[0];
  resizeImgH = resizeImgS(1920, 1080, width, height)[1];
  imageMode(CORNER);
  image(imgSky, 0, 0, resizeImgW, resizeImgH);
  resizeImgW = resizeImgS(1042, 1042, width * 0.07, height * 0.07)[0];
  resizeImgH = resizeImgS(1042, 1042, width * 0.07, height * 0.07)[1];
  imageMode(CENTER);
  image(imgSun, width / 2, height / 2, resizeImgW, resizeImgH);
  for (i = 1; i <= 8; i++) {
    drawTracks(i);
  }
  v0 = createVector(width / 2, height / 2);
  v1 = createVector(1000 * tracksOffset * 1, 0);
  drawPlanet(v0, v1.rotate(angle1), imgMercury, 888, 888, 0.02);
  angle1 += 0.01;
  v0 = createVector(width / 2, height / 2);
  v1 = createVector(1000 * tracksOffset * 1.5, 0);
  if (mouseIsPressed && mouseInBoundary()) {
    drawVenus = true;
  }
  if (mouseIsPressed && !mouseInBoundary()) {
    drawVenus = false;
  }
  if (drawVenus) {
    drawPlanet(v0, v1.rotate(angle2), imgVenus, 938, 938, 0.02);
    angle2 += 0.01;
  }
}
function mouseInBoundary() {
  if ((mouseX - width / 2) * (mouseX - width / 2) + (mouseY - height / 2) * (mouseY - height / 2) <= 1.5 * 1.5 * 1000 * tracksOffset * 1000 * tracksOffset) {
    return true;
  } else {
    return false;
  }
}
function drawTracks(num) {
  resizeImgW = resizeImgS(1042, 1042, width * 0.07, height * 0.07)[0];
  resizeImgH = resizeImgS(1042, 1042, width * 0.07, height * 0.07)[1];
  tracksOffset = resizeImgS(1042, 1042, width * 0.07, height * 0.07)[2];
  noFill();
  stroke(255, 50);
  ellipse(width / 2, height / 2, resizeImgW + num * 1000 * tracksOffset, resizeImgH + num * 1000 * tracksOffset);
}
function drawPlanet(base, vec, myImg, imgW, imgH, sca) {
  push();
  translate(base.x, base.y);
  rotate(vec.heading());
  resizeImgW = resizeImgS(imgW, imgH, width * sca, height * sca)[0];
  resizeImgH = resizeImgS(imgW, imgH, width * sca, height * sca)[1];
  image(myImg, vec.x, vec.y, resizeImgW, resizeImgH);
  pop();
}
function resizeImgL(imgW, imgH, currentW, currentH) {
  var ratio = 0;
  if (imgW / imgH >= currentW / currentH) {
    ratio = currentW / imgW;
    return ([imgW * ratio, imgH * ratio, ratio]);
  } else if (imgW / imgH < currentW / currentH) {
    ratio = currentH / imgH;
    return ([imgW * ratio, imgH * ratio, ratio]);
  }
}
function resizeImgS(imgW, imgH, currentW, currentH) {
  var ratio = 0;
  if (imgW / imgH >= currentW / currentH) {
    ratio = currentH / imgH;
    return ([imgW * ratio, imgH * ratio, ratio]);
  } else if (imgW / imgH < currentW / currentH) {
    ratio = currentW / imgW;
    return ([imgW * ratio, imgH * ratio, ratio]);
  }
}let lstm;
let textInput;
let lengthSlider;
let tempSlider;
let button;
function setup() {
 
  
  
  noCanvas();
  textInput = select('#textInput');
  lengthSlider = select('#lenSlider');
  tempSlider = select('#tempSlider');
  button = select('#generate');
  button.mousePressed(generate);
  lengthSlider.input(updateSliders);
  tempSlider.input(updateSliders);
}
function updateSliders() {
  select('#length').html(lengthSlider.value());
  select('#temperature').html(tempSlider.value());
}
function modelReady() {
  select('#status').html('Model Loaded');
}
function generate() {
  select('#status').html('Generating...');
  let original = textInput.value();
  let txt = original.toLowerCase();
  if (txt.length > 0) {
    let data = {
      seed: txt,
      temperature: tempSlider.value(),
      length: lengthSlider.value()
    };
    lstm.generate(data, gotData);
    function gotData(err, result) {
      select('#status').html('Ready!');
      select('#result').html(txt + result);
    }
  }
}
 
 
 for (var i = 0; i < portList.length; i++) {
 }
}function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
}
semetic versionsing
LSTM, going more charactors
glitch
let video;
let poseNet;
let poses = [];
let mouseWidth = 0, mouseHeight = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(600, 480);
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', function(results) {
    poses = results;
  });
  video.hide();
}
function modelReady() {
  select('#status').html('Model Loaded');
}
function draw() {
  background (220);
  drawKeypoints();
}
function drawKeypoints()  {
  for (let i = 0; i < poses.length; i++) {
    
    let pose = poses[i].pose;
    let nose;
    let leftEye;
    let rightEye;
    let leftShoulder;
    let rightShoulder;
    
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      if (keypoint.score > 0.2) {
        switch (j) {
          case 0:
            nose = keypoint;
            break;
          case 1:
            leftEye = keypoint;
            break;
          case 2:
            rightEye = keypoint;
            break;
          case 5:
            leftShoulder = keypoint;
            break;
          case 6:
            rightShoulder = keypoint;
            break;
        }
        
        if (nose && leftShoulder && rightShoulder) {
          fill(206,122,33);
          noStroke();
          beginShape();
          curveVertex(rightShoulder.position.x ,rightShoulder.position.y);
          curveVertex(rightShoulder.position.x ,rightShoulder.position.y);
          curveVertex(nose.position.x - 100 ,nose.position.y - 110);
          curveVertex(nose.position.x + 80 ,nose.position.y - 110);
          curveVertex(leftShoulder.position.x ,leftShoulder.position.y);
          curveVertex(leftShoulder.position.x,leftShoulder.position.y);
          endShape();
          
          fill(238,179,72);
          beginShape();
          curveVertex(rightShoulder.position.x + 30,rightShoulder.position.y);
          curveVertex(rightShoulder.position.x + 30,rightShoulder.position.y);
          curveVertex(nose.position.x - 80 ,nose.position.y - 110);
          curveVertex(nose.position.x + 80 ,nose.position.y - 110);
          curveVertex(leftShoulder.position.x ,leftShoulder.position.y);
          curveVertex(leftShoulder.position.x,leftShoulder.position.y);
          endShape();
          
          noFill();
          stroke(0);
          strokeWeight(3);
          arc(nose.position.x ,nose.position.y, 30 + mouseWidth, 20 + mouseHeight, 0, PI);
          mouseWidth +=0.5; mouseHeight-= 0.01;
            if (mouseWidth >= 55) {
              mouseWidth = 0;
              mouseHeight = 0;
            } 
         }
       }
       else if (nose && !leftShoulder && !rightShoulder) {
          drawShoulder(nose.position.x ,nose.position.y);
          noFill();
          stroke(0);
          strokeWeight(3);
          arc(nose.position.x ,nose.position.y, 30 + mouseWidth, 20 + mouseHeight, 0, PI);
          mouseWidth +=0.5; mouseHeight-= 0.01;
            if (mouseWidth >= 55) {
              mouseWidth = 0;
              mouseHeight = 0;
            }
         }  
          
        
        if (leftEye) {
        fill(255);
        noStroke();  
        ellipse(leftEye.position.x, leftEye.position.y, 30, 30);
        fill(0);
        ellipse(leftEye.position.x, leftEye.position.y, 10, 13);
        rect (leftEye.position.x - 10, leftEye.position.y - 40, 15, 3);
      }
        if (rightEye) {
        fill(255);
        noStroke();  
        ellipse(rightEye.position.x, rightEye.position.y, 30, 30);
        fill(0);
        ellipse(rightEye.position.x, rightEye.position.y, 10, 13);
        rect (rightEye.position.x - 10, rightEye.position.y - 40, 15, 3);
          
      }
        
    }
  
  }
}
function drawShoulder(x,y) {
          this.x = x;
          this.y = y;
          fill(206,122,33);
          noStroke();
          beginShape();
          curveVertex(this.x - 150  ,this.y + 150);
          curveVertex(this.x - 150,this.y + 150);
          curveVertex(this.x - 100 ,this.y - 110);
          curveVertex(this.x + 80 ,this.y - 110);
          curveVertex(this.x + 150 ,this.y + 150);
          curveVertex(this.x + 150 ,this.y + 150);
          endShape();
          
          fill(238,179,72);
          beginShape();
          curveVertex(this.x - 130,this.y + 150);
          curveVertex(this.x - 130,this.y +150);
          curveVertex(this.x - 80 ,this.y - 110);
          curveVertex(this.x + 80 ,this.y - 110);
          curveVertex(this.x + 150 ,this.y + 150);
          curveVertex(this.x + 150,this.y + 150);
          endShape();
}
function drawSkeleton() {
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}let planet = [];
let blackhole;
let radius = 20;
let starCount = 50;
let canvasSize = 500;
function setup() {
  createCanvas(canvasSize, canvasSize);
  pixelDensity(1);
  renderBuffer = createGraphics(canvasSize, canvasSize);
  renderBuffer.pixelDensity(1);
  blackhole = new Blackhole(radius);
  for (i = 0; i < starCount; i++) {
    let x = random(width);
    let y = random(height);
    let xspeed = random(-1, 1) / 2;
    let yspeed = random(-1, 1) / 2;
    let o = random(50, 800);
    let p = random(200, 800);
    let r = random(50, 255);
    let g = random(50, 255);
    let b = random(50, 255);
    planet[i] = new Planet(x, y, xspeed, yspeed, o, p, r, g, b, renderBuffer);
  }
}
function draw() {
  renderBuffer.background(bg);
  for (i = 0; i < planet.length; i++) {
    planet[i].run()
    if (i > planet.length / 4) {
      planet[i].showbelt()
      if (i > planet.length / 1.2) {
        planet[i].show2belt()
      }
    }
    if (planet[i].isNear(mouseX, mouseY, radius / 2.5)) {
      planet.splice(i, 1);
      radius += 2;
      blackhole.size += 2;
    }
  }
  loadPixels();
  renderBuffer.loadPixels();
  for (i = 0; i < canvasSize; i++) {
    for (j = 0; j < canvasSize; j++) {
      currentPixel = (i * canvasSize + j) * 4;
      distance = pixelMouseDist(j, i);
      if (distance < radius - 20) {
        pixels[currentPixel] = 0;
        pixels[currentPixel + 1] = 0;
        pixels[currentPixel + 2] = 0;
        pixels[currentPixel + 3] = 255;
      } else if (distance < radius) {
        let value = map(distance, radius, radius - 20, bg, 0);
        pixels[currentPixel] = value;
        pixels[currentPixel + 1] = value;
        pixels[currentPixel + 2] = value;
        pixels[currentPixel + 3] = 255;
      } else if (distance > radius + 20) {
        pixels[currentPixel] = renderBuffer.pixels[currentPixel];
        pixels[currentPixel + 1] = renderBuffer.pixels[currentPixel + 1];
        pixels[currentPixel + 2] = renderBuffer.pixels[currentPixel + 2];
        pixels[currentPixel + 3] = 255;
      } else {
        newVec = circularWarp(j, i, radius, 20);
        newPixel = (round(newVec.y) * canvasSize + round(newVec.x)) * 4;
        pixels[currentPixel] = renderBuffer.pixels[newPixel];
        pixels[currentPixel + 1] = renderBuffer.pixels[newPixel + 1];
        pixels[currentPixel + 2] = renderBuffer.pixels[newPixel + 2];
        pixels[currentPixel + 3] = 255;
      }
    }
  }
  updatePixels();
  blackhole.draw();
  if (radius >= 2 * starCount + 20) {
    text("Universe is Destroyed", width / 2, height / 2)
  }
}
function pixelMouseDist(x, y) {
  return sqrt((x - mouseX) * (x - mouseX) + (y - mouseY) * (y - mouseY));
}
function circularWarp(x, y, r, f) {
  O = createVector(mouseX, mouseY);
  X = createVector(x, y);
  R = p5.Vector.add(O, p5.Vector.mult(p5.Vector.sub(X, O), r / p5.Vector.mag(p5.Vector.sub(X, O))));
  return p5.Vector.add(p5.Vector.mult(p5.Vector.sub(X, R), 1+ r / f), O);
}let video;
let img;
let poseNet;
let startingPoints = [];
let sliceWidthInto = 6;
let sliceHeightInto = 4;
let poseIndex = 0;
let option = {
  imageScaleFactor: 0.3,
  outputStride: 16,
  flipHorizontal: true,
  minConfidence: 0.5,
  maxPoseDetections: 5,
  scoreThreshold: 0.5,
  nmsRadius: 20,
  detectionType: 'single',
  multiplier: 0.75,
}
let middleShoulderY;
let middleHipX;
let middleHipY;
function setup() {
  createCanvas(1400, 800);
  let videoWidth = width / sliceWidthInto * precisionRatio;
  let videoHeight = height / sliceHeightInto * precisionRatio;
  for (j = 0; j < height; j += height / sliceHeightInto) {
    for (i = 0; i < width; i += width / sliceWidthInto) {
      startingPoints.push([i, j]);
    }
  }
  video = createCapture(VIDEO);
  video.size(videoWidth, videoHeight);
  img = loadImage('a.png');
  poseNet = ml5.poseNet(video, option, modelReady);
  poseNet.detectionType = 'single';
  poseNet.on('pose', function(results) {
    newPoses = results;
  });
  video.hide();
  frameRate(20)
}
function modelReady(result) {
  poseNetReady = true;
}
function draw() {
  updatePose();
  drawPose();
}
function updatePose() {
  if (totalPoses.length < sliceWidthInto * sliceHeightInto) {
    totalPoses.push(newPoses);
  } else {
    if (poseIndex == sliceWidthInto * sliceHeightInto) {
      totalPoses[0] = newPoses;
      poseIndex = 0;
    } else {
      totalPoses[poseIndex] = newPoses;
      poseIndex++;
    }
  }
}
function drawPose() {
  background(255);
  if (poseNetReady) {
    for (let k = 0; k < totalPoses.length; k++) {
      drawKeypoints(startingPoints[k], totalPoses[k]);
      drawSkeleton(startingPoints[k], totalPoses[k]);
    }
  }
}
function drawKeypoints(startingPoint, poses) {
  for (let i = 0; i < poses.length; i++) {
    let pose = simplifyPose(poses[i].pose);
    let nose;
    let leftEye;
    let rightEye;
    let leftEar;
    let rightEar;
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      if (keypoint.score > 0.2) {
        switch (j) {
          case 0:
            nose = keypoint;
            break;
          case 1:
            leftEye = keypoint;
            break;
          case 2:
            rightEye = keypoint;
            break;
          case 3:
            leftEar = keypoint;
            break;
          case 4:
            rightEye = keypoint;
            break;
        }
      }
    }
    if (nose) {
      fill(80);
      noStroke();
      ellipse(startingPoint[0] + nose.position.x / precisionRatio, startingPoint[1] + nose.position.y / precisionRatio, 30, 30);
      fill(150);
      arc(startingPoint[0] + nose.position.x / precisionRatio, startingPoint[1] + nose.position.y / precisionRatio - 6, 30, 30, PI, TWO_PI);
      ellipse(startingPoint[0] + nose.position.x / precisionRatio - 10, startingPoint[1] + nose.position.y / precisionRatio - 6, 40, 5);
    }
  }
}
function drawSkeleton(startingPoint, poses) {
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(80);
      line(startingPoint[0] + partA.position.x / precisionRatio, startingPoint[1] + partA.position.y / precisionRatio, startingPoint[0] + partB.position.x / precisionRatio, startingPoint[1] + partB.position.y / precisionRatio);
    }
  }
}
function simplifyPose(pose) {
  let rightShoulder;
  let leftShoulder;
  let rightHip;
  let leftHip;
  for (let i = 0; i < pose.keypoints.length; i++) {
    let keypoint = pose.keypoints[i];
    switch (keypoint.part) {
      case "rightShoulder":
        rightShoulder = keypoint;
        break;
      case "leftShoulder":
        leftShoulder = keypoint;
        break;
      case "rightHip":
        rightHip = keypoint;
        break;
      case "leftHip":
        leftHip = keypoint;
        break;
      default:
    }
  }
  if (rightShoulder && leftShoulder) {
    middleShoulderX = (rightShoulder.position.x + leftShoulder.position.x) / 2;
    middleShoulderY = (rightShoulder.position.y + leftShoulder.position.y) / 2;
    rightShoulder.position.x = middleShoulderX;
    rightShoulder.position.y = middleShoulderY;
    leftShoulder.position.x = middleShoulderX;
    leftShoulder.position.y = middleShoulderY;
  }
  if (rightHip && leftHip) {
    middleHipX = (rightHip.position.x + leftHip.position.x) / 2;
    middleHipY = (rightHip.position.y + leftHip.position.y) / 2;
    rightHip.position.x = middleHipX;
    rightHip.position.y = middleHipY;
    leftHip.position.x = middleHipX;
    leftHip.position.y = middleHipY;
  }
  return pose;
}let video;
let img;
let poseNet;
let newPoses = [];
let totalPoses = [];
let startingPoints = [];
let sliceWidthInto = 10;
let sliceHeightInto = 4;
let poseIndex = 0;
let option = {
  imageScaleFactor: 0.3,
  outputStride: 16,
  flipHorizontal: true,
  minConfidence: 0.5,
  maxPoseDetections: 5,
  scoreThreshold: 0.5,
  nmsRadius: 20,
  detectionType: 'single',
  multiplier: 0.75,
}
let middleShoulderX;
let middleShoulderY;
let middleHipX;
let middleHipY;
function setup() {
  createCanvas(1400, 800);
  let videoWidth = width / sliceWidthInto * precisionRatio;
  let videoHeight = height / sliceHeightInto * precisionRatio;
  for (j = 0; j < height; j += height / sliceHeightInto) {
    for (i = 0; i < width; i += width / sliceWidthInto) {
      startingPoints.push([i, j]);
    }
  }
  video = createCapture(VIDEO);
  video.size(videoWidth, videoHeight);
  img = loadImage('a.png');
  poseNet = ml5.poseNet(video, option, modelReady);
  poseNet.detectionType = 'single';
  poseNet.on('pose', function(results) {
    newPoses = results;
  });
  video.hide();
  setInterval(updatePose, 500 / sliceWidthInto);
  setInterval(drawPose, 500 / sliceWidthInto);
}
function modelReady() {
  poseNetReady = true;
}
function draw() {
}
function updatePose() {
  if (totalPoses.length < sliceWidthInto * sliceHeightInto) {
    totalPoses.push(newPoses);
  } else {
    if (poseIndex == sliceWidthInto * sliceHeightInto) {
      totalPoses[0] = newPoses;
      poseIndex = 0;
    } else {
      totalPoses[poseIndex] = newPoses;
      poseIndex++;
    }
  }
}
function drawPose() {
  background(255);
  if (poseNetReady) {
    for (let k = 0; k < totalPoses.length; k++) {
      drawKeypoints(startingPoints[k], totalPoses[k]);
      drawSkeleton(startingPoints[k], totalPoses[k]);
    }
  }
}
function drawKeypoints(startingPoint, poses) {
  for (let i = 0; i < poses.length; i++) {
    let pose = simplifyPose(poses[i].pose);
    let nose;
    let leftEye;
    let rightEye;
    let leftEar;
    let rightEar;
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      if (keypoint.score > 0.2) {
        switch (j) {
          case 0:
            nose = keypoint;
            break;
          case 1:
            leftEye = keypoint;
            break;
          case 2:
            rightEye = keypoint;
            break;
          case 3:
            leftEar = keypoint;
            break;
          case 4:
            rightEye = keypoint;
            break;
        }
      }
    }
		
    face(startingPoint[0] + nose.position.x / precisionRatio, startingPoint[1] + nose.position.y / precisionRatio);
      
  }
}
function drawSkeleton(startingPoint, poses) {
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(80);
      line(startingPoint[0] + partA.position.x / precisionRatio, startingPoint[1] + partA.position.y / precisionRatio, startingPoint[0] + partB.position.x / precisionRatio, startingPoint[1] + partB.position.y / precisionRatio);
    }
  }
}
function simplifyPose(pose) {
  let rightShoulder;
  let leftShoulder;
  let rightHip;
  let leftHip;
  for (let i = 0; i < pose.keypoints.length; i++) {
    let keypoint = pose.keypoints[i];
    switch (keypoint.part) {
      case "rightShoulder":
        rightShoulder = keypoint;
        break;
      case "leftShoulder":
        leftShoulder = keypoint;
        break;
      case "rightHip":
        rightHip = keypoint;
        break;
      case "leftHip":
        leftHip = keypoint;
        break;
      default:
    }
  }
  if (rightShoulder && leftShoulder) {
    middleShoulderX = (rightShoulder.position.x + leftShoulder.position.x) / 2;
    middleShoulderY = (rightShoulder.position.y + leftShoulder.position.y) / 2;
    rightShoulder.position.x = middleShoulderX;
    rightShoulder.position.y = middleShoulderY;
    leftShoulder.position.x = middleShoulderX;
    leftShoulder.position.y = middleShoulderY;
  }
  if (rightHip && leftHip) {
    middleHipX = (rightHip.position.x + leftHip.position.x) / 2;
    middleHipY = (rightHip.position.y + leftHip.position.y) / 2;
    rightHip.position.x = middleHipX;
    rightHip.position.y = middleHipY;
    leftHip.position.x = middleHipX;
    leftHip.position.y = middleHipY;
  }
  return pose;
}
function face(i, j) {
  let x = 200;
  let y = 200;
  ellipseMode(CENTER);
  strokeWeight(1);
  stroke(0);
  fill(66, 191, 244);
  ellipse(i / 2, j / 2, x / 3, x / 3);
  noStroke();
  fill(255);
  ellipse((i / 3) + (i / 36), (j / 2) - (j / 10), x / 15, x / 50);
  ellipse(((i / 3) + (i / 36) + (i / 10)), (j / 2) - (j / 10), x / 15, x / 50);
  fill(0);
  ellipse((i / 3) + (i / 36), (j / 2) - (j / 10), x / 60, x / 60);
  ellipse(((i / 3) + (i / 36) + (i / 10)), (j / 2) - (j / 10), x / 60, x / 60);
	stroke(0, 119, 255);
	noFill();
  strokeWeight(5);
  stroke(255, 0, 135);
  fill(0);
  ellipse(((i / 3) + (i / 36) + (i / 30)), ((j / 2) + (j / 7)), width / 10, (width / 30) - (width / 80));
  angleMode(DEGREES);
  noFill();
  stroke(0, 119, 255);
  strokeWeight(1);
  arc((i / 2) - (i / 10), (j / 2) - (j / 100), x / 40, (x / 40) + (x / 50), 0, -120);
}let video;
let img;
let poseNet;
let startingPoints = [];
let sliceWidthInto = 4;
let sliceHeightInto = 4;
let poseIndex = 0;
let option = {
  imageScaleFactor: 0.3,
  outputStride: 16,
  flipHorizontal: true,
  minConfidence: 0.5,
  maxPoseDetections: 5,
  scoreThreshold: 0.5,
  nmsRadius: 20,
  detectionType: 'single',
  multiplier: 0.75,
}
let middleShoulderY;
let middleHipX;
let middleHipY;
function setup() {
  createCanvas(1000, 800);
  let videoWidth = width / sliceWidthInto * precisionRatio;
  let videoHeight = height / sliceHeightInto * precisionRatio;
  for (j = 0; j < height; j += height / sliceHeightInto) {
    for (i = 0; i < width; i += width / sliceWidthInto) {
      startingPoints.push([i, j]);
    }
  }
  video = createCapture(VIDEO);
  video.size(videoWidth, videoHeight);
  
  poseNet = ml5.poseNet(video, option, modelReady);
  poseNet.detectionType = 'single';
  poseNet.on('pose', function(results) {
    newPoses = results;
  });
  video.hide();
  setInterval(updatePose, 500 / sliceWidthInto);
  setInterval(drawPose, 500 / sliceWidthInto);
}
function modelReady() {
  poseNetReady = true;
}
function draw() {
}
function updatePose() {
  if (totalPoses.length < sliceWidthInto * sliceHeightInto) {
    totalPoses.push(newPoses);
  } else {
    if (poseIndex == sliceWidthInto * sliceHeightInto) {
      totalPoses[0] = newPoses;
      poseIndex = 0;
    } else {
      totalPoses[poseIndex] = newPoses;
      poseIndex++;
    }
  }
}
function drawPose() {
  background(255);
  if (poseNetReady) {
    for (let k = 0; k < totalPoses.length; k++) {
      drawKeypoints(startingPoints[k], totalPoses[k]);
      drawSkeleton(startingPoints[k], totalPoses[k]);
    }
  }
}
function drawKeypoints(startingPoint, poses) {
  for (let i = 0; i < poses.length; i++) {
    let pose = simplifyPose(poses[i].pose);
    let nose;
    let leftEye;
    let rightEye;
    let leftEar;
    let rightEar;
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      if (keypoint.score > 0.2) {
        switch (j) {
          case 0:
            nose = keypoint;
            break;
          case 1:
            leftEye = keypoint;
            break;
          case 2:
            rightEye = keypoint;
            break;
          case 3:
            leftEar = keypoint;
            break;
          case 4:
            rightEar = keypoint;
            break;
        }
      }
    }
    if (nose) {
      fill(80);
      noStroke();
      ellipse(startingPoint[0] + nose.position.x / precisionRatio, startingPoint[1] + nose.position.y / precisionRatio, 30, 30);
      fill(150);
      arc(startingPoint[0] + nose.position.x / precisionRatio, startingPoint[1] + nose.position.y / precisionRatio - 6, 30, 30, PI, TWO_PI);
      ellipse(startingPoint[0] + nose.position.x / precisionRatio - 10, startingPoint[1] + nose.position.y / precisionRatio - 6, 40, 5);
    }
  }
}
function drawSkeleton(startingPoint, poses) {
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(80);
      line(startingPoint[0] + partA.position.x / precisionRatio, startingPoint[1] + partA.position.y / precisionRatio, startingPoint[0] + partB.position.x / precisionRatio, startingPoint[1] + partB.position.y / precisionRatio);
    }
  }
}
function simplifyPose(pose) {
  let rightShoulder;
  let leftShoulder;
  let rightHip;
  let leftHip;
  for (let i = 0; i < pose.keypoints.length; i++) {
    let keypoint = pose.keypoints[i];
    switch (keypoint.part) {
      case "rightShoulder":
        rightShoulder = keypoint;
        break;
      case "leftShoulder":
        leftShoulder = keypoint;
        break;
      case "rightHip":
        rightHip = keypoint;
        break;
      case "leftHip":
        leftHip = keypoint;
        break;
      default:
    }
  }
  if (rightShoulder && leftShoulder) {
    middleShoulderX = (rightShoulder.position.x + leftShoulder.position.x) / 2;
    middleShoulderY = (rightShoulder.position.y + leftShoulder.position.y) / 2;
    rightShoulder.position.x = middleShoulderX;
    rightShoulder.position.y = middleShoulderY;
    leftShoulder.position.x = middleShoulderX;
    leftShoulder.position.y = middleShoulderY;
  }
  if (rightHip && leftHip) {
    middleHipX = (rightHip.position.x + leftHip.position.x) / 2;
    middleHipY = (rightHip.position.y + leftHip.position.y) / 2;
    rightHip.position.x = middleHipX;
    rightHip.position.y = middleHipY;
    leftHip.position.x = middleHipX;
    leftHip.position.y = middleHipY;
  }
  return pose;
}let video;
let poseNet;
let poses = [];
function setup() {
  createCanvas(300, 240);
  video = createCapture(VIDEO);
  video.size(width, height);
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.detectionType = 'single';
  poseNet.on('pose', function(results) {
    poses = results;
  });
  video.hide();
}
function modelReady() {
  select('#status').html('Model Loaded');
}
function draw() {
  image(video, 0, 0, width, height);
  drawKeypoints();
  drawSkeleton();
}
function drawKeypoints()  {
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
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}let video;
let img;
let poseNet;
let poses = [];
let startingPoints = [];
let sliceIntoNumber = 1;
let middleShoulderX;
let middleShoulderY;
let middleHipX;
let middleHipY;
function setup() {
  createCanvas(600, 480);
  let videoWidth = width / sliceIntoNumber;
  let videoHeight = height / sliceIntoNumber;
  for (i = 0; i < width; i += width / sliceIntoNumber) {
    for (j = 0; j < height; j += height / sliceIntoNumber) {
      startingPoints.push([i, j]);
    }
  }
  video = createCapture(VIDEO);
  video.size(videoWidth, videoHeight);
  img = loadImage('a.png');
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.detectionType = 'single';
  poseNet.on('pose', function(results) {
    poses = results;
  });
  video.hide();
}
function modelReady() {
  select('#status').html('Model Loaded');
}
function draw() {
  image(video, 0, 0, width, height);
  for (i = 0; i < startingPoints.length; i++) {
    drawKeypoints(startingPoints[i]);
    drawSkeleton(startingPoints[i]);
  }
}
function drawKeypoints(startingPoint) {
  for (let i = 0; i < poses.length; i++) {
    
    let pose = simplifyPose(poses[i].pose);
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(startingPoint[0] + keypoint.position.x, startingPoint[1] + keypoint.position.y, 10, 10);
      }
    }
  }
}
function drawSkeleton(startingPoint) {
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(startingPoint[0] + partA.position.x, startingPoint[1] + partA.position.y, startingPoint[0] + partB.position.x, startingPoint[1] + partB.position.y);
    }
  }
}
function simplifyPose(pose) {
  let rightShoulder;
  let leftShoulder;
  let rightHip;
  let leftHip;
  for (let i = 0; i < pose.keypoints.length; i++) {
    let keypoint = pose.keypoints[i];
    switch (keypoint.part) {
      case "rightShoulder":
        rightShoulder = keypoint;
        break;
      case "leftShoulder":
        leftShoulder = keypoint;
        break;
      case "rightHip":
        rightHip = keypoint;
        break;
      case "leftHip":
        leftHip = keypoint;
        break;
      default:
    }
  }
  if (rightShoulder && leftShoulder) {
    middleShoulderX = (rightShoulder.position.x + leftShoulder.position.x) / 2;
    middleShoulderY = (rightShoulder.position.y + leftShoulder.position.y) / 2;
    rightShoulder.position.x = middleShoulderX;
    rightShoulder.position.y = middleShoulderY;
    leftShoulder.position.x = middleShoulderX;
    leftShoulder.position.y = middleShoulderY;
  }
  if (rightHip && leftHip) {
    middleHipX = (rightHip.position.x + leftHip.position.x) / 2;
    middleHipY = (rightHip.position.y + leftHip.position.y) / 2;
    rightHip.position.x = middleHipX;
    rightHip.position.y = middleHipY;
    leftHip.position.x = middleHipX;
    leftHip.position.y = middleHipY;
  }
  return pose;
}
function simplifySkeleton(pose) {
  for (let i = 0; i < pose.skeleton.length; i++) {
    let partA = pose.skeleton[i][0];
    let partB = pose.skeleton[i][1];
    switch (partA.part) {
      case "rightShoulder":
        partA.position.x = middleShoulderX;
        partA.position.y = middleShoulderY;
        break;
      case "leftShoulder":
        partA.position.x = middleShoulderX;
        partA.position.y = middleShoulderY;
        break;
      case "rightHip":
        partA.position.x = middleHipX;
        partA.position.y = middleHipY;
        break;
      case "leftHip":
        partA.position.x = middleHipX;
        partA.position.y = middleHipY;
        break;
      default:
    }
    switch (partB.part) {
      case "rightShoulder":
        partA.position.x = middleShoulderX;
        partA.position.y = middleShoulderY;
        break;
      case "leftShoulder":
        partA.position.x = middleShoulderX;
        partA.position.y = middleShoulderY;
        break;
      case "rightHip":
        partA.position.x = middleHipX;
        partA.position.y = middleHipY;
        break;
      case "leftHip":
        partA.position.x = middleHipX;
        partA.position.y = middleHipY;
        break;
      default:
    }
  }
}let balls = [];
function setup() {
  createCanvas(400, 400);
  for (let i = 0; i<100; i++) {
    let ball = new Ball(random(0,width), random(0, height), random(-0.5, 0.5), random(-0.5, 0.5), random(5,10));
    balls.push(ball);
  }
}
function draw() {
  background(220);
  
  balls.forEach( i => {
    i.move();
    i.display();
  });
  
  
  for (let i=0; i<balls.length; i++) {
    for (let j=i+1; j<balls.length; j++){
      if (dist(balls[i].x, balls[i].y, balls[j].x, balls[j].y) < balls[i].r + balls[j].r) {
        balls.splice(j, 1);
        balls.splice(i, 1);
      }
    }
  }
}let balls = [];
function setup() {
  createCanvas(400, 400);
  for (let i = 0; i<100; i++) {
    let ball = new Ball(width/2, height/2, random(-1, 1), random(-1, 1), random(5,10));
    balls.push(ball);
  }
}
function draw() {
  background(220);
  
  balls.forEach( i => {
    i.move();
    i.display();
    if(dist(mouseX, mouseY, i.x, i.y) <= i.r) {balls.splice(balls.indexOf(i),1);}
  });
}let balls = [];
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  if (mouseIsPressed) {
    let ball = new Ball(mouseX,mouseY, random(-1, 1), random(-1, 1), random(5,10));
    balls.push(ball);
  }
  
  balls.forEach( i => { i.move(); i.display();} );
}function setup() {
  createCanvas(400, 400);
  
}
function draw() {
  background(220);
  text("anser: " + add(1,2), 10, 10);
}
function add(num1, num2){
  return num1 + num2;
let origImg;
let paletteClrs = [[211, 157, 226],
                   [51, 218, 71],
                   [142, 38, 172],
                   [61, 45, 66],
                   [81, 66, 85],
                   [244, 235, 66]];
function preload() {
  origImg = loadImage(imgName);
}
function setup() {
  createCanvas(origImg.width, origImg.height);
  origImg.loadPixels();
  noLoop();
}
function draw() {
  let newImg1 = new EditedImage(origImg, convAlgorithm, paletteClrs);
  image(newImg1.convert(), 0, 0);
}
let origImg;
let paletteClr1 = [211, 157, 226];
let paletteClr2 = [51, 218, 71];
let paletteClr3 = [142, 38, 172];
let paletteClr4 = [61, 45, 66];
let paletteClr5 = [81, 66, 85];
function preload() {
  origImg = loadImage(imgName);
}
function setup() {
  createCanvas(origImg.width, origImg.height);
  origImg.loadPixels();
  noLoop();
}
function draw() {
  let newImg1 = new EditedImage5(origImg, convAlgorithm, paletteClr1, paletteClr2, paletteClr3, paletteClr4, paletteClr5);
  image(newImg1.convert(), 0, 0);
}
let origImg;
let imgName = '3.jpg';
let paletteClrNum = 5;
let paletteClr1 = [211, 157, 226];
let paletteClr2 = [51, 218, 71];
let paletteClr3 = [142, 38, 172];
let paletteClr4 = [61, 45, 66];
let paletteClr5 = [81, 66, 85];
function preload() {
  origImg = loadImage(imgName);
}
function setup() {
  createCanvas(origImg.width, origImg.height);
  origImg.loadPixels();
  noLoop();
}
function draw() {
  let newImg1 = new EditedImage5(origImg, paletteClr1, paletteClr2, paletteClr3, paletteClr4, paletteClr5);
  image(newImg1.convert(), 0, 0);
}
function rgb2lab(rgb) {
  var r = rgb[0] / 255,
    g = rgb[1] / 255,
    b = rgb[2] / 255,
    x, y, z;
  r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
  x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
  z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
  x = (x > 0.008856) ? Math.pow(x, 1 / 3) : (7.787 * x) + 16 / 116;
  y = (y > 0.008856) ? Math.pow(y, 1 / 3) : (7.787 * y) + 16 / 116;
  z = (z > 0.008856) ? Math.pow(z, 1 / 3) : (7.787 * z) + 16 / 116;
  return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
}
function getColorDist(rgb1, rgb2, algr) {
  if (algr == 'Euclidean') {
    let dr = rgb1[0] - rgb2[0];
    let da = rgb1[1] - rgb2[0];
    let db = rgb1[2] - rgb2[0];
    return sqrt(dr * dr + da * da + db * db);
  } else if (algr == 'CIE76') {
    let lab1 = rgb2lab(rgb1);
    let lab2 = rgb2lab(rgb2);
    let dL = lab1[0] - lab2[0];
    let da = lab1[1] - lab2[0];
    let db = lab1[2] - lab2[0];
    return sqrt(dL * dL + da * da + db * db);
  }
}
class EditedImage5 {
  constructor(originalImg, algorithm, clr1, clr2, clr3, clr4, clr5) {
    this.originalImg = originalImg;
    this.editedImg;
    this.algorithm = algorithm;
    this.clr1 = clr1;
    this.clr2 = clr2;
    this.clr3 = clr3;
    this.clr4 = clr4;
    this.clr5 = clr5;
  }
  convert() {
    this.editedImg = createImage(this.originalImg.width, this.originalImg.height);
    this.editedImg.loadPixels();
    for (let i = 0; i < this.originalImg.height; i++) {
      for (let j = 0; j < this.originalImg.width; j++) {
        let editedRed = this.originalImg.pixels[idx];
        let editedGreen = this.originalImg.pixels[idx + 1];
        let editedBlue = this.originalImg.pixels[idx + 2];
        let clrDists = [];
        clrDists.push(getColorDist(
          [this.originalImg.pixels[idx], this.originalImg.pixels[idx + 1], this.originalImg.pixels[idx + 2]], [this.clr1[0], this.clr1[1], this.clr1[2]],
          this.algorithm));
        clrDists.push(getColorDist(
          [this.originalImg.pixels[idx], this.originalImg.pixels[idx + 1], this.originalImg.pixels[idx + 2]], [this.clr2[0], this.clr2[1], this.clr2[2]],
          this.algorithm));
        clrDists.push(getColorDist(
          [this.originalImg.pixels[idx], this.originalImg.pixels[idx + 1], this.originalImg.pixels[idx + 2]], [this.clr3[0], this.clr3[1], this.clr3[2]],
          this.algorithm));
        clrDists.push(getColorDist(
          [this.originalImg.pixels[idx], this.originalImg.pixels[idx + 1], this.originalImg.pixels[idx + 2]], [this.clr4[0], this.clr4[1], this.clr4[2]],
          this.algorithm));
        clrDists.push(getColorDist(
          [this.originalImg.pixels[idx], this.originalImg.pixels[idx + 1], this.originalImg.pixels[idx + 2]], [this.clr5[0], this.clr5[1], this.clr5[2]],
          this.algorithm));
        let minDist = min(clrDists);
        switch (minDist) {
          case clrDists[0]:
            editedRed = this.clr1[0];
            editedGreen = this.clr1[1];
            editedBlue = this.clr1[2];
            break;
          case clrDists[1]:
            editedRed = this.clr2[0];
            editedGreen = this.clr2[1];
            editedBlue = this.clr2[2];
            break;
          case clrDists[2]:
            editedRed = this.clr3[0];
            editedGreen = this.clr3[1];
            editedBlue = this.clr3[2];
            break;
          case clrDists[3]:
            editedRed = this.clr4[0];
            editedGreen = this.clr4[1];
            editedBlue = this.clr4[2];
            break;
          case clrDists[4]:
            editedRed = this.clr5[0];
            editedGreen = this.clr5[1];
            editedBlue = this.clr5[2];
            break;
          default:
            editedRed = 0;
            editedGreen = 0;
            editedBlue = 0;
        }
        this.editedImg.pixels[idx] = editedRed;
        this.editedImg.pixels[idx + 1] = editedGreen;
        this.editedImg.pixels[idx + 2] = editedBlue;
        idx = idx + 4;
      }
    }
    this.editedImg.updatePixels();
    return this.editedImg;
  }
}
var img;
var clr=null;
var myColorPicker;
var canvas;
var filename;
var file_extension;
function preload() {
  img = loadImage("assets/2 Graffiti.jpg");
}
function color_distance(a, r, g, b) {
  var rr = (a[0] + r)/2;
  var dr = a[0] - r;
  var dg = a[1] - g;
  var db = a[2] - b;
  return sqrt(dr * dr + dg * dg + db * db);
}
function get_min_distance(r, g, b) {
  var min_distance = color_distance(clr[0], r, g, b);
  var set_to_color = 0;
  var current_distance;
  for (var i = 1; i < clr.length; i++) {
    current_distance = color_distance(clr[i], r, g, b);
    if (current_distance < min_distance) {
      min_distance = current_distance;
      set_to_color = i;
    }
  }
  return set_to_color;
}
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var a = [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    return a
}
function setup() {
  canvas = createCanvas(img.width, img.height*2);
  myColorPicker = document.getElementById('colorPicker');
  myColorPicker.addEventListener("change",function(){
    console.log("1");
    clr[0] = hexToRgb(colorPicker.value)
    console.log(clr[0]);
    show_image();
    })
  myColorPicker2 = document.getElementById('colorPicker2');
  myColorPicker2.addEventListener("change",function(){
    console.log("2");
    clr[1] = hexToRgb(colorPicker2.value)
    console.log(clr[1]);
    show_image();
    })
  myColorPicker3 = document.getElementById('colorPicker3');
  myColorPicker3.addEventListener("change",function(){
    console.log("3");
    clr[2] = hexToRgb(colorPicker3.value)
    console.log(clr[2]);
    show_image();
    })
  myColorPicker4 = document.getElementById('colorPicker4');
  myColorPicker4.addEventListener("change",function(){
    console.log("4");
    clr[3] = hexToRgb(colorPicker4.value)
    console.log(clr[3]);
    show_image();
    })
  myColorPicker5 = document.getElementById('colorPicker5');
  myColorPicker5.addEventListener("change",function(){
    console.log("5");
    console.log(colorPicker5.value);
    clr[4] = hexToRgb(colorPicker5.value)
    console.log(clr[4]);
    show_image();
    })
  canvas.drop(gotFile);
  noLoop();
  
  
  
  var a = [255, 242, 206];
  var b = [255, 198, 42];
  var c = [198, 0, 254];
  var d = [165, 39, 200];
  var e = [148, 113, 159];
  
  
  var a = [211, 157, 226];
  var b = [51, 218, 71];
  var c = [142, 38, 172];
  var d = [61, 45, 66];
  var e = [81, 66, 85];
  clr = [
    a,
    b,
    c,
    d,
    e
  ];
  show_image();
}
function gotFile(file) {
  if (file.type === 'image') {
    filename = file.name;
    file_extension = file.subtype;
    console.log(filename);
    img =  createImg(file.data, "test", processFile).hide();
  } else {
    console.log('Not an image file!');
  }
}
function processFile() {
  image(img, 0, 0);
  show_image();
}
function show_image(){
  console.log(img.width, img.height);
  canvas = createCanvas(img.width, img.height*2);
  imageMode(CORNER);
  pixelDensity(1);
  background(255);
  image(img, 0, 0);
  loadPixels();
  var offset = +img.height*img.width*4;
  for (var y = 0; y < img.height; y++) {
    for (var x = 0; x < img.width; x++) {
      var index = (x + y * width)*4;
      var i = get_min_distance(pixels[index+0], pixels[index+1], pixels[index+2]);
      pixels[offset+index+0] = clr[i][0];
      pixels[offset+index+1] = clr[i][1];
      pixels[offset+index+2] = clr[i][2];
      pixels[offset+index+3] = 255;
    }
  }
  updatePixels();
  saveCanvas(filename, "jpg");
}
var img;
var clr=null;
var myColorPicker;
var canvas;
var filename;
var file_extension;
function preload() {
  img = loadImage("assets/woman_in_red.jpg");
}
function color_distance(a, r, g, b) {
  var rr = (a[0] + r)/2;
  var dr = a[0] - r;
  var dg = a[1] - g;
  var db = a[2] - b;
  return sqrt(dr * dr + dg * dg + db * db);
}
function get_min_distance(r, g, b) {
  var min_distance = color_distance(clr[0], r, g, b);
  var set_to_color = 0;
  var current_distance;
  for (var i = 1; i < clr.length; i++) {
    current_distance = color_distance(clr[i], r, g, b);
    if (current_distance < min_distance) {
      min_distance = current_distance;
      set_to_color = i;
    }
  }
  return set_to_color;
}
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var a = [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    return a
}
function setup() {
  canvas = createCanvas(img.width, img.height*2);
  myColorPicker = document.getElementById('colorPicker');
  myColorPicker.addEventListener("change",function(){
    console.log("1");
    clr[0] = hexToRgb(colorPicker.value)
    console.log(clr[0]);
    show_image();
    })
  myColorPicker2 = document.getElementById('colorPicker2');
  myColorPicker2.addEventListener("change",function(){
    console.log("2");
    clr[1] = hexToRgb(colorPicker2.value)
    console.log(clr[1]);
    show_image();
    })
  myColorPicker3 = document.getElementById('colorPicker3');
  myColorPicker3.addEventListener("change",function(){
    console.log("3");
    clr[2] = hexToRgb(colorPicker3.value)
    console.log(clr[2]);
    show_image();
    })
  myColorPicker4 = document.getElementById('colorPicker4');
  myColorPicker4.addEventListener("change",function(){
    console.log("4");
    clr[3] = hexToRgb(colorPicker4.value)
    console.log(clr[3]);
    show_image();
    })
  myColorPicker5 = document.getElementById('colorPicker5');
  myColorPicker5.addEventListener("change",function(){
    console.log("5");
    console.log(colorPicker5.value);
    clr[4] = hexToRgb(colorPicker5.value)
    console.log(clr[4]);
    show_image();
    })
  canvas.drop(gotFile);
  noLoop();
  var a = [29, 32, 33];
  var b = [110, 99, 98];
  var c = [127, 183, 190];
  var d = [241, 3, 106];
  var e = [245, 249, 233];
  clr = [
    a,
    b,
    c,
    d,
    e
  ];
  show_image();
}
function gotFile(file) {
  if (file.type === 'image') {
    filename = file.name;
    file_extension = file.subtype;
    console.log(filename);
    img =  createImg(file.data, "test", processFile).hide();
  } else {
    console.log('Not an image file!');
  }
}
function processFile() {
  image(img, 0, 0);
  show_image();
}
function show_image(){
  console.log(img.width, img.height);
  canvas = createCanvas(img.width, img.height*2);
  imageMode(CORNER);
  pixelDensity(1);
  background(255);
  image(img, 0, 0);
  loadPixels();
  var offset = +img.height*img.width*4;
  for (var y = 0; y < img.height; y++) {
    for (var x = 0; x < img.width; x++) {
      var index = (x + y * width)*4;
      var i = get_min_distance(pixels[index+0], pixels[index+1], pixels[index+2]);
      pixels[offset+index+0] = clr[i][0];
      pixels[offset+index+1] = clr[i][1];
      pixels[offset+index+2] = clr[i][2];
      pixels[offset+index+3] = 255;
    }
  }
  updatePixels();
  saveCanvas(filename, "jpg");
}
function setup() {
  createCanvas(400, 400);
  
    doSave(a, "text/latex", "mySensorData.txt");
}
function draw() {
  background(220);
}
function doSave(value, type, name) {
  var blob;
  if (typeof window.Blob == "function") {
    blob = new Blob([value], {
      type: type
    });
  } else {
    var BlobBuilder = window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder;
    var bb = new BlobBuilder();
    bb.append(value);
    blob = bb.getBlob(type);
  }
  var URL = window.URL || window.webkitURL;
  var bloburl = URL.createObjectURL(blob);
  var anchor = document.createElement("a");
  if ('download' in anchor) {
    anchor.style.visibility = "hidden";
    anchor.href = bloburl;
    anchor.download = name;
    document.body.appendChild(anchor);
    var evt = document.createEvent("MouseEvents");
    evt.initEvent("click", true, true);
    anchor.dispatchEvent(evt);
    document.body.removeChild(anchor);
  } else if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, name);
  } else {
    location.href = bloburl;
  }
}
var a = new Array();
for (var i = 0; i < 26; i++) {a.push(2); a.push(",")}
let dw;
let dh;
let button = false;
let l = 20;
let randomArray = [];
let color;
let x1;
let x2;
let y1;
let y2;
let p = 1;
function setup() {
  noCursor();
  dw = displayWidth;
  dh = displayHeight;
  createCanvas(dw, dh);
  let idx = 0;
  for (let w = 0; w < dw; w += l) {
    for (let h = 0; h < dh; h += l) {
      randomArray[idx] = random(1);
      idx++;
    }
  }
}
function draw() {
  color = {
    r: 0,
    g: map(mouseX, 0, dw, 70, 150),
    b: map(mouseY, 0, dh, 70, 200),
  }
  background(0);
  let idx = 0;
  for (let w = 0; w < dw; w += l) {
    for (let h = 0; h < dh; h += l) {
      if (randomArray[idx] < 0.5) {
        x1 = w;
        x2 = w;
        y1 = h;
        y2 = h + 11;
        if (dist(x1, y1, mouseX, mouseY) < 90) {
          stroke(color.r, color.g, color.b, 255);
        } else if (dist(x1, y1, mouseX, mouseY) < 95) {
          stroke(color.r, color.g, color.b, 150);
        } else if (dist(x1, y1, mouseX, mouseY) < 100) {
          stroke(color.r, color.g, color.b, 100);
        } else {
          stroke(color.r, color.g, color.b, 5);
        }
        line(x1, y1, x2, y2)
        x1 = w;
        x2 = w + l;
        y1 = h + 11;
        y2 = h + l;
        if (dist(x1, y1, mouseX, mouseY) < 90) {
          stroke(color.r, color.g, color.b, 255);
        } else if (dist(x1, y1, mouseX, mouseY) < 95) {
          stroke(color.r, color.g, color.b, 150);
        } else if (dist(x1, y1, mouseX, mouseY) < 100) {
          stroke(color.r, color.g, color.b, 100);
        } else {
          stroke(color.r, color.g, color.b, 5);
        }
        line(x1, y1, x2, y2)
      } else {
        x1 = w + l;
        x2 = w + l;
        y1 = h;
        y2 = h + 11;
        if (dist(x1, y1, mouseX, mouseY) < 90) {
          stroke(color.r, color.g, color.b, 255);
        } else if (dist(x1, y1, mouseX, mouseY) < 95) {
          stroke(color.r, color.g, color.b, 150);
        } else if (dist(x1, y1, mouseX, mouseY) < 100) {
          stroke(color.r, color.g, color.b, 100);
        } else {
          stroke(color.r, color.g, color.b, 5);
        }
        line(x1, y1, x2, y2)
        x1 = w + l;
        x2 = w;
        y1 = h + 11;
        y2 = h + l;
        if (dist(x1, y1, mouseX, mouseY) < 90) {
          stroke(color.r, color.g, color.b, 255);
        } else if (dist(x1, y1, mouseX, mouseY) < 95) {
          stroke(color.r, color.g, color.b, 150);
        } else if (dist(x1, y1, mouseX, mouseY) < 100) {
          stroke(color.r, color.g, color.b, 100);
        } else {
          stroke(color.r, color.g, color.b, 5);
        }
        line(x1, y1, x2, y2)
      }
      idx++;
    }
  }
  noStroke();
  fill(255, 5);
  ellipse(mouseX, mouseY, 205, 205);
}let dw;
let dh;
let button = false;
let l = 20;
let randomArray = [];
let color;
let x1;
let x2;
let y1;
let y2;
let p = 1;
function setup() {
  noCursor();
  dw = displayWidth;
  dh = displayHeight;
  createCanvas(dw, dh);
  let idx = 0;
  for (let w = 0; w < dw; w += l) {
    for (let h = 0; h < dh; h += l) {
      randomArray[idx] = random(1);
      idx++;
    }
  }
}
function draw() {
  color = {
    r: 0,
    g: map(mouseX, 0, dw, 70, 150),
    b: map(mouseY, 0, dh, 70, 200),
  }
  background(0);
  let idx = 0;
  for (let w = 0; w < dw; w += l) {
    for (let h = 0; h < dh; h += l) {
      if (randomArray[idx] < 0.5) {
        x1 = w;
        x2 = w + 12;
        y1 = h;
        y2 = h + 10;
        if (dist(x1, y1, mouseX, mouseY) < 90) {
          stroke(color.r, color.g, color.b, 255);
        } else if (dist(x1, y1, mouseX, mouseY) < 95) {
          stroke(color.r, color.g, color.b, 150);
        } else if (dist(x1, y1, mouseX, mouseY) < 100) {
          stroke(color.r, color.g, color.b, 100);
        } else {
          stroke(color.r, color.g, color.b, 5);
        }
        line(x1, y1, x2, y2)
        x1 = w;
        x2 = w + 12;
        y1 = h + 10;
        y2 = h + l;
        if (dist(x1, y1, mouseX, mouseY) < 90) {
          stroke(color.r, color.g, color.b, 255);
        } else if (dist(x1, y1, mouseX, mouseY) < 95) {
          stroke(color.r, color.g, color.b, 150);
        } else if (dist(x1, y1, mouseX, mouseY) < 100) {
          stroke(color.r, color.g, color.b, 100);
        } else {
          stroke(color.r, color.g, color.b, 5);
        }
        line(x1, y1, x2, y2)
      } else {
        x1 = w + 12;
        x2 = w + l;
        y1 = h;
        y2 = h + 16;
        if (dist(x1, y1, mouseX, mouseY) < 90) {
          stroke(color.r, color.g, color.b, 255);
        } else if (dist(x1, y1, mouseX, mouseY) < 95) {
          stroke(color.r, color.g, color.b, 150);
        } else if (dist(x1, y1, mouseX, mouseY) < 100) {
          stroke(color.r, color.g, color.b, 100);
        } else {
          stroke(color.r, color.g, color.b, 5);
        }
        line(x1, y1, x2, y2)
        x1 = w + l;
        x2 = w;
        y1 = h + 16;
        y2 = h + l;
        if (dist(x1, y1, mouseX, mouseY) < 90) {
          stroke(color.r, color.g, color.b, 255);
        } else if (dist(x1, y1, mouseX, mouseY) < 95) {
          stroke(color.r, color.g, color.b, 150);
        } else if (dist(x1, y1, mouseX, mouseY) < 100) {
          stroke(color.r, color.g, color.b, 100);
        } else {
          stroke(color.r, color.g, color.b, 5);
        }
        line(x1, y1, x2, y2)
      }
      idx++;
    }
  }
  noStroke();
  fill(255, 5);
  ellipse(mouseX, mouseY, 205, 205);
}let dw;
let dh;
let button = false;
let l = 20;
let randomArray = [];
let color;
let x1;
let x2;
let y1;
let y2;
let p = 1;
function setup() {
  noCursor();
  dw = displayWidth;
  dh = displayHeight;
  createCanvas(dw, dh);
  let idx = 0;
  for (let w = 0; w < dw; w += l) {
    for (let h = 0; h < dh; h += l) {
      randomArray[idx] = random(1);
      idx++;
    }
  }
}
function draw() {
  color = {
    r: 0,
    g: map(mouseX, 0, dw, 70, 150),
    b: map(mouseY, 0, dh, 70, 200),
  }
  background(0);
  let idx = 0;
  for (let w = 0; w < dw; w += l) {
    for (let h = 0; h < dh; h += l) {
      if (randomArray[idx] < 0.5) {
        x1 = w;
        x2 = w + 3;
        y1 = h;
        y2 = h + 10;
        if (dist(x1, y1, mouseX, mouseY) < 90) {
          stroke(color.r, color.g, color.b, 255);
        } else if (dist(x1, y1, mouseX, mouseY) < 95) {
          stroke(color.r, color.g, color.b, 150);
        } else if (dist(x1, y1, mouseX, mouseY) < 100) {
          stroke(color.r, color.g, color.b, 100);
        } else {
          stroke(color.r, color.g, color.b, 5);
        }
        line(x1, y1, x2, y2)
        x1 = w + 3;
        x2 = w + l;
        y1 = h + 10;
        y2 = h + l;
        if (dist(x1, y1, mouseX, mouseY) < 90) {
          stroke(color.r, color.g, color.b, 255);
        } else if (dist(x1, y1, mouseX, mouseY) < 95) {
          stroke(color.r, color.g, color.b, 150);
        } else if (dist(x1, y1, mouseX, mouseY) < 100) {
          stroke(color.r, color.g, color.b, 100);
        } else {
          stroke(color.r, color.g, color.b, 5);
        }
        line(x1, y1, x2, y2)
      } else {
        x1 = w + l;
        x2 = w + 12;
        y1 = h;
        y2 = h + 12;
        if (dist(x1, y1, mouseX, mouseY) < 90) {
          stroke(color.r, color.g, color.b, 255);
        } else if (dist(x1, y1, mouseX, mouseY) < 95) {
          stroke(color.r, color.g, color.b, 150);
        } else if (dist(x1, y1, mouseX, mouseY) < 100) {
          stroke(color.r, color.g, color.b, 100);
        } else {
          stroke(color.r, color.g, color.b, 5);
        }
        line(x1, y1, x2, y2)
        x1 = w + 12;
        x2 = w;
        y1 = h + 12;
        y2 = h + l;
        if (dist(x1, y1, mouseX, mouseY) < 90) {
          stroke(color.r, color.g, color.b, 255);
        } else if (dist(x1, y1, mouseX, mouseY) < 95) {
          stroke(color.r, color.g, color.b, 150);
        } else if (dist(x1, y1, mouseX, mouseY) < 100) {
          stroke(color.r, color.g, color.b, 100);
        } else {
          stroke(color.r, color.g, color.b, 5);
        }
        line(x1, y1, x2, y2)
      }
      idx++;
    }
  }
  noStroke();
  fill(255, 5);
  ellipse(mouseX, mouseY, 205, 205);
}let cred = true;
function setup() {
  createCanvas(400, 400);
  background(220);
  let count = 0;
  for (let i = 0; i < width; i += width / 10) {
    for (let j = 0; j < height; j += height / 10) {
      if (count % 2 == 0){
        fill(255);
      } else {
        fill(0);
      }
      rect(i, j, width / 10, height / 10);
      count++;
    }
    count++;
  }
}
function draw() {
}let cred = true;
function setup() {
  createCanvas(400, 400);
  background(220);
  for (let i = 0; i < width; i += width / 10) {
    for (let j = 0; j < height; j += height / 10) {
      fill(random(0, 255));
      rect(i, j, width / 10, height / 10);
    }
  }
}
function draw() {
}let cred = true;
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  for (let i = 0; i < width; i += width / 10) {
    fill(220);
        
        
    fill(i);
    rect(i, 0, width / 10, height);
  }
}function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  noStroke();
  for (let i = 0; i < width; i += width/3){
    fill(220);
    if (mouseX >= i && mouseX < i+width/3){
      fill('red');
    }
    rect(i, 0, width/3, height);
  }
}function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  noStroke();
  for (let i = 0; i < width; i += width/10){
    fill(220);
    if (mouseX >= i && mouseX < i + width/10 && mouseX < width/2){
      fill('blue');
    } else if (mouseX >= i && mouseX < i + width/10 && mouseX >= width/2) {
      fill('red');
    }
    rect(i, 0, width/10, height);
  }
}function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  noStroke();
  for (let i = 0; i < width; i += width/10){
    fill(220);
    if (mouseX >= i && mouseX < i+width/10){
      if (i != width/10*6) {
      fill('red');
      }
    }
    rect(i, 0, width/10, height);
  }
}let status0 = 0;
let status1 = 0;
let status2 = 0;
let lastActive = 9;
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  noStroke();
  fill('red');
  if (mouseX > 0 && mouseX <= width / 3) {
    if (lastActive != 0) {
      status0 = 0;
    }
    lastActive = 0;
  } else if (mouseX > width / 3 && mouseX <= width / 3 * 2) {
    if (lastActive != 1) {
      status1 = 0;
    }
    lastActive = 1;
  } else if (mouseX > width / 3 * 2 && mouseX <= width) {
    if (lastActive != 2) {
      status2 = 0;
    }
    lastActive = 2;
  }
  if (status0 == 1) {
    rect(0, 0, width / 3, height);
  }
  if (status1 == 1) {
    rect(width / 3, 0, width / 3, height);
  }
  if (status2 == 1) {
    rect(width / 3 * 2, 0, width / 3, height);
  }
  
}
function mousePressed() {
  if (mouseX > 0 && mouseX <= width / 3 ) {
    status0 = 1;
  } else if (mouseX > width / 3 && mouseX <= width / 3 * 2 ) {
    status1 = 1;
  } else if (mouseX > width / 3 * 2 && mouseX <= width ) {
    status2 = 1;
  }
}function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  noStroke();
  for (let i = 0; i < width; i += width/10){
    fill(220);
    if (mouseX >= i && mouseX < i+width/10){
      fill('red');
    }
    rect(i, 0, width/10, height);
  }
}let status0 = 0;
let status1 = 0;
let status2 = 0;
let lastActive = 9;
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  noStroke();
  fill('red');
  if (mouseX > 0 && mouseX <= width / 3) {
    if (lastActive != 0) {
      status0 = 0;
    }
    lastActive = 0;
  } else if (mouseX > width / 3 && mouseX <= width / 3 * 2) {
    if (lastActive != 1) {
      status1 = 0;
    }
    lastActive = 1;
  } else if (mouseX > width / 3 * 2 && mouseX <= width) {
    if (lastActive != 2) {
      status2 = 0;
    }
    lastActive = 2;
  }
  if (status0 == 1) {
    rect(0, 0, width / 3, height);
  }
  if (status1 == 1) {
    rect(width / 3, 0, width / 3, height);
  }
  if (status2 == 1) {
    rect(width / 3 * 2, 0, width / 3, height);
  }
  
}
function mousePressed() {
  if (mouseX > 0 && mouseX <= width / 3 ) {
    status0 = 1;
  } else if (mouseX > width / 3 && mouseX <= width / 3 * 2 ) {
    status1 = 1;
  } else if (mouseX > width / 3 * 2 && mouseX <= width ) {
    status2 = 1;
  }
}let x = 0;
let xdir = 5;
function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  ellipse(x, height/2, 50, 50);
  x += xdir;
  if (x > width || x < 0) {
    xdir *= -1;
  }
}let dw;
let dh;
let l = 20;
let c = 255;
let randomArray = [];
let color;
let x1;
let x2;
let y1;
let y2;
let p = 1;
function setup() {
  noCursor();
  dw = displayWidth;
  dh = displayHeight;
  createCanvas(dw, dh);
  let idx = 0;
  for (let w = 0; w < dw; w += l) {
    for (let h = 0; h < dh; h += l) {
      randomArray[idx] = random(1);
      idx++;
    }
  }
}
function draw() {
  color = {
    r: 0,
    g: map(mouseX, 0, dw, 50, 150),
    b: map(mouseY, 0, dh, 50, 200),
  }
  background(0);
  let idx = 0;
  for (let w = 0; w < dw; w += l) {
    for (let h = 0; h < dh; h += l) {
      if (randomArray[idx] < 0.5) {
        x1 = w;
        x2 = w + 3;
        y1 = h;
        y2 = h + 10;
        stroke(color.r, color.g, color.b);
        line(x1, y1, x2, y2)
        p = p * -1;
        x1 = w + 3;
        x2 = w + l;
        y1 = h + 10;
        y2 = h + l;
        stroke(color.r, color.g, color.b);
        line(x1, y1, x2, y2)
        p = p * -1;
      } else {
        x1 = w + l;
        x2 = w + 12;
        y1 = h;
        y2 = h + 12;
        stroke(color.r, color.g, color.b);
        line(x1, y1, x2, y2)
        x1 = w + 12;
        x2 = w;
        y1 = h + 12;
        y2 = h + l;
        stroke(color.r, color.g, color.b);
        line(x1, y1, x2, y2)
        p = p * -1;
      }
      idx++;
    }
  }
  noStroke();
  fill(255, 10);
  ellipse(mouseX, mouseY, 200, 200);
}let dw;
let dh;
let l = 20;
let c = 255;
let randomArray = [];
let color;
let x1;
let x2;
let y1;
let y2;
let p = 1;
function setup() {
  noCursor();
  dw = displayWidth;
  dh = displayHeight;
  createCanvas(dw, dh);
  let idx = 0;
  for (let w = 0; w < dw; w += l) {
    for (let h = 0; h < dh; h += l) {
      randomArray[idx] = random(1);
      idx++;
    }
  }
}
function draw() {
  color = {
    r: 0,
    g: map(mouseX, 0, dw, 50, 150),
    b: map(mouseY, 0, dh, 50, 200),
  }
  background(0);
  let idx = 0;
  for (let w = 0; w < dw; w += l) {
    for (let h = 0; h < dh; h += l) {
      if (randomArray[idx] < 0.5) {
        x1 = w;
        x2 = w + 3;
        y1 = h;
        y2 = h + 10;
        stroke(color.r, color.g, color.b);
        line(x1, y1, x2, y2)
        p = p * -1;
        x1 = w + 3;
        x2 = w + l;
        y1 = h + 10;
        y2 = h + l;
        stroke(color.r, color.g, color.b);
        line(x1, y1, x2, y2)
        p = p * -1;
      } else {
        x1 = w + l;
        x2 = w + 12;
        y1 = h;
        y2 = h + 12;
        stroke(color.r, color.g, color.b);
        line(x1, y1, x2, y2)
        x1 = w + 12;
        x2 = w;
        y1 = h + 12;
        y2 = h + l;
        stroke(color.r, color.g, color.b);
        line(x1, y1, x2, y2)
        p = p * -1;
      }
      idx++;
    }
  }
  noStroke();
  fill(255, 10);
  ellipse(mouseX, mouseY, 200, 200);
}let dw = 600;
let dh = 600;
let l = 10;
let c = 255;
let randomArray = [];
let color;
let x1;
let x2;
let y1;
let y2;
let p = 1;
function setup() {
  createCanvas(dw, dh);
  let idx = 0;
  for (let w = 0; w < dw; w += l) {
    for (let h = 0; h < dh; h += l) {
      randomArray[idx] = random(1);
      idx++;
    }
  }
}
function draw() {
  color = {
    r: map(mouseX, 0, dw, 0, 255),
    g: 0,
    b: map(mouseY, 0, dh, 0, 255),
  }
  background(0);
  let idx = 0;
  for (let w = 0; w < dw; w += l) {
    for (let h = 0; h < dh; h += l) {
      if (randomArray[idx] < 0.5) {
        x1 = w;
        x2 = w + 5;
        y1 = h;
        y2 = h + 3;
        stroke(color.r, color.g, color.b);
        line(x1, y1, x2, y2)
        
        x1 = w + 5;
        x2 = w + l;
        y1 = h + 3;
        y2 = h + l;
        stroke(color.r, color.g, color.b);
        line(x1, y1, x2, y2)
        
        p = p * -1;
      } else {
        x1 = w + l;
        x2 = w;
        y1 = h;
        y2 = h + l;
        stroke(color.r, color.g, color.b);
        line(x1, y1, x2, y2)
        p = p * -1;
      }
      idx++;
    }
  }
}let dw = 400;
let dh = 400;
let l = 10;
let c = 255;
let x1;
let x2;
let y1;
let y2;
function setup() {
  createCanvas(dw, dh);
}
function draw() {
  background(0);
  for (let w = 0; w < dw; w += l) {
    for (let h = 0; h < dh; h += l) {
      if ((w - mouseX) < 20 && (w - mouseX) > -20 &&
        (h - mouseY) < 20 && (h - mouseY) > -20) {
        push();
        angleMode(DEGREES );
        translate(mouseX + 30, mouseY - 10);
        rotate(90);
        x1 = w;
        x2 = w + l;
        y1 = h;
        y2 = h + l;
        stroke(255, 0, 0);
        for (let j = 0; j < 40; j += l) {
          for (let i = 0; i < 40; i += l) {
                
            translate(i, j)
            rotate(10);
            line(i-5, j-5, i+5, j+5);
            
          }
        }
        pop();
      } else {
        x1 = w;
        x2 = w + l;
        y1 = h;
        y2 = h + l;
        stroke(c);
        line(x1, y1, x2, y2)
      }
    }
  }
}let whole;
let left;
let right;
let img;
let beatCount = 0;
let redCap = 0;
let greenCap = 0; 
function preload() {
  whole = loadImage('whole.jpg');
  left = loadImage('left.jpg');
  right = loadImage('right.jpg');
  
}
function setup() {
  
  img = whole;
  createCanvas(img.width * unit, img.height * unit);
  setInterval(clearCount,3000); 
}
function draw() {
 
  background(255 - mouseY);
  img.loadPixels();
  
  
  
  noFill();
  strokeWeight(2);
  colorMode(RGB, 100);
    
  for (let i = 0; i < img.height; i++) {
    
    for (let j = 0; j < img.width; j++) {
      
      changeColorHeat();
      stroke(random(0, redCap), random(10, greenCap), 0);
      if (img.pixels[idx] < 100 && pattern == "Y") {
        
        
        arc(penX, penY, unit, unit, 0, PI);
  			line(penX, penY + unit/2, penX, penY + unit);
        pattern = "G";
        
      } else if (img.pixels[idx] < 100 && pattern == "G") {
        
        arc(penX, penY + unit/2, unit, unit, HALF_PI - QUARTER_PI/2, TWO_PI - QUARTER_PI);
  			line(penX, penY + unit/2, penX + unit/4, penY + unit/2);
  			line(penX + unit/4, penY + unit/2, penX + unit/4, penY + unit);
        pattern = "Y";
      }
      
      penX = penX + unit;
      
      idx = idx + 4;
    }
    
    penX = 0;
    penY = penY + unit;
  }
  
}
function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    img = left;
    beatCount++;
    
  } else if (keyCode === RIGHT_ARROW) {
    img = right;
    beatCount++;
  }
}
function keyReleased() {
  img = whole;
}
function changeColorHeat() {
  if (beatCount > 6) {
    redCap = 255;
    greenCap = 20;
  } else if (beatCount >= 3 ) {
    redCap = 120;
    greenCap = 120;
  } else if (beatCount >= 1 ) {
    redCap = 80;
    greenCap = 50;
  } else {
    redCap = 0;
    greenCap = 20;
  }
}
function clearCount() {
  beatCount = 0;
}
var mouthWeith = 50;
var direction;
function setup() {
  createCanvas(600, 700);
  background(234);
  
  ellipseMode(CENTER);
  fill(104,72,54);
  strokeWeight(0);
  ellipse(300,175,138,222);
  
  ellipseMode(CENTER);
  fill(114,89,65);
  strokeWeight(0);
  ellipse(300,175,118,202);
  
  ellipseMode(CENTER);
  fill(104,72,54);
  strokeWeight(0);
  ellipse(300,175,110,190);
  
  ellipseMode(CENTER);
  fill(114,89,65);
  strokeWeight(0);
  ellipse(300,175,100,180);
  
  rectMode(CENTER);
  fill(234);
  strokeWeight(0);
  rect(300,258,130,57);
  
  ellipseMode(CENTER);
  fill(234,206,173);
  strokeWeight(0);
  ellipse(300,175,96,154);
  
  strokeWeight(1);
  stroke(234,206,173);
  line(300,64,300,97);
  
  ellipseMode(CENTER);
  strokeWeight(3);
  stroke(249,224,38);
  noFill(); 
  ellipse(248,204,10,70);
  
  ellipseMode(CENTER);
  strokeWeight(3);
  stroke(249,224,38);
  noFill(); 
  ellipse(352,204,10,70);
  
  rectMode(CENTER);
  strokeWeight(2);
  stroke(112,112,112);
  noFill(); 
  rect(322,146,32,24,3);
  
  strokeWeight(0);
  fill(255); 
  arc(322, 150, 24, 22, PI, TWO_PI); 
  fill(104,72,54);
  ellipse(322, 145, 6, 6);
  
  rectMode(CENTER);
  strokeWeight(2);
  stroke(112,112,112);
  noFill(); 
  rect(278,146,32,24,3);
  
  strokeWeight(0);
  fill(255); 
  arc(278, 150, 24, 22, PI, TWO_PI); 
  fill(104,72,54);
  ellipse(278, 145, 6, 6);
  
  strokeWeight(1);
  stroke(112,112,112);
  noFill(); 
  arc(300, 150, 16, 12, PI+QUARTER_PI, TWO_PI-QUARTER_PI);
  
  ellipseMode(CENTER);
  strokeWeight(0);
  fill(244,206,201); 
  ellipse(278,198,24,32);
  
  ellipseMode(CENTER);
  strokeWeight(0);
  fill(244,206,201); 
  ellipse(322,198,24,32);
  
  strokeWeight(2);
  stroke(221,170,166);
  noFill(); 
  arc(300, 175, 10, 22, PI-HALF_PI, TWO_PI-HALF_PI);
  
  
  
  
}
function draw() {
  if (mouthWeith > 50) {
    direction = "down";
  } else if (mouthWeith < 0){
    direction = "up";
  }
  
  
  if (direction == "up") {
    mouthWeith = mouthWeith + 1;
  } else {
    mouthWeith = mouthWeith - 1;
  }
  
  strokeWeight(2);
  stroke(221,170,166);
  fill(255); 
  arc(300, 200, mouthWeith, 45, 0, PI);
  
  strokeWeight(1);
  stroke(232,232,232);
  fill(255); 
  arc(300, 200, 46, 22, 0, PI);
  
  strokeWeight(1);
  stroke(232,232,232);
  line(300,200,300,220);
  
  rectMode(CENTER);
  fill(234,206,173);
  strokeWeight(0);
  rect(300,256,26,30);
  
  fill(234,206,173);
  strokeWeight(0);
  triangle(242,273,300,250,358,273);
  
  strokeWeight(15);
  stroke(234,206,173);
  line(188,358,253,276);
  
  strokeWeight(15);
  stroke(234,206,173);
  line(347,276,412,358);
  
  fill(0);
  strokeWeight(0);
  triangle(242,273,300,426,358,273);
  
  fill(0);
  strokeWeight(0);
  ellipse(271,273,58,16);
  ellipse(329,273,58,16);
  
  rectMode(CENTER);
  fill(234,206,173);
  strokeWeight(0);
  rect(270,550,30,100);
  rect(332,550,30,100);
  
  fill(0);
  strokeWeight(0);
  triangle(187,506,300,309,413,506);
  
  fill(0);
  strokeWeight(0);
  ellipse(215,505,56,16);
  ellipse(272,505,56,16);
  ellipse(329,505,56,16);
  ellipse(386,505,56,16);
  
  fill(0);
  strokeWeight(0);
  bezier(188, 505, 187, 475, 257, 358, 273, 358);
  bezier(413, 506, 413, 475, 343, 358, 327, 358);
  
  rectMode(CENTER);
  fill(234,206,173);
  strokeWeight(0);
  rect(300,354,58,8);
  
  strokeWeight(0);
  fill(255); 
  arc(270, 600, 52, 55, PI, TWO_PI);
  fill(249); 
  rect(270,606,58,12,3);
  
  strokeWeight(0);
  fill(255); 
  arc(332, 600, 52, 55, PI, TWO_PI);
  fill(249); 
  rect(332,606,58,12,3);
}function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
  
  noFill();
  stroke(0);
  arc(50, 50, 50, 50, 0, PI);
  line(50, 50 + 50/2, 50, 50 + 50);
        
  arc(100, 50 + 50/2, 50, 50, HALF_PI - QUARTER_PI/2, TWO_PI - QUARTER_PI);
  line(100, 50 + 50/2, 100 + 50/4, 50 + 50/2);
  line(100 + 50/4, 50 + 50/2, 100 + 50/4, 50 + 50);
        
}var whole;
var left;
var right;
function preload() {
  whole = loadImage('whole.jpg');
  left = loadImage('left.jpg');
  right = loadImage('right.jpg');
}
function setup() {
  
  whole.loadPixels();
  
  createCanvas(whole.width * unit, whole.height * unit);
  
  background(220);
  noFill();
  strokeWeight(2);
  colorMode(RGB, 100);
    
  for (var i = 0; i < whole.height; i++) {
    
    for (var j = 0; j < whole.width; j++) {
      
      if (whole.pixels[idx] < 100 && pattern == "Y") {
        
        stroke(i, j, (i+j));
        arc(penX, penY, unit, unit, 0, PI);
  			line(penX, penY + unit/2, penX, penY + unit);
        pattern = "G";
        
      } else if (whole.pixels[idx] < 100 && pattern == "G") {
        
        stroke(i, j, (i+j));
        arc(penX, penY + unit/2, unit, unit, HALF_PI - QUARTER_PI/2, TWO_PI - QUARTER_PI);
  			line(penX, penY + unit/2, penX + unit/4, penY + unit/2);
  			line(penX + unit/4, penY + unit/2, penX + unit/4, penY + unit);
        pattern = "Y";
      }
      
      penX = penX + unit;
      
      idx = idx + 4;
    }
    
    penX = 0;
    penY = penY + unit;
  }
}
function draw() {
  
}function setup() { 
  createCanvas(400, 400);
} 
function draw() { 
  background(220);
	fill(64, 244, 208);
	ellipse(200, 200, 100, 100);
}function setup() {
  createCanvas(400, 400);
}
function draw() {
  background(220);
}function setup() {
  createCanvas(400, 400);
	strokeWeight(10);
	fill(255,0,0);
	ellipse(200, 200, 50, 90);
	fill(0,255,0);
	ellipseMode(CORNER);
	rotate(PI / 1.0);
	ellipse(200, 200, 90, 50);
	createP("Hello there");
	
}
function draw() {
	
}