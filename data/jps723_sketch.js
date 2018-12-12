let outputP;

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
  "origin": [
    "#malenoun.capitalize#, at the #agetype# age of #age#, #adjectiveleaving# about the impending changes in his life, decided to #leavingpast# to his #hisadjective# #nounplace#. This wasn't like him.  He'd rather be at home with his #artwork.s# than #timesuck# his #valuable# time with #otherpeople#;  Today felt #feeling#. Upon #leavingpast#ing, he couldn't quite put his #bodypart# on it, but something was #eeryadjective# in the air.  It was as if the #naturenoun.s# were #eeryverb#ing at his #followbodypart#, #askverb#ing for a subtle #glancenoun#.  #nonsequitur.capitalize#, #femalenoun.capitalize#, a recent transplant from #usstate#, felt a similar #eeryverb#ing at her #followbodypart#. #age.capitalize# long years in her homestate, and nothing but a #adjectiveleaving# feeling at her core to remember it by. More #speedwalk#ly she #walktype#.  She didn't have many friends, but her #valuable# #artwork.s# held her truth. Today felt #feeling#. #nonsequitur.capitalize#, a man in the distance, rose from the #streettype# ahead. Probably a #usstate# local.  Everyone else was.  Her eyes to the #naturenoun.s# above, she #walktype#. Nevertheless, a swift approach, and soon awkward conversation ensued, right there on the #streettype# of the early morning.  Both determined to #exitverb#, they simply could not.  For once, each recognizing a #persontype# person to #timesuck# time with.  Today felt #feeling#. Over the next years their bond over #artwork.s# and #artwork.s# and even #artwork.s# grew.  New jobs took them to #usstate#, #usstate#, and #usstate#, but not before a quick detour to #usstate#.  #age.capitalize# years passed, and so did their youth.  The #artwork.s# fading alongside.  Conversation less #valuable#.  Today, today felt #feeling#.  And as they approached the #streettype# to their future, 'I am so #adjective#...' he said, 'but does that #command# that you are #mood#? she asked.  They laughed.  'What a way to #timesuck# time'."
  ],
  "bodypart": [
    "finger"
  ],
  "agetype": [
    "oppressive", 
    "tender", 
    "careful", 
    "carefree", 
    "cautious", 
    "ripe"
  ],
  "streettype": [
    "sidewalk", 
    "pavement", 
    "grasses", 
    "horizon",
    "curviture", 
    "path"
  ],
  "exitverb": [
    "exit", 
    "escape", 
    "get away"
    
  ],
  "persontype": [
    "clever", 
    "smart", 
    "compatible" 
  ],
  "timesuck": [
    "waste", 
    "kill", 
    "spend", 
    "misuse", 
    "lose",
    "misplace",
    "abandon", 
    "disrespect",
    "misdirect"
  ],
  "feeling": [
    "different", 
    "hopeful", 
    "contrasting",
    "disparate", 
    "peculiar"
    
  ],
  "valuable": [
    "valuable", 
    "precious", 
    "adored",
    "beloved",
    "cherished"
  ],
  "otherpeople": [
    "strangers", 
    "others", 
    "outsiders"
  ],
  "askverb": [
    "ask",
    "yearn",
    "pray",
    "beseech",
    "petition", 
    "canvass", 
    "call"
  ],  
  "speedwalk": [
    "quick", 
    "brisk", 
    "commanding", 
    "faint", 
    "delicate", 
    "cautioning", 
    "light"
    
    
  ],
  "walktype": [
    "tread", 
    "walked",
    "ran", 
    "ventured on", 
    "traveled forth"
    
  ],
  "artwork": [
    "sculpture", 
    "painting",
    "photo", 
    "sketch", 
    "animation",
    "film",
    "song"
    
  ],
  "age": [
    "eighteen", 
    "nineteen",
    "twenty", 
    "twenty one",
    "twenty two", 
    "twenty three",
    "twenty four",
    "twenty five",
    "twenty six",
    "twenty seven",
    "twenty eight",
    "twenty nine",
    "thirty", 
    "thirty one", 
    "thirty two",
    "thirty three",
    "thirty one",
    "thirty four",
    "thirty five",
    "thirty six",
    "thirty seven",
    "thirty eight",
    "thirty nine",
    "forty", 
    "forty one" 
  ],
  "usstate": [
    "Alabama", 
    "Alaska", 
    "American Samoa", 
    "Arizona", 
    "Arkansas", 
    "California", 
    "Colorado", 
    "Connecticut", 
    "Delaware", 
    "The District Of Columbia", 
    "The Federated States Of Micronesia", 
    "Florida", 
    "Georgia", 
    "Guam", 
    "Hawaii", 
    "Idaho", 
    "Illinois", 
    "Indiana", 
    "Iowa", 
    "Kansas", 
    "Kentucky", 
    "Louisiana", 
    "Maine", 
    "The Marshall Islands", 
    "Maryland", 
    "Massachusetts", 
    "Michigan", 
    "Minnesota", 
    "Mississippi", 
    "Missouri", 
    "Montana", 
    "Nebraska", 
    "Nevada", 
    "New Hampshire", 
    "New Jersey", 
    "New Mexico", 
    "New York", 
    "North Carolina", 
    "North Dakota", 
    "Northern Mariana Islands", 
    "Ohio", 
    "Oklahoma", 
    "Oregon", 
    "Palau", 
    "Pennsylvania", 
    "Puerto Rico", 
    "Rhode Island", 
    "South Carolina", 
    "South Dakota", 
    "Tennessee", 
    "Texas", 
    "Utah", 
    "Vermont", 
    "The U.S. Virgin Islands", 
    "Virginia", 
    "Washington", 
    "West Virginia", 
    "Wisconsin", 
    "Wyoming"
  ],
  "nonsequitur": [
    "just then",
    "meanwhile",
    "concurrently",
    "in the meantime",
    "suddenly",
    "in that same moment", 
    "precisely then"
  ],
  "glancenoun": [
    "glance",
    "look",
    "acknowledgement",
    "reference",
    "gesture",
    "validation"
  ],
  "followbodypart": [
    "back",
    "heels",
    "side",
    "ear",
    "coattail"
  ],
  "eeryadjective": [
    "awry",
    "not right", 
    "aloof", 
    "present"
  ],
  "eeryverb": [
    "skulk",
    "whisper", 
    "lurk", 
    "follow",
    "nipp"
  ],
  "malenoun": [
    "john",
    "peter",
    "carl",
    "steven",
    "jerry",
    "patrick",
    "harold", 
    "arnold", 
    "bartholomew", 
    "willy", 
    "edgar", 
    "richard", 
    "lawrence", 
    "justin", 
    "gregory", 
    "vincent", 
    "bernard", 
    "michael"
  ],
  "femalenoun": [
    "gertrude",
    "kerry",
    "jessica",
    "kathleen",
    "annamarie",
    "beth",
    "laurie",
    "laurel", 
    "deb",
    "darlene",
    "rhoda",
    "susan", 
    "trish", 
    "corrine", 
    "bella", 
    "jackeline"
  ],
  "leavingpast": [
    "leave",
    "bolt",
    "run",
    "depart",
    "rouse"
  ],
  "people": [
    "i am",
    "he is",
    "she is",
    "we are",
    "they are",
    "you are"
  ],
  "adjectiveleaving": [
    "restless",
    "anxious",
    "fidgety",
    "troubled",
    "hungry"
  ],
  "adjective": [
    "sleepy",
    "with me",
    "busy",
    "interested",
    "hungry",
    "human"
  ],
  "mood": [
    "awake",
    "not alone",
    "not lazy",
    "interesting",
    "not full"
  ],
  "hisadjective": [
    "favorite",
    "local",
    "least favorite",
    "preferred",
    "exclusive"
  ],
   "nounplace": [
    "ocean",
    "park",
    "lake",
    "store",
    "market",
    "museum",
    "gallery",
    "cafe",
    "restaurant"
  ],
  "naturenoun": [
    "cloud",
    "animal",
    "plant",
    "tree",
    "wind",
    "planet"
  ],
   "command": [
    "imply",
    "convey",
    "require",
    "describe",
    "mean",
    "justify",
    "command",
    "signify",
    "void",
    "compel"
  ]
};var audiograb;

function setup(){
  //new audioIn
  audioGrab = new p5.AudioIn();

  audioGrab.getSources(function(deviceList) {
    //print out the array of available sources
    console.log(deviceList);
    //set the source to the first item in the deviceList array
    audioGrab.setSource(0);
    console.log(deviceList.length)
  });
}// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Flow Field Following
// Via Reynolds: http://www.red3d.com/cwr/steer/FlowFollow.html

// Using this variable to decide whether to draw all the stuff
let debug = false;

let img;

// Flowfield object
let res = 1280; //???
let flowfield = new FlowField(res);
// An ArrayList of vehicles
let vehicles = [];

function setup() {
  createCanvas(1334, 988);
  img = loadImage("river.png");
  // Make a new flow field with "resolution" of 16
  flowfield = new FlowField(16);
  // Make a whole bunch of vehicles with random maxspeed and maxforce values
  vehicles.push(new Vehicle(createVector(random(width), height), 5, 1));
}


function draw() {
  background(255);
  image(img, 0, 0);
  // Display the flowfield in "debug" mode
  if (debug) flowfield.display();
  // Tell all the vehicles to follow the flow field
 for (let v = 0; v < vehicles.length; v++) {
    vehicles[v].follow(flowfield);
    vehicles[v].run();
  }
  for (let i = vehicles.length-1; i >= 0; i--) {
    //v = vehicles[i];
    //print(vehicles.size());
    if (vehicles[i].isDead()) {
      vehicles.remove(i);
    }
  }

  // Instructions
  fill(0);
  text("Hit space bar to toggle debugging lines. Click the mouse to generate a new flow field.", 10, height-20);
  if (random(1) < 0.5) {
    vehicles.push(new Vehicle(createVector(random(width), height), 5, random(0.5)));
  }
}

function keyPressed() {
  if (key == ' ') {
    debug = !debug;
  }
}

function mouseDragged() {
  vehicles.push(new Vehicle(createVector(mouseX, mouseY), 5, random(0.5)));
}// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/BjoM9oKOAKY

var inc = 0.1;
var scl = 10;
var cols, rows;

var zoff = 0;

var fr;

var particles = [];

var flowfield;

function setup() {
  createCanvas(400, 400);
  createCapture(VIDEO);
  colorMode(HSB, 255);
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');

  flowfield = new Array(cols * rows);

  for (var i = 0; i < 300; i++) {
    particles[i] = new Particle();
  }
  background(51);
}

function draw() {
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
      stroke(0, 50);
      // push();
      // translate(x * scl, y * scl);
      // rotate(v.heading());
      // strokeWeight(1);
      // line(0, 0, scl, 0);
      // pop();
    }
    yoff += inc;

    zoff += 0.0003;
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }

  fr.html(floor(frameRate()));
}// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A reference to our box2d world
let world;

// A list for all of our particles
let particles = [];

// An object to store information about the uneven surface
let surface;

function setup() {
  createCanvas(640, 360);

  // Initialize box2d physics and create the world
  world = createWorld();

  // Create the surface
  surface = new Surface();
}

function draw() {
  background(51);

  // We must always step through time!
  let timeStep = 1.0 / 30;
  // 2nd and 3rd arguments are velocity and position iterations
  world.Step(timeStep, 10, 10);

  // particles fall from the top every so often
  if (random(1) < 0.5) {
    let sz = random(4, 8);
    particles.push(new Particle(width / 2, 10, sz));
  }

  // Draw the surface
  surface.display();

  // Display all the particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].display();
    if (particles[i].done()) {
      particles.splice(i, 1);
    }
  }
}// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com
let mover;

let attractor;

function setup() {
  createCanvas(640, 360);
  mover = new Mover();
  attractor = new Attractor();
}

function draw() {
  background(200);

  let force = attractor.calculateAttraction(mover);
  mover.applyForce(force);
  mover.update();

  attractor.display();
  mover.display();
}

function mouseMoved() {
  attractor.handleHover(mouseX, mouseY);
}

function mousePressed() {
  attractor.handlePress(mouseX, mouseY);
}

function mouseDragged() {
  attractor.handleHover(mouseX, mouseY);
  attractor.handleDrag(mouseX, mouseY);
}

function mouseReleased() {
  attractor.stopDragging();
}/* Based on examples by Dan Shiffman

An array of double pendulums 'Y' anchor values travel along a sine wave with
varying amplitude


// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Double Pendulum
// https://youtu.be/uWzPe_S-RVE

*/

let pendulums = [];


var xspacing = 6; // Distance between each horizontal location
var w; // Width of entire wave
var theta = 0.0; // Start angle at 0
var amplitude = 5.0; // Height of wave
var period = 300.0; // How many pixels before the wave repeats
var dx; // Value for incrementing x
var yvalues; // Using an array to store height values for the wave
let ampGrowth = 1;


function setup() {
  createCanvas(700, 700);
  slider = createSlider(0, 100, 200);
  slider2 = createSlider(0, 100, 500);
  //////SINE WAVE

  w = width + 16;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w / xspacing));
  createPendulums();
}

function draw() {
  background(0);
  calcWave();
  renderWave();
  
  let a = slider.value();
  amplitude = a;
  
  let p = slider2.value();
  period = p;
  // amplitude = amplitude + ampGrowth * 0.5;
//   if (amplitude >= 400) {
//     ampGrowth = ampGrowth * -1;

//   }
//   if (amplitude < 5) {
//     ampGrowth = ampGrowth * -1;

//   }


}
//calculates the sine wave
function calcWave() {
  // Increment theta 
  theta += 0.02;

  // For every x value, calculate a y value with sine function
  var x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x) * amplitude;
    x += dx;
    //pendulum.drawPend(i*xspacing);
  }
}
//renders the pendulums along the sine wave
function renderWave() {   // A simple way to draw the wave with an ellipse at each location
    
  for (let x = 0; x < yvalues.length; x++) {    
    pendulums[x].updatePend();    
    pendulums[x].drawPend(x * xspacing, height / 2 + yvalues[x]);     //pendulums[x].drawTrace(x*xspacing, height/2+yvalues[x]);
      
  }
}
//required to access sine wave calculations in setup before the calcwave 
//function has been called
function createPendulums() {   // Increment theta 
    
  theta += 0.02;

     // For every x value, calculate a y value with sine function
    
  var x = theta;  
  for (let i = 0; i < yvalues.length; i++) {    
    yvalues[i] = sin(x) * amplitude;    
    x += dx;
    pendulums[i] = new Pendulum(x, yvalues[i]);  
  }
}/* Based on examples by Dan Shiffman

// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Double Pendulum
// https://youtu.be/uWzPe_S-RVE

*/

let wid = 0;
let pendulums = [];

/////SINE WAVE


var xspacing = 16;    // Distance between each horizontal location
var w;                // Width of entire wave
var theta = 0.0;      // Start angle at 0
var amplitude = 15.0; // Height of wave
var period = 50.0;   // How many pixels before the wave repeats
var dx;               // Value for incrementing x
var yvalues;  // Using an array to store height values for the wave


function setup() {
  createCanvas(700, 700);
  wid = width/2;

  
  //////SINE WAVE
  
  w = width+16;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w/xspacing));
  createPendulums();
}

function draw() {
  background(0);
  
  calcWave();
  renderWave();
  
  // pendulum.drawPend(1000,500);
  // pendulum.updatePend();
}


function calcWave() {
  // Increment theta 
  theta += 0.02;

  // For every x value, calculate a y value with sine function
  var x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x)*amplitude;
    x+=dx;
    //pendulum.drawPend(i*xspacing);
  }
}

function renderWave() {
  noStroke();
  
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < yvalues.length; x++) {
    //fill(xspacing, 0, 0);
    //ellipse(x*xspacing, height/2+yvalues[x], 16, 16);
   
    for (let y = 0; y < pendulums.length; y++){
    pendulums[y].updatePend(); 
    pendulums[y].drawPend(); 
    }
  }
}


function createPendulums(){
  // Increment theta 
  theta += 0.02;

  // For every x value, calculate a y value with sine function
  var x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x)*amplitude;
    x+=dx;
pendulums[i] = new Pendulum(x,yvalues[i]);
  }
}


/* Based on examples by Dan Shiffman

An array of double pendulums create the illusion of flowing along a sign wave


// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Double Pendulum
// https://youtu.be/uWzPe_S-RVE

*/

let wid = 0;
let pendulums = [];

/////SINE WAVE


var xspacing = 16;    // Distance between each horizontal location
var w;                // Width of entire wave
var theta = 0.0;      // Start angle at 0
var amplitude = 150.0; // Height of wave
var period = 400.0;   // How many pixels before the wave repeats
var dx;               // Value for incrementing x
var yvalues;  // Using an array to store height values for the wave


function setup() {
  createCanvas(700, 700);
  wid = width/2;
  
  //////SINE WAVE
  
  w = width+16;
  dx = (TWO_PI / period) * xspacing;
  yvalues = new Array(floor(w/xspacing));
  createPendulums();
}

function draw() {
  background(0);
  
  calcWave();
  renderWave();
  
  // pendulum.drawPend(1000,500);
  // pendulum.updatePend();
}


function calcWave() {
  // Increment theta 
  theta += 0.02;

  // For every x value, calculate a y value with sine function
  var x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x)*amplitude;
    x+=dx;
    //pendulum.drawPend(i*xspacing);
  }
}

function renderWave() {
  noStroke();
  
  // A simple way to draw the wave with an ellipse at each location
  for (let x = 0; x < yvalues.length; x++) {
    //fill(xspacing, 0, 0);
    //ellipse(x*xspacing, height/2+yvalues[x], 16, 16);
   
    
    pendulums[x].updatePend(); 
    pendulums[x].drawPend(x*xspacing, height/2+yvalues[x]); 
    
  }
}

function createPendulums(){
  // Increment theta 
  theta += 0.02;

  // For every x value, calculate a y value with sine function
  var x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x)*amplitude;
    x+=dx;
pendulums[i] = new Pendulum(x,yvalues[i]);
  }
}


/***************************************************************
****************************************************************
Based on Examples from the Nature of Code 
by Dan Shiffman

Perlin walkers attract a particle system.

*  LFT CLICK ADDS WALKER 
*  'a' KEY ADDS PARTICLE 
*  'r' KEY REMOVES WALKERS


// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com
****************************************************************
***************************************************************/

let walkers = [];
let particles = [];
let noff = 0;

function setup() {
  createCanvas(640, 480);
  for (let i = 0; i < walkers.length; i++) {
    walkers[i] = new Walker();
    console.log(frameRate);
  }
}

function draw() {
  background(0);


  if (particles.length > 10) {
    particles.splice(0, 1);
  }
  if (walkers.length > 10) {
    walkers.splice(0, 1);
  }
  if(walkers.length === 0){
    particles.length = 0;
  }

  for (let i = 0; i < walkers.length; i++) {
    walkers[i].render();
    walkers[i].move();
    stroke(0, 255, 0);
    
    for (let j = 0; j < particles.length; j++) {
      var particle= particles[j];

      for (let k = 0; k < walkers.length; k++) {
        particle.attracted(walkers[k].pos);

      }
      particle.update();
      particle.show();
      walkers[i].render();
    }

  }

}

function mousePressed() {
  walkers.push(new Walker(mouseX, mouseY));
}

function keyPressed() {
  
  // for(let i = 0; i<3; i++){
   
}
  
  function keyTyped() {
  if (key === 'r') {
    if(walkers.length>=2){
   walkers.splice(0, 1);
   }
  } 
    if (key === 'a') {
    particles.push(new Particle(mouseX, mouseY));
   }

 

  }/***************************************************************
****************************************************************
Based on Examples from the Nature of Code 
by Dan Shiffman

Uses the p5.sound library to play tones from an array across two oscillators 
at every large step via a levy flight model.  

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com
****************************************************************
***************************************************************/

let walkers = [];
let attractors = [];
let particles = [];
let noff = 0;


// let walker;
let oscMult = 2;
//Cm scale
let oscVal = [130.81 * oscMult, 146.83 * oscMult, 155.56 * oscMult, 174.61 * oscMult, 196.00 * oscMult, 207.65 * oscMult, 233.08 * oscMult];
let oscType = ["sine", "triangle"];


function setup() {
  createCanvas(640, 480);
  
  osc = new p5.Oscillator();
  osc2 = new p5.Oscillator();
  filter = new p5.Filter();
  env = new p5.Env(0.1, 1.2, 1.2, 0.1);
  env.setADSR(5.9, 0.25, 0.1, 0.0);

  for (let i = 0; i < walkers.length; i++) {
    walkers[i] = new Walker();
  }
}

function draw() {
  background(0);
  particles.push(new Particle(random(width), random(height)));

  if (particles.length > 100) {
    particles.splice(0, 1);
  }

  for (let i = 0; i < walkers.length; i++) {
    walkers[i].render();
    walkers[i].move();
    stroke(0, 255, 0);
    point(walkers[i].x, walkers[i].y);
    
    
  

  for (let j = 0; j < particles.length; j++) {
    var particle = particles[j];

    for (let k = 0; k < walkers.length; k++) {
      particle.attracted(walkers[k].pos);
      
    }
    particle.update();
    particle.show();
    walkers[i].render();
  }

  }

}

function mousePressed() {
  //stroke(0, 255, 255);
  walkers.push(new Walker(this.pos));
  //attractors.push(new Walker(this.pos));
  osc.start();
  osc.freq(random(oscVal));
  osc.amp(0.5, 10);

}

function keyPressed() {
  //stroke(255, 255, 255);
  walkers.push(new Walker(this.pos));
  osc.start();
  osc.freq(random(oscVal));
  osc.amp(0.5, 10);

}/***************************************************************
****************************************************************
Based on Examples from the Nature of Code 
by Dan Shiffman

Uses the p5.sound library to play tones from an array across two oscillators 
at every large step via a levy flight model.  

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com
****************************************************************
***************************************************************/

let walkers = [];
let attractors = [];
let particles = [];
let xoff = 0;


// let walker;
let oscMult = 2;
//Cm scale
let oscVal = [130.81 * oscMult, 146.83 * oscMult, 155.56 * oscMult, 174.61 * oscMult, 196.00 * oscMult, 207.65 * oscMult, 233.08 * oscMult];
let oscType = ["sine", "triangle"];


function setup() {
  createCanvas(640, 480);
  
  osc = new p5.Oscillator();
  osc2 = new p5.Oscillator();
  filter = new p5.Filter();
  env = new p5.Env(0.1, 1.2, 1.2, 0.1);
  env.setADSR(5.9, 0.25, 0.1, 0.0);

  for (let i = 0; i < walkers.length; i++) {
    walkers[i] = new Walker();
  }
}

function draw() {
  background(0);
  particles.push(new Particle(random(width), random(height)));

  if (particles.length > 100) {
    particles.splice(0, 1);
  }

  for (let i = 0; i < walkers.length; i++) {
    walkers[i].render();
    walkers[i].step();
    stroke(0, 255, 0);
    point(walkers[i].x, walkers[i].y);

    
  

  for (let j = 0; j < particles.length; j++) {
    var particle = particles[j];

    for (let k = 0; k < walkers.length; k++) {
      particle.attracted(walkers[k].pos);
    }
    particle.update();
    particle.show();
    walkers[i].render();
  }

  }

}

function mousePressed() {
  stroke(0, 255, 255);
  walkers.push(new Walker(this.pos));
  //attractors.push(new Walker(this.pos));
  osc.start();
  osc.freq(random(oscVal));
  osc.amp(0.5, 10);

}

function keyPressed() {
  stroke(255, 255, 255);
  walkers.push(new Walker(this.pos));
  osc.start();
  osc.freq(random(oscVal));
  osc.amp(0.5, 10);

}/***************************************************************
****************************************************************
Based on Examples from the Nature of Code 
by Dan Shiffman

Uses the p5.sound library to play tones from an array across two oscillators 
at every large step via a levy flight model.  

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com
****************************************************************
***************************************************************/

let walkers = [];
let attractors = [];
let particles = [];
let xoff = 0;


// let walker;
let oscMult = 2;
//Cm scale
let oscVal = [130.81 * oscMult, 146.83 * oscMult, 155.56 * oscMult, 174.61 * oscMult, 196.00 * oscMult, 207.65 * oscMult, 233.08 * oscMult];
let oscType = ["sine", "triangle"];


function setup() {
  createCanvas(640, 480);
  background(0);
  osc = new p5.Oscillator();
  osc2 = new p5.Oscillator();
  filter = new p5.Filter();
  env = new p5.Env(0.1, 1.2, 1.2, 0.1);
  env.setADSR(5.9, 0.25, 0.1, 0.0);

  for (let i = 0; i < walkers.length; i++) {
    walkers[i] = new Walker();
  }
}

function draw() {
  particles.push(new Particle(random(width), random(height)));

  if (particles.length > 100) {
    particles.splice(0, 1);
  }

  for (let i = 0; i < walkers.length; i++) {
    walkers[i].render();
    walkers[i].step();
    //stroke(0, 255, 0);
    point(walkers[i].x, walkers[i].y);
    //attractors[i].step();
  }

  for (let j = 0; j < particles.length; j++) {
    var particle = particles[j];

    for (let j = 0; j < attractors.length; j++) {
      particle.attracted(attractors[j]);
    }
    particle.update();
    particle.show();
    //particle.attracted();
  }

}

function mousePressed() {
  stroke(0, 255, 255);
  walkers.push(new Walker(this.pos));
  //attractors.push(new Walker(this.pos));
  osc.start();
  osc.freq(random(oscVal));
  osc.amp(0.5, 10);

}

function keyPressed() {
  stroke(255, 255, 255);
  walkers.push(new Walker(this.pos));
  osc.start();
  osc.freq(random(oscVal));
  osc.amp(0.5, 10);

}// Daniel Shiffman
// http://codingtra.in
// Attraction / Repulsion
// Video: https://youtu.be/OAcXnzRNiCY

let attractors = [];
let particles = [];

let xoff = 0;

function setup() {
  createCanvas(400, 400);

  // for (let i = 0; i < attractors.length; i++) {
  // attractors[i] = new Attractor();
  // }

}



function draw() {
  background(51);
  stroke(255);
  strokeWeight(4);
  particles.push(new Particle(random(width), random(height)));

  if (particles.length > 100) {
    particles.splice(0, 1);
  }

  
  
  
  
  
  for (var k = 0; k < attractors.length; k++) {
    stroke(0, 255, 0);
    point(attractors[k].x, attractors[k].y);
    //attractors[i].step();
  }
  for (var i = 0; i < particles.length; i++) {
    var particle = particles[i];
    for (let j = 0; j < attractors.length; j++) {
      particle.attracted(attractors[j]);
    }
    particle.update();
    particle.show();
    //attractors.render();
  }

}

function mousePressed() {
  attractors.push(createVector(mouseX, mouseY));
  //attractors.push(new Attractor(this.pos));
}// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let mover =[];

function setup() {
  createCanvas(420, 320);
  mover = new Mover();
  background(0);
}


function draw() {
  

  let gravity = createVector(0, 0.2);
  mover.applyForce(gravity);

  if (mouseIsPressed) {
    let wind = createVector(1, 0);
    mover.applyForce(wind);
  }
  

  mover.update();
  mover.checkEdges();
  mover.display();
}/***************************************************************
****************************************************************
Based on Examples from the Nature of Code 
by Dan Shiffman

Uses the p5.sound library to play tones from an array across two oscillators 
at every large step via a levy flight model.  

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com
****************************************************************
***************************************************************/

let walkers = [];
let xoff = 0;


// let walker;
let oscMult = 2;
//Cm scale
let oscVal = [130.81 * oscMult, 146.83 * oscMult, 155.56 * oscMult, 174.61 * oscMult, 196.00 * oscMult, 207.65 * oscMult, 233.08 * oscMult];
let oscType = ["sine", "triangle"];


function setup() {
  createCanvas(640, 480);
  background(0);
  osc = new p5.Oscillator();
  osc2 = new p5.Oscillator();
  filter = new p5.Filter();
  env = new p5.Env(0.1, 1.2, 1.2, 0.1);
  env.setADSR(5.9, 0.25, 0.1, 0.0);

  for (let i = 0; i < walkers.length; i++) {
    walkers[i] = new Walker();
  }
}

function draw() {
  for (let i = 0; i < walkers.length; i++) {
    walkers[i].render();
    walkers[i].step();
    walkers[i].checkEdges();

  }
  // console.log(xoff);
}

function mousePressed() {
  stroke(255, 255, 255);
  walkers.push(new Walker(this.pos));
  osc.start();
  osc.freq(random(oscVal));
  osc.amp(0.5, 10);

}
// function keyPressed() {
//   stroke(255, 100, 0);
//   walkers.push(new Walker(this.pos));
//   osc.start();
//   osc.freq(random(oscVal));
//   osc.amp(0.5, 10);

  function keyPressed() {
  let wind = createVector(1, 0);
  walkers.applyForce(wind);


}
// function mouseDragged(){
//   for (let i = 0; i < walkers.length; i++) {
//  walkers[i].stopGrowth(); 
//   }
//}let freq;
let amp;
let speed;
let dur;

let oscMult = 2;
//Cm scale
let oscVal = [130.81*oscMult, 146.83*oscMult, 155.56*oscMult, 174.61*oscMult, 196.00*oscMult, 207.65*oscMult, 233.08*oscMult];
let pluckType = [1, 6];

function setup() {


  for (let i = 0; i < 100; i++) {
    speed = 0.25;
    dur = random(4, 7);
    amp = random(0.2, 0.5);
    freq = random(oscVal);
    
      console.log("i 1 " + i + " " + 5 + " " + 6 + " " + freq + " " + freq); 
      console.log("i3 " + i + " " + dur + " " + freq*2 + " " + amp);
      console.log("i 4 " + i + " " + (random(0.4, 3)) + " " + freq + " " + freq);
      
  }
}/***************************************************************
****************************************************************
Based on Examples from the Nature of Code 
by Dan Shiffman

Uses the p5.sound library to play tones from an array across two oscillators 
at every large step via a levy flight model.  

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com
****************************************************************
***************************************************************/

let walkers = [];
let xoff = 0;


// let walker;
let oscMult = 2;
//Cm scale
let oscVal = [130.81*oscMult, 146.83*oscMult, 155.56*oscMult, 174.61*oscMult, 196.00*oscMult, 207.65*oscMult, 233.08*oscMult];
let oscType = ["sine", "triangle"];


function setup() {
  createCanvas(640, 480);
  background(0);
  osc = new p5.Oscillator();
  osc2 = new p5.Oscillator();
  filter = new p5.Filter();
  env = new p5.Env(0.1, 1.2, 1.2, 0.1);
  env.setADSR(5.9, 0.25, 0.1, 0.0);
  
  for (let i = 0; i < walkers.length; i++) {
  walkers[i] = new Walker();
  }
}

function draw() {
  for (let i = 0; i < walkers.length; i++) {
    walkers[i].render();
    walkers[i].step();

  }
  console.log(xoff);
}
function mousePressed() {
  stroke(255, 255, 255);
  walkers.push(new Walker(this.pos));
  osc.start();
  osc.freq(random(oscVal));
  osc.amp(0.5, 10);
  
}
function keyPressed() {
  stroke(255, 100, 0);
  walkers.push(new Walker(this.pos));
  osc.start();
  osc.freq(random(oscVal));
  osc.amp(0.5, 10);
  
}
// function mouseDragged(){
//   for (let i = 0; i < walkers.length; i++) {
//  walkers[i].stopGrowth(); 
//   }
//}
let freq;
let amp;
let speed;
let dur;

let xoff = 0;
let yoff = 130.81;



let oscMult = 1;
//Cm scale
let oscVal = [130.81 * oscMult, 146.83 * oscMult, 155.56 * oscMult, 174.61 * oscMult, 196.00 * oscMult, 207.65 * oscMult, 233.08 * oscMult];
let pluckType = [1, 6];
let oscVal2 = [];

function setup() {


  for (let i = 0; i < 1000; i++) {
    let j = abs(i - 3);

    xoff = xoff + 0.01;
    yoff = yoff+noise(xoff);
    let noiseAmp = noise(xoff) + 0.3;
    let noiseFreq = noise(yoff)+yoff;

    // console.log("NOISEFREAK " + noiseFreq);


    decAmp = 0.01;
    speed = 0.25;
    dur = random(0.2, 5);
    amp = random(0.2, 0.5);
    freq = random(oscVal);

    if (xoff > 0.49) {
      xoff = 0.3;
    }

    
    if (yoff > 520) {
      xoff = 130.81;
    }

    if (i > 30) {
      freq = random(oscVal) * ceil(random(2));
      amp = 0.5;
    }
    let randHats = random(0.21, 0.27);
    //console.log(randHats + "randHats");
    let randHatLength = random(0.02, 0.07)
    
 
    //pluck
    print("i 1 " + random(j, i) + " " + 5 + " " + random(pluckType) + " " + freq + " " + freq);
    //print("i 1 " + random(j, random(i)) + " " + 5 + " " + random(pluckType) + " " + noiseFreq + " " + noiseFreq);
    //string pad  
    print("i3 " + i + " " + dur + " " + freq + " " + amp);
    print("i 4 " + (3 + random(j, i)) + " " + (random(0.4, 3)) + " " + freq + " " + freq);
    //print("i 5 " + i + " " + random(100) + " " + random(1) + " " + 0.5 + " " + 0.4);
    
    if(i >100){
    //noise hats
    print("i 7 " + i + " " + 0.02);
    print("i 7 " + (i+.25) + " " + " " + 0.02);
    print("i 7 " + (i+.5) + " " + 0.02);
    print("i 7 " + (i+.75) + " " + randHatLength);
    }
    
    if (i == 20 || i == 40 || i == 80 || i == 120){
      print("i 7 " + (i+.875) + " " + randHatLength);
    }
    

    if (i > 120) {
      //piano
      print("i6 " + (3 + random(i, j)) + " " + (4 + random(i, j)) + " " + freq*2 + " " + (random(-0.1, 0.25)) + " " + noiseAmp + " " + "0" + " " + noiseAmp);
      print("i3 " + i + " " + dur + " " + freq*2 + " " + amp);
      print("i 4 " + (3 + random(i, j)) + " " + (random(0.4, 3)) + " " + freq + " " + freq);
    }
    //i 1 0 5 1 880 440
    //i 4 0 10 
    //i 5 0 0.15 14 0.5 0.4
    // i6 0.0 1 440 .25 0.99 0 0.05  
    //print(j);
    
    //i 7 0 .1

  }
}/***************************************************************
****************************************************************
Based on Examples from the Nature of Code 
by Dan Shiffman

Uses the p5.sound library to play tones from an array across two oscillators 
at every large step via a levy flight model.  

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com
****************************************************************
***************************************************************/

let walkers = [];
let xoff = 0;


// let walker;
let oscMult = 2;
//Cm scale
let oscVal = [130.81*oscMult, 146.83*oscMult, 155.56*oscMult, 174.61*oscMult, 196.00*oscMult, 207.65*oscMult, 233.08*oscMult];
let oscType = ["sine", "triangle"];


function setup() {
  createCanvas(640, 480);
  background(0);
  osc = new p5.Oscillator();
  osc2 = new p5.Oscillator();
  filter = new p5.Filter();
  env = new p5.Env(0.1, 1.2, 1.2, 0.1);
  env.setADSR(5.9, 0.25, 0.1, 0.0);
  cVerb = createConvolver('assets/bx-spring');
  
  for (let i = 0; i < walkers.length; i++) {
  walkers[i] = new Walker();
  }
}

function draw() {
  for (let i = 0; i < walkers.length; i++) {
    walkers[i].render();
    walkers[i].step();

  }
  console.log(oscMult);
}
function mousePressed() {
  stroke(255, 255, 255);
  walkers.push(new Walker(this.pos));
  osc.start();
  osc.freq(random(oscVal));
  osc.amp(0.5, 10);
  
}
// function mouseDragged(){
//   for (let i = 0; i < walkers.length; i++) {
//  walkers[i].stopGrowth(); 
//   }
//}
/***************************************************************
****************************************************************
Based on Examples from the Nature of Code 
by Dan Shiffman

Uses the p5.sound library to play tones from an array across two oscillators 
at every large step via a levy flight model.  

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com
****************************************************************
***************************************************************/

let walkers = [];
let xoff = 0;


// let walker;
let oscMult = 2;
//Cm scale
let oscVal = [130.81*oscMult, 146.83*oscMult, 155.56*oscMult, 174.61*oscMult, 196.00*oscMult, 207.65*oscMult, 233.08*oscMult];
let oscType = ["sine", "triangle"];


function setup() {
  createCanvas(640, 480);
  background(0);
  osc = new p5.Oscillator();
  osc2 = new p5.Oscillator();
  filter = new p5.Filter();
  env = new p5.Env(0.1, 1.2, 1.2, 0.1);
  env.setADSR(5.9, 0.25, 0.1, 0.0);
  
  for (let i = 0; i < walkers.length; i++) {
  walkers[i] = new Walker();
  }
}

function draw() {
  for (let i = 0; i < walkers.length; i++) {
    walkers[i].render();
    walkers[i].step();

  }
  console.log(xoff);
}
function mousePressed() {
  stroke(255, 255, 255);
  walkers.push(new Walker(this.pos));
  osc.start();
  osc.freq(random(oscVal));
  osc.amp(0.5, 10);
  
}
function keyPressed() {
  stroke(255, 100, 0);
  walkers.push(new Walker(this.pos));
  osc.start();
  osc.freq(random(oscVal));
  osc.amp(0.5, 10);
  
}
// function mouseDragged(){
//   for (let i = 0; i < walkers.length; i++) {
//  walkers[i].stopGrowth(); 
//   }
//}
/***************************************************************
****************************************************************
Based on Examples from the Nature of Code 
by Dan Shiffman

Uses the p5.sound library to play tones from an array across two oscillators 
at every large step via a levy flight model.  

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com
****************************************************************
***************************************************************/

let walkers = [];
let xoff = 0;


// let walker;
let oscMult = 2;
//Cm scale
let oscVal = [130.81*oscMult, 146.83*oscMult, 155.56*oscMult, 174.61*oscMult, 196.00*oscMult, 207.65*oscMult, 233.08*oscMult];
let oscType = ["sine", "triangle"];


function setup() {
  createCanvas(640, 480);
  background(0);
  osc = new p5.Oscillator();
  osc2 = new p5.Oscillator();
  filter = new p5.Filter();
  env = new p5.Env(0.1, 1.2, 1.2, 0.1);
  env.setADSR(5.9, 0.25, 0.1, 0.0);
  
  for (let i = 0; i < walkers.length; i++) {
  walkers[i] = new Walker();
  }
}

function draw() {
  for (let i = 0; i < walkers.length; i++) {
    walkers[i].render();
    walkers[i].step();

  }
  console.log(xoff);
}

function mousePressed() {
  walkers.push(new Walker(this.pos));
}/***************************************************************
****************************************************************
Based on Examples from the Nature of Code 
by Dan Shiffman

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com
****************************************************************
***************************************************************/

let walkers = [];
let xoff = 0;

let walker;
let oscMult = 2;
//Cm scale
let oscVal = [130.81*oscMult, 146.83*oscMult, 155.56*oscMult, 174.61*oscMult, 196.00*oscMult, 207.65*oscMult, 233.08*oscMult];
let oscType = ["sine", "triangle"];
let foci = 5;


function setup() {
  createCanvas(640, 480);
  background(160);
  osc = new p5.Oscillator();
  osc2 = new p5.Oscillator();
  filter = new p5.Filter();
  env = new p5.Env(0.1, 1.2, 1.2, 0.1);
  env.setADSR(5.9, 0.25, 0.1, 0.0);
  
  for (let i = 0; i < 10; i++) {
  walkers[i] = new Walker();
  }

}

function draw() {
  for (let i = 0; i < walkers.length; i++) {
    walkers[i].render();
    walkers[i].step();

  }
}// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let walker;
let oscMult = 2;
//Cm scale
let oscVal = [130.81*oscMult, 146.83*oscMult, 155.56*oscMult, 174.61*oscMult, 196.00*oscMult, 207.65*oscMult, 233.08*oscMult];
let oscType = ["sine", "triangle", "sawtooth"];


function setup() {
  createCanvas(640, 480);
  walker = new Walker();
  walker2 = new Walker();
  walker3 = new Walker();
  walker4 = new Walker();
  background(160);
  osc = new p5.Oscillator();
  osc2 = new p5.Oscillator();
  filter = new p5.Filter();
  env = new p5.Env(0.1, 1.2, 1.2, 0.1);
  env.setADSR(5.9, 0.25, 0.1, 0.0);
  //frameRate(20);

  


}

function draw() {
  for (let i = 0; i < 1; i++) {

    walker.render();
    walker.step();

     walker2.render();
     walker2.step();
    
//     walker3.render();
//     walker3.step();
    
//     walker4.render();
//     walker4.step();

  }
}// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let walker;

function setup() {
  createCanvas(640, 480);
  walker = new Walker();
  walker2 = new Walker();
  background(255);
  
 
}

function draw() { 
  for (let i = 0; i < 10; i++) {
  walker.step();
  walker.render();
    
  walker2.step(); 
  walker2.render(); 
  

   }
}let osc, fft;
let reverb;

function setup() {
  createCanvas(720, 256);

  osc = new p5.SinOsc(); // set frequency and type
  osc.amp(0.5);
  
  reverb = new p5.Reverb();

  fft = new p5.FFT();
  osc.start();
  reverb.process(osc, 3, 2);
}

function draw() {
  background(255);

  var waveform = fft.waveform();  // analyze the waveform
  beginShape();
  strokeWeight(5);
  for (var i = 0; i < waveform.length; i++){
    var x = map(i, 0, waveform.length, 0, width);
    var y = map(waveform[i], -1, 1, height, 0);
    vertex(x, y);
  }
  endShape();

  // change oscillator frequency based on mouseX
  var freq = map(mouseX, 0, width, 40, 880);
  osc.freq(freq);

  var amp = map(mouseY, 0, height, 1, 0.01);
  osc.amp(amp);
}



var osc1, osc2, osc3, osc4, osc5, osc6, osc7, osc8;
var oscFreqSlider1,oscFreqSlider2, oscFreqSlider3, oscFreqSlider4, oscFreqSlider5, oscFreqSlider6, oscFreqSlider7, oscFreqSlider8;
var oscAmpSlider1,oscAmpSlider2, oscAmpSlider3, oscAmpSlider4, oscAmpSlider5, oscAmpSlider6, oscAmpSlider7, oscAmpSlider8;
var filterQslider, filterFreqResponseSlider;
var lpFilter;
var button1;
var freqLabel, filterQLabel, filterFreqResLabel, ampLabel, freqLabel,tit;



var waveformMASTER;
  var waveform;
 var filter1;
var filterQslider, filterFreqResponseSlider;

var mainLabel, frequenciesLabel, amplitudesLabel;
// var one, two, three, four, five, six, seven, eight;

var filterParmLabel;

function setup() {

  var filterResStart = 3;

// General Block
  createCanvas(1100, 550);
  
  //mainLabel = createDiv('<div style="color:#FFFFFF"> <a href=https://cskonopka.github.io/p5js/ style="color:#FFFFFF"; text-align:center;><h3>sine playground ~ christopher konopka</h3></div>');
  //mainLabel.position(740, -10);

  // githubLabel = createDiv('<div style="color:#FFFFFF"> <a href=https://github.com/cskonopka/p5js style="color:#FFFFFF"; text-align:center;><h3>github</h3></a>');
  // githubLabel.position(700, 40);

// Frequency Block
  var sliderFREQpos = 35;
  var sliderFREQvert = 25;

  oscFreqSlider1 = createSlider(0, 4700, 47);
  oscFreqSlider1.position(sliderFREQpos, 20+sliderFREQvert);

  oscFreqSlider2 = createSlider(0, 4700, 113);
  oscFreqSlider2.position(sliderFREQpos, 45+sliderFREQvert);

  oscFreqSlider3 = createSlider(0, 4700, 8);
  oscFreqSlider3.position(sliderFREQpos, 70+sliderFREQvert);

  oscFreqSlider4 = createSlider(0, 4700, 13);
  oscFreqSlider4.position(sliderFREQpos, 95+sliderFREQvert);

  oscFreqSlider5 = createSlider(0, 4700, 147);
  oscFreqSlider5.position(sliderFREQpos, 120+sliderFREQvert);

  oscFreqSlider6 = createSlider(0, 4700, 226);
  oscFreqSlider6.position(sliderFREQpos, 145+sliderFREQvert);

  oscFreqSlider7 = createSlider(0, 4700, 194);
  oscFreqSlider7.position(sliderFREQpos, 170+sliderFREQvert);

  oscFreqSlider8 = createSlider(0, 4700, 147);
  oscFreqSlider8.position(sliderFREQpos, 195+sliderFREQvert);

  frequenciesLabel = createDiv('<div style="color:#FFFFFF"> <p>frequencies</p></div>');
  frequenciesLabel.position(15, -5);
 
  one = createDiv('<div style="color:#FFFFFF"> <h5>#1</h5></div>');
  one.position(15, 25);  

  two = createDiv('<div style="color:#FFFFFF"> <h5>#2</h5></div>');
  two.position(15, 50);

  three = createDiv('<div style="color:#FFFFFF"> <h5>#3</h5></div>');
  three.position(15, 75);  

  four = createDiv('<div style="color:#FFFFFF"> <h5>#4</h5></div>');
  four.position(15, 100);

  five = createDiv('<div style="color:#FFFFFF"> <h5>#5</h5></div>');
  five.position(15, 125);  
 
  six = createDiv('<div style="color:#FFFFFF"> <h5>#6</h5></div>');
  six.position(15, 150);

  seven = createDiv('<div style="color:#FFFFFF"> <h5>#7</h5></div>');
  seven.position(15, 175);  

  eight = createDiv('<div style="color:#FFFFFF"> <h5>#8</h5></div>');
  eight.position(15, 200);

// Amplitude Block
  var sliderAMPpos = 200;
  var sliderAMPvert = 25;
  var ampStart = 0.1;

  oscAmpSlider1 = createSlider(0, 255, 128);
  oscAmpSlider1.position(sliderAMPpos, 20+sliderAMPvert);

  oscAmpSlider2 = createSlider(0, 255, ampStart);
  oscAmpSlider2.position(sliderAMPpos, 45+sliderAMPvert);

  oscAmpSlider3 = createSlider(0, 255, ampStart);
  oscAmpSlider3.position(sliderAMPpos, 70+sliderAMPvert);

  oscAmpSlider4 = createSlider(0, 255, ampStart);
  oscAmpSlider4.position(sliderAMPpos, 95+sliderAMPvert);

  oscAmpSlider5 = createSlider(0, 255, ampStart);
  oscAmpSlider5.position(sliderAMPpos, 120+sliderAMPvert);

  oscAmpSlider6 = createSlider(0, 255, ampStart);
  oscAmpSlider6.position(sliderAMPpos, 145+sliderAMPvert);

  oscAmpSlider7 = createSlider(0, 255, ampStart);
  oscAmpSlider7.position(sliderAMPpos, 170+sliderAMPvert);

  oscAmpSlider8 = createSlider(0, 255, ampStart);
  oscAmpSlider8.position(sliderAMPpos, 195+sliderAMPvert);

  amplitudesLabel = createDiv('<div style="color:#FFFFFF"> <p>amplitudes</p></div>');
  amplitudesLabel.position(180, -5);

  one2 = createDiv('<div style="color:#FFFFFF"> <h5>#1</h5></div>');
  one2.position(180, 25);  
 
  two2 =  createDiv('<div style="color:#FFFFFF"> <h5>#2</h5></div>');  
  two2.position(180, 50);

  three2 = createDiv('<div style="color:#FFFFFF"> <h5>#3</h5></div>');
  three2.position(180, 75);  

  four2 = createDiv('<div style="color:#FFFFFF"> <h5>#4</h5></div>');
  four2.position(180, 100);

  five2 = createDiv('<div style="color:#FFFFFF"> <h5>#5</h5></div>');
  five2.position(180, 125);  
 
  six2 = createDiv('<div style="color:#FFFFFF"> <h5>#6</h5></div>');
  six2.position(180, 150);

  seven2 = createDiv('<div style="color:#FFFFFF"> <h5>#7</h5></div>');
  seven2.position(180, 175);  

  eight2 = createDiv('<div style="color:#FFFFFF"> <h5>#8</h5></div>');
  eight2.position(180, 200);

// Filter Block
  filterParmLabel = createDiv('<div style="color:#FFFFFF"> <p>filter parameters</p></div>');
  filterParmLabel.position(345, -5);

  filterQLabel = createDiv('<div style="color:#FFFFFF"> <h5>cuttoff</h5></div>');
  filterQLabel.position(345, 25);

  filterQslider = createSlider(0, 5000, 255);
  filterQslider.position(410, 45);  

  filterFreqResLabel =createDiv('<div style="color:#FFFFFF"> <h5>resonance</h5></div>');
  filterFreqResLabel.position(345, 50);

  filterFreqResponseSlider = createSlider(0, 25, filterResStart);
  filterFreqResponseSlider.position(410, 70);  


// Global Waveform Selector
  waveformMASTER = [
  {
      "waveform": ['sine', 'sawtooth', 'triangle', 'square']} 
  ];

  waveform = waveformMASTER[0].waveform[0];


//  Oscillator Block
  osc1 = new p5.Oscillator(waveform);
  osc1.amp(.2);
  osc1.start();

  osc2 = new p5.Oscillator(waveform);
  osc2.amp(.2);
  osc2.start();

  osc3 = new p5.Oscillator(waveform);
  osc3.amp(.2);
  osc3.start();

  osc4 = new p5.Oscillator(waveform);
  osc4.amp(.2);
  osc4.start();

  osc5 = new p5.Oscillator(waveform);
  osc5.amp(.2);
  osc5.start();

  osc6 = new p5.Oscillator(waveform);
  osc6.amp(.2);
  osc6.start();

  osc7 = new p5.Oscillator(waveform);
  osc7.amp(.2);
  osc7.start();

  osc8 = new p5.Oscillator(waveform);
  osc8.amp(.2);
  osc8.start(); 

// Additive Synthesis Block
  osc1.freq(osc2.add(),osc3.add(), osc4.add(),osc5.add(),osc6.add(), osc7.add(), osc8.add());
 
// Filter Connection Block
  filter1 = new p5.LowPass();   

  osc1.disconnect();
  osc1.connect(filter1);
  
  osc2.disconnect();
  osc2.connect(filter1);
  
  osc3.disconnect();
  osc3.connect(filter1);
  
  osc4.disconnect();
  osc4.connect(filter1);
  
  osc5.disconnect();
  osc5.connect(filter1);
  
  osc6.disconnect();
  osc6.connect(filter1);
  
  osc7.disconnect();
  osc7.connect(filter1);
  
  osc8.disconnect();
  osc8.connect(filter1);         
  
  fft = new p5.FFT();
}

function draw() {

// General Block  
  background(12,58,24);
  var spectrum = fft.analyze();
   
// Oscillator Frequency Slider Block   
  var oscFreq1 = oscFreqSlider1.value();
  var oscFreq2 = oscFreqSlider2.value();
  var oscFreq3 = oscFreqSlider3.value();
  var oscFreq4 = oscFreqSlider4.value();
  var oscFreq5 = oscFreqSlider5.value();
  var oscFreq6 = oscFreqSlider6.value();
  var oscFreq7 = oscFreqSlider7.value();
  var oscFreq8 = oscFreqSlider8.value();

// Oscillator Amplitude Slider Block
  var oscAmp1 = oscAmpSlider1.value();
  var oscAmp2 = oscAmpSlider2.value();
  var oscAmp3 = oscAmpSlider3.value();
  var oscAmp4 = oscAmpSlider4.value();
  var oscAmp5 = oscAmpSlider5.value();
  var oscAmp6 = oscAmpSlider6.value();
  var oscAmp7 = oscAmpSlider7.value();
  var oscAmp8 = oscAmpSlider8.value();

// Filter Slider Block
  var filterQ = filterQslider.value();
  var filterFreqResponse = filterFreqResponseSlider.value();    
  var amplitudeBias = 0.13;

// Oscillator Parameters
  oscAmp1 = map(oscAmp1, 0, 255, 0, 1);
  osc1.amp(oscAmp1*amplitudeBias); 
    osc1.freq(oscFreq1);

  oscAmp2 = map(oscAmp2, 0, 255, 0, 1);
  osc2.amp(oscAmp2*amplitudeBias); 
    osc2.freq(oscFreq2);

  oscAmp3 = map(oscAmp3, 0, 255, 0, 1);
  osc3.amp(oscAmp3*amplitudeBias); 
    osc3.freq(oscFreq3);
  
  oscAmp4 = map(oscAmp4, 0, 255, 0, 1);      
  osc4.amp(oscAmp4*amplitudeBias); 
    osc4.freq(oscFreq4);
  
  oscAmp5 = map(oscAmp5, 0, 255, 0, 1);       
  osc5.amp(oscAmp5*amplitudeBias);
    osc5.freq(oscFreq5);

  oscAmp6 = map(oscAmp6, 0, 255, 0, 1);         
  osc6.amp(oscAmp6*amplitudeBias); 
    osc6.freq(oscFreq6);
  
  oscAmp7 = map(oscAmp7, 0, 255, 0, 1);   
  osc7.amp(oscAmp7*amplitudeBias); 
    osc7.freq(oscFreq7);

  oscAmp8 = map(oscAmp8, 0, 255, 0, 1);     
  osc8.amp(oscAmp8*amplitudeBias);
    osc8.freq(oscFreq8);
    
// Filter Parameters
  filter1.set(filterQ, filterFreqResponse);

// Waveform Display Block
  beginShape();
 
    for (i = 0; i<spectrum.length; i++) {
      stroke(255,120,200);
      //stroke(143,212,164);
      fill(0);
      var x = map(i, 0, spectrum.length, 0, 5000);
      var y = map(spectrum[i], 0, 512, height, 0);
      vertex(x, y);
    }
 
  endShape(); 
}/**************** **************** **************** **************** **************** 
 **************** **************** **************** **************** **************** 

Question: Switch states confuse me.  I'm trying to have the background set to either white 
or black depending on the state as being controlled by the button. I've tried all combinations
of what I have in the code and I think I am close but maybe have my operations in the wrong
part(s) of my program. 

 **************** **************** **************** **************** **************** 
 **************** **************** **************** **************** ***************/

let video;
let vScale = 16;

let slider;
let button;

let switched;

function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.size(width / vScale, height / vScale);
  rectMode(CENTER);
  pixelDensity(1);

  slider = createSlider(0, 25, 0);
  slider.position(0, height);

  button = createButton('pos/neg');
  button.position(0, height + 30);
  button.mousePressed(switchBG);

  switched = false;
  //background(0);

}

function draw() {
  //background(0);
  video.loadPixels();
  sliderOps();

  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      let index = (x + y * video.width) * 4;
      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];
      let a = video.pixels[index + 3];

      let w = map(r, 0, 255, 0, vScale);
      let s = map(r, 0, 255, 0, 5);

      stroke(s);
      strokeWeight(s);
      fill(r, g, b, random(a, a + 20));
      if (slider.value() >= 0 && slider.value() <= 5) {
        w = map(r, 0, 255, 0, vScale / 2);

      }
      if (slider.value() >= 6 && slider.value() <= 10) {
        w = map(r, 0, 255, 0, vScale)

      }
      if (slider.value() >= 11 && slider.value() <= 15) {
        w = map(r, 0, 255, 0, vScale * 2)

      }
      if (slider.value() >= 16 && slider.value() <= 20) {
        w = map(r, 0, 255, 0, vScale * 4)


      }
      if (slider.value() >= 21 && slider.value() <= 25) {
        w = map(r, 0, 255, 0, vScale * 8)


      }
      rect(x * vScale, y * vScale, w, w);
      if (switched) {
        switched = !switched;
      }

    }

  }

}

function switchBG() {
  if (switched) {
    background(0, 0, 0);
  } else {
    background(255, 255, 255);
  }


}let video;
let vScale = 16;

let slider;
let button;

let blackOn;

function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.size(width / vScale, height / vScale);
  rectMode(CENTER);
  pixelDensity(1);

  slider = createSlider(0, 25, 0);
  slider.position(0, height);

  button = createButton('blk/wht BG');
  button.position(0, height + 30);
  button.mousePressed(switchBG);

  blackOn = true;


}

function draw() {
  if (blackOn) {
    background(0, 0, 0);
  } else {
    background(255, 255, 255);
  }

  video.loadPixels();

  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      let index = (x + y * video.width) * 4;
      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];
      let a = video.pixels[index + 3];

      let w = map(r, 0, 255, 0, vScale);
      let s = map(r, 0, 255, 0, 5);

      stroke(s);
      strokeWeight(s);
      fill(r, g, b);
      //map the size of the pixels to the red value of each pixel based on the slider position
      if (slider.value() >= 0 && slider.value() <= 5) {
        w = map(r, 0, 255, 0, vScale / 2);
      }
      if (slider.value() >= 6 && slider.value() <= 10) {
        w = map(r, 0, 255, 0, vScale)
      }
      if (slider.value() >= 11 && slider.value() <= 15) {
        w = map(r, 0, 255, 0, vScale * 2)
      }
      if (slider.value() >= 16 && slider.value() <= 20) {
        w = map(r, 0, 255, 0, vScale * 4)

      }
      if (slider.value() >= 21 && slider.value() <= 25) {
        w = map(r, 0, 255, 0, vScale * 8)

      }
      rect(x * vScale, y * vScale, w, w);

    }
  }
}

function switchBG() {
  blackOn = !blackOn;

}let video;
let vScale = 16;

let slider;
let button;

function setup() {
  createCanvas(640, 480);

  video = createCapture(VIDEO);
  video.size(width / vScale, height / vScale);
  rectMode(CENTER);
  pixelDensity(1);

  slider = createSlider(0, 25, 0);
  slider.position (0, height);
  //button = createButton('Color/GreyScale');
  //button.mousePressed(greyScale);
  text('height+2)

}

function draw() {
  background(0);

  video.loadPixels();
  loadPixels();

  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      let index = (x + y * video.width) * 4;
      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];
      let a = video.pixels[index + 3];

      let w = map(r, 0, 255, 0, vScale);

      //strokeWeight(3);
      fill(r, g, b, random(a, a+20));
      if (slider.value() >= 0 && slider.value() <= 5) {
        w = map(r, 0, 255, 0, vScale);

      }
      if (slider.value() >= 6 && slider.value() <= 10) {
        w = map(g, 0, 255, 0, vScale * 2)

      }
      if (slider.value() >= 11 && slider.value() <= 15) {
        w = map(b, 0, 255, 0, vScale * 4)

      }
      if (slider.value() >= 16 && slider.value() <= 20) {
        w = map(b, 0, 255, 0, vScale * 8)
       

      }
      if (slider.value() >= 21 && slider.value() <= 25) {
        w = map(b, 0, 255, 0, vScale * 16)
       

      }
      rect(x * vScale, y * vScale, w, w);
    }
  }
}


let video;

//empty array to store snapshots in
let pics2 = [];
let picW = [44, 86, 122, 160, 200];

//used to count how many photos are in the pics2 array
let counter = 0;

let button;

function setup() {
  createCanvas(800, 400);
  //activates the webcam
  video = createCapture(VIDEO, ready);
  //sets the size of the image
  video.size(400, 300);
  button = createButton('Take Pic!');
  button.mousePressed(takePic);
  
}

let go = false;

function ready() {
  go = true;
}

function draw() {
  scale(pics2);
   cycle();
  pics2[counter] = video.get();
  counter++;
  
  if (counter == 100){
    counter = 0;
  }
 

}

//cycles through the frames from the webcam and places
//in a grid of varying widths
function cycle() {
  let x = 0;
  let y = 0;
  let w = 40;
  let h = 40;
  let z = 0;

  for (let i = 0; i < pics2.length; i++) {
    //tint(255, 50);
    
  
    image(pics2[i], x, y, w, h);
    x = x + w;
    if (x >= width) {
      x = 0;
      y = y + h;
    }

    if (y >= height) {
      y = 0;
    }
    w = int((picW[z]));
    z++;
    if (z >= picW.length) {
      z = 0;
    }
  }

  //background(220);
  //tint(random(100), y, 255, x);
  //image(video, 0, 0);
  // x = x+10;
  // y++;
  // console.log(x, ", ", y);
}

function takePic() {
  //tint(random(100), random(50), 255);
  //pushes the 
  // pics2.push(video.get());
  //image(video, 0, 0);

}function setup() { 
  createCanvas(400, 400);
  //sets pixel density to 1, meaning retina displays that use 4 subPixels/pixels are treated as 1
  pixelDensity(1);
} 

function draw() { 
  background(0);
  
  //initiates that we are going to access the pixels
  loadPixels();
  
  for (let y = 0; y < height; y++){
  for (let x = 0; x < width; x++){
    let index = (x + y * width) * 4;
    
  pixels[index + 0] = x;
  pixels[index + 1] = random(50, 100);
  pixels[index + 2] = y;
  pixels[index + 3] = 255;
    
  }
  }
  
 

  //says we are done using the pixels
  updatePixels();
}let video;

//empty array to store snapshots in
let pics2 = [];
let picW = [44, 86, 122, 160, 200];

//used to count how many photos are in the pics2 array
let counter = 0;

let button;

function setup() {
  createCanvas(800, 400);
  //activates the webcam
  video = createCapture(VIDEO, ready);
  //sets the size of the image
  video.size(400, 300);
  button = createButton('Take Pic!');
  button.mousePressed(takePic);
  
}

let go = false;

function ready() {
  go = true;
}

function draw() {
  scale(pics2);
   cycle();
  pics2[counter] = video.get();
  counter++;
  
  if (counter == 100){
    counter = 0;
  }
 

}

//cycles through the frames from the webcam and places
//in a grid of varying widths
function cycle() {
  let x = 0;
  let y = 0;
  let w = 40;
  let h = 40;
  let z = 0;

  for (let i = 0; i < pics2.length; i++) {
    //tint(255, 50);
    
  
    image(pics2[i], x, y, w, h);
    x = x + w;
    if (x >= width) {
      x = 0;
      y = y + h;
    }

    if (y >= height) {
      y = 0;
    }
    w = int((picW[z]));
    z++;
    if (z >= picW.length) {
      z = 0;
    }
  }

  //background(220);
  //tint(random(100), y, 255, x);
  //image(video, 0, 0);
  // x = x+10;
  // y++;
  // console.log(x, ", ", y);
}

function takePic() {
  //tint(random(100), random(50), 255);
  //pushes the 
  // pics2.push(video.get());
  //image(video, 0, 0);

}var slider;
var catspring;
var catsummer;
var catwinter;
var catfall;

var csv;

function preload() { // preload() runs once
  catspring = loadImage('assets/catspring.png');
  catsummer = loadImage('assets/catsummer.png');
  catwinter = loadImage('assets/catwinter.png');
  catfall = loadImage('assets/catfall.png');
  csv = loadTable("lalala.csv", "csv", "header");
  font = loadFont('Font.otf'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log(csv.getRowCount() + " total rows in table");
  console.log(csv.getColumnCount() + " total columns in table");
  slider = createSlider(0, 12, 0);
  slider.style('width', '300px');
  slider.position(50, height - 300);

  frameRate(5);
}

function draw() {
  background(255);

  print(slider.value());
  if (slider.value() >= 0 && slider.value() < 3 || slider.value() == 12) {
    var x = 10;
    var y = 50;
    var r = int(random(0,60));
    image(catwinter, x, y);
    text("Winter temp: " + int(csv.getString(r,"TEMP")) + " celcius", x, y);
    textFont(font);
    text("Winter is here! Time to hug a snowman!", x, 30);
  }

  if (slider.value() >= 3 && slider.value() < 5) {
    var x = 10;
    var y = 50;
    var r = int(random(61,130));
    image(catspring, x, y);
    text("Spring temp: "+int(csv.getString(r, "TEMP")) + " celcius", x, y);
    text("Spring! YES! Time to pick graduate and SMELL AWESOME flowers!", x, 30);
  }

  if (slider.value() >= 5 && slider.value() < 8) {
    var x = 10;
    var y = 50;
    var r = int(random(131,215));
    image(catsummer, x, y);
    text("Summer temp: "+int(csv.getString(r, "TEMP")) + " celcius", x, y);
    
    text("SUMMER! Time to just be a cat at the beach!", x, 30);
  }

  if (slider.value() >= 8 && slider.value() < 12) {
    var x = 10;
    var y = 50;
  	var r = int(random(216,270));
    image(catfall, x, y);
    text("Fall temp: "+int(csv.getString(r, "TEMP")) + " celcius", x, y);
    text("Fall! Grow more fur! Don't get scared... you're a cat!", x, 30);
  }
  text("Jan", 30, height-250);
  text("Feb", 60, height-250);
  text("Mar", 90, height-250);
  text("Apr", 120, height-250);
  text("May", 150, height-250);
  text("Jun", 180, height-250);
  text("Jul", 210, height-250);
  text("Aug", 240, height-250);
  text("Sep", 270, height-250);
  text("Oct", 300, height-250);
  text("Nov", 330, height-250);
  text("Dec", 360, height-250);
}let csv;
let x;
let x2;

function preload() {
  csv = loadTable("lalala.csv", "csv", "header");
}

function setup() { 
  createCanvas(400, 400);
  
   //prints the total number of rows/columns in the table in the console
  console.log(csv.getRowCount() + " total rows in table");
  console.log(csv.getColumnCount() + " total columns in table");
  
  //initializes variables to place each row of data next to each other in 
  //the for() loops below (in the happyNow() and happyInGeneral() functions)
} 

function draw() { 
  background(220);
for (let r = 0; r < 336; r++) {
    rect(width/2, height/2, 5, int(csv.getString(r, "TEMP")));
  console.log(int(csv.getString(r, "TEMP")));
  }  

}
/************************************************************************
*************************************************************************
This sketch showcases responses to a survey in Somerville, MA where 
participants were asked (among other things) on a scale of 1-10 how 
happy they felt on the day of the survey, and how satisifed they 
were with their lives in general.  The responses for each participant are 
overlaid on top of one another in different colors.  

Data source: https://catalog.data.gov/dataset/somerville-happiness-survey-responses-2011-2013-2015
*************************************************************************
*************************************************************************/

let csv;
let x;
let x2;

//load the csv file: 
//(name, file format, indicating that there's a header)
function preload() {
  csv = loadTable("Somerville_Happiness_Survey_responses_-_2011__2013__2015.csv", "csv", "header");
}

function setup() {
  createCanvas(800, 700);
  background(255);
  //calls a function (below) to display the text 
  callText();
  //prints the total number of rows/columns in the table in the console
  console.log(csv.getRowCount() + " total rows in table");
  console.log(csv.getColumnCount() + " total columns in table");
  
  //initializes variables to place each row of data next to each other in 
  //the for() loops below (in the happyNow() and happyInGeneral() functions)
  x = 0;
  x2 = 0;
  
  //functions with for loops to display the response data 
  happyNow();
  happyInGeneral();

}

function happyNow(){
 //sets strokweight, stroke, and fill for the first set of data
  strokeWeight(0.5);
  stroke(255);
  fill(0, 0, 255);
  //loops through the first 400 rows of data creating a rectangle at the x
  //position (that increases with each row)and uses getString to look at the 
  //data from the (Row number, Column header) and translates this to an int. 
  //This is multiplied by -50 to give the value of the survey some depth in 
  //the sketch. getString ignores the column header row, and begins counting 
  //from zero (like an array)
  for (let r = 0; r < 400; r++) {
    rect(x, height, 2, int(csv.getString(r, "How.happy.do.you.feel.right.now.")) * -50);
    x += 2;
  }  
}

function happyInGeneral(){
  stroke(255);
  fill(0, 255, 0, 160);
  //loops through the first 400 rows of data creating a rectangle at the x
  //position (that increases with each row)and uses getString to look at the 
  //data from the (Row number, Column header) and translates this to an int. 
  //This is multiplied by -50 to give the value of the survey some depth in 
  //the sketch. getString ignores the column header row, and begins counting 
  //from zero (like an array)
  for (let r2 = 0; r2 < 400; r2++) {
    rect(x2, height, 2, int(csv.getString(r2, "How.satisfied.are.you.with.your.life.in.general.")) * -50);
    x2 += 2;
  }
}

//text for title and explanation of data
function callText() {
  push();
  fill(0);
  textSize(30);
  textAlign(CENTER);
  text("How Happy in Somerville?", width / 2, 70);
  pop();
  push();

  
  textSize(20);
  fill(0, 0, 255);
  textAlign(CENTER);
  text("Blue data represents happiness with life in general.", width / 2, 120);
  pop();

  push();
  textSize(20);
  textAlign(CENTER);
  fill(0, 255, 0);
  text("Green data represents happiness on day of survey", width / 2, 160);
  pop();
}
let csv;

function preload() {
	createCanvas(400, 400);
  csv = loadTable("Somerville_Happiness_Survey_responses_-_2011__2013__2015.csv", "csv", "header");
 }

function draw() { 
  background(220);
  
  ellipse(30,30,int(csv.getString(3, "How.happy.do.you.feel.right.now.")));
}/************************************************************************
*************************************************************************
This sketch showcases responses to a survey in Somerville, MA where 
participants were asked (among other things) on a scale of 1-10 how 
happy they felt on the day of the survey, and how satisifed they 
were with their lives in general.  The responses for each participant are 
overlaid on top of one another in different colors.  

Data source: https://catalog.data.gov/dataset/somerville-happiness-survey-responses-2011-2013-2015
*************************************************************************
*************************************************************************/

let csv;
let x;
let x2;

//load the csv file: 
//(name, file format, indicating that there's a header)
function preload() {
  csv = loadTable("Somerville_Happiness_Survey_responses_-_2011__2013__2015.csv", "csv", "header");
}

function setup() {
  createCanvas(800, 700);
  background(255);
  //calls a function (below) to display the text 
  callText();
  //prints the total number of rows/columns in the table in the console
  console.log(csv.getRowCount() + " total rows in table");
  console.log(csv.getColumnCount() + " total columns in table");
  
  //initializes variables to place each row of data next to each other in 
  //the for() loops below (in the happyNow() and happyInGeneral() functions)
  x = 0;
  x2 = 0;
  
  //functions with for loops to display the response data 
  happyNow();
  happyInGeneral();

}

function happyNow(){
 //sets strokweight, stroke, and fill for the first set of data
  strokeWeight(0.5);
  stroke(255);
  fill(0, 0, 255);
  //loops through the first 400 rows of data creating a rectangle at the x
  //position (that increases with each row)and uses getString to look at the 
  //data from the (Row number, Column header) and translates this to an int. 
  //This is multiplied by -50 to give the value of the survey some depth in 
  //the sketch. getString ignores the column header row, and begins counting 
  //from zero (like an array)
  for (let r = 0; r < 400; r++) {
    rect(x, height, 2, int(csv.getString(r, "How.happy.do.you.feel.right.now.")) * -50);
    x += 2;
  }  
}

function happyInGeneral(){
  stroke(255);
  fill(0, 255, 0, 160);
  //loops through the first 400 rows of data creating a rectangle at the x
  //position (that increases with each row)and uses getString to look at the 
  //data from the (Row number, Column header) and translates this to an int. 
  //This is multiplied by -50 to give the value of the survey some depth in 
  //the sketch. getString ignores the column header row, and begins counting 
  //from zero (like an array)
  for (let r2 = 0; r2 < 400; r2++) {
    rect(x2, height, 2, int(csv.getString(r2, "How.satisfied.are.you.with.your.life.in.general.")) * -50);
    x2 += 2;
  }
}

//text for title and explanation of data
function callText() {
  push();
  fill(0);
  textSize(30);
  textAlign(CENTER);
  text("How Happy in Somerville?", width / 2, 70);
  pop();
  push();

  
  textSize(20);
  fill(0, 0, 255);
  textAlign(CENTER);
  text("Blue data represents happiness with life in general.", width / 2, 120);
  pop();

  push();
  textSize(20);
  textAlign(CENTER);
  fill(0, 255, 0);
  text("Green data represents happiness on day of survey", width / 2, 160);
  pop();
}
/*
from https://github.com/dariusk/corpora/blob/master/data/humans/descriptions.json
*/

let data;

function preload(){
  data = loadJSON("adjectives.json");
}


function setup() { 
  createCanvas(400, 400);
  let adjective = data.descriptions;  
  createP("I most enjoy people who are" + " " + random(adjective));
} 

function draw() { 
  background(220);
}let data;

function preload(){
  data = loadJSON("recipes.json");
}

function setup() { 
  //noCanvas();
  createCanvas(400, 400);
  let recipe = data.recipes[2].name;  
  let steps = data.recipes[2].steps; 
  createP(recipe);
  createP(steps);
  
//   let recipes = data.recipes;
  
//   for (i = 0; i < recipes.length; i++){
//     createElement(h1, recipes[i].name);
//     let ingredients = recipes[i].ingredients;
//     for (j = 0; j < ingredients.length; j++){
//      createDiv(ingredients[j]);
//     }
//   }
  
  
  
} 

function draw() { 
  background(220);
  if (data.recipes > 0){
    ellipse(50, 50, 50, 50);
}
}let test; 


function preload(){
  
   test = loadJSON("test.json");
}
  
function setup() { 
  createCanvas(400, 400);
  
} 

function draw() { 
  background(220);
  
  fill(0, 0, 0);
  text(test.name, 10, 50);
}let serial; // variable to hold an instance of the serialport library
let portName = '/dev/cu.usbmodem1441';
let inData; // for incoming serial data
let xPos = 0; // x position of the graph

function setup() {
  createCanvas(400, 400);
  background(0, 100, 200);
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing

  serial.list(); // list the serial ports
  serial.open(portName); // open a serial port


  // serial.list(); // list the serial ports
}

  function draw() {
    graphData(inData);
  //background(0);
  //fill(255);
  //text("sensor value: " + inData, 30, 30);
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
  // read a string from the serial port:
  var inString = serial.readLine();
  // check to see that there's actually a string there:
  if (inString.length > 0 ) {
  // convert it to a number:
  inData = Number(inString);
  }
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}
function graphData(newData) {
  // map the range of the input to the window height:
  let yPos = map(newData, 0, 255, 0, height);
  // draw the line in a pretty color:
  stroke(0xA8, 0xD9, 0xA7);
  line(xPos, height, xPos, height - yPos);
  // at the edge of the screen, go back to the beginning:
  if (xPos >= width) {
    xPos = 0;
    // clear the screen by resetting the background:
    background(0x08, 0x16, 0x40);
  } else {
    // increment the horizontal position for the next reading:
    xPos++;
  }
}
let serial;
let portName = '/dev/cu.usbmodem1441'
let x, y;
let whichAxis;

function setup() {
  createCanvas(400, 400);
  serial = new p5.SerialPort();
  serial.on('open', portOpen);
  serial.on('data', serialEvent);
  serial.open(portName);

}

function draw() {
  background(220);
  ellipse(width / 2, height / 2, x, y);
  serial.write(whichAxis);
}

function portOpen() {
  //console.log("port is open");
}


function serialEvent() { //new data has arrived
  let data = Serial.readline(); //read until you see a new line
  if (serial.length > 0) { //if you get a line
    // console.log(data); // print it
    serial.write('x'); //and ask for more

  }
  if (whichAxis === 88){
    x = serial.data;
}

function keyReleased() {
  console.log(
    whichAxis = key;
  }var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1441'; // fill in your serial port name here
var inData; // for incoming serial data
 
function setup() {
  createCanvas(400, 400);
  
 serial = new p5.SerialPort(); // make a new instance of the serialport library
 serial.on('list', printList); // set a callback function for the serialport list event
 
 serial.list(); // list the serial ports

 serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
  //serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
}

function draw() {
  background(0);
  fill(255);
  text("sensor value: " + inData, 30, 30);
}
 
// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 println(i + " " + portList[i]);
 }
function serverConnected() {
  println('connected to server.');
}
 
function portOpen() {
  println('the serial port opened.')
}
 
function serialEvent() {
 inData = Number(serial.read());
}
 
function serialError(err) {
  println('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  println('The serial port closed.');
}

 
}function setup() { 
  createCanvas(400, 400);
  
  let a= -5;
  let b = 9;
    
  let s = sum(a, b);
  
  console.log(a, "+", b, "=", s);
  
} 

function draw() { 
  background(220);

}

function sum(a, b){
  
  let s = a+b; 
  
  return s;
}// Declare a "SerialPort" object
var serial;
var latestData = "waiting for data"; // you'll use this to write incoming data to the canvas



function setup() {
  createCanvas(windowWidth, windowHeight);
  // Instantiate our SerialPort object
  serial = new p5.SerialPort();
  serial.open("/dev/cu.usbmodem1441");
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
  //fill(0, 0, 0);
  noFill();
  strokeWeight(10);
  background(127, 0, 127);
  //var mappedVar = map(latestData, 490,540,0,width);
  var mappedVar = map(latestData, 0, 255, 0, width);
  //ellipse(mappedVar, 100, 50, 50);
  //text(latestData, 10, 10);
  console.log(latestData);
  
    let v = mappedVar; 
  let origV = v;
  
    // Left Eye
  ellipse(width*0.4, height*0.4, v*0.25 + 10, v*0.25 + 10);

  // Right Eye
  ellipse(width*.6, height*.4, (2500/v) + 10, (2500/v) + 10);
	
  // Nose
  v+=random(-5, 5);
  bezier(width*.5, height*.5, v*.6, height*.6, v*.6, height*.8, width*.45, height*.67);

  // Mouth

  bezier(width*.3, v*.6 + height/2, width*.4, height*.8, width*.6, height*.8, width*.7, v*.55 + height/2);
}
  
/* The header and first paragraph are created under the index.html tag
whereas the paragraph under canvas is created within p5.  Both are
possible but doing it in p5 allows for changes, rather than static
text, images, etc.
*/

//this creates variables for us to tap into the create function objects
let bgColor;
let button;
let button2; 
let button3;
let button4; 
let button5;

let x = 200;
let y = 200;

let slider;
let input;
//let nameP;
function setup() { 
  canvas = createCanvas(400, 400);
  bgColor = color(0, 0, 0);
  //creates the button
  button = createButton('Change BG Color');
  button2 = createButton('Move Right');
  button3 = createButton('Move Down');
  button4 = createButton('Move Left');
  button5 = createButton('Move Up');
  //utilizes 'callback' to say, "When I press the mouse on the button, 
  //I want the (changeColor) function to be executed.
  button.mousePressed(changeColor);
  button2.mousePressed(moveRight);
  button3.mousePressed(moveDown);
  button4.mousePressed(moveLeft);
  button5.mousePressed(moveUp);
  
  //creates the slider and assigns it to the variable slider.  
  //slider.value() goes into whatever element you want the slider to 
  //control
  slider = createSlider(10, 100, 50);
  //creates the text input box
  //input = createInput('Type Your Name');
  //creates a paragraph after canvas that is called "your name"
  //nameP = createP('Your Name!')
}
function moveLeft(){
  x = x-10;
}


function moveUp(){
  y = y-10;
}

function moveRight(){
  x = x+10;
}

function moveDown(){
  y = y+10;
}


function changeColor(){
   bgColor = color(0, random(100), random(255));
}
//Change the background color whenever the mouse is pressed.  But we need
//make it so that it is attached to the button

function draw() { 
  background(bgColor);
  fill(255, 0, 0);
  //x,y are controlled by the buttons
  //size is controlled by the slider
  ellipse(x, y, slider.value(), slider.value());
  //text('hello:  ' + input.value(), 10, 20);
  //takes value from the Text Input box and calls back to the name 
  //paragraph using .html
 // nameP.html(input.value());
  
  if(x>width){
    x=0;
  }
  if(y>height){
    y=0;
  }
  if(x<0){
    x=width;
}
  if(y<0){
    y=height;
  }
  }function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(255, 0, 0);
}//A margin of 200px was added around the body.  
//The 'subscribe Now' button has a 20px blue border around it. 
//The upper left article was retitled to read 'jesseEditz!'
//Jimmy Kimmel floats upward and then resets

// function setup() { 
//   createCanvas(400, 400);
// } 

// function draw() { 
//   background(220);
// }// let x = 0;
// let y = 0;

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  ellipse(200, 200, 50, 50);
  
}

// if(x<width){
//   x++;
// }

// if(y<height){
//   y++;
// }function setup() {
  canvas = createCanvas(400, 400);
   canvas.position(150, 200);
   document.getElementById("stuff").animate([
    // keyframes
    {
      transform: 'translateX(-100px)'
    },
    {
      transform: 'translateY(3000px)'
    }
  ], {
    // timing options
    duration: 7000,
    iterations: Infinity
  });

}

function draw() {
  background(220);
  //ellipse(300, 300, 50, 50);
 
 

}function setup() { 
  createCanvas(400, 400);
  //noCanvas();
} 

function draw() { 
  background(220);
}/* The header and first paragraph are created under the index.html tag
whereas the paragraph under canvas is created within p5.  Both are
possible but doing it in p5 allows for changes, rather than static
text, images, etc.
*/

//this creates variables for us to tap into the create function objects
let bgColor;
let button;
let button2; 
let button3;
let button4; 
let button5;

let txt;

let x = 200;
let y = 200;

let slider;
let nameInput;
let nameP;

function setup() { 
  canvas = createCanvas(400, 400);
  bgColor = color(0, 0, 0);
  //creates the button
  button = createButton('Change BG Color');
  button2 = createButton('Move Right');
  button3 = createButton('Move Down');
  button4 = createButton('Move Left');
  button5 = createButton('Move Up');
  //utilizes 'callback' to say, "When I press the mouse on the button, 
  //I want the (changeColor) function to be executed.
  button.mousePressed(changeColor);
  button2.mousePressed(moveRight);
  button3.mousePressed(moveDown);
  button4.mousePressed(moveLeft);
  button5.mousePressed(moveUp);
  
  //txt.style("background-color", "pink");
  
  //creates the slider and assigns it to the variable slider.  
  //slider.value() goes into whatever element you want the slider to 
  //control
  slider = createSlider(10, 100, 50);
  //creates the text input box
  nameInput = createInput('Type Your Name');
  //creates a paragraph after canvas that is called "your name"
  nameP = createP('Your Name!')
  //when I mouse over this paragraph (nameP), this overPara function
  //should get executed
  nameP.mouseOver(overPara);
  //when my mouse ISN'T over this paragraph (nameP), this outPara 
  //function should get executed
  nameP.mouseOut(outPara);
  //Can apply the same changeColor function to the canvas using 
  //mousePressed
  canvas.mousePressed(changeColor);
  //changes the value of the input when the updateText function is 
  //called using 'Enter' key or 'Tab' key
 // nameInput.changed(updateText);
  //changes the value of the input when the updateText function is
  //called AS THE USER IS TYPING IN THE BOX
   nameInput.input(updateText);
  

}

function updateText(){
 nameP.html(nameInput.value()); 
}

function overPara() {
  nameP.html('Your Mouse is Over Me!!!');

}

function outPara() {
  nameP.html('Your Mouse is NOT Over Me!!!');

}

function moveLeft(){
  x = x-5;
}


function moveUp(){
  y = y-5;
}

function moveRight(){
  x = x+5;
}

function moveDown(){
  y = y+5;
}


function changeColor(){
   bgColor = color(random(255), 100, 0);
}
//Change the background color whenever the mouse is pressed.  But we need
//make it so that it is attached to the button

function draw() { 
  background(bgColor);
  fill(255, 0, 0);
  //x,y are controlled by the buttons
  //size is controlled by the slider
  ellipse(x, y, slider.value(), slider.value());
  text('hello:  ' + nameInput.value(), 10, 20);
  //takes value from the Text Input box and calls back to the name 
  //paragraph using .html
  //nameP.html(nameInput.value());
  
}let textbox; 
let slider; 
let paragraph;


function setup() { 
  noCanvas();
  paragraph = createP('Starting text');
  textbox = createInput('enter text');
  slider = createSlider(10, 64, 16);
  
  //changed is going to change the content of the paragraph whenever you hit enter or
  //tab
  //textbox.changed(doSomething);
  //input is going to change the content of the paragraph as I am typing it into the 
  //textbox
  textbox.input(updateText);
  
  slider.input(updateFontSize);
} 

function updateText(){
  //html function is part of p5js library that changes the html content of 
  //a DOM element - this changes the paragraph html with the textbox value
  paragraph.html(textbox.value());
}

function updateFontSize(){
  //style function is part of the p5js library that 
  //changes the style of a DOM element - this changes the paragraph font size
  //using the slider where the min/max is defined above in createSlider
  //and then pt is added because p5 requires that we assign a unit of measure
paragraph.style("font-size", slider.value() + "pt");
}/* The header and first paragraph are created under the index.html tag
whereas the paragraph under canvas is created within p5.  Both are
possible but doing it in p5 allows for changes, rather than static
text, images, etc.
*/

//this creates variables for us to tap into the create function objects
let bgColor;
let button;
let button2; 
let button3;
let button4; 
let button5;

let txt;

let x = 200;
let y = 200;

let slider;
let nameInput;
let nameP;

function setup() { 
  canvas = createCanvas(400, 400);
  bgColor = color(0, 0, 0);
  //creates the button
  button = createButton('Change BG Color');
  button2 = createButton('Move Right');
  button3 = createButton('Move Down');
  button4 = createButton('Move Left');
  button5 = createButton('Move Up');
  //utilizes 'callback' to say, "When I press the mouse on the button, 
  //I want the (changeColor) function to be executed.
  button.mousePressed(changeColor);
  button2.mousePressed(moveRight);
  button3.mousePressed(moveDown);
  button4.mousePressed(moveLeft);
  button5.mousePressed(moveUp);
  
  //txt.style("background-color", "pink");
  
  //creates the slider and assigns it to the variable slider.  
  //slider.value() goes into whatever element you want the slider to 
  //control
  slider = createSlider(10, 100, 50);
  //creates the text input box
  nameInput = createInput('Type Your Name');
  //creates a paragraph after canvas that is called "your name"
  nameP = createP('Your Name!')
  //when I mouse over this paragraph (nameP), this overPara function
  //should get executed
  nameP.mouseOver(overPara);
  //when my mouse ISN'T over this paragraph (nameP), this outPara 
  //function should get executed
  nameP.mouseOut(outPara);
  //Can apply the same changeColor function to the canvas using 
  //mousePressed
  canvas.mousePressed(changeColor);
  //changes the value of the input when the updateText function is 
  //called using 'Enter' key or 'Tab' key
 // nameInput.changed(updateText);
  //changes the value of the input when the updateText function is
  //called AS THE USER IS TYPING IN THE BOX
   nameInput.input(updateText);
  

}

function updateText(){
 nameP.html(nameInput.value()); 
}

function overPara() {
  nameP.html('Your Mouse is Over Me!!!');

}

function outPara() {
  nameP.html('Your Mouse is NOT Over Me!!!');

}

function moveLeft(){
  x = x-5;
}


function moveUp(){
  y = y-5;
}

function moveRight(){
  x = x+5;
}

function moveDown(){
  y = y+5;
}


function changeColor(){
   bgColor = color(random(255), 100, 0);
}
//Change the background color whenever the mouse is pressed.  But we need
//make it so that it is attached to the button

function draw() { 
  background(bgColor);
  fill(255, 0, 0);
  //x,y are controlled by the buttons
  //size is controlled by the slider
  ellipse(x, y, slider.value(), slider.value());
  text('hello:  ' + nameInput.value(), 10, 20);
  //takes value from the Text Input box and calls back to the name 
  //paragraph using .html
  //nameP.html(nameInput.value());
  
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
}/* The header and first paragraph are created under the index.html tag
whereas the paragraph under canvas is created within p5.  Both are
possible but doing it in p5 allows for changes, rather than static
text, images, etc.
*/

//this creates variables for us to tap into the create function objects
let bgColor;
let button;
let button2; 
let button3;
let button4; 
let button5;

let x = 200;
let y = 200;

let slider;
let nameInput;
let nameP;

function setup() { 
  canvas = createCanvas(400, 400);
  bgColor = color(0, 0, 0);
  //creates the button
  button = createButton('Change BG Color');
  button2 = createButton('Move Right');
  button3 = createButton('Move Down');
  button4 = createButton('Move Left');
  button5 = createButton('Move Up');
  //utilizes 'callback' to say, "When I press the mouse on the button, 
  //I want the (changeColor) function to be executed.
  button.mousePressed(changeColor);
  button2.mousePressed(moveRight);
  button3.mousePressed(moveDown);
  button4.mousePressed(moveLeft);
  button5.mousePressed(moveUp);
  
  //creates the slider and assigns it to the variable slider.  
  //slider.value() goes into whatever element you want the slider to 
  //control
  slider = createSlider(10, 100, 50);
  //creates the text input box
  nameInput = createInput('Type Your Name');
  //creates a paragraph after canvas that is called "your name"
  nameP = createP('Your Name!')
  //when I mouse over this paragraph (nameP), this overPara function
  //should get executed
  nameP.mouseOver(overPara);
  //when my mouse ISN'T over this paragraph (nameP), this outPara 
  //function should get executed
  nameP.mouseOut(outPara);
  //Can apply the same changeColor function to the canvas using 
  //mousePressed
  canvas.mousePressed(changeColor);
  //changes the value of the input when the updateText function is 
  //called using 'Enter' key or 'Tab' key
 // nameInput.changed(updateText);
  //changes the value of the input when the updateText function is
  //called AS THE USER IS TYPING IN THE BOX
   nameInput.input(updateText);
  

}

function updateText(){
 nameP.html(nameInput.value()); 
}

function overPara() {
  nameP.html('Your Mouse is Over Me!!!');

}

function outPara() {
  nameP.html('Your Mouse is NOT Over Me!!!');

}

function moveLeft(){
  x = x-5;
}


function moveUp(){
  y = y-5;
}

function moveRight(){
  x = x+5;
}

function moveDown(){
  y = y+5;
}


function changeColor(){
   bgColor = color(random(255), 100, 0);
}
//Change the background color whenever the mouse is pressed.  But we need
//make it so that it is attached to the button

function draw() { 
  background(bgColor);
  fill(255, 0, 0);
  //x,y are controlled by the buttons
  //size is controlled by the slider
  ellipse(x, y, slider.value(), slider.value());
  text('hello:  ' + nameInput.value(), 10, 20);
  //takes value from the Text Input box and calls back to the name 
  //paragraph using .html
  //nameP.html(nameInput.value());
  
}/* The header and first paragraph are created under the index.html tag
whereas the paragraph under canvas is created within p5.  Both are
possible but doing it in p5 allows for changes, rather than static
text, images, etc.
*/

//this creates variables for us to tap into the create function objects
let bgColor;
let button;
let button2; 
let button3;
let button4; 
let button5;

let x = 200;
let y = 200;

let slider;
let input;
//let nameP;

function setup() { 
  canvas = createCanvas(400, 400);
  bgColor = color(0, 0, 0);
  //creates the button
  button = createButton('Change BG Color');
  button2 = createButton('Move Right');
  button3 = createButton('Move Down');
  button4 = createButton('Move Left');
  button5 = createButton('Move Up');
  //utilizes 'callback' to say, "When I press the mouse on the button, 
  //I want the (changeColor) function to be executed.
  button.mousePressed(changeColor);
  button2.mousePressed(moveRight);
  button3.mousePressed(moveDown);
  button4.mousePressed(moveLeft);
  button5.mousePressed(moveUp);
  
  //creates the slider and assigns it to the variable slider.  
  //slider.value() goes into whatever element you want the slider to 
  //control
  slider = createSlider(10, 100, 50);
  //creates the text input box
  input = createInput('Type Your Name');
  //creates a paragraph after canvas that is called "your name"
  //nameP = createP('Your Name!')
}
function moveLeft(){
  x = x-5;
}


function moveUp(){
  y = y-5;
}

function moveRight(){
  x = x+5;
}

function moveDown(){
  y = y+5;
}


function changeColor(){
   bgColor = color(random(255), 100, 0);
}
//Change the background color whenever the mouse is pressed.  But we need
//make it so that it is attached to the button

function draw() { 
  background(bgColor);
  fill(255, 0, 0);
  //x,y are controlled by the buttons
  //size is controlled by the slider
  ellipse(x, y, slider.value(), slider.value());
  text('hello:  ' + input.value(), 10, 20);
  //takes value from the Text Input box and calls back to the name 
  //paragraph using .html
 // nameP.html(input.value());
  
  if(x>width){
    x=0;
  }
  if(y>height){
    y=0;
  }
  if(x<0){
    x=width;
}
  if(y<0){
    y=height;
  }
  }/* The header and first paragraph are created under the index.html tag
whereas the paragraph under canvas is created within p5.  Both are
possible but doing it in p5 allows for changes, rather than static
text, images, etc.
*/

//this creates variables for us to tap into the create function objects
let bgColor;
let button;
let button2; 
let button3;
let button4; 
let button5;

let x = 200;
let y = 200;

function setup() { 
  canvas = createCanvas(400, 400);
  bgColor = color(0, 0, 0);
  //creates the button
  button = createButton('Change BG Color');
  button2 = createButton('Move Right');
  button3 = createButton('Move Down');
  button4 = createButton('Move Left');
  button5 = createButton('Move Up');
  //utilizes 'callback' to say, "When I press the mouse on the button, 
  //I want the (changeColor) function to be executed.
  button.mousePressed(changeColor);
  button2.mousePressed(moveRight);
  button3.mousePressed(moveDown);
  button4.mousePressed(moveLeft);
  button5.mousePressed(moveUp);
}
function moveLeft(){
  x = x-5;
}


function moveUp(){
  y = y-5;
}

function moveRight(){
  x = x+5;
}

function moveDown(){
  y = y+5;
}


function changeColor(){
   bgColor = color(random(255), 100, 0);
}
//Change the background color whenever the mouse is pressed.  But we need
//make it so that it is attached to the button

function draw() { 
  background(bgColor);
  fill(255, 0, 0);
  ellipse(x, y, 50, 50);
  
}/* The header and first paragraph are created under the index.html tag
whereas the paragraph under canvas is created within p5.  Both are
possible but doing it in p5 allows for changes, rather than static
text, images, etc.
*/

//this creates variables for us to tap into the create function objects
let canvas;
let h1;

let x = 200;
let y = 200;

function setup() { 
  
  //make that canvas element and store the data in the canvas variable
  canvas = createCanvas(400, 400);
  canvas.position(0, 220);
  
  //make that h1 (header) element and store the data in the h1 variable
  h1 = createElement('h1', 'My Favorite Numbers Are...');
  h1.position(0, 620);
  
}
//create a paragraph whenever the mouse is pressed
function mousePressed(){
  createP("my favorite number is " + floor(random(1, 10)));

} 

function draw() { 
  
  //makes the canvas transparent
  clear();
  //background(220);
  
  ellipse(x, y, 50, 50);
  //notice how the h1 position is relative to the screen and not the 
  //canvas.  the h1 is not on top of the ellipse. 
  h1.position(x, y);
  
  x = x + random(-5, 5);
}/* The header and first paragraph are created under the index.html tag
whereas the paragraph under canvas is created within p5.  Both are
possible but doing it in p5 allows for changes, rather than static
text, images, etc.
*/

function setup() { 
  createCanvas(400, 400);
  //creates a header - this is not a given in p5 and so I must create
  //it myself using createElement
  createElement('h1', 'My Favorite Numbers Are...');
  
}
//create a paragraph whenever the mouse is pressed
function mousePressed(){
  createP("my favorite number is " + floor(random(1, 10)));

} 

function draw() { 
  background(220);
  ellipse(width/2, height/2, 50, 50);
}/**********************************************************************************
***********************************************************************************

This program creates waveform objects that when bounced off of one another 
generate a random waveform (weighted toward sine wave).  The images are assigned 
randomly based on a dataset of four images.  The frequency is assigned randomly
based on a dataset of assigned frequencies.  

mouseX is mapped to the feedback in a delay method from the p5.sound library.

mouseY is reverse mapped to the lowpass frequency in a filter method from the 
p5.sound library.

***********************************************************************************
**********************************************************************************/

//array to be used for creating the waveform objects
let waveForms = [];
//array to be used for assigning the waveform image
let waveImage = [];
//array to be used for assigning the oscillator frequency
let freqArray = [240, 480, 720, 960, 1200, 1800];
//array to be used for assigning oscillator type
let oscType = ["sine", "sine", "square", "triangle", "sawtooth"];

let showText = 0;

let y = 300;

playing = true;

//loads waveform images to be used in array before the sketch is setup; prevents wait
//time mid-sketch
function preload() {
  waveImage[0] = loadImage('wave1.png');
  waveImage[1] = loadImage('wave2.png');
  waveImage[2] = loadImage('wave3.png');
  waveImage[3] = loadImage('wave4.png');
}

function setup() {
  createCanvas(400, 700);
  /***********************************************************************************

  Methods from p5.sound relating to creating the oscillator, delay, and filter

  ***********************************************************************************/
  //creates the new oscillator
  osc = new p5.Oscillator();
  //creates the delay envelope
  delay = new p5.Delay();
  //creates the filter envelope
  env = new p5.Env(0.1, 1.2, 1.2, 0.1);
  env.setADSR(5.9, 0.25, 0.1, 0.1);
  //creates the lowpass filter
  filter = new p5.LowPass();
  //connects the oscillator to the filter
  osc.connect(filter);

  /***********************************************************************************
   ***********************************************************************************/

  showText = new Showtext();

  for (let i = 0; i < 4; i++) {
    let r = floor(random(0, waveImage.length));
    waveForms[i] = new WaveForm(width / 2, y, waveImage[r]);
    y = y + 75;
  }
}

function draw() {
  background(0);
  //displays the text
  showText.callText();

  // set the lowPass frequency based on mouseY
  let freq = map(mouseY, 0, height, 500, 2000);
  filter.freq(freq);
  // lower res = wider bandpass
  filter.res(50);

  for (let i = 0; i < waveForms.length; i++) {
    waveForms[i].display();
    waveForms[i].move();
    waveForms[i].bounce();
    for (let j = 0; j < waveForms.length; j++) {
      if (i != j && waveForms[i].intersects(waveForms[j])) {
        waveForms[i].changeDirectionOnCollision(waveForms[j]);
        waveForms[i].slowDownWave(waveForms[j]);
        waveForms[i].setOscType(waveForms[j]);
        waveForms[i].changePitch(waveForms[j]);
        waveForms[i].setFeedbackAmount(waveForms[j]);
      }
    }
  }
}let waveForms = [];
let waveImage = [];
let osc = [];

playing = true;

function preload() {
  waveImage[0] = loadImage('wave1.png');
  waveImage[1] = loadImage('wave2.png');
  waveImage[2] = loadImage('wave3.png');
  waveImage[3] = loadImage('wave4.png');
}

function setup() {
  createCanvas(600, 600);
  osc = new p5.Oscillator();
  osc.setType('sawtooth');
  //osc.freq(random(120, 960));
  osc.amp(0);
  osc.start();
  


  for (let i = 0; i < 5; i++) {
    let r = floor(random(0, waveImage.length));
    waveForms[i] = new WaveForm(random(width), random(height), waveImage[r], osc, osc.freq);
    
  }
}

function draw() {
  background(255);
  //oscSetup();
  for (let i = 0; i < waveForms.length; i++) {
    waveForms[i].display();
    waveForms[i].move();
    waveForms[i].bounce();
    for (let j = 0; j < waveForms.length; j++) {
      if (i != j && waveForms[i].intersects(waveForms[j])) {
        //waveForms[i].switched = !waveForms[i].switched;
        waveForms[i].changeDirection(waveForms[j]);


      }
    }
  }


}let bubbles = [];

function setup() {
  createCanvas(600, 600);
  for (let i = 0; i < 20; i++) {
    bubbles[i] = new Bubble(random(width), random(height), 4, color(255, 255, 255));
  }

}

function draw() {
  background(0);
  //outer loop sets rules for initial balls
  for (let i = bubbles.length -1 ; i > 0; i--) {
    if(!bubbles[i]) continue;
    bubbles[i].move();
    bubbles[i].display();
    bubbles[i].bounce();
    //inner loop compares the balls to each other.  within the if statement
    //i != j means, not to compare an object to itself
    for (let j = bubbles.length - 1; j > 0; j--) {
      if (i == j) continue;
      if (i != j && bubbles[i].intersects(bubbles[j])) {
        bubbles[i].switched = !bubbles[i].switched;
        //bubbles[i].changeDirection();
        bubbles.splice(i, 1);
        bubbles.splice(j, 1);
         bubbles[i].changeColor();
       // bubbles[i].shrink();
        //bubbles[i].grow();
      }
    }

  }
}let bubbles = [];

function setup() {
  createCanvas(600, 600);
  for (let i = 0; i < 20; i++) {
    bubbles[i] = new Bubble(random(width), random(height), 5, color(255, 255, 255));
  }

}

function draw() {
  background(0);
  //outer loop sets rules for initial balls
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].display();
    bubbles[i].bounce();
    //inner loop compares the balls to each other.  within the if statement
    //i != j means, not to compare an object to itself
    for (let j = 0; j < bubbles.length; j++) {
      if (i != j && bubbles[i].intersects(bubbles[j])) {
        bubbles[i].switched = !bubbles[i].switched;
        //bubbles[i].changeDirection();
        bubbles[i].changeColor();
       // bubbles[i].shrink();
        //bubbles[i].grow();
      }
    }

  }
}let bubble;

function setup() {
  createCanvas(600, 600);
  bubble = new Bubble(200, 300, 40, 255);
  bubble2 = new Bubble(400, 100, 20, 255);

}

function draw() {
  background(0);
  bubble.move();
  bubble.display();
  bubble.bounce();
  bubble.grow();
  //bubble.changeColor();

  bubble2.move();
  bubble2.display();
  bubble2.bounce();
  bubble2.grow();
  //bubble2.changeColor();

  if (bubble.intersects(bubble2)) {
    bubble.changeDirection();
    bubble2.changeDirection();
    bubble.changeColor();
    bubble2.changeColor();
  }
}let ball1;
let ball2;
let ball3;

function setup() {
  createCanvas(400, 400);
  ball1 = new Ball(random(width) / 2, height / 2, 25, 3, 2);
  ball2 = new Ball(width, random(height), 25, 3, 2);
  ball3 = new Ball(width, random(height), 25, 3, 2);
}

function draw() {
  background(0);
  
  ball1.run();
  ball2.run();
  ball3.run();
  
  ball1.collisionCheck(ball2);
    ball1.collisionCheck(ball3);
  ball1.colorRed();
  ball1.isEntering(ball2);
   ball1.isEntering(ball3);

  ball2.collisionCheck(ball1, ball3);
  ball2.colorRed();
  ball2.isEntering(ball1, ball3);
  
   ball3.collisionCheck(ball1, ball2);
   ball3.colorRed();
   ball3.isEntering(ball1, ball2);

}

function bounce(pos, speed, min, max) {

  if (pos < min || pos > max) {
    speed *= -1;

  }
  return speed;

}let ball1;
let ball2;

function setup() {
  createCanvas(400, 400);
  ball1 = new Ball(random(width) / 2, height / 2, 25, 3, 2);
  ball2 = new Ball(width, random(height), 25, 3, 2);
  //frameRate(20);
}

function draw() {
  background(0);
  ball1.run();
  ball2.run();

}

function bounce(pos, speed, min, max) {

  if (pos < min || pos > max) {
    speed *= -1;

  }
  return speed;

}
// this.newColor = function() {
//       this.col = color(random(255), random(255), 0);

//     }var x, y, xspeed, yspeed;

function setup() {
  createCanvas(400, 400);
  x = width / 2;
  y = height / 2;
  xspeed = 1;
  yspeed = 3;
}

function draw() {
  background(220);
  display();
  update();

}

function display() {
  ellipse(x, y, 50, 50);
}

function update() {
  if (x < 0 || x > width) {
    xspeed *= -1;
  }

  if (y < 0 || y > height) {
    yspeed *= -1;
  }

  x += xspeed;
  y += yspeed;
}//create a new array

let balls = [];

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 20; i++) {
    balls.push(new Ball(random(width), random(height), 3, 2));
  }
}

function draw() {
  background(0);
  for (let i = 0; i < balls.length; i++) {
    for (let j = 0; j < balls.length; j++) {
      //balls[i].run();
      balls[i].isNear(balls[j]);
    }
    balls[i].run();
  }


}
  function bounce(pos, speed, min, max) {

    if (pos < min || pos > max) {
      speed *= -1;

    }
    return speed;

  }let ball1;
let ball2;

function setup() {
  createCanvas(400, 400);
  ball1 = new Ball(random(width) / 2, height / 2, 25, 3, 2);
  ball2 = new Ball(width, random(height), 25, 3, 2);
  //frameRate(20);
}

function draw() {
  background(0);
  ball1.run();
  ball2.run();

}

function bounce(pos, speed, min, max) {

  if (pos < min || pos > max) {
    speed *= -1;

  }
  return speed;

}
// this.newColor = function() {
//       this.col = color(random(255), random(255), 0);

//     }//to check to see if objects are intersecting, need to calculate the distance
//between their centers, and if the distance is less than the sum of their
//radii, then they are touching. 

//push() and splice() functions

//nums.push(63); add the value 63 to the end of the array

//nums.splice(
//splice(index number, how many to remove)

//Constructor functions look like normal functions only the name begins with 
//a capital letter 

//leaving the brackets without a value leaves the array open ended
let bubbles = [];

function setup() {
  createCanvas(400, 400);
}

function mousePressed() {
  for (let i = 0; i < bubbles.length; i++) {
    //bubbles[i]._____ is defined in the bubble.js constructor
    bubbles[i].clicked();
  }
}

//use of the push function to add a new Bubble into the array
function mouseDragged() {
  bubbles.push(new Bubble(mouseX, mouseY));
}

function draw() {
  background(0);
  //create a for loop to run move and display for the array from 0 to bubbles.length.
  //bubbles.length is the length of the array.

  //run the loop from max to min so that we run through the array backwards. 
  //this allows us to never skip over a value because in the if statement,
  //when we splice element 1 from the array, number 2 becomes 1, but then the
  //for loop goes to check for element 2, but the previous element 2 is now 1
  //and has not been evaluated.
  for (let i = bubbles.length - 1; i > 0; i--) {
    bubbles[i].update();
    bubbles[i].display();
    //if this bubbles lifespan is < 0, then delete it from the array
    if (bubbles[i].lifespan < 0) {
      bubbles.splice(i, 1);
    }
  }
}//push() and splice() functions

//nums.push(63); add the value 63 to the end of the array

//nums.splice(
//splice(index number, how many to remove)

//Constructor functions look like normal functions only the name begins with 
//a capital letter 

//leaving the brackets without a value leaves the array open ended
let bubbles = [];

function setup() {
  createCanvas(400, 400);
}

function mousePressed() {
  for (let i = 0; i < bubbles.length; i++) {
    //bubbles[i]._____ is defined in the bubble.js constructor
    bubbles[i].clicked();
  }
}

//use of the push function to add a new Bubble
function mouseDragged() {
  bubbles.push(new Bubble(mouseX, mouseY));
}

function draw() {
  background(0);
  //create a for loop to run move and display for the array from 0 to bubbles.length.
  //bubbles.length is the length of the array.

  //run the loop from max to min so that we run through the array backwards. 
  //this allows us to never skip over a value because in the if statement,
  //when we splice element 1 from the array, number 2 becomes 1, but then the
  //for loop goes to check for element 2, but the previous element 2 is now 1
  //and has not been evaluated.
  for (let i = bubbles.length - 1; i > 0; i--) {
    bubbles[i].update();
    bubbles[i].display();
    //if this bubbles lifespan is < 0, then delete it from the array
    if (bubbles[i].lifespan < 0) {
      bubbles.splice(i, 1);
    }
  }
}//push() and splice() functions

//nums.push(63); add the value 63 to the end of the array

//nums.splice(
//splice(index number, how many to remove)

//Constructor functions look like normal functions only the name begins with 
//a capital letter 

//leaving the brackets without a value leaves the array open ended
let bubbles = [];

function setup() {
  createCanvas(400, 400);
}

function mousePressed(){
    for (let i = 0; i < bubbles.length; i++) {
      //bubbles[i]._____ is defined in the bubble.js constructor
    bubbles[i].clicked();
  }
}

//use of the push function to add a new Bubble
function mouseDragged(){
  bubbles.push(new Bubble(mouseX, mouseY));
}

function draw() {
  background(0);
  //create a for loop to run move and display for the array from 0 to bubbles.length.
  //bubbles.length is the length of the array.
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].display();
  }
  //splice function removes the first element of the array once the array length has exceeded 50.
  //creates a trailing effect
  if (bubbles.length > 50){
    bubbles.splice(0, 1);
  }
}





//push() and splice() functions

//nums.push(63); add the value 63 to the end of the array

//nums.splice(
//splice(index number, how many to remove)

//Constructor functions look like normal functions only the name begins with 
//a capital letter 


//leaving the brackets without a value leaves the array open ended
let bubbles = [];

function setup() {
  createCanvas(400, 400);
}

//use of the push function to add a new Bubble
function mouseDragged(){
  bubbles.push(new Bubble(mouseX, mouseY));
}

function draw() {
  background(0);
  //create a for loop to run move and display for the array from 0 to bubbles.length.
  //bubbles.length is the length of the array.
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].display();
  }
  //splice function removes the first element of the array once the array length has exceeded 50.
  //creates a trailing effect
  if (bubbles.length > 50){
    bubbles.splice(0, 1);
  }
}


//push() and splice() functions

//nums.push(63); add the value 63 to the end of the array

//nums.splice(
//splice(index number, how many to remove)

//Constructor functions look like normal functions only the name begins with 
//a capital letter 


//leaving the brackets without a value leaves the array open ended
let bubbles = [];

function setup() {
  createCanvas(400, 400);
}

//use of the push function to add a new Bubble
function mouseDragged(){
  bubbles.push(new Bubble(mouseX, mouseY));
}

function draw() {
  background(0);
  //create a for loop to run move and display for the array from 0 to bubbles.length.
  //bubbles.length is the length of the array.
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].display();
  }
  //splice function removes the first element of the array once the array length has exceeded 50.
  //creates a trailing effect
  if (bubbles.length > 50){
    bubbles.splice(0, 1);
  }
}

//This is the bubble constructor.  It uses the syntax of a function with a capital 
//letter B for Bubble, where this.x, this.y, and this.display and this.move 
//are defined within it.  Constructor functions can be used anywhere within the code
//think about how mousePressed can be used to create a bubble wherever I press it

//the x,y in the Bubble function arguments are temporary placeholders that are used 
//to assign to this.x and this.y when a function calls on them (such as bubbles.push).
//mouseX/mouseY are passed in
function Bubble(x, y) {
  this.x = mouseX;
  this.y = mouseY;
  this.display = function() {
    stroke(255);
    noFill();
    ellipse(this.x, this.y, 24, 24);
  }
  this.move = function() {
    this.x = this.x + random(-1, 1);
    this.y = this.y + random(-1, 1);
  }

}



/*
   x: random(width),
    y: random(height),
    display: function() {
      stroke(255);
      noFill();
      ellipse(this.x, this.y, 24, 24);
    },
    move: function() {
      this.x = this.x + random(-1, 1);
      this.y = this.y + random(-1, 1);
    }
  }
 }
 *///Constructor functions look like normal functions only the name begins with 
//a capital letter 


//leaving the brackets without a value leaves the array open ended
let bubbles = [];

function setup() {
  createCanvas(400, 400);
  //create a for loop amongst the bubbles array object;  changing the number within
  //i < ____ allows us to create as many of the object as we want
  for (let i = 0; i < 400; i++) {
    //set the number of the bubbles in the array to a variable in the loop
    bubbles[i] = new Bubble();

    //print(bubbles);
  }
}

function draw() {
  background(0);
  //create a for loop to run move and display for the array from 0 to bubbles.length.
  //bubbles.length is the length of the array.
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].display();
  }
}

//This is the bubble constructor.  It uses the syntax of a function with a capital 
//letter B for Bubble, where this.x, this.y, and this.display and this.move 
//are defined within it.  Constructor functions can be used anywhere within the code
//think about how mousePressed can be used to create a bubble wherever I press it
function Bubble() {
  this.x = random(width);
  this.y = random(height);
  this.display = function() {
    stroke(255);
    noFill();
    ellipse(this.x, this.y, 24, 24);
  }
  this.move = function() {
    this.x = this.x + random(-1, 1);
    this.y = this.y + random(-1, 1);
  }

}



/*
   x: random(width),
    y: random(height),
    display: function() {
      stroke(255);
      noFill();
      ellipse(this.x, this.y, 24, 24);
    },
    move: function() {
      this.x = this.x + random(-1, 1);
      this.y = this.y + random(-1, 1);
    }
  }
 }
 *///leaving the brackets without a value leaves the array open ended
let bubbles = [];


function setup() {
  createCanvas(400, 400);
  //create a for loop amongst the bubbles array object;  changing the number within
  //i < ____ allows us to create as many of the object as we want
 for( let i = 0; i <400; i++){
   //set the number of the bubbles in the array to a variable in the loop
  bubbles[i] = {
    x: random(width),
    y: random(height),
    display: function() {
      stroke(255);
      noFill();
      ellipse(this.x, this.y, 24, 24);
    },
    move: function() {
      this.x = this.x + random(-1, 1);
      this.y = this.y + random(-1, 1);
    }
  }
 }
  print(bubbles);
}


function draw() {
  background(0);
  //create a for loop to run move and display for the array from 0 to bubbles.length.
  //bubbles.length is the length of the array.
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].display();
  }
}let bubble ={
  x: 300, 
  y: 200, 
  display: function(){
    stroke(255);
    noFill();
    ellipse(this.x, this.y, 24, 24);
  },
  move: function(){
    this.x = this.x +random (-1, 1);
    this.y = this.y + random(-1, 1);
  }
}

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(0);
  bubble.move();
  bubble.display();
}let nums = [100, 25, 46, 72];

function setup() { 
  createCanvas(500, 400);
} 

function draw() { 
  background(0);
  stroke(255);
  noFill();
  //to get the ellipses spread across the screen, we need to define the x value as 
  //i * (some amount) + (the same amount).  When i = 0, this sets the x value to the 
  //x value that we want --> 0 * 100 + 100 = 100;  1 * 100 +100 = 200;  
  // 2 * 100 +100 = 300; etc.
  for(let i = 0; i < 4; i++){
    ellipse(i * 100 +100, 200, nums[i], nums[i]);
}

}

//an array is a list, starting at 0.  to call an array, you use the variable name
//and brackets indicating the number in the list that you want to use, STARTING
//WITH ZERO.  
let words = ["happy", "sad", "ecstatic", "confused"];

index = 0;

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(0);
  
  fill(255); 
  stroke(255);
  textSize(32);
  text(words[random(0, words.length)], 12, 200);
}
function mousePressed(){
  index = index+1;
  
  //checks to say, "if we've advanced to the full length of the array, then reset to
  //zero.  the .length property is inherent to the use of arrays
  
}// .  10/2/17 - refactored to incorporate functions 

//This program creates a static grid of ellipses where the stroke of the ellipses
//change based on the perceived motion of a moving 'ball'.  In actuality there is no 
//ellipse object that functions as a ball, but instead the stroke and alpha of the fill
//are changing based on the speed and direction of an invisible point indicated by
//the global variables below.  The button changes the colorMode from RGB to HSB.  
//mouseX position is mapped to blue values in RGB mode and brightness in HSB.

//vars for bouncing ball
let xCoord;
let yCoord;
let speedX;
let speedY;
console.log(speedX, " , ", speedY);

//var for ellipse
let rad;

//var for button1
let on = true;


//starting point of the invisible point.  This is a random starting point every time
//the sketch is run
xCoord = 600;
yCoord = 300;
//the amount the point will advance in directions x and y
speedX = 0.005;
speedY = 0.007;
rad = 25;

function setup() {
  createCanvas(600, 600);
  background(0);

}

function draw() {
  button(25, 25, 50);
  grid(0, 0, 25, 25);
}

function grid(x, y, colWidth, colHeight) {
  strokeWeight(2);
  //sets rgb values
  let r = 0;
  let g = 0;
  let b = 0;
  //draw an ellipse at x, y with the size of rad, rad, at each x,y coordinate that is less
  //than the width and height of the screen at increments of 25

  for (let x = 0; x <= width; x = x + colWidth) {
    for (let y = 100; y <= height; y = y + colHeight) {

      //maps the x position from 0 to the width of the window, to the corresponding
      //min and max color values of 0 to 255
      r = map(x, 0, width, 0, 255);
      //maps the y position from 0 to the height of the window, to the corresponding
      //min and max color values of 0 to 255
      g = map(y, 0, height, 0, 255);
      b = map(mouseX, 0, width, 0, 128);
      //calculates the distance between the x,y coordinate of the ellipse and the 
      //xCoord/yCoord (that changes).  When the xCoord/yCoord are on top of a given
      //ellipse, the result is a black stroke.  Those ellipses calculated at a distance
      //further than 255 pixels away have a white stroke, and in between have a 
      //greyscale
      c = dist(x, y, xCoord, yCoord);
      push();
      fill(r, g, b, c);
      stroke(c);
      rect(x, y, rad, rad);
      stroke(c, c);
      ellipse(x + rad / 2, y + rad / 2, rad, rad);
      pop();
      
      xCoord = xCoord + speedX;
      yCoord = yCoord + speedY;
      if ((xCoord < 0) || (xCoord > width)) {
        speedX = -speedX;
      }
      if ((yCoord < 100) || (yCoord >= height)) {
        speedY = -speedY;
      }

      if (on) {
        fill(0, 255, 0);
      } else {
        fill(255, 0, 0);
      }
    }
  }
}

function button(xLoc, yLoc, rad) {
  fill(0, 255, 0);
  stroke(255);
  rect(xLoc, yLoc, rad, rad);
}

function mousePressed() {
  if (mouseX > 25 && mouseX < 75 && mouseY > 25 && mouseY < 75) {
    on = !on;
  }
  if (on) {
    colorMode(HSB);
  } else {
    colorMode(RGB);
  }
}//This program creates a static grid of ellipses where the stroke of the ellipses
//change based on the perceived motion of a moving 'ball'.  In actuality there is no 
//ellipse object that functions as a ball, but instead the stroke and alpha of the fill
//are changing based on the speed and direction of an invisible point indicated by
//the global variables below.  The button changes the colorMode from RGB to HSB.  
//mouseX position is mapped to blue values in RGB mode and brightness in HSB.

//vars for bouncing ball
let xCoord;
let yCoord;
let speedX;
let speedY;

//var for ellipse
let rad;

//var for button1
let on = true;

function setup() {
  createCanvas(600, 600);
  background(0);
  //starting point of the invisible point.  This is a random starting point every time
  //the sketch is run
  xCoord = random(width);
  yCoord = random(height);
  //the amount the point will advance in directions x and y
  speedX = 0.005;
  speedY = 0.005;
  rad = 25;

}

function draw() {
  console.log(speedX, " ", speedY);
  fill(255, 0, 0);

  button(25, 25, 50);

  //defines the sketch as either being in HSB or RGB mode
  if (on) {
    colorMode(HSB);
  } else {
    colorMode(RGB);
  }
  grid(0, 0, 25, 25);
}

function mousePressed(buttonX, buttonY, buttonWidth, buttonHeight) {
  if (mouseX > 25 && mouseX < 75 && mouseY > 25 && mouseY < 75) {
    on = !on;
  }
}
function grid(x, y, colWidth, colHeight){
    strokeWeight(2);
  //sets rgb values
  let r = 0;
  let g = 0;
  let b = 0;
  //draw an ellipse at x, y with the size of rad, rad, at each x,y coordinate that is less
  //than the width and height of the screen at increments of 25

  for (let x = 0; x <= width; x = x + colWidth) {
    for (let y = 100; y <= height; y = y + colHeight) {

      //maps the x position from 0 to the width of the window, to the corresponding
      //min and max color values of 0 to 255
      r = map(x, 0, width, 0, 255);
      //maps the y position from 0 to the height of the window, to the corresponding
      //min and max color values of 0 to 255
      g = map(y, 0, height, 0, 255);
      b = map(mouseX, 0, width, 0, 128);
      //calculates the distance between the x,y coordinate of the ellipse and the 
      //xCoord/yCoord (that changes).  When the xCoord/yCoord are on top of a given
      //ellipse, the result is a black stroke.  Those ellipses calculated at a distance
      //further than 255 pixels away have a white stroke, and in between have a 
      //greyscale
      c = dist(x, y, xCoord, yCoord);
      push();
      fill(r, g, b, c);
      stroke(c);
      rect(x, y, rad, rad);
      stroke(c, c);
      ellipse(x+rad/2, y+rad/2, rad, rad);
      pop();
      
      xCoord = xCoord + speedX;
      yCoord = yCoord + speedY;
      if ((xCoord < 0) || (xCoord > width)) {
        speedX = -speedX;
      }
      if ((yCoord < 100) || (yCoord >= height)) {
        speedY = -speedY;
      }

      if (on) {
        fill(0, 255, 0);
      } else {
        fill(255, 0, 0);
      }
    }
  }
}
function button(xLoc, yLoc, rad){
    stroke(255);
    rect(xLoc, yLoc, rad, rad);
}
  
  let x = 50;
let xSpeed; 

let y = 50; 
let ySpeed;

// let x2 = 50;
// let xSpeed2; 

// let y2 = 50; 
// let ySpeed2;

function setup() { 
  createCanvas(400, 400);
  xSpeed = 1; 
  ySpeed = 1.4;
  // xSpeed2 = 4;
  // ySpeed2 = 1.6;
  
} 

function draw() { 
  background(220);
  ellipse(x, y, 50, 50);
  //ellipse(x2, y2, 30, 30);
  
  x = x + xSpeed;
  y = y + ySpeed;
  
  // x2 = x2 + xSpeed2;
  // y2 = y2 + ySpeed2; 
  
  xSpeed = bounce(x, xSpeed, 0, width);
  ySpeed = bounce(y, ySpeed, 0, height);
  
//   xSpeed2 = bounce(x2, xSpeed2, 0, width);
//   ySpeed2 = bounce(y2, ySpeed2, 0, height); 
  
}
function bounce(loc, speed, bottom, top){
  if(loc<bottom || loc>top) {
   speed *= -1// this is the same as saying speed = -1*speed;  
  }
  return speed;
  }
  
let x = 50;
let xSpeed; 

let y = 50; 
let ySpeed;

let x2 = 50;
let xSpeed2; 

let y2 = 50; 
let ySpeed2;

function setup() { 
  createCanvas(400, 400);
  xSpeed = 1; 
  ySpeed = 1.4;
  xSpeed2 = 4;
  ySpeed2 = 1.6;
  
} 

function draw() { 
  background(220);
  ellipse(x, y, 50, 50);
  ellipse(x2, y2, 30, 30);
  
  x = x + xSpeed;
  y = y + ySpeed;
  
  x2 = x2 + xSpeed2;
  y2 = y2 + ySpeed2; 
  
  xSpeed = bounce(x, xSpeed, 0, width);
  ySpeed = bounce(y, ySpeed, 0, height);
  
  xSpeed2 = bounce(x2, xSpeed2, 0, width);
  ySpeed2 = bounce(y2, ySpeed2, 0, height); 
  
}
function bounce(loc, speed, bottom, top){
  if(loc<bottom || loc>top) {
   speed *= -1// this is the same as saying speed = -1*speed;  
  }
  return speed;
  }
  
//variables for columns
let w;
let h;
let cw;
let ch;
let cols = 10;
//variables for rows
let rw;
let rh;
let rows = 5;

function setup() {
  createCanvas(400, 400);



}

function draw() {
  //background(0);
  cw = width / cols;
  ch = height;
  rw = width;
  rh = height / rows;
  stroke(0);
  //outer loop calculates the number of the column, and as long as it is less than the
  //desired total number of columns (defined above as a hard number)
  for (let cn = 0; cn < cols; cn++) {
    let x = cn * cw;
    for (let rn = 0; rn < rows; rn++) {
     let y = rn * rh;
     rect(x, y, cw, rh);
    }

  }
}//the bubble object now has a lot of information in it.  How it should behave, what
//it looks like, etc.  
let bubble = {
  x: 300,
  y: 200,
  display: function () {
  stroke(255);
  strokeWeight(2);
  noFill();
  ellipse(this.x, this.y, 25, 25);
}, move: function () {
  this.x = this.x + random(-1, 1);
  this.y = this.y + random(-1, 1);
}
}
let bubble2 = {
  x: 100,
  y: 200,
  display: function () {
  stroke(255);
  strokeWeight(2);
  noFill();
  ellipse(this.x, this.y, 25, 25);
}, move: function () {
  this.x = this.x + random(-1, 1);
  this.y = this.y + random(-1, 1);
}

}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  bubble.move();
  bubble.display();
  bubble2.move();
  bubble2.display();
}




let bubble = {
  x: 300,
  y: 200,
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  move();
  display();
}

function move() {
  bubble.x = bubble.x + random(-1, 1);
  bubble.y = bubble.y + random(-1, 1);
}

function display() {
  stroke(255);
  strokeWeight(0.8);
  noFill();
  ellipse(bubble.x, bubble.y, 25, 25);
}

var x = 20; 

function setup() { 
  createCanvas(400, 400);
  //ellipseMode is by default CENTER (position points)
  ellipseMode(CENTER);
  frameRate(8);
} 

function draw() { 
  stroke(0);
  strokeWeight(1.5);
  background(0, 255, 0);
  //alien(width/2, height/2);
  fill(255);
  alien(width/2, height/2, 50);
  alien(width/4, height/2, 50);

  }
  function alien(xLoc, yLoc, diameter){
  rect(xLoc, yLoc, diameter, diameter);
  }
function setup() {
  createCanvas(400, 400);
  noStroke();
}

function draw() {
  stroke(0);
  background(220);

  for (let x = 0; x < width; x = x + 25) {
    for (let y = 0; y < height; y = y + 25) {
      rect(x, y, 25, 25);
    }
  }
}function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(220);
  print(mouseX);

  for (let i = 0; i < 10; i++) {
        if (mouseX >= i * width / 10 && mouseX < (i + 1) * width / 10 && i<5)  {
          stroke(0);   
          fill(0, 0, 255);
         } else if(mouseX >= i * width / 10 && mouseX < (i + 1) * width / 10 && i>=5){
           stroke(0); 
           fill(255,0,0);
         } else {
           stroke(0); 
           fill(255);
         }
         rect(i / 10 * width, 0, width / 10, height);
    }
  }


//Sketch initially coded by Yeonhee Lee.  Additional random button added by Jesse to
//calculate recursion between 1-8 in whole numbers, randomize the color, and
//randomize the radius of the initial circle between 150 and 200. 

/****************************
  VARIABLES FOR THE FRACTAL
****************************/
let rad; // the radiance of the biggest circle in the fractal
let n; // number of recursion
let c; // the initial hue of the fractal
let colorSpd; // the hue changing speed

/****************************
  JESSE'S VARIABLES
****************************/
//random button
let btn3;
//used as a constant to apply random number generator only for button 3
let opt;

/****************************
  VARIABLES FOR UI ELEMENTS
****************************/
let btn1;
let btn2;
let sldr1;
let dragging;
let temp;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
  colorMode(HSB, 100);
  // set the initial values for the fractal
  rad = 200;
  n = 8;
  c = 90;
  colorSpd = 1;
  //used as a constant to apply random number generator only for button 3
  opt = 2

  // object construction 
  // 2 buttons and 1 slider
  btn1 = new Button(30, 50, 30, 30, 5, "+"); // parameters: (X, Y, Width, Height, Round, Label)
  btn2 = new Button(70, 50, 30, 30, 5, "-");
  btn3 = new Button(50, 100, 30, 30, 5, "rnd");
  sldr1 = new Slider(350, 50, 220, 20, 10, 5); // parameters: (Rail's X, Rail's Y, Rail's Length, Handle Width, Handle Height, Handle Round)
  dragging = false;
}

function draw() {

  background(0); // black

  // draw the fractal
  push();
  noFill();
  translate(width / 2, (height / 2) + rad / 2); // the position of the biggest circle

  // draw the fractal (recursive)
  fractal(n, rad, c);

  pop();

  // draw UI elements
  textAlign(LEFT, TOP);
  fill(0, 0, 80);
  text("Recursion: " + n, 30, 30);
  btn1.display();
  btn2.display();
  btn3.display();

  textAlign(LEFT, TOP);
  fill(0, 0, 80);
  text("Color", 350, 30);
  sldr1.display();
  for (i = 0; i < 220; i++) {
    push();
    stroke(map(i, 0, 219, 90, 10), 100, 100);
    line(350 + i, 65, 350 + i, 75);
    pop();
  }

  // this is just a guide for positioning each element
  console.log(mouseX, " ", mouseY, " ", rad);

}

/****************************
    VISUAL DESIGN PART
****************************/
// draw a fractal
function fractal(i, r, h) {
  stroke(h, 100, map(i, 1, 8, 90, 10));

  ellipse(0, 0, r, r);

  if (i > 1) {
    push();
    translate(-(r / 2) - (r / 4), 0);
    rotate(-90);
    fractal(i - 1, r / 2, h);
    pop();

    push();
    translate(r / 2 + r / 4, 0);
    rotate(90);
    fractal(i - 1, r / 2, h);
    pop();

    push();
    translate(0, -(r / 2) - (r / 4));
    fractal(i - 1, r / 2, h);
    pop();
  }
}

/****************************
          UI PART
****************************/
// Button constructor
function Button(paraX, paraY, paraW, paraH, paraR, paraLabel) {

  // set variables
  this.x = paraX; // this button's x position
  this.y = paraY; // this button's y position
  this.w = paraW; // this button's width
  this.h = paraH; // this button's height
  this.r = paraR; // this button's round value
  this.label = paraLabel; // this button's label

  // calculate the position of the text label
  this.textX = this.x + (this.w / 2); // the label's x position (center-aligned)
  this.textY = this.y + (this.h / 2); // the label's y position (center-aligned)

  // set constant values (colors)
  this.btnColor = color(0, 0, 80); // this button's color
  this.labelColor = color(0, 0, 0); // the label's color
  this.rollOverBtnColor = color(15, 100, 100); // this button's color when the rollover event occurs
  this.rollOverTxtColor = color(0, 0, 100); // the lavel's color when the rollover envent occurs

  // draw this button
  // rollover effect is included
  this.display = function() {

    noStroke();

    // rollover::button
    if (mouseX >= this.x && mouseX <= (this.x + this.w) && mouseY >= this.y && mouseY <= (this.y + this.h))
      fill(this.rollOverBtnColor);
    // normal::button
    else
      fill(this.btnColor);

    rect(this.x, this.y, this.w, this.h, this.r);
    textAlign(CENTER, CENTER);

    // rollover::label
    if (mouseX >= this.x && mouseX <= (this.x + this.w) && mouseY >= this.y && mouseY <= (this.y + this.h))
      fill(this.rollOverTxtColor);
    // normal::label
    else
      fill(this.labelColor);

    text(this.label, this.textX, this.textY);
  }
}

// Slider constructor
function Slider(paraRailX, paraRailY, paraRailL, paraHandleW, paraHandleH, paraHandleR) {

  // set variables
  this.railX = paraRailX;
  this.railY = paraRailY;
  this.railL = paraRailL;
  this.handleW = paraHandleW;
  this.handleH = paraHandleH;
  this.handleR = paraHandleR;

  this.handleX = this.railX;
  this.handleY = this.railY;
  this.handleRightBoundary = this.railX + this.railL - this.handleW;

  // set constant values
  this.railColor = color(0, 0, 80);
  this.handleColor = color(0, 0, 50);

  // draw this slider
  // dragging is included
  this.display = function() {

    noStroke();
    fill(this.railColor);
    rect(this.railX, this.railY, this.railL, this.handleH, this.handleR);

    fill(this.handleColor);
    rect(this.handleX, this.handleY, this.handleW, this.handleH, this.handleR);

    if (dragging) {
      this.handleX += (mouseX - pmouseX);

      // limit the handle not to escape the rail
      this.handleX = constrain(this.handleX, this.railX, this.handleRightBoundary);
      c = floor(map(this.handleX, this.railX, this.handleRightBoundary, 90, 10));
    }

  } // end of display()
} // end of Slider constructor 


/****************************
    MOUSE EVENT HANDLING
****************************/

// When click the button '+' or '-'
function mouseClicked() {
  if (mouseX >= btn1.x && mouseX <= (btn1.x + btn1.w) && mouseY >= btn1.y && mouseY <= (btn1.y + btn1.h))
    if (n < 8) n++;
  if (mouseX >= btn2.x && mouseX <= (btn2.x + btn2.w) && mouseY >= btn2.y && mouseY <= (btn2.y + btn2.h))
    if (n > 1) n--;

  if (mouseX >= btn3.x && mouseX <= (btn3.x + btn3.w) && mouseY >= btn3.y && mouseY <= (btn3.y + btn3.h))
    if (opt > 1) n = round(random(1, 8));
  if (mouseX >= btn3.x && mouseX <= (btn3.x + btn3.w) && mouseY >= btn3.y && mouseY <= (btn3.y + btn3.h))
    if (opt > 1) rad = round(random(150, 200));
  if (mouseX >= btn3.x && mouseX <= (btn3.x + btn3.w) && mouseY >= btn3.y && mouseY <= (btn3.y + btn3.h))
    if (opt > 1) c = random(255);
}

// When press the slider handle
function mousePressed() {
  if (mouseX >= sldr1.handleX && mouseX <= (sldr1.handleX + sldr1.handleW) && mouseY >= sldr1.handleY && mouseY <= (sldr1.handleY + sldr1.handleH))
    dragging = true;
}

// when release the mouse
function mouseReleased() {
  dragging = false;
}//This program creates a static grid of ellipses where the stroke of the ellipses
//change based on the perceived motion of a moving 'ball'.  In actuality there is no 
//ellipse object that functions as a ball, but instead the stroke and alpha of the fill
//are changing based on the speed and direction of an invisible point indicated by
//the global variables below.

function setup() { 
  createCanvas(400, 400);
    background(0, 0, 0);
  
} 

function draw() { 

  strokeWeight(.1);
  let r=0;
  let g=0;
  //draw an ellipse at x, y with the size of 25, 25, at each x,y coordinate that is less
  //than the width and height of the screen at increments of 25
  for(let x=10; x<=width; x+=40){
    for(let y=10; y<=height; y+=40){
  //maps the x position from 0 to the width of the window, to the corresponding
  //min and max color values of 0 to 255
  r = map(x, 0, width, 0, 255);
  //maps the y position from 0 to the height of the window, to the corresponding
  //min and max color values of 0 to 255
  g = map(y, 0, height, 0, 255);
  b = map(mouseX, 0, width, 0, 255);
  //calculates the distance between the x,y coordinate of the ellipse and the 
  //xCoord/yCoord (that changes).  When the xCoord/yCoord are on top of a given
  //ellipse, the result is a black stroke.  Those ellipses calculated at a distance
  //further than 255 pixels away have a white stroke, and in between have a greyscale
  fill(r, g, b);
  stroke(255);
  rect(x, y, 25, 25);
  }
 }
}


let a = 0;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  push();
  translate(200, 200);
  rotate(a++);
  rect(0, 0, 50, 50);
  pop(0);
}function setup() { 
  createCanvas(400, 400);
   
} 

function draw() { 
  background(220);
   for( i = 0; i < 10; i++){
     rect(i*width/10, 0, width/10, height);
    console.log(i);
  }

}let r1 = false;
let r2 = false; 
let r3 = false;

let isOn = false;

function setup() { 
  createCanvas(400, 400);
background(220);
} 

function draw() { 
  
  fill(255, 0, 0);
  
  if(mouseX < width/3){
    r1 = !r1;
  } else if(mouseX < 2*width/3){
    r2=!r2;
  } else {
    r3=!r3;
  }
  
  if(r1){
    rect(0, 0, width/3, height);
  }
  if(r2){
    rect(width/3, 0, width/3, height);
  }
  if(r3){
    rect(2*width/3, 0, width/3, height);
  }
}//This program creates a static grid of ellipses where the stroke of the ellipses
//change based on the perceived motion of a moving 'ball'.  In actuality there is no 
//ellipse object that functions as a ball, but instead the stroke and alpha of the fill
//are changing based on the speed and direction of an invisible point indicated by
//the global variables below.

let xCoord;
let yCoord;
let speedX;
let speedY;

function setup() { 
  createCanvas(600, 400);
    background(0, 0, 0);
  //starting point of the invisible point.  This is a random starting point every time
  //the sketch is run
  xCoord = random(width);
  yCoord = random(height);
  //the amount the point will advance in directions x and y
  speedX = random(.0001,.01);
  speedY = random(.0001,.01);
  
} 

function draw() { 

  strokeWeight(2);
  let r=0;
  let g=0;
  //draw an ellipse at x, y with the size of 25, 25, at each x,y coordinate that is less
  //than the width and height of the screen at increments of 25
  for(let x=0; x<=width; x=x+25){
    for(let y=0; y<=height; y=y+25){
  //maps the x position from 0 to the width of the window, to the corresponding
  //min and max color values of 0 to 255
  r = map(x, 0, width, 0, 255);
  //maps the y position from 0 to the height of the window, to the corresponding
  //min and max color values of 0 to 255
  g = map(y, 0, height, 0, 255);
  b = map(mouseX, 0, width, 0, 255);
  //calculates the distance between the x,y coordinate of the ellipse and the 
  //xCoord/yCoord (that changes).  When the xCoord/yCoord are on top of a given
  //ellipse, the result is a black stroke.  Those ellipses calculated at a distance
  //further than 255 pixels away have a white stroke, and in between have a greyscale
  c = dist(x, y, xCoord, yCoord);
  fill(r, g, b, c);
  stroke(c);
  ellipse(x, y, 25, 25);
      xCoord = xCoord + speedX;
      yCoord = yCoord + speedY;
      if((xCoord < 0) || (xCoord > width)){
        speedX = -speedX;
      }
      if((yCoord < 0) || (yCoord > height)){
        speedY = -speedY;
      }
  }
 }
}


//This program creates a static grid of ellipses where the stroke of the ellipses
//change based on the perceived motion of a moving 'ball'.  In actuality there is no 
//ellipse object that functions as a ball, but instead the stroke and alpha of the fill
//are changing based on the speed and direction of an invisible point indicated by
//the global variables below.  The button changes the colorMode from RGB to HSB.  
//mouseX position is mapped to blue values in RGB mode and brightness in HSB.

//vars for bouncing ball
let xCoord;
let yCoord;
let speedX;
let speedY;

//var for ellipse
let rad;

//var for button1
let on = true;

function setup() {
  createCanvas(600, 600);
  background(0);
  //starting point of the invisible point.  This is a random starting point every time
  //the sketch is run
  xCoord = random(width);
  yCoord = random(height);
  //the amount the point will advance in directions x and y
  speedX = 0.005;
  speedY = 0.005;
  rad = 25;

}

function draw() {
  console.log(speedX, " ", speedY);
  fill(255, 0, 0);
  stroke(255);
  //button
  rect(25, 25, 50, 50);

  //defines the sketch as either being in HSB or RGB mode
  if (on) {
    colorMode(HSB);
  } else {
    colorMode(RGB);
  }
  strokeWeight(2);
  //sets rgb values
  let r = 0;
  let g = 0;
  let b = 0;
  //draw an ellipse at x, y with the size of rad, rad, at each x,y coordinate that is less
  //than the width and height of the screen at increments of 25

  for (let x = 0; x <= width; x = x + 25) {
    for (let y = 100; y <= height; y = y + 25) {

      //maps the x position from 0 to the width of the window, to the corresponding
      //min and max color values of 0 to 255
      r = map(x, 0, width, 0, 255);
      //maps the y position from 0 to the height of the window, to the corresponding
      //min and max color values of 0 to 255
      g = map(y, 0, height, 0, 255);
      b = map(mouseX, 0, width, 0, 128);
      //calculates the distance between the x,y coordinate of the ellipse and the 
      //xCoord/yCoord (that changes).  When the xCoord/yCoord are on top of a given
      //ellipse, the result is a black stroke.  Those ellipses calculated at a distance
      //further than 255 pixels away have a white stroke, and in between have a 
      //greyscale
      c = dist(x, y, xCoord, yCoord);
      push();
      fill(r, g, b, c);
      stroke(c);
      rect(x, y, rad, rad);
      stroke(c, c);
      ellipse(x+rad/2, y+rad/2, rad, rad);
      pop();
      
      xCoord = xCoord + speedX;
      yCoord = yCoord + speedY;
      if ((xCoord < 0) || (xCoord > width)) {
        speedX = -speedX;
      }
      if ((yCoord < 100) || (yCoord >= height)) {
        speedY = -speedY;
      }

      if (on) {
        fill(0, 255, 0);
      } else {
        fill(255, 0, 0);
      }
    }
  }
}

function mousePressed() {
  if (mouseX > 25 && mouseX < 75 && mouseY > 25 && mouseY < 75) {
    on = !on;
  }
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  noFill();
  //rollover - only fill the rect if the mouse is inside of the rect
  if(mouseX>200 && mouseX<300 && mouseY > 200 && mouseY<300){
  fill(255, 0, 0);
}
  //draw the rectangle, always
   rect(200, 200, 100, 100);
}let x;
let y;
let diam = 50;
let randCol = 255;
let speed = 3;

function setup() { 
  createCanvas(600, 600);
  x = random(width);
  y = random(height);
  background(0);
} 
function draw() { 
  
  fill(random(220, randCol), random(40,randCol), 0);
  ellipse(x, y, diam, diam);
//if x is greater than the width, then turn around and increase y by 50
  if(x > width){
  speed=-3;
  y=y+random(50);
}
  if(x < 0){
  speed=3;
  y=y-random(50);
}
  if(y > height){
  speed=-3;
  x=x+random(50);
}
  if(y < 0){
  speed=3;
  x=x+random(50);
}
  if(x>300){
  background(0, 150, 150, 30);
  }
   if(x<300){
  background(150, 0, 0, 30);
  }
  x=x+speed;
  y=y+speed;
}
  
function setup() { 
  createCanvas(400, 400);
  rectMode(CENTER);
} 

function draw() { 
  background(220);
  rect(width/2, height/2, width/2, height/2);
}var x = 0;
var y = 25;
var diam = 50;
//var col = map(mouseX, 0, 400, 0, 255);

function setup() { 
  createCanvas(400, 400);
  background(0);
} 

function draw() { 
  ellipse(x, y, diam, diam);
  if(x < width+diam+1) {
    x= x+5;
  } 
  
  if(x > width+diam){
    x=0;
    y=y+50;
  }
  
  if(y > height+diam+1){
    y=diam/2;
  }
  
}var x = 20; 

function setup() { 
  createCanvas(400, 400);
  //ellipseMode is by default CENTER (position points)
  ellipseMode(CENTER);
  frameRate(8);
} 

function draw() { 
  stroke(0);
  strokeWeight(1.5);
  background(0, 255, 0);
  //head
  fill(0, 129, 255);
  //rect format (xPoint of left corner, yPoint or left corner, width, height)
  rect(100, 200, 200, 100);
  //body
  rect(175, 300, 50, 50);
  //pupils
  fill(0, 0, 0);
  ellipse(150, 250, random(15, 20), random(15, 20))
  ellipse(250, 250, random(15, 20), random(15, 20))
  //glasses
  noFill();
  rect(225, 225, 50, 50);
  rect(125, 225, 50, 50);
  //line format (xPoint of beginning, yPoint of beginning, xPoint of end, yPoint of end)
  line(175, 250, 225, 250);
  line(125, 225, 100, 200);
  line(275, 225, 300, 200);
  //antennas
  fill(0, 0, 0);
  line(250, 200, 250, 100);
  line(150, 200, 150, 100);
  //ellipse format (xPoint of center, yPoint of center, width, height)
  ellipse(150, 90, x, x);
  ellipse(250, 90, x, x);
  //teeth
  fill(255);
  rect(180, 285, 10, random(10, 40));
  rect(210, 285, 10, random(10, 40));
  //arms
  line(175, 310, 150, 340);
  line(225, 310, 250, 340);
  //legs
  line(190, 350, 175, 370)
  line(210, 350, 195, 370)
  //mouth
  stroke(255, 0, 0);
  line(120, 285, 280, 285);
  //Sun
  fill(255, 255, 0);
  noStroke();
  //arc params (xStart, yStart, width, height, angleStart, angleStop);
  arc(0, 0, 100, 100, 0, HALF_PI);
 
  if(x<60){
    x++;
  }
  if(x>59){
    x=0;
  }
  
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  fill(100, 0, 0);
  rect(225, 225, 50, 50);
  rect(125, 225, 50, 50);
  fill(100, 200, 200, 20);
  rect(200, 200, 100, 100);
  rect(100, 200, 100, 100);
  line(width/2, height/2m
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  fill(100, 0, 0);
  rect(225, 225, 50, 50);
  rect(125, 225, 50, 50);
  fill(100, 200, 200, 20);
  rect(200, 200, random(95,100_, 100);
  rect(100, 200, 100, 100);
  line(width/2, height/2);
  fill(255);
  fill(45, random(45), 145, 45);
  arc(random(width), random(height), 25, 25, HALF_PI, HALF_PI);
  //arc(mouseX, mouseY, mouseX, mouseY, HALF_PI, HALF_PI);
  
}
function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(0, 255, 255);
  fill(255, 0, 0);
  strokeWeight(30);
  stroke(255, 0, 0);
  line(0, 0, width, height);
  strokeWeight();
  fill(0, 200, 50);
  ellipse(width/2, height/2, 250, 200); 
  fill(0, 0, 255);
  rect(280, 150, 45, 45);
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  fill(0, 255, 255);
  ellipse(200,200, 255, 255);
}