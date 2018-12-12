let mic, recorder, soundFile;
let soundFiles = [];
let msg;
let level;

let enterVoiceOvers = [];
let sitVoiceOvers = [];
let leaveVoiceOvers = [];
let VO1, VO2, VO3;

let userState = 1;
let enterState = true;
let sitState = false;
let leaveState = false;
let enterTrigger, sitTrigger, leaveTrigger; //condition
let recTrigger;

let toilet, toilet3D;
let state = true;
let voiceOver;

let inData;


let vol, volHistory = [];

let box3D, visualStyle;

//serial communication part
let serial;
let portName = '/dev/cu.usbmodemFA131'
let options = {
  baudrate: 9600
};
let lightValue = []; //end of serial 

function preload() {
  voiceOver = loadSound("voiceOver2.mp3");

  for (let i = 0; i < 2; i++) {
    enterVoiceOvers[i] = loadSound("voiceOver/enters" + [i] + ".wav");
  }
  for (let i = 0; i < 2; i++) {
    sitVoiceOvers[i] = loadSound("voiceOver2/sit" + [i] + ".wav")
  }
  for (let i = 0; i < 2; i++) {
    leaveVoiceOvers[i] = loadSound("voiceOver3/leave" + [i] + ".mp3")
  }
}


function setup() {

  createCanvas(windowWidth, windowHeight);

  //SOUNDS
  //using p5 sound lib. mic / sound source
  mic = new p5.AudioIn();
  mic.start();

  VO1 = random(sitVoiceOvers);
  VO2 = random(sitVoiceOvers);
  VO3 = random(sitVoiceOvers);

  //using p5 sound lib. records the sound
  recorder = new p5.SoundRecorder();
  recorder.setInput(mic);

  //using p5 sound lib. playback
  soundFile = new p5.SoundFile();

  // using p5 speech library
  let lang = navigator.language || 'en-US'
  msg = new p5.SpeechRec('lang');
  msg.continuous = true;
  msg.start(); //start listening

  //draw visuals according to sounds??
  amp = new p5.Amplitude();
  amp.setInput(soundFile);

  //ACTIONS: select native = document.
  enterTrigger = document.getElementById('enterTrigger');
  enterTrigger.addEventListener('click', runEnters);

  sitTrigger = document.getElementById('sitTrigger');
  sitTrigger.addEventListener('click', runSits);

  leaveTrigger = document.getElementById('leaveTrigger');
  leaveTrigger.addEventListener('click', runLeaves);

  recTrigger = document.getElementById('recTrigger');
  recTrigger.addEventListener('click', toggleRec);

  playTrigger = document.getElementById('playTrigger');
  playTrigger.addEventListener('click', runPlay);


  // !!!serial communication
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  var options = {
    baudrate: 9600
  }; // change the data rate to whatever you wish
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closingserial.on('open', portOpen);        // callback for the port opening
  serial.list(); // list the serial ports
  serial.open(portName, options);
  console.log('test ' + portName);
}


function printList(portList) { // !!!serial communication
  for (var i = 0; i < portList.length; i++) {
    print(i + " " + portList[i]);
  }
}

function serverConnected() {
  print('connected to server.');
}

function portOpen() {
  print('the serial port opened.')
}

function serialEvent() {
  // console.log("test");
  inData = parseInt(serial.read());
  if (inData == 49) {
    console.log('user enters');
    runEnters();
  }
  if(inData==50){
    console.log('user sits');
  	runSits();
  }
  if(inData==51){
    console.log('user stands');
  	leaveSits();
  }
  console.log(inData);
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('the serial port closed.');
}


function draw() {

  background(220);

  //SOUND
  //get volume level
  // let vol = mic.getLevel();
  vol = mic.getLevel();

  let level = amp.getLevel();
  volHistory.push(level * 400);
}

//RECORD SOUND - on button pressed
function toggleRec() {
  if (state === true && mic.enabled) {
    recorder.record(soundFile);

    //if button is clicked.. do these things
    recTrigger = document.getElementById('recTrigger').innerHTML = "STOP RECORDING";
    recTrigger = select('#recTrigger');
    recTrigger.style('background-color', '#cc0000');
    console.log('record on');
    state = false;

  } else {
    recorder.stop();
    recTrigger = document.getElementById('recTrigger').innerHTML = "RECORD";
    recTrigger = select('#recTrigger');
    recTrigger.style('background-color', '#fff');
    console.log('record stop');
    state = true;
  }
}

function runPlay() {

}

function userStates() {
  // if (enterState == true) {
  //   runEnters();
  //   userState = 1;
  // } else if (sitState == true) {
  //   runSits();
  // } else if (leaveState == true) {
  //   runLeaves();
  // }
}

function runEnters() {
  VO1 = random(enterVoiceOvers);
  VO1.play();
  VO1.onended(runEnters);
  VO2.stop();
  VO3.stop();
}

function runSits() {
  VO2 = random(sitVoiceOvers);
  VO2.play();
  VO2.onended(runSits);
  VO1.stop();
  VO3.stop();
}

function runLeaves() {
  VO3 = random(leaveVoiceOvers);
  VO3.play();
  VO3.onended(runLeaves);
  VO1.stop();
  VO2.stop();
}var serial; // variable to hold an instance of the serialport library
 
function setup() {
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
  serial.list();                      // list the serial ports
  serial.open("dev/cu.usbmodem1421");              // open a serial port
}
 
// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 print(i + " " + portList[i]);
 }
}

function serialEvent() {
  var i = serial.read();
  print(i);
}var ctracker;
var videoInput;
var capture;
var emotionData;
var ec = new emotionClassifier();
var angry, disgust, fear, sad, surprise, happy = 0;
//var playMode = 'sustain';
var sound;
//var p, peakCount;
var emotions = [];

var prevPosition = [];
var tempPos = [];

function preload() {
  ec.init(emotionModel);
  sound = loadSound('pretty.mp3');
  sound0 = loadSound('angry.mp3');
  sound1 = loadSound('disgust.mp3');
  sound2 = loadSound('fear.mp3');
  sound3 = loadSound('sad.mp3');
  sound4 = loadSound('surprise.mp3');
  sound5 = loadSound('happy.mp3');
}

function setup() {
  sound.loop();
  sound.amp(0.3);
  createCanvas(620, 620);
  capture = createCapture(VIDEO);
  //capture.size(320, 240);
  capture.hide()
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(capture.elt);
  noStroke();

}
function draw() {
 //background(245, 209, 198);
background(250,213,218);

  //background(255,0);
//background(0,0,0,2);

  push();
  translate(width, 0);
  scale(-1, 1);

  var positions = ctracker.getCurrentPosition();
  for (var i = 0; i < positions.length; i++) {
    if (prevPositions.length > 0) {
      prevPositions[i][0] = prevPositions[i][0] + (prevPositions[i][0] - positions[i][0]) / 10;
      prevPositions[i][1] = prevPositions[i][1] + (prevPositions[i][1] - positions[i][1]) / 10;
          //fill(random(255), random(255), random(255));
fill(map(positions[i][0], width * 0.33, width * 0.66, 0, 255), map(positions[i][1], height * 0.33, height * 0.66, 0, 255), 255);
      ellipse(prevPositions[i][0], prevPositions[i][1], 5, 5);
    } else {
      tempPos = positions;
    }
    fill(0);
  }

  pop();


  showResults()

  prevPositions = positions;
}

function showResults() {

  // console.log(er[0]); angry
  //console.log(er[1]); disgust
  // console.log(er[2]); fear
  // console.log(er[3]); sad
  // console.log(er[4]); surprise
  //console.log(er[5]); happy
  //fill(128 + sin(frameCount * 0.1) * 128);

  var cp = ctracker.getCurrentParameters();
  var er = ec.meanPredict(cp);

  for (var i = 0; i < er.length; i++) {
   
//       //fill(246, 94, 93);
//     fill(172,149,155);
//     text(er[0].emotion+' is: '+nfc(er[0].value, 2), 50,470);
//       //fill(98, 207, 233);
//     fill(172,149,155);
//     text(er[1].emotion+' is: '+nfc(er[0].value, 2), 50,490);
//           fill(172,149,155);
//     //fill(255, 218, 118);
//     text(er[2].emotion+' is: '+nfc(er[0].value, 2), 50,510);
//      fill(172,149,155);
//     //fill(255, 129, 55);
//     text(er[3].emotion+' is: '+nfc(er[0].value, 2), 50,530);
//     fill(172,149,155);
//     //fill(125, 233, 174);
//     text(er[4].emotion+' is: '+nfc(er[0].value, 2), 50,550);
//      fill(172,149,155);
//     //fill(179, 207, 250);
//     text(er[5].emotion+' is: '+nfc(er[0].value, 2), 50,570);
    
    //play narration

   if (mouseX > 40 && mouseX < 60 && mouseY > 40 & mouseY < 60) {
      if (mouseIsPressed && !sound0.isPlaying()) {
        sound0.play();
         fill(255);
        ellipse(50, 50, angry);
       
      }
    }
    if (mouseX > 140 && mouseX < 160 && mouseY > 40 & mouseY < 60) {
      if (mouseIsPressed && !sound1.isPlaying()) {
        sound1.play();
        fill(255);
        ellipse(150, 50, disgust);
      }
    }
    if (mouseX > 240 && mouseX < 260 && mouseY > 40 & mouseY < 60) {
      if (mouseIsPressed && !sound2.isPlaying()) {
        sound2.play();
        fill(255);
        ellipse(250, 50, fear);


        //console.log('here')
      }
    }

    if (mouseX > 340 && mouseX < 360 && mouseY > 40 & mouseY < 60) {
      if (mouseIsPressed && !sound3.isPlaying()) {
        sound3.play();
        fill(255);
        ellipse(350, 50, sad);

        //console.log('here')
      }
    }

    if (mouseX > 440 && mouseX < 460 && mouseY > 40 & mouseY < 60) {
      if (mouseIsPressed && !sound4.isPlaying()) {
        sound4.play();
        fill(255);
        ellipse(450, 50, surprise);

        //console.log('here')
      }
    }

    if (mouseX > 540 && mouseX < 560 && mouseY > 40 & mouseY < 60) {
      if (mouseIsPressed && !sound5.isPlaying()) {
        sound5.play();
        fill(255,255,255);
        ellipse(550, 50, happy);

        //console.log('here')
      }
    }
    //

    textSize(10);
    if (er[0] !== undefined) {
      angry = er[0].value * 300;
      emotions[0] = angry
      //add emotion to the array 

    }
    if (er[1] !== undefined) {
      disgust = er[1].value * 300
      emotions[1] = disgust

    }
    if (er[2] !== undefined) {
      fear = er[2].value * 300
      emotions[2] = fear
    }
    if (er[3] !== undefined) {
      sad = er[3].value * 300
      emotions[3] = sad
    }
    if (er[4] !== undefined) {
      surprise = er[4].value * 300
      emotions[4] = surprise

    }
    if (er[5] !== undefined) {
      happy = er[5].value * 300
      emotions[5] = happy

    }
    var biggest = emotions[0];
    var emotionIndex = 0;
    for (var i = 1; i < emotions.length; i++) {
      if (emotions[i] > biggest) {
        biggest = emotions[i];
        emotionIndex = i;
      }
    }
    //console.log("Biggest emotion value "+ biggest + ", emotion index: " + emotionIndex );


    if (emotionIndex != 0) {
      fill(246, 94, 93);
    } else {
      fill(245, 209, 198 +sin(frameCount) * 128);
    } 

    ellipse(50, 50, angry);
    text('angry', 50, 90);
    
    if (emotionIndex != 1) {
      fill(98, 207, 233);
    } else {
      fill(245, 209, 198 +sin(frameCount) * 128);
    }
    ellipse(150, 50, disgust);
    text('disgusted', 150, 80);


    if (emotionIndex != 2) {
      fill(252,209,70);
    } else {
      fill(245, 209, 198 +sin(frameCount) * 128);
    }
    ellipse(250, 50, fear);
    text('fear', 250, 90);



    if (emotionIndex != 3) {
      fill(255, 129, 55);
    } else {
      fill(245, 209, 198 +sin(frameCount) * 128255);
    }
    ellipse(350, 50, sad);
    text('sad', 350, 80);

    //text
    if (emotionIndex != 4) {
      fill(125, 233, 174);
    } else {
      fill(245, 209, 198 +sin(frameCount) * 128);
    }

    ellipse(450, 50, surprise);
    text('surprised', 450, 90);

    if (emotionIndex != 5) {
      fill(179, 207, 250);
    } else {
      fill(245, 209, 198 +sin(frameCount) * 128);
    }
    ellipse(550, 50, happy);
    text('happy', 550, 80);
  }

  
// fill(95,88,99);
//   text("i neither yearn to fix my past", 50, 330);
//   text("nor do i adjust particularly well to my current one", 50, 350);
//   text("self-knowledge is my coping mechanism", 50, 370);
//   text("unfolding in psychological spaces ", 50,390);
//   text("evoking the hidden life, the life unseen", 50,410);
//   text("the many colors and intricacies of adult emotion", 50,430);
//   text("listen to mine, and i ought to predict yours", 50,450);
//   //textSize(9);
// //   //text("Fernando Pessoa, The Book of Disquiet", 50,450);

  //textSize(60)
  //text("Disquiet", 140, 300);
}let mic, recorder, soundFile;
let soundFiles = [];
let msg;
let level;

let enterVoiceOvers = [
];
let sitVoiceOvers = [];
let leaveVoiceOvers = [];
let sound;

let userState = 1;

let toilet, toilet3D;
let state = true;
let recBtn;
let voiceOver;

let vol, volHistory = [];

let box3D, visualStyle;

//serial communication part
let serial;
let portName = '/dev/cu.usbmodem1421'
let options = {
  baudrate: 9600
};
let inData = []; //end of serial 

function preload() {
  voiceOver = loadSound("voiceOver2.mp3");

  for (let i = 0; i < 10; i++) {
    enterVoiceOvers[i] = loadSound("voiceOver/STE" + [i] + ".wav");
  }
}


function setup() {

  createCanvas(windowWidth, windowHeight, WEBGL);

  //SOUNDS
  //using p5 sound lib. mic / sound source
  mic = new p5.AudioIn();
  mic.start();

  //using p5 sound lib. records the sound
  recorder = new p5.SoundRecorder();
  recorder.setInput(mic);

  //using p5 sound lib. playback
  soundFile = new p5.SoundFile();

  // using p5 speech library
  let lang = navigator.language || 'en-US'
  msg = new p5.SpeechRec('lang');
  msg.continuous = true;
  msg.start(); //start listening

  //draw visuals according to sounds??
  amp = new p5.Amplitude();
  amp.setInput(soundFile);

  //ACTIONS: select native = document.
  recBtn = document.getElementById('recBtn');
  recBtn.addEventListener('click', runEnters);

  // play voice over from array
  // voiceOver.play();
	// enterVoiceOvers[3].play();
  
  // let index =int(random(0,10));
  // sound = random(enterVoiceOvers);
  // sound.play();
  
  
  // for (let i = 0; i < enterVoiceOvers.length; i++) {
  //   enterVoiceOvers[i].play();
  //   console.log(inData);
  // }
  

  
  //!!!serial communication
  // serial = new p5.SerialPort(); // make a new instance of the serialport library
  // var options = {
  //   baudrate: 9600
  // }; // change the data rate to whatever you wish
  // serial.on('list', printList); // set a callback function for the serialport list event
  // serial.on('connected', serverConnected); // callback for connecting to the server
  // serial.on('open', portOpen); // callback for the port opening
  // serial.on('data', serialEvent); // callback for when new data arrives
  // serial.on('error', serialError); // callback for errors
  // serial.on('close', portClose); // callback for the port closingserial.on('open', portOpen);        // callback for the port opening
  // serial.list(); // list the serial ports
  // serial.open(portName, options);
}


// function printList(portList) { // !!!serial communication
//   for (var i = 0; i < portList.length; i++) {
//     print(i + " " + portList[i]);
//   }
// }

// function serverConnected() {
//   print('connected to server.');
// }

// function portOpen() {
//   print('the serial port opened.')
// }

// function serialEvent() {
//   // inData = Number(serial.read());
//   inData = Number(inString);

//   // console.log('inData');
// }

// function serialError(err) {
//   print('Something went wrong with the serial port. ' + err);
// }

// function portClose() {
//   print('the serial port closed.');
// }

//
function draw() {

  background(220);

  //SOUND
  //get volume level
  // let vol = mic.getLevel();
  vol = mic.getLevel();

  let level = amp.getLevel();
  volHistory.push(level * 400);

  console.log(inData);
}

//RECORD SOUND - on button pressed
function toggleRec() {
  if (state === true && mic.enabled) {
    recorder.record(soundFile);

    //if button is clicked.. do these things
    recBtn = document.getElementById('recBtn').innerHTML = "STOP RECORDING";
    recBtn = select('#recBtn');
    recBtn.style('background-color', '#cc0000');
    console.log('record on');
    state = false;

  } else {
    recorder.stop();
    recBtn = document.getElementById('recBtn').innerHTML = "RECORD MESSAGE";
    recBtn = select('#recBtn');
    recBtn.style('background-color', '#fff');
    console.log('record stop');
    state = true;
  }
}

function runEnters(){
  sound = random(enterVoiceOvers);
  sound.play();	
	sound.onended(runEnters);
}var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1421';  // fill in your serial port name here
 
function setup() {
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
}let soundFile;
let soundFiles = [];


// let enterVoiceOvers = [];
// let sitVoiceOvers = [];
// let leaveVoiceOvers = [];
// let VO1, VO2, VO3;


let state = true;


let inData;




//serial communication part
let serial;
let portName = '/dev/cu.usbmodemFA131'
let options = {
  baudrate: 9600
};
let lightValue = []; //end of serial 

function preload() {
  voiceOver = loadSound("voiceOver2.mp3");

  for (let i = 0; i < 2; i++) {
    enterVoiceOvers[i] = loadSound("voiceOver/enters" + [i] + ".wav");
  }
  for (let i = 0; i < 2; i++) {
    sitVoiceOvers[i] = loadSound("voiceOver2/sit" + [i] + ".wav")
  }
  for (let i = 0; i < 2; i++) {
    leaveVoiceOvers[i] = loadSound("voiceOver3/leave" + [i] + ".mp3")
  }
}


function setup() {

  createCanvas(500, 500);

  //SOUNDS
  //using p5 sound lib. mic / sound source
  
  //VO1 = random(sitVoiceOvers);
  //VO2 = random(sitVoiceOvers);
  //VO3 = random(sitVoiceOvers);

  //using p5 sound lib. records the sound
 
  //using p5 sound lib. playback
 



  // !!!serial communication
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  var options = {
    baudrate: 9600
  }; // change the data rate to whatever you wish
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closingserial.on('open', portOpen);        // callback for the port opening
  serial.list(); // list the serial ports
  serial.open(portName, options);
  console.log('test ' + portName);
}


function printList(portList) { // !!!serial communication
  for (var i = 0; i < portList.length; i++) {
    print(i + " " + portList[i]);
  }
}

function serverConnected() {
  print('connected to server.');
}

function portOpen() {
  print('the serial port opened.')
}

function serialEvent() {
  // console.log("test");
  inData = parseInt(serial.read());
  if (inData == 49) {
    console.log('user enters');
    runEnters();
  }
  if(inData==50){
    console.log('user sits');
  	runSits();
  }
  if(inData==51){
    console.log('user stands');
  	leaveSits();
  }
  console.log(inData);
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('the serial port closed.');
}


function draw() {

  background(220);
}

// function runEnters() {
//   VO1 = random(enterVoiceOvers);
//   VO1.play();
//   VO1.onended(runEnters);
//   VO2.stop();
//   VO3.stop();
// }

// function runSits() {
//   VO2 = random(sitVoiceOvers);
//   VO2.play();
//   VO2.onended(runSits);
//   VO1.stop();
//   VO3.stop();
// }

// function runLeaves() {
//   VO3 = random(leaveVoiceOvers);
//   VO3.play();
//   VO3.onended(runLeaves);
//   VO1.stop();
//   VO2.stop();
// }}let soundFile;
let soundFiles = [];


let enterVoiceOvers = [];
let sitVoiceOvers = [];
let leaveVoiceOvers = [];
let VO1, VO2, VO3;


let state = true;


let inData;




//serial communication part
let serial;
let portName = '/dev/cu.usbmodemFA131'
let options = {
  baudrate: 9600
};
let lightValue = []; //end of serial 

function preload() {
  voiceOver = loadSound("voiceOver2.mp3");

  for (let i = 0; i < 2; i++) {
    enterVoiceOvers[i] = loadSound("voiceOver/enters" + [i] + ".wav");
  }
  for (let i = 0; i < 2; i++) {
    sitVoiceOvers[i] = loadSound("voiceOver2/sit" + [i] + ".wav")
  }
  for (let i = 0; i < 2; i++) {
    leaveVoiceOvers[i] = loadSound("voiceOver3/leave" + [i] + ".mp3")
  }
}


function setup() {

  createCanvas(500, 500);

  //SOUNDS
  //using p5 sound lib. mic / sound source
  
  VO1 = random(sitVoiceOvers);
  VO2 = random(sitVoiceOvers);
  VO3 = random(sitVoiceOvers);

  //using p5 sound lib. records the sound
 
  //using p5 sound lib. playback
 



  // !!!serial communication
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  var options = {
    baudrate: 9600
  }; // change the data rate to whatever you wish
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closingserial.on('open', portOpen);        // callback for the port opening
  serial.list(); // list the serial ports
  serial.open(portName, options);
  console.log('test ' + portName);
}


function printList(portList) { // !!!serial communication
  for (var i = 0; i < portList.length; i++) {
    print(i + " " + portList[i]);
  }
}

function serverConnected() {
  print('connected to server.');
}

function portOpen() {
  print('the serial port opened.')
}

function serialEvent() {
  // console.log("test");
  inData = parseInt(serial.read());
  if (inData == 49) {
    console.log('user enters');
    runEnters();
  }
  if(inData==50){
    console.log('user sits');
  	runSits();
  }
  if(inData==51){
    console.log('user stands');
  	leaveSits();
  }
  console.log(inData);
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('the serial port closed.');
}


function draw() {

  background(220);

function runEnters() {
  VO1 = random(enterVoiceOvers);
  VO1.play();
  VO1.onended(runEnters);
  VO2.stop();
  VO3.stop();
}

function runSits() {
  VO2 = random(sitVoiceOvers);
  VO2.play();
  VO2.onended(runSits);
  VO1.stop();
  VO3.stop();
}

function runLeaves() {
  VO3 = random(leaveVoiceOvers);
  VO3.play();
  VO3.onended(runLeaves);
  VO1.stop();
  VO2.stop();
}}let mic, recorder, soundFile;
let soundFiles = [];
let msg;
let level;

let enterVoiceOvers = [
];
let sitVoiceOvers = [];
let leaveVoiceOvers = [];
let sound;

let userState = 1;

let toilet, toilet3D;
let state = true;
let recBtn;
let voiceOver;

let vol, volHistory = [];

let box3D, visualStyle;

//serial communication part
let serial;
let portName = '/dev/cu.usbmodemFD121'
let options = {
  baudrate: 9600
};
let inData = []; //end of serial 

function preload() {
  voiceOver = loadSound("voiceOver2.mp3");

  for (let i = 0; i < 10; i++) {
    enterVoiceOvers[i] = loadSound("voiceOver/STE" + [i] + ".wav");
  }
}


function setup() {

  createCanvas(windowWidth, windowHeight, WEBGL);

  //SOUNDS
  //using p5 sound lib. mic / sound source
  mic = new p5.AudioIn();
  mic.start();

  //using p5 sound lib. records the sound
  recorder = new p5.SoundRecorder();
  recorder.setInput(mic);

  //using p5 sound lib. playback
  soundFile = new p5.SoundFile();

  // using p5 speech library
  let lang = navigator.language || 'en-US'
  msg = new p5.SpeechRec('lang');
  msg.continuous = true;
  msg.start(); //start listening

  //draw visuals according to sounds??
  amp = new p5.Amplitude();
  amp.setInput(soundFile);

  //ACTIONS: select native = document.
  recBtn = document.getElementById('recBtn');
  recBtn.addEventListener('click', runEnters);

  // play voice over from array
  // voiceOver.play();
	// enterVoiceOvers[3].play();
  
  // let index =int(random(0,10));
  // sound = random(enterVoiceOvers);
  // sound.play();
  
  
  // for (let i = 0; i < enterVoiceOvers.length; i++) {
  //   enterVoiceOvers[i].play();
  //   console.log(inData);
  // }
  

  
  //!!!serial communication
  // serial = new p5.SerialPort(); // make a new instance of the serialport library
  // var options = {
  //   baudrate: 9600
  // }; // change the data rate to whatever you wish
  // serial.on('list', printList); // set a callback function for the serialport list event
  // serial.on('connected', serverConnected); // callback for connecting to the server
  // serial.on('open', portOpen); // callback for the port opening
  // serial.on('data', serialEvent); // callback for when new data arrives
  // serial.on('error', serialError); // callback for errors
  // serial.on('close', portClose); // callback for the port closingserial.on('open', portOpen);        // callback for the port opening
  // serial.list(); // list the serial ports
  // serial.open(portName, options);
}


// function printList(portList) { // !!!serial communication
//   for (var i = 0; i < portList.length; i++) {
//     print(i + " " + portList[i]);
//   }
// }

// function serverConnected() {
//   print('connected to server.');
// }

// function portOpen() {
//   print('the serial port opened.')
// }

// function serialEvent() {
//   // inData = Number(serial.read());
//   inData = Number(inString);

//   // console.log('inData');
// }

// function serialError(err) {
//   print('Something went wrong with the serial port. ' + err);
// }

// function portClose() {
//   print('the serial port closed.');
// }

//
function draw() {

  background(220);

  //SOUND
  //get volume level
  // let vol = mic.getLevel();
  vol = mic.getLevel();

  let level = amp.getLevel();
  volHistory.push(level * 400);

  console.log(inData);
}

//RECORD SOUND - on button pressed
function toggleRec() {
  if (state === true && mic.enabled) {
    recorder.record(soundFile);

    //if button is clicked.. do these things
    recBtn = document.getElementById('recBtn').innerHTML = "STOP RECORDING";
    recBtn = select('#recBtn');
    recBtn.style('background-color', '#cc0000');
    console.log('record on');
    state = false;

  } else {
    recorder.stop();
    recBtn = document.getElementById('recBtn').innerHTML = "RECORD MESSAGE";
    recBtn = select('#recBtn');
    recBtn.style('background-color', '#fff');
    console.log('record stop');
    state = true;
  }
}

function runEnters(){
  sound = random(enterVoiceOvers);
  sound.play();	
	sound.onended(runEnters);
}//make sure HTTPS is checked
var ctracker;
var videoInput;
var capture;
var emotionData;
// delete emotionModel['disgusted'];
// delete emotionModel['fear'];
var ec = new emotionClassifier();
// ec.init(emotionModel);
// var emotionData = ec.getBlank();
var angry, sad, happy, surprise, disgust, fear = 0;
var playMode = 'sustain';
var sound;
//var p, peakCount;

var emotions = [angry, sad, happy, surprise, disgust, fear];  

var prevPosition = [];
// var tempPos = [];

function preload() {
  // ec = new emotionClassifier();
  // emotionData = ec.getBlank();
  ec.init(emotionModel);
  
  sound = loadSound('bgSound.mp3');
  sound2 = loadSound('pretty.mp3');
  sound3 = loadSound('cat.mp3');

}

function setup() {
    //soundFile.loop();
  createCanvas(690, 640);
  capture = createCapture(VIDEO);
  //capture.size(320, 240);
  capture.hide()
  // setup camera capture
  // videoInput = createCapture(VIDEO);
  // videoInput.size(600, 140);
  //videoInput.position(0, 0);
  //videoInput.addEventListener('canplay', enablestart, false);


  //hide video feed if you want
  //videoInput.hide();

  // setup canvas
  //var cnv = createCanvas(600, 340);
  //cnv.position(0, 0);

  // setup tracker

  // pModel.shapeModel.nonRegularizedVectors.push(9);
  // pModel.shapeModel.nonRegularizedVectors.push(11);
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(capture.elt);
  noStroke();


}

function draw() {
  background(0);
  push();
  translate(width, 0);
  scale(-1, 1);
  
  

  //background(245, 209, 198);

  //image(videoInput, 0, 0, width, height)
  //image(capture, 0, 0);

  // get array of face marker positions [x, y] format
  //scale(-1, 1);

  var positions = ctracker.getCurrentPosition();

  //print(positions.length);
  for (var i = 0; i < positions.length; i++) {
    // draw ellipse at each position point
    if (prevPositions.length > 0) {
      prevPositions[i][0] = prevPositions[i][0] + (prevPositions[i][0] - positions[i][0]) / 10;
      prevPositions[i][1] = prevPositions[i][1] + (prevPositions[i][1] - positions[i][1]) / 10;
      fill(map(positions[i][0], width*0.33, width*0.66, 0, 255), map(positions[i][1], height*0.33, height*0.66, 0, 255), 255);
ellipse(prevPositions[i][0], prevPositions[i][1], 5, 5);
    } else {
      // tempPos = positions;
    }

    // fill(255, 255, 255);
  }

  pop();
  
  //clear();

  // var emotionData = ec.getBlank();

  //var ec = new emotionClassifier();
  //ec.init(emotionModel);
  //emotionData = ec.getBlank();
  // console.log(er[3]);
  // console.log(er[0].value);

  showResults()

  prevPositions = positions;
}

//function checkHighestEmotion(){
  
  // var highestEmotionValue = 0
  // var highestEmotionIndex = null;
  
  //for loop thru the 6 emotions
  
  	// if currentEmotion (i) > highestEmotionValue:
  		//	highestEmotionValue = currentEmotion (i)
  		// 	highestEmotionIndex = i
  
  // end for loop

  // change color based on highestEmotionIndex
  

function showResults() {

  // console.log(er[0]); angry
  //console.log(er[1]); Disggusted
  // console.log(er[2]); fear
  // console.log(er[3]); sad
  // console.log(er[4]); surprise
  //console.log(er[5]); happy
  //fill(128 + sin(frameCount * 0.1) * 128);
  
  var cp = ctracker.getCurrentParameters();
  var er = ec.meanPredict(cp);
  
    for (var i = 0; i < er.length; i++) {
    //text(er[i].emotions +' '+ nfc(er[i].value, 2), 20, (i+1)*30);

  textSize(8);
  if (er[0] !== undefined) {
    angry = er[0].value * 300
    //add emotion to the array 
    
  }
  if (er[1] !== undefined) {
    disgust = er[1].value * 300
  }
  if (er[2] !== undefined) {
    fear = er[2].value * 300
  }
  if (er[3] !== undefined) {
    sad = er[3].value * 300
  }
   if (er[4] !== undefined) {
    surprise = er[4].value * 300
  }
   if (er[5] !== undefined) {
    happy = er[5].value * 300
  }
  
  fill(246,94,93);
  ellipse(50, 50, angry);
  text('angry', 50, 50);
  

  fill(98,207,233);
  ellipse(150, 50, disgust);
  text('disgust', 150, 50);

  fill(255,218,118);
  ellipse(250, 50, fear);
  text('fear', 250, 50);


  fill(125,233,174);
  ellipse(350, 50, surprise);
  text('surprise', 350, 50);
  //text
  fill(255,129, 55 + sin(frameCount) * 128);
  ellipse(450, 50, happy);
  text('happy', 450, 50);
  
    fill(245,209,198);
  ellipse(550, 50, fear);
  text('fear', 550, 50);
    }
  
  if(mouseX > 40 && mouseX < 60 && mouseY > 40 & mouseY < 60){ 
      if (mouseIsPressed) {
  sound.play();
        fill(255);
  ellipse(50, 50, angry);
        
        //console.log('here')
  
    }}

    if(mouseX > 140 && mouseX < 160 && mouseY > 40 & mouseY < 60){ 
      if (mouseIsPressed) {
  sound2.play();
         fill(255);
  ellipse(350, 50, surprise);
        //console.log('here')
        
    }
  }


    if(mouseX > 340 && mouseX < 360 && mouseY > 40 & mouseY < 60){ 
      if (mouseIsPressed) {
  sound3.play();
      fill(0);
  ellipse(150, 50, disgust);
        //console.log('here')
        
    }
  }

      
  //textSize(10)
  // text("To create, I destroyed myself;", 140, 340);
  //   text("I made myself external to such a degree within myself that within myself", 140, 360);
  //     text("I do not exist except in an external fashion.", 140, 380);
  //     text("I am the living setting in which several actors make entrances,", 140, 400);
  //     text("putting on several different plays.", 140, 420);
  //     text(": Fernando Pessoa, The Book of Disquiet", 140, 440);
 // fill(238,231,224);
 // textSize(12 + (mouseX / width)*72);
 //  textSize(60)
 //  text("destroy myself", 140, 300);
  }
var ctracker;
var videoInput;
var capture;
var emotionData;
var ec = new emotionClassifier();
var angry, disgust, fear, sad, surprise, happy = 0;
//var playMode = 'sustain';
var sound;
//var p, peakCount;
var emotions = [];

var prevPosition = [];
var tempPos = [];

function preload() {
  ec.init(emotionModel);
  sound = loadSound('pretty.mp3');
  sound0 = loadSound('angry.mp3');
  sound1 = loadSound('disgust.mp3');
  sound2 = loadSound('fear.mp3');
  sound3 = loadSound('sad.mp3');
  sound4 = loadSound('surprise.mp3');
  sound5 = loadSound('happy.mp3');
}

function setup() {
  sound.loop();
  sound.amp(0.3);
  createCanvas(620, 620);
  capture = createCapture(VIDEO);
  //capture.size(320, 240);
  capture.hide()
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(capture.elt);
  noStroke();

}
function draw() {
 //background(245, 209, 198);
background(250,213,218);

  //background(255,0);
//background(0,0,0,2);

  push();
  translate(width, 0);
  scale(-1, 1);

  var positions = ctracker.getCurrentPosition();
  for (var i = 0; i < positions.length; i++) {
    if (prevPositions.length > 0) {
      prevPositions[i][0] = prevPositions[i][0] + (prevPositions[i][0] - positions[i][0]) / 10;
      prevPositions[i][1] = prevPositions[i][1] + (prevPositions[i][1] - positions[i][1]) / 10;
          //fill(random(255), random(255), random(255));
fill(map(positions[i][0], width * 0.33, width * 0.66, 0, 255), map(positions[i][1], height * 0.33, height * 0.66, 0, 255), 255);
      ellipse(prevPositions[i][0], prevPositions[i][1], 5, 5);
    } else {
      tempPos = positions;
    }
    fill(0);
  }

  pop();


  showResults()

  prevPositions = positions;
}

function showResults() {

  // console.log(er[0]); angry
  //console.log(er[1]); disgust
  // console.log(er[2]); fear
  // console.log(er[3]); sad
  // console.log(er[4]); surprise
  //console.log(er[5]); happy
  //fill(128 + sin(frameCount * 0.1) * 128);

  var cp = ctracker.getCurrentParameters();
  var er = ec.meanPredict(cp);

  for (var i = 0; i < er.length; i++) {
   
      //fill(246, 94, 93);
    fill(172,149,155);
    text(er[0].emotion+' is: '+nfc(er[0].value, 2), 50,470);
      //fill(98, 207, 233);
    fill(172,149,155);
    text(er[1].emotion+' is: '+nfc(er[0].value, 2), 50,490);
          fill(172,149,155);
    //fill(255, 218, 118);
    text(er[2].emotion+' is: '+nfc(er[0].value, 2), 50,510);
     fill(172,149,155);
    //fill(255, 129, 55);
    text(er[3].emotion+' is: '+nfc(er[0].value, 2), 50,530);
    fill(172,149,155);
    //fill(125, 233, 174);
    text(er[4].emotion+' is: '+nfc(er[0].value, 2), 50,550);
     fill(172,149,155);
    //fill(179, 207, 250);
    text(er[5].emotion+' is: '+nfc(er[0].value, 2), 50,570);
    
    //play narration

   if (mouseX > 40 && mouseX < 60 && mouseY > 40 & mouseY < 60) {
      if (mouseIsPressed && !sound0.isPlaying()) {
        sound0.play();
         fill(255);
        ellipse(50, 50, angry);
       
      }
    }
    if (mouseX > 140 && mouseX < 160 && mouseY > 40 & mouseY < 60) {
      if (mouseIsPressed && !sound1.isPlaying()) {
        sound1.play();
        fill(255);
        ellipse(150, 50, disgust);
      }
    }
    if (mouseX > 240 && mouseX < 260 && mouseY > 40 & mouseY < 60) {
      if (mouseIsPressed && !sound2.isPlaying()) {
        sound2.play();
        fill(255);
        ellipse(250, 50, fear);


        //console.log('here')
      }
    }

    if (mouseX > 340 && mouseX < 360 && mouseY > 40 & mouseY < 60) {
      if (mouseIsPressed && !sound3.isPlaying()) {
        sound3.play();
        fill(255);
        ellipse(350, 50, sad);

        //console.log('here')
      }
    }

    if (mouseX > 440 && mouseX < 460 && mouseY > 40 & mouseY < 60) {
      if (mouseIsPressed && !sound4.isPlaying()) {
        sound4.play();
        fill(255);
        ellipse(450, 50, surprise);

        //console.log('here')
      }
    }

    if (mouseX > 540 && mouseX < 560 && mouseY > 40 & mouseY < 60) {
      if (mouseIsPressed && !sound5.isPlaying()) {
        sound5.play();
        fill(255,255,255);
        ellipse(550, 50, happy);

        //console.log('here')
      }
    }
    //

    textSize(10);
    if (er[0] !== undefined) {
      angry = er[0].value * 300;
      emotions[0] = angry
      //add emotion to the array 

    }
    if (er[1] !== undefined) {
      disgust = er[1].value * 300
      emotions[1] = disgust

    }
    if (er[2] !== undefined) {
      fear = er[2].value * 300
      emotions[2] = fear
    }
    if (er[3] !== undefined) {
      sad = er[3].value * 300
      emotions[3] = sad
    }
    if (er[4] !== undefined) {
      surprise = er[4].value * 300
      emotions[4] = surprise

    }
    if (er[5] !== undefined) {
      happy = er[5].value * 300
      emotions[5] = happy

    }
    var biggest = emotions[0];
    var emotionIndex = 0;
    for (var i = 1; i < emotions.length; i++) {
      if (emotions[i] > biggest) {
        biggest = emotions[i];
        emotionIndex = i;
      }
    }
    //console.log("Biggest emotion value "+ biggest + ", emotion index: " + emotionIndex );


    if (emotionIndex != 0) {
      fill(246, 94, 93);
    } else {
      fill(245, 209, 198 +sin(frameCount) * 128);
    } 

    ellipse(50, 50, angry);
    text('angry', 50, 90);
    
    if (emotionIndex != 1) {
      fill(98, 207, 233);
    } else {
      fill(245, 209, 198 +sin(frameCount) * 128);
    }
    ellipse(150, 50, disgust);
    text('disgusted', 150, 80);


    if (emotionIndex != 2) {
      fill(252,209,70);
    } else {
      fill(245, 209, 198 +sin(frameCount) * 128);
    }
    ellipse(250, 50, fear);
    text('fear', 250, 90);



    if (emotionIndex != 3) {
      fill(255, 129, 55);
    } else {
      fill(245, 209, 198 +sin(frameCount) * 128255);
    }
    ellipse(350, 50, sad);
    text('sad', 350, 80);

    //text
    if (emotionIndex != 4) {
      fill(125, 233, 174);
    } else {
      fill(245, 209, 198 +sin(frameCount) * 128);
    }

    ellipse(450, 50, surprise);
    text('surprised', 450, 90);

    if (emotionIndex != 5) {
      fill(179, 207, 250);
    } else {
      fill(245, 209, 198 +sin(frameCount) * 128);
    }
    ellipse(550, 50, happy);
    text('happy', 550, 80);
  }

  
fill(95,88,99);
  text("i neither yearn to fix my past", 50, 330);
  text("nor do i adjust particularly well to my current one", 50, 350);
  text("self-knowledge is my coping mechanism", 50, 370);
  text("unfolding in psychological spaces ", 50,390);
  text("evoking the hidden life, the life unseen", 50,410);
  text("the many colors and intricacies of adult emotion", 50,430);
  text("listen to mine, and i ought to predict yours", 50,450);
  //textSize(9);
//   //text("Fernando Pessoa, The Book of Disquiet", 50,450);

  //textSize(60)
  //text("Disquiet", 140, 300);
}//make sure HTTPS is checked
var ctracker;
var videoInput;
var capture;
var emotionData;
// delete emotionModel['disgusted'];
// delete emotionModel['fear'];
var ec = new emotionClassifier();
// ec.init(emotionModel);
// var emotionData = ec.getBlank();
var angry, sad, happy, surprise, disgust, fear = 0;
//var p, peakCount;

var emotions = [angry, sad, happy, surprise, disgust, fear];  

var prevPosition = [];
// var tempPos = [];

var index = 0;

var sound;

var trigger = 0;
var autoplay = false;
var osc;

function preload() {
  // ec = new emotionClassifier();
  // emotionData = ec.getBlank();
  ec.init(emotionModel);
  sound = loadSound('bgSound.mp3');

}

function setup() {
    //soundFile.loop();
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  //capture.size(320, 240);
  capture.hide()
  // setup camera capture
  // videoInput = createCapture(VIDEO);
  // videoInput.size(600, 140);
  //videoInput.position(0, 0);
  //videoInput.addEventListener('canplay', enablestart, false);


  //hide video feed if you want
  //videoInput.hide();

  // setup canvas
  //var cnv = createCanvas(600, 340);
  //cnv.position(0, 0);

  // setup tracker

  // pModel.shapeModel.nonRegularizedVectors.push(9);
  // pModel.shapeModel.nonRegularizedVectors.push(11);
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(capture.elt);
  noStroke();
  
var div = createDiv("Click to play notes or ")
  div.id("instructions");
  var button = createA("#","play song automatically.");
  button.parent("instructions");
  // Trigger automatically playing
  button.mousePressed(function() {
    if (!autoplay) {
      index = 0;
      autoplay = true;
    }
  });

}
// A function to play a note
function playNote(note, duration) {
  osc.freq(midiToFreq(note));
  // Fade it in
  osc.fade(0.5,0.2);

  // If we sest a duration, fade it out
  if (duration) {
    setTimeout(function() {
      osc.fade(0,0.2);
    }, duration-50);
  }
}


function draw() {
  background(0);
  push();
  translate(width, 0);
  scale(-1, 1);
  
  

  //background(245, 209, 198);

  //image(videoInput, 0, 0, width, height)
  //image(capture, 0, 0);

  // get array of face marker positions [x, y] format
  //scale(-1, 1);

  var positions = ctracker.getCurrentPosition();

  //print(positions.length);
  for (var i = 0; i < positions.length; i++) {
    // draw ellipse at each position point
    if (prevPositions.length > 0) {
      prevPositions[i][0] = prevPositions[i][0] + (prevPositions[i][0] - positions[i][0]) / 10;
      prevPositions[i][1] = prevPositions[i][1] + (prevPositions[i][1] - positions[i][1]) / 10;
      fill(map(positions[i][0], width*0.33, width*0.66, 0, 255), map(positions[i][1], height*0.33, height*0.66, 0, 255), 255);
ellipse(prevPositions[i][0], prevPositions[i][1], 5, 5);
    } else {
      // tempPos = positions;
    }

    // fill(255, 255, 255);
  }

  pop();
  
  //clear();

  // var emotionData = ec.getBlank();

  //var ec = new emotionClassifier();
  //ec.init(emotionModel);
  //emotionData = ec.getBlank();
  // console.log(er[3]);
  // console.log(er[0].value);

  showResults()

  prevPositions = positions;
}

//function checkHighestEmotion(){
  
  // var highestEmotionValue = 0
  // var highestEmotionIndex = null;
  
  //for loop thru the 6 emotions
  
  	// if currentEmotion (i) > highestEmotionValue:
  		//	highestEmotionValue = currentEmotion (i)
  		// 	highestEmotionIndex = i
  
  // end for loop

  // change color based on highestEmotionIndex
  

function showResults() {

  // console.log(er[0]); angry
  //console.log(er[1]); Disggusted
  // console.log(er[2]); fear
  // console.log(er[3]); sad
  // console.log(er[4]); surprise
  //console.log(er[5]); happy
  //fill(128 + sin(frameCount * 0.1) * 128);
  
  var cp = ctracker.getCurrentParameters();
  var er = ec.meanPredict(cp);
  
    for (var i = 0; i < er.length; i++) {


   // text(er[i].emotions +' '+ nfc(er[i].value, 2), 20, (i+1)*30);

  textSize(8);
  if (er[0] !== undefined) {
    angry = er[0].value * 300
    //add emotion to the array 
    
  }
  if (er[1] !== undefined) {
    disgust = er[1].value * 300
  }
  if (er[2] !== undefined) {
    fear = er[2].value * 300
  }
  if (er[3] !== undefined) {
    sad = er[3].value * 300
  }
   if (er[4] !== undefined) {
    surprise = er[4].value * 300
  }
   if (er[5] !== undefined) {
    happy = er[5].value * 300
  }
  
  fill(255);
  ellipse(50, 50, angry);
  text('angry', 50, 50);
  

  fill(98,207,233);
  ellipse(150, 50, disgust);
  text('disgust', 150, 50);

  fill(255,218,118);
  ellipse(250, 50, fear);
  text('fear', 250, 50);


  fill(255);
  ellipse(350, 50, surprise);
  text('surprise', 350, 50);
  //text
  fill(255,129, 55);
  ellipse(450, 50, happy);
  text('happy', 450, 50);
  
    fill(245,209,198);
  ellipse(550, 50, fear);
  text('fear', 550, 50);
    }
  
  var w = width / emotions.length;
  for (var i = 0; i < emotions.length; i++) {
    var x = i * w;
    // If the mouse is over the key
    if (mouseX > x && mouseX < x + w && mouseY < height) {
      // If we're clicking
      if (mouseIsPressed) {
        fill(124, 91, 42);
      // Or just rolling over
      } else {
        fill(175, 142, 91);
      }
    } else {
      fill(247, 228, 200);
    }

    // Or if we're playing the song, let's highlight it too
    if (autoplay && i === song[index-1].note) {
      fill(100,255,200)
    
  
  }

}

// When we click
function mousePressed() {
  // Map mouse to the key index
  var key = floor(map(mouseX, 0, width, 0, emotions.length));
  playNote(emotions[key]);
}

// Fade it out when we release
function mouseReleased() {
  osc.fade(0,0.5);
}
  
  if(mouseX > 40 && mouseX < 60 && mouseY > 40 & mouseY < 60){ 
      if (mouseIsPressed) {
  sound.play();
        fill(246,94,93);
  ellipse(50, 50, angry);
         } else {
        sound.stop();
        //console.log('here')
  
    }

    if(mouseX > 340 && mouseX < 360 && mouseY > 40 & mouseY < 60){ 
      if (mouseIsPressed) {
  sound.play();
         fill(125,233,174);
  ellipse(350, 50, surprise);
        //console.log('here')
  

      
    }
  }


      
  //textSize(10)
  // text("To create, I destroyed myself;", 140, 340);
  //   text("I made myself external to such a degree within myself that within myself", 140, 360);
  //     text("I do not exist except in an external fashion.", 140, 380);
  //     text("I am the living setting in which several actors make entrances,", 140, 400);
  //     text("putting on several different plays.", 140, 420);
  //     text(": Fernando Pessoa, The Book of Disquiet", 140, 440);
 // fill(238,231,224);
 // textSize(12 + (mouseX / width)*72);
 //  textSize(60)
 //  text("destroy myself", 140, 300);
  }}//make sure HTTPS is checked
var ctracker;
var videoInput;
var capture;
var emotionData;
// delete emotionModel['disgusted'];
// delete emotionModel['fear'];
var ec = new emotionClassifier();
// ec.init(emotionModel);
// var emotionData = ec.getBlank();
var angry, sad, happy, surprise, disgust, fear = 0;
var playMode = 'sustain';
var sound;
//var p, peakCount;

var emotions = [angry, sad, happy, surprise, disgust, fear];  

var prevPosition = [];
// var tempPos = [];

function preload() {
  // ec = new emotionClassifier();
  // emotionData = ec.getBlank();
  ec.init(emotionModel);
  sound = loadSound('bgSound.mp3');

}

function setup() {
    //soundFile.loop();
  createCanvas(690, 640);
  capture = createCapture(VIDEO);
  //capture.size(320, 240);
  capture.hide()
  // setup camera capture
  // videoInput = createCapture(VIDEO);
  // videoInput.size(600, 140);
  //videoInput.position(0, 0);
  //videoInput.addEventListener('canplay', enablestart, false);


  //hide video feed if you want
  //videoInput.hide();

  // setup canvas
  //var cnv = createCanvas(600, 340);
  //cnv.position(0, 0);

  // setup tracker

  // pModel.shapeModel.nonRegularizedVectors.push(9);
  // pModel.shapeModel.nonRegularizedVectors.push(11);
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(capture.elt);
  noStroke();


}

function draw() {
  background(0);
  push();
  translate(width, 0);
  scale(-1, 1);
  
  

  //background(245, 209, 198);

  //image(videoInput, 0, 0, width, height)
  //image(capture, 0, 0);

  // get array of face marker positions [x, y] format
  //scale(-1, 1);

  var positions = ctracker.getCurrentPosition();

  //print(positions.length);
  for (var i = 0; i < positions.length; i++) {
    // draw ellipse at each position point
    if (prevPositions.length > 0) {
      prevPositions[i][0] = prevPositions[i][0] + (prevPositions[i][0] - positions[i][0]) / 10;
      prevPositions[i][1] = prevPositions[i][1] + (prevPositions[i][1] - positions[i][1]) / 10;
      fill(map(positions[i][0], width*0.33, width*0.66, 0, 255), map(positions[i][1], height*0.33, height*0.66, 0, 255), 255);
ellipse(prevPositions[i][0], prevPositions[i][1], 5, 5);
    } else {
      // tempPos = positions;
    }

    // fill(255, 255, 255);
  }

  pop();
  
  //clear();

  // var emotionData = ec.getBlank();

  //var ec = new emotionClassifier();
  //ec.init(emotionModel);
  //emotionData = ec.getBlank();
  // console.log(er[3]);
  // console.log(er[0].value);

  showResults()

  prevPositions = positions;
}

//function checkHighestEmotion(){
  
  // var highestEmotionValue = 0
  // var highestEmotionIndex = null;
  
  //for loop thru the 6 emotions
  
  	// if currentEmotion (i) > highestEmotionValue:
  		//	highestEmotionValue = currentEmotion (i)
  		// 	highestEmotionIndex = i
  
  // end for loop

  // change color based on highestEmotionIndex
  

function showResults() {

  // console.log(er[0]); angry
  //console.log(er[1]); Disggusted
  // console.log(er[2]); fear
  // console.log(er[3]); sad
  // console.log(er[4]); surprise
  //console.log(er[5]); happy
  //fill(128 + sin(frameCount * 0.1) * 128);
  
  var cp = ctracker.getCurrentParameters();
  var er = ec.meanPredict(cp);
  
    for (var i = 0; i < er.length; i++) {
    text(er[i].emotions +' '+ nfc(er[i].value, 2), 20, (i+1)*30);

  textSize(8);
  if (er[0] !== undefined) {
    angry = er[0].value * 300
    //add emotion to the array 
    
  }
  if (er[1] !== undefined) {
    disgust = er[1].value * 300
  }
  if (er[2] !== undefined) {
    fear = er[2].value * 300
  }
  if (er[3] !== undefined) {
    sad = er[3].value * 300
  }
   if (er[4] !== undefined) {
    surprise = er[4].value * 300
  }
   if (er[5] !== undefined) {
    happy = er[5].value * 300
  }
  
  fill(246,94,93);
  ellipse(50, 50, angry);
  text('angry', 50, 50);
  

  fill(98,207,233);
  ellipse(150, 50, disgust);
  text('disgust', 150, 50);

  fill(255,218,118);
  ellipse(250, 50, fear);
  text('fear', 250, 50);


  fill(125,233,174);
  ellipse(350, 50, surprise);
  text('surprise', 350, 50);
  //text
  fill(255,129, 55);
  ellipse(450, 50, happy);
  text('happy', 450, 50);
  
    fill(245,209,198);
  ellipse(550, 50, fear);
  text('fear', 550, 50);
  
  
  if(mouseX > 340 && mouseX < 360 && mouseY > 40 & mouseY < 60){ 
      if (mouseIsPressed) {
  sound.play();
         fill(255);
  ellipse(350, 50, surprise);
        //console.log('here')
        
      
    }
  }


      
  //textSize(10)
  // text("To create, I destroyed myself;", 140, 340);
  //   text("I made myself external to such a degree within myself that within myself", 140, 360);
  //     text("I do not exist except in an external fashion.", 140, 380);
  //     text("I am the living setting in which several actors make entrances,", 140, 400);
  //     text("putting on several different plays.", 140, 420);
  //     text(": Fernando Pessoa, The Book of Disquiet", 140, 440);
 // fill(238,231,224);
 // textSize(12 + (mouseX / width)*72);
 //  textSize(60)
 //  text("destroy myself", 140, 300);
  }}
let songs = [];
let songPressed = 0;
let serial; // variable to hold an instance of the serialport library
let fromSerial = 0; //variable to hold the data

function preload() {
	for (let i = 0; i < 8; i++) {
    songs.push(loadSound(i + '.mp3'));
	}		
}
  
function setup() {
  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
	//serial.on('list', printList); // callback function for serialport list event
	serial.on('data', serialEvent); // callback for new data coming in	
	serial.list(); // list the serial ports
	serial.open("/dev/cu.usbserial-DN0514SD"); // open a port
}

function draw() {
  background(220);
}

function serialEvent() {
	// this is called when data is recieved, data will then live in fromSerial	
	var stringFromSerial = serial.readLine();
  if (stringFromSerial.length>0){
    var trimmedString = trim(stringFromSerial);
    songPressed = Number(trimmedString);
    
    if (!songs[songPressed].isPlaying()) {
      for (let i = 0; i < 8; i++) {
        songs[i].stop();
      } 
      songs[songPressed].loop();
      print(songPressed);
    }
  }
}
var coffeeButton;
var coffee;
var tea;
var teaButton;
var coffeeImage;
var teaImage;
var video;
var instruct;

function preload() {
  coffee = loadSound("Making Espresso-SoundBible.com-911679408.wav");
  tea = loadSound("Pouring Hot Tea-SoundBible.com-887738929.wav");
  coffeeImage = loadImage ("coffee.png");
  teaImage = loadImage ("tea.png");
}

  
function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  coffeeButton = createButton('Coffee');
  coffeeButton.mousePressed (loadCoffee);
  teaButton = createButton('Tea');
  teaButton.mousePressed (loadTea);
   video = createCapture(VIDEO);
  video.hide();
   video.size(400, 400);
  instruct = createP ('take a picture with your beverage of choice!');
 
}

function draw() {
   video.loadPixels();
image(video, 0, 0);
}

function loadCoffee(){

  video.size(400, 400);
  
  image(coffeeImage, 200, 200, 100, 100);
  
  coffee.play();
}

function loadTea (){
   video.size(400, 400);
  image(teaImage, 200, 200, 100, 100);
  tea.play();
}
  


//make sure HTTPS is checked
var ctracker;
var videoInput;
var capture;
var emotionData;
// delete emotionModel['disgusted'];
// delete emotionModel['fear'];
var ec = new emotionClassifier();
// ec.init(emotionModel);
// var emotionData = ec.getBlank();
var angry, sad, happy, surprise, disgust, fear = 0;
var playMode = 'sustain';
var sound;
//var p, peakCount;

var emotions = [angry, sad, happy, surprise, disgust, fear];  

var prevPosition = [];
// var tempPos = [];

function preload() {
  // ec = new emotionClassifier();
  // emotionData = ec.getBlank();
  ec.init(emotionModel);
  sound = loadSound('bgSound.mp3');

}

function setup() {
    //soundFile.loop();
  createCanvas(690, 640);
  capture = createCapture(VIDEO);
  //capture.size(320, 240);
  capture.hide()
  // setup camera capture
  // videoInput = createCapture(VIDEO);
  // videoInput.size(600, 140);
  //videoInput.position(0, 0);
  //videoInput.addEventListener('canplay', enablestart, false);


  //hide video feed if you want
  //videoInput.hide();

  // setup canvas
  //var cnv = createCanvas(600, 340);
  //cnv.position(0, 0);

  // setup tracker

  // pModel.shapeModel.nonRegularizedVectors.push(9);
  // pModel.shapeModel.nonRegularizedVectors.push(11);
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(capture.elt);
  noStroke();


}

function draw() {
  background(0);
  push();
  translate(width, 0);
  scale(-1, 1);
  
  

  //background(245, 209, 198);

  //image(videoInput, 0, 0, width, height)
  //image(capture, 0, 0);

  // get array of face marker positions [x, y] format
  //scale(-1, 1);

  var positions = ctracker.getCurrentPosition();

  //print(positions.length);
  for (var i = 0; i < positions.length; i++) {
    // draw ellipse at each position point
    if (prevPositions.length > 0) {
      prevPositions[i][0] = prevPositions[i][0] + (prevPositions[i][0] - positions[i][0]) / 10;
      prevPositions[i][1] = prevPositions[i][1] + (prevPositions[i][1] - positions[i][1]) / 10;
      fill(map(positions[i][0], width*0.33, width*0.66, 0, 255), map(positions[i][1], height*0.33, height*0.66, 0, 255), 255);
ellipse(prevPositions[i][0], prevPositions[i][1], 5, 5);
    } else {
      // tempPos = positions;
    }

    // fill(255, 255, 255);
  }

  pop();
  
  //clear();

  // var emotionData = ec.getBlank();

  //var ec = new emotionClassifier();
  //ec.init(emotionModel);
  //emotionData = ec.getBlank();
  // console.log(er[3]);
  // console.log(er[0].value);

  showResults()

  prevPositions = positions;
}

function checkHighestEmotion(){
  
  // var highestEmotionValue = 0
  // var highestEmotionIndex = null;
  
  //for loop thru the 6 emotions
  
  	// if currentEmotion (i) > highestEmotionValue:
  		//	highestEmotionValue = currentEmotion (i)
  		// 	highestEmotionIndex = i
  
  // end for loop

  // change color based on highestEmotionIndex
  
}

function showResults() {

  // console.log(er[0]); angry
  //console.log(er[1]); Disggusted
  // console.log(er[2]); fear
  // console.log(er[3]); sad
  // console.log(er[4]); surprise
  //console.log(er[5]); happy
  //fill(128 + sin(frameCount * 0.1) * 128);
  
  var cp = ctracker.getCurrentParameters();
  var er = ec.meanPredict(cp);
  
    //for (var i = 0; i < er.length; i++) {
    //text(er[i].emotions +' '+ nfc(er[i].value, 2), 20, (i+1)*30);

  textSize(8);
  if (er[0] !== undefined) {
    angry = er[0].value * 300
    //add emotion to the array 
    
  }
  if (er[1] !== undefined) {
    disgust = er[1].value * 300
  }
  if (er[2] !== undefined) {
    fear = er[2].value * 300
  }
  if (er[3] !== undefined) {
    sad = er[3].value * 300
  }
   if (er[4] !== undefined) {
    surprise = er[4].value * 300
  }
   if (er[5] !== undefined) {
    happy = er[5].value * 300
  }
  
  fill(246,94,93);
  ellipse(50, 50, angry);
  text('angry', 50, 50);
  

  fill(98,207,233);
  ellipse(150, 50, disgust);
  text('disgust', 150, 50);

  fill(255,218,118);
  ellipse(250, 50, fear);
  text('fear', 250, 50);


  fill(125,233,174);
  ellipse(350, 50, surprise);
  text('surprise', 350, 50);
  //text
  fill(255,129, 55);
  ellipse(450, 50, happy);
  text('happy', 450, 50);
  
    fill(245,209,198);
  ellipse(550, 50, fear);
  text('fear', 550, 50);
  
  
  if(mouseX > 340 && mouseX < 360 && mouseY > 40 & mouseY < 60){ 
      if (mouseIsPressed) {
  sound.play();
         fill(255);
  ellipse(350, 50, surprise);
        //console.log('here')
        
      
    }
  }


      
  textSize(10)
  // text("To create, I destroyed myself;", 140, 340);
  //   text("I made myself external to such a degree within myself that within myself", 140, 360);
  //     text("I do not exist except in an external fashion.", 140, 380);
  //     text("I am the living setting in which several actors make entrances,", 140, 400);
  //     text("putting on several different plays.", 140, 420);
  //     text(": Fernando Pessoa, The Book of Disquiet", 140, 440);
 // fill(238,231,224);
 // textSize(12 + (mouseX / width)*72);
 //  textSize(60)
 //  text("destroy myself", 140, 300);
  }
//make sure HTTPS is checked
var ctracker;
var videoInput;
var capture;

var emotionData;
// delete emotionModel['disgusted'];
// delete emotionModel['fear'];
var ec = new emotionClassifier();
// ec.init(emotionModel);
// var emotionData = ec.getBlank();
var angry, sad, happy, surprised, disgusted, fear = 0;
var soundFile;
//var p, peakCount;

var prevPosition = [];
// var tempPos = [];

function preload() {
  // ec = new emotionClassifier();
  // emotionData = ec.getBlank();
  ec.init(emotionModel);
  soundFile = loadSound('bgSound.mp3');

}

function setup() {
  createCanvas(690, 640);
  capture = createCapture(VIDEO);
  //capture.size(320, 240);
  capture.hide()
  // setup camera capture
  // videoInput = createCapture(VIDEO);
  // videoInput.size(600, 140);
  //videoInput.position(0, 0);
  //videoInput.addEventListener('canplay', enablestart, false);


  //hide video feed if you want
  //videoInput.hide();

  // setup canvas
  //var cnv = createCanvas(600, 340);
  //cnv.position(0, 0);

  // setup tracker

  // pModel.shapeModel.nonRegularizedVectors.push(9);
  // pModel.shapeModel.nonRegularizedVectors.push(11);
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(capture.elt);
  noStroke();


}

function draw() {

  background(0);
  drawCursor();
}

function drawCursor() {
  //rect(map(soundFile.currentTime(), 0, soundFile.duration(), 5, width), 0, 10, 10);
  push();
  translate(width, 0);
  scale(-1, 1);
  //background(245, 209, 198);

  //image(videoInput, 0, 0, width, height)
  //image(capture, 0, 0);

  // get array of face marker positions [x, y] format
  //scale(-1, 1);

  var positions = ctracker.getCurrentPosition();

  print(positions.length);
  for (var i = 0; i < positions.length; i++) {
    // draw ellipse at each position point
    if (prevPositions.length > 0) {
      prevPositions[i][0] = prevPositions[i][0] + (prevPositions[i][0] - positions[i][0]) / 10;
      prevPositions[i][1] = prevPositions[i][1] + (prevPositions[i][1] - positions[i][1]) / 10;
      ellipse(prevPositions[i][0], prevPositions[i][1], 5, 5);
    } else {
      // tempPos = positions;
    }

    fill(255, 255, 255);
  }

  pop();
  var cp = ctracker.getCurrentParameters();
  er = ec.meanPredict(cp);
  // var emotionData = ec.getBlank();

  //var ec = new emotionClassifier();
  //ec.init(emotionModel);
  //emotionData = ec.getBlank();
  // console.log(er[3]);
  // console.log(er[0].value);

  showResults()

  prevPositions = positions;
}

function checkHighestEmotion(){
  
  // var highestEmotionValue = 0
  // var highestEmotionIndex = null;
  
  //for loop thru the 6 emotions
  
  	// if currentEmotion (i) > highestEmotionValue:
  		//	highestEmotionValue = currentEmotion (i)
  		// 	highestEmotionIndex = i
  
  // end for loop

  // play sound based on highestEmotionIndex
  
  
}

function showResults() {

  // console.log(er[0]);
  // console.log(er[1]);
  // console.log(er[2]);
  // console.log(er[3]);
  //fill(128 + sin(frameCount * 0.1) * 128);

  textSize(8);
  if (er[0] !== undefined) {
    angry = er[0].value * 300
  }
  if (er[1] !== undefined) {
    sad = er[1].value * 300
  }
  if (er[2] !== undefined) {
    surprised = er[2].value * 300
  }
  if (er[3] !== undefined) {
    happy = er[3].value * 300
  }
   if (er[4] !== undefined) {
    disgusted = er[4].value * 300
  }
   if (er[5] !== undefined) {
    fear = er[5].value * 300
  }

  fill(128+ sin(frameCount) * 128);
  ellipse(50, 50, angry);
  text('angry', 50, 150);

  fill(128+ sin(frameCount) * 128);
  ellipse(150, 50, sad);
  text('sad', 150, 150);

  fill(128+ sin(frameCount) * 128);
  ellipse(250, 50, surprised);
  text('surprised', 250, 150);


  fill(128 + sin(frameCount) * 128);
  ellipse(350, 50, happy);
  text('happy', 350, 150);
  //text
  fill(128+ sin(frameCount) * 128);
  ellipse(450, 50, disgusted);
  text('disguted', 450, 150);

  
  fill(128+ sin(frameCount) * 128);
  ellipse(550, 50, fear);
  text('fear', 550, 150);

  fill(255);
  textSize(10)
  text("To create, I destroyed myself;", 140, 340);
    text("I made myself external to such a degree within myself that within myself", 140, 360);
      text("I do not exist except in an external fashion.", 140, 380);
      text("I am the living setting in which several actors make entrances,", 140, 400);
      text("putting on several different plays.", 140, 420);
      text(": Fernando Pessoa, The Book of Disquiet", 140, 440);


  
  fill(255);
  if (mouseIsPressed) {
    stroke(254, 207, 192);
  } else {
    noStroke();
  }
  //textSize(12 + (mouseX / width)*72);
  textSize(60)
  text("death of self", 140, 300);
  soundFile.play();

}//make sure HTTPS is checked
var ctracker;
var videoInput;
var capture;

var emotionData;
// delete emotionModel['disgusted'];
// delete emotionModel['fear'];
var ec = new emotionClassifier();
// ec.init(emotionModel);
// var emotionData = ec.getBlank();
var angry, sad, happy, surprised, disgusted, fear = 0;
var soundFile;
//var p, peakCount;

var prevPosition = [];
// var tempPos = [];

function preload() {
  // ec = new emotionClassifier();
  // emotionData = ec.getBlank();
  ec.init(emotionModel);
  soundFile = loadSound('bgSound.mp3');

}

function setup() {
  createCanvas(690, 640);
  capture = createCapture(VIDEO);
  //capture.size(320, 240);
  capture.hide()
  // setup camera capture
  // videoInput = createCapture(VIDEO);
  // videoInput.size(600, 140);
  //videoInput.position(0, 0);
  //videoInput.addEventListener('canplay', enablestart, false);


  //hide video feed if you want
  //videoInput.hide();

  // setup canvas
  //var cnv = createCanvas(600, 340);
  //cnv.position(0, 0);

  // setup tracker

  // pModel.shapeModel.nonRegularizedVectors.push(9);
  // pModel.shapeModel.nonRegularizedVectors.push(11);
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(capture.elt);
  noStroke();


}

function draw() {

  background(0);
  drawCursor();
}

function drawCursor() {
  //rect(map(soundFile.currentTime(), 0, soundFile.duration(), 5, width), 0, 10, 10);
  push();
  translate(width, 0);
  scale(-1, 1);
  //background(245, 209, 198);

  //image(videoInput, 0, 0, width, height)
  //image(capture, 0, 0);

  // get array of face marker positions [x, y] format
  //scale(-1, 1);

  var positions = ctracker.getCurrentPosition();

  print(positions.length);
  for (var i = 0; i < positions.length; i++) {
    // draw ellipse at each position point
    if (prevPositions.length > 0) {
      prevPositions[i][0] = prevPositions[i][0] + (prevPositions[i][0] - positions[i][0]) / 10;
      prevPositions[i][1] = prevPositions[i][1] + (prevPositions[i][1] - positions[i][1]) / 10;
      ellipse(prevPositions[i][0], prevPositions[i][1], 5, 5);
    } else {
      // tempPos = positions;
    }

    fill(255, 255, 255);
  }

  pop();
  var cp = ctracker.getCurrentParameters();
  er = ec.meanPredict(cp);
  // var emotionData = ec.getBlank();

  //var ec = new emotionClassifier();
  //ec.init(emotionModel);
  //emotionData = ec.getBlank();
  // console.log(er[3]);
  // console.log(er[0].value);

  showResults()

  prevPositions = positions;
}

function checkHighestEmotion(){
  
  // var highestEmotionValue = 0
  // var highestEmotionIndex = null;
  
  //for loop thru the 6 emotions
  
  	// if currentEmotion (i) > highestEmotionValue:
  		//	highestEmotionValue = currentEmotion (i)
  		// 	highestEmotionIndex = i
  
  // end for loop

  // play sound based on highestEmotionIndex
  
  
}

function showResults() {

  // console.log(er[0]);
  // console.log(er[1]);
  // console.log(er[2]);
  // console.log(er[3]);
  //fill(128 + sin(frameCount * 0.1) * 128);

  textSize(8);
  if (er[0] !== undefined) {
    angry = er[0].value * 300
  }
  if (er[1] !== undefined) {
    sad = er[1].value * 300
  }
  if (er[2] !== undefined) {
    surprised = er[2].value * 300
  }
  if (er[3] !== undefined) {
    happy = er[3].value * 300
  }
   if (er[4] !== undefined) {
    disgusted = er[4].value * 300
  }
   if (er[5] !== undefined) {
    fear = er[5].value * 300
  }

  fill(128+ sin(frameCount) * 128);
  ellipse(50, 50, angry);
  text('angry', 50, 150);

  fill(128+ sin(frameCount) * 128);
  ellipse(150, 50, sad);
  text('sad', 150, 150);

  fill(128+ sin(frameCount) * 128);
  ellipse(250, 50, surprised);
  text('surprised', 250, 150);


  fill(128 + sin(frameCount) * 128);
  ellipse(350, 50, happy);
  text('happy', 350, 150);
  //text
  fill(128+ sin(frameCount) * 128);
  ellipse(450, 50, disgusted);
  text('disguted', 450, 150);

  
  fill(128+ sin(frameCount) * 128);
  ellipse(550, 50, fear);
  text('fear', 550, 150);

  fill(255);
  textSize(10)
  text("To create, I destroyed myself;", 140, 340);
    text("I made myself external to such a degree within myself that within myself", 140, 360);
      text("I do not exist except in an external fashion.", 140, 380);
      text("I am the living setting in which several actors make entrances,", 140, 400);
      text("putting on several different plays.", 140, 420);
      text(": Fernando Pessoa, The Book of Disquiet", 140, 440);


  
  fill(255);
  if (mouseIsPressed) {
    stroke(254, 207, 192);
  } else {
    noStroke();
  }
  //textSize(12 + (mouseX / width)*72);
  textSize(60)
  text("death of self", 140, 300);
  soundFile.play();

}//make sure HTTPS is checked
var ctracker;
var videoInput;
var capture;

var emotionData;
// delete emotionModel['disgusted'];
// delete emotionModel['fear'];
var ec = new emotionClassifier();
// ec.init(emotionModel);
// var emotionData = ec.getBlank();
var angry, sad, happy, surprised = 0;
var soundFile;
var p, peakCount;

var prevPosition = [];
// var tempPos = [];

function preload() {
  // ec = new emotionClassifier();
  // emotionData = ec.getBlank();
  ec.init(emotionModel);
  soundFile = loadSound('bgSound.mp3');

}

function setup() {
  createCanvas(690, 640);
  capture = createCapture(VIDEO);
  //capture.size(320, 240);
  capture.hide()
  // setup camera capture
  // videoInput = createCapture(VIDEO);
  // videoInput.size(600, 140);
  //videoInput.position(0, 0);
  //videoInput.addEventListener('canplay', enablestart, false);


  //hide video feed if you want
  //videoInput.hide();

  // setup canvas
  //var cnv = createCanvas(600, 340);
  //cnv.position(0, 0);

  // setup tracker

  // pModel.shapeModel.nonRegularizedVectors.push(9);
  // pModel.shapeModel.nonRegularizedVectors.push(11);
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(capture.elt);
  noStroke();


}

function draw() {
  soundFile.loop();
  background(0);
  push();
  translate(width, 0);
  scale(-1, 1);
  //background(245, 209, 198);

  //image(videoInput, 0, 0, width, height)
  //image(capture, 0, 0);

  // get array of face marker positions [x, y] format
  //scale(-1, 1);

  var positions = ctracker.getCurrentPosition();

  print(positions.length);
  for (var i = 0; i < positions.length; i++) {
    // draw ellipse at each position point
    if (prevPositions.length > 0) {
      prevPositions[i][0] = prevPositions[i][0] + (prevPositions[i][0] - positions[i][0]) / 10;
      prevPositions[i][1] = prevPositions[i][1] + (prevPositions[i][1] - positions[i][1]) / 10;
      ellipse(prevPositions[i][0], prevPositions[i][1], 5, 5);
    } else {
      // tempPos = positions;
    }

    // fill(255, 255, 255);
  }

  pop();
  var cp = ctracker.getCurrentParameters();
  er = ec.meanPredict(cp);
  // var emotionData = ec.getBlank();

  //var ec = new emotionClassifier();
  //ec.init(emotionModel);
  //emotionData = ec.getBlank();
  // console.log(er[3]);
  // console.log(er[0].value);

  showResults()

  prevPositions = positions;
}

function checkHighestEmotion(){
  
  // var highestEmotionValue = 0
																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																																															`  // var highestEmotionIndex = null;
  
  //for loop thru the 6 emotions
  
  	// if currentEmotion (i) > highestEmotionValue:
  		//	highestEmotionValue = currentEmotion (i)
  		// 	highestEmotionIndex = i
  
  // end for loop

  // play sound based on highestEmotionIndex
  
  
}

function showResults() {

  // console.log(er[0]);
  // console.log(er[1]);
  // console.log(er[2]);
  // console.log(er[3]);

  textSize(16);
  if (er[0] !== undefined) {
    angry = er[0].value * 300

    fill(246, 94, 93);
    ellipse(50, 280, angry);
    text(er[1].emotion, 50, 300);
  }
  if (er[1] !== undefined) {
    sad = er[1].value * 300
  }
  if (er[2] !== undefined) {
    surprised = er[2].value * 300
  }
  if (er[3] !== undefined) {
    happy = er[3].value * 300
  }


  fill(98, 207, 233);
  ellipse(150, 380, sad);
  //text('hopeless', 50, 400);

  fill(255, 218, 118);
  ellipse(250, 480, surprised);
  //text('surprised', 50, 500);


  fill(125, 233, 174);
  ellipse(350, 580, happy);
  //text('hopeful', 50, 600);
  //text
  
  

  fill(128 + sin(frameCount * 0.1) * 128);
  if (mouseIsPressed) {
    stroke(254, 207, 192);
  } else {
    noStroke();
  }
  //textSize(12 + (mouseX / width)*72);
  text("Recognize the truth of no-self", 100, 200);

}//make sure HTTPS is checked
var ctracker;
var videoInput;
var capture;

var emotionData;
// delete emotionModel['disgusted'];
// delete emotionModel['fear'];
var ec = new emotionClassifier();
// ec.init(emotionModel);
// var emotionData = ec.getBlank();
var angry, sad, happy, surprised, disgusted, fear = 0;
var soundFile;
var p, peakCount;

var prevPosition = [];
// var tempPos = [];

function preload() {
  // ec = new emotionClassifier();
  // emotionData = ec.getBlank();
  ec.init(emotionModel);
  soundFile = loadSound('Alan.mp3');

}

function setup() {
    soundFile.loop();
  createCanvas(690, 640);
  capture = createCapture(VIDEO);
  //capture.size(320, 240);
  capture.hide()
  // setup camera capture
  // videoInput = createCapture(VIDEO);
  // videoInput.size(600, 140);
  //videoInput.position(0, 0);
  //videoInput.addEventListener('canplay', enablestart, false);


  //hide video feed if you want
  //videoInput.hide();

  // setup canvas
  //var cnv = createCanvas(600, 340);
  //cnv.position(0, 0);

  // setup tracker

  // pModel.shapeModel.nonRegularizedVectors.push(9);
  // pModel.shapeModel.nonRegularizedVectors.push(11);
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(capture.elt);
  noStroke();


}

function draw() {
  background(254, 207, 192);
  push();
  translate(width, 0);
  scale(-1, 1);
  //background(245, 209, 198);

  //image(videoInput, 0, 0, width, height)
  //image(capture, 0, 0);

  // get array of face marker positions [x, y] format
  //scale(-1, 1);

  var positions = ctracker.getCurrentPosition();

  print(positions.length);
  for (var i = 0; i < positions.length; i++) {
    // draw ellipse at each position point
    if (prevPositions.length > 0) {
      prevPositions[i][0] = prevPositions[i][0] + (prevPositions[i][0] - positions[i][0]) / 10;
      prevPositions[i][1] = prevPositions[i][1] + (prevPositions[i][1] - positions[i][1]) / 10;
      fill(map(positions[i][0], width*0.33, width*0.66, 0, 255), map(positions[i][1], height*0.33, height*0.66, 0, 255), 255);
ellipse(prevPositions[i][0], prevPositions[i][1], 5, 5);
    } else {
      // tempPos = positions;
    }

    // fill(255, 255, 255);
  }

  pop();
  var cp = ctracker.getCurrentParameters();
  er = ec.meanPredict(cp);
  // var emotionData = ec.getBlank();

  //var ec = new emotionClassifier();
  //ec.init(emotionModel);
  //emotionData = ec.getBlank();
  // console.log(er[3]);
  // console.log(er[0].value);

  showResults()

  prevPositions = positions;
}

function checkHighestEmotion(){
  
  // var highestEmotionValue = 0
  // var highestEmotionIndex = null;
  
  //for loop thru the 6 emotions
  
  	// if currentEmotion (i) > highestEmotionValue:
  		//	highestEmotionValue = currentEmotion (i)
  		// 	highestEmotionIndex = i
  
  // end for loop

  // play sound based on highestEmotionIndex
  
  
}

function showResults() {

  console.log(er[0]);
  console.log(er[1]);
  console.log(er[2]);
  console.log(er[3]);
  console.log(er[4]);
  console.log(er[5]);
  //fill(128 + sin(frameCount * 0.1) * 128);

  textSize(8);
  if (er[0] !== undefined) {
    angry = er[0].value * 300
  }
  if (er[1] !== undefined) {
    sad = er[1].value * 300
  }
  if (er[2] !== undefined) {
    surprised = er[2].value * 300
  }
  if (er[3] !== undefined) {
    happy = er[3].value * 300
  }
   if (er[4] !== undefined) {
    disgusted = er[4].value * 300
  }
   if (er[5] !== undefined) {
    fear = er[5].value * 300, er[5].emotion
  }

  fill(255,255,255);
  ellipse(50, 50, angry);
  text('angry', 50, 50);

  fill(255,255,255);
  ellipse(150, 50, sad);
  text('sad', 150, 100);

  fill(255,255,255);
  ellipse(250, 50, surprised);
  text('surprised', 250, 150);


  fill(255,255,255);
  ellipse(350, 50, happy);
  text('happy', 350, 200);
  //text
  fill(255,255,255);
  ellipse(450, 50, disgusted);
  text('disgusted', 450, 250);

  
  fill(255,255,255);
  ellipse(550, 50, fear);
  text('fear', 550, 300);

  textSize(10)
  text("To create, I destroyed myself;", 140, 340);
    text("I made myself external to such a degree within myself that within myself", 140, 360);
      text("I do not exist except in an external fashion.", 140, 380);
      text("I am the living setting in which several actors make entrances,", 140, 400);
      text("putting on several different plays.", 140, 420);
      text(": Fernando Pessoa, The Book of Disquiet", 140, 440);


  
  
  }
  //textSize(12 + (mouseX / width)*72);
  //textSize(60)
  //text("death of self", 140, 300);
//make sure HTTPS is checked
var ctracker;
var videoInput;
var capture;
var ec, emotionData;
delete emotionModel['disgusted'];
delete emotionModel['fear'];
var ec = new emotionClassifier();
ec.init(emotionModel);
var emotionData = ec.getBlank();
var soundFile;
var p, peakCount;
var angry = 0;

function preload() {
  ec = new emotionClassifier();
  emotionData = ec.getBlank();
  ec.init(emotionModel);
  soundFile = loadSound('bgSound1.mp3');

}

function setup() {
  soundFile.loop();
  createCanvas(690, 640);
  capture = createCapture(VIDEO);
  //capture.size(320, 240);
  capture.hide()
  // setup camera capture
  // videoInput = createCapture(VIDEO);
  // videoInput.size(600, 140);
  // videoInput.position(0, 0);
  // videoInput.addEventListener('canplay', enablestart, false);


  //hide video feed if you want
  // videoInput.hide();

  // setup canvas
  // var cnv = createCanvas(600, 340);
  // cnv.position(0, 0);

  // setup tracker

  pModel.shapeModel.nonRegularizedVectors.push(9);
  pModel.shapeModel.nonRegularizedVectors.push(11);
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(capture.elt);
  noStroke();
}

function draw() {
  background(254, 207, 192);
  drawCursor();
}

function drawCursor() {
  rect(map(soundFile.currentTime(), 0, soundFile.duration(), 5, width), 0, 10, 10);

  // Keyboard Controls
  function keyTyped() {
    if (soundFile.isPlaying()) {
      soundFile.pause();
    } else {
      soundFile.play();
    }
  }

  //background(245, 209, 198);

  //image(videoInput, 0, 0, width, height)
  // image(capture, 0, 0, 320, 240);

  // get array of face marker positions [x, y] format
  var positions = ctracker.getCurrentPosition();

  for (var i = 0; i < positions.length; i++) {
    ellipse(positions[i][0], positions[i][1], 5, 5);
  }
  var cp = ctracker.getCurrentParameters();
  var er = ec.meanPredict(cp);
  var emotionData = ec.getBlank();


  //var ec = new emotionClassifier();
  //ec.init(emotionModel);
  //emotionData = ec.getBlank();
  //console.log(er[3]);
  //console.log(er[0].value);

  showResults(er)
}


function showResults(er) {

  console.log(er[0]);
  console.log(er[1]);
  console.log(er[2]);
  console.log(er[3]);
  textSize(16);
  

  
  console.log(angry);
  fill(246, 94, 93);
  rect(20, 280, angry, 35);
  fill(255);
  text("Angry", 50, 300);

  // fill(98, 207, 233);
  // rect(20, 380, er[1].value * 1000, 35);
  // fill(255);
  // text(er[1].emotion, 50, 400);

//   fill(255, 218, 118);
//   rect(20, 480, er[2].value * 1000, 35);
//   fill(255);
//   text(er[2].emotion, 50, 500);


//   fill(125, 233, 174);
//   rect(20, 580, er[3].value * 1000, 35);
//   fill(255);
//   text(er[3].emotion, 50, 600);

}//make sure HTTPS is checked
var ctracker;
var videoInput;
var capture;

var ec, emotionData;
delete emotionModel['disgusted'];
delete emotionModel['fear'];
var ec = new emotionClassifier();
ec.init(emotionModel);
var emotionData = ec.getBlank();
var angry, sad, happy, surprised = 0;
var soundFile;
var p, peakCount;

function preload() {
  ec = new emotionClassifier();
  emotionData = ec.getBlank();
  ec.init(emotionModel);
    soundFile = loadSound('bgSound.mp3');

}

function setup() {
  createCanvas(690, 640);
  capture = createCapture(VIDEO);
  //capture.size(320, 240);
  capture.hide()
  // setup camera capture
  // videoInput = createCapture(VIDEO);
  // videoInput.size(600, 140);
  //videoInput.position(0, 0);
  //videoInput.addEventListener('canplay', enablestart, false);


  //hide video feed if you want
  //videoInput.hide();

  // setup canvas
  //var cnv = createCanvas(600, 340);
  //cnv.position(0, 0);

  // setup tracker

  pModel.shapeModel.nonRegularizedVectors.push(9);
  pModel.shapeModel.nonRegularizedVectors.push(11);
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(capture.elt);
 noStroke();
    

}

function draw() {
    soundFile.loop();
  background(254, 207, 192);
  //background(245, 209, 198);
  
  //image(videoInput, 0, 0, width, height)
  //image(capture, 0, 0, 320, 240);

  // get array of face marker positions [x, y] format
    //scale(-1, 1);

var positions = ctracker.getCurrentPosition();
  for (var i = 0; i < positions.length; i++) {
    // draw ellipse at each position point
    ellipse(positions[i][0], positions[i][1], 5, 5);
    fill(255,255,255);

  }
  var cp = ctracker.getCurrentParameters();
  var er = ec.meanPredict(cp);
  var emotionData = ec.getBlank();

  //var ec = new emotionClassifier();
  //ec.init(emotionModel);
  //emotionData = ec.getBlank();
  // console.log(er[3]);
    // console.log(er[0].value);

    showResults(er)
scale(-1, 1);
}

function showResults(er) {

  console.log(er[0]);
  console.log(er[1]);
  console.log(er[2]);
  console.log(er[3]);
  
  textSize(16);
  if(er[0] !== undefined){
    angry = er[0].value*300
    sad = er[1].value*300
    surprised = er[2].value*300
    happy = er[3].value*300
  
      fill(246,94,93);
			ellipse(50, 280, angry);
       text('angry', 50, 300);
    
      fill(98,207,233);
			ellipse(150, 380, sad);
        	text('hopeless', 50, 400);

      fill(255,218,118);
			ellipse(250, 480, surprised);
        	text('surprised', 50, 500);

    
    	fill(125,233,174);
			ellipse(350, 580, happy);
        text('hopeful', 50, 600);
  
  }
}var soundtrack;
var playbutton, stopbutton;
var analyzer;
 
function preload() 
{
  soundtrack = loadSound('Note2.mp3');
}
 
function setup() 
{
  createCanvas(400, 400);
  
  // loop sound
  soundtrack.loop();
  
  // stop sound to prevent it from playing automatically
  soundtrack.stop();
  
  // play button
  playbutton = createButton('Play');
  playbutton.position(25, 25);
  playbutton.mousePressed(playsound);
  
  // stop button
  stopbutton = createButton('Stop');
  stopbutton.position(75, 25);
  stopbutton.mousePressed(stopsound);
  
  // music visualizer
  analyzer = new p5.Amplitude();
  analyzer.setInput(soundtrack);
}
 
function draw()
{
  //background(255);
  
  // draw an ellipse based on current volume level
  var vol = analyzer.getLevel();
  noStroke();
  fill(255, 0, 0);
  ellipse(width/2, height/2, map(vol, 0, 1, 0, width), map(vol, 0, 1, 0, height));
    
}
 
function playsound() 
{
  if(soundtrack.isPlaying() == false) 
  {
    soundtrack.play();
  } 
}
 
function stopsound() 
{
  if(soundtrack.isPlaying() == true) 
  {
    soundtrack.pause();
  } 
}//make sure HTTPS is checked
var ctracker;
var videoInput;
var capture;
var ec, emotionData;
delete emotionModel['disgusted'];
delete emotionModel['fear'];
var ec = new emotionClassifier();
ec.init(emotionModel);
var emotionData = ec.getBlank();
var soundFile;
var p, peakCount;
var angry = 0;

function preload() {
  ec = new emotionClassifier();
  emotionData = ec.getBlank();
  ec.init(emotionModel);
  soundFile = loadSound('bgSound1.mp3');

}

function setup() {
  soundFile.loop();
  createCanvas(690, 640);
  capture = createCapture(VIDEO);
  //capture.size(320, 240);
  capture.hide()
  // setup camera capture
  // videoInput = createCapture(VIDEO);
  // videoInput.size(600, 140);
  // videoInput.position(0, 0);
  // videoInput.addEventListener('canplay', enablestart, false);


  //hide video feed if you want
  // videoInput.hide();

  // setup canvas
  // var cnv = createCanvas(600, 340);
  // cnv.position(0, 0);

  // setup tracker

  pModel.shapeModel.nonRegularizedVectors.push(9);
  pModel.shapeModel.nonRegularizedVectors.push(11);
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(capture.elt);
  noStroke();
}

function draw() {
  background(254, 207, 192);
  drawCursor();
}

function drawCursor() {
  rect(map(soundFile.currentTime(), 0, soundFile.duration(), 5, width), 0, 10, 10);

  // Keyboard Controls
  function keyTyped() {
    if (soundFile.isPlaying()) {
      soundFile.pause();
    } else {
      soundFile.play();
    }
  }

  //background(245, 209, 198);

  //image(videoInput, 0, 0, width, height)
  // image(capture, 0, 0, 320, 240);

  // get array of face marker positions [x, y] format
  var positions = ctracker.getCurrentPosition();

  for (var i = 0; i < positions.length; i++) {
    ellipse(positions[i][0], positions[i][1], 5, 5);
  }
  var cp = ctracker.getCurrentParameters();
  var er = ec.meanPredict(cp);
  var emotionData = ec.getBlank();


  //var ec = new emotionClassifier();
  //ec.init(emotionModel);
  //emotionData = ec.getBlank();
  //console.log(er[3]);
  //console.log(er[0].value);

  showResults(er)
}


function showResults(er) {

  console.log(er[0]);
  console.log(er[1]);
  console.log(er[2]);
  console.log(er[3]);
  textSize(16);
  
  if (er[0] !== undefined || er[0] !== NaN) {
    angry = er[0].value * 1000;
  }

  
  // console.log(angry);
  // fill(246, 94, 93);
  // rect(20, 280, er[0].value * 1000, 35);
  // fill(255);
  // text("Angry", 50, 300);

  // fill(98, 207, 233);
  // rect(20, 380, er[1].value * 1000, 35);
  // fill(255);
  // text(er[1].emotion, 50, 400);

//   fill(255, 218, 118);
//   rect(20, 480, er[2].value * 1000, 35);
//   fill(255);
//   text(er[2].emotion, 50, 500);


//   fill(125, 233, 174);
//   rect(20, 580, er[3].value * 1000, 35);
//   fill(255);
//   text(er[3].emotion, 50, 600);

}//make sure HTTPS is checked
var ctracker;
var videoInput;
var capture;
var ec, emotionData;
delete emotionModel['disgusted'];
delete emotionModel['fear'];
var ec = new emotionClassifier();
ec.init(emotionModel);
var emotionData = ec.getBlank();


function preload() {
  ec = new emotionClassifier();
  emotionData = ec.getBlank();
  ec.init(emotionModel);

}
function setup() {
  createCanvas(690, 640);
  capture = createCapture(VIDEO);
  //capture.size(320, 240);
  capture.hide()
  // setup camera capture
  // videoInput = createCapture(VIDEO);
  // videoInput.size(600, 140);
  // videoInput.position(0, 0);
  // videoInput.addEventListener('canplay', enablestart, false);


  //hide video feed if you want
  // videoInput.hide();

  // setup canvas
  // var cnv = createCanvas(600, 340);
  // cnv.position(0, 0);

  // setup tracker

  pModel.shapeModel.nonRegularizedVectors.push(9);
  pModel.shapeModel.nonRegularizedVectors.push(11);
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(capture.elt);
 noStroke();
}

function draw() {
  background(254, 207, 192);
  //background(245, 209, 198);
  
  //scale(-1, 1);
  //image(videoInput, 0, 0, width, height)
  //image(capture, 0, 0, 320, 240);

  // get array of face marker positions [x, y] format
  var positions = ctracker.getCurrentPosition();

  for (var i = 0; i < positions.length; i++) {
    ellipse(positions[i][0], positions[i][1], 5, 5);
  }
  var cp = ctracker.getCurrentParameters();
  var er = ec.meanPredict(cp);
  var emotionData = ec.getBlank();


  //var ec = new emotionClassifier();
  //ec.init(emotionModel);
  //emotionData = ec.getBlank();
  //console.log(er[3]);
  //console.log(er[0].value);

    showResults(er)

}

function showResults(er) {

  // console.log(er)
  textSize(16);
  if(er[0] !== undefined){
  
      fill(246,94,93);
		rect(20, 280, er[0].value*1000,35);
          fill(255);
       text(er[0].emotion, 50, 300);
    
      fill(98,207,233);
			rect(20, 380, er[1].value*1000,35);
    fill(255);
        	text(er[1].emotion, 50, 400);

      fill(255,218,118);
			rect(20, 480, er[2].value*1000, 35);
    fill(255);
        	text(er[2].emotion, 50, 500);

    
    	fill(125,233,174);
			rect(20, 580, er[3].value*1000, 35);
    fill(255);
        text(er[3].emotion, 50, 600);
  
  }
  fill(238,231,244);
}//make sure HTTPS is checked
var ctracker;
var videoInput;
var capture;
var soundFile;

// var ec, emotionData;
delete emotionModel['disgusted'];
delete emotionModel['fear'];
var ec = new emotionClassifier();
ec.init(emotionModel);
var emotionData = ec.getBlank();

function preload() {
  ec = new emotionClassifier();
  emotionData = ec.getBlank();
  ec.init(emotionModel);
}

function setup() {
  createCanvas(690, 640);
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  capture.hide()
  // setup camera capture
  // videoInput = createCapture(VIDEO);
  // videoInput.size(600, 140);
  // videoInput.position(0, 0);
  // videoInput.addEventListener('canplay', enablestart, false);


  //hide video feed if you want
  // videoInput.hide();

  // setup canvas
  // var cnv = createCanvas(600, 340);
  // cnv.position(0, 0);

  // setup tracker

  pModel.shapeModel.nonRegularizedVectors.push(9);
  pModel.shapeModel.nonRegularizedVectors.push(11);
  ctracker = new clm.tracker();
  ctracker.init(pModel);

  ctracker.start(capture.elt);

  noStroke();
}

function draw() {
  background(254, 207, 192);
  

  
  // scale(-1, 1);
  // image(videoInput, 0, 0, width, height)
  image(capture, 0, 0, 320, 240);

  // get array of face marker positions [x, y] format
  var positions = ctracker.getCurrentPosition();

  for (var i = 0; i < positions.length; i++) {
    // draw ellipse at each position point
    ellipse(positions[i][0], positions[i][1], 5, 5);
  }
  var cp = ctracker.getCurrentParameters();
  var er = ec.meanPredict(cp);
  // var emotionData = ec.getBlank();

  // var ec = new emotionClassifier();
  // ec.init(emotionModel);
  // emotionData = ec.getBlank();
  // console.log(er[3]);
    // console.log(er[0].value);

    showResults(er)



}

function showResults(er) {

  // console.log(er)
  
  textSize(24);
  if(er[0] !== undefined){
      text(er[0].emotion, 50, 300);
			rect(0, 300, er[0].value*1000, 30);
    fill(0);
    	text(er[1].emotion, 50, 400);
			rect(0, 400, er[1].value*1000, 30);
    fill(210,245,217);
    text(er[2].emotion, 50, 500);
			rect(0, 500, er[1].value*1000, 30);
     fill(230,207,200);
     text(er[3].emotion, 50, 600);
			rect(0, 600, er[1].value*1000, 30);
      fill(0,255,30);
  
  }
  fill(255,255,255);

}//make sure HTTPS is checked
var ctracker;
var videoInput;
var capture;

// var ec, emotionData;
delete emotionModel['disgusted'];
delete emotionModel['fear'];
var ec = new emotionClassifier();
ec.init(emotionModel);
var emotionData = ec.getBlank();

function preload() {
  ec = new emotionClassifier();
  emotionData = ec.getBlank();
  ec.init(emotionModel);
}

function setup() {
  createCanvas(690, 640);
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  capture.hide()
  // setup camera capture
  // videoInput = createCapture(VIDEO);
  // videoInput.size(600, 140);
  // videoInput.position(0, 0);
  // videoInput.addEventListener('canplay', enablestart, false);


  //hide video feed if you want
  // videoInput.hide();

  // setup canvas
  // var cnv = createCanvas(600, 340);
  // cnv.position(0, 0);

  // setup tracker

  pModel.shapeModel.nonRegularizedVectors.push(9);
  pModel.shapeModel.nonRegularizedVectors.push(11);
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(capture.elt);
 noStroke();
}

function draw() {
  background(254, 207, 192);
  //background(245, 209, 198);
  
  // scale(-1, 1);
  // image(videoInput, 0, 0, width, height)
  image(capture, 0, 0, 320, 240);

  // get array of face marker positions [x, y] format
  var positions = ctracker.getCurrentPosition();

  for (var i = 0; i < positions.length; i++) {
    // draw ellipse at each position point
    ellipse(positions[i][0], positions[i][1], 5, 5);
  }
  var cp = ctracker.getCurrentParameters();
  var er = ec.meanPredict(cp);
  // var emotionData = ec.getBlank();

  // var ec = new emotionClassifier();
  // ec.init(emotionModel);
  // emotionData = ec.getBlank();
  // console.log(er[3]);
    // console.log(er[0].value);

    showResults(er)



}

function showResults(er) {

  // console.log(er)
  
  textSize(16);
  if(er[0] !== undefined){
  
      fill(246,94,93);
			ellipse(50, 280, er[0].value*1000);
          fill(255);
       text(er[0].emotion, 50, 300);
    
      fill(98,207,233);
			rect(20, 380, er[1].value*1000, 35);
    fill(255);
        	text(er[1].emotion, 50, 400);

      fill(255,218,118);
			rect(20, 480, er[1].value*1000, 35);
    fill(255);
        	text(er[2].emotion, 50, 500);

    
    	fill(125,233,174);
			rect(20, 580, er[1].value*1000, 35);
    fill(255);
        text(er[3].emotion, 50, 600);
  
  }
  fill(255,255,255);

}//make sure HTTPS is checked
var ctracker;
var videoInput;

// var ec, emotionData;
delete emotionModel['disgusted'];
delete emotionModel['fear'];
var ec = new emotionClassifier();
ec.init(emotionModel);
var emotionData = ec.getBlank();

function preload() {
  ec = new emotionClassifier();
  emotionData = ec.getBlank();
  ec.init(emotionModel);
}

function setup() {

  // setup camera capture
  videoInput = createCapture(VIDEO);
  videoInput.size(600, 140);
  // videoInput.position(0, 0);
  // videoInput.addEventListener('canplay', enablestart, false);


  //hide video feed if you want
  videoInput.hide();

  // setup canvas
  var cnv = createCanvas(600, 340);
  // cnv.position(0, 0);

  // setup tracker

  pModel.shapeModel.nonRegularizedVectors.push(9);
  pModel.shapeModel.nonRegularizedVectors.push(11);
  ctracker = new clm.tracker();
  ctracker.init(pModel);

  ctracker.start(videoInput.elt);

  noStroke();
}

function draw() {
  // background(254,127, 156);
  translate(videoInput.width, 0);
  scale(-1, 1);
  image(videoInput, 0, 0, width, 100)
  // get array of face marker positions [x, y] format
  var positions = ctracker.getCurrentPosition();

  for (var i = 0; i < positions.length; i++) {
    // draw ellipse at each position point
    ellipse(positions[i][0], positions[i][1], 5, 5);
  }
  var cp = ctracker.getCurrentParameters();
  var er = ec.meanPredict(cp);
  // var emotionData = ec.getBlank();

  // var ec = new emotionClassifier();
  // ec.init(emotionModel);
  // emotionData = ec.getBlank();
  // console.log(er[3]);
    
	setTimeout(function(){

		textSize(32);
    text('word', 100, 130);
    fill(0, 102, 153);
    console.log(er[0].value); 
  
  }, 3000);


}//make sure HTTPS is checked
var ctracker;
var videoInput;
function setup() {

  // setup camera capture
  videoInput = createCapture(VIDEO);
  videoInput.size(600, 340);
  videoInput.position(0, 0);
  
  //hide video feed if you want
  videoInput.hide();
  
  // setup canvas
  var cnv = createCanvas(600, 340);
  cnv.position(0, 0);

  // setup tracker
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(videoInput.elt);

  noStroke();
}

function draw() {
  // background(255);
  translate(videoInput.width, 0);
  scale(-1,1);
  image(videoInput,0,0,width,height)
  // get array of face marker positions [x, y] format
  var positions = ctracker.getCurrentPosition();
  
  for (var i=0; i<positions.length; i++) {
    // set the color of the ellipse based on position on screen
    fill(map(positions[i][0], width*0.33, width*0.66, 0, 255), map(positions[i][1], height*0.33, height*0.66, 0, 255), 255);
    // draw ellipse at each position point
    ellipse(positions[i][0], positions[i][1], 5, 5);
    //add lines to connect points
    /*
    strokeWeight(3);
    stroke(map(positions[i][0], width*0.33, width*0.66, 0, 255), map(positions[i][1], height*0.33, height*0.66, 0, 255), 255);
    if(i<positions.length-1){
      line(positions[i][0], positions[i][1],positions[i+1][0], positions[i+1][1]);
      } else {
      line(positions[i][0], positions[i][1],positions[0][0], positions[0][1]);
      }
      */
    }
    
  //comment loop above and uncomment below to 
  // follow the nose
  /*
  fill(255,0,0);
  
  //make sure that the array is there
  if(positions.length > 0)
  {
  var noseX = positions[37][0]; 
var noseY = positions[37][1];
  ellipse(noseX, noseY, 100, 100);
  }
  */
}//make sure HTTPS is checked
var ctracker;
var videoInput;
function setup() {

  // setup camera capture
  videoInput = createCapture(VIDEO);
  videoInput.size(600, 340);
  videoInput.position(0, 0);
  
  //hide video feed if you want
  videoInput.hide();
  
  // setup canvas
  var cnv = createCanvas(600, 340);
  cnv.position(0, 0);

  // setup tracker
  ctracker = new clm.tracker();
  ctracker.init(pModel);
  ctracker.start(videoInput.elt);

  noStroke();
}

function draw() {
  // background(255);
  translate(videoInput.width, 0);
  scale(-1,1);
  image(videoInput,0,0,width,height)
  // get array of face marker positions [x, y] format
  var positions = ctracker.getCurrentPosition();
  
  for (var i=0; i<positions.length; i++) {
    // set the color of the ellipse based on position on screen
    fill(map(positions[i][0], width*0.33, width*0.66, 0, 255), map(positions[i][1], height*0.33, height*0.66, 0, 255), 255);
    // draw ellipse at each position point
    ellipse(positions[i][0], positions[i][1], 5, 5);
    //add lines to connect points
    /*
    strokeWeight(3);
    stroke(map(positions[i][0], width*0.33, width*0.66, 0, 255), map(positions[i][1], height*0.33, height*0.66, 0, 255), 255);
    if(i<positions.length-1){
      line(positions[i][0], positions[i][1],positions[i+1][0], positions[i+1][1]);
      } else {
      line(positions[i][0], positions[i][1],positions[0][0], positions[0][1]);
      }
      */
    }
    
  //comment loop above and uncomment below to 
  // follow the nose
  /*
  fill(255,0,0);
  
  //make sure that the array is there
  if(positions.length > 0)
  {
  var noseX = positions[37][0]; 
var noseY = positions[37][1];
  ellipse(noseX, noseY, 100, 100);
  }
  */
}var playing = false;
var song;
var button;

function preload(){
  song2 = loadSound('Survivor.mp3');
}

function setup() {
   song = loadSound('YOU GOT THIS.mp3');
  // song2 = loadSound('Survivor.mp3');
  button = createButton('play');
  //button.mousePressed(song); // attach button listener
  song2.play();
  createCanvas(720, 200);
  background(255,0,0);
}

function mousePressed() {
  if (song.isPlaying() ) { // .isPlaying() returns a boolean
    song.stop();
    background(255,0,0);
  } else {
    song.play();
    background(0,255,0);
  }
}


// plays or pauses the video depending on current state
function song() {
  if (playing) {
    song.pause();
    button.html('play');
  } else {
    song2.loop();
    button.html('pause');
  }
  playing = !playing;
}
.typewriter h1 {
  overflow: hidden; /* Ensures the content is not revealed until the animation */
  border-right: .15em solid orange; /* The typwriter cursor */
  white-space: nowrap; /* Keeps the content on a single line */
  margin: 0 auto; /* Gives that scrolling effect as the typing happens */
  letter-spacing: .15em; /* Adjust as needed */
  animation: 
    typing 3.5s steps(40, end),
    blink-caret .75s step-end infinite;
}

/* The typing effect */
@keyframes typing {
  from { width: 0 }
  to { width: 100% }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: orange; }
}function setup() {
  createCanvas(500,500);
}

function draw() {
	background(195,69,36);
	//colorMode (HSB);
	noStroke(0);
	

	let sinVal = sin(radians(frameCount));
	//fill(239,212,182);
	
	let freq = sin(radians(frameCount)) * 2;
	let speed = 0.1;
	let amp = cos(radians(frameCount)) * 15 + 15;

	for(let i = 0; i< width; i += 5){
		
		let y = sin(radians(i + frameCount * speed) * freq) * amp;
		
		let absY = -abs(y);
		
		let dia = map(y, -amp, amp, 10,3);
		
		let startNum = 50;
		let endNum = 100;
		
		let range = endNum - startNum
		let hueVal = map(y, -amp, amp, 10, 3);
				
		fill(range, random, 30);
		ellipse (i, height /2 + y, dia, 3);
			y = sin(radians (i + frameCount * speed + 80) * freq)*amp;

		ellipse (i, height /2 + absY, 2, dia);
	}
	//line(0, height /2, width, height /2);
	
}var myFont, audio01, data;
var isPlaying = false;
var myAudios = [];
var song, analyzer;

function preload() {
  myFont = loadFont('/Roboto-Medium.ttf');
  data = loadJSON('data.json');
  song = loadSound('Love.mp3');

  //audio01 = loadSound('recitelove.mp3');
  //audio02 = loadSound('first-caption.mp3');

}

let startTime, currentTime;

function setup() {
createCanvas(400, 400);
  startTime = millis();
  //myAudios = [audio01]
  textSize(12);
  textFont(myFont);
      song.play();


  // console.log(myAudios)
}

function draw() {
  currentTime = millis();
  background(195,69,36);  
  
 

  //text(startTime, 10, 100);
  //text(currentTime, 10, 200);

  if (currentTime - startTime > 4000) {
    startTime = startTime + 1999;
  }
  for (i = 0; i < data.data.length; i++) {
    if (currentTime > data.data[i].timeStart && currentTime < data.data[i].timeEnd) {
      text(data.data[i].caption, 70, 100+i*5);}
}
      
    //   if (!isPlaying) {
    //     for (a = 0; a < myAudios.length; a++) {
    //       myAudios[a].play()
    //     }
    //     isPlaying = true;
    //   }
    // } else {
    //   isPlaying = false;
    // }
    
    // Waves
// Get the average (root mean square) amplitude
	noStroke();
	let sinVal = sin(radians(frameCount));
	//fill(239,212,182);
	
	let freq = sin(radians(frameCount)) * 2;
	let speed = 0.1;
	let amp = cos(radians(frameCount)) * 15 + 15;

	for(let i = 0; i< width; i += 5){
		
		let y = sin(radians(i + frameCount * speed) * freq) * amp;
		
		let absY = -abs(y);
		
		let dia = map(y, -amp, amp, 10,3);
		
		let startNum = 50;
		let endNum = 100;
		
		let range = endNum - startNum
		let hueVal = map(y, -amp, amp, 10, 3);
				
		fill(range, random, 30);
		ellipse (i, height /2 + y, dia, 3);
			y = sin(radians (i + frameCount * speed + 80) * freq)*amp;

		ellipse (i, height /2 + absY, 2, dia);
  }
 function keyTyped() {
  if (key == 'p') {
    song.pause();
  }
}

function keyReleased() {
  if (key == 'p') {
   song.play();
  }}}var serial; // variable to hold an instance of the serialport library
var fromSerial = 0;
var blink = 0; 

var counter = 0; 
var narration = ["> The enemy is on the move.", "> Stay alert."]

var knob1; 
var knob2; 
var knob3; 

var comms;

class Knob {

  constructor(x, y){
  
    // center of knob
    this.x = x;
    this.y = y;
  
  }
  
  display(){
    
    //stroke(200);
    
    fill(100);
    //ellipse(this.x+7, this.y+7, 55, 55);
    
    fill(200);
  	//ellipse(this.x, this.y, 55, 55);
    
    fill(150);
    ellipse(this.x+ 13, this.y+13, 10, 10); 
  }

}

class Screen {

  constructor(x, y){
  
    // center of knob
    this.x = x;
    this.y = y;
    this.message = "I had this thought the other day that before I die."; 
  
  }
  
  display(){
    
    stroke(200);
    
    var screenWidth = 300; 
    var screenHeight = 150; 
    var margin = 10; 
    
    fill(239,212,182);
  	rect(this.x, this.y, screenWidth, screenHeight);
    
    fill(50);
    rect(this.x+10, this.y+10, screenWidth-2*margin, screenHeight-2*margin);
    
    noStroke();
    fill(239,212,182);
    text(this.message, this.x + 20, this.y + 30);

 
  }
  
  update(){
    
    this.message = narration[counter]; 
    counter++;
  }
  
}

function setup() {
  createCanvas(800, 600);
  
  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
	serial.on('data', serialEvent); // callback for new data coming in	
	serial.list(); // list the serial ports
	serial.open("/dev/cu.usbmodem1411");
  
  knob1 = new Knob(56, 46);
  knob2 = new Knob(126, 46);
  knob3 = new Knob(196, 46);
  
  comms = new Screen(30, 100);

}

function mouseClicked() {
  comms.update();
  // prevent default
  return false;
}

function draw() {
  
  background(195,69,36);
  
  knob1.display();
  knob2.display();
  knob3.display();
  comms.display();
   
  if (fromSerial == 1) {
    
    // trigger choice A function
  
  } else if (fromSerial == 2) {
    
    // trigger choice B function
  
  } else if (fromSerial > 2) {
  
    // game over
  
  }
}

function serialEvent() {

  var stringFromSerial = serial.readLine();
  if (stringFromSerial.length>0){
    var trimmedString = trim(stringFromSerial);
    fromSerial= Number(trimmedString);
  }
  console.log(fromSerial);
}var img;
var myVoice = new p5.Speech('Google UK English Male', speechLoaded); // new P5.Speech object

//myVoice.onLoad = speechLoaded; // could do it this way
myVoice.onStart = speechStarted;
myVoice.onPause = speechPaused; // not working
myVoice.onResume = speechResumed; // not working
myVoice.onEnd = speechEnded;

var lyric = "How happy is the blameless vestal's lot! The world forgetting, by the world forgot. Eternal sunshine of the spotless mind! Each prayer accepted, and each wish resigned.";

var speakbutton; // UI

function setup() {
  createCanvas(400, 400);
  img = loadImage("her.jpg");

  // button:
  speakbutton = createButton('Theodore, talk to me');
  speakbutton.position(180, 200);
  speakbutton.mousePressed(buttonClicked);
}

function draw() {
  // why draw when you can click?
}

function buttonClicked() {
  print('clicked');
  
  if (speakbutton.elt.innerHTML == 'Theodore, talk to me') {
    myVoice.speak(lyric)
    print('test');
  } else if (speakbutton.elt.innerHTML == 'Pause') myVoice.pause(); // not working
  else if (speakbutton.elt.innerHTML == 'Resume') myVoice.resume(); // not working
  else if (speakbutton.elt.innerHTML == 'Stop') myVoice.stop();
}

function speechLoaded() {
  print('loaded');
  // say cheers:
  myVoice.speak("I miss you");
}

function speechStarted() {
  background(0, 255, 0);
  speakbutton.elt.innerHTML = 'Stop';
}

// not working...
function speechPaused() {
  background(0, 255, 0);
  speakbutton.elt.innerHTML = 'Resume';
}

// not working...
function speechResumed() {
  background(0, 255, 0);
  speakbutton.elt.innerHTML = 'Pause';
}

function speechEnded() {
  background(255, 0, 0);
  speakbutton.elt.innerHTML = 'Speak';
}
//image(img, 0, 0);var myVoice = new p5.Speech(); // new P5.Speech object
var menuLoaded = 0;
var label, input, checkbox, speakbutton, vslider, rslider, pslider; // UI
function setup() {
  // input dialog:
  input = createInput("type something");
  //input.style("width", 400);
  input.position(20, 65);
  // checkbox:
  checkbox = createInput(0, 1, 0);
  checkbox.attribute("type", "checkbox");
  checkbox.style("width", "15px");
  checkbox.style("height", "15px");
  checkbox.position(100, 100);
  // button:
  speakbutton = createButton('Speak');
  speakbutton.position(20, 100);
  speakbutton.mousePressed(doSpeak);
  // sliders:
  vslider = createSlider(0., 100., 100.);
  vslider.position(20, 140);
  vslider.mouseReleased(setVolume);
  rslider = createSlider(10., 200., 100.);
  rslider.position(20, 160);
  rslider.mouseReleased(setRate);
  pslider = createSlider(1., 200., 100.);
  pslider.position(20, 180);
  pslider.mouseReleased(setPitch);
  // labels:
  label = createDiv("say something:");
  label.position(20, 40);
  label = createDiv("interrupt?");
  label.position(125, 100);
  label = createDiv("volume");
  label.position(160, 140);
  label = createDiv("rate");
  label.position(160, 160);
  label = createDiv("pitch");
  label.position(160, 180);
  // say hello:
  myVoice.speak(input.value());
}

function setVolume() {
  myVoice.setVolume(vslider.value() / 100.);
}

function setRate() {
  myVoice.setRate(rslider.value() / 100.);
}

function setPitch() {
  myVoice.setPitch(pslider.value() / 100.);
}

function draw() {
  // why draw when you can click?
}

function doSpeak() {
  myVoice.interrupt = checkbox.elt.checked;
  myVoice.speak(input.value()); // debug printer for voice options
}// Declare a "SerialPort" object
var serial;
var latestData = "waiting for data";  // you'll use this to write incoming data to the canvas

var tenData = [];

function setup() {
  createCanvas(500, 300);

  // Instantiate our SerialPort object
  serial = new p5.SerialPort();

  // Get a list the ports available
  // You should have a callback defined to see the results
  serial.list();

  // Assuming our Arduino is connected, let's open the connection to it
  // Change this to the name of your arduino's serial port
  serial.open("/dev/cu.usbmodem1411");

  // Here are the callbacks that you can register

  // When we connect to the underlying server
  serial.on('connected', serverConnected);

  // When we get a list of serial ports that are available
  serial.on('list', gotList);
  // OR
  //serial.onList(gotList);

  // When we some data from the serial port
  serial.on('data', gotData);
  // OR
  //serial.onData(gotData);

  // When or if we get an error
  serial.on('error', gotError);
  // OR
  //serial.onError(gotError);

  // When our serial port is opened and ready for read/write
  serial.on('open', gotOpen);
  // OR
  //serial.onOpen(gotOpen);

  // Callback to get the raw data, as it comes in for handling yourself
  //serial.on('rawdata', gotRawData);
  // OR
  //serial.onRawData(gotRawData);
}

// We are connected and ready to go
function serverConnected() {
  println("Connected to Server");
}

// Got the list of ports
function gotList(thelist) {
  println("List of Serial Ports:");
  // theList is an array of their names
  for (var i = 0; i < thelist.length; i++) {
    // Display in the console
    println(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  println("Serial Port is Open");
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  println(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  var currentString = serial.readLine();  // read the incoming string
  trim(currentString);                    // remove any trailing whitespace
  if (!currentString) return;             // if the string is empty, do no more
  console.log(currentString);             // println the string
  latestData = currentString;            // save it for the draw method
  tenData.push(int(latestData));
  if (tenData.length > 10) {
   tenData.shift(); 
  }
}

// We got raw from the serial port
function gotRawData(thedata) {
  println("gotRawData" + thedata);
}

// Methods available
// serial.read() returns a single byte of data (first in the buffer)
// serial.readChar() returns a single char 'A', 'a'
// serial.readBytes() returns all of the data available as an array of bytes
// serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
// serial.readString() retunrs all of the data available as a string
// serial.readStringUntil('\n') returns all of the data available as a string until a specific string is encountered
// serial.readLine() calls readStringUntil with "\r\n" typical linebreak carriage return combination
// serial.last() returns the last byte of data from the buffer
// serial.lastChar() returns the last byte of data from the buffer as a char
// serial.clear() clears the underlying serial buffer
// serial.available() returns the number of bytes available in the buffer
// serial.write(somevar) writes out the value of somevar to the serial device

function draw() {
  background(255,255,255);
  fill(0,0,0);
  var avData = 0;
  var totData = 0;
  for (var i = 0; i < tenData.length; i++) {
    totData = totData + tenData[i];
	}
  avData = totData/tenData.length;
  //print(typeof(avData));

  
  var data = map(avData, 0, 255, 0, height);
  ellipse(50, data, 50, 50);
  text(totData, 10, 10);
}let mic, recorder, soundFile;
let state = 0; // mousePress will increment from Record, to Stop, to Play
let img; // Declare variable 'img'.

function setup() {
  createCanvas(500, 500);

  img = loadImage("bg.jpg"); // Load the image
  img2 = loadImage("bg2.jpg"); // Load the image
  img3 = loadImage("portugal.jpg");

  background(img3, 0, 0);
  //background(50);
  strokeWeight(2);
  fill(128 + sin(frameCount * 0.1) * 128);
  //textSize(12 + (mouseX / width)*72);
  text('Enable mic and click the mouse to begin recording', 20, 20);

  // create an audio in
  mic = new p5.AudioIn();

  // users must manually enable their browser microphone for recording to work properly!
  mic.start();

  // create a sound recorder
  recorder = new p5.SoundRecorder();

  // connect the mic to the recorder
  recorder.setInput(mic);

  // create an empty sound file that we will use to playback the recording
  soundFile = new p5.SoundFile();
}

function mousePressed() {
  // use the '.enabled' boolean to make sure user enabled the mic (otherwise we'd record silence)
  if (state === 0 && mic.enabled) {

    // Tell recorder to record to a p5.SoundFile which we will use for playback
    recorder.record(soundFile);

    background(img, 0, 0);
    text('Recording now! Click to stop.', 20, 20);
    state++;
  } else if (state === 1) {
    recorder.stop(); // stop recorder, and send the result to soundFile

    background(img2, 00);
    text('Recording stopped. Click to play & save', 20, 20);
    state++;
  } else if (state === 2) {
    soundFile.play(); // play the result!
    saveSound(soundFile, 'mySound.wav'); // save file
    state++;
  }
}var serial; // variable to hold an instance of the serialport library
var portName ='/dev/cu.usbmodem1421';
var inData = 0;
function setup() {
 serial = new p5.SerialPort(); // make a new instance of the serialport library
 serial.on('list', printList); // set a callback function for the serialport list event
 
 serial.list(); // list the serial ports
}
 
// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 print(i + "Got" + portList[i]);
 }
}let thediv;
let theotherdiv;
let h1;
let two;

function setup() {
  createCanvas(400, 400);
  thediv = select('#thediv');
  thediv.html("Here is new text");
  theotherdiv = createDiv("Here is the initial text");
  h1 = createElement("h1", "Here is time");
  h1.mousePressed(h1Callback);
  
  two= select('#two');
  
  input = select('#textInput');
  input.changed(whatever);
}
function whatever() {
  alert(input.value());
}
function h1Callback() {
  h1.style('color', 'green');
  alert("Hey stop");
}
function draw() {
  background(220);
}

function mousePressed() {
  thediv.html("Here is text");
}let img;
let img2;
let song;
let Love = [];

function preload(){
  img = loadImage("word2.jpg");
  img2 = loadImage("word.jpg");
}

function setup() {
  createCanvas(800, 800);
    img = loadImage("word.jpg");
    img2 = loadImage("word2.jpg");
  song = loadSound ('test-audio.mp3')
   img.loadPixels();
    }
function draw() {
    image(img, random(width), random(height),
        random(25,150), random(25,150));
  imageMode(CENTER);
  image(img2, mouseX, mouseY,
        200+sin(frameCount*0.1)*100,
        200+cos(frameCount*0.1)*100);
  fill(img2.get(mouseX, mouseY), 128);
  rect(mouseX, mouseY, 40, 10);
  noStroke();
}

function mousePressed() {
  if ( song.isPlaying() ) { // .isPlaying() returns a boolean
    song.stop();
  } else {
    song.play();  
  }
}let img;
let img2;
let song;
let Love = [];

function preload(){
  img = loadImage("word2.jpg");
  img2 = loadImage("word.jpg");
}

function setup() {
  createCanvas(800, 800);
  noStroke();
  rectMode(CENTER);
  background(0);
    img = loadImage("word.jpg");
    img2 = loadImage("word2.jpg");
  song = loadSound ('test-audio.mp3')
   img.loadPixels();
    }
function draw() {
    image(img, random(width), random(height),
        random(25,150), random(25,150));
  imageMode(CENTER);
  image(img2, mouseX, mouseY,
        200+sin(frameCount*0.1)*100,
        200+cos(frameCount*0.1)*100);
  fill(img2.get(mouseX, 50), 128);
  rect(mouseX, mouseY, 40, 10);
}

function mousePressed() {
  if ( song.isPlaying() ) { // .isPlaying() returns a boolean
    song.stop();
  } else {
    song.play();  
    class Images {
  constructor(img, x, y, speed) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.xspeed = random(-10, 0);
    this.isMoving = false;
  }
  display() {
    image(this.img, this.x, this.y);
  }
  update() {
    if (this.isMoving) {
    	this.x += this.xspeed;
    	if (this.x < 0 || this.x > width) {
      	this.xspeed = this.xspeed * -1;
    	}
    }
  }
  start() {
    this.isMoving = true;
  }
  setSpeed(x) {
    this.xspeed = x;
  }
}
  }
}//create a new P5.SpeechRec object, a listener
let myRec = new p5.SpeechRec;
//disable continuous recognition so the myRec.onEnd callback function work
myRec.continuous = false;
// allow partial recognition (faster, less accurate)
myRec.interimResults = true;

//create a new P5.Speech object so the computer can talk to you
let myVoice = new p5.Speech();



function setup() {
  //create a canvas the size of your window
  createCanvas(windowWidth, windowHeight);

  //start recognition
  myRec.start();
  //set up recognition callback, what happens when there is a word recognized
  myRec.onResult = parseResult;
  //set up a callback function to keep recognition going
  myRec.onEnd = restartRec;

  //say hello
  myVoice.speak('what\'s your favorite color?');


}

function draw() {

}


function parseResult() {
  //convert all results to lowercase
  let lowStr = myRec.resultString.toLowerCase();
  // recognition system will often append words into phrases. 
  // so the hack here is to only use the last word:
  let mostrecentword = lowStr.split(' ').pop();

  // identify a few keywords and set up some responses
  
  // respond with a color by drawing a red rectangle the size of the canvas
  if (mostrecentword.indexOf("red") !== -1) {
    fill(255, 0, 0);
    noStroke();
    rect(0, 0, width, height);

    //respond with color and text
  } else if (mostrecentword.indexOf("green") !== -1) {
    fill(0, 255, 0);
    noStroke();
    rect(0, 0, width, height);
    
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(24);
    text('like a tree', width / 2, height / 2);

    //respond by color and speech
  } else if (mostrecentword.indexOf("blue") !== -1) {
    fill(0, 0, 255);
    noStroke();
    rect(0, 0, width, height);
    myVoice.speak('I do not like blue.');

    //to stop the voice from repeating
  } else if (mostrecentword.indexOf("stop") !== -1) {
    myVoice.speak('ok.');
  } 

  console.log(mostrecentword);
}

//to make sure recognition restarts when it ends
function restartRec() {
  print("end");
  myRec.start();
}var r;
var g;
var b;

let ma = 200;
let mb = 225;
let mc = 30;
let md = 50;
let firstdeg = 0;
let lastdeg = 180;

let clicked = false;

let textx = 0;
let texty = 10;
let dir = 1;

function setup() {
  createCanvas(350, 350);
  angleMode(DEGREES);
}

function draw() {
  r = random(180, 255)
  g = random(180, 255)
  b = random(180, 255)
  background(50);

  //text wraps within text
  let s = 'your time is here and now 😂😍🎉👍';
  strokeWeight(10);
  fill(128 + sin(frameCount * 0.1) * 128);
  text(s, textx, texty, random, 100);

  strokeWeight(2);
  fill(150 + sin(frameCount * 0.1) * 128);
  if (mouseIsPressed) {
    stroke(255);
  } else {
    noStroke();
  }
  textSize(12 + (mouseX / width) * 72);
  text("😂NOW😍", mouseX, mouseY);

  textx = textx + (1 * dir);

  // changing direction
  if (textx >= 255) {
    dir = dir * -1;
  } else if (textx <= 0) {
    dir = dir * -1;
  }

  //Hair
  Hair(158, 260, 250, 400);

  function Hair(x, y, w, h) {
    fill(r, g, b);
    arc(x, y, w, h, firstdeg, lastdeg);
  }

  //Face
  noStroke();
  fill(255, 230, 230);
  ellipse(180, 190, 160, 180);

  //Bangs for Hair
  Hair(180, 160, 170, 170);

  //Eyes
  Eye(230, 180);
  Eye(170, 180);

  function Eye(x, y) {
    fill(255);
    ellipse(x, y, 40, 40);
    var x1 = map(mouseY, 0, width, x - 10, x);
    var y1 = map(mouseY, 0, height, y - 10, y + 5);
    fill(50);
    ellipse(x1, y1, 15, 15);
  }


  //Nose
  stroke(35, 27, 27);
  noFill();
  curve(50, 150, 200, 180, 200, 210, 50, 90);

  //Mouth
  noStroke();
  fill(mouseX)
  arc(ma, mb, mc, md, firstdeg, lastdeg, CHORD);
}

// change the shape of the mouth
// on click
function mouseClicked() {
  //print ("mouse was clicked") ;

  if (clicked == false) {
    clicked = true;
    firstdeg = 180;
    lastdeg = 0;
    mb = 250;

  } else if (clicked == true) {
    clicked = false;
    firstdeg = 0;
    lastdeg = 180;
    mb = 225;
  }
}var bx;
var by;
var boxSize = 75;
var overBox = false;
var locked = false;
var xOffset = 0.0; 
var yOffset = 0.0; 

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  rectMode(CENTER);
  drawSomething(mouseX, mouseY, 200);
}

function drawSomething (x,y,s) {
  rect(x,y,s,s);
  if(s>10) {
    drawSomething(x,y,s-10);
  } 
}class Ball{
  constructor(xx, yy, xxdir, yydir, rr) {
    this.x = xx;
    this.y = yy;
    this.xdir = xxdir;
    this.ydir = yydir;
    this.r = rr;
  }
  move() {
    this.x = this.x + this.xdir;
    this.y = this.y + this.ydir;
}
  display() {
    ellipse(this.x, this.y, this.r, this.r);
}
  let b, b1;
  function setup() {
  createCanvas(400, 400);
    b = new Ball(50,50,1,2,50);
    b1 = new Ball(90,80,2,1,40);
}
function draw() {
  background(220);
  ellipse(b.x, b.y, b.r, b.r);
}

function draw() {
  background(220);
}let ball = {
  x: 100,
  y: 100,
  d: 50,
  xspeed: 1,
  yspeed: 1
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  displayBall();
  moveBall();
}

function displayBall() {
  ellipse(ball.x, ball.y, ball.d);
}

function moveBall() {
  ball.x = ball.x + ball.xspeed;
  ball.y = ball.y + ball.yspeed;
}
function bounceBall() {
  if(ball.x <= 0 || ball.x >= width) {
    ball.xspeed = ball.xspeed * -1;
  }
  if(ball.y <= 0 || ball.y >=height) {
    ball.yspeed = ball.yspeed * -1;
  }
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  // for (let i = 0; i < 100, i++) {
  // drawCircle(random(0,100),random(0,100));
    
  
  drawCircle(10, 50);
  drawCircle(0, 60);
  drawCircle(100,70);
  drawCircle(75, 80);
}

function drawCircle(offset, diameter) {
  fill(random(0,100), random(0,255), random(0,255));
  ellipse(mouseX+offset, mouseY+offset,diameter, diameter);
}
function myDist(x1,y1,x2,y2) {
  return sqrt(pow((x2 - x1)^2) + pow((y2 - y1)^2));
}let left = false,
  mid = false,
  right = false;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  noStroke();
  background(220);
  fill(220);
  if (left) {
    fill(255, 0, 0);
    rect(0, 0, width / 3, height);
  }
  if (mid) {
    fill(255, 0, 0);
    rect(width / 3, 0, width / 3, height);
  }
  if (right) {
     fill(255, 0, 0);
     rect((2 * width) / 3, 0, width / 3, height);
 }
}

function mousePressed() {
  if (mouseX < width / 3 ) {
    left =!left;
  } 
  if (width / 3 < mouseX < ((2 * width) / 3)) {
    mid =!mid;
  } 
 if ((2 * width) / 3 < mouseX ) {
     right =!right;
   }
}function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(220);
 
  if(mouseX > (2*width)/3){
    fill("red")
    rect(2*width/3, 0 , width/3, height);
}
  else if(mouseX > width/3){
    fill("red")
    rect(width/3, 0 , width/3, height);
} else{
    fill("red");
    rect(0, 0 , width/3, height); 
}
}
//Rect will switch between color#a and color#b if mouse hovers over

let white = 255;
let green = [0, 255, 0];
let gray = 127;
let yellow = [255, 255, 0];
let black = 0;
let blue = [0, 0, 255];
let red = [255, 0, 0];

let rect1Color = white;
let rect1ColorHover = green;
let rect2Color = gray;
let rect2ColorHover = yellow;
let rect3Color = black;
let rect3ColorHover = blue;

let turnRed;
let redToggle;

function setup() {
  createCanvas(400, 400);
  
}


function mouseClicked() {
  redToggle = !redToggle;
}

function draw() {

  let rect1Check = (mouseX > 0 && mouseX < width / 3);
  let rect2Check = (mouseX > width / 3 && mouseX < 2 / 3 * width);
  let rect3Check = (mouseX > 2 / 3 * width && mouseX < width);

  noStroke();

  //rect1
  fill(rect1Color);
  rect(0, 0, width / 3, height);

  //rect2
  fill(rect2Color);
  rect(width / 3, 0, width / 3, height);

  //rect 3
  fill(rect3Color);
  rect(2 * width / 3, 0, width / 3, height);



  // rect 1 white / green

  if (rect1Check == true) {
    rect1Color = rect1ColorHover;
  } else {
    rect1Color = white;
  }

  //rect 2 gray / yellow

  if (rect2Check == true) {
    rect2Color = rect2ColorHover;
  } else {
    rect2Color = gray;
  }

  //rect 3 black / blue
  
  if (rect3Check == true) {
    rect3Color = rect3ColorHover;
  } else {
    rect3Color = black;
  }

}let xbuttonW, ybuttonW, dbuttonW;
let xbuttonH, ybuttonH, dbuttonH;

let r,g,b;

function setup() {
  createCanvas(displayWidth, displayHeight);
  xbuttonW = 100;
  ybuttonW = 100;
  dbuttonW = 50;

  xbuttonH = 500;
  ybuttonH = 100;
  dbuttonH = 50;
  
  r = random(50, 255);
  g = random(0, 200);
  b = random(50, 255);

}

function draw() {
  background(r, g, b);
  console.log('draw');

  if (mouseIsPressed && mouseX > xbuttonW - 50 && mouseX < xbuttonW + 50 && mouseY > 50 && mouseY < 150) {
    xbuttonW = mouseX;
    background(r, g, b);
    frameRate(30);


    if (xbuttonW <= 100) {
      xbuttonW = 100;
    }
    if (xbuttonW >= 400) {
      xbuttonW = 400;
    }
    for (let x = 0; x <= width; x += 50) {
      for (let y = 0; y <= width; y += 50) {
        fill(random(255), random(255), random(255));
        ellipse(x, y, xbuttonW * 5);
      }
    }
  }

  if (mouseIsPressed && mouseX > 450 && mouseX < 550 && mouseY > ybuttonH - 50 && mouseY < ybuttonH + 150) {
    ybuttonH = mouseY;
    background(255, 200, 0);

    if (ybuttonH <= 100) {
      ybuttonH = 100;
    }
    if (ybuttonH >= 300) {
      ybuttonH = 300;
    }
    for (let x = 0; x <= width; x += 50) {
      for (let y = 0; y <= width; y += 50) {
        fill(random(255), random(255), random(255));
        ellipse(x, y, ybuttonW * 10);
      }
    }
  }
  if (mouseIsPressed && mouseX > 0 && mouseX < 50 && mouseY > 350 && mouseY < 400) {
    background(random(255), random(255), random(255));

    for (let x = 0; x <= width; x += 50) {
      for (let y = 0; y <= width; y += 50) {
        fill(random(0), random(50), random(255));
ellipse(x, y, ybuttonW * 2);}
    }
  } else {
    fill(random(255), random(255), random(255));
  }
  stroke(5);
  strokeWeight(5);
  line(100, 100, 500, 100);
  line(500, 100, 500, 300);        
  ellipse(xbuttonW, ybuttonW, dbuttonW);
  ellipse(xbuttonH, ybuttonH, dbuttonH);
}let rSlider, gSlider;


function setup() {
  createCanvas(600, 400);
	rSlider = 100;
  gSlider = 100;
  bSlider = 100;

}

function draw() {
  background(0);
  
  // create sliders
  rSlider = createSlider(0, 255, 100);
  rSlider.position(20, 20);
  gSlider = createSlider(0, 255, 0);
  gSlider.position(50, 50, 50);
  
  
  text("red", rSlider.x * 2 + rSlider.width, 35);
  text("green", gSlider.x * 2 + gSlider.width, 65);
  text("blue", bSlider.x * 2 + bSlider.width, 95);
}

  if(mouseIsPressed&&mouseX>50&&mouseX<150&&mouseY>50&&mouseY<150){
  background(0,200,255);
  stroke(0)
  strokeWeight(4);

  for (let x = 0; x <= width; x += 50) {
		for (let y = 0; y <= width; y += 50) {
      fill(random(255), random(255), random(255));
      ellipse(x, y, random(100),25);
    }
  }
}if(mouseIsPressed&&mouseX>450&&mouseX<550&&mouseY>50&&mouseY<150){
  background(255,200,0);
  stroke(0)
  strokeWeight(4);

  for (let x = 0; x <= width; x += 50) {
		for (let y = 0; y <= width; y += 50) {
      fill(random(255), random(255), random(255));
      ellipse(x, y, 25,random(100));
    }
  }
}	else{
  stroke(255)
  strokeWeight(4);
	fill(0);     
}
  //ellipse(rSlider,gSlider,bSlider);

  //ellipse(rSlider+400,gSlider,bSlider);

let padding = 50
let slider;
let sliderC = 0;

function setup() {
  createCanvas(400, 400);
  slider = padding
}

function draw() {
  sliderC = map( slider, padding, width-padding, 0, 255); 
  background(sliderC);
  stroke (map(sliderC, 0, 255, 255, 0));
  line( padding, height-padding, width-padding, height-padding)
  ellipseMode (CENTER);
  //noStroke ();
  ellipse ( slider, height-padding, 20,20);
  
  if (mouseIsPressed && mouseY >= height-padding-10 && mouseY <= height-padding + 10) {
    if (mouseX >= padding && mouseX <= width-padding ) {
    slider = mouseX
    }
  }
  
  
}let x, y;
let xdir = 1
letydir = 1

function setup() {
  createCanvas(400, 400);
  x=10
  y=10
}

function draw() {
  background(220);
  ellipse(x,y,20,20);
  x = x+xdir;
  y = y+ydir;
  
  if (y<= height) {
    y-=50;
  }
}var r;
var g;
var b;

  let ma = 200 ;
  let mb = 225 ;
  let mc = 30 ;
  let md = 50 ;
	let firstdeg = 0 ;
  let lastdeg = 180 ;

let clicked = false ;

let textx = 0 ;
let texty = 10 ;
let dir = 1 ;

function setup() {
  createCanvas(350, 350);
  angleMode(DEGREES);
}

function draw() {
  r = random (180, 255)
  g = random (180,255)
  b = random (180, 255)
  background(50);
  
  //text wraps within text
  let s = 'your time is here and now 😂😍🎉👍';
  strokeWeight(10);
  fill(128 + sin(frameCount*0.1) * 128);
  text(s, textx, texty, random, 100);
  
  strokeWeight(2);
  fill(150 + sin(frameCount*0.1) * 128);
  if (mouseIsPressed) {
    stroke(255);
  }
  else {
    noStroke();
  }
  textSize(12 + (mouseX / width)*72);
  text("😂NOW😍",mouseX,mouseY);
  //
  
	textx = textx + (1*dir) ;
  
  // changing direction
    if (textx >= 255) {
      dir = dir * -1;
    } else if (textx <= 0) {
      dir = dir * -1;
    }
  
  // text syntax
  // text(str, x, y, [x2], [y2])
  
  //hair
  
  fill (r, g, b);
  arc(158, 260, 250, 400, firstdeg, lastdeg);
  arc(158, 260, 250, 400, firstdeg, lastdeg);
   
    
  //face
    noStroke();
  fill(255, 230, 230);
  ellipse(180, 190, 160, 180);
  
  //banghair
  fill(r, g, b);
  arc(180, 160, 170, 170, firstdeg, lastdeg);
  
   //white eye
  fill(255,255,255);
  ellipse(230, 180, 40, 40);
    fill(255,255,255);
  ellipse(170, 180, 40, 40);
  
  //eye
  
  var x1 = map(mouseY, 0, width, 160, 170);
  var y1 = map(mouseY, 0, height, 170, 185);
  
  var x2 = map(mouseY, 0, width, 220, 230);
  var y2 = map(mouseY, 0, height, 170, 185);

  
  fill(50);
  ellipse(x2, y2, 15, 15);
  fill(50);
  ellipse (x1, y1, 15, 15);
  
  //nose
  stroke(35,27,27);
  noFill();
curve(50, 150, 200, 180, 200, 210, 50, 90);
  
  //mouth
  noStroke();
  fill (mouseX)
  arc(ma, mb, mc, md, firstdeg, lastdeg, CHORD);
  
  //text(mouseX,10,20)
  //text(mouseY,10,20)

}

// change the shape of the mouth
// on click
function mouseClicked() {
  
  //print ("mouse was clicked") ;
  
  if (clicked==false){
      clicked = true ;
      // print("mouth moved");
      // print(clicked);
      firstdeg = 180;
      lastdeg = 0;
      mb = 250 ;

  }
  else if (clicked==true) {
    	clicked = false ;
    // 	ma = 200 ;
    // print ("mouth moved back");
    // print(clicked);
    firstdeg = 0 ;
    lastdeg = 180 ;
    mb = 225 ;
  }
}function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  line(0,0,200,200);
  
  push();
  translate (200,200); //moves over 200 and down 200
  rotate(radians(90));
  line(0,0,200,200);
  pop();
  
}function setup() {
  createCanvas(450, 400);
}

function draw() {
  background(0,255,255);
  
  //redline
  stroke(255,0,0);
  strokeWeight (30);
  line(0, 0, 450, 400);
  
  //ellipse
  noStroke();
  fill(0, 200, 0);
  ellipse(225, 200, 200, 150, 200);
  
  //rect
  fill(0,0,128)
  rect(295, 180, 30, 30);

}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
	fill(64,224,208);
	ellipse(200, 200, 100, 100);
}function setup() { 
  createCanvas(400, 400)
} 
function draw() { 
  background(220);

  
}var r;
var g;
var b;

function setup() {
  createCanvas(350, 350);
}

function draw() {
  r = random (180, 255)
  g = random (180,255)
  b = random (180, 255)
  background(221, 255, 247);
  
  //text wraps within text
    var s = '"I am" slowly becomes "am I?" I go from the assertive state to the reflective state.';
fill(0);
text(s, pmouseX , 10, 100, 100);
  
  //hair
  
  fill (r, g, b);
  arc(158, 260, 250, 400, PI,PI+HALF_PI, PIE);
  arc(158, 260, 250, 400, PI+HALF_PI,0,PIE);
   
    
  //face
    noStroke();
  fill(255, 230, 230);
  ellipse(180, 190, 160, 180);
  
  //banghair
  fill(r, g, b);
  arc(180, 160, 170, 170, PI,0,PIE);
  
   //white eye
  fill(255,255,255);
  ellipse(230, 180, 40, 40);
    fill(255,255,255);
  ellipse(170, 180, 40, 40);
  
  //eye
  
  var x1 = map(mouseY, 0, width, 160, 170);
  var y1 = map(mouseY, 0, height, 170, 185);
  
  var x2 = map(mouseY, 0, width, 220, 230);
  var y2 = map(mouseY, 0, height, 170, 185);
  
  //print(y2);
  
  fill(mouseX);
  ellipse(x2, y2, 15, 15);
    fill(mouseY);
  ellipse (x1, y1, 15, 15);
  //mousePressed();
  //eye.h
  
  //nose
  stroke(35,27,27);
  noFill();
curve(50, 150, 200, 180, 200, 210, 50, 90);
  
  //mouth
  noStroke();
  fill (mouseX)
  arc(200, 225, 30, 50, QUARTER_PI,QUARTER_PI+ HALF_PI, CHORD);
  
  text(mouseX,10,20)
  //text(mouseY,10,20)

}function setup() {
  createCanvas(400, 400);
	
	background(220);
	fill(0,0,255);
	stroke(255,0,0);
	strokeWeight(10);
	ellipseMode(CORNER);
	ellipse(200,200,50,90);
	
	stroke(0);
	rect(10,10,50,50);
	
	// Eyes
  fill(0); 
  ellipse(221, 115, 16, 32); 
  ellipse(259, 115, 16, 32);
	
	var myDiv = createDiv("My name is Suzanne.");
myDiv.style('font-size', '16px');
myDiv.style('color', '#ff0000');
	
	createP('My name is Suzanne.');
}

function draw() {
  //background(220);
	/* this is a comment
	*/
}