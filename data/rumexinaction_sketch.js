let outputP;

function setup() { 
  noCanvas();
  background(255);
  textAlign(LEFT, TOP);
  textSize(32);
  outputP = createP("Click to generate");
} 

function draw() { 
}

function keyPressed() {
  mousePressed();
}

function mousePressed() {
  var grammar = tracery.createGrammar(grammarSource);
  grammar.addModifiers(tracery.baseEngModifiers);
  var output = grammar.flatten("#origin#");
  outputP.html(output);
}

// cut and paste your grammar below (as the value for variable "grammarSource")
var grammarSource = {
  "story": ["#hero.capitalize# always wanted to be a  #occupation#, but being a dwarf was  #heroTheir# eternal misery. #hero.capitalize# wanted to #didStuff#, then #didStuff#,and then #heroThey# just stopped dreaming and went back to be a slave of Snow White forever."]
,	"name": ["Dopy","Bashful","Sneezy","Sleepy","Happy","Grumpy"]
,	"activity": ["make coffee","arrange schedules","prepare lunch for #heroTheirs# boss","wear fancy clothes","be smart"]
, "setPronouns": ["[heroThey:their][heroThem:them][heroTheir:their][heroTheirs:theirs]","[heroThey:she][heroThem:her][heroTheir:her][heroTheirs:hers]","[heroThey:he][heroThem:him][heroTheir:his][heroTheirs:his]"]
,	"setOccupation": ["[occupation: ophthamologist][didStuff: operate eyes,help people,save lifes,feel important]","[occupation:secretary][didStuff: #activity#, #activity#, #activity#]"]
, "origin": ["#[#setPronouns#][#setOccupation#][hero:#name#]story#"]
};let outputP;

function setup() { 
  noCanvas();
  background(255);
  textAlign(LEFT, TOP);
  textSize(24);
  outputP = createP("Click to generate");
} 

function draw() { 
}

function keyPressed() {
  mousePressed();
}

function mousePressed() {
  var grammar = tracery.createGrammar(grammarSource);
  grammar.addModifiers(tracery.baseEngModifiers);
  var output = grammar.flatten("#origin#");
  outputP.html(output);
}

// cut and paste your grammar below (as the value for variable "grammarSource")
var grammarSource = {
  
  
	"name": ["Arjun","Yuuma","Darcy","Mia","Chiaki","Izzi","Azra","Lina"]
,	"animal": ["unicorn","raven","sparrow","scorpion","coyote","eagle","owl","lizard","zebra","duck","kitten"]
,	"occupationBase": ["wizard","witch","detective","ballerina","criminal","pirate","lumberjack","spy","doctor","scientist","captain","priest"]
,	"occupationMod": ["occult ","space ","professional ","gentleman ","erotic ","time ","cyber","paleo","techno","super"]
,	"strange": ["mysterious","portentous","enchanting","strange","eerie"]
,	"tale": ["story","saga","tale","legend"]
,	"occupation": ["#occupationMod##occupationBase#"]
,	"mood": ["vexed","indignant","impassioned","wistful","astute","courteous"]
,	"setPronouns": ["[heroThey:they][heroThem:them][heroTheir:their][heroTheirs:theirs]","[heroThey:she][heroThem:her][heroTheir:her][heroTheirs:hers]","[heroThey:he][heroThem:him][heroTheir:his][heroTheirs:his]"]
,	"setSailForAdventure": ["set sail for adventure","left #heroTheir# home","set out for adventure","went to seek #heroTheir# forture"]
,	"setCharacter": ["[#setPronouns#][hero:#name#][heroJob:#occupation#]"]
,	"openBook": ["An old #occupation# told #hero# a story. 'Listen well' she said to #hero#, 'to this #strange# #tale#. ' #origin#'","#hero# went home.","#hero# found an ancient book and opened it.  As #hero# read, the book told #strange.a# #tale#: #origin#"]
,	"story": ["#hero# the #heroJob# #setSailForAdventure#. #openBook#"]
,	"origin": ["Once upon a time, #[#setCharacter#]story#"]

}
};let outputP;

function setup() { 
  noCanvas();
  background(255);
  textAlign(LEFT, TOP);
  textSize(24);
  outputP = createP("Click to generate");
} 

function draw() { 
}

function keyPressed() {
  mousePressed();
}

function mousePressed() {
  var grammar = tracery.createGrammar(grammarSource);
  grammar.addModifiers(tracery.baseEngModifiers);
  var output = grammar.flatten("#origin#");
  outputP.html(output);
}

// cut and paste your grammar below (as the value for variable "grammarSource")
var grammarSource = {
  "origin": "#interjection.capitalize#, #name#! I'm #profession.a#, not #profession.a#!",
  "interjection": ["alas", "congratulations", "eureka", "fiddlesticks",
    "good grief", "hallelujah", "oops", "rats", "thanks", "whoa", "yes"],
  "name": ["Jim", "John", "Tom", "Steve", "Kevin", "Gary", "George", "Larry"],
  "profession": [
        "accountant",
        "actor",
        "archeologist",
        "astronomer",
        "audiologist",
        "bartender",
        "butcher",
        "carpenter",
        "composer",
        "crossing guard",
        "curator",
        "detective",
        "economist",
        "editor",
        "engineer",
        "epidemiologist",
        "farmer",
        "flight attendant",
        "forest fire prevention specialist",
        "graphic designer",
        "hydrologist",
        "librarian",
        "lifeguard",
        "locksmith",
        "mathematician",
        "middle school teacher",
        "nutritionist",
        "painter",
        "physical therapist",
        "priest",
        "proofreader",
        "rancher",
        "referee",
        "reporter",
        "sailor",
        "sculptor",
        "singer",
        "sociologist",
        "stonemason",
        "surgeon",
        "tailor",
        "taxi driver",
        "teacher assistant",
        "teacher",
        "teller",
        "therapist",
        "tour guide",
        "translator",
        "travel agent",
        "umpire",
        "undertaker",
        "urban planner",
        "veterinarian",
        "web developer",
        "weigher",
        "welder",
        "woodworker",
        "writer",
        "zoologist"
  ]
};var yoff = 0.0;
var muse = 2.5;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);

  translate(width / 2, height / 2);

  var radius = 150;

  beginShape();
  var xoff = 0;
  for (var a = 0; a < TWO_PI; a += 0.1) {
    //var offset = map(noise(xoff, yoff), 0, 1, -25, 25);
    var offset = map(sin(a * muse + frameCount * 0.1),-1,1, -25, 25); //framecount elottit
    var r = radius + offset;
    var x = r * cos(a);
    var y = r * sin(a);
    // vertex(x, y);
    ellipse(x,y,4,4);
    xoff += 0.1;
    //ellipse(x, y, 4, 4);
  }
  endShape();

  yoff += 0.01;
}var yoff = 0.0;
var muse = 2.5;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);

  translate(width / 2, height / 2);

  var radius = 150;

  beginShape();
  var xoff = 0;
  for (var a = 0; a < TWO_PI; a += 0.1) {
    //var offset = map(noise(xoff, yoff), 0, 1, -25, 25);
    var offset = map(sin(a * muse + frameCount * 0.1),-1,1, -25, 25); //framecount elottit
    var r = radius + offset;
    var x = r * cos(a);
    var y = r * sin(a);
    // vertex(x, y);
    ellipse(x,y,4,4);
    xoff += 0.1;
    //ellipse(x, y, 4, 4);
  }
  endShape();

  yoff += 0.01;
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}function setup() { 
  createCanvas(400, 400);
} 

function touchMoved() { 
  strokeWeight(10);
  console.log(mouseX);
  fill(0,255,0);
  
  return false;
}var mic, recorder, soundFile;
let start, stop, play;
function setup() {
  background(0);

  // create an audio in
  mic = new p5.AudioIn();

  // prompts user to enable their browser mic
  mic.start();
	console.log(mic);
  // create a sound recorder
  recorder = new p5.SoundRecorder();

  // connect the mic to the recorder
  recorder.setInput(mic);

  // this sound file will be used to
  // playback & save the recording

    soundFile = new p5.SoundFile();



  createCanvas(200, 400);
	start = createButton('Start');
  start.mousePressed(startRec);
  stop = createButton('Stop');
  stop.mousePressed(stopRec);
  play = createButton('play');
  play.mousePressed(playit);
  stop = createButton('stop');
  stop.mousePressed(stopit);
}

function startRec() {

  recorder.record(soundFile);
  
}



function stopRec() {

  recorder.stop();
  
}

function playit() {
  soundFile.loop();
}

function stopit() {
  soundFile.stop();
}var mic, recorder, soundFile;
let start, stop, play;
function setup() {
  background(0);

  // create an audio in
  mic = new p5.AudioIn();

  // prompts user to enable their browser mic
  mic.start();
	console.log(mic);
  // create a sound recorder
  recorder = new p5.SoundRecorder();

  // connect the mic to the recorder
  recorder.setInput(mic);

  // this sound file will be used to
  // playback & save the recording

    soundFile = new p5.SoundFile();



  createCanvas(200, 400);
	start = createButton('Start');
  start.mousePressed(startRec);
  stop = createButton('Stop');
  stop.mousePressed(stopRec);
  play = createButton('play');
  play.mousePressed(playit);
  stop = createButton('stop');
  stop.mousePressed(stopit);
}

function startRec() {

  recorder.record(soundFile);
  
}



function stopRec() {

  recorder.stop();
  
}

function playit() {
  soundFile.loop();
}

function stopit() {
  soundFile.stop();
}var mic, recorder, soundFile;
let start, stop, play;
var song;
var button;
var silence;
var video;
var trackColor;

let isTracking = 0; // tells me if its tracking OR NOT!

function preload() {
  silence = loadImage("silence2.png");
}

function setup() {
  createCanvas(320, 240);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // Start off tracking for red
  trackColor = [153, 0, 0];




  // create an audio in
  mic = new p5.AudioIn();

  // prompts user to enable their browser mic
  mic.start();
  console.log(mic);
  // create a sound recorder
  recorder = new p5.SoundRecorder();

  // connect the mic to the recorder
  recorder.setInput(mic);

  // this sound file will be used to
  // playback & save the recording

  soundFile = new p5.SoundFile();




  start = createButton('Startrecord');
  start.mousePressed(startRec);
  stop = createButton('Stoprecord');
  stop.mousePressed(stopRec);
  play = createButton('play or add');
  play.mousePressed(playit);
  stop = createButton('stop the whole thing');
  stop.mousePressed(stopit);

}

function startRec() {

  recorder.record(soundFile);

}

function shutup(){
  if (isTracking == 1 && soundFile.isPlaying) {
    soundFile.stop();
  }
}

function stopRec() {

  recorder.stop();

}

function playit() {
  soundFile.loop();
}

function stopit() {
  soundFile.stop();
}


function draw() {


  // Draw the video
  image(video, 0, 0);

  // We are going to look at the video's pixels
  video.loadPixels();

  // Before we begin searching, the "world record" for closest color is set to a high number that is easy for the first pixel to beat.
  var worldRecord = 500;

  // XY coordinate of closest color
  var closestX = 0;
  var closestY = 0;

  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var loc = (x + y * video.width) * 4;
      // The functions red(), green(), and blue() pull out the three color components from a pixel.
      var r1 = video.pixels[loc];
      var g1 = video.pixels[loc + 1];
      var b1 = video.pixels[loc + 2];

      var r2 = trackColor[0];
      var g2 = trackColor[1];
      var b2 = trackColor[2];

      // Using euclidean distance to compare colors
      var d = dist(r1, g1, b1, r2, g2, b2); // We are using the dist( ) function to compare the current color with the color we are tracking.

      // If current color is more similar to tracked color than
      // closest color, save current location and current difference
      if (d < worldRecord) {
        worldRecord = d;
        closestX = x;
        closestY = y;
      }
    }
  }

  // We only consider the color found if its color distance is less than 10. 
  // This threshold of 10 is arbitrary and you can adjust this number depending on how accurate you require the tracking to be.
  if (worldRecord < 50) {
    // Draw a circle at the tracked pixel
    //fill(trackColor);
    isTracking = 1;
    print('yes');
    image(silence, closestX - 50, closestY - 60);

    strokeWeight(4.0);
    stroke(0);
    //ellipse(closestX, closestY, 16, 16);
  } else {
    isTracking = 0;
    print('no');
  }
  shutup();
}


// function mousePressed() {
//   // Save color where the mouse is clicked in trackColor variable
//   trackColor = video.get(mouseX, mouseY);
//   console.log(trackColor);
// }

// the problem that I have to set with the mouse what its tracking
//instead of just tracking one color


  var recorder;
var soundFile;
var mic;
var song;
var button;
var jumpButton;
var silence;
var video;
var trackColor;

function preload() {
  silence = loadImage("silence2.png");
}

function setup() {
  createCanvas(320, 240);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width, height);
  // The above function actually makes a separate video
  // element on the page.  The line below hides it since we are
  // drawing the video to the canvas
  video.hide();

  // Start off tracking for red
  trackColor = [255, 0, 0];

  song = loadSound("native.mp3", loaded);
  button = createButton("play");
  button.mousePressed(togglePlaying);
  jumpButton = createButton("jump");
  jumpButton.mousePressed(jumpSong);


  mic = new p5.AudioIn(); //SET MIC AND RECORD
  mic.start();
  recorder = new p5.SoundRecorder();
  recorder.setInput(mic);
  soundFile = new p5.SoundFile();

function mousePressed() {  // MOUSEPRESSED WILL TRIGGER THE RECORD AND PLAYBACK
    
    if (state === 0 && mic.enabled) {

      
    recorder.record(soundFile);

      state++; //WHAT THIS PART MEANS? buttonstate?
      
    } else if (state === 1) {
      recorder.stop(); 

    
      state++;
    } else if (state === 2) {
      soundFile.play(); // play the result!
      saveSound(soundFile, 'mySound.wav'); // 
      state++;
    }
  }

}


function loaded() {

  console.log("loaded");
  song.play();

}

function togglePlaying() {

  song.play();
  song.setVolume(0.6);
}


function jumpSong() {
  var len = song.duration();
  var t = random(len);
  console.log(t);
  song.jump(t);
}


function draw() {


  // Draw the video
  image(video, 0, 0);

  // We are going to look at the video's pixels
  video.loadPixels();

  // Before we begin searching, the "world record" for closest color is set to a high number that is easy for the first pixel to beat.
  var worldRecord = 500;

  // XY coordinate of closest color
  var closestX = 0;
  var closestY = 0;

  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var loc = (x + y * video.width) * 4;
      // The functions red(), green(), and blue() pull out the three color components from a pixel.
      var r1 = video.pixels[loc];
      var g1 = video.pixels[loc + 1];
      var b1 = video.pixels[loc + 2];

      var r2 = trackColor[0];
      var g2 = trackColor[1];
      var b2 = trackColor[2];

      // Using euclidean distance to compare colors
      var d = dist(r1, g1, b1, r2, g2, b2); // We are using the dist( ) function to compare the current color with the color we are tracking.

      // If current color is more similar to tracked color than
      // closest color, save current location and current difference
      if (d < worldRecord) {
        worldRecord = d;
        closestX = x;
        closestY = y;
      }
    }
  }

  // We only consider the color found if its color distance is less than 10. 
  // This threshold of 10 is arbitrary and you can adjust this number depending on how accurate you require the tracking to be.
  if (worldRecord < 120) {
    // Draw a circle at the tracked pixel
    fill(trackColor);
    image(silence, closestX - 50, closestY - 60);

    strokeWeight(4.0);
    stroke(0);
    ellipse(closestX, closestY, 16, 16);
  }
}


function mousePressed() {
  // Save color where the mouse is clicked in trackColor variable
  trackColor = video.get(mouseX, mouseY);
  console.log(trackColor);
}// I would like to let the whole pupil to react on sound. 
// and LET THE EARS GROW A BIT IF THERES DARKER PIXELS THERE.

function preload() {
  ear = loadImage("ear2.png");
}

var mic;
var video;

function setup() {
  
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  // The above function actually makes a separate video
  // element on the page.  The line below hides it since we are
  // drawing the video to the canvas
  video.hide();
  
  mic = new p5.AudioIn();
  mic.start();
  setupeye();
  angleMode(DEGREES);
  
}

function draw() {
  
  background(51, 204, 204);
  image(ear, 200, 20, 70, 100);// CALL IN EAR
  
  
  // for (var row = 0; row < 3; row++) {  /// I WOULD LIKE A GRID OF EARS
  //   for (var column = 0; column < 3; column++) {
  //     ear(100 + (column * 200), 70 + (row * 130), mouseX, mouseY);

  img = createCapture(VIDEO);
  // image(video, 0, 0, windowWidth, windowHeight); // VIDEO CALLIN
  
  var vol = mic.getLevel(); 
  fill(255);
  ellipse(300, 300, vol * 6000, vol * 5000);
  draweye(); // static eye sketch calling
      
      
  let col = video.get( mouseX,mouseY);
	fill(col);
	ellipse(mouseX,mouseY,60);
}

/// COLLECT PIXEL INFORMATION
    
   

var song;
var button;
var amp;

function setup() {
  createCanvas(200, 200);
  song = loadSound("rainbow.mp3", loaded);
  amp = new p5.Amplitude();
  background(51);
}

function loaded() {
  button = createButton("play");
  button.mousePressed(togglePlaying);
}

function draw() {
  background(51);

  var vol = amp.getLevel();
  var diam = map(vol, 0, 0.3, 10, 200);

  fill(255, 0, 255);
  ellipse(width / 2, height / 2, diam, diam);
}


function togglePlaying() {
  if (!song.isPlaying()) {
    song.play();
    song.setVolume(0.3);
    button.html("pause");
  } else {
    song.stop();
    button.html("play");
  }
}// API http://api.open-notify.org/iss-now.json


let lineX = 0;
var url = 'http://api.open-notify.org/iss-now.json'; //testing with space data
let issX = 0;
let issY = 0;

function preload() {
  brain = loadImage("brain.png"); // the brain to scan
}

function setup() {
  createCanvas(600, 600);
  
  setInterval(askISS, 1000);
  
  }

function askISS () {
  loadJSON(url, gotData, 'jsonp');
}




function gotData(data) { //this gonne be filled with the JSON
  
let lat = data.iss_position.latitude;
let long = data.iss_position.longitude;
issX = map(lat, 25, 30, 0, windowWidth);
issY = map(long, -45, -50, 0, windowHeight); // it was working yesterday
  println(issY);


}


  function draw() {
    background(0, 153, 204);
    
    image(brain, issX, issY, brain.width/5, brain.height/5);
    

    // SCANNING THE BRAIN
    
    stroke(255);
    line( lineX,0,lineX,height);
    lineX = lineX +5;
    if (lineX > width) {
      lineX = 0
    }
    
  }
let img;



function setup() { 
  createCanvas(400, 400);
	background(0);
	
	img = createCapture(VIDEO);
} 


function draw () {
	
	let x = floor(random(width));
  let y = floor(random(height));
	
	let col = img.get( x,y);
  col[3] = 100; //color arrays third transperency is 100 ( 100% is 255) what a fuck
	fill(col);
	rect(x,y,20,20);
  
	
  x += random(-50,50);
  y += random(-50,50);
  x = constrain(x, 0, width);
  y = constrain(y, 0, height);
  
}let img;

function preload(){
	img  = loadImage ('orwellcool.png');
}

function setup() { 
  createCanvas(400, 400);
	background(0);
	//img.hide();
	//image(img,0,0);
} 


function draw () {
	
	//image(img,0,0);
	
	let col = img.get( mouseX,mouseY);
	fill(col);
	ellipse(mouseX,mouseY,60);
	
}function preload() {
  plant = loadImage("plant.png");
}

//push button to control Servo//
var button1;
var serial; // variable to hold an instance of the serialport library
var fromSerial = 0; //variable to hold the dat

function mousePressed () {
    print ( "mousePressed ");
    serial.write(0 + ",");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  img = loadImage("orwellcool.png"); // LOAD LOGO
  setupeye(); // LOAD EYE
  background(204, 204, 204);




  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  // serial.on('list', printList); // callback function for serialport list event
  //serial.on('data', serialEvent); // callback for new data coming in	
  // serial.list(); // list the serial ports
  serial.on('error', onError);
  serial.open("/dev/cu.usbmodem1421"); // open a port

  //BUTTONS


  button1 = createButton('Yes. It is green.');
  button1.id("button1");
  button1.position(1200, 400);
  button1.mousePressed(button1Pressed); // TEXT comes saying "good job go back to work"

  button2 = createButton('I am not quite sure.');
  //button2.id("button2");
  button2.position(1200, 500);
  button2.mousePressed(button2Pressed); // this is where the STAMP comes in

  button3_box = createDiv('   ');
  button3_box.id("blueButtonHolder");

  button3 = createButton('No. It is blue.');
  button3.id("button3");
  button3.position(1200, 600);
  
}

function button2Pressed() {

  //serial.print("1");
  serial.write(52); // FINALLYYYYY WORKIIIING
  background(255, 0,0);
  textStyle(BOLD);
  fill(0, 0, 255);
  textSize(32);
  text(' Incorrect. Thought criminal detected. ', 720, 500);
  print(' btnpressed');
}

function button1Pressed() {
  background(0, 0, 255);
  textStyle(BOLD);
  fill(255, 0, 0);
  textSize(32);
  text(' Correct. Go back to work. ', 720, 500);
}



var valueToSend;

function changeBG() {
  var val = random(255);
  background(val); /// TEST IF BUTTON WORKS
  valueToSend = int(map(val, 0, 255, 0, 180));
  serial.write(valueToSend + ",");
}


function draw() {

  draweye();
  img.resize(200, 200);
  image(img, width / 2, 60);
  image(plant, 310, 0);
  textStyle(BOLD);
  noStroke();
  fill(204, 51, 0);
  textSize(32);
  text(' BIG BROTHER SAYS THIS PLANT IS GREEN. \n DO YOU AGREE? ', width / 2 +100 , 300);
  
  
  
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

function onError(err) {

  print("something is wrong" + err);
}//push button to control Servo//
var button1;
var serial; // variable to hold an instance of the serialport library
var fromSerial = 0; //variable to hold the dat

function mousePressed () {
    print ( "mousePressed ");
    serial.write(0 + ",");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  img = loadImage("orwellcool.png"); // LOAD LOGO
  setupeye(); // LOAD EYE
  background(204, 204, 204);




  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  // serial.on('list', printList); // callback function for serialport list event
  //serial.on('data', serialEvent); // callback for new data coming in	
  // serial.list(); // list the serial ports
  serial.on('error', onError);
  serial.open("/dev/cu.usbmodem1421"); // open a port

  //BUTTONS


  button1 = createButton('Yes. It is green.');
  button1.id("button1");
  button1.position(1200, 400);
  button1.mousePressed(button1Pressed); // TEXT comes saying "good job go back to work"

  button2 = createButton('I am not quite sure.');
  //button2.id("button2");
  button2.position(12, 500);
  button2.mousePressed(button2Pressed); // this is where the STAMP comes in

  button3_box = createDiv('   ');
  button3_box.id("blueButtonHolder");

  button3 = createButton('No. It is blue.');
  button3.id("button3");
  button3.position(1200, 600);
  
}

function button2Pressed() {

  //serial.print("1");
  serial.write(52); // FINALLYYYYY WORKIIIING
  background(255, 0,0);
  textStyle(BOLD);
  fill(0, 0, 255);
  textSize(32);
  text(' Incorrect. Thought criminal detected. ', 500, 500);
  print(' btnpressed');
}

function button1Pressed() {
  background(0, 0, 255);
  textStyle(BOLD);
  fill(255, 0, 0);
  textSize(32);
  text(' Correct. Go back to work. ', 500, 500);
}



var valueToSend;

function changeBG() {
  var val = random(255);
  background(val); /// TEST IF BUTTON WORKS
  valueToSend = int(map(val, 0, 255, 0, 180));
  serial.write(valueToSend + ",");
}


function draw() {

  draweye();
  img.resize(200, 200);
  image(img, width / 2, 60);
  textStyle(BOLD);
  noStroke();
  fill(204, 51, 0);
  textSize(32);
  text(' BIG BROTHER SAYS THIS PLANT IS GREEN. \n DO YOU AGREE? ', width / 2, 300);
  
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

function onError(err) {

  print("something is wrong" + err);
}//push button to control Servo//
var button1;
var serial; // variable to hold an instance of the serialport library
var fromSerial = 0; //variable to hold the dat

function mousePressed () {
    print ( "mousePressed ");
    serial.write(0 + ",");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  img = loadImage("orwellcool.png"); // LOAD LOGO
  setupeye(); // LOAD EYE
  background(204, 204, 204);




  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  // serial.on('list', printList); // callback function for serialport list event
  //serial.on('data', serialEvent); // callback for new data coming in	
  // serial.list(); // list the serial ports
  serial.on('error', onError);
  serial.open("/dev/cu.usbmodem1421"); // open a port

  //BUTTONS


  button1 = createButton('Yes. It is green.');
  button1.id("button1");
  button1.position(1200, 400);
  button1.mousePressed(button1Pressed); // TEXT comes saying "good job go back to work"

  button2 = createButton('I am not quite sure.');
  //button2.id("button2");
  button2.position(12, 500);
  button2.mousePressed(button2Pressed); // this is where the STAMP comes in

  button3_box = createDiv('   ');
  button3_box.id("blueButtonHolder");

  button3 = createButton('No. It is blue.');
  button3.id("button3");
  button3.position(1200, 600);
  
}

function button2Pressed() {

  //serial.print("1");
  serial.write(52); // FINALLYYYYY WORKIIIING
  background(255, 0,0);
  textStyle(BOLD);
  fill(0, 0, 255);
  textSize(32);
  text(' Incorrect. Thought criminal detected. ', 500, 500);
  print(' btnpressed');
}

function button1Pressed() {
  background(0, 0, 255);
  textStyle(BOLD);
  fill(255, 0, 0);
  textSize(32);
  text(' Correct. Go back to work. ', 500, 500);
}



var valueToSend;

function changeBG() {
  var val = random(255);
  background(val); /// TEST IF BUTTON WORKS
  valueToSend = int(map(val, 0, 255, 0, 180));
  serial.write(valueToSend + ",");
}


function draw() {

  draweye();
  img.resize(200, 200);
  image(img, width / 2, 60);
  textStyle(BOLD);
  noStroke();
  fill(204, 51, 0);
  textSize(32);
  text(' BIG BROTHER SAYS THIS PLANT IS GREEN. \n DO YOU AGREE? ', width / 2, 300);
  
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

function onError(err) {

  print("something is wrong" + err);
}//push button to control Servo//
var button1;
var serial; // variable to hold an instance of the serialport library
var fromSerial = 0; //variable to hold the dat

function mousePressed () {
    print ( "mousePressed ");
    serial.write(0 + ",");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  img = loadImage("orwellcool.png"); // LOAD LOGO
  setupeye(); // LOAD EYE
  background(204, 204, 204);




  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  // serial.on('list', printList); // callback function for serialport list event
  //serial.on('data', serialEvent); // callback for new data coming in	
  // serial.list(); // list the serial ports
  serial.on('error', onError);
  serial.open("/dev/cu.usbmodem1421"); // open a port

  //BUTTONS


  button1 = createButton('Yes. It is green.');
  button1.id("button1");
  button1.position(1200, 400);
  button1.mousePressed(button1Pressed); // TEXT comes saying "good job go back to work"

  button2 = createButton('I am not quite sure.');
  //button2.id("button2");
  button2.position(12, 500);
  button2.mousePressed(button2Pressed); // this is where the STAMP comes in

  button3_box = createDiv('   ');
  button3_box.id("blueButtonHolder");

  button3 = createButton('No. It is blue.');
  button3.id("button3");
  button3.position(1200, 600);
  
}

function button2Pressed() {

  //Serial.print("1");
  serial.write(0 + "\n");
  background(255, 0,0);
  textStyle(BOLD);
  fill(0, 0, 255);
  textSize(32);
  text(' Incorrect. Thought criminal detected. ', 500, 500);
  print(' btnpressed');
}

function button1Pressed() {
  background(0, 0, 255);
  textStyle(BOLD);
  fill(255, 0, 0);
  textSize(32);
  text(' Correct. Go back to work. ', 500, 500);
}



var valueToSend;

function changeBG() {
  var val = random(255);
  background(val); /// TEST IF BUTTON WORKS
  valueToSend = int(map(val, 0, 255, 0, 180));
  serial.write(valueToSend + ",");
}


function draw() {

  draweye();
  img.resize(200, 200);
  image(img, width / 2, 60);
  textStyle(BOLD);
  noStroke();
  fill(204, 51, 0);
  textSize(32);
  text(' BIG BROTHER SAYS THIS PLANT IS GREEN. \n DO YOU AGREE? ', width / 2, 300);
  
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

function onError(err) {

  print("something is wrong" + err);
}//push button to control Servo//
var button1;
var serial; // variable to hold an instance of the serialport library
var fromSerial = 0; //variable to hold the data

function setup() {
  createCanvas(windowWidth, windowHeight);
  img = loadImage("orwellcool.png"); // LOAD LOGO
  setupeye(); // LOAD EYE
  background(204, 204, 204);




  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  // serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in	
  // serial.list(); // list the serial ports
  serial.on('error', onError);
  serial.open("/dev/cu.usbmodem1421"); // open a port

  //BUTTONS


  button1 = createButton('Yes. It is green.');
  button1.id("button1");
  button1.position(1200, 400);
  button1.mousePressed(button1Pressed); // TEXT comes saying "good job go back to work"

  button2 = createButton('I am not quite sure.');
  //button2.id("button2");
  button2.position(1200, 500);
  button2.mousePressed(button2Pressed); // this is where the STAMP comes in

  button3_box = createDiv('   ');
  button3_box.id("blueButtonHolder");

  button3 = createButton('No. It is blue.');
  button3.id("button3");
  button3.position(1200, 600);
  
}

function button2Pressed() {

  Serial.print("1");
  //serial.write(valueToSend + ",");
  background(255, 0,0);
  textStyle(BOLD);
  fill(0, 0, 255);
  textSize(32);
  text(' Incorrect. Thought criminal detected. ', 500, 500);
}

function button1Pressed() {
  background(0, 0, 255);
  textStyle(BOLD);
  fill(255, 0, 0);
  textSize(32);
  text(' Correct. Go back to work. ', 500, 500);
}



var valueToSend;

function changeBG() {
  var val = random(255);
  background(val); /// TEST IF BUTTON WORKS
  valueToSend = int(map(val, 0, 255, 0, 180));
  serial.write(valueToSend + ",");
}


function draw() {

  draweye();
  img.resize(200, 200);
  image(img, width / 2, 60);
  textStyle(BOLD);
  noStroke();
  fill(204, 51, 0);
  textSize(32);
  text(' BIG BROTHER SAYS THIS PLANT IS GREEN. \n DO YOU AGREE? ', width / 2, 300);


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

function onError(err) {

  print("something is wrong" + err);
}//push button to control Servo//
var button1;
var serial; // variable to hold an instance of the serialport library
var fromSerial = 0; //variable to hold the data

function setup() {
  createCanvas(windowWidth, windowHeight);
  img = loadImage("orwell.png"); // LOAD LOGO
  setupeye(); // LOAD EYE





  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  // serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in	
  // serial.list(); // list the serial ports
  serial.on('error', onError);
  serial.open("/dev/cu.usbmodem1421"); // open a port

  //BUTTONS

  background(0);
  button1 = createButton('Yes. It is green.');
  button1.id("button1");
  button1.position(1200, 400);
  button1.mousePressed(button1Pressed); // TEXT comes saying "good job go back to work"

  button2 = createButton('I am not quite sure.');
  //button2.id("button2");
  button2.position(1200, 500);
  button2.mousePressed(button2Pressed); // this is where the STAMP comes in

  button3_box = createDiv('   ');
  button3_box.id("blueButtonHolder");

  button3 = createButton('No. It is blue.');
  //button3.id("button3");
  button3.position(1200, 600);

}

function button2Pressed() {

  //Serial.print("1");
  serial.write(valueToSend + ",");
}

function button1Pressed() {
  background(0, 0, 255);
  textStyle(BOLD);
  fill(255, 0, 0);
  textSize(32);
  text(' Correct. Go back to work. ', 500, 500);
}

var valueToSend;

function changeBG() {
  var val = random(255);
  background(val); /// TEST IF BUTTON WORKS
  valueToSend = int(map(val, 0, 255, 0, 180));
  serial.write(valueToSend + ",");
}


function draw() {

  draweye();
  img.resize(200, 200);
  image(img, width / 2, 60);
  textStyle(BOLD);
  noStroke();
  fill(102, 153, 0);
  textSize(32);
  text(' Big Brother says this plant is green. Do you agree? ', width / 2, 300);


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

function onError(err) {

  print("something is wrong" + err);
}//push button to control Servo//
var button1;
var serial; // variable to hold an instance of the serialport library
var fromSerial = 0; //variable to hold the data

function setup() {
  createCanvas(windowWidth, windowHeight);
  setupeye();
  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  // serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in	
  // serial.list(); // list the serial ports
  serial.on('error', onError);
  serial.open("/dev/cu.usbmodem1421"); // open a port

  //BUTTONS

  background(0);
  button1 = createButton('Yes. It is green.');
  button1.position(20, 350);
  button1.mousePressed(button1Pressed); // TEXT comes saying "good job go back to work"

  button2 = createButton('I am not quite sure.');
  button2.position(20, 300);
  button2.mousePressed(button2Pressed); // this is where the STAMP comes in

  button3_box = createDiv('   ');
  button3_box.id("blueButtonHolder");

  button3 = createButton('No. It is blue.');
  button3.id("button3");
  //button3.position(500,500);

}

function button2Pressed(){
	
  //Serial.print("1");
}

function button1Pressed(){
	 background(0,0,255);
   textSize(32);
   text( ' blablabla', width/2, height/2);
}

var valueToSend;

function changeBG() {
  var val = random(255);
  background(val); /// TEST IF BUTTON WORKS
  valueToSend = int(map(val, 0, 255, 0, 180));
  serial.write(valueToSend + ",");
}


function draw() {

  draweye();
  
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

function onError(err) {

  print("something is wrong" + err);
}var bbs = [];


// var x1 = map (mouseX, 0, 1080, 100, 75);

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 1; i++) {

    bbs[i] = new Bb();


  }
}


function draw() {
  background(220);

  for (let i = 0; i < bbs.length; i++) {
    bbs[i].move();
    bbs[i].display();
  }
}

function Bb() {


  this.y = random(0, height);

  this.display = function() {

    var xpupil = map(mouseX, 0, width, 240, 360);
    var ypupil = map(mouseY, 0, height, 310, 380);
    this.x = mouseX;

    line(190, 192, 146, 162); //lines are "eyelashes"
    line(130, 200, 170, 220);
    line(120, 234, 160, 250);
    fill(255, 200, 220, 30); //colour and shading of ellipse
    stroke(5);
    strokeWeight(10);
    ellipse(300, 300, 300, 300); //sets size and position, middle of page and half the size of the canvas
    fill(168, 200, 200, 100);
    stroke(3);
    strokeWeight(5); //thickness of outline of 'eye'
    ellipse(xpupil, ypupil, 100, 100); //sets size of inner circle but makes movement based on mouse position
    fill(0); //black
    ellipse(xpupil, ypupil, 50, 50); //eye pupil
    noFill();

    fill (0,0,255); // eyebrow
    beginShape();
    vertex(140, 142);
    vertex(240, 90);
    vertex(460, 205);
    endShape(CLOSE);

  }

  this.move = function() {

    this.x = 1 * -this.x; // move

  }
}var bbs = [];


// var x1 = map (mouseX, 0, 1080, 100, 75);

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 1; i++) {

    bbs[i] = new Bb();


  }
}


function draw() {
  background(220);

  for (let i = 0; i < bbs.length; i++) {
    bbs[i].move();
    bbs[i].display();
  }
}

function Bb() {


  this.y = random(0, height);

  this.display = function() {

    var xpupil = map(mouseX, 0, width, 240, 360);
    var ypupil = map(mouseY, 0, height, 310, 380);
    this.x = mouseX;

    line(190, 192, 146, 162); //lines are "eyelashes"
    line(130, 200, 170, 220);
    line(120, 234, 160, 250);
    fill(255, 200, 220, 30); //colour and shading of ellipse
    stroke(5);
    strokeWeight(10);
    ellipse(300, 300, 300, 300); //sets size and position, middle of page and half the size of the canvas
    fill(168, 200, 200, 100);
    stroke(3);
    strokeWeight(5); //thickness of outline of 'eye'
    ellipse(xpupil, ypupil, 100, 100); //sets size of inner circle but makes movement based on mouse position
    fill(0); //black
    ellipse(xpupil, ypupil, 50, 50); //eye pupil
    noFill();

    fill (0,0,255); // eyebrow
    beginShape();
    vertex(140, 142);
    vertex(240, 90);
    vertex(460, 205);
    endShape(CLOSE);

  }

  this.move = function() {

    this.x = 1 * -this.x; // move

  }
}var serial; // variable to hold an instance of the serialport library
var fromSerial = 0; //variable to hold the data
var txt;
var textbox;
var eternalparagraph;
var paragraph;


function setup() {
  createCanvas(windowWidth, windowHeight /2);
  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  // serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in	
  // serial.list(); // list the serial ports
  serial.on('error', onError);
  serial.open("/dev/cu.usbmodem1421"); // open a port

  //BUTTONS

  background(0);
  button1 = createButton('Yes. It is green.');
  button1.position(20, 350);
  button1.mousePressed(button1Pressed); // TEXT comes saying "good job go back to work"

  button2 = createButton('I am not quite sure.');
  button2.position(20, 300);
  button2.mousePressed(button2Pressed); // this is where the STAMP comes in

  button3_box = createDiv('   ');
  button3_box.id("blueButtonHolder");

  button3 = createButton('No. It is blue.');
  button3.id("button3");
  // button3.position(20, 250);
  // button3.mousePressed(button3Pressed); // this button has function that MOUSE slips off

 ///// TYPE YOUR NAME IN /////
  
  paragraph = createP (' Your name ' );
  textbox = createInput( ' Write your name here ' );
  textbox.changed ( dosmthng); // if new thing is written plus enter or tab
  
  
}
 function dosmthng () {
   paragraph.html (textbox.value());
   eternalparagraph = createP( ' have been compelled to ThoughCrime supervision ' );
  
   
   
 }

///// BUTTON FUNCTIONS //////

function button1Pressed() {
  s = "Correct. Now you can go back to work.";
  background("blue");
  fill("red");
  textSize(70);
  textStyle(BOLD);
  text(s, 180, 500, windowWidth, windowHeight);
}


function button2Pressed() {
  s2 = "Incorrect. !! Thought criminal detected!! ";
  background("red");
  fill("blue");
  textSize(70);
  textStyle(BOLD);
  text(s2, 180, 500, windowWidth, windowHeight);
}

var valueToSend;

function changeBG() {
  var val = random(255);
  background(val); /// TEST IF BUTTON WORKS
  valueToSend = int(map(val, 0, 255, 0, 180));
  serial.write(valueToSend + ",");
}


function draw() {

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

function onError(err) {

  print("something is wrong" + err);
}//push button to control Servo//
var button1;
var serial; // variable to hold an instance of the serialport library
var fromSerial = 0; //variable to hold the data

function setup() {
  createCanvas(windowWidth, windowHeight);
  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  // serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in	
  // serial.list(); // list the serial ports
  serial.on('error', onError);
  serial.open("/dev/cu.usbmodem1421"); // open a port

  //BUTTONS

  background(0);
  button1 = createButton('Yes. It is green.');
  button1.position(20, 350);
  button1.mousePressed(changeBG); // TEXT comes saying "good job go back to work"

  button2 = createButton('I am not quite sure.');
  button2.position(20, 300);
  button2.mousePressed(changeBG); // this is where the STAMP comes in

  button3_box = createDiv('   ');
  button3_box.id("blueButtonHolder");

  button3 = createButton('No. It is blue.');
  button3.id("button3");
  // button3.position(20, 250);
  button3.mousePressed(button3Pressed); // this button has function that MOUSE slips off
}

function button3Pressed(){
	print("button3 pressed");

}

var valueToSend;

function changeBG() {
  var val = random(255);
  background(val); /// TEST IF BUTTON WORKS
  valueToSend = int(map(val, 0, 255, 0, 180));
  serial.write(valueToSend + ",");
}


function draw() {

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

function onError(err) {

  print("something is wrong" + err);
}

//push button to control Servo//
var button1;
var serial; // variable to hold an instance of the serialport library
var fromSerial = 0; //variable to hold the data

function setup() {
  createCanvas(400, 400);
  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  // serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in	
  // serial.list(); // list the serial ports
  serial.on('error',onError);
  serial.open("/dev/cu.usbmodem1421"); // open a port
  
  //BUTTONS
  
  background(0);
  button1 = createButton('Yes. It is green.');
  button1.position(20, 350);
  button1.mousePressed(changeBG); // TEXT comes saying "good job go back to work"
  
  button2 = createButton('I am not quite sure.'); 
  button2.position(20, 300);
  button2.mousePressed(changeBG); // this is where the STAMP comes in
  
  button3 = createButton('No. It is blue.'); 
  button3.position(20, 250);
  button3.mousePressed(changeBG); // this button has function that MOUSE slips off
  }

var valueToSend;

  function changeBG() {
  var val = random(255);
  background(val); /// TEST IF BUTTON WORKS
    valueToSend = int(map(val,0,255,0,180));
     serial.write(valueToSend + ","); 
}


function draw() {
	// background(0,0,255);
  // var valueToSend = mousePressed; // when the button pushed, move the servo????
  // serial.write(valueToSend + ","); //here can come more values!!!!
  
  
  
  // IF MOUSE IS OVER button3, draw an ellipse for test
   // if (mouseX > 20 && mouseX <= 40 && mouseY > 250 && mouseY < y + 270) {
   //   fill(102, 51, 0); // the eyeball
   //   ellipse(30,40,30);
   // }
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

function onError(err){
  
 print("something is wrong" +err); 
}




 
  


let data;
function preload() {
  	data = loadJSON('https://raw.githubusercontent.com/dariusk/corpora/master/data/animals/dogs.json')
}

function setup() { 
  createCanvas(400, 400);
  background(0);
  createP(data.description);
  
  createA(data.source, 'source'); // create a link
  
  for ( let i = 0; i < data.dogs.length; i ++) {
    fill (255);
    textAlign(CENTER);
    text(data.dogs[i], random(width), random(height));
      
} 
  console.log(data);
}

var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1421';  // fill in your serial port name here
var inData; 

var sun;
var slider;

var checkbox;

function setup() {
  createCanvas(400, 400);
  
  let inData = slider.value() ; // where this should be?
  
  sun = new Sun();
  slider = createSlider(0, 200, 100);
  print(slider.value());
  
  checkbox = createCheckbox('Where is the sun', false);

} 


function draw() { 
  
  background(172, 205, 164);
  angleMode(DEGREES);
  noStroke();
  fill(300, 216, 178);
  ellipse(200, 400, 600, 200); //ground
  
  
    
  
  if(checkbox.checked() == true){
  	sun.display(slider.value());
    
    
  }
  
if (slider.value() > 1); { // what is slider value??
    fill(96, 44, 2);
     
 
  
}
 }var serial; // variable to hold an instance of the serialport library
var fromSerial = 0; //variable to hold the data

var sun;
var slider;

var checkbox;

function setup() {
  createCanvas(400, 400);
  
  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
	serial.on('list', printList); // callback function for serialport list event
	serial.on('data', serialEvent); // callback for new data coming in	
	serial.list(); // list the serial ports
	serial.open("/dev/cu.usbmodem1421"); // open a port
  
  
  sun = new Sun();
  slider = createSlider(0, 200, 100);
  print(slider.value());
  
  checkbox = createCheckbox('Where is the sun', false);

} 

function draw() { 
  
  background(172, 205, 164);
  angleMode(DEGREES);
  noStroke();
  fill(300, 216, 178);
  ellipse(200, 400, 600, 200); //ground
  
  
    
  
  if(checkbox.checked() == true){
  	sun.display(slider.value());
    
    
  }
  
if (slider.value() > 1); { // what is slider value??
    fill(96, 44, 2);
     
 
  
}
 }

function serialEvent() {
	// this is called when data is recieved, data will then live in fromSerial	
	var stringFromSerial = serial.readLine();
  if (stringFromSerial.length>0){
    var trimmedString = trim(stringFromSerial);
    fromSerial= Number(trimmedString);\
    print (stringFromSerial);
  }
var serial; // variable to hold an instance of the serialport library
var fromSerial = 0; //variable to hold the data
var posX=0,posY=0, step = 10;


var sun;
var slider;

var checkbox;

function setup() {
 
  
  createCanvas(320, 240);
	serial = new p5.SerialPort(); // make a new instance of  serialport librar	
	serial.on('list', printList); // callback function for serialport list event
	serial.on('data', serialEvent); // callback for new data coming in	
	serial.list(); // list the serial ports
	serial.open("/dev/cu.usbmodem1421"); // open a port

  
  
  sun = new Sun();
  slider = createSlider(0, 200, 100);
  print(slider.value());
  
  checkbox = createCheckbox('Where is the sun', false);

} 

function draw() { 
  
  background(172, 205, 164);
  noStroke();
  fill(300, 216, 178);
  ellipse(200, 400, 600, 200);
  
  
  if(checkbox.checked() == true){
  	sun.display(slider.value());
  }
  
if (slider.value() > 1); { // what is slider value??
    fill(96, 44, 2);
     
 
  
}
 



function serialEvent() {
	// this is called when data is recieved, data will then live in fromSerial	
	fromSerial = serial.read();
}var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1421'; // fill in your serial port name here
var inData;
var sun;
var slider;
var checkbox;


function setup() {
  createCanvas(400, 400);



  sun = new Sun();
  slider = createSlider(0, 1024, 100);
  print(slider.value());

  checkbox = createCheckbox('Where is the sun', false);
  serialconnection();
}

function draw() {

  background(172, 205, 164);
  angleMode(DEGREES);
  noStroke();
  fill(300, 216, 178);
  ellipse(200, 400, 600, 200); //ground




  if (checkbox.checked() == true) {
    sun.display(slider.value());


  }

  if (slider.value() > 1); { // what is slider value??
    fill(96, 44, 2);



  }
}/* Danny Rozin
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
  serial.open("/dev/cu.usbmodem1421"); // open a port
}

function draw() {
  background(255,0,0);
  var byteToSend = mouseX;
  byteToSend = map(byteToSend, 0, width, 0, 255);
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
	createCanvas(320, 240);
	serial = new p5.SerialPort(); // make a new instance of  serialport librar	
	serial.on('list', printList); // callback function for serialport list event
	serial.on('data', serialEvent); // callback for new data coming in	
	serial.list(); // list the serial ports
	serial.open("/dev/cu.usbmodem1421"); // open a port
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
	var stringFromSerial = serial.readLine();// read everything till we see the end of the line
  // which is 10 or 13 usually
  if (stringFromSerial.length>0){
    var trimmedString = trim(stringFromSerial);
    fromSerial= Number(trimmedString);// turn the string into a number
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
*///angleMode(DEGREES);

var sun;
var slider;

var checkbox;

function setup() {
  createCanvas(400, 400);
  
  
  
  sun = new Sun();
  slider = createSlider(0, 200, 100);
  print(slider.value());
  
  checkbox = createCheckbox('Where is the sun', false);

} 

function draw() { 
  
  background(172, 205, 164);
  noStroke();
  fill(300, 216, 178);
  ellipse(200, 400, 600, 200);
  
  
  if(checkbox.checked() == true){
  	sun.display(slider.value());
  }
  
if (slider.value() > 1); { // what is slider value??
    fill(96, 44, 2);
     
 
  
}
 }let bubble;

function setup() {
  createCanvas(600, 500);
  bubble = new Bubble();
  //print (bubble.x, bubble.y);
}

function draw() {
  background(0);
  bubble.move();
  bubble.show();
}

class Bubble {
  constructor(x, y, r ) {
    this.x = 44;
    this.y = 44;

  }

  move() {

    this.x = mouseX;
    this.y = mouseY;
    
  }

  show() {

    stroke(255);
    strokeWeight(4);
    noFill();
    ellipse(this.x, this.y, 34);
  }

}let hedgie1;
let slider;


function setup() {
  createCanvas(600, 400);
  slider = createSlider(0, 600, 86);
  


// create hedgehog
hedgie1 = new Hedgie(100, 100);
}

function draw() {
  background(172, 205, 164);
  fill(223, 216, 178);
  rect(0, 270, 600, 200);
  
  // display hedgehog
  hedgie1.display();
  print(slider.value());
  
  // hedgie1.move(slider.value()); move hedgie
   hedgie1.move(slider.value());
}

function mousePressed() {
	createP("Good job!");
}
  

  
  var b1;
var b2;

function setup() {
  createCanvas(600, 400);
  b1 = new Bubble(250, 200);
  b2 = new Bubble(350, 200);
}

function draw() {
  background(0);

  b1.update();
  b2.update();
  b1.display();
  b2.display();

  if (b1.intersects(b2)) {
    b1.changeColor();
    b2.changeColor();
  }
}let bubble = [];




function setup() {

  createCanvas(600, 500);
for ( let i = 0; i < 5; i++){
  let x = random(width);
  let y = random(height);
  let r = random(42, 40);
  let b = new Bubble(x, y, r);
  bubble.push(b);
}
}


function mousePressed() {
  for (let i = 0; i < bubble.length; i++) {
    bubble[i].clicked(mouseX, mouseY); // when the mouse is pressed is it inside that object?
   
}
}



function draw() {
  background(0);

  for (let i = 0; i < bubble.length; i++) {
    bubble[i].move();
    bubble[i].show();


  }
}




class Bubble {
  constructor(x, y, r) {
    this.x = 344;
    this.y = 44;
    this.r = r; //// ??????
    this.brightness = 0;

  }

  clicked(px, py) {
    let d = dist(px, py, this.x, this.y); //distance between mouse and circle point
    if (d < this.r) { //ha a koron belul katintok a radiuson belul
      print("juhuuuu");
      this.brightness = 255;
    }

  }
  move() {

    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);



  }

  show() {

    stroke(255);
    strokeWeight(4);
    fill( this.brightness, 100);
    ellipse(this.x, this.y, this.r * 2);
  }

}let bubble = [];

function setup() {
  createCanvas(600, 500);
  //   for (let i = 0; i < 10; i++) {
  //     let x = random(height);
  //     let y = random(width);
  //     let r = random(10, 40);

  //     bubble[i] = new Bubble(x, y, r);
}

function mousePressed() {
  let r = random(10, 50);
  let b = new Bubble(mouseX, mouseY, r);
  bubble.push(b);

}

function draw() {
  background(0);
  for (let i = 0; i < bubble.length; i++) {

    bubble[i].move();
    bubble[i].show();
  }
}




class Bubble {
  constructor(x, y) {
    this.x = 344;
    this.y = 44;
    this.r = r;  //// ??????

  }

  move() {

    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
   


  }

  show() {

    stroke(255);
    strokeWeight(4);
    noFill();
    ellipse(this.x, this.y, roo *2);
  }

}var nums = [35, 58, 79, 90];
var index = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);


  for (var i = 0; i < 4; i++) {
    stroke(255);
    fill(51);
    ellipse(i * 80 + 100, 200, nums[i], nums[i]);
  }
}var words = ["egy", "kis", "malac", "roff", "rofff"," rofffff"];
var index = 0;

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  
  fill ( 255);
  textSize(34);
  text(words[index],12,100);
}

function mousePressed() {
  index = index + 1;
  
  if (index == words.length)// length az egy beepitett dolog 
  {
    index = 0;
  }
}let bubble;

function setup() {
  createCanvas(600, 500);
  bubble = new Bubble();
  //print (bubble.x, bubble.y);
}

function draw() {
  background(0);
  bubble.move();
  bubble.show();
}

class Bubble {
  constructor(x, y, r ) {
    this.x = 344;
    this.y = 44;

  }

  move() {

    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
    
  }

  show() {

    stroke(255);
    strokeWeight(4);
    noFill();
    ellipse(this.x, this.y, 34);
  }

}function setup() { 
 // var angles = degrees ( PI / 2); // converts radience into degrees, this case 90
  
  var km = milesToKm(26.3);
  print (km);
  
} 

function milesToKm (miles) {
  var km = miles * 1.6;
  return km;
}// the class is a collection of the functions
let bouncers = []; // its an array
let gravity = 0.1;

function setup() {
  createCanvas(400, 400);
  createP('Hello'); // this is selectable text
  let button = createButton("submit");
  button.mousePressed(addBall);

  
  function addBall(){
    bouncers.push(newBall(random(width),100));

  // for (let i = 0; i < 40; i++) {
  // bouncers[i] = new Ball(random(width), random(height), 5);
}
}

function draw() {
  background(220);
  fill(30,20,30);

  for (let i = 0; i < bouncers.length; i++) {
    bouncers[i].render();
    bouncers[i].update();
 }
  
  // if (bouncers.length > 100){
  //   bouncers.splice(0,1);
  
  
}

function mousePressed(){
  bouncers.push(new Ball(mouseX, mouseY));
}// the class is a collection of the functions
let bouncers = []; // its an array
let gravity = 0.1;

function setup() {
  createCanvas(400, 400);
  

  for (let i = 0; i < 40; i++) {
  bouncers[i] = new Ball(random(width), random(height), 5);
}
}

function draw() {
  background(220);
  fill(30,20,30);

  for (let i = 0; i < bouncers.length; i++) {
    bouncers[i].render();
    bouncers[i].update();
 }
  
  // if (bouncers.length > 100){
  //   bouncers.splice(0,1);
  
  
}

function mouseDragged(){
  bouncers.push(new Ball(mouseX, mouseY));
}var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1421';  // fill in your serial port name here
 var fromSerial=0;

function setup() {
  createCanvas(500,500);
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

function draw(){
  background(fromSerial);
  text(fromSerial,100,100);
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
  if (stringFromSerial.length>0){
    var trimmedString= trim(stringFromSerial);
    fromSerial= Number(trimmedString);
  }
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}

// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 print(i + " " + portList[i]);
 }
}let img;
let kidsize = 1;

function setup() { 
  createCanvas(400, 400);
  background(0);
  img = loadImage ('kid.jpg');
  
} 

function draw() { 
  imageMode(CENTER);
  tint (0,0,233);
  image(img,200,200, kidsize, kidsize ++);
  
}// the class is a collection of the functions
let bouncers = []; // its an array
let gravity = 0.1;

function setup() {
  createCanvas(400, 400);
 // 
 //   let x = random(width);
 //   let y = random(height);
 //   let r = random(32);
 //   bouncers.push(new Ball(x,y,r);
  bouncers[0]= new Ball (100,100);
  bouncers[1] = new Ball(255,125);
}
                 
function draw() {
  background(220);

  bouncers[0].render();
  bouncers[1].render();

  bouncers[0].update();
  bouncers[1].update();


}// Bouncing ball
// no objects

let x = 200;
let y = 20;
let speed = 0;
let gravity = 0.1;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  fill(0);
  ellipse(x, y, 24, 24);

  y = y + speed;
  speed = speed + gravity;
  if (y > height) {
    y = height;
    speed = -0.95 * speed;
  }
}let movement = 0;

function setup() { 
  createCanvas(400, 400);
  
  background(20);
  stroke(220);
  noFill();
  // movement= map (mouseX,0,width,0,2*PI);
  push();
  translate(200,200);
  rotate(movement);
  lineFractal(0,0,200);
  pop();
  
  
  
} 

function draw() { 

  
  
}

function lineFractal(x,y,diam){
  if (diam > 5) {
    ellipse( x, y, diam, diam );
    lineFractal(x-diam/2,y,diam/2);
    lineFractal(x+diam/2,y,diam/2);
    
  }
}
    let movement = 0;

function setup() { 
  createCanvas(400, 400);
  
  
} 

function draw() { 
  background(20);
  stroke(220);
  noFill();
  movement= map (mouseX,0,width,0,2*PI);
  push();
  translate(200,200);
  rotate(movement);
  circleFractal(0,0,200);
  pop();
  
  
}

function circleFractal(x,y,diam){
  if (diam > 5) {
    ellipse( x, y, diam, diam );
    circleFractal(x-diam/2,y,diam/2);
    circleFractal(x+diam/2,y,diam/2);
    
  }
}
    class Eye {
  constructor(xPos, yPos){
    // this objects basic parameters
		this.x = xPos;
    this.y = yPos;
    this.speed = random(1, 10);
    this.col = color(205, 255, 255);
  }
  
  display(){
    fill(this.col);
   	ellipse(this.x, this.y, 10, 10); 
  }
  
  move(){
   	this.x = this.x + this.speed;
    if(this.x > width || this.x < 0){
    	this.speed = this.speed * -1; 
    }  
  }
  
  checkHowCloseTheMouseIs(){
  	var distance = dist(mouseX, mouseY, this.x, this.y);
    if(distance < 100){
    	this.col = color(255,0,0);


    }else{
      this.col = color(255, 255, 255);

    }
  }
}


var all_our_copies = [];

// var eye_copy1;
// var eye_copy2;

function setup() { 
  createCanvas(400, 400);
  
	// all_our_copies.push( new Eye(50, 30)  );
	// all_our_copies.push( new Eye(70, 100) );
  
  for(var i = 0; i < 500; i++){
    all_our_copies.push( new Eye( random(width) , i * height/100)  );
  }
  
  // print(all_our_copies);
  // print(all_our_copies[0]);
  // print(all_our_copies[1].x);
  
  // eye_copy1 = new Eye(50, 30);
  // eye_copy2 = new Eye(70, 100);
  
  
  // print(eye_copy1);
} 

function draw() { 
  background(220, 50);
  
  for(var i = 0; i < 100; i++){
    all_our_copies[i].display();
  	all_our_copies[i].move();
    all_our_copies[i].checkHowCloseTheMouseIs();
  }
  
  // eye_copy1.display();
  // eye_copy1.move();
  // eye_copy2.display();
  // eye_copy2.move();
}// I would like to reach that only the eyes are working if I drag the mouse 
// the lashes could be the vertex and controlled by the mouse over them


function setup() {
  createCanvas(700, 400);
  angleMode(DEGREES);
}


// function mousePressed () {

//   draweye(mouseX, mouseY, mouseX, mouseY); // I would like to draw the whole eye 
//   // where I click

// }

function draw() {
  background(220);

  for (var row = 0; row < 3; row++) {
    for (var column = 0; column < 3; column++) {
      eye(100 + (column * 200), 70 + (row * 130), mouseX, mouseY);
    }
  }
  // eye(100, 70, mouseX, mouseY);
  // eye(100, 200, mouseX, mouseY); //I would like them to move along the edge of eye
  // eye(100, 330, mouseX, mouseY);
  // eye( 260, 70, mouseX, mouseY);
  // eye( 260, 200, mouseX, mouseY); //I would like them to move along the edge of eye
  // eye( 260, 330, mouseX, mouseY);
  // eye( 420, 70, mouseX, mouseY);
  // eye( 420, 200, mouseX, mouseY); //I would like them to move along the edge of eye
  // eye( 420, 330, mouseX, mouseY);
  // eye( 580, 70, mouseX, mouseY);
  // eye( 580, 200, mouseX, mouseY); //I would like them to move along the edge of eye
  // eye( 580, 330, mouseX, mouseY);

  //// MY FUNCTION FOR EYE
}

function eye(x, y, pupil, eyeball) {

  //let eyebrow = y - eyeball;

  noStroke();
  fill(255, 153, 153);
  ellipse(x, y, 150, 100);

  stroke(0);
  for (var i = -5; i < 6; i++) {

    push();
    translate(x, y)
    var abs_i = 5 - abs(i); //absolute value
    var lashlength = -77 + (abs_i * 2);
    rotate(i * 15);
    line(0, 0, 0, lashlength);
    pop();
  }

  noStroke();
  fill(255, 204, 204); // smaller white part of the eye
  ellipse(x, y, 120, 70);

  fill(0, 102, 255); //the pupil
  ellipse(x, y, map(pupil, 0, width, 0, 100), 42);


  fill(0, 0, 102); // the eyeball
  ellipse(x, y, map(eyeball, 0, height, 0, 100), 32);

  fill("red");




  //// THE EYE COLOR CHANGE 
  ////// I want this to only effect the eye within I use the mouse, not all of them
  // if (mouseX > 30 && mouseX <= 170 && mouseY > 10 && mouseY < 100) {
  if (mouseX > x - 50 && mouseX <= x + 50 && mouseY > y - 50 && mouseY < y + 50) {

    fill(204, 102, 0); //the pupil
    ellipse(x, y, map(pupil, 0, width, 0, 100), 42);

    fill(102, 51, 0); // the eyeball
    ellipse(x, y, map(eyeball, 0, height, 0, 100), 32);
  }

  /////// BLINK PART

  if (mouseIsPressed) { // do I have to put this into a function?
    fill(255, 184, 122);
    ellipse(x, y, 140, 120);


    push(); //invisible points making my curvevertex move
    strokeWeight(23);
    stroke(0);
    point(mouseX, mouseY);
    pop();

    beginShape();

    stroke(255);
    noFill();
    curveVertex(mouseX, mouseY);
    curveVertex(x - 50, y);
    curveVertex(x + 50, y);
    curveVertex(mouseX, mouseY);
    //curveVertex(mouseX, mouseY);
    //curveVertex(x / 2, y);
    //curveVertex(x * 1.5, y);
    //curveVertex(mouseX, mouseY);

    endShape();
  }





}





// function otherpupilla() {






////EYECOLOR how can I set that if Im on top of an eyeball, the eye color changesfunction setup() {
  createCanvas(200, 200);
  background(255);
  text('Temperature in °C: 25', 0, 50);
  var temp = CtoF(35);
  text('Temperature in °F: ' + temp, 0, 100);
}

function CtoF(celc) {
  var fare = celc * 1.8 + 32;
  return fare;
}function setup() {
  createCanvas(200, 200);
  background(255);
  noStroke();
  colorMode(HSB, 255);
  for (var i= 50; i < 151; i +=50) {
    iceCream( i ,100, random(30,45));
  }
}

function iceCream(x, y, diameter) {
  fill(random(360), 112, 331);
  arc(x, y, diameter, diameter, -PI, 0);
  fill('#d7c38e');
  triangle(x - diameter / 2, y + 5, x + diameter / 2, y + 5, x, y + diameter * 1.3);
}// I would like to reach that only the eyes are working if I drag the mouse 
// the lashes could be the vertex and controlled by the mouse over them


function setup() {
  createCanvas(700, 400);

}


// function mousePressed () {
  	
//   draweye(mouseX, mouseY, mouseX, mouseY); // I would like to draw the whole eye 
//   // where I click
  
// }

function draw() {
  background(220);
  
  

  eye(100, 70, mouseX, mouseY);
  eye(100, 200, mouseX, mouseY); //I would like them to move along the edge of eye
  eye(100, 330, mouseX, mouseY);
  // eye( 260, 70, mouseX, mouseY);
  // eye( 260, 200, mouseX, mouseY); //I would like them to move along the edge of eye
  // eye( 260, 330, mouseX, mouseY);
  // eye( 420, 70, mouseX, mouseY);
  // eye( 420, 200, mouseX, mouseY); //I would like them to move along the edge of eye
  // eye( 420, 330, mouseX, mouseY);
  // eye( 580, 70, mouseX, mouseY);
  // eye( 580, 200, mouseX, mouseY); //I would like them to move along the edge of eye
  // eye( 580, 330, mouseX, mouseY);

  //// MY FUNCTION FOR EYE

  function eye(x, y, pupil, eyeball) {
    
    let eyebrow = y - eyeball;

    noStroke();
    fill(255, 153, 153);
    ellipse(x, y, 150, 100);

    fill(255, 204, 204); // smaller white part of the eye
    ellipse(x, y, 120, 70);

    fill(0, 102, 255); //the pupil
    ellipse(x, y, map(pupil, 0, width, 0, 100), 42);
   

    fill(0, 0, 102); // the eyeball
    ellipse(x, y, map(eyeball, 0, height, 0, 100), 32);

    fill ("red");
    
    
    
    
      //// THE EYE COLOR CHANGE 
    ////// I want this to only effect the eye within I use the mouse, not all of them
     if (mouseX > 30 && mouseX <= 170 && mouseY > 10 && mouseY < 100) {

      fill(204, 102, 0); //the pupil
      ellipse(x, y, map(pupil, 0, width, 0, 100), 42);
      
      fill(102, 51, 0); // the eyeball
      ellipse(x, y, map(eyeball, 0, height, 0, 100), 32);
     }

    /////// BLINK PART

    if (mouseIsPressed) { // do I have to put this into a function?
      fill(255, 184, 122);
      ellipse(x, y, 140, 120);
      line(x, y, 140, 120);



      push(); //invisible points making my curvevertex move
      strokeWeight(23);
      point(mouseX, mouseY);
      pop();

      beginShape();

      stroke(255);
      noFill();
      curveVertex(mouseX, mouseY);
      curveVertex(x / 2, y);
      curveVertex(x * 1.5, y);
      curveVertex(mouseX, mouseY);

      endShape();
    }

  

    
  }
}
     
  
  


  // function otherpupilla() {

  




  ////EYECOLOR how can I set that if Im on top of an eyeball, the eye color changes// I would like to reach that only the eyes are working if I drag the mouse 
// the lashes could be the vertex and controlled by the mouse over them


function setup() {
  createCanvas(700, 400);

}


// function mousePressed () {
  	
//   draweye(mouseX, mouseY, mouseX, mouseY); // I would like to draw the whole eye 
//   // where I click
  
// }

function draw() {
  background(220);
  
  

  eye(100, 70, mouseX, mouseY);
  eye(100, 200, mouseX, mouseY); //I would like them to move along the edge of eye
  eye(100, 330, mouseX, mouseY);
  // eye( 260, 70, mouseX, mouseY);
  // eye( 260, 200, mouseX, mouseY); //I would like them to move along the edge of eye
  // eye( 260, 330, mouseX, mouseY);
  // eye( 420, 70, mouseX, mouseY);
  // eye( 420, 200, mouseX, mouseY); //I would like them to move along the edge of eye
  // eye( 420, 330, mouseX, mouseY);
  // eye( 580, 70, mouseX, mouseY);
  // eye( 580, 200, mouseX, mouseY); //I would like them to move along the edge of eye
  // eye( 580, 330, mouseX, mouseY);

  //// MY FUNCTION FOR EYE

  function eye(x, y, pupil, eyeball) {
    
    let ny = y - pupil - eyeball;

    noStroke();
    fill(255, 153, 153);
    ellipse(x, y, 140, 120);

    fill(255, 204, 204); // smaller white part of the eye
    ellipse(x, y, 120, 70);

    fill(0, 102, 255); //the pupil
    ellipse(x, y, map(pupil, 0, width, 0, 100), 42);
    //ellipse(x, y, pupil%100, 42);


    fill(0, 0, 102); // the eyeball
    ellipse(x, y, map(eyeball, 0, height, 0, 100), 32);

    //ellipse(x, y, eyeball%100 , 32);
    
    
    
      //// THE EYE COLOR CHANGE 
    ////// I want this to only effect the eye within I use the mouse, not all of them
     if (mouseX > 30 && mouseX <= 170 && mouseY > 10 && mouseY < 100) {

      fill(204, 102, 0); //the pupil
      ellipse(x, y, map(pupil, 0, width, 0, 100), 42);
      
      fill(102, 51, 0); // the eyeball
      ellipse(x, y, map(eyeball, 0, height, 0, 100), 32);
     }

    /////// BLINK PART

    if (mouseIsPressed) { // do I have to put this into a function?
      fill(255, 184, 122);
      ellipse(x, y, 140, 120);
      line(x, y, 140, 120);



      push(); //invisible points making my curvevertex move
      strokeWeight(23);
      point(mouseX, mouseY);
      pop();

      beginShape();

      stroke(255);
      noFill();
      curveVertex(mouseX, mouseY);
      curveVertex(x / 2, y);
      curveVertex(x * 1.5, y);
      curveVertex(mouseX, mouseY);

      endShape();
    }

  

    
  }
}
     
  
  


  // function otherpupilla() {

  




  ////EYECOLOR how can I set that if Im on top of an eyeball, the eye color changes// I would like to reach that only the eyes are working if I drag the mouse 
// the lashes could be the vertex and controlled by the mouse over them

// I would like 
function setup() {
  createCanvas(700, 400);
}

function draw() {
  background(220);

  eye( 100, 70, mouseX, mouseY);
  eye( 100, 200, mouseX, mouseY); //I would like them to move along the edge of eye
  eye( 100, 330, mouseX, mouseY);
  eye( 260, 70, mouseX, mouseY);
  eye( 260, 200, mouseX, mouseY); //I would like them to move along the edge of eye
  eye( 260, 330, mouseX, mouseY);
  eye( 420, 70, mouseX, mouseY);
  eye( 420, 200, mouseX, mouseY); //I would like them to move along the edge of eye
  eye( 420, 330, mouseX, mouseY);
  eye( 580, 70, mouseX, mouseY);
  eye( 580, 200, mouseX, mouseY); //I would like them to move along the edge of eye
  eye( 580, 330, mouseX, mouseY);
  
  
  function eye (x, y, pupil, eyeball) {
    
  noStroke();// pink big eye can blink for mouse click
  fill(255, 153, 153);
  ellipse(x, y, 140, 120);

  fill(255, 204, 204); // smaller white part of the eye
  ellipse(x, y, 120, 70);

    if (mouseX < x &&  mouseY > y ) {
    
    fill(0, 102, 255); //the pupil
    
    ellipse(x, y, map (pupil, 0, width, 0,100) , 42);


 
   fill(0, 0, 102); // the eyeball
    ellipse(x, y, map (eyeball, 0 , height, 0 , 100) , 32);
    
    }
  
  }



}// I would like to reach that only the eyes are working if I drag the mouse 
// the lashes could be the vertex and controlled by the mouse over them

// I would like 
function setup() {
  createCanvas(700, 400);
}

function draw() {
  background(220);

  eye( 100, 70, mouseX, mouseY);
  eye( 100, 200, mouseX, mouseY); //I would like them to move along the edge of eye
  eye( 100, 330, mouseX, mouseY);
  eye( 260, 70, mouseX, mouseY);
  eye( 260, 200, mouseX, mouseY); //I would like them to move along the edge of eye
  eye( 260, 330, mouseX, mouseY);
  eye( 420, 70, mouseX, mouseY);
  eye( 420, 200, mouseX, mouseY); //I would like them to move along the edge of eye
  eye( 420, 330, mouseX, mouseY);
  eye( 580, 70, mouseX, mouseY);
  eye( 580, 200, mouseX, mouseY); //I would like them to move along the edge of eye
  eye( 580, 330, mouseX, mouseY);
  
  
  function eye (x, y, pupil, eyeball) {
    
  noStroke();// pink big eye can blink for mouse click
  fill(255, 153, 153);
  ellipse(x, y, 140, 120);

  fill(255, 204, 204); // smaller white part of the eye
  ellipse(x, y, 120, 70);

    fill(0, 102, 255); //the pupil
    //ellipse(x, y, map (pupil, 0, width, 0, 100) , 42);
    ellipse(x, y, pupil%100, 42);


    fill(0, 0, 102); // the eyeball
    //ellipse(x, y, map (eyeball, 0 , height, 0 , 100) , 32);
    
    ellipse(x, y, eyeball%100 , 32);
    
    
  
  }



}// I would like to reach that only the eyes are working if I drag the mouse 
// the lashes could be the vertex and controlled by the mouse over them

// I would like 
function setup() {
  createCanvas(700, 400);
}

function draw() {
  background(220);

  

  eye( 120, 320, mouseX, mouseY); //I would like them to move along the edge of eye
  
  function eye (x, y, pupil, eyeball) {
    
  noStroke();// pink big eye can blink for mouse click
  fill(255, 153, 153);
  ellipse(x, y, 140, 120);

  fill(255, 204, 204); // smaller white part of the eye
  ellipse(x, y, 120, 70);

    fill(0, 102, 255); //the pupil
    ellipse(x, y, pupil, 42);

    fill(0, 0, 102); // the eyeball
    ellipse(x, y, eyeball, 32);
  }



}

function setup() {
  createCanvas(720, 480);
  strokeWeight(2);
  //ellipseMode(RADIUS);
}

function draw() {
  //background(204);
  drawNyuszi(120, 420, 110, 140);
  
}

function drawNyuszi(x, y, bodyHeight, neckHeight) {

  let radius = 55;
  let ny = y - bodyHeight - neckHeight - radius; // neckHeight Y

 
  
let lashes = 0;
  
  line(x, lashes + 200, x - 18, lashes + 120);
  line(x, lashes + 200, x - 42, lashes + 120);
  line(x, lashes + 200,x - 78, lashes + 120);
  
   // Bodyeze
  push();
  noStroke();
  fill (255, 153, 153);
  ellipse (x + 20,y - bodyHeight, x+ 20 , ny);
  fill (255, 204, 204);
  ellipse(x + 23, y - bodyHeight, x , ny/2);
  pop();

  // Body
  noStroke();
  fill(102);
  ellipse(x, y - 33, 33, 33);
  fill(0);
  rect(x - 45, y - bodyHeight, 90, bodyHeight - 33);
  fill(102);
  rect(x - 45, y - bodyHeight + 17, 90, 6);

  // Head
  fill(0);
  ellipse(x + 12, ny, radius, radius);
  fill(255);
  ellipse(x + 24, ny - 6, 14, 14);
  fill(0);
  ellipse(x + 24, ny - 6, 3, 3);
  fill(153);
  ellipse(x, ny - 8, 5, 5);
  ellipse(x + 30, ny - 26, 4, 4);
  ellipse(x + 41, ny + 6, 3, 3);
}let a = 0.0; // how I make a spiral along the ellipse can move and than backwards
let r = 40;
let aVel = 0.0;
let aAcc = 0.001;

   
    
    function setup() { 
  createCanvas(400, 400);
    
       
} 

function draw() { 
    background(220);
  
  translate (200,200);
  let x = r * cos (a);
  let y = r * sin (a);
  
  
//   for ( var r = 0; r = <width ; r = r+ 5 ) {
  
  fill(255);
  stroke(2);
  ellipse ( x , y, 60,60);
  line ( 0,0,x, y );
// }

  
  
  a += aVel;
  aVel += aAcc;
  aVel = constrain (aVel, 0, 0.6); //its going faster by the last value
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  
  stroke(255);
  noFill();
  
  beginShape ();
  
  for ( let a = 0; a < 360; a += 45) {
    let x = 100 * cos (a) + 200;
    let y = 100 * sin (a) + 200;
    
    vertex(x, y);
    
    endShape();
    
  }
}// let x = 50;
// let y = 50;
let angle = 0;

function setup() { 
  createCanvas(400, 400);
  angleMode (DEGREES);
} 

function draw() { 
  background(220);
  
  
  push(); // protecting this code part, thats the beginning
  translate (60,60);
  rotate(angle);
  fill(0);
  rectMode (CENTER);
  rect (0, 0, 40, 40);
  stroke (255);
  line ( 0,0, 40,40);
   pop(); // thats the end of the code, nothing is gonna bother this
  
   translate (330,330);
  //rotate(-angle * 4);
  scale (mouseX / 100, mouseY / 100);
  fill(0);
  rectMode (CENTER);
  rect (0, 0, 40, 40);
  stroke (255);
  line ( 0,0, 40,40);
  
  
  angle = angle + 1;
 
  
 
  
}

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(0);
  strokeWeight(4);
  stroke (255);
  
  
  for (var x = 0; x <= width; x += 50) {
    for (var y = 0; y <= height; y += 50) {
       
  fill ( 233, 0, random(255)); 
    ellipse ( x, y , 20, 20);
      }
  }
  

}var offset = 0;

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(0);
  strokeWeight(4);
  stroke (255);
  
  
  for (var x = 0; x <= width; x += 50) {
    fill ( 233, 0, random(255)); 
    ellipse ( x + offset, 200, 20, 20);
  }
  
  offset = offset + 1;
}


function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(0);
  strokeWeight(4);
  stroke(255);
  
  var x = 0;
  
  while (x <= width) {
    fill( 2, 3, 255);
    ellipse ( x, 100, 20, 20);
    x = x + 50;
  }
  
  
  for (var x = 0; x <= width; x += 50) {
    fill ( 233, 55, 133);
    ellipse ( x , 200, 20, 20);
    
  }
  
  
}let x = 0;

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  
//   for (let x = 0; x < mouseX; x = x + 50) {
//     	line(x, 0, x, height);
  
    x = x + 5;
    line (x, 0, x, height);
    
  }

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  
  for (let x = 0; x < mouseX; x = x + 50) {
    	line(x, 0, x, height);
  }
}


//////// SLider Variables

// equals to slider button width, for consistency
let offset = 20;


// variable that is mapped to slider
let tizes ={
  
  x: 0,
  y: 0
}

    
    
let slider = {

  x: 10,
  y: 365,
  height: 20,
  width: 20
}

let dragged = false;



////////// 10 Print Variables

var x = 0;
var y = 0;



function setup() {
  createCanvas(400, 400);
  background(255);
}




function draw() {
  
  
 
  
  
  //10 Print Drawi Part

  if (random(1 , 10) > tizes) {
    
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
  
  //Making sure our box doesnt move further than canvas  
  if (dragged) {
    slider.x = mouseX - offset;
    slider.x = constrain(slider.x, 10, width - 35); // not to go further than thline

  }
  
   //slider box 
  fill(255);
  
  rect(-5, height - 50, width + 5, 50);
  
  
  tizes = map(slider.x, 35 ,365, 0, 9);
  
  
    // while (tizes.x > 480) {
    // line(tizes.x , 23 , 23 ,23);
    // tizes.x = tizes.x + 50; }
  
  
  
   //line(10, canvas.y / 2, canvas.x - 10, canvas.y / 2);
  
  rect(slider.x, slider.y, slider.width, slider.height);
  
//   while (tizes.x > 480) {
    
//   	line( 35 , height - 35 , width - 35 , height - 35);
//   	tizes.x = tizes.x + 50; 
    
    
//   }


  
  
}


////////Slider Drag nd Release Functions


function mouseDragged() {
  if (mouseX > slider.x &&
    mouseX < (slider.x + slider.width) &&
    mouseY > slider.y &&
    mouseY < (slider.y + slider.height)) {
    // if all this is true aka we are dragging the slider, 
    // the follwing code will execute:
    print("yes");
    dragged = true;

  }

}

function mouseReleased() {
  dragged = false;
}


var x = 0;
var y = 0;

function setup() {
  createCanvas(400, 400);
  background(0);
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
    y += 20;
  }
}

let canvas = {
  x: 500,
  y: 500

}

// equals to slider button width, for consistency
let offset = 5;



let tizes ={
  
  x: 0,
  y: 0
}

    
    
let slider = {

  x: 20,
  y: 240,
  height: 20,
  width: 20
}

let dragged = false;


function setup() {
  createCanvas(canvas.x, canvas.y);
}

function draw() {
  background(220);
  //line(10, canvas.y / 2, canvas.x - 10, canvas.y / 2);
  rect(slider.x, slider.y, slider.width, slider.height);
  
  
  tizes = map(slider.x, 10 , 480, 10, 35);
  
  line(slider.x , tizes , slider.y ,tizes);
  
  while (tizes.x > 480) {
    line(tizes.x , 23 , 23 ,23);
    tizes.x = tizes.x + 50; }
  
  
//   // /// ELLIPSE
//   ellipseWidth = map(slider.x, 10, 480, 10, 35);
//   ellipse(canvas.x / 2, canvas.y - 60, ellipseWidth, ellipseWidth);
  
  if (dragged) {
    slider.x = mouseX - offset;
    slider.x = constrain(slider.x, 10, 480); // not to go further than thline

  }
}







function mouseDragged() {
  if (mouseX > slider.x &&
    mouseX < (slider.x + slider.width) &&
    mouseY > slider.y &&
    mouseY < (slider.y + slider.height)) {
    // if all this is true aka we are dragging the slider, 
    // the follwing code will execute:
    print("yes");
    dragged = true;

  }

}

function mouseReleased() {
  dragged = false;
}var on = true;
var r = 0;
var g = 45;
var b = 0;
    
    
  function setup() { 
  createCanvas(400, 400);
} 

function draw() { 

  if (on) {
  background (220);
} else {
    background (b,r,g);
  }
    
  r = map (mouseX, 0, 600,0,255);
  
  
  fill(r,g,b);
  rect (300,50, 122, 122 );
  
 if ( mouseX > 200 && mouseX < 400);
 fill (255);
  
  b = b + 0.1
  
  {
    if (mouseY > 200) {
  line (b , 200, r, mouseY);
  } 
  else if (mouseY > 0) {
  rect ( r, mouseY, b , 55);
    
  }
    

  let count = 0;

function setup() { 
  createCanvas(400, 400);
   background(220);
} 

function draw() { 
 
  }
  
function mousePressed () {
  fill("red");
  ellipse ( mouseX, mouseY, 40,40);
  count ++; // it means count equals count + 1 but simple
  print(count);
  
  if(count == 5) {
    fill("green");
    ellipse(mouseX, mouseY, 30,30);
     } else {
       fill("black");
       ellipse(mouseX, mouseY, 30,30);
       
     }
}var on = true;
var r = 0;
var g = 45;
var b = 0;
    
    
  function setup() { 
  createCanvas(400, 400);
} 

function draw() { 

  if (on) {
  background (220);
}else {
    background (b,r,g);
  }
    
  r = map (mouseX, 0, 600,0,255);
  
  rectMode(CENTER);
  fill(r,g,b);
  rect (200,200, 122, 122 );
  
 if ( mouseX > 200 && mouseX < 400);
 fill (255);
  
  b = b + 0.2
  
  {
    if (mouseY > 300) {
  line (b , 55, r, mouseY);
  } 
  else if (mouseY > 100) {
  rect ( r, mouseY, b, 55);
    {
  }
    
  }
function mousePressed() { //why it works not only within cube
  
  if ( mouseX > 200 && mouseX < 400);
  on = !on
  
}}
  
  let speed = 1;
var on = true;
var r = 0;
var g = 45;
var b = 0;


function setup() {
  createCanvas(400, 400);
}

function draw() {

  if (on) {
    background(220);
  } else {
    background(b, r, g);
  }

  r = map(mouseX, 0, 600, 0, 255);

  rectMode(CENTER);
  fill(r, g, b);
  rect(200, 200, 100, 100, 2);

  if (mouseX > 200 && mouseX < 400);
  fill(255);
  rect(0, 80, 0, 80);

  b = b + 2 * speed;

  
    if (mouseX > 150 && mouseX < 250 && mouseY > 150 && mouseY < 250) {
      line(b, 200, r, mouseY);
    }
    else if (mouseY > 0) {
      rect(r, mouseY, b, 55);
    }
    
    if (b > 400) {
     b = 0;
    }
}

function mousePressed() { //I want it to stop growing
   if (mouseX < 150 ||  mouseX > 250 || mouseY < 150 || mouseY > 250) {
      speed = (speed+1)%2 ; //toggling the value
    }

  }let nyuszika = false;
var x = 0;
var speed = 3;

function setup() { 
  createCanvas(400, 400);
} 





function draw() { 
  background(0);
  
  stroke(255);
  strokeWeight(4);
  noFill();


  if (mouseX > 200) { 
  fill(255,2,133);
  
  }
  
  if (x >= width) {
    speed = 1 * -speed;
  } else if (x < 0) {
    
   speed = 1 * -speed;
  
  }
  
 x = x + speed; 
 ellipse( x, 200, 40, 40);
  

}  let r;
  let g;
  let b;

function setup() { 
  createCanvas(400, 400);
  
} 

function draw() { 

  
if (mouseX > 100) { 
  r = random(255);
  g = random(255);
  b = random(255);
    let x = random(width);
    let y = random(height);
    fill (r,g,b);
    ellipse(x,y,16,16);
 
}  
}

function mousePressed() {
  
  background(122,45,44);
  
 
  
}

  var baromira = 0;

var nyuszi = {
    x:120,
	  y:120
}

var col= {
  
  	r: 0,
  	g: 255,
  	b: 22
  
}

function setup() { 
  createCanvas(600, 400);
  //background(222, 22, 33);
  
 
  angleMode (DEGREES);
  
  
}



function draw() { 
  
  baromira = baromira + 0.2
 
  mak = random(1, baromira)

  
  
  
  
 
           
  noStroke()
  fill(11,baromira,4,66);
  rect(mouseX, mak , 22, 120);
  
  col.g = random(3,121);
  nyuszi.x = random(0, 20);
  nyuszi.y = random(0 ,40);
  
   
  fill(col.r,col.g,col.b);
  ellipse(300, 200, 166, 166);
  
  
  
col = map ( mouseX,0,600,0,255);

  fill(col);
  rect (50,50,20,20);
  
}


  
function mousePressed() {
  background(baromira , 11, 33);
  baromira = 0;
  
   
} var baromira = 0;
var nyuszi = {
    x:120,
	  y:120
}

var col= {
  
  	r: 0,
  	g: 255,
  	b: 22
  
}

function setup() { 
  createCanvas(600, 400);
  background(222, 22, 33);
  
 
  angleMode (DEGREES);
  
  
}



function draw() { 
  
  baromira = baromira + 0.2;
  let mn = minute();
  
  
  strokeWeight(8);
  stroke (255);
  noFill();
  ellipse (300,200,186,186);
  
strokeWeight (4);
  stroke (255, 111, 133);
  let end = map (mouseX, 0, width, 0, 360);
  arc (300,200,186,186, 0, end);
  
  
 
           
  noStroke()
  fill(11,baromira,4,66);
  rect(mouseX, mouseY, baromira, 26);
  
  //col.g = random(3,121);
  nyuszi.x = random(0, 20);
  nyuszi.y = random(0 ,40);
  
   
  fill(col.r,col.g,col.b);
  ellipse(300, 200, 166, 166);
  
  
  
//col = map ( mouseX,0,600,0,255);

  fill(col);
  rect (50,50,20,20);
  
}


  
function mousePressed() {
  background(222, 22, 33);
  baromira = 0;
  
   
} var nyusziX = 0;


frameRate(fps)

function setup() { 
  createCanvas(640, 360);
  background(255, 153, 0);
  
  
} 

function draw() { 
  
  nyusziX = nyusziX + 1;
  
 // stroke ( 255 )
  //fill (222,55,26);
  //ellipse (mouseX, mouseY, 50);
  
  noStroke()
  fill (0,63,0);
 arc(292, 182, 300, 89, 0, HALF_PI);

  

  noStroke()
  fill (80,33,93);
  quad( 450 ,20, 510, 20, 410, 320, 480, 200);
  
  noStroke()
  fill (100,77,26);
  triangle( 540, 111, 580, 115, 540, 90 );
  
  
  fill (0,63,0);
  stroke (6122);
  line ( mouseX, 19 ,mouseX , mouseY);
  

  noStroke()
  fill (222,77,26, 85, 66);
  rect (420, 90, 120, 120, 52, 5, 52, 5);
  
   noStroke()
  fill (0,133,26);
  ellipse ( 505 , 120, 44);
  
 
  
}

function mousePressed() { 
  background(23);
}var nyusziX = 0;


function setup() { 
  createCanvas(640, 360);
  background(23);
  
  
} 

function draw() { 
  
  nyusziX = nyusziX + 1;
  
  stroke ( 255 )
  fill (222,55,26);
  ellipse (mouseX, mouseY, 50);
  
  noStroke()
  fill (0,133,26);
  ellipse ( 23 , 200, nyusziX);
  

 noStroke()
  fill (0,63,0);
 arc(122, 300, 300, 89, 0, HALF_PI);

  fill (0,122,0);
line(70, 20, 620, 20);

  fill (0,122,0);
line(70, 20, 610, 75);

  noStroke()
  fill (80,33,93);
  quad(580 ,20, 610, 20, 610, 320, 580, 200);
  
  noStroke()
  fill (222,77,26);
  rect(420, 210, 120, 120, 52, 5, 52, 5);
  
  noStroke()
  fill (100,77,26);
  triangle ( 11, 45, 570, 50, 90, 160 );
 
  
}

function mousePressed() { 
  background(23);
}function setup() { 
  createCanvas(640, 360);
} 

function draw() { 
  background(23);
  
  
  noStroke()
  fill (222,55,26);
  ellipse (100, 200, 50);
  
  noStroke()
  fill (0,133,26);
  ellipse (160, 200, 50);
  

 noStroke()
  fill (0,63,0);
 arc(122, 300, 300, 89, 0, HALF_PI);

  fill (0,122,0);
line(70, 20, 620, 20);

  fill (0,122,0);
line(70, 20, 610, 75);

  noStroke()
  fill (80,33,93);
  quad(580 ,20, 610, 20, 610, 320, 580, 200);
  
  noStroke()
  fill (222,77,26);
  rect(420, 210, 120, 120, 52, 5, 52, 5);
  
  noStroke()
  fill (100,77,26);
  triangle ( 70, 45, 570, 50, 90, 160 );
 
  
  
     
  
}