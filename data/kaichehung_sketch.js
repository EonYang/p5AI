// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let movers = [];


function setup() {
  createCanvas(560, 360);
  

}

function draw() {
  background(51);

  for (let i = 0; i < movers.length; i++) {
    let wind = createVector(0.01, 0);
    let gravity = createVector(0, 0.1 * movers[i].mass);
    movers[i].applyForce(wind);
    movers[i].applyForce(gravity);
    movers[i].update();
    movers[i].setOsc();
    movers[i].display();
    movers[i].checkEdges();
  }
}


function mouseClicked() {
	movers.push(new Mover(random(1, 4), mouseX, mouseY))
}let outputP;

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
  "origin":"Abby's #subject# lesson #action# her, #things# is made of #material# and #material# in between of them.",
  //"origin": "#interjection.capitalize#, #name#! I'm #profession.a#, not #profession.a#!",
  
  "subject": ["physics", "math", "geography", "history", "algebra", "chemistry", "politics", "literature", "Chinese", "Spanish", "astronomy", "programming" ],
  
  "action": ["teach", "tell", "demonstrate", "show", "convince", "confuse" ],
  
  "things": ["molecular", "anger", "water", "vitamin", "space", "time", "apple", "gold", "rock", "tree", "ecosystem", "couch", "poetry", "anger", "tears", "animals", "building", "human society","moral", "responsibility", "honor", "curry", "basketball game"],
  
  "material":["me", "kids", "pets", "love", "grief", "memories", "loneliness", "patient", "eager"]
};


var table;
var emotionLabel = [], imageData = [], dataUse = [];
var capture, button;
var snapshots = [];

function preload(){
	//table = loadTable('testData.csv', 'csv','header');
}

function setup() {
  
  capture = createCapture(VIDEO);
  capture.size(320,240);
  
  createCanvas(320,240);
  button = createButton('smile');
  button.mousePressed(takesnap);
  // var rowCount = table.getRowCount();
  // for(i=0; i< rowCount;i++){
  //   emotionLabel.push(table.get(i,0));
  //   imageData.push(table.get(i,1));
  //   dataUse.push(table.get(i,2));
  // }
  
}

function takesnap(){
	snapshots.push(capture.get());
}

function draw() {
  image(snapshots[0],0);
  // background(220);
  // for(i=0; i< 48;i++){
  //   for(j=0; j< 48;j++){
  //     colorData = pixelData[48*i+j];
  //     fill(int(colorData));
  //     noStroke();
  // ellipse(j,i,1);
  //   }
  // }
}
// Daniel Shiffman
// http://codingtra.in

// Color Predictor
// https://youtu.be/KtPpoMThKUs

// Inspired by Jabril's SEFD Science
// https://youtu.be/KO7W0Qq8yUE
// https://youtu.be/iN3WAko2rL8

let r, g, b;
let brain;

let which = "black";

let wButton;
let bButton;

function pickColor() {
  r = random(255);
  g = random(255);
  b = random(255);
  redraw();
}

function setup() {
  createCanvas(600, 300);
  noLoop();
  brain = new NeuralNetwork(3, 3, 2);

  for (let i = 0; i < 10000; i++) {
    let r = random(255);
    let g = random(255);
    let b = random(255);
    let targets = trainColor(r, g, b);
    let inputs = [r / 255, g / 255, b / 255];
    brain.train(inputs, targets);
  }

  pickColor();

}

function mousePressed() {
  let targets;
  if (mouseX > width / 2) {
    targets = [0, 1];
  } else {
    targets = [1, 0];
  }
  let inputs = [r / 255, g / 255, b / 255];
  
  brain.train(inputs, targets);


  pickColor();
}


function colorPredictor(r, g, b) {
  // console.log(floor(r + g + b));
  let inputs = [r / 255, g / 255, b / 255];
  let outputs = brain.predict(inputs);
  //console.log(outputs);

  if (outputs[0] > outputs[1]) {
    return "black";
  } else {
    return "white";
  }

  // if (r + g + b > 300) {
  //   return "black";
  // } else {
  //   return "white";
  // }
}

function trainColor(r, g, b) {
  if (r + g + b > (255 * 3) / 2) {
    return [1, 0];
  } else {
    return [0, 1];
  }
}


function draw() {
  background(r, g, b);
  strokeWeight(4);
  stroke(0);
  line(width / 2, 0, width / 2, height);

  textSize(64);
  noStroke();
  fill(0);
  textAlign(CENTER, CENTER);
  text("black", 150, 100);
  fill(255);
  text("white", 450, 100);

  let which = colorPredictor(r, g, b);
  if (which === "black") {
    fill(0);
    ellipse(150, 200, 60);
  } else {
    fill(255);
    ellipse(450, 200, 60);
  }


}// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Smart Rockets w/ Genetic Algorithms

// Each Rocket's DNA is an array of PVectors
// Each PVector acts as a force for each frame of animation
// Imagine an booster on the end of the rocket that can polet in any direction
// and fire at any strength every frame

// The Rocket's fitness is a function of how close it gets to the target as well as how fast it gets there

// This example is inspired by Jer Thorp's Smart Rockets
// http://www.blprnt.com/smartrockets/

let lifetime; // How long should each generation live

let population; // Population

let lifecycle; // Timer for cycle of generation
let recordtime; // Fastest time to target

let target; // Target position

//let diam = 24;          // Size of target

let obstacles = []; //an array list to keep track of all the obstacles!

let img;
function preload() {
  img = loadImage('bald.jpg');
}

function setup() {
  //background(127);
  createCanvas(640, 640);
  
  // The number of cycles we will allow a generation to live
  lifetime = 400;

  // Initialize variables
  lifecycle = 0;
  recordtime = lifetime;

  target = new Obstacle(width / 2 - 12, 24, 1, 1);

  // Create a population with a mutation rate, and population max
  let mutationRate = 0.05;
  population = new Population(mutationRate, 50);

  // Create the obstacle course
  obstacles = [];
  //obstacles.push(new Obstacle(width / 2 - 100, height / 2, 200, 10));
	
  push();
  translate(320,320);
  imageMode(CENTER);
  image(img, 0, 120, 476, 357);
	pop();
}

function draw() {
  
  // Draw the start and target positions
  target.display();


  // If the generation hasn't ended yet
  if (lifecycle < lifetime) {
    population.live(obstacles);
    if ((population.targetReached()) && (lifecycle < recordtime)) {
      recordtime = lifecycle;
    }
    lifecycle++;
    // Otherwise a new generation
  } else {
    lifecycle = 0;
    population.calcFitness();
    population.selection();
    population.reproduction();
  }

  // Draw the obstacles
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].display();
  }

  // Display some info
  // fill(0);
  // noStroke();
  // text("Generation #: " + population.getGenerations(), 10, 18);
  // text("Cycles left: " + (lifetime - lifecycle), 10, 36);
  // text("Record cycles: " + recordtime, 10, 54);
  

  target.position.x = mouseX;
  target.position.y = mouseY;
  

}

// Move the target if the mouse is pressed
// System will adapt to new target
// function mousePressed() {
//   target.position.x = mouseX;
//   target.position.y = mouseY;
//   recordtime = lifetime;
// }// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Genetic Algorithm, Evolving Shakespeare

// Demonstration of using a genetic algorithm to perform a search

// setup()
//  # Step 1: The Population
//    # Create an empty population (an array or ArrayList)
//    # Fill it with DNA encoded objects (pick random values to start)

// draw()
//  # Step 1: Selection
//    # Create an empty mating pool (an empty ArrayList)
//    # For every member of the population, evaluate its fitness based on some criteria / function,
//      and add it to the mating pool in a manner consistant with its fitness, i.e. the more fit it
//      is the more times it appears in the mating pool, in order to be more likely picked for reproduction.

//  # Step 2: Reproduction Create a new empty population
//    # Fill the new population by executing the following steps:
//       1. Pick two "parent" objects from the mating pool.
//       2. Crossover -- create a "child" object by mating these two parents.
//       3. Mutation -- mutate the child's DNA based on a given probability.
//       4. Add the child object to the new population.
//    # Replace the old population with the new population
//
//   # Rinse and repeat


let target;
let popmax;
let mutationRate;
let population;

let bestPhrase;
let allPhrases;
let stats;

function setup() {
  bestPhrase = createP("Best phrase:");
  //bestPhrase.position(10,10);
  bestPhrase.class("best");

  allPhrases = createP("All phrases:");
  allPhrases.position(600, 10);
  allPhrases.class("all");

  stats = createP("Stats");
  //stats.position(10,200);
  stats.class("stats");

  //createCanvas(640, 360);
  target = "To be or not to be.";
  popmax = 200;
  mutationRate = 0.01;

  // Create a population with a target phrase, mutation rate, and population max
  population = new Population(target, mutationRate, popmax);
}

function draw() {
  // Generate mating pool
  population.naturalSelection();
  //Create next generation
  population.generate();
  // Calculate fitness
  population.calcFitness();

  population.evaluate();

  // If we found the target phrase, stop
  if (population.isFinished()) {
    //println(millis()/1000.0);
    noLoop();
  }

  displayInfo();
}

function displayInfo() {
  // Display current status of population
  let answer = population.getBest();

  bestPhrase.html("Best phrase:<br>" + answer);

  let statstext = "total generations:     " + population.getGenerations() + "<br>";
  statstext += "average fitness:       " + nf(population.getAverageFitness()) + "<br>";
  statstext += "total population:      " + popmax + "<br>";
  statstext += "mutation rate:         " + floor(mutationRate * 100) + "%";

  stats.html(statstext);

  allPhrases.html("All phrases:<br>" + population.allPhrases())
}var div = Element.getElementsByClassName('buttonWrapper');
var bodyTag;

function bgTurnYellow(){
  bodyTag = document.getElementByTagName("body tag");
  bodyTag.setAttribute('backgroung-color','yellow');
}
var img = [];
function preload() {
  for (i = 0; i < 24; i ++){
    img[i] = loadImage('mask/LAYERS_' + i + '.jpg');
  }
}

var canvasWidth = 1242;
var canvasHeight = 1242;
var explosionCenter;
var spheres = [];
function setup() { 
  createCanvas(canvasWidth, canvasHeight, WEBGL);
  //Explosion ref point
  explosionCenter = new Sphere(0, 0, 0, 10);

  //Load head layer as dot
  loadLayer();
} 

function draw() { 
  background(51); 
  
  translate(0, 0, -400);
  dragToRotate();
  //rotateY(angle);
  //rotateY(millis() / 1000);
  explosionCenter.show();
  
  spheres.forEach(function(e) {
    e.update();
    e.constraint();
    e.show();
  });
}

//explosion and recovery
var toggle = false;
function keyPressed() {
  if (toggle === false) {
    spheres.forEach(function(e) {
      e.explosion();
      //e.wind();
      toggle = true;
    });
  } else {
    spheres.forEach(function(e) {
      e.goBack();
      toggle = false;
    });
  }
  console.log(toggle);
}

//mouse drag to rotate
// var angle = 0;
// function mouseDragged() {
//   angle = angle +0.1;
// }

var angleX = 0; 
var angleY = 0;
var currentPosX, currentPosY;
var initPosX, initPosY;
function dragToRotate(){
  if (!mouseIsPressed) {
    initPosX = mouseX;
    initPosY = mouseY;
  }else{
    currentPosX = mouseX;
    currentPosY = mouseY;
    angleX = (currentPosX - initPosX)/100;
    angleY = (currentPosY - initPosY)/100;
    rotateY(angleX);
    rotateX(angleY);
  }
  
  console.log(currentPosX);
}


function loadLayer(){
  for (i = 0; i < 24; i ++){
    img[i].loadPixels();
    for (var y = 0; y <= 620; y += 4){
      for (var x = 0; x <= 620; x += 4){
        var index = (x + y * img[i].width) * 4;                        
        if (img[i].pixels[index] > 100 && img[i].pixels[index+1] == 0 && img[i].pixels[index+2] == 0){
            //WHY THIS WORKS???
            var xPos = x-(canvasWidth/4);
            var yPos = y-(canvasHeight/4);
            spheres.push(new Sphere(xPos, yPos, (12-i)*15, 1));
        }
      }
    }
  }  
}
var img = [];
function preload() {
  for (i = 0; i < 24; i ++){
    img[i] = loadImage('mask/LAYERS_' + i + '.jpg');
  }
}

var canvasWidth = 1242;
var canvasHeight = 1242;
var explosionCenter;
var spheres = [];
function setup() { 
  createCanvas(canvasWidth, canvasHeight, WEBGL);
  //Explosion ref point
  explosionCenter = new Sphere(0, 0, 0, 10);

  //Load head layer as dot
  loadLayer();
} 

function draw() { 
  background(51); 
  
  translate(0, 0, -400);
  dragToRotate();
  //rotateY(angle);
  //rotateY(millis() / 1000);
  explosionCenter.show();
  
  spheres.forEach(function(e) {
    e.update();
    e.constraint();
    e.show();
  });
}

//explosion and recovery
var toggle = false;
function keyPressed() {
  if (toggle === false) {
    spheres.forEach(function(e) {
      e.explosion();
      //e.wind();
      toggle = true;
    });
  } else {
    spheres.forEach(function(e) {
      e.goBack();
      toggle = false;
    });
  }
  console.log(toggle);
}

//mouse drag to rotate
// var angle = 0;
// function mouseDragged() {
//   angle = angle +0.1;
// }

var angleX = 0; 
var angleY = 0;
var currentPosX, currentPosY;
var initPosX, initPosY;
function dragToRotate(){
  if (!mouseIsPressed) {
    initPosX = mouseX;
    initPosY = mouseY;
  }else{
    currentPosX = mouseX;
    currentPosY = mouseY;
    angleX = (currentPosX - initPosX)/100;
    angleY = (currentPosY - initPosY)/100;
    rotateY(angleX);
    rotateX(angleY);
  }
  
  console.log(currentPosX);
}


function loadLayer(){
  for (i = 0; i < 24; i ++){
    img[i].loadPixels();
    for (var y = 0; y <= 620; y += 4){
      for (var x = 0; x <= 620; x += 4){
        var index = (x + y * img[i].width) * 4;                        
        if (img[i].pixels[index] > 100 && img[i].pixels[index+1] == 0 && img[i].pixels[index+2] == 0){
            //WHY THIS WORKS???
            var xPos = x-(canvasWidth/4);
            var yPos = y-(canvasHeight/4);
            spheres.push(new Sphere(xPos, yPos, (12-i)*15, 1));
        }
      }
    }
  }  
}
let groups = [];
let flag = false;


function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  let ring = [
      {
          pos: createVector(-1100,0,0),
          color: color(62, 118, 236)
      },
      {
          pos: createVector(0,0,0),
          color: color(0, 0, 0)
      },
      {
          pos: createVector(1100,0,0),
          color: color(255, 0, 0)
      },
      {
          pos: createVector(-550,550,0),
          color: color(255, 206, 1)
      },
      {
          pos: createVector(550,550,0),
          color: color(23, 154, 19)
      }
  ]

  for(let j = 0; j < 5; j ++){
      for(let i = 0; i < 12; i++){
        groups.push(new EleGroup(ring[j].pos.x + 500*sin(TWO_PI*i/12), ring[j].pos.y + 500*cos(TWO_PI*i/12), 0, 10, ring[j].color));

      }
  }

}

function draw() {
    background(100);
    translate(0, 0, -2000);
    for(let group of groups){
        group.show();
        group.update();
    }
}

function keyPressed(){
    if(key == " "){
        flag = !flag;
        for(let group of groups){
            if(flag == true){
                group.shatter();
            }
            else{
                group.resume();
                //group.sphereTrans();
            }
        }
    }
}
var img;
function preload() {
  img = loadImage('mask/LAYERS_0009_10.jpg');
}

function setup() {
  createCanvas(700, 700);
	background(200,0,0);
}

var img;

function draw() {

  //image(img,0,0);
  img.loadPixels();
  for (var y = 0; y <= img.height; y ++){
    for (var x = 0; x <= img.width; x ++){
      var index = (x + y * img.width) * 4;
      var r = img.pixels[index];
      if (img.pixels[index] > 100){
        fill(200);
        ellipse(x,y,5);
      }
    }
  }
}let test, value;
let pickers;
let colorSlider,strokeSlider,opacitySlider;

function setup() {
  createCanvas(400, 400);
	pickers = document.createElement("div");
  document.body.appendChild(pickers);
  colorPicker();
  strokePicker();
  opacityPicker();
  
  
}

function draw() {
  background(colorSlider.value,0,0);
  //test = document.getElementById('test');
  //value= test.getAttribute('value');
  //console.log(value);
  console.log(colorSlider.value);
}


function colorPicker(){
  colorSlider = document.createElement("input");
  lineBreak = document.createElement("br");
  colorSlider.setAttribute('type','range');
  colorSlider.setAttribute('min','0');
  colorSlider.setAttribute('max','225');
  colorSlider.setAttribute('value','100');
  colorSlider.setAttribute('step','1');    
  pickers.appendChild(colorSlider);
  pickers.appendChild(lineBreak);
  stroke(colorSlider.value);

}

function strokePicker(){
	strokeSlider = document.createElement("input");
  lineBreak = document.createElement("br");
  strokeSlider.setAttribute('type','range');
  strokeSlider.setAttribute('min','0');
  strokeSlider.setAttribute('max','225');
  strokeSlider.setAttribute('value','150');
  strokeSlider.setAttribute('step','1');    
  pickers.appendChild(strokeSlider);
  pickers.appendChild(lineBreak);
  strokeWeight(strokeSlider.value)
 
}


function opacityPicker(){
	opacitySlider = document.createElement("input");
  lineBreak = document.createElement("br");
  opacitySlider.setAttribute('type','range');
  opacitySlider.setAttribute('min','0');
  opacitySlider.setAttribute('max','225');
  opacitySlider.setAttribute('value','100');
  opacitySlider.setAttribute('step','1');    
  pickers.appendChild(opacitySlider);
  pickers.appendChild(lineBreak);
  alpha(opacitySlider.value);
}


// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com
const Engine = Matter.Engine;
const Bodies = Matter.Bodies;
const World = Matter.World;

let mover;

let attractor;

function setup() {
  createCanvas(640, 360);
  
  var boxA = Bodies.rectangle(400,200,80,80);
  
  mover = new Mover();
  attractor = new Attractor();
  engine = Engine.create();
}

function draw() {
  background(51);
  
	Engine.run(engine);
  
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
}var mic,note,pitch;

function setup() { 
  createCanvas(400, 400);
  
  // Create and start an Audio input
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
	//use live input
  toggleLiveInput()
} 

function draw() { 
  background(220);
  colorPicker(30,0);
  pitchDetect();
  //console.log(pitch.innerHTML);
  console.log(note.innerHTML);
}

function pitchDetect(){
  //noteElem.innerHTML = noteStrings[note%12]
  note = document.getElementById( "note" );
  
	switch (note.innerHTML) {
  case 'C':
    stroke(255,0,0);
  	break;
      
  case 'C#':
    stroke(255, 64, 0);
    break;
      
  case 'D':
    stroke(255, 191, 0);  
    break;
      
  case 'D#':
    stroke(255, 255, 0);  
    break;
      
  case 'E':
    stroke(128, 255, 0);  
    break;
      
  case 'F':
    stroke(0, 255, 0);  
    break;
      
  case 'F#':
    stroke(0, 191, 255);  
    break;
      
  case 'G':
    stroke(0, 0, 255);  
    break;
      
  case 'G#':
    stroke(64, 0, 255);  
    break;
      
  case 'A':
    stroke(191, 0, 255);  
    break;
  	
  case 'A#':
    stroke(255);  
    break;
    
  case 'B':
    stroke(0);  
    break;
  }
}


function colorPicker(x,y){
  //let spectrum = fft.analyze();
      
  //Get volume
  vol = mic.getLevel();
  //console.log(vol);
	//Draw an ellipse with height based on volume  
  let volH = map(vol, 0, 1, 230, 10);
  noStroke(0);
  fill(255,0,0);
  ellipse(x-10, volH, 10);
	
  //Get pitch
  pitch = document.getElementById( "pitch" );
  if(pitch.innerHTML == '--'){
	  fill(0,0,255);
  	ellipse(x+60, 230, 10);
  }else{
    //Draw an ellipse with height based on pitch
    let constrainedPitch = constrain(pitch.innerHTML, 65, 493);
  	var pitchH = map(constrainedPitch, 65, 493, 230, 10);
  	fill(0,0,255);
  	ellipse(x+60, pitchH, 10);
  }
  //draw Color Platte
	showColorPlatte(x,y);
}

//draw Color Platte
showColorPlatte = function(x,y){
  noStroke();
	fill(255,0,0);
  rect(x,y,50,20);
  
  fill(255, 64, 0);
  rect(x,y+20,50,19);
  
  fill(255, 191, 0);
  rect(x,y+40,50,17);
  
  fill(255, 255, 0);
  rect(x,y+60,50,15);
  
  fill(128, 255, 0);
  rect(x,y+80,50,13);
  
  fill(0, 255, 0);
  rect(x,y+100,50,11);
  
  fill(0, 191, 255);
  rect(x,y+120,50,9);
  
  fill(0, 0, 255);
  rect(x,y+140,50,7); 
  
  fill(64, 0, 255);
  rect(x,y+160,50,5); 
  
  fill(191, 0, 255);
  rect(x,y+180,50,5); 

  fill(255);
  rect(x,y+200,50,5); 

  fill(0);
  rect(x,y+220,50,5); 
}// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Bobs
let b1;
let b2;
let b3;

let s1;
let s2;
let s3;

function setup() {
  createCanvas(640, 360);
  // Create objects at starting position
  // Note third argument in Spring constructor is "rest length"
  b1 = new Bob(width / 2, 100);
  b2 = new Bob(width / 2, 200);
  b3 = new Bob(width / 2, 300);

  s1 = new Spring(b1, b2, 100);
  s2 = new Spring(b2, b3, 100);
  s3 = new Spring(b1, b3, 100);
}

function draw() {
  background(200);

  s1.update();
  s2.update();
  s3.update();

  s1.display();
  s2.display();
  s3.display();

  b1.update();
  b1.display();
  b2.update();
  b2.display();
  b3.update();
  b3.display();

  b1.handleDrag(mouseX, mouseY);
}



function mousePressed() {
  b1.handleClick(mouseX, mouseY);
}

function mouseReleased() {
  b1.stopDragging();
}// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Mover object
let bobs = []
let springs = [];

function setup() {
  createCanvas(640, 360);
  // Create objects at starting position
  // Note third argument in Spring constructor is "rest length"
  for (let i = 0; i < 5; i++) {
    bobs[i] = new Bob(width/2, i*40);
  }
  for (let i = 0; i < 4; i++) {
    springs[i] = new Spring(bobs[i], bobs[i+1],40);
  }
}

function draw() {
  background(200); 

  for (let s of springs) {
    s.update();
    s.display();
  }

  for (let b of bobs) {
    b.update();
    b.display();
    b.handleDrag(mouseX, mouseY);
  }
}



function mousePressed() {
  for (let b of bobs) {
    b.handleClick(mouseX, mouseY);
  }
}

function mouseReleased() {
  for (let b of bobs) {
    b.stopDragging();
  }
}

var regretTimes = 0;
var regretLevel = 18;

function setup() {
	createCanvas(600,600);
  
}

function draw() {
  clear();
	textSize(regretLevel);
  fill(225, 0, 0);
	text('You already regret '+regretTimes+' times' , 0, 30);
	
}


function keyPressed() {
  if(keyCode === TAB){
  	regretTimes+=1;
    regretLevel+=1;
  	console.log(regretTimes);
  }  
}let walker = [];


function setup() {
  createCanvas(500, 500);
  background(50);
  walker [0]= new Walker(200,200);
//  newWalker();
  
}

function draw() {
  for( var i = 0; i<walker.length; i++){
  walker[i].step();
  walker[i].render();
  }
}

// function newWalker(){
//   setInterval(walkerGenerator,3000)
//   function walkerGenerator(){
//     walker.push = new Walker(walker[0].x,walker[0].y);
//   }
// }


//walker class
class Walker {
  constructor(x,y) {
    this.x =x;
    this.y =y;
    this.pos = createVector(this.x,this.y);
    this.prev = this.pos.copy();
  }

  render() {
    stroke(255);
    strokeWeight(2);
    var constrainX=constrain(this.pos.x, 0, 500);
    var constrainY=constrain(this.pos.y, 0, 500);
    //console.log(this.pos.x);
		//console.log(this.pos.y);
    console.log(constrainX);
		console.log(constrainY);
    
    line(constrainX, constrainY, this.prev.x, this.prev.y);
    stroke(100,100,100,255);
    strokeWeight(1);
    line(250,250,constrainX,constrainY)
    this.prev.set(this.pos);
  }


  step() {
    this.steps = p5.Vector.random2D();
    this.steps.mult(random(-2, 10));    
    this.pos.add(this.steps);
  }
}var head, body, leftWing, rightWing, wingWidth;
var flap, wingWidthL, wingWidthR;
var direction, turnAngle;
var flapSound;

function preload() {
    body = loadImage('bird2-body.png');
    leftWing = loadImage('bird2-wing-L.png');
    rightWing = loadImage('bird2-wing-R.png');
	  soundFormats('wav');
    mySound = loadSound('flapsound.wav');
  
}

function setup() {
    createCanvas(1500, 1500);
    flap = 0
    direction = true;
    test = 0;
    mySound.setVolume(0.1);
  	mySound.loop();

}

function draw() {
    background(220);
    drawBird(500, 500, turnAngle);
    turnAngle = 0;
    test = test + 1
}


function drawBird(x, y, d) {
    var birdPosition = [x, y];
    wingWidthL = sin(flap) * 125 + 75;
    wingWidthR = sin(-flap) * 125 + 75;
    flap = flap + 5.6;

    angleMode(DEGREES);
    rotate(d);

    imageMode(CENTER);
    image(body, birdPosition[0], birdPosition[1], 250, 250);
    image(head, birdPosition[0], birdPosition[1] - 140, 250, 250);
		

    var leftWingP2X = birdPosition[0] - 10;
    var leftWingP2Y = birdPosition[1] + 65;
    var leftWingP1X = leftWingP2X - 250 + wingWidthL;
    var leftWingP1Y = leftWingP2Y - 250;

    var rightWingP1X = birdPosition[0] + 10;
    var rightWingP1Y = birdPosition[1] - 185;
    var rightWingP2X = rightWingP1X + 250 + wingWidthR - 145;
    var rightWingP2Y = rightWingP1Y + 250;

    imageMode(CORNERS);
    image(leftWing, leftWingP1X, leftWingP1Y, leftWingP2X, leftWingP2Y);
  	image(rightWing, rightWingP1X, rightWingP1Y, rightWingP2X, rightWingP2Y);

}

function preload() {
  soundFormats('wav');
  mySound = loadSound('flapsound.wav');
}

function setup() {
  mySound.setVolume(0.2);
  mySound.loop();
  
}

function draw(){
	

}var head, body, leftWing, rightWing, wingWidth;
var flap, wingWidthL, wingWidthR;
var direction, turnAngle;
var flapSound;

function preload() {
    head = loadImage('bird-head.png');
    body = loadImage('bird-body.png');
    leftWing = loadImage('bird-left-wing.png');
    rightWing = loadImage('bird-right-wing.png');
	  soundFormats('wav');
    mySound = loadSound('flapsound.wav');
  
}

function setup() {
    createCanvas(1500, 1500);
    flap = 0
    direction = true;
    test = 0;
    mySound.setVolume(0.1);
  	mySound.loop();

}

function draw() {
    background(220);
    drawBird(mouseX, mouseY, turnAngle);
    turnAngle = 0;
    test = test + 1
}


function drawBird(x, y, d) {
    var birdPosition = [x, y];
    wingWidthL = sin(flap) * 125 + 75;
    wingWidthR = sin(-flap) * 125 + 75;
    flap = flap + 5.6;

    angleMode(DEGREES);
    rotate(d);

    imageMode(CENTER);
    image(body, birdPosition[0], birdPosition[1], 250, 250);
    image(head, birdPosition[0], birdPosition[1] - 140, 250, 250);
		

    var leftWingP2X = birdPosition[0] - 10;
    var leftWingP2Y = birdPosition[1] + 65;
    var leftWingP1X = leftWingP2X - 250 + wingWidthL;
    var leftWingP1Y = leftWingP2Y - 250;

    var rightWingP1X = birdPosition[0] + 10;
    var rightWingP1Y = birdPosition[1] - 185;
    var rightWingP2X = rightWingP1X + 250 + wingWidthR - 145;
    var rightWingP2Y = rightWingP1Y + 250;

    imageMode(CORNERS);
    image(leftWing, leftWingP1X, leftWingP1Y, leftWingP2X, leftWingP2Y);
  	image(rightWing, rightWingP1X, rightWingP1Y, rightWingP2X, rightWingP2Y);

}

let head, body, leftWing, rightWing, wingWidth, flap ;

function preload(){
	head = loadImage('bird-head.png');
  body = loadImage('bird-body.png');
  leftWing = loadImage('bird-left-wing.png');
  rightWing = loadImage('bird-right-wing.png');

}


function setup() { 
  createCanvas(1000, 1000);
	flap=0
} 

function draw() { 
  background(220);
  let birdPosition = [50,50]
  
  flap= flap+0.05;
  wingWidth =sin(flap);
  
	image(head,birdPosition[0], birdPosition[1]-45, 300, 300);
  image(body,birdPosition[0], birdPosition[1], 300, 300);
	//scale(wingWidth,1);
  //image(leftWing, body,birdPosition[0], birdPosition[1]-20, 300, 300);
  image(leftWing, body,mouseX, mouseY, 300, 300);
  //scale(wingWidth,1);
  image(rightWing, body,birdPosition[0]+125, birdPosition[1]-20, 300, 300);
  
  console.log(birdPosition[0]+125);
  
  leftWing.resize(200,300);
  rightWing.resize(100,300);
  
  
}


let  positionX;
let  positionY;

function setup() { 
  createCanvas(600, 600);
	let  direction = 0; 
  positionX = 300;
	positionY = 300;
  
} 

function draw() { 
  background(220);
  //positionX = mouseX;
	//positionY = mouseY;
	bird = new Bird(positionX,positionY,0);
		

}


class Bird{
	constructor(x,y,d){
  this.x=x;
  this.y=y;
  this.z=d;
  let w =60;
  let h =120;
  let centerX=this.x+(w/2);
  let centerY=this.y+(h/3);
  
  fill(255,0,0,30);
  //rect(this.x,this.y,w,h);
  

	//wing from out to in      
  //left wing
  //quad(centerX-160, centerY-60, centerX-100, centerY, centerX-20, centerY+40, centerX-30, centerY-30);
  beginShape();
  vertex(centerX-160, centerY-60);  
	vertex(centerX-100, centerY);
  vertex(centerX-20, centerY+40);  
  vertex(centerX-30, centerY-20);
  vertex(centerX-70, centerY-40);
	endShape(CLOSE);
  
  //right wing
  //quad(centerX+160, centerY-60, centerX+100, centerY, centerX+20, centerY+40, centerX+30, centerY-30);
	beginShape();
  vertex(centerX+160, centerY-60);  
	vertex(centerX+100, centerY);
  vertex(centerX+20, centerY+40);  
  vertex(centerX+30, centerY-20);
	vertex(centerX+70, centerY-40);    
	endShape(CLOSE);
    
    
  //head
  beginShape();
	//right side
  vertex(centerX+10, centerY-90);  
	vertex(centerX+15, centerY-80);
  vertex(centerX+15, centerY-50);  
  //left side  
  vertex(centerX-15, centerY-50);
	vertex(centerX-15, centerY-80); 
  vertex(centerX-10, centerY-90);  
  //tip
  vertex(centerX-0, centerY-95);  
	endShape(CLOSE);
    
    
  //body from upper right clockwise
  beginShape();
	//right side
	vertex(centerX+20, centerY-55);
  vertex(centerX+40, centerY-30);  
	vertex(centerX+15, centerY+80);
  vertex(centerX+18, centerY+105);
  //left side  
  vertex(centerX-18, centerY+105);
	vertex(centerX-15, centerY+80);
  vertex(centerX-40, centerY-30);
  vertex(centerX-20, centerY-55);
  
	endShape(CLOSE);
  }
}

// body{

// }

// wing{

// }

// beak{
// }

function flap(){
	
}

// turnRight(){

// }

// turnLeft(){

// }


//rotate(){
//using array
//}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}

let gifRight;
let gifLeft;
let gifR2L;
let gifL2R;

function preload(){
	gifRight=loadGif('right.gif');
  gifLeft=loadGif('left.gif');
  
}

function setup() { 
  createCanvas(600,300);
  
} 

function draw() { 
  background(220);
  image(gifRight,0,0,300,300);
  image(gifLeft,300,0,300,300);
}function setup() { 
  createCanvas(600, 600);
} 

function draw() { 
  background(220);
  //noStroke();
  
  //right wing
  fill(255,100,100);
  beginShape();
  vertex(70,280);
  vertex(100,280);
  vertex(110,320);
  endShape(CLOSE);

  //body
  fill(255,50,50);
	beginShape();
	vertex(99, 267);
	bezierVertex(133, 305, 85, 345, 109, 325);
	bezierVertex(91, 261, 79, 315, 88, 272);
	endShape();
  
  //left wing
  fill(255,0,0);
  beginShape();
  vertex(90,280);
  vertex(100,320);
  vertex(30,300);
  endShape(CLOSE);
  }
  let bodyPosition;

function preload(){
	body=loadImage();
  head=loadImage();
  beak=loadImage();
  wingleft=loadImage();
  wingright=loadImage();
}

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}

class Bird{
	constructor(x,y,z){
  this.x=x;
  this.y=y;
  this.z=z;
  distance=map(this.z,,,,);
  img(body,this.x,this.y,distance,distance);
  img(head,,,,);
  img(beak,,,,);
	img(wingleft,,,,);
  img(wingright,,,,);
  
  }

  flap(){
    
  }
  
  turn(){
    
  }
  
  move(){
  
  }
}

function setup() { 
  createCanvas(400, 400, WEBGL);
  bird = loadModel("bird.obj")

} 

function draw() { 
  background(220);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  torus(100, 30);
	}var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh( geometry, material );

var render = function () { 
  requestAnimationFrame( render ); 
  cube.rotation.x += 0.1; 
  cube.rotation.y += 0.1; 
  renderer.render( scene, camera ); 
}; 



function setup() { 
  createCanvas(400, 400);
  scene.add( cube );
	camera.position.z = 5;
  render();
} 

function draw() { 
  background(220);
	var group = new THREE.Group();
scene.add( group );

group.add( mesh1 );
group.add( mesh2 );

mesh2.visible = false;
group.remove( mesh2 );

group.children // mesh1
group.parent // scene
}let horizontal_walls = [];
let vertical_walls = [];

function setup() {
  frameRate(40)
  createCanvas(700, 350);
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
      //console.log(x, y);
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
  print(horizontal_walls);
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
  // wall x
  horizontal_walls.push("111111111111111111");
  for (var x = 0; x <= 6; x++) {
    wall = makeWallX();
    horizontal_walls.push(wall);
  }
  horizontal_walls.push("111111111111111111");

  // wall y
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
}var kinectron = null;
var backgrnd ;

function preload(){
   backgrnd = loadImage("beach.jpg");
}

function setup() {
	createCanvas(630, 420);
	kinectron = new Kinectron('172.16.216.84');
	kinectron.makeConnection();
  //kinectron.startTrackedBodies(trackBody);
  kinectron.startKey(gotData);
  //set the callback function name to be called when stuff comes from kinect
}

function draw() {

}

function gotData(data){
  loadImage(data.src,gotImage);
  //this is a callback that triggers another callback
}

function gotImage(img){
  image(backgrnd,0,0);
  image(img,0,0);
}


var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411'; // fill in your serial port name here
var inData;                             // for incoming serial data

var adjustedData;
var radius;

var start, end, time;
var gif;


function setup() {
  createCanvas(400, 300);
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



function draw() {
  //fill(255);
  //text("sensor value: " + adjustedData, 30, 30);
 // fill(150,150,0);
  //ellipse(200,150,adjustedData)
  
  //time = end-start;

  //var mapped = map(adjustedData, 20, 220, 0, 1);
  scary = createImg("https://media.giphy.com/media/3ohhwvp1b6zv3vNePC/giphy.gif");
	//scary.style("opacity", mapped);
  scary.position(0,0);

 
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
  print('the serial port opened.');
}

function serialEvent() {
	inData = Number(serial.read());
  adjustedData= map(inData,0,255,0,900)-500;
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}



/*
function mousePressed(){
	start = millis();
  clear();
}
function mouseReleased() {
	end = millis();
}*/
let input;

// imput box and button
function setup() {
    noCanvas();
    input = createInput('type something');
    button = createButton('submit');
    button.mousePressed(nyTimesSearch);
    clearButton = createButton('clear
                               ');
}

//load data from NY Times
function nyTimesSearch() {
    let term = input.value();
    let url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?' +
        'api-key=99cfea65a5bb30650b3d31eb1713233e:15:73386102' +
        '&q=' + term;

    console.log(url);
    loadJSON(url, gotNYTimesData);

}


let combinedData = [];

//show data from NY Times 
//and trigger data loading and show from giphy 
function gotNYTimesData(data) {
    // console.log(data);
    docs = data.response.docs;
    // console.log(docs);
    combinedData = [];

    for (let i = 0; i < docs.length; i++) {
        //        let headline = docs[i].headline.main;
        //        combinedData.push({
        //            headline: headline
        //        });
        let headline = document.createElement('h3');
        headline.innerHTML = docs[i].headline.main;
        headline.setAttribute("id", "item" + String(i))
        document.body.appendChild(headline);
        //        let img = document.createElement("img");
        //
        //        img.setAttribute("id", "img" + String(i));
        //        document.body.appendChild(img);
        giphySearch(docs[i].headline.main, i);

    }

    //        giphySearch(docs[i].headline.main, i);
}


//load image from giphy
function giphySearch(header, idx) {
    let giphyApi = "http://api.giphy.com/v1/gifs/search?" +
        "&api_key=dc6zaTOxFJmzC" +
        "&q=" + header;

    giphyApi = giphyApi.replace(/ /g, "%20");

    loadJSON(giphyApi, function (picData) {
        //        combinedData[idx]["imgUrl"] = picData.data[0].images.original.url;
        // console.log(picData[0]);
        if (picData.data.length > 0) {
            for (let i = 0; i < Math.min(4, picData.data.length); i++) {
                let img = document.createElement("img");
                img.src = picData.data[i].images.original.url;
                img.style.height = '200px';
                img.style.width = '200px';
                let parent = document.getElementById("item" + str(idx));
                insertAfter(img, parent);
            }
        }

        // console.log(combinedData);
    });
}


//show image from giphy
function showGiphyData(picData) {
    // console.log(picData);
    // for (let i = 0; i < picData.data.length; i++) {
    // console.log(picData.data[0].images.original.url);
    let img = createImg(picData.data[0].images.original.url);
    //img.size(200, 200);
    // }
}

//https://stackoverflow.com/a/4793630
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

let input;

// imput box and button
function setup() {
  noCanvas();
  input = createInput('type something');
  button = createButton('submit');
  button.mousePressed(nyTimesSearch);
}

//load data from NY Times
function nyTimesSearch() {
  let term = input.value();
  let url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?' +
    'api-key=99cfea65a5bb30650b3d31eb1713233e:15:73386102' +
    '&q=' + term;

  console.log(url);
  loadJSON(url, gotNYTimesData);

}


let combinedData = [];

//show data from NY Times 
//and trigger data loading and show from giphy 
function gotNYTimesData(data) {
  // console.log(data);
  docs = data.response.docs;
  // console.log(docs);
  combinedData = [];
  
  for (let i = 0; i < docs.length; i++) {
    let headline = docs[i].headline.main;
    combinedData.push( {headline: headline} );
    // let headline = createElement('h3', docs[i].headline.main);
    giphySearch(docs[i].headline.main, i);
  }
  
  while(combinedData.length > 0){ // noprotect
    let toDelete = [];
    for(let i = 0; i < combinedData.length; i++){
      let headline = combinedData[i].headline;
      let imgUrl = combinedData[i].imgUrl;
      if(headline != undefined && imgUrl != undefined){
      	console.log("GOT A PAIR!");
        toDelete.push(i);
      }else{ 
      }
    }
    
    for(let i = combinedData.length - 1; i >= 0; i++){ // noprotect
      if(contains.call(toDelete, i)){
         combinedData.splice(i,1);
      }
      
    }
				 
  }
  
}

//load image from giphy
function giphySearch(header, idx) {
  let giphyApi = "http://api.giphy.com/v1/gifs/search?" +
    "&api_key=dc6zaTOxFJmzC" +
    "&q=" + header;

  giphyApi = giphyApi.replace(/ /g, "%20");
  
  loadJSON(giphyApi, function(picData){
    combinedData[idx]["imgUrl"] = picData.data[0].images.original.url;
    // console.log(picData[0]);
    
    // console.log(combinedData);
  });
  
}

//show image from giphy
function showGiphyData(picData) {
  // console.log(picData);
  
  // for (let i = 0; i < picData.data.length; i++) {
    // console.log(picData.data[0].images.original.url);
    let img = createImg(picData.data[0].images.original.url);
    img.size(200, 200);
  // }
}
  
// https://stackoverflow.com/a/1181586/8822299
var contains = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};let input;

// imput box and button
function setup() {
  noCanvas();
  input = createInput('input any topic');
  button = createButton('submit');
  button.mousePressed(nyTimesSearch);
}

//load data from NY Times
function nyTimesSearch() {
  let term = input.value();
  let url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?'
          + 'api-key=99cfea65a5bb30650b3d31eb1713233e:15:73386102'
          + '&q=' + term;

  console.log(url);
  loadJSON(url, gotNYTimesData);

}

//show data from NY Times 
//and trigger data loading and show from giphy 
function gotNYTimesData(data) {
  console.log(data);
  docs = data.response.docs;

	for (let i = 0; i < docs.length; i++) {
		let headline = createElement('h3', docs[i].headline.main);
		giphySearch(docs[i].headline.main);
		
    for (let j = 0; j < giphy.data.length; j++){
			showGiphyData(giphy);
			let img = createImg(giphy.data[j].images.original.url);
  	  img.size(200, 200);
		}
  }
}

//load image from giphy
function giphySearch(header){
let giphyApi   = "http://api.giphy.com/v1/gifs/search?"
							 +"&api_key=dc6zaTOxFJmzC"
							 +"&q="+ header;
	
 	console.log(giphyApi);
  loadJSON(giphyApi, showGiphyData);
}

//
function showGiphyData(picData){
	let img = createImg(picData.data[4].images.original.url);
  img.size(200, 200);
}
var serial; // variable to hold an instance of the serialport library
 
function setup() {
 serial = new p5.SerialPort(); // make a new instance of the serialport library
 serial.on('list', printList); // set a callback function for the serialport list event
 
 serial.list(); // list the serial ports
}
 var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411'; // fill in your serial port name here
var inData;                             // for incoming serial data

var adjustedData;
var radius;

var start, end, time;
var gif;


function setup() {
  createCanvas(400, 300);
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



function draw() {
  //fill(255);
  //text("sensor value: " + adjustedData, 30, 30);
 // fill(150,150,0);
  //ellipse(200,150,adjustedData)
  
  //time = end-start;

  //var mapped = map(adjustedData, 20, 220, 0, 1);
  scary = createImg("https://media.giphy.com/media/3ohhwvp1b6zv3vNePC/giphy.gif");
	//scary.style("opacity", mapped);
  scary.position(0,0);

 
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
  print('the serial port opened.');
}

function serialEvent() {
	inData = Number(serial.read());
  adjustedData= map(inData,0,255,0,900)-500;
}

function serialError(err) {
  print('Something went wrong with the serial port. ' + err);
}

function portClose() {
  print('The serial port closed.');
}




function mousePressed(){
	start = millis();
  clear();
}
function mouseReleased() {
	end = millis();
}
let cubes=[];

function setup() { 
  createCanvas(400, 400);
  for (let i = 0; i < 500; i++) {
  cubes[i] = new Cube(10*i, 0, 15);
  }
	frameRate(60);
} 


function draw() { 
  background(200);
  for (let i = 0; i < cubes.length; i++) {
    cubes[i].show();
    cubes[i].move();
    //cubes[i].mass();
  }
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
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
  ellipse(x,y,24,24);
  
  y = y + speed;
  speed = speed + gravity;
  if (y > height) {
    y = height;
    speed = -0.95*speed;
  }
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
   print(horizontalWalls);

   /*   
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
   */
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
       //console.log(x, y);
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

 //role change
//  var colorA=color(178, 34, 34);
//  var colorB=color(255);
//  setTimeout(function changeRoll() {
//    if(rollA==false){
//      rollA=true;
//     }else{
//     rollA=false;
//     }, 3000);
 
   
//      if (rollA == false) {
//        colorA = color(128);
//        colorB = color(240, 128, 128) //ghost
//      } else {
//        colorA = color(178, 34, 34); //ghost
//        colorB = color(255)
//      }
   
 

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
 };var horizontalWalls = [];
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
   print(horizontalWalls);

   /*   
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
   */
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
       //console.log(x, y);
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

 //role change
//  var colorA=color(178, 34, 34);
//  var colorB=color(255);
//  setTimeout(function changeRoll() {
//    if(rollA==false){
//      rollA=true;
//     }else{
//     rollA=false;
//     }, 3000);
 
   
//      if (rollA == false) {
//        colorA = color(128);
//        colorB = color(240, 128, 128) //ghost
//      } else {
//        colorA = color(178, 34, 34); //ghost
//        colorB = color(255)
//      }
   
 

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
 }; function setup() {
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
   rollA=false; //for change roll
   direction_a = {
     x: 0,
     y: 0
   };

   direction_b = {
     x: 0,
     y: 0
   };

   var horizontalWalls = [];
   var verticalWalls = [];
   for (x = 0; x < 18; x + 2) {
     horizontalWalls[x] = [];
     verticalWalls[x] = [];
     for (y = 0; y < 8; y + 2) {
       horizontalWalls[x][y] = random(0, 1);
       verticalWalls[x][y] = random(0, 1);
     }
   }

   /*   
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
   */
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
       if (x < 18 && horizontalWalls[x][y].charAt(x) == '1') {
         noStroke();
         rect((x + 1) * gridSize - 1, (y + 1) * gridSize - 1, gridSize, 2);
       }
       if (y < 8 && verticalWalls[x][y].charAt(x) == '1') {
         noStroke();
         rect((x + 1) * gridSize - 1, (y + 1) * gridSize - 1, 2, gridSize);
       }
       //console.log(x, y);
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

 //role change
 var colorA=color(178, 34, 34);
 var colorB=color(255);
 setTimeout(function changeRoll() {
   if(rollA==false){
     rollA=true;
    }else{
    rollA=false;
    }, 3000);
 
   
     if (rollA == false) {
       colorA = color(128);
       colorB = color(240, 128, 128) //ghost
     } else {
       colorA = color(178, 34, 34); //ghost
       colorB = color(255)
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
 };//square
function playerOne(role, xAxis, yAxis) {
  if (role === true) {
    fill(255, 69, 0);
  } else {
    fill(255, 255, 255);
  }
  rect(xAxis * 50 + 5, yAxis * 50 + 5, 40, 40);
  fill(0, 0, 0);
  rect(xAxis * 50 + 10, yAxis * 50 + 15, 10, 10);
  rect(xAxis * 50 + 30, yAxis * 50 + 15, 10, 10);
  rect(xAxis * 50 + 15, yAxis * 50 + 35, 20, 5);
}

//circle 
function playerTwo(role, xAxis, yAxis) {
  if (role === true) {
    fill(255, 69, 0);
  } else {
    fill(255, 255, 255);
  }

  ellipse(xAxis * 50 + 25, yAxis * 50 + 25, 40, 40);
  fill(0, 0, 0);
  ellipse(xAxis * 50 + 20, yAxis * 50 + 20, 5, 5);
  ellipse(xAxis * 50 + 30, yAxis * 50 + 20, 5, 5);
  ellipse(xAxis * 50 + 25, yAxis * 50 + 30, 10, 5);
}

//count function()&gameSceneSet
var initialSquareX = 0;
var initialSquareY = 0;
var initialellipseX = 9;
var initialellipseY = 9;
var secondCount = 4

function timedCount() {
  if (secondCount > 0) {
    secondCount = secondCount - 1;
    print(secondCount);
    fill(0);
    rect(0, 0, 500, 500); //開始倒數
    textAlign(CENTER);
    textSize(30);
    fill(225);
    text(secondCount, 250, 250);
    setTimeout(function() {
      timedCount()
    }, 1000);
  } else {
    fill(0, 250, 154);
    rect(0, 0, 500, 500); //遊戲開始畫面 
    playerOne(true, initialSquareX, initialSquareY);
    playerTwo(false, initialellipseX, initialellipseY);
    obstacleGenerate();
  }
}

//mapCoodinatorAllocation
var mapCoodinator = [];
for (var i = 0; i < 10; i++) {
  mapCoodinator[i] = []
  for (var j = 0; j < 10; j++) {
    mapCoodinator[i][j] = true;
  }
}

//obstacles function

function horizontalObstacle() {
  for (var k = 0; k < 100; k++) {
    var mapCoodinator = [];
    for (var i = 0; i < 10; i++) {
      mapCoodinator[i] = []
      for (var j = 0; j < 10; j++) {
        if (random(0, 10) > 8) { //生成障礙物的機率
          mapCoodinator[i][j] = false;
          fill(169, 169, 169);
          rect(i * 50, j * 50, 45, 45);
        }
      }
    }
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

/*
//move control function
function keyPressed() {
  switch (keyCode) {
    case UP_ARROW:
      initialSquareX = initialSquareX - 1;
      break;

    case DOWN_ARROW:
      initialSquareX = initialSquareX + 1;
      break;

    case LEFT_ARROW:
      initialSquareY = initialSquareY - 1;
      break;

    case RIGHT_ARROW:
      initialSquareY = initialSquareY + 1;
      break;

    case 87:
      initialellipseX = initialellipseX - 1;
      break;

    case 83:
      initialellipseX = initialellipseX + 1;
      break;

    case 65:
      initialellipseY = initialellipseY - 1;
      break;

    case 68:
      initialellipseY = initialellipseY + 1;
      break;
  }
}
*/
//Main Program Begin
function setup() {
  createCanvas(500, 500);
  background(0);
  fill(255);
  textAlign(CENTER);
  textSize(30);
  text('Press space start', 250, 250);

}


function keyPressed() {
  switch (keyCode) {
    case 32:
      timedCount();
      break;

    case UP_ARROW:
      initialSquareX = initialSquareX - 1;
      break;

    case DOWN_ARROW:
      initialSquareX = initialSquareX + 1;
      break;

    case LEFT_ARROW:
      initialSquareY = initialSquareY - 1;
      break;

    case RIGHT_ARROW:
      initialSquareY = initialSquareY + 1;
      break;

    case 87:
      initialellipseX = initialellipseX - 1;
      break;

    case 83:
      initialellipseX = initialellipseX + 1;
      break;

    case 65:
      initialellipseY = initialellipseY - 1;
      break;

    case 68:
      initialellipseY = initialellipseY + 1;
      break;
  }
}



//////////////////////////////////////////////////////////////mapCoodinatorAllocation
var mapCoodinatorX = [];
for (var i = 0; i < 10; i++) {
  mapCoodinatorX[i] = []
  for (var j = 0; j < 10; j++) {
    mapCoodinatorX[i][j] = 50 * i
  }
}

var mapCoodinatorY = [];
for (var i = 0; i < 10; i++) {
  mapCoodinatorY[i] = []
  for (var j = 0; j < 10; j++) {
    mapCoodinatorY[i][j] = 50 * j
  }
}

//square
function playerOne(role, xAxis, yAxis) {
  if (role === true) {
    fill(255, 69, 0);
  } else {
    fill(255, 255, 255);
  }
  rect(mapCoodinatorX[xAxis][yAxis] + 5, mapCoodinatorY[xAxis][yAxis] + 5, 40, 40);
  fill(0, 0, 0);
  rect(mapCoodinatorX[xAxis][yAxis] + 10, mapCoodinatorY[xAxis][yAxis] + 15, 10, 10);
  rect(mapCoodinatorX[xAxis][yAxis] + 30, mapCoodinatorY[xAxis][yAxis] + 15, 10, 10);
  rect(mapCoodinatorX[xAxis][yAxis] + 15, mapCoodinatorY[xAxis][yAxis] + 35, 20, 5);
}

//circle 
function playerTwo(role, xAxis, yAxis) {
  if (role === true) {
    fill(255, 69, 0);
  } else {
    fill(255, 255, 255);
  }

  ellipse(mapCoodinatorX[xAxis][yAxis] + 25, mapCoodinatorY[xAxis][yAxis] + 25, 40, 40);
  fill(0, 0, 0);
  ellipse(mapCoodinatorX[xAxis][yAxis] + 20, mapCoodinatorY[xAxis][yAxis] + 20, 5, 5);
  ellipse(mapCoodinatorX[xAxis][yAxis] + 30, mapCoodinatorY[xAxis][yAxis] + 20, 5, 5);
  ellipse(mapCoodinatorX[xAxis][yAxis] + 25, mapCoodinatorY[xAxis][yAxis] + 30, 10, 5);
}



//count function()&gameSceneSet
var initialSquareX = 0;
var initialSquareY = 0;
var initialellipseX = 9;
var initialellipseY = 9;
var secondCount = 4

function timedCount() {
  if (secondCount > 0) {
    secondCount = secondCount - 1;
    print(secondCount);
    fill(0);
    rect(0, 0, 500, 500); //開始倒數
    textAlign(CENTER);
    textSize(30);
    fill(225);
    text(secondCount, 250, 250);
    setTimeout(function() {
      timedCount()
    }, 1000);
  } else {
    fill(0, 250, 154);
    rect(0, 0, 500, 500); //遊戲開始畫面 
    playerOne(true, initialSquareX, initialSquareY);
    playerTwo(false, initialellipseX, initialellipseY);
  }
}

//Main Program Begin
function setup() {
  createCanvas(500, 500);
  background(0);
  fill(255);
  textAlign(CENTER);
  textSize(30);
  text('Press space start', 250, 250);
}

function keyPressed() {
	if(keyCode==32){
  	timedCount();
  }
}
function keyPressed() {
  switch (keyCode) {      
    case UP_ARROW:
      initialSquareX = initialSquareX - 1;
      break;

    case DOWN_ARROW:
      initialSquareX = initialSquareX + 1;
      break;

    case LEFT_ARROW:
      initialSquareY = initialSquareY - 1;
      break;

    case RIGHT_ARROW:
      initialSquareY = initialSquareY + 1;
      break;

    case 87:
      initialellipseX = initialellipseX - 1;
      break;

    case 83:
      initialellipseX = initialellipseX + 1;
      break;

    case 65:
      initialellipseY = initialellipseY - 1;
      break;

    case 68:
      initialellipseY = initialellipseY + 1;
      break;
  }
}



function setup() { 
  createCanvas(500, 500);
} 


var obstacle = new Boolean(False);
var map = [25][25];


function draw() { 
  background(10);
  
}



for (var xAxis = 0; xAxis < 25; xAxis++) {
  var r = random(50);
  stroke(r*5);
  line(50, i, 50+r, i);
}//mapCoodinatorAllocation
var mapCoodinatorX = [];
for (var i = 0; i < 10; i++) {
  mapCoodinatorX[i] = []
  for (var j = 0; j < 10; j++) {
    mapCoodinatorX[i][j] = 50 * i
  }
}

var mapCoodinatorY = [];
for (var i = 0; i < 10; i++) {
  mapCoodinatorY[i] = []
  for (var j = 0; j < 10; j++) {
    mapCoodinatorY[i][j] = 50 * j
  }
}

//square
function playerOne(role, xAxis, yAxis) {
  if (role === true) {
    fill(255, 69, 0);
  } else {
    fill(255, 255, 255);
  }
  rect(mapCoodinatorX[xAxis][yAxis] + 5, mapCoodinatorY[xAxis][yAxis] + 5, 40, 40);
  fill(0, 0, 0);
  rect(mapCoodinatorX[xAxis][yAxis] + 10, mapCoodinatorY[xAxis][yAxis] + 15, 10, 10);
  rect(mapCoodinatorX[xAxis][yAxis] + 30, mapCoodinatorY[xAxis][yAxis] + 15, 10, 10);
  rect(mapCoodinatorX[xAxis][yAxis] + 15, mapCoodinatorY[xAxis][yAxis] + 35, 20, 5);
}

//circle 
function playerTwo(role, xAxis, yAxis) {
  if (role === true) {
    fill(255, 69, 0);
  } else {
    fill(255, 255, 255);
  }

  ellipse(mapCoodinatorX[xAxis][yAxis] + 25, mapCoodinatorY[xAxis][yAxis] + 25, 40, 40);
  fill(0, 0, 0);
  ellipse(mapCoodinatorX[xAxis][yAxis] + 20, mapCoodinatorY[xAxis][yAxis] + 20, 5, 5);
  ellipse(mapCoodinatorX[xAxis][yAxis] + 30, mapCoodinatorY[xAxis][yAxis] + 20, 5, 5);
  ellipse(mapCoodinatorX[xAxis][yAxis] + 25, mapCoodinatorY[xAxis][yAxis] + 30, 10, 5);
}



//count function()&gameSceneSet
var initialSquareX = 0;
var initialSquareY = 0;
var initialellipseX = 9;
var initialellipseY = 9;
var secondCount = 4

function timedCount() {
  if (secondCount > 0) {
    secondCount = secondCount - 1;
    print(secondCount);
    fill(0);
    rect(0, 0, 500, 500); //開始倒數
    textAlign(CENTER);
    textSize(30);
    fill(225);
    text(secondCount, 250, 250);
    setTimeout(function() {
      timedCount()
    }, 1000);
  } else {
    fill(0, 250, 154);
    rect(0, 0, 500, 500); //遊戲開始畫面 
    playerOne(true, initialSquareX, initialSquareY);
    playerTwo(false, initialellipseX, initialellipseY);
  }
}

//obstacles function

var obstacles
var r = random(50)
var mapCoodinatorX = [];
for (var i = 0; i < 10; i++) {
  mapCoodinatorX[i] = []
  for (var j = 0; j < 10; j++) {
    mapCoodinatorX[i][j] = 50 * i
  }
}


/*
//move control function
function keyPressed() {
  switch (keyCode) {
    case UP_ARROW:
      initialSquareX = initialSquareX - 1;
      break;

    case DOWN_ARROW:
      initialSquareX = initialSquareX + 1;
      break;

    case LEFT_ARROW:
      initialSquareY = initialSquareY - 1;
      break;

    case RIGHT_ARROW:
      initialSquareY = initialSquareY + 1;
      break;

    case 87:
      initialellipseX = initialellipseX - 1;
      break;

    case 83:
      initialellipseX = initialellipseX + 1;
      break;

    case 65:
      initialellipseY = initialellipseY - 1;
      break;

    case 68:
      initialellipseY = initialellipseY + 1;
      break;
  }
}
*/
//Main Program Begin
function setup() {
  createCanvas(500, 500);
  background(0);
  fill(255);
  textAlign(CENTER);
  textSize(30);
  text('Press space start', 250, 250);

}


function keyPressed() {
  switch (keyCode) {
    case 32:
      timedCount();
      break;

    case UP_ARROW:
      initialSquareX = initialSquareX - 1;
      break;

    case DOWN_ARROW:
      initialSquareX = initialSquareX + 1;
      break;

    case LEFT_ARROW:
      initialSquareY = initialSquareY - 1;
      break;

    case RIGHT_ARROW:
      initialSquareY = initialSquareY + 1;
      break;

    case 87:
      initialellipseX = initialellipseX - 1;
      break;

    case 83:
      initialellipseX = initialellipseX + 1;
      break;

    case 65:
      initialellipseY = initialellipseY - 1;
      break;

    case 68:
      initialellipseY = initialellipseY + 1;
      break;
  }
}



////////////////////////////////////////////////////////////var squarePositionX=10;
var squarePositionY=10;
var circlePositionX=370;
var circlePositionY=370;

function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
  //square
  fill(255,255,255);
  rect(squarePositionX,squarePositionY,30,30);
  fill(0,0,0);

  rect(squarePositionX+5,squarePositionY+10,5,5);
  rect(squarePositionX+20,squarePositionY+10,5,5);
  rect(squarePositionX+10,squarePositionY+20,10,5);
  //circle
  fill(255,255,255);
  ellipse(circlePositionX,circlePositionY,30,30);
  fill(0,0,0);
  ellipse(circlePositionX-5,circlePositionY-5,5,5);
  ellipse(circlePositionX+5,circlePositionY-5,5,5);
  ellipse(circlePositionX,circlePositionY+5,10,5);
  
}
  //initial position square
var squarePositionX=10;
var squarePositionY=10;

	//initial position circle
var circlePositionX=370;
var circlePositionY=370;

function setup() { 
  createCanvas(400, 400);  

} 

//var position=['x','y'];
//class of chatacter
/*
function People (identity,positionX,positionY){
  this.identity=identity;
  this.position=positionX;
  this.position=positionY;
};

var square= new People()
var circle= new People()
*/


function draw() { 
  background(220);
  
    //square
  fill(255,255,255);
  rect(squarePositionX,squarePositionY,30,30);
  fill(0,0,0);
  rect(squarePositionX+5,squarePositionY+10,5,5);
  rect(squarePositionX+20,squarePositionY+10,5,5);
  rect(squarePositionX+10,squarePositionY+20,10,5);
  
  //circle
  fill(255,255,255);
  ellipse(circlePositionX,circlePositionY,30,30);
  fill(0,0,0);
  ellipse(circlePositionX-5,circlePositionY-5,5,5);
  ellipse(circlePositionX+5,circlePositionY-5,5,5);
  ellipse(circlePositionX,circlePositionY+5,10,5);
}

//move and control
function keyPressed() { 
	switch(keyCode){
      case UP_ARROW:
        circlePositionY=circlePositionY-5;
      	break;
        
      case DOWN_ARROW:
        circlePositionY=circlePositionY+5;
        break;
        
      case LEFT_ARROW:
        circlePositionX=circlePositionX-5;
        break;
        
      case RIGHT_ARROW:
        circlePositionX=circlePositionX+5;
        break;
        

      case 87:
        squarePositionY=squarePositionY-5;
      	break;
        

      case 83:
        squarePositionY=squarePositionY+5;
        break;
        
      case 65:
        squarePositionX=squarePositionX-5;
        break;
        
      case 68:
        squarePositionX=squarePositionX+5;
        break; 		
  };
};
var x=-100;	
function setup() {
    createCanvas(400, 400);
  	
}

function draw() {
  	innerEyeColor=[255,255,255];
  	outterEyeColor=[0,0,0];  	
    background(250,250,250);

  		
  	x = x +8;
  	if (x > 400) {
    	x = -320;
  	}
  
  	//body
    noStroke();
  	fill(255,255,0);
  	ellipse(152+x,150,180,200);
  	ellipse(152+x,200,220,240);	
	  ellipse(152+x,220,250,260);	
  	//eyes
  	var b=x+100
  	fill(outterEyeColor);
		ellipse(100+x,120,30,30);
  	ellipse(200+x,120,30,30);
  
  	fill(innerEyeColor);
  	ellipse(105+x,111,10,10);
	  ellipse(195+x,111,10,10);
  	
  	//nose
  	fill(0,0,0);
  	ellipse(150+x,140,10,10);

  	//mouth
  	noFill();
		stroke(0);
		curve(120+x, 130, 130+x, 160, 150+x, 160, 180+x, 130);
		curve(140+x, 130, 150+x, 160, 170+x, 160, 200+x, 130);
		
		//cheeks	
  	noStroke();
  	fill(240,100,0);
  	ellipse(90+x,160,35,30);
  	ellipse(210+x,160,35,30);
  
		//ears
  	fill(255,255,0);
  	beginShape();
		vertex(80+x, 90);
		vertex(90+x, 16);
		vertex(120+x, 80);
		endShape(close);
  
  	beginShape();
  	vertex(170+x, 90);
		vertex(210+x, 16);
  	vertex(225+x, 90);
  	endShape(close);
 
	  beginShape();
		fill(0,0,0);
	  vertex(90+x, 16);
  	vertex(101+x, 40);
	  vertex(86+x, 43);
		endShape(close);

    beginShape();
		fill(0,0,0);
	  vertex(210+x, 16);
  	vertex(215+x, 43);
	  vertex(197+x, 40);
		endShape(close);

    //aim
  	noFill();
  	stroke(0,0,0);
  	ellipse(mouseX,mouseY,30,30);
  	ellipse(mouseX,mouseY,15,15);
  	line(mouseX-15,mouseY,mouseX+15,mouseY);
	  line(mouseX,mouseY-15,mouseX,mouseY+15);
  	
}  



function mousePressed() {
  noLoop();
}

function mouseReleased() {
	loop();
}

