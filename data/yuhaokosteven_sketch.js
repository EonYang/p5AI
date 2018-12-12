const url = "https://raw.githubusercontent.com/dariusk/corpora/master/data/humans/scientists.json";


function setup() {
  createCanvas(400, 400);
  // loadJSON(url, data => console.log(data));

  // loadJSON(url, data => createP(data.scientists[3]));

  // fetch(url).then(response => {
  //   return response.json();
  // }).then(data => console.log(data, json));

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data)
    createP(data.scientists[3])
    })
    .catch(error => console.log(error));



}

function draw() {
  background(220);
}function setup() {
  noCanvas();
  createP("Hello");
  //createCanvas(400, 400);
}

function draw() {
  background(220);
}// Daniel Shiffman
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
  // let targets;
  // if (mouseX > width / 2) {
  //   targets = [0, 1];
  // } else {
  //   targets = [1, 0];
  // }
  // let inputs = [r / 255, g / 255, b / 255];
  //
  // brain.train(inputs, targets);
  pickColor();
}


function colorPredictor(r, g, b) {
  // console.log(floor(r + g + b));
  let inputs = [r / 255, g / 255, b / 255];
  let outputs = brain.predict(inputs);
  //console.log(outputs);

  // if (outputs[0] > outputs[1]) {
  //   return "black";
  // } else {
  //   return "white";
  // }
  if (outputs[0] > outputs[1]) {
    return "complement"
    // "black";
  } else {
    return "original"
  }
}

function trainColor(r, g, b) {
  if ((r + g + b > 0) && (r + g + b > (255 * 3) / 2)) {
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

  textSize(32);
  noStroke();
  fill(0);
  textAlign(CENTER, CENTER);
  text("black", 150, 100);
  fill(255);
  text("white", 450, 100);

  let which = colorPredictor(r, g, b);
  if (which === "complement") {
    fill(255 - r, 255 - g, 255 - b);
    rect(300, 0, width / 2, height);

    fill(0);
    ellipse(150, 200, 60);
  } else {
    fill(255 - r, 255 - g, 255 - b);
    rect(0, 0, width / 2, height);
    fill(255);
    ellipse(450, 200, 60);

  }


}
// The Nature of Code
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

function setup() {
  createCanvas(640, 360);
  // The number of cycles we will allow a generation to live
  lifetime = 400;

  // Initialize variables
  lifecycle = 0;
  recordtime = lifetime;

  target = new Obstacle(width / 2 - 12, 24, 24, 24);

  // Create a population with a mutation rate, and population max
  let mutationRate = 0.01;
  population = new Population(mutationRate, 50);

  // Create the obstacle course
  obstacles = [];
  obstacles.push(new Obstacle(width / 2 - 100, height / 2, 10, 200));
  obstacles.push(new Obstacle(width / 2 - 100, height / 2, 200, 10));
}

function draw() {
  background(127);

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
  fill(0);
  noStroke();
  text("Generation #: " + population.getGenerations(), 10, 18);
  text("Cycles left: " + (lifetime - lifecycle), 10, 36);
  text("Record cycles: " + recordtime, 10, 54);


}

// Move the target if the mouse is pressed
// System will adapt to new target
function mousePressed() {
  target.position.x = mouseX;
  target.position.y = mouseY;
  recordtime = lifetime;
}let i = 0;
let a = 1;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  i = i + a;
  if (i > 255) {
    a = -1;
  } else if (i < 0) {
    a = 1;
  }
  fill(i);
  ellipse(width / 2, height / 2, 50, 50);
  console.log(i);
}// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let ps;
// let img;
var Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies;

var engine;
var world;
var circles = [];
var boundaries = [];
var ground;
var img;

function preload() {
  img = loadImage('eye.png');
}

function setup() {
  createCanvas(400, 700);
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);
  for (var i = 0; i < circles.length; i++) {
    circles[i].show();
    if (circles[i].isOffScreen()) {
      circles[i].removeFromWorld();
      circles.splice(i, 1);
      i--;
    }
  }
  // ground = new Boundary(400, height, width, 100);
  boundaries.push(new Boundary(60, height * 0.5, 200, 20, 0.5));
  boundaries.push(new Boundary(width - 60, height * 0.5, 200, 20, -0.5));
  boundaries.push(new Boundary(0, height * 0.9, 20, 300, 0));
  boundaries.push(new Boundary(width, height * 0.9, 20, 300, 0));
  boundaries.push(new Boundary(width / 2, height + 30, width, 50, 0));



  // World.add(world, boundaries);

  // loadImage('test.jpg', (img) => {
  //console.log(img);
  //let img = img;
  img.loadPixels();
  for (let x = 0; x < img.width; x += 10) {
    for (let y = 0; y < img.height; y += 10) {
      let index = (x + y * img.width) * 4;
      let c = img.pixels[index];
      //colorMode(HSB);
      // let col = color(img.pixels[index]);
      let r = img.pixels[index];
      let g = img.pixels[index + 1];
      let b = img.pixels[index + 2];
      let col = color(r, g, b);
      let br = brightness(col);
      //  console.log(col);
      //let b = brightness(c);
      if (br > 1) {
        //addParticle(x, y, col);
        circles.push(new Circle(x, y, 10, col));
        //this.particles[index].psuh(new Particle(x,y,r));
      }


    }
  }
}

function mousePressed() {
  // boxpic.push(new Boxpic(mouseX, mouseY, 20, 20));
  // boxpic.push(new Boxpic());
  for (let i = 0; i < circles.length; i++) {
    circles[i].drop();
  }
  // ps.shatter();
}

function draw() {
  background(0);
  Engine.update(engine);
  for (let i = 0; i < circles.length; i++) {
    circles[i].show();
  }
  for (let i = 0; i < boundaries.length; i++) {
    boundaries[i].show();
    // ps.display();
    //  ps.update();
  }
}
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Arriving "vehicle" follows the mouse position

// Implements Craig Reynold's autonomous steering behaviors
// One vehicle "arrive"
// See: http://www.red3d.com/cwr/

let v;

function setup() {
  createCanvas(640, 360);
  v = new Vehicle(width / 2, height / 2);
}

function draw() {
  background(51);

  let mouse = createVector(mouseX, mouseY);

  // Draw an ellipse at the mouse position
  fill(127);
  stroke(200);
  strokeWeight(2);
  ellipse(mouse.x, mouse.y, 48, 48);

  // Call the appropriate steering behaviors for our agents
  v.arrive(mouse);
  v.update();
  v.display();

}// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Seeking "vehicle" follows the mouse position

// Implements Craig Reynold's autonomous steering behaviors
// One vehicle "seeks"
// See: http://www.red3d.com/cwr/

let v;

function setup() {
  createCanvas(640, 360);
  v = new Vehicle(width / 2, height / 2);
}

function draw() {
  background(51);

  let mouse = createVector(mouseX, mouseY);

  // Draw an ellipse at the mouse position
  fill(127);
  stroke(200);
  strokeWeight(2);
  ellipse(mouse.x, mouse.y, 48, 48);

  // Call the appropriate steering behaviors for our agents
  v.seek(mouse);
  v.update();
  v.display();

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
  background(51);

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
}var font;
var vehicles = [];

function preload() {
  font = loadFont('Lovely Madness.ttf');
}

function setup() {
  createCanvas(800, 300);
  //background(51);
  fill(255);
  textSize(100);
  noStroke();
  // textFont('font');
  // text('PARTICLES', 120, 180);

  var points = font.textToPoints('PARTICLES', 50, 180);
  for (let i = 0; i < points.length; i++) {
    let pt = points[i];
    // let vehicle = new Vehicle(pt.x, pt.y);
    // vehicles.push(vehicle);
    vehicles.push(new Vehicle(pt.x, pt.y));
    // stroke(255);
    // strokeWeight(8);
    // point(pt.x, pt.y);
  }
}

function draw() {
  background(0);
  // for (let i = 0; i < vehicles.length; i++) {
  //   var v = vehicles[i];

  //v.behaviors();
  if (mouseIsPressed) {
    for (let i = 0; i < vehicles.length; i++) {
      var v = vehicles[i];
      v.shatter();
    }
  } else {
    for (let i = 0; i < vehicles.length; i++) {
      var v = vehicles[i];
      v.update();
      v.show();
      v.behaviors();
      //}
    }
  }
  //}
}
function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}let angle_pos = 0;
let angle_vel = 0.5;
let angle_acc = 0;
let slider;

function setup() { 
  createCanvas(400, 400);
  slider = createSlider(-0.01, 0.01,0, 0.001);
} 

function draw() { 
  background(220);
  
  translate(200,200);
  rotate(angle_acc);
  ellipse(0,0,200);
  line(0,0,100,0);
  
  angle_acc = slider;
  angle_pos += angle_vel;
  angle_vel += angle_acc;
}// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let walker = [];

function setup() {
  createCanvas(400, 400);
  background(0);
  for(var i = 0; i<2; i++){
  walker [i]= new Walker();
  }
}

function draw() {
  
  var gravity = createVector(random(-1,1), random(-1,1));
  
  for( var i = 0; i<walker.length; i++){
  walker[i].applyForce(gravity);
  walker[i].step();
  walker[i].render();
  walker[i].update();
  walker[i].border();
  }
}

function mousePressed(){
  walker.push(new Walker(mouseX,mouseY));
  
}// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

var mover;

function setup() {
  createCanvas(420, 320);
  mover = new Mover();
}

function draw() {
  background(0);
 
  let gravity = createVector(0, 0.2);
  mover.applyForce(gravity);
  
  if(mouseIsPressed){
  let wind = createVector(1,0);
  mover.applyForce(wind);
  }
  mover.update();
  mover.checkEdges();
  mover.display();
}// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let walker1, walker2;

function setup() {
  createCanvas(320, 240);
  walker1 = new Walker(100,100);
  //walker1.x =50;
  // walker2 = Object.create(walker1);
  // //walker1.x=100;
  // console.log(walker1.x, walker2.x);
  let s =JSON.stringify(walker1);
  console.log(s);
  walker2= JSON.parse(s);
  
  background(127);
}

function draw() {
  walker1.step();
  walker1.render();
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let walker = [];

function setup() {
  createCanvas(400, 400);
  background(0);
  for(var i = 0; i<2; i++){
  walker [i]= new Walker();
  }
}

function draw() {
  
  for( var i = 0; i<walker.length; i++){
  walker[i].step();
  walker[i].render();
  }
}

function mousePressed(){
  walker.push(new Walker(mouseX,mouseY));
  
}// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let walker;

function setup() {
  createCanvas(320, 240);
  walker = new Walker();
  
}

function draw() {
  background(127);
  walker.step();
  walker.render();
}

function mousePressed(){
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}function setup() {
  createCanvas(200, 200);
}

function draw() {
  background(220);
  // curve(38,8,65,18,85,43,115,52);
  translate(100,100);
  //scale(-1);
  noFill();
  bezier(85, 20, 10, 10, 90, 90, 15, 80);
  
  bezier(-85, 20, -10, 10, -90, 90, -15, 80);
}let audio;
let level;
var fft, filter;



//load sound
function preload() {
  
  soundFormats('mp3');
   mySound = loadSound('tree-2.mp3'); 
   mySound2 = loadSound('bird.mp3');
   mySound3 = loadSound('water.mp3');
  

}


function setup() { 
  createCanvas(640, 360);

         //lowpass filter for water//
  
  filter =new p5.LowPass();
 //(connect sound to filter) 
  mySound3.disconnect();
  mySound3.connect(filter);
  fft= new p5.FFT();
  
             //panning volume for bird//
  
  level = new p5.Amplitude();
} 

function draw() { 
  background(220,230,233);
  line(200,0,200,250);
  line(0,250,640,250);
    
  
  //change the freq range of the lowpass filter
  var freq = map(mouseX, 0, width, 20, 10000);
  filter.freq(freq);
  
  // give the filter a narrow band (lower res = wider bandpass)
  filter.res(10);
  
    
}
   //filter mouse over for water sound
function isMouseOverCanvas() {
  var mX = mouseX, mY = mouseY;
  if (mX > 0 && mX < width && mY < height && mY > 0) {
    mySound3.amp(0.5, 0.2);
  } else {
    mySound3.amp(0, 0.2);
  }
}



// mouse over for 3 sound

function mouseMoved() {
  //play tree music

  
  if(mouseX > 0 && 
     mouseX < 200 &&
     mouseY > 0 &&
     mouseY < 250){
    
    

    if(mySound.isPlaying() == true){
      mySound.pause();
    }else{
      
   		mySound.play();
      
 
    }
    
    //play bird music
  } else {
  
    if(mouseX > 200 && 
     mouseX < 640 &&
     mouseY > 0 &&
     mouseY < 250){
      
   //panning function for bird music
   var panValue = map(mouseX, 0, width, -1, 1);
  print(panValue);
  mySound2.pan(panValue);
  
  var speed = map(mouseY, 0, height, 0, 4);
  mySound2.rate(speed);  
  
  var vol = map(mouseY, 0, height, 0, 1);
  mySound2.amp(vol);
    
      
    if(mySound2.isPlaying() == true){
      mySound2.stop();
    }else{
      
   		mySound2.play();

    }
      //play  water music
    }else{
  
  
    
      if(mouseX > 0 && 
     mouseX < 640 &&
     mouseY > 250 &&
     mouseY < 360){
        
    filterFreq = map(mouseX, 0, width, 20, 20000);
    filterRes = map( mouseY, 710, height, 15, 5)
    
        
    if(mySound3.isPlaying() == true){
      mySound3.pause();
    }else{
      
   		mySound3.play();

      
    

       } 
    }
    
}
  }
}



function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}var stars = [];
var speed = 4;

function setup() {
  createCanvas(600, 380);
  background(0);
  noStroke();
  for (var i = 0; i < 600; i++) {
    stars[i] = new Star();
  }
}

function draw() {
 fill(0,180);// draw an alpha
 rect(0,0,width,height);
   //background(0);
  translate(width / 2, height / 2);

  for (var i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].show();
    stroke(255);
    strokeWeight(0.1);
    //line(0,0,stars[i].x,stars[i].y);
  }
}

function Star() {
  //this.x = random(-width, width);
  //this.y = random(-height, height);
  //this.z = random(600);
  this.position=createVector(random(-width,width),random(-height,height),random(600));
  this.velocity=createVector(0,0,-1);
  this.acceleration=createVector(0,0,-0.001);

  this.update = function() {
   
   // var mouse=createVector(mouseX,mouseY);
   // this.acceleration=p5.Vector.sub(mouse,this.position);
   // this.acceleration.setMag(0.01);
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    
    if (this.position.z <1) {
      this.position.z =600;
      this.position.x = random(-width,width);
      this.position.y = random(-height,height);
    }
  }
    this.show = function() {
      
      fill(255);
      stroke(255,150);
      strokeWeight(random(2));
      
      var sx = map(this.position.x / this.position.z, 0, 1, 0, width);
      var sy = map(this.position.y/this.position.z, 0, 1, 0, height);
      
      var r = map(this.position.z, 0, width, 10, 0);
      
      ellipse(sx, sy, r, r);
    }
  

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
}var fft, noise, filter, soundFile;


function preload() {
  soundFile = loadSound();
}

function setup() {
  fill(255, 40, 255);

  filter = new p5.BandPass();

  noise = new p5.Noise();
  // disconnect unfiltered noise,
  // and connect to filter
  noise.disconnect();
  noise.connect(filter);
  noise.start(soundFile);

  fft = new p5.FFT();
}




function draw() {

  background(30);

  // set the BandPass frequency based on mouseX
  var freq = map(mouseX, 0, width, 20, 10000);
  filter.freq(freq);
  // give the filter a narrow band (lower res = wider bandpass)
  filter.res(50);

  // draw filtered spectrum
  var spectrum = fft.analyze();
  noStroke();
  for (var i = 0; i < spectrum.length; i++) {
    var x = map(i, 0, spectrum.length, 0, width);
    var h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h);
  }
    isMouseOverCanvas();

}
function isMouseOverCanvas() {
  var mX = mouseX, mY = mouseY;
  if (mX > 0 && mX < width && mY < height && mY > 0) {
    noise.amp(0.5, 0.2);
  } else {
    noise.amp(0, 0.2);
  }
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}// From http://natureofcode.com/

var particleSystem;

var separationWeight = 1.5;
var cohesionWeight = 0.2;
var alignmentWeight = 1.3;
var maxSpeed = 3.0;
var maxForce = 0.05;

function setup() {
    createCanvas(windowWidth, windowHeight);
    stroke('#e4eefd');
    strokeWeight(0.5);

    particleSystem = new ParticleSystem();
    var startPosition = createVector(windowWidth/2, windowHeight/2)

    for (var i = 0; i < 100; i++) {
        particleSystem.addParticle(new Particle(startPosition));
    }
}

function draw() {
    background('#0f5bc2');
    particleSystem.run();
}

$(document).ready(function () {
    $('#separationSlider').on('change', function() {
        separationWeight = this.value;
    });

    $('#cohesionSlider').on('change', function() {
        cohesionWeight = this.value;
    });

    $('#alignmentSlider').on('change', function() {
        alignmentWeight = this.value;
    });

    $('#maxSpeedSlider').on('change', function() {
        maxSpeed = this.value;
    });

    $('#maxForceSlider').on('change', function() {
        maxForce = this.value;
    });

    $('.menu-toggle').on('click', function() {
        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
            $('#menu').animate({marginLeft: '-200px'}, 500);
        } else {
            $(this).addClass('open');
            $('#menu').animate({marginLeft: '0px'}, 500);
        }
    });
});

var Particle = function(position) {
    this.position = position.copy();
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.acceleration = createVector(0, 0);
    this.r = 10;
}

Particle.prototype.run = function(boids) {
    this.flock(boids);
    this.update();
    this.borders();
    this.display();
}

Particle.prototype.flock = function(boids) {
    var separation = this.aggregateSeparation(boids);
    var alignment = this.aggregateAlignment(boids);
    var cohesion = this.aggregateCohesion(boids);

    separation.mult(separationWeight);
    alignment.mult(alignmentWeight);
    cohesion.mult(cohesionWeight);

    this.acceleration.add(separation);
    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
}

Particle.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
}

Particle.prototype.borders = function() {
    if (this.position.x < -this.r) this.position.x = windowWidth + this.r;
    if (this.position.y < -this.r) this.position.y = windowHeight + this.r;
    if (this.position.x > windowWidth + this.r) this.position.x = -this.r;
    if (this.position.y > windowHeight + this.r) this.position.y = -this.r;
}

Particle.prototype.display = function() {
    push();
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading() + radians(180));
    beginShape();
    fill(175);
    stroke(255);
    strokeWeight(1);
    vertex(0, 0);
    vertex(16, -6);
    vertex(13, 0);
    vertex(16, 6);
    scale(0.75);
    endShape(CLOSE);
    pop();
}

Particle.prototype.aggregateSeparation = function(boids) {
    var neighbourDistance = 25.0;
    var steer = createVector(0, 0);

    var count = 0.0;
    var numberOfBoids = boids.length;
    var currentPosition = this.position.copy();

    for (var i = 0; i < numberOfBoids; i++) {
        var distance = currentPosition.dist(boids[i].position);
        if (distance > 0 && distance < neighbourDistance) {
            var diff = currentPosition.sub(boids[i].position);
            diff.normalize();
            diff.div(distance);
            steer.add(diff);
            count++;
        }
    }

    if (count > 0) {
        steer.div(count);
    }

    // As long as the vector is greater than 0
    if (steer.mag() > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.normalize();
      steer.mult(maxSpeed);
      steer.sub(this.velocity);
      steer.limit(maxForce);
    }
    return steer;
}

Particle.prototype.aggregateAlignment = function(boids) {
    var neighbourDistance = 25;
    var sum = new createVector(0, 0);

    var count = 0;
    var numberOfBoids = boids.length;
    var currentPosition = this.position.copy();

    for (var i = 0; i < numberOfBoids; i++) {
        var distance = currentPosition.dist(boids[i].position);
        if (distance > 0 && distance < neighbourDistance) {
            sum.add(boids[i].velocity);
            count++;
        }
    }

    if (count > 0) {
        sum.div(count);
        sum.normalize();
        sum.mult(maxSpeed);
        var steer = sum.sub(this.velocity);
        steer.limit(maxForce);
        return steer;
    }
    return createVector(0,0);
}

Particle.prototype.aggregateCohesion = function(boids) {
    var neighbourDistance = 100;
    var sum = createVector(0, 0);

    var count = 0;
    var numberOfBoids = boids.length;
    var currentPosition = this.position.copy();

    for (var i = 0; i < numberOfBoids; i++) {
        var distance = currentPosition.dist(boids[i].position);
        if (distance > 0 && distance < neighbourDistance) {
            sum.add(boids[i].position);
            count++;
        }
    }

    if (count > 0) {
        sum.div(count);
        return this.seek(sum);
    }
    return createVector(0,0);
}

Particle.prototype.seek = function(target) {
    // A vector pointing from the location to the target
    var desired = target.sub(location);

    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(maxSpeed);

    // Steering = Desired minus Velocity
    var steer = desired.sub(this.velocity);
    steer.limit(maxForce);
    return steer;
}

var ParticleSystem = function() {
    this.particles = [];
}

ParticleSystem.prototype.addParticle = function(b) {
    this.particles.push(b);
}

ParticleSystem.prototype.run = function() {
    var numberOfBoids = this.particles.length;
    for (var i = 0; i < numberOfBoids; i++) {
        this.particles[i].run(this.particles);
    }
}function setup() { 
  createCanvas(400, 400);
  background(220);
} 

function touchMoved() { 
  ellipse(mouseX, mouseY, 20, 20);
}var circle = [];




function setup() {
  createCanvas(400, 400);


}

function draw() {
  background(220);

  for (var a = 0; a < circle.length; a++) {


    circle[a].show();


  }
}

function mousePressed() {

  let c = new Circle(mouseX, mouseY);
  circle.push(c);
}


class Circle{
  
  constructor(x,y){
  this.x = x;
  this.y = y;
  }  
 show(){
  fill(255);
  ellipse(this.x, this.y, 10, 10);
  
 }
}// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Example 16-11: Simple color tracking

var video;

var balls = [];
// XY coordinate of closest color

// A variable for the color we are searching for.
var trackColor;

function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width, height);
  // The above function actually makes a separate video
  // element on the page.  The line below hides it since we are
  // drawing the video to the canvas
  video.hide();
  angleMode(DEGREES);



  // Start off tracking for red

  trackColor = [255, 255, 255];
}

function draw() {


  // Draw the video
 
//background(0);
  // We are going to look at the video's pixels
  video.loadPixels();
  //loadPixels();
 image(video,0,0);
  // Before we begin searching, the "world record" for closest color is set to a high number that is easy for the first pixel to beat.
  var worldRecord = 500;

  // XY coordinate of closest color
  var closestX = 0;
  var closestY = 0;


  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {

      var loc =( x +y * video.width) * 4;
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
    // fill(trackColor);
    // strokeWeight(4.0);
    // stroke(0);
    // ellipse(closestX, closestY, 16, 16);
    for (var i = 0; i < balls.length; i++) {
      balls[i].update();
      balls[i].render();
      if (balls[i].ballisFinished()) {
        balls.splice(i, 1);
      }

    }

 for(var a = 0; a<10; a++){
    balls.push(new Ball((closestX + random(-30, 30)), closestY + random(-30, 30), closestX, closestY));

 }

  }


//updatePixels();

}var balls = [];

var slider;

function setup() {
  createCanvas(600, 600);

  slider = createSlider(0, 360, 180, 40);
  slider.position(260, 610);
  slider.style('width', '80px');

}

function draw() {
  background(0);

  for (var i = 0; i < balls.length; i++) {
    balls[i].update();
    balls[i].render();
    if (balls[i].ballisFinished()) {
      balls.splice(i, 1);
    }
  }
}

function mousePressed() {
  if (mouseY < 600) {
    for (var i = 0; i < slider.value(); i++) {
      balls.push(new Ball((mouseX + random(-30, 30)), mouseY + random(-30, 30)));
    }
  }
}var video;
var vScale  = 16; 
var slider;

function setup(){

createCanvas(640, 480);
video = createCapture(VIDEO);
video.size (width/ vScale, height/ vScale);
pixelDensity(1);
slider = createSlider(0, 255, 127); //127 is the startpoint 
}
 
function draw(){

background(51);
video.loadPixels(); 
loadPixels();

for(var y= 0; y<video.height; y++){
for(var x = 0; x<video. width; x++){
 var index = (x + y*video.width)*4;
 var r = video.pixels[index+0];
 var g = video.pixels[index+1];
 var b = video.pixels[index+2];

var bright = (r+g+b)/3;  //average of color 
var threshold = slider.value();

if(bright > threshold){
fill(255);
}else{
fill(0);
}

var w = map(bright, 0, 255, 0, vScale);
noStroke();
rectMode(CENTER); 
//fill(bright);
rect(x*vScale, y*vScale, vScale, vScale);
}
}
//updatePixels();
}
let img;
let song;
let sliderRate;
let sliderPan;
let button;
let amp;
let mic;
var dragging = false;
var mini = [];

function preload() {
  song = loadSound("banana.mp3");

  img = loadImage("minion.png")


}

function setup() {
  createCanvas(1000, 800);

  mic = new p5.AudioIn();
  mic.start();
  //make image on the canvas
  //  img.hide();

  //make slider to control the rate and pan for music
  sliderRate = createSlider(0, 2, 1, 0.01);
  sliderPan = createSlider(-1, 1, 0, 0.01);
  //make start and pause button 
  button = createButton("Banana");
  button.mousePressed(togglePlaying);

  //amplitude
  amp = new p5.Amplitude();

}
//function for play and pause button
function togglePlaying() {
  if (!song.isPlaying()) {
    song.play();
    button.html("NoBanana")
  } else {

    song.pause();
    button.html("Banana")
  }
}

function loaded() {


}

function draw() {
  background(255);
  //using mic
  //drawMini(0, 0);
  //         for (var i = 0; i < 10; i++) {
  //                 if (frameCount / (200 * i) > 0) {
  //                         push()
  //                         translate(300+i*2, 200+i*i+300);
  //                         scale(0.5);
  //                         drawMini();
  //                         pop();
  //                 }

  //         }

  //console.log(vol);
  if (dragging) {
   //push();
 for( var i = 0; i< mini.length; i++){
    //translate(mouseX, mouseY);
    mini.push(drawMini(mouseX, mouseY));
   console.log(mini);
   
 }
    //pop();
  }

  song.rate(sliderRate.value());
  song.pan(sliderPan.value());
}

function mousePressed() {

  dragging = true;


}

function mouseReleased() {
  // Stop dragging
  dragging = false;
}

//   	drawMini();


function drawMini(x, y) {
  var vol = mic.getLevel();
  image(img, x, y);
  noStroke();
  fill(63, 8, 8);
  ellipse(x, y, 100, vol * 200);

}let img;
let song;
let sliderRate;
let sliderPan;
let button;
let amp;
let mic;
var dragging = false;
var mini = [];

function preload() {
        song = loadSound("banana.mp3");

        img = loadImage("minion.png")


}

function setup() {
        createCanvas(1000, 800);

        mic = new p5.AudioIn();
        mic.start();
        //make image on the canvas
        //  img.hide();

        //make slider to control the rate and pan for music
        sliderRate = createSlider(0, 2, 1, 0.01);
        sliderPan = createSlider(-1, 1, 0, 0.01);
        //make start and pause button 
        button = createButton("Banana");
        button.mousePressed(togglePlaying);
        
        //amplitude
        amp = new p5.Amplitude();

}
//function for play and pause button
function togglePlaying() {
        if (!song.isPlaying()) {
                song.play();
                button.html("NoBanana")
        } else {

                song.pause();
                button.html("Banana")
        }
}

function loaded() {


}

function draw() {
        background(255);
        //using mic
	//drawMini(0, 0);
//         for (var i = 0; i < 10; i++) {
//                 if (frameCount / (200 * i) > 0) {
//                         push()
//                         translate(300+i*2, 200+i*i+300);
//                         scale(0.5);
//                         drawMini();
//                         pop();
//                 }

//         }

        //console.log(vol);
    if(dragging){
      //translate(mouseX, mouseY);
      mini.push(drawMini(mouseX,mouseY));
      
    }
  
  

        song.rate(sliderRate.value());
        song.pan(sliderPan.value());
}

 function mousePressed() {
        
  dragging = true;
  

  }

function mouseReleased() {
  // Stop dragging
  dragging = false;
}
  	
//   	drawMini();
  

function drawMini(x, y) {
        var vol = mic.getLevel();

        
        image(img, x, y);
        noStroke();
        fill(63, 8, 8);
        ellipse(935, 630, 100, vol * 200);

}// var portName = '/dev/cu.usbmodem1411';
// var serial;
var rotateangle = 0;
var rotateangle1 = 0;



function setup() {
  createCanvas(800, 600);
  // serial = new p5.SerialPort();
  // serial.open(portName);
  // serial.on('data', gotData);
}

function draw() {
  background(139, 201, 224);


  //cloud
  push();
  noStroke();
  fill(255);
  ellipse(400, 200, 200, 200);
  ellipse(280, 250, 160, 160);
  ellipse(520, 240, 150, 150);
  ellipse(460, 320, 210, 170);
  ellipse(300, 330, 150, 150);
  ellipse(190, 290, 120, 120);
  ellipse(580, 300, 120, 110);

  //eyes

  noStroke();
  fill(0);
  ellipse(310, 260, 22, 22);
  ellipse(460, 260, 22, 22);

  //cheek
  fill(230, 144, 143);
  ellipse(280, 280, 35, 15);
  ellipse(490, 280, 35, 15);

  //mouth
  pop();
  push();
  noFill();
  strokeWeight(4);
  arc(375, 270, 20, 20, 0, PI, OPEN);
  arc(395, 270, 20, 20, 0, PI, OPEN);



  //arms

  noFill();
  stroke(255);
  strokeWeight(5);

  //push();
  // if (rotateangle1 > 80) {
  //beginShape();
  
  //endShape(CLOSE);
  
  //pop();
  curve(100, 310, 600, 300, 680, 400, 520, 350);
  ellipse(670, 416, 40, 30);
  // } else {
  // curve(500, 300, 150, 300, 50, 400, 220, 550);
  // ellipse(70, 400, 40, 30);
  // }

push();
  
  var t = map(mouseX, 0, width, -5, 5);
  curveTightness(t);
  drawarm();
  
  pop();

  pop();
  //leg

  push();
  noFill();
  stroke(255);
  strokeWeight(5);
  curve(500, 510, 350, 380, 350, 520, 520, 550);
  curve(400, 910, 450, 380, 450, 520, 220, 550);
  ellipse(330, 528, 50, 30)
  ellipse(470, 528, 50, 30)



  //shoes
  //         pop();
  //         push();
  //         noFill();

  //         stroke(255);
  //         strokeWeight(5);
  //         ellipse(280,560,50, 30)
  //         ellipse(373,570,50, 30)



  pop();


  //         //glasses
  //         stroke(0);
  //         strokeWeight(8);
  //         line(220, 200, 300, 250);
  //         line(580, 200, 450, 250);

  //         line(290, 250, 480, 250);
  //         fill(0)
  //         rect(280, 230, 70, 68, 20, 20, 30, 20);

  //         rect(430, 230, 70, 68, 20, 20, 20, 30);


}
function drawarm(){
  
  curve(500, 310, 150, 300, 100, 200, 220, 350);
  ellipse(110, 186, 40, 30);
  
}

// function gotData() {
//         var inData = serial.readLine();

//         var values = inData.split(' ');

//         if (inData.length > 0) {


//                 // rotateangle = int(values[0]);

//                 rotateangle1 = int(values[1]);
//          // print(values);
//                 console.log(rotateangle1);
//         }
// }var video;

function setup(){

createCanvas(320, 240);
video = createCapture(VIDEO);
video.size (320, 240);
pixelDensity(1);
}
 
function draw(){

background(51);
video.loadPixels(); 
loadPixels();

for(var y= 0; y<height; y++){
for(var x = 0; x<width; x++){
 var index = (x+y*width)*4;
 var r = video.pixels[index+0];
 var g = video.pixels[index+1];
 var b = video.pixels[index+2];

var bright = (r+g+b)/3  ;

pixels[index] = bright;
pixels[index+1] = bright;
pixels[index+2] = bright;
pixels[index+3] = 255;
}
}



updatePixels();
 
}
function setup(){

createCanvas(320, 240);

pixelDensity(1);
}
 
function draw(){
background(51);

loadPixels();

for(var y= 0; y<height; y++){
for(var x = 0; x<width; x++){
 var index = (x+y*width)*4;
pixels[index] = x;
pixels[index+1] = random(255) ;
pixels[index+2] = y; 
pixels[index+3] = 255;
}
}



updatePixels();

}var mic;

function setup() {
  createCanvas(200, 200);
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(0);
  var vol = mic.getLevel(); 

  console.log(vol);
  stroke(255);
  fill(175);
  ellipse(100, 100, 200, 1 + vol * 200);
}var balls = [];
var mic;
var index = -1;
var pastSecond = 0;

var lyrics = ['HAPPY', 'Birthday', 'ICM',
  'WE', 'ARE', 'HERE', 'this', 'FRIDAY',
  'CELEBRATING', 'DANIEL', 'SHIFFMAN',
  'MAKING', 'VIDEOS', 'ALL', 'DAY'
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  mic = new p5.AudioIn();
  mic.start();
  // slider = createSlider(0, 360, 180, 40);
  // slider.position(260, 610);
  // slider.style('width', '80px');

}

function draw() {
  background(0);
  var vol = mic.getLevel();

  //console.log(vol);


  var lyric = song();

  textSize(100);
  text(lyrics[index], width/2, height/2);

  for (var i = 0; i < balls.length; i++) {
    balls[i].update();
    balls[i].render();
    if (balls[i].ballisFinished()) {
      balls.splice(i, 1);
    }
  }



  //for (var a = 0; a < vol.length; a++) {
  balls.push(new Ball((random(0, width)), random(0, height), vol));


  //}

push();
  
  stroke(255);
  fill(249, 212, 35);
  ellipse(250, 250, 280, 280);
  fill(255, 78, 80);
  strokeWeight(2);
  ellipse(250, 300, 80, 1 + vol * 400);
  fill(0);
  stroke(0)
  strokeWeight(8);
  ellipse(210, 210, 25, 1 + vol * 250);
  ellipse(290, 210, 25, 1 + vol * 250);
  noFill(0);
  ellipse(290, 210, 25, 1 + vol * 300);
  strokeWeight(5);

  ellipse(210, 220, 70, 60);
  ellipse(290, 220, 70, 60);
  line(115, 195, 390, 200);

pop();




}


function song() {
  var currentSecond = second();
  // var sec = second();
  // console.log('c:', currentSecond);
  // console.log(pastSecond);

  if (currentSecond > pastSecond + 0.5) {

    index++;
    // console.log(index);
    pastSecond = currentSecond;


  }

}var video;
var button;
var snapshots = [];
var counter = 0;
var total = 43;

function setup(){
 createCanvas(800,240);
background(51);
video = createCapture(VIDEO, ready );
video.size(320, 240);
//button = createButton(‘snap’);
//button.mousePressed(takesnap);
}

var go = false;
function ready(){
go = true; 
}

//function takesnap(){

//image(video, 0, 0);
//snapshots.push(video.get());

//}

function draw(){
if(go){
  snapshots[counter] = video.get();
  counter++;
  if(counter == total){
      counter = 0;
  }

}
var w = 80;
var h = 60;
var x= 0;
var y = 0;

for(var i = 0; i<snapshots.length; i++){

var index = (i+ frameCount) % snapshots.length ;

image(snapshots[index],  x, y, w, h);
x = x+w ;
if(x > width){
x=0;
y=y+h; 
}
}

}let img;
let x, y;

function setup() {
  createCanvas(640, 480);
  x = width / 2;
  y = height / 2;
  background(0);
  img = createCapture(VIDEO);
  //img.hide();
}

function draw() {
  //image(img,0,0);
  for (let i = 0; i < 25; i++) {
    let x = floor(random(width));
    let y = floor(random(height));
    let col = img.get(x, y);
    col[3] = 50;
    //console.log(col);
    fill(col);
    noStroke();
    ellipse(x, y, 30);
  }

  // x += random(-50, 50);
  // y += random(-50, 50);
  // x = constrain(x, 0, width);
  // y = constrain(y, 0, height);



}let img;
let x, y;

// function preload(){
//  img = createImg('https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=0ahUKEwj_-c3f2IzXAhVJ6CYKHRFaAm8QjRwIBw&url=https%3A%2F%2Fwww.thinglink.com%2Fscene%2F904410415369289731&psig=AOvVaw2Z-VS1tgQeFiXg6r8eKWg4&ust=1509051940612660'); 
// }

function setup() {
  createCanvas(640, 480);
  background(0);
  x = width / 2;
  y = height / 2;
  img = createCapture(VIDEO);
  //img.hide();

}

function draw() {
  let col = img.get(x, y);
  col[3] = 100;
  fill(col);
  noStroke();
  ellipse(x, y, 60);
  // image(img, 0, 0);

  x += random(-50, 50);
  y += random(-50, 50);
  x = constrain(x, 0, width);
  y = constrain(y, 0, height);



}let img;
let x, y;

// function preload(){
//  img = createImg('https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=0ahUKEwj_-c3f2IzXAhVJ6CYKHRFaAm8QjRwIBw&url=https%3A%2F%2Fwww.thinglink.com%2Fscene%2F904410415369289731&psig=AOvVaw2Z-VS1tgQeFiXg6r8eKWg4&ust=1509051940612660'); 
// }

function setup() {
  createCanvas(640, 480);
  background(0);
  x = width / 2;
  y = height / 2;
  img = createCapture(VIDEO);
  //img.hide();

}

function draw() {
  let col = img.get(x, y);
  col[3] = 100;
  fill(col);
  noStroke();
  ellipse(x, y, 60);
  // image(img, 0, 0);

  x += random(-50, 50);
  y += random(-50, 50);
  x = constrain(x, 0, width);
  y = constrain(y, 0, height);



}let img;

function preload(){
 img = createImg('https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=0ahUKEwj_-c3f2IzXAhVJ6CYKHRFaAm8QjRwIBw&url=https%3A%2F%2Fwww.thinglink.com%2Fscene%2F904410415369289731&psig=AOvVaw2Z-VS1tgQeFiXg6r8eKWg4&ust=1509051940612660'); 
}

function setup() { 
  createCanvas(736, 736);
  background(0);
} 

function draw() { 
  
  image(img, 0, 0);
}let weather;
let x = 36;
let y = 36;
let xdirection = 1;
let ydirection = 1;

let input;
let button;


let api = 'https://api.openweathermap.org/data/2.5/weather?q=NewYork';
let apiKey = '&APPID=3a6c728f7ad54686e4fda6ce19821184';
let units = '&units=metric';

function preload() {
  leaf = loadImage("images/leaf.png");
}

function setup() {
  createCanvas(600, 400);
  input = createInput('New York');
  button = createButton('submit');
  button.mousePressed(weatherAsk);
  weatherAsk();
}


function weatherAsk() {
  let url = api + apiKey + units;
  loadJSON(encodeURI(url), gotData);
}

function gotData(data) {
  weather = data;
}

function draw() {
  background(207, 242, 255);
  image(leaf, x, y, 70, 70);

  if (weather) {
    let windspeed = weather.wind.speed;
    console.log(windspeed);
//    let ywindspeed = weather.wind.speed;
    x += windspeed * xdirection;
    y += windspeed * ydirection;
//    y += ywindspeed;
    if (x > width - 70 || x < 0) {
    	xdirection *= -1;
  	}
    if (y > height - 70 || y < 0) {
    	ydirection *= -1;
      
  	}
    
  }
}let data;

function preload() {


  data = loadJSON('https://raw.githubusercontent.com/dariusk/corpora/master/data/materials/gemstones.json');


}

function setup() {
  createCanvas(400, 400);
  background(0);
  createP(data.description);
  createA(data.source, 'source');
  
  for(let i = 0; i<data.gemstones.length; i++){
    
    fill(255);
    textAlign(CENTER);
    text(data.gemstones[i], random(width), random(height));
  }
  console.log(data);
}

function draw() {
  //background(220);
}function setup() { 
  createCanvas(400, 400);
  let button = createButton('test');
  let input = createInput('name');
  
  button.mousePressed(press);
  
  function press(){
    
    button.html('set' + int(random(10)));
    input.html('name');
    
    
  }
} 

function draw() { 
  background(220);
}let p;

function setup() {

  let canvas = createCanvas(400, 400);
  particle = new Particle();
  background(0);
  canvas.mousePressed(addCircle);
  particle.show();
  canvas.mousePressed(function showParticle() {
    particle.show();

  });

  
}

function addCircle() {
  fill(255);
  //ellipse(random(width), random(height), 64);
}

class Particle {

  constructor() {
    this.x = 100;
    this.y = 100;
  }

  show() {
    ellipse(this.x, this.y, 64);

  }

}
var serial;
var portName= '/dev/cu.usbmodem1441';
var circles=[];
var inData;
var inDatap5;
var outByte = 0;

function setup() { 
  createCanvas(400, 500);
  angleMode(DEGREES);
  
  //circle(radius, number of lines, rotate direction);
  for(let i = 1; i < 13; i++)
  {
    let direction = "right";
    if(i%2 == 0) //if i equals even
    {
      direction = "left";
    }
   	let c = new Circle(30*i, 20*i, direction);
    circles.push(c);
  }
  
  slider = new Slider();
  
  serial = new p5.SerialPort();
  serial.open(portName);
  serial.on('data', parseData);
  
} 

function parseData(){
  
   var inString= serial.readLine();
   if(inString.length > 0 )
  {
  
    inData = Number(inString);
    // print(inData);
  }
  var inByte = serial.read();
  inDatap5 = inByte;
  
}




function draw() { 
	push(); 
  background(200);
  translate(200, 200);
  for(let i = 0; i < circles.length; i++)
  {
   	//circles[i].drawLines(); 
    circles[i].show(); 
  }
  pop();
  push();
  //slider.move();
  pop();
}
function mouseDragged(){
  outByte = int(map(mouseX, 0, width, 0, 255));
  serial.write(outByte)
  
  
}
function mousePressed() {
  // Did I click on slider?
  if (mouseX > slider.x && mouseX < slider.x + slider.w && mouseY > slider.y && mouseY < slider.y + slider.h) {


    slider.dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    slider.offsetX = slider.x - mouseX;
  }
}

function mouseReleased() {
  // Stop dragging
  slider.dragging = false;
}/*
  Make sure you add the p5.serialport.js file
  to your project folder and include it in 
  your index.html.
  
  You'll also need to have the p5.serialControl
  app open.
  
  Make sure you only have one program accessing
  the Arduino's serial port at a time. For example,
  you cannot have the Arduino serial monitor open
  while trying to read serial data in p5.
  
  For a full tutorial:
  https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-input-to-the-p5-js-ide/
*/

var portName = '/dev/cu.usbmodem1421';
var serial;
var bg = 0;
var col = 255;
var button = 1;

function setup() { 
  createCanvas(400, 400);
  
  serial = new p5.SerialPort();
  serial.open(portName);
  
  /*
    Whenever data is received, the parseData()
    function defined below will run.
  */
  serial.on('data', gotData);
} 

function draw() { 
  background(bg);
  
  if (button == 0){
    noStroke();
    fill(col);
    ellipse(200,200,100);
  }
}

function gotData(){
  var inData = serial.readLine();
  
  /*
    parseData() will run every time data
    is received on p5's serial connection.
    serial.readLine() will return empty
    strings until p5 receives a carriage return
    - Serial.println() in Arduino. The if
    statement below filters these out and only
    updates our variables when we receive a
    complete batch of data - in our case, the
    three sensor values. Uncomment the else
    statement at the bottom to see how often
    serial.readLine() is returning empty strings.
  */
  if (inData.length > 0){
    print(inData);
    
    /*
      Here I'm using the native js version of split.
      Below that you can see the p5 version 
      of split, which is commented out.
    */
    var values = inData.split(',');
    // var values = splitTokens(values, ',');
    
    /*
      Once we split the received data into
      individual values, we still need to convert
      them from strings to integers.
    */
    button = int(values[0]);
    bg = int(map(values[1], 0, 1023, 0, 255));
    col = int(map(values[2], 0, 1023, 0, 255));
  }
  
  // else {
  //   print('no data');
  // }
}
var serial;
var portName= '/dev/cu.usbmodem1441';
var circles=[];
var inData;

function setup() { 
  createCanvas(400, 500);
  angleMode(DEGREES);
  
  //circle(radius, number of lines, rotate direction);
  for(let i = 1; i < 13; i++)
  {
    let direction = "right";
    if(i%2 == 0) //if i equals even
    {
      direction = "left";
    }
   	let c = new Circle(30*i, 20*i, direction);
    circles.push(c);
  }
  
  slider = new Slider();
  
  serial = new p5.SerialPort();
  serial.open(portName);
  serial.on('data', parseData);
  
} 

function parseData(){
  
   var inString= serial.readLine();
   if(inString.length > 0 )
  {
  
    inData = Number(inString);
    // print(inData);
  }
  
}




function draw() { 
	push();
  background(200);
  translate(200, 200);
  for(let i = 0; i < circles.length; i++)
  {
   	//circles[i].drawLines(); 
    circles[i].show(); 
  }
  pop();
  push();
  //slider.move();
  pop();
}

function mousePressed() {
  // Did I click on slider?
  if (mouseX > slider.x && mouseX < slider.x + slider.w && mouseY > slider.y && mouseY < slider.y + slider.h) {


    slider.dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    slider.offsetX = slider.x - mouseX;
  }
}

function mouseReleased() {
  // Stop dragging
  slider.dragging = false;
}
var serial;
var portName= '/dev/cu.usbmodem1441';
var circles=[];
var inData;

function setup() { 
  createCanvas(400, 500);
  angleMode(DEGREES);
  
  //circle(radius, number of lines, rotate direction);
  for(let i = 1; i < 13; i++)
  {
    let direction = "right";
    if(i%2 == 0) //if i equals even
    {
      direction = "left";
    }
   	let c = new Circle(30*i, 20*i, direction);
    circles.push(c);
  }
  
  slider = new Slider();
  
  serial = new p5.SerialPort();
  serial.open(portName);
  serial.on('data', parseData);
  
} 

function parseData(){
  
   inData= serial.readLine();
   if(inData.length > 0 )
  {
  
    inData = int(inData);
    // print(inData);
  }
  
}




function draw() { 
	push();
  background(200);
  translate(200, 200);
  for(let i = 0; i < circles.length; i++)
  {
   	circles[i].drawLines(); 
    circles[i].updateRotation(); 
  }
  pop();
  push();
  slider.move();
  pop();
}

function mousePressed() {
  // Did I click on slider?
  if (mouseX > slider.x && mouseX < slider.x + slider.w && mouseY > slider.y && mouseY < slider.y + slider.h) {


    slider.dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    slider.offsetX = slider.x - mouseX;
  }
}

function mouseReleased() {
  // Stop dragging
  slider.dragging = false;
}var circles = [];
var serial;
var portName = '/dev/cu.usbmodem1441';




function setup() {
  createCanvas(400, 500);
  angleMode(DEGREES);
  for (let i = 1; i < 13; i++) {
    let direction = "right";
    if (i % 2 == 0) //if i equals even
    {
      direction = "left";
    }
    let c = new Circle(30 * i, 20 * i, direction);
    circles.push(c);
  }
  serial = new p5.SerialPort();
  serial.open(portName);
  slider = new Slider();
  serial.on('data', slider.move); //need to use slider instead of Slider!
  //circle(radius, number of lines, rotate direction);  

}

function draw() {
  push();
  background(200);
  translate(200, 200);
  for (let i = 0; i < circles.length; i++) {
    circles[i].show();
  }
  pop();
  push();
  //slider.move();
  pop();
  //slider.parseData();
}

function mousePressed() {
  // Did I click on slider?
  if (mouseX > slider.x && mouseX < slider.x + slider.w && mouseY > slider.y && mouseY < slider.y + slider.h) {


    slider.dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    slider.offsetX = slider.x - mouseX;
  }
}

function mouseReleased() {
  // Stop dragging
  slider.dragging = false;
}var circles = [];
var serial;
var portName = '/dev/cu.usbmodem1441';




function setup() {
  createCanvas(400, 500);
  angleMode(DEGREES);
  for (let i = 1; i < 13; i++) {
    let direction = "right";
    if (i % 2 == 0) //if i equals even
    {
      direction = "left";
    }
    let c = new Circle(30 * i, 20 * i, direction);
    circles.push(c);
  }
  serial = new p5.SerialPort();
  serial.open(portName);
  slider = new Slider();
  serial.on('data', c.show); //need to use slider instead of Slider!
  //circle(radius, number of lines, rotate direction);
  

  

}

function draw() {
  push();
  background(200);
  translate(200, 200);
  for (let i = 0; i < circles.length; i++) {
    circles[i].show();
  }
  pop();
  push();
  slider.move();
  pop();
  //slider.parseData();
}

function mousePressed() {
  // Did I click on slider?
  if (mouseX > slider.x && mouseX < slider.x + slider.w && mouseY > slider.y && mouseY < slider.y + slider.h) {


    slider.dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    slider.offsetX = slider.x - mouseX;
  }
}

function mouseReleased() {
  // Stop dragging
  slider.dragging = false;
}var serial;
var portName= '/dev/cu.usbmodem1441';
var bg = 0;
var col = 255;
var button = 1;

function setup() { 
  createCanvas(400, 400);
  serial = new p5.SerialPort();
  serial.open(portName);
  serial.on('data', parseData);

 // serial.on('error', serialError);
  

} 

function draw() { 
  background(bg);
  // if(button == 0){
  // noStroke();
  // fill(col);
  // ellipse(200, 200, 100);
  // }
}

function parseData(){
//    serial.read();
//   if(serial.read().length > 0 )
//    {
//   	bg = serial.read();   
//    }
  
  
  var inData= serial.readLine();
  if(inData.length > 0 )
  {
    
    var values = inData.split(',');
    // var values = splitToken(inData, ',');
    
    //button = int(values[2]);
   // col = int(values[1]);
    bg = int(values[0]);
    print(bg);
   }
  
}function setup() { 
  createCanvas(400, 400);
  createP('Hello');
  createButton("submit");
  
} 

function draw() { 
  background(220);
  
}var circles=[];

function setup() { 
  createCanvas(400, 500);
  angleMode(DEGREES);
  //circle(radius, number of lines, rotate direction);
  for(let i = 1; i < 13; i++)
  {
    let direction = "right";
    if(i%2 == 0) //if i equals even
    {
      direction = "left";
    }
   	let c = new Circle(30*i, 20*i, direction);
    circles.push(c);
  }
  
  slider = new Slider();
  
  
} 

function draw() { 
	push();
  background(200);
  translate(200, 200);
  for(let i = 0; i < circles.length; i++)
  {
   	circles[i].show(); 
  }
  pop();
  push();
  slider.move();
  pop();
}

function mousePressed() {
  // Did I click on slider?
  if (mouseX > slider.x && mouseX < slider.x + slider.w && mouseY > slider.y && mouseY < slider.y + slider.h) {


    slider.dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    slider.offsetX = slider.x - mouseX;
  }
}

function mouseReleased() {
  // Stop dragging
  slider.dragging = false;
}var serial; // variable to hold an instance of the serialport library
 
function setup() {
 serial = new p5.SerialPort(); // make a new instance of the serialport library
// serial.on('list', printList); // set a callback function for the serialport list event
 
 //serial.list(); // list the serial ports
}
 
// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 println(i + " " + portList[i]);
 }
}

function draw() { 
  background(220);
}let x = 300;
let y = 300;
let lifespan = 255;

function setup() { 
  createCanvas(400, 400);
} 

function draw() {     
  background(220);
  
  fade();

  stroke(0,lifespan);
  line(0,0,x, y);
  
  x=x-0.1;
  y=y-0.1;

  
}


function fade(){
  
  
  
  lifespan = lifespan - 0.1;
  
  
  
}let circle;
let rotline;
let slider;

let R = [];

let arraySizes = [20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240];

function setup() {
  createCanvas(400, 500);

  circle = new Circle();
  slider = new Slider();

  angleMode(DEGREES);


  // R[0] = [];
  // R[1] = [];

  // for(let a = 0; a < arraySizes.length; a++) {
  //   R[a] = [];
  //   for(let b = 0; b < arraySizes[a]; b++) {
  //     R[a][b] = random(0,360);
  //   }
  // }

  for (let a = 0; a < arraySizes.length; a++) {

    R[a] = [];

    for (let b = 0; b < arraySizes[a]; b++) {
      R[a][b] = random(0, 360);
    }

  }




}

function draw() {

  background(220);

  push();
  circle.show(); //circle1-10
  pop();


  push(); // r1-lines
  translate(200, 200);
  
 
  rotate(slider.leftrotate);
  drawline(R[2]);
  
  pop();



  slider.move();

}





function drawline() {



  let y1 = -16;
  let y2 = -30;


  
  for (let a = 0; a < arraySizes.length; a++) {

    for (let b = 0; b < arraySizes[a]; b++) {

      rotate(R[a][b]);
      line(0, y1 - 15 * a, 0, y2 - 15 * a);
    }
  }
return R;
}



function mousePressed() {
  // Did I click on slider?
  if (mouseX > slider.x && mouseX < slider.x + slider.w && mouseY > slider.y && mouseY < slider.y + slider.h) {


    slider.dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    slider.offsetX = slider.x - mouseX;
  }
}

function mouseReleased() {
  // Stop dragging
  slider.dragging = false;
}// let r1 = []; //lines of circle 1
// let r2 = [];
// let r3 = [];
// let r4 = [];
// let r5 = [];
// let r6 = [];
// let r7 = [];
// let r8 = [];
// let r9 = [];
// let r10 = [];







//let R = new Array(R1);

let circle;
let rotline;
let slider;

let R = [];



// const arraySizes = [20, 40, 60, 80];


let arraySizes = [20, 40, 60, 80, 100, 120, 140, 160, 180, 200];

function setup() {
  createCanvas(400, 500);

  circle = new Circle();
  slider = new Slider();

  angleMode(DEGREES);


  // R[0] = [];
  // R[1] = [];

  // for(let a = 0; a < arraySizes.length; a++) {
  //   R[a] = [];
  //   for(let b = 0; b < arraySizes[a]; b++) {
  //     R[a][b] = random(0,360);
  //   }
  // }

  for (let a = 0; a < arraySizes.length; a++) {

    R[a] = [];

    for (let b = 0; b < arraySizes[a]; b++) {
      R[a][b] = random(0, 360);

    }



  }

  //   for (let a = 0; a < 20; a++) {

  //    R[0][a] = random(0,360);
  //   }

  //   for(let b = 0; b < 40; b++){

  //     R[1][b] = random(0,360);


  //   }
  //   for (let i = 0; i < 60; i++) {

  //     r3[i] = random(0, 360);

  //   }
  //   for (let i = 0; i < 80; i++) {

  //     r4[i] = random(0, 360);

  //   }
  //   for (let i = 0; i < 100; i++) {

  //     r5[i] = random(0, 360);

  //   }
  //   for (let i = 0; i < 120; i++) {

  //     r6[i] = random(0, 360);

  //   }
  //   for (let i = 0; i < 140; i++) {

  //     r7[i] = random(0, 360);

  //   }
  //   for (let i = 0; i < 160; i++) {

  //     r8[i] = random(0, 360);

  //   }

  //   for (let i = 0; i < 180; i++) {


  //     r9[i] = random(0, 360);

  //   }

  //   for (let i = 0; i < 200; i++) {


  //     r10[i] = random(0, 360);

  //   }


}

function draw() {

  background(220);
  push();
  circle.show(); //circle1-10
  pop();

  push(); // r1-lines
  translate(200, 200);
  rotate(slider.leftrotate);
  drawline1();
  pop();

  // push(); // r1-lines
  // translate(200, 200);
  // rotate(slider.rightrotate);
  // drawline2();
  // pop();

  //   push(); // r1-lines
  //   translate(200, 200);
  //   rotate(leftrotate);
  //   drawline3();
  //   pop();

  //   push(); // r1-lines
  //   translate(200, 200);
  //   rotate(rightrotate);
  //   drawline4();
  //   pop();


  //   push(); // r1-lines
  //   translate(200, 200);
  //   rotate(leftrotate);
  //   drawline5();
  //   pop();

  //   push(); // r1-lines
  //   translate(200, 200);
  //   rotate(rightrotate);
  //   drawline6();
  //   pop();

  //   push(); // r1-lines
  //   translate(200, 200);
  //   rotate(leftrotate);
  //   drawline7();
  //   pop();

  //   push(); // r1-lines
  //   translate(200, 200);
  //   rotate(rightrotate);
  //   drawline8();
  //   pop();

  //   push(); // r1-lines
  //   translate(200, 200);
  //   rotate(leftrotate);
  //   drawline9();
  //   pop();

  //   push(); // r1-lines
  //   translate(200, 200);
  //   rotate(rightrotate);
  //   drawline10();
  //   pop();

  slider.move();

}





function drawline1() {



  let y1 = -16;
  let y2 = -30;
  //   for (let a = 0; a < arraySizes.length; a++) {
  //     for (let b = 0; b < arraySizes[a]; b++) {





  //       for (let l = 0; l < 150; l+=15){

  //       rotate(R[0][b]);
  //       line(0, y1-l, 0, y2-l);

  //       }
  //     }
  //   }

  for (let a = 0; a < arraySizes.length; a++) {

    //R[a] = [];

    for (let b = 0; b < arraySizes[a]; b++) {

      for (let l = 0; l < 150; l += 15) {
        rotate(R[a][b]);
        line(0, y1 - l, 0, y2 - l);

      }

    }



  }

}

// function drawline2() {

//   for (var a = 0; a < 40; a++) {
//     rotate(R[1][a]);
//     line(0, -31, 0, -45);
//   }
// }

// function drawline3() {

//   for (var a = 0; a < r3.length; a++) {
//     rotate(r3[a]);
//     line(0, -46, 0, -60);
//   }
// }

// function drawline4() {

//   for (var a = 0; a < r4.length; a++) {
//     rotate(r4[a]);
//     line(0, -61, 0, -75);
//   }
// }

// function drawline5() {

//   for (var a = 0; a < r5.length; a++) {
//     rotate(r5[a]);
//     line(0, -76, 0, -90);
//   }
// }

// function drawline6() {

//   for (var a = 0; a < r6.length; a++) {
//     rotate(r6[a]);
//     line(0, -91, 0, -105);
//   }
// }


// function drawline7() {

//   for (var a = 0; a < r7.length; a++) {
//     rotate(r7[a]);
//     line(0, -106, 0, -120);
//   }
// }

// function drawline8() {

//   for (var a = 0; a < r8.length; a++) {
//     rotate(r8[a]);
//     line(0, -121, 0, -135);
//   }
// }

// function drawline9() {

//   for (var a = 0; a < r9.length; a++) {
//     rotate(r9[a]);
//     line(0, -136, 0, -150);
//   }
// }

// function drawline10() {

//   for (var a = 0; a < r10.length; a++) {
//     rotate(r10[a]);
//     line(0, -151, 0, -165);
//   }
// }



function mousePressed() {
  // Did I click on slider?
  if (mouseX > slider.x && mouseX < slider.x + slider.w && mouseY > slider.y && mouseY < slider.y + slider.h) {


    slider.dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    slider.offsetX = slider.x - mouseX;
  }
}

function mouseReleased() {
  // Stop dragging
  slider.dragging = false;
}let bubble1;
let bubble2;

function setup() {
  createCanvas(400, 400);
  bubble1 = new Bubble(400, 200, 24);
  bubble2 = new Bubble(200, 200, 24);
  // print(bubble.x, bubble.y);

}

function draw() {
  background(0);
  bubble1.move();
  bubble1.show();
  bubble2.move();
  bubble2.show();
}

class Bubble {

  constructor(unicorn, y, r) {
    this.unicorn = unicorn;
    this.y = y;
    this.r = r;


  }
  move(){
    this.unicorn = this.unicorn + random(-3,3);
    this.y = this.y + random(-3,3);
  }
  
  show(){
    stroke(255);
    strokeWeight(4);
    noFill();
    ellipse(this.unicorn, this.y, this.r*2, this.r*2);
    
  }
  
  
  
  
  

}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}// Bouncing ball
// no object

let bouncer;
let bouncer1;
let bouncer2 = [];



let gravity = 0.1;

function setup() {
  createCanvas(400, 400);

  // bouncer = new Ball(100, 200, 100);
  // bouncer1 = new Ball(300,100, 50);
  for (let i = 0; i < 200; i++) {

    let x = random(width);
    let r = random(12, 38);
    let y = random(height);

    bouncer2.push(new Ball(x, y, r));

  }
}


function draw() {
  background(255);
  //   bouncer.render();
  //   bouncer.update();

  //   bouncer1.render();
  //   bouncer1.update();
  for (let i = 0; i < bouncer2.length; i++) {
    bouncer2[i].render();
    bouncer2[i].update();


  }


}

// function draw() {
//   background(220);
//   fill(0);
//   ellipse(x, y, 24, 24);

//   y = y + speed;
//   speed = speed + gravity;
//   if (y > height) {
//     y = height;
//     speed = -0.95 * speed;
//   }
// }function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}let r1 = []; //lines of circle 1
let r2 = [];
let r3 = [];
let r4 = [];
let r5 = [];
let r6 = [];
let r7 = [];
let r8 = [];
let r9 = [];
let r10 = [];

let r1_1 = [];


var dragging = false; // Is the slider being dragged?
var rollover = false; // Is the mouse over the slider?


var x = 50;
var y = 430;
var w = 10;
var h = 50;
// Start and end of slider
var sliderStart = 50;
var sliderEnd = 350;
// Offset for dragging slider
var offsetX = 0;





function setup() {
  createCanvas(400, 500);
  angleMode(DEGREES);
  
  for (let i = 0; i < 20; i++) {
     
    r1[i] = random(0, 360);
  
  }
  for (let i = 0; i < 40; i++) {

    r2[i] = random(0, 360);

  }
  for (let i = 0; i < 60; i++) {

    r3[i] = random(0, 360);

  }
  for (let i = 0; i < 80; i++) {

    r4[i] = random(0, 360);

  }
  for (let i = 0; i < 100; i++) {

    r5[i] = random(0, 360);

  }
  for (let i = 0; i < 120; i++) {

    r6[i] = random(0, 360);

  }
  for (let i = 0; i < 140; i++) {

    r7[i] = random(0, 360);

  }
  for (let i = 0; i < 160; i++) {

    r8[i] = random(0, 360);

  }

  for (let i = 0; i < 180; i++) {


    r9[i] = random(0, 360);

  }

  for (let i = 0; i < 200; i++) {


    r10[i] = random(0, 360);

  }


}

function draw() {

  background(220);

  push(); // circle 1-10
  circle();
  pop();
  var leftrotate = map(x, sliderStart, sliderEnd - w, 0, 360);
  var rightrotate = map(x, sliderStart, sliderEnd - w, 0, -360);

  push(); // r1-lines
  translate(200, 200);
  rotate(leftrotate);
  drawline1();
  pop();

  push(); // r1-lines
  translate(200, 200);
  rotate(rightrotate);
  drawline2();
  pop();

  push(); // r1-lines
  translate(200, 200);
  rotate(leftrotate);
  drawline3();
  pop();

  push(); // r1-lines
  translate(200, 200);
  rotate(rightrotate);
  drawline4();
  pop();
  
  
  push(); // r1-lines
  translate(200, 200);
  rotate(leftrotate);
  drawline5();
  pop();

  push(); // r1-lines
  translate(200, 200);
  rotate(rightrotate);
  drawline6();
  pop();
  
  push(); // r1-lines
  translate(200, 200);
  rotate(leftrotate);
  drawline7();
  pop();

  push(); // r1-lines
  translate(200, 200);
  rotate(rightrotate);
  drawline8();
  pop();
  
  push(); // r1-lines
  translate(200, 200);
  rotate(leftrotate);
  drawline9();
  pop();
  
  push(); // r1-lines
  translate(200, 200);
  rotate(rightrotate);
  drawline10();
  pop();
  
  rotatelines();
}



function circle() {

  translate(200, 200);
  for (let circle = 1; circle <= 11; circle++) {
    noFill();

    ellipse(0, 0, circle * 30, circle * 30);

  }

}

function rotatelines(){
  
  if (dragging) {
    x = mouseX + offsetX;
  }
  // Keep rectangle within limits of slider
  x = constrain(x, sliderStart, sliderEnd - w);

  // Draw a line for slider
  stroke(0);
  line(sliderStart, y + h / 2, sliderEnd, y + h / 2);

  stroke(0);
  // Fill according to state
  if (dragging) {
    fill(50);
  } else {
    fill(175);
  }
  // Draw rectangle for slider
  rect(x, y, w, h);

 
}



function drawline1() {
   
  
  for (var a = 0; a < r1.length; a++) {
   
    rotate(r1[a]);
    //fill(r1_1[a]);
    line(0, -16, 0, -30);
  }
}


function drawline2() {

  for (var a = 0; a < r2.length; a++) {
    rotate(r2[a]);
    line(0, -31, 0, -45);
  }
}

function drawline3() {

  for (var a = 0; a < r3.length; a++) {
    rotate(r3[a]);
    line(0, -46, 0, -60);
  }
}

function drawline4() {

  for (var a = 0; a < r4.length; a++) {
    rotate(r4[a]);
    line(0, -61, 0, -75);
  }
}

function drawline5() {

  for (var a = 0; a < r5.length; a++) {
    rotate(r5[a]);
    line(0, -76, 0, -90);
  }
}

function drawline6() {

  for (var a = 0; a < r6.length; a++) {
    rotate(r6[a]);
    line(0, -91, 0, -105);
  }
}


function drawline7() {

  for (var a = 0; a < r7.length; a++) {
    rotate(r7[a]);
    line(0, -106, 0, -120);
  }
}

function drawline8() {

  for (var a = 0; a < r8.length; a++) {
    rotate(r8[a]);
    line(0, -121, 0, -135);
  }
}

function drawline9() {

  for (var a = 0; a < r9.length; a++) {
    rotate(r9[a]);
    line(0, -136, 0, -150);
  }
}

function drawline10() {

  for (var a = 0; a < r10.length; a++) {
    rotate(r10[a]);
    line(0, -151, 0, -165);
  }
}



function mousePressed() {
  // Did I click on slider?
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {


    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX = x - mouseX;
  }
}

function mouseReleased() {
  // Stop dragging
  dragging = false;
}



var boxes = []; //first circle-line variables 
var boxes1 = [];
var boxes2 = [];
var boxes3 = [];
var dragging = false; // Is the slider being dragged?
var rollover = false; // Is the mouse over the slider?


var x = 100;
var y = 25;
var w = 10;
var h = 50;
// Start and end of slider
var sliderStart = 50;
var sliderEnd = 350;
// Offset for dragging slider
var offsetX = 0;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);

  for (var i = 0; i < 20; i++) {
    boxes[i] = random(0, 360);
  } //first boxes line

  for (var i = 0; i < 20; i++) {
    boxes1[i] = random(0, 360);
  } //Second boxes line

  for (var i = 0; i < 50; i++) {
    boxes2[i] = random(0, 360);
  } //Second boxes line
  for (var i = 0; i < 7\0; i++) {
    boxes3[i] = random(0, 360);
  } //Second boxes line

}



function draw() {
  background(220);


  if (dragging) {
    x = mouseX + offsetX;
  }
  // Keep rectangle within limits of slider
  x = constrain(x, sliderStart, sliderEnd - w);

  // Draw a line for slider
  stroke(0);
  line(sliderStart, y + h / 2, sliderEnd, y + h / 2);

  stroke(0);
  // Fill according to state
  if (dragging) {
    fill(50);
  } else {
    fill(175);
  }
  // Draw rectangle for slider
  rect(x, y, w, h);

  //if(sliderStart)
  var r1 = map(x, sliderStart, sliderEnd - w, 0, -360); //range of 0-360



  push();
  translate(200, 200);
  noFill();
  ellipse(0, 0, 30, 30);


  rotate(r1);
  for (var a = 0; a < boxes.length; a++) {
    //randomSeed(5);


    rotate(boxes[a]);
    line(0, -16, 0, -30);

  }


  pop();



  push();

  translate(200, 200);
  noFill();
  ellipse(0, 0, 60, 60);


  var r2 = map(x, sliderStart, sliderEnd - w, -360, 0);

  rotate(r2);
  for (var a = 0; a < boxes1.length; a++) {



    rotate(boxes1[a]);


    line(0, -31, 0, -45);
  }

  pop();


  push();

  translate(200, 200);
  noFill();
  ellipse(0, 0, 90, 90);


  var r2 = map(x, sliderStart, sliderEnd - w, 360, 0);

  rotate(r2);
  for (var a = 0; a < boxes2.length; a++) {



    rotate(boxes2[a]);


    line(0, -46, 0, -60);
  }

  pop();


  push();

  translate(200, 200);
  noFill();
  ellipse(0, 0, 120, 120);


  var r3 = map(x, sliderStart, sliderEnd - w, -360, 0);

  rotate(r3);
  for (var a = 0; a < boxes2.length; a++) {



    rotate(boxes3[a]);


    line(0, -60, 0, -75);
  }

  pop();




}














function mousePressed() {
  // Did I click on slider?
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {


    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX = x - mouseX;
  }
}

function mouseReleased() {
  // Stop dragging
  dragging = false;
}var boxes = []; //first circle-line variables 
var boxes1 = [];
var boxes2 = [];
var boxes3 = [];
var dragging = false; // Is the slider being dragged?
var rollover = false; // Is the mouse over the slider?


var x = 100;
var y = 25;
var w = 10;
var h = 50;
// Start and end of slider
var sliderStart = 50;
var sliderEnd = 350;
// Offset for dragging slider
var offsetX = 0;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);

  for (var i = 0; i < 20; i++) {
    boxes[i] = random(0, 360);
  } //first boxes line

  for (var i = 0; i < 20; i++) {
    boxes1[i] = random(0, 360);
  } //Second boxes line

  for (var i = 0; i < 50; i++) {
    boxes2[i] = random(0, 360);
  } //Second boxes line
  for (var i = 0; i < 80; i++) {
    boxes3[i] = random(0, 360);
  } //Second boxes line

}



function draw() {
  background(220);


  if (dragging) {
    x = mouseX + offsetX;
  }
  // Keep rectangle within limits of slider
  x = constrain(x, sliderStart, sliderEnd - w);

  // Draw a line for slider
  stroke(0);
  line(sliderStart, y + h / 2, sliderEnd, y + h / 2);

  stroke(0);
  // Fill according to state
  if (dragging) {
    fill(50);
  } else {
    fill(175);
  }
  // Draw rectangle for slider
  rect(x, y, w, h);

  //if(sliderStart)
  var r1 = map(x, sliderStart, sliderEnd - w, 0, -360); //range of 0-360



  push();
  translate(200, 200);
  noFill();
  ellipse(0, 0, 30, 30);


  rotate(r1);
  for (var a = 0; a < boxes.length; a++) {
    //randomSeed(5);


    rotate(boxes[a]);
    line(0, -16, 0, -30);

  }


  pop();



  push();

  translate(200, 200);
  noFill();
  ellipse(0, 0, 60, 60);


  var r2 = map(x, sliderStart, sliderEnd - w, -360, 0);

  rotate(r2);
  for (var a = 0; a < boxes1.length; a++) {



    rotate(boxes1[a]);


    line(0, -31, 0, -45);
  }

  pop();


  push();

  translate(200, 200);
  noFill();
  ellipse(0, 0, 90, 90);


  var r2 = map(x, sliderStart, sliderEnd - w, 360, 0);

  rotate(r2);
  for (var a = 0; a < boxes2.length; a++) {



    rotate(boxes2[a]);


    line(0, -46, 0, -60);
  }

  pop();


  push();

  translate(200, 200);
  noFill();
  ellipse(0, 0, 120, 120);


  var r3 = map(x, sliderStart, sliderEnd - w, -360, 0);

  rotate(r3);
  for (var a = 0; a < boxes2.length; a++) {



    rotate(boxes3[a]);


    line(0, -60, 0, -75);
  }

  pop();




}














function mousePressed() {
  // Did I click on slider?
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {


    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX = x - mouseX;
  }
}

function mouseReleased() {
  // Stop dragging
  dragging = false;
}var boxes = []; //first circle-line variables 

var dragging = false; // Is the slider being dragged?
var rollover = false; // Is the mouse over the slider?


var x = 100;
var y = 25;
var w = 10;
var h = 50;
// Start and end of slider
var sliderStart = 100;
var sliderEnd = 400;
// Offset for dragging slider
var offsetX = 0;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  
  for(var i=0; i<5 ; i++){
    boxes[i]=random(0, 360);
  }

}






function draw() {
  background(220);

  
  if (dragging) {
    x = mouseX + offsetX;
  }
  // Keep rectangle within limits of slider
  x = constrain(x, sliderStart, sliderEnd-w);

  // Draw a line for slider
  stroke(0);
  line(sliderStart, y+h/2, sliderEnd, y+h/2);

  stroke(0);
  // Fill according to state
  if (dragging) {
    fill (50);
  } else {
    fill(175);
  }
  // Draw rectangle for slider
  rect(x, y, w, h);
  
  //if(sliderStart)
  var b = map(x,sliderStart,sliderEnd-w,0,360); //range of 0-360
  
  
  
  push();
  translate(200, 200);
  noFill();
  ellipse(0, 0, 30, 30);
  
// if(mouseIsPressed && mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h)
// { 
//   for (var a=0; a<boxes.length; a++){
  
//   boxes[a]+=b*10;
//   }
//}

  	rotate(b);
    for (var a=0; a<boxes.length; a++){
    //randomSeed(5);


    rotate(ab\);
    line(0, -16, 0, -30); 
      
    }
  
 
//   rotate(45)
//   line(0, -16, 0, -30);

//   rotate(45)
//   line(0, -16, 0, -30);
  
  pop();

  

  push();

  translate(200, 200);
  noFill();
  ellipse(0, 0, 60, 60);


  strokeWeight(4);





  line(0, -31, 0, -45);

  rotate(45)
  // line(0, 45/2 -1, 0, -45);

  rotate(45)
  //line(0, 45/2 -1, 0, -45);

  pop();


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
}
var boxes = [];

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  for (var i = 0; i < 5; i++) {
  boxes.push(new Jitter());
  }
}

function draw() {
  background(220);
}


function Jitter(){
  push();
  translate(200, 200);
  noFill();
  ellipse(0, 0, 30, 30);
 // b= random(0,360);
  
  for(var i = random(0,360); i<=boxes.length; i++){
    
    
  //for(var a = 0; a<=360; a += b){
    rotate(boxed[i]);
    line(0, -16, 0, -30);
  //}
//}
}
//   rotate(45)
//   line(0, -16, 0, -30);

//   rotate(45)
//   line(0, -16, 0, -30);
  }
//   pop();



//   push();

//   translate(200, 200);
//   noFill();
//   ellipse(0, 0, 60, 60);


//   strokeWeight(4);





//   line(0, -31, 0, -45);

//   rotate(45)
//   // line(0, 45/2 -1, 0, -45);

//   rotate(45)
//   //line(0, 45/2 -1, 0, -45);

//   pop();


// }var boxes = [];

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  
  

}

function draw() {
  background(220);

  push();
  translate(200, 200);
  noFill();
  ellipse(0, 0, 30, 30);
  
  if(frameCount%60==5){

for(var i=0; i<5 ; i++){
    boxes[i]=random(0, 360);
  }
  }
    for (var a=0; a<boxes.length; a++){
    //randomSeed(5);
    rotate(boxes[a]);
    line(0, -16, 0, -30);
    }
//   rotate(45)
//   line(0, -16, 0, -30);

//   rotate(45)
//   line(0, -16, 0, -30);
  
  pop();

  

  push();

  translate(200, 200);
  noFill();
  ellipse(0, 0, 60, 60);


  strokeWeight(4);





  line(0, -31, 0, -45);

  rotate(45)
  // line(0, 45/2 -1, 0, -45);

  rotate(45)
  //line(0, 45/2 -1, 0, -45);

  pop();


}function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background(220);

  translate(200, 200);
  noFill();
  ellipse(0, 0, 30, 30);



  
  line(0, -16, 0, -30);
  
  rotate(45)
   line(0, -16, 0, -30);
  
    rotate(45)
   line(0, -16, 0, -30);



}function setup() {
  pixelDensity(1);
  createCanvas(600, 400);
}

function draw() {
  background(220);

  drawCircle(300, 200, 300);
}


function drawCircle(x, y, d) {

  stroke(0);
  noFill();
  ellipse(x, y, d);

  if (d > 2) {

    drawCircle(x + d / 2, y, d / 2);
    drawCircle(x - d / 2 , y, d / 2);

  }

}function setup() { 
  pixelDensity(1);
  createCanvas(600, 400);
} 

function draw() { 
  background(220);
  
  drawCircle(300,200,300);
}


function drawCircle(x,y,d){

stroke(0);
  noFill();
  ellipse(x,y,d);
  
÷

}let pg;
let x = 0;
function setup() { 
  createCanvas(400, 400);
  pg = createGraphics(100,100);
  pg.background(255,0,255);
} 

function draw() { 
  background(0);
  
  
  pg.fill(255);
  pg.ellipse(mouseX,mouseY,20,20);
  
  
  for (let x=0; x<width; x +=150){
 //if(mouseIsPressed){
  image(pg,x,0);
  }
 //}
}let pg;
let x = 0;
function setup() { 
  createCanvas(400, 400);
  pixelDensity(1); //for adjusting pixels in different resolution
  pg = createGraphics(400,400);
  pg.background(0);
} 

function draw() { 
  background(0);
  
  
  pg.fill(255);
  pg.ellipse(mouseX,mouseY,20,20);
  
 if(mouseIsPressed){
  image(pg,0,0);
  
 }
}let x=0;
let x1=0;
function setup() { 
  createCanvas(400, 400);
    

} 

function draw() { 
  
  background(220);
  
  rect(x1, 20, 10, 10);
  
  
  
  x=x+5;
  ellipse(x,100,50,50);
  randomSeed(5); // MAKE RANDOM COLLOR STOP RANDOMING
  for (let i=0; i< width; i=i+10){
//  line(x,0,x,height)
    fill(random(0,255));
  rect(i,0,10,10);
  }
  
  
  
}var boxes = [];

function setup() { 
  createCanvas(400, 400);
  frameRate(30);
  for (var i = 0; i < 250; i++) {

    boxes.push(new Jitter());
  }

} 

function draw() { 
  background(0);
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].move();
    boxes[i].display();
    noFill();
    ellipse(mouseX, mouseY, 60, 60);
  }
}

function Jitter() {
  
  this.x = random(0, width);
  this.y = random(0, height);
  this.away = 75;
  
  this.display = function() {
    
    stroke(255);
    var r = random(0,255);
    var g = random(0,255);
    var b = random(0,255);
    fill(r,g,b);
  


    if (dist(mouseX, mouseY, this.x, this.y) <= 70)

    {


      ellipse(this.x - this.away, this.y - this.away, 20, 20);

    } else {
      ellipse(this.x, this.y, 20, 20);
    }
  };
  
  
  this.move = function() {
    this.x = this.x + random(-1, 1);
    this.y = this.y + random(-1, 1);

  };
  
  
  
  
}var boxes = [];


function setup() {
  createCanvas(400, 400);
  for (var i = 0; i < 200; i++) {

    boxes.push(new Jitter());
  }
}


function draw() {
  background(220);
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].move();
    boxes[i].display();
ellipse(mouseX, mouseY, 40, 40);
  }
}

function Jitter() {


  this.x = random(0, width);
    this.y = random(0, height);
this.away = 40;
    
  
  this.move = function() {
      this.x = this.x + random(-1, 1);
      this.y = this.y + random(-1, 1);

    };

  this.display = function() {
    noStroke();
   
     fill(random(0m);
   
    
    if(dist(mouseX, mouseY,this.x, this.y) <= 30)
    
    {   
       
     
      ellipse(this.x+-this.away, this.y+-this.away, 20, 20);
       
       }else{
    ellipse(this.x, this.y, 20, 20);
       } };
  
  
  
  
}





// if (dist(mouseX, mouseY, this.x, this.y) < 30) {

//   this.x = this.x + 30;
//   this.y = this.y + 30;




// }
// }var boxes = [];


function setup() {
  createCanvas(400, 400);
  for (var i = 0; i < 200; i++) {

    boxes.push(new Jitter());
  }
}


function draw() {
  background(220);
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].move();
    boxes[i].display();
ellipse(mouseX, mouseY, 40, 40);
  }
}

function Jitter() {


  this.x = random(0, width);
    this.y = random(0, height);
this.away = 40;
    
  
  this.move = function() {
      this.x = this.x + random(-1, 1);
      this.y = this.y + random(-1, 1);

    };

  this.display = function() {
    noStroke();
   
     fill(random(0m);
   
    
    if(dist(mouseX, mouseY,this.x, this.y) <= 30)
    
    {   
       
     
      ellipse(this.x+-this.away, this.y+-this.away, 20, 20);
       
       }else{
    ellipse(this.x, this.y, 20, 20);
       } };
  
  
  
  
}





// if (dist(mouseX, mouseY, this.x, this.y) < 30) {

//   this.x = this.x + 30;
//   this.y = this.y + 30;




// }
// }var boxes = [];


function setup() {
  createCanvas(400, 400);
  for (var i = 0; i < 200; i++) {

    boxes.push(new Jitter());
  }
}


function draw() {
  background(220);
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].move();
    boxes[i].display();
ellipse(mouseX, mouseY, 40, 40);
  }
}

function Jitter() {


  this.x = random(0, width);
    this.y = random(0, height);
this.away = 40;
    
  
  this.move = function() {
      this.x = this.x + random(-1, 1);
      this.y = this.y + random(-1, 1);

    };

  this.display = function() {
    noStroke();
   
     fill(random(0m);
   
    
    if(dist(mouseX, mouseY,this.x, this.y) <= 30)
    
    {   
       
     
      ellipse(this.x+-this.away, this.y+-this.away, 20, 20);
       
       }else{
    ellipse(this.x, this.y, 20, 20);
       } };
  
  
  
  
}





// if (dist(mouseX, mouseY, this.x, this.y) < 30) {

//   this.x = this.x + 30;
//   this.y = this.y + 30;




// }
// }var boxes = [];


function setup() {
  createCanvas(400, 400);
  for (var i = 0; i < 30; i++) {

    boxes[i] = {
      
    
      x : random(0,width),
      y : random(0,height),
  
      display: function() {
        noStroke();
        fill(random(0,255));
        ellipse(this.x, this.y, 20, 20);
        
      },
      move: function() {
        this.x = this.x + random(-1, 1);
        this.y = this.y + random(-1, 1);

      }

    }

  
  }
}


function draw() {
  background(220);
  for(var i =0; i<boxes.length; i++){
    boxes[i].move();
    boxes[i].display();
    
    if(dist(mouseX, mouseY, this.x, this.y) < 30){
      
      this.x = this.x+30;
      this.y = this.y +30;
    
    
    }
  }
}var boxes = [];


function setup() {
  createCanvas(400, 400);
  for (var i = 0; i < 200; i++) {

    boxes[i] = {
      
      for(var a=0l)
      x : 
      y : 0,
      display: function() {
        noStroke();
        fill(0);
        ellipse(this.x+30, this.y+30, 20, 20);
        
      },
      move: function() {
        this.x = this.x + random(-1, 1);
        this.y = this.y + random(-1, 1);

      }

    }

  
  }
}


function draw() {
  background(220);
  for(var i =0; i<boxes.length; i++){
  boxes[i].move();
    boxes[i].display();
    
  }
}function setup() { 
  createCanvas(400, 400);
} 

function draw() { 
  background(220);
}var boxes = [];


function setup() {
  createCanvas(400, 400);
  for (var i = 0; i < 30; i++) {

    boxes[i] = {
      
    
      x : random(0,width),
      y : random(0,height),
  
      display: function() {
        noStroke();
        fill(random(0,255));
        ellipse(this.x, this.y, 20, 20);
        
      },
      move: function() {
        this.x = this.x + random(-1, 1);
        this.y = this.y + random(-1, 1);

      }

    }

  
  }
}


function draw() {
  background(220);
  for(var i =0; i<boxes.length; i++){
    boxes[i].move();
    boxes[i].display();
    
    if(dist(mouseX, mouseY, this.x, this.y) < 30){
      
      this.x = this.x+30;
      this.y = this.y +30;
    
    
    }
  }
}var box1 = [];
var box2= [];


function setup() { 
  createCanvas(400, 400);
  
    
 
} 

function draw() { 
  background(220);
  fill(0);
for(var x=0; x<400; x++){
  
  for(var y=0; y<400; y++){
   
   
  rect(box1[x], box2[y], 20,20);

  
  }
}
} 
let box1 = [];
let box2= [];


function setup() { 
  createCanvas(400, 400);
  for(var x=0; x<400; x+=20){
   box1[x] = [];
    
  }
  for(var y=0; y<400; y+=20){
   box2[y] = [];
    
  }
} 

function draw() { 
  background(220);
  
for(var x=0; x<400; x+=20){'
   box1[x] = [];
  
  rect(box1, box2, 20,20);
  for(var y=0; y<400;y+=20){
   box1[y] = [];
  

}
} 
}let box1 = [];
let box2= [];


function setup() { 
  createCanvas(400, 400);
  for(var x=0; x<400; x+=20){
   box1[x] = [];
    
  }
  for(var y=0; y<400; y+=20){
   box2[y] = [];
    
  }
} 

function draw() { 
  background(220);
  
for(var x=0; x<400; x+=20){'
   box1[x] = [];
  
  rect(box1, box2, 20,20);
  for(var y=0; y<400;y+=20){
   box1[y] = [];
  

}
} 
}let box1 = [];
let box2= [];


function setup() { 
  createCanvas(400, 400);
  for(var x=0; x<400; x+=20){
   box1[x] = [];
    
  }
  for(var y=0; y<400; y+=20){
   box2[y] = [];
    
  }
} 

function draw() { 
  background(220);
  
for(var x=0; x<400; x+=20){'
   box1[x] = [];
  
  rect(box1, box2, 20,20);
  for(var y=0; y<400;y+=20){
   box1[y] = [];
  

}
} 
}let box1 = [];
let box2= [];


function setup() { 
  createCanvas(400, 400);
  for(var x=0; x<400; x+=20){
   box1[x] = [];
    
  }
  for(var y=0; y<400; y+=20){
   box2[y] = [];
    
  }
} 

function draw() { 
  background(220);
  
for(var x=0; x<400; x+=20){'
   box1[x] = [];
  
  rect(box1, box2, 20,20);
  for(var y=0; y<400;y+=20){
   box1[y] = [];
  

}
} 
}let box1 = [];
let box2= [];


function setup() { 
  createCanvas(400, 400);
  for(var x=0; x<400; x+=20){
   box1[x] = [];
    
  }
  for(var y=0; y<400; y+=20){
   box2[y] = [];
    
  }
} 

function draw() { 
  background(220);
  
for(var x=0; x<400; x+=20){'
   box1[x] = [];
  
  rect(box1, box2, 20,20);
  for(var y=0; y<400;y+=20){
   box1[y] = [];
  

}
} 
}// Simple Slider
let x = 0;
let y = 0;

let box=[]'

var dragging = false; // Is the slider being dragged?
var rollover = false; // Is the mouse over the slider?

// Rectangle variables for slider
var a = 100;
var b = 25;
var w = 10;
var h = 50;
// Start and end of slider
var sliderStart = 100;
var sliderEnd = 400;
// Offset for dragging slider
var offsetX = 0;

function setup() {
  createCanvas(640, 360);

}

function draw() {

	  background(175);

  // Is it being dragged?
  if (dragging) {
    a = mouseX + offsetX;
  }
  // Keep rectangle within limits of slider
  a = constrain(a, sliderStart, sliderEnd-w);

  // Draw a line for slider
  stroke(0);
  line(sliderStart, b+h/2, sliderEnd, b+h/2);

  stroke(0);
  // Fill according to state
  if (dragging) {
    fill (50);
  } else {
    fill(175);
  }
  // Draw rectangle for slider
  rect(a, b, w, h);

  // Map is an amazing function that will map one range to another!
  // Here we take the slider's range and map it to a value between 0 and 255
  //var box = map(a,sliderStart,sliderEnd-w,0,255);
  noStroke();
  let colorbox = random(0,255)
  fill(colorbox);

  rect(x,100,20,20);
    
     x = x + 20;
  //rect(sliderStart, 100, sliderEnd-sliderStart, 150);
}

function mousePressed() {
  // Did I click on slider?
  if (mouseX > a && mouseX < a + w && mouseY > b && mouseY < b + h) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX = a-mouseX;
  }
}

function mouseReleased() {
  // Stop dragging
  dragging = false;
}let x = 0;
let y = 0;

var dragging = false;
var rollover = false;

var a = 50;
var b = 25;
var w = 10;
var h = 50;

var sliderStart = 50;
var sliderEnd = 350;
var offsetX = 0;

var speed=0;


function setup() {
  createCanvas(400, 400);
  background(255);
  noStroke();

}

function draw() {

 if (dragging) {
    a = mouseX + offsetX;
  }
  // Keep rectangle within limits of slider
  a = constrain(a, sliderStart, sliderEnd-w);

  // Draw a line for slider
 
  line(sliderStart, b+h/2, sliderEnd, b+h/2);
  rect(a, b, w, h);
  
  var box = map(a,sliderStart,sliderEnd-w,0,50);*/
  
  let r = random(1);
  print(random(r));
  stroke(0);

  if (r < 0.5) {
    
    
    noStroke();
    let colorbox = random(0,255)
    fill(colorbox);
   
    
  
    rect(x,y,20,20);
    
     x = x + 20;
  
  }
  
  if (x == width) {

    x = 0;
    y = y + 20;
  }
  
}

//function mousePressed() {
  
  // Did I click on slider?
  //if (mouseX > a && mouseX < a + w && mouseY > b && mouseY < b + h) {
      //background(175);

    //dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
   // offsetX = a-mouseX;
  //}
//}

// function mouseReleased() {
//   // Stop dragging
//   //background(175);
//   dragging = false;
// }

let y = 0;
let speed = 0;

let bouncing = false;


function setup() {
  createCanvas(400, 400);
}

function mousePressed() {
  bouncing = !bouncing;
  //kind of longwinded
  if (bouncing) {
    bouncing = false;

  } else {
    bouncing = true;
  }

  //Super longwinded
  if (bouncing == true) {
    bouncing = false;

  } else if (bouncing == false) {
    bouncing = true;

  }

}



function draw() {
  background(0);
  fill(255);

  ellipse(200, y, 20, 20);


  if(bouncing){
  y = y + speed; //Make y to start moving with acceleration

  speed = speed + 0.2;
  }
  if (y > height) {
    y = height;
    speed = -0.8 * speed; // decreasing 0.80% of speed each time

    if (abs(speed) < 1) {
      speed = 0;
    }
  }

}let x = 0;
let y = 0;


function setup() {
  createCanvas(400, 400);

}

function draw() {

 background(255);
  //let r = random(1);
  //print(random(r));
  //stroke(0);
noStroke();
  if (r < 0.5) {
   
    //rect(x,y,20,20);
  
  for(var i=0; i<400; i+=20){
     fill(random(0,255));
    rect(i, i, 20, 20);
    
  /} else {
    //rect(i, y + 20, i + 20, y);
 // }
  }
 // x = x + 20;

//   if (x == width) {

//     x = 0;
//     y = y + 20;


//   }

}let canvas = {
  x: 400,
  y: 400
};
let hourHandRotate;
let minuteHandRotate;
let hourHandColor;
let minuteHandColor;
let word;
let size;
let sizeNumber;
let calendar = "MON";
let calendarDate;

function setup() {
  createCanvas(canvas.x, canvas.y);
  colorMode(HSB);

}

function draw() {
  background(219, 8, 94);



  //table
  stroke("black");
  strokeWeight(3);
  stroke("black");
  fill(212, 78, 31);
  rect(0, 280, 400, 200);

  //laptop
  strokeWeight(1);
  stroke("silver");
  fill("black");
  rect(65, 123, 259, 180, 5);
  fill(frameCount % 360, 40, 70);
  rect(75, 130, 240, 168);
  //line (323,302,270,400);

  //size = random (30);
  textSize(12);
  word = "  All work and no play makes Jack a dull boy";
  fill(05);
  sizeNumber = random(0, 150);
  text(word, 75, 145 + sizeNumber, 240, 155);



  //calendar

  stroke("black");
  rect(20, 40, 105, 50, 5);
  strokeWeight(5);
  line(10, 60, 135, 60);

  calendarDate = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  if (frameCount%30 == 0) {
   calendar = random(calendarDate); 
  }
  
  stroke(351, 73, 89);
  strokeWeight(4);
  fill(351, 73, 89);
  textSize(40);
  text(calendar, 30, 80);


  //coffee mug Handle
  p1 = {
    x: 240,
    y: 338
  }, p2 = {
    x: 208,
    y: 338
  }
  p3 = {
    x: 212,
    y: 366
  }, p4 = {
    x: 238,
    y: 353
  }
  noFill();
  stroke(0);
  strokeWeight(5);
  curve(p1.x, p1.y, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y)
  curve(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y)
  curve(p2.x, p2.y, p3.x, p3.y, p4.x, p4.y, p4.x, p4.y)
  //coffee mug
  stroke("black");
  strokeWeight(5);
  fill(44, 62, 100);
  rect(230, 320, 55, 40, 0, 0, 15, 15);
  fill(30, 96, 36);
  ellipse(260, 340, 15, 20);


  //Duck-begin
  stroke("black");
  strokeWeight(7);
  fill("white");
  //body
  bezier(153, 286, 201, 212, 284, 319, 169, 330);
  //cheek
  bezier(10, 422, -112, 174, 278, 126, 181, 422);

  //Duck-end


  //hand
  bezier(167, 358, 249, 338, 231, 361, 173, 383);
  fill("black");
  ellipse(155, 255, 5, 5);

  //Clock
  push();

  hourHandRotate = map(mouseX, 0, canvas.x, 0, 2 * PI);
  minuteHandRotate = map(mouseX, 0, canvas.x, 0, 24 * PI);
  hourHandColor = map(mouseY, 0, canvas.y, 0, 360);
  minuteHandColor = 360 - map(mouseY, 0, canvas.y, 0, 360);

  translate(canvas.x / 2 + 70, canvas.y / 2 - 140);
  fill("white")
  ellipse(0, 0, 100, 100);

  //hour hand
  rotate(hourHandRotate);
  stroke(hourHandColor, 100, 100);
  strokeWeight(3);
  line(0, 0, 0, -30);

  //minute hand
  rotate(minuteHandRotate - hourHandRotate);
  stroke(minuteHandColor, 100, 100);
  strokeWeight(1);
  line(0, 0, 0, -40);

  pop();
  // 

  var angle = 0;



function setup() {
  createCanvas(640, 360);
  frameRate(20);
  background(255);
  angleMode(DEGREES);
  rectMode(CENTER);
}

function mousePressed() {
  background(255);
}


function draw() {

  var r = random(0, 255);

  var x = random(0, 100);

  var a = random(0, 255);

  var angle = random(0, 360);

  noStroke();
  translate(mouseX, mouseY);
  rotate(angle);
  fill(r, a);
  rect(0, 0, x, x);







}function setup() {
  createCanvas(640, 360);

background(255);
}

function mousePressed() {
  background(255);
}


function draw() {

  var r = random(0,255);
var a;
  var b;
  var x = random(0,100);
 
  fill(r,200);

  ellipse, b, x, x);

  a = mouseX + random(-1, 1); 


  b = mouseY + random(-1, 1);
  
  
}var x;

function setup() { 
  createCanvas(400, 400);
  
  x=0;
} 

function draw() { 
  background(220);
  ellipse(x,200,50,50);
  
  x=x+2;
  
}function setup() { 
  createCanvas(400, 600);
} 

function draw() { 
  background(169,73,85);
  
  fill(121,21,44);
  quad(270,90,400,226,400,517,172,292);
  
  fill(121,21,44);
  quad(228,357,400,526,400,658,172,432);
  
  
  //left top face cube	
  noStroke();
  fill(249,183,72);
  quad(135,90,135,170,184,144,176,75);
  //left down face cube
  quad(135,170,127,196,171,277,184,267);
  //left down right face cube
  quad(184,267,203,267,203,147,184,144);
  triangle(135,170,184,144,184,267);
  
  quad(166,251,162,272,172,292,184,251);
  quad(172,292,203,287,203,267,184,251);
  
  //right top face cube	
  noStroke();
  fill(243,154,31);
  quad(229,75,270,90,270,170,222,144);
  quad(222,144,203,147,203,267,222,267);
  quad(222,267,234,277,279,196,270,170);
  triangle(222,144,270,170,222,267);
  
  quad(203,287,233,292,222,251,203,267);
  quad(222,251,240,251,243,272,233,292);
  
  //left eye
  noStroke();
  fill(255);
  quad(146,174,144,186,153,198,161,184);
  quad(161,184,153,198,183,205,189,194);
  

  //right eye
  noStroke();
  fill(255);
  quad(215,195,222,205,252,198,243,184);
  quad(243,184,258,174,261,186,252,198);
  
   ellipseMode(CENTER);  // Set ellipseMode to CENTER
   fill(255);  // Set fill to gray

   ellipse(202, 396, 92, 92);  // Draw gray ellipse using CENTER mod
  
  
  ellipseMode(CENTER);  // Set ellipseMode to CENTER
  fill(191,226,238);  // Set fill to gray

  ellipse(202, 396, 86, 86);  // Draw gray ellipse using CENTER mode
  
  
 
}function setup() { 
  createCanvas(400, 600);
} 

function draw() { 
  background(169,73,85);
  
  fill(121,21,44);
  quad(270,90,400,226,400,517,172,292);
  
  fill(121,21,44);
  quad(228,357,400,526,400,658,172,432);
  
  
  //left top face cube	
  noStroke();
  fill(249,183,72);
  quad(135,90,135,170,184,144,176,75);
  //left down face cube
  quad(135,170,127,196,171,277,184,267);
  //left down right face cube
  quad(184,267,203,267,203,147,184,144);
  triangle(135,170,184,144,184,267);
  
  quad(166,251,162,272,172,292,184,251);
  quad(172,292,203,287,203,267,184,251);
  
  //right top face cube	
  noStroke();
  fill(243,154,31);
  quad(229,75,270,90,270,170,222,144);
  quad(222,144,203,147,203,267,222,267);
  quad(222,267,234,277,279,196,270,170);
  triangle(222,144,270,170,222,267);
  
  quad(203,287,233,292,222,251,203,267);
  quad(222,251,240,251,243,272,233,292);
  
  //left eye
  noStroke();
  fill(255);
  quad(146,174,144,186,153,198,161,184);
  quad(161,184,153,198,183,205,189,194);
  

  //right eye
  noStroke();
  fill(255);
  quad(215,195,222,205,252,198,243,184);
  quad(243,184,258,174,261,186,252,198);
  
   ellipseMode(CENTER);  // Set ellipseMode to CENTER
   fill(255);  // Set fill to gray

   ellipse(202, 396, 92, 92);  // Draw gray ellipse using CENTER mod
  
  
  ellipseMode(CENTER);  // Set ellipseMode to CENTER
  fill(191,226,238);  // Set fill to gray

  ellipse(202, 396, 86, 86);  // Draw gray ellipse using CENTER mode
  
  
 
}