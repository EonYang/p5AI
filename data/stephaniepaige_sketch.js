var DC;
let snowflakes = [];

// var gift8;
// var gift7;
// var gift6;
// var gift5;
// var gift4;
// var gift3;
// var gift2;
// var gift1;

function preload() {
  // DC = loadImage("/DC8Days.jpg");
  // DC = loadImage("/DCDays.png");
  DC = loadImage("/DC8DaysofChristmas.jpg");
 // var gift8 = loadImage("Gifts/Day8.png");
 // var gift7 = loadImage("Gifts/Day7.png");
 // var gift6 = loadImage("Gifts/Day6.png");
 // var gift5 = loadImage("Gifts/Day5.png");
 // var gift4 = loadImage("Gifts/Day4.png");
 // var gift3 = loadImage("Gifts/Day3.png");
 // var gift2 = loadImage("Gifts/Day2.png");
 // var gift1 = loadImage("Gifts/Day1.png");

  //consider breaking this down into layers and
  //using these to manipulate animations in p5
}

var value = 0
//load tracks
//fade these out
var day1 = new Tone.Player('Tracks/day1.mp3').toMaster()
var day2 = new Tone.Player('Tracks/day2.mp3').toMaster()
var day3 = new Tone.Player('Tracks/day3.mp3').toMaster()
var day4 = new Tone.Player('Tracks/day4.mp3').toMaster()
var day5 = new Tone.Player('Tracks/day5.mp3').toMaster()
var day6 = new Tone.Player('Tracks/day6.mp3').toMaster()
var day7 = new Tone.Player('Tracks/day7.mp3').toMaster()
var day8 = new Tone.Player('Tracks/day8.mp3').toMaster()
var Christmas = new Tone.Player('Tracks/FeelLikeChristmas.mp3').toMaster()
var bgColor = 0
Tone.Buffer.on('load', function() {
  bgColor = img
})

function setup() {
  createCanvas(1000, 800);
}

function draw() {
  background(DC);
  cursor(CROSS)

  let t = frameCount / 100; // update time

  // create a random number of snowflakes each frame
  for (var i = 0; i < random(10); i++) {
    snowflakes.push(new snowflake()); // append snowflake object
  }

  // loop through snowflakes with a for..of loop
  for (let flake of snowflakes) {
    flake.update(t); // update snowflake position
    flake.display(); // draw snowflake
  }

  // snowflake class
  function snowflake() {
    // initialize coordinates
    this.posX = 0;
    this.posY = random(-50, 0);
    this.initialangle = random(0, 2 * PI);
    this.size = random(2, 8);

    // radius of snowflake spiral
    // chosen so the snowflakes are uniformly spread out in area
    this.radius = sqrt(random(pow(width / 2, 2)));

    this.update = function(time) {
      // x position follows a circle
      let w = 1; // angular speed
      let angle = w * time + this.initialangle;
      this.posX = width / 2 + this.radius * sin(angle);

      // different size snowflakes fall at slightly different y speeds
      this.posY += pow(this.size, 0.5);

      // delete snowflake if past end of screen
      if (this.posY > height) {
        let index = snowflakes.indexOf(this);
        snowflakes.splice(index, 1);
      }
    };

    this.display = function() {
      ellipse(this.posX, this.posY, this.size);
    };
  }

}


function mousePressed() {
  // Check if mouse is inside the circle
  var d9 = dist(mouseX, mouseY, 455, 320);
  var d1 = dist(mouseX, mouseY, 80, 720);
  var d2 = dist(mouseX, mouseY, 190, 720);
  var d3 = dist(mouseX, mouseY, 310, 720);
  var d4 = dist(mouseX, mouseY, 435, 720);
  var d5 = dist(mouseX, mouseY, 555, 720);
  var d6 = dist(mouseX, mouseY, 685, 720);
  var d7 = dist(mouseX, mouseY, 810, 720);
  var d8 = dist(mouseX, mouseY, 935, 720);

  if (d9 < 300){
    Christmas.start()
  }
  
  if (d1 < 90) {
    day8.start()
  }

  if (d2 < 90) {
    day7.start()
  }

  if (d3 < 90) {
    day6.start()
  }

  if (d4 < 90) {
    day5.start()
  }

  if (d5 < 90) {
    day4.start()
  }

  if (d6 < 90) {
    day3.start()
  }

  if (d7 < 90) {
    day2.start()
  }

  if (d8 < 90) {
    day1.start()
  }
  
  //   strokeWeight(0);
  // ellipse(455, 320, 770 ,615);
  //   ellipse(80, 720, 90 ,90);
  // ellipse(190, 720, 90, 90);
  // ellipse(310, 720, 90, 90);
  // ellipse(435, 720, 90, 90);
  // ellipse(555, 720, 90, 90);
  // ellipse(685, 720, 90, 90);
  // ellipse(810, 720, 90, 90);
  // ellipse(935, 720, 90, 90);
  

  //keyPressed Option
  // function keyPressed() {
  //   console.log('pressed', keyCode)
  //   if (keyCode === 56) { // 8
  //     day8.start();
  //     //song(stop) for each song
  //     //display(){
  //     ///
  //   // };
  //   } else if (keyCode === 50) { // 2
  //     day2.start();
  //   } else if (keyCode === 49) { // 1
  //     day1.start()
  //   } else if (keyCode === 55) { // 7
  //     day7.start()
  //   } else if (keyCode === 54) { // 6
  //     day6.start()
  //   } else if (keyCode === 53) { // 5
  //     day5.start()
  //   } else if (keyCode === 52) { // 4
  //     day4.start()
  //   } else if (keyCode === 51) // 3
  //     day3.start()

  //if any sound is playing when another song is playing,
  //everything else stops.

  //tried to make it so that clicking on a box
  //(which would later be an image/icon) would
  //trigger the sound clip to start

  //boxes in shapes of presents/gifts. reveal gift when pressed.
  //if this image is clicked.
  // function mousePressed() {
  //   // Check if mouse is inside the circle
  //   var d = dist(mouseX, mouseY, 50, 660);
  //   if (d < 100) {
  //     day8.start()
  //     // Pick new random color values
  //     r = random(255);
  //     g = random(255);
  //     b = random(255);
  //     // uncomment to prevent any default behavior
  //     // return false;
  //   }
}var DC;

function preload() {
  DC = loadImage("/DC8Days.jpg");
  // DC = loadImage("/DCDays.png");
  
  //consider breaking this down into layers and
  //using these to manipulate animations in p5
}

var value = 0
//load tracks
//fade these out
var day1 = new Tone.Player('Tracks/day1.mp3').toMaster()
var day2 = new Tone.Player('Tracks/day2.mp3').toMaster()
var day3 = new Tone.Player('Tracks/day3.mp3').toMaster()
var day4 = new Tone.Player('Tracks/day4.mp3').toMaster()
var day5 = new Tone.Player('Tracks/day5.mp3').toMaster()
var day6 = new Tone.Player('Tracks/day6.mp3').toMaster()
var day7 = new Tone.Player('Tracks/day7.mp3').toMaster()
var day8 = new Tone.Player('Tracks/day8.mp3').toMaster()
var bgColor = 0
Tone.Buffer.on('load', function() {
  bgColor = img
})

function setup() {
  createCanvas(1000, 800);
}

function draw() {
  background(DC);
  // fill(r, b, g, 127);
  
  //trouble getting icon to display over or replace box
  //when key is pressed and song is triggered.

//   strokeWeight(0);
//   rect(50, 660, 90, 90); // will be object 8
//   rect(160, 660, 90, 90); // will be object 7
//   rect(270, 660, 90, 90); // will be object 6
//   rect(380, 660, 90, 90); // will be object 5
//   rect(490, 660, 90, 90); // will be object 4
//   rect(600, 660, 90, 90); // will be object 3
//   rect(710, 660, 90, 90); // will be object 2
//   rect(820, 660, 90, 90); // will be object 1
}

function keyPressed() {
  console.log('pressed', keyCode)
  if (keyCode === 56) { // 8
    day8.start();
    //song(stop) for each song
    //display(){
    ///
  // };
  } else if (keyCode === 50) { // 2
    day2.start();
  } else if (keyCode === 49) { // 1
    day1.start()
  } else if (keyCode === 55) { // 7
    day7.start()
  } else if (keyCode === 54) { // 6
    day6.start()
  } else if (keyCode === 53) { // 5
    day5.start()
  } else if (keyCode === 52) { // 4
    day4.start()
  } else if (keyCode === 51) // 3
    day3.start()
    
//if any sound is playing when another song is playing,
//everything else stops.
  
  
  //tried to make it so that clicking on a box
  //(which would later be an image/icon) would
  //trigger the sound clip to start

  //boxes in shapes of presents/gifts. reveal gift when pressed.
  //if this image is clicked.
  // function mousePressed() {
  //   // Check if mouse is inside the circle
  //   var d = dist(mouseX, mouseY, 50, 660);
  //   if (d < 100) {
  //     day8.start()
  //     // Pick new random color values
  //     r = random(255);
  //     g = random(255);
  //     b = random(255);
  //     // uncomment to prevent any default behavior
  //     // return false;
  //   }
}var four;
function preload() {
  four = loadImage("assets/four.jpg");
}

let unity = new Tone.Player("samples/Unity.mp3").toMaster()
let auntSarah = new Tone.Player('samples/AuntSarah.mp3').toMaster()
let peaches = new Tone.Player('samples/Peaches.mp3').toMaster()
let sweetThing = new Tone.Player('samples/SweetThing.mp3').toMaster()
let saffronia = new Tone.Player('samples/Saffronia.mp3').toMaster()


function setup() {
  console.log("Press (A)unt sarah, (S)affronia, s(W)eet thing, (P)eaches to hear their individual stories. Press (U) for Unity amongst them.");
  createCanvas(1500, 1500);
  image(four, mouseX, mouseY);
}

function draw() {
  // women.playbackRate = map(mouseX, 0, width, 0.02, 2);
}

function keyPressed() {
  console.log('pressed', keyCode)
  if (keyCode === 65) { // a
    auntSarah.start()
  } else if (keyCode === 83) { // s
    saffronia.start()
  } else if (keyCode === 87) { // w
    sweetThing.start()
  } else if (keyCode === 80) { // p
    peaches.start()
  } else if (keyCode === 85) { // u
		unity.start()
  }
}

function keyReleased() {
  console.log('released', keyCode)
  if (keyCode === 65) { // a
    auntSarah.stop()
  } else if (keyCode === 83) { // s
    saffronia.stop()
  } else if (keyCode === 87) { // w
    sweetThing.stop()
  } else if (keyCode === 80) { // p
    peaches.stop()
  } else if (keyCode === 85) { // u
    unity.stop()
}
}var four;
function preload(){
  four = loadImage("assets/four.jpg");
}

let player = new Tone.Player("samples/women.wav");
//Properties:
playbackRate: 1;
player.loop = true;
player.retrigger = true;
player.toMaster();

function setup() {
	console.log("Play spacebar to start/stop. Mouse left and right to change speed.");
	createCanvas(1000, 1000);
   image(four, mouseX, mouseY);
}

function draw() {
  player.playbackRate = map(mouseX, 0, width, .02, 2);
}

function keyPressed() {
  if (key == ' ') {
    if (player.state == "stopped") {
      player.start();
    } else {
      player.stop();
    }
  }
}//load tracks
var track1 = new Tone.Player('Tracks/Killmonger1.mp3').toMaster()
var track2 = new Tone.Player('Tracks/Killmonger2.mp3').toMaster()
var track3 = new Tone.Player('Tracks/Killmonger3.mp3').toMaster()
var track4 = new Tone.Player('Tracks/Killmonger4.mp3').toMaster()
var track5 = new Tone.Player('Tracks/Killmonger5.mp3').toMaster()
var track6 = new Tone.Player('Tracks/Killmonger6.mp3').toMaster()
var track7 = new Tone.Player('Tracks/Killmonger7.mp3').toMaster()
var track8 = new Tone.Player('Tracks/Killmonger8.mp3').toMaster()
var track9 = new Tone.Player('Tracks/Killmonger9.mp3').toMaster()
var track10 = new Tone.Player('Tracks/Killmonger10.mp3').toMaster()
var bgColor = 0
Tone.Buffer.on('load', function() {
  bgColor = gif
})

// var gif;

// function preload() {
//   gif = loadImage('gif');
// }

function setup() {
  createCanvas(360, windowHeight);
  //var osc = new Tone.Oscillator().toMaster()
  //osc.start().stop('+0.1')
}

function keyPressed() {
  console.log('pressed', keyCode)
  if (keyCode === 75 && track1.loaded) { // K
    track1.start()
  } else if (keyCode === 73) { // I
    track2.start()
  } else if (keyCode === 76) { // L
    track3.start()
  } else if (keyCode === 191) { // /
    track4.start()
  } else if (keyCode === 77) { // M
    track5.start()
  } else if (keyCode === 79) { // O
    track6.start()
  } else if (keyCode === 78) { // N
    track7.start()
  } else if (keyCode === 71) { // G
    track8.start()
  } else if (keyCode === 69) { // E
    track9.start()
  } else if (keyCode === 82) { // R
    track10.start()
  }
}

function keyReleased() {
  console.log('released', keyCode)
  if (keyCode === 75 && track1.loaded) { // K
    track1.stop()
  } else if (keyCode === 73) { // I
    track2.stop()
  } else if (keyCode === 76) { // L
    track3.stop()
  } else if (keyCode === 191) { // /
    track4.stop()
  } else if (keyCode === 77) { // M
    track5.stop()
  } else if (keyCode === 79) { // O
    track6.stop()
  } else if (keyCode === 78) { // N
    track7.stop()
  } else if (keyCode === 71) { // G
    track8.stop()
  } else if (keyCode === 69) { // E
    track9.stop()
  } else if (keyCode === 82) { // R
    track10.stop()
  }
}

function draw() {
  background(gif);
}// Sequencer
var nSteps = 5;
var nTracks = 5;
var cells = [];
var playButton;
var beats = 0;
var currentStep = 0;

var notes = ["A2", "B2", "F2", "G2", "E3"];
var synth = new Tone.PolySynth({
	"oscillator" : {
		"type" : "sine"
 },
 "envelope" : {
 	"attack" : 0.8,
  "sustain" : 0.2,
  "release" : 0.1
 }
}).toMaster();
synth.toMaster();
Tone.Transport.scheduleRepeat(onBeat, 0.2);

 var col = {
  r:250,
  g:230,
  b:240,
 }

var cellWidth, cellHeight;


function setup() {  	
  createCanvas(500, 300);
  cellWidth = width / nSteps;
  cellHeight = height / nTracks;
  
  for(var track = 0; track < nTracks; track++){
    cells[track] = [];
    for(var step = 0; step < nSteps; step++){
        cells[track][step] = -1;
    }
  }
  playButton = createButton('play');
  playButton.position(0, 310);
  playButton.mouseClicked(togglePlay);
  
}

function onBeat(time){
  for(var track = 0; track < nTracks; track++){
    if(cells[track][currentStep] == 1){
      var synthloop = synth.get(notes[track]);
      synth.triggerAttackRelease(notes[track], time);
    }
  }
  beats++;
  currentStep = beats % nSteps;
}


function draw(){
  
  background(col.r,col.g,col.b);
  frameRate(2);
  noStroke();
  var vol = new Tone.Volume();
  if(0<mouseX&&mouseX<width){
//   synth.mute == true;
//     print('on');
// } else {
//   print('off');
  
  col.r = random(222,213);
	col.g = random(132,143);
  col.b = random(132,254);
}
  
  // Draw cells that are on
  for(var step = 0; step < nSteps; step++){
    for(var track = 0; track < nTracks; track++){
      if(cells[track][step] == 1){
        fill(0, 0, 0);
        rect(step*cellWidth, track*cellHeight, cellWidth, cellHeight);
      }
    }
  }
  
  // Highlight current step
  var highlight = (beats - 1)% nSteps;
	fill(100, 100, 100);
	noStroke();
	rect(highlight*cellWidth, 0, cellWidth, height)
	
}

function mousePressed(){
  // If the mouse is within the bounds of the canvas
  if(	0 < mouseX && mouseX < width &&
    	0 < mouseY && mouseY < height){
    
    // Determine which cell the mouse is on
    var s = floor(mouseX / cellWidth);
    var p = floor(mouseY / cellHeight);
    
    // Toggle cell on/off
    cells[p][s] = -cells[p][s];
  }
}

function togglePlay(){
  if(Tone.Transport.state == "started"){
  	Tone.Transport.stop();
    playButton.html('play');
  }
  else{
  	Tone.Transport.start();
    playButton.html('stop');
  }
  button = ! button;
}// Sequencer
var nSteps = 10;
var nTracks = 10;
var cells = [];
var playButton;
var beats = 0;
var currentStep = 0;



var notes = ["A2", "B2", "F2", "A2", "E3", "A3", "E2", "G3", "A4", "E4"];
var synth = new Tone.PolySynth({
	"oscillator" : {
		"type" : "sawtooth"
 },
 "envelope" : {
 	"attack" : 0.8,
  "sustain" : 0.2,
  "release" : 0.1
 }
}).toMaster();
synth.toMaster();
Tone.Transport.scheduleRepeat(onBeat, 0.2);

 var col = {
  r:250,
  g:230,
  b:240,
 }

var cellWidth, cellHeight;

function setup() {
  for(var track = 0; track < nTracks; track++){
    cells[track] = [];
    for(var step = 0; step < nSteps; step++){
        cells[track][step] = -1;
    }
  }
  
  playButton = createButton('play');
  playButton.position(0, 310);
  playButton.mouseClicked(togglePlay);
	
  createCanvas(500, 300);
  cellWidth = width / nSteps;
  cellHeight = height / nTracks;
  
}

function onBeat(time){
  for(var track = 0; track < nTracks; track++){
    if(cells[track][currentStep] == 1){
      var synthloop = synth.get(notes[track]);
      synth.triggerAttackRelease(notes[track], time);
    }
  }
  beats++;
  currentStep = beats % nSteps;
}


function draw(){
  
  background(col.r,col.g,col.b);
  frameRate(2);
  noStroke();
  var vol = new Tone.Volume();
  if(0<mouseX&&mouseX<width){
//   synth.mute == true;
//     print('on');
// } else {
//   print('off');
  
  col.r = random(222,213);
	col.g = random(132,143);
  col.b = random(132,254);
}
  
  // Draw cells that are on
  for(var step = 0; step < nSteps; step++){
    for(var track = 0; track < nTracks; track++){
      if(cells[track][step] == 1){
        fill(0, 0, 0);
        rect(step*cellWidth, track*cellHeight, cellWidth, cellHeight);
      }
    }
  }
  
  // Highlight current step
  var highlight = (beats - 1)% nSteps;
	fill(100, 100, 100);
	noStroke();
	rect(highlight*cellWidth, 0, cellWidth, height)
	
}

function mousePressed(){
  // If the mouse is within the bounds of the canvas
  if(	0 < mouseX && mouseX < width &&
    	0 < mouseY && mouseY < height){
    
    // Determine which cell the mouse is on
    var s = floor(mouseX / cellWidth);
    var p = floor(mouseY / cellHeight);
    
    // Toggle cell on/off
    cells[p][s] = -cells[p][s];
  }
}

function togglePlay(){
  if(Tone.Transport.state == "started"){
  	Tone.Transport.stop();
    playButton.html('play');
  }
  else{
  	Tone.Transport.start();
    playButton.html('stop');
  }
  button = ! button;
}//oscillator >> ADSR >> filter >> master
//^lfo                  ^filterEnv

var osc;
var ampEnv;
var aFilter;
var filterEnv;
var lfo;
var x, y;

function setup() {
    createCanvas(720, 400);
  // Starts in the middle
  x = width / 2;
  y = height;
  
  aFilter = new Tone.Filter(150, "lowpass");
  aFilter.toMaster();

  //Plucked String
  ampEnv = new Tone.AmplitudeEnvelope({
    "attack": 0,
    "decay": 0,
    "sustain": 1,
    "release": 0
  });
  ampEnv.releaseCurve = "linear";
  ampEnv.connect(aFilter);

  // osc = new Tone.Oscillator(100, "sine");
  osc = new Tone.Oscillator(100, "square");
  // osc = new Tone.Oscillator(100, "sawtooth");
  // osc = new Tone.Oscillator(100, "triangle");
  osc.connect(ampEnv);
  osc.start();
  
  filterEnv = new Tone.ScaledEnvelope({
    "attack": 0.5,
    "min": 100,
    "max": 300
  });
  filterEnv.connect(aFilter.frequency);
}

function keyPressed() {
  ampEnv.triggerAttack();
  filterEnv.triggerAttack();
}

function keyReleased() {
  ampEnv.triggerRelease();
  filterEnv.triggerRelease();
}

function draw() {
  background(200);
  
  // Draw a circle
  stroke(50);
  fill(100);
  ellipse(x, y, 24, 24);
  
  // Jiggling randomly on the horizontal axis
  x = x + random(-2, 2);
  // Moving up at a constant speed
  y = y - 2;
  
  // Reset to the bottom
  if (y < 0) {
    y = height;
  }
  else if (x > width) {
    x = width;
  }
}//notes for HP Theme song and location of keys
						//G5(7) B5(10) G5 B5 G5 C6(11) B5(10) Bb(9) F#(6) G5 B5 Bb(9) Eb5(3) E5(4) B5
						//1c, 2d, 3eb,4e, 5f, 6f#,7g, 8a, 9Bb,10b,11c6
//notes for piano keys
var notes = [ 72 , 74, 75, 76, 77, 78, 79, 81, 82, 83, 84, 73];

//G B G B G +C B Bb F# G B Bb Eb E B
// For automatically playing the song
var index = 0;
var song = [
//G5(7) B5(10) G5(7) B5(10) G5(7) C6(11) B5(10) Bb(9)
//F#(6) G5(7) B5(10) Bb(9) Eb5(3) E5(4) B5 (10)/C5 (11)
 	{ note: 7, duration: 600},
  { note: 10, duration: 800},
  { note: 7, duration: 300},
  { note: 10, duration: 300},
  { note: 7, duration: 600},
  { note: 11, duration: 600},
  { note: 10, duration: 800},
  { note: 6, duration: 1000},
  { note: 7, duration: 600},
  { note: 10, duration: 300},
  { note: 9, duration: 300},
  { note: 3, duration: 600},
	{ note: 4, duration: 800},
	{ note: 10, duration: 800},
  { note: 7, duration: 600},
  { note: 10, duration: 800},
  { note: 7, duration: 300},
  { note: 10, duration: 300},
  { note: 7, duration: 600},
  { note: 11, duration: 600},
  { note: 10, duration: 800},
  { note: 6, duration: 1000},
  { note: 7, duration: 600},
  { note: 10, duration: 300},
  { note: 9, duration: 300},
  { note: 3, duration: 600},
	{ note: 4, duration: 800},
	{ note: 10, duration: 800},
	{ note: 1, duration: 800},
  
];
var trigger = 0;
var autoplay = false;
var osc;

function setup() {
  createCanvas(720, 400);
  var div = createDiv("Click to play notes or ")
  div.id("instructions");
  var button = createButton("play !theme song");
  button.parent("instructions");
  // Trigger automatically playing
  button.mousePressed(function() {
    if (!autoplay) {
      index = 0;
      autoplay = true;
    }
  });
 osc = new p5.Oscillator('Triangle');
  osc.start();
  frameRate(2);
  osc.amp(0);
}

	function playNote(note, duration){
    osc.freq(midiToFreq(note));
    osc.fade(0.02, 0.02)
    
    if (duration) {
      setTimeout(function() {
        osc.fade(0,0.05);
      }, duration-50);
    }
}

function draw() {

  // If we are autoplaying and it's time for the next note
  if (autoplay && millis() > trigger){
    playNote(notes[song[index].note], song[index].duration);
    trigger = millis() + song[index].duration;
    // Move to the next note
    index ++;
  // We're at the end, stop autoplaying.
  } else if (index >= song.length) {
    autoplay = false;
  }


  // Draw a keyboard

  // The width for each key
  var w = width / notes.length;
  for (var i = 0; i < notes.length; i++) {
    var x = i * w;
    // If the mouse is over the key
    if (mouseX > x && mouseX < x + w && mouseY < height) {
      // If we're clicking
      if (mouseIsPressed) {
        fill(100,255,200);
      // Or just rolling over
      } else {
        fill(127,8,127);
      }
    } else {
      fill(127,8,213);
    }

    // Or if we're playing the song, let's highlight it too
    if (autoplay && i === song[index-1].note) {
      fill(100,255,200);
    }

    // Draw the key
    rect(x, 0, w-1, height-1);
  }

}

// When we click
function mousePressed() {
  // Map mouse to the key index
  var key = floor(map(mouseX, 0, width, 0, notes.length));
  playNote(notes[key]);
}

// Fade it out when we release
function mouseReleased() {
  osc.fade(0,0.5);
}
// Add a snare drum sound
// Play a kick/snare pattern

// SOUNDS

// Create a Players object and load the "kick.mp3" and "snare.mp3" files
var kit = new Tone.Players({
  "kick": "samples/505/kick.mp3",
  "snare":"samples/505/snare.mp3"
});

// Connect the player output to the computer's audio output
kit.toMaster();

Tone.Transport.bpm.value = 120;

// Create a loop: call playBeat every quarter note
Tone.Transport.scheduleRepeat(playBeat, "4n");
Tone.Transport.start();


// Audio playback loop
function playBeat() {
  // Make sure the sound files have been completely loaded
  if (kit.loaded) {
    // Tone's position gives us a string: 
    // bar:beat:sixteenth
    // Slice the string by ":" and get the number in the second position (the beat)
    let beat = Tone.Transport.position.split(":")[1];
    console.log(beat);
    
    // Try changing the time signature, and notice what happens
    // How would you create a kick-snare-snare pattern?
    if(beat == 0){
    	kit.get("kick").start();
    }
    else{
    	kit.get("snare").start();
    }
  }
}

function setup() {

}

function draw() {

}var kick = new Tone.Player("sounds/kick.wav").toMaster();
var synth = new Tone.Player("sounds/synth.wav").toMaster();
var hihat = new Tone.Player("sounds/hihat.wav").toMaster();

Tone.Transport.bpm.value = 120;
Tone.Transport.scheduleRepeat(playkick, "4n");
Tone.Transport.scheduleRepeat(playsynth, "16n");//repeat every 16th notes 
Tone.Transport.scheduleRepeat(playhihat, "16n");

Tone.Transport.start();

function setup() {
  createCanvas(400,400);
  background(0);
  frameRate(60);
}

function draw() {
  textSize(30);
  fill(255);
  text('YESSSSSSS!',width/4,height/2);
}


function playkick() {
  if (kick.loaded) {
    kick.start();
  }
}

function playsynth() {
  if (synth.loaded) {
    var beat = Tone.Transport.position.split(":")[1];
    // convert sixteenth into integer
    var sixteenth = Tone.Transport.position.split(":")[2] | 0;
    if (beat == 0 || beat == 2) {
      if (sixteenth == 1 || sixteenth == 3) {
        synth.start();
      }
    } else {
      if (sixteenth == 2) {
        synth.start();
      }
    }
  }
}

function playhihat() {
  if (hihat.loaded) {
    var beat = Tone.Transport.position.split(":")[1];
    var sixteenth = Tone.Transport.position.split(":")[2] | 0;
    if (beat == 0) {
      if (sixteenth == 2) {
        hihat.start();
      }
    } else if (beat == 1 || beat == 3) {
      if (sixteenth == 1 || sixteenth == 2) {
        hihat.start();
      }
    } else {
      if (sixteenth == 2 || sixteenth == 3) {
        hihat.start();
      }
    }
  }
}
// Sequencer
var currentStep = 0;
// Replace two arrays by one 8x4 cell matrix 
var cells = [
  [-1, 1, -1, 1], // Kick pattern
	[1, -1, 1, -1],  // Snare pattern
  [1, 1, 1, -1],  // HH pattern
  [-1, -1, -1, 1] // HHo pattern
  
];
var nSteps = 4;
var nTracks = 4;

// Visuals
var cellWidth, cellHeight;

// Sound: add two more
var kit;
var drumNames = ["kick", "snare", "hh", "hho"];
kit = new Tone.Players(
    {
      "kick" : "/samples/505/kick.mp3",
      "snare" : "/samples/505/snare.mp3",
      "hh" : "/samples/505/hh.mp3",
      "hho" : "/samples/505/hho.mp3",
    }
);
kit.toMaster();
// Change to "16n"
Tone.Transport.scheduleRepeat(onBeat, "16n");
Tone.Transport.start();

function setup() {

  createCanvas(600, 300);
  cellWidth = width / nSteps;
  cellHeight = height / nTracks;
  
}

function onBeat(time){
  for(var track = 0; track < nTracks; track++){
    if(cells[track][currentStep] == 1){
      if (kit.loaded) {
      	var hh = kit.get(drumNames[track]);
      	hh.start(time);
      }
    }
  }
  currentStep = (currentStep + 1) % nSteps;
  // console.log(Tone.Transport.position)
}

function draw(){
  background(255);
  stroke(0);
  
  // Draw cells that are on
  for(var step = 0; step < nSteps; step++){
    for(var track = 0; track < nTracks; track++){
      if(cells[track][step] == 1){
        fill(0);
        rect(step*cellWidth, track*cellHeight, cellWidth, cellHeight);
      }
    }
  }
  
  // Draw horizontal lines
  for(var i = 0; i <= nTracks; i++){
    var y = i*cellHeight;
    line(0, y, width, y);
  }
  
  // Draw vertical lines
  for(var i = 0; i <= nSteps; i++){
    stroke(0);
    line(i*cellWidth, 0, i*cellWidth, height);
    
    // Highlight current step
    if(i == currentStep){
      fill(178, 223, 247, 50);
      noStroke();
      rect(i*cellWidth, 0, cellWidth, height)
    }
  }
}
// Add a snare drum sound
// Play a kick/snare/snare/snare pattern

// PATTERN
var totalBeats = 0;
var kickPattern = [1, -1];
var snarePattern = [-1, 1];

// SOUNDS

// Create a Players object and load the "kick.mp3" and "snare.mp3" files
var kit = new Tone.Players({
  "kick": "samples/505/kick.mp3",
  "snare":"samples/505/snare.mp3"
});

// Connect the player output to the computer's audio output
kit.toMaster();

Tone.Transport.timeSignature = [2, 4];
// Create a loop: call playBeat every half a second
// Try other durations, like "1s" and "0.25s"
Tone.Transport.scheduleRepeat(playBeat, "0.5s");
Tone.Transport.start();

function setup() {

}

function draw() {

}

// Audio playback loop
function playBeat() {
  // Make sure the sound files have been completely loaded
  if (kit.loaded) {
    // step cycles over 0, 1, 2, and 3
    var step = totalBeats % 2;
    // Can you make a kick/snare/kick/snare pattern?
    if(kickPattern [step] == 1){
    	kit.get("kick").start();
    }
    else if(kickPattern [step] == 1){
    	kit.get("snare").start();
    }
    totalBeats ++;
 	 }
}// Create a Player object and load the "kick.mp3" file
var busy = new Tone.Player("samples/busy.mp3").toMaster()
var rain = new Tone.Player("samples/rain.mp3").toMaster()
var sos = new Tone.Player("samples/sos.mp3").toMaster()
var hyena = new Tone.Player("samples/hyena.mp3").toMaster()

console.log('pressed', keyCode)
  if (keyCode === 76 && busy.loaded) { // L
    busy.start()
  } else if (keyCode === 79) { // O
    track2.start()
  } else if (keyCode === 86) { // V
    track3.start()
  } else if (keyCode === 69) { // E
    track4.start()

Tone.Transport.bpm.value = 120;
Tone.Transport.timeSignature = [4,4];

let audioLoop0 = Tone.Transport.scheduleRepeat(playkit0, "16n");
let audioLoop1 = Tone.Transport.scheduleRepeat(playkit1, "16n");
let audioLoop2 = Tone.Transport.scheduleRepeat(playkit2, "16n");
let audioLoop3 = Tone.Transport.scheduleRepeat(playkit3, "16n");


Tone.Transport.start();

// Connect the player output to the computer's audio output
busy.toMaster();

// Create a loop: call playBeat every half a second
// Try other durations, like "1s" and "0.25s"
Tone.Transport.scheduleRepeat(playBeat, "1s");
Tone.Transport.start();

// added here during class. Not included in original code.
// Tone.Transport.bpm.value = 20
// Tone.Transport.bmp.rampTo(220, 10);

function setup() {
  
}

function draw() {
 
}

	
  }// Play the kick drum twice per second

// Create a Player object and load the "kick.mp3" file
var kick = new Tone.Player("samples/505/kick.mp3");

// Connect the player output to the computer's audio output
kick.toMaster();

// Create a loop: call playBeat every half a second
// Try other durations, like "1s" and "0.25s"
Tone.Transport.scheduleRepeat(playBeat, "0.5s");
Tone.Transport.start();

// added here during class. Not included in original code.
// Tone.Transport.bpm.value = 20
// Tone.Transport.bmp.rampTo(220, 10);

function setup() {
  
}

function draw() {
 
}

// Audio playback loop
function playBeat(){
  // Make sure the sound file has been completely loaded
  if(kick.loaded){
    // Play sound file
    kick.start();
  }
}

	
// Click the mouse to play a kick snare

// Create a Player object and load the "kick.mp3" file
var kick = new Tone.Player("samples/505/kick.mp3");

// Connect the player output to the computer's audio output
kick.toMaster();

function setup() {
  
}

function draw() {
 
}

function mousePressed(){
  // Make sure the sound file has been completely loaded
  if(kick.loaded){
    // Play sound file
  	kick.start();
  }
	
}var kick;
var lastTime;

function preload(){
  kick = loadSound('sounds/kick.mp3');
}

function setup() {
  createCanvas(600, 400);
  background(100, 233, 100);
  // 2. 
  // frameRate(2);
  lastTime = 0;
  
}

function draw(){
  // Make sure to turn your volume down before un-commenting this line
	// 1. 
  if(millis() - lastTime > 500){
  	kick.play();
    lastTime = millis();
  }
  
  
  // 4. But audio is still tied to how long it takes to draw a frame: 
  // Make the number of ellipses grow until you notice a lag in the sound
  // for(let i = 0; i < 10000; i++){
  // 	ellipse(random()*width, random()*height, 100, 100);
  // }
  
  
  
  
  
  
  // 5. Next, we will try creating a separate audio loop.
  
  
    // Problem: need to update drawing at the rate of kick repetition (too slow!)
  // A bit more control: 
  // 3. Play kick drum once every second
  // if(millis() - lastTime > 100){
  // 	kick.play();
  //   lastTime = millis();
  // }
  
}

//load tracks
var track1 = new Tone.Player('Tracks/Killmonger1.mp3').toMaster()
var track2 = new Tone.Player('Tracks/Killmonger2.mp3').toMaster()
var track3 = new Tone.Player('Tracks/Killmonger3.mp3').toMaster()
var track4 = new Tone.Player('Tracks/Killmonger4.mp3').toMaster()
var track5 = new Tone.Player('Tracks/Killmonger5.mp3').toMaster()
var track6 = new Tone.Player('Tracks/Killmonger6.mp3').toMaster()
var track7 = new Tone.Player('Tracks/Killmonger7.mp3').toMaster()
var track8 = new Tone.Player('Tracks/Killmonger8.mp3').toMaster()
var track9 = new Tone.Player('Tracks/Killmonger9.mp3').toMaster()
var track10 = new Tone.Player('Tracks/Killmonger10.mp3').toMaster()
var bgColor = 0

// Tone.Buffer.on('load', function() {
//   bgColor = gif
// })

function setup() {
  // createCanvas(360, windowHeight);
  // createCanvas(720,400);
  createCanvas(windowWidth,windowHeight);
  background(255);
  noStroke();
}

function keyPressed() {
   background(255);
  from = color(255, 0.1, 255, 0.1 * 255);
  to = color(0.1, 255, 255, 0.1 * 255);
  c1 = lerpColor(from, to, .33);
  c2 = lerpColor(from, to, .66);
  for (var i = 0; i < 15; i++) {
    fill(from);
    quad(random(-40, 220), random(height),
         random(-40, 220), random(height),
         random(-40, 220), random(height),
        random(-40, 220), random(height));
    fill(c1);
    quad(random(140, 380), random(height),
         random(140, 380), random(height),
         random(140, 380), random(height), 
         random(140, 380), random(height));
    fill(c2);
    quad(random(320, 580), random(height), 
         random(320, 580), random(height),
         random(320, 580), random(height), 
         random(320, 580), random(height));
    fill(to);
    quad(random(500, 760), random(height), 
         random(500, 760), random(height),
         random(500, 760), random(height), 
         random(500, 760), random(height));
  }
  frameRate(5);
  
  console.log('pressed', keyCode)
  if (keyCode === 75 && track1.loaded) { // K
    track1.start()
  } else if (keyCode === 73) { // I
    track2.start()
  } else if (keyCode === 76) { // L
    track3.start()
  } else if (keyCode === 191) { // /
    track4.start()
  } else if (keyCode === 77) { // M
    track5.start()
  } else if (keyCode === 79) { // O
    track6.start()
  } else if (keyCode === 78) { // N
    track7.start()
  } else if (keyCode === 71) { // G
    track8.start()
  } else if (keyCode === 69) { // E
    track9.start()
  } else if (keyCode === 82) { // R
    track10.start()
  }
}

function keyReleased() {
  background(255);
  
  console.log('released', keyCode)
  if (keyCode === 75 && track1.loaded) { // K
    track1.stop()
  } else if (keyCode === 73) { // I
    track2.stop()
  } else if (keyCode === 76) { // L
    track3.stop()
  } else if (keyCode === 191) { // /
    track4.stop()
  } else if (keyCode === 77) { // M
    track5.stop()
  } else if (keyCode === 79) { // O
    track6.stop()
  } else if (keyCode === 78) { // N
    track7.stop()
  } else if (keyCode === 71) { // G
    track8.stop()
  } else if (keyCode === 69) { // E
    track9.stop()
  } else if (keyCode === 82) { // R
    track10.stop()
  }
}

function draw() {
  // background(gif);
  // background(255);
  // from = color(255, 0, 0, 0.2 * 255);
  // to = color(0, 0, 255, 0.2 * 255);
  // c1 = lerpColor(from, to, .33);
  // c2 = lerpColor(from, to, .66);
  // for (var i = 0; i < 15; i++) {
  //   fill(from);
  //   quad(random(-40, 220), random(height),
  //        random(-40, 220), random(height),
  //        random(-40, 220), random(height),
  //       random(-40, 220), random(height));
  //   fill(c1);
  //   quad(random(140, 380), random(height),
  //        random(140, 380), random(height),
  //        random(140, 380), random(height), 
  //        random(140, 380), random(height));
  //   fill(c2);
  //   quad(random(320, 580), random(height), 
  //        random(320, 580), random(height),
  //        random(320, 580), random(height), 
  //        random(320, 580), random(height));
  //   fill(to);
  //   quad(random(500, 760), random(height), 
  //        random(500, 760), random(height),
  //        random(500, 760), random(height), 
  //        random(500, 760), random(height));
  // }
  // frameRate(5);
}let sound;

function preload(){
  sound = loadSound('sounds/blip.wav');}

  function setup() {
    createCanvas(400, 400);
    sound.play();
  }


  function draw() {
    background(220);
    
    let angle = map(sound.currentTime(), 0, sound.duration(), 0, TWO_PI);
    push();
    translate(width/2, height/2);
    rotate(angle);
    rect(0, 0, 100, 100);
    pop();
}

function keyPressed(){
  sound.play(); 
}

function keyReleased(){
  sound.stop(); 
}
var kinectron;

function setup() {
  createCanvas(960, 540);
  background(0);
  noStroke();
  kinectron = new Kinectron('172.16.224.110');
  kinectron.makeConnection();
  kinectron.startKey(gotData);
}

function draw() {
 // background(220);
}

function gotData(data){
  loadImage(data.src,gotImage);
  //this is a callback that triggers another callback
}

function gotImage(img){
  image(img,0,0);
}

//load tracks
var track1 = new Tone.Player('Tracks/Killmonger1.mp3').toMaster()
var track2 = new Tone.Player('Tracks/Killmonger2.mp3').toMaster()
var track3 = new Tone.Player('Tracks/Killmonger3.mp3').toMaster()
var track4 = new Tone.Player('Tracks/Killmonger4.mp3').toMaster()
var track5 = new Tone.Player('Tracks/Killmonger5.mp3').toMaster()
var track6 = new Tone.Player('Tracks/Killmonger6.mp3').toMaster()
var track7 = new Tone.Player('Tracks/Killmonger7.mp3').toMaster()
var track8 = new Tone.Player('Tracks/Killmonger8.mp3').toMaster()
var track9 = new Tone.Player('Tracks/Killmonger9.mp3').toMaster()
var track10 = new Tone.Player('Tracks/Killmonger10.mp3').toMaster()
var bgColor = 0
Tone.Buffer.on('load', function() {
  bgColor = gif
})

// var gif;

// function preload() {
//   gif = loadImage('gif');
// }

function setup() {
  createCanvas(360, windowHeight);
  //var osc = new Tone.Oscillator().toMaster()
  //osc.start().stop('+0.1')
}

function keyPressed() {
  console.log('pressed', keyCode)
  if (keyCode === 75 && track1.loaded) { // K
    track1.start()
  } else if (keyCode === 73) { // I
    track2.start()
  } else if (keyCode === 76) { // L
    track3.start()
  } else if (keyCode === 191) { // /
    track4.start()
  } else if (keyCode === 77) { // M
    track5.start()
  } else if (keyCode === 79) { // O
    track6.start()
  } else if (keyCode === 78) { // N
    track7.start()
  } else if (keyCode === 71) { // G
    track8.start()
  } else if (keyCode === 69) { // E
    track9.start()
  } else if (keyCode === 82) { // R
    track10.start()
  }
}

function keyReleased() {
  console.log('released', keyCode)
  if (keyCode === 75 && track1.loaded) { // K
    track1.stop()
  } else if (keyCode === 73) { // I
    track2.stop()
  } else if (keyCode === 76) { // L
    track3.stop()
  } else if (keyCode === 191) { // /
    track4.stop()
  } else if (keyCode === 77) { // M
    track5.stop()
  } else if (keyCode === 79) { // O
    track6.stop()
  } else if (keyCode === 78) { // N
    track7.stop()
  } else if (keyCode === 71) { // G
    track8.stop()
  } else if (keyCode === 69) { // E
    track9.stop()
  } else if (keyCode === 82) { // R
    track10.stop()
  }
}

function draw() {
  background(gif);
}//load our files
var track1 = new Tone.Player('Tracks/Killmonger1.mp3').toMaster()
var track2 = new Tone.Player('Tracks/Killmonger2.mp3').toMaster()
var track3 = new Tone.Player('Tracks/Killmonger3.mp3').toMaster()
var track4 = new Tone.Player('Tracks/Killmonger4.mp3').toMaster()
var track5 = new Tone.Player('Tracks/Killmonger5.mp3').toMaster()
var track6 = new Tone.Player('Tracks/Killmonger6.mp3').toMaster()
var track7 = new Tone.Player('Tracks/Killmonger7.mp3').toMaster()
var track8 = new Tone.Player('Tracks/Killmonger8.mp3').toMaster()
var track9 = new Tone.Player('Tracks/Killmonger9.mp3').toMaster()
var track10 = new Tone.Player('Tracks/Killmonger10.mp3').toMaster()
var bgColor = 0
Tone.Buffer.on('load', function(){
  bgColor = 255
})

var img;
function preload() {
  img = loadImage('PlaylistCover.png');
}

function setup() { 
  createCanvas(displayWidth, displayHeight);
  //var osc = new Tone.Oscillator().toMaster()
  //osc.start().stop('+0.1')
}

function keyPressed(){
 console.log('pressed', keyCode) 
  if (keyCode === 75 && track1.loaded){ // K
    track1.start()
  } else if (keyCode === 73){ // I
    track2.start()
  } else if (keyCode === 76){ // L
    track3.start()
  } else if (keyCode === 191){ // /
    track4.start()
  } else if (keyCode === 77){ // M
    track5.start()
  } else if (keyCode === 79){ // O
    track6.start()
  } else if (keyCode === 78){ // N
    track7.start()
  } else if (keyCode === 71){ // G
    track8.start()
  } else if (keyCode === 69){ // E
    track9.start()
  } else if (keyCode === 82){ // R
    track10.start()
}
      }
      
function keyReleased(){
 console.log('released', keyCode) 
  if (keyCode === 75 && track1.loaded){ // K
    track1.stop()
  } else if (keyCode === 73){ // I
    track2.stop()
  } else if (keyCode === 76){ // L
    track3.stop()
  } else if (keyCode === 191){ // /
    track4.stop()
  } else if (keyCode === 77){ // M
    track5.stop()
  } else if (keyCode === 79){ // O
    track6.stop()
  } else if (keyCode === 78){ // N
    track7.stop()
  } else if (keyCode === 71){ // G
    track8.stop()
  } else if (keyCode === 69){ // E
    track9.stop()
  } else if (keyCode === 82){ // R
    track10.stop()
}
	}

function draw() { 
  background(img);
}function setup() { 
  createCanvas(400, 400);
  // var osc = new Tone.Oscillator().toMaster()
  // osc.start().stop('+1)
} 

function draw() { 
  background(0);
}`function setup() { 
  createCanvas(400, 400);
  
  var h = hour();
} 

function draw() { 
  background(255, 228, 196)
  fill (120, 55, 120)
  textSize(50)
  m = month()
  d = day()
  y = year()
  h = hour()
  mi = minute()
  se = second()
  text(m + '.' + d + ',' + y, 100, 250)
  textSize(30)
  text(h + ':' + mi + ':' + se, 100, 350)
}
//set time keeper so that console shows how soon user reloads
if (window.performance) {
  console.info("window.performance work's fine on this browser");
}
  if (performance.navigation.type == 1) {
    console.info( "This page is reloaded" );
  } else {
    console.info( "This page is not reloaded");
  }

function setup() {
	createCanvas(500,500);
}

function draw() { 
background(255);

// fill(17,28,118);
// textSize(50);
// textFont("Arial");
// textStyle("bold");
// text("Loading...", 70, 70);
  
}// Get node's HTTP functionality: https://nodejs.org/api/http.html
// let http = require('http');
let port = process.env.PORT || 8000;

// Make a web server
http.createServer(function (req, res) {
  // Send a request to your server from your browser here: http://localhost:8000/
  // Print out the request
  console.log(req);
  // Send an A-OK status
  // Go to the Network tab of your browser console
  // Reload the page to see the status message
  res.writeHead(200);
  // Send a message back to the client
  // No html required!
  res.end('Loading...', req);
}).listen(port);

//check for navigation time API support
if (window.performance) {
  console.info("window.performance work's fine on this browser");
}
  if (performance.navigation.type == 1) {
    console.info( "This page is reloaded" );
  } else {
    console.info( "This page is not reloaded");
  }

console.log('Server listening on port: ', port);
console.log(console.info);//create function for spots
function spots(){
   frameRate(4);
  spot.x = random(0,width);
  spot.y = random(height, 0);
  noStroke();
  fill(col.r,col.g,col.b);
  ellipse (spot.x,spot.y,30,30);
}

//create function for spot location
var spot = {
  x:100,
  y:50,
}

//create function for spot color
var col = {
  r:250,
  g:230,
  b:240,
}


function setup() { 
  createCanvas(windowWidth, windowHeight);
} 

function draw() { 
   background(254,143,132);
  
spots();
  spots(1);
  spots(2);
  spots(3);
  spots(4);
  spots(5);
  spots(6);
  spots(7);
  spots(8);
  
 	col.r = random(254,143);
	col.g = random(132,143);
  col.b = random(132,254);
}function setup() { 
  //createCanvas(400, 400);
} 

function draw() { 
  //background(0);
}//StephaniePaige
//10.27-31.2017
//p5.js, Chrome, Mac

let audio;
var img1;
let clickCounter = 0;

function preload() {
  img1 = loadImage("strangerthings1.jpg");
  img2 = loadImage("strangerthings2.jpg");

  soundFormats('mp3');
  audio = loadSound("strangerThingsRing.mp3");
}


function setup() {
  createCanvas(400, 400);
  image(img1, 0, 0, 400 * 0.8, 400);
  document.getElementById("gif").width = str(400 * 0.8); // document.getElementById("gif").position = absolute;

}
//create functions for what happens each time the mouse is pressed
function mousePressed() {
  clickCounter++;
  //if the mouse has not yet been pressed, display the first image, hide the gif
  if (clickCounter == 0) {
    image(img1, 0, 0, 400 * 0.8, 400);
    document.getElementById("gif").setAttribute("style", "visibility: hidden;");
  }
  //if the mouse has been pressed once, display the second image and play audio
  else if (clickCounter == 1) {
    audio.play();
    image(img2, 0, 0, 400 * 0.8, 400);
  }
  //if the mouse is pressed again, display gif
  else if (clickCounter == 2) {
    document.getElementById("gif").setAttribute("style", "visibility: visible;");
  }
  //if the mouse is pressed again, start over.
  if (clickCounter == 2) {
    clickCounter = -1;
  }
}

// function draw() { 

// }var img;
function preload() {
  img = loadImage("strangerthings1.jpg");
}


function setup() {
  // Top-left corner of the img is at (0, 0)
  // Width and height are the img's original width and height
  image(img, 0, 0);
}

function draw() { 

}//Stevie Paige
//Oct272017
//Week 6 Homework ICM
//p5JS . MacOX . Safari


//All of the code is in HTML!


function setup() {
  canvas = createCanvas(0);
  canvas.position(0,0);

}

function draw() {
  
	}
//Stevie Paige
//Oct272017
//Week 7 Homework ICM
//p5JS . MacOX . Safari

var api = "http://api.giphy.com/v1/gifs/search?";
var apiKey = "&api_key=sGx5R5VRbdrCnCNfx9yDAoOs3sGx7vbG";
var query = "&q=whitney-houston"; //make this 30!


function setup() {
  canvas = createCanvas(1200, 1200);
  canvas.position(0, 0);
  var url = api + apiKey + query;
  loadJSON(url, gotData);
}

function draw() {

  //How do I draw button here that I can press to REVEAL
  //my data function below?! Rather than having the giphy sit below
  //the movie gif img.
}


function gotData(giphy) {
  for (var i = 0; i < giphy.data.length; i++) {
    var img = createImg(giphy.data[i].images.original.url);
    img.size(140, 140);
  }
}let lion1;
let lion2;

// create lion
lion1 = new lion(150, 100);
lion2 = new lion(300, 100);

function setup() {
  createCanvas(600, 400);
}


function draw() {
  background(172, 235, 255);
  fill(172, 205, 164);
  rect(0, 265, 600, 200);


  // display lion
  lion1.display();
  lion2.display();


//   // move lion
  lion1.move();
  lion2.move();

}

  
  var movies;

function preload() {
  movies = loadJSON("https://api.themoviedb.org/3/discover/movie?api_key=6de76be33834de90a19a90f2315df5e4&year=2016");
}

function setup() {
  createCanvas(400, 400);


}

function draw() {
  background(255);
  for (var i = 0; i < movies.results.length; i++) {
	  text(movies.results[i].title, 10, 50+i*20);
  }

}let serial; // variable to hold an instance of the serialport library
let hedgie1;
let portName = '/dev/cu.usbmodem1421'; // fill in your serial port name here
let inData;

// create hedgehog
hedgie1 = new Hedgie(150, 100);

function setup() {
  createCanvas(600, 400);
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
    console.log(i + " " + portList[i]);
  }
}

function serverConnected() {
  console.log('connected to server.');
}

function portOpen() {
  console.log('the serial port opened.')
}

function serialEvent() {
  let data = serial.read();
  console.log("the value is " + data);
  hedgie1.moveTo(data);

}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}




function draw() {
  background(172, 205, 164);
  fill(223, 216, 178);
  rect(0, 270, 600, 200);


  // display hedgehog
  hedgie1.display();


  // // move hedgehog
  // hedgie1.move();

}

// function parseData() {
//   var inData = serial.readLine();
//   if (inData.length >0) (
//     var values = inData.split(',');
//   // var values = splitTokens(inData, ',');

  
  let serial; // variable to hold an instance of the serialport library
let lion1;
let lion2;
let portName = '/dev/cu.usbmodem1451'; // fill in your serial port name here
let inData;

// create lion
lion1 = new lion(150, 100);
lion2 = new lion(300, 100);

function setup() {
  createCanvas(600, 400);
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
    console.log(i + " " + portList[i]);
  }
}

function serverConnected() {
  console.log('connected to server.');
}

function portOpen() {
  console.log('the serial port opened.')
}

function serialEvent() {
  let data = serial.read();
  console.log("the value is " + data);
  lion1.moveTo(data);

}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}




function draw() {
  background(172, 235, 255);
  fill(172, 205, 164);
  rect(0, 265, 600, 200);


  // display lion
  lion1.display();
  lion2.display();


//   // move lion
  lion1.move();
  lion2.move();

}

// function parseData() {
//   var inData = serial.readLine();
//   if (inData.length >0)
//     var values = inData.split(',')
//   // var values = splitTokens(inData, ',');
// }
  
  // Stephanie Chambers

// An array of buttons
var buttons = new Array(6);

var bubbles = [];

function setup() {
  createCanvas(600, 600);
  // A loop to evenly space out the buttons along the window
  for (var i = 0; i < buttons.length; i++) {
    buttons[i] = new Button(i*100+25, height/2-25, 60, 60);
  }
  
	function mousePressed() {
  bubbles.push(new Bubble(mouseX, mouseY));
}
}

function draw() {
  background(30,150,180);
  // Show all the buttons
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].display();
  }
}

function mousePressed() {
  // When the mouse is pressed, we must check every single button
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].click(mouseX, mouseY);
  }
  for (var h = 0; h < bubbles.length; i++) {
    bubbles[h].move();
    bubbles[h].display();
  }
}

function Bubble(x, y) {
  that.x = x;
  that.y = y;

  that.display = function() {
    stroke(255);
    fill(255, 0, 150, 50);
    ellipse(that.x, that.y, 24, 24);
  }

  that.move = function() {
    that.x = that.x + random(-1, 1);
    that.y = that.y + random(-1, 1);
  }
}
  
}// Stephanie Chambers

// An array of buttons
var buttons = new Array(6);

function setup() {
  createCanvas(600, 600);
  // A loop to evenly space out the buttons along the window
  for (var i = 0; i < buttons.length; i++) {
    buttons[i] = new Button(i*100+25, height/2-25, 60, 60);
  }
}

function draw() {
  background(30,150,180);
  // Show all the buttons
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].display();
  }
}

function mousePressed() {
  // When the mouse is pressed, we must check every single button
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].click(mouseX, mouseY);
  }
}//ConfettiParty!
//ICM Week 4 Homework. Functions Assignment
//Stephanie Paige Chambers
//Oct.3.2017
//framework : runs in p5js, MacOX, Chrome

function confettiParty(){
  textSize(27);
  stroke(0);
  strokeWeight(5);
	textFont("Georgia");
  textStyle("italic");
  text("Confetti Party!", height/2, width/2);
}

//create function for spots
function spots(){
   frameRate(20);
  spot.x = random(0,width);
  spot.y = random(0, height);
  
  noStroke();
  fill(col.r,col.g,col.b);
  ellipse (spot.x,spot.y,10,10);

}

//create function for spot location
var spot = {
  x:100,
  y:50,
}

//create function for sprinkles
function sprinkles(){
   frameRate(20);
  sprinkles.x = random(0,width);
  sprinkles.y = random(0, height);
  
  noStroke();
  fill(col.r,col.g,col.b);
  ellipse (sprinkles.x,sprinkles.y,20,10);

}

//create function for spot location
var sprinkles = {
  x:100,
  y:50,
}

//create function for spot color
var col = {
  r:250,
  g:230,
  b:240,
}

function setup() { 
  createCanvas(400, 400);
} 

function draw() {
  //make moving dots on flashy background
    // background(random(220,255), random(0,220), random(255));
  //make confetti by removing background!
  
  //add Confetti Party words.
  confettiParty();
  
  //add spots/confetti
  spots();
  spots(1);
  spots(2);
  spots(3);
  spots(4);
  spots(5);
  // spots(6);
  // spots(7);
  // spots(8);
  
  //add sprinkles
  sprinkles();
  
  
 	col.r = random(220,255);
	col.g = random(0,220);
  col.b = random(255);

}// Power On

var dragging = false; // Is the slider being dragged?
var rollover = false; // Is the mouse over the slider?

// Rectangle variables for slider
var x = 0;
var y = 10;
var w = 10;
var h = 10;
 //Start and end of slider
var sliderStart = 100;
var sliderEnd = 130;
// Offset for dragging slider
var offsetX = 0; 


function setup() { 
  createCanvas(700, 700);
  
  
  
  
img = loadImage("https://www.unilad.co.uk/wp-content/uploads/2016/08/tupac1.jpg");
  
} 

function draw() { 
background(255);
  
    
  
	//Gameboy
fill(219,217,208);
noStroke();
rect(30, 20, 400, 650, 20, 20, 100, 20);

stroke(180);
strokeWeight(5);
line(32,50,426,50);
line(70,22,70,50);
line(390,22,390,50);

//Power button 
fill(219,217,208);
line(100,19,115,19);

// why is the line length different from the gameboy's width?
	
  // screen border
fill(85,87,120);
noStroke();
rect(70, 70, 320, 250, 20, 20, 60, 20);
  


  
// Nintendo words
fill(17,28,118);
textSize(18);
textFont("Arial");
textStyle("bold");
text("Nintendo", 70, 350);
  // Game Boy words
fill(17,28,118);
textSize(24);
textFont("Arial");
textStyle("italic");
text("GAME BOY", 152, 350);
  // TM words
fill(17,28,118);
textSize(8);
textFont("Arial");
textStyle("bold");
text("TM", 280, 350);


   // Speakers
push();
translate(70, 400);
rotate(-44.4);
stroke(140);
strokeWeight(1);
noFill();
rect(98, 250, 10, 70, 20, 20, 20, 20);
rect(122, 250, 10, 70, 20, 20, 20, 20);
rect(146, 250, 10, 70, 20, 20, 20, 20);
rect(168, 250, 10, 70, 20, 20, 20, 20);
rect(192, 250, 10, 70, 20, 20, 20, 20);
rect(216, 250, 10, 70, 20, 20, 20, 20);
//why do the rectangles move together when one x value is changed 
  
  // select and start buttons
fill(140);
noStroke();
textSize(15);
rect(0, 150, 60, 12, 20, 20, 20, 20);
rect(60, 190, 60, 12, 20, 20, 20, 20);
fill(17,28,118);
text("SELECT", 2, 178);
text("START", 66, 218);
  // A and B buttons 
fill(140, 27, 79);
ellipse(260,150, 50, 50);
ellipse(190,150, 50, 50);
fill(17,28,118);
text("A", 255,190);
text("B", 185,192);
pop();
  
  // D-pad
fill(0);
  rect( 70, 425, 85, 35, 5, 5, 5, 5);
 rect( 95, 400, 35, 85, 5, 5, 5, 5);

  // turn on power button
  if ( mouseIsPressed && sliderEnd == 130) {
  // screen 
fill(0,frameCount%260, 0);
  rect(130, 100, 200, 180);
    } 
  
  // start image 
//checks i
  
 /* if (mouseIsPressed && mouseY>=100 && mouseY<=280 && mouseX>=130 && mouseX<=300) {
    //tv-set
    strokeWeight(1);
    stroke(0);
    stroke(44);
    strokeWeight(2);
    rect(0, -100, 150, 100);
    image(img2, 1, -98, 148, 98); */
// image(img, 130, 100, 200, 180);
  
  
   // Is it being dragged?
  if (dragging) {
    x = mouseX + offsetX;
  }
  // Keep rectangle within limits of slider
  x = constrain(x, sliderStart, sliderEnd-w);

  // Draw a line for slider
  stroke(0);
  //line(sliderStart, y+h/2, sliderEnd, y+h/2);

  stroke(0);
  // Fill according to state
  if (dragging) {
    fill (50);
  } else {
    fill(175);
  }
  // Draw rectangle for slider
  rect(x, y, w, h);

  // Map is an amazing function that will map one range to another!
  // Here we take the slider's range and map it to a value between 0 and 255
  var b = map(x,sliderStart,sliderEnd-w,0,255);
  //fill(b);
  //rect(sliderStart, 100, sliderEnd-sliderStart, 150);
}

function mousePressed() {
  // Did I click on slider?
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX = x-mouseX;
  }
}

function mouseReleased() {
  // Stop dragging
  dragging = false;
  
}//Bouncing Ball
//StephanieChambers
//NoneWorkingBouncingBall
//9202017
//p5.js - javascript, chrome, macOS

var ball = {
  x: 0,
  y: 0,
  d: 0,
  xspeed: 10,
  yspeed: 10
};

var button = {
  x: 0,
  y: 0,
  d: 100
};
  
function setup() { 
  createCanvas(400, 400);
  
  ball.x = random(0, width);
  ball.y = random(0, height);
  ball.d = random(10, 30);
  
  button.x = width - button.d;
  button.y = height - button.d;

} 

function draw() { 
  background(220);
}

//make button
  rect(button.x, button.y, button.d, button.d);
//change color of button when pressed, within parameters
  if (mouseIsPressed && mouseX > button.x && mouseX < button.x + button.d &&
      mouseY > button.y && mouseY < button.y + button.d) {
  fill(0);
} else {
  fill(255);
}

//make ball
ellipse(ball.x, ball.y, ball.d);

//makeballmove

ball.x = ball.x + ball.xspeed;
ball.y = ball.y + ball.yspeed; 

if (ball.x > width || ball.x < 0) {
 ball.xspeed = ball.xspeed * -1;
}

if (ball.y > height || ball.y < 0) {
 ball.yspeed = ball.yspeed * -1;
}
//Declaring variables

var boat = {
  x1: -210,
  y1: 196,
  r: 0,
}

var waves = {
  x2: -20,
  y2: 410,
}


function setup() {

  createCanvas(800, 600);
  frameRate(random(10, 120));
}



function draw() {

  background(0, 0, 70);

  //Draw the moon
  noStroke();
  fill(random(255), random(255), 0);
  ellipse(mouseX, mouseY, 100);


  //Draw the boat  
  fill(0, random(100, 255), random(100, 255));
  noStroke();
  triangle(boat.x1, boat.y1, boat.x1, boat.y1 + 137, boat.x1 + 86, boat.y1 + 98);

  fill(0, random(100, 255), random(100, 255));
  triangle(boat.x1, boat.y1, boat.x1, boat.y1 + 137, boat.x1 - 87, boat.y1 + 98);

  fill(0, random(100, 255), random(100, 255));
  triangle(boat.x1 - 210, boat.y1 + 42, boat.x1, boat.y1 + 137, boat.x1 - 124, boat.y1 + 208);

  fill(0, random(100, 255), random(100, 255));
  triangle(boat.x1 + 210, boat.y1 + 42, boat.x1, boat.y1 + 137, boat.x1 + 123, boat.y1 + 208);

  fill(0, random(100, 255), random(100, 255));
  triangle(boat.x1, boat.y1 + 137, boat.x1 - 124, boat.y1 + 208, boat.x1 + 123, boat.y1 + 208);

  fill(0, random(100, 255), random(100, 255));
  triangle(boat.x1 - 210, boat.y1 + 42, boat.x1 - 67, boat.y1 + 75, boat.x1 - 87, boat.y1 + 98);

  fill(0, random(100, 255), random(100, 255));
  triangle(boat.x1 + 210, boat.y1 + 42, boat.x1 + 86, boat.y1 + 98, boat.x1 + 66, boat.y1 + 75);

  //Move the boat 
  boat.x1 = boat.x1 + 1;

  if (boat.x1 > width + 210) {
    boat.x1 = -210;
  }
waves.x2=-20;

  //Draw the waves,using loops
  for(waves.x2=-20; waves.x2<width; waves.x2+=150){
    for(waves.y2=410; waves.y2<height; waves.y2+=50){
    noFill();
    stroke(0, 0, random(150, 255));
    strokeWeight(15);
    
    bezier(waves.x2, waves.y2, waves.x2 + 50, waves.y2 + 50, waves.x2 + 100, waves.y2 - 50, waves.x2 + 150, waves.y2);
    }
  }
      

 

  /*
  bezier(waves.x2, waves.y2, waves.x2 + 50, waves.y2 + 50, waves.x2 + 100, waves.y2 - 50, waves.x2 + 150, waves.y2);
  bezier(waves.x2, waves.y2 + 50, waves.x2 + 50, waves.y2 + 100, waves.x2 + 100, waves.y2, waves.x2 + 150, waves.y2 + 50);
  bezier(waves.x2, waves.y2 + 100, waves.x2 + 50, waves.y2 + 150, waves.x2 + 100, waves.y2 + 50, waves.x2 + 150, waves.y2 + 100);
  bezier(waves.x2, waves.y2 + 150, waves.x2 + 50, waves.y2 + 200, waves.x2 + 100, waves.y2 + 100, waves.x2 + 150, waves.y2 + 150);

  bezier(waves.x2 + 150, waves.y2, waves.x2 + 200, waves.y2 + 50, waves.x2 + 250, waves.y2 - 50, waves.x2 + 300, waves.y2);
  bezier(waves.x2 + 150, waves.y2 + 50, waves.x2 + 200, waves.y2 + 100, waves.x2 + 250, waves.y2, waves.x2 + 300, waves.y2 + 50);
  bezier(waves.x2 + 150, waves.y2 + 100, waves.x2 + 200, waves.y2 + 150, waves.x2 + 250, waves.y2 + 50, waves.x2 + 300, waves.y2 + 100);
  bezier(waves.x2 + 150, waves.y2 + 150, waves.x2 + 200, waves.y2 + 200, waves.x2 + 250, waves.y2 + 100, waves.x2 + 300, waves.y2 + 150);

  bezier(waves.x2 + 300, waves.y2, waves.x2 + 350, waves.y2 + 50, waves.x2 + 400, waves.y2 - 50, waves.x2 + 450, waves.y2);
  bezier(waves.x2 + 300, waves.y2 + 50, waves.x2 + 350, waves.y2 + 100, waves.x2 + 400, waves.y2, waves.x2 + 450, waves.y2 + 50);
  bezier(waves.x2 + 300, waves.y2 + 100, waves.x2 + 350, waves.y2 + 150, waves.x2 + 400, waves.y2 + 50, waves.x2 + 450, waves.y2 + 100);
  bezier(waves.x2 + 300, waves.y2 + 150, waves.x2 + 350, waves.y2 + 200, waves.x2 + 400, waves.y2 + 100, waves.x2 + 450, waves.y2 + 150);

  bezier(waves.x2 + 450, waves.y2, waves.x2 + 500, waves.y2 + 50, waves.x2 + 550, waves.y2 - 50, waves.x2 + 600, waves.y2);
  bezier(waves.x2 + 450, waves.y2 + 50, waves.x2 + 500, waves.y2 + 100, waves.x2 + 550, waves.y2, waves.x2 + 600, waves.y2 + 50);
  bezier(waves.x2 + 450, waves.y2 + 100, waves.x2 + 500, waves.y2 + 150, waves.x2 + 550, waves.y2 + 50, waves.x2 + 600, waves.y2 + 100);
  bezier(waves.x2 + 450, waves.y2 + 150, waves.x2 + 500, waves.y2 + 200, waves.x2 + 550, waves.y2 + 100, waves.x2 + 600, waves.y2 + 150);

  bezier(waves.x2 + 600, waves.y2, waves.x2 + 650, waves.y2 + 50, waves.x2 + 700, waves.y2 - 50, waves.x2 + 750, waves.y2);
  bezier(waves.x2 + 600, waves.y2 + 50, waves.x2 + 650, waves.y2 + 100, waves.x2 + 700, waves.y2, waves.x2 + 750, waves.y2 + 50);
  bezier(waves.x2 + 600, waves.y2 + 100, waves.x2 + 650, waves.y2 + 150, waves.x2 + 700, waves.y2 + 50, waves.x2 + 750, waves.y2 + 100);
  bezier(waves.x2 + 600, waves.y2 + 150, waves.x2 + 650, waves.y2 + 200, waves.x2 + 700, waves.y2 + 100, waves.x2 + 750, waves.y2 + 150);

  bezier(waves.x2 + 750, waves.y2, waves.x2 + 800, waves.y2 + 50, waves.x2 + 850, waves.y2 - 50, waves.x2 + 900, waves.y2);
  bezier(waves.x2 + 750, waves.y2 + 50, waves.x2 + 800, waves.y2 + 100, waves.x2 + 850, waves.y2, waves.x2 + 900, waves.y2 + 50);
  bezier(waves.x2 + 750, waves.y2 + 100, waves.x2 + 800, waves.y2 + 150, waves.x2 + 850, waves.y2 + 50, waves.x2 + 900, waves.y2 + 100);
  bezier(waves.x2 + 750, waves.y2 + 150, waves.x2 + 800, waves.y2 + 200, waves.x2 + 850, waves.y2 + 100, waves.x2 + 900, waves.y2 + 150);
  */
}//create function for spots
function spots(){
   frameRate(2);
  spot.x = random(0,width);
  spot.y = random(180, 220);
  noStroke();
  fill(col.r,col.g,col.b);
  ellipse (spot.x,spot.y,30,30);
}

//create function for spot location
var spot = {
  x:100,
  y:50,
}

//create function for spot color
var col = {
  r:250,
  g:230,
  b:240,
}

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
   background(0);
  
spots();
  spots(1);
  spots(2);
  spots(3);
  spots(4);
  
 	col.r = random(100,240);
	col.g = random(204,255);
  col.b = random(0,204);
  
//   frameRate(2);
//   spot.x = random(0,width);
//   spot.y = random(180, 220);
//   noStroke();
//   fill(col.r,col.g,col.b);
//   ellipse (spot.x,spot.y,30,30);

}//header
//PacManInMotion!
//ICMHomeworkWeek2
//StephaniePaigeChambers
//9192017
//framework: runs in p5.js, on chrome, on Macbook

//HomeworkDetailsBelow
// Create a sketch that includes (all of these):
// One element controlled by the mouse.
// One element that changes over time, independently of the mouse.
// One element that is different every time you run the sketch.

//global variables
//horizontal position of pacman

//speed of pacman
var speed = 3;
//direction
var movementDir = 1;
//diameter of pacman
var diameterPacman = 180;
var posX = diameterPacman/2;

var isPacmanLeft = false;

//variable for floor position
var floorY;

//variable for movement of dots

var spot = {
  x: posX,
  y: floorY,
}

//color of dots
var col = {
  r:255,
  g:0,
  b:0,
}


//setup() runs once, at the beginning
function setup() { 
  //create square canvas, 800 px wide, 400 px high

  createCanvas(800, 400);
  
  floorY = height/2
} 

//draw() runs after setup(), on a loop, forever
function draw() { 
  background(0,100);
  //floor
  line(0,floorY,width,floorY);
  
	//dot
  //OneElementControlledByMouse CHECK
  fill(255);
	ellipse (mouseX, floorY-diameterPacman/2, 30, 30);
  
  //ColorfulMovingDots
  //OneElementThatIsDifferentEveryTimeYouRunTheSketch CHECK
 	col.r = random(100,255);
	col.g = random(204,255);
  col.b = random(204,220);
  


  frameRate(50);
  spot.x = random(0,width);
  spot.y = random(floorY,floorY*2);
  noStroke();
  fill(col.r,col.g,col.b);
  ellipse (spot.x,spot.y,30,30);
  
//OneElementThatChangesOverTime CHECK
  
  //Pacmancolors
  fill(200,random(100,180),random(180,255));

//   arc(a,b,c,d,start,stop,[mode])
// a	Number: x-coordinate of the arc's ellipse
// b	Number: y-coordinate of the arc's ellipse
// c	Number: width of the arc's ellipse by default
// d	Number: height of the arc's ellipse by default
// start	Number: angle to start the arc, specified in radians
// stop	Number: angle to stop the arc, specified in radians
// mode	Constant: optional parameter to determine the way of drawing the arc. either CHORD or PIE
//   arc(0, - posX, 180, 180, 80, PI+QUARTER_PI, PIE);
  
  //pacman walking to the left
  if (isPacmanLeft) {
    arc(posX, floorY-diameterPacman/2, diameterPacman, diameterPacman, PI+QUARTER_PI/2, PI+(QUARTER_PI/2+ PI+3*QUARTER_PI), PIE);
  }
  
  //pacman walking to the right
  else {
    arc(posX, floorY-diameterPacman/2, diameterPacman, diameterPacman, QUARTER_PI/2, QUARTER_PI/2+ PI+3*QUARTER_PI, PIE);
  }
  
  
  //check if it reaches the right border
  if (posX > width - diameterPacman/2) {
    //change direction of movement
    movementDir = movementDir * (-1);
    console.log("now go to the left");
    isPacmanLeft = true;
  }
  
  	//check if it reaches the left border
   if (posX < 0 + diameterPacman/2) {
    //change direction of movement
    movementDir = movementDir * (-1);
    console.log("now go to the right");
    isPacmanLeft = false; 
  }
  
  //update position, move the pacman
  posX = posX + movementDir * speed;
}//header
//Pacman
//StephaniePaige
//9152017
//framework: runs in p5.js, on chrome, on a macbook

//NEVER USE SPACES EVER PLEASE
//THIS IS GONNA SAVE YOUR LIFE
//two approaches
//the_first_one_is_using_underscores
//theSecondoneIsUsingCamelCaseThisKindaLooksLikeACamel


//global variables
//horizontal position of pacman


//speed of pacman
var speed = 3;
//direction
var movementDir = 1;
//diameter of pacman
var diameterPacman = 180;
var posX = diameterPacman/2;

//variable for floor position
var floorY;

//var backgroundColor;

var isPacmanLeft = false;

//setup() runs once, at the beginning
function setup() { 
  //create square canvas, 800 px wide, 800 px high
  createCanvas(800, 800);
  

	//backgroundColor = (0);
  
  floorY = height/2
} 

//draw() runs after setup(), on a loop, forever
function draw() { 

  background(250, 204, 0);
  
  //floor
  line(0,floorY,width,floorY);
  
	//dots
  //with a mouse
  fill(255);
	ellipse (mouseX, floorY-diameterPacman/2, 10, 10);
  ellipse (mouseX+20, floorY-diameterPacman/2, 10, 10);
  ellipse (mouseX+40, floorY-diameterPacman/2, 10, 10);
  ellipse (mouseX+60, floorY-diameterPacman/2, 10, 10);
  

  //Pacmancolors
  fill(200,random(100,180),random(180,255));

//   arc(a,b,c,d,start,stop,[mode])
// a	Number: x-coordinate of the arc's ellipse
// b	Number: y-coordinate of the arc's ellipse
// c	Number: width of the arc's ellipse by default
// d	Number: height of the arc's ellipse by default
// start	Number: angle to start the arc, specified in radians
// stop	Number: angle to stop the arc, specified in radians
// mode	Constant: optional parameter to determine the way of drawing the arc. either CHORD or PIE
//   arc(0, - posX, 180, 180, 80, PI+QUARTER_PI, PIE);
  
  //pacman walking to the left
  if (isPacmanLeft) {
    //TODO change the angles so it actually works
    arc(posX, floorY-diameterPacman/2, diameterPacman, diameterPacman, PI+QUARTER_PI/2, PI+(QUARTER_PI/2+ PI+3*QUARTER_PI), PIE);
  }
  
  //pacman walking to the right
  else {
    arc(posX, floorY-diameterPacman/2, diameterPacman, diameterPacman, QUARTER_PI/2, QUARTER_PI/2+ PI+3*QUARTER_PI, PIE);
  }
  
  
  //check if it reaches the right border
  if (posX > width - diameterPacman/2) {
    //change direction of movement
    movementDir = movementDir * (-1);
    console.log("now go to the left");
    isPacmanLeft = true;
  }
  
  	//check if it reaches the left border
   if (posX < 0 + diameterPacman/2) {
    //change direction of movement
    movementDir = movementDir * (-1);
    console.log("now go to the right");
    isPacmanLeft = false; 
  }
  
  //update position, move the pacman
  posX = posX + movementDir * speed;
}//header
//Pacman
//StephaniePaige
//9152017
//framework: runs in p5.js, on chrome, on a macbook

//NEVER USE SPACES EVER PLEASE
//THIS IS GONNA SAVE YOUR LIFE
//two approaches
//the_first_one_is_using_underscores
//theSecondoneIsUsingCamelCaseThisKindaLooksLikeACamel


//global variables
//horizontal position of pacman


//speed of pacman
var speed = 3;
//direction
var movementDir = 1;
//diameter of pacman
var diameterPacman = 180;
var posX = diameterPacman/2;

//variable for floor position
var floorY;

var isPacmanLeft = false;



//setup() runs once, at the beginning
function setup() { 
  //create square canvas, 800 px wide, 800 px high
  createCanvas(800, 800);
  
  floorY = height/2
} 

//draw() runs after setup(), on a loop, forever
function draw() { 
  
  //grey background
  background(220);

  //floor
  line(0,floorY,width,floorY);
  
  fill(200,random(100,180),random(180,255));

//   arc(a,b,c,d,start,stop,[mode])
// a	Number: x-coordinate of the arc's ellipse
// b	Number: y-coordinate of the arc's ellipse
// c	Number: width of the arc's ellipse by default
// d	Number: height of the arc's ellipse by default
// start	Number: angle to start the arc, specified in radians
// stop	Number: angle to stop the arc, specified in radians
// mode	Constant: optional parameter to determine the way of drawing the arc. either CHORD or PIE
//   arc(0, - posX, 180, 180, 80, PI+QUARTER_PI, PIE);
  
  //pacman walking to the left
  if (isPacmanLeft) {
    //TODO change the angles so it actually works
    arc(posX, floorY-diameterPacman/2, diameterPacman, diameterPacman, PI+QUARTER_PI/2, PI+(QUARTER_PI/2+ PI+3*QUARTER_PI), PIE);
  }
  
  //pacman walking to the right
  else {
    arc(posX, floorY-diameterPacman/2, diameterPacman, diameterPacman, QUARTER_PI/2, QUARTER_PI/2+ PI+3*QUARTER_PI, PIE);
  }
  
  
  //check if it reaches the right border
  if (posX > width - diameterPacman/2) {
    //change direction of movement
    movementDir = movementDir * (-1);
    console.log("now go to the left");
    isPacmanLeft = true;
  }
  
  	//check if it reaches the left border
   if (posX < 0 + diameterPacman/2) {
    //change direction of movement
    movementDir = movementDir * (-1);
    console.log("now go to the right");
    isPacmanLeft = false; 
  }
  
  //update position, move the pacman
  posX = posX + movementDir * speed;
  
}var square;
var other;

function setup() { 
  createCanvas(400, 400);
  
  square = {
    x:10,
    y:100,
    w:50,
    h:50
};
  
  other = {
    x:100,
    y:50,
    w:random(0,100),
    h:random(0,50)
  };
}

function draw() { 
  
	background(220);
  
  square.x++;
  other.y++;
  
  rect(square.x, square.y, square.w, square.h);
  rect(other.x,other.y, other.w, other.h);
  
}function setup() { 
  createCanvas(400, 400);
  

  frameRate(4);
} 

var x, y;


function draw() { 
  background(220);

  rect(x,y,20,50);
  
    
  fill(random(200,250));
  rect(50, 50, 52, 52);
  fill(mouseX);
  rect(75, 75, 52, 52);
  
  //Random movement
//with a mouse
  fill(mouseX, mouseY, random(200-255));
	rect(mouseX, mouseY,20,50);
//on its own
  fill(255,0,0);
  rect(random(0,width),random(0,height),20,50);
//
}

//play some more!function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  //postpac
  background(255);
  fill(230,255,20);
   triangle(30, 75, 80, 15, 130, 75);
  line(30,75,30,125)
  triangle(30,125, 80, 185, 130, 125);
  fill(0);
  //I think I've just completed my first code for the
  //image I drew in class on 9/6!
  //I'm patting myself on the back :)
  
  //sortapac
  fill(255,255,20);
  arc(300, 300, 180, 180, 80, PI+QUARTER_PI, PIE);
  fill(0);
  ellipse(240, 265, 15, 8);
  //Having a hard time with *rotation*.
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(185,0,25);
line(10,105,180,80);
	//fill(0,0,255);
	noFill();
	ellipse(205,80, 50);
}