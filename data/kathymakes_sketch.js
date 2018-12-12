
	let myRec = new p5.SpeechRec('en-US', showResult); // new P5.SpeechRec object
	let bg;

let lastSpeechTime = 0;
let silenceAllowed = 6000;


	function setup()
	{
		// graphics stuff:
		createCanvas(windowWidth, windowHeight);
    bg = color(0,0,0);
		background(bg);    
		// instructions:
		textSize(32);
		textAlign(CENTER);
    fill(255);
    text("computer writing poems to break human",width/2,height/2);    
		myRec.onResult = showResult;
    myRec.continuous = true; // do continuous recognition
		myRec.interimResults = true;
    
		myRec.start();


	}
	function draw()
	{
   let now = millis();
    if (lastSpeechTime+silenceAllowed<now){
      lastSpeechTime=millis();
      console.log("reseting");
      reset();
    }
    else {
			showResult();

    }
    console.log(myRec);
		// why draw when you can talk?
	}

	function keyPressed(){
    
    bg = randomColor();
    background(bg);

    reset();
  }

	function showResult()
	{
		if(myRec.resultValue==true) {
			background(bg);
			text(myRec.resultString, width/2, height/2);
			console.log(myRec.resultString);
		}
	}

	function reset(){
    myRec = new p5.SpeechRec('en-US', showResult);
    myRec.continuous = true;
    myRec.interimResults = true;
    myRec.start();
    
  }

	function randomColor(){
	 		let c = color(float(random(0,150)),float(random(0,150)),float(random(0,150)));
  		return c;
	}//arrays, grids, analysis
let brickSize = 40;
let rows = 12;
let cols = 12;
let vidH = brickSize * rows;
let vidW = brickSize * cols;

//music + stepping
let playCount;
let leftright = 1;
let intervalSound = 60;
let intervalGrid = intervalSound * cols;

//recording
let recordCount;
let mic, recorder, soundFile;
let state = 0;

let colorInput = 0;

let brickW = brickSize;
let brickH = brickSize;
let bricks;


//tracker
let updateCount;
let trackerBG;
let trackerText = "♫";
let buttonInput = 0;

//pitch control
let fast = 1.25;
let slow = 0.75;

//visuals + brick rendering
let brickBlue;
let brickGreen;
let brickYellow;
let brickRed;
let grid;


function preload() {
  grid = loadImage('grid.png');
  brickBlue = loadImage("brick_blue.png");
  brickGreen = loadImage("brick_green.png");
  brickYellow = loadImage("brick_yellow.png");
  brickRed = loadImage("brick_red.png");



}

function setup() {
  frameRate(30);
  createCanvas(vidW + 400, vidH);
  background(220);
  
    trackerBG = color(0, 0, 0);


  loadSounds();
  setupRecord();
  createButtons();
  createVisuals();

  bricks = make2DArray(rows, cols);
  song = make2DArray(rows, cols);

  image(grid, 0, 0, vidW, vidH);


}

//*=============*//
function draw() {
  background(220);
  image(grid, 0, 0, vidW, vidH);
  updateCount = (frameCount - playCount) % intervalGrid;

  if (frameCount < 4 || updateCount == intervalGrid - 1) {
    updateAll();
  }

  playSound();
  drawTracker();
  drawBricks();
  trackerCountDown();



}

function keyPressed() {
  hackyRecord();
}

function trackerCountDown() {
  if (recordCount != null) {
    
    //tell me the time elapsed
    trackerText = frameCount - recordCount;
    print(frameCount - recordCount);
    if (frameCount >= recordCount + intervalSound - 8) {
      trackerText = "X";
    }
  }
  
    if (state == 1) {
    if (frameCount >= recordCount + intervalSound + 30) {
      print("Now it's been more than 120 framecounts");
      resetRecorder();
      trackerText = "♫";

    }
  }

}


function hackyRecord() {
  
  if (state == 0) {
    playCount = null;
    recordCount = frameCount;

    if (keyCode == 49) {
      recorder.record(redSound);
      R = redSound;
      
      trackerBG = color(255, 0, 0);
      print('Recording RED');
      state++;
    }
    
    if (keyCode == 50) {
      recorder.record(greenSound);
      G = greenSound;

      trackerBG = color(0, 255, 100);
      print('Recording GREEN');
      state++;
    }
    if (keyCode == 51) {
      recorder.record(blueSound);
      B = blueSound;
      
      trackerBG = color(50, 0, 200);
      print('Recording BLUE');
      state++;
    }

  }



}

function resetRecorder() {
  recorder.stop();
  state = 0;
  recordCount = null;
  playCount = frameCount;
  trackerBG = color(0, 0, 0);
  trackerText = "♫";
}


//*=============*//
//this function asks if something should be a brick. If it is, it draws a brick object.
function drawSwatch(c, x, y) {
  push();
  fill(c);
  rect(x, y, brickSize, brickSize);
  pop();
  print("drawSwatch is being called");
}


function drawTracker() {
  push();
  fill(trackerBG);
  rect(leftright * brickSize - brickSize, 0, brickSize, brickSize);
  fill(255);
  textSize(20);
  text(trackerText, leftright * brickSize - brickSize + 10, 30);
  pop();
}



//*=============*//
//these functions determine colors based on ratios
function isColored(c) {
  if (isRed(c) == true || isYellow(c) == true || isGreen(c) == true || isBlue(c) == true) {
    return true;
  }
}

function isRed(c) {
  if (c[0] != null && c[0] > c[2] + 50 && c[0] > c[1] + 50) {
    return (true);
  }
}

function isBlue(c) {
  if (c[2] != null && c[2] > c[0] + 20 && c[2] > c[1] + 50) {
    return (true);
  }
}

function isYellow(c) {
  if (c[0] > 200 && c[1] < 200 && c[2] < 50) {
    // return (true);
    return (false);

  }
}

function isGreen(c) {
  if (c[1] != null && c[1] > c[2] && c[1] > c[0] + 20) {
    return (true);
  }

}

//*=============*//
//this stores color values as strings into Song Array.
function updateAll() {
  loadPixels();
  print("It updated everything.");
  for (let pitch = 0; pitch < rows; pitch++) {
    for (let time = 0; time < cols; time++) {
      let x = time * brickSize;
      let y = pitch * brickSize;
      let c = get(x + 0.5 * brickSize, y + 0.5 * brickSize);

      if (isColored(c)) {
        bricks[pitch][time] = drawSwatch(c, x, y);

        if (isYellow(c) == true) {
          song[pitch][time] = "Y";


        } else if (isBlue(c) == true) {
          song[pitch][time] = "B";


        } else if (isGreen(c) == true) {
          song[pitch][time] = "G";


        } else if (isRed(c) == true) {
          song[pitch][time] = "R";

        }

      } else {
        song[pitch][time] = "_";
      }

    }
  }


}

//*=============*//
//this reads the string value and plays corresponding sound
function playSongArray(pitch, time) {
  if (song[pitch][time] == "Y") {
    // print("YELLOW chkka ch" + " " + pitch + ", " + time);
    let Yspeed = map(pitch, 0, rows, fast, slow);
    Y.rate(Yspeed);
    Y.play();
  }
  if (song[pitch][time] == "R") {
    // print("RED knock knock" + " " + pitch + ", " + time);
    let Rspeed = map(pitch, 0, rows, fast, slow);
    R.rate(Rspeed);
    R.play();
  }
  if (song[pitch][time] == "B") {
    let Bspeed = map(pitch, 0, rows, fast, slow);
    B.rate(Bspeed);
    B.play();
  }
  if (song[pitch][time] == "G") {

    let Gspeed = map(pitch, 0, rows, fast, slow);
    G.rate(Gspeed);
    G.play();
  }
  if (song[pitch][time] == "_") {

    // print("rest" + " " + pitch + ", " + time);
  }



}



//*=============*//
//this iterates from left to right
function playColumn(leftright) {
  for (let pitch = 0; pitch < rows; pitch++) {
    playSongArray(pitch, leftright);
  }

}

//this function starts the initial played sound, and saves the framecount it was played at.
function startSound() {
  print(song);
  updateAll();
  playColumn(leftright);
  leftright++;

  playCount = frameCount;

}

//this function plays all sounds which are saved.
function playSound() {
  if (playCount != null) {
    // serial.write(leftright);

    if (frameCount % intervalSound == intervalSound - 1) {

      playColumn(leftright);
      leftright++;


    }

    if (leftright > cols - 1) {
      leftright = 0;

    }
  }
}



function setupRecord() {
  mic = new p5.AudioIn();
  mic.start();

  // create a sound recorder
  recorder = new p5.SoundRecorder();

  // connect the mic to the recorder
  recorder.setInput(mic);

  // this sound file will be used to
  // playback & save the recording
  redSound = new p5.SoundFile();
  yellowSound = new p5.SoundFile();
  greenSound = new p5.SoundFile();
  blueSound = new p5.SoundFile();

}



//*=============*//
//these are functions that are called once during setup.

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}



function loadSounds() {
  soundFormats('mp3', 'ogg');

  R = loadSound('blue_2.mp3');
  R.setVolume(1);

  Y = loadSound('yellow.mp3');
  Y.setVolume(1);

  B = loadSound('red.mp3');
  B.setVolume(1);

  G = loadSound('green.mp3');
  G.setVolume(1);

}

function createButtons() {
  play = createButton("sequence it!!");
  play.position(20, 40);
  play.mousePressed(startSound);

}

function createVisuals() {

  brickArray = [];
  for (let i = 0; i < 6; i++) {
    let brickX = 20 + vidW + i * 50;
    blue1 = new Brick(brickX, 320, brickBlue);
    red1 = new Brick(brickX, 240, brickRed);
    green1 = new Brick(brickX, 160, brickGreen);
    // yellow1 = new Brick(brickX, 80, brickYellow);

    print("All bricks are made");
    blue1.render();
    red1.render();
    green1.render();
    // yellow1.render();

    brickArray.push(blue1);
    brickArray.push(red1);
    brickArray.push(green1);
    // brickArray.push(yellow1);
  }
}

//*=============*//
function drawBricks() {

  for (let i = 0; i < brickArray.length; i++) {
    if (i != null) {
      brickArray[i].render();
      brickArray[i].move();

      for (let j = 0; j < brickArray.length; j++) {
        if (i != j && brickArray[i].intersects(brickArray[j])) {
          brickArray[i].stop();
          brickArray[j].stop();
        }
      }
    }
  }
}let input = 0;
let pInput = 0;

// let colorTracker = [];

//serial
let serial; // variable to hold an instance of the serialport library
let portName = '/dev/cu.usbmodem32'; // fill in your serial port name here
let fromSerial = 0;


function setup() { 
  createCanvas(400, 400);
  setupSerial();
} 

function draw() { 
  background(220);
    

  
}

//*-------this is the part that reads the event ----*//
function serialEvent() {
//   input = serial.readLine();  
//   colorTracker[0] = input;
  
//   if (colorTracker.length > 2){
//     colorTracker.shift();
//   }
  
//   print("pInput is "+ colorTracker[0]);
//   print("input is "+ colorTracker[1]);
 
  
  if (serial.readLine() == 1 || serial.readLine() == 2 || serial.readLine() == 3 || serial.readLine() == 4 || serial.readLine() == 5 || serial.readLine() !=null){
    input = serial.readLine();
    print("it's inputing");
    
    if (pInput == input){
    print(pInput + " is the same as " + input);
  }
  
  if (pInput != input){
    print(pInput + " is different from " + input);
  }
  
  pInput = input;
    
  }
  else {
  
  
}


} 


//*----------------------------------------------*//

// function prayThisWorks(){
  
//   if (colorTracker[0] != colorTracker[1] && colorTracker[0]!=null & colorTracker[1] !=null){
//     print("they're different and they're not null");
//       print(colorTracker);

//   }
  
// }

function setupSerial() {
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event

  serial.list(); // list the serial ports
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing

  serial.list(); // list the serial ports
  serial.open(portName); // open a serial port
}
// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    print(i + " " + portList[i]);
  }
}

function serverConnected() {
  print('connected to server.');
}

function portOpen() {
  print('the serial port opened.')
}

/*========================================
Write here!
This code will be executed when
something is received.
========================================*/



function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}let video;
function setup() { 
  createCanvas(400, 400);
  video = createCapture(VIDEO);
  video.hide();
} 

function draw() { 
  background(220);
  image(video,0,0,width,height);
}//serial
let serial; // variable to hold an instance of the serialport library
let portName = '/dev/cu.usbmodem1411'; // fill in your serial port name here
let fromSerial = 0;

//arrays, grids, analysis
let brickSize = 40;
let rows = 12;
let cols = 16;
let vidH = brickSize * rows;
let vidW = brickSize * cols;

//music + stepping
let playCount;
let leftright = 1;
let intervalSound = 15;
let intervalGrid = intervalSound * cols;

//recording
let recordCount;
let mic, recorder, soundFile;
let state = 0;

let colorInput = 0;

//visuals + brick rendering
let video;
let grid;

let brickW = 80;
let brickH = 40;
let bricks;


//tracker
let updateCount;
let trackerBG;
let trackerText = "♫";
let buttonInput = 0;

//pitch control
let fast = 1.25;
let slow = 0.75;


function preload() {
  grid = loadImage('sample_2.png');

}

function setup() {
  createCanvas(vidW, vidH);
  frameRate(30);
  noStroke();
  // rectMode(CENTER);

  setupSerial();

  loadSounds();
  setupRecord();
  createButtons();

  bricks = make2DArray(rows, cols);
  song = make2DArray(rows, cols);

  video = createCapture(VIDEO);
  video.hide();
  image(video, 0, 0, vidW, vidH);

  trackerBG = color(0, 0, 0);

}

//*=============*//
function draw() {
  image(video, 0, 0, vidW, vidH);
  updateCount = (frameCount-playCount) % intervalGrid;
  
  if (frameCount < 4 || updateCount == intervalGrid - 1) {
    updateAll();
    // print(song);
  }
  
  playSound();
  drawTracker();
  
  if (mic.enabled) {
    recordSound();
  }



}

function keyPressed() {
  hackyRecord();
}

function trackerCountDown() {
  if (recordCount != null) {
    //tell me the time elapsed
    trackerText = frameCount - recordCount;
    if (frameCount >= recordCount + intervalSound - 8) {
      trackerText = "X";
    }
  }

}


function recordSound() {
  trackerCountDown();

  if (state == 0 && colorInput != 0) {

    playCount = null;
    recordCount = frameCount;

    print("record Start registered");
    
    if (colorInput == 1) {
      recorder.record(redSound);
      R = redSound;
      trackerBG = color(255, 0, 0);
      print('Recording RED');
      state++;
    }

    if (colorInput == 2) {
      recorder.record(yellowSound);
      Y = yellowSound;
      trackerBG = color(255, 255, 0);

      print('Recording YELLOW');
      state++;
    }
    if (colorInput == 3) {
      recorder.record(greenSound);
      G = greenSound;

      trackerBG = color(0, 255, 100);

      print('Recording GREEN');
      state++;
    }
    if (colorInput == 4) {
      recorder.record(blueSound);
      B = blueSound;
      print('Recording BLUE');

      trackerBG = color(50, 0, 200);

      state++;
    }

  }


  if (state == 1) {
    if (frameCount >= recordCount + intervalSound + 30) {
      print("Now it's been more than 120 framecounts");
      resetRecorder();
      trackerText = "♫";

    }
  }

}

function hackyRecord() {
  trackerCountDown();
  if (state == 0) {
    playCount = null;
    recordCount = frameCount;

    if (keyCode == 49) {
      recorder.record(redSound);
      R = redSound;
      trackerBG = color(255, 0, 0);
      print('Recording RED');
      state++;
    }

    if (keyCode == 50) {
      recorder.record(yellowSound);
      Y = yellowSound;
      trackerBG = color(255, 255, 0);

      print('Recording YELLOW');
      state++;
    }
    if (keyCode == 51) {
      recorder.record(greenSound);
      G = greenSound;

      trackerBG = color(0, 255, 100);

      print('Recording GREEN');
      state++;
    }
    if (keyCode == 52) {
      recorder.record(blueSound);
      B = blueSound;
      print('Recording BLUE');

      trackerBG = color(50, 0, 200);

      state++;
    }

  }


  if (state == 1) {
    if (frameCount >= recordCount + intervalSound + 60) {
      print("Now it's been more than 120 framecounts");
      resetRecorder();
      trackerText = "♫";

    }
  }
}

function resetRecorder() {
  recorder.stop();
  state = 0;
  recordCount = null;
  playCount = frameCount;
  trackerBG = color(0, 0, 0);
  trackerText = "♫";
}

function serialEvent() {
  colorInput = serial.readLine();
}

//*=============*//
//*=============*//
//*=============*//
//*=============*//
//*=============*//



//*=============*//
//this function asks if something should be a brick. If it is, it draws a brick object.
function drawSwatch(c, x, y) {
  push();
  fill(c);
  rect(x, y, brickSize, brickSize);
  pop();
}


function drawTracker() {
  push();
  fill(trackerBG);
  rect(leftright * brickSize - brickSize, 0, brickSize, brickSize);
  fill(255);
  textSize(20);
  text(trackerText, leftright * brickSize - brickSize + 10, 30);
  pop();
}



//*=============*//
//these functions determine colors based on ratios
function isColored(c) {
  if (isRed(c) == true || isYellow(c) == true || isGreen(c) == true || isBlue(c) == true) {
    return true;
  }
}

function isRed(c) {
  if (c[0] != null && c[0] > c[2] + 50 && c[0] > c[1] + 50) {
    return (true);
  }
}

function isBlue(c) {
  if (c[2] != null && c[2] > c[0] + 20 && c[2] > c[1] + 50) {
    return (true);
  }
}

function isYellow(c) {
  if (c[0] > 200 && c[1] < 200 && c[2] < 50) {
    // return (true);
    return (false);

  }
}

function isGreen(c) {
  if (c[1] != null && c[1] > c[2] && c[1] > c[0] + 20) {
    return (true);
  }

}

//*=============*//
//this stores color values as strings into Song Array.
function updateAll() {
  loadPixels();
  print("It updated everything.");
  for (let pitch = 0; pitch < rows; pitch++) {
    for (let time = 0; time < cols; time++) {
      let x = time * brickSize;
      let y = pitch * brickSize;
      let c = get(x + 0.5 * brickSize, y + 0.5 * brickSize);

      if (isColored(c)) {
        bricks[pitch][time] = drawSwatch(c, x, y);

        if (isYellow(c) == true) {
          song[pitch][time] = "Y";


        } else if (isBlue(c) == true) {
          song[pitch][time] = "B";


        } else if (isGreen(c) == true) {
          song[pitch][time] = "G";


        } else if (isRed(c) == true) {
          song[pitch][time] = "R";

        }

      } else {
        song[pitch][time] = "_";
      }

    }
  }


}

//*=============*//
//this reads the string value and plays corresponding sound
function playSongArray(pitch, time) {
  if (song[pitch][time] == "Y") {
    // print("YELLOW chkka ch" + " " + pitch + ", " + time);
    let Yspeed = map(pitch, 0, rows, fast, slow);
    Y.rate(Yspeed);
    Y.play();
  }
  if (song[pitch][time] == "R") {
    // print("RED knock knock" + " " + pitch + ", " + time);
    let Rspeed = map(pitch, 0, rows, fast, slow);
    R.rate(Rspeed);
    R.play();
  }
  if (song[pitch][time] == "B") {
    let Bspeed = map(pitch, 0, rows, fast, slow);
    B.rate(Bspeed);
    B.play();
  }
  if (song[pitch][time] == "G") {

    let Gspeed = map(pitch, 0, rows, fast, slow);
    G.rate(Gspeed);
    G.play();
  }
  if (song[pitch][time] == "_") {

    // print("rest" + " " + pitch + ", " + time);
  }



}



//*=============*//
//this iterates from left to right
function playColumn(leftright) {
  for (let pitch = 0; pitch < rows; pitch++) {
    playSongArray(pitch, leftright);
  }

}

//this function starts the initial played sound, and saves the framecount it was played at.
function startSound() {
  print(song);
  updateAll();
  playColumn(leftright);
  leftright++;

  playCount = frameCount;

}

//this function plays all sounds which are saved.
function playSound() {
  if (playCount != null) {
  serial.write(leftright);

    if (frameCount % intervalSound == intervalSound - 1) {

      playColumn(leftright);
      leftright++;
      

    }

    if (leftright > cols - 1) {
      leftright = 0;

    }
  }
}



function setupRecord() {
  mic = new p5.AudioIn();
  mic.start();

  // create a sound recorder
  recorder = new p5.SoundRecorder();

  // connect the mic to the recorder
  recorder.setInput(mic);

  // this sound file will be used to
  // playback & save the recording
  redSound = new p5.SoundFile();
  yellowSound = new p5.SoundFile();
  greenSound = new p5.SoundFile();
  blueSound = new p5.SoundFile();

}



//*=============*//
//these are functions that are called once during setup.

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}


function loadSounds() {
  soundFormats('mp3', 'ogg');

  R = loadSound('blue_2.mp3');
  R.setVolume(1);

  Y = loadSound('yellow.mp3');                                                                                                                                                                                                                                                     
  Y.setVolume(1);

  B = loadSound('red.mp3');
  B.setVolume(1);

  G = loadSound('green.mp3');
  G.setVolume(1);

}

function createButtons() {
  play = createButton("play sound");
  play.position(20, 80);
  play.mousePressed(startSound);
}


function setupSerial() {
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event

  serial.list(); // list the serial ports
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing

  serial.list(); // list the serial ports
  serial.open(portName); // open a serial port
}
// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    print(i + " " + portList[i]);
  }
}

function serverConnected() {
  print('connected to server.');
}

function portOpen() {
  print('the serial port opened.')
}

/*========================================
Write here!
This code will be executed when
something is received.
========================================*/
function serialEvent() {
  colorInput = serial.readLine();
}


function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}let video;
let lego;
let grid;

//arrays, grids, analysis
let brickSize = 40;
let rows = 12;
let cols = rows;
let vidH = brickSize * cols;
let vidW = brickSize * rows;

//music + stepping
let leftright = 1;
let startCount;

//brick image rendering
let brickW = 80;
let brickH = 40;
let blue1;
let brickArray = [];

function preload(){
  brickBlue = loadImage("brick_blue.png");
  brickGreen = loadImage("brick_green.png");
  brickYellow = loadImage("brick_yellow.png");
  brickRed = loadImage("brick_red.png");
  helpText= loadImage("helptext.png");
  
  // grid = loadImage('sample_2.png');

}

function setup() {

  ellipseMode(CENTER);
  createCanvas(vidW, vidH);
  background(220);

  noStroke();
  frameRate(60);

  video = createCapture(VIDEO);
	video.hide();
  
  image(video, 0, 0, vidW, vidH);

  song = make2DArray(cols, rows);
  bricks = make2DArray(cols, rows);

  loadSounds();
  createButtons();

}



//*=============*//
function draw() {

  background(220);
  image(video, 0, 0, vidW, vidH);

//   playSound();
//   drawTracker();


}

function refresh() {
  background(220);
  // image(grid, 0, 0, vidW, vidH);
  brickArray = [];
  createVisuals();

}
//*=============*//
//this is called everytime that you click "refresh cam"
function analyzeColors() {
  background(220);
  image(grid, 0, 0, vidW, vidH);
  drawBricks();
  swatchGrid();
  startSound();
}


//*=============*//
//this function renders the brick images
function swatchGrid() {
  loadPixels();
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = i * brickSize;
      let y = j * brickSize;
      let c = get(x+20, y+20);
      print(c);
      if (isColored(c) == true) {
        bricks[i][j] = drawSwatch(c, x, y);
      }
    }
  }
  // updatePixels();
}


//*=============*//
//this function asks if something should be a brick. If it is, it draws a brick object.
function drawSwatch(c, x, y) {
  push();
  fill(c);
  rect(x, y, 0.5*brickSize, 0.5*brickSize);
  pop();
}

//*=============*//
//this stores color values as strings into Song Array.
function createSongArray() {

  for (let pitch = 0; pitch < rows; pitch++) {
    for (let time = 0; time < cols; time++) {
      let x = pitch * brickSize;
      let y = time * brickSize;
      let c = get(x, y);

      if (isYellow(c) == true) {
        song[time][pitch] = "Y";

      } else if (isBlue(c) == true) {
        song[time][pitch] = "B";

      } else if (isGreen(c) == true) {
        song[time][pitch] = "G";

      } else if (isRed(c) == true) {
        song[time][pitch] = "R";

      } else {
        song[time][pitch] = "_";
      }

    }
  }


}

//*=============*//
//this reads the string value and plays corresponding sound
function playSongArray(time, pitch) {
  if (song[time][pitch] == "Y") {
    print("YELLOW chkka ch" + " " + pitch + ", " + time);
    Y.play();
  }
  if (song[time][pitch] == "R") {
    print("RED knock knock" + " " + pitch + ", " + time);
    R.play();
  }
  if (song[time][pitch] == "B") {
    print("BLUE beatbox" + " " + pitch + ", " + time);
    B.play();
  }
  if (song[time][pitch] == "G") {
    print("GREEN chkka ch" + " " + pitch + ", " + time);
    G.play();
  }
  if (song[time][pitch] == "_") {
    print("rest" + " " + pitch + ", " + time);
  }
}


//*=============*//
//this iterates from left to right
function playColumn(leftright) {
  for (let time = 0; time < cols; time++) {
    playSongArray(time, leftright);
  }
  
}

//this function starts the initial played sound, and saves the framecount it was played at.
function startSound() {
  createSongArray();
  print(song);

  playColumn(leftright);
  startCount = frameCount;
  print("audio started at " + startCount);

}

function drawTracker(){
  if (startCount != null) {
  push();
    fill(255,0,255);
    rect(leftright*40 - brickSize,0,brickSize,brickSize);
    fill(255);
    textSize(20);
    text("♫",leftright*40 - brickSize+10, 30);         
  pop();
  }
}
//this function plays all sounds which are saved.
function playSound() {
  if (startCount != null) {
    print(frameCount);

    if (frameCount % 120 == 119) {
      playColumn(leftright);
      leftright++;
      
      print(leftright);
      print("It registered! BOOP!");
      print("It should progress " + leftright);

    }

    if (leftright>12) {
      leftright = 1;
    }
  }
}




//*=============*//
//these functions determine colors based on ratios
function isColored(c) {
  if (isRed(c) == true || isYellow(c) == true || isGreen(c) == true || isBlue(c) == true) {
    return true;
  }
}

function isRed(c) {
  if (c[0] != null && c[0] > c[2] + 50 && c[0] > c[1] + 50) {
    return (true);
  }
}

function isBlue(c) {
  if (c[2] != null && c[2] > c[0] + 20 && c[2] > c[1] + 50) {
    return (true);
  }
}

function isYellow(c) {
  if (c[1] != null && c[1] > 200 && c[0] > 200 && c[2] < 50) {
        print("It's Yellow");

    return (true);
  }
}

function isGreen(c) {
  if (c[1] != null && c[1] > c[2] && c[1] > c[0] + 20) {
    return (true);
  }

}

//*=============*//
//these are functions that are called once during setup.

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}


function loadSounds() {
  soundFormats('mp3', 'ogg');

  R = loadSound('blue_2.mp3');
  R.setVolume(1);

  Y = loadSound('yellow.mp3');
  Y.setVolume(1);

  B = loadSound('red.mp3');
  B.setVolume(1);

  G = loadSound('green.mp3');
  G.setVolume(1);

}

function createButtons() {
  play = createButton("sequence it!!");
  play.position(20, 80);
  play.mousePressed(analyzeColors);

  // play = createButton("play sound");
  // play.position(120, 10);
  // play.mousePressed(startSound);

  // play = createButton("get more bricks");
  // play.position(vidW+20, 80);
  // play.mousePressed(refresh);
  //need to write a function to clear it.
}
//serial
let serial; // variable to hold an instance of the serialport library
let portName = '/dev/cu.usbmodem1411'; // fill in your serial port name here
let fromSerial = 0;

//arrays, grids, analysis
let brickSize = 40;
let rows = 12;
let cols = 12;
let vidH = brickSize * rows;
let vidW = brickSize * cols;

//music + stepping
let startCount;
let leftright = 1;
let intervalSound = 30;
let intervalGrid = intervalSound * cols;

//recording
let recordCount;
let mic, recorder, soundFile;
let state = 0;


//visuals + brick rendering
let video;
let grid;

let brickW = 80;
let brickH = 40;
let bricks;


//tracker
let trackerBG;
let trackerText = "♫";

function preload() {
  grid = loadImage('sample_2.png');

}

function setup() {
  createCanvas(vidW, vidH);
  frameRate(30);
  noStroke();
  // rectMode(CENTER);

  setupSerial();

  loadSounds();
  setupRecord();
  createButtons();

  bricks = make2DArray(cols, rows);
  song = make2DArray(cols, rows);

  // video = createCapture(VIDEO);
  // video.hide();
  image(grid, 0, 0, vidW, vidH);


  trackerBG = color(0, 0, 0);

}






//*=============*//
function draw() {


  image(grid, 0, 0, vidW, vidH);
  updateAll();
  playSound();
  drawTracker();
  recordSound();

}


//*=============*//
//this is called everytime that you click "refresh cam"
// function analyzeColors() {
//   image(grid, 0, 0, vidW, vidH);
//   swatchGrid();
// }


//*=============*//
//this function renders the brick images
// function swatchGrid() {
//   if (frameCount < 10 || frameCount % intervalGrid == intervalGrid - 1) {
//     loadPixels();

//     for (let i = 0; i < rows; i++) {
//       for (let j = 0; j < cols; j++) {
//         let x = i * brickSize;
//         let y = j * brickSize;
//         let c = get(x + 0.5 * brickSize, y + 0.5 * brickSize);
//         // print(c);
//         if (isColored(c) == true) {
//           bricks[i][j] = drawSwatch(c, x, y);
//         }
//       }
//     }
//   }
//   // updatePixels();
// }


//*=============*//
//this function asks if something should be a brick. If it is, it draws a brick object.
function drawSwatch(c, x, y) {
  push();
  fill(c);
  rect(x, y, brickSize, brickSize);
  pop();
}


function drawTracker() {
  push();
  fill(trackerBG);
  rect(leftright * brickSize - brickSize, 0, brickSize, brickSize);
  fill(255);
  textSize(20);
  text(trackerText, leftright * brickSize - brickSize + 10, 30);
  pop();
}




//*=============*//
//these functions determine colors based on ratios
function isColored(c) {
  if (isRed(c) == true || isYellow(c) == true || isGreen(c) == true || isBlue(c) == true) {
    return true;
  }
}

function isRed(c) {
  if (c[0] != null && c[0] > c[2] + 50 && c[0] > c[1] + 50) {
    return (true);
  }
}

function isBlue(c) {
  if (c[2] != null && c[2] > c[0] + 20 && c[2] > c[1] + 50) {
    return (true);
  }
}

function isYellow(c) {
  if (c[1] != null && c[1] > 200 && c[0] > 200 && c[2] < 50) {
    return (true);
  }
}

function isGreen(c) {
  if (c[1] != null && c[1] > c[2] && c[1] > c[0] + 20) {
    return (true);
  }

}

//*=============*//
//this stores color values as strings into Song Array.
function updateAll() {
  if (frameCount < 4 || frameCount % intervalGrid == intervalGrid - 1 && leftright < 12) {
    loadPixels();
    print("It updated everything.");
    for (let pitch = 0; pitch < rows; pitch++) {
      for (let time = 0; time < cols; time++) {
        let x = pitch * brickSize;
        let y = time * brickSize;
        let c = get(x + 0.5 * brickSize, y + 0.5 * brickSize);

        if (isColored(c)) {
          bricks[time][pitch] = drawSwatch(c, x, y);

          if (isYellow(c) == true) {
            song[time][pitch] = "Y";


          } else if (isBlue(c) == true) {
            song[time][pitch] = "B";


          } else if (isGreen(c) == true) {
            song[time][pitch] = "G";


          } else if (isRed(c) == true) {
            song[time][pitch] = "R";

          }

        } else {
          song[time][pitch] = "_";
        }

      }
    }
  }

}

//*=============*//
//this reads the string value and plays corresponding sound
function playSongArray(time, pitch) {
  if (song[time][pitch] == "Y") {
    // print("YELLOW chkka ch" + " " + pitch + ", " + time);
    Y.play();
  }
  if (song[time][pitch] == "R") {
    // print("RED knock knock" + " " + pitch + ", " + time);
    R.play();
  }
  if (song[time][pitch] == "B") {
    // print("BLUE beatbox" + " " + pitch + ", " + time);
    B.play();
  }
  if (song[time][pitch] == "G") {
    // print("GREEN chkka ch" + " " + pitch + ", " + time);
    G.play();
  }
  if (song[time][pitch] == "_") {
    // print("rest" + " " + pitch + ", " + time);
  }



}


//*=============*//
//this iterates from left to right
function playColumn(leftright) {
  for (let time = 0; time < cols; time++) {
    playSongArray(time, leftright);
  }
  
  serial.write(leftright);

//   if (keyIsPressed && song[time][leftright] != "_") {
//       for (let time = 0; time < cols; time++) {       
//         song[time][leftright].pause();
//         song[time][leftright - 1].pause();
//       }
// }
}

//this function starts the initial played sound, and saves the framecount it was played at.
function startSound() {
  // updateSongArray();
  // print(song);

  playColumn(leftright);
  leftright++;

  startCount = frameCount;
  // print("audio started at " + startCount);

}

//this function plays all sounds which are saved.
function playSound() {
  if (startCount != null) {

    if (frameCount % intervalSound == intervalSound - 1) {
      // print("It's playing, at " + frameCount);

      playColumn(leftright);
      leftright++;

      print(leftright);
      // print("It registered! BOOP!");
      // print("It should progress " + leftright);

    }

    if (leftright > 12) {
      leftright = 0;
    }
  }
}



function setupRecord() {
  mic = new p5.AudioIn();
  mic.start();

  // create a sound recorder
  recorder = new p5.SoundRecorder();

  // connect the mic to the recorder
  recorder.setInput(mic);

  // this sound file will be used to
  // playback & save the recording
  redSound = new p5.SoundFile();
  yellowSound = new p5.SoundFile();
  greenSound = new p5.SoundFile();
  blueSound = new p5.SoundFile();

}

// function keyPressed(){
//       startCount = null;
// }

function recordSound() {

  if (recordCount != null) {
    trackerText = frameCount - recordCount;
    if (frameCount >= recordCount + intervalSound) {
      trackerText = "X";
    }
  }


  if (state == 0 && keyIsPressed && mic.enabled) {
    // pauseEverything();

    startCount = null;
    recordCount = frameCount;

    // print("record Start registered");
    if (keyCode == UP_ARROW) {
      // record to our p5.SoundFile
      recorder.record(redSound);
      R = redSound;
      trackerBG = color(255, 0, 0);
      // print('Recording RED');
      state++;
    }

    if (keyCode == LEFT_ARROW) {
      recorder.record(yellowSound);
      Y = yellowSound;
      trackerBG = color(255, 255, 0);

      // print('Recording YELLOW');
      state++;
    }
    if (keyCode == DOWN_ARROW) {
      recorder.record(greenSound);
      G = greenSound;

      trackerBG = color(0, 255, 100);

      // print('Recording GREEN');
      state++;
    }
    if (keyCode == RIGHT_ARROW) {
      recorder.record(blueSound);
      B = blueSound;
      // print('Recording BLUE');

      trackerBG = color(50, 0, 200);

      state++;
    }

    if (keyCode == ENTER) {
      // print('Recording CUSTOM');
      trackerBG = color(255, 0, 0);

      state++;
    }
  }


  if (state == 1) {
    if (frameCount >= recordCount + intervalSound + 4) {
      // print("Now it's been more than 120 framecounts");
      resetRecorder();
      trackerText = "♫";

    }
  }
  //     if (frameCount >= recordCount + 4 && keyIsPressed) {
  //       print("You stopped it with the key");
  //       resetRecorder();

  //     }

}

function pauseEverything() {

  if (R.isPlaying) {
    R.pause();
  } else if (Y.isPlaying) {
    Y.pause();
  } else if (G.isPlaying) {
    G.pause();
  } else if (B.isPlaying) {
    B.pause();
  }

}

function pauseOne(file) {
  if (file.isPlaying) {
    file.pause();
  }
}

function resetRecorder() {
  recorder.stop();
  state = 0;
  recordCount = null;
  startCount = frameCount;
  trackerBG = color(0, 0, 0);
}

//*=============*//
//these are functions that are called once during setup.

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}


function loadSounds() {
  soundFormats('mp3', 'ogg');

  R = loadSound('blue_2.mp3');
  R.setVolume(1);

  Y = loadSound('yellow.mp3');
  Y.setVolume(1);

  B = loadSound('red.mp3');
  B.setVolume(1);

  G = loadSound('green.mp3');
  G.setVolume(1);

}

function createButtons() {
  // play = createButton("analyze color");
  // play.position(20, 80);
  // play.mousePressed(analyzeColors);

  play = createButton("play sound");
  play.position(150, 80);
  play.mousePressed(startSound);
}


function setupSerial() {
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event

  serial.list(); // list the serial ports
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing

  serial.list(); // list the serial ports
  serial.open(portName); // open a serial port
}
// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    print(i + " " + portList[i]);
  }
}

function serverConnected() {
  print('connected to server.');
}

function portOpen() {
  print('the serial port opened.')
}

/*========================================
Write here!
This code will be executed when
something is received.
========================================*/

function serialEvent() {
  let stringFromSerial = serial.readLine();
  if (stringFromSerial.length > 0) {
    var trimmedString = trim(stringFromSerial);
    fromSerial = Number(trimmedString);

  }
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}let lego;
let grid;

//arrays, grids, analysis
let brickSize = 40;
let rows = 12;
let cols = rows;
let vidH = brickSize * cols;
let vidW = brickSize * rows;
let d;
//music + stepping
let leftright = 2;
let startCount;

//brick image rendering
let brickW = 80;
let brickH = 40;
let blue1;
let brickArray = [];

function preload() {
  grid = loadImage('grid.png');
  brickBlue = loadImage("brick_blue.png");

}

function setup() {
  d = pixelDensity();
  
  createCanvas(vidW + 400, vidH);
  background(220);
  noStroke();
  frameRate(30);
  
  
  loadSounds();
  createButtons();
  createVisuals();
  
  
  song = make2DArray(cols, rows);
  bricks = make2DArray(cols, rows);


  // grid = loadImage('grid.png');
 
  
  // blue1 = new Brick(0, 0, brickBlue);
  // blue1.render();



}




//*=============*//
function draw() {
    image(grid,0,0,vidW,vidH);  
  image(brickBlue,0,0,80,40); 
  loadPixels();
  for(let i = 8;i<64;i++){
    pixels[i] = 255;
  }
  updatePixels();


}

function refresh() {
  background(220);
  image(grid, 0, 0, vidW, vidH);
  brickArray = [];
  createVisuals();



}
//*=============*//
//this is called everytime that you click "refresh cam"
function analyzeColors() {
  // image(grid, 0, 0, vidW, vidH);
  swatchGrid();
}

function drawBricks() {

  for (let i = 0; i < brickArray.length; i++) {
    if (i != null) {
      brickArray[i].render();
      brickArray[i].move();

      for (let j = 0; j < brickArray.length; j++) {
        if (i != j && brickArray[i].intersects(brickArray[j])) {
          brickArray[i].stop();
          brickArray[j].stop();
        }
      }
    }
  }
}




function swatchGrid() {
  loadPixels();
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = 20 + i * brickSize;
      let y = 20 + j * brickSize;
      let c = get(x, y);
      print(c);
      if (isColored(c) == true) {
        bricks[i][j] = drawSwatch(c, x, y);
      }
    }
  }
  updatePixels();
}

//*=============*//
//this function asks if something should be a brick. If it is, it draws a brick object.
function drawSwatch(c, x, y) {
  push();
  fill(c);
  rect(x, y, 0.5*brickSize, 0.5*brickSize);
  pop();
}

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}



function loadSounds() {
  soundFormats('mp3', 'ogg');

  R = loadSound('Knock 2.mp3');
  R.setVolume(0.1);

  Y = loadSound('Bim.mp3');
  Y.setVolume(1);

  B = loadSound('Beatbox.mp3');
  B.setVolume(0.1);

  G = loadSound('Chkka chh.mp3');
  G.setVolume(0.1);

}

function createButtons() {
  play = createButton("analyze colors");
  play.position(10, 10);
  play.mousePressed(analyzeColors);

  play = createButton("play sound");
  play.position(120, 10);
  // play.mousePressed(startSound);

  play = createButton("start over");
  play.position(200, 10);
  play.mousePressed(refresh);
  //need to write a function to clear it.
}

function createVisuals() {
  brickBlue = loadImage("brick_blue.png");
  brickGreen = loadImage("brick_green.png");
  brickYellow = loadImage("brick_yellow.png");
  brickRed = loadImage("brick_red.png");

  for (let i = 0; i<3; i++){
  blue1 = new Brick(vidW+i*100, 320, brickBlue);
  red1 = new Brick(vidW+i*100, 240, brickRed);
  green1 = new Brick(vidW+i*100, 160, brickGreen);
  yellow1 = new Brick(vidW+i*100, 80, brickYellow);

  print("All bricks are made");
  blue1.render();
  red1.render();
  green1.render();
  yellow1.render();

  brickArray.push(blue1);
  brickArray.push(red1);
  brickArray.push(green1);
  brickArray.push(yellow1);
  }
}

//*=============*//
//these functions determine colors based on ratios
function isColored(c) {
  if (isRed(c) == true || isYellow(c) == true || isGreen(c) == true || isBlue(c) == true) {
    return true;
  }
}

function isRed(c) {
  if (c[0] != null && c[0] > c[2] + 50 && c[0] > c[1] + 50) {
    return (true);
  }
}

function isBlue(c) {
  if (c[2] != null && c[2] > c[0] + 20 && c[2] > c[1] + 50) {
    return (true);
  }
}

function isYellow(c) {
  if (c[1] != null && c[1] > c[2] + 50 && c[0] > c[1]) {
    return (true);
  }
}

function isGreen(c) {
  if (c[1] != null && c[1] > c[2] && c[1] > c[0] + 20) {
    return (true);
  }

}
let lego;
let grid;

//arrays, grids, analysis
let brickSize = 40;
let rows = 12;
let cols = rows;
let vidH = brickSize * cols;
let vidW = brickSize * rows;

//music + stepping
let leftright = 1;
let startCount;

//brick image rendering
let brickW = 80;
let brickH = 40;
let blue1;
let brickArray = [];

function preload(){
  brickBlue = loadImage("brick_blue.png");
  brickGreen = loadImage("brick_green.png");
  brickYellow = loadImage("brick_yellow.png");
  brickRed = loadImage("brick_red.png");
  helpText= loadImage("helptext.png");
  
  grid = loadImage('sample_2.png');

}

function setup() {

  ellipseMode(CENTER);
  createCanvas(vidW + 400, vidH);
  background(220);

  noStroke();
  frameRate(60);

  // sample = loadImage('sample.png');
  image(grid, 0, 0, vidW, vidH);
  // image(sample,0,0,vidW,vidH);

  song = make2DArray(cols, rows);
  bricks = make2DArray(cols, rows);

  loadSounds();
  createButtons();
  createVisuals();

}



//*=============*//
function draw() {
  // playSound();

  background(220);
  image(grid, 0, 0, vidW, vidH);
  image(helpText, vidW-30, 0, 160,100);

  drawBricks();
  playSound();
  drawTracker();


}

function refresh() {
  background(220);
  // image(grid, 0, 0, vidW, vidH);
  brickArray = [];
  createVisuals();

}
//*=============*//
//this is called everytime that you click "refresh cam"
function analyzeColors() {
  background(220);
  image(grid, 0, 0, vidW, vidH);
  drawBricks();
  swatchGrid();
  startSound();
}

//*=============*//
function drawBricks() {

  for (let i = 0; i < brickArray.length; i++) {
    if (i != null) {
      brickArray[i].render();
      brickArray[i].move();

      for (let j = 0; j < brickArray.length; j++) {
        if (i != j && brickArray[i].intersects(brickArray[j])) {
          brickArray[i].stop();
          brickArray[j].stop();
        }
      }
    }
  }
}


//*=============*//
//this function renders the brick images
function swatchGrid() {
  loadPixels();
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = i * brickSize;
      let y = j * brickSize;
      let c = get(x+20, y+20);
      print(c);
      if (isColored(c) == true) {
        bricks[i][j] = drawSwatch(c, x, y);
      }
    }
  }
  // updatePixels();
}


//*=============*//
//this function asks if something should be a brick. If it is, it draws a brick object.
function drawSwatch(c, x, y) {
  push();
  fill(c);
  rect(x, y, 0.5*brickSize, 0.5*brickSize);
  pop();
}

//*=============*//
//this stores color values as strings into Song Array.
function createSongArray() {

  for (let pitch = 0; pitch < rows; pitch++) {
    for (let time = 0; time < cols; time++) {
      let x = pitch * brickSize;
      let y = time * brickSize;
      let c = get(x, y);

      if (isYellow(c) == true) {
        song[time][pitch] = "Y";

      } else if (isBlue(c) == true) {
        song[time][pitch] = "B";

      } else if (isGreen(c) == true) {
        song[time][pitch] = "G";

      } else if (isRed(c) == true) {
        song[time][pitch] = "R";

      } else {
        song[time][pitch] = "_";
      }

    }
  }


}

//*=============*//
//this reads the string value and plays corresponding sound
function playSongArray(time, pitch) {
  if (song[time][pitch] == "Y") {
    print("YELLOW chkka ch" + " " + pitch + ", " + time);
    Y.play();
  }
  if (song[time][pitch] == "R") {
    print("RED knock knock" + " " + pitch + ", " + time);
    R.play();
  }
  if (song[time][pitch] == "B") {
    print("BLUE beatbox" + " " + pitch + ", " + time);
    B.play();
  }
  if (song[time][pitch] == "G") {
    print("GREEN chkka ch" + " " + pitch + ", " + time);
    G.play();
  }
  if (song[time][pitch] == "_") {
    print("rest" + " " + pitch + ", " + time);
  }
}


//*=============*//
//this iterates from left to right
function playColumn(leftright) {
  for (let time = 0; time < cols; time++) {
    playSongArray(time, leftright);
  }
  
}

//this function starts the initial played sound, and saves the framecount it was played at.
function startSound() {
  createSongArray();
  print(song);

  playColumn(leftright);
  startCount = frameCount;
  print("audio started at " + startCount);

}

function drawTracker(){
  if (startCount != null) {
  push();
    fill(255,0,255);
    rect(leftright*40 - brickSize,0,brickSize,brickSize);
    fill(255);
    textSize(20);
    text("♫",leftright*40 - brickSize+10, 30);         
  pop();
  }
}
//this function plays all sounds which are saved.
function playSound() {
  if (startCount != null) {
    print(frameCount);

    if (frameCount % 120 == 119) {
      playColumn(leftright);
      leftright++;
      
      print(leftright);
      print("It registered! BOOP!");
      print("It should progress " + leftright);

    }

    if (leftright>12) {
      leftright = 1;
    }
  }
}




//*=============*//
//these functions determine colors based on ratios
function isColored(c) {
  if (isRed(c) == true || isYellow(c) == true || isGreen(c) == true || isBlue(c) == true) {
    return true;
  }
}

function isRed(c) {
  if (c[0] != null && c[0] > c[2] + 50 && c[0] > c[1] + 50) {
    return (true);
  }
}

function isBlue(c) {
  if (c[2] != null && c[2] > c[0] + 20 && c[2] > c[1] + 50) {
    return (true);
  }
}

function isYellow(c) {
  if (c[1] != null && c[1] > 200 && c[0] > 200 && c[2] < 50) {
        print("It's Yellow");

    return (true);
  }
}

function isGreen(c) {
  if (c[1] != null && c[1] > c[2] && c[1] > c[0] + 20) {
    return (true);
  }

}

//*=============*//
//these are functions that are called once during setup.

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}


function loadSounds() {
  soundFormats('mp3', 'ogg');

  R = loadSound('blue_2.mp3');
  R.setVolume(1);

  Y = loadSound('yellow.mp3');
  Y.setVolume(1);

  B = loadSound('red.mp3');
  B.setVolume(1);

  G = loadSound('green.mp3');
  G.setVolume(1);

}

function createButtons() {
  play = createButton("sequence it!!");
  play.position(20, 80);
  play.mousePressed(analyzeColors);

  // play = createButton("play sound");
  // play.position(120, 10);
  // play.mousePressed(startSound);

  play = createButton("get more bricks");
  play.position(vidW+20, 80);
  play.mousePressed(refresh);
  //need to write a function to clear it.
}

function createVisuals() {
  

  brickArray = [];
  for (let i = 0; i<3; i++){
    let brickX = 20+vidW+i*100;
  blue1 = new Brick(brickX, 320, brickBlue);
  red1 = new Brick(brickX, 240, brickRed);
  green1 = new Brick(brickX, 160, brickGreen);
  yellow1 = new Brick(brickX, 80, brickYellow);

  print("All bricks are made");
  blue1.render();
  red1.render();
  green1.render();
  yellow1.render();

  brickArray.push(blue1);
  brickArray.push(red1);
  brickArray.push(green1);
  brickArray.push(yellow1);
  }
}let brickW = 80;
let brickH = 40;
let blue1;
let brickArray = [];

function setup() {
  createCanvas(400, 400);
  background(220);

  brickBlue = loadImage("brick_blue.png");
  brickGreen = loadImage("brick_green.png");
  brickYellow = loadImage("brick_yellow.png");
  brickRed = loadImage("brick_red.png");

  blue1 = new Brick(200, 200, brickBlue);
  red1 = new Brick(300, 300, brickRed);
  green1 = new Brick(100, 100, brickGreen);
  yellow1 = new Brick(150, 150, brickYellow);

  brickArray.push(blue1);
  brickArray.push(red1);
  brickArray.push(green1);
  brickArray.push(yellow1);





}

function draw() {
  background(220);

  // blue1.render();
  // blue1.move();

 for (let i = 0; i < brickArray.length; i++) {
      brickArray[i].render();
      brickArray[i].move();
    for (let j = 0; j <  brickArray.length; j++) {
      if (i != j && brickArray[i].intersects(brickArray[j])) {
        brickArray[i].stop();
        brickArray[j].stop();
      }
    }
  }

}


class Brick {

  constructor(x, y, brickType) {
    this.x = x;
    this.y = y;
    // this.d = 0;
    this.brickType = brickType;
    this.intersecting = false;
    this.w = brickW;
    this.h = brickH;

  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  render() {
    image(this.brickType, this.x, this.y, brickW, brickH);
  }

  checkPressed() {
    if (mouseX >= this.x - 5 && mouseX <= this.x + brickW + 5 && mouseY >= this.y - 5 && mouseY <= this.y + brickH + 5) {
      // this.d = dist(mouseX, mouseY, this.x, this.y);
      return true;
    }
  }

  move() {
    if (this.checkPressed() == true && mouseIsPressed && this.intersecting==false) {
      this.x = mouseX - 0.5 * brickW;
      this.y = mouseY - 0.5 * brickH;
      this.render();
    }
  }
  
 intersects(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    if (d < this.h/2 + other.h/2) {
      print("It intersected");
      return true;
    } else {
      return false;
    }
  }
  
  stop(){
    this.intersecting= true;
  }
  

}let lego;
let brickSize = 40;
// let marginX = 0;
// let marginY = 0;
let rows = 12;
let cols = rows;
let vidH = brickSize * cols;
let vidW = brickSize * rows;
let leftright = 2;
let startCount;

function setup() {

  frameRate(30);
  createCanvas(vidW, vidH);
  noStroke();

  soundFormats('mp3', 'ogg');

  lego = loadImage('lego_scan_resize.png');
  image(lego, 0, 0, vidW, vidH);

  song = make2DArray(cols, rows);
  bricks = make2DArray(cols, rows);

  loadSounds();
  makeButtons();

}

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}


// function modulo() {
//   for (let i = 0; i < song.length; i++) {
//     if (i == 1 || i % rows == 1) {
//       playSounds(i);
//       print("Modulo is being called at " + i);
//     }
//   }
// }

function startSound() {
  createSong();
  print(song);

  playColumn(leftright);
  startCount = frameCount;
  print("audio started at " + startCount);



}

function playSound() {
  if (startCount != null) {
    print (frameCount);
      
    if (frameCount % 120 == 119) {
      playColumn(leftright);
      leftright++;
      print ("It registered! BOOP!");
      print("It should progress " + leftright);

    }

    // if (frameCount % 60 * 12 == startCount) {
    //   leftright = 2;
    // }
  }
}

function playColumn(leftright) {
  for (let time = 0; time < cols; time++) {
    playSongArray(time, leftright);
  }
}

function playSongArray(time, pitch) {
  if (song[time][pitch] == "Y") {
    print("YELLOW chkka ch" + " " + pitch + ", " + time);
    Y.play();
  }
  if (song[time][pitch] == "R") {
    print("RED knock knock" + " " + pitch + ", " + time);
    R.play();
  }
  if (song[time][pitch] == "B") {
    print("BLUE beatbox" + " " + pitch + ", " + time);
    B.play();
  }
  if (song[time][pitch] == "G") {
    print("GREEN chkka ch" + " " + pitch + ", " + time);
    G.play();
  }
  if (song[time][pitch] == "_") {
    print("rest" + " " + pitch + ", " + time);
  }
}

function draw() {
  // print(frameCount);
  playSound();
}


function refresh() {
  image(lego, 0, 0, vidW, vidH);
  createBricks();
}


function createBricks() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = i * brickSize;
      let y = j * brickSize;
      let c = get(x, y);
      if (isColored(c) == true) {
        bricks[i][j] = drawBrick(c, x, y);
      }
    }
  }
}



//this function asks if something should be a brick. If it is, it draws a brick object.
function drawBrick(c, x, y) {
  push();
  fill(c);
  rect(x, y, brickSize, brickSize);
  pop();
}

function createSong() {

  for (let pitch = 0; pitch < rows; pitch++) {
    for (let time = 0; time < cols; time++) {
      let x = pitch * brickSize;
      let y = time * brickSize;
      let c = get(x, y);

      if (isYellow(c) == true) {
        song[time][pitch] = "Y";

      } else if (isBlue(c) == true) {
        song[time][pitch] = "B";

      } else if (isGreen(c) == true) {
        song[time][pitch] = "G";

      } else if (isRed(c) == true) {
        song[time][pitch] = "R";

      } else {
        song[time][pitch] = "_";
      }

    }
  }


}




//these functions determine colors based on ratios
function isColored(c) {
  if (isRed(c) == true || isYellow(c) == true || isGreen(c) == true || isBlue(c) == true) {
    return true;
  }
}

function isRed(c) {
  if (c[0] != null && c[0] > c[2] + 50 && c[0] > c[1] + 50) {
    return (true);
  }
}

function isBlue(c) {
  if (c[2] != null && c[2] > c[0] + 20 && c[2] > c[1] + 50) {
    return (true);
  }
}

function isYellow(c) {
  if (c[1] != null && c[1] > c[2] + 50 && c[0] > c[1]) {
    return (true);
  }
}

function isGreen(c) {
  if (c[1] != null && c[1] > c[2] && c[1] > c[0] + 20) {
    return (true);
  }

}

//*=============*//
//these are functions that load sounds and create buttons. For setup.
function loadSounds() {
  R = loadSound('Knock 2.mp3');
  R.setVolume(0.1);

  Y = loadSound('Bim.mp3');
  Y.setVolume(1);

  B = loadSound('Beatbox.mp3');
  B.setVolume(0.1);

  G = loadSound('Chkka chh.mp3');
  G.setVolume(0.1);

}

function makeButtons() {
  play = createButton("refresh cam");
  play.position(10, 10);
  play.mousePressed(refresh);

  play = createButton("play sound");
  play.position(10, 40);
  play.mousePressed(startSound);
}// let vidH = 425;

let song = [];
let lego;


let brickSize = 40;
let marginX = brickSize*2;
let marginY = brickSize;
let rows = 12;
let vidH = brickSize * rows + 2 * marginY;
let vidW = brickSize * rows + 2 * marginX;
song.length = 144;


function setup() {

  createCanvas(vidW, vidH);
  noStroke();

  soundFormats('mp3', 'ogg');
  
  lego = loadImage('lego_scan_resize.png');
  image(lego, 80, 0, vidW, vidH);

  // print(rows);

  loadSounds();
  makeButtons();

  
}

function make2DArray(cols,rows){
  let arr = new Array(cols);
  for (let i = 0; i < arr.length;i++){
  	arr[i] = new Array(rows);
  }
}

function modulo() {
  for (let i = 0; i < song.length; i++) {
    if (i == 1 || i % rows == 1) {
      playSounds(i);
      print("Modulo is being called at " + i);
    }
  }
}

function playSounds(i) {
  // print("lalalala");
  // refresh();

  // print(song[i]);

  if (song[i] == "Y") {
    print("chkka ch" + i);

    Y.play();

  }
  if (song[i] == "R") {
    print("knock knock" + i);
    R.play();


  }
  if (song[i] == "B") {
    print("beatbox" + i);
    B.play();

  }

  if (song[i] == "G") {
    print("chkka ch" + i);
    G.play();

  }

  if (song[i] == "_") {
    print("rest" + i);

  }


}

function draw() {
}

function refresh() {
  if (song.length > 144) {
			song = [];
  }

  image(lego, 0, 0, vidW, vidH);

  push();
  noFill()
  stroke(0);
  strokeWeight(10);
  rect(40, 10, vidW - 80, vidH - 20);
  pop();

  colorify();
}



function colorify() {

  for (let x = marginX; x < width - marginX; x += brickSize) {
    for (let y = marginY; y < height - marginY; y += brickSize) {
      let c = get(x, y);
      isBrick(c, x, y);
    }
  }


}

function isRed(c, x, y) {

  if (c[0] != null && c[0] > c[2] + 50 && c[0] > c[1] + 50) {
    // print("it's red at " + x + " " + y);
    song.push("R");

    return (true);
  }
}

function isBlue(c, x, y) {

  if (c[2] != null && c[2] > c[0] + 20 && c[2] > c[1] + 50) {
    // print("it's blue at " + x + " " + y);
    song.push("B");
    return (true);
  }
}

function isYellow(c, x, y) {
  if (c[1] != null && c[1] > c[2] + 50 && c[0] > c[1]) {
    // print("it's yellow at " + x + " " + y);
    song.push("Y");
    return (true);
  }
}

function isGreen(c, x, y) {
  if (c[1] != null && c[1] > c[2] && c[1] > c[0] + 20) {
    // print("it's green at " + x + " " + y);
    song.push("G");
    return (true);
  }
}



function isBrick(c, x, y) {
  if (isYellow(c, x, y) == true || isBlue(c, x, y) == true || isRed(c, x, y) == true || isGreen(c, x, y) == true) {
    fill(c);
    rect(x, y, 38, 38);
    return true;

  } else {
    song.push("_");
    return false;
  }
}

function loadSounds(){
    R = loadSound('Knock 2.mp3');
  R.setVolume(0.1);

  Y = loadSound('Bim.mp3');
  Y.setVolume(1);

  B = loadSound('Beatbox.mp3');
  B.setVolume(0.1);

  G = loadSound('Chkka chh.mp3');
  G.setVolume(0.1);

}

function makeButtons(){
    play = createButton("refresh cam");
  play.position(10, 10);
  play.mousePressed(refresh);

  play = createButton("play sound");
  play.position(10, 40);
  play.mousePressed(modulo);
}// let vidH = 425;
let vidH = 500;
let vidW = 600;
let song = [];
let lego;
song.length = 108;


function setup() {

	createCanvas(vidW, vidH);
	noStroke();

	soundFormats('mp3', 'ogg');
	lego = loadImage('lego_scan.png');

	image(lego, 0, 0, vidW, vidH);
	refresh();

	R = loadSound('Knock 2.mp3');
	R.setVolume(0.1);

	Y = loadSound('Bim.mp3');
	Y.setVolume(1);

	B = loadSound('Beatbox.mp3');
	B.setVolume(0.1);

	G = loadSound('Chkka chh.mp3');
	G.setVolume(0.1);

	play = createButton("refresh cam");
	play.position(10, 10);
	play.mousePressed(refresh);

	play = createButton("play sound");
	play.position(10, 40);
	play.mousePressed(playSounds);
}



function playSounds() {
	// print("lalalala");
	// refresh();

	for (let i = 0; i < song.length; i++) {
		// print(song[i]);

		if (song[i] == "Y") {
			print("chkka ch" + i);
      
			Y.play();

		}
		if (song[i] == "R") {
			print("knock knock" + i);
			R.play();


		}
		if (song[i] == "B") {
			print("beatbox" + i);
			B.play();

		}

		if (song[i] == "G") {
			print("chkka ch" + i);
			G.play();

		}

		if (song[i] == "_") {
			print("rest" + i);

		}

	}
}

function draw() {
	// image(lego, 0, 0, vidW, vidH);

}

function refresh() {
	if (song.length > 108) {
		song.shift();
	}

  image(lego, 0, 0, vidW, vidH);

		push();
		noFill()
		stroke(0);
		strokeWeight(10);
		rect(40, 10, vidW - 80, vidH - 20);
		pop();

		colorify();
}



function colorify() {

	for (let x = 60; x < width - 60; x += 40) {
		for (let y = 30; y < height - 40; y += 40) {
			let c = get(x, y);
			isBrick(c, x, y);
		}
	}


}

function isRed(c, x, y) {

	if (c[0] != null && c[0] > c[2] + 50 && c[0] > c[1] + 50) {
		// print("it's red at " + x + " " + y);
		song.push("R");

		return (true);
	}
}

function isBlue(c, x, y) {

	if (c[2] != null && c[2] > c[0] + 20 && c[2] > c[1] + 50) {
		// print("it's blue at " + x + " " + y);
		song.push("B");
		return (true);
	}
}

function isYellow(c, x, y) {
	if (c[1] != null && c[1] > c[2] + 50 && c[0] > c[1]) {
		// print("it's yellow at " + x + " " + y);
		song.push("Y");
		return (true);
	}
}

function isGreen(c, x, y) {
	if (c[1] != null && c[1] > c[2] && c[1] > c[0] + 20) {
		print("it's green at " + x + " " + y);
		song.push("G");
		return (true);
	}
}



function isBrick(c, x, y) {
	if (isYellow(c, x, y) == true || isBlue(c, x, y) == true || isRed(c, x, y) == true || isGreen(c, x, y) == true) {
		fill(c);
		rect(x, y, 38, 38);
		return true;

	} else {
		song.push("_");
		return false;
	}
}let files;
let imageGrid = [];
imageGrid.length = 6;

let imgX;
let imgY;


function setup() {
  createCanvas(800, 800);
  background(0);
  files = loadJSON('files.json');
  // loadGrid();
  print('files.json');
}


function draw() {
   

}


function loadGrid() {
  for (let i = 0; i < imageGrid.length; i++) {
    let img = files[i];
    imageGrid.push(img);
  }
}

function renderGrid() {
  for (let i = 0; i < imageGrid.length; i++) {
    if (i <= 3) {
      imgX = 100 * i;
      imgY = 200;

    } else if (i > 3) {
      imgX = 100 * i - 300;
      imgY = 300;

    }

    loadImage(imageGrid[i]);
    image(imageGrid[i], imgX, imgY, 100, 100);


  }
}let vidH = 600;
let vidW = 600;
let song = [];
song.length = 108;


function setup() {

  createCanvas(vidW, vidH);
  background(0);
  noStroke();

  soundFormats('mp3', 'ogg');

  lego = loadImage('lego_scan.png');

  image(lego, 0, 0, vidW, vidH);


  R = loadSound('Knock 2.mp3');
  R.setVolume(0.1);

  Y = loadSound('Bim.mp3');
  Y.setVolume(1);

  B = loadSound('Beatbox.mp3');
  B.setVolume(0.1);
  
  G = loadSound('Chkka chh.mp3');
  G.setVolume(0.1);

  play = createButton("refresh cam");
  play.position(10, 10);
  play.mousePressed(refresh);

  play = createButton("play sound");
  play.position(10, 40);
  play.mousePressed(playSounds);


}

function playSounds() {
  // print("lalalala");
  refresh();
  
  for (let i = 0; i < song.length; i++) {
    // print(song[i]);

    if (song[i] == "Y") {
      print("chkka ch");
      Y.play(i);
      
    }
    if (song[i] == "R") {
      print("knock knock");
      R.play(i);
      

    }
    if (song[i] == "B") {
      print("beatbox");
      B.play(i);

    }
    
     if (song[i] == "G") {
      print("chkka ch");
      G.play(i);

    }
    
    if (song[i] == "_") {
      print("rest");

    }

  }
}

function draw() {
  refresh();
}

function refresh() {
  if (song.length > 108) {
    song.shift();
  }
  
  if (mouseIsPressed) {
    image(lego, 0, 0, vidW, vidH);
    colorify();
  }
}



function colorify() {

  for (let x = 60; x < width - 60; x += 40) {
    for (let y = 30; y < height - 40; y += 40) {
      let c = get(x, y);
      isBrick(c, x, y);
    }
  }


}

function isRed(c, x, y) {

  if (c[0] != null && c[0] > c[2] + 50 && c[0] > c[1] + 50) {
    // print("it's red at " + x + " " + y);
    song.push("R");

    return (true);
  }
}

function isBlue(c, x, y) {

  if (c[2] != null && c[2] > c[0] + 20 && c[2] > c[1] + 50) {
    // print("it's blue at " + x + " " + y);
    song.push("B");
    return (true);
  }
}

function isYellow(c, x, y) {
  if (c[1] != null && c[1] > c[2] + 50 && c[0] > c[1]) {
    // print("it's yellow at " + x + " " + y);
    song.push("Y");
    return (true);
  }
}

function isGreen(c,x,y){
 if (c[1] != null && c[1] > c[2] && c[1] > c[0] + 20) {
    print("it's green at " + x + " " + y);
    song.push("G");
    return (true);
  }
}



function isBrick(c, x, y) {
  if (isYellow(c, x, y) == true || isBlue(c, x, y) == true || isRed(c, x, y) == true || isGreen(c,x,y)==true) {
    fill(c);
    rect(x, y, 38, 38);
    return true;

  } else {
    song.push("_");
    return false;
  }
}// let vidH = 425;
let vidH = 500;
let vidW = 600;
let song = [];
song.length = 108;


function setup() {

	createCanvas(vidW, vidH);
	background(0);
	noStroke();

	soundFormats('mp3', 'ogg');
	lego = loadImage('lego_scan.png');
	video = createCapture(VIDEO);
	video.hide();

	image(video, 0, 0, vidW, vidH);
	refresh();


	R = loadSound('Knock 2.mp3');
	R.setVolume(0.1);

	Y = loadSound('Bim.mp3');
	Y.setVolume(1);

	B = loadSound('Beatbox.mp3');
	B.setVolume(0.1);

	G = loadSound('Chkka chh.mp3');
	G.setVolume(0.1);

	play = createButton("refresh cam");
	play.position(10, 10);
	play.mousePressed(refresh);

	play = createButton("play sound");
	play.position(10, 40);
	play.mousePressed(playSounds);


}

function playSounds() {
	// print("lalalala");
	refresh();

	for (let i = 0; i < song.length; i++) {
		// print(song[i]);

		if (song[i] == "Y") {
			print("chkka ch");
			Y.play(i);

		}
		if (song[i] == "R") {
			print("knock knock");
			R.play(i);


		}
		if (song[i] == "B") {
			print("beatbox");
			B.play(i);

		}

		if (song[i] == "G") {
			print("chkka ch");
			G.play(i);

		}

		if (song[i] == "_") {
			print("rest");

		}

	}
}

function draw() {
	// image(video, 0, 0, vidW, vidH);
}

function refresh() {
	if (song.length > 108) {
		song.shift();
	}

	// if (mouseIsPressed) {
		image(lego, 0, 0, vidW, vidH);

		push();
		noFill()
		stroke(0);
		strokeWeight(10);
		rect(40, 10, vidW - 80, vidH - 20);
		pop();

		colorify();
	// }
}



function colorify() {

	for (let x = 60; x < width - 60; x += 40) {
		for (let y = 30; y < height - 40; y += 40) {
			let c = get(x, y);
			isBrick(c, x, y);
		}
	}


}

function isRed(c, x, y) {

	if (c[0] != null && c[0] > c[2] + 50 && c[0] > c[1] + 50) {
		// print("it's red at " + x + " " + y);
		song.push("R");

		return (true);
	}
}

function isBlue(c, x, y) {

	if (c[2] != null && c[2] > c[0] + 20 && c[2] > c[1] + 50) {
		// print("it's blue at " + x + " " + y);
		song.push("B");
		return (true);
	}
}

function isYellow(c, x, y) {
	if (c[1] != null && c[1] > c[2] + 50 && c[0] > c[1]) {
		// print("it's yellow at " + x + " " + y);
		song.push("Y");
		return (true);
	}
}

function isGreen(c, x, y) {
	if (c[1] != null && c[1] > c[2] && c[1] > c[0] + 20) {
		print("it's green at " + x + " " + y);
		song.push("G");
		return (true);
	}
}



function isBrick(c, x, y) {
	if (isYellow(c, x, y) == true || isBlue(c, x, y) == true || isRed(c, x, y) == true || isGreen(c, x, y) == true) {
		fill(c);
		rect(x, y, 38, 38);
		return true;

	} else {
		song.push("_");
		return false;
	}
}var red1 = ['255', '0', '0', '255'];
var blue1 = ['0', '0', '255','255'];
var green1 = ['0', '255', '0','255'];
var yellow1 = ['255', '255', '0','255'];
var img1;
var img2;
var kick;
var shaker;
var snare;
var button1;
var button2;
var serial;
var x = 75;

function preload() {
  img1 = loadImage('pattern1.png');
  img2 = loadImage('pattern2.png');
  kick = loadSound('Kick.wav');
  shaker = loadSound('shaker.wav');
  snare = loadSound('snare.wav');
}

function setup() {
  createCanvas(600, 300);
  background(255);
  //image(img1, 0, 0, 600, 300);
  image(img2, 0, 0, 600, 300);
	serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('data', serialEvent); // callback for when new data 
  var bpm = 200;
  setTimeout(run,bpm);
  
  // setInterval(isYellow,1000);
  // setInterval(isGreen,250);
  // //setTimeout(snarePlay,500);
  // setInterval(isBlue,500);


}



function checkColor(c){
  if (c[0] < 100 && c[1] < 100 && c[2] > 220 ){
  snare.play();
  //console.log("BLUE!");

}else if (c[0] < 50 && c[1] > 220 && c[2] < 50 ){
shaker.play();
//console.log("GREEN!");

}else if (c[0] > 220 && c[1] > 220 && c[2] < 50 ){
  //console.log("YELLOW!");
kick.play();
}else{
 // console.log("no color");
}

}

function runColumn(){
 
//for (let i = 75; i < 600; i += 150){
  for (let j = 150; j > 0; j -= 100){
    let c = get(x,j);
    //console.log(c);
    checkColor(c);

  }
//}

}

function run() {
		
  	runColumn();
  	x = x + 150;
  if (x>600){ x=75;}
 setTimeout(run,bpm);   
}

function serialEvent() {
  var data = serial.readLine();
  if (data.length > 0) {
    var sensors = split(data, ",");
    console.log(sensors);
    bpm = int(sensors[0]);
		
  }
}
function draw() {
  
}
// let red = {
//   x:10,
//   y:10,
//   w:800,
//   h:50
// }

// let yellow = {
//   x:10,
//   y:10,
//   w:800,
//   h:50
// }


// let green = {
//   x:10,
//   y:600,
//   w:800,
//   h:50
// }

// let blue = {
//   x:10,
//   y:500,
//   w:800,
//   h:50
// }

let img;
let redsound, bluesound, yellowsound, greensound;

function preload() {
  soundFormats('mp3', 'ogg');

  img = loadImage('lego.png');
  // redsound = loadSound('doorbell.mp3');

}


function setup() {
  createCanvas(800, 800);
  // red.setVolume(0.1);

  image(img, 0, 0, width, height);

  red1 = createButton('1');
  red1.position(50, 120);
  red1.mousePressed(red);

  red2 = createButton('2');
  red2.position(300, 120);
  red2.mousePressed(red);

  red3 = createButton('3');
  red3.position(500, 120);
  red3.mousePressed(red);


  green1 = createButton('4');
  green1.position(200, 200);
  green1.mousePressed(green);

  yellow1 = createButton('1');
  yellow1.position(50, 120);
  yellow1.mousePressed(yellow);

  yellow2 = createButton('2');
  yellow2.position(300, 120);
  yellow2.mousePressed(yellow);

  yellow3 = createButton('3');
  yellow3.position(500, 120);
  yellow3.mousePressed(yellow);


  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.freq(240);
  osc.amp(0);
  osc.start();






}

function draw() {

}

function red() {
  // redsound.play();

  print('red');
}

function green() {
  // greensound.play();
  print('green');

}


function yellow() {
  // yellowsound.play();
  print('yellow');

}

function blue() {
  // bluesound.play();
  print('blue');

}let size = 30;
let vidH = 425;
let vidW = 600;

let highBound = 2;
let lowBound = highBound + vidH - size - 4;

let swatch;
let doodling;


function setup() {

  createCanvas(windowWidth, windowHeight);
  background(0);

  video = createCapture(VIDEO);
  video.hide();

  fill(255);
  rect(0, 0, vidW, height);

  image(video, 0, 0, vidW, vidH);

  ui();

}

function draw() {
  image(video, 0, 0, vidW, vidH);

  doodle();
  brushSize();
}


function brushSize() {
  let whee = slider.value();
  print(whee);
  size = whee;
  
  lowBound = highBound + vidH - size - 4;
}


function colorPicker() {
  push();

  noFill();

  stroke(255, 0, 0);
  rect(mouseX - 2, mouseY - 2, size + 4, size + 4);

  noStroke();
  rect(mouseX, mouseY, size, size);

  pop();
}

function doodle() {
  //draw the selector state (red rectangle cursor)
  if (mouseX < vidW - size - 2 && mouseY > highBound && mouseY < lowBound) {
    colorPicker();
  }

  //grab a still swatch of video
  if (mouseIsPressed && mouseX < vidW - size && mouseY > highBound && mouseY < lowBound) {

    swatch = get(mouseX, mouseY, size, size);
  }

  //draw or erase
  if (mouseIsPressed && mouseX >= vidW && swatch != null) {
    if (doodling == false) {
      push();
      fill(0);
      rect(mouseX, mouseY, size, size);
      pop();

    }
    if (doodling) {
      image(swatch, mouseX, mouseY, size, size);
    }
  }

}

function eraseMode() {
  doodling = false;
}

function doodleMode() {
  doodling = true;
}


function ui() {

  title = createP("cam-doodler ☺");
  title.id("big");
  title.position(0, 0);

  //slider label  
  sliderText = createP("brush size:");
  sliderText.position(20, vidH + 10);

  //slider for brush size
  slider = createSlider(10, 80, 30);
  slider.position(120, vidH + 25);

  //buttons: erase + doodle mode
  erase = createButton("eraser");
  erase.position(290, vidH + 25);
  erase.mousePressed(eraseMode);

  doodling = createButton("doodler");
  doodling.position(360, vidH + 25);
  doodling.mousePressed(doodleMode);
  

}

let size = 30;
let vidH = 425;
let vidW = 600;

let highBound = 2;
let lowBound = highBound + vidH - size - 4;

let swatch;
let doodling;


function setup() {

  createCanvas(vidW * 2, windowHeight);
  background(0);

  video = createCapture(VIDEO);
  video.hide();

  fill(255);
  rect(0, 0, vidW, height);

  image(video, 0, 0, vidW, vidH);

  ui();

}

function draw() {
  image(video, 0, 0, vidW, vidH);

  doodle();
  brushSize();
}


function brushSize() {
  let whee = slider.value();
  print(whee);
  size = whee;
  
  lowBound = highBound + vidH - size - 4;
}


function colorPicker() {
  push();

  noFill();

  stroke(255, 0, 0);
  rect(mouseX - 2, mouseY - 2, size + 4, size + 4);

  noStroke();
  rect(mouseX, mouseY, size, size);

  pop();
}

function doodle() {
  //draw the selector state (red rectangle cursor)
  if (mouseX < vidW - size - 2 && mouseY > highBound && mouseY < lowBound) {
    colorPicker();
  }

  //grab a still swatch of video
  if (mouseIsPressed && mouseX < vidW - size && mouseY > highBound && mouseY < lowBound) {

    swatch = get(mouseX, mouseY, size, size);
  }

  //draw or erase
  if (mouseIsPressed && mouseX >= vidW && swatch != null) {
    if (doodling == false) {
      push();
      fill(0);
      rect(mouseX, mouseY, size, size);
      pop();

    }
    if (doodling) {
      image(swatch, mouseX, mouseY, size, size);
    }
  }

}

function eraseMode() {
  doodling = false;
}

function doodleMode() {
  doodling = true;
}


function ui() {

  title = createP("cam-doodler ☺");
  title.id("big");
  title.position(0, 0);

  //slider label  
  sliderText = createP("brush size:");
  sliderText.position(20, vidH + 10);

  //slider for brush size
  slider = createSlider(10, 80, 30);
  slider.position(120, vidH + 25);

  //buttons: erase + doodle mode
  erase = createButton("eraser");
  erase.position(290, vidH + 25);
  erase.mousePressed(eraseMode);

  doodling = createButton("doodler");
  doodling.position(360, vidH + 25);
  doodling.mousePressed(doodleMode);
  

}

let size = 30;
let vidH = 425;
let vidW = 600;
let header = 0;

let highBound = header + 2;
let lowBound = highBound + vidH - size - 4;
let swatch;
let doodling;
let magic = false;
let magicX, magicY;

function setup() {

  createCanvas(vidW * 2, windowHeight);
  background(0);

  video = createCapture(VIDEO);
  video.hide();

  fill(255);
  rect(0, 0, vidW, height);

  image(video, 0, 0, vidW, vidH);

  ui();




}

function draw() {
  image(video, 0, header, vidW, vidH);

  doodle();
  brushSize();
  


}


function brushSize(){
  let whee = slider.value();
  print(whee);
  size = whee;
  lowBound = highBound + vidH - size - 4;

}

function doodle() {


  //draw the selector state (red rectangle cursor)
  if (mouseX < vidW - size - 2 && mouseY > highBound && mouseY < lowBound) {
    push();

    noFill();

    stroke(255, 0, 0);
    rect(mouseX - 2, mouseY - 2, size + 4, size + 4);

    noStroke();
    rect(mouseX, mouseY, size, size);

    pop();
  }

  //grab a still swatch of video
  if (mouseIsPressed && mouseX < vidW - size && mouseY > highBound && mouseY < lowBound) {

    swatch = get(mouseX, mouseY, size, size);
  }

  //draw or erase
  if (mouseIsPressed && mouseX >= vidW && swatch != null) {
    if (doodling == false) {
      push();
      fill(0);
      rect(mouseX, mouseY, size, size);
      pop();

    }
    if (doodling) {
      image(swatch, mouseX, mouseY, size, size);
    }
  }

  //magic mode?
  if (magic) {
    print(magicX);
    print(magicY);
    if (mouseIsPressed && mouseX < vidW - size && mouseY > highBound && mouseY < lowBound) {

      magicX = mouseX;
      magicY = mouseY;

    }

    if (mouseIsPressed && mouseX >= vidW && magicX != null && magicY != null) {
      copy(video, magicX, magicY, size, size, mouseX, mouseY, size, size);
      magic = false;
    }
  }

}

function eraseMode() {
  doodling = false;
}

function doodleMode() {
  doodling = true;
}

function magicMode() {
  magic = true;
}

function ui() {

  title = createP("cam-doodler ☺");
  title.id("big");
  title.position(0, 0);

  //slider label  
  sliderText = createP("brush size:");
  sliderText.position(20, vidH + 10);

  //slider for brush size
  slider = createSlider(10, 80, 30);
  slider.position(120, vidH + 25);

  //buttons: erase + doodle mode
  erase = createButton("eraser");
  erase.position(290, vidH + 25);
  erase.mousePressed(eraseMode);

  doodling = createButton("doodler");
  doodling.position(360, vidH + 25);
  doodling.mousePressed(doodleMode);

  magic = createButton("magic-doodler");
  magic.position(440, vidH + 25);
  magic.mousePressed(magicMode);


}var video;
let positions = [];

let x = 0;
let y = 0;
let got;

let srcPositions = [];

let size = 30;
let pg;
let pgSave;
function setup() {
  createCanvas(700, 500);
  video = createCapture(VIDEO);
  video.hide();
  image(video, 0,0, 700, 500);
  pg = createGraphics(width, height);
  pg.background(255);
  pg.noFill();
  pg.stroke(255);

  // srcPositions.push({
  //   x: 0,
  //   y: 0
  // });
}

function draw() {
  background(0);
  // Step 5. Display the video image.
  print(frameCount);

  image(video, 0,0, 700, 500);
  mouseLight();





}

function mouseLight() {

    positions.push({
      x: mouseX,
      y: mouseY
    });

      // positions.shift();
      // let layer = get();
      // video = layer;
      // updatePixels();

    

    // for (let i = 0; i < srcPositions.length; i++) {
    //   srcX = srcPositions[i].x;
    //   srcY = srcPositions[i].y;
    // }

    if (positions.length > 20) {

    for (let i = 1; i < positions.length; i++) {
      let x = positions[i].x;
      let y = positions[i].y;
      let x1 = positions[i-1].x;
      let y1 = positions[i-1].y;
      // let x1 = srcPositions[0].x;
      // let y1 = srcPositions[0].y;
      let d = dist(x,y,x1,y1);
      // print(i);


      // fill(255, 255, 255, i / 2);
      stroke(0);

      let got = get(mouseX,mouseY,size,size);
      image(got, x, y, size, size);



    }

}
}var video;
let positions = [];

let x = 0;
let y = 0;
let got;

let srcPositions = [];

let size = 30;
let pg;
let pgSave;
function setup() {
  createCanvas(700, 500);
  video = createCapture(VIDEO);
  // The above function actually makes a separate video
  // element on the page.  The line below hides it since we are
  // drawing the video to the canvas

  video.hide();
  image(video, 0,0, 700, 500);
  pg = createGraphics(width, height);
  pg.background(255);
  pg.noFill();
  pg.stroke(255);

  // srcPositions.push({
  //   x: 0,
  //   y: 0
  // });
}

function draw() {
  background(0);
  // Step 5. Display the video image.
  print(frameCount);

  image(video, 0,0, 700, 500);
  mouseLight();





}

function mouseLight() {

    positions.push({
      x: mouseX,
      y: mouseY
    });

    if (positions.length > 20) {
      positions.shift();
      got = get(pg);
      // pg.image(got,0,0,width,width);
      // pg.image(got, 0,0, width/4, width/4);
      // image(pg, 0,0, width, width);

    }

    // for (let i = 0; i < srcPositions.length; i++) {
    //   srcX = srcPositions[i].x;
    //   srcY = srcPositions[i].y;
    // }


    for (let i = 1; i < positions.length; i++) {
      let x = positions[i].x;
      let y = positions[i].y;
      let x1 = positions[i-1].x;
      let y1 = positions[i-1].y;
      // let x1 = srcPositions[0].x;
      // let y1 = srcPositions[0].y;
      let d = dist(x,y,x1,y1);
      // print(i);


      // fill(255, 255, 255, i / 2);
      stroke(0);
  pg.image(video, 0,0, pg.width, pg.height);
  image(pg, x, y, 100, 100);



    }

}let pg;

let positions = [];

let srcPositions = [];
let srcX = 0;
let srcY = 0;

let c;
let i = 0;
let size = 25;

function setup() {
  createCanvas(710, 400);
  video = createCapture(VIDEO);
  video.hide();
  image(video, 0, 0, 700, 500);
  c = get(0,0);

}

function draw() {
  noStroke();
  image(video, 0, 0, 700, 500);

  mouseLight();
  // Draw the offscreen buffer to the screen with image()

}

function mousePressed() {
//   srcPositions.push({
//     x: mouseX,
//     y: mouseY
//   });

//   srcPositions.shift();
srcX= mouseX;
  srcY=mouseY;
    c = get(srcX, srcY);

}


function mouseLight() {

  positions.push({
    x: mouseX,
    y: mouseY
  });

  if (positions.length > 10) {
    positions.shift();

  }


  for (let i = 0; i < srcPositions.length; i++) {
    srcX = srcPositions[i].x;
    srcY = srcPositions[i].y;
  }


  for (let i = 1; i < positions.length; i++) {
    let x = positions[i].x;
    let y = positions[i].y;
    let x1 = positions[i-1].x;
    let y1 = positions[i-1].x;
    let d = dist(x,y,x1,y1);
    c = get(srcX+d,srcY+d);
    fill(c);
    ellipse(x, y, size, size);
  }


}

// function mouseReleased() {
//   pg = createGraphics(710, 400);
//   pg.background(0, 0, 0, 0);
//   pg.noFill();
//   pg.stroke(255);

//   image(pg,0,0,100);
//   updatePixels();

// }var video;
let positions = [];
let srcPositions = [];
let srcX;
let srcY;
let size = 50;

function setup() {
  createCanvas(700, 500);
  video = createCapture(VIDEO);
  // The above function actually makes a separate video
  // element on the page.  The line below hides it since we are
  // drawing the video to the canvas

  imageMode(CENTER);
  video.hide();
  image(video, width / 2, height / 2, 700, 500);
  srcPositions.push({
    x: 0,
    y: 0
  });
}

function draw() {
  background(0);
  // Step 5. Display the video image.
  print(frameCount);

  image(video, width / 2, height / 2, 700, 500);
  mouseLight();


  // copy(video, 7, 22, 10, 10, mouseX, mouseY, 50, 50);
}

function mousePressed() {
  srcPositions.push({
    x: mouseX,
    y: mouseY
  });

  srcPositions.shift();


}

function mouseLight() {

  // if (mouseIsPressed) {
    positions.push({
      x: mouseX,
      y: mouseY
    });

    if (positions.length > 20) {
      positions.shift();
    }

    for (let i = 0; i < srcPositions.length; i++) {
      srcX = srcPositions[i].x;
      srcY = srcPositions[i].y;
    }


    for (let i = 1; i < positions.length; i++) {
      let x = positions[i].x;
      let y = positions[i].y;
      let x1 = srcPositions[0].x;
      let y1 = srcPositions[0].y;
      print(i);


      // fill(255, 255, 255, i / 2);
      stroke(0);
      copy(video, srcPositions[0].x, srcPositions[0].x, size, size, x, y, size * 2, size * 2);

    }
  // }
}let noiseScale = 0.01;
let rand;
let a = 0;
let pg;

function setup() {
  createCanvas(400, 400);
  frameRate(20);
  pg = createGraphics(width, height);


}

function draw() {
  
  makeNoise();
  background(0, 0, 0, a);
  
}

// function mousePressed(){
//   a= 255;
//   background(0,0,0,a);
// }

function makeNoise() {
  rand = random(width / 20);

  for (let x = 0; x < width; x += 2) {
    let noiseX = noise((rand + x) * noiseScale, rand * noiseScale);
    let noiseY = noise((rand + x) * noiseScale, rand * noiseScale);
    stroke(noiseX * 200);
    strokeWeight(2);
    line(x, 0, x, height);
  }
}let noiseScale = 0.01;
let rand;
let a = 0;

function setup() {
  createCanvas(400, 400);
  frameRate(20);
  pg = createGraphics(width, height);


}

function draw() {


  makeNoise();
  background(0, 0, 0, a);
  
  // pg.background(0);
  // pg.fill(0);
  // pg.noStroke();
  // pg.ellipse(pg.width / 2, pg.height / 2, 50, 50);
  // image(pg, mouseX, mouseY, 50, 50);


  //     let noiseVal = noise((mouseX)*noiseScale, mouseY*noiseScale);
  //     fill(noiseVal*255);
  //   strokeWeight(noiseVal*3);
  //   stroke(noiseVal*255);


  //   for (var x=0; x < width; x+=10) {
  //     for(let y = 0; y < height; y+=10){
  //     ellipse(x +random(2), y + random(2), 10, 10);
  //     }
}

// function mousePressed(){
//   a= 255;
//   background(0,0,0,a);
// }

function makeNoise() {
  rand = random(width / 20);

  for (let x = 0; x < width; x += 2) {
    let noiseX = noise((rand + x) * noiseScale, rand * noiseScale);
    let noiseY = noise((rand + x) * noiseScale, rand * noiseScale);
    stroke(noiseX * 200);
    strokeWeight(2);
    line(x, 0, x, height);
  }
}var video;
let positions = [];
let srcPositions = [];
let srcX;
let srcY;
let size = 50;

function setup() {
  createCanvas(700, 500);
  video = createCapture(VIDEO);
  // The above function actually makes a separate video
  // element on the page.  The line below hides it since we are
  // drawing the video to the canvas

  imageMode(CENTER);
  video.hide();
  image(video, width / 2, height / 2, 700, 500);
  srcPositions.push({
    x: 0,
    y: 0
  });
}

function draw() {
  background(0);
  // Step 5. Display the video image.
  print(frameCount);

  image(video, width / 2, height / 2, 700, 500);
  mouseLight();


  // copy(video, 7, 22, 10, 10, mouseX, mouseY, 50, 50);
}

function mousePressed() {
  srcPositions.push({
    x: mouseX,
    y: mouseY
  });

  srcPositions.shift();


}

function mouseLight() {

  // if (mouseIsPressed) {
    positions.push({
      x: mouseX,
      y: mouseY
    });

    if (positions.length > 20) {
      positions.shift();
    }

    for (let i = 0; i < srcPositions.length; i++) {
      srcX = srcPositions[i].x;
      srcY = srcPositions[i].y;
    }


    for (let i = 1; i < positions.length; i++) {
      let x = positions[i].x;
      let y = positions[i].y;
      let x1 = srcPositions[0].x;
      let y1 = srcPositions[0].y;
      print(i);


      // fill(255, 255, 255, i / 2);
      stroke(0);
      copy(video, srcPositions[0].x, srcPositions[0].x, size, size, x, y, size, size);

    }
  // }
}// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Example 16-6: Drawing a grid of squares

// Size of each cell in the grid, ratio of window size to video size
// 40 * 16 = 640
// 30 * 16 = 480
var videoScale = 16;

// Number of columns and rows in our system
var cols, rows;

function setup() {
  createCanvas(640, 480);

  // Initialize columns and rows
  cols = width/videoScale;
  rows = height/videoScale;

  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(cols, rows);
  //video.hide();
}

function mousePressed() {
}

function draw() {
  background(0);
  video.loadPixels();

  // Begin loop for columns
  for (var i = 0; i < cols; i++) {
    // Begin loop for rows
    for (var j = 0; j < rows; j++) {
      // Reversing x to mirror the image
      // In order to mirror the image, the column is reversed with the following formula:
      // mirrored column = width - column - 1
      var loc = ((cols - i - 1) + j * cols) * 4;
      
      // The functions red(), green(), and blue() pull out the three color components from a pixel.
      var r = video.pixels[loc   ]; 
      var g = video.pixels[loc + 1];
      var b = video.pixels[loc + 2];

      // A rectangle size is calculated as a function of the pixel's brightness. 
      // A bright pixel is a large rectangle, and a dark pixel is a small one.
      var sz = map((r+g+b)/3, 0, 255, 0, videoScale);
      rectMode(CENTER);
      fill(255);
      noStroke();
      // For every column and row, a rectangle is drawn at an (x,y) location scaled and sized by videoScale.
      var x = i*videoScale;
      var y = j*videoScale;
      image(video, x + videoScale/2, y + videoScale/2, sz, sz);
    }
  }
}

// Declare a "SerialPort" object
let serial;
let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas

let rain, light;
let line = 0;
let i = 0;
let repeat = 8;

let myFont;

let poemArray;
let newPoem = [];

function preload() {
  poemArray = loadStrings('ursula.txt');
  myFont = loadFont('cinetype.otf');
}

function setup() {

  createCanvas(windowWidth, 600);
  background(0);
  fill(255);
  textAlign(CENTER);

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem1411");
  serial.on('data', serialEvent);
}



function draw() {
  title();
if (rain >= 30){
  autoWrite();
}
  
}

function mousePressed() {
  
  nextLine();
}

function fade() {
  background(0, 0, 0, 50);

}

function title() {
  push();
  textSize(16);

  strokeWeight(0.5);
  stroke(0);
  text("plant thoughts", width / 2, 40);
  textSize(10);
  text("~ursula l.g.", width / 2, 60);
  pop();

}

function serialEvent() {
  // read a string from the serial port
  // until you get carriage return and newline:
  let inString = serial.readStringUntil('\r\n');

  //check to see that there's actually a string there:
  if (inString.length > 0) {
    // print("it's working! " + inString);

    let sensors = split(inString, ','); // split the string on the commas
    if (sensors.length > 1) { // if there are three elements
      rain = int(sensors[0]); // element 0 is the locH
      light = int(sensors[1]); // element 1 is the locV


    }


    print("rain is " + rain);
    //rain is between 100 and 250

    print("light is " + light);
    //light is between 500 and 600

  }
}

function nextLine() {
  i++;
  sentences();
  writeLine(line, i);
  if (i % repeat == 0) {
    fade();
    line++;
    i = 0;
  }
}


function autoWrite() {

  let rate = floor((102 - rain) * 1.02);
  if (frameCount % rate == 0) {
    print("frame: " + frameCount);
    nextLine();
  }
}

function writeLine(line, i) {
  light = map(light, 100, 0, 20, 12);
  // light = map(light, 150, 400, 10, 50);
  push();

  textSize(light - i * 0.5);

  //move the whole unit over
  translate(width * 0.5, 100);

  rotate(i * random(-0.01, 0.01));

  text(newPoem[line], 0, i * 40);
  // print("line is " + line);
  fade();
  pop();

  text("🌿", random(width), random(height));

}

function sentences() {
  for (let n = 0; n < poemArray.length; n++) {
    // print("n is " + n);
    // print(poemArray[0]);
    newPoem[n] = split(poemArray[n], ",");
  }
}let capture;
let west = [];
let i = 0;

function preload() {
  west = loadStrings('west.txt');
}

function setup() {
  createCanvas(600, 480);
  capture = createCapture(VIDEO);
  capture.size(width, height);
  capture.hide();
  shuffle(west, true);
  textSize(20);
  fill(0);

}

function draw() {
  background(255);
  image(capture, 0, 0, width, height);

  textSize(20);
  fill(0);
  text(west[i], 100, 100);



}

function mousePressed() {

  if (i <= west.length) {
    i++;
    print(i);
    print(west.length);
    image(capture, 0, 0, width, height);
  }
  if (i> west.length) {
    i = 0;
  }

}function setup() {
    var canvas = createCanvas(960, 720);
    angle = PI / 4;
    count = 0;
    canvas.parent('sandbox');
    mult = 0.3;
    iteration = 0;
    num = 120;
}

function draw() {
    background(51);
    stroke(255);
    translate(960 / 2, height);
    branch(num);
    angle = angle + .02;
    ++count;
    if (count == 190) {
        mult = mult + 0.05;
        count = 0;
        ++iteration;
        num = num + 2;
        if (iteration == 10) {
            noLoop();
        }
    }
}

function branch(len) {
    line(0, 0, 0, -len);
    translate(0, -len);
    if (len > 4) {
        push();
        rotate(angle);
        branch(mult * len);
        pop();
        push();
        rotate(-angle);
        branch(len * mult)
        pop();
    }
}
// Declare a "SerialPort" object
let serial;
let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas
let rain, light;
let line = 0;

let poemArray;
let newPoem = [];

function preload() {
  poemArray = loadStrings('ursula.txt');
}

function setup() {
  createCanvas(600, 600);
  noLoop();
  textAlign(CENTER);
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem1411");
  serial.on('data', serialEvent);
}



function draw() {
  background(0, 0, 0, 100);
  textSize(16);
  fill(255);
  text("plant thoughts", width / 2, 40);

}

function mousePressed() {
  line++;
  line %= 10;
  // print(line);
    sentences();

  writeLine(line);
  


}


function serialEvent() {
  // read a string from the serial port
  // until you get carriage return and newline:
  //   let inString = serial.readStringUntil('\r\n');

  //   //check to see that there's actually a string there:
  //   if (inString.length > 0) {
  //     // print("it's working! " + inString);

  //     let sensors = split(inString, ','); // split the string on the commas
  //     if (sensors.length > 1) { // if there are three elements
  //       rain = int(sensors[0]); // element 0 is the locH
  //       // light = int(sensors[1]); // element 1 is the locV


  //     }

  rain = serial.readString();

  print("rain is " + rain);
  //rain is between 100 and 250

  // print("light is " + light);
  //light is between 500 and 600
  // }
}

function nextLine() {
  if (rain > 200) {
    line++;
    line %= 10;
    writeLine(line);
  }
}



function writeLine(i) {
  // shuffle(poemArray, true);

  rain = map(rain, 100, 300, 30, 10);

  light = map(light, 150, 400, 10, 50);

  push();
  //previous text Width
  // prev_growthX = textWidth(newPoem[i - 1]);

  //current text width
  growthX = textWidth(newPoem[i]);

  //current text height (is the same if Text Size is same)
  growthY = textAscent(newPoem[i]) + textDescent(newPoem[i]) + 10;

  textSize(rain);

  //move the whole unit over
  translate(width * 0.5, 100);
  // rotate(random(0, 0.02));
  rotate(i * random(-0.01, 0.01));
  let darkness = map(i, 0, 10, 0, 255);
  fill(255, 255, 255, darkness);
  //draw text moving upwards from central location
  text(newPoem[i], 0, i * growthY);
  pop();
  text("🌿", random(width), random(height));

}

function sentences() {
  for (let n = 0; n < poemArray.length; n++) {
    newPoem = split(poemArray[n], ",");
  }
  print(newPoem[0]);
}let table;
let buttonShow, button0, button1, button2, button3;
let buttonX = 55;

function preload() {
  //my table is comma separated value "csv"
  //and has a header specifying the columns labels
  table = loadTable("sqf-2016.csv", "csv", "header");
  //the file can be remote
  //table = loadTable("http://p5js.org/reference/assets/mammals.csv",
  //                  "csv", "header");
}

function setup() {
  createCanvas(700, 700);
  background(220);
  //count the columns
  print(table.getRowCount() + " total rows in table");
  print(table.getColumnCount() + " total columns in table");

  print(table.getColumn("name"));
  //["Goat", "Leopard", "Zebra"]


  createHeader();
  showAll();


}

function draw() {

}

function clearAll() {
  background(255);

}

function showAll() {
  //cycle through the table

  
  for (let r = 0; r < table.getRowCount(); r++) {
    let string = table.getString(r, 81);
    if (string == "W") {
      fill(255, 0, 0);
      text("white", random(width), random(100,height));
    }

    if (string == "B") {
      fill(0, 0, 255);
      text("black", random(width), random(100,height));
    }

    if (string == "U") {
      fill(200);

      text("unknown", random(width), random(100,height));
    }

    if (string == "A") {
      fill(0, 255, 0);

      text("asian", random(width), random(100,height));
    } else {}
  }


}

function filter1() {
  background(255);

  for (var r = 0; r < table.getRowCount(); r++) {
    let string = table.getString(r, 81);
    if (string == "W") {
      fill(255, 0, 0);
      text("white", random(width), random(100,height));
    }

  }
}

function filter2() {
  background(255);

  for (var r = 0; r < table.getRowCount(); r++) {
    let string = table.getString(r, 81);
    if (string == "B") {
      fill(0, 0, 255);
      text("black", random(width), random(100,height));
    }

  }
}

function filter3() {
  background(255);

  for (var r = 0; r < table.getRowCount(); r++) {
    let string = table.getString(r, 81);
    if (string == "A") {
      fill(0, 255, 0);

      text("asian", random(width), random(100,height));
    }

  }
}

function filter4() {
  background(255);

  for (var r = 0; r < table.getRowCount(); r++) {
    let string = table.getString(r, 81);
    if (string == "U") {
      fill(200);

      text("unknown", random(width), random(100,height));
    }

  }
}

function createHeader() {

  div = createDiv(['']);
  
  
  title = createElement('h2', "stop and frisk data by race // nyc 2016");
  title.position(0, -20);
  
 button0 = createButton('clear');
  button0.position(20, buttonX);
  button0.mousePressed(clearAll);
 
  
  buttonShow = createButton('show all');
  buttonShow.position(70, buttonX);
  buttonShow.mousePressed(showAll);

 
  
  button1 = createButton('white');
  button1.position(150, buttonX);
  button1.mousePressed(filter1);


  button2 = createButton('black');
  button2.position(200, buttonX);
  button2.mousePressed(filter2);



  button3 = createButton('asian');
  button3.position(250, buttonX);
  button3.mousePressed(filter3);



  button4 = createButton('unknown');
  button4.position(300, buttonX);
  button4.mousePressed(filter4);

}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}/* json file is in project folder 
it's named "appetizers.json" */

function setup(){
}

function draw(){
}/* THIS DOESN'T WORK! But I dont know why :( */


let str;
let br = ".";
let poemArray = [];
let poem = "Laughs Does not answer Enter stage right: the Jester Questioning’s run its course, all interviews done and now we are a-stage; Cursors blink, think, plink! Pink, and a ghostly remaint. Enter dingo, enter morse that’s a deer and not a horse Contemplative, ‘course riverine, sinuously parallel, they seek seven restarting though alas that still cursor yet remains";
let x = 0;
let y = 0;

// Declare a "SerialPort" object
let serial;
let latestData = "waiting for data"; // you'll use this to write incoming data to the canvas


function preload() {
  //load strings from file
  // poemArray = loadStrings('holojenga.txt');

}


function setup() {
  createCanvas(600, 600);

  textAlign(CENTER);
  angleMode(DEGREES);
  textSize(12);

  loadStrings('holojenga.txt', pickStrings);

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem77");
  serial.on('data', gotData);

  drawText();


}

function pickStrings(poemArray) {
  poemArray = splitTokens(poem, " ");
  poemArray = shuffle(poemArray);
  let word = floor(random(poemArray.length));
  text(poemArray[word], 10, 10, 10, 10);

}

function drawText() {
  for (let i = 0; i < poemArray.length; i++) {
    push();
    textSize(i);
    translate(width / 2, height - 100);
    rotate(-i * 0.3);

    let darkness = map(i, 0, poemArray.length, 255, 150);
    fill(darkness);

    //draw text moving upwards from central location
    text(poemArray[i], i * 2, -i * 15);

    pop();
  }
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
  background(10);
  fill(0);


  pickStrings();
  
  if(latestData > 200){
   drawText();
  }



}

function wordWidth() {
  for (let i = 0; i < poemArray.length; i++) {
    x = x + textWidth(poemArray[i]);

  }
  return x;
}let a;
let b;
let str = "A string walks into a bar. Blah blah. BLAH BLAH BLAH";
let s = ".";
let segments = [];
 let x = 0;
  let y = 0;

function setup() { 
  createCanvas(400, 400);
  
  //seperates String by word
  // segments = splitTokens(str);
  

  //load strings from file
  //load strings can break things on the line
  // segments = loadStrings("text.txt", function(){
  //   console.log(segments);
  // });

  //separates String by sentence. (every time it sees a period).
  segments = trim(str.split("."));
  
}


function draw() { 
  background(220);
  // text (segments, 100,100);
 
  for (let i =0; i < segments.length; i++){
    y += textAscent(segments[i]) + textDescent(segments[i]);
    text(segments[i], x,y);
    textSize(i * 10);
    x += textWidth(segments[i]);


  }
}let a;
let b;
let str;
function setup() { 
  createCanvas(400, 400);
} 

function sum(a,b){
 let c = a+b;
 str = a + "+" + b + "=" + c;
 return str;

}

function draw() { 
  background(220);
  console.log(sum(8,4));
}var serial;
var latestData = "waiting for data"; // you'll use this to write incoming data to the canvas


function setup() { 
  createCanvas(600, 600);
  noFill();
  strokeWeight(10);
  
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem71");
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
    background(127, 0, 127);

  // fill(0, 0, 0);
  //var mappedVar = map(latestData, 490,540,0,width);
  var mappedVar = map(latestData, 0, 600, 0, width);
  // ellipse(mappedVar, 100, 50, 50);
  text(latestData, 10, 10);
  print(latestData);

  
  
  var v = mappedVar; 
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
/*Tamagotchi Love */

let serial; // variable to hold an instance of the serialport library
let portName = '/dev/cu.usbmodem76'; // fill in your serial port name here
let fromSerial = 0;
let tama;
let y = 0;
let yspeed = 2;
let state = "grumpy";
let feed = false;


function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);
  frameRate(30);
  textSize(20);

  tama = new Tamagotchi();

  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event

  serial.list(); // list the serial ports
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing

  serial.list(); // list the serial ports
  serial.open(portName); // open a serial port
}




// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    print(i + " " + portList[i]);
  }
}

function serverConnected() {
  print('connected to server.');
}

function portOpen() {
  print('the serial port opened.')
}




/*========================================
Write here!
This code will be executed when
something is received.
========================================*/

function serialEvent() {
  let stringFromSerial = serial.readLine();
  if (stringFromSerial.length > 0) {
    let trimmedString = trim(stringFromSerial);
    fromSerial = Number(trimmedString);

  }
  if (stringFromSerial.length == 1000) {
    pressed = true;
  }


}

function mousePressed(){
  feed = true; 
  tama.eat();
}
/*========================================
Tamagotchi code:
========================================*/
function draw() {

  background(255);
  text(fromSerial, width - 75, 50);
  tama.exist();
  // text(frameCount, width/2, height/2);
  text(str(state), 45, 50);

  push();
  textSize(14);
  textAlign(CENTER);
  fill(200);
  text("<---party zone--->", width * 0.5, height - 80);
  pop();

}

function mapSerial() {
  let mapSerial = map(fromSerial, 0, 679, 50, width - 100);
  return mapSerial;
}


class Tamagotchi {
  constructor() {
    this.s = 75;
    this.sprite1 = createImg('tamagotchi.gif');
    this.sprite2 = createImg('tamagotchi_happy.gif');

    this.sprite1.size(this.s, this.s);
    this.sprite2.size(this.s, this.s);
    this.sprite1.style('display', 'initial');
    this.sprite2.style('display', 'none');


  }



  normalTama() {
    this.sprite1.style('display', 'initial');
    this.sprite2.style('display', 'none');

    this.sprite1.position(mapSerial(), height / 2);


  }

  eat() {

    // ellipse(width/2,y,20,20);
    if (y < height / 2 + 40) {
      y += yspeed;
      push();
      stroke(0);
      strokeWeight(2);
      noFill();
      ellipse(mapSerial() + 25, y, 20, 20);
      pop();
      state = "yum";
    } else {
      feed = false;

    }


  }

  happyTama() {
    this.sprite1.style('display', 'none');
    this.sprite2.style('display', 'initial');

    this.sprite2.position(mapSerial(), height / 2);
  }

  exist() {
    if (fromSerial == 10000) {
      feed = true;
    }

    if (fromSerial > width * 0.5 && fromSerial < width && fromSerial != 10000) {
      state = "party!!!";
      this.happyTama();
    }

    if (fromSerial <= width * 0.5 || fromSerial >= width && fromSerial != 10000) {
      this.normalTama();
      state = "hungry";
    }




    if (feed == true) {
      this.eat();
    }

    print(feed);

  }
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}let div;
let cat;
function setup() { 

createCanvas(800, 800);

} 

function draw() { 
  background(255);
}

let div;
let cat;
function setup() { 

  canvas= createCanvas(800, 800);
  
  div = createDiv('');
  div.position(80,30);
  div.size('400','400');
  div.style('background','#eee');
  div.style('border','10px solid black');
  
  img = createImg('cat.jpg');
  img.size('100','80');
  img.position(500,100);
  
  p = createP('Text goes in here! <a href="">Check this out!</a>');
  p.position(500,40);
} 

function draw() { 
  background(255);
}

function red(){
  div.style('background','red');
  
}

function mousePressed(){
 red(); 
}let img;
function setup() { 
  createCanvas(1280, 780);
  img = loadImage("nytimes.png");
} 

function draw() { 
  background(220);
    image(img, 0, 0, width, height);

}


let div;
let h1;
let p;
let squiggle;
let x, y;
let img;
let thing;
let nav;
let positions = [];
let buttonX = 30;
let buttonY = 40;

function setup() {
  imageMode(CENTER);
  img = loadImage("sheep.png"); // Load the image


  div = createDiv(['']);
  squiggle = createP(['〰〰〰〰〰〰']);
  h1 = createElement('h2', 'Kathy Wu is currently thinking about compassionate + computational thinking at <a href="tisch.nyu.edu/itp">ITP</a>.<br><br>Previously designing things <a href="https://www.ibm.com/design/language/">here</a> and <a href="http://www.ideocolab.com/">here</a>. Constantly curious about poetics, cultures, play. Say hello! 👋');

  p = createP(['<p>Click around to draw sheep.</p>']);
 
  squiggle.parent(div);
  h1.parent(div);
  p.parent(div);
  createCanvas(windowWidth, windowHeight);


  //this is so non-descript lol
  //this is the bouncing color ball
  thing = new Thing();

  background(255, 255, 255, 0);

  buttons();

}

function buttons() {
  // nav = createElement('div class=".nav"', '');

  bg = createButton(['<a class = "plain">?</a>'])
  bg.position(buttonX, buttonY);
  bg.mousePressed(resetBg);

  blog = createButton(['<a class = "plain" href= "http://kaaaaathy.wordpress.com">blog</a>'])
  blog.position(buttonX + 40, buttonY);

  portfolio = createButton(['<a class = "plain" href = "http://kaaathy.com/Kathy-Wu-Portfolio-2017.pdf">portfolio</a>']);
  portfolio.position(buttonX + 95, buttonY);

  email = createButton(['<a class= "plain" href="mailto:kwmakes@gmail.com">e-mail</a>']);
  email.position(buttonX + 172, buttonY);

  // bg.parent(nav);
  // blog.parent(nav);
  // portfolio.parent(nav);
  // email.parent(nav);
}


function resetBg() {
  background(255, 232, 66);
}



function draw() {
  noStroke();
  thing.exist();
}

function mouseFun() {
  positions.push({
    x: mouseX,
    y: mouseY
  });

  if (positions.length > 20) {
    positions.shift();
  }

  for (let i = 0; i < positions.length; i++) {
    let x = positions[i].x;
    let y = positions[i].y;
    noStroke();
    image(img, mouseX, mouseY, 40, 40);
  }

}


function mousePressed() {
  image(img, mouseX, mouseY, 40, 40);
}

class Thing {

  constructor() {
    this.d = 300;

    this.x = random(this.d / 2, width - this.d / 2);
    this.y = random(this.d / 2, height - this.d / 2);
    this.speedY = 2;
    this.speedX = 1.5;

    this.r = random(255);
    this.g = random(255);
    this.b = random(255);

    this.speedR = -0.5;
    this.speedG = 0.5;
    this.speedB = 0.2;
    this.c = color(this.r, this.g, this.b, 10);

  }


  exist() {
    fill(this.c);
    // stroke(255);
    ellipse(this.x, this.y, this.d, this.d);
    this.move();
    this.bounce();
    this.colorFun();

    // this.sizeChange();
  }


  move() {
    this.x += this.speedX;
    this.y += this.speedY;
  }


  bounce() {
    if (this.x > width - this.d / 2 || this.x < 0 + this.d / 2) {
      this.speedX *= -1;
    }

    if (this.y > height - this.d / 2 || this.y < 0 + this.d / 2) {
      this.speedY *= -1;
    }
  }

  colorFun() {

    //argh! redundant code!

    this.speedR = this.bounceColor(this.r, this.speedR);
    this.speedG = this.bounceColor(this.g, this.speedG);
    this.speedB = this.bounceColor(this.b, this.speedB);

    this.r = this.moveColor(this.r, this.speedR);
    this.g = this.moveColor(this.g, this.speedG);
    this.b = this.moveColor(this.b, this.speedB);

    this.c = color(this.r, this.g, this.b, 80);
    fill(this.c);


  }

  moveColor(rgb, speedRGB) {
    rgb += speedRGB;
    return (rgb);
  }

  bounceColor(rgb, speedRGB) {

    if (rgb >= 255 || rgb <= 0) {
      speedRGB *= -1;
    }
    return speedRGB;

  }

  //   sizeChange(){ 
  //     while(this.d < 500){
  //     this.d += mouseY/1000;
  //     }
  //     }



}var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411'; // fill in your serial port name here
var fromSerial = 0;


function setup() {
  createCanvas(400,400);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event

  serial.list(); // list the serial ports
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing

  serial.list(); // list the serial ports
  serial.open(portName); // open a serial port
}

function draw(){
	background(255);
  text(fromSerial, 100,100);
}


// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    print(i + " " + portList[i]);
  }
}

function serverConnected() {
  print('connected to server.');
}
 
function portOpen() {
  print('the serial port opened.')
}
 
/*========================================
Write here!
This code will be executed when
something is received.
========================================*/

function serialEvent() {
  let stringFromSerial = serial.readLine();
  if (stringFromSerial.length>0){
    var trimmedString = trim(stringFromSerial);
    fromSerial = Number(trimmedString);
    
  }
}
 
function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  print('The serial port closed.');
}
function setup() { 
  createCanvas(300, 300);
} 

function draw() { 
  background(220);
}
// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for this video: https://youtu.be/flQgnCUxHlw

var r = 4;
var k = 30;
var grid = [];
var w = r / Math.sqrt(2);
var active = [];
var cols, rows;
var ordered = [];

function setup() {
  createCanvas(400, 400);
  background(0);
  strokeWeight(4);
  colorMode(HSB);

  // STEP 0
  cols = floor(width / w);
  rows = floor(height / w);
  for (var i = 0; i < cols * rows; i++) {
    grid[i] = undefined;
  }

  // STEP 1
  var x = width / 2;
  var y = height / 2;
  var i = floor(x / w);
  var j = floor(y / w);
  var pos = createVector(x, y);
  grid[i + j * cols] = pos;
  active.push(pos);
  //frameRate(1);
}

function draw() {
  background(0);
  //noLoop();

  for (var total = 0; total < 25; total++) {
    if (active.length > 0) {
      var randIndex = floor(random(active.length));
      var pos = active[randIndex];
      var found = false;
      for (var n = 0; n < k; n++) {
        var sample = p5.Vector.random2D();
        var m = random(r, 2 * r);
        sample.setMag(m);
        sample.add(pos);

        var col = floor(sample.x / w);
        var row = floor(sample.y / w);

        if (col > -1 && row > -1 && col < cols && row < rows && !grid[col + row * cols]) {
          var ok = true;
          for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
              var index = (col + i) + (row + j) * cols;
              var neighbor = grid[index];
              if (neighbor) {
                var d = p5.Vector.dist(sample, neighbor);
                if (d < r) {
                  ok = false;
                }
              }
            }
          }
          if (ok) {
            found = true;
            grid[col + row * cols] = sample;
            active.push(sample);
            ordered.push(sample);
            // Should we break?
            break;
          }
        }
      }

      if (!found) {
        active.splice(randIndex, 1);
      }

    }
  }

  for (var i = 0; i < ordered.length; i++) {
    if (ordered[i]) {
      stroke(i % 360, 100, 100);
      strokeWeight(r * 0.5);
      point(ordered[i].x, ordered[i].y);
    }
  }

  // for (var i = 0; i < active.length; i++) {
  //   stroke(255, 0, 255);
  //   strokeWeight(1);
  //   point(active[i].x, active[i].y);
  // }
  //console.log(active.length);
}
© 2017 GitHub, Inc.
Terms
Privacy
Security
Status
Help
Contact GitHub
API
Training
Shop
Blog
About
var r = 4;
var k = 30;
var grid = [];
var w = r / Math.sqrt(2);
var active = [];
var cols, rows;
var ordered = [];

function setup() {
  createCanvas(400, 400);
  background(0);
  strokeWeight(4);
  colorMode(HSB);

  // STEP 0
  cols = floor(width / w);
  rows = floor(height / w);
  for (var i = 0; i < cols * rows; i++) {
    grid[i] = undefined;
  }

  // STEP 1
  var x = width / 2;
  var y = height / 2;
  var i = floor(x / w);
  var j = floor(y / w);
  var pos = createVector(x, y);
  grid[i + j * cols] = pos;
  active.push(pos);
  //frameRate(1);
}

function draw() {
  background(0);
  //noLoop();

  for (var total = 0; total < 25; total++) {
    if (active.length > 0) {
      var randIndex = floor(random(active.length));
      var pos = active[randIndex];
      var found = false;
      for (var n = 0; n < k; n++) {
        var sample = p5.Vector.random2D();
        var m = random(r, 2 * r);
        sample.setMag(m);
        sample.add(pos);

        var col = floor(sample.x / w);
        var row = floor(sample.y / w);

        if (col > -1 && row > -1 && col < cols && row < rows && !grid[col + row * cols]) {
          var ok = true;
          for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
              var index = (col + i) + (row + j) * cols;
              var neighbor = grid[index];
              if (neighbor) {
                var d = p5.Vector.dist(sample, neighbor);
                if (d < r) {
                  ok = false;
                }
              }
            }
          }
          if (ok) {
            found = true;
            grid[col + row * cols] = sample;
            active.push(sample);
            ordered.push(sample);
            // Should we break?
            break;
          }
        }
      }

      if (!found) {
        active.splice(randIndex, 1);
      }

    }
  }

  for (var i = 0; i < ordered.length; i++) {
    if (ordered[i]) {
      stroke(i % 360, 100, 100);
      strokeWeight(r * 0.5);
      point(ordered[i].x, ordered[i].y);
    }
  }

  // for (var i = 0; i < active.length; i++) {
  //   stroke(255, 0, 255);
  //   strokeWeight(1);
  //   point(active[i].x, active[i].y);
  // }
  //console.log(active.length);
}
let r = 10;
let k = 30;
let grid = [];
let active = [];
let ordered = [];

let w = r / Math.sqrt(2);

let cols, rows;


let positions = []

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  rectMode(CENTER);
  bg = color(220);

  cols = floor(width / w);
  rows = floor(height / w);
  for (let i = 0; i < cols * rows; i++) {
    grid[i] = -1;
  }


  var x = width/2;
  var y = height/2;
  let i = floor(x / w);
  let j = floor(y / w);
  let pos = createVector(x, y);
  grid[i + j * cols] = pos;

  active.push(pos);


}

function draw() {
  background(220);

  for(let total = 0; total <25; total ++){
  if (active.length > 0) {
    let randIndex = floor(random(active.length));
    let pos = active[randIndex];
    let found = false;

    for (let n = 0; n < k; n++) {
      let sample = p5.Vector.random2D();
      let m = random(r, 2 * r);
      sample.setMag(m);
      sample.add(pos);

      let col = floor(sample.x / w);
      let row = floor(sample.y / w);

      if(col > -1 && row > -1 && col < cols && row < rows && !grid[col + row * cols]){
      var ok = true;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          let index = (col + i) + (row + j) * cols;
          let neighbor = grid[i + j * cols];
          if (neighbor) {
            let d = p5.Vector.dist(sample, neighbor);
            if (d < r) {
              ok = false;
            }
          }
        }
      }
     
    if (ok) {
      found = true;
      grid[col + row * cols] = sample;
      active.push(sample);
      ordered.push(sample);
      // break;
    }
  }
  }

    if (!found) {
      active.splice(randIndex, 1);
    }
  }
  }

    for (let i = 0; i < ordered.length; i++) {
      if (ordered[i] != -1) {
        strokeWeight(4);
        stroke(255, 0, 0);
        point(ordered[i].x, ordered[i].y);
      }
    }

    for (let i = 0; i < active.length; i++) {
      strokeWeight(4);
      stroke(255, 0, 0);
      point(active[i].x, active[i].y);

    }
  }
let x, y;
let guns = []
let howGreen = 0;
let bg;
guns.length = 25;

let r = 10;
let k = 30;
let grid = [];
let active = [];
let w = r / Math.sqrt(2);

let cols, rows;


let positions = []

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  rectMode(CENTER);
  bg = color(220);

  cols = floor(width / w);
  rows = floor(height / w);
  for (let i = 0; i < cols * rows; i++) {
    grid[i] = -1;
  }


  let x = random(width);
  let y = random(height);
  let i = floor(x / w);
  let j = floor(y / w);
  let pos = createVector(x, y);
  grid[i + j * cols] = pos;

  active.push(pos);
}

function draw() {
  background(220);

  if (active.length > 0) {
    let randIndex = floor(random(active.length));
    let pos = active[r];
    let found = false;
    
    for (let n = 0; n < k; n++) {
      let sample = p5.Vector.random2D();
      let m = random(r, 2 * r);
      sample.setMag(m);
      sample.add(pos);

      let col = floor(sample.x / w);
      let row = floor(sample.y / w);

      let ok = true;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          let index = (col + i) + (row + j) * cols;
          let neighbor = grid[i + j * cols];
          if (neighbor != -1) {
            let d = p5.Vector.dist(sample, neighbor);
/*This sketch was inspired by the poem,
THE OPPOSITE GAME, by Brendan Constantine. */


//color change variables
let howGreen = 0;
let bg;

//store gun objects & values
let x, y;
let guns = []
guns.length = 20;

//for mouse movement
let positions = []




/*============
SETUP FUNCTION
=============*/
function setup() {

  createCanvas(600, 600);
  angleMode(DEGREES);
  rectMode(CENTER);

  //define bg color for rectangle (not background element)
  bg = color(220);

  //initialize # of guns
  for (let i = 0; i < guns.length; i++) {
    guns[i] = new gun(floor(random(3, 18)) * 30, floor(random(3, 11)) * 50);
  }
}

/*============
DRAW FUNCTION
=============*/

function draw() {
  background(220);

  //this overlays a color-changing rectangle onto the canvas
  bgHack();
  
  //this draws both guns and non-guns
  drawAll();
  
  //this changes the bg color when there are no more guns onscreen
  greenify();
  
  //this controls the text
  poem();

  //this countrols the cursor spotlight
  mouseLight();

}



/*================
BG COLOR FUNCTIONS
================*/

//this rectangle overlays on TOP of the background.
//hacky but works lol
function bgHack() {
  
  push();
  fill(bg);
  rect(width / 2, height / 2, width, height);
  pop();
  
}

//this slowly changes the background
//if there # of notGuns exceeds # of guns
function greenify() {
  
  for (let i = 0; i < guns.length; i++) {
    if (guns[i].isGun()) {
      howGreen--;
    } else {
      howGreen += 1.5;
    }
  }
  
  //howGreen is a co-efficient of alpha opacity
  bg = color(135, 215, 120, howGreen * .05);
}


/*===================
DRAW OBJECT FUNCTIONS
===================*/

//picks a random number (used to choose a non-Gun object)
function pickRandom() {
  return floor(random(1, 5));
}


//this checks if the gun has been turned into a notGun
//if it is not a gun, draw a notGun
function drawAll() {

  for (let i = 0; i < guns.length; i++) {
    if (guns[i].isGun() == true) {
      guns[i].drawGun();
    } else if (guns[i].isGun() == false) {
      guns[i].drawNotGun();
    }
  }
}

/*============
MOUSE FUNCTIONS
=============*/

//this code controls the cursor spotlight
function mouseLight() {

  positions.push({
    x: mouseX,
    y: mouseY
  });

  if (positions.length > 20) {
    positions.shift();
  }

  for (let i = 0; i < positions.length; i++) {
    let x = positions[i].x;
    let y = positions[i].y;
    fill(255, 255, 255, i / 2);
    noStroke();
    ellipse(x + random(-2, 2), y + random(-2, 2), 36, 36);
  }
}
 

//this function tells me if the mouse is on the gun object
//if it is, and I click, then reassign that object as a non-Gun object
 function mouseCheck() {
 
  for (let i = 0; i < guns.length; i++) {
    print(guns[i].checkMouse());

    if (guns[i].checkMouse()) {
      guns[i] = new notGun(guns[i].x, guns[i].y, pickRandom());
      guns[i].drawNotGun();
    }
  }
}

//run check when pressed
function mousePressed() {
  mouseCheck();
}


/*============
POEM FUNCTION
=============*/

//render text from the original poem
function poem() {
  
  fill(0);
  textSize(16);
  textAlign(CENTER);
  text("The opposite of a gun is wherever you point it.", width / 2, 50);
  text("~Your death will sit through many empty poems.~", width / 2, 80);
}let x, y;
let guns = []
let howGreen = 0;
let bg;
guns.length = 25;

let r = 10;
let k = 30;
let grid = [];
let active = [];
let w = r / Math.sqrt(2);

let cols, rows;


let positions = []

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  rectMode(CENTER);
  bg = color(220);

  cols = floor(width / w);
  rows = floor(height / w);
  for (let i = 0; i < cols * rows; i++) {
    grid[i] = -1;
  }


  let x = random(width);
  let y = random(height);
  let i = floor(x / w);
  let j = floor(y / w);
  let pos = createVector(x, y);
  grid[i + j * cols] = pos;

  active.push(pos);


  // for (let i = 0; i < guns.length; i++) {
  //   guns[i] = new gun(random(width), random(height));
  // }
}

function draw() {
  background(220);

  if (active.length > 0) {
    let randIndex = floor(random(active.length));
    let pos = active[r];
    let found = false;
    
    for (let n = 0; n < k; n++) {
      let sample = p5.Vector.random2D();
      let m = random(r, 2 * r);
      sample.setMag(m);
      sample.add(pos);

      let col = floor(sample.x / w);
      let row = floor(sample.y / w);

      let ok = true;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          let index = (col + i) + (row + j) * cols;
          let neighbor = grid[i + j * cols];
          if (neighbor != -1) {
            let d = p5.Vector.dist(sample, neighbor);
            if (d < r) {
              ok = false;
            }
          }
        }
      }

    }

    if (ok) {
      found=true;
      grid[col + row * cols] = sample;
      active.push(sample);
    }

    if (!found){
      active.splice(randIndex,1);
    }

    for (let i = 0; i < grid.length; i++) {
      //drawing
      if (grid[i] != -1) {
        strokeWeight(4);
        stroke(255,0,0);
        point(grid[i].x, grid[i].y);
      }
    }
    
    for (let i = 0; i < active.length; i++) {
      strokeWeight(4);
      stroke(255,0,0);
      point(active[i].x, active[i].y);

    }
  }



  push();
  fill(bg);
  rect(width / 2, height / 2, width, height);
  pop();

  drawAll();
  greenify();
  poem();

  mouseLight();

}

/*===========*/

function greenify() {
  for (let i = 0; i < guns.length; i++) {
    if (guns[i].isGun()) {
      howGreen--;
    } else {
      howGreen += 1.25;
    }
  }
  bg = color(135, 215, 120, howGreen * .05);
}

function mouseLight() {
  positions.push({
    x: mouseX,
    y: mouseY
  });

  if (positions.length > 20) {
    positions.shift();
  }

  for (let i = 0; i < positions.length; i++) {
    let x = positions[i].x;
    let y = positions[i].y;
    fill(255, 255, 255, i / 2);
    noStroke();
    ellipse(x + random(-2, 2), y + random(-2, 2), 36, 36);

  }
}

function drawAll() {

  for (let i = 0; i < guns.length; i++) {
    if (guns[i].isGun() == true) {
      guns[i].drawGun();
    } else if (guns[i].isGun() == false) {
      guns[i].drawNotGun();
    }
  }
}


function pickRandom() {
  return floor(random(1, 5));
}

function mousePressed() {
  mouseCheck();
}

function mouseCheck() {
  for (let i = 0; i < guns.length; i++) {
    print(guns[i].checkMouse());

    if (guns[i].checkMouse()) {
      guns[i] = new notGun(guns[i].x, guns[i].y, pickRandom());
      guns[i].drawNotGun();
    }
  }
}

function poem() {
  fill(0);
  textSize(16);
  textAlign(CENTER);
  text("The opposite of a gun is wherever you point it.", width / 2, 50);
  text("~Your death will sit through many empty poems.~", width / 2, 80);
}

class gun {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.col = color(0);
    this.randomRotate = random(-2, 2);
  }

  isGun() {
    return true;
  }

  drawGun() {
    push();
    rotate(this.randomRotate);
    fill(this.col);
    rect(this.x, this.y, 36, 8);

    //draw handle
    push();
    translate(this.x - 12, this.y + 8);
    rotate(15);
    rect(0, 0, 11, 18);
    pop();

    //draw trigger
    push();
    stroke(this.col);
    strokeWeight(2);
    noFill();
    arc(this.x - 7, this.y + 1, 18, 18, 0, 80);
    pop();
    pop();

  }

  checkMouse() {
    let check = dist(this.x, this.y, mouseX, mouseY);
    if (check < 30) {
      return true;
    } else {
      return false;
    }


  }
}

class notGun {
  constructor(x, y, what) {
    this.x = x;
    this.y = y;
    this.col = color(0);
    this.d = 12;
    this.d2 = 30;
    this.petalOffset = 4;
    this.what = what;
  }

  isGun() {
    return false;
  }


  drawNotGun() {
    switch (this.what) {
      case 1:
        this.drawFlower();
        break;

      case 2:
        this.drawBook();
        break;

      case 3:
        this.drawTree();
        break;

      case 4:
        this.drawTree2();
        break;

      default:
        this.drawFlower();
    }
  }


  drawFlower() {
    push();
    noFill();
    arc(this.x, this.y + 44, 20, 8, 180, 0);

    noStroke();
    fill(0, 153, 51);
    rect(this.x, this.y + 20, 2, 40);
    arc(this.x + 15, this.y + 30, 30, 20, 180, 270);
    this.drawPetals();

    pop();
  }

  drawPetals() {
    stroke(0);

    fill(255);
    ellipse(this.x - this.petalOffset, this.y - 2 * this.petalOffset, this.d, this.d);
    ellipse(this.x + this.petalOffset, this.y - 2 * this.petalOffset, this.d, this.d);
    ellipse(this.x - this.petalOffset, this.y + 2 * this.petalOffset, this.d, this.d);
    ellipse(this.x + this.petalOffset, this.y + 2 * this.petalOffset, this.d, this.d);
    ellipse(this.x - 10, this.y, this.d, this.d);
    ellipse(this.x + 10, this.y, this.d, this.d);

    fill(255, 255, 0);
    ellipse(this.x, this.y, this.d, this.d);
  }

  drawTree() {
    push();
    translate(0, -20);

    this.drawTrunk();

    translate(0, 15);
    noStroke();
    fill(0, 153, 51);

    ellipse(this.x, this.y, this.d2, this.d2);
    ellipse(this.x - 12, this.y + 10, this.d2, this.d2);
    ellipse(this.x + 12, this.y + 10, this.d2, this.d2);
    ellipse(this.x - 8, this.y + 20, this.d2, this.d2);
    ellipse(this.x + 8, this.y + 20, this.d2, this.d2);
    pop();
  }

  drawTree2() {
    push();
    translate(0, -30);

    this.drawTrunk();
    translate(0, -20);
    noStroke();
    fill(0, 153, 51);

    for (let i = 45; i > 0; i -= 15) {
      triangle(this.x, this.y + i, this.x - 25, this.y + 35 + i, this.x + 25, this.y + 35 + i);
    }
    pop();
  }

  drawTrunk() {
    push();
    fill(51, 51, 0);
    rect(this.x, this.y + 50, 10, 50);
    noFill();
    arc(this.x, this.y + 80, 35, 10, 180, 0);
    pop();
  }


  drawBook() {
    push();
    translate(0, 10);
    fill(0, 102, 255);
    noStroke();
    rect(this.x, this.y + 3, 58, 38);
    fill(255);
    stroke(0);
    rect(this.x - 13, this.y, 26, 36, 2);
    rect(this.x + 13, this.y, 26, 36, 2);
    this.drawText();
    pop();
  }

  drawText() {

    for (let i = -12; i < 16; i += 4) {
      line(this.x - 21, this.y + i, this.x - 4, this.y + i);
      line(this.x + 4, this.y + i, this.x + 21, this.y + i);
    }

  }

  checkMouse() {
    // let check = dist(this.x, this.y, mouseX, mouseY);
    // if (check < 30) {
    //   return true;
    // } else {
    //   return false;
    // }





  }
}let x, y;
let randomDraw = 0;
let notGun;
let gun;
let guns = []
guns.length = 10;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  rectMode(CENTER);
  for (let i = 0; i < guns.length; i++) {
    guns[i] = new sprite(random(100, width - 100), random(150, height - 80));
  }

  gun = new sprite(width / 2, height / 2);


}

function draw() {
  background(220);
  for (let i = 0; i < guns.length; i++) {
    guns[i].drawGun();
    // print(guns[i].x);
    // print(guns[i].y);
    // print(i);
  }

  poem();
}

function mousePressed(){
   for (let i = 0; i < guns.length; i++) {
    print(guns[i].checkMouse());
    
    if (guns[i].checkMouse()){
        guns[i].drawNotGun();
    }  
      
   }
}

function poem() {
  textSize(20);
  textAlign(CENTER);
  text("The opposite of a gun is wherever you point it.", width / 2, 70);
  text("Your death will sit through many empty poems.", width / 2, 100);
}

class sprite {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.col = color(0);
    this.d = 12;
    this.d2 = 35;
    this.petalOffset = 4;
    randomDraw = this.pickRandom();
    this.randomRotate = floor(random(-2, 2));
    this.isMouse = false;
  }

  drawGun() {
    push();
    rotate(this.randomRotate);
    fill(this.col);
    rect(this.x, this.y, 40, 10);

    //draw handle
    push();
    translate(this.x - 16, this.y + 10);
    rotate(15);
    rect(0, 0, 12, 20);
    pop();

    //draw trigger
    push();
    stroke(this.col);
    strokeWeight(2);
    noFill();
    arc(this.x - 10, this.y + 2, 20, 20, 0, 80);
    pop();
    pop();

  }

  pickRandom() {
    return floor(random(1, 5));
  }

  drawNotGun() {
    switch (randomDraw) {
      case 1:
        this.drawFlower();
        break;

      case 2:
        this.drawBook();
        break;

      case 3:
        this.drawTree();
        break;

      case 4:
        this.drawTree2();
        break;

      default:
        this.drawGun();
    }
  }

  checkMouse() {
    let check = dist(this.x, this.y, mouseX, mouseY);
    if (check < 100) {
      return true;
    } else {
      return false;
    }

  }
  drawFlower() {
    push();
    noFill();
    arc(this.x, this.y + 44, 20, 8, 180, 0);

    noStroke();
    fill(0, 153, 51);
    rect(this.x, this.y + 20, 2, 40);
    arc(this.x + 15, this.y + 30, 30, 20, 180, 270);
    this.drawPetals();

    pop();
  }

  drawPetals() {
    stroke(0);

    fill(255);
    ellipse(this.x - this.petalOffset, this.y - 2 * this.petalOffset, this.d, this.d);
    ellipse(this.x + this.petalOffset, this.y - 2 * this.petalOffset, this.d, this.d);
    ellipse(this.x - this.petalOffset, this.y + 2 * this.petalOffset, this.d, this.d);
    ellipse(this.x + this.petalOffset, this.y + 2 * this.petalOffset, this.d, this.d);
    ellipse(this.x - 10, this.y, this.d, this.d);
    ellipse(this.x + 10, this.y, this.d, this.d);

    fill(255, 255, 0);
    ellipse(this.x, this.y, this.d, this.d);
  }

  drawTree() {
    this.drawTrunk();


    push();
    translate(0, 5);
    noStroke();
    fill(0, 153, 51);

    ellipse(this.x, this.y, 40, 40);
    ellipse(this.x - 15, this.y + 10, this.d2, this.d2);
    ellipse(this.x + 15, this.y + 10, this.d2, this.d2);
    ellipse(this.x - 10, this.y + 20, this.d2, this.d2);
    ellipse(this.x + 10, this.y + 20, this.d2, this.d2);
    pop();
  }

  drawTree2() {
    this.drawTrunk();
    push();
    translate(0, -20);
    noStroke();
    fill(0, 153, 51);

    for (let i = 45; i > 0; i -= 15) {
      triangle(this.x, this.y + i, this.x - 25, this.y + 35 + i, this.x + 25, this.y + 35 + i);
    }
    pop();
  }

  drawTrunk() {
    push();
    fill(51, 51, 0);
    rect(this.x, this.y + 50, 10, 50);
    fill(220);
    arc(this.x, this.y + 80, 35, 10, 180, 0);
    pop();
  }


  drawBook() {
    push();
    fill(0, 102, 255);
    noStroke();
    rect(this.x, this.y + 2, 65, 42);
    fill(255);
    stroke(0);
    rect(this.x - 15, this.y, 30, 40, 2);
    rect(this.x + 15, this.y, 30, 40, 2);
    this.drawText();
    pop();
  }

  drawText() {

    for (let i = -12; i < 16; i += 4) {
      line(this.x - 25, this.y + i, this.x - 5, this.y + i);
      line(this.x + 5, this.y + i, this.x + 25, this.y + i);
    }

  }







}let positions = [];
function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(220);
  
  positions.push({
    x: mouseX,
    y: mouseY
  });

  if (positions.length > 500) {
    positions.shift();
  }

  for (let i = 0; i < positions.length; i++) {
    let x = positions[i].x;
    let y = positions[i].y;
    fill(0);
    ellipse(x, y, i / 5, i / 5);

  }


}let ball;

function setup() {
  createCanvas(400, 400);
  ball = new Ball(width/2, height/2, 3, 2);
}

function draw() {
  background(220);
	


}


let balls = [];
balls.length = 800;

function setup() {
  createCanvas(800, 800);

  for (let i = 0; i < balls.length; i++) {
    balls[i] = new Ball(random(width), random(height));
  }

}

function draw() {
  background(220);


  for (let i = 0; i < balls.length; i++) {
    for (let j = 0; j < balls.length; j++) {
      if (balls[i].isNear(balls[j]) && j!=i) {
        balls[j].col = color(0, 255, 0);
      }
    }
    
    balls[i].display();
    balls[i].update();
    
    // if (balls[i].checkMouse()) {
    //   balls[i].col = color(255, 0, 0);
    // }
  }
}

function mousePressed() {
  for (let i = 0; i < balls.length; i++) {
    print(balls[i].checkMouse());

  }
}let x1 = 0;
let y1 = 0;

let x1speed = 3;
let y1speed = 4;

let x2 = 40;
let y2 = 100;

let x2speed = 5;
let y2speed = 2;


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  ellipse(x1, y1, 40, 40);
  ellipse(x2, y2, 40, 40);

  y1 += y1speed;
  x1 += x1speed;
  
  x1speed = bounce(x1, width, x1speed);
  y1speed = bounce(y1, height, y1speed);
  
  y2 += y2speed;
  x2 += x2speed;
  
  x2speed = bounce(x2, width, x2speed);
  y2speed = bounce(y2, height, y2speed);

  
  
/*ABOVE: I realize this isn't the most efficient way to do this!
However I kept struggling to rewrite this as a function. */
  
//   move(x1, y1, x1speed, y1speed);
//   move(x2, y2, x2speed, y2speed);
  

}


function bounce(xy, wh, speed) {

  if (xy < 0 || xy > wh ) {
    speed *= -1;
  }

  return (speed);

}


/*BELOW: Here is my move() function which did not work.
I debugged and could not fix. */

function move(x, y, xspeed, yspeed) {
  y += yspeed;
  x += xspeed;
}

//line drawing variables
//these change with every for() loop, incrementing by set amount
let x, y;

//variable for incrementing both perpendicular and diagonal lines
//this does not change
let offset1;

//variable for adding a diagonal line offset
//this does not change
let offset2;

//variables for defining quadrant bounds [see "setup()"]
//these do not change
let q1, q2, q3, q4;

//integer variable for pulling a random line out of a hat
//this changes every mouse-click
let r;


function setup() {
  createCanvas(700, 700);

  //make bg off-white
  background(250);

  //define offsets (defined here, because width variable is needed)
  offset1 = width / 70;
  offset2 = width / 50;

  //define start and end points for each quadrant [4]
  //these do not change
  q1 = {
    x1: 0,
    y1: 0,
    x2: width / 2,
    y2: height / 2,
  }

  q2 = {
    x1: width / 2,
    y1: 0,
    x2: width,
    y2: height / 2,
  }

  q3 = {
    x1: 0,
    y1: height / 2,
    x2: width / 2,
    y2: height,
  }

  q4 = {
    x1: width / 2,
    y1: height / 2,
    x2: width,
    y2: height,
  }

}


/*------
The draw function gradually erases
the background over time.
-------*/

function draw() {

  frameRate(60);

  strokeWeight(1.5);

  //opacity controls speed of fade
  background(250, 250, 250, 5);

	//this function resets the canvas if the "RETURN" key is pressed
  resetListener();
	
}

/*------
These functions look for the mouse location
so program knows where to draw
-------*/

function mousePressed() {
	//call findMouse() to tell me what quadrant my mouse is in
  let quadrant = findMouse();
  //draw lines when I click
  drawLines(quadrant.x1, quadrant.y1);
}

function findMouse() {
//see where the mouse is, returns a quadrant
  if (mouseX >= q1.x1 && mouseX <= q1.x2 && mouseY >= q1.y1 && mouseY <= q1.y2) {
    return (q1);
  }

  if (mouseX >= q2.x1 && mouseX <= q2.x2 && mouseY >= q2.y1 && mouseY <= q2.y2) {
    return (q2);
  }

  if (mouseX >= q3.x1 && mouseX <= q3.x2 && mouseY >= q3.y1 && mouseY <= q3.y2) {
    return (q3);
  }

  if (mouseX >= q4.x1 && mouseX <= q4.x2 && mouseY >= q4.y1 && mouseY <= q4.y2) {
    return (q4);
  }
}

/*------
This is the primary drawing function.
It takes two parameters from mouse input,
and draws lines in the corresponding quadrant
-------*/

function drawLines(x, y) {
//draw random lines that start in a specific quadrant's x1 and y1
  push();
  translate(x, y);
  randomLines();
  pop();
}


/*------
These functions are used to randomly determine
what lines should be drawn
-------*/

function randomNumber() {
//return a random integer between 1-5
  r = floor(random(1, 5));
  console.log(r);
  return(r);
}

function randomLines() {
//use randomNumber() to decide which lines to draw
  r = randomNumber();
  if (r==1){
    horizontal();
  }
  if (r==2){
    vertical();
  }
  if (r==3){
    diagonal1();
  }
  if (r==4){
    diagonal2();
  }
}

/*------
These line-drawing functions are all based off
of Q1 coordinates, in the top left corner
-------*/

function horizontal() {
//draw horizontal lines
  for (y = 0; y <= q1.y2; y += offset1) {
    line(q1.x1, y, q1.x2, y);
  }
}

function vertical() {
//draw vertical lines
  for (x = 0; x <= q1.x2; x += offset1) {
    line(x, 0, x, q1.y2);
  }
}

function diagonal1() {
//draw diagonal lines from top-left
  for (x = q1.x2; x >= 0 + offset2 && x <= q1.x2; x -= offset2) {
    for (y = q1.y1; y >= 0 && y <= q1.y2 - offset2; y += offset2) {
      line(x, y, x - offset2, y + offset2);
    }
  }
}

function diagonal2() {
//draw diagonal lines from top-right
  for (x = q1.x1; x >= q1.x1 && x <= q1.x2 - offset2; x += offset2) {
    for (y = q1.y1; y >= 0 && y <= q1.y2 - offset2; y += offset2) {
      line(x, y, x + offset2, y + offset2);
    }
  }
}

/*------
This function listens for a keypress every frame.
If the condition is met, the background clears
-------*/

function resetListener(){
  //clear the background when user hits "RETURN"
  if (keyIsPressed === true && keyCode === 13) {
    background(250);
  }
}
let x,
  y,
  circle;


//define color variables
let bg = {
  r: 240,
  g: 240,
  b: 144,
}

let pink = {
  r: 255,
  g: 182,
  b: 193
}

let green = {
  r: 178,
  g: 255,
  b: 178
}

let blue = {
  r: 176,
  g: 224,
  b: 230
}

let buttonX, buttonY, buttonW, buttonH;
let buttonBg = 0;
let buttonText = 255;

function setup() {
  createCanvas(500, 500);
  rectMode(CENTER);
  buttonX = width / 2;
  buttonY = height / 2;
  buttonW = 150;
  buttonH = 50;

}


function draw() {

  background(bg.r, bg.g, bg.b);


  //styling for INVERT button
  push();
  fill(buttonBg);
  rect(buttonX, buttonY, buttonW, buttonH, 5);
  fill(buttonText);
  textSize(20);
  textAlign(CENTER);
  text("night mode", buttonX, buttonY + 5);
  pop();


  noStroke();

  //if mouse is clicked on the first third of the width of the canvas
  //from the left, make the shape pink, if mouse is clicked on the second 
  //third, make the shape green, else make the shape blue
  if (x <= (width / 3)) {
    fill(pink.r, pink.g, pink.b);
  } else if (x <= ((width * 2) / 3)) {
    fill(green.r, green.g, green.b);
  } else {
    fill(blue.r, blue.g, blue.b);

  }

  //if circle is indicated, draw a circle, else draw a rectangle  
  if (circle == 1) {
    ellipse(x, y, 55, 55);
  } else {
    rect(x, y, 55, 55);
  }

  //animate the circle down from the point when the mouse was first
  //clicked until the end of the page is reached
  if (y <= height + (55 / 2)) {
    y++
  }
}

function mouseClicked() {
  x = mouseX;
  y = mouseY;

  //if mouse is clicked on the upper half of the canvas,
  //the shape will be a circle
  if (y >= (height / 2)) {
    circle = 1;
  } else {
    circle = 0;
  }

  //check to see if mouse is in button  
  if (x <= buttonX + buttonW / 2 && x >= buttonX - buttonW / 2) {
    if (y <= buttonY + buttonH / 2 && y >= buttonY - buttonH / 2) {
      
      //if so, invert all the colors in the invert function
      // smart inversion, does not work
      invert(pink.r, pink.g, pink.b);
      invert(blue.r, blue.g, blue.b);
      invert(green.r, green.g, green.b);
      
      let rgb1 = invert(pink.r, pink.g, pink.b); // rgb

      // fill(col1.r, col1.g, col1.b);
      // fill(invert(blue.r, blue.g, blue.b));
      // fill(invert(green.r, green.g, green.b));

    }
  }
}

/* 
this function was originally supposed to invert
every color argument more extensibly
somehow does not work
*/

function invert(R, G, B) {
  R = abs(255 - R);
  G = abs(255 - G);
  B = abs(255 - B);
  console.log(R +" " + G + " "+ B);
  let rgb = { r: R, g: G, b: B };
	return rgb;
}
let x = 0;
let y = 0;
let xspeed = 1;
let yspeed = 1.5;


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  //   if (x < 0 || x > width) {
  //   xspeed *= -1;
  // }

  // if (y < 0 || y > height) {
  //   yspeed *= -1;
  // }

  xspeed = bounce(x, width, xspeed);
  yspeed = bounce(y, height, yspeed);

  y += yspeed;
  x += xspeed;

  console.log(x);
  console.log(y);

  ellipse(x, y, 40, 40);

}


function bounce(xy, wh, speed) {

  if (xy < 0 || xy > wh) {
    speed *= -1;

  }

  return (speed);

}let numCol, numRow;
let colX, colY, colW, colH;
let rowX, rowY, rowW, rowH;
let cn;


function setup() { 
  createCanvas(400, 400);
  
  colX = 0;
  numCol = 10;
  colW = width/numCol;
  colH = height;
  
  rowY = 0;
  numRow = 5;
  rowH = height/numRow;
  rowW = width;

} 

function draw() { 
  background(220);
  
  stroke(0);
  noFill();
  //loop through rectangles
  for(let cn =0; cn < numCol; cn++){
    colX = colW * cn;
    colY = 0;
    rect(colX, colY, colW, colH);
  }
  
  for(let rn = 0; rn < numRow; rn++) {
    rowY = rowH * rn;
    rowX = 0;
    rect(rowX, rowY, rowW, rowH);
  }
  
  
}let x,
  y,
  circle;


//define color variables
let bg = {
  r: 240,
  g: 240,
  b: 144,
}

let pink = {
  r: 255,
  g: 182,
  b: 193
}

let green = {
  r: 178,
  g: 255,
  b: 178
}

let blue = {
  r: 176,
  g: 224,
  b: 230
}

let buttonX, buttonY, buttonW, buttonH;
let buttonBg = 0;
let buttonText = 255;

function setup() {
  createCanvas(500, 500);
  rectMode(CENTER);
  buttonX = width / 2;
  buttonY = height / 2;
  buttonW = 150;
  buttonH = 50;

}


function draw() {

  background(bg.r, bg.g, bg.b);


  //styling for INVERT button
  push();
  fill(buttonBg);
  rect(buttonX, buttonY, buttonW, buttonH, 5);
  fill(buttonText);
  textSize(20);
  textAlign(CENTER);
  text("night mode", buttonX, buttonY + 5);
  pop();


  noStroke();

  //if mouse is clicked on the first third of the width of the canvas
  //from the left, make the shape pink, if mouse is clicked on the second 
  //third, make the shape green, else make the shape blue
  if (x <= (width / 3)) {
    fill(pink.r, pink.g, pink.b);
  } else if (x <= ((width * 2) / 3)) {
    fill(green.r, green.g, green.b);
  } else {
    fill(blue.r, blue.g, blue.b);

  }

  //if circle is indicated, draw a circle, else draw a rectangle  
  if (circle == 1) {
    ellipse(x, y, 55, 55);
  } else {
    rect(x, y, 55, 55);
  }

  //animate the circle down from the point when the mouse was first
  //clicked until the end of the page is reached
  if (y <= height + (55 / 2)) {
    y++
  }
}

function mouseClicked() {
  x = mouseX;
  y = mouseY;

  //if mouse is clicked on the upper half of the canvas,
  //the shape will be a circle
  if (y >= (height / 2)) {
    circle = 1;
  } else {
    circle = 0;
  }

  //check to see if mouse is in button  
  if (x <= buttonX + buttonW / 2 && x >= buttonX - buttonW / 2) {
    if (y <= buttonY + buttonH / 2 && y >= buttonY - buttonH / 2) {
      
      //if so, invert all the colors in the invert function

			invert();
      console.log(blue.r + " " + blue.g + " " + blue.b);

      // smart inversion, does not work
      // invert(pink.r, pink.g, pink.b);
      // invert(blue.r, blue.g, blue.b);
      // invert(green.r, green.g, green.b);
    }
  }
}

/* 
this function was originally supposed to invert
every color argument more extensibly
somehow does not work
*/

// function invert(R, G, B) {
//   R = abs(255 - R);
//   G = abs(255 - G);
//   B = abs(255 - B);
//   console.log(R +" " + G + " "+ B);
// }

/*
this is a more dumb, manual invert function
which inverts each color value by value. but it works!
*/

function invert() {
  
//invert blue
  blue.r = abs(255 - blue.r);
  blue.g = abs(255 - blue.g);
  blue.b = abs(255 - blue.b);

//invert green
  green.r = abs(255 - green.r);
  green.g = abs(255 - green.g);
  green.b = abs(255 - green.b);

//invert pink
  pink.r = abs(255 - pink.r);
  pink.g = abs(255 - pink.g);
  pink.b = abs(255 - pink.b);
  bg.r = abs(255 - bg.r);
  bg.g = abs(255 - bg.g);
  bg.b = abs(255 - bg.b);

  buttonBg = abs(255 - buttonBg);
  buttonText = abs(255 - buttonText);
}//variables for line-drawing
let x, y;

//variable for diagonal line-drawing
let offset;

//variables for defining quadrant bounds [see "setup()"]
let q1, q2, q3, q4;


function setup() {
  createCanvas(700, 700);

  //make bg off-white
  background(250);

  //define offset
  offset = width/50;
  
  //define start and end points for each quadrant [4]
  //q1 values are re-used in "randomLines()"
  q1 = {
    x1: 0,
    y1: 0,
    x2: width / 2,
    y2: height / 2,
  }

  q2 = {
    x1: width / 2,
    y1: 0,
    x2: width,
    y2: height / 2,
  }

  q3 = {
    x1: 0,
    y1: height / 2,
    x2: width / 2,
    y2: height,
  }
  
  q4 = {
    x1: width / 2,
    y1: height / 2,
    x2: width,
    y2: height,
  }

}


function draw() {
/* loop the background to slowly erase */

  frameRate(60);

  strokeWeight(1);
  
  //opacity controls speed of fade
  background(250, 250, 250, 0);

  //clear the background when user hits "RETURN"
  if (keyIsPressed === true && keyCode === 13) {
      background(250);
  }


}

function mousePressed() {
/* define what happens when I click in each quadrant */
  
  //QUADRANT 1
  //first locate mouse: "Is it in this quadrant?"
  if (mouseX >= q1.x1 && mouseX <= q1.x2 && mouseY >= q1.y1 && mouseY <= q1.y2) {
    //if so, draw lines
    randomLines();
  }

  //QUADRANT 2
  //do the same as Q1 but translated to q2
  if (mouseX >= q2.x1 && mouseX <= q2.x2 && mouseY >= q2.y1 && mouseY <= q2.y2) {
    push();
    translate(q2.x1, q2.y1);
    randomLines();
    pop();
  }

  //QUADRANT 3
  if (mouseX >= q3.x1 && mouseX <= q3.x2 && mouseY >= q3.y1 && mouseY <= q3.y2) {
    push();
    translate(q3.x1, q3.y1);
    randomLines();
    pop();
  }

  //QUADRANT 4
  if (mouseX >= q4.x1 && mouseX <= q4.x2 && mouseY >= q4.y1 && mouseY <= q4.y2) {
    push();
    translate(q4.x1, q4.y1);
    randomLines();
    pop();
  }
}

function randomLines() {
/*
create lines based on random number 
[based on values for q1]
*/

  //generate random number
  let r = floor(random(1, 5));
  console.log(r);
  
	//draw various lines depending on r
  
	if (r == 1) {
    //draw vertical lines
    for (x = 0; x <= q1.x2; x += 10) {
      line(x, 0, x, q1.y2);
    }
  }

  if (r == 2) {
    //draw horizontal lines
    for (y = 0; y <= q1.y2; y += 10) {
      line(q1.x1, y, q1.x2, y);
    }
  }

  if (r == 3) {
    //draw diagonal lines from top-right
    for (x = q1.x2; x >= 0+offset && x <= q1.x2; x -= offset) {
      for (y = q1.y1; y >= 0 && y <= q1.y2 - offset; y += offset) {
        line(x, y, x - offset, y + offset);
      }
    }
  }

  if (r == 4) {
    //draw diagonal lines from top-left
    for (x = q1.x1; x >= q1.x1 && x <= q1.x2 - offset; x += offset) {
      for (y = q1.y1; y >= 0 && y <= q1.y2 - offset; y += offset) {
        line(x, y, x + offset, y + offset);
      }
    }
  }
}//variables for line-drawing
let x, y;

//variable for diagonal line-drawing
let offset = 15;

//variables for defining quadrant bounds (see SETUP)
let w, h;
let q1, q2, q3, q4;


function setup() {
  createCanvas(700, 700);

  //make bg off-white
  background(250);

  //define shorthand for width & height of a quadrant
  w = width / 2;
  h = height / 2;

  //define start and end points for each quadrant (4)

  q1 = {
    x1: 0,
    y1: 0,
    x2: width / 2,
    y2: height / 2,
  }

  q2 = {
    x1: width / 2,
    y1: 0,
    x2: width,
    y2: height / 2,
  }

  q3 = {
    x1: 0,
    y1: height / 2,
    x2: width / 2,
    y2: height,

  }
  q4 = {
    x1: width / 2,
    y1: height / 2,
    x2: width,
    y2: height,
  }

}


function draw() {

  //set bg opacity
  //which controls speed of fade
  let c = color(250, 250, 250, 5);
  background(c);
  frameRate(30);

  strokeWeight(1.5);

}

function mousePressed() {

  //QUADRANT 1

  //locate mouse, hover interaction
  if (mouseX >= q1.x1 && mouseX <= q1.x2 && mouseY >= q1.y1 && mouseY <= q1.y2) {

    //draw vertical lines
    for (x = 0; x <= width / 2; x += 10) {
      line(x, 0, x, height / 2);
    }
  }

  //QUADRANT 2
  if (mouseX >= q2.x1 && mouseX <= q2.x2 && mouseY >= q2.y1 && mouseY <= q2.y2) {

    //draw horizontal lines
    for (y = 0; y <= height / 2; y += 10) {
      line(width / 2, y, width, y);
    }
  }
  

  //QUADRANT 3
  if (mouseX >= q3.x1 && mouseX <= q3.x2 && mouseY >= q3.y1 && mouseY <= q3.y2) {

   //draw diagonal lines from top-right
    for (x = width / 2; x >= 0 && x <= width / 2; x -= 15) {
      for (y = height / 2; y >= 0 && y <= height; y += 15) {
        line(x, y, x - offset, y + offset);
      }
    }
  }

  
  //QUADRANT 4=
  if (mouseX >= q4.x1 && mouseX <= q4.x2 && mouseY >= q4.y1 && mouseY <= q4.y2) {
 
    //draw diagonal lines from top-left
    for (x = width / 2; x >= width / 2 && x <= width; x += 15) {
      for (y = height / 2; y >= 0 && y <= height; y += 15) {
        line(x, y, x + offset, y + offset);
      }
    }
  }

}//variables for line-drawing
let x, y;

//variable for diagonal line-drawing
let offset = 15;

//variables for defining quadrant bounds (see SETUP)
let w, h;
let q1, q2, q3, q4;


function setup() {
  createCanvas(700, 700);

  //make bg off-white
  background(250);

  //define shorthand for width & height of a quadrant
  w = width / 2;
  h = height / 2;

  //define start and end points for each quadrant (4)

  q1 = {
    x1: 0,
    y1: 0,
    x2: width / 2,
    y2: height / 2,
  }

  q2 = {
    x1: width / 2,
    y1: 0,
    x2: width,
    y2: height / 2,
  }

  q3 = {
    x1: 0,
    y1: height / 2,
    x2: width / 2,
    y2: height,

  }
  q4 = {
    x1: width / 2,
    y1: height / 2,
    x2: width,
    y2: height,
  }

}


function draw() {

  //set bg opacity
  //which controls speed of fade
  let c = color(250, 250, 250, 5);
  background(c);
  frameRate(30);

  //make rectangle white
  // fill(255);
  strokeWeight(1.5);

}

function mousePressed() {

  //QUADRANT 1
  //draw vertical lines

  //locate mouse, hover interaction
  if (mouseX >= q1.x1 && mouseX <= q1.x2 && mouseY >= q1.y1 && mouseY <= q1.y2) {

    //draw rectangle
    // rect(q1.x1, q1.y1, w, h);

    //draw lines
    for (x = 0; x <= width / 2; x += 10) {
      line(x, 0, x, height / 2);
    }
  }

  //QUADRANT 2
  //draw horizontal lines

  if (mouseX >= q2.x1 && mouseX <= q2.x2 && mouseY >= q2.y1 && mouseY <= q2.y2) {

    // rect(q2.x1, q2.y1, w, h);

    for (y = 0; y <= height / 2; y += 10) {
      line(width / 2, y, width, y);
    }
  }

  //QUADRANT 3
  //draw diagonal lines from top-right

  if (mouseX >= q3.x1 && mouseX <= q3.x2 && mouseY >= q3.y1 && mouseY <= q3.y2) {

    // rect(q3.x1, q3.y1, w, h);

    for (x = width / 2; x >= 0 && x <= width / 2; x -= 15) {
      for (y = height / 2; y >= 0 && y <= height; y += 15) {
        // console.log(x);
        line(x, y, x - offset, y + offset);
      }
    }
  }

  //QUADRANT 4
  //draw diagonal lines from top-left

  if (mouseX >= q4.x1 && mouseX <= q4.x2 && mouseY >= q4.y1 && mouseY <= q4.y2) {

    // rect(q4.x1, q4.y1, w, h);

    for (x = width / 2; x >= width / 2 && x <= width; x += 15) {
      for (y = height / 2; y >= 0 && y <= height; y += 15) {
        // console.log(x);
        line(x, y, x + offset, y + offset);
      }
    }
  }

}//variables for line-drawing
let x, y;

//variable for diagonal line-drawing
let offset = 0;

//variables for defining quadrant bounds (see SETUP)
let w, h;
let q1, q2, q3, q4;


function setup() {
  createCanvas(700, 700);
  
  //make bg off-white
  background(250);
  
  //define shorthand for width & height of a quadrant
  w = width / 2;
  h = height / 2;

  //define start and end points for each quadrant (4)

  q1 = {
    x1: 0,
    y1: 0,
    x2: width / 2,
    y2: height / 2,
  }

  q2 = {
    x1: width / 2,
    y1: 0,
    x2: width,
    y2: height / 2,
  }

  q3 = {
    x1: 0,
    y1: height / 2,
    x2: width / 2,
    y2: height,

  }
  q4 = {
    x1: width / 2,
    y1: height / 2,
    x2: width,
    y2: height,
  }

}


function draw() {
  
  //set bg opacity
  //which controls speed of fade
  let c = color(250, 250, 250, 10);
  background(c);
  
	//make rectangle white
  fill(255);


  //QUADRANT 1
  //draw vertical lines

  //locate mouse, hover interaction
  if (mouseX >= q1.x1 && mouseX <= q1.x2 && mouseY >= q1.y1 && mouseY <= q1.y2) {

    //draw rectangle
    rect(q1.x1, q1.y1, w, h);

    //draw lines
    for (x = 0; x <= width / 2; x += 10) {
      line(x, 0, x, height / 2);
    }
  }


  //QUADRANT 2
  //draw horizontal lines

  if (mouseX >= q2.x1 && mouseX <= q2.x2 && mouseY >= q2.y1 && mouseY <= q2.y2) {

    rect(q2.x1, q2.y1, w, h);

    for (y = 0; y <= height / 2; y += 10) {
      line(width / 2, y, width, y);
    }
  }

  //QUADRANT 3
  //draw diagonal lines from top-right

  if (mouseX >= q3.x1 && mouseX <= q3.x2 && mouseY >= q3.y1 && mouseY <= q3.y2) {

    rect(q3.x1, q3.y1, w, h);

    for (x = width / 2; x >= 0 && x <= width / 2; x -= 15) {
      for (y = height / 2; y >= 0 && y <= height; y += 15) {
        // console.log(x);
        line(x, y, x - offset, y + offset);
        offset = 15;
      }
    }
  }

  //QUADRANT 4
  //draw diagonal lines from top-left

  if (mouseX >= q4.x1 && mouseX <= q4.x2 && mouseY >= q4.y1 && mouseY <= q4.y2) {

    rect(q4.x1, q4.y1, w, h);

    for (x = width / 2; x >= width / 2 && x <= width; x += 15) {
      for (y = height / 2; y >= 0 && y <= height; y += 15) {
        // console.log(x);
        line(x, y, x + offset, y + offset);
        offset = 15;
      }
    }
  }


}let red1 = false;
let red2 = false;
let red3 = false;

// let entered = false;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(220);
  fill(255, 0, 0);

  if (red1) {
    rect(0, 0, width / 3, height);
  }
  
  if (red2) {
    rect(width/3, 0, width / 3, height);
  }
  
  if (red3) {
    rect(2 * width / 3, 0, width / 3, height);
  }
  
  //see if the mouse is in the zone

  if (mouseX < width / 3) {
    if (pmouseX >= width / 3) {
      red1 = !red1;
    }
  }

  if (mouseX >= width / 3 && mouseX < 2 * width / 3) {
    if (pmouseX < width / 3 || pmouseX >= 2 * width / 3) {
      red2 = !red2;
    }
  }
  
  if (mouseX >= 2 * width / 3) {
    if (pmouseX < 2*width/3) {
      red3 = !red3;
    }
  }

}//banana position variables
let y;
let x;

let speed = 0;

//banana color variables
let r1 = 206;
let g1 = 239;
let b1 = 107;

//whether or not you are able to eat bananas
let eat = false;

//environment
let textHeader = "Eat the bananas before they expire!!";
let bg = 0;


//SET "BASE" BANANA POSITION VALUES
function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  x = width / 2;
  y = 10;
}


//PLAY THE GAME!
function draw() {
  background(bg);
  frameRate(60);

  //make 4 delicious, GMO-free, fair trade bananas
  banana(x, 0);
  banana(x + 160, 20);
  banana(x - 50, 80);
  banana(x - 80, -80);

  //make the banana fall at a random-ish speed
  speed = random(2);
  y += speed;

  //generate instruction text
  textSize(28);
  textAlign(CENTER);
  strokeWeight(2);
  stroke(206, 239, 107);
  fill(0);
  text(textHeader, width / 2, 60);

  //create controllable text cursor
  fill(255);
  stroke(0);
  text("nom", mouseX, mouseY);

  //check if I can eat the bananas
  if (y >= 60 && mouseX >= x - 160 && mouseX <= x + 160 && mouseY >= y - 100 && mouseY <= y + 100) {
    eat = true;
    fill(255, 0, 0);
    text("nom", mouseX, mouseY);
  } else {
    eat = false;
  }

  console.log(eat);


}

//BANANA "OBJECT"
function banana(x, yOffset) {

  //draw the banana
  noStroke();
  fill(r1, g1, b1);
  arc(x + random(3), y + yOffset, 100, 100, 20, 200, OPEN);

  fill(0);
  arc(x, y + yOffset - 25, 140, 100, 0, 180, OPEN);


  if (y >= -200 && y < 0) {
    r1 = 206;
    g1 = 240;
    b1 = 108;
    textHeader = "Have some more!";
    eat = false;
  }

  //make the banana change color based on y height 
  if (y >= -0 && y < 100) {
    r1 = 226;
    g1 = 250;
    b1 = 108;
    stroke(r1, g1, b1);

  }
  if (y >= 100 && y < 250) {
    r1 = 255;
    g1 = 240;
    b1 = 30;
    stroke(r1, g1, b1);
  }
  if (y >= 250 && y < 450) {
    r1 = 232;
    g1 = 196;
    b1 = 0;
    stroke(r1, g1, b1);
  } else if (y >= 450) {
    r1 = 80;
    g1 = 64;
    b1 = 0;
  }



  //GAME OVER

  //create text
  if (y >= 500) {
    fill(255);
    textSize(20);
    text("NOOOOOOO", x, y + yOffset);
  }

  //erase text
  if (y >= 600) {
    fill(0);
    textHeader = "GAME OVER :(";
  }
}


//EAT FUNCTIONALITY
function mousePressed() {
  if (eat) {

    //put bananas offscreen
    y = -300;

    //white background
    bg = 0;

    textHeader = "+100 points";
  }

  background(0);
}let x;

function setup() { 
  createCanvas(400, 400);
  x = width/2;
  y = height/2;
} 

function draw() { 
  background(220);
  
  ellipse(x,y,30,30);
  x++;
  y++;
  console.log(x);
  
  
  
}function setup() { 
  createCanvas(windowWidth, windowHeight);
  background(220);

} 

function draw() { 
  let speed = dist(mouseX,mouseY, pmouseY,pmouseY);
  let sw = map(speed,0,500,0,50);
  strokeWeight(sw);
  stroke(0,80);
  line(mouseX,mouseY,pmouseX,pmouseY);
}

function mousePressed(){
  background(220,220,220,100);
}  var x;

function setup() { 
  createCanvas(600, 600);
  background(220);
  // 1st argument:
  // 2nd argument:
  // 3rd argument:
  // 4th argument:


} 

function draw() {
  var x=width/2;
  var y=height/2;
  
  line(x/2,y/2,3*x/2,y/2);
  
  
  
  console.log(width);
  
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
} 

function draw() {
  
  rect(x, y, x, y);
  console.log(width);
  
}function setup() { 
  createCanvas(800, 600);
} 

function draw() { 
  
  //define y coordinate for head
  var y = 200;
  var x = 320;
	var w = 260;
  var h = 200;
  
  var ear1X=180;
  var earY=110;
  
  var ear2X= ear1X+60;

  var rainbowY=y+20
  var rainbowH=30;

  background(22, 61, 124);

  fill(255,255,0);
 
    
  //rainbow
    noStroke();
  
    fill(255,0,0);
		rect(0,rainbowY,400,rainbowH);
  
    fill(255,122,0);
		rect(0,rainbowY+rainbowH,400,rainbowH);
  
    fill(255,255,0);
		rect(0,rainbowY+2*rainbowH,400,rainbowH);
    
  	fill(0,255,0);
		rect(0,rainbowY+3*rainbowH,400,rainbowH);
    
  	fill(0,122,255);
  	rect(0,rainbowY+4*rainbowH,400,rainbowH);

  	fill(122,122,255);
  	rect(0,rainbowY+5*rainbowH,400,rainbowH);

  //set stroke weight & color for rest of cat
		strokeWeight(5);
  	stroke(0);
  
  //tail
  fill(160);
  rotate(-0.3*PI);
  rect(x-425,y+175,30,120,20);

  //reset rotation crap
  rotate(-1.7*PI);

  //limbs
  rect(x+10,y+160,40,80,20);
  rect(x+70,y+160,40,80,20);
  
  rect(x+180,y+160,40,80,20);
  rect(x+240,y+160,40,80,20);


  //poptart body
  fill(252, 217, 164);
  rect(x,y,w,h,20);
  
  //poptart frosting
  fill(255, 160, 232);
	
  noStroke();
  rect(x+25,y+25,w-50,h-50);
  
  //face+ears
  stroke(0);
  fill(160);
    
  //ears!! 
  triangle(x+ear1X, y+earY, x+ear1X+70, y+earY, x+ear1X+10, y+earY-50);
  triangle(x+ear2X, y+earY, x+ear2X+70, y+earY, x+ear2X+60, y+earY-50);
    
	//face
  rect(x+165,y+95,160,110,60);
    
	//mouth
	arc(x+270,y+160,40,30,PI/10,PI);    arc(x+230,y+160,40,30,2*PI,0.9*PI);

	//eyes (base)
    
  //ellipse(x+210,y+140,20,20);
  //ellipse(x+290,y+140,20,20);
  fill(0);
  rect(x+205,y+130,15,15);
  rect(x+280,y+130,15,15);

  //nose
  rect(x+245,y+147,7,7);

  //eyes (shiny part)
  fill(255);
  noStroke();
  rect(x+205,y+130,7,7);
  rect(x+280,y+130,7,7);

  //cheeks
  fill(255, 145, 172);
  rect(x+180,y+155,20,20);
  rect(x+295,y+155,20,20);

  
 
  
}
  

function setup() { 
  createCanvas(600, 600);
} 

function draw() { 
  
  //define y coordinate for head
  var y = 220;

  background(0);
  
  noStroke();
  //frame
	fill(68, 54, 37);
  rect(100,y-180,400,500);
  
  fill(102, 117, 87);
  rect(140,y-140,320,420);
  
  //hair
  fill(0);
  rect(220,y,150,200);

	//shoulders
  fill(56, 63, 37);
  arc(300, y+280, 320,350, PI, PI);
  
  fill(242, 223, 174);
  rect(210, y+150,180,40);
  arc(300, y+150, 180,100, PI, PI);

  

  //neck
  fill(242, 223, 174);

  rect(270,y+80,60,40);

  //head
  ellipse(300, y,150,190);
  
  //hair
  fill(0);
	arc(300, y-50, 150, 90, PI, PI);

  arc(360, y-60, 160, 80, PI/2, PI);
  arc(240, y-60, 160, 80, PI/20, HALF_PI);
  
  /giphy
  rect(220,y-55,20,200,5);
  rect(360,y-55,20,200,5);



  //eyeballs
  fill(255);
  stroke(120);

  ellipse(270,y+10,20,10);
	ellipse(330,y+10,20,10);
  
  fill(0);

  ellipse(264,y+10,10,10);
	ellipse(324,y+10,10,10);
  
  //mouth
  noFill();
  
  arc(300, y+60, 40, 20, PI/10, PI/1.1);
    arc(300, y+30, 20, 40, PI/7, PI/1);

  
}
  

  
function setup() { 
  createCanvas(800,500);
} 

function draw() { 
  background(0,255,255);
  noStroke();
  
  fill(255,0,0);
  rotate(PI/5.75);
  rect(-10,-10,1000,40);
  
  rotate(PI/-5.75);
  fill(80,205,85);
  ellipse (400,250,325,250);
  
  fill(25,40,135);
  rect(520,220,40,40);
  
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  fill(0,255,255);
	ellipse(100,100,80,80);
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);

  
  //This is a Car
  
  // fill(120);
  // noStroke();
  // rect(40,100,200,80);
  // noFill();
  // stroke(30);
  // strokeWeight(6);
  // ellipse(200,190,50,50);
  // ellipse(100,190,50,50);
  // rect(60,120,30,30);
  // rect(120,120,30,30);
  // rect(180,120,30,30);

}